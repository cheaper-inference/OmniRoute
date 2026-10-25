# Authorization Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sanningskälla:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Senast uppdaterad:** 2026-09-22 — scope-namnrymder pekar på MCP-SERVER.md

OmniRoute har en ruttmedveten auktoriseringspipeline som spärrar varje API-förfrågan. Klassificeringen är **deterministisk** och **fail-closed** — allt som inte kan klassificeras hamnar som `MANAGEMENT` och kräver en session eller en token av management-kvalitet. Denna sida förklarar modellen för ingenjörer som underhåller rutter eller designar nya slutpunkter.

![AuthZ-pipeline (3 ruttklasser + policyutvärdering)](../diagrams/exported/authz-pipeline.svg)

> Källa: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Två autentiseringslägen

### 1. API-nyckel (Bearer)

Används för de OpenAI/Anthropic/Gemini-kompatibla klient-API:erna och ett fåtal hanteringsrutter när nyckeln har scopet `manage`.

```
Authorization: Bearer <api-key>
```

Valideras av `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` och återexporteras via `src/shared/utils/apiAuth.ts`. Validatorn accepterar även miljövariablerna `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som permanenta passthrough-nycklar (issue #1350).

### 2. Dashboard-session (auth_token-cookie)

För dashboardsidor och administrativa åtgärder.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

En cookie räknas som session endast när JWT:n verifieras **och** innehåller `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Varje konsument av cookien (dashboardens ruttvakt (`isDashboardSessionAuthenticated()`), förnyelsen i authz-pipelinen, WebSocket-handskakningen, live-servern, `/api/settings/require-login`, `/api/auth/status`) går genom den hjälpfunktionen. Andra JWT:er signerade med `JWT_SECRET` finns — Cursor CLI-passthrough utfärdar tokens med `iss "omniroute" / aud "cursor-cli"` till nyckelinnehavare — och är aldrig sessioner (#13298).

Verifieras av `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Pipelinen förnyar JWT:n automatiskt när den har mindre än 7 dagar kvar av sin livstid på 30 dagar.

En session kan upphöra innan de 30 dagarna har gått, eftersom varje utfärdare går genom `mintDashboardSessionToken` (med utfärdandetid `iat` och id `jti`) och verifieraren kontrollerar två inställningar: `sessionsValidAfter`, som sätts av ett lösenordsbyte så att varje session som utfärdats före det slutar verifieras (webbläsaren som bytte lösenordet får en ny cookie), och `revokedDashboardSessions`, dit `POST /api/auth/logout` lägger till den utloggade sessionens `jti`. Sessioner utfärdade av en äldre release saknar båda claims och förblir giltiga till första lösenordsbytet. Om inställningarna inte kan läsas litas inte på sessionen.

Vissa hanteringsrutter accepterar **antingen** läge: cookie ELLER `Bearer <key>` när API-nyckeln har scopet `manage` (eller `admin`). Det är detta som gör arbetsflödet "konfigurerbart via API-anrop", som lades till i v3.8, möjligt.

#### Valfri OIDC-inloggningsspärr (#6973)

Dashboardens administratörsinloggning stöder även ett **valfritt** OIDC-flöde (OpenID Connect) vid sidan av standardinloggningen med lösenord. Inloggningen med lösenord tas aldrig bort, den kompletteras bara:

- Inaktiverad om inte `settings.oidcEnabled === true` **och** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` är konfigurerade (Inställningar → Autentisering). `GET /api/auth/oidc/login` returnerar `400` annars.
- `GET /api/auth/oidc/login` hämtar `authorization_endpoint` från issuerns `/.well-known/openid-configuration` (faller tillbaka på `<issuer>/authorize`), bygger redirect-URI:n från den inkommande begäran (med hänsyn till `x-forwarded-proto`) och skickar användaren vidare till IdP:n med ett slumpmässigt `state` som lagras i en `httpOnly`-cookie `oidc_state`.
- `GET /api/auth/oidc/callback` validerar `state`, byter ut authorization code och verifierar ID-tokenets signatur via issuerns JWKS (`jose`:s `createRemoteJWKSet`, cachad per JWKS-URI) med kontroller av `issuer`/`audience`. Tillåtelselistan `oidcAllowedSubjects` krävs: den matchar tokenets `sub`-claim eller dess `email`-claim. Email-claimen beaktas bara när `email_verified === true`, så en overifierad e-postadress hos IdP:n kan aldrig passera spärren. Utan poster vägrar callbacken varje inloggning (`not_configured`).
- Vid lyckat resultat utfärdar den **exakt samma** 30-dagars `auth_token`-JWT som lösenordsinloggningen utfärdar (`src/app/api/auth/login/route.ts`), så resten av dashboardens sessionspipeline (automatisk förnyelse, cookie-flaggor) är oförändrad. OIDC ersätter bara hur cookien utfärdas, inte vad den ger.
- Varje `oidc*`-inställning (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) finns i `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` svarar `400 PASSWORD_REQUIRED` om inte body innehåller hanteringslösenordet som `currentPassword` (`401 PASSWORD_MISMATCH` när det är fel). `oidcDisablePasswordLogin` förbjuder lösenordsinloggning (`POST /api/auth/login`) men behåller det lagrade lösenordshashvärdet, och återautentisering kontrollerar fortfarande `currentPassword` mot det.
- `corsOrigins` och `bruteForceProtection` finns också i `SECURITY_IMPACTING_SETTINGS_KEYS`. Att lossa någon av dem försvagar inloggningsskydden, så de kräver samma återautentisering med `currentPassword` (fliken Säkerhet ber om den) och JSON-importen tar bort dem.
- Varje säkerhetspolicynyckel (posterna i `SECURITY_IMPACTING_SETTINGS_KEYS`, varje `oidc*`-nyckel och dashboardens sessionstillstånd) är **endast för operatören** på `PATCH /api/settings`. En API-nyckel med scopet `manage` eller en `oma_`-åtkomsttoken avvisas med `403` även när den skickar rätt `currentPassword`, och avvisningen granskas som `settings.update_failed` med `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` i `src/lib/api/operatorCredential.ts`). Vanliga inställningar (tema, visningspreferenser) förblir skrivbara för en `manage`-nyckel eller en `admin`-åtkomsttoken. Varje ändring av `/api/settings` själv (och av `/api/settings/require-login`) kräver också scopet `admin` för åtkomsttoken (`ADMIN_MUTATION_EXACT_PATHS` i `src/server/authz/accessScopes.ts`, exakt sökvägsmatchning). `GET` förblir `read`, och de övriga underrutterna under `/api/settings/*` (proxyer, combo-standarder, modellalias, komprimering, rensningar …) behåller den metodbaserade behörigheten `write`.
- `POST /api/settings/import-json` hoppar över den återautentiseringen, så den tar bort varje nyckel i `IMPORT_STRIPPED_SETTINGS_KEYS` (samma fil) innan den skriver: lösenordet och `currentPassword`, varje post i `SECURITY_IMPACTING_SETTINGS_KEYS` och dashboardens sessionstillstånd (`sessionsValidAfter`, `revokedDashboardSessions`). Att importera en äldre backup kan därför inte återuppliva en session som ett lösenordsbyte eller en utloggning har avslutat.

