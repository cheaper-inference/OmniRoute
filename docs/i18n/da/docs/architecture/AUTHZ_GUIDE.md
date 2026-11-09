# Authorization Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sandhedskilde:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Senest opdateret:** 2026-09-22 — scope-navnerum peger på MCP-SERVER.md

OmniRoute har en rutebevidst autorisationspipeline, der beskytter hver API-anmodning. Klassificeringen er **deterministisk** og **lukket som standard** — alt, der ikke kan klassificeres, ender som `MANAGEMENT` og kræver en session eller et token på administrationsniveau. Denne side forklarer modellen for teknikere, der vedligeholder ruter eller designer nye slutpunkter.

![AuthZ-pipeline (3 ruteklasser + politikevaluering)](../diagrams/exported/authz-pipeline.svg)

> Kilde: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## To godkendelsestilstande

### 1. API-nøgle (Bearer)

Bruges til de OpenAI-/Anthropic-/Gemini-kompatible klient-API'er og enkelte administrationsruter, når nøglen har scopet `manage`.

```
Authorization: Bearer <api-key>
```

Valideres af `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` og eksporteres igen via `src/shared/utils/apiAuth.ts`. Validatoren accepterer også miljøvariablerne `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som permanente passthrough-nøgler (issue #1350).

### 2. Dashboard-session (auth_token-cookie)

Til dashboardsider og administratorhandlinger.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

En cookie er kun en session, når JWT'et valideres **og** indeholder `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Alle
forbrugere af cookien (dashboard-rutebeskyttelse (`isDashboardSessionAuthenticated()`), opdatering i authz-pipelinen, WebSocket-håndtryk, live-serveren, `/api/settings/require-login`, `/api/auth/status`) går gennem denne hjælper.
Der findes andre JWT'er, der er signeret med `JWT_SECRET` — Cursor CLI-passthrough genererer tokens med
`iss "omniroute" / aud "cursor-cli"` til nøgleindehavere — og de er aldrig sessioner
(#13298).

Valideres af `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Pipelinen opdaterer automatisk JWT'et, når der er mindre end 7 dage tilbage af dets levetid på 30 dage.

En session kan også slutte, før de 30 dage er gået, fordi alle udstedere går gennem `mintDashboardSessionToken` (et udstedelsestidspunkt `iat` og et id `jti`), og validatoren kontrollerer to indstillinger: `sessionsValidAfter`, der sættes ved ændring af en adgangskode, så alle sessioner, der er udstedt før ændringen, ikke længere valideres (den browser, der ændrede adgangskoden, får en ny cookie), samt `revokedDashboardSessions`, som `POST /api/auth/logout` tilføjer den udloggede sessions `jti` til. Sessioner, der er oprettet af en ældre version, indeholder ingen af disse claims og forbliver gyldige indtil den første ændring af adgangskoden. Hvis indstillingerne ikke kan læses, betragtes sessionen ikke som betroet.

Nogle administrationsruter accepterer **enten** tilstand: cookie ELLER `Bearer <key>`, når API-nøglen har scopet `manage` (eller `admin`). Det er dette, der muliggør arbejdsgangen "konfigurerbar via API-kald", som blev tilføjet i v3.8.

#### Valgfri OIDC-login-gate (#6973)

Dashboardets administratorlogin understøtter også et **tilvalgsbaseret** OIDC-flow (OpenID Connect)
ud over standardlogin med adgangskode — login med adgangskode fjernes aldrig, men
suppleres kun:

- Deaktiveret, medmindre `settings.oidcEnabled === true` **og** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` alle er konfigureret (Indstillinger → Godkendelse).
  `GET /api/auth/oidc/login` returnerer ellers `400`.
- `GET /api/auth/oidc/login` finder `authorization_endpoint` fra issuerens
  `/.well-known/openid-configuration` (falder tilbage til
  `<issuer>/authorize`), opbygger omdirigerings-URI'en ud fra den indkommende
  forespørgsel (`x-forwarded-proto`-bevidst) og omdirigerer til IdP'en med en tilfældig `state`,
  der gemmes i en `httpOnly`-cookie med navnet `oidc_state`.
- `GET /api/auth/oidc/callback` validerer `state`, udveksler autorisationskoden
  og verificerer ID-tokenets signatur via issuerens JWKS
  (`jose`'s `createRemoteJWKSet`, cachet pr. JWKS-URI) med kontrol af `issuer`/`audience`.
  Adgang til kontrolpanelet kræver en ikke-tom liste med `oidcAllowedSubjects`,
  en `oidcAdmissionClaim`-politik eller begge dele. Subjektlisten matcher kun
  `sub` eller `email`, når `email_verified === true`. Den valgfrie claim-politik
  tager en punktumsepareret sti til et ID-token-claim (f.eks.
  `realm_access.roles`) og et array med accepterede værdier; det fundne claim
  skal være et array af strenge, der indeholder mindst én accepteret værdi. Hvis
  begge politikker er konfigureret, skal begge bestås. Manglende eller forkert
  udformede claims afviser adgangen som standard, og uden nogen af politikkerne
  afviser callback-login (`not_configured`). Eksisterende konfigurationer, der
  kun bruger subjects, fortsætter uændret.
- Keycloak mapper normalt realm-roller til access-tokens, ikke nødvendigvis
  ID-tokens. Hvis realm-rollen `admin` skal kræves, skal du konfigurere en
  protocol mapper for denne klient, som inkluderer `realm_access.roles` i dens
  **ID-token**, og derefter indstille `oidcAdmissionClaim` til `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Kontrollér det faktiske ID-token-claim for denne klient, før du aktiverer
  rollebaseret adgang alene; applikationen læser ikke roller fra access-tokens.
  Tokenafvisning på IdP-siden kan supplere, men erstatter ikke denne kontrol på
  applikationssiden.
- Ved succes udsteder den det **præcis samme** 30-dages `auth_token`-JWT, som
  password-login udsteder (`src/app/api/auth/login/route.ts`), så resten af
  session-pipelinen for kontrolpanelet (automatisk fornyelse, cookie-flag) er
  uændret — OIDC erstatter kun, hvordan cookien udstedes, ikke hvad den giver
  adgang til. Ændringer af IdP-roller/-grupper ugyldiggør ikke eksisterende
  OmniRoute-sessioner; logout, ændring af adgangskode eller sessionens udløb
  styrer fortsat deres levetid.
- Alle `oidc*`-indstillinger (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) findes i
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  svarer `400 PASSWORD_REQUIRED`, medmindre body'en indeholder
  administrationsadgangskoden som `currentPassword` (`401 PASSWORD_MISMATCH`,
  når den er forkert). `oidcDisablePasswordLogin` afviser password-_login_
  (`POST /api/auth/login`), men bevarer den gemte adgangskodehash, og
  genautentificering kontrollerer stadig `currentPassword` mod den.
- `corsOrigins` og `bruteForceProtection` findes også i
  `SECURITY_IMPACTING_SETTINGS_KEYS`: En lempelse af en af dem svækker
  loginbeskyttelsen, så de kræver den samme genautentificering med
  `currentPassword` (fanen Sikkerhed beder om den), og JSON-importen fjerner dem.
- Alle sikkerhedspolitiknøgler — posterne i
  `SECURITY_IMPACTING_SETTINGS_KEYS`, alle `oidc*`-nøgler og sessionstilstanden
  for kontrolpanelet — er **kun for operatører** ved `PATCH /api/settings`: En
  API-nøgle med manage-scope eller et `oma_`-access-token afvises med `403`,
  selv når den sender den korrekte `currentPassword`, og afvisningen logges som
  `settings.update_failed` med `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` i `src/lib/api/operatorCredential.ts`).
  Almindelige indstillinger (tema, visningsindstillinger) kan fortsat skrives
  med en `manage`-nøgle eller et `admin`-access-token. Enhver ændring af
  `/api/settings` selv (og af `/api/settings/require-login`) kræver også
  `admin`-access-token-scope (`ADMIN_MUTATION_EXACT_PATHS` i
  `src/server/authz/accessScopes.ts`, match på nøjagtig sti); `GET` forbliver
  `read`, og de øvrige `/api/settings/*`-underruter (proxyer,
  kombinationsstandarder, modelaliaser, komprimering, oprydninger …) beholder
  den metodedetekterede `write`-scope.
- `POST /api/settings/import-json` springer denne genautentificering over, så
  den fjerner alle nøgler i `IMPORT_STRIPPED_SETTINGS_KEYS` (samme fil), før
  den skriver: adgangskoden og `currentPassword`, alle poster i
  `SECURITY_IMPACTING_SETTINGS_KEYS` samt sessionstilstanden for kontrolpanelet
  (`sessionsValidAfter`, `revokedDashboardSessions`).
  Import af en ældre sikkerhedskopi kan derfor ikke genaktivere en session, som
  allerede blev afsluttet ved en ændring af adgangskoden eller en udlogning.

#### Valgfrit TOTP-tofaktor-login (#16619)

Aktiveres fra Indstillinger → Sikkerhed; deaktiveret, indtil operatøren
slår det til (`src/server/auth/dashboardMfa.ts`).

- **Hvad det dækker:** login med adgangskode (`POST /api/auth/login`, som derefter kræver
  `POST /api/auth/mfa/verify`) og `omniroute connect` (`POST /api/cli/connect`,
  som afviser en udveksling, der kun bruger adgangskode, og tager koden som
  `totp`).
- **Hvad det ikke dækker:** OIDC- / SSO-login (`/api/auth/oidc/callback`) beder
  ikke om OmniRoute-TOTP. Det er afhængigt af identitetsudbyderens eget ekstra
  godkendelsestrin, så håndhæv MFA i IdP'en, hvis OIDC er aktiveret.
- **Gendannelse** (mistet enhed, ingen gendannelseskoder tilbage eller en faktor, der ikke længere
  kan verificeres, f.eks. efter at `STORAGE_ENCRYPTION_KEY` er ændret):
  1. Genstart serveren med `OMNIROUTE_DISABLE_MFA=true`.
  2. Log ind på selve værten (loopback-peer og loopback-`Host`, f.eks.
     `http://localhost:20128`) med adgangskoden. Det ekstra godkendelsestrin springes
     kun over for denne oprindelse; alle andre oprindelser kræver stadig koden.
  3. Gå til Indstillinger → Sikkerhed → Deaktivér, indtast adgangskoden, og lad koden
     stå tom. `POST /api/auth/mfa/disable` accepterer kun en anmodning uden `code`, mens
     variablen er angivet, og anmodningen kommer fra værten; den kræver stadig
     dashboardsessionen og den aktuelle adgangskode og logges som
     `auth.mfa.disabled` med `secondFactor: "recovery_switch"`.
  4. Fjern indstillingen af `OMNIROUTE_DISABLE_MFA`, genstart, og tilmeld igen efter behov.

## Rutetyper

`src/server/authz/types.ts` definerer tre typer. Enhver rute, der ikke kan klassificeres deterministisk, falder tilbage til `MANAGEMENT`.

| Type         | Beskrivning                                                                                                                                              | Godkendelse påkrævet                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PUBLIC`     | Eksplicit sikre ruter: login, logout, status, init, healthcheck og onboarding-bootstrap.                                                                 | Ingen                                                            |
| `CLIENT_API` | Endpoints til modelbetjening: `/api/v1/*`, `/api/v1beta/*` samt aliasene `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-nøgle, når feature flag'et `REQUIRE_API_KEY` er aktiveret |
| `MANAGEMENT` | Dashboardsider, indstillinger, udbydere, nøgler, admin- og diagnostikendpoints.                                                                          | Dashboardsession ELLER Bearer med scopet `manage`                |

Nogle `MANAGEMENT`-handlinger er **kun for operatøren**: en nøgle med scopet `manage` er ikke nok. Eksport af gemte loginoplysninger (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), gendannelse af en backup over de aktuelle data (`POST /api/db-backups/import` inklusive `dryRun=true`, `POST /api/db-backups` gendannelse via id, `POST /api/settings/import-json`) og sletning af gendannelsespunkter (`DELETE /api/db-backups` oprydning, og `PATCH /api/db-backups`, fordi den gemte retention styrer den automatiske oprydning efter hver backup) kræver en dashboardsession, den lokale CLI-identitet eller at login er deaktiveret. Udstedelse af et synkroniseringstoken (`POST /api/sync/tokens`) og oprettelse af et `admin`-CLI-adgangstoken (`POST /api/cli/tokens`) kræver en dashboardsession eller den lokale CLI-identitet i alle login-tilstande. API-nøgler med vilket som helst scope og `oma_`-adgangstokens er ikke operatørlegitimationsoplysninger: de får `403`, når en sådan kræves. Kontrollen ligger i `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Ændring af loginindstillingerne er også kun for operatøren: `POST /api/settings/require-login` (sæt administrationsadgangskoden / skift `requireLogin`) accepterer kun disse legitimationsoplysninger, når der først findes en adgangskode. Bootstrap-vinduet ved første opsætning (ingen adgangskode endnu) er uændret, og en dashboardsession skal sende `currentPassword` for at erstatte adgangskoden (`403`, når den mangler eller er forkert, logget som `settings.update_failed`). Den lokale CLI og en instans med login deaktiveret beholder genopretningsstien og må sætte en adgangskode uden den, fordi begge er bundet til den vært, der ejer datamappen.

## Rørledning

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

Pålidelige interne overskrifter (defineret i `src/server/authz/headers.ts`) er** fjernet fra indgående anmodninger** før klassificering kan — klienter ikke på forhånd udfylde `x-omniroute-auth-*` for at efterligne et emne.

### Forsikringskontrakter

Hver ruteklasse har en politik i `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnerer altid `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — udtrækker bærer, validerer via `validateApiKey()`. Falder kun igennem til anonym, når det effektive `REQUIRE_API_KEY` funktionsflag er deaktiveret. Det effektive flag løses gennem `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), så Dashboard-funktionsflag og miljøvariabler styrer `/api/v1/*`, `/api/v1beta/*` og aliaser konsekvent; resolver fejl fejl lukket. Tillader anmodninger om dashboard-session på klient- API ruter (inklusive `/api/v1/models`, brugt af dashboard-modelkataloget). Når Entra ID SSO er aktiveret, håndteres en bærer, der strukturelt er en Entra-token (tre base64url-segmenter, `RS*` alg, `kid`) af SSO -grenen** før** `validateApiKey()` og dens dom er endelig — Statiske API nøgler er upåvirkede. Se [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — accepterer dashboardsession, interne modelsynkroniseringsanmodninger (matchet mod `/api/providers/[name]/(sync-models|models)`) eller springer helt over, hvis `isAuthRequired()` returnerer falsk. Returnerer 403 (`AUTH_001`), når et bærer-token er til stede, men ugyldigt, ellers 401. Håndhæver også rutebeskyttelsesniveauerne (LOCAL_ONLY / ALWAYS_PROTECTED) før enhver godkendelsesgren — se [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY stier i `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (i dag: `/api/mcp/`) kan tilgås fra non-loopback, når bærer-nøglen bærer `manage` omfanget; alle andre LOCAL_ONLY stier forbliver strict-loopback uanset omfang.

En vellykket politik returnerer `AuthSubject` med `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Downstream-handlere kan læse det via `assertAuth(request, "CLIENT_API")` i `src/server/authz/assertAuth.ts` i stedet for at køre godkendelseslogik igen.

## Liste over offentlige routes

`src/shared/constants/publicApiRoutes.ts` er den eksplicitte allowlist:

Listen er opdelt efter **form**, og opdelingen er afgørende (GHSA-74g9-q8f6-793h): Et præfiks
matches med `startsWith()`, så det matcher også alle tilstødende paths, der deler dets begyndende tegn.
`/api/usage/om-usage` som præfiks markerer `/api/usage/om-usage<anything>` som PUBLIC, og Next resolver
det til `/api/usage/[connectionId]` — en handler uden egen godkendelse.

```ts
// Ægte undertræer. Hver post SKAL slutte med "/" (håndhæves af en unit-test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // behandles som CLIENT_API i classify, ikke som "offentlig uden godkendelse"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Enkeltstående routes, der matches PRÆCIST (med eller uden en afsluttende skråstreg).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // logintrin 2 for valgfri TOTP; kræver MFA-pending-cookien
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Skrivebeskyttede enkeltstående routes, der også benytter CORS-oprindelseslempelsen.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Skrivebeskyttet enkeltstående route UDEN CORS-lempelsen.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Skrivebeskyttede routes er kun offentlige for sikre metoder. Bemærk: `classifyRoute()` udelukker `/api/v1/*` og `/api/v1beta/*` fra PUBLIC-fallbacken — de er altid `CLIENT_API`, så Bearer-key-politikken stadig gælder.

## Tilføjelse af en ny rute

### Mønster 1 — Offentligt klient-API-slutpunkt (Bearer-godkendelse)

Ruter under `/api/v1/` og `/api/v1beta/` klassificeres automatisk som `CLIENT_API`. Middlewaren håndhæver Bearer-kontrollen; rutehandlerne behøver ikke at gentage den, men kan læse subjektet, hvis det er nyttigt.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handlerlogik
}
```

### Mønster 2 — Administrationsslutpunkt (session eller Bearer + administrér)

Brug `requireManagementAuth()` fra `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handlerlogik
}
```

`requireManagementAuth()` returnerer `null` ved succes eller en JSON-fejl-`Response`:

- 401 `AUTH_001` "Godkendelse påkrævet" — ingen legitimationsoplysninger overhovedet
- 403 — ugyldig Bearer **eller** Bearer findes, men nøglen mangler omfanget `manage` / `admin`

`hasManageScope(scopes)` returnerer sand for `"manage"` eller `"admin"`.

### Mønster 3 — Tilføjelse til den offentlige tilladelsesliste

Vælg sættet efter form, ikke efter bekvemmelighed. En enkelt rute placeres i `PUBLIC_API_ROUTES_EXACT` (eller `PUBLIC_READONLY_CORS_API_ROUTES`, hvis den kun understøtter GET); kun et reelt undertræ placeres i `PUBLIC_API_ROUTE_PREFIXES`, og det **skal slutte med `/`**. Hvis en enkelt rute placeres på præfikslisten, offentliggøres også alle tilstødende stier, der deler dens indledende tegn — herunder søskenderuter med dynamiske segmenter, som tilføjes senere (GHSA-74g9-q8f6-793h). Opdater enhedstestene i `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` og `tests/unit/authz/classify.test.ts`.

## Scopes

Tre navnerum. Hver kontrolfunktion læser kun sine egne strenge. Sammenligningen side om side,
herunder hvorfor `manage` ikke består `scopeMatches` for `read:compression`, og hvorfor et
`read`-adgangstoken ikke kan udføre `PATCH /api/keys/{id}`, findes i
[Tre scope-navnerum](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API-nøgler indeholder et `scopes`-array (gemt som JSON i `api_keys.scopes`, se `src/lib/db/apiKeys.ts`).

### Administrations-scope

- `manage` / `admin` — `hasManageScope`. Bearer-adgang til administrations-API-ruter.
- `mcp:connect`, `self:usage`, `self:account-quota` og
  `policy:bypass-provider-quota` er additive scopes med eksakt match. De ligger
  uden for `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` åbner kun
  `/api/mcp/`-undtagelsen for trafik uden for loopback.

### MCP-værktøjsscopes

Katalog og matchningsregler (identisk streng eller et tildelt scope, der slutter med `*`):
[MCP-værktøjsscopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` i `src/shared/constants/mcpScopes.ts` er den oprindelige typede
delmængde, ikke hele kataloget. Håndhævelsen kører i
`open-sse/mcp-server/scopeEnforcement.ts`, efter at `resolveCallerScopeContext()`
har fundet scopes fra MCP-godkendelsesoplysninger, request-metadata eller `OMNIROUTE_MCP_SCOPES`.
Den forbliver deaktiveret, medmindre `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Adgangstoken-scopes

`read` / `write` / `admin` på `oma_live_…`-tokens, rangeret af `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Denne rangering gælder kun for
adgangstoken-legitimationsoplysningerne. Se [Administrationsgodkendelse](../guides/MANAGEMENT-AUTH.md).

## Skift for påkrævet godkendelse

`isAuthRequired()` i `src/shared/utils/apiAuth.ts` afgør, om **nogen** godkendelse overhovedet håndhæves for en anmodning:

- `settings.requireLogin === false` → godkendelse er globalt deaktiveret, undtagen for det altid beskyttede niveau (se [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) og de kald, der udleverer en legitimationsoplysning, som den accepterer. De kræver samme legitimation, som når login er aktiveret: udstedelse af synkroniseringstokens, udstedelse af CLI-adgangstokens med vilket som helst scope, og oprettelse af en API-nøgle med scopet `manage`/`admin`, tildeling af det scope til en nøgle, eller regenerering eller visning af en sådan nøgle (`requireCredentialForManagementScopedKey()` i `src/lib/api/requireManagementAuth.ts`). Nøgler, der kun bruges til inferens, forbliver åbne.
- Ingen adgangskode konfigureret **og** ingen `INITIAL_PASSWORD`-miljøvariabel → bootstrap-tilstanden tillader introduktionsguiden og loopback-anmodninger, men eksponerede netværksanmodninger kræver stadig legitimationsoplysninger.
- Enhver DB-fejl → lukker af (sikkert som standard).

Klient-API-nøglehåndhævelsen bruger `isRequireApiKeyEnabled()` i `src/shared/utils/featureFlags.ts` og ikke en direkte læsning af `process.env.REQUIRE_API_KEY`. Det har betydning for udrullede instanser: at ændre `REQUIRE_API_KEY` i Dashboard → Feature Flags gemmer en DB-overskrivning og påvirker straks `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` og andre klient-API-godkendelseskontroller, der deler denne hjælper. Hvis feature flag-lageret ikke kan læses, afviser klient-API-godkendelsen adgang og kræver en nøgle.

## Inkompatibel ændring — v3.8.0

Slutpunkterne `/api/v1/agents/tasks/*` og `/api/resilience/model-cooldowns` **kræver nu administrationsgodkendelse** (commit `588a0333`). Klienter, der tidligere sendte en normal API-nøgle uden adgangsområdet `manage`, modtager `403`. Migrering: Tildel enten nøglen adgangsområdet `manage` i API Keys-dashboardet, eller brug en dashboard-session, hvor der er logget ind.

## Adfærdsændring — v3.8.2

`/api/mcp/*` (den eksterne MCP-server) er stadig LOCAL_ONLY som standard, men accepterer nu anmodninger, der ikke er loopback-anmodninger, når headeren `Authorization: Bearer <api-key>` indeholder adgangsområdet `manage`. Undtagelsen styres eksplicit pr. sti via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` i `src/server/authz/routeGuard.ts`; det relaterede LOCAL_ONLY-præfiks `/api/cli-tools/runtime/*` kan bevidst IKKE omgås, fordi det kan starte vilkårlige underprocesser. Anonyme anmodninger til `/api/mcp/*`, der ikke er loopback-anmodninger, returnerer fortsat `403 LOCAL_ONLY` — standarden for enhver ny LOCAL_ONLY-sti er fortsat udelukkende at tillade loopback. Se [Niveauer for rutebeskyttelse](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Test

- Enhedstest: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Offentlig tilladelsesliste: `tests/unit/public-api-routes.test.ts`.
- Kør fokuseret: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Fejlretning

Rørledningen stempler altid svar med:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

For godkendte anmodninger inkluderer opstrøms (handler-side) anmodningsheadere også:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Brug `assertAuth(req, expectedClass)` inde i handlere — det kaster `AuthzAssertionError` med kode `AUTHZ_NOT_INITIALIZED`, hvis middlewaren blev omgået (nyttigt til at fange konfigurationsregression i test).

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — godkendelsesmarkør pr. slutpunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revisionslog for godkendelseshændelser
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tre scope-navnerum og MCP-værktøjernes scope-katalog
- Kilde: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
