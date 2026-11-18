# Log export (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Esportazione continua e incrementale dei log delle chiamate di OmniRoute verso un archivio di analisi esterno.

La scheda Log della dashboard conserva la cronologia delle richieste in SQLite (`call_logs`), limitata da
rotazione e conservazione. L'esportazione dei log invia lo stesso insieme di record secondo una pianificazione, così che possa sopravvivere
al database locale ed essere unito ad altri dati. BigQuery è la prima destinazione; la
pipeline si basa su un registro, quindi è possibile aggiungere altre destinazioni.

---

## 1. Come funziona

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Pianificazione** — un unico processo cron di `JobRegistry`, `log_export`, con valore predefinito `0 * * * *` (ogni ora,
  UTC). Registrato in `src/lib/initCloudSync.ts`; può essere sovrascritto con `OMNIROUTE_LOG_EXPORT_CRON`.
  Ogni esecuzione elabora tutti i dati in attesa di ciascuna destinazione **abilitata**, in sequenza.
- **Cursore** — il valore implicito `call_logs.rowid` di SQLite, salvato per ciascuna destinazione in
  `log_export_destinations.cursor_row_id`. `timestamp` non viene usato come cursore per scelta: i chiamanti
  possono fornire un proprio valore, quindi una richiesta lenta può essere scritta dopo una più veloce iniziata
  più tardi, e un cursore basato sul timestamp la salterebbe.
- **Elaborazione in batch** — `batch_size` righe per richiesta (valore predefinito 500), `max_rows_per_run` righe per esecuzione
  (valore predefinito 10000), così che un arretrato consistente venga smaltito in più esecuzioni pianificate anziché bloccarne una.
- **Consegna** — il cursore avanza solo dopo che `send()` si è risolta. Un batch non riuscito lascia il
  cursore invariato, quindi le stesse righe vengono ritentate all'esecuzione successiva. La garanzia è
  di consegna almeno una volta con deduplicazione lato destinazione, non di vera consegna esattamente una volta: BigQuery identifica ogni
  riga tramite l'ID del log della chiamata, che rispetta su base best effort all'interno della propria finestra di deduplicazione.
