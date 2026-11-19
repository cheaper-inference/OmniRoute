# Log export (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuirani, inkrementalni izvoz evidencije poziva OmniRoute u vanjsko analitičko spremište.

Kartica Evidencija na kontrolnoj ploči čuva historiju zahtjeva u SQLite bazi (`call_logs`), koja je ograničena
rotacijom i periodom zadržavanja. Izvoz evidencije šalje isti skup zapisa prema rasporedu kako bi se mogli čuvati duže od
lokalne baze podataka i povezivati s drugim podacima. BigQuery je prvo odredište;
cjevovod je zasnovan na registru, pa se nova odredišta mogu dodavati.

---

## 1. Kako radi

```
server (dešifriranje + validacija konfiguracije, usklađivanje kursora)
  → pokretanje IPC-a → izolirani OS proces exportChild
    → storage.sqlite samo za čitanje → zajednički upit/mapiranje evidencije poziva
      → asinhrono učitavanje artefakata → odredište prepare()/send()
        → IPC za paket → server trajno pohranjuje kursor → IPC potvrda
          → sljedeći paket; IPC završetak → server bilježi uspjeh
```

- **Raspored** — jedan cron zadatak u `JobRegistry`, `log_export`, s podrazumijevanom vrijednošću `0 * * * *` (svakog sata,
  UTC). Registriran je u `src/lib/initCloudSync.ts`; može se zamijeniti pomoću `OMNIROUTE_LOG_EXPORT_CRON`.
  Svako pokretanje redom izvozi sve zapise za svako **omogućeno** odredište.
- **Kursor** — implicitni SQLite `call_logs.rowid`, trajno pohranjen za svako odredište u
  `log_export_destinations.cursor_row_id`. `timestamp` namjerno nije kursor: pozivaoci
  mogu dostaviti vlastitu vrijednost, pa spor zahtjev može biti zapisan nakon bržeg koji je započeo
  kasnije, a kursor zasnovan na vremenskoj oznaci bi ga preskočio.
- **Grupisanje u pakete** — `batch_size` redova po zahtjevu (podrazumijevano 500), `max_rows_per_run` redova po pokretanju
  (podrazumijevano 10000), tako da se velika količina zaostalih zapisa izveze kroz više pokretanja umjesto da blokira jedno.
- **Isporuka** — kursor napreduje tek nakon što se `send()` uspješno završi. Neuspjeli paket ostavlja
  kursor na prethodnom mjestu, pa se isti redovi ponovo pokušavaju poslati pri sljedećem pokretanju. Garancija je
  isporuka najmanje jednom uz deduplikaciju na strani odredišta, a ne stvarna isporuka tačno jednom: BigQuery koristi
  ID zapisa poziva kao ključ svakog reda, koji uvažava po principu najboljeg napora unutar vlastitog prozora deduplikacije.
- **Zaštita od preklapanja** — cron pokretanje i `POST .../run` mogu se aktivirati istovremeno. Odredište
  čiji je izvoz već u toku preskače se umjesto da se izvozi dvaput (`skipped: true` u rezultatu pokretanja),
  tako da istovremeno pokretanje ne može ponovo poslati paket niti pomjeriti kursor unazad.
- **Oporavak nakon potpunog brisanja** — ako `cursor_row_id` postane veći od `MAX(rowid)` (cijela tabela je
  obrisana i rowid vrijednosti su ponovo krenule od početka), izvršilac vraća kursor na 0 umjesto da trajno prestane prepoznavati zapise.

### Izolirani izvršilac i ograničenja

Svako pokretanje odredišta na Nodeu pokreće zaseban, kratkotrajan podređeni OS proces (`child_process`
s IPC-om, ne `worker_threads`). Čitanje tijela, parsiranje/serijalizacija JSON sadržaja,
`prepare()` odredišta i mrežni ulaz/izlaz odredišta izvršavaju se tamo, a ne u petlji događaja servera.
Samo konfiguracija i male poruke o napretku prolaze kroz IPC; izvezeni zapisi nikada se ne vraćaju
na server. Cron zadatak i ruta za trenutno pokretanje zadržavaju isti javni rezultat i zaštitu od preklapanja.

Podređeni proces otvara serversku razriješenu putanju `DATA_DIR/storage.sqlite` samo za čitanje pomoću `node:sqlite`,
uz `busy_timeout=5000` i `query_only=ON`. Ne uvozi singleton baze podataka i ne izvršava
migracije, sigurnosne kopije niti ažuriranja SQLite baze. Evidentiranje nedostajućih/oštećenih artefakata (uključujući
UPDATE za oštećeni artefakt) ostaje isključivo u putanji za detalje kontrolne ploče. Obje putanje dijele čisti
resolver detalja; izvoz koristi asinhrono čitanje datotečnog sistema i isti redoslijed razrješavanja: artefakt → naslijeđeni
ugrađeni sadržaj → naslijeđeni sadržaj na disku → ništa. Pokretanje bilježi najveći rowid umetnutih zapisa
kada podređeni proces otvori čitač; kasnija umetanja čekaju sljedeće pokretanje. Ovo je granica
umetanja, a ne dugotrajna SQLite transakcija: WAL upisi i kontrolne tačke ostaju slobodni tokom
mrežnih čekanja. Ova granica ne zamrzava ažuriranja/brisanja postojećih redova.

