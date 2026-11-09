# Webhooks (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sumber kebenaran:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute boleh melancarkan webhook HTTP pada acara platform. Gunakannya untuk disepadukan dengan Slack, PagerDuty, Datadog, perkhidmatan amaran dalaman atau mana-mana penerima HTTP.

Penghantar menandatangani setiap penghantaran dengan HMAC-SHA256, mencuba semula kegagalan sementara, menjejaki kesihatan penghantaran setiap webhook dan menyahdayakan titik akhir secara automatik yang terus gagal.

## Acara yang Disokong

Jenis `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, digunakan oleh `src/lib/webhookDispatcher.ts`) kini memodelkan tujuh acara:

| Peristiwa                 | Terbakar apabila                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Permintaan proksi berjaya diselesaikan                                                                                    |
| `request.failed`          | Permintaan proksi gagal selepas semua retries/fallback                                                                    |
| `quota.exceeded`          | Kunci API melepasi ambang budget/quota                                                                                    |
| `proxy.set_aside`         | Ahli kumpulan proksi diketepikan selepas penolakan berulang kali (peralihan sahaja)                                       |
| `proxy.pool.exhausted`    | Setiap ahli skop kumpulan proksi diketepikan                                                                              |
| `provider.reset_redeemed` | Gunakan tetapan semula bank secara automatik telah menebus kredit tetapan semula atau tetapan semula sesi mingguan Claude |
| `test.ping`               | Peristiwa sintetik yang digunakan oleh titik akhir ujian                                                                  |

Langganan menerima `"*"` literal untuk menerima setiap acara. Nama acara yang tidak diketahui dalam `events` diabaikan pada masa penghantaran.

> Nota: API penghantar berwayar, tetapi tapak panggilan pengeluaran untuk beberapa acara bukan `test.ping` masih mendarat. Semak `grep dispatchEvent` untuk melihat laluan yang sedang menggunakan penghantar dalam keluaran anda.

## Seni bina

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

Dispatch adalah api-dan-lupa untuk pemanggil: `Promise.allSettled` menelan ralat per-webhook supaya satu penerima yang buruk tidak dapat menyekat yang lain.

## Tandatangan HMAC

Apabila webhook mempunyai `secret`, OmniRoute menandatangani badan JSON dan menghantar:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Nama pengepala menggunakan awalan `X-Webhook-*` (bukan `X-OmniRoute-*`). Nilai tandatangan ialah `sha256=<hex>` — sahkan awalan penuh.

Jika `createWebhook` dipanggil tanpa rahsia, modul DB menjana satu (`whsec_<48 hex>`) supaya semua webhooks ditandatangani secara lalai.

### Mengesahkan pada penerima

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Sentiasa sahkan terhadap **mentah** badan permintaan, sebelum sebarang penghuraian JSON.

## Dasar Cuba Semula & Kegagalan

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Tamat masa 10 saat setiap percubaan (`AbortController`).
- HTTP 2xx dikira sebagai kejayaan.
- HTTP 3xx/4xx dikira sebagai status akhir yang tidak boleh dicuba semula — direkodkan sebagai dihantar dengan `success = res.ok`.
- HTTP 5xx dan ralat rangkaian dicuba semula dengan mundur eksponen: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Selepas `maxRetries`, penghantaran direkodkan sebagai gagal.
- Setiap penghantaran mengemas kini `last_triggered_at`, `last_status` dan sama ada menetapkan semula atau menambah `failure_count`.
- Penghantar memanggil `disableWebhooksWithHighFailures(10)` selepas setiap fan-out, jadi mana-mana webhook dengan `failure_count >= 10` dilumpuhkan secara automatik.

## Pangkalan data

Jadual `webhooks` (penghijrahan `011_webhooks.sql`):

| Lajur               | taip    | Nota                                                          |
| ------------------- | ------- | ------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                          |
| `url`               | TEXT    | URL destinasi                                                 |
| `events`            | TEXT    | susunan JSON ; `["*"]` lalai                                  |
| `secret`            | TEXT    | Rahsia HMAC (dijana secara automatik jika tidak diberikan)    |
| `enabled`           | INT     | 0/1; lalai kepada 1                                           |
| `description`       | TEXT    | Label manusia pilihan                                         |
| `created_at`        | TEXT    | `datetime('now')`                                             |
| `last_triggered_at` | TEXT    | Dikemas kini pada setiap percubaan penghantaran               |
| `last_status`       | INT     | Status HTTP percubaan terakhir (0 rangkaian = )               |
| `failure_count`     | INT     | Ditetapkan semula kepada 0 apabila berjaya, + 1 apabila gagal |

Sejarah penghantaran dikekalkan dalam jadual `webhook_deliveries` khusus (penghijrahan `069_webhook_deliveries.sql`, ditulis melalui `src/lib/db/webhookDeliveries.ts::insertDelivery` pada setiap percubaan), sebagai tambahan kepada pembilang agregat pada baris `webhooks`. Metadata jenis (Slack / Discord / Telegram / pengubah muatan tersuai) telah ditambahkan oleh `070_webhooks_kind_metadata.sql`.

## REST API

Semua titik akhir memerlukan pengesahan pengurusan (`requireManagementAuth`).

| Titik akhir                     | Kaedah | Penerangan                                          |
| ------------------------------- | ------ | --------------------------------------------------- |
| `/api/webhooks`                 | GET    | Senaraikan webhooks (rahsia bertopeng)              |
| `/api/webhooks`                 | POST   | Buat webhook                                        |
| `/api/webhooks/[id]`            | GET    | Butiran webhook (rahsia penuh)                      |
| `/api/webhooks/[id]`            | PUT    | Kemas kini medan                                    |
| `/api/webhooks/[id]`            | DELETE | Alih keluar                                         |
| `/api/webhooks/[id]/test`       | POST   | Nyalakan `test.ping` (tiada percubaan semula)       |
| `/api/webhooks/[id]/deliveries` | GET    | Percubaan penghantaran terbaharu untuk satu webhook |
| `/api/webhooks/validate-url`    | POST   | Pengesahan URL pra-penerbangan ( pengawal SSRF )    |

`GET /api/webhooks` menyembunyikan rahsia kepada `<first 10 chars>...` untuk mengelakkan kebocoran pada halaman penyenaraian. Gunakan `[id]` GET apabila anda benar-benar memerlukan rahsia itu.

### Buat webhook

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

Jika `secret` ditinggalkan, pelayan menjana rahsia `whsec_<hex>` dan mengembalikannya dalam respons.

### Uji webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Mengembalikan `{ delivered, status, error }`. Tiada percubaan semula — yang berguna untuk mengesahkan dengan cepat bahawa penerima menerima muatan dan tandatangan.

## Papan pemuka

Halaman papan pemuka di `/dashboard/webhooks` (lihat `src/app/(dashboard)/dashboard/webhooks/page.tsx`) menyediakan:

- Create/edit webhooks dengan pemilih acara
- Penunjuk status (aktif / tidak aktif / ralat) berdasarkan `enabled`, `failure_count` dan `last_status`
- Penghantaran ujian satu klik
- Togol enable/disable manual

## Contoh Muatan

### permintaan.selesai

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

### ujian.ping

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

Bentuk medan untuk acara bukan `test.ping` ditakrifkan oleh tapak panggilan yang memancarkannya; anggap objek `data` sebagai serasi ke hadapan (tambah medan, jangan bergantung pada ketidakhadiran).

## Amalan Terbaik

- **Sahkan tandatangan pada setiap penghantaran** terhadap badan mentah — menghalang POSTs palsu daripada sesiapa yang meneka URL webhook anda.
- **Balas 2xx dalam ~ 5 saat** — penghantar masa tamat pada 10 s. Penerima yang perlahan akan memakan percubaan semula dan mengembang `failure_count`.
- **Jadikan pengendali idempoten** — mencuba semula dan sekurang-kurangnya sekali semantik penghantaran bermakna pendua adalah mungkin.
- **Langgan secara minima** — senaraikan hanya acara yang anda benar-benar makan; `"*"` akan menambah kos pada penerima yang anda tidak kawal.
- **Tonton `failure_count`** Titik akhir — dilumpuhkan secara automatik pada 10 kegagalan berturut-turut; set semula dengan memanggil `PUT /api/webhooks/[id]` dengan `enabled: true` selepas membetulkan penerima.
- **Putar rahsia secara berkala** — `PUT` `secret` baharu , gunakan nilai baharu kepada penerima dan sahkan melalui titik akhir ujian.

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pengurusan penuh permukaan API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — pemutus litar / semantik cooldown di sebalik kegagalan pembekal muncul melalui `request.failed`
- Sumber: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
