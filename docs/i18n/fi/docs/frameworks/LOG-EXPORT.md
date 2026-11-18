# Log export (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute-kutsulokien jatkuva, inkrementaalinen vienti ulkoiseen analytiikkatietovarastoon.

Hallintapaneelin Lokit-välilehti säilyttää pyyntöhistorian SQLitessä (`call_logs`), jonka kokoa rajoittavat
kierto ja säilytysaika. Lokivienti siirtää samat tietueet ajastetusti ulos, jotta ne säilyvät
paikallista tietokantaa pidempään ja ne voidaan yhdistää muihin tietoihin. BigQuery on ensimmäinen kohde;
putki perustuu rekisteriin, joten uusia kohteita voidaan lisätä olemassa olevien rinnalle.

---

## 1. Toimintaperiaate

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Ajastus** — yksi `JobRegistry`-cron-tehtävä, `log_export`, jonka oletusarvo on `0 * * * *` (tunnin välein,
  UTC). Rekisteröidään tiedostossa `src/lib/initCloudSync.ts`; voidaan ohittaa muuttujalla `OMNIROUTE_LOG_EXPORT_CRON`.
  Jokainen ajastuskerta käsittelee kaikkien **käytössä olevien** kohteiden odottavat tietueet peräkkäin.
- **Kursori** — SQLiten implisiittinen `call_logs.rowid`, joka tallennetaan kohdekohtaisesti kenttään
  `log_export_destinations.cursor_row_id`. `timestamp` ei tarkoituksella ole kursori: kutsujat
  voivat antaa sille oman arvonsa, joten hidas pyyntö voidaan kirjoittaa myöhemmin kuin nopeampi, joka alkoi
  myöhemmin, ja aikaleimakursori ohittaisi sen.
- **Eräkäsittely** — `batch_size` riviä pyyntöä kohti (oletus 500), `max_rows_per_run` riviä ajokertaa kohti
  (oletus 10000), jotta suuri jono puretaan usean ajastuskerran aikana eikä se varaa yhtä ajastuskertaa kokonaan.
- **Toimitus** — kursori etenee vasta, kun `send()` valmistuu onnistuneesti. Epäonnistunut erä jättää
  kursorin ennalleen, joten samoja rivejä yritetään uudelleen seuraavalla ajokerralla. Takuu on
  vähintään kerran -toimitus ja kohdepuolen kaksoiskappaleiden poisto, ei aito täsmälleen kerran -toimitus: BigQuery käyttää kunkin
  rivin avaimena kutsulokin tunnusta, jota se noudattaa mahdollisuuksien mukaan oman kaksoiskappaleiden poistoikkunansa sisällä.
- **Päällekkäisyyssuoja** — cron-ajastus ja `POST .../run` voivat käynnistyä samanaikaisesti. Kohde,
  jonka tietueita jo käsitellään, ohitetaan sen sijaan, että se käsiteltäisiin kahdesti (`skipped: true` ajon tuloksessa),
  joten samanaikainen ajo ei voi lähettää erää uudelleen tai siirtää kursoria taaksepäin.
- **Tyhjennyksestä palautuminen** — jos `cursor_row_id` päätyy arvon `MAX(rowid)` yläpuolelle (koko taulu
  tyhjennettiin ja rivitunnukset alkoivat alusta), suorittaja palauttaa kursorin arvoon 0 sen sijaan, että se jäisi pysyvästi huomaamatta uusia rivejä.

### Eristetty suorittaja ja rajat

Jokainen kohdekohtainen ajo Nodessa käynnistää erillisen, lyhytikäisen käyttöjärjestelmän aliprosessin (`child_process`
ja IPC, ei `worker_threads`). Rungon lukeminen, hyötykuorman JSON-jäsennys ja -sarjallistaminen, kohteen
`prepare()` ja kohteen verkkoliikenne suoritetaan kaikki siellä, eivät palvelimen tapahtumasilmukassa.
Vain asetukset ja pienet edistymisviestit kulkevat IPC:n kautta; vietyjä tietueita ei koskaan palauteta
palvelimelle. Cron-tehtävä ja Suorita nyt -reitti säilyttävät saman julkisen tuloksen ja päällekkäisyyssuojan.

Aliprosessi avaa palvelimen määrittämän `DATA_DIR/storage.sqlite`-tiedoston vain luku -tilassa käyttäen `node:sqlite`-moduulia,
asetuksilla `busy_timeout=5000` ja `query_only=ON`. Se ei tuo yhteistä DB-singleton-instanssia eikä suorita
migraatioita, varmuuskopiointeja tai SQLite-päivityksiä. Puuttuvien tai vioittuneiden artefaktien kirjanpito (mukaan lukien
vioittuneen artefaktin UPDATE) jää vain hallintapaneelin tietojen hakupolkuun. Molemmat polut käyttävät yhteistä puhdasta
tietojen ratkaisijaa; vienti käyttää asynkronisia tiedostojärjestelmälukuja ja samaa ratkaisujärjestystä: artefakti → vanha
sisäinen tallennus → vanha levytallennus → ei mitään. Ajo tallentaa suurimman lisätyn rivitunnuksen tilannekuvan,
kun aliprosessi avaa lukijansa; myöhemmät lisäykset odottavat seuraavaa ajokertaa. Tämä on lisäysten
raja, ei pitkäkestoinen SQLite-transaktio: WAL-kirjoittajat ja tarkistuspisteet voivat toimia vapaasti
verkkoodotusten aikana. Tämä raja ei jäädytä olemassa olevien rivien päivityksiä tai poistoja.

