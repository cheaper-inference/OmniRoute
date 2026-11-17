# Database Schema & Operations Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **In breve**: OmniRoute utilizza **SQLite con journaling WAL** come archivio principale, con crittografia **AES-256-GCM** dei dati inattivi per i campi sensibili. Questa guida illustra lo schema, le migrazioni, il backup/ripristino e le procedure operative.

**Fonti:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabelle di base)
- `src/lib/db/migrationRunner.ts` — migrazioni con versione
- `src/lib/db/migrations/` — 167 file SQL con versione
- `src/lib/db/encryption.ts` — funzioni di supporto per la crittografia
- `src/lib/db/backup.ts` — esportazione/importazione dei backup
- `src/lib/db/healthCheck.ts` — diagnostica dello stato di integrità

---

## Perché SQLite?

OmniRoute ha scelto SQLite anziché PostgreSQL/MySQL per diversi motivi:

| Fattore           | SQLite                                      | PostgreSQL                              |
| ----------------- | ------------------------------------------- | --------------------------------------- |
| **Distribuzione** | Integrato — nessun server separato          | Richiede la configurazione di un server |
| **Crittografia**  | A livello applicativo (AES-256-GCM)         | TDE integrata                           |
| **Prestazioni**   | Più veloce per carichi piccoli/medi         | Migliore per molte scritture simultanee |
| **Concorrenza**   | La modalità WAL consente letture simultanee | MVCC completo                           |
| **Backup**        | Copia di un singolo file                    | `pg_dump` o snapshot del file system    |
| **Caso d'uso**    | Installazione per utente, integrata         | SaaS multi-tenant                       |

