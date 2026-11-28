# Log export (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuirani, inkrementalni izvoz zapisnika poziva OmniRoute u vanjsko analitičko spremište.

Kartica Zapisnici na nadzornoj ploči čuva povijest zahtjeva u SQLiteu (`call_logs`), ograničenu
rotacijom i pravilima zadržavanja. Izvoz zapisnika prema rasporedu šalje isti skup zapisa kako bi se mogao čuvati dulje od
lokalne baze podataka i povezivati s drugim podacima. BigQuery je prvo odredište;
cjevovod se temelji na registru, pa se nova odredišta mogu dodavati.

---

## 1. Kako radi

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Raspored** — jedan `JobRegistry` cron posao, `log_export`, zadano `0 * * * *` (svaki sat, UTC). Registriran u `src/lib/initCloudSync.ts`; nadjačati sa `OMNIROUTE_LOG_EXPORT_CRON`. Svaki krpelj iscuri svaki** omogućeno** odredište, redom.
- **Cursor** — SQLite-ov implicitni `call_logs.rowid`, postojao po odredištu u `log_export_destinations.cursor_row_id`. `timestamp` namjerno nije pokazivač: pozivatelji mogu dostaviti vlastitu vrijednost, tako da se spor zahtjev može napisati nakon bržeg koji je započeo kasnije, a kursor vremenske oznake bi ga preskočio.
- **Doziranje** — `batch_size` redaka po zahtjevu (zadano 500), `max_rows_per_run` redaka po izvođenju (zadano 10000) tako da se veliki zaostatak iscrpljuje kroz nekoliko otkucaja umjesto da blokira jedan.
- **Dostava** — kursor se pomiče tek nakon što se `send()` riješi. Neuspješna serija ostavlja pokazivač tamo gdje je bio, tako da se isti redovi ponovno pokušavaju pri sljedećem izvođenju. Jamstvo je najmanje jednom plus deduplikacija na odredišnoj strani, a ne točno točno jednom: BigQuery ključa svaki red prema ID-u dnevnika poziva, koji poštuje na temelju najboljeg napora unutar vlastitog prozora deduplikacije.
- **Zaštita preklapanja** — cron tick i `POST .../run` mogu pucati zajedno. Odredište koje se već ispušta se preskače umjesto da se ispušta dvaput (`skipped: true` u rezultatu izvođenja), tako da istovremeno izvođenje ne može ponovno poslati seriju ili pisati kursor unatrag.
- **Oporavak od čišćenja** — ako `cursor_row_id` završi iznad `MAX(rowid)` (cijela tablica je očišćena i rowids ponovno pokrenuti), runner se vraća na 0 umjesto da trajno oslijepi.

### Izolirani trkač i ograničenja

Svako odredišno pokretanje na Nodeu pokreće zasebni, kratkotrajni OS podređeni proces (`child_process` sa IPC, ne `worker_threads`). Body reads, payload JSON parsing/serialization, odredište `prepare()` i odredišna mreža I/O rade tamo, a ne u petlji događaja poslužitelja. Samo konfiguracijske i male poruke o napretku prelaze IPC; izvezeni zapisi nikada se ne vraćaju na poslužitelj. Cron posao i ruta Run now zadržavaju isti javni rezultat i preklapaju se.

Dijete otvara poslužiteljski razriješeni `DATA_DIR/storage.sqlite` samo za čitanje koristeći `node:sqlite`, sa `busy_timeout=5000` i `query_only=ON`. Ne uvozi DB singleton i ne izvodi migracije, sigurnosne kopije ili SQLite ažuriranja. Knjigovodstvo Missing/corrupt artefakta (uključujući corrupt-artefact UPDATE) ostaje samo u putanji detalja nadzorne ploče. Oba puta dijele čisti razlučivač detalja; izvoz koristi čitanje asinkronog datotečnog sustava i isti artefakt → legacy inline → legacy disk → none resolution order. Pokretanje snima maksimalni redak umetanja kada dijete otvori svoj čitač; kasniji umetci čekaju sljedeće pokretanje. Ovo je granica umetanja, a ne dugotrajna SQLite transakcija: WAL zapisivači i kontrolne točke ostaju slobodni tijekom mrežnih čekanja. Updates/deletions postojećih redaka nisu zamrznuti ovom granicom.

