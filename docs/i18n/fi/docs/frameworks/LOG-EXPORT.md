# Log export (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute-kutsulokien jatkuva, inkrementaalinen vienti ulkoiseen analytiikkatietovarastoon.

Lokit-hallintapaneelin välilehti säilyttää pyyntöhistorian SQLite-tietokannassa (`call_logs`), jonka kokoa
rajoittavat kierto ja säilytysaika. Lokivienti lähettää saman tietuejoukon ajastetusti muualle, jotta se säilyy
paikallista tietokantaa pidempään ja voidaan yhdistää muihin tietoihin. BigQuery on ensimmäinen kohde;
putki käyttää rekisteriä, joten uusia kohteita voidaan lisätä.

---

## 1. Toimintaperiaate

```
palvelin (pura määritysten salaus + validoi määritykset, täsmäytä kohdistin)
  → käynnistä IPC → eristetty exportChild-käyttöjärjestelmäprosessi
    → vain luku -tilassa oleva storage.sqlite → yhteinen puhelulokien kysely/määritys
      → artefaktien asynkroninen lataus → kohteen prepare()/send()
        → erän IPC → palvelin tallentaa kohdistimen → kuittauksen IPC
          → seuraava erä; valmistumisen IPC → palvelin kirjaa onnistumisen
```

- **Ajastus** — yksi `JobRegistry`-cron-tehtävä, `log_export`, jonka oletusarvo on `0 * * * *` (tunneittain,
  UTC). Rekisteröidään tiedostossa `src/lib/initCloudSync.ts`; voidaan ohittaa muuttujalla `OMNIROUTE_LOG_EXPORT_CRON`.
  Jokainen suoritus käsittelee kaikki **käytössä olevat** kohteet loppuun peräkkäin.
- **Kohdistin** — SQLiten implisiittinen `call_logs.rowid`, joka tallennetaan kohdekohtaisesti kenttään
  `log_export_destinations.cursor_row_id`. Kenttää `timestamp` ei tarkoituksella käytetä kohdistimena: kutsujat
  voivat antaa sille oman arvonsa, joten hidas pyyntö voidaan kirjoittaa myöhemmin kuin sitä myöhemmin aloitettu
  nopeampi pyyntö, jolloin aikaleimaan perustuva kohdistin ohittaisi sen.
- **Eräkäsittely** — `batch_size` riviä pyyntöä kohden (oletus 500), `max_rows_per_run` riviä suoritusta kohden
  (oletus 10000), jotta suuri jono käsitellään usean suorituksen aikana yhden suorituksen estämisen sijaan.
- **Toimitus** — kohdistin etenee vasta, kun `send()` on suoritettu onnistuneesti. Epäonnistunut erä jättää
  kohdistimen ennalleen, joten samoja rivejä yritetään uudelleen seuraavalla suorituskerralla. Takuuna on
  vähintään kerran -toimitus sekä kohteessa tehtävä duplikaattien poisto, ei todellinen täsmälleen kerran -toimitus:
  BigQuery käyttää jokaisen rivin avaimena puhelulokin tunnusta ja huomioi sen parhaan kykynsä mukaan oman
  duplikaattien poistoikkunansa aikana.
- **Päällekkäisyyden esto** — cron-suoritus ja `POST .../run` voivat käynnistyä samanaikaisesti. Jo käsiteltävä
  kohde ohitetaan sen sijaan, että se käsiteltäisiin kahdesti (`skipped: true` suorituksen tuloksessa),
  joten rinnakkainen suoritus ei voi lähettää erää uudelleen tai siirtää kohdistinta taaksepäin.
- **Palautuminen tyhjennyksestä** — jos `cursor_row_id` päätyy arvon `MAX(rowid)` yläpuolelle (koko taulu
  tyhjennettiin ja rivitunnukset alkoivat uudelleen alusta), suorittaja palauttaa kohdistimen arvoon 0 sen sijaan,
  että se lakkaisi pysyvästi havaitsemasta uusia rivejä.

### Eristetty suorittaja ja rajoitukset

Node käynnistää jokaista kohteen suoritusta varten erillisen, lyhytikäisen käyttöjärjestelmän aliprosessin (`child_process`
ja IPC, ei `worker_threads`). Runkojen lukeminen, hyötykuorman JSON-jäsennys ja -serialisointi, kohteen
`prepare()` sekä kohteen verkkosiirräntä suoritetaan aliprosessissa, eivät palvelimen tapahtumasilmukassa.
IPC:n kautta siirretään vain määritykset ja pienet edistymisviestit; vietyjä tietueita ei koskaan palauteta
palvelimelle. Cron-tehtävä ja Suorita nyt -reitti säilyttävät saman julkisen tuloksen ja päällekkäisyyden eston.

Aliprosessi avaa palvelimen ratkaistun `DATA_DIR/storage.sqlite`-tiedoston vain luku -tilassa käyttäen `node:sqlite`-moduulia
sekä asetuksia `busy_timeout=5000` ja `query_only=ON`. Se ei tuo DB-singletonia eikä suorita
migraatioita, varmuuskopioita tai SQLite-päivityksiä. Puuttuvien tai vioittuneiden artefaktien kirjanpito (mukaan lukien
vioittuneen artefaktin UPDATE) kuuluu edelleen vain koontinäytön yksityiskohtapolkuun. Molemmat polut käyttävät yhteistä
puhdasta yksityiskohtien ratkaisijaa; vienti käyttää asynkronisia tiedostojärjestelmän lukuja ja samaa ratkaisujärjestystä:
artefakti → vanha upotettu sisältö → vanha levyllä oleva sisältö → ei mitään. Suoritus ottaa tilannekuvan suurimmasta
lisäyksen rivitunnuksesta, kun aliprosessi avaa lukijansa; myöhemmät lisäykset odottavat seuraavaa suoritusta. Tämä on
lisäysraja, ei pitkäkestoinen SQLite-transaktio: WAL-kirjoittajat ja tarkistuspisteet voivat jatkaa vapaasti verkkoodotusten
aikana. Tämä raja ei jäädytä olemassa olevien rivien päivityksiä tai poistoja.