Per le distribuzioni **a singolo utente e a singola istanza** (il caso d'uso principale di OmniRoute), SQLite è più semplice e veloce.

### Journaling WAL

`core.ts` apre il database in **modalità WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL consente **letture simultanee** durante le scritture, aspetto importante per la dashboard, che esegue query mentre vengono registrate le richieste.

La dimensione predefinita della cache è **65.536 KiB (64 MiB)**. SQLite interpreta un valore negativo di
`cache_size` come limite massimo approssimativo in KiB e alloca le pagine su richiesta.
**Impostazioni > Sistema e archiviazione > Dimensione cache** accetta valori interi da **1 a
1.000.000 KiB**; il salvataggio dell'impostazione la applica alla connessione attiva del database
e OmniRoute ripristina il valore memorizzato all'avvio.

---

## Posizione del database

Il file SQLite viene archiviato in:

| Sistema operativo | Percorso                                                      |
| ----------------- | ------------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                                 |
| macOS             | `~/.omniroute/storage.sqlite`                                 |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                     |
| Docker            | `/app/data/storage.sqlite` (configurabile tramite `DATA_DIR`) |

File associati:

- `storage.sqlite-wal` — log write-ahead
- `storage.sqlite-shm` — file di memoria condivisa
- `call_logs/` — artefatti dei payload delle richieste (se abilitati)

**Per sostituire la posizione predefinita:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architettura dei moduli di dominio

Il database di OmniRoute contiene **110 moduli TypeScript di primo livello** in `src/lib/db/`. Ogni modulo di dominio:

- Gestisce una o più tabelle specifiche
- Esporta funzioni CRUD tipizzate
- Non accede mai alle tabelle di un altro modulo
- Utilizza `getDbInstance()` da `core.ts` per accedere al database

### I 110 moduli DB di primo livello

OmniRoute contiene **110 file TypeScript di primo livello** in `src/lib/db/`. Di seguito è riportato un campione dei moduli principali; consulta l'elenco della directory per la lista completa:

| Modulo                  | Tabelle                                                        | Responsabilità                                                                         |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrazione e credenziali OAuth/chiave API dei provider                              |
| `models.ts`             | `key_value` (dati dei modelli)                                 | Definizioni, funzionalità e prezzi dei modelli                                         |
| `combos.ts`             | `combos`                                                       | Configurazioni di routing e ordinamento delle combinazioni                             |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclo di vita delle chiavi API, ambiti e monitoraggio delle quote                      |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configurazione di sistema e archivio KV condiviso                                      |
| `backup.ts`             | —                                                              | Operazioni di esportazione/importazione dei backup                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurazioni dei proxy e regole di routing                                           |
| `prompts.ts`            | `prompt_templates`                                             | Modelli di prompt riutilizzabili e relativo versionamento                              |
| `webhooks.ts`           | `webhooks`                                                     | Sottoscrizioni webhook basate su eventi e relativi log                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Registrazione di audit per richiesta (facoltativa, volume elevato)                     |
| `domainState.ts`        | `domain_*` (5 tabelle)                                         | Budget di dominio, circuit breaker, blocchi, catene di fallback e cronologia dei costi |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Chiavi API autorizzate per MCP/A2A                                                     |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Utilizzo storico delle quote                                                           |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Associazione dei modelli alle combinazioni predefinite                                 |
| `cliToolState.ts`       | `cli_tool_state`                                               | Stato persistente specifico della CLI                                                  |
| `encryption.ts`         | —                                                              | Funzioni di supporto per cifrare/decifrare i campi                                     |
| `readCache.ts`          | —                                                              | Cache in memoria per operazioni con molte letture                                      |
| `secrets.ts`            | `key_value` (voci cifrate)                                     | Archiviazione cifrata dei segreti                                                      |
| `stateReset.ts`         | —                                                              | Cancellazione/reimpostazione dello stato del database per i test                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contesto della sessione per il passaggio tra agenti                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Monitoraggio dell'utilizzo                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configurazione della compressione                                                      |

### Confini dei moduli

Una regola architetturale fondamentale: **i moduli non accedono direttamente alle tabelle degli altri moduli**. Per lavorare con i dati di un altro modulo, importa la funzione da quel modulo.

```ts
// ❌ ERRATO: SQL diretto dalla tabella di un altro modulo
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRETTO: usa la funzione del modulo providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Questa regola viene applicata durante la revisione del codice: non esiste un controllo statico, ma le violazioni vengono segnalate.

---

## Schema di base (17 tabelle)

`core.ts` definisce le 17 tabelle di base in `SCHEMA_SQL`. Queste vengono create dalla migrazione `001_initial_schema.sql` e costituiscono lo schema principale.

### Tabelle principali (create nella migrazione iniziale)

| Tabella                    | Scopo                                     | Colonne chiave                                                          |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credenziali del provider (crittografate)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informazioni di routing dei nodi provider | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Archivio KV generico                      | `namespace`, `key`, `value`                                             |
| `combos`                   | Definizioni delle combinazioni di routing | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Chiavi API per il gateway                 | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadati del database                     | `key`, `value`                                                          |
| `usage_history`            | Record di utilizzo delle richieste        | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload e risposte delle richieste        | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Log delle richieste proxy                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Catene modello-provider                   | `model`, `chain`                                                        |
| `domain_budgets`           | Budget di spesa per dominio               | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Cronologia dei reimpostamenti del budget  | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Monitoraggio dei costi per dominio        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stato del limite di frequenza del dominio | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stato del circuit breaker per dominio     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache delle risposte LLM                  | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshot storici delle quote              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabelle aggiuntive (aggiunte da migrazioni successive)

Le migrazioni successive aggiungono tabelle quali:

- `cli_tool_state` (migrazione 011) — stato dello strumento CLI
- Tabelle `mcp_*` — audit del server MCP
- Tabelle `a2a_*` — stato delle attività A2A
- Tabelle `usage_*` — monitoraggio dell'utilizzo
- Tabelle `plugin_*` — sistema di plugin
- `skill_executions` — cronologia delle esecuzioni delle skill
- Tabelle `memory_*` — sistema di memoria
- Tabelle `compression_*` — sistema di compressione
- Tabelle `webhook_*` — log di consegna dei webhook
- Tabelle `acp_*` — Agent Client Protocol
- Tabelle `oneproxy_*` — marketplace 1proxy
- `proxy_assignments` — associazioni degli ambiti proxy
- `detailed_call_artifacts` — metadati degli artefatti dei log delle chiamate
- `quota_alert_history` — audit degli avvisi sulle quote
- `command_code_auth_sessions` — sessioni OAuth di Command Code

L'elenco completo di oltre 30 tabelle si trova in `src/lib/db/migrations/`.

---

## Migrazioni

OmniRoute utilizza** migrazioni con versione e idempotenti** in `src/lib/db/migrations/`. Ogni migrazione è un singolo file SQL. Coesistono due formati di denominazione; la versione registrata in `_omniroute_migrations` è il prefisso numerico.

### Denominazione della migrazione

| Formato                                          | Esempio                              | Usato per                                                                                                                                                                     |
| ------------------------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (esattamente 3 cifre)      | `241_seen_models.sql`                | La vecchia serie `001`–`241`. Bloccato quando è arrivato il formato timestamp (`240` e `241` sono stati uniti appena prima): nessun nuovo file ottiene un numero sequenziale. |
| `YYYYMMDDHHMMSS_description.sql` (14 cifre, UTC) | `20261113120000_add_usage_index.sql` | Ogni migrazione creata dal 13-11-2026 in poi.                                                                                                                                 |

Perché il cambiamento: con i numeri sequenziali, PRs parallelo sceglieva lo stesso numero successivo e tutti tranne uno dovevano rinumerare prima di fondersi. Un timestamp UTC fornisce a ogni PR la propria versione.

Regole per il formato timestamp (applicate da `npm run check:migration-numbering`, condivise con il generatore in `scripts/check/lib/migrationNaming.mjs`):

- Il timestamp è una data e un'ora UTC reali, non precedenti a `20261113000000` e non più di 10 minuti nel futuro.
- La descrizione è `snake_case` minuscola che inizia con una lettera (`a-z`, `0-9`, `_` singolo tra le parole), al massimo 80 caratteri.
- Due file con lo stesso timestamp sono duplicati.
- La regola del non-gap si applica solo alla vecchia serie: deve esistere ogni numero da `001` a `241`, ad eccezione dei gap noti `026`, `055` e `121`. L'eliminazione `241` (o di qualsiasi vecchio file) non supera il gate. `001` e `241` non possono mai essere aggiunti alla lista consentita `KNOWN_GAPS`. I file con timestamp non creano mai un intervallo.
- Ogni voce in `src/lib/db/migrations/` deve essere un file normale con un nome `.sql` minuscolo valido. Una directory, un collegamento simbolico, un file `.SQL` o `.sql.bak`, un file nascosto o un nome con uno spazio non supera il cancello, perché il corridore lo salterebbe silenziosamente o si bloccherebbe all'avvio.

**Applicare l'ordine.** Il corridore ordina in base al valore numerico del prefisso, non in base al testo: prima i vecchi file `001`–`241`, quindi i file con timestamp in ordine di timestamp, quindi qualsiasi directory con spazio dei nomi registrata con `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versioni come `ee-001`). Una migrazione in sospeso è qualsiasi file la cui versione non è in `_omniroute_migrations`, quindi una migrazione da un ramo più vecchio che si unisce dopo uno più recente si applica ancora ai database esistenti.

