# Log export (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Export continuu și incremental al jurnalelor de apeluri OmniRoute către un depozit extern de date analitice.

Fila Logs a tabloului de bord păstrează istoricul solicitărilor în SQLite (`call_logs`), acesta fiind limitat prin rotație și retenție. Exportul jurnalelor trimite periodic același set de înregistrări, astfel încât acestea să poată exista mai mult decât baza de date locală și să poată fi corelate cu alte date. BigQuery este prima destinație; conducta folosește un registru, astfel încât pot fi adăugate și alte destinații.

---

## 1. Cum funcționează

```
server (decriptează + validează configurația, reconciliază cursorul)
  → pornește IPC → proces OS exportChild izolat
    → storage.sqlite doar în citire → interogare/mapare partajată a jurnalului de apeluri
      → încărcare asincronă a artefactelor → prepare()/send() pentru destinație
        → IPC pentru lot → serverul persistă cursorul → confirmare IPC
          → lotul următor; IPC de finalizare → serverul înregistrează succesul
```

- **Programare** — o singură sarcină cron `JobRegistry`, `log_export`, cu valoarea implicită `0 * * * *` (la fiecare oră,
  UTC). Este înregistrată în `src/lib/initCloudSync.ts`; poate fi suprascrisă cu `OMNIROUTE_LOG_EXPORT_CRON`.
  La fiecare execuție sunt procesate secvențial toate destinațiile **activate**.
- **Cursor** — valoarea implicită `call_logs.rowid` din SQLite, persistată pentru fiecare destinație în
  `log_export_destinations.cursor_row_id`. `timestamp` nu este în mod intenționat cursorul: apelanții
  își pot furniza propria valoare, astfel încât o solicitare lentă poate fi scrisă după una mai rapidă care a început
  ulterior, iar un cursor bazat pe marcajul temporal ar omite-o.
- **Procesare în loturi** — `batch_size` rânduri per solicitare (implicit 500), `max_rows_per_run` rânduri per execuție
  (implicit 10000), astfel încât un volum restant mare să fie procesat pe parcursul mai multor execuții, în loc să blocheze una singură.
- **Livrare** — cursorul avansează numai după ce `send()` se finalizează. Un lot eșuat lasă
  cursorul în poziția în care se afla, astfel încât aceleași rânduri sunt reîncercate la următoarea execuție. Garanția este
  de cel puțin o livrare, împreună cu deduplicarea la nivelul destinației, nu de exact o singură livrare reală: BigQuery identifică fiecare
  rând după ID-ul jurnalului de apeluri, pe care îl respectă în regim best-effort în propria fereastră de deduplicare.
- **Protecție împotriva suprapunerii** — execuția cron și `POST .../run` pot porni simultan. O destinație
  aflată deja în curs de procesare este omisă, în loc să fie procesată de două ori (`skipped: true` în rezultatul execuției),
  astfel încât o execuție concurentă nu poate retrimite un lot și nici nu poate muta cursorul înapoi.
- **Recuperare după ștergere** — dacă `cursor_row_id` ajunge deasupra valorii `MAX(rowid)` (întregul tabel a fost
  golit, iar valorile rowid au fost reluate), runnerul revine la 0 în loc să rămână permanent fără vizibilitate.

### Runner izolat și limite

Fiecare execuție a unei destinații pe Node pornește un proces copil OS separat și de scurtă durată (`child_process`
cu IPC, nu `worker_threads`). Citirea corpurilor, parsarea/serializarea JSON a payloadurilor, operația
`prepare()` a destinației și I/O-ul de rețea al destinației rulează toate acolo, nu în bucla de evenimente a serverului.
Prin IPC trec numai configurația și mesajele mici de progres; înregistrările exportate nu revin niciodată la
server. Sarcina cron și ruta Run now păstrează același rezultat public și aceeași protecție împotriva suprapunerii.