Aliprosessi odottaa kuittausta jokaisen hyväksytyn erän jälkeen. Palvelin tallentaa ensin kohdistimen funktiolla
`advanceLogExportCursor` ja lähettää sitten viestin `ack`; seuraavaa erää ei aloiteta ennen tätä.
Lähetysvirhe, kaatuminen tai aikakatkaisu kirjataan epäonnistumiseksi siirtämättä kyseisen erän kohdistinta. Aiemmin
kuitatut erät pysyvät tallennettuina; enintään yksi kuittaamaton erä voidaan lähettää uudelleen.
Onnistuminen kirjataan vasta viestin `done` ja aliprosessin siistin päättymisen jälkeen. Epäonnistumisen yhteydessä
aliprosessi lopetetaan signaalilla SIGTERM, joka korotetaan signaaliksi SIGKILL 500 ms:n kuluttua, ja suorittaja odottaa
prosessin sulkeutumista.

| Ympäristömuuttuja                             | Oletus | Tarkoitus                           |
| --------------------------------------------- | ------ | ----------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Kohdekohtainen kokonaisaikaraja     |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Aliprosessin V8 old-space -raja, MB |

Virheellisten, ei-positiivisten tai muiden kuin kokonaislukuarvojen tapauksessa käytetään oletusarvoja. Kekoasetus ei ole
RSS-kokonaisraja; erittäin suuret erät voivat silti kuluttaa aliprosessin muistin loppuun, jolloin suoritus epäonnistuu turvallisesti.
Oletusarvo 1024 MB jättää liikkumavaraa oletusarvoiselle 500 rivin erälle, jossa on 512 KiB:n artefaktit ja
rungot ovat käytössä, mukaan lukien BigQueryn tavuosiin jaettu JSON-serialisointi. Se ei tee
10000 rivin runkoerästä turvallista. V8-keon loppuminen kirjaa toimintakelpoisen virheilmoituksen: pienennä eräkokoa
tai suurenna muuttujan `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` arvoa; kohdistin jää viimeiseen
kuitattuun erään. Moderni artefaktien kokorajoitus ei kata historiallisia upotettuja tai levyllä olevia runkoja.
Ylläpitäjien on budjetoitava RSS erikseen, erityisesti muistirajoitetuissa säilöissä.

Aliprosessi perii vain ratkaistun muuttujan `DATA_DIR`, muuttujan `NODE_ENV`, eksplisiittisen muuttujan `TZ` (vanhojen tiedostonimien
paikallisen ajan ratkaisu), muuttujan `ELECTRON_RUN_AS_NODE`, jos se on olemassa, sekä seuraavat lähtevän liikenteen syötteet:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (ja niiden pienikirjaimiset muodot),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Yleinen Undici-välittäjä käyttää palvelimen puhdasta ympäristömuuttujiin perustuvaa välityspalvelimen ratkaisua ja paikallisten
isäntien ohitussääntöjä, mukaan lukien `NO_PROXY`; se ei tuo tiedostoa `proxyFetch.ts` eikä sen DB- tai ominaisuuslippuja.
Välityspalvelimen tunnistetiedot peitetään välitetystä tulosteesta ja kirjatuista virheistä. Kohteen tunnistetiedot
siirretään vain yhdessä käynnistyksen IPC-viestissä, ei koskaan argv:ssa tai ympäristössä; tulosteen ja virheiden välitys
varustetaan etuliitteellä ja puhdistetaan. Aliprosessin suorituksen argumenteissa poistetaan käytöstä vain `ExperimentalWarning`,
jotta Noden SQLite-varoitus ei toistu jokaisella cron-suorituksella; muut varoitustyypit pysyvät näkyvissä.

Kohdemoduulien on oltava tuotavissa ilman Next.js- tai vain palvelimella käytettäviä riippuvuuksia. Nykyinen
BigQuery-toteutus täyttää jo tämän vaatimuksen. Käyttöoikeustunnusten välimuistit säilyvät vain aliprosessin
suorituksen ajan, eivät suoritusten välillä. Node on tuettu suoritusympäristö (`package.json`-tiedoston engines-määrityksen mukaan), mutta README-tiedoston Bun-
asennusosio ja `Dockerfile.bun` tarjoavat myös tuotantoyhteensopivan polun, joka käyttää
`bun:sqlite`-moduulia (`src/lib/db/core.ts` / sovittimet). Bun-ympäristössä viennit säilyttävät siksi aiemman
prosessinsisäisen toimintatavan ja antavat kertaluonteisen varoituksen: aliprosessin keon ja aikakatkaisun eristys ei ole käytettävissä. Käytä
Nodea tapahtumasilmukan ja OOM-tilanteiden eristämiseen; Bunia ei tässä käsitellä vain kehityskäyttöön tarkoitettuna.

Kun `includeBodies` on käytössä, suosi minuuttitason suoritustiheyttä, kuten
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, sen sijaan että tunnin välein lähetettävä hyötykuorma pääsisi kasaantumaan.
Erä- ja rivirajat rajoittavat edelleen jokaista suoritusta. Prosessin käynnistyskustannus syntyy jokaiselle kohteelle jokaisella suorituskerralla;
tässä pieni käynnistyskustannus vaihdetaan palvelimen tapahtumasilmukan eristykseen, ei kokonaisprosessorinkäytön vähentämiseen.

### Hyötykuormat (kehotteet ja vastaukset)

