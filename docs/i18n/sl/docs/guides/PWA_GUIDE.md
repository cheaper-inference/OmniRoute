# Progressive Web App (PWA) Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Namestite nadzorno ploščo OmniRoute kot progresivno spletno aplikacijo, da jo odprete z domačega zaslona ali namizja v samostojnem oknu. Nameščena aplikacija še vedno potrebuje povezavo z vašim strežnikom OmniRoute za navigacijo, podatke na nadzorni plošči in zahteve API. Predpomnjena statična sredstva ne nudijo prehoda brez povezave ali nadzorne plošče brez povezave.

## Kaj je PWA?

Progresivna spletna aplikacija uporablja spletno nadzorno ploščo z ikono aplikacije in ločenim oknom. Ko je nameščen, OmniRoute:

- Zažene se z domačega zaslona ali namizja
- Odpre se v samostojnem načinu, brez običajne naslovne vrstice in zavihkov brskalnika
- Predpomni izbrana statična sredstva
- Podpira pokončno in ležečo usmeritev

## Namestitev

Uporabite naslov HTTPS za strežnik v drugi napravi. Ko strežnik deluje na isti napravi, `http://localhost:20128` izpolnjuje tudi zahteve glede namestitve brskalnika. Navadni naslov `http://YOUR_IP:20128` ne izpolnjuje teh zahtev. Namestitveni meniji in pozivi so odvisni od brskalnika in operacijskega sistema. Oglejte si [zahteve za namestitev PWA za MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Odprite svoj naslov OmniRoute HTTPS ali `http://localhost:20128` za strežnik na istem telefonu.
2. Odprite**⋮** meni in izberite** Namestite aplikacijo** oz** Dodaj na začetni zaslon** , če je na voljo.
3. Potrdite poziv.
4. Odprite OmniRoute z začetnega zaslona.

### iOS (Safari)

1. Odprite svoj naslov OmniRoute HTTPS v Safariju.
2. Tapnite** Delite** →** Dodaj na začetni zaslon** .
3. Potrdite ime in tapnite** Dodaj** .
4. Odprite OmniRoute z začetnega zaslona.

### Namizje (Chrome/Edge)

1. Odprite nadzorno ploščo OmniRoute.
2. Uporabite ikono za namestitev brskalnika ali** Namestite aplikacijo** vnos v meni, če je na voljo.
3. Potrdite poziv za odpiranje OmniRoute v lastnem oknu.

## Lastnosti

### Samostojno okno

Manifest določa `display: "standalone"` in `start_url: "/dashboard"`. Nameščena aplikacija odpre nadzorno ploščo v oknu aplikacije. Kontrolniki brskalnika in operacijskega sistema se lahko še vedno prikažejo; manifest ne zahteva celozaslonskega načina.

### Predpomnjena sredstva in omrežne zahteve

[Storitveni delavec](../../public/sw.js) predpomni izbrane vire istega izvora:

| Zahteva ali sredstvo                                   | Strategija            | Vedenje                                                                                                                       |
| ------------------------------------------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Sredstva za čas namestitve                             | Predpomnilnik         | `/`, `/manifest.webmanifest`, `/icon-512.png` in `/apple-touch-icon.png` se med namestitvijo delavca shranijo v predpomnilnik |
| statična sredstva Next.js (`/_next/`)                  | Najprej omrežje       | Uspešni odgovori posodobijo predpomnilnik; omrežna napaka se vrne na obstoječi predpomnjeni odgovor                           |
| Druge statične CSS, JS, slike in pisave                | Najprej predpomnilnik | Obstoječi predpomnjeni odgovor se ponovno uporabi; uspešni omrežni odzivi se shranijo v predpomnilnik ob zgrešenem            |
| Navigacija po straneh                                  | Obvoznica             | Brskalnik pridobi stran neposredno; nobena nadomestna možnost brez povezave ni na voljo                                       |
| API, nadzorna plošča in poti za preverjanje pristnosti | Obvoznica             | Delavec teh zahtev ne prestreže ali predpomni                                                                                 |
| Druge nestatične zahteve                               | Omrežje               | Brez iskanja predpomnilnika ali shranjevanja                                                                                  |

Izključene poti so `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` in `/login`, ki se na mejah poti ujemajo brez upoštevanja velikih in malih črk. Zahteve navzkrižnega izvora in ne-GET prav tako obidejo delavca.

### Stran za povezljivost

Stran `/offline` ponuja sporočilo o povezljivosti, indikator online/offline, a** Poskusite znova vzpostaviti povezavo** in povezavo do strani s stanjem. Je** ni predpomnjeno** in serviser počne** ne** preusmeri neuspele navigacije nanj. Njegov obstoj ne omogoča dostopa do novih strani brez strežnika.

### Ikone aplikacij

Manifest oglašuje te ikone PNG :

| Datoteka               | Velikost | Uporaba                                             |
| ---------------------- | -------- | --------------------------------------------------- |
| `icon-192.png`         | 192×192  | Splošna ikona aplikacije                            |
| `icon-512.png`         | 512×512  | Splošna ikona aplikacije, ki jo je mogoče maskirati |
| `apple-touch-icon.png` | 180×180  | Ikona domačega zaslona Apple                        |

Brskalnik izbere ustrezno ikono za cilj namestitve.

### Samodejna registracija

`PwaRegister` registrira delavca v proizvodnji, ko brskalnik podpira storitvene delavce. Razvojni način odjavi delavce in počisti predpomnilnike, da se izogne zastarelim sredstvom, ki motijo vroče ponovno nalaganje. Pozivi za namestitev ostajajo odločitev brskalnika.

## Tehnična arhitektura

### Manifest spletne aplikacije

Next.js ustvari `/manifest.webmanifest` iz [`src/app/manifest.ts`](../../src/app/manifest.ts). Njegove ključne nastavitve so:

| Nastavitev           | Vrednost                                              |
| -------------------- | ----------------------------------------------------- |
| `short_name`         | `OmniRoute`                                           |
| `start_url`          | `/dashboard`                                          |
| `scope`              | `/`                                                   |
| `display`            | `standalone`                                          |
| `orientation`        | `any`                                                 |
| Barve ozadja in teme | Privzeta svetlobna paleta podjetja `PWA_THEME_COLORS` |

Ime in opis manifesta sta statične vrednosti v tej izvorni datoteki. Nameščeni manifest ne sledi nastavitvi imena primerka ali aktivni paleti ob vsakem obisku.

### Storitveni delavec

[`public/sw.js`](../../public/sw.js) nima odvisnosti od okvira storitvenega delavca:

- **Namesti:** vnaprej shrani štiri zgoraj navedene vire in aktivira novega delavca.
- **Aktiviraj:** odstrani starejše generacije predpomnilnika in zahteva odjemalce.
- **Prinesi:** uporablja zgoraj navedene strategije statičnega sredstva in izključitve poti.
- **Različice:** ime izvornega predpomnilnika je `omniroute-pwa-v3`; produkcijska zgradba žigosa identiteto predpomnilnika.
- **Obvestila:** obravnava dohodne dogodke `push` in osredotoči ali odpre okno, ko se klikne obvestilo.

Obravnavalniki potisnih dogodkov sami ne vzpostavijo aktivne potisne naročnine ali konfigurirane dostave strežnika. Ne domnevajte, da so obvestila omogočena samo zato, ker je PWA nameščen.

### Metapodatki postavitve in registracija

[`src/app/layout.tsx`](../../src/app/layout.tsx) zagotavlja povezavo do manifesta, samostojne metapodatke Apple, barve tem in `viewport-fit: cover`. Naslov strani in naslov spletne aplikacije Apple uporabljata ime primerka. Barva teme brskalnika v živo sledi paleti; namestitveni manifest uporablja privzeto barvo svetlobe.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) deluje na odjemalcu in registrira `/sw.js` z gradnjo ID v svojem URL. Zazna neusklajene generacije predpomnilnika in lahko ponastavi delavca ter enkrat znova naloži, da obnovi starejšo namestitev. Napaka pri registraciji ne blokira nadzorne plošče.

