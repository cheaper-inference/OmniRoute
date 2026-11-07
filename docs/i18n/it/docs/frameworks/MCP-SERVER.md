# OmniRoute MCP Server Documentation (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server Model Context Protocol con 110 strumenti per operazioni di routing, cache, compressione, memoria, skill, proxy, pool, Radar e sorgenti di contesto.
>
> Fonte ufficiale: `open-sse/mcp-server/server.ts` calcola **110 strumenti univoci** con `countUniqueMcpTools()`: 45 definizioni canoniche (inclusi i sei strumenti per il ciclo di vita CCR, il trio agent-skills, `omniroute_radar_catalog` e `omniroute_x_search`), più memoria (3), skill (4), skill GitHub (3), pool (6), gamification (8), plugin (8), Notion (6), Obsidian (22), corpus locale (3) e due strumenti di compressione esclusivi di RTK.

## Installazione

OmniRoute MCP è integrato. Avvialo con:

```bash
omniroute --mcp
```

Oppure tramite il trasporto open-sse:

```bash
# Trasporto HTTP streamable (porta 20130)
omniroute --dev  # MCP si avvia automaticamente sull'endpoint /mcp
```

I trasporti HTTP (`sse` / `streamable-http`, serviti nello stesso processo dal server della dashboard) sono
disattivati per impostazione predefinita e in precedenza potevano essere attivati o disattivati solo dalla pagina `/dashboard/mcp`. A partire dalla v3.8.51
anche la CLI offre le stesse funzionalità:

```bash
omniroute mcp status                                  # stato abilitato/online, trasporto, numero di strumenti
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # reimposta le sessioni sse/streamable-http attive
```

`mcp enable`/`mcp disable` eseguono una richiesta PATCH sulla stessa impostazione `mcpEnabled` (e facoltativamente `mcpTransport`)
che la dashboard attiva o disattiva tramite `/api/settings`. `mcp restart` chiama `POST /api/mcp/restart`: termina
le sessioni `sse`/`streamable-http` attive affinché la richiesta successiva venga reinizializzata correttamente, restituisce
`409` se MCP è disabilitato e `501` per il trasporto `stdio` (i client stdio gestiscono il proprio
sottoprocesso, quindi non esiste alcun handle interno al processo da riavviare).

## Trasporti

Il server MCP espone tre trasporti, tutti basati sulla stessa factory `createMcpServer()`:

| Trasporto         | Dove                                            | Quando utilizzarlo                                           |
| :---------------- | :---------------------------------------------- | :----------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | Integrazioni IDE (Claude Desktop, Cursor, ecc.)              |
| `sse`             | `POST/GET /api/mcp/sse` tramite `httpTransport` | Client browser/agente che necessitano di un flusso di eventi |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | Client HTTP multisessione (header `mcp-session-id`)          |

Il trasporto HTTP attivo (`sse` o `streamable-http`) viene selezionato mediante l'impostazione `mcpTransport`. Il passaggio da un trasporto all'altro chiude le sessioni esistenti sull'altro trasporto.

### Accesso remoto (esclusione tramite scope manage)

`/api/mcp/*` appartiene al livello LOCAL_ONLY (`src/server/authz/routeGuard.ts`): per impostazione predefinita, è accessibile solo dagli host di loopback (`localhost`, `127.0.0.1`, `::1`). A partire dalla v3.8.2, i client non di loopback possono connettersi se presentano un'intestazione `Authorization: Bearer <api-key>` la cui chiave dispone dello scope `manage`. Questo è l'unico modo per accedere al server MCP remoto tramite un tunnel, un reverse proxy o un hostname pubblico.

