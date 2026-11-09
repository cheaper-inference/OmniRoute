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

### Kemasukan calon

Aliran kerja CI dan Quality Gates masing-masing mengeluarkan keputusan yang stabil: `Gate / CI` dan `Gate / Quality`. Dasar kemasukan versi mereka menyenaraikan setiap pekerjaan huluan seperti yang diperlukan atau nasihat. Kerja yang diperlukan yang berkenaan mesti berjaya: keputusan yang hilang, dibatalkan, dilangkau, belum selesai dan tidak diketahui tidak dapat mewujudkan PASS. Pengelasan dokumen sahaja atau katalog sahaja yang sah boleh menjadikan lorong kod tidak boleh digunakan; draf PR biasa bukan calon yang diterima. Label `hotfix` tidak mengetepikan bukti.

Kedua-dua aliran kerja merangkumi PRs ke cawangan main/release, menolak ke `main`, acara penghantaran manual dan gabungan kumpulan. Tolak, hantar dan cantumkan kumpulan jalankan pemilihan penuh. Draf gilir Mergify yang dipercayai juga menjalankan kerja `full-code`/`full-code-e2e` yang berkenaan; PRs biasa langkau mereka. Sebelum gabungan manual, jalankan penghantaran penuh pada calon yang tepat. Menolak ke `release/**` tidak memulakan aliran kerja ini; Pelepasan-Hijau memerhati pangkalan yang digabungkan secara berasingan ( lorong Dihoskan `docs/ops/RUNNER_BOX.md` → ). Forks dan gabungan kumpulan menggunakan pelari yang dihoskan untuk pekerjaan yang sebaliknya memilih pelari yang dihoskan sendiri; kapasiti dihoskan yang mencukupi mesti disahkan sebelum pelancaran.

PR biasa menjalankan pemilihan pantas. Lorong `full-code` dan `full-code-e2e` dasar kemasukan (E2E, penyepaduan, artifak pakej, asap Electron, Bun SQLite, ekosistem dan pelanggan protokol) dijalankan hanya pada draf baris gilir Mergify atau secara penuh: `gh workflow run ci.yml --ref <branch>`.

Setiap resit JSON mengenal pasti SHA yang didaftar keluar, jalankan aliran kerja dan percubaan. CLI menolak ketidakpadanan checkout/event SHA. Ujian aliran kerja mengikat keahlian dasar pada senarai `needs` tugas keputusan supaya lorong baharu atau dialih keluar tidak boleh hilang secara senyap. Resit meliputi aliran kerja mereka sendiri, bukan penerbitan, penggunaan atau dalaman pengimbas nasihat sedia ada. Membuat semakan terpakai yang diperlukan dalam peraturan cawangan adalah perubahan pentadbiran yang berasingan; mentakrifkan pekerjaan mereka sendiri tidak melindungi cawangan.

`API Route Typecheck` ialah semakan aliran kerja bebas, di luar kedua-dua keputusan agregat dan profil statik penuh pemerhati tempatan. Periksa keputusannya secara berasingan untuk calon yang tepat. `.github/workflows/api-route-typecheck.yml` berjalan pada PRs ke `main` atau `release/**`, menolak sama ada keluarga cawangan, penghantaran manual dan acara `merge_group` jenis `checks_requested`. Ia tidak mempunyai penapis laluan. Gabung kumpulan check out `merge_group.head_sha`; acara lain check out `github.sha`. Semua acara menggunakan ujian API diagnostik get dan unit get yang sama. PR base retargets meminta cek baharu; suntingan body/title menggunakan nama pemerhatian sahaja `Admission not requested / API Route Typecheck` dan tidak boleh menggantikan semakan kemasukan.

### Bukti tersimpan dalam pengurang penerimaan

`scripts/quality/validate-release-acceptance.mjs` mengurangkan pelan yang diberikan serta
manifestnya; ia tidak memastikan bahawa pelan tersebut meliputi saluran keluaran yang lengkap.
Laporannya menetapkan `releaseAcceptance: false` secara jelas, walaupun pelan itu
`VERIFIED`. Aliran kerja `release-acceptance.yml` masih menggunakan lekapan bayangan, bukannya
resit binaan, pakej, but atau promosi sebenar.

CLI memerlukan `--evidence-root` untuk mengesahkan bukti tersimpan. Fail diselesaikan
sebagai `<evidence-root>/<artifact_id>/<member>` dan dicincang sebagai SHA-256. Rekod PASS
tanpa bukti, fail yang tiada atau berubah, laluan yang tidak selamat atau pautan simbolik akan menghalang
pengesahan. Fail yang tiada tidak bersamaan dengan log berjaya yang kosong. Semakan
SHA/pelaksanaan/percubaan sedia ada kekal bebas: bait yang sepadan tidak boleh menyelamatkan
resit lapuk. Integriti fail bukan bukti kesahihan pelaksanaan atau promosi artifak.

### DAST menggunakan binaan CI yang telah disahkan

Tugas CI wajib `dast-smoke` memanggil `.github/workflows/dast-smoke.yml` selepas `build`. Ia mengikut pemilihan perubahan kod dan draf yang sama dengan binaan, termasuk PR fork yang disokong, PR bersasaran release dan kumpulan penggabungan. Tugas DAST yang tiada, gagal, dibatalkan atau dilangkau secara tidak dijangka menyekat `Gate / CI`. Aliran kerja boleh guna semula ini tidak mempunyai pencetus PR atau manual bebas; pengesahan manual menggunakan pencetusan CI supaya binaan dan penggunanya kekal dalam satu pelaksanaan.

`scripts/ci/next-build-provenance.mjs` memeterai artifak Next lengkap bersama cerna tar, repositori/peristiwa/pelaksanaan, cubaan pengeluar, head/base/checkout/tree, identiti aliran kerja, fail kunci, versi/ABI Node yang tepat, platform dan pembundel. DAST memilih ID artifak yang tidak boleh berubah daripada `needs.build.outputs`, mewajibkan pengesahan cerna muat turun, dan mengira hash ZIP secara bebas berbanding cerna pengeluar sebelum mengekstrak dua ahlinya yang dibenarkan melalui `scripts/ci/unpack-ci-build.py`. Manifes dan arkib tar juga mesti sepadan dengan output bebas pengeluar sebelum pepohon Next diekstrak. Ia tidak pernah mencari binaan berjaya terkini pada cabang. Pelaksanaan semula separa boleh menggunakan semula cubaan pengeluar yang sama apabila ID serta semua input masih sepadan; rekod bukti mencatat kedua-dua cubaan.

Pengguna artifak kekal pada runner Linux terhos dengan kebenaran repositori baca sahaja dan tanpa rahsia repositori. Ia memasang versi Node pengeluar yang tepat, kemudian memasang komponen CLI dengan `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` menolak ketiadaan pelayan kendiri sebelum sebarang binaan sandaran; binaan CLI setempat biasa mengekalkan sandaran sedia ada. Kesediaan pelayan, Schemathesis dan promptfoo semuanya mesti berjaya dalam had tugas 25 minit yang tidak berubah. Rekod asal usul membuktikan identiti dan bait input, bukan kejayaan imbasan DAST. Artifak luput, gangguan runner atau pengimbas gagal kekal sebagai bukti tidak lengkap atau gagal; pembalut bersifat nasihat tidak boleh menjadikannya PASS.

