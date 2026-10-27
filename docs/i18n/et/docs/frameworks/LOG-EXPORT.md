# Log export (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute'i kõnelogide pidev, inkrementaalne eksport välisesse analüütikaandmehoidlasse.

Logide töölaua vahekaart säilitab päringute ajaloo SQLite'is (`call_logs`), mille mahtu piiravad
rotatsioon ja säilitusperiood. Logide eksport saadab sama kirjete kogumi ajakava alusel välja, et see säiliks
kohalikust andmebaasist kauem ja seda saaks muude andmetega ühendada. BigQuery on esimene sihtkoht;
konveier kasutab registrit, seega saab sihtkohti juurde lisada.

---

## 1. Kuidas see töötab

```
server (dekrüptib ja valideerib konfiguratsiooni, kooskõlastab kursori)
  → käivitab IPC → isoleeritud exportChild OS-i protsess
    → kirjutuskaitstud storage.sqlite → ühine kõnelogi päring/vastendus
      → artefaktide asünkroonne laadimine → sihtkoha prepare()/send()
        → paketi IPC → server salvestab kursori → kinnituse IPC
          → järgmine pakett; done IPC → server salvestab õnnestumise
```

- **Ajastamine** — üks `JobRegistry` cron-töö `log_export`, vaikimisi `0 * * * *` (iga tund,
  UTC). Registreeritud failis `src/lib/initCloudSync.ts`; muudetav muutujaga `OMNIROUTE_LOG_EXPORT_CRON`.
  Iga käivitus töötleb järjest kõiki **lubatud** sihtkohti.
- **Kursor** — SQLite'i implitsiitne `call_logs.rowid`, mis salvestatakse iga sihtkoha kohta väljal
  `log_export_destinations.cursor_row_id`. `timestamp` ei ole teadlikult kursor: väljakutsujad
  võivad esitada oma väärtuse, mistõttu aeglane päring võidakse kirjutada pärast kiiremat päringut,
  mis algas hiljem, ning ajatemplipõhine kursor jätaks selle vahele.
- **Pakettideks jagamine** — `batch_size` rida päringu kohta (vaikimisi 500), `max_rows_per_run` rida
  käivituse kohta (vaikimisi 10000), et suur mahajäämus töödeldaks mitme käivituse jooksul, mitte
  ei blokeeriks üht käivitust.
- **Edastamine** — kursor liigub edasi alles pärast funktsiooni `send()` edukat lõppemist. Nurjunud
  pakett jätab kursori senisesse asukohta, mistõttu proovitakse samu ridu järgmisel käivitusel uuesti.
  Garantii on vähemalt üks edastus koos sihtkohapoolse duplikaatide eemaldamisega, mitte tõeline
  täpselt üks kord edastus: BigQuery määrab iga rea võtmeks kõnelogi ID ja arvestab seda oma
  duplikaatide eemaldamise ajavahemikus parima võimaliku pingutusena.
- **Kattuvuse kaitse** — cron-käivitus ja `POST .../run` võivad käivituda samal ajal. Juba töödeldav
  sihtkoht jäetakse vahele, mitte ei töödelda seda kaks korda (käivitustulemuses `skipped: true`),
  mistõttu samaaegne käivitus ei saa paketti uuesti saata ega kursorit tagasi kirjutada.
- **Taastumine kustutamisest** — kui `cursor_row_id` jõuab väärtusest `MAX(rowid)` kõrgemale (kogu
  tabel kustutati ja rea-ID-d algasid uuesti), kerib käitaja kursori tagasi väärtusele 0, selle
  asemel et jääda püsivalt uusi ridu mitte nägema.

### Isoleeritud käitaja ja piirangud

Node käivitab iga sihtkoha töötluse eraldi lühiealise OS-i alamprotsessina (`child_process`
koos IPC-ga, mitte `worker_threads`). Kehade lugemine, lasti JSON-i parsimine/serialiseerimine,
sihtkoha `prepare()` ja sihtkoha võrgu-I/O toimuvad kõik seal, mitte serveri sündmusetsüklis.
IPC kaudu liiguvad ainult konfiguratsioon ja väikesed edenemisteated; eksporditud kirjed ei naase
kunagi serverisse. Cron-töö ja kohe käivitamise marsruut säilitavad sama avaliku tulemuse ning
kattuvuse kaitse.

