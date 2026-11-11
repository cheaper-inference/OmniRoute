# Release-Green: candidate validation and evidence (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green mengamati komitmen tertentu dan melaporkan hasil validasinya. [Referensi Gerbang Kualitas](../architecture/QUALITY_GATES.md) menentukan profil CI saat ini, pemeriksaan yang diperlukan, dan kebijakan penerimaan. [Kebijakan penerimaan](../../config/quality/admission-policy.json) berversi adalah kontrak yang dapat dieksekusi untuk `Gate / CI` dan `Gate / Quality`.

## CI dan ruang lingkup pengamat

`ci.yml` dan `quality.yml` mencakup permintaan penarikan ke cabang utama dan cabang rilis. Profil yang dipilih menentukan pekerjaan mana yang dilamar. CI penuh juga mencakup jalur yang tidak dijalankan oleh permintaan penarikan biasa. Hasil pengamat cepat tidak dapat menggantikan pekerjaan tersebut, dan pembungkus alur kerja yang telah selesai tidak dapat menggantikan tanda terimanya.

Pembuatan produksi adalah milik CI. Tidak ada build penasehat duplikat di `quality.yml`. Artefak yang hilang, pekerjaan yang dibatalkan, dan pengukuran yang tidak lengkap tidak menentukan keberhasilan pemeriksaan yang diperlukan. Konfirmasikan basis saat ini, ketua dan kandidat gabungan sebelum menerima hasilnya.

## Validasi lokal

Jalankan pengamat di pohon kerja yang dimiliki setelah menyiapkan dependensinya. Gunakan [protokol pohon kerja dan sumber daya](WORKTREE_ISOLATION.md) sebelum validasi berat.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Profil cepat bersifat parsial. Profil lengkap memeriksa persyaratan modelnya dan menyimpan tanda terima perintah; itu tidak mengesahkan penerapan atau menggantikan pemeriksaan yang dihosting yang berlaku. Laporan ini membedakan kegagalan eksekusi dari penyimpangan metrik. Ratchet yang diperlukan tetap memblokir sesuai dengan kebijakan yang dipilih. Jangan menaikkan baseline hanya untuk mendapatkan hasil yang lewat.

## Sapuan malam hari dan manual

Rilis malam dan penyelesai kompatibilitas memilih cabang rilis kanonik. Pilihan tersebut harus cocok dengan cabang yang memicu alur kerja, dan suite menggunakan SHA acara yang tidak dapat diubah. Untuk eksekusi manual, pilih rilis yang diinginkan di `release_branch` dan kirimkan pada referensi yang sama:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Pengiriman lintas cabang ditolak sebelum mengeksekusi kode yang dipilih. Suite utama yang dihosting memeriksa `main` dan memverifikasi bahwa SHA -nya masih cocok dengan target yang diselesaikan sebelum instalasi. Jika gerakan utama selama resolusi, jalankan kembali sapuan yang tidak lengkap pada komit baru. Jangan gabungkan kuitansi suite dari kandidat yang berbeda.

## Triase kegagalan dan pemulihan

Gunakan insiden tersebut sebagai indeks diagnostik, lalu periksa proses, upaya, langkah gagal, dan artefak yang sebenarnya. Bandingkan bukti dasar dan bukti kandidat yang setara sebelum menghubungkan kegagalan dengan kontributor. Kesalahan infrastruktur, cacat bawaan, regresi kandidat, dan persetujuan yang tertunda memerlukan perbaikan yang berbeda.

Keterampilan `/green-prs`, `/sweep-reds`, `/validate-release-green` dan `/babysit` mengumpulkan bukti dan menyiapkan perbaikan berdasarkan cakupan terdokumentasinya. Pertahankan kredit kontributor, gunakan cabang perbaikan yang terisolasi, dan verifikasi semua pemeriksaan yang diperlukan sebelum penggabungan resmi. Tidak ada penetapan ulang otomatis atau penutupan insiden yang menggantikan kandidat yang lolos.
