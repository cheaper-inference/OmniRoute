# Log export (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuirani, inkrementalni izvoz zapisnika poziva OmniRoute u vanjsko analitičko spremište.

Kartica Zapisnici na nadzornoj ploči čuva povijest zahtjeva u SQLiteu (`call_logs`), ograničenu
rotacijom i pravilima zadržavanja. Izvoz zapisnika prema rasporedu šalje isti skup zapisa kako bi se mogao čuvati dulje od
lokalne baze podataka i povezivati s drugim podacima. BigQuery je prvo odredište;
cjevovod se temelji na registru, pa se nova odredišta mogu dodavati.

---

## 1. Kako funkcionira

```
poslužitelj (dešifriranje + provjera konfiguracije, usklađivanje kursora)
  → pokretanje IPC-a → izolirani OS proces exportChild
    → storage.sqlite samo za čitanje → zajednički upit/mapiranje zapisnika poziva
      → asinkrono učitavanje artefakata → odredišni prepare()/send()
        → IPC za paket → poslužitelj trajno sprema kursor → IPC potvrda
          → sljedeći paket; IPC završetka → poslužitelj bilježi uspjeh
```

- **Raspored** — jedan cron zadatak u registru `JobRegistry`, `log_export`, sa zadanom vrijednošću `0 * * * *` (svakog sata,
  UTC). Registriran je u `src/lib/initCloudSync.ts`; može se nadjačati varijablom `OMNIROUTE_LOG_EXPORT_CRON`.
  Pri svakom pokretanju redom obrađuje sve zapise za svako **omogućeno** odredište.
- **Kursor** — implicitni SQLiteov `call_logs.rowid`, trajno spremljen za svako odredište u
  `log_export_destinations.cursor_row_id`. `timestamp` namjerno nije kursor: pozivatelji
  mogu navesti vlastitu vrijednost, pa se spor zahtjev može zapisati nakon bržeg koji je započeo
  kasnije, a kursor temeljen na vremenskoj oznaci preskočio bi ga.
- **Paketna obrada** — `batch_size` redaka po zahtjevu (zadano 500), `max_rows_per_run` redaka po pokretanju
  (zadano 10000), tako da se velik zaostatak obradi tijekom više pokretanja umjesto da blokira jedno.
- **Isporuka** — kursor se pomiče tek nakon što se `send()` uspješno dovrši. Neuspjeli paket ostavlja
  kursor na istom mjestu, pa se slanje istih redaka ponovno pokušava pri sljedećem pokretanju. Jamči se
  isporuka najmanje jednom uz uklanjanje duplikata na odredištu, a ne istinska isporuka točno jednom: BigQuery svakom
  retku dodjeljuje ključ prema ID-u zapisa poziva, koji uvažava prema načelu najboljeg napora unutar vlastitog vremenskog prozora za uklanjanje duplikata.
- **Zaštita od preklapanja** — cron pokretanje i `POST .../run` mogu se aktivirati istodobno. Odredište
  čija je obrada već u tijeku preskače se umjesto da se obrađuje dvaput (`skipped: true` u rezultatu pokretanja),
  pa istodobno pokretanje ne može ponovno poslati paket niti pomaknuti kursor unatrag.
- **Oporavak nakon potpunog brisanja** — ako `cursor_row_id` postane veći od `MAX(rowid)` (cijela je tablica
  obrisana i vrijednosti rowid ponovno počinju od početka), izvršitelj vraća kursor na 0 umjesto da trajno prestane prepoznavati nove zapise.

### Izolirani izvršitelj i ograničenja

Svako pokretanje izvoza za odredište u Nodeu pokreće zaseban, kratkotrajan podređeni proces OS-a (`child_process`
s IPC-om, a ne `worker_threads`). Čitanje tijela, parsiranje/serijalizacija JSON sadržaja, odredišni
`prepare()` i mrežne ulazno-izlazne operacije odredišta izvršavaju se ondje, a ne u petlji događaja poslužitelja.
Preko IPC-a prenose se samo konfiguracija i male poruke o napretku; izvezeni zapisi nikad se ne vraćaju
na poslužitelj. Cron zadatak i ruta Pokreni sada zadržavaju isti javni rezultat i zaštitu od preklapanja.

Podređeni proces otvara poslužiteljevu razriješenu putanju `DATA_DIR/storage.sqlite` samo za čitanje pomoću `node:sqlite`,
uz `busy_timeout=5000` i `query_only=ON`. Ne uvozi jedinstvenu instancu baze podataka i ne provodi
migracije, sigurnosno kopiranje ni ažuriranja SQLitea. Evidentiranje nedostajućih/oštećenih artefakata (uključujući
UPDATE za oštećeni artefakt) ostaje isključivo u obradi detaljnog prikaza nadzorne ploče. Oba načina obrade dijele čisti
razrješivač detalja; izvoz koristi asinkrona čitanja datotečnog sustava i isti redoslijed razrješavanja: artefakt → naslijeđeni
ugrađeni podaci → naslijeđeni podaci na disku → ništa. Pokretanje bilježi najveći rowid umetanja
kada podređeni proces otvori čitač; kasnija umetanja čekaju sljedeće pokretanje. To je granica
umetanja, a ne dugotrajna SQLite transakcija: WAL zapisivači i kontrolne točke ostaju neometani tijekom
čekanja na mrežu. Ta granica ne zamrzava ažuriranja/brisanja postojećih redaka.

