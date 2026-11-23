# Log export (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

# Izvoz logova

Kontinuirani, inkrementalni izvoz OmniRoute logova poziva u vanjsko skladište za analitiku.

Kartica Logs na kontrolnoj ploči čuva historiju zahtjeva u SQLite (`call_logs`), koja je ograničena rotacijom i zadržavanjem. Izvoz logova šalje isti skup zapisa prema rasporedu kako bi mogao nadživjeti lokalnu bazu podataka i biti povezan s drugim podacima. BigQuery je prvo odredište; cjevovod (pipeline) je registar, tako da su dodatna odredišta aditivna.

---

## 1. Kako funkcioniše

```
server (dešifriranje + provjera konfiguracije, usklađivanje kursora)
  → pokretanje IPC-a → izolirani OS proces exportChild
    → storage.sqlite samo za čitanje → zajednički upit/mapiranje evidencije poziva
      → asinhrono učitavanje artefakata → odredišni prepare()/send()
        → paketni IPC → server pohranjuje kursor → ack IPC
          → sljedeći paket; done IPC → server bilježi uspjeh
```

- **Raspored** — jedan `JobRegistry` cron zadatak, `log_export`, s podrazumijevanom vrijednošću `0 * * * *` (svakog sata,
  UTC). Registriran je u `src/lib/initCloudSync.ts`; može se promijeniti pomoću `OMNIROUTE_LOG_EXPORT_CRON`.
  Svako pokretanje sekvencijalno obrađuje sva **omogućena** odredišta.
- **Kursor** — SQLiteov implicitni `call_logs.rowid`, pohranjen zasebno za svako odredište u
  `log_export_destinations.cursor_row_id`. `timestamp` namjerno nije kursor: pozivaoci
  mogu navesti vlastitu vrijednost, pa sporiji zahtjev može biti zapisan nakon bržeg zahtjeva koji je pokrenut
  kasnije, a kursor vremenske oznake bi ga preskočio.
- **Paketna obrada** — `batch_size` redova po zahtjevu (podrazumijevano 500), `max_rows_per_run` redova po pokretanju
  (podrazumijevano 10000), tako da se veliki zaostatak obrađuje tokom više pokretanja umjesto da blokira jedno.
- **Isporuka** — kursor se pomjera tek nakon što se `send()` razriješi. Neuspješan paket ostavlja
  kursor na istom mjestu, pa se isti redovi ponovo pokušavaju poslati pri sljedećem pokretanju. Garancija je
  najmanje jedna isporuka uz uklanjanje duplikata na strani odredišta, a ne stvarna tačno jedna isporuka: BigQuery svakom
  redu dodjeljuje ključ prema ID-u evidencije poziva, što poštuje po principu najvećeg napora unutar vlastitog perioda uklanjanja duplikata.
- **Zaštita od preklapanja** — cron pokretanje i `POST .../run` mogu se izvršiti istovremeno. Odredište
  koje se već obrađuje preskače se umjesto da se obrađuje dvaput (`skipped: true` u rezultatu pokretanja),
  tako da istovremeno pokretanje ne može ponovo poslati paket niti vratiti kursor unazad.
- **Oporavak nakon brisanja** — ako `cursor_row_id` završi iznad `MAX(rowid)` (cijela tabela je
  očišćena i ID-ovi redova ponovo su krenuli od početka), izvršilac vraća kursor na 0 umjesto da trajno prestane uočavati nove redove.

### Izolirani izvršilac i ograničenja

Svako pokretanje odredišta u Nodeu pokreće zaseban, kratkotrajan podređeni OS proces (`child_process`
s IPC-om, a ne `worker_threads`). Čitanje tijela, parsiranje/serijalizacija JSON sadržaja, odredišni
`prepare()` i odredišni mrežni I/O izvršavaju se u njemu, a ne u petlji događaja servera.
Preko IPC-a prenose se samo konfiguracija i male poruke o napretku; izvezeni zapisi nikada se ne vraćaju
na server. Cron zadatak i ruta Pokreni sada zadržavaju isti javni rezultat i zaštitu od preklapanja.