Jokaisen hyväksytyn erän jälkeen aliprosessi odottaa kuittausta. Palvelin tallentaa ensin
kursorin funktiolla `advanceLogExportCursor` ja lähettää sitten viestin `ack`; seuraava erä ei käynnisty ennen sitä.
Lähetysvirhe, kaatuminen tai aikakatkaisu kirjataan epäonnistumiseksi siirtämättä kyseisen erän kursoria eteenpäin. Aiemmin
kuitatut erät pysyvät vahvistettuina; enintään yksi kuittaamaton erä voidaan lähettää uudelleen.
Onnistuminen kirjataan vasta viestin `done` ja aliprosessin normaalin päättymisen jälkeen. Virhetilanteissa aliprosessi päätetään
signaalilla SIGTERM ja 500 ms:n jälkeen tarvittaessa signaalilla SIGKILL, ja suorittaja odottaa prosessin sulkeutumista.

| Ympäristömuuttuja                             | Oletus | Tarkoitus                                    |
| --------------------------------------------- | ------ | -------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Kohdekohtainen kokonaisaikaraja              |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Aliprosessin V8:n old-space-raja megatavuina |

Virheellisten, ei-positiivisten tai muiden kuin kokonaislukuarvojen sijaan käytetään oletusarvoja. Keon asetus ei ole
RSS-kokonaisraja; erittäin suuret erät voivat silti kuluttaa aliprosessin muistin loppuun ja keskeyttää ajon turvallisesti.
Oletusarvo 1024 MB jättää liikkumavaraa oletusarvoiselle 500 rivin erälle, jossa on 512 KiB:n artefakteja ja
rungot mukana, mukaan lukien BigQueryn tavumäärän mukaan lohkottu JSON-sarjallistaminen. Se ei tee
10000 rivin rungot sisältävästä erästä turvallista. V8-keon muistin loppuminen kirjataan virheeksi, jonka korjausohje on selkeä: pienennä erän
kokoa tai suurenna arvoa `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursori pysyy viimeksi
kuitatun erän kohdalla. Nykyaikainen artefaktien kokoraja ei koske vanhoja sisäisesti tai levylle tallennettuja runkoja.
Ylläpitäjien on mitoitettava RSS erikseen, etenkin muistirajoitetuissa konteissa.

Aliprosessi perii vain ratkaistun `DATA_DIR`-arvon, `NODE_ENV`-arvon, erikseen asetetun `TZ`-arvon (vanhojen tiedostonimien
paikallisen ajan tulkintaa varten), `ELECTRON_RUN_AS_NODE`-arvon, jos se on asetettu, sekä seuraavat lähtevien yhteyksien asetukset:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (ja niiden pienaakkosmuodot),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globaali Undici-dispatcher käyttää samoja pelkästään ympäristömuuttujiin perustuvia välityspalvelimen valintasääntöjä ja paikallisten isäntien
ohitussääntöjä kuin palvelin, mukaan lukien `NO_PROXY`; se ei tuo `proxyFetch.ts`-moduulia eikä sen tietokanta- tai ominaisuuslippuja.
Välityspalvelimen tunnistetiedot peitetään edelleen välitettävästä tulosteesta ja tallennetuista virheistä. Kohteen tunnistetiedot
kulkevat vain yhdessä käynnistyksen IPC-viestissä, eivät koskaan argv-argumenteissa tai ympäristömuuttujissa; edelleen välitettävät tulosteet ja virheet
varustetaan etuliitteellä ja puhdistetaan. Aliprosessin suoritusargumenteissa poistetaan käytöstä vain `ExperimentalWarning`, jotta
Noden SQLite-varoitus ei toistu jokaisella cron-ajolla; muut varoitustyypit pysyvät näkyvissä.

Kohdemoduulien on oltava tuotavissa ilman Next.js- tai server-only-riippuvuuksia. Nykyinen
BigQuery-toteutus täyttää jo tämän vaatimuksen. Käyttöoikeustunnusten välimuistit säilyvät vain aliprosessin
ajon ajan, eivät ajojen välillä. Node on tuettu ajoympäristö (`package.json`-tiedoston engines-määritys), mutta README-tiedoston Bun-
asennusosio ja `Dockerfile.bun` esittelevät myös tuotantokäyttöön sopivan yhteensopivuusvaihtoehdon, joka käyttää
`bun:sqlite`-moduulia (`src/lib/db/core.ts` / sovittimet). Bunissa viennit säilyttävät siksi aiemman
prosessin sisäisen toteutustavan ja antavat kertaluonteisen varoituksen: aliprosessin keon ja aikakatkaisun eristys ei ole käytettävissä. Käytä
Nodea tapahtumasilmukan ja muistin loppumisen eristämiseen; Bunia ei tässä pidetä vain kehityskäyttöön tarkoitettuna.

Kun `includeBodies` on käytössä, suosi minuuttitason ajoväliä, kuten
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, sen sijaan että kerryttäisit tunnin verran vietävää sisältöä.
Erä- ja rivirajat rajoittavat edelleen jokaista ajoa. Prosessin käynnistyskustannus syntyy jokaiselle kohteelle jokaisella ajolla;
pieni käynnistyskustannus mahdollistaa palvelimen tapahtumasilmukan eristämisen, ei prosessorin kokonaiskäytön vähentämistä.

### Hyötykuormat (kehotteet ja vastaukset)

Oletusarvoisesti vienti sisältää vain yhteenvetokentät, jotka näkyvät lokien **luettelossa**. Kun
**Vie kehotteet ja vastaukset** (`includeBodies`) otetaan käyttöön, mukana lähetetään lisäksi se, mitä lokien **tietonäkymä**
näyttää kustakin kutsusta:

| Kenttä                           | Sisältö                                                                     |
| -------------------------------- | --------------------------------------------------------------------------- |
| `request_body` / `response_body` | Kutsun hyötykuormat siinä muodossa kuin hallintanäkymä ne esittää           |
| `pipeline_route_decision`        | Reitittimen valitsema kohde ja malli                                        |
| `pipeline_client_request`        | Raakapyyntö täsmälleen asiakkaan lähettämässä muodossa                      |
| `pipeline_openai_request`        | Sisäiseen OpenAI-muotoon muuntamisen jälkeen                                |
| `pipeline_provider_request`      | Palveluntarjoajalle tosiasiallisesti lähetetty pyyntö tämän omassa muodossa |
| `pipeline_provider_response`     | Palveluntarjoajan raakavastaus                                              |
| `pipeline_client_response`       | Kutsujalle palautettu sisältö                                               |
| `pipeline_error`                 | Epäonnistuneen kutsun käsittelyketjutason virhetiedot                       |
| `bodies_truncated`               | Tosi, kun jokin yllä olevista kentistä saavutti `maxBodyBytes`-rajan        |

Tämä on kehotteiden sisältöä, joten toiminto on **oletusarvoisesti pois käytöstä** ja tarkoituksella kohdekohtainen valinta.
Vientiin päätyy se, mitä hallintanäkymä näyttää, sillä vienti ja `getCallLogById` käyttävät samaa tietojen
hakumenetelmää: hyötykuormista on
jo tallennusvaiheessa puhdistettu henkilötiedot ja peitetty salaisuudet, eikä
`noLog`-API-avaimella tehty kutsu tallenna hyötykuormaa lainkaan, joten vietävää ei ole.

Hyötykuormat luetaan rivikohtaisesti tiedostojärjestelmään tallennetusta artefaktista, joten tietojen täydentäminen tehdään vain kohteille,
jotka ovat sitä pyytäneet. Jos artefakti puuttuu tai on vioittunut, sen yhteenveto viedään null-arvoisilla hyötykuormilla sen sijaan,
että koko erä epäonnistuisi ja kohdistin jäisi paikalleen.

`maxBodyBytes` (oletusarvo 262144) rajoittaa kunkin kentän kokoa. Pidemmät hyötykuormat **katkaistaan sen sijaan,
että ne jätettäisiin pois** — katkaistukin kehote kertoo yhä, ”mitä kysyttiin” — ja rivi merkitään
`bodies_truncated`-lipulla. Suoratoistettuja lohkokohtaisia muutoksia ei viedä; koottu vastaus on
jo kentissä `pipeline_provider_response` ja `pipeline_client_response`.

---

## 2. Tiedostot

| Osa                           | Sijainti                                     |
| ----------------------------- | -------------------------------------------- |
| Kohteen sopimus               | `src/lib/logExport/types.ts`                 |
| Rekisteri                     | `src/lib/logExport/registry.ts`              |
| Salaisuuksien käsittely       | `src/lib/logExport/secrets.ts`               |
| Suorittaja (emoprosessin IPC) | `src/lib/logExport/runner.ts`                |
| Prosessin elinkaari           | `src/lib/logExport/childRunner.ts`           |
| Lapsiprosessin aloituspiste   | `src/lib/logExport/exportChild.ts`           |
| Vain luku -avaaja             | `src/lib/db/logExportReadOnly.ts`            |
| Jaettu kysely/muunnos         | `src/lib/usage/callLogExportQueries.ts`      |
| Yksityiskohtien selvittäjä    | `src/lib/usage/callLogDetailResolver.ts`     |
| API-projektio                 | `src/lib/logExport/presenter.ts`             |
| BigQuery-kohde                | `src/lib/logExport/destinations/bigquery.ts` |
| Googlen palvelutilin todennus | `src/lib/logExport/googleServiceAccount.ts`  |
| Kutsulokin lähde              | `src/lib/usage/callLogExportSource.ts`       |
| Pysyväistallennus             | `src/lib/db/logExportDestinations.ts`        |
| Cron-tehtävä                  | `src/lib/jobs/logExportJob.ts`               |
| REST-kerros                   | `src/app/api/log-export/`                    |
| Hallintapaneelin sivu         | `src/app/(dashboard)/dashboard/log-export/`  |

Skeema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Kaikki reitit edellyttävät hallintatodennusta (`requireManagementAuth`). Salaisuuksia ei koskaan palauteta:
tallennettu salaisuus palautetaan literaalina `__stored__`, ja tämän arvon lähettäminen takaisin päivityksen yhteydessä
säilyttää tallennetun tunnistetiedon.

Sellaisen kohteen luominen tai päivittäminen, jonka tyyppi määrittelee salaisuuden, **edellyttää
`STORAGE_ENCRYPTION_KEY`**-muuttujaa. Ilman sitä `encrypt()` päästää tiedot läpi sellaisinaan ilmoittamatta siitä, joten kirjoitus
hylätään 400-virheellä sen sijaan, että tunnistetieto tallennettaisiin SQLiteen selväkielisenä (sama suojaus on käytössä
Telegramin webhookissa).

| Menetelmä | Polku                                    | Tarkoitus                                                |
| --------- | ---------------------------------------- | -------------------------------------------------------- |
| `GET`     | `/api/log-export/types`                  | Kohdetyypit ja niiden määrityskenttien luettelo          |
| `GET`     | `/api/log-export/destinations`           | Listaa kohteet (salaisuudet peitettyinä)                 |
| `POST`    | `/api/log-export/destinations`           | Luo kohde                                                |
| `GET`     | `/api/log-export/destinations/{id}`      | Lue yksi kohde                                           |
| `PUT`     | `/api/log-export/destinations/{id}`      | Päivitä nimi / käytössäolo / määritykset / eräkäsittely  |
| `DELETE`  | `/api/log-export/destinations/{id}`      | Poista                                                   |
| `POST`    | `/api/log-export/destinations/{id}/test` | Testaa tunnistetiedot kirjoittamatta mitään              |
| `POST`    | `/api/log-export/destinations/{id}/run`  | Pura jono nyt samalla suorituspolulla kuin ajastettu ajo |
| `GET`     | `/api/log-export/status`                 | Cronin tila, viimeisimmät ajot, kohdekohtainen jono      |

`GET /api/log-export/types` tekee käyttöliittymästä yleiskäyttöisen: hallintapaneelin lomake muodostetaan
palautetuista kenttäkuvauksista, joten uusi kohde ei edellytä käyttöliittymämuutoksia.

---

## 4. BigQuery-kohde

Asetusavaimet (`type: "bigquery"`):

| Avain                | Huomautukset                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `projectId`          | GCP-projekti, joka sisältää datasetin                                                           |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                 |
| `location`           | Käytetään vain, kun dataset on luotava (oletus `EU`)                                            |
| `serviceAccountJson` | Palvelutilin avain. Salainen: salattu levossa, ei koskaan palauteta                             |
| `autoCreate`         | Luo puuttuvan datasetin/taulun; lisää ehdollisesti nullable-käyttötodistekentät (oletus `true`) |

Palvelutili tarvitsee oikeuden `bigquery.tables.updateData` kohdetaulussa sekä oikeudet
`bigquery.datasets.create` / `bigquery.tables.create`, kun `autoCreate` on käytössä.
Olemassa olevan taulun päivittäminen kahden nullable-käyttötodistekentän lisäämiseksi edellyttää
myös oikeutta `bigquery.tables.update`. Puuttuva käyttöoikeus epäonnistuttaa viennin ilman, että
sen kursoria siirretään eteenpäin.

Määritetty erä on **kursoriyksikkö**, ei HTTP-yksikkö: `send()` pilkkoo sen insertAll-kutsuiksi,
joissa on enintään 500 riviä, joten suuri `batch_size` ei voi ylittää BigQueryn 10 Mt:n
pyyntörajaa. Tilapäiset tilat (408/429/500/502/503/504) yritetään uudelleen enintään kolme kertaa
eksponentiaalisella viiveellä käyttäen samoja insertId-tunnisteita; todennus- ja skeemavirheet
aiheuttavat poikkeuksen ensimmäisellä yrityksellä sen sijaan, että ne kuluttaisivat ajon.

Juuri luotu taulu ei vielä näy suoratoistopäätepisteelle, joka palauttaa muutaman sekunnin ajan
404:n. Tämä 404 yritetään uudelleen, mutta **vain silloin, kun tämä ajo loi taulun** —
aidosti puuttuva taulu epäonnistuu edelleen välittömästi. Huomaa, että hiljattain poistetun taulun
luominen uudelleen samalla nimellä saa BigBigueryn estämään suoratoistolisäykset useiden minuuttien
ajan; tämä johtuu poistamisesta ja uudelleenluomisesta, joten uuden taulun nimen käyttäminen on
suositeltavampaa kuin taulun poistaminen ja lisääminen uudelleen.

**Osittainen epäonnistuminen saapuu HTTP 200 -vastauksena, jossa on epätyhjä `insertErrors[]`.**
Tämä käsitellään epäonnistumisena ja aiheuttaa poikkeuksen, mikä estää kursorin etenemisen niiden
rivien ohi, joita BigQuery ei hyväksynyt; `tests/unit/log-export-bigquery.test.ts` varmistaa tämän
toiminnan.

Siirtotapa on pelkkä REST — itse allekirjoitettu RS256-väittämä vaihdetaan käyttöoikeustunnukseen
osoitteessa `https://oauth2.googleapis.com/token`, minkä jälkeen rivit lähetetään kohteeseen
`tabledata.insertAll`. Google SDK:ta ei lisätä riippuvuudeksi. Käyttöoikeustunnukset välimuistitetaan
prosessin sisällä palvelutilikohtaisesti (palvelutili, käyttöalue).

