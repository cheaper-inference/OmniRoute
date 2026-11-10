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

Brukes for klient-API-ene som er kompatible med OpenAI/Anthropic/Gemini, og for enkelte administrasjonsruter når nøkkelen har området `manage`.

```
Authorization: Bearer <api-key>
```

Valideres av `isValidApiKey()` / `extractApiKey()` i `src/sse/services/auth.ts` og eksporteres på nytt via `src/shared/utils/apiAuth.ts`. Validatoren godtar også miljøvariablene `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som permanente gjennomslippsnøkler (sak #1350).

### 2. Dashboardøkt (`auth_token`-cookie)

For dashboardsider og administratoroperasjoner.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

En cookie er bare en økt når JWT-en verifiseres **og** inneholder `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Alle
forbrukere av cookien (dashboard-rutebeskyttelse (`isDashboardSessionAuthenticated()`), oppdatering i autorisasjonspipelinen, WebSocket-håndtrykk, liveserveren, `/api/settings/require-login`, `/api/auth/status`) går gjennom denne hjelperen.
Det finnes andre JWT-er signert med `JWT_SECRET` — Cursor CLI-gjennomslippet utsteder
`iss "omniroute" / aud "cursor-cli"`-tokens for nøkkelinnehavere — og de er aldri økter
(#13298).

Verifiseres av `isDashboardSessionAuthenticated()` i `src/shared/utils/apiAuth.ts`. Pipelinen oppdaterer automatisk JWT-en når det er mindre enn 7 dager igjen av levetiden på 30 dager.

En økt kan også avsluttes før de 30 dagene er gått, fordi alle utstedere går gjennom `mintDashboardSessionToken` (et utstedelsestidspunkt `iat` og en ID `jti`), og verifikatoren kontrollerer to innstillinger: `sessionsValidAfter`, som angis ved passordendring slik at alle økter utstedt før dette tidspunktet slutter å verifiseres (nettleseren som endret passordet får en ny cookie), og `revokedDashboardSessions`, som `POST /api/auth/logout` legger den utloggede øktens `jti` til. Økter som er utstedt av en eldre versjon, mangler begge kravene og forblir gyldige frem til den første passordendringen. Hvis innstillingene ikke kan leses, stoles det ikke på økten.

Enkelte administrasjonsruter godtar **enten** modus: cookie ELLER `Bearer <key>` når API-nøkkelen har området `manage` (eller `admin`). Dette muliggjør arbeidsflyten «konfigurerbar via API-kall» som ble lagt til i v3.8.

#### Valgfri OIDC-påloggingsport (#6973)

Dashboardets administratorpålogging støtter også en **opt-in** OIDC (OpenID Connect)-flyt
i tillegg til standardpålogging med passord — passordpålogging fjernes aldri, den
suppleres bare:

- Deaktivert med mindre `settings.oidcEnabled === true` **og** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` er konfigurert (Innstillinger → Autentisering).
  `GET /api/auth/oidc/login` returnerer `400` ellers.
- `GET /api/auth/oidc/login` finner `authorization_endpoint` fra utstederens
  `/.well-known/openid-configuration` (bruker `<issuer>/authorize` som
  reserve), bygger omdirigerings-URI-en fra den innkommende forespørselen
  (tar hensyn til `x-forwarded-proto`) og omdirigerer til IdP-en med en tilfeldig
  `state` lagret i en `httpOnly`-cookie kalt `oidc_state`.
- `GET /api/auth/oidc/callback` validerer `state`, utveksler autorisasjonskoden
  og verifiserer ID-tokenets signatur via utstederens JWKS
  (`jose` sin `createRemoteJWKSet`, bufret per JWKS-URI), med kontroller av
  `issuer`/`audience`. Tilgang til dashbordet krever en ikke-tom
  `oidcAllowedSubjects`-liste, en `oidcAdmissionClaim`-policy eller begge deler.
  Subjektlisten samsvarer med `sub` eller `email` bare når
  `email_verified === true`. Den valgfrie claim-policyen bruker en
  punktumseparert ID-token-claim-bane (for eksempel `realm_access.roles`) og
  en matrise med godkjente verdier; den oppslåtte claimen må være en matrise
  med strenger som inneholder minst én godkjent verdi. Hvis begge policyene er
  konfigurert, må begge godkjennes. Manglende eller feilformaterte claimer
  avslår som standard, og uten noen av policyene avviser callbacken innlogging
  (`not_configured`). Eksisterende konfigurasjoner som bare bruker subjekt,
  fortsetter uendret.
- Keycloak tilordner normalt realm-roller til access-token-er, ikke nødvendigvis
  ID-token-er. Hvis du vil kreve realm-rollen `admin`, konfigurerer du en
  protokolltilordning for denne klienten som inkluderer `realm_access.roles` i
  **ID-tokenet**, og setter deretter `oidcAdmissionClaim` til
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Kontroller den faktiske ID-token-claimen for denne klienten før du aktiverer
  rollebasert tilgang alene; applikasjonen leser ikke roller fra access-token-et.
  Tokenavvisning på IdP-siden kan komme i tillegg, men erstatter ikke denne
  kontrollen på applikasjonssiden.
- Ved vellykket innlogging utsteder den nøyaktig den **samme** 30-dagers
  `auth_token`-JWT-en som passordinnloggingen utsteder
  (`src/app/api/auth/login/route.ts`), slik at resten av dashbordets
  sesjonsflyt (automatisk fornyelse, cookie-flagg) er uendret —
  OIDC erstatter bare hvordan cookien utstedes, ikke hva den gir tilgang til.
  Endringer i IdP-roller/-grupper ugyldiggjør ikke eksisterende OmniRoute-økter;
  utlogging, passordrotasjon eller utløp av økten styrer fortsatt levetiden.
- Hver `oidc*`-innstilling (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) finnes i
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings` svarer med `400 PASSWORD_REQUIRED` med mindre
  forespørselen inneholder administratorpassordet som `currentPassword`
  (`401 PASSWORD_MISMATCH` når det er feil).
  `oidcDisablePasswordLogin` avviser passord _login_ (`POST /api/auth/login`),
  men beholder det lagrede passordhashen, og reautentisering kontrollerer fortsatt
  `currentPassword` mot den.
- `corsOrigins` og `bruteForceProtection` finnes også i
  `SECURITY_IMPACTING_SETTINGS_KEYS`: Hvis noen av dem gjøres mindre strenge,
  svekkes innloggingsbeskyttelsen, så de krever samme reautentisering med
  `currentPassword` (Sikkerhet-fanen ber om dette), og JSON-importen forkaster dem.
- Alle sikkerhetspolicy-nøkler — oppføringene i
  `SECURITY_IMPACTING_SETTINGS_KEYS`, alle `oidc*`-nøkler og
  dashbordets sesjonstilstand — er **bare for operatører** på
  `PATCH /api/settings`: en API-nøkkel med manage-omfang eller et
  `oma_`-tilgangstoken avvises med `403`, selv når det sendes med riktig
  `currentPassword`, og avvisningen logges som `settings.update_failed` med
  `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` i `src/lib/api/operatorCredential.ts`).
  Vanlige innstillinger (tema, visningspreferanser) kan fortsatt skrives av en
  `manage`-nøkkel eller et `admin`-tilgangstoken. Hver endring av selve
  `/api/settings` (og av `/api/settings/require-login`) krever også omfanget
  `admin` for tilgangstokenet
  (`ADMIN_MUTATION_EXACT_PATHS` i `src/server/authz/accessScopes.ts`, samsvar
  med nøyaktig bane); `GET` beholder `read`, og de andre
  `/api/settings/*`-underbanene (proxyer, kombinasjonsstandarder,
  modelaliaser, komprimering, tømming …) beholder det metoden utledede
  `write`-omfanget.
