# Log export (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute'i kutselogide pidev, inkrementaalne eksport välisesse analüütikaandmehoidlasse.

Logide töölauavahekaart hoiab päringute ajalugu SQLite'is (`call_logs`), mille mahtu piiravad
roteerimine ja säilitusaeg. Logieksport saadab sama kirjekogumi ajakava alusel välja, et see säiliks
kohalikust andmebaasist kauem ja seda saaks ühendada muude andmetega. BigQuery on esimene sihtkoht;
konveier põhineb registril, seega saab uusi sihtkohti juurde lisada.

---

## 1. Tööpõhimõte

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Ajakava** — üks `JobRegistry` croni töö, `log_export`, vaikeväärtusega `0 * * * *` (iga tund,
  UTC). Registreeritud failis `src/lib/initCloudSync.ts`; ülekirjutatav muutujaga `OMNIROUTE_LOG_EXPORT_CRON`.
  Iga käivitus töötleb järjest läbi kõik **lubatud** sihtkohad.
- **Kursor** — SQLite'i kaudne `call_logs.rowid`, mis salvestatakse iga sihtkoha jaoks väljale
  `log_export_destinations.cursor_row_id`. `timestamp` ei ole tahtlikult kursor: kutsujad
  võivad anda oma väärtuse, mistõttu võidakse aeglane päring kirjutada pärast kiiremat, mis algas
  hiljem, ning ajatemplipõhine kursor jätaks selle vahele.
- **Pakktöötlus** — `batch_size` rida päringu kohta (vaikimisi 500), `max_rows_per_run` rida käivituse kohta
  (vaikimisi 10000), et suur mahajäämus töödeldaks mitme käivitusega, mitte ei blokeeriks ühte.
- **Edastamine** — kursor liigub edasi alles pärast `send()` edukat lõppemist. Ebaõnnestunud pakk jätab
  kursori senisesse asukohta, nii et samu ridu proovitakse järgmisel käivitusel uuesti. Tagatud on
  vähemalt ühekordne edastus koos sihtkohapoolse duplikaatide eemaldamisega, mitte tegelik täpselt ühekordne edastus:
  BigQuery kasutab iga rea võtmena kutselogi ID-d, mida see arvestab oma duplikaatide eemaldamise ajavahemikus
  parima võimaliku pingutuse põhimõttel.
- **Kattumise tõkestamine** — croni käivitus ja `POST .../run` võivad toimuda korraga. Juba
  töödeldav sihtkoht jäetakse vahele, mitte ei töödelda seda kaks korda (`skipped: true` käivituse tulemuses),
  nii et samaaegne käivitus ei saa pakki uuesti saata ega kursorit tagasi kirjutada.
- **Taastumine pärast tühjendamist** — kui `cursor_row_id` osutub suuremaks kui `MAX(rowid)` (kogu tabel
  tühjendati ja rea-ID-d algasid uuesti), kerib käitaja kursori tagasi väärtusele 0, mitte ei jää püsivalt uusi ridu märkamata.

### Isoleeritud käitaja ja piirangud

Iga sihtkoha käivitus Node'is alustab eraldi lühiajalise operatsioonisüsteemi alamprotsessi (`child_process`
koos IPC-ga, mitte `worker_threads`). Sisu lugemine, andmete JSON-i parsimine ja serialiseerimine, sihtkoha
`prepare()` ning sihtkoha võrgu-I/O toimuvad kõik seal, mitte serveri sündmussilmuses.
IPC kaudu liiguvad ainult konfiguratsioon ja väikesed edenemisteated; eksporditud kirjed ei naase kunagi
serverisse. Croni töö ja marsruut „Käivita kohe“ säilitavad sama avaliku tulemuse ning kattumise tõkestamise.

Alamprotsess avab serveri määratud `DATA_DIR/storage.sqlite` faili kirjutuskaitstult mooduli `node:sqlite` abil,
seadetega `busy_timeout=5000` ja `query_only=ON`. See ei impordi ühtegi andmebaasi singletoni ega tee
migratsioone, varundusi või SQLite'i uuendusi. Puuduvate või rikutud artefaktide arvestus (sealhulgas
rikutud artefakti UPDATE) jääb ainult töölaua üksikasjavaate kooditeele. Mõlemad kooditeed jagavad puhast
üksikasjade lahendajat; eksport kasutab asünkroonset failisüsteemist lugemist ja sama lahendusjärjestust:
artefakt → pärandvormingus manustatud sisu → pärandvormingus kettafail → puudub. Käivitus fikseerib suurima sisestatud rea-ID
hetkel, mil alamprotsess avab oma lugeja; hilisemad sisestused ootavad järgmist käivitust. See on sisestuste
piir, mitte pikaajaline SQLite'i tehing: WAL-i kirjutajad ja kontrollpunktide loomine saavad võrguootuste ajal
vabalt jätkata. Olemasolevate ridade uuendamist ja kustutamist see piir ei külmuta.

