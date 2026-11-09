# Webhooks (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Źródło prawdy:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute może uruchamiać webhooki HTTP na zdarzeniach na platformie. Użyj ich do integracji z Slack, PagerDuty, Datadog, wewnętrznymi usługami alarmowymi lub dowolnym odbiornikiem HTTP.

Dyspozytor podpisuje każdą dostawę za pomocą HMAC-SHA256, ponawia próby w przypadku przejściowych błędów, śledzi stan dostarczania dla każdego elementu webhook i automatycznie wyłącza punkty końcowe, które ciągle ulegają awariom.

## Obsługiwane wydarzenia

Typ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, konsumowany przez `src/lib/webhookDispatcher.ts`) obecnie modeluje siedem zdarzeń:

| Wydarzenie                | Pali, kiedy                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Żądanie proxy zostało zakończone pomyślnie                                                                                       |
| `request.failed`          | Żądanie proxy kończy się niepowodzeniem po wykonaniu wszystkich retries/fallback                                                 |
| `quota.exceeded`          | Klucz API przekracza próg budget/quota                                                                                           |
| `proxy.set_aside`         | Członek puli proxy jest odkładany w przypadku wielokrotnych odmów (tylko w przypadku przejścia)                                  |
| `proxy.pool.exhausted`    | Każdy członek zakresu puli proxy jest odkładany                                                                                  |
| `provider.reset_redeemed` | Automatyczne zastosowanie resetów bankowych umożliwiło wykorzystanie kredytu resetującego lub cotygodniowego resetu sesji Claude |
| `test.ping`               | Zdarzenie syntetyczne używane przez punkt końcowy testu                                                                          |

Subskrypcje akceptują dosłowne `"*"`, aby otrzymywać każde wydarzenie. Nieznane nazwy zdarzeń w `events` są ignorowane w momencie wysyłki.

> Uwaga: dyspozytor API jest podłączony, ale strony wezwań produkcyjnych dla niektórych zdarzeń innych niż `test.ping` wciąż lądują. Sprawdź `grep dispatchEvent`, aby zobaczyć, które ścieżki aktualnie wywołują dyspozytora w Twojej wersji.

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

Wysyłanie jest błyskawiczne dla dzwoniącego: `Promise.allSettled` przechwytuje błędy poszczególnych elementów webhook, dzięki czemu jeden zły odbiorca nie może blokować pozostałych.

## Podpisanie HMAC

Kiedy webhook ma `secret`, OmniRoute podpisuje treść JSON i wysyła:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Nazwy nagłówków używają przedrostka `X-Webhook-*` (nie `X-OmniRoute-*`). Wartość podpisu to `sha256=<hex>` — sprawdź pełny prefiks.

Jeśli `createWebhook` zostanie wywołane bez sekretu, moduł DB wygeneruje go (`whsec_<48 hex>`), więc wszystkie webhooki będą domyślnie podpisane.

### Weryfikacja na odbiorniku

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Zawsze sprawdzaj zgodnie z **surowy** treść żądania, przed jakąkolwiek analizą JSON.

## Polityka ponawiania prób i niepowodzeń

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekund przerwy na próbę (`AbortController`).
- HTTP 2xx liczy się jako sukces.
- HTTP 3xx/4xx liczy się jako ostateczny status — którego nie można powtórzyć, zarejestrowany jako dostarczony wraz z `success = res.ok`.
- HTTP 5xx i błędy sieciowe są ponawiane z wykładniczym wycofywaniem: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Po `maxRetries` dostawa jest rejestrowana jako nieudana.
- Każda dostawa aktualizuje `last_triggered_at`, `last_status` i resetuje lub zwiększa `failure_count`.
- Dyspozytor wywołuje `disableWebhooksWithHighFailures(10)` po każdym rozwinięciu, więc każdy webhook z `failure_count >= 10` jest automatycznie wyłączany.

## Baza danych

Tabela `webhooks` (migracja `011_webhooks.sql`):

| Kolumna             | Typ     | Notatki                                                                 |
| ------------------- | ------- | ----------------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                                    |
| `url`               | TEXT    | Miejsce docelowe URL                                                    |
| `events`            | TEXT    | tablica JSON ; domyślny `["*"]`                                         |
| `secret`            | TEXT    | Sekret HMAC (wygenerowany automatycznie, jeśli nie został podany)       |
| `enabled`           | INT     | 0/1; domyślnie 1                                                        |
| `description`       | TEXT    | Opcjonalna etykieta z człowiekiem                                       |
| `created_at`        | TEXT    | `datetime('now')`                                                       |
| `last_triggered_at` | TEXT    | Aktualizowane przy każdej próbie dostarczenia                           |
| `last_status`       | INT     | Status HTTP ostatniej próby (0 sieci = )                                |
| `failure_count`     | INT     | Resetuje się do 0 w przypadku powodzenia, + 1 w przypadku niepowodzenia |

