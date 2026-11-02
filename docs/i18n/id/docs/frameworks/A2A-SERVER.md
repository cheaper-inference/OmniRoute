# OmniRoute A2A Server Documentation (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protokol Agent-to-Agent v0.3 — OmniRoute sebagai agen perutean cerdas

Permukaan A2A memiliki dua antarmuka:

- **JSON-RPC 2.0** pada `POST /a2a` (titik masuk kanonis, didefinisikan dalam `src/app/a2a/route.ts`).
- **REST** di bawah `/api/a2a/*` untuk dasbor dan alat bantu (status, daftar tugas, pembatalan).

Tugas dilacak oleh `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL bawaan 5 menit). Skill diteruskan melalui `A2A_SKILL_HANDLERS` dalam `src/lib/a2a/taskExecution.ts`.

## Penemuan Agen

```bash
curl http://localhost:20128/.well-known/agent.json
```

Mengembalikan Kartu Agen yang menjelaskan kemampuan, skill, dan persyaratan autentikasi OmniRoute.

Kolom `version` pada Kartu Agen bersumber dari `process.env.npm_package_version` (lihat `src/app/.well-known/agent.json/route.ts:13`), sehingga selalu tersinkronisasi secara otomatis dengan `package.json` pada setiap rilis.

---

## Autentikasi

Semua permintaan `/a2a` memerlukan kunci API melalui header `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jika tidak ada kunci API yang dikonfigurasi pada server, autentikasi akan dilewati.

## Pengaktifan

A2A dikendalikan oleh sakelar **Endpoints → A2A** dan dinonaktifkan secara default. Saat dinonaktifkan,
`GET /api/a2a/status` melaporkan `status: "disabled"` dan `online: false`; panggilan JSON-RPC ke
`POST /a2a` mengembalikan HTTP 503 dengan kode kesalahan JSON-RPC `-32000`.

---

## Metode JSON-RPC 2.0

### `message/send` — Eksekusi Sinkron

Mengirim pesan ke suatu skill dan menunggu respons lengkap.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

Untuk `smart-routing`, `metadata.combo` merupakan penggantian eksplisit terhadap
`metadata.model` untuk permintaan gateway; nilai tersebut dikirim sebagai `model` yang sebenarnya,
bukan sebagai bidang JSON `x-combo` yang diabaikan. Otorisasi normal gateway berdasarkan kunci API dan
per target tetap berlaku. Combo yang tidak valid atau kosong akan ditolak.

Hasilnya menampilkan `requested_combo` (maksud pemanggil), `dispatched_model`
(permintaan gateway yang sebenarnya), `response_model` (respons gateway), dan
`confirmed_combo`. Bidang terakhir bernilai `null` kecuali gateway secara eksplisit
mengidentifikasi suatu combo. Log keputusan A2A mengatribusikan eksekusi hanya kepada
combo yang telah dikonfirmasi, sementara permintaan yang belum dikonfirmasi tetap disimpan sebagai `requestedCombo`.

**Respons:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — Streaming SSE

Sama seperti `message/send`, tetapi mengembalikan Server-Sent Events untuk streaming waktu nyata.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**Peristiwa SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Memeriksa Status Tugas

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Membatalkan Tugas

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Keterampilan yang Tersedia

