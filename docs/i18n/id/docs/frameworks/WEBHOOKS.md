# Webhooks (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sumber kebenaran:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Terakhir diperbarui:** 28-06-2026 — v3.8.40

OmniRoute dapat mengaktifkan webhook HTTP pada acara platform. Gunakan mereka untuk berintegrasi dengan Slack, PagerDuty, Datadog, layanan peringatan internal, atau penerima HTTP apa pun.

Petugas operator menandatangani setiap pengiriman dengan HMAC-SHA256, mencoba kembali kegagalan sementara, melacak kesehatan pengiriman per webhook, dan menonaktifkan secara otomatis titik akhir yang terus gagal.

## Acara yang Didukung

Tipe `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, digunakan oleh `src/lib/webhookDispatcher.ts`) saat ini memodelkan tujuh peristiwa:

| Peristiwa                 | Kebakaran kapan                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Permintaan yang diproksi berhasil diselesaikan                                                                             |
| `request.failed`          | Permintaan proksi gagal setelah semua retries/fallback                                                                     |
| `quota.exceeded`          | Kunci API melewati ambang batas budget/quota                                                                               |
| `proxy.set_aside`         | Anggota kumpulan proxy disisihkan setelah penolakan berulang kali (hanya transisi)                                         |
| `proxy.pool.exhausted`    | Setiap anggota ruang lingkup kumpulan proksi disisihkan                                                                    |
| `provider.reset_redeemed` | Terapkan otomatis penyetelan ulang bank yang menukarkan kredit penyetelan ulang atau penyetelan ulang sesi mingguan Claude |
| `test.ping`               | Peristiwa sintetik yang digunakan oleh titik akhir pengujian                                                               |

Langganan menerima `"*"` literal untuk menerima setiap acara. Nama acara yang tidak diketahui di `events` diabaikan pada waktu pengiriman.

> Catatan: operator API terhubung dengan kabel, tetapi situs panggilan produksi untuk beberapa peristiwa non-`test.ping` masih terhubung. Periksa `grep dispatchEvent` untuk melihat jalur mana yang saat ini memanggil petugas operator dalam rilis Anda.

## Arsitektur

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

Pengiriman sangat mudah bagi penelepon: `Promise.allSettled` menerima kesalahan per-webhook sehingga satu penerima yang buruk tidak dapat memblokir yang lain.

## Penandatanganan HMAC

Ketika webhook memiliki `secret`, OmniRoute menandatangani isi JSON dan mengirimkan:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Header names use the `X-Webhook-*` prefix (not `X-OmniRoute-*`). Nilai tanda tangannya adalah `sha256=<hex>` — verifikasi awalan lengkap.

Jika `createWebhook` dipanggil tanpa rahasia, modul DB akan menghasilkan satu (`whsec_<48 hex>`) sehingga semua webhook ditandatangani secara default.

### Memverifikasi pada penerima

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Selalu verifikasi terhadap **mentah** badan permintaan, sebelum penguraian JSON apa pun.

## Kebijakan Coba Ulang & Kegagalan

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Batas waktu 10 detik per upaya (`AbortController`).
- HTTP 2xx dianggap sukses.
- HTTP 3xx/4xx dihitung sebagai status akhir yang tidak dapat dicoba ulang — dicatat sebagai dikirimkan dengan `success = res.ok`.
- HTTP 5xx dan kesalahan jaringan dicoba ulang dengan backoff eksponensial: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Setelah `maxRetries`, pengiriman dicatat gagal.
- Setiap pengiriman memperbarui `last_triggered_at`, `last_status`, dan menyetel ulang atau menambah `failure_count`.
- Petugas operator memanggil `disableWebhooksWithHighFailures(10)` setelah setiap fan-out, sehingga webhook apa pun dengan `failure_count >= 10` dinonaktifkan secara otomatis.

## Basis data

Tabel `webhooks` (migrasi `011_webhooks.sql`):

| Kolom               | Jenis   | Catatan                                                        |
| ------------------- | ------- | -------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                           |
| `url`               | TEXT    | Tujuan URL                                                     |
| `events`            | TEXT    | susunan JSON ; `["*"]` bawaan                                  |
| `secret`            | TEXT    | Rahasia HMAC (dihasilkan secara otomatis jika tidak diberikan) |
| `enabled`           | INT     | 0/1; defaultnya adalah 1                                       |
| `description`       | TEXT    | Label manusia opsional                                         |
| `created_at`        | TEXT    | `datetime('now')`                                              |
| `last_triggered_at` | TEXT    | Diperbarui pada setiap upaya pengiriman                        |
| `last_status`       | INT     | Status HTTP dari upaya terakhir (0 jaringan = )                |
| `failure_count`     | INT     | Reset ke 0 jika berhasil, + 1 jika gagal                       |

Riwayat pengiriman disimpan dalam tabel `webhook_deliveries` khusus (migrasi `069_webhook_deliveries.sql`, ditulis melalui `src/lib/db/webhookDeliveries.ts::insertDelivery` pada setiap upaya), selain penghitung agregat pada baris `webhooks`. Jenis metadata (Slack / Discord / Telegram / transformator muatan khusus) telah ditambahkan oleh `070_webhooks_kind_metadata.sql`.

## REST API

Semua titik akhir memerlukan autentikasi manajemen (`requireManagementAuth`).

| Titik akhir                     | Metode | Keterangan                                        |
| ------------------------------- | ------ | ------------------------------------------------- |
| `/api/webhooks`                 | GET    | Daftar webhook (rahasia terselubung)              |
| `/api/webhooks`                 | POST   | Buat webhook                                      |
| `/api/webhooks/[id]`            | GET    | Detail webhook (rahasia lengkap)                  |
| `/api/webhooks/[id]`            | PUT    | Perbarui bidang                                   |
| `/api/webhooks/[id]`            | DELETE | Menghapus                                         |
| `/api/webhooks/[id]/test`       | POST   | Tembakkan `test.ping` (tidak ada percobaan ulang) |
| `/api/webhooks/[id]/deliveries` | GET    | Upaya pengiriman terbaru untuk satu webhook       |
| `/api/webhooks/validate-url`    | POST   | Validasi URL pra-penerbangan (penjaga SSRF )      |

`GET /api/webhooks` menutupi rahasia `<first 10 chars>...` untuk menghindari kebocoran pada halaman daftar. Gunakan `[id]` GET ketika Anda benar-benar membutuhkan rahasianya.

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

Jika `secret` dihilangkan, server menghasilkan rahasia `whsec_<hex>` dan mengembalikannya sebagai respons.

### Uji webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Mengembalikan `{ delivered, status, error }`. Tidak ada percobaan ulang yang dilakukan — yang berguna untuk memvalidasi dengan cepat bahwa penerima menerima payload dan tanda tangan.

## Dasbor

Halaman dasbor di `/dashboard/webhooks` (lihat `src/app/(dashboard)/dashboard/webhooks/page.tsx`) menyediakan:

- Webhook Create/edit dengan pemilih peristiwa
- Indikator status (aktif / tidak aktif / error) berdasarkan `enabled`, `failure_count`, dan `last_status`
- Pengiriman tes sekali klik
- Pengalih enable/disable manual

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

### tes.ping

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

Bentuk bidang untuk kejadian non-`test.ping` ditentukan oleh situs panggilan yang memancarkannya; perlakukan objek `data` sebagai kompatibel ke depan (tambahkan bidang, jangan bergantung pada ketidakhadiran).

## Praktik Terbaik

- **Verifikasi tanda tangan pada setiap pengiriman** terhadap tubuh mentah — mencegah POSTs palsu dari siapa pun yang menebak webhook Anda URL.
- **Respons 2xx dalam ~ 5 detik** — waktu operator habis pada 10 detik. Penerima yang lambat akan memakan percobaan ulang dan mengembangkan `failure_count`.
- **Jadikan penangan idempoten** Percobaan ulang — dan semantik pengiriman setidaknya sekali berarti duplikat mungkin terjadi.
- **Berlangganan minimal** — hanya mencantumkan acara yang benar-benar Anda konsumsi; `"*"` akan menambah biaya pada receiver yang tidak Anda kendalikan.
- **Tonton `failure_count`** Titik akhir — dinonaktifkan secara otomatis jika terjadi 10 kegagalan berturut-turut; reset dengan memanggil `PUT /api/webhooks/[id]` dengan `enabled: true` setelah memperbaiki receiver.
- **Putar rahasia secara berkala** — `PUT` adalah `secret` baru, terapkan nilai baru ke penerima, dan konfirmasi melalui titik akhir pengujian.

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — manajemen penuh permukaan API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — pemutus sirkuit / semantik cooldown di balik kegagalan penyedia muncul melalui `request.failed`
- Sumber: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