## Uporaba s Termuxom (Android)

1. Zaženite OmniRoute v Termuxu: `npx -y omniroute@latest`.
2. Odprite Chrome na istem telefonu: `http://localhost:20128`.
3. Namestite PWA prek namestitvenega menija brskalnika.
4. Med uporabo nadzorne plošče ohranite delovanje strežnika Termux.

Telefon gosti tako prehod kot nadzorno ploščo. Zahteve za oddaljene ponudnike AI še vedno potrebujejo dostop do omrežja. Oglejte si [vodnik Termux](TERMUX_GUIDE.md) za nastavitev in premisleke o življenjski dobi procesa Android.

## Uporaba iz drugih naprav

Odprite naslov HTTPS strežnika v telefonu, tabličnem računalniku ali namizju, nato sledite namestitvenemu toku tega brskalnika. Strežnik mora ostati dosegljiv iz vsake naprave. Glejte [vodnik po tunelu](../ops/TUNNELS_GUIDE.md) za možnosti oddaljenega dostopa.

## Prilagajanje

### Ime primerka

The** Ime primerka** nastavitev spremeni metapodatke nadzorne plošče, vključno z naslovom strani in naslovom spletne aplikacije Apple. Ustvarjeni manifest uporablja statično ime, zato ta nastavitev ne zagotavlja, da se že nameščena aplikacija preimenuje.

### Favicon po meri

Ikona priljubljene strani po meri spremeni ikono priljubljene strani brskalnika. Manifest namestitve še vedno oglašuje zgornje datoteke PNG ; spreminjanje ikone priljubljenega ne nadomesti teh ikon na domačem zaslonu.

## Omejitve

- **Zahtevana povezava s strežnikom:** navigacija po straneh, stanje nadzorne plošče in zahteve API nimajo nadomestne možnosti brez povezave.
- **Brez sinhronizacije v ozadju:** dejanja brez povezave niso v čakalni vrsti za ponovno predvajanje.
- **Razlike v brskalnikih:** namestitveni meniji, predstavitev oken in podpora za obvestila se razlikujejo glede na platformo.
- **Ni predpomnilnika odgovorov API :** delavec izključuje API, nadzorno ploščo in poti za preverjanje pristnosti.
- **Statične namestitvene ikone:** posodabljanje teh ikon zahteva spremembo oglaševanih sredstev; brskalniki lahko obdržijo nameščene metapodatke.

## Referenčne datoteke

| Datoteka                                                                               | Namen                                                              |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Ustvarjen manifest spletne aplikacije                              |
| [public/sw.js](../../public/sw.js)                                                     | Predpomnjenje, izključitve in obdelovalci dogodkov obvestila       |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registracija proizvodnje in obnovitev zastarelega predpomnilnika   |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Stran za povezljivost, ne samodejna nadomestna stran brez povezave |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metapodatki strani in nastavitve vidnega polja                     |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Vrednosti barve teme v skupni rabi                                 |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 ikona aplikacije × 512                                         |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Ikona Apple                                              |
