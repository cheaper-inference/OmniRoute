# Authorization Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Zdroj pravdy:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Poslední aktualizace:** 2026-09-22 — jmenné prostory rozsahů odkazují na MCP-SERVER.md

OmniRoute používá autorizační řetězec zohledňující routy, který kontroluje každý požadavek API. Klasifikace je **deterministická** a **fail-closed** — cokoli, co nelze klasifikovat, spadá do kategorie `MANAGEMENT` a vyžaduje relaci nebo token s oprávněními pro správu. Tato stránka vysvětluje model určený technikům, kteří udržují routy nebo navrhují nové koncové body.

![Autorizační řetězec (3 třídy rout + vyhodnocení zásad)](../diagrams/exported/authz-pipeline.svg)

> Zdroj: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva režimy ověřování

### 1. Klíč API (Bearer)

Používá se pro klientská API kompatibilní s OpenAI/Anthropic/Gemini a několik tras pro správu, pokud má klíč oprávnění `manage`.

```
Authorization: Bearer <api-key>
```

Ověřuje se pomocí `isValidApiKey()` / `extractApiKey()` v `src/sse/services/auth.ts` a znovu se exportuje prostřednictvím `src/shared/utils/apiAuth.ts`. Validátor rovněž přijímá proměnné prostředí `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` jako trvalé klíče pro předávání požadavků (problém #1350).

### 2. Relace řídicího panelu (soubor cookie auth_token)

Pro stránky řídicího panelu a operace správce.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Soubor cookie představuje relaci pouze tehdy, když je token JWT ověřen **a** obsahuje `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Každý
příjemce souboru cookie (ochrana trasy řídicího panelu (`isDashboardSessionAuthenticated()`), obnovení autorizačního kanálu, navázání spojení WebSocket, živý
server, `/api/settings/require-login`, `/api/auth/status`) používá tuto pomocnou funkci.
Existují i jiné tokeny JWT podepsané pomocí `JWT_SECRET` — předávání přes Cursor CLI razí
pro držitele klíčů tokeny `iss "omniroute" / aud "cursor-cli"` — ty však nikdy nepředstavují relace
(#13298).

Ověřuje se pomocí `isDashboardSessionAuthenticated()` v `src/shared/utils/apiAuth.ts`. Kanál automaticky obnoví token JWT, pokud do konce jeho 30denní platnosti zbývá méně než 7 dní.

Relace může skončit také před uplynutím 30 dní, protože každý vydavatel používá `mintDashboardSessionToken` (čas vydání `iat` a identifikátor `jti`) a ověřovací funkce kontroluje dvě nastavení: `sessionsValidAfter`, které se nastaví při změně hesla, takže všechny relace vydané před tímto okamžikem přestanou procházet ověřením (prohlížeč, ve kterém bylo heslo změněno, obdrží nový soubor cookie), a `revokedDashboardSessions`, do něhož `POST /api/auth/logout` přidá `jti` odhlášené relace. Relace vytvořené starší verzí neobsahují ani jeden z těchto nároků a zůstávají platné až do první změny hesla. Pokud nastavení nelze načíst, relace se nepovažuje za důvěryhodnou.

Některé trasy pro správu přijímají **kterýkoli** režim: soubor cookie NEBO `Bearer <key>`, pokud má klíč API oprávnění `manage` (nebo `admin`). To umožňuje pracovní postup „konfigurovatelný prostřednictvím volání API“, který byl přidán ve verzi v3.8.

#### Volitelná přihlašovací brána OIDC (#6973)

Přihlášení správce do řídicího panelu podporuje vedle výchozího přihlášení heslem také **volitelný** tok OIDC (OpenID Connect) — přihlášení heslem není nikdy odstraněno, pouze
doplněno:

- Zakázáno, pokud není splněno `settings.oidcEnabled === true` **a zároveň** nejsou
  nakonfigurovány všechny položky `oidcIssuer` / `oidcClientId` / `oidcClientSecret`
  (Nastavení → Autentizace). Jinak `GET /api/auth/oidc/login` vrátí `400`.
- `GET /api/auth/oidc/login` zjistí `authorization_endpoint` z konfigurace
  `/.well-known/openid-configuration` vydavatele (případně použije
  `<issuer>/authorize`), sestaví URI přesměrování z příchozího požadavku
  (s podporou `x-forwarded-proto`) a přesměruje na IdP s náhodnou hodnotou `state`
  uloženou v souboru cookie `oidc_state` s příznakem `httpOnly`.
- `GET /api/auth/oidc/callback` ověří `state`, vymění autorizační kód
  a prostřednictvím JWKS vydavatele ověří podpis ID tokenu
  (`createRemoteJWKSet` z balíčku `jose`, ukládáno do mezipaměti podle URI JWKS)
  včetně kontrol `issuer`/`audience`. Přístup k ovládacímu panelu vyžaduje neprázdný
  seznam `oidcAllowedSubjects`, zásadu `oidcAdmissionClaim` nebo obojí. Seznam
  subjektů porovnává `sub` nebo `email`, ale pouze pokud platí
  `email_verified === true`. Volitelná zásada deklarace používá cestu k deklaraci
  ID tokenu oddělenou tečkami (například `realm_access.roles`) a pole povolených
  hodnot; nalezená deklarace musí být pole řetězců obsahující alespoň jednu
  povolenou hodnotu. Pokud jsou nakonfigurovány obě zásady, musí obě uspět.
  Chybějící nebo chybně vytvořené deklarace vedou k bezpečnému zamítnutí a bez
  kterékoli z těchto zásad callback přihlášení odmítne (`not_configured`).
  Stávající konfigurace založené pouze na subjektu zůstávají beze změny.
- Keycloak obvykle mapuje role sféry do přístupových tokenů, nikoli nutně do ID
  tokenů. Chcete-li vyžadovat roli sféry `admin`, nakonfigurujte pro tohoto klienta
  mapovač protokolu, který zahrne `realm_access.roles` do jeho **ID tokenu**, a poté
  nastavte `oidcAdmissionClaim` na `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Před povolením přístupu založeného pouze na roli zkontrolujte skutečnou deklaraci
  ID tokenu pro tohoto klienta; aplikace role z přístupového tokenu nečte.
  Odmítnutí tokenu na straně IdP může tuto kontrolu na straně aplikace doplnit,
  ale nenahrazuje ji.
- Při úspěchu vytvoří **naprosto stejný** 30denní JWT `auth_token`, jaký vydává
  přihlášení heslem (`src/app/api/auth/login/route.ts`), takže zbytek procesu
  relace ovládacího panelu (automatické obnovení, příznaky souboru cookie) zůstává
  beze změny — OIDC nahrazuje pouze způsob vytvoření souboru cookie, nikoli
  oprávnění, která uděluje. Změny rolí nebo skupin v IdP nezneplatní existující
  relace OmniRoute; jejich platnost nadále řídí odhlášení, změna hesla nebo
  vypršení relace.
- Každé nastavení `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) je zahrnuto v
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  odpoví `400 PASSWORD_REQUIRED`, pokud tělo neobsahuje heslo pro správu jako
  `currentPassword` (`401 PASSWORD_MISMATCH`, pokud je nesprávné).
  `oidcDisablePasswordLogin` zakáže _přihlášení_ heslem (`POST /api/auth/login`),
  ale zachová uložený hash hesla a opětovné ověření stále kontroluje
  `currentPassword` vůči tomuto hashi.
- `corsOrigins` a `bruteForceProtection` jsou také zahrnuty v
  `SECURITY_IMPACTING_SETTINGS_KEYS`: zmírnění kteréhokoli z nich oslabuje ochranu
  přihlášení, takže vyžadují stejné opětovné ověření pomocí `currentPassword`
  (karta Zabezpečení jej vyžádá) a import JSON je vynechá.
- Každý klíč zásad zabezpečení — položky `SECURITY_IMPACTING_SETTINGS_KEYS`,
  každý klíč `oidc*` a stav relace ovládacího panelu — je u
  `PATCH /api/settings` **určen pouze pro operátora**: klíč API s rozsahem pro
  správu nebo přístupový token `oma_` je odmítnut s kódem `403`, i když odešle
  správné `currentPassword`, a odmítnutí se zaznamená do auditu jako
  `settings.update_failed` s `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` v `src/lib/api/operatorCredential.ts`).
  Běžná nastavení (motiv vzhledu, předvolby zobrazení) může nadále zapisovat klíč
  `manage` nebo přístupový token `admin`. Každá změna samotného `/api/settings`
  (a také `/api/settings/require-login`) navíc vyžaduje rozsah přístupového tokenu
  `admin` (`ADMIN_MUTATION_EXACT_PATHS` v `src/server/authz/accessScopes.ts`,
  přesná shoda cesty); `GET` zůstává `read` a ostatní dílčí trasy
  `/api/settings/*` (proxy, výchozí hodnoty kombinací, aliasy modelů, komprese,
  promazávání…) si zachovávají rozsah `write` odvozený z metody.
- `POST /api/settings/import-json` toto opětovné ověření přeskakuje, a proto před
  zápisem odstraní každý klíč v `IMPORT_STRIPPED_SETTINGS_KEYS` (stejný soubor):
  heslo a `currentPassword`, všechny položky `SECURITY_IMPACTING_SETTINGS_KEYS`
  a stav relace ovládacího panelu (`sessionsValidAfter`,
  `revokedDashboardSessions`). Import starší zálohy proto nemůže obnovit relaci,
  kterou již ukončila změna hesla nebo odhlášení.

## Třídy tras

`src/server/authz/types.ts` definuje tři třídy; každá trasa, kterou nelze jednoznačně zařadit, spadá do `MANAGEMENT`.

| Třída        | Popis                                                                                                                                                   | Vyžadovaná autentizace                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PUBLIC`     | Explicitně bezpečné trasy — přihlášení, odhlášení, stav, inicializace, health, bootstrap onboardingu.                                                   | Žádná                                                                  |
| `CLIENT_API` | Koncové body pro obsluhu modelů — `/api/v1/*`, `/api/v1beta/*` a aliasy `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer klíč, pokud je zapnuta efektivní feature flag `REQUIRE_API_KEY` |
| `MANAGEMENT` | Stránky panelu, nastavení, poskytovatelé, klíče, administrátorské a diagnostické koncové body.                                                          | Relace panelu NEBO Bearer s rozsahem `manage`                          |

Několik akcí `MANAGEMENT` je **pouze pro operátora**: klíč `manage` nestačí. Export uložených pověření (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), obnovení zálohy přes živá data (`POST /api/db-backups/import` včetně `dryRun=true`, `POST /api/db-backups` obnovení podle id, `POST /api/settings/import-json`) a ničení bodů obnovy (úklid přes `DELETE /api/db-backups` a také `PATCH /api/db-backups`, protože uložená retence řídí automatické promazávání po každé záloze) vyžadují relaci panelu, lokální subjekt CLI nebo vypnuté přihlášení. Vydání tokenu synchronizace (`POST /api/sync/tokens`) a vytvoření přístupového tokenu CLI s rozsahem `admin` (`POST /api/cli/tokens`) vyžadují relaci panelu nebo lokální subjekt CLI ve všech režimech přihlášení. Klíče API libovolného rozsahu a přístupové tokeny `oma_` nejsou operátorská pověření: pokud je vyžadováno operátorské pověření, dostanou `403`. Kontrola je v `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Změna nastavení přihlášení je rovněž vyhrazena operátorovi: `POST /api/settings/require-login` (nastavení správcovského hesla / přepnutí `requireLogin`) přijme pouze tato pověření, jakmile heslo existuje — okno prvního spuštění (zatím bez hesla) zůstává beze změny — a relace panelu musí pro nahrazení hesla poslat `currentPassword` (`403`, pokud chybí nebo je špatné, audituje se jako `settings.update_failed`). Lokální CLI a instance s vypnutým přihlášením si zachovávají obnovovací cestu a mohou nastavit heslo bez něj, protože obě jsou vázány na hostitele, který vlastní datový adresář.

## Zpracovatelský řetězec

```
Příchozí požadavek → src/proxy.ts
  → runAuthzPipeline() v src/server/authz/pipeline.ts
    1. Odstranění důvěryhodných interních hlaviček (x-omniroute-auth-*, x-omniroute-route-class)
    2. Vygenerování ID požadavku a klasifikace trasy pomocí classifyRoute()
    3. Pokud pathname == "/" → přesměrování na /dashboard
    4. Pokud probíhá ukončování (graceful shutdown) a jde o /api/* → 503
    5. Pokud jde o jiný požadavek než GET na /api/* → kontrola checkBodySize()
    6. Pokud jde o OPTIONS → odpověď CORS preflight 204
    7. Pokud options.enforce == false → předání dál s hlavičkami třídy trasy
    8. Jinak: POLICIES[routeClass].evaluate(ctx)
       - allow  → nastavení x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → chyba JSON s correlation_id (stránky řídicího panelu → 302 /login)
```

Důvěryhodné interní hlavičky (definované v `src/server/authz/headers.ts`) jsou před klasifikací **odstraněny z příchozích požadavků** — klienti nemohou předem nastavit `x-omniroute-auth-*` a vydávat se tak za jiný subjekt.

### Kontrakty zásad

Každá třída tras má zásadu v `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — vždy vrací `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrahuje Bearer a ověřuje jej pomocí `validateApiKey()`. K anonymnímu přístupu přejde pouze tehdy, když je výsledný příznak funkce `REQUIRE_API_KEY` vypnutý. Výsledná hodnota příznaku se určuje prostřednictvím `isRequireApiKeyEnabled()` (`přepsání příznakem funkce v DB > process.env.REQUIRE_API_KEY > výchozí hodnota`), takže příznaky funkcí v řídicím panelu a proměnné prostředí řídí `/api/v1/*`, `/api/v1beta/*` a aliasy konzistentně; při selhání resolveru se přístup zamítne. Umožňuje požadavky s relací řídicího panelu na klientských trasách API (včetně `/api/v1/models`, kterou používá katalog modelů v řídicím panelu).
- **`managementPolicy`** (`policies/management.ts`) — přijímá relaci řídicího panelu nebo interní požadavky na synchronizaci modelů (porovnávané s `/api/providers/[name]/(sync-models|models)`), případně ověřování zcela přeskočí, pokud `isAuthRequired()` vrátí false. Pokud je token Bearer přítomen, ale není platný, vrátí 403 (`AUTH_001`), jinak vrátí 401. Před jakoukoli větví ověřování také vynucuje úrovně ochrany tras (LOCAL_ONLY / ALWAYS_PROTECTED) — viz [Úrovně ochrany tras](../security/ROUTE_GUARD_TIERS.md). Cesty LOCAL_ONLY v `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (aktuálně: `/api/mcp/`) mohou být přístupné z adres mimo loopback, pokud má klíč Bearer rozsah oprávnění `manage`; všechny ostatní cesty LOCAL_ONLY zůstávají omezené výhradně na loopback bez ohledu na rozsah oprávnění.

Úspěšná zásada vrací `AuthSubject` s `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Následné handlery jej mohou načíst pomocí `assertAuth(request, "CLIENT_API")` v `src/server/authz/assertAuth.ts`, aniž by znovu spouštěly logiku ověřování.

## Seznam veřejných tras

`src/shared/constants/publicApiRoutes.ts` je explicitní seznam povolených tras:

Seznam je rozdělen podle **tvaru** a toto rozdělení je zásadní (GHSA-74g9-q8f6-793h): prefix se porovnává pomocí `startsWith()`, takže odpovídá také každé sousední cestě se stejnými počátečními znaky. Prefix `/api/usage/om-usage` označil `/api/usage/om-usage<cokoli>` jako VEŘEJNÉ a Next tuto cestu přeloží na `/api/usage/[connectionId]` — obslužnou rutinu bez vlastního ověřování.

```ts
// Skutečné podstromy. Každá položka MUSÍ končit znakem „/“ (ověřeno jednotkovým testem).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // při klasifikaci se považuje za CLIENT_API, nikoli za veřejnou trasu bez ověřování
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Jednotlivé trasy porovnávané PŘESNĚ (s koncovým lomítkem nebo bez něj).
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

// Jednotlivé trasy pouze pro čtení, na které se vztahuje také zmírnění omezení původu CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Jednotlivá trasa pouze pro čtení BEZ zmírnění omezení CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Trasy pouze pro čtení jsou veřejné **jen** pro bezpečné metody. Poznámka: `classifyRoute()` vylučuje `/api/v1/*` a `/api/v1beta/*` z výchozího zařazení mezi PUBLIC — tyto trasy jsou vždy `CLIENT_API`, takže se na ně nadále vztahují zásady pro Bearer klíče.

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

## Přepínač vyžadování autentizace

`isAuthRequired()` v `src/shared/utils/apiAuth.ts` rozhoduje, zda se pro požadavek vynucuje **jakákoli** autentizace:

- `settings.requireLogin === false` → autentizace je globálně vypnuta, kromě trvale chráněné úrovně (viz [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) a volání, která vydávají pověření, jež tato konfigurace přijímá; ta vyžadují stejné pověření jako při zapnutém přihlášení: vydávání tokenů synchronizace, vytváření přístupových tokenů CLI v libovolném rozsahu a vytváření klíče API s rozsahem `manage`/`admin`, udělování tohoto rozsahu klíči, regenerace nebo zobrazení takového klíče (`requireCredentialForManagementScopedKey()` v `src/lib/api/requireManagementAuth.ts`). Klíče určené pouze pro inferenci zůstávají otevřené.
- Není nastaveno žádné heslo **a** není nastavena proměnná prostředí `INITIAL_PASSWORD` → bootstrap režim povolí průvodce nastavením a požadavky z loopbacku, ale požadavky ze sítě stále vyžadují pověření.
- Jakákoli chyba databáze → selhání uzavřené (secure-by-default).

Vynucení klientského API klíče používá `isRequireApiKeyEnabled()` v `src/shared/utils/featureFlags.ts`, nikoli přímé čtení `process.env.REQUIRE_API_KEY`. To je důležité pro nasazené instance: přepnutí `REQUIRE_API_KEY` v Dashboard → Feature Flags uloží přepsání do databáze a okamžitě ovlivní `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` a další kontroly autentizace klientského API, které sdílejí tento pomocník. Pokud nelze přečíst úložiště feature flagů, autentizace klientského API selže uzavřeně a vyžaduje klíč.

## Zásadní změna — v3.8.0

Koncové body `/api/v1/agents/tasks/*` a `/api/resilience/model-cooldowns` **nyní vyžadují ověření pro správu** (commit `588a0333`). Klienti, kteří dříve odesílali běžný klíč API bez rozsahu oprávnění `manage`, obdrží `403`. Migrace: buď klíči přidělte rozsah oprávnění `manage` na panelu API Keys, nebo použijte přihlášenou relaci panelu.

## Změna chování — v3.8.2

`/api/mcp/*` (vzdálený server MCP) je ve výchozím nastavení stále LOCAL_ONLY, ale nyní přijímá požadavky mimo zpětnou smyčku, pokud hlavička `Authorization: Bearer <api-key>` obsahuje rozsah oprávnění `manage`. Tato výjimka je explicitně povolována pro jednotlivé cesty prostřednictvím `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` v `src/server/authz/routeGuard.ts`; související prefix LOCAL_ONLY `/api/cli-tools/runtime/*` záměrně nelze obejít, protože může spouštět libovolné podprocesy. Anonymní požadavky na `/api/mcp/*` mimo zpětnou smyčku nadále vracejí `403 LOCAL_ONLY` — výchozí nastavení pro každou novou cestu LOCAL_ONLY nadále striktně vyžaduje zpětnou smyčku. Viz [Úrovně ochrany tras](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testování

- Jednotkové testy: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Veřejný seznam povolených položek: `tests/unit/public-api-routes.test.ts`.
- Spuštění vybraného testu: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Ladění

Pipeline vždy opatří odpovědi následujícími hlavičkami:

```
x-request-id:               <korelační id, zopakované v těle chyby>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

U ověřených požadavků obsahují hlavičky požadavku upstreamu (na straně obslužné rutiny) také:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<poslední 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (volitelné)
x-omniroute-auth-scopes:    seznam oddělený čárkami
```

Uvnitř obslužných rutin používejte `assertAuth(req, expectedClass)` — pokud byl middleware obejit, vyvolá výjimku `AuthzAssertionError` s kódem `AUTHZ_NOT_INITIALIZED` (užitečné pro odhalování regresí konfigurace v testech).

## Viz také

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — označení autentizace pro každý koncový bod
- [COMPLIANCE.md](../security/COMPLIANCE.md) — protokol auditu událostí autentizace
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tři jmenné prostory rozsahů a katalog rozsahů nástrojů MCP
- Zdroj: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
