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

Alur kerja CI dan Quality Gates masing-masing mengeluarkan keputusan yang stabil: `Gate / CI` dan `Gate / Quality`. Kebijakan penerimaan berversi mereka menyebutkan setiap pekerjaan hulu sesuai kebutuhan atau saran. Pekerjaan wajib yang berlaku harus berhasil: hasil yang hilang, dibatalkan, dilewati, tertunda, dan tidak diketahui tidak dapat ditetapkan PASS. Klasifikasi hanya dokumen atau hanya katalog yang valid dapat membuat jalur kode tidak dapat diterapkan; rancangan PR bukanlah kandidat yang diterima. Label `hotfix` tidak mengesampingkan bukti.

Kedua alur kerja mencakup PRs ke cabang main/release, mendorong ke `main`, pengiriman manual, dan acara penggabungan grup. Dorong, kirim, dan gabungkan grup, jalankan pilihan penuh. Dorongan ke `release/**` tidak memulainya (18-10-2026): setiap perubahan sudah menjalankan matriks pada PR -nya dan kombinasi gabungan adalah tugas Rilis-Hijau (`docs/ops/RUNNER_BOX.md` → Jalur yang dihosting). Garpu dan grup gabungan menggunakan pelari yang dihosting untuk pekerjaan yang sebaliknya memilih pelari yang dihosting sendiri; kapasitas host yang memadai harus diverifikasi sebelum peluncuran.

PR biasa menjalankan seleksi cepat. Jalur `full-code` dan `full-code-e2e` dari kebijakan penerimaan (E2E, integrasi, artefak paket, Electron smoke, Bun SQLite, klien ekosistem dan protokol) hanya dijalankan pada draf antrean Mergify atau dijalankan penuh: `gh workflow run ci.yml --ref <branch>`.

Setiap tanda terima JSON mengidentifikasi SHA yang diperiksa, alur kerja yang dijalankan, dan upaya. CLI menolak ketidakcocokan checkout/event SHA. Tes alur kerja mengikat keanggotaan kebijakan ke daftar `needs` tugas putusan sehingga jalur baru atau jalur yang dihapus tidak bisa hilang secara diam-diam. Tanda terima mencakup alur kerjanya sendiri, bukan publikasi, penerapan, atau bagian internal pemindai penasihat yang ada. Mengaktifkan kedua nama cek dalam aturan cabang merupakan perubahan administratif yang terpisah; menambahkan pekerjaan ini tidak dengan sendirinya melindungi cabang.

### Gabungkan antrian

Label `queue` mengirimkan PR ke antrian Mergify (`.mergify.yml`). Mergify membuka draf PR di cabang `mergify/merge-queue/`, CI menjalankan pilihan penuh di sana, dan PR asli digabungkan ketika `Gate / CI`, `Gate / Quality` dan `Merge integrity (changelog + generated skills)` lolos.

Mergify menulis ringkasan antreannya ke dalam deskripsi draf, dan aplikasi lain juga dapat mengeditnya. Peristiwa `pull_request` `edited` pada draf tersebut mengambil grup konkurensinya sendiri (`-queue-edit-<run_id>`) sehingga tidak dapat membatalkan proses draf yang sebenarnya, dan melewati gerbang dan matriks. Hanya `Merge integrity` yang masih berjalan. Pekerjaan gerbang yang dilewati memiliki nama pemeriksaan yang berbeda, karena Mergify membaca `Gate / CI` yang dilewati sebagai pemeriksaan yang gagal dan menghapus antrean PR.

Setelah dequeue, push tidak selalu mengantri ulang PR. Komentari `@mergifyio queue` di atasnya.

### Bukti yang disimpan di peredam penerimaan

`scripts/quality/validate-release-acceptance.mjs` mengurangi rencana yang disediakan dan manifesnya; hal ini tidak menetapkan bahwa rencana tersebut mencakup seluruh jalur pelepasan. Laporannya secara eksplisit menetapkan `releaseAcceptance: false`, meskipun rencananya adalah `VERIFIED`. Alur kerja `release-acceptance.yml` masih menggunakan perlengkapan bayangan, bukan tanda terima pembuatan, paket, boot, atau promosi yang sebenarnya.

CLI membutuhkan `--evidence-root` untuk memverifikasi bukti yang disimpan. File diselesaikan sebagai `<evidence-root>/<artifact_id>/<member>` dan di-hash sebagai SHA-256. Catatan PASS tanpa bukti, file yang hilang atau diubah, jalur yang tidak aman, atau symlink mencegah verifikasi. File yang hilang tidak sama dengan log sukses yang kosong. Pemeriksaan SHA/run/attempt yang ada tetap independen: byte yang cocok tidak dapat menyelamatkan tanda terima yang sudah basi. Integritas file bukan bukti keaslian eksekusi atau promosi artefak.

### Inventaris pemindaian statis

Inventaris npm-alias berversi dan keanggotaan pemindaian statis ada di `config/quality/gate-manifest.json`. Jalankan `npm run check:gate-manifest` untuk memvalidasi nama skrip dan perintah yang tepat terhadap `package.json`; penambahan, penghapusan, dan penyimpangan perintah menggagalkan pekerjaan kait lokal dan klasifikasi perubahan di CI. Alias bukanlah tugas alur kerja, contoh matriks, atau kasus uji: penghitungan ini tidak boleh disajikan sebagai sesuatu yang dapat dipertukarkan.

Gunakan `npm run quality:scan -- --list` atau `npm run quality:scan:fast -- --list` untuk memeriksa alias yang dipilih tanpa menjalankannya. Pelari memanggil titik masuk npm, sehingga waktu prosesnya (termasuk Bun jika dikonfigurasi) dipertahankan. Manifes mencatat alias di luar profil tersebut seperti yang dipanggil secara terpisah, dan perintah pemeliharaan dilarang di profil pemindaian hanya-baca.

Profil ini hanya mencakup pemindaian statis. Mereka tidak mensertifikasi pengujian produk, cakupan, pengemasan, pemeriksaan eksternal, atau penerimaan pelepasan penuh kandidat. Penerimaan alur kerja menggunakan `config/quality/admission-policy.json` dan `scripts/quality/admission-verdict.mjs` yang ditautkan. Profil pengamat rilis tetap terpisah; memeriksa cek dan kuitansi yang berlaku secara mandiri. Perintah statis pengamat lengkap dideklarasikan dalam `config/quality/release-green-static-profile.json`, termasuk `audit:deps`, pemilihan uji mutasi, dan pemeriksaan terjemahan. Loader memvalidasi perintah npm terhadap package.json dan deklarasi CI/Quality yang dimodelkan; itu menolak penyimpangan alih-alih mengeksekusi token shell sebagai argumen. Keluaran SKIP/INCOMPLETE pemindai yang diperlukan tidak dapat membuat PASS. Profil mencatat pengecualian eksternal dan tidak menggantikan cakupan yang dihosting, matriks pengujian, paket, atau bukti penerapan. Inventarisasi prosa di bawah ini adalah referensi, bukan bukti bahwa sebuah gerbang benar-benar berfungsi.

