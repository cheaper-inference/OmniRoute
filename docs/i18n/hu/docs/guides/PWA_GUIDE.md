# Progressive Web App (PWA) Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

Telepítse a OmniRoute irányítópultot progresszív webalkalmazásként, hogy megnyissa a kezdőképernyőről vagy az asztalról önálló ablakban. A telepített alkalmazásnak továbbra is csatlakoznia kell OmniRoute kiszolgálóhoz a navigációhoz, az irányítópult-adatokhoz és API kérésekhez. A gyorsítótárazott statikus eszközök nem biztosítanak offline átjárót vagy offline irányítópultot.

## Mi az a PWA?

A progresszív webalkalmazások a webes irányítópultot használják egy alkalmazásikonnal és egy külön ablakkal. A telepítés után OmniRoute:

- Elindul a kezdőképernyőről vagy az asztalról
- Önálló módban nyílik meg, a böngésző szokásos címsora és lapjai nélkül
- Gyorsítótárazza a kiválasztott statikus eszközöket
- Támogatja az álló és fekvő tájolást

## Telepítés

Használjon HTTPS -címet egy másik eszközön lévő szerverhez. Ha a szerver ugyanazon az eszközön fut, `http://localhost:20128` a böngésző telepíthetőségi követelményeinek is megfelel. Egy egyszerű `http://YOUR_IP:20128` -cím nem felel meg ezeknek a követelményeknek. A telepítési menük és promptok a böngészőtől és az operációs rendszertől függenek. Lásd [MDNPWA telepítési követelményeit](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required).

### Android (Chrome)

1. Nyissa meg OmniRoute HTTPS címet vagy `http://localhost:20128` egy szerverhez ugyanazon a telefonon.
2. Nyissa meg a**⋮** menüt és válassza ki** Telepítse az alkalmazást** vagy** Hozzáadás a kezdőképernyőhöz** , ha felajánlják.
3. Erősítse meg a felszólítást.
4. Nyissa meg OmniRoute a kezdőképernyőről.

### iOS (Safari)

1. Nyissa meg OmniRoute HTTPS címét a Safariban.
2. Csap** Részesedés** →** Hozzáadás a kezdőképernyőhöz** .
3. Erősítse meg a nevet, és érintse meg** Hozzáadás** .
4. Nyissa meg OmniRoute a kezdőképernyőről.

### Asztali (Chrome / Edge)

1. Nyissa meg OmniRoute műszerfalát.
2. Használja a böngésző telepítési ikonját vagy a** Telepítse az alkalmazást** menübelépés, ha felajánlják.
3. Erősítse meg a felszólítást OmniRoute megnyitásához a saját ablakában.

## Jellemzők

### Önálló ablak

A jegyzék `display: "standalone"` és `start_url: "/dashboard"` készletet tartalmaz. A telepített alkalmazás megnyitja az irányítópultot egy alkalmazás ablakban. A böngésző és az operációs rendszer vezérlői továbbra is megjelenhetnek; a jegyzék nem kér teljes képernyős módot.

### Gyorsítótárazott eszközök és hálózati követelmények

A [szervizmunkás](../../public/sw.js) gyorsítótárazza a kiválasztott azonos eredetű erőforrásokat:

| Kérelem vagy eszköz                          | Stratégia            | Viselkedés                                                                                                                                   |
| -------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Telepítési idejű erőforrások                 | Előzetes gyorsítótár | `/`, `/manifest.webmanifest`, `/icon-512.png` és `/apple-touch-icon.png` gyorsítótárban vannak a dolgozói telepítés során                    |
| Next.js statikus eszközök (`/_next/`)        | Hálózat az első      | A sikeres válaszok frissítik a gyorsítótárat; a hálózati hiba egy meglévő gyorsítótárazott válaszra esik vissza                              |
| Egyéb statikus CSS, JS, képek és betűtípusok | Gyorsítótár először  | Egy meglévő gyorsítótárban lévő válasz újrafelhasználásra kerül; a sikeres hálózati válaszokat a gyorsítótárban tárolják egy kihagyás esetén |
| Oldalnavigáció                               | Kitérő               | A böngésző közvetlenül letölti az oldalt; nincs offline tartalék szolgáltatás                                                                |
| API, műszerfal és hitelesítési útvonalak     | Kitérő               | A dolgozó nem fogja el vagy nem tárolja gyorsítótárban ezeket a kéréseket                                                                    |
| Egyéb nem statikus kérések                   | Hálózat              | Nincs gyorsítótár keresés vagy tárolás                                                                                                       |

