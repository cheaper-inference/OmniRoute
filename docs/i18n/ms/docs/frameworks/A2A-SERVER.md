# OmniRoute A2A Server Documentation (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protokol Agent-ke-Agent v0.3 — OmniRoute sebagai agen penghalaan pintar

Permukaan A2A mempunyai dua antara muka:

- **JSON-RPC 2.0** di `POST /a2a` (titik masuk kanonik, ditakrifkan dalam `src/app/a2a/route.ts`).
- **REST** di bawah `/api/a2a/*` untuk papan pemuka dan alat bantu (status, senarai tugasan, pembatalan).

Tugasan dijejaki oleh `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL lalai 5 minit). Kemahiran dihantar melalui `A2A_SKILL_HANDLERS` dalam `src/lib/a2a/taskExecution.ts`.

## Penemuan Agen

```bash
curl http://localhost:20128/.well-known/agent.json
```

Mengembalikan Kad Agen yang menerangkan keupayaan, kemahiran dan keperluan pengesahan OmniRoute.

Medan `version` Kad Agen diperoleh daripada `process.env.npm_package_version` (lihat `src/app/.well-known/agent.json/route.ts:13`), maka ia kekal disegerakkan secara automatik dengan `package.json` pada setiap keluaran.

---

## Pengesahan

Semua permintaan `/a2a` memerlukan kunci API melalui pengepala `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Jika tiada kunci API dikonfigurasikan pada pelayan, pengesahan akan dipintas.

## Pengaktifan

A2A dikawal oleh togol **Titik Akhir → A2A** dan dinyahdayakan secara lalai. Apabila dinyahdayakan,
`GET /api/a2a/status` melaporkan `status: "disabled"` dan `online: false`; panggilan JSON-RPC ke
`POST /a2a` mengembalikan HTTP 503 dengan kod ralat JSON-RPC `-32000`.

---

## Kaedah JSON-RPC 2.0

### `message/send` — Pelaksanaan Segerak

Menghantar mesej kepada kemahiran dan menunggu respons lengkap.

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

Untuk `smart-routing`, `metadata.combo` ialah penggantian eksplisit bagi
`metadata.model` untuk permintaan get laluan; ia dihantar sebagai `model` sebenar,
bukan sebagai medan JSON `x-combo` yang diabaikan. Kunci API biasa get laluan dan
pemberian kuasa bagi setiap sasaran masih terpakai. Kombo yang tidak sah atau kosong akan ditolak.

Hasilnya mendedahkan `requested_combo` (niat pemanggil), `dispatched_model`
(permintaan get laluan sebenar), `response_model` (respons get laluan) dan
`confirmed_combo`. Medan terakhir ialah `null` melainkan get laluan mengenal pasti
kombo secara eksplisit. Log keputusan A2A mengaitkan pelaksanaan hanya kepada
kombo yang disahkan, sambil mengekalkan permintaan yang belum disahkan sebagai `requestedCombo`.

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

### `message/stream` — Penstriman SSE

Sama seperti `message/send` tetapi mengembalikan Peristiwa Dihantar Pelayan untuk penstriman masa nyata.

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

### `tasks/get` — Tanya Status Tugas

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Batalkan Tugas

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Kemahiran yang Ada