Skrip berada di bawah `scripts/check/` (gerbang kebijakan) dan `scripts/quality/` (mesin ratchet). Sumber kebenaran CI adalah `.github/workflows/ci.yml`.

### Lepaskan PR jalur cepat (`quality.yml`)

`.github/workflows/quality.yml` melengkapi CI pada main/release PRs, mendorong ke `main`, mengirim dan menggabungkan grup. PRs menggunakan pemeriksaan cepat yang difilter jalur. Duplikat build yang dinonaktifkan secara permanen telah dihapus; pemeriksaan build/package/boot yang sebenarnya tetap ada di CI. Unit suite dan vitest hanya dijalankan di CI (`Unit Tests (N/8)` dan `Vitest`).

| Pekerjaan                                        | Cakupan                                                                                                                                                      | Pemblokiran        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; referensi dokumen API dan dokumen-semua                                                                                                       | Ya                 |
| `Fast Quality Gates`                             | Kode PRs; pemeriksaan statis, pemeriksaan ketik, pemeriksaan ketik dasbor, pengujian unit yang terkena dampak, pengujian saudara yang terlupakan (penasihat) |
| `No new ESLint warnings`                         | Kode PRs; pelindung serat yang sadar akan penindasan                                                                                                         | Ya, termasuk garpu |
| `Merge integrity (changelog + generated skills)` | PRs non-draft ; changelog dan sinkronisasi keterampilan yang dihasilkan                                                                                      | Ya, termasuk garpu |

#### Laporan tes saudara yang terlupakan

`npm run check:forgotten-sibling-tests` berjalan sebagai langkah penasehat `Fast Quality Gates` dan menggunakan kembali pemecah masalah impor di belakang peta uji dampak. Untuk setiap modul produksi yang diubah, modul ini melaporkan rantai `changed module/symbol -> static consumer -> candidate sibling test` deterministik ketika pengujian kandidat tidak ada dalam perbedaan permintaan tarik. Ringkasan penurunan harga dan hasil JSON dipertahankan sebagai artefak alur kerja `forgotten-sibling-tests` untuk kalibrasi sebelum peluncuran pemblokiran apa pun.

Ekspor ulang barel dan impor dinamis hanya merupakan diagnostik penyelesaian; mereka tidak pernah membuat temuan pemblokiran. Pengecualian yang ditinjau ada di `config/quality/forgotten-sibling-allowlist.json`. Setiap entri harus menyebutkan nama konsumen dan kandidat pengujian, memberikan alasan spesifik, dan menghubungkan masalah GitHub atau permintaan penarikan. Entri yang salah format gagal ditutup. Pengecualian tidak dapat menyembunyikan pengujian kandidat yang dihapus atau perbedaan yang menambahkan `.skip`/`.todo`; penegasan pelemahan dan penyembunyian lainnya tetap dimiliki oleh gerbang `check:test-masking` yang memblokir secara independen.

### Pekerjaan: `lint`

Berjalan di setiap PR hingga `main`. Blok bergabung jika gagal.

