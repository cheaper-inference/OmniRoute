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

Wordt gebruikt voor de met OpenAI/Anthropic/Gemini compatibele client-API's en enkele beheer-routes wanneer de sleutel de scope `manage` heeft.

```
Authorization: Bearer <api-key>
```

Gevalideerd door `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts` en opnieuw geëxporteerd via `src/shared/utils/apiAuth.ts`. De validator accepteert ook de omgevingsvariabelen `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` als permanente passthrough-sleutels (issue #1350).

### 2. Dashboardsessie (auth_token-cookie)

Voor dashboardpagina's en beheerdersbewerkingen.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Een cookie is alleen een sessie wanneer de JWT wordt geverifieerd **en** `authenticated: true` bevat
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Elke
gebruiker van de cookie (de routebeveiliging van het dashboard (`isDashboardSessionAuthenticated()`), het vernieuwen van de authz-pipeline, de WebSocket-handshake, de live
server, `/api/settings/require-login`, `/api/auth/status`) gebruikt deze helper.
Er bestaan ook andere JWT's die zijn ondertekend met `JWT_SECRET` — de Cursor CLI-passthrough maakt tokens aan met
`iss "omniroute" / aud "cursor-cli"` voor sleutelhouders — en dit zijn nooit sessies
(#13298).

Gecontroleerd door `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts`. De pipeline vernieuwt de JWT automatisch wanneer deze nog minder dan 7 dagen geldig is binnen de levensduur van 30 dagen.

Een sessie kan ook eindigen voordat die 30 dagen voorbij zijn, omdat elke aanmaker via `mintDashboardSessionToken` gaat (een uitgiftetijdstip `iat` en een id `jti`) en de verifier twee instellingen controleert: `sessionsValidAfter`, ingesteld bij een wachtwoordwijziging zodat elke sessie die daarvoor is uitgegeven niet meer wordt geverifieerd (de browser waarin het wachtwoord is gewijzigd krijgt een nieuwe cookie), en `revokedDashboardSessions`, waaraan `POST /api/auth/logout` de `jti` van de afgemelde sessie toevoegt. Sessies die door een oudere release zijn aangemaakt, bevatten geen van beide claims en blijven geldig tot de eerste wachtwoordwijziging. Als de instellingen niet kunnen worden gelezen, wordt de sessie niet vertrouwd.

Sommige beheerroutes accepteren **een van beide** modi: cookie OF `Bearer <key>` wanneer de API-sleutel de scope `manage` (of `admin`) heeft. Dit maakt de workflow "configureerbaar via API-aanroepen" mogelijk die in v3.8 is toegevoegd.

#### Optionele OIDC-aanmeldingsbeperking (#6973)

De aanmelding bij het dashboardbeheer ondersteunt ook een **opt-in** OIDC-stroom (OpenID Connect)
naast de standaardaanmelding met een wachtwoord — aanmelden met een wachtwoord wordt nooit verwijderd, maar
alleen aangevuld:

- Uitgeschakeld tenzij `settings.oidcEnabled === true` **en** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` allemaal zijn geconfigureerd (Instellingen → Authenticatie).
  `GET /api/auth/oidc/login` retourneert anders `400`.
- `GET /api/auth/oidc/login` ontdekt het `authorization_endpoint` vanuit de
  `/.well-known/openid-configuration` van de issuer (valt terug op
  `<issuer>/authorize`), bouwt de omleidings-URI op basis van het inkomende verzoek
  (`x-forwarded-proto`-bewust) en stuurt door naar de IdP met een willekeurige `state`
  die wordt opgeslagen in een `httpOnly`-cookie `oidc_state`.
- `GET /api/auth/oidc/callback` valideert `state`, wisselt de autorisatiecode uit en
  verifieert de handtekening van het ID-token via de JWKS van de issuer
  (`jose`'s `createRemoteJWKSet`, gecachet per JWKS-URI) met controles op `issuer` en
  `audience`. Toegang tot het dashboard vereist een niet-lege lijst
  `oidcAllowedSubjects`, een beleid voor `oidcAdmissionClaim`, of beide. De
  subjectlijst komt alleen overeen met `sub` of `email` wanneer
  `email_verified === true`. Het optionele claimbeleid gebruikt een
  puntgescheiden pad naar een ID-token-claim (bijvoorbeeld,
  `realm_access.roles`) en een array met geaccepteerde waarden; de opgeloste claim
  moet een array van tekenreeksen zijn die ten minste één geaccepteerde waarde
  bevat. Als beide beleidsregels zijn geconfigureerd, moeten beide slagen.
  Ontbrekende of verkeerd gevormde claims leiden tot een weigering en zonder
  een van beide beleidsregels weigert de callback de aanmelding
  (`not_configured`). Bestaande configuraties die alleen op subjects zijn gebaseerd,
  blijven ongewijzigd.
- Keycloak koppelt realm-rollen normaal gesproken aan access-tokens, en niet
  noodzakelijkerwijs aan ID-tokens. Als je de realm-rol `admin` wilt vereisen,
  configureer je voor deze client een protocolmapper die `realm_access.roles`
  opneemt in het **ID-token** en stel je `oidcAdmissionClaim` in op
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Controleer de daadwerkelijke ID-token-claim voor deze client voordat je
  toelating uitsluitend op rollen baseert; de applicatie leest geen rollen uit
  access-tokens. Weigering van tokens aan de kant van de IdP kan deze controle
  aan de kant van de applicatie aanvullen, maar niet vervangen.
- Bij succes geeft het precies dezelfde 30 dagen geldige `auth_token`-JWT uit als
  de aanmelding met een wachtwoord (`src/app/api/auth/login/route.ts`), zodat de
  rest van de sessiepijplijn van het dashboard (automatisch vernieuwen,
  cookievlaggen) ongewijzigd blijft — OIDC vervangt alleen de manier waarop de
  cookie wordt uitgegeven, niet wat deze toestaat. Wijzigingen in IdP-rollen of
  -groepen maken bestaande OmniRoute-sessies niet ongeldig; uitloggen, het
  wijzigen van het wachtwoord of het verlopen van de sessie bepaalt nog steeds
  de levensduur ervan.
- Elke `oidc*`-instelling (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) staat in
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings` antwoordt met `400 PASSWORD_REQUIRED` tenzij de body het
  beheerderswachtwoord bevat als `currentPassword` (`401 PASSWORD_MISMATCH`
  wanneer dit onjuist is). `oidcDisablePasswordLogin` weigert
  wachtwoordaanmelding (`POST /api/auth/login`), maar behoudt de opgeslagen
  wachtwoordhash; bij herauthenticatie wordt `currentPassword` nog steeds
  daartegen gecontroleerd.
- `corsOrigins` en `bruteForceProtection` staan ook in
  `SECURITY_IMPACTING_SETTINGS_KEYS`: het versoepelen van een van beide verzwakt
  de aanmeldingsbeveiliging, dus hiervoor is dezelfde herauthenticatie met
  `currentPassword` nodig (het tabblad Beveiliging vraagt hierom) en bij het
  importeren van JSON worden ze verwijderd.
- Elke sleutel voor beveiligingsbeleid — de vermeldingen in
  `SECURITY_IMPACTING_SETTINGS_KEYS`, elke `oidc*`-sleutel en de sessiestatus van
  het dashboard — is **uitsluitend voor operators** bij `PATCH /api/settings`:
  een API-sleutel met manage-scope of een `oma_`-access-token wordt geweigerd met
  `403`, zelfs wanneer deze de juiste `currentPassword` meestuurt, en de weigering
  wordt geaudit als `settings.update_failed` met
  `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` in `src/lib/api/operatorCredential.ts`).
  Gewone instellingen (thema, weergavevoorkeuren) blijven schrijfbaar voor een
  `manage`-sleutel of een `admin`-access-token. Voor elke mutatie van
  `/api/settings` zelf (en van `/api/settings/require-login`) is ook de
  `admin`-access-tokenscope vereist
  (`ADMIN_MUTATION_EXACT_PATHS` in `src/server/authz/accessScopes.ts`, met
  exacte padvergelijking); `GET` blijft `read`, en de andere
  `/api/settings/*`-subroutes (proxies, standaardwaarden voor combinaties,
  modelaliassen, compressie, opschoningen…) behouden de op de methode
  gebaseerde `write`-scope.
- `POST /api/settings/import-json` slaat die herauthenticatie over en verwijdert
  daarom elke sleutel in `IMPORT_STRIPPED_SETTINGS_KEYS` (hetzelfde bestand)
  voordat er wordt geschreven: het wachtwoord en `currentPassword`, elke
  vermelding in `SECURITY_IMPACTING_SETTINGS_KEYS` en de sessiestatus van het
  dashboard (`sessionsValidAfter`, `revokedDashboardSessions`).
  Het importeren van een oudere back-up kan daardoor geen sessie herstellen die
  al door een wachtwoordwijziging of afmelding is beëindigd.

#### Optionele TOTP-aanmelding met twee factoren (#16619)

Wordt ingeschakeld via Instellingen → Beveiliging; staat uit totdat de operator
dit activeert (`src/server/auth/dashboardMfa.ts`).

- **Wat het omvat:** inloggen met een wachtwoord (`POST /api/auth/login`, waarvoor vervolgens
  `POST /api/auth/mfa/verify` nodig is) en `omniroute connect` (`POST /api/cli/connect`,
  dat een uitwisseling met alleen een wachtwoord weigert en de code als `totp` gebruikt).
- **Wat het niet omvat:** OIDC-/SSO-aanmelding (`/api/auth/oidc/callback`) vraagt niet om de OmniRoute TOTP. Deze
  gebruikt de eigen tweede factor van de identityprovider. Schakel MFA daarom afgedwongen in de IdP in als OIDC is ingeschakeld.
- **Herstel** (kwijtgeraakt apparaat, geen herstelcodes meer, of een factor die niet langer
  kan worden geverifieerd, bijvoorbeeld nadat `STORAGE_ENCRYPTION_KEY` is gewijzigd):
  1. Start de server opnieuw met `OMNIROUTE_DISABLE_MFA=true`.
  2. Meld u op de host zelf aan (loopback-peer en loopback `Host`, zoals
     `http://localhost:20128`) met het wachtwoord. De tweede factor wordt alleen voor die oorsprong overgeslagen; voor elke andere oorsprong is de code nog steeds vereist.
  3. Ga naar Instellingen → Beveiliging → Uitschakelen, voer het wachtwoord in en laat de code leeg. `POST /api/auth/mfa/disable` accepteert alleen zonder `code` een body terwijl
     de variabele is ingesteld en het verzoek afkomstig is van de host; de dashboard-sessie en het huidige wachtwoord blijven vereist, en de actie wordt geregistreerd als
     `auth.mfa.disabled` met `secondFactor: "recovery_switch"`.
  4. Hef de instelling van `OMNIROUTE_DISABLE_MFA` op, start opnieuw en registreer MFA indien nodig opnieuw.

## Routeklassen

`src/server/authz/types.ts` definieert drie klassen; elke route die niet deterministisch kan worden geclassificeerd, valt terug op `MANAGEMENT`.

| Klas         | Beschrijving                                                                                                                                           | Verificatie vereist                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `PUBLIC`     | Expliciet veilige routes — inloggen, uitloggen, status, gezondheid, onboarding bootstrap.                                                              | Geen                                                                               |
| `CLIENT_API` | Model-serving eindpunten — `/api/v1/*`, `/api/v1beta/*`, plus aliassen `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-sleutel wanneer de effectieve `REQUIRE_API_KEY` functievlag is ingeschakeld |
| `MANAGEMENT` | Dashboardpagina's, instellingen, providers, sleutels, beheerders- en diagnostische eindpunten.                                                         | Dashboardsessie OR Bearer met `manage` -scope                                      |

Een paar `MANAGEMENT` acties wel** alleen voor de operator** : een `manage` sleutel is niet genoeg. Voor het exporteren van opgeslagen inloggegevens (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), het herstellen van een back-up over de live gegevens (`POST /api/db-backups/import` inclusief `dryRun=true`, `POST /api/db-backups` restore by id, `POST /api/settings/import-json`), het vernietigen van herstelpunten (`DELETE /api/db-backups` cleanup en `PATCH /api/db-backups` omdat de retentie ervan het automatische snoeien na elke back-up aanstuurt) is een dashboardsessie vereist, het lokale CLI onderwerp of inloggen uitgeschakeld. Voor het uitgeven van een synchronisatietoken (`POST /api/sync/tokens`) en het aanmaken van een `admin` CLI toegangstoken (`POST /api/cli/tokens`) is in elke inlogmodus een dashboardsessie of het lokale CLI onderwerp vereist. API sleutels van elk bereik en `oma_` toegangstokens zijn geen inloggegevens van de operator: ze krijgen `403` wanneer er een nodig is. De cheque bevindt zich in `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Het wijzigen van de inloginstellingen kan ook alleen door de operator: `POST /api/settings/require-login` (stel het beheerwachtwoord in / schakel `requireLogin` in) accepteert alleen die inloggegevens zodra er een wachtwoord bestaat — het bootstrap-venster voor de eerste keer uitvoeren (nog geen wachtwoord) is ongewijzigd — en een dashboardsessie moet `currentPassword` verzenden om het wachtwoord te vervangen (`403` wanneer het ontbreekt of verkeerd is, gecontroleerd als `settings.update_failed`). De lokale CLI en een instantie waarbij inloggen is uitgeschakeld behouden het herstelpad en kunnen zonder dit pad een wachtwoord instellen, aangezien beide gebonden zijn aan de host die eigenaar is van de gegevensmap.

## Pijpleiding

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

Vertrouwde interne headers (gedefinieerd in `src/server/authz/headers.ts`) zijn dat wel** ontdaan van inkomende verzoeken** vóór classificatie kunnen — clients `x-omniroute-auth-*` niet vooraf invullen om een onderwerp na te bootsen.

### Beleidscontracten

Elke routeklasse heeft een beleid in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — retourneert altijd `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extraheert Bearer, valideert via `validateApiKey()`. Valt alleen door naar anoniem wanneer de effectieve `REQUIRE_API_KEY` functievlag is uitgeschakeld. De effectieve vlag wordt opgelost via `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), zodat Dashboard Feature Flags en omgevingsvariabelen `/api/v1/*`, `/api/v1beta/*` en aliassen consistent beheren; fouten in de oplosser zijn mislukt. Staat dashboardsessieverzoeken toe op client API routes (inclusief `/api/v1/models`, gebruikt door de dashboardmodelcatalogus). Wanneer Entra ID SSO is ingeschakeld, wordt een Bearer die structureel een Entra-token is (drie base64url-segmenten, `RS*` alg, `kid`) afgehandeld door de SSO vertakking** voor** `validateApiKey()` en zijn oordeel is definitief. — valt nooit door naar het API-sleutelpad of de degrade-naar-anonieme vertakking, dus een storing van de identiteitsprovider kan geen open toegang worden. Statische API sleutels worden niet beïnvloed. Zie [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — accepteert dashboardsessies, interne modelsynchronisatieverzoeken (gematcht met `/api/providers/[name]/(sync-models|models)`), of slaat deze volledig over als `isAuthRequired()` false retourneert. Retourneert 403 (`AUTH_001`) wanneer een Bearer-token aanwezig is maar ongeldig, anders 401. Dwingt ook de route-guard-niveaus (LOCAL_ONLY / ALWAYS_PROTECTED) af vóór elke auth-vertakking — zie [Route Guard-niveaus](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY paden in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (vandaag: `/api/mcp/`) zijn toegankelijk vanuit niet-loopback wanneer de Bearer-sleutel de `manage` scope draagt; alle andere LOCAL_ONLY paden blijven strikte loopback, ongeacht de reikwijdte.

Een succesvol beleid retourneert `AuthSubject` met `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Stroomafwaartse handlers kunnen het lezen via `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts` in plaats van de auth-logica opnieuw uit te voeren.

## Lijst met openbare routes

`src/shared/constants/publicApiRoutes.ts` is de expliciete toelatingslijst:

De lijst is opgesplitst per** vorm** , en de splitsing is dragend (GHSA-74g9-q8f6-793h): een voorvoegsel wordt gekoppeld aan `startsWith()`, dus het komt ook overeen met elk aangrenzend pad dat de hoofdletters deelt. `/api/usage/om-usage` als voorvoegsel gemarkeerd `/api/usage/om-usage<anything>` PUBLIC, en Next lost dat op in `/api/usage/[connectionId]` — een handler zonder eigen authenticatie.

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

Alleen-lezen routes zijn openbaar** alleen** voor veilige methoden. Opmerking: `classifyRoute()` sluit `/api/v1/*` en `/api/v1beta/*` uit van de PUBLIC fall-through — Deze zijn altijd `CLIENT_API` dus het Bearer-key-beleid is nog steeds van toepassing.

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

## Verificatie vereist schakelen

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` beslist of** elk** auth wordt afgedwongen voor een verzoek:

- `settings.requireLogin === false` → auth is globaal uitgeschakeld, behalve voor de altijd beschermde laag (zie [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) en de oproepen die een inloggegevens uitdelen die het accepteert, die dezelfde inloggegevens nodig hebben als bij inloggen: het uitgeven van synchronisatietokens, het aanmaken van CLI toegangstokens op elk bereik, en het maken van een API sleutel met de `manage`/`admin` -scope, het toekennen van die reikwijdte aan een sleutel, of het opnieuw genereren of onthullen van een dergelijke sleutel (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`). Alleen-inferentietoetsen blijven open. Het schrijven van een beschermde functievlag (`REQUIRE_API_KEY`, de andere beveiligingsvlaggen en de SSRF / TLS / MCP-scope / sandbox-vlaggen vermeld in [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) ) en het opslaan van de PII maskeringsinstellingen (`PUT /api/settings/pii`) blijven ook een referentie nodig hebben.
- Geen wachtwoord geconfigureerd** En** no `INITIAL_PASSWORD` env var → bootstrap-modus staat de onboarding-wizard en loopback-verzoeken toe, maar voor blootgestelde netwerkverzoeken zijn nog steeds inloggegevens nodig. Uitzondering: voor het schrijven van een beschermde functievlag en het opslaan van de PII maskeringsinstellingen (`PUT /api/settings/pii`) is zelfs een referentie van loopback nodig, dus loopback op zichzelf is daar niet voldoende.
- Elke DB -fout → mislukt gesloten (standaard beveiligd).

Client API -sleutelafdwinging gebruikt `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts`, niet een directe `process.env.REQUIRE_API_KEY` lezing. Dit is van belang voor geïmplementeerde instances: het in- en uitschakelen `REQUIRE_API_KEY` in Dashboard → Feature Flags slaat een DB -overschrijving op en heeft onmiddellijk invloed op `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` en andere client-API-authenticatiecontroles die deze helper delen. Als het functievlagarchief niet kan worden gelezen, mislukt de client API authenticatie en is er een sleutel vereist.

## Incompatibele wijziging — v3.8.0

De eindpunten `/api/v1/agents/tasks/*` en `/api/resilience/model-cooldowns` **vereisen nu beheerauthenticatie** (commit `588a0333`). Clients die eerder een normale API-sleutel zonder de scope `manage` verzonden, ontvangen `403`. Migratie: wijs de scope `manage` toe aan de sleutel in het API Keys-dashboard of gebruik een aangemelde dashboardsessie.

## Gedragswijziging — v3.8.2

`/api/mcp/*` (de externe MCP-server) is standaard nog steeds LOCAL_ONLY, maar accepteert nu niet-loopbackrequests wanneer de header `Authorization: Bearer <api-key>` de scope `manage` bevat. De uitzondering wordt expliciet per pad beheerd via `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts`; het verwante LOCAL_ONLY-prefix `/api/cli-tools/runtime/*` kan bewust NIET worden omzeild, omdat het willekeurige subprocessen kan starten. Anonieme requests naar `/api/mcp/*` die niet van loopback afkomstig zijn, blijven `403 LOCAL_ONLY` retourneren — de standaard voor elk nieuw LOCAL_ONLY-pad blijft strikt beperkt tot loopback. Zie [Route Guard-niveaus](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testen

- Unittests: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Openbare toelatingslijst: `tests/unit/public-api-routes.test.ts`.
- Gericht uitvoeren: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Foutopsporing

De pijplijn stempelt antwoorden altijd met:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Voor geauthenticeerde verzoeken bevatten de upstream (handlerzijde) verzoekheaders ook:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Gebruik `assertAuth(req, expectedClass)` binnen handlers — het gooit `AuthzAssertionError` met code `AUTHZ_NOT_INITIALIZED` als de middleware werd omzeild (handig voor het opvangen van configuratieregressies in tests).

## Zie ook

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — auth marker per eindpunt
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auditlog voor auth-gebeurtenissen
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — drie scope-namespaces en MCP tool-scope catalogus
- Bron: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