Nakon svake prihvaćene serije, dijete čeka potvrdu. Poslužitelj prvo drži kursor sa `advanceLogExportCursor`, zatim šalje `ack`; nijedna sljedeća serija ne počinje prije njega. Neuspješno slanje, rušenje ili vremensko ograničenje bilježi neuspjeh bez napredovanja te serije. Prethodno potvrđene serije ostaju predane; najviše jedna nepotvrđena serija može se ponovno poslati. Uspjeh se bilježi samo nakon `done` i čistog izlaza djeteta. Neuspjesi prekidaju dijete sa SIGTERM, eskalirajući na SIGKILL nakon 500 ms, a pokretač čeka zatvaranje procesa.

| Varijabla okoline                             | Zadano | Svrha                                         |
| --------------------------------------------- | ------ | --------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Ograničenje zidnog sata po odredištu          |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Podređeni V8 ograničenje starog prostora u MB |

Invalid/non-positive/non-integer vrijednosti koriste zadane vrijednosti. Postavka gomile nije ukupno RSS ograničenje; vrlo velike serije još uvijek mogu iscrpiti dječju memoriju i sigurno propasti. Zadana postavka 1024 MB ostavlja prostora za zadanu seriju od 500 redaka od 512 KiB artefakata s omogućenim tijelima, uključujući BigQuery-ovu JSON serijalizaciju podijeljenu u bajtove. To ne čini seriju tijela od 10 000 redaka sigurnom. Iscrpljenost hrpe V8 bilježi grešku koja se može poduzeti: smanjite veličinu serije ili povećajte `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursor ostaje na zadnjoj potvrđenoj seriji. Povijesna inline/disk tijela nisu pokrivena kapom modernih artefakata. Operateri moraju zasebno proračunati RSS, posebno unutar spremnika s ograničenom memorijom.

Dijete nasljeđuje samo razriješeni `DATA_DIR`, `NODE_ENV`, eksplicitni `TZ` (razlučivost naslijeđenog naziva datoteke u lokalnom vremenu), `ELECTRON_RUN_AS_NODE` kada je prisutan i sljedeće izlazne ulaze: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (i njihovi oblici malim slovima), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Globalni Undici dispečer dijeli serverovo čisto okruženje-proxy rezoluciju i pravila zaobilaženja lokalnog hosta, uključujući `NO_PROXY`; ne uvozi `proxyFetch.ts` ili njegove DB/feature oznake. Proxy vjerodajnice se redigiraju iz proslijeđenog izlaza i snimljenih pogrešaka. Odredišne vjerodajnice putuju samo u jednoj početnoj IPC poruci, nikad argv ili okruženje; output/error prosljeđivanje ima prefiks i sanirano. Samo je `ExperimentalWarning` onemogućen u podređenim exec argumentima kako bi se izbjeglo ponavljanje Nodeovog SQLite upozorenja pri svakom pokretanju crona; druge vrste upozorenja ostaju vidljive.

Odredišni moduli moraju se moći uvoziti bez ovisnosti Next.js/server-only. Postojeća BigQuery implementacija već ispunjava taj ugovor. Predmemorija tokena pristupa traje samo za podređeno izvođenje, a ne za više izvođenja. Čvor je podržano vrijeme izvođenja (`package.json` motori). Postoji najbolja, nepodržana putanja kompatibilnosti Bun (`bun:sqlite` u `src/lib/db/core.ts` / adapterima i `Dockerfile.bun`), tako da se izvozi ne smiju prekinuti ispod njega. Pod Bun, izvozi zadržavaju prethodnu putanju unutar procesa i emitiraju jednokratno upozorenje: izolacija djeteta heap/timeout nije dostupna. Koristite Node za petlju događaja i OOM izolaciju.

Kada je `includeBodies` omogućen, preferirajte kadencu na razini minute kao što je `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` umjesto gomilanja zaostatka korisnog opterećenja po satu. Ograničenja serije i redaka i dalje su vezana za svako izvođenje. Pokretanje procesa plaća se po odredištu po izvođenju; ovo mijenja mali trošak pokretanja za izolaciju petlje događaja poslužitelja, a ne smanjenu ukupnu upotrebu CPU.

### Korisni teret (upiti i dovršeci)

Prema zadanim postavkama izvoz sadrži samo polja sažetka Dnevnike** popis** pokazuje. Uključivanje** Izvoz upita i odgovora** (`includeBodies`) dodatno isporučuje ono što Dnevnici** detalj** okno prikazuje za svaki poziv:

| Polje                            | Što sadrži                                                         |
| -------------------------------- | ------------------------------------------------------------------ |
| `request_body` / `response_body` | Opterećenje poziva kako ih prikazuje nadzorna ploča                |
| `pipeline_route_decision`        | Koji cilj i model je ruter odabrao                                 |
| `pipeline_client_request`        | Neobrađeni zahtjev točno onakav kakvog ga je klijent poslao        |
| `pipeline_openai_request`        | Nakon prevođenja u unutarnji OpenAI oblik                          |
| `pipeline_provider_request`      | Kao što je zapravo poslano uzvodno, na dijalektu pružatelja usluga |
| `pipeline_provider_response`     | Sirovi uzvodni odgovor                                             |
| `pipeline_client_response`       | Ono što je vraćeno pozivatelju                                     |
| `pipeline_error`                 | Detalj pogreške na razini cjevovoda za neuspjeli poziv             |
| `bodies_truncated`               | Istina kada bilo koje polje iznad pogodi `maxBodyBytes`            |

Ovo je promptan sadržaj, tako je** isključeno prema zadanim postavkama** i namjerno izbor po odredištu. Ono što se šalje je ono što pokazuje nadzorna ploča, jer izvoz i `getCallLogById` dijele rezoluciju detalja: korisni podaci su već pročišćeni PII-om i tajno redigirani kada su napisani, a poziv upućen s ključem `noLog` API uopće ne pohranjuje korisni sadržaj, tako da nema ništa za izvoz.

Korisni učinci se čitaju po retku iz artefakta datotečnog sustava, tako da se hidratacija izvodi samo za odredišta koja su to tražila. Artefakt koji nedostaje ili je oštećen izvozi svoj sažetak s nultim korisnim opterećenjem umjesto da ne uspije u paketu i nasuka kursor.

`maxBodyBytes` (zadano 262144) ograničava svako polje. Duži nosivi tereti su** krnji, a ne ispušteni** — isječeni prompt i dalje odgovara "ono što je postavljeno" — i red je označen sa `bodies_truncated`. Streaming chunk-by-chunk delte se ne izvoze; sastavljeni odgovor je već u `pipeline_provider_response` i `pipeline_client_response`.

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

| Ključ                | Napomene                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP projekt koji sadrži skup podataka                                                                            |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                  |
| `location`           | Upotrebljava se samo kada treba stvoriti skup podataka (zadano `EU`)                                             |
| `serviceAccountJson` | Ključ servisnog računa. Tajna vrijednost: šifrirana u mirovanju, nikada se ne vraća                              |
| `autoCreate`         | Stvara nedostajući skup podataka/tablicu; uvjetno dodaje nullable stupce s dokazima o korištenju (zadano `true`) |

Servisni račun treba imati `bigquery.tables.updateData` za ciljnu tablicu, kao i
`bigquery.datasets.create` / `bigquery.tables.create` kada je `autoCreate` uključen.
Ažuriranje postojeće tablice radi dodavanja dvaju nullable polja s dokazima o korištenju također zahtijeva
`bigquery.tables.update`. Nedostajuća dozvola neuspješno završava izvoz bez pomicanja pokazivača.

Konfigurirana grupa je jedinica **pokazivača**, a ne HTTP jedinica: `send()` je dijeli na pozive
insertAll s najviše 500 redaka, pa veliki `batch_size` ne može dosegnuti ograničenje BigQueryja od 10 MB po zahtjevu.
Privremeni statusi (408/429/500/502/503/504) ponovno se pokušavaju do tri puta s eksponencijalnim
odmakom, uz ponovnu upotrebu istih insertIdova; pogreške autentikacije i sheme izbacuju iznimku pri prvom pokušaju,
umjesto da nepotrebno troše izvođenje.

Tablica stvorena prije nekoliko trenutaka još nije vidljiva krajnjoj točki za streaming, koja vraća
404 nekoliko sekundi. Taj se 404 ponovno pokušava, ali **samo kada je ova izvedba stvorila tablicu** —
uistinu nedostajuća tablica i dalje odmah uzrokuje neuspjeh. Imajte na umu da BigQuery odbija streaming umetanja
nekoliko minuta kada se tablica ponovno stvara pod nazivom koji je nedavno obrisan; to je svojstvo postupka
brisanja pa ponovnog stvaranja, stoga je bolje upotrijebiti novi naziv tablice nego obrisati postojeću i ponovno je dodati.

**Djelomični neuspjeh stiže kao HTTP 200 s nepraznim `insertErrors[]`.** To se tretira kao
neuspjeh i izbacuje iznimku, čime se sprječava pomicanje pokazivača iza redaka koje BigQuery nikada nije prihvatio;
`tests/unit/log-export-bigquery.test.ts` utvrđuje takvo ponašanje.

Prijenos je običan REST — samopotpisana RS256 asercija razmjenjuje se za pristupni token na adresi
`https://oauth2.googleapis.com/token`, a zatim se redci šalju u `tabledata.insertAll`. Ne dohvaća se nijedan Google SDK.
Pristupni tokeni predmemoriraju se unutar procesa po paru (servisni račun, opseg).