- **Protezione dalle sovrapposizioni** — l'esecuzione cron e `POST .../run` possono attivarsi contemporaneamente. Una destinazione
  già in elaborazione viene saltata anziché elaborata due volte (`skipped: true` nel risultato dell'esecuzione),
  quindi un'esecuzione concorrente non può reinviare un batch o far arretrare il cursore.
- **Ripristino dopo lo svuotamento** — se `cursor_row_id` risulta superiore a `MAX(rowid)` (l'intera tabella è stata
  svuotata e i rowid sono ripartiti da capo), il runner torna a 0 anziché smettere definitivamente di rilevare i dati.

### Runner isolato e limiti

Ogni esecuzione di una destinazione su Node avvia un processo figlio del sistema operativo separato e di breve durata (`child_process`
con IPC, non `worker_threads`). Le letture dei corpi, il parsing e la serializzazione JSON dei payload, il metodo
`prepare()` della destinazione e l'I/O di rete della destinazione vengono tutti eseguiti lì, non nel ciclo degli eventi del server.
Solo la configurazione e piccoli messaggi di avanzamento attraversano IPC; i record esportati non tornano mai al
server. Il processo cron e la route Esegui ora mantengono lo stesso risultato pubblico e la stessa protezione dalle sovrapposizioni.

Il processo figlio apre in sola lettura il percorso `DATA_DIR/storage.sqlite` risolto dal server usando `node:sqlite`,
con `busy_timeout=5000` e `query_only=ON`. Non importa alcun singleton del database e non esegue
migrazioni, backup o aggiornamenti SQLite. La gestione dei metadati degli artefatti mancanti o danneggiati (incluso
l'UPDATE degli artefatti danneggiati) rimane esclusivamente nel percorso dei dettagli della dashboard. Entrambi i percorsi condividono un
resolver dei dettagli puro; l'esportazione usa letture asincrone del filesystem e lo stesso ordine di risoluzione: artefatto → dati legacy
inline → dati legacy su disco → nessuno. Un'esecuzione acquisisce il rowid massimo di inserimento
quando il processo figlio apre il proprio lettore; gli inserimenti successivi attendono l'esecuzione seguente. Si tratta di un
limite di inserimento, non di una transazione SQLite di lunga durata: le scritture WAL e i checkpoint restano liberi di procedere durante
le attese di rete. Gli aggiornamenti e le eliminazioni delle righe esistenti non vengono congelati da questo limite.

Dopo ogni batch accettato, il processo figlio attende una conferma. Il server prima salva
il cursore con `advanceLogExportCursor`, poi invia `ack`; nessun batch successivo inizia prima di questa conferma.
Un errore di invio, un arresto anomalo o un timeout registra un errore senza far avanzare il cursore per quel batch. I batch
già confermati restano salvati; al massimo può essere reinviato l'unico batch non confermato.
Il successo viene registrato solo dopo `done` e un'uscita regolare del processo figlio. In caso di errore, il processo figlio viene terminato
con SIGTERM, passando a SIGKILL dopo 500 ms, e il runner attende la chiusura del processo.

| Variabile d'ambiente                          | Valore predefinito | Scopo                                              |
| --------------------------------------------- | ------------------ | -------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000             | Limite di tempo effettivo per destinazione         |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024               | Limite in MB dell'old space V8 del processo figlio |

Per i valori non validi, non positivi o non interi vengono usati i valori predefiniti. L'impostazione dell'heap non è un limite
RSS totale; batch molto grandi possono comunque esaurire la memoria del processo figlio e far fallire l'esecuzione in sicurezza.
Il valore predefinito di 1024 MB lascia un margine per il batch predefinito di 500 righe di artefatti da 512 KiB con
i corpi abilitati, inclusa la serializzazione JSON di BigQuery suddivisa in blocchi di byte. Non rende sicuro un
batch di 10000 righe con i corpi inclusi. L'esaurimento dell'heap V8 registra un errore con indicazioni operative: ridurre la dimensione
del batch o aumentare `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; il cursore rimane all'ultimo
batch confermato. I corpi storici inline o su disco non sono coperti dal limite previsto per gli artefatti moderni.
Gli operatori devono pianificare separatamente il consumo di RSS, soprattutto all'interno di container con memoria limitata.

Il processo figlio eredita solo il valore risolto di `DATA_DIR`, `NODE_ENV`, `TZ` esplicito (risoluzione
dell'ora locale per i nomi file legacy), `ELECTRON_RUN_AS_NODE` quando presente e i seguenti parametri per le connessioni in uscita:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (e le rispettive forme minuscole),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Un dispatcher Undici globale condivide la risoluzione del proxy basata esclusivamente sull'ambiente e le regole
di esclusione degli host locali del server, incluso `NO_PROXY`; non importa `proxyFetch.ts` né i relativi flag del database o delle funzionalità.
Le credenziali del proxy vengono oscurate nell'output inoltrato e negli errori registrati. Le credenziali di destinazione
vengono trasmesse solo in un singolo messaggio IPC di avvio, mai in argv o nell'ambiente; all'output e agli errori inoltrati
viene aggiunto un prefisso e vengono rimossi i dati sensibili. Solo `ExperimentalWarning` viene disabilitato negli argomenti di esecuzione del processo figlio per evitare
di ripetere l'avviso SQLite di Node a ogni esecuzione cron; gli altri tipi di avviso rimangono visibili.

I moduli di destinazione devono essere importabili senza dipendenze Next.js o riservate al server. L'implementazione
BigQuery esistente soddisfa già questo requisito. Le cache dei token di accesso durano solo per l'esecuzione del processo
figlio, non tra esecuzioni diverse. Node è il runtime supportato (engines in `package.json`), ma la sezione di installazione
di Bun nel README e `Dockerfile.bun` indicano anche un percorso di compatibilità per la produzione che usa
`bun:sqlite` (`src/lib/db/core.ts` / adattatori). Con Bun, le esportazioni mantengono quindi il precedente
percorso all'interno del processo ed emettono un avviso una sola volta: l'isolamento dell'heap e del timeout tramite processo figlio non è disponibile. Usa
Node per l'isolamento dell'event loop e dagli errori OOM; qui Bun non è considerato riservato allo sviluppo.

Quando `includeBodies` è abilitato, preferisci una cadenza nell'ordine dei minuti, ad esempio
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, anziché accumulare un arretrato orario di payload.
I limiti di batch e righe continuano a vincolare ogni esecuzione. Il costo di avvio del processo viene sostenuto per ogni destinazione a ogni esecuzione;
questo comporta un piccolo costo di avvio in cambio dell'isolamento dell'event loop del server, non una riduzione dell'uso totale della CPU.

### Payload (prompt e completamenti)

Per impostazione predefinita, l'esportazione contiene solo i campi di riepilogo mostrati nell'**elenco** dei log. Attivando
**Esporta prompt e risposte** (`includeBodies`), vengono trasmessi anche i dati mostrati nel pannello dei **dettagli**
dei log per ogni chiamata:

| Campo                            | Contenuto                                                                 |
| -------------------------------- | ------------------------------------------------------------------------- |
| `request_body` / `response_body` | I payload della chiamata così come visualizzati nella dashboard           |
| `pipeline_route_decision`        | La destinazione e il modello scelti dal router                            |
| `pipeline_client_request`        | La richiesta grezza esattamente come inviata dal client                   |
| `pipeline_openai_request`        | Dopo la traduzione nel formato OpenAI interno                             |
| `pipeline_provider_request`      | Come effettivamente inviata al servizio a monte, nel formato del provider |
| `pipeline_provider_response`     | La risposta grezza del servizio a monte                                   |
| `pipeline_client_response`       | Ciò che è stato restituito al chiamante                                   |
| `pipeline_error`                 | Dettagli dell'errore a livello di pipeline per una chiamata non riuscita  |
| `bodies_truncated`               | Vero quando un qualsiasi campo precedente ha raggiunto `maxBodyBytes`     |

Si tratta del contenuto dei prompt, quindi è **disattivato per impostazione predefinita** ed è volutamente una scelta per singola destinazione.
Viene trasmesso ciò che mostra la dashboard, perché l'esportazione e `getCallLogById` condividono la risoluzione
dei dettagli: nei payload
i dati personali e i segreti vengono già rimossi o oscurati al momento della scrittura, e una chiamata effettuata con una
chiave API `noLog` non memorizza alcun payload, quindi non c'è nulla da esportare.

I payload vengono letti per ogni riga dall'artefatto nel filesystem, quindi il caricamento completo dei dati viene eseguito solo per le destinazioni
che lo hanno richiesto. Se un artefatto manca o è danneggiato, viene esportato il relativo riepilogo con payload nulli, anziché
far fallire il batch e lasciare bloccato il cursore.

`maxBodyBytes` (valore predefinito 262144) limita ogni campo. I payload più lunghi vengono **troncati anziché
eliminati** — un prompt tagliato risponde comunque alla domanda "che cosa è stato chiesto" — e la riga viene contrassegnata con
`bodies_truncated`. I delta trasmessi in streaming, frammento per frammento, non vengono esportati; la risposta assemblata è
già presente in `pipeline_provider_response` e `pipeline_client_response`.

---

## 2. File

| Componente                                     | Posizione                                    |
| ---------------------------------------------- | -------------------------------------------- |
| Contratto della destinazione                   | `src/lib/logExport/types.ts`                 |
| Registro                                       | `src/lib/logExport/registry.ts`              |
| Gestione dei segreti                           | `src/lib/logExport/secrets.ts`               |
| Esecutore (IPC del processo padre)             | `src/lib/logExport/runner.ts`                |
| Ciclo di vita del processo                     | `src/lib/logExport/childRunner.ts`           |
| Punto di ingresso del processo figlio          | `src/lib/logExport/exportChild.ts`           |
| Apertura in sola lettura                       | `src/lib/db/logExportReadOnly.ts`            |
| Query/mappatura condivise                      | `src/lib/usage/callLogExportQueries.ts`      |
| Risolutore dei dettagli                        | `src/lib/usage/callLogDetailResolver.ts`     |
| Proiezione API                                 | `src/lib/logExport/presenter.ts`             |
| Destinazione BigQuery                          | `src/lib/logExport/destinations/bigquery.ts` |
| Autenticazione dell'account di servizio Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Origine dei log delle chiamate                 | `src/lib/usage/callLogExportSource.ts`       |
| Persistenza                                    | `src/lib/db/logExportDestinations.ts`        |
| Job cron                                       | `src/lib/jobs/logExportJob.ts`               |
| Livello REST                                   | `src/app/api/log-export/`                    |
| Pagina della dashboard                         | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Tutte le route richiedono l'autenticazione di gestione (`requireManagementAuth`). I segreti non vengono mai restituiti:
un segreto memorizzato viene restituito come valore letterale `__stored__` e reinviare tale valore durante un aggiornamento
mantiene la credenziale memorizzata.

La creazione o l'aggiornamento di una destinazione il cui tipo dichiara un segreto **richiede
`STORAGE_ENCRYPTION_KEY`**. In sua assenza, `encrypt()` lascia passare i dati senza modificarli e senza segnalazioni, quindi la scrittura viene
rifiutata con un errore 400 anziché inserire una credenziale in chiaro in SQLite (la stessa protezione applicata dal
webhook Telegram).

| Metodo   | Percorso                                 | Scopo                                                                              |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipi di destinazione + relativo elenco dei campi di configurazione                 |
| `GET`    | `/api/log-export/destinations`           | Elencare le destinazioni (segreti oscurati)                                        |
| `POST`   | `/api/log-export/destinations`           | Creare una destinazione                                                            |
| `GET`    | `/api/log-export/destinations/{id}`      | Leggere una destinazione                                                           |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aggiornare nome / abilitazione / configurazione / elaborazione in batch            |
| `DELETE` | `/api/log-export/destinations/{id}`      | Eliminare                                                                          |
| `POST`   | `/api/log-export/destinations/{id}/test` | Verificare le credenziali senza scrivere nulla                                     |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Smaltire subito i dati in attesa, con lo stesso percorso di esecuzione pianificato |
| `GET`    | `/api/log-export/status`                 | Stato del cron, esecuzioni recenti, dati in attesa per destinazione                |

`GET /api/log-export/types` è ciò che rende generica l'interfaccia utente: il modulo della dashboard viene generato a partire
dai descrittori dei campi restituiti, quindi una nuova destinazione non richiede modifiche all'interfaccia utente.

---

## 4. Destinazione BigQuery

Chiavi di configurazione (`type: "bigquery"`):

| Chiave               | Note                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Progetto GCP che contiene il dataset                                                                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                           |
| `location`           | Utilizzato solo quando è necessario creare il dataset (predefinito `EU`)                                                  |
| `serviceAccountJson` | Chiave dell'account di servizio. Segreto: crittografato a riposo, mai restituito                                          |
| `autoCreate`         | Crea il dataset/la tabella mancanti; aggiunge condizionalmente colonne nullable per l'evidenza d'uso (predefinito `true`) |

L'account di servizio necessita di `bigquery.tables.updateData` sulla tabella di destinazione, oltre a
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` è attivo.
L'aggiornamento di una tabella esistente per aggiungere i due campi nullable per l'evidenza d'uso richiede anche
`bigquery.tables.update`. Un'autorizzazione mancante interrompe l'esportazione senza far avanzare il cursore.

Un batch configurato è un'unità di **cursore**, non una richiesta HTTP: `send()` lo suddivide in chiamate
insertAll di al massimo 500 righe, quindi un valore `batch_size` elevato non può superare il limite di 10 MB
per richiesta di BigQuery. Gli stati transitori (408/429/500/502/503/504) vengono ritentati fino a tre volte con
backoff esponenziale, riutilizzando gli stessi insertIds; gli errori di autenticazione e di schema generano
un'eccezione al primo tentativo invece di consumare l'esecuzione.

Una tabella appena creata non è ancora visibile all'endpoint di streaming, che restituisce
404 per alcuni secondi. Questo 404 viene ritentato, ma **solo quando questa esecuzione ha creato la tabella** —
una tabella realmente mancante interrompe immediatamente l'operazione. Si noti che ricreare una tabella con un nome
eliminato di recente fa sì che BigQuery rifiuti gli inserimenti in streaming per diversi minuti; è una caratteristica
dell'eliminazione seguita dalla ricreazione, quindi è preferibile usare un nuovo nome di tabella invece di eliminare e
aggiungere nuovamente una tabella.

**Un errore parziale arriva come HTTP 200 con un `insertErrors[]` non vuoto.** Viene trattato come
un errore e genera un'eccezione, impedendo al cursore di avanzare oltre le righe che BigQuery non ha mai
accettato; `tests/unit/log-export-bigquery.test.ts` fissa questo comportamento.

Il trasporto è un semplice REST: un'asserzione RS256 autofirmata viene scambiata con un token di accesso presso
`https://oauth2.googleapis.com/token`, quindi le righe vengono inviate a `tabledata.insertAll`. Non viene
incluso alcun SDK Google. I token di accesso vengono memorizzati nella cache in-process per (account di servizio, ambito).

La tabella creata contiene una colonna per ogni campo della scheda Logs più `exported_at` ed è strutturata per
il modo in cui i log delle chiamate vengono effettivamente interrogati:

- **Partizionata per giorno su `timestamp`**, in modo che una query delimitata per data esegua la scansione
  solo di quei giorni.
- **Raggruppata per `api_key_name`, `provider`, `model`, `status`** (in quest'ordine), in modo che il filtraggio per
  chi l'ha eseguita, dove è stata inoltrata o se è fallita elimini i blocchi all'interno di ogni partizione. BigQuery
  consente al massimo quattro colonne di clustering e l'ordine è importante: un filtro solo su `api_key_name`
  elimina i blocchi, mentre un filtro solo su `status` non lo fa.
- **Conservazione opzionale delle partizioni** tramite `partitionExpirationDays` (0 conserva tutto), applicata
  quando la tabella viene creata.

Entrambe le impostazioni vengono applicate al momento della creazione. Una tabella esistente conserva il layout che
ha già, quindi indirizzare la destinazione a un nuovo ID di tabella se si desidera adottarle.

`tests/unit/log-export-bigquery.test.ts` verifica che il mapper e lo schema della tabella rimangano
sincronizzati, così una nuova colonna del log delle chiamate non può essere eliminata silenziosamente durante
l'esportazione.

I batch vengono suddivisi in base a **sia il numero di righe sia i byte serializzati**. Il solo numero di righe non è sufficiente
quando vengono esportati payload: 500 righe contenenti prompt possono occupare decine di megabyte e insertAll
rifiuta una richiesta superiore a 10 MB. I blocchi si chiudono a 500 righe o a 9 MB, a seconda di quale condizione si verifica per prima.

---

## 5. Destinazione di tracce OTLP/HTTP

La configurazione usa `type: "otlp-http"`. Si tratta di un'esportazione pianificata, supportata da cursore, dei log delle chiamate persistiti, non del sink di eventi di routing live best-effort in
`open-sse/services/routing/otel.ts`. Non legge né modifica le variabili d'ambiente, i timer o i buffer di quel sink. L'abilitazione di entrambi può produrre due tipi indipendenti di span;
usa l'ambito di strumentazione `omniroute.log-export` per distinguere questi span dei log delle chiamate.

| Chiave                   | Valore predefinito / scopo                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `endpoint`               | URL completo obbligatorio delle tracce HTTP(S); non viene aggiunto alcun suffisso `/v1/traces` |
| `headers`                | Righe opzionali `Name: value` oppure oggetto JSON di stringhe; crittografati                   |
| `requestHeaderAllowlist` | Vuoto (disattivato); nomi/prefissi degli header client da acquisire come attributi degli span  |
| `serviceName`            | `omniroute`; risorsa `service.name`                                                            |
| `langfuseMapping`        | `false`; aggiunge gli attributi di generazione/sessione/utente Langfuse                        |
| `identity`               | `pseudonymous`, `keyName` oppure `none`                                                        |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                        |
| `timeoutMs`              | `30000` per tentativo HTTP                                                                     |
| `environment`            | Non impostato; `langfuse.environment` opzionale                                                |

Il dashboard generico esegue il rendering di questi campi. `paths` accetta un array API oppure un'area di testo con percorsi esatti separati da nuove righe/virgole. Embeddings, rerank e altri percorsi vengono ignorati a meno che non siano esplicitamente consentiti. Le righe ignorate fanno comunque avanzare il cursore; i contatori `exported`/`exportedTotal` del runner esistente contano le righe sorgente elaborate, incluse quelle filtrate, anziché gli span accettati. Il filtraggio viene eseguito nel processo figlio, senza modificare il contratto IPC/cursore.

La validazione degli URL usa l'helper senza DB `parseAndValidateNonMetadataUrl` da
`src/shared/network/outboundUrlGuard.ts`: la policy `block-metadata`. Ha gli stessi controlli incondizionati sui metadati/protocolli/credenziali incorporate del validatore dei webhook, con gli URL privati esplicitamente consentiti, ma permette intenzionalmente destinazioni localhost/LAN senza un override del flag globale delle funzionalità. Ciò consente endpoint self-hosted di Langfuse, Phoenix, Tempo e Collector, inclusi endpoint HTTP privati. Gli host dei metadati cloud sono sempre bloccati.
I reindirizzamenti non vengono seguiti, quindi un collector non può reindirizzare le credenziali verso un host diverso. Come il guard lessicale degli URL esistente, questo non blocca la risoluzione DNS; configura solo host sotto il controllo dell'operatore. Preferisci HTTPS ogni volta che l'endpoint non si trova su una rete considerata attendibile.

### Payload e distribuzione

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) trasporta uno
span CLIENT per ogni riga consentita, denominato in base al percorso della richiesta esatto. La denominazione per percorso distingue Chat Completions, Responses e Messages senza incorporare dati sul modello o sull'identità nel nome dello span. Gli attributi della risorsa includono `service.name` e `service.version` del pacchetto.

Il logger dei normali tentativi di chat (`open-sse/handlers/chatCore/attemptLogging.ts`) scrive
`duration = Date.now() - startTime` al completamento e non fornisce un timestamp;
`saveCallLogOperation` in `src/lib/usage/callLogs.ts` imposta per impostazione predefinita il timestamp sull'istante di scrittura (completamento). L'esportazione imposta quindi end = timestamp della riga e start = end − duration
(millisecondi, convertiti in nanosecondi decimali). Anche i timestamp storici forniti dal chiamante
vengono mantenuti come orario di fine; non esiste alcun discriminatore per riga tra inizio e completamento.
Una durata null diventa zero. I timestamp non validi o mancanti fanno fallire il batch anziché creare span non deterministici. `ttftMs` è nullable e viene mappato a `omniroute.ttft_ms`.

Gli attributi includono `gen_ai.operation.name="chat"`, provider, modello richiesto/di risposta,
token di input/output, token opzionali di lettura cache/creazione cache/ragionamento, stato HTTP,
combo, origine della cache, tag di sessione e ID di correlazione. I valori interi OTLP e i timestamp
sono stringhe decimali; stringhe, booleani e numeri frazionari usano le rispettive varianti di valore
OTLP native. Gli span di errore hanno stato ERROR e un messaggio di stato sanificato. Il record canonico non contiene l'URL host upstream, quindi `server.address` viene omesso anziché identificare erroneamente il collector come server del modello. Il costo non viene esportato.

Solo `includeBodies=true` idrata il contenuto. Con `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` contengono il JSON sanificato del corpo della richiesta/risposta come memorizzato da OmniRoute (canonizzato quando analizzabile), non un array di messaggi semconv ristrutturato. I corpi troncati/non JSON rimangono testo non elaborato. Con `langfuseMapping=true`,
i corpi vengono emessi solo come `langfuse.observation.input` / `langfuse.observation.output`;
gli attributi `gen_ai.*.messages` vengono omessi, così ogni corpo viene inviato una sola volta. Entrambe le modalità ereditano `maxBodyBytes` dal percorso di idratazione esistente;
`omniroute.bodies_truncated=true` indica il troncamento.
Questa destinazione non aggiunge snapshot di pipeline né letture di artifact non sanificate;
l'acquisizione opzionale degli header della richiesta usa lo snapshot client idratato esistente descritto di seguito.
Usa una cadenza al minuto, ad esempio `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, quando esporti
i corpi, invece di accumulare un arretrato orario.

### Header opzionali delle richieste client

L'acquisizione degli header è **disattivata per impostazione predefinita**. Imposta `requestHeaderAllowlist` nella configurazione della destinazione e abilita **Esporta prompt e risposte** (`includeBodies: true` nella destinazione).
La allowlist accetta un array API oppure un'area di testo con nomi separati da nuove righe/virgole:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

I nomi corrispondono senza distinzione tra maiuscole e minuscole e in modo esatto, a meno che un singolo `*` finale non selezioni un prefisso non vuoto del nome dell'header. `*` da solo, i caratteri jolly incorporati e i nomi di header HTTP non validi vengono rifiutati.
Sono consentiti al massimo 64 selettori, ciascuno con un nome o prefisso di al massimo 256 byte ASCII.
Questa impostazione è separata da `headers`, che autentica l'esportatore presso il collector.

La cattura legge solo `pipeline_client_request`, popolato da `clientRawRequest` (oppure dal precedente `clientRequest`) della pipeline dettagliata salvata. Non utilizza mai come fallback gli header della richiesta del provider.
La registrazione dettagliata della pipeline deve essere stata abilitata quando la richiesta è stata registrata. Se
`includeBodies` è disabilitato, oppure il JSON dello snapshot del client è assente, danneggiato o troncato, non vengono emessi attributi degli header. L'aumento di `maxBodyBytes` può evitare il troncamento dello snapshot in fase di esportazione;
non può ripristinare dettagli che non sono mai stati salvati. Uno snapshot di oltre 1 MiB o contenente più di
256 voci di header viene ignorato. L'esportazione esistente di prompt/risposta rimane abilitata insieme alla
cattura degli header; l'allowlist non fornisce una modalità di idratazione limitata ai soli header.

I valori selezionati diventano array di stringhe OTLP `http.request.header.<full lowercase header name>`,
anche quando contengono una sola stringa. Ad esempio, `X-OmniRoute-Meta-Team: example-team` diventa
`http.request.header.x-omniroute-meta-team` con
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Il prefisso completo viene preservato: si tratta di header ordinari, senza analisi dei campi di business né
conversione in `omniroute.metadata.*` / metadati Langfuse. `langfuseMapping` non modifica la semantica degli header. Un `User-Agent` selezionato con un singolo valore imposta anche lo scalare standard
`user_agent.original`. Le virgole all'interno di un singolo valore non vengono suddivise. Le varianti che differiscono per maiuscole e minuscole vengono unite nell'ordine delle voci salvate; se una variante non è valida, l'intero header viene omesso. Gli attributi sono ordinati per nome in minuscolo.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, gli header contenenti chiavi API, i nomi contenenti indicatori
auth/token/secret/password/credential e le credenziali interne del gateway vengono sempre esclusi, anche se selezionati o parzialmente mascherati nella memorizzazione. I pattern di credenziali noti riutilizzano il rilevatore condiviso delle credenziali; i marcatori di redazione vengono omessi e non esportati come valori sicuri.
Sono accettate solo stringhe e array di stringhe non vuoti; numeri e oggetti non vengono convertiti.
I nomi non validi, le chiavi del prototipo, i caratteri di controllo (ad eccezione del tab orizzontale) e i caratteri Unicode malformati vengono ignorati senza causare il fallimento del batch né rifletterne il contenuto negli errori.

Ogni span cattura al massimo 32 header, 16 valori per header, 4096 byte UTF-8 per valore
e 16384 byte UTF-8 totali tra i nomi e i valori degli header catturati. Gli header troppo grandi o non validi
vengono omessi interamente, non troncati. La selezione è una decisione sulla privacy dell'operatore: nomi dall'aspetto sicuro possono comunque contenere dati personali e questi limiti/rilevatori non sono uno strumento generico di rimozione dei dati personali.

### Limiti di consegna

Le richieste sono limitate a 500 span e 4 MiB di JSON UTF-8, incluso l'envelope.
Ogni span consentito viene sottoposto a un controllo delle dimensioni prima della prima richiesta di un batch del cursore. Un singolo
span più grande del limite non invia alcuna parte di quel batch e fallisce con indicazioni per ridurre
`maxBodyBytes`; non viene eliminato silenziosamente. Il preflight conserva solo i riferimenti ai record e i conteggi dei byte,
eliminando ogni span/JSON temporaneo; gli span vengono ricostruiti in blocchi di dimensioni limitate
invece di mantenere una seconda copia serializzata del batch. Gli errori HTTP 408/429/5xx, gli errori di rete e i timeout ricevono al massimo
tre tentativi, con backoff esponenziale di 250/500 ms. `Retry-After`, espresso in secondi o come data HTTP,
può estendere il ritardo fino a 5 secondi. Gli altri status causano un errore immediato. Anche il rifiuto parziale OTLP 2xx genera un'eccezione invece di
confermare uno span perso; vengono accettati acknowledgement JSON vuoti o validi, con un
limite di lettura della risposta di 64 KiB.

Gli errori contengono solo informazioni di proprietà dell'esportatore: status HTTP, classe di retry, tentativi e conteggi degli span inviati, oppure un testo fisso relativo a un acknowledgement o a un errore di rete. I corpi delle risposte del collector, i conteggi dei successi parziali e gli header delle risposte non vengono mai copiati negli errori, nei log o nella dashboard. Un batch fallito o accettato parzialmente non viene confermato: la destinazione mostra lo stato
Failing con quello status, il cursore rimane sull'ultimo batch confermato e l'esecuzione successiva
invia nuovamente le stesse righe. Gli status permanenti continuano a causare errori finché il collector o la configurazione non vengono corretti. Per i dettagli della risposta, usare i log del collector. I riepiloghi degli errori del log delle chiamate mantengono la propria redazione separata.
`prepare()` non effettua alcun provisioning; Test invia esattamente `{"resourceSpans":[]}` e riporta
lo status HTTP senza scrivere span nel log delle chiamate.

Gli ID di traccia e gli ID degli span sono i primi 32/16 caratteri esadecimali di SHA-256 calcolati su
`"omniroute.trace\\0" + callLogId` e `"omniroute.span\\0" + callLogId`. I nuovi invii utilizzano
gli stessi ID. Questo non garantisce la deduplicazione: alcuni backend, inclusa l'acquisizione Langfuse
v4, non deduplicano gli span con lo stesso ID. Un arresto anomalo o un errore parziale di un blocco può
inviare nuovamente al massimo l'unico batch del cursore non confermato; l'intero batch può essere duplicato,
non solo il suo ultimo blocco HTTP. Scegliere le dimensioni del batch del cursore tenendo conto di questo compromesso.

### Esempio Langfuse

Configurare questi campi per un'istanza Langfuse self-hosted:

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

Creare localmente il valore Authorization come Base64 della stringa letterale `public-key:secret-key`
(ad esempio con `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Non inserire credenziali reali nei log, negli screenshot o nelle issue. Il mapping imposta automaticamente
`x-langfuse-ingestion-version: 4`; Authorization deve comunque essere fornita in `headers`.
Sia gli header sia il salt di identità generato utilizzano il meccanismo esistente dei campi segreti crittografati e i placeholder API; `STORAGE_ENCRYPTION_KEY` è obbligatoria.

La mappatura aggiunge il tipo/modello di generazione, i dettagli sull'utilizzo JSON (input/output/totale e chiavi della cache disponibili), snapshot di input/output JSON, i livelli ERROR/DEFAULT, un messaggio di stato sanificato, il nome della traccia, l'ID della sessione, l'ambiente opzionale e
`langfuse.observation.metadata.<key>` filtrabile per provider, modello richiesto, percorso, combinazione, origine della cache e stato. `langfuse.observation.completion_start_time` è in formato ISO 8601 all'inizio + TTFT solo quando il TTFT è noto e rientra nella durata. Non vengono inviati attributi relativi ai costi.

Le modalità di identità si applicano a `langfuse.user.id`:

- `pseudonymous` (predefinita): HMAC-SHA256 dell'ID interno della chiave API con un salt casuale di 32 byte per destinazione. Il salt viene generato alla creazione se assente, crittografato come `identitySalt`, non viene mai restituito e viene mantenuto durante le modifiche. Gli ID grezzi delle chiavi non vengono mai inseriti negli attributi degli span. La ricreazione o la rotazione del salt di una destinazione modifica le identità.
- `keyName`: il nome della chiave API configurato, rivelando intenzionalmente tale etichetta dell'operatore.
- `none`: nessun ID utente. I tag di sessione vengono comunque esportati quando presenti; queste modalità non rendono anonimo il contenuto arbitrario dei prompt né le etichette di sessione/correlazione fornite dall'operatore.

### Avvio senza backfill

Solo in fase di creazione, abilita **Avvia dalla posizione corrente (ignora i log esistenti)** oppure passa
`startFromCurrentPosition: true` al livello superiore del payload dell'API di creazione. Inizializza
`cursor_row_id` al rowid massimo corrente delle righe dei log delle chiamate conservate utilizzando gli helper del cursore esistenti, senza migrazione. Il valore predefinito è false (cursore 0 e backfill della cronologia conservata).
Non è un'impostazione per reimpostare il cursore in fase di aggiornamento.

L'aggiunta condivisa di `ttftMs` aggiunge anche una colonna nullable `ttft_ms` al mapper BigQuery
e allo schema della nuova tabella: il test dello schema richiede che ogni campo canonico del record disponga di una colonna. Le tabelle esistenti continuano a esportare senza modifiche: `prepare()` legge lo schema della tabella
e omette `ttft_ms` solo quando tale colonna è assente. Aggiungi la colonna nullable INT64 per ottenere il TTFT
alla prossima esecuzione oppure usa una nuova tabella. La colonna TTFT opzionale non attiva un aggiornamento dello schema. Le colonne di evidenza dell'utilizzo
seguono il flusso di compatibilità condizionale e con adesione esplicita riportato di seguito; gli altri campi delle righe mantengono il controllo rigoroso dello schema.

---

## 6. Aggiungere una destinazione

1. Crea `src/lib/logExport/destinations/<name>.ts` che esporti un `LogExportDestinationType`:
   un `configSchema` Zod, un array di descrittori `fields` per l'interfaccia utente, `secretFields` e un
   `createClient(config)` che restituisca `test()` / `prepare()` / `send(records)`.
2. Aggiungilo all'array `DESTINATIONS` in `src/lib/logExport/registry.ts`.
3. Scrivi i test in `tests/unit/`.

La modifica è tutta qui: la persistenza, il job cron, il livello REST, la crittografia dei segreti e il
modulo della dashboard leggono tutti il registro.

Due regole per una nuova destinazione:

- `send()` **deve generare un'eccezione** in caso di errore parziale. Il completamento con successo significa "la destinazione contiene queste righe",
  e il cursore le supera definitivamente.
- Una destinazione che accetta un URL fornito dall'utente deve convalidarlo tramite
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) prima di effettuare la richiesta,
  come avviene per i webhook. BigQuery non ne ha bisogno: i suoi host sono costanti.

---

## 7. Utilizzo

- **Dashboard**: Integrazioni → Esportazione dei log. Aggiungi una destinazione, esegui **Test** per verificare le credenziali
  senza scrivere righe, quindi abilitala.
- **Backlog**: ogni scheda della destinazione mostra le righe in sospeso e il cursore; `GET
/api/log-export/status` restituisce gli stessi dati, oltre agli ultimi 20 avvii dei job.
- **Un errore in una destinazione non causa errori nelle altre** — il riepilogo dell'esecuzione registra lo
  stato per destinazione in `last_status` / `last_error`, mentre la cronologia degli avvii dei job conserva l'aggregato.
- **L'eliminazione di una destinazione elimina il relativo cursore.** Se la aggiungi nuovamente, l'esportazione riparte dalla chiamata più vecchia conservata
  nel log, inviando nuovamente righe che la destinazione potrebbe già contenere. Su BigQuery, `insertId` per ogni riga assorbe questo effetto solo all'interno della finestra di deduplicazione
  di BigQuery, quindi è preferibile disabilitare una destinazione anziché eliminarla.

### Compatibilità dello schema delle prove di utilizzo

Le nuove tabelle BigQuery includono `usage_evidence` nullable (STRING contenente JSON) e
`usage_estimated` (BOOL). Con `autoCreate` abilitato, una tabella esistente può ricevere
solo queste colonne nullable mancanti. L'esportatore conserva lo schema esistente completo,
inclusi i metadati dei campi, e invia un PATCH condizionale utilizzando l'`etag` restituito. Una modifica simultanea allo schema interrompe l'esportazione anziché sovrascriverlo;
all'esecuzione successiva la tabella viene letta nuovamente.

Con `autoCreate` disabilitato, aggiungi tu queste colonne prima di esportare i record
con prove di utilizzo. L'assenza dei metadati dello schema/`etag` o un aggiornamento non riuscito impedisce inoltre gli inserimenti contenenti prove. Il cursore di esportazione non avanza in caso di errore e le prove non vengono mai eliminate
silenziosamente. La conservazione locale dei log continua ad applicarsi mentre un'esportazione è bloccata, quindi risolvi l'errore prima che le righe sorgente conservate scadano.
