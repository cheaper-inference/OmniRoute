# Quality Gates Reference (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dokumen ini merupakan referensi otoritatif untuk semua gerbang kualitas CI di OmniRoute.
Dokumen ini menjelaskan setiap gerbang, hal yang divalidasi, job CI tempat gerbang tersebut dijalankan, apakah gerbang tersebut menggunakan
baseline ratchet atau kebijakan lulus/gagal, serta apakah gerbang tersebut memblokir build atau hanya bersifat saran.

Untuk ringkasan singkat dan kebijakan allowlist, lihat bagian "Gerbang Kualitas & Ratchet"
di `AGENTS.md`. Untuk penilaian kritis, klasifikasi kematangan, dan rencana replikasi
yang tidak bergantung pada alat untuk sistem yang sama, lihat
[Playbook Gerbang Kualitas](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventaris gerbang dan profil eksekusi

### Penerimaan kandidat

Alur kerja CI dan Quality Gates masing-masing mengeluarkan keputusan yang stabil: `Gate / CI` dan `Gate / Quality`. Kebijakan penerimaan berversi mereka menyebutkan setiap pekerjaan hulu sesuai kebutuhan atau saran. Pekerjaan wajib yang berlaku harus berhasil: hasil yang hilang, dibatalkan, dilewati, tertunda, dan tidak diketahui tidak dapat menghasilkan PASS. Klasifikasi hanya dokumen atau hanya katalog yang valid dapat membuat jalur kode tidak dapat diterapkan; rancangan PR biasa bukanlah kandidat yang diterima. Label `hotfix` tidak mengesampingkan bukti.

Kedua alur kerja mencakup PRs ke cabang main/release, mendorong ke `main`, pengiriman manual, dan acara penggabungan grup. Dorong, kirim, dan gabungkan grup, jalankan pilihan penuh. Draf antrean Mergify yang tepercaya juga menjalankan pekerjaan `full-code`/`full-code-e2e` yang berlaku; PRs biasa lewati saja. Sebelum penggabungan manual, jalankan pengiriman penuh pada kandidat yang tepat. Dorongan ke `release/**` tidak memulai alur kerja ini; Release-Green mengamati basis gabungan secara terpisah ( jalur yang dihosting `docs/ops/RUNNER_BOX.md` → ). Garpu dan grup gabungan menggunakan pelari yang dihosting untuk pekerjaan yang sebaliknya memilih pelari yang dihosting sendiri; kapasitas host yang memadai harus diverifikasi sebelum peluncuran.

PR biasa menjalankan seleksi cepat. Jalur `full-code` dan `full-code-e2e` dari kebijakan penerimaan (E2E, integrasi, artefak paket, asap Electron, Bun SQLite, klien ekosistem dan protokol) hanya berjalan pada draf antrean Mergify atau dijalankan penuh: `gh workflow run ci.yml --ref <branch>`.

Setiap tanda terima JSON mengidentifikasi SHA yang diperiksa, alur kerja yang dijalankan, dan upaya. CLI menolak ketidakcocokan checkout/event SHA. Tes alur kerja mengikat keanggotaan kebijakan ke daftar `needs` tugas putusan sehingga jalur baru atau jalur yang dihapus tidak dapat hilang secara diam-diam. Tanda terima mencakup alur kerjanya sendiri, bukan publikasi, penerapan, atau internal pemindai penasihat yang ada. Melakukan pemeriksaan yang berlaku yang diwajibkan dalam peraturan cabang merupakan perubahan administratif tersendiri; mendefinisikan pekerjaan mereka tidak dengan sendirinya melindungi suatu cabang.

`API Route Typecheck` adalah pemeriksaan alur kerja independen, di luar putusan agregat dan profil statis pengamat penuh lokal. Periksa hasilnya secara terpisah untuk kandidat yang tepat. `.github/workflows/api-route-typecheck.yml` berjalan di PRs menjadi `main` atau `release/**`, mendorong ke keluarga cabang, pengiriman manual, dan peristiwa `merge_group` bertipe `checks_requested`. Ia tidak memiliki filter jalur. Gabungkan grup, periksa `merge_group.head_sha`; acara lainnya lihat `github.sha`. Semua peristiwa menggunakan gerbang diagnostik API dan pengujian unit gerbang yang sama. Penargetan ulang basis PR meminta pemeriksaan baru; Pengeditan body/title menggunakan nama observasi saja `Admission not requested / API Route Typecheck` dan tidak dapat menggantikan pemeriksaan penerimaan.

### Bukti yang disimpan di peredam penerimaan

`scripts/quality/validate-release-acceptance.mjs` mengurangi rencana yang disediakan dan manifesnya; hal ini tidak menetapkan bahwa rencana tersebut mencakup seluruh jalur pelepasan. Laporannya secara eksplisit menetapkan `releaseAcceptance: false`, meskipun rencana tersebut adalah `VERIFIED`. Alur kerja `release-acceptance.yml` masih menggunakan perlengkapan bayangan, bukan tanda terima pembuatan, paket, boot, atau promosi yang sebenarnya.

CLI mengharuskan `--evidence-root` untuk memverifikasi bukti yang disimpan. File diselesaikan sebagai `<evidence-root>/<artifact_id>/<member>` dan di-hash sebagai SHA-256. Catatan PASS tanpa bukti, file yang hilang atau diubah, jalur yang tidak aman, atau symlink mencegah verifikasi. File yang hilang tidak sama dengan log sukses yang kosong. Pemeriksaan SHA/run/attempt yang ada tetap independen: byte yang cocok tidak dapat menyelamatkan tanda terima yang sudah basi. Integritas file bukan bukti keaslian eksekusi atau promosi artefak.

### DAST menggunakan build CI yang terverifikasi

Pekerjaan `dast-smoke` CI yang diperlukan memanggil `.github/workflows/dast-smoke.yml` setelah `build`. Ini mengikuti pilihan code/draft yang sama dengan build, termasuk fork PRs yang didukung, PRs target rilis, dan grup gabungan. Pekerjaan DAST yang hilang, gagal, dibatalkan, atau dilewati secara tidak terduga memblokir `Gate / CI`. Alur kerja yang dapat digunakan kembali tidak memiliki pemicu PR/dispatch independen; validasi manual menggunakan pengiriman CI sehingga build dan konsumen tetap berjalan dalam satu proses.

`scripts/ci/next-build-provenance.mjs` menyegel artefak Next lengkap dengan intisari tar, repository/event/run, upaya produser, head/base/checkout/tree, identitas alur kerja, file kunci, Node version/ABI yang tepat, platform dan bundler. DAST memilih artefak abadi ID dari `needs.build.outputs`, memerlukan verifikasi intisari unduhan, dan secara independen melakukan hashing pada ZIP terhadap intisari produsen sebelum mengekstraksi dua anggotanya yang diizinkan melalui `scripts/ci/unpack-ci-build.py`. Arsip manifes dan tar juga harus cocok dengan keluaran produsen independen sebelum pohon Berikutnya diekstraksi. Ia tidak pernah mencari pembangunan cabang terbaru yang berhasil. Pemutaran ulang sebagian dapat menggunakan kembali upaya produsen yang sama ketika ID dan semua inputnya masih cocok; tanda terima mencatat kedua upaya tersebut.

Konsumen tetap berada di runner Linux yang dihosting dengan izin repositori hanya-baca dan tanpa rahasia repositori. Ini menginstal versi Node persis pabrikan, lalu merakit CLI dengan `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` menolak server mandiri yang hilang sebelum pembuatan cadangan; build CLI lokal normal mempertahankan fallback yang ada. Kesiapan server, Skema, dan promptfoo semuanya harus berhasil dalam batas pekerjaan 25 menit yang tidak berubah. Tanda terima asal membuktikan identitas dan byte masukan, bukan pemindaian DAST yang berhasil. Kedaluwarsa artefak, gangguan pelari, atau pemindai yang gagal tetap menjadi bukti yang tidak lengkap atau gagal; itu tidak bisa menjadi PASS melalui pembungkus penasehat.

### Kapasitas eksekusi UI

CI menjalankan inventaris UI penuh sebagai empat pecahan matriks `test-vitest`, masing-masing dengan maksimal dua pekerja per pecahan dan tenggat waktu pekerjaan yang ada yaitu 15 menit. Pecahan pertama juga menjalankan suite MCP/autoCombo Vitest. Hasil pekerjaan yang diperlukan mencakup setiap kaki matriks; kegagalan atau pembatalan satu pecahan tidak dapat menentukan penerimaan kandidat.

Pengamat malam menyimpan tanda terima kandidat pasti yang terpisah untuk setiap pecahan UI, termasuk eksekusi MCP di tanda terima pertama. Keempat tanda terima, log, dan identitas eksekusi yang cocok diperlukan. `npm run test:vitest:ui` lokal masih memilih rangkaian lengkap; satu kali proses `--shard` hanyalah sebagian bukti.

### Koleksi cakupan unit

Dua belas pecahan unit mengumpulkan cakupan V8 selama pelaksanaan pengujian yang ada. Pecahan yang berhasil menjalankan `scripts/ci/compact-v8-coverage.mjs` untuk mengompresi file asli tanpa menghasilkan laporan perantara Istanbul. Tugas Cakupan akhir memverifikasi kedua belas manifes terhadap kandidat SHA, runtime, root sumber, dan hash data, lalu menjalankan reporter c8 dan ambang batas cakupan yang ada. Input mempertahankan urutan nama file global c8; pra-penggabungan per pecahan tidak aman untuk cakupan function/block campuran. Pecahan yang hilang, salah format, atau tidak kompatibel gagal masuk. Pecahan pengujian yang gagal mempertahankan cakupan diagnostik mentah secara terpisah; itu tidak bisa memasuki penggabungan akhir.

### Tanda terima kemajuan eksekusi unit

Perintah `test:unit:ci:shard` bersama mencatat fase `primary`, `dashboard` dan `serial` melalui `scripts/ci/unit-progress-reporter.mjs`. Laporan pengujian normal tetap tersedia. Tanda terima khusus metadata yang terpisah mencatat awal dan penyelesaian setiap file, dan detak jantung 30 detik mencantumkan file yang masih aktif dan waktu yang telah berlalu. Ini hanya mencatat metadata eksekusi yang diizinkan; deskripsi pengujian, keluaran, badan kesalahan, dan lingkungan lengkap tidak diserialkan.

CI menyimpan file JSONL sebagai `unit-progress-ci-<run>-<attempt>-<shard>`. Batas waktu tugas dapat mencegah pengunggahan berikutnya; detak jantung yang sudah keluar tetap menjadi bukti diagnostik. Detak jantung yang hilang juga dapat mencerminkan proses pelari yang diblokir atau dihentikan. Tanda terima ini mempertahankan seleksi tes, konkurensi, tenggat waktu, dan status keluar yang ada; itu bukan keputusan penerimaan kandidat.

### Gabungkan antrian

Label `queue` mengirimkan PR ke antrian Mergify (`.mergify.yml`). Mergify membuka draf PR di cabang `mergify/merge-queue/`, CI menjalankan pilihan penuh di sana, dan PR asli digabungkan ketika `Gate / CI`, `Gate / Quality` dan `Merge integrity (changelog + generated skills)` lulus.

Mergify menulis ringkasan antreannya ke dalam deskripsi draf. Peristiwa Body/title-only `pull_request` `edited` menggunakan grup konkurensi khusus proses dan tidak menjalankan ulang klasifikasi, menguji matriks, menggabungkan integritas, atau keputusan penerimaan. Nama pemeriksaan khusus observasi tidak dapat menggantikan `Gate / CI` atau `Gate / Quality`. Pengeditan yang mengubah basis target meminta validasi kandidat baru.

Setelah dequeue, push tidak selalu membuat PR kembali antri. Komentari `@mergifyio queue` tentangnya.

### Inventaris pemindaian statis

Inventaris npm-alias berversi dan keanggotaan pemindaian statis ada di `config/quality/gate-manifest.json`. Jalankan `npm run check:gate-manifest` untuk memvalidasi nama skrip dan perintah yang tepat terhadap `package.json`; penambahan, penghapusan, dan penyimpangan perintah menggagalkan pekerjaan kait lokal dan klasifikasi perubahan di CI. Alias bukanlah tugas alur kerja, contoh matriks, atau kasus uji: penghitungan ini tidak boleh disajikan sebagai sesuatu yang dapat dipertukarkan.

Gunakan `npm run quality:scan -- --list` atau `npm run quality:scan:fast -- --list` untuk memeriksa alias yang dipilih tanpa menjalankannya. Pelari memanggil titik masuk npm, sehingga waktu prosesnya (termasuk Bun jika dikonfigurasi) dipertahankan. Manifes mencatat alias di luar profil tersebut seperti yang dipanggil secara terpisah, dan perintah pemeliharaan dilarang di profil pemindaian hanya-baca.

Profil ini hanya mencakup pemindaian statis. Mereka tidak mengesahkan pengujian produk, cakupan, pengemasan, pemeriksaan eksternal, atau penerimaan pelepasan penuh kandidat. Penerimaan alur kerja menggunakan `config/quality/admission-policy.json` dan `scripts/quality/admission-verdict.mjs` yang tertaut. Profil pengamat rilis tetap terpisah; memeriksa cek dan kuitansi yang berlaku secara mandiri. Perintah statis pengamat lengkap dideklarasikan dalam `config/quality/release-green-static-profile.json`, termasuk `audit:deps`, pemilihan uji mutasi, dan pemeriksaan terjemahan. Loader memvalidasi perintah npm terhadap package.json dan model deklarasi CI/Quality ; itu menolak penyimpangan alih-alih mengeksekusi token shell sebagai argumen. Pemindai yang diperlukan Keluaran SKIP/INCOMPLETE tidak dapat membuat PASS. Profil mencatat pengecualian eksternal dan tidak menggantikan cakupan yang dihosting, matriks pengujian, paket, atau bukti penerapan. Inventarisasi prosa di bawah ini adalah referensi, bukan bukti bahwa sebuah gerbang benar-benar berfungsi.

Skrip berada di bawah `scripts/check/` (gerbang kebijakan) dan `scripts/quality/` (mesin ratchet). Sumber kebenaran CI adalah `.github/workflows/ci.yml`.

### Kesehatan dokumentasi berbasis publikasi

`.github/workflows/i18n-base-health.yml` mengamati kesehatan dokumentasi setelah dorongan yang dipilih ke `main` dan `release/v*`, dan pada pengiriman manual. Filternya mencakup dokumentasi, root Markdown, `llm.txt`, terjemahan state/configuration, dan perkakas i18n yang relevan. Pekerjaan `Published base documentation health` tunggal menggunakan Ubuntu yang dihosting dan tenggat waktu lima menit. Ia melakukan validasi read-only dan menulis tanda terima diagnostik tanpa instalasi ketergantungan, terjemahan atau adopsi negara.

`scripts/i18n/check-base-health.mjs` tidak memerlukan hash sumber, target hilang, hash target, terjemahan basi, dan inkonsistensi cache bagian. Ini juga memvalidasi cakupan inti document/locale saat ini dan asal usulnya yang tercatat. Konteks tidak valid, cakupan tidak lengkap, atau pemeriksa terputus menghasilkan `INCOMPLETE`; penyimpangan yang dikonfirmasi menghasilkan `FAIL`. Keduanya mengembalikan status keluar yang gagal. Tanda terima terikat untuk checkout SHA, alur kerja, jalankan dan coba, dan disimpan sebagai `i18n-base-health-<sha>-<run>-<attempt>`.

Ini adalah pengamatan independen dari basis yang dipublikasikan. Itu tidak menambahkan acara PR atau penggabungan grup, pemeriksaan PR yang diperlukan, alias npm, atau anggota profil pemindaian statis. Pemeriksa yang mendasarinya juga memblokir kelima kelas dalam mode absolut. Persiapan PR biasa tetap terpisah dari penerimaan. Upload yang berhasil tidak dapat mengubah hasil kesehatan yang gagal menjadi PASS.

PR biasa menggunakan `--preflight` dengan laporan dasar yang dihasilkan oleh `--baseline-evidence`. Ini mungkin membiarkan sumber bahasa Inggris tertunda hanya jika catatan terjemahan lengkap dan byte target sebenarnya tidak berubah dari basis sebenarnya. Inkonsistensi target baru atau cache bagian masih menghalangi, dan bukti yang tidak lengkap tidak dapat membenarkan persiapan. Laporan tersebut memaparkan `preparationPending` dan `mergeReady` secara terpisah: persiapan yang berhasil tidak membuat terjemahan yang tertunda siap untuk digabungkan. Segarkan cermin yang terkena dampak pada kandidat yang disusun sebelum masuk. Kandidat antrean Mergify yang tepercaya, `merge_group`, dorong cabang, dan pengoperasian CI manual menggunakan pemeriksa absolut, tanpa `--warn` atau pengampunan kegagalan yang diwariskan. Hash target yang hilang dan cakupan yang dikurangi dengan rekaman file inti yang dihapus tidak dapat menghasilkan keputusan absolut yang berhasil.

### Rilis jalur cepat PR (`quality.yml`)

`.github/workflows/quality.yml` melengkapi CI pada main/release PRs, mendorong ke `main`, mengirim dan menggabungkan grup. PRs menggunakan pemeriksaan cepat yang difilter jalur. Duplikat build yang dinonaktifkan secara permanen telah dihapus; pemeriksaan build/package/boot yang sebenarnya tetap ada di CI. Unit suite dan vitest hanya dijalankan di CI (`Unit Tests (N/12)` dan `Vitest`).

| Pekerjaan                                        | Cakupan                                                                                                                                                                                                             | Pemblokiran        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Referensi dokumen API dan semua dokumen                                                                                                                                                              | Ya                 |
| `Fast Quality Gates`                             | Kode PRs; pemeriksaan statis, pemeriksaan ketik, pemeriksaan ketik dasbor, pengujian unit yang terkena dampak                                                                                                       | Ya                 |
| `Forgotten sibling tests`                        | Kode PRs; mengubah modul yang ditelusuri ke konsumen statis dan pengujian calon saudara; jalur barel dan impor dinamis dilaporkan sebagai diagnostik penasehat, dengan referensi pengecualian daftar yang diizinkan | **Penasihat**      |
| `No new ESLint warnings`                         | Kode PRs; pelindung serat yang sadar akan penindasan                                                                                                                                                                | Ya, termasuk garpu |
| `Merge integrity (changelog + generated skills)` | PRs non-draf; changelog dan sinkronisasi keterampilan yang dihasilkan                                                                                                                                               | Ya, termasuk garpu |

#### Laporan tes saudara yang terlupakan

`npm run check:forgotten-sibling-tests` berjalan sebagai langkah penasehat `Fast Quality Gates` dan menggunakan kembali pemecah masalah impor di belakang peta dampak uji. Untuk setiap modul produksi yang diubah, modul ini melaporkan rantai `changed module/symbol -> static consumer -> candidate sibling test` deterministik ketika pengujian kandidat tidak ada dalam perbedaan permintaan tarik. Ringkasan penurunan harga dan hasil JSON dipertahankan sebagai artefak alur kerja `forgotten-sibling-tests` untuk kalibrasi sebelum peluncuran pemblokiran apa pun.

Ekspor ulang barel dan impor dinamis hanya merupakan diagnostik penyelesaian; mereka tidak pernah membuat temuan pemblokiran. Pengecualian yang ditinjau ada di `config/quality/forgotten-sibling-allowlist.json`. Setiap entri harus menyebutkan nama konsumen dan kandidat pengujian, memberikan alasan spesifik, dan menghubungkan masalah GitHub atau permintaan penarikan. Entri yang salah format gagal ditutup. Pengecualian tidak dapat menyembunyikan pengujian kandidat yang dihapus atau perbedaan yang menambahkan `.skip`/`.todo`; penegasan pelemahan dan penyembunyian lainnya tetap dimiliki oleh gerbang `check:test-masking` yang memblokir secara independen.

### Pekerjaan: `lint`

Berjalan di setiap PR hingga `main`. Blok bergabung jika gagal.

| Skrip (`npm run ...`)             | Memvalidasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Pemblokiran                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Versi Node.js berada dalam kisaran yang didukung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                        |
| `check:cycles`                    | Impor melingkar di seluruh `src/` + `open-sse/` (berbasis AST, tsconfig `paths` diselesaikan). Bare keluar 1 setiap kali ada siklus (ditutup gagal sejak #15281) dan mencantumkan SCCs. `check:cycles:ratchet` (apa yang dijalankan CI ) memblok ketika hitungan melebihi batas atas `metrics.cycles` di `quality-baseline.json` — saat ini 14, `direction: down`, sehingga hanya bisa turun (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya (roda gigi)                            |
| `check:boundary`                  | Kopling `open-sse → src` : impor file-ke-file unik dari mesin ke dalam aplikasi (`scripts/quality/measure-boundary.mjs`; daftar tepinya adalah simpanan remediasi core/module-split v4). Laporan penasihat = kosong (sama seperti `quality:boundary`). `check:boundary:ratchet` (apa yang dijalankan CI, juga di loop ratchet gerbang cepat `quality.yml` ) diblokir ketika hitungan melebihi batas atas `metrics.boundaryOpenSseToSrc` di `quality-baseline.json` — yang diunggulkan pada 771 yang diukur, `direction: down`; `--update` hanya menurunkannya; basis-relatif pada PRs (`--base-ref`, lihat di bawah)                                                                                                                                                                                                                                                                                                                                                                                                        | Ya (roda gigi)                            |
| `check:route-validation:t06`      | Skema Zod ada di semua rute (kebijakan Tingkat 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya                                        |
| `check:any-budget:t11`            | Jumlah `@ts-expect-error // any` tidak melebihi anggaran (catraca Tingkat 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                        |
| `check:provider-consistency`      | Setiap penyedia di `providers.ts` memiliki entri yang cocok di `providerRegistry.ts` (dan sebaliknya, dalam daftar yang diizinkan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                        |
| `check:model-lifecycle`           | Tiga tabel perutean yang dikelola secara manual tetap konsisten dengan snapshot siklus hidup yang diperiksa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tidak mencetak id yang dihentikan yang dapat dirutekan `REGISTRY` ; setiap target `BUILT_IN_ALIASES` ada di `REGISTRY` dan tidak ada dalam snapshot id pensiun; setiap id pensiun yang masih di `REGISTRY` diteruskan atau dicantumkan di `allowedRetiredInCatalog`; dan tidak ada sumber atau target `DEFAULT_DEGRADATION_MAP` yang tampak dihentikan dalam snapshot tersebut. Hal ini tidak membuktikan bahwa model saat ini dilayani oleh live upstream. — offline dibandingkan dengan `config/quality/model-lifecycle.json`, disegarkan secara manual dengan `npm run quality:refresh-model-lifecycle` (jaringan; tidak dihubungkan ke CI). `allowedRetiredInCatalog` adalah ratchet burn-down: tambahkan entri hanya dengan masalah pelacakan.                                                                                                                | Ya                                        |
| `check:fetch-targets`             | Setiap `fetch("/api/...")` di `src/` sisi klien menghasilkan `route.ts` nyata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                        |
| `check:deps`                      | Semua deps `npm install` -able di setiap `package.json` di repo berada di `dependency-allowlist.json`; paket baru yang tidak dipasangi pin atau slopsquat ditandai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                        |
| `audit:deps`                      | npm audit dari kelima file kunci independen (root, Electron, plugin OpenCode v1/v2, dan penyedia). Blok penasehat kritis; peringatan tinggi tetap menjadi peringatan yang nyata. Audit Missing/failed adalah INCOMPLETE dan blok; hash dan laporan kunci per cakupan dipertahankan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                        |
| `check:lockfile`                  | Integritas `package-lock.json` Registri — https, hash integritas, tidak ada penggantian host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                        |
| `check:licenses`                  | Daftar lisensi SPDX yang diizinkan untuk dependensi produksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                        |
| `check:tracked-artifacts`         | Tidak ada artefak build/simlink `node_modules` yang dikomit (juga berjalan di pra-komit husky; pra-push sengaja dibuat ringan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                        |
| `check:ai-attribution`            | Tidak ada trailer AI/bot `Co-Authored-By` atau footer generasi AI di PR yang dilakukan, judul atau isi — Hard Rule #16 (di loop gerbang cepat `quality.yml` untuk PR→ `release/**` — membaca payload peristiwa, PRs — yang tidak boleh dibuka, dan langkah khusus PR di lint `ci.yml` untuk PR→ `main`; juga hook `commit-msg` husky; rekan penulis manusia mengizinkan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Setiap pengecualian Vitest menyebutkan masalah pelacakan dan muncul di `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                        |
| `check:file-size`                 | File sumber (`.ts`/`.tsx` dalam `src/`, `open-sse/`, `electron/`, `bin/`) tetap berada dalam `cap` dan file uji (`*.test.ts(x)`) dalam `testCap`; file yang dibekukan di `file-size-baseline.json` (`frozen` / `testFrozen`) tidak boleh melebihi ukuran rekamannya                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                        |
| `check:error-helper`              | Respons kesalahan di executors/handlers menggunakan `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya                                        |
| `check:migration-numbering`       | File SQL migrasi diberi nomor urut, tidak ada celah atau duplikat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya                                        |
| `check:public-creds`              | Tidak ada kunci OAuth `client_id`/`client_secret` atau Firebase Web literal di luar `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                        |
| `check:db-rules`                  | Tidak ada SQL mentah di luar modul `src/lib/db/` ; tidak ada impor barel dari `localDb.ts` (Aturan Keras #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                        |
| `check:known-symbols`             | Pelaksana penyedia, strategi perutean, dan penerjemah yang terdaftar di tabel pengiriman mereka cocok dengan file di disk — tidak ada simbol yang tidak terpakai atau tidak dideklarasikan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                        |
| `check:route-guard-membership`    | Setiap rute yang memunculkan proses anak diklasifikasikan berdasarkan `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                        |
| `check:test-discovery`            | Setiap file `*.test.ts` / `*.spec.ts` di repo dikumpulkan oleh setidaknya satu test runner (ratchet: daftar yatim piatu di `test-discovery-baseline.json` hanya dapat menyusut)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                        |
| `check:test-tla-order`            | Tidak ada file `node:test` di bawah `tests/unit` yang mendaftarkan pengujian, mencapai `await` tingkat atas, lalu mendaftarkan lebih banyak (#18045; ratchet: `test-tla-order-allowlist.json` hanya dapat menyusut)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                        |
| `check:agent-skills-sync`         | Artefak keterampilan agen yang dihasilkan cocok dengan katalog sumbernya (tidak ada penyimpangan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | Penyedia logos/assets membawa entri asal yang tercatat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | File konfigurasi JSON mengurai dan memenuhi aturan lint repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Kompilasi TypeScript tanpa kesalahan (hanya peringatan nasihat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                        |
| `typecheck:noimplicit:core`       | `noImplicitAny` — yang ketat berwawasan ke depan; banyak situs panggilan yang sudah ada sebelumnya masih memerlukan anotasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Penasihat** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` dicakup ke `src/app/(dashboard)/**` (#7033) Daftar 27 file yang dikurasi — `typecheck:core` tidak menyertakan dasbor apa pun TSX, dan `next build` juga tidak pernah memeriksanya (`next.config.mjs` menyetel `ignoreBuildErrors: true`), jadi regresi pengidentifikasi yatim di sana (#6625/#6909) tidak terlihat oleh CI. Berbeda dengan garis dasar penghitungan per-file/per-TS-code yang dibekukan (`config/quality/dashboard-typecheck-baseline.json`, pola penerapan basi yang sama seperti `check:known-symbols`) — hanya kesalahan NEW di luar penghitungan dasar yang gagal dalam gerbang; turunkan dengan `--update` ketika kesalahan yang sudah ada telah diperbaiki.                                                                                                                                                                                                                                                                                                                                     | Ya                                        |
| `check:build-typecheck`           | Pemeriksaan jenis produksi seluruh aplikasi melalui `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), daftar 27 file `typecheck:core` yang diizinkan dan gerbang dasbor tidak tercakup. Perbedaan dengan `config/quality/build-typecheck-baseline.json`; hitungan per (file, kode) yang baru atau yang dinaikkan gagal, hitungan yang lebih rendah meminta Anda untuk melakukan ratchet. `--update` menolak saat proses berisi pasangan baru atau yang dimunculkan kecuali `--force-regressions` diteruskan, dan menolak file yang baru dibungkam kecuali `--force-nocheck` dilewati, jadi memperluas garis dasar menjadi hijau dan memberikan keheningan permanen adalah dua tindakan disengaja yang terpisah. `--force` kosong ditolak. Juga memindai cakupan build untuk `@ts-nocheck` terhadap `config/quality/ts-nocheck-baseline.json`, karena file yang menggunakannya tidak melaporkan diagnostik sama sekali dan jika tidak, tidak akan terlihat oleh setiap gerbang. | Ya                                        |

#### Dua program pengetikan menjawab secara berbeda

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) dan `check:build-typecheck` mengkompilasi program yang berbeda dengan opsi yang berbeda, dan file yang sama dapat bersih di satu program dan penuh kesalahan di program lainnya.

`tsconfig.build.json` menyetel `"strict": false`, jadi `noImplicitAny` tidak aktif. Konfigurasi inti mengkompilasi daftar 27 file yang diizinkan dengan opsi yang lebih ketat dan mengikuti grafik impor setiap entri, sehingga file yang tidak pernah muncul dalam program build masih diperiksa di sana.

Konsekuensinya penting ketika menilai apakah suatu file diketik:**nol diagnostik di bawah `check:build-typecheck` tidak berarti nol** . Menghapus `@ts-nocheck` dari 26 file menunjukkan 23 di antaranya bersih dalam program build; enam belas di antaranya memunculkan sekitar 120 kesalahan implisit-apa pun dalam kesalahan ketat. Periksa keduanya sebelum memanggil file bersih.

### Pekerjaan: `quality-gate`

Berjalan setelah `test-coverage`. Blok bergabung jika gagal.

| Naskah                       | Memvalidasi                                                                                                                                                               | Pemblokiran       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | Memancarkan `quality-metrics.json` (jumlah peringatan ESLint, cakupan dari laporan pecahan gabungan)                                                                      | Ya (hulu ratchet) |
| `quality:ratchet`            | Setiap metrik di `quality-baseline.json` belum mengalami kemunduran (ESLint memperingatkan garis dasar ≤ ; cakupan garis dasar ≥ )                                        | Ya                |
| `check:duplication`          | Duplikasi kode (jscpd@4) tidak melebihi garis dasar di `quality-baseline.json`                                                                                            | Ya                |
| `check:complexity`           | Kompleksitas siklomatik tingkat file tidak melebihi batas (inti ESLint `complexity` + `max-lines-per-function`)                                                           | Ya                |
| `check:cognitive-complexity` | Ratchet kompleksitas kognitif (`eslint-plugin-sonarjs`) — memisahkan ESLint pass; CI menjalankan keduanya digabungkan sebagai langkah `check:complexity-ratchets` tunggal | Ya                |
| `check:dead-code`            | Ekspor/file ratchet (knip) yang tidak digunakan tidak mengalami kemunduran vs baseline                                                                                    | Ya                |
| `check:compression-budget`   | Anggaran tolok ukur kompresi — tingkat penghematan token per mesin tidak boleh mengalami kemunduran                                                                       | Ya                |
| `check:type-coverage`        | Ratchet bertipe persen (`type-coverage`) tidak mengalami kemunduran; sebagian besar mencakup `typecheck:noimplicit:core`                                                  | Ya                |

### Pekerjaan: `codeql-scan` dan `codeql-admission`

`codeql-scan` menghasilkan semua kategori analisis yang dikonfigurasi. Setelah pekerjaan itu berhasil, `codeql-admission` memvalidasi unggahan persisnya dan ratchet peringatan kandidat. Keduanya merupakan dependensi wajib `Gate / CI`, termasuk kandidat khusus dokumen. Aktivasi administratif dan persyaratan canary dijelaskan pada "CodeQL ratchet" di bawah.

| Naskah                 | Memvalidasi                                                                                                                                                                                          | Pemblokiran |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:codeql-ratchet` | Kandidat ref/SHA dan semua kategori analisis yang dikonfigurasi harus terkini sebelum peringatan ratchet; blok bukti yang hilang. Inventaris global tetap terpisah — lihat "CodeQL ratchet" di bawah | Ya          |

### Pekerjaan: `quality-extended`

Pekerjaan tersebut memblokir kandidat yang dapat melamar. Ukuran bundel, temuan rahasia, temuan kerentanan, temuan alur kerja, dan perubahan OpenAPI diperiksa dengan ratchet yang diperlukan. Diagnostik ketergantungan melingkar tetap bersifat nasihat. Instalasi pemindai diperlukan: `scripts/ci/install-quality-scanners.sh` menyediakan versi yang disematkan dan menyebarkan kegagalan instalasi. Alat yang hilang, laporan yang tidak valid, atau garis dasar yang hilang meninggalkan gerbang pemindai yang diperlukan INCOMPLETE.

| Naskah                   | Memvalidasi                                                                                                                                                                                                                     | Pemblokiran                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Tidak ada ketergantungan melingkar (dpdm)                                                                                                                                                                                       | **Penasihat**                                         |
| `check:bundle-size`      | Ukuran bundel tidak melebihi batas; pengukuran yang tidak tersedia gagal                                                                                                                                                        | **Memblokir dengan --ratchet**                        |
| `check:secrets`          | Temuan Gitleaks tidak mengalami kemunduran; pemindaian yang diperlukan menolak tools/source/baseline yang hilang, pemindaian yang gagal, dan laporan yang tidak valid                                                           | **Memblokir dengan --ratchet**                        |
| `check:vuln-ratchet`     | Kerentanan ketergantungan tidak mengalami kemunduran; pemindaian yang diperlukan menolak alat yang hilang, laporan tidak valid, atau garis dasar yang hilang                                                                    | **Memblokir dengan --ratchet**                        |
| `check:workflows`        | Serat alur kerja (actionlint + zizmor); Pemindai missing/broken, laporan tidak valid, atau garis dasar ratchet yang hilang gagal seperti INCOMPLETE. Temuan yang valid mengikuti kebijakan strict/advisory/ratchet yang dipilih | Diperlukan eksekusi; pemblokiran ratchet zizmor di CI |
| `check:openapi-breaking` | Kontrak API publik terhadap penerapan peristiwa yang disematkan (basis gabungan PR, dorong sebelumnya, basis grup gabungan; scheduled/manual checkout induk pertama); pengukuran yang diperlukan gagal ditutup                  | **Memblokir dengan --ratchet**                        |

### Pekerjaan: `docs-sync-strict`

Untuk permintaan penarikan ke `main` atau `release/**`, pekerjaan ini hanya berjalan untuk kandidat non-draf (atau antrean tepercaya) yang diklasifikasikan sebagai dokumentasi atau perubahan kode. Ini juga berjalan pada acara non-PR CI ; pemicu push alur kerja ini hanya mencakup `main`, bukan `release/**`. Sebuah langkah yang keluar bukan nol akan memblokir pekerjaan; temuan hanya laporan dan pengecualian yang terdokumentasi di bawah ini tidak berlaku.

| Naskah                         | Memvalidasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Pemblokiran                                                                                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate yang menjalankan 7 sub-gate di bawah ini secara berurutan                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                                                                                                                                                               |
| ↳ `check:docs-sync`            | Konsistensi versi Package/OpenAPI/CHANGELOG, mirror `llm.txt` yang tepat, invarian CHANGELOG section/size yang diterjemahkan, dan tidak adanya dokumen duplikat yang digantikan                                                                                                                                                                                                                                                                                                         | Ya                                                                                                                                                                               |
| ↳ `check:docs-frontmatter`     | Halaman dokumentasi yang dikompilasi mempunyai judul frontmatter yang valid                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                                                                                                                                                               |
| ↳ `check:docs-counts`          | Invarian hitungan dengan tingkat keyakinan tinggi sangat ketat; pemeriksaan jumlah file heuristik hanya memperingatkan kecuali skrip menerima `--strict` (gerbang meta CI tidak meneruskannya)                                                                                                                                                                                                                                                                                          | Pemblokiran tingkat yang ketat; penasehat tingkat lunak                                                                                                                          |
| ↳ `check:env-doc-sync`         | Sumber env membaca, `.env.example`, dan `docs/reference/ENVIRONMENT.md` setuju setelah daftar yang diizinkan secara eksplisit diabaikan, hanya dokumen, dan hanya env                                                                                                                                                                                                                                                                                                                   | Ya, di luar daftar yang diizinkan                                                                                                                                                |
| ↳ `check:deprecated-versions`  | Melaporkan kemungkinan versi basi di luar konteks historis yang aman dan tanggal pembaruan yang basi, tidak termasuk dokumen yang diabaikan                                                                                                                                                                                                                                                                                                                                             | Penasihat pada kabel CI saat ini (`--strict` tidak lolos)                                                                                                                        |
| ↳ `check:doc-links`            | Tautan penurunan harga internal dalam dokumen diselesaikan ke file nyata (formulir `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                                                                                                                                                               |
| ↳ `check:fabricated-docs`      | Rute, env vars, perintah CLI, nama kait, dan jalur file yang dikutip dalam dokumen ada di basis kode. Gerbang keras melalui `--strict`; soft-fail tanpa bendera.                                                                                                                                                                                                                                                                                                                        | Ya (melalui `--strict` di CI)                                                                                                                                                    |
| `check:cli-i18n`               | Kunci CLI `t()` bekas ada di `en`; `pt-BR` mempertahankan setiap bagian tingkat atas; `zh-CN` dan `zh-TW` berisi setiap kunci dari `en`                                                                                                                                                                                                                                                                                                                                                 | Ya                                                                                                                                                                               |
| `check:openapi-coverage`       | Spesifikasi OpenAPI mencakup setidaknya sebagian besar rute nyata                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                                                                                                                                                               |
| `check:openapi-security-tiers` | Anotasi `x-loopback-only`/`x-always-protected` yang dinyatakan harus didukung oleh `routeGuard.ts`; parser dan meneruskan blok ketidakcocokan. Pemeriksaan terbalik untuk `x-loopback-only` yang hilang di bawah peringatan prefiks khusus lokal, dan rute khusus pola dikecualikan dari jalur terbalik tersebut.                                                                                                                                                                       | Parser/forward memeriksa pemblokiran; nasihat pemeriksaan terbalik                                                                                                               |
| `check:openapi-routes`         | Setiap jalur `/api...` di `openapi.yaml` menyelesaikan parameter secara tidak sensitif ke rute sebenarnya setelah daftar izin `KNOWN_STALE_SPEC` yang dibenarkan; entri daftar izin basi juga gagal                                                                                                                                                                                                                                                                                     | Ya                                                                                                                                                                               |
| `check:docs-symbols`           | Referensi `/api/...` URL internal dalam dokumen non-cermin kanonik menentukan rute nyata atau kelompok rute; Referensi proxy/upstream/placeholder/file dan entri `KNOWN_STALE_DOC_REFS` yang dibenarkan dikecualikan, dan entri daftar izin basi gagal                                                                                                                                                                                                                                  | Ya                                                                                                                                                                               |
| `i18n translation drift`       | Penerimaan absolut tidak memerlukan inkonsistensi sumber nol, target hilang, hash target, terjemahan basi, dan cache bagian. Persiapan PR biasa mungkin menyimpan bukti warisan yang tepat atau perubahan tertunda hanya dalam bahasa Inggris dengan status lengkap dan byte target yang tidak berubah; laporannya secara terpisah menyatakan kesiapan penggabungan. Hash target tidak ada dan blok bukti dasar tidak lengkap. Tidak adanya cache bagian lama bukanlah suatu kegagalan. | Kelima kelas memblokir penerimaan queue/base ; izin persiapan biasa hanya mengizinkan pekerjaan yang terbukti diwariskan atau hanya pekerjaan yang tertunda dalam bahasa Inggris |

Dua belas README SVGs di bawah `docs/diagrams/` dihasilkan (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` membuat ulang semuanya). Masing-masing memiliki pengujian unit perbandingan byte (`tests/unit/docs/readme-*-svg.test.ts`, pekerjaan `test-unit`) yang gagal ketika file yang dikomit sudah basi, dan `check:docs-counts` membaca nomor kanonik dari node `<text>` mereka — itulah sebabnya langkah penguraian membuat setiap string yang digariskan dalam file sebagai `<text>` tidak terlihat. Pemeriksaan nomor kanonik SVG membaca file yang terdaftar di `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` dan `tier-flow-light.svg`; klaim gratis selamanya, entri katalog, kumpulan berulang, dan faktor penilaian juga dibaca `promise-pillars.svg`, `free-tier-budget.svg` dan `strategies-grid.svg`. `free-tier-budget.svg` mengambil gambarnya dari pemuat katalog langsung, jadi perubahan ke `FREE_MODEL_BUDGETS` atau nama tampilan penyedia akan memberi warna merah CI hingga file tersebut dibuat ulang.

### Pekerjaan: `i18n-ui-coverage`

| Naskah                             | Memvalidasi                                                                                                                                                                                                  | Pemblokiran     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `check-ui-keys-coverage` (sebaris) | Cakupan kunci UI i18n adalah ≥ 65%                                                                                                                                                                           | Ya              |
| `check-ui-value-drift` (sebaris)   | Bahasa Inggris yang ditulis ulang **nilai** tidak meninggalkan terjemahan basi                                                                                                                               | Ya              |
| `check-new-key-coverage` (sebaris) | A **baru** Kunci bahasa Inggris diterjemahkan di setiap lokal — penanda `__MISSING__:` ditolak                                                                                                               | Ya              |
| `check-translation-ratio`          | Rasio terjemahan nyata per lokal (identik dengan bahasa Inggris / placeholder / daun yang hilang di luar daftar yang diizinkan) tidak boleh melebihi `config/quality/i18n-translation-baseline.json` + slack | **Pemblokiran** |

Membutuhkan `fetch-depth: 0` — gerbang penyimpangan nilai membedakan `en.json` dengan basis penggabungan.

#### `check-ui-value-drift` — gerbang terjemahan basi

Menangkap regresi i18n yang secara struktural tidak dapat dilihat oleh gerbang lain: nilai bahasa Inggris ditulis ulang dan terjemahan yang berasal dari bahasa Inggris _sebelumnya_ tetap tertinggal, sehingga pengguna non-Inggris terus membaca salinan dengan kata-kata percaya diri, yang sekarang salah.

Ini dikirimkan secara nyata. `oauthModal.googleOAuthWarning` ditulis ulang ketika pembantu login Antigravity mendarat (#5203);**39 dari 43 lokal** terus mengirim pesan teks kepada operator untuk "menyalin URL lengkap dan menempelkannya di bawah" — alur yang tidak dapat diselesaikan untuk penyedia tersebut. Itu luput dari perhatian sampai #8463 karena:

- `sync-ui-keys` hanya mengisi ulang kunci yang ada **absen** , tidak pernah seperti itu **basi** ;
- `check-ui-keys-coverage` menghitung kunci _presence_, jadi skor terjemahan yang basi sudah tercakup;
- `check-translation-drift` melacak dokumentasi `docs/i18n/<locale>/**.md` yang mencerminkan — yang tidak pernah dibaca `src/i18n/messages/*.json`. Memblokir pekerjaan `docs-sync-strict` sejak sinkronisasi ulang 2026-09: edit dokumen inti → `npm run i18n:run -- --files=<doc>` (tingkat bagian, murah).

**Sadar akan perbedaan, tidak didukung oleh baseline.** Ini membandingkan `en.json` di basis penggabungan dengan pohon kerja; untuk setiap kunci yang nilai bahasa Inggrisnya berubah, lokal mana pun yang masih memiliki terjemahan yang belum tersentuh akan menjadi basi. Ini dengan sengaja **membekukan utang yang sudah ada sebelumnya** — a diff tidak dapat mengungkapkan dari bahasa Inggris kuno mana terjemahan lama itu berasal, jadi gerbang hanya menilai apa yang disentuh oleh perubahan saat ini. Alternatifnya (garis dasar hash per kunci) akan memerlukan file yang dihasilkan ~ 600 KB, 3 × garis dasar terbesar yang ada, berputar pada setiap i18n PR.

Dua cara untuk memuaskannya:

1. memperbarui terjemahan yang terpengaruh, atau
2. atur ke `__MISSING__:<new english>` — waktu proses kemudian menyajikan bahasa Inggris yang dikoreksi (`src/i18n/request.ts::deepMergeFallback`, #7258) dan antrean kunci untuk terjemahan.

Jika stringnya **arti** berubah, lebih suka **mengganti nama kunci** : kunci baru tidak dapat mewarisi terjemahan lama. Itulah pola yang digunakan #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Gerbang penyimpangan nilai dan gerbang kunci baru berbagi satu perbandingan yang tidak dapat diubah dari `scripts/i18n/resolve-ui-diff-base.mjs`. Alur kerja meneruskan basis, ujung dasar, dan kandidat SHAs yang sama ke kedua pemeriksaan. PR/base-retarget, push dan merge-group dijalankan menggunakan konteks acaranya. Mengirimkan cabang kandidat memerlukan PR terbuka yang tepat atau input `i18n_base_sha` eksplisit. Pengiriman atau observasi terjadwal `main` atau `release/vX.Y.Z` tanpa masukan tersebut membandingkan penerapan terakhir dengan induk pertamanya; ini bukan audit atas semua hutang terjemahan yang diwariskan. Pemanggilan lokal memerlukan basis perbandingan yang eksplisit, misalnya perintah `BASE_REF` di atas.

Konteks perbandingan yang hilang atau ambigu, katalog wajib yang tidak dapat dibaca atau tidak valid, dan kandidat yang diubah menghasilkan `INCOMPLETE` dengan kode keluar **2** , termasuk dalam mode peringatan. Pembacaan katalog menggunakan `scripts/i18n/read-ui-catalog.mjs`; kegagalan baca tidak diganti dengan objek kosong. Baik basis yang tidak tersedia maupun masukan yang tidak lengkap akan membentuk PASS.

### Pekerjaan: `i18n`

Matriks validasi i18n lengkap (satu pekerjaan per lokal). Seluruh pekerjaan bersifat penasehat.

| Naskah                          | Memvalidasi                      | Pemblokiran                                                    |
| ------------------------------- | -------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Kelengkapan terjemahan per lokal | **Penasihat** (`continue-on-error: true` di seluruh pekerjaan) |

### Pekerjaan: `pr-test-policy`

Hanya berjalan pada permintaan tarik.

| Naskah                 | Memvalidasi                                                                                                                                  | Pemblokiran |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PRs yang mengubah kode produksi di `src/`, `open-sse/`, `electron/`, atau `bin/` harus menyertakan atau memperbarui pengujian (Hard Rule #8) | Ya          |
| `check:test-masking`   | File pengujian yang diubah tidak mengurangi jumlah pernyataan bersih atau menambahkan tautologi `assert.ok(true)`                            | Ya          |
| `check:pr-evidence`    | Badan PR mengutip bukti test/VPS untuk perubahan tersebut (mekanisasi Aturan Keras #18 dengan memahami prosa PR — yang rapuh, lihat Backlog) | Ya          |

### Pekerjaan: `test-vitest`

Membutuhkan pekerjaan klasifikasi `changes`. Pecahan matriks yang berlaku menggabungkan blok jika terjadi kegagalan.

| Rangkaian        | Memvalidasi                                             | Pemblokiran                                                                                                                                      |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Server MCP (110 alat), autoCombo, cache — vitest runner | Ya                                                                                                                                               |
| `test:vitest:ui` | Komponen UI menguji pelari vitest —                     | **Pemblokiran** Kegagalan — yang sudah ada sebelumnya secara eksplisit dikecualikan di `vitest.config.ts`; kegagalan baru menggagalkan pekerjaan |

### Alur kerja malam (dijadwalkan, disarankan)

Ini berjalan pada jadwal cron (dan `workflow_dispatch`), tidak pernah pada PRs. Semuanya bersifat penasehat.

| Alur kerja             | Memvalidasi                                                                                                                                                                | Pemblokiran   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | tes properti pemeriksaan cepat dengan jumlah proses tinggi + seed acak                                                                                                     | **Penasihat** |
| `nightly-resilience`   | gerbang pertumbuhan tumpukan, injeksi kesalahan kekacauan, k6 load/soak                                                                                                    | **Penasihat** |
| `nightly-llm-security` | promptfoo injection guard (mode blok) Probe garak + (dilewati tanpa rahasia penyedia)                                                                                      | **Penasihat** |
| `nightly-schemathesis` | Fuzzing kontrak OpenAPI (skema) terhadap OmniRoute langsung menggunakan `docs/openapi.yaml` — menampilkan pelanggaran spesifikasi / 500 yang tidak tertangani (Fase 8 B.4) | **Penasihat** |
| `nightly-mutation`     | Skor pengujian mutasi Stryker pada jalur unit cepat — yang bertahan dari mutan menunjukkan pernyataan yang lemah                                                           | **Penasihat** |
| `nightly-compat`       | Matriks kompatibilitas mesin node di seluruh rentang `engines.node` yang didukung                                                                                          | **Penasihat** |

Garis dasar kinerja (heap, TTFB, build time) dicatat, bukan dibatasi: lihat [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fase velocity (2026-08-30 → v4.0 LTS): setiap baseline dilonggarkan sebesar 20%

Keputusan pemilik (2026-08-30): hingga modularisasi v4.0, kecepatan rilis lebih penting
daripada mempertahankan batas utang teknis. Setiap baseline ratchet **numerik** dilonggarkan sebesar 20% dalam satu
proses yang dapat diaudit, dan fase tersebut dideklarasikan dalam `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Yang berubah                                                                                                                                                                                                                                     | Lokasi                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — jumlah dengan nilai lebih rendah lebih baik ×1.2, persentase dengan nilai lebih tinggi lebih baik ÷1.2 (batas minimum cakupan tetap 60, `eslintErrors` tetap 0, `eslintWarnings` 0 → 20% dari jumlah supresi yang dibekukan) | `quality-baseline.json` (catatan `_relax_velocity_2026_08_30` mencantumkan setiap nilai sebelum → sesudah) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                 | `complexity-baseline.json`, `duplication-baseline.json`                                                    |
| `cap`, `testCap`, setiap batas baris `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                          | `file-size-baseline.json`                                                                                  |
| jumlah per file / per kode TS ×1.2                                                                                                                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`     |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                                 |
| `--require-tighten` menjadi saran selama `_policy.requireTighten === false`                                                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                                |
| `bank-ratchet-shrinks` malam hari dijeda (pekerjaan ini akan menyimpan pengurangan terukur dan menghilangkan kembali ruang longgar tersebut)                                                                                                     | `.github/workflows/nightly-release-green.yml`                                                              |

Daftar yang diizinkan (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **bukan** anggaran dan tidak diubah. Gerbang kebijakan lulus/gagal (rahasia, aturan SQL,
kontrak dokumentasi/lingkungan, kesetaraan i18n, pengujian unit) tidak berubah — pengujian merah tetap merupakan pengujian merah.

**Peralatan**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — pelonggaran
  sekali jalan (`scripts/quality/relax-baselines.mjs`); menolak dijalankan dua kali dengan
  catatan yang sama.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mengukur setiap gerbang numerik sebagaimana dilakukan CI dan menampilkan sisa ruang longgar per gerbang
  (`scripts/quality/baseline-headroom.mjs`). Pekerjaan malam `baseline-headroom` memublikasikan
  tabel dalam ringkasan eksekusi alur kerja dan mengunggah laporan JSON/Markdown-nya sebagai
  `baseline-headroom-<run_id>`, yang disimpan selama 90 hari. Baris peringatan dan kritis mengidentifikasi gerbang
  yang berada dalam jarak 10% dari batasnya atau sudah melampauinya. Tinjau laporan ini sebagai peringatan dini bahwa
  anggaran sedang digunakan; periksa catatan `_rebaseline_*` dari gerbang yang bermasalah. Pekerjaan tersebut tidak
  lagi membuat atau memperbarui isu permanen; #12149 menyimpan riwayat laporan sebelumnya.

**Mode kode baru (Clean-as-You-Code) — sejak 2026-08-30, khusus jalur cepat PR**

Pada peristiwa `pull_request`, `quality.yml` meneruskan `--base-ref <PR base SHA>` ke `check:file-size`,
`check:complexity-ratchets`, dan `check:dead-code`. Untuk `check:complexity-ratchets` dan
`check:dead-code`, gerbang membandingkan HEAD dengan merge-base **yang dibatasi pada file yang
diubah oleh PR** (`scripts/check/newCodeMode.mjs`: merge-base diwujudkan dalam
`git worktree` sementara, ESLint/knip dijalankan di sana dan pada HEAD, lalu jumlah per file dibandingkan berdasarkan diff):

- **memblokir** — PR menambahkan pelanggaran siklomatik/kognitif atau ekspor yang tidak digunakan dalam file yang diubahnya
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` dalam log);
- **advisori** — total global dibandingkan dengan baseline yang dibekukan. Drift yang diwariskan tidak pernah membuat
  PR yang tidak bersalah menjadi merah; drift tersebut dilacak untuk diperbaiki saat rekonsiliasi rilis dan dipantau oleh
  job headroom.

`check:file-size` menggunakan referensi dasar dengan ketentuannya sendiri (`scripts/check/check-file-size.mjs`, #8522):
skrip ini memeriksa setiap file sumber dan pengujian dalam pohon, membaca jumlah baris masing-masing pada basis PR
dengan `git show`, dan menggagalkan suatu file hanya ketika ukurannya bertambah melampaui nilai yang lebih besar antara batas baseline-nya
(`frozen` / `testFrozen`, atau `cap` / `testCap` untuk file di luar baseline) dan ukuran dasarnya.
Dengan demikian, file yang sudah menyimpang pada basis tidak pernah membuat PR yang tidak bersalah menjadi merah.

`check:boundary:ratchet` menerapkan aturan yang sama pada satu-satunya angka yang dimilikinya
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): pada event PR, fast-gate
`quality.yml` dan job lint `ci.yml` sama-sama meneruskan SHA basis PR, commit basis diukur
dari ekspor `git archive`, dan PR hanya gagal ketika jumlah edge `open-sse → src`-nya
melebihi nilai yang lebih besar antara `metrics.boundaryOpenSseToSrc` dan jumlah pada basis. Drift basis
di atas batas maksimum dilaporkan (`base drift herdado`), tetapi tidak pernah membuat PR yang tidak bersalah menjadi merah; push → main
tetap menggunakan batas maksimum absolut, dan SHA basis yang tidak dapat di-resolve kembali menggunakannya dengan disertai peringatan.

Run `workflow_dispatch`, sweep release-green, dan job headroom nightly tidak memiliki basis PR
dan tetap menggunakan perbandingan absolut (global). Coverage, duplikasi, dan type-coverage untuk saat ini tetap
bersifat global (alat-alatnya tidak dapat menghasilkan diff per file dengan murah) — kandidat untuk perlakuan yang sama.

**Menutup fase pada v4.0 (LTS = lebih ketat daripada sebelumnya, bukan "kembali normal")**

1. Pada tip murni `release/v4.0.0`: jalankan `npm run quality:headroom --json` sebagai catatan, lalu
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, serta
   `--update` untuk setiap gate typecheck — setiap baseline turun ke nilai yang diukur.
2. Hapus `_policy` dari `quality-baseline.json` (mengaktifkan kembali `--require-tighten` dan banking
   nightly), pulihkan `THRESHOLD = 36` (atau lebih tinggi) di `check-openapi-coverage.mjs`.
3. Perketat melampaui hasil pengukuran di area tempat modularisasi memberikan hasil: kembalikan `cap` ukuran file ke 1000
   (atau 800), naikkan floor coverage sebesar +5, dan tetapkan dead export ke 0 untuk package yang dimodularisasi.

## Baseline Ratchet (`quality-baseline.json`)

Mesin ratchet (`scripts/quality/check-quality-ratchet.mjs`) membaca `quality-baseline.json`
dan membandingkannya dengan `quality-metrics.json` yang baru saja dikumpulkan. Setiap metrik yang mengalami regresi
melampaui epsilon-nya akan menggagalkan build.

Metrik yang saat ini dilacak:

| Metrik                | Arah   | Arti                                      |
| --------------------- | ------ | ----------------------------------------- |
| `eslintWarnings`      | `down` | Jumlah peringatan ESLint tidak boleh naik |
| `coverage.statements` | `up`   | Cakupan statement tidak boleh turun       |
| `coverage.lines`      | `up`   | Cakupan baris tidak boleh turun           |
| `coverage.functions`  | `up`   | Cakupan fungsi tidak boleh turun          |
| `coverage.branches`   | `up`   | Cakupan branch tidak boleh turun          |

Untuk memperbarui baseline setelah peningkatan yang nyata:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flag `--update` menulis nilai yang saat ini terukur ke dalam `quality-baseline.json`.
Commit file ini bersama perubahan yang meningkatkan metrik tersebut. PR yang meningkatkan
metrik tanpa memperbarui baseline akan terdeteksi oleh `--require-tighten` (Fase 6A.5,
implementasi tertunda).

### Ratchet CodeQL : penerimaan kandidat dan inventaris penyimpanan

CI memiliki kandidat penerimaan CodeQL melalui rantai ketergantungan eksplisit: `codeql-scan` memanggil matriks empat bahasa di `codeql.yml`, lalu `codeql-admission` menjalankan `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` membutuhkan kedua hasil tersebut. Kualitas mempertahankan pemeriksaan numeriknya sendiri tetapi tidak menanyakan pemindai sebelum produsen selesai; `Gate / Quality` sendiri bukanlah penerimaan kandidat yang lengkap. CodeQL tetap diwajibkan pada kandidat yang hanya memiliki dokumen.

Kebijakan di `config/quality/codeql-admission-policy.json` memilih Tindakan, C/C++, JavaScript/TypeScript dan Python, default rangkaian kueri, model ancaman jarak jauh, dan mode build tidak ada. Pra-penerbangan produser menolak catatan aktivasi yang tertunda dan bercabang di luar daftar target eksplisit. Target saat ini adalah pengujian utama dan Kontrak release/v3.8.54. membandingkan daftar terbatas ini dan pemicu push pemeliharaan dengan versi paket; rilis berikutnya perlu ditinjau orientasinya. Pemicu CI rilis PR yang lebih luas tetap dipertahankan, namun target yang tidak terpasang melaporkan HOLD sebelum ekstraksi, bukan memperoleh PASS yang tidak terukur.

Setiap pekerjaan matriks mencatat unggahan SARIF aktual ID, bahasa, kategori, proses dan upaya, identitas alur kerja pemanggil, peristiwa ref/head/base/merge SHA dan hash kebijakan. Pekerjaan dependen hanya mengunduh tanda terima proses ini dan memvalidasi intisari artefak. Hal ini memerlukan keempat kategori, produser yang sukses, dan penyelesaian pemrosesan setiap unggahan yang tepat. Ini menggunakan filter sarif_id API, bukan analisis terbaru yang ditemukan di cabang. Tayangan ulang sebagian dapat menggunakan kembali kategori yang berhasil dari upaya sebelumnya pada pencalonan dan kandidat yang sama, sehingga mempertahankan upaya produksi; produsen saat ini yang gagal tidak dapat menggunakan kembali bukti ramah lingkungan yang ada sebelumnya.

Tindakan CodeQL menunggu pemrosesan, namun implementasi yang disematkan dapat memperingatkan dan melanjutkan setelah kegagalan pembacaan status atau menunggu habis. Oleh karena itu penerimaan memverifikasi pemrosesan lagi. Kategori yang hilang, pemrosesan yang tertunda, pekerjaan yang gagal atau dibatalkan, identitas basi, penomoran halaman tidak lengkap atau APIs tidak tersedia menghasilkan HOLD dan keluar 2. Tidak ada waktu tunggu tetap untuk alur kerja pemindai independen yang tersisa. PR yang tidak dipindai tidak dapat lolos karena kueri peringatan menghasilkan 0. Hitungan terukur di atas `metrics.codeqlAlerts.value` keluar dari 1; garis dasar tidak dinaikkan untuk menyerap peringatan cabang lain. [Unggah status dan pencarian analisis](https://docs.github.com/en/rest/code-scanning/code-scanning).

Tanda terima mencatat unggahan dan analisis IDs, kategori, versi alat, ref/SHA, angka dasar dan peringatan. Jumlah SARIF identity/result, jumlah aturan minimum, dan contoh peringatan yang tepat tetap wajib. Identitas PR/analysis diperiksa ulang sebelum diterima. Pemeriksaan ini menetapkan cakupan kategori yang dikonfigurasi, bukan inventaris setiap file sumber yang diekstraksi. Ekstraksi no-build C/C++ tidak menyertakan kode yang dihasilkan selama pembuatan proyek. Pengecualian sumber masih perlu ditinjau, dan atribusi kontributor memerlukan bukti dasar yang sebanding.

`codeql-maintenance.yml` memasok pemindaian push rilis aktif dan jadwal mingguan tanpa menduplikasi produsen PR/main. `nightly-codeql-inventory.yml` memisahkan garis dasar seluruh repositori, dengan `--strict-measurement` dan kegagalan ketika pengukuran tidak tersedia. Lompatan anggun dari kolektor warisan lokal bukanlah penerimaan kandidat. Pengetatan tetap menjadi `--update` yang eksplisit setelah penghitungan global terverifikasi lebih rendah.

Alur kerja tingkat lanjut tidak boleh dipublikasikan saat Pengaturan Default dikonfigurasi: GitHub menolak kombinasi tersebut. Kebijakan versinya masih menunggu keputusan hingga transisi administratif yang ditinjau dibacakan kembali. Sebelum publikasi, operator menyematkan repositori, head/base/tree, policy/patch/rollback hash dan mengamati status pengaturan; `node scripts/quality/codeql-producer.mjs verify-admin-readback` memeriksa catatan JSON yang diharapkan dan aktual yang disediakan. Ini adalah pelindung teknis, bukan persetujuan operator atau pengganti untuk mengambil readback baru. Token PR tidak pernah meminta akses Administrasi. Peluncuran dan perubahan pemindai apa pun memerlukan pembacaan kembali terpisah ditambah bukti kompatibilitas PR, fork, dan grup gabungan yang nyata.

Fork menggunakan runner yang dihosting, checkout tanpa kredensial yang bertahan, tidak ada proyek install/build di produser, dan tidak ada rahasia repositori yang diwarisi. GitHub mendukung unggahan SARIF untuk acara pull_request dengan token fork yang dikurangi; persetujuan pelaksanaan kontribusi pertama kali tetap menjadi kebijakan GitHub. Jangan pernah menggunakan pull_request_target untuk mengeksekusi kode yang tidak tepercaya. Konfirmasikan izin token aktual, analysis_key, dan semua lingkungan kategori di canary yang dikontrol sebelum menganggap migrasi selesai. [Aturan pengunggahan fork](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [mode pengaturan yang bertentangan](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Pemberhentian adalah panggilan operator (Hard Rule #14)** — tidak pernah mengabaikan peringatan CodeQL tanpa mencatat pembenaran teknis dalam komentar pemberhentian: `won't fix` untuk persyaratan protokol hulu, `used in tests` untuk perlengkapan pengujian, `false positive` untuk pembersih yang tidak dapat dilihat CodeQL (preseden: `docs/security/ERROR_SANITIZATION.md`).

---

## Kebijakan Percobaan Ulang Pengujian (WS5.4, v3.8.49)

Percobaan ulang ditetapkan per runner, bukan sebagai kebijakan menyeluruh global — percobaan ulang menyeluruh mengubah regresi nyata
menjadi kegagalan sesaat yang tidak terlihat:

| Runner           | Kebijakan                                                                                                                                                 | Alasan                                                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` hanya di CI, dengan `trace: on-first-retry`                                                                                                  | Waktu browser/jaringan memang bersifat nondeterministik; satu percobaan ulang dengan trace mengubah kegagalan sesaat menjadi artefak yang dapat didiagnosis |
| Vitest           | TANPA percobaan ulang global. Pengujian yang terbukti tidak stabil mendapat percobaan ulang eksplisit per pengujian (terlihat di diff, ditinjau dalam PR) | Menjaga daftar karantina tetap berada di repo dan tidak pernah tersembunyi                                                                                  |
| node:test (unit) | TANPA percobaan ulang, dalam kondisi apa pun                                                                                                              | Pengujian unit yang tidak stabil adalah bug dalam pengujian — perbaiki, jangan sekadar menjalankannya ulang                                                 |

Target SLO setelah telemetri kegagalan sesaat tersedia (WS5.2/5.3): tingkat kegagalan sesaat <1% per pengujian
(ambang "perbaiki sekarang"), tingkat keberhasilan ≥95% per pipeline. Nilai referensi industri —
kalibrasi ulang berdasarkan pengukuran kita sendiri.

## Penyimpangan Ratchet pada Tingkat Rilis (WS5.5, v3.8.49)

Ketika sebuah ratchet (ukuran file, kompleksitas, peringatan eslint) mengalami regresi pada tip rilis MURNI
— yaitu KOMBINASI merge menyebabkannya mengalami regresi, dan tidak ada satu PR pun yang dapat mereproduksi
regresi tersebut pada branch-nya sendiri — perbaikannya menjadi tanggung jawab **release captain, satu kali, pada
branch rilis**: utamakan ekstraksi/refaktor; lakukan rebaseline hanya dengan entri justifikasi yang
terdokumentasi. Jangan pernah membebankan penyimpangan kombinasi kepada PR kontributor, dan jangan pernah
melakukan rebaseline per PR (hal itu menyembunyikan regresi nyata). Bedakan penyebabnya terlebih dahulu: reproduksi
status merah terhadap tip murni dalam probe worktree sebelum menganggap PR Anda sebagai penyebabnya.

## Menyimpan Penurunan Ratchet — arah menurun (#8584)

Ratchet hanya setengah otomatis, dan bagian yang otomatis justru bagian yang salah. **Menaikkan** batas adalah
pengeditan JSON manual yang hanya memerlukan sepuluh detik dan merupakan cara tercepat untuk membuka blokir PR merah.
**Menurunkan** batas mengharuskan seseorang menjalankan `--update` dan melakukan commit atas hasilnya — dan sebelum
job `bank-ratchet-shrinks` tersedia, tidak ada workflow yang menjalankannya. Konsekuensi yang terukur
(2026-07-25): 18 file beku sudah berada pada atau di bawah batas 800 baris untuk file baru, dengan kondisi terburuk
sebesar 132× (`src/shared/validation/schemas.ts`, 19 baris dengan batas 2.523); ambang kompleksitas bergerak
`1794 → 2169` dalam ~37 catatan rebaseline dengan tepat satu penurunan (−1); dan "perketat melalui `--update` pada siklus berikutnya"
ditulis 31 kali dan dipatuhi satu kali. Batas yang bertahan lebih lama daripada kode yang menjadi dasar penetapannya secara diam-diam
mengubah setiap dekomposisi yang telah selesai menjadi jatah pertumbuhan bagi siapa pun yang mengedit file tersebut berikutnya.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** menutup siklus tersebut:

|               |                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| Berjalan pada | `schedule` (3×/hari) + `workflow_dispatch` — sengaja **bukan** `push`                                               |
| Mengukur      | `release/vX.Y.Z` tertinggi, dengan resolusi + pengaman injeksi yang sama seperti `release-green`                    |
| Menulis       | `check:file-size --update` dan `check:complexity-ratchets --update` (keduanya secara bawaan hanya dapat menurunkan) |
| Memverifikasi | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                            |
| Mengirim      | satu PR yang selalu mutakhir terhadap branch rilis — diperbarui secara paksa, tidak pernah menghasilkan spam        |

Penyimpanan dilakukan secara batch, bukan per push, karena tidak memiliki persyaratan latensi (penurunan yang
disimpan dalam waktu 8 jam tidak masalah), sedangkan eksekusi per merge akan membangun ulang branch PR berulang kali
selama kampanye merge dan menanggung biaya penelusuran ESLint penuh setiap kali. Deteksi tetap dilakukan saat
push (`release-green`); hanya penyimpanannya yang dilakukan secara batch.

### Verifikator keamanan

Job menulis ke baseline tanpa pengawasan, sehingga `verify-ratchet-bank.mjs` membuat hal tersebut
dapat diterima. Skrip ini membandingkan tree setelah `--update` dengan `HEAD` dan **membatalkan job
sebelum commit apa pun dibuat** — tanpa membuka PR — kecuali setiap perubahan merupakan salah satu dari:

- entri numerik `frozen` / `testFrozen` yang **diturunkan** atau **dihapus**
- `complexity-baseline.json` → `count` **diturunkan**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **diturunkan**

Perubahan lainnya akan gagal: menaikkan angka, menambahkan entri, mengubah `cap`/`testCap`, atau
menghapus/menulis ulang catatan `_rebaseline_*` (catatan tersebut merupakan jejak audit yang menjelaskan alasan setiap
ambang ditetapkan dan disimpan di dalam objek `frozen` yang sama dengan entri file).
Bot yang dapat menaikkan batas akan jauh lebih buruk daripada keadaan saat ini. Pengaman
regresi: `tests/unit/verify-ratchet-bank.test.ts`.

Job tersebut tidak pernah melakukan push ke `release/*` — manusia yang melakukan merge PR, sehingga pengukuran yang buruk
tidak dapat masuk tanpa peninjauan.

## Kebijakan Allowlist

Setiap gate yang tidak boleh gagal karena pelanggaran yang sudah ada sebelumnya menggunakan allowlist yang dibekukan
(misalnya, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Kebijakannya adalah:

**Perbaiki akar masalah; gunakan allowlist hanya jika pelanggaran sudah ada sebelumnya dan
tidak dapat diperbaiki dalam PR yang sama.**

Saat menambahkan entri ke allowlist:

1. Sertakan komentar yang menjelaskan alasannya.
2. Cantumkan referensi ke issue pelacakan (misalnya, `// #3498 — Phase 2 feature, not yet implemented`).
3. Hapus entri tersebut dalam PR yang sama yang memperbaiki pelanggaran — entri usang yang tidak lagi
   mengecualikan pelanggaran aktif merupakan cacat (penegakan entri usang 6A.3 akan
   menggagalkan gate jika terdapat entri allowlist tanpa pelanggaran terkait setelah diimplementasikan).

**Jangan** menambahkan entri allowlist agar pengujian lebih cepat lolos. Gate hijau dengan allowlist yang terus bertambah
memberikan kesan kualitas yang semu.

### Ketika gate gagal pada PR Anda

1. **Baca keluaran gate dengan saksama** — keluaran tersebut memberi tahu Anda secara tepat file atau simbol mana yang melanggar
   aturan.
2. **Perbaiki pelanggaran** — sebagian besar gate merupakan pemeriksaan sistem berkas deterministik yang langsung lolos
   setelah kode diperbaiki.
3. **Jika pelanggaran sudah ada sebelumnya** (yaitu, bukan Anda yang memperkenalkannya, tetapi sekarang
   tercakup oleh gate): tambahkan entri allowlist dengan komentar alasan dan issue pelacakan.
4. **Jika gate merupakan ratchet** (cakupan, peringatan ESLint, duplikasi, kompleksitas):
   perubahan Anda memperburuk metrik. Perbaiki masalah yang mendasarinya, atau (dalam kasus yang jarang terjadi) jalankan
   `npm run quality:ratchet -- --update` jika perubahan tersebut disengaja dan penurunan metrik
   dapat diterima — tetapi dokumentasikan alasannya dalam deskripsi PR.
5. **Gate advisori** (`continue-on-error: true`) bersifat informatif — gate tersebut tidak menghalangi
   penggabungan, tetapi muncul dalam ringkasan CI. Tetap perbaiki gate tersebut.

---

## Menambahkan Gate Baru

1. Buat `scripts/check/check-<name>.mjs` (atau `.ts`). Gate kebijakan keluar dengan kode 0/1.
   Gate bergaya ratchet mengeluarkan metrik ke `quality-metrics.json` melalui `collect-metrics.mjs`.
2. Tambahkan `"check:<name>": "node scripts/check/check-<name>.mjs"` ke `package.json`, dan
   sinkronkan alias tersebut beserta perintah persisnya di `config/quality/gate-manifest.json`.
   Terapkan sinkronisasi yang sama saat mengubah atau menghapus alias validasi yang sudah ada.
   Jalankan `npm run check:gate-manifest`; hook pre-commit dan klasifikasi perubahan CI
   memberlakukan kontrak ini.
3. Hubungkan gate tersebut di `.github/workflows/ci.yml` pada job yang sesuai
   (kebijakan → `lint` atau `docs-sync-strict`; ratchet → `quality-gate`).
4. Jika gate memiliki allowlist, terapkan `reportStaleEntries()` dari
   `scripts/check/lib/allowlist.mjs` agar entri usang terdeteksi secara otomatis.
5. Tulis pengujian di `tests/unit/build/` yang mencakup logika deteksi gate.
6. Perbarui dokumen ini (tambahkan baris ke tabel job yang relevan).

---

## Peralatan agen: LSP-in-the-loop (opsional)

Selain gate CI, OmniRoute menyediakan scaffold `agent-lsp` yang **opsional**
(`.mcp.json` tingkat proyek, Fase 7 Tugas 15). Buat `.mcp.json`
untuk mengekspos server bahasa TypeScript kepada agen pengodean, sehingga agen menyelesaikan simbol /
diagnostik **sebelum** menulis kode — pendamping kompilasi-sebelum-klaim bagi
`typecheck:core` yang mengurangi kesalahan "simbol rekaan" dari sumbernya. Scaffold ini sengaja
tidak dimuat secara otomatis (Anda memilih dan memverifikasi jembatan MCP↔LSP); entri yang rusak hanya mencatat
kesalahan koneksi dan tidak pernah mengganggu sesi.

---

## Backlog Rasionalisasi (tinjauan ROI — Fase 9 Gelombang 3)

Inventaris ini direkonsiliasi dengan `ci.yml` pada 2026-06-17 (versi sebelumnya tidak mencantumkan
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Tinjauan ROI terhadap kumpulan yang telah direkonsiliasi
mengidentifikasi kandidat rasionalisasi berikut. **Penggabungan merupakan perubahan CI
mekanis; perubahan status/penghapusan merupakan keputusan kebijakan yang diserahkan kepada operator.** Belum ada satu pun
hal di bawah ini yang diterapkan.

**Juga belum didokumentasikan di atas** (anjuran, sinyal rendah): job `docs-lint` (markdownlint + Vale, seluruh job memakai `continue-on-error`) serta alur kerja pemindai mandiri `semgrep.yml` / `scorecard.yml`. CodeQL kini memiliki job produsen dan penerimaan wajib di bawah `Gate / CI`, dengan persyaratan aktivasi yang dijelaskan di atas. `semgrepFindings: 0` berada dalam `quality-baseline.json` tetapi belum dihubungkan ke ratchet pemblokir dalam `ci.yml` — metrik ini saat ini tidak memiliki pemeriksaan pelaksana.

### Gabungkan / deduplikasi (mekanis, risiko lebih rendah)

Setiap kandidat telah divalidasi terhadap status gate aktif pada 2026-06-17 (percaya tetapi tetap verifikasi);
beberapa penggabungan yang tampak "jelas" ternyata menyembunyikan utang teknis dan **bukan** pengganti langsung yang bersih.

- **`check:docs-sync` berjalan dua kali** — secara mandiri di job `lint`, lalu sekali lagi di dalam `check:docs-all` (`docs-sync-strict`) dan hook pre-commit husky. ✅ **SELESAI** — pemanggilan mandiri di `lint` telah dihapus.
- **Pemindaian CVE** — ❌ **BUKAN penggabungan yang bersih.** `audit:deps` memblokir advisory kritis dan audit yang tidak lengkap di kelima lockfile, sementara advisory tingkat tinggi dilaporkan sebagai peringatan berdasarkan kebijakan saat ini; `check:vuln-ratchet` (osv) hanya gagal jika terjadi _regresi_ terhadap baseline yang di-check-in dan menolak pengukuran yang hilang ketika diwajibkan. Semantiknya berbeda — menghapus `audit:deps` akan menghilangkan gate kritis absolut dan bukti audit paket yang independen. Pertahankan keduanya.
- **Deteksi siklus** — ✅ **SELESAI** (#15159 G-01/G-02). Teks lama di sini menyebut `check:cycles` sebagai gate "hijau yang dikurasi" dan membenarkan pemblokirannya karena `check:circular-deps` (dpdm) melaporkan 91 siklus. Status hijau tersebut adalah **hijau palsu**: `check:cycles` memindai 5 subdirektori (450 file), hanya mencocokkan `import|export … from` statis, dan mengabaikan setiap penentu `@/` dan `@omniroute/open-sse/`, sehingga tidak dapat melihat siklus impor dinamis + alias yang mendominasi repo. Telah diperbaiki: gate kini menelusuri `src` + `open-sse` (5023 file), mengumpulkan penentu dari AST TypeScript (sehingga `import("…")` dihitung, sedangkan `typeof import("…")` pada posisi tipe tidak), dan me-resolve `paths` tsconfig. Gate ini menemukan **14** siklus, bukan 0. Karena 14 siklus yang sudah ada tidak dapat diperbaiki dalam PR gate, `check:cycles` kini menjadi **ratchet** (`--ratchet`, batas atas `metrics.cycles.value = 14` dalam `quality-baseline.json`, `direction: down`) — gate ini memblokir setiap _regresi_ dan jumlahnya hanya boleh menurun. CI menjalankan `npm run check:cycles:ratchet`. Penurunan bertahap dilakukan bersama **A-01**. `check:circular-deps` (dpdm) tetap bersifat saran sebagai opini kedua dengan cakupan lebih luas.
- **Kompleksitas** — ✅ **SELESAI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): satu penelusuran ESLint, penghitungan berdasarkan ruleId agar baseline siklomatik+max-lines dan kognitif tetap independen; masing-masing `check:complexity` / `check:cognitive-complexity` tetap tersedia untuk penggunaan lokal dengan `--update`.
- **Anti-halusinasi `/api`** — ✅ **SELESAI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): satu inventaris FS untuk `src/app/api`; openapi-routes + docs-symbols tetap melaporkan secara independen; masing-masing tetap tersedia untuk dijalankan secara lokal.
- **`check:node-runtime` berjalan di 11 job** — ⚠️ **ROI rendah.** Masing-masing menggunakan runner terpisah dan pemeriksaannya berlangsung <1 detik; total penghematan ~10 detik, tetapi akan menghilangkan guard per job yang murah. Tidak sebanding dengan perubahan yang ditimbulkan.
- **`typecheck:noimplicit:core` pada lint CI** — ✅ **dihapus dari job lint** (sebelumnya bersifat saran dengan `continue-on-error`); permukaan tipe yang memblokir adalah `typecheck:core` + `check:type-coverage`. Skrip lokal tetap dipertahankan.

### Ubah status / putuskan (kebijakan operator)

- `check:openapi-security-tiers` (bersifat saran) — ❌ **TIDAK dapat langsung diubah statusnya secara bersih.** Pemeriksaan ini keluar dengan kode 0, tetapi memperingatkan bahwa beberapa rute `traffic-inspector` di bawah `LOCAL_ONLY_API_PREFIXES` tidak memiliki anotasi `x-loopback-only: true`. Pemberlakuannya memerlukan penambahan anotasi tersebut ke `openapi.yaml` terlebih dahulu.
- `typecheck:noimplicit:core` (bersifat saran) — sebagian besar telah dicakup oleh ratchet pemblokir `check:type-coverage`. Ubah menjadi ratchet atau hapus lintasan `tsc` kedua yang redundan.
- `test:vitest:ui` (kini **memblokir**) — kegagalan yang sudah ada secara eksplisit dikecualikan dalam `vitest.config.ts` dengan komentar pelacakan `// #8618`; kegagalan baru akan menggagalkan job.
- `check:secrets` (gitleaks, ratchet pemblokir) — batas atas saat ini adalah `metrics.secretFindings` dalam `quality-baseline.json`. Setiap pengecualian memerlukan entri `.gitleaks.toml` yang memiliki justifikasi; pengukuran yang tidak tersedia dianggap TIDAK LENGKAP. Pemindaian ini melengkapi pemindaian secret bawaan GitHub dan `check:public-creds`.
- `check:pr-evidence` (memblokir, melakukan grep pada prosa isi PR) — berisiko tinggi menghasilkan positif palsu; menghapusnya akan melemahkan penerapan Aturan Ketat #18, sehingga ini benar-benar merupakan keputusan kebijakan.
- `semgrep` (mandiri, bersifat saran) — tumpang tindih dengan CodeQL untuk kelompok OWASP; hubungkan baseline-nya ke ratchet atau hapus.

---

## Dokumentasi Terkait

- Rantai pasokan (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gerbang kesetaraan kumpulan kunci

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Membandingkan kumpulan kunci daun dari setiap `src/i18n/messages/<locale>.json` dengan `en.json` dan menggagalkan
proses jika ada daun yang tidak ada atau berlebih, terlepas dari kapan kunci tersebut ditambahkan. Placeholder `__MISSING__:`
dianggap ada (isinya merupakan urusan gerbang rasio). Gerbang ini merupakan pelengkap mutlak
dari dua gerbang berbasis diff/persentase: `check-ui-keys-coverage` memberlakukan batas minimum 80 % per
lokal (43 kunci yang tidak ada dari ~13.000 masih terbaca sebagai 99,7 %) dan `check-new-key-coverage` hanya menilai
kunci yang ditambahkan PR ke `en.json`. Sebuah batch lokal dibuat dari `en.json` pada hari
branch-nya dibuat dan diterjemahkan selama beberapa hari sementara basisnya terus menambahkan kunci; PR batch tersebut tidak
menambahkan kunci apa pun, sehingga kedua gerbang terkait tetap diam ketika batch 1 (#13044) masuk dengan kekurangan 43 kunci di sembilan
lokal dan batch 2 (#13660) dengan kekurangan 10 kunci di delapan lokal (2026-09-15). Perbaiki kegagalan dengan
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; daun `extra`
berarti sumber telah menghapusnya — hapus daun tersebut dari lokal. `--warn` melaporkan tanpa menggagalkan proses.
`--catalog=cli` menjalankan perbandingan yang sama terhadap `bin/cli/locales` (`npm run i18n:check-keys:cli`);
kedua langkah berada dalam job `i18n-ui-coverage`.

#### `check-new-key-coverage` — gerbang i18n untuk kunci baru

Gerbang terkait dari `check-ui-value-drift`. Gerbang tersebut mendeteksi nilai bahasa Inggris yang telah **ditulis ulang**
sementara terjemahannya tertinggal; gerbang ini mendeteksi kunci bahasa Inggris yang telah **ditambahkan**
sementara beberapa lokal tidak pernah menerimanya.

`check-ui-keys-coverage` tidak dapat melihat kategori ini: gerbang tersebut memberlakukan batas minimum persentase per lokal, dan
sebelas kunci yang tidak ada dari ~13.000 masih menyisakan cakupan sebesar 99,9%. Persentase per bahasa tidak dapat
mengungkapkan "fitur ini dirilis tanpa terjemahan" — seluruh fitur dapat masuk ke lokal baru tanpa
teks apa pun dan tidak pernah mengubah angkanya.

Insiden yang direkamnya: Fase 3 Orchestration Canvas menerjemahkan sebelas kuncinya di seluruh
42 lokal yang tersedia saat itu. Beberapa jam kemudian, batch bahasa UE (#13044) menambah jumlah lokal repo
menjadi 51, dan sembilan lokal baru (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) tidak pernah
menerimanya. `deepMergeFallback` menggantikan kunci yang tidak ada dengan bahasa Inggris, sehingga mode kegagalannya berupa
UI yang tidak diterjemahkan, bukan UI kosong — nyata, dan secara bawaan tidak terlihat.

Seperti gerbang terkaitnya, gerbang ini **sadar-diff**, dengan membandingkan bahasa Inggris pada merge base terhadap working
tree, sehingga celah yang sudah ada tetap dibekukan dan gerbang ini tidak memerlukan migrasi untuk diaktifkan.

**Marker `__MISSING__:<english>` tidak memenuhinya (sejak 2026-09-17).** Marker tersebut sebelumnya merupakan
penundaan yang terdokumentasi — runtime melakukan fallback ke bahasa Inggris yang benar — hingga delapan PR fitur pada
2026-09-16 menambahkan 61 kunci dan membubuhkan marker tersebut ke seluruh 65 lokal alih-alih menerjemahkannya: gerbang ini
menerima semuanya, tidak ada yang memblokir PR, dan gerbang rasio terjemahan nyata yang bersifat memblokir
kemudian gagal pada tip rilis bagi semua orang (pt-BR 3,2 % > 2,5 % + 0,5). Marker kini dinilai
sebagai terjemahan yang tidak ada. Perbaiki kegagalan dengan
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, atau
semua lokal secara paralel dengan `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
aman saat detached, menolak dimulai tanpa env `OMNIROUTE_TRANSLATION_*`). Kunci yang harus tetap dalam
bahasa Inggris (nama produk/engine/flag yang ditetapkan) harus berada di `scripts/i18n/untranslatable-keys.json`,
bukan disembunyikan di balik marker. `vi` melarang marker sepenuhnya (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gerbang pengujian yang diparkir

File dalam daftar `exclude` milik `vitest.config.ts` adalah pengujian yang tidak dijalankan, dan bagi siapa pun yang
membaca tree, file tersebut tampak sebagai cakupan. Enam puluh dua file terakumulasi di balik komentar
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Issue #8618 ditutup pada
2026-08-11 sementara daftar yang dilacaknya bertambah dari 45 entri menjadi 62, dan setiap entri baru mewarisi komentar
yang merujuk pada issue yang sudah tidak aktif. Ketika daftar tersebut akhirnya diukur file per file (#13204), **51 dari 62
berhasil terhadap tree saat ini tanpa perubahan sumber apa pun**.

Gerbang ini mengharuskan setiap pengecualian yang mengarah ke file nyata untuk (a) menyebutkan issue pelacakan dan
(b) tercantum dalam `config/quality/vitest-exclusions.json` beserta status hasil pengukurannya, sehingga penambahan pengecualian menjadi
diff yang dapat ditinjau dalam file khusus, bukan sekadar satu baris tambahan dalam array berisi 60 entri. Gerbang ini sengaja
tidak menjalankan ulang pengujian yang dikecualikan — hal itu memerlukan ~10 menit dan seharusnya dilakukan dalam job berkala;
inventaris mencatat waktu terakhir setiap pengujian diukur.
