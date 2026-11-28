# Progressive Web App (PWA) Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

I-install ang OmniRoute dashboard bilang Progressive Web App para buksan ito mula sa iyong home screen o desktop sa isang standalone na window. Ang naka-install na app ay nangangailangan pa rin ng koneksyon sa iyong OmniRoute server para sa navigation, dashboard data at API na mga kahilingan. Ang mga naka-cache na static na asset ay hindi nagbibigay ng offline na gateway o offline na dashboard.

## Ano ang isang PWA?

Ginagamit ng Progressive Web App ang web dashboard na may icon ng app at hiwalay na window. Kapag na-install, OmniRoute:

- Ilulunsad mula sa iyong home screen o desktop
- Nagbubukas sa standalone mode, nang walang karaniwang address bar at mga tab ng browser
- Nag-cache ng mga napiling static na asset
- Sinusuportahan ang portrait at landscape na oryentasyon

## Pag-install

Gumamit ng HTTPS address para sa isang server sa isa pang device. Kapag tumatakbo ang server sa parehong device, natutugunan din ng `http://localhost:20128` ang mga kinakailangan sa pag-install ng browser. Ang isang simpleng `http://YOUR_IP:20128` address ay hindi nakakatugon sa mga kinakailangang iyon. Ang mga menu at prompt ng pag-install ay nakadepende sa browser at operating system. Tingnan ang [MDN's PWA installation requirements](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Buksan ang iyong OmniRoute HTTPS address, o `http://localhost:20128` para sa isang server sa parehong telepono.
2. Buksan ang**⋮** menu at pumili** I-install ang app** o** Idagdag sa Home screen** , kung inaalok.
3. Kumpirmahin ang prompt.
4. Buksan ang OmniRoute mula sa home screen.

### iOS (Safari)

1. Buksan ang iyong OmniRoute HTTPS address sa Safari.
2. I-tap** Ibahagi** →** Idagdag sa Home Screen** .
3. Kumpirmahin ang pangalan at i-tap** Idagdag** .
4. Buksan ang OmniRoute mula sa home screen.

### Desktop (Chrome / Edge)

1. Buksan ang iyong OmniRoute dashboard.
2. Gamitin ang icon ng pag-install ng browser o ang** I-install ang app** entry sa menu, kung inaalok.
3. Kumpirmahin ang prompt upang buksan OmniRoute sa sarili nitong window.

## Mga tampok

### Standalone na Window

Itinatakda ng manifest `display: "standalone"` at `start_url: "/dashboard"`. Binubuksan ng naka-install na app ang dashboard sa isang window ng app. Maaari pa ring lumabas ang mga kontrol ng browser at operating system; ang manifest ay hindi humihiling ng fullscreen mode.

### Mga Naka-cache na Asset at Mga Kinakailangan sa Network

Ini-cache ng [service worker](../../public/sw.js) ang mga napiling mapagkukunan ng parehong pinagmulan:

| Kahilingan o asset                                  | Diskarte    | Pag-uugali                                                                                                                           |
| --------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Mga mapagkukunan ng oras ng pag-install             | Pre-cache   | `/`, `/manifest.webmanifest`, `/icon-512.png` at `/apple-touch-icon.png` ay naka-cache sa panahon ng pag-install ng manggagawa       |
| Next.js static na asset (`/_next/`)                 | Network-una | Ang mga matagumpay na tugon ay nag-a-update ng cache; bumabalik ang isang error sa network sa isang umiiral nang naka-cache na tugon |
| Iba pang static na CSS, JS, mga larawan at mga font | Cache-una   | Ang isang umiiral na naka-cache na tugon ay muling ginagamit; ang mga matagumpay na tugon sa network ay naka-cache sa isang miss     |
| Pag-navigate sa pahina                              | Bypass      | Direktang kinukuha ng browser ang pahina; walang inihahatid na offline na fallback                                                   |
| API, dashboard at mga ruta ng pagpapatunay          | Bypass      | Hindi hinaharang o ini-cache ng manggagawa ang mga kahilingang ito                                                                   |
| Iba pang mga hindi static na kahilingan             | Network     | Walang paghahanap ng cache o storage                                                                                                 |

Ang mga ibinukod na ruta ay `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` at `/login`, na tumugma sa case-insensitively sa mga hangganan ng path. Ang mga kahilingang cross-origin at non-GET ay lumalampas din sa manggagawa.

### Pahina ng Pagkakakonekta

Ang pahina `/offline` ay nagbibigay ng mensahe ng pagkakakonekta, isang tagapagpahiwatig online/offline, a** Subukan muli ang Koneksyon** button at isang link sa page ng status. Ito ay** hindi paunang naka-cache** at ginagawa ng service worker** hindi** i-redirect ang mga nabigong nabigasyon dito. Ang pagkakaroon nito ay hindi gumagawa ng mga bagong pahina na naa-access nang walang server.

### Mga Icon ng App

Ini-advertise ng manifest ang mga PNG icon na ito:

| file                   | Sukat   | Gamitin                                   |
| ---------------------- | ------- | ----------------------------------------- |
| `icon-192.png`         | 192×192 | Pangkalahatang icon ng app                |
| `icon-512.png`         | 512×512 | Pangkalahatan at nakatatak na icon ng app |
| `apple-touch-icon.png` | 180×180 | Icon ng home screen ng Apple              |

Pinipili ng browser ang naaangkop na icon para sa target ng pag-install.

### Awtomatikong Pagpaparehistro

Inirerehistro ng `PwaRegister` ang manggagawa sa produksyon kapag sinusuportahan ng browser ang mga service worker. Ang development mode ay nag-aalis ng rehistro sa mga manggagawa at nag-clear ng mga cache upang maiwasan ang mga lipas na asset na nakakasagabal sa mainit na pag-reload. Ang mga prompt sa pag-install ay nananatiling desisyon ng browser.

## Teknikal na Arkitektura

### Manifest ng Web App

Next.js ay bumubuo ng `/manifest.webmanifest` mula sa [`src/app/manifest.ts`](../../src/app/manifest.ts). Ang mga pangunahing setting nito ay:

| Setting                         | Halaga                                                  |
| ------------------------------- | ------------------------------------------------------- |
| `short_name`                    | `OmniRoute`                                             |
| `start_url`                     | `/dashboard`                                            |
| `scope`                         | `/`                                                     |
| `display`                       | `standalone`                                            |
| `orientation`                   | `any`                                                   |
| Mga kulay ng background at tema | Ang default na light palette mula sa `PWA_THEME_COLORS` |

Ang pangalan at paglalarawan ng manifest ay mga static na halaga sa source file na iyon. Hindi sinusunod ng naka-install na manifest ang setting ng instance-name o ang aktibong palette sa bawat pagbisita.

### Serbisyong Manggagawa

[`public/sw.js`](../../public/sw.js) ay walang dependency sa service-worker framework:

- **I-install:** paunang ini-cache ang apat na mapagkukunang nakalista sa itaas at i-activate ang bagong manggagawa.
- **I-activate:** nag-aalis ng mga mas lumang henerasyon ng cache at nag-claim ng mga kliyente.
- **Kunin:** inilalapat ang mga diskarte sa static-asset at mga pagbubukod ng ruta sa itaas.
- **Bersyon:** ang source cache name ay `omniroute-pwa-v3`; tinatatak ng production build ang pagkakakilanlan ng cache.
- **Mga abiso:** pinangangasiwaan ang mga papasok na kaganapan `push` at tumutuon o nagbubukas ng window kapag may na-click na notification.

Ang mga tagapangasiwa ng push event lamang ay hindi nagtatag ng aktibong push subscription o naka-configure na paghahatid ng server. Huwag ipagpalagay na ang mga notification ay pinagana dahil lamang sa naka-install ang PWA.

### Metadata ng Layout at Pagpaparehistro

[`src/app/layout.tsx`](../../src/app/layout.tsx) ay nagbibigay ng manifest link, Apple standalone metadata, mga kulay ng tema at `viewport-fit: cover`. Ginagamit ng pamagat ng pahina at pamagat ng web-app ng Apple ang pangalan ng halimbawa. Ang kulay ng tema ng live na browser ay sumusunod sa palette; ginagamit ng install manifest ang default na light color.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) ay tumatakbo sa kliyente at nirerehistro `/sw.js` gamit ang build ID sa URL nito. Nakikita nito ang mga hindi tugmang henerasyon ng cache at maaaring i-reset ang manggagawa at i-reload nang isang beses upang mabawi mula sa mas lumang pag-install. Hindi hinaharangan ng pagkabigo sa pagpaparehistro ang dashboard.

