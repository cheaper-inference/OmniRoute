# Webhooks (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Fonte della verità:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute può attivare webhook HTTP sugli eventi della piattaforma. Usali per l'integrazione con Slack, PagerDuty, Datadog, servizi di avviso interni o qualsiasi ricevitore HTTP.

Il dispatcher firma ogni consegna con HMAC-SHA256, riprova in caso di errori temporanei, tiene traccia dello stato della consegna per webhook e disabilita automaticamente gli endpoint che continuano a fallire.

## Eventi supportati

Il tipo `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, consumato da `src/lib/webhookDispatcher.ts`) attualmente modella sette eventi:

| Evento                    | Spara quando                                                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Una richiesta proxy viene completata correttamente                                                                                              |
| `request.failed`          | Dopo tutto, una richiesta proxy fallisce retries/fallback                                                                                       |
| `quota.exceeded`          | Una chiave API supera una soglia budget/quota                                                                                                   |
| `proxy.set_aside`         | Un membro del pool di delega viene messo da parte dopo ripetuti rifiuti (solo transizione)                                                      |
| `proxy.pool.exhausted`    | Ogni membro dell'ambito di un pool di proxy viene messo da parte                                                                                |
| `provider.reset_redeemed` | I ripristini accumulati con applicazione automatica hanno riscattato un credito di ripristino o il ripristino della sessione settimanale Claude |
| `test.ping`               | Evento sintetico utilizzato dall'endpoint del test                                                                                              |

Gli abbonamenti accettano la `"*"` letterale per ricevere ogni evento. I nomi di eventi sconosciuti in `events` vengono ignorati al momento dell'invio.

> Nota: il dispatcher API è cablato, ma i siti di chiamata di produzione per alcuni degli eventi non `test.ping` stanno ancora atterrando. Controlla `grep dispatchEvent` per vedere quali percorsi attualmente richiamano il dispatcher nella tua versione.

## Architettura

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

L'invio è "fire-and-forget" per il chiamante: `Promise.allSettled` ingoia gli errori per webhook in modo che un ricevitore difettoso non possa bloccare gli altri.

## Firma HMAC

Quando un webhook ha uno `secret`, OmniRoute firma il corpo JSON e invia:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> I nomi delle intestazioni utilizzano il prefisso `X-Webhook-*` (non `X-OmniRoute-*`). Il valore della firma è `sha256=<hex>` — verifica il prefisso completo.

Se `createWebhook` viene chiamato senza un segreto, il modulo DB ne genera uno (`whsec_<48 hex>`) in modo che tutti i webhook siano firmati per impostazione predefinita.

### Verifica sul ricevitore

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verificare sempre rispetto a **crudo** corpo della richiesta, prima di qualsiasi analisi JSON.

## Politica di tentativi e fallimenti

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Timeout di 10 secondi per tentativo (`AbortController`).
- HTTP 2xx conta come successo.
- HTTP 3xx/4xx conta come uno stato finale irreversibile — registrato come consegnato con `success = res.ok`.
- HTTP 5xx e gli errori di rete vengono ritentati con backoff esponenziale: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Dopo `maxRetries`, la consegna viene registrata come non riuscita.
- Ogni consegna aggiorna `last_triggered_at`, `last_status` e reimposta o incrementa `failure_count`.
- Il dispatcher chiama `disableWebhooksWithHighFailures(10)` dopo ogni fan-out, quindi qualsiasi webhook con `failure_count >= 10` viene automaticamente disabilitato.

## Banca dati

Tabella `webhooks` (migrazione `011_webhooks.sql`):

| Colonna             | Tipo    | Note                                                          |
| ------------------- | ------- | ------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                          |
| `url`               | TEXT    | Destinazione URL                                              |
| `events`            | TEXT    | matrice JSON ; `["*"]` predefinito                            |
| `secret`            | TEXT    | Segreto HMAC (generato automaticamente se non fornito)        |
| `enabled`           | INT     | 0/1; il valore predefinito è 1                                |
| `description`       | TEXT    | Etichetta umana opzionale                                     |
| `created_at`        | TEXT    | `datetime('now')`                                             |
| `last_triggered_at` | TEXT    | Aggiornato ad ogni tentativo di consegna                      |
| `last_status`       | INT     | Stato HTTP dell'ultimo tentativo (0 rete = )                  |
| `failure_count`     | INT     | Reimposta su 0 in caso di successo, + 1 in caso di fallimento |

La cronologia delle consegne viene mantenuta nella tabella `webhook_deliveries` dedicata (migrazione `069_webhook_deliveries.sql`, scritta tramite `src/lib/db/webhookDeliveries.ts::insertDelivery` a ogni tentativo), oltre ai contatori aggregati nella riga `webhooks`. I metadati del tipo (Slack / Discord / Telegram /trasformatori di carico utile personalizzati) sono stati aggiunti da `070_webhooks_kind_metadata.sql`.

## REST API

Tutti gli endpoint richiedono l'autenticazione di gestione (`requireManagementAuth`).

| Punto finale                    | Metodo | Descrizione                                  |
| ------------------------------- | ------ | -------------------------------------------- |
| `/api/webhooks`                 | GET    | Elenca webhook (segreti mascherati)          |
| `/api/webhooks`                 | POST   | Crea webhook                                 |
| `/api/webhooks/[id]`            | GET    | Dettagli del webhook (tutto segreto)         |
| `/api/webhooks/[id]`            | PUT    | Aggiorna campi                               |
| `/api/webhooks/[id]`            | DELETE | Rimuovere                                    |
| `/api/webhooks/[id]/test`       | POST   | Avvia uno `test.ping` (nessun tentativo)     |
| `/api/webhooks/[id]/deliveries` | GET    | Tentativi di consegna recenti per un webhook |
| `/api/webhooks/validate-url`    | POST   | Convalida URL pre-volo (guardia SSRF )       |

`GET /api/webhooks` maschera il segreto a `<first 10 chars>...` per evitare perdite nelle pagine degli elenchi. Usa `[id]` GET quando hai effettivamente bisogno del segreto.

### Crea webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Se `secret` viene omesso, il server genera un segreto `whsec_<hex>` e lo restituisce nella risposta.

### Prova il webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Restituisce `{ delivered, status, error }`. Non vengono tentati nuovi tentativi — utile per verificare rapidamente che il destinatario accetti il payload e la firma.

## Pannello di controllo

La pagina dashboard su `/dashboard/webhooks` (vedi `src/app/(dashboard)/dashboard/webhooks/page.tsx`) fornisce:

- Webhook Create/edit con un selettore di eventi
- Indicatore di stato (attivo/inattivo/con errore) basato su `enabled`, `failure_count` e `last_status`
- Consegna di prova con un clic
- Attivazione/disattivazione enable/disable manuale

## Esempi di carico utile

### richiesta.completata

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Le forme dei campi per gli eventi non `test.ping` sono definite dai siti di chiamata che le emettono; tratta l'oggetto `data` come compatibile con le versioni successive (aggiungi campi, non dipendere dall'assenza).

## Migliori pratiche

- **Verifica la firma su ogni consegna** contro il corpo grezzo — impedisce POSTs falsificato da chiunque indovini il tuo webhook URL.
- **Rispondi 2xx entro ~ 5 secondi** — il dispatcher scade a 10 s. I ricevitori lenti mangeranno i tentativi e gonfieranno `failure_count`.
- **Rendere i gestori idempotenti** I nuovi tentativi — e la semantica di consegna almeno una volta indicano che sono possibili duplicati.
- **Iscriviti minimamente** — elenca solo gli eventi che effettivamente consumi; `"*"` aggiungerà costi sui ricevitori che non controlli.
- **Guarda `failure_count`** Gli endpoint — vengono disabilitati automaticamente dopo 10 guasti consecutivi; resettare chiamando `PUT /api/webhooks/[id]` con `enabled: true` dopo aver riparato il ricevitore.
- **Ruota periodicamente i segreti** — `PUT` un nuovo `secret`, distribuisci il nuovo valore al ricevitore e conferma tramite l'endpoint di test.

## Vedi anche

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — gestione completa Superficie API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — interruttore automatico/semantica di raffreddamento dietro gli errori del provider emersi tramite `request.failed`
- Fonte: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