**Il timestamp è l'ordine di creazione, non l'ordine di unione.** Se la tua migrazione dipende da una tabella o colonna creata da una migrazione con a** più recente** timestamp (ad esempio, uno da un altro PR che si è unito per primo), un nuovo database eseguirebbe prima il tuo e fallirebbe. Mentre il tuo PR è ancora aperto, rigenera il nome del file con `npm run db:new-migration` in modo che ottenga un timestamp più recente o rendilo indipendente. `npm run test:migrations:fresh` applica ogni migrazione a un database vuoto e lo rileva.

### Una migrazione unita non viene mai eliminata o rinominata

Una volta che un file di migrazione si trova su un ramo di rilascio o `main`, è già stato eseguito su database di omologhi e sviluppatori, su installazioni VPS e nella sincronizzazione aziendale. Da allora in poi:

- **Non cancellarlo mai.** Le nuove installazioni perderebbero il proprio schema mentre i database aggiornati lo manterrebbero.
- **Non rinominarlo mai.** La versione in `_omniroute_migrations` non corrisponderebbe più a un file, quindi ogni database che già lo applicava lo eseguirebbe di nuovo. SQL non idempotente duplica quindi i dati o interrompe l'avvio.
- **Hai bisogno di uno schema diverso?** Crea una nuova migrazione con `npm run db:new-migration`.

La ridenominazione è sicura solo per un file che non è stato ancora unito, come nel caso a cui fanno riferimento i suggerimenti del gate. Un tag di rilascio non cambia nulla qui: ogni push a un ramo `release/v*` pubblica l'immagine Docker `:next` e viene eseguito sull'omologo, sulle installazioni VPS e sulla sincronizzazione Enterprise, quindi una migrazione unita è stata eseguita su database reali prima che esista qualsiasi tag `vX.Y.Z`. Il cancello fallisce ogni rimozione di un file di base, taggato o meno.