Pärast iga vastuvõetud pakki ootab alamprotsess kinnitust. Server salvestab esmalt
kursori funktsiooniga `advanceLogExportCursor`, seejärel saadab `ack`; enne seda ei alga ükski järgmine pakk.
Saatmisviga, krahh või ajalõpp registreerib ebaõnnestumise ilma selle paki võrra edasi liikumata. Varem
kinnitatud pakid jäävad salvestatuks; uuesti võidakse saata kõige rohkem üks kinnitamata pakk.
Edu registreeritakse alles pärast `done` saabumist ja alamprotsessi korrektset väljumist. Tõrked lõpetavad alamprotsessi
signaaliga SIGTERM, minnes 500 ms järel üle signaalile SIGKILL, ning käitaja ootab protsessi sulgumist.

| Keskkonnamuutuja                              | Vaikeväärtus | Otstarve                                 |
| --------------------------------------------- | ------------ | ---------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000       | Sihtkohapõhine tegeliku kuluaja piir     |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024         | Alamprotsessi V8 old-space'i piir MB-des |

Vigaste, mittepositiivsete või mittetäisarvuliste väärtuste korral kasutatakse vaikeväärtusi. Kuhja säte ei ole kogu
RSS-i piirang; väga suured pakid võivad siiski alamprotsessi mälu ammendada ja käivituse ohutult nurjata.
Vaikimisi määratud 1024 MB jätab varu vaikimisi 500-realisest pakist koosnevate 512 KiB artefaktide jaoks,
kui sisu on kaasatud, sealhulgas BigQuery baidipõhisteks tükkideks jaotatud JSON-serialiseerimise jaoks. See ei muuda
10000-realist sisuga pakki ohutuks. V8 kuhjamälu ammendumisel registreeritakse tõrge koos tegutsemisjuhisega: vähendage paki
suurust või suurendage `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor jääb viimase
kinnitatud paki juurde. Tänapäevane artefakti suurusepiirang ei hõlma ajaloolist manustatud või kettal olevat sisu.
Operaatorid peavad RSS-i vajadust eraldi arvestama, eriti piiratud mäluga konteinerites.

Alamprotsess pärib ainult lahendatud `DATA_DIR`, `NODE_ENV`, sõnaselgelt määratud `TZ` (pärandfailinimede
kohaliku aja lahendamiseks), olemasolu korral `ELECTRON_RUN_AS_NODE` ning järgmised väljaminevate ühenduste sisendid:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (ja nende väiketähtkujud),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globaalne Undici dispetšer kasutab serveriga sama puhtalt keskkonnamuutujatel põhinevat puhverserveri lahendust ja kohalike hostide
puhverserverist möödumise reegleid, sealhulgas `NO_PROXY`; see ei impordi faili `proxyFetch.ts` ega selle andmebaasi- või funktsioonilippe.
Puhverserveri autentimisandmed peidetakse edastatavast väljundist ja salvestatud vigadest. Sihtkoha autentimisandmed
edastatakse ainult ühes käivitamise IPC-sõnumis, mitte kunagi argv ega keskkonna kaudu; väljundi ja vigade edastamisel
lisatakse prefiks ning eemaldatakse tundlik teave. Alamprotsessi käivitusargumentides keelatakse ainult `ExperimentalWarning`, et vältida
Node’i SQLite’i hoiatuse kordamist igal cron-käivitusel; muud hoiatustüübid jäävad nähtavaks.

Sihtkoha moodulid peavad olema imporditavad ilma Next.js-i või ainult serverile mõeldud sõltuvusteta. Olemasolev
BigQuery teostus vastab sellele nõudele juba praegu. Pääsutõendite vahemälud säilivad ainult alamprotsessi
käivituse vältel, mitte käivituste vahel. Toetatud käituskeskkond on Node (`package.json` engines), kuid README Buni
paigaldusjaotis ja `Dockerfile.bun` pakuvad ka tootmiskeskkonna ühilduvusvarianti, mis kasutab
`bun:sqlite` (`src/lib/db/core.ts` / adapterid). Buni korral säilitavad ekspordid seetõttu varasema
protsessisisese lahenduse ja väljastavad ühekordse hoiatuse: alamprotsessi kuhja ja ajalõpu isolatsioon pole saadaval. Kasutage
Node’i sündmusesilmuse ja mälupuuduse (OOM) isolatsiooniks; Buni ei käsitleta siin ainult arenduseks mõelduna.

Kui `includeBodies` on lubatud, eelistage minutipõhist sagedust, näiteks
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, selle asemel et lasta tunnijagu sisu kuhjuda.
Paketi- ja reapiirangud piiravad endiselt iga käivitust. Protsessi käivituskulu tekib iga sihtkoha puhul igal käivitusel;
see vahetab väikese käivituskulu serveri sündmusesilmuse isolatsiooni vastu, mitte ei vähenda protsessori kogukasutust.

### Sisu (viibad ja genereeritud vastused)

Vaikimisi sisaldab eksport ainult kokkuvõttevälju, mida näitab logide **loend**. Valiku
**Ekspordi viibad ja vastused** (`includeBodies`) sisselülitamine lisab iga kutse kohta ka selle, mida näitab logide **üksikasjade**
paan:

| Väli                             | Mida see sisaldab                                             |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | Kutse sisu sellisena, nagu juhtpaneel seda kuvab              |
| `pipeline_route_decision`        | Millise sihtmärgi ja mudeli ruuter valis                      |
| `pipeline_client_request`        | Algne päring täpselt sellisena, nagu klient selle saatis      |
| `pipeline_openai_request`        | Pärast teisendamist sisemisse OpenAI vormingusse              |
| `pipeline_provider_request`      | Tegelikult ülesvoolu saadetud kujul, teenusepakkuja vormingus |
| `pipeline_provider_response`     | Algne ülesvoolu vastus                                        |
| `pipeline_client_response`       | See, mis kutsujale tagasi anti                                |
| `pipeline_error`                 | Töötlusahela taseme vea üksikasjad nurjunud kutse korral      |
| `bodies_truncated`               | Tõene, kui mõni ülaltoodud väli saavutas piiri `maxBodyBytes` |

See on viipade sisu, seega on see **vaikimisi välja lülitatud** ja teadlikult iga sihtkoha jaoks eraldi valitav.
Eksporditakse seda, mida juhtpaneel näitab, sest eksport ja `getCallLogById` kasutavad sama üksikasjade
lahendust: sisust on
juba kirjutamise ajal eemaldatud isikut tuvastav teave ja peidetud saladused ning
`noLog` API-võtmega tehtud kutse ei salvesta üldse sisu, seega pole midagi eksportida.

Sisu loetakse iga rea jaoks failisüsteemi artefaktist, nii et andmete laadimine toimub ainult nende sihtkohtade jaoks,
mis seda taotlesid. Puuduva või rikutud artefakti korral eksporditakse selle kokkuvõte nullväärtusega sisuväljadega,
selle asemel et kogu pakett nurjuks ja kursor jääks kinni.

`maxBodyBytes` (vaikimisi 262144) piirab iga välja suurust. Pikem sisu **kärbitakse, mitte ei
jäeta välja** — ka kärbitud viip vastab küsimusele „mida küsiti“ — ning rida märgistatakse lipuga
`bodies_truncated`. Voogedastuse tükkhaaval saabunud muudatusi ei ekspordita; kokkupandud vastus on
juba väljadel `pipeline_provider_response` ja `pipeline_client_response`.

---

## 2. Failid

| Osa                               | Asukoht                                      |
| --------------------------------- | -------------------------------------------- |
| Sihtkoha leping                   | `src/lib/logExport/types.ts`                 |
| Register                          | `src/lib/logExport/registry.ts`              |
| Saladuste käsitlemine             | `src/lib/logExport/secrets.ts`               |
| Käivitaja (emap­rotsessi IPC)     | `src/lib/logExport/runner.ts`                |
| Protsessi elutsükkel              | `src/lib/logExport/childRunner.ts`           |
| Alamprotsessi sisenemispunkt      | `src/lib/logExport/exportChild.ts`           |
| Kirjutuskaitstud avaja            | `src/lib/db/logExportReadOnly.ts`            |
| Ühispäring/vastendus              | `src/lib/usage/callLogExportQueries.ts`      |
| Üksikasjade lahendaja             | `src/lib/usage/callLogDetailResolver.ts`     |
| API projektsioon                  | `src/lib/logExport/presenter.ts`             |
| BigQuery sihtkoht                 | `src/lib/logExport/destinations/bigquery.ts` |
| Google'i teenusekonto autentimine | `src/lib/logExport/googleServiceAccount.ts`  |
| Kõnelogi allikas                  | `src/lib/usage/callLogExportSource.ts`       |
| Püsisalvestus                     | `src/lib/db/logExportDestinations.ts`        |
| Croni töö                         | `src/lib/jobs/logExportJob.ts`               |
| REST-kiht                         | `src/app/api/log-export/`                    |
| Töölaua leht                      | `src/app/(dashboard)/dashboard/log-export/`  |

Skeem: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Kõik marsruudid nõuavad haldusautentimist (`requireManagementAuth`). Saladusi ei tagastata kunagi:
salvestatud saladus tagastatakse literaalina `__stored__` ning selle väärtuse tagasisaatmine uuendamisel
säilitab salvestatud autentimisandmed.

Sellise sihtkoha loomine või uuendamine, mille tüüp deklareerib saladuse, **nõuab
`STORAGE_ENCRYPTION_KEY`**. Ilma selleta edastab `encrypt()` andmed vaikselt muutmata kujul, mistõttu kirjutamine
lükatakse tagasi olekukoodiga 400, selle asemel et salvestada autentimisandmed SQLite'i lihttekstina (sama kaitset rakendab ka
Telegrami veebikonks).

| Meetod   | Tee                                      | Otstarve                                                                      |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Sihtkohatüübid + nende seadistusväljade loend                                 |
| `GET`    | `/api/log-export/destinations`           | Sihtkohtade loend (saladused varjatud)                                        |
| `POST`   | `/api/log-export/destinations`           | Sihtkoha loomine                                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | Ühe sihtkoha lugemine                                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | Nime / lubatuse / seadistuse / partiitöötluse uuendamine                      |
| `DELETE` | `/api/log-export/destinations/{id}`      | Kustutamine                                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | Autentimisandmete kontroll ilma kirjutamiseta                                 |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Ootel andmete kohene eksport sama täitmisteed mööda nagu ajastatud käivitusel |
| `GET`    | `/api/log-export/status`                 | Croni olek, hiljutised käivitused, ootel andmed sihtkohtade kaupa             |

`GET /api/log-export/types` muudab kasutajaliidese üldotstarbeliseks: töölaua vorm renderdatakse
tagastatud väljakirjelduste põhjal, nii et uus sihtkoht ei nõua kasutajaliidese muutmist.

---

## 4. BigQuery sihtkoht

Seadistusvõtmed (`type: "bigquery"`):

| Võti                 | Märkused                                                                |
| -------------------- | ----------------------------------------------------------------------- |
| `projectId`          | Andmestikku sisaldav GCP projekt                                        |
| `datasetId`          | `[A-Za-z0-9_]+`                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                         |
| `location`           | Kasutatakse ainult siis, kui andmestik tuleb luua (vaikimisi `EU`)      |
| `serviceAccountJson` | Teenusekonto võti. Saladus: salvestatult krüptitud, ei tagastata kunagi |
| `autoCreate`         | Loo andmestik ja tabel esimesel eksportimisel (vaikimisi `true`)        |

Teenusekontol peab sihttabelis olema õigus `bigquery.tables.updateData` ning lisaks
`bigquery.datasets.create` / `bigquery.tables.create`, kui `autoCreate` on sisse lülitatud.

Seadistatud partii on **kursori** ühik, mitte HTTP ühik: `send()` jagab selle kuni 500 reaga insertAll
kutseteks, nii et suur `batch_size` ei saa ületada BigQuery 10 MB päringumahu piirangut.
Ajutiste olekukoodide (408/429/500/502/503/504) korral proovitakse kuni kolm korda uuesti eksponentsiaalselt
kasvava ooteajaga, kasutades samu insertIds-väärtusi; autentimis- ja skeemivigade korral visatakse erind juba esimesel katsel,
selle asemel et raisata kogu käivituskorda.

Äsja loodud tabel pole voogedastuse lõpp-punktile veel nähtav ning see vastab
mõne sekundi jooksul koodiga 404. Selle 404 korral proovitakse uuesti, kuid **ainult siis, kui tabel loodi selle käivituskorra ajal** —
tegelikult puuduva tabeli korral katkestatakse endiselt kiiresti. Pange tähele, et tabeli uuesti loomisel hiljuti
kustutatud nimega keeldub BigQuery mitu minutit voogedastuse kaudu ridu lisamast; see on
kustutamise ja taasloomise eripära, seega eelistage tabeli kustutamisele ja uuesti lisamisele uut tabelinime.

**Osaline tõrge saabub HTTP 200 vastusena koos mittetühja `insertErrors[]` väärtusega.** Seda käsitletakse
tõrkena ja visatakse erind, mis takistabki kursoril liikumast edasi ridadest, mida BigQuery kunagi
vastu ei võtnud; `tests/unit/log-export-bigquery.test.ts` kinnistab selle käitumise.

Andmeedastus kasutab tavalist REST-i — iseallkirjastatud RS256 tõend vahetatakse pääsutõendi vastu aadressil
`https://oauth2.googleapis.com/token`, seejärel saadetakse read meetodisse `tabledata.insertAll`. Google'i SDK-d
sõltuvusena ei kaasata. Pääsutõendeid hoitakse protsessisiseses vahemälus iga (teenusekonto, õiguste ulatus) paari kohta.

