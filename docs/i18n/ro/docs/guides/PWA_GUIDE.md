# Progressive Web App (PWA) Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Instalați tabloul de bord OmniRoute ca o aplicație web progresivă pentru a o deschide de pe ecranul de pornire sau de pe desktop într-o fereastră autonomă. Aplicația instalată mai are nevoie de o conexiune la serverul dvs. OmniRoute pentru navigare, date de bord și solicitări API. Elementele statice stocate în cache nu oferă un gateway offline sau un tablou de bord offline.

## Ce este un PWA?

O aplicație web progresivă utilizează tabloul de bord web cu o pictogramă pentru aplicație și o fereastră separată. Odată instalat, OmniRoute:

- Se lansează de pe ecranul de pornire sau de pe desktop
- Se deschide în modul independent, fără bara de adrese și file obișnuite ale browserului
- Memorează în cache elementele statice selectate
- Acceptă orientări portret și peisaj

## Instalare

Utilizați o adresă HTTPS pentru un server de pe alt dispozitiv. Când serverul rulează pe același dispozitiv, `http://localhost:20128` îndeplinește și cerințele de instalare a browserului. O adresă `http://YOUR_IP:20128` simplă nu îndeplinește aceste cerințe. Meniurile și solicitările de instalare depind de browser și de sistemul de operare. Consultați [cerințele de instalare PWA ale MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Deschideți adresa OmniRoute HTTPS sau `http://localhost:20128` pentru un server pe același telefon.
2. Deschideți**⋮** meniu și alegeți** Instalați aplicația** sau** Adăugați la ecranul de pornire** , dacă este oferit.
3. Confirmați solicitarea.
4. Deschideți OmniRoute din ecranul de start.

### iOS (Safari)

1. Deschideți adresa OmniRoute HTTPS în Safari.
2. Robinet** Distribuie** →** Adăugați la ecranul de pornire** .
3. Confirmați numele și atingeți** Adăuga** .
4. Deschideți OmniRoute din ecranul de start.

### Desktop (Chrome/Edge)

1. Deschideți tabloul de bord OmniRoute.
2. Utilizați pictograma de instalare a browserului sau** Instalați aplicația** intrare în meniu, dacă este oferit.
3. Confirmați solicitarea de a deschide OmniRoute în propria fereastră.

## Caracteristici

### Fereastra autonomă

Manifestul setează `display: "standalone"` și `start_url: "/dashboard"`. Aplicația instalată deschide tabloul de bord într-o fereastră a aplicației. Controalele browserului și ale sistemului de operare pot apărea în continuare; manifestul nu solicită modul ecran complet.

### Activele memorate în cache și cerințele rețelei

[Lucrătorul de servicii](../../public/sw.js) memorează în cache resursele selectate de aceeași origine:

| Cerere sau activ                             | Strategie              | Comportament                                                                                                                     |
| -------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Resurse în timpul instalării                 | Pre-cache              | `/`, `/manifest.webmanifest`, `/icon-512.png` și `/apple-touch-icon.png` sunt stocate în cache în timpul instalării lucrătorului |
| active statice Next.js (`/_next/`)           | Rețeaua în primul rând | Răspunsurile de succes actualizează memoria cache; o eroare de rețea se întoarce la un răspuns existent în cache                 |
| Alte CSS statice, JS, imagini și fonturi     | Cache-în primul rând   | Un răspuns existent din cache este reutilizat; răspunsurile reușite ale rețelei sunt stocate în cache la o ratare                |
| Navigare în pagină                           | Bypass                 | Browserul preia pagina direct; nu este oferită nicio rezervă offline                                                             |
| API, tablou de bord și rute de autentificare | Bypass                 | Lucrătorul nu interceptează sau memorează în cache aceste solicitări                                                             |
| Alte solicitări non-statice                  | Reţea                  | Fără căutare în cache sau stocare                                                                                                |

Rutele excluse sunt `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` și `/login`, care nu țin seama de majuscule și minuscule la granițele căii. Solicitările de origine încrucișată și non-GET ocolesc, de asemenea, lucrătorul.

### Pagina de conectivitate

Pagina `/offline` oferă un mesaj de conectivitate, un indicator online/offline, a** Reîncercați conectarea** butonul și un link către pagina de stare. Este** nu pre-cache** iar lucrătorul de serviciu o face** nu** redirecționează navigațiile eșuate către acesta. Existența sa nu face accesibile pagini noi fără server.

### Pictogramele aplicației

Manifestul face publicitate acestor pictograme PNG :

| Fişier                 | Dimensiune | Utilizare                                 |
| ---------------------- | ---------- | ----------------------------------------- |
| `icon-192.png`         | 192×192    | Pictograma aplicației generale            |
| `icon-512.png`         | 512×512    | Pictogramă aplicație generală și masabilă |
| `apple-touch-icon.png` | 180×180    | Pictograma Apple pe ecranul de pornire    |

Browserul selectează pictograma corespunzătoare pentru ținta de instalare.

### Înregistrare automată

`PwaRegister` înregistrează lucrătorul în producție atunci când browserul acceptă lucrătorii de service. Modul de dezvoltare anulează înregistrarea lucrătorilor și șterge memoria cache pentru a evita ca activele învechite să interfereze cu reîncărcarea la cald. Solicitările de instalare rămân o decizie a browserului.

## Arhitectura Tehnica

### Manifestul aplicației web

Next.js generează `/manifest.webmanifest` din [`src/app/manifest.ts`](../../src/app/manifest.ts). Setările sale cheie sunt:

| Setare                   | Valoare                                          |
| ------------------------ | ------------------------------------------------ |
| `short_name`             | `OmniRoute`                                      |
| `start_url`              | `/dashboard`                                     |
| `scope`                  | `/`                                              |
| `display`                | `standalone`                                     |
| `orientation`            | `any`                                            |
| Culori de fundal și teme | Paleta de lumină implicită de `PWA_THEME_COLORS` |

Numele și descrierea manifestului sunt valori statice în acel fișier sursă. Manifestul instalat nu urmează setarea numelui instanței sau paleta activă la fiecare vizită.

### Lucrător de serviciu

[`public/sw.js`](../../public/sw.js) nu are nicio dependență de cadru de lucrător al serviciului:

- **Instala:** pre-cachează cele patru resurse enumerate mai sus și activează noul lucrător.
- **Activa:** elimină generațiile mai vechi de cache și revendică clienți.
- **Preluare:** aplică strategiile de active statice și excluderile de rute de mai sus.
- **Versiune:** numele cache-ului sursă este `omniroute-pwa-v3`; build-ul de producție ștampilă identitatea cache-ului.
- **Notificări:** gestionează evenimentele `push` primite și concentrează sau deschide o fereastră atunci când se face clic pe o notificare.

Numai gestionatorii de evenimente push nu stabilesc un abonament push activ sau livrarea de server configurată. Nu presupuneți că notificările sunt activate doar pentru că PWA este instalat.

### Aspect metadate și înregistrare

[`src/app/layout.tsx`](../../src/app/layout.tsx) oferă linkul manifest, metadatele Apple independente, culorile temei și `viewport-fit: cover`. Titlul paginii și titlul aplicației web Apple folosesc numele instanței. Culoarea temei browser live urmează paleta; manifestul de instalare folosește culoarea deschisă implicită.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) rulează pe client și înregistrează `/sw.js` cu build ID în URL său. Detectează generațiile de cache nepotrivite și poate reseta lucrătorul și reîncărca o dată pentru a recupera de la o instalare mai veche. Eșecul de înregistrare nu blochează tabloul de bord.