- `POST /api/settings/import-json` hopper over denne reautentiseringen og
  forkaster derfor hver nøkkel i `IMPORT_STRIPPED_SETTINGS_KEYS` (samme fil)
  før skriving: passordet og `currentPassword`, alle oppføringer i
  `SECURITY_IMPACTING_SETTINGS_KEYS` og dashbordets sesjonstilstand
  (`sessionsValidAfter`, `revokedDashboardSessions`).
  Import av en eldre sikkerhetskopi kan derfor ikke gjenopplive en økt som
  allerede ble avsluttet av en passordendring eller utlogging.

#### Valgfri TOTP-tofaktorinnlogging (#16619)

Aktiveres fra Innstillinger → Sikkerhet; er deaktivert til operatøren slår den på
(`src/server/auth/dashboardMfa.ts`).

- **Dette dekker:** passordpålogging (`POST /api/auth/login`, som deretter trenger
  `POST /api/auth/mfa/verify`) og `omniroute connect` (`POST /api/cli/connect`,
  som avviser en utveksling som bare bruker passord, og tar koden som `totp`).
- **Dette dekker ikke:** OIDC-/SSO-pålogging (`/api/auth/oidc/callback`) ber
  ikke om OmniRoute-TOTP. Den er avhengig av identitetsleverandørens egen andre
  faktor, så håndhev MFA hos IdP-en hvis OIDC er aktivert.
