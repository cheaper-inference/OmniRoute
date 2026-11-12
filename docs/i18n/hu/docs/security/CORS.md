# CORS Configuration & Security (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute szabályozza, hogy melyik **böngésző eredete** a kereszteredetű válaszokat egyetlen, központosított engedélyezési listáról olvashatja. A modell az **alapértelmezés szerint hibazárás** : semmilyen eredet nem engedélyezett, amíg nem engedélyezi az egyiket. Ez az oldal azt mutatja be, hogyan oldja meg az engedélyezési listát, mit tesz `CORS_ALLOW_ALL=true` valójában (és ami fontos, mit csinál **nem** ), hogyan lehet biztonságosan konfigurálni a dev vs. éles verziót, és a futásidejű figyelmeztetés az irányítópulton jelzi, ha a helyettesítő karakter aktív.

**Az igazság forrása:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Az engedélyezési lista egyszer kerül alkalmazásra, a köztes szoftverben (`src/server/authz/pipeline.ts`) az útvonalonkénti — kezelők nem maguk állítják be `Access-Control-Allow-Origin`.

## Hogyan oldódik meg egy eredet

A köztes szoftver minden kérésnél a `Access-Control-Allow-Origin` értéket a következő sorrendben számítja ki:

1. **`CORS_ALLOW_ALL=true`** (vagy az örökölt `CORS_ORIGIN=*`) → a hívó `Origin` jét visszhangozza (vagy `*`, ha nincs `Origin` fejléc), `Vary: Origin` vel, így a gyorsítótárak helyesek maradnak. Ugyanez a `applyCorsHeaders()` fojtópont `Vary: Accept-Encoding` is hozzáfűz minden 2xx-a testtel válaszhoz a token-hitelesített `/v1*`/`/v1beta*` felületen (`relaxForTokenAuth`, RFC 9110 §12.5.5, kiadás #6737), így downstream/shared gyorsítótárak megfelelően megkülönböztethetik a tömörített és a tömörítetlen változatokat.
2. Ellenkező esetben a `Origin` kérés normalizálva van (kisbetűs, a záró perjel lecsupaszítva), és illeszkedik a **egyesített engedélyezési lista** :
   - env **`CORS_ALLOWED_ORIGINS`** — vesszővel elválasztott lista, és
   - a futásidő **`corsOrigins`** beállítás (Dashboard → Security → _CORS Allowed Origins_), `setRuntimeAllowedOrigins()` keresztül injektált `src/lib/config/runtimeSettings.ts` től.
3. Nincs egyezés →**nincs `Access-Control-Allow-Origin` fejléc** . A böngésző blokkolja a keresztirányú olvasást. Ez az alapértelmezett hibazárás.

| Env var                | Jelentése                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Pontos eredetű CSV engedélyezhető (ajánlott).                                                                   |
| `CORS_ALLOW_ALL`       | `true`/`1` → bármilyen eredetet visszhangoz (helyes karakter). Csak fejlesztő.                                  |
| `CORS_ORIGIN`          | Örökség. `*` úgy viselkedik, mint `CORS_ALLOW_ALL`; egyetlen érték kerül hozzáadásra az engedélyezési listához. |

## — fenyegetési modellje, amit `CORS_ALLOW_ALL=true` valóban leleplez

Az általános OWASP figyelmeztetést (" CORS = helyettesítő karakter, bármely webhely hívhatja a API") érdemes komolyan venni, de OmniRoute megjelenése **szűkebb, mint az általános eset** , egy konkrét megvalósítási tény miatt:

> **A központi `applyCorsHeaders()` soha nem bocsát ki `Access-Control-Allow-Credentials`.** A böngésző nem tesz közzé _credentialed_ (cookie-hordozó) kereszt-eredetű választ, hacsak a szerver nem küld `Access-Control-Allow-Credentials: true`. OmniRoute közös CORS útvonala soha nem működik.

Mit jelent ez felületenként, még `CORS_ALLOW_ALL=true` esetén is:

| Felület                                      | Hitelesítési mechanizmus    | A helyettesítő CORS hatása                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Műszerfal / MANAGEMENT `/api/*`              | Cookie munkamenet           | Az eredet visszhangzik, de **`Allow-Credentials` nélkül** a böngészőt **blokkok** a hitelesítő felolvasott. Rosszindulatú, több eredetű webhely **nem tud olvasni** az Ön hitelesített irányítópult-válaszait, és a munkamenet-cookie nem jelenik meg.                                                                                                                                                                                                                                                                                                           |
| Ügyfél API `/v1/*`, `/v1beta/*`              | Bearer / `x-api-key` fejléc | Már megengedő **tervezés szerint** (`relaxForTokenAuth`): a böngészők soha nem csatolják automatikusan `Authorization`/`x-api-key`, így a támadó oldala nem tudja megadni a kulcsát. A nyugodt visszhanghoz hitelesített alanyra (érvényesített API kulcsra vagy műszerfali munkamenetre) van szükség, nem csak hitelesítő adatok fejlécére, és soha nem tartalmazza `Access-Control-Allow-Credentials`. A névtelen válaszok (`REQUIRE_API_KEY=false`) a konfigurált eredetengedélylistát használják, beleértve az explicit `CORS_ALLOW_ALL=true` feliratkozást. |
| Nyilvános, csak olvasható (`/api/health`, …) | Egyik sem                   | Nem érzékeny; A helyettesítő karakter ártalmatlan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Tehát a **maradó** `CORS_ALLOW_ALL=true` expozíciója a következőkre korlátozódik: (a) nem hitelesített kereszteredet **olvas** a már nem hitelesített adatokból, és (b) CORS engedélyezése **repülés előtti bérlet** — felügyeleti útvonalakon, amelyek továbbra is olyan hitelesítést igényelnek, amelyet a több származási oldal nem tud biztosítani. Ez az **nem** munkamenet-eltérítés vagy hitelesítés-lopás vektor a megosztott CORS útvonalon.

### Egy igazi kivétel — `/api/v1/agents/`

A Cloud-Agent útvonalak (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) állítják be **saját** CORS fejlécek (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) és **csináld** `Access-Control-Allow-Origin: <origin>|*` bocsátanak ki `Access-Control-Allow-Credentials: true` együtt. Ez az egyetlen felület, ahol az eredet-visszhang és a hitelesítő adatok együtt léteznek, és ez az **független `CORS_ALLOW_ALL` től** . Ezek az útvonalak menedzsment által hitelesítettek (`requireManagementAuth`); azoknak az operátoroknak, akik a műszerfalat a gazdagépen kívül teszik közzé, tisztában kell lenniük azzal, hogy a válaszfejlécek ezen az egyetlen helyen engedélyezik a több eredetű hitelesítő adatok olvasását. Az explicit engedélyezési listára való szigorítást a jelen CORS útmutatótól elkülönítve követjük nyomon.

## Gyártási ellenőrző lista

- **Soha ne állítsa be `CORS_ALLOW_ALL=true` a gyártásba.** Hagyja beállítatlanul.
- Állítson be egy **kifejezett** eredetlista — vagy az env var, vagy a Biztonság fül mezője:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ha OmniRoute egy fordított proxy/alagút mögött fut (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS**nem** az egyetlen vezérlő — a loopback útvonal őr továbbra is védi a spawn-képes útvonalakat (lásd [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Ne kovácsolja `X-Forwarded-For: 127.0.0.1` a 403 „javítására”; hogy újra megnyitja a RCE osztályt az útvonalőrség bezár.
- Erősítse meg a futási állapotot: a műszerfalon a következő látható: a **kitartó borostyán zászló** az irányítópult alatt → biztonság → engedélyezési leltár, amikor `CORS_ALLOW_ALL=true` él, és `/api/settings/authz-inventory` egy `cors: { allowAll, allowedOrigins }` borítékot ad vissza, amelyet lekérdezhetnek.

## Fejlesztési kényelem — lehetővé teszi a speciális helyi származást

Ritkán van szükség helyettesítő karakterre még a dev-ben is. Csak az Ön által használt fejlesztői szerverek engedélyezése:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Az eredeteket a rendszer a kis- és nagybetűket nem érinti, a záró perjel figyelmen kívül hagyásával, így `http://localhost:3000` és `http://localhost:3000/` egyenértékűek. Ugyanaz CSV beállítható futás közben is **Irányítópult → Biztonság → CORS Engedélyezett eredet** újraindítás nélkül.

## API kulcsok kontra cookie-munkamenetek

- **Bearer / `x-api-key` (a `/v1/*` következtetési felület):** a böngészők soha nem csatolják ezeket automatikusan. CORS itt nem jelent jelentőségteljes akadályt. — a API kulcs a — gátja, ezért ez a felület szándékosan megengedő, így a böngésző és Electron kliensek elolvashatják azokat a válaszokat, amelyekre már jogosultak. A nyugodt visszhanghoz hitelesített alanyra van szükség (ellenőrzött API -kulcs vagy műszerfali munkamenet), nem csak egy hitelesítő adatfejléc, és soha nem tartalmazza `Access-Control-Allow-Credentials`. A névtelen válaszok (`REQUIRE_API_KEY=false`) a konfigurált eredetengedélylistát használják, beleértve az explicit `CORS_ALLOW_ALL=true` feliratkozást. A hitelesítési elutasítások (401) olvashatóak maradnak, így a kliensek megjeleníthetik a visszavont vagy hibásan begépelt kulcsot (#5242): a folyamat saját 401-je megtartja a visszhangot, és egy útvonal, amely visszautasítja magát a kulcsot, miután a folyamat névtelenül szolgálta ki (`/v1/models` és `/v1beta/models` konfigurált felügyeleti hitelesítéssel, a tulajdonos által hatókörű `/v1/files`, `/v1/batches` `/v1/media`, `/v1/session-leases` jelölt útvonalak) hozzáadja a visszhangot a 401-hez `credentialRejectionHeaders()` en keresztül. A visszhang a hitelesítési adatfejlécet (`Authorization`, `x-api-key`, `x-goog-api-key` vagy a `auth_token` cookie) hordozó kérésre van beírva, nem pedig arra, hogy melyiken ellenőrizte az útvonalat, és soha nem párosul `Access-Control-Allow-Credentials` szel; a test egy rögzített hibaburok. `requireManagementAuth()` `/api/v1/` őrzött felügyeleti útvonalak (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) nem használják ezt a hitelesítés-elutasítási kivételt: `REQUIRE_API_KEY=false` esetén 401/403 válaszaik a konfigurált CORS eredetszabályt követik.
- **Cookie-munkamenet (a műszerfal):** a hibazárás alapértelmezés által védett **és** `Access-Control-Allow-Credentials` hiánya miatt a megosztott úton. Tartsa távol management/dashboard eredeteket minden megengedő konfigurációtól; pontosan zárva kell maradniuk.

## WebSocket kézfogások (`/v1/responses`, `/v1/ws`)

A böngészők nem alkalmazzák CORS WebSocket-re, ezért a következtetési kimenetet visszaadó WebSocket transzportok maguk ellenőrzik a `Origin` kézfogást (`src/server/origin/wsOrigin.ts`): a WebSocket válaszokat (`/v1/responses`), és amikor OmniRoute `npm start` / `npm run dev` keresztül fut, a `/v1/ws` és `/api/v1/ws` hidat, amely `/v1/chat/completions` keretként és `/v1/messages` `/v1/responses` ként streameli. A híd `/api/v1/ws?handshake=1` től kéri az ítéletet, és nem hajlandó frissíteni, hacsak nem ezen az útvonalon futott le az ellenőrzés. A hitelesítési követelmények továbbra is külön érvényesek. Az eredetellenőrzés sikeres, ha:

- nincs `Origin` fejléce (Codex CLI, SDKs és más nem böngésző kliensek);
- a `Origin` a fenti engedélyezési lista engedélyezi (`CORS_ALLOWED_ORIGINS`, a `corsOrigins` beállítás, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- a `Origin` a OmniRoute egyik saját nyilvános forrása (a konfigurált nyilvános alap URL, egy megbízható proxy továbbított eredete, vagy egy IP literálként vagy `localhost` — ként megadott közvetlen loopback/LAN gazdagép, ugyanazok a jelöltek, mint a műszerfali mutációellenőrzés); vagy
- érvényes API kulcsot hordoz, mint a HTTP `/v1/*` felületen.

Minden más megkapja `403 ws_origin_forbidden`. Az irányítópult-munkamenet-cookie nem mentesíti az idegen `Origin`, mivel a böngésző bármely oldal foglalatához csatolja. A másik porton lévő `localhost` nem tekinthető azonos eredetűnek; adjon hozzá ilyen fejlesztői eredetet a `CORS_ALLOWED_ORIGINS`.

## Példa: fordított proxy OmniRoute előtt

CORS maga OmniRoute kényszeríti ki, így a proxynak általában kell **nem** `Access-Control-*` fejlécek hozzáadása vagy átírása (a kettős fejléc megszakítja a böngészőket). TLS leállítása és — továbbítása, hagyja, hogy OmniRoute válaszoljon a repülés előtt:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Állítsa be a böngésző engedélyezett eredetét OmniRoute ban (`CORS_ALLOWED_ORIGINS` vagy a Biztonság lapon), ne a proxyban.

## Forrás fájlok

| Vonatkozik                                              | Fájl                                                                 |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| Az engedélyezési lista felbontása + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| Köztesszoftver-alkalmazás (az igazság egyetlen forrása) | `src/server/authz/pipeline.ts`                                       |
| Beállítások → futásidejű eredet befecskendezés          | `src/lib/config/runtimeSettings.ts`                                  |
| Az irányítópult futásidejű állapota                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| A műszerfal figyelmeztető szalaghirdetése               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Engedélyezett eredet mező                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent útvonalonkénti CORS (kivétel)               | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket kézfogás `Origin` ellenőrzés                  | `src/server/origin/wsOrigin.ts`                                      |

## Lásd még

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback végrehajtása spawn-képes útvonalakhoz (külön, kiegészítő vezérlés).
- [Engedélyezési útmutató](../architecture/AUTHZ_GUIDE.md) — a teljes hitelesítési folyamatot.