Alamprotsess avab serveri lahendatud faili `DATA_DIR/storage.sqlite` kirjutuskaitstult, kasutades
moodulit `node:sqlite` ning seadeid `busy_timeout=5000` ja `query_only=ON`. See ei impordi ühtki
andmebaasi singleton'i ega tee migratsioone, varukoopiaid või SQLite'i uuendusi. Puuduvate või
rikutud artefaktide arvestus (sealhulgas rikutud artefakti UPDATE) jääb ainult töölaua detailvaate
teele. Mõlemad teed kasutavad ühist puhast detailide lahendajat; eksport kasutab asünkroonseid
failisüsteemi lugemisi ja sama lahendusjärjekorda: artefakt → pärand-inline → pärandketas → puudub.
Käivitus teeb lugeja avamisel maksimaalsest sisestusrea ID-st hetktõmmise; hilisemad sisestused
ootavad järgmist käivitust. See on sisestuspiir, mitte pikaajaline SQLite'i tehing: WAL-i kirjutajad
ja kontrollpunktid saavad võrguootuste ajal vabalt töötada. Olemasolevate ridade uuendusi ega
kustutamisi see piir ei külmuta.

Pärast iga vastuvõetud paketti ootab alamprotsess kinnitust. Server salvestab esmalt kursori
funktsiooniga `advanceLogExportCursor` ja saadab seejärel `ack`; enne seda ei alustata järgmise
paketi töötlemist. Saatmise nurjumine, krahh või ajalõpp salvestab tõrke ilma selle paketi kursorit
edasi liigutamata. Varem kinnitatud paketid jäävad salvestatuks; uuesti võidakse saata kõige rohkem
üks kinnitamata pakett. Õnnestumine salvestatakse alles pärast `done` saamist ja alamprotsessi
veatut väljumist. Tõrgete korral lõpetatakse alamprotsess signaaliga SIGTERM, 500 ms pärast minnakse
vajaduse korral üle signaalile SIGKILL ning käitaja ootab protsessi sulgumist.

| Keskkonnamuutuja                              | Vaikeväärtus | Otstarve                                   |
| --------------------------------------------- | ------------ | ------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000       | Sihtkohapõhine täitmisaja piirang          |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024         | Alamprotsessi V8 vana ruumi piirang MB-des |

Sobimatute, mittepositiivsete või mittetäisarvuliste väärtuste korral kasutatakse vaikeväärtusi.
Kuhja seadistus ei ole kogu RSS-i piirang; väga suured paketid võivad endiselt alamprotsessi mälu
ammendada ja käivituse turvaliselt nurjata. Vaikeväärtus 1024 MB jätab piisavalt varuruumi
vaikimisi 500-realiseks paketiks, mis sisaldab 512 KiB artefakte ja mille puhul on kehad lubatud,
sealhulgas BigQuery baidiplokkideks jagatud JSON-i serialiseerimiseks. See ei muuda 10000-realist
kehadega paketti ohutuks. V8 kuhjamälu ammendumisel salvestatakse konkreetset tegevust võimaldav
tõrge: vähendage paketi suurust või suurendage väärtust
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor jääb viimase kinnitatud paketi juurde.
Ajaloolistele inline- või ketaskehadele tänapäevane artefaktipiirang ei laiene. Operaatorid peavad
RSS-i jaoks eraldi ressursse planeerima, eriti mälupiiranguga konteinerites.