Luotu taulu sisältää yhden sarakkeen kutakin Lokit-välilehden kenttää kohti sekä sarakkeen
`exported_at`, ja sen rakenne on suunniteltu siihen, miten kutsulokeja käytännössä kysellään:

- **Päivän mukaan osioitu sarakkeen `timestamp` perusteella**, joten päivämäärällä rajattu kysely
  lukee vain kyseiset päivät.
- **Klusteroitu sarakkeiden `api_key_name`, `provider`, `model`, `status` perusteella** (tässä
  järjestyksessä), joten suodattaessa sen mukaan, kuka suoritti kutsun, minne se lähetettiin tai
  epäonnistuiko se, lohkoja voidaan karsia kunkin osion sisältä. BigQuery sallii enintään neljä
  klusterointisaraketta, ja järjestyksellä on merkitystä: pelkän `api_key_name`-sarakkeen suodatus
  karsii lohkoja, kun taas pelkän `status`-sarakkeen suodatus ei.
- **Valinnainen osioiden säilytys** asetuksella `partitionExpirationDays` (0 säilyttää kaiken),
  jota sovelletaan taulua luotaessa.

Molemmat asetukset vaikuttavat luontihetkellä. Olemassa oleva taulu säilyttää nykyisen rakenteensa,
joten osoita kohde uuteen taulutunnisteeseen, jos haluat ottaa ne käyttöön.

