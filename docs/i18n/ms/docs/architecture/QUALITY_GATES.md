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

Kedua-dua aliran kerja merangkumi PRs ke cawangan main/release, menolak ke `main`, penghantaran manual dan acara gabungan kumpulan. Tolak, hantar dan cantumkan kumpulan jalankan pemilihan penuh. Draf gilir Mergify yang dipercayai juga menjalankan tugas `full-code`/`full-code-e2e` yang berkenaan; PRs biasa langkau mereka. Sebelum gabungan manual, jalankan penghantaran penuh pada calon yang tepat. Menolak ke `release/**` tidak memulakan aliran kerja ini; Pelepasan-Hijau memerhati pangkalan yang digabungkan secara berasingan ( lorong Dihoskan `docs/ops/RUNNER_BOX.md` → ). Forks dan gabungan kumpulan menggunakan pelari yang dihoskan untuk pekerjaan yang sebaliknya memilih pelari yang dihoskan sendiri; kapasiti dihoskan yang mencukupi mesti disahkan sebelum pelancaran.

PR biasa menjalankan pemilihan pantas. Lorong `full-code` dan `full-code-e2e` dasar kemasukan (E2E, penyepaduan, artifak pakej, asap Electron, Bun SQLite, ekosistem dan pelanggan protokol) berjalan hanya pada draf baris gilir Mergify atau pada larian penuh: `gh workflow run ci.yml --ref <branch>`.

Setiap resit JSON mengenal pasti SHA yang telah didaftarkan, jalankan aliran kerja dan percubaan. CLI menolak ketidakpadanan checkout/event SHA. Ujian aliran kerja mengikat keahlian dasar pada senarai `needs` tugas keputusan supaya lorong baharu atau dialih keluar tidak boleh hilang secara senyap. Resit meliputi aliran kerja mereka sendiri, bukan penerbitan, penggunaan atau dalaman pengimbas nasihat sedia ada. Membuat semakan terpakai yang diperlukan dalam peraturan cawangan adalah perubahan pentadbiran yang berasingan; mentakrifkan pekerjaan mereka sendiri tidak melindungi cawangan.

`API Route Typecheck` ialah semakan aliran kerja bebas, di luar kedua-dua keputusan agregat dan profil statik penuh pemerhati tempatan. Periksa keputusannya secara berasingan untuk calon yang tepat. `.github/workflows/api-route-typecheck.yml` berjalan pada PRs ke dalam `main` atau `release/**`, menolak sama ada keluarga cawangan, penghantaran manual dan acara `merge_group` jenis `checks_requested`. Ia tidak mempunyai penapis laluan. Gabung kumpulan lihat `merge_group.head_sha`; acara lain lihat `github.sha`. Semua acara menggunakan ujian unit pintu dan pintu diagnostik API yang sama. Sasaran semula pangkalan PR meminta semakan baharu; Suntingan body/title menggunakan nama pemerhatian sahaja `Admission not requested / API Route Typecheck` dan tidak boleh menggantikan semakan kemasukan.

### Bukti yang dikekalkan dalam pengurangan penerimaan

`scripts/quality/validate-release-acceptance.mjs` mengurangkan pelan yang dibekalkan dan manifesnya; ia tidak menetapkan bahawa pelan itu meliputi saluran paip keluaran lengkap. Laporannya secara eksplisit menetapkan `releaseAcceptance: false`, walaupun rancangan itu adalah `VERIFIED`. Aliran kerja `release-acceptance.yml` masih menggunakan lekapan bayangan, bukan binaan sebenar, pakej, but atau resit promosi.

CLI memerlukan `--evidence-root` untuk mengesahkan bukti yang disimpan. Fail diselesaikan sebagai `<evidence-root>/<artifact_id>/<member>` dan dicincang sebagai SHA-256. Rekod PASS tanpa bukti, fail yang hilang atau ditukar, laluan tidak selamat atau pautan sym menghalang pengesahan. Fail yang hilang tidak bersamaan dengan log yang berjaya kosong. Semakan SHA/run/attempt sedia ada kekal bebas: bait yang sepadan tidak boleh menyelamatkan resit yang lapuk. Integriti fail bukan bukti keaslian pelaksanaan atau promosi artifak.

### DAST menggunakan binaan CI yang disahkan

Tugas `dast-smoke` CI yang diperlukan memanggil `.github/workflows/dast-smoke.yml` selepas `build`. Ia mengikuti pemilihan code/draft yang sama seperti binaan, termasuk PRs fork yang disokong, PRs sasaran keluaran dan kumpulan gabungan. Kerja DAST yang hilang, gagal, dibatalkan atau dilangkau secara tidak dijangka menyekat `Gate / CI`. Aliran kerja boleh guna semula tidak mempunyai pencetus PR/dispatch bebas; pengesahan manual menggunakan penghantaran CI supaya binaan dan pengguna kekal dalam satu larian.

`scripts/ci/next-build-provenance.mjs` mengelak artifak Seterusnya penuh dengan pencernaan tar, repository/event/run, percubaan pengeluar, head/base/checkout/tree, identiti aliran kerja, fail kunci, Nod version/ABI tepat, platform dan pengikat. DAST memilih ID artifak tidak berubah daripada `needs.build.outputs`, memerlukan pengesahan ringkasan muat turun dan cincang ZIP secara bebas terhadap ringkasan pengeluar sebelum mengekstrak dua ahlinya yang disenaraikan dibenarkan melalui `scripts/ci/unpack-ci-build.py`. Arkib manifes dan tar juga mesti sepadan dengan output pengeluar bebas sebelum pokok Seterusnya diekstrak. Ia tidak pernah mencari binaan cawangan terkini yang berjaya. Siaran semula separa boleh menggunakan semula percubaan pengeluar yang sama apabila ID dan semua inputnya masih sepadan; resit merekodkan kedua-dua percubaan.