## Gamitin Sa Termux (Android)

1. Simulan OmniRoute sa Termux: `npx -y omniroute@latest`.
2. Buksan ang Chrome sa parehong telepono: `http://localhost:20128`.
3. I-install ang PWA sa pamamagitan ng menu ng pag-install ng browser.
4. Panatilihing tumatakbo ang Termux server habang ginagamit ang dashboard.

Parehong nagho-host ang telepono sa gateway at sa dashboard nito. Nangangailangan pa rin ng access sa network ang mga kahilingan sa mga remote na provider AI. Tingnan ang [gabay ng Termux](TERMUX_GUIDE.md) para sa pag-setup at panghabambuhay na pagsasaalang-alang sa proseso ng Android.

## Gamitin Mula sa Iba Pang Mga Device

Buksan ang HTTPS address ng server sa isang telepono, tablet o desktop, pagkatapos ay sundin ang daloy ng pag-install ng browser na iyon. Dapat manatiling naaabot ang server mula sa bawat device. Tingnan ang [gabay sa tunel](../ops/TUNNELS_GUIDE.md) para sa mga opsyon sa malayuang pag-access.

## Pagpapasadya

### Pangalan ng Instance

Ang** Pangalan ng Instance** binago ng setting ang metadata ng dashboard, kabilang ang pamagat ng pahina at pamagat ng web-app ng Apple. Gumagamit ng static na pangalan ang nabuong manifest, kaya hindi ginagarantiyahan ng setting na ito na mapapalitan ng pangalan ang isang naka-install na app.

