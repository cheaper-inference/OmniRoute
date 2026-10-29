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

## 5. Destinație pentru urme OTLP/HTTP

Configurația folosește `type: "otlp-http"`. Acesta este un export programat al jurnalelor de
apeluri persistate, bazat pe un cursor, nu destinația de colectare în timp real, fără garanția livrării,
a evenimentelor de rutare din
`open-sse/services/routing/otel.ts`. Nu citește și nu modifică variabilele de mediu,
temporizatoarele sau bufferele acelei destinații. Activarea ambelor poate produce două tipuri independente de spanuri;
folosiți domeniul de instrumentare `omniroute.log-export` pentru a distinge aceste spanuri ale jurnalelor de apeluri.

| Cheie                    | Valoare implicită / scop                                                                |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `endpoint`               | URL HTTP(S) complet obligatoriu pentru urme; nu se adaugă sufixul `/v1/traces`          |
| `headers`                | Linii opționale `Name: value` sau obiect JSON cu șiruri; criptate                       |
| `requestHeaderAllowlist` | Goală (dezactivată); nume/prefixe de antete client de capturat ca atribute ale spanului |
| `serviceName`            | `omniroute`; atributul de resursă `service.name`                                        |
| `langfuseMapping`        | `false`; adaugă atribute Langfuse pentru generare/sesiune/utilizator                    |
| `identity`               | `pseudonymous`, `keyName` sau `none`                                                    |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                 |
| `timeoutMs`              | `30000` pentru fiecare încercare HTTP                                                   |
| `environment`            | Nesetat; `langfuse.environment` opțional                                                |

Panoul de control generic afișează aceste câmpuri. `paths` acceptă un tablou prin API sau o zonă de text
cu căi exacte separate prin linii noi/virgule. Căile pentru embeddings, rerank și alte operațiuni sunt
omise dacă nu sunt permise explicit. Rândurile omise avansează totuși cursorul; contoarele
`exported`/`exportedTotal` ale executantului existent numără rândurile sursă procesate, inclusiv rândurile
filtrate, nu spanurile acceptate. Filtrarea se face în procesul copil, fără a-i modifica
contractul IPC/cursor.

Validarea URL-urilor folosește funcția auxiliară `parseAndValidateNonMetadataUrl`, care nu depinde de baza de date, din
`src/shared/network/outboundUrlGuard.ts`: politica `block-metadata`. Aceasta aplică aceleași
verificări necondiționate pentru metadate/protocol/credențiale încorporate ca validatorul webhook cu
URL-urile private permise, dar permite în mod deliberat destinații localhost/LAN fără o suprascriere
globală printr-un indicator de funcționalitate. Astfel sunt permise endpointuri Langfuse, Phoenix, Tempo și Collector
găzduite pe infrastructura proprie, inclusiv endpointuri HTTP private. Gazdele de metadate cloud sunt întotdeauna blocate.
Redirecționările nu sunt urmate, astfel încât un colector nu poate redirecționa credențialele către o altă gazdă.
La fel ca mecanismul existent de protecție lexicală a URL-urilor, acesta nu fixează rezoluția DNS; configurați numai
gazde controlate de operator. Preferați HTTPS ori de câte ori endpointul nu se află într-o rețea de încredere.

### Date transmise și livrare

JSON-ul OTLP/HTTP (`ExportTraceServiceRequest`, `Content-Type: application/json`) transportă un
span CLIENT pentru fiecare rând permis, denumit după calea exactă a cererii. Denumirea după cale distinge
Chat Completions, Responses și Messages fără a încorpora date despre model sau identitate în
numele spanului. Atributele resursei includ `service.name` și `service.version` al pachetului.

Componenta obișnuită de jurnalizare a încercărilor de chat (`open-sse/handlers/chatCore/attemptLogging.ts`) scrie
`duration = Date.now() - startTime` la finalizare și nu furnizează un marcaj temporal;
`saveCallLogOperation` din `src/lib/usage/callLogs.ts` setează implicit marcajul temporal la momentul
scrierii (finalizării). Prin urmare, exportul setează sfârșitul = marcajul temporal al rândului și începutul = sfârșitul − durata
(milisecunde, convertite în nanosecunde zecimale). Marcajele temporale istorice furnizate de apelant
sunt de asemenea păstrate ca moment de sfârșit; nu există un discriminator de început/finalizare pentru fiecare rând.
O durată nulă devine zero. Marcajele temporale invalide/lipsă provoacă eșecul lotului, în loc să creeze
spanuri nedeterministe. `ttftMs` poate fi nul și este mapat la `omniroute.ttft_ms`.

