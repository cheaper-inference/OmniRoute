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

| Cheie                | Note                                                                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Proiectul GCP care conține setul de date                                                                                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                                          |
| `location`           | Utilizat numai când setul de date trebuie creat (valoarea implicită este `EU`)                                                           |
| `serviceAccountJson` | Cheia contului de serviciu. Secret: criptată în repaus, nu este returnată                                                                |
| `autoCreate`         | Creează setul de date/tabelul lipsă; adaugă condiționat coloanele nullable pentru dovezile de utilizare (valoarea implicită este `true`) |

Contul de serviciu are nevoie de `bigquery.tables.updateData` pentru tabelul țintă, precum și de
`bigquery.datasets.create` / `bigquery.tables.create` când `autoCreate` este activat.
Actualizarea unui tabel existent pentru a adăuga cele două câmpuri nullable pentru dovezile de
utilizare necesită și `bigquery.tables.update`. Lipsa unei permisiuni eșuează exportul fără a
avansa cursorul.

Un lot configurat este o unitate de **cursor**, nu una HTTP: `send()` îl împarte în apeluri
insertAll de cel mult 500 de rânduri, astfel încât o valoare mare pentru `batch_size` nu poate
depăși limita de 10 MB a BigQuery pentru cereri. Stările tranzitorii (408/429/500/502/503/504)
sunt reîncercate de până la trei ori, cu backoff exponențial, reutilizând aceleași insertIds;
erorile de autentificare și de schemă generează o excepție la prima încercare, fără a consuma
execuția.

Un tabel creat cu câteva momente în urmă nu este încă vizibil pentru endpointul de streaming,
care răspunde cu 404 timp de câteva secunde. Acel 404 este reîncercat, dar **numai când această
execuție a creat tabelul** — un tabel care lipsește cu adevărat eșuează imediat. Rețineți că
recrearea unui tabel sub un nume care a fost șters recent determină BigQuery să refuze inserările
de streaming timp de câteva minute; aceasta este o caracteristică a operației de ștergere urmată
de recreare, așa că preferați un nume nou de tabel în locul ștergerii și adăugării din nou a
acestuia.

**Un eșec parțial apare ca HTTP 200 cu un `insertErrors[]` nevid.** Acesta este tratat ca un
eșec și generează o excepție, ceea ce împiedică avansarea cursorului peste rândurile pe care
BigQuery nu le-a acceptat niciodată; `tests/unit/log-export-bigquery.test.ts` fixează acest
comportament prin teste.

Transportul este REST simplu — o aserțiune RS256 autosemnată este schimbată pe un token de acces
la `https://oauth2.googleapis.com/token`, apoi rândurile sunt trimise către `tabledata.insertAll`.
Nu este inclus niciun SDK Google. Tokenurile de acces sunt memorate în cache în proces, per
(cont de serviciu, domeniu de aplicare).

Tabelul creat conține câte o coloană pentru fiecare câmp din fila Logs, plus `exported_at`, și
este structurat pentru modul în care sunt interogate efectiv jurnalele apelurilor:

- **Partiționat pe zile după `timestamp`**, astfel încât o interogare limitată la o anumită dată
  să scaneze doar zilele respective.
- **Clusterizat după `api_key_name`, `provider`, `model`, `status`** (în această ordine), astfel
  încât filtrarea după cine a executat apelul, unde a fost trimis sau dacă a eșuat să elimine
  blocurile din fiecare partiție. BigQuery permite cel mult patru coloane de clusterizare, iar
  ordinea este importantă: un filtru doar după `api_key_name` elimină blocuri, unul doar după
  `status` nu.
- **Păstrarea opțională a partițiilor** prin `partitionExpirationDays` (0 păstrează totul),
  aplicată la crearea tabelului.

Ambele setări se aplică la momentul creării. Un tabel existent păstrează structura pe care o are
deja, așa că indicați destinația către un ID de tabel nou dacă doriți să le adoptați.

