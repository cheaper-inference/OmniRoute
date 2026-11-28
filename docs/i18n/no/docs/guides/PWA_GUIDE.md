# Progressive Web App (PWA) Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Installer OmniRoute -dashbordet som en progressiv nettapp for å åpne det fra startskjermen eller skrivebordet i et frittstående vindu. Den installerte appen trenger fortsatt en tilkobling til OmniRoute serveren din for navigasjon, dashborddata og API forespørsler. Bufrede statiske ressurser gir ikke en frakoblet gateway eller et frakoblet dashbord.

## Hva er en PWA?

En progressiv nettapp bruker nettdashbordet med et appikon og et eget vindu. Når den er installert, OmniRoute:

- Starter fra startskjermen eller skrivebordet
- Åpnes i frittstående modus, uten nettleserens vanlige adressefelt og faner
- Buffer valgte statiske ressurser
- Støtter portrett- og landskapsorientering

## Installasjon

Bruk en HTTPS adresse for en server på en annen enhet. Når serveren kjører på samme enhet, oppfyller `http://localhost:20128` også krav til nettleserinstallasjon. En vanlig `http://YOUR_IP:20128` adresse oppfyller ikke disse kravene. Installasjonsmenyer og ledetekster avhenger av nettleseren og operativsystemet. Se [MDNPWA installasjonskrav](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Åpne OmniRoute HTTPS adressen din, eller `http://localhost:20128` for en server på samme telefon.
2. Åpne**⋮** meny og velg** Installer appen** eller** Legg til på startskjermen** , hvis det tilbys.
3. Bekreft forespørselen.
4. Åpne OmniRoute fra startskjermen.

### iOS (Safari)

1. Åpne OmniRoute HTTPS -adressen din i Safari.
2. Trykk på** Dele** →** Legg til på startskjermen** .
3. Bekreft navnet og trykk** Legge til** .
4. Åpne OmniRoute fra startskjermen.

### Desktop (Chrome / Edge)

1. Åpne OmniRoute dashbordet.
2. Bruk nettleserens installasjonsikon eller** Installer appen** menyoppføring, hvis tilbudt.
3. Bekreft forespørselen om å åpne OmniRoute i sitt eget vindu.

## Funksjoner

### Frittstående vindu

Manifestet setter `display: "standalone"` og `start_url: "/dashboard"`. Den installerte appen åpner dashbordet i et appvindu. Nettleser- og operativsystemkontroller kan fortsatt vises; manifestet ber ikke om fullskjermmodus.

### Bufret aktiva og nettverkskrav

[Tjenestearbeideren](../../public/sw.js) bufrer valgte ressurser med samme opprinnelse:

| Forespørsel eller eiendel                | Strategi       | Oppførsel                                                                                                  |
| ---------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| Installasjonstidsressurser               | Pre-cache      | `/`, `/manifest.webmanifest`, `/icon-512.png` og `/apple-touch-icon.png` bufres under arbeiderinstallasjon |
| Next.js statiske eiendeler (`/_next/`)   | Nettverk først | Vellykkede svar oppdaterer cachen; en nettverksfeil faller tilbake til et eksisterende hurtigbufret svar   |
| Andre statiske CSS, JS, bilder og fonter | Cache-først    | Et eksisterende hurtigbufret svar gjenbrukes; vellykkede nettverkssvar bufres på en miss                   |
| Sidenavigering                           | Bypass         | Nettleseren henter siden direkte; ingen frakoblet reserve er levert                                        |
| API, dashbord og autentiseringsruter     | Bypass         | Arbeideren fanger ikke opp eller hurtigbuffer disse forespørslene                                          |
| Andre ikke-statiske forespørsler         | Nettverk       | Ingen hurtigbufferoppslag eller lagring                                                                    |

De ekskluderte rutene er `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` og `/login`, matchet ufølsomt for store og små bokstaver ved banegrenser. Kryssopprinnelses- og ikke-GET-forespørsler omgår også arbeideren.

### Tilkoblingsside

`/offline` siden gir en tilkoblingsmelding, en online/offline indikator, en** Prøv å koble til på nytt** knappen og en lenke til statussiden. Det er det** ikke forhåndsbufret** og servicearbeideren gjør det** ikke** omdirigere mislykkede navigasjoner til den. Dens eksistens gjør ikke nye sider tilgjengelige uten serveren.

### App-ikoner

Manifestet annonserer disse PNG ikonene:

| Fil                    | Størrelse | Bruk                           |
| ---------------------- | --------- | ------------------------------ |
| `icon-192.png`         | 192×192   | Generelt appikon               |
| `icon-512.png`         | 512×512   | Generelt og maskerbart appikon |
| `apple-touch-icon.png` | 180×180   | Apples startskjermikon         |

Nettleseren velger riktig ikon for installasjonsmålet.

### Automatisk registrering

`PwaRegister` registrerer arbeideren i produksjon når nettleseren støtter tjenestearbeidere. Utviklingsmodus avregistrerer arbeidere og tømmer cacher for å unngå at foreldede eiendeler forstyrrer hot reload. Installasjonsforespørsler forblir en nettleseravgjørelse.

## Teknisk arkitektur

### Web App Manifest

Next.js genererer `/manifest.webmanifest` fra [`src/app/manifest.ts`](../../src/app/manifest.ts). Hovedinnstillingene er:

| Innstilling            | Verdi                                     |
| ---------------------- | ----------------------------------------- |
| `short_name`           | `OmniRoute`                               |
| `start_url`            | `/dashboard`                              |
| `scope`                | `/`                                       |
| `display`              | `standalone`                              |
| `orientation`          | `any`                                     |
| Bakgrunn og temafarger | Standard lyspalett fra `PWA_THEME_COLORS` |

Manifestets navn og beskrivelse er statiske verdier i den kildefilen. Det installerte manifestet følger ikke innstillingen for instansnavn eller den aktive paletten ved hvert besøk.

### Servicemedarbeider

[`public/sw.js`](../../public/sw.js) har ingen rammeverksavhengighet for tjenestearbeidere:

- **Installer:** forhåndsbuffrer de fire ressursene som er oppført ovenfor og aktiverer den nye arbeideren.
- **Aktiver:** fjerner eldre buffergenerasjoner og gjør krav på klienter.
- **Hent:** bruker strategiene for statiske aktiva og ruteekskluderinger ovenfor.
- **Versjon:** kildebuffernavnet er `omniroute-pwa-v3`; produksjonsbygget stempler cache-identiteten.
- **Varsler:** håndterer innkommende `push` -hendelser og fokuserer eller åpner et vindu når et varsel klikkes.

Push-hendelsesbehandlere alene etablerer ikke et aktivt push-abonnement eller konfigurert serverlevering. Ikke anta at varsler er aktivert bare fordi PWA er installert.

### Layout Metadata og registrering

[`src/app/layout.tsx`](../../src/app/layout.tsx) gir manifestkoblingen, frittstående Apple-metadata, temafarger og `viewport-fit: cover`. Sidetittelen og Apple-nettapptittelen bruker forekomstnavnet. Live nettleserens temafarge følger paletten; installasjonsmanifestet bruker standard lysfarge.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) kjører på klienten og registrerer `/sw.js` med build ID i sin URL. Den oppdager uoverensstemmende buffergenerasjoner og kan tilbakestille arbeideren og laste den på nytt én gang for å gjenopprette fra en eldre installasjon. Registreringsfeil blokkerer ikke dashbordet.

