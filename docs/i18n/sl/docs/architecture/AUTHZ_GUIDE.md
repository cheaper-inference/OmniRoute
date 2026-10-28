# Authorization Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Vir resnice:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Zadnja posodobitev:** 2026-09-22 — imenski prostori obsega kažejo na MCP-SERVER.md

OmniRoute ima cevovod za avtorizacijo, ki je odvisen od poti in varuje vsako zahtevo API-ja. Klasifikacija je **determinirana** in **zapira ob napaki** — vse, kar ni mogoče klasificirati, se konča kot `MANAGEMENT` in zahteva sejo ali žeton za upravljanje. Ta stran pojasnjuje model za inženirje, ki vzdržujejo poti ali načrtujejo nove končne točke.

![Cevovod AuthZ (3 razredi poti + vrednotenje pravilnika)](../diagrams/exported/authz-pipeline.svg)

> Vir: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dva načina preverjanja pristnosti

### 1. Ključ API (Bearer)

Uporablja se za odjemalske API-je, združljive z OpenAI/Anthropic/Gemini, in nekaj upravljavskih poti, kadar ima ključ obseg `manage`.

```
Authorization: Bearer <api-key>
```

Preverjanje izvajata `isValidApiKey()` / `extractApiKey()` v `src/sse/services/auth.ts`, funkciji pa sta znova izvoženi prek `src/shared/utils/apiAuth.ts`. Preverjevalnik sprejema tudi okoljski spremenljivki `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kot trajna ključa za neposredno posredovanje (težava #1350).

### 2. Seja nadzorne plošče (piškotek auth_token)

Za strani nadzorne plošče in skrbniške postopke.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Piškotek predstavlja sejo samo, če je JWT uspešno preverjen **in** vsebuje `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Vsak
porabnik piškotka (varovalo poti nadzorne plošče (`isDashboardSessionAuthenticated()`), osveževanje cevovoda za avtorizacijo, rokovanje WebSocket, strežnik v živo, `/api/settings/require-login`, `/api/auth/status`) uporablja to pomožno funkcijo.
Obstajajo tudi drugi JWT-ji, podpisani z `JWT_SECRET` — neposredno posredovanje Cursor CLI za imetnike ključev izdaja
žetone z `iss "omniroute" / aud "cursor-cli"` — ki nikoli ne predstavljajo sej
(#13298).

Preverjanje izvaja `isDashboardSessionAuthenticated()` v `src/shared/utils/apiAuth.ts`. Cevovod samodejno osveži JWT, ko je do konca njegove 30-dnevne življenjske dobe manj kot 7 dni.

Seja se lahko konča tudi pred iztekom 30 dni, saj vsak izdajatelj uporablja `mintDashboardSessionToken` (čas izdaje `iat` in identifikator `jti`), preverjevalnik pa preveri dve nastavitvi: `sessionsValidAfter`, ki se nastavi ob spremembi gesla, tako da vse seje, izdane pred tem časom, niso več uspešno preverjene (brskalnik, v katerem je bilo geslo spremenjeno, prejme nov piškotek), in `revokedDashboardSessions`, kamor `POST /api/auth/logout` doda `jti` odjavljene seje. Seje, ki jih je izdala starejša različica, ne vsebujejo nobene od teh trditev in ostanejo veljavne do prve spremembe gesla. Če nastavitev ni mogoče prebrati, se seja ne šteje za zaupanja vredno.

Nekatere upravljavske poti sprejemajo **katerega koli** od obeh načinov: piškotek ALI `Bearer <key>`, kadar ima ključ API obseg `manage` (ali `admin`). To omogoča potek dela »nastavljivo prek klicev API«, dodan v v3.8.

#### Izbirna prijavna pregrada OIDC (#6973)

Skrbniška prijava v nadzorno ploščo poleg privzete prijave z geslom podpira tudi **izbirni** postopek OIDC (OpenID Connect) — prijava z geslom ni nikoli odstranjena, temveč le
dopolnjena:

- Onemogočeno, razen če velja `settings.oidcEnabled === true` **in** so konfigurirani
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` (Nastavitve → Avtentikacija).
  V nasprotnem primeru `GET /api/auth/oidc/login` vrne `400`.
- `GET /api/auth/oidc/login` odkrije `authorization_endpoint` iz izdajateljevega
  `/.well-known/openid-configuration` (če to ne uspe, uporabi
  `<issuer>/authorize`), iz dohodne zahteve sestavi URI za preusmeritev
  (ob upoštevanju `x-forwarded-proto`) in preusmeri k ponudniku IdP z naključnim
  `state`, shranjenim v piškotku `oidc_state` z oznako `httpOnly`.
- `GET /api/auth/oidc/callback` preveri `state`, zamenja avtorizacijsko kodo in
  preveri podpis žetona ID prek izdajateljevega JWKS
  (`createRemoteJWKSet` iz `jose`, predpomnjeno za vsak URI JWKS) s preverjanjem
  `issuer`/`audience`. Dostop do nadzorne plošče zahteva neprazen seznam
  `oidcAllowedSubjects`, pravilnik `oidcAdmissionClaim` ali oboje. Seznam subjektov
  se ujema s `sub` ali `email` samo, kadar velja `email_verified === true`.
  Izbirni pravilnik zahtevka uporablja pot do zahtevka žetona ID, ločeno s pikami
  (na primer `realm_access.roles`), in tabelo sprejetih vrednosti; razrešeni
  zahtevek mora biti tabela nizov, ki vsebuje vsaj eno sprejeto vrednost. Če sta
  konfigurirana oba pravilnika, morata biti izpolnjena oba. Manjkajoči ali
  nepravilno oblikovani zahtevki povzročijo zavrnitev, brez enega ali drugega
  pravilnika pa povratni klic zavrne prijavo (`not_configured`). Obstoječe
  konfiguracije, ki temeljijo samo na subjektu, še naprej delujejo nespremenjeno.
- Keycloak vloge področja običajno preslika v dostopne žetone, ne pa nujno tudi
  v žetone ID. Če želite zahtevati vlogo področja `admin`, za tega odjemalca
  konfigurirajte preslikovalnik protokola, ki v njegov **žeton ID** vključi
  `realm_access.roles`, nato pa nastavite `oidcAdmissionClaim` na
  `{ "path": "realm_access.roles", "values": ["admin"] }`. Preden omogočite
  dostop samo na podlagi vlog, preverite dejanski zahtevek žetona ID za tega
  odjemalca; aplikacija ne bere vlog iz dostopnega žetona. Zavrnitev žetona na
  strani IdP lahko dopolni, vendar ne nadomesti tega preverjanja na strani
  aplikacije.
- Ob uspehu ustvari **popolnoma enak** 30-dnevni JWT `auth_token`, kot ga izda
  prijava z geslom (`src/app/api/auth/login/route.ts`), zato preostali postopek
  seje nadzorne plošče (samodejno osveževanje, zastavice piškotkov) ostane
  nespremenjen — OIDC nadomesti samo način ustvarjanja piškotka, ne pa tega, kaj
  ta omogoča. Spremembe vlog/skupin ponudnika IdP ne razveljavijo obstoječih sej
  OmniRoute; njihovo življenjsko dobo še vedno določajo odjava, menjava gesla
  ali potek seje.
- Vsaka nastavitev `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) je vključena v
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  odgovori z `400 PASSWORD_REQUIRED`, razen če telo vsebuje skrbniško geslo kot
  `currentPassword` (`401 PASSWORD_MISMATCH`, kadar je napačno).
  `oidcDisablePasswordLogin` zavrne _prijavo_ z geslom (`POST /api/auth/login`),
  vendar ohrani shranjeno zgoščeno vrednost gesla, ponovna avtentikacija pa še
  vedno preveri `currentPassword` glede na to vrednost.
