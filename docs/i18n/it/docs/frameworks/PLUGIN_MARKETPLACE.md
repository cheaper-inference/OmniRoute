# Plugin Marketplace (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Fonte autorevole:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` e
> `src/app/(dashboard)/dashboard/plugins/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute include un sistema di plugin in stile WordPress. I plugin sono
directory autonome, ciascuna con un manifest `plugin.json` e un file di ingresso,
che si agganciano alla pipeline delle richieste (`onRequest` / `onResponse` /
`onError`) e agli eventi del ciclo di vita (`onInstall` / `onActivate` /
`onDeactivate` / `onUninstall`).

Il **Marketplace dei plugin** costituisce il livello di rilevamento sopra tale
sistema. Espone un catalogo consultabile di plugin installabili. Per impostazione
predefinita, il catalogo è un piccolo registro iniziale integrato; un operatore
può configurarlo affinché utilizzi l'URL di un registro remoto personalizzato,
nel qual caso il recupero è protetto da una misura anti-SSRF con risoluzione DNS
(vedere [Sicurezza](#security)).

Ogni route dei plugin è accessibile **solo tramite loopback** (livello 1 —
`LOCAL_ONLY`): i plugin caricano ed eseguono codice in processi figlio, pertanto
le route non sono raggiungibili da origini non loopback, indipendentemente
dall'autenticazione. Vedere
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Come si adatta Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Livello del registro** — `src/lib/plugins/marketplace.ts`: elenca/cerca il catalogo, tornando al registro dei semi in caso di errore.
- **Livello del ciclo di vita** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): installazione, aggiornamento, attivazione, disattivazione, disinstallazione, scansione, caricamento all'avvio.
- **Strato manifesto** — `src/lib/plugins/manifest.ts`: schema Zod + predefinito per `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: rileva i plugin sul disco nella directory dei plugin.
- **Caricatore** — `src/lib/plugins/loader.ts`: genera ciascun plugin in un processo figlio Node.js separato e i broker agganciano le chiamate su IPC. Il figlio non è un sandbox (vedi "Isolamento dell'esecuzione del plugin" di seguito).

## Catalogo del Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) restituisce un
elenco di oggetti `MarketplaceEntry`:

| Campo         | Tipo     | Note                                               |
| ------------- | -------- | -------------------------------------------------- |
| `name`        | string   | Nome del plugin in formato kebab-case              |
| `version`     | string   | semver                                             |
| `description` | string   | Breve riepilogo                                    |
| `author`      | string   | Autore / organizzazione                            |
| `license`     | string   | Identificativo della licenza in stile SPDX         |
| `downloadUrl` | string   | URL di download della fonte (può essere vuoto)     |
| `repository`  | string?  | URL facoltativo del repository                     |
| `tags`        | string[] | Tag per ricerca/filtro                             |
| `downloads`   | number   | Numero di download                                 |
| `rating`      | number   | 0–5                                                |
| `verified`    | boolean  | Indica se la voce è contrassegnata come verificata |
| `lastUpdated` | string   | Stringa di data in formato simile a ISO            |

Quando non è configurato alcun URL di registro personalizzato, il catalogo
corrisponde al `SEED_REGISTRY` integrato (attualmente `request-logger`,
`rate-limiter`, `cost-tracker` e `theme-manager`). Il registro iniziale è sempre
disponibile: se un registro remoto configurato non è raggiungibile, restituisce
uno stato diverso da `200` oppure restituisce un corpo non riconosciuto,
`listMarketplacePlugins()` registra un avviso e utilizza come fallback l'elenco
iniziale.

> Nota: il **catalogo** del Marketplace (consultazione/ricerca) è collegato end
> to end, ma l'**installazione** con un solo clic dal catalogo non è ancora
> implementata: il pulsante "Installa" della dashboard relativo a una voce del
> Marketplace mostra attualmente un avviso "disponibile prossimamente".
> Attualmente, l'installazione avviene tramite il flusso di installazione da
> percorso locale (`POST /api/plugins`) e il rilevamento su disco
> (`POST /api/plugins/scan`).

