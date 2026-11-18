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

Konfiguratsioonivõtmed (`type: "bigquery"`):

| Võti                 | Märkused                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Andmekogumit sisaldav GCP projekt                                                                              |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                |
| `location`           | Kasutatakse ainult siis, kui andmekogum tuleb luua (vaikimisi `EU`)                                            |
| `serviceAccountJson` | Teenusekonto võti. Salajane: puhkeolekus krüptitud, seda ei tagastata                                          |
| `autoCreate`         | Puuduva andmekogumi/tabeli loomine; nullitavate kasutustõendi veergude tingimuslik lisamine (vaikimisi `true`) |

Teenusekontol peab sihttabelis olema `bigquery.tables.updateData` ning kui `autoCreate` on sisse lülitatud,
lisaks õigused `bigquery.datasets.create` / `bigquery.tables.create`.
Olemasoleva tabeli uuendamiseks kahe nullitava kasutustõendi välja lisamisega on vaja ka
`bigquery.tables.update` õigust. Puuduv õigus nurjab eksportimise ilma kursori edasiliigutamiseta.

Konfigureeritud pakett on **kursori** ühik, mitte HTTP-päringu ühik: `send()` tükeldab selle
insertAll-kutseteks, milles on kõige rohkem 500 rida, seega suur `batch_size` ei saa põhjustada BigQuery
10 MB päringupiiri ületamist. Ajutiste olekute (408/429/500/502/503/504) korral proovitakse kuni kolm korda
uuesti eksponentsiaalse tagasipöördumisega, kasutades samu insertId-sid; autentimis- ja skeemivead põhjustavad
erandi juba esimesel katsel, selle asemel et jooks ära kulutada.

Hetk tagasi loodud tabel ei ole voogedastuse lõpp-punktile veel nähtav ja vastab mõne sekundi jooksul
olekukoodiga 404. Seda 404-vastust proovitakse uuesti, kuid **ainult siis, kui see jooks lõi tabeli** —
päriselt puuduv tabel nurjub kohe. Pange tähele, et hiljuti kustutatud tabeli sama nime all uuesti loomisel
keeldub BigQuery mitme minuti jooksul voogedastuse lisamisi vastu võtmast; see tuleneb kustutamisele
järgnevast uuesti loomisest, seega eelistage tabeli kustutamise ja uuesti lisamise asemel uut tabelinime.

**Osaline tõrge saabub HTTP 200 vastusena, milles `insertErrors[]` ei ole tühi.** Seda käsitletakse
tõrkena ja visatakse erand, mis peatab kursori liikumise edasi ridadest, mida BigQuery vastu ei võtnud;
`tests/unit/log-export-bigquery.test.ts` fikseerib selle käitumise.

Transport on tavaline REST — ise allkirjastatud RS256-väide vahetatakse juurdepääsutõendi vastu aadressil
`https://oauth2.googleapis.com/token`, seejärel saadetakse read `tabledata.insertAll`-i. Google'i SDK-d ei
lisata. Juurdepääsutõendeid puhverdatakse protsessi sees teenusekonto ja skoobi kaupa.

Loodud tabel sisaldab iga vahekaardi Logs välja kohta üht veergu ning välja `exported_at` ja on kujundatud
selle järgi, kuidas kõnelogisid tegelikult päritakse:

- **Päeva kaupa jaotatud välja `timestamp` alusel**, nii et kuupäevadega piiratud päring skannib ainult neid päevi.
- **Klastritud väljade `api_key_name`, `provider`, `model`, `status` järgi** (selles järjekorras), nii et filtreerimine
  selle järgi, kes seda käivitas, kuhu see suunati või kas see nurjus, kärbib iga partitsiooni sees olevaid plokke.
  BigQuery lubab kõige rohkem nelja klasterdusveergu ja järjekord on oluline: ainult `api_key_name`-i järgi
  filtreerimine kärbib plokke, ainult `status`-i järgi filtreerimine seda ei tee.
- **Valikuline partitsioonide säilitamine** parameetri `partitionExpirationDays` kaudu (0 säilitab kõik), mida
  rakendatakse tabeli loomisel.

Mõlemad sätted rakenduvad loomise ajal. Olemasolev tabel säilitab juba olemasoleva paigutuse, seega suunake
sihtkoht uuele tabeli ID-le, kui soovite need kasutusele võtta.