Loodud tabelis on üks veerg iga logide vahekaardi välja kohta ning lisaks `exported_at`; selle struktuur arvestab
seda, kuidas kutselogisid tegelikult päritakse:

- **Päevapõhine partitsioneerimine välja `timestamp` järgi**, nii et kuupäevaga piiratud päring skannib ainult vastavaid päevi.
- **Klasterdamine väljade `api_key_name`, `provider`, `model`, `status` järgi** (selles järjekorras), nii et filtreerimine
  käivitaja, sihtkoha või ebaõnnestumise järgi jätab igas partitsioonis mittevajalikud plokid vahele. BigQuery
  lubab kuni nelja klasterdamisveergu ja nende järjekord on oluline: ainult välja `api_key_name` järgi filtreerimine
  võimaldab plokke vahele jätta, ainult välja `status` järgi filtreerimine mitte.
- **Valikuline partitsioonide säilitusaeg** võtme `partitionExpirationDays` kaudu (0 säilitab kõik), rakendatakse
  tabeli loomisel.

Mõlemad sätted rakenduvad loomisel. Olemasolev tabel säilitab oma senise struktuuri, seega
suunake sihtkoht uue tabeli ID-le, kui soovite need kasutusele võtta.

`tests/unit/log-export-bigquery.test.ts` kontrollib, et vastendaja ja tabeli skeem püsiksid
kooskõlas, nii et uut kutselogi veergu ei saaks eksportimisel märkamatult välja jätta.

