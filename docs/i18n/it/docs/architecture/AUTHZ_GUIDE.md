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

Utilizzata per le API client compatibili con OpenAI/Anthropic/Gemini e per alcune route di gestione quando la chiave dispone dell'ambito `manage`.

```
Authorization: Bearer <api-key>
```

Convalidata da `isValidApiKey()` / `extractApiKey()` in `src/sse/services/auth.ts` e riesportata tramite `src/shared/utils/apiAuth.ts`. Il validatore accetta anche le variabili d'ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` come chiavi passthrough persistenti (issue #1350).

### 2. Sessione della dashboard (cookie auth_token)

Per le pagine della dashboard e le operazioni di amministrazione.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Un cookie è una sessione solo quando il JWT viene verificato **e** contiene `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Ogni
componente che utilizza il cookie (guardia delle route della dashboard (`isDashboardSessionAuthenticated()`), aggiornamento della pipeline di autorizzazione, handshake WebSocket, server
live, `/api/settings/require-login`, `/api/auth/status`) passa attraverso questo helper.
Esistono altri JWT firmati con `JWT_SECRET`: il passthrough della CLI Cursor genera
token `iss "omniroute" / aud "cursor-cli"` per i possessori di chiavi, che non sono mai sessioni
(#13298).

Verificata da `isDashboardSessionAuthenticated()` in `src/shared/utils/apiAuth.ts`. La pipeline aggiorna automaticamente il JWT quando restano meno di 7 giorni della sua durata di 30 giorni.

Una sessione può anche terminare prima dei 30 giorni, perché ogni componente che la genera passa attraverso `mintDashboardSessionToken` (un timestamp di emissione `iat` e un ID `jti`) e il verificatore controlla due impostazioni: `sessionsValidAfter`, impostata in seguito a una modifica della password affinché tutte le sessioni emesse in precedenza smettano di essere verificate (il browser in cui è stata modificata la password riceve un nuovo cookie), e `revokedDashboardSessions`, a cui `POST /api/auth/logout` aggiunge il `jti` della sessione disconnessa. Le sessioni generate da una versione precedente non contengono nessuna delle due claim e rimangono valide fino alla prima modifica della password. Se non è possibile leggere le impostazioni, la sessione non viene considerata attendibile.

Alcune route di gestione accettano **entrambe** le modalità: cookie OPPURE `Bearer <key>` quando la chiave API dispone dell'ambito `manage` (o `admin`). Questo è ciò che abilita il flusso di lavoro «configurabile tramite chiamate API» aggiunto nella v3.8.

#### Controllo di accesso OIDC opzionale (#6973)

L'accesso amministrativo alla dashboard supporta anche un flusso OIDC (OpenID Connect) **facoltativo**
insieme all'accesso predefinito tramite password: l'accesso tramite password non viene mai rimosso, ma solo
integrato:

- Disabilitato a meno che `settings.oidcEnabled === true` **e** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` siano tutti configurati (Impostazioni → Autenticazione).
  In caso contrario, `GET /api/auth/oidc/login` restituisce `400`.
- `GET /api/auth/oidc/login` rileva `authorization_endpoint` da
  `/.well-known/openid-configuration` dell'emittente (con fallback a
  `<issuer>/authorize`), crea l'URI di reindirizzamento dalla richiesta in arrivo
  (tenendo conto di `x-forwarded-proto`) e reindirizza all'IdP con un valore `state`
  casuale memorizzato in un cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` convalida `state`, scambia il codice di autorizzazione
  e verifica la firma del token ID tramite il JWKS dell'emittente
  (`createRemoteJWKSet` di `jose`, memorizzato nella cache per URI JWKS), con controlli
  di `issuer`/`audience`. L'accesso alla dashboard richiede un elenco
  `oidcAllowedSubjects` non vuoto, una policy `oidcAdmissionClaim` o entrambi. L'elenco
  dei soggetti confronta `sub` oppure `email` solo quando `email_verified === true`.
  La policy opzionale per i claim accetta il percorso di un claim del token ID
  separato da punti (ad esempio, `realm_access.roles`) e un array di valori accettati;
  il claim risolto deve essere un array di stringhe contenente almeno un valore
  accettato. Se sono configurate entrambe le policy, entrambe devono essere
  soddisfatte. I claim mancanti o non validi causano un rifiuto e, in assenza di
  entrambe le policy, il callback rifiuta l'accesso (`not_configured`). Le
  configurazioni esistenti basate unicamente sul soggetto continuano a funzionare
  senza modifiche.
- Normalmente Keycloak mappa i ruoli realm nei token di accesso, ma non necessariamente
  nei token ID. Per richiedere il ruolo realm `admin`, configurare per questo client
  un protocol mapper che includa `realm_access.roles` nel relativo **token ID**, quindi
  impostare `oidcAdmissionClaim` su `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Verificare il claim effettivo del token ID per questo client prima di abilitare
  l'accesso basato unicamente sul ruolo; l'applicazione non legge i ruoli dal token
  di accesso. Il rifiuto del token lato IdP può integrare, ma non sostituire, questo
  controllo lato applicazione.
