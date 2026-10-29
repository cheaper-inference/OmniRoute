# Log export (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Export continuu, incremental al jurnalelor de apeluri OmniRoute către un depozit extern de date analitice.

Fila Jurnale din tabloul de bord păstrează istoricul cererilor în SQLite (`call_logs`), limitat de
rotație și retenție. Exportul jurnalelor trimite același set de înregistrări conform unui program, astfel încât acesta să poată fi păstrat
dincolo de durata de viață a bazei de date locale și corelat cu alte date. BigQuery este prima destinație;
fluxul de procesare folosește un registru, astfel încât pot fi adăugate alte destinații.

---

## 1. Cum funcționează

```
server (decriptare + validare configurație, reconciliere cursor)
  → pornire IPC → proces OS exportChild izolat
    → storage.sqlite doar în citire → interogare/mapare comună a jurnalelor de apeluri
      → hidratare asincronă a artefactelor → prepare()/send() ale destinației
        → lot IPC → serverul persistă cursorul → confirmare IPC
          → lotul următor; finalizare IPC → serverul înregistrează succesul
```

- **Programare** — o singură sarcină cron `JobRegistry`, `log_export`, cu valoarea implicită `0 * * * *` (orar,
  UTC). Înregistrată în `src/lib/initCloudSync.ts`; poate fi suprascrisă cu `OMNIROUTE_LOG_EXPORT_CRON`.
  Fiecare declanșare procesează toate destinațiile **activate**, secvențial.
- **Cursor** — valoarea implicită `call_logs.rowid` din SQLite, persistată pentru fiecare destinație în
  `log_export_destinations.cursor_row_id`. `timestamp` nu este folosit intenționat drept cursor: apelanții
  pot furniza propria valoare, astfel încât o cerere lentă poate fi scrisă după una mai rapidă care a început
  mai târziu, iar un cursor bazat pe marcajul temporal ar omite-o.
- **Procesare în loturi** — `batch_size` rânduri per cerere (implicit 500), `max_rows_per_run` rânduri per execuție
  (implicit 10000), astfel încât un volum mare de date restante să fie procesat pe parcursul mai multor declanșări, în loc să blocheze una singură.
- **Livrare** — cursorul avansează numai după rezolvarea `send()`. Un lot eșuat lasă
  cursorul în poziția anterioară, astfel încât aceleași rânduri sunt retrimise la execuția următoare. Garanția este
  livrarea cel puțin o dată, plus deduplicare la destinație, nu livrare efectivă exact o dată: BigQuery identifică fiecare
  rând prin ID-ul jurnalului de apel, pe care îl respectă în limita posibilităților, în propria fereastră de deduplicare.
- **Protecție împotriva suprapunerii** — declanșarea cron și `POST .../run` pot avea loc simultan. O destinație
  aflată deja în curs de procesare este omisă, în loc să fie procesată de două ori (`skipped: true` în rezultatul execuției),
  astfel încât o execuție concurentă să nu poată retrimite un lot sau muta cursorul înapoi.
- **Recuperare după golire** — dacă `cursor_row_id` ajunge deasupra `MAX(rowid)` (întregul tabel a fost
  golit și valorile rowid au repornit), executorul revine la 0, în loc să nu mai detecteze permanent datele.

### Executor izolat și limite

Fiecare execuție pentru o destinație pe Node pornește un proces copil separat, de scurtă durată, la nivelul sistemului de operare (`child_process`
cu IPC, nu `worker_threads`). Citirea corpurilor, parsarea/serializarea JSON a datelor, `prepare()` pentru
destinație și toate operațiile de rețea I/O ale destinației rulează acolo, nu în bucla de evenimente a serverului.
Doar configurația și mesajele mici de progres traversează IPC; înregistrările exportate nu revin niciodată
la server. Sarcina cron și ruta Rulează acum păstrează același rezultat public și aceeași protecție împotriva suprapunerii.

Procesul copil deschide doar pentru citire calea rezolvată de server `DATA_DIR/storage.sqlite`, folosind `node:sqlite`,
cu `busy_timeout=5000` și `query_only=ON`. Nu importă nicio instanță unică a bazei de date și nu efectuează
migrări, copii de siguranță sau actualizări SQLite. Gestionarea evidenței artefactelor lipsă/corupte (inclusiv
UPDATE pentru artefacte corupte) rămâne exclusiv în fluxul de detalii al tabloului de bord. Ambele fluxuri folosesc același
rezolvitor de detalii pur; exportul folosește citiri asincrone din sistemul de fișiere și aceeași ordine de rezolvare: artefact → conținut
inline vechi → disc vechi → nimic. O execuție fixează valoarea rowid maximă de inserare
când procesul copil își deschide cititorul; inserările ulterioare așteaptă execuția următoare. Aceasta este o limită
de inserare, nu o tranzacție SQLite de lungă durată: procesele de scriere WAL și punctele de control rămân libere în timpul
așteptărilor de rețea. Actualizările/ștergerile rândurilor existente nu sunt înghețate de această limită.