OmniRoute mendedahkan 6 kemahiran A2A berwayar dalam `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Setiap modul kemahiran hidup dalam `src/lib/a2a/skills/`.

| Kemahiran            | ID                   | Penerangan                                                                                                                                                                   | Tag                          | Contoh                                      |
| :------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :------------------------------------------ |
| Penghalaan Pintar    | `smart-routing`      | Halakan gesaan melalui provider/combo optimum menggunakan pemarkahan + enjin kombo OmniRoute                                                                                 | penghalaan, pembekal         | "Halakan gesaan ini melalui model terbaik"  |
| Pengurusan Kuota     | `quota-management`   | Laporan menyatakan kuota setiap pembekal, membantu pemanggil memutuskan bila untuk throttle/switch                                                                           | kuota, pembekal              | "Semak kuota untuk antropik"                |
| Penemuan Pembekal    | `provider-discovery` | Menyenaraikan pembekal yang dipasang dengan keupayaan, bendera peringkat percuma, status OAuth                                                                               | pembekal, penemuan           | "Pembekal apa yang tersedia?"               |
| Analisis Kos         | `cost-analysis`      | Anggaran kos request/conversation berdasarkan katalog + penggunaan terkini                                                                                                   | kos, penggunaan              | "Anggaran kos untuk perbualan ini"          |
| Laporan Kesihatan    | `health-report`      | Agregat pemutus litar, cooldown, keadaan kunci keluar bagi setiap pembekal                                                                                                   | kesihatan, daya tahan        | "Tunjukkan status kesihatan semua pembekal" |
| Senaraikan Keupayaan | `list-capabilities`  | Mengembalikan katalog Kemahiran Ejen 45 penyertaan penuh (23 API + 21 CLI + 1 konfigurasi) sebagai jadual penurunan harga dengan SKILL.md URLs mentah untuk suntikan konteks | katalog, penemuan, kemahiran | "Senaraikan semua keupayaan OmniRoute "     |

> Kad Ejen hendaklah sentiasa sejajar dengan katalog 394-pembekal langsung; kiraan pembekal dan metadata free/no-auth diperoleh daripada pendaftaran masa jalan.

### `list-capabilities` Butiran Kemahiran

Kemahiran `list-capabilities` amat berguna untuk ejen luar yang perlu mengetahui perkara yang OmniRoute dedahkan sebelum menghantar panggilan API. Ia mengembalikan artifak jadual penurunan nilai berstruktur:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Setiap baris termasuk lajur `rawUrl` supaya ejen boleh segera mengambil SKILL.md penuh . Medan `metadata.totalSkills` mencerminkan saiz katalog (45 hari ini). Pelaksanaan: `src/lib/a2a/skills/listCapabilities.ts`. Lihat juga [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (bantuan)

`/a2a` titik akhir JSON-RPC ialah titik masuk A2A kanonik. Titik akhir REST di bawah menyediakan akses tambahan untuk papan pemuka dan alatan luaran:

| Titik akhir                  | Kaedah | Penerangan                                                 | Pengesahan                                                                                                      |
| :--------------------------- | :----- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Status pelayan, kemahiran berdaftar                        | (awam)                                                                                                          |
| `/api/a2a/tasks`             | GET    | Senaraikan tugasan dengan penapis                          | pengurusan atau kunci API (lihat di bawah)                                                                      |
| `/api/a2a/tasks/[id]`        | GET    | Dapatkan tugas oleh ID                                     | pengurusan atau kunci API (lihat di bawah)                                                                      |
| `/api/a2a/tasks/[id]/cancel` | POST   | Batalkan tugas yang sedang dijalankan                      | pengurusan atau kunci API (lihat di bawah)                                                                      |
| `/.well-known/agent.json`    | GET    | Kad Ejen (A2A discovery)                                   | (awam, cache 3600s)                                                                                             |
| `/api/a2a/tasks`             | POST   | Delegasi masuk ke armada OmniConductor (Konduktor PRD RF5) | sama seperti `GET`, tambah `OMNIROUTE_API_KEY` jika ditetapkan semasa `REQUIRE_API_KEY` dimatikan; `a2aEnabled` |

Siapa yang melalui laluan `/api/a2a/tasks*` bergantung pada log masuk dan tetapan kunci API:

- `requireLogin=true` (lalai): middleware hanya menerima bukti kelayakan pengurusan (sesi papan pemuka, kunci `manage` -scope API, token akses `oma_` ) dan `OMNIROUTE_API_KEY`. Kunci inferens biasa mendapat `403`. Dalam pengepala `Authorization` middleware hanya mengambil `OMNIROUTE_API_KEY` sebagai `Bearer <key>`; kunci kosong atau tab selepas `Bearer` mendapat `401`.
- `requireLogin=false`, atau tetingkap gelung balik sebelum masuk: dengan `REQUIRE_API_KEY=true` sebarang kunci OmniRoute API yang sah atau kelayakan pengurusan diterima dan pemanggil tanpa nama mendapat `401`; dengan `REQUIRE_API_KEY` di luar laluan dibuka.
- `POST /api/a2a/tasks` juga memerlukan `OMNIROUTE_API_KEY` dalam pengepala `Authorization` apabila pembolehubah itu ditetapkan dan `REQUIRE_API_KEY` dimatikan. Pengepala lain, seperti `x-api-key`, tidak dikira di sana. Dengan log masuk mati atau sebelum onboard, pas kunci dengan atau tanpa awalan `Bearer` ; dengan log masuk dihidupkan, hanya `Bearer <key>` yang melepasi perisian tengah.

Jika kelayakan diperlukan, token `read` -scope `oma_` hanya berfungsi untuk `GET`.

**Delegasi Konduktor Masuk (`POST /api/a2a/tasks`):** ejen A2A luaran mewakilkan kerja pengekodan kepada armada OmniConductor melalui OmniRoute. Badan: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — sahaja Kemahiran armada konduktor (yang diumumkan pada Kad Ejen) boleh diwakilkan; `metadata.conductor.repo.url` diperlukan (armada berfungsi pada git repos). Laluan itu diterjemahkan kepada `POST /v1/tasks` hab menggunakan `CONDUCTOR_ORCHESTRATOR_TOKEN` sisi pelayan (fallback `CONDUCTOR_HUB_TOKEN`) dan mengembalikan `201 { conductor_task_id, state: "submitted" }`; keadaan tugas mengalir kembali melalui cermin SSE→A2A (RF1) dan boleh dilihat melalui `GET /api/a2a/tasks?skill=conductor`.

---

## Menambah Kemahiran Baru

1. **Buat fail kemahiran:** `src/lib/a2a/skills/<your-skill>.ts`

   Eksport fungsi async `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Ikut bentuk kemahiran sedia ada seperti `smartRouting.ts`. Jika kemahiran memanggil semula ke OmniRoute atas HTTP, bina pengepala dengan `buildSelfLoopHeaders(caller)` daripada `src/lib/a2a/selfLoopAuth.ts` supaya panggilan berjalan dengan kunci pemanggil A2A, bukan `OMNIROUTE_API_KEY`, dan hantar `redirect: "error"` kepada `fetch` supaya ubah hala tidak pernah mendapat kunci. Pembantu hanya membina tajuk; setiap kemahiran menetapkan dasar ubah hala itu sendiri. Ia membuang `UnsafeSelfLoopTargetError` daripada melampirkan kunci apabila URL asas yang diselesaikan adalah http biasa di luar rangkaian peribadi (gelung belakang, bekas atau nama perkhidmatan dan alamat peribadi adalah baik) atau memegang bukti kelayakan, jadi kemahiran yang menelan panggilan yang ditolak mesti membuang semula ralat itu.

