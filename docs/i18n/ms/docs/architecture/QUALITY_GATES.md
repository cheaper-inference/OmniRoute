# Quality Gates Reference (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dokumen ini ialah rujukan berwibawa untuk semua gerbang kualiti CI dalam OmniRoute.
Ia menerangkan setiap gerbang, perkara yang disahkan, tugas CI yang menjalankannya, sama ada ia menggunakan
garis dasar ratchet atau dasar lulus/gagal, dan sama ada ia menyekat binaan atau sekadar bersifat nasihat.

Untuk ringkasan pendek dan dasar senarai dibenarkan, lihat bahagian "Gerbang Kualiti & Ratchet"
dalam `AGENTS.md`. Untuk penilaian kritikal, pengelasan kematangan dan pelan replikasi
bebas alat bagi sistem yang sama, lihat
[Playbook Gerbang Kualiti](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventori gerbang dan profil pelaksanaan

### Penerimaan calon

Aliran kerja CI dan Quality Gates masing-masing menghasilkan keputusan yang stabil: `Gate / CI` dan
`Gate / Quality`. Dasar penerimaan berversi mereka menyenaraikan setiap tugas huluan
sebagai wajib atau nasihat. Tugas wajib yang berkenaan mesti berjaya: hasil yang tiada,
dibatalkan, dilangkau, belum selesai dan tidak diketahui tidak dapat menentukan PASS. Pengelasan
docs-only atau catalog-only yang sah boleh menjadikan laluan kod tidak berkenaan;
PR draf bukan calon yang diterima. Label `hotfix` tidak mengecualikan keperluan bukti.

Kedua-dua aliran kerja meliputi PR ke dalam cabang utama/keluaran, tolakan ke `main`, penghantaran manual
dan peristiwa kumpulan gabungan. Tolakan, penghantaran dan kumpulan gabungan menjalankan pemilihan penuh. Tolakan ke
`release/**` tidak memulakannya (2026-10-18): setiap perubahan telah menjalankan matriks pada PR masing-masing
dan gabungan yang telah digabungkan ialah tanggungjawab Release-Green (`docs/ops/RUNNER_BOX.md` → Laluan dihoskan). Fork
dan kumpulan gabungan menggunakan pelaksana dihoskan untuk tugas yang sebaliknya memilih pelaksana
hos kendiri; kapasiti hos yang mencukupi mesti disahkan sebelum pelaksanaan.

Setiap resit JSON mengenal pasti SHA yang telah di-checkout, pelaksanaan aliran kerja dan percubaan.
CLI menolak ketidakpadanan SHA checkout/peristiwa. Ujian aliran kerja mengikat keahlian dasar
kepada senarai `needs` tugas keputusan supaya laluan baharu atau yang dialih keluar tidak boleh hilang secara senyap.
Resit meliputi aliran kerja mereka sendiri, bukan penerbitan, pelaksanaan, atau dalaman
pengimbas yang bersifat nasihat sedia ada. Menjadikan semakan yang berkenaan sebagai wajib dalam peraturan cabang
ialah perubahan pentadbiran yang berasingan; mentakrifkan tugasnya tidak dengan sendirinya melindungi sesuatu cabang.

`API Route Typecheck` ialah semakan aliran kerja bebas, di luar kedua-dua keputusan agregat
dan profil statik pemerhati penuh tempatan. Periksa hasilnya secara berasingan untuk calon yang tepat.
`.github/workflows/api-route-typecheck.yml` dijalankan pada PR ke `main` atau
`release/**`, tolakan ke salah satu keluarga cabang, dan pencetusan manual. Ia tidak mempunyai penapis laluan.
Penyasaran semula pangkalan PR meminta semakan baharu; suntingan isi kandungan/tajuk menggunakan nama pemerhatian sahaja
`Admission not requested / API Route Typecheck` dan tidak boleh menggantikan semakan kemasukan.
Aliran kerja tersebut tidak mengisytiharkan pencetus kumpulan gabungan. Sebarang pelaksanaan giliran gabungan yang memerlukan
semakan ini mesti terlebih dahulu memastikan pelaksanaannya untuk peristiwa tersebut.

### Kapasiti pelaksanaan UI

CI menjalankan inventori UI penuh sebagai empat serpihan matriks `test-vitest`, setiap satu dengan paling banyak
dua pekerja dan had masa tugas 15 minit yang sedia ada. Serpihan pertama turut menjalankan
suite Vitest MCP/autoCombo. Hasil tugas wajib meliputi setiap bahagian matriks; kegagalan
atau pembatalan satu serpihan tidak dapat menentukan penerimaan calon.

Pemerhati setiap malam mengekalkan resit calon tepat yang berasingan untuk setiap serpihan UI,
termasuk pelaksanaan MCP dalam resit pertama. Keempat-empat resit, log dan identiti
pelaksanaan yang sepadan diperlukan. `npm run test:vitest:ui` setempat masih memilih
suite lengkap; satu pelaksanaan `--shard` hanyalah bukti separa.

### Pengumpulan liputan unit

Dua belas serpihan unit mengumpulkan liputan V8 semasa pelaksanaan ujian sedia ada. Serpihan yang berjaya
menjalankan `scripts/ci/compact-v8-coverage.mjs` untuk memampatkan fail asal tanpa menjana
laporan Istanbul perantaraan. Tugas Coverage terakhir mengesahkan kesemua dua belas manifes terhadap
SHA calon, masa jalan, akar sumber dan cincangan data, kemudian menjalankan pelapor c8 dan ambang
liputan sedia ada. Input mengekalkan tertib nama fail global c8; prapenggabungan mengikut serpihan tidak selamat
untuk liputan fungsi/blok bercampur. Serpihan yang tiada, cacat atau tidak serasi menggagalkan penerimaan.
Serpihan ujian yang gagal mengekalkan liputan diagnostik mentah secara berasingan; liputan itu tidak boleh disertakan dalam penggabungan akhir.

### Resit kemajuan pelaksanaan unit

Perintah dikongsi `test:unit:ci:shard` merekodkan fasa `primary`, `dashboard` dan `serial`
melalui `scripts/ci/unit-progress-reporter.mjs`. Laporan ujian biasa kekal
tersedia. Resit berasingan yang mengandungi metadata sahaja merekodkan permulaan dan penyelesaian
setiap fail, manakala denyutan jantung 30 saat menyenaraikan fail yang masih aktif serta masa berlalu.
Ia hanya merekodkan metadata pelaksanaan yang disenaraibenarkan; perihalan ujian, output, kandungan ralat
dan persekitaran penuh tidak disirikan.

CI dan Quality mengekalkan fail JSONL sebagai `unit-progress-ci-<run>-<attempt>-<shard>` dan
`unit-progress-quality-<run>-<attempt>-<shard>`. Tamat masa kerja boleh menghalang muat naik kemudian;
denyutan jantung yang telah dipancarkan kekal sebagai bukti diagnostik. Ketiadaan denyutan jantung juga
boleh menunjukkan proses pelaksana yang tersekat atau ditamatkan. Resit ini mengekalkan pemilihan ujian,
keserentakan, tarikh akhir dan status keluar sedia ada; resit ini bukan keputusan penerimaan calon.

### Bukti yang disimpan dalam penggabung hasil penerimaan

`scripts/quality/validate-release-acceptance.mjs` menggabungkan pelan yang diberikan dan manifesnya; ia tidak membuktikan bahawa pelan itu meliputi seluruh saluran keluaran. Laporannya secara jelas menetapkan `releaseAcceptance: false`, walaupun pelan itu berstatus `VERIFIED`. Aliran kerja `release-acceptance.yml` masih menggunakan data ujian shadow, bukan resit sebenar bagi binaan, pakej, but atau promosi.

CLI memerlukan `--evidence-root` untuk mengesahkan bukti yang disimpan. Fail dicari melalui `<evidence-root>/<artifact_id>/<member>` dan dicincang dengan SHA-256. Rekod PASS tanpa bukti, fail yang hilang atau berubah, laluan tidak selamat atau pautan simbolik menghalang pengesahan. Fail yang hilang tidak sama dengan log kosong daripada pelaksanaan yang berjaya. Semakan SHA/run/attempt sedia ada kekal bebas: bait yang sepadan tidak dapat menjadikan resit lapuk sah. Integriti fail bukan bukti keaslian pelaksanaan atau promosi artifak.

### Inventori imbasan statik

Inventori alias npm berversi dan keahlian imbasan statik terdapat dalam
`config/quality/gate-manifest.json`. Jalankan `npm run check:gate-manifest` untuk mengesahkan
nama skrip dan perintah tepat terhadap `package.json`; penambahan, pengalihan keluar dan
perubahan perintah menggagalkan kedua-dua cangkuk setempat dan tugas pengelasan perubahan dalam CI.
Alias bukan tugas aliran kerja, tika matriks atau kes ujian: kiraan ini
tidak boleh dipersembahkan sebagai boleh saling ditukar ganti.

Gunakan `npm run quality:scan -- --list` atau `npm run quality:scan:fast -- --list`
untuk memeriksa alias yang dipilih tanpa melaksanakannya. Pelaksana memanggil
titik masuk npm, maka masa jalannya (termasuk Bun jika dikonfigurasikan) dikekalkan.
Manifes merekodkan alias di luar profil tersebut sebagai dipanggil secara berasingan, dan
perintah penyelenggaraan dilarang dalam profil imbasan baca sahaja.

Profil ini meliputi imbasan statik sahaja. Profil ini tidak memperakui ujian produk,
liputan, pembungkusan, semakan luaran atau penerimaan keluaran penuh bagi calon.
Penerimaan aliran kerja menggunakan `config/quality/admission-policy.json` yang dipautkan dan
`scripts/quality/admission-verdict.mjs`. Profil pemerhati keluaran kekal berasingan;
periksa semakan dan resit berkenaan secara bebas. Perintah statik pemerhati penuh
diisytiharkan dalam `config/quality/release-green-static-profile.json`, termasuk
`audit:deps`, pemilihan ujian mutasi dan semakan terjemahan. Pemuat mengesahkan perintah npm
terhadap package.json dan pengisytiharan CI/Quality yang dimodelkan; ia menolak perubahan
dan bukannya melaksanakan token shell sebagai argumen. Output SKIP/INCOMPLETE pengimbas wajib
tidak dapat menentukan PASS. Profil merekodkan pengecualian luarannya dan tidak menggantikan
bukti liputan dihoskan, matriks ujian, pakej atau pengerahan. Inventori prosa di bawah
ialah rujukan, bukan bukti bahawa gerbang benar-benar telah dijalankan.

Skrip terletak di bawah `scripts/check/` (gerbang dasar) dan `scripts/quality/` (enjin ratchet).
Sumber kebenaran CI ialah `.github/workflows/ci.yml`.

### Kesihatan dokumentasi asas yang diterbitkan

`.github/workflows/i18n-base-health.yml` memantau kesihatan dokumentasi selepas push terpilih
ke `main` dan `release/v*`, serta apabila dicetuskan secara manual. Penapisnya merangkumi dokumentasi,
Markdown akar, `llm.txt`, keadaan/konfigurasi terjemahan dan alat i18n yang berkaitan.
Tugas tunggal `Published base documentation health` menggunakan Ubuntu yang dihoskan dan had masa
lima minit. Tugas ini melakukan pengesahan baca sahaja dan menulis resit diagnostik tanpa
pemasangan kebergantungan, terjemahan atau penggunaan keadaan.

`scripts/i18n/check-base-health.mjs` mensyaratkan tiada ketakselarasan hash sumber, sasaran
yang tiada, hash sasaran, terjemahan lapuk dan cache bahagian. Ia turut mengesahkan skop dokumen
teras/lokal semasa serta asal usulnya yang direkodkan. Konteks yang tidak sah, liputan yang tidak
lengkap atau pemeriksa yang terganggu menghasilkan `INCOMPLETE`; hanyutan yang disahkan menghasilkan
`FAIL`. Kedua-duanya mengembalikan status keluar gagal. Resit tersebut terikat pada SHA checkout,
aliran kerja, pelaksanaan dan percubaan, serta disimpan sebagai
`i18n-base-health-<sha>-<run>-<attempt>`.

Ini merupakan pemerhatian bebas terhadap asas yang diterbitkan. Ia tidak menambahkan peristiwa PR
atau kumpulan gabungan, semakan PR wajib, alias npm atau ahli profil imbasan statik.
Dasar PR pembezaan sedia ada dan klasifikasi nasihat pemeriksa asas kekal berasingan.
Muat naik yang berjaya tidak boleh menukar hasil kesihatan yang gagal kepada PASS.

### Laluan pantas PR keluaran (`quality.yml`)

`.github/workflows/quality.yml` melengkapkan CI bagi PR utama/keluaran, tolakan ke `main`,
penghantaran dan kumpulan gabungan. PR menggunakan semakan pantas yang ditapis mengikut laluan. Binaan pendua
yang dilumpuhkan secara kekal telah dialih keluar; semakan binaan/pakej/permulaan sebenar kekal dalam CI.

| Tugas                                            | Skop                                                                                                                                                                                                         | Menyekat          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `Docs Gates (fast-path)`                         | PR dokumentasi/kod; rujukan dokumentasi API dan docs-all                                                                                                                                                     | Ya                |
| `Fast Quality Gates`                             | PR kod; semakan statik, semakan jenis, semakan jenis papan pemuka, ujian unit yang terjejas                                                                                                                  | Ya                |
| `Forgotten sibling tests`                        | PR kod; modul yang diubah dijejak kepada pengguna statik dan ujian setara calon; laluan barrel dan import dinamik dilaporkan sebagai diagnostik nasihat, dengan pengecualian senarai dibenarkan yang dirujuk | **Nasihat**       |
| `Vitest (fast-path)`                             | PR kod; suit vitest pantas                                                                                                                                                                                   | Ya                |
| `Unit Tests fast-path`                           | PR kod; suit unit 4 serpihan                                                                                                                                                                                 | Ya                |
| `No new ESLint warnings`                         | PR kod; kawalan lint yang mengambil kira penyekatan                                                                                                                                                          | Ya, termasuk fork |
| `Merge integrity (changelog + generated skills)` | PR bukan draf; penyegerakan log perubahan dan kemahiran yang dijana                                                                                                                                          | Ya, termasuk fork |

#### Laporan ujian setara yang terlupa

`npm run check:forgotten-sibling-tests` menggunakan semula penyelesai import di sebalik peta impak ujian.
Bagi setiap modul pengeluaran yang diubah, ia melaporkan rantaian deterministik
`changed module/symbol -> static consumer -> candidate sibling test` apabila ujian calon
tiada dalam perbezaan pull request. Ringkasan Markdown dan hasil JSON dikekalkan sebagai
artifak aliran kerja `forgotten-sibling-tests` untuk penentukuran sebelum sebarang pelaksanaan sekatan.

Eksport semula barrel dan import dinamik hanyalah diagnostik penyelesaian; kedua-duanya tidak pernah menghasilkan
dapatan yang menyekat. Pengecualian yang telah disemak terdapat dalam
`config/quality/forgotten-sibling-allowlist.json`. Setiap entri mesti menyatakan pengguna dan ujian
calon, memberikan rasional khusus, serta memautkan isu atau pull request GitHub. Entri yang tidak sah menyebabkan
kegagalan secara tertutup. Pengecualian tidak boleh menyekat ujian calon yang dipadamkan atau perbezaan yang menambahkan `.skip`/`.todo`;
pelemahan penegasan dan penyamaran lain kekal di bawah kawalan gerbang
`check:test-masking` yang menyekat secara bebas.

### Tugas: `lint`

Dijalankan pada setiap PR ke `main`. Menyekat penggabungan jika gagal.

| Skrip (`npm run ...`)             | Mengesahkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Menyekat                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Versi Node.js berada dalam julat yang disokong                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                      |
| `check:test-tla-order`            | Tiada fail `node:test` di bawah `tests/unit` yang mendaftarkan ujian, mencapai `await` peringkat atas, kemudian mendaftarkan lebih banyak ujian (#18045; ratchet: `test-tla-order-allowlist.json` hanya boleh mengecil)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                      |
| `check:cycles`                    | Import kitaran merentas seluruh `src/` + `open-sse/` (berasaskan AST, `paths` tsconfig diselesaikan). Perintah asas keluar dengan kod 1 apabila sebarang kitaran wujud (gagal-tertutup sejak #15281) dan menyenaraikan SCC. `check:cycles:ratchet` (yang dijalankan oleh CI) menyekat apabila kiraan melebihi had maksimum `metrics.cycles` dalam `quality-baseline.json` — kini 14, `direction: down`, maka nilainya hanya boleh menurun (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya (ratchet)                            |
| `check:boundary`                  | Gandingan `open-sse → src`: import unik antara fail daripada enjin ke dalam aplikasi (`scripts/quality/measure-boundary.mjs`; senarai pinggir ialah tunggakan pemulihan pemisahan teras/modul v4). Perintah asas = laporan nasihat (sama seperti `quality:boundary`). `check:boundary:ratchet` (yang dijalankan oleh CI, juga dalam gelung ratchet gerbang pantas `quality.yml`) menyekat apabila kiraan melebihi had maksimum `metrics.boundaryOpenSseToSrc` dalam `quality-baseline.json` — dimulakan pada nilai ukuran 771, `direction: down`; `--update` hanya menurunkannya; relatif kepada asas pada PR (`--base-ref`, lihat di bawah)                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya (ratchet)                            |
| `check:route-validation:t06`      | Skema Zod hadir pada semua laluan (dasar Tahap 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                      |
| `check:any-budget:t11`            | Bilangan `@ts-expect-error // any` tidak melebihi belanjawan (catraca Tahap 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                      |
| `check:provider-consistency`      | Setiap penyedia dalam `providers.ts` mempunyai entri yang sepadan dalam `providerRegistry.ts` (dan sebaliknya, dalam senarai dibenarkan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:model-lifecycle`           | Tiga jadual penghalaan yang diselenggara secara manual kekal konsisten dengan petikan kitar hayat yang didaftar masuk (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tidak memberikan skor kepada sebarang id yang telah ditamatkan dan masih boleh dihalakan oleh `REGISTRY`; setiap sasaran `BUILT_IN_ALIASES` terdapat dalam `REGISTRY` dan tiada dalam petikan id yang telah ditamatkan; setiap id yang telah ditamatkan tetapi masih dalam `REGISTRY` dimajukan atau disenaraikan dalam `allowedRetiredInCatalog`; dan tiada sumber atau sasaran `DEFAULT_DEGRADATION_MAP` ditandakan sebagai telah ditamatkan dalam petikan tersebut. Ini tidak membuktikan bahawa sesuatu model sedang disediakan oleh huluan aktif pada masa ini. Luar talian — dibandingkan dengan `config/quality/model-lifecycle.json`, yang disegar semula secara manual menggunakan `npm run quality:refresh-model-lifecycle` (rangkaian; tidak disepadukan ke dalam CI). `allowedRetiredInCatalog` ialah mekanisme pengetatan beransur-ansur: tambahkan entri hanya dengan isu penjejakan. | Ya                                      |
| `check:fetch-targets`             | Setiap `fetch("/api/...")` dalam `src/` sebelah klien merujuk kepada `route.ts` yang sebenar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya                                      |
| `check:deps`                      | Semua kebergantungan yang boleh dipasang melalui `npm install` merentas setiap `package.json` dalam repositori terdapat dalam `dependency-allowlist.json`; pakej baharu yang tidak dipinkan atau berpotensi slopsquat ditandai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                      |
| `audit:deps`                      | Audit npm bagi kesemua lima fail kunci bebas (akar, Electron, pemalam OpenCode v1/v2 dan penyedia). Nasihat kritikal menyekat; nasihat berkeparahan tinggi kekal sebagai amaran yang boleh dilihat. Audit yang tiada/gagal dianggap TIDAK LENGKAP dan menyekat; cincangan kunci serta laporan bagi setiap skop dikekalkan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                      |
| `check:lockfile`                  | Integriti `package-lock.json` — pendaftaran https, cincangan integriti, tiada penggantian hos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                      |
| `check:licenses`                  | Senarai izin lesen SPDX untuk kebergantungan pengeluaran                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:tracked-artifacts`         | Tiada artifak binaan / pautan simbolik `node_modules` yang dikomit (turut dijalankan dalam prakomit husky; pratolak sengaja diringankan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                      |
| `check:ai-attribution`            | Tiada treler `Co-Authored-By` AI/bot atau pengaki penjanaan AI dalam komit, tajuk atau isi PR — Peraturan Tegas #16 (dalam gelung gerbang pantas `quality.yml` untuk PR→`release/**` — membaca muatan peristiwa, tidak melakukan apa-apa di luar PR — dan langkah khusus PR dalam lint `ci.yml` untuk PR→`main`; juga cangkuk `commit-msg` husky; pengarang bersama manusia dibenarkan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Setiap pengecualian Vitest menyatakan isu penjejakan dan terdapat dalam `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:file-size`                 | Fail sumber (`.ts`/`.tsx` dalam `src/`, `open-sse/`, `electron/`, `bin/`) kekal dalam had `cap` dan fail ujian (`*.test.ts(x)`) dalam had `testCap`; fail yang dibekukan dalam `file-size-baseline.json` (`frozen` / `testFrozen`) tidak boleh berkembang melebihi saiz yang direkodkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                      |
| `check:error-helper`              | Respons ralat dalam pelaksana/pengendali menggunakan `buildErrorBody()` / `sanitizeErrorMessage()` (Peraturan Tegas #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:migration-numbering`       | Fail SQL migrasi dinomborkan secara berurutan, tanpa jurang atau pendua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                      |
| `check:public-creds`              | Tiada OAuth `client_id`/`client_secret` literal atau kunci Firebase Web di luar `publicCreds.ts` (Peraturan Tegas #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ya                                      |
| `check:db-rules`                  | Tiada SQL mentah di luar modul `src/lib/db/`; tiada import barrel daripada `localDb.ts` (Peraturan Tegas #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                      |
| `check:known-symbols`             | Pelaksana penyedia, strategi penghalaan dan penterjemah yang didaftarkan dalam jadual penghantaran masing-masing sepadan dengan fail pada cakera — tiada simbol yatim atau tidak diisytiharkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                      |
| `check:route-guard-membership`    | Setiap laluan yang mewujudkan proses anak diklasifikasikan oleh `isLocalOnlyPath()` (Peraturan Tegas #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                      |
| `check:test-discovery`            | Setiap fail `*.test.ts` / `*.spec.ts` dalam repo dikumpulkan oleh sekurang-kurangnya satu pelaksana ujian (ratchet: senarai yatim dalam `test-discovery-baseline.json` hanya boleh berkurang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                      |
| `check:agent-skills-sync`         | Artifak kemahiran ejen yang dijana sepadan dengan katalog sumbernya (tiada penyimpangan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Logo/aset penyedia mempunyai entri asal-usul yang direkodkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | Fail konfigurasi JSON boleh dihuraikan dan mematuhi peraturan lint repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Pengkompilan TypeScript tanpa ralat (amaran nasihat sahaja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                      |
| `typecheck:noimplicit:core`       | `noImplicitAny` yang ketat — berpandangan ke hadapan; banyak tapak panggilan sedia ada masih memerlukan anotasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Nasihat** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` yang diskopkan kepada `src/app/(dashboard)/**` (#7033) — senarai benarkan terpilih 27 fail milik `typecheck:core` tidak merangkumi sebarang TSX papan pemuka, dan `next build` juga tidak pernah menyemak jenisnya (`next.config.mjs` menetapkan `ignoreBuildErrors: true`), maka regresi pengecam yatim di situ (#6625/#6909) tidak dapat dikesan oleh CI. Perbezaan dibandingkan dengan garis dasar kiraan mengikut fail/mengikut kod TS yang dibekukan (`config/quality/dashboard-typecheck-baseline.json`, corak penguatkuasaan lapuk yang sama seperti `check:known-symbols`) — hanya ralat BAHARU yang melebihi kiraan garis dasar akan menggagalkan get; turunkan ambang secara beransur-ansur dengan `--update` apabila ralat sedia ada dibetulkan.                                                                                                                                                                                                                                                                                                      | Ya                                      |

### Tugas: `quality-gate`

Dijalankan selepas `test-coverage`. Menyekat penggabungan jika gagal.

| Skrip                        | Mengesahkan                                                                                                                                                                                                | Menyekat                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `quality:collect`            | Menghasilkan `quality-metrics.json` (kiraan amaran ESLint, liputan daripada laporan serpihan yang digabungkan)                                                                                             | Ya (huluan kepada mekanisme ambang) |
| `quality:ratchet`            | Setiap metrik dalam `quality-baseline.json` tidak mengalami regresi (amaran ESLint ≤ garis dasar; liputan ≥ garis dasar)                                                                                   | Ya                                  |
| `check:duplication`          | Penduaan kod (jscpd@4) tidak melebihi garis dasar dalam `quality-baseline.json`                                                                                                                            | Ya                                  |
| `check:complexity`           | Kerumitan siklomatik peringkat fail tidak melebihi had (ESLint teras `complexity` + `max-lines-per-function`)                                                                                              | Ya                                  |
| `check:cognitive-complexity` | Mekanisme ambang kerumitan kognitif (`eslint-plugin-sonarjs`) — laluan ESLint berasingan; CI menjalankan kedua-duanya secara tergabung sebagai satu langkah `check:complexity-ratchets`                    | Ya                                  |
| `check:dead-code`            | Mekanisme ambang eksport / fail yang tidak digunakan (knip) tidak mengalami regresi berbanding garis dasar                                                                                                 | Ya                                  |
| `check:compression-budget`   | Bajet penanda aras pemampatan — tahap minimum penjimatan token bagi setiap enjin tidak boleh mengalami regresi                                                                                             | Ya                                  |
| `check:type-coverage`        | Mekanisme ambang peratusan berkod jenis (`type-coverage`) tidak mengalami regresi; sebahagian besarnya merangkumi `typecheck:noimplicit:core`                                                              | Ya                                  |
| `check:codeql-ratchet`       | Kiraan amaran CodeQL terbuka tidak mengalami regresi (dibaca melalui `gh api`; dilangkau dengan selamat tanpa token) — kekerapan muat semula dan pencetus manual: lihat "Mekanisme ambang CodeQL" di bawah | Ya                                  |

### Tugas: `quality-extended`

Tugas ini menyekat calon yang berkenaan. Saiz berkas, penemuan rahsia, penemuan
kerentanan, penemuan aliran kerja dan perubahan OpenAPI diperiksa dengan mekanisme
ambang yang diwajibkan. Diagnostik kebergantungan kitaran kekal sebagai nasihat.
Pemasangan pengimbas diwajibkan: `scripts/ci/install-quality-scanners.sh`
menyediakan versi yang ditetapkan dan menyebarkan kegagalan pemasangan. Alat yang
hilang, laporan yang tidak sah atau garis dasar yang hilang menyebabkan get
pengimbas yang diwajibkan kekal TIDAK LENGKAP.

| Skrip                    | Mengesahkan                                                                                                                                                                                                                   | Menyekat                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Tiada kebergantungan kitaran (dpdm)                                                                                                                                                                                           | **Nasihat**                                              |
| `check:bundle-size`      | Saiz berkas tidak melebihi had; ukuran yang tidak tersedia menyebabkan kegagalan                                                                                                                                              | **Menyekat dengan --ratchet**                            |
| `check:secrets`          | Penemuan Gitleaks tidak merosot; imbasan wajib menolak alat/sumber/garis dasar yang tiada, imbasan yang gagal dan laporan yang tidak sah                                                                                      | **Menyekat dengan --ratchet**                            |
| `check:vuln-ratchet`     | Kerentanan kebergantungan tidak merosot; imbasan wajib menolak alat yang tiada, laporan yang tidak sah atau garis dasar yang tiada                                                                                            | **Menyekat dengan --ratchet**                            |
| `check:workflows`        | Lint aliran kerja (actionlint + zizmor); pengimbas yang tiada/rosak, laporan yang tidak sah atau garis dasar ratchet yang tiada gagal sebagai INCOMPLETE. Penemuan yang sah mengikut dasar ketat/nasihat/ratchet yang dipilih | Pelaksanaan diperlukan; ratchet zizmor menyekat dalam CI |
| `check:openapi-breaking` | Kontrak API awam berbanding komit peristiwa yang disematkan (asas gabungan PR, keadaan sebelum push, asas kumpulan gabungan; checkout berjadual/manual bagi induk pertama); ukuran wajib gagal secara tertutup                | **Menyekat dengan --ratchet**                            |

### Tugas: `docs-sync-strict`

Bagi pull request ke `main` atau `release/**`, tugas ini hanya berjalan untuk calon yang bukan draf (atau berada dalam baris gilir dipercayai) dan dikelaskan sebagai perubahan dokumentasi atau kod. Ia juga berjalan pada peristiwa CI bukan PR; pencetus push workflow ini meliputi `main` sahaja, bukan `release/**`. Langkah yang tamat dengan kod keluar bukan sifar menyekat tugas; penemuan untuk laporan sahaja dan pengecualian yang didokumenkan di bawah tidak menyekatnya.

| Skrip                          | Mengesahkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Menyekat                                                                                                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Gerbang meta yang menjalankan 7 subgerbang di bawah secara berurutan                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                                                                                                                                                   |
| ↳ `check:docs-sync`            | Ketekalan versi pakej/OpenAPI/CHANGELOG, salinan cermin `llm.txt` yang tepat, invarian bahagian/saiz CHANGELOG terjemahan dan ketiadaan dokumen pendua yang telah digantikan                                                                                                                                                                                                                                                                                                                                                             | Ya                                                                                                                                                                   |
| ↳ `check:docs-frontmatter`     | Halaman dokumentasi yang dikompil mempunyai tajuk frontmatter yang sah                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ya                                                                                                                                                                   |
| ↳ `check:docs-counts`          | Invarian kiraan berkeyakinan tinggi adalah ketat; semakan heuristik bilangan fail hanya memberi amaran kecuali skrip menerima `--strict` (gerbang meta CI tidak menghantarnya)                                                                                                                                                                                                                                                                                                                                                           | Tahap ketat menyekat; tahap lembut bersifat nasihat                                                                                                                  |
| ↳ `check:env-doc-sync`         | Bacaan pemboleh ubah persekitaran dalam kod sumber, `.env.example` dan `docs/reference/ENVIRONMENT.md` sepadan selepas senarai pengecualian ignore, doc-only dan env-only yang jelas digunakan                                                                                                                                                                                                                                                                                                                                           | Ya, di luar senarai pengecualian yang didokumenkan                                                                                                                   |
| ↳ `check:deprecated-versions`  | Melaporkan versi yang mungkin lapuk di luar konteks sejarah yang selamat dan tarikh kemas kini yang lapuk, tidak termasuk dokumen yang diabaikan                                                                                                                                                                                                                                                                                                                                                                                         | Nasihat dalam konfigurasi CI semasa (`--strict` tidak dihantar)                                                                                                      |
| ↳ `check:doc-links`            | Pautan markdown dalaman dalam dokumentasi merujuk kepada fail sebenar (bentuk `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                                                                                                                                                   |
| ↳ `check:fabricated-docs`      | Laluan, pemboleh ubah persekitaran, perintah CLI, nama hook dan laluan fail yang dinyatakan dalam dokumentasi wujud dalam pangkalan kod. Gerbang keras melalui `--strict`; gagal lembut tanpa bendera.                                                                                                                                                                                                                                                                                                                                   | Ya (melalui `--strict` dalam CI)                                                                                                                                     |
| `check:cli-i18n`               | Kekunci CLI `t()` yang digunakan wujud dalam `en`; `pt-BR` mengekalkan semua bahagian peringkat teratas; `zh-CN` dan `zh-TW` mengandungi setiap kekunci daripada `en`                                                                                                                                                                                                                                                                                                                                                                    | Ya                                                                                                                                                                   |
| `check:openapi-coverage`       | Spesifikasi OpenAPI merangkumi sekurang-kurangnya paras minimum laluan sebenar yang ditetapkan secara ratchet                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                                                                                                                                                   |
| `check:openapi-security-tiers` | Anotasi `x-loopback-only`/`x-always-protected` yang diisytiharkan mesti disokong oleh `routeGuard.ts`; ralat penghurai dan ketidakpadanan semakan ke hadapan menyekat. Semakan songsang bagi `x-loopback-only` yang tiada di bawah awalan khusus setempat memberi amaran, dan laluan yang ditakrifkan melalui pola sahaja dikecualikan daripada semakan songsang itu.                                                                                                                                                                    | Semakan penghurai/ke hadapan menyekat; semakan songsang bersifat nasihat                                                                                             |
| `check:openapi-routes`         | Setiap laluan `/api...` dalam `openapi.yaml` sepadan dengan laluan sebenar tanpa bergantung pada nama parameter selepas senarai pengecualian berjustifikasi `KNOWN_STALE_SPEC` digunakan; entri senarai yang lapuk turut menyebabkan kegagalan                                                                                                                                                                                                                                                                                           | Ya                                                                                                                                                                   |
| `check:docs-symbols`           | Rujukan URL dalaman `/api/...` dalam dokumen kanonik bukan cermin sepadan dengan laluan sebenar atau keluarga laluan; rujukan proksi/upstream/pemegang tempat/fail dan entri berjustifikasi `KNOWN_STALE_DOC_REFS` dikecualikan, manakala entri senarai pengecualian lapuk menyebabkan kegagalan                                                                                                                                                                                                                                         | Ya                                                                                                                                                                   |
| `i18n translation drift`       | Menyemak hash sumber/sasaran dokumen teras dan asal usul terjemahan. Perbandingan PR hanya membenarkan kegagalan warisan yang benar-benar sama; ketidakselarasan baharu atau belum disahkan pada sumber, sasaran yang hilang, hash sasaran, terjemahan lapuk atau cache bahagian menyekat. Di luar perbandingan PR, kegagalan sumber/sasaran yang hilang/hash sasaran menyekat, manakala terjemahan lapuk dan cache bahagian yang tidak selaras kekal sebagai amaran sahaja. Ketiadaan cache bahagian dalam format lama bukan kegagalan. | Penyimpangan PR baharu/belum disahkan menyekat; penyimpangan warisan yang benar-benar sama ialah amaran sahaja; peraturan di luar PR bergantung pada jenis kegagalan |

### Tugas: `i18n-ui-coverage`

| Skrip                              | Mengesahkan                                                                                                                                                                                                                 | Menyekat     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (sebaris) | Liputan kunci i18n UI ialah ≥ 65%                                                                                                                                                                                           | Ya           |
| `check-ui-value-drift` (sebaris)   | **Nilai** bahasa Inggeris yang ditulis semula tidak meninggalkan terjemahan lapuk                                                                                                                                           | Ya           |
| `check-new-key-coverage` (sebaris) | Kunci bahasa Inggeris yang **baharu** diterjemahkan dalam setiap lokal — penanda `__MISSING__:` ditolak                                                                                                                     | Ya           |
| `check-translation-ratio`          | Nisbah terjemahan sebenar bagi setiap lokal (sama dengan bahasa Inggeris / pemegang tempat / daun yang tiada di luar senarai dibenarkan) tidak boleh melebihi `config/quality/i18n-translation-baseline.json` + kelonggaran | **Menyekat** |

Memerlukan `fetch-depth: 0` — get nilai hanyutan membandingkan perbezaan `en.json` dengan asas penggabungan.

#### `check-ui-value-drift` — get terjemahan lapuk

Mengesan satu regresi i18n yang secara struktur tidak dapat dilihat oleh get lain: nilai bahasa Inggeris
ditulis semula dan terjemahan yang diperoleh daripada bahasa Inggeris _sebelumnya_ kekal, menyebabkan
pengguna bukan berbahasa Inggeris terus membaca teks yang kedengaran meyakinkan tetapi kini salah.

Perkara ini benar-benar pernah dikeluarkan. `oauthModal.googleOAuthWarning` telah ditulis semula apabila
pembantu log masuk Antigravity diperkenalkan (#5203); **39 daripada 43 lokal** mengekalkan teks yang
mengarahkan pengendali untuk "menyalin URL penuh dan menampalnya di bawah" — aliran yang tidak dapat
diselesaikan untuk penyedia tersebut. Perkara ini tidak disedari sehingga #8463 kerana:

- `sync-ui-keys` hanya mengisi semula kunci yang **tiada**, bukan kunci yang **lapuk**;
- `check-ui-keys-coverage` mengira _kehadiran_ kunci, jadi terjemahan lapuk dikira sebagai diliputi;
- `check-translation-drift` menjejaki cerminan dokumentasi `docs/i18n/<locale>/**.md` —
  ia tidak pernah membaca `src/i18n/messages/*.json`. Menyekat dalam tugas `docs-sync-strict` sejak
  penyegerakan semula 2026-09: edit dokumen teras → `npm run i18n:run -- --files=<doc>` (peringkat bahagian, ringan).

**Peka terhadap perbezaan, bukan disokong garis dasar.** Ia membandingkan `en.json` pada asas penggabungan
dengan pepohon kerja; bagi setiap kunci yang nilai bahasa Inggerisnya berubah, mana-mana lokal yang masih
menyimpan terjemahan yang tidak disentuh dianggap lapuk. Ini sengaja **membekukan hutang sedia ada** —
perbezaan tidak dapat mendedahkan bahasa Inggeris lama yang menjadi sumber terjemahan lama, jadi get hanya
menilai perkara yang disentuh oleh perubahan semasa. Alternatifnya (garis dasar cincangan bagi setiap kunci)
akan memerlukan fail terjana bersaiz ~600 KB, 3× lebih besar daripada garis dasar sedia ada yang terbesar,
dan berubah pada setiap PR i18n.

Dua cara untuk memenuhinya:

1. kemas kini terjemahan yang terjejas, atau
2. tetapkannya kepada `__MISSING__:<new english>` — masa jalan kemudiannya menyajikan bahasa Inggeris yang
   telah dibetulkan (`src/i18n/request.ts::deepMergeFallback`, #7258) dan kunci tersebut dibariskan untuk diterjemahkan.

Jika **makna** rentetan berubah, utamakan **penamaan semula kunci**: kunci baharu tidak boleh mewarisi
terjemahan lapuk. Itulah corak yang digunakan oleh #8463.

```bash
npm run i18n:check-value-drift          # ketat (yang dijalankan oleh CI)
npm run i18n:check-value-drift:warn     # laporan sahaja
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Get hanyutan nilai dan kunci baharu berkongsi satu perbandingan tidak boleh ubah daripada
`scripts/i18n/resolve-ui-diff-base.mjs`. Aliran kerja menghantar SHA asas, hujung asas dan
calon yang sama kepada kedua-dua semakan. Pelaksanaan PR/penyasaran semula asas, push dan kumpulan gabungan menggunakan konteks
peristiwa masing-masing. Penghantaran cawangan calon memerlukan PR terbuka yang sepadan dengan tepat atau input
`i18n_base_sha` yang dinyatakan secara eksplisit. Penghantaran atau pemerhatian berjadual terhadap `main` atau `release/vX.Y.Z`
tanpa input tersebut membandingkan komit terakhir dengan induk pertamanya; ini bukan audit terhadap
semua hutang terjemahan yang diwarisi. Pelaksanaan setempat memerlukan asas perbandingan yang dinyatakan secara eksplisit,
contohnya perintah `BASE_REF` di atas.

Konteks perbandingan yang tiada atau taksa, katalog wajib yang tidak boleh dibaca atau tidak sah, dan
calon yang berubah menghasilkan `INCOMPLETE` dengan kod keluar **2**, termasuk dalam mod amaran.
Pembacaan katalog menggunakan `scripts/i18n/read-ui-catalog.mjs`; kegagalan pembacaan tidak digantikan
dengan objek kosong. Asas yang tidak tersedia mahupun input yang tidak lengkap tidak menghasilkan PASS.

### Tugas: `i18n`

Matriks pengesahan i18n penuh (satu tugas bagi setiap lokal). Keseluruhan tugas bersifat nasihat.

| Skrip                           | Mengesahkan                              | Menyekat                                                   |
| ------------------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Kelengkapan terjemahan bagi setiap lokal | **Nasihat** (`continue-on-error: true` pada seluruh tugas) |

### Tugas: `pr-test-policy`

Dijalankan pada permintaan tarik sahaja.

| Skrip                  | Mengesahkan                                                                                                                                                      | Menyekat |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR yang mengubah kod pengeluaran dalam `src/`, `open-sse/`, `electron/`, atau `bin/` mesti menyertakan atau mengemas kini ujian (Peraturan Tegas #8)             | Ya       |
| `check:test-masking`   | Fail ujian yang diubah tidak mengurangkan bilangan bersih penegasan atau menambahkan tautologi `assert.ok(true)`                                                 | Ya       |
| `check:pr-evidence`    | Kandungan PR memetik bukti ujian/VPS untuk perubahan tersebut (mengautomatikkan Peraturan Tegas #18 dengan grep pada prosa PR — rapuh, lihat Senarai Tertunggak) | Ya       |

### Tugas: `test-vitest`

Memerlukan tugas pengelasan `changes`. Pecahan matriks yang berkenaan menyekat penggabungan jika gagal.

| Suit             | Mengesahkan                                                 | Menyekat                                                                                                                       |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Pelayan MCP (110 alat), autoCombo, cache — pelaksana vitest | Ya                                                                                                                             |
| `test:vitest:ui` | Ujian komponen UI — pelaksana vitest                        | **Menyekat** — kegagalan sedia ada dikecualikan secara eksplisit dalam `vitest.config.ts`; kegagalan baharu menggagalkan tugas |

### Aliran kerja setiap malam (dijadualkan, bersifat nasihat)

Aliran kerja ini dijalankan mengikut jadual cron (dan `workflow_dispatch`), tidak pernah pada PR. Semuanya bersifat nasihat.

| Aliran kerja           | Mengesahkan                                                                                                                                                                                   | Menyekat             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `nightly-property`     | Ujian sifat fast-check dengan benih rawak + bilangan pelaksanaan yang tinggi                                                                                                                  | **Bersifat nasihat** |
| `nightly-resilience`   | Had pertumbuhan heap, suntikan kegagalan chaos, beban/rendaman k6                                                                                                                             | **Bersifat nasihat** |
| `nightly-llm-security` | Perlindungan suntikan promptfoo (mod sekat) + probe garak (dilangkau tanpa rahsia penyedia)                                                                                                   | **Bersifat nasihat** |
| `nightly-schemathesis` | Pengujian fuzz kontrak OpenAPI (schemathesis) terhadap OmniRoute aktif menggunakan `docs/openapi.yaml` — mendedahkan pelanggaran spesifikasi / ralat 500 yang tidak dikendalikan (Fasa 8 B.4) | **Bersifat nasihat** |
| `nightly-mutation`     | Skor ujian mutasi Stryker pada laluan unit pantas — mutan yang bertahan mendedahkan penegasan yang lemah                                                                                      | **Bersifat nasihat** |
| `nightly-compat`       | Matriks keserasian enjin Node merentas julat `engines.node` yang disokong                                                                                                                     | **Bersifat nasihat** |

Garis dasar prestasi (heap, TTFB, masa binaan) direkodkan, bukan disekat: lihat [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fasa kelajuan (2026-08-30 → v4.0 LTS): setiap garis dasar dilonggarkan sebanyak 20%

Keputusan pemilik (2026-08-30): sehingga pemodularan v4.0, kelajuan penghantaran lebih penting
daripada mengekalkan had hutang. Setiap garis dasar ratchet **berangka** telah dilonggarkan sebanyak 20% dalam satu
proses yang boleh diaudit, dan fasa tersebut diisytiharkan dalam `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Perkara yang berubah                                                                                                                                                                                                            | Lokasi                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — kiraan lebih rendah lebih baik ×1.2, peratusan lebih tinggi lebih baik ÷1.2 (had minimum liputan 60 dikekalkan, `eslintErrors` kekal 0, `eslintWarnings` 0 → 20% daripada kiraan penindasan yang dibekukan) | `quality-baseline.json` (nota `_relax_velocity_2026_08_30` menyenaraikan setiap nilai sebelum → selepas) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                | `complexity-baseline.json`, `duplication-baseline.json`                                                  |
| `cap`, `testCap`, setiap had baris `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                           | `file-size-baseline.json`                                                                                |
| kiraan setiap fail / setiap kod TS ×1.2                                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`   |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                             | `scripts/check/check-openapi-coverage.mjs`                                                               |
| `--require-tighten` menjadi nasihat apabila `_policy.requireTighten === false`                                                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                              |
| `bank-ratchet-shrinks` setiap malam dijeda (ia akan merekodkan pengecilan yang diukur dan membatalkan ruang lebihan)                                                                                                            | `.github/workflows/nightly-release-green.yml`                                                            |

Senarai yang dibenarkan (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **bukan** belanjawan dan tidak diubah. Gerbang dasar lulus/gagal (rahsia, peraturan SQL,
kontrak dokumen/persekitaran, kesetaraan i18n, ujian unit) tidak berubah — ujian merah masih merupakan ujian merah.

**Peralatan**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — pelonggaran
  sekali sahaja (`scripts/quality/relax-baselines.mjs`); enggan dijalankan dua kali dengan
  nota yang sama.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mengukur setiap gerbang berangka dengan cara yang sama seperti CI dan memaparkan ruang lebihan yang tinggal bagi setiap gerbang
  (`scripts/quality/baseline-headroom.mjs`). Tugas `baseline-headroom` setiap malam menerbitkan
  jadual dalam ringkasan pelaksanaan aliran kerja dan memuat naik laporan JSON/Markdown sebagai
  `baseline-headroom-<run_id>`, yang disimpan selama 90 hari. Baris amaran dan kritikal mengenal pasti gerbang
  yang berada dalam lingkungan 10% daripada hadnya atau telah melebihinya. Semak laporan ini sebagai amaran awal bahawa
  belanjawan sedang digunakan; periksa nota `_rebaseline_*` bagi gerbang yang berkenaan. Tugas ini tidak lagi
  mencipta atau mengemas kini isu kekal; #12149 mengekalkan sejarah laporan terdahulu.

**Mod kod baharu (Clean-as-You-Code) — sejak 2026-08-30, laluan pantas PR sahaja**

Pada peristiwa `pull_request`, `quality.yml` menghantar `--base-ref <PR base SHA>` kepada `check:file-size`,
`check:complexity-ratchets` dan `check:dead-code`. Bagi `check:complexity-ratchets` dan
`check:dead-code`, gerbang membandingkan HEAD dengan merge-base **yang dihadkan kepada fail yang
diubah oleh PR** (`scripts/check/newCodeMode.mjs`: merge-base diwujudkan dalam `git worktree`
sementara, ESLint/knip dijalankan di situ dan pada HEAD, kemudian kiraan setiap fail dibandingkan):

- **menyekat** — PR menambahkan pelanggaran siklomatik/kognitif atau eksport mati dalam fail yang diubahnya
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` dalam log);
- **nasihat** — jumlah global berbanding garis dasar yang dibekukan. Hanyutan yang diwarisi tidak sekali-kali menandakan
  PR yang tidak bersalah sebagai merah; hanyutan itu dijejaki untuk pembaikan semasa penyelarasan keluaran dan dipantau oleh
  tugas ruang lebihan.

`check:file-size` menggunakan rujukan asas mengikut kaedahnya sendiri (`scripts/check/check-file-size.mjs`, #8522):
ia memeriksa setiap fail sumber dan ujian dalam pepohon, membaca kiraan baris setiap fail pada asas PR
dengan `git show`, dan menggagalkan fail hanya apabila saiznya meningkat melepasi nilai yang lebih besar antara had garis dasarnya
(`frozen` / `testFrozen`, atau `cap` / `testCap` bagi fail di luar garis dasar) dengan saiz
asasnya. Oleh itu, fail yang telah mengalami hanyutan pada asas tidak akan menyebabkan PR yang tidak bersalah menjadi merah.

`check:boundary:ratchet` menggunakan peraturan yang sama pada nombor tunggalnya
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): pada peristiwa PR, kedua-dua
gerbang pantas `quality.yml` dan tugas lint `ci.yml` menghantar SHA asas PR, komit asas diukur
daripada eksport `git archive`, dan PR gagal hanya apabila kiraan pinggir `open-sse → src`
melebihi nilai yang lebih besar antara `metrics.boundaryOpenSseToSrc` dengan kiraan pada asas. Hanyutan
asas yang melebihi had dilaporkan (`base drift herdado`) tetapi tidak sekali-kali menyebabkan PR
yang tidak bersalah gagal; push → main mengekalkan had mutlak, dan SHA asas yang tidak dapat
diselesaikan kembali menggunakan had tersebut dengan amaran.

Jalankan `workflow_dispatch`, sapuan hijau keluaran dan tugas ruang lebihan setiap malam tidak
mempunyai asas PR dan mengekalkan perbandingan mutlak (global). Liputan, penduaan dan liputan jenis
kekal global buat masa ini (alat mereka tidak menghasilkan perbezaan per fail dengan kos yang
rendah) — calon untuk menerima layanan yang sama.

**Menutup fasa pada v4.0 (LTS = lebih ketat daripada sebelumnya, bukan "kembali seperti biasa")**

1. Pada tip tulen `release/v4.0.0`: jalankan `npm run quality:headroom --json` untuk rekod, kemudian
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, dan `--update` bagi setiap
   gerbang semakan jenis — setiap garis dasar diturunkan kepada nilai yang diukur.
2. Padamkan `_policy` daripada `quality-baseline.json` (mengaktifkan semula `--require-tighten` dan
   penyimpanan setiap malam), pulihkan `THRESHOLD = 36` (atau lebih tinggi) dalam
   `check-openapi-coverage.mjs`.
3. Ketatkan melangkaui nilai yang diukur apabila pemodularan membuahkan hasil: kembalikan `cap`
   saiz fail kepada 1000 (atau 800), naikkan tahap minimum liputan sebanyak 5, dan tetapkan eksport
   mati kepada 0 untuk pakej yang telah dimodularkan.

## Garis Dasar Ratchet (`quality-baseline.json`)

Enjin ratchet (`scripts/quality/check-quality-ratchet.mjs`) membaca `quality-baseline.json`
dan membandingkannya dengan `quality-metrics.json` yang baru dikumpulkan. Sebarang metrik yang merosot
melebihi epsilonnya akan menyebabkan binaan gagal.

Metrik yang dijejak pada masa ini:

| Metrik                | Arah   | Maksud                                       |
| --------------------- | ------ | -------------------------------------------- |
| `eslintWarnings`      | `down` | Bilangan amaran ESLint tidak boleh meningkat |
| `coverage.statements` | `up`   | Liputan pernyataan tidak boleh menurun       |
| `coverage.lines`      | `up`   | Liputan baris tidak boleh menurun            |
| `coverage.functions`  | `up`   | Liputan fungsi tidak boleh menurun           |
| `coverage.branches`   | `up`   | Liputan cabang tidak boleh menurun           |

Untuk mengemas kini garis dasar selepas peningkatan sebenar:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Bendera `--update` menulis nilai semasa yang diukur ke dalam `quality-baseline.json`.
Komit fail ini bersama-sama perubahan yang meningkatkan metrik tersebut. PR yang meningkatkan
metrik tanpa mengemas kini garis dasar akan dikesan oleh `--require-tighten` (Fasa 6A.5,
menunggu pelaksanaan).

### Ratchet CodeQL: kekerapan penyegaran dan pencetus manual

`check:codeql-ratchet` membaca **keadaan repositori, yang disegarkan mengikut jadual — bukan bagi setiap PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` melaporkan
`state: configured`, `schedule: weekly`: imbasan persediaan lalai GitHub, bukan analisis bagi setiap push.
Akibatnya: selepas PR yang MEMBAIKI amaran digabungkan, ratchet terus membaca
bilangan lama yang lebih tinggi sehingga imbasan berjadual seterusnya dijalankan — maka ia melaporkan regresi
pada setiap PR terbuka, termasuk PR susulan kepada PR pembaikan itu sendiri, sehingga imbasan tersebut dikemas kini.

**Penyegaran manual**: `gh workflow run codeql.yml --ref release/vX.Y.Z` menjalankan semula
analisis dan menerbitkan semula amaran dalam beberapa minit. Baca `.github/workflows/codeql.yml`
terlebih dahulu — pengepalanya menjelaskan bahawa ia hanya menggunakan `workflow_dispatch` **kerana ia bercanggah dengan
"persediaan lalai" GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Mengembalikan pencetus `push`/`pull_request`/
`schedule` memerlukan **tindakan pemilik terlebih dahulu**: Settings → Code security →
CodeQL: Default → Advanced. Jangan tambah pencetus `schedule:` tanpa pertukaran itu — ia
hanya akan menghasilkan pelaksanaan yang gagal.

**Ketatkan garis dasar selepas bilangannya menurun** — `node scripts/check/check-codeql-ratchet.mjs
--update` menulis bilangan baharu yang diukur ke dalam `quality-baseline.json` →
`metrics.codeqlAlerts.value`, supaya ratchet tidak secara senyap membenarkan regresi kembali
kepada had lama. Contoh pelaksanaan (2026-09-02/03): PR #12502 membaiki 7 amaran sebenar
(13 → 6 amaran terbuka yang diukur); PR #12530 mengetatkan garis dasar beku daripada 11 → 6 agar sepadan; baki
6 amaran kemudiannya ditolak dengan justifikasi bagi setiap amaran sehingga menjadi 0 amaran terbuka.

**Penolakan ialah keputusan pengendali (Peraturan Tegas #14)** — jangan sekali-kali menolak amaran CodeQL
tanpa merekodkan justifikasi teknikal dalam ulasan penolakan: `won't fix` untuk
keperluan protokol huluan, `used in tests` untuk lekapan ujian, `false positive`
untuk pensanitasi yang tidak dapat dikesan oleh CodeQL (dahuluan: `docs/security/ERROR_SANITIZATION.md`).

---

## Dasar Percubaan Semula Ujian (WS5.4, v3.8.49)

Percubaan semula ditetapkan bagi setiap runner, bukan secara menyeluruh — percubaan semula menyeluruh menukar regresi sebenar
menjadi kegagalan tidak konsisten yang tidak kelihatan:

| Runner           | Dasar                                                                                                                                                             | Sebab                                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` dalam CI sahaja, dengan `trace: on-first-retry`                                                                                                      | Pemasaan pelayar/rangkaian sememangnya tidak tentu; satu percubaan semula dengan surih menukar kegagalan tidak konsisten menjadi artifak yang boleh didiagnosis |
| Vitest           | TIADA percubaan semula global. Ujian yang terbukti tidak konsisten mendapat percubaan semula eksplisit bagi setiap ujian (kelihatan dalam diff, disemak dalam PR) | Mengekalkan senarai kuarantin dalam repo, tidak sesekali kabur                                                                                                  |
| node:test (unit) | TIADA percubaan semula, sama sekali                                                                                                                               | Ujian unit yang tidak konsisten ialah pepijat dalam ujian — baikinya, jangan jalankannya semula secara rawak                                                    |

SLO sasaran selepas telemetri kegagalan tidak konsisten tersedia (WS5.2/5.3): kadar kegagalan tidak konsisten <1% bagi setiap ujian
(ambang "baiki sekarang"), kadar lulus ≥95% bagi setiap pipeline. Nilai rujukan industri —
tentukur semula berdasarkan ukuran kita sendiri.

## Hanyutan Ratchet Peringkat Keluaran (WS5.5, v3.8.49)

Apabila ratchet (saiz fail, kerumitan, amaran eslint) mengalami regresi pada hujung keluaran TULEN
— iaitu GABUNGAN merge menyebabkannya merosot, dan tiada satu pun PR yang menghasilkan semula
regresi itu pada cabangnya sendiri — pembaikan tersebut menjadi tanggungjawab **kapten keluaran, sekali sahaja, pada
cabang keluaran**: utamakan pengekstrakan/pemfaktoran semula; tetapkan semula garis dasar hanya dengan entri
justifikasi yang didokumenkan. Jangan sesekali memindahkan hanyutan gabungan kepada PR penyumbang, dan jangan sesekali
menetapkan semula garis dasar bagi setiap PR (itu menyembunyikan regresi sebenar). Bezakan dahulu: hasilkan semula
status merah terhadap hujung tulen dalam worktree siasatan sebelum menganggap PR anda menyebabkannya.

## Menyimpan Pengecilan Ratchet — arah menurun (#8584)

Ratchet hanya separuh automatik, dan separuh itu ialah bahagian yang salah. **Menaikkan** had ialah
suntingan JSON manual yang mengambil masa sepuluh saat dan merupakan cara terpantas untuk membuka sekatan PR merah.
**Menurunkan** had memerlukan seseorang menjalankan `--update` dan melakukan commit pada hasilnya — dan sehingga
job `bank-ratchet-shrinks` tersedia, tiada workflow yang menjalankannya. Akibat yang diukur
(2026-07-25): 18 fail beku sudah berada pada atau di bawah had 800 baris bagi fail baharu, dengan yang terburuk
pada 132× (`src/shared/validation/schemas.ts`, 19 baris dengan had 2,523); siling
kerumitan bergerak `1794 → 2169` merentasi ~37 nota penetapan semula garis dasar dengan tepat satu
penurunan (−1); dan "ketatkan melalui `--update` dalam kitaran seterusnya" ditulis 31 kali dan dipatuhi
sekali. Had yang bertahan lebih lama daripada kod yang melayakkannya secara senyap menukar setiap
penguraian yang selesai menjadi kelonggaran pertumbuhan bagi sesiapa yang menyunting fail itu seterusnya.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** melengkapkan kitaran tersebut:

|               |                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Berjalan pada | `schedule` (3×/hari) + `workflow_dispatch` — sengaja **bukan** `push`                                                           |
| Mengukur      | `release/vX.Y.Z` tertinggi, dengan resolusi + pelindung suntikan yang sama seperti `release-green`                              |
| Menulis       | `check:file-size --update` dan `check:complexity-ratchets --update` (kedua-duanya hanya boleh mengecil berdasarkan reka bentuk) |
| Mengesahkan   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                        |
| Menghantar    | satu PR yang sentiasa terkini terhadap cabang keluaran — dikemas kini secara paksa, tidak sesekali menghasilkan spam            |

Penyimpanan dilakukan secara kelompok dan bukannya bagi setiap push kerana ia tiada keperluan kependaman (pengecilan
yang disimpan dalam masa 8 jam boleh diterima), manakala pelaksanaan bagi setiap merge akan membina semula cabang PR berulang kali
semasa kempen merge dan menanggung kos imbasan penuh ESLint setiap kali. Pengesanan kekal dilakukan semasa
push (`release-green`); hanya penyimpanan dilakukan secara kelompok.

### Pengesah keselamatan

Job tersebut menulis pada garis dasar tanpa pengawasan, jadi `verify-ratchet-bank.mjs` memastikan
tindakan itu boleh diterima. Ia membandingkan perbezaan pepohon selepas `--update` dengan `HEAD` dan **menghentikan job
sebelum sebarang commit wujud** — tanpa membuka PR — melainkan setiap perubahan ialah salah satu daripada:

- entri angka `frozen` / `testFrozen` yang **diturunkan** atau **dialih keluar**
- `complexity-baseline.json` → `count` **diturunkan**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **diturunkan**

Apa-apa selainnya akan gagal: menaikkan angka, menambahkan entri, mengubah `cap`/`testCap`, atau
memadam/menulis semula nota `_rebaseline_*` (nota tersebut ialah jejak audit yang menerangkan sebab setiap
siling wujud dan disimpan dalam objek `frozen` yang sama dengan entri fail).
Bot yang boleh menaikkan had akan menjadi jauh lebih buruk berbanding keadaan semasa. Pelindung
regresi: `tests/unit/verify-ratchet-bank.test.ts`.

Job tersebut tidak sesekali melakukan push ke `release/*` — manusia menggabungkan PR, jadi ukuran yang buruk
tidak boleh dimasukkan tanpa semakan.

## Dasar Senarai Benar

Setiap get yang tidak boleh gagal disebabkan pelanggaran sedia ada menggunakan senarai benar yang dibekukan
(contohnya, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Dasarnya ialah:

**Betulkan punca utama; gunakan senarai benar hanya apabila pelanggaran itu telah sedia ada dan
tidak dapat dibetulkan dalam PR yang sama.**

Apabila menambahkan entri pada senarai benar:

1. Sertakan komen dengan justifikasi.
2. Rujuk isu penjejakan (contohnya, `// #3498 — Phase 2 feature, not yet implemented`).
3. Alih keluar entri dalam PR yang sama yang membetulkan pelanggaran tersebut — entri lapuk yang tidak lagi
   menyekat pelanggaran aktif dengan sendirinya merupakan kecacatan (penguatkuasaan entri lapuk 6A.3 akan
   menggagalkan get bagi entri senarai benar yatim setelah dilaksanakan).

**Jangan** tambahkan entri senarai benar untuk mempercepatkan kelulusan ujian. Get hijau dengan senarai benar yang semakin
bertambah memberikan gambaran mutu yang palsu.

### Apabila get gagal pada PR anda

1. **Baca output get dengan teliti** — output tersebut memberitahu anda dengan tepat fail atau simbol yang
   melanggar peraturan.
2. **Betulkan pelanggaran tersebut** — kebanyakan get ialah semakan sistem fail deterministik yang akan lulus sebaik sahaja
   kod dibetulkan.
3. **Jika pelanggaran itu telah sedia ada** (iaitu, anda tidak memperkenalkannya tetapi get kini
   merangkuminya): tambahkan entri senarai benar dengan komen justifikasi dan isu penjejakan.
4. **Jika get tersebut ialah ratchet** (liputan, amaran ESLint, penduaan, kerumitan):
   perubahan anda telah memburukkan metrik. Betulkan isu asas atau (dalam keadaan yang jarang berlaku) jalankan
   `npm run quality:ratchet -- --update` jika perubahan tersebut disengajakan dan kemerosotan
   metrik boleh diterima — tetapi dokumentasikan sebabnya dalam perihalan PR.
5. **Get nasihat** (`continue-on-error: true`) bersifat makluman — get tersebut tidak menyekat
   penggabungan tetapi dipaparkan dalam ringkasan CI. Tetap betulkannya.

---

## Menambahkan Gerbang Baharu

1. Cipta `scripts/check/check-<name>.mjs` (atau `.ts`). Gerbang dasar keluar dengan kod 0/1.
   Gerbang berasaskan mekanisme sehala mengeluarkan metrik kepada `quality-metrics.json` melalui `collect-metrics.mjs`.
2. Tambahkan `"check:<name>": "node scripts/check/check-<name>.mjs"` pada `package.json`, dan
   selaraskan alias tersebut serta perintah tepatnya dalam `config/quality/gate-manifest.json`.
   Gunakan penyelarasan yang sama apabila mengubah atau mengalih keluar alias pengesahan sedia ada.
   Jalankan `npm run check:gate-manifest`; cangkuk pra-komit dan pengelasan perubahan CI
   menguatkuasakan kontrak ini.
3. Sambungkannya dalam `.github/workflows/ci.yml` di bawah tugas yang sesuai
   (dasar → `lint` atau `docs-sync-strict`; mekanisme sehala → `quality-gate`).
4. Jika gerbang itu mempunyai senarai benar, gunakan `reportStaleEntries()` daripada
   `scripts/check/lib/allowlist.mjs` supaya entri lapuk dikesan secara automatik.
5. Tulis ujian dalam `tests/unit/build/` yang merangkumi logik pengesanan gerbang tersebut.
6. Kemas kini dokumen ini (tambahkan baris pada jadual tugas yang berkaitan).

---

## Peralatan ejen: LSP-dalam-gelung (pilihan)

Selain gerbang CI, OmniRoute menyediakan perancah `agent-lsp` **pilihan**
(`.mcp.json` peringkat projek, Fasa 7 Tugasan 15). Cipta `.mcp.json`
untuk mendedahkan pelayan bahasa TypeScript kepada ejen pengekodan, supaya mereka menyelesaikan simbol /
diagnostik **sebelum** menulis kod — pendamping kompilasi-sebelum-mendakwa kepada
`typecheck:core` yang mengurangkan ralat "simbol rekaan" pada puncanya. Ia sengaja
tidak dimuatkan secara automatik (anda memilih dan mengesahkan jambatan MCP↔LSP); entri yang rosak hanya merekodkan
ralat sambungan dan tidak pernah merosakkan sesi.

---

## Tunggakan Rasionalisasi (semakan ROI — Fasa 9 Gelombang 3)

Inventori ini telah diselaraskan dengan `ci.yml` pada 2026-06-17 (versi terdahulu tidak menyertakan
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Semakan ROI terhadap set yang telah diselaraskan
mengenal pasti calon rasionalisasi berikut. **Penggabungan tersebut ialah perubahan CI
mekanikal; penukaran/pengguguran ialah keputusan dasar yang dikhaskan untuk pengendali.** Tiada apa-apa di bawah
yang telah dilaksanakan lagi.

**Turut tidak didokumentasikan di atas** (nasihat sahaja, isyarat rendah): tugas `docs-lint`
(markdownlint + Vale, keseluruhan tugas `continue-on-error`) dan aliran kerja pengimbas kendiri
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` terdapat dalam
`quality-baseline.json` tetapi tidak disambungkan kepada ratchet penyekat dalam `ci.yml` — metrik itu
kini terbiar.

### Gabung / nyahduplikasi (mekanikal, risiko lebih rendah)

Setiap calon telah disahkan terhadap keadaan get langsung pada 2026-06-17 (percaya tetapi sahkan);
beberapa penggabungan yang kelihatan "jelas" sebenarnya menyembunyikan hutang dan **bukan** pengganti langsung yang bersih.

- **`check:docs-sync` dijalankan dua kali** — secara kendiri dalam tugas `lint` dan sekali lagi di dalam `check:docs-all` (`docs-sync-strict`) serta cangkuk prakomit husky. ✅ **SELESAI** — seruan kendiri `lint` telah dialih keluar.
- **Pengimbasan CVE** — ❌ **BUKAN penggabungan yang bersih.** `audit:deps` menyekat nasihat kritikal dan audit yang tidak lengkap merentas kelima-lima fail kunci, sambil melaporkan nasihat tahap tinggi sebagai amaran di bawah dasar semasa; `check:vuln-ratchet` (osv) hanya gagal apabila terdapat _regresi_ berbanding garis dasar yang didaftar masuk dan menolak pengukuran yang tiada apabila diperlukan. Semantiknya berbeza — menggugurkan `audit:deps` akan menghilangkan get kritikal mutlak dan resit audit pakej bebas. Kekalkan kedua-duanya.
- **Pengesanan kitaran** — ✅ **SELESAI** (#15159 G-01/G-02). Teks lama di sini menyifatkan `check:cycles` sebagai get "hijau, tersusun" dan mewajarkan pengekalan status penyekatnya kerana `check:circular-deps` (dpdm) melaporkan 91 kitaran. Status hijau itu ialah **hijau palsu**: `check:cycles` mengimbas 5 subdirektori (450 fail), hanya memadankan `import|export … from` statik, dan menggugurkan setiap penentu `@/` dan `@omniroute/open-sse/`, maka ia tidak dapat melihat kitaran import dinamik + alias yang mendominasi repositori. Telah dibaiki: get tersebut kini menelusuri `src` + `open-sse` (5023 fail), mengumpulkan penentu daripada AST TypeScript (jadi `import("…")` dikira manakala `typeof import("…")` pada kedudukan jenis tidak dikira), dan menyelesaikan `paths` tsconfig. Ia menemukan **14** kitaran, bukannya 0. Oleh sebab 14 kitaran sedia ada tidak dapat dibaiki dalam PR get, `check:cycles` kini ialah **ratchet** (`--ratchet`, had atas `metrics.cycles.value = 14` dalam `quality-baseline.json`, `direction: down`) — ia menyekat sebarang _regresi_ dan kiraannya hanya boleh menurun. CI menjalankan `npm run check:cycles:ratchet`. Pengurangan berperingkat dilaksanakan bersama **A-01**. `check:circular-deps` (dpdm) kekal sebagai nasihat untuk pandangan kedua yang lebih luas.
- **Kerumitan** — ✅ **SELESAI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): satu penelusuran ESLint, pengiraan mengikut ruleId supaya garis dasar siklomatik+max-lines dan kognitif kekal bebas; `check:complexity` / `check:cognitive-complexity` individu dikekalkan untuk `--update` setempat.
- **Antihalusinasi `/api`** — ✅ **SELESAI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): satu inventori FS bagi `src/app/api`, openapi-routes + docs-symbols masih melaporkan secara berasingan; pemeriksaan individu dikekalkan untuk pelaksanaan setempat.
- **`check:node-runtime` dijalankan dalam 11 tugas** — ⚠️ **ROI rendah.** Setiap satu menggunakan pelaksana berasingan dan pemeriksaan mengambil masa <1s; jumlah penjimatan ~10s, berbanding kehilangan pelindung murah bagi setiap tugas. Tidak berbaloi dengan perubahan tersebut.
- **`typecheck:noimplicit:core` pada lint CI** — ✅ **dialih keluar daripada tugas lint** (sebelum ini bersifat nasihat `continue-on-error`); permukaan jenis penyekat ialah `typecheck:core` + `check:type-coverage`. Skrip setempat dikekalkan.

### Tukar / putuskan (dasar pengendali)

- `check:openapi-security-tiers` (nasihat) — ❌ **TIDAK boleh ditukar secara bersih.** Ia keluar dengan 0 tetapi memberi amaran bahawa beberapa laluan `traffic-inspector` di bawah `LOCAL_ONLY_API_PREFIXES` tidak mempunyai anotasi `x-loopback-only: true`. Penguatkuasaannya memerlukan anotasi tersebut ditambahkan pada `openapi.yaml` terlebih dahulu.
- `typecheck:noimplicit:core` (nasihat) — sebahagian besarnya telah dirangkumi oleh ratchet penyekat `check:type-coverage`. Tukar kepada ratchet atau gugurkan laluan `tsc` kedua yang berlebihan.
- `test:vitest:ui` (kini **menyekat**) — kegagalan sedia ada dikecualikan secara eksplisit dalam `vitest.config.ts` dengan komen penjejakan `// #8618`; kegagalan baharu akan menggagalkan tugas.
- `check:secrets` (gitleaks, ratchet penyekat) — had atas semasa ialah `metrics.secretFindings` dalam `quality-baseline.json`. Sebarang pengecualian memerlukan entri `.gitleaks.toml` yang berjustifikasi; pengukuran yang tidak tersedia ialah TIDAK LENGKAP. Imbasan ini melengkapi pengimbasan rahsia natif GitHub dan `check:public-creds`.
- `check:pr-evidence` (menyekat, mencari teks prosa badan PR menggunakan grep) — risiko positif palsu yang tinggi; menggugurkannya melemahkan penguatkuasaan Peraturan Tegas #18, maka ini benar-benar keputusan dasar.
- `semgrep` (kendiri, bersifat nasihat) — bertindih dengan CodeQL untuk keluarga OWASP; sambungkan garis dasarnya kepada ratchet atau gugurkan.

---

## Dokumentasi Berkaitan

- Rantaian bekalan (asal-usul, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gerbang kesetaraan set kunci

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, tugas `i18n-ui-coverage`).
Membandingkan set kunci daun bagi setiap `src/i18n/messages/<locale>.json` dengan `en.json` dan akan gagal
jika terdapat sebarang daun yang tiada atau berlebihan, tanpa mengira bila kunci itu ditambahkan. Ruang letak `__MISSING__:`
dikira sebagai wujud (kandungannya ialah urusan gerbang nisbah). Ia merupakan pelengkap mutlak
kepada dua gerbang berasaskan perbezaan/peratusan: `check-ui-keys-coverage` menguatkuasakan paras minimum 80 % bagi setiap
tempat peristiwa (43 kunci yang tiada daripada ~13,000 masih memberikan bacaan 99.7 %) dan `check-new-key-coverage` menilai
hanya kunci yang ditambahkan oleh PR kepada `en.json`. Kelompok tempat peristiwa dijana daripada `en.json` pada hari
cabangnya dibuat dan diterjemahkan selama beberapa hari sementara pangkalan terus menambahkan kunci; PR kelompok itu sendiri tidak
menambahkan sebarang kunci, maka kedua-dua gerbang saudaranya kekal senyap apabila kelompok 1 (#13044) digabungkan dengan kekurangan 43 kunci dalam sembilan
tempat peristiwa dan kelompok 2 (#13660) dengan kekurangan 10 kunci dalam lapan tempat peristiwa (2026-09-15). Baiki kegagalan dengan
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; daun `extra`
bermakna sumber telah menggugurkannya — padamkannya daripada tempat peristiwa. `--warn` melaporkan tanpa menyebabkan kegagalan.
`--catalog=cli` menjalankan perbandingan yang sama terhadap `bin/cli/locales` (`npm run i18n:check-keys:cli`);
kedua-dua langkah berada dalam tugas `i18n-ui-coverage`.

#### `check-new-key-coverage` — gerbang i18n kunci baharu

Gerbang saudara kepada `check-ui-value-drift`. Gerbang tersebut mengesan nilai bahasa Inggeris yang telah **ditulis semula**
sementara terjemahannya tidak dikemas kini; gerbang ini mengesan kunci bahasa Inggeris yang telah **ditambahkan**
sementara sesetengah tempat peristiwa tidak pernah menerimanya.

`check-ui-keys-coverage` tidak dapat mengesan kategori ini: ia menguatkuasakan paras minimum peratusan bagi setiap tempat peristiwa, dan
sebelas kunci yang tiada daripada ~13,000 daun mengekalkan liputan pada 99.9%. Peratusan bagi setiap bahasa tidak dapat
menggambarkan "ciri ini dikeluarkan tanpa diterjemahkan" — keseluruhan ciri boleh dimasukkan ke dalam tempat peristiwa baharu tanpa
sebarang teks dan langsung tidak mengubah angka tersebut.

Insiden yang dirangkumnya: Fasa 3 Orchestration Canvas menterjemahkan sebelas kuncinya merentas
42 tempat peristiwa yang wujud ketika itu. Beberapa jam kemudian, kelompok bahasa EU (#13044) meningkatkan repositori
kepada 51 tempat peristiwa, dan sembilan tempat peristiwa baharu (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) tidak pernah
menerimanya. `deepMergeFallback` menggantikan kunci yang tiada dengan bahasa Inggeris, maka mod kegagalannya ialah
UI yang tidak diterjemahkan dan bukannya UI kosong — benar-benar berlaku dan secara reka bentuk tidak kelihatan.

Seperti gerbang saudaranya, gerbang ini **menyedari perbezaan**, dengan membandingkan bahasa Inggeris pada pangkalan penggabungan dengan pepohon
kerja, maka jurang sedia ada kekal dibekukan dan gerbang tersebut tidak memerlukan migrasi untuk diaktifkan.

**Penanda `__MISSING__:<english>` tidak memenuhinya (sejak 2026-09-17).** Sebelum ini, penanda tersebut merupakan
penangguhan yang didokumenkan — masa jalan menggunakan bahasa Inggeris yang betul sebagai sandaran — sehingga lapan PR ciri pada
2026-09-16 menambahkan 61 kunci dan meletakkan penanda itu ke dalam kesemua 65 tempat peristiwa dan bukannya menterjemahkannya: gerbang ini
menerima kesemuanya, tiada apa-apa yang menyekat PR tersebut, lalu gerbang nisbah terjemahan sebenar yang menyekat
kemudiannya gagal pada hujung keluaran untuk semua orang (pt-BR 3.2 % > 2.5 % + 0.5). Penanda kini dinilai
sebagai terjemahan yang tiada. Baiki kegagalan dengan
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, atau
semua tempat peristiwa secara selari dengan `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
selamat untuk proses terpisah, enggan bermula tanpa env `OMNIROUTE_TRANSLATION_*`). Kunci yang mesti kekal
dalam bahasa Inggeris (nama produk/enjin/bendera yang ditetapkan) hendaklah dimasukkan ke dalam `scripts/i18n/untranslatable-keys.json`,
bukan disembunyikan di sebalik penanda. `vi` melarang penanda sama sekali (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gerbang ujian yang diketepikan

Fail dalam senarai `exclude` milik `vitest.config.ts` ialah ujian yang tidak dijalankan, namun kelihatan seperti
liputan kepada sesiapa yang membaca pepohon tersebut. Enam puluh dua fail terkumpul di sebalik komen
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Isu #8618 ditutup pada
2026-08-11 sementara senarai yang dijejakinya berkembang daripada 45 entri kepada 62, dengan setiap entri baharu mewarisi komen
yang merujuk kepada isu yang telah ditutup. Apabila senarai tersebut akhirnya diukur fail demi fail (#13204), **51 daripada 62 fail
lulus terhadap pepohon semasa tanpa sebarang perubahan sumber**.

Gerbang ini mewajibkan setiap pengecualian yang merujuk kepada fail sebenar supaya (a) menamakan isu penjejakan dan
(b) disenaraikan dalam `config/quality/vitest-exclusions.json` bersama status yang telah diukur, supaya penambahan pengecualian menjadi
perbezaan yang boleh disemak dalam fail khusus dan bukannya sekadar satu lagi baris dalam tatasusunan 60 entri. Gerbang ini sengaja
tidak menjalankan semula ujian yang dikecualikan — tindakan itu mengambil masa ~10 minit dan lebih sesuai dilakukan dalam tugas berkala; inventori
merekodkan waktu setiap ujian kali terakhir diukur.
