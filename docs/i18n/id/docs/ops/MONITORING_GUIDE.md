# Monitoring & Observability Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute dilengkapi dengan pemantauan kesehatan bawaan, autopilot penyedia, pelacakan kuota, dan hook observabilitas. Panduan ini membahas dasbor, peringatan, dan pemecahan masalah.

**Sumber:**

- `src/lib/monitoring/observability.ts` — snapshot observabilitas
- `src/lib/monitoring/comboHealthAutopilot.ts` — autopilot kesehatan kombo
- `src/lib/monitoring/providerHealthAutopilot.ts` — autopilot penyedia
- `src/lib/monitoring/providerHealthMatrix.ts` — matriks kesehatan penyedia
- `src/lib/localHealthCheck.ts` — pemeriksaan kesehatan lokal
- `src/lib/tokenHealthCheck.ts` — kesehatan penyegaran token
- `src/lib/proxyHealth.ts` — cache kesehatan proksi (dibahas dalam PROXY_GUIDE.md)

---

## Ikhtisar

OmniRoute memiliki **3 lapisan pemantauan**:

```
┌──────────────────────────────────────────────────────────────┐
│  Lapisan 1: Kesehatan Sistem (tingkat server)                 │
│  ├─ localHealthCheck.ts — DB, port, dependensi native         │
│  ├─ db/healthCheck.ts — integritas, FK, artefak yatim         │
│  └─ Dasbor: /dashboard/health                                │
├──────────────────────────────────────────────────────────────┤
│  Lapisan 2: Kesehatan Penyedia (ketahanan per penyedia)       │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldown    │
│  ├─ providerHealthMatrix.ts — skor kesehatan per penyedia/model │
│  └─ Dasbor: /dashboard/providers                             │
├──────────────────────────────────────────────────────────────┤
│  Lapisan 3: Observabilitas Langsung (snapshot runtime)        │
│  ├─ observability.ts — circuit breaker, sesi, kuota           │
│  ├─ tokenHealthCheck.ts — kesehatan penyegaran token OAuth    │
│  └─ Alat MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Halaman Dasbor

### `/dashboard/health` (Kesehatan Sistem)

Dasbor kesehatan tingkat atas menampilkan:

| Bagian                     | Yang ditampilkan                                   |
| -------------------------- | -------------------------------------------------- |
| **Status server**          | Waktu aktif, versi, port, koneksi aktif            |
| **Database**               | Koneksi, integritas, ukuran WAL, migrasi terbaru   |
| **Ringkasan penyedia**     | Jumlah aktif, jumlah sehat, jumlah breaker terbuka |
| **Pemantau kuota**         | Sesi aktif, peringatan, kuota habis                |
| **Kesalahan terbaru**      | 10 kesalahan terakhir beserta stack trace          |
| **Penggunaan sumber daya** | Memori, CPU, indikator tekanan heap                |

### `/dashboard/providers` (Kesehatan Penyedia)

Dasbor per penyedia:

| Kolom     | Deskripsi                                                 |
| --------- | --------------------------------------------------------- |
| Penyedia  | ID penyedia + nama tampilan                               |
| Kesehatan | Status hijau/kuning/merah                                 |
| Sirkuit   | Status terbuka/tertutup/setengah terbuka                  |
| Koneksi   | Jumlah koneksi, penyegaran terakhir                       |
| Model     | Model yang tersedia, kesehatan per model                  |
| Biaya     | Biaya hari ini, tren 7 hari                               |
| Kesalahan | Jumlah kesalahan 24 jam terakhir, kelas kesalahan teratas |

Klik penyedia untuk melihat:

- Permintaan terbaru beserta perincian latensi
- Skor kesehatan per koneksi
- Penguncian per model
- Rekomendasi autopilot

### `/dashboard/quota` (Pelacakan Kuota)

Untuk setiap kunci API:

- Penggunaan saat ini dibandingkan dengan batas (bilah progres)
- Tren kuota (grafik 30 hari)
- Waktu reset berikutnya
- Riwayat peringatan

### `/dashboard/combos` (Kesehatan Kombo)

Per kombo:

- Strategi + target
- Kesehatan per target
- Peristiwa fallback terbaru
- Tingkat keberhasilan (24 jam, 7 hari, 30 hari)

---

## Pemeriksaan Kesehatan API

OmniRoute mengekspos** dua** permukaan kesehatan HTTP. Mereka tidak dapat dipertukarkan dengan orkestra.

| Jalur                        | Tujuan                                                           | Berat                                          | Gunakan untuk                                                                 |
| ---------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------- |
| `GET /healthz`               | Siklus hidup liveness/readiness (`ok` / `starting` / `stopping`) | Sepele (hanya tanda fase)                      | Kubernet** kesiapan** ; lembut** keaktifan** jika Anda harus menggunakan HTTP |
| `GET /api/monitoring/health` | Ringkasan penyedia + sistem dalam (DB, heap, jumlah katalog,…)   | Berat (sinkronisasi DB / pekerjaan pemantauan) | Dasbor, pemeriksaan mendalam blackbox, pemeriksaan kesehatan bawaan Docker    |

> **Catatan:** Matriks kesehatan penyedia, masalah autopilot, monitor kuota, kesehatan token, dan detail latensi di luar `/api/monitoring/health` tersedia melalui** alat MCP** `observability_snapshot` atau itu** dasbor** halaman — tidak ada rute REST khusus untuk itu.

Kedua rute tersebut berjalan di** loop acara Node yang sama** sebagai penanganan permintaan. Jalur yang terikat CPU (katalog `GET /v1/models` besar, kompresi konteks panjang/penghitungan token) dapat tertunda** semua** penangan HTTP, termasuk `/healthz`. Proses ≠ sibuk loop acara mati. Lebih suka memperbaiki babi; penyetelan probe hanya mengurangi pembunuhan palsu.

### Probe orkestrator yang ringan

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` ketika fase siklus hidup server siap
- **503** + `starting` / `stopping` saat boot atau shutdown
- Implementasi: `src/app/healthz/route.ts` (tidak ada ping DB )