- **Annullamento di una migrazione unita.** Uno `git revert` che elimina il file fallisce il gate. Conserva il file e annulla il suo schema in una nuova migrazione: `npm run db:new-migration -- <description>`, with `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` e così via. I database aggiornati e nuovi terminano quindi con lo stesso schema.
- **L'unica ridenominazione accettata: una voce di compatibilità e contenuto identico.** Se un file unito deve essere spostato (ad esempio, due file uniti condividono un timestamp e il corridore si ferma con una collisione di versioni), rinomina quello successivo senza toccare il suo SQL e aggiungi `{ fromVersion, fromName, toVersion, toName }` a `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts`. I database che applicavano la versione precedente spostano la riga `_omniroute_migrations` invece di eseguire nuovamente il file. Il gate avvisa di tale ridenominazione ed esegue sempre il controllo di commutazione su di esso, qualunque sia il nuovo timestamp: le nuove installazioni applicano il file nella sua nuova posizione, i database aggiornati no, quindi scegli un nuovo timestamp vicino a quello vecchio. Il gate non riesce a rinominare se il contenuto è cambiato (una modifica dello schema viene comunque applicata in una nuova migrazione) o se il file di destinazione della voce non è sul disco.
- **Non rinominare mai con lo stesso timestamp.** Una ridenominazione che mantiene il timestamp e modifica solo la descrizione fallisce il gate, con o senza una voce. Con una voce il cui `toVersion` è uguale al suo `fromVersion`, il corridore elimina la vecchia riga `_omniroute_migrations` e applica nuovamente il file su ogni database che già lo eseguiva. Senza una voce, il runner tiene traccia solo della versione: salta il file su quei database (il nuovo contenuto non viene mai eseguito lì) e registra un errore di rinumerazione ad ogni avvio. Utilizza un altro timestamp più una voce di compatibilità oppure mantieni il nome.
- **Il cancello controlla che il file rinominato non venga eseguito nuovamente.** Per ogni ridenominazione coperta, il gate passa il nuovo nome del file al controllo di commutazione con `--must-not-apply`. Il controllo avvia il database aggiornato con il corridore reale e se il corridore applica nuovamente quel file (ad esempio, perché la voce ha una versione o un nome errato o perché il parser di testo del cancello legge `constants.ts` in modo diverso da TypeScript), il cancello fallisce con `migration renomeada rodaria de novo` e ti chiede di controllare le versioni e i nomi vecchi e nuovi della voce.

### Ciò che il cancello confronta con la base

Nelle richieste pull e nelle esecuzioni della coda di unione, `npm run check:migration-numbering` confronta `src/lib/db/migrations/` sul disco con la stessa directory sul ramo base. La base è, in questo ordine: `--base-latest-tag`, `--base <ref>`, la variabile `MIGRATION_BASE_REF` o, quando `GITHUB_EVENT_NAME` è `pull_request`, `pull_request_target` o `merge_group`, il primo genitore del commit di unione, `merge_group.base_sha` del payload dell'evento o `git merge-base HEAD origin/$GITHUB_BASE_REF`. In una richiesta pull o in un'esecuzione di code di unione senza base risolvibile, il gate fallisce. Al di fuori CI senza `--base` stampa `comparação com a base: pulada (sem --base)` e salta queste regole.