2. **Pengendali daftar:** dalam `src/lib/a2a/taskExecution.ts`, tambahkan entri pada `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Dedahkan dalam Kad Ejen:** dalam `src/lib/a2a/agentCardMetadata.ts` (dikongsi oleh `/.well-known/agent.json` dan `/.well-known/agent-card.json`), tambahkan pada tatasusunan `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Tulis ujian:** `tests/unit/a2a-<your-skill>.test.ts`. Tutup laluan gembira + laluan ralat.

5. **Dokumen** kemahiran baharu dalam jadual `Available Skills` fail ini.

---

## TTL Tugas

Tugas tamat tempoh selepas `ttlMinutes` (lalai 5 min) — dikonfigurasikan dalam pembina `A2ATaskManager` di `src/lib/a2a/taskManager.ts:82`. Untuk menyesuaikannya, lakukan fork pada penciptaan tika `A2ATaskManager` dan berikan nilai yang berbeza (contohnya, `new A2ATaskManager(15)` untuk TTL 15 minit). Suatu sela latar belakang membersihkan tugas yang telah tamat tempoh setiap 60 saat.

---

## Kitar Hayat Tugas

```
diserahkan → sedang diproses → selesai
                              → gagal
                              → dibatalkan
```

- Tugas tamat tempoh selepas 5 minit secara lalai (lihat [TTL Tugas](#task-ttl))
- Keadaan terminal: `completed`, `failed`, `cancelled`
- Log peristiwa menjejaki setiap peralihan keadaan

---

## Kod Ralat

| Kod    | Maksud                                  |
| :----- | :-------------------------------------- |
| -32700 | Ralat penghuraian (JSON tidak sah)      |
| -32600 | Permintaan tidak sah / Tidak dibenarkan |
| -32601 | Kaedah atau kemahiran tidak ditemukan   |
| -32602 | Parameter tidak sah                     |
| -32603 | Ralat dalaman                           |
| -32000 | Titik akhir A2A dinyahdayakan           |

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

### TypeScript (ambil)

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