Alamprotsess pärib ainult lahendatud `DATA_DIR`, `NODE_ENV`, selgesõnalise `TZ` (pärandfailinimede
kohaliku aja lahendamiseks), olemasolu korral `ELECTRON_RUN_AS_NODE` ning järgmised väljaminevate
ühenduste sisendid: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (ja nende väiketähelised
vormid), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`,
`SSL_CERT_DIR`. Globaalne Undici dispetšer kasutab serveriga sama puhast keskkonnapõhist
puhverserveri lahendust ja kohalike hostide puhverserverist möödumise reegleid, sealhulgas
`NO_PROXY`; see ei impordi faili `proxyFetch.ts` ega selle andmebaasi-/funktsioonilippe.
Puhverserveri mandaadid eemaldatakse edastatavast väljundist ja salvestatud vigadest. Sihtkoha
mandaadid liiguvad ainult ühes käivitamise IPC-sõnumis, mitte kunagi argv-s ega keskkonnas;
väljundi ja vigade edastusele lisatakse prefiks ning tundlik teave eemaldatakse. Alamprotsessi
käivitusargumentides keelatakse ainult `ExperimentalWarning`, et vältida Node'i SQLite'i hoiatuse
kordamist iga cron-käivituse ajal; muud hoiatustüübid jäävad nähtavaks.

Sihtmooduleid peab saama importida ilma Next.js-i või ainult serveris kasutatavate sõltuvusteta. Olemasolev
BigQuery teostus juba vastab sellele lepingule. Juurdepääsutõendite vahemälud säilivad ainult alamprotsessi
käituse jooksul, mitte käituste vahel. Toetatud käituskeskkond on Node (`package.json` engines), kuid README Bun-i
installimise jaotis ja `Dockerfile.bun` reklaamivad ka tootmiskeskkonnaga ühilduvat lahendust, mis kasutab
`bun:sqlite`-i (`src/lib/db/core.ts` / adapterid). Seetõttu säilitavad ekspordid Bun-i kasutamisel varasema
protsessisisese käitustee ja väljastavad ühekordse hoiatuse: alamprotsessi kuhja- ja ajalõpuisolatsioon pole saadaval. Kasutage
Node'i sündmusetsükli ja OOM-isolatsiooni jaoks; Bun-i ei käsitleta siin ainult arenduseks mõeldud lahendusena.

Kui `includeBodies` on lubatud, eelistage minutilise täpsusega ajakava, näiteks
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, selle asemel et koguda tunni jagu kasulikku lasti ootele.
Partii- ja reapiirangud piiravad endiselt iga käitust. Protsessi käivitamise kulu rakendub igale sihtkohale iga käituse ajal;
see vahetab väikese käivituskulu serveri sündmusetsükli isolatsiooni vastu, mitte ei vähenda CPU kogukasutust.

### Kasulikud lastid (viibad ja lõpetamised)

Vaikimisi sisaldab eksport ainult kokkuvõttevälju, mida kuvatakse logide **loendis**. Valiku
**Ekspordi viibad ja vastused** (`includeBodies`) sisselülitamisel saadetakse lisaks iga kutse kohta see, mida kuvatakse logide **üksikasjade**
paanil:

| Väli                             | Mida see sisaldab                                                           |
| -------------------------------- | --------------------------------------------------------------------------- |
| `request_body` / `response_body` | Kutse kasulikud lastid sellisel kujul, nagu töölaud neid kuvab              |
| `pipeline_route_decision`        | Millise sihtmärgi ja mudeli ruuter valis                                    |
| `pipeline_client_request`        | Töötlemata päring täpselt sellisel kujul, nagu klient selle saatis          |
| `pipeline_openai_request`        | Pärast sisemisele OpenAI kujule teisendamist                                |
| `pipeline_provider_request`      | Sellisel kujul, nagu see tegelikult teenusepakkujale tema dialektis saadeti |
| `pipeline_provider_response`     | Töötlemata teenusepakkuja vastus                                            |
| `pipeline_client_response`       | See, mis tagastati kutsujale                                                |
| `pipeline_error`                 | Konveieri taseme vea üksikasjad nurjunud kutse korral                       |
| `bodies_truncated`               | Tõene, kui mõni ülaltoodud väli saavutas `maxBodyBytes` piiri               |

See on viiba sisu, mistõttu on see **vaikimisi välja lülitatud** ja teadlikult iga sihtkoha jaoks eraldi valitav.
Saadetakse see, mida töölaud kuvab, sest eksport ja `getCallLogById` kasutavad sama üksikasjade
lahendamist: kasulikud lastid
on juba kirjutamisel PII-st puhastatud ja saladused on peidetud ning `noLog` API-võtmega tehtud kutse
ei salvesta üldse kasulikku lasti, seega pole midagi eksportida.

Kasulikud lastid loetakse iga rea jaoks failisüsteemi artefaktist, mistõttu rikastamine toimub ainult nende sihtkohtade
jaoks, mis seda taotlesid. Puuduva või rikutud artefakti korral eksporditakse selle kokkuvõte nullväärtusega kasulike lastidega,
selle asemel et partii nurjata ja kursor seisma jätta.

`maxBodyBytes` (vaikimisi 262144) piirab iga välja suurust. Pikemad kasulikud lastid **kärbitakse, mitte ei jäeta
välja** — kärbitud viip vastab endiselt küsimusele „mida küsiti“ — ja rida märgistatakse väljaga
`bodies_truncated`. Voogedastatud plokkhaavalisi deltasid ei ekspordita; koostatud vastus sisaldub
juba väljadel `pipeline_provider_response` ja `pipeline_client_response`.

---

## 2. Failid

| Osa                          | Asukoht                                      |
| ---------------------------- | -------------------------------------------- |
| Sihtkoha leping              | `src/lib/logExport/types.ts`                 |
| Register                     | `src/lib/logExport/registry.ts`              |
| Saladuste käsitlemine        | `src/lib/logExport/secrets.ts`               |
| Käitaja (ülemprotsessi IPC)  | `src/lib/logExport/runner.ts`                |
| Protsessi elutsükkel         | `src/lib/logExport/childRunner.ts`           |
| Alamprotsessi sisenemispunkt | `src/lib/logExport/exportChild.ts`           |
| Kirjutuskaitstud avaja       | `src/lib/db/logExportReadOnly.ts`            |
| Ühispäringud ja vastendus    | `src/lib/usage/callLogExportQueries.ts`      |
| Üksikasjade lahendaja        | `src/lib/usage/callLogDetailResolver.ts`     |
| API projektsioon             | `src/lib/logExport/presenter.ts`             |
| BigQuery sihtkoht            | `src/lib/logExport/destinations/bigquery.ts` |
| Google'i SA autentimine      | `src/lib/logExport/googleServiceAccount.ts`  |
| Kõnelogi allikas             | `src/lib/usage/callLogExportSource.ts`       |
| Püsimälu                     | `src/lib/db/logExportDestinations.ts`        |
| Croni töö                    | `src/lib/jobs/logExportJob.ts`               |
| REST-kiht                    | `src/app/api/log-export/`                    |
| Töölaua leht                 | `src/app/(dashboard)/dashboard/log-export/`  |

Skeem: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Kõik marsruudid nõuavad haldusautentimist (`requireManagementAuth`). Saladusi ei tagastata kunagi:
salvestatud saladus tagastatakse literaalina `__stored__` ning selle väärtuse saatmine uuendamisel
säilitab salvestatud pääsuteabe.

Sihtkoha loomine või uuendamine, kui selle tüüp deklareerib saladuse, **nõuab
`STORAGE_ENCRYPTION_KEY`**. Ilma selleta on `encrypt()` vaikne läbivoperatsioon, mistõttu
keeldutakse kirjutamisest veakoodiga 400, selle asemel et talletada pääsuteave SQLite'i lihttekstina
(sama kaitset rakendab Telegrami veebihaak).

| Meetod   | Tee                                      | Eesmärk                                                           |
| -------- | ---------------------------------------- | ----------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Sihtkohatüübid ja nende konfiguratsiooniväljade loend             |
| `GET`    | `/api/log-export/destinations`           | Sihtkohtade loend (saladused peidetud)                            |
| `POST`   | `/api/log-export/destinations`           | Sihtkoha loomine                                                  |
| `GET`    | `/api/log-export/destinations/{id}`      | Ühe sihtkoha lugemine                                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | Nime / lubatuse / konfiguratsiooni / paketeerimise uuendamine     |
| `DELETE` | `/api/log-export/destinations/{id}`      | Kustutamine                                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | Pääsuteabe kontrollimine ilma midagi kirjutamata                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Kohene tühjendamine, sama tee nagu ajastatud käitusel             |
| `GET`    | `/api/log-export/status`                 | Croni olek, hiljutised käitused, iga sihtmärgi ootel kirjete hulk |

`GET /api/log-export/types` muudab kasutajaliidese üldiseks: töölaua vorm renderdatakse
tagastatud väljadeskriptorite põhjal, seega ei vaja uus sihtkoht kasutajaliidese muudatust.

---

## 4. BigQuery sihtkoht

Konfiguratsioonivõtmed (`type: "bigquery"`):

| Võti                 | Märkused                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| `projectId`          | GCP projekt, mis sisaldab andmestikku                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                           |
| `location`           | Kasutatakse ainult siis, kui andmestik tuleb luua (vaikimisi `EU`)        |
| `serviceAccountJson` | Teenusekonto võti. Saladus: puhkeolekus krüpteeritud, ei tagastata kunagi |
| `autoCreate`         | Andmestiku ja tabeli loomine esimesel eksportimisel (vaikimisi `true`)    |

Teenusekonto vajab sihttabelis õigust `bigquery.tables.updateData` ning juhul, kui `autoCreate`
on sisse lülitatud, õigusi `bigquery.datasets.create` / `bigquery.tables.create`.

Konfigureeritud pakk on **kursori** ühik, mitte HTTP ühik: `send()` jagab selle `insertAll`
kutseteks, milles on kuni 500 rida, mistõttu suur `batch_size` ei saa ületada BigQuery 10 MB
päringupiirangut. Ajutiste olekukoodidega (408/429/500/502/503/504) päringuid proovitakse
eksponentsiaalse viivitusega kuni kolm korda uuesti, kasutades samu insertIds-väärtusi;
autentimis- ja skeemitõrked annavad vea juba esimesel katsel, selle asemel et käitust asjatult jätkata.

Äsja loodud tabel ei ole voogedastuse lõpp-punktile veel nähtav, mistõttu vastab see mõne sekundi
jooksul koodiga 404. Seda 404 vastust proovitakse uuesti, kuid **ainult siis, kui tabel loodi selle
käituse käigus** — tegelikult puuduv tabel nurjub endiselt kohe. Pange tähele, et hiljuti kustutatud
tabeli sama nime all uuesti loomisel keeldub BigQuery mitme minuti jooksul voogedastatavaid lisamisi
vastu võtmast; see tuleneb kustutamisele järgnevast taasloomisest, seega eelistage tabeli eemaldamisele
ja uuesti lisamisele uut tabelinime.

**Osaline tõrge saabub HTTP 200 vastusena, mille `insertErrors[]` pole tühi.** Seda käsitletakse
tõrkena ja visatakse erind, mis takistab kursoril liikumast mööda ridadest, mida BigQuery kunagi
vastu ei võtnud; `tests/unit/log-export-bigquery.test.ts` fikseerib selle käitumise.

Transport kasutab tavalist REST-i — ise allkirjastatud RS256-väide vahetatakse pääsutõendi vastu
aadressil `https://oauth2.googleapis.com/token`, seejärel saadetakse read meetodile
`tabledata.insertAll`. Ühtegi Google'i SDK-d ei kaasata. Pääsutõendid puhverdatakse protsessisiseselt
iga paari (teenusekonto, ulatus) kohta.