Oletusarvoisesti vienti sisältää vain yhteenvetokentät, jotka Lokien **luettelo** näyttää. Kun
**Vie kehotteet ja vastaukset** (`includeBodies`) otetaan käyttöön, mukaan lähetetään lisäksi se, mitä Lokien **tiedot**-
paneeli näyttää kustakin kutsusta:

| Kenttä                           | Mitä se sisältää                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Kutsun hyötykuormat hallintapaneelin esittämässä muodossa                                |
| `pipeline_route_decision`        | Reitittimen valitsema kohde ja malli                                                     |
| `pipeline_client_request`        | Raakapyyntö täsmälleen asiakkaan lähettämässä muodossa                                   |
| `pipeline_openai_request`        | Pyyntö sisäiseen OpenAI-muotoon muuntamisen jälkeen                                      |
| `pipeline_provider_request`      | Pyyntö sellaisena kuin se todella lähetettiin palveluntarjoajalle, tämän omassa muodossa |
| `pipeline_provider_response`     | Palveluntarjoajan käsittelemätön vastaus                                                 |
| `pipeline_client_response`       | Kutsujalle palautettu vastaus                                                            |
| `pipeline_error`                 | Putkitason virheen tiedot epäonnistuneesta kutsusta                                      |
| `bodies_truncated`               | Tosi, kun jokin yllä olevista kentistä saavutti `maxBodyBytes`-rajan                     |

Tämä on kehotesisältöä, joten se on **oletusarvoisesti pois käytöstä** ja tarkoituksella kohdekohtainen valinta.
Lähetettävä sisältö vastaa hallintapaneelissa näkyvää sisältöä, koska vienti ja `getCallLogById` käyttävät samaa tietojen
selvitystä: hyötykuormista on
jo poistettu henkilötiedot ja salaisuudet niiden kirjoittamisen yhteydessä, eikä `noLog`-API-avaimella tehty kutsu
tallenna lainkaan hyötykuormaa, joten vietävää ei ole.

Hyötykuormat luetaan tiedostojärjestelmän artefaktista rivikohtaisesti, joten täydentäminen suoritetaan vain kohteille,
jotka pyysivät sitä. Jos artefakti puuttuu tai on vioittunut, sen yhteenveto viedään hyötykuormien ollessa null-arvoisia
sen sijaan, että erä epäonnistuisi ja kohdistin jäisi jumiin.

`maxBodyBytes` (oletusarvo 262144) rajoittaa kunkin kentän kokoa. Pidemmät hyötykuormat **katkaistaan eikä
hylätä** — katkaistu kehote vastaa silti kysymykseen ”mitä kysyttiin” — ja riville asetetaan
`bodies_truncated`-merkintä. Suoratoistettuja osittaisia muutoksia ei viedä pala palalta; koottu vastaus on
jo kentissä `pipeline_provider_response` ja `pipeline_client_response`.

---

## 2. Tiedostot

| Osa                           | Sijainti                                     |
| ----------------------------- | -------------------------------------------- |
| Kohdesopimus                  | `src/lib/logExport/types.ts`                 |
| Rekisteri                     | `src/lib/logExport/registry.ts`              |
| Salaisuuksien käsittely       | `src/lib/logExport/secrets.ts`               |
| Suorittaja (pääprosessin IPC) | `src/lib/logExport/runner.ts`                |
| Prosessin elinkaari           | `src/lib/logExport/childRunner.ts`           |
| Lapsiprosessin aloituspiste   | `src/lib/logExport/exportChild.ts`           |
| Vain luku -avaaja             | `src/lib/db/logExportReadOnly.ts`            |
| Jaettu kysely/mäppäys         | `src/lib/usage/callLogExportQueries.ts`      |
| Tietojen ratkaisija           | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projektio                 | `src/lib/logExport/presenter.ts`             |
| BigQuery-kohde                | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA -todennus           | `src/lib/logExport/googleServiceAccount.ts`  |
| Puhelulokilähde               | `src/lib/usage/callLogExportSource.ts`       |
| Pysyväistallennus             | `src/lib/db/logExportDestinations.ts`        |
| Cron-tehtävä                  | `src/lib/jobs/logExportJob.ts`               |
| REST-kerros                   | `src/app/api/log-export/`                    |
| Hallintapaneelisivu           | `src/app/(dashboard)/dashboard/log-export/`  |

Skeema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Kaikki reitit edellyttävät hallintatodennusta (`requireManagementAuth`). Salaisuuksia ei koskaan palauteta:
tallennettu salaisuus palautetaan literaalina `__stored__`, ja tämän arvon lähettäminen takaisin päivityksen
yhteydessä säilyttää tallennetun tunnistetiedon.

Sellaisen kohteen luominen tai päivittäminen, jonka tyyppi määrittää salaisuuden, **edellyttää
`STORAGE_ENCRYPTION_KEY`-muuttujaa**. Ilman sitä `encrypt()` päästää arvon hiljaisesti läpi muuttamatta sitä, joten kirjoitus
hylätään 400-virheellä sen sijaan, että tunnistetieto tallennettaisiin SQLiteen selväkielisenä (sama suojaus on käytössä
Telegram-webhookissa).

| Menetelmä | Polku                                    | Tarkoitus                                                        |
| --------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `GET`     | `/api/log-export/types`                  | Kohdetyypit ja niiden määrityskenttien luettelo                  |
| `GET`     | `/api/log-export/destinations`           | Kohteiden luettelo (salaisuudet peitettyinä)                     |
| `POST`    | `/api/log-export/destinations`           | Luo kohde                                                        |
| `GET`     | `/api/log-export/destinations/{id}`      | Lue yksi kohde                                                   |
| `PUT`     | `/api/log-export/destinations/{id}`      | Päivitä nimi / käytössäolo / määritykset / eräkäsittely          |
| `DELETE`  | `/api/log-export/destinations/{id}`      | Poista                                                           |
| `POST`    | `/api/log-export/destinations/{id}/test` | Testaa tunnistetiedot kirjoittamatta mitään                      |
| `POST`    | `/api/log-export/destinations/{id}/run`  | Tyhjennä jono nyt samalla polulla kuin ajastetussa suorituksessa |
| `GET`     | `/api/log-export/status`                 | Cron-tila, viimeisimmät suoritukset ja kohdekohtainen jono       |