Atributele includ `gen_ai.operation.name="chat"`, furnizorul, modelul solicitat/modelul din răspuns,
tokenurile de intrare/ieșire, opțional tokenurile de citire din cache/creare a cache-ului/raționament, starea HTTP,
combo, sursa cache-ului, eticheta sesiunii și identificatorul de corelare. Valorile întregi OTLP și marcajele temporale
sunt șiruri zecimale; șirurile, valorile booleene și numerele fracționare folosesc variantele lor native de valori OTLP.
Spanurile de eroare au starea ERROR și un mesaj de stare curățat. Înregistrarea
canonică nu conține URL-ul gazdei din amonte, astfel încât `server.address` este omis, în loc să
identifice incorect colectorul drept serverul modelului. Costul nu este exportat.

Numai `includeBodies=true` încarcă conținutul. Cu `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` transportă JSON-ul curățat al corpului cererii/răspunsului,
așa cum este stocat de OmniRoute (adus la forma canonică atunci când poate fi parsată), nu un tablou de mesaje
restructurat conform convențiilor semantice. Corpurile trunchiate/non-JSON rămân text brut. Cu `langfuseMapping=true`,
corpurile sunt emise numai ca `langfuse.observation.input` / `langfuse.observation.output`;
atributele `gen_ai.*.messages` sunt omise, astfel încât fiecare corp este trimis o singură dată. Ambele moduri
moștenesc `maxBodyBytes` din fluxul existent de încărcare a conținutului;
`omniroute.bodies_truncated=true` marchează trunchierea.
Această destinație nu adaugă instantanee suplimentare ale fluxului de procesare și nici citiri de artefacte necurățate;
capturarea opțională a antetelor cererii folosește instantaneul clientului deja încărcat, descris mai jos.
Folosiți o frecvență de ordinul minutelor, precum `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, când exportați
corpuri, în loc să acumulați date în așteptare timp de o oră.

### Antete opționale ale cererii clientului

Capturarea antetelor este **dezactivată implicit**. Setați `requestHeaderAllowlist` în configurația destinației
și activați **Exportă prompturile și răspunsurile** (`includeBodies: true` pentru destinație).
Lista de permisiuni acceptă un tablou prin API sau o zonă de text cu nume separate prin linii noi/virgule:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Numele se potrivesc exact, fără a ține cont de majuscule și minuscule, cu excepția cazului în care un singur `*` final selectează un prefix nevid
al numelui antetului. Un `*` izolat, metacaracterele încorporate și numele de antete HTTP nevalide sunt respinse.
Sunt permise cel mult 64 de selectoare, fiecare cu un nume/prefix de cel mult 256 de octeți ASCII.
Această setare este separată de `headers`, care autentifică exportatorul la colector.

Capturarea citește doar `pipeline_client_request`, populat din
`clientRawRequest` (sau vechiul `clientRequest`) al pipeline-ului detaliat salvat. Nu recurge niciodată la antetele cererii către furnizor.
Jurnalizarea detaliată a pipeline-ului trebuie să fi fost activată când a fost înregistrată cererea. Dacă
`includeBodies` este dezactivat sau dacă JSON-ul instantaneului clientului lipsește, este corupt ori trunchiat, nu sunt emise
atribute de antet. Creșterea valorii `maxBodyBytes` poate evita trunchierea instantaneului la export;
nu poate recupera detalii care nu au fost salvate niciodată. Un instantaneu mai mare de 1 MiB sau care conține mai mult de
256 de intrări de antet este ignorat. Exportul existent al prompturilor/răspunsurilor rămâne activ alături de
capturarea antetelor; lista de permisiuni nu oferă un mod de hidratare exclusiv pentru antete.

Valorile selectate devin tablouri de șiruri OTLP `http.request.header.<full lowercase header name>`,
chiar și pentru un singur șir. De exemplu, `X-OmniRoute-Meta-Team: example-team` devine
`http.request.header.x-omniroute-meta-team` cu
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Prefixul complet este păstrat: acestea sunt antete obișnuite, fără parsarea câmpurilor de business sau
conversie în metadate `omniroute.metadata.*` / Langfuse. `langfuseMapping` nu modifică semantica
antetelor. Un antet `User-Agent` selectat, cu o singură valoare, setează și atributul scalar standard
`user_agent.original`. Virgulele din interiorul unei valori nu sunt folosite pentru separare. Variantele care diferă prin majuscule și minuscule sunt îmbinate în ordinea
intrărilor salvate; orice variantă nevalidă duce la omiterea întregului antet. Atributele sunt ordonate după numele cu litere mici.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, antetele pentru chei API, numele care conțin
marcatori auth/token/secret/password/credential și credențialele interne ale gateway-ului sunt întotdeauna
excluse, chiar dacă sunt selectate sau mascate parțial în stocare. Tiparele cunoscute de credențiale reutilizează
detectorul comun de credențiale; marcatorii de redactare sunt omiși, nu exportați ca valori sigure.
Sunt acceptate doar șiruri și tablouri nevide de șiruri; numerele sau obiectele nu sunt convertite implicit.
Numele nevalide, cheile de prototip, caracterele de control (cu excepția tabulatorului orizontal) și secvențele Unicode incorecte
sunt ignorate fără a provoca eșecul lotului sau a reproduce conținutul lor în erori.

Fiecare span capturează cel mult 32 de antete, 16 valori per antet, 4096 de octeți UTF-8 per valoare
și un total de 16384 de octeți UTF-8 pentru numele și valorile antetelor capturate. Antetele prea mari/nevalide
sunt omise integral, nu trunchiate. Selecția este o decizie a operatorului privind confidențialitatea: numele aparent sigure
pot conține totuși date personale, iar aceste limite/detectoare nu reprezintă un mecanism general de eliminare a datelor cu caracter personal.

### Limite de livrare

Cererile sunt limitate la 500 de span-uri și 4 MiB de JSON UTF-8, inclusiv anvelopa.
Dimensiunea fiecărui span permis este verificată înainte de prima cerere a unui lot al cursorului. Un singur
span mai mare decât limita împiedică trimiterea oricărei părți a acelui lot și provoacă un eșec cu îndrumarea de a reduce
`maxBodyBytes`; nu este eliminat în mod silențios. Verificarea preliminară păstrează doar referințele la înregistrări și
numărul de octeți, eliminând fiecare span/JSON temporar; span-urile sunt reconstruite pentru segmente cu dimensiune limitată,
în loc să fie păstrată o a doua copie serializată a lotului. Pentru HTTP 408/429/5xx, erori de rețea și expirări ale timpului de așteptare se fac cel mult
trei încercări, cu temporizare exponențială de 250/500 ms. Valorile în secunde sau datele HTTP din `Retry-After`
pot prelungi o întârziere până la 5 secunde. Celelalte coduri de stare provoacă imediat eșecul. Respingerea parțială OTLP 2xx declanșează, de asemenea, o excepție în loc să
confirme un span pierdut; sunt acceptate confirmările goale sau în format JSON valid, cu o
limită de 64 KiB pentru citirea răspunsului.

Erorile conțin doar informații proprii exportatorului: codul de stare HTTP, categoria de reîncercare, numărul de încercări și numărul de span-uri
trimise sau formulări fixe pentru erori de confirmare/rețea. Corpurile răspunsurilor colectorului,
numerele de elemente acceptate parțial și antetele răspunsurilor nu sunt niciodată copiate în erori, jurnale sau
panoul de control. Un lot eșuat sau acceptat parțial nu este confirmat: destinația afișează
starea de eșec cu acel cod de stare, cursorul rămâne la ultimul lot confirmat, iar următoarea execuție
retrimite aceleași rânduri. Codurile de stare permanente continuă să provoace eșecuri până când colectorul sau configurația
este remediată. Folosiți jurnalele colectorului pentru detalii despre răspuns. Rezumatele erorilor din jurnalul apelurilor își păstrează
redactarea separată.
`prepare()` nu configurează nicio resursă; Test trimite prin POST exact `{"resourceSpans":[]}` și raportează
codul de stare HTTP fără a scrie span-uri în jurnalul apelurilor.

Identificatorii de trasare și identificatorii de span sunt primele 32/16 cifre hexazecimale ale SHA-256 calculat pentru
`"omniroute.trace\0" + callLogId` și `"omniroute.span\0" + callLogId`. Retrimiterile folosesc
identificatori identici. Aceasta nu este o garanție de deduplicare: unele backenduri, inclusiv ingestia Langfuse
v4, nu deduplică span-urile cu același identificator. O cădere sau un eșec parțial al unui segment poate
duce la retrimiterea a cel mult unui singur lot neconfirmat al cursorului; întregul lot poate fi duplicat,
nu doar ultimul său segment HTTP. Alegeți dimensiunea lotului cursorului ținând cont de acest compromis.

### Exemplu Langfuse

Configurați aceste câmpuri pentru o instanță Langfuse găzduită pe infrastructura proprie:

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

Construiți local valoarea Authorization prin codificarea Base64 a șirului literal `public-key:secret-key`
(de exemplu cu `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nu copiați credențiale reale în jurnale, capturi de ecran sau sesizări. Maparea
setează automat `x-langfuse-ingestion-version: 4`; Authorization este furnizat în continuare în `headers`.
Atât antetele, cât și valoarea salt generată pentru identitate folosesc mecanismul existent de câmpuri secrete criptate
și substituenții API; `STORAGE_ENCRYPTION_KEY` este obligatorie.