`tests/unit/log-export-bigquery.test.ts` verifică prin aserțiuni că mapperul și schema tabelului
rămân sincronizate, astfel încât o nouă coloană a jurnalului apelurilor să nu poată fi omisă
silențios în timpul exportului.

Loturile sunt împărțite după **atât numărul de rânduri, cât și numărul de octeți serializați**.
Numărul de rânduri nu este suficient odată ce sunt exportate payloaduri: 500 de rânduri care
conțin prompturi pot avea zeci de megabytes, iar insertAll respinge o cerere de peste 10 MB.
Blocurile se închid la 500 de rânduri sau la 9 MB, în funcție de care limită este atinsă prima.

---

## 5. Destinația urmelor OTLP/HTTP

Configurația utilizează `type: "otlp-http"`. Acesta este un export programat, bazat pe cursor, al jurnalelor de apel persistate, nu sursa de evenimente live de rutare cu livrare best-effort din
`open-sse/services/routing/otel.ts`. Nu citește și nu modifică variabilele de mediu, temporizatoarele sau bufferele acelei surse. Activarea ambelor poate produce două tipuri independente de spanuri;
utilizați domeniul de instrumentare `omniroute.log-export` pentru a distinge aceste spanuri ale jurnalelor de apel.

| Cheie                    | Implicit / scop                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `endpoint`               | URL complet obligatoriu pentru urmele HTTP(S); sufixul `/v1/traces` nu este adăugat            |
| `headers`                | Linii opționale `Name: value` sau obiect JSON de șiruri; criptate                              |
| `requestHeaderAllowlist` | Gol (dezactivat); nume/prefixe de anteturi ale clientului de capturat ca atribute ale spanului |
| `serviceName`            | `omniroute`; resursa `service.name`                                                            |
| `langfuseMapping`        | `false`; adaugă atribute Langfuse pentru generare/sesiune/utilizator                           |
| `identity`               | `pseudonymous`, `keyName` sau `none`                                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                        |
| `timeoutMs`              | `30000` pentru fiecare încercare HTTP                                                          |
| `environment`            | Nedefinit; opțional `langfuse.environment`                                                     |

Tabloul de bord generic redă aceste câmpuri. `paths` acceptă o matrice API sau o zonă de text
cu căi exacte separate prin linii noi/virgule. Embeddings, rerank și alte căi
sunt ignorate dacă nu sunt permise explicit. Rândurile ignorate avansează în continuare cursorul; contoarele `exported`/`exportedTotal` ale executorului existent numără rândurile sursă procesate, inclusiv
rândurile filtrate, nu spanurile acceptate. Filtrarea se efectuează în procesul copil, fără modificarea contractului IPC/cursorului acestuia.

Validarea URL-urilor utilizează helperul `parseAndValidateNonMetadataUrl`, fără acces la DB, din
`src/shared/network/outboundUrlGuard.ts`: politica `block-metadata`. Aceasta are aceleași verificări necondiționate pentru metadate/protocol/credențiale încorporate ca validatorul webhook, cu URL-urile private permise, dar permite în mod deliberat ținte localhost/LAN fără o suprascriere globală a indicatorului de funcționalitate. Astfel sunt permise endpointurile
Langfuse, Phoenix, Tempo și Collector găzduite local, inclusiv endpointurile HTTP private. Gazdele de metadate cloud sunt întotdeauna blocate.
Redirecționările nu sunt urmate, astfel încât un collector nu poate redirecționa credențialele către o altă gazdă.
La fel ca protecția lexicală existentă pentru URL-uri, aceasta nu fixează rezoluția DNS; configurați doar gazde controlate de operator. Preferați HTTPS ori de câte ori endpointul nu se află într-o rețea de încredere.