Stvorena tablica sadrži jedan stupac za svako polje kartice Logs, kao i `exported_at`, a strukturirana je za
način na koji se zapisnici poziva stvarno upituju:

- **Particionirano po danu na `timestamp`**, pa upit ograničen samo datumom skenira te dane.
- **Grupirano prema `api_key_name`, `provider`, `model`, `status`** (tim redoslijedom), pa filtriranje prema
  tome tko ga je pokrenuo, kamo je upućen ili je li neuspješan izostavlja blokove unutar svake particije. BigQuery
  dopušta najviše četiri stupca za grupiranje, a redoslijed je važan: filtar samo na `api_key_name` izostavlja blokove,
  dok ih filtar samo na `status` ne izostavlja.
- **Neobavezno zadržavanje particija** putem `partitionExpirationDays` (0 zadržava sve), primijenjeno
  prilikom stvaranja tablice.

Obje se postavke primjenjuju u trenutku stvaranja. Postojeća tablica zadržava postojeći raspored, stoga
odredište usmjerite na novi ID tablice ako ih želite usvojiti.

`tests/unit/log-export-bigquery.test.ts` potvrđuje da su mapiranje i shema tablice usklađeni, pa se novi stupac
zapisnika poziva ne može neprimjetno izgubiti tijekom izvoza.

