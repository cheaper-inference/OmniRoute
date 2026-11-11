# Release-Green: candidate validation and evidence (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green memerhatikan komitmen tertentu dan melaporkan hasil pengesahannya. [Rujukan Quality Gates](../architecture/QUALITY_GATES.md) mentakrifkan profil CI semasa, semakan yang diperlukan dan dasar penerimaan. [Dasar kemasukan](../../config/quality/admission-policy.json) versi ialah kontrak boleh laku untuk `Gate / CI` dan `Gate / Quality`.

## CI dan skop pemerhati

`ci.yml` dan `quality.yml` menutup permintaan tarik ke cawangan utama dan keluaran. Profil yang dipilih menentukan pekerjaan yang digunakan. CI penuh juga termasuk lorong yang permintaan tarik biasa tidak dilaksanakan. Hasil pemerhati pantas tidak boleh menggantikan kerja tersebut dan pembungkus aliran kerja yang lengkap tidak boleh menggantikan resitnya.

Binaan pengeluaran adalah milik CI. Tiada binaan nasihat pendua dalam `quality.yml`. Artifak yang hilang, kerja yang dibatalkan dan ukuran yang tidak lengkap tidak mewujudkan semakan yang diperlukan yang berjaya. Sahkan pangkalan semasa, ketua dan calon gabungan sebelum menerima keputusan.

## Pengesahan tempatan

Jalankan pemerhati dalam pepohon kerja milik selepas menyediakan kebergantungannya. Gunakan [worktree dan protokol sumber](WORKTREE_ISOLATION.md) sebelum pengesahan berat.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Profil pantas adalah separa. Profil penuh menyemak keperluan modelnya dan mengekalkan resit arahan; ia tidak memperakui penempatan atau menggantikan semakan dihoskan yang berkenaan. Laporan itu membezakan kegagalan pelaksanaan daripada hanyut metrik. Ratchet yang diperlukan kekal menyekat mengikut dasar yang dipilih. Jangan naikkan garis dasar semata-mata untuk mendapatkan keputusan lulus.

## Sapuan setiap malam dan manual

Pelepasan malam dan penyelesai keserasian memilih cawangan keluaran berkanun. Pemilihan itu mesti sepadan dengan cawangan yang mencetuskan aliran kerja dan suite menggunakan SHA tidak boleh ubah acara itu. Untuk pelaksanaan manual, pilih keluaran yang dimaksudkan dalam `release_branch` dan hantar pada rujukan yang sama:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Penghantaran rentas cawangan ditolak sebelum melaksanakan kod yang dipilih. Suite utama yang dihoskan memeriksa `main` dan sahkan bahawa SHA masih sepadan dengan sasaran yang diselesaikan sebelum pemasangan. Jika utama bergerak semasa resolusi, jalankan semula sapuan yang tidak lengkap pada komit baharu. Jangan gabungkan resit suite daripada calon yang berbeza.

## Triage kegagalan dan pemulihan

Gunakan insiden itu sebagai indeks diagnostik, kemudian periksa larian, percubaan, langkah gagal dan artifak yang tepat. Bandingkan asas yang setara dan bukti calon sebelum mengaitkan kegagalan kepada penyumbang. Kesilapan infrastruktur, kecacatan yang diwarisi, regresi calon dan kelulusan yang belum selesai memerlukan remedi yang berbeza.

Kemahiran `/green-prs`, `/sweep-reds`, `/validate-release-green` dan `/babysit` mengumpul bukti dan menyediakan pembetulan di bawah skop yang didokumenkan. Simpan kredit penyumbang, gunakan cawangan pembaikan terpencil dan sahkan semua semakan yang diperlukan sebelum penggabungan yang dibenarkan. Tiada garis asas semula automatik atau penutupan insiden menggantikan calon semasa yang lulus.
