# CLI Integrations (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Untuk manifes bersama yang dapat dieksekusi, lingkungan anak terbatas, dan penyiapan Gemini persisten, lihat [kontrak peluncuran CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute mengirimkan sekumpulan perintah `setup-*` yang mengonfigurasi pengkodean CLI (Codex, Claude Code, OpenCode, Cline, …) untuk menggunakan OmniRoute sebagai backendnya — sehingga alat tersebut berkomunikasi dengan** satu** titik akhir dan rute OmniRoute ke penyedia yang tepat dengan fallback otomatis. Setiap perintah membaca** hidup** katalog model dari OmniRoute yang sedang berjalan (lokal atau jarak jauh) dan menulis file konfigurasi alat itu sendiri** milikmu** mesin. Kunci API direferensikan oleh variabel lingkungan di mana pun alat mendukungnya. Perintah yang bertahan pada file lingkungan alat-lokal tercantum di bawah.

Ada juga peluncur generik — `omniroute run <target>` — yang memunculkan `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` atau `whycodes` dengan env yang tepat dimasukkan, tanpa menulis konfigurasi apa pun. Target dan aliasnya berasal dari manifes kanonik `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), dan `omniroute completion` menawarkan kata target turunan manifes yang sama. Peluncur per alat lama — `omniroute launch` (Claude Code) dan `omniroute launch-codex` (Codex) — tetap tersedia.

Orientasi penyedia tersedia dari konteks local/remote yang sama. Perintah API-first di bawah ini memisahkan autentikasi manajemen dari kredensial penyedia dan tidak pernah mencetak kredensial dalam output terstruktur:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Untuk skrip, pilih `--credential-stdin` atau `--credential-env`; `--credential` dipertahankan untuk penggunaan lokal yang terkontrol. `providers remove` memerlukan `--yes` pada terminal non-interaktif, dan kelima perintah mengikuti konteks aktif atau opsi `--base-url`/`--api-key` global.

Pemilih penyedia menolak awalan, nama, atau nama penyedia ID yang ambigu; gunakan koneksi penuh ID ketika beberapa koneksi cocok. Perintah membuat dan mengedit membaca kembali koneksi yang disimpan, dan penghapusan memverifikasi bahwa koneksi tersebut tidak lagi dapat dibaca. Impor melewati pasangan provider/name yang ada. Entri yang diimpor tidak dapat mengesampingkan titik akhir manajemen, konteks, atau kredensial manajemen yang diberikan ke CLI.

Untuk pengaturan dasar dua integrasi terkaya yang ditulis tangan satu kali, lihat penjelasan mendalam per alat:

- [konfigurasi Kode Claude](./CLAUDE-CODE-CONFIGURATION.md)
- [konfigurasi Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Mode Jarak Jauh](./REMOTE-MODE.md) — menggerakkan OmniRoute jarak jauh (VPS / Tailnet) dari laptop Anda
- [VS Kode Copilot Obrolan](./VSCODE-COPILOT.md) — ekstensi OmniCopilot ; itu juga dapat menjalankan perintah `setup-*` ini untuk Anda dari dalam editor

---

## meja induk

Setiap perintah menghormati** konteks aktif** (diatur dengan `omniroute connect`, lihat [Mode Jarak Jauh](./REMOTE-MODE.md) ) atau tanda `--remote <url> --api-key <key>` eksplisit. "Lokal vs jarak jauh" di bawah berarti: tanpa tanda, ia menargetkan `http://localhost:20128`; dengan `--remote` (atau konteks jarak jauh yang aktif) ia mengambil katalog dari server itu dan menulis konfigurasi secara lokal.