`--base-latest-tag` viene confrontato con il tag di rilascio più recente (`vX.Y.Z` in ordine semestrale; i tag con suffisso come nightlies non contano) che è nella storia di `HEAD`, con le stesse regole di `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) esegue il gate in questo modo, poiché le esecuzioni push e pianificate non hanno una base di richieste pull e un'unione può terminare senza una nuova esecuzione CI. Senza tag di rilascio nella cronologia il gate fallisce; esegui `git fetch --tags` (in CI, `actions/checkout` con `fetch-depth: 0` porta i tag).

| Modifica sulla richiesta pull                                                                                          | Risultato                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Un file esistente sulla base viene rinominato con una voce `RENAMED_MIGRATION_COMPATIBILITY`                           | **Avvertimento** se il contenuto è identico e il controllo di commutazione viene eseguito qualunque sia il nuovo timestamp; fallisce se la nuova posizione modifica lo schema finale (annulla la ridenominazione o seleziona un altro nuovo timestamp in cui commuta) o se il corridore applicherebbe nuovamente il file rinominato su un database aggiornato.** Fallisce** se il contenuto è cambiato. |
| Un file esistente sulla base viene rinominato mantenendo il suo timestamp (cambia solo la descrizione)                 | **Fallisce** , con o senza una voce: il corridore la applicherà nuovamente (con la voce) o la salterà per versione (senza una). Utilizza un altro timestamp più una voce di compatibilità oppure mantieni il nome.                                                                                                                                                                                      |
| Un file esistente sulla base viene cancellato o rinominato senza voce                                                  | **Fallisce** , indipendentemente dal fatto che il file sia o meno in un tag di rilascio. Per annullarlo, ripristina il file con `git checkout <base> -- src/lib/db/migrations/<file>`; per ripristinarne lo schema, aggiungi una nuova migrazione con `DROP ... IF EXISTS`.                                                                                                                             |
| Un file esistente sulla base ha contenuti diversi                                                                      | **Avvertimento** (un'annotazione `::warning` in GitHub Actions) e viene eseguito il controllo della commutazione. Fallisce se la modifica cambia lo schema finale, perché i database aggiornati non applicano nuovamente il file modificato: inserisci la modifica in una nuova migrazione. Una modifica innocua (un commento, `IF NOT EXISTS`) avvisa solo.                                            |
| Viene aggiunto un file con timestamp con un timestamp non più recente di quello più recente della base                 | Esegue il controllo di commutazione, descritto di seguito.                                                                                                                                                                                                                                                                                                                                              |
| Un file `NNN_` di vecchio formato viene aggiunto con un numero sotto il file di vecchio formato più recente della base | **Fallisce** , anche se `KNOWN_GAPS` viene modificato nella stessa richiesta pull: la vecchia serie è congelata, crea la migrazione con `npm run db:new-migration`. Sono accettati file di vecchio formato sopra quello più recente della base (una richiesta pull da `release/v*` a `main` ).                                                                                                          |
| Un file fuori ordine, modificato o rinominato contiene istruzioni `INSERT`, `UPDATE`, `DELETE` o `REPLACE`             | **Avvertimento** : il controllo della commutazione non confronta i dati, quindi verifica se l'ordine in cui i database aggiornati e nuovi lo applicano modifica il risultato.                                                                                                                                                                                                                           |

Un'esecuzione del controllo di commutazione copre insieme i file fuori ordine, quelli modificati e quelli rinominati.

Il controllo di commutazione (`scripts/check/migration-commutation.ts`) crea due database temporanei con il percorso di installazione reale: an** aggiornato** uno (avviare con le migrazioni di base, quindi riavviare sullo stesso file con le migrazioni della richiesta pull) e a** fresco** uno (un avvio con le migrazioni della richiesta pull). Confronta gli schemi risultanti: tabelle e colonne (ignorando l'ordine delle colonne), vincoli UNIQUE / PRIMARY KEY e FOREIGN KEY, il testo `CREATE TABLE` normalizzato di ciascuna tabella (che copre vincoli CHECK, regole di confronto, colonne generate e opzioni di tabella), indici, trigger e visualizzazioni. I dati della riga non vengono confrontati. Se corrispondono, il gate stampa che il file è fuori servizio ma commuta e passa. Se differiscono, il gate fallisce con la differenza e un suggerimento per il caso: per un file fuori ordine, rigenerare il suo nome con `npm run db:new-migration`, che è sicuro perché il file non è ancora stato unito; per un file di base modificato, ripristinare il contenuto di base e inserire la modifica in una nuova migrazione; per un file rinominato, annulla la ridenominazione o scegli un altro nuovo timestamp in cui commuta, mai lo stesso timestamp con un altro nome. Se il controllo stesso non può essere eseguito, il gate fallisce in CI e avvisa solo localmente. Per un file di base modificato, il database aggiornato viene creato con il contenuto di base di quel file e il secondo avvio lo salta perché la sua versione è già registrata. Per un file rinominato, il database aggiornato viene creato con il file con il vecchio nome e il secondo avvio sposta la riga `_omniroute_migrations` attraverso la voce di compatibilità invece di eseguirla nuovamente; il gate passa il nuovo nome con `--must-not-apply`, quindi il controllo fallisce se lo applica il secondo avvio. Se la migrazione di una richiesta pull non viene applicata al percorso aggiornato, ovvero dopo ogni migrazione di base (indipendentemente dal fatto che fallisca o meno anche in una nuova installazione), il gate segnala `migration do PR não aplica` e chiede di correggere SQL rispetto allo schema corrente della base; se il file dipende da un'altra migrazione di richiesta pull con un timestamp successivo, rigenerarne il nome con `npm run db:new-migration`.

Per eseguire lo stesso confronto localmente, passare esplicitamente la base, ad esempio `npm run check:migration-numbering -- --base origin/<base-branch>` o `npm run check:migration-numbering -- --base-latest-tag` per confrontare con l'ultima versione.

### Conversione di una migrazione `NNN` di Open PR

Una richiesta pull aperta prima dello switch può ancora contenere un file sequenziale come `242_add_widgets.sql`. I vecchi numeri sopra `241` vengono rifiutati, quindi convertili prima di unirli:

1. **Rinominare il file con il generatore, mantenendo la descrizione.** Esegui `npm run db:new-migration -- <same description>` per ottenere il nuovo nome, sposta SQL al suo interno ed elimina il vecchio file `NNN_`. La descrizione deve rimanere identica: la voce di compatibilità riportata di seguito corrisponde ad essa.
2. **Aggiungi una voce di compatibilità se un database persistente eseguiva il vecchio numero.** Se qualsiasi database conservato (omologo, VPS, installazione di un collaboratore) ha eseguito una build di PR con il file `NNN_`, aggiungi `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` a `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts`. Questo è** richiesto per `237` a `241`** : quegli slot ora contengono i canonici `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` e `241_seen_models.sql`, e senza la voce tale database salta per sempre la migrazione canonica ed esegue nuovamente quella convertita. Funziona anche per uno slot che rimane vuoto, come `242`, quando la destinazione è un timestamp. In caso di dubbi, aggiungi la voce. Il punto in cui lo aggiungi nell'array non ha importanza: quando lo slot di destinazione di una voce contiene ancora una riga che un'altra voce sposta (ad esempio `237` che tiene una riga PR mentre una riga `usage_history_calculated_cost` più vecchia attende di spostarsi in `237`), il corridore lascia che la voce attenda finché lo slot non è libero. Solo un conflitto reale, come uno slot occupato da una riga in cui nessuna voce si muove, o due voci che si scambiano gli slot, interrompe l'avvio con `Cannot reconcile ...`.
3. **Mantieni la SQL idempotente** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), perché la migrazione convertita potrebbe incontrare un database in cui esiste già il relativo schema.
4. **Sposta i casi speciali con chiave di versione.** Se PR ha aggiunto un caso per il suo vecchio numero in `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) o in `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), cambia la chiave con il nuovo timestamp.

`tests/unit/db/codex-fence-migration-rename.test.ts` è un esempio funzionante di test per una migrazione rinominata.

### Backport ai rami prima dello switch

Non selezionare mai o eseguire il backport di un file `YYYYMMDDHHMMSS_` su un ramo precedente allo switch (ad esempio un ramo `release/v*` precedente). Il corridore ordina i nomi dei file come testo, quindi un file con timestamp verrebbe eseguito tra `201_` e `202_` su un nuovo database e il vecchio gate non comprende i prefissi di 14 cifre. Su un ramo di questo tipo, scrivi la modifica come file `NNN_` successivo di quel ramo, idempotente, quindi non è possibile operare quando la versione con timestamp arriva in seguito.

### Come vengono eseguite le migrazioni

All'avvio, `migrationRunner.ts`:

1. Crea la tabella `_omniroute_migrations` se non esiste
2. Query per migrazioni già applicate
3. Applica tutte le nuove migrazioni in ordine, ciascuna in una transazione
4. Registra ogni migrazione applicata con timestamp

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotenza

Le migrazioni devono esserlo** idempotente** — eseguirli due volte dovrebbe essere un'operazione vietata:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilizzare liberamente le clausole `IF NOT EXISTS`, `IF EXISTS` e `OR IGNORE` / `OR REPLACE`.

### Aggiunta di una nuova migrazione

1. **Creare il file con il generatore** : `npm run db:new-migration -- <description>` (ad esempio `npm run db:new-migration -- add combo priority`). Scrive `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` con l'ora UTC corrente e un'intestazione di commento, avanza di un secondo se viene preso il timestamp e non sovrascrive mai un file. Non scegliere un numero a mano.
2. **Usa DDL sicuro** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Compila i dati con attenzione** : usa `UPDATE ... WHERE ...` per gestire le righe esistenti
4. **Controlla l'ordine e la denominazione** : `npm run test:migrations:fresh` (tutte le migrazioni su un database vuoto) e `npm run check:migration-numbering`
5. **Prova su una copia** : non eseguire mai migrazioni non testate in produzione

Esempio:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Modifiche incompatibili con le versioni precedenti** (ad esempio, eliminare le colonne) sono complicati. OmniRoute NOT supporta il downgrade — una volta applicata la migrazione, la modifica dello schema è permanente. Pianifica di conseguenza.

---

## Crittografia dei dati inattivi

I campi sensibili (chiavi API, token OAuth, stringhe di connessione) vengono crittografati quando sono inattivi utilizzando **AES-256-GCM**.

### Come funziona

```ts
// src/lib/db/encryption.ts (semplificato)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Dove viene utilizzata