Loodud tabel sisaldab üht veergu iga vahekaardi Logs välja kohta ning lisaks veergu `exported_at`
ja selle paigutus vastab kõnelogide tegelikule päringukasutusele:

- **Päevade kaupa partitsioneeritud välja `timestamp` alusel**, mistõttu kuupäevaga piiratud päring
  skannib ainult neid päevi.
- **Klastriteks jaotatud väljade `api_key_name`, `provider`, `model`, `status` järgi** (selles
  järjekorras), mistõttu käitaja, sihtkoha või nurjumise järgi filtreerimine kõrvaldab iga
  partitsiooni sees ebaolulised plokid. BigQuery lubab kuni nelja klasterdamisveergu ja järjekord on
  oluline: ainult välja `api_key_name` filter kõrvaldab plokke, ainult välja `status` filter mitte.
- **Valikuline partitsioonide säilitusaeg** võtme `partitionExpirationDays` kaudu (0 säilitab kõik),
  mida rakendatakse tabeli loomisel.

Mõlemad sätted rakenduvad loomise ajal. Olemasolev tabel säilitab oma senise paigutuse, seega
nende kasutuselevõtuks suunake sihtkoht uuele tabeli ID-le.

`tests/unit/log-export-bigquery.test.ts` kontrollib, et vastendaja ja tabeli skeem püsiksid
sünkroonis, nii et uut kõnelogi veergu ei saaks eksportimisel märkamatult kõrvale jätta.