Procesul copil deschide baza de date `DATA_DIR/storage.sqlite` rezolvată a serverului doar în citire, folosind `node:sqlite`,
cu `busy_timeout=5000` și `query_only=ON`. Nu importă niciun singleton pentru baza de date și nu efectuează
migrări, copii de rezervă sau actualizări SQLite. Evidența artefactelor lipsă/deteriorate (inclusiv
operația UPDATE pentru artefactul deteriorat) rămâne numai în fluxul de detalii al tabloului de bord. Ambele fluxuri partajează un resolver
pur pentru detalii; exportul folosește citiri asincrone din sistemul de fișiere și aceeași ordine de rezolvare
artefact → conținut inline moștenit → disc moștenit → nimic. O execuție capturează valoarea rowid maximă a inserărilor
atunci când procesul copil își deschide cititorul; inserările ulterioare așteaptă execuția următoare. Aceasta este o limită
de inserare, nu o tranzacție SQLite de lungă durată: scrierile și punctele de control WAL rămân libere în timpul
așteptărilor de rețea. Actualizările/ștergerile rândurilor existente nu sunt înghețate de această limită.

După fiecare lot acceptat, procesul copil așteaptă o confirmare. Serverul persistă mai întâi
cursorul cu `advanceLogExportCursor`, apoi trimite `ack`; niciun lot următor nu pornește înainte de aceasta.
Un eșec de trimitere, un crash sau expirarea timpului înregistrează eșecul fără a avansa lotul respectiv. Loturile
confirmate anterior rămân salvate; cel mult un singur lot neconfirmat poate fi retrimis.
Succesul este înregistrat numai după `done` și o închidere fără erori a procesului copil. Eșecurile opresc procesul copil
cu SIGTERM, escaladând la SIGKILL după 500 ms, iar runnerul așteaptă închiderea procesului.

| Variabilă de mediu                            | Valoare implicită | Scop                                          |
| --------------------------------------------- | ----------------- | --------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000            | Limită de timp per destinație                 |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024              | Limita spațiului vechi V8 pentru copil, în MB |