Nakon svakog prihvaćenog paketa, podređeni proces čeka potvrdu. Server prvo trajno pohranjuje
kursor pomoću `advanceLogExportCursor`, a zatim šalje `ack`; sljedeći paket ne počinje prije toga.
Neuspješno slanje, pad ili istek vremena bilježi neuspjeh bez pomjeranja kursora za taj paket. Prethodno
potvrđeni paketi ostaju trajno pohranjeni; najviše jedan nepotvrđeni paket može biti ponovo poslan.
Uspjeh se bilježi tek nakon `done` i urednog završetka podređenog procesa. Neuspjesi prekidaju podređeni proces
signalom SIGTERM, uz prelazak na SIGKILL nakon 500 ms, a izvršilac čeka zatvaranje procesa.

| Varijabla okruženja                           | Podrazumijevano | Svrha                                                            |
| --------------------------------------------- | --------------- | ---------------------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000          | Ograničenje ukupnog proteklog vremena po odredištu               |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024            | Ograničenje V8 prostora za stare objekte podređenog procesa u MB |

Nevažeće vrijednosti, vrijednosti koje nisu pozitivne ili nisu cijeli brojevi zamjenjuju se podrazumijevanim vrijednostima. Postavka hip memorije nije ograničenje ukupnog
RSS-a; veoma veliki paketi i dalje mogu iscrpiti memoriju podređenog procesa i sigurno prekinuti pokretanje neuspjehom.
Podrazumijevanih 1024 MB ostavlja rezervu za podrazumijevani paket od 500 redova s artefaktima od 512 KiB i
omogućenim tijelima, uključujući BigQuery serijalizaciju JSON-a u blokovima prema broju bajtova. To ne čini
paket od 10000 redova s tijelima sigurnim. Iscrpljivanje V8 hip memorije bilježi neuspjeh s uputom za rješavanje: smanjite veličinu
paketa ili povećajte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor ostaje na posljednjem
potvrđenom paketu. Historijska tijela ugrađena u zapis ili pohranjena na disku nisu obuhvaćena modernim ograničenjem artefakata.
Operateri moraju zasebno planirati RSS, naročito unutar kontejnera s ograničenom memorijom.

Podređeni proces nasljeđuje samo razriješeni `DATA_DIR`, `NODE_ENV`, eksplicitni `TZ` (razrješavanje
lokalnog vremena za naslijeđene nazive datoteka), `ELECTRON_RUN_AS_NODE` kada je prisutan i sljedeće ulazne postavke za odlazne veze:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (i njihove oblike malim slovima),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globalni Undici dispatcher dijeli sa serverom razrješavanje proxyja isključivo na osnovu okruženja i pravila
zaobilaženja lokalnih hostova, uključujući `NO_PROXY`; ne uvozi `proxyFetch.ts` niti njegove oznake baze podataka i funkcionalnosti.
Vjerodajnice proxyja uklanjaju se iz proslijeđenog izlaza i zabilježenih grešaka. Vjerodajnice odredišta
prenose se samo u jednoj početnoj IPC poruci, nikada putem argv ili okruženja; proslijeđeni izlaz i greške
dobijaju prefiks i pročišćavaju se. Samo je `ExperimentalWarning` onemogućen u argumentima za izvršavanje podređenog procesa kako bi se izbjeglo
ponavljanje Nodeovog upozorenja za SQLite pri svakom cron pokretanju; ostale vrste upozorenja ostaju vidljive.

Module odredišta mora biti moguće uvesti bez zavisnosti od Next.js-a ili zavisnosti namijenjenih samo serveru. Postojeća
implementacija za BigQuery već ispunjava taj uslov. Predmemorije pristupnih tokena traju samo tokom izvršavanja
podređenog procesa, ne i između izvršavanja. Node je podržano izvršno okruženje (engines u `package.json`), ali odjeljak README-a o instalaciji Buna
i `Dockerfile.bun` također navode put kompatibilnosti za produkciju koristeći
`bun:sqlite` (`src/lib/db/core.ts` / adapteri). Pod Bunom izvoz zato zadržava prethodni
način rada unutar procesa i ispisuje jednokratno upozorenje: izolacija memorijske gomile i vremenskog ograničenja podređenog procesa nije dostupna. Koristite
Node za izolaciju petlje događaja i situacija nedostatka memorije (OOM); Bun se ovdje ne smatra namijenjenim samo razvoju.

Kada je `includeBodies` omogućen, dajte prednost rasporedu u minutnim intervalima, kao što je
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, umjesto nagomilavanja podataka za izvoz tokom jednog sata.
Ograničenja paketa i redova i dalje ograničavaju svako izvršavanje. Trošak pokretanja procesa nastaje za svako odredište pri svakom izvršavanju;
time se mali trošak pokretanja mijenja za izolaciju serverske petlje događaja, a ne za smanjenje ukupne upotrebe CPU-a.

### Sadržaji podataka (upiti i generisani odgovori)

Prema zadanim postavkama, izvoz sadrži samo sažeta polja koja prikazuje **lista** zapisnika. Uključivanjem opcije
**Izvoz upita i odgovora** (`includeBodies`) dodatno se šalje ono što panel **detalja**
zapisnika prikazuje za svaki poziv:

| Polje                            | Šta sadrži                                                                |
| -------------------------------- | ------------------------------------------------------------------------- |
| `request_body` / `response_body` | Sadržaje poziva onako kako ih prikazuje kontrolna ploča                   |
| `pipeline_route_decision`        | Koje je odredište i model usmjerivač odabrao                              |
| `pipeline_client_request`        | Sirovi zahtjev tačno onako kako ga je klijent poslao                      |
| `pipeline_openai_request`        | Nakon pretvaranja u interni OpenAI format                                 |
| `pipeline_provider_request`      | Onako kako je stvarno poslano uzvodnom servisu, u formatu pružaoca usluge |
| `pipeline_provider_response`     | Sirovi odgovor uzvodnog servisa                                           |
| `pipeline_client_response`       | Ono što je vraćeno pozivaocu                                              |
| `pipeline_error`                 | Detalje greške na nivou obradnog toka za neuspjeli poziv                  |
| `bodies_truncated`               | Tačno kada je bilo koje prethodno polje dostiglo `maxBodyBytes`           |

Ovo je sadržaj upita, pa je **isključen prema zadanim postavkama** i namjerno se bira zasebno za svako odredište.
Šalje se ono što prikazuje kontrolna ploča, jer izvoz i `getCallLogById` dijele način
razrješavanja detalja: iz sadržaja su
već uklonjeni lični identifikacijski podaci i tajne prilikom zapisivanja, a poziv izvršen pomoću
API ključa `noLog` uopće ne pohranjuje sadržaj, pa se nema šta izvesti.

Sadržaji se čitaju za svaki red iz artefakta u datotečnom sistemu, pa se učitavanje punih podataka izvršava samo za odredišta
koja su to zatražila. Ako artefakt nedostaje ili je oštećen, izvozi se njegov sažetak s null sadržajima umjesto
da paket ne uspije i kursor ostane zaglavljen.

`maxBodyBytes` (zadano 262144) ograničava svako polje. Duži sadržaji se **skraćuju umjesto
da se odbace** — skraćeni upit i dalje odgovara na pitanje „šta je traženo“ — a red se označava sa
`bodies_truncated`. Promjene koje se prenose u toku, dio po dio, ne izvoze se; sastavljeni odgovor
već se nalazi u `pipeline_provider_response` i `pipeline_client_response`.

---

## 2. Datoteke

| Komponenta                              | Lokacija                                     |
| --------------------------------------- | -------------------------------------------- |
| Ugovor odredišta                        | `src/lib/logExport/types.ts`                 |
| Registar                                | `src/lib/logExport/registry.ts`              |
| Obrada tajni                            | `src/lib/logExport/secrets.ts`               |
| Izvršavač (IPC roditeljskog procesa)    | `src/lib/logExport/runner.ts`                |
| Životni ciklus procesa                  | `src/lib/logExport/childRunner.ts`           |
| Ulazna tačka podređenog procesa         | `src/lib/logExport/exportChild.ts`           |
| Otvaranje samo za čitanje               | `src/lib/db/logExportReadOnly.ts`            |
| Zajednički upit/mapiranje               | `src/lib/usage/callLogExportQueries.ts`      |
| Razrješavanje detalja                   | `src/lib/usage/callLogDetailResolver.ts`     |
| API projekcija                          | `src/lib/logExport/presenter.ts`             |
| BigQuery odredište                      | `src/lib/logExport/destinations/bigquery.ts` |
| Autentifikacija Google servisnog računa | `src/lib/logExport/googleServiceAccount.ts`  |
| Izvor evidencije poziva                 | `src/lib/usage/callLogExportSource.ts`       |
| Trajno pohranjivanje                    | `src/lib/db/logExportDestinations.ts`        |
| Cron zadatak                            | `src/lib/jobs/logExportJob.ts`               |
| REST sloj                               | `src/app/api/log-export/`                    |
| Stranica kontrolne ploče                | `src/app/(dashboard)/dashboard/log-export/`  |

Shema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Sve rute zahtijevaju upravljačku autentifikaciju (`requireManagementAuth`). Tajne se nikada ne vraćaju:
pohranjena tajna vraća se kao doslovna vrijednost `__stored__`, a slanje te vrijednosti prilikom ažuriranja
zadržava pohranjene pristupne podatke.

Kreiranje ili ažuriranje odredišta čiji tip deklarira tajnu **zahtijeva
`STORAGE_ENCRYPTION_KEY`**. Bez njega `encrypt()` neprimjetno propušta podatke bez izmjene, pa se upis
odbija statusom 400 umjesto da se pristupni podaci pohrane u SQLite kao obični tekst (istu zaštitu
primjenjuje Telegram webhook).

| Metoda   | Putanja                                  | Svrha                                                                  |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipovi odredišta + lista njihovih konfiguracijskih polja               |
| `GET`    | `/api/log-export/destinations`           | Lista odredišta (tajne skrivene)                                       |
| `POST`   | `/api/log-export/destinations`           | Kreiranje odredišta                                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | Čitanje jednog odredišta                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Ažuriranje naziva / omogućenosti / konfiguracije / grupiranja u pakete |
| `DELETE` | `/api/log-export/destinations/{id}`      | Brisanje                                                               |
| `POST`   | `/api/log-export/destinations/{id}/test` | Provjera pristupnih podataka, bez upisivanja                           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Trenutno pražnjenje reda, istim putem kao zakazano izvršavanje         |
| `GET`    | `/api/log-export/status`                 | Stanje crona, nedavna izvršavanja, zaostaci po odredištu               |