`GET /api/log-export/types` tekee käyttöliittymästä yleiskäyttöisen: hallintapaneelin lomake muodostetaan
palautettujen kenttäkuvausten perusteella, joten uusi kohde ei vaadi käyttöliittymämuutoksia.

---

## 4. BigQuery-kohde

Määritysavaimet (`type: "bigquery"`):

| Avain                | Huomautukset                                                                  |
| -------------------- | ----------------------------------------------------------------------------- |
| `projectId`          | Tietojoukon sisältävä GCP-projekti                                            |
| `datasetId`          | `[A-Za-z0-9_]+`                                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                                               |
| `location`           | Käytetään vain, kun tietojoukko on luotava (oletus `EU`)                      |
| `serviceAccountJson` | Palvelutilin avain. Salaisuus: salataan tallennettaessa, ei koskaan palauteta |
| `autoCreate`         | Luo tietojoukko ja taulu ensimmäisen viennin yhteydessä (oletus `true`)       |

Palvelutili tarvitsee `bigquery.tables.updateData`-oikeuden kohdetauluun sekä
`bigquery.datasets.create`- / `bigquery.tables.create`-oikeudet, kun `autoCreate` on käytössä.

Määritetty erä on **kohdistimen** yksikkö, ei HTTP-yksikkö: `send()` jakaa sen enintään 500 rivin
insertAll-kutsuiksi, joten suuri `batch_size` ei voi ylittää BigQueryn 10 Mt:n pyyntörajaa.
Tilapäisiä tiloja (408/429/500/502/503/504) yritetään uudelleen enintään kolme kertaa eksponentiaalisella
viiveellä käyttäen samoja insertIds-arvoja uudelleen; todennus- ja skeemavirheet aiheuttavat poikkeuksen ensimmäisellä yrityksellä
sen sijaan, että suoritus käyttäisi turhaan kaikki yritykset.

Hetki sitten luotu taulu ei vielä näy suoratoiston päätepisteelle, joka vastaa muutaman sekunnin ajan
404-virheellä. Tätä 404-virhettä yritetään uudelleen, mutta **vain jos tämä suoritus loi taulun** —
aidosti puuttuva taulu aiheuttaa silti virheen välittömästi. Huomaa, että taulun luominen uudelleen samalla nimellä pian sen
poistamisen jälkeen saa BigQueryn hylkäämään suoratoistolisäykset useiden minuuttien ajan; tämä on
poista-ja-luo-uudelleen-toimintatavan ominaisuus, joten käytä mieluummin uutta taulun nimeä kuin poista ja lisää sama taulu uudelleen.

**Osittainen epäonnistuminen saapuu HTTP 200 -vastauksena, jossa `insertErrors[]` ei ole tyhjä.** Tätä käsitellään
virheenä ja se aiheuttaa poikkeuksen, mikä estää kohdistinta etenemästä niiden rivien ohi, joita BigQuery ei koskaan
hyväksynyt; `tests/unit/log-export-bigquery.test.ts` lukitsee tämän toiminnan.

Siirtotapa on tavallinen REST — itse allekirjoitettu RS256-väite vaihdetaan käyttöoikeustunnukseen osoitteessa
`https://oauth2.googleapis.com/token`, minkä jälkeen rivit lähetetään `tabledata.insertAll`-rajapintaan. Google SDK:ta ei
oteta mukaan. Käyttöoikeustunnukset välimuistitetaan prosessissa palvelutilin ja käyttöalueen yhdistelmän mukaan.

Luotu taulu sisältää yhden sarakkeen kutakin Lokit-välilehden kenttää kohti sekä `exported_at`-sarakkeen, ja sen rakenne on optimoitu
kutsulokien todellisten kyselytapojen mukaan:

- **Päiväkohtainen osiointi `timestamp`-kentän perusteella**, joten päivämäärillä rajattu kysely käsittelee vain kyseiset päivät.
- **Klusterointi kenttien `api_key_name`, `provider`, `model`, `status` perusteella** (tässä järjestyksessä), joten suodatus sen mukaan,
  kuka suorituksen teki, minne se kohdistui tai epäonnistuiko se, karsii lohkoja kunkin osion sisältä. BigQuery
  sallii enintään neljä klusterointisaraketta, ja järjestyksellä on merkitystä: pelkkä `api_key_name`-suodatin
  karsii, mutta pelkkä `status`-suodatin ei.
- **Valinnainen osioiden säilytysaika** asetuksella `partitionExpirationDays` (0 säilyttää kaiken), jota käytetään
  taulua luotaessa.

Molemmat asetukset otetaan käyttöön luontihetkellä. Olemassa oleva taulu säilyttää nykyisen rakenteensa, joten
osoita kohde uuteen taulutunnukseen, jos haluat ottaa ne käyttöön.

`tests/unit/log-export-bigquery.test.ts` varmistaa, että mäppäys ja taulun skeema pysyvät
täsmälleen yhdenmukaisina, joten uutta kutsulokin saraketta ei voida huomaamatta jättää pois viennin aikana.

