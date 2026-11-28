# Progressive Web App (PWA) Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Installige OmniRoute armatuurlaud progressiivse veebirakendusena, et avada see avaekraanilt või töölaualt eraldi aknas. Installitud rakendus vajab navigeerimiseks, armatuurlaua andmete ja API päringute jaoks siiski ühendust teie OmniRoute serveriga. Vahemällu salvestatud staatilised varad ei paku võrguühenduseta lüüsi ega võrguühenduseta armatuurlauda.

## Mis on PWA?

Progressiivne veebirakendus kasutab veebi armatuurlauda rakenduse ikooni ja eraldi aknaga. Pärast installimist OmniRoute:

- Käivitub teie avaekraanilt või töölaualt
- Avaneb eraldiseisvas režiimis, ilma brauseri tavapärase aadressiriba ja vahekaartideta
- Vahemällu salvestab valitud staatilised varad
- Toetab portree- ja rõhtpaigutust

## Paigaldamine

Kasutage teises seadmes oleva serveri jaoks HTTPS -aadressi. Kui server töötab samas seadmes, vastab `http://localhost:20128` ka brauseri installitavuse nõuetele. Lihtne `http://YOUR_IP:20128` -aadress ei vasta neile nõuetele. Installimismenüüd ja -viibad sõltuvad brauserist ja operatsioonisüsteemist. Vaadake [MDNPWA paigaldusnõudeid](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Avage oma OmniRoute HTTPS aadress või `http://localhost:20128` sama telefoni serveri jaoks.
2. Avage**⋮** menüü ja valige** Installige rakendus** või** Lisa avakuvale** , kui pakutakse.
3. Kinnitage viip.
4. Avage OmniRoute avakuval.

### iOS (Safari)

1. Avage Safaris oma OmniRoute HTTPS aadress.
2. Puudutage** Jaga** →** Lisa avakuvale** .
3. Kinnitage nimi ja puudutage** Lisa** .
4. Avage OmniRoute avakuval.

### Töölaud (Chrome / Edge)

1. Avage oma OmniRoute armatuurlaud.
2. Kasutage brauseri installiikooni või** Installige rakendus** menüükirje, kui seda pakutakse.
3. Kinnitage viip OmniRoute avamiseks oma aknas.

## Omadused

### Iseseisev aken

Manifest seab `display: "standalone"` ja `start_url: "/dashboard"`. Installitud rakendus avab armatuurlaua rakenduse aknas. Brauseri ja operatsioonisüsteemi juhtnupud võivad endiselt ilmuda; manifest ei nõua täisekraanirežiimi.

### Vahemällu salvestatud varad ja võrgunõuded

[Teenindustöötaja](../../public/sw.js) salvestab vahemällu valitud sama päritoluga ressursid:

| Taotlus või vara                           | strateegia      | Käitumine                                                                                                                        |
| ------------------------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Installimisaja ressursid                   | Eelvahemälu     | `/`, `/manifest.webmanifest`, `/icon-512.png` ja `/apple-touch-icon.png` salvestatakse töötaja installimise ajal vahemällu       |
| Next.js staatilised varad (`/_next/`)      | Võrk enne       | Edukad vastused värskendavad vahemälu; võrgutõrge langeb tagasi olemasolevale vahemällu salvestatud vastusele                    |
| Muud staatilised CSS, JS, pildid ja fondid | Esmalt vahemälu | Olemasolevat vahemällu salvestatud vastust kasutatakse uuesti; edukad võrguvastused salvestatakse vahelejäämise korral vahemällu |
| Leheküljel navigeerimine                   | Möödasõit       | Brauser tõmbab lehe otse; võrguühenduseta tagavara ei pakuta                                                                     |
| API, armatuurlaud ja autentimismarsruudid  | Möödasõit       | Töötaja ei peata ega salvesta neid taotlusi vahemällu                                                                            |
| Muud mittestaatilised taotlused            | Võrk            | Ei mingit vahemälu otsingut ega salvestusruumi                                                                                   |

Välistatud marsruudid on `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` ja `/login`, mis on tee piiridel tõstutundlikult sobitatud. Ristpäritolu ja mitte-GET-päringud lähevad samuti töötajast mööda.

### Ühenduvusleht

`/offline` lehel on ühenduvussõnum, online/offline indikaator, a** Proovige ühendust uuesti** nuppu ja linki olekulehele. On küll** pole eelnevalt vahemällu salvestatud** ja teenindaja teeb** mitte** suunata ebaõnnestunud navigatsioonid sellele ümber. Selle olemasolu ei muuda uusi lehti ilma serverita juurdepääsetavaks.

### Rakenduste ikoonid

Manifest reklaamib neid PNG ikoone:

| Fail                   | Suurus  | Kasutage                              |
| ---------------------- | ------- | ------------------------------------- |
| `icon-192.png`         | 192×192 | Üldine rakenduse ikoon                |
| `icon-512.png`         | 512×512 | Üldine ja maskeeritav rakenduse ikoon |
| `apple-touch-icon.png` | 180×180 | Apple'i avakuva ikoon                 |

Brauser valib installi sihtmärgi jaoks sobiva ikooni.

### Automaatne registreerimine

`PwaRegister` registreerib töötaja tootmises, kui brauser toetab teenindustöötajaid. Arendusrežiim tühistab töötajate registreerimise ja tühjendab vahemälu, et vältida aegunud varade segamist kuuma uuesti laadimise ajal. Installimisviibad jäävad brauseri otsuseks.

## Tehniline arhitektuur

### Veebirakenduse manifest

Next.js genereerib `/manifest.webmanifest` -st [`src/app/manifest.ts`](../../src/app/manifest.ts). Selle peamised seaded on järgmised:

| Seadistamine           | Väärtus                                   |
| ---------------------- | ----------------------------------------- |
| `short_name`           | `OmniRoute`                               |
| `start_url`            | `/dashboard`                              |
| `scope`                | `/`                                       |
| `display`              | `standalone`                              |
| `orientation`          | `any`                                     |
| Tausta ja teema värvid | Vaikimisi `PWA_THEME_COLORS` valguspalett |

Manifesti nimi ja kirjeldus on selle lähtefaili staatilised väärtused. Installitud manifest ei järgi igal külastusel eksemplari nime sätet ega aktiivset paletti.

### Teenindustöötaja

[`public/sw.js`](../../public/sw.js) puudub teenindustöötaja raamistiku sõltuvus:

- **Installige:** eelmällu salvestab neli ülaltoodud ressurssi ja aktiveerib uue töötaja.
- **Aktiveeri:** eemaldab vanemad vahemälu põlvkonnad ja nõudekliendid.
- **Tõmba:** rakendab ülaltoodud staatilise vara strateegiaid ja marsruudi välistusi.
- **Versioonide koostamine:** allika vahemälu nimi on `omniroute-pwa-v3`; tootmisjärg paneb vahemälu identiteedi templi.
- **Märguanded:** käsitleb sissetulevaid `push` sündmusi ja fokusseerib või avab akna, kui teatisel klõpsate.

Tõukesündmuste töötlejad üksi ei loo aktiivset tõuketellimust ega konfigureeritud serveri edastamist. Ärge eeldage, et märguanded on lubatud ainult seetõttu, et PWA on installitud.

### Paigutuse metaandmed ja registreerimine

[`src/app/layout.tsx`](../../src/app/layout.tsx) pakub manifesti linki, Apple'i eraldiseisvaid metaandmeid, teemavärve ja `viewport-fit: cover`. Lehe pealkiri ja Apple'i veebirakenduse pealkiri kasutavad eksemplari nime. Reaalajas brauseri teema värv järgib paletti; installi manifest kasutab valguse vaikevärvi.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) töötab kliendil ja registreerib `/sw.js` koos ID oma URL. See tuvastab mittevastavad vahemälu põlvkonnad ja saab töötaja lähtestada ja korra uuesti laadida, et vanemast installist taastuda. Registreerimise tõrge ei blokeeri armatuurlauda.