- **Gjenoppretting** (mistet enhet, ingen gjenopprettingskoder igjen, eller en faktor
  som ikke lenger kan bekreftes, for eksempel etter at `STORAGE_ENCRYPTION_KEY` ble
  endret):
  1. Start serveren på nytt med `OMNIROUTE_DISABLE_MFA=true`.
  2. Logg inn med passordet på selve verten (loopback-peer og loopback-`Host`, for eksempel
     `http://localhost:20128`). Den andre faktoren hoppes over kun for denne opprinnelsen; alle andre opprinnelser trenger fortsatt koden.
  3. Gå til Innstillinger → Sikkerhet → Deaktiver, angi passordet og la koden
     stå tom. `POST /api/auth/mfa/disable` godtar en body uten `code` bare mens
     variabelen er satt og forespørselen kommer fra verten; den krever fortsatt
     dashbordøkten og det gjeldende passordet, og blir loggført som
     `auth.mfa.disabled` med `secondFactor: "recovery_switch"`.
  4. Fjern `OMNIROUTE_DISABLE_MFA`, start på nytt, og registrer på nytt
     ved behov.

## Rutetyper

`src/server/authz/types.ts` definerer tre typer. Enhver rute som ikke kan klassifiseres deterministisk, faller tilbake til `MANAGEMENT`.

| Type         | Beskrivelse                                                                                                                                                   | Autentisering kreves                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | Eksplisitt trygge ruter: innlogging, utlogging, status, init, helsesjekk og onboarding-bootstrap.                                                             | Ingen                                                           |
| `CLIENT_API` | Endepunkter for modelltjenester: `/api/v1/*`, `/api/v1beta/*`, pluss aliasene `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-nøkkel når feature flagget `REQUIRE_API_KEY` er aktivert |
| `MANAGEMENT` | Dashboardsider, innstillinger, leverandører, nøkler, admin- og diagnoseendepunkter.                                                                           | Dashboard-økt ELLER Bearer med scopet `manage`                  |

Noen `MANAGEMENT`-handlinger er **kun for operatøren**: en nøkkel med scopet `manage` er ikke nok. Eksport av lagrede legitimasjoner (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), gjenoppretting av en sikkerhetskopi over de aktive dataene (`POST /api/db-backups/import`, inkludert `dryRun=true`, `POST /api/db-backups` gjenoppretting via id, `POST /api/settings/import-json`) og sletting av gjenopprettingspunkter (`DELETE /api/db-backups` for opprydding, og `PATCH /api/db-backups` fordi den lagrede retensjonen styrer den automatiske opprydningen etter hver sikkerhetskopi) krever en dashboard-økt, den lokale CLI-identiteten eller at innlogging er deaktivert. Utstedelse av et synk-token (`POST /api/sync/tokens`) og oppretting av et `admin`-tilgangstoken for CLI (`POST /api/cli/tokens`) krever en dashboard-økt eller den lokale CLI-identiteten i alle innloggingsmoduser. API-nøkler med hvilket som helst scope og `oma_`-tilgangstokens er ikke operatørlegitimasjoner: de får `403` når en slik kreves. Kontrollen ligger i `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Endring av innloggingsinnstillingene er også bare for operatøren: `POST /api/settings/require-login` (sett administrasjonspassordet / slå `requireLogin` av og på) godtar bare disse legitimasjonene når et passord finnes. Bootstrap-vinduet ved første oppsett (ingen passord ennå) er uendret, og en dashboard-økt må sende `currentPassword` for å erstatte passordet (`403` når det mangler eller er feil, logget som `settings.update_failed`). Den lokale CLI-en og en instans med innlogging deaktivert beholder gjenopprettingsveien og kan sette et passord uten det, fordi begge er bundet til verten som eier datamappen.

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

