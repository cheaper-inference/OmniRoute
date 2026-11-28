# Progressive Web App (PWA) Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Instalirajte OmniRoute kontrolnu tablu kao progresivnu web aplikaciju da je otvorite sa početnog ekrana ili radne površine u samostalnom prozoru. Instaliranoj aplikaciji i dalje je potrebna veza s vašim OmniRoute serverom za navigaciju, podatke na kontrolnoj tabli i API zahtjeve. Keširana statička sredstva ne pružaju vanmrežni pristupnik ili vanmrežnu kontrolnu tablu.

## Šta je PWA?

Progresivna web aplikacija koristi web nadzornu ploču s ikonom aplikacije i zasebnim prozorom. Jednom instaliran, OmniRoute:

- Pokreće se sa vašeg početnog ekrana ili radne površine
- Otvara se u samostalnom načinu rada, bez uobičajene adresne trake i kartica pretraživača
- Kešira odabrana statička sredstva
- Podržava portretnu i pejzažnu orijentaciju

## Instalacija

Koristite HTTPS adresu za server na drugom uređaju. Kada server radi na istom uređaju, `http://localhost:20128` također ispunjava zahtjeve za instalaciju pretraživača. Obična `http://YOUR_IP:20128` adresa ne ispunjava te zahtjeve. Instalacijski meniji i upiti zavise od pretraživača i operativnog sistema. Pogledajte [MDN-ove PWA instalacijske zahtjeve](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Otvorite svoju OmniRoute HTTPS adresu ili `http://localhost:20128` za server na istom telefonu.
2. Otvorite**⋮** meni i izaberite** Instaliraj aplikaciju** ili** Dodaj na početni ekran** , ako se nudi.
3. Potvrdite upit.
4. Otvorite OmniRoute sa početnog ekrana.

### iOS (safari)

1. Otvorite svoju OmniRoute HTTPS adresu u Safariju.
2. Dodirnite** Dijeli** →** Dodaj na početni ekran** .
3. Potvrdite ime i dodirnite** Dodaj** .
4. Otvorite OmniRoute sa početnog ekrana.

### Desktop (Chrome / Edge)

1. Otvorite svoju OmniRoute kontrolnu tablu.
2. Koristite ikonu za instalaciju pretraživača ili** Instaliraj aplikaciju** unos u meni, ako se nudi.
3. Potvrdite prompt da otvorite OmniRoute u svom prozoru.

## Karakteristike

### Samostalni prozor

Manifest postavlja `display: "standalone"` i `start_url: "/dashboard"`. Instalirana aplikacija otvara kontrolnu tablu u prozoru aplikacije. Kontrole pretraživača i operativnog sistema se i dalje mogu pojaviti; manifest ne zahtijeva način rada preko cijelog ekrana.

### Predmemorija imovina i mrežni zahtjevi

[Servisni radnik](../../public/sw.js) kešira odabrane resurse istog porijekla:

| Zahtjev ili imovina                           | Strategija            | Ponašanje                                                                                                   |
| --------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------- |
| Resursi za vrijeme instalacije                | Pre-cache             | `/`, `/manifest.webmanifest`, `/icon-512.png` i `/apple-touch-icon.png` se keširaju tokom radne instalacije |
| Next.js statička sredstva (`/_next/`)         | Mreža na prvom mjestu | Uspješni odgovori ažuriraju keš memoriju; mrežna greška se vraća na postojeći keširani odgovor              |
| Ostali statički CSS, JS, slike i fontovi      | Cache-first           | Postojeći keširani odgovor se ponovo koristi; uspješni odgovori mreže se keširaju na promašaj               |
| Navigacija po stranici                        | Bypass                | Pregledač direktno preuzima stranicu; ne servira se vanmrežna rezerva                                       |
| API, nadzorna ploča i rute za autentifikaciju | Bypass                | Radnik ne presreće niti kešira ove zahtjeve                                                                 |
| Ostali nestatički zahtjevi                    | Mreža                 | Nema keš pretraživanja ili pohrane                                                                          |

Izuzete rute su `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` i `/login`, podudaraju se neosjetljivo na velika i mala slova na granicama putanje. Zahtjevi s više porijekla i ne-GET zahtjevi također zaobilaze radnika.

### Stranica za povezivanje

`/offline` stranica pruža poruku o povezivanju, online/offline indikator, a** Ponovite vezu** dugme i link do stranice statusa. Jeste** nije prethodno keširano** a serviser radi** ne** preusmjeriti neuspjele navigacije na njega. Njegovo postojanje ne čini nove stranice dostupnim bez servera.

### Ikone aplikacija

Manifest reklamira ove PNG ikone:

| File                   | Veličina | Koristi                                      |
| ---------------------- | -------- | -------------------------------------------- |
| `icon-192.png`         | 192×192  | Opća ikona aplikacije                        |
| `icon-512.png`         | 512×512  | Opća ikona aplikacije koja se može maskirati |
| `apple-touch-icon.png` | 180×180  | Apple ikona početnog ekrana                  |

Pregledač bira odgovarajuću ikonu za cilj instalacije.

### Automatska registracija

`PwaRegister` registruje radnika u proizvodnji kada pretraživač podržava servisne radnike. Način razvoja odjavljuje radnike i briše keš memorije kako bi se izbjegla zastarjela sredstva koja ometaju vruće ponovno učitavanje. Uvjeti za instalaciju ostaju odluka preglednika.

## Technical Architecture

### Manifest web aplikacije

Next.js generiše `/manifest.webmanifest` iz [`src/app/manifest.ts`](../../src/app/manifest.ts). Njegove ključne postavke su:

| Podešavanje          | Vrijednost                                     |
| -------------------- | ---------------------------------------------- |
| `short_name`         | `OmniRoute`                                    |
| `start_url`          | `/dashboard`                                   |
| `scope`              | `/`                                            |
| `display`            | `standalone`                                   |
| `orientation`        | `any`                                          |
| Boje pozadine i teme | Zadana svjetlosna paleta iz `PWA_THEME_COLORS` |

Ime i opis manifesta su statičke vrijednosti u toj izvornoj datoteci. Instalirani manifest ne prati postavku imena instance ili aktivnu paletu pri svakoj posjeti.

### Service Worker

[`public/sw.js`](../../public/sw.js) nema zavisnost od servisnog okvira:

- **Instaliraj:** unaprijed kešira četiri gore navedena resursa i aktivira novog radnika.
- **Aktiviraj:** uklanja starije generacije keš memorije i traži klijente.
- **dohvati:** primjenjuje gore navedene strategije statičkih sredstava i isključenja ruta.
- **Verzija:** ime izvorne keš memorije je `omniroute-pwa-v3`; proizvodna izgradnja označava identitet keša.
- **Obavještenja:** obrađuje dolazne `push` događaje i fokusira ili otvara prozor kada se klikne na obavijest.

Rukovaoci Push događajima sami po sebi ne uspostavljaju aktivnu push pretplatu ili konfiguriranu isporuku poslužitelja. Nemojte pretpostavljati da su obavještenja omogućena samo zato što je PWA instaliran.

### Metapodaci rasporeda i registracija

[`src/app/layout.tsx`](../../src/app/layout.tsx) pruža vezu manifesta, Apple samostalne metapodatke, boje teme i `viewport-fit: cover`. Naslov stranice i naslov Apple web-aplikacije koriste naziv instance. Boja teme pretraživača uživo prati paletu; manifest za instalaciju koristi zadanu boju svjetla.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) radi na klijentu i registruje `/sw.js` sa build ID u svom URL. On detektuje neusklađene generacije keša i može resetovati radnika i ponovo učitati jednom da se oporavi od starije instalacije. Greška registracije ne blokira kontrolnu tablu.

