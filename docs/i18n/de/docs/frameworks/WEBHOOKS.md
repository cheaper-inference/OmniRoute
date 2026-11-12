# Webhooks (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Quelle der Wahrheit:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Letzte Aktualisierung:** 28.06.2026 — v3.8.40

OmniRoute kann HTTP Webhooks bei Plattformereignissen auslösen. Verwenden Sie sie zur Integration mit Slack, PagerDuty, Datadog, internen Alarmierungsdiensten oder jedem HTTP Empfänger.

Der Dispatcher signiert jede Zustellung mit HMAC-SHA256, versucht es bei vorübergehenden Fehlern erneut, verfolgt den Zustellungszustand per Webhook und deaktiviert automatisch Endpunkte, die ständig ausfallen.

## Unterstützte Veranstaltungen

Der `WebhookEvent` -Typ (`src/lib/webhooks/eventDescriptions.ts`, verbraucht von `src/lib/webhookDispatcher.ts`) modelliert derzeit sieben Ereignisse:

| Ereignis                  | Wird ausgelöst, wenn                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Eine Proxy-Anfrage wird erfolgreich abgeschlossen                                                             |
| `request.failed`          | Eine Proxy-Anfrage schlägt schließlich retries/fallback fehl                                                  |
| `quota.exceeded`          | Ein API -Schlüssel überschreitet einen budget/quota -Schwellenwert                                            |
| `proxy.set_aside`         | Ein Mitglied des Proxy-Pools wird nach wiederholter Ablehnung außer Dienst gestellt (nur Übergang).           |
| `proxy.pool.exhausted`    | Jedes Mitglied eines Proxy-Pool-Bereichs wird beiseite gelegt                                                 |
| `provider.reset_redeemed` | Automatisch angewendete Bank-Resets lösen ein Reset-Guthaben oder den wöchentlichen Claude Sitzungs-Reset ein |
| `test.ping`               | Synthetisches Ereignis, das vom Testendpunkt verwendet wird                                                   |

Abonnements akzeptieren die wörtliche `"*"`, um alle Ereignisse zu erhalten. Unbekannte Ereignisnamen in `events` werden zum Versandzeitpunkt ignoriert.

> Hinweis: Der Dispatcher- API ist verkabelt, aber Produktionsanrufstandorte für einige der Nicht-`test.ping` -Ereignisse landen immer noch. Überprüfen Sie `grep dispatchEvent`, um zu sehen, welche Pfade derzeit den Dispatcher in Ihrem Release aufrufen.

## Architektur

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

Der Versand ist für den Anrufer ein Kinderspiel: `Promise.allSettled` verschluckt Webhook-Fehler, sodass ein fehlerhafter Empfänger die anderen nicht blockieren kann.

## HMAC -Unterzeichnung

Wenn ein Webhook ein `secret` hat, signiert OmniRoute den JSON Body und sendet:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Header-Namen verwenden das Präfix `X-Webhook-*` (nicht `X-OmniRoute-*`). Der Signaturwert ist `sha256=<hex>` — überprüfen Sie das vollständige Präfix.

Wenn `createWebhook` ohne Geheimnis aufgerufen wird, generiert das DB Modul eines (`whsec_<48 hex>`), sodass alle Webhooks standardmäßig signiert sind.

### Überprüfung am Empfänger

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Überprüfen Sie immer anhand der **roh** Anforderungshauptteil vor dem JSON -Parsing.

## Richtlinie für Wiederholungsversuche und Fehler

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 Sekunden Timeout pro Versuch (`AbortController`).
- HTTP 2xx gilt als Erfolg.
- HTTP 3xx/4xx gilt als nicht wiederholbarer Endstatus. — wird als geliefert mit `success = res.ok` erfasst.
- HTTP 5xx und Netzwerkfehler werden mit exponentiellem Backoff wiederholt: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Nach `maxRetries` wird die Lieferung als fehlgeschlagen erfasst.
- Bei jeder Lieferung werden `last_triggered_at` und `last_status` aktualisiert und `failure_count` entweder zurückgesetzt oder erhöht.
- Der Dispatcher ruft `disableWebhooksWithHighFailures(10)` nach jedem Fan-Out auf, sodass jeder Webhook mit `failure_count >= 10` automatisch deaktiviert wird.

## Datenbank

Tabelle `webhooks` (Migration `011_webhooks.sql`):

| Spalte              | Typ     | Notizen                                                      |
| ------------------- | ------- | ------------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                         |
| `url`               | TEXT    | Ziel URL                                                     |
| `events`            | TEXT    | JSON Array; Standard `["*"]`                                 |
| `secret`            | TEXT    | HMAC Geheimnis (automatisch generiert, wenn nicht angegeben) |
| `enabled`           | INT     | 0/1; Der Standardwert ist 1                                  |
| `description`       | TEXT    | Optionale menschliche Bezeichnung                            |
| `created_at`        | TEXT    | `datetime('now')`                                            |
| `last_triggered_at` | TEXT    | Bei jedem Zustellversuch aktualisiert                        |
| `last_status`       | INT     | HTTP Status des letzten Versuchs (0 = Netzwerk)              |
| `failure_count`     | INT     | Wird bei Erfolg auf 0 zurückgesetzt, bei Misserfolg auf + 1  |

