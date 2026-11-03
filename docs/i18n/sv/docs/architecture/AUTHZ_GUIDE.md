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

Används för de OpenAI-/Anthropic-/Gemini-kompatibla klient-API:erna och några hanteringsrutter när nyckeln har behörighetsomfånget `manage`.

```
Authorization: Bearer <api-key>
```

Valideras av `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` och återexporteras via `src/shared/utils/apiAuth.ts`. Valideraren godtar även miljövariablerna `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som permanenta passthrough-nycklar (ärende #1350).

### 2. Dashboard-session (auth_token-kaka)

För dashboard-sidor och administratörsåtgärder.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

En kaka är endast en session när JWT:n verifieras **och** innehåller `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Varje
konsument av kakan (dashboardens ruttskydd (`isDashboardSessionAuthenticated()`), uppdatering i authz-pipelinen, WebSocket-handskakning, live-
servern, `/api/settings/require-login`, `/api/auth/status`) använder den hjälpfunktionen.
Det finns andra JWT:er som signerats med `JWT_SECRET` — Cursor CLI-passthrough skapar
token med `iss "omniroute" / aud "cursor-cli"` åt nyckelinnehavare — och de är aldrig sessioner
(#13298).

Verifieras av `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Pipelinen uppdaterar automatiskt JWT:n när mindre än 7 dagar återstår av dess 30 dagar långa livslängd.

En session kan också avslutas innan dess 30 dagar har gått, eftersom varje utfärdare använder `mintDashboardSessionToken` (en utfärdandetid `iat` och ett id `jti`) och verifieraren kontrollerar två inställningar: `sessionsValidAfter`, som ställs in vid ett lösenordsbyte så att alla sessioner som utfärdats dessförinnan inte längre kan verifieras (webbläsaren där lösenordet ändrades får en ny kaka), och `revokedDashboardSessions`, där `POST /api/auth/logout` lägger till den utloggade sessionens `jti`. Sessioner som skapats av en äldre version innehåller inget av dessa anspråk och förblir giltiga fram till det första lösenordsbytet. Om inställningarna inte kan läsas betraktas sessionen inte som betrodd.

Vissa hanteringsrutter accepterar **endera** läget: kaka ELLER `Bearer <key>` när API-nyckeln har behörighetsomfånget `manage` (eller `admin`). Det är detta som möjliggör arbetsflödet ”konfigurerbart via API-anrop” som lades till i v3.8.

#### Valfri OIDC-inloggningsspärr (#6973)

Administratörsinloggningen till dashboarden stöder även ett **valfritt** OIDC-flöde (OpenID Connect)
vid sidan av den förvalda lösenordsinloggningen — lösenordsinloggningen tas aldrig bort utan
kompletteras endast:

- Inaktiverat om inte `settings.oidcEnabled === true` **och** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` alla är konfigurerade (Inställningar → Autentisering).
  `GET /api/auth/oidc/login` returnerar annars `400`.
- `GET /api/auth/oidc/login` identifierar `authorization_endpoint` från
  utfärdarens `/.well-known/openid-configuration` (faller tillbaka till
  `<issuer>/authorize`), skapar omdirigerings-URI:n från den inkommande begäran
  (med stöd för `x-forwarded-proto`) och omdirigerar till IdP:n med ett slumpmässigt `state`
  som lagras i en `httpOnly`-cookie med namnet `oidc_state`.
- `GET /api/auth/oidc/callback` validerar `state`, växlar auktoriseringskoden
  och verifierar ID-tokenens signatur via utfärdarens JWKS
  (`jose`:s `createRemoteJWKSet`, cachelagrad per JWKS-URI) med kontroller av
  `issuer`/`audience`. Åtkomst till instrumentpanelen kräver en icke-tom
  `oidcAllowedSubjects`-lista, en `oidcAdmissionClaim`-policy eller båda.
  Listan över subjekt matchar `sub` eller `email` endast när
  `email_verified === true`. Den valfria anspråkspolicyn tar en punktseparerad
  sökväg till ett anspråk i ID-tokenen (till exempel `realm_access.roles`) och
  en matris med accepterade värden; det uppslagna anspråket måste vara en matris
  med strängar som innehåller minst ett accepterat värde. Om båda policyerna är
  konfigurerade måste båda godkännas. Saknade eller felaktigt utformade anspråk
  nekas, och utan någon av policyerna vägrar callback-rutten inloggning
  (`not_configured`). Befintliga konfigurationer som enbart använder subjekt
  fortsätter att fungera oförändrade.
- Keycloak mappar normalt realm-roller till åtkomsttoken, men inte nödvändigtvis
  till ID-token. Om du vill kräva realm-rollen `admin` konfigurerar du en
  protokollmappare för den här klienten som inkluderar `realm_access.roles` i
  dess **ID-token** och ställer sedan in `oidcAdmissionClaim` på
  `{ "path": "realm_access.roles", "values": ["admin"] }`. Kontrollera det
  faktiska anspråket i ID-tokenen för den här klienten innan du aktiverar åtkomst
  enbart baserad på roller; programmet läser inte roller från åtkomsttoken.
  Tokenvägran på IdP-sidan kan komplettera men ersätter inte den här kontrollen
  på programsidan.
- Vid framgång skapas **exakt samma** 30-dagars `auth_token`-JWT som utfärdas
  vid lösenordsinloggning (`src/app/api/auth/login/route.ts`), så resten av
  sessionsflödet för instrumentpanelen (automatisk förnyelse, cookieflaggor)
  förblir oförändrat — OIDC ersätter endast hur cookien skapas, inte vilka
  rättigheter den ger. Ändringar av roller eller grupper hos IdP:n ogiltigförklarar
  inte befintliga OmniRoute-sessioner; utloggning, lösenordsrotation eller
  sessionsutgång styr fortfarande deras livslängd.
- Varje `oidc*`-inställning (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) finns i
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  svarar med `400 PASSWORD_REQUIRED` om inte begärandetexten innehåller
  administrationslösenordet som `currentPassword` (`401 PASSWORD_MISMATCH` om
  det är felaktigt). `oidcDisablePasswordLogin` nekar _inloggning_ med lösenord
  (`POST /api/auth/login`) men behåller den lagrade lösenordshashen, och
  återautentisering kontrollerar fortfarande `currentPassword` mot den.
- `corsOrigins` och `bruteForceProtection` finns också i
  `SECURITY_IMPACTING_SETTINGS_KEYS`: att göra någon av dem mindre strikt
  försvagar inloggningsskyddet, så de kräver samma återautentisering med
  `currentPassword` (fliken Säkerhet frågar efter det), och JSON-importen
  utelämnar dem.
- Varje säkerhetspolicynyckel — posterna i `SECURITY_IMPACTING_SETTINGS_KEYS`,
  varje `oidc*`-nyckel och instrumentpanelens sessionstillstånd — är **endast
  för operatörer** på `PATCH /api/settings`: en API-nyckel med `manage`-omfång
  eller en `oma_`-åtkomsttoken nekas med `403` även när den skickar rätt
  `currentPassword`, och nekandet loggas i granskningsloggen som
  `settings.update_failed` med `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` i `src/lib/api/operatorCredential.ts`).
  Vanliga inställningar (tema, visningsinställningar) förblir skrivbara med en
  `manage`-nyckel eller en `admin`-åtkomsttoken. Varje ändring av
  `/api/settings` i sig (och av `/api/settings/require-login`) kräver dessutom
  åtkomsttokenomfånget `admin` (`ADMIN_MUTATION_EXACT_PATHS` i
  `src/server/authz/accessScopes.ts`, exakt sökvägsmatchning); `GET` förblir
  `read`, och de andra `/api/settings/*`-underrutterna (proxyservrar,
  kombinationsstandardvärden, modellalias, komprimering, rensningar …) behåller
  det metodhärledda `write`-omfånget.
