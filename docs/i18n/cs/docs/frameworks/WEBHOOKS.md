# Webhooks (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Zdroj pravdy:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute může spouštět webhooky HTTP na událostech platformy. Použijte je k integraci se Slack, PagerDuty, Datadog, interními výstražnými službami nebo jakýmkoli přijímačem HTTP.

Dispečer podepisuje každou dodávku pomocí HMAC-SHA256, opakuje přechodná selhání, sleduje stav doručení podle webhooku a automaticky deaktivuje koncové body, které stále selhávají.

## Podporované akce

Typ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, spotřebovaný `src/lib/webhookDispatcher.ts`) v současné době modeluje sedm událostí:

| Událost                   | Požáry, když                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `request.completed`       | Požadavek přes proxy byl úspěšně dokončen                                                            |
| `request.failed`          | Požadavek přes proxy selže po všech retries/fallback                                                 |
| `quota.exceeded`          | Klíč API překračuje práh budget/quota                                                                |
| `proxy.set_aside`         | Člen skupiny proxy je po opakovaných odmítnutích vyřazen (pouze přechod)                             |
| `proxy.pool.exhausted`    | Každý člen oboru proxy fondu je vyčleněn                                                             |
| `provider.reset_redeemed` | Automaticky aplikované bankované resety uplatňují resetovací kredit nebo reset týdenní relace Claude |
| `test.ping`               | Syntetická událost používaná koncovým bodem testu                                                    |

Předplatná akceptují doslovné `"*"` pro příjem každé události. Neznámé názvy událostí v `events` jsou v době odeslání ignorovány.

> Poznámka: Dispečerské API je připojeno, ale produkční volací místa pro některé události mimo `test.ping` stále přistávají. Zkontrolujte `grep dispatchEvent`, abyste viděli, které cesty aktuálně vyvolávají dispečera ve vašem vydání.

## Architektura

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

Odeslání je pro volajícího nečekané: `Promise.allSettled` spolkne chyby na webhooku, takže jeden špatný přijímač nemůže blokovat ostatní.

## Podpis HMAC

Když má webhook `secret`, OmniRoute podepíše tělo JSON a odešle:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Názvy záhlaví používají předponu `X-Webhook-*` (nikoli `X-OmniRoute-*`). Hodnota podpisu je `sha256=<hex>` — ověřte úplný prefix.

Pokud je `createWebhook` voláno bez tajemství, modul DB ho vygeneruje (`whsec_<48 hex>`), takže všechny webhooky jsou standardně podepsány.

### Ověření na přijímači

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Vždy ověřte proti **syrový** tělo požadavku před jakoukoli analýzou JSON.

## Zásady opakování a selhání

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekund timeout na pokus (`AbortController`).
- HTTP 2xx se počítá jako úspěch.
- HTTP 3xx/4xx se počítá jako neopakovatelný konečný stav — zaznamenaný jako doručený se `success = res.ok`.
- HTTP 5xx a chyby sítě se opakují s exponenciálním stažením: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Po `maxRetries` je dodávka zaznamenána jako neúspěšná.
- Každá dodávka aktualizuje `last_triggered_at`, `last_status` a buď resetuje nebo zvýší `failure_count`.
- Dispečer volá `disableWebhooksWithHighFailures(10)` po každém rozvětvení, takže jakýkoli webhook se `failure_count >= 10` je automaticky deaktivován.

## Databáze

Tabulka `webhooks` (migrace `011_webhooks.sql`):

| Sloupec             | Typ     | Poznámky                                                   |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | Destinace URL                                              |
| `events`            | TEXT    | pole JSON ; výchozí `["*"]`                                |
| `secret`            | TEXT    | Tajemství HMAC (automaticky generované, pokud není zadáno) |
| `enabled`           | INT     | 0/1; výchozí je 1                                          |
| `description`       | TEXT    | Volitelný lidský štítek                                    |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | Aktualizováno při každém pokusu o doručení                 |
| `last_status`       | INT     | Stav HTTP posledního pokusu (0 síť = )                     |
| `failure_count`     | INT     | Resetuje se na 0 při úspěchu, + 1 při neúspěchu            |

