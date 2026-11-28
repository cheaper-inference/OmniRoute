# Progressive Web App (PWA) Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Instalirajte nadzornu ploču OmniRoute kao progresivnu web-aplikaciju da biste je otvorili s početnog zaslona ili radne površine u samostalnom prozoru. Instalirana aplikacija i dalje treba vezu s vašim OmniRoute poslužiteljem za navigaciju, podatke nadzorne ploče i API zahtjeve. Predmemorirana statička sredstva ne pružaju izvanmrežni pristupnik ili izvanmrežnu nadzornu ploču.

## Što je PWA?

Progresivna web-aplikacija koristi web-kontrolnu ploču s ikonom aplikacije i zasebnim prozorom. Jednom instaliran, OmniRoute:

- Pokreće se s početnog zaslona ili radne površine
- Otvara se u samostalnom načinu rada, bez uobičajene adresne trake i kartica preglednika
- Sprema odabrana statička sredstva u predmemoriju
- Podržava portretnu i pejzažnu orijentaciju

## Montaža

Koristite HTTPS adresu za poslužitelj na drugom uređaju. Kada poslužitelj radi na istom uređaju, `http://localhost:20128` također ispunjava zahtjeve za instalaciju preglednika. Obična `http://YOUR_IP:20128` adresa ne ispunjava te zahtjeve. Instalacijski izbornici i upute ovise o pregledniku i operativnom sustavu. Pogledajte [MDN-ove PWA instalacijske zahtjeve](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Otvorite svoju OmniRoute HTTPS adresu ili `http://localhost:20128` za poslužitelj na istom telefonu.
2. Otvorite**⋮** izbornik i odaberite** Instalirajte aplikaciju** ili** Dodaj na početni zaslon** , ako se nudi.
3. Potvrdite upit.
4. Otvorite OmniRoute s početnog zaslona.

### iOS (safari)

1. Otvorite svoju OmniRoute HTTPS adresu u Safariju.
2. Dodirnite** Udio** →** Dodaj na početni zaslon** .
3. Potvrdite naziv i dodirnite** Dodati** .
4. Otvorite OmniRoute s početnog zaslona.

### Radna površina (Chrome/Edge)

1. Otvorite svoju OmniRoute nadzornu ploču.
2. Koristite ikonu za instalaciju preglednika ili** Instalirajte aplikaciju** unos u izbornik, ako je ponuđen.
3. Potvrdite upit za otvaranje OmniRoute u vlastitom prozoru.

## Značajke

### Samostalni prozor

Manifest postavlja `display: "standalone"` i `start_url: "/dashboard"`. Instalirana aplikacija otvara nadzornu ploču u prozoru aplikacije. Kontrole preglednika i operativnog sustava i dalje se mogu pojaviti; manifest ne zahtijeva način rada preko cijelog zaslona.

### Predmemorirana sredstva i mrežni zahtjevi

[Uslužni radnik](../../public/sw.js) predmemorira odabrane resurse istog porijekla:

| Zahtjev ili sredstvo                                 | Strategija            | Ponašanje                                                                                                                      |
| ---------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Resursi za vrijeme instalacije                       | Predmemorija          | `/`, `/manifest.webmanifest`, `/icon-512.png` i `/apple-touch-icon.png` pohranjuju se u predmemoriju tijekom radne instalacije |
| Next.js statička sredstva (`/_next/`)                | Mreža na prvom mjestu | Uspješni odgovori ažuriraju predmemoriju; mrežna pogreška vraća se na postojeći odgovor u predmemoriji                         |
| Ostali statički CSS, JS, slike i fontovi             | Najprije predmemorija | Ponovno se koristi postojeći predmemorirani odgovor; uspješni mrežni odgovori spremaju se u predmemoriju na promašaj           |
| Navigacija po stranici                               | Zaobići               | Preglednik izravno dohvaća stranicu; ne poslužuje se izvanmrežna zamjena                                                       |
| API, nadzorna ploča i rute za provjeru autentičnosti | Zaobići               | Radnik ne presreće niti sprema ove zahtjeve u predmemoriju                                                                     |
| Ostali nestatički zahtjevi                           | Mreža                 | Nema traženja predmemorije ili pohrane                                                                                         |

Isključene rute su `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` i `/login`, sparene bez obzira na velika i mala slova na granicama staze. Cross-origin i non-GET zahtjevi također zaobilaze radnika.

### Stranica za povezivanje

Stranica `/offline` pruža poruku o povezivanju, indikator online/offline, a** Ponovno pokušaj povezivanje** gumb i poveznicu na stranicu statusa. jeste** nije unaprijed predmemorirano** a uslužni radnik radi** ne** preusmjeriti neuspjele navigacije na njega. Njegovo postojanje ne čini nove stranice dostupnima bez poslužitelja.

### Ikone aplikacija

Manifest reklamira ove PNG ikone:

| File                   | Veličina | Koristiti                                    |
| ---------------------- | -------- | -------------------------------------------- |
| `icon-192.png`         | 192×192  | Opća ikona aplikacije                        |
| `icon-512.png`         | 512×512  | Opća ikona aplikacije koja se može maskirati |
| `apple-touch-icon.png` | 180×180  | Apple ikona početnog zaslona                 |

Preglednik odabire odgovarajuću ikonu za cilj instalacije.

### Automatska registracija

`PwaRegister` registrira radnika u proizvodnji kada preglednik podržava servisne radnike. Razvojni način poništava registraciju radnika i briše predmemorije kako bi se izbjeglo da zastarjela sredstva ometaju vruće ponovno učitavanje. Upiti za instalaciju ostaju odluka preglednika.

## Tehnička arhitektura

### Manifest web aplikacije

Next.js generira `/manifest.webmanifest` iz [`src/app/manifest.ts`](../../src/app/manifest.ts). Njegove ključne postavke su:

| Postavka             | Vrijednost                                     |
| -------------------- | ---------------------------------------------- |
| `short_name`         | `OmniRoute`                                    |
| `start_url`          | `/dashboard`                                   |
| `scope`              | `/`                                            |
| `display`            | `standalone`                                   |
| `orientation`        | `any`                                          |
| Boje pozadine i teme | Zadana svjetlosna paleta iz `PWA_THEME_COLORS` |

Naziv i opis manifesta statične su vrijednosti u toj izvornoj datoteci. Instalirani manifest ne prati postavku naziva instance ili aktivnu paletu pri svakom posjetu.

### Uslužni radnik

[`public/sw.js`](../../public/sw.js) nema ovisnost o okviru servisnog radnika:

- **Instalirati:** unaprijed sprema četiri gore navedena resursa i aktivira novog radnika.
- **Aktivirati:** uklanja starije generacije predmemorije i potražuje klijente.
- **Dohvati:** primjenjuje gore navedene strategije statične imovine i izuzimanja rute.
- **Verzija:** ime izvorne predmemorije je `omniroute-pwa-v3`; proizvodna verzija označava identitet predmemorije.
- **Obavijesti:** obrađuje dolazne `push` događaje i fokusira ili otvara prozor kada se klikne obavijest.

Rukovatelji push događajima sami po sebi ne uspostavljaju aktivnu push pretplatu ili isporuku konfiguriranog poslužitelja. Nemojte pretpostavljati da su obavijesti omogućene samo zato što je PWA instaliran.

### Metapodaci izgleda i registracija

[`src/app/layout.tsx`](../../src/app/layout.tsx) pruža vezu manifesta, Appleove samostalne metapodatke, boje teme i `viewport-fit: cover`. Naslov stranice i naslov Apple web-aplikacije koriste naziv instance. Boja teme preglednika uživo slijedi paletu; instalacijski manifest koristi zadanu boju svjetla.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) radi na klijentu i registrira `/sw.js` s međugradnjom ID u svom URL. Otkriva neusklađene generacije predmemorije i može resetirati radnu datoteku i ponovno učitati jednom za oporavak od starije instalacije. Neuspjeh registracije ne blokira nadzornu ploču.

