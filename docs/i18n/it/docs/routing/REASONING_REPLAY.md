# REASONING_REPLAY (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Fonte della verità:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute cattura l'assistente `reasoning_content` prodotto dai modelli in modalità pensiero e lo riproduce in modo trasparente su richieste multi-turn quando il provider upstream lo richiede. Ciò elimina gli errori HTTP 400 che i provider rigorosi sollevano quando nella cronologia delle conversazioni di un cliente manca il ragionamento del turno precedente.

## Perché questo esiste

Diversi fornitori di modalità di pensiero rifiutano una svolta successiva a meno che il** il messaggio dell'assistente precedente include lo `reasoning_content` originale** . L'upstream restituisce 400 con messaggi come:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ma i client tipici (Cursor, Cline, Roo Code, OpenAI SDK) rimuovono `reasoning_content` dalla cronologia che riproducono. OmniRoute lo ripristina da una cache lato server in modo che la richiesta vista dall'upstream sia coerente. Il problema n. #1628 ha introdotto la persistenza memory/SQLite ibrida in modo che la cache sopravviva ai riavvii del processo.

## Architettura

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

La cattura avviene in `open-sse/handlers/chatCore.ts` (due siti, nei due siti di chiamata `cacheReasoningFromAssistantMessage` ). La riproduzione avviene in `open-sse/translator/index.ts` dopo la coercizione dello schema ma prima dell'invio.

I turni dell'assistente semplici (non richiamati dallo strumento) sono codificati in modo diverso: `buildAssistantMessageCacheKey()` digerisce l'ambito della sessione più la trascrizione in formato OpenAI normalizzata fino a quel turno, perché DeepSeek richiede il ragionamento di _ogni_ turno precedente una volta che `tools` è presente. Per le destinazioni API di risposta (ad esempio `opencode-go/deepseek-v4-flash`, instradato a `/responses`) il corpo upstream trasporta `input`, non `messages`, quindi `translateRequest()` (`open-sse/translator/index.ts`) riporta la trascrizione pivot che ha digerito tramite un'opzione di callback e i siti di acquisizione digeriscono quella stessa trascrizione. Il passaggio di riproduzione delle risposte viene eseguito sul pivot OpenAI per ogni formato di origine, quindi vengono riprodotti anche i client messaggi Anthropic (Claude → OpenAI → Responses).

## Archiviazione — Memoria ibrida + SQLite

L'hot path utilizza un `Map` in memoria (LRU-by-creation) supportato da una tabella SQLite per il ripristino in caso di arresto anomalo del sistema e la visibilità del dashboard.

| Strato  | Attuazione                                     | Scopo                                              |
| ------- | ---------------------------------------------- | -------------------------------------------------- |
| Memoria | `Map` in `open-sse/services/reasoningCache.ts` | Ricerche veloci, elimina il più vecchio a 200      |
| DB      | tabella `reasoning_cache` (`src/lib/db/`)      | Persiste durante i riavvii, aumenta le statistiche |

Le scritte vanno ad entrambi. Le letture consultano prima la memoria, quindi tornano a DB (i risultati DB vengono promossi nuovamente in memoria). gli errori DB non sono fatali — la cache in memoria continua a servire il percorso caldo.

**Predefiniti:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Voci di memoria massime: `200` (`MAX_MEMORY_ENTRIES`)
- Sfratto: prima `createdAt` più anziana

## Schema della banca dati

Migrazione: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indici: `expires_at`, `provider`, `model`, `created_at`. `expires_at` viene memorizzato come secondi di epoca Unix; il livello SELECT normalizza i valori di testo legacy tramite `EXPIRES_AT_EPOCH_SQL`.

## Rilevamento fornitore/modello

La riproduzione è abilitata quando `requiresReasoningReplay(provider, model)` restituisce `true`. La funzione controlla due elenchi in `open-sse/services/reasoningCache.ts`.

**Fornitore IDs (corrispondenza esatta, senza distinzione tra maiuscole e minuscole):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Modelli regex del modello (senza distinzione tra maiuscole e minuscole):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` e `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, suffisso `-free` opzionale)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Aggiungere un nuovo provider/model rigoroso significa accodarsi a uno di questi elenchi e scrivere un test unitario che affermi l'iniezione di replay. La descrizione PR dovrebbe citare l'esatta stringa 400 upstream che ha motivato la modifica.

## REST API

La cache espone due endpoint in `src/app/api/cache/reasoning/route.ts`. Entrambi richiedono l'autenticazione di gestione (`isAuthenticated` da `@/shared/utils/apiAuth`).

| Metodo | Punto finale                                              | Descrizione                                                    |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistiche + voci impaginate                                  |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Elenco filtrato (`limit` limitato a `[1, 200]`)                |
| DELETE | `/api/cache/reasoning`                                    | Cancella tutto (memoria + DB) e ripristina i conteggi hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Cancella solo le voci per un fornitore                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Elimina una singola voce                                       |

**forma di risposta GET :**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Note operative