Pengguna kekal pada pelari Linux yang dihoskan dengan kebenaran repositori baca sahaja dan tiada rahsia repositori. Ia memasang versi Node tepat pengeluar, kemudian memasang CLI dengan `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` menolak pelayan kendiri yang hilang sebelum sebarang binaan sandaran; binaan CLI tempatan biasa mengekalkan sandaran sedia ada. Kesediaan pelayan, Skema dan promptfoo mesti berjaya dalam had kerja 25 minit yang tidak berubah. Resit asal membuktikan identiti input dan bait, bukan imbasan DAST yang berjaya. Tamat tempoh artifak, gangguan pelari atau pengimbas yang gagal kekal sebagai bukti yang tidak lengkap atau gagal; ia tidak boleh menjadi PASS melalui pembalut nasihat.

### kapasiti pelaksanaan UI

CI menjalankan inventori UI penuh sebagai empat serpihan matriks `test-vitest`, setiap satunya dengan paling banyak dua pekerja setiap serpihan dan tarikh akhir kerja 15 minit sedia ada. Serpihan pertama juga menjalankan suite MCP/autoCombo Vitest. Hasil kerja yang diperlukan meliputi setiap kaki matriks; kegagalan atau pembatalan satu serpihan tidak boleh menetapkan kemasukan calon.

Pemerhati setiap malam menyimpan resit calon tepat yang berasingan untuk setiap serpihan UI, termasuk pelaksanaan MCP dalam resit pertama. Keempat-empat resit, log dan identiti pelaksanaan yang sepadan diperlukan. `npm run test:vitest:ui` tempatan masih memilih suite lengkap; satu larian `--shard` hanyalah bukti separa.

### Pengumpulan liputan unit

Dua belas serpihan unit mengumpul liputan V8 semasa pelaksanaan ujian sedia ada mereka. Serpihan yang berjaya menjalankan `scripts/ci/compact-v8-coverage.mjs` untuk memampatkan fail asal tanpa menghasilkan laporan Istanbul perantaraan. Tugas Liputan akhir mengesahkan kesemua dua belas manifes terhadap calon SHA, masa jalan, punca punca dan cincang data, kemudian menjalankan wartawan c8 dan ambang liputan sedia ada. Input mengekalkan susunan nama fail global c8; pra-gabungan per-shard adalah tidak selamat untuk liputan function/block bercampur. Serpihan yang hilang, cacat bentuk atau tidak serasi gagal diterima. Serpihan ujian yang gagal mengekalkan liputan diagnostik mentah secara berasingan; ia tidak boleh memasuki gabungan terakhir.

### Resit kemajuan pelaksanaan unit

Perintah `test:unit:ci:shard` yang dikongsi merekodkan fasa `primary`, `dashboard` dan `serial` melalui `scripts/ci/unit-progress-reporter.mjs`. Laporan ujian biasa masih tersedia. Resit metadata sahaja yang berasingan merekodkan setiap permulaan dan penyiapan fail, dan degupan jantung selama 30 saat menyenaraikan fail yang masih aktif dan masa berlalu. Ia hanya merekodkan metadata pelaksanaan tersenarai yang dibenarkan; perihalan ujian, output, badan ralat dan persekitaran penuh tidak bersiri.

CI mengekalkan fail JSONL sebagai `unit-progress-ci-<run>-<attempt>-<shard>`. Tamat masa kerja boleh menghalang muat naik kemudian; degupan jantung yang telah dikeluarkan kekal sebagai bukti diagnostik. Degupan jantung yang hilang juga boleh mencerminkan proses pelari yang disekat atau ditamatkan. Resit ini mengekalkan pemilihan ujian sedia ada, keselarasan, tarikh akhir dan status keluar; mereka bukan keputusan kemasukan calon.

### Gabungkan baris gilir

Label `queue` menghantar PR ke baris gilir Mergify (`.mergify.yml`). Mergify membuka draf PR pada cawangan `mergify/merge-queue/`, CI menjalankan pilihan penuh di sana dan PR asal bergabung apabila `Gate / CI`, `Gate / Quality` dan `Merge integrity (changelog + generated skills)` lulus.

Mergify menulis ringkasan baris gilirnya ke dalam huraian draf. Acara Body/title-only `pull_request` `edited` menggunakan kumpulan konkurensi khusus jalankan dan tidak menjalankan semula pengelasan, menguji matriks, menggabungkan integriti atau keputusan kemasukan. Nama semakan pemerhatian sahaja tidak boleh menggantikan `Gate / CI` atau `Gate / Quality`. Suntingan yang mengubah asas sasaran meminta pengesahan calon baharu.

Selepas dequeue, tolakan tidak selalunya requeue PR. Komen `@mergifyio queue` padanya.

### Inventori imbasan statik

Inventori npm-alias versi dan keahlian imbasan statik hidup dalam `config/quality/gate-manifest.json`. Jalankan `npm run check:gate-manifest` untuk mengesahkan nama skrip dan arahan tepat terhadap `package.json`; penambahan, pengalihan keluar dan hanyut arahan gagal kedua-dua cangkuk tempatan dan kerja klasifikasi perubahan dalam CI. Alias bukan kerja aliran kerja, contoh matriks atau kes ujian: kiraan ini tidak boleh ditunjukkan sebagai boleh ditukar ganti.

Gunakan `npm run quality:scan -- --list` atau `npm run quality:scan:fast -- --list` untuk memeriksa alias yang dipilih tanpa melaksanakannya. Pelari menggunakan titik masuk npm, jadi masa jalannya (termasuk Bun apabila dikonfigurasikan) dikekalkan. Manifes merekodkan alias di luar profil tersebut sebagai digunakan secara berasingan dan arahan penyelenggaraan adalah dilarang dalam profil imbasan baca sahaja.

Profil ini meliputi imbasan statik sahaja. Mereka tidak memperakui ujian produk, liputan, pembungkusan, semakan luaran atau penerimaan keluaran penuh calon. Kemasukan aliran kerja menggunakan `config/quality/admission-policy.json` dan `scripts/quality/admission-verdict.mjs` yang dipautkan. Profil pemerhati keluaran kekal berasingan; memeriksa cek dan resit yang berkenaan secara bebas. Arahan statik pemerhati penuh diisytiharkan dalam `config/quality/release-green-static-profile.json`, termasuk `audit:deps`, pemilihan ujian mutasi dan semakan terjemahan. Pemuat mengesahkan arahan npm terhadap package.json dan perisytiharan CI/Quality yang dimodelkan; ia menolak drift dan bukannya melaksanakan token shell sebagai hujah. Pengeluaran SKIP/INCOMPLETE pengimbas yang diperlukan tidak dapat mewujudkan PASS. Profil merekodkan pengecualian luarannya dan tidak menggantikan liputan yang dihoskan, matriks ujian, pakej atau bukti penggunaan. Inventori prosa di bawah adalah rujukan, bukan bukti bahawa pintu pagar benar-benar berjalan.