## Upotreba s Termuxom (Android)

1. Pokrenite OmniRoute u Termuxu: `npx -y omniroute@latest`.
2. Otvorite Chrome na istom telefonu: `http://localhost:20128`.
3. Instalirajte PWA putem instalacijskog izbornika preglednika.
4. Neka Termux poslužitelj radi dok koristite nadzornu ploču.

Telefon ugošćuje i pristupnik i nadzornu ploču. Zahtjevi udaljenim AI pružateljima i dalje trebaju pristup mreži. Pogledajte [Termux vodič](TERMUX_GUIDE.md) za razmatranja postavljanja i životnog vijeka Android procesa.

## Upotreba s drugih uređaja

Otvorite HTTPS adresu poslužitelja na telefonu, tabletu ili stolnom računalu, zatim slijedite tijek instalacije tog preglednika. Poslužitelj mora ostati dostupan sa svakog uređaja. Pogledajte [vodič za tunel](../ops/TUNNELS_GUIDE.md) za mogućnosti daljinskog pristupa.

## Prilagodba

### Naziv instance

The** Naziv instance** postavka mijenja metapodatke nadzorne ploče, uključujući naslov stranice i naslov Apple web-aplikacije. Generirani manifest koristi statički naziv, tako da ova postavka ne jamči da će već instalirana aplikacija biti preimenovana.

### Prilagođeni Favicon

Prilagođeni favicon mijenja favicon preglednika. Instalacijski manifest još uvijek reklamira PNG datoteke iznad; promjena favicona ne zamjenjuje one ikone početnog zaslona.

## Ograničenja

- **Potrebna veza s poslužiteljem:** navigacija stranicom, stanje nadzorne ploče i API zahtjevi nemaju offline zamjenu.
- **Nema sinkronizacije u pozadini:** izvanmrežne radnje nisu u redu čekanja za ponovnu reprodukciju.
- **Razlike u pregledniku:** instalacijski izbornici, prezentacija prozora i podrška za obavijesti razlikuju se ovisno o platformi.
- **Nema predmemorije API odgovora:** radnik isključuje API, nadzornu ploču i autentifikacijske rute.
- **Statičke ikone instalacije:** ažuriranje tih ikona zahtijeva promjenu oglašenih sredstava; preglednici mogu zadržati instalirane metapodatke.

## Referenca datoteka

| File                                                                                   | Svrha                                                        |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Generirani manifest web-aplikacije                           |
| [public/sw.js](../../public/sw.js)                                                     | Predmemorija, izuzeci i rukovatelji događajima obavijesti    |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registracija proizvodnje i oporavak od ustajale predmemorije |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Stranica za povezivanje, a ne automatski izvanmrežni povrat  |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metapodaci stranice i postavke prikaza                       |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Zajedničke vrijednosti boja teme                             |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 ikona aplikacije                                   |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Ikona Apple                                        |