## Bruk med Termux (Android)

1. Start OmniRoute i Termux: `npx -y omniroute@latest`.
2. Åpne Chrome på samme telefon: `http://localhost:20128`.
3. Installer PWA gjennom nettleserens installasjonsmeny.
4. Hold Termux-serveren i gang mens du bruker dashbordet.

Telefonen er vert for både gatewayen og dashbordet. Forespørsler til eksterne AI leverandører trenger fortsatt nettverkstilgang. Se [Termux-veiledningen](TERMUX_GUIDE.md) for oppsett og Android-prosessens levetid.

## Bruk fra andre enheter

Åpne serverens HTTPS -adresse på en telefon, nettbrett eller skrivebord, og følg deretter nettleserens installasjonsflyt. Serveren må forbli tilgjengelig fra hver enhet. Se [tunnelguiden](../ops/TUNNELS_GUIDE.md) for alternativer for fjerntilgang.

## Tilpasning

### Forekomstnavn

De** Forekomstnavn** innstillingen endrer dashbordmetadata, inkludert sidetittelen og Apple-nettapptittelen. Det genererte manifestet bruker et statisk navn, så denne innstillingen garanterer ikke at en allerede installert app får nytt navn.

### Egendefinert favorittikon

Et tilpasset favorittikon endrer nettleserens favorittikon. Installasjonsmanifestet annonserer fortsatt PNG filene ovenfor; å endre favorittikonet erstatter ikke disse hjemmeskjermikonene.

## Begrensninger

- **Servertilkobling kreves:** sidenavigasjon, dashbordstatus og API -forespørsler har ikke en offline reserve.
- **Ingen bakgrunnssynkronisering:** offline handlinger står ikke i kø for replay.
- **Nettleserforskjeller:** installasjonsmenyer, vinduspresentasjon og varslingsstøtte varierer fra plattform til plattform.
- **Ingen API -svarbuffer:** arbeideren ekskluderer API, dashbord og autentiseringsruter.
- **Statiske installasjonsikoner:** oppdatering av disse ikonene krever endring av de annonserte eiendelene; nettlesere kan beholde installerte metadata.

## Filreferanse

| Fil                                                                                    | Hensikt                                                  |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Generert nettappmanifest                                 |
| [public/sw.js](../../public/sw.js)                                                     | Caching, ekskluderinger og varslingshendelser            |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Produksjonsregistrering og gjenoppretting av stale-cache |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Tilkoblingsside, ikke en automatisk frakoblet reserve    |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Sidemetadata og visningsportinnstillinger                |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Delte temafargeverdier                                   |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 app-ikon                                       |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple-ikon                                     |
