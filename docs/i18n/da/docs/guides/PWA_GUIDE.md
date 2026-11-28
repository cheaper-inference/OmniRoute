# Progressive Web App (PWA) Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Installer OmniRoute dashboardet som en progressiv webapp for at åbne det fra din startskærm eller skrivebord i et selvstændigt vindue. Den installerede app skal stadig have forbindelse til din OmniRoute server til navigation, dashboard-data og API anmodninger. Cachelagrede statiske aktiver giver ikke en offline-gateway eller et offline-dashboard.

## Hvad er en PWA?

En progressiv webapp bruger webdashboardet med et appikon og et separat vindue. Når det er installeret, OmniRoute:

- Starter fra din startskærm eller skrivebord
- Åbner i selvstændig tilstand uden browserens sædvanlige adresselinje og faner
- Cacher udvalgte statiske aktiver
- Understøtter portræt- og landskabsretninger

## Installation

Brug en HTTPS adresse til en server på en anden enhed. Når serveren kører på den samme enhed, opfylder `http://localhost:20128` også kravene til browserinstallation. En almindelig `http://YOUR_IP:20128` adresse opfylder ikke disse krav. Installationsmenuer og -prompter afhænger af browseren og operativsystemet. Se [MDN's PWA installationskrav](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Åbn din OmniRoute HTTPS adresse, eller `http://localhost:20128` for en server på den samme telefon.
2. Åbn**⋮** menu og vælg** Installer app** eller** Føj til startskærmen** , hvis det tilbydes.
3. Bekræft prompten.
4. Åbn OmniRoute fra startskærmen.

### iOS (Safari)

1. Åbn din OmniRoute HTTPS adresse i Safari.
2. Tryk på** Dele** →** Føj til startskærmen** .
3. Bekræft navnet, og tryk på** Tilføje** .
4. Åbn OmniRoute fra startskærmen.

### Desktop (Chrome / Edge)

1. Åbn dit OmniRoute dashboard.
2. Brug browserens installationsikon eller** Installer app** menuindgang, hvis det tilbydes.
3. Bekræft prompten for at åbne OmniRoute i sit eget vindue.

## Funktioner

### Enkeltstående vindue

Manifestet sætter `display: "standalone"` og `start_url: "/dashboard"`. Den installerede app åbner dashboardet i et appvindue. Browser- og operativsystemkontroller kan stadig vises; manifestet anmoder ikke om fuldskærmstilstand.

### Cachelagrede aktiver og netværkskrav

[Serviceworkeren](../../public/sw.js) cacher valgte ressourcer med samme oprindelse:

| Anmodning eller aktiv                           | Strategi      | Opførsel                                                                                                        |
| ----------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| Installationstidsressourcer                     | Pre-cache     | `/`, `/manifest.webmanifest`, `/icon-512.png` og `/apple-touch-icon.png` cachelagres under arbejderinstallation |
| Next.js statiske aktiver (`/_next/`)            | Netværk først | Vellykkede svar opdaterer cachen; en netværksfejl falder tilbage til et eksisterende cachelagret svar           |
| Andre statiske CSS, JS, billeder og skrifttyper | Cache-først   | Et eksisterende cachelagret svar genbruges; vellykkede netværkssvar cachelagres på en miss                      |
| Sidenavigation                                  | Bypass        | Browseren henter siden direkte; der vises ingen offline reserve                                                 |
| API, dashboard og autentificeringsruter         | Bypass        | Arbejderen opsnapper eller cacherer ikke disse anmodninger                                                      |
| Andre ikke-statiske anmodninger                 | Netværk       | Ingen cacheopslag eller lagring                                                                                 |

De udelukkede ruter er `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` og `/login`, matchet ufølsomt over for store og små bogstaver ved stigrænser. Cross-origin og non-GET-anmodninger omgår også arbejderen.

### Forbindelsesside

`/offline` siden giver en forbindelsesmeddelelse, en online/offline indikator, en** Prøv at oprette forbindelse igen** knap og et link til statussiden. Det er det** ikke pre-cachet** og det gør servicemedarbejderen** ikke** omdirigere mislykkede navigationer til den. Dens eksistens gør ikke nye sider tilgængelige uden serveren.

### App ikoner

Manifestet annoncerer disse PNG ikoner:

| Fil                    | Størrelse | Bruge                           |
| ---------------------- | --------- | ------------------------------- |
| `icon-192.png`         | 192×192   | Generelt app-ikon               |
| `icon-512.png`         | 512×512   | Generelt og maskerbart app-ikon |
| `apple-touch-icon.png` | 180×180   | Apples startskærmikon           |

Browseren vælger det relevante ikon til installationsmålet.

### Automatisk registrering

`PwaRegister` registrerer arbejderen i produktion, når browseren understøtter servicearbejdere. Udviklingstilstand afregistrerer arbejdere og rydder caches for at undgå, at uaktuelle aktiver forstyrrer hot reload. Installationsmeddelelser forbliver en browserbeslutning.

## Teknisk arkitektur

### Web App Manifest

Next.js genererer `/manifest.webmanifest` fra [`src/app/manifest.ts`](../../src/app/manifest.ts). Dens nøgleindstillinger er:

| Indstilling              | Værdi                                       |
| ------------------------ | ------------------------------------------- |
| `short_name`             | `OmniRoute`                                 |
| `start_url`              | `/dashboard`                                |
| `scope`                  | `/`                                         |
| `display`                | `standalone`                                |
| `orientation`            | `any`                                       |
| Baggrunds- og temafarver | Standard lyspaletten fra `PWA_THEME_COLORS` |

Manifestets navn og beskrivelse er statiske værdier i den kildefil. Det installerede manifest følger ikke indstillingen for instansnavn eller den aktive palet ved hvert besøg.

### Servicemedarbejder

[`public/sw.js`](../../public/sw.js) har ingen service-worker-rammeafhængighed:

- **Installere:** pre-cacherer de fire ressourcer angivet ovenfor og aktiverer den nye arbejder.
- **Aktiver:** fjerner ældre cachegenerationer og gør krav på klienter.
- **Hent:** anvender de statiske aktiver-strategier og ruteekskluderinger ovenfor.
- **Versionering:** kildecachenavnet er `omniroute-pwa-v3`; produktionsopbygningen stempler cachens identitet.
- **Notifikationer:** håndterer indgående `push` -begivenheder og fokuserer eller åbner et vindue, når der klikkes på en notifikation.

Push-hændelseshandlere alene etablerer ikke et aktivt push-abonnement eller konfigureret serverlevering. Antag ikke, at meddelelser er aktiveret, blot fordi PWA er installeret.

### Layout Metadata og registrering

[`src/app/layout.tsx`](../../src/app/layout.tsx) leverer manifestlinket, selvstændige Apple-metadata, temafarver og `viewport-fit: cover`. Sidetitlen og Apple-webapp-titlen bruger instansnavnet. Livebrowserens temafarve følger paletten; installationsmanifestet bruger standardlysfarven.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) kører på klienten og registrerer `/sw.js` med build ID i sin URL. Den registrerer uoverensstemmende cachegenerationer og kan nulstille arbejderen og genindlæse én gang for at gendanne fra en ældre installation. Registreringsfejl blokerer ikke dashboardet.

