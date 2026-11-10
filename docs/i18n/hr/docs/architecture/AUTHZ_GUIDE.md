# Authorization Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Izvor istine:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Zadnje ažurirano:** 2026-09-22 — prostori naziva opsega upućuju na MCP-SERVER.md

OmniRoute ima autorizacijski cjevovod svjestan ruta koji štiti svaki API zahtjev. Klasifikacija je **deterministička** i **zatvorena u slučaju kvara** — sve što se ne može klasificirati završava kao `MANAGEMENT` i zahtijeva sesiju ili token upravljačke razine. Ova stranica objašnjava model za inženjere koji održavaju rute ili dizajniraju nove krajnje točke.

![AuthZ cjevovod (3 klase ruta + evaluacija politike)](../diagrams/exported/authz-pipeline.svg)

> Izvor: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva načina autentikacije

### 1. API ključ (Bearer)

Koristi se za klijentske API-je kompatibilne s OpenAI/Anthropic/Gemini API-jima i nekoliko ruta za upravljanje kada ključ ima opseg `manage`.

```
Authorization: Bearer <api-key>
```

Provjerava ga `isValidApiKey()` / `extractApiKey()` u `src/sse/services/auth.ts`, a ponovno se izvozi kroz `src/shared/utils/apiAuth.ts`. Validacija također prihvaća varijable okruženja `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kao trajne ključeve za prosljeđivanje (problem #1350).

### 2. Sesija nadzorne ploče (kolačić auth_token)

Za stranice nadzorne ploče i administratorske operacije.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kolačić je sesija samo kada JWT prođe provjeru **i** sadrži `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Svaki
potrošač kolačića (čuvar rute nadzorne ploče (`isDashboardSessionAuthenticated()`), osvježavanje u autorizacijskom cjevovodu, WebSocket rukovanje, aktivni
poslužitelj, `/api/settings/require-login`, `/api/auth/status`) prolazi kroz taj pomoćni mehanizam.
Postoje i drugi JWT-ovi potpisani pomoću `JWT_SECRET` — Cursor CLI za prosljeđivanje izdaje
tokene s `iss "omniroute" / aud "cursor-cli"` za korisnike ključeva — i oni nikada nisu sesije
(#13298).

Provjerava ga `isDashboardSessionAuthenticated()` u `src/shared/utils/apiAuth.ts`. Cjevovod automatski osvježava JWT kada mu preostaje manje od 7 dana u njegovom 30-dnevnom trajanju.

Sesija također može završiti prije isteka 30 dana jer svako izdavanje prolazi kroz `mintDashboardSessionToken` (vrijeme izdavanja `iat` i ID `jti`), a provjera primjenjuje dvije postavke: `sessionsValidAfter`, koju postavlja promjena lozinke pa se zbog nje više ne provjerava nijedna sesija izdana prije tog trenutka (preglednik u kojem je lozinka promijenjena dobiva novi kolačić), i `revokedDashboardSessions`, u koji `POST /api/auth/logout` dodaje `jti` odjavljene sesije. Sesije izdane starijim izdanjem ne sadrže nijednu od tih tvrdnji i ostaju važeće do prve promjene lozinke. Ako se postavke ne mogu pročitati, sesiji se ne vjeruje.

Neke rute za upravljanje prihvaćaju **bilo koji** način: kolačić ILI `Bearer <key>` kada API ključ ima opseg `manage` (ili `admin`). To omogućuje tijek rada „podesivo putem API poziva” uveden u v3.8.

#### Neobavezna prijavna prepreka OIDC-a (#6973)

Prijava administratora nadzorne ploče također podržava **opt-in** OIDC (OpenID Connect) tijek
uz zadanu prijavu lozinkom — prijava lozinkom nikada se ne uklanja, već se samo
nadopunjuje:

- Onemogućeno je osim ako je `settings.oidcEnabled === true` **i** ako su konfigurirani svi parametri `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` (Postavke → Autentikacija).
  `GET /api/auth/oidc/login` u suprotnom vraća `400`.
- `GET /api/auth/oidc/login` dohvaća `authorization_endpoint` iz
  `/.well-known/openid-configuration` izdavatelja (vraća se na
  `<issuer>/authorize` ako dohvaćanje ne uspije), sastavlja URI za preusmjeravanje iz dolaznog zahtjeva
  (uz podršku za `x-forwarded-proto`) i preusmjerava na IdP s nasumičnim `state`
  spremljenim u kolačić `oidc_state` s oznakom `httpOnly`.
- `GET /api/auth/oidc/callback` provjerava `state`, razmjenjuje autorizacijski
  kôd i provjerava potpis ID tokena putem JWKS-a izdavatelja
  (`createRemoteJWKSet` iz `jose`, predmemorirano po URI-ju JWKS-a), uz provjere
  `issuer`/`audience`. Pristup nadzornoj ploči zahtijeva neprazan popis
  `oidcAllowedSubjects`, pravilo `oidcAdmissionClaim` ili oboje. Popis subjekata
  uspoređuje `sub` ili `email` samo kada je `email_verified === true`. Neobavezno
  pravilo za pristup koristi putanju do zahtjeva ID tokena razdvojenu točkama
  (na primjer, `realm_access.roles`) i polje prihvaćenih vrijednosti; razriješeni
  zahtjev mora biti polje nizova i sadržavati barem jednu prihvaćenu vrijednost.
  Ako su konfigurirana oba pravila, oba moraju proći. Nedostajući ili neispravno
  oblikovani zahtjevi podrazumijevano odbijaju pristup, a bez ijednog pravila
  povratni poziv odbija prijavu (`not_configured`). Postojeće konfiguracije koje
  koriste samo subjekte nastavljaju raditi nepromijenjeno.
- Keycloak uobičajeno preslikava uloge realm-a u pristupne tokene, a ne nužno u
  ID tokene. Da biste zahtijevali ulogu realm-a `admin`, konfigurirajte
  protokolni mapper za ovaj klijent tako da uključuje `realm_access.roles` u
  njegov **ID token**, a zatim postavite `oidcAdmissionClaim` na
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Prije omogućivanja pristupa isključivo na temelju uloge provjerite stvarni
  zahtjev ID tokena za ovaj klijent; aplikacija ne čita uloge iz pristupnog
  tokena. Odbijanje tokena na strani IdP-a može dopuniti ovu provjeru, ali je ne
  može zamijeniti.
- U slučaju uspjeha izdaje se **potpuno isti** 30-dnevni JWT
  `auth_token` koji izdaje prijava lozinkom (`src/app/api/auth/login/route.ts`),
  pa ostatak cjevovoda sesije nadzorne ploče (automatsko osvježavanje, oznake
  kolačića) ostaje nepromijenjen — OIDC samo zamjenjuje način izdavanja
  kolačića, a ne ono što on omogućuje. Promjene uloga/grupa na IdP-u ne
  poništavaju postojeće sesije OmniRoute; odjava, promjena lozinke ili istek
  sesije i dalje određuju njihovo trajanje.
- Svaka postavka `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) nalazi se u
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  vraća `400 PASSWORD_REQUIRED` osim ako tijelo zahtjeva sadrži administratorsku
  lozinku kao `currentPassword` (`401 PASSWORD_MISMATCH` kada nije ispravna).
  `oidcDisablePasswordLogin` odbija prijavu lozinkom (`POST /api/auth/login`),
  ali zadržava spremljeni hash lozinke, a ponovna autentikacija i dalje provjerava
  `currentPassword` u odnosu na njega.
- `corsOrigins` i `bruteForceProtection` također se nalaze u
  `SECURITY_IMPACTING_SETTINGS_KEYS`: popuštanje bilo koje od tih postavki slabi
  obranu prijave, pa zahtijevaju istu ponovnu autentikaciju pomoću
  `currentPassword` (kartica Sigurnost traži tu vrijednost), a JSON uvoz ih
  uklanja.
- Svaki ključ sigurnosnih pravila — unosi u `SECURITY_IMPACTING_SETTINGS_KEYS`,
  svaki ključ `oidc*` i stanje sesije nadzorne ploče — na
  `PATCH /api/settings` dopušten je **samo operatoru**: API ključ s opsegom
  upravljanja ili pristupni token `oma_` odbija se s `403` čak i kada šalje
  ispravan `currentPassword`, a odbijanje se bilježi kao
  `settings.update_failed` s `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` u `src/lib/api/operatorCredential.ts`).
  Uobičajene postavke (tema, postavke prikaza) i dalje se mogu mijenjati pomoću
  ključa `manage` ili pristupnog tokena `admin`. Svaka mutacija samog
  `/api/settings` (kao i `/api/settings/require-login`) također zahtijeva opseg
  pristupnog tokena `admin` (`ADMIN_MUTATION_EXACT_PATHS` u
  `src/server/authz/accessScopes.ts`, podudaranje točne putanje); `GET` i dalje
  ostaje `read`, a ostale pod-rute `/api/settings/*` (proxyji, zadane
  kombinacije, aliasi modela, kompresija, čišćenja…) zadržavaju opseg `write`,
  određen metodom.
- `POST /api/settings/import-json` preskače tu ponovnu autentikaciju, pa prije
  zapisivanja uklanja svaki ključ iz `IMPORT_STRIPPED_SETTINGS_KEYS` (u istoj
  datoteci): lozinku i `currentPassword`, svaki unos iz
  `SECURITY_IMPACTING_SETTINGS_KEYS` te stanje sesije nadzorne ploče
  (`sessionsValidAfter`, `revokedDashboardSessions`).
  Uvoz starije sigurnosne kopije stoga ne može ponovno aktivirati sesiju koju su
  promjena lozinke ili odjava već završile.

#### Neobavezna TOTP dvofaktorska prijava (#16619)

Aktivira se u Postavke → Sigurnost; isključena je dok je operator ne uključi
(`src/server/auth/dashboardMfa.ts`).

- **Što obuhvaća:** prijavu lozinkom (`POST /api/auth/login`, koja zatim zahtijeva
  `POST /api/auth/mfa/verify`) i `omniroute connect` (`POST /api/cli/connect`,
  koji odbija razmjenu samo s lozinkom i prihvaća kôd kao `totp`).
- **Što ne obuhvaća:** prijava putem OIDC-ja / SSO-a (`/api/auth/oidc/callback`) ne
  traži OmniRoute TOTP. Oslanja se na vlastiti drugi faktor davatelja identiteta,
  stoga nametnite MFA u IdP-u ako je OIDC omogućen.
- **Oporavak** (izgubljeni uređaj, nema preostalih kodova za oporavak ili faktor
  koji se više ne može provjeriti, primjerice nakon promjene
  `STORAGE_ENCRYPTION_KEY`):
  1. Ponovno pokrenite poslužitelj s `OMNIROUTE_DISABLE_MFA=true`.
  2. Na samom hostu (loopback peer i loopback `Host`, kao što je
     `http://localhost:20128`) prijavite se lozinkom. Drugi se faktor preskače
     samo za to izvorište; svako drugo izvorište i dalje zahtijeva kôd.
  3. U Postavke → Sigurnost → Onemogući unesite lozinku i ostavite kôd prazan. `POST /api/auth/mfa/disable` prihvaća tijelo bez `code` samo dok je
     varijabla postavljena i zahtjev dolazi s hosta; i dalje zahtijeva sesiju
     nadzorne ploče i trenutačnu lozinku te se bilježi u revizijski zapis kao
     `auth.mfa.disabled` s `secondFactor: "recovery_switch"`.
  4. Uklonite `OMNIROUTE_DISABLE_MFA`, ponovno pokrenite poslužitelj i po potrebi
     ponovno registrirajte faktor.

## Klase rute

`src/server/authz/types.ts` definira tri klase; svaka ruta koja se ne može deterministički klasificirati vraća se na `MANAGEMENT`.

| Klasa        | Opis                                                                                                                                                             | Potrebna je autorizacija                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `PUBLIC`     | Eksplicitno sigurne rute — prijava, odjava, status, zdravlje, onboarding bootstrap.                                                                              | Nijedan                                                                          |
| `CLIENT_API` | Krajnje točke za posluživanje modela — `/api/v1/*`, `/api/v1beta/*`, plus aliasi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ključ nositelja kada je omogućena zastavica efektivne `REQUIRE_API_KEY` značajke |
| `MANAGEMENT` | Stranice nadzorne ploče, postavke, pružatelji usluga, ključevi, krajnje točke administratora i dijagnostike.                                                     | Sesija nadzorne ploče OR nositelj s opsegom `manage`                             |

Nekoliko `MANAGEMENT` akcija je** samo za operatera** : ključ `manage` nije dovoljan. Izvoz pohranjenih vjerodajnica (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), vraćanje sigurnosne kopije preko živih podataka (`POST /api/db-backups/import` uključujući `dryRun=true`, `POST /api/db-backups` vraćanje po id-u, `POST /api/settings/import-json`), uništavanje točaka vraćanja (`DELETE /api/db-backups` čišćenje i `PATCH /api/db-backups` jer njihovo zadržavanje pokreće automatsko odstranjivanje nakon svake sigurnosne kopije) zahtijevaju sesiju nadzorne ploče, lokalni CLI predmet ili onemogućenu prijavu. Izdavanje tokena za sinkronizaciju (`POST /api/sync/tokens`) i kovanje CLI `admin` za pristup (`POST /api/cli/tokens`) zahtijevaju sesiju nadzorne ploče ili lokalni subjekt CLI u svakom načinu prijave. API ključevi bilo kojeg opsega i `oma_` pristupni tokeni nisu vjerodajnice operatera: dobivaju `403` kad god je potreban. Ček živi u `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Mijenjanje postavki za prijavu također je samo za operatera: `POST /api/settings/require-login` (postavite lozinku za upravljanje / prebacite `requireLogin`) prihvaća samo one vjerodajnice nakon što lozinka postoji — prvi pokretački prozor za pokretanje (još nema lozinke) je nepromijenjen — i sesija nadzorne ploče mora poslati `currentPassword` da zamijeni lozinku (`403` ako nedostaje ili je pogrešna, pregledava se kao `settings.update_failed`). Lokalni CLI i instanca s onemogućenom prijavom zadržavaju stazu oporavka i mogu postaviti lozinku bez nje, budući da su oboje vezani za glavno računalo koje posjeduje podatkovni direktorij.

## Cjevovod

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

Pouzdana interna zaglavlja (definirana u `src/server/authz/headers.ts`) su** uklonjeni iz dolaznih zahtjeva** prije klasifikacije — klijenti ne mogu unaprijed popuniti `x-omniroute-auth-*` za oponašanje subjekta.

### Ugovori o policama

Svaka klasa rute ima politiku u `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — uvijek vraća `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izvlači nositelja, potvrđuje putem `validateApiKey()`. Pada u anonimno samo kada je zastavica značajke efektivne `REQUIRE_API_KEY` onemogućena. Efektivna zastavica se rješava kroz `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) tako da Zastavice značajki nadzorne ploče i varijable okoline dosljedno upravljaju `/api/v1/*`, `/api/v1beta/*` i aliasima; kvarovi razrješitelja fail close. Omogućuje zahtjeve sesije nadzorne ploče na API rutama klijenta (uključujući `/api/v1/models`, koji koristi katalog modela nadzorne ploče). Kada je Entra ID SSO omogućen, Nositeljem koji je strukturno Entra token (tri base64url segmenta, `RS*` alg, `kid`) rukuje SSO grana** prije** `validateApiKey()` i njegova presuda je konačna — nikada ne prolazi kroz stazu API-ključa ili degrade-to-anonimous granu, tako da ispad pružatelja identiteta ne može postati otvoreni pristup. Statički API ključevi nisu pogođeni. Pogledajte [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — prihvaća sesiju nadzorne ploče, interne zahtjeve za sinkronizaciju modela (podudarne sa `/api/providers/[name]/(sync-models|models)`) ili potpuno preskače ako `isAuthRequired()` vrati false. Vraća 403 (`AUTH_001`) kada je token nositelja prisutan, ali nije valjan, 401 u suprotnom. Također provodi razine zaštite rute (LOCAL_ONLY / ALWAYS_PROTECTED) prije bilo koje grane autentifikacije — pogledajte [razine zaštite rute](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY stazama u `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (danas: `/api/mcp/`) može se pristupiti bez povratne petlje kada nositeljski ključ nosi `manage` opseg; sve ostale LOCAL_ONLY staze ostaju strict-loopback bez obzira na opseg.

Uspješna politika vraća `AuthSubject` sa `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Nizvodni rukovatelji mogu ga pročitati putem `assertAuth(request, "CLIENT_API")` u `src/server/authz/assertAuth.ts` umjesto ponovnog pokretanja logike autentifikacije.

## Popis javnih ruta

`src/shared/constants/publicApiRoutes.ts` je eksplicitna lista dopuštenih:

Popis je podijeljen prema** oblik** , a razdvajanje je nosivo (GHSA-74g9-q8f6-793h): prefiks se podudara sa `startsWith()`, tako da također odgovara svakoj susjednoj stazi koja dijeli svoje vodeće znakove. `/api/usage/om-usage` kao prefiks označen `/api/usage/om-usage<anything>` PUBLIC, a Next to rješava u `/api/usage/[connectionId]` — rukovatelja bez vlastite autentifikacije.

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

Rute samo za čitanje su javne** samo** za sigurne metode. Napomena: `classifyRoute()` isključuje `/api/v1/*` i `/api/v1beta/*` iz PUBLIC padajućih — koji su uvijek `CLIENT_API` tako da se pravilo ključa nositelja i dalje primjenjuje.

## Dodavanje nove rute

### Obrazac 1 — Javni API krajnji endpoint za klijente (Bearer autentifikacija)

Rute unutar `/api/v1/` i `/api/v1beta/` automatski se klasificiraju kao `CLIENT_API`. Middleware provodi provjeru Bearer vjerodajnice; rukovatelji rutama ne moraju je ponavljati, ali mogu pročitati subjekt ako im je to korisno.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika rukovatelja
}
```

### Obrazac 2 — Upravljački endpoint (sesija ili Bearer + manage)

Upotrijebite `requireManagementAuth()` iz `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika rukovatelja
}
```

`requireManagementAuth()` pri uspjehu vraća `null`, a pri pogrešci JSON `Response`:

- 401 `AUTH_001` "Potrebna je autentifikacija" — vjerodajnice uopće nisu navedene
- 403 — nevažeći Bearer **ili** je Bearer naveden, ali ključ nema opseg `manage` / `admin`

`hasManageScope(scopes)` vraća true za `"manage"` ili `"admin"`.

### Obrazac 3 — Dodavanje na javni popis dopuštenih ruta

Odaberite skup prema obliku, a ne prema praktičnosti. Jedna ruta ide u `PUBLIC_API_ROUTES_EXACT` (ili u `PUBLIC_READONLY_CORS_API_ROUTES` ako je namijenjena samo za GET); samo stvarno podstablo ide u `PUBLIC_API_ROUTE_PREFIXES` i ono **mora završavati znakom `/`**. Dodavanje pojedinačne rute na popis prefiksa također objavljuje svaku susjednu putanju koja dijeli njezine početne znakove — uključujući srodne rute s dinamičkim segmentima dodane kasnije (GHSA-74g9-q8f6-793h). Ažurirajte jedinične testove u `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` i `tests/unit/authz/classify.test.ts`.

## Opsezi

Tri imenska prostora. Svaki provjerivač čita samo vlastite nizove. Usporedba,
uključujući zašto `manage` ne uspijeva `scopeMatches` za `read:compression` i zašto
pristupni token `read` ne može `PATCH /api/keys/{id}`, nalazi se u
[Tri imenska prostora opsega](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API ključevi sadrže `scopes` niz (pohranjen kao JSON u `api_keys.scopes`, pogledajte `src/lib/db/apiKeys.ts`).

### Upravljački opseg

- `manage` / `admin` — `hasManageScope`. Nositeljski pristup rutama upravljačkog API-ja.
- `mcp:connect`, `self:usage`, `self:account-quota` i
  `policy:bypass-provider-quota` su aditivni opsezi s točnim podudaranjem. Nalaze se
  izvan `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` otvara samo
  `/api/mcp/` izuzetak koji nije povratna veza.

### Opsezi MCP alata

Katalog i pravila podudaranja (identičan niz znakova, ili dodijeljeni opseg koji završava s `*`):
[Opsezi MCP alata](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` u `src/shared/constants/mcpScopes.ts` je izvorni tipizirani
podskup, a ne taj potpuni katalog. Provedba se izvršava u
`open-sse/mcp-server/scopeEnforcement.ts` nakon što `resolveCallerScopeContext()`
razriješi opsege iz MCP informacija o autentifikaciji, metapodataka zahtjeva ili
`OMNIROUTE_MCP_SCOPES`. Ostaje isključena osim ako `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Opsezi pristupnog tokena

`read` / `write` / `admin` na `oma_live_…` tokenima, rangirani prema `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Ovaj rang se primjenjuje samo na
vjerodajnicu pristupnog tokena. Pogledajte [Upravljačka autentifikacija](../guides/MANAGEMENT-AUTH.md).

## Prekidač za autentifikaciju

`isAuthRequired()` u `src/shared/utils/apiAuth.ts` odlučuje hoće li** bilo koji** autorizacija se provodi za zahtjev:

- `settings.requireLogin === false` → auth je globalno onemogućen, osim za uvijek zaštićenu razinu (pogledajte [Razine čuvara rute](../security/ROUTE_GUARD_TIERS.md) ) i pozive koji izdaju vjerodajnicu koju prihvaća, a koji trebaju istu vjerodajnicu kao i kod prijave: izdavanje tokena za sinkronizaciju, kovanje tokena za pristup CLI u bilo kojem opsegu i stvaranje API ključa s opsegom `manage`/`admin`, dodjeljivanje tog opsega ključu ili regeneriranje ili otkrivanje takvog ključa (`requireCredentialForManagementScopedKey()` u `src/lib/api/requireManagementAuth.ts`). Tipke samo za zaključivanje ostaju otvorene. Pisanje oznake zaštićene značajke (`REQUIRE_API_KEY`, druge sigurnosne oznake i oznake SSRF / TLS / MCP-scope / sandbox oznake navedene u [Oznakama značajki](../reference/FEATURE_FLAGS.md#rest-api) ) i spremanje postavki maskiranja PII (`PUT /api/settings/pii`) također zahtijevaju vjerodajnice.
- Lozinka nije konfigurirana** i** no `INITIAL_PASSWORD` env var → početni način rada dopušta čarobnjaka za uključivanje i povratne zahtjeve, ali izloženi mrežni zahtjevi i dalje trebaju vjerodajnice. Iznimka: pisanje oznake zaštićene značajke i spremanje postavki PII maskiranja (`PUT /api/settings/pii`) trebaju vjerodajnicu čak i iz povratne petlje, tako da povratna petlja sama po sebi nije dovoljna.
- Svaka DB pogreška → se ne zatvara (sigurno po zadanim postavkama).

Provedba API ključa klijenta koristi `isRequireApiKeyEnabled()` u `src/shared/utils/featureFlags.ts`, a ne izravno čitanje `process.env.REQUIRE_API_KEY`. Ovo je važno za implementirane instance: prebacivanje `REQUIRE_API_KEY` na Nadzornoj ploči → Feature Flags pohranjuje nadjačavanje DB i odmah utječe `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` i druge provjere autentifikacije klijentskog API-ja koje dijele ovaj pomoćnik. Ako se pohrana oznake značajke ne može pročitati, API autentifikacija klijenta nije uspjela zatvoriti i zahtijeva ključ.

## Nekompatibilna promjena — v3.8.0

Krajnje točke `/api/v1/agents/tasks/*` i `/api/resilience/model-cooldowns` **sada zahtijevaju autentifikaciju za upravljanje** (commit `588a0333`). Klijenti koji su prethodno slali običan API ključ bez opsega `manage` primaju `403`. Migracija: ključu dodijelite opseg `manage` na nadzornoj ploči API ključeva ili upotrijebite prijavljenu sesiju nadzorne ploče.

## Promjena ponašanja — v3.8.2

`/api/mcp/*` (udaljeni MCP poslužitelj) i dalje je prema zadanim postavkama LOCAL_ONLY, ali sada prihvaća zahtjeve koji ne dolaze s povratne petlje kada zaglavlje `Authorization: Bearer <api-key>` sadrži opseg `manage`. Iznimka se izričito omogućuje za svaku putanju putem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` u `src/server/authz/routeGuard.ts`; srodni prefiks LOCAL_ONLY `/api/cli-tools/runtime/*` namjerno se ne može zaobići jer može pokrenuti proizvoljne potprocese. Anonimni zahtjevi prema `/api/mcp/*` koji ne dolaze s povratne petlje i dalje vraćaju `403 LOCAL_ONLY` — zadano ponašanje za svaku novu putanju LOCAL_ONLY ostaje strogo ograničeno na povratnu petlju. Pogledajte [Razine zaštite ruta](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testiranje

- Jedinični testovi: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javni popis dopuštenih ruta: `tests/unit/public-api-routes.test.ts`.
- Pokretanje ciljanog testa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Otklanjanje pogrešaka

Cjevovod uvijek označava odgovore sa:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Za autentificirane zahtjeve uzvodna (na strani rukovatelja) zaglavlja zahtjeva također uključuju:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Koristite `assertAuth(req, expectedClass)` unutar rukovatelja — koji izbacuje `AuthzAssertionError` s kodom `AUTHZ_NOT_INITIALIZED` ako je međuprogram zaobiđen (korisno za hvatanje konfiguracijskih regresija u testovima).

## Vidi također

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka autorizacije po krajnjoj točki
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revizijski zapisnik za događaje autorizacije
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tri imenska prostora opsega i MCP katalog opsega alata
- Izvor: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
