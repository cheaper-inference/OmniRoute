# Authorization Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Izvor istine:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Zadnje ažurirano:** 2026-09-22 — prostori naziva opsega upućuju na MCP-SERVER.md

OmniRoute ima autorizacijski cjevovod svjestan ruta koji štiti svaki API zahtjev. Klasifikacija je **deterministička** i **zatvorena u slučaju kvara** — sve što se ne može klasificirati završava kao `MANAGEMENT` i zahtijeva sesiju ili token upravljačke razine. Ova stranica objašnjava model za inženjere koji održavaju rute ili dizajniraju nove krajnje točke.

![AuthZ cjevovod (3 klase ruta + evaluacija politike)](../diagrams/exported/authz-pipeline.svg)

> Izvor: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva načina autentifikacije

### 1. API ključ (Bearer)

Koristi se za klijentska API sučelja kompatibilna s OpenAI/Anthropic/Gemini i za nekoliko ruta upravljanja kada ključ ima opseg `manage`.

```
Authorization: Bearer <api-key>
```

Provjerava ga `isValidApiKey()` / `extractApiKey()` u `src/sse/services/auth.ts` i ponovno izvozi kroz `src/shared/utils/apiAuth.ts`. Validator također prihvaća okolinske varijable `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kao trajne ključeve za prosljeđivanje (issue #1350).

### 2. Sesija nadzorne ploče (kolačić auth_token)

Za stranice nadzorne ploče i administrativne operacije.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kolačić je sesija samo ako JWT prođe provjeru **i** sadrži `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Svaki primatelj kolačića (zaštitnik ruta nadzorne ploče (`isDashboardSessionAuthenticated()`), osvježavanje u authz cjevovodu, WebSocket rukovanje, živi poslužitelj, `/api/settings/require-login`, `/api/auth/status`) prolazi kroz ovaj pomoćnik. Postoje i drugi JWT-ovi potpisani s `JWT_SECRET` — prosljeđivanje CLI-ja Cursor izdaje vlasnicima ključa tokene `iss "omniroute" / aud "cursor-cli"` — i nikada nisu sesije (#13298).

Provjerava ga `isDashboardSessionAuthenticated()` u `src/shared/utils/apiAuth.ts`. Cjevovod automatski osvježava JWT kada mu preostane manje od 7 dana od njegovog 30-dnevnog vijeka trajanja.

Sesija može završiti prije isteka 30 dana jer svaki izdavatelj prolazi kroz `mintDashboardSessionToken` (vrijeme izdavanja `iat` i identifikator `jti`), a provjeritelj provjerava dvije postavke: `sessionsValidAfter`, koju postavlja promjena lozinke, pa svaka sesija izdana prije nje prestaje vrijediti (preglednik koji je promijenio lozinku dobiva novi kolačić), i `revokedDashboardSessions`, u koji `POST /api/auth/logout` dodaje `jti` odjavljene sesije. Sesije izdane starijim izdanjem nemaju nijednu od tih tvrdnji i ostaju valjane do prve promjene lozinke. Ako se postavke ne mogu pročitati, sesija se ne smatra pouzdanom.

Neke rute upravljanja prihvaćaju **bilo koji** od dvaju načina: kolačić ILI `Bearer <key>` kada API ključ ima opseg `manage` (ili `admin`). Upravo to omogućuje tijek rada „konfigurabilno putem API poziva” dodan u v3.8.

#### Izborna OIDC prijava (#6973)

Administratorska prijava na nadzornu ploču podržava i izborni OIDC (OpenID Connect) tijek uz zadanu prijavu lozinkom — prijava lozinkom se nikada ne uklanja, nego se samo nadopunjuje:

- Onemogućeno osim ako su `settings.oidcEnabled === true` **i** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` svi postavljeni (Settings → Auth). `GET /api/auth/oidc/login` u suprotnom vraća `400`.
- `GET /api/auth/oidc/login` otkriva `authorization_endpoint` iz `/.well-known/openid-configuration` izdavatelja (u suprotnom koristi `<issuer>/authorize`), gradi redirect URI iz dolaznog zahtjeva (uzima u obzir `x-forwarded-proto`) i preusmjerava na IdP sa nasumičnim `state` pohranjenim u kolačić `oidc_state` s oznakom `httpOnly`.
- `GET /api/auth/oidc/callback` provjerava `state`, mijenja autorizacijski kod i provjerava potpis ID tokena putem JWKS-a izdavatelja (`createRemoteJWKSet` iz `jose`, predmemorirano po JWKS URI-ju) uz provjeru `issuer`/`audience`. Popis `oidcAllowedSubjects` je obavezan: odgovara tvrdnji `sub` tokena ili tvrdnji `email` — tvrdnja e-pošte uzima se u obzir samo kada je `email_verified === true`, pa neprovjerena e-pošta kod IdP-a nikada ne može proći kroz vrata — a bez unosa callback odbija svaku prijavu (`not_configured`).
- Po uspjehu izdaje **potpuno isti** 30-dnevni JWT `auth_token` kao i prijava lozinkom (`src/app/api/auth/login/route.ts`), pa ostatak cjevovoda sesije nadzorne ploče (automatsko osvježavanje, oznake kolačića) ostaje nepromijenjen — OIDC zamjenjuje samo način izdavanja kolačića, a ne ono što on dodjeljuje.
- Svaka postavka `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) nalazi se u `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` vraća `400 PASSWORD_REQUIRED` osim ako tijelo zahtjeva ne sadrži lozinku za upravljanje kao `currentPassword` (`401 PASSWORD_MISMATCH` ako je pogrešna). `oidcDisablePasswordLogin` onemogućuje _prijavu_ lozinkom (`POST /api/auth/login`), ali zadržava pohranjeni hash lozinke, a ponovna autentifikacija i dalje provjerava `currentPassword` prema njemu.
- `corsOrigins` i `bruteForceProtection` također su u `SECURITY_IMPACTING_SETTINGS_KEYS`: njihovo ublažavanje slabi obranu prijave, pa zahtijevaju istu ponovnu autentifikaciju `currentPassword` (kartica Security je traži), a uvoz JSON-a ih izostavlja.
- Svaki ključ sigurnosne politike — unosi `SECURITY_IMPACTING_SETTINGS_KEYS`, svaki ključ `oidc*` i stanje sesije nadzorne ploče — je **samo za operatora** na `PATCH /api/settings`: API ključ s opsegom manage ili `oma_` pristupni token dobiva `403`, čak i kad pošalje ispravan `currentPassword`, a odbijanje se bilježi kao `settings.update_failed` s `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` u `src/lib/api/operatorCredential.ts`). Obične postavke (tema, postavke prikaza) ostaju zapisive za ključ `manage` ili pristupni token `admin`. Svaka izmjena samog `/api/settings` (kao i `/api/settings/require-login`) također zahtijeva opseg pristupnog tokena `admin` (`ADMIN_MUTATION_EXACT_PATHS` u `src/server/authz/accessScopes.ts`, točno podudaranje putanje); `GET` ostaje `read`, a ostale podrute `/api/settings/*` (proxyji, zadane postavke combo, aliasi modela, kompresija, čišćenja…) zadržavaju opseg `write` zaključen iz metode.
- `POST /api/settings/import-json` preskače tu ponovnu autentifikaciju, pa prije zapisa uklanja svaki ključ iz `IMPORT_STRIPPED_SETTINGS_KEYS` (ista datoteka): lozinku i `currentPassword`, svaki unos `SECURITY_IMPACTING_SETTINGS_KEYS` te stanje sesije nadzorne ploče (`sessionsValidAfter`, `revokedDashboardSessions`). Uvoz starije sigurnosne kopije tako ne može oživjeti sesiju koju je završila promjena lozinke ili odjava.