Erät pilkotaan **sekä** rivimäärän että serialisoitujen tavujen perusteella. Pelkkä rivimäärä ei riitä,
kun hyötykuormat viedään: 500 kehotteita sisältävää riviä voi olla kymmenien megatavujen kokoisia, ja insertAll
hylkää yli 10 MB:n pyynnöt. Osio suljetaan 500 rivin tai 9 MB:n kohdalla sen mukaan, kumpi raja saavutetaan ensin.

---

## 5. OTLP/HTTP-jäljitysten kohde

Asetuksissa käytetään arvoa `type: "otlp-http"`. Tämä on tallennettujen kutsulokien ajastettu,
kursoriin perustuva vienti, ei parhaansa mukaan toimiva reaaliaikainen reititystapahtumien nielu
tiedostossa `open-sse/services/routing/otel.ts`. Se ei lue eikä muuta kyseisen nielun
ympäristömuuttujia, ajastimia tai puskureita. Molempien käyttöönotto voi tuottaa kahdenlaisia
toisistaan riippumattomia spaneja; erota nämä kutsulokispanit instrumentointialueen
`omniroute.log-export` avulla.

| Avain                    | Oletusarvo / tarkoitus                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `endpoint`               | Pakollinen täydellinen HTTP(S)-jäljitys-URL; päätettä `/v1/traces` ei lisätä                      |
| `headers`                | Valinnaiset `Name: value` -rivit tai merkkijonoja sisältävä JSON-objekti; salattu                 |
| `requestHeaderAllowlist` | Tyhjä (pois käytöstä); span-attribuutteina tallennettavat asiakkaan otsakkeiden nimet/etuliitteet |
| `serviceName`            | `omniroute`; resurssin `service.name`                                                             |
| `langfuseMapping`        | `false`; lisää Langfusen generointi-/istunto-/käyttäjäattribuutit                                 |
| `identity`               | `pseudonymous`, `keyName` tai `none`                                                              |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                           |
| `timeoutMs`              | `30000` kutakin HTTP-yritystä kohti                                                               |
| `environment`            | Ei asetettu; valinnainen `langfuse.environment`                                                   |

Yleinen hallintanäkymä näyttää nämä kentät. `paths` hyväksyy API-taulukon tai tekstialueen,
jossa tarkat polut erotetaan rivinvaihdoilla tai pilkuilla. Embeddings-, rerank- ja muut polut
ohitetaan, ellei niitä ole erikseen sallittu. Myös ohitetut rivit siirtävät kursoria eteenpäin;
nykyisen suorittimen `exported`/`exportedTotal`-laskurit laskevat käsitellyt lähderivit,
myös suodatetut rivit, eivätkä hyväksyttyjä spaneja. Suodatus tehdään aliprosessissa muuttamatta
sen IPC-/kursorisopimusta.

URL-osoitteen validointi käyttää tietokannasta riippumatonta `parseAndValidateNonMetadataUrl`-apufunktiota
tiedostosta `src/shared/network/outboundUrlGuard.ts`: käytäntöä `block-metadata`. Siinä on samat
ehdottomat metatieto-, protokolla- ja upotettujen tunnistetietojen tarkistukset kuin webhook-validaattorissa,
kun yksityiset URL-osoitteet on sallittu, mutta se sallii tarkoituksella localhost-/LAN-kohteet ilman
globaalia ominaisuuslipun ohitusta. Tämä mahdollistaa itse ylläpidetyt Langfuse-, Phoenix-, Tempo- ja
Collector-päätepisteet, myös yksityiset HTTP-päätepisteet. Pilvimetatietojen isännät estetään aina.
Uudelleenohjauksia ei seurata, joten keräin ei voi ohjata tunnistetietoja toiselle isännälle.
Nykyisen leksikaalisen URL-suojauksen tavoin tämä ei lukitse DNS-selvityksen tulosta; määritä vain
ylläpitäjän hallitsemia isäntiä. Suosi HTTPS:ää aina, kun päätepiste ei ole luotetussa verkossa.

### Hyötykuorma ja toimitus

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) sisältää yhden
CLIENT-spanin kutakin sallittua riviä kohti, ja span nimetään sen tarkan pyyntöpolun mukaan.
Polkuun perustuva nimeäminen erottaa Chat Completions-, Responses- ja Messages-pyynnöt toisistaan
sisällyttämättä mallin tai identiteetin tietoja spanin nimeen. Resurssiattribuutteihin kuuluvat
`service.name` ja paketin `service.version`.

Tavallinen chat-yritysten lokikirjain (`open-sse/handlers/chatCore/attemptLogging.ts`) kirjoittaa
valmistumisen yhteydessä arvon `duration = Date.now() - startTime` eikä anna aikaleimaa;
tiedoston `src/lib/usage/callLogs.ts` funktio `saveCallLogOperation` asettaa aikaleiman oletusarvoksi
kirjoitusajan (valmistumisajan). Vienti asettaa siis loppuajaksi rivin aikaleiman ja alkuajaksi
loppuajan − keston (millisekunteina, muunnettuna desimaalisiksi nanosekunneiksi). Myös kutsujan antamat
historialliset aikaleimat säilytetään loppuaikana; rivikohtaista aloitus-/valmistumiserottelua ei ole.
Null-arvoinen kesto muuttuu nollaksi. Virheelliset tai puuttuvat aikaleimat aiheuttavat erän
epäonnistumisen sen sijaan, että luotaisiin epädeterministisiä spaneja. `ttftMs` voi olla null,
ja se vastaa attribuuttia `omniroute.ttft_ms`.