`tests/unit/log-export-bigquery.test.ts` varmistaa, että muunnin ja taulun skeema pysyvät
yhtäpitävinä, joten uutta kutsulokin saraketta ei voida huomaamatta jättää pois viennin yhteydessä.

Erät pilkotaan **sekä rivimäärän että sarjallistettujen tavujen perusteella**. Pelkkä rivimäärä ei
riitä, kun hyötykuormia viedään: kehotteita sisältävät 500 riviä voivat olla kymmeniä megatavuja,
ja insertAll hylkää yli 10 Mt:n pyynnön. Osat suljetaan, kun täynnä on 500 riviä tai 9 Mt, kumpi
tahansa täyttyy ensin.

---

## 5. OTLP/HTTP-jäljitysten kohde

Asetuksissa käytetään arvoa `type: "otlp-http"`. Kyseessä on ajastettu, kohdistimen tukema
tallennettujen kutsulokien vienti, ei kohteessa
`open-sse/services/routing/otel.ts` oleva parhaan yrityksen reaaliaikainen
reititystapahtumien vastaanotin. Se ei lue vastaanottimen ympäristömuuttujia, ajastimia tai
puskureita eikä muuta niitä. Molempien käyttöönotto voi tuottaa kahden itsenäisen tyyppisiä
span-olioita; käytä `omniroute.log-export`-instrumentointialuetta erottaaksesi nämä
kutsulokispan-oliot.

