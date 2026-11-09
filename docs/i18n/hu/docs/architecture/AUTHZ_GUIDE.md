# Authorization Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Igazság forrása:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Utolsó frissítés:** 2026-09-22 — hatókör névterek mutatnak az MCP-SERVER.md-re

Az OmniRoute útvonal-érzékeny engedélyezési folyamattal rendelkezik, amely minden API kérést ellenőriz. Az osztályozás **determinisztikus** és **fail-closed** (hibásan zárt) — minden, ami nem osztályozható, `MANAGEMENT` kategóriába kerül, és munkamenet vagy menedzsment szintű tokent igényel. Ez az oldal a modelljét magyarázza el azoknak a mérnököknek, akik útvonalakat tartanak karban vagy új végpontokat terveznek.

![AuthZ folyamat (3 útvonalkategória + házirend-értékelés)](../diagrams/exported/authz-pipeline.svg)

> Forrás: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Két hitelesítési mód

### 1. API-kulcs (Bearer)

Az OpenAI-/Anthropic-/Gemini-kompatibilis kliens-API-khoz, valamint néhány kezelési útvonalhoz használatos, amikor a kulcs rendelkezik a `manage` hatókörrel.

```
Authorization: Bearer <api-key>
```

Az érvényesség ellenőrzését az `src/sse/services/auth.ts` fájlban található `isValidApiKey()` / `extractApiKey()` végzi, amelyeket az `src/shared/utils/apiAuth.ts` újraexportál. Az érvényesítő az `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti változókat is állandó átengedési kulcsként fogadja el (#1350-es issue).

### 2. Dashboard-munkamenet (`auth_token` cookie)

A dashboard oldalaihoz és az adminisztrációs műveletekhez.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

A cookie csak akkor munkamenet, ha a JWT ellenőrzése sikeres, **és** tartalmazza az `authenticated: true` értéket
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). A cookie minden felhasználója (a dashboard útvonalvédelme (`isDashboardSessionAuthenticated()`), az authz-folyamat frissítése, a WebSocket-kézfogás, az éles szerver, valamint az `/api/settings/require-login` és az `/api/auth/status`) ezen a segédfüggvényen keresztül működik.
Léteznek más, `JWT_SECRET` által aláírt JWT-k is — a Cursor CLI átengedési funkciója `iss "omniroute" / aud "cursor-cli"` tokeneket bocsát ki a kulcstulajdonosok számára —, ezek azonban soha nem munkamenetek
(#13298).

Ellenőrzését az `src/shared/utils/apiAuth.ts` fájlban található `isDashboardSessionAuthenticated()` végzi. A folyamat automatikusan frissíti a JWT-t, ha a 30 napos élettartamából kevesebb mint 7 nap van hátra.

A munkamenet a 30 nap lejárta előtt is véget érhet, mivel minden kibocsátás a `mintDashboardSessionToken` függvényen keresztül történik (egy kiadási időponttal, `iat`, és egy azonosítóval, `jti`), az ellenőrző pedig két beállítást vizsgál: a `sessionsValidAfter` értéket, amelyet jelszóváltoztatás állít be, így minden korábban kibocsátott munkamenet ellenőrzése meghiúsul (a jelszót módosító böngésző új cookie-t kap), valamint a `revokedDashboardSessions` értéket, amelyhez a `POST /api/auth/logout` hozzáadja a kijelentkezett munkamenet `jti` értékét. A régebbi kiadás által kibocsátott munkamenetek egyik claimet sem tartalmazzák, és az első jelszóváltoztatásig érvényesek maradnak. Ha a beállítások nem olvashatók be, a munkamenet nem tekinthető megbízhatónak.

Egyes kezelési útvonalak **bármelyik** módot elfogadják: cookie-t **vagy** `Bearer <key>` értéket, ha az API-kulcs rendelkezik a `manage` (vagy `admin`) hatókörrel. Ez teszi lehetővé a v3.8-ban hozzáadott „API-hívásokkal konfigurálható” munkafolyamatot.

#### Opcionális OIDC-bejelentkezési kapu (#6973)

A dashboard adminisztrátori bejelentkezése az alapértelmezett jelszavas bejelentkezés mellett egy **bekapcsolható** OIDC- (OpenID Connect-) folyamatot is támogat
a jelszavas bejelentkezést nem távolítja el, csak
kiegészíti:

- Letiltva, kivéve ha a `settings.oidcEnabled === true` **és** az
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` mind konfigurálva vannak (Beállítások → Hitelesítés).
  A `GET /api/auth/oidc/login` egyébként `400` választ ad.