`GET /api/log-export/types` čini korisnički interfejs generičkim: obrazac na kontrolnoj ploči generira se iz
vraćenih opisa polja, pa novo odredište ne zahtijeva izmjenu korisničkog interfejsa.

---

## 4. BigQuery odredište

Konfiguracijski ključevi (`type: "bigquery"`):

| Ključ                | Napomene                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP projekat koji sadrži skup podataka                                                                           |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                  |
| `location`           | Koristi se samo kada skup podataka treba biti kreiran (zadano `EU`)                                              |
| `serviceAccountJson` | Ključ servisnog naloga. Tajna vrijednost: šifrovana u stanju mirovanja, nikada se ne vraća                       |
| `autoCreate`         | Kreira skup podataka/tabelu koji nedostaju; uslovno dodaje nullable kolone s dokazima o upotrebi (zadano `true`) |

Servisnom nalogu je potreban `bigquery.tables.updateData` za ciljnu tabelu, kao i
`bigquery.datasets.create` / `bigquery.tables.create` kada je `autoCreate` uključen.
Ažuriranje postojeće tabele radi dodavanja dva nullable polja s dokazima o upotrebi također zahtijeva
`bigquery.tables.update`. Nedostajuća dozvola prekida izvoz bez pomjeranja kursora.

Konfigurisana grupa je jedinica **kursora**, a ne HTTP-a: `send()` je dijeli na pozive insertAll
s najviše 500 redova, tako da veliki `batch_size` ne može prekoračiti BigQueryjevo ograničenje zahtjeva od 10 MB.
Privremeni statusi (408/429/500/502/503/504) ponavljaju se najviše tri puta uz eksponencijalno
odstupanje, uz ponovnu upotrebu istih insertId vrijednosti; greške autentifikacije i šeme izazivaju izuzetak pri prvom pokušaju
umjesto da potroše izvršavanje.

Tabela kreirana prije nekoliko trenutaka još nije vidljiva streaming krajnjoj tački, koja odgovara
statusom 404 nekoliko sekundi. Taj 404 se ponavlja, ali **samo kada je ova tabela kreirana u okviru ovog izvršavanja** —
tabela koja zaista nedostaje i dalje odmah izaziva neuspjeh. Imajte na umu da ponovno kreiranje tabele pod
nazivom koji je nedavno obrisan dovodi do toga da BigQuery odbija streaming umetanja nekoliko minuta;
to je svojstvo postupka brisanja pa ponovnog kreiranja, zato je bolje koristiti novi naziv tabele nego obrisati i ponovo dodati postojeću.

**Djelimični neuspjeh stiže kao HTTP 200 s nepraznim `insertErrors[]`.** To se tretira kao
neuspjeh i izaziva izuzetak, čime se zaustavlja pomjeranje kursora iznad redova koje BigQuery nikada nije prihvatio;
`tests/unit/log-export-bigquery.test.ts` potvrđuje ovo ponašanje.

Transport je obični REST — samopotpisana RS256 tvrdnja razmjenjuje se za pristupni token na
`https://oauth2.googleapis.com/token`, a zatim se redovi šalju u `tabledata.insertAll`. Ne uključuje se nijedan Google SDK.
Pristupni tokeni keširaju se u okviru procesa po kombinaciji (servisni nalog, opseg).

Kreirana tabela sadrži po jednu kolonu za svako polje kartice Logs, kao i `exported_at`, a raspoređena je prema
načinu na koji se dnevnici poziva stvarno upituju:

- **Particionisana po danima na osnovu `timestamp`**, tako da upit ograničen datumom skenira samo te dane.
- **Klasterizovana prema `api_key_name`, `provider`, `model`, `status`** (tim redoslijedom), tako da filtriranje prema
  tome ko ju je pokrenuo, kamo je zahtjev upućen ili da li nije uspio izbacuje blokove unutar svake particije. BigQuery
  dozvoljava najviše četiri kolone za klasterizaciju, a redoslijed je bitan: filter samo na `api_key_name` uklanja blokove,
  dok ih filter samo na `status` ne uklanja.
- **Opcionalno zadržavanje particija** putem `partitionExpirationDays` (0 zadržava sve), primijenjeno
  prilikom kreiranja tabele.

Obje postavke primjenjuju se prilikom kreiranja. Postojeća tabela zadržava raspored koji već ima, zato
usmjerite odredište na novi ID tabele ako ih želite primijeniti.

`tests/unit/log-export-bigquery.test.ts` potvrđuje da mapper i šema tabele ostaju
usklađeni, tako da nova kolona dnevnika poziva ne može neprimjetno biti izostavljena pri slanju.

Grupe se dijele prema **broju redova i serijalizovanim bajtovima**. Sam broj redova nije dovoljan
kada se izvoze sadržaji: 500 redova koji sadrže upite mogu zauzimati desetine megabajta, a insertAll
odbija zahtjev veći od 10 MB. Grupe se zatvaraju na 500 redova ili 9 MB, šta god nastupi prvo.

