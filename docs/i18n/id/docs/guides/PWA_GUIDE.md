# Progressive Web App (PWA) Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Instal dasbor OmniRoute sebagai Aplikasi Web Progresif untuk membukanya dari layar beranda atau desktop Anda dalam jendela mandiri. Aplikasi yang diinstal masih memerlukan koneksi ke server OmniRoute Anda untuk navigasi, data dasbor, dan permintaan API. Aset statis yang di-cache tidak menyediakan gateway offline atau dasbor offline.

## Apa itu PWA?

Aplikasi Web Progresif menggunakan dasbor web dengan ikon aplikasi dan jendela terpisah. Setelah terinstal, OmniRoute:

- Diluncurkan dari layar beranda atau desktop Anda
- Terbuka dalam mode mandiri, tanpa bilah alamat dan tab browser biasa
- Menyimpan cache aset statis yang dipilih
- Mendukung orientasi potret dan lanskap

## Instalasi

Gunakan alamat HTTPS untuk server di perangkat lain. Ketika server berjalan pada perangkat yang sama, `http://localhost:20128` juga memenuhi persyaratan kemampuan instalasi browser. Alamat `http://YOUR_IP:20128` biasa tidak memenuhi persyaratan tersebut. Menu dan petunjuk instalasi bergantung pada browser dan sistem operasi. Lihat [persyaratan instalasi PWA MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Krom)

1. Buka alamat OmniRoute HTTPS Anda, atau `http://localhost:20128` untuk server di ponsel yang sama.
2. Buka**⋮** menu dan pilih** Instal aplikasi** atau** Tambahkan ke layar Utama** , jika ditawarkan.
3. Konfirmasikan perintahnya.
4. Buka OmniRoute dari layar beranda.

### iOS (Safari)

1. Buka alamat OmniRoute HTTPS Anda di Safari.
2. Mengetuk** Membagikan** →** Tambahkan ke Layar Utama** .
3. Konfirmasikan nama dan ketuk** Menambahkan** .
4. Buka OmniRoute dari layar beranda.

### Desktop (Krom/Tepi)

1. Buka dasbor OmniRoute Anda.
2. Gunakan ikon instal browser atau** Instal aplikasi** entri menu, jika ditawarkan.
3. Konfirmasikan perintah untuk membuka OmniRoute di jendelanya sendiri.

## Fitur

### Jendela Mandiri

Manifes menetapkan `display: "standalone"` dan `start_url: "/dashboard"`. Aplikasi yang diinstal membuka dasbor di jendela aplikasi. Kontrol browser dan sistem operasi masih dapat muncul; manifes tidak meminta mode layar penuh.

### Aset Cache dan Persyaratan Jaringan

[Pekerja layanan](../../public/sw.js) menyimpan cache sumber daya asal yang sama yang dipilih:

| Permintaan atau aset                    | Strategi         | Perilaku                                                                                                      |
| --------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Sumber daya waktu penginstalan          | Pra-cache        | `/`, `/manifest.webmanifest`, `/icon-512.png` dan `/apple-touch-icon.png` di-cache selama instalasi pekerja   |
| aset statis Next.js (`/_next/`)         | Jaringan-pertama | Respons yang berhasil memperbarui cache; kesalahan jaringan kembali ke respons cache yang ada                 |
| CSS statis lainnya, JS, gambar dan font | Cache-pertama    | Respons cache yang ada digunakan kembali; respons jaringan yang berhasil akan di-cache jika ada yang terlewat |
| Navigasi halaman                        | Lewati           | Browser mengambil halaman secara langsung; tidak ada fallback offline yang dilayani                           |
| API, dasbor dan rute otentikasi         | Lewati           | Pekerja tidak mencegat atau menyimpan permintaan ini dalam cache                                              |
| Permintaan non-statis lainnya           | Jaringan         | Tidak ada pencarian atau penyimpanan cache                                                                    |

Rute yang dikecualikan adalah `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` dan `/login`, dicocokkan secara case-insensitive pada batas jalur. Permintaan lintas asal dan non-GET juga mengabaikan pekerja.

### Halaman Konektivitas

Halaman `/offline` menyediakan pesan konektivitas, indikator online/offline, a** Coba Lagi Koneksi** tombol dan tautan ke halaman status. Dia** tidak di-cache sebelumnya** dan pekerja layanan melakukannya** bukan** mengarahkan ulang navigasi yang gagal ke sana. Keberadaannya tidak membuat halaman baru bisa diakses tanpa server.

### Ikon Aplikasi

Manifes mengiklankan ikon PNG ini:

| Mengajukan             | Ukuran  | Menggunakan                                |
| ---------------------- | ------- | ------------------------------------------ |
| `icon-192.png`         | 192×192 | Ikon aplikasi umum                         |
| `icon-512.png`         | 512×512 | Ikon aplikasi umum dan dapat disembunyikan |
| `apple-touch-icon.png` | 180×180 | Ikon layar beranda Apple                   |

Browser memilih ikon yang sesuai untuk target instalasi.

### Registrasi Otomatis

`PwaRegister` mendaftarkan pekerja dalam produksi ketika browser mendukung pekerja layanan. Mode pengembangan membatalkan pendaftaran pekerja dan menghapus cache untuk menghindari aset basi yang mengganggu hot reload. Perintah penginstalan tetap menjadi keputusan browser.