Nakon svakog prihvaćenog paketa podređeni proces čeka potvrdu. Poslužitelj najprije trajno sprema
kursor pomoću `advanceLogExportCursor`, a zatim šalje `ack`; sljedeći paket ne započinje prije toga.
Neuspjelo slanje, rušenje ili istek vremena bilježi se kao neuspjeh bez pomicanja kursora za taj paket. Prethodno
potvrđeni paketi ostaju trajno zabilježeni; ponovno se može poslati najviše jedan nepotvrđeni paket.
Uspjeh se bilježi tek nakon `done` i urednog izlaska podređenog procesa. U slučaju neuspjeha podređeni se proces prekida
signalom SIGTERM, a nakon 500 ms prelazi se na SIGKILL; izvršitelj čeka završetak procesa.

| Varijabla okruženja                           | Zadano | Svrha                                                            |
| --------------------------------------------- | ------ | ---------------------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Ograničenje ukupnog trajanja po odredištu                        |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Ograničenje V8 prostora za stare objekte podređenog procesa u MB |

Za nevaljane vrijednosti, vrijednosti koje nisu pozitivne ili nisu cijeli brojevi upotrebljavaju se zadane vrijednosti. Postavka memorijske hrpe nije ograničenje ukupnog
RSS-a; vrlo veliki paketi i dalje mogu iscrpiti memoriju podređenog procesa i sigurno prekinuti pokretanje uz neuspjeh.
Zadana vrijednost od 1024 MB ostavlja memorijsku rezervu za zadani paket od 500 redaka s artefaktima veličine 512 KiB i
uključenim tijelima, uključujući BigQueryjevu serijalizaciju JSON-a u blokovima određenima brojem bajtova. Ona ne čini
paket od 10000 redaka s tijelima sigurnim. Iscrpljivanje V8 memorijske hrpe bilježi neuspjeh s uputom za postupanje: smanjite veličinu
paketa ili povećajte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor ostaje na posljednjem
potvrđenom paketu. Povijesna tijela ugrađena u zapise ili spremljena na disk nisu obuhvaćena suvremenim ograničenjem veličine artefakata.
Operateri moraju zasebno planirati RSS, osobito unutar spremnika s ograničenom memorijom.

Podređeni proces nasljeđuje samo razriješeni `DATA_DIR`, `NODE_ENV`, izričito postavljeni `TZ` (razrješavanje
lokalnog vremena za naslijeđene nazive datoteka), `ELECTRON_RUN_AS_NODE` ako postoji te sljedeće ulazne postavke za odlazne veze:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (i njihove oblike malim slovima),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globalni Undici dispatcher dijeli s poslužiteljem razrješavanje proxyja isključivo iz varijabli okruženja i pravila
zaobilaženja za lokalne hostove, uključujući `NO_PROXY`; ne uvozi `proxyFetch.ts` ni njegove zastavice baze podataka ili značajki.
Vjerodajnice proxyja uklanjaju se iz proslijeđenog izlaza i zabilježenih pogrešaka. Vjerodajnice odredišta
prenose se samo u jednoj početnoj IPC poruci, nikad putem argumenata argv ili okruženja; proslijeđenom izlazu i pogreškama
dodaje se prefiks te se iz njih uklanjaju osjetljivi podaci. U argumentima za izvršavanje podređenog procesa onemogućen je samo `ExperimentalWarning` kako bi se izbjeglo
ponavljanje Nodeova upozorenja za SQLite pri svakom pokretanju crona; ostale vrste upozorenja ostaju vidljive.

Module odredišta mora biti moguće uvesti bez ovisnosti o Next.js-u ili ovisnosti namijenjenih samo poslužitelju. Postojeća
implementacija za BigQuery već ispunjava taj uvjet. Predmemorije pristupnih tokena traju samo tijekom jednog pokretanja
podređenog procesa, a ne između pokretanja. Node je podržano izvršno okruženje (`package.json` engines), ali odjeljak README-a o
instalaciji Buna i `Dockerfile.bun` također navode kompatibilan način rada u produkciji uz
`bun:sqlite` (`src/lib/db/core.ts` / adapteri). Stoga izvoz pod Bunom zadržava prethodni
način izvođenja unutar procesa i ispisuje jednokratno upozorenje: izolacija memorijske hrpe i vremenskog ograničenja podređenog procesa nije dostupna. Upotrebljavajte
Node za izolaciju petlje događaja i pogrešaka zbog nedostatka memorije; Bun se ovdje ne smatra okruženjem samo za razvoj.

Kad je `includeBodies` omogućen, dajte prednost učestalosti na razini minuta, primjerice
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, umjesto gomilanja neizvezenog sadržaja tijekom jednog sata.
Ograničenja serije i broja redaka i dalje ograničavaju svako pokretanje. Trošak pokretanja procesa nastaje za svako odredište pri svakom pokretanju;
time se mali trošak pokretanja mijenja za izolaciju petlje događaja poslužitelja, a ne za smanjenje ukupne upotrebe procesora.

