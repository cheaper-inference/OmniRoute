# CLAUDE.md (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Semua aturan proyek ada di [`AGENTS.md`](AGENTS.md)** — satu-satunya sumber kebenaran untuk setiap asisten AI ; impor di atas sudah memuatnya. Jangan menambahkan kembali aturan proyek di sini. Segala sesuatu di bawah ini berlaku ONLY untuk Claude Kode — penyempurnaan operasional aturan yang sudah ditentukan di `AGENTS.md`.

## Isolasi pohon kerja — Claude Kode spesifik

- Konfirmasikan cabang dasar dengan operator melalui `AskUserQuestion` (Hard Rule #19) kecuali mereka sudah memberi tahu Anda.
- Buat pohon kerja dengan `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (berada di bawah `.claude/worktrees/`, hard-link `node_modules` dan salin `.husky/_`), lalu panggil `EnterWorktree` dengan `path` nya. Selalu lewati basis: tanpanya skrip akan memilih `release/*` tertinggi, yang mungkin bukan yang dikonfirmasi oleh operator. Pohon kerja yang `EnterWorktree` buat dengan sendirinya tidak memiliki hard link maupun hook, jadi tidak ada gerbang pra-komitmen yang berjalan di dalamnya.

## Subagen dan git

Setiap subagen yang menyentuh git (alat Agen atau skrip Alur Kerja) mendapatkan Aturan Keras #22 larangan `git stash` demi kata dalam promptnya — rekaman kejadian simpanan datang melalui subagen.

## Artefak perencanaan — jalur kekuatan super dikesampingkan

Keterampilan negara adidaya mengumumkan default di bawah `docs/superpowers/plans/`, `docs/superpowers/specs/` dan `docs/research/`. Tulis ulang masing-masing ke `_tasks/` yang setara di `AGENTS.md` → "Artefak Perencanaan & Penelitian" sebelum menulis, dan komit dengan `git -C _tasks …`, jangan pernah di repo utama.

## Gores file — `_artifacts/`, bukan `/tmp`

Proyek ini mengesampingkan papan gores sesi harness (`/tmp/claude-*/…`). Tulis file sementara ekspor —, zip yang dihasilkan, keluaran perantara satu kali — ke `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: jalur root `_*` yang gitignored, sehingga operator menemukan dan menghapus semua awal di satu tempat. Rencana, spesifikasi, penelitian, dan penyerahan yang tahan lama akan diberikan ke `_tasks/` (Aturan Keras #23).

## Basis merah

Untuk menguras akumulasi status merah (ujung dasar + merah PRs), gunakan keterampilan `/sweep-reds`.
