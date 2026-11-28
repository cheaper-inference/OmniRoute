# Progressive Web App (PWA) Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Nainstalujte si řídicí panel OmniRoute jako progresivní webovou aplikaci a otevřete jej z domovské obrazovky nebo plochy v samostatném okně. Nainstalovaná aplikace stále potřebuje připojení k vašemu serveru OmniRoute pro navigaci, data z řídicího panelu a požadavky API. Statické prostředky uložené v mezipaměti neposkytují offline bránu ani offline řídicí panel.

## Co je to PWA?

Progresivní webová aplikace používá webový panel s ikonou aplikace a samostatným oknem. Po instalaci OmniRoute:

- Spustí se z domovské obrazovky nebo plochy
- Otevře se v samostatném režimu, bez obvyklého adresního řádku a karet prohlížeče
- Ukládá vybrané statické prostředky do mezipaměti
- Podporuje orientaci na výšku a na šířku

## Instalace

Použijte adresu HTTPS pro server na jiném zařízení. Když server běží na stejném zařízení, `http://localhost:20128` také splňuje požadavky na instalaci prohlížeče. Obyčejná adresa `http://YOUR_IP:20128` tyto požadavky nesplňuje. Instalační nabídky a výzvy závisí na prohlížeči a operačním systému. Viz [instalační požadavky MDNPWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Otevřete svou adresu OmniRoute HTTPS nebo `http://localhost:20128` pro server na stejném telefonu.
2. Otevřete**⋮** menu a vyberte si** Nainstalujte aplikaci** nebo** Přidat na domovskou obrazovku** , je-li nabízen.
3. Potvrďte výzvu.
4. Otevřete OmniRoute z domovské obrazovky.

### iOS (safari)

1. Otevřete svou adresu OmniRoute HTTPS v Safari.
2. Klepněte** Podíl** →** Přidat na domovskou obrazovku** .
3. Potvrďte název a klepněte na** Přidat** .
4. Otevřete OmniRoute z domovské obrazovky.

### Desktop (Chrome / Edge)

1. Otevřete řídicí panel OmniRoute.
2. Použijte instalační ikonu prohlížeče nebo** Nainstalujte aplikaci** vstup do menu, pokud je nabízen.
3. Potvrďte výzvu k otevření OmniRoute v jeho vlastním okně.

## Vlastnosti

### Samostatné okno

Manifest nastavuje `display: "standalone"` a `start_url: "/dashboard"`. Nainstalovaná aplikace otevře řídicí panel v okně aplikace. Stále se mohou zobrazovat ovládací prvky prohlížeče a operačního systému; manifest nevyžaduje režim celé obrazovky.

### Aktiva v mezipaměti a požadavky na síť

[Servisní pracovník](../../public/sw.js) ukládá do mezipaměti vybrané zdroje stejného původu:

| Žádost nebo aktiva                        | Strategie           | Chování                                                                                                                    |
| ----------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Zdroje v době instalace                   | Pre-cache           | `/`, `/manifest.webmanifest`, `/icon-512.png` a `/apple-touch-icon.png` se ukládají do mezipaměti během pracovní instalace |
| statická aktiva Next.js (`/_next/`)       | Síť na prvním místě | Úspěšné odpovědi aktualizují mezipaměť; chyba sítě se vrátí k existující odpovědi uložené v mezipaměti                     |
| Ostatní statické CSS, JS, obrázky a fonty | Cache-first         | Stávající odpověď uložená v mezipaměti je znovu použita; úspěšné síťové odpovědi jsou ukládány do mezipaměti               |
| Navigace na stránce                       | Bypass              | Prohlížeč načte stránku přímo; není poskytována žádná offline záloha                                                       |
| API, řídicí panel a autentizační cesty    | Bypass              | Pracovník tyto požadavky nezachycuje ani je neukládá do mezipaměti                                                         |
| Jiné nestatické požadavky                 | Síť                 | Žádné vyhledávání nebo ukládání do mezipaměti                                                                              |

Vyloučené trasy jsou `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` a `/login`, na hranicích cest se nerozlišují malá a velká písmena. Cross-origin a non-GET požadavky také obcházejí pracovníka.

### Stránka připojení

Stránka `/offline` poskytuje zprávu o připojení, indikátor online/offline a** Opakovat připojení** tlačítko a odkaz na stavovou stránku. To je** není předem uloženo do mezipaměti** a servisní pracovník ano** ne** přesměrovat na něj neúspěšné navigace. Jeho existence nezpřístupňuje nové stránky bez serveru.

### Ikony aplikací

Manifest inzeruje tyto ikony PNG :

| Soubor                 | Velikost | Použití                              |
| ---------------------- | -------- | ------------------------------------ |
| `icon-192.png`         | 192×192  | Ikona obecné aplikace                |
| `icon-512.png`         | 512×512  | Obecná a maskovatelná ikona aplikace |
| `apple-touch-icon.png` | 180×180  | Ikona domovské obrazovky Apple       |

Prohlížeč vybere příslušnou ikonu pro cíl instalace.

### Automatická registrace

`PwaRegister` registruje pracovníka ve výrobě, když prohlížeč podporuje servisní pracovníky. Vývojový režim odhlásí pracovníky a vymaže mezipaměti, aby se předešlo tomu, že zastaralá aktiva narušují opětovné načítání za provozu. Výzvy k instalaci zůstávají na rozhodnutí prohlížeče.

## Technická architektura

### Manifest webové aplikace

Next.js generuje `/manifest.webmanifest` z [`src/app/manifest.ts`](../../src/app/manifest.ts). Jeho klíčová nastavení jsou:

| Nastavení             | Hodnota                                     |
| --------------------- | ------------------------------------------- |
| `short_name`          | `OmniRoute`                                 |
| `start_url`           | `/dashboard`                                |
| `scope`               | `/`                                         |
| `display`             | `standalone`                                |
| `orientation`         | `any`                                       |
| Barvy pozadí a motivu | Výchozí paleta světla ze `PWA_THEME_COLORS` |

Název a popis manifestu jsou statické hodnoty v tomto zdrojovém souboru. Nainstalovaný manifest se při každé návštěvě neřídí nastavením názvu instance nebo aktivní paletou.

### Servisní pracovník

[`public/sw.js`](../../public/sw.js) nemá žádnou závislost na frameworku service-worker:

- **Instalovat:** předběžně uloží do mezipaměti čtyři výše uvedené zdroje a aktivuje nového pracovníka.
- **Aktivovat:** odstraňuje starší generace mezipaměti a klienty nároků.
- **Vynést:** použije výše uvedené strategie statických aktiv a vyloučení tras.
- **Verze:** název zdrojové mezipaměti je `omniroute-pwa-v3`; produkční sestavení označí identitu mezipaměti.
- **Oznámení:** zpracovává příchozí události `push` a zaměřuje nebo otevírá okno po kliknutí na oznámení.

Samotné obslužné rutiny push událostí nezakládají aktivní předplatné push nebo konfigurované doručování serveru. Nepředpokládejte, že oznámení jsou povolena pouze proto, že je nainstalován PWA.

### Metadata rozvržení a registrace

[`src/app/layout.tsx`](../../src/app/layout.tsx) poskytuje odkaz na manifest, samostatná metadata Apple, barvy motivu a `viewport-fit: cover`. Název stránky a název webové aplikace Apple používají název instance. Živá barva motivu prohlížeče sleduje paletu; instalační manifest používá výchozí barvu světla.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) běží na klientovi a registruje `/sw.js` s buildem ID ve svém URL. Detekuje nesprávné generace mezipaměti a může resetovat pracovníka a jednou znovu načíst, aby se zotavil ze starší instalace. Selhání registrace neblokuje řídicí panel.