### Conținutul util și livrarea

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) transportă un
span CLIENT pentru fiecare rând permis, denumit după calea exactă a solicitării. Denumirea căii diferențiază Chat Completions, Responses și Messages fără a încorpora date despre model sau identitate în numele spanului. Atributele resursei includ `service.name` și `service.version` al pachetului.

Înregistratorul normal al încercărilor de chat (`open-sse/handlers/chatCore/attemptLogging.ts`) scrie
`duration = Date.now() - startTime` la finalizare și nu furnizează un marcaj temporal;
`saveCallLogOperation` din `src/lib/usage/callLogs.ts` setează implicit marcajul temporal la momentul scrierii
(finalizării). Prin urmare, exportul setează sfârșitul la marcajul temporal al rândului, iar începutul la sfârșit − durată
(milisecunde, convertite în nanosecunde zecimale). Marcajele temporale istorice furnizate de apelant
sunt păstrate și ca timp de sfârșit; nu există un discriminator per rând pentru început/finalizare.
O durată nulă devine zero. Marcajele temporale invalide/lipsă eșuează lotul, în loc să creeze spanuri
nedeterministe. `ttftMs` poate fi nul și este mapat la `omniroute.ttft_ms`.

Atributele includ `gen_ai.operation.name="chat"`, furnizorul, modelul solicitat/de răspuns,
tokenurile de intrare/ieșire, opțional tokenurile pentru citirea cache-ului/crearea cache-ului/raționamentului, starea HTTP,
combinația, sursa cache-ului, eticheta sesiunii și ID-ul de corelare. Valorile întregi OTLP și marcajele temporale
sunt șiruri zecimale; șirurile, valorile booleene și numerele fracționare utilizează variantele native de valori OTLP. Spanurile cu erori au starea ERROR și un mesaj de stare igienizat. Înregistrarea canonică nu are URL-ul gazdei upstream,
astfel încât `server.address` este omis, în loc să identifice incorect collectorul drept server al modelului. Costul nu este exportat.