- **Ripulire:** `cleanupReasoningCache()` elimina le voci di memoria scadute ed esegue `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Gli addetti al controllo sanitario lo chiamano periodicamente.
- **Recupero da incidente:** Dopo un riavvio, la memoria è vuota ma DB contiene ancora voci non scadute. La prima ricerca per un dato `tool_call_id` è un risultato DB ; le ricerche successive sono accessi alla memoria.
- **Nessun ragionamento, nessuna cache:** `cacheReasoningFromAssistantMessage` restituisce `0` quando il messaggio dell'assistente non ha un campo `reasoning_content` / `reasoning`, quindi le risposte non pensanti non costano nulla.
- **Anche la scrittura è controllata:** entrambi i siti di chiamata in `chatCore.ts` (non streaming e streaming) chiamano `cacheReasoningFromAssistantMessage()` solo quando `requiresReasoningReplay(provider, model)` è `true` — lo stesso predicato controllato dal lato di lettura. Le installazioni che non toccano mai un provider di riproduzione smettono di pagare per la scrittura, l'aggiornamento dell'indice e lo try/catch su ogni risposta contenente ragionamento.
- **Fornitori non rigorosi:** Quando `requiresReasoningReplay` è `false` e il formato di destinazione è OpenAI, il traduttore** strisce** qualsiasi campo `reasoning_content` dai messaggi in uscita — OpenAI Chat Completions non lo accetta.

## Musa Proprietà Opaca-Ragionante

Muse (`muse-code`) restituisce un ragionamento opaco legato al chiamante (`encrypted_content`). La riproduzione con un account diverso o con credenziali remined non riesce a monte, quindi le richieste OAuth native utilizzano la proprietà a livello di sessione anziché la rotazione per richiesta (`src/sse/services/museSessionOwnership.ts`, applicata in `src/sse/handlers/chat.ts`). Le connessioni con chiave API selezionate esplicitamente e le configurazioni con sola chiave API mantengono il routing esistente senza questa modalità di proprietà.

- Fornire una sessione stabile ID ad ogni turno: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` o `x-codex-session-id`; in alternativa utilizzare `prompt_cache_key`, `session_id`, `conversation_id` o `metadata.session_id` nel corpo (in tale ordine di precedenza). IDs mancante o vuoto restituisce 400 quando sono attivi due o più account OAuth nativi; con un singolo account OAuth non c'è nulla su cui ruotare, quindi tale richiesta mantiene il routing non bloccato. L'ambito include la chiave API OmniRoute ID del chiamante.
- Nuove sessioni indipendenti round-robin tra account OAuth nativi attivi consentiti dalla policy di connessione della chiave API, ordinate per connessione ID. Il round robin salta gli account durante il raffreddamento della connessione, con uno stato terminale (`banned`, `expired`, `credits_exhausted`) o con modello bloccato per il modello richiesto; Gli errori upstream di Muse registrano il raffreddamento e lo stato dell'interruttore come altri provider. Una connessione forzata esplicitamente ignora il round robin per una nuova sessione ma non può sovrascrivere un proprietario esistente.
- Fino a quando il proprietario non fornisce una risposta positiva, una sessione il cui proprietario è diventato non disponibile viene rivendicata nuovamente su un account integro. Dopo la prima risposta positiva, la sessione rimane bloccata a quel proprietario finché non rimane inattiva per 30 giorni (`MUSE_SESSION_IDLE_TTL_MS`).
- Ogni continuazione e ogni turno di risultato dello strumento rimane assegnato al proprietario della sessione: connessione, identità dell'account e generazione di credenziali di inferenza, controllati nuovamente prima dei tentativi upstream, inclusi i tentativi di aggiornamento delle credenziali. Le risposte alle chiamate, i riferimenti IDs/item e lo strumento Completamenti chat, la chiamata IDs devono essere stati registrati per quella sessione e generazione.
- I record SQLite `key_value` nello spazio dei nomi `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) mantengono la proprietà e il cursore di rotazione durante i riavvii. Ogni richiesta e risposta fornita aggiorna l'indicatore di attività della sessione; una sessione inattiva più lunga di `MUSE_SESSION_IDLE_TTL_MS` viene eliminata (pin del proprietario, flag servito e hash opaque/reference registrati), al massimo una volta ogni 10 minuti e in batch limitati, quindi una riproduzione successiva della sua cronologia non viene chiusa come proprietario sconosciuto. I record contengono IDs di connessione e hash di identità dell'account, credenziali, contenuti opachi e riferimenti di continuazione, non segreti o cronologia delle conversazioni. I clienti devono conservare e inviare la loro cronologia completa e ragionamenti opachi.
- Un ragionamento sconosciuto o estraneo opaco, un proprietario mancante, un account proprietario non disponibile o un cambio generazionale con cronologia registrata non riescono a chiudersi con un failover tra account esplicito 4xx/503 — mai silenzioso e un ragionamento mai abbandonato.
- Una chiave dello stesso account rimessa a punto viene adottata solo quando la sessione non ha registrato alcuna cronologia riproducibile; le sessioni registrate continuano a chiudersi fino a quando non vengono riavviate.
- Una risposta upstream vuota (`upstream_empty_response` / `empty_response`, nulla emesso al chiamante) viene ritentata al massimo due volte sullo stesso proprietario, dopo 0,5 s e poi 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Se tutti i tentativi sono vuoti, il 502 originale viene restituito senza cooldown o contrassegno di interruzione, quindi una risposta instabile non blocca mai il proprietario.
- Tutte le richieste `muse-code` ignorano le letture e le scritture della cache semantica, incluse le scritture in streaming, quindi l'output opaco memorizzato nella cache non può acquisire un proprietario di sessione diverso.

Guardie di regressione: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` e `tests/unit/chatcore-semantic-cache.test.ts`.

## Vedi anche

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — interruttori automatici, cooldown, blocchi del modello
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostica 400 a monte
- Fonte: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrazione: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- percorso API : `src/app/api/cache/reasoning/route.ts`
- Numero originale: #1628