Maparea adaugă tipul/modelul generării, detalii de utilizare în JSON (intrare/ieșire/total și cheile
de cache disponibile), instantanee JSON ale intrării/ieșirii, nivelul ERROR/DEFAULT, mesajul de stare igienizat,
numele trasei, ID-ul sesiunii, mediul opțional și atributul filtrabil
`langfuse.observation.metadata.<key>` pentru furnizor, modelul solicitat, cale, combinație, sursa
cache-ului și stare. `langfuse.observation.completion_start_time` este în format ISO 8601, la
momentul de început + TTFT, numai când TTFT este cunoscut și se încadrează în durată. Nu se trimit atribute de cost.

Modurile de identitate se aplică pentru `langfuse.user.id`:

- `pseudonymous` (implicit): HMAC-SHA256 al ID-ului intern al cheii API, cu o valoare salt aleatorie
  de 32 de octeți pentru fiecare destinație. Valoarea salt este generată la creare dacă lipsește, este criptată
  ca `identitySalt`, nu este returnată niciodată și este păstrată în timpul editărilor. ID-urile brute ale cheilor nu sunt
  introduse niciodată în atributele span-urilor. Recrearea/rotirea valorii salt a unei destinații modifică identitățile.
- `keyName`: numele configurat al cheii API, care dezvăluie în mod intenționat eticheta respectivă a operatorului.
- `none`: fără ID de utilizator. Etichetele de sesiune sunt exportate în continuare atunci când sunt prezente; aceste moduri nu
  anonimizează conținutul arbitrar al prompturilor sau etichetele de sesiune/corelare furnizate de operator.

