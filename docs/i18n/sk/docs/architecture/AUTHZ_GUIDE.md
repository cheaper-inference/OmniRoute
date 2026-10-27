# Authorization Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Zdroj pravdy:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Posledná aktualizácia:** 2026-09-22 — menné priestory rozsahu ukazujú na MCP-SERVER.md

OmniRoute má autorizačný pipeline, ktorý je citlivý na trasy a stráži každú požiadavku API. Klasifikácia je **deterministická** a **fail-closed** — čokoľvek, čo nemožno klasifikovať, skončí ako `MANAGEMENT` a vyžaduje reláciu alebo token s úrovňou riadenia. Táto stránka vysvetľuje model pre inžinierov, ktorí udržiavajú trasy alebo navrhujú nové koncové body.

![AuthZ pipeline (3 triedy trás + vyhodnotenie politiky)](../diagrams/exported/authz-pipeline.svg)

> Zdroj: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva režimy autentifikácie

### 1. Kľúč API (Bearer)

Používa sa pre klientske API kompatibilné s OpenAI/Anthropic/Gemini a niekoľko trás správy, keď má kľúč rozsah `manage`.

```
Authorization: Bearer <api-key>
```

Overuje sa pomocou `isValidApiKey()` / `extractApiKey()` v `src/sse/services/auth.ts` a opätovne sa exportuje cez `src/shared/utils/apiAuth.ts`. Validátor tiež akceptuje premenné prostredia `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ako trvalé kľúče na priame odovzdanie (problém č. 1350).

### 2. Relácia ovládacieho panela (súbor cookie auth_token)

Pre stránky ovládacieho panela a operácie správcu.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Súbor cookie predstavuje reláciu iba vtedy, keď je JWT overený **a** obsahuje `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Každý
spotrebiteľ súboru cookie (ochrana trasy ovládacieho panela (`isDashboardSessionAuthenticated()`), obnovenie autorizačného kanála, nadviazanie spojenia WebSocket, živý
server, `/api/settings/require-login`, `/api/auth/status`) používa túto pomocnú funkciu.
Existujú aj iné JWT podpísané pomocou `JWT_SECRET` — priame odovzdanie cez Cursor CLI vytvára
pre držiteľov kľúčov tokeny `iss "omniroute" / aud "cursor-cli"` — a tie nikdy nepredstavujú relácie
(č. 13298).

Overuje sa pomocou `isDashboardSessionAuthenticated()` v `src/shared/utils/apiAuth.ts`. Kanál automaticky obnoví JWT, keď do konca jeho 30-dňovej platnosti zostáva menej ako 7 dní.

Relácia sa môže skončiť aj pred uplynutím 30 dní, pretože každé vytvorenie tokenu prechádza cez `mintDashboardSessionToken` (čas vydania `iat` a identifikátor `jti`) a overovateľ kontroluje dve nastavenia: `sessionsValidAfter`, ktoré sa nastaví pri zmene hesla, takže sa prestanú overovať všetky relácie vydané pred touto zmenou (prehliadač, v ktorom bolo heslo zmenené, dostane nový súbor cookie), a `revokedDashboardSessions`, do ktorého `POST /api/auth/logout` pridá `jti` odhlásenej relácie. Relácie vytvorené staršou verziou neobsahujú ani jeden z týchto nárokov a zostanú platné až do prvej zmeny hesla. Ak nastavenia nemožno načítať, relácia sa nepovažuje za dôveryhodnú.

Niektoré trasy správy akceptujú **ktorýkoľvek** režim: súbor cookie ALEBO `Bearer <key>`, keď má kľúč API rozsah `manage` (alebo `admin`). To umožňuje pracovný postup „konfigurovateľné prostredníctvom volaní API“, ktorý bol pridaný vo verzii v3.8.

#### Voliteľná prihlasovacia brána OIDC (č. 6973)

Prihlásenie správcu do ovládacieho panela podporuje popri predvolenom prihlasovaní heslom aj **voliteľný** postup OIDC (OpenID Connect) — prihlasovanie heslom sa nikdy neodstráni, iba
doplní:

- Zakázané, pokiaľ `settings.oidcEnabled === true` **a zároveň** nie sú nakonfigurované
  všetky položky `oidcIssuer` / `oidcClientId` / `oidcClientSecret` (Nastavenia → Overovanie).
  V opačnom prípade `GET /api/auth/oidc/login` vráti `400`.