---

## 5. Odredište za OTLP/HTTP tragove

Konfiguracija koristi `type: "otlp-http"`. Ovo je zakazani izvoz sa podrškom za kursor
pohranjenih dnevnika poziva, a ne sink za usmjeravanje događaja uživo uz najbolji napor u
`open-sse/services/routing/otel.ts`. Ne čita niti mijenja varijable okruženja, tajmere ili
baferе tog sinka. Omogućavanje oba može proizvesti dvije nezavisne vrste spanova;
koristite instrumentacioni opseg `omniroute.log-export` da biste razlikovali ove spanove
dnevnika poziva.

| Ključ                    | Podrazumijevano / svrha                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `endpoint`               | Obavezni puni URL za HTTP(S) tragove; sufiks `/v1/traces` se ne dodaje                       |
| `headers`                | Opcionalne linije `Name: value` ili JSON objekat stringova; šifrovano                        |
| `requestHeaderAllowlist` | Prazno (isključeno); nazivi/prefiksi zaglavlja klijenta koji se hvataju kao atributi spanova |
| `serviceName`            | `omniroute`; resurs `service.name`                                                           |
| `langfuseMapping`        | `false`; dodaje Langfuse atribute generacije/sesije/korisnika                                |
| `identity`               | `pseudonymous`, `keyName` ili `none`                                                         |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                      |
| `timeoutMs`              | `30000` po HTTP pokušaju                                                                     |
| `environment`            | Nije postavljeno; opcionalni `langfuse.environment`                                          |

Generička kontrolna tabla prikazuje ova polja. `paths` prihvata API niz ili tekstualno
polje sa tačnim putanjama razdvojenim novim redovima/zarezima. Embeddings, rerank i druge
putanje se preskaču osim ako nisu izričito dozvoljene. Preskočeni redovi i dalje pomjeraju
kursor; brojači `exported`/`exportedTotal` postojećeg pokretača računaju obrađene izvorne
redove, uključujući filtrirane redove, a ne prihvaćene spanove. Filtriranje se obavlja u
podređenom procesu, bez mijenjanja njegovog IPC/ugovora za kursor.

Validacija URL-a koristi pomoćnu funkciju bez baze podataka
`parseAndValidateNonMetadataUrl` iz `src/shared/network/outboundUrlGuard.ts`: pravilo
`block-metadata`. Ima iste bezuslovne provjere metapodataka/protokola/ugrađenih vjerodajnica
kao validator webhooka, uz dozvoljene privatne URL-ove, ali namjerno dozvoljava localhost/LAN
odredišta bez globalnog nadjačavanja zastavice funkcije. Ovo omogućava krajnje tačke za
samostalno hostovane Langfuse, Phoenix, Tempo i Collector instance, uključujući privatne
HTTP krajnje tačke. Hostovi cloud metapodataka su uvijek blokirani.
Preusmjeravanja se ne prate, tako da kolektor ne može preusmjeriti vjerodajnice na drugi
host. Kao i postojeća leksička zaštita URL-ova, ovo ne zaključava DNS rezoluciju; konfigurišite
samo hostove kojima upravlja operater. Dajte prednost HTTPS-u kada krajnja tačka nije na
pouzdanoj mreži.

### Sadržaj i isporuka

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) prenosi jedan
CLIENT span po dozvoljenom redu, nazvan njegovom tačnom putanjom zahtjeva. Imenovanje
putanje razlikuje Chat Completions, Responses i Messages bez ugrađivanja podataka o modelu
ili identitetu u naziv spana. Atributi resursa uključuju `service.name` i `service.version`
paketa.

Uobičajeni zapisivač pokušaja razgovora (`open-sse/handlers/chatCore/attemptLogging.ts`) upisuje
`duration = Date.now() - startTime` pri završetku i ne obezbjeđuje vremensku oznaku;
`saveCallLogOperation` u `src/lib/usage/callLogs.ts` podrazumijevano postavlja vremensku oznaku
na vrijeme upisa (završetka). Izvoz zato postavlja kraj = vremenska oznaka reda, a početak =
kraj − trajanje (u milisekundama, pretvoreno u decimalne nanosekunde). Vremenske oznake koje
je pozivalac obezbijedio iz prošlosti takođe se čuvaju kao vrijeme završetka; ne postoji
razlikovanje početka/završetka po redu. Null trajanje postaje nula. Nevažeće/nedostajuće
vremenske oznake dovode do neuspjeha grupe umjesto stvaranja nedeterminističkih spanova.
`ttftMs` može biti null i mapira se na `omniroute.ttft_ms`.

Atributi uključuju `gen_ai.operation.name="chat"`, provajdera, zatraženi/model odgovora,
ulazne/izlazne tokene, opcionalne tokene za čitanje keša/stvaranje keša/rezonovanje, HTTP
status, kombinaciju, izvor keša, oznaku sesije i ID korelacije. Cjelobrojne OTLP vrijednosti
i vremenske oznake su decimalni stringovi; stringovi, logičke vrijednosti i razlomljeni
brojevi koriste svoje izvorne OTLP varijante vrijednosti. Spanovi grešaka imaju status
ERROR i sanitizovanu statusnu poruku. Kanonski zapis nema URL hosta uzvodnog sistema, pa se
`server.address` izostavlja umjesto da se kolektor netačno identifikuje kao server modela.
Trošak se ne izvozi.