## Klase ruta

`src/server/authz/types.ts` definira tri klase; svaka ruta koju nije moguće deterministički klasificirati pada na `MANAGEMENT`.

| Klasa        | Opis                                                                                                                                                          | Potrebna autentifikacija                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | Izričito sigurne rute — prijava, odjava, status, inicijalizacija, health, bootstrap uvođenja.                                                                 | Nema                                                                  |
| `CLIENT_API` | Krajnje točke za posluživanje modela — `/api/v1/*`, `/api/v1beta/*` te aliasi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer ključ kada je omogućena učinkovita zastavica `REQUIRE_API_KEY` |
| `MANAGEMENT` | Stranice nadzorne ploče, postavke, pružatelji, ključevi, administrativne i dijagnostičke krajnje točke.                                                       | Sesija nadzorne ploče ILI Bearer s opsegom `manage`                   |

Nekoliko radnji `MANAGEMENT` je **samo za operatora**: ključ `manage` nije dovoljan. Izvoz pohranjenih vjerodajnica (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), vraćanje sigurnosne kopije preko živih podataka (`POST /api/db-backups/import`, uključujući `dryRun=true`, `POST /api/db-backups` vraćanje po id-u, `POST /api/settings/import-json`) i uništavanje točaka vraćanja (čišćenje putem `DELETE /api/db-backups` i također `PATCH /api/db-backups`, jer zadržavanje koje spremi pokreće automatsko orezivanje nakon svake sigurnosne kopije) zahtijevaju sesiju nadzorne ploče, lokalni CLI subjekt ili onemogućenu prijavu. Izdavanje sinkronizacijskog tokena (`POST /api/sync/tokens`) i kovanje CLI pristupnog tokena s opsegom `admin` (`POST /api/cli/tokens`) zahtijevaju sesiju nadzorne ploče ili lokalni CLI subjekt u svim načinima prijave. API ključevi bilo kojeg opsega i `oma_` pristupni tokeni nisu operatorske vjerodajnice: kad se traži operatorska vjerodajnica, dobivaju `403`. Provjera se nalazi u `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Promjena postavki prijave također je rezervirana za operatora: `POST /api/settings/require-login` (postavljanje lozinke za upravljanje / prebacivanje `requireLogin`) prihvaća samo te vjerodajnice kada lozinka već postoji — prozor prvog pokretanja (još bez lozinke) ostaje nepromijenjen — a sesija nadzorne ploče mora poslati `currentPassword` kako bi zamijenila lozinku (`403` ako nedostaje ili je pogrešna, bilježi se kao `settings.update_failed`). Lokalni CLI i instanca s onemogućenom prijavom zadržavaju put oporavka i mogu postaviti lozinku bez nje, jer su obje vezane za host koji posjeduje podatkovni direktorij.

## Cjevovod

```
Dolazni zahtjev → src/proxy.ts
  → runAuthzPipeline() u src/server/authz/pipeline.ts
    1. Ukloni pouzdana interna zaglavlja (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generiraj ID zahtjeva, klasificiraj rutu putem classifyRoute()
    3. Ako je pathname == "/" → preusmjeri na /dashboard
    4. Ako je u tijeku pražnjenje (kontrolirano gašenje) i ruta je /api/* → 503
    5. Ako metoda nije GET i ruta je /api/* → primijeni zaštitu checkBodySize()
    6. Ako je metoda OPTIONS → CORS predzahtjev 204
    7. Ako je options.enforce == false → proslijedi sa zaglavljima klase rute
    8. U suprotnom: POLICIES[routeClass].evaluate(ctx)
       - dopusti  → postavi x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - odbij → JSON pogreška s correlation_id (stranice nadzorne ploče → 302 /login)
```

Pouzdana interna zaglavlja (definirana u `src/server/authz/headers.ts`) **uklanjaju se iz dolaznih zahtjeva** prije klasifikacije — klijenti ne mogu unaprijed postaviti `x-omniroute-auth-*` kako bi se lažno predstavili kao subjekt.

### Ugovori pravila

Svaka klasa rute ima pravilo u `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — uvijek vraća `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izdvaja Bearer token i provjerava ga putem `validateApiKey()`. Prelazi na anonimni pristup samo kada je efektivna značajka `REQUIRE_API_KEY` onemogućena. Efektivna vrijednost određuje se putem `isRequireApiKeyEnabled()` (`nadjačavanje značajkom iz baze podataka > process.env.REQUIRE_API_KEY > zadana vrijednost`), tako da značajke nadzorne ploče i varijable okruženja dosljedno upravljaju rutama `/api/v1/*`, `/api/v1beta/*` i pseudonimima; u slučaju pogreške određivanja pristup se odbija. Dopušta zahtjeve sa sesijom nadzorne ploče na klijentskim API rutama (uključujući `/api/v1/models`, koju koristi katalog modela nadzorne ploče).
- **`managementPolicy`** (`policies/management.ts`) — prihvaća sesiju nadzorne ploče, interne zahtjeve za sinkronizaciju modela (koji odgovaraju obrascu `/api/providers/[name]/(sync-models|models)`) ili u potpunosti preskače provjeru ako `isAuthRequired()` vrati false. Vraća 403 (`AUTH_001`) kada je Bearer token prisutan, ali nije valjan, a inače 401. Također provodi razine zaštite ruta (LOCAL_ONLY / ALWAYS_PROTECTED) prije bilo koje autentikacijske grane — pogledajte [Razine zaštite ruta](../security/ROUTE_GUARD_TIERS.md). Putanjama LOCAL_ONLY u `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (trenutačno: `/api/mcp/`) može se pristupiti izvan lokalnog sučelja kada Bearer ključ ima opseg `manage`; sve ostale putanje LOCAL_ONLY ostaju strogo ograničene na lokalno sučelje bez obzira na opseg.

Uspješno pravilo vraća `AuthSubject` s `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Daljnji rukovatelji mogu ga dohvatiti putem `assertAuth(request, "CLIENT_API")` u `src/server/authz/assertAuth.ts` umjesto ponovnog izvođenja autentikacijske logike.

## Popis javnih ruta

`src/shared/constants/publicApiRoutes.ts` izričit je popis dopuštenih ruta:

Popis je podijeljen prema **obliku**, a ta je podjela ključna (GHSA-74g9-q8f6-793h): prefiks se
uspoređuje pomoću `startsWith()`, pa se podudara i sa svakom susjednom putanjom koja dijeli njegove početne znakove.
Prefiks `/api/usage/om-usage` označio je `/api/usage/om-usage<anything>` kao JAVAN, a Next to razrješava
u `/api/usage/[connectionId]` — rukovatelj bez vlastite autentifikacije.

```ts
// Stvarna podstabla. Svaki unos MORA završavati znakom "/" (što provjerava jedinični test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // u classify se tretira kao CLIENT_API, a ne kao javna ruta "bez autentifikacije"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Pojedinačne rute koje se podudaraju TOČNO (sa završnom kosom crtom ili bez nje).
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

// Pojedinačne rute samo za čitanje na koje se također primjenjuje ublažavanje ograničenja CORS izvora.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Pojedinačna ruta samo za čitanje BEZ ublažavanja CORS ograničenja.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rute samo za čitanje javne su **samo** za sigurne metode. Napomena: `classifyRoute()` isključuje `/api/v1/*` i `/api/v1beta/*` iz rezervne klasifikacije PUBLIC — one su uvijek `CLIENT_API`, tako da se pravilo za Bearer ključ i dalje primjenjuje.

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

## Prekidač za zahtijevanu autentifikaciju

`isAuthRequired()` u `src/shared/utils/apiAuth.ts` odlučuje hoće li se za zahtjev provoditi **bilo kakva** autentifikacija:

- `settings.requireLogin === false` → autentifikacija je globalno isključena, osim za trajno zaštićenu razinu (vidi [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) i pozive koji izdaju vjerodajnicu koju ona prihvaća; oni zahtijevaju istu vjerodajnicu kao i pri uključenoj prijavi: izdavanje sinkronizacijskih tokena, kovanje CLI pristupnih tokena bilo kojeg opsega te stvaranje API ključa s opsegom `manage`/`admin`, dodjeljivanje tog opsega ključu, regeneriranje ili prikaz takvog ključa (`requireCredentialForManagementScopedKey()` u `src/lib/api/requireManagementAuth.ts`). Ključevi samo za inferenciju ostaju otvoreni.
- Nije postavljena lozinka **i** nije postavljena okolinska varijabla `INITIAL_PASSWORD` → bootstrap način dopušta čarobnjak za postavljanje i zahtjeve s loopbacka, ali mrežni zahtjevi izvana i dalje zahtijevaju vjerodajnice.
- Svaka pogreška baze → zatvoreno (secure-by-default).

Provedba API ključa klijenta koristi `isRequireApiKeyEnabled()` u `src/shared/utils/featureFlags.ts`, a ne izravno čitanje `process.env.REQUIRE_API_KEY`. To je važno za instalirane instance: prebacivanje `REQUIRE_API_KEY` u Dashboard → Feature Flags sprema nadjačavanje u bazu i odmah utječe na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` i druge provjere autentifikacije klijentskog API-ja koje dijele ovaj pomoćnik. Ako se spremište zastavica ne može pročitati, autentifikacija klijentskog API-ja zatvara se i zahtijeva ključ.

## Nekompatibilna promjena — v3.8.0

Krajnje točke `/api/v1/agents/tasks/*` i `/api/resilience/model-cooldowns` **sada zahtijevaju autentifikaciju za upravljanje** (commit `588a0333`). Klijenti koji su prethodno slali običan API ključ bez opsega `manage` primaju `403`. Migracija: ključu dodijelite opseg `manage` na nadzornoj ploči API ključeva ili upotrijebite prijavljenu sesiju nadzorne ploče.

## Promjena ponašanja — v3.8.2

`/api/mcp/*` (udaljeni MCP poslužitelj) i dalje je prema zadanim postavkama LOCAL_ONLY, ali sada prihvaća zahtjeve koji ne dolaze s povratne petlje kada zaglavlje `Authorization: Bearer <api-key>` sadrži opseg `manage`. Iznimka se izričito omogućuje za svaku putanju putem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` u `src/server/authz/routeGuard.ts`; srodni prefiks LOCAL_ONLY `/api/cli-tools/runtime/*` namjerno se ne može zaobići jer može pokrenuti proizvoljne potprocese. Anonimni zahtjevi prema `/api/mcp/*` koji ne dolaze s povratne petlje i dalje vraćaju `403 LOCAL_ONLY` — zadano ponašanje za svaku novu putanju LOCAL_ONLY ostaje strogo ograničeno na povratnu petlju. Pogledajte [Razine zaštite ruta](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testiranje

- Jedinični testovi: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javni popis dopuštenih ruta: `tests/unit/public-api-routes.test.ts`.
- Pokretanje ciljanog testa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Otklanjanje pogrešaka

Pipeline uvijek označava odgovore sljedećim zaglavljima:

```
x-request-id:               <korelacijski ID, ponovljen u tijelima pogrešaka>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Za autentificirane zahtjeve zaglavlja zahtjeva prema nadređenom poslužitelju (na strani rukovatelja) također uključuju:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<posljednje 4 znamenke> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (neobavezno)
x-omniroute-auth-scopes:    popis odvojen zarezima
```

Upotrijebite `assertAuth(req, expectedClass)` unutar rukovatelja — izbacuje `AuthzAssertionError` s kodom `AUTHZ_NOT_INITIALIZED` ako je međuprogram zaobiđen (korisno za otkrivanje regresija konfiguracije u testovima).

## Vidi također

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka autorizacije po krajnjoj točki
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revizijski zapisnik za događaje autorizacije
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tri imenska prostora opsega i MCP katalog opsega alata
- Izvor: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