Skrip hidup di bawah `scripts/check/` (pintu polisi) dan `scripts/quality/` (enjin ratchet). Sumber kebenaran CI ialah `.github/workflows/ci.yml`.

### Kesihatan dokumentasi asas diterbitkan

`.github/workflows/i18n-base-health.yml` memerhati kesihatan dokumentasi selepas menolak terpilih ke `main` dan `release/v*`, dan pada penghantaran manual. Penapisnya meliputi dokumentasi, Markdown akar, `llm.txt`, terjemahan state/configuration dan alat i18n yang berkaitan. Tugas `Published base documentation health` tunggal menggunakan Ubuntu yang dihoskan dan tarikh akhir lima minit. Ia melaksanakan pengesahan baca sahaja dan menulis resit diagnostik tanpa pemasangan pergantungan, terjemahan atau penerimaan negeri.

`scripts/i18n/check-base-health.mjs` memerlukan sifar sumber cincang, sasaran yang hilang, cincang sasaran, terjemahan basi dan bahagian-cache tidak konsisten. Ia juga mengesahkan skop document/locale teras semasa dan asalnya yang direkodkan. Konteks tidak sah, liputan tidak lengkap atau penyemak yang terganggu menghasilkan `INCOMPLETE`; drift yang disahkan menghasilkan `FAIL`. Kedua-duanya mengembalikan status keluar yang gagal. Resit terikat untuk membayar SHA, aliran kerja, jalankan dan percubaan, dan dikekalkan sebagai `i18n-base-health-<sha>-<run>-<attempt>`.

Ini adalah pemerhatian bebas terhadap pangkalan yang diterbitkan. Ia tidak menambah acara PR atau gabungan kumpulan, semakan PR yang diperlukan, alias npm atau ahli profil imbasan statik. Pemeriksa asas juga menyekat semua lima kelas dalam mod mutlak. Penyediaan PR biasa kekal berasingan daripada kemasukan. Muat naik yang berjaya tidak boleh menukar hasil kesihatan yang gagal menjadi PASS.

PR biasa menggunakan `--preflight` dengan laporan asas yang dijana oleh `--baseline-evidence`. Ia mungkin meninggalkan sumber bahasa Inggeris tertunda hanya apabila rekod terjemahan lengkap dan bait sasaran sebenar tidak berubah daripada pangkalan yang tepat itu. Ketidakkonsistenan sasaran atau bahagian cache baharu masih menyekat dan bukti yang tidak lengkap tidak boleh membenarkan penyediaan. Laporan itu mendedahkan `preparationPending` dan `mergeReady` secara berasingan: penyediaan yang berjaya tidak membuat terjemahan yang belum selesai sedia untuk digabungkan. Segarkan semula cermin yang terjejas dalam calon yang digubah sebelum kemasukan. Calon baris gilir Mergify yang dipercayai, `merge_group`, tolak cawangan dan larian CI manual menggunakan penyemak mutlak, tanpa `--warn` atau pengampunan kegagalan yang diwarisi. Cincang sasaran yang tiada dan skop yang dikurangkan dengan fail teras direkodkan yang dipadamkan tidak boleh menghasilkan keputusan mutlak yang berjaya.

### Keluarkan laluan pantas PR (`quality.yml`)

`.github/workflows/quality.yml` melengkapkan CI pada main/release PRs, menolak ke `main`, menghantar dan menggabungkan kumpulan. PRs menggunakan semakan pantas ditapis laluan. Binaan pendua yang dilumpuhkan secara kekal telah dialih keluar; cek build/package/boot sebenar kekal dalam CI. Suite unit dan vitest dijalankan hanya dalam CI (`Unit Tests (N/12)` dan `Vitest`).

| Kerja                                            | Skop                                                                                                                                                                                                               | Menyekat           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Rujukan dokumen API dan semua dokumen                                                                                                                                                               | ya                 |
| `Fast Quality Gates`                             | Kod PRs; semakan statik, semakan taip, semakan taip papan pemuka, ujian unit terjejas                                                                                                                              | ya                 |
| `Forgotten sibling tests`                        | Kod PRs; menukar modul yang dikesan kepada pengguna statik dan ujian adik-beradik calon; laluan laras dan import dinamik dilaporkan sebagai diagnostik nasihat, dengan pengecualian senarai kebenaran yang dirujuk | **Nasihat**        |
| `No new ESLint warnings`                         | Kod PRs; pengawal lin yang sedar penindasan                                                                                                                                                                        | Ya, termasuk garpu |
| `Merge integrity (changelog + generated skills)` | PRs bukan draf ; changelog dan penyegerakan kemahiran yang dijana                                                                                                                                                  | Ya, termasuk garpu |

#### Laporan ujian adik-beradik terlupa

`npm run check:forgotten-sibling-tests` berjalan sebagai langkah nasihat `Fast Quality Gates` dan menggunakan semula penyelesai import di belakang peta kesan ujian. Untuk setiap modul pengeluaran yang diubah, ia melaporkan rantaian `changed module/symbol -> static consumer -> candidate sibling test` yang menentukan apabila ujian calon tidak hadir dalam perbezaan permintaan tarik. Ringkasan Markdown dan hasil JSON dikekalkan sebagai artifak aliran kerja `forgotten-sibling-tests` untuk penentukuran sebelum sebarang pelancaran penyekatan.

Eksport semula tong dan import dinamik adalah diagnostik resolusi sahaja; mereka tidak pernah mencipta penemuan menyekat. Pengecualian yang disemak secara langsung di `config/quality/forgotten-sibling-allowlist.json`. Setiap entri mesti menamakan ujian pengguna dan calon, memberikan rasional tertentu dan memautkan isu GitHub atau permintaan tarik. Entri cacat gagal ditutup. Pengecualian tidak boleh menyekat ujian calon yang dipadamkan atau perbezaan yang menambah `.skip`/`.todo`; kelemahan penegasan dan penyamaran lain kekal dimiliki oleh pintu `check:test-masking` yang menyekat secara bebas.