| Avain                    | Oletus / tarkoitus                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `endpoint`               | Pakollinen täydellinen HTTP(S)-jäljitysten URL-osoite; `/v1/traces`-päätettä ei lisätä    |
| `headers`                | Valinnaiset `Name: value` -rivit tai merkkijonoista koostuva JSON-objekti; salattu        |
| `requestHeaderAllowlist` | Tyhjä (pois käytöstä); kerättävien asiakasotsakkeiden nimet/etuliitteet span-määritteiksi |
| `serviceName`            | `omniroute`; resurssin `service.name`                                                     |
| `langfuseMapping`        | `false`; lisää Langfuse-sukupolvi-/istunto-/käyttäjämääritteet                            |
| `identity`               | `pseudonymous`, `keyName` tai `none`                                                      |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                   |
| `timeoutMs`              | `30000` kutakin HTTP-yritystä kohden                                                      |
| `environment`            | Asettamatta; valinnainen `langfuse.environment`                                           |

Yleinen hallintapaneeli näyttää nämä kentät. `paths` hyväksyy API-taulukon tai tekstialueen,
jossa tarkat polut on eroteltu rivinvaihdoilla/pilkuilla. Embeddings-, rerank- ja muut polut
ohitetaan, ellei niitä sallita nimenomaisesti. Ohitetut rivit kasvattavat silti kohdistinta;
nykyisen suorittimen `exported`/`exportedTotal`-laskurit laskevat käsitellyt lähderivit,
mukaan lukien suodatetut rivit, eivät hyväksyttyjä span-olioita. Suodatus tehdään lapsiprosessissa
muuttamatta sen IPC-/kohdistinsopimusta.

URL-osoitteiden validoinnissa käytetään tietokannasta riippumatonta
`parseAndValidateNonMetadataUrl`-apufunktiota tiedostosta
`src/shared/network/outboundUrlGuard.ts`: `block-metadata`-käytäntöä. Siinä on samat
ehdottomat metadata-, protokolla- ja upotettujen tunnistetietojen tarkistukset kuin
webhook-validaattorissa, mutta yksityiset URL-osoitteet on sallittu ilman yleisen
ominaisuuslipun ohitusta. Näin voidaan käyttää itse ylläpidettyjä Langfuse-, Phoenix-, Tempo-
ja Collector-päätepisteitä, mukaan lukien yksityiset HTTP-päätepisteet.
Pilvimetadatan isännät estetään aina.
Uudelleenohjauksia ei seurata, joten Collector ei voi uudelleenohjata tunnistetietoja
toiseen isäntään. Kuten nykyinen leksikaalinen URL-vartija, tämä ei lukitse DNS-resoluutiota;
määritä vain operaattorin hallitsemia isäntiä. Suosi HTTPS:ää aina, kun päätepiste ei ole
luotetussa verkossa.

### Hyötykuorma ja toimitus

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) sisältää yhden
CLIENT-span-olion kutakin sallittua riviä kohden; span-olio nimetään tarkan pyyntöpolun mukaan.
Polkujen nimeäminen erottaa Chat Completions-, Responses- ja Messages-pyynnöt upottamatta
malli- tai identiteettitietoja span-olion nimeen. Resurssimääritteisiin kuuluvat `service.name`
ja paketin `service.version`.

Tavallinen chat-yritysten kirjaaja (`open-sse/handlers/chatCore/attemptLogging.ts`) kirjoittaa
`duration = Date.now() - startTime` suorituksen päättyessä eikä toimita aikaleimaa;
`saveCallLogOperation` tiedostossa `src/lib/usage/callLogs.ts` käyttää aikaleimana oletusarvoisesti
kirjoitushetkeä (suorituksen päättymisaikaa). Vienti määrittää siksi lopetusajaksi rivin
aikaleiman ja aloitusajaksi lopetusajan vähennettynä kestolla
(millisekunnit muunnettuna desimaalisiksi nanosekunneiksi). Kutsujan toimittamat historialliset
aikaleimat säilytetään myös lopetusaikana; riviä kohden ei ole erottelua aloitus-/päättymisajan
välillä. Null-arvoinen kesto tulkitaan nollaksi. Virheelliset tai puuttuvat aikaleimat
epäonnistavat erän sen sijaan, että syntyisi epädeterministisiä span-olioita. `ttftMs` on
nullable ja muunnetaan arvoksi `omniroute.ttft_ms`.

Määritteisiin kuuluvat `gen_ai.operation.name="chat"`, palveluntarjoaja, pyydetty/vastauksen
malli, syöte-/tulostetunnukset, valinnaiset välimuistin luku-/luonti-/päättelytunnukset,
HTTP-tila, yhdistelmä, välimuistin lähde, istuntotunniste ja korrelaatiotunnus. OTLP:n
kokonaislukuarvot ja aikaleimat ovat desimaalimerkkijonoja; merkkijonot, totuusarvot ja
murtoluvut käyttävät omia OTLP-arvomuunnelmiaan. Virhespan-olioiden tila on ERROR, ja
tilaviesti on puhdistettu. Kanonisessa tietueessa ei ole ylemmän tason isäntäkoneen URL-osoitetta,
joten `server.address` jätetään pois sen sijaan, että Collector virheellisesti tunnistettaisiin
mallipalvelimeksi. Kustannuksia ei viedä.