## REST API

Tutti gli endpoint richiedono l'autenticazione di gestione (`requireManagementAuth`)** E** sono solo loopback — `/api/plugins` e `/api/plugins/` sono elencati in `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Punto finale                     | Metodo | Descrizione                                                              |
| -------------------------------- | ------ | ------------------------------------------------------------------------ |
| `/api/plugins`                   | GET    | Elenca i plugin installati (filtro `?status=` opzionale)                 |
| `/api/plugins`                   | POST   | Installa un plugin dalla directory dei sorgenti dei plugin               |
| `/api/plugins/scan`              | POST   | Scansiona la directory dei plugin e registra nuovi plugin                |
| `/api/plugins/marketplace`       | GET    | Elenca le voci del catalogo del marketplace                              |
| `/api/plugins/[name]`            | GET    | Ottieni i dettagli del plugin installato                                 |
| `/api/plugins/[name]`            | DELETE | Disinstallare un plug-in                                                 |
| `/api/plugins/[name]/activate`   | POST   | Attiva (carica gli hook del registro + )                                 |
| `/api/plugins/[name]/deactivate` | POST   | Disattiva (fire `onDeactivate`, annulla registrazione hook)              |
| `/api/plugins/[name]/config`     | GET    | Ottieni lo schema di configurazione + della configurazione del plugin    |
| `/api/plugins/[name]/config`     | PUT    | Aggiorna la configurazione del plugin (convalidato rispetto allo schema) |

Il filtro `GET /api/plugins` `status` accetta uno tra `installed` / `active` / `inactive` / `error`. Un valore non valido restituisce `400`.

### Elenca i plugin installati

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installa da un percorso locale

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

La `path` deve essere un** assoluto** percorso di una directory** all'interno della directory dei sorgenti del plugin** : `plugin-sources` accanto alla radice del plugin, quindi `~/.omniroute/plugin-sources/` per impostazione predefinita o `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` quando quella variabile è impostata (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Copia o clona prima il plugin lì. L'installazione viene rifiutata con `400` quando il percorso contiene `..` o un byte null, si trova all'esterno di quella directory, si risolve all'esterno di essa tramite un collegamento simbolico, contiene un collegamento simbolico la cui destinazione è all'esterno di essa o quando la directory non esiste. La directory di origine deve contenere uno `plugin.json` valido (o essere genitore di uno). In caso di successo, la risposta è `201` con la riga del plugin installato.

A differenza degli altri percorsi di plugin, questo richiede le credenziali di gestione (una sessione del dashboard o una chiave API con ambito di gestione) anche quando l'accesso è disabilitato (`requireLogin=false`): l'installazione del codice non è mai un'azione anonima.

### Sfoglia il mercato

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aggiorna la configurazione del plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` convalida ogni valore fornito rispetto allo `configSchema` del plugin (dichiarato nel manifest): i campi `number` rispettano `min`/`max`, i campi `select` devono corrispondere allo `enum` dichiarato. Sono consentite le chiavi non presenti nello schema.

## Configurazione

### Directory dei plugin

I plugin si trovano nella directory dei dati di OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (o qualsiasi file indicato da manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) determina tale directory in
tre passaggi:

1. **`OMNIROUTE_PLUGINS_DIR`**, quando impostata — viene utilizzata alla lettera, indipendentemente dal valore di `HOME`. Questa è
   l'opzione esplicita per Docker/K8s, dove l'albero dei plugin viene montato tramite bind in un percorso
   che in genere non ha nulla a che fare con la directory home del container (#11827).
2. `<home>/.omniroute/plugins`, dove `<home>` deriva dalle variabili d'ambiente `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, quando il processo non esporta alcuna directory home.