- `provider_connections.api_key` — crittografato a livello applicativo
- `provider_connections.access_token`, `refresh_token`, `id_token` — crittografati a livello applicativo
- Voci `key_value` con `namespace = "secrets"` — crittografate a livello applicativo
- `proxy_registry.auth` — crittografato a livello applicativo (se presente)

### Chiave di crittografia

La chiave di crittografia deriva da una **passphrase** (impostata tramite la variabile di ambiente `STORAGE_ENCRYPTION_KEY`) e da un **salt** (memorizzato nel DB). Entrambi sono necessari per decrittografare i dati.

```bash
# Genera una passphrase sicura
openssl rand -hex 32

# Imposta in .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Importante**: la perdita della chiave di crittografia comporta la perdita dell'accesso a tutti i dati crittografati. **Esegui il backup della chiave separatamente dal database**.

### Dati NON crittografati

Per motivi di prestazioni, i seguenti dati vengono memorizzati in testo non crittografato:

- Nomi visualizzati dei provider
- Definizioni dei modelli (già pubbliche)
- Regole di instradamento
- Registri di utilizzo (nessun dato personale identificabile)

---

## Considerazioni sulla crittografia (v3.8.16+)

OmniRoute utilizza **`migrateLegacyEncryptedString()`** per gestire in modo trasparente due schemi di crittografia:

- **Legacy** (precedente alla v3.5.0): "crittografia" basata su XOR (non è vera crittografia)
- **Attuale**: AES-256-GCM con IV e tag di autenticazione appropriati

L'helper di migrazione rileva il formato legacy e, alla prima lettura, esegue nuovamente la crittografia con il nuovo schema. Ciò significa che è possibile aggiornare un database precedente senza perdere le credenziali.

---

## Cache di lettura

Per i dati letti frequentemente (modelli, provider, impostazioni), `readCache.ts` fornisce una **cache in memoria**:

```ts
// Memorizzato nella cache all'avvio, invalidato in fase di scrittura
const providers = await getCachedProviders(); // Veloce, in memoria
const fresh = await listProviders(); // Lento, accede al DB
```

| Entità memorizzata nella cache | Chiave della cache | TTL                 |
| ------------------------------ | ------------------ | ------------------- |
| `models`                       | `models:v1`        | Fino alla scrittura |
| `provider_connections`         | `providers:v1`     | Fino alla scrittura |
| `settings`                     | `settings:v1`      | Fino alla scrittura |
| `combos`                       | `combos:v1`        | Fino alla scrittura |

La cache viene invalidata a ogni scrittura nella tabella corrispondente.

---

## Backup e ripristino

### Backup manuale

```bash
# Utilizza la CLI per creare un backup locale
omniroute backup create --name pre-migration

