# 🌐 OmniRoute Proxy Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Aggira i blocchi geografici, proteggi la tua identità e instrada il traffico AI attraverso qualsiasi proxy, senza alcuna complessità di configurazione.**

OmniRoute include un sistema completo di gestione dei proxy che consente di instradare il traffico verso i provider AI upstream attraverso proxy HTTP, HTTPS o SOCKS5. Che tu ti trovi in una regione soggetta a blocchi, abbia bisogno della rotazione degli IP o desideri un fingerprinting discreto, questa guida tratta ogni aspetto.

---

## Sommario

- [Perché utilizzare i proxy?](#why-use-proxies)
- [Panoramica dell'architettura](#architecture-overview)
- [Sistema proxy a 4 livelli](#4-level-proxy-system)
- [Registro dei proxy (CRUD)](#proxy-registry-crud)
- [1mercato gratuito proxy](#1proxy-free-proxy-marketplace)
- [Rotazione per procura](#proxy-rotation)
- [Anti-rilevamento e azione furtiva](#anti-detection--stealth)
- [Modalità proxy upstream](#upstream-proxy-modes)
- [Cruscotto UI](#dashboard-ui)
- [API Riferimento](#api-reference)
- [Variabili d'ambiente](#environment-variables)
- [Risoluzione dei problemi](#troubleshooting)

---

## Perché usare i proxy?

Molti provider AI limitano l'accesso in base alla regione geografica. Gli sviluppatori in **Russia, Cina, Iran, Cuba, Turchia** e altri Paesi riscontrano errori come:

```
unsupported_country_region_territory
```

Anche al di fuori delle regioni soggette a blocchi, i proxy sono utili per:

| Caso d'uso                 | Descrizione                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| **Aggiramento geografico** | Accedi a OpenAI, Anthropic, Codex e Copilot da Paesi soggetti a blocchi        |
| **Rotazione degli IP**     | Distribuisci le richieste su più IP per evitare la limitazione della frequenza |
| **Privacy**                | Nascondi il tuo vero IP ai provider upstream                                   |
| **Conformità**             | Instrada il traffico attraverso giurisdizioni specifiche                       |
| **Test**                   | Simula richieste provenienti da regioni diverse                                |

---

## Panoramica dell'architettura

```
┌───────────────────────────────────────────────────────────────┐
│                       Server OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registro    │    │ Dispatcher   │    │ Fetch (undici)   │  │
│  │ dei proxy   │───▶│ proxy        │───▶│                  │  │
│  │ (SQLite)    │    │ (con cache)  │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sincronizz. │                        │ API del provider │  │
│  │ 1proxy      │                        │ upstream         │  │
│  │ (pool grat.)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Componenti principali

| Componente             | File                                         | Ruolo                                                                 |
| ---------------------- | -------------------------------------------- | --------------------------------------------------------------------- |
| **Registro proxy**     | `src/lib/db/proxies.ts`                      | Operazioni CRUD sulle voci proxy e assegnazioni degli ambiti          |
| **Dispatcher proxy**   | `open-sse/utils/proxyDispatcher.ts`          | Crea dispatcher ProxyAgent/SOCKS di `undici` con memorizzazione cache |
| **Fetch proxy**        | `open-sse/utils/proxyFetch.ts`               | Incapsula `fetch()` con l'iniezione del dispatcher proxy              |
| **Route impostazioni** | `src/app/api/settings/proxy/route.ts`        | API legacy per la configurazione proxy (GET/PUT/DELETE)               |
| **Route di gestione**  | `src/app/api/v1/management/proxies/route.ts` | API CRUD del registro (GET/POST/PATCH/DELETE)                         |
| **DB 1proxy**          | `src/lib/db/oneproxy.ts`                     | Persistenza del marketplace di proxy gratuiti                         |

---

## Stato proxy predefinito per i nuovi account

In** Impostazioni → Proxy → Configurazione globale** , utilizzo** Abilita il proxy per impostazione predefinita per le nuove connessioni** per scegliere lo stato proxy iniziale degli account fornitore appena aggiunti.

La nuova impostazione controlla lo stato proxy iniziale degli account provider appena aggiunti. Non modifica gli account esistenti né sostituisce il passaggio proxy globale. Il suo valore iniziale preserva il comportamento precedente. Disattivalo una volta per creare account futuri con proxy disabilitato per impostazione predefinita.

La preferenza viene memorizzata come `defaultNewConnectionProxyEnabled` tramite le Impostazioni API esistenti. Il valore predefinito è `true` quando non viene mai salvato. Il salvataggio `false` ha effetto per i nuovi account successivi senza riavvio. `POST /api/providers` accetta un booleano rigoroso opzionale `proxyEnabled`; uno `true` o `false` esplicito ha la precedenza sull'impostazione predefinita di creazione. L'omissione su un account duplicato o la riconnessione OAuth preserva lo stato memorizzato dell'account. I singoli account possono comunque essere abilitati o disabilitati in seguito.

I trasferimenti selettivi del provider utilizzano l'impostazione predefinita dell'installazione di destinazione per i nuovi account e preservano i criteri di destinazione quando si sostituiscono gli account esistenti. I commutatori proxy non sono campi di trasferimento portatili. Il ripristino completo del backup e la migrazione storica JSON/SQL mantengono la semantica di ripristino esistente, inclusi i valori dell'account salvati e le impostazioni predefinite dello schema legacy; anche un ripristino completo delle impostazioni può ripristinare questa preferenza.

Questa preferenza non assegna una delega né stabilisce che uno sia sano o in uso. Il routing effettivo dipende ancora dallo switch proxy globale e dalla configurazione proxy applicabile. I provider sintetici senza un account persistente, il traffico OAuth prima della creazione dell'account, i proxy environment/system e la rete di backend esterni non rientrano nel suo ambito.

## Sistema proxy a 4 livelli

OmniRoute supporta la configurazione dei proxy in **quattro ambiti indipendenti**, risolti in ordine di priorità:

```
Ordine di risoluzione delle priorità (dalla più alta → alla più bassa):

  1. 🔵 Proxy account/connessione  →  per chiave API / connessione OAuth
  2. 🟡 Proxy provider             →  per provider (ad es., tutto il traffico OpenAI)
  3. 🟠 Proxy combinazione         →  per configurazione combinata/di instradamento
  4. 🟢 Proxy globale              →  tutto il traffico, tutti i provider
```

### Come funziona la risoluzione

Quando OmniRoute invia una richiesta a un provider upstream, chiama `resolveProxyForConnectionFromRegistry()`, che controlla ogni livello in ordine:

1. **Livello account** — È stato assegnato un proxy a questo specifico ID di connessione?
2. **Livello provider** — È stato assegnato un proxy a questo provider (ad es., `openai`)?
3. **Livello globale** — È configurato un proxy globale?
4. **Nessun proxy** — Connessione diretta al provider.

Viene usata la prima corrispondenza. Ciò significa che puoi impostare un proxy globale come fallback, ma sostituirlo per provider o connessioni specifici.

### Traffico instradato tramite proxy

| Tipo di traffico             | Tramite proxy? | Note                                           |
| ---------------------------- | -------------- | ---------------------------------------------- |
| Completamenti chat           | ✅             | Tutte le richieste `/v1/chat/completions`      |
| Embedding                    | ✅             | `/v1/embeddings`                               |
| Generazione di immagini      | ✅             | `/v1/images/generations`                       |
| Audio (TTS/STT)              | ✅             | `/v1/audio/*`                                  |
| Scambio di token OAuth       | ✅             | Risolve `unsupported_country_region_territory` |
| Test delle connessioni       | ✅             | Il pulsante "Test Connection" usa il proxy     |
| Aggiornamento dei token      | ✅             | Rinnovo OAuth in background                    |
| Sincronizzazione dei modelli | ✅             | Elenco e rilevamento dei modelli               |

---

## Registro dei proxy (CRUD)

Il registro dei proxy è una tabella SQLite (`proxy_registry`) che memorizza tutti i tuoi proxy. Ogni proxy dispone dei seguenti campi:

| Campo      | Tipo    | Descrizione                                      |
| ---------- | ------- | ------------------------------------------------ |
| `id`       | UUID    | Identificatore univoco                           |
| `name`     | String  | Etichetta leggibile                              |
| `type`     | String  | Protocollo: `http`, `https`, `socks5`            |
| `host`     | String  | Nome host o IP del proxy                         |
| `port`     | Integer | Numero di porta                                  |
| `username` | String  | Nome utente di autenticazione (cifrato a riposo) |
| `password` | String  | Password di autenticazione (cifrata a riposo)    |
| `region`   | String  | Etichetta della regione geografica               |
| `notes`    | String  | Note in formato libero                           |
| `status`   | String  | `active` o `inactive`                            |
| `source`   | String  | `manual` o `oneproxy`                            |

### Creazione di un proxy

**Tramite la dashboard:**

1. Vai a **Settings → Proxy**
2. Fai clic su **Add Proxy**
3. Inserisci il tipo, l'host, la porta e le credenziali di autenticazione facoltative
4. Salva

**Tramite API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Aggiornamento di un proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Nota:** Le credenziali vengono mantenute, a meno che non vengano inviate esplicitamente sostituzioni non vuote. L'invio di stringhe vuote per `username`/`password` manterrà i valori memorizzati.

### Eliminazione di un proxy

```bash
# Non riesce se il proxy è assegnato a un qualsiasi ambito
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Forza l'eliminazione (rimuove anche le assegnazioni)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Elenco dei proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Assegnazione dei proxy agli ambiti

```bash
# Assegna all'ambito globale
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Assegna a un provider specifico
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Assegna a una connessione/chiave specifica
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Risoluzione del proxy effettivo

Verifica quale proxy verrebbe utilizzato per una determinata connessione:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Restituisce il proxy risolto con il relativo livello (`account`, `provider` o `global`) e la relativa origine.

### Assegnazione in blocco

Assegna un proxy a più provider o connessioni contemporaneamente:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importazione/esportazione

I proxy sono inclusi nel sistema di **backup/ripristino**. Quando esporti la configurazione di OmniRoute:

1. Vai a **Dashboard → Settings → Backup**
2. Fai clic su **Export** — il registro dei proxy e le assegnazioni sono inclusi
3. Per eseguire il ripristino, fai clic su **Import** e carica il file di backup

Il registro dei proxy supporta anche l'**upsert per host+porta**: se importi un proxy già esistente (stessi host e porta), questo viene aggiornato anziché creare un duplicato.

### Migrazione legacy

Se hai configurato dei proxy in una versione precedente (prima del registro), OmniRoute li migra automaticamente:

```
Archivio key_value legacy → proxy_registry + proxy_assignments
```

Questa operazione viene eseguita una sola volta al primo avvio dopo l'aggiornamento. Usa `migrateLegacyProxyConfigToRegistry({ force: true })` per eseguirla nuovamente.

---

## 1proxyMercato proxy gratuito

> 🆕** Contributo di [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (Problema [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute si integra con il** [1 procura](https://1proxy-api.aitradepulse.com)** piattaforma comunitaria a cui fornire l'accesso** centinaia di proxy gratuiti e convalidati** da tutto il mondo. Questo è perfetto per gli utenti che non dispongono di una propria infrastruttura proxy.

### Come funziona

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Sincronizzazione** — OmniRoute recupera i proxy convalidati dal 1proxy API
2. **Negozio** I proxy — vengono salvati nella stessa tabella `proxy_registry` con `source = 'oneproxy'`
3. **Filtro** — Filtra per protocollo, paese, punteggio di qualità
4. **Ruotare** — Scegli il proxy migliore utilizzando strategie di qualità, casuali o sequenziali
5. **Degradazione automatica** — I proxy falliti ottengono una riduzione del loro punteggio di qualità; sotto la soglia → contrassegnato come inattivo

### Sincronizzazione dei proxy

**Tramite dashboard:**

1. Vai a** Impostazioni → 1proxy** scheda
2. Clic** "Sincronizza ora"**
3. Visualizza le statistiche: proxy totali, conteggio attivo, qualità media, suddivisione per paese

**Via API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Proxy di filtraggio

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Punteggi di qualità proxy

Ogni proxy 1proxy viene fornito con metadati:

| Campo           | Descrizione                                |
| --------------- | ------------------------------------------ |
| `qualityScore`  | Valutazione 0-100 dalla convalida 1proxy   |
| `latencyMs`     | Latenza di rete misurata                   |
| `anonymity`     | `transparent`, `anonymous` o `elite`       |
| `googleAccess`  | Se il proxy può accedere ai servizi Google |
| `countryCode`   | Codice paese ISO di due lettere            |
| `lastValidated` | Timestamp dell'ultima convalida            |

I punteggi di qualità vengono adeguati dinamicamente:

- **Richieste non riuscite** ridurre il punteggio di 10 punti
- **Il punteggio scende a ≤ 10** Il proxy → è contrassegnato `inactive`
- I delegati inattivi sono esclusi dalla rotazione

### Strategie di rotazione

```bash
# Rotate by quality (best proxy first) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequential (least recently validated first)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Interruttore automatico

1proxy sync è dotato di un interruttore automatico integrato:

- Dopo** 5 errori di sincronizzazione consecutivi** , ulteriori tentativi di sincronizzazione verranno bloccati
- Reimposta con: `resetOneproxyCircuitBreaker()` o riavvia il server
- Lo stato di sincronizzazione è disponibile su `GET /api/settings/oneproxy?action=status`

### Cancellazione di 1 proxy proxy

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-rilevamento e azione furtiva

OmniRoute non si limita a instradare il traffico attraverso un proxy — ma rende il traffico legittimo:

### TLS Spoofing delle impronte digitali

Utilizza `wreq-js` per generare impronte digitali TLS simili a browser, aggirando i sistemi di rilevamento dei bot che contrassegnano gli handshake TLS non browser.

### CLI Corrispondenza delle impronte digitali

IL**CLI Attiva/disattiva impronta digitale** (`Settings → Security`) riordina le intestazioni HTTP e i campi del corpo JSON in modo che corrispondano alla firma esatta dei binari CLI nativi (Claude Code, Codex, ecc.). Funziona** sopra** la procura:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

Ottieni entrambi**IP mascheramento** E** richiedere l'autenticità** contemporaneamente.

### Conservazione del proxy IP

I badge con codice colore nella dashboard mostrano quale livello proxy è attivo:

| Distintivo | Livello     | Senso                                              |
| ---------- | ----------- | -------------------------------------------------- |
| 🟢         | Globale     | Tutto il traffico passa attraverso questo proxy    |
| 🟡         | Fornitore   | Solo il traffico di questo provider viene proxy    |
| 🔵         | Connessione | Questo specifico key/account utilizza questo proxy |

Il badge mostra anche il proxy IP risolto per la verifica.

---

## Modalità del proxy upstream

Per i provider che utilizzano il modello CLIProxyAPI, OmniRoute supporta tre modalità di proxy upstream:

| Modalità      | Descrizione                                                         |
| ------------- | ------------------------------------------------------------------- |
| `native`      | OmniRoute gestisce direttamente l'instradamento proxy (predefinito) |
| `cliproxyapi` | Delega a un'istanza CLIProxyAPI esterna                             |
| `fallback`    | Prova prima la modalità nativa, quindi passa a CLIProxyAPI          |

Configurazione per provider:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Interfaccia della dashboard

### Impostazioni → Scheda Proxy

- Configurazione del **proxy globale** (impostato una sola volta per tutto il traffico)
- Sostituzioni del proxy **per provider**
- Assegnazioni del proxy **per connessione**
- **Test della connessione** tramite il proxy configurato
- **Badge con codifica a colori** che mostrano il livello di proxy attivo

### Impostazioni → Scheda 1proxy

- Pulsante **Sincronizza ora** per recuperare proxy gratuiti
- **Schede statistiche**: Totale, Attivi, Qualità media, Ultima sincronizzazione
- **Filtri**: Protocollo, Codice paese, Qualità minima
- **Tabella dei proxy** con host, protocollo, paese, punteggio di qualità, latenza, anonimato e accesso a Google
- Pannello **Stato sincronizzazione** con monitoraggio di operazioni riuscite/non riuscite e conteggio degli errori consecutivi
- **Cancella tutto** per rimuovere tutte le voci di 1proxy

---

## Riferimento API

### API delle impostazioni proxy

| Metodo   | Endpoint                                       | Descrizione                              |
| -------- | ---------------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Ottiene la configurazione proxy completa |
| `GET`    | `/api/settings/proxy?level=global`             | Ottiene il proxy globale                 |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Ottiene il proxy del provider            |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Risolve il proxy effettivo               |
| `PUT`    | `/api/settings/proxy`                          | Aggiorna la configurazione proxy         |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Rimuove il proxy al livello specificato  |

### API del registro proxy

| Metodo   | Endpoint                                          | Descrizione                       |
| -------- | ------------------------------------------------- | --------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Elenca tutti i proxy              |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Ottiene il proxy tramite ID       |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Ottiene le assegnazioni del proxy |
| `POST`   | `/api/v1/management/proxies`                      | Crea un proxy                     |
| `PATCH`  | `/api/v1/management/proxies`                      | Aggiorna un proxy                 |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Elimina un proxy                  |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Forza l'eliminazione              |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Esegue l'assegnazione in blocco   |
| `GET`    | `/api/v1/management/proxies/assignments`          | Elenca le assegnazioni            |
| `GET`    | `/api/v1/management/proxies/health`               | Statistiche sullo stato dei proxy |

### API dei tunnel

Per esporre la tua istanza OmniRoute alla rete Internet pubblica (Cloudflare/ngrok/Tailscale), invece di instradare il traffico in uscita attraverso un proxy, consulta [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). L'API REST dei tunnel si trova in `/api/tunnels/{cloudflared,ngrok,tailscale}/*` ed è indipendente dalla catena di proxy in uscita documentata sopra.

### API di 1proxy

| Metodo   | Endpoint                               | Descrizione                                  |
| -------- | -------------------------------------- | -------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Elenca i proxy di 1proxy                     |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Ottiene statistiche + stato sincronizzazione |
| `GET`    | `/api/settings/oneproxy?action=status` | Ottiene solo lo stato della sincronizzazione |
| `POST`   | `/api/settings/oneproxy`               | Avvia la sincronizzazione                    |
| `POST`   | `/api/settings/oneproxy/rotate`        | Passa al proxy successivo                    |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Ne elimina uno                               |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Cancella tutto                               |

### API del proxy upstream

| Metodo   | Endpoint                          | Descrizione                                  |
| -------- | --------------------------------- | -------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Ottiene la configurazione del proxy upstream |
| `PUT`    | `/api/upstream-proxy/:providerId` | Imposta la modalità del proxy upstream       |
| `DELETE` | `/api/upstream-proxy/:providerId` | Rimuove la configurazione del proxy upstream |

---

## Variabili d'ambiente

| Variabile             | Valore predefinito | Descrizione                                                                           |
| --------------------- | ------------------ | ------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`             | Abilita il supporto per il proxy SOCKS5 (valore predefinito `true` in `.env.example`) |

---

## Risoluzione dei problemi

### "SOCKS5 proxy is disabled"

Imposta `ENABLE_SOCKS5_PROXY=true` nel file `.env` e riavvia.

### Errori "socket hang up" tramite proxy

Questo comportamento è normale con i proxy economici che interrompono le connessioni inattive. OmniRoute gestisce già questa situazione:

- Disabilitando il keep-alive sulle connessioni proxy (`keepAliveTimeout: 1`)
- Disabilitando il pipelining (`pipelining: 0`)
- Memorizzando nella cache i dispatcher per evitare handshake ripetuti

Se il problema persiste, prova un proxy diverso oppure utilizza la funzionalità di rotazione di 1proxy.

### "unsupported_country_region_territory" durante OAuth

Assicurati che il proxy sia configurato **prima** di avviare il flusso OAuth. OmniRoute instrada lo scambio dei token OAuth attraverso il proxy configurato. Imposta prima un proxy globale o a livello di provider, quindi connettiti.

### Il proxy non viene utilizzato

Controlla l'ordine di risoluzione:

1. Verifica con `GET /api/settings/proxy?resolve=your-connection-id`
2. Controlla che lo `status` del proxy sia `active` (non `inactive`)
3. Assicurati che l'ambito di assegnazione del proxy corrisponda alla tua connessione

### Sincronizzazione di 1proxy non riuscita

Controlla lo stato della sincronizzazione:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Se `consecutiveFailures >= 5`, il circuit breaker è scattato. Riavvia il server per reimpostarlo oppure attendi il ripristino manuale.

---

## Schema del database

### Tabella `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' o 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (solo 1proxy)
  latency_ms INTEGER,                        -- millisecondi (solo 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- può accedere a Google? (1proxy)
  last_validated TEXT,                       -- timestamp ISO (1proxy)
  country_code TEXT,                         -- codice ISO di 2 lettere (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabella `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID del provider, ID della connessione o ID della combinazione
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Controllo dello stato dei proxy (v3.8.16+)

Il meccanismo di **errore rapido dei proxy** di OmniRoute (`src/lib/proxyHealth.ts`) rileva i proxy non funzionanti in meno di 2 secondi tramite un rapido controllo della connessione TCP, quindi **memorizza il risultato nella cache** per evitare sovraccarichi a ogni richiesta.

### Come funziona

```
Richiesta ──▶ ProxyHealthCache.get(url)
              │
              ├─ Risultato in cache e recente?  ──▶ restituisci lo stato memorizzato
              │
              └─ Non in cache / obsoleto?  ──▶ connessione TCP a host:port
                                                (timeout: FAST_FAIL_TIMEOUT_MS)
                                                ──▶ memorizza nella cache per HEALTH_CACHE_TTL_MS
                                                ──▶ restituisci il risultato
```

Senza questo meccanismo, un proxy non funzionante bloccherebbe ogni richiesta per l'intera durata di `PROXY_TIMEOUT_MS` (valore predefinito: 30 secondi) prima di restituire un errore.

### Variabili d'ambiente configurabili

| Variabile                    | Valore predefinito | Scopo                                                 |
| ---------------------------- | ------------------ | ----------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`             | Timeout della connessione TCP per ogni controllo      |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`            | Durata della memorizzazione nella cache del risultato |

**Valori consigliati:**

| Scenario                              | Timeout errore rapido | TTL cache | Motivazione                                                                    |
| ------------------------------------- | --------------------- | --------- | ------------------------------------------------------------------------------ |
| Gateway API ad alta velocità          | 1500ms                | 60000ms   | Errore rapido aggressivo, cache più lunga per ridurre i controlli              |
| Nodi distribuiti geograficamente      | 3000ms                | 15000ms   | Le reti più lente richiedono più tempo; cache più breve per un failover rapido |
| Sviluppo / test                       | 1000ms                | 10000ms   | Iterazione rapida sui proxy locali                                             |
| Modalità invisibile / antirilevamento | 2500ms                | 45000ms   | Evita controlli rapidi che potrebbero attivare limiti di frequenza             |

### Ispezione dello stato dei proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Forza un nuovo controllo di un proxy specifico
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Il flag `stale` è `true` quando la voce della cache ha superato `HEALTH_CACHE_TTL_MS` e la richiesta successiva attiverà un nuovo controllo.

### Valori predefiniti per tipo di proxy

Il controllo dello stato utilizza valori predefiniti appropriati in base allo schema dell'URL:

| Schema                     | Porta predefinita |
| -------------------------- | ----------------- |
| `http://`                  | 8080              |
| `https://`                 | 443               |
| `socks5://` / `socks5h://` | 1080              |

Le porte personalizzate nell'URL (`http://host:9999`) hanno sempre la precedenza sul valore predefinito dello schema.

---

## Analisi e osservabilità dei proxy

OmniRoute monitora l'utilizzo di ciascun proxy per aiutare gli operatori a diagnosticare schemi di instradamento, picchi di latenza ed errori ricorrenti.

### Dati monitorati

Per ogni richiesta effettuata tramite un proxy configurato, OmniRoute registra:

| Metrica      | Descrizione                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `proxy_url`  | URL completo del proxy (con le credenziali di autenticazione mascherate) |
| `provider`   | ID del provider upstream (openai, anthropic, ecc.)                       |
| `latency_ms` | Tempo totale di andata e ritorno, incluso l'handshake del proxy          |
| `connect_ms` | Solo il tempo di connessione TCP                                         |
| `status`     | Codice di stato HTTP restituito dall'upstream                            |
| `error`      | Classe dell'errore se la richiesta non è riuscita                        |
| `timestamp`  | ISO 8601 UTC                                                             |

### Accesso ai dati

```bash
# Eventi proxy recenti
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

L'endpoint effettivo è `/api/usage/proxy-logs` (vedere `src/app/api/usage/proxy-logs/route.ts`). Questo endpoint supporta:

- `GET /api/usage/proxy-logs` — recupera i log dei proxy
- `DELETE /api/usage/proxy-logs` — elimina tutti i log dei proxy

Se necessario, le statistiche aggregate possono essere interrogate direttamente dalla tabella `proxy_logs` tramite SQL. L'interfaccia della dashboard può offrire viste aggregate.

### Schemi comuni

**Rilevare un proxy instabile** (alterna tra richieste riuscite e non riuscite):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Individuare i proxy lenti** (latenza p95 > 2 s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Albero decisionale della strategia di rotazione

Quando più proxy sono assegnati a un ambito, OmniRoute utilizza una **strategia di rotazione** per scegliere quale usare per ogni richiesta. La strategia viene configurata a livello di ambito (globale, per provider, per account, per combinazione).

### Strategie disponibili

| Strategia               | Quando utilizzarla                        | Compromesso                                                                              |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| `quality` (predefinita) | Produzione con proxy di qualità variabile | Privilegia i proxy con valutazioni elevate; può penalizzare quelli con valutazioni basse |
| `random`                | Distribuzione del carico, privacy         | Distribuzione uniforme; ignora gli indicatori di qualità                                 |
| `sequential`            | Debug, test deterministici                | Scorre i proxy in ordine; comportamento facile da comprendere                            |

### Albero decisionale

```
                    Disponi di punteggi di qualità per i tuoi proxy?
                    │
        ┌───────────┴───────────┐
        │                       │
        SÌ                      NO
        │                       │
   Tutti i proxy hanno          │
   una qualità più o meno       │
   equivalente?                 │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
   SÌ        NO               Usa
   │         │              `random`
   │         │              (una distribuzione
   │         │              uniforme genera
   │         │              dati sulla qualità
   │         │              nel tempo)
   │         │
   │    Usa `quality`
   │    (ideale per
   │    qualità variabile)
   │
Usa `random`
(distribuisce il carico
uniformemente)
```

## Esclusione automatica degli errori per i tuoi proxy

Il pool di marketplace 1proxy degrada già automaticamente i proxy non riusciti (vedi [Punteggi di qualità proxy](#proxy-quality-scores) ). Per i proxy** Voi** aggiunto al registro, lo scheduler dell'integrità in background (`src/lib/proxyHealth/scheduler.ts`) fornisce lo stesso comportamento "escludi automaticamente un membro morto dalla catena", senza eliminare nulla:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Come si inserisce in una catena multi-proxy:

1. Lo scheduler analizza ogni proxy registrato ogni `PROXY_HEALTH_INTERVAL_MS` (default 10 min; minimo 1 min).
2. Dopo `PROXY_AUTO_REMOVE_AFTER` consecutiva** conclusivo** in caso di errori (un vero errore di connessione — un timeout o il 5xx del target della sonda non conta mai, vedere [Controllo dello stato del proxy](#proxy-health-checking-v3816) ), `status` del proxy è impostato su `dead`.
3. `dead` è uno degli stati esclusi dal filtro dello stato vivo utilizzato dalla risoluzione pool/rotation, quindi la rotazione di un ambito (round robin / casuale / appiccicoso / latenza / sessione — vedere [Albero decisionale della strategia di rotazione](#rotation-strategy-decision-tree) ) interrompe immediatamente la consegna del proxy alle nuove richieste. Nessun altro proxy nel pool è interessato e l'intero pool non ricorre mai silenziosamente a una connessione diretta. — vedere la protezione a chiusura di errore [del sistema proxy a 4 livelli](#4-level-proxy-system).
4. Lo scheduler continua a sondare i proxy `dead` con lo stesso intervallo. La successiva sonda riuscita riporta `status` in `active` e rientra nella rotazione — senza che sia necessaria una nuova aggiunta manuale.

Questo è deliberatamente** opt-in e non distruttivo** : per impostazione predefinita lo scheduler conta e registra solo gli errori (vedere la policy C in `decision.ts`) e `PROXY_AUTO_DISABLE` non elimina mai una riga — a cui serve il flag `PROXY_AUTO_REMOVE` separato e più aggressivo. Se entrambi sono impostati su `true`, `PROXY_AUTO_REMOVE` vince (un proxy che sta per essere eliminato non ha alcuna utilità per una disabilitazione temporanea nel mezzo). Consulta il riferimento [alla configurazione dell'ambiente](../reference/ENVIRONMENT.md) per l'elenco completo delle variabili.

---

> 📖** Documentazione correlata:**
>
> - [Guida per l'utente](../guides/USER_GUIDE.md) — Impostazione e configurazione generale - [API Riferimento](../reference/API_REFERENCE.md) — Documentazione completa API - [Configurazione ambiente](../reference/ENVIRONMENT.md) — Tutte le variabili di ambiente