Vain `includeBodies=true` lataa sisällön. Kun `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` sisältävät OmniRouten tallentaman
puhdistetun pyyntö-/vastausrungon JSON-muodossa (kanonisoituna, jos jäsentäminen onnistuu),
eivät uudelleenmuotoiltua semconv-viestitaulukkoa. Katkaistut tai JSON-muotoon sopimattomat
rungot säilyvät raakana tekstinä. Kun `langfuseMapping=true`, rungot toimitetaan vain
määritteissä `langfuse.observation.input` / `langfuse.observation.output`;
`gen_ai.*.messages`-määritteet jätetään pois, jotta kukin runko lähetetään kerran. Molemmat
tilat perivät `maxBodyBytes`-arvon nykyisestä latauspolusta;
`omniroute.bodies_truncated=true` ilmaisee katkaisun.
Tämä kohde ei lisää ylimääräisiä putkiston tilannevedoksia tai puhdistamattomien artefaktien
lukuja; valinnainen pyyntöotsakkeiden keräys käyttää alla kuvattua nykyistä ladattua
asiakasvedosta. Käytä runkoja vietäessä minuutin tarkkuuden aikataulua, kuten
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, sen sijaan että keräisit tunnin mittaisen
jonomäärän.

### Valinnaiset asiakkaan pyyntöotsakkeet

Otsakkeiden keräys on **oletusarvoisesti pois käytöstä**. Määritä kohteen asetuksissa
`requestHeaderAllowlist` ja ota käyttöön **Export prompts and responses**
(`includeBodies: true` kohteessa).
Sallittujen arvojen luettelo hyväksyy API-taulukon tai tekstialueen, jossa nimet on eroteltu
rivin- tai pilkuilla:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nimet vastaavat kirjainkoosta riippumatta ja täsmälleen, ellei yksittäinen lopussa oleva `*` valitse
ei-tyhjää otsakenimen etuliitettä. Pelkkä `*`, upotetut jokerimerkit ja virheelliset HTTP-otsakenimet
hylätään. Valitsimia voi olla enintään 64, ja kunkin nimi tai etuliite voi olla enintään 256 ASCII-tavua.
Tämä asetus on erillinen `headers`-asetuksesta, joka todentaa viejän kerääjälle.

Kaappaus lukee vain kohteesta `pipeline_client_request`, joka täytetään tallennetun yksityiskohtaisen
putken `clientRawRequest`- (tai vanhan `clientRequest`-) kentästä. Se ei koskaan käytä varalla
palveluntarjoajan pyyntöotsakkeita. Yksityiskohtainen putkilokitus on täytynyt ottaa käyttöön, kun pyyntö
tallennettiin. Kun `includeBodies` on poistettu käytöstä tai asiakasvedoksen JSON puuttuu, on vioittunut
tai katkennut, otsakemääritteitä ei tuoteta. `maxBodyBytes`-arvon kasvattaminen voi estää vedoksen
katkeamisen viennin aikana, mutta se ei voi palauttaa tietoja, joita ei koskaan tallennettu. Yli 1 MiB:n
vedos tai vedos, joka sisältää yli 256 otsakemerkintää, ohitetaan. Nykyinen kehotteen ja vastauksen vienti
säilyy käytössä otsakekaappauksen rinnalla; sallittujen luettelo ei tarjoa vain otsakkeet sisältävää
hydratoimistilaa.

Valittujen arvojen OTLP-merkkijonotaulukot ovat muotoa
`http.request.header.<full lowercase header name>`, myös yksittäisen merkkijonon tapauksessa.
Esimerkiksi `X-OmniRoute-Meta-Team: example-team` muuttuu muotoon
`http.request.header.x-omniroute-meta-team`, jonka arvo on
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Koko etuliite säilytetään: nämä ovat tavallisia otsakkeita, eikä niille tehdä liiketoimintakenttien
jäsentämistä tai `omniroute.metadata.*`- / Langfuse-metatietomuunnosta. `langfuseMapping` ei muuta
otsakkeiden semantiikkaa. Valittu yksiarvoinen `User-Agent` asettaa lisäksi vakioarvon
`user_agent.original`. Yhden arvon sisällä olevia pilkkuja ei jaeta. Kirjainkooltaan vaihtelevat muodot
yhdistetään tallennettujen merkintöjen järjestyksessä; jos jokin muoto on virheellinen, koko kyseinen
otsake jätetään pois. Määritteet järjestetään pienennetyn nimen mukaan.

Authorization-, Proxy-Authorization-, Cookie- ja Set-Cookie-otsakkeet, API-avainotsakkeet, nimet, jotka
sisältävät auth-, token-, secret-, password- tai credential-ilmaisimen, sekä yhdyskäytävän sisäiset
tunnistetiedot jätetään aina pois, vaikka ne olisi valittu tai tallennuksessa osittain peitetty.
Tunnetuissa tunnistetietomalleissa käytetään jaettua tunnistetietojen tunnistinta; peittomerkit jätetään
pois eikä niitä viedä turvallisina arvoina. Vain merkkijonot ja ei-tyhjät merkkijonotaulukot hyväksytään;
numeroita tai objekteja ei muunnettu automaattisesti. Virheelliset nimet, prototyyppiavaimet,
ohjausmerkit (vaakalukuun ottamatta) ja virheellinen Unicode ohitetaan eräajon epäonnistumatta tai
niiden sisällön päätymättä virheilmoituksiin.

Kukin span tallentaa enintään 32 otsaketta, 16 arvoa otsaketta kohden, 4096 UTF-8-tavua arvoa kohden
ja yhteensä 16384 UTF-8-tavua kaapattujen otsakenimien ja arvojen osalta. Liian suuret tai virheelliset
otsakkeet jätetään kokonaan pois, eikä niitä katkaista. Valinta on operaattorin tietosuojapäätös:
turvallisilta vaikuttavat nimet voivat silti sisältää henkilötietoja, eivätkä nämä rajat ja tunnistimet ole
yleinen henkilötietojen poistaja.

### Toimitusrajat