Historie doručení je uložena ve vyhrazené tabulce `webhook_deliveries` (migrační `069_webhook_deliveries.sql`, zapsaná prostřednictvím `src/lib/db/webhookDeliveries.ts::insertDelivery` při každém pokusu), kromě agregovaných čítačů na řádku `webhooks`. Typová metadata (Slack / Discord / Telegram / vlastní transformátory užitečného zatížení) byla přidána společností `070_webhooks_kind_metadata.sql`.

## REST API

Všechny koncové body vyžadují ověření správy (`requireManagementAuth`).

| Koncový bod                     | Metoda | Popis                                       |
| ------------------------------- | ------ | ------------------------------------------- |
| `/api/webhooks`                 | GET    | Seznam webhooků (tajemství maskované)       |
| `/api/webhooks`                 | POST   | Vytvořte webhook                            |
| `/api/webhooks/[id]`            | GET    | Detail webhooku (úplné tajemství)           |
| `/api/webhooks/[id]`            | PUT    | Aktualizujte pole                           |
| `/api/webhooks/[id]`            | DELETE | Odstranit                                   |
| `/api/webhooks/[id]/test`       | POST   | Vystřelte `test.ping` (žádné opakování)     |
| `/api/webhooks/[id]/deliveries` | GET    | Nedávné pokusy o doručení pro jeden webhook |
| `/api/webhooks/validate-url`    | POST   | Předletová validace URL (ochrana SSRF )     |

`GET /api/webhooks` maskuje tajemství `<first 10 chars>...`, aby se zabránilo úniku na stránkách seznamu. Použijte `[id]` GET, když skutečně potřebujete tajemství.

### Vytvořte webhook

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

Pokud je `secret` vynecháno, server vygeneruje tajný klíč `whsec_<hex>` a vrátí jej v odpovědi.

### Testovací webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vrátí `{ delivered, status, error }`. Nepokouší se o žádné opakování — užitečné pro rychlé ověření, že přijímač akceptuje užitečné zatížení a podpis.

## Dashboard

Stránka dashboard na `/dashboard/webhooks` (viz `src/app/(dashboard)/dashboard/webhooks/page.tsx`) poskytuje:

- Webhooky Create/edit s nástrojem pro výběr událostí
- Indikátor stavu (aktivní / neaktivní / chybný) na základě `enabled`, `failure_count` a `last_status`
- Doručení testu jedním kliknutím
- Ruční přepínání enable/disable

## Příklady užitečného zatížení

### žádost.vyplněno

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

Tvary polí pro události, které nejsou `test.ping` jsou definovány místy volání, která je vysílají; zacházet s objektem `data` jako s dopředně kompatibilním (přidat pole, nezávisí na nepřítomnosti).

## Nejlepší postupy

- **Ověřte podpis na každé dodávce** proti surovému tělu — zabrání falešnému POSTs každému, kdo uhodne váš webhook URL.
- **Odpovězte 2xx do 5 sekund ~** — vyprší časový limit dispečera v 10 s. Pomalé přijímače sežerou pokusy a nafouknou `failure_count`.
- **Udělejte z obsluhy idempotentní** Opakované pokusy — a sémantika doručení alespoň jednou znamenají, že jsou možné duplikáty.
- **Odebírejte minimálně** — uvádí pouze události, které skutečně konzumujete; `"*"` zvýší náklady na přijímače, které neovládáte.
- **Sledujte `failure_count`** Koncové body — jsou automaticky deaktivovány při 10 po sobě jdoucích selháních; resetujte voláním `PUT /api/webhooks/[id]` pomocí `enabled: true` po upevnění přijímače.
- **Tajemství pravidelně otáčejte** — `PUT` nové `secret`, nasaďte novou hodnotu do přijímače a potvrďte pomocí testovacího koncového bodu.

## Viz také

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — plná správa API povrch
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) Sémantika jističe / ochlazování — za selháním poskytovatele se objevila prostřednictvím `request.failed`
- Zdroj: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