### Kesehatan Sistem (dalam)

```bash
GET /api/monitoring/health
```

Tanggapan:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: probe-cache vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` adalah** pengukur probe-cache dalam memori** , bukan dump langsung dari `provider_connections.test_status`. Setelah #12532 jalur permintaan hanya membaca `getCachedCredentialHealthSummary()` ; pemeriksaan latar belakang menyegarkan cache dari loop peristiwa.

| Lapisan               | Di mana                                                               | Apa artinya                                                                                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pengukur probe-cache  | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Hasil pemeriksaan kesehatan kredensial terakhir masih disimpan dalam memori proses. `source` selalu `probe-cache`.                                                                                                 |
| Detail koneksi gagal  | `credentialHealth.failedConnections`                                  | Hadiah** hanya ketika `failed > 0`** . Daftar baris cache yang dibatasi dengan `status=error` (`connectionId`, `status`, disanitasi `lastError` / `lastErrorType`). `failedOmitted` diatur ketika daftar dibatasi. |
| status lengket SQLite | `credentialHealth.staleDbNonOkCount`                                  | Jumlah** aktif** (`is_active=1`) baris koneksi yang `test_status` -nya masih diketahui non-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                   |

Kedua lapisan tersebut dapat berbeda pendapat dengan sengaja:

- Ukur `failed=0` saat `staleDbNonOkCount>0` — SQLite masih memiliki `test_status` yang lengket (misalnya `expired` atau `credits_exhausted`) sehingga snapshot probe-cache terbaru tidak dihitung sebagai `status=error`.
- Mengukur `failed>0` sementara SQLite terlihat sehat — pemeriksaan terbaru gagal dan di-cache; baris DB belum diperbarui, atau kemudian dihapus.

Jangan hanya waspada pada `provider_connections.test_status` saat menggores titik akhir ini. Gunakan `failed` + `failedConnections` untuk kegagalan pemeriksaan langsung, dan `staleDbNonOkCount` saat Anda memerlukan penghitungan status tempel yang bertahan.

### Rekomendasi penyelidikan Kubernetes

OmniRoute adalah a** proses Node tunggal** (satu putaran peristiwa). Stok Docker `HEALTHCHECK` menargetkan `/healthz` yang ringan. `/api/monitoring/health` adalah** terlalu berat** untuk interval keaktifan kubelet.

| Menguji                     | Sasaran yang direkomendasikan                                                     | Catatan                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rintisan**                | HTTP `GET /healthz` dengan `failureThreshold` panjang (atau `startPeriod` besar)  | Migrasi + SQLite awal yang dingin dapat melebihi beberapa detik                                                                                                                                                                                                                                                                                                              |
| **Kesiapan**                | HTTP `GET /healthz`                                                               | Siklus hidup `ok` / `starting` / `stopping` (200 vs 503). Masih mengepak jika loop diblokir CPU. A** 200 dalam beberapa detik tidak sehat** (#10303) — itu berarti loop peristiwa kelaparan sebelum penangan 3-byte dijalankan                                                                                                                                               |
| **keaktifan**               | HTTP `GET /livez`,** atau TCP** pada port layanan utama (`PORT`, default `20128`) | `/livez` hanya proses yang hidup (selalu 200 jika handler dijalankan). Ia masih membagikan loop peristiwa — busy ≠ dead, dan tidak mendeteksi kelaparan loop peristiwa (#10303) lebih baik daripada TCP. Lebih menyukai**TCP** jika waktu pemeriksaan HTTP habis di bawah beban catalog/compression ; Mengerjakan** bukan** matikan pod pada event loop pendek yang terhenti |
| **Kesehatan yang mendalam** | `GET /api/monitoring/health` dari pemeriksa eksternal                             | Bukan untuk kubelet `livenessProbe` / ketat `readinessProbe`                                                                                                                                                                                                                                                                                                                 |

Contoh bentuk (sesuaikan ambang batas dengan start dingin dan beban kompresi):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**Tidak** titik kubelet** keaktifan** di `/api/monitoring/health`. Jalur itu berfungsi DB/monitoring nyata dan akan menjadi positif palsu saat dimuat.

Terkait: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (menyelidiki saat loop acara sedang sibuk), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (babi harga katalog), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (babi jumlah token kompresi).

### pengawas systemd (loop acara beku)

Pada host systemd, OmniRoute memberi tahu manajer layanan ketika sudah siap dan terus melakukan ping, sehingga server yang loop peristiwanya macet akan dimatikan dan dimulai ulang alih-alih tetap aktif dan diam. Ping berasal dari loop peristiwa server sendiri: ketika diblokir, ping tersebut berhenti, dan systemd memulai ulang layanan setelah `WatchdogSec` berlalu tanpa satu pun.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) sudah menulis unit pengguna dengan ini. Unit yang Anda tulis sendiri (default `Type=simple`) tidak mendapat pengawas, jadi tambahkan baris ini ke bagian `[Service]` :

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Unit yang dihasilkan menyetel `Restart=on-failure`, jadi tambahkan baris itu juga — tanpanya, pengawas hanya akan mematikan layanan yang macet alih-alih memulai ulang.

- `Type=notify`: layanan "dimulai" saat server mengirimkan `READY=1`, bukan saat proses bercabang. `TimeoutStartSec` membatasi awal yang lambat.
- `NotifyAccess=all`: ping dikirim oleh proses server, yang merupakan anak dari supervisor `omniroute serve`.
- `WatchdogSec`: ping keluar setiap 60 detik, jadi gunakanlah** 120 atau lebih** . Nilai yang lebih kecil akan memulai ulang server yang sehat.
- Jalankan `omniroute serve` di latar depan. `--daemon` melepaskan server dari cgroup unit dan jabat tangan pemberitahuan tidak pernah selesai.

Periksa apakah itu aktif setelah restart:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` menunjukkan penundaan yang dikonfigurasi dan `WatchdogTimestamp` bergerak maju setiap menit. Restart yang disebabkan oleh pengawas dicatat sebagai `Result=watchdog`. Untuk mematikan ping sambil menjaga unit tetap seperti semula, setel `OMNIROUTE_DISABLE_SD_NOTIFY=1`; tanpa `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) tidak ada yang dikirim.

Pengawas hanya memeriksa apakah perulangan peristiwa terus berjalan. Server yang lambat tapi tetap berputar tidak di restart.

### Pekerjaan jalur permintaan opsional (memori, keterampilan, penyegaran token)

Ekstraksi memori, injeksi keterampilan, dan penyegaran token OAuth berbagi** loop acara Node utama** dengan `/healthz`. Itu adalah fitur dashboard-toggle (`memoryEnabled`, `skillsEnabled`), bukan kumpulan pekerja. Lihat [Biaya perulangan peristiwa Lingkungan —](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Kesehatan Penyedia

> **Tidak ada titik akhir REST.** Data kesehatan penyedia tersedia melalui alat MCP `observability_snapshot` atau halaman dasbor `/dashboard/providers`.

### Detil Penyedia

> **Tidak ada titik akhir REST.** Detail per penyedia tersedia melalui halaman dasbor `/dashboard/providers`.

---

## Autopilot Kesehatan Penyedia

Modul `providerHealthAutopilot.ts` adalah **sistem yang dapat memulihkan diri sendiri** yang:

1. Mendeteksi masalah penyedia (sirkuit terbuka, cooldown, penguncian, peringatan kuota)
2. Menghasilkan **tindakan yang direkomendasikan** untuk mengatasinya
3. Secara opsional **menjalankan otomatis** tindakan berisiko rendah

### Jenis Masalah yang Terdeteksi

| Jenis masalah                | Tingkat keparahan | Contoh kondisi                              |
| ---------------------------- | ----------------- | ------------------------------------------- |
| `provider_circuit_open`      | kritis            | Circuit breaker terbuka setelah 5 kegagalan |
| `provider_circuit_half_open` | peringatan        | Sirkuit sedang menguji pemulihan            |
| `connection_cooldown`        | peringatan        | Koneksi dalam cooldown setelah 429          |
| `stale_connection_error`     | peringatan        | Penyegaran terakhir gagal 30+ menit lalu    |
| `terminal_connection_error`  | kritis            | OAuth dicabut, kunci tidak valid            |
| `inactive_connection`        | info              | Koneksi dinonaktifkan dalam pengaturan      |
| `model_lockout`              | peringatan        | Model tertentu dalam karantina              |
| `quota_monitor_warning`      | peringatan        | Penggunaan kuota mencapai 80%+              |

### Jenis Tindakan yang Dihasilkan

| Tindakan                       | Risiko | Deskripsi                                   |
| ------------------------------ | ------ | ------------------------------------------- |
| `clear_provider_breaker`       | sedang | Atur ulang circuit breaker menjadi tertutup |
| `clear_connection_cooldown`    | rendah | Hapus cooldown dari koneksi                 |
| `clear_stale_connection_error` | rendah | Hapus penanda kesalahan lama                |
| `clear_model_lockout`          | rendah | Aktifkan kembali model yang dikarantina     |
| `reactivate_connection`        | sedang | Aktifkan kembali koneksi yang dinonaktifkan |
| `deactivate_connection`        | tinggi | Nonaktifkan koneksi yang bermasalah         |

### API

> **Tidak ada endpoint REST.** Masalah autopilot tersedia melalui alat MCP `observability_snapshot` atau dasbor. Autopilot berjalan secara internal; perilakunya dikonfigurasi melalui DB pengaturan (kolom `autopilotMode` per koneksi), bukan variabel lingkungan — `grep -rn` untuk variabel lingkungan mode autopilot tidak menghasilkan temuan.

### Mode Autopilot

Secara default, autopilot beroperasi dalam **mode manual** — autopilot mendeteksi masalah dan menghasilkan tindakan yang direkomendasikan, tetapi tidak menerapkannya secara otomatis. Tindakan dapat diterapkan melalui dasbor.

---

## Autopilot Kesehatan Combo

`comboHealthAutopilot.ts` adalah padanan autopilot penyedia yang **khusus untuk combo**. Modul ini:

- Mendeteksi combo yang tidak sehat
- Merekomendasikan pengurutan ulang target
- Menyarankan penonaktifan target yang rusak
- Menghapus target yang mati secara otomatis setelah N kegagalan

### Contoh Masalah Combo

```
Combo "always-on" (strategi prioritas)
├─ Target 1: openai/gpt-5 (sehat)
├─ Target 2: anthropic/claude-opus-4-6 (⚠️ model terkunci hingga 14:00)
└─ Target 3: kiro/claude-sonnet-4-5 (sehat)