Grupe se dijele prema **broju redaka i serijaliziranim bajtovima**. Sam broj redaka nije dovoljan
kada se izvoze sadržaji: 500 redaka koji sadrže upite mogu zauzimati desetke megabajta, a insertAll
odbija zahtjev veći od 10 MB. Grupe se zatvaraju na 500 redaka ili 9 MB, što god nastupi prije.

---

## 5. Odredište za OTLP/HTTP tragove

Konfiguracija upotrebljava `type: "otlp-http"`. Ovo je zakazani izvoz trajno pohranjenih
dnevnika poziva koji koristi pokazivač, a ne najbolji mogući odvod aktivnih događaja
usmjeravanja u `open-sse/services/routing/otel.ts`. Ne čita niti mijenja varijable
okruženja, mjerače vremena ili međuspremnike tog odvoda. Omogućavanje oba odredišta može
proizvesti dvije neovisne vrste raspona; upotrijebite opseg instrumentacije
`omniroute.log-export` kako biste razlikovali ove raspone dnevnika poziva.

| Key                      | Zadano / svrha                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `endpoint`               | Obavezan puni URL za tragove HTTP(S); sufiks `/v1/traces` se ne dodaje                       |
| `headers`                | Neobavezni retci `Name: value` ili JSON objekt nizova; šifrirano                             |
| `requestHeaderAllowlist` | Prazno (isključeno); nazivi/prefiksi zaglavlja klijenta koji se hvataju kao atributi raspona |
| `serviceName`            | `omniroute`; resurs `service.name`                                                           |
| `langfuseMapping`        | `false`; dodaje atribute generiranja/sesije/korisnika za Langfuse                            |
| `identity`               | `pseudonymous`, `keyName` ili `none`                                                         |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                      |
| `timeoutMs`              | `30000` po HTTP pokušaju                                                                     |
| `environment`            | Nije postavljeno; neobavezni `langfuse.environment`                                          |

Generička nadzorna ploča prikazuje ova polja. `paths` prihvaća API polje ili tekstualno
polje s točnim putanjama odvojenima novim recima/zarezima. Ugradnje, ponovno rangiranje i
druge putanje preskaču se ako nisu izričito dopuštene. Preskočeni retci i dalje pomiču
pokazivač; brojači `exported`/`exportedTotal` postojećeg pokretača broje obrađene retke
izvornika, uključujući filtrirane retke, a ne prihvaćene raspone. Filtriranje se obavlja
u podređenom procesu, bez promjene njegova IPC ugovora/pokazivača.