- Tudi `corsOrigins` in `bruteForceProtection` sta vključena v
  `SECURITY_IMPACTING_SETTINGS_KEYS`: omilitev katere koli od teh nastavitev
  oslabi zaščito prijave, zato zahtevata enako ponovno avtentikacijo z
  `currentPassword` (zavihek Varnost ga zahteva), uvoz JSON pa ju izpusti.
- Vsak ključ varnostnega pravilnika — vnosi `SECURITY_IMPACTING_SETTINGS_KEYS`,
  vsak ključ `oidc*` in stanje seje nadzorne plošče — je pri
  `PATCH /api/settings` na voljo **samo operaterju**: ključ API z obsegom
  `manage` ali dostopni žeton `oma_` je zavrnjen z `403`, tudi če pošlje
  pravilen `currentPassword`, zavrnitev pa se zabeleži v revizijsko sled kot
  `settings.update_failed` z `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` v `src/lib/api/operatorCredential.ts`).
  Običajne nastavitve (tema, nastavitve prikaza) ostanejo zapisljive s ključem z
  obsegom `manage` ali dostopnim žetonom `admin`. Vsako spreminjanje same poti
  `/api/settings` (in tudi `/api/settings/require-login`) zahteva tudi obseg
  dostopnega žetona `admin` (`ADMIN_MUTATION_EXACT_PATHS` v
  `src/server/authz/accessScopes.ts`, natančno ujemanje poti); `GET` ostane
  `read`, druge pod poti `/api/settings/*` (posredniški strežniki, privzete
  kombinacije, vzdevki modelov, stiskanje, čiščenja …) pa ohranijo obseg `write`,
  določen na podlagi metode.