Attribuutteihin kuuluvat `gen_ai.operation.name="chat"`, palveluntarjoaja, pyydetty/vastauksen malli,
syöte-/tulostokenit, valinnaiset välimuistin luku-/luonti-/päättelytokenit, HTTP-tila,
combo, välimuistin lähde, istuntotunniste ja korrelaatiotunnus. OTLP:n kokonaislukuarvot ja aikaleimat
ovat desimaalimerkkijonoja; merkkijonot, totuusarvot ja desimaaliluvut käyttävät omia natiiveja OTLP-arvomuotojaan.
Virhespanien tila on ERROR, ja niillä on puhdistettu tilaviesti. Kanonisessa tietueessa
ei ole ylävirran isännän URL-osoitetta, joten `server.address` jätetään pois sen sijaan, että
keräin tunnistettaisiin virheellisesti mallipalvelimeksi. Kustannuksia ei viedä.

Vain `includeBodies=true` lataa sisällön. Kun `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` sisältävät puhdistetun pyynnön/vastauksen
rungon JSON-muodossa sellaisena kuin OmniRoute on sen tallentanut (kanonisoituna, jos se voidaan jäsentää),
eivätkä uudelleenmuotoiltuna semconv-viestitaulukkona. Katkaistut tai muut kuin JSON-rungot säilyvät raakatekstinä.
Kun `langfuseMapping=true`, rungot lähetetään vain attribuutteina
`langfuse.observation.input` / `langfuse.observation.output`;
`gen_ai.*.messages`-attribuutit jätetään pois, jotta kukin runko lähetetään kerran. Molemmat tilat
perivät arvon `maxBodyBytes` nykyisestä sisällön latauspolusta;
`omniroute.bodies_truncated=true` ilmaisee katkaisun.
Tämä kohde ei lisää ylimääräisiä käsittelyketjun tilannekuvia eikä puhdistamattomien artefaktien lukuja;
valinnainen pyyntöotsakkeiden tallennus käyttää alla kuvattua nykyistä ladattua asiakkaan tilannekuvaa.
Käytä runkoja vietäessä minuuttitason ajastusta, kuten `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
sen sijaan, että kerryttäisit tunnin mittaisen jonon.

### Valinnaiset asiakkaan pyyntöotsakkeet

Otsakkeiden tallennus on **oletusarvoisesti pois käytöstä**. Aseta `requestHeaderAllowlist` kohteen asetuksissa
ja ota käyttöön **Vie kehotteet ja vastaukset** (kohteen asetus `includeBodies: true`).
Sallittujen luettelo hyväksyy API-taulukon tai tekstialueen, jossa nimet erotetaan rivinvaihdoilla tai pilkuilla:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nimet täsmäävät tarkasti kirjainkoosta riippumatta, paitsi jos yksi lopussa oleva `*` valitsee ei-tyhjän
otsakenimen etuliitteen. Pelkkä `*`, nimen sisäiset jokerimerkit ja virheelliset HTTP-otsakenimet hylätään.
Valitsimia voi olla enintään 64, ja kunkin nimi tai etuliite voi olla enintään 256 ASCII-tavua.
Tämä asetus on erillinen `headers`-asetuksesta, jolla viejä tunnistautuu kerääjälle.

Tallennus lukee vain `pipeline_client_request`-kenttää, joka täytetään tallennetun yksityiskohtaisen käsittelyketjun
`clientRawRequest`-kentästä (tai vanhasta `clientRequest`-kentästä). Se ei koskaan käytä varavaihtoehtona palveluntarjoajan pyyntöotsakkeita.
Käsittelyketjun yksityiskohtaisen lokituksen on täytynyt olla käytössä pyyntöä tallennettaessa. Jos
`includeBodies` on poistettu käytöstä tai asiakkaan tilannevedoksen JSON puuttuu, on vioittunut tai on katkaistu, otsakeattribuutteja
ei tuoteta. `maxBodyBytes`-arvon kasvattaminen voi estää tilannevedoksen katkaisun viennin aikana;
se ei voi palauttaa tietoja, joita ei koskaan tallennettu. Yli 1 MiB:n kokoinen tai yli
256 otsakemerkintää sisältävä tilannevedos ohitetaan. Nykyinen kehotteiden ja vastausten vienti pysyy käytössä
otsakkeiden tallennuksen rinnalla; sallittujen luettelo ei tarjoa vain otsakkeet täydentävää tilaa.

Valituista arvoista tulee OTLP-merkkijonotaulukoita nimellä `http.request.header.<full lowercase header name>`,
myös silloin, kun kyseessä on yksittäinen merkkijono. Esimerkiksi `X-OmniRoute-Meta-Team: example-team` muuttuu
attribuutiksi `http.request.header.x-omniroute-meta-team`, jonka arvo on
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Koko etuliite säilytetään: nämä ovat tavallisia otsakkeita, eikä niille tehdä liiketoimintakenttien jäsennystä tai
`omniroute.metadata.*`- / Langfuse-metatietomuunnosta. `langfuseMapping` ei muuta otsakkeiden
semantiikkaa. Valittu yksiarvoinen `User-Agent` asettaa myös vakioskalaarin
`user_agent.original`. Yhden arvon sisällä olevia pilkkuja ei käytetä jakamiseen. Kirjainkokovariantit yhdistetään tallennettujen
merkintöjen järjestyksessä; mikä tahansa virheellinen variantti johtaa koko otsakkeen pois jättämiseen. Attribuutit järjestetään pienikirjaimisen nimen mukaan.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-avainotsakkeet, auth/token/secret/password/credential-tunnisteita
sisältävät nimet sekä sisäiset yhdyskäytävän tunnistetiedot jätetään aina
pois, vaikka ne olisi valittu tai osittain peitetty tallennuksessa. Tunnettujen tunnistetietomallien tunnistukseen käytetään
yhteistä tunnistetietojen tunnistinta; peittomerkinnät jätetään pois eikä niitä viedä turvallisina arvoina.
Vain merkkijonot ja ei-tyhjät merkkijonotaulukot hyväksytään; numeroita tai olioita ei muunneta automaattisesti.
Virheelliset nimet, prototyyppiavaimet, ohjausmerkit (vaakasarkainta lukuun ottamatta) ja virheellinen Unicode
ohitetaan aiheuttamatta erän epäonnistumista tai sisällyttämättä niiden sisältöä virheisiin.

Kuhunkin spaniin tallennetaan enintään 32 otsaketta, 16 arvoa otsaketta kohden, 4096 UTF-8-tavua arvoa kohden
ja yhteensä 16384 UTF-8-tavua tallennettujen otsakkeiden nimiä ja arvoja. Ylisuuret tai virheelliset otsakkeet
jätetään kokonaan pois, niitä ei katkaista. Valinta on ylläpitäjän tietosuojapäätös: turvallisilta vaikuttavat nimet
voivat silti sisältää henkilötietoja, eivätkä nämä rajat ja tunnistimet ole yleiskäyttöinen henkilötietojen poistotyökalu.

### Toimitusrajat

Pyynnöt on rajattu 500 spaniin ja 4 MiB:uun UTF-8-koodattua JSONia, mukaan lukien viestikuori.
Jokaisen sallitun spanin koko tarkistetaan ennen kursorierän ensimmäistä pyyntöä. Jos yksittäinen
span ylittää rajan, mitään osaa kyseisestä erästä ei lähetetä ja toiminto epäonnistuu kehottaen pienentämään
`maxBodyBytes`-arvoa; spania ei pudoteta hiljaisesti pois. Ennakkotarkistus säilyttää vain tietueviitteet ja
tavumäärät ja hylkää jokaisen väliaikaisen spanin ja JSONin; spanit muodostetaan uudelleen rajattuja osia varten
sen sijaan, että erästä säilytettäisiin toinen sarjoitettu kopio. HTTP 408/429/5xx -tilanteissa, verkkovirheissä ja aikakatkaisuissa tehdään enintään
kolme yritystä eksponentiaalisella 250/500 ms:n odotusajalla. `Retry-After`-otsakkeen sekunnit tai HTTP-päivämäärät
voivat pidentää viivettä enintään 5 sekuntiin. Muut tilakoodit aiheuttavat välittömän epäonnistumisen. Myös OTLP:n 2xx-vastauksen osittainen hylkäys aiheuttaa poikkeuksen
sen sijaan, että kadonnut span kuitattaisiin; tyhjät tai kelvolliset JSON-kuittaukset hyväksytään, ja
vastauksen lukuraja on 64 KiB.

Virheet sisältävät vain viejän hallitsemia tietoja: HTTP-tilan, uudelleenyritysluokan, yritysten ja lähetettyjen spanien
määrät tai kiinteän kuittaus- tai verkkovirheen sanamuodon. Kerääjän vastausrunkoja,
osittaisen onnistumisen määriä tai vastausotsakkeita ei koskaan kopioida virheisiin, lokeihin tai
koontinäyttöön. Epäonnistunutta tai osittain hyväksyttyä erää ei kuitata: kohteen tilana näkyy
Epäonnistuu kyseisellä tilakoodilla, kursori pysyy viimeisessä kuitatussa erässä ja seuraava ajo
lähettää samat rivit uudelleen. Pysyvät virhetilat aiheuttavat epäonnistumisen, kunnes kerääjä tai määritykset
korjataan. Katso vastausten tarkemmat tiedot kerääjän omista lokeista. Kutsulokin virheyhteenvedoissa säilyy
niiden erillinen peittokäsittely.
`prepare()` ei luo resursseja; Testi lähettää täsmälleen `{"resourceSpans":[]}` ja ilmoittaa
HTTP-tilan kirjoittamatta kutsulokin spaneja.

Trace-tunnukset ja span-tunnukset ovat ensimmäiset 32/16 heksanumeroa SHA-256-tiivisteistä, jotka lasketaan lausekkeista
`"omniroute.trace\0" + callLogId` ja `"omniroute.span\0" + callLogId`. Uudelleenlähetyksissä käytetään
samoja tunnuksia. Tämä ei takaa kaksoiskappaleiden poistoa: jotkin taustajärjestelmät, kuten Langfusen
v4-vastaanotto, eivät poista samalla tunnuksella saapuvia spanien kaksoiskappaleita. Kaatuminen tai osan epäonnistuminen voi
aiheuttaa enintään yhden kuittaamattoman kursorierän uudelleenlähetyksen; koko kyseinen erä voi kahdentua,
ei pelkästään sen viimeinen HTTP-osa. Valitse kursorierän koko tämä kompromissi huomioiden.

### Langfuse-esimerkki

Määritä nämä kentät itse ylläpidetylle Langfuse-instanssille:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Muodosta Authorization-arvo paikallisesti Base64-koodaamalla kirjaimellinen `public-key:secret-key`-
merkkijono (esimerkiksi komennolla `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Älä liitä oikeita tunnistetietoja lokeihin, kuvakaappauksiin tai ongelmaraportteihin. Muunnos
asettaa automaattisesti otsakkeen `x-langfuse-ingestion-version: 4`; Authorization annetaan edelleen `headers`-kentässä.
Sekä otsakkeet että luotu identiteetin suola käyttävät olemassa olevaa salattujen salaisuuskenttien
mekanismia ja API-paikkamerkkejä; `STORAGE_ENCRYPTION_KEY` on pakollinen.

