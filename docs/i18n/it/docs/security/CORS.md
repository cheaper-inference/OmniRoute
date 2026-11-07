# CORS Configuration & Security (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controlla quali **origini del browser** possono leggere le risposte cross-origin
tramite un'unica allowlist centralizzata. Il modello è **fail-closed per impostazione predefinita**:
nessuna origine è consentita finché non viene esplicitamente autorizzata. Questa pagina documenta come viene
risolta l'allowlist, cosa espone effettivamente `CORS_ALLOW_ALL=true` (e, soprattutto, cosa
**non** espone), come configurare in sicurezza gli ambienti di sviluppo e produzione e l'avviso
di runtime mostrato dalla dashboard quando è attivo un wildcard.

**Fonte autorevole:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). L'allowlist viene applicata una sola volta, nel
middleware (`src/server/authz/pipeline.ts`): i gestori delle singole route non impostano
direttamente `Access-Control-Allow-Origin`.

## Come viene risolta un'origine

Per ogni richiesta, il middleware calcola il valore di `Access-Control-Allow-Origin`
nel seguente ordine:

1. **`CORS_ALLOW_ALL=true`** (oppure il precedente `CORS_ORIGIN=*`) → restituisce l'`Origin`
   del chiamante (oppure `*` quando l'header `Origin` è assente), con `Vary: Origin`
   per garantire il corretto funzionamento delle cache. Lo stesso punto di controllo `applyCorsHeaders()`
   aggiunge inoltre `Vary: Accept-Encoding` a ogni risposta 2xx con corpo sulla superficie
   `/v1*`/`/v1beta*` autenticata tramite token (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737),
   affinché le cache a valle/condivise possano distinguere correttamente tra le varianti
   compresse e non compresse.
2. In caso contrario, l'`Origin` della richiesta viene normalizzato (convertito in minuscolo e privato
   della barra finale) e confrontato con l'**allowlist unificata**:
   - variabile d'ambiente **`CORS_ALLOWED_ORIGINS`** — elenco separato da virgole, e
   - impostazione di runtime **`corsOrigins`** (Dashboard → Security → _Origini CORS
     consentite_), iniettata tramite `setRuntimeAllowedOrigins()` da
     `src/lib/config/runtimeSettings.ts`.
3. Nessuna corrispondenza → **non viene emesso alcun header `Access-Control-Allow-Origin`**. Il browser
   blocca la lettura cross-origin. Questo è il comportamento fail-closed previsto.

| Variabile d'ambiente   | Significato                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV delle origini esatte da consentire (scelta consigliata).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → restituisce qualsiasi origine (wildcard). Solo per lo sviluppo.                       |
| `CORS_ORIGIN`          | Precedente. `*` si comporta come `CORS_ALLOW_ALL`; un singolo valore viene aggiunto all'allowlist. |

## Modello delle minacce — cosa espone realmente `CORS_ALLOW_ALL=true`

L'avvertenza generica di OWASP ("CORS wildcard = qualsiasi sito può chiamare la tua API") merita
di essere presa sul serio, ma l'esposizione di OmniRoute è **più limitata rispetto al caso generico**,
per via di un fatto concreto relativo all'implementazione:

> **La funzione centrale `applyCorsHeaders()` non emette mai
> `Access-Control-Allow-Credentials`.** Un browser non renderà disponibile una risposta cross-origin
> _con credenziali_ (contenente cookie), a meno che il server non invii
> `Access-Control-Allow-Credentials: true`. Il percorso CORS condiviso di OmniRoute non
> lo fa mai.

Ecco cosa comporta per ogni superficie, anche con `CORS_ALLOW_ALL=true`:

| Superficie                          | Meccanismo di autenticazione | Effetto del CORS wildcard                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dashboard / MANAGEMENT `/api/*`     | Sessione tramite cookie      | L'origine viene restituita, ma **senza `Allow-Credentials`** il browser **blocca** la lettura con credenziali. Un sito cross-origin malevolo **non può leggere** le risposte autenticate della dashboard e il cookie di sessione non viene esposto.                                                                                                                                                                      |
| API client `/v1/*`, `/v1beta/*`     | Header bearer / `x-api-key`  | Già permissiva **per progettazione** (`relaxForTokenAuth`): i browser non allegano mai automaticamente `Authorization`/`x-api-key`, quindi la pagina di un attaccante non può fornire la tua chiave. La restituzione dell'origine si applica solo quando la chiave presentata è stata convalidata; le risposte anonime (`REQUIRE_API_KEY=false`) mantengono l'allowlist. `CORS_ALLOW_ALL` non amplia questa esposizione. |
| Lettura pubblica (`/api/health`, …) | Nessuno                      | Dati non sensibili; il wildcard è innocuo.                                                                                                                                                                                                                                                                                                                                                                               |