### Kapasiti pelaksanaan UI

CI menjalankan inventori UI penuh sebagai empat serpihan matriks `test-vitest`, setiap satu dengan paling banyak
dua pekerja bagi setiap serpihan dan had masa tugas 15 minit yang sedia ada. Serpihan pertama turut menjalankan
suite Vitest MCP/autoCombo. Hasil tugas wajib meliputi setiap segmen matriks; kegagalan
atau pembatalan satu serpihan tidak boleh menetapkan penerimaan calon.

Pemerhati setiap malam menyimpan resit exact-candidate yang berasingan untuk setiap serpihan UI,
termasuk pelaksanaan MCP dalam resit pertama. Keempat-empat resit, log dan identiti
pelaksanaan yang sepadan diperlukan. `npm run test:vitest:ui` setempat masih memilih
suite yang lengkap; satu pelaksanaan `--shard` hanyalah bukti separa.

### Pengumpulan liputan unit

Dua belas serpihan unit mengumpulkan liputan V8 semasa pelaksanaan ujian sedia ada. Serpihan yang berjaya
menjalankan `scripts/ci/compact-v8-coverage.mjs` untuk memampatkan fail asal tanpa menghasilkan
laporan Istanbul perantaraan. Tugas Coverage akhir mengesahkan kesemua dua belas manifest terhadap
SHA calon, masa jalan, akar sumber dan cincangan data, kemudian menjalankan pelapor c8 serta
ambang liputan sedia ada. Input mengekalkan susunan nama fail global c8; penggabungan awal bagi setiap serpihan tidak selamat
untuk liputan fungsi/blok bercampur. Serpihan yang tiada, rosak atau tidak serasi menggagalkan penerimaan.
Serpihan ujian yang gagal menyimpan liputan diagnostik mentah secara berasingan; liputan itu tidak boleh dimasukkan ke dalam penggabungan akhir.

### Resit kemajuan pelaksanaan unit

Perintah dikongsi `test:unit:ci:shard` merekodkan fasa `primary`, `dashboard` dan `serial`
melalui `scripts/ci/unit-progress-reporter.mjs`. Laporan ujian biasa kekal
tersedia. Resit berasingan yang mengandungi metadata sahaja merekodkan permulaan dan penyelesaian
setiap fail, manakala denyutan jantung 30 saat menyenaraikan fail yang masih aktif serta masa berlalu.
Ia hanya merekodkan metadata pelaksanaan yang disenaraibenarkan; perihalan ujian, output, kandungan ralat
dan persekitaran penuh tidak disirikan.

CI menyimpan fail JSONL sebagai `unit-progress-ci-<run>-<attempt>-<shard>`. Tamat masa kerja boleh menghalang muat naik kemudian;
denyutan jantung yang telah dipancarkan kekal sebagai bukti diagnostik. Ketiadaan denyutan jantung juga
boleh menunjukkan proses pelaksana yang tersekat atau ditamatkan. Resit ini mengekalkan pemilihan ujian,
keserentakan, tarikh akhir dan status keluar sedia ada; resit ini bukan keputusan penerimaan calon.

### Baris gilir gabungan

Label `queue` menghantar PR ke baris gilir Mergify (`.mergify.yml`). Mergify membuka PR draf pada
cabang `mergify/merge-queue/`, CI menjalankan pemilihan penuh di situ dan PR asal digabungkan
apabila `Gate / CI`, `Gate / Quality` dan `Merge integrity (changelog + generated skills)` lulus.

Mergify menulis ringkasan baris gilirnya ke dalam perihalan draf dan aplikasi lain juga boleh menyuntingnya.
Peristiwa `pull_request` `edited` pada draf sedemikian menggunakan kumpulan konkurensinya sendiri
(`-queue-edit-<run_id>`) supaya ia tidak boleh membatalkan pelaksanaan sebenar draf tersebut, serta melangkau gerbang dan
matriks. Hanya `Merge integrity` masih berjalan. Tugas gerbang yang dilangkau membawa nama semakan yang berbeza,
kerana Mergify mentafsir `Gate / CI` yang dilangkau sebagai semakan gagal lalu mengeluarkan PR daripada baris gilir.

Selepas dikeluarkan daripada baris gilir, tolakan tidak semestinya memasukkan semula PR ke dalam baris gilir. Komen `@mergifyio queue` padanya.

### Inventori imbasan statik

Inventori npm-alias berversi dan keahlian imbasan statik terdapat dalam
`config/quality/gate-manifest.json`. Jalankan `npm run check:gate-manifest` untuk mengesahkan
nama skrip dan perintah tepat terhadap `package.json`; penambahan, pengalihan keluar dan
perubahan perintah menggagalkan kedua-dua cangkuk setempat serta tugas pengelasan perubahan dalam CI.
Alias bukan tugas aliran kerja, tika matriks atau kes ujian: kiraan ini
tidak boleh dipersembahkan sebagai boleh saling menggantikan.

Gunakan `npm run quality:scan -- --list` atau `npm run quality:scan:fast -- --list`
untuk memeriksa alias yang dipilih tanpa melaksanakannya. Pelaksana menggunakan titik masuk
npm, maka masa jalannya (termasuk Bun apabila dikonfigurasikan) dikekalkan.
Manifest merekodkan alias di luar profil tersebut sebagai dilaksanakan secara berasingan, dan
perintah penyelenggaraan dilarang dalam profil imbasan baca sahaja.

Profil ini meliputi imbasan statik sahaja. Profil ini tidak memperakui ujian produk,
liputan, pembungkusan, semakan luaran atau penerimaan keluaran penuh calon.
Penerimaan aliran kerja menggunakan `config/quality/admission-policy.json` yang dipautkan dan
`scripts/quality/admission-verdict.mjs`. Profil release-observer kekal berasingan;
periksa semakan dan resit yang berkenaan secara bebas. Perintah statik pemerhati penuh
diisytiharkan dalam `config/quality/release-green-static-profile.json`, termasuk
`audit:deps`, pemilihan mutation-test dan semakan terjemahan. Pemuat mengesahkan perintah npm
terhadap package.json dan pengisytiharan CI/Quality yang dimodelkan; ia menolak perubahan
dan bukannya melaksanakan token shell sebagai argumen. Output SKIP/INCOMPLETE pengimbas wajib
tidak boleh menetapkan PASS. Profil merekodkan pengecualian luarannya dan tidak menggantikan
liputan dihoskan, matriks ujian, pakej atau bukti penggunaan. Inventori berbentuk prosa di bawah
ialah rujukan, bukan bukti bahawa pagar benar-benar dilaksanakan.

Skrip terletak di bawah `scripts/check/` (pagar dasar) dan `scripts/quality/` (enjin ratchet).
Sumber kebenaran CI ialah `.github/workflows/ci.yml`.

### Kesihatan dokumentasi asas diterbitkan