### Sadržaji (upiti i odgovori)

Prema zadanim postavkama izvoz sadrži samo sažetna polja koja prikazuje **popis** zapisnika. Uključivanjem opcije
**Izvezi upite i odgovore** (`includeBodies`) dodatno se šalje ono što okno s **pojedinostima**
zapisnika prikazuje za svaki poziv:

| Polje                            | Što sadrži                                                           |
| -------------------------------- | -------------------------------------------------------------------- |
| `request_body` / `response_body` | Sadržaje poziva kako ih prikazuje nadzorna ploča                     |
| `pipeline_route_decision`        | Koje je odredište i model usmjerivač odabrao                         |
| `pipeline_client_request`        | Izvorni zahtjev točno onako kako ga je klijent poslao                |
| `pipeline_openai_request`        | Nakon pretvorbe u interni OpenAI format                              |
| `pipeline_provider_request`      | Kako je doista poslano pružatelju, u njegovu formatu                 |
| `pipeline_provider_response`     | Izvorni odgovor pružatelja                                           |
| `pipeline_client_response`       | Što je vraćeno pozivatelju                                           |
| `pipeline_error`                 | Pojedinosti pogreške u lancu obrade za neuspjeli poziv               |
| `bodies_truncated`               | Vrijednost true kad bilo koje prethodno polje dosegne `maxBodyBytes` |

To je sadržaj upita, pa je **prema zadanim postavkama isključen** i namjerno se odabire zasebno za svako odredište.
Šalje se ono što prikazuje nadzorna ploča jer izvoz i `getCallLogById` dijele razrješavanje
pojedinosti: iz sadržaja su
već pri zapisivanju uklonjeni osobni podaci i tajne, a poziv izvršen API ključem
`noLog` uopće ne pohranjuje sadržaj, pa nema ničega za izvoz.

Sadržaji se čitaju za svaki redak iz artefakta u datotečnom sustavu, pa se učitavanje potpunih podataka izvodi samo za odredišta
koja su to zatražila. Ako artefakt nedostaje ili je oštećen, izvozi se njegov sažetak s null vrijednostima sadržaja umjesto
da obrada serije ne uspije i kursor ostane zaglavljen.

`maxBodyBytes` (zadano 262144) ograničava svako polje. Dulji sadržaji **skraćuju se umjesto da se
odbace** — skraćeni upit i dalje odgovara na pitanje „što je zatraženo” — a redak se označava s
`bodies_truncated`. Promjene koje se prenose strujanjem, dio po dio, ne izvoze se; sastavljeni odgovor
već se nalazi u `pipeline_provider_response` i `pipeline_client_response`.

---

## 2. Datoteke

| Dio                                    | Lokacija                                     |
| -------------------------------------- | -------------------------------------------- |
| Ugovor odredišta                       | `src/lib/logExport/types.ts`                 |
| Registar                               | `src/lib/logExport/registry.ts`              |
| Obrada tajni                           | `src/lib/logExport/secrets.ts`               |
| Izvršitelj (IPC nadređenog procesa)    | `src/lib/logExport/runner.ts`                |
| Životni ciklus procesa                 | `src/lib/logExport/childRunner.ts`           |
| Ulazna točka podređenog procesa        | `src/lib/logExport/exportChild.ts`           |
| Otvaranje samo za čitanje              | `src/lib/db/logExportReadOnly.ts`            |
| Zajednički upiti/preslikavanje         | `src/lib/usage/callLogExportQueries.ts`      |
| Razrješavanje detalja                  | `src/lib/usage/callLogDetailResolver.ts`     |
| API projekcija                         | `src/lib/logExport/presenter.ts`             |
| Odredište BigQuery                     | `src/lib/logExport/destinations/bigquery.ts` |
| Autentikacija Google servisnim računom | `src/lib/logExport/googleServiceAccount.ts`  |
| Izvor zapisnika poziva                 | `src/lib/usage/callLogExportSource.ts`       |
| Trajna pohrana                         | `src/lib/db/logExportDestinations.ts`        |
| Cron zadatak                           | `src/lib/jobs/logExportJob.ts`               |
| REST sloj                              | `src/app/api/log-export/`                    |
| Stranica nadzorne ploče                | `src/app/(dashboard)/dashboard/log-export/`  |

Shema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Sve rute zahtijevaju autentikaciju za upravljanje (`requireManagementAuth`). Tajne se nikada ne vraćaju:
pohranjena tajna vraća se kao doslovna vrijednost `__stored__`, a slanje te vrijednosti pri ažuriranju
zadržava pohranjene vjerodajnice.

Stvaranje ili ažuriranje odredišta čija vrsta deklarira tajnu **zahtijeva
`STORAGE_ENCRYPTION_KEY`**. Bez njega `encrypt()` neprimjetno propušta podatke bez izmjene, pa se upis
odbija statusom 400 umjesto da se vjerodajnice pohrane u SQLite kao običan tekst (istu zaštitu primjenjuje
Telegram webhook).