Samo `includeBodies=true` učitava sadržaj. Kada je `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` sadrže sanitizovani JSON tijela
zahtjeva/odgovora kako ga je pohranio OmniRoute (kanonizovan kada ga je moguće parsirati),
a ne preoblikovani niz poruka semconv. Skraćena/ne-JSON tijela ostaju neobrađeni tekst.
Kada je `langfuseMapping=true`, tijela se emituju samo kao
`langfuse.observation.input` / `langfuse.observation.output`; atributi
`gen_ai.*.messages` se izostavljaju kako bi svako tijelo bilo poslano jednom. Oba načina
nasljeđuju `maxBodyBytes` iz postojeće putanje učitavanja;
`omniroute.bodies_truncated=true` označava skraćivanje.
Ovo odredište ne dodaje dodatne snimke cjevovoda niti čitanja nesanitizovanih artefakata;
opcionalno hvatanje zaglavlja zahtjeva koristi postojeći učitani snimak klijenta opisan u
nastavku. Koristite učestalost na nivou minuta, kao što je
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, kada izvozite tijela, umjesto gomilanja
satnog zaostatka.

### Opcionalna zaglavlja zahtjeva klijenta

Hvatanje zaglavlja je **podrazumijevano isključeno**. Postavite `requestHeaderAllowlist` u konfiguraciji odredišta
i omogućite **Izvoz upita i odgovora** (`includeBodies: true` na odredištu).
Lista dozvoljenih vrijednosti prihvata API niz ili tekstualno polje sa nazivima razdvojenim
novim redovima/zarezima:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Imena se podudaraju bez obzira na velika i mala slova i potpuno, osim kada jedan završni `*` odabire neprazni prefiks naziva zaglavlja. Samostalni `*`, ugrađeni zamjenski znakovi i nevažeći HTTP nazivi zaglavlja odbacuju se.
Postoji najviše 64 selektora, a svaki ima naziv/prefiks od najviše 256 ASCII bajtova.
Ova postavka je odvojena od `headers`, koji autentifikuje izvoznik prema kolektoru.

Hvatanje čita samo `pipeline_client_request`, popunjen iz sačuvanog detaljnog pipeline-a putem
`clientRawRequest` (ili naslijeđenog `clientRequest`). Nikada se ne vraća na zaglavlja zahtjeva provajdera.
Detaljno evidentiranje pipeline-a moralo je biti omogućeno u trenutku zapisivanja zahtjeva. Kada je
`includeBodies` onemogućen ili kada nedostaje, oštećen je ili skraćen JSON snimka klijenta, atributi zaglavlja se ne emituju. Povećanje vrijednosti `maxBodyBytes` može spriječiti skraćivanje snimka pri izvozu;
ne može vratiti detalje koji nikada nisu sačuvani. Snimak veći od 1 MiB ili onaj koji sadrži više od
256 unosa zaglavlja ignoriše se. Postojeći izvoz prompta/odgovora ostaje omogućen uz hvatanje
zaglavlja; lista dozvoljenih ne pruža režim hidratacije samo za zaglavlja.

Odabrane vrijednosti postaju OTLP nizovi stringova `http.request.header.<full lowercase header name>`,
čak i kada postoji samo jedan string. Na primjer, `X-OmniRoute-Meta-Team: example-team` postaje
`http.request.header.x-omniroute-meta-team` sa
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Cijeli prefiks se zadržava: ovo su obična zaglavlja, bez parsiranja poslovnih polja ili pretvaranja u
`omniroute.metadata.*` / Langfuse metapodatke. `langfuseMapping` ne mijenja semantiku zaglavlja. Odabrano zaglavlje `User-Agent` s jednom vrijednošću takođe postavlja standardni skalarni atribut
`user_agent.original`. Zarezi unutar jedne vrijednosti ne razdvajaju se. Varijante velikih i malih slova spajaju se redoslijedom sačuvanih unosa; svaka nevažeća varijanta izostavlja cijelo zaglavlje. Atributi su poredani prema nazivu napisanim malim slovima.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, zaglavlja API ključeva, nazivi koji sadrže
oznake auth/token/secret/password/credential i interni pristupni podaci gatewaya uvijek se izuzimaju, čak i ako su odabrani ili djelimično maskirani u memoriji. Poznati obrasci pristupnih podataka ponovo koriste zajednički detektor pristupnih podataka; oznake redakcije se izostavljaju, a ne izvoze kao sigurne vrijednosti.
Prihvataju se samo stringovi i neprazni nizovi stringova; brojevi i objekti se ne pretvaraju automatski.
Nevažeći nazivi, prototipski ključevi, kontrolni znakovi (osim horizontalne tabulacije) i neispravan Unicode ignorišu se bez neuspjeha serije ili odražavanja njihovog sadržaja u greškama.

Svaki span obuhvata najviše 32 zaglavlja, 16 vrijednosti po zaglavlju, 4096 UTF-8 bajtova po vrijednosti i ukupno 16384 UTF-8 bajtova kroz uhvaćene nazive i vrijednosti zaglavlja. Prevelika/nevažeća zaglavlja izostavljaju se u cijelosti, a ne skraćuju. Odabir je odluka operatora o privatnosti: nazivi koji izgledaju bezopasno i dalje mogu sadržavati lične podatke, a ova ograničenja i detektori nisu opšti alat za uklanjanje PII-ja.