`tests/unit/log-export-bigquery.test.ts` kinnitab, et teisendaja ja tabeliskeem püsivad sünkroonis, nii et
uut kõnelogi veergu ei saa väljundisse saatmisel vaikimisi kõrvale jätta.

Pakette tükeldatakse **nii ridade arvu kui ka serialiseeritud baitide järgi**. Ainult ridade arvust ei piisa,
kui eksporditakse kasulikku sisu: viipasid sisaldavad 500 rida võivad olla kümneid megabaite suured ning
insertAll lükkab üle 10 MB suuruse päringu tagasi. Tükid lõpetatakse 500 rea või 9 MB täitumisel, olenevalt
sellest, kumb saabub varem.

---

## 5. OTLP/HTTP-i jälgede sihtkoht

Konfiguratsioon kasutab `type: "otlp-http"`. See on püsivate kõnelogide ajastatud,
kursori toel eksportimine, mitte parima pingutuse põhimõttel töötav reaalajas
marsruutimise sündmuste sihtkoht failis
`open-sse/services/routing/otel.ts`. See ei loe ega muuda selle sihtkoha keskkonnamuutujaid,
taimereid ega puhvreid. Mõlema lubamine võib tekitada kahte sõltumatut tüüpi span'e;
kasuta `omniroute.log-export` instrumentatsiooni skoopi nende kõnelogi span'ide
eristamiseks.

| Võti                     | Vaikeväärtus / otstarve                                                        |
| ------------------------ | ------------------------------------------------------------------------------ |
| `endpoint`               | Nõutav täielik HTTP(S)-i jälgede URL; järelliidet `/v1/traces` ei lisata       |
| `headers`                | Valikulised `Name: value` read või stringide JSON-objekt; krüptitud            |
| `requestHeaderAllowlist` | Tühi (väljas); kliendi päise nimed/eesliited, mida span'i atribuutidena koguda |
| `serviceName`            | `omniroute`; ressursi `service.name`                                           |
| `langfuseMapping`        | `false`; lisab Langfuse'i genereerimise/seansi/kasutaja atribuudid             |
| `identity`               | `pseudonymous`, `keyName` või `none`                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                        |
| `timeoutMs`              | `30000` iga HTTP-katse kohta                                                   |
| `environment`            | Määramata; valikuline `langfuse.environment`                                   |

Üldine juhtpaneel kuvab need väljad. `paths` aktsepteerib API massiivi või tekstiala,
kus täpsed teed on eraldatud reavahetuste või komadega. Embedding'u-, rerank'i- ja
muud teed jäetakse vahele, kui neid pole selgesõnaliselt lubatud. Vahele jäetud read
viivad siiski kursorit edasi; olemasoleva käitaja `exported`/`exportedTotal` loendurid
loendavad töödeldud lähteridu, sealhulgas filtreeritud ridu, mitte aktsepteeritud span'e.
Filtreerimine toimub alamprotsessis, muutmata selle IPC-/kursori lepingut.

URL-i valideerimisel kasutatakse andmebaasivaba abifunktsiooni
`parseAndValidateNonMetadataUrl` failist `src/shared/network/outboundUrlGuard.ts`:
poliitikat `block-metadata`. Sellel on samad tingimusteta metaandmete/protokolli/
manustatud mandaadi kontrollid nagu webhook'i valideerijal, kuid privaatsed URL-id on
lubatud; samas lubab see sihilikult localhosti/LAN-i sihtkohad ilma globaalse
funktsioonilipu alistamiseta. See võimaldab isemajutatavaid Langfuse'i, Phoenixi, Tempo ja
Collectori lõpp-punkte, sealhulgas privaatseid HTTP-lõpp-punkte. Pilve metaandmete hostid
blokeeritakse alati. Ümbersuunamisi ei järgita, mistõttu collector ei saa mandaate teise
hosti suunata. Nagu olemasolev leksikaalne URL-i valvur, ei seo ka see DNS-i lahendust
kindla aadressiga; konfigureeri ainult operaatori hallatavaid hoste. Kui lõpp-punkt ei asu
usaldusväärses võrgus, eelista HTTPS-i.

