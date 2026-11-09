# Authorization Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Fonte di verità:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Ultimo aggiornamento:** 2026-09-22 — gli spazi dei nomi degli scope puntano a MCP-SERVER.md

OmniRoute dispone di una pipeline di autorizzazione consapevole del percorso che filtra ogni richiesta API. La classificazione è **deterministica** e **fail-closed** — tutto ciò che non può essere classificato finisce come `MANAGEMENT` e richiede una sessione o un token di livello management. Questa pagina spiega il modello per gli ingegneri che mantengono i percorsi o progettano nuovi endpoint.

![Pipeline AuthZ (3 classi di percorso + valutazione delle policy)](../diagrams/exported/authz-pipeline.svg)

> Fonte: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Due modalità di autenticazione

### 1. Chiave API (Bearer)

Utilizzata per le API client compatibili con OpenAI/Anthropic/Gemini e per alcune route di gestione quando la chiave dispone dello scope `manage`.

```
Authorization: Bearer <api-key>
```

Convalidata da `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts` e riesportata tramite `src/shared/utils/apiAuth.ts`. Il validatore accetta anche le variabili d'ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` come chiavi di passthrough persistenti (issue #1350).

### 2. Sessione dashboard (cookie auth_token)

Per le pagine della dashboard e le operazioni amministrative.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Un cookie è una sessione solo quando il JWT viene verificato **e** contiene `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Ogni
componente che utilizza il cookie (la guardia delle route della dashboard (`isDashboardSessionAuthenticated()`), l'aggiornamento della pipeline di autorizzazione, l'handshake WebSocket, il server live,
`/api/settings/require-login`, `/api/auth/status`) passa da quell'helper.
Esistono altri JWT firmati con `JWT_SECRET`: il passthrough della CLI di Cursor emette
token con `iss "omniroute" / aud "cursor-cli"` per i titolari delle chiavi, ma questi non sono mai sessioni
(#13298).

Verificata da `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts`. La pipeline aggiorna automaticamente il JWT quando gli restano meno di 7 giorni dei suoi 30 giorni di validità.

Una sessione può terminare anche prima che siano trascorsi i 30 giorni, perché ogni emittente passa da `mintDashboardSessionToken` (un'ora di emissione `iat` e un identificatore `jti`) e il verificatore controlla due impostazioni: `sessionsValidAfter`, impostata dalla modifica della password in modo che ogni sessione emessa prima di tale modifica non venga più verificata (il browser che ha modificato la password riceve un nuovo cookie), e `revokedDashboardSessions`, a cui `POST /api/auth/logout` aggiunge il `jti` della sessione da cui è stato effettuato il logout. Le sessioni emesse da una versione precedente non contengono nessuno dei due claim e rimangono valide fino alla prima modifica della password. Se non è possibile leggere le impostazioni, la sessione non viene considerata attendibile.

Alcune route di gestione accettano **entrambe** le modalità: cookie **oppure** `Bearer <key>` quando la chiave API dispone dello scope `manage` (o `admin`). Questo abilita il flusso «configurabile tramite chiamate API» aggiunto nella versione v3.8.

#### Gate di accesso OIDC facoltativo (#6973)

L'accesso amministrativo alla dashboard supporta anche un flusso OIDC (OpenID Connect) **facoltativo**
oltre all'accesso predefinito tramite password: l'accesso tramite password non viene mai rimosso, ma
solo integrato:

- Disabilitato a meno che `settings.oidcEnabled === true` **e** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` non siano tutti configurati (Impostazioni → Autenticazione).
  `GET /api/auth/oidc/login` restituisce `400` in caso contrario.