Doar `includeBodies=true` hidratează conținutul. Cu `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` conțin corpul JSON igienizat al solicitării/răspunsului
așa cum este stocat de OmniRoute (canonicalizat atunci când poate fi analizat), nu o matrice de mesaje semconv
reformatată. Corpurile trunchiate/JSON rămân text brut. Cu `langfuseMapping=true`,
corpurile sunt emise numai ca `langfuse.observation.input` / `langfuse.observation.output`;
atributele `gen_ai.*.messages` sunt omise, astfel încât fiecare corp este trimis o singură dată. Ambele moduri
moștenesc `maxBodyBytes` din calea existentă de hidratare;
`omniroute.bodies_truncated=true` marchează trunchierea.
Această destinație nu adaugă instantanee suplimentare ale pipeline-ului sau citiri de artefacte neigienizate;
capturarea opțională a antetelor solicitării utilizează instantaneul existent al clientului hidratat descris mai jos.
Utilizați o periodicitate la nivel de minut, precum `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, atunci când exportați
corpuri, în loc să acumulați un backlog orar.

### Antete opționale ale solicitării clientului

Capturarea antetelor este **dezactivată implicit**. Setați `requestHeaderAllowlist` în configurația destinației
și activați **Export prompts and responses** (`includeBodies: true` în destinație).
Lista de permisiuni acceptă o matrice API sau o zonă de text cu nume separate prin linii noi/virgule:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Numele corespund fără a ține cont de diferențele dintre majuscule și minuscule și exact, cu excepția cazului în care un singur `*` terminal selectează un prefix nevid al numelui de antet. `*` singur, caracterele wildcard încorporate și numele de antete HTTP nevalide sunt respinse.
Există cel mult 64 de selectori, fiecare cu un nume/prefix de cel mult 256 de octeți ASCII.
Această setare este separată de `headers`, care autentifică exportatorul la colector.

Capturarea citește doar `pipeline_client_request`, populat din `clientRawRequest` (sau `clientRequest` în versiunile anterioare) ale pipeline-ului detaliat salvat. Nu revine niciodată la antetele cererii furnizorului.
Înregistrarea detaliată a pipeline-ului trebuie să fi fost activată atunci când cererea a fost înregistrată. Cu `includeBodies` dezactivat sau în cazul unui JSON de instantaneu al clientului lipsă, corupt sau trunchiat, nu sunt emise atribute pentru antete. Creșterea valorii `maxBodyBytes` poate evita trunchierea instantaneului la momentul exportului; nu poate restaura detalii care nu au fost salvate niciodată. Un instantaneu mai mare de 1 MiB sau care conține mai mult de 256 de intrări de antete este ignorat. Exportul existent al promptului/răspunsului rămâne activ împreună cu capturarea antetelor; lista de permisiuni nu oferă un mod de hidratare exclusiv pentru antete.

Valorile selectate devin array-uri de șiruri OTLP `http.request.header.<full lowercase header name>`, chiar și pentru un singur șir. De exemplu, `X-OmniRoute-Meta-Team: example-team` devine
`http.request.header.x-omniroute-meta-team` cu
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Prefixul complet este păstrat: acestea sunt antete obișnuite, fără analizarea câmpurilor de business sau conversia în `omniroute.metadata.*` / metadate Langfuse. `langfuseMapping` nu modifică semantica antetelor. Un `User-Agent` selectat cu o singură valoare setează, de asemenea, atributul scalar standard
`user_agent.original`. Virgulele dintr-o singură valoare nu sunt separate. Variantele care diferă prin litere mari/mici sunt îmbinate în ordinea intrărilor salvate; orice variantă nevalidă omite întregul antet. Atributele sunt ordonate după numele scris cu litere mici.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, antetele de tip API-key, numele care conțin indicatori precum auth/token/secret/password/credential și acreditările interne ale gateway-ului sunt excluse întotdeauna, chiar dacă sunt selectate sau mascate parțial în stocare. Modelele cunoscute de acreditări reutilizează detectorul comun de acreditări; marcajele de redactare sunt omise, nu exportate ca valori sigure.
Sunt acceptate doar șiruri și array-uri nevide de șiruri; numerele și obiectele nu sunt convertite. Numele nevalide, cheile de prototip, caracterele de control (cu excepția tabulatorului orizontal) și Unicode-ul malformat sunt ignorate fără a eșua lotul sau a reflecta conținutul lor în erori.

Fiecare span capturează cel mult 32 de antete, 16 valori per antet, 4096 de octeți UTF-8 per valoare și 16384 de octeți UTF-8 în total pentru numele și valorile antetelor capturate. Antetele prea mari/nevalide sunt omise în întregime, nu trunchiate. Selectarea este o decizie de confidențialitate a operatorului: numele care par sigure pot conține în continuare date cu caracter personal, iar aceste limite/detectoare nu constituie un instrument general de eliminare a datelor PII.

### Limite de livrare

Cererile sunt limitate la 500 de span-uri și 4 MiB de JSON UTF-8, inclusiv anvelopa.
Fiecare span permis este verificat ca dimensiune înaintea primei cereri a unui lot de cursor. Un span individual mai mare decât limita nu trimite nicio parte a lotului respectiv și eșuează cu instrucțiuni pentru reducerea valorii
`maxBodyBytes`; nu este eliminat în tăcere. Preverificarea păstrează doar referințe la înregistrări și numărători de octeți, eliminând fiecare span/JSON temporar; span-urile sunt reconstruite pentru bucăți limitate, în loc să păstreze o a doua copie serializată a lotului. Răspunsurile HTTP 408/429/5xx, erorile de rețea și expirările primesc cel mult
trei încercări, cu retragere exponențială de 250/500 ms. `Retry-After`, exprimat în secunde sau ca dată HTTP,
poate extinde întârzierea până la 5 secunde. Celelalte stări eșuează imediat. Respingerea parțială OTLP 2xx generează, de asemenea, o eroare în loc să confirme
un span pierdut; confirmările JSON goale sau valide sunt acceptate, cu o
limită de 64 KiB pentru citirea răspunsului.

Erorile conțin doar informații deținute de exportator: starea HTTP, clasa de reîncercare, numărul de încercări și numărul de span-uri trimise sau un mesaj fix privind confirmarea/rețeaua. Corpurile răspunsurilor colectorului, numărul respingerilor parțiale și antetele răspunsului nu sunt copiate niciodată în erori, jurnale sau tabloul de bord. Un lot eșuat sau acceptat parțial nu este confirmat: destinația afișează Stare de eșec cu acea stare, cursorul rămâne la ultimul lot confirmat, iar următoarea execuție retrimite aceleași rânduri. Stările permanente continuă să eșueze până când colectorul sau configurația este reparată. Pentru detalii despre răspuns, folosiți propriile jurnale ale colectorului. Rezumatele erorilor din jurnalul apelurilor își păstrează redactarea separată.
`prepare()` nu furnizează nimic; Test trimite exact `{"resourceSpans":[]}` și raportează
starea HTTP fără a scrie span-uri în jurnalul apelurilor.

ID-urile de trasare și ID-urile de span sunt primele 32/16 cifre hexazecimale ale SHA-256 calculat peste
`"omniroute.trace\\0" + callLogId` și `"omniroute.span\\0" + callLogId`. Retrimiterile conțin
ID-uri identice. Aceasta nu este o garanție de deduplicare: unele backend-uri, inclusiv ingestia Langfuse
v4, nu deduplichează span-uri cu același ID. O cădere sau eșuarea parțială a unei bucăți poate
retrimit cel mult lotul de cursor neconfirmat; întregul
lot poate fi duplicat, nu doar ultima bucată HTTP. Alegeți dimensiunea lotului de cursor ținând cont de acest compromis.

### Exemplu Langfuse

Configurați aceste câmpuri pentru o instanță Langfuse găzduită autonom:

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

Construiți local valoarea Authorization ca Base64 al șirului literal `public-key:secret-key`
(de exemplu, cu `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nu introduceți acreditări reale în jurnale, capturi de ecran sau issue-uri. Maparea setează automat
`x-langfuse-ingestion-version: 4`; Authorization este furnizată în continuare în `headers`.
Atât antetele, cât și sarea de identitate generată utilizează mecanismul existent pentru câmpuri secrete criptate și substituenții API; `STORAGE_ENCRYPTION_KEY` este obligatorie.