Validacija URL-ova upotrebljava pomoćnu funkciju `parseAndValidateNonMetadataUrl`, neovisnu
o bazi podataka, iz `src/shared/network/outboundUrlGuard.ts`: pravilo `block-metadata`.
Ono ima iste bezuvjetne provjere metapodataka/protokola/ugrađenih vjerodajnica kao
validator web-dojavnika, uz omogućene privatne URL-ove, ali namjerno dopušta odredišta
localhosta/LAN-a bez globalnog nadjačavanja zastavice značajke. To omogućuje krajnje
točke za samostalno hostane Langfuse, Phoenix, Tempo i Collector usluge, uključujući
privatne HTTP krajnje točke. Glavena metapodataka u oblaku uvijek su blokirana.
Preusmjeravanja se ne slijede, pa kolektor ne može preusmjeriti vjerodajnice na drugog
glavnog računala. Kao i postojeća leksička zaštita URL-ova, ovo ne veže razrješenje DNS-a;
konfigurirajte samo glavna računala kojima upravlja operater. Kad krajnja točka nije na
mreži kojoj vjerujete, prednost dajte HTTPS-u.

### Sadržaj i isporuka

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) prenosi
jedan raspon CLIENT po dopuštenom retku, nazvan njegovom točnom putanjom zahtjeva.
Naziv putanje razlikuje Chat Completions, Responses i Messages bez ugrađivanja podataka
o modelu ili identitetu u naziv raspona. Atributi resursa uključuju `service.name` i
`service.version` paketa.

Uobičajeni zapisivač pokušaja razgovora
(`open-sse/handlers/chatCore/attemptLogging.ts`) zapisuje
`duration = Date.now() - startTime` pri dovršetku i ne navodi vremensku oznaku;
`saveCallLogOperation` u `src/lib/usage/callLogs.ts` prema zadanim postavkama postavlja
vremensku oznaku na vrijeme zapisivanja (dovršetka). Izvoz stoga postavlja kraj na
vremensku oznaku retka, a početak na kraj − trajanje (milisekunde pretvorene u decimalne
nanosekunde). Povijesne vremenske oznake koje je dostavio pozivatelj također se čuvaju
kao vrijeme završetka; ne postoji razlikovanje početka/dovršetka po retku. Null trajanje
postaje nula. Nevažeće ili nedostajuće vremenske oznake uzrokuju neuspjeh serije umjesto
stvaranja nedeterminističkih raspona. `ttftMs` može biti null i preslikava se u
`omniroute.ttft_ms`.

Atributi uključuju `gen_ai.operation.name="chat"`, pružatelja, zatraženi/model odgovora,
ulazne/izlazne tokene, neobavezne tokene čitanja predmemorije/stvaranja predmemorije/
rasuđivanja, HTTP status, kombinaciju, izvor predmemorije, oznaku sesije i ID korelacije.
Cjelobrojne OTLP vrijednosti i vremenske oznake decimalni su nizovi; nizovi, Booleove
vrijednosti i razlomljeni brojevi upotrebljavaju svoje izvorne OTLP varijante vrijednosti.
Raspone s pogreškom imaju status ERROR i pročišćenu statusnu poruku. Kanonski zapis ne
sadrži URL glavnog računala uzvodne usluge, pa se `server.address` izostavlja umjesto
netočnog identificiranja kolektora kao poslužitelja modela. Trošak se ne izvozi.

Samo `includeBodies=true` dohvaća sadržaj. Uz `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` sadrže pročišćeni JSON tijela zahtjeva/
odgovora kako ga pohranjuje OmniRoute (kanoniziran kada ga je moguće raščlaniti), a ne
preoblikovano polje poruka semantičkih konvencija. Skraćena/ne-JSON tijela ostaju
neobrađeni tekst. Uz `langfuseMapping=true`, tijela se emitiraju samo kao
`langfuse.observation.input` / `langfuse.observation.output`; atributi
`gen_ai.*.messages` izostavljaju se kako bi se svako tijelo poslalo jednom. Oba načina
nasljeđuju `maxBodyBytes` iz postojećeg puta dohvaćanja;
`omniroute.bodies_truncated=true` označava skraćivanje.
Ovo odredište ne dodaje dodatne snimke cjevovoda niti čitanja nesanitiziranih artefakata;
neobavezno hvatanje zaglavlja zahtjeva upotrebljava postojeću snimku klijenta dohvaćenu
u nastavku. Pri izvozu tijela koristite učestalost na razini minute, primjerice
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, umjesto nakupljanja satnog zaostatka.

