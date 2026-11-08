# Authorization Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sursă de adevăr:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Ultima actualizare:** 2026-09-22 — spațiile de nume ale scopurilor indică spre MCP-SERVER.md

OmniRoute are un pipeline de autorizare conștient de rute, care filtrează fiecare cerere API. Clasificarea este **determinată** și **fail-closed** — orice nu poate fi clasificat ajunge ca `MANAGEMENT` și necesită o sesiune sau un token de nivel management. Această pagină explică modelul pentru inginerii care întrețin rute sau proiectează noi endpoint-uri.

![Pipeline AuthZ (3 clase de rute + evaluare politici)](../diagrams/exported/authz-pipeline.svg)

> Sursă: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Două moduri de autentificare

### 1. Cheie API (Bearer)

Utilizată pentru API-urile client compatibile cu OpenAI/Anthropic/Gemini și pentru câteva rute de administrare atunci când cheia are domeniul de aplicare `manage`.

```
Authorization: Bearer <api-key>
```

Validată de `isValidApiKey()` / `extractApiKey()` în `src/sse/services/auth.ts` și reexportată prin `src/shared/utils/apiAuth.ts`. Validatorul acceptă, de asemenea, variabilele de mediu `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` drept chei persistente de passthrough (issue #1350).

### 2. Sesiune de tablou de bord (cookie auth_token)

Pentru paginile tabloului de bord și operațiunile de administrare.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Un cookie este o sesiune doar atunci când JWT-ul este validat **și** conține `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Fiecare
consumator al cookie-ului (protecția rutei tabloului de bord (`isDashboardSessionAuthenticated()`), reîmprospătarea
pipeline-ului authz, handshake-ul WebSocket, serverul live,
`/api/settings/require-login`, `/api/auth/status`) trece prin acel helper.
Există și alte JWT-uri semnate cu `JWT_SECRET` — passthrough-ul CLI Cursor emite
tokenuri cu `iss "omniroute" / aud "cursor-cli"` pentru deținătorii cheilor — iar acestea nu sunt niciodată sesiuni
(#13298).

Verificată de `isDashboardSessionAuthenticated()` în `src/shared/utils/apiAuth.ts`. Pipeline-ul reîmprospătează automat JWT-ul atunci când îi rămân mai puțin de 7 zile din durata sa de viață de 30 de zile.

O sesiune se poate încheia și înainte de expirarea celor 30 de zile, deoarece fiecare emitent trece prin `mintDashboardSessionToken` (un moment al emiterii `iat` și un identificator `jti`), iar validatorul verifică două setări: `sessionsValidAfter`, setată la schimbarea parolei, astfel încât fiecare sesiune emisă înainte de acest moment să nu mai treacă validarea (browserul care a schimbat parola primește un cookie nou), și `revokedDashboardSessions`, la care `POST /api/auth/logout` adaugă `jti` al sesiunii deconectate. Sesiunile emise de o versiune mai veche nu conțin niciunul dintre aceste claim-uri și rămân valabile până la prima schimbare a parolei. Dacă setările nu pot fi citite, sesiunea nu este considerată de încredere.

Unele rute de administrare acceptă **oricare** dintre moduri: cookie sau `Bearer <key>` atunci când cheia API are domeniul de aplicare `manage` (sau `admin`). Acest lucru permite fluxul de lucru „configurabil prin apeluri API”, adăugat în v3.8.

#### Poartă de autentificare OIDC opțională (#6973)

Autentificarea de administrare a tabloului de bord acceptă, de asemenea, un flux OIDC (OpenID Connect) **activat explicit**, alături de autentificarea implicită cu parolă — autentificarea cu parolă nu este niciodată eliminată, ci doar
completată:

- Dezactivat dacă `settings.oidcEnabled === true` **și** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` sunt toate configurate (Settings → Auth).
  `GET /api/auth/oidc/login` returnează `400` în caz contrar.
- `GET /api/auth/oidc/login` descoperă `authorization_endpoint` din
  `/.well-known/openid-configuration` al emitentului (folosește
  `<issuer>/authorize` ca alternativă), construiește URI-ul de redirecționare
  din cererea primită (ținând cont de `x-forwarded-proto`) și redirecționează
  către IdP cu un `state` aleatoriu stocat într-un cookie `oidc_state`
  `httpOnly`.
- `GET /api/auth/oidc/callback` validează `state`, schimbă codul de autorizare
  și verifică semnătura tokenului ID prin JWKS-ul emitentului
  (`createRemoteJWKSet` din `jose`, memorat în cache pentru fiecare URI JWKS),
  cu verificări pentru `issuer`/`audience`. Admiterea în tabloul de bord
  necesită o listă `oidcAllowedSubjects` nevidă, o politică
  `oidcAdmissionClaim` sau ambele. Lista de subiecte face potrivirea cu `sub`
  sau `email` numai când `email_verified === true`. Politica opțională pentru
  claim folosește o cale de claim din tokenul ID, separată prin puncte (de
  exemplu, `realm_access.roles`), și un tablou de valori acceptate; claim-ul
  rezolvat trebuie să fie un tablou de șiruri care conține cel puțin o valoare
  acceptată. Dacă ambele politici sunt configurate, ambele trebuie să treacă.
  Claim-urile lipsă sau malformate eșuează în mod sigur, iar în lipsa oricărei
  politici callback-ul refuză autentificarea (`not_configured`).
  Configurațiile existente bazate exclusiv pe subiect continuă să funcționeze
  neschimbate.
- Keycloak mapează în mod normal rolurile de realm în tokenurile de acces, nu
  neapărat în tokenurile ID. Pentru a impune rolul de realm `admin`, configurați
  un mapper de protocol pentru acest client care include
  `realm_access.roles` în **tokenul ID**, apoi setați `oidcAdmissionClaim` la
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Verificați claim-ul efectiv din tokenul ID pentru acest client înainte de a
  activa admiterea bazată exclusiv pe rol; aplicația nu citește rolurile din
  tokenul de acces. Refuzul tokenului la nivelul IdP poate completa, dar nu
  înlocuiește această verificare la nivelul aplicației.
- La succes, generează exact același token JWT `auth_token` cu valabilitate de
  30 de zile pe care îl emite autentificarea cu parolă
  (`src/app/api/auth/login/route.ts`), astfel încât restul fluxului de sesiune
  al tabloului de bord (reîmprospătare automată, opțiuni pentru cookie) rămâne
  neschimbat — OIDC înlocuiește doar modul în care este generat cookie-ul, nu
  și drepturile pe care le acordă. Modificările rolurilor/grupurilor la nivelul
  IdP nu invalidează sesiunile OmniRoute existente; deconectarea, schimbarea
  parolei sau expirarea sesiunii le guvernează în continuare durata de viață.
- Fiecare setare `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) se află în
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings` răspunde cu `400 PASSWORD_REQUIRED` dacă corpul nu
  conține parola de administrare ca `currentPassword` (`401 PASSWORD_MISMATCH`
  când aceasta este incorectă). `oidcDisablePasswordLogin` refuză
  autentificarea cu parolă (`POST /api/auth/login`), dar păstrează hash-ul
  parolei stocate, iar reautentificarea verifică în continuare
  `currentPassword` în raport cu acesta.
- `corsOrigins` și `bruteForceProtection` se află și ele în
  `SECURITY_IMPACTING_SETTINGS_KEYS`: relaxarea oricăreia slăbește protecția
  autentificării, astfel încât necesită aceeași reautentificare cu
  `currentPassword` (fila Security o solicită), iar importul JSON le elimină.
- Fiecare cheie de politică de securitate — intrările din
  `SECURITY_IMPACTING_SETTINGS_KEYS`, fiecare cheie `oidc*` și starea sesiunii
  tabloului de bord — este disponibilă **doar operatorului** pentru
  `PATCH /api/settings`: o cheie API cu domeniul `manage` sau un token de acces
  `oma_` este refuzat cu `403` chiar și atunci când trimite
  `currentPassword` corect, iar refuzul este auditat ca
  `settings.update_failed` cu `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` în `src/lib/api/operatorCredential.ts`).
  Setările obișnuite (tema, preferințele de afișare) rămân modificabile
  folosind o cheie `manage` sau un token de acces `admin`. Fiecare modificare
  a `/api/settings` în sine (și a `/api/settings/require-login`) necesită, de
  asemenea, domeniul de acces `admin` pentru tokenul de acces
  (`ADMIN_MUTATION_EXACT_PATHS` în `src/server/authz/accessScopes.ts`,
  potrivire exactă a căii); `GET` rămâne `read`, iar celelalte sub-rute
  `/api/settings/*` (proxy-uri, valori implicite pentru combinații, aliasuri
  de modele, comprimare, ștergeri…) păstrează domeniul `write` dedus din
  metodă.