Maparea adaugă tipul/modelul generării, detalii despre utilizarea JSON (intrare/ieșire/total și cheile de cache disponibile), instantanee JSON de intrare/ieșire, nivelul ERROR/DEFAULT, mesajul de stare igienizat, numele trace-ului, ID-ul sesiunii, mediul opțional și
`langfuse.observation.metadata.<key>` filtrabil pentru furnizor, modelul solicitat, cale, combinație, sursa cache-ului și starea. `langfuse.observation.completion_start_time` este în format ISO 8601 la
început + TTFT doar când TTFT este cunoscut și se încadrează în durată. Nu sunt trimise atribute de cost.

Modurile de identitate se aplică pentru `langfuse.user.id`:

- `pseudonymous` (implicit): HMAC-SHA256 al ID-ului intern al cheii API, cu un salt aleatoriu de 32 de octeți per destinație. Saltul este generat la creare dacă lipsește, criptat ca `identitySalt`, nu este returnat și este păstrat în timpul editărilor. ID-urile brute ale cheilor nu sunt niciodată introduse în atributele spanurilor. Recrearea sau rotirea saltului unei destinații modifică identitățile.
- `keyName`: numele configurat al cheii API, dezvăluind intenționat eticheta operatorului.
- `none`: fără ID de utilizator. Etichetele de sesiune sunt exportate în continuare atunci când sunt prezente; aceste moduri nu anonimizează conținutul arbitrar al prompturilor sau etichetele de sesiune/corelare furnizate de operator.