| Memerintah                 | Alat                                | Apa yang ditulisnya                                                                                                                                                                  | Bendera kunci                                                                                                                              | Lokal vs jarak jauh |
| -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                    | `~/.codex/<name>.config.toml` — satu profil per model teks yang kompatibel (`codex --profile <name>`)                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Keduanya            |
| `omniroute setup-claude`   | Kode Claude                         | `~/.claude/profiles/<name>/settings.json` — satu profil per model yang cocok (`CLAUDE_CONFIG_DIR`)                                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Keduanya            |
| `omniroute setup-opencode` | OpenCode (kompatibel dengan openai) | `~/.config/opencode/opencode.json` — penyedia `omniroute` dengan setiap model katalog (`opencode -m omniroute/<model>`)                                                              | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Keduanya            |
| `omniroute setup-cline`    | Cline                               | `~/.cline/data/{globalState,secrets}.json` ( mode CLI ) + mencetak pengaturan ekstensi kode VS                                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Keduanya            |
| `omniroute setup-kilo`     | Kode Kilo                           | `~/.local/share/kilo/auth.json` (CLI) + menggabungkan `kilocode.*` menjadi VS Kode `settings.json` jika ada                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Keduanya            |
| `omniroute setup-continue` | Lanjutkan / `cn` CLI                | `~/.continue/config.yaml` — model `provider: openai`, kunci melalui `${{ secrets.OMNIROUTE_API_KEY }}`                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Keduanya            |
| `omniroute setup-cursor`   | Cursor                              | Tidak ada — mencetak langkah-langkah dalam aplikasi (Cursor config buram SQLite)                                                                                                     | `--remote` `--api-key` `--only` `--port`                                                                                                   | Keduanya            |
| `omniroute setup-roo`      | Kode Roo                            | `~/.omniroute/roo-settings.json` (impor dokumen) + menyetel `roo-cline.autoImportSettingsPath` jika kode VS `settings.json` ada                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Keduanya            |
| `omniroute setup-crush`    | Menghancurkan                       | `~/.config/crush/crush.json` — penyedia `openai-compat`, kunci melalui `$OMNIROUTE_API_KEY`                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Keduanya            |
| `omniroute setup-zed`      | Zed                                 | `~/.config/zed/settings.json` — penyedia `openai_compatible.omniroute` (model berkemampuan alat ≤ 25), kunci melalui `$OMNIROUTE_API_KEY`                                            | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Keduanya            |
| `omniroute setup-goose`    | Angsa                               | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + mencetak resep env                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Keduanya            |
| `omniroute setup-aider`    | Pembantu                            | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + mencetak resep env                                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Keduanya            |
| `omniroute setup-qwen`     | Kode Qwen                           | `~/.qwen/settings.json` — Array `modelProviders.openai` V4 zqc + `OMNIROUTE_API_KEY` `~/.qwen/.env`                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Keduanya            |
| `omniroute setup-5dive`    | 5dive (armada agen)                 | Tidak ada apa pun di bawah `$HOME` — tulis 5dive** profil autentikasi** (`/var/lib/5dive/auth-profiles/<name>/`) melalui `5dive agent auth set`; hanya root, berjalan di host armada | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Keduanya            |
| `omniroute setup-whycodes` | WhyCodes                            | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); jalurnya adalah `$WHYCODES_HOME/config.toml` atau `~/.whycodes/config.toml`                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Keduanya            |
| `omniroute run <target>`   | Peluncuran runtime (umum)           | Tidak ada — menelurkan `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` dengan env dan args yang tepat; Qwen dan Gemini menggunakan rumah isolasi sementara    | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Keduanya            |
| `omniroute launch`         | Kode Claude                         | Tidak ada — memunculkan `claude` dengan `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` yang disuntikkan                                                                                 | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Keduanya            |
| `omniroute launch-codex`   | OpenAI Codex CLI                    | Tidak ada — memunculkan `codex` dengan penyedia `omniroute` yang dimasukkan melalui flag `-c`                                                                                        | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Keduanya            |

Catatan tentang bendera (diverifikasi di sumber perintah):