La directory determinata viene registrata una volta all'avvio come `scanner.dir_resolved`, indicando
l'input selezionato (`OMNIROUTE_PLUGINS_DIR`, `home` o `no-home-fallback`): in questo modo, un'immagine
che finisce silenziosamente al passaggio 3 lo segnala, anziché riportare soltanto un elenco di plugin vuoto.
`POST /api/plugins/scan` rileva qualsiasi sottodirectory che contenga un
`plugin.json` valido e la registra; la stessa directory è la radice in cui
`pluginManager.install()` copia i plugin, quindi un override sposta insieme rilevamento e
installazione.

> **`OMNIROUTE_PLUGINS_DIR` non è `OMNIROUTE_PLUGIN_PATH`.** Quest'ultima viene letta solo dal
> loader dei plugin di comando della CLI (`bin/cli/plugins.mjs`) per individuare i pacchetti npm `omniroute-cmd-*`
> che aggiungono sottocomandi a `omniroute`: non ha alcun effetto sullo scanner runtime
> descritto qui. Per questo aspetto, consultare [PLUGINS.md](./PLUGINS.md).

### URL personalizzato del registro del marketplace

La sorgente del catalogo del marketplace viene letta dall'impostazione `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` legge `settings.pluginMarketplaceUrl`). Quando
è impostata su un URL `http(s)`, `listMarketplacePlugins()` recupera tale URL e accetta
sia un array JSON di voci al livello principale, sia un oggetto con un array `plugins`;
le voci prive di un `name` di tipo stringa vengono escluse. Quando l'impostazione non è definita (oppure quando il recupero
non supera la protezione SSRF / restituisce una risposta non valida), viene utilizzato il registro seed
integrato.

La scheda "Marketplace" della dashboard espone un campo per questo URL (letto tramite
`GET /api/settings`).

> Nota sull'implementazione: l'azione "Save" della dashboard invia
> `pluginMarketplaceUrl` a `PATCH /api/settings`. Al momento della stesura, questa
> chiave non è dichiarata in `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), quindi verifica la persistenza nella tua
> release prima di farvi affidamento: il percorso di **lettura** (`getSettings()` →
> `listMarketplacePlugins()`) rispetta la chiave una volta che questa è presente nell'archivio delle
> impostazioni.

## Sicurezza

### Solo loopback del livello di percorso —

I plugin eseguono il codice nei processi figli generati, quindi l'intera superficie `/api/plugins` è classificata `LOCAL_ONLY` (Livello 1). L'applicazione del loopback viene eseguita incondizionatamente** Prima** qualsiasi controllo di autenticazione, quindi un token di gestione trapelato che raggiunge la scatola attraverso un tunnel non può ancora installare, attivare o disinstallare un plug-in. Vedi [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) e Regole rigide #15 / #17.

### Guardia del registro del mercato SSRF

Un registro personalizzato URL è una configurazione influenzabile dagli aggressori, quindi prima di recuperarlo `listMarketplacePlugins()` lo esegue attraverso due livelli:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rifiuta tutto ciò che non è `http:` / `https:`.
   - Rifiuta gli host private/loopback/link-local/ULA letterali (IPv4** E** IPv6, incluso IPv4-mapped) tramite il canonico `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Risolve** Entrambi** `A` e `AAAA` registrano e rifiutano se** Qualunque** l'indirizzo risolto è privato — che chiude il bypass dell'IP privato → del nome host pubblico.
   - **Fallisce chiuso** : un errore di risoluzione DNS rifiuta URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): riapplica la guardia URL riservata al pubblico al momento del recupero e** blocca i reindirizzamenti** (nessun pivot → privato `30x` pubblico).

Uno URL che fallisce uno dei due livelli non interrompe la richiesta — il mercato torna silenziosamente al registro seed integrato e registra un avviso.

> Questa guardia è stata rafforzata in PR #3774 appositamente per risolvere A + AAAA e utilizzare il canonico `isPrivateHost` invece di un controllo IPv4-only.

### Isolamento dell'esecuzione del plugin