Määritys lisää generoinnin tyypin/mallin, käytön tiedot JSON-muodossa (syöte/tuloste/yhteensä ja käytettävissä olevat
välimuistiavaimet), syötteen ja tulosteen tilannekuvat JSON-muodossa, ERROR/DEFAULT-tason, puhdistetun tilaviestin,
jäljityksen nimen, istuntotunnisteen, valinnaisen ympäristön sekä suodatettavan
`langfuse.observation.metadata.<key>`-kentän palveluntarjoajalle, pyydetylle mallille, polulle, yhdistelmälle, välimuistin
lähteelle ja tilalle. `langfuse.observation.completion_start_time` on ISO 8601 -muotoinen ajankohta,
joka lasketaan lisäämällä aloitusaikaan TTFT vain, kun TTFT tunnetaan eikä se ylitä kestoa. Kustannusattribuutteja ei lähetetä.

Identiteettitilat koskevat kenttää `langfuse.user.id`:

- `pseudonymous` (oletus): API-avaimen sisäisestä tunnisteesta laskettu HMAC-SHA256, jossa käytetään satunnaista
  kohdekohtaista 32 tavun suolaa. Jos suolaa ei ole, se luodaan kohteen luonnin yhteydessä, salataan
  kenttään `identitySalt`, eikä sitä koskaan palauteta. Se säilytetään muokkausten yhteydessä. Raakoja avaintunnisteita ei koskaan
  lisätä span-attribuutteihin. Kohteen suolan luominen uudelleen tai vaihtaminen muuttaa identiteettejä.
