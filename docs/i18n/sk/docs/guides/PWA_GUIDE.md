# Progressive Web App (PWA) Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Nainštalujte si ovládací panel OmniRoute ako progresívnu webovú aplikáciu, aby ste ho otvorili z domovskej obrazovky alebo pracovnej plochy v samostatnom okne. Nainštalovaná aplikácia stále potrebuje pripojenie k vášmu serveru OmniRoute na navigáciu, údaje z palubnej dosky a požiadavky API. Statické aktíva uložené vo vyrovnávacej pamäti neposkytujú offline bránu ani offline informačný panel.

## Čo je to PWA?

Progresívna webová aplikácia používa webový panel s ikonou aplikácie a samostatným oknom. Po nainštalovaní OmniRoute:

- Spustí sa z vašej domovskej obrazovky alebo pracovnej plochy
- Otvára sa v samostatnom režime bez obvyklého panela s adresou a kariet prehliadača
- Ukladá vybrané statické aktíva do vyrovnávacej pamäte
- Podporuje orientáciu na výšku a na šírku

## Inštalácia

Použite adresu HTTPS pre server na inom zariadení. Keď server beží na rovnakom zariadení, `http://localhost:20128` tiež spĺňa požiadavky na inštaláciu prehliadača. Obyčajná adresa `http://YOUR_IP:20128` nespĺňa tieto požiadavky. Inštalačné ponuky a výzvy závisia od prehliadača a operačného systému. Pozrite si [požiadavky na inštaláciu PWA MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Otvorte svoju adresu OmniRoute HTTPS alebo `http://localhost:20128` pre server na tom istom telefóne.
2. Otvorte**⋮** menu a vyberte si** Nainštalujte aplikáciu** alebo** Pridať na plochu** , ak je ponúkaný.
3. Potvrďte výzvu.
4. Otvorte OmniRoute z domovskej obrazovky.

### iOS (safari)

1. Otvorte svoju adresu OmniRoute HTTPS v Safari.
2. Klepnite** zdieľať** →** Pridať na domovskú obrazovku** .
3. Potvrďte názov a klepnite na** Pridať** .
4. Otvorte OmniRoute z domovskej obrazovky.

### Desktop (Chrome / Edge)

1. Otvorte hlavný panel OmniRoute.
2. Použite inštalačnú ikonu prehliadača alebo** Nainštalujte aplikáciu** vstup do menu, ak je ponúkaný.
3. Potvrďte výzvu na otvorenie OmniRoute v jeho vlastnom okne.

## Vlastnosti

### Samostatné okno

Manifest nastavuje `display: "standalone"` a `start_url: "/dashboard"`. Nainštalovaná aplikácia otvorí ovládací panel v okne aplikácie. Stále sa môžu zobrazovať ovládacie prvky prehliadača a operačného systému; manifest nevyžaduje režim celej obrazovky.

### Aktíva vo vyrovnávacej pamäti a požiadavky na sieť

[Servisný pracovník](../../public/sw.js) ukladá do vyrovnávacej pamäte vybraté zdroje rovnakého pôvodu:

| Žiadosť alebo aktívum                     | Stratégia                    | Správanie                                                                                                                             |
| ----------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Zdroje v čase inštalácie                  | Predbežná vyrovnávacia pamäť | `/`, `/manifest.webmanifest`, `/icon-512.png` a `/apple-touch-icon.png` sa ukladajú do vyrovnávacej pamäte počas pracovnej inštalácie |
| statické aktíva Next.js (`/_next/`)       | Najprv sieť                  | Úspešné odpovede aktualizujú vyrovnávaciu pamäť; chyba siete sa vráti k existujúcej odpovedi uloženej vo vyrovnávacej pamäti          |
| Ostatné statické CSS, JS, obrázky a fonty | Cache-first                  | Existujúca odpoveď uložená vo vyrovnávacej pamäti sa znova použije; úspešné sieťové odpovede sa ukladajú do vyrovnávacej pamäte       |
| Navigácia na stránke                      | Obchvat                      | Prehliadač načíta stránku priamo; nezobrazuje sa žiadna offline záloha                                                                |
| API, dashboard a autentifikačné cesty     | Obchvat                      | Pracovník tieto požiadavky nezachytáva ani ich neukladá do vyrovnávacej pamäte                                                        |
| Iné nestatické požiadavky                 | sieť                         | Žiadne vyhľadávanie ani ukladanie do vyrovnávacej pamäte                                                                              |

Vylúčené trasy sú `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` a `/login`, pričom na hraniciach cesty sa nerozlišujú veľké a malé písmená. Požiadavky krížového pôvodu a požiadavky bez GET tiež obchádzajú pracovníka.

### Stránka pripojenia

Stránka `/offline` poskytuje správu o pripojení, indikátor online/offline, a** Znova skúsiť pripojenie** tlačidlo a odkaz na stavovú stránku. je to tak** nie sú vopred uložené do vyrovnávacej pamäte** a servisný pracovník áno** nie** presmerovať neúspešné navigácie naň. Jeho existencia nesprístupňuje nové stránky bez servera.

### Ikony aplikácií

Manifest inzeruje tieto ikony PNG :

| Súbor                  | Veľkosť | Použite                                    |
| ---------------------- | ------- | ------------------------------------------ |
| `icon-192.png`         | 192×192 | Ikona všeobecnej aplikácie                 |
| `icon-512.png`         | 512×512 | Ikona všeobecnej a maskovateľnej aplikácie |
| `apple-touch-icon.png` | 180×180 | Ikona domovskej obrazovky Apple            |

Prehliadač vyberie príslušnú ikonu pre cieľ inštalácie.

### Automatická registrácia

`PwaRegister` zaregistruje pracovníka vo výrobe, keď prehliadač podporuje servisných pracovníkov. Vývojový režim zruší registráciu pracovníkov a vymaže vyrovnávaciu pamäť, aby sa predišlo tomu, že zastarané prostriedky narúšajú opätovné načítanie. Výzvy na inštaláciu zostávajú rozhodnutím prehliadača.

## Technická architektúra

### Manifest webovej aplikácie

Next.js generuje `/manifest.webmanifest` z [`src/app/manifest.ts`](../../src/app/manifest.ts). Jeho kľúčové nastavenia sú:

| Nastavenie             | Hodnota                                          |
| ---------------------- | ------------------------------------------------ |
| `short_name`           | `OmniRoute`                                      |
| `start_url`            | `/dashboard`                                     |
| `scope`                | `/`                                              |
| `display`              | `standalone`                                     |
| `orientation`          | `any`                                            |
| Farby pozadia a motívu | Predvolená svetelná paleta zo `PWA_THEME_COLORS` |

Názov a popis manifestu sú statické hodnoty v tomto zdrojovom súbore. Nainštalovaný manifest sa pri každej návšteve neriadi nastavením názvu inštancie alebo aktívnou paletou.

### Servisný pracovník

[`public/sw.js`](../../public/sw.js) nemá žiadnu závislosť na frameworku service-worker:

- **Inštalovať:** predbežne ukladá štyri zdroje uvedené vyššie a aktivuje nového pracovníka.
- **Aktivovať:** odstraňuje staršie generácie vyrovnávacej pamäte a klientov nárokov.
- **Načítať:** uplatňuje vyššie uvedené stratégie statických aktív a vylúčenia trás.
- **Verzia:** názov zdrojovej cache je `omniroute-pwa-v3`; produkčná zostava označí identitu vyrovnávacej pamäte.
- **Upozornenia:** spracováva prichádzajúce udalosti `push` a po kliknutí na upozornenie zaostrí alebo otvorí okno.

Samotné obslužné nástroje push udalosti nevytvoria aktívne predplatné push alebo nakonfigurované doručenie servera. Nepredpokladajte, že upozornenia sú povolené len preto, že je nainštalovaný PWA.

### Metaúdaje rozloženia a registrácia

[`src/app/layout.tsx`](../../src/app/layout.tsx) poskytuje odkaz na manifest, samostatné metadáta Apple, farby motívu a `viewport-fit: cover`. Názov stránky a názov webovej aplikácie Apple používajú názov inštancie. Živá farba témy prehliadača sleduje paletu; Inštalačný manifest používa predvolenú farbu svetla.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) beží na klientovi a registruje `/sw.js` so zostavou ID vo svojom URL. Zisťuje nezhodné generácie vyrovnávacej pamäte a môže resetovať pracovníka a znova načítať, aby sa obnovil zo staršej inštalácie. Zlyhanie registrácie neblokuje palubnú dosku.