## Koristi se s Termuxom (Android)

1. Pokrenite OmniRoute u Termuxu: `npx -y omniroute@latest`.
2. Otvorite Chrome na istom telefonu: `http://localhost:20128`.
3. Instalirajte PWA preko instalacionog menija pretraživača.
4. Neka Termux server radi dok koristite kontrolnu tablu.

Telefon sadrži i gateway i njegovu kontrolnu tablu. Zahtjevi udaljenim AI provajderima i dalje trebaju pristup mreži. Pogledajte [vodič za Termux](TERMUX_GUIDE.md) za postavljanje i razmatranje trajanja Android procesa.

## Koristi sa drugih uređaja

Otvorite HTTPS adresu servera na telefonu, tabletu ili desktopu, a zatim pratite tok instalacije tog pretraživača. Server mora ostati dostupan sa svakog uređaja. Pogledajte [vodič za tunel](../ops/TUNNELS_GUIDE.md) za opcije daljinskog pristupa.

## Prilagodba

### Ime instance

The** Ime instance** postavka mijenja metapodatke kontrolne ploče, uključujući naslov stranice i naslov Apple web-aplikacije. Generirani manifest koristi statički naziv, tako da ova postavka ne garantuje da će već instalirana aplikacija biti preimenovana.

### Custom Favicon

Prilagođeni favicon mijenja favicon pretraživača. Manifest za instalaciju i dalje reklamira gore navedene PNG datoteke; promjena favicon-a ne zamjenjuje te ikone na početnom ekranu.

## Ograničenja

- **Potrebna je serverska veza:** navigacija po stranici, stanje kontrolne ploče i API zahtjevi nemaju rezervni offline.
- **Nema pozadinske sinhronizacije:** vanmrežne radnje nisu stavljene u red za ponavljanje.
- **Razlike u pretraživaču:** instalacijski meniji, prezentacija prozora i podrška za obavijesti razlikuju se od platforme.
- **Nema API predmemorije odgovora:** radnik isključuje rute za API, nadzornu ploču i autentifikaciju.
- **Statičke ikone instalacije:** ažuriranje ovih ikona zahtijeva promjenu reklamiranih sredstava; pretraživači mogu zadržati instalirane metapodatke.

## Files Reference

| File                                                                                   | Svrha                                                     |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Generirani manifest web aplikacije                        |
| [public/sw.js](../../public/sw.js)                                                     | Keširanje, izuzimanja i rukovaoci događaja obavijesti     |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registracija proizvodnje i oporavak stare keš memorije    |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Stranica za povezivanje, a ne automatski rezervni offline |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metapodaci stranice i postavke prikaza                    |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Zajedničke vrijednosti boje teme                          |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 ikona aplikacije                                |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Ikona jabuke                                    |