Pyynnöt on rajoitettu 500 spaniin ja 4 MiB:n UTF-8-kokoiseen JSON:ään, ympäröivä rakenne mukaan lukien.
Jokaisen sallitun spanin koko tarkistetaan ennen kohdistinerän ensimmäistä pyyntöä. Jos yksittäinen span
ylittää rajan, kyseisestä erästä ei lähetetä mitään osaa ja toiminto epäonnistuu ohjeella pienentää
`maxBodyBytes`-arvoa; sitä ei pudoteta hiljaisesti. Esitarkistus säilyttää vain tietueviittaukset ja
tavumäärät sekä hävittää kunkin väliaikaisen spanin/JSON:n; spanit rakennetaan uudelleen rajattuja
lohkoja varten sen sijaan, että erästä pidettäisiin toista sarjoitettua kopiota. HTTP-tilat 408/429/5xx,
verkkovirheet ja aikakatkaisut saavat enintään kolme yritystä, ja eksponentiaalinen viive on 250/500 ms.
`Retry-After`-sekunnit tai HTTP-päivämäärät voivat pidentää viivettä enintään 5 sekuntiin. Muut tilat
aiheuttavat välittömän epäonnistumisen. OTLP:n 2xx-osittainen hylkäys aiheuttaa myös poikkeuksen sen
sijaan, että kadonnut span kuitattaisiin; tyhjät tai kelvolliset JSON-kuittaukset hyväksytään, ja
vastauksen lukeminen on rajoitettu 64 KiB:uun.

Virheet sisältävät vain viejän omistamia tietoja: HTTP-tilan, uudelleenyritysluokan, yritysten määrän ja
lähetettyjen spanien määrät tai kiinteän kuittaus-/verkkovirhetekstin. Kerääjän vastausrunkoja,
osittaisen onnistumisen määriä ja vastausotsakkeita ei koskaan kopioida virheisiin, lokeihin tai
hallintapaneeliin. Epäonnistunutta tai osittain hyväksyttyä erää ei kuitata: kohde näyttää tilan
Failing ja kyseisen tilan, kohdistin pysyy viimeksi kuitatussa erässä ja seuraava ajo lähettää samat rivit
uudelleen. Pysyvät tilat aiheuttavat jatkuvan epäonnistumisen, kunnes kerääjä tai määritys korjataan.
Käytä vastaustietojen tarkasteluun kerääjän omia lokeja. Kutsulokin virheyhteenvedot säilyttävät erillisen
peittelynsä.
`prepare()` ei varaa mitään; Test lähettää täsmälleen `{"resourceSpans":[]}` ja raportoi HTTP-tilan
kirjoittamatta kutsulokin spaneja.

Jäljitystunnukset ja span-tunnukset ovat SHA-256:n ensimmäiset 32/16 heksadesimaalia seuraavista
arvoista:
`"omniroute.trace\\0" + callLogId` ja `"omniroute.span\\0" + callLogId`. Uudelleenlähetyksissä
käytetään samoja tunnuksia. Tämä ei takaa kaksoiskappaleiden poistamista: jotkin taustajärjestelmät,
kuten Langfuse v4 -vastaanotto, eivät poista saman tunnuksen sisältäviä span-kaksoiskappaleita.
Kaaduttua tai osittain epäonnistunutta lohkoa voidaan lähettää uudelleen enintään yksi kuittaamaton
kohdistinerä; koko erä voi monistua, ei vain sen viimeinen HTTP-lohko. Valitse kohdistinerän koko tämä
vaihtokauppa huomioiden.

### Langfuse-esimerkki

Määritä nämä kentät itse ylläpidettyä Langfuse-instanssia varten:

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

