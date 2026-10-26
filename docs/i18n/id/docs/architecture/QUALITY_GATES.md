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

Workflow CI dan Quality Gates masing-masing menghasilkan keputusan yang stabil: `Gate / CI` dan
`Gate / Quality`. Kebijakan penerimaan berversi milik keduanya mencantumkan setiap job upstream
sebagai wajib atau advisori. Job wajib yang berlaku harus berhasil: hasil yang hilang,
dibatalkan, dilewati, tertunda, dan tidak diketahui tidak dapat menetapkan PASS. Klasifikasi
docs-only atau catalog-only yang valid dapat membuat suatu jalur kode tidak berlaku;
PR draf bukan kandidat yang diterima. Label `hotfix` tidak menghapus kewajiban bukti.

Kedua workflow mencakup PR ke cabang main/release, push ke `main`, dispatch manual,
dan peristiwa merge-group. Push, dispatch, dan merge-group menjalankan seleksi penuh. Push ke
`release/**` tidak memulainya (2026-10-18): setiap perubahan telah menjalankan matriks pada PR-nya
dan kombinasi hasil merge merupakan tugas Release-Green (`docs/ops/RUNNER_BOX.md` → jalur Hosted). Fork
dan merge group menggunakan runner hosted untuk job yang seharusnya memilih runner self-hosted;
kapasitas hosted yang memadai harus diverifikasi sebelum rollout.

Setiap bukti JSON mengidentifikasi SHA yang di-checkout, workflow run, dan attempt.
CLI menolak ketidakcocokan SHA checkout/peristiwa. Pengujian workflow mengikat keanggotaan kebijakan
ke daftar `needs` milik job keputusan sehingga jalur baru atau yang dihapus tidak dapat menghilang
secara diam-diam. Bukti tersebut mencakup workflow-nya sendiri, bukan publikasi, deployment, atau bagian internal
dari scanner advisori yang sudah ada. Mengaktifkan kedua nama check dalam aturan cabang merupakan
perubahan administratif terpisah; menambahkan job ini tidak dengan sendirinya melindungi cabang.

### Inventaris pemindaian statis

Inventaris npm-alias berversi dan keanggotaan pemindaian statis berada di
`config/quality/gate-manifest.json`. Jalankan `npm run check:gate-manifest` untuk memvalidasi
nama skrip dan perintah yang tepat terhadap `package.json`; penambahan, penghapusan, dan
perubahan perintah akan menggagalkan hook lokal maupun job klasifikasi perubahan di CI.
Alias bukanlah job workflow, instance matriks, atau kasus pengujian: jumlah-jumlah ini tidak boleh
disajikan seolah-olah dapat dipertukarkan.

Gunakan `npm run quality:scan -- --list` atau `npm run quality:scan:fast -- --list`
untuk memeriksa alias yang dipilih tanpa menjalankannya. Runner memanggil
entrypoint npm sehingga runtime-nya (termasuk Bun jika dikonfigurasi) tetap dipertahankan.
Manifest mencatat alias di luar profil tersebut sebagai dipanggil secara terpisah, dan
perintah pemeliharaan dilarang dalam profil pemindaian read-only.

Profil ini hanya mencakup pemindaian statis. Profil ini tidak menyertifikasi pengujian produk,
cakupan, packaging, check eksternal, atau penerimaan rilis penuh suatu kandidat.
Penerimaan workflow menggunakan `config/quality/admission-policy.json` yang ditautkan dan
`scripts/quality/admission-verdict.mjs`. Profil release-observer tetap terpisah;
periksa check dan bukti yang berlaku untuk profil tersebut secara independen. Inventaris berbentuk
prosa di bawah ini merupakan referensi, bukan bukti bahwa suatu gate benar-benar dijalankan.

Skrip berada di bawah `scripts/check/` (gate kebijakan) dan `scripts/quality/` (mesin ratchet).
Sumber kebenaran CI adalah `.github/workflows/ci.yml`.

### Jalur cepat PR rilis (`quality.yml`)

`.github/workflows/quality.yml` melengkapi CI pada PR main/release, push ke `main`,
dispatch, dan merge group. PR menggunakan check cepat yang difilter berdasarkan path. Build duplikat
yang dinonaktifkan secara permanen telah dihapus; check build/package/boot yang sebenarnya tetap berada di CI.

| Job                                              | Cakupan                                                                                                                                                                                                     | Memblokir         |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `Docs Gates (fast-path)`                         | PR dokumentasi/kode; referensi dokumentasi API dan docs-all                                                                                                                                                 | Ya                |
| `Fast Quality Gates`                             | PR kode; check statis, pemeriksaan tipe, pemeriksaan tipe dashboard, pengujian unit terdampak                                                                                                               | Ya                |
| `Forgotten sibling tests`                        | PR kode; modul yang berubah ditelusuri ke konsumen statis dan kandidat pengujian sibling; path barrel dan dynamic-import dilaporkan sebagai diagnostik advisori, dengan pengecualian allowlist yang dirujuk | **Advisori**      |
| `Vitest (fast-path)`                             | PR kode; suite Vitest cepat                                                                                                                                                                                 | Ya                |
| `Unit Tests fast-path`                           | PR kode; suite unit 4-shard                                                                                                                                                                                 | Ya                |
| `No new ESLint warnings`                         | PR kode; guard lint yang memperhitungkan suppression                                                                                                                                                        | Ya, termasuk fork |
| `Merge integrity (changelog + generated skills)` | PR non-draf; sinkronisasi changelog dan skill yang dihasilkan                                                                                                                                               | Ya, termasuk fork |