Pertanto, l'esposizione **residua** di `CORS_ALLOW_ALL=true` è limitata a: (a)
**letture** cross-origin senza credenziali di dati già privi di autenticazione e (b)
consentire il superamento del **preflight** CORS sulle route di gestione, che richiedono comunque
un'autenticazione che una pagina cross-origin non può fornire. **Non** costituisce un vettore per
il dirottamento della sessione o il furto di credenziali nel percorso CORS condiviso.

### Un'unica vera eccezione — `/api/v1/agents/`

Le route Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) impostano
i **propri** header CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ed emettono effettivamente
`Access-Control-Allow-Origin: <origin>|*` insieme a
`Access-Control-Allow-Credentials: true`. Questa è l'unica superficie in cui
la restituzione dell'origine e le credenziali coesistono ed è **indipendente da
`CORS_ALLOW_ALL`**. Queste route sono autenticate per la gestione
(`requireManagementAuth`); gli operatori che espongono la dashboard all'esterno dell'host devono
essere consapevoli che questo è l'unico punto in cui gli header della risposta consentono una lettura
cross-origin con credenziali. La relativa restrizione a un'allowlist esplicita viene monitorata
separatamente da queste indicazioni CORS.

## Checklist per la produzione

- **Non impostare mai `CORS_ALLOW_ALL=true` in produzione.** Lascialo non impostato.
- Imposta un elenco **esplicito** delle origini, tramite la variabile d'ambiente oppure il campo nella scheda Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Se OmniRoute viene eseguito dietro un reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **non** è l'unico controllo: la protezione delle route
  loopback continua a proteggere le route in grado di avviare processi (vedi
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Non falsificare
  `X-Forwarded-For: 127.0.0.1` per "risolvere" un errore 403: ciò riapre la classe
  di vulnerabilità RCE bloccata dalla protezione delle route.
- Verifica lo stato a runtime: la dashboard mostra un **banner ambra persistente**
  in Dashboard → Security → Authorization Inventory ogni volta che
  `CORS_ALLOW_ALL=true` è attivo, mentre `/api/settings/authz-inventory` restituisce
  un contenitore `cors: { allowAll, allowedOrigins }` che gli strumenti di
  monitoraggio possono interrogare periodicamente.

## Praticità in fase di sviluppo — consentire origini locali specifiche

Anche durante lo sviluppo, raramente è necessario usare il carattere jolly. Consenti
solo i server di sviluppo che utilizzi:

```bash
# Server di sviluppo Vite (5173) + Next.js (3000) che chiamano un'istanza OmniRoute locale
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Le origini vengono confrontate senza distinzione tra maiuscole e minuscole,
ignorando la barra finale; pertanto `http://localhost:3000` e
`http://localhost:3000/` sono equivalenti. Lo stesso CSV può essere impostato a
runtime in **Dashboard → Security → CORS Allowed Origins** senza riavviare.

## Chiavi API e sessioni basate su cookie

- **Bearer / `x-api-key` (la superficie di inferenza `/v1/*`):** i browser non
  allegano mai automaticamente queste credenziali. CORS non rappresenta una
  barriera significativa in questo caso: la barriera è la chiave API. Per questo
  motivo, tale superficie è intenzionalmente permissiva, così i client browser ed
  Electron possono leggere le risposte a cui hanno già diritto.
  La restituzione permissiva dell'origine segue la chiave convalidata, non la semplice
  presenza dell'header: quando `REQUIRE_API_KEY=false` serve una richiesta in forma
  anonima, la sua risposta di successo mantiene l'allowlist fail-closed. I rifiuti di
  autenticazione (401) restano leggibili, così i client possono segnalare una chiave
  revocata o digitata male (#5242): il 401 emesso dalla pipeline stessa mantiene la
  restituzione dell'origine, e una route che rifiuta direttamente la chiave dopo che la
  pipeline l'ha servita come anonima (`/v1/models` e `/v1beta/models` con
  l'autenticazione di gestione configurata, le route con ambito proprietario
  `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` e le route dei candidati
  auto-combo) aggiunge la restituzione dell'origine a quel 401 tramite
  `credentialRejectionHeaders()`. La restituzione dipende dal fatto che la richiesta
  contenga un header di credenziali (`Authorization`, `x-api-key`, `x-goog-api-key` o il
  cookie `auth_token`), non da quale di essi la route abbia verificato, e non è mai
  accompagnata da `Access-Control-Allow-Credentials`; il corpo è un involucro di errore
  fisso. Le route di gestione sotto `/api/v1/` protette da `requireManagementAuth()`
  (`/api/v1/management/*`, `/api/v1/registered-keys`) non aggiungono la restituzione
  dell'origine: con `REQUIRE_API_KEY=false` i loro 401/403 non sono leggibili
  cross-origin.
- **Sessione basata su cookie (la dashboard):** è protetta dall'impostazione
  predefinita fail-closed **e** dall'assenza di `Access-Control-Allow-Credentials`
  nel percorso condiviso. Non includere le origini di gestione/dashboard in alcuna
  configurazione permissiva: devono rimanere rigorosamente fail-closed.

## Handshake WebSocket (`/v1/responses`, `/v1/ws`)

I browser non applicano CORS ai WebSocket, quindi i trasporti WebSocket che restituiscono
output di inferenza verificano autonomamente l'`Origin` dell'handshake
(`src/server/origin/wsOrigin.ts`): il WebSocket Responses (`/v1/responses`) e, quando
OmniRoute viene eseguito tramite `npm start` / `npm run dev`, il bridge `/v1/ws` e
`/api/v1/ws`, che trasmette `/v1/chat/completions`, `/v1/messages` e `/v1/responses`
come frame. Il bridge chiede il verdetto a `/api/v1/ws?handshake=1` e rifiuta
l'upgrade a meno che quella route non abbia eseguito il controllo. Un handshake viene
accettato quando:

- non ha alcun header `Origin` (Codex CLI, SDK e altri client non browser);
- l'`Origin` è ammessa dall'allowlist descritta sopra (`CORS_ALLOWED_ORIGINS`,
  l'impostazione `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- l'`Origin` è una delle origini pubbliche di OmniRoute stesso (l'URL di base pubblico
  configurato, l'origine inoltrata da un proxy attendibile oppure un host diretto
  loopback/LAN indicato come indirizzo IP letterale o come `localhost` — gli stessi
  candidati usati dal controllo sulle modifiche della dashboard); oppure
- contiene una chiave API valida, come sulla superficie HTTP `/v1/*`.

Qualsiasi altro caso riceve `403 ws_origin_forbidden`. Un cookie di sessione della
dashboard non esenta un'`Origin` esterna, perché il browser lo allega al socket di
qualsiasi pagina. `localhost` su un'altra porta non viene considerato same-origin;
aggiungi tali origini di sviluppo a `CORS_ALLOWED_ORIGINS`.

## Esempio: reverse proxy davanti a OmniRoute

CORS viene applicato da OmniRoute stesso, quindi il proxy in genere **non** dovrebbe aggiungere o
riscrivere le intestazioni `Access-Control-*` (le intestazioni duplicate causano problemi nei browser). Termina TLS
e inoltra le richieste: lascia che OmniRoute risponda alle richieste preflight:

```nginx
# nginx — inoltra a OmniRoute; NON inserire Access-Control-* qui
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Mantieni le intestazioni di inoltro: un proxy sullo stesso host si connette dal loopback e sono
    # queste a indicare a OmniRoute che il chiamante non è l'operatore locale. Un proxy che non ne aggiunge
    # nessuna fa apparire locale ogni chiamante remoto. Inoltre, non impostare mai X-Forwarded-For su 127.0.0.1.
}
```

Imposta le origini consentite per i browser in OmniRoute (`CORS_ALLOWED_ORIGINS` o nella
scheda Sicurezza), non nel proxy.

## File sorgente

| Ambito                                                | File                                                                 |
| ----------------------------------------------------- | -------------------------------------------------------------------- |
| Risoluzione dell'allowlist + `getCorsStatus()`        | `src/server/cors/origins.ts`                                         |
| Applicazione del middleware (unica fonte attendibile) | `src/server/authz/pipeline.ts`                                       |
| Settings → inserimento delle origini a runtime        | `src/lib/config/runtimeSettings.ts`                                  |
| Stato a runtime per la dashboard                      | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner di avviso della dashboard                      | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Campo CORS Allowed Origins                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS per route di Cloud-Agent (l'eccezione)           | `src/lib/cloudAgent/api.ts`                                          |
| Controllo dell'`Origin` nell'handshake WebSocket      | `src/server/origin/wsOrigin.ts`                                      |

## Vedi anche

- [Livelli di protezione delle route](./ROUTE_GUARD_TIERS.md) — applicazione del loopback per
  le route in grado di generare processi (un controllo separato e complementare).
- [Guida all'autorizzazione](../architecture/AUTHZ_GUIDE.md) — la pipeline di autenticazione completa.