- In caso di successo, genera **esattamente lo stesso** JWT `auth_token` di 30 giorni
  emesso dall'accesso con password (`src/app/api/auth/login/route.ts`), quindi il resto
  della pipeline di sessione della dashboard (aggiornamento automatico, flag dei
  cookie) rimane invariato: OIDC sostituisce solo il modo in cui viene generato il
  cookie, non ciò che esso autorizza. Le modifiche ai ruoli/gruppi dell'IdP non
  invalidano le sessioni OmniRoute esistenti; la disconnessione, la rotazione della
  password o la scadenza della sessione continuano a determinarne la durata.
- Ogni impostazione `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) è inclusa in `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  risponde con `400 PASSWORD_REQUIRED` a meno che il corpo non contenga la password
  di gestione come `currentPassword` (`401 PASSWORD_MISMATCH` quando è errata).
  `oidcDisablePasswordLogin` impedisce l'_accesso_ con password (`POST /api/auth/login`),
  ma mantiene l'hash della password memorizzato e la nuova autenticazione continua
  a verificare `currentPassword` rispetto a esso.
- Anche `corsOrigins` e `bruteForceProtection` sono inclusi in `SECURITY_IMPACTING_SETTINGS_KEYS`:
  rendere meno restrittivo uno dei due indebolisce le difese dell'accesso, pertanto
  richiedono la stessa nuova autenticazione tramite `currentPassword` (la scheda
  Sicurezza lo richiede) e l'importazione JSON li rimuove.
- Ogni chiave delle policy di sicurezza — le voci di `SECURITY_IMPACTING_SETTINGS_KEYS`,
  ogni chiave `oidc*` e lo stato della sessione della dashboard — è riservata
  **esclusivamente all'operatore** su `PATCH /api/settings`: una chiave API con ambito
  di gestione o un token di accesso `oma_` viene rifiutato con `403` anche quando
  invia il valore `currentPassword` corretto, e il rifiuto viene registrato nell'audit
  come `settings.update_failed` con `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` in `src/lib/api/operatorCredential.ts`).
  Le impostazioni ordinarie (tema, preferenze di visualizzazione) restano modificabili
  con una chiave `manage` o un token di accesso `admin`. Ogni modifica di
  `/api/settings` stesso (e di `/api/settings/require-login`) richiede inoltre l'ambito
  `admin` del token di accesso (`ADMIN_MUTATION_EXACT_PATHS` in
  `src/server/authz/accessScopes.ts`, corrispondenza esatta del percorso);
  `GET` rimane `read`, mentre le altre sotto-route `/api/settings/*` (proxy,
  impostazioni predefinite delle combinazioni, alias dei modelli, compressione,
  eliminazioni…) mantengono l'ambito `write` dedotto dal metodo.
- `POST /api/settings/import-json` ignora questa nuova autenticazione, quindi rimuove
  ogni chiave in `IMPORT_STRIPPED_SETTINGS_KEYS` (stesso file) prima della scrittura:
  la password e `currentPassword`, ogni voce di `SECURITY_IMPACTING_SETTINGS_KEYS` e
  lo stato della sessione della dashboard (`sessionsValidAfter`,
  `revokedDashboardSessions`). L'importazione di un backup precedente non può quindi
  riattivare una sessione già terminata da una modifica della password o da una
  disconnessione.

## Classi di route

`src/server/authz/types.ts` definisce tre classi; qualsiasi route che non può essere classificata in modo deterministico ricade in `MANAGEMENT`.

