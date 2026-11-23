# Self-Hosted Runner Box Operations (.113 pool) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Pool yang di-host sendiri berjalan di mesin **.113** (`tomni-proxmox-113`). Sejak 2026-10-18, setiap
runner OmniRoute memiliki **satu peran**, satu label, serta anggaran memori/CPU yang disesuaikan dengan
hasil pengukuran beban kerjanya. Slot Turbopack mendapatkan sumber daya yang dibutuhkan build; slot
lainnya disesuaikan dengan puncak penggunaan yang terukur. Mesin hanya mengalami overcommit ketika
build Turbopack bertepatan dengan build webpack Release-Green dan job lint; swap host (16 GB)
menanganinya, dan karena Build pull request berjalan di runner terkelola, slot Turbopack sebagian besar
waktu tidak digunakan:

| runner               | label          | peran                                                                                                                                                | `MemoryHigh` / `MemoryMax` | `CPUQuota`          |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------- |
| `omniroute-113-5`    | `omni-build`   | Build Turbopack: `ci.yml` `Build` (khusus push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, build a11y malam hari | 56 GB / 60 GB (swap 0)     | 1600 %              |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), build webpack                                                                                        | 20 GB / 24 GB (swap 4 GB)  | 800 %               |
| `omniroute-113-2`    | `omni-light`   | job malam hari (Schemathesis, promptfoo, garak, k6) dan `quality.yml` `lint-guard`                                                                   | 12 GB / 16 GB (swap 4 GB)  | 600 %               |
| `omniroute-113`      | `omni-light`   | pool yang sama seperti di atas                                                                                                                       | 8 GB / 12 GB               | 400 %               |
| OmniHeuris, OmniMind | (repo mereka)  | Khusus Dependabot (puncak masing-masing 155 MB, 2026-10-18)                                                                                          | 4 GB / 6 GB                | masing-masing 200 % |

Diukur pada 2026-10-18:

| sumber daya | nilai                         | implikasinya terhadap penjadwalan                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU   | **78 GB / 32 core**           | build produksi Turbopack mencapai puncak 49 GB tanpa pembatasan (`tests/unit/ci-build-bundler-webpack.test.ts`); pada Next 16.3.8, fase kompilasi saja menggunakan ~40 GB (36 GB RSS dalam `next-build` ditambah 17 worker loader masing-masing sebesar 3 GB, diukur pada 2026-10-18); build webpack menggunakan ~14–16 GB. Satu build Turbopack + satu build webpack dapat berjalan bersama; dua build Turbopack tidak |
| swap        | 16 GB                         | `omniroute-113-5` berjalan dengan swap dinonaktifkan (`MemorySwapMax=0`), sehingga build yang tidak terkendali dihentikan pada batasnya alih-alih menyebabkan mesin melakukan swap                                                                                                                                                                                                                                      |
| `/tmp`      | **tmpfs 12 GB = RAM**         | apa pun yang disimpan di sana menggunakan memori; sisa file dibersihkan setelah 3 jam                                                                                                                                                                                                                                                                                                                                   |
| CPU         | load 60 pada 32 core teramati | sebelum kuota diterapkan, satu build Turbopack (~1166 % CPU) ditambah suite coverage pada mesin yang sama membuat heartbeat listener lain kekurangan sumber daya (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                  |
| runner      | **6 listener**                | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` dinonaktifkan (`systemctl enable --now` mengaktifkan kembali salah satunya)                                                                                                                                                                                                                                                                             |

Batasan berada di `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` milik setiap unit
(nilai sebelumnya disimpan sebagai `override.conf.bak-20261018`) dan diterapkan secara live dengan
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — tanpa restart, sehingga
tidak ada job yang sedang berjalan yang terdampak. Label diubah melalui API runner
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), juga secara live.

## Instal janitor (satu kali, di mesin)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): setiap 30 menit, catat log ke /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` diperlukan: janitor memastikan suatu path sedang tidak digunakan melalui satu snapshot file
yang terbuka sebelum menghapusnya, dan tanpa alat tersebut janitor tidak menghapus apa pun serta menyatakannya
(exit 1). Uji setiap perubahan terlebih dahulu dengan `--dry-run` — opsi ini mencetak persis apa yang akan
dilakukan tanpa mengubah apa pun.

Yang dilakukannya pada setiap eksekusi: membersihkan sisa-sisa milik kita sendiri (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) setelah **3 jam di tmpfs** dan 24 jam di disk
`_work/_temp`; menghentikan `next-build` yang berusia lebih dari 75 menit (tidak ada job yang berjalan selama itu — pada
2026-08-27, satu job berjalan selama 70 menit setelah GitHub menyatakan job tersebut hilang); memangkas
checkout berusia 48 jam dari runner yang unitnya **stopped**; memberikan peringatan jika penggunaan disk ≥ 85 %, PSI memori
`full/avg60` ≥ 10 %, dan jumlah listener melebihi `MAX_ACTIVE_RUNNERS` (dengan
rincian omniroute/lainnya). Exit 1 = perlu perhatian; baca log.

Aturan 75 menit tidak mendeteksi build yang job-nya sudah dihentikan oleh GitHub. Ketika
`Runner.Listener` tidak dapat memperbarui job-nya, `_diag/Runner_*.log` menampilkan
`POST request to …/renewjob timed out after 100 seconds`, API melaporkan job sebagai `completed`
(failure) sekitar sepuluh menit setelah pembaruan terakhir yang berhasil, dan `next-build` terus berjalan tanpa
job yang terpasang (2026-10-18: Build dari #17066 dinyatakan gagal pada 19:43 dan build-nya masih
menggunakan 40 GB lima menit kemudian). Konfirmasikan ref di `_diag/Worker_*.log` terbaru, lalu
kirim SIGTERM hanya ke hierarki proses build berdasarkan PID — `next-build`, `npm run build`, `build-next-isolated.mjs`, dan
worker `_work`. Jangan pernah menyentuh `Runner.Listener`, `RunnerService.js`, atau `Runner.Worker`:
worker melaporkan job sebagai dibatalkan dan listener kembali online dengan sendirinya.

## Unit runner: KillMode

`KillMode=process` bawaan runner membiarkan `Runner.Worker → npm → next-build`
tetap berjalan saat unit dihentikan atau dimulai ulang — build yatim terus menghabiskan RAM dan
CPU tanpa job yang terpasang. Setiap unit OmniRoute memiliki drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
dengan `KillMode=mixed`: SIGTERM dikirim terlebih dahulu ke listener, lalu SIGKILL ke seluruh cgroup saat
`TimeoutStop`. Pengaturan ini berlaku pada saat unit dimulai ulang berikutnya — mulai ulang **satu runner dalam
satu waktu, hanya ketika idle**, dengan pemeriksaan kondisi idle dan perintah mulai ulang dalam perintah yang sama.

## Aturan operasional

- **Hanya satu build Turbopack dalam satu waktu — diberlakukan melalui label.** Setiap job yang menjalankan
  `next build` Turbopack penuh menargetkan `[self-hosted, omni-build]`, dan hanya **`omniroute-113-5`**
  yang memiliki label tersebut: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`,
  `preview-artifact`, build a11y malam hari (#16853), dan **amd64** di `docker-publish.yml` (webpack
  di dalam BuildKit — Turbopack mengalami panic di sana, run 33253576569). Bagian Docker arm64 tetap
  berjalan di `ubuntu-24.04-arm`. Bagian amd64 `docker-publish` berbagi concurrency group
  `heavy-build-main` dengan `Build` di `ci.yml` (`cancel-in-progress: false`). Docker Engine harus
  tersedia di `omniroute-113-5`. Slot Turbopack kedua tidak muat dalam 78 GB (2 × 33–37 GB ditambah
  penggunaan lain pada mesin); slot kedua hanya aman untuk build webpack.
- **Build pull request berjalan di hosted runner (2026-10-18).** `Build` di `ci.yml` mencapai
  `omni-build` hanya untuk `push` dan `workflow_dispatch`; setiap Build `pull_request` (dari
  repositori sendiri maupun fork) dan `merge_group` berjalan di `ubuntu-latest` dengan webpack.
  Ketika setiap PR dari repositori sendiri diarahkan ke slot tersebut, satu Build Turbopack
  menahannya selama 29–58 menit, 18 Build mengantre hingga 18 jam, dan Build push milik jalur rilis
  sendiri hanya mendapatkan slot satu kali dari 40 job. Di hosted runner, Build PR yang sama
  memerlukan 8–12 menit bersama job lain milik PR tersebut. Turbopack, bundler yang dikirimkan oleh
  `npm-publish`, tetap diuji pada jalur rilis melalui build a11y malam hari untuk branch default
  (04:41 UTC), melalui setiap Build push atau dispatch yang mencapai slot, dan melalui
  `npm-publish` itu sendiri. `tests/unit/build/heavy-build-queue.test.ts` mengunci gate dengan
  empat klausul tersebut.
- **Jangan pernah menetapkan ukuran slot Turbopack di bawah kebutuhan yang telah diukur.** Pada
  2026-10-18 pukul 18:06, slot diturunkan dari 56G/60G menjadi 40G/44G untuk menyediakan ruang bagi
  `omni-release`. Fase kompilasi berada pada `MemoryHigh` selama seluruh eksekusinya (memory PSI
  `full` 30–43%), dan `Runner.Listener`, yang menggunakan cgroup yang sama, tidak dapat memperbarui
  job-nya. Nilai 56G/60G milik owner dari 2026-10-17 dipulihkan pada hari yang sama. Di bawah nilai
  tersebut, build tidak gagal; build terus-menerus melakukan thrashing, dan job pun hilang.
- **Release-Green memiliki slot sendiri (2026-10-18).** Sebelumnya, kedua validasi Release-Green
  berjalan di `omni-build`: pada setiap push (~10/jam, 97 dari 100 run push dibatalkan saat masih
  bekerja dalam satu hari) dan tiga sweep penuh berdurasi ~2 jam per hari (sweep pukul 05:29
  menunggu slot selama 6 jam) — satu-satunya slot build mengalami kelebihan permintaan hingga
  beberapa kali kapasitasnya dan Build PR dari repositori sendiri menunggu selama berjam-jam.
  `release-green` dan `main-green` kini menargetkan `omni-release` (hanya `omniroute-113-6`) dengan
  `OMNIROUTE_USE_TURBOPACK=0`, dan run yang sudah dimulai tidak lagi dibatalkan oleh push yang lebih
  baru (slot pending tetap meredam lonjakan). `tests/unit/build/runner-capacity-routing.test.ts`
  mengunci routing, peralihan ke webpack, dan memastikan bahwa tidak ada proses di `omni-release`
  yang melakukan build dengan Turbopack.
- **Pool ringan: `omni-light`.** `omniroute-113` dan `omniroute-113-2` menjalankan proses malam hari
  yang memerlukan `next build` khusus backend (~5–6 GB; webpack) serta `lint-guard` di `quality.yml`.
  `omniroute-113` memiliki `MemoryHigh=4G` hingga 2026-10-18 — build promptfoo menghabiskan 54 menit
  melakukan reclaim di sana; 8 GB menghilangkan throttling tersebut.
- **Jumlah listener sengaja dikurangi.** Empat unit OmniRoute dinonaktifkan pada 2026-08-29 — setiap
  listener tambahan menjadi tenant lain bagi anggaran memori di atas. Batas maksimum janitor adalah
  6 (`MAX_ACTIVE_RUNNERS=6` di cron): nilai tersebut menghitung setiap `Runner.Listener` pada mesin,
  dan OmniHeuris + OmniMind menambahkan dua listener ke empat listener milik kami.
- **Jangan pernah membersihkan `/tmp` atau `_work` secara manual saat ada runner yang sibuk.**
  Proses periksa-lalu-hapus dengan jeda di antara kedua langkah tersebut menyebabkan `_work`
  milik job Build yang sedang aktif terhapus pada 2026-08-27. Janitor melakukan pemeriksaan dan
  penghapusan dalam satu langkah; biarkan janitor menanganinya.
- Menghentikan runner saat job sedang berjalan akan membatalkan job (diamati langsung):
  `systemctl stop` hanya boleh dijalankan ketika listener tersebut tidak memiliki child
  `Runner.Worker` — dan lakukan dalam satu perintah.
- Workflow tidak boleh menyimpan artefak di `/tmp` (lokasi tersebut menggunakan RAM). Unduh ke
  `$RUNNER_TEMP` (berada di disk, terpisah untuk setiap runner) — artefak `next-build` berukuran
  1,3 GB memerlukan 27–32 menit untuk disimpan di tmpfs dan 2 menit untuk diunggah dari disk.
- VPS `.15` hanya untuk homologasi — tidak pernah menjalankan runner CI.

## Jalur hosted (runner yang dihosting GitHub)

Akun ini menggunakan paket **Pro**: **40 job hosted serentak**, yang digunakan bersama oleh setiap pemeriksaan PR,
setiap workflow yang dipicu oleh push, dan penyiapan default CodeQL. Pengukuran pada 2026-10-18 selama
kampanye merge (~10 merge/jam pada `release/v3.8.52`) menunjukkan: **2.500 proses workflow dibuat dalam
24 jam**, 44 push ke branch tersebut dalam 6 jam, serta **106 job hosted mengantre** sementara pemeriksaan PR menunggu
selama berjam-jam dan PR di-merge tanpa pemeriksaan tersebut. Sembilan workflow dipicu pada setiap push ke branch:

| per push ke `release/v*`                    | job hosted | hasil selama lonjakan                                          | sejak 2026-10-18                                                                            |
| ------------------------------------------- | ---------: | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `ci.yml` (matriks lengkap)                  |  hingga 30 | dibatalkan oleh push berikutnya, 24 dari 24 dalam sehari       | tidak dimulai pada push ke `release/**` (proses PR + Release-Green)                         |
| `quality.yml`                               |         ~6 | dibatalkan, 23 dari 23                                         | tidak dimulai pada push ke `release/**`                                                     |
| `Release-Green` `--quick`                   |          0 | berjalan di `omni-build`, 97 dari 100 dibatalkan               | slot `omni-release`, tidak pernah dibatalkan, proses tertunda digabung                      |
| `Lock released branch`, `OpenSSF Scorecard` |          2 | satu proses mengantre per push                                 | satu proses per ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)                    |
| `Release acceptance` (laporan bayangan)     |          1 | satu `npm ci` hosted per push, tidak pernah dibatalkan         | tidak berubah — kandidat untuk filter `paths:`                                              |
| `Publish to Docker Hub` → `Deploy to VPS`   |          2 | dibatalkan per push; bagian amd64 bersaing di `omni-build`     | tidak berubah — saluran deployment pemilik                                                  |
| Penyiapan default CodeQL (`dynamic`)        |          4 | `javascript-typescript`, `actions`, `c-cpp`, `python` per push | tidak berubah — Pengaturan → Keamanan kode; `c-cpp`/`python` tidak memindai apa pun di sini |

`tests/unit/build/push-storm-diet.test.ts` mengunci pemicu push khusus `main` milik `ci.yml` dan
`quality.yml`. Efek samping: Codecov tidak lagi menerima unggahan dasar untuk setiap push release (langkah
tersebut hanya bersifat informatif dan menggunakan `continue-on-error`); gerbang cakupan dalam repositori dan komentar PR
tidak terpengaruh.

**Kapasitas self-hosted tambahan tidak memperbaiki antrean hosted.** Devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) dapat menjadi host runner, tetapi sesi agen yang ada
sudah membuat load-nya berada pada 20–26, container agen tidak memiliki daemon Docker, dan jalur yang
jenuh adalah jalur hosted. Box `.113` memiliki ruang kosong 71 GB dan load 5–8 pada saat yang sama; batasannya
adalah anggaran memori per listener di atas (maksimum 6 listener), bukan CPU. Opsi yang tersisa
berkaitan dengan proses: merge PR kampanye melalui antrean Mergify (`label=queue`, batch berbagi
satu proses CI `merge_group`, bukan satu proses per PR ditambah satu per push), kurangi bahasa pada
penyiapan default CodeQL, dan filter `release-acceptance.yml` berdasarkan file yang dibacanya.
