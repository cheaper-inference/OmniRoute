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

## Inventaris gate dan profil eksekusi

### Penerimaan kandidat

Workflow CI dan Quality masing-masing menghasilkan keputusan yang stabil: `Gate / CI` dan
`Gate / Quality`. Kebijakan penerimaan berversi miliknya mencantumkan setiap job upstream
sebagai wajib atau bersifat advisori. Job wajib yang berlaku harus berhasil: hasil yang
hilang, dibatalkan, dilewati, tertunda, dan tidak diketahui tidak dapat menetapkan PASS. Klasifikasi
khusus dokumentasi atau khusus katalog yang valid dapat membuat lane kode tidak berlaku;
PR draf bukan kandidat yang diterima. Label `hotfix` tidak menggugurkan persyaratan bukti.

Kedua workflow mencakup PR ke branch main/release, push ke `main`, dispatch manual,
dan peristiwa merge-group. Push, dispatch, dan merge-group menjalankan seleksi lengkap. Push ke
`release/**` tidak memulainya (2026-10-18): setiap perubahan sudah menjalankan matriks pada PR-nya
dan kombinasi hasil merge merupakan tugas Release-Green (`docs/ops/RUNNER_BOX.md` → Lane yang di-hosting). Fork
dan merge group menggunakan runner yang di-hosting untuk job yang seharusnya memilih runner
yang di-hosting sendiri; kapasitas hosting yang memadai harus diverifikasi sebelum peluncuran.

Setiap tanda terima JSON mengidentifikasi SHA yang di-checkout, eksekusi workflow, dan percobaan.
CLI menolak ketidakcocokan SHA checkout/peristiwa. Pengujian workflow mengikat keanggotaan kebijakan
ke daftar `needs` milik job keputusan agar lane baru atau yang dihapus tidak dapat menghilang secara diam-diam.
Tanda terima mencakup workflow-nya sendiri, bukan publikasi, deployment, atau bagian internal
dari pemindai advisori yang sudah ada. Mengaktifkan kedua nama pemeriksaan dalam aturan branch merupakan
perubahan administratif terpisah; penambahan job ini tidak dengan sendirinya melindungi branch.

### Bukti yang dipertahankan dalam reducer penerimaan

`scripts/quality/validate-release-acceptance.mjs` mereduksi rencana yang diberikan beserta
manifesnya; skrip ini tidak menetapkan bahwa rencana tersebut mencakup seluruh pipeline rilis.
Laporannya secara eksplisit menetapkan `releaseAcceptance: false`, bahkan ketika rencana tersebut
berstatus `VERIFIED`. Workflow `release-acceptance.yml` masih menggunakan fixture bayangan, bukan
tanda terima build, package, boot, atau promosi yang sebenarnya.

CLI memerlukan `--evidence-root` untuk memverifikasi bukti yang dipertahankan. File di-resolve
sebagai `<evidence-root>/<artifact_id>/<member>` dan di-hash dengan SHA-256. Rekaman PASS
tanpa bukti, file yang hilang atau berubah, path yang tidak aman, atau symlink mencegah
verifikasi. File yang hilang tidak setara dengan log keberhasilan yang kosong. Pemeriksaan
SHA/run/attempt yang sudah ada tetap independen: byte yang cocok tidak dapat menyelamatkan
tanda terima kedaluwarsa. Integritas file bukan bukti autentisitas eksekusi atau promosi artefak.

### Kapasitas eksekusi UI

CI menjalankan inventaris UI lengkap sebagai empat shard matriks `test-vitest`, masing-masing dengan maksimal
dua worker per shard dan batas waktu job 15 menit yang sudah ada. Shard pertama juga menjalankan
suite Vitest MCP/autoCombo. Hasil job wajib mencakup setiap bagian matriks; kegagalan
atau pembatalan satu shard tidak dapat menetapkan penerimaan kandidat.

Observer nightly mempertahankan tanda terima exact-candidate terpisah untuk setiap shard UI,
termasuk eksekusi MCP dalam tanda terima pertama. Keempat tanda terima, log, dan identitas
eksekusi yang cocok diwajibkan. `npm run test:vitest:ui` lokal tetap memilih
suite lengkap; satu eksekusi `--shard` hanya merupakan bukti parsial.

### Pengumpulan cakupan unit

Kedua belas shard unit mengumpulkan cakupan V8 selama eksekusi pengujian yang sudah ada. Shard yang berhasil
menjalankan `scripts/ci/compact-v8-coverage.mjs` untuk mengompresi file asli tanpa menghasilkan
laporan Istanbul perantara. Job Coverage terakhir memverifikasi kedua belas manifes terhadap
SHA kandidat, runtime, root sumber, dan hash data, lalu menjalankan reporter c8 serta ambang batas
cakupan yang sudah ada. Input mempertahankan urutan nama file global c8; pra-penggabungan per shard tidak aman
untuk cakupan fungsi/blok campuran. Shard yang hilang, rusak, atau tidak kompatibel menggagalkan penerimaan.
Shard pengujian yang gagal mempertahankan cakupan diagnostik mentah secara terpisah; cakupan tersebut tidak dapat masuk ke penggabungan akhir.