## Brug med Termux (Android)

1. Start OmniRoute i Termux: `npx -y omniroute@latest`.
2. Åbn Chrome på den samme telefon: `http://localhost:20128`.
3. Installer PWA gennem browserens installationsmenu.
4. Hold Termux-serveren kørende, mens du bruger dashboardet.

Telefonen er vært for både gatewayen og dens dashboard. Anmodninger til eksterne AI udbydere har stadig brug for netværksadgang. Se [Termux-vejledningen](TERMUX_GUIDE.md) for opsætning og overvejelser om Android-proceslevetid.

## Brug fra andre enheder

Åbn serverens HTTPS adresse på en telefon, tablet eller desktop, og følg derefter browserens installationsforløb. Serveren skal forblive tilgængelig fra hver enhed. Se [tunnelguiden](../ops/TUNNELS_GUIDE.md) for fjernadgangsmuligheder.

## Tilpasning

### Forekomstnavn

De** Forekomstnavn** indstilling ændrer dashboard-metadata, herunder sidetitlen og Apple-webapp-titel. Det genererede manifest bruger et statisk navn, så denne indstilling garanterer ikke, at en allerede installeret app omdøbes.

### Brugerdefineret favicon

Et brugerdefineret favicon ændrer browserens favicon. Installationsmanifestet annoncerer stadig PNG filerne ovenfor; ændring af favicon erstatter ikke disse hjemmeskærmsikoner.

## Begrænsninger

- **Serverforbindelse påkrævet:** sidenavigation, dashboard-tilstand og API -anmodninger har ikke en offline fallback.
- **Ingen baggrundssynkronisering:** offline handlinger er ikke i kø til genafspilning.
- **Browserforskelle:** installationsmenuer, vinduespræsentation og meddelelsesunderstøttelse varierer fra platform til platform.
- **Ingen API -svarcache:** arbejderen udelukker API, dashboard og godkendelsesruter.
- **Statiske installationsikoner:** opdatering af disse ikoner kræver ændring af de annoncerede aktiver; browsere kan beholde installerede metadata.

## Filreference

| Fil                                                                                    | Formål                                                    |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Genereret webapp-manifest                                 |
| [public/sw.js](../../public/sw.js)                                                     | Caching, ekskluderinger og meddelelseshændelsesbehandlere |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Produktionsregistrering og stale-cache-gendannelse        |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Forbindelsesside, ikke en automatisk offline fallback     |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Indstillinger for sidemetadata og viewport                |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Delte temafarveværdier                                    |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 app-ikon                                        |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple-ikon                                      |
