# Authorization Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sannhetskilde:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Sist oppdatert:** 2026-09-22 — omfangsnavnerom peker til MCP-SERVER.md

OmniRoute har en rutebevisst autorisasjons-pipeline som kontrollerer hver API-forespørsel. Klassifiseringen er **deterministisk** og **fail-closed** – alt som ikke kan klassifiseres ender opp som `MANAGEMENT` og krever en sesjon eller et token av administrasjonsgrad. Denne siden forklarer modellen for ingeniører som vedlikeholder ruter eller designer nye endepunkter.

![AuthZ-pipeline (3 ruteklasser + policyevaluering)](../diagrams/exported/authz-pipeline.svg)

> Kilde: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## To autentiseringsmoduser

### 1. API-nøkkel (Bearer)

Brukes for de OpenAI/Anthropic/Gemini-kompatible klient-API-ene og noen få administrasjonsruter når nøkkelen har scopet `manage`.

```
Authorization: Bearer <api-key>
```

Valideres av `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` og re-eksporteres via `src/shared/utils/apiAuth.ts`. Validatoren godtar også miljøvariablene `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som vedvarende passthrough-nøkler (issue #1350).

### 2. Dashboard-økt (auth_token-cookie)

For dashboardsider og administrative operasjoner.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

En cookie er bare en økt når JWT-en verifiseres **og** inneholder `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Alle som bruker cookien (dashboardets rutevakt (`isDashboardSessionAuthenticated()`), autorisasjonspipelinens fornyelse, WebSocket-håndtrykket, live-serveren, `/api/settings/require-login`, `/api/auth/status`) går gjennom denne hjelperen. Andre JWT-er signert med `JWT_SECRET` finnes — Cursor CLI-passthrough utsteder `iss "omniroute" / aud "cursor-cli"`-tokens til nøkkelinnehavere — og er aldri økter (#13298).

Verifiseres av `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Pipelinen fornyer JWT-en automatisk når den har mindre enn 7 dager igjen av sin levetid på 30 dager.

En økt kan avsluttes før de 30 dagene er gått, fordi hver utsteder går gjennom `mintDashboardSessionToken` (med utstedelsestid `iat` og id `jti`), og verifisereren sjekker to innstillinger: `sessionsValidAfter`, som settes av et passordbytte slik at hver økt utstedt før det slutter å verifiseres (nettleseren som byttet passordet får en ny cookie), og `revokedDashboardSessions`, som `POST /api/auth/logout` legger til den utloggede øktens `jti` i. Økter utstedt av en eldre utgivelse har ingen av disse claimene og forblir gyldige til første passordbytte. Hvis innstillingene ikke kan leses, stoles det ikke på økten.

Noen administrasjonsruter godtar **enten** modus: cookie ELLER `Bearer <key>` når API-nøkkelen har scopet `manage` (eller `admin`). Dette er det som gjør arbeidsflyten «konfigurerbar via API-kall» mulig, lagt til i v3.8.

#### Valgfri OIDC-innloggingsport (#6973)

Dashboardets administratorinnlogging støtter også en **valgfri** OIDC-flyt (OpenID Connect) ved siden av standard passordinnlogging. Passordinnlogging fjernes aldri, den utfylles bare:

- Deaktivert med mindre `settings.oidcEnabled === true` **og** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` er alle konfigurert (Innstillinger → Autentisering). `GET /api/auth/oidc/login` returnerer `400` ellers.
- `GET /api/auth/oidc/login` finner `authorization_endpoint` fra issuerens `/.well-known/openid-configuration` (faller tilbake til `<issuer>/authorize`), bygger redirect-URI-en fra den innkommende forespørselen (`x-forwarded-proto`-bevisst) og sender til IdP-en med en tilfeldig `state` lagret i en `httpOnly`-cookie `oidc_state`.
- `GET /api/auth/oidc/callback` validerer `state`, bytter ut authorization code og verifiserer ID-tokenets signatur via issuerens JWKS (`jose`s `createRemoteJWKSet`, cachet per JWKS-URI) med sjekk av `issuer`/`audience`. Tillatelseslisten `oidcAllowedSubjects` er påkrevd: den matcher tokenets `sub`-claim eller `email`-claim. E-post-claimet godtas bare når `email_verified === true`, slik at en uverifisert e-post hos IdP-en aldri kan passere porten. Uten oppføringer avviser callbacken hver innlogging (`not_configured`).
- Ved suksess utsteder den **nøyaktig samme** 30-dagers `auth_token`-JWT som passordinnloggingen utsteder (`src/app/api/auth/login/route.ts`), slik at resten av dashboardets øktpipeline (automatisk fornyelse, cookie-flagg) er uendret. OIDC erstatter bare hvordan cookien utstedes, ikke hva den gir tilgang til.
- Alle `oidc*`-innstillinger (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) finnes i `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` svarer `400 PASSWORD_REQUIRED` med mindre body inneholder administrasjonspassordet som `currentPassword` (`401 PASSWORD_MISMATCH` når det er feil). `oidcDisablePasswordLogin` forbyr passordinnlogging (`POST /api/auth/login`), men beholder den lagrede passordhashen, og re-autentisering sjekker fortsatt `currentPassword` mot den.
- `corsOrigins` og `bruteForceProtection` er også i `SECURITY_IMPACTING_SETTINGS_KEYS`: å løsne en av dem svekker innloggingsforsvaret, så de krever samme re-autentisering med `currentPassword` (fanen Sikkerhet ber om den), og JSON-importen fjerner dem.
- Hver sikkerhetspolicynøkkel, altså `SECURITY_IMPACTING_SETTINGS_KEYS`-oppføringene, alle `oidc*`-nøkler og dashboardets øktstatus, er **kun for operatøren** på `PATCH /api/settings`: en API-nøkkel med scopet `manage` eller et `oma_`-tilgangstoken avvises med `403` selv når den sender riktig `currentPassword`, og avvisningen logges som `settings.update_failed` med `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` i `src/lib/api/operatorCredential.ts`). Vanlige innstillinger (tema, visningsvalg) kan fortsatt skrives av en `manage`-nøkkel eller et `admin`-tilgangstoken. Enhver endring av selve `/api/settings` (og av `/api/settings/require-login`) krever også scopet `admin` for tilgangstoken (`ADMIN_MUTATION_EXACT_PATHS` i `src/server/authz/accessScopes.ts`, eksakt stimatch). `GET` forblir `read`, og de øvrige underrutene under `/api/settings/*` (proxyer, combo-standarder, modellalias, komprimering, rensinger …) beholder den metodeavledede `write`-scopet.
- `POST /api/settings/import-json` hopper over den re-autentiseringen, så den fjerner alle nøkler i `IMPORT_STRIPPED_SETTINGS_KEYS` (samme fil) før den skriver: passordet og `currentPassword`, hver `SECURITY_IMPACTING_SETTINGS_KEYS`-oppføring og dashboardets øktstatus (`sessionsValidAfter`, `revokedDashboardSessions`). Import av en eldre sikkerhetskopi kan derfor ikke gjenopplive en økt som et passordbytte eller en utlogging allerede har avsluttet.