## Arsitektur Teknis

### Manifes Aplikasi Web

Next.js menghasilkan `/manifest.webmanifest` dari [`src/app/manifest.ts`](../../src/app/manifest.ts). Pengaturan utamanya adalah:

| Pengaturan                    | Nilai                                        |
| ----------------------------- | -------------------------------------------- |
| `short_name`                  | `OmniRoute`                                  |
| `start_url`                   | `/dashboard`                                 |
| `scope`                       | `/`                                          |
| `display`                     | `standalone`                                 |
| `orientation`                 | `any`                                        |
| Warna latar belakang dan tema | Palet cahaya default dari `PWA_THEME_COLORS` |

Nama dan deskripsi manifes adalah nilai statis dalam file sumber tersebut. Manifes yang diinstal tidak mengikuti pengaturan nama instance atau palet aktif pada setiap kunjungan.

### Pekerja Layanan

[`public/sw.js`](../../public/sw.js) tidak memiliki ketergantungan kerangka pekerja layanan:

- **Memasang:** melakukan pra-cache keempat sumber daya yang tercantum di atas dan mengaktifkan pekerja baru.
- **Mengaktifkan:** menghapus generasi cache yang lebih lama dan mengklaim klien.
- **Mengambil:** menerapkan strategi aset statis dan pengecualian rute di atas.
- **Pembuatan versi:** nama cache sumber adalah `omniroute-pwa-v3`; build produksi mencap identitas cache.
- **Pemberitahuan:** menangani peristiwa `push` yang masuk dan memfokuskan atau membuka jendela ketika pemberitahuan diklik.

Pengendali kejadian push saja tidak membuat langganan push aktif atau pengiriman server yang dikonfigurasi. Jangan berasumsi notifikasi diaktifkan hanya karena PWA diinstal.

### Metadata Tata Letak dan Registrasi

[`src/app/layout.tsx`](../../src/app/layout.tsx) menyediakan tautan manifes, metadata mandiri Apple, warna tema, dan `viewport-fit: cover`. Judul halaman dan judul aplikasi web Apple menggunakan nama instans. Warna tema browser langsung mengikuti palet; manifes instalasi menggunakan warna terang default.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) berjalan pada klien dan mendaftarkan `/sw.js` dengan build ID di URL nya. Ini mendeteksi generasi cache yang tidak cocok dan dapat mengatur ulang pekerja dan memuat ulang sekali untuk memulihkan dari instalasi lama. Kegagalan registrasi tidak menghalangi dashboard.

## Gunakan Dengan Termux (Android)

1. Mulai OmniRoute di Termux: `npx -y omniroute@latest`.
2. Buka Chrome di ponsel yang sama: `http://localhost:20128`.
3. Instal PWA melalui menu instalasi browser.
4. Jaga agar server Termux tetap berjalan saat menggunakan dashboard.

Ponsel ini menampung gateway dan dasbornya. Permintaan ke penyedia AI jarak jauh masih memerlukan akses jaringan. Lihat [panduan Termux](TERMUX_GUIDE.md) untuk pengaturan dan pertimbangan proses seumur hidup Android.

## Gunakan Dari Perangkat Lain

Buka alamat HTTPS server di ponsel, tablet, atau desktop, lalu ikuti alur instalasi browser tersebut. Server harus tetap dapat dijangkau dari setiap perangkat. Lihat [panduan terowongan](../ops/TUNNELS_GUIDE.md) untuk opsi akses jarak jauh.

## Kustomisasi

### Nama Instance

Itu** Nama Instance** pengaturan mengubah metadata dasbor, termasuk judul halaman dan judul aplikasi web Apple. Manifes yang dihasilkan menggunakan nama statis, sehingga pengaturan ini tidak menjamin bahwa aplikasi yang sudah diinstal akan diganti namanya.

### Favicon Kustom

Favicon khusus mengubah favicon browser. Manifes instalasi masih mengiklankan file PNG di atas; mengubah favicon tidak menggantikan ikon layar beranda tersebut.

## Keterbatasan

- **Koneksi server diperlukan:** navigasi halaman, status dasbor, dan permintaan API tidak memiliki cadangan offline.
- **Tidak ada sinkronisasi latar belakang:** tindakan offline tidak dimasukkan dalam antrean untuk diputar ulang.
- **Perbedaan peramban:** menu instalasi, presentasi jendela, dan dukungan notifikasi berbeda-beda menurut platform.
- **Tidak ada cache respons API :** pekerja mengecualikan API, dasbor, dan rute otentikasi.
- **Ikon pemasangan statis:** memperbarui ikon tersebut memerlukan perubahan aset yang diiklankan; browser mungkin menyimpan metadata yang terpasang.

## Referensi File

| Mengajukan                                                                             | Tujuan                                                   |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Manifes aplikasi web yang dihasilkan                     |
| [public/sw.js](../../public/sw.js)                                                     | Caching, pengecualian dan pengendali kejadian notifikasi |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registrasi produksi dan pemulihan cache basi             |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Halaman konektivitas, bukan fallback offline otomatis    |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadata halaman dan pengaturan area pandang             |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Nilai warna tema bersama                                 |
| [public/icon-512.png](../../public/icon-512.png)                                       | ikon aplikasi 512 × 512                                  |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 ikon Apple                                     |