| Metoda   | Putanja                                  | Svrha                                                                          |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Vrste odredišta + popis njihovih konfiguracijskih polja                        |
| `GET`    | `/api/log-export/destinations`           | Popis odredišta (tajne skrivene)                                               |
| `POST`   | `/api/log-export/destinations`           | Stvaranje odredišta                                                            |
| `GET`    | `/api/log-export/destinations/{id}`      | Dohvat jednog odredišta                                                        |
| `PUT`    | `/api/log-export/destinations/{id}`      | Ažuriranje naziva / omogućenosti / konfiguracije / grupiranja u serije         |
| `DELETE` | `/api/log-export/destinations/{id}`      | Brisanje                                                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | Provjera vjerodajnica, bez upisivanja                                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Trenutačna obrada svih preostalih zapisa, istim putem kao zakazano izvršavanje |
| `GET`    | `/api/log-export/status`                 | Stanje crona, nedavna izvršavanja, neobrađeni zapisi po odredištu              |

`GET /api/log-export/types` omogućuje generičko korisničko sučelje: obrazac na nadzornoj ploči prikazuje se na temelju
vraćenih opisa polja, pa novo odredište ne zahtijeva izmjene korisničkog sučelja.

---

## 4. Odredište BigQuery

Konfiguracijski ključevi (`type: "bigquery"`):

| Ključ                | Napomene                                                                     |
| -------------------- | ---------------------------------------------------------------------------- |
| `projectId`          | GCP projekt koji sadrži skup podataka                                        |
| `datasetId`          | `[A-Za-z0-9_]+`                                                              |
| `tableId`            | `[A-Za-z0-9_]+`                                                              |
| `location`           | Koristi se samo ako je potrebno stvoriti skup podataka (zadano `EU`)         |
| `serviceAccountJson` | Ključ servisnog računa. Tajni podatak: šifriran u pohrani, nikad se ne vraća |
| `autoCreate`         | Stvori skup podataka i tablicu pri prvom izvozu (zadano `true`)              |

Servisni račun treba dozvolu `bigquery.tables.updateData` za ciljnu tablicu, kao i
`bigquery.datasets.create` / `bigquery.tables.create` kada je uključen `autoCreate`.

Konfigurirana serija jedinica je **kursora**, a ne HTTP-a: `send()` je dijeli na pozive insertAll
s najviše 500 redaka, pa velika vrijednost `batch_size` ne može prekoračiti BigQueryjevo ograničenje zahtjeva od 10 MB.
Za prolazne statuse (408/429/500/502/503/504) pokušaj se ponavlja do tri puta uz eksponencijalno
povećavanje razmaka između pokušaja i ponovnu upotrebu istih vrijednosti insertIds; pogreške autentifikacije i sheme izazivaju iznimku pri prvom pokušaju umjesto
da se uzalud troši cijelo izvođenje.

Tablica stvorena prije nekoliko trenutaka još nije vidljiva krajnjoj točki za strujni unos, koja nekoliko sekundi vraća 404. Za taj se 404 pokušaj ponavlja, ali **samo ako je tablica stvorena tijekom ovog izvođenja** —
ako tablica doista ne postoji, postupak i dalje odmah završava pogreškom. Imajte na umu da ponovno stvaranje tablice pod nazivom koji
je nedavno izbrisan uzrokuje da BigQuery nekoliko minuta odbija strujne unose; to je
svojstvo postupka brisanja pa ponovnog stvaranja, stoga radije upotrijebite novi naziv tablice nego da postojeću izbrišete i ponovno dodate.

**Djelomični neuspjeh stiže kao HTTP 200 s nepraznim `insertErrors[]`.** To se smatra
neuspjehom i izaziva iznimku, čime se sprječava pomicanje kursora preko redaka koje BigQuery nikada nije
prihvatio; `tests/unit/log-export-bigquery.test.ts` provjerava to ponašanje.

Prijenos se odvija običnim REST-om — samopotpisana RS256 tvrdnja razmjenjuje se za pristupni token na
`https://oauth2.googleapis.com/token`, a zatim se retci šalju u `tabledata.insertAll`. Ne uključuje se Google SDK.
Pristupni tokeni predmemoriraju se unutar procesa za svaki par (servisni račun, opseg).

Stvorena tablica ima po jedan stupac za svako polje kartice Dnevnici te `exported_at`, a organizirana je prema
stvarnom načinu pretraživanja dnevnika poziva:

- **Particionirana po danima prema `timestamp`**, tako da upit ograničen datumom pregledava samo te dane.
- **Grupirana prema `api_key_name`, `provider`, `model`, `status`** (tim redoslijedom), tako da filtriranje prema
  tome tko je pokrenuo poziv, kamo je upućen ili je li završio neuspjehom izuzima blokove unutar svake particije. BigQuery
  dopušta najviše četiri stupca za grupiranje, a redoslijed je važan: filtar samo prema `api_key_name`
  izuzima blokove, a filtar samo prema `status` to ne čini.
- **Neobavezno razdoblje zadržavanja particija** putem `partitionExpirationDays` (0 zadržava sve), primjenjuje se
  pri stvaranju tablice.

Obje postavke primjenjuju se pri stvaranju. Postojeća tablica zadržava svoj postojeći raspored, pa
usmjerite odredište na novi ID tablice ako ih želite primijeniti.

`tests/unit/log-export-bigquery.test.ts` provjerava da mapiranje i shema tablice ostanu
usklađeni, tako da se novi stupac dnevnika poziva ne može neprimjetno izostaviti pri izvozu.