### Neobavezna zaglavlja zahtjeva klijenta

Hvatanje zaglavlja prema zadanim je postavkama **isključeno**. Postavite
`requestHeaderAllowlist` u konfiguraciji odredišta i omogućite **Izvoz upita i odgovora**
(`includeBodies: true` na odredištu).
Popis dopuštenih vrijednosti prihvaća API polje ili tekstualno polje s nazivima odvojenima
novim recima/zarezima:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nazivi se podudaraju bez obzira na velika i mala slova i moraju biti identični, osim ako jedan završni znak `*` odabire neprazan prefiks naziva zaglavlja. Samostalni znak `*`, ugrađeni zamjenski znakovi i nevažeći nazivi HTTP zaglavlja odbacuju se.
Postoji najviše 64 selektora, a svaki naziv/prefiks može imati najviše 256 ASCII bajtova.
Ova je postavka odvojena od `headers`, koji autentificira izvoznik prema sakupljaču.

Hvatanje čita samo `pipeline_client_request`, popunjen iz spremljenog detaljnog pipelinea putem
`clientRawRequest` (ili naslijeđenog `clientRequest`). Nikad se ne vraća na zaglavlja zahtjeva pružatelja.
Detaljno zapisivanje pipelinea moralo je biti omogućeno u trenutku bilježenja zahtjeva. Kada je
`includeBodies` onemogućen ili nedostaje, oštećen je ili je JSON snimke klijenta skraćen, ne emitiraju se atributi zaglavlja. Povećavanje `maxBodyBytes` može spriječiti skraćivanje snimke tijekom izvoza;
ne može vratiti pojedinosti koje nikad nisu spremljene. Snimka veća od 1 MiB ili ona koja sadržava više od
256 unosa zaglavlja zanemaruje se. Postojeći izvoz upita/odgovora ostaje omogućen uz hvatanje zaglavlja; popis dopuštenih ne omogućuje način hidratacije samo zaglavlja.

Odabrane vrijednosti postaju OTLP nizovi znakova `http.request.header.<full lowercase header name>`,
čak i kada je riječ o jednom nizu. Na primjer, `X-OmniRoute-Meta-Team: example-team` postaje
`http.request.header.x-omniroute-meta-team` s
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Puni prefiks se zadržava: to su obična zaglavlja, bez raščlambe poslovnih polja ili pretvorbe u
`omniroute.metadata.*` / Langfuse metapodatke. `langfuseMapping` ne mijenja semantiku zaglavlja. Odabrani `User-Agent` s jednom vrijednošću također postavlja standardni skalarni atribut
`user_agent.original`. Zarezi unutar jedne vrijednosti ne dijele se. Varijante velikih i malih slova spajaju se redoslijedom spremljenih unosa; svaka nevažeća varijanta izostavlja cijelo to zaglavlje. Atributi su poredani prema nazivu malim slovima.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, zaglavlja API ključeva, nazivi koji sadržavaju oznake auth/token/secret/password/credential i interne vjerodajnice pristupnika uvijek se izuzimaju, čak i ako su odabrani ili djelomično maskirani u pohrani. Poznati obrasci vjerodajnica ponovno upotrebljavaju zajednički detektor vjerodajnica; oznake redigiranja izostavljaju se, ne izvoze se kao sigurne vrijednosti.
Prihvaćaju se samo nizovi znakova i neprazni nizovi znakova; brojevi i objekti ne pretvaraju se prisilno. Nevažeći nazivi, ključevi prototipa, kontrolni znakovi (osim horizontalne tabulacije) i neispravan Unicode zanemaruju se bez neuspjeha serije ili odražavanja njihova sadržaja u pogreškama.

Svaki span obuhvaća najviše 32 zaglavlja, 16 vrijednosti po zaglavlju, 4096 UTF-8 bajtova po vrijednosti i 16384 ukupnih UTF-8 bajtova za sva uhvaćena imena i vrijednosti zaglavlja. Prevelika/nevažeća zaglavlja izostavljaju se u cijelosti, ne skraćuju se. Odabir je odluka operatora o privatnosti: naizgled sigurna imena i dalje mogu sadržavati osobne podatke, a ova ograničenja/detektori nisu opći čistač PII-ja.

### Ograničenja isporuke