Partiid jagatakse osadeks **nii** ridade arvu kui ka serialiseeritud baitide hulga järgi. Ainult ridade arvust ei piisa,
kui eksporditakse ka andmesisu: 500 viipasid sisaldavat rida võivad võtta kümneid megabaite ning insertAll
lükkab üle 10 MB päringu tagasi. Osad lõpetatakse 500 rea või 9 MB juures, olenevalt sellest, kumb piir enne täitub.

---

## 5. OTLP/HTTP jälgede sihtkoht

Konfiguratsioon kasutab väärtust `type: "otlp-http"`. See on salvestatud kutselogide ajastatud,
kursoripõhine eksport, mitte jooksvalt marsruutimise sündmusi võimaluste piires edastav väljund failis
`open-sse/services/routing/otel.ts`. See ei loe ega muuda selle väljundi keskkonnamuutujaid,
taimereid ega puhvreid. Mõlema lubamine võib tekitada kahte sõltumatut tüüpi jäljelõike;
nende kutselogide jäljelõikude eristamiseks kasutage instrumentatsiooniala `omniroute.log-export`.

| Võti                     | Vaikeväärtus / otstarve                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `endpoint`               | Nõutav täielik HTTP(S)-jälgede URL; järelliidet `/v1/traces` ei lisata                   |
| `headers`                | Valikulised `Name: value` read või stringidest koosnev JSON-objekt; krüpteeritud         |
| `requestHeaderAllowlist` | Tühi (väljas); kliendi päiste nimed/prefiksid, mis talletatakse jäljelõigu atribuutidena |
| `serviceName`            | `omniroute`; ressursi `service.name`                                                     |
| `langfuseMapping`        | `false`; lisab Langfuse’i genereerimise/seansi/kasutaja atribuudid                       |
| `identity`               | `pseudonymous`, `keyName` või `none`                                                     |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                  |
| `timeoutMs`              | `30000` iga HTTP-katse kohta                                                             |
| `environment`            | Määramata; valikuline `langfuse.environment`                                             |

