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

Koristi se za klijentske API-je kompatibilne sa OpenAI/Anthropic/Gemini i za nekoliko ruta upravljanja kada ključ ima opseg `manage`.

```
Authorization: Bearer <api-key>
```

Provjerava ga `isValidApiKey()` / `extractApiKey()` u `src/sse/services/auth.ts` i ponovo izvozi kroz `src/shared/utils/apiAuth.ts`. Validator također prihvata okolinske varijable `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kao trajne ključeve za prosljeđivanje (issue #1350).

### 2. Sesija kontrolne table (kolačić auth_token)

Za stranice kontrolne table i administrativne operacije.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kolačić je sesija samo ako JWT prođe provjeru **i** sadrži `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Svaki primalac kolačića (čuvar ruta kontrolne table (`isDashboardSessionAuthenticated()`), osvježavanje u authz cjevovodu, WebSocket rukovanje, živi server, `/api/settings/require-login`, `/api/auth/status`) prolazi kroz ovaj pomoćnik. Postoje i drugi JWT-ovi potpisani s `JWT_SECRET` — prosljeđivanje CLI-ja Cursor izdaje vlasnicima ključa tokene `iss "omniroute" / aud "cursor-cli"` — i nikada nisu sesije (#13298).

Provjerava ga `isDashboardSessionAuthenticated()` u `src/shared/utils/apiAuth.ts`. Cjevovod automatski osvježava JWT kada mu preostane manje od 7 dana od njegovog 30-dnevnog vijeka trajanja.

Sesija može završiti prije isteka 30 dana jer svaki izdavalac prolazi kroz `mintDashboardSessionToken` (vrijeme izdavanja `iat` i identifikator `jti`), a provjeravatelj provjerava dvije postavke: `sessionsValidAfter`, koju postavlja promjena lozinke, pa svaka sesija izdana prije nje prestaje važiti (preglednik koji je promijenio lozinku dobija novi kolačić), i `revokedDashboardSessions`, u koji `POST /api/auth/logout` dodaje `jti` odjavljene sesije. Sesije izdane starijom verzijom nemaju nijednu od tih tvrdnji i ostaju važeće do prve promjene lozinke. Ako se postavke ne mogu pročitati, sesija se ne smatra pouzdanom.

Neke rute upravljanja prihvataju **bilo koji** od dva načina: kolačić ILI `Bearer <key>` kada API ključ ima opseg `manage` (ili `admin`). Upravo to omogućava tok rada „konfigurabilno putem API poziva” dodan u v3.8.

#### Opcionalna OIDC prijava (#6973)

Administratorska prijava na kontrolnu tablu podržava i opcionalni OIDC (OpenID Connect) tok uz zadanu prijavu lozinkom — prijava lozinkom se nikada ne uklanja, nego se samo dopunjuje:

- Onemogućeno osim ako su `settings.oidcEnabled === true` **i** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` svi postavljeni (Settings → Auth). `GET /api/auth/oidc/login` u suprotnom vraća `400`.
- `GET /api/auth/oidc/login` otkriva `authorization_endpoint` iz `/.well-known/openid-configuration` izdavaoca (u suprotnom koristi `<issuer>/authorize`), gradi redirect URI iz dolaznog zahtjeva (uzima u obzir `x-forwarded-proto`) i preusmjerava na IdP sa nasumičnim `state` pohranjenim u kolačić `oidc_state` s oznakom `httpOnly`.
- `GET /api/auth/oidc/callback` provjerava `state`, mijenja autorizacijski kod i provjerava potpis ID tokena putem JWKS-a izdavaoca (`createRemoteJWKSet` iz `jose`, keširano po JWKS URI-ju) uz provjeru `issuer`/`audience`. Lista `oidcAllowedSubjects` je obavezna: odgovara tvrdnji `sub` tokena ili tvrdnji `email` — tvrdnja e-pošte uzima se u obzir samo kada je `email_verified === true`, pa neprovjerena e-pošta kod IdP-a nikada ne može proći kroz kapiju — a bez unosa callback odbija svaku prijavu (`not_configured`).
- Po uspjehu izdaje **potpuno isti** 30-dnevni JWT `auth_token` kao i prijava lozinkom (`src/app/api/auth/login/route.ts`), pa ostatak cjevovoda sesije kontrolne table (automatsko osvježavanje, zastavice kolačića) ostaje nepromijenjen — OIDC mijenja samo način izdavanja kolačića, a ne ono što on daje.
- Svaka postavka `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) nalazi se u `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` vraća `400 PASSWORD_REQUIRED` osim ako tijelo zahtjeva ne sadrži lozinku za upravljanje kao `currentPassword` (`401 PASSWORD_MISMATCH` ako je pogrešna). `oidcDisablePasswordLogin` onemogućava _prijavu_ lozinkom (`POST /api/auth/login`), ali zadržava pohranjeni hash lozinke, a ponovna autentifikacija i dalje provjerava `currentPassword` prema njemu.
- `corsOrigins` i `bruteForceProtection` također su u `SECURITY_IMPACTING_SETTINGS_KEYS`: njihovo ublažavanje slabi odbranu prijave, pa zahtijevaju istu ponovnu autentifikaciju `currentPassword` (kartica Security je traži), a uvoz JSON-a ih izostavlja.
- Svaki ključ sigurnosne politike — unosi `SECURITY_IMPACTING_SETTINGS_KEYS`, svaki ključ `oidc*` i stanje sesije kontrolne table — je **samo za operatera** na `PATCH /api/settings`: API ključ s opsegom manage ili `oma_` pristupni token dobija `403`, čak i kada pošalje ispravan `currentPassword`, a odbijanje se bilježi kao `settings.update_failed` s `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` u `src/lib/api/operatorCredential.ts`). Obične postavke (tema, postavke prikaza) ostaju upisive za ključ `manage` ili pristupni token `admin`. Svaka izmjena samog `/api/settings` (kao i `/api/settings/require-login`) također zahtijeva opseg pristupnog tokena `admin` (`ADMIN_MUTATION_EXACT_PATHS` u `src/server/authz/accessScopes.ts`, tačno podudaranje putanje); `GET` ostaje `read`, a ostale podrute `/api/settings/*` (proxyji, zadane postavke combo, aliasi modela, kompresija, čišćenja…) zadržavaju opseg `write` izveden iz metode.
- `POST /api/settings/import-json` preskače tu ponovnu autentifikaciju, pa prije upisa uklanja svaki ključ iz `IMPORT_STRIPPED_SETTINGS_KEYS` (ista datoteka): lozinku i `currentPassword`, svaki unos `SECURITY_IMPACTING_SETTINGS_KEYS` te stanje sesije kontrolne table (`sessionsValidAfter`, `revokedDashboardSessions`). Uvoz starije sigurnosne kopije tako ne može oživjeti sesiju koju je završila promjena lozinke ili odjava.

