# Progressive Web App (PWA) Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Installera OmniRoute -instrumentpanelen som en progressiv webbapp för att öppna den från din startskärm eller skrivbord i ett fristående fönster. Den installerade appen behöver fortfarande en anslutning till din OmniRoute server för navigering, instrumentpanelsdata och API -förfrågningar. Cachade statiska tillgångar tillhandahåller inte en offline-gateway eller en offline-instrumentpanel.

## Vad är en PWA?

En progressiv webbapp använder webbinstrumentpanelen med en appikon och ett separat fönster. När det är installerat, OmniRoute:

- Startar från startskärmen eller skrivbordet
- Öppnas i fristående läge, utan webbläsarens vanliga adressfält och flikar
- Cachelagrar valda statiska tillgångar
- Stöder porträtt och liggande orientering

## Installation

Använd en HTTPS -adress för en server på en annan enhet. När servern körs på samma enhet uppfyller `http://localhost:20128` också kraven på webbläsarens installationsbarhet. En vanlig `http://YOUR_IP:20128` -adress uppfyller inte dessa krav. Installationsmenyer och uppmaningar beror på webbläsaren och operativsystemet. Se [MDNPWA installationskrav](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Öppna din OmniRoute HTTPS adress, eller `http://localhost:20128` för en server på samma telefon.
2. Öppna**⋮** menyn och välj** Installera appen** eller** Lägg till på startskärmen** , om det erbjuds.
3. Bekräfta uppmaningen.
4. Öppna OmniRoute från startskärmen.

### iOS (Safari)

1. Öppna din OmniRoute HTTPS -adress i Safari.
2. Knacka** Dela** →** Lägg till på startskärmen** .
3. Bekräfta namnet och tryck på** Tillägga** .
4. Öppna OmniRoute från startskärmen.

### Desktop (Chrome / Edge)

1. Öppna din OmniRoute instrumentpanel.
2. Använd webbläsarens installationsikon eller** Installera appen** menyalternativ, om det erbjuds.
3. Bekräfta uppmaningen att öppna OmniRoute i sitt eget fönster.

## Drag

### Fristående fönster

Manifestet sätter `display: "standalone"` och `start_url: "/dashboard"`. Den installerade appen öppnar instrumentpanelen i ett appfönster. Kontroller för webbläsaren och operativsystemet kan fortfarande visas; manifestet begär inte helskärmsläge.

### Cachade tillgångar och nätverkskrav

[Service Worker](../../public/sw.js) cachar utvalda resurser med samma ursprung:

| Begäran eller tillgång                        | Strategi      | Beteende                                                                                                          |
| --------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------- |
| Resurser vid installationstid                 | Pre-cache     | `/`, `/manifest.webmanifest`, `/icon-512.png` och `/apple-touch-icon.png` cachelagras under arbetarinstallationen |
| Next.js statiska tillgångar (`/_next/`)       | Nätverk först | Lyckade svar uppdaterar cachen; ett nätverksfel faller tillbaka till ett befintligt cachat svar                   |
| Andra statiska CSS, JS, bilder och typsnitt   | Cache-först   | Ett befintligt cachat svar återanvänds; framgångsrika nätverkssvar cachelagras på en miss                         |
| Sidnavigering                                 | Gå förbi      | Webbläsaren hämtar sidan direkt; ingen offline reserv visas                                                       |
| API, instrumentpanel och autentiseringsrutter | Gå förbi      | Arbetaren fångar inte upp eller cachelagrar dessa förfrågningar                                                   |
| Andra icke-statiska förfrågningar             | Nätverk       | Ingen cachesökning eller lagring                                                                                  |

De uteslutna rutterna är `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` och `/login`, matchade skiftlägesokänsligt vid väggränser. Förfrågningar mellan ursprung och icke-GET förbigår också arbetaren.

### Anslutningssida

`/offline` sidan tillhandahåller ett anslutningsmeddelande, en online/offline indikator, en** Försök att ansluta igen** knapp och en länk till statussidan. Det är det** inte förcachat** och det gör servicearbetaren** inte** omdirigera misslyckade navigering till den. Dess existens gör inte nya sidor tillgängliga utan servern.

### App ikoner

Manifestet annonserar dessa PNG ikoner:

| Fil                    | Storlek | Använda                      |
| ---------------------- | ------- | ---------------------------- |
| `icon-192.png`         | 192×192 | Allmän appikon               |
| `icon-512.png`         | 512×512 | Allmän och maskerbar appikon |
| `apple-touch-icon.png` | 180×180 | Apples hemskärmsikon         |

Webbläsaren väljer lämplig ikon för installationsmålet.

### Automatisk registrering

`PwaRegister` registrerar arbetaren i produktion när webbläsaren stöder servicearbetare. Utvecklingsläget avregistrerar arbetare och rensar cacheminne för att undvika att inaktuella tillgångar stör hot reload. Installationsmeddelanden förblir ett webbläsarbeslut.

## Teknisk arkitektur

### Web App Manifest

Next.js genererar `/manifest.webmanifest` från [`src/app/manifest.ts`](../../src/app/manifest.ts). Dess nyckelinställningar är:

| Miljö                     | Värde                                        |
| ------------------------- | -------------------------------------------- |
| `short_name`              | `OmniRoute`                                  |
| `start_url`               | `/dashboard`                                 |
| `scope`                   | `/`                                          |
| `display`                 | `standalone`                                 |
| `orientation`             | `any`                                        |
| Bakgrunds- och temafärger | Standardljuspaletten från `PWA_THEME_COLORS` |

Manifestets namn och beskrivning är statiska värden i den källfilen. Det installerade manifestet följer inte inställningen för instansnamn eller den aktiva paletten vid varje besök.

### Servicearbetare

[`public/sw.js`](../../public/sw.js) har inget service-worker-ramverksberoende:

- **Installera:** förcachar de fyra resurserna som anges ovan och aktiverar den nya arbetaren.
- **Aktivera:** tar bort äldre cachegenerationer och gör anspråk på klienter.
- **Hämta:** tillämpar strategierna för statiska tillgångar och ruttuteslutningar ovan.
- **Versionering:** källcachens namn är `omniroute-pwa-v3`; produktionsbygget stämplar cachens identitet.
- **Aviseringar:** hanterar inkommande `push` händelser och fokuserar eller öppnar ett fönster när ett meddelande klickas.

Enbart push-händelsehanterare upprättar inte en aktiv push-prenumeration eller konfigurerad serverleverans. Anta inte att meddelanden är aktiverade bara för att PWA är installerad.

### Layout Metadata och registrering

[`src/app/layout.tsx`](../../src/app/layout.tsx) tillhandahåller manifestlänken, Apple fristående metadata, temafärger och `viewport-fit: cover`. Sidtiteln och Apples webbapps titel använder instansnamnet. Live webbläsarens temafärg följer paletten; installationsmanifestet använder standardljusfärgen.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) körs på klienten och registrerar `/sw.js` med build ID i sin URL. Den upptäcker felaktiga cachegenerationer och kan återställa arbetaren och ladda om en gång för att återställa från en äldre installation. Registreringsfel blockerar inte instrumentpanelen.