| Classe       | Descrizione                                                                                                                                                     | Autenticazione richiesta                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Route esplicitamente sicure: login, logout, stato, inizializzazione, health check e bootstrap dell'onboarding.                                                  | Nessuna                                                                      |
| `CLIENT_API` | Endpoint di erogazione dei modelli: `/api/v1/*`, `/api/v1beta/*`, più gli alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Chiave Bearer quando il feature flag effettivo `REQUIRE_API_KEY` è abilitato |
| `MANAGEMENT` | Pagine della dashboard, impostazioni, provider, chiavi, endpoint amministrativi e di diagnostica.                                                               | Sessione della dashboard OPPURE Bearer con scope `manage`                    |

Alcune azioni di `MANAGEMENT` sono **riservate all'operatore**: una chiave `manage` non basta. Esportare le credenziali memorizzate (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), ripristinare un backup sopra i dati attivi (`POST /api/db-backups/import` incluso `dryRun=true`, `POST /api/db-backups` con ripristino per id, `POST /api/settings/import-json`) ed eliminare i punti di ripristino (la pulizia con `DELETE /api/db-backups` e `PATCH /api/db-backups`, perché la retention che salva guida la potatura automatica dopo ogni backup) richiedono una sessione della dashboard, l'identità della CLI locale o il login disabilitato. Emettere un token di sincronizzazione (`POST /api/sync/tokens`) e creare un token di accesso CLI con scope `admin` (`POST /api/cli/tokens`) richiedono, in ogni modalità di login, una sessione della dashboard o l'identità della CLI locale. Le chiavi API di qualunque scope e i token di accesso `oma_` non sono credenziali operatore: ricevono `403` ogni volta che ne è richiesta una. Il controllo si trova in `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Anche la modifica delle impostazioni di login è riservata all'operatore: `POST /api/settings/require-login` (impostare la password di gestione / attivare o disattivare `requireLogin`) accetta solo queste credenziali una volta che esiste una password. La finestra di bootstrap del primo avvio (nessuna password ancora) resta invariata, e una sessione della dashboard deve inviare `currentPassword` per sostituire la password (`403` se manca o è errata, registrato come `settings.update_failed`). La CLI locale e un'istanza con login disabilitato mantengono il percorso di recupero e possono impostare una password senza questo passaggio, poiché entrambi sono vincolati all'host che possiede la directory dei dati.

## Pipeline

```
Richiesta in arrivo → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Rimuove gli header interni attendibili (x-omniroute-auth-*, x-omniroute-route-class)
    2. Genera l'ID della richiesta e classifica la route tramite classifyRoute()
    3. Se pathname == "/" → reindirizza a /dashboard
    4. Se è in corso lo svuotamento (arresto controllato) e /api/* → 503
    5. Se il metodo non è GET e il percorso è /api/* → applica il controllo checkBodySize()
    6. Se OPTIONS → preflight CORS 204
    7. Se options.enforce == false → prosegue senza controllo con gli header della classe della route
    8. Altrimenti: POLICIES[routeClass].evaluate(ctx)
       - allow  → imposta x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → errore JSON con correlation_id (pagine della dashboard → 302 /login)
```

Gli header interni attendibili (definiti in `src/server/authz/headers.ts`) vengono **rimossi dalle richieste in arrivo** prima della classificazione: i client non possono precompilare `x-omniroute-auth-*` per impersonare un soggetto.

### Contratti delle policy

Ogni classe di route ha una policy in `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — restituisce sempre `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — estrae il token Bearer e lo convalida tramite `validateApiKey()`. Consente l'accesso anonimo solo quando il feature flag effettivo `REQUIRE_API_KEY` è disabilitato. Il flag effettivo viene risolto tramite `isRequireApiKeyEnabled()` (`override del feature flag nel DB > process.env.REQUIRE_API_KEY > valore predefinito`), in modo che i feature flag della dashboard e le variabili d'ambiente regolino in modo coerente `/api/v1/*`, `/api/v1beta/*` e gli alias; in caso di errori del resolver, l'accesso viene negato. Consente le richieste con sessione della dashboard sulle route API client (inclusa `/api/v1/models`, utilizzata dal catalogo dei modelli della dashboard).
- **`managementPolicy`** (`policies/management.ts`) — accetta una sessione della dashboard, le richieste interne di sincronizzazione dei modelli (corrispondenti a `/api/providers/[name]/(sync-models|models)`) oppure ignora completamente il controllo se `isAuthRequired()` restituisce false. Restituisce 403 (`AUTH_001`) quando è presente un token Bearer non valido, altrimenti 401. Applica inoltre i livelli di protezione delle route (LOCAL_ONLY / ALWAYS_PROTECTED) prima di qualsiasi ramo di autenticazione — vedere [Livelli di protezione delle route](../security/ROUTE_GUARD_TIERS.md). I percorsi LOCAL_ONLY in `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (attualmente: `/api/mcp/`) possono essere raggiunti da indirizzi non loopback quando la chiave Bearer include l'ambito `manage`; tutti gli altri percorsi LOCAL_ONLY restano limitati rigorosamente al loopback, indipendentemente dall'ambito.

Una policy completata con successo restituisce `AuthSubject` con `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Gli handler downstream possono leggerlo tramite `assertAuth(request, "CLIENT_API")` in `src/server/authz/assertAuth.ts`, anziché rieseguire la logica di autenticazione.

