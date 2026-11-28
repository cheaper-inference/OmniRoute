# Progressive Web App (PWA) Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Installeer het OmniRoute dashboard als een Progressive Web App om het vanaf uw startscherm of desktop in een zelfstandig venster te openen. De geïnstalleerde app heeft nog steeds een verbinding met uw OmniRoute server nodig voor navigatie, dashboardgegevens en API verzoeken. In de cache opgeslagen statische assets bieden geen offline gateway of offline dashboard.

## Wat is een PWA?

Een Progressive Web App maakt gebruik van het webdashboard met een app-pictogram en een apart venster. Eenmaal geïnstalleerd, OmniRoute:

- Wordt gestart vanaf uw startscherm of bureaublad
- Opent in de standalone-modus, zonder de gebruikelijke adresbalk en tabbladen van de browser
- Slaat geselecteerde statische assets op in cache
- Ondersteunt portret- en landschapsoriëntaties

## Installatie

Gebruik een HTTPS -adres voor een server op een ander apparaat. Wanneer de server op hetzelfde apparaat draait, voldoet `http://localhost:20128` ook aan de vereisten voor browserinstallatie. Een gewoon `http://YOUR_IP:20128` adres voldoet niet aan die eisen. Installatiemenu's en aanwijzingen zijn afhankelijk van de browser en het besturingssysteem. Zie [MDN's PWA installatievereisten](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chroom)

1. Open uw OmniRoute HTTPS adres of `http://localhost:20128` voor een server op dezelfde telefoon.
2. Open de**⋮** menu en kies** Installeer app** of** Toevoegen aan startscherm** , indien aangeboden.
3. Bevestig de vraag.
4. Open OmniRoute vanuit het startscherm.

### iOS (Safari)

1. Open uw OmniRoute HTTPS -adres in Safari.
2. Kraan** Deel** →** Toevoegen aan startscherm** .
3. Bevestig de naam en tik op** Toevoegen** .
4. Open OmniRoute vanuit het startscherm.

### Bureaublad (Chrome/Edge)

1. Open uw OmniRoute dashboard.
2. Gebruik het installatiepictogram van de browser of het** Installeer app** menu-item, indien aangeboden.
3. Bevestig de prompt om OmniRoute in een eigen venster te openen.

## Functies

### Zelfstandig venster

Het manifest stelt `display: "standalone"` en `start_url: "/dashboard"`. De geïnstalleerde app opent het dashboard in een app-venster. Browser- en besturingssysteembedieningen kunnen nog steeds verschijnen; het manifest vraagt niet om de modus Volledig scherm.

### In cache opgeslagen activa en netwerkvereisten

De [servicemedewerker](../../public/sw.js) slaat geselecteerde bronnen van dezelfde oorsprong op in de cache:

| Verzoek of bezit                                      | Strategie     | Gedrag                                                                                                                                      |
| ----------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Bronnen voor installatietijd                          | Pre-cache     | `/`, `/manifest.webmanifest`, `/icon-512.png` en `/apple-touch-icon.png` worden in de cache opgeslagen tijdens de installatie van de werker |
| Next.js statische activa (`/_next/`)                  | Netwerk eerst | Succesvolle reacties updaten de cache; een netwerkfout valt terug op een bestaand in de cache opgeslagen antwoord                           |
| Andere statische CSS, JS, afbeeldingen en lettertypen | Cache-eerst   | Een bestaand in de cache opgeslagen antwoord wordt hergebruikt; succesvolle netwerkreacties worden bij een misser in de cache opgeslagen    |
| Paginanavigatie                                       | Omzeilen      | De browser haalt de pagina direct op; er wordt geen offline fallback aangeboden                                                             |
| API, dashboard en authenticatieroutes                 | Omzeilen      | De werker onderschept deze verzoeken niet en slaat deze ook niet op in de cache                                                             |
| Overige niet-statische verzoeken                      | Netwerk       | Geen cache opzoeken of opslag                                                                                                               |

De uitgesloten routes zijn `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` en `/login`, hoofdletterongevoelig op padgrenzen afgestemd. Cross-origin- en niet-GET-aanvragen omzeilen ook de werker.

### Connectiviteitspagina

De `/offline` pagina biedt een connectiviteitsbericht, een online/offline indicator, een** Probeer de verbinding opnieuw** knop en een link naar de statuspagina. Het is** niet vooraf in de cache opgeslagen** en de servicemedewerker doet dat ook** niet** stuur mislukte navigatie ernaar door. Het bestaan ervan maakt nieuwe pagina's niet toegankelijk zonder de server.

### App-pictogrammen

Het manifest maakt reclame voor deze PNG iconen:

| Bestand                | Maat    | Gebruik                               |
| ---------------------- | ------- | ------------------------------------- |
| `icon-192.png`         | 192×192 | Algemeen app-pictogram                |
| `icon-512.png`         | 512×512 | Algemeen en maskeerbaar app-pictogram |
| `apple-touch-icon.png` | 180×180 | Apple-startschermpictogram            |

De browser selecteert het juiste pictogram voor het installatiedoel.

### Automatische registratie

`PwaRegister` registreert de medewerker in productie wanneer de browser servicemedewerkers ondersteunt. De ontwikkelingsmodus maakt de registratie van werknemers ongedaan en wist caches om te voorkomen dat verouderde assets het hot reload verstoren. Installatieprompts blijven een browserbeslissing.