Podređeni proces otvara serverov razriješeni `DATA_DIR/storage.sqlite` samo za čitanje koristeći `node:sqlite`,
uz `busy_timeout=5000` i `query_only=ON`. Ne uvozi nijednu singleton instancu baze podataka i ne izvršava
migracije, sigurnosne kopije niti SQLite ažuriranja. Evidentiranje nedostajućih/oštećenih artefakata (uključujući
UPDATE za oštećene artefakte) ostaje samo u putanji detalja kontrolne ploče. Obje putanje dijele čisti
razrješivač detalja; izvoz koristi asinhrono čitanje sistema datoteka i isti redoslijed razrješavanja:
artefakt → naslijeđeni ugrađeni sadržaj → naslijeđeni sadržaj na disku → ništa. Pokretanje pravi snimak maksimalnog ID-a reda umetanja
kada podređeni proces otvori svoj čitač; kasniji unosi čekaju sljedeće pokretanje. Ovo je granica umetanja,
a ne dugotrajna SQLite transakcija: WAL zapisivači i kontrolne tačke ostaju slobodni tokom
čekanja mreže. Ažuriranja/brisanja postojećih redova nisu zamrznuta ovom granicom.

Nakon svakog prihvaćenog paketa podređeni proces čeka potvrdu. Server prvo pohranjuje
kursor pomoću `advanceLogExportCursor`, a zatim šalje `ack`; nijedan sljedeći paket ne počinje prije toga.
Neuspjeh slanja, pad procesa ili prekoračenje vremena bilježi neuspjeh bez pomjeranja kursora za taj paket. Prethodno
potvrđeni paketi ostaju pohranjeni; najviše jedan nepotvrđeni paket može biti ponovo poslan.
Uspjeh se bilježi tek nakon `done` i urednog završetka podređenog procesa. Neuspjesi prekidaju podređeni proces
pomoću SIGTERM, prelazeći na SIGKILL nakon 500 ms, a izvršilac čeka zatvaranje procesa.

| Varijabla okruženja                           | Podrazumijevano | Svrha                                 |
| --------------------------------------------- | --------------- | ------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000          | Vremensko ograničenje po odredištu    |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024            | Ograničenje starog prostora V8 u MB-u |

Nevažeće vrijednosti, vrijednosti koje nisu pozitivne ili nisu cijeli brojevi koriste podrazumijevane postavke. Postavka hrpe nije ukupno
RSS ograničenje; veoma veliki paketi i dalje mogu iscrpiti memoriju podređenog procesa i sigurno prekinuti pokretanje.
Podrazumijevanih 1024 MB ostavlja dovoljno prostora za podrazumijevani paket od 500 redova s artefaktima od 512 KiB i
uključenim tijelima, uključujući BigQueryevu serijalizaciju JSON-a segmentiranu po bajtovima. To ne čini
paket tijela od 10000 redova sigurnim. Iscrpljivanje V8 hrpe bilježi neuspjeh s jasnim uputama: smanjite veličinu paketa
ili povećajte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor ostaje na posljednjem
potvrđenom paketu. Historijska ugrađena tijela/tijela na disku nisu obuhvaćena savremenim ograničenjem artefakata.
Operatori moraju zasebno planirati RSS, naročito unutar kontejnera s ograničenom memorijom.

Podređeni proces nasljeđuje samo razrijeđeni `DATA_DIR`, `NODE_ENV`, eksplicitni `TZ` (razrješavanje lokalnog vremena
za naslijeđene nazive datoteka), `ELECTRON_RUN_AS_NODE` kada je prisutan i sljedeće ulazne vrijednosti za odlazne veze:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (i njihove varijante napisane malim slovima),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globalni Undici dispečer dijeli serverovo čisto razrješavanje proxyja iz okruženja i pravila
zaobilaženja lokalnih hostova, uključujući `NO_PROXY`; ne uvozi `proxyFetch.ts` niti njegove zastavice baze podataka/funkcionalnosti.
Podaci za pristup proxyju uklanjaju se iz proslijeđenog izlaza i zabilježenih grešaka. Pristupni podaci odredišta
prenose se samo u jednoj početnoj IPC poruci, nikada kroz argv ili okruženje; prosljeđivanje izlaza/grešaka
dobija prefiks i čisti se od osjetljivih podataka. Samo je `ExperimentalWarning` onemogućen u argumentima izvršavanja podređenog procesa kako bi se izbjeglo
ponavljanje Nodeovog SQLite upozorenja pri svakom cron pokretanju; ostale vrste upozorenja ostaju vidljive.