Paketid tükeldatakse **nii** ridade arvu kui ka serialiseeritud baitide järgi. Ainult ridade arvust ei piisa,
kui eksporditakse kasulikke andmeid: 500 viipasid sisaldavat rida võib moodustada kümneid megabaite ning insertAll
lükkab tagasi üle 10 MB suuruse päringu. Tükid suletakse 500 rea või 9 MB täitumisel, olenevalt sellest, kumb saabub varem.

---

## 5. Sihtkoha lisamine

1. Loo `src/lib/logExport/destinations/<name>.ts`, mis ekspordib tüübi `LogExportDestinationType`:
   Zodi `configSchema`, kasutajaliidese jaoks mõeldud `fields`-kirjelduste massiiv, `secretFields` ja
   `createClient(config)`, mis tagastab `test()` / `prepare()` / `send(records)`.
2. Lisa see faili `src/lib/logExport/registry.ts` massiivi `DESTINATIONS`.
3. Kirjuta testid kataloogi `tests/unit/`.

See ongi kogu muudatus: püsiandmete kiht, cron-töö, REST-kiht, saladuste krüptimine ja
töölaua vorm loevad kõik registrit.

Kaks reeglit uue sihtkoha jaoks:

- `send()` **peab osalise nurjumise korral erindi viskama**. Edukas lõpulejõudmine tähendab, et „sihtkohas on need read olemas”,
  ning kursor liigub neist jäädavalt edasi.