### Inventaris pemindaian statis

Inventaris npm-alias berversi dan keanggotaan pemindaian statis berada di
`config/quality/gate-manifest.json`. Jalankan `npm run check:gate-manifest` untuk memvalidasi
nama skrip dan perintah persis terhadap `package.json`; penambahan, penghapusan, dan
penyimpangan perintah menggagalkan hook lokal maupun job klasifikasi perubahan di CI.
Alias bukanlah job workflow, instance matriks, atau kasus pengujian: jumlah ini tidak boleh
disajikan sebagai hal yang dapat dipertukarkan.

Gunakan `npm run quality:scan -- --list` atau `npm run quality:scan:fast -- --list`
untuk memeriksa alias yang dipilih tanpa mengeksekusinya. Runner memanggil
entrypoint npm, sehingga runtime-nya (termasuk Bun jika dikonfigurasi) dipertahankan.
Manifes mencatat alias di luar profil tersebut sebagai dipanggil secara terpisah, dan
perintah pemeliharaan dilarang dalam profil pemindaian hanya-baca.

Profil ini hanya mencakup pemindaian statis. Profil tersebut tidak mensertifikasi pengujian produk,
cakupan, pengemasan, pemeriksaan eksternal, atau penerimaan rilis penuh suatu kandidat.
Penerimaan workflow menggunakan `config/quality/admission-policy.json` yang ditautkan dan
`scripts/quality/admission-verdict.mjs`. Profil release-observer tetap terpisah;
periksa pemeriksaan dan tanda terima yang berlaku secara independen. Perintah statis observer lengkap
dideklarasikan dalam `config/quality/release-green-static-profile.json`, termasuk
`audit:deps`, pemilihan pengujian mutasi, dan pemeriksaan terjemahan. Loader memvalidasi perintah npm
terhadap package.json dan deklarasi CI/Quality yang dimodelkan; loader menolak penyimpangan
alih-alih mengeksekusi token shell sebagai argumen. Output SKIP/INCOMPLETE dari pemindai wajib
tidak dapat menetapkan PASS. Profil mencatat pengecualian eksternalnya dan tidak menggantikan
bukti cakupan yang di-hosting, matriks pengujian, package, atau deployment. Inventaris prosa di bawah
merupakan referensi, bukan bukti bahwa gate benar-benar dijalankan.

Skrip berada di bawah `scripts/check/` (gate kebijakan) dan `scripts/quality/` (mesin ratchet).
Sumber kebenaran CI adalah `.github/workflows/ci.yml`.

### Jalur cepat PR rilis (`quality.yml`)

`.github/workflows/quality.yml` melengkapi CI pada PR main/release, push ke `main`,
dispatch, dan merge group. PR menggunakan pemeriksaan cepat yang difilter berdasarkan path. Build duplikat
yang dinonaktifkan secara permanen telah dihapus; pemeriksaan build/package/boot yang sebenarnya tetap ada di CI.

| Job                                              | Cakupan                                                                                                                                                                                                      | Memblokir         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `Docs Gates (fast-path)`                         | PR dokumentasi/kode; referensi dokumentasi API dan docs-all                                                                                                                                                  | Ya                |
| `Fast Quality Gates`                             | PR kode; pemeriksaan statis, typecheck, typecheck dashboard, unit test yang terdampak                                                                                                                        | Ya                |
| `Forgotten sibling tests`                        | PR kode; modul yang diubah ditelusuri ke konsumen statis dan kandidat sibling test; path barrel dan dynamic-import dilaporkan sebagai diagnostik advisori, dengan pengecualian allowlist yang direferensikan | **Advisori**      |
| `Vitest (fast-path)`                             | PR kode; suite vitest cepat                                                                                                                                                                                  | Ya                |
| `Unit Tests fast-path`                           | PR kode; suite unit 4-shard                                                                                                                                                                                  | Ya                |
| `No new ESLint warnings`                         | PR kode; guard lint yang mempertimbangkan suppression                                                                                                                                                        | Ya, termasuk fork |
| `Merge integrity (changelog + generated skills)` | PR non-draf; sinkronisasi changelog dan skill yang dihasilkan                                                                                                                                                | Ya, termasuk fork |

#### Laporan forgotten sibling tests