- `POST /api/settings/import-json` omite reautentificarea, astfel încât
  elimină fiecare cheie din `IMPORT_STRIPPED_SETTINGS_KEYS` (același fișier)
  înainte de scriere: parola și `currentPassword`, fiecare intrare din
  `SECURITY_IMPACTING_SETTINGS_KEYS` și starea sesiunii tabloului de bord
  (`sessionsValidAfter`, `revokedDashboardSessions`). Prin urmare, importarea
  unei copii de siguranță mai vechi nu poate reactiva o sesiune pe care o
  schimbare a parolei sau o deconectare a încheiat-o deja.

#### Autentificare opțională cu doi factori TOTP (#16619)

Activată din Settings → Security; este dezactivată până când operatorul o
activează (`src/server/auth/dashboardMfa.ts`).

- **Ce acoperă:** autentificarea cu parolă (`POST /api/auth/login`, care necesită apoi
  `POST /api/auth/mfa/verify`) și `omniroute connect` (`POST /api/cli/connect`,
  care refuză un schimb bazat doar pe parolă și primește codul ca `totp`).
- **Ce nu acoperă:** autentificarea OIDC / SSO (`/api/auth/oidc/callback`) nu
  solicită codul TOTP OmniRoute. Se bazează pe al doilea factor al propriului furnizor
  de identitate, așadar impuneți MFA în IdP dacă OIDC este activat.