După fiecare lot acceptat, procesul copil așteaptă o confirmare. Serverul persistă mai întâi
cursorul cu `advanceLogExportCursor`, apoi trimite `ack`; niciun lot următor nu începe înainte de aceasta.
Un eșec de trimitere, o cădere sau o expirare a timpului-limită înregistrează un eșec fără a avansa cursorul pentru acel lot. Loturile
confirmate anterior rămân salvate; cel mult singurul lot neconfirmat poate fi retrimis.
Succesul este înregistrat numai după `done` și o încheiere normală a procesului copil. Eșecurile încheie procesul copil
cu SIGTERM, apoi cu SIGKILL după 500 ms dacă este necesar, iar executorul așteaptă închiderea procesului.

| Variabilă de mediu                            | Implicit | Scop                                          |
| --------------------------------------------- | -------- | --------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Limită de timp efectiv per destinație         |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Limită old-space V8 a procesului copil, în MB |

Valorile nevalide/nepozitive/neîntregi determină folosirea valorilor implicite. Setarea heap-ului nu reprezintă o limită
RSS totală; loturile foarte mari pot totuși epuiza memoria procesului copil și pot provoca eșecul execuției în condiții de siguranță.
Valoarea implicită de 1024 MB lasă o marjă pentru lotul implicit de 500 de rânduri cu artefacte de 512 KiB și
corpuri activate, inclusiv serializarea JSON a BigQuery în fragmente delimitate după numărul de octeți. Aceasta nu face sigură procesarea unui
lot de 10000 de rânduri cu corpuri. Epuizarea heap-ului V8 înregistrează un eșec însoțit de măsuri concrete: reduceți dimensiunea
lotului sau măriți `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; cursorul rămâne la ultimul
lot confirmat. Corpurile istorice inline/de pe disc nu sunt acoperite de limita modernă pentru artefacte.
Operatorii trebuie să aloce separat un buget RSS, mai ales în containere cu memorie limitată.

Procesul copil moștenește doar valoarea rezolvată pentru `DATA_DIR`, `NODE_ENV`, valoarea explicită pentru `TZ` (rezolvarea orei
locale din numele de fișier în format vechi), `ELECTRON_RUN_AS_NODE` când este prezentă și următoarele variabile pentru conexiunile de ieșire:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (și formele lor cu litere mici),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Un dispecer Undici global folosește aceeași rezolvare a proxy-ului bazată exclusiv pe variabilele de mediu și aceleași reguli de
ocolire a proxy-ului pentru gazdele locale ca serverul, inclusiv `NO_PROXY`; acesta nu importă `proxyFetch.ts` sau opțiunile sale pentru baza de date/funcționalități.
Datele de autentificare pentru proxy sunt mascate în ieșirea redirecționată și în erorile înregistrate. Datele de autentificare ale destinației
sunt transmise doar într-un singur mesaj IPC de pornire, niciodată prin argv sau variabile de mediu; ieșirea și erorile redirecționate sunt
prefixate și igienizate. Doar `ExperimentalWarning` este dezactivat în argumentele de execuție ale procesului copil, pentru a evita
repetarea avertismentului SQLite al Node la fiecare rulare cron; celelalte tipuri de avertismente rămân vizibile.

Modulele destinațiilor trebuie să poată fi importate fără dependențe Next.js/exclusive serverului. Implementarea
BigQuery existentă îndeplinește deja acest contract. Cache-urile tokenurilor de acces persistă doar pe durata rulării procesului
copil, nu și între rulări. Node este mediul de execuție acceptat (engines din `package.json`), dar secțiunea de instalare cu Bun
din README și `Dockerfile.bun` prezintă și o cale de compatibilitate pentru producție folosind
`bun:sqlite` (`src/lib/db/core.ts` / adaptoare). Prin urmare, sub Bun, exporturile păstrează calea anterioară
în cadrul aceluiași proces și emit un avertisment o singură dată: izolarea memoriei heap și a timpului-limită prin proces copil nu este disponibilă. Folosiți
Node pentru izolarea buclei de evenimente și a epuizării memoriei (OOM); Bun nu este tratat aici ca fiind destinat exclusiv dezvoltării.

Când `includeBodies` este activat, preferați o frecvență la nivel de minute, precum
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, în loc să acumulați timp de o oră date în așteptare.
Limitele pentru loturi și rânduri limitează în continuare fiecare rulare. Costul pornirii procesului este suportat pentru fiecare destinație la fiecare rulare;
acest compromis adaugă un cost mic de pornire pentru a izola bucla de evenimente a serverului, nu pentru a reduce utilizarea totală a procesorului.

### Date transmise (prompturi și completări)

În mod implicit, exportul conține doar câmpurile de sinteză afișate în **lista** de jurnale. Activarea opțiunii
**Exportă prompturile și răspunsurile** (`includeBodies`) transmite suplimentar ceea ce afișează panoul de **detalii**
al jurnalelor pentru fiecare apel:

| Câmp                             | Ce conține                                                               |
| -------------------------------- | ------------------------------------------------------------------------ |
| `request_body` / `response_body` | Datele apelului, așa cum le afișează tabloul de bord                     |
| `pipeline_route_decision`        | Destinația și modelul alese de router                                    |
| `pipeline_client_request`        | Cererea brută, exact așa cum a trimis-o clientul                         |
| `pipeline_openai_request`        | După conversia în formatul OpenAI intern                                 |
| `pipeline_provider_request`      | Așa cum a fost trimisă efectiv în amonte, în dialectul furnizorului      |
| `pipeline_provider_response`     | Răspunsul brut din amonte                                                |
| `pipeline_client_response`       | Ceea ce a fost returnat apelantului                                      |
| `pipeline_error`                 | Detalii despre eroarea la nivel de pipeline pentru un apel eșuat         |
| `bodies_truncated`               | Adevărat când oricare dintre câmpurile de mai sus a atins `maxBodyBytes` |

Acesta este conținutul prompturilor, așa că opțiunea este **dezactivată implicit** și este în mod deliberat o alegere pentru fiecare destinație.
Se transmite ceea ce afișează tabloul de bord, deoarece exportul și `getCallLogById` folosesc aceeași
rezolvare a detaliilor: datele sunt
deja curățate de informații de identificare personală (PII), iar secretele sunt mascate la scriere; un apel efectuat cu o
cheie API `noLog` nu stochează deloc datele apelului, deci nu există nimic de exportat.

Datele sunt citite pentru fiecare rând din artefactul din sistemul de fișiere, astfel încât hidratarea rulează doar pentru destinațiile
care au solicitat-o. Un artefact lipsă sau corupt duce la exportarea sintezei sale cu date nule, în loc
să provoace eșuarea lotului și blocarea cursorului.

`maxBodyBytes` (implicit 262144) limitează fiecare câmp. Datele mai lungi sunt **trunchiate, nu
eliminate** — un prompt scurtat răspunde în continuare la întrebarea „ce s-a cerut” — iar rândul este marcat cu
`bodies_truncated`. Diferențele transmise în flux, fragment cu fragment, nu sunt exportate; răspunsul asamblat se află
deja în `pipeline_provider_response` și `pipeline_client_response`.

---

## 2. Fișiere

| Componentă                                 | Locație                                      |
| ------------------------------------------ | -------------------------------------------- |
| Contractul destinației                     | `src/lib/logExport/types.ts`                 |
| Registru                                   | `src/lib/logExport/registry.ts`              |
| Gestionarea secretelor                     | `src/lib/logExport/secrets.ts`               |
| Executor (IPC părinte)                     | `src/lib/logExport/runner.ts`                |
| Ciclul de viață al procesului              | `src/lib/logExport/childRunner.ts`           |
| Punct de intrare al procesului copil       | `src/lib/logExport/exportChild.ts`           |
| Deschidere doar pentru citire              | `src/lib/db/logExportReadOnly.ts`            |
| Interogare/mapare comună                   | `src/lib/usage/callLogExportQueries.ts`      |
| Rezolvarea detaliilor                      | `src/lib/usage/callLogDetailResolver.ts`     |
| Proiecție API                              | `src/lib/logExport/presenter.ts`             |
| Destinație BigQuery                        | `src/lib/logExport/destinations/bigquery.ts` |
| Autentificare prin cont de serviciu Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Sursa jurnalului de apeluri                | `src/lib/usage/callLogExportSource.ts`       |
| Persistență                                | `src/lib/db/logExportDestinations.ts`        |
| Sarcină cron                               | `src/lib/jobs/logExportJob.ts`               |
| Strat REST                                 | `src/app/api/log-export/`                    |
| Pagina tabloului de bord                   | `src/app/(dashboard)/dashboard/log-export/`  |

Schemă: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Toate rutele necesită autentificare de administrare (`requireManagementAuth`). Secretele nu sunt returnate niciodată:
un secret stocat este returnat ca valoarea literală `__stored__`, iar trimiterea acestei valori la o actualizare
păstrează credențialele stocate.

Crearea sau actualizarea unei destinații al cărei tip declară un secret **necesită
`STORAGE_ENCRYPTION_KEY`**. Fără aceasta, `encrypt()` lasă datele neschimbate fără niciun avertisment, așa că scrierea este
refuzată cu un cod 400, în loc să stocheze credențialele în SQLite în text simplu (aceeași protecție pe care o
aplică webhook-ul Telegram).

| Metodă   | Cale                                     | Scop                                                                              |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipurile de destinații + lista câmpurilor lor de configurare                      |
| `GET`    | `/api/log-export/destinations`           | Listează destinațiile (cu secretele mascate)                                      |
| `POST`   | `/api/log-export/destinations`           | Creează o destinație                                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | Citește o destinație                                                              |
| `PUT`    | `/api/log-export/destinations/{id}`      | Actualizează numele / activarea / configurația / procesarea în loturi             |
| `DELETE` | `/api/log-export/destinations/{id}`      | Șterge                                                                            |
| `POST`   | `/api/log-export/destinations/{id}/test` | Verifică credențialele, fără a scrie nimic                                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Procesează acum toate datele în așteptare, pe aceeași cale ca execuția programată |
| `GET`    | `/api/log-export/status`                 | Starea cron, execuțiile recente, datele în așteptare pentru fiecare destinație    |

`GET /api/log-export/types` este ceea ce face interfața generică: formularul din tabloul de bord este generat pe baza
descriptorilor de câmp returnați, astfel încât o destinație nouă nu necesită modificări ale interfeței.

---

## 4. Destinația BigQuery

Chei de configurare (`type: "bigquery"`):

| Cheie                | Note                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| `projectId`          | Proiectul GCP care conține setul de date                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                           |
| `location`           | Folosită doar când trebuie creat setul de date (implicit `EU`)            |
| `serviceAccountJson` | Cheia contului de serviciu. Secret: criptat în repaus, niciodată returnat |
| `autoCreate`         | Creează setul de date și tabelul la primul export (implicit `true`)       |

Contul de serviciu are nevoie de `bigquery.tables.updateData` pentru tabelul țintă, plus
`bigquery.datasets.create` / `bigquery.tables.create` când `autoCreate` este activat.

Un lot configurat este o unitate de **cursor**, nu una HTTP: `send()` îl împarte în apeluri insertAll
de cel mult 500 de rânduri, astfel încât o valoare mare pentru `batch_size` nu poate depăși limita BigQuery de 10 MB per cerere.
Pentru codurile de stare tranzitorii (408/429/500/502/503/504), se reîncearcă de până la trei ori, cu un interval de așteptare
care crește exponențial, reutilizând aceleași insertIds; erorile de autentificare și de schemă declanșează o excepție la prima încercare, în loc
să irosească execuția.

Un tabel creat cu câteva clipe în urmă nu este încă vizibil pentru endpointul de streaming, care răspunde cu
404 timp de câteva secunde. Se reîncearcă după acel 404, dar **numai când tabelul a fost creat în această execuție** —
un tabel care lipsește cu adevărat provoacă în continuare o eroare imediată. Rețineți că recrearea unui tabel cu un nume care
a fost șters recent face ca BigQuery să refuze inserările prin streaming timp de câteva minute; aceasta este o
proprietate a secvenței ștergere-recreare, așa că preferați un nume de tabel nou în loc să ștergeți și să adăugați din nou unul.

**Un eșec parțial este returnat ca HTTP 200 cu un `insertErrors[]` nevid.** Acesta este tratat ca
un eșec și declanșează o excepție, ceea ce împiedică avansarea cursorului dincolo de rândurile pe care BigQuery nu
le-a acceptat niciodată; `tests/unit/log-export-bigquery.test.ts` fixează acest comportament prin teste.

Transportul folosește REST simplu — o aserțiune RS256 autosemnată este schimbată pentru un token de acces la
`https://oauth2.googleapis.com/token`, apoi rândurile sunt trimise către `tabledata.insertAll`. Nu este
inclus niciun SDK Google. Tokenurile de acces sunt păstrate în cache în cadrul procesului pentru fiecare pereche (cont de serviciu, domeniu de acces).