- `GET /api/auth/oidc/login` zistí `authorization_endpoint` z konfigurácie
  vydavateľa `/.well-known/openid-configuration` (ako náhradné riešenie použije
  `<issuer>/authorize`), zostaví URI presmerovania z prichádzajúcej požiadavky
  (s podporou `x-forwarded-proto`) a presmeruje na IdP s náhodným parametrom `state`
  uloženým v súbore cookie `oidc_state` s príznakom `httpOnly`.
- `GET /api/auth/oidc/callback` overí `state`, vymení autorizačný
  kód a overí podpis ID tokenu prostredníctvom JWKS vydavateľa
  (`createRemoteJWKSet` z balíka `jose`, ukladané do vyrovnávacej pamäte podľa URI JWKS)
  s kontrolami `issuer`/`audience`. Prístup k ovládaciemu panelu vyžaduje neprázdny
  zoznam `oidcAllowedSubjects`, politiku `oidcAdmissionClaim` alebo oboje. Zoznam
  subjektov porovnáva `sub` alebo `email`, pričom `email` iba vtedy, keď
  `email_verified === true`. Voliteľná politika deklarácie používa cestu
  k deklarácii ID tokenu oddelenú bodkami (napríklad `realm_access.roles`) a
  pole akceptovaných hodnôt; výsledná deklarácia musí byť poľom reťazcov
  obsahujúcim aspoň jednu akceptovanú hodnotu. Ak sú nakonfigurované obe
  politiky, obe musia uspieť. Chýbajúce alebo nesprávne deklarácie vedú
  k bezpečnému odmietnutiu a bez ktorejkoľvek z politík spätné volanie odmietne
  prihlásenie (`not_configured`). Existujúce konfigurácie založené iba na
  subjekte naďalej fungujú bez zmeny.
- Keycloak zvyčajne mapuje roly realm do prístupových tokenov, nie nevyhnutne
  do ID tokenov. Ak chcete vyžadovať rolu realm `admin`, nakonfigurujte pre
  tohto klienta mapovač protokolu, ktorý zahrnie `realm_access.roles` do jeho
  **ID tokenu**, a potom nastavte `oidcAdmissionClaim` na
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Pred povolením prístupu založeného iba na role skontrolujte skutočnú deklaráciu
  ID tokenu pre tohto klienta; aplikácia nečíta roly z prístupového tokenu.
  Odmietnutie tokenu na strane IdP môže túto kontrolu na strane aplikácie doplniť,
  ale nenahrádza ju.
- Pri úspechu vytvorí **presne rovnaký** JWT `auth_token` s platnosťou 30 dní,
  aký vydáva prihlásenie heslom (`src/app/api/auth/login/route.ts`), takže zvyšok
  mechanizmu relácie ovládacieho panela (automatické obnovovanie, príznaky súborov
  cookie) zostáva nezmenený — OIDC nahrádza iba spôsob vytvorenia súboru cookie,
  nie oprávnenia, ktoré udeľuje. Zmeny rolí alebo skupín v IdP nezneplatnia
  existujúce relácie OmniRoute; ich životnosť naďalej riadi odhlásenie, zmena
  hesla alebo uplynutie platnosti relácie.