- `POST /api/settings/import-json` hoppar över den återautentiseringen och
  utelämnar därför varje nyckel i `IMPORT_STRIPPED_SETTINGS_KEYS` (samma fil)
  före skrivning: lösenordet och `currentPassword`, varje post i
  `SECURITY_IMPACTING_SETTINGS_KEYS` samt instrumentpanelens sessionstillstånd
  (`sessionsValidAfter`, `revokedDashboardSessions`). Import av en äldre
  säkerhetskopia kan därför inte återaktivera en session som redan avslutats
  genom ett lösenordsbyte eller en utloggning.

## Ruttklasser

`src/server/authz/types.ts` definierar tre klasser. Varje rutt som inte kan klassificeras deterministiskt faller tillbaka på `MANAGEMENT`.

| Klass        | Beskrivning                                                                                                                                               | Autentisering krävs                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PUBLIC`     | Uttryckligen säkra rutter: inloggning, utloggning, status, init, hälsokontroll och onboarding-bootstrap.                                                  | Ingen                                                            |
| `CLIENT_API` | Endpoints för modellservering: `/api/v1/*`, `/api/v1beta/*`, samt aliasen `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-nyckel när feature-flaggan `REQUIRE_API_KEY` är aktiverad |
| `MANAGEMENT` | Dashboardsidor, inställningar, leverantörer, nycklar, admin- och diagnostikendpoints.                                                                     | Dashboardsession ELLER Bearer med scopet `manage`                |

Vissa `MANAGEMENT`-åtgärder är **endast för operatören**: en nyckel med scopet `manage` räcker inte. Att exportera lagrade inloggningsuppgifter (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), återställa en backup över de aktuella datan (`POST /api/db-backups/import`, inklusive `dryRun=true`, `POST /api/db-backups` för återställning via id, `POST /api/settings/import-json`) och förstöra återställningspunkter (`DELETE /api/db-backups` för rensning, samt `PATCH /api/db-backups` eftersom den sparade retentionen styr den automatiska gallringen efter varje backup) kräver en dashboardsession, den lokala CLI-identiteten eller att inloggningen är avstängd. Att utfärda en synk-token (`POST /api/sync/tokens`) och att skapa en `admin`-åtkomsttoken för CLI (`POST /api/cli/tokens`) kräver en dashboardsession eller den lokala CLI-identiteten i alla inloggningslägen. API-nycklar med vilket scope som helst och `oma_`-åtkomsttokens är inte operatörsinloggningsuppgifter: de får `403` närhelst en sådan krävs. Kontrollen finns i `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Ändring av inloggningsinställningarna är också endast för operatören: `POST /api/settings/require-login` (sätt hanteringslösenordet / växla `requireLogin`) accepterar bara dessa uppgifter när ett lösenord väl finns. Bootstrap-fönstret vid första start (inget lösenord ännu) är oförändrat. En dashboardsession måste skicka `currentPassword` för att ersätta lösenordet (`403` när det saknas eller är fel, granskat som `settings.update_failed`). Den lokala CLI:n och en instans med avstängd inloggning behåller återställningsvägen och får sätta ett lösenord utan det, eftersom båda är bundna till värden som äger datakatalogen.

## Rörledning

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

Pålitliga interna rubriker (definierade i `src/server/authz/headers.ts`) är** tas bort från inkommande förfrågningar** före klassificering kan — -klienter inte förfylla `x-omniroute-auth-*` för att imitera ett subjekt.

### Försäkringsavtal

Varje ruttklass har en policy i `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnerar alltid `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extraherar bärare, validerar via `validateApiKey()`. Går igenom till anonym endast när den effektiva `REQUIRE_API_KEY` funktionsflaggan är inaktiverad. Den effektiva flaggan löses genom `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) så Dashboard-funktionsflaggor och miljövariabler styr `/api/v1/*`, `/api/v1beta/*` och alias konsekvent; resolver misslyckanden stängs. Tillåter förfrågningar om instrumentpanelsessioner på klientens API rutter (inklusive `/api/v1/models`, som används av instrumentpanelens modellkatalog). När Entra ID SSO är aktiverat, hanteras en bärare som strukturellt är en Entra-token (tre base64url-segment, `RS*` alg, `kid`) av SSO -grenen** före** `validateApiKey()` och dess dom är slutgiltig — den faller aldrig igenom API-nyckelns sökväg eller grenen degradera till anonym, så ett avbrott i identitetsleverantören kan inte bli öppen åtkomst. Statiska API nycklar påverkas inte. Se [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — accepterar instrumentpanelsessioner, interna modellsynkroniseringsbegäranden (matchad mot `/api/providers/[name]/(sync-models|models)`), eller hoppar över helt om `isAuthRequired()` returnerar falskt. Returnerar 403 (`AUTH_001`) när en bärartoken är närvarande men ogiltig, 401 annars. Upprätthåller också ruttskyddsnivåerna (LOCAL_ONLY / ALWAYS_PROTECTED) före någon auktoritetsgren — se [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY vägar i `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (idag: `/api/mcp/`) kan nås från icke-loopback när bärarnyckeln bär `manage` omfattningen; alla andra LOCAL_ONLY -vägar förblir strikt-loopback oavsett omfattning.

En framgångsrik policy returnerar `AuthSubject` med `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Nedströmshanterare kan läsa den via `assertAuth(request, "CLIENT_API")` i `src/server/authz/assertAuth.ts` istället för att köra autentiseringslogik igen.

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
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

För autentiserade förfrågningar inkluderar uppströms (hanterare-sidan) förfrågningsrubriker också:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Använd `assertAuth(req, expectedClass)` inuti hanterare — den kastar `AuthzAssertionError` med koden `AUTHZ_NOT_INITIALIZED` om mellanvaran förbigicks (användbart för att fånga konfigurationsregressioner i tester).

## Se även

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentiseringsmarkör per slutpunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — granskningslogg för autentiseringshändelser
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tre omfångsnamnrymder och MCP verktygsomfångskatalog
- Källa: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