### Pornirea fără backfill

Doar la creare, activați **Start from current position (skip existing logs)** sau transmiteți
`startFromCurrentPosition: true` la nivelul superior al payloadului API de creare. Aceasta inițializează
`cursor_row_id` la valoarea maximă curentă a rowid-ului din jurnalul apelurilor păstrat, folosind ajutoarele existente pentru cursor, fără o migrare. Valoarea implicită este false (cursor 0 și backfill pentru istoricul păstrat).
Aceasta nu este o setare pentru resetarea cursorului la actualizare.

Adăugarea partajată `ttftMs` adaugă, de asemenea, o coloană nullable `ttft_ms` în mapperul BigQuery
și în schema tabelelor noi: testul schemei necesită ca fiecare câmp canonic al înregistrării să aibă o coloană. Tabelele existente continuă să exporte neschimbat: `prepare()` citește schema tabelului
și omite doar `ttft_ms` atunci când coloana respectivă lipsește. Adăugați coloana nullable INT64 pentru a obține TTFT
la următoarea rulare sau utilizați un tabel nou. Coloana opțională TTFT nu declanșează o actualizare a schemei. Coloanele cu dovezi de utilizare
urmează fluxul condiționat de compatibilitate, cu activare explicită, de mai jos; celelalte câmpuri ale rândurilor păstrează verificarea strictă a schemei.

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

## 7. Utilizarea

- **Tablou de bord**: Integrări → Export de jurnale. Adăugați o destinație, rulați **Testare** pentru a verifica acreditările
  fără a scrie rânduri, apoi activați-o.
- **Restanțe**: fiecare card al destinației afișează rândurile în așteptare și cursorul; `GET
/api/log-export/status` returnează aceleași valori, plus ultimele 20 de rulări ale lucrărilor.
- **O destinație care eșuează nu le face să eșueze și pe celelalte** — rezumatul rulării înregistrează starea pentru fiecare destinație
  în `last_status` / `last_error`, iar istoricul rulărilor lucrărilor păstrează rezultatul agregat.
- **Ștergerea unei destinații îi șterge cursorul.** Readăugarea acesteia începe de la cel mai vechi
  jurnal de apeluri păstrat, retrimițând rânduri pe care destinația este posibil să le dețină deja. În BigQuery, `insertId` per rând
  absoarbe acest lucru doar în intervalul propriu de deduplicare al BigQuery, prin urmare este preferabil să dezactivați
  o destinație în loc să o ștergeți.

### Compatibilitatea schemei pentru dovezile de utilizare

Tabelele BigQuery noi includ `usage_evidence` care acceptă valoarea nulă (STRING care conține JSON) și
`usage_estimated` (BOOL). Cu `autoCreate` activat, un tabel existent poate primi doar aceste coloane nullable lipsă. Exportatorul păstrează întreaga schemă existentă,
inclusiv metadatele câmpurilor, și trimite un PATCH condiționat folosind etag-ul returnat. O modificare concurentă a schemei face ca exportul să eșueze în loc să o suprascrie;
la următoarea rulare, tabelul este citit din nou.

Cu `autoCreate` dezactivat, adăugați singur aceste coloane înainte de a exporta înregistrări
cu dovezi de utilizare. Metadatele lipsă ale schemei/etag-ului sau o actualizare eșuată împiedică, de asemenea, inserările care conțin dovezi. Cursorul exportului nu avansează în urma acestei erori, iar
dovezile nu sunt eliminate în mod silențios. Păstrarea locală a jurnalelor se aplică în continuare cât timp un export este blocat, așadar rezolvați eroarea înainte ca rândurile sursă păstrate să expire.
