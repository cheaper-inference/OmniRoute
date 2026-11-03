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

| Chiave               | Note                                                                             |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | Progetto GCP che contiene il dataset                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | Usata solo quando è necessario creare il dataset (valore predefinito `EU`)       |
| `serviceAccountJson` | Chiave dell'account di servizio. Segreto: crittografato a riposo, mai restituito |
| `autoCreate`         | Crea il dataset e la tabella alla prima esportazione (valore predefinito `true`) |

L'account di servizio richiede `bigquery.tables.updateData` sulla tabella di destinazione, oltre a
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` è attivo.

Un batch configurato è un'unità del **cursore**, non un'unità HTTP: `send()` lo suddivide in chiamate insertAll
di massimo 500 righe, quindi un valore elevato di `batch_size` non può superare il limite di 10 MB per richiesta di BigQuery.
I codici di stato transitori (408/429/500/502/503/504) comportano fino a tre nuovi tentativi con attesa
esponenziale, riutilizzando gli stessi insertIds; gli errori di autenticazione e di schema generano un'eccezione al primo tentativo anziché
sprecare il resto dell'esecuzione.

Una tabella appena creata non è ancora visibile all'endpoint di streaming, che risponde
404 per alcuni secondi. In caso di 404 la richiesta viene ritentata, ma **solo se la tabella è stata creata durante questa esecuzione** —
una tabella realmente mancante causa comunque un errore immediato. Si noti che ricreare una tabella con un nome
eliminato di recente fa sì che BigQuery rifiuti gli inserimenti in streaming per diversi minuti; questo è un
comportamento della sequenza eliminazione-ricreazione, quindi è preferibile usare un nuovo nome di tabella anziché eliminarne e ricrearne una.

**Un errore parziale viene restituito come HTTP 200 con `insertErrors[]` non vuoto.** Viene trattato come
un errore e genera un'eccezione, impedendo così al cursore di avanzare oltre le righe che BigQuery non ha mai
accettato; `tests/unit/log-export-bigquery.test.ts` verifica questo comportamento.

Il trasporto usa semplicemente REST — un'asserzione RS256 autofirmata viene scambiata con un token di accesso su
`https://oauth2.googleapis.com/token`, quindi le righe vengono inviate a `tabledata.insertAll`. Non viene
incluso alcun SDK Google. I token di accesso vengono memorizzati nella cache del processo per coppia (account di servizio, ambito).

La tabella creata contiene una colonna per ogni campo della scheda Logs più `exported_at`, ed è organizzata in base
al modo in cui vengono effettivamente interrogati i log delle chiamate:

- **Partizionata per giorno su `timestamp`**, in modo che una query limitata per data scansioni solo quei giorni.
- **Raggruppata in cluster per `api_key_name`, `provider`, `model`, `status`** (in quest'ordine), in modo che i filtri su
  chi ha eseguito la chiamata, dove è stata indirizzata o se è fallita escludano blocchi all'interno di ogni partizione. BigQuery
  consente al massimo quattro colonne di clustering e l'ordine è importante: un filtro sul solo `api_key_name`
  esclude blocchi, mentre un filtro sul solo `status` non lo fa.
- **Conservazione facoltativa delle partizioni** tramite `partitionExpirationDays` (0 conserva tutto), applicata
  alla creazione della tabella.

Entrambe le impostazioni si applicano al momento della creazione. Una tabella esistente mantiene la propria organizzazione, quindi
impostare come destinazione un nuovo ID di tabella se si desidera adottarle.

`tests/unit/log-export-bigquery.test.ts` verifica che il mapper e lo schema della tabella rimangano
sincronizzati, affinché una nuova colonna del log delle chiamate non possa essere scartata silenziosamente durante l'esportazione.

I batch vengono suddivisi in base **sia** al numero di righe sia ai byte serializzati. Il solo numero di righe non è sufficiente
quando vengono esportati i payload: 500 righe contenenti prompt possono occupare decine di megabyte, e insertAll
rifiuta le richieste superiori a 10 MB. Ogni blocco viene chiuso al raggiungimento di 500 righe o 9 MB, a seconda di quale limite venga raggiunto per primo.

---

## 5. Destinazione delle tracce OTLP/HTTP

La configurazione usa `type: "otlp-http"`. Si tratta di un'esportazione pianificata dei
log delle chiamate persistiti, basata su cursore, non del sink best-effort degli eventi di routing in tempo reale in
`open-sse/services/routing/otel.ts`. Non legge né modifica le variabili d'ambiente,
i timer o i buffer di quel sink. Abilitare entrambi può produrre due tipi indipendenti di span;
usa l'ambito di strumentazione `omniroute.log-export` per distinguere questi span dei log delle chiamate.

| Chiave                   | Valore predefinito / scopo                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `endpoint`               | URL HTTP(S) completo delle tracce obbligatorio; non viene aggiunto il suffisso `/v1/traces`   |
| `headers`                | Righe `Name: value` o oggetto JSON di stringhe facoltativi; crittografati                     |
| `requestHeaderAllowlist` | Vuoto (disattivato); nomi/prefissi degli header client da acquisire come attributi degli span |
| `serviceName`            | `omniroute`; attributo della risorsa `service.name`                                           |
| `langfuseMapping`        | `false`; aggiunge attributi Langfuse di generazione/sessione/utente                           |
| `identity`               | `pseudonymous`, `keyName` o `none`                                                            |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                       |
| `timeoutMs`              | `30000` per tentativo HTTP                                                                    |
| `environment`            | Non impostato; `langfuse.environment` facoltativo                                             |

La dashboard generica visualizza questi campi. `paths` accetta un array tramite API o un'area di testo
con percorsi esatti separati da nuove righe/virgole. I percorsi di embedding, rerank e gli altri percorsi vengono
ignorati, salvo se esplicitamente consentiti. Le righe ignorate fanno comunque avanzare il cursore; i contatori
`exported`/`exportedTotal` del runner esistente contano le righe sorgente elaborate, comprese quelle filtrate,
anziché gli span accettati. Il filtraggio viene eseguito nel processo figlio, senza modificarne
il contratto IPC/cursore.

La convalida degli URL usa la funzione di supporto `parseAndValidateNonMetadataUrl`, che non dipende dal DB, da
`src/shared/network/outboundUrlGuard.ts`: la policy `block-metadata`. Applica gli stessi
controlli incondizionati su metadati/protocollo/credenziali incorporate del validatore dei webhook con
gli URL privati abilitati, ma consente deliberatamente destinazioni localhost/LAN senza un override globale
tramite feature flag. Questo consente endpoint Langfuse, Phoenix, Tempo e Collector
self-hosted, inclusi endpoint HTTP privati. Gli host dei metadati cloud sono sempre bloccati.
I reindirizzamenti non vengono seguiti, quindi un collector non può reindirizzare le credenziali a un host diverso.
Come la protezione lessicale degli URL esistente, questa non vincola la risoluzione DNS; configura solo
host controllati dall'operatore. Preferisci HTTPS ogni volta che l'endpoint non si trova su una rete attendibile.

### Payload e consegna

Il formato JSON OTLP/HTTP (`ExportTraceServiceRequest`, `Content-Type: application/json`) trasporta uno
span CLIENT per ogni riga consentita, denominato con il percorso esatto della richiesta. La denominazione basata sul percorso distingue
Chat Completions, Responses e Messages senza incorporare dati del modello o dell'identità nel
nome dello span. Gli attributi della risorsa includono `service.name` e `service.version` del pacchetto.

Il normale logger dei tentativi di chat (`open-sse/handlers/chatCore/attemptLogging.ts`) scrive
`duration = Date.now() - startTime` al completamento e non fornisce un timestamp;
`saveCallLogOperation` in `src/lib/usage/callLogs.ts` imposta il timestamp predefinito sull'ora di scrittura
(completamento). L'esportazione imposta quindi fine = timestamp della riga e inizio = fine − durata
(millisecondi, convertiti in nanosecondi decimali). Anche i timestamp storici forniti dal chiamante
vengono mantenuti come ora di fine; non esiste un discriminatore di inizio/completamento per ogni riga.
Una durata null diventa zero. I timestamp non validi/mancanti fanno fallire il batch anziché creare
span non deterministici. `ttftMs` può essere null e viene mappato su `omniroute.ttft_ms`.

Gli attributi includono `gen_ai.operation.name="chat"`, provider, modello richiesto/di risposta,
token di input/output, token facoltativi di lettura della cache/creazione della cache/ragionamento, stato HTTP,
combo, origine della cache, tag di sessione e ID di correlazione. I valori interi OTLP e i timestamp
sono stringhe decimali; stringhe, booleani e numeri frazionari usano le rispettive varianti native dei valori OTLP.
Gli span di errore hanno stato ERROR e un messaggio di stato sanificato. Il record canonico
non contiene l'URL dell'host upstream, quindi `server.address` viene omesso anziché
identificare erroneamente il collector come server del modello. Il costo non viene esportato.

Solo `includeBodies=true` carica i contenuti. Con `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` contengono il JSON sanificato del corpo della richiesta/risposta
così come memorizzato da OmniRoute (canonicalizzato quando è analizzabile), non un array di messaggi
ristrutturato secondo le convenzioni semantiche. I corpi troncati/non JSON rimangono testo grezzo. Con `langfuseMapping=true`,
i corpi vengono emessi solo come `langfuse.observation.input` / `langfuse.observation.output`;
gli attributi `gen_ai.*.messages` vengono omessi, così ogni corpo viene inviato una sola volta. Entrambe le modalità
ereditano `maxBodyBytes` dal percorso di caricamento esistente;
`omniroute.bodies_truncated=true` segnala il troncamento.
Questa destinazione non aggiunge snapshot supplementari della pipeline né letture di artefatti non sanificati;
l'acquisizione facoltativa degli header della richiesta usa lo snapshot client caricato esistente descritto di seguito.
Usa una cadenza nell'ordine dei minuti, ad esempio `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, quando esporti
i corpi, anziché accumulare un arretrato orario.

### Header facoltativi delle richieste client

L'acquisizione degli header è **disattivata per impostazione predefinita**. Imposta `requestHeaderAllowlist` nella configurazione della destinazione
e abilita **Esporta prompt e risposte** (`includeBodies: true` nella destinazione).
L'elenco dei valori consentiti accetta un array tramite API o un'area di testo con nomi separati da nuove righe/virgole:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

I nomi vengono confrontati senza distinzione tra maiuscole e minuscole e con corrispondenza esatta, a meno che un singolo `*` finale non selezioni un prefisso non vuoto
del nome dell'intestazione. Un `*` isolato, i caratteri jolly incorporati e i nomi di intestazione HTTP non validi vengono rifiutati.
Sono consentiti al massimo 64 selettori, ciascuno con un nome/prefisso di massimo 256 byte ASCII.
Questa impostazione è separata da `headers`, che autentica l'esportatore presso il collettore.

L'acquisizione legge solo `pipeline_client_request`, popolato a partire da
`clientRawRequest` (o dal precedente `clientRequest`) della pipeline dettagliata salvata. Non ricorre mai alle intestazioni della richiesta al provider.
La registrazione dettagliata della pipeline deve essere stata abilitata al momento della registrazione della richiesta. Con
`includeBodies` disabilitato, o se il JSON dell'istantanea del client è mancante, danneggiato o troncato, non viene emesso alcun attributo
di intestazione. Aumentare `maxBodyBytes` può evitare il troncamento dell'istantanea in fase di esportazione;
non può ripristinare dettagli che non sono mai stati salvati. Un'istantanea superiore a 1 MiB o contenente più di
256 voci di intestazione viene ignorata. L'esportazione esistente di prompt/risposte rimane abilitata insieme
all'acquisizione delle intestazioni; l'elenco degli elementi consentiti non fornisce una modalità di idratazione delle sole intestazioni.

I valori selezionati diventano array di stringhe OTLP `http.request.header.<full lowercase header name>`,
anche nel caso di una singola stringa. Ad esempio, `X-OmniRoute-Meta-Team: example-team` diventa
`http.request.header.x-omniroute-meta-team` con
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Il prefisso completo viene mantenuto: si tratta di intestazioni ordinarie, senza analisi dei campi di business né
conversione in metadati `omniroute.metadata.*` / Langfuse. `langfuseMapping` non modifica la semantica
delle intestazioni. Un `User-Agent` selezionato con un solo valore imposta anche lo scalare standard
`user_agent.original`. Le virgole all'interno di un valore non vengono usate per suddividerlo. Le varianti di maiuscole e minuscole vengono unite nell'ordine
delle voci salvate; qualsiasi variante non valida comporta l'omissione dell'intera intestazione. Gli attributi sono ordinati per nome in minuscolo.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, le intestazioni delle chiavi API, i nomi contenenti
marcatori auth/token/secret/password/credential e le credenziali interne del gateway sono sempre
esclusi, anche se selezionati o parzialmente mascherati nell'archiviazione. I pattern di credenziali noti riutilizzano
il rilevatore di credenziali condiviso; i marcatori di oscuramento vengono omessi, non esportati come valori sicuri.
Sono accettati solo stringhe e array di stringhe non vuoti; numeri e oggetti non vengono convertiti.
Nomi non validi, chiavi del prototipo, caratteri di controllo (eccetto la tabulazione orizzontale) e Unicode non valido
vengono ignorati senza far fallire il batch né riportarne il contenuto negli errori.

Ogni span acquisisce al massimo 32 intestazioni, 16 valori per intestazione, 4096 byte UTF-8 per valore
e 16384 byte UTF-8 totali tra nomi e valori delle intestazioni acquisite. Le intestazioni troppo grandi o non valide
vengono omesse interamente, non troncate. La selezione è una decisione dell'operatore in materia di privacy: nomi apparentemente sicuri
possono comunque contenere dati personali, e questi limiti/rilevatori non costituiscono uno strumento generale di rimozione dei dati personali.

### Limiti di consegna

Le richieste sono limitate a 500 span e 4 MiB di JSON UTF-8, incluso l'involucro.
La dimensione di ogni span consentito viene verificata prima della prima richiesta di un batch del cursore. Un singolo
span che supera il limite impedisce l'invio di qualsiasi parte del batch e causa un errore con l'indicazione di ridurre
`maxBodyBytes`; non viene scartato silenziosamente. Il controllo preliminare conserva solo i riferimenti ai record e
i conteggi dei byte, scartando ogni span/JSON temporaneo; gli span vengono ricostruiti per blocchi di dimensione limitata
anziché mantenere una seconda copia serializzata del batch. Gli errori HTTP 408/429/5xx, gli errori di rete e i timeout prevedono al massimo
tre tentativi, con attesa esponenziale di 250/500 ms. I secondi o le date HTTP di `Retry-After`
possono estendere l'attesa fino a 5 secondi. Gli altri codici di stato causano un errore immediato. Anche un rifiuto parziale OTLP 2xx genera un'eccezione anziché
confermare uno span perso; vengono accettate conferme vuote o in formato JSON valido, con un
limite di lettura della risposta di 64 KiB.

Gli errori contengono solo informazioni proprie dell'esportatore: stato HTTP, classe di ritentativo, numero di tentativi e di span
inviati, oppure formulazioni fisse relative a errori di conferma/rete. I corpi delle risposte del collettore,
i conteggi di successo parziale e le intestazioni di risposta non vengono mai copiati negli errori, nei log o nella
dashboard. Un batch fallito o accettato parzialmente non viene confermato: la destinazione mostra
lo stato di errore con quel codice, il cursore rimane sull'ultimo batch confermato e l'esecuzione successiva
reinvia le stesse righe. Gli stati permanenti continuano a causare errori finché il collettore o la configurazione
non vengono corretti. Usare i log del collettore per i dettagli della risposta. I riepiloghi degli errori del registro delle chiamate mantengono
il proprio meccanismo separato di oscuramento.
`prepare()` non predispone nulla; Test invia esattamente `{"resourceSpans":[]}` e riporta
lo stato HTTP senza scrivere span del registro delle chiamate.

Gli ID delle tracce e degli span sono le prime 32/16 cifre esadecimali dell'hash SHA-256 calcolato su
`"omniroute.trace\\0" + callLogId` e `"omniroute.span\\0" + callLogId`. I reinvii mantengono
gli stessi ID. Questo non garantisce la deduplicazione: alcuni backend, inclusa l'ingestione di Langfuse
v4, non deduplicano gli span con lo stesso ID. Un arresto anomalo o un errore parziale di un blocco può
causare il reinvio al massimo dell'unico batch del cursore non confermato; l'intero batch potrebbe essere duplicato,
non solo il suo ultimo blocco HTTP. Scegliere la dimensione del batch del cursore tenendo conto di questo compromesso.

### Esempio Langfuse

Configurare questi campi per un'istanza Langfuse con hosting autonomo:

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

Creare localmente il valore di Authorization codificando in Base64 la stringa letterale `public-key:secret-key`
(ad esempio con `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Non incollare credenziali reali in log, screenshot o segnalazioni. La mappatura imposta automaticamente
`x-langfuse-ingestion-version: 4`; Authorization viene comunque fornito in `headers`.
Sia le intestazioni sia il salt di identità generato usano il meccanismo esistente dei campi segreti
crittografati e i segnaposto API; `STORAGE_ENCRYPTION_KEY` è obbligatorio.

La mappatura aggiunge tipo/modello di generazione, dettagli di utilizzo in JSON (input/output/totale e chiavi
di cache disponibili), snapshot JSON di input/output, livello ERROR/DEFAULT, messaggio di stato sanificato,
nome della traccia, ID di sessione, ambiente opzionale e
`langfuse.observation.metadata.<key>` filtrabile per provider, modello richiesto, percorso, combinazione, origine
della cache e stato. `langfuse.observation.completion_start_time` è in formato ISO 8601 e corrisponde a
inizio + TTFT solo quando il TTFT è noto e rientra nella durata. Non vengono inviati attributi di costo.

Le modalità di identità si applicano a `langfuse.user.id`:

- `pseudonymous` (predefinita): HMAC-SHA256 dell'ID interno della chiave API con un salt casuale
  di 32 byte per ciascuna destinazione. Il salt viene generato alla creazione se assente, crittografato
  come `identitySalt`, mai restituito e conservato durante le modifiche. Gli ID delle chiavi in chiaro non vengono mai
  inseriti negli attributi degli span. Ricreare/ruotare il salt di una destinazione cambia le identità.
- `keyName`: il nome configurato della chiave API, che rivela intenzionalmente tale etichetta dell'operatore.
- `none`: nessun ID utente. I tag di sessione vengono comunque esportati quando presenti; queste modalità non
  anonimizzano il contenuto arbitrario dei prompt né le etichette di sessione/correlazione fornite dall'operatore.

### Avvio senza recupero dei dati pregressi

Solo alla creazione, abilitare **Avvia dalla posizione corrente (salta i log esistenti)** oppure passare
`startFromCurrentPosition: true` al livello principale del payload dell'API di creazione. Questa opzione inizializza
`cursor_row_id` al rowid massimo corrente dei log delle chiamate conservati, usando le funzioni di supporto
del cursore esistenti, senza una migrazione. Il valore predefinito è false (cursore 0 e recupero della cronologia conservata).
Non è un'impostazione per reimpostare il cursore durante un aggiornamento.

L'aggiunta condivisa di `ttftMs` aggiunge anche una colonna `ttft_ms` che ammette valori null al mapper BigQuery
e allo schema delle nuove tabelle: il relativo test dello schema richiede che ogni campo del record canonico abbia una
colonna. Le tabelle esistenti continuano a essere esportate senza modifiche: `prepare()` legge lo schema della tabella e
omette solo `ttft_ms` quando tale colonna è assente. Aggiungere la colonna INT64 che ammette valori null per ottenere il TTFT
alla prossima esecuzione, oppure usare una nuova tabella. Non sono richiesti PATCH, modifiche automatiche dello schema o autorizzazioni
aggiuntive; tutti gli altri campi delle righe mantengono una verifica rigorosa dello schema.

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

## 7. Utilizzo operativo

- **Dashboard**: Integrazioni → Esportazione dei log. Aggiungi una destinazione, esegui **Test** per verificare le credenziali
  senza scrivere righe, quindi abilitala.
- **Arretrato**: ogni scheda di destinazione mostra le righe in attesa e il cursore; `GET
/api/log-export/status` restituisce gli stessi dati più le ultime 20 esecuzioni del job.
- **Una destinazione che non funziona non compromette le altre** — il riepilogo dell'esecuzione registra lo stato di ciascuna destinazione
  in `last_status` / `last_error`, mentre la cronologia delle esecuzioni del job conserva i dati aggregati.
- **L'eliminazione di una destinazione elimina il relativo cursore.** Aggiungerla di nuovo fa ripartire l'esportazione dal log delle chiamate conservato più vecchio,
  inviando nuovamente righe che la destinazione potrebbe già contenere. Su BigQuery, il campo
  `insertId` di ciascuna riga evita questi duplicati solo all'interno della finestra di deduplicazione di BigQuery, quindi è preferibile disabilitare
  una destinazione anziché eliminarla.
