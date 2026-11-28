# Merge Queue & Manual Merge-Train Runbook (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Mendarat di cabang rilis

Antrian omni mengatur pendaratan ke `release/vX.Y.Z`. Baca `mode` tingkat atas di `config/merge-queue/config.json` di cabang default sebelum mendapatkan PR. Lihat [Omni-Antrian](OMNI_QUEUE.md).

- **`shadow`** menjalankan validasi dan meninggalkan pendaratan ke penggabungan manual. Terapkan `omni-queue` ke PR yang disetujui pada head terakhirnya. Periksa kelayakan dengan `npm run queue -- why <PR>`. Tunggu keputusan untuk kepala itu di `npm run queue -- history --base <branch>`. Lanjutkan pada `would-land`. Pada `culprit-found` atau `would-dequeue`, tahan penggabungan dan perbaiki penyebabnya.
- **Pengecualian bayangan.** Kereta api dengan CI penuh berwarna hijau terhadap ujung pangkalan saat ini dapat melanjutkan perjalanan tanpa keputusan antrian terpisah. Pengecualian yang sama berlaku ketika kepala PR sudah berisi ujung dasar saat ini.
- **`live`** menggunakan label `omni-queue` untuk memicu pendaratan. Antriannya sendiri yang mendaratkan PR. Tinggalkan perintah penggabungan dan arahkan dorongan ke antrian.

Setiap pendaratan memerlukan izin pemilik dan pemeriksaan wajib yang berlaku. Terapkan `omni-queue` hanya setelah pemilik mengizinkan pendaratan. Antrean PRs yang menyentuh jalur yang dilindungi juga memerlukan keputusan `protected-approved` pemilik untuk PR tersebut.

Aturan "Memerlukan gerbang hijau pada rilis aktif" memerlukan `Gate / CI` dan `Gate / Quality` hijau di kepala. Jangan pernah menggunakan `--admin` untuk melewati gerbang merah. Blok pembekuan rilis bergabung ke dalam cabang beku. Lihat [Aturan Keras 21](HARD_RULES_DETAIL.md). Jangan pernah memberi label, menggabungkan, atau mendorong permintaan tarik agar sesi lain berfungsi. Lihat [Aturan Keras 22](HARD_RULES_DETAIL.md).

## Permintaan tarik kereta

1. Mulai cabang kereta di ujung basis rilis saat ini. Integrasikan kepala anggota yang disetujui secara tepat menggunakan komitmen gabungan. Pertahankan riwayat komitmen mereka dengan menghindari squash dan rebase.
2. Buka satu permintaan tarik untuk cabang kereta. Validasi PR tersebut dengan CI penuhnya sendiri di ujung dasar saat ini. Periksa kembali ujung dasar dan kepala anggota yang disetujui sebelum mendarat. Refresh kereta dan CI -nya ketika kandidat yang divalidasi berubah.
3. Mendaratkan kereta PR dengan komit gabungan dalam mode antrian yang berlaku. Dalam mode langsung, metode pendaratan `merge-ff` antrian mempertahankan komit penggabungan. Kepala anggota asli dapat dijangkau dari cabang rilis. GitHub menandai anggota PRs sebagai gabungan dan komit tetap mempertahankan penulisnya.

Contoh publiknya adalah [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Itu menggabungkan 18 anggota PRs dan mendarat dengan komitmen penggabungan pada 24-11-2026.

Sinkronisasi kembali dari `main` ke cabang rilis berikutnya juga dilakukan melalui komit gabungan. Mempertahankan leluhur `main` diperlukan untuk sinkronisasi kembali nanti. Lihat [Isolasi Worktree](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Validator kereta gabungan lokal

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validator mengambil basis dan kepala PR dan menggabungkannya dalam pohon kerja sekali pakai. Ia menjalankan rangkaian paritasnya satu kali pada pohon yang dihasilkan. Konflik pengambilan atau penggabungan head yang gagal akan mengeluarkan PR tersebut dan skrip melanjutkan dengan PRs yang tersisa.

- **`--plan`** mencetak langkah-langkah mode yang dipilih dan keluar tanpa membuat pohon kerja atau menghubungi remote. Gabungkan dengan `--fast` untuk memeriksa rencana cepat.
- **`--fast`** menjalankan gerbang statis umum, file `node:test` yang diubah dan dipilih di bawah `tests/unit/`, dan `npm run test:vitest`. Jalankan validasi lokal penuh setidaknya sekali sehari pada tip yang terakumulasi saat menggunakan mode cepat.
- **Modus penuh** menambahkan gerbang statis penuh saja dan menjalankan `npm run test:unit` dan `npm run test:vitest`.

Gerbang statis yang gagal dijalankan kembali pada pangkalan yang tidak tersentuh jika probe pangkalan tersedia. Skrip melaporkan kegagalan yang diwariskan dan berlanjut ketika setiap baris pelanggaran yang diketahui juga muncul di pangkalan dan jumlah totalnya tidak bertambah.

| KELUAR | Arti                                                                                                                                                              |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Mencetak rencana atau menyelesaikan suite. Ringkasan suite mencantumkan semua kegagalan statis yang diwarisi dan PRs yang dikeluarkan.                            |
| `1`    | Argumen tidak valid, tidak ada checkout Git, preflight gagal, atau tidak ada PR yang masuk.                                                                       |
| `2`    | Pemeriksaan suite gagal dan tidak memenuhi syarat sebagai warisan. Operator dapat membagi dua batch, mengeluarkan PR yang mengganggu, dan menjalankannya kembali. |

Izin lokal hanya memberikan bukti diagnostik untuk dokumen pemiliknya. Setiap pendaratan masih memerlukan otorisasi pemilik, pemeriksaan yang diperlukan, dan keputusan antrean bayangan jika berlaku.

## Berjenjang

- **Per PR.** CI dan Pemeriksaan pemilihan kualitas berdasarkan jalur yang diubah. Kode PRs menjalankan gerbang kualitas cepat dan pengujian yang terkena dampak, dengan unit terpisah dan pekerjaan Vitest di CI.
- **Per kandidat antrian.** CI dan Quality menjalankan profil lengkap untuk kandidat yang disusun pada referensi antriannya.
- **Per tip rilis.** Release-Green menjalankan gerbang keras dengan cepat pada dorongan yang cocok dengan filter jalurnya. Tiga proses terjadwal per hari menggunakan sapuan penuh untuk cabang rilis.
- **Per rilis.** Matriks CI lengkap mencakup pecahan E2E, validasi paket, asap boot tarball, dan pemeriksaan cakupan. Lihat [Daftar Periksa Rilis](RELEASE_CHECKLIST.md).

## Prasyarat pembayaran baru untuk `merge-train.sh`

Preflight dijalankan sebelum membuat pohon kerja. Instal dependensi dengan `npm ci`. Konfirmasikan bahwa `node_modules/.bin/tsc` dapat dieksekusi dan `node_modules/node_modules` tidak ada. Periksa apakah `node_modules/.bin/bun --version` berhasil.

Jika postinstall Bun dilewati, jalankan `(cd node_modules/bun && node install.js)`. Konsistensi penyedia dan pemeriksaan simbol yang diketahui menggunakan Bun. Validator menjalankan `npm run check:cycles:ratchet` sebagai gerbang pemblokiran. Perintah `npm run check:cycles` yang berdiri sendiri bersifat penasehat.

## Sejarah

Antrean penggabungan Mergify dihentikan pada 19-11-2026.