> **I plugin non sono sandbox.** Il figlio è un normale processo Node.js in esecuzione come utente OmniRoute, senza contesto VM e senza flag di autorizzazione Node.js, quindi il codice del plugin può leggere e scrivere qualsiasi file che l'utente può, eseguire programmi e raggiungere la rete. `requires.permissions` decide solo quali variabili di ambiente riceve il bambino; le altre autorizzazioni non vengono applicate. Installa solo i plugin di cui ti fidi. Il limite del processo riportato di seguito contiene arresti anomali e blocchi; non è un confine di sicurezza.

- **Isolamento del processo** — `loadPlugin()` (`src/lib/plugins/loader.ts`) genera ciascun plugin in un processo figlio Node.js separato e comunica tramite IPC. Le chiamate hook hanno un timeout con l'escalation `SIGTERM` → `SIGKILL`.
- **Lista consentita buste** — il bambino riceve solo un insieme di variabili di ambiente consentite; l'insieme più ampio viene concesso solo quando il manifest richiede l'autorizzazione `env`.
- **Installare il contenimento della sorgente** — `POST /api/plugins` legge solo dalla directory dei sorgenti del plugin (vedi "Installa da un percorso locale"): il percorso è canonizzato con `realpath`, deve rimanere rigorosamente all'interno di quella directory e un albero dei sorgenti che trasporta un collegamento simbolico che sfugge ad esso viene rifiutato prima che qualsiasi cosa venga copiata.
- **Contenimento del percorso** — install/upgrade/uninstall asserisce che la directory del plugin e `manifest.main` si risolvono** entro** la root del plugin gestito prima di qualsiasi copia o eliminazione ricorsiva (protegge da percorsi DB manomessi e attraversamento `../` in `manifest.main`). L'attivazione risolve i collegamenti simbolici tramite `realpath` e rifiuta di caricare un punto di ingresso che sfugge alla directory del plugin.
- **Perno di integrità opzionale** — un manifest può dichiarare un campo `integrity` ( formato `sha256-<base64>`, SRI ). Se presente, il caricatore verifica l'hash del file di ingresso al momento del caricamento e rifiuta di attivarsi in caso di mancata corrispondenza. È un rilevamento antimanomissione opzionale,** non** un limite di sicurezza: non limita ciò che può fare un plugin caricato.
- **Nessuna credenziale client negli hook** — il contesto passato a `onRequest`, `onResponse` e `onError` ha le intestazioni `authorization`, `x-api-key`, `proxy-authorization` e `cookie` rimosse e il record della chiave API non contiene alcun valore chiave (`redactPluginContext()` in `src/lib/plugins/hooks.ts`).

## Manifesto (`plugin.json`)

Convalidato da `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Campo              | Tipo          | Note                                                                     |
| ------------------ | ------------- | ------------------------------------------------------------------------ |
| `name`             | corda         | Necessario; custodia-kebab (`^[a-z0-9-]+$`), 1–100 caratteri             |
| `version`          | corda         | Necessario; semver (`MAJOR.MINOR.PATCH`)                                 |
| `description`      | corda?        | ≤ 500 caratteri                                                          |
| `author`           | corda?        | ≤ 200 caratteri                                                          |
| `license`          | corda?        | Il valore predefinito è `MIT`                                            |
| `main`             | corda?        | File di ingresso; il valore predefinito è `index.js`                     |
| `source`           | enumerazione? | `local` \| `marketplace` (il valore predefinito è `local`)               |
| `tags`             | corda[]?      | Cerca tag                                                                |
| `requires`         | oggetto?      | `{ omniroute?, permissions[] }`                                          |
| `hooks`            | oggetto?      | Booleani che dichiarano quali hook implementa il plugin                  |
| `skills`           | oggetto[]?    | Definizioni di abilità facoltative                                       |
| `enabledByDefault` | booleano?     | Attivazione automatica all'installazione                                 |
| `configSchema`     | oggetto?      | Mappa dei campi di configurazione (`string`/`number`/`boolean`/`select`) |
| `integrity`        | corda?        | Pin del file di ingresso `sha256-<base64>` opzionale                     |

Le autorizzazioni vengono tratte dall'enumerazione `network` / `file-read` / `file-write` / `env` / `exec`. Solo `env` ha un effetto runtime (una lista consentita di variabili d'ambiente leggermente più grande per il bambino); gli altri sono dichiarazioni e non vengono applicati.

## Flusso del ciclo di vita

```
install (POST /api/plugins, percorso)
  → analizza/valida il manifest → copia nell'area di staging → verifica che main sia all'interno della directory
  → rinomina atomicamente in ~/.omniroute/plugins/<name> → inserisce la riga nel DB
  → esegue onInstall → se enabledByDefault: attiva