- Kasutaja antud URL-i kasutav sihtkoht peab selle enne päringu tegemist valideerima funktsiooniga
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  samamoodi nagu veebihaagid. BigQuery puhul pole see vajalik: selle hostid on konstantsed.

---

## 6. Kasutamine

- **Töölaud**: Integratsioonid → Logide eksport. Lisa sihtkoht, käivita mandaatide kontrollimiseks
  ilma ridu kirjutamata **Test** ja seejärel luba sihtkoht.
- **Tööjärg**: iga sihtkoha kaart näitab ootel ridu ja kursorit; `GET
/api/log-export/status` tagastab samad arvud ning viimase 20 töö käivituse andmed.
- **Ühe sihtkoha nurjumine ei põhjusta teiste nurjumist** — käivituse kokkuvõte salvestab iga sihtkoha
  oleku väljadel `last_status` / `last_error` ning töö käivituste ajalugu säilitab koondtulemuse.
- **Sihtkoha kustutamine kustutab selle kursori.** Selle uuesti lisamisel alustatakse vanimast säilitatud
  kõnelogist, mistõttu saadetakse uuesti read, mis võivad sihtkohas juba olemas olla. BigQuery puhul
  kõrvaldab reapõhine `insertId` duplikaadid ainult BigQuery enda deduplikatsiooniakna piires,
  seega eelista sihtkoha kustutamisele selle keelamist.