- `GET /api/auth/oidc/login` individua `authorization_endpoint` dalla
  `/.well-known/openid-configuration` dell'issuer (utilizza `<issuer>/authorize` come
  fallback), costruisce l'URI di reindirizzamento dalla richiesta in ingresso
  (tenendo conto di `x-forwarded-proto`) e reindirizza all'IdP con uno `state`
  casuale memorizzato in un cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` convalida `state`, scambia il codice di autorizzazione
  e verifica la firma dell'ID token tramite il JWKS dell'issuer
  (`createRemoteJWKSet` di `jose`, memorizzato nella cache per URI JWKS), con controlli
  su `issuer`/`audience`. L'accesso alla dashboard richiede un elenco
  `oidcAllowedSubjects` non vuoto, un criterio `oidcAdmissionClaim` o entrambi.
  L'elenco dei soggetti confronta `sub` o `email` solo quando
  `email_verified === true`. Il criterio claim opzionale utilizza un percorso di
  claim dell'ID token separato da punti (ad esempio, `realm_access.roles`) e un
  array di valori accettati; il claim risolto deve essere un array di stringhe
  contenente almeno un valore accettato. Se entrambi i criteri sono configurati,
  entrambi devono essere soddisfatti. Claim mancanti o malformati causano un
  rifiuto predefinito e, in assenza di entrambi i criteri, il callback rifiuta il
  login (`not_configured`). Le configurazioni esistenti basate solo sul soggetto
  continuano a funzionare senza modifiche.
- Keycloak normalmente mappa i ruoli realm nei token di accesso, non necessariamente
  negli ID token. Per richiedere il ruolo realm `admin`, configura un mapper di
  protocollo per questo client che includa `realm_access.roles` nel **ID token**, quindi
  imposta `oidcAdmissionClaim` su `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Verifica il claim effettivo dell'ID token per questo client prima di abilitare
  l'accesso basato solo sui ruoli; l'applicazione non legge i ruoli dei token di
  accesso. Il rifiuto del token da parte dell'IdP può integrare, ma non sostituire,
  questo controllo lato applicazione.
- In caso di successo, genera lo **stesso identico** JWT `auth_token` con validità di
  30 giorni emesso dal login con password (`src/app/api/auth/login/route.ts`), quindi
  il resto della pipeline della sessione della dashboard (aggiornamento automatico,
  flag dei cookie) rimane invariato: OIDC sostituisce solo il modo in cui viene
  generato il cookie, non ciò che autorizza. Le modifiche ai ruoli/gruppi dell'IdP
  non invalidano le sessioni OmniRoute esistenti; logout, rotazione della password
  o scadenza della sessione ne determinano ancora la durata.
