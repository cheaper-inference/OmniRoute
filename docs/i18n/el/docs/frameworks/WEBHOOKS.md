# Webhooks (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Πηγή αλήθειας:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

OmniRoute μπορεί να ενεργοποιήσει τα webhook HTTP σε εκδηλώσεις πλατφόρμας. Χρησιμοποιήστε τα για ενσωμάτωση με Slack, PagerDuty, Datadog, εσωτερικές υπηρεσίες ειδοποίησης ή οποιονδήποτε δέκτη HTTP.

Ο διεκπεραιωτής υπογράφει κάθε παράδοση με HMAC-SHA256, επαναλαμβάνει τις παροδικές αποτυχίες, παρακολουθεί την υγεία παράδοσης ανά webhook και απενεργοποιεί αυτόματα τα τελικά σημεία που αποτυγχάνουν συνεχώς.

## Υποστηριζόμενες εκδηλώσεις

Ο τύπος `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, που καταναλώνεται από `src/lib/webhookDispatcher.ts`) μοντελοποιεί επί του παρόντος επτά συμβάντα:

| Συμβάν                    | Φωτιές όταν                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Ένα αίτημα με πληρεξούσιο ολοκληρώνεται με επιτυχία                                                                                                |
| `request.failed`          | Ένα αίτημα μεσολάβησης αποτυγχάνει μετά από όλα τα retries/fallback                                                                                |
| `quota.exceeded`          | Ένα κλειδί API διασχίζει ένα όριο budget/quota                                                                                                     |
| `proxy.set_aside`         | Ένα μέλος της ομάδας μεσολάβησης παραμερίζεται μετά από επανειλημμένες αρνήσεις (μόνο μετάβαση)                                                    |
| `proxy.pool.exhausted`    | Κάθε μέλος του πεδίου συγκέντρωσης μεσολάβησης έχει παραμεριστεί                                                                                   |
| `provider.reset_redeemed` | Η αυτόματη εφαρμογή επαναφορών τραπεζικών ρυθμίσεων εξαργύρωσε μια πίστωση επαναφοράς ή την επαναφορά της εβδομαδιαίας περιόδου λειτουργίας Claude |
| `test.ping`               | Συνθετικό συμβάν που χρησιμοποιείται από το τελικό σημείο δοκιμής                                                                                  |

Οι συνδρομές δέχονται την κυριολεκτική `"*"` για να λαμβάνουν κάθε εκδήλωση. Τα άγνωστα ονόματα συμβάντων στο `events` αγνοούνται κατά τον χρόνο αποστολής.

> Σημείωση: ο διεκπεραιωτής API είναι ενσύρματος, αλλά οι τοποθεσίες κλήσης παραγωγής για ορισμένα από τα συμβάντα εκτός `test.ping` εξακολουθούν να προσγειώνονται. Ελέγξτε `grep dispatchEvent` για να δείτε ποιες διαδρομές καλούν αυτήν τη στιγμή τον διεκπεραιωτή στην κυκλοφορία σας.

## Αρχιτεκτονική

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

Η αποστολή είναι πυρ και ξεχνά για τον καλούντα: `Promise.allSettled` καταπίνει σφάλματα ανά webhook, ώστε ένας κακός δέκτης να μην μπορεί να μπλοκάρει τους άλλους.

## Υπογραφή HMAC

Όταν ένα webhook έχει `secret`, OmniRoute υπογράφει το σώμα JSON και στέλνει:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Τα ονόματα κεφαλίδων χρησιμοποιούν το πρόθεμα `X-Webhook-*` (όχι `X-OmniRoute-*`). Η τιμή υπογραφής είναι `sha256=<hex>` — επαληθεύστε το πλήρες πρόθεμα.

Εάν `createWebhook` καλείται χωρίς μυστικό, η λειτουργική μονάδα DB δημιουργεί ένα (`whsec_<48 hex>`) έτσι όλα τα webhook είναι υπογεγραμμένα από προεπιλογή.

### Επαλήθευση στον δέκτη

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Επαληθεύστε πάντα έναντι του **ακατέργαστος** σώμα αιτήματος, πριν από οποιαδήποτε ανάλυση JSON.

## Πολιτική επανάληψης προσπάθειας και αποτυχίας

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 δευτερόλεπτα τάιμ άουτ ανά προσπάθεια (`AbortController`).
- HTTP 2xx μετράει ως επιτυχία.
- HTTP 3xx/4xx μετράει ως μη επαναδοκιμήσιμη τελική κατάσταση — που καταγράφηκε ως παραδόθηκε με `success = res.ok`.
- Τα σφάλματα HTTP 5xx και δικτύου δοκιμάζονται ξανά με εκθετική υποχώρηση: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Μετά `maxRetries`, η παράδοση καταγράφεται ως αποτυχημένη.
- Κάθε παράδοση ενημερώνει `last_triggered_at`, `last_status` και είτε επαναφέρει είτε αυξάνει `failure_count`.
- Ο διεκπεραιωτής καλεί `disableWebhooksWithHighFailures(10)` μετά από κάθε fan-out, έτσι οποιοδήποτε webhook με `failure_count >= 10` απενεργοποιείται αυτόματα.

## Βάση δεδομένων

Πίνακας `webhooks` (μετανάστευση `011_webhooks.sql`):

| Στήλη               | Τύπος   | Σημειώσεις                                                            |
| ------------------- | ------- | --------------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                                  |
| `url`               | TEXT    | Προορισμός URL                                                        |
| `events`            | TEXT    | Συστοιχία JSON ; προεπιλεγμένο `["*"]`                                |
| `secret`            | TEXT    | μυστικό HMAC (δημιουργείται αυτόματα εάν δεν δοθεί)                   |
| `enabled`           | INT     | 0/1; προεπιλογή σε 1                                                  |
| `description`       | TEXT    | Προαιρετική ανθρώπινη ετικέτα                                         |
| `created_at`        | TEXT    | `datetime('now')`                                                     |
| `last_triggered_at` | TEXT    | Ενημερώνεται σε κάθε προσπάθεια παράδοσης                             |
| `last_status`       | INT     | Κατάσταση HTTP της τελευταίας προσπάθειας (0 δίκτυο = )               |
| `failure_count`     | INT     | Επαναφέρεται στο 0 σε περίπτωση επιτυχίας, + 1 σε περίπτωση αποτυχίας |

Το ιστορικό παράδοσης διατηρείται στον αποκλειστικό πίνακα `webhook_deliveries` (μετάβαση `069_webhook_deliveries.sql`, γραμμένο μέσω `src/lib/db/webhookDeliveries.ts::insertDelivery` σε κάθε προσπάθεια), επιπλέον των συγκεντρωτικών μετρητών στη σειρά `webhooks`. Τα είδη μεταδεδομένων (Slack / Discord / Telegram / προσαρμοσμένοι μετασχηματιστές ωφέλιμου φορτίου) προστέθηκαν από `070_webhooks_kind_metadata.sql`.

## REST API

Όλα τα τελικά σημεία απαιτούν εξουσιοδότηση διαχείρισης (`requireManagementAuth`).

| Τελικό σημείο                   | Μέθοδος | Περιγραφή                                       |
| ------------------------------- | ------- | ----------------------------------------------- |
| `/api/webhooks`                 | GET     | Λίστα webhooks (μυστικά καλυμμένα)              |
| `/api/webhooks`                 | POST    | Δημιουργία webhook                              |
| `/api/webhooks/[id]`            | GET     | Λεπτομέρεια Webhook (πλήρες μυστικό)            |
| `/api/webhooks/[id]`            | PUT     | Ενημέρωση πεδίων                                |
| `/api/webhooks/[id]`            | DELETE  | Αφαιρώ                                          |
| `/api/webhooks/[id]/test`       | POST    | Ενεργοποίηση `test.ping` (χωρίς επαναλήψεις)    |
| `/api/webhooks/[id]/deliveries` | GET     | Πρόσφατες προσπάθειες παράδοσης για ένα webhook |
| `/api/webhooks/validate-url`    | POST    | Επικύρωση URL πριν από την πτήση (SSRF guard)   |

`GET /api/webhooks` κρύβει το μυστικό του `<first 10 chars>...` για να αποφύγει τη διαρροή σε σελίδες καταχώρισης. Χρησιμοποιήστε το `[id]` GET όταν πραγματικά χρειάζεστε το μυστικό.

### Δημιουργία webhook

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

Εάν `secret` παραλειφθεί, ο διακομιστής δημιουργεί ένα μυστικό `whsec_<hex>` και το επιστρέφει στην απόκριση.

### Δοκιμή webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Επιστρέφει `{ delivered, status, error }`. Δεν επιχειρείται επανάληψη — χρήσιμη για γρήγορη επικύρωση ότι ο παραλήπτης αποδέχεται το ωφέλιμο φορτίο και την υπογραφή.

## Ταμπλό

Η σελίδα του πίνακα ελέγχου στο `/dashboard/webhooks` (δείτε `src/app/(dashboard)/dashboard/webhooks/page.tsx`) παρέχει:

- Create/edit συνδέεται με ένα εργαλείο επιλογής συμβάντων
- Ένδειξη κατάστασης (ενεργό / ανενεργό / σφάλμα) με βάση τα `enabled`, `failure_count` και `last_status`
- Παράδοση δοκιμής με ένα κλικ
- Χειροκίνητη εναλλαγή enable/disable

## Παραδείγματα ωφέλιμου φορτίου

### αίτημα.ολοκληρώθηκε

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

### δοκιμή.πινγκ

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

Τα σχήματα πεδίων για συμβάντα που δεν είναι `test.ping` ορίζονται από τις τοποθεσίες κλήσης που τις εκπέμπουν. Αντιμετωπίστε το αντικείμενο `data` ως συμβατό προς τα εμπρός (προσθέστε πεδία, μην εξαρτάτε από την απουσία).

## Βέλτιστες Πρακτικές

- **Επαληθεύστε την υπογραφή σε κάθε παράδοση** ενάντια στο ακατέργαστο σώμα — αποτρέπει το πλαστό POSTs από οποιονδήποτε μαντέψει το webhook σας URL.
- **Απαντήστε 2xx εντός ~ 5 δευτερολέπτων** — ο αποστολέας λήγει στα 10 δευτερόλεπτα. Οι αργοί δέκτες θα τρώνε ξανά και θα φουσκώσουν `failure_count`.
- **Κάντε τους χειριστές ανίκανους** Οι επαναλήψεις — και η σημασιολογία παράδοσης τουλάχιστον μία φορά σημαίνουν ότι είναι δυνατά διπλότυπα.
- **Εγγραφείτε ελάχιστα** — απαριθμεί μόνο τα γεγονότα που πραγματικά καταναλώνετε. `"*"` θα προσθέσει κόστος σε δέκτες που δεν ελέγχετε.
- **Παρακολουθήστε `failure_count`** Τα τελικά σημεία — απενεργοποιούνται αυτόματα σε 10 διαδοχικές αποτυχίες. επαναφέρετε καλώντας `PUT /api/webhooks/[id]` με `enabled: true` μετά τη διόρθωση του δέκτη.
- **Περιστρέψτε τα μυστικά περιοδικά** — `PUT` ένα νέο `secret`, αναπτύξτε τη νέα τιμή στον δέκτη και επιβεβαιώστε μέσω του τερματικού σημείου δοκιμής.

## Δείτε επίσης

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — πλήρης διαχείριση επιφάνεια API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — διακόπτης κυκλώματος / σημασιολογία cooldown πίσω από αστοχίες παρόχου που εμφανίστηκαν μέσω `request.failed`
- Πηγή: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