Tabelul creat conține câte o coloană pentru fiecare câmp din fila Logs, plus `exported_at`, și este organizat în funcție de
modul în care sunt interogate efectiv jurnalele de apeluri:

- **Partiționat pe zile după `timestamp`**, astfel încât o interogare limitată după dată scanează doar zilele respective.
- **Grupat în clustere după `api_key_name`, `provider`, `model`, `status`** (în această ordine), astfel încât filtrarea după
  cine a executat apelul, unde a fost trimis sau dacă a eșuat exclude blocuri din fiecare partiție. BigQuery
  permite cel mult patru coloane de clustering, iar ordinea contează: un filtru doar pe `api_key_name`
  exclude blocuri, un filtru doar pe `status` nu.
- **Retenție opțională a partițiilor** prin `partitionExpirationDays` (0 păstrează totul), aplicată
  la crearea tabelului.

Ambele setări se aplică la momentul creării. Un tabel existent își păstrează organizarea actuală, așa că
configurați destinația cu un identificator de tabel nou dacă doriți să le adoptați.

`tests/unit/log-export-bigquery.test.ts` verifică dacă maparea și schema tabelului rămân
sincronizate, astfel încât o coloană nouă din jurnalul de apeluri să nu poată fi omisă fără avertisment la export.

Loturile sunt împărțite în funcție **atât** de numărul de rânduri, cât și de numărul de octeți serializați. Numărul de rânduri nu este suficient
odată ce sunt exportate și datele utile: 500 de rânduri care conțin prompturi pot ocupa zeci de megaocteți, iar insertAll
respinge o cerere mai mare de 10 MB. Segmentele se închid la 500 de rânduri sau 9 MB, în funcție de limita atinsă prima.

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
`"omniroute.trace\\0" + callLogId` și `"omniroute.span\\0" + callLogId`. Retrimiterile folosesc
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