activate (POST /api/plugins/{name}/activate)
  → verifica del contenimento tramite realpath → loadPlugin() (avvia un processo figlio)
  → registra gli hook dichiarati → status = "active" → esegue onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → esegue onDeactivate (PRIMA di annullare la registrazione) → annulla la registrazione degli hook
  → termina il processo figlio → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → disattiva se attivo → esegue onUninstall
  → eliminazione ricorsiva, con verifica del contenimento, della directory del plugin → elimina la riga dal DB
```

La riesecuzione di `install` su una directory la cui versione del manifest è **strettamente
più recente** rispetto alla versione installata esegue automaticamente l'aggiornamento (reinstallazione pulita; la configurazione viene ripristinata
ai valori predefiniti). Una versione uguale o precedente viene rifiutata.

## Database

Tabella `plugins` (migrazione `076_create_plugins.sql`):

| Colonna         | Tipo    | Note                                                               |
| --------------- | ------- | ------------------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                               |
| `name`          | TEXT    | Univoco                                                            |
| `version`       | TEXT    | semver; valore predefinito `1.0.0`                                 |
| `description`   | TEXT    | Facoltativo                                                        |
| `author`        | TEXT    | Facoltativo                                                        |
| `license`       | TEXT    | Valore predefinito `MIT`                                           |
| `main`          | TEXT    | File di ingresso; valore predefinito `index.js`                    |
| `source`        | TEXT    | Valore predefinito `local`                                         |
| `tags`          | TEXT    | Array JSON; valore predefinito `[]`                                |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                   |
| `enabled`       | INT     | 0/1; valore predefinito 0                                          |
| `manifest`      | TEXT    | JSON completo del manifest                                         |
| `config`        | TEXT    | JSON; valore predefinito `{}`                                      |
| `config_schema` | TEXT    | JSON; valore predefinito `{}`                                      |
| `hooks`         | TEXT    | Array JSON dei nomi degli hook dichiarati; valore predefinito `[]` |
| `permissions`   | TEXT    | Array JSON; valore predefinito `[]`                                |
| `plugin_dir`    | TEXT    | Directory di installazione assoluta                                |
| `error_message` | TEXT    | Impostato quando `status = "error"`                                |
| `installed_at`  | TEXT    | `datetime('now')`                                                  |
| `updated_at`    | TEXT    | `datetime('now')`                                                  |
| `activated_at`  | TEXT    | Impostato all'attivazione                                          |

Le metriche e i dati analitici dei plugin vengono registrati in tabelle aggiuntive
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Pannello di controllo

La pagina del dashboard su `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) fornisce due schede:

- **Installato** — elenca i plugin installati con i relativi hook dichiarati, un interruttore activate/deactivate, un pulsante di disinstallazione e un'azione "Cerca plugin" (`POST /api/plugins/scan`).
- **Mercato** — mostra il catalogo da `GET /api/plugins/marketplace` con un campo per impostare il registro personalizzato URL.

La pagina mostra sempre un avviso che i plugin vengono eseguiti con tutti i privilegi del processo OmniRoute.

Una pagina di configurazione per plug-in si trova in `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Vedi anche

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  perché `/api/plugins` è accessibile solo da loopback (Livello 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — il framework correlato per le skill
  (`src/lib/skills/`); i plugin possono dichiarare skill nel proprio manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrazioni in uscita
  basate su eventi
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  il pattern `buildErrorBody()` utilizzato da ogni route dei plugin per le risposte di errore