- Každé nastavenie `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) sa nachádza v
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  odpovie `400 PASSWORD_REQUIRED`, pokiaľ telo neobsahuje správcovské
  heslo ako `currentPassword` (`401 PASSWORD_MISMATCH`, ak je nesprávne).
  `oidcDisablePasswordLogin` odmietne _prihlásenie_ heslom (`POST /api/auth/login`),
  ale zachová uložený haš hesla a opätovné overenie naďalej kontroluje
  `currentPassword` voči tomuto hašu.
- `corsOrigins` a `bruteForceProtection` sa tiež nachádzajú v
  `SECURITY_IMPACTING_SETTINGS_KEYS`: zmiernenie ktoréhokoľvek z nich oslabuje
  ochranu prihlásenia, preto vyžadujú rovnaké opätovné overenie pomocou
  `currentPassword` (karta Zabezpečenie si ho vyžiada) a import JSON ich vynechá.
- Každý kľúč bezpečnostnej politiky — položky `SECURITY_IMPACTING_SETTINGS_KEYS`,
  každý kľúč `oidc*` a stav relácie ovládacieho panela — je pri
  `PATCH /api/settings` dostupný **iba operátorovi**: kľúč API s rozsahom `manage`
  alebo prístupový token `oma_` je odmietnutý s kódom `403`, aj keď odošle správne
  `currentPassword`, a odmietnutie sa zaznamená do auditu ako
  `settings.update_failed` s `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` v `src/lib/api/operatorCredential.ts`).
  Bežné nastavenia (téma, predvoľby zobrazenia) zostávajú zapisovateľné pomocou
  kľúča s rozsahom `manage` alebo prístupového tokenu `admin`. Každá zmena
  samotnej cesty `/api/settings` (a tiež `/api/settings/require-login`) vyžaduje
  aj rozsah prístupového tokenu `admin` (`ADMIN_MUTATION_EXACT_PATHS` v
  `src/server/authz/accessScopes.ts`, presná zhoda cesty); `GET` zostáva v rozsahu
  `read` a ostatné podradené trasy `/api/settings/*` (proxy, predvolené kombinácie,
  aliasy modelov, kompresia, vymazania…) si zachovávajú rozsah `write` odvodený
  od metódy.
- `POST /api/settings/import-json` preskočí toto opätovné overenie, preto pred
  zápisom odstráni každý kľúč v `IMPORT_STRIPPED_SETTINGS_KEYS` (rovnaký súbor):
  heslo a `currentPassword`, každú položku `SECURITY_IMPACTING_SETTINGS_KEYS`
  a stav relácie ovládacieho panela (`sessionsValidAfter`, `revokedDashboardSessions`).
  Import staršej zálohy preto nemôže obnoviť reláciu, ktorú už ukončila zmena
  hesla alebo odhlásenie.

## Triedy trás

`src/server/authz/types.ts` definuje tri triedy; každá trasa, ktorú nie je možné deterministicky zaradiť, spadá pod `MANAGEMENT`.

| Trieda       | Popis                                                                                                                                                | Vyžadovaná autentifikácia                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `PUBLIC`     | Explicitne bezpečné trasy — prihlásenie, odhlásenie, stav, inicializácia, health, bootstrap onboardingu.                                             | Žiadna                                                               |
| `CLIENT_API` | Koncové body obsluhy modelov — `/api/v1/*`, `/api/v1beta/*` a aliasy `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer kľúč, keď je zapnutá efektívna feature flag `REQUIRE_API_KEY` |
| `MANAGEMENT` | Stránky panela, nastavenia, poskytovatelia, kľúče, administratívne a diagnostické koncové body.                                                      | Relácia panela ALEBO Bearer s rozsahom `manage`                      |

Niekoľko akcií `MANAGEMENT` je **iba pre operátora**: kľúč `manage` nestačí. Export uložených poverení (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), obnovenie zálohy nad živými dátami (`POST /api/db-backups/import` vrátane `dryRun=true`, `POST /api/db-backups` obnovenie podľa id, `POST /api/settings/import-json`) a ničenie bodov obnovy (upratanie cez `DELETE /api/db-backups` a tiež `PATCH /api/db-backups`, pretože uložená retencia riadi automatické mazanie po každej záložke) vyžadujú reláciu panela, lokálny subjekt CLI alebo vypnuté prihlásenie. Vydanie synchronizačného tokenu (`POST /api/sync/tokens`) a vytvorenie prístupového tokenu CLI s rozsahom `admin` (`POST /api/cli/tokens`) vyžadujú reláciu panela alebo lokálny subjekt CLI vo všetkých režimoch prihlásenia. Kľúče API ľubovoľného rozsahu a prístupové tokeny `oma_` nie sú operátorské poverenia: keď je operátorské poverenie vyžadované, dostanú `403`. Kontrola sa nachádza v `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Zmena nastavení prihlásenia je tiež vyhradená pre operátora: `POST /api/settings/require-login` (nastavenie správcovského hesla / prepnutie `requireLogin`) prijme iba tieto poverenia, akonáhle heslo existuje — okno prvého spustenia (zatiaľ bez hesla) zostáva nezmenené — a relácia panela musí na nahradenie hesla poslať `currentPassword` (`403`, ak chýba alebo je zlé, audituje sa ako `settings.update_failed`). Lokálne CLI a inštancia s vypnutým prihlásením si zachovávajú obnovovaciu cestu a môžu nastaviť heslo bez neho, pretože obe sú viazané na hostiteľa, ktorý vlastní dátový adresár.

## Reťazec spracovania

```
Prichádzajúca požiadavka → src/proxy.ts
  → runAuthzPipeline() v src/server/authz/pipeline.ts
    1. Odstrániť dôveryhodné interné hlavičky (x-omniroute-auth-*, x-omniroute-route-class)
    2. Vygenerovať ID požiadavky, klasifikovať trasu pomocou classifyRoute()
    3. Ak pathname == "/" → presmerovať na /dashboard
    4. Ak prebieha ukončovanie (riadne vypnutie) a /api/* → 503
    5. Ak ide o inú metódu než GET pre /api/* → použiť kontrolu checkBodySize()
    6. Ak OPTIONS → predbežná požiadavka CORS 204
    7. Ak options.enforce == false → prepustiť ďalej s hlavičkami triedy trasy
    8. Inak: POLICIES[routeClass].evaluate(ctx)
       - povoliť   → nastaviť x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - zamietnuť → chyba JSON s correlation_id (stránky ovládacieho panela → 302 /login)
```

Dôveryhodné interné hlavičky (definované v `src/server/authz/headers.ts`) sa pred klasifikáciou **odstránia z prichádzajúcich požiadaviek** — klienti nemôžu vopred nastaviť `x-omniroute-auth-*` a vydávať sa za iný subjekt.

### Kontrakty politík

Každá trieda trasy má svoju politiku v `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — vždy vráti `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrahuje Bearer a overí ho pomocou `validateApiKey()`. Na anonymný prístup prejde iba vtedy, keď je efektívny príznak funkcie `REQUIRE_API_KEY` vypnutý. Efektívny príznak sa vyhodnotí pomocou `isRequireApiKeyEnabled()` (`prepísanie príznakom funkcie z DB > process.env.REQUIRE_API_KEY > predvolená hodnota`), takže príznaky funkcií ovládacieho panela a premenné prostredia konzistentne riadia `/api/v1/*`, `/api/v1beta/*` a aliasy; zlyhania vyhodnotenia vedú k zamietnutiu prístupu. Povoľuje požiadavky s reláciou ovládacieho panela na trasách klientskeho API (vrátane `/api/v1/models`, ktorú používa katalóg modelov ovládacieho panela).
- **`managementPolicy`** (`policies/management.ts`) — akceptuje reláciu ovládacieho panela, interné požiadavky na synchronizáciu modelov (zodpovedajúce `/api/providers/[name]/(sync-models|models)`) alebo sa úplne preskočí, ak `isAuthRequired()` vráti false. Vráti 403 (`AUTH_001`), keď je prítomný, ale neplatný token Bearer, inak 401. Pred každou vetvou overovania tiež vynucuje úrovne ochrany trás (LOCAL_ONLY / ALWAYS_PROTECTED) — pozrite si [Úrovne ochrany trás](../security/ROUTE_GUARD_TIERS.md). K trasám LOCAL_ONLY uvedeným v `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (aktuálne: `/api/mcp/`) možno pristupovať aj mimo spätnej slučky, ak má kľúč Bearer rozsah `manage`; všetky ostatné trasy LOCAL_ONLY zostávajú striktne obmedzené na spätnú slučku bez ohľadu na rozsah.

Úspešná politika vráti `AuthSubject` s `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Následné obslužné rutiny ho môžu načítať pomocou `assertAuth(request, "CLIENT_API")` v `src/server/authz/assertAuth.ts` namiesto opätovného vykonávania logiky overovania.

## Zoznam verejných trás

`src/shared/constants/publicApiRoutes.ts` je explicitný zoznam povolených trás:

Zoznam je rozdelený podľa **tvaru** a toto rozdelenie je kritické (GHSA-74g9-q8f6-793h): prefix sa
porovnáva pomocou `startsWith()`, takže zodpovedá aj každej susednej ceste, ktorá má rovnaké úvodné znaky.
Prefix `/api/usage/om-usage` označil `/api/usage/om-usage<anything>` ako VEREJNÚ trasu a Next ju vyhodnotí
ako `/api/usage/[connectionId]` — handler bez vlastnej autentifikácie.

```ts
// Skutočné podstromy. Každá položka sa MUSÍ končiť znakom „/“ (overuje sa jednotkovým testom).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // pri klasifikácii sa považuje za CLIENT_API, nie za verejnú trasu „bez autentifikácie“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Samostatné trasy porovnávané PRESNE (s koncovou lomkou alebo bez nej).
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

// Samostatné trasy iba na čítanie, na ktoré sa vzťahuje aj zmiernenie obmedzenia pôvodu CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Samostatná trasa iba na čítanie BEZ zmiernenia obmedzenia CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Trasy iba na čítanie sú verejné **len** pre bezpečné metódy. Poznámka: `classifyRoute()` vylučuje `/api/v1/*` a `/api/v1beta/*` zo záložnej klasifikácie PUBLIC — vždy ide o `CLIENT_API`, takže pravidlá pre kľúč Bearer sa naďalej uplatňujú.

## Pridanie novej trasy

### Vzor 1 — Verejný koncový bod klientskeho API (autentifikácia Bearer)

Trasy pod `/api/v1/` a `/api/v1beta/` sa automaticky klasifikujú ako `CLIENT_API`. Middleware vynucuje kontrolu Bearer; handlery trás ju nemusia opakovať, ale v prípade potreby môžu načítať subjekt.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika handlera
}
```

### Vzor 2 — Koncový bod správy (relácia alebo Bearer + manage)

Použite `requireManagementAuth()` zo súboru `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika handlera
}
```

`requireManagementAuth()` pri úspechu vráti `null`, inak vráti chybovú odpoveď `Response` vo formáte JSON:

- 401 `AUTH_001` „Vyžaduje sa autentifikácia“ — neboli poskytnuté žiadne prihlasovacie údaje
- 403 — neplatný Bearer **alebo** Bearer je prítomný, ale kľúč nemá rozsah `manage` / `admin`

`hasManageScope(scopes)` vráti hodnotu true pre `"manage"` alebo `"admin"`.

### Vzor 3 — Pridanie do verejného zoznamu povolených trás

Vyberte množinu podľa tvaru, nie podľa pohodlnosti. Jedna trasa patrí do `PUBLIC_API_ROUTES_EXACT` (alebo do `PUBLIC_READONLY_CORS_API_ROUTES`, ak je určená iba pre GET); do `PUBLIC_API_ROUTE_PREFIXES` patrí iba skutočný podstrom a položka sa **musí končiť znakom `/`**. Umiestnenie jednej trasy do zoznamu prefixov zároveň zverejní každú susednú cestu, ktorá má rovnaké úvodné znaky — vrátane súrodeneckých trás s dynamickými segmentmi pridaných neskôr (GHSA-74g9-q8f6-793h). Aktualizujte jednotkové testy v súboroch `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` a `tests/unit/authz/classify.test.ts`.

## Rozsahy (Scopes)

Tri menné priestory. Každý kontrolór číta len svoje vlastné reťazce. Porovnanie
vedľa seba, vrátane toho, prečo `manage` zlyháva `scopeMatches` pre `read:compression` a prečo
prístupový token `read` nemôže `PATCH /api/keys/{id}`, je
[Tri menné priestory rozsahov](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API kľúče obsahujú pole `scopes` (uložené ako JSON v `api_keys.scopes`, pozri `src/lib/db/apiKeys.ts`).

### Rozsah správy

- `manage` / `admin` — `hasManageScope`. Prístup nositeľa k trasám API správy.
- `mcp:connect`, `self:usage`, `self:account-quota` a
  `policy:bypass-provider-quota` sú aditívne rozsahy s presnou zhodou. Sú mimo
  `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` otvára iba
  `/api/mcp/` výnimku pre non-loopback.

### Nástrojové rozsahy MCP

Katalóg a pravidlá zhody (identický reťazec, alebo udelený rozsah končiaci na `*`):
[Nástrojové rozsahy MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` v `src/shared/constants/mcpScopes.ts` je pôvodná typovaná
podmnožina, nie celý katalóg. Vynucovanie prebieha v
`open-sse/mcp-server/scopeEnforcement.ts` po tom, čo `resolveCallerScopeContext()`
vyrieši rozsahy z autentifikačných informácií MCP, metadát požiadavky alebo `OMNIROUTE_MCP_SCOPES`.
Zostáva vypnuté, pokiaľ `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Rozsahy prístupových tokenov

`read` / `write` / `admin` na tokenoch `oma_live_…`, zoradené podľa `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Toto poradie sa vzťahuje iba na poverenia prístupového tokenu.
Pozri [Autentifikácia správy](../guides/MANAGEMENT-AUTH.md).

## Prepínač vyžadovania autentifikácie

`isAuthRequired()` v `src/shared/utils/apiAuth.ts` rozhoduje, či sa pre požiadavku vynucuje **akákoľvek** autentifikácia:

- `settings.requireLogin === false` → autentifikácia je globálne vypnutá, okrem trvalo chránenej úrovne (pozri [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) a volaní, ktoré vydávajú poverenie, ktoré táto konfigurácia akceptuje; tie vyžadujú rovnaké poverenie ako pri zapnutom prihlásení: vydávanie synchronizačných tokenov, vytváranie prístupových tokenov CLI v ľubovoľnom rozsahu a vytváranie kľúča API s rozsahom `manage`/`admin`, udeľovanie tohto rozsahu kľúču, regenerácia alebo zobrazenie takého kľúča (`requireCredentialForManagementScopedKey()` v `src/lib/api/requireManagementAuth.ts`). Kľúče určené iba na inferenciu zostávajú otvorené.
- Nie je nastavené žiadne heslo **a** nie je nastavená premenná prostredia `INITIAL_PASSWORD` → bootstrap režim povolí sprievodcu nastavením a požiadavky z loopbacku, ale požiadavky zo siete stále vyžadujú poverenia.
- Akákoľvek chyba databázy → zlyhanie uzavreté (secure-by-default).

Vynucovanie kľúča klientskeho API používa `isRequireApiKeyEnabled()` v `src/shared/utils/featureFlags.ts`, nie priame čítanie `process.env.REQUIRE_API_KEY`. Pre nasadené inštancie to má význam: prepnutie `REQUIRE_API_KEY` v Dashboard → Feature Flags uloží prepísanie do databázy a okamžite ovplyvní `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` a ďalšie kontroly autentizácie klientského API, ktoré zdieľajú tohto pomocníka. Ak sa úložisko feature flagov nedá prečítať, autentizácia klientského API zlyhá uzavreto a vyžaduje kľúč.

## Nekompatibilná zmena — v3.8.0

Koncové body `/api/v1/agents/tasks/*` a `/api/resilience/model-cooldowns` **teraz vyžadujú autentifikáciu správy** (commit `588a0333`). Klienti, ktorí predtým odosielali bežný kľúč API bez rozsahu `manage`, dostanú odpoveď `403`. Migrácia: buď priraďte kľúču rozsah `manage` v ovládacom paneli API Keys, alebo použite prihlásenú reláciu ovládacieho panela.

## Zmena správania — v3.8.2

`/api/mcp/*` (vzdialený server MCP) je naďalej predvolene LOCAL_ONLY, ale teraz prijíma požiadavky, ktoré nepochádzajú zo spätnej slučky, ak hlavička `Authorization: Bearer <api-key>` obsahuje rozsah `manage`. Táto výnimka je explicitne riadená pre jednotlivé cesty prostredníctvom `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` v `src/server/authz/routeGuard.ts`; súvisiacu predponu LOCAL_ONLY `/api/cli-tools/runtime/*` zámerne nemožno obísť, pretože môže spúšťať ľubovoľné podprocesy. Anonymné požiadavky na `/api/mcp/*`, ktoré nepochádzajú zo spätnej slučky, naďalej vracajú `403 LOCAL_ONLY` — predvolené správanie pre každú novú cestu LOCAL_ONLY naďalej striktne povoľuje iba spätnú slučku. Pozrite si [Úrovne stráženia trás](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testovanie

- Jednotkové testy: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Verejný zoznam povolených položiek: `tests/unit/public-api-routes.test.ts`.
- Cielené spustenie: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Ladenie

Pipeline vždy označí odpovede pomocou:

```
x-request-id:               <korelačné ID, zopakované v telách chýb>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pri autentifikovaných požiadavkách hlavičky požiadavky odoslanej upstreamu (na strane obslužného programu) obsahujú aj:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<posledné-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (voliteľné)
x-omniroute-auth-scopes:    zoznam oddelený čiarkami
```

V obslužných programoch použite `assertAuth(req, expectedClass)` — ak bol middleware obídený, vyvolá `AuthzAssertionError` s kódom `AUTHZ_NOT_INITIALIZED` (užitočné na zachytenie regresií konfigurácie v testoch).

## Pozri tiež

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — značka overenia pre koncový bod
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auditný záznam pre udalosti overenia
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — tri menné priestory rozsahu a katalóg rozsahu nástrojov MCP
- Zdroj: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