Historia dostaw zapisywana jest w dedykowanej tabeli `webhook_deliveries` (migracja `069_webhook_deliveries.sql`, zapisywana przy każdej próbie poprzez `src/lib/db/webhookDeliveries.ts::insertDelivery` ), oprócz liczników zbiorczych w wierszu `webhooks`. Rodzaje metadanych (Slack / Discord / Telegram / niestandardowe transformatory ładunku) zostały dodane przez `070_webhooks_kind_metadata.sql`.

## REST API

Wszystkie punkty końcowe wymagają autoryzacji zarządzania (`requireManagementAuth`).

| Punkt końcowy                   | Metoda | Opis                                             |
| ------------------------------- | ------ | ------------------------------------------------ |
| `/api/webhooks`                 | GET    | Lista webhooków (sekrety zamaskowane)            |
| `/api/webhooks`                 | POST   | Utwórz webhooka                                  |
| `/api/webhooks/[id]`            | GET    | Szczegóły webhooka (pełny sekret)                |
| `/api/webhooks/[id]`            | PUT    | Aktualizuj pola                                  |
| `/api/webhooks/[id]`            | DELETE | Usunąć                                           |
| `/api/webhooks/[id]/test`       | POST   | Wystrzel `test.ping` (bez ponownych prób)        |
| `/api/webhooks/[id]/deliveries` | GET    | Ostatnie próby dostarczenia dla jednego webhooka |
| `/api/webhooks/validate-url`    | POST   | Walidacja URL przed lotem (strażnik SSRF )       |

`GET /api/webhooks` maskuje sekret `<first 10 chars>...`, aby uniknąć wycieków na stronach z listami. Użyj `[id]` GET kiedy naprawdę potrzebujesz sekretu.

### Utwórz webhooka

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

Jeżeli `secret` zostanie pominięte, serwer generuje sekret `whsec_<hex>` i zwraca go w odpowiedzi.

### Przetestuj webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Zwraca `{ delivered, status, error }`. Nie są podejmowane żadne ponowne próby. — jest przydatne do szybkiego sprawdzania, czy odbiorca akceptuje ładunek i podpis.

## Panel

Strona panelu kontrolnego w `/dashboard/webhooks` (patrz `src/app/(dashboard)/dashboard/webhooks/page.tsx`) zawiera:

- Webhooki Create/edit z selektorem zdarzeń
- Wskaźnik stanu (aktywny/nieaktywny/błędny) oparty na `enabled`, `failure_count` i `last_status`
- Dostawa testowa jednym kliknięciem
- Ręczny przełącznik enable/disable

## Przykłady ładunków

### żądanie.ukończone

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

Kształty pól dla zdarzeń innych niż `test.ping` są definiowane przez miejsca wywołań, które je emitują; traktuj obiekt `data` jako kompatybilny w przód (dodaj pola, nie zależą od nieobecności).

## Najlepsze praktyki

- **Sprawdź podpis na każdej dostawie** przeciwko surowemu ciału — zapobiega sfałszowaniu POSTs przez każdego, kto odgadnie Twój webhook URL.
- **Odpowiedz 2xx w ciągu ~ w ciągu 5 sekund** — dyspozytor przekroczył limit czasu wynoszący 10 s. Powolni odbiorcy będą jeść ponowne próby i zawyżać `failure_count`.
- **Spraw, aby procedury obsługi były idempotentne** Ponowne próby — i semantyka dostawy co najmniej raz oznaczają, że możliwe są duplikaty.
- **Subskrybuj minimalnie** — wyświetla tylko te wydarzenia, z których faktycznie korzystasz; `"*"` doda koszty do odbiorników, których nie kontrolujesz.
- **Obejrzyj `failure_count`** Punkty końcowe — są automatycznie wyłączane po 10 kolejnych awariach; zresetować, wywołując `PUT /api/webhooks/[id]` za pomocą `enabled: true` po naprawieniu odbiornika.
- **Okresowo zmieniaj sekrety** — `PUT` nowy `secret`, wdróż nową wartość w odbiorniku i potwierdź za pośrednictwem testowego punktu końcowego.

## Zobacz także

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pełne zarządzanie powierzchnią API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) Semantyka wyłącznika / przestoju — stojąca za błędami dostawcy ujawniona za pośrednictwem `request.failed`
- Źródło: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