## Använd med Termux (Android)

1. Starta OmniRoute i Termux: `npx -y omniroute@latest`.
2. Öppna Chrome på samma telefon: `http://localhost:20128`.
3. Installera PWA via webbläsarens installationsmeny.
4. Håll Termux-servern igång medan du använder instrumentpanelen.

Telefonen är värd för både gatewayen och dess instrumentpanel. Förfrågningar till fjärranslutna AI leverantörer behöver fortfarande nätverksåtkomst. Se [Termux-guiden](TERMUX_GUIDE.md) för installations- och Android-processlivstidsöverväganden.

## Använd från andra enheter

Öppna serverns HTTPS -adress på en telefon, surfplatta eller skrivbord och följ sedan webbläsarens installationsflöde. Servern måste vara tillgänglig från varje enhet. Se [tunnelguiden](../ops/TUNNELS_GUIDE.md) för alternativ för fjärråtkomst.

## Anpassning

### Instansnamn

De** Instansnamn** inställningen ändrar instrumentpanelens metadata, inklusive sidtiteln och Apples webbapptitel. Det genererade manifestet använder ett statiskt namn, så den här inställningen garanterar inte att en redan installerad app byter namn.

### Anpassad favoritikon

En anpassad favicon ändrar webbläsarens favicon. Installationsmanifestet annonserar fortfarande PNG filerna ovan; att ändra favicon ersätter inte dessa hemskärmsikoner.

## Begränsningar

- **Serveranslutning krävs:** sidnavigering, instrumentpanelstillstånd och API -förfrågningar har inte en offline reserv.
- **Ingen bakgrundssynkronisering:** offlineåtgärder står inte i kö för repris.
- **Webbläsarskillnader:** installationsmenyer, fönsterpresentation och aviseringsstöd varierar beroende på plattform.
- **Ingen API -svarscache:** arbetaren utesluter API, instrumentpanel och autentiseringsrutter.
- **Statiska installationsikoner:** uppdatering av dessa ikoner kräver ändring av de annonserade tillgångarna; webbläsare kan behålla installerad metadata.

## Filreferens

| Fil                                                                                    | Ändamål                                                       |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Genererat webbappmanifest                                     |
| [public/sw.js](../../public/sw.js)                                                     | Cachning, uteslutningar och händelsehanterare för meddelanden |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Produktionsregistrering och stale-cache-återställning         |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Anslutningssida, inte en automatisk reserv offline            |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Sidmetadata och visningsportinställningar                     |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Delade tema-färgvärden                                        |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 appikon                                             |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple-ikon                                          |