A kizárt útvonalak `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` és `/login`, az útvonalhatárokon a kis- és nagybetűk megkülönböztetése nélkül egyeztetve. A kereszt-eredetű és nem GET kérések is megkerülik a dolgozót.

### Kapcsolati oldal

A `/offline` oldal kapcsolódási üzenetet, online/offline jelzőt, a** Próbálja újra a kapcsolatot** gombot és egy hivatkozást az állapotoldalra. Ez az** nincs előre gyorsítótárban** a szervizes pedig igen** nem** átirányítja rá a sikertelen navigációkat. Létezése nem teszi elérhetővé az új oldalakat a szerver nélkül.

### Alkalmazásikonok

A jegyzék ezeket PNG ikonokat hirdeti:

| Fájl                   | Méret   | Használat                                |
| ---------------------- | ------- | ---------------------------------------- |
| `icon-192.png`         | 192×192 | Általános alkalmazás ikonra              |
| `icon-512.png`         | 512×512 | Általános és maszkolható alkalmazás ikon |
| `apple-touch-icon.png` | 180×180 | Apple kezdőképernyő ikon                 |

A böngésző kiválasztja a megfelelő ikont a telepítési célhoz.

### Automatikus regisztráció

`PwaRegister` regisztrálja a dolgozót a termelésben, ha a böngésző támogatja a szervizmunkásokat. A Fejlesztési mód törli a dolgozók regisztrációját és törli a gyorsítótárakat, hogy elkerülje az elavult eszközök megzavarását a forró újratöltésben. A telepítési utasítások a böngésző döntése marad.

## Műszaki építészet

### Web App Manifest

Next.js `/manifest.webmanifest` generál [`src/app/manifest.ts`](../../src/app/manifest.ts) ből. Főbb beállításai a következők:

| Beállítás             | Érték                                                  |
| --------------------- | ------------------------------------------------------ |
| `short_name`          | `OmniRoute`                                            |
| `start_url`           | `/dashboard`                                           |
| `scope`               | `/`                                                    |
| `display`             | `standalone`                                           |
| `orientation`         | `any`                                                  |
| Háttér és téma színei | Az alapértelmezett fény paletta `PWA_THEME_COLORS` tól |

A jegyzék neve és leírása statikus értékek a forrásfájlban. A telepített jegyzék nem követi minden látogatáskor a példánynév beállítást vagy az aktív palettát.

### Szervizmunkás

[`public/sw.js`](../../public/sw.js) nincs szervizmunkás-keretrendszer-függősége:

- **Telepítés:** előre gyorsítótárazza a fent felsorolt négy erőforrást, és aktiválja az új dolgozót.
- **Aktiválás:** eltávolítja a régebbi gyorsítótár-generációkat és a követelés-klienseket.
- **Letöltés:** alkalmazza a fenti statikus eszköz stratégiákat és útvonal-kizárásokat.
- **Verziózás:** a forrás gyorsítótár neve `omniroute-pwa-v3`; a termelési build lebélyegzi a gyorsítótár-identitást.
- **Értesítések:** kezeli a bejövő `push` eseményeket, és az értesítésre kattintva fókuszál vagy ablakot nyit meg.