## Klase ruta

`src/server/authz/types.ts` definiše tri klase; svaka ruta koju nije moguće deterministički klasifikovati pada na `MANAGEMENT`.

| Klasa        | Opis                                                                                                                                                          | Potrebna autentifikacija                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `PUBLIC`     | Izričito sigurne rute — prijava, odjava, status, inicijalizacija, health, bootstrap uvođenja.                                                                 | Nema                                                              |
| `CLIENT_API` | Krajnje tačke za posluživanje modela — `/api/v1/*`, `/api/v1beta/*` te aliasi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer ključ kada je omogućena efektivna oznaka `REQUIRE_API_KEY` |
| `MANAGEMENT` | Stranice kontrolne table, postavke, provajderi, ključevi, administrativne i dijagnostičke krajnje tačke.                                                      | Sesija kontrolne table ILI Bearer s opsegom `manage`              |

Nekoliko radnji `MANAGEMENT` je **samo za operatera**: ključ `manage` nije dovoljan. Izvoz pohranjenih vjerodajnica (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), vraćanje sigurnosne kopije preko živih podataka (`POST /api/db-backups/import`, uključujući `dryRun=true`, `POST /api/db-backups` vraćanje po id-u, `POST /api/settings/import-json`) i uništavanje tačaka vraćanja (čišćenje putem `DELETE /api/db-backups` i također `PATCH /api/db-backups`, jer zadržavanje koje se snima pokreće automatsko orezivanje nakon svake sigurnosne kopije) zahtijevaju sesiju kontrolne table, lokalni CLI subjekat ili onemogućenu prijavu. Izdavanje sinhronizacijskog tokena (`POST /api/sync/tokens`) i kovanje CLI pristupnog tokena s opsegom `admin` (`POST /api/cli/tokens`) zahtijevaju sesiju kontrolne table ili lokalni CLI subjekat u svim načinima prijave. API ključevi bilo kojeg opsega i `oma_` pristupni tokeni nisu operaterske vjerodajnice: kada se traži operaterska vjerodajnica, dobijaju `403`. Provjera se nalazi u `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Promjena postavki prijave također je rezervisana za operatera: `POST /api/settings/require-login` (postavljanje lozinke za upravljanje / prebacivanje `requireLogin`) prihvata samo te vjerodajnice kada lozinka već postoji — prozor prvog pokretanja (još bez lozinke) ostaje nepromijenjen — a sesija kontrolne table mora poslati `currentPassword` da bi zamijenila lozinku (`403` ako nedostaje ili je pogrešna, bilježi se kao `settings.update_failed`). Lokalni CLI i instanca s onemogućenom prijavom zadržavaju put oporavka i mogu postaviti lozinku bez nje, jer su obje vezane za host koji posjeduje direktorij podataka.

## Pipeline

```
Dolazni zahtjev → src/proxy.ts
  → runAuthzPipeline() u src/server/authz/pipeline.ts
    1. Ukloni pouzdana interna zaglavlja (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generiši ID zahtjeva, klasifikuj rutu putem classifyRoute()
    3. Ako je pathname == "/" → preusmjeri na /dashboard
    4. Ako je u toku pražnjenje (graceful shutdown) i /api/* → 503
    5. Ako nije GET /api/* → checkBodySize() zaštita
    6. Ako je OPTIONS → CORS preflight 204
    7. Ako je options.enforce == false → propusti sa route-class zaglavljima
    8. U suprotnom: POLICIES[routeClass].evaluate(ctx)
       - allow  → označi x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON greška sa correlation_id (stranice kontrolne table → 302 /login)
```

Pouzdana interna zaglavlja (definisana u `src/server/authz/headers.ts`) se **uklanjaju iz dolaznih zahtjeva** prije klasifikacije — klijenti ne mogu unaprijed popuniti `x-omniroute-auth-*` da bi se lažno predstavili kao subjekat.

### Ugovori o politikama

Svaka klasa rute ima politiku u `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — uvijek vraća `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izvlači Bearer, validira putem `validateApiKey()`. Prelazi na anonymous samo kada je onemogućena efektivna feature zastavica `REQUIRE_API_KEY`. Efektivna zastavica se razrješava kroz `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) tako da Dashboard Feature Flags i varijable okruženja konzistentno upravljaju sa `/api/v1/*`, `/api/v1beta/*` i aliasima; neuspjesi razrješivača rezultiraju blokiranjem. Dozvoljava zahtjeve sesije kontrolne table na klijentskim API rutama (uključujući `/api/v1/models`, koje koristi katalog modela kontrolne table).
- **`managementPolicy`** (`policies/management.ts`) — prihvata sesiju kontrolne table, interne zahtjeve za sinhronizaciju modela (podudaranje sa `/api/providers/[name]/(sync-models|models)`), ili u potpunosti preskače ako `isAuthRequired()` vrati false. Vraća 403 (`AUTH_001`) kada je Bearer token prisutan, ali nevažeći, u suprotnom 401. Takođe sprovodi nivoe zaštite ruta (`LOCAL_ONLY` / `ALWAYS_PROTECTED`) prije bilo koje grane autorizacije — pogledajte [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY` putanjama u `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (danas: `/api/mcp/`) se može pristupiti sa ne-loopback adresa kada Bearer ključ nosi `manage` opseg; sve ostale `LOCAL_ONLY` putanje ostaju strogo loopback bez obzira na opseg.

Uspješna politika vraća `AuthSubject` sa `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Handleri nizvodno ga mogu pročitati putem `assertAuth(request, "CLIENT_API")` u `src/server/authz/assertAuth.ts` umjesto ponovnog pokretanja logike autorizacije.

## Lista javnih ruta

`src/shared/constants/publicApiRoutes.ts` je eksplicitna lista dozvoljenih ruta:

Lista je podijeljena prema **obliku**, a ta podjela je ključna (GHSA-74g9-q8f6-793h): prefiks se podudara sa `startsWith()`, tako da se podudara i sa svakom susjednom putanjom koja dijeli iste početne znakove.
`/api/usage/om-usage` kao prefiks označava `/api/usage/om-usage<bilo_šta>` kao JAVNO, a Next to razrješava u `/api/usage/[connectionId]` — rukovalac (handler) bez sopstvene autentifikacije.

```ts
// Autentična podstabla. Svaki unos MORA završavati sa "/" (potvrđeno jediničnim testom).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // tretira se kao CLIENT_API u klasifikaciji, a ne kao "javno bez autentifikacije"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Pojedinačne rute, podudaraju se TAČNO (sa ili bez kose crte na kraju).
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

// Pojedinačne rute samo za čitanje koje takođe koriste CORS relaksaciju porijekla.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Pojedinačna ruta samo za čitanje BEZ CORS relaksacije.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rute samo za čitanje su javne **samo** za sigurne metode. Napomena: `classifyRoute()` isključuje `/api/v1/*` i `/api/v1beta/*` iz PUBLIC "fall-through" mehanizma — one su uvijek `CLIENT_API`, tako da se politika Bearer-ključa i dalje primjenjuje.

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

## Prekidač za zahtijevanu autentifikaciju

`isAuthRequired()` u `src/shared/utils/apiAuth.ts` odlučuje hoće li se za zahtjev provoditi **bilo kakva** autentifikacija:

- `settings.requireLogin === false` → autentifikacija je globalno isključena, osim za trajno zaštićeni nivo (vidi [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) i pozive koji izdaju vjerodajnicu koju ona prihvata; oni zahtijevaju istu vjerodajnicu kao i pri uključenoj prijavi: izdavanje sinhronizacijskih tokena, kovanje CLI pristupnih tokena bilo kojeg opsega te kreiranje API ključa s opsegom `manage`/`admin`, dodjeljivanje tog opsega ključu, regeneriranje ili prikaz takvog ključa (`requireCredentialForManagementScopedKey()` u `src/lib/api/requireManagementAuth.ts`). Ključevi samo za inferenciju ostaju otvoreni.
- Nije postavljena lozinka **i** nije postavljena okolinska varijabla `INITIAL_PASSWORD` → bootstrap način dopušta čarobnjaka za postavljanje i zahtjeve s loopbacka, ali mrežni zahtjevi izvana i dalje zahtijevaju vjerodajnice.
- Svaka greška baze → zatvoreno (secure-by-default).

Provođenje API ključa klijenta koristi `isRequireApiKeyEnabled()` u `src/shared/utils/featureFlags.ts`, a ne direktno čitanje `process.env.REQUIRE_API_KEY`. To je važno za instalirane instance: prebacivanje `REQUIRE_API_KEY` u Dashboard → Feature Flags sprema nadjačavanje u bazu i odmah utiče na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` i druge provjere autentifikacije klijentskog API-ja koje dijele ovaj pomoćnik. Ako se skladište oznaka ne može pročitati, autentifikacija klijentskog API-ja zatvara se i zahtijeva ključ.

## Promjena koja prekida kompatibilnost — v3.8.0

Krajnje tačke `/api/v1/agents/tasks/*` i `/api/resilience/model-cooldowns` **sada zahtijevaju upravljačku autorizaciju** (commit `588a0333`). Klijenti koji su prethodno slali normalan API ključ bez `manage` opsega dobijaju `403`. Migracija: ili dodijelite ključu `manage` opseg na kontrolnoj tabli API ključeva, ili koristite prijavljenu sesiju kontrolne table.

## Promjena ponašanja — v3.8.2

`/api/mcp/*` (udaljeni MCP server) je i dalje LOCAL_ONLY po zadanim postavkama, ali sada prihvata non-loopback zahtjeve kada `Authorization: Bearer <api-key>` zaglavlje nosi `manage` opseg. Izuzetak je eksplicitno ograničen po putanji putem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` u `src/server/authz/routeGuard.ts`; sestrinski LOCAL_ONLY prefiks `/api/cli-tools/runtime/*` namjerno NIJE moguće zaobići jer može pokrenuti proizvoljne podprocese. Anonimni zahtjevi prema `/api/mcp/*` sa non-loopback adresa i dalje vraćaju `403 LOCAL_ONLY` — zadana vrijednost za bilo koju novu LOCAL_ONLY putanju ostaje strogi loopback. Pogledajte [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testiranje

- Jedinični testovi: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javna lista dozvoljenih (allowlist): `tests/unit/public-api-routes.test.ts`.
- Pokretanje fokusiranog testa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Otklanjanje grešaka

Pipeline uvijek označava odgovore sa:

```
x-request-id:               <id korelacije, ponovljen u tijelima grešaka>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Za autentifikovane zahtjeve, zaglavlja zahtjeva na strani upstream-a (strana handlera) takođe uključuju:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opciono)
x-omniroute-auth-scopes:    lista razdvojena zarezima
```

Koristite `assertAuth(req, expectedClass)` unutar handlera — on izbacuje `AuthzAssertionError` sa kodom `AUTHZ_NOT_INITIALIZED` ako je middleware zaobiđen (korisno za hvatanje regresija konfiguracije u testovima).

## Pogledajte također

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka autentifikacije po krajnjoj tački
- [COMPLIANCE.md](../security/COMPLIANCE.md) — zapisnik revizije za događaje autentifikacije
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tri prostora imena opsega i MCP katalog opsega alata
- Izvor: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