| Skrip (`npm run ...`)             | Memvalidasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Pemblokiran                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `check:node-runtime`              | versi Node.js berada dalam kisaran yang didukung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                        |
| `check:cycles`                    | Impor melingkar di seluruh `src/` + `open-sse/` (berbasis AST, tsconfig `paths` diselesaikan). Bare keluar 1 setiap kali ada siklus (ditutup gagal sejak #15281) dan mencantumkan SCCs. `check:cycles:ratchet` (apa yang CI berjalan) memblokir ketika hitungan melebihi batas atas `metrics.cycles` di `quality-baseline.json` — saat ini 14, `direction: down`, sehingga hanya bisa jatuh (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya (roda gigi)                            |
| `check:boundary`                  | kopling `open-sse → src` : impor file-ke-file unik dari mesin ke dalam aplikasi (`scripts/quality/measure-boundary.mjs`; daftar tepinya adalah simpanan remediasi v4 core/module-split ). Laporan penasihat = kosong (sama seperti `quality:boundary`). `check:boundary:ratchet` (apa yang CI jalankan, juga di loop ratchet gerbang cepat `quality.yml` ) diblokir ketika hitungan melebihi batas atas `metrics.boundaryOpenSseToSrc` di `quality-baseline.json` — yang diunggulkan pada 771 yang diukur, `direction: down`; `--update` hanya menurunkannya; basis-relatif pada PRs (`--base-ref`, lihat di bawah)                                                                                                                                                                                                                                                                                                                                                                                                      | Ya (roda gigi)                            |
| `check:route-validation:t06`      | skema Zod ada di semua rute (kebijakan Tingkat 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                        |
| `check:any-budget:t11`            | jumlah `@ts-expect-error // any` tidak melebihi anggaran (catraca Tingkat 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                        |
| `check:provider-consistency`      | Setiap penyedia di `providers.ts` memiliki entri yang cocok di `providerRegistry.ts` (dan sebaliknya, dalam daftar yang diizinkan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                        |
| `check:model-lifecycle`           | Tiga tabel perutean yang dikelola secara manual tetap konsisten dengan snapshot siklus hidup yang dicentang (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tidak memberi skor pada id yang dihentikan yang dapat dirutekan `REGISTRY` ; setiap target `BUILT_IN_ALIASES` ada di `REGISTRY` dan tidak ada dalam snapshot id yang dihentikan; setiap id pensiun yang masih di `REGISTRY` diteruskan atau dicantumkan di `allowedRetiredInCatalog`; dan tidak ada sumber atau target `DEFAULT_DEGRADATION_MAP` yang tampak dihentikan dalam snapshot itu. Hal ini tidak membuktikan bahwa model saat ini dilayani oleh live upstream. — offline dibandingkan dengan `config/quality/model-lifecycle.json`, disegarkan secara manual dengan `npm run quality:refresh-model-lifecycle` (jaringan; tidak dihubungkan ke CI). `allowedRetiredInCatalog` adalah ratchet yang terbakar: tambahkan entri hanya dengan masalah pelacakan.                                                                                             | Ya                                        |
| `check:fetch-targets`             | Setiap `fetch("/api/...")` di `src/` sisi klien menghasilkan `route.ts` nyata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                        |
| `check:deps`                      | Semua deps `npm install` -able di setiap `package.json` di repo ada di `dependency-allowlist.json`; paket baru yang tidak dipasangi pin atau slopsquat ditandai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                        |
| `audit:deps`                      | npm audit dari kelima lockfile independen (root, Electron, OpenCode plugins v1/v2 dan penyedia). Blok penasehat kritis; peringatan tinggi tetap menjadi peringatan yang terlihat. audit Missing/failed adalah INCOMPLETE dan blok; hash dan laporan kunci per cakupan dipertahankan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                        |
| `check:lockfile`                  | `package-lock.json` integritas — https registri, hash integritas, tidak ada penggantian host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                        |
| `check:licenses`                  | daftar lisensi SPDX yang diizinkan untuk dependensi produksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                        |
| `check:tracked-artifacts`         | Tidak ada artefak build/simlink `node_modules` yang dikomit (juga berjalan di pra-komit husky; pra-push sengaja dibuat ringan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ya                                        |
| `check:ai-attribution`            | Tidak ada cuplikan AI/bot `Co-Authored-By` atau footer generasi AI di PR commit, judul atau isi — Aturan Keras #16 (di loop gerbang cepat `quality.yml` untuk PR→ `release/**` — membaca payload peristiwa, no-op off PRs — dan langkah khusus PR di `ci.yml` lint untuk PR→ `main`; juga hook husky `commit-msg` ; rekan penulis manusia diperbolehkan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Setiap pengecualian Vitest menyebutkan masalah pelacakan dan muncul di `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                        |
| `check:file-size`                 | File sumber (`.ts`/`.tsx` dalam `src/`, `open-sse/`, `electron/`, `bin/`) tetap berada dalam `cap` dan file uji (`*.test.ts(x)`) dalam `testCap`; file yang dibekukan di `file-size-baseline.json` (`frozen` / `testFrozen`) tidak boleh melebihi ukuran rekamannya                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                        |
| `check:error-helper`              | Respons kesalahan di executors/handlers menggunakan `buildErrorBody()` / `sanitizeErrorMessage()` (Aturan Keras #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                        |
| `check:migration-numbering`       | File SQL migrasi diberi nomor urut, tidak ada celah atau duplikat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                        |
| `check:public-creds`              | Tidak ada OAuth `client_id`/`client_secret` atau kunci Web Firebase literal di luar `publicCreds.ts` (Aturan Keras #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                        |
| `check:db-rules`                  | Tidak ada SQL mentah di luar modul `src/lib/db/` ; tidak ada impor barel dari `localDb.ts` (Aturan Keras #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                        |
| `check:known-symbols`             | Pelaksana penyedia, strategi perutean, dan penerjemah yang terdaftar di tabel pengiriman mereka cocok dengan file di disk — tidak ada simbol yatim piatu atau tidak dideklarasikan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                        |
| `check:route-guard-membership`    | Setiap rute yang memunculkan proses anak diklasifikasikan berdasarkan `isLocalOnlyPath()` (Aturan Keras #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                        |
| `check:test-discovery`            | Setiap file `*.test.ts` / `*.spec.ts` di repo dikumpulkan oleh setidaknya satu test runner (ratchet: daftar yatim piatu di `test-discovery-baseline.json` hanya dapat menyusut)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                        |
| `check:test-tla-order`            | Tidak ada file `node:test` di bawah `tests/unit` yang mendaftarkan pengujian, mencapai `await` tingkat atas, lalu mendaftarkan lebih banyak (#18045; ratchet: `test-tla-order-allowlist.json` hanya dapat menyusut)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                        |
| `check:agent-skills-sync`         | Artefak keterampilan agen yang dihasilkan cocok dengan katalog sumbernya (tidak ada penyimpangan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | Penyedia logos/assets membawa entri asal yang tercatat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | file konfigurasi JSON mengurai dan memenuhi aturan lint repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | kompilasi TypeScript tanpa kesalahan (hanya peringatan nasihat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                        |
| `typecheck:noimplicit:core`       | Ketat `noImplicitAny` — berwawasan ke depan; banyak situs panggilan yang sudah ada sebelumnya masih memerlukan anotasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Penasihat** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` dicakup ke `src/app/(dashboard)/**` (#7033) daftar 27 file yang dikurasi — `typecheck:core` tidak menyertakan dasbor apa pun TSX, dan `next build` juga tidak pernah memeriksanya (`next.config.mjs` menyetel `ignoreBuildErrors: true`), jadi regresi pengidentifikasi yatim piatu di sana (#6625/#6909) tidak terlihat oleh CI. Perbedaan dengan garis dasar penghitungan per-file/per-TS-code yang dibekukan (`config/quality/dashboard-typecheck-baseline.json`, pola penerapan basi yang sama seperti `check:known-symbols`) — hanya kesalahan NEW di luar penghitungan dasar yang gagal dalam gerbang; turunkan dengan `--update` ketika kesalahan yang sudah ada telah diperbaiki.                                                                                                                                                                                                                                                                                                                          | Ya                                        |
| `check:build-typecheck`           | Pemeriksaan jenis produksi seluruh aplikasi atas `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), daftar 27 file `typecheck:core` yang diizinkan dan gerbang dasbor tidak tercakup. Berbeda dengan `config/quality/build-typecheck-baseline.json`; hitungan per (file, kode) yang baru atau yang dinaikkan gagal, hitungan yang lebih rendah meminta Anda untuk melakukan ratchet. `--update` menolak ketika proses berisi pasangan baru atau yang dimunculkan kecuali `--force-regressions` diteruskan, dan menolak file yang baru dibungkam kecuali `--force-nocheck` dilewati, jadi memperluas garis dasar menjadi hijau dan memberikan keheningan permanen adalah dua tindakan disengaja yang terpisah. `--force` kosong ditolak. Juga memindai cakupan build untuk `@ts-nocheck` terhadap `config/quality/ts-nocheck-baseline.json`, karena file yang menggunakannya tidak melaporkan diagnostik sama sekali dan jika tidak, tidak akan terlihat oleh setiap gerbang. | Ya                                        |

#### Dua program pengetikan menjawab secara berbeda

`typecheck:core` dan `check:build-typecheck` mengkompilasi program yang berbeda dengan opsi yang berbeda, dan file yang sama dapat bersih di satu program dan penuh kesalahan di program lainnya.

`tsconfig.build.json` menyetel `"strict": false`, jadi `noImplicitAny` tidak aktif. Konfigurasi inti mengkompilasi daftar 27 file yang diizinkan dengan opsi yang lebih ketat dan mengikuti grafik impor setiap entri, sehingga file yang tidak pernah muncul dalam program build masih diperiksa di sana.

Konsekuensinya penting ketika menilai apakah suatu file diketik:** nol diagnostik di bawah `check:build-typecheck` tidak berarti nol** . Menghapus `@ts-nocheck` dari 26 file menunjukkan 23 di antaranya bersih dalam program build; enam belas di antaranya memunculkan sekitar 120 kesalahan implisit-apa pun dalam kesalahan ketat. Periksa keduanya sebelum memanggil file bersih.

### Pekerjaan: `quality-gate`

Berjalan setelah `test-coverage`. Blok bergabung jika gagal.

| Naskah                       | Memvalidasi                                                                                                                                                                                   | Pemblokiran       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | Memancarkan `quality-metrics.json` (jumlah peringatan ESLint, cakupan dari laporan pecahan gabungan)                                                                                          | Ya (hulu ratchet) |
| `quality:ratchet`            | Setiap metrik di `quality-baseline.json` belum mengalami kemunduran (ESLint memperingatkan garis dasar ≤ ; cakupan garis dasar ≥ )                                                            | Ya                |
| `check:duplication`          | Duplikasi kode (jscpd@4) tidak melebihi garis dasar di `quality-baseline.json`                                                                                                                | Ya                |
| `check:complexity`           | Kompleksitas siklomatik tingkat file tidak melebihi batas (inti ESLint `complexity` + `max-lines-per-function`)                                                                               | Ya                |
| `check:cognitive-complexity` | Ratchet kompleksitas kognitif (`eslint-plugin-sonarjs`) — memisahkan ESLint pass; CI menjalankan keduanya digabungkan sebagai langkah `check:complexity-ratchets` tunggal                     | Ya                |
| `check:dead-code`            | Ekspor/file ratchet (knip) yang tidak digunakan tidak mengalami kemunduran vs baseline                                                                                                        | Ya                |
| `check:compression-budget`   | Anggaran tolok ukur kompresi — per mesin token-hemat tidak boleh mengalami kemunduran                                                                                                         | Ya                |
| `check:type-coverage`        | Ratchet yang diketik persen (`type-coverage`) tidak mengalami kemunduran; sebagian besar mencakup `typecheck:noimplicit:core`                                                                 | Ya                |
| `check:codeql-ratchet`       | Jumlah peringatan CodeQL terbuka tidak mengalami kemunduran (dibaca melalui `gh api`; lewati dengan anggun tanpa token) irama penyegaran — dan pemicu manual: lihat "CodeQL ratchet" di bawah | Ya                |

### Pekerjaan: `quality-extended`

Seluruh pekerjaan bersifat penasehat (`continue-on-error: true`). Ratchet berbasis npm berjalan secara nyata; pemindai eksternal dipasang melalui `gh release download` dan lewati sendiri (keluar 0) ketika biner masih belum ada.

| Naskah                   | Memvalidasi                                                                                                                                                                                                                    | Pemblokiran                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `check:circular-deps`    | Tidak ada ketergantungan melingkar (dpdm)                                                                                                                                                                                      | **Penasihat**                                         |
| `check:bundle-size`      | Ukuran bundel tidak melebihi batas                                                                                                                                                                                             | **Penasihat**                                         |
| `check:secrets`          | Pemindaian rahasia (gitleaks) — dilewati jika biner tidak ada                                                                                                                                                                  | **Penasihat**                                         |
| `check:vuln-ratchet`     | Kerentanan ketergantungan (osv-scanner) tidak mengalami kemunduran — `--ratchet` gagal sebagai INCOMPLETE (keluar 2) jika tidak diukur                                                                                         | **Penasihat**                                         |
| `check:workflows`        | Serat alur kerja (actionlint + zizmor); pemindai missing/broken, laporan tidak valid, atau garis dasar ratchet yang hilang gagal karena INCOMPLETE. Temuan yang valid mengikuti kebijakan strict/advisory/ratchet yang dipilih | Diperlukan eksekusi; zizmor pemblokiran ratchet di CI |
| `check:openapi-breaking` | Kontrak API publik terhadap penerapan peristiwa yang disematkan (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); pengukuran yang diperlukan gagal ditutup                               | **Memblokir dengan --ratchet**                        |

### Pekerjaan: `docs-sync-strict`

Berjalan di setiap PR hingga `main`. Blok bergabung jika gagal.

| Naskah                         | Memvalidasi                                                                                                                                                      | Pemblokiran                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Meta-gate yang menjalankan 6 sub-gate di bawah ini secara berurutan                                                                                              | Ya                            |
| ↳ `check:docs-sync`            | konsistensi versi CHANGELOG / OpenAPI / llm.txt                                                                                                                  | Ya                            |
| ↳ `check:docs-counts`          | Penghitungan dalam bentuk prosa (penghitungan penyedia, penghitungan migrasi, dll.) berada dalam jendela ratchet dari penghitungan sebenarnya                    | Ya                            |
| ↳ `check:env-doc-sync`         | Setiap env var di `.env.example` didokumentasikan dalam tabel dokumen, dan sebaliknya                                                                            | Ya                            |
| ↳ `check:deprecated-versions`  | Tidak ada string versi yang tidak digunakan lagi di dokumen                                                                                                      | Ya                            |
| ↳ `check:doc-links`            | Tautan penurunan harga internal di dokumen memutuskan ke file nyata (bentuk `[text]`/`(path)` )                                                                  | Ya                            |
| ↳ `check:fabricated-docs`      | Rute, env vars, perintah CLI, nama kait, dan jalur file yang dikutip dalam dokumen ada di basis kode. Gerbang keras melalui `--strict`; soft-fail tanpa bendera. | Ya (melalui `--strict` di CI) |
| `check:cli-i18n`               | string perintah CLI ada di semua file lokal i18n                                                                                                                 | Ya                            |
| `check:openapi-coverage`       | OpenAPI spec mencakup setidaknya sebagian besar rute nyata                                                                                                       | Ya                            |
| `check:openapi-security-tiers` | Anotasi tingkat keamanan di `openapi.yaml` konsisten dengan klasifikasi `routeGuard.ts`                                                                          | **Penasihat**                 |
| `check:openapi-routes`         | Setiap jalur di `openapi.yaml` menghasilkan `route.ts` yang nyata (anti-halusinasi)                                                                              | Ya                            |
| `check:docs-symbols`           | Setiap referensi `/api/...` di `docs/**/*.md` menghasilkan `route.ts` yang nyata (anti-halusinasi)                                                               | Ya                            |
| `i18n translation drift`       | Kunci yang belum diterjemahkan dalam file lokal i18n hanya — warning                                                                                             | **Penasihat**                 |

Dua belas README SVGs di bawah `docs/diagrams/` dihasilkan (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` membuat ulang semuanya). Masing-masing memiliki pengujian unit perbandingan byte (`tests/unit/docs/readme-*-svg.test.ts`, pekerjaan `test-unit`) yang gagal ketika file yang dikomit sudah basi, dan `check:docs-counts` membaca nomor kanonik dari node `<text>` — itulah sebabnya langkah penguraian membuat setiap string yang digariskan dalam file sebagai tidak terlihat `<text>`. Pemeriksaan SVG canonical-numbers membaca file yang tercantum dalam `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` dan `tier-flow-light.svg`; klaim gratis selamanya, entri katalog, kumpulan berulang, dan faktor penilaian juga dibaca `promise-pillars.svg`, `free-tier-budget.svg` dan `strategies-grid.svg`. `free-tier-budget.svg` mengambil gambarnya dari pemuat katalog langsung, jadi perubahan ke `FREE_MODEL_BUDGETS` atau nama tampilan penyedia akan berubah menjadi CI hingga file tersebut dibuat ulang.

### Pekerjaan: `i18n-ui-coverage`

| Naskah                             | Memvalidasi                                                                                                                                                                                                  | Pemblokiran   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `check-ui-keys-coverage` (sebaris) | cakupan kunci UI i18n adalah ≥ 65%                                                                                                                                                                           | Ya            |
| `check-ui-value-drift` (sebaris)   | Bahasa Inggris yang ditulis ulang** nilai** tidak meninggalkan terjemahan basi                                                                                                                               | Ya            |
| `check-new-key-coverage` (sebaris) | A** baru** Kunci bahasa Inggris diterjemahkan di setiap lokal — penanda `__MISSING__:` ditolak                                                                                                               | Ya            |
| `check-translation-ratio`          | Rasio terjemahan nyata per lokal (identik dengan bahasa Inggris / placeholder / daun yang hilang di luar daftar yang diizinkan) tidak boleh melebihi `config/quality/i18n-translation-baseline.json` + slack | **Penasihat** |

Membutuhkan `fetch-depth: 0` — gerbang penyimpangan nilai berbeda `en.json` dengan basis penggabungan.

#### `check-ui-value-drift` — gerbang terjemahan basi

Menangkap regresi i18n yang secara struktural tidak dapat dilihat oleh gerbang lain: nilai bahasa Inggris ditulis ulang dan terjemahan yang berasal dari bahasa Inggris _sebelumnya_ tetap tertinggal, sehingga pengguna non-Inggris terus membaca salinan dengan kata-kata percaya diri, yang sekarang salah.

Ini dikirimkan secara nyata. `oauthModal.googleOAuthWarning` ditulis ulang ketika pembantu login Antigravity mendarat (#5203);** 39 dari 43 lokal** terus mengirim pesan teks kepada operator untuk "menyalin URL lengkap dan menempelkannya di bawah" — alur yang tidak dapat diselesaikan untuk penyedia itu. Itu luput dari perhatian sampai #8463 karena:

- `sync-ui-keys` hanya mengisi ulang kunci yang ada** absen** , tidak pernah seperti itu** basi** ;
- `check-ui-keys-coverage` menghitung kunci _presence_, jadi skor terjemahan basi sudah tercakup;
- `check-translation-drift` melacak cermin dokumentasi `docs/i18n/<locale>/**.md` — tidak pernah terbaca `src/i18n/messages/*.json`. Memblokir pekerjaan `docs-sync-strict` sejak sinkronisasi ulang 2026-09: edit dokumen inti → `npm run i18n:run -- --files=<doc>` (tingkat bagian, murah).

**Sadar akan perbedaan, tidak didukung oleh baseline.** Ini membandingkan `en.json` di basis penggabungan dengan pohon kerja; untuk setiap kunci yang nilai bahasa Inggrisnya berubah, lokal mana pun yang masih memiliki terjemahan yang belum tersentuh akan menjadi basi. Ini dengan sengaja** membekukan utang yang sudah ada sebelumnya** — a diff tidak dapat mengungkapkan dari bahasa Inggris kuno mana terjemahan lama itu berasal, jadi gerbang hanya menilai apa yang disentuh oleh perubahan saat ini. Alternatifnya (garis dasar hash per kunci) akan memakan biaya file yang dihasilkan ~ 600 KB, 3 × garis dasar terbesar yang ada, berputar pada setiap i18n PR.

Dua cara untuk memuaskannya:

1. memperbarui terjemahan yang terpengaruh, atau
2. atur ke `__MISSING__:<new english>` — runtime lalu sajikan bahasa Inggris yang dikoreksi (`src/i18n/request.ts::deepMergeFallback`, #7258) dan antrean kunci untuk terjemahan.

Jika stringnya** arti** berubah, lebih suka** mengganti nama kunci** : kunci baru tidak dapat mewarisi terjemahan lama. Itulah pola #8463 yang digunakan.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Keluar dari 0 dengan `SKIP reason=base-unresolved` ketika katalog dasar tidak dapat dibaca (klon dangkal tanpa referensi dasar), mencerminkan `check-openapi-breaking`.

### Pekerjaan: `i18n`

Matriks validasi i18n lengkap (satu pekerjaan per lokal). Seluruh pekerjaan bersifat penasehat.

| Naskah                          | Memvalidasi                      | Pemblokiran                                                    |
| ------------------------------- | -------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Kelengkapan terjemahan per lokal | **Penasihat** (`continue-on-error: true` di seluruh pekerjaan) |

### Pekerjaan: `pr-test-policy`

Hanya berjalan pada permintaan tarik.

| Naskah                 | Memvalidasi                                                                                                                                     | Pemblokiran |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PRs yang mengubah kode produksi di `src/`, `open-sse/`, `electron/`, atau `bin/` harus menyertakan atau memperbarui pengujian (Aturan Keras #8) | Ya          |
| `check:test-masking`   | File pengujian yang diubah tidak mengurangi jumlah pernyataan bersih atau menambahkan tautologi `assert.ok(true)`                               | Ya          |
| `check:pr-evidence`    | PR body mengutip bukti test/VPS untuk perubahan tersebut (mekanisasi Aturan Keras #18 dengan mengambil prosa PR — rapuh, lihat Backlog)         | Ya          |

### Pekerjaan: `test-vitest`

Berjalan setelah `build`. Blok bergabung jika gagal.

| Rangkaian        | Memvalidasi                                             | Pemblokiran                                                                                                                                         |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | server MCP (110 alat), autoCombo, cache — vitest runner | Ya                                                                                                                                                  |
| `test:vitest:ui` | komponen UI menguji — vitest runner                     | **Pemblokiran** — kegagalan yang sudah ada sebelumnya secara eksplisit dikecualikan dalam `vitest.config.ts`; kegagalan baru menggagalkan pekerjaan |

### Alur kerja malam (dijadwalkan, disarankan)

Ini berjalan pada jadwal cron (dan `workflow_dispatch`), tidak pernah pada PRs. Semuanya bersifat penasehat.

| Alur kerja             | Memvalidasi                                                                                                                                                                   | Pemblokiran   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | tes properti pemeriksaan cepat dengan seed acak + jumlah run yang tinggi                                                                                                      | **Penasihat** |
| `nightly-resilience`   | gerbang pertumbuhan tumpukan, injeksi kesalahan kekacauan, k6 load/soak                                                                                                       | **Penasihat** |
| `nightly-llm-security` | promptfoo injection guard (mode blok) probe + garak (dilewati tanpa rahasia penyedia)                                                                                         | **Penasihat** |
| `nightly-schemathesis` | kontrak OpenAPI fuzzing (skematesis) terhadap OmniRoute langsung menggunakan pelanggaran spesifikasi permukaan `docs/openapi.yaml` — / 500 yang tidak tertangani (Fase 8 B.4) | **Penasihat** |
| `nightly-mutation`     | Skor pengujian mutasi Stryker pada jalur unit cepat — yang bertahan dari mutan menunjukkan pernyataan yang lemah                                                              | **Penasihat** |
| `nightly-compat`       | Matriks kompatibilitas mesin node di seluruh rentang `engines.node` yang didukung                                                                                             | **Penasihat** |

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
- **saran** — total global dibandingkan dengan baseline yang dibekukan. Penyimpangan yang diwariskan tidak pernah membuat
  PR yang tidak bersalah menjadi merah; penyimpangan dibekukan ulang saat rekonsiliasi rilis dan dipantau oleh pekerjaan headroom.

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

### Ratchet CodeQL: frekuensi penyegaran dan pemicu manual

`check:codeql-ratchet` membaca **status repo, yang disegarkan sesuai jadwal — bukan per PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` melaporkan
`state: configured`, `schedule: weekly`: pemindaian default-setup GitHub, bukan analisis
per push. Konsekuensinya: setelah PR yang MEMPERBAIKI alert digabungkan, ratchet tetap membaca
jumlah lama yang lebih tinggi hingga pemindaian terjadwal berikutnya berjalan — sehingga ratchet melaporkan regresi
pada setiap PR terbuka, termasuk tindak lanjut dari PR perbaikan itu sendiri, hingga pemindaian menyusul.

**Penyegaran manual**: `gh workflow run codeql.yml --ref release/vX.Y.Z` menjalankan ulang
analisis dan menerbitkan ulang alert dalam hitungan menit. Baca `.github/workflows/codeql.yml`
terlebih dahulu — header-nya menjelaskan bahwa workflow tersebut hanya menggunakan `workflow_dispatch` **karena bertentangan dengan
"default setup" GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Memulihkan pemicu `push`/`pull_request`/
`schedule` memerlukan **tindakan owner terlebih dahulu**: Settings → Code security →
CodeQL: Default → Advanced. Jangan tambahkan pemicu `schedule:` tanpa melakukan peralihan tersebut — pemicu itu
hanya akan menghasilkan run yang gagal.

**Perketat baseline setelah jumlahnya turun** — `node scripts/check/check-codeql-ratchet.mjs
--update` menulis jumlah terukur yang baru ke dalam `quality-baseline.json` →
`metrics.codeqlAlerts.value`, sehingga ratchet tidak secara diam-diam mengizinkan regresi kembali
ke batas lama. Contoh penerapan (2026-09-02/03): PR #12502 memperbaiki 7 alert nyata
(13 → 6 yang terukur masih terbuka); PR #12530 memperketat baseline beku dari 11 → 6 agar sesuai; 6 alert
yang tersisa kemudian ditutup dengan justifikasi per alert hingga menjadi 0 yang terbuka.

**Penutupan adalah keputusan operator (Aturan Keras #14)** — jangan pernah menutup alert CodeQL
tanpa mencatat justifikasi teknis dalam komentar penutupan: `won't fix` untuk
persyaratan protokol upstream, `used in tests` untuk fixture pengujian, `false positive`
untuk sanitizer yang tidak dapat dideteksi CodeQL (preseden: `docs/security/ERROR_SANITIZATION.md`).

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

## Kebijakan Daftar yang Diizinkan

Setiap gerbang yang tidak dapat gagal pada pelanggaran yang sudah ada sebelumnya menggunakan daftar yang diizinkan (misalnya, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Kebijakannya adalah:

**Perbaiki akar permasalahannya; gunakan daftar yang diizinkan hanya jika pelanggaran sudah ada sebelumnya dan tidak dapat diperbaiki di PR yang sama.**

Saat menambahkan entri ke daftar yang diizinkan:

1. Sertakan komentar dengan alasannya.
2. Referensikan masalah pelacakan (misalnya, `// #3498 — Phase 2 feature, not yet implemented`).
3. Hapus entri dalam PR yang sama yang memperbaiki pelanggaran — entri basi yang tidak lagi menekan pelanggaran aktif itu sendiri merupakan cacat (6A.3 penerapan basi akan menggagalkan gerbang pada entri daftar izin yatim piatu setelah diterapkan).

Melakukan** bukan** tambahkan entri daftar yang diizinkan untuk membuat tes lulus lebih cepat. Gerbang hijau dengan daftar izin yang terus bertambah menunjukkan kualitas yang salah.

### Ketika sebuah gerbang gagal di PR Anda

1. **Baca keluaran gerbang dengan cermat** — ini memberi tahu Anda file atau simbol mana yang melanggar aturan.
2. **Perbaiki pelanggarannya** — sebagian besar gerbang adalah pemeriksaan sistem file deterministik yang lolos segera setelah kodenya benar.
3. **Jika pelanggaran sudah ada sebelumnya** (yaitu, Anda tidak memperkenalkannya tetapi gerbang sekarang menutupinya): tambahkan entri daftar yang diizinkan dengan komentar pembenaran dan masalah pelacakan.
4. **Jika gerbangnya adalah ratchet** (cakupan, peringatan ESLint, duplikasi, kompleksitas): perubahan Anda memperburuk metrik. Perbaiki masalah mendasar, atau (jarang) jalankan `npm run quality:ratchet -- --update` jika perubahan disengaja dan degradasi metrik dapat diterima — tetapi dokumentasikan alasannya dalam deskripsi PR.
5. **Gerbang penasehat** (`continue-on-error: true`) adalah — informasional yang tidak memblokir penggabungan tetapi muncul di ringkasan CI. Perbaiki saja.

---

## Menambahkan Gate Baru

1. Buat `scripts/check/check-<name>.mjs` (atau `.ts`). Gate kebijakan keluar dengan kode 0/1.
   Gate bergaya ratchet mengeluarkan metrik ke `quality-metrics.json` melalui `collect-metrics.mjs`.
2. Tambahkan `"check:<name>": "node scripts/check/check-<name>.mjs"` ke `package.json`.
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

## Backlog Rasionalisasi (ROI review — Fase 9 Onda 3)

Inventaris ini direkonsiliasi dengan `ci.yml` pada 17-06-2026 (versi sebelumnya menghilangkan `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Tinjauan ROI terhadap kumpulan yang direkonsiliasi mengidentifikasi kandidat rasionalisasi berikut.** Penggabungannya adalah perubahan CI mekanis; flips/drops adalah keputusan kebijakan yang diperuntukkan bagi operator.** Belum ada yang diterapkan di bawah ini.

**Juga tidak berdokumen di atas** (nasihat, sinyal rendah): pekerjaan `docs-lint` (markdownlint + Vale, seluruh pekerjaan `continue-on-error`) dan alur kerja pemindai mandiri `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` ada di `quality-baseline.json` tetapi tidak dihubungkan ke ratchet pemblokiran di `ci.yml` — metriknya saat ini tidak ada lagi.

### Gabung / dedup (mekanis, risiko lebih rendah)

Setiap kandidat divalidasi berdasarkan status gerbang langsung pada 17-06-2026 (percaya-tapi-verifikasi); beberapa penggabungan yang "jelas" ternyata menyembunyikan utang dan memang demikian** bukan** drop-in yang bersih.

- **`check:docs-sync` berjalan dua kali** — berdiri sendiri dalam pekerjaan `lint` dan lagi di dalam `check:docs-all` (`docs-sync-strict`) dan kait pra-komit husky. ✅**DONE** — doa `lint` mandiri dihapus.
- **pemindaian CVE** — ❌**NOT penggabungan yang bersih.** `audit:deps` memblokir saran penting dan audit yang tidak lengkap di kelima file kunci, sambil melaporkan saran penting sebagai peringatan berdasarkan kebijakan saat ini; `check:vuln-ratchet` (osv) hanya gagal pada _regression_ vs garis dasar yang diperiksa dan menolak pengukuran yang hilang bila diperlukan. Semantik yang berbeda — menjatuhkan `audit:deps` akan kehilangan gerbang kritis absolut dan penerimaan audit paket independen. Pertahankan keduanya.
- **Deteksi siklus** — ✅**DONE** (#15159 G-01/G-02). Teks lama di sini menyebut gerbang `check:cycles` "hijau, dikurasi" dan membenarkan pemblokirannya karena `check:circular-deps` (dpdm) melaporkan 91 siklus. Hijau itu adalah a** hijau palsu** : `check:cycles` memindai 5 subdirektori (450 file), hanya mencocokkan `import|export … from` statis, dan menghapus setiap penentu `@/` dan `@omniroute/open-sse/`, sehingga tidak dapat melihat siklus alias + impor dinamis yang mendominasi repo. Memperbaiki: gerbang sekarang berjalan `src` + `open-sse` (file 5023), mengumpulkan penentu dari TypeScript AST (jadi `import("…")` dihitung dan posisi tipe `typeof import("…")` tidak), dan menyelesaikan tsconfig `paths`. Ia menemukan** 14** siklus, bukan 0. Karena 14 siklus yang sudah ada sebelumnya tidak dapat diperbaiki di gerbang PR, `check:cycles` sekarang menjadi** roda bergigi searah** (`--ratchet`, plafon `metrics.cycles.value = 14` di `quality-baseline.json`, `direction: down`) — memblokir _regresi_ apa pun dan hitungannya hanya bisa turun. CI menjalankan `npm run check:cycles:ratchet`. Wahana pembakaran dengan**A-01** . `check:circular-deps` (dpdm) tetap bersifat penasehat sebagai opini kedua yang lebih luas.
- **Kompleksitas** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): satu ESLint berjalan, dihitung dengan ruleId sehingga garis maks + siklomatik dan garis dasar kognitif tetap independen; `check:complexity` / `check:cognitive-complexity` individu tetap untuk `--update` lokal.
- **`/api` anti-halusinasi** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): satu inventaris FS dari `src/app/api`, openapi-routes + docs-symbols masih melaporkan secara independen; individu tetap untuk menjalankan lokal.
- **`check:node-runtime` berjalan di 11 pekerjaan** — ⚠️** ROI rendah.** Masing-masing adalah pelari terpisah dan ceknya adalah < 1s; penghematan total ~ 10s, dibandingkan kehilangan perlindungan per pekerjaan yang murah. Tidak sebanding dengan churnnya.
- **`typecheck:noimplicit:core` pada serat CI** — ✅** dihapus dari pekerjaan lint** (adalah penasehat `continue-on-error`); permukaan tipe pemblokiran adalah `typecheck:core` + `check:type-coverage`. Skrip lokal dipertahankan.

### Balik/putuskan (kebijakan operator)

- `check:openapi-security-tiers` (nasihat) — ❌**NOT dapat dibalik dengan rapi.** Ini keluar dari 0 tetapi memperingatkan bahwa beberapa rute `traffic-inspector` di bawah `LOCAL_ONLY_API_PREFIXES` tidak memiliki anotasi `x-loopback-only: true`. Untuk menerapkannya, perlu menambahkan anotasi tersebut ke `openapi.yaml` terlebih dahulu.
- `typecheck:noimplicit:core` (penasihat) — sebagian besar dimasukkan oleh ratchet `check:type-coverage` pemblokiran. Balik ke ratchet atau jatuhkan pass `tsc` kedua yang berlebihan.
- `test:vitest:ui` (sekarang** pemblokiran** ) kegagalan — yang sudah ada sebelumnya secara eksplisit dikecualikan di `vitest.config.ts` dengan komentar pelacakan `// #8618` ; kegagalan baru menggagalkan pekerjaan.
- `check:secrets` (gitleaks, pemblokiran ratchet dibekukan pada 3 positif palsu yang terdokumentasi) — mengizinkan 3 mencapai 0, atau menurunkannya menjadi penasehat. Tumpang tindih GitHub pemindaian rahasia asli + `check:public-creds`.
- `check:pr-evidence` (memblokir, memahami prosa badan PR) — risiko positif palsu yang tinggi; melemahkan penegakan Aturan Keras #18 jika dibatalkan, jadi ini adalah seruan kebijakan yang sebenarnya.
- `semgrep` (penasihat mandiri) — tumpang tindih CodeQL untuk keluarga OWASP ; kawatkan garis dasarnya ke ratchet atau drop.

---

## Dokumentasi Terkait

- Rantai pasokan (asal, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### gerbang paritas set kunci `check-key-completeness` —

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, pekerjaan `i18n-ui-coverage`). Membandingkan kumpulan kunci daun dari setiap `src/i18n/messages/<locale>.json` dengan `en.json` dan gagal pada setiap daun yang tidak ada atau tambahan, terlepas dari kapan kunci tersebut ditambahkan. `__MISSING__:` placeholder dihitung sebagai sekarang (kontennya adalah urusan gerbang rasio). Ini adalah pelengkap mutlak dari dua gerbang diff-based/percentage : `check-ui-keys-coverage` menerapkan 80 % lantai per lokal (43 kunci yang hilang dari ~ 13.000 masih terbaca 99,7 %) dan `check-new-key-coverage` hanya menilai kunci yang ditambahkan PR ke `en.json`. Batch lokal dihasilkan dari `en.json` pada hari cabangnya dipotong dan diterjemahkan selama berhari-hari sementara basis terus menambahkan kunci; kumpulan PR tidak menambahkan kunci itu sendiri, jadi kedua saudara kandung tetap diam ketika kumpulan 1 (#13044) melakukan kekurangan 43 kunci di sembilan lokasi dan kumpulan 2 (#13660) kekurangan 10 kunci dalam delapan (15-09-2026). Perbaiki warna merah dengan `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; daun `extra` berarti sumber menjatuhkannya — menghapusnya dari lokal. `--warn` melaporkan tanpa gagal. `--catalog=cli` menjalankan perbandingan yang sama pada `bin/cli/locales` (`npm run i18n:check-keys:cli`); kedua langkah tersebut ada di pekerjaan `i18n-ui-coverage`.

#### `check-new-key-coverage` — gerbang i18n kunci baru

Saudara dari `check-ui-value-drift`. Yang itu menangkap nilai bahasa Inggris** ditulis ulang** sementara terjemahannya tertinggal; yang ini menangkap kunci bahasa Inggris itu** ditambahkan** sementara beberapa daerah tidak pernah menerimanya.

`check-ui-keys-coverage` tidak dapat melihat kelas ini: ia menerapkan persentase minimum per lokal, dan sebelas kunci yang hilang dari ~ 13.000 meninggalkan cakupan pada 99,9%. Persentase per bahasa tidak dapat menyatakan "fitur ini dikirimkan tanpa diterjemahkan" — seluruh fitur dapat mendarat di lokal baru tanpa teks dan tidak pernah memindahkan nomornya.

Insiden yang dikodekannya: Fase 3 Kanvas Orkestrasi menerjemahkan sebelas kuncinya ke 42 lokasi yang ada pada saat itu. Beberapa jam kemudian kelompok berbahasa UE (#13044) membawa repo tersebut ke 51 lokal, dan sembilan pendatang baru (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) tidak pernah menerimanya. `deepMergeFallback` menggantikan kunci yang tidak ada dalam bahasa Inggris, jadi mode kegagalannya adalah UI yang tidak diterjemahkan, bukan UI — nyata, dan tidak bersuara berdasarkan konstruksi.

Seperti saudaranya** sadar akan perbedaan** , membandingkan bahasa Inggris di basis penggabungan dengan pohon yang berfungsi, sehingga kesenjangan yang sudah ada sebelumnya tetap beku dan gerbang tidak memerlukan migrasi untuk diaktifkan.

**Penanda `__MISSING__:<english>` tidak memuaskannya (sejak 17-09-2026).** Dulunya adalah penangguhan — yang terdokumentasi, runtime kembali ke bahasa Inggris yang benar — hingga delapan fitur PRs pada 16-09-2026 menambahkan 61 kunci dan mencap penanda ke semua 65 lokal alih-alih menerjemahkan: gerbang ini menerima semuanya, tidak ada yang memblokir PRs, dan gerbang rasio terjemahan nyata pemblokiran kemudian gagal pada tip rilis untuk semua orang (pt-BR 3.2 % > 2.5 % + 0,5). Sebuah penanda kini dinilai sebagai terjemahan yang tidak ada. Perbaiki warna merah dengan `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, atau semua lokal secara paralel dengan `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, menolak untuk memulai tanpa `OMNIROUTE_TRANSLATION_*` env). Kunci yang harus tetap dalam bahasa Inggris (nama product/engine/flag yang disematkan) termasuk dalam `scripts/i18n/untranslatable-keys.json`, tidak pernah berada di belakang penanda. `vi` langsung melarang penanda (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gerbang tes parkir

File dalam daftar `exclude` `vitest.config.ts` adalah tes yang tidak berjalan, dan sepertinya mencakup siapa pun yang membaca pohon tersebut. Enam puluh dua file terakumulasi di belakang komentar `// #8618 — pre-existing failure; remove this exclusion when fixed`. Masalah #8618 ditutup pada 11-08-2026 sementara daftar yang dilacaknya bertambah dari 45 entri menjadi 62, masing-masing entri baru mewarisi komentar yang menunjuk pada masalah yang sudah mati. Ketika daftar itu akhirnya diukur file demi file (#13204),** 51 dari 62 lolos melawan pohon saat ini tanpa perubahan sumber** .

Gerbang memerlukan setiap pengecualian yang menyelesaikan file nyata untuk (a) memberi nama masalah pelacakan dan (b) muncul di `config/quality/vitest-exclusions.json` dengan status terukurnya, jadi menambahkan satu adalah perbedaan yang dapat ditinjau dalam file khusus daripada satu baris lagi dalam larik 60 entri. Ia sengaja tidak menjalankan kembali pengujian yang dikecualikan — yang memerlukan waktu ~ 10 menit dan termasuk dalam pekerjaan berkala; catatan inventaris kapan masing-masing terakhir diukur.