- `--remote <url>` — mengambil katalog dari OmniRoute jarak jauh (mengganti `--port` dan konteks aktif). `--api-key <key>` menyediakan kredensial untuk server tersebut (defaultnya adalah `OMNIROUTE_API_KEY` env var, atau token konteks aktif).
- `--only <patterns>` — substring yang dipisahkan koma; simpan hanya model IDs yang cocok (misalnya `--only glm,kimi`). Tersedia di `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — mencetak persis apa yang akan ditulis tanpa menyentuh sistem file. Tersedia di setiap perintah `setup-*`** kecuali** `setup-cursor` (yang tidak pernah menulis file).
- `--model <id>` — diperlukan (atau dipilih secara interaktif) untuk alat yang tidak memiliki model penemuan otomatis: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Alat-alat tersebut juga menerima `--yes` untuk proses non-interaktif (yang kemudian memerlukan `--model`). `setup-opencode` membutuhkan `--model` untuk menyetel model tingkat atas default.
- `--model <id>` di `omniroute run` mengikuti kabel manifes per target (`bin/cli/cli-manifest.mjs`):** pembantu** menerima `--model openai/<id>` dan** kode terbuka** `--model omniroute/<id>` (awalan ditambahkan hanya jika id belum membawanya);** qwen** Dan** Gemini** menerima id kata demi kata;** claude** mendapatkannya melalui `ANTHROPIC_MODEL`,** angsa** melalui `GOOSE_MODEL`,** mengapa kode** melalui `-P omniroute -m <id>`, dan** naskah kuno** melalui `-c model_providers.omniroute.*` args.**Qwen adalah satu-satunya target lari yang sangat membutuhkan `--model`** — `omniroute run qwen` tanpanya keluar dari `2` dengan kesalahan eksplisit.
- `--port <port>` — port OmniRoute lokal (default `20128`, diabaikan ketika `--remote` disetel). Hadir di semua `setup-*` dan kedua peluncur.
- kode keluar `omniroute run` : kode keluar CLI anak itu sendiri disebarkan kata demi kata; `2` = argumen tidak valid (target tidak didukung, `--model` yang diperlukan tidak ada, penjaga kontainer); `127` = biner target tidak ada di `PATH`; `130`/`143`/`129` ketika peluncuran diakhiri dengan `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = kegagalan peluncuran runtime lainnya.
- Kedua peluncur (`launch`, `launch-codex`) menerima `--profile <name>` untuk memilih profil yang ditulis oleh `setup-claude` / `setup-codex`, ditambah argumen pass-through untuk biner `claude` / `codex` yang mendasarinya.

Pemilih interaktif juga dibagikan oleh resep pengaturan:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` saat ini mendelegasikan ke resep yang diuji untuk `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, dan `5dive`. Entri katalog khusus IDE, MITM, dan panduan saja tetap eksplisit alur `setup-*`/manual dan tidak disajikan sebagai target yang dapat diluncurkan.

> `setup-opencode` adalah** ringan yang kompatibel dengan openai** integrasi OpenCode. Ada juga integrasi plugin yang lebih kaya — `omniroute setup opencode` — yang menginstal `@omniroute/opencode-plugin`. Itu adalah perintah yang berbeda; tabel di atas mendokumentasikan `setup-opencode`.
>
> Plugin ini hadir dalam dua paket, satu per OpenCode mayor, karena kedua loader mengharapkan titik masuk yang berbeda: `@omniroute/opencode-plugin` untuk OpenCode v1 dan `@omniroute/opencode-plugin-v2` untuk OpenCode v2. Paket v2 masih baru (`0.1.0`) dan mengikuti kontrak host yang masih berjalan, sehingga paket tersebut membaca bentuk OpenCode seed ke dalam draf katalog daripada mengasumsikannya. Instal dengan menambahkan entri `plugins` ke `opencode.json`; `omniroute setup opencode` masih menginstal paket v1. Opsi dan urutan pencarian kredensial ada dalam paket README.

---

## Penggunaan lokal

Dengan OmniRoute berjalan di `localhost:20128`, cukup jalankan perintah penyiapan untuk
alat Anda. Katalog diambil dari server lokal.

```bash
# Codex: tulis satu profil per model yang cocok ke ~/.codex/
omniroute setup-codex
codex --profile glm52            # gunakan profil yang dihasilkan

# Claude Code: tulis profil per model, lalu jalankan salah satunya
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: tulis penyedia yang kompatibel dengan openai beserta semua model katalog
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # dirujuk melalui {env:OMNIROUTE_API_KEY}, tidak pernah disimpan di disk
opencode -m omniroute/glm/glm-5.2 "..."

# Alat tanpa penemuan otomatis memerlukan model yang ditentukan secara eksplisit:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Pratinjau tanpa menulis apa pun:
omniroute setup-continue --dry-run
```

Jalankan tanpa menulis konfigurasi apa pun (hanya injeksi variabel lingkungan):

```bash
omniroute launch                 # Claude Code → OmniRoute lokal
omniroute launch-codex           # Codex CLI → OmniRoute lokal
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Jalur perintah eksplisit: teruskan apa pun yang muncul setelah --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Penggunaan jarak jauh

Arahkan perintah penyiapan apa pun ke OmniRoute jarak jauh dengan `--remote` + `--api-key`. Katalog
diambil dari server jarak jauh; konfigurasi ditulis pada mesin lokal Anda.

```bash
# OpenCode terhadap VPS jarak jauh, pertahankan hanya model glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # ekspor OMNIROUTE_API_KEY terlebih dahulu

