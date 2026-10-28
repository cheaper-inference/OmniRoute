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

Az OpenAI-/Anthropic-/Gemini-kompatibilis kliens API-khoz, valamint néhány felügyeleti útvonalhoz használatos, ha a kulcs rendelkezik `manage` hatókörrel.

```
Authorization: Bearer <api-key>
```

Az ellenőrzést az `isValidApiKey()` / `extractApiKey()` végzi a `src/sse/services/auth.ts` fájlban, és a `src/shared/utils/apiAuth.ts` újraexportálja ezeket. Az ellenőrző az `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti változókat is elfogadja állandó, változtatás nélkül továbbított kulcsokként (#1350-es probléma).

### 2. Irányítópult-munkamenet (auth_token cookie)

Az irányítópult oldalaihoz és az adminisztrátori műveletekhez.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Egy cookie csak akkor minősül munkamenetnek, ha a JWT ellenőrzése sikeres, **és** tartalmazza az `authenticated: true` értéket
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). A cookie minden
felhasználója (az irányítópult útvonalvédelme (`isDashboardSessionAuthenticated()`), az authz-folyamat frissítése, a WebSocket-kézfogás, az élő
szerver, `/api/settings/require-login`, `/api/auth/status`) ezen a segédfüggvényen keresztül működik.
Léteznek más, a `JWT_SECRET` használatával aláírt JWT-k is — a Cursor CLI változtatás nélküli továbbítása
`iss "omniroute" / aud "cursor-cli"` tokeneket bocsát ki a kulcsok birtokosai számára —, ezek azonban soha nem minősülnek munkamenetnek
(#13298).

Az ellenőrzést az `isDashboardSessionAuthenticated()` végzi a `src/shared/utils/apiAuth.ts` fájlban. A folyamat automatikusan frissíti a JWT-t, ha a 30 napos élettartamából kevesebb mint 7 nap van hátra.

Egy munkamenet a 30 nap letelte előtt is véget érhet, mivel minden kibocsátó a `mintDashboardSessionToken` függvényt használja (egy `iat` kibocsátási idővel és egy `jti` azonosítóval), az ellenőrző pedig két beállítást vizsgál: a `sessionsValidAfter` értéket, amelyet jelszómódosításkor állít be a rendszer, így az ez előtt kibocsátott összes munkamenet ellenőrzése sikertelen lesz (a jelszót módosító böngésző friss cookie-t kap), valamint a `revokedDashboardSessions` értéket, amelyhez a `POST /api/auth/logout` hozzáadja a kijelentkeztetett munkamenet `jti` azonosítóját. A régebbi kiadás által létrehozott munkamenetek egyik jogcímet sem tartalmazzák, és az első jelszómódosításig érvényesek maradnak. Ha a beállítások nem olvashatók, a munkamenet nem tekinthető megbízhatónak.

Egyes felügyeleti útvonalak **bármelyik** módot elfogadják: cookie VAGY `Bearer <key>`, ha az API-kulcs rendelkezik `manage` (vagy `admin`) hatókörrel. Ez teszi lehetővé a v3.8-ban hozzáadott „API-hívásokon keresztül konfigurálható” munkafolyamatot.

#### Opcionális OIDC bejelentkezési kapu (#6973)

Az irányítópult adminisztrátori bejelentkezése az alapértelmezett jelszavas bejelentkezés mellett egy **opcionálisan engedélyezhető** OIDC (OpenID Connect) folyamatot is támogat — a jelszavas bejelentkezés soha nem kerül eltávolításra, csak
kiegészül:

- Letiltva marad, kivéve, ha a `settings.oidcEnabled === true`, **és** az `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` mindegyike konfigurálva van (Beállítások → Hitelesítés).
  Ellenkező esetben a `GET /api/auth/oidc/login` válasza `400`.
- A `GET /api/auth/oidc/login` a kibocsátó
  `/.well-known/openid-configuration` végpontjából deríti fel az `authorization_endpoint`
  értékét (sikertelenség esetén a `<issuer>/authorize` értéket használja), a bejövő kérésből
  állítja össze az átirányítási URI-t (figyelembe véve az `x-forwarded-proto` fejlécet),
  majd egy véletlenszerű `state` értékkel átirányít az IdP-hez; az értéket egy `httpOnly`
  `oidc_state` cookie-ban tárolja.
- A `GET /api/auth/oidc/callback` ellenőrzi a `state` értékét, beváltja az engedélyezési
  kódot, majd a kibocsátó JWKS-e segítségével ellenőrzi az ID token aláírását
  (a `jose` `createRemoteJWKSet` funkciójával, JWKS URI-nként gyorsítótárazva), beleértve
  az `issuer`/`audience` ellenőrzéseket. Az irányítópulthoz való hozzáféréshez nem üres
  `oidcAllowedSubjects` lista, `oidcAdmissionClaim` szabályzat vagy mindkettő szükséges.
  Az alanylista a `sub` vagy az `email` értékére illeszkedik, de az utóbbira csak akkor,
  ha `email_verified === true`. Az opcionális jogcím-szabályzat egy pontokkal tagolt
  ID-token-jogcímútvonalat (például `realm_access.roles`) és elfogadott értékek tömbjét
  várja; a feloldott jogcímnek karakterláncok olyan tömbjének kell lennie, amely legalább
  egy elfogadott értéket tartalmaz. Ha mindkét szabályzat konfigurálva van, mindkettőnek
  teljesülnie kell. Hiányzó vagy hibás formátumú jogcímek esetén a hozzáférés megtagadásra
  kerül, és ha egyik szabályzat sincs beállítva, a visszahívás elutasítja a bejelentkezést
  (`not_configured`). A meglévő, csak alanyalapú konfigurációk változatlanul működnek tovább.
- A Keycloak az objektumtartományi szerepköröket általában a hozzáférési tokenekbe képezi
  le, nem feltétlenül az ID tokenekbe. Az `admin` objektumtartományi szerepkör megköveteléséhez
  konfiguráljon egy protokollleképezőt ehhez a klienshez, amely az **ID tokenben** szerepelteti
  a `realm_access.roles` értéket, majd állítsa az `oidcAdmissionClaim` értékét erre:
  `{ "path": "realm_access.roles", "values": ["admin"] }`. A kizárólag szerepköralapú
  hozzáférés engedélyezése előtt ellenőrizze az adott kliens tényleges ID-token-jogcímét;
  az alkalmazás nem olvassa a hozzáférési token szerepköreit. Az IdP-oldali tokenelutasítás
  kiegészítheti, de nem helyettesíti ezt az alkalmazásoldali ellenőrzést.
- Siker esetén **pontosan ugyanazt** a 30 napos `auth_token` JWT-t állítja elő, mint a
  jelszavas bejelentkezés (`src/app/api/auth/login/route.ts`), így az irányítópult
  munkamenet-feldolgozási folyamatának többi része (automatikus frissítés, cookie-jelzők)
  változatlan marad — az OIDC csak azt helyettesíti, hogyan jön létre a cookie, azt nem,
  hogy milyen jogosultságokat biztosít. Az IdP szerepköreinek/csoportjainak módosításai
  nem érvénytelenítik a meglévő OmniRoute-munkameneteket; azok élettartamát továbbra is
  a kijelentkezés, a jelszó módosítása vagy a munkamenet lejárata szabályozza.
- Minden `oidc*` beállítás (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) szerepel a
  `SECURITY_IMPACTING_SETTINGS_KEYS` listában
  (`src/shared/constants/securityImpactingSettings.ts`): a `PATCH /api/settings`
  válasza `400 PASSWORD_REQUIRED`, kivéve, ha a törzs a felügyeleti jelszót
  `currentPassword` értékként tartalmazza (hibás jelszó esetén `401 PASSWORD_MISMATCH`).
  Az `oidcDisablePasswordLogin` letiltja a jelszavas _bejelentkezést_
  (`POST /api/auth/login`), de megtartja a tárolt jelszókivonatot, és az újbóli
  hitelesítés továbbra is ehhez hasonlítja a `currentPassword` értékét.
- A `corsOrigins` és a `bruteForceProtection` szintén szerepel a
  `SECURITY_IMPACTING_SETTINGS_KEYS` listában: bármelyik lazítása gyengíti a
  bejelentkezési védelmet, ezért ugyanazt a `currentPassword` használatával történő
  újbóli hitelesítést igénylik (a Biztonság lap bekéri ezt), a JSON-import pedig
  eltávolítja őket.
- Minden biztonsági szabályzatkulcs — a `SECURITY_IMPACTING_SETTINGS_KEYS` bejegyzései,
  minden `oidc*` kulcs és az irányítópult munkamenet-állapota — **csak operátori**
  jogosultsággal módosítható a `PATCH /api/settings` végponton: a `manage` hatókörű
  API-kulcs vagy egy `oma_` hozzáférési token elutasításra kerül `403` válasszal még
  akkor is, ha a helyes `currentPassword` értéket küldi, az elutasítás pedig
  `settings.update_failed` eseményként, `reason: OPERATOR_REQUIRED` indokkal kerül
  naplózásra (`requireOperatorCredential()` a `src/lib/api/operatorCredential.ts`
  fájlban). A szokásos beállítások (téma, megjelenítési beállítások) továbbra is
  módosíthatók `manage` kulccsal vagy `admin` hozzáférési tokennel. Magának az
  `/api/settings` végpontnak (és az `/api/settings/require-login` végpontnak) minden
  módosítása szintén megköveteli a hozzáférési token `admin` hatókörét
  (`ADMIN_MUTATION_EXACT_PATHS` a `src/server/authz/accessScopes.ts` fájlban, pontos
  útvonalegyezéssel); a `GET` továbbra is `read`, a többi `/api/settings/*` alútvonal
  (proxyk, kombinációs alapértékek, modellálnevek, tömörítés, törlések…) pedig megtartja
  a metódusból kikövetkeztetett `write` hatókört.
- A `POST /api/settings/import-json` kihagyja ezt az újbóli hitelesítést, ezért írás
  előtt eltávolít minden, az `IMPORT_STRIPPED_SETTINGS_KEYS` listában szereplő kulcsot
  (ugyanabban a fájlban): a jelszót és a `currentPassword` értéket, a
  `SECURITY_IMPACTING_SETTINGS_KEYS` minden bejegyzését, valamint az irányítópult
  munkamenet-állapotát (`sessionsValidAfter`, `revokedDashboardSessions`).
  Egy régebbi biztonsági mentés importálása ezért nem állíthat vissza olyan munkamenetet,
  amelyet egy jelszóváltoztatás vagy kijelentkezés már lezárt.

## Útvonalosztályok

A `src/server/authz/types.ts` három osztályt határoz meg. Minden olyan útvonal, amelyet nem lehet determinisztikusan besorolni, a `MANAGEMENT` osztályba kerül.

| Osztály      | Leírás                                                                                                                                                          | Szükséges hitelesítés                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `PUBLIC`     | Kifejezetten biztonságos útvonalak — bejelentkezés, kijelentkezés, állapot, inicializálás, állapotellenőrzés és a beállítás kezdeti végpontjai.                 | Nincs                                                                           |
| `CLIENT_API` | Modellkiszolgáló végpontok — `/api/v1/*`, `/api/v1beta/*`, valamint az aliasok: `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-kulcs, ha az effektív `REQUIRE_API_KEY` funkciókapcsoló be van kapcsolva |
| `MANAGEMENT` | Irányítópult-oldalak, beállítások, szolgáltatók, kulcsok, adminisztrációs és diagnosztikai végpontok.                                                           | Irányítópult-munkamenet VAGY Bearer `manage` hatókörrel                         |

Néhány `MANAGEMENT` művelet **kizárólag operátor** által végezhető: a `manage` kulcs ehhez nem elég. A hitelesítő adatok exportálása (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), visszaállítás az élő adatok fölé (`POST /api/db-backups/import`, beleértve a `dryRun=true` változatot, `POST /api/db-backups` azonosító szerinti visszaállítás, `POST /api/settings/import-json`), a visszaállítási pontok megsemmisítése (`DELETE /api/db-backups` takarítás, és `PATCH /api/db-backups`, mert az általa mentett megőrzési idő vezérli minden mentés utáni automatikus törlést) irányítópult-munkamenetet, a helyi CLI alanyt vagy a letiltott bejelentkezést követeli meg. Szinkronizációs token kiállítása (`POST /api/sync/tokens`) és `admin` CLI hozzáférési token létrehozása (`POST /api/cli/tokens`) minden bejelentkezési módban irányítópult-munkamenetet vagy a helyi CLI alanyt igényel. Bármely hatókörű API-kulcs és `oma_` hozzáférési token nem operátori hitelesítő adat: ha ilyet kell megadni, `403`-at kapnak. Az ellenőrzés a `src/lib/api/operatorCredential.ts` fájlban van (`resolveOperatorCredential()` / `requireOperatorCredential()`). A bejelentkezési beállítások módosítása is kizárólag operátori feladat: a `POST /api/settings/require-login` (kezelési jelszó beállítása / `requireLogin` átkapcsolása) jelszó megléte után csak ezekkel a hitelesítő adatokkal fogadja el a kérést. Az első indításkori bootstrap ablak (még nincs jelszó) változatlan marad, a jelszó cseréjéhez pedig az irányítópult-munkamenetnek el kell küldenie a `currentPassword` mezőt (hiány vagy hibás érték esetén `403`, `settings.update_failed` eseményként naplózva). A helyi CLI és a bejelentkezés nélküli példány megőrzi a helyreállítási utat, és jelszót jelszó nélkül is állíthat be, mert mindkettő ahhoz a géphez van kötve, amelyen az adatkönyvtár található.

## Feldolgozási folyamat

```
Bejövő kérés → src/proxy.ts
  → runAuthzPipeline() a src/server/authz/pipeline.ts fájlban
    1. Megbízható belső fejlécek eltávolítása (x-omniroute-auth-*, x-omniroute-route-class)
    2. Kérésazonosító létrehozása, az útvonal besorolása a classifyRoute() segítségével
    3. Ha pathname == "/" → átirányítás ide: /dashboard
    4. Ha leállítási állapotban van (szabályos leállítás), és /api/* → 503
    5. Ha nem GET /api/* → checkBodySize() ellenőrzés
    6. Ha OPTIONS → CORS előzetes kérés, 204
    7. Ha options.enforce == false → változatlan továbbítás útvonalosztály-fejlécekkel
    8. Egyébként: POLICIES[routeClass].evaluate(ctx)
       - engedélyezés  → x-omniroute-auth-{kind,id,label,scopes} beállítása → NextResponse.next()
       - elutasítás → JSON-hiba correlation_id értékkel (vezérlőpultoldalak → 302 /login)
```

A megbízható belső fejléceket (amelyeket a `src/server/authz/headers.ts` definiál) a rendszer a besorolás előtt **eltávolítja a bejövő kérésekből** — az ügyfelek nem adhatják meg előre az `x-omniroute-auth-*` fejléceket egy alany megszemélyesítéséhez.

### Szabályzati szerződések

Minden útvonalosztályhoz tartozik egy szabályzat a `src/server/authz/policies/` könyvtárban:

- **`publicPolicy`** (`policies/public.ts`) — mindig az `allow({ kind: "anonymous", id: "anonymous" })` értéket adja vissza.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — kinyeri a Bearer-token értékét, és a `validateApiKey()` segítségével ellenőrzi. Csak akkor engedélyez névtelen hozzáférést, ha az effektív `REQUIRE_API_KEY` funkciójelző le van tiltva. Az effektív jelzőt az `isRequireApiKeyEnabled()` oldja fel (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), így a vezérlőpult funkciójelzői és a környezeti változók egységesen szabályozzák az `/api/v1/*`, `/api/v1beta/*` útvonalakat és aliasaikat; a feloldási hibák zárt módon meghiúsítják a hozzáférést. Engedélyezi a vezérlőpult-munkamenettel rendelkező kéréseket az ügyfél-API útvonalain (beleértve a vezérlőpult modellkatalógusa által használt `/api/v1/models` útvonalat).
- **`managementPolicy`** (`policies/management.ts`) — elfogad vezérlőpult-munkamenetet és belső modell-szinkronizálási kéréseket (amelyeket az `/api/providers/[name]/(sync-models|models)` mintával egyeztet), vagy teljesen kihagyja az ellenőrzést, ha az `isAuthRequired()` false értéket ad vissza. 403-as (`AUTH_001`) választ ad, ha van Bearer-token, de az érvénytelen; egyébként 401-es választ ad. Emellett minden hitelesítési ág előtt érvényesíti az útvonalvédelmi szinteket (LOCAL_ONLY / ALWAYS_PROTECTED) — lásd: [Útvonalvédelmi szintek](../security/ROUTE_GUARD_TIERS.md). A `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` listában szereplő LOCAL_ONLY útvonalak (jelenleg: `/api/mcp/`) nem loopback címről is elérhetők, ha a Bearer-kulcs rendelkezik `manage` hatókörrel; minden más LOCAL_ONLY útvonal a hatókörtől függetlenül szigorúan csak loopback címről érhető el.

A sikeres szabályzat egy `AuthSubject` értéket ad vissza, ahol `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Az alsóbb szintű kezelők ezt az `assertAuth(request, "CLIENT_API")` segítségével olvashatják ki a `src/server/authz/assertAuth.ts` fájlban, a hitelesítési logika ismételt végrehajtása helyett.

## Nyilvános útvonalak listája

A `src/shared/constants/publicApiRoutes.ts` tartalmazza az explicit engedélyezési listát:

A lista **alak** szerint van felosztva, és ez a felosztás biztonságkritikus (GHSA-74g9-q8f6-793h): a rendszer az előtagokat a `startsWith()` használatával illeszti, így minden olyan szomszédos útvonalra is illeszkednek, amelynek azonosak a kezdő karakterei.
Az `/api/usage/om-usage` előtagként az `/api/usage/om-usage<anything>` mintának megfelelő összes útvonalat NYILVÁNOSSÁ tette, a Next pedig ezt az `/api/usage/[connectionId]` útvonalra oldja fel — egy olyan kezelőre, amely nem rendelkezik saját hitelesítéssel.

```ts
// Valódi részfák. Minden bejegyzésnek "/" karakterrel KELL végződnie (ezt egységteszt ellenőrzi).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // a classify CLIENT_API-ként kezeli, nem „hitelesítés nélküli nyilvánosként”
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Egyedi útvonalak, PONTOS illesztéssel (záró perjellel vagy anélkül).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Csak olvasható egyedi útvonalak, amelyekre a CORS-eredetre vonatkozó enyhítés is érvényes.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Csak olvasható egyedi útvonal a CORS-enyhítés NÉLKÜL.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

A csak olvasható útvonalak **csak** biztonságos metódusok esetén nyilvánosak. Megjegyzés: a `classifyRoute()` kizárja az `/api/v1/*` és `/api/v1beta/*` útvonalakat a PUBLIC alapértelmezett ágból — ezek mindig `CLIENT_API` besorolást kapnak, így a Bearer-kulcsokra vonatkozó szabályzat továbbra is érvényesül.

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

## Hibakeresés

A feldolgozási folyamat a válaszokat mindig a következő fejlécekkel látja el:

```
x-request-id:               <korrelációs azonosító, a hibatörzsekben is visszaküldve>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Hitelesített kérések esetén a felsőbb rétegbeli (kezelőoldali) kérésfejlécek a következőket is tartalmazzák:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<utolsó 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opcionális)
x-omniroute-auth-scopes:    vesszővel elválasztott lista
```

A kezelőkön belül használja az `assertAuth(req, expectedClass)` függvényt — ez `AUTHZ_NOT_INITIALIZED` kódú `AuthzAssertionError` hibát vált ki, ha a köztes szoftvert megkerülték (hasznos a konfigurációs regressziók tesztekben történő észleléséhez).

## Lásd még

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — hitelesítési jelölő végpontonként
- [COMPLIANCE.md](../security/COMPLIANCE.md) — naplózási napló hitelesítési eseményekhez
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — három hatókör-névtér és MCP eszköz-hatókör katalógus
- Forrás: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