Serije se dijele prema **oba** kriterija: broju redaka i broju serijaliziranih bajtova. Sam broj redaka nije dovoljan
kada se izvozi sadržaj: 500 redaka s upitima može zauzimati desetke megabajta, a insertAll
odbija zahtjeve veće od 10 MB. Blokovi se zatvaraju na 500 redaka ili 9 MB, ovisno o tome što se prije dosegne.

---

## 5. Odredište za OTLP/HTTP tragove

Konfiguracija koristi `type: "otlp-http"`. To je zakazani izvoz trajno pohranjenih
zapisa poziva koji se oslanja na kursor, a ne odredište za događaje usmjeravanja uživo
koje radi po načelu najboljeg napora u
`open-sse/services/routing/otel.ts`. Ne čita niti mijenja varijable okruženja,
vremenske brojače ni međuspremnike tog odredišta. Omogućavanje obaju može proizvesti dvije neovisne vrste raspona;
koristite instrumentacijski opseg `omniroute.log-export` kako biste razlikovali ove raspone zapisa poziva.

| Ključ                    | Zadana vrijednost / svrha                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `endpoint`               | Obavezan potpuni HTTP(S) URL za tragove; sufiks `/v1/traces` ne dodaje se                     |
| `headers`                | Neobavezni redci `Name: value` ili JSON objekt nizova znakova; šifrirano                      |
| `requestHeaderAllowlist` | Prazno (isključeno); nazivi/prefiksi klijentskih zaglavlja za bilježenje kao atributa raspona |
| `serviceName`            | `omniroute`; resurs `service.name`                                                            |
| `langfuseMapping`        | `false`; dodaje Langfuse atribute generiranja/sesije/korisnika                                |
| `identity`               | `pseudonymous`, `keyName` ili `none`                                                          |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                       |
| `timeoutMs`              | `30000` po HTTP pokušaju                                                                      |
| `environment`            | Nije postavljeno; neobavezni `langfuse.environment`                                           |

Generička nadzorna ploča prikazuje ta polja. `paths` prihvaća polje putem API-ja ili višeredno tekstno polje
s točnim putanjama odvojenima novim redcima/zarezima. Putanje za ugradnje, ponovno rangiranje i ostale putanje
preskaču se ako nisu izričito dopuštene. Preskočeni redci i dalje pomiču kursor; brojači
`exported`/`exportedTotal` postojećeg izvršitelja broje obrađene izvorne retke, uključujući filtrirane
retke, umjesto prihvaćenih raspona. Filtriranje se obavlja u podređenom procesu, bez promjene njegova
ugovora za IPC/kursor.

Provjera valjanosti URL-a koristi pomoćnu funkciju `parseAndValidateNonMetadataUrl`, koja ne pristupa bazi podataka, iz
`src/shared/network/outboundUrlGuard.ts`: pravilo `block-metadata`. Ima iste
bezuvjetne provjere metapodataka/protokola/ugrađenih vjerodajnica kao validator webhookova s
omogućenim privatnim URL-ovima, ali namjerno dopušta localhost/LAN odredišta bez globalnog
nadjačavanja zastavice značajke. To omogućuje samostalno udomljene krajnje točke za Langfuse, Phoenix, Tempo i Collector,
uključujući privatne HTTP krajnje točke. Poslužitelji metapodataka u oblaku uvijek su blokirani.
Preusmjeravanja se ne slijede, pa prikupljač ne može preusmjeriti vjerodajnice na drugi poslužitelj.
Kao ni postojeća leksička zaštita URL-ova, ovo ne fiksira DNS razrješavanje; konfigurirajte samo
poslužitelje pod kontrolom operatera. Dajte prednost HTTPS-u kad god krajnja točka nije na pouzdanoj mreži.

### Sadržaj i isporuka

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) prenosi jedan
raspon vrste CLIENT po dopuštenom retku, nazvan prema njegovoj točnoj putanji zahtjeva. Nazivanje prema putanji razlikuje
Chat Completions, Responses i Messages bez ugrađivanja podataka o modelu ili identitetu u
naziv raspona. Atributi resursa uključuju `service.name` i `service.version` paketa.

Uobičajeni zapisivač pokušaja razgovora (`open-sse/handlers/chatCore/attemptLogging.ts`) zapisuje
`duration = Date.now() - startTime` po dovršetku i ne navodi vremensku oznaku;
`saveCallLogOperation` u `src/lib/usage/callLogs.ts` zadano postavlja vremensku oznaku na vrijeme zapisivanja
(dovršetka). Izvoz stoga postavlja kraj = vremenska oznaka retka, a početak = kraj − trajanje
(milisekunde, pretvorene u decimalne nanosekunde). Povijesne vremenske oznake koje navede pozivatelj
također se zadržavaju kao vrijeme završetka; ne postoji oznaka početka/dovršetka po retku.
Trajanje s vrijednošću null postaje nula. Nevaljane/nedostajuće vremenske oznake uzrokuju neuspjeh skupine umjesto stvaranja
nedeterminističkih raspona. `ttftMs` može imati vrijednost null i preslikava se u `omniroute.ttft_ms`.