### Kasulik koormus ja edastus

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) sisaldab
iga lubatud rea kohta ühte CLIENT span'i, mille nimi põhineb täpsel päringu teel. Teede
nimetamine eristab Chat Completionsi, Responsesi ja Messagesi, lisamata span'i nimesse
mudeli- või identiteediandmeid. Ressursi atribuudid sisaldavad `service.name`-i ja paketi
`service.version`-i.

Tavaline vestluse katse logija
(`open-sse/handlers/chatCore/attemptLogging.ts`) kirjutab lõpetamisel
`duration = Date.now() - startTime` ega anna ajatemplit; `saveCallLogOperation` failis
`src/lib/usage/callLogs.ts` määrab vaikimisi ajatempli kirjutamise (lõpetamise) ajaks.
Seetõttu määrab eksport lõpuajaks rea ajatempli ning algusajaks lõpuaja miinus kestus
(millisekundid teisendatuna kümnendvormingus nanosekunditeks). Helistaja antud ajaloolised
ajaptemplid säilitatakse samuti lõpuajana; rea alguse/lõpetamise eristust ei ole.
Nullkestus muutub nulliks. Vigased või puuduvad ajatemplid nurjuvad kogu partiiga, selle
asemel et luua mittedeterministlikke span'e. `ttftMs` on nullable ja kaardistatakse väärtusele
`omniroute.ttft_ms`.

Atribuudid sisaldavad `gen_ai.operation.name="chat"` väärtust, teenusepakkujat,
taotletud/vastuse mudelit, sisend-/väljundtokeneid, valikulisi vahemälust lugemise,
vahemälu loomise ja arutluse tokeneid, HTTP olekut, kombinatsiooni, vahemälu allikat,
seansi silti ja korrelatsiooni ID-d. OTLP täisarvud ja ajatemplid on kümnendstringid;
stringid, tõeväärtused ja murdarvud kasutavad oma loomulikke OTLP väärtuse variante.
Vea span'idel on ERROR-olek ja puhastatud olekuteade. Kanooniline kirje ei sisalda
ülesvoolu hosti URL-i, mistõttu `server.address` jäetakse välja, selle asemel et
identifitseerida collectorit ekslikult mudeliserverina. Kulu ei ekspordita.

Ainult `includeBodies=true` laadib sisu. Kui `langfuseMapping=false`, sisaldavad
`gen_ai.input.messages` / `gen_ai.output.messages` OmniRoute'i salvestatud puhastatud
päringu/vastuse keha JSON-i (parsitava sisu korral kanoonilisena), mitte ümberkujundatud
semconv-sõnumite massiivi. Kärbitud või JSON-ivälised kehad jäävad töötlemata tekstiks.
Kui `langfuseMapping=true`, väljastatakse kehad ainult kujul
`langfuse.observation.input` / `langfuse.observation.output`; `gen_ai.*.messages`
atribuudid jäetakse välja, et iga keha saadetaks üks kord. Mõlemad režiimid pärivad
olemasolevalt hüdraatimise teelt `maxBodyBytes` väärtuse;
`omniroute.bodies_truncated=true` märgib kärpimist.
See sihtkoht ei lisa täiendavaid konveieri hetktõmmiseid ega puhastamata artefaktide
lugemisi; valikuline päringu päiste kogumine kasutab allpool kirjeldatud olemasolevat
hüdraaditud kliendi hetktõmmist. Kehade eksportimisel kasuta minutilähedast sagedust, näiteks
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, mitte ära lase tekkida tunnipikkusel järjekorral.

### Valikulised kliendi päringu päised

Päiste kogumine on **vaikimisi välja lülitatud**. Määra sihtkoha konfiguratsioonis
`requestHeaderAllowlist` ja luba **Export prompts and responses**
(sihtkohas `includeBodies: true`). Lubatud loend aktsepteerib API massiivi või tekstiala,
kus nimed on eraldatud reavahetuste või komadega:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nimed sobivad tõstutundlikkusest sõltumatult ja täpselt, välja arvatud juhul, kui üksainus lõpus olev `*` valib mittetühja
päise nime prefiksi. Paljas `*`, põimitud metamärgid ja sobimatud HTTP-päiste nimed lükatakse tagasi.
Valijaid on kõige rohkem 64 ning igaühe nimi või prefiks võib olla kuni 256 ASCII-baiti.
See säte on eraldi sättest `headers`, mis autentib eksportija kogujale.