## Elenco delle route pubbliche

`src/shared/constants/publicApiRoutes.ts` è l'allowlist esplicita:

L'elenco è suddiviso per **forma** e questa suddivisione è fondamentale (GHSA-74g9-q8f6-793h): un prefisso viene
confrontato con `startsWith()`, quindi corrisponde anche a ogni percorso adiacente che ne condivide i caratteri iniziali.
Usare `/api/usage/om-usage` come prefisso rendeva PUBBLICO `/api/usage/om-usage<anything>` e Next risolve
quest'ultimo come `/api/usage/[connectionId]`, un handler privo di autenticazione propria.

```ts
// Sottoalberi effettivi. Ogni voce DEVE terminare con "/" (verificato da uno unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // trattato come CLIENT_API in classify, non come pubblico "senza autenticazione"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Route singole, confrontate ESATTAMENTE (con o senza slash finale).
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

// Route singole di sola lettura che beneficiano anche dell'eccezione per l'origine CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Route singola di sola lettura SENZA l'eccezione CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Le route di sola lettura sono pubbliche **solo** per i metodi sicuri. Nota: `classifyRoute()` esclude `/api/v1/*` e `/api/v1beta/*` dal caso residuale PUBLIC: queste route sono sempre `CLIENT_API`, affinché continui ad applicarsi la policy della chiave Bearer.

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

## Interruttore «autenticazione richiesta»

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` decide se viene imposta **una qualsiasi** autenticazione per una richiesta:

- `settings.requireLogin === false` → l'autenticazione è disabilitata a livello globale, eccetto per il livello sempre protetto (vedi [Livelli del Route Guard](../security/ROUTE_GUARD_TIERS.md)) e per le chiamate che rilasciano una credenziale che esso accetta; queste richiedono la stessa credenziale che con il login attivo: emettere token di sincronizzazione, creare token di accesso CLI di qualunque scope, creare una chiave API con scope `manage`/`admin`, concedere quello scope a una chiave, oppure rigenerare o rivelare una chiave del genere (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`). Le chiavi solo per l'inferenza restano aperte.
- Nessuna password configurata **e** nessuna variabile d'ambiente `INITIAL_PASSWORD` → la modalità di bootstrap consente la procedura guidata di onboarding e le richieste loopback, ma le richieste di rete esposte richiedono comunque credenziali.
- Qualsiasi errore del database → fallisce in modo chiuso (sicuro per impostazione predefinita).

L'applicazione delle chiavi API client usa `isRequireApiKeyEnabled()` in `src/shared/utils/featureFlags.ts`, non una lettura diretta di `process.env.REQUIRE_API_KEY`. Questo conta per le istanze distribuite: attivare o disattivare `REQUIRE_API_KEY` in Dashboard → Feature Flags salva un override nel database e incide subito su `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` e sugli altri controlli di autenticazione dell'API client che condividono questo helper. Se l'archivio dei feature flag non può essere letto, l'autenticazione dell'API client fallisce in modo chiuso e richiede una chiave.

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
x-request-id:               <ID di correlazione, riportato nei corpi degli errori>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Per le richieste autenticate, le intestazioni della richiesta upstream (lato handler) includono anche:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ultime-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (facoltativo)
x-omniroute-auth-scopes:    elenco separato da virgole
```

Usa `assertAuth(req, expectedClass)` all'interno degli handler: genera un `AuthzAssertionError` con codice `AUTHZ_NOT_INITIALIZED` se il middleware è stato bypassato (utile per individuare regressioni della configurazione nei test).

## Vedi Anche

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — indicatore di autenticazione per endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — registro di audit per eventi di autenticazione
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tre namespace di scope e catalogo di scope-strumento MCP
- Fonte: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