A push eseménykezelők önmagukban nem hoznak létre aktív leküldéses előfizetést vagy konfigurált kiszolgálókézbesítést. Ne feltételezze, hogy az értesítések csak azért vannak engedélyezve, mert a PWA telepítve van.

### Elrendezési metaadatok és regisztráció

[`src/app/layout.tsx`](../../src/app/layout.tsx) biztosítja a manifest hivatkozást, az Apple önálló metaadatait, a téma színeit és `viewport-fit: cover`. Az oldal címe és az Apple webalkalmazás címe a példány nevét használja. Az élő böngésző téma színe követi a palettát; a telepítési jegyzék az alapértelmezett fényszínt használja.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) a kliensen fut, és `/sw.js` a ID builddel regisztrálja a URL ben. Érzékeli a nem egyező gyorsítótár-generációkat, és alaphelyzetbe tudja állítani a dolgozót, majd egyszer újratölteni, hogy helyreálljon egy régebbi telepítésből. A regisztrációs hiba nem blokkolja az irányítópultot.

## Használat a Termux-szal (Android)

1. Indítsa OmniRoute a Termuxban: `npx -y omniroute@latest`.
2. Nyissa meg a Chrome-ot ugyanazon a telefonon: `http://localhost:20128`.
3. Telepítse a PWA a böngésző telepítési menüjéből.
4. Tartsa futva a Termux szervert az irányítópult használata közben.

A telefon az átjárót és a műszerfalat is tartalmazza. A távoli AI szolgáltatókhoz intézett kérésekhez továbbra is hálózati hozzáférésre van szükség. Tekintse meg a [Termux útmutatót](TERMUX_GUIDE.md) a beállítással és az Android-folyamat élettartamával kapcsolatos megfontolásokért.

## Használat más eszközökről

Nyissa meg a szerver HTTPS -címét telefonon, táblagépen vagy asztali számítógépen, majd kövesse az adott böngésző telepítési folyamatát. A szervernek minden eszközről elérhetőnek kell maradnia. A távoli hozzáférési lehetőségekről lásd az [alagút útmutatót](../ops/TUNNELS_GUIDE.md).

## Testreszabás

### Példány neve

A** Példány neve** A beállítás módosítja az irányítópult metaadatait, beleértve az oldal címét és az Apple webalkalmazás címét. A létrehozott jegyzék statikus nevet használ, így ez a beállítás nem garantálja, hogy egy már telepített alkalmazást átneveznek.

### Egyedi Favicon

Egy egyéni favicon megváltoztatja a böngésző faviconját. A telepítési jegyzék továbbra is hirdeti a PNG fájlokat; a favicon megváltoztatása nem helyettesíti a kezdőképernyő ikonjait.

## Korlátozások

- **Szerver csatlakozás szükséges:** az oldalnavigáció, az irányítópult állapota és API kérések nem rendelkeznek offline tartalékkal.
- **Nincs háttér szinkronizálás:** az offline műveletek nincsenek lejátszási sorba állítva.
- **Böngésző különbségek:** a telepítési menük, az ablakbemutatók és az értesítések támogatása platformonként változhat.
- **Nincs API válaszgyorsítótár:** a dolgozó kizárja API, a műszerfalat és a hitelesítési útvonalakat.
- **Statikus telepítési ikonok:** az ikonok frissítéséhez meg kell változtatni a hirdetett elemeket; a böngészők megtarthatják a telepített metaadatokat.

## Fájlok hivatkozása

| Fájl                                                                                   | Cél                                                       |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | Létrehozott webalkalmazás-jegyzék                         |
| [public/sw.js](../../public/sw.js)                                                     | Gyorsítótárazás, kizárások és értesítési eseménykezelők   |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | Gyártás regisztráció és elavult gyorsítótár helyreállítás |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | Csatlakozási oldal, nem automatikus offline tartalék      |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | Oldal metaadatai és nézetablak beállításai                |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | Megosztott téma-szín értékek                              |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 alkalmazás ikonja                               |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 Apple ikon                                      |
