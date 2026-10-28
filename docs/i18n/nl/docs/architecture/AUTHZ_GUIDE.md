# Authorization Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Bron van waarheid:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Laatst bijgewerkt:** 2026-09-22 — scope-namespaces verwijzen naar MCP-SERVER.md

OmniRoute heeft een route-bewuste autorisatiepipeline die elke API-aanvraag afschermt. Classificatie is **deterministisch** en **fail-closed** — alles wat niet geclassificeerd kan worden, eindigt als `MANAGEMENT` en vereist een sessie of een token van managementkwaliteit. Deze pagina legt het model uit voor engineers die routes onderhouden of nieuwe endpoints ontwerpen.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> Bron: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Twee authenticatiemodi

### 1. API-sleutel (Bearer)

Wordt gebruikt voor de OpenAI-/Anthropic-/Gemini-compatibele client-API's en enkele beheerroutes wanneer de sleutel het bereik `manage` heeft.

```
Authorization: Bearer <api-key>
```

Gevalideerd door `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts` en opnieuw geëxporteerd via `src/shared/utils/apiAuth.ts`. De validator accepteert ook de omgevingsvariabelen `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` als permanente passthrough-sleutels (issue #1350).

### 2. Dashboardsessie (auth_token-cookie)

Voor dashboardpagina's en beheerbewerkingen.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Een cookie is alleen een sessie wanneer de JWT is geverifieerd **en** `authenticated: true` bevat
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Elke
gebruiker van de cookie (dashboardroutebeveiliging (`isDashboardSessionAuthenticated()`), vernieuwing van de autorisatiepipeline, WebSocket-handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) gebruikt die helper.
Er bestaan andere JWT's die met `JWT_SECRET` zijn ondertekend — de Cursor CLI-passthrough maakt
`iss "omniroute" / aud "cursor-cli"`-tokens aan voor sleutelhouders — maar deze zijn nooit sessies
(#13298).

Geverifieerd door `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts`. De pipeline vernieuwt de JWT automatisch wanneer er minder dan 7 dagen resteren van de geldigheidsduur van 30 dagen.

Een sessie kan ook eindigen voordat de 30 dagen zijn verstreken, omdat elke tokenuitgever `mintDashboardSessionToken` gebruikt (met een uitgiftetijd `iat` en een id `jti`) en de verifier twee instellingen controleert: `sessionsValidAfter`, die bij een wachtwoordwijziging wordt ingesteld, zodat elke eerder uitgegeven sessie niet langer wordt geverifieerd (de browser waarin het wachtwoord is gewijzigd, ontvangt een nieuwe cookie), en `revokedDashboardSessions`, waaraan `POST /api/auth/logout` de `jti` van de afgemelde sessie toevoegt. Sessies die door een oudere release zijn aangemaakt, bevatten geen van beide claims en blijven geldig tot de eerste wachtwoordwijziging. Als de instellingen niet kunnen worden gelezen, wordt de sessie niet vertrouwd.

Sommige beheerroutes accepteren **beide** modi: cookie OF `Bearer <key>` wanneer de API-sleutel het bereik `manage` (of `admin`) heeft. Dit maakt de in v3.8 toegevoegde workflow "configureerbaar via API-aanroepen" mogelijk.

#### Optionele OIDC-inlogbeveiliging (#6973)

De beheerdersaanmelding voor het dashboard ondersteunt naast de standaardaanmelding met een wachtwoord ook een **optionele** OIDC-flow (OpenID Connect) — de aanmelding met een wachtwoord wordt nooit verwijderd, maar alleen
aangevuld:

- Uitgeschakeld tenzij `settings.oidcEnabled === true` **en** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` allemaal zijn geconfigureerd (Instellingen → Authenticatie).
  Anders retourneert `GET /api/auth/oidc/login` de status `400`.
- `GET /api/auth/oidc/login` haalt het `authorization_endpoint` op uit de
  `/.well-known/openid-configuration` van de issuer (met
  `<issuer>/authorize` als terugvaloptie), stelt de redirect-URI samen op basis van het inkomende verzoek
  (met ondersteuning voor `x-forwarded-proto`) en leidt door naar de IdP met een willekeurige `state`
  die wordt opgeslagen in een `httpOnly`-cookie met de naam `oidc_state`.
- `GET /api/auth/oidc/callback` valideert `state`, wisselt de autorisatiecode
  in en verifieert de handtekening van het ID-token via de JWKS van de issuer
  (`createRemoteJWKSet` van `jose`, gecachet per JWKS-URI), met controles voor `issuer`/`audience`.
  Toegang tot het dashboard vereist een niet-lege lijst `oidcAllowedSubjects`,
  een beleid in `oidcAdmissionClaim`, of beide. De lijst met subjects vergelijkt `sub` of
  `email` alleen wanneer `email_verified === true`. Het optionele claimbeleid gebruikt
  een door punten gescheiden pad naar een claim in het ID-token (bijvoorbeeld `realm_access.roles`) en
  een array met geaccepteerde waarden; de gevonden claim moet een array van strings zijn
  die ten minste één geaccepteerde waarde bevat. Als beide beleidsregels zijn geconfigureerd,
  moeten beide slagen. Ontbrekende of onjuist gevormde claims worden standaard geweigerd, en zonder een van beide
  beleidsregels weigert de callback de aanmelding (`not_configured`). Bestaande configuraties
  die alleen subjects gebruiken, blijven ongewijzigd werken.
- Keycloak neemt realmrollen normaal gesproken op in access tokens, maar niet noodzakelijk in ID-
  tokens. Om de realmrol `admin` te vereisen, configureert u voor
  deze client een protocolmapper die `realm_access.roles` in het **ID-token** opneemt en stelt u vervolgens
  `oidcAdmissionClaim` in op `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Controleer de daadwerkelijke claim in het ID-token voor deze client voordat u toegang uitsluitend op basis van rollen
  inschakelt; de applicatie leest geen rollen uit access tokens. Weigering van tokens
  aan de IdP-zijde kan deze controle aanvullen, maar vervangt deze controle aan de applicatiezijde niet.
- Bij succes genereert dit **exact dezelfde** `auth_token`-JWT met een geldigheidsduur van 30 dagen als
  de wachtwoordaanmelding (`src/app/api/auth/login/route.ts`), zodat de rest van de
  dashboardsessiepijplijn (automatisch vernieuwen, cookiekenmerken) ongewijzigd blijft —
  OIDC vervangt alleen de manier waarop de cookie wordt gegenereerd, niet welke rechten deze verleent. Wijzigingen
  in IdP-rollen/-groepen maken bestaande OmniRoute-sessies niet ongeldig; afmelden,
  wachtwoordrotatie of het verlopen van de sessie bepalen nog steeds hun levensduur.
- Elke `oidc*`-instelling (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) staat in `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  antwoordt met `400 PASSWORD_REQUIRED`, tenzij de body het beheerwachtwoord
  als `currentPassword` bevat (`401 PASSWORD_MISMATCH` wanneer dit onjuist is).
  `oidcDisablePasswordLogin` weigert _aanmelding_ met een wachtwoord (`POST /api/auth/login`),
  maar behoudt de opgeslagen wachtwoordhash, en bij herauthenticatie wordt
  `currentPassword` nog steeds hiertegen gecontroleerd.
- `corsOrigins` en `bruteForceProtection` staan ook in `SECURITY_IMPACTING_SETTINGS_KEYS`:
  het versoepelen van een van beide verzwakt de aanmeldbeveiliging, waardoor hiervoor dezelfde
  herauthenticatie met `currentPassword` vereist is (het tabblad Beveiliging vraagt erom) en de JSON-import
  deze instellingen weglaat.
- Elke beveiligingsbeleidssleutel — de vermeldingen in `SECURITY_IMPACTING_SETTINGS_KEYS`,
  elke `oidc*`-sleutel en de dashboardsessiestatus — is **alleen voor operators** bij
  `PATCH /api/settings`: een API-sleutel met het bereik manage of een `oma_`-access token wordt
  geweigerd met `403`, zelfs wanneer deze het juiste `currentPassword` meestuurt, en de
  weigering wordt in het auditlog vastgelegd als `settings.update_failed` met `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` in `src/lib/api/operatorCredential.ts`).
  Gewone instellingen (thema, weergavevoorkeuren) blijven beschrijfbaar met een `manage`-sleutel
  of een `admin`-access token. Elke mutatie van `/api/settings` zelf (en van
  `/api/settings/require-login`) vereist ook het access-tokenbereik `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` in `src/server/authz/accessScopes.ts`, overeenkomst
  op het exacte pad); `GET` blijft `read`, en de andere subroutes van `/api/settings/*` (proxy's,
  standaardwaarden voor combo's, modelaliassen, compressie, opschoningsacties…) behouden het uit de methode afgeleide
  bereik `write`.
- `POST /api/settings/import-json` slaat die herauthenticatie over en verwijdert daarom vóór
  het schrijven elke sleutel in `IMPORT_STRIPPED_SETTINGS_KEYS` (hetzelfde bestand): het wachtwoord en
  `currentPassword`, elke vermelding in `SECURITY_IMPACTING_SETTINGS_KEYS` en de
  dashboardsessiestatus (`sessionsValidAfter`, `revokedDashboardSessions`).
  Het importeren van een oudere back-up kan daarom geen sessie herstellen die al door een
  wachtwoordwijziging of afmelding was beëindigd.

## Routeklassen

`src/server/authz/types.ts` definieert drie klassen; elke route die niet deterministisch kan worden geclassificeerd, valt terug op `MANAGEMENT`.

| Klasse       | Beschrijving                                                                                                                                                   | Authenticatie vereist                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `PUBLIC`     | Expliciet veilige routes: aanmelden, afmelden, status, initialisatie, health-check en onboarding-bootstrap.                                                    | Geen                                                                               |
| `CLIENT_API` | Eindpunten voor modelbediening: `/api/v1/*`, `/api/v1beta/*`, plus de aliassen `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-sleutel wanneer de effectieve `REQUIRE_API_KEY`-featureflag is ingeschakeld |
| `MANAGEMENT` | Dashboardpagina's, instellingen, providers, sleutels, beheer- en diagnose-eindpunten.                                                                          | Dashboardsessie OF Bearer met scope `manage`                                       |

Enkele `MANAGEMENT`-acties zijn **alleen voor de operator**: een `manage`-sleutel is niet voldoende. Opgeslagen inloggegevens exporteren (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), een back-up herstellen over de actieve gegevens (`POST /api/db-backups/import`, ook met `dryRun=true`, `POST /api/db-backups` met herstel op id, `POST /api/settings/import-json`), en herstelpunten vernietigen (opschonen via `DELETE /api/db-backups` en `PATCH /api/db-backups`, omdat de bewaartermijn die het opslaat de automatische opschoning na elke back-up bepaalt) vereisen een dashboardsessie, de identiteit van de lokale CLI of uitgeschakelde aanmelding. Het uitgeven van een synchronisatietoken (`POST /api/sync/tokens`) en het aanmaken van een CLI-toegangstoken met scope `admin` (`POST /api/cli/tokens`) vereisen in elke aanmeldmodus een dashboardsessie of de identiteit van de lokale CLI. API-sleutels van elke scope en `oma_`-toegangstokens zijn geen operatorcredentials: ze krijgen `403` wanneer er een vereist is. De controle staat in `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Het wijzigen van de aanmeldinstellingen is ook alleen voor de operator: `POST /api/settings/require-login` (het beheerwachtwoord instellen / `requireLogin` in- of uitschakelen) accepteert deze credentials alleen zodra er al een wachtwoord bestaat. Het bootstrapvenster van de eerste start (nog geen wachtwoord) blijft ongewijzigd, en een dashboardsessie moet `currentPassword` meesturen om het wachtwoord te vervangen (`403` als het ontbreekt of onjuist is, gelogd als `settings.update_failed`). De lokale CLI en een instantie met uitgeschakelde aanmelding behouden het herstelpad en mogen zonder die stap een wachtwoord instellen, omdat beide gebonden zijn aan de host die de gegevensmap bezit.

## Pipeline

```
Binnenkomend verzoek → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Verwijder vertrouwde interne headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Genereer verzoek-ID, classificeer route via classifyRoute()
    3. Als pathname == "/" → omleiden naar /dashboard
    4. Als het systeem wordt leeggemaakt (gecontroleerd afsluiten) en /api/* → 503
    5. Als niet-GET /api/* → checkBodySize()-controle
    6. Als OPTIONS → CORS-preflight 204
    7. Als options.enforce == false → doorlaten met routeklasseheaders
    8. Anders: POLICIES[routeClass].evaluate(ctx)
       - toestaan → voeg x-omniroute-auth-{kind,id,label,scopes} toe → NextResponse.next()
       - weigeren → JSON-fout met correlation_id (dashboardpagina's → 302 /login)
```

Vertrouwde interne headers (gedefinieerd in `src/server/authz/headers.ts`) worden vóór classificatie **uit binnenkomende verzoeken verwijderd** — clients kunnen `x-omniroute-auth-*` niet vooraf invullen om zich als een subject voor te doen.

### Policycontracten

Elke routeklasse heeft een policy in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — retourneert altijd `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extraheert Bearer en valideert deze via `validateApiKey()`. Valt alleen terug op anonieme toegang wanneer de effectieve featureflag `REQUIRE_API_KEY` is uitgeschakeld. De effectieve vlag wordt bepaald via `isRequireApiKeyEnabled()` (`overschrijving door DB-featureflag > process.env.REQUIRE_API_KEY > standaardwaarde`), zodat Dashboard-featureflags en omgevingsvariabelen `/api/v1/*`, `/api/v1beta/*` en aliassen consistent beheren; fouten in de resolver leiden tot weigering. Staat verzoeken met een dashboardsessie toe op client-API-routes (waaronder `/api/v1/models`, gebruikt door de modelcatalogus van het dashboard).
- **`managementPolicy`** (`policies/management.ts`) — accepteert een dashboardsessie en interne modelsynchronisatieverzoeken (gematcht met `/api/providers/[name]/(sync-models|models)`), of slaat alles over als `isAuthRequired()` false retourneert. Retourneert 403 (`AUTH_001`) wanneer een Bearer-token aanwezig maar ongeldig is, anders 401. Dwingt ook de routebeveiligingsniveaus (LOCAL_ONLY / ALWAYS_PROTECTED) af vóór elke authenticatievertakking — zie [Routebeveiligingsniveaus](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY-paden in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (momenteel: `/api/mcp/`) zijn toegankelijk vanaf niet-loopbackadressen wanneer de Bearer-sleutel het bereik `manage` bevat; alle andere LOCAL_ONLY-paden blijven strikt beperkt tot loopback, ongeacht het bereik.

Een geslaagde policy retourneert `AuthSubject` met `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Downstream-handlers kunnen dit lezen via `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts` in plaats van de authenticatielogica opnieuw uit te voeren.

## Lijst met openbare routes

`src/shared/constants/publicApiRoutes.ts` is de expliciete toelatingslijst:

De lijst is opgesplitst op basis van **vorm**, en deze opsplitsing is essentieel (GHSA-74g9-q8f6-793h): een prefix wordt vergeleken met `startsWith()`, waardoor deze ook overeenkomt met elk aangrenzend pad dat dezelfde begintekens heeft.
Met `/api/usage/om-usage` als prefix werd `/api/usage/om-usage<anything>` OPENBAAR, en Next herleidt dat tot `/api/usage/[connectionId]` — een handler zonder eigen authenticatie.

```ts
// Echte substructuren. Elk item MOET eindigen op "/" (gecontroleerd door een unit-test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // behandeld als CLIENT_API in classify, niet als openbaar zonder authenticatie
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Afzonderlijke routes, die EXACT overeenkomen (met of zonder afsluitende slash).
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

// Alleen-lezen afzonderlijke routes waarvoor ook de CORS-originversoepeling geldt.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Alleen-lezen afzonderlijke route ZONDER de CORS-versoepeling.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Alleen-lezen routes zijn uitsluitend openbaar voor **veilige** methoden. Let op: `classifyRoute()` sluit `/api/v1/*` en `/api/v1beta/*` uit van de terugval naar PUBLIC — deze zijn altijd `CLIENT_API`, zodat het beleid voor Bearer-sleutels van toepassing blijft.

## Een nieuwe route toevoegen

### Patroon 1 — Openbaar client-API-eindpunt (Bearer-authenticatie)

Routes onder `/api/v1/` en `/api/v1beta/` worden automatisch geclassificeerd als `CLIENT_API`. De middleware dwingt de Bearer-controle af; routehandlers hoeven deze niet opnieuw uit te voeren, maar kunnen het subject uitlezen als dat nuttig is.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handlerlogica
}
```

### Patroon 2 — Beheereindpunt (sessie of Bearer + manage)

Gebruik `requireManagementAuth()` uit `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handlerlogica
}
```

`requireManagementAuth()` retourneert `null` bij succes of een JSON-fout-`Response`:

- 401 `AUTH_001` "Authenticatie vereist" — er zijn helemaal geen referenties aanwezig
- 403 — ongeldige Bearer **of** Bearer aanwezig, maar de sleutel mist het bereik `manage` / `admin`

`hasManageScope(scopes)` retourneert true voor `"manage"` of `"admin"`.

### Patroon 3 — Toevoegen aan de openbare toelatingslijst

Kies de verzameling op basis van de vorm, niet op basis van gemak. Eén route hoort in `PUBLIC_API_ROUTES_EXACT` (of in `PUBLIC_READONLY_CORS_API_ROUTES` als deze alleen GET ondersteunt); alleen een echte substructuur hoort in `PUBLIC_API_ROUTE_PREFIXES`, en deze **moet eindigen op `/`**. Door één route in de prefixlijst te plaatsen, worden ook alle aangrenzende paden met dezelfde begintekens openbaar gemaakt — inclusief later toegevoegde siblings met dynamische segmenten (GHSA-74g9-q8f6-793h). Werk de unit-tests bij in `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` en `tests/unit/authz/classify.test.ts`.

## Scopes

Drie namespaces. Elke checker leest alleen zijn eigen strings. De vergelijking,
inclusief waarom `manage` faalt bij `scopeMatches` voor `read:compression` en waarom een
`read` access token geen `PATCH /api/keys/{id}` kan uitvoeren, is
[Drie scope namespaces](../frameworks/MCP-SERVER.md#drie-scope-namespaces).

API-sleutels bevatten een `scopes` array (opgeslagen als JSON in `api_keys.scopes`, zie `src/lib/db/apiKeys.ts`).

### Management scope

- `manage` / `admin` — `hasManageScope`. Bearer-toegang tot management API-routes.
- `mcp:connect`, `self:usage`, `self:account-quota`, en
  `policy:bypass-provider-quota` zijn additieve exact-match scopes. Ze vallen
  buiten `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` opent alleen de
  `/api/mcp/` non-loopback carve-out.

### MCP tool scopes

Catalogus en matchingregels (identieke string, of een toegekende scope eindigend op `*`):
[MCP tool scopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` in `src/shared/constants/mcpScopes.ts` is de originele getypeerde
subset, niet die volledige catalogus. Handhaving vindt plaats in
`open-sse/mcp-server/scopeEnforcement.ts` nadat `resolveCallerScopeContext()`
scopes oplost uit MCP auth info, request metadata, of `OMNIROUTE_MCP_SCOPES`.
Het blijft uitgeschakeld tenzij `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Access-token scopes

`read` / `write` / `admin` op `oma_live_…` tokens, gerangschikt door `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Deze rangschikking is alleen van toepassing op de
access-token credential. Zie [Management Authenticatie](../guides/MANAGEMENT-AUTH.md).

## Schakelaar voor vereiste authenticatie

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` bepaalt of **enige** authenticatie wordt afgedwongen voor een verzoek:

- `settings.requireLogin === false` → authenticatie is globaal uitgeschakeld, behalve voor het altijd beschermde niveau (zie [Route Guard-niveaus](../security/ROUTE_GUARD_TIERS.md)) en de aanroepen die een credential uitgeven dat het accepteert. Die vereisen dezelfde credential als wanneer aanmelding aan staat: synchronisatietokens uitgeven, CLI-toegangstokens met elke scope aanmaken, een API-sleutel met scope `manage`/`admin` aanmaken, die scope aan een sleutel toekennen, of zo'n sleutel opnieuw genereren of tonen (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`). Sleutels die alleen voor inferentie zijn, blijven open.
- Geen wachtwoord ingesteld **en** geen omgevingsvariabele `INITIAL_PASSWORD` → de bootstrapmodus staat de onboardingwizard en loopback-verzoeken toe, maar blootgestelde netwerkverzoeken hebben nog steeds credentials nodig.
- Elke databasefout → faalt gesloten (veilig per standaard).

Het afdwingen van client-API-sleutels gebruikt `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts`, en niet een directe lezing van `process.env.REQUIRE_API_KEY`. Dit is belangrijk voor uitgerolde instanties: `REQUIRE_API_KEY` wijzigen in Dashboard → Feature Flags slaat een databaseoverschrijving op en werkt meteen door op `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` en de andere authenticatiecontroles van de client-API die deze helper delen. Als de opslag van de featureflags niet kan worden gelezen, faalt de authenticatie van de client-API gesloten en vereist ze een sleutel.

## Incompatibele wijziging — v3.8.0

De eindpunten `/api/v1/agents/tasks/*` en `/api/resilience/model-cooldowns` **vereisen nu beheerauthenticatie** (commit `588a0333`). Clients die eerder een normale API-sleutel zonder de scope `manage` verzonden, ontvangen `403`. Migratie: wijs de scope `manage` toe aan de sleutel in het API Keys-dashboard of gebruik een aangemelde dashboardsessie.

## Gedragswijziging — v3.8.2

`/api/mcp/*` (de externe MCP-server) is standaard nog steeds LOCAL_ONLY, maar accepteert nu niet-loopbackrequests wanneer de header `Authorization: Bearer <api-key>` de scope `manage` bevat. De uitzondering wordt expliciet per pad beheerd via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts`; het verwante LOCAL_ONLY-prefix `/api/cli-tools/runtime/*` kan bewust NIET worden omzeild, omdat het willekeurige subprocessen kan starten. Anonieme requests naar `/api/mcp/*` die niet van loopback afkomstig zijn, blijven `403 LOCAL_ONLY` retourneren — de standaard voor elk nieuw LOCAL_ONLY-pad blijft strikt beperkt tot loopback. Zie [Route Guard-niveaus](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testen

- Unittests: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Openbare toelatingslijst: `tests/unit/public-api-routes.test.ts`.
- Gericht uitvoeren: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Foutopsporing

De pipeline voorziet antwoorden altijd van:

```
x-request-id:               <correlatie-id, herhaald in foutresponsen>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Voor geauthenticeerde verzoeken bevatten de upstream verzoekheaders (aan de handlerzijde) ook:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<laatste-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optioneel)
x-omniroute-auth-scopes:    door komma's gescheiden lijst
```

Gebruik `assertAuth(req, expectedClass)` in handlers — dit genereert een `AuthzAssertionError` met de code `AUTHZ_NOT_INITIALIZED` als de middleware is omzeild (nuttig om configuratieregressies in tests te detecteren).

## Zie ook

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — auth marker per eindpunt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auditlog voor auth-gebeurtenissen
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — drie scope-namespaces en MCP tool-scope catalogus
- Bron: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
