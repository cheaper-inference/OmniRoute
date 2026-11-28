# Merge Queue & Manual Merge-Train Runbook (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Mendarat di cawangan pelepasan

Baris gilir omni mengawal pendaratan ke `release/vX.Y.Z`. Baca `mode` peringkat atas dalam `config/merge-queue/config.json` pada cawangan lalai sebelum mendaratkan PR. Lihat [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** menjalankan pengesahan dan meninggalkan pendaratan kepada gabungan manual. Sapukan `omni-queue` pada PR yang diluluskan di kepala terakhirnya. Semak kelayakan dengan `npm run queue -- why <PR>`. Tunggu keputusan untuk kepala itu di `npm run queue -- history --base <branch>`. Teruskan pada `would-land`. Pada `culprit-found` atau `would-dequeue`, tahan cantuman dan betulkan puncanya.
- **Pengecualian bayangan.** Kereta api dengan CI penuh hijau terhadap hujung asas semasa boleh diteruskan tanpa keputusan baris gilir yang berasingan. Pengecualian yang sama berlaku apabila kepala PR sudah mengandungi hujung asas semasa.
- **`live`** menggunakan label `omni-queue` untuk mencetuskan pendaratan. Barisan beratur sahaja mendarat PR. Tinggalkan arahan cantum dan tolakan terus ke baris gilir.

Setiap pendaratan memerlukan kebenaran pemilik dan pemeriksaan yang diperlukan. Gunakan `omni-queue` hanya selepas pemilik membenarkan pendaratan. Laluan terlindung yang menyentuh PRs beratur juga memerlukan keputusan `protected-approved` pemilik untuk PR itu.

Set peraturan "Memerlukan pagar hijau pada keluaran aktif" memerlukan `Gate / CI` dan `Gate / Quality` hijau di kepala. Jangan gunakan `--admin` untuk memintas pintu merah. Blok beku keluaran bergabung ke dalam cawangan beku. Lihat [Peraturan Keras 21](HARD_RULES_DETAIL.md). Jangan sekali-kali melabel, menggabungkan atau menolak permintaan tarik bahawa sesi lain berfungsi. Lihat [Peraturan Keras 22](HARD_RULES_DETAIL.md).

## Permintaan tarik kereta api

1. Mulakan cawangan kereta api di hujung pangkalan keluaran semasa. Sepadukan ketua ahli yang diluluskan dengan tepat menggunakan komit gabungan. Kekalkan sejarah komitmen mereka dengan mengelakkan skuasy dan rebase.
2. Buka satu permintaan tarik untuk cawangan kereta api. Sahkan PR itu dengan CI penuhnya sendiri pada hujung asas semasa. Periksa semula hujung pangkal dan kepala ahli yang diluluskan sebelum mendarat. Muat semula kereta api dan CI apabila calon yang disahkan bertukar.
3. Daratkan PR kereta api dengan komit gabungan di bawah mod baris gilir yang berkenaan. Dalam mod langsung, kaedah pendaratan `merge-ff` baris gilir mengekalkan komitmen gabungan. Ketua ahli asal boleh dihubungi dari cawangan keluaran. GitHub menandakan ahli PRs sebagai digabungkan dan komit mengekalkan pengarangnya.

Contoh awam ialah [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Ia menggabungkan 18 ahli PRs dan mendarat dengan komit gabungan pada 2026-11-24.

Penyegerakan kembali dari `main` ke cawangan keluaran seterusnya juga tiba melalui komit gabungan. Memelihara keturunan `main` diperlukan untuk penyegerakan kemudian. Lihat [Pengasingan Worktree](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Pengesah gabungan kereta api tempatan

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Pengesah mengambil kepala pangkalan dan PR dan menggabungkannya dalam pokok kerja pakai buang. Ia menjalankan suite paritinya sekali pada pokok yang terhasil. Konflik head fetch atau merge yang gagal mengeluarkan PR dan skrip itu diteruskan dengan PRs yang tinggal.

- **`--plan`** mencetak langkah dan keluar mod yang dipilih tanpa membuat worktree atau menghubungi alat kawalan jauh. Gabungkannya dengan `--fast` untuk memeriksa pelan pantas.
- **`--fast`** menjalankan get statik biasa, fail `node:test` yang dipilih diubah di bawah `tests/unit/`, dan `npm run test:vitest`. Jalankan pengesahan tempatan penuh sekurang-kurangnya sekali sehari pada petua terkumpul apabila menggunakan mod pantas.
- **Mod penuh** menambah gerbang statik penuh sahaja dan menjalankan `npm run test:unit` dan `npm run test:vitest`.

Gerbang statik yang gagal dijalankan semula pada pangkalan yang tidak disentuh jika siasatan asas tersedia. Skrip melaporkan kegagalan yang diwarisi dan berterusan apabila setiap baris pelanggaran yang diiktiraf turut muncul di pangkalan dan jumlah kiraan tidak bertambah.

| Keluar | Maknanya                                                                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Mencetak pelan atau menyiapkan suite. Ringkasan suite menyenaraikan sebarang kegagalan statik yang diwarisi dan PRs yang dikeluarkan.                    |
| `1`    | Argumen tidak sah, tiada pembayaran Git, prapenerbangan gagal, atau tiada PR menaiki pesawat.                                                            |
| `2`    | Semakan suite gagal dan tidak layak sebagai diwarisi. Pengendali boleh membelah kumpulan, mengeluarkan PR yang menyinggung perasaan dan jalankan semula. |

Pas tempatan membekalkan bukti diagnostik untuk dossier pemilik sahaja. Setiap pendaratan masih memerlukan kebenaran pemilik, semakan yang diperlukan sendiri dan keputusan baris gilir bayangan apabila berkenaan.

## Pemeringkatan

- **Per PR.** CI dan Kualiti pilih semakan berdasarkan laluan yang diubah. Kod PRs menjalankan gerbang kualiti yang pantas dan ujian terkesan, dengan tugas unit dan Vitest yang berasingan di CI.
- **Setiap calon beratur.** CI dan Kualiti menjalankan profil penuh untuk calon yang terdiri pada rujukan baris gilirnya.
- **Setiap petua keluaran.** Release-Green menjalankan pintu keras pantas pada tolakan yang sepadan dengan penapis laluannya. Tiga larian berjadual setiap hari menggunakan sapuan penuh untuk cawangan keluaran.
- **Setiap keluaran.** Matriks CI penuh termasuk serpihan E2E, pengesahan pakej, asap but tarball dan semakan liputan. Lihat [Senarai Semak Keluaran](RELEASE_CHECKLIST.md).

## Prasyarat daftar keluar baru untuk `merge-train.sh`

Prapenerbangan berjalan sebelum mencipta worktrees. Pasang kebergantungan dengan `npm ci`. Sahkan bahawa `node_modules/.bin/tsc` boleh laku dan `node_modules/node_modules` tiada. Semak bahawa `node_modules/.bin/bun --version` berjaya.

Jika pasca pemasangan Bun telah dilangkau, jalankan `(cd node_modules/bun && node install.js)`. Konsistensi pembekal dan semakan simbol yang diketahui menggunakan Bun. Pengesah menjalankan `npm run check:cycles:ratchet` sebagai get menyekat. Perintah `npm run check:cycles` kendiri adalah nasihat.

## Sejarah

Barisan gilir gabungan Mergify telah ditamatkan pada 2026-11-19.