Der Zustellungsverlauf wird zusätzlich zu den aggregierten Zählern in der `webhooks` -Zeile in der dedizierten `webhook_deliveries` Tabelle (Migrations `069_webhook_deliveries.sql`, bei jedem Versuch über `src/lib/db/webhookDeliveries.ts::insertDelivery` geschrieben) gespeichert. Art-Metadaten (Slack / Discord / Telegram / benutzerdefinierte Nutzlasttransformatoren) wurden von `070_webhooks_kind_metadata.sql` hinzugefügt.

## REST API

Alle Endpunkte erfordern eine Verwaltungsauthentifizierung (`requireManagementAuth`).

| Endpunkt                        | Verfahren | Beschreibung                                            |
| ------------------------------- | --------- | ------------------------------------------------------- |
| `/api/webhooks`                 | GET       | Webhooks auflisten (Geheimnisse maskiert)               |
| `/api/webhooks`                 | POST      | Webhook erstellen                                       |
| `/api/webhooks/[id]`            | GET       | Webhook-Details (vollständiges Geheimnis)               |
| `/api/webhooks/[id]`            | PUT       | Felder aktualisieren                                    |
| `/api/webhooks/[id]`            | DELETE    | Entfernen                                               |
| `/api/webhooks/[id]/test`       | POST      | Eine `test.ping` auslösen (keine Wiederholungsversuche) |
| `/api/webhooks/[id]/deliveries` | GET       | Letzte Zustellversuche für einen Webhook                |
| `/api/webhooks/validate-url`    | POST      | URL -Validierung vor dem Flug (SSRF Wache)              |

`GET /api/webhooks` verschleiert das Geheimnis gegenüber `<first 10 chars>...`, um ein Durchsickern auf Listing-Seiten zu verhindern. Verwenden Sie den `[id]` GET wenn Sie das Geheimnis tatsächlich benötigen.

### Webhook erstellen

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

Wenn `secret` weggelassen wird, generiert der Server ein `whsec_<hex>` Geheimnis und gibt es in der Antwort zurück.

### Testen Sie den Webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Gibt `{ delivered, status, error }` zurück. Es werden keine Wiederholungsversuche unternommen. — ist nützlich, um schnell zu überprüfen, ob der Empfänger die Nutzdaten und die Signatur akzeptiert.

## Armaturenbrett

Die Dashboard-Seite bei `/dashboard/webhooks` (siehe `src/app/(dashboard)/dashboard/webhooks/page.tsx`) bietet:

- Create/edit Webhooks mit einer Ereignisauswahl
- Statusanzeige (aktiv / inaktiv / fehlerhaft) basierend auf `enabled`, `failure_count` und `last_status`
- Testlieferung mit einem Klick
- Manuelle enable/disable -Umschaltung

## Beispiele für Nutzlasten

### Anfrage.abgeschlossen

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

Feldformen für Nicht-`test.ping` -Ereignisse werden durch die Anrufstellen definiert, die sie aussenden; Behandeln Sie das `data` Objekt als vorwärtskompatibel (fügen Sie Felder hinzu, hängen Sie nicht von der Abwesenheit ab).

## Best Practices

- **Überprüfen Sie die Unterschrift bei jeder Lieferung** gegen den Rohkörper — verhindert, dass jeder, der Ihren Webhook URL errät, gefälschtes POSTs erhält.
- **Reagieren Sie 2xx innerhalb von ~ 5 Sekunden** — Der Dispatcher läuft nach 10 s ab. Langsame Empfänger fressen Wiederholungsversuche und erhöhen `failure_count`.
- **Machen Sie Handler idempotent** — Wiederholungsversuche und die Semantik der mindestens einmaligen Zustellung bedeuten, dass Duplikate möglich sind.
- **Abonnieren Sie minimal** — listet nur Ereignisse auf, die Sie tatsächlich konsumieren. `"*"` erhöht die Kosten für Empfänger, die Sie nicht kontrollieren.
- **`failure_count` ansehen** — Endpunkte werden bei 10 aufeinanderfolgenden Ausfällen automatisch deaktiviert; Zurücksetzen durch Aufruf von `PUT /api/webhooks/[id]` mit `enabled: true` nach der Reparatur des Empfängers.
- **Wechseln Sie die Geheimnisse regelmäßig** — `PUT` einen neuen `secret`, stellen Sie den neuen Wert dem Empfänger bereit und bestätigen Sie ihn über den Testendpunkt.

## Siehe auch

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — vollständige Verwaltung API Oberfläche
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — Leistungsschalter-/Abklingzeitsemantik hinter Anbieterausfällen ist über `request.failed` aufgetaucht
- Quelle: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