Muodosta Authorization-arvo paikallisesti Base64-muodossa merkkijonosta `public-key:secret-key`
(esimerkiksi lausekkeella `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Älä sijoita todellisia tunnistetietoja lokeihin, kuvakaappauksiin tai ilmoituksiin. Kuvaus asettaa
automaattisesti arvon `x-langfuse-ingestion-version: 4`; Authorization toimitetaan edelleen
`headers`-asetuksessa. Sekä otsakkeet että luotu identiteettisuola käyttävät olemassa olevaa salatun
salakentän mekanismia ja API-paikkamerkkejä; `STORAGE_ENCRYPTION_KEY` vaaditaan.

Määritykseen lisätään generointityyppi/-malli, JSON-käytön tiedot (syöte/tuloste/yhteensä ja käytettävissä
olevat välimuistiavaimet), JSON-syötteen/-tulosteen tilannevedokset, ERROR/DEFAULT-taso, puhdistettu tilaviesti,
jäljen nimi, istunnon tunnus, valinnainen ympäristö sekä suodatettavat
`langfuse.observation.metadata.<key>`-metatiedot palveluntarjoajalle, pyydetylle mallille, polulle, yhdistelmälle, välimuistin
lähteelle ja tilalle. `langfuse.observation.completion_start_time` on ISO 8601 -aikaleima kohdassa
aloitus + TTFT vain silloin, kun TTFT tunnetaan ja se on keston sisällä. Kustannusmääritteitä ei lähetetä.

Identiteettitilat koskevat arvoa `langfuse.user.id`:

- `pseudonymous` (oletus): API-avaimen sisäisen tunnuksen HMAC-SHA256-arvo, joka lasketaan satunnaisella
  määränpäähänkohtaisella 32 tavun suolalla. Suola luodaan luonnin yhteydessä, jos se puuttuu, salataan
  nimellä `identitySalt`, sitä ei koskaan palauteta ja se säilytetään muokkauksissa. Raakoja avaintunnuksia ei koskaan
  sijoiteta jälkimääritteisiin. Määränpään suolan luominen uudelleen tai vaihtaminen muuttaa identiteetit.
- `keyName`: määritetty API-avaimen nimi, jolloin operaattorin tunniste paljastuu tarkoituksellisesti.
- `none`: käyttäjätunnusta ei ole. Istuntotunnisteet viedään edelleen, jos niitä on; nämä tilat eivät
  anonymisoi mielivaltaista kehotetekstiä tai operaattorin toimittamia istunto-/korrelaatiotunnisteita.

### Aloittaminen ilman aiempien tietojen täyttöä

Vain luonnin yhteydessä voit ottaa käyttöön **Aloita nykyisestä sijainnista (ohita olemassa olevat lokit)** tai välittää
`startFromCurrentPosition: true` -arvon luonnin API-pyynnön ylimmällä tasolla. Se alustaa arvon
`cursor_row_id` nykyiseen säilytettyjen kutsulokirivien enimmäisarvoon nykyisiä kohdistinkäsittelijöitä käyttäen
ilman migraatiota. Oletusarvo on false (kohdistin 0 ja säilytetyn historian täyttö).
Se ei ole päivityksen aikainen kohdistimen nollausasetus.

Jaettu `ttftMs`-lisäys lisää myös BigQuery-määrittimeen ja uuden taulun skeemaan nullable-tyyppisen `ttft_ms`-sarakkeen:
skeematesti edellyttää, että jokaisella kanonisella tietueen kentällä on sarake. Olemassa olevien taulujen vienti
säilyy ennallaan: `prepare()` lukee taulun skeeman ja jättää pois vain `ttft_ms`-kentän, jos kyseinen sarake puuttuu.
Lisää nullable-tyyppinen INT64-sarake saadaksesi TTFT:n mukaan seuraavalla suorituskerralla tai käytä uutta taulua.
Valinnainen TTFT-sarake ei käynnistä skeeman päivitystä. Käytön todisteita sisältävät sarakkeet
noudattavat alla kuvattua ehdollista, käytön erikseen sallivaa yhteensopivuusmenettelyä; muut rivikentät säilyttävät tiukan
skeeman tarkistuksen.

---

## 6. Kohteen lisääminen

1. Luo `src/lib/logExport/destinations/<name>.ts`, joka vie `LogExportDestinationType`-tyypin:
   Zod-`configSchema`, käyttöliittymän `fields`-kuvaustaulukko, `secretFields` ja
   `createClient(config)`, joka palauttaa `test()` / `prepare()` / `send(records)`.
2. Lisää se `DESTINATIONS`-taulukkoon tiedostossa `src/lib/logExport/registry.ts`.
3. Kirjoita testit hakemistoon `tests/unit/`.

Siinä koko muutos: pysyväistallennus, cron-ajo, REST-kerros, salaisuuksien salaus ja
hallintapaneelin lomake lukevat kaikki rekisteriä.

Kaksi sääntöä uudelle kohteelle:

- `send()` **on velvollinen heittämään poikkeuksen**, jos toiminto epäonnistuu osittain. Lupauksen täyttyminen tarkoittaa, että ”kohteessa on nämä rivit”,
  ja kohdistin siirtyy niiden ohi pysyvästi.
- Kohteen, joka vastaanottaa käyttäjän antaman URL-osoitteen, on validoitava se funktiolla
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) ennen hakupyyntöä
  samalla tavalla kuin webhookit tekevät. BigQuery ei tarvitse tätä: sen isäntäosoitteet ovat vakioita.

---

## 7. Käyttö

- **Hallintapaneeli**: Integraatiot → Lokien vienti. Lisää kohde, tarkista tunnistetiedot suorittamalla **Test**  
  ilman rivien kirjoittamista ja ota kohde sitten käyttöön.
- **Jono**: kunkin kohdekortin yhteydessä näkyvät odottavat rivit ja kursori; `GET
/api/log-export/status` palauttaa samat luvut sekä viimeiset 20 työajon suoritusta.
- **Yhden kohteen epäonnistuminen ei epäonnistuta muita** — ajon yhteenveto tallentaa kohdekohtaisen
  tilan kenttiin `last_status` / `last_error`, ja työajojen historia säilyttää koostetun tilan.
- **Kohteen poistaminen poistaa sen kursorin.** Jos kohde lisätään uudelleen, vienti alkaa vanhimmasta
  säilytetystä kutsulokista, jolloin lähetetään uudelleen rivejä, jotka kohteella saattavat jo olla. BigQueryssa rivikohtainen
  `insertId` estää tämän vain BigQueryn oman kaksoiskappaleiden poistamisen ikkunan aikana, joten kohde kannattaa
  poistaa käytöstä sen poistamisen sijaan.

### Käyttöevidenssin skeemayhteensopivuus

Uudet BigQuery-taulut sisältävät nullable-tyyppisen `usage_evidence`-sarakkeen (JSON-merkkijonon sisältävä STRING) ja
`usage_estimated`-sarakkeen (BOOL). Kun `autoCreate` on käytössä, aiemmin luotuun tauluun voidaan lisätä vain
puuttuvat nullable-tyyppiset sarakkeet. Viejä säilyttää koko olemassa olevan skeeman kenttien metatiedot mukaan lukien
ja lähettää ehdollisen PATCH-pyynnön palautetun etagin avulla. Samanaikainen skeeman muutos epäonnistuttaa viennin sen
ylikirjoittamisen sijaan; seuraavalla ajolla taulu luetaan uudelleen.

Kun `autoCreate` ei ole käytössä, lisää nämä sarakkeet itse ennen käyttöevidenssiä sisältävien tietueiden vientiä.
Puuttuvat skeema- tai etag-metatiedot tai epäonnistunut päivitys estävät myös evidenssiä sisältävät lisäykset. Vientikursori
ei etene kyseisen epäonnistumisen jälkeen, eikä evidenssiä koskaan hylätä hiljaisesti. Paikallisten lokien säilytys
jatkuu viennin ollessa estettynä, joten ratkaise ongelma ennen säilytettyjen lähderivien vanhenemista.