`npm run check:forgotten-sibling-tests` menggunakan kembali resolver impor di balik peta dampak pengujian.
Untuk setiap modul produksi yang diubah, perintah ini melaporkan rantai deterministik
`changed module/symbol -> static consumer -> candidate sibling test` ketika pengujian kandidat
tidak ada dalam diff pull request. Ringkasan Markdown dan hasil JSON disimpan sebagai artefak workflow
`forgotten-sibling-tests` untuk kalibrasi sebelum penerapan apa pun yang bersifat memblokir.

Ekspor ulang barrel dan impor dinamis hanya merupakan diagnostik resolusi; keduanya tidak pernah menghasilkan
temuan yang memblokir. Pengecualian yang telah ditinjau berada di
`config/quality/forgotten-sibling-allowlist.json`. Setiap entri harus menyebutkan konsumen dan pengujian
kandidat, memberikan alasan spesifik, dan menautkan issue atau pull request GitHub. Entri yang tidak valid
akan gagal secara tertutup. Pengecualian tidak dapat menyembunyikan pengujian kandidat yang dihapus atau diff yang menambahkan `.skip`/`.todo`;
pelemahan assertion dan bentuk masking lainnya tetap menjadi tanggung jawab gate
`check:test-masking` yang memblokir secara independen.

### Job: `lint`

Berjalan pada setiap PR ke `main`. Memblokir merge jika gagal.