Zahtjevi su ograničeni na 500 spanova i 4 MiB UTF-8 JSON-a, uključujući omotač.
Veličina svakog dopuštenog spana provjerava se prije prvog zahtjeva serije kursora. Ako je pojedinačni
span veći od ograničenja, nijedan dio te serije ne šalje se i postupak ne uspijeva uz upute za smanjenje
`maxBodyBytes`; ne odbacuje se nečujno. Predprovjera zadržava samo reference zapisa
i broj bajtova, odbacujući svaki privremeni span/JSON; spanovi se ponovno grade za ograničene dijelove
umjesto da se zadržava druga serijalizirana kopija serije. HTTP 408/429/5xx, mrežni neuspjesi i vremenska ograničenja imaju najviše
tri pokušaja, s eksponencijalnim čekanjem od 250/500 ms. Sekunde u `Retry-After` ili HTTP datumi
mogu produljiti čekanje do 5 sekundi. Ostali statusi odmah uzrokuju neuspjeh. Djelomično odbijanje OTLP-a s odgovorom 2xx također uzrokuje pogrešku umjesto
potvrđivanja izgubljenog spana; prazne ili valjane JSON potvrde prihvaćaju se, uz
ograničenje čitanja odgovora od 64 KiB.

Pogreške sadržavaju samo činjenice kojima upravlja izvoznik: HTTP status, klasu ponovnog pokušaja, broj pokušaja i broj poslanih spanova ili fiksni tekst o neuspjehu potvrde/mreže. Tijela odgovora sakupljača, broj djelomičnih uspjeha i zaglavlja odgovora nikad se ne kopiraju u pogreške, zapisnike ili nadzornu ploču. Neuspjela ili djelomično prihvaćena serija ne potvrđuje se: odredište prikazuje stanje Failing s tim statusom, kursor ostaje na posljednjoj potvrđenoj seriji, a sljedeće pokretanje ponovno šalje iste retke. Trajni statusi nastavljaju uzrokovati neuspjeh dok se sakupljač ili konfiguracija ne poprave. Za pojedinosti o odgovorima koristite vlastite zapisnike sakupljača. Sažeci pogrešaka zapisnika poziva zadržavaju svoje zasebno redigiranje.
`prepare()` ne osigurava ništa; Test šalje točno `{"resourceSpans":[]}` i prijavljuje
HTTP status bez zapisivanja spanova zapisnika poziva.

ID-ovi tragova i ID-ovi spanova prvi su 32/16 heksadecimalnih znamenki SHA-256 vrijednosti nad
`"omniroute.trace\\0" + callLogId` i `"omniroute.span\\0" + callLogId`. Ponovna slanja sadržavaju
identične ID-ove. To nije jamstvo deduplikacije: neki pozadinski sustavi, uključujući Langfuse
v4 ingestion, ne dedupliciraju spanove s istim ID-om. Pad sustava ili neuspjeh djelomičnog dijela može
ponovno poslati najviše jednu nepotvrđenu seriju kursora; cijela se ta serija može duplicirati,
a ne samo njezin posljednji HTTP dio. Pri odabiru veličine serije kursora uzmite u obzir taj kompromis.

### Primjer za Langfuse

Konfigurirajte ova polja za samostalno hostanu instancu Langfusea:

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

