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

Bruges til de OpenAI-/Anthropic-/Gemini-kompatible klient-API'er og enkelte administrationsruter, når nøglen har `manage`-omfanget.

```
Authorization: Bearer <api-key>
```

Valideres af `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` og reeksporteres via `src/shared/utils/apiAuth.ts`. Validatoren accepterer også miljøvariablerne `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som permanente passthrough-nøgler (issue #1350).

### 2. Dashboardsession (auth_token-cookie)

Til dashboardsider og administratorhandlinger.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

En cookie er kun en session, når JWT'en kan verificeres **og** indeholder `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Alle
forbrugere af cookien (dashboardets rutebeskyttelse (`isDashboardSessionAuthenticated()`), opdatering i authz-pipelinen, WebSocket-handshake, live-
server, `/api/settings/require-login`, `/api/auth/status`) går gennem denne hjælpefunktion.
Der findes andre JWT'er, der er signeret med `JWT_SECRET` — Cursor CLI-passthrough udsteder
tokens med `iss "omniroute" / aud "cursor-cli"` til nøgleindehavere — og de er aldrig sessioner
(#13298).

Verificeres af `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Pipelinen opdaterer automatisk JWT'en, når der er mindre end 7 dage tilbage af dens levetid på 30 dage.

En session kan også afsluttes, før dens 30 dage er gået, fordi alle udstedere bruger `mintDashboardSessionToken` (et udstedelsestidspunkt `iat` og et id `jti`), og verificeringsfunktionen kontrollerer to indstillinger: `sessionsValidAfter`, som angives ved en adgangskodeændring, så alle sessioner, der er udstedt før dette tidspunkt, ikke længere kan verificeres (browseren, der ændrede adgangskoden, får en ny cookie), og `revokedDashboardSessions`, hvortil `POST /api/auth/logout` føjer den afmeldte sessions `jti`. Sessioner, der er udstedt af en ældre version, indeholder ingen af disse claims og forbliver gyldige indtil den første adgangskodeændring. Hvis indstillingerne ikke kan læses, anses sessionen ikke for at være pålidelig.

Nogle administrationsruter accepterer **begge** tilstande: cookie ELLER `Bearer <key>`, når API-nøglen har omfanget `manage` (eller `admin`). Det er dette, der muliggør arbejdsgangen "kan konfigureres via API-kald", som blev tilføjet i v3.8.

#### Valgfri OIDC-loginbegrænsning (#6973)

Dashboardets administratorlogin understøtter også et **tilvalgt** OIDC-flow (OpenID Connect)
sideløbende med standardlogin med adgangskode — login med adgangskode fjernes aldrig, men
suppleres kun:

- Deaktiveret, medmindre `settings.oidcEnabled === true` **og** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` alle er konfigureret (Indstillinger → Godkendelse).
  Ellers returnerer `GET /api/auth/oidc/login` `400`.
- `GET /api/auth/oidc/login` finder `authorization_endpoint` fra udstederens
  `/.well-known/openid-configuration` (falder tilbage til
  `<issuer>/authorize`), bygger omdirigerings-URI'en ud fra den indgående anmodning
  (med understøttelse af `x-forwarded-proto`) og omdirigerer til IdP'en med en tilfældig `state`,
  der gemmes i en `httpOnly` `oidc_state`-cookie.
- `GET /api/auth/oidc/callback` validerer `state`, udveksler godkendelseskoden
  og verificerer ID-tokenets signatur via udstederens JWKS
  (`jose`'s `createRemoteJWKSet`, cachelagret pr. JWKS-URI) med kontrol af `issuer`/`audience`.
  Adgang til dashboardet kræver en ikke-tom `oidcAllowedSubjects`-liste,
  en `oidcAdmissionClaim`-politik eller begge dele. Emnelisten matcher kun `sub` eller
  `email`, når `email_verified === true`. Den valgfrie claimpolitik anvender
  en punktsepareret claimsti i ID-tokenet (f.eks. `realm_access.roles`) og
  et array af accepterede værdier. Den fundne claim skal være et array af strenge,
  der indeholder mindst én accepteret værdi. Hvis begge politikker er konfigureret,
  skal begge godkendes. Manglende eller forkert udformede claims afvises som standard, og uden nogen af
  politikkerne afviser callbacket login (`not_configured`). Eksisterende konfigurationer,
  der kun bruger emner, fortsætter uændret.
- Keycloak tilknytter normalt realm-roller til adgangstokens, men ikke nødvendigvis ID-tokens.
  For at kræve realm-rollen `admin` skal du konfigurere en protokolmapper for
  denne klient, der inkluderer `realm_access.roles` i dens **ID-token**, og derefter angive
  `oidcAdmissionClaim` som `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Kontrollér den faktiske claim i ID-tokenet for denne klient, før du aktiverer adgang
  udelukkende baseret på roller. Applikationen læser ikke roller fra adgangstokens. Afvisning af tokens
  hos IdP'en kan supplere, men erstatter ikke denne kontrol i applikationen.
- Ved succes udsteder den **præcis samme** 30-dages `auth_token`-JWT, som login med adgangskode
  udsteder (`src/app/api/auth/login/route.ts`), så resten af
  dashboardsessionens pipeline (automatisk fornyelse, cookieflag) er uændret —
  OIDC erstatter kun måden, hvorpå cookien udstedes, ikke hvad den giver adgang til. Ændringer
  af roller/grupper hos IdP'en ugyldiggør ikke eksisterende OmniRoute-sessioner. Log ud,
  adgangskoderotation eller sessionsudløb styrer fortsat deres levetid.
- Alle `oidc*`-indstillinger (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) findes i `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  svarer med `400 PASSWORD_REQUIRED`, medmindre body'en indeholder administrationsadgangskoden
  som `currentPassword` (`401 PASSWORD_MISMATCH`, når den er forkert).
  `oidcDisablePasswordLogin` afviser _login_ med adgangskode (`POST /api/auth/login`),
  men bevarer den gemte adgangskodehash, og gengodkendelse kontrollerer stadig
  `currentPassword` mod den.
- `corsOrigins` og `bruteForceProtection` findes også i `SECURITY_IMPACTING_SETTINGS_KEYS`:
  En lempelse af en af dem svækker loginbeskyttelsen, så de kræver den samme
  gengodkendelse med `currentPassword` (fanen Sikkerhed anmoder om den), og JSON-importen
  udelader dem.
- Alle sikkerhedspolitiknøgler — posterne i `SECURITY_IMPACTING_SETTINGS_KEYS`,
  alle `oidc*`-nøgler og dashboardsessionens tilstand — er **kun for operatører** på
  `PATCH /api/settings`: En API-nøgle med `manage`-scope eller et `oma_`-adgangstoken
  afvises med `403`, selv når den sender den korrekte `currentPassword`, og
  afvisningen registreres i revisionsloggen som `settings.update_failed` med `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` i `src/lib/api/operatorCredential.ts`).
  Almindelige indstillinger (tema og visningspræferencer) kan fortsat ændres med en `manage`-nøgle
  eller et `admin`-adgangstoken. Alle ændringer af selve `/api/settings` (og af
  `/api/settings/require-login`) kræver også adgangstokenscopet `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` i `src/server/authz/accessScopes.ts`, match af præcis sti);
  `GET` forbliver `read`, og de øvrige `/api/settings/*`-underruter (proxyer,
  kombinationsstandarder, modelaliasser, komprimering, sletninger …) beholder det metodeudledte
  `write`-scope.