Üldine juhtpaneel kuvab need väljad. `paths` aktsepteerib API massiivi või tekstiala,
kus täpsed teed on eraldatud reavahetuste/komadega. Vektoriesituste, ümberjärjestamise ja muud teed
jäetakse vahele, kui neid pole sõnaselgelt lubatud. Ka vahelejäetud read liigutavad kursorit edasi; olemasoleva
käivitaja loendurid `exported`/`exportedTotal` loendavad töödeldud lähteridu, sealhulgas filtreeritud
ridu, mitte vastuvõetud jäljelõike. Filtreerimine toimub alamprotsessis, muutmata selle
IPC-/kursorilepingut.

URL-i valideerimiseks kasutatakse andmebaasist sõltumatut abifunktsiooni `parseAndValidateNonMetadataUrl` failist
`src/shared/network/outboundUrlGuard.ts`: poliitikat `block-metadata`. Sellel on samad
tingimusteta metaandmete/protokolli/URL-i manustatud autentimisandmete kontrollid nagu veebikonksu valideerijal,
kui privaatsed URL-id on lubatud, kuid see lubab teadlikult localhost-/LAN-sihtkohti ilma globaalse
funktsioonilipu ülekirjutuseta. See võimaldab kasutada isehostitud Langfuse’i, Phoenixi, Tempo ja Collectori
lõpp-punkte, sealhulgas privaatseid HTTP-lõpp-punkte. Pilve metaandmete hostid on alati blokeeritud.
Ümbersuunamisi ei järgita, seega ei saa kollektor autentimisandmeid teisele hostile suunata.
Nagu olemasolev leksikaalne URL-i kaitse, ei fikseeri ka see DNS-lahendust; seadistage ainult
operaatori kontrolli all olevaid hoste. Eelistage HTTPS-i alati, kui lõpp-punkt ei asu usaldusväärses võrgus.

### Andmesisu ja edastamine

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) sisaldab iga
lubatud rea kohta ühte CLIENT-jäljelõiku, mille nimi on selle täpne päringutee. Teepõhine nimetamine eristab
Chat Completionsi, Responsesi ja Messagesi, lisamata jäljelõigu nimesse mudeli- või identiteediandmeid.
Ressursi atribuutide hulka kuuluvad `service.name` ja paketi `service.version`.

Tavaline vestluskatsete logija (`open-sse/handlers/chatCore/attemptLogging.ts`) kirjutab
lõpetamisel `duration = Date.now() - startTime` ega anna ajatemplit;
`saveCallLogOperation` failis `src/lib/usage/callLogs.ts` määrab ajatempli vaikeväärtuseks kirjutamise
(lõpetamise) aja. Eksport määrab seetõttu lõpuajaks rea ajatempli ja algusajaks lõpuaja miinus kestuse
(millisekundid teisendatakse kümnendkujul nanosekunditeks). Ka kutsuja antud ajaloolised ajatemplid
säilitatakse lõpuajana; reapõhist alguse/lõpetamise eristajat pole.
Nullväärtusega kestus muutub nulliks. Vigased/puuduvad ajatemplid põhjustavad partii nurjumise, mitte
mittedeterministlike jäljelõikude loomise. `ttftMs` võib olla nullväärtusega ja vastendatakse atribuudile `omniroute.ttft_ms`.

