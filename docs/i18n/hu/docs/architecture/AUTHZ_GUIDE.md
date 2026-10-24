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

Az OpenAI/Anthropic/Gemini-kompatibilis kliens API-khoz és néhány kezelési útvonalhoz használatos, ha a kulcsnak van `manage` hatóköre.

```
Authorization: Bearer <api-key>
```

Az `isValidApiKey()` / `extractApiKey()` függvények ellenőrzik a `src/sse/services/auth.ts` fájlban, és a `src/shared/utils/apiAuth.ts` fájlon keresztül exportálódnak újra. Az ellenőrző az `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti változókat is elfogadja állandó átengedő kulcsként (#1350-es issue).

### 2. Irányítópult-munkamenet (auth_token süti)

Az irányítópult oldalaihoz és az adminisztrációs műveletekhez.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

A süti csak akkor számít munkamenetnek, ha a JWT ellenőrzése sikeres **és** tartalmazza az `authenticated: true` értéket (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). A süti minden felhasználója — az irányítópult útvonalvédelme (`isDashboardSessionAuthenticated()`), az authz-folyamat frissítése, a WebSocket-kézfogás, az élő kiszolgáló, a `/api/settings/require-login` és a `/api/auth/status` — ezen a segédfüggvényen keresztül megy.
A `JWT_SECRET`-tel aláírt más JWT-k is léteznek — a Cursor CLI átengedő folyamata `iss "omniroute" / aud "cursor-cli"` tokeneket állít ki a kulcs birtokosainak —, ezek soha nem számítanak munkamenetnek (#13298).

Az `isDashboardSessionAuthenticated()` ellenőrzi a `src/shared/utils/apiAuth.ts` fájlban. A folyamat automatikusan megújítja a JWT-t, ha a 30 napos élettartamából kevesebb mint 7 nap van hátra.

A munkamenet a 30 nap letelte előtt is véget érhet: minden kiállítás a `mintDashboardSessionToken` függvényen keresztül történik (kiállítási idő `iat`, azonosító `jti`), az ellenőrző pedig két beállítást vizsgál. A `sessionsValidAfter` értékét a jelszócsere állítja be, így az előtte kiállított összes munkamenet érvénytelenné válik (a jelszót megváltoztató böngésző új sütit kap). A `revokedDashboardSessions` listához a `POST /api/auth/logout` hozzáadja a kijelentkezett munkamenet `jti` értékét. A régebbi kiadás által kiállított munkamenetekben egyik állítás sincs, ezek az első jelszócseréig érvényesek maradnak. Ha a beállítások nem olvashatók be, a munkamenet nem bízható meg.

Néhány kezelési útvonal **bármelyik** módot elfogadja: sütit VAGY `Bearer <key>` fejlécet, ha az API-kulcsnak van `manage` (vagy `admin`) hatóköre. Ez teszi lehetővé a v3.8-ban bevezetett, API-hívásokon keresztül konfigurálható munkafolyamatot.

#### Opcionális OIDC-bejelentkezési kapu (#6973)

Az irányítópult adminisztrátori bejelentkezése egy **opcionális** OIDC (OpenID Connect) folyamatot is támogat az alapértelmezett jelszavas bejelentkezés mellett — a jelszavas bejelentkezés soha nem szűnik meg, csak kiegészül:

- Csak akkor engedélyezett, ha `settings.oidcEnabled === true`, **és** az `oidcIssuer` / `oidcClientId` / `oidcClientSecret` mind be van állítva (Beállítások → Hitelesítés). Ellenkező esetben a `GET /api/auth/oidc/login` `400`-at ad vissza.
- A `GET /api/auth/oidc/login` az `authorization_endpoint` címet a kiállító `/.well-known/openid-configuration` végpontjáról deríti fel (visszalépésként `<issuer>/authorize`), a visszairányítási URI-t a bejövő kérésből építi (`x-forwarded-proto`-kompatibilisen), majd egy véletlen `state` értékkel, a `httpOnly` `oidc_state` sütiben tárolva átirányít az IdP-hez.
- A `GET /api/auth/oidc/callback` ellenőrzi a `state` értéket, beváltja az engedélyezési kódot, és az ID-token aláírását a kiállító JWKS-ével ellenőrzi (`jose` `createRemoteJWKSet`, JWKS URI-nként gyorsítótárazva), `issuer`/`audience` ellenőrzéssel. Az `oidcAllowedSubjects` engedélylista kötelező: a token `sub` állításával vagy `email` állításával egyezik. Az e-mail állítás csak akkor érvényes, ha `email_verified === true`, így az IdP-nél nem ellenőrzött e-mail soha nem juthat át a kapun. Bejegyzések nélkül a visszahívás minden bejelentkezést elutasít (`not_configured`).
- Sikeres bejelentkezés esetén **pontosan ugyanazt** a 30 napos `auth_token` JWT-t állítja ki, mint a jelszavas bejelentkezés (`src/app/api/auth/login/route.ts`), így az irányítópult munkamenet-folyamatának többi része (automatikus megújítás, süti-jelzők) változatlan. Az OIDC csak azt cseréli le, hogyan jön létre a süti, azt nem, amit ad.
- Minden `oidc*` beállítás (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) szerepel a `SECURITY_IMPACTING_SETTINGS_KEYS` listában (`src/shared/constants/securityImpactingSettings.ts`): a `PATCH /api/settings` `400 PASSWORD_REQUIRED` választ ad, hacsak a törzs nem tartalmazza a kezelési jelszót `currentPassword` mezőben (helytelen jelszó esetén `401 PASSWORD_MISMATCH`). Az `oidcDisablePasswordLogin` megtiltja a jelszavas _bejelentkezést_ (`POST /api/auth/login`), de megtartja a tárolt jelszó-hash-t, az újrahitelesítés pedig továbbra is ezzel ellenőrzi a `currentPassword` értéket.
- A `corsOrigins` és a `bruteForceProtection` is szerepel a `SECURITY_IMPACTING_SETTINGS_KEYS` listában: ezek lazítása gyengíti a bejelentkezés védelmét, ezért ugyanazt az újrahitelesítést (`currentPassword`) kérik (a Biztonság fül ezt kéri), a JSON-importálás pedig eldobja őket.
- Minden biztonsági szabálykulcs — a `SECURITY_IMPACTING_SETTINGS_KEYS` bejegyzései, minden `oidc*` kulcs és az irányítópult-munkamenet állapota — **kizárólag operátor** által módosítható a `PATCH /api/settings` végponton: a `manage` hatókörű API-kulcs vagy `oma_` hozzáférési token `403`-at kap akkor is, ha a helyes `currentPassword` értéket küldi, az elutasítás pedig `settings.update_failed` eseményként, `reason: OPERATOR_REQUIRED` okkal kerül naplózásra (`requireOperatorCredential()` a `src/lib/api/operatorCredential.ts` fájlban). A normál beállítások (téma, megjelenítési beállítások) a `manage` kulccsal vagy `admin` hozzáférési tokennel továbbra is írhatók. A `/api/settings` bármely módosítása (és a `/api/settings/require-login`) az `admin` hozzáférési token hatókört igényli (`ADMIN_MUTATION_EXACT_PATHS` a `src/server/authz/accessScopes.ts` fájlban, pontos útvonal-egyezéssel); a `GET` a `read` hatókört igényli, a többi `/api/settings/*` alútvonal (proxyk, combo-alapértelmezések, modell-aliasok, tömörítés, tisztítások…) pedig a metódusból következtetett `write` hatókört tartja meg.
- A `POST /api/settings/import-json` kihagyja ezt az újrahitelesítést, ezért az íráskor eldobja az `IMPORT_STRIPPED_SETTINGS_KEYS` listában szereplő kulcsokat (ugyanabban a fájlban): a jelszót és a `currentPassword` mezőt, minden `SECURITY_IMPACTING_SETTINGS_KEYS` bejegyzést, valamint az irányítópult-munkamenet állapotát (`sessionsValidAfter`, `revokedDashboardSessions`). Egy régebbi mentés importálása ezért nem támaszthat fel olyan munkamenetet, amelyet jelszócsere vagy kijelentkezés már lezárt.
- Csak akkor engedélyezett, ha `settings.oidcEnabled === true`, **és** az `oidcIssuer` / `oidcClientId` / `oidcClientSecret` mind be van állítva (Beállítások → Hitelesítés). A `GET /api/auth/oidc/login` ellenkező esetben `400`-at ad vissza.
- A `GET /api/auth/oidc/login` az `authorization_endpoint` címet a kiállító `/.well-known/openid-configuration` végpontjáról deríti fel (visszalépésként `<issuer>/authorize`), a visszairányítási URI-t a bejövő kérésből építi (`x-forwarded-proto`-kompatibilisen), majd egy véletlen `state` értékkel, a `httpOnly` `oidc_state` sütiben tárolva átirányít az IdP-hez.
- A `GET /api/auth/oidc/callback` ellenőrzi a `state` értéket, beváltja az engedélyezési kódot, és az ID-token aláírását a kiállító JWKS-ével ellenőrzi (`jose` `createRemoteJWKSet`, JWKS URI-nként gyorsítótárazva), `issuer`/`audience` ellenőrzéssel. Az `oidcAllowedSubjects` engedélylista kötelező: a token `sub` állításával vagy `email` állításával egyezik. Az e-mail állítás csak akkor érvényes, ha `email_verified === true`, így az IdP-nél nem ellenőrzött e-mail soha nem juthat át a kapun. Bejegyzések nélkül a visszahívás minden bejelentkezést elutasít (`not_configured`).
- Sikeres bejelentkezés esetén **pontosan ugyanazt** a 30 napos `auth_token` JWT-t állítja ki, mint a jelszavas bejelentkezés (`src/app/api/auth/login/route.ts`), így az irányítópult munkamenet-folyamatának többi része (automatikus megújítás, süti-jelzők) változatlan. Az OIDC csak azt cseréli le, hogyan jön létre a süti, azt nem, amit ad.
- Minden `oidc*` beállítás (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) szerepel a `SECURITY_IMPACTING_SETTINGS_KEYS` listában (`src/shared/constants/securityImpactingSettings.ts`): a `PATCH /api/settings` `400 PASSWORD_REQUIRED` választ ad, hacsak a törzs nem tartalmazza a kezelési jelszót `currentPassword` mezőben (helytelen jelszó esetén `401 PASSWORD_MISMATCH`). Az `oidcDisablePasswordLogin` megtiltja a jelszavas _bejelentkezést_ (`POST /api/auth/login`), de megtartja a tárolt jelszó-hash-t, az újrahitelesítés pedig továbbra is ezzel ellenőrzi a `currentPassword` értéket.
- A `corsOrigins` és a `bruteForceProtection` is szerepel a `SECURITY_IMPACTING_SETTINGS_KEYS` listában: ezek lazítása gyengíti a bejelentkezés védelmét, ezért ugyanazt az újrahitelesítést (`currentPassword`) kérik (a Biztonság fül ezt kéri), a JSON-importálás pedig eldobja őket.
- Minden biztonsági szabálykulcs — a `SECURITY_IMPACTING_SETTINGS_KEYS` bejegyzései, minden `oidc*` kulcs és az irányítópult-munkamenet állapota — **kizárólag operátor** által módosítható a `PATCH /api/settings` végponton: a `manage` hatókörű API-kulcs vagy `oma_` hozzáférési token `403`-at kap akkor is, ha a helyes `currentPassword` értéket küldi, az elutasítás pedig `settings.update_failed` eseményként, `reason: OPERATOR_REQUIRED` okkal kerül naplózásra (`requireOperatorCredential()` a `src/lib/api/operatorCredential.ts` fájlban). A normál beállítások (téma, megjelenítési beállítások) a `manage` kulccsal vagy `admin` hozzáférési tokennel továbbra is írhatók. A `/api/settings` bármely módosítása (és a `/api/settings/require-login`) az `admin` hozzáférési token hatókört igényli (`ADMIN_MUTATION_EXACT_PATHS` a `src/server/authz/accessScopes.ts` fájlban, pontos útvonal-egyezéssel); a `GET` a `read` hatókört igényli, a többi `/api/settings/*` alútvonal (proxyk, combo-alapértelmezések, modell-aliasok, tömörítés, tisztítások…) pedig a metódusból következtetett `write` hatókört tartja meg.
- A `POST /api/settings/import-json` kihagyja ezt az újrahitelesítést, ezért az íráskor eldobja az `IMPORT_STRIPPED_SETTINGS_KEYS` listában szereplő kulcsokat (ugyanabban a fájlban): a jelszót és a `currentPassword` mezőt, minden `SECURITY_IMPACTING_SETTINGS_KEYS` bejegyzést, valamint az irányítópult-munkamenet állapotát (`sessionsValidAfter`, `revokedDashboardSessions`). Egy régebbi mentés importálása ezért nem támaszthat fel olyan munkamenetet, amelyet jelszócsere vagy kijelentkezés már lezárt.

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