## Rutetyper

`src/server/authz/types.ts` definerer tre typer. Enhver rute som ikke kan klassifiseres deterministisk, faller tilbake til `MANAGEMENT`.

| Type         | Beskrivelse                                                                                                                                                   | Autentisering kreves                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | Eksplisitt trygge ruter: innlogging, utlogging, status, init, helsesjekk og onboarding-bootstrap.                                                             | Ingen                                                           |
| `CLIENT_API` | Endepunkter for modelltjenester: `/api/v1/*`, `/api/v1beta/*`, pluss aliasene `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-nøkkel når feature flagget `REQUIRE_API_KEY` er aktivert |
| `MANAGEMENT` | Dashboardsider, innstillinger, leverandører, nøkler, admin- og diagnoseendepunkter.                                                                           | Dashboard-økt ELLER Bearer med scopet `manage`                  |

Noen `MANAGEMENT`-handlinger er **kun for operatøren**: en nøkkel med scopet `manage` er ikke nok. Eksport av lagrede legitimasjoner (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), gjenoppretting av en sikkerhetskopi over de aktive dataene (`POST /api/db-backups/import`, inkludert `dryRun=true`, `POST /api/db-backups` gjenoppretting via id, `POST /api/settings/import-json`) og sletting av gjenopprettingspunkter (`DELETE /api/db-backups` for opprydding, og `PATCH /api/db-backups` fordi den lagrede retensjonen styrer den automatiske opprydningen etter hver sikkerhetskopi) krever en dashboard-økt, den lokale CLI-identiteten eller at innlogging er deaktivert. Utstedelse av et synk-token (`POST /api/sync/tokens`) og oppretting av et `admin`-tilgangstoken for CLI (`POST /api/cli/tokens`) krever en dashboard-økt eller den lokale CLI-identiteten i alle innloggingsmoduser. API-nøkler med hvilket som helst scope og `oma_`-tilgangstokens er ikke operatørlegitimasjoner: de får `403` når en slik kreves. Kontrollen ligger i `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Endring av innloggingsinnstillingene er også bare for operatøren: `POST /api/settings/require-login` (sett administrasjonspassordet / slå `requireLogin` av og på) godtar bare disse legitimasjonene når et passord finnes. Bootstrap-vinduet ved første oppsett (ingen passord ennå) er uendret, og en dashboard-økt må sende `currentPassword` for å erstatte passordet (`403` når det mangler eller er feil, logget som `settings.update_failed`). Den lokale CLI-en og en instans med innlogging deaktivert beholder gjenopprettingsveien og kan sette et passord uten det, fordi begge er bundet til verten som eier datamappen.

