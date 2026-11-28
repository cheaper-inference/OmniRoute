# CLAUDE.md (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Semua peraturan projek hidup dalam [`AGENTS.md`](AGENTS.md)** — sumber kebenaran tunggal untuk setiap pembantu AI ; import di atas sudah memuatkannya. Jangan tambah semula peraturan projek di sini. Semua perkara di bawah digunakan ONLY pada Claude Kod — penghalusan operasi peraturan yang telah ditakrifkan dalam `AGENTS.md`.

## Pengasingan pokok kerja — Claude Kod khusus

- Sahkan cawangan asas dengan pengendali melalui `AskUserQuestion` (Peraturan Keras #19) melainkan mereka sudah memberitahu anda.
- Cipta worktree dengan `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (ia mendarat di bawah `.claude/worktrees/`, pautan keras `node_modules` dan salin `.husky/_`), kemudian panggil `EnterWorktree` dengan `path`. Sentiasa lulus pangkalan: tanpanya skrip memilih `release/*` tertinggi, yang mungkin bukan yang disahkan oleh pengendali. Pohon kerja yang `EnterWorktree` cipta dengan sendirinya tidak mempunyai pautan keras mahupun cangkuk, jadi tiada gerbang pra-komit berjalan di dalamnya.

## Subagen dan git

Setiap subagen yang menyentuh git (Alat ejen atau skrip Aliran Kerja) mendapat Peraturan Keras #22 a's `git stash` ban verbatim dalam — gesaannya, pengulangan yang direkodkan bagi insiden simpanan datang melalui subagen.

## Merancang artifak — kuasa besar laluan mengatasi

Kemahiran kuasa besar mengumumkan keingkaran di bawah `docs/superpowers/plans/`, `docs/superpowers/specs/` dan `docs/research/`. Tulis semula setiap satu pada `_tasks/` yang setara dalam `AGENTS.md` → "Artifak Perancangan & Penyelidikan" sebelum menulis, dan masukkannya dengan `git -C _tasks …`, jangan sekali-kali dalam repo utama.

## Gores fail — `_artifacts/`, bukan `/tmp`

Projek ini mengatasi pad awal sesi abah-abah (`/tmp/claude-*/…`). Tulis fail sementara eksport —, zip yang dijana, keluaran perantaraan sekali sahaja — ke `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: laluan `_*` akar gitignore, supaya pengendali mencari dan memadam semua calar di satu tempat. Pelan tahan lama, spesifikasi, penyelidikan dan penyerahan pergi ke `_tasks/` sebaliknya (Peraturan Keras #23).

## Pangkalan merah

Untuk mengalirkan keadaan merah terkumpul (hujung asas + merah PRs), gunakan kemahiran `/sweep-reds`.