Püük loeb ainult väärtust `pipeline_client_request`, mis täidetakse salvestatud üksikasjaliku konveieri
`clientRawRequest`-ist (või pärandvariandist `clientRequest`). See ei kasuta kunagi varuvariandina teenusepakkuja päringu päiseid.
Üksikasjalik konveieri logimine pidi päringu salvestamise ajal olema lubatud. Kui
`includeBodies` on keelatud või kliendi hetktõmmise JSON puudub, on rikutud või kärbitud, siis päiseatribuute ei väljastata.
`maxBodyBytes` suurendamine võib vältida hetktõmmise kärpimist eksportimise ajal;
see ei saa taastada üksikasju, mida kunagi ei salvestatud. Hetktõmmist, mis on suurem kui 1 MiB või sisaldab rohkem kui
256 päisekirjet, eiratakse. Olemasolev viiba/vastuse eksport jääb päiste püüdmise kõrval lubatuks; lubatud loend ei paku ainult päiste
hüdratsiooni režiimi.

Valitud väärtustest saavad OTLP stringimassiivid kujul `http.request.header.<full lowercase header name>`,
isegi ühe stringi korral. Näiteks `X-OmniRoute-Meta-Team: example-team` muutub väärtuseks
`http.request.header.x-omniroute-meta-team`, mille sisu on
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Täielik prefiks säilitatakse: need on tavalised päised, mille puhul ei parsita ärivälju ega teisendata neid
`omniroute.metadata.*`-iks ega Langfuse'i metaandmeteks. `langfuseMapping` ei muuda päiste semantikat. Valitud ühekordse väärtusega
`User-Agent` määrab ka standardse skalaarse väärtuse `user_agent.original`. Ühe väärtuse sees olevaid komasid ei tükeldata.
Tõstutundlikkuse variandid ühendatakse salvestatud kirjete järjekorras; mis tahes sobimatu variant jätab kogu selle päise välja.
Atribuudid järjestatakse väiketähelise nime järgi.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, API-võtme päised, autentimise/märgi/saladuse/parooli/mandaadi
tunnuseid sisaldavad nimed ja sisemise lüüsi mandaadid jäetakse alati välja, isegi kui need on valitud või salvestuses osaliselt maskitud.
Teadaolevad mandaadimustrid kasutavad ühist mandaatide tuvastajat; redigeerimistähised jäetakse välja, mitte ei ekspordita turvaliste väärtustena.
Lubatud on ainult stringid ja mittetühjad stringimassiivid; numbreid ega objekte ei sunnita stringideks.
Sobimatud nimed, prototüübi võtmed, juhtmärgid (välja arvatud horisontaalne tabeldusmärk) ja vigane Unicode eiratakse ilma partiid nurjamata
või nende sisu vigades kajastamata.

Iga span püüab kõige rohkem 32 päist, 16 väärtust päise kohta, 4096 UTF-8-baiti väärtuse kohta
ja kokku 16384 UTF-8-baiti püütud päise nimede ning väärtuste peale. Liiga suured või sobimatud päised jäetakse tervikuna välja, mitte ei kärbita.
Valik on operaatori privaatsusotsus: turvalisena näivad nimed võivad siiski sisaldada isikuandmeid ning need piirangud ja tuvastajad ei ole üldotstarbeline
PII-puhastaja.

### Edastuspiirangud

Päringutele kehtivad piirangud: 500 span-i ja 4 MiB UTF-8 JSON-i, kaasa arvatud ümbris.
Iga lubatud span kontrollitakse suuruse suhtes enne kursoripartii esimest päringut. Piirangust suurem üksik
span ei saada sellest partiist ühtki osa ja nurjub juhisega vähendada väärtust
`maxBodyBytes`; seda ei jäeta vaikselt välja. Eelkontroll säilitab ainult kirjete viited
ja baidiarvud ning kustutab iga ajutise span-i/JSON-i; span-id ehitatakse piiratud tükkide
jaoks uuesti, selle asemel et hoida partii teist serialiseeritud koopiat. HTTP 408/429/5xx, võrgutõrked ja ajalõpud saavad kõige rohkem
kolm katset, eksponentsiaalse 250/500 ms tagasiminekuajaga. `Retry-After`-i sekundid või HTTP-kuupäevad
võivad pikendada viivitust kuni 5 sekundini. Muud olekud nurjuvad kohe. OTLP 2xx osalise tagasilükkamise korral visatakse samuti viga, mitte ei kinnitata
kaduma läinud span-i; tühjad või kehtivad JSON-kinnitused aktsepteeritakse, vastuse lugemise ülempiiriga
64 KiB.

