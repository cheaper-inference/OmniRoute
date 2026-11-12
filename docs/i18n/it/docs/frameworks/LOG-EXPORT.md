# Log export (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Esportazione continua e incrementale dei log delle chiamate di OmniRoute verso un archivio di analisi esterno.

La scheda Logs della dashboard conserva la cronologia delle richieste in SQLite (`call_logs`), con limiti imposti da
rotazione e conservazione. L'esportazione dei log invia periodicamente lo stesso insieme di record all'esterno, affinché possa sopravvivere
al database locale ed essere correlato con altri dati. BigQuery è la prima destinazione; la
pipeline usa un registro, quindi è possibile aggiungere altre destinazioni.

---

## 1. Come funziona

```
server (decrittografia + convalida della configurazione, riconciliazione del cursore)
  → avvio IPC → processo OS isolato exportChild
    → storage.sqlite in sola lettura → query/mappatura condivisa del registro chiamate
      → caricamento asincrono degli artefatti → prepare()/send() della destinazione
        → IPC del batch → il server rende persistente il cursore → IPC di ack
          → batch successivo; IPC di done → il server registra il successo
```

- **Pianificazione** — un processo cron `JobRegistry`, `log_export`, con valore predefinito
  `0 * * * *` (ogni ora, UTC). Registrato in `src/lib/initCloudSync.ts`; può essere
  sovrascritto con `OMNIROUTE_LOG_EXPORT_CRON`. A ogni esecuzione vengono elaborate in sequenza
  tutte le destinazioni **abilitate**.
- **Cursore** — il `call_logs.rowid` implicito di SQLite, reso persistente per ogni destinazione
  in `log_export_destinations.cursor_row_id`. `timestamp` non viene deliberatamente usato come
  cursore: i chiamanti possono fornire un valore personalizzato, quindi una richiesta lenta può
  essere scritta dopo una più veloce avviata successivamente e un cursore basato sul timestamp
  la salterebbe.
- **Elaborazione in batch** — `batch_size` righe per richiesta (valore predefinito 500),
  `max_rows_per_run` righe per esecuzione (valore predefinito 10000), affinché un arretrato
  elevato venga smaltito in più esecuzioni anziché bloccarne una sola.
- **Consegna** — il cursore avanza solo dopo la risoluzione di `send()`. In caso di errore del
  batch, il cursore rimane invariato, così le stesse righe vengono ritentate all'esecuzione
  successiva. La garanzia è di consegna almeno una volta con deduplicazione lato destinazione,
  non una vera consegna esattamente una volta: BigQuery identifica ogni riga tramite l'id del
  registro chiamate, che rispetta secondo il principio del massimo sforzo all'interno della
  propria finestra di deduplicazione.
- **Protezione dalle sovrapposizioni** — l'esecuzione cron e `POST .../run` possono avviarsi
  contemporaneamente. Una destinazione già in fase di elaborazione viene saltata anziché
  elaborata due volte (`skipped: true` nel risultato dell'esecuzione), così un'esecuzione
  simultanea non può inviare nuovamente un batch né spostare indietro il cursore.
- **Ripristino dopo l'eliminazione** — se `cursor_row_id` finisce sopra `MAX(rowid)` (l'intera
  tabella è stata svuotata e i rowid sono ripartiti), il runner torna a 0 anziché smettere
  definitivamente di rilevare le righe.

### Runner isolato e limiti

Ogni esecuzione di una destinazione su Node avvia un processo figlio OS separato e di breve
durata (`child_process` con IPC, non `worker_threads`). Le letture dei corpi, il
parsing/la serializzazione JSON dei payload, `prepare()` della destinazione e l'I/O di rete
della destinazione avvengono tutti in tale processo, non nell'event loop del server.
Solo la configurazione e piccoli messaggi di avanzamento attraversano IPC; i record esportati
non tornano mai al server. Il processo cron e la route Esegui ora mantengono lo stesso risultato
pubblico e la stessa protezione dalle sovrapposizioni.