## Behandlingsflyt

```
Innkommende forespørsel → src/proxy.ts
  → runAuthzPipeline() i src/server/authz/pipeline.ts
    1. Fjern klarerte interne headere (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generer forespørsels-ID, klassifiser ruten via classifyRoute()
    3. Hvis pathname == "/" → omdiriger til /dashboard
    4. Hvis systemet tømmes (kontrollert nedstenging) og /api/* → 503
    5. Hvis annet enn GET mot /api/* → bruk checkBodySize()-sperren
    6. Hvis OPTIONS → CORS-preflight 204
    7. Hvis options.enforce == false → slipp gjennom med ruteklasse-headere
    8. Ellers: POLICIES[routeClass].evaluate(ctx)
       - allow  → sett x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON-feil med correlation_id (dashbord-sider → 302 /login)
```

Klarerte interne headere (definert i `src/server/authz/headers.ts`) **fjernes fra innkommende forespørsler** før klassifisering — klienter kan ikke forhåndsutfylle `x-omniroute-auth-*` for å utgi seg for å være et subjekt.

### Policykontrakter

Hver ruteklasse har en policy i `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnerer alltid `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — trekker ut Bearer og validerer via `validateApiKey()`. Faller bare tilbake til anonym tilgang når det effektive funksjonsflagget `REQUIRE_API_KEY` er deaktivert. Det effektive flagget fastsettes gjennom `isRequireApiKeyEnabled()` (`overstyring med funksjonsflagg i DB > process.env.REQUIRE_API_KEY > standardverdi`), slik at funksjonsflagg i dashbordet og miljøvariabler styrer `/api/v1/*`, `/api/v1beta/*` og aliasene konsekvent. Feil i fastsettingen fører til avvisning. Tillater forespørsler med dashbordøkt på klient-API-ruter (inkludert `/api/v1/models`, som brukes av dashbordets modellkatalog).
- **`managementPolicy`** (`policies/management.ts`) — godtar dashbordøkt og interne forespørsler om modellsynkronisering (samsvart mot `/api/providers/[name]/(sync-models|models)`), eller hopper over alt hvis `isAuthRequired()` returnerer false. Returnerer 403 (`AUTH_001`) når et Bearer-token finnes, men er ugyldig, ellers 401. Håndhever også nivåene for rutebeskyttelse (LOCAL_ONLY / ALWAYS_PROTECTED) før enhver autentiseringsgren — se [Nivåer for rutebeskyttelse](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY-baner i `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (for øyeblikket: `/api/mcp/`) kan nås fra adresser utenfor loopback når Bearer-nøkkelen har `manage`-omfanget. Alle andre LOCAL_ONLY-baner forblir strengt begrenset til loopback uavhengig av omfang.

En vellykket policy returnerer `AuthSubject` med `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Nedstrøms behandlere kan lese det via `assertAuth(request, "CLIENT_API")` i `src/server/authz/assertAuth.ts` i stedet for å kjøre autentiseringslogikken på nytt.

## Liste over offentlige ruter

`src/shared/constants/publicApiRoutes.ts` er den eksplisitte tillatelseslisten:

Listen er delt etter **form**, og inndelingen er sikkerhetskritisk (GHSA-74g9-q8f6-793h): Et prefiks
sammenlignes med `startsWith()`, så det samsvarer også med alle tilstøtende stier som deler de innledende tegnene.
Da `/api/usage/om-usage` ble brukt som prefiks, ble `/api/usage/om-usage<anything>` merket som OFFENTLIG, og Next tolker
dette som `/api/usage/[connectionId]` — en håndterer uten egen autentisering.

```ts
// Reelle undertrær. Hver oppføring MÅ slutte med "/" (håndheves av en enhetstest).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // behandles som CLIENT_API i classify, ikke som offentlig uten autentisering
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Enkeltstående ruter, med EKSAKT samsvar (med eller uten avsluttende skråstrek).
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

// Skrivebeskyttede enkeltstående ruter som også får en lemping av CORS-opprinnelseskravet.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Skrivebeskyttet enkeltstående rute UTEN lemping av CORS-kravet.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Skrivebeskyttede ruter er offentlige **bare** for sikre metoder. Merk: `classifyRoute()` utelukker `/api/v1/*` og `/api/v1beta/*` fra PUBLIC-standardutfallet — disse er alltid `CLIENT_API`, slik at policyen for Bearer-nøkler fortsatt gjelder.

## Legge til en ny rute

### Mønster 1 — Offentlig klient-API-endepunkt (Bearer-autentisering)

Ruter under `/api/v1/` og `/api/v1beta/` klassifiseres automatisk som `CLIENT_API`. Mellomvaren håndhever Bearer-kontrollen. Rutehåndtererne trenger ikke å gjenta den, men kan lese subjektet dersom det er nyttig.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... håndteringslogikk
}
```

### Mønster 2 — Administrasjonsendepunkt (økt eller Bearer + administrasjon)

Bruk `requireManagementAuth()` fra `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... håndteringslogikk
}
```

`requireManagementAuth()` returnerer `null` ved suksess eller en JSON-feil som `Response`:

- 401 `AUTH_001` "Autentisering kreves" — ingen påloggingsopplysninger
- 403 — ugyldig Bearer **eller** Bearer finnes, men nøkkelen mangler omfanget `manage` / `admin`

`hasManageScope(scopes)` returnerer true for `"manage"` eller `"admin"`.

### Mønster 3 — Legge til i den offentlige tillatelseslisten

Velg mengde etter form, ikke bekvemmelighet. Én rute skal legges i `PUBLIC_API_ROUTES_EXACT` (eller `PUBLIC_READONLY_CORS_API_ROUTES` dersom den bare støtter GET). Bare et reelt undertre skal legges i `PUBLIC_API_ROUTE_PREFIXES`, og det **må slutte med `/`**. Hvis en enkeltstående rute legges i prefikslisten, blir også alle tilstøtende stier som deler de innledende tegnene, offentlige — inkludert søskenruter med dynamiske segmenter som legges til senere (GHSA-74g9-q8f6-793h). Oppdater enhetstestene i `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` og `tests/unit/authz/classify.test.ts`.

## Scopes

Tre navneområder. Hver sjekker leser kun sine egne strenger. Side-ved-side-visningen,
inkludert hvorfor `manage` feiler `scopeMatches` for `read:compression` og hvorfor et
`read` tilgangstoken ikke kan `PATCH /api/keys/{id}`, er
[Tre omfangsnavneområder](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API-nøkler inneholder en `scopes`-array (lagret som JSON i `api_keys.scopes`, se `src/lib/db/apiKeys.ts`).

### Administrasjonsomfang

- `manage` / `admin` — `hasManageScope`. Bearer-tilgang til administrasjons-API-ruter.
- `mcp:connect`, `self:usage`, `self:account-quota`, og
  `policy:bypass-provider-quota` er additive eksakt-match-omfang. De sitter
  utenfor `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` åpner kun
  `/api/mcp/` non-loopback-utskjæringen.

### MCP-verktøyomfang

Katalog og samsvarsregler (identisk streng, eller et gitt omfang som slutter med `*`):
[MCP-verktøyomfang](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` i `src/shared/constants/mcpScopes.ts` er det originale typede
undersettet, ikke den fulle katalogen. Håndhevelse kjører i
`open-sse/mcp-server/scopeEnforcement.ts` etter at `resolveCallerScopeContext()`
løser omfang fra MCP-autentiseringsinformasjon, forespørselsmetadata eller `OMNIROUTE_MCP_SCOPES`.
Den forblir av med mindre `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Tilgangstoken-omfang

`read` / `write` / `admin` på `oma_live_…` tokens, rangert etter `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Denne rangeringen gjelder kun for tilgangstoken-legitimasjonen.
Se [Administrasjonsautentisering](../guides/MANAGEMENT-AUTH.md).

## Bryter for påkrevd autentisering

`isAuthRequired()` i `src/shared/utils/apiAuth.ts` avgjør om **noen** autentisering i det hele tatt håndheves for en forespørsel:

- `settings.requireLogin === false` → autentisering er globalt deaktivert, unntatt for det alltid beskyttede nivået (se [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) og kallene som utleverer en legitimasjon den godtar. Disse krever samme legitimasjon som når innlogging er på: utstedelse av synk-tokens, utstedelse av CLI-tilgangstokens med hvilket som helst scope, og oppretting av en API-nøkkel med scopet `manage`/`admin`, tildeling av det scopet til en nøkkel, eller regenerering eller visning av en slik nøkkel (`requireCredentialForManagementScopedKey()` i `src/lib/api/requireManagementAuth.ts`). Nøkler som bare er for inferens, forblir åpne.
- Ingen passord konfigurert **og** ingen `INITIAL_PASSWORD`-miljøvariabel → bootstrap-modus tillater introduksjonsveiviseren og loopback-forespørsler, men eksponerte nettverksforespørsler krever fortsatt legitimasjon.
- Enhver DB-feil → stenger for tilgang (sikker som standard).

Håndhevingen av klient-API-nøkkel bruker `isRequireApiKeyEnabled()` i `src/shared/utils/featureFlags.ts`, ikke en direkte lesing av `process.env.REQUIRE_API_KEY`. Dette betyr noe for utrullede instanser: å veksle `REQUIRE_API_KEY` i Dashboard → Feature Flags lagrer en DB-overstyring og påvirker umiddelbart `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` og andre autentiseringssjekker for klient-API-et som deler denne hjelperen. Hvis feature flag-lageret ikke kan leses, stenger autentiseringen for klient-API-et for tilgang og krever en nøkkel.

## Inkompatibel endring — v3.8.0

Endepunktene `/api/v1/agents/tasks/*` og `/api/resilience/model-cooldowns` **krever nå administrasjonsautentisering** (commit `588a0333`). Klienter som tidligere sendte en vanlig API-nøkkel uten tilgangsområdet `manage`, mottar `403`. Migrering: Gi enten nøkkelen tilgangsområdet `manage` i API Keys-kontrollpanelet, eller bruk en innlogget kontrollpaneløkt.

## Atferdsendring — v3.8.2

`/api/mcp/*` (den eksterne MCP-serveren) er fortsatt LOCAL_ONLY som standard, men godtar nå forespørsler som ikke kommer fra tilbakekoblingsgrensesnittet, når `Authorization: Bearer <api-key>`-headeren har tilgangsområdet `manage`. Unntaket aktiveres eksplisitt per bane via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` i `src/server/authz/routeGuard.ts`; det beslektede LOCAL_ONLY-prefikset `/api/cli-tools/runtime/*` kan med hensikt IKKE omgås fordi det kan starte vilkårlige underprosesser. Anonyme forespørsler til `/api/mcp/*` som ikke kommer fra tilbakekoblingsgrensesnittet, returnerer fortsatt `403 LOCAL_ONLY` — standarden for alle nye LOCAL_ONLY-baner er fortsatt streng tilbakekobling. Se [Nivåer for rutebeskyttelse](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testing

- Enhetstester: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Offentlig tillatelsesliste: `tests/unit/public-api-routes.test.ts`.
- Kjør målrettet: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Feilsøking

Pipelinen merker alltid svar med:

```
x-request-id:               <korrelasjons-ID, gjengitt i feilmeldinger>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

For autentiserte forespørsler inkluderer forespørselshodene oppstrøms (på handlersiden) også:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (valgfri)
x-omniroute-auth-scopes:    kommadelt liste
```

Bruk `assertAuth(req, expectedClass)` i handlere — den utløser `AuthzAssertionError` med koden `AUTHZ_NOT_INITIALIZED` hvis mellomvaren ble omgått (nyttig for å oppdage konfigurasjonsregresjoner i tester).

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentiseringsmarkør per endepunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revisjonslogg for autentiseringshendelser
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tre omfang-navneområder og MCP verktøy-omfangskatalog
- Kilde: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