| Skrip (`npm run ...`)             | Memvalidasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Memblokir                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Versi Node.js berada dalam rentang yang didukung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                       |
| `check:cycles`                    | Impor sirkular di seluruh `src/` + `open-sse/` (berbasis AST, `paths` tsconfig diselesaikan). Versi dasar keluar dengan kode 1 setiap kali ada siklus (fail-closed sejak #15281) dan mencantumkan SCC. `check:cycles:ratchet` (yang dijalankan CI) memblokir ketika jumlahnya melampaui batas atas `metrics.cycles` dalam `quality-baseline.json` — saat ini 14, `direction: down`, sehingga nilainya hanya dapat turun (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya (ratchet)                             |
| `check:boundary`                  | Keterikatan `open-sse → src`: impor unik antarsatu berkas ke berkas lain dari engine ke aplikasi (`scripts/quality/measure-boundary.mjs`; daftar edge merupakan backlog remediasi pemisahan core/modul v4). Versi dasar = laporan informatif (sama seperti `quality:boundary`). `check:boundary:ratchet` (yang dijalankan CI, juga dalam loop ratchet fast-gates `quality.yml`) memblokir ketika jumlahnya melampaui batas atas `metrics.boundaryOpenSseToSrc` dalam `quality-baseline.json` — dimulai dari hasil pengukuran sebesar 771, `direction: down`; `--update` hanya menurunkannya; bersifat relatif terhadap base pada PR (`--base-ref`, lihat di bawah)                                                                                                                                                                                                                                                                                                                                                                                      | Ya (ratchet)                             |
| `check:route-validation:t06`      | Skema Zod tersedia pada semua route (kebijakan Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                       |
| `check:any-budget:t11`            | Jumlah `@ts-expect-error // any` tidak melebihi batas (Tingkat 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                       |
| `check:provider-consistency`      | Setiap penyedia di `providers.ts` memiliki entri yang sesuai di `providerRegistry.ts` (dan sebaliknya, dalam daftar izin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                       |
| `check:model-lifecycle`           | Ketiga tabel perutean yang dikelola secara manual tetap konsisten dengan snapshot siklus hidup yang disimpan (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tidak memberikan skor pada id yang sudah dihentikan tetapi masih dapat dirutekan oleh `REGISTRY`; setiap target `BUILT_IN_ALIASES` terdapat di `REGISTRY` dan tidak ada dalam snapshot id yang sudah dihentikan; setiap id yang sudah dihentikan tetapi masih ada di `REGISTRY` diteruskan atau tercantum di `allowedRetiredInCatalog`; dan tidak ada sumber atau target `DEFAULT_DEGRADATION_MAP` yang ditandai sudah dihentikan dalam snapshot tersebut. Pemeriksaan ini tidak membuktikan bahwa suatu model saat ini dilayani oleh upstream aktif. Luring — membandingkan dengan `config/quality/model-lifecycle.json`, yang diperbarui secara manual menggunakan `npm run quality:refresh-model-lifecycle` (memerlukan jaringan; tidak diintegrasikan ke CI). `allowedRetiredInCatalog` adalah mekanisme ratchet pengurangan bertahap: tambahkan entri hanya jika disertai isu pelacakan. | Ya                                       |
| `check:fetch-targets`             | Setiap `fetch("/api/...")` dalam `src/` sisi klien mengarah ke `route.ts` yang benar-benar ada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                       |
| `check:deps`                      | Semua dependensi yang dapat dipasang dengan `npm install` di setiap `package.json` dalam repositori tercantum di `dependency-allowlist.json`; paket baru yang tidak dipatok versinya atau berpotensi slopsquatting akan ditandai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                       |
| `audit:deps`                      | Audit npm terhadap kelima lockfile independen (root, Electron, plugin OpenCode v1/v2, dan penyedia). Advisori kritis akan memblokir; advisori tingkat tinggi tetap ditampilkan sebagai peringatan. Audit yang hilang/gagal dianggap TIDAK LENGKAP dan akan memblokir; hash lock dan laporan per cakupan dipertahankan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                       |
| `check:lockfile`                  | Integritas `package-lock.json` — registry https, hash integritas, tanpa penggantian host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                       |
| `check:licenses`                  | Daftar izin lisensi SPDX untuk dependensi produksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                       |
| `check:tracked-artifacts`         | Tidak ada artefak build / symlink `node_modules` yang di-commit (juga dijalankan pada pre-commit husky; pre-push sengaja dibuat ringan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                       |
| `check:ai-attribution`            | Tidak ada trailer `Co-Authored-By` AI/bot atau footer pembuatan oleh AI dalam commit, judul, atau isi PR — Aturan Ketat #16 (dalam loop gerbang cepat `quality.yml` untuk PR→`release/**` — membaca payload peristiwa, tidak melakukan apa pun di luar PR — dan langkah khusus PR dalam lint `ci.yml` untuk PR→`main`; juga hook `commit-msg` husky; rekan penulis manusia diizinkan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:vitest-exclusions`         | Setiap pengecualian Vitest mencantumkan isu pelacakan dan tercantum dalam `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                       |
| `check:file-size`                 | File sumber (`.ts`/`.tsx` dalam `src/`, `open-sse/`, `electron/`, `bin/`) tetap dalam batas `cap` dan file pengujian (`*.test.ts(x)`) dalam batas `testCap`; file yang dibekukan dalam `file-size-baseline.json` (`frozen` / `testFrozen`) tidak boleh bertambah melampaui ukuran yang tercatat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                       |
| `check:error-helper`              | Respons kesalahan dalam executor/handler menggunakan `buildErrorBody()` / `sanitizeErrorMessage()` (Aturan Ketat #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ya                                       |
| `check:migration-numbering`       | File SQL migrasi diberi nomor secara berurutan, tanpa celah atau duplikat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                       |
| `check:public-creds`              | Tidak ada OAuth `client_id`/`client_secret` literal atau kunci Web Firebase di luar `publicCreds.ts` (Aturan Ketat #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ya                                       |
| `check:db-rules`                  | Tidak ada SQL mentah di luar modul `src/lib/db/`; tidak ada impor barrel dari `localDb.ts` (Aturan Ketat #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                       |
| `check:known-symbols`             | Executor penyedia, strategi perutean, dan penerjemah yang terdaftar dalam tabel dispatch-nya cocok dengan file pada disk — tanpa simbol yatim atau yang tidak dideklarasikan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                       |
| `check:route-guard-membership`    | Setiap rute yang menjalankan proses anak diklasifikasikan oleh `isLocalOnlyPath()` (Aturan Ketat #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                       |
| `check:test-discovery`            | Setiap file `*.test.ts` / `*.spec.ts` dalam repo dikumpulkan oleh setidaknya satu test runner (ratchet: daftar orphan dalam `test-discovery-baseline.json` hanya dapat menyusut)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                       |
| `check:test-tla-order`            | Tidak ada file `node:test` di bawah `tests/unit` yang mendaftarkan pengujian, mencapai `await` tingkat atas, lalu mendaftarkan pengujian lainnya (#18045; ratchet: `test-tla-order-allowlist.json` hanya dapat menyusut)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                       |
| `check:agent-skills-sync`         | Artefak agent-skills yang dihasilkan sesuai dengan katalog sumbernya (tanpa penyimpangan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Logo/aset penyedia memiliki entri asal-usul yang tercatat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | File konfigurasi JSON dapat diurai dan memenuhi aturan lint repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | Kompilasi TypeScript tanpa kesalahan (hanya peringatan advisori)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                       |
| `typecheck:noimplicit:core`       | `noImplicitAny` yang ketat — berorientasi ke depan; banyak lokasi pemanggilan yang sudah ada masih memerlukan anotasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Advisori** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` yang dibatasi pada `src/app/(dashboard)/**` (#7033) — daftar izin terkurasi 27 file milik `typecheck:core` tidak menyertakan TSX dasbor apa pun, dan `next build` juga tidak pernah memeriksa tipenya (`next.config.mjs` menetapkan `ignoreBuildErrors: true`), sehingga regresi pengidentifikasi yatim di sana (#6625/#6909) tidak terlihat oleh CI. Membandingkan dengan baseline jumlah per file/per kode TS yang dibekukan (`config/quality/dashboard-typecheck-baseline.json`, pola penegakan kedaluwarsa yang sama seperti `check:known-symbols`) — hanya kesalahan BARU yang melebihi jumlah pada baseline yang menggagalkan gerbang; turunkan ratchet dengan `--update` ketika kesalahan yang sudah ada diperbaiki.                                                                                                                                                                                                                                                                                                                       | Ya                                       |

### Job: `quality-gate`

Berjalan setelah `test-coverage`. Memblokir penggabungan jika gagal.

| Skrip                        | Memvalidasi                                                                                                                                                                                          | Memblokir         |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | Menghasilkan `quality-metrics.json` (jumlah peringatan ESLint, cakupan dari laporan shard yang digabungkan)                                                                                          | Ya (hulu ratchet) |
| `quality:ratchet`            | Setiap metrik dalam `quality-baseline.json` tidak mengalami regresi (peringatan ESLint ≤ baseline; cakupan ≥ baseline)                                                                               | Ya                |
| `check:duplication`          | Duplikasi kode (jscpd@4) tidak melebihi baseline dalam `quality-baseline.json`                                                                                                                       | Ya                |
| `check:complexity`           | Kompleksitas siklomatik tingkat file tidak melebihi batas (aturan inti ESLint `complexity` + `max-lines-per-function`)                                                                               | Ya                |
| `check:cognitive-complexity` | Ratchet kompleksitas kognitif (`eslint-plugin-sonarjs`) — lintasan ESLint terpisah; CI menjalankan keduanya secara tergabung sebagai satu langkah `check:complexity-ratchets`                        | Ya                |
| `check:dead-code`            | Ratchet ekspor/file yang tidak digunakan (knip) tidak mengalami regresi dibandingkan baseline                                                                                                        | Ya                |
| `check:compression-budget`   | Anggaran tolok ukur kompresi — batas minimum penghematan token per mesin tidak boleh mengalami regresi                                                                                               | Ya                |
| `check:type-coverage`        | Ratchet persentase kode bertipe (`type-coverage`) tidak mengalami regresi; secara umum mencakup `typecheck:noimplicit:core`                                                                          | Ya                |
| `check:codeql-ratchet`       | Jumlah peringatan CodeQL terbuka tidak mengalami regresi (dibaca melalui `gh api`; dilewati secara wajar tanpa token) — untuk frekuensi pembaruan dan pemicu manual: lihat "Ratchet CodeQL" di bawah | Ya                |

### Job: `quality-extended`

Job ini memblokir kandidat yang relevan. Ukuran bundel, temuan rahasia, temuan
kerentanan, temuan alur kerja, dan perubahan OpenAPI diperiksa dengan ratchet wajib.
Diagnostik dependensi sirkular tetap bersifat saran. Instalasi pemindai diwajibkan:
`scripts/ci/install-quality-scanners.sh` menyediakan versi yang dikunci dan meneruskan
kegagalan instalasi. Alat yang hilang, laporan yang tidak valid, atau baseline yang hilang
membuat gerbang pemindai wajib berstatus INCOMPLETE.

| Skrip                    | Memvalidasi                                                                                                                                                                                                                                                | Pemblokiran                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:circular-deps`    | Tidak ada dependensi melingkar (dpdm)                                                                                                                                                                                                                      | **Rekomendasi**                                |
| `check:bundle-size`      | Ukuran bundel tidak melebihi batas; pengukuran yang tidak tersedia menyebabkan kegagalan                                                                                                                                                                   | **Memblokir dengan --ratchet**                 |
| `check:secrets`          | Temuan Gitleaks tidak mengalami regresi; pemindaian wajib menolak alat/sumber/baseline yang tidak tersedia, pemindaian yang gagal, dan laporan yang tidak valid                                                                                            | **Memblokir dengan --ratchet**                 |
| `check:vuln-ratchet`     | Kerentanan dependensi tidak mengalami regresi; pemindaian wajib menolak alat yang tidak tersedia, laporan yang tidak valid, atau baseline yang tidak tersedia                                                                                              | **Memblokir dengan --ratchet**                 |
| `check:workflows`        | Lint alur kerja (actionlint + zizmor); pemindai yang tidak tersedia/rusak, laporan yang tidak valid, atau baseline ratchet yang tidak tersedia akan gagal sebagai INCOMPLETE. Temuan yang valid mengikuti kebijakan ketat/rekomendasi/ratchet yang dipilih | Eksekusi wajib; ratchet zizmor memblokir di CI |
| `check:openapi-breaking` | Kontrak API publik terhadap commit peristiwa yang dipatok (merge-base PR, kondisi sebelum push, basis merge-group; checkout terjadwal/manual pada parent pertama); pengukuran wajib gagal secara tertutup                                                  | **Memblokir dengan --ratchet**                 |

### Job: `docs-sync-strict`

Untuk pull request ke `main` atau `release/**`, job ini hanya berjalan bagi kandidat yang bukan draf (atau berasal dari antrean tepercaya) dan diklasifikasikan sebagai perubahan dokumentasi atau kode. Job ini juga berjalan pada peristiwa CI non-PR; pemicu push workflow ini hanya mencakup `main`, bukan `release/**`. Langkah yang berakhir dengan kode keluar bukan nol memblokir job; temuan yang hanya dilaporkan dan pengecualian terdokumentasi di bawah tidak memblokirnya.

| Skrip                          | Memvalidasi                                                                                                                                                                                                                                                                                                                                               | Pemblokiran                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate yang menjalankan 7 sub-gate di bawah ini secara berurutan                                                                                                                                                                                                                                                                                       | Ya                                                                          |
| ↳ `check:docs-sync`            | Konsistensi versi paket/OpenAPI/CHANGELOG, mirror `llm.txt` yang sama persis, invarian bagian/ukuran CHANGELOG terjemahan, serta tidak adanya dokumen duplikat yang sudah digantikan                                                                                                                                                                      | Ya                                                                          |
| ↳ `check:docs-frontmatter`     | Halaman dokumentasi yang dikompilasi memiliki judul frontmatter yang valid                                                                                                                                                                                                                                                                                | Ya                                                                          |
| ↳ `check:docs-counts`          | Invarian jumlah dengan tingkat kepastian tinggi bersifat ketat; pemeriksaan heuristik jumlah file hanya memberi peringatan kecuali skrip menerima `--strict` (meta-gate CI tidak meneruskannya)                                                                                                                                                           | Tingkat ketat memblokir; tingkat lunak bersifat advisori                    |
| ↳ `check:env-doc-sync`         | Pembacaan variabel lingkungan di kode sumber, `.env.example`, dan `docs/reference/ENVIRONMENT.md` sesuai setelah penerapan allowlist ignore, doc-only, dan env-only yang eksplisit                                                                                                                                                                        | Ya, di luar allowlist yang terdokumentasi                                   |
| ↳ `check:deprecated-versions`  | Melaporkan versi yang berpotensi usang di luar konteks historis yang aman serta tanggal pembaruan yang usang, dengan mengecualikan dokumen yang diabaikan                                                                                                                                                                                                 | Advisori dalam konfigurasi CI saat ini (`--strict` tidak diteruskan)        |
| ↳ `check:doc-links`            | Tautan markdown internal dalam dokumentasi mengarah ke berkas nyata (format `[text]`/`(path)`)                                                                                                                                                                                                                                                            | Ya                                                                          |
| ↳ `check:fabricated-docs`      | Rute, variabel lingkungan, perintah CLI, nama hook, dan jalur berkas yang disebutkan dalam dokumentasi tersedia di basis kode. Gate ketat melalui `--strict`; gagal-lunak tanpa flag.                                                                                                                                                                     | Ya (melalui `--strict` di CI)                                               |
| `check:cli-i18n`               | Kunci CLI `t()` yang digunakan ada di `en`; `pt-BR` mempertahankan semua bagian tingkat teratas; `zh-CN` dan `zh-TW` memuat setiap kunci dari `en`                                                                                                                                                                                                        | Ya                                                                          |
| `check:openapi-coverage`       | Spesifikasi OpenAPI mencakup setidaknya batas minimum rute nyata yang ditetapkan dengan ratchet                                                                                                                                                                                                                                                           | Ya                                                                          |
| `check:openapi-security-tiers` | Anotasi `x-loopback-only`/`x-always-protected` yang dideklarasikan harus didukung oleh `routeGuard.ts`; kesalahan parser dan ketidakcocokan pemeriksaan maju memblokir. Pemeriksaan balik untuk `x-loopback-only` yang hilang di bawah prefiks khusus lokal memberi peringatan, dan rute berbasis pola saja dikecualikan dari pemeriksaan balik tersebut. | Pemeriksaan parser/maju memblokir; pemeriksaan balik bersifat advisori      |
| `check:openapi-routes`         | Setiap path `/api...` dalam `openapi.yaml` sesuai dengan rute nyata tanpa bergantung pada nama parameter setelah allowlist `KNOWN_STALE_SPEC` yang beralasan diterapkan; entri allowlist yang usang juga menyebabkan kegagalan                                                                                                                            | Ya                                                                          |
| `check:docs-symbols`           | Referensi URL internal `/api/...` dalam dokumen kanonis non-mirror sesuai dengan rute nyata atau keluarga rute; referensi proxy/upstream/placeholder/file dan entri `KNOWN_STALE_DOC_REFS` yang beralasan dikecualikan, sedangkan entri allowlist usang menyebabkan kegagalan                                                                             | Ya                                                                          |
| `i18n translation drift`       | Hash sumber/target dari kumpulan inti dokumen terjemahan sesuai dengan `.i18n-state.json`. PR hanya gagal karena drift sumber, target hilang, atau drift hash target yang baru diperkenalkan; pemeriksaan non-PR bersifat ketat. Drift PR yang diwarisi dan hash sumber pada target usang merupakan peringatan.                                           | Drift PR baru/non-PR ketat memblokir; yang diwarisi/usang bersifat advisori |

Dua belas SVG README di bawah `docs/diagrams/` dihasilkan melalui `scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` menghasilkan ulang semuanya.
Masing-masing memiliki uji unit yang membandingkan byte demi byte (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) dan gagal jika berkas yang di-commit sudah usang.
`check:docs-counts` membaca angka kanonis dari simpul `<text>` masing-masing, sehingga angka tidak pernah diubah menjadi path garis luar.
Pemeriksaan angka kanonis SVG membaca berkas yang tercantum dalam `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`.
Pemeriksaan klaim tentang penyedia gratis selamanya, entri katalog, pool berulang, dan faktor penilaian juga membaca `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg`.
`free-tier-budget.svg` mengambil angkanya dari pemuat katalog terkini, sehingga perubahan pada `FREE_MODEL_BUDGETS` atau nama tampilan penyedia membuat CI gagal sampai berkas itu dihasilkan ulang.

### Job: `i18n-ui-coverage`

| Skrip                             | Memvalidasi                                                                                                                                                                                         | Memblokir   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | Cakupan kunci i18n UI adalah ≥ 65%                                                                                                                                                                  | Ya          |
| `check-ui-value-drift` (inline)   | **Nilai** bahasa Inggris yang ditulis ulang tidak meninggalkan terjemahan usang                                                                                                                     | Ya          |
| `check-new-key-coverage` (inline) | Kunci bahasa Inggris **baru** diterjemahkan di setiap locale — penanda `__MISSING__:` akan ditolak                                                                                                  | Ya          |
| `check-translation-ratio`         | Rasio terjemahan nyata per locale (sama dengan bahasa Inggris / placeholder / tidak ada di luar daftar yang diizinkan) tidak boleh melebihi `config/quality/i18n-translation-baseline.json` + slack | **Imbauan** |

Memerlukan `fetch-depth: 0` — gerbang pergeseran nilai membandingkan diff `en.json` terhadap basis penggabungan.

#### `check-ui-value-drift` — gerbang terjemahan usang

Menangkap satu regresi i18n yang secara struktural tidak dapat dilihat oleh gerbang lainnya: nilai bahasa Inggris
ditulis ulang, tetapi terjemahan yang berasal dari bahasa Inggris _sebelumnya_ tetap ada, sehingga
pengguna non-Inggris terus membaca teks yang terdengar meyakinkan, tetapi kini salah.

Hal ini benar-benar pernah dirilis. `oauthModal.googleOAuthWarning` ditulis ulang ketika helper login
Antigravity ditambahkan (#5203); **39 dari 43 locale** tetap mempertahankan teks yang meminta operator untuk "menyalin
URL lengkap dan menempelkannya di bawah" — alur yang tidak dapat diselesaikan untuk penyedia tersebut. Hal ini
tidak terdeteksi hingga #8463 karena:

- `sync-ui-keys` hanya mengisi kembali kunci yang **tidak ada**, bukan yang **usang**;
- `check-ui-keys-coverage` menghitung _keberadaan_ kunci, sehingga terjemahan usang dinilai telah tercakup;
- `check-translation-drift` melacak salinan dokumentasi `docs/i18n/<locale>/**.md` —
  skrip ini tidak pernah membaca `src/i18n/messages/*.json`. Memblokir dalam job `docs-sync-strict` sejak
  sinkronisasi ulang 2026-09: edit dokumen inti → `npm run i18n:run -- --files=<doc>` (tingkat bagian, ringan).

**Sadar-diff, bukan berbasis baseline.** Gerbang ini membandingkan `en.json` pada basis penggabungan dengan
working tree; untuk setiap kunci yang nilai bahasa Inggrisnya berubah, locale mana pun yang masih menyimpan
terjemahan yang tidak tersentuh dianggap usang. Ini sengaja **membekukan utang yang sudah ada** — diff
tidak dapat mengungkap sumber versi bahasa Inggris lama yang mendasari terjemahan lama, sehingga gerbang ini hanya menilai
apa yang disentuh oleh perubahan saat ini. Alternatifnya (baseline hash per kunci) akan memerlukan
file hasil generasi berukuran ~600 KB, 3× lebih besar daripada baseline terbesar yang ada, dan berubah pada setiap PR i18n.

Dua cara untuk memenuhinya:

1. perbarui terjemahan yang terdampak, atau
2. atur nilainya menjadi `__MISSING__:<new english>` — runtime kemudian menyajikan bahasa Inggris yang telah dikoreksi
   (`src/i18n/request.ts::deepMergeFallback`, #7258), lalu kunci tersebut masuk antrean untuk diterjemahkan.

Jika **makna** string berubah, sebaiknya **ganti nama kunci**: kunci baru tidak dapat mewarisi
terjemahan usang. Pola inilah yang digunakan oleh #8463.

```bash
npm run i18n:check-value-drift          # ketat (yang dijalankan CI)
npm run i18n:check-value-drift:warn     # hanya laporan
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Keluar dengan kode 0 dan `SKIP reason=base-unresolved` ketika katalog dasar tidak dapat dibaca (clone dangkal
tanpa ref dasar), mengikuti perilaku `check-openapi-breaking`.

### Job: `i18n`

Matriks validasi i18n lengkap (satu job per locale). Seluruh job bersifat imbauan.

| Skrip                           | Memvalidasi                       | Memblokir                                                |
| ------------------------------- | --------------------------------- | -------------------------------------------------------- |
| `validate_translation.py quick` | Kelengkapan terjemahan per locale | **Imbauan** (`continue-on-error: true` pada seluruh job) |

### Job: `pr-test-policy`

Hanya dijalankan pada pull request.

| Skrip                  | Memvalidasi                                                                                                                                             | Memblokir |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR yang mengubah kode produksi dalam `src/`, `open-sse/`, `electron/`, atau `bin/` harus menyertakan atau memperbarui pengujian (Aturan Keras #8)       | Ya        |
| `check:test-masking`   | File pengujian yang diubah tidak mengurangi jumlah bersih assertion atau menambahkan tautologi `assert.ok(true)`                                        | Ya        |
| `check:pr-evidence`    | Isi PR menyebutkan bukti pengujian/VPS untuk perubahan tersebut (mengotomatiskan Aturan Keras #18 dengan grep terhadap prosa PR — rapuh, lihat Backlog) | Ya        |

### Job: `test-vitest`

Dijalankan setelah `build`. Memblokir penggabungan jika gagal.

| Rangkaian        | Memvalidasi                                             | Pemblokiran                                                                                                                      |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 alat), autoCombo, cache — runner vitest | Ya                                                                                                                               |
| `test:vitest:ui` | Pengujian komponen UI — runner vitest                   | **Memblokir** — kegagalan yang sudah ada secara eksplisit dikecualikan dalam `vitest.config.ts`; kegagalan baru menggagalkan job |

### Workflow nightly (terjadwal, bersifat rekomendasi)

Workflow ini berjalan sesuai jadwal cron (dan `workflow_dispatch`), tidak pernah pada PR. Semuanya bersifat rekomendasi.

| Workflow               | Memvalidasi                                                                                                                                                                        | Pemblokiran     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | Pengujian properti fast-check dengan seed acak + jumlah eksekusi tinggi                                                                                                            | **Rekomendasi** |
| `nightly-resilience`   | Gate pertumbuhan heap, injeksi kegagalan chaos, beban/soak k6                                                                                                                      | **Rekomendasi** |
| `nightly-llm-security` | Perlindungan injeksi promptfoo (mode blokir) + probe garak (dilewati tanpa secret penyedia)                                                                                        | **Rekomendasi** |
| `nightly-schemathesis` | Fuzzing kontrak OpenAPI (schemathesis) terhadap OmniRoute aktif menggunakan `docs/openapi.yaml` — mengungkap pelanggaran spesifikasi / error 500 yang tidak ditangani (Fase 8 B.4) | **Rekomendasi** |
| `nightly-mutation`     | Skor pengujian mutasi Stryker pada jalur unit cepat — mutan yang bertahan mengungkap assertion yang lemah                                                                          | **Rekomendasi** |
| `nightly-compat`       | Matriks kompatibilitas engine Node di seluruh rentang `engines.node` yang didukung                                                                                                 | **Rekomendasi** |

Baseline performa (heap, TTFB, waktu build) dicatat, bukan dijadikan gate: lihat [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## Backlog Rasionalisasi (tinjauan ROI — Fase 9 Gelombang 3)

Inventaris ini direkonsiliasi dengan `ci.yml` pada 2026-06-17 (versi sebelumnya tidak mencantumkan
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Tinjauan ROI terhadap kumpulan yang telah direkonsiliasi
mengidentifikasi kandidat rasionalisasi berikut. **Penggabungan merupakan perubahan CI
mekanis; perubahan status/penghapusan merupakan keputusan kebijakan yang diserahkan kepada operator.** Belum ada satu pun
hal di bawah ini yang diterapkan.

**Juga belum didokumentasikan di atas** (bersifat saran, sinyal rendah): job `docs-lint`
(markdownlint + Vale, seluruh job menggunakan `continue-on-error`) dan workflow pemindai mandiri
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` terdapat dalam
`quality-baseline.json`, tetapi tidak terhubung ke ratchet pemblokir di `ci.yml` — metrik tersebut
saat ini tidak terpakai.

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