## Použitie s Termuxom (Android)

1. Spustite OmniRoute v Termux: `npx -y omniroute@latest`.
2. Otvorte Chrome na tom istom telefóne: `http://localhost:20128`.
3. Nainštalujte PWA cez inštalačné menu prehliadača.
4. Počas používania dashboardu nechajte server Termux spustený.

Telefón je hostiteľom brány aj jej palubnej dosky. Požiadavky na vzdialených poskytovateľov AI stále potrebujú prístup k sieti. Pozrite si [príručku Termux](TERMUX_GUIDE.md), kde nájdete informácie o nastavení a životnosti procesu Android.

## Použitie z iných zariadení

Otvorte adresu HTTPS servera na telefóne, tablete alebo počítači a potom postupujte podľa inštalačného postupu prehliadača. Server musí zostať dostupný z každého zariadenia. Možnosti vzdialeného prístupu nájdete [v sprievodcovi tunelom](../ops/TUNNELS_GUIDE.md).

## Prispôsobenie

### Názov inštancie

The** Názov inštancie** nastavenie zmení metadáta hlavného panela vrátane názvu stránky a názvu webovej aplikácie Apple. Vygenerovaný manifest používa statický názov, takže toto nastavenie nezaručuje, že už nainštalovaná aplikácia bude premenovaná.