Atributi uključuju `gen_ai.operation.name="chat"`, pružatelja, zatraženi/odgovoreni model,
ulazne/izlazne tokene, neobavezne tokene čitanja iz predmemorije/stvaranja predmemorije/zaključivanja, HTTP status,
kombinaciju, izvor predmemorije, oznaku sesije i korelacijski ID. Cjelobrojne OTLP vrijednosti i vremenske oznake
decimalni su nizovi znakova; nizovi znakova, Booleove vrijednosti i razlomljeni brojevi koriste svoje izvorne varijante
OTLP vrijednosti. Rasponi s pogreškama imaju status ERROR i pročišćenu poruku statusa. Kanonski
zapis nema URL uzvodnog poslužitelja, pa se `server.address` izostavlja umjesto da se
prikupljač pogrešno identificira kao poslužitelj modela. Trošak se ne izvozi.

Samo `includeBodies=true` učitava sadržaj. Uz `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` prenose pročišćeni JSON tijela zahtjeva/odgovora
kako ga pohranjuje OmniRoute (kanoniziran kada se može parsirati), a ne preoblikovano polje
poruka prema semantičkim konvencijama. Skraćena tijela i tijela koja nisu JSON ostaju neobrađeni tekst. Uz `langfuseMapping=true`,
tijela se emitiraju samo kao `langfuse.observation.input` / `langfuse.observation.output`;
atributi `gen_ai.*.messages` izostavljaju se kako bi se svako tijelo poslalo jednom. Oba načina
nasljeđuju `maxBodyBytes` iz postojećeg postupka učitavanja sadržaja;
`omniroute.bodies_truncated=true` označava skraćivanje.
Ovo odredište ne dodaje dodatne snimke stanja cjevovoda ni čitanja nepročišćenih artefakata;
neobavezno bilježenje zaglavlja zahtjeva koristi postojeću učitanu snimku stanja klijenta opisanu u nastavku.
Pri izvozu tijela koristite učestalost u minutama, poput `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
umjesto nakupljanja jednosatnog zaostatka.

### Neobavezna zaglavlja klijentskih zahtjeva

Bilježenje zaglavlja **zadano je isključeno**. Postavite `requestHeaderAllowlist` u konfiguraciji odredišta
i omogućite **Izvoz upita i odgovora** (`includeBodies: true` na odredištu).
Popis dopuštenih zaglavlja prihvaća polje putem API-ja ili višeredno tekstno polje s nazivima odvojenima novim redcima/zarezima:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nazivi se podudaraju točno, bez razlikovanja velikih i malih slova, osim ako jedan završni `*` odabire neprazan
prefiks naziva zaglavlja. Samostalni `*`, ugrađeni zamjenski znakovi i nevaljani nazivi HTTP zaglavlja odbijaju se.
Dopuštena su najviše 64 selektora, svaki s nazivom/prefiksom od najviše 256 ASCII bajtova.
Ova je postavka odvojena od `headers`, koji služi za autentifikaciju izvoznika kod kolektora.

Prikupljanje čita samo `pipeline_client_request`, popunjen iz `clientRawRequest` spremljenog detaljnog cjevovoda
(ili naslijeđenog `clientRequest`). Nikada ne koristi zaglavlja zahtjeva pružatelja kao zamjenu.
Detaljno zapisivanje cjevovoda moralo je biti omogućeno u trenutku bilježenja zahtjeva. Ako je
`includeBodies` onemogućen ili ako JSON snimke klijenta nedostaje, oštećen je ili odrezan, atributi
zaglavlja ne emitiraju se. Povećanjem `maxBodyBytes` može se izbjeći odrezivanje snimke tijekom izvoza;
time se ne mogu vratiti detalji koji nikada nisu spremljeni. Snimka veća od 1 MiB ili s više od
256 unosa zaglavlja zanemaruje se. Postojeći izvoz upita/odgovora ostaje omogućen uz
prikupljanje zaglavlja; popis dopuštenih stavki ne pruža način učitavanja samo zaglavlja.

Odabrane vrijednosti postaju OTLP nizovi znakovnih nizova `http.request.header.<full lowercase header name>`,
čak i za jedan znakovni niz. Primjerice, `X-OmniRoute-Meta-Team: example-team` postaje
`http.request.header.x-omniroute-meta-team` s
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Puni prefiks ostaje očuvan: to su obična zaglavlja, bez parsiranja poslovnih polja ili
pretvorbe u metapodatke `omniroute.metadata.*` / Langfuse. `langfuseMapping` ne mijenja semantiku
zaglavlja. Odabrani `User-Agent` s jednom vrijednošću postavlja i standardni skalarni atribut
`user_agent.original`. Zarezi unutar jedne vrijednosti ne razdvajaju se. Varijante s različitim velikim i malim slovima spajaju se redoslijedom spremljenih
unosa; bilo koja nevaljana varijanta uzrokuje izostavljanje cijelog zaglavlja. Atributi se razvrstavaju prema nazivu pisanom malim slovima.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, zaglavlja s API ključevima, nazivi koji sadržavaju
oznake auth/token/secret/password/credential i interne vjerodajnice pristupnika uvijek se
isključuju, čak i ako su odabrani ili djelomično maskirani u pohrani. Za poznate obrasce vjerodajnica ponovno se koristi
zajednički detektor vjerodajnica; oznake redakcije izostavljaju se i ne izvoze kao sigurne vrijednosti.
Prihvaćaju se samo znakovni nizovi i neprazni nizovi znakovnih nizova; brojevi i objekti ne pretvaraju se prisilno.
Nevaljani nazivi, ključevi prototipa, kontrolni znakovi (osim vodoravnog tabulatora) i neispravan Unicode
zanemaruju se bez uzrokovanja neuspjeha skupine ili prikazivanja njihova sadržaja u pogreškama.

Svaki raspon prikuplja najviše 32 zaglavlja, 16 vrijednosti po zaglavlju, 4096 UTF-8 bajtova po vrijednosti
i ukupno 16384 UTF-8 bajta za nazive i vrijednosti prikupljenih zaglavlja. Prevelika/nevaljana zaglavlja
izostavljaju se u cijelosti, ne odrezuju se. Odabir je odluka operatera o privatnosti: nazivi koji izgledaju sigurno
i dalje mogu sadržavati osobne podatke, a ta ograničenja i detektori nisu opći alat za uklanjanje osobnih podataka.

### Ograničenja isporuke

Zahtjevi su ograničeni na 500 raspona i 4 MiB UTF-8 JSON-a, uključujući omotnicu.
Veličina svakog dopuštenog raspona provjerava se prije prvog zahtjeva skupine kursora. Ako je pojedinačni
raspon veći od ograničenja, ne šalje se nijedan dio te skupine, a postupak završava pogreškom s uputom da se smanji
`maxBodyBytes`; raspon se ne odbacuje prešutno. Prethodna provjera zadržava samo reference na zapise i
brojeve bajtova, odbacujući svaki privremeni raspon/JSON; rasponi se ponovno izrađuju za dijelove ograničene veličine
umjesto da se zadržava druga serijalizirana kopija skupine. HTTP 408/429/5xx, mrežni kvarovi i isteci vremena dopuštaju najviše
tri pokušaja, s eksponencijalnim odmakom od 250/500 ms. Sekunde ili HTTP datumi u `Retry-After`
mogu produljiti odgodu do 5 sekundi. Ostali statusi odmah uzrokuju neuspjeh. Djelomično odbijanje uz OTLP 2xx također izaziva pogrešku umjesto
potvrđivanja izgubljenog raspona; prihvaćaju se prazne potvrde ili potvrde u valjanom JSON-u, uz
ograničenje čitanja odgovora od 64 KiB.

Pogreške sadržavaju samo činjenice koje potječu od izvoznika: HTTP status, kategoriju ponovnog pokušaja, broj pokušaja i broj poslanih
raspona ili unaprijed zadane poruke o neuspjeloj potvrdi/mrežnom kvaru. Tijela odgovora kolektora,
brojevi djelomično uspješnih stavki i zaglavlja odgovora nikada se ne kopiraju u pogreške, zapisnike ili
nadzornu ploču. Neuspjela ili djelomično prihvaćena skupina ne potvrđuje se: odredište prikazuje
Neuspješno s tim statusom, kursor ostaje na posljednjoj potvrđenoj skupini, a sljedeće pokretanje
ponovno šalje iste retke. Trajni statusi nastavljaju uzrokovati neuspjeh dok se kolektor ili konfiguracija
ne isprave. Za pojedinosti odgovora koristite zapisnike samog kolektora. Sažeci pogrešaka u zapisniku poziva zadržavaju
zasebnu redakciju.
`prepare()` ne priprema nikakve resurse; Test šalje točno `{"resourceSpans":[]}` i prijavljuje
HTTP status bez zapisivanja raspona zapisnika poziva.

Identifikatori tragova i raspona prvih su 32/16 heksadekadskih znamenki SHA-256 izračuna nad
`"omniroute.trace\\0" + callLogId` i `"omniroute.span\\0" + callLogId`. Ponovna slanja nose
jednake identifikatore. To nije jamstvo deduplikacije: neki pozadinski sustavi, uključujući prihvat podataka u Langfuse
v4, ne uklanjaju duplikate raspona s istim identifikatorom. Rušenje ili djelomični neuspjeh dijela može
uzrokovati ponovno slanje najviše jedne nepotvrđene skupine kursora; cijela ta skupina može biti duplicirana,
a ne samo njezin posljednji HTTP dio. Pri odabiru veličine skupine kursora imajte na umu taj kompromis.

### Primjer za Langfuse

Konfigurirajte ova polja za samostalno udomljenu instancu sustava Langfuse:

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

Vrijednost zaglavlja Authorization izradite lokalno kao Base64 kodiranje doslovnog znakovnog niza `public-key:secret-key`
(primjerice pomoću `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nemojte lijepiti stvarne vjerodajnice u zapisnike, snimke zaslona ili prijave problema. Mapiranje automatski
postavlja `x-langfuse-ingestion-version: 4`; Authorization se i dalje navodi u `headers`.
I zaglavlja i generirana sol za identitet koriste postojeći mehanizam šifriranih tajnih polja
i zamjenske vrijednosti API-ja; `STORAGE_ENCRYPTION_KEY` je obvezan.

