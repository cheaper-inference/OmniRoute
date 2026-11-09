# CORS Configuration & Security (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controlla quale **origini del browser** può leggere risposte multiorigine da un'unica lista consentita centralizzata. Il modello è **fail-closed per impostazione predefinita** : nessuna origine è consentita finché non ne viene attivata una. Questa pagina documenta come si risolve la lista consentita, cosa `CORS_ALLOW_ALL=true` effettivamente espone (e, soprattutto, cosa fa **non** ), come configurare lo sviluppo rispetto alla produzione in modo sicuro e l'avviso di runtime nel dashboard mostra quando un carattere jolly è attivo.

**Fonte della verità:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). La lista consentita viene applicata una volta, nel middleware (`src/server/authz/pipeline.ts`) i gestori — per percorso non impostano `Access-Control-Allow-Origin` da soli.

## Come si risolve un'origine

Per ogni richiesta il middleware calcola il valore `Access-Control-Allow-Origin` in questo ordine:

1. **`CORS_ALLOW_ALL=true`** (o l'eredità `CORS_ORIGIN=*`) → fa eco al `Origin` del chiamante (o `*` quando non è presente un'intestazione `Origin` ), con `Vary: Origin` in modo che le cache rimangano corrette. Lo stesso chokepoint `applyCorsHeaders()` aggiunge anche `Vary: Accept-Encoding` a ogni risposta 2xx-with-body sulla superficie `/v1*`/`/v1beta*` autenticata con token (`relaxForTokenAuth`, RFC 9110 §12.5.5, rilascio #6737), in modo che le cache downstream/shared possano distinguere correttamente le varianti compresse da quelle non compresse.
2. Altrimenti, la richiesta `Origin` viene normalizzata (in minuscolo, barra finale eliminata) e confrontata con il **lista consentita unita** :
   - ambiente **`CORS_ALLOWED_ORIGINS`** — elenco separato da virgole e
   - il tempo di esecuzione **`corsOrigins`** impostazione (Dashboard → Sicurezza → _CORS Origini consentite_), inserita tramite `setRuntimeAllowedOrigins()` da `src/lib/config/runtimeSettings.ts`.
3. Nessuna corrispondenza →**non viene emessa alcuna intestazione `Access-Control-Allow-Origin`** . Il browser blocca la lettura multiorigine. Questa è l'impostazione predefinita di chiusura in caso di errore prevista.

| Inv.var                | Senso                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV di origini esatte da consentire (consigliato).                                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → eco qualsiasi origine (carattere jolly). Solo sviluppatore.                                |
| `CORS_ORIGIN`          | Eredità. `*` si comporta come `CORS_ALLOW_ALL`; un singolo valore viene aggiunto alla lista consentita. |

## Modello di minaccia — ciò che `CORS_ALLOW_ALL=true` espone realmente

Vale la pena prendere sul serio l'avviso OWASP generico ("carattere jolly CORS = qualsiasi sito può chiamare il tuo API"), ma l'esposizione di OmniRoute è **più ristretto rispetto al caso generico** , a causa di un fatto concreto di implementazione:

> **La `applyCorsHeaders()` centrale non emette mai `Access-Control-Allow-Credentials`.** Un browser non esporrà una risposta multiorigine _credentialed_ (contenente cookie) a meno che il server non invii `Access-Control-Allow-Credentials: true`. Il percorso CORS condiviso di OmniRoute non lo fa mai.

Cosa significa per superficie, anche con `CORS_ALLOW_ALL=true`:

| Superficie                                  | Meccanismo di autenticazione      | Effetto del carattere jolly CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cruscotto/ MANAGEMENT `/api/*`              | Sessione di cookie                | L'origine è riecheggiata, ma **senza `Allow-Credentials`** il navigatore **blocchi** la credenziale letta. Un sito multiorigine dannoso **non può leggere** le risposte autenticate della dashboard e il cookie di sessione non viene esposto.                                                                                                                                                                                                                                                                                                                                                             |
| Cliente API `/v1/*`, `/v1beta/*`            | Portante/intestazione `x-api-key` | Già permissivo **in base alla progettazione** (`relaxForTokenAuth`): i browser non allegano mai automaticamente `Authorization`/`x-api-key`, quindi la pagina di un utente malintenzionato non può fornire la tua chiave. L'eco rilassato richiede un oggetto autenticato (una chiave API convalidata o una sessione del dashboard), non solo un'intestazione della credenziale, e non include mai `Access-Control-Allow-Credentials`. Le risposte anonime (`REQUIRE_API_KEY=false`) utilizzano la lista consentita di origine configurata, incluso un esplicito consenso esplicito `CORS_ALLOW_ALL=true`. |
| Pubblica di sola lettura (`/api/health`, …) | Nessuno                           | Non sensibile; il carattere jolly è innocuo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Quindi il **residuo** l'esposizione di `CORS_ALLOW_ALL=true` è limitata a: (a) origine incrociata senza credenziali **legge** di dati già non autenticati e (b) lasciare che CORS**passaggio pre-volo** sulle rotte di gestione — che richiedono ancora l'autenticazione che una pagina multiorigine non può fornire. È **non** un vettore di dirottamento della sessione o di furto di credenziali sul percorso CORS condiviso.

### Una vera eccezione — `/api/v1/agents/`

I percorsi Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) impostano i loro **Proprio** Intestazioni CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) e **Fare** emettono `Access-Control-Allow-Origin: <origin>|*` insieme a `Access-Control-Allow-Credentials: true`. Questa è l’unica superficie dove l’eco dell’origine e le credenziali coesistono, e lo è **indipendente da `CORS_ALLOW_ALL`** . Questi percorsi sono autenticati dalla gestione (`requireManagementAuth`); gli operatori che espongono il dashboard fuori dall'host devono essere consapevoli che questo è l'unico luogo in cui è consentita una lettura con credenziali multiorigine dalle intestazioni di risposta. Il suo restringimento a una lista consentita esplicita viene monitorato separatamente da queste linee guida CORS.