#### Laporan pengujian sibling yang terlupakan

`npm run check:forgotten-sibling-tests` menggunakan kembali resolver impor yang mendasari peta dampak pengujian.
Untuk setiap modul produksi yang diubah, perintah ini melaporkan rantai deterministik
`changed module/symbol -> static consumer -> candidate sibling test` ketika pengujian kandidat
tidak ada dalam diff pull request. Ringkasan Markdown dan hasil JSON dipertahankan sebagai
artefak alur kerja `forgotten-sibling-tests` untuk kalibrasi sebelum penerapan pemblokiran.

Ekspor ulang barrel dan impor dinamis hanya merupakan diagnostik resolusi; keduanya tidak pernah
menghasilkan temuan yang memblokir. Pengecualian yang telah ditinjau berada di
`config/quality/forgotten-sibling-allowlist.json`. Setiap entri harus menyebutkan konsumen dan pengujian
kandidat, memberikan alasan yang spesifik, serta menautkan issue atau pull request GitHub. Entri yang
tidak valid akan gagal secara tertutup. Pengecualian tidak dapat menyembunyikan pengujian kandidat
yang dihapus atau diff yang menambahkan `.skip`/`.todo`; pelemahan assertion dan penyamaran lainnya
tetap menjadi tanggung jawab gate `check:test-masking` yang memblokir secara independen.

### Pekerjaan: `lint`

Dijalankan pada setiap PR ke `main`. Memblokir penggabungan jika gagal.