Odredišni moduli moraju se moći uvesti bez zavisnosti specifičnih za Next.js/server. Postojeća
BigQuery implementacija već ispunjava taj ugovor. Predmemorije pristupnih tokena traju samo tokom
izvršavanja podređenog procesa, a ne između izvršavanja. Node je podržano izvršno okruženje
(`package.json` engines), ali odjeljak README datoteke o instalaciji Bunda i `Dockerfile.bun`
također navode put produkcijske kompatibilnosti koji koristi `bun:sqlite`
(`src/lib/db/core.ts` / adapteri). Stoga pod Bundom izvozi zadržavaju prethodni put unutar procesa
i jednokratno prikazuju upozorenje: izolacija memorije podređenog procesa i vremenskog ograničenja
nije dostupna. Koristite Node za izolaciju petlje događaja i OOM-a; Bun se ovdje ne smatra
isključivo razvojnim okruženjem.

Kada je `includeBodies` omogućen, preferirajte učestalost na nivou minuta, kao što je
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, umjesto gomilanja satnog zaostatka korisnog sadržaja.
Ograničenja paketa i redova i dalje ograničavaju svako izvršavanje. Pokretanje procesa plaća se
po odredištu i po izvršavanju; time se mali trošak pokretanja zamjenjuje za izolaciju petlje
događaja servera, a ne za smanjenje ukupne upotrebe CPU-a.

### Korisni sadržaji (upiti i odgovori)

Prema zadanim postavkama izvoz prenosi samo sažeta polja koja prikazuje **lista** Zapisa. Uključivanje
opcije **Izvezi upite i odgovore** (`includeBodies`) dodatno šalje ono što okno **detalja**
Zapisa prikazuje za svaki poziv:

| Polje                            | Šta sadrži                                                |
| -------------------------------- | --------------------------------------------------------- |
| `request_body` / `response_body` | Korisne sadržaje poziva kako ih prikazuje kontrolna ploča |
| `pipeline_route_decision`        | Koje je odredište i model usmjerivač odabrao              |
| `pipeline_client_request`        | Sirovi zahtjev, tačno onako kako ga je klijent poslao     |
| `pipeline_openai_request`        | Nakon prevođenja u interni OpenAI oblik                   |
| `pipeline_provider_request`      | Kako je stvarno poslano uzvodno, u dijalektu pružaoca     |
| `pipeline_provider_response`     | Sirovi uzvodni odgovor                                    |
| `pipeline_client_response`       | Ono što je vraćeno pozivaocu                              |
| `pipeline_error`                 | Detalji greške na nivou cjevovoda za neuspjeli poziv      |
| `bodies_truncated`               | True kada bilo koje polje iznad dostigne `maxBodyBytes`   |

Ovo je sadržaj upita, pa je **prema zadanim postavkama isključen** i namjerno se bira zasebno
za svako odredište. Šalje se ono što kontrolna ploča prikazuje, jer izvoz i `getCallLogById`
dijele razrješavanje detalja: korisni sadržaji su već očišćeni od PII podataka i redigovani radi
uklanjanja tajni kada se zapisuju, a poziv izvršen pomoću `noLog` API ključa uopće ne pohranjuje
korisni sadržaj, pa nema ničega za izvoz.

Korisni sadržaji čitaju se po redovima iz artefakta datotečnog sistema, tako da se hidratacija
izvršava samo za odredišta koja su je zatražila. Nedostajući ili oštećeni artefakt izvozi svoj
sažetak s null korisnim sadržajima umjesto da uzrokuje neuspjeh paketa i blokira kursor.

`maxBodyBytes` (zadano 262144) ograničava svako polje. Duži korisni sadržaji se **skraćuju umjesto
da se odbacuju** — skraćeni upit i dalje odgovara na pitanje „šta je zatraženo“ — a red se označava
poljem `bodies_truncated`. Delte strimovane dio po dio ne izvoze se; sastavljeni odgovor već se
nalazi u `pipeline_provider_response` i `pipeline_client_response`.

---

## 2. Datoteke