Mapiranje dodaje vrstu/model generiranja, pojedinosti o upotrebi u JSON-u (ulaz/izlaz/ukupno i dostupne
ključeve predmemorije), snimke ulaza/izlaza u JSON-u, razinu ERROR/DEFAULT, pročišćenu poruku o statusu,
naziv traga, ID sesije, neobavezno okruženje i atribut koji se može filtrirati
`langfuse.observation.metadata.<key>` za pružatelja usluge, zatraženi model, putanju, kombinaciju, izvor
predmemorije i status. `langfuse.observation.completion_start_time` izražen je u formatu ISO 8601 kao
početak + TTFT samo kada je TTFT poznat i unutar trajanja. Atributi troška ne šalju se.

Načini identiteta primjenjuju se na `langfuse.user.id`:

- `pseudonymous` (zadano): HMAC-SHA256 internog ID-a API ključa s nasumičnom
  32-bajtnom soli za svako odredište. Sol se generira pri stvaranju ako nije prisutna, šifrira
  kao `identitySalt`, nikada se ne vraća i zadržava se tijekom uređivanja. Izvorni ID-jevi ključeva nikada se ne
  stavljaju u atribute raspona. Ponovno stvaranje/rotiranje soli odredišta mijenja identitete.
- `keyName`: konfigurirani naziv API ključa, čime se namjerno otkriva ta oznaka koju je zadao operater.
- `none`: nema ID-a korisnika. Oznake sesije i dalje se izvoze kada su prisutne; ti načini ne
  anonimiziraju proizvoljan sadržaj upita ni oznake sesije/korelacije koje je zadao operater.