`.github/workflows/i18n-base-health.yml` memerhati kesihatan dokumentasi selepas menolak terpilih ke `main` dan `release/v*`, dan pada penghantaran manual. Penapisnya meliputi dokumentasi, Markdown akar, `llm.txt`, terjemahan state/configuration dan alat i18n yang berkaitan. Tugas `Published base documentation health` tunggal menggunakan Ubuntu yang dihoskan dan tarikh akhir lima minit. Ia melaksanakan pengesahan baca sahaja dan menulis resit diagnostik tanpa pemasangan pergantungan, terjemahan atau penerimaan negeri.

`scripts/i18n/check-base-health.mjs` memerlukan sifar sumber cincang, sasaran yang hilang, cincang sasaran, terjemahan basi dan bahagian-cache tidak konsisten. Ia juga mengesahkan skop document/locale teras semasa dan asalnya yang direkodkan. Konteks tidak sah, liputan tidak lengkap atau penyemak yang terganggu menghasilkan `INCOMPLETE`; drift yang disahkan menghasilkan `FAIL`. Kedua-duanya mengembalikan status keluar yang gagal. Resit terikat untuk membayar SHA, aliran kerja, jalankan dan percubaan, dan dikekalkan sebagai `i18n-base-health-<sha>-<run>-<attempt>`.

Ini adalah pemerhatian bebas terhadap pangkalan yang diterbitkan. Ia tidak menambah acara PR atau gabungan kumpulan, semakan PR yang diperlukan, alias npm atau ahli profil imbasan statik. Pemeriksa asas juga menyekat semua lima kelas dalam mod mutlak. Penyediaan PR biasa kekal berasingan daripada kemasukan. Muat naik yang berjaya tidak boleh menukar hasil kesihatan yang gagal menjadi PASS.

PR biasa menggunakan `--preflight` dengan laporan asas yang dijana oleh `--baseline-evidence`. Ia mungkin meninggalkan sumber bahasa Inggeris tertunda hanya apabila rekod terjemahan lengkap dan bait sasaran sebenar tidak berubah daripada pangkalan yang tepat itu. Ketidakkonsistenan sasaran atau bahagian cache baharu masih menyekat dan bukti yang tidak lengkap tidak boleh membenarkan penyediaan. Laporan itu mendedahkan `preparationPending` dan `mergeReady` secara berasingan: penyediaan yang berjaya tidak membuat terjemahan yang belum selesai sedia untuk digabungkan. Segarkan semula cermin yang terjejas dalam calon yang digubah sebelum kemasukan. Calon baris gilir Mergify yang dipercayai, `merge_group`, tolak cawangan dan larian CI manual menggunakan penyemak mutlak, tanpa `--warn` atau pengampunan kegagalan yang diwarisi. Cincang sasaran yang tiada dan skop yang dikurangkan dengan fail teras direkodkan yang dipadamkan tidak boleh menghasilkan keputusan mutlak yang berjaya.

### Lepaskan PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` melengkapkan CI pada main/release PRs, menolak ke `main`, menghantar dan menggabungkan kumpulan. PRs menggunakan semakan pantas ditapis laluan. Binaan pendua yang dilumpuhkan secara kekal telah dialih keluar; cek build/package/boot sebenar kekal dalam CI. Suite unit dan vitest dijalankan hanya dalam CI (`Unit Tests (N/8)` dan `Vitest`).

| Kerja                                            | Skop                                                                                                                                                                                                               | Menyekat           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; rujukan docs API dan docs-all                                                                                                                                                                       | ya                 |
| `Fast Quality Gates`                             | Kod PRs; semakan statik, semakan taip, semakan taip papan pemuka, ujian unit terjejas                                                                                                                              | ya                 |
| `Forgotten sibling tests`                        | Kod PRs; menukar modul yang dikesan kepada pengguna statik dan ujian adik-beradik calon; laluan laras dan import dinamik dilaporkan sebagai diagnostik nasihat, dengan pengecualian senarai kebenaran yang dirujuk | **Nasihat**        |
| `No new ESLint warnings`                         | Kod PRs; pengawal lin yang sedar penindasan                                                                                                                                                                        | Ya, termasuk garpu |
| `Merge integrity (changelog + generated skills)` | PRs bukan draf ; changelog dan penyegerakan kemahiran yang dijana                                                                                                                                                  | Ya, termasuk garpu |

#### Laporan ujian adik-beradik terlupa

`npm run check:forgotten-sibling-tests` berjalan sebagai langkah nasihat `Fast Quality Gates` dan menggunakan semula penyelesai import di belakang peta kesan ujian. Untuk setiap modul pengeluaran yang diubah, ia melaporkan rantaian `changed module/symbol -> static consumer -> candidate sibling test` yang menentukan apabila ujian calon tidak hadir dalam perbezaan permintaan tarik. Ringkasan Markdown dan hasil JSON dikekalkan sebagai artifak aliran kerja `forgotten-sibling-tests` untuk penentukuran sebelum sebarang pelancaran sekatan.

Eksport semula tong dan import dinamik adalah diagnostik resolusi sahaja; mereka tidak pernah mencipta penemuan menyekat. Pengecualian yang disemak secara langsung dalam `config/quality/forgotten-sibling-allowlist.json`. Setiap entri mesti menamakan ujian pengguna dan calon, memberikan rasional tertentu dan memautkan isu GitHub atau permintaan tarik. Entri cacat gagal ditutup. Pengecualian tidak boleh menyekat ujian calon yang dipadamkan atau perbezaan yang menambah `.skip`/`.todo`; kelemahan penegasan dan penyamaran lain kekal dimiliki oleh pintu `check:test-masking` yang menyekat secara bebas.

### Kerja: `lint`

Dijalankan pada setiap PR ke `main`. Menyekat penggabungan apabila gagal.