| Dio                             | Lokacija                                     |
| ------------------------------- | -------------------------------------------- |
| Ugovor odredišta                | `src/lib/logExport/types.ts`                 |
| Registar                        | `src/lib/logExport/registry.ts`              |
| Upravljanje tajnama             | `src/lib/logExport/secrets.ts`               |
| Izvršitelj (roditeljski IPC)    | `src/lib/logExport/runner.ts`                |
| Životni ciklus procesa          | `src/lib/logExport/childRunner.ts`           |
| Ulazna tačka podređenog procesa | `src/lib/logExport/exportChild.ts`           |
| Otvarač samo za čitanje         | `src/lib/db/logExportReadOnly.ts`            |
| Zajednički upit/mapiranje       | `src/lib/usage/callLogExportQueries.ts`      |
| Razrješivač detalja             | `src/lib/usage/callLogDetailResolver.ts`     |
| API projekcija                  | `src/lib/logExport/presenter.ts`             |
| BigQuery odredište              | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA autentifikacija       | `src/lib/logExport/googleServiceAccount.ts`  |
| Izvor evidencije poziva         | `src/lib/usage/callLogExportSource.ts`       |
| Perzistencija                   | `src/lib/db/logExportDestinations.ts`        |
| Cron zadatak                    | `src/lib/jobs/logExportJob.ts`               |
| REST sloj                       | `src/app/api/log-export/`                    |
| Stranica kontrolne ploče        | `src/app/(dashboard)/dashboard/log-export/`  |

Shema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Sve rute su autentifikovane upravljačkim pristupom (`requireManagementAuth`). Tajne se nikada ne vraćaju: pohranjena tajna se vraća kao literal `__stored__`, a slanje te vrijednosti nazad prilikom ažuriranja zadržava pohranjene vjerodajnice.

Kreiranje ili ažuriranje odredišta čiji tip deklariše tajnu **zahtijeva `STORAGE_ENCRYPTION_KEY`**. Bez njega, `encrypt()` je tihi prolaz (passthrough), pa se upis odbija sa 400 umjesto stavljanja vjerodajnica u SQLite u čistom tekstu (ista zaštita koju primjenjuje Telegram webhook).

| Metoda   | Putanja                                  | Svrha                                                   |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipovi odredišta + njihova lista konfiguracijskih polja |
| `GET`    | `/api/log-export/destinations`           | Lista odredišta (tajne redigovane)                      |
| `POST`   | `/api/log-export/destinations`           | Kreiraj odredište                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Čitaj jedno                                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | Ažuriraj naziv / omogućeno / konfiguraciju / grupisanje |
| `DELETE` | `/api/log-export/destinations/{id}`      | Izbriši                                                 |
| `POST`   | `/api/log-export/destinations/{id}/test` | Provjeri vjerodajnice, ne upisuj ništa                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Isprazni odmah, ista putanja kao i zakazano izvršavanje |
| `GET`    | `/api/log-export/status`                 | Cron stanje, nedavna izvršavanja, zaostatak po meti     |

`GET /api/log-export/types` je ono što čini korisnički interfejs generičkim: forma kontrolne ploče se renderuje iz vraćenih deskriptora polja, tako da novo odredište ne zahtijeva promjenu korisničkog interfejsa.

---

## 4. BigQuery odredište

Konfiguracijski ključevi (`type: "bigquery"`):

| Ključ                | Napomene                                                                   |
| -------------------- | -------------------------------------------------------------------------- |
| `projectId`          | GCP projekat koji sadrži skup podataka                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                            |
| `location`           | Koristi se samo kada se skup podataka mora kreirati (podrazumijevano `EU`) |
| `serviceAccountJson` | Ključ servisnog naloga. Tajna: šifrovano u mirovanju, nikada se ne vraća   |
| `autoCreate`         | Kreiraj skup podataka i tabelu pri prvom izvozu (podrazumijevano `true`)   |

Servisni nalog treba `bigquery.tables.updateData` na ciljnoj tabeli, plus `bigquery.datasets.create` / `bigquery.tables.create` kada je `autoCreate` uključen.

Konfigurisana serija (batch) je **kursor** jedinica, a ne HTTP jedinica: `send()` je dijeli na insertAll pozive od najviše 500 redova, tako da veliki `batch_size` ne može premašiti BigQuery ograničenje zahtjeva od 10 MB. Prolazni statusi (408/429/500/502/503/504) se ponovo pokušavaju do tri puta uz eksponencijalno čekanje (backoff), ponovo koristeći iste insertIds; greške autentifikacije i šeme bacaju izuzetak pri prvom pokušaju umjesto da troše izvršavanje.

Tabela kreirana prije nekoliko trenutaka još nije vidljiva streaming krajnjoj tački, koja odgovara sa 404 nekoliko sekundi. Taj 404 se ponovo pokušava, ali **samo kada je ovo izvršavanje kreiralo tabelu** — tabela koja zaista nedostaje i dalje brzo pada (fails fast). Imajte na umu da ponovno kreiranje tabele pod imenom koje je nedavno izbrisano čini da BigQuery odbija streaming unose nekoliko minuta; to je svojstvo brisanja-pa-ponovnog-kreiranja, pa preferirajte novo ime tabele umjesto brisanja i ponovnog dodavanja iste.