1. Creați `src/lib/logExport/destinations/<name>.ts` care exportă un `LogExportDestinationType`:
   un `configSchema` Zod, un tablou de descriptori `fields` pentru interfața cu utilizatorul, `secretFields` și o
   funcție `createClient(config)` care returnează `test()` / `prepare()` / `send(records)`.
2. Adăugați-l în tabloul `DESTINATIONS` din `src/lib/logExport/registry.ts`.
3. Scrieți teste în `tests/unit/`.

Aceasta este întreaga modificare: persistența, sarcina cron, stratul REST, criptarea secretelor și
formularul din panoul de control citesc toate registrul.

Două reguli pentru o destinație nouă:

- `send()` **trebuie să arunce o excepție** în cazul unui eșec parțial. Finalizarea cu succes înseamnă „destinația are aceste rânduri”,
  iar cursorul avansează definitiv dincolo de ele.
- O destinație care acceptă un URL furnizat de utilizator trebuie să îl valideze prin
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) înainte de a efectua cererea,
  la fel ca webhook-urile. BigQuery nu are nevoie de acest lucru: gazdele sale sunt constante.

---

## 7. Utilizare

- **Panou de control**: Integrări → Export de jurnale. Adăugați o destinație, rulați **Testare** pentru a verifica datele de autentificare
  fără a scrie rânduri, apoi activați-o.
- **Date restante**: fiecare card de destinație afișează rândurile în așteptare și cursorul; `GET
/api/log-export/status` returnează aceleași valori plus ultimele 20 de execuții ale sarcinii.
- **Eșecul unei destinații nu provoacă eșecul celorlalte** — rezumatul execuției înregistrează starea fiecărei destinații
  în `last_status` / `last_error`, iar istoricul execuțiilor sarcinii păstrează rezultatul agregat.
- **Ștergerea unei destinații îi șterge cursorul.** Readăugarea acesteia pornește de la cel mai vechi
  jurnal de apel păstrat, ceea ce retrimite rânduri pe care destinația le poate deține deja. În BigQuery, valoarea
  `insertId` pentru fiecare rând previne această duplicare doar în intervalul de deduplicare propriu BigQuery, așa că este de preferat să dezactivați
  o destinație în loc să o ștergeți.