Vead sisaldavad ainult eksportija hallatavaid fakte: HTTP-olekut, uuestikatsetamise klassi, katsete arvu ja saadetud span-ide
arvu või kindlaksmääratud kinnituse-/võrgutõrke sõnastust. Koguja vastuse kehasid,
osalise edu arve ja vastusepäiseid ei kopeerita kunagi vigadesse, logidesse ega juhtpaneelile. Nurjunud või osaliselt vastu võetud partiid ei kinnitata:
sihtkoht kuvab oleku Failing koos selle olekuga, kursor jääb viimase kinnitatud partii juurde ja järgmine käituskord
saadab samad read uuesti. Püsivad olekud jäävad nurjunuks, kuni koguja või konfiguratsioon parandatakse.
Vastuse üksikasju vaadake koguja enda logidest. Kõnelogi vigade kokkuvõtetes säilitatakse eraldi redigeerimine.
`prepare()` ei varusta midagi; Test saadab täpselt `{"resourceSpans":[]}` ja teatab
HTTP-oleku ilma kõnelogi spane kirjutamata.

Jälgede ID-d ja span-ide ID-d on vastavalt SHA-256 esimese 32/16 kuueteistkümnendmärki väärtustest
`"omniroute.trace\\0" + callLogId` ja `"omniroute.span\\0" + callLogId`. Uuesti saadetud andmetel on
samad ID-d. See ei taga deduplitseerimist: mõned taustsüsteemid, sealhulgas Langfuse'i v4 sissevõtt,
ei deduplitseeri sama ID-ga spane. Krahh või osalise tüki nurjumine võib uuesti saata kõige rohkem ühe kinnitamata kursori
partii; kogu see partii võib dubleeruda, mitte ainult selle viimane HTTP-tükk. Valige kursori partii suurus seda kompromissi
arvestades.

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