Atribuutide hulka kuuluvad `gen_ai.operation.name="chat"`, teenusepakkuja, taotletud/vastuse mudel,
sisend-/väljundtokenid, valikulised vahemälust lugemise/vahemälu loomise/arutlustokenid, HTTP-olek,
kombinatsioon, vahemälu allikas, seansi silt ja korrelatsiooniidentifikaator. OTLP täisarvuväärtused ja ajatemplid
on kümnendkujul stringid; stringid, tõeväärtused ja murdarvud kasutavad oma loomulikke OTLP-väärtuse
variante. Veaga jäljelõikudel on olek ERROR ja puhastatud olekuteade. Kanoonilises
kirjes pole ülesvoolu hosti URL-i, seega jäetakse `server.address` välja, selle asemel et
kollektorit ekslikult mudeliserverina tuvastada. Kulu ei ekspordita.

Ainult `includeBodies=true` laadib sisu juurde. Kui `langfuseMapping=false`,
sisaldavad `gen_ai.input.messages` / `gen_ai.output.messages` puhastatud päringu/vastuse
sisu JSON-i kujul, nagu OmniRoute selle salvestas (parsitavuse korral kanoonilisel kujul), mitte semantiliste konventsioonide järgi ümberkujundatud
sõnumimassiivina. Kärbitud/mitte-JSON-sisu jääb toortekstiks. Kui `langfuseMapping=true`,
väljastatakse sisu ainult atribuutidena `langfuse.observation.input` / `langfuse.observation.output`;
atribuudid `gen_ai.*.messages` jäetakse välja, nii et iga sisu saadetakse üks kord. Mõlemad režiimid
pärivad väärtuse `maxBodyBytes` olemasolevast sisu juurdelaadimise töövoost;
`omniroute.bodies_truncated=true` tähistab kärpimist.
See sihtkoht ei lisa täiendavaid töötlusahela hetktõmmiseid ega puhastamata artefaktide lugemist;
valikuline päringupäiste talletamine kasutab allpool kirjeldatud olemasolevat juurdelaaditud kliendi hetktõmmist.
Sisu eksportimisel kasutage minutipõhist sagedust, näiteks `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
mitte ärge koguge tunnist mahajäämust.

### Valikulised kliendi päringupäised

Päiste talletamine on **vaikimisi välja lülitatud**. Määrake sihtkoha konfiguratsioonis `requestHeaderAllowlist`
ja lubage **Ekspordi viibad ja vastused** (sihtkohal `includeBodies: true`).
Lubatud päiste loend aktsepteerib API massiivi või tekstiala, kus nimed on eraldatud reavahetuste/komadega:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nimed peavad kattuma täpselt, kuid tõstutundetult, välja arvatud juhul, kui üks lõpus olev `*` valib mittetühja
päisenime prefiksi. Üksik `*`, nime sees olevad metamärgid ja vigased HTTP-päisenimed lükatakse tagasi.
Valijaid võib olla kuni 64 ning iga nimi/prefiks võib olla kuni 256 ASCII-baiti pikk.
See säte on eraldi sättest `headers`, mis autendib eksportija koguja juures.

Päiste hõive loeb ainult välja `pipeline_client_request`, mis täidetakse salvestatud üksikasjaliku töötlusahela väljast
`clientRawRequest` (või pärandväljast `clientRequest`). Teenusepakkuja päringu päiseid ei kasutata kunagi varuallikana.
Päringu salvestamise ajal pidi töötlusahela üksikasjalik logimine olema lubatud. Kui
`includeBodies` on keelatud või kliendi hetktõmmise JSON puudub, on rikutud või kärbitud, ei väljastata ühtegi päiseatribuuti.
Sätte `maxBodyBytes` suurendamine võib vältida hetktõmmise kärpimist eksportimisel;
see ei saa taastada üksikasju, mida pole kunagi salvestatud. Üle 1 MiB suurust või rohkem kui
256 päisekirjet sisaldavat hetktõmmist eiratakse. Olemasolev viiba/vastuse eksport jääb päiste hõive kõrval
lubatuks; lubatud väärtuste loend ei paku ainult päiseid laadivat režiimi.

Valitud väärtustest saavad OTLP stringimassiivid `http.request.header.<full lowercase header name>`,
isegi ühe stringi korral. Näiteks `X-OmniRoute-Meta-Team: example-team` muutub atribuudiks
`http.request.header.x-omniroute-meta-team` väärtusega
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Kogu prefiks säilitatakse: need on tavalised päised, ilma äriväljade parsimise või
`omniroute.metadata.*` / Langfuse'i metaandmeteks teisendamiseta. `langfuseMapping` ei muuda päiste
semantikat. Valitud üheväärtuseline `User-Agent` määrab ka standardse skalaaratribuudi
`user_agent.original`. Ühe väärtuse sees olevaid komasid ei kasutata tükeldamiseks. Tõstuvariandid ühendatakse salvestatud
kirjete järjekorras; mis tahes vigase variandi korral jäetakse kogu päis välja. Atribuudid järjestatakse väiketähtedeks teisendatud nime järgi.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-võtme päised, nimed, mis sisaldavad
auth/token/secret/password/credential markereid, ja lüüsi sisemised autentimisandmed jäetakse alati
välja, isegi kui need on valitud või salvestuses osaliselt maskeeritud. Teadaolevate autentimisandmete mustrite tuvastamiseks kasutatakse
ühist autentimisandmete tuvastajat; redigeerimismarkerid jäetakse välja, mitte ei ekspordita ohutute väärtustena.
Aktsepteeritakse ainult stringe ja mittetühje stringimassiive; arve ega objekte ei teisendata.
Vigaseid nimesid, prototüübivõtmeid, juhtmärke (välja arvatud horisontaalne tabeldusmärk) ja vigast Unicode'i
eiratakse, ilma et pakktöö nurjuks või nende sisu veateadetes kajastuks.

Iga span hõivab kuni 32 päist, 16 väärtust päise kohta, 4096 UTF-8 baiti väärtuse kohta
ning kokku 16384 UTF-8 baiti hõivatud päisenimede ja väärtuste peale. Liiga suured või vigased päised
jäetakse tervikuna välja, mitte ei kärbita. Valik on operaatori privaatsusotsus: ohutuna näivad nimed
võivad siiski sisaldada isikuandmeid ning need piirangud ja tuvastajad ei ole üldotstarbeline isikuandmete eemaldaja.

### Edastuspiirangud

Päringud on piiratud 500 span'i ja 4 MiB UTF-8 JSON-iga, sealhulgas ümbris.
Iga lubatud span'i suurust kontrollitakse enne kursoripaki esimest päringut. Kui üksik
span ületab piirangu, ei saadeta sellest pakist midagi ning toiming nurjub juhisega vähendada
`maxBodyBytes` väärtust; span'i ei jäeta vaikselt välja. Eelkontroll säilitab ainult kirjete viited ja
baidiarvud, loobudes igast ajutisest span'ist/JSON-ist; span'id koostatakse piiratud suurusega osade jaoks uuesti,
selle asemel et hoida pakist teist serialiseeritud koopiat. HTTP 408/429/5xx, võrgutõrgete ja ajalõppude korral tehakse kuni
kolm katset, eksponentsiaalselt kasvava 250/500 ms ooteajaga. `Retry-After` sekundid või HTTP-kuupäevad
võivad pikendada ooteaega kuni 5 sekundini. Muud olekukoodid põhjustavad kohese nurjumise. Ka OTLP 2xx osaline tagasilükkamine tekitab erindi, selle asemel
et kadunud span kinnitada; aktsepteeritakse tühje või korrektse JSON-iga kinnitusi ning
vastuse lugemise piirang on 64 KiB.

Vead sisaldavad ainult eksportijale kuuluvaid fakte: HTTP-olekukoodi, korduskatse klassi, katsete ja saadetud span'ide
arvu või fikseeritud sõnastust kinnituse/võrgutõrke kohta. Koguja vastuste sisu,
osalise õnnestumise arve ega vastusepäiseid ei kopeerita kunagi vigadesse, logidesse ega
töölauale. Nurjunud või osaliselt aktsepteeritud pakki ei kinnitata: sihtkoht kuvab
selle olekuga nurjumist, kursor jääb viimase kinnitatud paki juurde ning järgmine käivitus
saadab samad read uuesti. Püsivate olekukoodide korral jätkub nurjumine, kuni koguja või konfiguratsioon
on parandatud. Vastuse üksikasjade jaoks kasutage koguja enda logisid. Väljakutselogi veakokkuvõtete puhul säilib
nende eraldi tundlike andmete eemaldamine.
`prepare()` ei loo midagi; Test saadab täpselt `{"resourceSpans":[]}` ja teatab
HTTP-olekukoodi ilma väljakutselogi span'e kirjutamata.

Jälje-ID-d ja span'i-ID-d on avaldiste
`"omniroute.trace\\0" + callLogId` ja `"omniroute.span\\0" + callLogId` SHA-256 räsi esimesed 32/16 kuueteistkümnendnumbrit. Kordussaatmised kannavad
identseid ID-sid. See ei taga duplikaatide eemaldamist: mõned taustsüsteemid, sealhulgas Langfuse'i
v4 andmehõive, ei eemalda sama ID-ga span'ide duplikaate. Krahh või osa saatmise nurjumine võib
põhjustada kõige rohkem ühe kinnitamata kursoripaki kordussaatmise; dubleeruda võib kogu see pakk,
mitte ainult selle viimane HTTP-osa. Valige kursoripaki suurus seda kompromissi arvestades.

### Langfuse'i näide

Seadistage isemajutatud Langfuse'i eksemplari jaoks järgmised väljad:

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

Koostage Authorization väärtus kohapeal, kodeerides literaalse stringi `public-key:secret-key`
Base64-kujule (näiteks avaldisega `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Ärge kleepige tegelikke autentimisandmeid logidesse, kuvatõmmistesse ega probleemiteadetesse. Vastendus määrab automaatselt
`x-langfuse-ingestion-version: 4`; Authorization tuleb endiselt anda väljas `headers`.
Nii päised kui ka genereeritud identiteedisool kasutavad olemasolevat krüptitud saladuseväljade
mehhanismi ja API kohatäitjaid; `STORAGE_ENCRYPTION_KEY` on nõutav.