- `POST /api/settings/import-json` preskoči to ponovno avtentikacijo, zato pred
  zapisovanjem odstrani vsak ključ iz `IMPORT_STRIPPED_SETTINGS_KEYS` (ista
  datoteka): geslo in `currentPassword`, vsak vnos
  `SECURITY_IMPACTING_SETTINGS_KEYS` ter stanje seje nadzorne plošče
  (`sessionsValidAfter`, `revokedDashboardSessions`). Uvoz starejše varnostne
  kopije zato ne more obnoviti seje, ki jo je sprememba gesla ali odjava že
  končala.

## Razredi poti

`src/server/authz/types.ts` določa tri razrede; vsaka pot, ki je ni mogoče deterministično razvrstiti, pade v `MANAGEMENT`.

| Razred       | Opis                                                                                                                                                      | Zahtevana avtentikacija                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `PUBLIC`     | Izrecno varne poti — prijava, odjava, stanje, inicializacija, health, zagonski bootstrap.                                                                 | Brez                                                                    |
| `CLIENT_API` | Končne točke za strežbo modelov — `/api/v1/*`, `/api/v1beta/*` ter aliasi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ključ Bearer, kadar je omogočena učinkovita zastavica `REQUIRE_API_KEY` |
| `MANAGEMENT` | Strani nadzorne plošče, nastavitve, ponudniki, ključi, skrbniške in diagnostične končne točke.                                                            | Seja nadzorne plošče ALI Bearer z obsegom `manage`                      |