## Ruttklasser

`src/server/authz/types.ts` definierar tre klasser. Varje rutt som inte kan klassificeras deterministiskt faller tillbaka på `MANAGEMENT`.

| Klass        | Beskrivning                                                                                                                                               | Autentisering krävs                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PUBLIC`     | Uttryckligen säkra rutter: inloggning, utloggning, status, init, hälsokontroll och onboarding-bootstrap.                                                  | Ingen                                                            |
| `CLIENT_API` | Endpoints för modellservering: `/api/v1/*`, `/api/v1beta/*`, samt aliasen `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-nyckel när feature-flaggan `REQUIRE_API_KEY` är aktiverad |
| `MANAGEMENT` | Dashboardsidor, inställningar, leverantörer, nycklar, admin- och diagnostikendpoints.                                                                     | Dashboardsession ELLER Bearer med scopet `manage`                |

Vissa `MANAGEMENT`-åtgärder är **endast för operatören**: en nyckel med scopet `manage` räcker inte. Att exportera lagrade inloggningsuppgifter (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), återställa en backup över de aktuella datan (`POST /api/db-backups/import`, inklusive `dryRun=true`, `POST /api/db-backups` för återställning via id, `POST /api/settings/import-json`) och förstöra återställningspunkter (`DELETE /api/db-backups` för rensning, samt `PATCH /api/db-backups` eftersom den sparade retentionen styr den automatiska gallringen efter varje backup) kräver en dashboardsession, den lokala CLI-identiteten eller att inloggningen är avstängd. Att utfärda en synk-token (`POST /api/sync/tokens`) och att skapa en `admin`-åtkomsttoken för CLI (`POST /api/cli/tokens`) kräver en dashboardsession eller den lokala CLI-identiteten i alla inloggningslägen. API-nycklar med vilket scope som helst och `oma_`-åtkomsttokens är inte operatörsinloggningsuppgifter: de får `403` närhelst en sådan krävs. Kontrollen finns i `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Ändring av inloggningsinställningarna är också endast för operatören: `POST /api/settings/require-login` (sätt hanteringslösenordet / växla `requireLogin`) accepterar bara dessa uppgifter när ett lösenord väl finns. Bootstrap-fönstret vid första start (inget lösenord ännu) är oförändrat. En dashboardsession måste skicka `currentPassword` för att ersätta lösenordet (`403` när det saknas eller är fel, granskat som `settings.update_failed`). Den lokala CLI:n och en instans med avstängd inloggning behåller återställningsvägen och får sätta ett lösenord utan det, eftersom båda är bundna till värden som äger datakatalogen.

## Pipeline

```
Inkommande begäran → src/proxy.ts
  → runAuthzPipeline() i src/server/authz/pipeline.ts
    1. Ta bort betrodda interna headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generera begärande-id, klassificera rutten via classifyRoute()
    3. Om pathname == "/" → omdirigera till /dashboard
    4. Om systemet töms (ordnad nedstängning) och /api/* → 503
    5. Om icke-GET /api/* → kontrollera med skyddet checkBodySize()
    6. Om OPTIONS → CORS-förhandskontroll 204
    7. Om options.enforce == false → släpp igenom med headers för ruttklass
    8. Annars: POLICIES[routeClass].evaluate(ctx)
       - allow  → stämpla x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON-fel med correlation_id (kontrollpanelsidor → 302 /login)
```

Betrodda interna headers (definierade i `src/server/authz/headers.ts`) **tas bort från inkommande begäranden** före klassificering — klienter kan inte fylla i `x-omniroute-auth-*` i förväg för att utge sig för att vara ett subjekt.

### Policykontrakt

Varje ruttklass har en policy i `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnerar alltid `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extraherar Bearer och validerar via `validateApiKey()`. Fortsätter till anonym åtkomst endast när den effektiva funktionsflaggan `REQUIRE_API_KEY` är inaktiverad. Den effektiva flaggan fastställs via `isRequireApiKeyEnabled()` (`åsidosättning av databasens funktionsflagga > process.env.REQUIRE_API_KEY > standardvärde`), så att kontrollpanelens funktionsflaggor och miljövariabler styr `/api/v1/*`, `/api/v1beta/*` och alias konsekvent; fel i resolvern resulterar i nekad åtkomst. Tillåter begäranden med kontrollpanelssession på klient-API-rutter (inklusive `/api/v1/models`, som används av kontrollpanelens modellkatalog).
- **`managementPolicy`** (`policies/management.ts`) — accepterar kontrollpanelssessioner, interna begäranden om modellsynkronisering (matchade mot `/api/providers/[name]/(sync-models|models)`), eller hoppar över kontrollen helt om `isAuthRequired()` returnerar false. Returnerar 403 (`AUTH_001`) när en Bearer-token finns men är ogiltig, annars 401. Tillämpar även ruttskyddsnivåerna (LOCAL_ONLY / ALWAYS_PROTECTED) före varje autentiseringsgren — se [Ruttskyddsnivåer](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY-sökvägar i `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (för närvarande: `/api/mcp/`) kan nås från andra adresser än loopback när Bearer-nyckeln har omfånget `manage`; alla andra LOCAL_ONLY-sökvägar förblir strikt begränsade till loopback oavsett omfång.

En lyckad policy returnerar `AuthSubject` med `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Efterföljande hanterare kan läsa det via `assertAuth(request, "CLIENT_API")` i `src/server/authz/assertAuth.ts` i stället för att köra autentiseringslogiken igen.

## Lista över publika routes

`src/shared/constants/publicApiRoutes.ts` är den uttryckliga tillåtelselistan:

Listan är uppdelad efter **form**, och uppdelningen är säkerhetskritisk (GHSA-74g9-q8f6-793h): ett prefix matchas med `startsWith()`, så det matchar även alla intilliggande sökvägar som delar dess inledande tecken. När `/api/usage/om-usage` användes som prefix blev `/api/usage/om-usage<anything>` PUBLIK, och Next matchar detta mot `/api/usage/[connectionId]` — en hanterare som saknar egen autentisering.

```ts
// Verkliga underträd. Varje post MÅSTE sluta med "/" (verifieras av ett enhetstest).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // behandlas som CLIENT_API i classify, inte som "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Enskilda routes, matchas EXAKT (med eller utan avslutande snedstreck).
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

// Skrivskyddade enskilda routes som även får det mindre restriktiva CORS-ursprunget.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Skrivskyddad enskild route UTAN det mindre restriktiva CORS-ursprunget.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Skrivskyddade routes är publika **endast** för säkra metoder. Obs! `classifyRoute()` undantar `/api/v1/*` och `/api/v1beta/*` från reservklassificeringen PUBLIC — dessa är alltid `CLIENT_API`, så policyn för Bearer-nycklar gäller fortfarande.

## Lägga till en ny route

### Mönster 1 — Publik klient-API-endpoint (Bearer-autentisering)

Routes under `/api/v1/` och `/api/v1beta/` klassificeras automatiskt som `CLIENT_API`. Middleware-komponenten genomdriver Bearer-kontrollen; route-hanterare behöver inte upprepa den, men kan läsa subjektet om det är användbart.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... hanterarlogik
}
```

### Mönster 2 — Administrationsendpoint (session eller Bearer + manage)

Använd `requireManagementAuth()` från `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... hanterarlogik
}
```

`requireManagementAuth()` returnerar `null` vid lyckat resultat eller ett JSON-fel som `Response`:

- 401 `AUTH_001` "Autentisering krävs" — inga autentiseringsuppgifter alls
- 403 — ogiltig Bearer **eller** Bearer finns, men nyckeln saknar omfånget `manage` / `admin`

`hasManageScope(scopes)` returnerar true för `"manage"` eller `"admin"`.

### Mönster 3 — Lägga till i den publika tillåtelselistan

Välj uppsättning efter form, inte efter bekvämlighet. En enskild route ska placeras i `PUBLIC_API_ROUTES_EXACT` (eller i `PUBLIC_READONLY_CORS_API_ROUTES` om den endast stöder GET); endast ett verkligt underträd ska placeras i `PUBLIC_API_ROUTE_PREFIXES`, och det **måste sluta med `/`**. Om en enskild route placeras i prefixlistan blir även alla intilliggande sökvägar som delar dess inledande tecken publika — inklusive syskon med dynamiska segment som läggs till senare (GHSA-74g9-q8f6-793h). Uppdatera enhetstesterna i `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` och `tests/unit/authz/classify.test.ts`.

## Omfattningar

Tre namnutrymmen. Varje kontrollant läser endast sina egna strängar. Jämförelsen, inklusive varför `manage` misslyckas med `scopeMatches` för `read:compression` och varför en `read` åtkomsttoken inte kan `PATCH /api/keys/{id}`, finns i [Three scope namespaces](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API-nycklar innehåller en `scopes`-array (lagrad som JSON i `api_keys.scopes`, se `src/lib/db/apiKeys.ts`).

### Hanteringsomfattning

- `manage` / `admin` — `hasManageScope`. Bearer-åtkomst till hanterings-API-rutter.
- `mcp:connect`, `self:usage`, `self:account-quota` och
  `policy:bypass-provider-quota` är additiva exakta matchningsomfattningar. De ligger
  utanför `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` öppnar endast
  `/api/mcp/` non-loopback-utskärningen.

### MCP-verktygsomfattningar

Katalog och matchningsregler (identisk sträng, eller en beviljad omfattning som slutar med `*`):
[MCP tool scopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` i `src/shared/constants/mcpScopes.ts` är den ursprungliga typade
delmängden, inte den fullständiga katalogen. Verkställighet körs i
`open-sse/mcp-server/scopeEnforcement.ts` efter att `resolveCallerScopeContext()`
löser omfattningar från MCP-autentiseringsinformation, begärans metadata eller `OMNIROUTE_MCP_SCOPES`.
Den är avstängd om inte `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Åtkomsttoken-omfattningar

`read` / `write` / `admin` på `oma_live_…` tokens, rankade av `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Denna rankning gäller endast för åtkomsttoken-
autentiseringsuppgiften. Se [Management Authentication](../guides/MANAGEMENT-AUTH.md).

## Växling av autentiseringskrav

`isAuthRequired()` i `src/shared/utils/apiAuth.ts` avgör om **någon** autentisering alls tillämpas för en begäran:

- `settings.requireLogin === false` → autentisering är globalt avstängd, förutom för den alltid skyddade nivån (se [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) och anropen som lämnar ut en inloggningsuppgift som den accepterar. Dessa kräver samma inloggningsuppgift som med inloggning påslagen: utfärdande av synk-tokens, utfärdande av CLI-åtkomsttokens med vilket scope som helst, och skapande av en API-nyckel med scopet `manage`/`admin`, beviljande av det scopet till en nyckel, eller förnyelse eller visning av en sådan nyckel (`requireCredentialForManagementScopedKey()` i `src/lib/api/requireManagementAuth.ts`). Nycklar för enbart inferens förblir öppna.
- Inget lösenord konfigurerat **och** ingen miljövariabel `INITIAL_PASSWORD` → bootstrap-läget tillåter introduktionsguiden och loopback-begäranden, men exponerade nätverksbegäranden kräver fortfarande inloggningsuppgifter.
- Vid varje DB-fel nekas åtkomst (säkert som standard).

Klientens API-nyckelkontroll använder `isRequireApiKeyEnabled()` i `src/shared/utils/featureFlags.ts`, inte en direkt läsning av `process.env.REQUIRE_API_KEY`. Detta är viktigt för driftsatta instanser: att växla `REQUIRE_API_KEY` i Dashboard → Feature Flags sparar en DB-åsidosättning och påverkar omedelbart `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` och andra autentiseringskontroller för klient-API:et som delar denna hjälpfunktion. Om feature-flaggelagret inte kan läsas nekas klient-API-autentiseringen åtkomst och en nyckel krävs.

## Bakåtinkompatibel ändring — v3.8.0

Slutpunkterna `/api/v1/agents/tasks/*` och `/api/resilience/model-cooldowns` **kräver nu hanteringsautentisering** (commit `588a0333`). Klienter som tidigare skickade en vanlig API-nyckel utan omfattningen `manage` får `403`. Migrering: tilldela antingen nyckeln omfattningen `manage` i instrumentpanelen för API-nycklar eller använd en inloggad instrumentspanelsession.

## Beteendeförändring — v3.8.2

`/api/mcp/*` (MCP-fjärrservern) är fortfarande LOCAL_ONLY som standard men accepterar nu begäranden som inte kommer från loopback när rubriken `Authorization: Bearer <api-key>` innehåller omfattningen `manage`. Undantaget styrs uttryckligen per sökväg via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` i `src/server/authz/routeGuard.ts`; det närliggande LOCAL_ONLY-prefixet `/api/cli-tools/runtime/*` kan avsiktligt INTE kringgås eftersom det kan starta godtyckliga underprocesser. Anonyma begäranden till `/api/mcp/*` som inte kommer från loopback fortsätter att returnera `403 LOCAL_ONLY` — standarden för alla nya LOCAL_ONLY-sökvägar förblir strikt loopback. Se [Nivåer för route guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testning

- Enhetstester: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Offentlig tillåtelselista: `tests/unit/public-api-routes.test.ts`.
- Kör fokuserat: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Felsökning

Pipelinen stämplar alltid svar med:

```
x-request-id:               <korrelations-id, återges i felmeddelandets brödtext>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

För autentiserade begäranden inkluderar begärandehuvudena uppströms (på hanterarsidan) även:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (valfritt)
x-omniroute-auth-scopes:    kommaseparerad lista
```

Använd `assertAuth(req, expectedClass)` inuti hanterare — den utlöser `AuthzAssertionError` med koden `AUTHZ_NOT_INITIALIZED` om mellanprogramvaran kringgicks (användbart för att upptäcka konfigurationsregressioner i tester).

## Se även

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentiseringsmarkör per slutpunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — granskningslogg för autentiseringshändelser
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tre omfångsnamnrymder och MCP verktygsomfångskatalog
- Källa: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