### Pokretanje bez naknadnog popunjavanja

Samo pri stvaranju omogućite **Počni od trenutačnog položaja (preskoči postojeće zapisnike)** ili proslijedite
`startFromCurrentPosition: true` na najvišoj razini tijela zahtjeva API-ja za stvaranje. Time se
`cursor_row_id` inicijalizira na trenutačni najveći zadržani rowid zapisnika poziva pomoću postojećih pomoćnih funkcija
za kursor, bez migracije. Zadana je vrijednost false (kursor 0 i naknadno popunjavanje zadržanom poviješću).
To nije postavka za ponovno postavljanje kursora pri ažuriranju.

Zajedničko dodavanje `ttftMs` također dodaje stupac `ttft_ms` koji dopušta null vrijednosti u BigQuery mapiranje
i shemu nove tablice: test sheme zahtijeva da svako polje kanonskog zapisa ima
stupac. Postojeće tablice nastavljaju izvoziti podatke bez promjena: `prepare()` čita shemu tablice i
izostavlja samo `ttft_ms` kada taj stupac nije prisutan. Dodajte stupac INT64 koji dopušta null vrijednosti kako biste dobili TTFT
pri sljedećem pokretanju ili upotrijebite novu tablicu. Nisu potrebni PATCH, automatska izmjena sheme ni dodatne
dozvole; sva ostala polja retka zadržavaju strogu provjeru sheme.

---

## 6. Dodavanje odredišta

1. Izradite `src/lib/logExport/destinations/<name>.ts` koji izvozi `LogExportDestinationType`:
   Zod `configSchema`, polje opisnika `fields` za korisničko sučelje, `secretFields` i
   `createClient(config)` koji vraća `test()` / `prepare()` / `send(records)`.
2. Dodajte ga u polje `DESTINATIONS` u `src/lib/logExport/registry.ts`.
3. Napišite testove u `tests/unit/`.

To je cijela promjena: trajna pohrana, cron zadatak, REST sloj, šifriranje tajni i
obrazac na nadzornoj ploči svi čitaju registar.

Dva pravila za novo odredište:

- `send()` **mora baciti iznimku** pri djelomičnom neuspjehu. Uspješno dovršavanje znači „odredište ima ove retke”,
  a kursor se trajno pomiče iza njih.
- Odredište koje prihvaća URL koji je unio korisnik mora ga provjeriti putem
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) prije dohvaćanja,
  na isti način kao webhookovi. BigQuery to ne treba: njegovi su poslužitelji konstante.

---

## 7. Upravljanje

- **Nadzorna ploča**: Integracije → Izvoz zapisnika. Dodajte odredište, pokrenite **Test** kako biste provjerili vjerodajnice
  bez zapisivanja redaka, a zatim ga omogućite.
- **Zaostali redci**: svaka kartica odredišta prikazuje retke na čekanju i kursor; `GET
/api/log-export/status` vraća iste podatke te posljednjih 20 izvršavanja zadatka.
- **Neuspjeh jednog odredišta ne uzrokuje neuspjeh ostalih** — sažetak izvršavanja bilježi status svakog odredišta
  u `last_status` / `last_error`, a povijest izvršavanja zadatka čuva zbirne podatke.
- **Brisanjem odredišta briše se i njegov kursor.** Ponovnim dodavanjem kreće se od najstarijeg zadržanog
  zapisa poziva, čime se ponovno šalju redci koje odredište možda već ima. U BigQueryju
  `insertId` za svaki redak sprječava takvo dupliciranje samo unutar BigQueryjeva vlastitog vremenskog okvira za deduplikaciju, pa radije onemogućite
  odredište nego da ga izbrišete.