Klarerte interne overskrifter (definert i `src/server/authz/headers.ts`) er** fjernet fra innkommende forespørsler** før klassifisering kan — klienter ikke forhåndsutfylle `x-omniroute-auth-*` for å etterligne et emne.

### Forsikringskontrakter

Hver ruteklasse har en policy i `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnerer alltid `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — trekker ut bærer, validerer via `validateApiKey()`. Faller gjennom til anonym bare når det effektive `REQUIRE_API_KEY` funksjonsflagget er deaktivert. Det effektive flagget løses gjennom `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) så Dashboard-funksjonsflagg og miljøvariabler styrer `/api/v1/*`, `/api/v1beta/*` og aliaser konsekvent; løser feil feil lukket. Tillater dashboard-øktforespørsler på klientens API ruter (inkludert `/api/v1/models`, brukt av dashbordmodellkatalogen). Når Entra ID SSO er aktivert, håndteres en bærer som strukturelt er en Entra-token (tre base64url-segmenter, `RS*` alg, `kid`) av SSO -grenen** før** `validateApiKey()` og dens dom er endelig — den faller aldri gjennom til API-nøkkelbanen eller grenen degradere-til-anonym, så et brudd på identitetsleverandøren kan ikke bli åpen tilgang. Statiske API nøkler påvirkes ikke. Se [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — aksepterer dashbordøkter, interne modellsynkroniseringsforespørsler (matchet mot `/api/providers/[name]/(sync-models|models)`), eller hopper over helt hvis `isAuthRequired()` returnerer falsk. Returnerer 403 (`AUTH_001`) når et bærertoken er tilstede, men ugyldig, ellers 401. Håndhever også rutevaktnivåene (LOCAL_ONLY / ALWAYS_PROTECTED) før en hvilken som helst autentiseringsgren — se [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY baner i `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (i dag: `/api/mcp/`) kan nås fra ikke-loopback når bærernøkkelen bærer `manage` omfanget; alle andre LOCAL_ONLY baner forblir strenge tilbakeløp uavhengig av omfang.

En vellykket policy returnerer `AuthSubject` med `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Nedstrømsbehandlere kan lese den via `assertAuth(request, "CLIENT_API")` i `src/server/authz/assertAuth.ts` i stedet for å kjøre autentiseringslogikk på nytt.

## Liste over offentlige ruter

`src/shared/constants/publicApiRoutes.ts` er den eksplisitte tillatelseslisten:

Listen er delt inn etter **form**, og oppdelingen er avgjørende (GHSA-74g9-q8f6-793h): Et prefiks
sjekkes med `startsWith()`, så det samsvarer også med alle tilstøtende stier som deler de samme
innledende tegnene. `/api/usage/om-usage` som prefiks merket `/api/usage/om-usage<anything>` som PUBLIC,
og Next løser dette til `/api/usage/[connectionId]` — en håndterer uten egen autentisering.

```ts
// Ekte undertrær. Hver oppføring MÅ slutte med "/" (bekreftes av en enhetstest).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // behandles som CLIENT_API i classify, ikke som "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Enkeltstående ruter, samsvarer EKSAKT (med eller uten avsluttende skråstrek).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // innloggingstrinn 2 for valgfri TOTP; krever MFA-pågående informasjonskapsel
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Skrivebeskyttede enkeltstående ruter som også bruker CORS-opprinnelsesavslapningen.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Skrivebeskyttet enkeltstående rute UTEN CORS-opprinnelsesavslapningen.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Skrivebeskyttede ruter er offentlige **bare** for sikre metoder. Merk: `classifyRoute()` utelukker `/api/v1/*` og `/api/v1beta/*` fra PUBLIC-reservehåndteringen — disse er alltid `CLIENT_API`, slik at Bearer-nøkkelpolicyen fortsatt gjelder.

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

Rørledningen stempler alltid svar med:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

For autentiserte forespørsler inkluderer oppstrøms (handler-side) forespørselshodene også:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Bruk `assertAuth(req, expectedClass)` inne i behandlere — det kaster `AuthzAssertionError` med kode `AUTHZ_NOT_INITIALIZED` hvis mellomvaren ble forbigått (nyttig for å fange opp konfigurasjonsregresjoner i tester).

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentiseringsmarkør per endepunkt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revisjonslogg for autentiseringshendelser
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tre omfang-navneområder og MCP verktøy-omfangskatalog
- Kilde: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