Tindakan yang direkomendasikan: Urutkan ulang — pindahkan kiro ke atas anthropic hingga penguncian berakhir
```

---

## Monitor Kuota

`observability.ts` menyediakan **monitor kuota per sesi** untuk penyedia langganan (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Arti Status

| Status      | Kapan                           | Tindakan UI                                |
| ----------- | ------------------------------- | ------------------------------------------ |
| `starting`  | Polling awal sedang berlangsung | Spinner                                    |
| `idle`      | Tidak ada aktivitas terkini     | Disembunyikan dari dasbor                  |
| `healthy`   | Sisa kuota > 50%                | Titik hijau                                |
| `warning`   | Sisa kuota < 50%                | Peringatan kuning                          |
| `exhausted` | Kuota = 0%                      | Blok merah, arahkan ke penyedia berikutnya |
| `error`     | Polling gagal                   | Titik merah, segera coba lagi              |

### API

> **Tidak ada endpoint REST.** Data monitor kuota tersedia melalui alat MCP `observability_snapshot` atau dasbor.

---

## Snapshot Observabilitas

Tool MCP `observability_snapshot` mengembalikan **snapshot sistem lengkap** untuk agen AI:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* lihat di atas */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agen menggunakan ini untuk membuat **keputusan perutean** — misalnya, "jika sirkuit openai terbuka, rutekan ke anthropic terlebih dahulu".

---

## Pemeriksaan Kondisi Token

Penyedia OAuth (Claude Code, GitHub Copilot, Cursor) memerlukan **penyegaran token secara berkala**. `src/lib/tokenHealthCheck.ts` menjalankan penjadwal di latar belakang:

- **Tick pemindaian**: setiap 60 detik (pemindaian dalam `TICK_MS = 60 * 1000` di `src/lib/tokenHealthCheck.ts:30`)
- **Interval pemeriksaan kondisi per koneksi**: default 60 menit (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); dapat dikonfigurasi melalui basis data pengaturan
- **Penyegaran preemtif saat 401**: ditangani oleh interceptor per koneksi

### Status Kondisi Token

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfigurasi

Konfigurasi pemeriksaan kondisi token ditangani secara internal oleh `tokenHealthCheck.ts`.

### Kondisi Token

> **Tidak ada endpoint REST.** Data kondisi token tersedia melalui dasbor atau tool MCP `observability_snapshot`.

---

## Peringatan

### Kanal Bawaan

OmniRoute mendukung **3 kanal peringatan**:

| Kanal         | Penyiapan          | Kasus penggunaan             |
| ------------- | ------------------ | ---------------------------- |
| Banner dasbor | Selalu aktif       | Notifikasi dalam aplikasi    |
| Webhook       | Konfigurasikan URL | Slack, Discord, PagerDuty    |
| Log           | Default            | Untuk agregasi log eksternal |

### Konfigurasi Webhook

> **Catatan:** Konfigurasi peringatan webhook ditangani melalui halaman Pengaturan di dasbor. Lihat UI Pengaturan untuk URL webhook, pemfilteran peristiwa, dan penyesuaian payload.

### Jenis Peringatan

| Peringatan                   | Kapan                                      | Tingkat keparahan default |
| ---------------------------- | ------------------------------------------ | ------------------------- |
| `provider_circuit_open`      | Sirkuit terbuka                            | kritis                    |
| `provider_circuit_half_open` | Sirkuit sedang menguji pemulihan           | info                      |
| `quota_warning`              | Kuota mencapai 80%+                        | peringatan                |
| `quota_exhausted`            | Kuota mencapai 100%                        | kritis                    |
| `token_refresh_failed`       | 3+ kegagalan penyegaran berturut-turut     | peringatan                |
| `token_expired`              | Token telah melewati masa kedaluwarsa      | kritis                    |
| `combo_target_unhealthy`     | Target kombinasi dalam cooldown selama 1j+ | peringatan                |
| `db_integrity_warning`       | Pelanggaran FK > 0                         | peringatan                |
| `heap_pressure`              | Penggunaan heap > 80% dari ambang batas    | peringatan                |

---

## Metrik Performa

### Metrik yang Dilacak

| Metrik                  | Jenis      | Sumber                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | penghitung | `services/usage.ts`             |
| `request_latency_ms`    | histogram  | `services/usage.ts`             |
| `tokens_consumed`       | penghitung | `services/usage.ts`             |
| `cost_usd`              | penghitung | `services/usage.ts`             |
| `provider_errors`       | penghitung | `services/errorClassifier.ts`   |
| `circuit_state_changes` | penghitung | `services/resilience.ts`        |
| `cache_hits`            | penghitung | `services/signatureCache.ts`    |
| `compression_savings`   | histogram  | `services/compression/stats.ts` |
| `quota_used`            | pengukur   | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | pengukur   | `observability.ts`              |

### Persentil Latensi (p50/p95/p99)

> **Tidak ada endpoint REST.** Data persentil latensi tersedia melalui halaman dasbor `/dashboard/health`. Ekspor Prometheus/OpenTelemetry direncanakan untuk v3.9.

### Ekspor Prometheus / OpenTelemetry (Fase 2)

Direncanakan untuk v3.9: ekspor native ke Prometheus, OpenTelemetry, dan Datadog.

Untuk saat ini, lakukan scraping pada `/api/monitoring/health` dengan sistem pemantauan berbasis HTTP apa pun (Prometheus blackbox exporter, pemeriksaan HTTP Datadog, dan sebagainya).

---

## Panduan Peringatan

### Slack

> **Catatan:** Peringatan webhook dikonfigurasi melalui halaman Pengaturan dasbor — tidak ada variabel lingkungan khusus untuk webhook (`grep -rn` tidak menemukan hasil). Lihat UI Pengaturan untuk URL webhook, pemfilteran peristiwa, dan penyesuaian payload.

### Discord

> Peringatan webhook menggunakan alur UI Pengaturan yang sama seperti Slack. Discord menerima struktur payload JSON yang sama.

### PagerDuty

> Peringatan webhook menggunakan alur UI Pengaturan yang sama. Kunci perutean PagerDuty Events API v2 dikonfigurasi di UI Pengaturan.

### Webhook Kustom (JSON)

> Endpoint HTTP apa pun yang menerima POST dengan isi JSON dapat digunakan. Konfigurasikan URL di UI Pengaturan.

---

## Konfigurasi Dasbor

### Menyesuaikan Dasbor Kesehatan

Buat `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Menyematkan Penyedia ke Bagian Teratas

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Pemecahan Masalah