- **Recuperare** (dispozitiv pierdut, fără coduri de recuperare rămase sau un factor care nu mai poate
  fi verificat, de exemplu după schimbarea `STORAGE_ENCRYPTION_KEY`):
  1. Reporniți serverul cu `OMNIROUTE_DISABLE_MFA=true`.
  2. Pe gazda însăși (peer loopback și `Host` loopback, precum
     `http://localhost:20128`), autentificați-vă cu parola. Al doilea factor este omis
     doar pentru acea origine; orice altă origine necesită în continuare codul.
  3. În Settings → Security → Disable, introduceți parola și lăsați codul
     necompletat. `POST /api/auth/mfa/disable` acceptă un corp fără `code` doar cât timp
     variabila este setată și solicitarea provine de la gazdă; necesită în continuare
     sesiunea dashboardului și parola curentă și este înregistrat în audit ca
     `auth.mfa.disabled` cu `secondFactor: "recovery_switch"`.
  4. Eliminați setarea `OMNIROUTE_DISABLE_MFA`, reporniți și înrolați din nou, dacă este necesar.

## Clase de rute

`src/server/authz/types.ts` definește trei clase; orice rută care nu poate fi clasificată determinist revine la `MANAGEMENT`.

| Clasă        | Descriere                                                                                                                                                         | Autentificare necesară                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `PUBLIC`     | Rute explicit sigure — autentificare, deconectare, stare, inițializare, health, bootstrap-ul onboarding-ului.                                                     | Niciuna                                                                             |
| `CLIENT_API` | Endpoint-uri de servire a modelelor — `/api/v1/*`, `/api/v1beta/*` și alias-urile `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Cheie Bearer când flag-ul de funcționalitate efectiv `REQUIRE_API_KEY` este activat |
| `MANAGEMENT` | Paginile panoului, setări, furnizori, chei, endpoint-uri de administrare și diagnostic.                                                                           | Sesiune de panou SAU Bearer cu domeniul `manage`                                    |

Câteva acțiuni `MANAGEMENT` sunt **doar pentru operator**: o cheie `manage` nu este suficientă. Exportul credențialelor stocate (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), restaurarea unei copii de rezervă peste datele live (`POST /api/db-backups/import`, inclusiv `dryRun=true`, `POST /api/db-backups` restaurare după id, `POST /api/settings/import-json`) și distrugerea punctelor de restaurare (curățarea prin `DELETE /api/db-backups` și de asemenea `PATCH /api/db-backups`, deoarece retenția pe care o persistă determină curățarea automată după fiecare copie de rezervă) necesită o sesiune de panou, subiectul CLI local sau autentificarea dezactivată. Emiterea unui token de sincronizare (`POST /api/sync/tokens`) și crearea unui token de acces CLI cu domeniul `admin` (`POST /api/cli/tokens`) necesită o sesiune de panou sau subiectul CLI local în orice mod de autentificare. Cheile API de orice domeniu și tokenurile de acces `oma_` nu sunt credențiale de operator: primesc `403` ori de câte ori se cere una. Verificarea se află în `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Modificarea setărilor de autentificare este și ea rezervată operatorului: `POST /api/settings/require-login` (setarea parolei de administrare / comutarea `requireLogin`) acceptă doar aceste credențiale odată ce există o parolă — fereastra de bootstrap de la prima rulare (fără parolă) rămâne neschimbată — iar o sesiune de panou trebuie să trimită `currentPassword` pentru a înlocui parola (`403` dacă lipsește sau este greșită, auditat ca `settings.update_failed`). CLI-ul local și o instanță cu autentificarea dezactivată păstrează calea de recuperare și pot seta o parolă fără ea, deoarece ambele sunt legate de gazda care deține directorul de date.