## Utilizați cu Termux (Android)

1. Porniți OmniRoute în Termux: `npx -y omniroute@latest`.
2. Deschideți Chrome pe același telefon: `http://localhost:20128`.
3. Instalați PWA prin meniul de instalare al browserului.
4. Mențineți serverul Termux în funcțiune în timp ce utilizați tabloul de bord.

Telefonul găzduiește atât gateway-ul, cât și tabloul de bord. Solicitările către furnizorii AI de la distanță necesită încă acces la rețea. Consultați [ghidul Termux](TERMUX_GUIDE.md) pentru considerații privind configurarea și durata de viață a procesului Android.

## Utilizați de pe alte dispozitive

Deschideți adresa HTTPS a serverului pe un telefon, tabletă sau desktop, apoi urmați fluxul de instalare al browserului respectiv. Serverul trebuie să rămână accesibil de pe fiecare dispozitiv. Consultați [ghidul tunelului](../ops/TUNNELS_GUIDE.md) pentru opțiunile de acces la distanță.

## Personalizare

### Nume instanță

The** Nume instanță** setarea modifică metadatele tabloului de bord, inclusiv titlul paginii și titlul aplicației web Apple. Manifestul generat folosește un nume static, astfel încât această setare nu garantează că o aplicație deja instalată este redenumită.

### Favicon personalizat

O favicon personalizată modifică favicon-ul browserului. Manifestul de instalare încă face publicitate fișierelor PNG de mai sus; schimbarea favicon-ului nu înlocuiește acele pictograme de pe ecranul de pornire.

## Limitări

- **Este necesară conexiunea la server:** navigarea în pagină, starea tabloului de bord și solicitările API nu au o rezervă offline.
- **Fără sincronizare în fundal:** acțiunile offline nu sunt puse în coadă pentru reluare.
- **Diferențele de browser:** meniurile de instalare, prezentarea ferestrelor și suportul pentru notificări variază în funcție de platformă.
- **Fără cache de răspuns API :** lucrătorul exclude API, tabloul de bord și rutele de autentificare.
- **Pictograme de instalare statică:** actualizarea acelor pictograme necesită schimbarea activelor anunțate; browserele pot păstra metadatele instalate.

## Referință pentru fișiere

| Fişier                                                                                 | Scop                                                                       |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Manifestul aplicației web generat                                          |
| [public/sw.js](../../public/sw.js)                                                     | Memorarea în cache, excluderile și gestionarea evenimentelor de notificare |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Înregistrarea producției și recuperarea cache-ului învechit                |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Pagina de conectivitate, nu o rezervă automată offline                     |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Setări pentru metadatele paginii și fereastra de vizualizare               |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Valori temă-culoare partajate                                              |
| [public/icon-512.png](../../public/icon-512.png)                                       | Pictograma aplicației 512 × 512                                            |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Pictograma Apple                                                 |