**Djelimični neuspjeh stiže kao HTTP 200 sa nepraznim `insertErrors[]`.** To se tretira kao neuspjeh i baca izuzetak, što zaustavlja kursor da napreduje pored redova koje BigQuery nikada nije prihvatio; `tests/unit/log-export-bigquery.test.ts` definiše to ponašanje.

Transport je običan REST — samopotpisana RS256 tvrdnja se mijenja za pristupni token na `https://oauth2.googleapis.com/token`, a zatim redovi idu na `tabledata.insertAll`. Nema uključenog Google SDK-a. Pristupni tokeni se keširaju u procesu po (servisni nalog, opseg).

Kreirana tabela nosi jednu kolonu po polju Logs-tab plus `exported_at`, i raspoređena je prema tome kako se dnevnici poziva zapravo pretražuju:

- **Dnevno particionisano po `timestamp`**, tako da upit ograničen datumom skenira samo te dane.
- **Klasterisano po `api_key_name`, `provider`, `model`, `status`** (tim redoslijedom), tako da filtriranje po tome ko ga je pokrenuo, kuda je otišlo ili da li nije uspjelo, odbacuje blokove unutar svake particije. BigQuery dozvoljava najviše četiri kolone za klasterisanje i redoslijed je bitan: filter samo na `api_key_name` odbacuje podatke, filter samo na `status` ne.
- **Opciono zadržavanje particija** putem `partitionExpirationDays` (0 zadržava sve), primjenjuje se kada se tabela kreira.

Obje postavke se primjenjuju u vrijeme kreiranja. Postojeća tabela zadržava raspored koji već ima, pa usmjerite odredište na novi ID tabele ako želite da ih usvojite.

`tests/unit/log-export-bigquery.test.ts` potvrđuje da mapper i šema tabele ostaju usklađeni, tako da se nova call-log kolona ne može neprimjetno odbaciti prilikom izlaza.

Serije se segmentiraju prema **oba** kriterijuma: broju redova i serijalizovanim bajtovima. Samo broj redova nije dovoljan kada se payload-ovi izvezu: 500 redova koji nose promptove mogu biti desetine megabajta, a insertAll odbija zahtjev preko 10 MB. Segmenti se zatvaraju na 500 redova ili 9 MB, šta god nastupi prvo.

---

## 5. Dodavanje odredišta

1. Kreirajte `src/lib/logExport/destinations/<name>.ts` koji eksportuje `LogExportDestinationType`:
   Zod `configSchema`, niz `fields` deskriptora za UI, `secretFields`, i `createClient(config)` koji vraća `test()` / `prepare()` / `send(records)`.
2. Dodajte ga u `DESTINATIONS` niz u `src/lib/logExport/registry.ts`.
3. Napišite testove u `tests/unit/`.

To je cijela izmjena: perzistencija, cron zadatak, REST sloj, enkripcija tajni i forma na dashboardu čitaju registar.

Dva pravila za novo odredište:

- `send()` **mora baciti izuzetak** (throw) u slučaju djelimičnog neuspjeha. Razrješavanje (resolving) znači "odredište ima ove redove", a kursor se trajno pomjera preko njih.
- Odredište koje prihvata URL koji unosi korisnik mora ga validirati kroz `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) prije preuzimanja, na isti način kao što to rade webhooks. BigQuery ovo ne treba: njegovi hostovi su konstante.

---

## 6. Upravljanje

- **Dashboard**: Integrations → Log export. Dodajte odredište, pokrenite **Test** da provjerite akreditive bez upisivanja redova, a zatim ga omogućite.
- **Backlog**: svaka kartica odredišta prikazuje redove na čekanju i kursor; `GET /api/log-export/status` vraća iste podatke plus posljednjih 20 pokretanja poslova.
- **Neuspjeh jednog odredišta ne dovodi do neuspjeha ostalih** — rezime pokretanja bilježi status po odredištu u `last_status` / `last_error`, a historija pokretanja poslova čuva agregat.
- **Brisanje odredišta briše njegov kursor.** Ponovno dodavanje počinje od najstarijeg zadržanog dnevnika poziva, što ponovo šalje redove koje odredište možda već posjeduje. Na BigQuery-u, `insertId` po redu to apsorbuje samo unutar BigQuery-evog vlastitog prozora za deduplikaciju, stoga je bolje onemogućiti odredište nego ga obrisati.
