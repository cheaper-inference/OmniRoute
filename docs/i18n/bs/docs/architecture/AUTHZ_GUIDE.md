# Authorization Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Izvor istine:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Posljednje ažuriranje:** 2026-09-22 — prostori imena opsega upućuju na MCP-SERVER.md

OmniRoute ima sistem autorizacije svjestan ruta koji štiti svaki API zahtjev. Klasifikacija je **deterministička** i **zatvorena u slučaju greške** — sve što se ne može klasificirati završava kao `MANAGEMENT` i zahtijeva sesiju ili token upravljačkog nivoa. Ova stranica objašnjava model inženjerima koji održavaju rute ili dizajniraju nove krajnje tačke.

![Sistem AuthZ-a (3 klase ruta + procjena pravila)](../diagrams/exported/authz-pipeline.svg)

> Izvor: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva načina autentifikacije

### 1. API ključ (Bearer)

Koristi se za klijentske API-je kompatibilne s OpenAI/Anthropic/Gemini i nekoliko ruta za upravljanje kada ključ ima opseg `manage`.

```
Authorization: Bearer <api-key>
```

Provjerava ga `isValidApiKey()` / `extractApiKey()` u `src/sse/services/auth.ts`, a ponovo se izvozi kroz `src/shared/utils/apiAuth.ts`. Validator također prihvata varijable okruženja `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kao trajne ključeve za prosljeđivanje (issue #1350).

### 2. Sesija nadzorne ploče (kolačić auth_token)

Za stranice nadzorne ploče i administratorske operacije.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kolačić predstavlja sesiju samo kada JWT prođe provjeru **i** sadrži `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Svaki
potrošač kolačića (zaštita rute nadzorne ploče (`isDashboardSessionAuthenticated()`), osvježavanje authz cjevovoda, WebSocket rukovanje, live
server, `/api/settings/require-login`, `/api/auth/status`) prolazi kroz taj pomoćni alat.
Postoje i drugi JWT-ovi potpisani pomoću `JWT_SECRET` — Cursor CLI passthrough izdaje
tokene `iss "omniroute" / aud "cursor-cli"` za vlasnike ključeva — i oni nikada nisu sesije
(#13298).

Provjerava ga `isDashboardSessionAuthenticated()` u `src/shared/utils/apiAuth.ts`. Cjevovod automatski osvježava JWT kada mu preostaje manje od 7 dana u okviru njegovog životnog vijeka od 30 dana.

Sesija se također može završiti prije isteka tih 30 dana, jer svaki izdavač prolazi kroz `mintDashboardSessionToken` (vrijeme izdavanja `iat` i identifikator `jti`), a verifikator provjerava dvije postavke: `sessionsValidAfter`, koju postavlja promjena lozinke tako da svaka sesija izdana prije nje prestaje prolaziti provjeru (preglednik koji je promijenio lozinku dobija novi kolačić), i `revokedDashboardSessions`, u koju `POST /api/auth/logout` dodaje `jti` odjavljene sesije. Sesije izdane starijom verzijom nemaju nijednu od tih tvrdnji i ostaju važeće do prve promjene lozinke. Ako se postavke ne mogu pročitati, sesija se ne smatra pouzdanom.

Neke rute za upravljanje prihvataju **bilo koji** način: kolačić ILI `Bearer <key>` kada API ključ ima opseg `manage` (ili `admin`). To omogućava radni tok „konfigurabilno putem API poziva“ uveden u v3.8.

#### Opcionalna OIDC prijavna kontrola (#6973)

Prijava administratora na nadzornoj ploči također podržava **opt-in** OIDC (OpenID Connect) tok
uz zadanu prijavu lozinkom — prijava lozinkom se nikada ne uklanja, već se samo
dopunjuje:

- Onemogućeno osim ako je `settings.oidcEnabled === true` **i** ako su `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` sve podešene (Postavke → Autentikacija).
  `GET /api/auth/oidc/login` u suprotnom vraća `400`.
- `GET /api/auth/oidc/login` pronalazi `authorization_endpoint` iz `/.well-known/openid-configuration` izdavaoca (vraća se na `<issuer>/authorize` ako to nije moguće), sastavlja URI za preusmjeravanje iz dolaznog zahtjeva (uz podršku za `x-forwarded-proto`) i preusmjerava na IdP s nasumičnim `state` parametrom pohranjenim u `httpOnly` kolačiću `oidc_state`.
- `GET /api/auth/oidc/callback` provjerava `state`, razmjenjuje autorizacijski kod i provjerava potpis ID tokena putem JWKS-a izdavaoca (`createRemoteJWKSet` iz `jose`, keširanog po JWKS URI-ju), uz provjere `issuer`/`audience`. Pristup kontrolnoj tabli zahtijeva nepraznu listu `oidcAllowedSubjects`, politiku `oidcAdmissionClaim` ili oboje. Lista subjekata podudara `sub` ili `email` samo kada je `email_verified === true`. Opcionalna politika zahtjeva prima putanju do zahtjeva ID tokena odvojenu tačkama (na primjer, `realm_access.roles`) i niz prihvaćenih vrijednosti; razriješeni zahtjev mora biti niz stringova koji sadrži najmanje jednu prihvaćenu vrijednost. Ako su obje politike podešene, obje moraju proći. Nedostajući ili neispravno oblikovani zahtjevi podrazumijevano se odbijaju, a bez ijedne politike povratni poziv odbija prijavu (`not_configured`). Postojeće konfiguracije koje koriste samo subjekt nastavljaju raditi nepromijenjeno.
- Keycloak obično mapira uloge domena u pristupne tokene, ne nužno u ID tokene. Da biste zahtijevali ulogu domena `admin`, konfigurišite protokolni mapper za ovog klijenta koji uključuje `realm_access.roles` u njegov **ID token**, a zatim postavite `oidcAdmissionClaim` na `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Provjerite stvarni zahtjev ID tokena za ovog klijenta prije nego što omogućite pristup samo na osnovu uloge; aplikacija ne čita uloge iz pristupnog tokena. Odbijanje tokena na strani IdP-a može biti dodatna provjera, ali ne zamjenjuje ovu provjeru na strani aplikacije.
- Nakon uspjeha izdaje **potpuno isti** JWT `auth_token` važeći 30 dana koji izdaje prijava lozinkom (`src/app/api/auth/login/route.ts`), tako da ostatak toka sesije kontrolne table (automatsko osvježavanje, zastavice kolačića) ostaje nepromijenjen — OIDC samo zamjenjuje način izdavanja kolačića, a ne ono što on omogućava. Promjene ulogâ/grupa na IdP-u ne poništavaju postojeće OmniRoute sesije; odjava, promjena lozinke ili istek sesije i dalje određuju njihovo trajanje.
- Svaka postavka `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) nalazi se u `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  vraća `400 PASSWORD_REQUIRED` osim ako tijelo zahtjeva sadrži administratorsku
  lozinku kao `currentPassword` (`401 PASSWORD_MISMATCH` kada je netačna).
  `oidcDisablePasswordLogin` odbija prijavu lozinkom (`POST /api/auth/login`),
  ali zadržava pohranjeni hash lozinke, a ponovna autentikacija i dalje provjerava
  `currentPassword` u odnosu na njega.
- `corsOrigins` i `bruteForceProtection` su takođe u `SECURITY_IMPACTING_SETTINGS_KEYS`:
  popuštanje bilo koje od njih slabi zaštitu prijave, pa zahtijevaju istu ponovnu
  autentikaciju pomoću `currentPassword` (kartica Sigurnost to traži), a JSON uvoz ih
  uklanja.
- Svaki ključ sigurnosne politike — unosi u `SECURITY_IMPACTING_SETTINGS_KEYS`,
  svaki ključ `oidc*` i stanje sesije kontrolne table — ima status **samo za operatera**
  na `PATCH /api/settings`: API ključ s opsegom manage ili pristupni token `oma_` se
  odbija s `403` čak i kada šalje ispravan `currentPassword`, a odbijanje se bilježi
  kao `settings.update_failed` s `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` u `src/lib/api/operatorCredential.ts`).
  Obične postavke (tema, postavke prikaza) i dalje može mijenjati ključ s opsegom
  `manage` ili pristupni token s opsegom `admin`. Svaka izmjena samog `/api/settings`
  (kao i `/api/settings/require-login`) takođe zahtijeva opseg `admin` pristupnog
  tokena (`ADMIN_MUTATION_EXACT_PATHS` u `src/server/authz/accessScopes.ts`, podudaranje
  tačne putanje); `GET` i dalje koristi `read`, a ostale pod-rute `/api/settings/*`
  (proxyji, zadane kombinacije, aliasi modela, kompresija, čišćenja…) zadržavaju opseg
  `write` određen metodom.
- `POST /api/settings/import-json` preskače tu ponovnu autentikaciju, pa prije upisa
  uklanja svaki ključ iz `IMPORT_STRIPPED_SETTINGS_KEYS` (ista datoteka): lozinku i
  `currentPassword`, svaki unos iz `SECURITY_IMPACTING_SETTINGS_KEYS` i stanje sesije
  kontrolne table (`sessionsValidAfter`, `revokedDashboardSessions`).
  Uvoz starije sigurnosne kopije stoga ne može ponovo aktivirati sesiju koju su promjena
  lozinke ili odjava već prekinule.

#### Opcionalna prijava s TOTP dvofaktorskom autentikacijom (#16619)

Postavlja se iz Postavke → Sigurnost; isključeno je dok ga operater ne uključi
(`src/server/auth/dashboardMfa.ts`).

- **Šta obuhvata:** prijavu lozinkom (`POST /api/auth/login`, nakon čega je
  potreban `POST /api/auth/mfa/verify`) i `omniroute connect` (`POST /api/cli/connect`,
  koji odbija razmjenu samo lozinkom i prihvata kôd kao `totp`).
- **Šta ne obuhvata:** OIDC / SSO prijavu (`/api/auth/oidc/callback`) koja ne
  traži OmniRoute TOTP. Oslanja se na vlastiti drugi faktor dobavljača identiteta,
  zato nametnite MFA u IdP-u ako je OIDC omogućen.
- **Oporavak** (izgubljen uređaj, nema preostalih kodova za oporavak ili faktor koji se više
  ne može potvrditi, na primjer nakon promjene `STORAGE_ENCRYPTION_KEY`):
  1. Ponovo pokrenite server sa `OMNIROUTE_DISABLE_MFA=true`.
  2. Na samom hostu (loopback peer i loopback `Host`, kao što je
     `http://localhost:20128`), prijavite se lozinkom. Drugi faktor se preskače
     samo za to porijeklo; svako drugo porijeklo i dalje zahtijeva kôd.
  3. U Postavke → Sigurnost → Onemogući unesite lozinku i ostavite kôd
     prazan. `POST /api/auth/mfa/disable` prihvata tijelo bez `code` samo dok je
     varijabla postavljena i zahtjev dolazi sa hosta; i dalje zahtijeva sesiju
     kontrolne ploče i trenutnu lozinku, a bilježi se u reviziji kao
     `auth.mfa.disabled` sa `secondFactor: "recovery_switch"`.
  4. Uklonite `OMNIROUTE_DISABLE_MFA`, ponovo pokrenite server i ponovo se
     registrujte ako je potrebno.

## Rute Classes

`src/server/authz/types.ts` definira tri klase; svaka ruta koja se ne može klasificirati deterministički se vraća na `MANAGEMENT`.

| Klasa        | Opis                                                                                                                                                           | Potreban je autoritet                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `PUBLIC`     | Eksplicitno sigurne rute — login, logout, status, health, inboarding bootstrap.                                                                                | Nema                                                                           |
| `CLIENT_API` | Krajnje točke koje poslužuju model — `/api/v1/*`, `/api/v1beta/*`, plus aliasi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ključ nosioca kada je omogućena efektivna zastavica `REQUIRE_API_KEY` funkcije |
| `MANAGEMENT` | Stranice nadzorne ploče, postavke, dobavljači, ključevi, administratorske i dijagnostičke krajnje tačke.                                                       | Sesija nadzorne ploče OR Nosilac sa `manage` opsegom                           |

Nekoliko `MANAGEMENT` akcija je** samo za operatera** : `manage` ključ nije dovoljan. Izvoz pohranjenih vjerodajnica (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), vraćanje sigurnosne kopije preko živih podataka (`POST /api/db-backups/import` uključujući `dryRun=true`, `POST /api/db-backups` restauracija po id-u, `POST /api/settings/import-json`), uništavanje tačaka vraćanja (`DELETE /api/db-backups` cleanup i `PATCH /api/db-backups` jer zadržavanje koje traje pokreće automatsko odstranjivanje nakon svake sigurnosne kopije), zahtijevaju sesiju dashql lokalne CLI. Izdavanje tokena za sinhronizaciju (`POST /api/sync/tokens`) i kovanje `admin` CLI pristupnog tokena (`POST /api/cli/tokens`) zahtijevaju sesiju nadzorne ploče ili lokalni CLI subjekt u svakom načinu prijave. API ključevi bilo kojeg opsega i `oma_` pristupni tokeni nisu akreditivi operatera: oni dobijaju `403` kad god je potreban. Provjera živi u `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Promjena postavki za prijavu je također samo za operatera: `POST /api/settings/require-login` (podesite lozinku za upravljanje / uključite `requireLogin`) prihvata samo one vjerodajnice nakon što lozinka postoji — prozor za prvo pokretanje (još nema lozinke) je nepromijenjen — i sesija nadzorne ploče mora poslati `currentPassword` da zamijeni lozinku (`403` kada nedostaje kao `settings.update_failed`, audit). Lokalni CLI i instanca s onemogućenom prijavom zadržavaju putanju za oporavak i mogu postaviti lozinku bez nje, budući da su oba vezana za host koji posjeduje direktorij podataka.

## Pipeline

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Pouzdana interna zaglavlja (definirana u `src/server/authz/headers.ts`) su** skinut sa dolaznih zahtjeva** prije klasifikacije — klijenti ne mogu unaprijed popuniti `x-omniroute-auth-*` da bi oponašali subjekt.

### Politički ugovori

Svaka klasa rute ima politiku u `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — uvijek vraća `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izdvaja nosioca, potvrđuje preko `validateApiKey()`. Prelazi na anonimno samo kada je deaktivirana zastavica `REQUIRE_API_KEY` funkcije onemogućena. Efektivna zastavica se rješava kroz `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) tako da zastavice karakteristika kontrolne table i varijable okruženja dosljedno upravljaju `/api/v1/*`, `/api/v1beta/*` i aliasima; neuspjeh razrješavača zatvoren. Dozvoljava zahtjeve sesije nadzorne ploče na klijentskim API rutama (uključujući `/api/v1/models`, koji koristi katalog modela nadzorne ploče). Kada je Entra ID SSO omogućen, nosilac koji je strukturno Entra token (tri base64url segmenta, `RS*` alg, `kid`) upravlja SSO grana** prije** `validateApiKey()` i njegova presuda je konačna — nikada ne pada na putanju API-ključa ili granu degradiranja u anonimnu, tako da prekid provajdera identiteta ne može postati otvoreni pristup. Statični API ključevi nisu pogođeni. Vidi [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — prihvata sesiju kontrolne table, interne zahteve za sinhronizaciju modela (uparene sa `/api/providers/[name]/(sync-models|models)`) ili u potpunosti preskače ako `isAuthRequired()` vrati netačno. Vraća 403 (`AUTH_001`) kada je token nosioca prisutan, ali nevažeći, 401 u suprotnom. Također provodi nivoe čuvanja rute (LOCAL_ONLY / ALWAYS_PROTECTED) prije bilo koje grane auth — vidi [Slojeve zaštite rute](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY stazama u `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (danas: `/api/mcp/`) može se pristupiti iz bez povratne petlje kada ključ nosioca nosi `manage` opseg; sve ostale LOCAL_ONLY staze ostaju striktne petlje bez obzira na opseg.

Uspješna politika vraća `AuthSubject` sa `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Nizvodni rukovaoci ga mogu pročitati preko `assertAuth(request, "CLIENT_API")` u `src/server/authz/assertAuth.ts` umjesto ponovnog pokretanja auth logike.

## Lista javnih ruta

`src/shared/constants/publicApiRoutes.ts` je eksplicitna lista dozvoljenih:

Lista je podijeljena** oblik** , a podjela je nosiva (GHSA-74g9-q8f6-793h): prefiks se podudara sa `startsWith()`, tako da također odgovara svakoj susjednoj putanji koja dijeli svoje vodeće znakove. `/api/usage/om-usage` kao prefiks označen `/api/usage/om-usage<anything>` PUBLIC, a Next to rješava u `/api/usage/[connectionId]` — rukovatelj bez vlastite auth.

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rute samo za čitanje su javne** samo** za sigurne metode. Napomena: `classifyRoute()` isključuje `/api/v1/*` i `/api/v1beta/*` iz PUBLIC padajućeg — oni su uvijek `CLIENT_API` tako da se politika nosioca ključa i dalje primjenjuje.

## Dodavanje nove rute

### Obrazac 1 — Javni klijentski API krajnja tačka (Bearer-auth)

Rute pod `/api/v1/` i `/api/v1beta/` se automatski klasifikuju kao `CLIENT_API`. Middleware sprovodi Bearer provjeru; rukovaoci ruta ne moraju to ponovo raditi, ali mogu pročitati subjekat ako je korisno.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika rukovaoca
}
```

### Obrazac 2 — Upravljačka krajnja tačka (sesija ili Bearer + manage)

Koristite `requireManagementAuth()` iz `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika rukovaoca
}
```

`requireManagementAuth()` vraća `null` u slučaju uspjeha ili JSON grešku `Response`:

- 401 `AUTH_001` "Authentication required" — uopšte nema akreditiva
- 403 — nevažeći Bearer **ili** Bearer je prisutan, ali ključ nema `manage` / `admin` opseg (scope)

`hasManageScope(scopes)` vraća true za `"manage"` ili `"admin"`.

### Obrazac 3 — Dodavanje na javnu listu dozvoljenih (allowlist)

Odaberite skup prema obliku, a ne prema pogodnosti. Jedna ruta ide u `PUBLIC_API_ROUTES_EXACT` (ili `PUBLIC_READONLY_CORS_API_ROUTES` samo za GET); samo autentično podstablo ide u `PUBLIC_API_ROUTE_PREFIXES`, i ono **mora završavati sa `/`**. Stavljanje pojedinačne rute u listu prefiksa takođe objavljuje svaku susjednu putanju koja dijeli iste početne znakove — uključujući i srodne dinamičke segmente dodate kasnije (GHSA-74g9-q8f6-793h). Ažurirajte jedinične testove u `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` i `tests/unit/authz/classify.test.ts`.

## Opsezi

Tri imenska prostora. Svaki provjerivač čita samo vlastite nizove. Usporedni prikaz,
uključujući zašto `manage` ne zadovoljava `scopeMatches` za `read:compression` i zašto
pristupni token s opsegom `read` ne može izvršiti `PATCH /api/keys/{id}`, nalazi se u
[Tri imenska prostora opsega](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API ključevi sadrže niz `scopes` (pohranjen kao JSON u `api_keys.scopes`, pogledajte `src/lib/db/apiKeys.ts`).

### Opseg upravljanja

- `manage` / `admin` — `hasManageScope`. Bearer pristup rutama upravljačkog API-ja.
- `mcp:connect`, `self:usage`, `self:account-quota` i
  `policy:bypass-provider-quota` su dodatni opsezi s tačnim podudaranjem. Nalaze se
  izvan `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` otvara samo
  izuzetak za `/api/mcp/` koji nije povratna petlja.

### Opsezi MCP alata

Katalog i pravila podudaranja (identičan niz ili dodijeljeni opseg koji završava znakom `*`):
[Opsezi MCP alata](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` u `src/shared/constants/mcpScopes.ts` je izvorni tipizirani
podskup, a ne cijeli katalog. Provođenje se izvršava u
`open-sse/mcp-server/scopeEnforcement.ts` nakon što `resolveCallerScopeContext()`
razriješi opsege iz MCP autentifikacijskih podataka, metapodataka zahtjeva ili `OMNIROUTE_MCP_SCOPES`.
Ostaje isključeno osim ako je `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Opsezi pristupnih tokena

`read` / `write` / `admin` na tokenima `oma_live_…`, rangirani pomoću `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Ovo rangiranje primjenjuje se samo na
vjerodajnicu pristupnog tokena. Pogledajte [Autentifikacija za upravljanje](../guides/MANAGEMENT-AUTH.md).

## Potreban preklop za autentifikaciju

`isAuthRequired()` u `src/shared/utils/apiAuth.ts` odlučuje da li** bilo koji** auth se provodi za zahtjev:

- `settings.requireLogin === false` → auth je globalno onemogućen, osim za uvijek zaštićeni nivo (pogledajte [Slojevi zaštite rute](../security/ROUTE_GUARD_TIERS.md) ) i pozive koji predaju vjerodajnice koje prihvaća, a za koje je potreban isti vjerodajnik kao kod prijave: izdavanje tokena za sinhronizaciju, kovanje CLI pristupnih tokena u bilo kojem opsegu i kreiranje API scope-a za dodjelu `manage`-a za `admin` ključ, ili regeneraciju ili otkrivanje takvog ključa (`requireCredentialForManagementScopedKey()` u `src/lib/api/requireManagementAuth.ts`). Ključevi samo za zaključivanje ostaju otvoreni. Pisanje zaštićene zastavice funkcije (`REQUIRE_API_KEY`, druge sigurnosne zastavice i SSRF / TLS / MCP-scope / sandbox zastavice navedene u [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) ) i spremanje postavki PII maskiranja (`PUT /api/settings/pii`) također zahtijevaju vjerodajnice.
- Lozinka nije konfigurisana** i** no `INITIAL_PASSWORD` env var → režim pokretanja dozvoljava čarobnjaka za uključivanje i zahtjeve za povratnu petlju, ali izloženi mrežni zahtjevi i dalje trebaju vjerodajnice. Izuzetak: pisanje zaštićene zastavice funkcije i spremanje postavki PII maskiranja (`PUT /api/settings/pii`) zahtijevaju vjerodajnicu čak i iz povratne petlje, tako da povratna petlja sama po sebi nije dovoljna.
- Bilo koja DB greška → se ne zatvara (sigurno po zadanom).

Klijentsko provođenje API ključa koristi `isRequireApiKeyEnabled()` u `src/shared/utils/featureFlags.ts`, a ne direktno `process.env.REQUIRE_API_KEY` čitanje. Ovo je važno za raspoređene instance: prebacivanje `REQUIRE_API_KEY` na Dashboard → Feature Flags pohranjuje DB nadjačavanje i odmah utiče na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` i druge provjere klijent-API auth koji dijele ovaj pomoćnik. Ako se skladište zastavica funkcija ne može pročitati, klijent API auth se ne zatvara i zahtijeva ključ.

## Promjena koja prekida kompatibilnost — v3.8.0

Krajnje tačke `/api/v1/agents/tasks/*` i `/api/resilience/model-cooldowns` **sada zahtijevaju upravljačku autorizaciju** (commit `588a0333`). Klijenti koji su prethodno slali normalan API ključ bez `manage` opsega dobijaju `403`. Migracija: ili dodijelite ključu `manage` opseg na kontrolnoj tabli API ključeva, ili koristite prijavljenu sesiju kontrolne table.

## Promjena ponašanja — v3.8.2

`/api/mcp/*` (udaljeni MCP server) je i dalje LOCAL_ONLY po zadanim postavkama, ali sada prihvata non-loopback zahtjeve kada `Authorization: Bearer <api-key>` zaglavlje nosi `manage` opseg. Izuzetak je eksplicitno ograničen po putanji putem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` u `src/server/authz/routeGuard.ts`; sestrinski LOCAL_ONLY prefiks `/api/cli-tools/runtime/*` namjerno NIJE moguće zaobići jer može pokrenuti proizvoljne podprocese. Anonimni zahtjevi prema `/api/mcp/*` sa non-loopback adresa i dalje vraćaju `403 LOCAL_ONLY` — zadana vrijednost za bilo koju novu LOCAL_ONLY putanju ostaje strogi loopback. Pogledajte [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testiranje

- Jedinični testovi: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javna lista dozvoljenih (allowlist): `tests/unit/public-api-routes.test.ts`.
- Pokretanje fokusiranog testa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Otklanjanje grešaka

Cjevovod uvijek označava odgovore sa:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Za provjerene zahtjeve, zaglavlja zahtjeva uzvodno (na strani rukovatelja) također uključuju:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Koristite `assertAuth(req, expectedClass)` unutar rukovaoca — on baca `AuthzAssertionError` sa kodom `AUTHZ_NOT_INITIALIZED` ako je međuverzija zaobiđena (korisno za hvatanje regresije konfiguracije u testovima).

## Pogledajte također

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka autentifikacije po krajnjoj tački
- [COMPLIANCE.md](../security/COMPLIANCE.md) — zapisnik revizije za događaje autentifikacije
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tri prostora imena opsega i MCP katalog opsega alata
- Izvor: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