- Ogni impostazione `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) è inclusa in
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  risponde `400 PASSWORD_REQUIRED` a meno che il corpo non contenga la password di
  gestione come `currentPassword` (`401 PASSWORD_MISMATCH` quando è errata).
  `oidcDisablePasswordLogin` rifiuta il _login_ con password (`POST /api/auth/login`)
  ma conserva l'hash della password memorizzato, e la riautenticazione verifica
  ancora `currentPassword` rispetto a tale hash.
- Anche `corsOrigins` e `bruteForceProtection` sono inclusi in
  `SECURITY_IMPACTING_SETTINGS_KEYS`: l'allentamento di una di queste impostazioni
  indebolisce le difese del login, quindi richiede la stessa riautenticazione con
  `currentPassword` (la scheda Sicurezza lo richiede) e l'importazione JSON li
  elimina.
- Ogni chiave dei criteri di sicurezza — le voci di
  `SECURITY_IMPACTING_SETTINGS_KEYS`, ogni chiave `oidc*` e lo stato della sessione
  della dashboard — è riservata **solo agli operatori** per `PATCH /api/settings`:
  una chiave API con ambito manage o un token di accesso `oma_` viene rifiutato con
  `403` anche quando invia il `currentPassword` corretto, e il rifiuto viene
  registrato nell'audit come `settings.update_failed` con
  `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` in
  `src/lib/api/operatorCredential.ts`).
  Le impostazioni ordinarie (tema, preferenze di visualizzazione) restano scrivibili
  con una chiave `manage` o un token di accesso `admin`. Ogni modifica di
  `/api/settings` (e di `/api/settings/require-login`) richiede inoltre l'ambito del
  token di accesso `admin` (`ADMIN_MUTATION_EXACT_PATHS` in
  `src/server/authz/accessScopes.ts`, corrispondenza esatta del percorso);
  `GET` mantiene l'ambito `read`, mentre le altre sottoroute
  `/api/settings/*` (proxy, valori predefiniti delle combinazioni, alias dei modelli,
  compressione, eliminazioni…) mantengono l'ambito `write` dedotto dal metodo.
- `POST /api/settings/import-json` ignora tale riautenticazione, quindi elimina ogni
  chiave presente in `IMPORT_STRIPPED_SETTINGS_KEYS` (stesso file) prima della
  scrittura: la password e `currentPassword`, ogni voce di
  `SECURITY_IMPACTING_SETTINGS_KEYS` e lo stato della sessione della dashboard
  (`sessionsValidAfter`, `revokedDashboardSessions`).
  L'importazione di un backup precedente non può quindi riattivare una sessione che
  una modifica della password o un logout aveva già terminato.

#### Login opzionale con autenticazione a due fattori TOTP (#16619)

La registrazione avviene da Impostazioni → Sicurezza; è disattivata finché
l'operatore non la abilita
(`src/server/auth/dashboardMfa.ts`).

- **Cosa copre:** accesso con password (`POST /api/auth/login`, che richiede quindi
  `POST /api/auth/mfa/verify`) e `omniroute connect` (`POST /api/cli/connect`,
  che rifiuta uno scambio basato solo sulla password e accetta il codice come
  `totp`).
- **Cosa non copre:** l'accesso OIDC / SSO (`/api/auth/oidc/callback`) non
  richiede il TOTP di OmniRoute. Si affida al secondo fattore del proprio provider
  di identità, quindi applica l'MFA nell'IdP se OIDC è abilitato.
- **Ripristino** (dispositivo smarrito, nessun codice di ripristino rimasto o un fattore
  che non può più essere verificato, ad esempio dopo la modifica di
  `STORAGE_ENCRYPTION_KEY`):
  1. Riavvia il server con `OMNIROUTE_DISABLE_MFA=true`.
  2. Sull'host stesso (peer loopback e `Host` loopback, ad esempio
     `http://localhost:20128`), accedi con la password. Il secondo fattore viene
     ignorato solo per quell'origine; ogni altra origine richiede comunque il codice.
  3. In Impostazioni → Sicurezza → Disabilita, inserisci la password e lascia vuoto il codice. `POST /api/auth/mfa/disable` accetta un corpo senza `code` solo mentre la variabile è impostata e la richiesta proviene dall'host; richiede comunque la sessione del dashboard e la password corrente, e viene registrata con
     `auth.mfa.disabled` e `secondFactor: "recovery_switch"`.
  4. Rimuovi l'impostazione di `OMNIROUTE_DISABLE_MFA`, riavvia e, se necessario,
     esegui nuovamente la registrazione.

## Classi di percorso

`src/server/authz/types.ts` definisce tre classi; qualsiasi percorso che non può essere classificato deterministicamente ricade su `MANAGEMENT`.

| Classe       | Descrizione                                                                                                                                                | Autenticazione richiesta                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `PUBLIC`     | Percorsi esplicitamente sicuri — login, logout, stato, integrità, bootstrap di onboarding.                                                                 | Nessuno                                                                                   |
| `CLIENT_API` | Endpoint di gestione del modello — `/api/v1/*`, `/api/v1beta/*`, più alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Chiave di trasporto quando è abilitato il flag della funzione `REQUIRE_API_KEY` effettiva |
| `MANAGEMENT` | Pagine della dashboard, impostazioni, provider, chiavi, endpoint di amministrazione e diagnostica.                                                         | Sessione dashboard OR Bearer con ambito `manage`                                          |

Alcune azioni `MANAGEMENT` lo sono** solo operatore** : una chiave `manage` non è sufficiente. L'esportazione delle credenziali archiviate (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), il ripristino di un backup sui dati live (`POST /api/db-backups/import` incluso `dryRun=true`, `POST /api/db-backups` ripristino tramite id, `POST /api/settings/import-json`), la distruzione dei punti di ripristino (`DELETE /api/db-backups` cleanup e `PATCH /api/db-backups` perché la conservazione persiste guida l'eliminazione automatica dopo ogni backup) richiedono una sessione del dashboard, l'oggetto CLI locale o l'accesso disabilitato. L'emissione di un token di sincronizzazione (`POST /api/sync/tokens`) e il conio di un token di accesso `admin` CLI (`POST /api/cli/tokens`) richiedono una sessione del dashboard o l'oggetto CLI locale in ogni modalità di accesso. Le chiavi API di qualsiasi ambito e i token di accesso `oma_` non sono credenziali dell'operatore: ottengono `403` ogni volta che ne viene richiesto uno. L'assegno risiede in `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Anche la modifica delle impostazioni di accesso è riservata solo all'operatore: `POST /api/settings/require-login` (imposta la password di gestione / attiva/disattiva `requireLogin`) accetta solo quelle credenziali una volta che esiste una password — la finestra di bootstrap di prima esecuzione (ancora nessuna password) è invariata — e una sessione del dashboard deve inviare `currentPassword` per sostituire la password (`403` quando manca o è errata, controllata come `settings.update_failed`). Lo CLI locale e un'istanza con login disabilitato mantengono il percorso di ripristino e possono impostare una password senza di esso, poiché entrambi sono vincolati all'host che possiede la directory dei dati.

## Conduttura

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

Le intestazioni interne attendibili (definite in `src/server/authz/headers.ts`) lo sono** spogliato dalle richieste in arrivo** prima della classificazione i client — non possono precompilare `x-omniroute-auth-*` per impersonare un soggetto.

### Contratti politici

Ogni classe di percorso ha una politica in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — restituisce sempre `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — estrae Bearer, convalida tramite `validateApiKey()`. Diventa anonimo solo quando il flag della funzione `REQUIRE_API_KEY` effettiva è disabilitato. Il flag effettivo viene risolto tramite `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) in modo che i flag delle funzionalità del dashboard e le variabili di ambiente governino `/api/v1/*`, `/api/v1beta/*` e gli alias in modo coerente; i guasti del risolutore falliscono la chiusura. Consente richieste di sessione del dashboard sulle rotte API del client (incluso `/api/v1/models`, utilizzato dal catalogo dei modelli del dashboard). Quando Entra ID SSO è abilitato, un Bearer che è strutturalmente un token Entra (tre segmenti base64url, `RS*` alg, `kid`) viene gestito dal ramo SSO** Prima** `validateApiKey()` e il suo verdetto è definitivo — non cade mai nel percorso della chiave API o nel ramo degradato in anonimo, quindi un'interruzione del provider di identità non può diventare accesso aperto. Le chiavi statiche API non sono interessate. Vedi [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — accetta la sessione del dashboard, le richieste di sincronizzazione del modello interno (abbinate a `/api/providers/[name]/(sync-models|models)`) o salta completamente se `isAuthRequired()` restituisce false. Restituisce 403 (`AUTH_001`) quando un token Portatore è presente ma non valido, 401 altrimenti. Applica anche i livelli di protezione del percorso (LOCAL_ONLY / ALWAYS_PROTECTED) prima di qualsiasi ramo di autenticazione — vedere [Livelli di protezione del percorso](../security/ROUTE_GUARD_TIERS.md). È possibile accedere ai percorsi LOCAL_ONLY in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (oggi: `/api/mcp/`) da non-loopback quando la chiave Bearer ha l'ambito `manage` ; tutti gli altri percorsi LOCAL_ONLY rimangono di loopback rigoroso indipendentemente dall'ambito.

Una policy di successo restituisce `AuthSubject` con `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. I gestori downstream possono leggerlo tramite `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts` invece di rieseguire la logica di autenticazione.

## Elenco percorsi pubblici

`src/shared/constants/publicApiRoutes.ts` è la lista consentita esplicita:

L'elenco è suddiviso per** forma** , e la suddivisione è portante (GHSA-74g9-q8f6-793h): un prefisso viene abbinato a `startsWith()`, quindi corrisponde anche a ogni percorso adiacente che condivide i suoi caratteri iniziali. `/api/usage/om-usage` come prefisso contrassegnato `/api/usage/om-usage<anything>` PUBLIC e Next lo risolve in `/api/usage/[connectionId]` — un gestore senza autenticazione propria.

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

I percorsi di sola lettura sono pubblici** soltanto** per metodi sicuri. Nota: `classifyRoute()` esclude `/api/v1/*` e `/api/v1beta/*` dal fall-through PUBLIC — quelli sono sempre `CLIENT_API` quindi si applica ancora la politica della chiave al portatore.

## Aggiunta di una nuova route

### Modello 1 — Endpoint API client pubblico (autenticazione Bearer)

Le route sotto `/api/v1/` e `/api/v1beta/` vengono classificate automaticamente come `CLIENT_API`. Il middleware applica il controllo Bearer; gli handler delle route non devono ripeterlo, ma possono leggere il soggetto se utile.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logica dell'handler
}
```

### Modello 2 — Endpoint di gestione (sessione oppure Bearer + manage)

Usa `requireManagementAuth()` da `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logica dell'handler
}
```

`requireManagementAuth()` restituisce `null` in caso di successo oppure una `Response` di errore JSON:

- 401 `AUTH_001` "Autenticazione richiesta" — nessuna credenziale presente
- 403 — Bearer non valido **oppure** Bearer presente ma la chiave non dispone dello scope `manage` / `admin`

`hasManageScope(scopes)` restituisce true per `"manage"` o `"admin"`.

### Modello 3 — Aggiunta all'allowlist pubblica

Scegli l'insieme in base alla forma, non alla comodità. Una singola route va inserita in `PUBLIC_API_ROUTES_EXACT` (oppure in `PUBLIC_READONLY_CORS_API_ROUTES` se supporta solo GET); solo un sottoalbero effettivo va inserito in `PUBLIC_API_ROUTE_PREFIXES` e **deve terminare con `/`**. Inserire una singola route nell'elenco dei prefissi rende pubblici anche tutti i percorsi adiacenti che ne condividono i caratteri iniziali, inclusi i percorsi correlati con segmenti dinamici aggiunti in seguito (GHSA-74g9-q8f6-793h). Aggiorna gli unit test in `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` e `tests/unit/authz/classify.test.ts`.

## Ambiti

Tre namespace. Ogni checker legge solo le proprie stringhe. Il confronto affiancato,
inclusi i motivi per cui `manage` fallisce `scopeMatches` per `read:compression` e perché un
token di accesso `read` non può `PATCH /api/keys/{id}`, è
[Tre namespace di scope](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Le chiavi API contengono un array `scopes` (memorizzato come JSON in `api_keys.scopes`, vedi `src/lib/db/apiKeys.ts`).

### Scope di gestione

- `manage` / `admin` — `hasManageScope`. Accesso bearer alle route API di gestione.
- `mcp:connect`, `self:usage`, `self:account-quota` e
  `policy:bypass-provider-quota` sono scope additivi a corrispondenza esatta. Si trovano
  al di fuori di `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` apre solo la
  sezione non-loopback `/api/mcp/`.

### Scope degli strumenti MCP

Catalogo e regole di corrispondenza (stringa identica, o uno scope concesso che termina con `*`):
[Scope degli strumenti MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` in `src/shared/constants/mcpScopes.ts` è il sottoinsieme tipizzato
originale, non il catalogo completo. L'applicazione viene eseguita in
`open-sse/mcp-server/scopeEnforcement.ts` dopo che `resolveCallerScopeContext()`
risolve gli scope dalle informazioni di autenticazione MCP, dai metadati della richiesta o da `OMNIROUTE_MCP_SCOPES`.
Rimane disattivato a meno che `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Scope dei token di accesso

`read` / `write` / `admin` sui token `oma_live_…`, classificati da `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Questa classificazione si applica solo alla
credenziale del token di accesso. Vedi [Autenticazione di gestione](../guides/MANAGEMENT-AUTH.md).

## Attiva/disattiva autenticazione richiesta

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` decide se** Qualunque** l'autenticazione viene applicata per una richiesta:

- `settings.requireLogin === false` → auth è disabilitato a livello globale, ad eccezione del livello sempre protetto (vedi [Livelli Route Guard](../security/ROUTE_GUARD_TIERS.md) ) e delle chiamate che distribuiscono una credenziale accettata, che richiedono le stesse credenziali dell'accesso attivo: emissione di token di sincronizzazione, conio di token di accesso CLI in qualsiasi ambito e creazione di una chiave API con l'ambito `manage`/`admin`, concessione di tale ambito a una chiave o rigenerazione o rivelazione di tale chiave (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`). Le chiavi di sola inferenza rimangono aperte. Anche la scrittura di un flag di funzionalità protetta (`REQUIRE_API_KEY`, gli altri flag di sicurezza e i flag SSRF / TLS / ambito MCP / sandbox elencati in [Flag di funzionalità](../reference/FEATURE_FLAGS.md#rest-api) ) e il salvataggio delle impostazioni di mascheramento PII (`PUT /api/settings/pii`) continuano a richiedere una credenziale.
- Nessuna password configurata** E** no `INITIAL_PASSWORD` env var → la modalità bootstrap consente la procedura guidata di onboarding e le richieste di loopback, ma le richieste di rete esposte necessitano comunque di credenziali. Eccezione: la scrittura di un flag di funzionalità protetta e il salvataggio delle impostazioni di mascheramento PII (`PUT /api/settings/pii`) richiedono una credenziale anche dal loopback, quindi il loopback da solo non è sufficiente in questo caso.
- Qualsiasi errore DB → non riesce a chiudersi (sicuro per impostazione predefinita).

L'imposizione della chiave API del client utilizza `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts`, non una lettura `process.env.REQUIRE_API_KEY` diretta. Questo è importante per le istanze distribuite: l'attivazione `REQUIRE_API_KEY` nel dashboard → Feature Flags memorizza un override DB e influisce immediatamente su `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` e altri controlli di autenticazione dell'API client che condividono questo helper. Se l'archivio flag di funzionalità non può essere letto, il client API auth non viene chiuso e richiede una chiave.

## Modifica incompatibile — v3.8.0

Gli endpoint `/api/v1/agents/tasks/*` e `/api/resilience/model-cooldowns` **ora richiedono l'autenticazione di gestione** (commit `588a0333`). I client che in precedenza inviavano una normale chiave API senza l'ambito `manage` ricevono `403`. Migrazione: assegnare alla chiave l'ambito `manage` nella dashboard delle chiavi API oppure utilizzare una sessione autenticata della dashboard.

## Modifica del comportamento — v3.8.2

`/api/mcp/*` (il server MCP remoto) è ancora LOCAL_ONLY per impostazione predefinita, ma ora accetta richieste non di loopback quando l'header `Authorization: Bearer <api-key>` contiene l'ambito `manage`. L'eccezione viene abilitata esplicitamente per ogni percorso tramite `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` in `src/server/authz/routeGuard.ts`; il prefisso LOCAL_ONLY correlato `/api/cli-tools/runtime/*` intenzionalmente NON può essere escluso dalla restrizione, poiché può avviare sottoprocessi arbitrari. Le richieste anonime a `/api/mcp/*` provenienti da indirizzi non di loopback continuano a restituire `403 LOCAL_ONLY`: l'impostazione predefinita per qualsiasi nuovo percorso LOCAL_ONLY rimane rigorosamente limitata al loopback. Vedere [Livelli della protezione delle route](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Test

- Test unitari: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Allowlist pubblica: `tests/unit/public-api-routes.test.ts`.
- Esecuzione mirata: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Debug

La pipeline contrassegna sempre le risposte con:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Per le richieste autenticate, le intestazioni delle richieste upstream (lato gestore) includono anche:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Usa `assertAuth(req, expectedClass)` all'interno dei gestori — genera `AuthzAssertionError` con il codice `AUTHZ_NOT_INITIALIZED` se il middleware è stato bypassato (utile per individuare le regressioni di configurazione nei test).

## Vedi Anche

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — indicatore di autenticazione per endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — registro di audit per eventi di autenticazione
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tre namespace di scope e catalogo di scope-strumento MCP
- Fonte: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