- `keyName`: määritetty API-avaimen nimi, joka tarkoituksellisesti paljastaa kyseisen ylläpitäjän antaman nimen.
- `none`: ei käyttäjätunnistetta. Istuntotunnisteet viedään silti, jos niitä on; nämä tilat eivät
  anonymisoi mielivaltaista kehotteen sisältöä tai ylläpitäjän antamia istunto-/korrelaatiotunnisteita.

### Aloittaminen ilman historiatietojen täydennystä

Ota vain luonnin yhteydessä käyttöön **Aloita nykyisestä kohdasta (ohita olemassa olevat lokit)** tai välitä
`startFromCurrentPosition: true` luontiin käytettävän API-pyynnön tietosisällön ylimmällä tasolla. Se alustaa
`cursor_row_id`-arvoksi säilytetyn kutsulokin nykyisen suurimman rowid-arvon käyttämällä olemassa olevia kohdistimen
aputoimintoja ilman migraatiota. Oletusarvo on false (kohdistin 0 ja säilytetyn historian täydennys).
Kyseessä ei ole päivityksen yhteydessä käytettävä kohdistimen nollausasetus.

Jaettu `ttftMs`-lisäys lisää myös nullable-sarakkeen `ttft_ms` BigQuery-määritykseen
ja uuden taulun skeemaan: sen skeematesti edellyttää, että jokaisella kanonisen tietueen kentällä on
sarake. Olemassa olevien taulujen vienti jatkuu muuttumattomana: `prepare()` lukee taulun skeeman ja
jättää pois vain kentän `ttft_ms`, jos kyseinen sarake puuttuu. Lisää nullable-tyyppinen INT64-sarake, jotta saat TTFT:n
seuraavalla ajokerralla, tai käytä uutta taulua. PATCH-pyyntöä, automaattista skeeman muutosta tai lisäoikeuksia
ei tarvita; kaikkien muiden rivikenttien skeematarkistus säilyy tiukkana.

---

## 6. Kohteen lisääminen

1. Luo `src/lib/logExport/destinations/<name>.ts`, joka vie `LogExportDestinationType`-tyypin:
   Zod-`configSchema`, käyttöliittymän `fields`-kuvaustaulukko, `secretFields` sekä
   `createClient(config)`, joka palauttaa metodit `test()` / `prepare()` / `send(records)`.
2. Lisää se `DESTINATIONS`-taulukkoon tiedostossa `src/lib/logExport/registry.ts`.
3. Kirjoita testit hakemistoon `tests/unit/`.

Siinä on koko muutos: pysyvyyskerros, cron-työ, REST-kerros, salaisuuksien salaus ja
hallintapaneelin lomake lukevat kaikki rekisteriä.

Uutta kohdetta koskee kaksi sääntöä:

- `send()`-metodin **on aiheutettava poikkeus** osittaisen epäonnistumisen yhteydessä. Onnistunut suoritus tarkoittaa, että kohteessa ovat kyseiset rivit,
  ja kohdistin siirtyy pysyvästi niiden ohi.
- Käyttäjän antaman URL-osoitteen vastaanottavan kohteen on validoitava se
  `parseAndValidateWebhookUrl`-funktion (`src/shared/network/outboundUrlGuardPolicy.ts`) avulla ennen noutoa
  samalla tavalla kuin webhookit. BigQuery ei tarvitse tätä, sillä sen isäntänimet ovat vakioita.

---

## 7. Käyttö

- **Hallintapaneeli**: Integraatiot → Lokien vienti. Lisää kohde, tarkista tunnistetiedot rivejä kirjoittamatta suorittamalla **Testaa** ja ota kohde sitten käyttöön.
- **Jono**: jokaisen kohteen kortti näyttää odottavat rivit ja kohdistimen; `GET
/api/log-export/status` palauttaa samat luvut sekä 20 viimeisintä työajoa.
- **Yhden kohteen epäonnistuminen ei aiheuta muiden epäonnistumista** — ajon yhteenveto tallentaa kohdekohtaisen
  tilan kenttiin `last_status` / `last_error`, ja työajojen historia säilyttää koostetiedot.
- **Kohteen poistaminen poistaa sen kohdistimen.** Kun kohde lisätään uudelleen, käsittely alkaa vanhimmasta säilytetystä
  puhelulokista, jolloin kohteeseen saatetaan lähettää uudelleen rivejä, jotka siellä jo ovat. BigQueryssä rivikohtainen
  `insertId` estää tämän vain BigQueryn oman kaksoiskappaleiden poistoikkunan aikana, joten kohde kannattaa mieluummin
  poistaa käytöstä kuin poistaa kokonaan.