- A `GET /api/auth/oidc/login` lekéri az `authorization_endpoint` értékét a kibocsátó
  `/.well-known/openid-configuration` végpontjáról (tartalék megoldásként az
  `<issuer>/authorize` végpontot használja), a beérkező kérésből állítja elő az átirányítási URI-t
  (`x-forwarded-proto` figyelembevételével), majd egy véletlenszerű `state` értékkel átirányítja a
  klienst az IdP-hez, amelyet egy `httpOnly` `oidc_state` cookie-ban tárol.
- A `GET /api/auth/oidc/callback` ellenőrzi a `state` értéket, kicseréli az engedélyezési
  kódot, és ellenőrzi az ID-token aláírását a kibocsátó JWKS-e alapján
  (a `jose` `createRemoteJWKSet` függvényével, JWKS URI-nként gyorsítótárazva), valamint
  az `issuer`/`audience` értékeket. Az irányítópultra való belépéshez nem üres
  `oidcAllowedSubjects` lista, `oidcAdmissionClaim` házirend, vagy mindkettő szükséges.
  A tárgylista csak akkor egyezik a `sub` vagy `email` értékével, ha az
  `email_verified === true`. Az opcionális claim-házirend egy pontokkal elválasztott
  ID-token claim-útvonalat (például `realm_access.roles`) és az elfogadott értékek tömbjét
  fogadja; a feloldott claimnek karakterláncokból álló tömbnek kell lennie, amely legalább
  egy elfogadott értéket tartalmaz. Ha mindkét házirend konfigurálva van, mindkettőnek
  teljesülnie kell. A hiányzó vagy hibás formátumú claim-ek alapértelmezés szerint elutasításra
  kerülnek, és egyik házirend hiányában a callback megtagadja a bejelentkezést
  (`not_configured`). A meglévő, csak tárgyalapú konfigurációk változatlanul működnek.
- A Keycloak általában a realm-szerepeket access tokenekbe képezi le, nem feltétlenül
  ID-tokenekbe. A `admin` realm-szerep megköveteléséhez konfiguráljon protokoll-leképezőt
  ehhez a klienshez, amely az `realm_access.roles` értéket belefoglalja az **ID-tokenbe**,
  majd állítsa az `oidcAdmissionClaim` értékét erre:
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  A szerepalapú beléptetés engedélyezése előtt ellenőrizze a kliens tényleges ID-token
  claim-jét; az alkalmazás nem olvassa az access-token szerepeit. Az IdP oldali
  tokenmegtagadás kiegészítheti, de nem helyettesíti ezt az alkalmazásoldali ellenőrzést.
- Sikeres bejelentkezéskor pontosan **ugyanazt** a 30 napos `auth_token` JWT-t állítja elő,
  mint amit a jelszavas bejelentkezés használ (`src/app/api/auth/login/route.ts`), ezért az
  irányítópult munkamenetének további folyamata (automatikus frissítés, cookie-jelzők)
  változatlan marad — az OIDC csak azt váltja fel, ahogyan a cookie létrejön, azt nem,
  hogy milyen jogosultságot biztosít. Az IdP-szerepek vagy -csoportok módosítása nem
  érvényteleníti a meglévő OmniRoute-munkameneteket; azok élettartamát továbbra is a
  kijelentkezés, a jelszórotáció vagy a munkamenet lejárata határozza meg.