### Vlastná ikona Favicon

Vlastná favicon zmení ikonu prehliadača. Inštalačný manifest stále inzeruje vyššie uvedené súbory PNG ; zmena favicon nenahrádza tieto ikony na domovskej obrazovke.

## Obmedzenia

- **Vyžaduje sa pripojenie k serveru:** navigácia na stránke, stav panela a požiadavky API nemajú núdzový režim offline.
- **Žiadna synchronizácia na pozadí:** offline akcie nie sú zaradené do poradia na prehratie.
- **Rozdiely v prehliadači:** inštalačné ponuky, prezentácia v okne a podpora upozornení sa líšia podľa platformy.
- **Žiadna vyrovnávacia pamäť odpovede API :** pracovník vylúči API, dashboard a autentifikačné cesty.
- **Ikony statickej inštalácie:** aktualizácia týchto ikon vyžaduje zmenu inzerovaných aktív; prehliadače si môžu ponechať nainštalované metadáta.

## Odkaz na súbory

| Súbor                                                                                  | Účel                                                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Vygenerovaný manifest webovej aplikácie                                   |
| [public/sw.js](../../public/sw.js)                                                     | Ukladanie do vyrovnávacej pamäte, vylúčenia a obsluhy udalostí upozornení |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registrácia produkcie a obnova zastaranej vyrovnávacej pamäte             |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Stránka pripojenia, nie automatická offline núdzová reklama               |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadáta stránky a nastavenia výrezu                                      |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Zdieľané hodnoty farby témy                                               |
| [public/icon-512.png](../../public/icon-512.png)                                       | Ikona aplikácie 512 × 512                                                 |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 ikona Apple                                                     |
