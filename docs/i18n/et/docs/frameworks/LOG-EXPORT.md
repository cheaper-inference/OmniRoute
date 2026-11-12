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
`"omniroute.trace\0" + callLogId` ja `"omniroute.span\0" + callLogId` SHA-256 räsi esimesed 32/16 kuueteistkümnendnumbrit. Kordussaatmised kannavad
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

## 7. Kasutamine

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