## Technische Architectuur

### Webapp-manifest

Next.js genereert `/manifest.webmanifest` uit [`src/app/manifest.ts`](../../src/app/manifest.ts). De belangrijkste instellingen zijn:

| Instelling                   | Waarde                                          |
| ---------------------------- | ----------------------------------------------- |
| `short_name`                 | `OmniRoute`                                     |
| `start_url`                  | `/dashboard`                                    |
| `scope`                      | `/`                                             |
| `display`                    | `standalone`                                    |
| `orientation`                | `any`                                           |
| Achtergrond- en themakleuren | Het standaard lichtpalet van `PWA_THEME_COLORS` |

De naam en beschrijving van het manifest zijn statische waarden in dat bronbestand. Het geïnstalleerde manifest volgt niet bij elk bezoek de instelling van de instantienaam of het actieve palet.

### Servicemedewerker

[`public/sw.js`](../../public/sw.js) heeft geen raamwerkafhankelijkheid van servicemedewerkers:

- **Installeren:** slaat de vier hierboven genoemde bronnen vooraf op in de cache en activeert de nieuwe werker.
- **Activeren:** verwijdert oudere cachegeneraties en claimclients.
- **Ophalen:** past de bovenstaande strategieën voor statische activa en route-uitsluitingen toe.
- **Versiebeheer:** de naam van de broncache is `omniroute-pwa-v3`; de productiebuild stempelt de cache-identiteit.
- **Meldingen:** verwerkt inkomende `push` -gebeurtenissen en focust of opent een venster wanneer op een melding wordt geklikt.

Push-gebeurtenishandlers alleen brengen geen actief push-abonnement of geconfigureerde serverlevering tot stand. Ga er niet vanuit dat meldingen alleen maar zijn ingeschakeld omdat de PWA is geïnstalleerd.

### Lay-outmetagegevens en registratie

[`src/app/layout.tsx`](../../src/app/layout.tsx) biedt de manifestlink, Apple standalone metadata, themakleuren en `viewport-fit: cover`. De paginatitel en de titel van de Apple web-app gebruiken de instantienaam. De kleur van het live browserthema volgt het palet; het installatiemanifest gebruikt de standaard lichte kleur.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) draait op de client en registreert `/sw.js` met de build ID in zijn URL. Het detecteert niet-overeenkomende cachegeneraties en kan de werker opnieuw instellen en één keer opnieuw laden om te herstellen van een oudere installatie. Een registratiefout blokkeert het dashboard niet.

## Gebruik met Termux (Android)

1. Start OmniRoute in Termux: `npx -y omniroute@latest`.
2. Open Chrome op dezelfde telefoon: `http://localhost:20128`.
3. Installeer de PWA via het installatiemenu van de browser.
4. Houd de Termux-server draaiende terwijl u het dashboard gebruikt.

De telefoon host zowel de gateway als het dashboard. Voor verzoeken aan AI aanbieders op afstand is nog steeds netwerktoegang nodig. Zie de [Termux-handleiding](TERMUX_GUIDE.md) voor overwegingen over installatie en Android-proceslevensduur.

## Gebruik vanaf andere apparaten

Open het HTTPS -adres van de server op een telefoon, tablet of desktop en volg vervolgens de installatiestroom van die browser. De server moet vanaf elk apparaat bereikbaar blijven. Zie de [tunnelgids](../ops/TUNNELS_GUIDE.md) voor opties voor externe toegang.

## Maatwerk

### Instantienaam

De** Instantienaam** instelling wijzigt de metadata van het dashboard, inclusief de paginatitel en de titel van de Apple web-app. Het gegenereerde manifest gebruikt een statische naam, dus deze instelling garandeert niet dat de naam van een reeds geïnstalleerde app wordt gewijzigd.

### Aangepaste favicon

Een aangepast favicon verandert het favicon van de browser. Het installatiemanifest maakt nog steeds reclame voor de bovenstaande PNG bestanden; het wijzigen van de favicon vervangt niet de pictogrammen op het startscherm.

## Beperkingen

- **Serververbinding vereist:** paginanavigatie, dashboardstatus en API -verzoeken hebben geen offline fallback.
- **Geen achtergrondsynchronisatie:** offline acties worden niet in de wachtrij geplaatst voor herhaling.
- **Browserverschillen:** installatiemenu's, vensterpresentatie en ondersteuning voor meldingen variëren per platform.
- **Geen API -antwoordcache:** de werknemer sluit API, dashboard- en authenticatieroutes uit.
- **Statische installatiepictogrammen:** het bijwerken van deze pictogrammen vereist het wijzigen van de geadverteerde items; browsers kunnen geïnstalleerde metagegevens behouden.

## Bestandenreferentie

| Bestand                                                                                | Doel                                                           |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Gegenereerd web-app-manifest                                   |
| [public/sw.js](../../public/sw.js)                                                     | Caching, uitsluitingen en handlers voor meldingsgebeurtenissen |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Productieregistratie en herstel van verouderde caches          |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Connectiviteitspagina, geen automatische offline fallback      |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Paginametagegevens en viewport-instellingen                    |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Gedeelde themakleurwaarden                                     |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 app-pictogram                                        |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple-pictogram                                      |