Nekatera dejanja `MANAGEMENT` so **samo za upravitelja**: ključ `manage` ni dovolj. Izvoz shranjenih poverilnic (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), obnovitev varnostne kopije čez žive podatke (`POST /api/db-backups/import`, vključno z `dryRun=true`, `POST /api/db-backups` obnovitev po id-ju, `POST /api/settings/import-json`) in uničenje točk obnovitve (čiščenje z `DELETE /api/db-backups` in tudi `PATCH /api/db-backups`, ker shranjeno hrambo nastavlja samodejno obrezovanje po vsaki varnostni kopiji) zahtevajo sejo nadzorne plošče, lokalni subjekt CLI ali onemogočeno prijavo. Izdaja žetona za sinhronizacijo (`POST /api/sync/tokens`) in ustvarjanje žetona za dostop CLI z obsegom `admin` (`POST /api/cli/tokens`) zahtevata sejo nadzorne plošče ali lokalni subjekt CLI v vseh načinih prijave. Ključi API katerega koli obsega in žetoni za dostop `oma_` niso upraviteljske poverilnice: kadar je upraviteljska poverilnica zahtevana, dobijo `403`. Preverjanje je v `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Spreminjanje nastavitev prijave je prav tako samo za upravitelja: `POST /api/settings/require-login` (nastavitev upravljalskega gesla / preklop `requireLogin`) sprejme samo te poverilnice, ko geslo že obstaja — okno prvega zagona (še brez gesla) ostane nespremenjeno — seja nadzorne plošče pa mora za zamenjavo gesla poslati `currentPassword` (`403`, če manjka ali je napačno, se revidira kot `settings.update_failed`). Lokalni CLI in instanca z onemogočeno prijavo ohranita pot za obnovitev in lahko nastavita geslo brez tega, ker sta obe vezani na gostitelja, ki je lastnik podatkovnega imenika.

## Cevovod

```
Dohodna zahteva → src/proxy.ts
  → runAuthzPipeline() v src/server/authz/pipeline.ts
    1. Odstrani zaupanja vredne notranje glave (x-omniroute-auth-*, x-omniroute-route-class)
    2. Ustvari ID zahteve in razvrsti pot prek classifyRoute()
    3. Če pathname == "/" → preusmeri na /dashboard
    4. Če poteka zaustavljanje (nadzorovana zaustavitev) in /api/* → 503
    5. Če metoda ni GET in /api/* → zaščita checkBodySize()
    6. Če OPTIONS → predhodna zahteva CORS 204
    7. Če options.enforce == false → posreduje naprej z glavami razreda poti
    8. Sicer: POLICIES[routeClass].evaluate(ctx)
       - dovoli  → doda x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - zavrni → napaka JSON s correlation_id (strani nadzorne plošče → 302 /login)
```

Zaupanja vredne notranje glave (določene v `src/server/authz/headers.ts`) so **odstranjene iz dohodnih zahtev** pred razvrstitvijo — odjemalci ne morejo vnaprej nastaviti `x-omniroute-auth-*`, da bi se izdajali za subjekt.

### Pogodbe pravilnikov

Vsak razred poti ima pravilnik v `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — vedno vrne `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — pridobi Bearer in ga preveri prek `validateApiKey()`. Na anonimni dostop preide le, ko je veljavna funkcijska zastavica `REQUIRE_API_KEY` onemogočena. Veljavna zastavica se razreši prek `isRequireApiKeyEnabled()` (`preglasitev funkcijske zastavice v podatkovni zbirki > process.env.REQUIRE_API_KEY > privzeta vrednost`), zato funkcijske zastavice nadzorne plošče in okoljske spremenljivke dosledno urejajo `/api/v1/*`, `/api/v1beta/*` ter vzdevke; napake razreševalnika povzročijo varno zavrnitev dostopa. Na poteh odjemalskega API-ja dovoljuje zahteve s sejo nadzorne plošče (vključno z `/api/v1/models`, ki jo uporablja katalog modelov nadzorne plošče).
- **`managementPolicy`** (`policies/management.ts`) — sprejme sejo nadzorne plošče, notranje zahteve za sinhronizacijo modelov (ujemanje z `/api/providers/[name]/(sync-models|models)`) ali preverjanje v celoti preskoči, če `isAuthRequired()` vrne false. Ko je žeton Bearer prisoten, vendar neveljaven, vrne 403 (`AUTH_001`), sicer pa 401. Pred katero koli vejo avtentikacije uveljavi tudi ravni varovanja poti (LOCAL_ONLY / ALWAYS_PROTECTED) — glejte [Ravni varovanja poti](../security/ROUTE_GUARD_TIERS.md). Do poti LOCAL_ONLY v `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (trenutno: `/api/mcp/`) je mogoče dostopati iz naslovov, ki niso povratne zanke, kadar ima ključ Bearer obseg `manage`; vse druge poti LOCAL_ONLY ostanejo strogo omejene na povratno zanko ne glede na obseg.

Uspešen pravilnik vrne `AuthSubject` s `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Nadaljnji obdelovalniki ga lahko preberejo prek `assertAuth(request, "CLIENT_API")` v `src/server/authz/assertAuth.ts`, namesto da bi znova izvajali logiko avtentikacije.

## Seznam javnih poti

`src/shared/constants/publicApiRoutes.ts` je izrecni seznam dovoljenih poti:

Seznam je razdeljen glede na **obliko**, ta razdelitev pa je varnostno ključna (GHSA-74g9-q8f6-793h): predpona se primerja z `startsWith()`, zato se ujema tudi z vsako sosednjo potjo, ki ima enake začetne znake.
Predpona `/api/usage/om-usage` je označila `/api/usage/om-usage<anything>` kot JAVNO, Next pa to razreši v `/api/usage/[connectionId]` — obravnavalnik brez lastnega preverjanja pristnosti.

```ts
// Pristna poddrevesa. Vsak vnos se MORA končati z "/" (kar preverja test enote).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // pri razvrščanju se obravnava kot CLIENT_API, ne kot javna pot »brez preverjanja pristnosti«
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Posamezne poti, ki se ujemajo NATANČNO (s končno poševnico ali brez nje).
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

// Posamezne poti samo za branje, za katere velja tudi omilitev izvora CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Posamezna pot samo za branje BREZ omilitve CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Poti samo za branje so javne **samo** za varne metode. Opomba: `classifyRoute()` izloči `/api/v1/*` in `/api/v1beta/*` iz privzete razvrstitve PUBLIC — te poti so vedno `CLIENT_API`, zato pravilnik za ključ Bearer še vedno velja.

## Dodajanje nove poti

### Vzorec 1 — Javna končna točka odjemalskega API-ja (preverjanje pristnosti Bearer)

Poti pod `/api/v1/` in `/api/v1beta/` so samodejno razvrščene kot `CLIENT_API`. Vmesna programska oprema uveljavlja preverjanje Bearer; obravnavalnikom poti ga ni treba ponavljati, lahko pa po potrebi preberejo subjekt.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika obravnavalnika
}
```

### Vzorec 2 — Upravljavska končna točka (seja ali Bearer + manage)

Uporabite `requireManagementAuth()` iz `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika obravnavalnika
}
```

`requireManagementAuth()` ob uspehu vrne `null`, ob napaki pa JSON `Response`:

- 401 `AUTH_001` "Zahtevano je preverjanje pristnosti" — poverilnice sploh niso podane
- 403 — neveljaven Bearer **ali** Bearer je podan, vendar ključ nima obsega `manage` / `admin`

`hasManageScope(scopes)` vrne true za `"manage"` ali `"admin"`.

### Vzorec 3 — Dodajanje na javni seznam dovoljenih poti

Nabor izberite glede na obliko, ne glede na priročnost. Posamezna pot sodi v `PUBLIC_API_ROUTES_EXACT` (ali v `PUBLIC_READONLY_CORS_API_ROUTES`, če je namenjena samo metodi GET); samo pristno poddrevo sodi v `PUBLIC_API_ROUTE_PREFIXES` in se **mora končati z `/`**. Če posamezno pot dodate na seznam predpon, s tem objavite tudi vsako sosednjo pot, ki ima enake začetne znake — vključno s sorodnimi potmi z dinamičnimi segmenti, dodanimi pozneje (GHSA-74g9-q8f6-793h). Posodobite teste enot v `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` in `tests/unit/authz/classify.test.ts`.

## Obsegi

Trije imenski prostori. Vsak preverjevalnik bere samo svoje nize. Stranska primerjava, vključno s tem, zakaj `manage` ne uspe `scopeMatches` za `read:compression` in zakaj dostopni žeton `read` ne more `PATCH /api/keys/{id}`, je opisana v [Treh imenskih prostorih obsegov](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API ključi vsebujejo polje `scopes` (shranjeno kot JSON v `api_keys.scopes`, glej `src/lib/db/apiKeys.ts`).

### Obseg upravljanja

- `manage` / `admin` — `hasManageScope`. Dostop nosilca do API poti za upravljanje.
- `mcp:connect`, `self:usage`, `self:account-quota` in
  `policy:bypass-provider-quota` so aditivni obsegi z natančnim ujemanjem. Nahajajo se
  zunaj `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` odpre samo
  `/api/mcp/` izrez, ki ni povratna zanka.

### Obsegi orodij MCP

Katalog in pravila ujemanja (identičen niz ali dodeljen obseg, ki se konča z `*`):
[Obsegi orodij MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` v `src/shared/constants/mcpScopes.ts` je izvirna tipizirana
podmnožica, ne celoten katalog. Izvrševanje poteka v
`open-sse/mcp-server/scopeEnforcement.ts` po tem, ko `resolveCallerScopeContext()`
razreši obsege iz informacij o avtentikaciji MCP, metapodatkov zahteve ali `OMNIROUTE_MCP_SCOPES`.
Ostane izklopljeno, razen če je `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Obsegi dostopnih žetonov

`read` / `write` / `admin` na žetonih `oma_live_…`, razvrščeni po `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Ta rang velja samo za poverilnico dostopnega žetona.
Glejte [Avtentikacija upravljanja](../guides/MANAGEMENT-AUTH.md).

## Preklop zahtevane avtentikacije

`isAuthRequired()` v `src/shared/utils/apiAuth.ts` odloča, ali se za zahtevo sploh uveljavi **katerakoli** avtentikacija:

- `settings.requireLogin === false` → avtentikacija je globalno onemogočena, razen za vedno zaščiteno raven (glej [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) in klice, ki izdajajo poverilnico, ki jo ta nastavitev sprejme; ti zahtevajo enako poverilnico kot pri vklopljeni prijavi: izdajanje žetonov za sinhronizacijo, ustvarjanje žetonov za dostop CLI katerega koli obsega in ustvarjanje ključa API z obsegom `manage`/`admin`, dodeljevanje tega obsega ključu, ponovno ustvarjanje ali razkrivanje takega ključa (`requireCredentialForManagementScopedKey()` v `src/lib/api/requireManagementAuth.ts`). Ključi, namenjeni samo sklepanju, ostanejo odprti.
- Geslo ni nastavljeno **in** okoljska spremenljivka `INITIAL_PASSWORD` ni nastavljena → način bootstrap dovoli čarovnika za nastavitev in zahteve z loopbacka, zunanje omrežne zahteve pa še vedno zahtevajo poverilnice.
- Katera koli napaka baze → zaprto varno (secure-by-default).

Uveljavljanje ključa API odjemalca uporablja `isRequireApiKeyEnabled()` v `src/shared/utils/featureFlags.ts`, ne neposrednega branja `process.env.REQUIRE_API_KEY`. To je pomembno za nameščene instance: preklop `REQUIRE_API_KEY` v Dashboard → Feature Flags shrani prepis v bazo in takoj vpliva na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` in druge preverjanje avtentikacije API-ja odjemalca, ki delijo ta pomočnik. Če shrambe zastavic ni mogoče prebrati, se avtentikacija API-ja odjemalca zapre in zahteva ključ.

## Nezdružljiva sprememba — v3.8.0

Končne točke `/api/v1/agents/tasks/*` in `/api/resilience/model-cooldowns` **zdaj zahtevajo upravljalsko preverjanje pristnosti** (potrditev `588a0333`). Odjemalci, ki so prej pošiljali običajen ključ API brez obsega `manage`, prejmejo `403`. Migracija: ključu bodisi dodelite obseg `manage` na nadzorni plošči API Keys bodisi uporabite prijavljeno sejo nadzorne plošče.

## Sprememba vedenja — v3.8.2

`/api/mcp/*` (oddaljeni strežnik MCP) je privzeto še vedno LOCAL_ONLY, vendar zdaj sprejema zahtevke, ki ne izvirajo iz povratne zanke, kadar glava `Authorization: Bearer <api-key>` vsebuje obseg `manage`. Izjema je za vsako pot izrecno nadzorovana prek `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` v `src/server/authz/routeGuard.ts`; sorodne predpone LOCAL_ONLY `/api/cli-tools/runtime/*` namenoma ni mogoče zaobiti, ker lahko zažene poljubne podprocese. Anonimni zahtevki za `/api/mcp/*`, ki ne izvirajo iz povratne zanke, še naprej vračajo `403 LOCAL_ONLY` — privzeto pravilo za vsako novo pot LOCAL_ONLY ostaja strogo omejeno na povratno zanko. Glejte [Ravni varovanja poti](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Preizkušanje

- Preizkusi enot: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Javni seznam dovoljenih poti: `tests/unit/public-api-routes.test.ts`.
- Zagon izbranega preizkusa: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Odpravljanje napak

Cevovod odzivom vedno doda naslednje glave:

```
x-request-id:               <ID korelacije, ponovljen v telesih napak>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Pri overjenih zahtevah glave zahteve v zalednem sistemu (na strani obdelovalnika) vključujejo tudi:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<zadnje 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (neobvezno)
x-omniroute-auth-scopes:    seznam, ločen z vejicami
```

Znotraj obdelovalnikov uporabite `assertAuth(req, expectedClass)` — ta sproži izjemo `AuthzAssertionError` s kodo `AUTHZ_NOT_INITIALIZED`, če je bila vmesna programska oprema zaobidena (uporabno za odkrivanje regresij konfiguracije v testih).

## Glejte tudi

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — oznaka za avtentikacijo za vsako končno točko
- [COMPLIANCE.md](../security/COMPLIANCE.md) — revizijski dnevnik za dogodke avtentikacije
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trije imenski prostori obsega in katalog orodij MCP
- Vir: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