Valorile nevalide/negative sau nule/care nu sunt numere întregi folosesc valorile implicite. Setarea heapului nu reprezintă o limită
RSS totală; loturile foarte mari pot epuiza în continuare memoria procesului copil și pot face ca execuția să eșueze în siguranță.
Valoarea implicită de 1024 MB lasă suficientă rezervă pentru lotul implicit de 500 de rânduri cu artefacte de 512 KiB și
corpuri activate, inclusiv serializarea JSON pe segmente de octeți din BigQuery. Aceasta nu face sigur
un lot de 10000 de rânduri cu corpuri. Epuizarea heapului V8 înregistrează un eșec cu instrucțiuni aplicabile: reduceți dimensiunea lotului
sau măriți `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; cursorul rămâne la ultimul lot
confirmat. Corpurile istorice inline/de pe disc nu sunt acoperite de limita modernă pentru artefacte.
Operatorii trebuie să bugeteze separat memoria RSS, mai ales în containere cu memorie limitată.

Procesul copil moștenește numai valoarea rezolvată `DATA_DIR`, `NODE_ENV`, valoarea explicită `TZ` (rezolvarea după ora
locală a numelor de fișiere moștenite), `ELECTRON_RUN_AS_NODE` atunci când este prezentă și următoarele intrări pentru conexiunile de ieșire:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (și formele lor scrise cu litere mici),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Un dispatcher Undici global partajează rezolvarea pură a proxyului din mediu și regulile de evitare pentru gazdele locale
ale serverului, inclusiv `NO_PROXY`; acesta nu importă `proxyFetch.ts` și nici baza de date/feature flagurile sale.
Datele de autentificare pentru proxy sunt redactate din ieșirea redirecționată și din erorile înregistrate. Datele de autentificare ale destinației
circulă numai într-un singur mesaj IPC de pornire, niciodată prin argv sau mediu; redirecționarea ieșirii/erorilor este
prefixată și igienizată. Numai `ExperimentalWarning` este dezactivat în argumentele de execuție ale procesului copil, pentru a evita
repetarea avertismentului SQLite al Node la fiecare execuție cron; celelalte tipuri de avertismente rămân vizibile.

Modulele de destinație trebuie să poată fi importate fără dependențe Next.js sau exclusiv pentru server. Implementarea
BigQuery existentă respectă deja acest contract. Cache-urile tokenurilor de acces persistă doar pe durata
execuției procesului copil, nu și între execuții. Node este mediul de execuție acceptat (secțiunea `engines` din `package.json`), însă secțiunea
de instalare Bun din README și `Dockerfile.bun` promovează și o cale de compatibilitate pentru producție care utilizează
`bun:sqlite` (`src/lib/db/core.ts` / adaptoare). Prin urmare, sub Bun, exporturile păstrează calea anterioară
din cadrul procesului și emit o singură avertizare: izolarea memoriei heap și a expirării procesului copil nu este disponibilă. Utilizați
Node pentru izolarea buclei de evenimente și a erorilor OOM; Bun nu este tratat aici ca fiind exclusiv pentru dezvoltare.

Când `includeBodies` este activat, preferați o cadență la nivel de minute, precum
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, în loc să acumulați un volum de sarcini utile pentru o oră.
Limitele pentru loturi și rânduri continuă să limiteze fiecare execuție. Costul pornirii procesului este suportat pentru fiecare destinație și pentru fiecare execuție;
astfel, un cost redus de pornire este acceptat în schimbul izolării buclei de evenimente a serverului, nu pentru reducerea utilizării totale a procesorului.

### Sarcini utile (prompturi și completări)

În mod implicit, exportul conține doar câmpurile rezumative afișate în **lista** Logs. Activarea opțiunii
**Exportă prompturile și răspunsurile** (`includeBodies`) trimite suplimentar ceea ce afișează panoul de **detalii**
Logs pentru fiecare apel:

| Câmp                             | Ce conține                                                           |
| -------------------------------- | -------------------------------------------------------------------- |
| `request_body` / `response_body` | Sarcinile utile ale apelului, așa cum le redă tabloul de bord        |
| `pipeline_route_decision`        | Ținta și modelul alese de router                                     |
| `pipeline_client_request`        | Solicitarea brută, exact așa cum a trimis-o clientul                 |
| `pipeline_openai_request`        | După traducerea în formatul OpenAI intern                            |
| `pipeline_provider_request`      | Așa cum a fost trimisă efectiv în amonte, în dialectul furnizorului  |
| `pipeline_provider_response`     | Răspunsul brut din amonte                                            |
| `pipeline_client_response`       | Ceea ce a fost returnat apelantului                                  |
| `pipeline_error`                 | Detaliile erorii la nivel de pipeline pentru un apel eșuat           |
| `bodies_truncated`               | True când oricare dintre câmpurile de mai sus a atins `maxBodyBytes` |

Acesta este conținutul promptului, deci opțiunea este **dezactivată în mod implicit** și este în mod intenționat o alegere pentru fiecare destinație.
Se trimite ceea ce afișează tabloul de bord, deoarece exportul și `getCallLogById` folosesc în comun
rezolvarea detaliilor: sarcinile utile sunt
deja igienizate de date cu caracter personal și au secretele mascate atunci când sunt scrise, iar un apel efectuat cu o cheie API
`noLog` nu stochează nicio sarcină utilă, deci nu există nimic de exportat.

Sarcinile utile sunt citite pentru fiecare rând din artefactul sistemului de fișiere, astfel încât hidratarea rulează doar pentru destinațiile
care au solicitat-o. În cazul unui artefact lipsă sau corupt, rezumatul acestuia este exportat cu sarcini utile nule, în loc ca
lotul să eșueze și cursorul să rămână blocat.

`maxBodyBytes` (implicit 262144) limitează fiecare câmp. Sarcinile utile mai lungi sunt **trunchiate, nu
eliminate** — un prompt scurtat răspunde în continuare la întrebarea „ce s-a solicitat” — iar rândul este marcat prin
`bodies_truncated`. Delta-urile transmise în flux, fragment cu fragment, nu sunt exportate; răspunsul asamblat se află
deja în `pipeline_provider_response` și `pipeline_client_response`.

---

## 2. Fișiere

| Componentă                    | Locație                                      |
| ----------------------------- | -------------------------------------------- |
| Contract destinație           | `src/lib/logExport/types.ts`                 |
| Registru                      | `src/lib/logExport/registry.ts`              |
| Gestionarea secretelor        | `src/lib/logExport/secrets.ts`               |
| Executor (IPC părinte)        | `src/lib/logExport/runner.ts`                |
| Ciclul de viață al procesului | `src/lib/logExport/childRunner.ts`           |
| Punct de intrare copil        | `src/lib/logExport/exportChild.ts`           |
| Deschidere doar în citire     | `src/lib/db/logExportReadOnly.ts`            |
| Interogare/mapare comună      | `src/lib/usage/callLogExportQueries.ts`      |
| Resolver de detalii           | `src/lib/usage/callLogDetailResolver.ts`     |
| Proiecție API                 | `src/lib/logExport/presenter.ts`             |
| Destinație BigQuery           | `src/lib/logExport/destinations/bigquery.ts` |
| Autentificare Google SA       | `src/lib/logExport/googleServiceAccount.ts`  |
| Sursă jurnal apeluri          | `src/lib/usage/callLogExportSource.ts`       |
| Persistență                   | `src/lib/db/logExportDestinations.ts`        |
| Sarcină cron                  | `src/lib/jobs/logExportJob.ts`               |
| Strat REST                    | `src/app/api/log-export/`                    |
| Pagina tabloului de bord      | `src/app/(dashboard)/dashboard/log-export/`  |

Schemă: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Toate rutele sunt autentificate pentru administrare (`requireManagementAuth`). Secretele nu sunt returnate niciodată:
un secret stocat este returnat ca valoarea literală `__stored__`, iar trimiterea acestei valori înapoi la actualizare
păstrează credențialul stocat.

Crearea sau actualizarea unei destinații al cărei tip declară un secret **necesită
`STORAGE_ENCRYPTION_KEY`**. Fără aceasta, `encrypt()` lasă în tăcere datele nemodificate, astfel încât scrierea este
refuzată cu un răspuns 400, în loc să introducă un credențial în SQLite ca text simplu (aceeași protecție pe care o
aplică webhook-ul Telegram).

| Metodă   | Cale                                     | Scop                                                                        |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipuri de destinații + lista câmpurilor de configurare                      |
| `GET`    | `/api/log-export/destinations`           | Listează destinațiile (secrete mascate)                                     |
| `POST`   | `/api/log-export/destinations`           | Creează o destinație                                                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Citește o destinație                                                        |
| `PUT`    | `/api/log-export/destinations/{id}`      | Actualizează numele / starea activată / configurația / procesarea pe loturi |
| `DELETE` | `/api/log-export/destinations/{id}`      | Șterge                                                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Verifică credențialele, fără a scrie nimic                                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Procesează acum, folosind aceeași cale ca execuția programată               |
| `GET`    | `/api/log-export/status`                 | Starea cron, execuțiile recente, restanțele per destinație                  |

`GET /api/log-export/types` este ceea ce face interfața generică: formularul din tabloul de bord este redat din
descriptorii de câmp returnați, astfel încât o destinație nouă nu necesită nicio modificare a interfeței.

---

## 4. Destinația BigQuery

Chei de configurare (`type: "bigquery"`):

| Cheie                | Note                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| `projectId`          | Proiectul GCP care conține setul de date                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                              |
| `tableId`            | `[A-Za-z0-9_]+`                                                              |
| `location`           | Utilizată numai când setul de date trebuie creat (implicit `EU`)             |
| `serviceAccountJson` | Cheia contului de serviciu. Secret: criptată la stocare, niciodată returnată |
| `autoCreate`         | Creează setul de date și tabelul la primul export (implicit `true`)          |

Contul de serviciu necesită `bigquery.tables.updateData` pentru tabelul țintă, plus
`bigquery.datasets.create` / `bigquery.tables.create` atunci când `autoCreate` este activat.

Un lot configurat este o unitate de **cursor**, nu una HTTP: `send()` îl împarte în apeluri insertAll
de cel mult 500 de rânduri, astfel încât un `batch_size` mare nu poate depăși limita BigQuery de 10 MB per cerere.
Stările tranzitorii (408/429/500/502/503/504) sunt reîncercate de până la trei ori, cu întârziere
exponențială, reutilizând aceleași insertIds; erorile de autentificare și de schemă sunt aruncate la prima încercare,
în loc să consume execuția.

Un tabel creat cu doar câteva momente în urmă nu este încă vizibil pentru endpoint-ul de streaming, care răspunde
cu 404 timp de câteva secunde. Acest 404 este reîncercat, dar **numai atunci când această execuție a creat tabelul** —
un tabel care lipsește cu adevărat eșuează în continuare imediat. Rețineți că recrearea unui tabel sub un nume care
a fost șters recent determină BigQuery să refuze inserările în streaming timp de câteva minute; aceasta este o
caracteristică a secvenței ștergere-urmată-de-recreare, așa că preferați un nume de tabel nou în locul ștergerii și
readăugării unuia.

**Un eșec parțial sosește ca HTTP 200 cu un `insertErrors[]` nevid.** Acesta este tratat drept
eșec și generează o excepție, ceea ce împiedică avansarea cursorului dincolo de rândurile pe care BigQuery nu le-a
acceptat niciodată; `tests/unit/log-export-bigquery.test.ts` fixează acest comportament.

Transportul folosește REST simplu — o aserțiune RS256 auto-semnată este schimbată pentru un token de acces la
`https://oauth2.googleapis.com/token`, apoi rândurile sunt trimise la `tabledata.insertAll`. Nu este inclus niciun SDK Google.
Tokenurile de acces sunt păstrate în cache în cadrul procesului pentru fiecare pereche (cont de serviciu, domeniu de acces).

