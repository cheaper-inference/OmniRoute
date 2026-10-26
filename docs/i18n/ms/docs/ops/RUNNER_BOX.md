# Self-Hosted Runner Box Operations (.113 pool) (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Kumpulan dihoskan sendiri berjalan pada mesin **.113** (`tomni-proxmox-113`). Sejak 2026-10-18, setiap
runner OmniRoute mempunyai **satu peranan**, satu label dan peruntukan memori/CPU yang disesuaikan dengan ukuran beban kerjanya.
Slot Turbopack mendapat sumber yang diperlukan oleh binaan; slot lain diperuntukkan mengikut
puncak penggunaan yang diukur. Mesin ini hanya terlebih komit apabila binaan Turbopack berlaku serentak dengan binaan webpack
Release-Green dan tugas lint; swap hos (16 GB) menampung keadaan itu, dan oleh sebab binaan pull request dijalankan
secara dihoskan, slot Turbopack melahu pada kebanyakan masa:

| runner               | label          | peranan                                                                                                                                                  | `MemoryHigh` / `MemoryMax` | `CPUQuota`        |
| -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------------- |
| `omniroute-113-5`    | `omni-build`   | Binaan Turbopack: `ci.yml` `Build` (push/dispatch sahaja), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, binaan a11y setiap malam | 56 GB / 60 GB (swap 0)     | 1600 %            |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), binaan webpack                                                                                           | 20 GB / 24 GB (swap 4 GB)  | 800 %             |
| `omniroute-113-2`    | `omni-light`   | tugas setiap malam (Schemathesis, promptfoo, garak, k6) dan `quality.yml` `lint-guard`                                                                   | 12 GB / 16 GB (swap 4 GB)  | 600 %             |
| `omniroute-113`      | `omni-light`   | kumpulan yang sama seperti di atas                                                                                                                       | 8 GB / 12 GB               | 400 %             |
| OmniHeuris, OmniMind | (repo mereka)  | Dependabot sahaja (puncak 155 MB setiap satu, 2026-10-18)                                                                                                | 4 GB / 6 GB                | 200 % setiap satu |

Diukur pada 2026-10-18:

| sumber    | nilai                               | implikasinya terhadap penjadualan                                                                                                                                                                                                                                                                                                                                                                                |
| --------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 teras**                | binaan pengeluaran Turbopack memuncak pada 49 GB tanpa had (`tests/unit/ci-build-bundler-webpack.test.ts`); pada Next 16.3.8, fasa kompilasi sahaja menggunakan ~40 GB (36 GB RSS dalam `next-build` berserta 17 pekerja loader pada 3 GB, diukur pada 2026-10-18); binaan webpack menggunakan ~14–16 GB. Satu binaan Turbopack + satu binaan webpack boleh dijalankan bersama; dua binaan Turbopack tidak boleh |
| swap      | 16 GB                               | `omniroute-113-5` berjalan dengan swap dimatikan (`MemorySwapMax=0`), supaya binaan yang tidak terkawal dihentikan apabila mencapai hadnya dan bukannya menyebabkan mesin menggunakan swap                                                                                                                                                                                                                       |
| `/tmp`    | **12 GB tmpfs = RAM**               | apa-apa yang disimpan di situ menggunakan memori; baki fail dibersihkan selepas 3 jam                                                                                                                                                                                                                                                                                                                            |
| CPU       | beban 60 pada 32 teras diperhatikan | sebelum kuota dilaksanakan, satu binaan Turbopack (~1166 % CPU) berserta suit liputan pada mesin yang sama menyebabkan isyarat heartbeat listener lain kebuluran sumber (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                    |
| runner    | **6 listener**                      | 4 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` dinyahdayakan (`systemctl enable --now` mengaktifkan semula salah satu daripadanya)                                                                                                                                                                                                                                                              |

Had tersebut berada dalam `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` bagi setiap unit
(nilai sebelumnya disimpan sebagai `override.conf.bak-20261018`) dan telah diterapkan secara langsung dengan
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — tanpa dimulakan semula, maka tiada
tugas yang sedang berjalan terjejas. Label diubah melalui API runner
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), juga secara langsung.

## Pasang pembersih (sekali sahaja, pada mesin)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): setiap 30 min, log ke /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` diperlukan: pembersih memastikan sesuatu laluan tidak aktif melalui satu syot kilat fail
terbuka sebelum mengalih keluarnya, dan tanpa alat tersebut ia tidak mengalih keluar apa-apa serta
memaklumkannya (keluar 1). Cuba sebarang perubahan dengan `--dry-run` dahulu — ia mencetak dengan tepat
perkara yang akan dilakukannya dan tidak mengubah apa-apa.

Perkara yang dilakukan pada setiap pelaksanaan: membersihkan sisa kami sendiri (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) selepas **3 j pada tmpfs** dan 24 j pada
`_work/_temp` dalam cakera; menamatkan `next-build` yang berusia lebih daripada 75 min (tiada tugas berjalan selama itu — pada
2026-08-27 satu tugas berjalan selama 70 min selepas GitHub mengisytiharkan tugasnya hilang); memangkas checkout
berusia 48 j bagi runner yang unitnya **dihentikan**; memberi amaran apabila penggunaan cakera ≥ 85 %, PSI memori
`full/avg60` ≥ 10 %, dan bilangan listener melebihi `MAX_ACTIVE_RUNNERS` (dengan pecahan
omniroute/lain-lain). Keluar 1 = perhatian diperlukan; baca log.

Peraturan 75 minit tidak mengesan binaan yang tugasnya telah pun dihentikan oleh GitHub. Apabila
`Runner.Listener` tidak dapat memperbaharui tugasnya, `_diag/Runner_*.log` memaparkan
`POST request to …/renewjob timed out after 100 seconds`, API melaporkan tugas tersebut `completed`
(kegagalan) kira-kira sepuluh minit selepas pembaharuan terakhir yang berjaya, dan `next-build` terus berjalan tanpa
tugas yang dilampirkan (2026-10-18: Build bagi #17066 gagal pada 19:43 dan binaannya masih
menggunakan 40 GB lima minit kemudian). Sahkan ref dalam `_diag/Worker_*.log` yang terbaharu, kemudian
hantar SIGTERM hanya kepada pepohon binaan mengikut PID — `next-build`, `npm run build`, `build-next-isolated.mjs` dan
pekerja `_work`. Jangan sekali-kali menyentuh `Runner.Listener`, `RunnerService.js` atau `Runner.Worker`: pekerja tersebut
melaporkan tugas sebagai dibatalkan dan listener kembali dalam talian dengan sendirinya.

## Unit runner: KillMode

`KillMode=process` lalai runner membiarkan `Runner.Worker → npm → next-build`
terus hidup apabila unit dihentikan atau dimulakan semula — binaan yatim terus menggunakan RAM dan
CPU tanpa tugas yang dilampirkan. Setiap unit OmniRoute mempunyai drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
dengan `KillMode=mixed`: SIGTERM dihantar kepada listener dahulu, kemudian SIGKILL kepada seluruh cgroup apabila
`TimeoutStop` dicapai. Ia berkuat kuasa pada mula semula unit yang berikutnya — mulakan semula **satu runner pada
satu-satu masa, hanya apabila tidak aktif**, dengan semakan tidak aktif dan mula semula dalam perintah yang sama.

## Peraturan operasi

- **Satu binaan Turbopack pada satu-satu masa — dikuatkuasakan melalui label.** Setiap tugas yang menjalankan
  `next build` Turbopack penuh menyasarkan `[self-hosted, omni-build]`, dan hanya **`omniroute-113-5`**
  mempunyai label tersebut: `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`,
  `preview-artifact`, binaan a11y setiap malam (#16853) dan **amd64** `docker-publish.yml` (webpack
  dalam BuildKit — Turbopack mengalami panik di situ, larian 33253576569). Bahagian Docker arm64
  kekal pada `ubuntu-24.04-arm`. `docker-publish` amd64 berkongsi kumpulan konkurensi
  `heavy-build-main` dengan `ci.yml` `Build` (`cancel-in-progress: false`). Docker Engine mesti
  berada pada `omniroute-113-5`. Slot Turbopack kedua tidak muat dalam 78 GB (2 × 33–37 GB
  ditambah selebihnya pada mesin); slot kedua hanya selamat untuk binaan webpack.
- **Binaan permintaan tarik dijalankan pada hos (2026-10-18).** `ci.yml` `Build` mencapai
  `omni-build` hanya untuk `push` dan `workflow_dispatch`; setiap Binaan `pull_request`
  (daripada asal sendiri atau fork) dan `merge_group` dijalankan pada `ubuntu-latest` dengan
  webpack. Apabila setiap PR daripada asal sendiri dihalakan ke slot tersebut, satu Binaan
  Turbopack menahannya selama 29–58 minit, 18 Binaan beratur sehingga 18 jam, dan Binaan `push`
  milik cabang keluaran itu sendiri mendapat slot sekali dalam 40 tugas. Pada hos, Binaan PR
  yang sama mengambil masa 8–12 minit bersama-sama tugas PR yang lain. Turbopack, pembundel yang
  diterbitkan oleh `npm-publish`, terus diuji pada cabang keluaran melalui binaan a11y setiap
  malam bagi cabang lalai (04:41 UTC), melalui setiap Binaan push atau dispatch yang mencapai
  slot tersebut, dan melalui `npm-publish` itu sendiri. `tests/unit/build/heavy-build-queue.test.ts`
  menetapkan gerbang empat klausa tersebut.
- **Jangan sekali-kali tetapkan saiz slot Turbopack lebih rendah daripada keperluan yang diukur.**
  Pada 2026-10-18 pada 18:06, slot tersebut diturunkan daripada 56G/60G kepada 40G/44G untuk
  memberi ruang kepada `omni-release`. Fasa kompilasi kekal pada `MemoryHigh` sepanjang
  lariannya (PSI memori `full` 30–43 %), dan `Runner.Listener`, yang berkongsi cgroup tersebut,
  tidak dapat memperbaharui tugasnya. Tetapan 56G/60G milik pemilik dari 2026-10-17 dipulihkan
  pada hari yang sama. Di bawah nilai itu, binaan tidak gagal; ia meronta-ronta, lalu tugas
  tersebut hilang.
- **Release-Green mempunyai slotnya sendiri (2026-10-18).** Sehingga ketika itu, kedua-dua
  pengesahan Release-Green dijalankan pada `omni-build`: pada setiap push (~10/jam, 97 daripada
  100 larian push dibatalkan semasa masih berjalan dalam satu hari) dan tiga imbasan penuh
  ~2 jam sehari (imbasan 05:29 menunggu 6 jam untuk mendapatkan slot) — slot binaan tunggal
  terlebih langganan beberapa kali ganda dan Binaan PR daripada asal sendiri menunggu selama
  berjam-jam. `release-green` dan `main-green` kini menyasarkan `omni-release`
  (`omniroute-113-6` sahaja) dengan `OMNIROUTE_USE_TURBOPACK=0`, dan larian yang telah bermula
  tidak lagi dibatalkan oleh push yang lebih baharu (slot menunggu masih meredakan lonjakan).
  `tests/unit/build/runner-capacity-routing.test.ts` menetapkan penghalaan, pertukaran kepada
  webpack dan memastikan tiada apa-apa pada `omni-release` dibina dengan Turbopack.
- **Kumpulan ringan: `omni-light`.** `omniroute-113` dan `omniroute-113-2` menjalankan tugas
  setiap malam yang memerlukan `next build` bahagian belakang sahaja (~5–6 GB; webpack) dan
  `quality.yml` `lint-guard`. `omniroute-113` mempunyai `MemoryHigh=4G` sehingga 2026-10-18 —
  binaan promptfoo menghabiskan 54 minit menuntut semula memori di situ; 8 GB menghapuskan
  pendikitan tersebut.
- **Kurang pendengar dengan sengaja.** Empat unit OmniRoute telah dilumpuhkan pada 2026-08-29 —
  setiap pendengar tambahan ialah penyewa lain bagi belanjawan memori di atas. Had maksimum
  petugas pembersihan ialah 6 (`MAX_ACTIVE_RUNNERS=6` dalam cron): ia mengira setiap
  `Runner.Listener` pada mesin tersebut, dan OmniHeuris + OmniMind menambah dua lagi kepada
  empat milik kami.
- **Jangan sekali-kali bersihkan `/tmp` atau `_work` secara manual ketika mana-mana pelaksana
  sedang sibuk.** Proses semak-kemudian-padam dengan sela antara kedua-duanya ialah punca
  satu tugas Build yang sedang berjalan kehilangan `_work` pada 2026-08-27. Petugas pembersihan
  melakukan semakan dan penghapusan dalam satu langkah; biarkannya berbuat demikian.
- Menghentikan pelaksana ketika tugas sedang berjalan akan membatalkan tugas tersebut
  (diperhatikan secara langsung): gunakan `systemctl stop` hanya apabila pendengarnya tidak
  mempunyai proses anak `Runner.Worker` — dan lakukannya dalam satu perintah.
- Aliran kerja tidak boleh menyimpan artifak dalam `/tmp` (ia menggunakan RAM). Muat turun ke
  `$RUNNER_TEMP` (pada cakera, bagi setiap pelaksana) — artifak `next-build` bersaiz 1.3 GB
  mengambil masa 27–32 minit untuk disimpan pada tmpfs dan 2 minit untuk dimuat naik dari cakera.
- VPS `.15` hanya untuk homologasi — jangan sekali-kali menjalankan pelaksana CI.

## Laluan dihoskan (pelaksana dihoskan GitHub)

Akaun ini menggunakan pelan **Pro**: **40 tugas dihoskan serentak**, yang dikongsi oleh setiap semakan PR,
setiap aliran kerja yang dicetuskan oleh tolakan dan persediaan lalai CodeQL. Diukur pada 2026-10-18 semasa
kempen penggabungan (~10 penggabungan/jam pada `release/v3.8.52`): **2,500 pelaksanaan aliran kerja dicipta dalam
24 j**, 44 tolakan ke cabang tersebut dalam 6 j, **106 tugas dihoskan beratur** sementara semakan PR menunggu selama
berjam-jam dan PR digabungkan tanpanya. Sembilan aliran kerja dicetuskan pada setiap tolakan ke cabang tersebut:

| bagi setiap tolakan ke `release/v*`         | tugas dihoskan | hasil semasa lonjakan tersebut                                            | sejak 2026-10-18                                                                           |
| ------------------------------------------- | -------------: | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ci.yml` (matriks penuh)                    |    sehingga 30 | dibatalkan oleh tolakan seterusnya, 24 daripada 24 dalam sehari           | tidak dimulakan pada tolakan `release/**` (pelaksanaan PR + Release-Green)                 |
| `quality.yml`                               |             ~6 | dibatalkan, 23 daripada 23                                                | tidak dimulakan pada tolakan `release/**`                                                  |
| `Release-Green` `--quick`                   |              0 | dijalankan pada `omni-build`, 97 daripada 100 dibatalkan                  | slot `omni-release`, tidak pernah dibatalkan, pelaksanaan tertunda digabungkan             |
| `Lock released branch`, `OpenSSF Scorecard` |              2 | satu pelaksanaan beratur bagi setiap tolakan                              | satu pelaksanaan bagi setiap ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)      |
| `Release acceptance` (laporan bayangan)     |              1 | satu `npm ci` dihoskan bagi setiap tolakan, tidak pernah dibatalkan       | tidak berubah — calon untuk penapis `paths:`                                               |
| `Publish to Docker Hub` → `Deploy to VPS`   |              2 | dibatalkan bagi setiap tolakan; bahagian amd64 bersaing pada `omni-build` | tidak berubah — saluran pengerahan pemilik                                                 |
| Persediaan lalai CodeQL (`dynamic`)         |              4 | `javascript-typescript`, `actions`, `c-cpp`, `python` bagi setiap tolakan | tidak berubah — Settings → Code security; `c-cpp`/`python` tidak mengimbas apa-apa di sini |

`tests/unit/build/push-storm-diet.test.ts` menetapkan pencetus tolakan `ci.yml` dan
`quality.yml` kepada `main` sahaja. Kesan sampingan: Codecov tidak lagi menerima muat naik asas bagi setiap tolakan keluaran (langkah
tersebut bersifat makluman dan `continue-on-error`); gerbang liputan dalam repositori dan komen PR
tidak terjejas.

**Kapasiti hos sendiri yang lebih besar tidak menyelesaikan masalah baris gilir dihoskan.** Devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) boleh mengehoskan pelaksana, tetapi sesi ejen sedia ada
sudah mengekalkan bebannya pada 20–26, kontena ejen tidak mempunyai daemon Docker, dan laluan
yang tepu ialah laluan dihoskan. Kotak `.113` mempunyai baki 71 GB dan beban 5–8 pada masa yang sama; kekangannya
ialah belanjawan memori bagi setiap pendengar di atas (had maksimum 6 pendengar), bukannya CPU. Tuil yang masih ada
berkaitan dengan proses: masukkan PR kempen melalui baris gilir Mergify (`label=queue`, kelompok berkongsi
satu pelaksanaan CI `merge_group` dan bukannya satu pelaksanaan bagi setiap PR serta satu bagi setiap tolakan), kurangkan bahasa
persediaan lalai CodeQL, dan tapis `release-acceptance.yml` berdasarkan fail yang dibacanya.
