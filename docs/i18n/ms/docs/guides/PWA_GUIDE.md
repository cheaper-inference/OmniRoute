# Progressive Web App (PWA) Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Pasang papan pemuka OmniRoute sebagai Apl Web Progresif untuk membukanya dari skrin utama atau desktop anda dalam tetingkap kendiri. Apl yang dipasang masih memerlukan sambungan ke pelayan OmniRoute anda untuk navigasi, data papan pemuka dan permintaan API. Aset statik dicache tidak menyediakan gerbang luar talian atau papan pemuka luar talian.

## Apa itu PWA?

Apl Web Progresif menggunakan papan pemuka web dengan ikon aplikasi dan tetingkap berasingan. Setelah dipasang, OmniRoute:

- Dilancarkan dari skrin utama atau desktop anda
- Dibuka dalam mod kendiri, tanpa bar alamat dan tab biasa penyemak imbas
- Cache aset statik yang dipilih
- Menyokong orientasi potret dan landskap

## Pemasangan

Gunakan alamat HTTPS untuk pelayan pada peranti lain. Apabila pelayan berjalan pada peranti yang sama, `http://localhost:20128` juga memenuhi keperluan kebolehpasangan penyemak imbas. Alamat `http://YOUR_IP:20128` biasa tidak memenuhi keperluan tersebut. Menu dan gesaan pemasangan bergantung pada penyemak imbas dan sistem pengendalian. Lihat [keperluan pemasangan PWA MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Buka alamat OmniRoute HTTPS anda atau `http://localhost:20128` untuk pelayan pada telefon yang sama.
2. Buka**⋮** menu dan pilih** Pasang apl** atau** Tambahkan pada skrin Utama** , jika ditawarkan.
3. Sahkan gesaan.
4. Buka OmniRoute dari skrin utama.

### iOS (Safari)

1. Buka alamat OmniRoute HTTPS anda dalam Safari.
2. Ketik** Kongsi** →** Tambahkan pada Skrin Utama** .
3. Sahkan nama dan ketik** Tambah** .
4. Buka OmniRoute dari skrin utama.

### Desktop (Chrome / Edge)

1. Buka papan pemuka OmniRoute anda.
2. Gunakan ikon pemasangan penyemak imbas atau** Pasang apl** entri menu, jika ditawarkan.
3. Sahkan gesaan untuk membuka OmniRoute dalam tetingkapnya sendiri.

## Ciri-ciri

### Tingkap Kendiri

Manifes menetapkan `display: "standalone"` dan `start_url: "/dashboard"`. Apl yang dipasang membuka papan pemuka dalam tetingkap apl. Kawalan penyemak imbas dan sistem pengendalian masih boleh muncul; manifes tidak meminta mod skrin penuh.

### Aset Cache dan Keperluan Rangkaian

[Pekerja perkhidmatan](../../public/sw.js) menyimpan sumber asal yang sama yang dipilih:

| Permintaan atau aset                    | Strategi             | Tingkah laku                                                                                                |
| --------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Sumber masa pemasangan                  | Pra-cache            | `/`, `/manifest.webmanifest`, `/icon-512.png` dan `/apple-touch-icon.png` dicache semasa pemasangan pekerja |
| Next.js aset statik (`/_next/`)         | Rangkaian diutamakan | Respons yang berjaya mengemas kini cache; ralat rangkaian kembali kepada respons cache sedia ada            |
| CSS statik lain, JS, imej dan fon       | Cache dahulu         | Respons tembolok sedia ada digunakan semula; respons rangkaian yang berjaya dicache pada kesilapan          |
| Navigasi halaman                        | pintasan             | Penyemak imbas mengambil halaman secara langsung; tiada sandaran luar talian disediakan                     |
| API, papan pemuka dan laluan pengesahan | pintasan             | Pekerja tidak memintas atau cache permintaan ini                                                            |
| Permintaan bukan statik lain            | Rangkaian            | Tiada carian cache atau storan                                                                              |

Laluan yang dikecualikan ialah `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` dan `/login`, dipadankan secara tidak sensitif huruf besar pada sempadan laluan. Permintaan silang asal dan bukan GET juga memintas pekerja.

### Halaman Ketersambungan

Halaman `/offline` menyediakan mesej sambungan, penunjuk online/offline, a** Cuba Semula Sambungan** butang dan pautan ke halaman status. Ia adalah** bukan pra-cache** dan pekerja perkhidmatan melakukannya** bukan** ubah hala navigasi yang gagal kepadanya. Kewujudannya tidak menjadikan halaman baharu boleh diakses tanpa pelayan.

### Ikon Apl

Manifes mengiklankan ikon PNG ini:

| Fail                   | Saiz    | guna                              |
| ---------------------- | ------- | --------------------------------- |
| `icon-192.png`         | 192×192 | Ikon apl umum                     |
| `icon-512.png`         | 512×512 | Ikon apl umum dan boleh bertopeng |
| `apple-touch-icon.png` | 180×180 | Ikon skrin utama Apple            |

Penyemak imbas memilih ikon yang sesuai untuk sasaran pemasangan.

### Pendaftaran Automatik

`PwaRegister` mendaftarkan pekerja dalam pengeluaran apabila penyemak imbas menyokong pekerja perkhidmatan. Mod pembangunan menyahdaftar pekerja dan mengosongkan cache untuk mengelakkan aset lapuk mengganggu muat semula panas. Gesaan pemasangan kekal sebagai keputusan penyemak imbas.

## Seni Bina Teknikal

### Manifes Apl Web

Next.js menjana `/manifest.webmanifest` daripada [`src/app/manifest.ts`](../../src/app/manifest.ts). Tetapan utamanya ialah:

| Tetapan                       | Nilai                                          |
| ----------------------------- | ---------------------------------------------- |
| `short_name`                  | `OmniRoute`                                    |
| `start_url`                   | `/dashboard`                                   |
| `scope`                       | `/`                                            |
| `display`                     | `standalone`                                   |
| `orientation`                 | `any`                                          |
| Warna latar belakang dan tema | Palet cahaya lalai daripada `PWA_THEME_COLORS` |

Nama dan perihalan manifes ialah nilai statik dalam fail sumber tersebut. Manifes yang dipasang tidak mengikut tetapan nama contoh atau palet aktif pada setiap lawatan.

### Pekerja Perkhidmatan

[`public/sw.js`](../../public/sw.js) tidak mempunyai pergantungan rangka kerja pekerja perkhidmatan:

- **Pasang:** pra-cache empat sumber yang disenaraikan di atas dan mengaktifkan pekerja baharu.
- **Aktifkan:** mengalih keluar generasi cache yang lebih lama dan menuntut pelanggan.
- **Ambil:** menggunakan strategi aset statik dan pengecualian laluan di atas.
- **Versi:** nama cache sumber ialah `omniroute-pwa-v3`; binaan pengeluaran mengecap identiti cache.
- **Pemberitahuan:** mengendalikan acara `push` masuk dan memfokus atau membuka tetingkap apabila pemberitahuan diklik.

Pengendali acara tolak sahaja tidak mewujudkan langganan tolak aktif atau penghantaran pelayan yang dikonfigurasikan. Jangan anggap pemberitahuan didayakan hanya kerana PWA dipasang.

### Metadata dan Pendaftaran Reka Letak

[`src/app/layout.tsx`](../../src/app/layout.tsx) menyediakan pautan manifes, metadata kendiri Apple, warna tema dan `viewport-fit: cover`. Tajuk halaman dan tajuk apl web Apple menggunakan nama contoh. Warna tema penyemak imbas langsung mengikut palet; manifes pemasangan menggunakan warna cahaya lalai.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) berjalan pada klien dan mendaftarkan `/sw.js` dengan binaan ID dalam URL. Ia mengesan penjanaan cache yang tidak sepadan dan boleh menetapkan semula pekerja dan memuat semula sekali untuk memulihkan daripada pemasangan yang lebih lama. Kegagalan pendaftaran tidak menyekat papan pemuka.