Tabelul creat conține câte o coloană pentru fiecare câmp din fila Jurnale, plus `exported_at`, și este structurat în
funcție de modul în care sunt interogate efectiv jurnalele de apeluri:

- **Partiționat pe zile după `timestamp`**, astfel încât o interogare delimitată după dată scanează numai zilele respective.
- **Grupat după `api_key_name`, `provider`, `model`, `status`** (în această ordine), astfel încât filtrarea după
  cine a executat apelul, unde a fost direcționat sau dacă a eșuat elimină blocuri din fiecare partiție. BigQuery
  permite cel mult patru coloane de grupare, iar ordinea contează: un filtru doar după `api_key_name`
  elimină blocuri, iar un filtru doar după `status` nu o face.
- **Păstrare opțională a partițiilor** prin `partitionExpirationDays` (0 păstrează totul), aplicată
  atunci când este creat tabelul.

Ambele setări se aplică în momentul creării. Un tabel existent păstrează aspectul pe care îl are deja, așa că
indicați ca destinație un ID de tabel nou dacă doriți să le adoptați.

`tests/unit/log-export-bigquery.test.ts` verifică dacă mapperul și schema tabelului rămân
sincronizate, astfel încât o coloană nouă din jurnalul de apeluri să nu poată fi omisă în mod silențios la export.