# Oppure tramite l'API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Il file di backup include:

- Tutte le tabelle del DB (serializzate in JSON)
- Artefatti del registro delle chiamate (codificati in base64, facoltativi)
- Impostazioni e segreti (crittografati)
- Configurazione dei plugin

### Ripristino

```bash
# Tramite la CLI
omniroute restore pre-migration

# Tramite l'API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Avviso**: il ripristino sovrascrive l'intero DB. Arrestare prima tutti i client.

### Backup automatici

```bash
# Abilita i backup giornalieri automatici tramite la CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

La pianificazione viene eseguita lato server da un processo in background che si attiva ogni 30 secondi
(valore predefinito) e valuta l'espressione cron rispetto all'ora locale del server.

| Variabile                                   | Valore predefinito | Descrizione                                                                                                                                                     |
| ------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`            | Intervallo di attivazione in ms (minimo `5000`). Deve essere inferiore a 60 s per rientrare in modo affidabile nel minuto corrispondente dell'espressione cron. |

### Backup a caldo di SQLite

Per eseguire il backup senza tempi di inattività di un DB attivo:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Questo comando utilizza l'API di backup online di SQLite ed è sicuro eseguirlo mentre OmniRoute è in funzione.

---

## Ottimizzazione delle prestazioni

### Modalità WAL

WAL è abilitato per impostazione predefinita. Per carichi di lavoro ad alta scrittura, considera:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute non imposta `journal_size_limit`. Un checkpoint sposta i fotogrammi WAL nel file principale, ma il file WAL mantiene la dimensione massima allocata. La guardia `OMNIROUTE_WAL_GUARD_MAX_MB` si limita ad avvisare e a far funzionare `wal_checkpoint(RESTART)`; non è un limite alle dimensioni del disco.

### Indici

Indici chiave per le prestazioni (creati automaticamente dalle migrazioni):

- `idx_models_provider` — ricerche di modelli per fornitore
- Espansione del target combinato `idx_combo_targets_combo_id` —
- analisi dell'utilizzo di `idx_usage_history_api_key_timestamp` —
- monitoraggio delle quote `idx_quota_snapshots_api_key_window` —
- `idx_call_logs_timestamp` — query sul registro delle chiamate

Per aggiungere un nuovo indice, crea una migrazione:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O mappato in memoria

Per database molto grandi (> 10 GB), la mappatura della memoria può essere regolata tramite SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compattazione

Le istanze OmniRoute di lunga durata beneficiano di `VACUUM` occasionale:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Esegui mensilmente durante le finestre a basso traffico. (La modalità WAL riduce la necessità, ma non la elimina.)

---

## Controllo dello stato

`src/lib/db/healthCheck.ts` fornisce **diagnostica dello stato a livello di DB**:

Entrambi i verbi richiedono l'autenticazione (`401` in caso contrario). `GET` esegue solo la diagnosi; `POST` esegue lo
stesso controllo con `autoRepair` abilitato.

```bash
GET  /api/db/health   # esegue la diagnosi
POST /api/db/health   # esegue la diagnosi e la riparazione
```

La risposta è il `DbHealthCheckResult` prodotto da `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "I budget dei domini facevano riferimento a chiavi API che non esistono più.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Campo             | Significato                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` quando `issues` è vuoto. `driver` non influisce mai su questo valore.                                                                                           |
| `issues[].type`   | Uno tra `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                               |
| `repairedCount`   | Righe riparate durante questa esecuzione; sempre `0` quando `autoRepair` è false.                                                                                      |
| `backupCreated`   | Indica se è stato creato un backup prima della riparazione.                                                                                                            |
| `checkedAt`       | Timestamp ISO condiviso dall'esecuzione e da qualsiasi nota di riparazione scritta.                                                                                    |
| `driver.name`     | Driver SQLite che gestisce il database controllato.                                                                                                                    |
| `driver.degraded` | `true` quando le scritture non sono salvate in modo durevole nel file del database: il fallback WASM `sql.js` (persistenza dell'intero file) o un database in memoria. |

Lo stesso payload viene restituito dallo strumento MCP `omniroute_db_health_check`.

Eseguire `PRAGMA integrity_check` per rilevare eventuali danneggiamenti:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Dovrebbe stampare: ok
```