Il processo figlio apre il file `DATA_DIR/storage.sqlite` risolto dal server in sola lettura
tramite `node:sqlite`, con `busy_timeout=5000` e `query_only=ON`. Non importa alcun singleton
del DB e non esegue migrazioni, backup o aggiornamenti SQLite. La gestione degli artefatti
mancanti/danneggiati (incluso l'UPDATE per gli artefatti danneggiati) rimane esclusivamente nel
percorso di dettaglio della dashboard. Entrambi i percorsi condividono un resolver di dettaglio
puro; l'esportazione usa letture asincrone del file system e lo stesso ordine di risoluzione:
artefatto → incorporato legacy → disco legacy → nessuno. Un'esecuzione acquisisce uno snapshot
del rowid massimo di inserimento quando il processo figlio apre il reader; gli inserimenti
successivi attendono l'esecuzione seguente. Si tratta di un limite di inserimento, non di una
transazione SQLite di lunga durata: i writer WAL e i checkpoint rimangono liberi durante le
attese di rete. Gli aggiornamenti/le eliminazioni delle righe esistenti non vengono congelati
da questo limite.

Dopo ogni batch accettato, il processo figlio attende una conferma. Il server rende innanzitutto
persistente il cursore con `advanceLogExportCursor`, quindi invia `ack`; nessun batch successivo
viene avviato prima di allora. Un errore di invio, un arresto anomalo o un timeout registra
l'esito negativo senza far avanzare il batch interessato. I batch confermati in precedenza
rimangono salvati; può essere inviato nuovamente al massimo l'unico batch non confermato.
Il successo viene registrato solo dopo `done` e un'uscita pulita del processo figlio. In caso
di errore, il processo figlio viene terminato con SIGTERM, passando a SIGKILL dopo 500 ms,
e il runner attende la chiusura del processo.

| Variabile d'ambiente                          | Valore predefinito | Scopo                                         |
| --------------------------------------------- | ------------------ | --------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000             | Limite temporale per destinazione             |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024               | Limite old-space V8 del processo figlio in MB |

I valori non validi, non positivi o non interi utilizzano i valori predefiniti. L'impostazione
dell'heap non costituisce un limite RSS totale; batch molto grandi possono comunque esaurire
la memoria del processo figlio e far terminare l'esecuzione in modo sicuro.
Il valore predefinito di 1024 MB lascia margine per il batch predefinito di 500 righe con
artefatti da 512 KiB e corpi abilitati, inclusa la serializzazione JSON a blocchi di byte di
BigQuery. Non rende sicuro un batch di corpi da 10000 righe. L'esaurimento dell'heap V8 registra
un errore con indicazioni operative: ridurre la dimensione del batch oppure aumentare
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; il cursore rimane sull'ultimo batch confermato.
I corpi storici incorporati/su disco non sono soggetti al limite moderno degli artefatti.
Gli operatori devono pianificare separatamente l'RSS, in particolare all'interno di container
con memoria limitata.

Il processo figlio eredita esclusivamente `DATA_DIR` risolto, `NODE_ENV`, `TZ` esplicito
(risoluzione secondo l'ora locale dei nomi file legacy), `ELECTRON_RUN_AS_NODE` quando presente
e i seguenti input in uscita: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (e le
rispettive forme in minuscolo), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`,
`SSL_CERT_FILE`, `SSL_CERT_DIR`. Un dispatcher Undici globale condivide la risoluzione pura
del proxy basata sull'ambiente e le regole di esclusione per gli host locali del server,
incluso `NO_PROXY`; non importa `proxyFetch.ts` né i relativi flag DB/funzionalità.
Le credenziali proxy vengono oscurate nell'output inoltrato e negli errori registrati.
Le credenziali della destinazione transitano esclusivamente in un singolo messaggio IPC di
avvio, mai negli argv o nell'ambiente; l'inoltro di output/errori include un prefisso e viene
sanificato. Negli argomenti di esecuzione del processo figlio viene disabilitato solo
`ExperimentalWarning`, per evitare di ripetere l'avviso SQLite di Node a ogni esecuzione cron;
gli altri tipi di avviso rimangono visibili.

I moduli di destinazione devono essere importabili senza dipendenze da Next.js o riservate al server. L'implementazione
BigQuery esistente rispetta già questo contratto. Le cache dei token di accesso durano solo per l'esecuzione
figlia, non tra un'esecuzione e l'altra. Node è il runtime supportato (`package.json` engines), ma la sezione
del README relativa all'installazione di Bun e `Dockerfile.bun` indicano anche un percorso di compatibilità
per la produzione che utilizza `bun:sqlite` (`src/lib/db/core.ts` / adattatori). Con Bun, le esportazioni
mantengono quindi il precedente percorso interno al processo ed emettono un avviso una tantum: l'isolamento
dell'heap e del timeout del processo figlio non è disponibile. Utilizzare Node per l'isolamento dell'event loop
e degli errori OOM; in questo caso Bun non è considerato destinato esclusivamente allo sviluppo.

Quando `includeBodies` è abilitato, preferire una cadenza al minuto, ad esempio
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, anziché accumulare un arretrato orario di payload.
I limiti relativi ai batch e alle righe continuano a delimitare ogni esecuzione. Il costo di avvio del processo
viene sostenuto per ogni destinazione e per ogni esecuzione; ciò scambia un piccolo costo di avvio con
l'isolamento dell'event loop del server, non con una riduzione dell'utilizzo totale della CPU.

### Payload (prompt e completamenti)

Per impostazione predefinita, l'esportazione include solo i campi di riepilogo mostrati nell'**elenco**
dei log. L'attivazione di **Esporta prompt e risposte** (`includeBodies`) invia inoltre ciò che il riquadro
dei **dettagli** dei log mostra per ogni chiamata:

| Campo                            | Contenuto                                                                  |
| -------------------------------- | -------------------------------------------------------------------------- |
| `request_body` / `response_body` | I payload della chiamata così come visualizzati dalla dashboard            |
| `pipeline_route_decision`        | La destinazione e il modello scelti dal router                             |
| `pipeline_client_request`        | La richiesta grezza esattamente come inviata dal client                    |
| `pipeline_openai_request`        | Dopo la traduzione nel formato OpenAI interno                              |
| `pipeline_provider_request`      | Come effettivamente inviata a monte, nel dialetto del provider             |
| `pipeline_provider_response`     | La risposta grezza proveniente da monte                                    |
| `pipeline_client_response`       | Ciò che è stato restituito al chiamante                                    |
| `pipeline_error`                 | Dettagli dell'errore a livello di pipeline per una chiamata non riuscita   |
| `bodies_truncated`               | Vero quando uno qualsiasi dei campi precedenti ha raggiunto `maxBodyBytes` |

Si tratta del contenuto dei prompt, pertanto è **disabilitato per impostazione predefinita** ed è
intenzionalmente una scelta specifica per ogni destinazione. Ciò che viene inviato corrisponde a quanto
mostrato dalla dashboard, perché l'esportazione e `getCallLogById` condividono la risoluzione dei dettagli:
i payload vengono
già sottoposti a rimozione delle PII e oscuramento dei segreti al momento della scrittura, mentre una chiamata
effettuata con una chiave API `noLog` non memorizza alcun payload, quindi non c'è nulla da esportare.

I payload vengono letti per ogni riga dall'artefatto nel filesystem, pertanto l'idratazione viene eseguita
solo per le destinazioni che l'hanno richiesta. Se un artefatto è mancante o danneggiato, viene esportato
il relativo riepilogo con payload nulli, anziché causare il fallimento del batch e bloccare il cursore.

`maxBodyBytes` (valore predefinito 262144) limita ogni campo. I payload più lunghi vengono **troncati anziché
eliminati** — un prompt tagliato consente comunque di capire «cosa è stato chiesto» — e la riga viene
contrassegnata con `bodies_truncated`. I delta trasmessi in streaming frammento per frammento non vengono
esportati; la risposta assemblata è già presente in `pipeline_provider_response` e `pipeline_client_response`.

---

## 2. File

| Componente                    | Posizione                                    |
| ----------------------------- | -------------------------------------------- |
| Contratto destinazione        | `src/lib/logExport/types.ts`                 |
| Registro                      | `src/lib/logExport/registry.ts`              |
| Gestione dei segreti          | `src/lib/logExport/secrets.ts`               |
| Runner (IPC padre)            | `src/lib/logExport/runner.ts`                |
| Ciclo di vita processo        | `src/lib/logExport/childRunner.ts`           |
| Entry point figlio            | `src/lib/logExport/exportChild.ts`           |
| Apertura in sola lettura      | `src/lib/db/logExportReadOnly.ts`            |
| Query/mappatura condivise     | `src/lib/usage/callLogExportQueries.ts`      |
| Risolutore dei dettagli       | `src/lib/usage/callLogDetailResolver.ts`     |
| Proiezione API                | `src/lib/logExport/presenter.ts`             |
| Destinazione BigQuery         | `src/lib/logExport/destinations/bigquery.ts` |
| Autenticazione SA Google      | `src/lib/logExport/googleServiceAccount.ts`  |
| Origine del registro chiamate | `src/lib/usage/callLogExportSource.ts`       |
| Persistenza                   | `src/lib/db/logExportDestinations.ts`        |
| Processo cron                 | `src/lib/jobs/logExportJob.ts`               |
| Livello REST                  | `src/app/api/log-export/`                    |
| Pagina della dashboard        | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Tutte le route richiedono l'autenticazione di gestione (`requireManagementAuth`). I segreti non vengono mai restituiti:
un segreto memorizzato viene restituito come valore letterale `__stored__` e, se tale valore viene reinviato durante un aggiornamento,
la credenziale memorizzata viene mantenuta.

La creazione o l'aggiornamento di una destinazione il cui tipo dichiara un segreto **richiede
`STORAGE_ENCRYPTION_KEY`**. In sua assenza, `encrypt()` esegue silenziosamente un passthrough, quindi la scrittura viene
rifiutata con un errore 400 anziché memorizzare una credenziale in chiaro in SQLite (la stessa protezione applicata
dal webhook di Telegram).

| Metodo   | Percorso                                 | Scopo                                                                               |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipi di destinazione + elenco dei relativi campi di configurazione                  |
| `GET`    | `/api/log-export/destinations`           | Elenca le destinazioni (segreti oscurati)                                           |
| `POST`   | `/api/log-export/destinations`           | Crea una destinazione                                                               |
| `GET`    | `/api/log-export/destinations/{id}`      | Legge una destinazione                                                              |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aggiorna nome / abilitazione / configurazione / batch                               |
| `DELETE` | `/api/log-export/destinations/{id}`      | Elimina                                                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | Verifica le credenziali senza scrivere nulla                                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Esegue subito lo svuotamento, usando lo stesso percorso dell'esecuzione pianificata |
| `GET`    | `/api/log-export/status`                 | Stato del cron, esecuzioni recenti, arretrato per destinazione                      |

`GET /api/log-export/types` è ciò che rende generica l'interfaccia utente: il modulo della dashboard viene generato
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
| `serviceAccountJson` | Chiave dell'account di servizio. Segreto: crittografata a riposo, mai restituita |
| `autoCreate`         | Crea il dataset e la tabella alla prima esportazione (valore predefinito `true`) |

L'account di servizio necessita di `bigquery.tables.updateData` sulla tabella di destinazione, oltre a
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` è attivo.

Un batch configurato è un'unità del **cursore**, non un'unità HTTP: `send()` lo suddivide in chiamate insertAll
da un massimo di 500 righe, quindi un valore `batch_size` elevato non può superare il limite di 10 MB per richiesta
di BigQuery. Gli stati transitori (408/429/500/502/503/504) vengono ritentati fino a tre volte con backoff
esponenziale, riutilizzando gli stessi insertIds; gli errori di autenticazione e di schema generano un'eccezione al primo tentativo,
senza sprecare l'esecuzione.

Una tabella creata pochi istanti prima non è ancora visibile all'endpoint di streaming, che restituisce
404 per alcuni secondi. Tale 404 viene ritentato, ma **solo quando la tabella è stata creata da questa esecuzione** —
una tabella effettivamente mancante continua a causare un errore immediato. Si noti che ricreare una tabella con un nome
eliminato di recente impedisce a BigQuery di accettare inserimenti in streaming per diversi minuti; questa è una
caratteristica dell'eliminazione seguita dalla ricreazione, quindi è preferibile usare un nuovo nome di tabella anziché eliminarne
e aggiungerne nuovamente una.

**Un errore parziale viene restituito come HTTP 200 con un array `insertErrors[]` non vuoto.** Questa condizione viene trattata come
un errore e genera un'eccezione, impedendo così al cursore di avanzare oltre le righe che BigQuery non ha mai
accettato; `tests/unit/log-export-bigquery.test.ts` garantisce questo comportamento.

Il trasporto usa esclusivamente REST: un'asserzione RS256 autofirmata viene scambiata con un token di accesso presso
`https://oauth2.googleapis.com/token`, dopodiché le righe vengono inviate a `tabledata.insertAll`. Non viene inclusa
alcuna SDK di Google. I token di accesso vengono memorizzati nella cache del processo per ciascuna coppia (account di servizio, ambito).

La tabella creata contiene una colonna per ogni campo della scheda Logs, oltre a `exported_at`, ed è strutturata
in base al modo in cui vengono effettivamente interrogati i log delle chiamate:

- **Partizionamento giornaliero su `timestamp`**, affinché una query delimitata per data scansioni solo quei giorni.
- **Clustering per `api_key_name`, `provider`, `model`, `status`** (in quest'ordine), affinché i filtri relativi a
  chi ha eseguito la chiamata, dove è stata indirizzata o se ha avuto esito negativo escludano blocchi all'interno di ciascuna partizione. BigQuery
  consente al massimo quattro colonne di clustering e l'ordine è importante: un filtro solo su `api_key_name`
  consente l'esclusione, mentre un filtro solo su `status` no.
- **Conservazione facoltativa delle partizioni** tramite `partitionExpirationDays` (0 conserva tutto), applicata
  al momento della creazione della tabella.

Entrambe le impostazioni vengono applicate al momento della creazione. Una tabella esistente mantiene il layout che possiede già, quindi
indica come destinazione un nuovo ID tabella se vuoi adottarle.

`tests/unit/log-export-bigquery.test.ts` verifica che il mapper e lo schema della tabella rimangano
sincronizzati, in modo che una nuova colonna del log delle chiamate non possa essere omessa silenziosamente durante l'esportazione.

I batch vengono suddivisi sia in base al numero di righe sia in base ai byte serializzati. Il solo numero di righe non è sufficiente
quando vengono esportati i payload: 500 righe contenenti prompt possono occupare decine di megabyte e insertAll
rifiuta una richiesta superiore a 10 MB. I chunk vengono chiusi al raggiungimento di 500 righe o 9 MB, a seconda di quale limite venga raggiunto per primo.

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
`"omniroute.trace\0" + callLogId` e `"omniroute.span\0" + callLogId`. I reinvii mantengono
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

## 6. Aggiunta di una destinazione

1. Creare `src/lib/logExport/destinations/<name>.ts` esportando un `LogExportDestinationType`:
   uno `configSchema` Zod, un array di descrittori `fields` per l'interfaccia utente, `secretFields` e un
   `createClient(config)` che restituisca `test()` / `prepare()` / `send(records)`.
2. Aggiungerlo all'array `DESTINATIONS` in `src/lib/logExport/registry.ts`.
3. Scrivere i test in `tests/unit/`.

Questa è l'intera modifica: la persistenza, il processo cron, il livello REST, la crittografia dei segreti e il
modulo della dashboard leggono tutti il registro.

Due regole per una nuova destinazione:

- `send()` **deve generare un'eccezione** in caso di errore parziale. La risoluzione indica che «la destinazione contiene queste righe»
  e il cursore le supera definitivamente.
- Una destinazione che accetta un URL fornito dall'utente deve convalidarlo tramite
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) prima di eseguire il recupero,
  come avviene per i webhook. BigQuery non ne ha bisogno: i suoi host sono costanti.

---

## 7. Gestione

- **Dashboard**: Integrazioni → Esportazione dei log. Aggiungere una destinazione, eseguire **Test** per verificare le credenziali
  senza scrivere righe, quindi abilitarla.
- **Backlog**: ogni scheda di destinazione mostra le righe in sospeso e il cursore; `GET
/api/log-export/status` restituisce gli stessi dati insieme alle ultime 20 esecuzioni del processo.
- **Una destinazione in errore non causa l'errore delle altre** — il riepilogo dell'esecuzione registra lo stato di ciascuna destinazione
  in `last_status` / `last_error`, mentre la cronologia delle esecuzioni del processo conserva il risultato aggregato.
- **L'eliminazione di una destinazione elimina il relativo cursore.** Se viene aggiunta nuovamente, riparte dal log delle chiamate meno recente ancora conservato,
  reinviando righe che la destinazione potrebbe già contenere. In BigQuery, l'`insertId` di ogni riga gestisce questa situazione solo entro la finestra
  di deduplicazione di BigQuery, quindi è preferibile disabilitare una destinazione anziché eliminarla.