Loturile sunt împărțite atât după numărul de rânduri, cât și după dimensiunea serializată în octeți. Numărul de rânduri nu este suficient
după exportarea sarcinilor utile: 500 de rânduri care conțin prompturi pot însuma zeci de megaocteți, iar insertAll
respinge o solicitare de peste 10 MB. Loturile sunt închise la 500 de rânduri sau la 9 MB, oricare prag este atins primul.

---

## 5. Adăugarea unei destinații

1. Creați `src/lib/logExport/destinations/<name>.ts`, exportând un `LogExportDestinationType`:
   o `configSchema` Zod, o matrice descriptivă `fields` pentru interfața cu utilizatorul, `secretFields` și o
   funcție `createClient(config)` care returnează `test()` / `prepare()` / `send(records)`.
2. Adăugați-o în matricea `DESTINATIONS` din `src/lib/logExport/registry.ts`.
3. Scrieți teste în `tests/unit/`.

Aceasta este întreaga modificare: persistența, sarcina cron, nivelul REST, criptarea secretelor și
formularul tabloului de bord citesc toate registrul.

Două reguli pentru o destinație nouă:

- `send()` **trebuie să genereze o excepție** în cazul unui eșec parțial. Rezolvarea înseamnă „destinația conține aceste rânduri”,
  iar cursorul avansează permanent dincolo de acestea.
- O destinație care acceptă un URL furnizat de utilizator trebuie să îl valideze prin
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) înainte de preluare,
  la fel ca webhook-urile. BigQuery nu necesită acest lucru: gazdele sale sunt constante.

---

## 6. Operare

- **Tablou de bord**: Integrări → Exportul jurnalelor. Adăugați o destinație, rulați **Testare** pentru a verifica acreditările
  fără a scrie rânduri, apoi activați-o.
- **Restanțe**: fiecare card de destinație afișează rândurile în așteptare și cursorul; `GET
/api/log-export/status` returnează aceleași date, plus ultimele 20 de execuții ale sarcinii.
- **Eșecul unei destinații nu le afectează pe celelalte** — rezumatul execuției înregistrează starea fiecărei destinații
  în `last_status` / `last_error`, iar istoricul execuțiilor sarcinii păstrează rezultatul agregat.
- **Ștergerea unei destinații îi șterge cursorul.** Adăugarea ei din nou pornește de la cel mai vechi
  jurnal de apeluri păstrat, ceea ce retrimite rânduri pe care destinația este posibil să le conțină deja. În BigQuery, valoarea `insertId`
  a fiecărui rând compensează acest lucru numai în intervalul propriu de deduplicare al BigQuery, așadar este preferabil să
  dezactivați o destinație în loc să o ștergeți.