Koostage väärtus Authorization kohapeal, kodeerides sõna-sõnalt stringi `public-key:secret-key`
Base64-vormingusse (näiteks väärtusega `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Ärge lisage tegelikke mandaate logidesse, kuvatõmmistesse ega probleemikirjeldustesse. Vastendamine
määrab automaatselt `x-langfuse-ingestion-version: 4`; Authorization tuleb endiselt edastada väljal `headers`.
Nii päised kui ka loodud identiteedisool kasutavad olemasolevat krüptitud salavälja mehhanismi ja API kohatäitjaid;
`STORAGE_ENCRYPTION_KEY` on nõutav.

Vastendus lisab genereerimise tüübi/mudeli, JSON-i kasutusandmed (sisendi/väljundi/kogusumma ja saadaolevad
vahemälu võtmed), JSON-i sisendi/väljundi hetktõmmised, ERROR/DEFAULT-taseme,
puhastatud olekuteate, trace'i nime, seansi ID, valikulise keskkonna ja filtreeritava
`langfuse.observation.metadata.<key>`-i teenusepakkuja, taotletud mudeli, tee, kombinatsiooni, vahemälu
allika ja oleku jaoks. `langfuse.observation.completion_start_time` on ISO 8601 vormingus algusaja
väärtus + TTFT ainult siis, kui TTFT on teada ja jääb kestuse sisse. Kuluatribuute ei saadeta.

Identiteedirežiimid rakenduvad väljale `langfuse.user.id`:

- `pseudonymous` (vaikimisi): API-võtme sisemise ID HMAC-SHA256 koos juhusliku
  iga sihtkoha jaoks loodud 32-baidise soolaga. Sool genereeritakse loomisel, kui see puudub, krüpteeritakse
  nimega `identitySalt`, seda ei tagastata ja see säilitatakse redigeerimiste ajal. Toorvõtmete ID-sid ei panda kunagi
  span'i atribuutidesse. Sihtkoha soola uuesti loomine/pööramine muudab identiteete.
- `keyName`: konfigureeritud API-võtme nimi, mis paljastab tahtlikult selle operaatori määratud sildi.
- `none`: kasutaja ID puudub. Seansi sildid eksporditakse nende olemasolu korral endiselt; need režiimid ei
  anonümiseeri suvalist viiba sisu ega operaatori antud seansi-/korrelatsioonisilte.

### Alustamine ilma tagasitäiteta

Ainult loomisel lubage **Alusta praegusest positsioonist (jäta olemasolevad logid vahele)** või edastage
`startFromCurrentPosition: true` loomise API kasuliku koormuse tipptasemel. See lähtestab
`cursor_row_id` praegu säilitatava kõnelogi rea maksimaalsele rowid-väärtusele, kasutades olemasolevaid kursori
abifunktsioone ja ilma migratsioonita. Vaikimisi on väärtus false (kursor 0 ja säilitatud ajaloo tagasitäide).
See ei ole värskendamise ajal kasutatav kursori lähtestamise seadistus.

Ühise `ttftMs`-i lisamine lisab BigQuery vastendusse ja uue tabeli skeemi ka tühistatava
`ttft_ms`-i veeru: skeemitest nõuab, et igal kanoonilisel kirjeväljal oleks veerg. Olemasolevad tabelid jätkavad
muutumatut eksportimist: `prepare()` loeb tabeli skeemi ja jätab `ttft_ms`-i välja ainult siis, kui see veerg puudub.
TTFT saamiseks järgmisel käivitamisel lisage tühistatav INT64-veerg või kasutage uut tabelit. Valikuline TTFT-veerg
ei käivita skeemi uuendamist. Kasutusandmete tõendamise veerud järgivad allpool kirjeldatud tingimuslikku,
osalemiseks lubamist nõudvat ühilduvusvoogu; teiste rea väljade puhul säilib range skeemikontroll.

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

## 7. Selle kasutamine

- **Armatuurlaud**: Integratsioonid → Logi eksport. Lisage sihtkoht, käivitage **Test**, et mandaate
  kontrollida ridu kirjutamata, seejärel lubage see.
- **Mahajäämus**: iga sihtkoha kaart näitab ootel ridu ja kursorit; `GET
/api/log-export/status` tagastab samad näitajad ning viimased 20 töö käivitamist.
- **Ühe sihtkoha tõrge ei põhjusta teiste tõrget** — käivituse kokkuvõte salvestab sihtkohapõhise
  oleku väljades `last_status` / `last_error` ning töö käivitamise ajalugu säilitab koondtulemuse.
- **Sihtkoha kustutamisel kustutatakse selle kursor.** Selle uuesti lisamisel alustatakse vanimast säilitatud
  kõnelogist, mistõttu saadetakse uuesti read, mis võivad sihtkohas juba olemas olla. BigQuery puhul
  kõrvaldab rea `insertId` selle mõju ainult BigQuery enda duplikaatide eemaldamise akna jooksul, seega
  eelistage sihtkoha kustutamisele selle keelamist.

### Kasutustõendi skeemi ühilduvus

Uued BigQuery tabelid sisaldavad nullväärtust lubavaid välju `usage_evidence` (STRING, mis sisaldab JSON-i) ja
`usage_estimated` (BOOL). Kui `autoCreate` on lubatud, saab olemasolev tabel juurde ainult need puuduvad
nullväärtust lubavad veerud. Eksportija säilitab kogu olemasoleva skeemi, sealhulgas välja metaandmed, ning
saadab tagastatud etagi abil tingimusliku PATCH-päringu. Samaaegne skeemimuudatus põhjustab ekspordi
nurjumise selle ülekirjutamise asemel; järgmisel käivitamisel loetakse tabel uuesti.

Kui `autoCreate` on keelatud, lisage need veerud enne kasutustõenditega kirjete eksportimist ise.
Puuduvad skeemi- või etagi metaandmed või ebaõnnestunud värskendus takistavad samuti tõendit sisaldavate
kirjete lisamist. Ekspordi kursor ei liigu selle tõrke korral edasi ja tõendeid ei jäeta kunagi
vaikselt kõrvale. Kohaliku logi säilitamise reeglid kehtivad ka ekspordi blokeerimise ajal, seega
lahendage tõrge enne säilitatud lähtereadude aegumist.