| Skrip (`npm run ...`)             | Mengesahkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Menyekat                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Versi Node.js berada dalam julat yang disokong                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                      |
| `check:cycles`                    | Import berkitar merentas semua `src/` + `open-sse/` (berasaskan AST, `paths` tsconfig diselesaikan). Versi asas keluar dengan kod 1 apabila terdapat sebarang kitaran (gagal secara tertutup sejak #15281) dan menyenaraikan SCC. `check:cycles:ratchet` (yang dijalankan oleh CI) menyekat apabila bilangannya melebihi had atas `metrics.cycles` dalam `quality-baseline.json` — pada masa ini 14, `direction: down`, jadi bilangannya hanya boleh menurun (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya (ratchet)                            |
| `check:boundary`                  | Gandingan `open-sse → src`: import fail-ke-fail yang unik daripada enjin ke dalam aplikasi (`scripts/quality/measure-boundary.mjs`; senarai pinggir ialah tunggakan pemulihan teras/pemisahan modul v4). Versi asas = laporan nasihat (sama seperti `quality:boundary`). `check:boundary:ratchet` (yang dijalankan oleh CI, juga dalam gelung ratchet gerbang pantas `quality.yml`) menyekat apabila bilangannya melebihi had atas `metrics.boundaryOpenSseToSrc` dalam `quality-baseline.json` — dimulakan pada ukuran 771, `direction: down`; `--update` hanya menurunkannya; relatif kepada asas pada PR (`--base-ref`, lihat di bawah)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya (ratchet)                            |
| `check:route-validation:t06`      | Skema Zod tersedia pada semua laluan (dasar Tahap 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                      |
| `check:any-budget:t11`            | Kiraan `@ts-expect-error // any` tidak melebihi bajet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:provider-consistency`      | Setiap penyedia dalam `providers.ts` mempunyai entri yang sepadan dalam `providerRegistry.ts` (dan begitu juga sebaliknya, dalam senarai dibenarkan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                      |
| `check:model-lifecycle`           | Tiga jadual penghalaan yang diselenggara secara manual kekal konsisten dengan petikan kitar hayat yang didaftar masuk (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tidak memberikan skor kepada mana-mana id yang telah ditamatkan tetapi masih boleh dihalakan oleh `REGISTRY`; setiap sasaran `BUILT_IN_ALIASES` terdapat dalam `REGISTRY` dan tiada dalam petikan id yang telah ditamatkan; setiap id yang telah ditamatkan tetapi masih berada dalam `REGISTRY` dimajukan atau disenaraikan dalam `allowedRetiredInCatalog`; dan tiada sumber atau sasaran `DEFAULT_DEGRADATION_MAP` muncul sebagai telah ditamatkan dalam petikan tersebut. Ini tidak membuktikan bahawa sesuatu model sedang disediakan oleh upstream langsung. Luar talian — membandingkan dengan `config/quality/model-lifecycle.json`, disegarkan secara manual menggunakan `npm run quality:refresh-model-lifecycle` (rangkaian; tidak disepadukan ke dalam CI). `allowedRetiredInCatalog` ialah ratchet pengurangan beransur-ansur: tambahkan entri hanya bersama isu penjejakan.                                                                                                                          | Ya                                      |
| `check:fetch-targets`             | Setiap `fetch("/api/...")` dalam `src/` sebelah klien diselesaikan kepada `route.ts` yang sebenar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                      |
| `check:deps`                      | Semua kebergantungan yang boleh dipasang dengan `npm install` merentas setiap `package.json` dalam repo terdapat dalam `dependency-allowlist.json`; pakej baharu yang tidak dipinkan atau disyaki slopsquatting ditandai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                      |
| `audit:deps`                      | Audit npm bagi kelima-lima lockfile bebas (akar, Electron, pemalam OpenCode v1/v2 dan penyedia). Nasihat kritikal menyekat; nasihat berkeparahan tinggi kekal kelihatan sebagai amaran. Audit yang tiada/gagal adalah TIDAK LENGKAP dan menyekat; hash kunci dan laporan bagi setiap skop dikekalkan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ya                                      |
| `check:lockfile`                  | Integriti `package-lock.json` — registri https, cincangan integriti, tiada penggantian hos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                      |
| `check:licenses`                  | Senarai izin lesen SPDX untuk kebergantungan pengeluaran                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                      |
| `check:tracked-artifacts`         | Tiada artifak binaan / pautan simbolik `node_modules` yang dikomit (turut dijalankan dalam prakomit husky; pratolak sengaja diringankan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                      |
| `check:ai-attribution`            | Tiada treler AI/bot `Co-Authored-By` atau pengaki penjanaan AI dalam komit, tajuk atau isi PR — Peraturan Tegas #16 (dalam gelung get pantas `quality.yml` untuk PR→`release/**` — membaca muatan peristiwa, tiada operasi di luar PR — dan langkah khusus PR dalam lint `ci.yml` untuk PR→`main`; juga cangkuk `commit-msg` husky; pengarang bersama manusia dibenarkan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | Setiap pengecualian Vitest menamakan isu penjejakan dan muncul dalam `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ya                                      |
| `check:file-size`                 | Fail sumber (`.ts`/`.tsx` dalam `src/`, `open-sse/`, `electron/`, `bin/`) kekal dalam had `cap` dan fail ujian (`*.test.ts(x)`) dalam had `testCap`; fail yang dibekukan dalam `file-size-baseline.json` (`frozen` / `testFrozen`) tidak boleh berkembang melebihi saiz yang direkodkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:error-helper`              | Respons ralat dalam pelaksana/pengendali menggunakan `buildErrorBody()` / `sanitizeErrorMessage()` (Peraturan Tegas #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                      |
| `check:migration-numbering`       | Fail SQL migrasi dinomborkan secara berurutan, tanpa jurang atau pendua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:public-creds`              | Tiada OAuth `client_id`/`client_secret` literal atau kunci Firebase Web di luar `publicCreds.ts` (Peraturan Tegas #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ya                                      |
| `check:db-rules`                  | Tiada SQL mentah di luar modul `src/lib/db/`; tiada import barrel daripada `localDb.ts` (Peraturan Tegas #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                      |
| `check:known-symbols`             | Pelaksana penyedia, strategi penghalaan dan penterjemah yang didaftarkan dalam jadual penghantaran masing-masing sepadan dengan fail pada cakera — tiada simbol yatim atau tidak diisytiharkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                      |
| `check:route-guard-membership`    | Setiap laluan yang mencetuskan proses anak diklasifikasikan oleh `isLocalOnlyPath()` (Peraturan Tegas #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ya                                      |
| `check:test-discovery`            | Setiap fail `*.test.ts` / `*.spec.ts` dalam repo dikumpulkan oleh sekurang-kurangnya satu pelaksana ujian (ratchet: senarai yatim dalam `test-discovery-baseline.json` hanya boleh berkurang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ya                                      |
| `check:test-tla-order`            | Tiada fail `node:test` di bawah `tests/unit` mendaftarkan ujian, menemui `await` peringkat teratas, kemudian mendaftarkan lebih banyak ujian (#18045; ratchet: `test-tla-order-allowlist.json` hanya boleh berkurang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ya                                      |
| `check:agent-skills-sync`         | Artifak kemahiran ejen yang dijana sepadan dengan katalog sumbernya (tiada penyimpangan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Logo/aset penyedia mempunyai entri asal usul yang direkodkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | Fail konfigurasi JSON dapat dihuraikan dan mematuhi peraturan lint repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Kompilasi TypeScript tanpa ralat (amaran nasihat sahaja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                      |
| `typecheck:noimplicit:core`       | `noImplicitAny` yang ketat — berpandangan ke hadapan; banyak tapak panggilan sedia ada masih memerlukan anotasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Nasihat** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` yang diskopkan kepada `src/app/(dashboard)/**` (#7033) — senarai benarkan 27 fail terpilih `typecheck:core` tidak merangkumi sebarang TSX papan pemuka, dan `next build` juga tidak pernah membuat semakan jenis padanya (`next.config.mjs` menetapkan `ignoreBuildErrors: true`), maka regresi pengecam yatim di situ (#6625/#6909) tidak dapat dikesan oleh CI. Membandingkan dengan garis dasar kiraan beku bagi setiap fail/setiap kod TS (`config/quality/dashboard-typecheck-baseline.json`, corak penguatkuasaan lapuk yang sama seperti `check:known-symbols`) — hanya ralat BAHARU yang melebihi kiraan garis dasar akan menggagalkan gerbang; turunkan ambang secara beransur-ansur dengan `--update` apabila ralat sedia ada dibetulkan.                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                      |
| `check:build-typecheck`           | Semakan jenis pengeluaran seluruh aplikasi terhadap `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), yang tidak diliputi oleh permukaan senarai benarkan 27 fail `typecheck:core` mahupun get papan pemuka. Perbezaan dibuat berbanding `config/quality/build-typecheck-baseline.json`; kiraan baharu atau yang meningkat bagi setiap pasangan (fail, kod) akan menggagalkan semakan, manakala kiraan yang lebih rendah meminta anda mengurangkannya secara berperingkat. `--update` enggan diteruskan apabila larian mengandungi pasangan baharu atau yang meningkat, melainkan `--force-regressions` diberikan, dan enggan menerima fail yang baharu disenyapkan melainkan `--force-nocheck` diberikan, jadi meluaskan garis dasar untuk mendapatkan keputusan berjaya dan memberikan penyenyapan kekal ialah dua tindakan berasingan yang disengajakan. `--force` tanpa argumen ditolak. Turut mengimbas skop binaan untuk `@ts-nocheck` berbanding `config/quality/ts-nocheck-baseline.json`, kerana fail yang menggunakannya tidak melaporkan sebarang diagnostik langsung dan sebaliknya tidak akan kelihatan oleh mana-mana get. | Ya                                      |

#### Dua program typecheck memberikan jawapan yang berbeza

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) dan `check:build-typecheck` menyusun atur cara yang berbeza
menggunakan pilihan yang berbeza, dan fail yang sama boleh bersih dalam satu atur cara
serta dipenuhi ralat dalam atur cara yang lain.

`tsconfig.build.json` menetapkan `"strict": false`, jadi `noImplicitAny` dimatikan. Konfigurasi
teras menyusun senarai benarkan 27 fail terpilih dengan pilihan yang lebih ketat dan
mengikuti graf import setiap entri, jadi fail yang tidak pernah muncul dalam atur cara binaan
masih diperiksa di situ.

Kesannya penting apabila menilai sama ada sesuatu fail ditaip: **sifar diagnostik
di bawah `check:build-typecheck` tidak bermaksud sifar**. Menanggalkan `@ts-nocheck` daripada 26
fail menunjukkan bahawa 23 daripadanya bersih dalam atur cara binaan; enam belas daripada
fail tersebut pula menunjukkan kira-kira 120 ralat any tersirat dalam atur cara yang ketat. Periksa kedua-duanya sebelum menganggap fail bersih.

### Tugas: `quality-gate`

Dijalankan selepas `test-coverage`. Menyekat penggabungan jika gagal.

| Skrip                        | Mengesahkan                                                                                                                                                                                                | Menyekat                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `quality:collect`            | Menghasilkan `quality-metrics.json` (kiraan amaran ESLint, liputan daripada laporan syard yang digabungkan)                                                                                                | Ya (huluan kepada mekanisme ambang beransur-ansur) |
| `quality:ratchet`            | Setiap metrik dalam `quality-baseline.json` tidak merosot (amaran ESLint ≤ garis dasar; liputan ≥ garis dasar)                                                                                             | Ya                                                 |
| `check:duplication`          | Penduaan kod (jscpd@4) tidak melebihi garis dasar dalam `quality-baseline.json`                                                                                                                            | Ya                                                 |
| `check:complexity`           | Kerumitan siklomatik peringkat fail tidak melebihi had (peraturan teras ESLint `complexity` + `max-lines-per-function`)                                                                                    | Ya                                                 |
| `check:cognitive-complexity` | Mekanisme ambang beransur-ansur bagi kerumitan kognitif (`eslint-plugin-sonarjs`) — laluan ESLint berasingan; CI menjalankan kedua-duanya secara gabungan sebagai satu langkah `check:complexity-ratchets` | Ya                                                 |
| `check:dead-code`            | Mekanisme ambang beransur-ansur bagi eksport/fail tidak digunakan (knip) tidak merosot berbanding garis dasar                                                                                              | Ya                                                 |
| `check:compression-budget`   | Bajet penanda aras pemampatan — had minimum penjimatan token bagi setiap enjin tidak boleh merosot                                                                                                         | Ya                                                 |
| `check:type-coverage`        | Mekanisme ambang beransur-ansur bagi peratusan berjenis (`type-coverage`) tidak merosot; sebahagian besarnya merangkumi `typecheck:noimplicit:core`                                                        | Ya                                                 |

### Tugas: `codeql-scan` dan `codeql-admission`

`codeql-scan` menghasilkan semua kategori analisis yang dikonfigurasikan. Selepas tugas itu berjaya, `codeql-admission` mengesahkan muat naiknya yang tepat dan ratchet amaran calon. Kedua-duanya ialah kebergantungan wajib `Gate / CI`, termasuk bagi calon yang hanya mengubah dokumentasi. Keperluan pengaktifan pentadbiran dan ujian canary diterangkan dalam “Ratchet CodeQL” di bawah.

| Skrip                  | Perkara yang disahkan                                                                                                                                                                                        | Menyekat |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:codeql-ratchet` | Ref/SHA calon dan semua kategori analisis yang dikonfigurasikan mesti terkini sebelum ratchet amaran dinilai; bukti yang tiada menyekat. Inventori global kekal berasingan — lihat “Ratchet CodeQL” di bawah | Ya       |

### Kerja: `quality-extended`

Tugas ini menyekat calon yang berkenaan. Saiz berkas, penemuan rahsia, penemuan
kerentanan, penemuan aliran kerja dan perubahan OpenAPI diperiksa menggunakan mekanisme ambang beransur-ansur yang diwajibkan.
Diagnostik kebergantungan kitaran kekal sebagai nasihat. Pemasangan pengimbas diwajibkan:
`scripts/ci/install-quality-scanners.sh` menyediakan versi yang ditetapkan dan menyebarkan
kegagalan pemasangan. Alat yang tiada, laporan tidak sah atau garis dasar yang tiada menyebabkan
gerbang pengimbas yang diwajibkan kekal TIDAK LENGKAP.

| Skrip                    | Mengesahkan                                                                                                                                                                                                                   | Menyekat                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Tiada kebergantungan kitaran (dpdm)                                                                                                                                                                                           | **Nasihat**                                              |
| `check:bundle-size`      | Saiz bundle tidak melebihi had; pengukuran yang tidak tersedia menyebabkan kegagalan                                                                                                                                          | **Menyekat dengan --ratchet**                            |
| `check:secrets`          | Penemuan Gitleaks tidak merosot; imbasan yang diwajibkan menolak alat/sumber/garis dasar yang tiada, imbasan yang gagal dan laporan yang tidak sah                                                                            | **Menyekat dengan --ratchet**                            |
| `check:vuln-ratchet`     | Kerentanan kebergantungan tidak merosot; imbasan yang diwajibkan menolak alat yang tiada, laporan yang tidak sah atau garis dasar yang tiada                                                                                  | **Menyekat dengan --ratchet**                            |
| `check:workflows`        | Lint aliran kerja (actionlint + zizmor); pengimbas yang tiada/rosak, laporan yang tidak sah atau garis dasar ratchet yang tiada gagal sebagai INCOMPLETE. Penemuan yang sah mengikut dasar ketat/nasihat/ratchet yang dipilih | Pelaksanaan diperlukan; ratchet zizmor menyekat dalam CI |
| `check:openapi-breaking` | Kontrak API awam berbanding commit peristiwa yang disematkan (asas gabungan PR, sebelum push, asas kumpulan gabungan; checkout berjadual/manual bagi induk pertama); pengukuran yang diwajibkan gagal secara tertutup         | **Menyekat dengan --ratchet**                            |

### Pekerjaan: `docs-sync-strict`

Untuk permintaan tarik kepada `main` atau `release/**`, tugas ini hanya dijalankan untuk calon bukan draf (atau baris gilir dipercayai) yang diklasifikasikan sebagai dokumentasi atau perubahan kod. Ia juga berjalan pada acara CI bukan PR; pencetus tolak aliran kerja ini meliputi `main` sahaja, bukan `release/**`. Langkah yang keluar bukan sifar menghalang kerja; penemuan laporan sahaja dan pengecualian yang didokumenkan di bawah tidak.

| Skrip                          | Mengesahkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Menyekat                                                                                                                                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Gerbang meta yang menjalankan 7 subgerbang di bawah secara berurutan                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                                                                                                                              |
| ↳ `check:docs-sync`            | Ketekalan versi Package/OpenAPI/CHANGELOG, cermin `llm.txt` tepat, invarian CHANGELOG section/size diterjemahkan dan ketiadaan dokumen pendua diganti                                                                                                                                                                                                                                                                                                                                                                      | ya                                                                                                                                              |
| ↳ `check:docs-frontmatter`     | Halaman dokumentasi yang disusun membawa tajuk frontmatter yang sah                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ya                                                                                                                                              |
| ↳ `check:docs-counts`          | Invarian kiraan berkeyakinan tinggi adalah ketat; semakan kiraan fail heuristik hanya memberi amaran melainkan skrip menerima `--strict` (gerbang meta CI tidak melepasinya)                                                                                                                                                                                                                                                                                                                                               | Sekatan peringkat yang ketat; nasihat peringkat lembut                                                                                          |
| ↳ `check:env-doc-sync`         | Sumber env reads, `.env.example`, dan `docs/reference/ENVIRONMENT.md` bersetuju selepas senarai kebenaran abaikan, dokumen sahaja dan env sahaja yang eksplisit                                                                                                                                                                                                                                                                                                                                                            | Ya, di luar senarai kebenaran yang didokumenkan                                                                                                 |
| ↳ `check:deprecated-versions`  | Melaporkan kemungkinan versi lapuk di luar konteks sejarah yang selamat dan tarikh kemas kini lapuk, tidak termasuk dokumen yang diabaikan                                                                                                                                                                                                                                                                                                                                                                                 | Nasihat dalam pendawaian CI semasa (`--strict` tidak diluluskan)                                                                                |
| ↳ `check:doc-links`            | Pautan penurunan harga dalaman dalam dokumen diselesaikan ke fail sebenar ( borang `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                                                     | ya                                                                                                                                              |
| ↳ `check:fabricated-docs`      | Laluan, env vars, arahan CLI, nama cangkuk dan laluan fail yang disebut dalam dokumen wujud dalam pangkalan kod. Pintu keras melalui `--strict`; soft-fail tanpa bendera.                                                                                                                                                                                                                                                                                                                                                  | Ya (melalui `--strict` dalam CI)                                                                                                                |
| `check:cli-i18n`               | Kekunci CLI `t()` yang digunakan wujud dalam `en`; `pt-BR` mengekalkan semua bahagian peringkat teratas; `zh-CN` dan `zh-TW` mengandungi setiap kekunci daripada `en`                                                                                                                                                                                                                                                                                                                                                      | Ya                                                                                                                                              |
| `check:openapi-coverage`       | Spesifikasi OpenAPI merangkumi sekurang-kurangnya paras minimum laluan sebenar yang ditetapkan secara ratchet                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                                                                                                                              |
| `check:openapi-security-tiers` | Anotasi `x-loopback-only`/`x-always-protected` yang diisytiharkan mesti disokong oleh `routeGuard.ts`; ralat penghurai dan ketidakpadanan semakan ke hadapan menyekat. Semakan songsang bagi `x-loopback-only` yang tiada di bawah awalan khusus setempat memberi amaran, dan laluan yang ditakrifkan melalui pola sahaja dikecualikan daripada semakan songsang itu.                                                                                                                                                      | Semakan penghurai/ke hadapan menyekat; semakan songsang bersifat nasihat                                                                        |
| `check:openapi-routes`         | Setiap laluan `/api...` dalam `openapi.yaml` sepadan dengan laluan sebenar tanpa bergantung pada nama parameter selepas senarai pengecualian berjustifikasi `KNOWN_STALE_SPEC` digunakan; entri senarai yang lapuk turut menyebabkan kegagalan                                                                                                                                                                                                                                                                             | Ya                                                                                                                                              |
| `check:docs-symbols`           | Rujukan URL dalaman `/api/...` dalam dokumen kanonik bukan cermin sepadan dengan laluan sebenar atau keluarga laluan; rujukan proksi/upstream/pemegang tempat/fail dan entri berjustifikasi `KNOWN_STALE_DOC_REFS` dikecualikan, manakala entri senarai pengecualian lapuk menyebabkan kegagalan                                                                                                                                                                                                                           | Ya                                                                                                                                              |
| `i18n translation drift`       | Kemasukan mutlak memerlukan sumber sifar, tiada sasaran, cincang sasaran, terjemahan basi dan bahagian-cache tidak konsisten. Penyediaan PR biasa mungkin mengekalkan bukti yang diwarisi yang tepat atau perubahan dalam bahasa Inggeris sahaja yang belum selesai dengan keadaan lengkap dan bait sasaran yang tidak berubah; laporannya secara berasingan mengisytiharkan kesediaan gabungan. Cincang sasaran tiada dan blok bukti asas yang tidak lengkap. Cache bahagian warisan yang tidak hadir bukanlah kegagalan. | Kesemua lima kelas menyekat kemasukan queue/base ; permit penyediaan biasa hanya terbukti warisan atau kerja Inggeris sahaja yang belum selesai |

Dua belas README SVGs di bawah `docs/diagrams/` dijana (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` menjana semula kesemuanya). Setiap satu mempunyai ujian unit banding bait (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) yang gagal apabila fail komited basi, dan `check:docs-counts` membaca nombor kanonik daripada nod `<text>` mereka — itulah sebabnya langkah menggariskan mengekalkan setiap rentetan yang digariskan dalam fail sebagai `<text>` yang tidak kelihatan. Semakan nombor kanonik SVG membaca fail yang disenaraikan dalam `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, tambah `public/images/tier-flow-dark.svg` dan `tier-flow-light.svg`; tuntutan percuma selamanya, kemasukan katalog, kumpulan berulang dan faktor pemarkahan juga dibaca `promise-pillars.svg`, `free-tier-budget.svg` dan `strategies-grid.svg`. `free-tier-budget.svg` mengeluarkan angkanya daripada pemuat katalog langsung, jadi perubahan kepada `FREE_MODEL_BUDGETS` atau nama paparan pembekal akan menjadikan CI merah sehingga fail itu dijana semula.

### Tugas: `i18n-ui-coverage`

| Skrip                              | Mengesahkan                                                                                                                                                                                                                   | Menyekat     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (sebaris) | Liputan kunci i18n UI ialah ≥ 65%                                                                                                                                                                                             | Ya           |
| `check-ui-value-drift` (sebaris)   | **Nilai** bahasa Inggeris yang ditulis semula tidak meninggalkan terjemahan lapuk                                                                                                                                             | Ya           |
| `check-new-key-coverage` (sebaris) | Kunci bahasa Inggeris **baharu** diterjemahkan dalam setiap penempatan — penanda `__MISSING__:` ditolak                                                                                                                       | Ya           |
| `check-translation-ratio`          | Nisbah terjemahan sebenar bagi setiap penempatan (sama dengan bahasa Inggeris / pemegang tempat / entri hilang di luar senarai dibenarkan) tidak boleh melebihi `config/quality/i18n-translation-baseline.json` + kelonggaran | **Menyekat** |

Memerlukan `fetch-depth: 0` — get nilai-hanyut membandingkan perbezaan `en.json` dengan asas gabungan.

#### `check-ui-value-drift` — gate terjemahan lapuk

Mengesan satu regresi i18n yang tidak dapat dilihat secara struktur oleh get lain: nilai bahasa Inggeris
ditulis semula dan terjemahan yang diterbitkan daripada bahasa Inggeris _sebelumnya_ masih kekal, lalu
pengguna bukan berbahasa Inggeris terus membaca teks yang kedengaran meyakinkan tetapi kini salah.

Ini benar-benar pernah dikeluarkan. `oauthModal.googleOAuthWarning` ditulis semula apabila pembantu log masuk
Antigravity diperkenalkan (#5203); **39 daripada 43 penempatan** mengekalkan teks yang memberitahu pengendali
supaya "salin URL penuh dan tampalkannya di bawah" — aliran yang tidak dapat diselesaikan untuk penyedia itu.
Perkara ini tidak disedari sehingga #8463 kerana:

- `sync-ui-keys` hanya mengisi semula kunci yang **tiada**, bukan yang **lapuk**;
- `check-ui-keys-coverage` mengira _kewujudan_ kunci, jadi terjemahan lapuk dikira sebagai diliputi;
- `check-translation-drift` menjejaki cerminan dokumentasi `docs/i18n/<locale>/**.md` —
  ia tidak pernah membaca `src/i18n/messages/*.json`. Menyekat dalam tugas `docs-sync-strict` sejak
  penyegerakan semula 2026-09: edit dokumen teras → `npm run i18n:run -- --files=<doc>` (peringkat bahagian, ringan).

**Peka terhadap perbezaan, bukan disokong garis dasar.** Ia membandingkan `en.json` pada asas gabungan dengan
pepohon kerja; bagi setiap kunci yang nilai bahasa Inggerisnya berubah, mana-mana penempatan yang masih menyimpan
terjemahan yang tidak disentuh dianggap lapuk. Ini sengaja **membekukan hutang sedia ada** — perbezaan
tidak dapat mendedahkan daripada teks bahasa Inggeris lama yang mana sesuatu terjemahan lama berasal, jadi get
hanya menilai perkara yang disentuh oleh perubahan semasa. Pilihan lain (garis dasar cincangan bagi setiap kunci)
memerlukan fail janaan ~600 KB, 3× lebih besar daripada garis dasar sedia ada yang terbesar, dan berubah pada
setiap PR i18n.

Dua cara untuk memenuhinya:

1. kemas kini terjemahan yang terjejas, atau
2. tetapkannya kepada `__MISSING__:<new english>` — masa jalan kemudiannya menyampaikan teks bahasa Inggeris yang dibetulkan
   (`src/i18n/request.ts::deepMergeFallback`, #7258) dan kunci tersebut dimasukkan ke dalam giliran terjemahan.

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

Matriks pengesahan i18n penuh (satu tugas bagi setiap lokaliti). Keseluruhan tugas ini bersifat nasihat.

| Skrip                           | Mengesahkan                                 | Menyekat                                                       |
| ------------------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Kelengkapan terjemahan bagi setiap lokaliti | **Nasihat** (`continue-on-error: true` pada keseluruhan tugas) |

### Tugas: `pr-test-policy`

Dijalankan pada permintaan tarik sahaja.

| Skrip                  | Mengesahkan                                                                                                                                       | Menyekat |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR yang mengubah kod produksi dalam `src/`, `open-sse/`, `electron/`, atau `bin/` mesti menyertakan atau mengemas kini ujian (Peraturan Tegas #8) | Ya       |
| `check:test-masking`   | Fail ujian yang diubah tidak mengurangkan jumlah bersih penegasan atau menambahkan tautologi `assert.ok(true)`                                    | Ya       |
| `check:pr-evidence`    | Isi PR menyatakan bukti ujian/VPS bagi perubahan tersebut (mengautomasikan Peraturan Tegas #18 dengan menggrep prosa PR — rapuh, lihat Tunggakan) | Ya       |

### Tugas: `test-vitest`

Memerlukan tugas pengelasan `changes`. Pecahan matriks yang berkenaan menyekat penggabungan jika gagal.

| Suit             | Mengesahkan                                                 | Menyekat                                                                                                                       |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Pelayan MCP (110 alat), autoCombo, cache — pelaksana vitest | Ya                                                                                                                             |
| `test:vitest:ui` | Ujian komponen UI — pelaksana vitest                        | **Menyekat** — kegagalan sedia ada dikecualikan secara eksplisit dalam `vitest.config.ts`; kegagalan baharu menggagalkan tugas |

### Aliran kerja setiap malam (dijadualkan, bersifat nasihat)

Ini dijalankan mengikut jadual cron (dan `workflow_dispatch`), tidak pernah pada PR. Semuanya bersifat nasihat.

| Aliran kerja           | Mengesahkan                                                                                                                                                                                 | Sekatan     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | ujian sifat fast-check dengan benih rawak + bilangan pelaksanaan yang tinggi                                                                                                                | **Nasihat** |
| `nightly-resilience`   | pagar pertumbuhan heap, suntikan kerosakan chaos, beban/rendaman k6                                                                                                                         | **Nasihat** |
| `nightly-llm-security` | perlindungan suntikan promptfoo (mod sekatan) + prob garak (dilangkau tanpa rahsia penyedia)                                                                                                | **Nasihat** |
| `nightly-schemathesis` | pemfuzzan kontrak OpenAPI (schemathesis) terhadap OmniRoute langsung menggunakan `docs/openapi.yaml` — mendedahkan pelanggaran spesifikasi / ralat 500 yang tidak dikendalikan (Fasa 8 B.4) | **Nasihat** |
| `nightly-mutation`     | skor ujian mutasi Stryker pada laluan unit pantas — mutan yang bertahan mendedahkan penegasan yang lemah                                                                                    | **Nasihat** |
| `nightly-compat`       | matriks keserasian enjin Node merentas julat `engines.node` yang disokong                                                                                                                   | **Nasihat** |

Garis dasar prestasi (heap, TTFB, masa binaan) direkodkan, bukan dijadikan syarat sekatan: lihat [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL ratchet: kemasukan calon dan inventori repositori

CI memiliki kemasukan calon CodeQL melalui rantaian pergantungan yang jelas: `codeql-scan` memanggil matriks empat bahasa dalam `codeql.yml`, kemudian `codeql-admission` menjalankan `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` memerlukan kedua-dua keputusan. Kualiti mengekalkan semakan berangkanya sendiri tetapi tidak menanyakan pengimbas sebelum pengeluar selesai; `Gate / Quality` sahaja bukanlah kemasukan calon yang lengkap. CodeQL kekal diperlukan pada calon dokumen sahaja.

Dasar dalam `config/quality/codeql-admission-policy.json` memilih Tindakan, C/C++, JavaScript/TypeScript dan Python, lalai suite pertanyaan, model ancaman jauh dan mod binaan tiada. Prapenerbangan pengeluar menolak rekod pengaktifan yang belum selesai dan cawangan di luar senarai sasaran yang jelas. Sasaran semasa adalah utama dan ujian Kontrak release/v3.8.54. membandingkan senarai terhingga ini dan pencetus tolak penyelenggaraan dengan versi pakej; keluaran seterusnya perlu disemak semula. Pencetus CI keluaran lebih luas sedia ada PR dikekalkan, tetapi sasaran tanpa papan melaporkan HOLD sebelum pengekstrakan dan bukannya mendapatkan PASS yang tidak diukur.

Setiap kerja matriks merekodkan muat naik SARIF sebenar ID, bahasa, kategori, jalankan dan percubaan, identiti aliran kerja pemanggil, ref/head/base/merge SHA acara dan cincang dasar. Tugas bergantung hanya memuat turun resit larian ini dan mengesahkan ringkasan artifak. Ia memerlukan semua empat kategori, pengeluar yang berjaya dan pemprosesan yang lengkap bagi setiap muat naik yang tepat. Ia menggunakan penapis sarif_id API, bukan analisis terkini yang ditemui pada cawangan. Tayangan semula separa boleh menggunakan semula kategori yang berjaya daripada percubaan awal larian dan calon yang sama, mengekalkan percubaan menghasilkan; pengeluar semasa yang gagal tidak boleh menggunakan semula bukti hijau sebelumnya.

Tindakan CodeQL menunggu untuk diproses, tetapi pelaksanaan yang disematkan boleh memberi amaran dan diteruskan selepas kegagalan membaca status atau penantian yang penat. Oleh itu, kemasukan mengesahkan pemprosesan semula. Kategori tiada, pemprosesan belum selesai, kerja gagal atau dibatalkan, identiti lapuk, penomboran tidak lengkap atau APIs tidak tersedia menghasilkan HOLD dan keluar 2. Tiada menunggu tetap untuk aliran kerja pengimbas bebas kekal. PR yang tidak diimbas tidak boleh lulus kerana pertanyaan makluman mengembalikan 0. Kiraan terukur di atas `metrics.codeqlAlerts.value` keluar 1; garis dasar tidak dinaikkan untuk menyerap makluman cawangan lain. [Muat naik status dan carian analisis](https://docs.github.com/en/rest/code-scanning/code-scanning).

Resit merekodkan muat naik dan analisis IDs, kategori, versi alat, ref/SHA, garis dasar dan nombor amaran. Kiraan SARIF identity/result, kiraan peraturan minimum dan kejadian amaran tepat kekal wajib. Identiti PR/analysis disemak semula sebelum menerima. Semakan ini mewujudkan liputan kategori yang dikonfigurasikan, bukan inventori setiap fail sumber yang diekstrak. Pengekstrakan tanpa binaan C/C++ tidak termasuk kod yang dijana semasa pembinaan projek. Pengecualian sumber masih memerlukan semakan dan atribusi penyumbang memerlukan bukti asas tepat yang setanding.

`codeql-maintenance.yml` membekalkan imbasan tolak keluaran aktif dan jadual mingguan tanpa menduplikasi pengeluar PR/main. `nightly-codeql-inventory.yml` memastikan garis dasar seluruh repositori berasingan, dengan `--strict-measurement` dan kegagalan apabila pengukuran tidak tersedia. Ponteng anggun pengumpul warisan tempatan bukanlah kemasukan calon. Pengetatan kekal sebagai `--update` yang jelas selepas kiraan global yang lebih rendah disahkan.

Aliran kerja Lanjutan tidak boleh diterbitkan semasa Persediaan Lalai dikonfigurasikan: GitHub menolak gabungan itu. Dasar versinya masih belum selesai sehingga peralihan pentadbiran yang disemak dibaca semula. Sebelum penerbitan, pengendali menyematkan repositori, head/base/tree, cincang policy/patch/rollback dan keadaan persediaan yang diperhatikan; `node scripts/quality/codeql-producer.mjs verify-admin-readback` menyemak rekod JSON dijangka dan sebenar yang dibekalkan. Ini ialah pengawal teknikal, bukan kelulusan pengendali atau pengganti untuk mendapatkan bacaan semula baharu. Token PR tidak pernah meminta akses Pentadbiran. Pelancaran dan sebarang perubahan pengimbas memerlukan bacaan balik yang berasingan serta bukti keserasian PR sebenar, garpu dan gabungan kumpulan.

Forks menggunakan pelari yang dihoskan, daftar keluar tanpa bukti kelayakan berterusan, tiada projek install/build dalam pengeluar dan tiada rahsia repositori yang diwarisi. GitHub menyokong muat naik SARIF untuk acara pull_request dengan token fork yang dikurangkan; kelulusan pelaksanaan sumbangan kali pertama kekal sebagai dasar GitHub. Jangan sekali-kali menggunakan pull_request_target untuk melaksanakan kod yang tidak dipercayai. Sahkan kebenaran token sebenar, analysis_key dan semua persekitaran kategori dalam kanari terkawal sebelum menganggap pemindahan selesai. [Peraturan muat naik garpu](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [mod persediaan yang bercanggah](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Pemecatan adalah panggilan operator (Hard Rule #14)** — tidak sekali-kali mengetepikan makluman CodeQL tanpa merekodkan justifikasi teknikal dalam ulasan pemecatan: `won't fix` untuk keperluan protokol huluan, `used in tests` untuk lekapan ujian, `false positive` untuk sanitizer CodeQL tidak dapat melihat (precedent: `docs/security/ERROR_SANITIZATION.md`).

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

**Turut belum didokumentasikan di atas** (nasihat, isyarat rendah): tugas `docs-lint` (markdownlint + Vale, seluruh tugas menggunakan `continue-on-error`) serta aliran kerja pengimbas kendiri `semgrep.yml` / `scorecard.yml`. CodeQL kini mempunyai tugas pengeluar dan penerimaan wajib di bawah `Gate / CI`, tertakluk pada keperluan pengaktifan yang diterangkan di atas. `semgrepFindings: 0` terdapat dalam `quality-baseline.json` tetapi tidak disambungkan kepada ratchet yang menyekat dalam `ci.yml` — metrik ini kini tiada semakan pelaksana yang berkaitan.

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