Lokalno izgradite vrijednost Authorization kao Base64 doslovnog niza `public-key:secret-key`
(na primjer pomoću `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Ne umećite stvarne vjerodajnice u zapisnike, snimke zaslona ili prijave problema. Mapiranje automatski
postavlja `x-langfuse-ingestion-version: 4`; Authorization se i dalje navodi u `headers`.
I zaglavlja i generirana sol identiteta upotrebljavaju postojeći mehanizam šifriranih tajnih polja i API rezerviranih mjesta; potreban je `STORAGE_ENCRYPTION_KEY`.

Mapiranje dodaje vrstu/model generiranja, pojedinosti o upotrebi JSON-a (ulaz/izlaz/ukupno i dostupni
ključevi predmemorije), snimke ulaza/izlaza JSON-a, razinu ERROR/DEFAULT, sanitiziranu statusnu poruku,
naziv traga, ID sesije, neobavezno okruženje i filtrirajući
`langfuse.observation.metadata.<key>` za pružatelja, zatraženi model, putanju, kombinaciju, izvor
predmemorije i status. `langfuse.observation.completion_start_time` zapisuje se u formatu ISO 8601 pri
početku + TTFT samo kada je TTFT poznat i unutar trajanja. Atributi troška se ne šalju.

Načini identiteta primjenjuju se na `langfuse.user.id`:

- `pseudonymous` (zadano): HMAC-SHA256 internog ID-a API ključa s nasumičnom
  32-bajtnom solju specifičnom za odredište. Sol se generira pri stvaranju ako ne postoji, šifrira
  kao `identitySalt`, nikad se ne vraća i zadržava se tijekom uređivanja. Sirovi ID-ovi ključeva nikad se ne
  stavljaju u atribute raspona. Ponovno stvaranje/rotiranje soli odredišta mijenja identitete.
- `keyName`: konfigurirani naziv API ključa, čime se namjerno otkriva ta oznaka operatora.
- `none`: nema korisničkog ID-a. Oznake sesije i dalje se izvoze kada postoje; ti načini ne
  anonimiziraju proizvoljan sadržaj upita ni oznake sesije/korelacije koje je dostavio operator.

### Pokretanje bez dopune

Samo pri stvaranju omogućite **Pokreni s trenutačnog položaja (preskoči postojeće zapisnike)** ili proslijedite
`startFromCurrentPosition: true` na najvišoj razini korisnog tereta API-ja za stvaranje. Time se
`cursor_row_id` inicijalizira na trenutačni maksimalni rowid retka dnevnika poziva koji se zadržava, pomoću postojećih
pomoćnika pokazivača, bez migracije. Zadana je vrijednost false (pokazivač 0 i dopuna zadržane povijesti).
To nije postavka za ponovno postavljanje pokazivača pri ažuriranju.

Zajedničko dodavanje `ttftMs` također dodaje nullable stupac `ttft_ms` u BigQuery mapper
i shemu nove tablice: njegov test sheme zahtijeva da svako kanonsko polje zapisa ima
stupac. Postojeće tablice nastavljaju se izvoziti nepromijenjeno: `prepare()` čita shemu tablice
i izostavlja samo `ttft_ms` kada taj stupac ne postoji. Dodajte nullable stupac INT64 da biste dobili TTFT
pri sljedećem pokretanju ili upotrijebite novu tablicu. Neobavezni stupac TTFT ne pokreće ažuriranje sheme. Stupci s dokazima o upotrebi
slijede uvjetni tok kompatibilnosti uz izričito uključivanje u nastavku; druga polja retka zadržavaju strogu
provjeru sheme.

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

- **Nadzorna ploča**: Integrations → Log export. Dodajte odredište, pokrenite **Test** da biste provjerili vjerodajnice
  bez zapisivanja redaka, a zatim ga omogućite.
- **Zaostatak**: kartica svakog odredišta prikazuje retke na čekanju i pokazivač; `GET
/api/log-export/status` vraća iste podatke te posljednjih 20 pokretanja poslova.
- **Neuspjeh jednog odredišta ne uzrokuje neuspjeh ostalih** — sažetak pokretanja bilježi status po odredištu
  u `last_status` / `last_error`, a povijest pokretanja poslova zadržava objedinjeni status.
- **Brisanjem odredišta briše se njegov pokazivač.** Ponovno dodavanje započinje od najstarijeg zadržanog
  zapisa dnevnika poziva, čime se ponovno šalju retci koje odredište možda već sadrži. Na BigQueryju `insertId` po retku
  uklanja duplikate samo unutar vlastitog BigQuery prozora za deduplikaciju, stoga je bolje onemogućiti
  odredište nego ga brisati.

### Kompatibilnost sheme dokaza o korištenju

Nove BigQuery tablice uključuju nullable `usage_evidence` (STRING koji sadrži JSON) i
`usage_estimated` (BOOL). Kada je `autoCreate` omogućen, postojeća tablica može primiti
samo te nedostajuće nullable stupce. Izvoznik čuva cijelu postojeću shemu, uključujući metapodatke polja,
i šalje uvjetni PATCH koristeći vraćeni etag. Istodobna promjena sheme neuspješno završava izvoz umjesto
da je prebriše; sljedeće pokretanje ponovno čita tablicu.

Kada je `autoCreate` onemogućen, dodajte te stupce sami prije izvoza zapisa
s dokazima o korištenju. Nedostajući metapodaci sheme/etaga ili neuspjelo ažuriranje također sprječavaju umetanje
zapisa koji sadrže dokaze. Pokazivač izvoza ne napreduje nakon tog neuspjeha i dokazi se nikada ne odbacuju
neprimjetno. Lokalno zadržavanje dnevnika i dalje se primjenjuje dok je izvoz blokiran, stoga riješite neuspjeh
prije nego što zadržani izvorni retci isteknu.