### Pornirea fără completarea retroactivă a datelor

Doar la creare, activați **Pornește de la poziția curentă (omite jurnalele existente)** sau transmiteți
`startFromCurrentPosition: true` la nivelul superior al corpului cererii API de creare. Această opțiune inițializează
`cursor_row_id` la valoarea maximă curentă a rowid-ului din jurnalul de apeluri păstrat, folosind funcțiile auxiliare
existente pentru cursor, fără migrare. Valoarea implicită este false (cursor 0 și completare retroactivă din istoricul păstrat).
Nu este o setare de resetare a cursorului la actualizare.

Adăugarea câmpului comun `ttftMs` adaugă și o coloană `ttft_ms` care permite valori nule în componenta de mapare BigQuery
și în schema tabelelor noi: testul schemei impune ca fiecare câmp canonic al înregistrării să aibă o
coloană. Tabelele existente continuă să fie exportate fără modificări: `prepare()` citește schema tabelului și
omite doar `ttft_ms` atunci când coloana respectivă lipsește. Adăugați coloana INT64 care permite valori nule pentru a obține TTFT
la următoarea rulare sau folosiți un tabel nou. Nu sunt necesare PATCH, modificarea automată a schemei sau permisiuni
suplimentare; toate celelalte câmpuri ale rândurilor păstrează verificarea strictă a schemei.

---

## 6. Adăugarea unei destinații

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

## 7. Operare

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