| Skrip (`npm run ...`)             | Memvalidasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Memblokir                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Versi Node.js berada dalam rentang yang didukung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                       |
| `check:cycles`                    | Impor melingkar di seluruh `src/` + `open-sse/` (berbasis AST, `paths` tsconfig diselesaikan). Versi tanpa akhiran keluar dengan kode 1 setiap kali ada siklus (gagal secara tertutup sejak #15281) dan mencantumkan SCC. `check:cycles:ratchet` (yang dijalankan CI) memblokir ketika jumlahnya melebihi batas atas `metrics.cycles` dalam `quality-baseline.json` — saat ini 14, `direction: down`, sehingga nilainya hanya dapat turun (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ya (ratchet)                             |
| `check:boundary`                  | Keterkaitan `open-sse → src`: impor unik antarfile dari mesin ke aplikasi (`scripts/quality/measure-boundary.mjs`; daftar edge adalah backlog remediasi pemisahan inti/modul v4). Versi tanpa akhiran = laporan advisori (sama seperti `quality:boundary`). `check:boundary:ratchet` (yang dijalankan CI, juga dalam loop ratchet gerbang cepat `quality.yml`) memblokir ketika jumlahnya melebihi batas atas `metrics.boundaryOpenSseToSrc` dalam `quality-baseline.json` — diinisialisasi pada hasil pengukuran 771, `direction: down`; `--update` hanya menurunkannya; relatif terhadap basis pada PR (`--base-ref`, lihat di bawah)                                                                                                                                                                                                                                                                                                                                                                                                        | Ya (ratchet)                             |
| `check:route-validation:t06`      | Skema Zod tersedia pada semua rute (kebijakan Tingkat 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                       |
| `check:any-budget:t11`            | Jumlah `@ts-expect-error // any` tidak melebihi anggaran (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                       |
| `check:provider-consistency`      | Setiap penyedia di `providers.ts` memiliki entri yang sesuai di `providerRegistry.ts` (dan sebaliknya, dalam daftar yang diizinkan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                       |
| `check:model-lifecycle`           | Tiga tabel perutean yang dikelola secara manual tetap konsisten dengan snapshot siklus hidup yang disimpan dalam repositori (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tidak memberikan skor pada ID yang sudah dihentikan dan masih dapat dirutekan oleh `REGISTRY`; setiap target `BUILT_IN_ALIASES` ada di `REGISTRY` dan tidak ada dalam snapshot ID yang dihentikan; setiap ID yang dihentikan dan masih ada di `REGISTRY` diteruskan atau tercantum dalam `allowedRetiredInCatalog`; serta tidak ada sumber atau target `DEFAULT_DEGRADATION_MAP` yang ditandai sebagai dihentikan dalam snapshot tersebut. Ini tidak membuktikan bahwa suatu model saat ini dilayani oleh upstream aktif. Offline — dibandingkan dengan `config/quality/model-lifecycle.json`, yang diperbarui secara manual menggunakan `npm run quality:refresh-model-lifecycle` (memerlukan jaringan; tidak diintegrasikan ke CI). `allowedRetiredInCatalog` adalah mekanisme ratchet pengurangan bertahap: tambahkan entri hanya jika disertai masalah pelacakan. | Ya                                       |
| `check:fetch-targets`             | Setiap `fetch("/api/...")` dalam `src/` sisi klien mengarah ke `route.ts` yang benar-benar ada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ya                                       |
| `check:deps`                      | Semua dependensi yang dapat diinstal dengan `npm install` di setiap `package.json` dalam repositori tercantum di `dependency-allowlist.json`; paket baru yang tidak dipatok versinya atau merupakan hasil slopsquatting akan ditandai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                       |
| `audit:deps`                      | `npm audit` (root + electron) — tidak ada advisori tingkat tinggi/kritis (tumpang tindih dengan osv `check:vuln-ratchet`; lihat Backlog Rasionalisasi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                       |
| `check:lockfile`                  | Integritas `package-lock.json` — registry https, hash integritas, tanpa penggantian host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                       |
| `check:licenses`                  | Daftar izin lisensi SPDX untuk dependensi produksi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                       |
| `check:tracked-artifacts`         | Tidak ada artefak build / symlink `node_modules` yang di-commit (juga dijalankan dalam pre-commit husky; pre-push sengaja dibuat ringan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                       |
| `check:ai-attribution`            | Tidak ada trailer `Co-Authored-By` dari AI/bot atau footer pembuatan oleh AI dalam commit, judul, atau isi PR — Aturan Tegas #16 (dalam loop pemeriksaan cepat `quality.yml` untuk PR→`release/**` — membaca payload peristiwa, tidak melakukan apa pun di luar PR — dan langkah khusus PR dalam lint `ci.yml` untuk PR→`main`; juga hook `commit-msg` husky; rekan penulis manusia diperbolehkan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | Setiap pengecualian Vitest mencantumkan issue pelacakan dan tercantum dalam `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ya                                       |
| `check:file-size`                 | File sumber (`.ts`/`.tsx` dalam `src/`, `open-sse/`, `electron/`, `bin/`) tetap berada dalam batas `cap` dan file pengujian (`*.test.ts(x)`) dalam batas `testCap`; file yang dibekukan dalam `file-size-baseline.json` (`frozen` / `testFrozen`) tidak boleh bertambah melampaui ukuran yang tercatat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                       |
| `check:error-helper`              | Respons kesalahan di executor/handler menggunakan `buildErrorBody()` / `sanitizeErrorMessage()` (Aturan Ketat #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                       |
| `check:migration-numbering`       | File SQL migrasi diberi nomor secara berurutan, tanpa nomor yang terlewat atau duplikat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                       |
| `check:public-creds`              | Tidak ada OAuth `client_id`/`client_secret` literal atau kunci Firebase Web di luar `publicCreds.ts` (Aturan Ketat #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                       |
| `check:db-rules`                  | Tidak ada SQL mentah di luar modul `src/lib/db/`; tidak ada barrel import dari `localDb.ts` (Aturan Ketat #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                       |
| `check:known-symbols`             | Executor penyedia, strategi perutean, dan penerjemah yang terdaftar dalam tabel dispatch-nya sesuai dengan file pada disk—tidak ada simbol yatim atau yang tidak dideklarasikan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                       |
| `check:route-guard-membership`    | Setiap rute yang menjalankan proses anak diklasifikasikan oleh `isLocalOnlyPath()` (Aturan Ketat #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                       |
| `check:test-discovery`            | Setiap file `*.test.ts` / `*.spec.ts` di repo dikumpulkan oleh setidaknya satu test runner (ratchet: daftar orphan di `test-discovery-baseline.json` hanya dapat berkurang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ya                                       |
| `check:test-tla-order`            | Tidak ada file `node:test` di bawah `tests/unit` yang mendaftarkan pengujian, mencapai `await` tingkat atas, lalu mendaftarkan pengujian lainnya (#18045; ratchet: `test-tla-order-allowlist.json` hanya dapat berkurang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                       |
| `check:agent-skills-sync`         | Artefak agent-skills yang dihasilkan cocok dengan katalog sumbernya (tidak ada penyimpangan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Logo/aset penyedia memiliki entri asal-usul yang tercatat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | File konfigurasi JSON dapat di-parse dan memenuhi aturan lint repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | Kompilasi TypeScript tanpa error (hanya peringatan advisori)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ya                                       |
| `typecheck:noimplicit:core`       | `noImplicitAny` yang ketat — berorientasi ke depan; banyak lokasi pemanggilan yang sudah ada masih memerlukan anotasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Advisori** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` yang dicakupkan ke `src/app/(dashboard)/**` (#7033) — daftar izin 27 file yang dikurasi milik `typecheck:core` tidak menyertakan TSX dasbor apa pun, dan `next build` juga tidak pernah memeriksa tipenya (`next.config.mjs` menetapkan `ignoreBuildErrors: true`), sehingga regresi pengidentifikasi yatim di sana (#6625/#6909) tidak terlihat oleh CI. Membandingkan dengan baseline jumlah per file/per kode TS yang dibekukan (`config/quality/dashboard-typecheck-baseline.json`, pola penegakan kedaluwarsa yang sama seperti `check:known-symbols`) — hanya kesalahan BARU yang melampaui jumlah dalam baseline yang menggagalkan gerbang; turunkan baseline dengan `--update` ketika kesalahan yang sudah ada diperbaiki.                                                                                                                                                                                                                                                                                                       | Ya                                       |

### Pekerjaan: `quality-gate`

Berjalan setelah `test-coverage`. Memblokir penggabungan jika gagal.

| Skrip                        | Memvalidasi                                                                                                                                                                                      | Memblokir              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `quality:collect`            | Menghasilkan `quality-metrics.json` (jumlah peringatan ESLint, cakupan dari laporan shard gabungan)                                                                                              | Ya (hulu dari ratchet) |
| `quality:ratchet`            | Setiap metrik dalam `quality-baseline.json` tidak mengalami regresi (peringatan ESLint ≤ baseline; cakupan ≥ baseline)                                                                           | Ya                     |
| `check:duplication`          | Duplikasi kode (jscpd@4) tidak melebihi baseline dalam `quality-baseline.json`                                                                                                                   | Ya                     |
| `check:complexity`           | Kompleksitas siklomatik tingkat file tidak melebihi batas (aturan inti ESLint `complexity` + `max-lines-per-function`)                                                                           | Ya                     |
| `check:cognitive-complexity` | Ratchet kompleksitas kognitif (`eslint-plugin-sonarjs`) — proses ESLint terpisah; CI menjalankan keduanya secara gabungan sebagai satu langkah `check:complexity-ratchets`                       | Ya                     |
| `check:dead-code`            | Ratchet ekspor/file yang tidak digunakan (knip) tidak mengalami regresi dibandingkan baseline                                                                                                    | Ya                     |
| `check:compression-budget`   | Anggaran tolok ukur kompresi — batas minimum penghematan token per mesin tidak boleh mengalami regresi                                                                                           | Ya                     |
| `check:type-coverage`        | Ratchet persentase yang memiliki tipe (`type-coverage`) tidak mengalami regresi; sebagian besar mencakup fungsi `typecheck:noimplicit:core`                                                      | Ya                     |
| `check:codeql-ratchet`       | Jumlah peringatan CodeQL terbuka tidak mengalami regresi (dibaca melalui `gh api`; dilewati dengan baik tanpa token) — untuk jadwal pembaruan dan pemicu manual: lihat "Ratchet CodeQL" di bawah | Ya                     |

### Pekerjaan: `quality-extended`

Seluruh pekerjaan bersifat advisori (`continue-on-error: true`). Ratchet berbasis npm benar-benar
dijalankan; pemindai eksternal diinstal melalui `gh release download` dan melewati prosesnya sendiri (exit 0)
ketika biner masih tidak tersedia.

| Skrip                    | Memvalidasi                                                                                                                                                                                                                        | Memblokir                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:circular-deps`    | Tidak ada dependensi melingkar (dpdm)                                                                                                                                                                                              | **Advisori**                                   |
| `check:bundle-size`      | Ukuran bundel tidak melebihi batas                                                                                                                                                                                                 | **Advisori**                                   |
| `check:secrets`          | Pemindaian rahasia (gitleaks) — dilewati jika biner tidak tersedia                                                                                                                                                                 | **Advisori**                                   |
| `check:vuln-ratchet`     | Kerentanan dependensi (osv-scanner) tidak mengalami regresi — dilewati jika biner tidak tersedia                                                                                                                                   | **Advisori**                                   |
| `check:workflows`        | Lint alur kerja (actionlint + zizmor); pemindai yang hilang/rusak, laporan tidak valid, atau baseline ratchet yang hilang menyebabkan status INCOMPLETE. Temuan yang valid mengikuti kebijakan ketat/advisori/ratchet yang dipilih | Eksekusi wajib; ratchet zizmor memblokir di CI |
| `check:openapi-breaking` | Perubahan yang merusak kontrak API publik (`openapi.yaml`) dibandingkan cabang dasar (oasdiff) — menghasilkan `openapiBreaking=N`; dilewati jika oasdiff tidak tersedia atau spesifikasi dasar tidak dapat diresolusi              | **Advisori**                                   |

### Pekerjaan: `docs-sync-strict`

Berjalan pada setiap PR ke `main`. Memblokir penggabungan jika gagal.

| Skrip                          | Memvalidasi                                                                                                                                                                      | Memblokir                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Meta-gate yang menjalankan 6 sub-gate di bawah ini secara berurutan                                                                                                              | Ya                            |
| ↳ `check:docs-sync`            | Konsistensi versi CHANGELOG / OpenAPI / llm.txt                                                                                                                                  | Ya                            |
| ↳ `check:docs-counts`          | Jumlah dalam prosa (jumlah penyedia, jumlah migrasi, dll.) berada dalam rentang ratchet dari jumlah sebenarnya                                                                   | Ya                            |
| ↳ `check:env-doc-sync`         | Setiap variabel lingkungan dalam `.env.example` didokumentasikan dalam tabel dokumentasi, dan sebaliknya                                                                         | Ya                            |
| ↳ `check:deprecated-versions`  | Tidak ada string versi yang sudah tidak digunakan dalam dokumentasi                                                                                                              | Ya                            |
| ↳ `check:doc-links`            | Tautan markdown internal dalam dokumentasi mengarah ke berkas yang benar-benar ada (format `[text]`/`(path)`)                                                                    | Ya                            |
| ↳ `check:fabricated-docs`      | Rute, variabel lingkungan, perintah CLI, nama hook, dan jalur berkas yang disebutkan dalam dokumentasi ada di basis kode. Gate wajib melalui `--strict`; gagal lunak tanpa flag. | Ya (melalui `--strict` di CI) |
| `check:cli-i18n`               | String perintah CLI tersedia dalam semua berkas lokal i18n                                                                                                                       | Ya                            |
| `check:openapi-coverage`       | Spesifikasi OpenAPI mencakup setidaknya batas minimum rute nyata yang ditentukan dengan ratchet                                                                                  | Ya                            |
| `check:openapi-security-tiers` | Anotasi tingkat keamanan dalam `openapi.yaml` konsisten dengan klasifikasi `routeGuard.ts`                                                                                       | **Rekomendasi**               |
| `check:openapi-routes`         | Setiap path dalam `openapi.yaml` mengarah ke `route.ts` yang benar-benar ada (anti-halusinasi)                                                                                   | Ya                            |
| `check:docs-symbols`           | Setiap referensi `/api/...` dalam `docs/**/*.md` mengarah ke `route.ts` yang benar-benar ada (anti-halusinasi)                                                                   | Ya                            |
| `i18n translation drift`       | Key yang belum diterjemahkan dalam berkas lokal i18n — hanya peringatan                                                                                                          | **Rekomendasi**               |

### Job: `i18n-ui-coverage`

| Skrip                             | Memvalidasi                                                                                                                                                                                              | Memblokir       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | Cakupan key i18n UI adalah ≥ 65%                                                                                                                                                                         | Ya              |
| `check-ui-value-drift` (inline)   | **Nilai** bahasa Inggris yang ditulis ulang tidak meninggalkan terjemahan usang                                                                                                                          | Ya              |
| `check-new-key-coverage` (inline) | **Key** bahasa Inggris yang **baru** diterjemahkan dalam setiap lokal — penanda `__MISSING__:` ditolak                                                                                                   | Ya              |
| `check-translation-ratio`         | Rasio terjemahan nyata per lokal (sama dengan bahasa Inggris / placeholder / tidak ada di luar daftar yang diizinkan) tidak boleh melebihi `config/quality/i18n-translation-baseline.json` + kelonggaran | **Rekomendasi** |

Memerlukan `fetch-depth: 0` — gate penyimpangan nilai membandingkan `en.json` dengan basis penggabungan.

#### `check-ui-value-drift` — gate terjemahan usang

Menangkap satu regresi i18n yang secara struktural tidak dapat dideteksi oleh gate lainnya: suatu nilai bahasa Inggris
ditulis ulang dan terjemahan yang berasal dari bahasa Inggris _sebelumnya_ tetap tertinggal, sehingga
pengguna non-Inggris terus membaca teks yang terdengar meyakinkan, tetapi kini salah.

Ini benar-benar pernah dirilis. `oauthModal.googleOAuthWarning` ditulis ulang ketika alat bantu login
Antigravity ditambahkan (#5203); **39 dari 43 lokal** tetap memiliki teks yang meminta operator untuk "menyalin
URL lengkap dan menempelkannya di bawah" — alur yang tidak dapat diselesaikan untuk penyedia tersebut. Hal ini
tidak terdeteksi hingga #8463 karena:

- `sync-ui-keys` hanya mengisi key yang **tidak ada**, bukan key yang **usang**;
- `check-ui-keys-coverage` menghitung _keberadaan_ key, sehingga terjemahan usang dianggap tercakup;
- `check-translation-drift` melacak cerminan dokumentasi `docs/i18n/<locale>/**.md` —
  dan tidak pernah membaca `src/i18n/messages/*.json`. Bersifat memblokir dalam job `docs-sync-strict` sejak
  sinkronisasi ulang 2026-09: edit dokumen inti → `npm run i18n:run -- --files=<doc>` (per bagian, ringan).

**Sadar-diff, bukan berbasis baseline.** Pemeriksaan ini membandingkan `en.json` pada merge base dengan
working tree; untuk setiap key yang nilai bahasa Inggrisnya berubah, locale apa pun yang masih menyimpan
terjemahan yang tidak tersentuh dianggap kedaluwarsa. Ini sengaja **membekukan utang yang sudah ada** — sebuah diff
tidak dapat mengungkapkan dari versi bahasa Inggris lama mana suatu terjemahan lama berasal, sehingga gate hanya menilai
apa yang disentuh oleh perubahan saat ini. Alternatifnya (baseline hash per key) akan memerlukan
file hasil generasi berukuran ~600 KB, 3× baseline terbesar yang ada, dan berubah pada setiap PR i18n.

Dua cara untuk memenuhinya:

1. perbarui terjemahan yang terdampak, atau
2. atur nilainya menjadi `__MISSING__:<new english>` — runtime kemudian menyajikan versi bahasa Inggris yang telah diperbaiki
   (`src/i18n/request.ts::deepMergeFallback`, #7258), dan key tersebut dimasukkan ke antrean terjemahan.

Jika **makna** string berubah, utamakan **mengganti nama key**: key baru tidak dapat mewarisi
terjemahan yang kedaluwarsa. Itulah pola yang digunakan #8463.

```bash
npm run i18n:check-value-drift          # ketat (yang dijalankan CI)
npm run i18n:check-value-drift:warn     # hanya melaporkan
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Keluar dengan kode 0 disertai `SKIP reason=base-unresolved` ketika katalog dasar tidak dapat dibaca (shallow
clone tanpa base ref), mengikuti perilaku `check-openapi-breaking`.

### Job: `i18n`

Matriks validasi i18n lengkap (satu job per locale). Seluruh job bersifat advisori.

| Skrip                           | Memvalidasi                       | Pemblokiran                                               |
| ------------------------------- | --------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Kelengkapan terjemahan per locale | **Advisori** (`continue-on-error: true` pada seluruh job) |

### Job: `pr-test-policy`

Hanya berjalan pada pull request.

| Skrip                  | Memvalidasi                                                                                                                                          | Pemblokiran |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check:pr-test-policy` | PR yang mengubah kode produksi di `src/`, `open-sse/`, `electron/`, atau `bin/` harus menyertakan atau memperbarui pengujian (Aturan Ketat #8)       | Ya          |
| `check:test-masking`   | File pengujian yang diubah tidak mengurangi jumlah assert bersih atau menambahkan tautologi `assert.ok(true)`                                        | Ya          |
| `check:pr-evidence`    | Isi PR mencantumkan bukti pengujian/VPS untuk perubahan tersebut (mengotomatiskan Aturan Ketat #18 dengan grep pada prosa PR — rapuh, lihat Backlog) | Ya          |

### Job: `test-vitest`

Berjalan setelah `build`. Memblokir penggabungan jika gagal.

| Suite            | Memvalidasi                                             | Pemblokiran                                                                                                                      |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 alat), autoCombo, cache — runner vitest | Ya                                                                                                                               |
| `test:vitest:ui` | Pengujian komponen UI — runner vitest                   | **Memblokir** — kegagalan yang sudah ada secara eksplisit dikecualikan dalam `vitest.config.ts`; kegagalan baru menggagalkan job |

### Workflow nightly (terjadwal, advisori)

Workflow ini berjalan sesuai jadwal cron (dan `workflow_dispatch`), tidak pernah pada PR. Semuanya bersifat advisori.

| Workflow               | Memvalidasi                                                                                                                                                                  | Pemblokiran  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | Pengujian properti fast-check dengan seed acak + jumlah eksekusi tinggi                                                                                                      | **Advisori** |
| `nightly-resilience`   | Gate pertumbuhan heap, injeksi gangguan chaos, beban/perendaman k6                                                                                                           | **Advisori** |
| `nightly-llm-security` | Pelindung injeksi promptfoo (mode blokir) + probe garak (dilewati tanpa secret penyedia)                                                                                     | **Advisori** |
| `nightly-schemathesis` | Fuzzing kontrak OpenAPI (schemathesis) terhadap OmniRoute aktif menggunakan `docs/openapi.yaml` — mengungkap pelanggaran spesifikasi / 500 yang tidak ditangani (Fase 8 B.4) | **Advisori** |
| `nightly-mutation`     | Skor pengujian mutasi Stryker pada jalur unit cepat — mutan yang bertahan mengungkap assert yang lemah                                                                       | **Advisori** |
| `nightly-compat`       | Matriks kompatibilitas engine Node di seluruh rentang `engines.node` yang didukung                                                                                           | **Advisori** |

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

Setiap gate yang tidak boleh gagal akibat pelanggaran yang sudah ada menggunakan allowlist yang dibekukan
(misalnya, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Kebijakannya adalah:

**Perbaiki akar masalah; gunakan allowlist hanya jika pelanggaran sudah ada sebelumnya dan
tidak dapat diperbaiki dalam PR yang sama.**

Saat menambahkan entri ke allowlist:

1. Sertakan komentar yang berisi justifikasi.
2. Referensikan issue pelacakan (misalnya, `// #3498 — Fitur Fase 2, belum diimplementasikan`).
3. Hapus entri tersebut dalam PR yang sama yang memperbaiki pelanggaran — entri usang yang tidak lagi
   menyembunyikan pelanggaran aktif merupakan cacat tersendiri (penegakan entri usang 6A.3 akan
   menggagalkan gate pada entri allowlist yatim setelah diimplementasikan).

**Jangan** menambahkan entri allowlist agar pengujian lulus lebih cepat. Gate hijau dengan allowlist
yang terus bertambah memberikan kesan kualitas yang semu.

### Saat gate gagal pada PR Anda

1. **Baca output gate dengan saksama** — output tersebut memberi tahu Anda secara persis file atau simbol mana yang
   melanggar aturan.
2. **Perbaiki pelanggaran** — sebagian besar gate merupakan pemeriksaan sistem berkas deterministik yang akan lulus segera
   setelah kode diperbaiki.
3. **Jika pelanggaran sudah ada sebelumnya** (yaitu, Anda tidak memperkenalkannya, tetapi gate kini
   mencakupnya): tambahkan entri allowlist dengan komentar justifikasi dan issue pelacakan.
4. **Jika gate merupakan ratchet** (cakupan, peringatan ESLint, duplikasi, kompleksitas):
   perubahan Anda memperburuk metrik. Perbaiki masalah yang mendasarinya, atau (dalam kasus yang jarang) jalankan
   `npm run quality:ratchet -- --update` jika perubahan tersebut disengaja dan penurunan
   metrik dapat diterima — tetapi dokumentasikan alasannya dalam deskripsi PR.
5. **Gate advisori** (`continue-on-error: true`) bersifat informatif — gate tersebut tidak memblokir
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

Inventaris ini direkonsiliasi dengan `ci.yml` pada 2026-06-17 (versi sebelumnya menghilangkan
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Tinjauan ROI terhadap kumpulan yang telah direkonsiliasi
mengidentifikasi kandidat rasionalisasi berikut. **Penggabungan merupakan perubahan CI
mekanis; pengubahan/penghapusan merupakan keputusan kebijakan yang diperuntukkan bagi operator.** Belum ada
hal di bawah ini yang diterapkan.

**Juga belum didokumentasikan di atas** (bersifat saran, sinyal rendah): job `docs-lint`
(markdownlint + Vale, seluruh job menggunakan `continue-on-error`) dan workflow pemindai mandiri
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` terdapat dalam
`quality-baseline.json`, tetapi tidak terhubung ke ratchet pemblokir di `ci.yml` — metrik tersebut
saat ini tidak terpakai.

### Gabungkan / deduplikasi (mekanis, risiko lebih rendah)

Setiap kandidat telah divalidasi terhadap status gate aktif pada 2026-06-17 (percaya tetapi tetap verifikasi);
beberapa penggabungan yang tampak "jelas" ternyata menyembunyikan utang dan **bukan** pengganti langsung yang aman.

- **`check:docs-sync` berjalan dua kali** — secara mandiri dalam job `lint`, lalu kembali di dalam `check:docs-all` (`docs-sync-strict`) dan hook pre-commit husky. ✅ **SELESAI** — pemanggilan mandiri dalam `lint` telah dihapus.
- **Pemindaian CVE** — ❌ **BUKAN penggabungan yang aman.** `audit:deps` langsung gagal jika menemukan CVE high/critical; `check:vuln-ratchet` (osv) hanya gagal jika terjadi _regresi_ dibandingkan baseline (saat ini 1 MODERATE). Semantiknya berbeda — menghapus `audit:deps` akan menghilangkan gate absolut untuk tingkat high/critical. Pertahankan keduanya.
- **Deteksi siklus** — ✅ **SELESAI** (#15159 G-01/G-02). Teks lama di sini menyebut `check:cycles` sebagai gate "hijau dan terkurasi" serta membenarkan untuk mempertahankannya sebagai pemblokir karena `check:circular-deps` (dpdm) melaporkan 91 siklus. Status hijau tersebut merupakan **hijau palsu**: `check:cycles` memindai 5 subdirektori (450 file), hanya mencocokkan `import|export … from` statis, dan membuang setiap specifier `@/` serta `@omniroute/open-sse/`, sehingga tidak dapat mendeteksi siklus dynamic-import + alias yang mendominasi repo. Telah diperbaiki: gate tersebut kini menelusuri `src` + `open-sse` (5023 file), mengumpulkan specifier dari AST TypeScript (sehingga `import("…")` dihitung dan `typeof import("…")` pada posisi tipe tidak dihitung), serta menyelesaikan `paths` tsconfig. Gate tersebut menemukan **14** siklus, bukan 0. Karena 14 siklus yang sudah ada sebelumnya tidak dapat diperbaiki dalam PR gate, `check:cycles` kini menjadi **ratchet** (`--ratchet`, batas atas `metrics.cycles.value = 14` dalam `quality-baseline.json`, `direction: down`) — ratchet tersebut memblokir setiap _regresi_ dan jumlahnya hanya dapat turun. CI menjalankan `npm run check:cycles:ratchet`. Penurunan bertahap dilakukan bersama **A-01**. `check:circular-deps` (dpdm) tetap bersifat saran sebagai opini kedua yang lebih luas.
- **Kompleksitas** — ✅ **SELESAI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): satu penelusuran ESLint, menghitung berdasarkan ruleId agar baseline cyclomatic+max-lines dan cognitive tetap independen; masing-masing `check:complexity` / `check:cognitive-complexity` tetap tersedia untuk `--update` lokal.
- **Anti-halusinasi `/api`** — ✅ **SELESAI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): satu inventaris FS untuk `src/app/api`, openapi-routes + docs-symbols tetap melaporkan secara independen; masing-masing tetap tersedia untuk eksekusi lokal.
- **`check:node-runtime` berjalan dalam 11 job** — ⚠️ **ROI rendah.** Masing-masing menggunakan runner terpisah dan pemeriksaannya berlangsung <1 detik; total penghematan ~10 detik, dengan konsekuensi kehilangan pengaman murah per job. Tidak sepadan dengan perubahan yang ditimbulkan.
- **`typecheck:noimplicit:core` pada lint CI** — ✅ **dihapus dari job lint** (sebelumnya bersifat saran dengan `continue-on-error`); permukaan tipe pemblokir adalah `typecheck:core` + `check:type-coverage`. Skrip lokal dipertahankan.

### Ubah / putuskan (kebijakan operator)

- `check:openapi-security-tiers` (bersifat saran) — ❌ **TIDAK dapat langsung diubah dengan aman.** Pemeriksaan ini keluar dengan kode 0, tetapi memperingatkan bahwa beberapa rute `traffic-inspector` di bawah `LOCAL_ONLY_API_PREFIXES` tidak memiliki anotasi `x-loopback-only: true`. Penerapannya sebagai kewajiban mengharuskan anotasi tersebut ditambahkan ke `openapi.yaml` terlebih dahulu.
- `typecheck:noimplicit:core` (bersifat saran) — sebagian besar telah tercakup oleh ratchet pemblokir `check:type-coverage`. Ubah menjadi ratchet atau hapus lintasan `tsc` kedua yang redundan.
- `test:vitest:ui` (sekarang **memblokir**) — kegagalan yang sudah ada sebelumnya secara eksplisit dikecualikan dalam `vitest.config.ts` dengan komentar pelacakan `// #8618`; kegagalan baru akan menggagalkan job.
- `check:secrets` (gitleaks, ratchet pemblokir yang dibekukan pada 3 false-positive terdokumentasi) — masukkan ketiganya ke allowlist agar mencapai 0, atau turunkan menjadi bersifat saran. Tumpang tindih dengan pemindaian secret bawaan GitHub + `check:public-creds`.
- `check:pr-evidence` (memblokir, melakukan grep terhadap prosa isi PR) — risiko false-positive tinggi; penghapusannya akan melemahkan penegakan Hard Rule #18, sehingga ini benar-benar merupakan keputusan kebijakan.
- `semgrep` (mandiri dan bersifat saran) — tumpang tindih dengan CodeQL untuk kelompok OWASP; hubungkan baseline-nya ke ratchet atau hapus.

---

## Dokumentasi Terkait

- Rantai pasok (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gerbang paritas kumpulan kunci

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Membandingkan kumpulan kunci leaf dari setiap `src/i18n/messages/<locale>.json` dengan `en.json` dan gagal
jika ada leaf yang tidak ada atau berlebih, terlepas dari kapan kunci tersebut ditambahkan. Placeholder `__MISSING__:`
dianggap ada (kontennya merupakan urusan gerbang rasio). Ini merupakan pelengkap mutlak
dari kedua gerbang berbasis diff/persentase: `check-ui-keys-coverage` memberlakukan batas minimum 80 % per
locale (43 kunci yang tidak ada dari ~13.000 masih terbaca sebagai 99,7 %) dan `check-new-key-coverage` menilai
hanya kunci yang ditambahkan PR ke `en.json`. Batch locale dibuat dari `en.json` pada hari
branch-nya dibuat dan diterjemahkan selama beberapa hari sementara base terus menambahkan kunci; PR batch tersebut tidak
menambahkan kunci apa pun, sehingga kedua gerbang terkait tetap diam ketika batch 1 (#13044) masuk dengan kekurangan 43 kunci di sembilan
locale dan batch 2 (#13660) kekurangan 10 kunci di delapan locale (2026-09-15). Perbaiki status merah dengan
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; leaf `extra`
berarti sumber telah menghapusnya — hapus leaf tersebut dari locale. `--warn` melaporkan tanpa menggagalkan.
`--catalog=cli` menjalankan perbandingan yang sama pada `bin/cli/locales` (`npm run i18n:check-keys:cli`);
kedua langkah berada dalam job `i18n-ui-coverage`.

#### `check-new-key-coverage` — gerbang i18n untuk kunci baru

Gerbang terkait dari `check-ui-value-drift`. Gerbang tersebut mendeteksi nilai bahasa Inggris yang telah **ditulis ulang**
sementara terjemahannya tertinggal; gerbang ini mendeteksi kunci bahasa Inggris yang telah **ditambahkan**
sementara beberapa locale tidak pernah menerimanya.

`check-ui-keys-coverage` tidak dapat melihat kelas masalah ini: gerbang tersebut memberlakukan batas minimum persentase per locale, dan
sebelas kunci yang tidak ada dari ~13.000 membuat cakupan tetap 99,9%. Persentase per bahasa tidak dapat
mengungkapkan "fitur ini dirilis tanpa terjemahan" — seluruh fitur dapat masuk ke locale baru tanpa
teks apa pun dan tidak pernah mengubah angkanya.

Insiden yang dikodekannya: Fase 3 Orchestration Canvas menerjemahkan sebelas kuncinya ke seluruh
42 locale yang ada saat itu. Beberapa jam kemudian, batch bahasa UE (#13044) menambah jumlah locale dalam repo
menjadi 51, dan sembilan pendatang baru (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) tidak pernah
menerimanya. `deepMergeFallback` menggantikan kunci yang tidak ada dengan bahasa Inggris, sehingga mode kegagalannya adalah
UI yang tidak diterjemahkan, bukan UI kosong — nyata, dan senyap secara bawaan.

Seperti gerbang terkaitnya, gerbang ini **peka terhadap diff**, dengan membandingkan bahasa Inggris pada merge base terhadap working
tree, sehingga celah yang sudah ada tetap dibekukan dan gerbang tidak memerlukan migrasi untuk diaktifkan.

**Marker `__MISSING__:<english>` tidak memenuhinya (sejak 2026-09-17).** Sebelumnya marker ini merupakan
mekanisme penundaan yang terdokumentasi — runtime beralih ke bahasa Inggris yang benar — hingga delapan PR fitur pada
2026-09-16 menambahkan 61 kunci dan membubuhkan marker tersebut ke seluruh 65 locale alih-alih menerjemahkannya: gerbang ini
menerima semuanya, tidak ada yang memblokir PR, dan gerbang rasio terjemahan nyata yang bersifat memblokir
kemudian gagal pada ujung rilis untuk semua orang (pt-BR 3,2 % > 2,5 % + 0,5). Marker kini dinilai
sebagai terjemahan yang tidak ada. Perbaiki status merah dengan
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, atau
semua locale secara paralel dengan `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
aman saat detached, menolak dimulai tanpa env `OMNIROUTE_TRANSLATION_*`). Kunci yang harus tetap
berbahasa Inggris (nama produk/engine/flag yang dipatok) harus dimasukkan ke `scripts/i18n/untranslatable-keys.json`,
jangan pernah disembunyikan di balik marker. `vi` melarang marker sepenuhnya (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gerbang pengujian yang ditangguhkan

File dalam daftar `exclude` milik `vitest.config.ts` adalah pengujian yang tidak dijalankan, dan terlihat seperti
cakupan bagi siapa pun yang membaca tree. Enam puluh dua file terakumulasi di balik komentar
`// #8618 — kegagalan yang sudah ada sebelumnya; hapus pengecualian ini setelah diperbaiki`. Issue #8618 ditutup pada
2026-08-11 sementara daftar yang dilacaknya bertambah dari 45 entri menjadi 62, dengan setiap entri baru mewarisi komentar
yang menunjuk ke issue yang sudah tidak aktif. Ketika daftar tersebut akhirnya diukur file per file (#13204), **51 dari 62
lulus pada tree saat ini tanpa perubahan sumber apa pun**.

Gerbang ini mengharuskan setiap pengecualian yang merujuk ke file nyata untuk (a) menyebutkan issue pelacakan dan
(b) tercantum dalam `config/quality/vitest-exclusions.json` beserta status hasil pengukurannya, sehingga penambahan pengecualian menjadi
diff yang dapat ditinjau dalam file khusus, bukan sekadar satu baris tambahan dalam array berisi 60 entri. Gerbang ini sengaja
tidak menjalankan ulang pengujian yang dikecualikan — proses tersebut memerlukan ~10 menit dan seharusnya dilakukan dalam job berkala;
inventaris mencatat kapan setiap pengujian terakhir kali diukur.