### Ograničenja isporuke

Zahtjevi su ograničeni na 500 spanova i 4 MiB UTF-8 JSON-a, uključujući omotač.
Veličina svakog dozvoljenog spana provjerava se prije prvog zahtjeva serije kursora. Pojedinačni
span veći od ograničenja ne šalje nijedan dio te serije i ne uspijeva uz uputstvo da se smanji
`maxBodyBytes`; ne odbacuje se nečujno. Predprovjera zadržava samo reference zapisa i broj bajtova,
odbacujući svaki privremeni span/JSON; spanovi se ponovo izgrađuju za ograničene dijelove umjesto
da se zadržava druga serijalizovana kopija serije. HTTP 408/429/5xx, mrežne greške i prekoračenja vremena dobijaju najviše
tri pokušaja, uz eksponencijalno čekanje od 250/500 ms. `Retry-After` u sekundama ili HTTP datumi
mogu produžiti čekanje do 5 sekundi. Ostali statusi odmah uzrokuju neuspjeh. Djelimično odbijanje OTLP-a
sa statusom 2xx takođe uzrokuje grešku umjesto potvrđivanja izgubljenog spana; prazne ili važeće JSON potvrde prihvataju se, uz
ograničenje čitanja odgovora od 64 KiB.

Greške sadrže samo činjenice kojima upravlja izvoznik: HTTP status, klasu ponovnog pokušaja, broj pokušaja i broj poslatih spanova ili fiksni tekst o neuspjehu potvrde/mreže. Tijela odgovora kolektora,
brojevi djelimično uspješnih obrada i zaglavlja odgovora nikada se ne kopiraju u greške, dnevnike ili kontrolnu tablu. Neuspješna ili djelimično prihvaćena serija se ne potvrđuje: odredište prikazuje
Failing sa tim statusom, kursor ostaje na posljednjoj potvrđenoj seriji, a sljedeće pokretanje
ponovo šalje iste redove. Trajni statusi nastavljaju uzrokovati neuspjeh dok se kolektor ili konfiguracija
ne poprave. Za detalje odgovora koristite vlastite dnevnike kolektora. Sažeci grešaka u dnevniku poziva zadržavaju
svoju zasebnu redakciju.
`prepare()` ne obezbjeđuje ništa; Test objavljuje tačno `{"resourceSpans":[]}` i prijavljuje
HTTP status bez upisivanja spanova dnevnika poziva.

ID-ovi tragova i ID-ovi spanova su prvih 32/16 heksadecimalnih cifara SHA-256 vrijednosti nad
`"omniroute.trace\\0" + callLogId` i `"omniroute.span\\0" + callLogId`. Ponovna slanja imaju
identične ID-ove. Ovo nije garancija uklanjanja duplikata: neki sistemi za pozadinsku obradu, uključujući Langfuse
v4 ingestion, ne uklanjaju duplikate spanova sa istim ID-om. Pad sistema ili neuspjeh djelimičnog dijela može
ponovo poslati najviše jednu nepotvrđenu seriju kursora; cijela ta serija može biti duplirana,
a ne samo njen posljednji HTTP dio. Veličinu serije kursora odaberite imajući u vidu ovaj kompromis.

### Langfuse primjer

Konfigurišite ova polja za samostalno hostovanu instancu Langfusea:

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