OmniRoute memperlihatkan 6 keterampilan A2A yang dihubungkan ke `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Setiap modul keterampilan ada di `src/lib/a2a/skills/`.

| Keahlian          | ID                   | Keterangan                                                                                                                                                        | Tag                             | Contoh                                         |
| :---------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ | :--------------------------------------------- |
| Perutean Cerdas   | `smart-routing`      | Merutekan prompt melalui provider/combo optimal menggunakan skor + mesin kombo OmniRoute                                                                          | perutean, penyedia              | "Rutekan permintaan ini melalui model terbaik" |
| Manajemen Kuota   | `quota-management`   | Melaporkan status kuota per penyedia, membantu penelepon memutuskan kapan harus melakukan throttle/switch                                                         | kuota, penyedia                 | "Periksa kuota untuk antropik"                 |
| Penemuan Penyedia | `provider-discovery` | Mencantumkan penyedia terinstal dengan kemampuan, tanda tingkat gratis, status OAuth                                                                              | penyedia, penemuan              | “Penyedia apa saja yang tersedia?”             |
| Analisis Biaya    | `cost-analysis`      | Memperkirakan biaya request/conversation berdasarkan katalog + penggunaan terkini                                                                                 | biaya, penggunaan               | "Perkirakan biaya untuk percakapan ini"        |
| Laporan Kesehatan | `health-report`      | Agregat pemutus sirkuit, cooldown, status penguncian per penyedia                                                                                                 | kesehatan, ketahanan            | "Tampilkan status kesehatan semua penyedia"    |
| Daftar Kemampuan  | `list-capabilities`  | Mengembalikan katalog Keahlian Agen 45 entri lengkap (23 API + 21 CLI + 1 config) sebagai tabel penurunan harga dengan SKILL.md URLs mentah untuk injeksi konteks | katalog, penemuan, keterampilan | "Daftar semua kemampuan OmniRoute "            |

> Kartu Agen harus tetap selaras dengan katalog penyedia 377 langsung; jumlah penyedia dan metadata free/no-auth bersumber dari registri runtime.

### `list-capabilities` Detail Keterampilan

Keterampilan `list-capabilities` sangat berguna bagi agen eksternal yang perlu mengetahui apa yang diekspos OmniRoute sebelum mengirim panggilan API. Ini mengembalikan artefak tabel penurunan harga terstruktur:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Setiap baris menyertakan kolom `rawUrl` sehingga agen dapat segera mengambil SKILL.md secara lengkap. Bidang `metadata.totalSkills` mencerminkan ukuran katalog (45 hari ini). Implementasi: `src/lib/a2a/skills/listCapabilities.ts`. Lihat juga [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (tambahan)

Endpoint JSON-RPC `/a2a` adalah titik masuk A2A kanonis. Endpoint REST di bawah ini menyediakan akses tambahan untuk dasbor dan alat eksternal:

| Endpoint                     | Metode | Deskripsi                                                  | Autentikasi                                  |
| :--------------------------- | :----- | :--------------------------------------------------------- | :------------------------------------------- |
| `/api/a2a/status`            | GET    | Status server, skill yang terdaftar                        | (publik)                                     |
| `/api/a2a/tasks`             | GET    | Daftar tugas dengan filter                                 | manajemen                                    |
| `/api/a2a/tasks/[id]`        | GET    | Dapatkan tugas berdasarkan ID                              | manajemen                                    |
| `/api/a2a/tasks/[id]/cancel` | POST   | Batalkan tugas yang sedang berjalan                        | manajemen                                    |
| `/.well-known/agent.json`    | GET    | Agent Card (penemuan A2A)                                  | (publik, di-cache selama 3600 detik)         |
| `/api/a2a/tasks`             | POST   | Delegasi masuk ke armada OmniConductor (Conductor PRD RF5) | Bearer vs `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Delegasi Conductor masuk (`POST /api/a2a/tasks`):** agen A2A eksternal mendelegasikan pekerjaan pemrograman ke armada OmniConductor melalui OmniRoute. Isi: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — hanya skill armada Conductor (yang diumumkan pada Agent Card) yang dapat didelegasikan; `metadata.conductor.repo.url` wajib diisi (armada bekerja pada repositori git). Rute ini menerjemahkan permintaan menjadi `POST /v1/tasks` milik hub menggunakan `CONDUCTOR_ORCHESTRATOR_TOKEN` sisi server (dengan fallback `CONDUCTOR_HUB_TOKEN`) dan mengembalikan `201 { conductor_task_id, state: "submitted" }`; status tugas mengalir kembali melalui cermin SSE→A2A (RF1) dan dapat dilihat melalui `GET /api/a2a/tasks?skill=conductor`.

---

## Menambahkan Skill Baru

1. **Buat file skill:** `src/lib/a2a/skills/<your-skill>.ts`

   Ekspor fungsi asinkron `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Ikuti struktur skill yang sudah ada, seperti `smartRouting.ts`.

2. **Daftarkan handler:** di `src/lib/a2a/taskExecution.ts`, tambahkan entri ke `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...skill yang sudah ada
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Tampilkan di Agent Card:** di `src/lib/a2a/agentCardMetadata.ts` (digunakan bersama oleh `/.well-known/agent.json` dan `/.well-known/agent-card.json`), tambahkan ke array `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Tulis pengujian:** `tests/unit/a2a-<your-skill>.test.ts`. Cakup alur berhasil + alur kesalahan.

5. **Dokumentasikan** skill baru dalam tabel `Available Skills` di file ini.

---

## TTL Tugas

Tugas kedaluwarsa setelah `ttlMinutes` (default 5 menit) — dikonfigurasi dalam konstruktor `A2ATaskManager` di `src/lib/a2a/taskManager.ts:82`. Untuk menyesuaikannya, lakukan fork pada instansiasi `A2ATaskManager` dan teruskan nilai yang berbeda (misalnya, `new A2ATaskManager(15)` untuk TTL 15 menit). Interval latar belakang membersihkan tugas yang kedaluwarsa setiap 60 detik.

---

## Siklus Hidup Tugas

```
dikirim → sedang diproses → selesai
                          → gagal
                          → dibatalkan
```

- Tugas kedaluwarsa setelah 5 menit secara default (lihat [TTL Tugas](#task-ttl))
- Status terminal: `completed`, `failed`, `cancelled`
- Log peristiwa mencatat setiap transisi status

---

## Kode Kesalahan

| Kode   | Arti                                        |
| :----- | :------------------------------------------ |
| -32700 | Kesalahan penguraian (JSON tidak valid)     |
| -32600 | Permintaan tidak valid / Tidak terotorisasi |
| -32601 | Metode atau skill tidak ditemukan           |
| -32602 | Parameter tidak valid                       |
| -32603 | Kesalahan internal                          |
| -32000 | Endpoint A2A dinonaktifkan                  |

---

## Contoh Integrasi

### Python (permintaan)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (mengambil)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