Se restituisce un valore diverso da `ok`, **interrompere immediatamente l'utilizzo del database** e ripristinarlo dal backup.

---

## Ripristino di emergenza

### Scenario 1: File WAL perso

Il file `-wal` è mancante, ma `-shm` e il DB principale sono integri:

```bash
# Viene ripristinato automaticamente alla successiva apertura
omniroute
```

Se SQLite non riesce a eseguire il ripristino automatico:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: File del DB principale danneggiato

Ripristina dal backup:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` scarica soltanto un archivio `.tar.gz` completo da un server in esecuzione
(`GET /api/db-backups/exportAll`, credenziali dell'operatore richieste); non ripristina nulla.

### Scenario 3: Chiave di crittografia persa

**Nessun ripristino possibile** senza la chiave. I campi crittografati sono illeggibili. Aggiungi nuovamente tutti i provider manualmente con nuove credenziali.

> **Mitigazione**: esegui sempre il backup della chiave di crittografia separatamente, preferibilmente in un gestore di password o in un KMS.

### Scenario 4: Disco pieno

SQLite restituirà errori `SQLITE_FULL`. Libera spazio su disco, quindi:

```bash
# Esegue il checkpoint del WAL per liberare spazio
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operazioni comuni

### Ispezionare una tabella

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Contare le righe in tutte le tabelle

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Reimpostare (cancellare) tutti i dati

```bash
# Arrestare prima OmniRoute
omniroute stop

# Eliminare il file del database
rm ~/.omniroute/storage.sqlite*

# Riavviare (verrà ricreato un database vuoto)
omniroute
```

Per una reimpostazione **selettiva** (mantenere i provider, cancellare i dati di utilizzo):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Esportare una singola tabella

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Risoluzione dei problemi

### "Il database è bloccato"

Un altro processo mantiene un blocco di scrittura. È possibile:

- Attendere il completamento dell'altro processo (verificare con `lsof | grep storage.sqlite`)
- Terminare l'altro processo
- Se il problema persiste, riavviare OmniRoute

### "Vincolo di chiave esterna non soddisfatto"

Un modulo di dominio sta violando l'integrità referenziale. Verificare:

- Righe orfane nelle tabelle dipendenti
- Eliminazioni a cascata che non sono state propagate
- Una migrazione recente che ha modificato una chiave esterna

Eseguire `PRAGMA foreign_key_check;` per individuare le violazioni.

### "Memoria insufficiente"

L'I/O con mapping in memoria di SQLite sta superando il limite del sistema operativo. Ridurlo tramite un pragma di SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB invece di 256MB
```

Oppure disabilitarlo:

```sql
PRAGMA mmap_size = 0;
```

### "Migrazione non riuscita durante l'esecuzione"

La migrazione è stata eseguita in una transazione, quindi dovrebbe essere stato effettuato il rollback. In caso contrario:

1. **Arrestare OmniRoute** (per impedire ulteriori tentativi)
2. **Verificare lo stato del database** con `sqlite3`
3. **Correggere manualmente** la migrazione parziale
4. **Eseguire nuovamente** OmniRoute (la migrazione verrà ritentata)

Per evitare questo problema, testare sempre prima le migrazioni su una copia.

---

## Vedere anche

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabelle di utilizzo
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitoraggio dello stato
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — flusso di rilascio
- Codice sorgente: `src/lib/db/` (oltre 80 file, circa 25.000 righe di codice)
