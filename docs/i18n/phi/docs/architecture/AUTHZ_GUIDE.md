# Authorization Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Pinagmulan ng katotohanan:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Huling na-update:** 2026-09-22 — ang mga namespace ng saklaw ay tumuturo sa MCP-SERVER.md

Ang OmniRoute ay may pipeline ng awtorisasyon na may kamalayan sa ruta na nagbabantay sa bawat kahilingan ng API. Ang klasipikasyon ay **deterministic** at **fail-closed** — anumang hindi maiklasipika ay nagtatapos bilang `MANAGEMENT` at nangangailangan ng session o token na pang-pamamahala. Ipinaliliwanag ng pahinang ito ang modelo para sa mga inhinyero na nagpapanatili ng mga ruta o nagdidisenyo ng mga bagong endpoint.

![AuthZ pipeline (3 klase ng ruta + pagsusuri ng patakaran)](../diagrams/exported/authz-pipeline.svg)

> Pinagmulan: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dalawang Mode ng Autentikasyon

### 1. API Key (Bearer)

Ginagamit para sa mga client API na compatible sa OpenAI/Anthropic/Gemini at para sa ilang management route kapag may `manage` scope ang key.

```
Authorization: Bearer <api-key>
```

Bina-validate ng `isValidApiKey()` / `extractApiKey()` sa `src/sse/services/auth.ts` at ini-re-export sa pamamagitan ng `src/shared/utils/apiAuth.ts`. Tinatanggap din ng validator ang mga env var na `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` bilang mga persistent na passthrough key (issue #1350).

### 2. Session ng Dashboard (auth_token cookie)

Para sa mga dashboard page at mga admin operation.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Session lang ang cookie kapag na-verify ang JWT **at** may dalang `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Dumadaan sa helper na iyon ang bawat gumagamit ng cookie (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live server, `/api/settings/require-login`, `/api/auth/status`).
May iba pang JWT na pinirmahan ng `JWT_SECRET` — ang Cursor CLI passthrough ay nag-mint ng mga token na `iss "omniroute" / aud "cursor-cli"` para sa mga may hawak ng key — at hindi kailanman nagiging session (#13298).

Bine-verify ito ng `isDashboardSessionAuthenticated()` sa `src/shared/utils/apiAuth.ts`. Awtomatikong nire-refresh ng pipeline ang JWT kapag wala nang mahigit 7 araw sa 30-araw nitong buhay.

Maaaring matapos ang session bago lumipas ang 30 araw, dahil dumadaan ang bawat minter sa `mintDashboardSessionToken` (may issue time na `iat` at id na `jti`), at dalawang setting ang chine-check ng verifier: `sessionsValidAfter`, na itinatakda ng pagpapalit ng password para hindi na mag-verify ang bawat session na inisyu bago ito (ang browser na nagpalit ng password ay makakatanggap ng bagong cookie), at `revokedDashboardSessions`, kung saan idinadagdag ng `POST /api/auth/logout` ang `jti` ng session na nag-sign out. Ang mga session na minted ng mas lumang release ay walang alinman sa dalawang claim na ito at mananatiling valid hanggang sa unang pagpapalit ng password. Kapag hindi mabasa ang mga setting, hindi pinagkakatiwalaan ang session.

Ang ilang management route ay tumatanggap ng **alinman sa** dalawang mode: cookie O `Bearer <key>` kapag may `manage` (o `admin`) scope ang API key. Ito ang nagbibigay-daan sa workflow na "configurable via API calls" na idinagdag sa v3.8.

#### Opsyonal na OIDC login gate (#6973)

Sinusuportahan din ng dashboard admin login ang **opsyonal** na OIDC (OpenID Connect) flow kasabay ng default na password login. Hindi inaalis ang password login, dinadagdagan lang ito:

- Naka-disable maliban kung `settings.oidcEnabled === true` **at** kumpleto ang `oidcIssuer` / `oidcClientId` / `oidcClientSecret` (Settings → Auth). Nagbabalik ang `GET /api/auth/oidc/login` ng `400` kung hindi.
- Dine-discover ng `GET /api/auth/oidc/login` ang `authorization_endpoint` mula sa `/.well-known/openid-configuration` ng issuer (fallback sa `<issuer>/authorize`), binubuo ang redirect URI mula sa papasok na request (marunong sa `x-forwarded-proto`), at nagre-redirect sa IdP na may random na `state` na nakaimbak sa isang `httpOnly` na `oidc_state` cookie.
- Ina-validate ng `GET /api/auth/oidc/callback` ang `state`, pinapalitan ang authorization code, at ine-verify ang signature ng ID token sa pamamagitan ng JWKS ng issuer (`createRemoteJWKSet` ng `jose`, cached kada JWKS URI) na may `issuer`/`audience` checks. Kailangan ang allowlist na `oidcAllowedSubjects`: itinutugma nito ang `sub` claim ng token o ang `email` claim nito. Tinatanggap lamang ang email claim kapag `email_verified === true`, kaya hindi kailanman makakalusot sa gate ang hindi na-verify na email sa IdP. Kapag walang laman ang listahan, tinatanggihan ng callback ang bawat login (`not_configured`).
- Sa tagumpay, nagmi-mint ito ng **eksaktong parehong** 30-araw na `auth_token` JWT na inilalabas ng password login (`src/app/api/auth/login/route.ts`), kaya hindi nagbabago ang natitirang bahagi ng dashboard session pipeline (auto-refresh, cookie flags). Pinapalitan lamang ng OIDC ang paraan ng pag-mint ng cookie, hindi ang ipinagkakaloob nito.
- Bawat setting na `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) ay nasa `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): sumasagot ng `400 PASSWORD_REQUIRED` ang `PATCH /api/settings` maliban kung dala ng body ang management password bilang `currentPassword` (`401 PASSWORD_MISMATCH` kapag mali ito). Tinatanggihan ng `oidcDisablePasswordLogin` ang password _login_ (`POST /api/auth/login`) pero pinananatili ang nakaimbak na password hash, at tsinitsek pa rin ng re-auth ang `currentPassword` laban dito.
- Kasama rin ang `corsOrigins` at `bruteForceProtection` sa `SECURITY_IMPACTING_SETTINGS_KEYS`: ang pagpapaluwag sa alinman sa dalawa ay nagpapahina sa mga depensa sa login, kaya humihingi rin sila ng parehong re-auth gamit ang `currentPassword` (hinihingi ito ng Security tab) at inaalis sila ng JSON import.
- Bawat security-policy key (ang mga entry sa `SECURITY_IMPACTING_SETTINGS_KEYS`, bawat `oidc*` key, at ang estado ng dashboard session) ay **operator-only** sa `PATCH /api/settings`: tinatanggihan ng `403` ang manage-scoped na API key o `oma_` access token kahit tama ang ipinadalang `currentPassword`, at ina-audit ang pagtanggi bilang `settings.update_failed` na may `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` sa `src/lib/api/operatorCredential.ts`). Nananatiling maisusulat ang mga ordinaryong setting (theme, display preferences) para sa `manage` key o `admin` access token. Bawat pagbabago sa mismong `/api/settings` (at sa `/api/settings/require-login`) ay nangangailangan din ng `admin` access-token scope (`ADMIN_MUTATION_EXACT_PATHS` sa `src/server/authz/accessScopes.ts`, exact-path match). Nananatiling `read` ang `GET`, at pinananatili ng iba pang sub-route ng `/api/settings/*` (proxies, combo defaults, model aliases, compression, purges…) ang `write` scope na hinihinuha sa method.
- Nilalampasan ng `POST /api/settings/import-json` ang re-auth na iyon, kaya inaalis nito ang bawat key sa `IMPORT_STRIPPED_SETTINGS_KEYS` (parehong file) bago magsulat: ang password at `currentPassword`, bawat entry sa `SECURITY_IMPACTING_SETTINGS_KEYS`, at ang estado ng dashboard session (`sessionsValidAfter`, `revokedDashboardSessions`). Kaya ang pag-import ng mas lumang backup ay hindi makabubuhay ng session na tinapos na ng pagpapalit ng password o ng sign-out.

## Mga Uri ng Route

`src/server/authz/types.ts` ay nagtatakda ng tatlong uri. Anumang route na hindi maiuuri nang tiyak ay babalik sa `MANAGEMENT`.

| Uri          | Paglalarawan                                                                                                                                                      | Kinakailangang auth                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `PUBLIC`     | Tahasang ligtas na mga route: login, logout, status, init, health, onboarding bootstrap.                                                                          | Wala                                                                          |
| `CLIENT_API` | Mga model-serving endpoint: `/api/v1/*`, `/api/v1beta/*`, kasama ang mga alias na `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer key kapag naka-enable ang epektibong feature flag na `REQUIRE_API_KEY` |
| `MANAGEMENT` | Mga dashboard page, settings, provider, key, admin at diagnostics endpoint.                                                                                       | Dashboard session O Bearer na may `manage` scope                              |

Ilang aksyon ng `MANAGEMENT` ay **operator-only**: hindi sapat ang `manage` key. Ang pag-export ng nakaimbak na credential (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), ang pagbabalik ng backup sa ibabaw ng live na data (`POST /api/db-backups/import` kasama ang `dryRun=true`, `POST /api/db-backups` na restore ayon sa id, `POST /api/settings/import-json`), at ang pagsira ng restore point (`DELETE /api/db-backups` na cleanup, at `PATCH /api/db-backups` dahil ang retention na isinasave nito ang nagpapatakbo ng awtomatikong pruning pagkatapos ng bawat backup) ay nangangailangan ng dashboard session, ng lokal na CLI subject, o ng naka-disable na login. Ang pag-isyu ng sync token (`POST /api/sync/tokens`) at ang pag-mint ng `admin` CLI access token (`POST /api/cli/tokens`) ay nangangailangan ng dashboard session o ng lokal na CLI subject sa bawat login mode. Ang mga API key ng anumang scope at ang mga `oma_` access token ay hindi operator credential: nakakakuha sila ng `403` tuwing kailangan ang isa. Nasa `src/lib/api/operatorCredential.ts` ang check (`resolveOperatorCredential()` / `requireOperatorCredential()`). Operator-only din ang pagbabago ng login settings: tinatanggap lamang ng `POST /api/settings/require-login` (magtakda ng management password / i-toggle ang `requireLogin`) ang mga credential na iyon kapag may password na, hindi nagbabago ang first-run bootstrap window (walang password pa), at dapat magpadala ng `currentPassword` ang dashboard session para palitan ang password (`403` kapag nawawala o mali ito, at ina-audit bilang `settings.update_failed`). Pinananatili ng lokal na CLI at ng instance na naka-disable ang login ang recovery path at maaaring magtakda ng password nang wala nito, dahil parehong nakatali ang dalawa sa host na nagmamay-ari ng data directory.

## Pipeline

```
Papasok na request → src/proxy.ts
  → runAuthzPipeline() sa src/server/authz/pipeline.ts
    1. Alisin ang mga pinagkakatiwalaang internal header (x-omniroute-auth-*, x-omniroute-route-class)
    2. Bumuo ng request id, iklasipika ang route sa pamamagitan ng classifyRoute()
    3. Kung pathname == "/" → i-redirect sa /dashboard
    4. Kung nagda-drain (graceful shutdown) at /api/* → 503
    5. Kung hindi GET ang /api/* → checkBodySize() guard
    6. Kung OPTIONS → CORS preflight 204
    7. Kung options.enforce == false → direktang ipasa na may mga route-class header
    8. Kung hindi: POLICIES[routeClass].evaluate(ctx)
       - payagan  → itatak ang x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - tanggihan → JSON error na may correlation_id (mga dashboard page → 302 /login)
```

Ang mga pinagkakatiwalaang internal header (na tinukoy sa `src/server/authz/headers.ts`) ay **inaalis mula sa mga papasok na request** bago ang klasipikasyon — hindi maaaring paunang lagyan ng mga client ang `x-omniroute-auth-*` upang magpanggap bilang isang subject.

### Mga kontrata ng policy

Ang bawat klase ng route ay may policy sa `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — palaging nagbabalik ng `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — kinukuha ang Bearer at bine-validate ito sa pamamagitan ng `validateApiKey()`. Nagpapatuloy lamang sa anonymous kapag naka-disable ang epektibong `REQUIRE_API_KEY` feature flag. Nireresolba ang epektibong flag sa pamamagitan ng `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) upang pare-parehong pamahalaan ng mga Dashboard Feature Flag at environment variable ang `/api/v1/*`, `/api/v1beta/*`, at mga alias; kapag nabigo ang resolver, isinasara ang access. Pinapayagan ang mga dashboard-session request sa mga client API route (kabilang ang `/api/v1/models`, na ginagamit ng dashboard model catalog).
- **`managementPolicy`** (`policies/management.ts`) — tumatanggap ng dashboard session, mga internal model-sync request (itinutugma sa `/api/providers/[name]/(sync-models|models)`), o ganap na nilalaktawan kung nagbabalik ng false ang `isAuthRequired()`. Nagbabalik ng 403 (`AUTH_001`) kapag may Bearer token ngunit hindi ito valid, at 401 naman kung wala. Ipinapatupad din nito ang mga tier ng route guard (LOCAL_ONLY / ALWAYS_PROTECTED) bago ang anumang auth branch — tingnan ang [Mga Tier ng Route Guard](../security/ROUTE_GUARD_TIERS.md). Maaaring i-access mula sa non-loopback ang mga LOCAL_ONLY path sa `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (sa kasalukuyan: `/api/mcp/`) kapag taglay ng Bearer key ang `manage` scope; nananatiling mahigpit na loopback-only ang lahat ng iba pang LOCAL_ONLY path anuman ang scope.

Ang matagumpay na policy ay nagbabalik ng `AuthSubject` na may `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Mababasa ito ng mga downstream handler sa pamamagitan ng `assertAuth(request, "CLIENT_API")` sa `src/server/authz/assertAuth.ts` sa halip na muling patakbuhin ang auth logic.

## Listahan ng mga Pampublikong Route

Ang `src/shared/constants/publicApiRoutes.ts` ang tahasang allowlist:

Hinahati ang listahan ayon sa **hugis**, at kritikal ang paghahating ito (GHSA-74g9-q8f6-793h): itinutugma ang isang prefix gamit ang `startsWith()`, kaya tumutugma rin ito sa bawat katabing path na may parehong mga panimulang character.
Nang gawing prefix ang `/api/usage/om-usage`, namarkahan nitong PUBLIC ang `/api/usage/om-usage<anything>`, at nire-resolve iyon ng Next sa `/api/usage/[connectionId]` — isang handler na walang sarili nitong auth.

```ts
// Mga tunay na subtree. DAPAT magtapos sa "/" ang bawat entry (sinusuri ng isang unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // itinuturing na CLIENT_API sa classify, hindi bilang "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Mga indibidwal na route, EKSAKTONG itinutugma (mayroon man o walang trailing slash).
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

// Mga read-only na indibidwal na route na gumagamit din ng CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only na indibidwal na route na WALANG CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Pampubliko **lamang** ang mga read-only na route para sa mga ligtas na method. Tandaan: ibinubukod ng `classifyRoute()` ang `/api/v1/*` at `/api/v1beta/*` mula sa PUBLIC fall-through — palaging `CLIENT_API` ang mga iyon upang patuloy na mailapat ang patakaran sa Bearer key.

## Pagdaragdag ng Bagong Route

### Pattern 1 — Pampublikong client API endpoint (Bearer-auth)

Awtomatikong inuuri bilang `CLIENT_API` ang mga route sa ilalim ng `/api/v1/` at `/api/v1beta/`. Ipinapatupad ng middleware ang Bearer check; hindi na ito kailangang ulitin ng mga route handler, ngunit maaari nilang basahin ang subject kung kapaki-pakinabang.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... lohika ng handler
}
```

### Pattern 2 — Management endpoint (session o Bearer + manage)

Gamitin ang `requireManagementAuth()` mula sa `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... lohika ng handler
}
```

Nagbabalik ang `requireManagementAuth()` ng `null` kapag matagumpay, o ng JSON error na `Response`:

- 401 `AUTH_001` "Kailangan ang pagpapatotoo" — walang anumang credential
- 403 — hindi wastong Bearer **o** may Bearer ngunit walang `manage` / `admin` scope ang key

Nagbabalik ng true ang `hasManageScope(scopes)` para sa `"manage"` o `"admin"`.

### Pattern 3 — Pagdaragdag sa pampublikong allowlist

Piliin ang set ayon sa hugis, hindi ayon sa kaginhawaan. Ang isang route ay inilalagay sa `PUBLIC_API_ROUTES_EXACT` (o sa `PUBLIC_READONLY_CORS_API_ROUTES` kung GET-only); isang tunay na subtree lamang ang inilalagay sa `PUBLIC_API_ROUTE_PREFIXES`, at **dapat itong magtapos sa `/`**. Kapag naglagay ng isang indibidwal na route sa listahan ng prefix, nailalantad din sa publiko ang bawat katabing path na may kaparehong mga panimulang character — kabilang ang mga kapatid na dynamic-segment na idadagdag sa hinaharap (GHSA-74g9-q8f6-793h). I-update ang mga unit test sa `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts`, at `tests/unit/authz/classify.test.ts`.

## Mga Saklaw

Tatlong namespace. Bawat checker ay nagbabasa lamang ng sarili nitong string. Ang paghahambing, kasama ang dahilan kung bakit nabigo ang `manage` sa `scopeMatches` para sa `read:compression` at kung bakit ang isang `read` access token ay hindi maaaring `PATCH /api/keys/{id}`, ay [Tatlong namespace ng saklaw](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Ang mga API key ay nagdadala ng `scopes` array (nakaimbak bilang JSON sa `api_keys.scopes`, tingnan ang `src/lib/db/apiKeys.ts`).

### Saklaw ng Pamamahala

- `manage` / `admin` — `hasManageScope`. Bearer access sa mga ruta ng management API.
- Ang `mcp:connect`, `self:usage`, `self:account-quota`, at `policy:bypass-provider-quota` ay mga additive exact-match scope. Ang mga ito ay nasa labas ng `MANAGEMENT_API_KEY_SCOPES`. Binubuksan lamang ng `mcp:connect` ang `/api/mcp/` non-loopback carve-out.

### Mga saklaw ng tool ng MCP

Katalogo at mga panuntunan sa pagtutugma (magkaparehong string, o isang ibinigay na scope na nagtatapos sa `*`): [Mga saklaw ng tool ng MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes). Ang `MCP_SCOPE_LIST` sa `src/shared/constants/mcpScopes.ts` ay ang orihinal na typed subset, hindi ang buong katalogo. Ang pagpapatupad ay tumatakbo sa `open-sse/mcp-server/scopeEnforcement.ts` pagkatapos ma-resolve ng `resolveCallerScopeContext()` ang mga scope mula sa MCP auth info, request metadata, o `OMNIROUTE_MCP_SCOPES`. Mananatili itong naka-off maliban kung `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Mga saklaw ng access-token

`read` / `write` / `admin` sa `oma_live_…` na mga token, na niraranggo ng `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`). Ang ranggong ito ay nalalapat lamang sa credential ng access-token. Tingnan ang [Pagpapatunay ng Pamamahala](../guides/MANAGEMENT-AUTH.md).

## Toggle ng Kinakailangang Auth

Ang `isAuthRequired()` sa `src/shared/utils/apiAuth.ts` ang nagpapasya kung **anumang** auth ang ipapatupad para sa isang request:

- `settings.requireLogin === false` → naka-disable ang auth sa buong sistema, maliban sa always-protected tier (tingnan ang [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) at sa mga tawag na nagbibigay ng credential na tinatanggap nito, na nangangailangan ng parehong credential gaya kapag naka-on ang login: pag-isyu ng sync token, pag-mint ng CLI access token sa anumang scope, at paggawa ng API key na may `manage`/`admin` scope, pagbibigay ng scope na iyon sa isang key, o pag-regenerate o pagpapakita ng ganoong key (`requireCredentialForManagementScopedKey()` sa `src/lib/api/requireManagementAuth.ts`). Nananatiling bukas ang mga inference-only key.
- Walang password na naka-configure **at** walang `INITIAL_PASSWORD` env var → bootstrap mode: pinapayagan ng onboarding wizard at ng loopback request, pero kailangan pa rin ng credential ng mga request mula sa nakalantad na network.
- Anumang DB error → nagfa-fail closed (secure-by-default).

Ang client API key enforcement ay gumagamit ng `isRequireApiKeyEnabled()` sa `src/shared/utils/featureFlags.ts`, hindi ng direktang pagbasa sa `process.env.REQUIRE_API_KEY`. Mahalaga ito para sa mga naka-deploy na instance: ang pagpapalit ng `REQUIRE_API_KEY` sa Dashboard → Feature Flags ay nag-iimbak ng DB override at agad na nakaaapekto sa `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, at iba pang client-API auth check na gumagamit ng parehong helper. Kung hindi mabasa ang feature flag store, nagfa-fail closed ang client API auth at humihingi ng key.

## Breaking Change — v3.8.0

Ang mga endpoint na `/api/v1/agents/tasks/*` at `/api/resilience/model-cooldowns` ay **nangangailangan na ngayon ng management auth** (commit `588a0333`). Ang mga client na dati ay nagpapadala ng karaniwang API key na walang `manage` scope ay makatatanggap ng `403`. Pag-migrate: italaga sa key ang `manage` scope sa API Keys dashboard, o gumamit ng naka-log-in na dashboard session.

## Pagbabago sa Gawi — v3.8.2

Ang `/api/mcp/*` (ang remote MCP server) ay LOCAL_ONLY pa rin bilang default ngunit tumatanggap na ngayon ng mga non-loopback request kapag ang `Authorization: Bearer <api-key>` header ay may `manage` scope. Tahasang nililimitahan ang eksepsiyon sa bawat path sa pamamagitan ng `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` sa `src/server/authz/routeGuard.ts`; sadyang HINDI maaaring i-bypass ang kapatid na LOCAL_ONLY prefix na `/api/cli-tools/runtime/*` dahil maaari itong magsimula ng anumang subprocess. Patuloy na magbabalik ng `403 LOCAL_ONLY` ang mga anonymous na request sa `/api/mcp/*` mula sa non-loopback — nananatiling strict-loopback ang default para sa anumang bagong LOCAL_ONLY path. Tingnan ang [Mga Antas ng Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pagsubok

- Mga unit test: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Pampublikong allowlist: `tests/unit/public-api-routes.test.ts`.
- Patakbuhin nang nakatuon: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Pag-debug

Palaging nilalagyan ng pipeline ang mga tugon ng:

```
x-request-id:               <correlation id, inuulit sa mga katawan ng error>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para sa mga napatotohanang kahilingan, kasama rin sa mga upstream (panig ng handler) na header ng kahilingan ang:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opsyonal)
x-omniroute-auth-scopes:    listahang pinaghihiwalay ng kuwit
```

Gamitin ang `assertAuth(req, expectedClass)` sa loob ng mga handler — naglalabas ito ng `AuthzAssertionError` na may code na `AUTHZ_NOT_INITIALIZED` kung nalampasan ang middleware (kapaki-pakinabang para matukoy ang mga pag-urong sa configuration sa mga test).

## Tingnan Din

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pananda ng pagpapatunay bawat endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — audit log para sa mga kaganapan ng pagpapatunay
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tatlong scope namespace at MCP tool-scope catalog
- Pinagmulan: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