### "Penyedia menyatakan sehat, tetapi permintaan gagal"

1. Periksa **masalah autopilot** — mungkin suatu model sedang dikunci
2. Lihat **kesalahan terbaru** untuk kelas kesalahan tertentu
3. Coba **uji koneksi** pada kartu penyedia
4. Periksa apakah penyedia **dibatasi lajunya di upstream** (tidak terlihat secara lokal)

### "Kuota dinyatakan sehat, tetapi saya melihat respons 429"

- 429 berarti penyedia menyatakan bahwa Anda telah menggunakan kuota Anda
- Pelacakan kuota OmniRoute mungkin **kedaluwarsa** — sumber kebenaran penyedia berada di upstream
- Data kuota diperbarui secara otomatis melalui pemantau kuota internal

### "Kombinasi gagal, tetapi semua target terlihat sehat"

- Periksa dasbor **kesehatan kombinasi** untuk masalah pengurutan target
- Lihat **peristiwa fallback** — mungkin kombinasi menghabiskan target terlalu cepat
- Pastikan **strategi** sesuai dengan kasus penggunaan Anda (prioritas vs round-robin vs otomatis)

### "Pemeriksaan kesehatan basis data gagal"

- Jalankan `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Jika hasilnya "ok" — alarm palsu, pemeriksaan kesehatan terlalu ketat
- Jika hasilnya berbeda — **hentikan OmniRoute** dan ikuti [panduan pemulihan bencana](./DATABASE_GUIDE.md#disaster-recovery)

### "Tekanan heap memori berada pada tingkat kritis"

```bash
# Periksa heap saat ini
node -e "console.log(process.memoryUsage())"

# Picu GC secara manual (jika --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Kurangi permintaan serentak (atur melalui halaman Pengaturan dasbor, bukan variabel lingkungan)
# Tidak ada variabel lingkungan `MAX_CONCURRENT_REQUESTS` — konfigurasikan di Pengaturan → Konkurensi.
```

---

## Lihat Juga

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — pelacakan penggunaan & biaya
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — skema DB + kesehatan
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — kesehatan proksi (cache terpisah)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — arsitektur sistem
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — detail circuit breaker
- Sumber: `src/lib/monitoring/` (4 berkas, 2121 LOC)