## Conductă

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

Anteturile interne de încredere (definite în `src/server/authz/headers.ts`) sunt** eliminate de la cererile primite** înainte de clasificare, clienții — nu pot prepopula `x-omniroute-auth-*` pentru a uzurpa identitatea unui subiect.

### Contracte de poliță

Fiecare clasă de rută are o politică în `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — returnează întotdeauna `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrage Bearer, validează prin `validateApiKey()`. Devine anonim numai atunci când indicatorul caracteristicii efective `REQUIRE_API_KEY` este dezactivat. Indicatorul efectiv este rezolvat prin `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), astfel încât Indicatorii de caracteristică a tabloului de bord și variabilele de mediu guvernează în mod consecvent `/api/v1/*`, `/api/v1beta/*` și aliasurile; eșecurile rezolutorului eșuate închise. Permite solicitări de sesiuni de tablou de bord pe rutele client API (inclusiv `/api/v1/models`, utilizat de catalogul modelelor de tablou de bord). Când Entra ID SSO este activat, un purtător care este structural un token Entra (trei segmente base64url, `RS*` alg, `kid`) este gestionat de ramura SSO** înainte** `validateApiKey()` și verdictul său este final — nu ajunge niciodată la calea cheii API sau la ramura de degradare la anonimă, astfel încât o întrerupere a furnizorului de identitate nu poate deveni acces deschis. Cheile statice API nu sunt afectate. Vezi [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — acceptă sesiunile de tablou de bord, cererile interne de sincronizare a modelului (potrivite cu `/api/providers/[name]/(sync-models|models)`) sau omite complet dacă `isAuthRequired()` returnează false. Returnează 403 (`AUTH_001`) când este prezent un simbol Bearer, dar nu este valid, 401 în caz contrar. De asemenea, impune nivelurile de gardă rută (LOCAL_ONLY / ALWAYS_PROTECTED) înainte de orice ramură de autentificare — vezi [Nivelurile de gardă rută](../security/ROUTE_GUARD_TIERS.md). Căile LOCAL_ONLY în `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (azi: `/api/mcp/`) pot fi accesate din non-loopback atunci când cheia Bearer poartă domeniul `manage` ; toate celelalte căi LOCAL_ONLY rămân strict-loopback, indiferent de domeniul de aplicare.

O politică de succes returnează `AuthSubject` cu `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Managerii din aval îl pot citi prin `assertAuth(request, "CLIENT_API")` în `src/server/authz/assertAuth.ts` în loc să ruleze din nou logica de autentificare.

## Lista rutelor publice

`src/shared/constants/publicApiRoutes.ts` este lista explicită de permisiuni:

Lista este împărțită după **formă**, iar această împărțire este esențială (GHSA-74g9-q8f6-793h): un prefix este
potrivit cu `startsWith()`, astfel încât se potrivește și cu fiecare rută adiacentă care îi partajează caracterele de început.
`/api/usage/om-usage` ca prefix marcat `/api/usage/om-usage<anything>` PUBLIC, iar Next îl rezolvă
la `/api/usage/[connectionId]` — un handler care nu are autentificare proprie.

```ts
// Subarbori autentici. Fiecare intrare TREBUIE să se termine cu "/" (verificat printr-un test unitar).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // tratat ca CLIENT_API în classify, nu ca „public fără autentificare”
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rute individuale, potrivite EXACT (cu sau fără slash la final).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // pasul 2 al autentificării pentru TOTP activat opțional; necesită cookie-ul MFA-pending
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Rute individuale numai pentru citire care beneficiază și de relaxarea originii CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rută individuală numai pentru citire FĂRĂ relaxarea CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rutele numai pentru citire sunt publice **doar** pentru metode sigure. Notă: `classifyRoute()` exclude `/api/v1/*` și `/api/v1beta/*` din mecanismul de rezervă PUBLIC — acestea sunt întotdeauna `CLIENT_API`, astfel încât politica pentru cheia Bearer se aplică în continuare.

## Adăugarea unei rute noi

### Modelul 1 — Endpoint API public pentru clienți (autentificare Bearer)

Rutele de sub `/api/v1/` și `/api/v1beta/` sunt clasificate automat drept `CLIENT_API`. Middleware-ul aplică verificarea Bearer; handler-ele rutelor nu trebuie să o repete, dar pot citi subiectul dacă este util.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logica handler-ului
}
```

### Modelul 2 — Endpoint de administrare (sesiune sau Bearer + manage)

Utilizați `requireManagementAuth()` din `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logica handler-ului
}
```

`requireManagementAuth()` returnează `null` în caz de succes sau un `Response` de eroare JSON:

- 401 `AUTH_001` "Autentificare necesară" — nu există deloc credențiale
- 403 — Bearer nevalid **sau** Bearer prezent, dar cheia nu are domeniul de aplicare `manage` / `admin`

`hasManageScope(scopes)` returnează true pentru `"manage"` sau `"admin"`.

### Modelul 3 — Adăugarea în lista publică de permisiuni

Alegeți setul în funcție de formă, nu de comoditate. O rută individuală trebuie adăugată în `PUBLIC_API_ROUTES_EXACT` (sau în `PUBLIC_READONLY_CORS_API_ROUTES` dacă acceptă doar GET); numai un subarbore autentic trebuie adăugat în `PUBLIC_API_ROUTE_PREFIXES`, iar acesta **trebuie să se termine cu `/`**. Adăugarea unei rute individuale în lista de prefixe face publică și fiecare cale adiacentă care are aceleași caractere inițiale — inclusiv rutele înrudite cu segmente dinamice adăugate ulterior (GHSA-74g9-q8f6-793h). Actualizați testele unitare din `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` și `tests/unit/authz/classify.test.ts`.

## Domenii de aplicare (Scopes)

Trei spații de nume. Fiecare verificator citește doar propriile șiruri de caractere. Comparația alăturată,
inclusiv de ce `manage` eșuează `scopeMatches` pentru `read:compression` și de ce un
token de acces `read` nu poate `PATCH /api/keys/{id}`, se găsește la
[Trei spații de nume pentru domenii de aplicare](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Cheile API conțin un array `scopes` (stocat ca JSON în `api_keys.scopes`, vezi `src/lib/db/apiKeys.ts`).

### Domeniul de aplicare pentru management

- `manage` / `admin` — `hasManageScope`. Acces de tip Bearer la rutele API de management.
- `mcp:connect`, `self:usage`, `self:account-quota` și
  `policy:bypass-provider-quota` sunt domenii de aplicare aditive cu potrivire exactă. Ele se află
  în afara `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` deschide doar
  secțiunea non-loopback `/api/mcp/`.

### Domenii de aplicare pentru instrumentele MCP

Catalog și reguli de potrivire (șir identic, sau un domeniu de aplicare acordat care se termină cu `*`):
[Domenii de aplicare pentru instrumentele MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` în `src/shared/constants/mcpScopes.ts` este subsetul tipizat original,
nu acel catalog complet. Aplicarea se realizează în
`open-sse/mcp-server/scopeEnforcement.ts` după ce `resolveCallerScopeContext()`
rezolvă domeniile de aplicare din informațiile de autentificare MCP, metadatele cererii sau `OMNIROUTE_MCP_SCOPES`.
Rămâne dezactivată, cu excepția cazului în care `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Domenii de aplicare pentru token-uri de acces

`read` / `write` / `admin` pe token-uri `oma_live_…`, clasificate prin `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Acest rang se aplică doar credențialului token-ului de acces.
Vezi [Autentificarea Managementului](../guides/MANAGEMENT-AUTH.md).

## Comutatorul de autentificare obligatorie

`isAuthRequired()` din `src/shared/utils/apiAuth.ts` decide dacă se impune **orice** autentificare pentru o cerere:

- `settings.requireLogin === false` → autentificarea este dezactivată global, cu excepția nivelului protejat permanent (vezi [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) și a apelurilor care emit o credențială pe care o acceptă, acestea necesitând aceeași credențială ca atunci când autentificarea este activă: emiterea tokenurilor de sincronizare, crearea tokenurilor de acces CLI de orice domeniu și crearea unei chei API cu domeniul `manage`/`admin`, acordarea acestui domeniu unei chei, regenerarea sau dezvăluirea unei astfel de chei (`requireCredentialForManagementScopedKey()` din `src/lib/api/requireManagementAuth.ts`). Cheile destinate doar inferenței rămân deschise.
- Nicio parolă configurată **și** nicio variabilă de mediu `INITIAL_PASSWORD` → modul de bootstrap permite expertul de configurare și cererile de pe loopback, dar cererile din rețea externă încă necesită credențiale.
- Orice eroare de bază de date → eșec închis (secure-by-default).

Aplicarea cheii API a clientului folosește `isRequireApiKeyEnabled()` din `src/shared/utils/featureFlags.ts`, nu o citire directă a `process.env.REQUIRE_API_KEY`. Acest lucru contează pentru instanțele implementate: comutarea `REQUIRE_API_KEY` în Dashboard → Feature Flags stochează o suprascriere în baza de date și afectează imediat `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` și celelalte verificări de autentificare a API-ului clientului care partajează acest helper. Dacă depozitul de feature flag-uri nu poate fi citit, autentificarea API-ului clientului eșuează închis și cere o cheie.

## Modificare incompatibilă — v3.8.0

Endpointurile `/api/v1/agents/tasks/*` și `/api/resilience/model-cooldowns` **necesită acum autentificare pentru administrare** (commitul `588a0333`). Clienții care trimiteau anterior o cheie API obișnuită, fără domeniul de acces `manage`, primesc `403`. Migrare: fie acordați cheii domeniul de acces `manage` în panoul API Keys, fie utilizați o sesiune autentificată în panoul de control.

## Modificare de comportament — v3.8.2

`/api/mcp/*` (serverul MCP la distanță) este în continuare LOCAL_ONLY în mod implicit, dar acceptă acum cereri non-loopback atunci când antetul `Authorization: Bearer <api-key>` conține domeniul de acces `manage`. Excepția este activată explicit pentru fiecare cale prin `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` în `src/server/authz/routeGuard.ts`; prefixul LOCAL_ONLY înrudit `/api/cli-tools/runtime/*` nu poate fi eludat în mod intenționat, deoarece poate genera subprocese arbitrare. Cererile anonime către `/api/mcp/*` provenite din afara interfeței loopback continuă să returneze `403 LOCAL_ONLY` — comportamentul implicit pentru orice cale LOCAL_ONLY nouă rămâne restricționarea strictă la loopback. Consultați [Nivelurile mecanismului de protecție a rutelor](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testare

- Teste unitare: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista de permisiuni publice: `tests/unit/public-api-routes.test.ts`.
- Rulare focalizată: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Depanare

Conducta ștampilă întotdeauna răspunsurile cu:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pentru cererile autentificate, anteturile cererii din amonte (partea de gestionare) includ, de asemenea:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Utilizați `assertAuth(req, expectedClass)` în interiorul handler-urilor — acesta aruncă `AuthzAssertionError` cu codul `AUTHZ_NOT_INITIALIZED` dacă middleware-ul a fost ocolit (util pentru a prinde regresiile de configurare în teste).

## Vezi și

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcator de autentificare per punct final
- [COMPLIANCE.md](../security/COMPLIANCE.md) — jurnal de audit pentru evenimente de autentificare
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trei spații de nume de scop și catalogul de scopuri de instrumente MCP
- Sursă: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