```bash
# Concedi lo scope manage: apri la pagina API Keys della dashboard e attiva
# "Management Access" per la chiave, oppure invia scopes:["manage"] tramite POST durante la creazione.

# Quindi connettiti da un client MCP remoto:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Una chiave senza lo scope manage (o l'assenza di un Bearer token) restituisce `403 LOCAL_ONLY`. Il prefisso correlato `/api/cli-tools/runtime/*` intenzionalmente NON consente questa esclusione: consulta [Livelli di Route Guard — eccezione per lo scope manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Validazione dell'Origin

Dopo l'autenticazione, ogni richiesta a `/api/mcp/*` — i transport e le route di gestione come `status`, `tools`, `audit`, `restart` — ha l'header `Origin` validato, qualunque sia il chiamante (chiave API, token della CLI, sessione della dashboard o loopback anonimo con login disattivato). È la protezione contro il DNS rebinding richiesta dalla specifica MCP Streamable HTTP.

- **Nessun header `Origin`** → consentita. La CLI di OmniRoute, l'SDK e i client IDE non lo inviano.
- **`Origin` consentito** → `localhost` / `127.0.0.1` / `[::1]` su qualsiasi porta, oppure l'origin pubblico di OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, l'origin inoltrato da un reverse proxy fidato (`OMNIROUTE_TRUST_PROXY`, solo se non è impostato un base URL) o un host IP loopback/LAN raggiunto direttamente. L'header `Host` da solo non rende mai fidato un origin.
- **Qualsiasi altro `Origin`, incluso `null`** → `403` con corpo di errore JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Una sessione della dashboard che presenta un token CSRF valido viene comunque accettata, come per le altre scritture della dashboard.

Un client MCP da browser servito dietro un reverse proxy richiede `OMNIROUTE_PUBLIC_BASE_URL`; non esiste una allow-list per altri origin. Il preflight CORS (`OPTIONS`) non verifica l'Origin; la richiesta successiva sì.

## Configurazione dell'IDE

Consulta [Configurazione del client MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) per configurare Claude Desktop,
Cursor, Cline e i client MCP compatibili.

---

## Strumenti essenziali (14) — Fase 1

| Strumento                       | Ambiti                | Descrizione                                                                                                                                          |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Tempo di attività, memoria, circuit breaker, limiti di frequenza, statistiche della cache                                                            |
| `omniroute_list_combos`         | `read:combos`         | Tutte le combo configurate con le relative strategie (metriche opzionali)                                                                            |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metriche delle prestazioni per una combo specifica                                                                                                   |
| `omniroute_switch_combo`        | `write:combos`        | Attiva o disattiva una combo                                                                                                                         |
| `omniroute_create_combo`        | `write:combos`        | Crea una combo convalidata tramite l'API per le combo esistente                                                                                      |
| `omniroute_check_quota`         | `read:quota`          | Quota utilizzata/totale, percentuale rimanente, ora di reimpostazione, stato dei token                                                               |
| `omniroute_route_request`       | `execute:completions` | Invia un completamento chat tramite il routing di OmniRoute                                                                                          |
| `omniroute_cost_report`         | `read:usage`          | Rapporto sui costi per periodo (sessione/giorno/settimana/mese)                                                                                      |
| `omniroute_list_models_catalog` | `read:models`         | Catalogo completo dei modelli con funzionalità, stato e prezzi                                                                                       |
| `omniroute_radar_catalog`       | `read:radar`          | Catalogo Radar locale firmato; filtri opzionali per provider/famiglia                                                                                |
| `omniroute_tool_search`         | `read:tools`          | Individua gli strumenti nel catalogo MCP registrato                                                                                                  |
| `omniroute_web_search`          | `execute:search`      | Ricerca sul Web tramite i provider di ricerca configurati. Non per X/Twitter.                                                                        |
| `omniroute_x_search`            | `execute:search`      | Cerca su X tramite xAI/SuperGrok oppure seleziona `xquik-search` per i risultati dell'API Xquik. Richiede le credenziali per il backend selezionato. |
| `omniroute_web_fetch`           | `execute:search`      | Recupera contenuti Web tramite i provider di recupero configurati                                                                                    |

## Strumenti avanzati (11) — Fase 2

| Strumento                          | Ambiti                               | Descrizione                                                                                                                                   |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulazione di routing senza esecuzione con albero di fallback                                                                                |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budget della sessione con azione di riduzione/blocco/avviso                                                                                   |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aggiorna la strategia della combinazione in fase di esecuzione (priorità/ponderata/automatica/ecc.)                                           |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Applica il profilo di resilienza predefinito `aggressive` / `balanced` / `conservative`                                                       |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Test in tempo reale di ogni provider in una combinazione mediante una chiamata upstream reale                                                 |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metriche per provider con latenza p50/p95/p99 e stato dell'interruttore automatico                                                            |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Consiglia la combinazione in base al tipo di attività con vincoli di budget/latenza                                                           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Spiega perché una richiesta è stata instradata a un provider (fattori di punteggio + fallback)                                                |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Istantanea completa della sessione: costo, token, modelli/provider principali, errori, protezione del budget                                  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostica (e, facoltativamente, ripara automaticamente) le incoerenze del database, come riferimenti a combinazioni non validi/righe orfane |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sincronizza i dati sui prezzi da fonti esterne (LiteLLM); supporta `dryRun`                                                                   |

## Strumenti per la cache (2)

| Strumento               | Ambiti        | Descrizione                                                                  |
| :---------------------- | :------------ | :--------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistiche della cache semantica, della cache dei prompt e dell'idempotenza |
| `omniroute_cache_flush` | `write:cache` | Svuota la cache globalmente o per firma/modello                              |

## Strumenti di compressione (13)

| Strumento                           | Ambiti              | Descrizione                                                                                                                                         |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Impostazioni di compressione, riepilogo analitico e statistiche compatibili con la cache (include i metadati `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Configura modalità di compressione, soglia, rapporto obiettivo, conservazione del prompt di sistema e opzione di compressione delle descrizioni MCP |
| `omniroute_set_compression_engine`  | `write:compression` | Seleziona il motore attivo (off/caveman/rtk/stacked) e l'intensità di Caveman/RTK                                                                   |
| `omniroute_list_compression_combos` | `read:compression`  | Elenca le combinazioni di compressione denominate e le relative pipeline di motori                                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Dati analitici raggruppati per combinazione di compressione e motore                                                                                |
| `omniroute_ccr_store`               | `write:compression` | Archivia contenuti isolati per chiamante nell'archivio CCR limitato in memoria e restituisce un marcatore insieme a un riferimento `ccr://`         |
| `omniroute_ccr_retrieve`            | `read:compression`  | Recupera il contenuto CCR per intero oppure nelle modalità intestazione, coda, righe, grep e statistiche                                            |
| `omniroute_ccr_inspect`             | `read:compression`  | Esamina i metadati CCR di proprietà del chiamante senza restituire il contenuto                                                                     |
| `omniroute_ccr_list`                | `read:compression`  | Elenca i metadati impaginati dei blocchi CCR di proprietà del chiamante                                                                             |
| `omniroute_ccr_delete`              | `write:compression` | Elimina un blocco CCR di proprietà del chiamante                                                                                                    |
| `omniroute_ccr_stats`               | `read:compression`  | Riporta l'utilizzo della memoria nell'ambito del chiamante, i contatori del ciclo di vita e i limiti dell'archivio                                  |
| `omniroute_rtk_discover`            | `read:compression`  | Rileva il rumore ricorrente nei campioni di output RTK forniti volontariamente                                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | Genera una bozza revisionabile di filtro RTK a partire da campioni forniti volontariamente                                                          |

Le voci CCR risiedono esclusivamente in memoria e scompaiono al riavvio. Ogni blocco è limitato a 2 MiB, ogni
principal a 16 MiB e l'archivio globale a 64 MiB. Per impostazione predefinita, le voci hanno un TTL di 24 ore (massimo
sette giorni). Il recupero MCP completo è limitato a 256 KiB; i blocchi più grandi rimangono disponibili tramite le
modalità per intervallo e grep. Archiviazione, recupero, elencazione, ispezione, eliminazione e statistiche sono isolati in base
al principal autenticato della chiave API. I record di audit contengono hash e metadati sulle dimensioni, mai il contenuto.

`omniroute_compression_status` segnala separatamente la compressione delle descrizioni MCP in
`analytics.mcpDescriptionCompression`. Questi valori sono stime delle dimensioni dei metadati per le
descrizioni MCP elencabili (`tools`, `prompts`, `resources` e `resourceTemplates`); non sono ricevute
di utilizzo del provider e sono contrassegnati con `source: "mcp_metadata_estimate"`.

### Filtro dell'albero di accessibilità MCP (v3.8.0)

Separatamente dagli strumenti di compressione descritti sopra, OmniRoute include un filtro post-esecuzione che
comprime i **risultati degli strumenti** MCP per browser/accessibilità prima che vengano restituiti
all'agente. Questo filtro non è di per sé uno strumento: viene eseguito in modo trasparente su qualsiasi risultato
di uno strumento che contenga testo dettagliato dell'albero di accessibilità o di snapshot del browser (≥2000 caratteri).

Comportamenti principali:

- Comprime ≥30 righe consecutive e ripetute allo stesso livello in un riepilogo con parte iniziale + finale
- Mantiene gli anchor `[ref=eXX]` richiesti da Playwright/computer-use
- Tronca in modo netto il testo eccessivamente lungo (>50.000 caratteri), aggiungendo un suggerimento di navigazione
- Risparmio previsto: **60–80%** sui payload degli snapshot del browser

Configurazione: `compression.mcpAccessibility` nelle impostazioni globali (migrazione 056).
Implementazione: `open-sse/services/compression/engines/mcpAccessibility/`.
Documentazione completa: [Motori di compressione — Filtro dell'albero di accessibilità MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Consulta [Motori di compressione](../compression/COMPRESSION_ENGINES.md) e [Compressione RTK](../compression/RTK_COMPRESSION.md) per
il modello di compressione a runtime alla base di questi strumenti.

## Strumenti 1Proxy (3)

| Strumento                   | Ambiti         | Descrizione                                                                                          |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Recupera proxy gratuiti dal marketplace 1proxy (filtri per protocollo/paese/qualità/limite)          |
| `omniroute_oneproxy_rotate` | `read:proxies` | Ottiene il successivo proxy disponibile in base alla strategia (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistiche del pool, stato della sincronizzazione, distribuzione per protocollo e paese             |

## Strumenti di memoria (3)

Definiti in `open-sse/mcp-server/tools/memoryTools.ts`. L'autenticazione e gli ambiti sono applicati tramite la pipeline standard degli ambiti MCP.

| Strumento                 | Ambiti         | Descrizione                                                                                                |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Cerca memorie per query / tipo / chiave API applicando il limite del budget di token                       |
| `omniroute_memory_add`    | `write:memory` | Aggiunge una nuova voce di memoria (`factual` / `episodic` / `procedural` / `semantic`)                    |
| `omniroute_memory_clear`  | `write:memory` | Cancella le memorie associate a una chiave API, facoltativamente filtrate per tipo o timestamp `olderThan` |

## Strumenti per le skill (4)

Definiti in `open-sse/mcp-server/tools/skillTools.ts`. Basati su `src/lib/skills/registry` + `src/lib/skills/executor`.

| Strumento                     | Ambiti           | Descrizione                                                                                    |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Elenca le skill registrate con filtro facoltativo per chiave API, nome o stato di abilitazione |
| `omniroute_skills_enable`     | `write:skills`   | Abilita o disabilita una skill specifica in base all'ID                                        |
| `omniroute_skills_execute`    | `execute:skills` | Esegue una skill con l'input fornito e restituisce il record di esecuzione                     |
| `omniroute_skills_executions` | `read:skills`    | Elenca la cronologia recente delle esecuzioni delle skill                                      |

## Fonte di contesto Notion (6)

Definiti in `open-sse/mcp-server/tools/notionTools.ts`. Token archiviato nella tabella `key_value` tramite `src/lib/db/notion.ts`. Client REST in `src/lib/notion/api.ts`. API delle impostazioni in `src/app/api/settings/notion/route.ts`. Interfaccia della dashboard in `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Configura il token dell'integrazione Notion dalla scheda **Fonti di contesto** nella dashboard dell'endpoint oppure tramite l'API REST:

```bash
# Imposta il token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Controlla lo stato
curl http://localhost:20128/api/settings/notion

# Disconnetti
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Strumento                    | Ambiti         | Descrizione                                                          |
| :--------------------------- | :------------- | :------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Esegue una ricerca full-text in tutte le pagine e i database         |
| `notion_get_page`            | `read:notion`  | Ottiene una pagina in base all'ID, incluse le relative proprietà     |
| `notion_list_block_children` | `read:notion`  | Elenca i blocchi figli di una pagina o di un blocco                  |
| `notion_query_database`      | `read:notion`  | Interroga un database con filtri, ordinamenti e paginazione          |
| `notion_get_database`        | `read:notion`  | Ottiene lo schema di un database in base all'ID                      |
| `notion_append_blocks`       | `write:notion` | Aggiunge blocchi figli a un blocco padre (massimo 100 per richiesta) |

## Strumenti del catalogo Agent Skill (3)

Definiti in `open-sse/mcp-server/tools/agentSkillTools.ts`. Basati su `src/lib/agentSkills/catalog`. Questi strumenti espongono ai client MCP e agli agenti esterni il catalogo della documentazione Agent Skills, composto da 45 voci. Ambito: `read:catalog`.

| Strumento                         | Ambiti         | Descrizione                                                                                                                                          |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Elenca tutte le 45 skill degli agenti con filtri facoltativi `category` (api\|cli) e `area`; restituisce metadati + copertura                        |
| `omniroute_agent_skills_get`      | `read:catalog` | Recupera i metadati completi + il contenuto di SKILL.md per una singola skill tramite l'`id` canonico                                                |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistiche di copertura: quante delle 23 skill API, 21 CLI e 1 di configurazione hanno file SKILL.md nel filesystem rispetto ai totali del catalogo |

Consulta [AGENT-SKILLS.md](./AGENT-SKILLS.md) per il catalogo completo e per sapere come viene utilizzato dagli agenti esterni.

## Framework correlati (v3.8.0)

L'inventario degli strumenti MCP riportato sopra (110 strumenti univoci, calcolati da `countUniqueMcpTools()`) è intenzionalmente
limitato alle operazioni di routing/cache/compressione/memoria/skill/proxy/origine del contesto in fase di esecuzione. Due framework
adiacenti sono distribuiti insieme al server MCP nella v3.8.0 e sono documentati separatamente:

### Cloud Agents

I Cloud Agents sono agenti di programmazione IA eseguiti fuori processo (codex-cloud, cursor-cloud, devin, jules), integrati in
OmniRoute tramite lo stesso modello di connessione utilizzato per i provider LLM. Sono esposti tramite
una propria interfaccia REST (`/api/v1/agents/*`) e **non** fanno parte del catalogo degli strumenti MCP
— la chiamata a un Cloud Agent non utilizza alcun ambito MCP.

- Implementazione: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Ciclo di vita: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Documentazione: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrail

I guardrail sono filtri pre/post-esecuzione (vision-bridge, pii-masker, prompt-injection)
applicati all'interno della pipeline di chat. Vengono eseguiti prima che sia raggiunto il livello degli strumenti/routing MCP
ed emettono violazioni strutturate nella pipeline di audit; non vengono invocati come strumenti MCP.

- Implementazione: `src/lib/guardrails/`.
- Documentazione: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Durante il debug di una chiamata MCP che sembra bloccata, controlla sia il registro di audit MCP
(voci `scope_denied:*`) sia la traccia di audit dei guardrail: una richiesta potrebbe essere rifiutata da
un guardrail **prima** ancora di raggiungere il livello di applicazione degli ambiti MCP.

---

## Endpoint API REST

| Endpoint               | Metodo                | Descrizione                                                                                               | Autenticazione            |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------ |
| `/api/mcp/status`      | `GET`                 | Stato del server: heartbeat, stato del trasporto HTTP, riepilogo delle attività di audit                  | Gestione (sessione/admin) |
| `/api/mcp/tools`       | `GET`                 | Catalogo degli strumenti (nome, descrizione, ambiti, fase, endpoint di origine)                           | Gestione                  |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint di trasporto SSE (vincolato da `mcpEnabled` + `mcpTransport === "sse"`)                          | Chiave API + ambiti       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Trasporto HTTP in streaming (utilizza l'header `mcp-session-id`; `DELETE` termina la sessione)            | Chiave API + ambiti       |
| `/api/mcp/audit`       | `GET`                 | Voci del registro di audit da `mcp_tool_audit` (filtri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Gestione                  |
| `/api/mcp/audit/stats` | `GET`                 | Statistiche di audit aggregate (`totalCalls`, `successRate`, `avgDurationMs`, strumenti più utilizzati)   | Gestione                  |

File sorgente: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Entrambi i trasporti SSE e HTTP in streaming sono bloccati finché il server MCP non viene abilitato nelle impostazioni (`mcpEnabled`) e non viene selezionato il valore `mcpTransport` appropriato. Se è configurato il trasporto errato, la route restituisce HTTP 400 con un suggerimento per modificare le impostazioni.

---

## Autenticazione e ambiti

Lo strumento MCP chiama le stringhe dell'ambito di lettura dal chiamante. Questo controllo è uno dei tre spazi dei nomi indipendenti. Un passaggio di una pedina non è un passaggio delle altre. Le regole sono [Tre spazi dei nomi di ambito](#three-scope-namespaces). Il catalogo degli strumenti comprende [gli ambiti degli strumenti MCP](#mcp-tool-scopes).

### Tre spazi dei nomi di ambito

`manage` su una chiave API, `read:compression` su uno strumento MCP e `read` su un token di accesso `oma_live_…` sono tre concessioni diverse. I chiamanti che inviano un token di accesso `read` a un percorso di gestione mutante ottengono HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Quel grado è `scopeSatisfies`. Non consulta la tabella MCP e il matcher MCP non la consulta.

| Spazio dei nomi            | Credenziali                                                                              | Controllore                    | Un passaggio consente                                                  |
| :------------------------- | :--------------------------------------------------------------------------------------- | :----------------------------- | :--------------------------------------------------------------------- |
| Gestione delle chiavi API  | `api_keys.scopes`                                                                        | `hasManageScope`               | Gestione REST per quella chiave di trasporto                           |
| Additivo chiave API        | stesso array, una stringa esatta                                                         | l'aiutante indicato di seguito | Solo quella capacità                                                   |
| ambiti dello strumento MCP | stesso array, altrimenti MCP `_meta` (solo HTTP/SSE ), altrimenti `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                 | Questo strumento, una volta attivata l'applicazione delle norme        |
| Token di accesso           | `oma_live_…`                                                                             | `scopeSatisfies`               | Il percorso di gestione il cui metodo e percorso richiedono quel rango |

Il conio di ciascuna credenziale è trattato in [Autenticazione di gestione](../guides/MANAGEMENT-AUTH.md).

#### Ambiti della chiave API

Un array `api_keys.scopes` alimenta due lavori. Usano funzioni diverse.

**Gestione REST.** `manage` e `admin` sono i membri di `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` è ciò che autorizza i percorsi di gestione per quella chiave. `admin` è in grado di gestire tali percorsi. La parola `admin` qui non è il rango del token di accesso e non si espande negli ambiti dello strumento MCP.

**Stringhe aggiuntive.** Ognuno è un test di appartenenza esatto e ognuno rimane fuori `MANAGEMENT_API_KEY_SCOPES`.

| Ambito                         | Un passaggio consente                                                                                                                                                            |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Solo il carve-out `/api/mcp/` LOCAL_ONLY non loopback (`hasMcpConnectOrManageScope`). Una chiave con `manage` o `admin` supera comunque quel ritaglio.                           |
| `self:usage`                   | `GET /api/v1/me/status` per questa chiave (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` aggiunge questo ambito alla creazione (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Quote dell'account upstream all'interno del payload dello stato (`src/lib/usage/apiKeySelfService.ts`). La route di stato richiede ancora `self:usage`.                          |
| `policy:bypass-provider-quota` | Le chiamate di inferenza di questa chiave saltano la policy della quota del provider (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                              |

#### Corrispondenza

Il catalogo è la tabella sotto [gli ambiti degli strumenti MCP](#mcp-tool-scopes). Non trattare `MCP_SCOPE_LIST` in `src/shared/constants/mcpScopes.ts` come quel catalogo: è il sottoinsieme tipizzato originale. Gli strumenti successivi dichiarano ulteriori ambiti accanto ad esso (`read:notion`, `read:skills`, `read:local-corpus` e il resto della tabella).

`evaluateToolScopes` in `open-sse/mcp-server/scopeEnforcement.ts` consente una chiamata quando ogni ambito richiesto corrisponde a un ambito concesso:

- `*` soddisfa ogni ambito richiesto.
- Un ambito concesso che termina con `*` corrisponde a un ambito richiesto che inizia con il prefisso prima dell'asterisco. `read:*` corrisponde `read:compression`.
- Ogni altro ambito concesso corrisponde solo alla stringa richiesta identica.

Una chiave i cui ambiti sono `["manage"]` fallisce `scopeMatches` per `read:compression`. La stessa chiamata fallisce per `admin`, `mcp:connect`, `read` e `write` quando queste sono le uniche stringhe concesse. Non esiste una gerarchia tra gli ambiti degli strumenti MCP oltre il finale `*`.

L'applicazione è disattivata a meno che `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (impostazione predefinita `false`). Mentre è spento, `evaluateToolScopes` consente la chiamata e salta il catalogo. Mentre è attivo, HTTP utilizza `api_keys.scopes` della chiave Bearer come `authInfo` (vedere [Associazione dell'ambito HTTP per chiave](#per-key-http-scope-binding-7895) ). Quando non viene risolto alcun ambito chiave, il set concesso passa a MCP `_meta` (onorato solo per i chiamanti HTTP/SSE, all'interno di un contesto di autenticazione HTTP ; `_meta` di un chiamante stdio viene ignorato perché il client lo controlla e non porta identità per chiamante), quindi `OMNIROUTE_MCP_SCOPES`.

#### Ambiti del token di accesso

I token `oma_live_…` (`src/lib/accessTokens/scopes.ts`) trasportano `read`, `write` o `admin`. `scopeSatisfies` è un rango: `admin` copre `write` e `read` e `write` copre `read`. Gli ambiti sconosciuti non coprono nulla.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) confronta quel rango con `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` e `OPTIONS` richiedono `read`.
- Ogni altro metodo richiede `write`.
- I percorsi in `ADMIN_SCOPE_PREFIXES` richiedono `admin` per ogni metodo. `/api/mcp` è in quell'elenco, quindi un token di accesso `write` non può ancora chiamare la superficie MCP HTTP.
- I percorsi in `ADMIN_MUTATION_PREFIXES` richiedono `admin` solo per le mutazioni.
- I percorsi in `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) richiedono `admin` solo per le mutazioni e solo su quel percorso esatto — altri sottopercorsi `/api/settings/*` mantengono `write`.

`PATCH /api/keys/{id}` è una mutazione e non è presente negli elenchi di amministrazione, quindi un token `read` riceve 403 `Access token scope 'read' is insufficient; 'write' required.` Un token di accesso `write` o `admin` soddisfa quel percorso. Un dashboard JWT, il token loopback CLI machine-id e una chiave API con `manage` o `admin` prendono altri rami e non sono limitati da questo rango.

Un token di accesso che passa `scopeSatisfies` per `/api/mcp` ha superato solo il gate di gestione. Le chiamate allo strumento continuano a eseguire `scopeMatches` rispetto agli ambiti della chiave API. Il rango del token di accesso non è un input per `scopeMatches`.

### ambiti dello strumento MCP

L'applicazione dell'ambito è centralizzata in `open-sse/mcp-server/scopeEnforcement.ts`. Ciascuno strumento richiede ambiti specifici:

| Ambito                | Utensili                                                                                                                                                                               |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                      |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                              |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                 |
| `read:quota`          | `check_quota`                                                                                                                                                                          |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                 |
| `read:models`         | `list_models_catalog`                                                                                                                                                                  |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                          |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                  |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                     |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                            |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                         |
| `read:cache`          | `cache_stats`                                                                                                                                                                          |
| `write:cache`         | `cache_flush`                                                                                                                                                                          |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                             |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                      |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                  |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                       |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                 |
| `read:memory`         | `memory_search`                                                                                                                                                                        |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                           |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                     |
| `write:skills`        | `skills_enable`                                                                                                                                                                        |
| `execute:skills`      | `skills_execute`                                                                                                                                                                       |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                       |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                              |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                       |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                         |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                     |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                        |
| `read:obsidian`       | 13 strumenti di lettura — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 strumenti di scrittura — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                      |

Sono supportati gli ambiti con caratteri jolly: `read:*` garantisce tutti gli ambiti di lettura, `*` garantisce l'accesso completo.

### `mcp:connect` — capacità di percorso stretto (#7895)

Raggiungere il trasporto HTTP/SSE MCP (`/api/mcp/*`) dal non-loopback richiede il carve-out `/api/mcp/` LOCAL_ONLY (vedere `docs/security/ROUTE_GUARD_TIERS.md`). Storicamente tale esclusione accettava solo un tasto `manage`/`admin` -scope API completo — troppo ampio per un chiamante che deve solo parlare MCP. `src/shared/constants/managementScopes.ts` ora esporta `MCP_CONNECT_SCOPE = "mcp:connect"`: un ambito additivo e ristretto (stesso precedente di `SELF_USAGE_SCOPE`) che autorizza ONLY il bypass `/api/mcp/` in `src/server/authz/policies/management.ts` — non garantisce alcun altro accesso al percorso di gestione ed è deliberatamente mantenuto OUT di `MANAGEMENT_API_KEY_SCOPES`. Una chiave che tiene `manage`/`admin` supera comunque il carve-out invariato; `mcp:connect` è un'alternativa con privilegi inferiori per i chiamanti remoti solo MCP, verificata tramite `hasMcpConnectOrManageScope()`.

### Associazione dell'ambito HTTP per tasto (#7895)

Su HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` ora risolve il vero `api_keys.scopes` del chiamante tramite `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) e lo passa allo `transport.handleRequest(req, { authInfo })` di MCP SDK, quindi `extra.authInfo.scopes` che raggiunge ciascuna chiamata dello strumento riflette gli ambiti propri della chiave Bearer. `scopeEnforcement.ts` `resolveCallerScopeContext()` ha già dato la priorità `authInfo` rispetto al fallback `_meta` e `OMNIROUTE_MCP_SCOPES` env — questo popola solo la prima fonte con la priorità più alta, che in precedenza era stata unfed su HTTP. Quando nessuna chiave API viene risolta (nessuna intestazione, chiave non valida), `authInfo` rimane `undefined` e la risoluzione passa alla catena `meta`/env esistente invariata. stdio non ha identità per chiamante (vedi `mcpCallerIdentity.ts`) e non è influenzato dall'associazione per chiave — salta il passaggio `_meta` (`_meta` viene onorato solo all'interno di un contesto di autenticazione HTTP, #15159) e si risolve solo dalla chiave `OMNIROUTE_MCP_SCOPES` env.

**L'applicazione è forzata per i chiamanti HTTP/SSE con ambito ristretto indipendentemente da `OMNIROUTE_MCP_ENFORCE_SCOPES`.** L'impostazione predefinita di `OMNIROUTE_MCP_ENFORCE_SCOPES` su `false` è sicura solo per il flusso local/stdio a operatore singolo, in cui non esiste un'identità per chiamante da considerare. `open-sse/mcp-server/server.ts::withScopeEnforcement()` attiva incondizionatamente l'applicazione dell'ambito per strumento (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) ogni volta che `resolveCallerScopeContext()` risolve `source === "authInfo"` (ovvero un'intestazione di autorizzazione HTTP reale per chiave, HTTP/SSE-only) AND quella chiave non contiene l'ambito `manage`/`admin` completo. Ciò colma il divario in cui una chiave che tiene ONLY lo stretto ambito di bypass `mcp:connect` — documentato sopra come non autorizza altro che `/api/mcp/` LOCAL_ONLY carve-out — potrebbe altrimenti invocare ogni strumento MCP una volta che un operatore ha abilitato l'accesso remote/non-loopback MCP, semplicemente perché `OMNIROUTE_MCP_ENFORCE_SCOPES` spedisce `false` per impostazione predefinita. Una chiave `manage`/`admin` completa su HTTP e ogni chiamante stdio/local mantengono invariato il comportamento `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated esistente.

---

## Variabili d'ambiente

| Variabile                               | Valore predefinito                 | Scopo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | URL di base utilizzato dal server MCP per chiamare le API interne di OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_API_KEY`                     | (vuoto)                            | Chiave API inoltrata come `Authorization: Bearer` alle chiamate API interne                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (solo `"true"` lo abilita) | Se abilitato, gli ambiti mancanti impediscono le chiamate agli strumenti e registrano `scope_denied:<reason>` nel log di audit. L'applicazione è INOLTRE forzata indipendentemente da questo flag per qualsiasi chiamante HTTP/SSE identificato tramite un'intestazione Authorization specifica per chiave (`source === "authInfo"`) che non disponga dell'ambito completo `manage`/`admin`, ad esempio una chiave che possieda solo l'ambito limitato di bypass `mcp:connect`; pertanto, questo valore predefinito è sicuro soltanto per il flusso locale/stdio con singolo operatore, mai per l'accesso remoto non loopback |
| `OMNIROUTE_MCP_SCOPES`                  | (vuoto)                            | Elenco di ambiti consentiti separati da virgole e considerati "disponibili" per impostazione predefinita (utilizzato quando il chiamante non fornisce i propri ambiti)                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (non impostato = attivo)           | Se impostato su `0/false/off/no`, disabilita la compressione delle descrizioni MCP al momento della registrazione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (non impostato = attivo)           | Alias alternativo per la stessa opzione precedente                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                            | Tempo massimo prima dell'interruzione delle letture di gestione interne (stato, resilienza, combinazioni, quota, utilizzo)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                            | Tempo massimo prima dell'interruzione per i passaggi che attendono un provider (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `MCP_TOOL_DENY`                         | (non impostato = nessun filtro)    | Nomi degli strumenti, separati da virgole, da escludere da `tools/list` (riduzione della cardinalità degli strumenti — vedere sotto)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `MCP_TOOL_ALLOW`                        | (non impostato = nessun filtro)    | Nomi degli strumenti separati da virgole da mantenere esclusivamente (modalità allow-list — vedere sotto)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `DATA_DIR`                              | `~/.omniroute`                     | Il file heartbeat viene scritto in `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

---

## Compressione delle descrizioni

I registri degli strumenti, dei prompt e delle risorse MCP possono comprimere le descrizioni al momento della registrazione o dell'elencazione per ridurre la quantità di metadati esposta ai client (e quindi il costo del contesto del prompt). L'implementazione si trova in `open-sse/mcp-server/descriptionCompressor.ts` ed è integrata nel server MCP tramite `compressMcpRegistryMetadata` all'interno di `createMcpServer()`.

- La compressione viene eseguita sul testo della descrizione utilizzando il set di regole Caveman (`getRulesForContext("all", "full")`) con estrazione dei blocchi preservati (frammenti di codice, blocchi delimitati, ecc.), in modo da non alterare il contenuto strutturale.
- Può essere attivata o disattivata per ogni distribuzione tramite il valore `compression.mcpDescriptionCompressionEnabled` nella tabella delle impostazioni `key_value` (impostazione predefinita: abilitata), esposto nell'interfaccia utente come **Analisi → Compressione delle descrizioni MCP**.
- Può essere attivata o disattivata per l'intero processo tramite `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` oppure `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Le statistiche in tempo reale sono esposte tramite `omniroute_compression_status` in `analytics.mcpDescriptionCompression` e contrassegnate con `source: "mcp_metadata_estimate"` per distinguerle dalle ricevute di utilizzo effettive del provider.

---

## Riduzione della cardinalità degli strumenti (F4.3)

La compressione delle descrizioni riduce i metadati di ogni strumento; la **riduzione della cardinalità degli strumenti** fa un ulteriore passo avanti riducendo il _numero_ di strumenti annunciati. Pubblicizzare meno strumenti nel manifest `tools/list` riduce il costo in token per richiesta che il modello del client sostiene per il catalogo degli strumenti (compressione di "livello 5"). L'implementazione è un filtro puro e senza stato in `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), integrato nel ciclo di registrazione in `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Facoltativo, disattivato per impostazione predefinita.** Il filtro viene eseguito solo quando è impostata almeno una delle due variabili di ambiente; se nessuna delle due è impostata, tutti i 110 strumenti vengono annunciati senza modifiche.

| Variabile        | Modalità                                                                                                                           |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Lista di esclusione — nomi degli strumenti separati da virgole che vengono sempre rimossi da `tools/list`                          |
| `MCP_TOOL_ALLOW` | Lista di autorizzazione — nomi degli strumenti separati da virgole; solo questi vengono mantenuti, tutti gli altri vengono rimossi |

`deny` ha la precedenza su `allow`. I nomi sono separati da virgole, gli spazi iniziali e finali vengono rimossi e le voci vuote vengono ignorate. Esempi:

```bash
# Rimuove due strumenti dal catalogo
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Annuncia solo gli strumenti di instradamento e quota (modalità lista di autorizzazione)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Come vengono rimossi gli strumenti filtrati:** la registrazione riesce sempre; uno strumento rifiutato dal profilo viene quindi disabilitato tramite `.disable()` sull'handle dell'SDK MCP, in modo che non compaia mai in `tools/list`, mentre il collegamento rimane intatto (abilitazione/disabilitazione pulita, senza nuova registrazione). Il parser del profilo è `readMcpToolProfileFromEnv(process.env)`, che restituisce `null` (nessun filtro) quando entrambe le variabili sono vuote.

La struttura più completa `ToolProfile` alla base di `reduceToolManifest` supporta anche il filtraggio per intersezione degli ambiti (`allowScopes`, con corrispondenza tramite caratteri jolly in stile `read:*`) e un limite deterministico `maxTools`, ma queste due opzioni richiedono il manifest completo al momento della registrazione e **non** sono attualmente esposte tramite le variabili di ambiente (un hook a livello di `tools/list` è pianificato come attività successiva). `estimateManifestTokens()` è disponibile per confrontare il costo in token del manifest prima e dopo la riduzione.

---

## Heartbeat di runtime

Il trasporto stdio registra lo stato di attività in `${DATA_DIR}/runtime/mcp-heartbeat.json` ogni 5 secondi. La dashboard (`/api/mcp/status`) legge questo file insieme allo stato di attività del PID per determinare `online`. I trasporti HTTP, invece, riportano lo stato tramite `getMcpHttpStatus()` all'interno del processo (senza scrivere alcun file).

L'istantanea dell'heartbeat contiene:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Registrazione di audit

Ogni chiamata a uno strumento viene registrata nella tabella SQLite `mcp_tool_audit` da `open-sse/mcp-server/audit.ts`:

- Nome dello strumento, argomenti (sottoposti a hashing/troncati in base all'`auditLevel` dello strumento), risultato
- Durata in ms, indicatore di riuscita/errore, messaggio di errore (se applicabile)
- Hash della chiave API, timestamp
- I rifiuti dovuti agli ambiti vengono registrati come `scope_denied:<reason>` insieme all'elenco degli ambiti mancanti

Usa la dashboard o gli endpoint REST `/api/mcp/audit` e `/api/mcp/audit/stats` per esaminare le chiamate recenti.

---

## File

| File                                                                     | Scopo                                                                                  |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Factory del server MCP, punto di ingresso stdio, registrazioni di strumenti con ambito |
| `open-sse/mcp-server/httpTransport.ts`                                   | Trasporto SSE + HTTP trasmissibile (gestione delle sessioni)                           |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Valutazione dell'ambito degli strumenti e risoluzione del chiamante                    |
| `open-sse/mcp-server/audit.ts`                                           | Registrazione di audit delle chiamate agli strumenti (`mcp_tool_audit`)                |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Scrittura dell'heartbeat stdio (`mcp-heartbeat.json`)                                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Compressione delle descrizioni per i registri di strumenti, prompt e risorse           |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Schemi Zod + registro degli strumenti (`MCP_TOOLS`, 45 voci)                           |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Gestori degli strumenti di Fase 2, cache e 1proxy                                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Gestori degli strumenti di compressione                                                |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definizioni degli strumenti di memoria (3 strumenti)                                   |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definizioni degli strumenti per le competenze (4 strumenti)                            |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definizioni degli strumenti dell'origine del contesto Notion (6 strumenti)             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definizioni degli strumenti di gamification (8 strumenti)                              |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Strumenti di registrazione e gestione dei plugin (8 strumenti)                         |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                                             |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                                              |
| `src/app/api/mcp/sse/route.ts`                                           | Route di trasporto SSE `/api/mcp/sse`                                                  |
| `src/app/api/mcp/stream/route.ts`                                        | Route di trasporto HTTP trasmissibile `/api/mcp/stream`                                |
| `src/app/api/mcp/audit/route.ts`                                         | Query del registro di audit `/api/mcp/audit`                                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Metriche di audit aggregate `/api/mcp/audit/stats`                                     |
| `src/lib/notion/api.ts`                                                  | Client API REST di Notion (nuovi tentativi, timeout, classificazione degli errori)     |
| `src/lib/db/notion.ts`                                                   | Persistenza del token Notion (tabella `key_value`)                                     |
| `src/app/api/settings/notion/route.ts`                                   | API delle impostazioni di Notion (GET/POST/DELETE)                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Interfaccia di gestione del token Notion                                               |
| `tests/unit/notion-api.test.ts`                                          | Test del client API di Notion (7)                                                      |
| `tests/unit/notion-tools.test.ts`                                        | Test di applicazione dell'ambito degli strumenti Notion (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Test del modulo DB di Notion (3)                                                       |