## Lista di controllo della produzione

- **Non impostare mai `CORS_ALLOW_ALL=true` in produzione.** Lascialo non impostato.
- Imposta un **esplicito** origin list — il campo env var o la scheda Sicurezza:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Se OmniRoute viene eseguito dietro un proxy/tunnel inverso (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS è **non** il tuo unico controllo — la protezione del percorso di loopback protegge ancora i percorsi che supportano lo spawn (vedi [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Non forgiare `X-Forwarded-For: 127.0.0.1` per "aggiustare" un 403; che riapre la classe RCE la guardia di percorso chiude.
- Conferma lo stato di runtime: la dashboard mostra a **striscione ambrato persistente** in Dashboard → Sicurezza → Autorizzazione Inventario ogni volta che `CORS_ALLOW_ALL=true` è attivo e `/api/settings/authz-inventory` restituisce una busta `cors: { allowAll, allowedOrigins }` che gli strumenti di monitoraggio possono eseguire il polling.

## Convenienza dello sviluppo — consente origini locali specifiche

Raramente hai bisogno del carattere jolly anche in dev. Consenti solo i server di sviluppo che utilizzi:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Le origini vengono abbinate senza distinzione tra maiuscole e minuscole con la barra finale ignorata, quindi `http://localhost:3000` e `http://localhost:3000/` sono equivalenti. Lo stesso CSV può essere impostato in fase di esecuzione in **Dashboard → Sicurezza → CORS Origini consentite** senza riavvio.

## Chiavi API e sessioni di cookie

- **Portante/ `x-api-key` (la superficie di inferenza `/v1/*` ):** i browser non li allegano mai automaticamente. CORS non è una barriera significativa qui — la chiave API è la barriera — motivo per cui quella superficie è intenzionalmente permissiva in modo che il browser e i client Electron possano leggere le risposte a cui hanno già diritto. L'eco rilassato richiede un oggetto autenticato (una chiave API convalidata o una sessione del dashboard), non solo un'intestazione della credenziale, e non include mai `Access-Control-Allow-Credentials`. Le risposte anonime (`REQUIRE_API_KEY=false`) utilizzano la lista consentita di origine configurata, incluso un esplicito consenso esplicito `CORS_ALLOW_ALL=true`. I rifiuti di autenticazione (401) rimangono leggibili in modo che i client possano far emergere una chiave revocata o digitata in modo errato (#5242): il 401 della pipeline mantiene l'eco e un percorso che rifiuta la chiave stessa dopo che la pipeline l'ha resa anonima (`/v1/models` e `/v1beta/models` con l'autenticazione di gestione configurata, i percorsi candidati `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` con ambito proprietario e combo automatica) aggiunge l'eco a quel 401 tramite `credentialRejectionHeaders()`. L'eco viene digitato sulla richiesta che trasporta un'intestazione di credenziale (`Authorization`, `x-api-key`, `x-goog-api-key` o il cookie `auth_token` ), non su quale di essi è stato controllato il percorso e non è mai accoppiato con `Access-Control-Allow-Credentials`; il corpo è una busta di errore fissa. Le rotte di gestione sotto `/api/v1/` protette da `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) non utilizzano questa eccezione di rifiuto delle credenziali: con `REQUIRE_API_KEY=false`, le loro risposte 401/403 seguono la policy di origine CORS configurata.
- **Cookie di sessione (la dashboard):** protetto dal default fail-closed **E** dall’assenza di `Access-Control-Allow-Credentials` sul percorso condiviso. Mantenere le origini management/dashboard fuori da qualsiasi configurazione permissiva; devono rimanere esattamente in fail-close.

## Strette di mano WebSocket (`/v1/responses`, `/v1/ws`)

I browser non applicano CORS a WebSocket, quindi i trasporti WebSocket che restituiscono l'output dell'inferenza controllano essi stessi l'handshake `Origin` (`src/server/origin/wsOrigin.ts`): le risposte WebSocket (`/v1/responses`) e, quando OmniRoute attraversa `npm start` / `npm run dev`, il bridge `/v1/ws` e `/api/v1/ws`, che trasmette `/v1/chat/completions`, `/v1/messages` e `/v1/responses` come frame. Il ponte chiede il verdetto `/api/v1/ws?handshake=1` e si rifiuta di aggiornare a meno che quel percorso non esegua il controllo. I requisiti di autenticazione si applicano ancora separatamente. Il controllo dell'origine viene superato quando:

- non ha intestazione `Origin` (Codex CLI, SDKs e altri client non browser);
- la `Origin` è ammessa dalla lista consentita sopra (`CORS_ALLOWED_ORIGINS`, l'impostazione `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` è una delle origini pubbliche di OmniRoute(la base pubblica configurata URL, l'origine inoltrata di un proxy attendibile o un host loopback/LAN diretto fornito come valore letterale IP o `localhost` — gli stessi candidati utilizzati dal controllo di mutazione del dashboard); O
- trasporta una chiave API valida, come sulla superficie HTTP `/v1/*`.

Tutto il resto ottiene `403 ws_origin_forbidden`. Un cookie di sessione del dashboard non esenta un `Origin` esterno, poiché il browser lo collega al socket di qualsiasi pagina. `localhost` su un'altra porta non viene trattato come della stessa origine; aggiungi tali origini di sviluppo a `CORS_ALLOWED_ORIGINS`.

## Esempio: proxy inverso davanti a OmniRoute

CORS è applicato dallo stesso OmniRoute, quindi generalmente dovrebbe farlo il proxy **non** aggiungere o riscrivere le intestazioni `Access-Control-*` (le doppie intestazioni interrompono i browser). Termina TLS e inoltra — per consentire OmniRoute di rispondere al preflight:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Imposta le origini browser consentite in OmniRoute (`CORS_ALLOWED_ORIGINS` o scheda Sicurezza), non nel proxy.

## File di origine

| Preoccupazione                                   | File                                                                 |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Risoluzione lista consentita + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Applicazione middleware (unica fonte di verità)  | `src/server/authz/pipeline.ts`                                       |
| Impostazioni Iniezione dell'origine runtime →    | `src/lib/config/runtimeSettings.ts`                                  |
| Stato di runtime per il dashboard                | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner di avviso sul dashboard                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Campo Origini consentite CORS                    | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS Cloud-Agent per percorso (l'eccezione)      | `src/lib/cloudAgent/api.ts`                                          |
| Controllo WebSocket stretta di mano `Origin`     | `src/server/origin/wsOrigin.ts`                                      |

## Vedi anche

- [Livelli Route Guard](./ROUTE_GUARD_TIERS.md) Applicazione del loopback — per percorsi che supportano lo spawn (un controllo separato e complementare).
- [Guida all'autorizzazione](../architecture/AUTHZ_GUIDE.md) — la pipeline di autenticazione completa.