Lokalno izgradite vrijednost Authorization kao Base64 literalnog stringa `public-key:secret-key`
(na primjer pomoću `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Ne unosite stvarne pristupne podatke u dnevnike, snimke ekrana ili prijave problema. Mapiranje automatski
postavlja `x-langfuse-ingestion-version: 4`; Authorization se i dalje navodi u `headers`.
I zaglavlja i generisana sol identiteta koriste postojeći mehanizam šifrovanih tajnih polja i API rezervirana mjesta; potreban je `STORAGE_ENCRYPTION_KEY`.

Mapiranje dodaje tip/model generisanja, detalje o korištenju JSON-a (ulaz/izlaz/ukupno i dostupni
ključevi keša), snimke JSON ulaza/izlaza, nivo ERROR/DEFAULT, sanitiziranu poruku statusa,
naziv traga, ID sesije, opcionalno okruženje i filtrabilne
`langfuse.observation.metadata.<key>` vrijednosti za pružaoca, traženi model, putanju, kombinaciju, izvor
keša i status. `langfuse.observation.completion_start_time` je u formatu ISO 8601 i postavlja se na
vrijeme početka + TTFT samo kada je TTFT poznat i unutar trajanja. Atributi troška se ne šalju.

Načini identiteta primjenjuju se na `langfuse.user.id`:

- `pseudonymous` (zadano): HMAC-SHA256 internog ID-a API ključa sa nasumičnim solima od 32 bajta
  za svako odredište. Sól se generiše pri kreiranju ako ne postoji, šifrira kao
  `identitySalt`, nikada se ne vraća i zadržava se tokom izmjena. Sirovi ID-ovi ključeva nikada se ne
  stavljaju u atribute raspona. Ponovno kreiranje ili rotiranje soli odredišta mijenja identitete.
- `keyName`: konfigurisani naziv API ključa, čime se namjerno otkriva ta oznaka operatora.
- `none`: bez korisničkog ID-a. Oznake sesije se i dalje izvoze kada postoje; ovi načini ne
  anonimiziraju proizvoljni sadržaj upita niti oznake sesije/korespondencije koje je naveo operator.

### Pokretanje bez naknadnog popunjavanja

Samo pri kreiranju omogućite **Pokreni s trenutne pozicije (preskoči postojeće zapisnike)** ili proslijedite
`startFromCurrentPosition: true` na najvišem nivou korisnog sadržaja zahtjeva API-ja za kreiranje. Time se
`cursor_row_id` inicijalizuje na trenutni maksimalni zadržani rowid dnevnika poziva koristeći postojeće
pomoćnike kursora, bez migracije. Zadana vrijednost je false (kursor 0 i naknadno popunjavanje
zadržane historije). Ovo nije postavka za resetovanje kursora prilikom ažuriranja.

Zajedničko dodavanje `ttftMs` takođe dodaje nullable kolonu `ttft_ms` u BigQuery mapiranje
i shemu nove tabele: test sheme zahtijeva da svako kanonsko polje zapisa ima kolonu. Postojeće tabele nastavljaju
izvoziti nepromijenjene podatke: `prepare()` čita shemu tabele i izostavlja samo `ttft_ms` kada ta kolona ne postoji. Dodajte nullable kolonu INT64 da biste dobili TTFT
pri sljedećem pokretanju ili koristite novu tabelu. Opcionalna kolona TTFT ne pokreće ažuriranje sheme. Kolone s dokazima o korištenju
slijede uslovni tok kompatibilnosti uz eksplicitno uključivanje u nastavku; ostala polja redova zadržavaju strogu
provjeru sheme.

---

## 6. Dodavanje odredišta

1. Kreirajte `src/lib/logExport/destinations/<name>.ts` koji izvozi `LogExportDestinationType`:
   Zod `configSchema`, niz deskriptora `fields` za korisničko sučelje, `secretFields` i
   `createClient(config)` koji vraća `test()` / `prepare()` / `send(records)`.
2. Dodajte ga u niz `DESTINATIONS` u `src/lib/logExport/registry.ts`.
3. Napišite testove u `tests/unit/`.

To je cijela izmjena: trajna pohrana, cron zadatak, REST sloj, šifriranje tajnih podataka i
obrazac na kontrolnoj ploči svi čitaju registar.

Dva pravila za novo odredište:

- `send()` **mora baciti izuzetak** pri djelimičnom neuspjehu. Uspješno izvršavanje znači „odredište ima ove redove“,
  a kursor se trajno pomjera iza njih.
- Odredište koje prihvata URL koji je unio korisnik mora ga provjeriti putem
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) prije slanja zahtjeva,
  na isti način kao i webhookovi. BigQuery to ne treba: njegovi hostovi su konstante.

---

## 7. Korištenje

- **Kontrolna ploča**: Integracije → Izvoz dnevnika. Dodajte odredište, pokrenite **Testiraj** da provjerite vjerodajnice
  bez upisivanja redova, a zatim ga omogućite.
- **Zaostatak**: kartica svakog odredišta prikazuje redove na čekanju i kursor; `GET
/api/log-export/status` vraća iste vrijednosti, uz posljednjih 20 pokretanja poslova.
- **Odredište koje ne uspije ne obara ostala odredišta** — sažetak pokretanja bilježi status po odredištu
  u `last_status` / `last_error`, a historija pokretanja poslova čuva zbirni rezultat.
- **Brisanjem odredišta briše se njegov kursor.** Ponovno dodavanje počinje od najstarijeg zadržanog
  dnevničkog poziva, što ponovo šalje redove koje odredište možda već sadrži. U BigQueryju `insertId` po redu
  sprečava duplikate samo unutar BigQueryjevog vlastitog vremenskog prozora za uklanjanje duplikata, zato je bolje
  onemogućiti odredište nego ga brisati.

### Kompatibilnost sheme dokaza o korištenju

Nove BigQuery tabele uključuju nullable `usage_evidence` (STRING koji sadrži JSON) i
`usage_estimated` (BOOL). Kada je `autoCreate` omogućen, postojeća tabela može primiti
samo ove nedostajuće nullable kolone. Izvoznik čuva punu postojeću shemu, uključujući metapodatke polja,
i šalje uslovni PATCH koristeći vraćeni etag. Istovremena promjena sheme neuspješno završava izvoz umjesto da je prepiše;
sljedeće pokretanje ponovo čita tabelu.

Kada je `autoCreate` onemogućen, sami dodajte ove kolone prije izvoza zapisa
s dokazima o korištenju. Nedostajući metapodaci sheme/etaga ili neuspješno ažuriranje takođe sprečavaju umetanja koja sadrže dokaze. Kursor izvoza
ne napreduje pri tom neuspjehu i dokazi se nikad ne odbacuju nečujno. Lokalno zadržavanje dnevnika i dalje se primjenjuje dok je izvoz blokiran, zato riješite neuspjeh prije nego što zadržani izvorni redovi isteknu.