### Custom na Favicon

Binabago ng custom na favicon ang favicon ng browser. Ina-advertise pa rin ng install manifest ang mga PNG file sa itaas; ang pagpapalit ng favicon ay hindi pinapalitan ang mga icon ng home-screen na iyon.

## Mga Limitasyon

- **Kinakailangan ang koneksyon sa server:** page navigation, dashboard state at API requests ay walang offline fallback.
- **Walang background sync:** ang mga offline na aksyon ay hindi nakapila para sa replay.
- **Mga pagkakaiba sa browser:** Ang mga menu ng pag-install, pagtatanghal ng window at suporta sa abiso ay nag-iiba ayon sa platform.
- **Walang cache ng tugon ng API :** hindi kasama ng manggagawa API, dashboard at mga ruta ng pagpapatunay.
- **Mga static na icon ng pag-install:** ang pag-update ng mga icon na iyon ay nangangailangan ng pagbabago sa mga ina-advertise na asset; maaaring panatilihin ng mga browser ang naka-install na metadata.

## Sanggunian ng mga File

| file                                                                                   | Layunin                                                                 |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Binuo na manifest ng web app                                            |
| [public/sw.js](../../public/sw.js)                                                     | Pag-cache, pagbubukod at mga tagapangasiwa ng kaganapan ng notification |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Pagpaparehistro ng produksyon at pagbawi ng stale-cache                 |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Pahina ng pagkakakonekta, hindi isang awtomatikong offline na fallback  |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Mga setting ng metadata ng page at viewport                             |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Nakabahaging mga halaga ng kulay ng tema                                |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 icon ng app                                                   |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 na icon ng Apple                                              |