## Gunakan Dengan Termux (Android)

1. Mulakan OmniRoute dalam Termux: `npx -y omniroute@latest`.
2. Buka Chrome pada telefon yang sama: `http://localhost:20128`.
3. Pasang PWA melalui menu pemasangan pelayar.
4. Pastikan pelayan Termux berjalan semasa menggunakan papan pemuka.

Telefon ini mengehoskan kedua-dua pintu masuk dan papan pemukanya. Permintaan kepada pembekal AI jauh masih memerlukan akses rangkaian. Lihat [panduan Termux](TERMUX_GUIDE.md) untuk persediaan dan pertimbangan sepanjang hayat proses Android.

## Gunakan Daripada Peranti Lain

Buka alamat HTTPS pelayan pada telefon, tablet atau desktop, kemudian ikuti aliran pemasangan penyemak imbas tersebut. Pelayan mesti kekal boleh dihubungi dari setiap peranti. Lihat [panduan terowong](../ops/TUNNELS_GUIDE.md) untuk pilihan akses jauh.

## Penyesuaian

### Nama Contoh

The** Nama Contoh** tetapan mengubah metadata papan pemuka, termasuk tajuk halaman dan tajuk apl web Apple. Manifes yang dijana menggunakan nama statik, jadi tetapan ini tidak menjamin bahawa apl yang telah dipasang dinamakan semula.

### Favicon Tersuai

Favicon tersuai menukar favicon penyemak imbas. Manifes pemasangan masih mengiklankan fail PNG di atas; menukar favicon tidak menggantikan ikon skrin utama tersebut.

## Had

- **Sambungan pelayan diperlukan:** navigasi halaman, keadaan papan pemuka dan permintaan API tidak mempunyai sandaran luar talian.
- **Tiada penyegerakan latar belakang:** tindakan luar talian tidak beratur untuk dimainkan semula.
- **Perbezaan penyemak imbas:** menu pemasangan, persembahan tetingkap dan sokongan pemberitahuan berbeza mengikut platform.
- **Tiada cache respons API :** pekerja tidak termasuk API, papan pemuka dan laluan pengesahan.
- **Ikon pemasangan statik:** mengemas kini ikon tersebut memerlukan menukar aset yang diiklankan; pelayar mungkin mengekalkan metadata yang dipasang.

## Rujukan Fail

| Fail                                                                                   | Tujuan                                                       |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Manifes apl web yang dijana                                  |
| [public/sw.js](../../public/sw.js)                                                     | Caching, pengecualian dan pengendali acara pemberitahuan     |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Pendaftaran pengeluaran dan pemulihan cache basi             |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Halaman ketersambungan, bukan sandaran luar talian automatik |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadata halaman dan tetapan viewport                        |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Nilai warna tema yang dikongsi                               |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 ikon aplikasi                                      |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 ikon Apple                                         |