## Použití s Termuxem (Android)

1. Spusťte OmniRoute v Termux: `npx -y omniroute@latest`.
2. Otevřete Chrome na stejném telefonu: `http://localhost:20128`.
3. Nainstalujte PWA prostřednictvím instalační nabídky prohlížeče.
4. Udržujte server Termux spuštěný při používání řídicího panelu.

Telefon je hostitelem brány i její palubní desky. Požadavky na vzdálené poskytovatele AI stále vyžadují přístup k síti. Informace o nastavení a otázkách životnosti procesu Android najdete [v příručce Termux](TERMUX_GUIDE.md).

## Použití z jiných zařízení

Otevřete HTTPS adresu serveru na telefonu, tabletu nebo stolním počítači a poté postupujte podle instalačního postupu daného prohlížeče. Server musí zůstat dostupný z každého zařízení. Možnosti vzdáleného přístupu naleznete [v průvodci tunelem](../ops/TUNNELS_GUIDE.md).

## Přizpůsobení

### Název instance

The** Název instance** nastavení změní metadata řídicího panelu, včetně názvu stránky a názvu webové aplikace Apple. Vygenerovaný manifest používá statický název, takže toto nastavení nezaručuje, že již nainstalovaná aplikace bude přejmenována.

### Vlastní favicon

Vlastní favicon změní favicon prohlížeče. Instalační manifest stále inzeruje soubory PNG výše; změna favicon nenahrazuje tyto ikony na domovské obrazovce.

## Omezení

- **Vyžaduje připojení k serveru:** navigace na stránce, stav řídicího panelu a požadavky API nemají záložní režim offline.
- **Žádná synchronizace na pozadí:** offline akce nejsou zařazeny do fronty pro přehrání.
- **Rozdíly v prohlížeči:** instalační nabídky, prezentace v okně a podpora upozornění se liší podle platformy.
- **Žádná mezipaměť odpovědí API :** pracovník vyloučí API, řídicí panel a autentizační cesty.
- **Ikony statické instalace:** aktualizace těchto ikon vyžaduje změnu inzerovaných aktiv; prohlížeče mohou uchovávat nainstalovaná metadata.

## Odkaz na soubory

| Soubor                                                                                 | Účel                                                                |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Vygenerovaný manifest webové aplikace                               |
| [public/sw.js](../../public/sw.js)                                                     | Ukládání do mezipaměti, výjimky a obslužné rutiny událostí oznámení |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Registrace výroby a obnova zastaralé mezipaměti                     |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Stránka připojení, nikoli automatická offline záloha                |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Metadata stránky a nastavení výřezu                                 |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Sdílené hodnoty barev motivu                                        |
| [public/icon-512.png](../../public/icon-512.png)                                       | Ikona aplikace 512 × 512                                            |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 ikona Apple                                               |