- Minden `oidc*` beállítás (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`)
  szerepel a `SECURITY_IMPACTING_SETTINGS_KEYS` listában
  (`src/shared/constants/securityImpactingSettings.ts`): a `PATCH /api/settings`
  `400 PASSWORD_REQUIRED` választ ad, ha a törzs nem tartalmazza a kezelési jelszót
  `currentPassword` értékként (`401 PASSWORD_MISMATCH` választ ad, ha az hibás).
  Az `oidcDisablePasswordLogin` megtagadja a jelszavas _bejelentkezést_
  (`POST /api/auth/login`), de megtartja a tárolt jelszó-hash-t, és az újbóli
  hitelesítés továbbra is ellenőrzi vele a `currentPassword` értékét.
- A `corsOrigins` és a `bruteForceProtection` szintén szerepel a
  `SECURITY_IMPACTING_SETTINGS_KEYS` listában: bármelyik lazítása gyengíti a
  bejelentkezés védelmét, ezért ugyanazt a `currentPassword` értékkel végzett
  újrahitelesítést igénylik (a Biztonság lap kéri ezt), és a JSON-import kihagyja őket.
- Minden biztonsági házirendhez tartozó kulcs — a `SECURITY_IMPACTING_SETTINGS_KEYS`
  bejegyzései, minden `oidc*` kulcs és az irányítópult munkamenetének állapota —
  **csak operátori jogosultsággal** használható a `PATCH /api/settings` végponton:
  a manage-hatókörű API-kulcs vagy az `oma_` hozzáférési token akkor is elutasításra kerül
  `403` hibával, ha a megfelelő `currentPassword` értéket küldi, és az elutasítás
  `settings.update_failed` eseményként, `reason: OPERATOR_REQUIRED` okkal kerül naplózásra
  (`requireOperatorCredential()` itt található: `src/lib/api/operatorCredential.ts`).
  A szokásos beállítások (téma, megjelenítési beállítások) továbbra is írhatók egy
  `manage` kulccsal vagy egy `admin` hozzáférési tokennel. A `/api/settings` végpont
  minden módosításához (valamint a `/api/settings/require-login` végponthoz) szükséges
  az `admin` hozzáférési tokenscope is (`ADMIN_MUTATION_EXACT_PATHS` itt található:
  `src/server/authz/accessScopes.ts`, pontos útvonal-egyezéssel); a `GET` továbbra is
  `read`, a többi `/api/settings/*` alútvonal (proxyk, kombinált alapértékek,
  modell-aliasok, tömörítés, törlések stb.) pedig megtartja a metódus alapján kikövetkeztetett
  `write` hatókört.
- A `POST /api/settings/import-json` kihagyja ezt az újrahitelesítést, ezért írás előtt
  eltávolít minden, az `IMPORT_STRIPPED_SETTINGS_KEYS` listában szereplő kulcsot
  (ugyanabban a fájlban): a jelszót és a `currentPassword` értéket, a
  `SECURITY_IMPACTING_SETTINGS_KEYS` minden bejegyzését, valamint az irányítópult
  munkamenetének állapotát (`sessionsValidAfter`, `revokedDashboardSessions`).
  Egy régebbi biztonsági mentés importálása ezért nem állíthat vissza olyan munkamenetet,
  amelyet egy jelszócsere vagy kijelentkezés már lezárt.

#### Opcionális TOTP-alapú kétfaktoros bejelentkezés (#16619)

A Beállítások → Biztonság részből aktiválható; mindaddig ki van kapcsolva, amíg az
operátor be nem kapcsolja (`src/server/auth/dashboardMfa.ts`).

- **Mit fed le:** jelszavas bejelentkezés (`POST /api/auth/login`, amely ezt követően igényli a
  `POST /api/auth/mfa/verify` végpontot) és az `omniroute connect` (`POST /api/cli/connect`,
  amely elutasítja a csak jelszót tartalmazó cserét, és a kódot `totp` néven veszi át).
- **Mit nem fed le:** OIDC / SSO-bejelentkezés (`/api/auth/oidc/callback`) nem kéri az OmniRoute TOTP-jét. Az identitásszolgáltató saját második faktorára támaszkodik, ezért az IdP-ben kényszerítse ki az MFA-t, ha az OIDC engedélyezve van.
- **Helyreállítás** (elveszett eszköz, nem maradt helyreállítási kód, vagy egy faktor már nem ellenőrizhető, például a `STORAGE_ENCRYPTION_KEY` módosítása után):
  1. Indítsa újra a szervert a `OMNIROUTE_DISABLE_MFA=true` beállítással.
  2. Magán a gazdagépen (loopback partnerrel és loopback `Host` fejléccel, például
     `http://localhost:20128`) jelentkezzen be a jelszóval. A második faktor csak ennél a forrásnál marad ki; minden más forrás továbbra is igényli a kódot.
  3. A Beállítások → Biztonság → Letiltás alatt adja meg a jelszót, és hagyja üresen a kódot. A `POST /api/auth/mfa/disable` csak akkor fogad el `code` nélküli törzset, amikor a változó be van állítva, és a kérés a gazdagépről érkezik; továbbra is megköveteli a vezérlőpult-munkamenetet és az aktuális jelszót, és `auth.mfa.disabled` eseményként naplózza `secondFactor: "recovery_switch"` értékkel.
  4. Szüntesse meg a `OMNIROUTE_DISABLE_MFA` beállítását, indítsa újra, és szükség esetén végezze el újra a regisztrációt.

## Útvonalosztályok

A `src/server/authz/types.ts` három osztályt határoz meg. Minden olyan útvonal, amelyet nem lehet determinisztikusan besorolni, a `MANAGEMENT` osztályba kerül.

| Osztály      | Leírás                                                                                                                                                          | Szükséges hitelesítés                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `PUBLIC`     | Kifejezetten biztonságos útvonalak — bejelentkezés, kijelentkezés, állapot, inicializálás, állapotellenőrzés és a beállítás kezdeti végpontjai.                 | Nincs                                                                           |
| `CLIENT_API` | Modellkiszolgáló végpontok — `/api/v1/*`, `/api/v1beta/*`, valamint az aliasok: `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-kulcs, ha az effektív `REQUIRE_API_KEY` funkciókapcsoló be van kapcsolva |
| `MANAGEMENT` | Irányítópult-oldalak, beállítások, szolgáltatók, kulcsok, adminisztrációs és diagnosztikai végpontok.                                                           | Irányítópult-munkamenet VAGY Bearer `manage` hatókörrel                         |

Néhány `MANAGEMENT` művelet **kizárólag operátor** által végezhető: a `manage` kulcs ehhez nem elég. A hitelesítő adatok exportálása (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), visszaállítás az élő adatok fölé (`POST /api/db-backups/import`, beleértve a `dryRun=true` változatot, `POST /api/db-backups` azonosító szerinti visszaállítás, `POST /api/settings/import-json`), a visszaállítási pontok megsemmisítése (`DELETE /api/db-backups` takarítás, és `PATCH /api/db-backups`, mert az általa mentett megőrzési idő vezérli minden mentés utáni automatikus törlést) irányítópult-munkamenetet, a helyi CLI alanyt vagy a letiltott bejelentkezést követeli meg. Szinkronizációs token kiállítása (`POST /api/sync/tokens`) és `admin` CLI hozzáférési token létrehozása (`POST /api/cli/tokens`) minden bejelentkezési módban irányítópult-munkamenetet vagy a helyi CLI alanyt igényel. Bármely hatókörű API-kulcs és `oma_` hozzáférési token nem operátori hitelesítő adat: ha ilyet kell megadni, `403`-at kapnak. Az ellenőrzés a `src/lib/api/operatorCredential.ts` fájlban van (`resolveOperatorCredential()` / `requireOperatorCredential()`). A bejelentkezési beállítások módosítása is kizárólag operátori feladat: a `POST /api/settings/require-login` (kezelési jelszó beállítása / `requireLogin` átkapcsolása) jelszó megléte után csak ezekkel a hitelesítő adatokkal fogadja el a kérést. Az első indításkori bootstrap ablak (még nincs jelszó) változatlan marad, a jelszó cseréjéhez pedig az irányítópult-munkamenetnek el kell küldenie a `currentPassword` mezőt (hiány vagy hibás érték esetén `403`, `settings.update_failed` eseményként naplózva). A helyi CLI és a bejelentkezés nélküli példány megőrzi a helyreállítási utat, és jelszót jelszó nélkül is állíthat be, mert mindkettő ahhoz a géphez van kötve, amelyen az adatkönyvtár található.

## Folyamat

```
Beérkező kérés → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Megbízható belső fejlécek eltávolítása (x-omniroute-auth-*, x-omniroute-route-class)
    2. Kérésazonosító generálása, útvonal osztályozása a classifyRoute() segítségével
    3. Ha pathname == "/" → átirányítás /dashboard
    4. Ha leállítási folyamat zajlik (graceful shutdown) és /api/* → 503
    5. Ha nem-GET /api/* → checkBodySize() védelem ellenőrzése
    6. Ha OPTIONS → CORS előzetes ellenőrzés 204
    7. Ha options.enforce == false → átengedés route-class fejlécekkel
    8. Egyébként: POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} beállítása → NextResponse.next()
       - reject → JSON-hiba correlation_id értékkel (dashboard-oldalak → 302 /login)
```

A megbízható belső fejléceket (a `src/server/authz/headers.ts` fájlban definiálva) a rendszer **eltávolítja a beérkező kérésekből** az osztályozás előtt — az ügyfelek nem tölthetik előre az `x-omniroute-auth-*` fejléceket egy tárgy megszemélyesítéséhez.

### Szerződések házirendekhez

Minden útvonalosztályhoz tartozik egy házirend a `src/server/authz/policies/` könyvtárban:

- **`publicPolicy`** (`policies/public.ts`) — mindig `allow({ kind: "anonymous", id: "anonymous" })` értéket ad vissza.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — kinyeri a Bearer tokent, majd a `validateApiKey()` segítségével érvényesíti. Csak akkor tér vissza anonim módba, ha a tényleges `REQUIRE_API_KEY` funkciójelző le van tiltva. A tényleges jelző feloldása az `isRequireApiKeyEnabled()` segítségével történik (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), így a Dashboard funkciójelzői és a környezeti változók egységesen szabályozzák az `/api/v1/*`, `/api/v1beta/*` és az aliasok működését; a feloldási hibák alapértelmezés szerint megtagadják a hozzáférést. Engedélyezi a dashboard-munkamenetet használó kéréseket az ügyfél-API útvonalain, beleértve az `/api/v1/models` útvonalat is, amelyet a dashboard modellkatalógusa használ.
  Ha az Entra ID SSO engedélyezve van, akkor a szerkezetileg Entra-tokennek minősülő Bearer tokent (három base64url szegmens, `RS*` alg, `kid`) az SSO-ág kezeli a `validateApiKey()` előtt, és annak eredménye végleges — a token soha nem kerül vissza az API-kulcsos ágba vagy a névtelen módba való visszalépéshez, így egy identitásszolgáltatói kiesés nem eredményezhet nyílt hozzáférést. A statikus API-kulcsokat ez nem érinti. Lásd: [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — elfogadja a dashboard-munkamenetet, a belső modell-szinkronizálási kéréseket (amelyek illeszkednek a `/api/providers/[name]/(sync-models|models)` útvonalra), vagy teljesen kihagyja az ellenőrzést, ha az `isAuthRequired()` értéke false. 403-as (`AUTH_001`) választ ad, ha Bearer-token van jelen, de érvénytelen; egyébként 401-et ad vissza. Emellett az autentikációs ágak előtt érvényesíti az útvonalvédelmi szinteket is (LOCAL_ONLY / ALWAYS_PROTECTED) — lásd: [Útvonalvédelmi szintek](../security/ROUTE_GUARD_TIERS.md). A `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` listában szereplő LOCAL_ONLY útvonalak (jelenleg: `/api/mcp/`) nem loopback címről is elérhetők, ha a Bearer-kulcs tartalmazza a `manage` hatókört; minden más LOCAL_ONLY útvonal a hatókörtől függetlenül továbbra is szigorúan loopbackre korlátozott.

A sikeres házirend `AuthSubject` értéket ad vissza, amelynek `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Az alsóbb szintű kezelők az `src/server/authz/assertAuth.ts` fájlban található `assertAuth(request, "CLIENT_API")` segítségével olvashatják ki, így nincs szükségük az autentikációs logika újbóli futtatására.

## Nyilvános útvonalak listája

A `src/shared/constants/publicApiRoutes.ts` fájl tartalmazza a kifejezett engedélyezési listát:

A lista **struktúra** szerint van felosztva, és ez a felosztás biztonsági szempontból lényeges (GHSA-74g9-q8f6-793h): az előtag ellenőrzése a `startsWith()` használatával történik, ezért minden olyan szomszédos útvonalra is illeszkedik, amely ugyanazokkal a kezdő karakterekkel rendelkezik.
A `/api/usage/om-usage` előtagként `/api/usage/om-usage<anything>` értéket PUBLIC-ként jelöli, a Next pedig ezt `/api/usage/[connectionId]` értékre oldja fel — ez egy saját hitelesítéssel nem rendelkező kezelő.

```ts
// Valódi részfák. Minden bejegyzésnek "/" karakterre KELL végződnie (ezt egy egységteszt ellenőrzi).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // a classify CLIENT_API-ként kezeli, nem „hitelesítés nélküli nyilvános” útvonalként
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Egyedi útvonalak, amelyek illesztése PONTOSAN történik (záró perjellel vagy anélkül).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // bejelentkezési folyamat 2. lépése az opcionális TOTP esetén; szüksége van az MFA-pending cookie-ra
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Csak olvasható egyedi útvonalak, amelyekre a CORS origin lazítása is vonatkozik.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Csak olvasható egyedi útvonal, amelyre NEM vonatkozik a CORS lazítása.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

A csak olvasható útvonalak kizárólag biztonságos metódusokkal nyilvánosak. Megjegyzés: a `classifyRoute()` kizárja a `/api/v1/*` és `/api/v1beta/*` útvonalakat a PUBLIC tartalékágából — ezek mindig `CLIENT_API` értékűek, így rájuk továbbra is vonatkozik a Bearer-kulcs szabályzata.

## Új útvonal hozzáadása

### 1. minta — Nyilvános kliens-API-végpont (Bearer-hitelesítés)

Az `/api/v1/` és `/api/v1beta/` alatti útvonalak automatikusan `CLIENT_API` besorolást kapnak. A middleware kikényszeríti a Bearer-ellenőrzést; az útvonalkezelőknek nem kell azt megismételniük, de szükség esetén kiolvashatják az alanyt.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... a kezelő logikája
}
```

### 2. minta — Felügyeleti végpont (munkamenet vagy Bearer + manage)

Használd a `requireManagementAuth()` függvényt a `src/lib/api/requireManagementAuth.ts` fájlból:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... a kezelő logikája
}
```

Siker esetén a `requireManagementAuth()` visszatérési értéke `null`, egyébként pedig egy JSON-hibát tartalmazó `Response`:

- 401 `AUTH_001` „Hitelesítés szükséges” — egyáltalán nincsenek hitelesítő adatok
- 403 — érvénytelen Bearer, **vagy** van Bearer, de a kulcs nem rendelkezik `manage` / `admin` hatókörrel

A `hasManageScope(scopes)` igaz értéket ad vissza a `"manage"` vagy `"admin"` esetén.

### 3. minta — Hozzáadás a nyilvános engedélyezési listához

A halmazt az alak, ne pedig a kényelmi szempontok alapján válaszd ki. Egyetlen útvonal a `PUBLIC_API_ROUTES_EXACT` halmazba kerüljön (GET-only útvonal esetén pedig a `PUBLIC_READONLY_CORS_API_ROUTES` listába); csak valódi részfa kerülhet a `PUBLIC_API_ROUTE_PREFIXES` listába, és **`/` karakterrel kell végződnie**. Ha egyetlen útvonalat teszel az előtaglistába, azzal minden olyan szomszédos útvonalat is nyilvánossá teszel, amelynek azonosak a kezdő karakterei — beleértve a később hozzáadott, dinamikus szegmenst tartalmazó testvérútvonalakat is (GHSA-74g9-q8f6-793h). Frissítsd az egységteszteket a `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` és `tests/unit/authz/classify.test.ts` fájlokban.

## Hatókörök

Három névtér. Minden ellenőrző csak a saját stringjeit olvassa. Az összehasonlítás,
beleértve azt is, hogy miért hiúsul meg a `manage` a `scopeMatches` ellenőrzésen
a `read:compression` esetében, és miért nem tud egy `read` hozzáférési token
`PATCH /api/keys/{id}` kérést végrehajtani, itt található:
[Három hatókör névtér](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Az API kulcsok tartalmaznak egy `scopes` tömböt (JSON formátumban tárolva az
`api_keys.scopes` mezőben, lásd `src/lib/db/apiKeys.ts`).

### Kezelési hatókör

- `manage` / `admin` — `hasManageScope`. Bearer hozzáférés a kezelési API útvonalakhoz.
- Az `mcp:connect`, `self:usage`, `self:account-quota` és
  `policy:bypass-provider-quota` additív, pontosan egyező hatókörök. Ezek
  kívül esnek a `MANAGEMENT_API_KEY_SCOPES` hatókörön. Az `mcp:connect` csak
  az `/api/mcp/` nem-loopback kivágást nyitja meg.

### MCP eszköz hatókörök

Katalógus és illesztési szabályok (azonos string, vagy egy `*`-ra végződő
megadott hatókör): [MCP eszköz hatókörök](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
Az `MCP_SCOPE_LIST` a `src/shared/constants/mcpScopes.ts` fájlban az eredeti
típusos részhalmaz, nem a teljes katalógus. A kényszerítés az
`open-sse/mcp-server/scopeEnforcement.ts` fájlban fut, miután a
`resolveCallerScopeContext()` feloldja a hatóköröket az MCP hitelesítési
információkból, a kérés metaadataiból vagy az `OMNIROUTE_MCP_SCOPES` alapján.
Ez kikapcsolva marad, hacsak az `OMNIROUTE_MCP_ENFORCE_SCOPES=true` nincs beállítva.

### Hozzáférési token hatókörök

`read` / `write` / `admin` az `oma_live_…` tokeneken, a `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) alapján rangsorolva. Ez a rangsor csak a
hozzáférési token hitelesítő adatokra vonatkozik. Lásd:
[Kezelési hitelesítés](../guides/MANAGEMENT-AUTH.md).

## Hitelesítés-kötelezőség kapcsoló

Az `isAuthRequired()` a `src/shared/utils/apiAuth.ts` fájlban dönti el, hogy egy kérésnél érvényesül-e **bármilyen** hitelesítés:

- `settings.requireLogin === false` → a hitelesítés globálisan ki van kapcsolva, kivéve az mindig védett szintet (lásd: [Útvonalvédelmi szintek](../security/ROUTE_GUARD_TIERS.md)), valamint azokat a hívásokat, amelyek olyan hitelesítő adatot állítanak ki, amelyet a rendszer elfogad. Ezekhez ugyanaz a hitelesítő adat kell, mint bejelentkezéssel: szinkronizációs tokenek kiállítása, CLI hozzáférési tokenek kiállítása bármilyen hatókörrel, valamint `manage`/`admin` hatókörű API-kulcs létrehozása, ilyen hatókör megadása egy kulcsnak, vagy ilyen kulcs újragenerálása és megjelenítése (`requireCredentialForManagementScopedKey()` a `src/lib/api/requireManagementAuth.ts` fájlban). A következtetési célú kulcsok nyitva maradnak.
- Nincs jelszó beállítva **és** nincs `INITIAL_PASSWORD` környezeti változó → bootstrap mód: a beállító varázsló és a loopback kérések engedélyezettek, de a külső hálózati kéréseknek továbbra is hitelesítő adat kell.
- Bármilyen adatbázis-hiba → zárt állapot (biztonságos alapértelmezés).

Az ügyfél-API kulcs érvényesítése az `isRequireApiKeyEnabled()` függvényt használja a `src/shared/utils/featureFlags.ts` fájlban, nem közvetlenül a `process.env.REQUIRE_API_KEY` olvasását. Ez a telepített példányoknál fontos: a `REQUIRE_API_KEY` átkapcsolása az Irányítópult → Funkciókapcsolók menüben DB-felülírást tárol, és azonnal hat a `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` útvonalakra és a többi ügyfél-API hitelesítési ellenőrzésre, amelyek ezt a segédfüggvényt használják. Ha a funkciókapcsoló-tár nem olvasható, az ügyfél-API hitelesítés zárt állapotba kerül, és kulcsot kér.

## Inkompatibilis változás — v3.8.0

A `/api/v1/agents/tasks/*` és `/api/resilience/model-cooldowns` végpontokhoz **mostantól felügyeleti hitelesítés szükséges** (`588a0333` commit). Azok a kliensek, amelyek korábban normál, `manage` hatókör nélküli API-kulcsot küldtek, `403` választ kapnak. Migráció: vagy rendelje hozzá a kulcshoz a `manage` hatókört az API-kulcsok vezérlőpultján, vagy használjon bejelentkezett vezérlőpulti munkamenetet.

## Viselkedésbeli változás — v3.8.2

Az `/api/mcp/*` (a távoli MCP-kiszolgáló) alapértelmezés szerint továbbra is LOCAL_ONLY, de mostantól elfogadja a nem loopback címről érkező kéréseket, ha az `Authorization: Bearer <api-key>` fejléc tartalmazza a `manage` hatókört. A kivétel útvonalanként kifejezetten az `src/server/authz/routeGuard.ts` fájlban található `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` használatával van szabályozva; a kapcsolódó LOCAL_ONLY `/api/cli-tools/runtime/*` előtag szándékosan nem kerülhető meg, mert tetszőleges alfolyamatokat indíthat el. Az `/api/mcp/*` útvonalra nem loopback címről érkező névtelen kérések továbbra is `403 LOCAL_ONLY` választ kapnak — minden új LOCAL_ONLY útvonal alapértelmezése továbbra is szigorúan loopback. Lásd: [Útvonalvédelmi szintek](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Tesztelés

- Egységtesztek: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Nyilvános engedélyezési lista: `tests/unit/public-api-routes.test.ts`.
- Célzott futtatás: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Hibaelhárítás

A folyamat mindig ellátja a válaszokat a következőkkel:

```
x-request-id:               <korrelációs azonosító, amely visszaköszön a hibatörzsekben>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

A hitelesített kérések esetében a felfelé irányuló (kezelőoldali) kérésfejlécek szintén tartalmazzák a következőket:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (nem kötelező)
x-omniroute-auth-scopes:    vesszővel elválasztott lista
```

Használd az `assertAuth(req, expectedClass)` függvényt a kezelőkben — ez `AuthzAssertionError` hibát dob `AUTHZ_NOT_INITIALIZED` kóddal, ha a middleware megkerülésre került (ez hasznos a konfigurációs regressziók tesztelés közbeni felismeréséhez).

## Lásd még

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — hitelesítési jelölő végpontonként
- [COMPLIANCE.md](../security/COMPLIANCE.md) — naplózási napló hitelesítési eseményekhez
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — három hatókör-névtér és MCP eszköz-hatókör katalógus
- Forrás: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