Vastendus lisab genereerimise tüübi/mudeli, kasutusandmed JSON-vormingus (sisend/väljund/kogusumma ja saadaolevad
vahemäluvõtmed), sisendi/väljundi hetktõmmised JSON-vormingus, taseme ERROR/DEFAULT, puhastatud olekuteate,
jälje nime, seansi ID, valikulise keskkonna ning filtreeritava
`langfuse.observation.metadata.<key>` teenusepakkuja, taotletud mudeli, tee, kombinatsiooni, vahemälu
allika ja oleku jaoks. `langfuse.observation.completion_start_time` on ISO 8601 vormingus
algusaeg + TTFT ainult siis, kui TTFT on teada ja jääb kestuse piiresse. Kuluatribuute ei saadeta.

Identiteedirežiimid rakenduvad atribuudile `langfuse.user.id`:

- `pseudonymous` (vaikimisi): API-võtme sisemise ID HMAC-SHA256 koos juhusliku
  sihtkohapõhise 32-baidise soolaga. Kui sool puudub, genereeritakse see loomisel, krüpteeritakse
  kujul `identitySalt`, seda ei tagastata kunagi ning see säilitatakse muutmisel. Võtmete töötlemata ID-sid ei
  lisata kunagi span-atribuutidesse. Sihtkoha soola taasloomine/vahetamine muudab identiteete.