# Profil Codex dari katalog jarak jauh
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Jalankan CLI secara langsung terhadap server jarak jauh
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Alih-alih meneruskan `--remote`/`--api-key` setiap kali, masuklah satu kali dan biarkan
**konteks aktif** menyediakannya secara otomatis:

```bash
omniroute connect 192.168.0.15        # membuat token dengan cakupan terbatas, menyimpan konteks
omniroute setup-codex                 # ← sekarang menggunakan katalog jarak jauh
omniroute setup-opencode              # ← sama
omniroute launch                      # ← Claude Code terhadap server jarak jauh
```

Lihat [Mode Jarak Jauh](./REMOTE-MODE.md) untuk konteks, cakupan, dan pengelolaan token.

---

## Armada agen 5dive

[5dive](https://5dive.ai) menjalankan armada agen pengodean yang berjalan dalam jangka panjang, masing-masing sebagai
unit systemd di bawah pengguna Unix tersendiri. 5dive bukan CLI pengodean, sehingga tidak ada
yang dapat dijalankan oleh `omniroute run` — `5dive` adalah target **khusus konfigurasi**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Kedua bentuk tersebut menulis satu **profil autentikasi** 5dive, dan setiap seat `claude` yang terikat ke
profil tersebut kemudian berkomunikasi dengan OmniRoute. Tiga hal bersifat khusus untuk target ini:

- **Ini berjalan pada host armada, sebagai root.** Verba 5dive beroperasi pada unit systemd lokal
  dan direktori status yang dimiliki root; tidak ada mode jarak jauh. Resep mengeksekusi ulang melalui
  `sudo` ketika belum berjalan sebagai root (`--no-sudo` menonaktifkannya dan sebagai gantinya mencetak
  perintah).
- **Endpoint harus menggunakan `https://` kecuali jika merupakan loopback.** Kunci API agen
  dikirim melalui URL tersebut pada setiap permintaan, dan 5dive menolak endpoint teks biasa di luar host.
  Alamat LAN privat bukan pengecualian.
- **Pin model milik masing-masing seat lebih diprioritaskan daripada profil.** Profil memuat
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, tetapi seat yang masih dipin ke id model
  bawaan akan gagal pada giliran pertamanya dengan _"Ada masalah dengan model yang dipilih"_.
  Teruskan `--agent <name>` (dapat diulang) untuk mem-pin seat juga; resep akan mencetak
  perintah jika Anda tidak melakukannya.

Kunci API diserahkan kepada 5dive melalui **stdin** (`--api-key=-`), sehingga tidak pernah muncul dalam
keluaran `ps`.

Mengarahkan profil ke **combo** OmniRoute alih-alih satu model adalah yang
memberikan failover penyedia kepada armada: ketika endpoint utama mati total di tengah giliran
dalam proses yang dicatat pada
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agen menyelesaikan
langkah-langkah sisanya pada fallback dan tidak pernah menampilkan gangguan tersebut.

---

## Konvensi dasar URL (alat mana yang diinginkan `/v1`)

OmniRoute memperlihatkan permukaan OpenAI di `/v1`, permukaan Anthropic di akar, dan permukaan Gemini asli di `/v1beta`. Setiap integrasi dihubungkan ke bentuk yang diharapkan oleh alatnya (diverifikasi di sumber perintah):

| Integrasi                                                                  | Basis URL ditulis | `/v1`?                                             |
| -------------------------------------------------------------------------- | ----------------- | -------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | akar              | Tidak — Cline menambahkan `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | akar              | Tidak — Angsa menambahkan jalannya                 |
| `setup-aider` (`OPENAI_API_BASE`)                                          | akar              | Tidak — LiteLLM menambahkan `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | dengan `/v1`      | Ya                                                 |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | dengan `/v1`      | Ya                                                 |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | akar              | Tidak — Kode Claude menambahkan `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | dengan `/v1`      | Ya                                                 |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | dengan `/v1`      | Ya                                                 |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | akar              | Tidak — SDK menambahkan `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` di profil autentikasi)                 | akar              | Tidak — Kode Claude menambahkan `/v1/messages`     |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | dengan `/v1`      | Ya — WhyCodes memposting `/chat/completions`       |

---

## Mempertahankan dependensi native saat pembaruan: `--include=optional`

Saat Anda memperbarui dengan `omniroute update` (setelah mengonfirmasi, atau dengan `--apply`),
OmniRoute menjalankan instalasi dengan `--include=optional` yang sudah disertakan:

```bash
npm install -g omniroute@latest --include=optional
```

Ini **bukan** flag yang Anda teruskan ke `omniroute update` — flag ini selalu diterapkan oleh
pembaruan. Hal ini menjamin `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, stack SLM LLMLingua) tetap tersedia setelah pembaruan, meskipun konfigurasi npm Anda
menetapkan `omit=optional`, yang jika tidak demikian akan menghapus driver SQLite native
dan binding keyring OS secara diam-diam. Untuk melihat pratinjau perintah persisnya tanpa menerapkannya:

```bash
omniroute update --dry-run
# [DRY RUN] Akan menjalankan: npm install -g omniroute@latest --include=optional
```

Flag `omniroute update` lainnya (diverifikasi dalam sumber): `--check` (keluar dengan kode 1 jika
sudah usang), `--apply` (instal tanpa meminta konfirmasi), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI melalui `omniroute run gemini`

Kontrak diverifikasi terhadap `@google/gemini-cli` 0.50.0: CLI mematuhi
`GOOGLE_GEMINI_BASE_URL` dan mengirimkan `POST /v1beta/models/<model>:generateContent`
(dan `:streamGenerateContent?alt=sse`) ke URL tersebut — persis seperti antarmuka Gemini native
OmniRoute (`/v1beta`). `omniroute run gemini` mengonfigurasinya secara otomatis:

- `GOOGLE_GEMINI_BASE_URL` → Base URL OmniRoute aktif (root, tanpa `/v1`);
- `GEMINI_API_KEY` → kredensial OmniRoute yang telah di-resolve (opsi/env/konteks);
- **`GEMINI_CLI_HOME` terisolasi sementara** yang `.gemini/settings.json`-nya
  memilih autentikasi `gemini-api-key`, sehingga sesi Google OAuth (Code Assist) yang tersimpan
  tidak pernah menimpa peluncuran yang diarahkan ke OmniRoute — dihapus setelah keluar;
- **kebersihan env**: env proses anak dibersihkan dari `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI`, dan `GOOGLE_GENAI_USE_GCA` (yang akan mengalihkan
  autentikasi ke Vertex/Code Assist), serta `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  ditetapkan sebagai perlindungan tambahan — target `run` lainnya mendapat perlakuan yang sama
  untuk variabel konfliknya masing-masing;
- injeksi `--model <id>` dari `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Perlindungan kepercayaan workspace Gemini tetap berlaku dalam mode headless — teruskan
`--skip-trust` (atau percayai direktori secara interaktif) sendiri; peluncur
sengaja tidak melewatinya. Peluncur ini berbeda dari **pendaftaran ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), yang tetap menjadi
integrasi protokol agen untuk `/dashboard/acp-agents`.

---

## Sweep smoke nyata (opsional)

Pengujian regresi launch-plan deterministik dijalankan di CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Untuk memvalidasi biner NYATA terhadap server
OmniRoute NYATA, tersedia harness opsional di
`tests/integration/upstream-cli-smoke.int.test.ts`. Harness ini tidak pernah berjalan secara otomatis
(setiap sub-pengujian dilewati kecuali `RUN_CLI_SMOKE=1`), meneruskan kredensial melalui NAMA variabel lingkungan
(tidak pernah melalui nilainya), menyamarkan string yang menyerupai kunci dari setiap output yang direkam, melewati
target yang binernya tidak terinstal, dan mengklasifikasikan kegagalan sebagai
autentikasi / upstream / konfigurasi, bukan sekadar nilai boolean:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opsional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` membatasi sweep;
`OMNIROUTE_SMOKE_TIMEOUT_MS` mengganti batas waktu 120 detik per target.

---

## Lihat juga

- [Konfigurasi Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — panduan Claude Code yang lebih mendalam
- [Konfigurasi Codex CLI](./CODEX-CLI-CONFIGURATION.md) — penyiapan dasar `[model_providers.omniroute]` satu kali
- [Mode Jarak Jauh](./REMOTE-MODE.md) — konteks, token akses terbatas, pengoperasian server jarak jauh
- [Referensi Alat CLI](../reference/CLI-TOOLS.md) — katalog lengkap alat yang didukung + halaman dasbor
- [Panduan Penyiapan](./SETUP_GUIDE.md) — metode instalasi dan orientasi saat pertama kali dijalankan
