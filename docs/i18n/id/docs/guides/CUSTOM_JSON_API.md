# Custom JSON API provider nodes (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Node JSON API kustom menghubungkan titik akhir bisnis JSON yang tidak menggunakan protokol OpenAI atau Anthropic. OmniRoute mengisi templat permintaan JSON, mengirimkannya ke titik akhir lengkap URL, membaca balasan dari jalur respons dan mengembalikannya ke klien dalam format klien sendiri (Penyelesaian Obrolan, Tanggapan, Pesan, ...).

Ini adalah node yang kompatibel dengan OpenAI dengan `apiType: "custom-json"`; idnya berbentuk `openai-compatible-custom-json-<suffix>`. Formulir dasbor belum tersedia. Buat dan edit node ini melalui node penyedia API di bawah.

## Buat sebuah simpul

`POST /api/provider-nodes` (autentikasi manajemen):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` adalah** menyelesaikan** titik akhir URL. Tidak ada yang ditambahkan (tidak ada `/chat/completions`, tidak ada `/models`) dan, tidak seperti node lain yang kompatibel dengan OpenAI, tidak ada URL default. Itu harus `http(s)`, tanpa kredensial tertanam atau `#fragment`, dan melewati penjaga URL keluar yang sama dengan setiap node penyedia, baik saat node disimpan maupun pada setiap permintaan.
- Node yang mengirimkan kunci koneksi (`authType` `bearer` atau `api-key`, termasuk yang default) harus menggunakan `https://`. `http://` biasa hanya diterima untuk host loopback (`localhost`, `127.0.0.0/8`, `::1`) atau dengan `authType: "none"`, yang tidak mengirimkan kunci. Alamat LAN pribadi (`10.x`, `172.16-31.x`, `192.168.x`) tidak dikecualikan: siapa pun di jaringan itu dapat membaca kuncinya. Menyimpan node seperti itu gagal dengan `400`, dan node yang disimpan sebelumnya gagal ditutup pada setiap permintaan dengan pesan yang sama, sebelum permintaan apa pun dikirim. Untuk titik akhir yang dikunci pada LAN, letakkan di belakang TLS (misalnya proksi terbalik).
- `customJson` divalidasi dengan Zod; kunci yang tidak diketahui ditolak. Setiap bidang bersifat opsional:

| Bidang            | Nilai-nilai                                | Bawaan                                                 |
| ----------------- | ------------------------------------------ | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                     | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                | `bearer`                                               |
| `authHeader`      | nama header yang digunakan saat `api-key`  | `X-API-Key`                                            |
| `requestTemplate` | objek JSON (≤ 64 KB, kedalaman ≤ 32)       | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | jalur bidang, atau `$` untuk seluruh tubuh | `choices[0].message.content`                           |

- Rahasianya tetap berada di kunci API koneksi, tidak pernah ada di template. `bearer` mengirimkan `Authorization: Bearer <key>`; `api-key` mengirim `<authHeader>: <key>`. Header autentikasi tidak boleh berupa `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` atau header hop-by-hop. Dengan `none`, koneksi tidak memerlukan kunci.
- Header statis ekstra menggunakan `customHeaders` reguler node (validasi yang sama seperti setiap node lain yang kompatibel; header autentikasi tidak diperbolehkan di sana).

`PUT /api/provider-nodes/<id>` menerima `customJson` yang sama dan menulis ulang `baseUrl` dan konfigurasi pada setiap koneksi node yang ada. Menghilangkan `customJson` akan mempertahankan konfigurasi yang disimpan; mengalihkan `apiType` ke `chat` atau `responses` menghapusnya dari node dan koneksinya.

Kemudian tambahkan koneksi ke node seperti biasa (`POST /api/providers` dengan id node) dan minta `<prefix>/<model>`, misalnya `biz/assistant-v1`. Titik akhir tidak memperlihatkan daftar model, jadi tambahkan id model dengan tangan.

## Minta templat

Templatnya polos JSON. Nilai string mungkin berisi penanda `{{placeholder}}` ; tidak ada yang dievaluasi atau dieksekusi, dan kunci objek tidak pernah diganti.

| Penampung            | Nilai                                                                   |
| -------------------- | ----------------------------------------------------------------------- |
| `{{prompt}}`         | Teks pesan pengguna terbaru (bagian teks digabungkan dengan baris baru) |
| `{{messages}}`       | Percakapan dalam format obrolan OpenAI                                  |
| `{{model}}`          | ID model yang diminta, tanpa awalan penyedia                            |
| `{{stream}}`         | Selalu `false` — jawaban titik akhir dengan satu dokumen JSON           |
| `{{request.<path>}}` | Bidang permintaan terjemahan (format obrolan OpenAI ).                  |

- Nilai yang merupakan satu placeholder mempertahankan tipe JSON (`"{{messages}}"` menjadi array); placeholder di dalam string yang lebih panjang disisipkan sebagai teks.
- Placeholder yang tidak menyelesaikan apa pun akan menggagalkan permintaan dengan HTTP 400 alih-alih mengirimkan muatan yang tidak lengkap.
- Jalur menggunakan notasi titik dan indeks numerik (`data.items[0].text`). `__proto__`, `prototype` dan `constructor` ditolak dalam kunci dan jalur.

## Tanggapan

Nilai di `responsePath` menjadi asisten balasan: string melewati, nilai JSON lainnya diserialkan. Bidang yang hilang atau `null`, atau isi yang bukan JSON, mengembalikan HTTP 502. Status kesalahan hulu diteruskan. Untuk klien streaming OmniRoute menunggu seluruh respons JSON dan kemudian memancarkannya sebagai satu potongan konten ditambah potongan akhir; ini bukan streaming token. Panggilan alat dan bidang penggunaan tidak dipetakan.

## Tidak pernah diputar ulang

Permintaan bisnis dapat menimbulkan efek samping meskipun gagal. oleh karena itu OmniRoute mengirimkannya sekali:

- tidak ada percobaan ulang transportasi dan tidak ada pengalihan berikut;
- tidak ada percobaan ulang pada koneksi lain (penggantian akun) — kegagalan dikembalikan apa adanya dan koneksi tidak didinginkan;
- tidak ada kemunduran ke target kombo berikutnya, bahkan untuk balasan kosong atau gagal.

Permintaan klien terpisah, dan panel fusi yang secara eksplisit memanggil beberapa model, masih memanggil titik akhir secara independen.

## Menguji sebuah simpul

Menyimpan koneksi, koneksi** Tes** pemeriksaan kesehatan tombol dan latar belakang tidak pernah memanggil titik akhir: pemeriksaan tersebut hanya memvalidasi konfigurasi yang disimpan dan melaporkan koneksi sebagai tidak dapat diverifikasi.

`POST /api/provider-nodes/validate` dengan `"apiType": "custom-json"` dan bidang simpul (`baseUrl`, `apiKey`, `customJson`, opsional `customHeaders` dan `modelId`) mengirimkan tepat satu permintaan nyata, dengan `ping` sebagai teks pengguna terbaru. Ini menjawab `{ "valid": true }` atau status upstream (bukan badan upstream).

## Penyimpanan

Konfigurasi disimpan di `provider_nodes.custom_json_config_json` (migrasi `240_provider_node_custom_json_config.sql`) dan disalin ke `providerSpecificData.customJson` setiap koneksi.

Implementasi: `open-sse/utils/customJson.ts` (validasi dan templating), `open-sse/executors/customJson.ts` (pelaksana), `open-sse/services/combo/noReplayLatch.ts` dan `src/sse/handlers/chat/responsePolicies.ts` (tidak ada pemutaran ulang).