- `keyName`: seadistatud API-võtme nimi, mis avaldab tahtlikult selle operaatori määratud sildi.
- `none`: kasutaja ID puudub. Seansisildid eksporditakse endiselt, kui need on olemas; need režiimid ei
  anonüümi suvalist viibasisu ega operaatori antud seansi-/korrelatsioonisilte.

### Alustamine ilma ajalooliste andmete järeltäiteta

Ainult loomisel lubage **Alusta praegusest asukohast (jäta olemasolevad logid vahele)** või edastage
`startFromCurrentPosition: true` loomise API-päringu andmete ülatasemel. See lähtestab
`cursor_row_id` säilitatud kutselogi praegusele suurimale rowid väärtusele, kasutades olemasolevaid kursori
abifunktsioone ja ilma migratsioonita. Vaikeväärtus on false (kursor 0 ja säilitatud ajaloo järeltäide).
See ei ole uuendamisel kasutatav kursori lähtestamise säte.

Ühise `ttftMs` lisandusega lisatakse ka nullväärtust lubav veerg `ttft_ms` BigQuery vastendajasse
ja uue tabeli skeemi: selle skeemitest nõuab, et igal kanoonilise kirje väljal oleks vastav
veerg. Olemasolevate tabelite eksport jätkub muutumatult: `prepare()` loeb tabeli skeemi ja
jätab välja ainult `ttft_ms`, kui see veerg puudub. Lisage nullväärtust lubav INT64 veerg, et saada TTFT
järgmisel käivitusel, või kasutage uut tabelit. PATCH, automaatne skeemimuudatus ega täiendavad
õigused pole vajalikud; kõigi ülejäänud reaväljade puhul säilib range skeemikontroll.

---

## 6. Sihtkoha lisamine

1. Loo `src/lib/logExport/destinations/<name>.ts`, mis ekspordib `LogExportDestinationType`:
   Zodi `configSchema`, kasutajaliidese jaoks mõeldud kirjelduste massiivi `fields`, `secretFields` ja
   `createClient(config)`, mis tagastab `test()` / `prepare()` / `send(records)`.
2. Lisa see faili `src/lib/logExport/registry.ts` massiivi `DESTINATIONS`.
3. Kirjuta testid kausta `tests/unit/`.

See ongi kogu muudatus: andmete püsisalvestus, cron-töö, REST-kiht, saladuste krüptimine ja
töölaua vorm loevad kõik registrit.

Kaks reeglit uue sihtkoha jaoks:

- `send()` **peab osalise ebaõnnestumise korral viskama erindi**. Edukas lõpetamine tähendab, et „sihtkohal on need read olemas”,
  ja kursor liigub neist jäädavalt edasi.
- Sihtkoht, mis võtab vastu kasutaja määratud URL-i, peab seda enne päringu tegemist valideerima funktsiooniga
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  samamoodi nagu veebihaagid. BigQuery seda ei vaja: selle hostid on konstandid.

---

## 7. Kasutamine

- **Töölaud**: Integratsioonid → Logide eksport. Lisa sihtkoht, käivita **Test**, et kontrollida pääsuandmeid
  ilma ridu kirjutamata, ning seejärel luba sihtkoht.
- **Töötlemisjärjekord**: iga sihtkoha kaart näitab ootel ridu ja kursorit; `GET
/api/log-export/status` tagastab samad näitajad koos viimase 20 töö käivitusega.
- **Ühe sihtkoha tõrge ei põhjusta teiste ebaõnnestumist** — käivituse kokkuvõte salvestab iga sihtkoha
  oleku väljadesse `last_status` / `last_error` ning töö käivituste ajalugu säilitab koondtulemuse.
- **Sihtkoha kustutamine kustutab ka selle kursori.** Selle uuesti lisamisel alustatakse vanimast säilitatud
  kutselogist, mistõttu saadetakse uuesti read, mis võivad sihtkohas juba olemas olla. BigQuery puhul
  väldib reapõhine `insertId` seda ainult BigQuery enda duplikaatide eemaldamise ajaakna piires, seega eelista
  sihtkoha keelamist selle kustutamisele.