- `POST /api/settings/import-json` springer denne gengodkendelse over, så den udelader alle nøgler i
  `IMPORT_STRIPPED_SETTINGS_KEYS` (samme fil), før der skrives: adgangskoden og
  `currentPassword`, alle poster i `SECURITY_IMPACTING_SETTINGS_KEYS` samt
  dashboardsessionens tilstand (`sessionsValidAfter`, `revokedDashboardSessions`).
  Import af en ældre sikkerhedskopi kan derfor ikke genaktivere en session, som en ændring af
  adgangskoden eller et tidligere log ud allerede har afsluttet.

## Rutetyper

`src/server/authz/types.ts` definerer tre typer. Enhver rute, der ikke kan klassificeres deterministisk, falder tilbage til `MANAGEMENT`.

| Type         | Beskrivning                                                                                                                                              | Godkendelse påkrævet                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PUBLIC`     | Eksplicit sikre ruter: login, logout, status, init, healthcheck og onboarding-bootstrap.                                                                 | Ingen                                                            |
| `CLIENT_API` | Endpoints til modelbetjening: `/api/v1/*`, `/api/v1beta/*` samt aliasene `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-nøgle, når feature flag'et `REQUIRE_API_KEY` er aktiveret |
| `MANAGEMENT` | Dashboardsider, indstillinger, udbydere, nøgler, admin- og diagnostikendpoints.                                                                          | Dashboardsession ELLER Bearer med scopet `manage`                |

Nogle `MANAGEMENT`-handlinger er **kun for operatøren**: en nøgle med scopet `manage` er ikke nok. Eksport af gemte loginoplysninger (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), gendannelse af en backup over de aktuelle data (`POST /api/db-backups/import` inklusive `dryRun=true`, `POST /api/db-backups` gendannelse via id, `POST /api/settings/import-json`) og sletning af gendannelsespunkter (`DELETE /api/db-backups` oprydning, og `PATCH /api/db-backups`, fordi den gemte retention styrer den automatiske oprydning efter hver backup) kræver en dashboardsession, den lokale CLI-identitet eller at login er deaktiveret. Udstedelse af et synkroniseringstoken (`POST /api/sync/tokens`) og oprettelse af et `admin`-CLI-adgangstoken (`POST /api/cli/tokens`) kræver en dashboardsession eller den lokale CLI-identitet i alle login-tilstande. API-nøgler med vilket som helst scope og `oma_`-adgangstokens er ikke operatørlegitimationsoplysninger: de får `403`, når en sådan kræves. Kontrollen ligger i `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Ændring af loginindstillingerne er også kun for operatøren: `POST /api/settings/require-login` (sæt administrationsadgangskoden / skift `requireLogin`) accepterer kun disse legitimationsoplysninger, når der først findes en adgangskode. Bootstrap-vinduet ved første opsætning (ingen adgangskode endnu) er uændret, og en dashboardsession skal sende `currentPassword` for at erstatte adgangskoden (`403`, når den mangler eller er forkert, logget som `settings.update_failed`). Den lokale CLI og en instans med login deaktiveret beholder genopretningsstien og må sætte en adgangskode uden den, fordi begge er bundet til den vært, der ejer datamappen.

## Pipeline

```
Indgående anmodning → src/proxy.ts
  → runAuthzPipeline() i src/server/authz/pipeline.ts
    1. Fjern interne headers, der er tillid til (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generér anmodnings-id, klassificér ruten via classifyRoute()
    3. Hvis pathname == "/" → omdirigér til /dashboard
    4. Hvis systemet er under nedlukning (kontrolleret nedlukning), og ruten er /api/* → 503
    5. Hvis ikke-GET /api/* → kontrollér checkBodySize()-beskyttelsen
    6. Hvis OPTIONS → CORS-preflight 204
    7. Hvis options.enforce == false → videresend med ruteklasse-headers
    8. Ellers: POLICIES[routeClass].evaluate(ctx)
       - tillad  → angiv x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - afvis → JSON-fejl med correlation_id (dashboard-sider → 302 /login)
```

Interne headers, der er tillid til (defineret i `src/server/authz/headers.ts`), **fjernes fra indgående anmodninger** før klassificering — klienter kan ikke udfylde `x-omniroute-auth-*` på forhånd for at udgive sig for at være et subjekt.

### Politikkontrakter

Hver ruteklasse har en politik i `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnerer altid `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — udtrækker Bearer og validerer via `validateApiKey()`. Falder kun tilbage til anonym adgang, når det effektive `REQUIRE_API_KEY`-funktionsflag er deaktiveret. Det effektive flag bestemmes via `isRequireApiKeyEnabled()` (`DB-funktionsflagtilsidesættelse > process.env.REQUIRE_API_KEY > standardværdi`), så Dashboard-funktionsflag og miljøvariabler styrer `/api/v1/*`, `/api/v1beta/*` og aliasser ensartet; fejl i resolveren medfører afvisning. Tillader anmodninger med dashboard-session på klient-API-ruter (herunder `/api/v1/models`, som bruges af dashboardets modelkatalog).
- **`managementPolicy`** (`policies/management.ts`) — accepterer dashboard-sessioner og interne modelsynkroniseringsanmodninger (matchet mod `/api/providers/[name]/(sync-models|models)`) eller springer godkendelsen helt over, hvis `isAuthRequired()` returnerer false. Returnerer 403 (`AUTH_001`), når et Bearer-token er til stede, men ugyldigt, og ellers 401. Håndhæver også rutebeskyttelsesniveauerne (LOCAL_ONLY / ALWAYS_PROTECTED) før enhver godkendelsesgren — se [Rutebeskyttelsesniveauer](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY-stier i `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (i øjeblikket: `/api/mcp/`) kan tilgås fra en adresse, der ikke er loopback, når Bearer-nøglen har `manage`-scope; alle andre LOCAL_ONLY-stier forbliver strengt begrænset til loopback uanset scope.

En vellykket politik returnerer `AuthSubject` med `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Efterfølgende handlere kan læse det via `assertAuth(request, "CLIENT_API")` i `src/server/authz/assertAuth.ts` i stedet for at køre godkendelseslogikken igen.

## Liste over offentlige ruter

`src/shared/constants/publicApiRoutes.ts` er den eksplicitte tilladelsesliste:

Listen er opdelt efter **form**, og opdelingen er sikkerhedskritisk (GHSA-74g9-q8f6-793h): Et præfiks matches med `startsWith()`, så det matcher også enhver tilstødende sti, der deler dets indledende tegn.
`/api/usage/om-usage` som præfiks gjorde `/api/usage/om-usage<anything>` OFFENTLIG, og Next fortolker
det som `/api/usage/[connectionId]` — en handler uden sin egen godkendelse.

```ts
// Reelle undertræer. Hver post SKAL slutte med "/" (håndhævet af en enhedstest).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // behandles som CLIENT_API i classify, ikke som offentlig "uden godkendelse"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Individuelle ruter, matchet PRÆCIST (med eller uden en afsluttende skråstreg).
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

// Skrivebeskyttede individuelle ruter, der også får lempelsen af CORS-oprindelse.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Skrivebeskyttet individuel rute UDEN CORS-lempelsen.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Skrivebeskyttede ruter er **kun** offentlige for sikre metoder. Bemærk: `classifyRoute()` udelukker `/api/v1/*` og `/api/v1beta/*` fra PUBLIC-standardforløbet — de er altid `CLIENT_API`, så politikken for Bearer-nøgler stadig gælder.

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

## Fejlfinding

Pipelinen stempler altid svar med:

```
x-request-id:               <korrelations-id, gentaget i fejltekster>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

For autentificerede anmodninger indeholder anmodningsheaderne hos upstream-systemet (på handlersiden) også:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<sidste-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (valgfri)
x-omniroute-auth-scopes:    kommasepareret liste
```

Brug `assertAuth(req, expectedClass)` i handlers — den udløser `AuthzAssertionError` med koden `AUTHZ_NOT_INITIALIZED`, hvis middlewaren blev omgået (nyttigt til at opdage konfigurationsregressioner i tests).

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — godkendelsesmarkør pr. slutpunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revisionslog for godkendelseshændelser
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tre scope-navnerum og MCP-værktøjernes scope-katalog
- Kilde: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
