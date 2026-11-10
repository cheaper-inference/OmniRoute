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

Används för de OpenAI-/Anthropic-/Gemini-kompatibla klient-API:erna och vissa administrationsrutter när nyckeln har scopet `manage`.

```
Authorization: Bearer <api-key>
```

Valideras av `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` och exporteras vidare via `src/shared/utils/apiAuth.ts`. Valideraren accepterar även miljövariablerna `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som beständiga vidarebefordringsnycklar (issue #1350).

### 2. Dashboard-session (auth_token-cookie)

För dashboardsidor och administratörsåtgärder.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

En cookie är endast en session när JWT-token verifieras **och** innehåller `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Varje
konsument av cookien (guard för dashboard-rutter (`isDashboardSessionAuthenticated()`), uppdatering i auktoriseringspipelinen, WebSocket-handskakning, live-servern, `/api/settings/require-login`, `/api/auth/status`) går via den hjälpfunktionen.
Det finns andra JWT-token som signerats med `JWT_SECRET` — Cursor CLI-genomströmningen skapar
`iss "omniroute" / aud "cursor-cli"`-token för nyckelinnehavare — och de är aldrig sessioner
(#13298).

Verifieras av `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Pipelinen uppdaterar automatiskt JWT-token när den har mindre än 7 dagar kvar av sin livslängd på 30 dagar.

En session kan också avslutas innan de 30 dagarna har gått, eftersom varje utfärdare går via `mintDashboardSessionToken` (en utfärdandetid `iat` och ett id `jti`) och verifieraren kontrollerar två inställningar: `sessionsValidAfter`, som anges vid ett lösenordsbyte så att varje session som utfärdats före det slutar att verifieras (webbläsaren som ändrade lösenordet får en ny cookie), samt `revokedDashboardSessions`, som `POST /api/auth/logout` lägger till den utloggade sessionens `jti` i. Sessioner som utfärdats av en äldre version saknar båda anspråken och förblir giltiga tills det första lösenordsbytet. Om inställningarna inte kan läsas litar systemet inte på sessionen.

Vissa administrationsrutter accepterar **endera** läget: cookie ELLER `Bearer <key>` när API-nyckeln har scopet `manage` (eller `admin`). Detta möjliggör arbetsflödet ”konfigurerbar via API-anrop” som lades till i v3.8.

#### Valfri OIDC-inloggningsspärr (#6973)

Dashboardens administratörsinloggning stöder även ett **opt-in**-flöde för OIDC (OpenID Connect)
vid sidan av den förvalda lösenordsinloggningen — lösenordsinloggning tas aldrig bort, utan
kompletteras endast:

- Inaktiverat om inte `settings.oidcEnabled === true` **och** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` alla är konfigurerade (Inställningar → Autentisering).
  `GET /api/auth/oidc/login` returnerar annars `400`.
- `GET /api/auth/oidc/login` hittar `authorization_endpoint` från utfärdarens
  `/.well-known/openid-configuration` (faller tillbaka till
  `<issuer>/authorize`), bygger omdirigerings-URI:n från den inkommande begäran
  (med hänsyn till `x-forwarded-proto`) och omdirigerar till IdP:n med ett slumpmässigt
  `state` som lagras i en `httpOnly`-cookie med namnet `oidc_state`.
- `GET /api/auth/oidc/callback` validerar `state`, byter auktoriseringskoden mot
  token och verifierar ID-tokenens signatur via utfärdarens JWKS
  (`jose`'s `createRemoteJWKSet`, cachad per JWKS-URI) med kontroller av
  `issuer`/`audience`. Åtkomst till dashboarden kräver en icke-tom lista med
  `oidcAllowedSubjects`, en policy för `oidcAdmissionClaim` eller båda. Ämneslistan
  matchar endast `sub` eller `email` när `email_verified === true`. Den valfria
  claim-policyn använder en punktseparerad sökväg till ett ID-token-claim
  (till exempel `realm_access.roles`) och en array med accepterade värden; det
  upplösta claimet måste vara en array med strängar som innehåller minst ett
  accepterat värde. Om båda policyerna är konfigurerade måste båda godkännas.
  Saknade eller felaktigt formaterade claims leder till nekad åtkomst, och utan
  någon av policyerna nekar callbacken inloggning (`not_configured`).
  Befintliga konfigurationer som endast använder ämnen fortsätter att fungera
  oförändrat.
- Keycloak mappar normalt realm-roller till access-token, inte nödvändigtvis
  till ID-token. Om realm-rollen `admin` ska krävas konfigurerar du en
  protokollmapper för denna klient som inkluderar `realm_access.roles` i dess
  **ID-token** och anger sedan `oidcAdmissionClaim` till
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Kontrollera det faktiska ID-token-claimet för denna klient innan du aktiverar
  rollbaserad åtkomst; applikationen läser inte roller från access-token.
  Tokennekning på IdP-sidan kan komplettera, men ersätter inte, denna kontroll
  på applikationssidan.
- Vid lyckad inloggning skapar systemet exakt samma 30-dagars-`auth_token`-JWT
  som lösenordsinloggningen utfärdar (`src/app/api/auth/login/route.ts`), så resten
  av dashboardens sessionspipeline (automatisk uppdatering, cookie-flaggor) är
  oförändrad — OIDC ersätter endast hur cookien skapas, inte vad den ger åtkomst
  till. Ändringar av IdP-roller eller grupper ogiltigförklarar inte befintliga
  OmniRoute-sessioner; utloggning, lösenordsrotation eller sessionens utgång styr
  fortfarande deras livslängd.
- Varje `oidc*`-inställning (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) finns i
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  svarar med `400 PASSWORD_REQUIRED` om inte begäran innehåller
  administratörslösenordet som `currentPassword` (`401 PASSWORD_MISMATCH` när
  det är fel). `oidcDisablePasswordLogin` nekar lösenords_ inloggning_ (`POST /api/auth/login`)
  men behåller det lagrade lösenordshashvärdet, och ny autentisering kontrollerar
  fortfarande `currentPassword` mot det.
- `corsOrigins` och `bruteForceProtection` finns också i
  `SECURITY_IMPACTING_SETTINGS_KEYS`: om någon av dem görs mindre strikt försvagas
  inloggningsskyddet, så de kräver samma nya autentisering med `currentPassword`
  (fliken Säkerhet frågar efter det), och JSON-importen tar bort dem.
- Varje säkerhetspolicy-nyckel — posterna i `SECURITY_IMPACTING_SETTINGS_KEYS`,
  alla `oidc*`-nycklar och dashboardens sessionstillstånd — är **endast för
  operatörer** vid `PATCH /api/settings`: en API-nyckel med `manage`-omfattning
  eller en `oma_`-åtkomsttoken nekas med `403` även om den skickar rätt
  `currentPassword`, och nekandet loggas som
  `settings.update_failed` med `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` i `src/lib/api/operatorCredential.ts`).
  Vanliga inställningar (tema, visningsinställningar) kan fortfarande skrivas
  med en `manage`-nyckel eller en `admin`-åtkomsttoken. Varje ändring av
  `/api/settings` (och av `/api/settings/require-login`) kräver dessutom
  åtkomsttokenens `admin`-omfattning
  (`ADMIN_MUTATION_EXACT_PATHS` i `src/server/authz/accessScopes.ts`, matchning
  av exakt sökväg); `GET` förblir `read`, och de övriga `/api/settings/*`-underliggande
  rutterna (proxyservrar, kombinationsstandardvärden, modellalias,
  komprimering, rensningar …) behåller omfattningen `write` som härleds från
  metoden.
- `POST /api/settings/import-json` hoppar över denna nya autentisering och tar
  därför bort varje nyckel i `IMPORT_STRIPPED_SETTINGS_KEYS` (samma fil) innan
  skrivning: lösenordet och `currentPassword`, varje post i
  `SECURITY_IMPACTING_SETTINGS_KEYS` samt dashboardens sessionstillstånd
  (`sessionsValidAfter`, `revokedDashboardSessions`).
  Om en äldre säkerhetskopia importeras kan den därför inte återuppliva en
  session som redan avslutats genom ett lösenordsbyte eller en utloggning.

#### Valfri TOTP-inloggning med tvåfaktorsautentisering (#16619)

Registreras från Inställningar → Säkerhet; inaktiverad tills operatören aktiverar
den (`src/server/auth/dashboardMfa.ts`).

- **Detta omfattar:** lösenordsinloggning (`POST /api/auth/login`, som därefter kräver
  `POST /api/auth/mfa/verify`) och `omniroute connect` (`POST /api/cli/connect`,
  som avvisar ett utbyte med enbart lösenord och tar emot koden som `totp`).
- **Detta omfattar inte:** OIDC-/SSO-inloggning (`/api/auth/oidc/callback`) ber inte
  om OmniRoute TOTP. Den förlitar sig på identitetsleverantörens egen andra faktor,
  så framtvinga MFA i IdP:n om OIDC är aktiverat.
- **Återställning** (förlorad enhet, inga återställningskoder kvar eller en faktor som
  inte längre kan verifieras, till exempel efter att `STORAGE_ENCRYPTION_KEY` har
  ändrats):
  1. Starta om servern med `OMNIROUTE_DISABLE_MFA=true`.
  2. Logga in på själva värden (loopback-peer och loopback-`Host`, till exempel
     `http://localhost:20128`) med lösenordet. Den andra faktorn hoppas över endast
     för det ursprunget; alla andra ursprung kräver fortfarande koden.
  3. I Inställningar → Säkerhet → Inaktivera anger du lösenordet och lämnar koden
     tom. `POST /api/auth/mfa/disable` accepterar en body utan `code` endast medan
     variabeln är satt och begäran kommer från värden; den kräver fortfarande
     dashboard-sessionen och det aktuella lösenordet och loggas som
     `auth.mfa.disabled` med `secondFactor: "recovery_switch"`.
  4. Avaktivera `OMNIROUTE_DISABLE_MFA`, starta om och registrera igen vid behov.

## Ruttklasser

`src/server/authz/types.ts` definierar tre klasser; varje rutt som inte kan klassificeras deterministiskt faller tillbaka till `MANAGEMENT`.

| Klass        | Beskrivning                                                                                                                                             | Auth krävs                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `PUBLIC`     | Explicit säkra rutter — inloggning, utloggning, status, hälsa, onboarding bootstrap.                                                                    | Ingen                                                                         |
| `CLIENT_API` | Modellbetjänande slutpunkter — `/api/v1/*`, `/api/v1beta/*`, plus alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bärarnyckel när den effektiva `REQUIRE_API_KEY` funktionsflaggan är aktiverad |
| `MANAGEMENT` | Dashboard-sidor, inställningar, leverantörer, nycklar, admin och diagnostikslutpunkter.                                                                 | Dashboard session OR Bearer med `manage` scope                                |

Några `MANAGEMENT` -åtgärder är** endast för operatör** : en `manage` nyckel räcker inte. Att exportera lagrade referenser (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), återställa en säkerhetskopia över livedata (`POST /api/db-backups/import` inklusive `dryRun=true`, `POST /api/db-backups` restore by id, `POST /api/settings/import-json`), förstöra återställningspunkter (`DELETE /api/db-backups` cleanup och `PATCH /api/db-backups` eftersom lagringen den kvarstår driver den automatiska beskärningen efter varje säkerhetskopiering av ämnet för varje lokal CLI inloggning, en lokal zdq-inloggning). Att utfärda en synkroniseringstoken (`POST /api/sync/tokens`) och skapa en `admin` CLI -åtkomsttoken (`POST /api/cli/tokens`) kräver en instrumentpanelsession eller det lokala CLI ämnet i varje inloggningsläge. API nycklar oavsett omfattning och `oma_` -åtkomsttokens är inte operatörsuppgifter: de får `403` närhelst en sådan krävs. Checken lever i `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Ändring av inloggningsinställningarna är också endast för operatören: `POST /api/settings/require-login` (ställ in hanteringslösenordet / växla `requireLogin`) accepterar endast de inloggningsuppgifterna när ett lösenord finns — det första startfönstret (inget lösenord ännu) är oförändrat — och en instrumentpanelsession måste skicka `currentPassword` för att ersätta lösenordet (`403` när det saknas eller är fel, `settings.update_failed` som). Den lokala CLI och en instans med inloggning inaktiverad behåller återställningssökvägen och kan ställa in ett lösenord utan den, eftersom båda är bundna till värden som äger datakatalogen.

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

## Lista över allmänna vägar

`src/shared/constants/publicApiRoutes.ts` är den explicita godkännandelistan:

Listan är uppdelad efter** form** , och uppdelningen är bärande (GHSA-74g9-q8f6-793h): ett prefix matchas med `startsWith()`, så det matchar också varje intilliggande sökväg som delar dess ledande tecken. `/api/usage/om-usage` som ett prefix markerat `/api/usage/om-usage<anything>` PUBLIC, och Next löser det för att `/api/usage/[connectionId]` — en hanterare utan egen auth.

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

Läsbara rutter är offentliga** endast** för säkra metoder. Obs: `classifyRoute()` utesluter `/api/v1/*` och `/api/v1beta/*` från PUBLIC -fall-through — de är alltid `CLIENT_API` så bärarnyckelpolicyn gäller fortfarande.

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

## Växla för autentisering krävs

`isAuthRequired()` i `src/shared/utils/apiAuth.ts` avgör om** några** auth verkställs för en begäran:

- `settings.requireLogin === false` → auth är globalt inaktiverad, förutom den alltid skyddade nivån (se [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) och de anrop som delar ut en autentiseringsinformation som den accepterar, som behöver samma autentiseringsuppgifter som med inloggning: utfärda synkroniseringstokens, prägla CLI åtkomsttokens oavsett omfattning, och skapa en API nyckel med `manage`-nyckeln,`admin` scope, nyckel, eller regenerera eller avslöja en sådan nyckel (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`). Endast slutledningsnycklar förblir öppna. Att skriva en skyddad funktionsflagga (`REQUIRE_API_KEY`, de andra säkerhetsflaggorna och SSRF / TLS /MCP-scope/sandbox-flaggorna listade i [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) ) och spara PII -maskeringsinställningarna (`PUT /api/settings/pii`) behöver också fortfarande en autentiseringsinformation.
- Inget lösenord har konfigurerats** och** no `INITIAL_PASSWORD` env var → bootstrap-läge tillåter onboarding-guiden och loopback-förfrågningar, men exponerade nätverksbegäranden behöver fortfarande autentiseringsuppgifter. Undantag: att skriva en skyddad funktionsflagga och spara PII maskeringsinställningarna (`PUT /api/settings/pii`) behöver en referens även från loopback, så loopback i sig räcker inte där.
- Alla DB fel → misslyckas stängs (säkert som standard).

Client API key enforcement använder `isRequireApiKeyEnabled()` i `src/shared/utils/featureFlags.ts`, inte en direkt `process.env.REQUIRE_API_KEY` läsning. Det här är viktigt för distribuerade instanser: växla `REQUIRE_API_KEY` i Dashboard → Feature Flags lagrar en DB överstyrning och påverkar omedelbart `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` och andra klient-API-autentiseringskontroller som delar denna hjälpare. Om funktionsflaggalagret inte kan läsas, stängs inte klientens API auth och kräver en nyckel.

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