### Pekerjaan: `lint`

Berjalan pada setiap PR hingga `main`. Blok bergabung apabila gagal.

| Skrip (`npm run ...`)             | Mengesahkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Menyekat                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `check:node-runtime`              | Versi Node.js berada dalam julat yang disokong                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ya                                      |
| `check:cycles`                    | Import pekeliling merentas semua `src/` + `open-sse/` (berasaskan AST, tsconfig `paths` diselesaikan). Keluar kosong 1 apabila wujud sebarang kitaran (gagal ditutup sejak #15281) dan menyenaraikan SCCs. `check:cycles:ratchet` (apa yang dijalankan CI ) menyekat apabila kiraan melebihi siling `metrics.cycles` dalam `quality-baseline.json` — pada masa ini 14, `direction: down`, jadi ia hanya boleh jatuh (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya (ratchet)                            |
| `check:boundary`                  | Gandingan `open-sse → src` : import fail-ke-fail unik daripada enjin ke dalam apl (`scripts/quality/measure-boundary.mjs`; senarai tepi ialah tunggakan pemulihan core/module-split v4). Laporan nasihat = kosong (sama seperti `quality:boundary`). `check:boundary:ratchet` (apa yang dijalankan CI, juga dalam gelung ratchet gerbang cepat `quality.yml` ) menyekat apabila kiraan melebihi siling `metrics.boundaryOpenSseToSrc` dalam `quality-baseline.json` — yang disemai pada 771, `direction: down` yang diukur; `--update` hanya menurunkannya; asas-relatif pada PRs (`--base-ref`, lihat di bawah)                                                                                                                                                                                                                                                                                                                                                                                             | Ya (ratchet)                            |
| `check:route-validation:t06`      | Skema Zod hadir pada semua laluan (dasar Tahap 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ya                                      |
| `check:any-budget:t11`            | Kiraan `@ts-expect-error // any` tidak melebihi bajet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ya                                      |
| `check:provider-consistency`      | Setiap penyedia dalam `providers.ts` mempunyai entri yang sepadan dalam `providerRegistry.ts` (dan sebaliknya, dalam senarai yang dibenarkan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ya                                      |
| `check:model-lifecycle`           | Tiga jadual penghalaan yang diselenggara dengan tangan kekal konsisten dengan petikan kitaran hayat daftar masuk (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tidak menjaringkan id bersara yang boleh dihalakan `REGISTRY` ; setiap sasaran `BUILT_IN_ALIASES` hadir dalam `REGISTRY` dan tidak hadir dalam petikan id bersara; setiap id bersara yang masih dalam `REGISTRY` dimajukan atau disenaraikan dalam `allowedRetiredInCatalog`; dan tiada sumber atau sasaran `DEFAULT_DEGRADATION_MAP` kelihatan bersara dalam petikan itu. Ini tidak membuktikan bahawa model sedang dilayan oleh huluan langsung. — luar talian membandingkan dengan `config/quality/model-lifecycle.json`, dimuat semula dengan tangan dengan `npm run quality:refresh-model-lifecycle` (rangkaian; tidak berwayar ke CI). `allowedRetiredInCatalog` ialah ratchet terbakar: tambahkan entri hanya dengan isu penjejakan.                                                                                                    | ya                                      |
| `check:fetch-targets`             | Setiap `fetch("/api/...")` dalam `src/` sebelah pelanggan menyelesaikan kepada `route.ts` sebenar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ya                                      |
| `check:deps`                      | Semua `npm install` -able dep merentasi setiap `package.json` dalam repo adalah dalam `dependency-allowlist.json`; pakej baru yang tidak disemat atau bersepah dibenderakan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ya                                      |
| `audit:deps`                      | audit npm ke atas semua lima fail kunci bebas (root, Electron, pemalam OpenCode v1/v2 dan pembekal). Blok nasihat kritikal; nasihat yang tinggi kekal sebagai amaran yang boleh dilihat. Audit Missing/failed ialah INCOMPLETE dan blok; cincangan dan laporan kunci setiap skop dikekalkan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ya                                      |
| `check:lockfile`                  | Integriti `package-lock.json` Pendaftaran — https, cincang integriti, tiada penggantian hos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ya                                      |
| `check:licenses`                  | Senarai dibenarkan lesen SPDX untuk tanggungan pengeluaran                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ya                                      |
| `check:tracked-artifacts`         | Tiada artifak binaan / symlink `node_modules` komited (juga berjalan dalam pra-komit husky; pra-tolak sengaja ringan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ya                                      |
| `check:ai-attribution`            | Tiada treler AI/bot `Co-Authored-By` atau pengaki generasi AI dalam PR melakukan, tajuk atau badan — Peraturan Keras #16 (dalam gelung gerbang cepat `quality.yml` untuk PR→ `release/**` — membaca muatan acara, tiada operasi PRs — `main` langkah PR sahaja dalam `ci.yml` lint untuk PR→ juga; pengarang bersama #14436 `commit-msg`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | Setiap pengecualian Vitest menamakan isu penjejakan dan muncul dalam `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ya                                      |
| `check:file-size`                 | Fail sumber (`.ts`/`.tsx` dalam `src/`, `open-sse/`, `electron/`, `bin/`) kekal dalam `cap` dan fail ujian (`*.test.ts(x)`) dalam `testCap`; fail yang dibekukan dalam `file-size-baseline.json` (`frozen` / `testFrozen`) tidak boleh membesar melebihi saiz yang direkodkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ya                                      |
| `check:error-helper`              | Respons ralat dalam executors/handlers menggunakan `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ya                                      |
| `check:migration-numbering`       | Fail SQL Migrasi dinomborkan mengikut urutan, tiada jurang atau pendua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ya                                      |
| `check:public-creds`              | Tiada kunci OAuth `client_id`/`client_secret` atau Firebase Web literal di luar `publicCreds.ts` (Peraturan Keras #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ya                                      |
| `check:db-rules`                  | Tiada SQL mentah di luar modul `src/lib/db/` ; tiada import tong daripada `localDb.ts` (Peraturan Keras #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ya                                      |
| `check:known-symbols`             | Pelaksana pembekal, strategi penghalaan dan penterjemah yang didaftarkan dalam jadual penghantaran mereka sepadan dengan fail pada cakera — tiada simbol yatim atau tidak diisytiharkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ya                                      |
| `check:route-guard-membership`    | Setiap laluan yang melahirkan proses kanak-kanak dikelaskan oleh `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ya                                      |
| `check:test-discovery`            | Setiap fail `*.test.ts` / `*.spec.ts` dalam repo dikumpul oleh sekurang-kurangnya seorang pelari ujian (ratchet: senarai anak yatim dalam `test-discovery-baseline.json` hanya boleh mengecil)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ya                                      |
| `check:test-tla-order`            | Tiada fail `node:test` di bawah `tests/unit` mendaftarkan ujian, mencapai `await` peringkat teratas, kemudian mendaftar lebih banyak (#18045; ratchet: `test-tla-order-allowlist.json` hanya boleh mengecil)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ya                                      |
| `check:agent-skills-sync`         | Artifak kemahiran ejen yang dijana sepadan dengan katalog sumbernya (tiada drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Pembekal logos/assets membawa catatan asal yang direkodkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | Fail konfigurasi JSON menghuraikan dan memenuhi peraturan repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Kompilasi TypeScript tanpa ralat (amaran nasihat sahaja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ya                                      |
| `typecheck:noimplicit:core`       | `noImplicitAny` — yang tegas berpandangan ke hadapan; banyak tapak panggilan sedia ada masih memerlukan anotasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Nasihat** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` berskop kepada `src/app/(dashboard)/**` (#7033) Senarai kebenaran 27 fail yang dipilih susun — tidak termasuk mana-mana papan TSX `typecheck:core` dan `next build` tidak pernah menaipnya sama ada (`next.config.mjs` menetapkan `ignoreBuildErrors: true`), jadi regresi pengecam yatim di sana (#6625/#6909) tidak dapat dilihat oleh CI. Berbeza dengan garis dasar kiraan per-file/per-TS-code beku (`config/quality/dashboard-typecheck-baseline.json`, corak penguatkuasaan lapuk yang sama seperti `check:known-symbols`) — sahaja ralat NEW di luar kiraan garis dasar gagal masuk; turunkan dengan `--update` apabila ralat sedia ada dibetulkan.                                                                                                                                                                                                                                                                                                                                            | ya                                      |
| `check:build-typecheck`           | Semakan jenis pengeluaran seluruh apl ke atas `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), senarai kebenaran 27 fail `typecheck:core` permukaan dan pintu papan pemuka tidak meliputi. Berbeza dengan `config/quality/build-typecheck-baseline.json`; kiraan per-(fail, kod) baharu atau dinaikkan gagal, kiraan yang lebih rendah meminta anda merangkak. `--update` menolak semasa larian mengandungi pasangan baharu atau dinaikkan melainkan `--force-regressions` diluluskan, dan menolak fail yang baru disenyapkan melainkan `--force-nocheck` diluluskan, jadi meluaskan garis dasar untuk menjadi hijau dan memberikan senyap kekal adalah dua tindakan sengaja yang berasingan. `--force` kosong ditolak. Juga mengimbas skop binaan untuk `@ts-nocheck` terhadap `config/quality/ts-nocheck-baseline.json`, kerana fail yang menggunakannya tidak melaporkan diagnostik sama sekali dan sebaliknya tidak dapat dilihat oleh setiap pintu masuk. | ya                                      |

#### Dua atur cara semak taip menjawab secara berbeza

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) dan `check:build-typecheck` menyusun atur cara yang berbeza di bawah pilihan yang berbeza, dan fail yang sama boleh bersih dalam satu dan penuh dengan ralat pada yang lain.

`tsconfig.build.json` menetapkan `"strict": false`, jadi `noImplicitAny` dimatikan. Konfigurasi teras menyusun senarai dibenarkan 27 fail yang dipilih susun dengan pilihan yang lebih ketat dan mengikut graf import setiap entri, jadi fail yang tidak pernah muncul dalam program binaan masih disemak di sana.

Akibatnya penting apabila menilai sama ada fail ditaip:**diagnostik sifar di bawah `check:build-typecheck` tidak bermakna sifar** . Mengeluarkan `@ts-nocheck` daripada 26 fail menunjukkan 23 daripadanya bersih dalam program binaan; enam belas daripadanya memunculkan kira-kira 120 tersirat-sebarang kesilapan dalam yang ketat. Semak kedua-duanya sebelum memanggil fail bersih.

### Pekerjaan: `quality-gate`

Berlari selepas `test-coverage`. Blok bergabung apabila gagal.

| Skrip                        | Mengesahkan                                                                                                                                                                 | Menyekat          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `quality:collect`            | Mengeluarkan `quality-metrics.json` ( kiraan amaran ESLint, liputan daripada laporan serpihan gabungan)                                                                     | Ya (hulu ratchet) |
| `quality:ratchet`            | Setiap metrik dalam `quality-baseline.json` tidak mundur (ESLint memberi amaran garis dasar ≤ ; liputan garis dasar ≥ )                                                     | ya                |
| `check:duplication`          | Penduaan kod (jscpd@4) tidak melebihi garis dasar dalam `quality-baseline.json`                                                                                             | ya                |
| `check:complexity`           | Kerumitan siklomatik peringkat fail tidak melebihi had (teras ESLint `complexity` + `max-lines-per-function`)                                                               | ya                |
| `check:cognitive-complexity` | Kerumitan kognitif ratchet (`eslint-plugin-sonarjs`) — lulus ESLint berasingan; CI menjalankan kedua-duanya digabungkan sebagai langkah `check:complexity-ratchets` tunggal | ya                |
| `check:dead-code`            | Eksport / fail yang tidak digunakan ratchet (knop) tidak mundur berbanding garis dasar                                                                                      | ya                |
| `check:compression-budget`   | Bajet penanda aras mampatan — per-enjin tingkat penjimatan token tidak boleh mundur                                                                                         | ya                |
| `check:type-coverage`        | Ratchet ditaip peratus (`type-coverage`) tidak mundur; sebahagian besarnya merangkumi `typecheck:noimplicit:core`                                                           | ya                |

### Pekerjaan: `codeql-scan` dan `codeql-admission`

`codeql-scan` menghasilkan semua kategori analisis yang dikonfigurasikan. Selepas kerja itu berjaya, `codeql-admission` mengesahkan muat naiknya yang tepat dan ratchet amaran calon. Kedua-duanya adalah kebergantungan yang diperlukan `Gate / CI`, termasuk calon dokumen sahaja. Keperluan pengaktifan pentadbiran dan kenari diterangkan di bawah "CodeQL ratchet" di bawah.

| Skrip                  | Mengesahkan                                                                                                                                                                                          | Menyekat |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:codeql-ratchet` | Calon ref/SHA dan semua kategori analisis yang dikonfigurasikan mestilah terkini sebelum ratchet amaran; blok bukti yang hilang. Inventori global kekal — berasingan lihat "CodeQL ratchet" di bawah | ya       |

### Pekerjaan: `quality-extended`

Pekerjaan menyekat calon yang berkenaan. Saiz himpunan, penemuan rahsia, penemuan kelemahan, penemuan aliran kerja dan perubahan OpenAPI disemak dengan ratchet yang diperlukan. Diagnostik pergantungan bulat kekal sebagai nasihat. Pemasangan pengimbas diperlukan: `scripts/ci/install-quality-scanners.sh` menyediakan versi yang disematkan dan menyebarkan kegagalan pemasangan. Alat yang tiada, laporan tidak sah atau garis dasar yang tiada meninggalkan gerbang pengimbas yang diperlukan INCOMPLETE.

| Skrip                    | Mengesahkan                                                                                                                                                                                                               | Menyekat                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Tiada kebergantungan bulat (dpdm)                                                                                                                                                                                         | **Nasihat**                                              |
| `check:bundle-size`      | Saiz bundle tidak melebihi penutup; pengukuran yang tidak tersedia gagal                                                                                                                                                  | **Menyekat dengan --ratchet**                            |
| `check:secrets`          | Penemuan Gitleaks tidak mundur; imbasan yang diperlukan menolak tools/source/baseline yang hilang, imbasan gagal dan laporan tidak sah                                                                                    | **Menyekat dengan --ratchet**                            |
| `check:vuln-ratchet`     | Ketergantungan kelemahan tidak mundur; imbasan yang diperlukan menolak alat yang hilang, laporan tidak sah atau garis dasar yang hilang                                                                                   | **Menyekat dengan --ratchet**                            |
| `check:workflows`        | Aliran kerja lint (actionlint + zizmor); Pengimbas missing/broken, laporan tidak sah atau garis dasar ratchet yang hilang gagal sebagai INCOMPLETE. Penemuan yang sah mengikut dasar strict/advisory/ratchet yang dipilih | Pelaksanaan diperlukan; zizmor ratchet blocking dalam CI |
| `check:openapi-breaking` | Kontrak API awam terhadap komit acara yang disematkan (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); pengukuran yang diperlukan gagal ditutup                                    | **Menyekat dengan --ratchet**                            |

### Pekerjaan: `docs-sync-strict`

Untuk permintaan tarik kepada `main` atau `release/**`, tugas ini hanya dijalankan untuk calon bukan draf (atau baris gilir dipercayai) yang diklasifikasikan sebagai dokumentasi atau perubahan kod. Ia juga berjalan pada acara CI bukan PR; pencetus tolak aliran kerja ini meliputi `main` sahaja, bukan `release/**`. Langkah yang keluar bukan sifar menghalang kerja; penemuan laporan sahaja dan pengecualian yang didokumenkan di bawah tidak.

| Skrip                          | Mengesahkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Menyekat                                                                                                                                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate yang menjalankan 7 sub-gate di bawah secara berurutan                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ya                                                                                                                                              |
| ↳ `check:docs-sync`            | Ketekalan versi Package/OpenAPI/CHANGELOG, cermin `llm.txt` tepat, invarian CHANGELOG section/size diterjemahkan dan ketiadaan dokumen pendua diganti                                                                                                                                                                                                                                                                                                                                                                      | ya                                                                                                                                              |
| ↳ `check:docs-frontmatter`     | Halaman dokumentasi yang disusun membawa tajuk frontmatter yang sah                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ya                                                                                                                                              |
| ↳ `check:docs-counts`          | Invarian kiraan berkeyakinan tinggi adalah ketat; semakan kiraan fail heuristik hanya memberi amaran melainkan skrip menerima `--strict` (gerbang meta CI tidak melepasinya)                                                                                                                                                                                                                                                                                                                                               | Sekatan peringkat yang ketat; nasihat peringkat lembut                                                                                          |
| ↳ `check:env-doc-sync`         | Sumber env reads, `.env.example`, dan `docs/reference/ENVIRONMENT.md` bersetuju selepas senarai kebenaran abaikan, dokumen sahaja dan env sahaja yang eksplisit                                                                                                                                                                                                                                                                                                                                                            | Ya, di luar senarai kebenaran yang didokumenkan                                                                                                 |
| ↳ `check:deprecated-versions`  | Melaporkan kemungkinan versi lapuk di luar konteks sejarah yang selamat dan tarikh kemas kini lapuk, tidak termasuk dokumen yang diabaikan                                                                                                                                                                                                                                                                                                                                                                                 | Nasihat dalam pendawaian CI semasa (`--strict` tidak diluluskan)                                                                                |
| ↳ `check:doc-links`            | Pautan penurunan harga dalaman dalam dokumen diselesaikan ke fail sebenar ( borang `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                                                     | ya                                                                                                                                              |
| ↳ `check:fabricated-docs`      | Laluan, env vars, arahan CLI, nama cangkuk dan laluan fail yang disebut dalam dokumen wujud dalam pangkalan kod. Pintu keras melalui `--strict`; soft-fail tanpa bendera.                                                                                                                                                                                                                                                                                                                                                  | Ya (melalui `--strict` dalam CI)                                                                                                                |
| `check:cli-i18n`               | Kekunci CLI `t()` terpakai wujud dalam `en`; `pt-BR` mengekalkan setiap bahagian peringkat atasan; `zh-CN` dan `zh-TW` mengandungi setiap kunci daripada `en`                                                                                                                                                                                                                                                                                                                                                              | ya                                                                                                                                              |
| `check:openapi-coverage`       | Spesifikasi OpenAPI meliputi sekurang-kurangnya satu lantai laluan sebenar                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ya                                                                                                                                              |
| `check:openapi-security-tiers` | Anotasi `x-loopback-only`/`x-always-protected` yang diisytiharkan mesti disokong oleh `routeGuard.ts`; blok penghurai dan ketakpadanan hadapan. Semakan terbalik untuk `x-loopback-only` yang hilang di bawah awalan tempatan sahaja memberi amaran dan laluan corak sahaja dikecualikan daripada pas terbalik itu.                                                                                                                                                                                                        | Parser/forward menyemak penyekatan; nasihat semak terbalik                                                                                      |
| `check:openapi-routes`         | Setiap laluan `/api...` dalam `openapi.yaml` menyelesaikan parameter-tidak sensitif kepada laluan sebenar selepas senarai dibenarkan `KNOWN_STALE_SPEC` yang dibenarkan; penyertaan senarai dibenarkan basi juga gagal                                                                                                                                                                                                                                                                                                     | ya                                                                                                                                              |
| `check:docs-symbols`           | Rujukan `/api/...` URL dalaman dalam dokumen bukan cermin berkanun diselesaikan kepada laluan sebenar atau keluarga laluan; Rujukan proxy/upstream/placeholder/file dan entri `KNOWN_STALE_DOC_REFS` yang wajar dikecualikan, dan entri senarai dibenarkan yang lapuk gagal                                                                                                                                                                                                                                                | ya                                                                                                                                              |
| `i18n translation drift`       | Kemasukan mutlak memerlukan sumber sifar, tiada sasaran, cincang sasaran, terjemahan basi dan bahagian-cache tidak konsisten. Penyediaan PR biasa mungkin mengekalkan bukti yang diwarisi yang tepat atau perubahan dalam bahasa Inggeris sahaja yang belum selesai dengan keadaan lengkap dan bait sasaran yang tidak berubah; laporannya secara berasingan mengisytiharkan kesediaan gabungan. Cincang sasaran tiada dan blok bukti asas yang tidak lengkap. Cache bahagian warisan yang tidak hadir bukanlah kegagalan. | Kesemua lima kelas menyekat kemasukan queue/base ; permit penyediaan biasa hanya terbukti warisan atau kerja Inggeris sahaja yang belum selesai |

Dua belas README SVGs di bawah `docs/diagrams/` dijana (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` menjana semula kesemuanya). Setiap satu mempunyai ujian unit banding bait (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) yang gagal apabila fail komited basi, dan `check:docs-counts` membaca nombor kanonik daripada nod `<text>` mereka — itulah sebabnya langkah menggariskan mengekalkan setiap rentetan yang digariskan dalam fail sebagai `<text>` yang tidak kelihatan. Semakan nombor kanonik SVG membaca fail yang disenaraikan dalam `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, tambah `public/images/tier-flow-dark.svg` dan `tier-flow-light.svg`; tuntutan percuma selamanya, kemasukan katalog, kumpulan berulang dan faktor pemarkahan juga dibaca `promise-pillars.svg`, `free-tier-budget.svg` dan `strategies-grid.svg`. `free-tier-budget.svg` mengeluarkan angkanya daripada pemuat katalog langsung, jadi perubahan kepada `FREE_MODEL_BUDGETS` atau nama paparan pembekal akan menjadikan CI merah sehingga fail itu dijana semula.

### Pekerjaan: `i18n-ui-coverage`

| Skrip                                   | Mengesahkan                                                                                                                                                                                                                  | Menyekat     |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (dalam talian) | Perlindungan utama UI i18n ialah ≥ 65%                                                                                                                                                                                       | ya           |
| `check-ui-value-drift` (dalam talian)   | Bahasa Inggeris yang ditulis semula **nilai** tidak meninggalkan terjemahan basi di belakang                                                                                                                                 | ya           |
| `check-new-key-coverage` (dalam talian) | A **baru** Kunci bahasa Inggeris diterjemahkan dalam setiap tempat — penanda `__MISSING__:` ditolak                                                                                                                          | ya           |
| `check-translation-ratio`               | Nisbah terjemahan sebenar bagi setiap tempat (sama-dengan-Bahasa Inggeris / pemegang tempat / daun yang hilang di luar senarai yang dibenarkan) tidak boleh melebihi `config/quality/i18n-translation-baseline.json` + slack | **Menyekat** |

Memerlukan `fetch-depth: 0` — get nilai hanyut berbeza `en.json` terhadap asas gabungan.

#### Gerbang terjemahan basi `check-ui-value-drift` —

Menangkap regresi i18n yang tidak dapat dilihat oleh gerbang lain secara berstruktur: nilai bahasa Inggeris ditulis semula dan terjemahan yang diperoleh daripada _sebelumnya_ bahasa Inggeris kekal di belakang, jadi pengguna bukan bahasa Inggeris terus membaca salinan dengan perkataan yang yakin, kini salah.

Ini dihantar secara nyata. `oauthModal.googleOAuthWarning` telah ditulis semula apabila pembantu log masuk Antigravity mendarat (#5203);**39 daripada 43 tempat** teks terus memberitahu pengendali untuk "menyalin URL penuh dan menampalnya di bawah" — aliran yang tidak dapat diselesaikan untuk pembekal tersebut. Ia tidak disedari sehingga #8463 kerana:

- `sync-ui-keys` hanya mengisi semula kunci yang **tidak hadir** , tidak pernah yang **basi** ;
- `check-ui-keys-coverage` mengira kunci _kehadiran_, jadi terjemahan yang lapuk mendapat markah sebagai dilindungi;
- `check-translation-drift` menjejaki dokumentasi `docs/i18n/<locale>/**.md` mencerminkan — ia tidak pernah membaca `src/i18n/messages/*.json`. Menyekat `docs-sync-strict` kerja sejak penyegerakan semula 2026-09: edit dokumen teras → `npm run i18n:run -- --files=<doc>` (peringkat bahagian, murah).

**Sedar berbeza, tidak disokong garis dasar.** Ia membandingkan `en.json` di pangkalan gabungan dengan pokok kerja; untuk setiap kunci yang nilai bahasa Inggerisnya berubah, mana-mana tempat yang masih memegang terjemahan yang tidak disentuh adalah basi. ini dengan sengaja **membekukan hutang sedia ada** — a diff tidak dapat mendedahkan terjemahan bahasa Inggeris lama yang mana berasal, jadi pintu gerbang hanya menilai apa yang disentuh oleh perubahan semasa. Alternatif (garis dasar cincangan setiap kekunci) akan menelan kos fail yang dijana ~ 600 KB, 3 × garis dasar sedia ada yang terbesar, yang berputar pada setiap i18n PR.

Dua cara untuk memuaskannya:

1. kemas kini terjemahan yang terjejas, atau
2. tetapkannya kepada `__MISSING__:<new english>` — masa jalan kemudian menyajikan bahasa Inggeris yang diperbetulkan (`src/i18n/request.ts::deepMergeFallback`, #7258) dan baris gilir utama untuk terjemahan.

Jika rentetan itu **maksudnya** berubah, lebih suka **menamakan semula kunci** : kunci baharu tidak boleh mewarisi terjemahan lapuk. Itulah corak #8463 yang digunakan.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Gerbang hanyut nilai dan kunci baharu berkongsi satu perbandingan yang tidak berubah daripada `scripts/i18n/resolve-ui-diff-base.mjs`. Aliran kerja melepasi asas, petua asas dan calon SHAs yang sama kepada kedua-dua semakan. Larian PR/base-retarget, push dan merge-group menggunakan konteks acara mereka. Menghantar cawangan calon memerlukan PR terbuka yang tepat atau input `i18n_base_sha` yang jelas. Penghantaran atau pemerhatian berjadual `main` atau `release/vX.Y.Z` tanpa input itu membandingkan komitmen terakhir dengan induk pertamanya; ia bukan audit untuk semua hutang terjemahan yang diwarisi. Seruan tempatan memerlukan asas perbandingan yang jelas, contohnya arahan `BASE_REF` di atas.

Konteks perbandingan yang tiada atau samar-samar, katalog yang diperlukan tidak boleh dibaca atau tidak sah dan calon yang ditukar menghasilkan `INCOMPLETE` dengan kod keluar **2** , termasuk dalam mod amaran. Bacaan katalog gunakan `scripts/i18n/read-ui-catalog.mjs`; kegagalan membaca tidak digantikan dengan objek kosong. Tiada asas yang tidak tersedia atau input yang tidak lengkap mewujudkan PASS.

### Pekerjaan: `i18n`

Matriks pengesahan i18n penuh (satu kerja setiap tempat). Keseluruhan kerja adalah nasihat.

| Skrip                           | Mengesahkan                           | Menyekat                                                       |
| ------------------------------- | ------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Kesempurnaan terjemahan setiap tempat | **Nasihat** (`continue-on-error: true` pada keseluruhan kerja) |

### Pekerjaan: `pr-test-policy`

Berjalan atas permintaan tarik sahaja.

| Skrip                  | Mengesahkan                                                                                                                                   | Menyekat |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PRs yang menukar kod pengeluaran dalam `src/`, `open-sse/`, `electron/` atau `bin/` mesti menyertakan atau mengemas kini ujian (Hard Rule #8) | ya       |
| `check:test-masking`   | Fail ujian yang diubah tidak mengurangkan kiraan penegasan bersih atau menambah tautologi `assert.ok(true)`                                   | ya       |
| `check:pr-evidence`    | Badan PR memetik bukti test/VPS untuk perubahan itu (mekanisasi Peraturan Keras #18 dengan menangkap prosa PR — rapuh, lihat Backlog)         | ya       |

### Pekerjaan: `test-vitest`

Memerlukan kerja pengelasan `changes`. Penyatuan blok serpihan matriks yang berkenaan apabila gagal.

| Suite            | Mengesahkan                                                | Menyekat                                                                                                              |
| ---------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Pelayan MCP (110 alatan), autoCombo, cache — vitest runner | ya                                                                                                                    |
| `test:vitest:ui` | Komponen UI menguji pelari vitest —                        | **Menyekat** Kegagalan sedia ada — dikecualikan secara eksplisit dalam `vitest.config.ts`; kegagalan baru gagal kerja |

### Aliran kerja setiap malam (berjadual, nasihat)

Ini dijalankan mengikut jadual cron (dan `workflow_dispatch`), tidak pernah pada PRs. Semua adalah nasihat.

| Aliran kerja           | Mengesahkan                                                                                                                                                                    | Menyekat    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `nightly-property`     | ujian hartanah semak pantas dengan bilangan larian tinggi + benih rawak                                                                                                        | **Nasihat** |
| `nightly-resilience`   | gerbang pertumbuhan timbunan, suntikan kerosakan huru-hara, k6 load/soak                                                                                                       | **Nasihat** |
| `nightly-llm-security` | pengawal suntikan promptfoo (mod blok) probe garak + (dilangkau tanpa rahsia pembekal)                                                                                         | **Nasihat** |
| `nightly-schemathesis` | Pengaburan kontrak OpenAPI (skematesis) terhadap OmniRoute langsung menggunakan pelanggaran spesifikasi permukaan `docs/openapi.yaml` — / 500s tidak dikendalikan (Fasa 8 B.4) | **Nasihat** |
| `nightly-mutation`     | Skor ujian mutasi Stryker di atas lorong unit pantas — yang masih hidup, mutan yang masih hidup, menyatakan lemah                                                              | **Nasihat** |
| `nightly-compat`       | Matriks keserasian enjin nod merentas julat `engines.node` yang disokong                                                                                                       | **Nasihat** |

Garis dasar prestasi (timbunan, TTFB, masa bina) direkodkan, bukan berpagar: lihat [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
