# Authorization Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Zdroj pravdy:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Poslední aktualizace:** 2026-09-22 — jmenné prostory rozsahů odkazují na MCP-SERVER.md

OmniRoute používá autorizační řetězec zohledňující routy, který kontroluje každý požadavek API. Klasifikace je **deterministická** a **fail-closed** — cokoli, co nelze klasifikovat, spadá do kategorie `MANAGEMENT` a vyžaduje relaci nebo token s oprávněními pro správu. Tato stránka vysvětluje model určený technikům, kteří udržují routy nebo navrhují nové koncové body.

![Autorizační řetězec (3 třídy rout + vyhodnocení zásad)](../diagrams/exported/authz-pipeline.svg)

> Zdroj: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva režimy autentizace

### 1. Klíč API (Bearer)

Používá se pro klientská rozhraní API kompatibilní s OpenAI/Anthropic/Gemini a pro některé administrační trasy, když má klíč rozsah `manage`.

```
Authorization: Bearer <api-key>
```

Ověřuje se pomocí `isValidApiKey()` / `extractApiKey()` v `src/sse/services/auth.ts` a znovu exportuje prostřednictvím `src/shared/utils/apiAuth.ts`. Validátor také přijímá proměnné prostředí `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` jako trvalé průchozí klíče (issue #1350).

### 2. Relace řídicího panelu (cookie auth_token)

Pro stránky řídicího panelu a administrátorské operace.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie je relací pouze tehdy, když se JWT ověří **a** obsahuje `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Každý
spotřebitel cookie (ochrana trasy řídicího panelu (`isDashboardSessionAuthenticated()`), obnovení v autorizačním
kanálu, navázání WebSocketu, živý
server, `/api/settings/require-login`, `/api/auth/status`) prochází touto pomocnou funkcí.
Existují i další JWT podepsané pomocí `JWT_SECRET` — předávání přes Cursor CLI vytváří tokeny
s hodnotami `iss "omniroute" / aud "cursor-cli"` pro držitele klíčů — a ty nikdy nejsou relacemi
(#13298).

Ověřuje se pomocí `isDashboardSessionAuthenticated()` v `src/shared/utils/apiAuth.ts`. Kanál automaticky obnoví JWT, když mu v jeho 30denní životnosti zbývá méně než 7 dní.

Relace může skončit i před uplynutím 30 dnů, protože každý vydavatel prochází přes `mintDashboardSessionToken` (čas vydání `iat` a ID `jti`) a ověřovatel kontroluje dvě nastavení: `sessionsValidAfter`, nastavené změnou hesla, takže se přestanou ověřovat všechny relace vydané před touto změnou (prohlížeč, který heslo změnil, získá nový cookie), a `revokedDashboardSessions`, do kterého `POST /api/auth/logout` přidá `jti` odhlášené relace. Relace vydané starší verzí neobsahují žádný z těchto claimů a zůstávají platné až do první změny hesla. Pokud nastavení nelze načíst, relace se nepovažuje za důvěryhodnou.

Některé administrační trasy přijímají **kterýkoli** režim: cookie NEBO `Bearer <key>`, když má klíč rozsah `manage` (nebo `admin`). To umožňuje pracovní postup „konfigurovatelné prostřednictvím volání API“, přidaný ve verzi v3.8.

#### Volitelná přihlašovací brána OIDC (#6973)

Přihlášení správce řídicího panelu také podporuje **volitelný** tok OIDC (OpenID Connect)
vedle výchozího přihlášení heslem — přihlášení heslem se nikdy neodstraňuje, pouze
doplňuje:

- Zakázáno, pokud `settings.oidcEnabled === true` **a zároveň** nejsou nakonfigurovány všechny hodnoty `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` (Nastavení → Ověření).
  `GET /api/auth/oidc/login` jinak vrací `400`.
- `GET /api/auth/oidc/login` zjistí `authorization_endpoint` z
  `/.well-known/openid-configuration` poskytovatele issuer (v opačném případě použije
  `<issuer>/authorize`), sestaví URI pro přesměrování z příchozího požadavku
  (zohledňuje `x-forwarded-proto`) a přesměruje na IdP s náhodným `state`,
  uloženým v cookie `oidc_state` s příznakem `httpOnly`.
- `GET /api/auth/oidc/callback` ověří `state`, vymění autorizační
  kód a ověří podpis ID tokenu prostřednictvím JWKS poskytovatele issuer
  (`createRemoteJWKSet` z `jose`, uložené v mezipaměti podle URI JWKS)
  s kontrolami `issuer`/`audience`. Přístup na dashboard vyžaduje neprázdný seznam
  `oidcAllowedSubjects`, zásadu `oidcAdmissionClaim`, nebo obojí. Seznam subjektů
  porovnává `sub` nebo `email` pouze tehdy, když `email_verified === true`.
  Volitelná zásada claimu používá tečkami oddělenou cestu k claimu ID tokenu
  (například `realm_access.roles`) a pole akceptovaných hodnot; výsledný claim
  musí být polem řetězců obsahujícím alespoň jednu akceptovanou hodnotu. Pokud jsou
  nakonfigurovány obě zásady, musí projít obě. Chybějící nebo nesprávně formátované
  claimy vedou k zamítnutí a bez kterékoli zásady callback odmítne přihlášení
  (`not_configured`). Stávající konfigurace založené pouze na subjektu zůstávají
  beze změny.
- Keycloak obvykle mapuje role realmů do access tokenů, nikoli nutně do ID tokenů.
  Chcete-li vyžadovat roli realmu `admin`, nakonfigurujte pro tohoto klienta
  protocol mapper, který zahrne `realm_access.roles` do jeho **ID tokenu**, a poté
  nastavte `oidcAdmissionClaim` na `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Před povolením přístupu pouze na základě role ověřte skutečný claim ID tokenu
  tohoto klienta; aplikace nečte role z access tokenu. Odmítnutí tokenu na straně IdP
  může tuto kontrolu doplnit, ale nenahrazuje ji.
- Po úspěšném přihlášení vytvoří **přesně stejný** 30denní JWT `auth_token`, jaký
  vydává přihlášení heslem (`src/app/api/auth/login/route.ts`), takže zbytek
  procesu relace dashboardu (automatické obnovování, příznaky cookie) zůstává
  beze změny — OIDC pouze nahrazuje způsob vytvoření cookie, nikoli oprávnění,
  která uděluje. Změny rolí/skupin na straně IdP nezneplatní existující relace
  OmniRoute; jejich trvání je stále řízeno odhlášením, změnou hesla nebo vypršením
  relace.
- Každé nastavení `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) je v
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  odpovídá `400 PASSWORD_REQUIRED`, pokud tělo požadavku neobsahuje heslo pro správu
  jako `currentPassword` (`401 PASSWORD_MISMATCH`, pokud je nesprávné).
  `oidcDisablePasswordLogin` odmítá přihlášení heslem (`POST /api/auth/login`),
  ale zachovává uložený hash hesla a opětovné ověření stále kontroluje
  `currentPassword` proti němu.
- `corsOrigins` a `bruteForceProtection` jsou také v `SECURITY_IMPACTING_SETTINGS_KEYS`:
  uvolnění kteréhokoli z nich oslabuje ochranu přihlášení, takže vyžadují stejné
  opětovné ověření pomocí `currentPassword` (záložka Zabezpečení ho vyžaduje)
  a import JSON je zahodí.
- Každý klíč bezpečnostní zásady — položky v `SECURITY_IMPACTING_SETTINGS_KEYS`,
  každý klíč `oidc*` a stav relace dashboardu — je při `PATCH /api/settings`
  **pouze pro operátora**: API klíč s oprávněním manage nebo přístupový token
  `oma_` je odmítnut s `403` i v případě, že odešle správné `currentPassword`,
  a odmítnutí se zapíše do auditu jako `settings.update_failed` s hodnotou
  `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` v `src/lib/api/operatorCredential.ts`).
  Běžná nastavení (motiv, předvolby zobrazení) lze nadále zapisovat pomocí klíče
  `manage` nebo přístupového tokenu `admin`. Každá změna samotného `/api/settings`
  (a také `/api/settings/require-login`) navíc vyžaduje rozsah přístupového tokenu
  `admin` (`ADMIN_MUTATION_EXACT_PATHS` v `src/server/authz/accessScopes.ts`,
  přesná shoda cesty); `GET` zůstává v rozsahu `read` a ostatní podcesty
  `/api/settings/*` (proxy, výchozí nastavení kombinací, aliasy modelů, komprese,
  mazání…) si zachovávají rozsah `write` odvozený z metody.
- `POST /api/settings/import-json` toto opětovné ověření obchází, takže před
  zápisem zahodí každý klíč v `IMPORT_STRIPPED_SETTINGS_KEYS` (stejný soubor):
  heslo a `currentPassword`, každou položku `SECURITY_IMPACTING_SETTINGS_KEYS`
  a stav relace dashboardu (`sessionsValidAfter`, `revokedDashboardSessions`).
  Import starší zálohy proto nemůže znovu aktivovat relaci, kterou již ukončila
  změna hesla nebo odhlášení.

#### Volitelné dvoufaktorové přihlášení TOTP (#16619)

Nastavuje se v Nastavení → Zabezpečení; je vypnuté, dokud ho operátor nezapne
(`src/server/auth/dashboardMfa.ts`).

- **Co pokrývá:** přihlášení heslem (`POST /api/auth/login`, které pak vyžaduje
  `POST /api/auth/mfa/verify`) a `omniroute connect` (`POST /api/cli/connect`,
  které odmítá výměnu pouze s heslem a přijímá kód jako `totp`).
- **Co nepokrývá:** přihlášení přes OIDC / SSO (`/api/auth/oidc/callback`)
  nevyžaduje OmniRoute TOTP. Spoléhá na vlastní druhý faktor poskytovatele
  identity, takže pokud je OIDC povoleno, vynuťte MFA v IdP.
- **Obnovení** (ztracené zařízení, žádné zbývající kódy pro obnovení nebo faktor,
  který již nelze ověřit, například po změně `STORAGE_ENCRYPTION_KEY`):
  1. Restartujte server s nastavením `OMNIROUTE_DISABLE_MFA=true`.
  2. Na samotném hostiteli (peer loopback a loopback `Host`, například
     `http://localhost:20128`) se přihlaste heslem. Druhý faktor se pro tento
     origin přeskočí; každý jiný origin stále vyžaduje kód.
  3. V Nastavení → Zabezpečení → Deaktivovat zadejte heslo a kód ponechte
     prázdný. `POST /api/auth/mfa/disable` přijímá tělo bez `code` pouze tehdy,
     když je proměnná nastavena a požadavek přichází z hostitele; stále vyžaduje
     relaci řídicího panelu a aktuální heslo a je auditován jako
     `auth.mfa.disabled` s `secondFactor: "recovery_switch"`.
  4. Zrušte nastavení `OMNIROUTE_DISABLE_MFA`, restartujte server a v případě
     potřeby proveďte registraci znovu.

## Třídy trasy

`src/server/authz/types.ts` definuje tři třídy; jakákoli cesta, kterou nelze klasifikovat deterministicky, spadá zpět do `MANAGEMENT`.

| Třída        | Popis                                                                                                                                                      | Je vyžadováno ověření                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `PUBLIC`     | Explicitně bezpečné cesty — přihlášení, odhlášení, stav, zdraví, bootstrap při nástupu.                                                                    | Žádný                                                        |
| `CLIENT_API` | Koncové body poskytující model — `/api/v1/*`, `/api/v1beta/*`, plus aliasy `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Nosný klíč, když je aktivní příznak funkce `REQUIRE_API_KEY` |
| `MANAGEMENT` | Stránky řídicího panelu, nastavení, poskytovatelé, klíče, administrační a diagnostické koncové body.                                                       | Dashboard session OR Bearer s rozsahem `manage`              |

Několik akcí `MANAGEMENT` je** pouze pro operátora** : klíč `manage` nestačí. Export uložených přihlašovacích údajů (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), obnovení zálohy přes aktuální data (`POST /api/db-backups/import` včetně `dryRun=true`, `POST /api/db-backups` restore by id, `POST /api/settings/import-json`), zničení bodů obnovení (`DELETE /api/db-backups` cleanup a `PATCH /api/db-backups` protože zachování, které přetrvává, vede k automatickému ořezávání po každé záloze) vyžaduje relaci řídicího panelu, místní CLI. Vydání synchronizačního tokenu (`POST /api/sync/tokens`) a ražení přístupového tokenu `admin` CLI (`POST /api/cli/tokens`) vyžaduje relaci řídicího panelu nebo místního subjektu CLI v každém režimu přihlášení. Klíče API jakéhokoli rozsahu a přístupové tokeny `oma_` nejsou přihlašovacími údaji operátora: získají `403` kdykoli je potřeba. Šek žije v `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Změna nastavení přihlášení je také pouze pro operátora: `POST /api/settings/require-login` (nastavit heslo pro správu / přepnout `requireLogin`) přijímá pouze tyto přihlašovací údaje, jakmile heslo existuje — okno prvního spuštění (zatím bez hesla) se nezmění — a relace řídicího panelu musí odeslat `currentPassword` aby nahradilo heslo (`403` když chybí nebo je nesprávné, auditováno jako `settings.update_failed`). Místní CLI a instance se zakázaným přihlášením uchovávají cestu pro obnovení a mohou nastavit heslo bez ní, protože obě jsou vázány na hostitele, který vlastní datový adresář.

## Potrubí

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

Důvěryhodné interní hlavičky (definované v `src/server/authz/headers.ts`) jsou** odstraněny z příchozích požadavků** před klasifikací klienti — nemohou předem vyplnit `x-omniroute-auth-*`, aby se vydávali za subjekt.

### Pojistné smlouvy

Každá třída trasy má zásady v `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — vždy vrátí `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrahuje nosič, ověřuje přes `validateApiKey()`. Propadne na anonymní pouze tehdy, když je deaktivován efektivní příznak funkce `REQUIRE_API_KEY`. Efektivní příznak je vyřešen pomocí `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), takže příznaky funkcí ovládacího panelu a proměnné prostředí řídí `/api/v1/*`, `/api/v1beta/*` a aliasy konzistentně; Selhání resolveru uzavřeno. Umožňuje požadavky na relaci řídicího panelu na klientských trasách API (včetně `/api/v1/models`, používaného v katalogu modelů řídicích panelů). Když je Entra ID SSO povolen, Nosič, který je strukturálně token Entra (tři segmenty base64url, `RS*` alg, `kid`), zpracovává větev SSO** před** `validateApiKey()` a jeho verdikt je konečný — nikdy neprojde cestou klíče API nebo větve degradace na anonymní, takže výpadek poskytovatele identity se nemůže stát otevřeným přístupem. Statické klávesy API nejsou ovlivněny. Viz [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — přijímá relaci řídicího panelu, požadavky na interní synchronizaci modelu (porovnané se `/api/providers/[name]/(sync-models|models)`) nebo zcela přeskakuje, pokud `isAuthRequired()` vrátí hodnotu false. Vrátí 403 (`AUTH_001`), když je token nositele přítomen, ale neplatný, jinak 401. Také vynucuje úrovně ochrany trasy (LOCAL_ONLY / ALWAYS_PROTECTED) před jakoukoli auth větví — viz [vrstvy Route Guard](../security/ROUTE_GUARD_TIERS.md). Cesty LOCAL_ONLY v `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (dnes: `/api/mcp/`) mohou být přístupné z bez zpětné smyčky, když klíč Nosiče nese rozsah `manage` ; všechny ostatní cesty LOCAL_ONLY zůstávají striktně-loopback bez ohledu na rozsah.

Úspěšná politika vrátí `AuthSubject` s `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Následné obslužné programy jej mohou číst prostřednictvím `assertAuth(request, "CLIENT_API")` v `src/server/authz/assertAuth.ts` namísto opětovného spouštění auth logiky.

## Seznam veřejných tras

`src/shared/constants/publicApiRoutes.ts` je explicitní seznam povolených:

Seznam je rozdělen podle** tvar** a rozdělení je nosné (GHSA-74g9-q8f6-793h): předpona je shodná s `startsWith()`, takže také odpovídá každé sousední cestě sdílející její vedoucí znaky. `/api/usage/om-usage` jako prefix označený `/api/usage/om-usage<anything>` PUBLIC a Next to řeší tak, že `/api/usage/[connectionId]` — obslužný program bez vlastního ověření.

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

Trasy pouze pro čtení jsou veřejné** pouze** pro bezpečné metody. Poznámka: `classifyRoute()` vylučuje `/api/v1/*` a `/api/v1beta/*` z propadu PUBLIC — ty jsou vždy `CLIENT_API` takže zásada nosného klíče stále platí.

## Přidání nové trasy

### Vzor 1 — Veřejný koncový bod klientského API (ověřování Bearer)

Trasy pod `/api/v1/` a `/api/v1beta/` jsou automaticky klasifikovány jako `CLIENT_API`. Middleware vynucuje kontrolu Bearer; obslužné rutiny tras ji nemusejí opakovat, ale mohou v případě potřeby načíst subjekt.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika obslužné rutiny
}
```

### Vzor 2 — Koncový bod pro správu (relace nebo Bearer + oprávnění ke správě)

Použijte `requireManagementAuth()` ze souboru `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika obslužné rutiny
}
```

Při úspěchu vrací `requireManagementAuth()` hodnotu `null`, jinak chybovou odpověď JSON typu `Response`:

- 401 `AUTH_001` „Je vyžadováno ověření“ — nejsou k dispozici žádné přihlašovací údaje
- 403 — neplatný Bearer **nebo** je Bearer přítomen, ale klíč nemá rozsah `manage` / `admin`

`hasManageScope(scopes)` vrací hodnotu true pro `"manage"` nebo `"admin"`.

### Vzor 3 — Přidání do seznamu veřejných tras

Sadu zvolte podle tvaru, nikoli podle pohodlnosti. Jedna trasa patří do `PUBLIC_API_ROUTES_EXACT` (nebo do `PUBLIC_READONLY_CORS_API_ROUTES`, pokud podporuje pouze GET); pouze skutečný podstrom patří do `PUBLIC_API_ROUTE_PREFIXES` a **musí končit znakem `/`**. Vložením jedné trasy do seznamu prefixů zveřejníte také každou sousední cestu se stejnými počátečními znaky — včetně sourozeneckých tras s dynamickými segmenty přidaných později (GHSA-74g9-q8f6-793h). Aktualizujte jednotkové testy v `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` a `tests/unit/authz/classify.test.ts`.

## Rozsahy

Tři jmenné prostory. Každý kontrolní mechanismus čte pouze své vlastní řetězce. Porovnání vedle sebe,
včetně toho, proč `manage` nevyhoví funkci `scopeMatches` pro `read:compression` a proč
přístupový token s rozsahem `read` nemůže provést `PATCH /api/keys/{id}`, najdete v dokumentu
[Tři jmenné prostory rozsahů](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Klíče API obsahují pole `scopes` (uložené jako JSON v `api_keys.scopes`, viz `src/lib/db/apiKeys.ts`).

### Rozsah správy

- `manage` / `admin` — `hasManageScope`. Přístup s tokenem Bearer k trasám rozhraní API pro správu.
- `mcp:connect`, `self:usage`, `self:account-quota` a
  `policy:bypass-provider-quota` jsou doplňkové rozsahy s přesnou shodou. Nacházejí se
  mimo `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` povoluje pouze
  výjimku pro přístup k `/api/mcp/` mimo rozhraní loopback.

### Rozsahy nástrojů MCP

Katalog a pravidla porovnávání (identický řetězec nebo udělený rozsah končící znakem `*`):
[Rozsahy nástrojů MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` v `src/shared/constants/mcpScopes.ts` je původní typovaná
podmnožina, nikoli celý tento katalog. Vynucování probíhá v souboru
`open-sse/mcp-server/scopeEnforcement.ts` poté, co `resolveCallerScopeContext()`
zjistí rozsahy z ověřovacích údajů MCP, metadat požadavku nebo `OMNIROUTE_MCP_SCOPES`.
Zůstává vypnuté, pokud není nastaveno `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Rozsahy přístupových tokenů

`read` / `write` / `admin` u tokenů `oma_live_…`, seřazené funkcí `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Toto pořadí se vztahuje pouze na přihlašovací údaj
přístupového tokenu. Viz [Ověřování pro správu](../guides/MANAGEMENT-AUTH.md).

## Přepínač vyžadováno ověření

`isAuthRequired()` v `src/shared/utils/apiAuth.ts` rozhoduje, zda** žádný** auth je vynuceno pro požadavek:

- `settings.requireLogin === false` → auth je globálně zakázáno, s výjimkou vždy chráněné vrstvy (viz [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) a volání, která předávají pověření, které přijímá a která potřebují stejné pověření jako při přihlášení: vydávání synchronizačních tokenů, ražení přístupových tokenů CLI v libovolném rozsahu a vytvoření klíče API pomocí klíče `manage` nebo udělení takového klíče /`admin` rozsahu. (`requireCredentialForManagementScopedKey()` v `src/lib/api/requireManagementAuth.ts`). Klíče pouze pro odvození zůstanou otevřené. Zapsání příznaku chráněné funkce (`REQUIRE_API_KEY`, ostatní příznaky zabezpečení a příznaky SSRF / TLS / MCP-scope / sandbox uvedené v [příznakech funkcí](../reference/FEATURE_FLAGS.md#rest-api) ) a uložení nastavení maskování PII (`PUT /api/settings/pii`) také stále potřebuje pověření.
- Není nakonfigurováno žádné heslo** a** no `INITIAL_PASSWORD` env var → bootstrap režim umožňuje onboarding wizard a požadavky na zpětnou smyčku, ale vystavené síťové požadavky stále potřebují pověření. Výjimka: zapsání příznaku chráněné funkce a uložení nastavení maskování PII (`PUT /api/settings/pii`) vyžaduje pověření i ze zpětné smyčky, takže zpětná smyčka sama o sobě nestačí.
- Jakákoli chyba DB → se nezdaří uzavřít (zabezpečeno ve výchozím nastavení).

Vynucení klíče API klienta používá `isRequireApiKeyEnabled()` v `src/shared/utils/featureFlags.ts`, nikoli přímé čtení `process.env.REQUIRE_API_KEY`. To je důležité pro nasazené instance: přepnutí `REQUIRE_API_KEY` v Dashboard → Feature Flags uloží přepsání DB a okamžitě ovlivní `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` a další kontroly ověřování klientského rozhraní API, které sdílejí tohoto pomocníka. Pokud nelze číst úložiště příznaků funkcí, klientské ověření API se nezdaří a vyžaduje klíč.

## Zásadní změna — v3.8.0

Koncové body `/api/v1/agents/tasks/*` a `/api/resilience/model-cooldowns` **nyní vyžadují ověření pro správu** (commit `588a0333`). Klienti, kteří dříve odesílali běžný klíč API bez rozsahu oprávnění `manage`, obdrží `403`. Migrace: buď klíči přidělte rozsah oprávnění `manage` na panelu API Keys, nebo použijte přihlášenou relaci panelu.

## Změna chování — v3.8.2

`/api/mcp/*` (vzdálený server MCP) je ve výchozím nastavení stále LOCAL_ONLY, ale nyní přijímá požadavky mimo zpětnou smyčku, pokud hlavička `Authorization: Bearer <api-key>` obsahuje rozsah oprávnění `manage`. Tato výjimka je explicitně povolována pro jednotlivé cesty prostřednictvím `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` v `src/server/authz/routeGuard.ts`; související prefix LOCAL_ONLY `/api/cli-tools/runtime/*` záměrně nelze obejít, protože může spouštět libovolné podprocesy. Anonymní požadavky na `/api/mcp/*` mimo zpětnou smyčku nadále vracejí `403 LOCAL_ONLY` — výchozí nastavení pro každou novou cestu LOCAL_ONLY nadále striktně vyžaduje zpětnou smyčku. Viz [Úrovně ochrany tras](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testování

- Jednotkové testy: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Veřejný seznam povolených položek: `tests/unit/public-api-routes.test.ts`.
- Spuštění vybraného testu: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Ladění

Potrubí vždy označí odpovědi:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pro autentizované požadavky upstream (na straně obslužné rutiny) hlavičky požadavků také zahrnují:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Použijte `assertAuth(req, expectedClass)` uvnitř obslužných rutin — to vyvolá `AuthzAssertionError` s kódem `AUTHZ_NOT_INITIALIZED` pokud byl middleware obejit (užitečné pro zachycení konfiguračních regresí v testech).

## Viz také

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — označení autentizace pro každý koncový bod
- [COMPLIANCE.md](../security/COMPLIANCE.md) — protokol auditu událostí autentizace
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tři jmenné prostory rozsahů a katalog rozsahů nástrojů MCP
- Zdroj: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