## Kasuta koos Termuxiga (Android)

1. Käivitage OmniRoute Termuxis: `npx -y omniroute@latest`.
2. Avage Chrome samas telefonis: `http://localhost:20128`.
3. Installige PWA brauseri installimenüü kaudu.
4. Hoidke Termuxi server armatuurlaua kasutamise ajal töös.

Telefonis on nii lüüs kui ka selle armatuurlaud. Kaug- AI teenusepakkujate päringud vajavad endiselt juurdepääsu võrgule. Seadistamise ja Androidi protsessi eluea kaalutluste kohta vaadake [Termuxi juhendit](TERMUX_GUIDE.md).

## Kasutage teistest seadmetest

Avage telefonis, tahvelarvutis või lauaarvutis serveri HTTPS -aadress, seejärel järgige selle brauseri installiprotsessi. Server peab jääma igast seadmest kättesaadavaks. Kaugjuurdepääsu valikute kohta vaadake [tunneli juhendit](../ops/TUNNELS_GUIDE.md).

## Kohandamine

### Eksemplari nimi

The** Eksemplari nimi** seade muudab armatuurlaua metaandmeid, sealhulgas lehe pealkirja ja Apple'i veebirakenduse pealkirja. Loodud manifest kasutab staatilist nime, seega ei garanteeri see seade juba installitud rakenduse ümbernimetamist.

### Kohandatud Favicon

Kohandatud favicon muudab brauseri lemmikikooni. Installi manifest reklaamib endiselt ülalolevaid PNG faile; faviconi muutmine ei asenda neid avaekraani ikoone.

## Piirangud

- **Nõutav serveriühendus:** lehe navigeerimisel, armatuurlaua olekul ja API taotlustel pole võrguühenduseta varuvarianti.
- **Taustal sünkroonimine puudub:** võrguühenduseta toiminguid ei esitata kordusjärjekorda.
- **Brauseri erinevused:** installimenüüd, aknaesitlus ja teavituste tugi erinevad platvormi lõikes.
- **API vastuse vahemälu puudub:** töötaja välistab API, armatuurlaua ja autentimismarsruudid.
- **Staatilise installi ikoonid:** nende ikoonide värskendamine nõuab reklaamitud varade muutmist; brauserid võivad säilitada installitud metaandmeid.

## Failide viide

| Fail                                                                                   | Eesmärk                                                             |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Loodud veebirakenduse manifest                                      |
| [public/sw.js](../../public/sw.js)                                                     | Vahemällu salvestamine, välistamised ja teavitussündmuste töötlejad |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Tootmise registreerimine ja aegunud vahemälu taastamine             |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Ühenduvusleht, mitte automaatne võrguühenduseta tagavara            |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Lehe metaandmete ja vaateava seaded                                 |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Jagatud teema-värvi väärtused                                       |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 rakenduse ikoon                                           |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple'i ikoon                                             |
