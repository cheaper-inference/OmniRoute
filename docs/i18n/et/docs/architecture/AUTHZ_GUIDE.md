# Authorization Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Tõe allikas:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Viimati uuendatud:** 2026-09-22 — skoobi nimeruumid viitavad MCP-SERVER.md

OmniRoute'il on marsruuditundlik autoriseerimistorustik, mis valvab iga API päringut. Klassifikatsioon on **deterministlik** ja **fail-closed** — kõik, mida ei saa klassifitseerida, lõpeb `MANAGEMENT`ina ja nõuab seanssi või haldustaseme tokenit. See leht selgitab mudelit inseneridele, kes hooldavad marsruute või kujundavad uusi lõpp-punkte.

![AuthZ torustik (3 marsruudiklassi + poliitika hindamine)](../diagrams/exported/authz-pipeline.svg)

> Allikas: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Kaks autentimisrežiimi

### 1. API-võti (Bearer)

Kasutatakse OpenAI/Anthropic/Gemini-ga ühilduvate kliendi-API-de ja mõnede haldusmarsruutide jaoks, kui võtmel on `manage`-ulatus.

```
Authorization: Bearer <api-key>
```

Valideerib `isValidApiKey()` / `extractApiKey()` failis `src/sse/services/auth.ts` ning see eksporditakse uuesti failis `src/shared/utils/apiAuth.ts`. Valideerija aktsepteerib ka keskkonnamuutujaid `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` püsivate läbipääsuvõtmetena (issue #1350).

### 2. Armatuurlaua seanss (auth_token-küpsis)

Armatuurlaua lehtedele ja administratiivsetele toimingutele.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Küpsis on seanss ainult siis, kui JWT on kontrollitud **ja** sisaldab väidet `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Iga küpsise tarbija (armatuurlaua marsruudikaitse (`isDashboardSessionAuthenticated()`), autoriseerimisahela värskendus, WebSocketi käepigistus, reaalajaserver, `/api/settings/require-login`, `/api/auth/status`) läbib selle abifunktsiooni. Eksisteerivad ka teised `JWT_SECRET`-iga allkirjastatud JWT-d: Cursor CLI läbipääs väljastab võtmete omanikele tokeneid `iss "omniroute" / aud "cursor-cli"`, need ei ole kunagi seansid (#13298).

Kontrollib `isDashboardSessionAuthenticated()` failis `src/shared/utils/apiAuth.ts`. Ahel värskendab JWT-d automaatselt, kui sellel on 30-päevasest elueast alles vähem kui 7 päeva.

Seanss võib lõppeda enne 30 päeva möödumist, sest iga väljastaja läbib `mintDashboardSessionToken` (väljastamisaeg `iat` ja ID `jti`) ja kontrollija vaatab üle kaks seadet: `sessionsValidAfter`, mille parooli muutmine seab, nii et kõik enne seda väljastatud seansid lakkavad kehtimast (parooli muutnud brauser saab uue küpsise), ning `revokedDashboardSessions`, millele `POST /api/auth/logout` lisab välja logitud seansi `jti`. Varasema väljaande väljastatud seanssidel puudub mõlemad väited ja need jäävad kehtima kuni esimese parooli muutmiseni. Kui seadeid ei saa lugeda, ei usaldata seanssi.

Mõned haldusmarsruudid aktsepteerivad **kumbagi** režiimi: küpsise VÕI `Bearer <key>`, kui API-võtmel on `manage`- (või `admin`-) ulatus. Just see võimaldab v3.8-s lisatud töövoogu "konfigureeritav API-kutsetega".

#### Valikuline OIDC-sisselogimisvärav (#6973)

Armatuurlaua administraatori sisselogimine toetab lisaks vaikimisi paroolisisselogimisele ka **valikulist** OIDC-voogu (OpenID Connect). Paroolisisselogimist ei eemaldata kunagi, see ainult täiendatakse:

- Keelatud, välja arvatud juhul, kui `settings.oidcEnabled === true` **ja** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` on kõik seadistatud (Seaded → Autentimine). Vastasel juhul tagastab `GET /api/auth/oidc/login` vastuse `400`.
- `GET /api/auth/oidc/login` leiab `authorization_endpoint` väljastaja `/.well-known/openid-configuration` alt (tagasilangemine on `<issuer>/authorize`), koostab sissetulevast päringust suunamis-URI (arvestab `x-forwarded-proto`) ja suunab IdP-sse juhusliku `state`-väärtusega, mis salvestatakse `httpOnly`-küpsisesse `oidc_state`.
- `GET /api/auth/oidc/callback` kontrollib `state`-i, vahetab authorization code välja ja kontrollib ID-tokeni allkirja väljastaja JWKS-i kaudu (`jose`i `createRemoteJWKSet`, vahemällu JWKS-URI kaupa), kontrollides `issuer`/`audience`. Lubatud subjektide loend `oidcAllowedSubjects` on nõutav: see vastab tokeni väitele `sub` või väitele `email`. E-posti väidet aktsepteeritakse ainult siis, kui `email_verified === true`, nii et IdP-s kinnitamata e-post ei pääse kunagi väravast läbi. Ilma kirjeteta lükkab callback tagasi kõik sisselogimised (`not_configured`).
- Edukuse korral väljastab see **täpselt sama** 30-päevase `auth_token` JWT-i, mida väljastab paroolisisselogimine (`src/app/api/auth/login/route.ts`), seega ei muutu armatuurlaua ülejäänud seansiahel (automaatne värskendus, küpsise lipud). OIDC asendab ainult selle, kuidas küpsis väljastatakse, mitte seda, mida see annab.
- Iga `oidc*`-seade (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) on failis `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings` vastab `400 PASSWORD_REQUIRED`, kui päringukehas ei ole haldusparooli väljal `currentPassword` (`401 PASSWORD_MISMATCH`, kui see on vale). `oidcDisablePasswordLogin` keelab paroolisisselogimise (`POST /api/auth/login`), kuid säilitab salvestatud parooli räsi ning uuesti autentimine kontrollib endiselt selle vastu `currentPassword`-i.
- Ka `corsOrigins` ja `bruteForceProtection` on failis `SECURITY_IMPACTING_SETTINGS_KEYS`: nende lõdvendamine nõrgendab sisselogimiskaitset, seetõttu nõuavad need sama uuesti autentimist väljal `currentPassword` (turvalisuse vahekaart küsib seda) ning JSON-import eemaldab need.
- Iga turvapoliitika võti (`SECURITY_IMPACTING_SETTINGS_KEYS` kirjed, iga `oidc*`-võti ja armatuurlaua seansiolek) on `PATCH /api/settings`-is **ainult operaatorile**: `manage`-ulatusega API-võti või `oma_`-juurdepääsutoken lükatakse tagasi vastusega `403`, isegi kui see saadab õige `currentPassword`-i, ja tagasilükkamine logitakse kui `settings.update_failed` põhjusega `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` failis `src/lib/api/operatorCredential.ts`). Tavalised seaded (teema, kuvaeelistused) jäävad kirjutatavaks `manage`-võtmega või `admin`-juurdepääsutokeniga. Iga muudatus `/api/settings` endas (ja `/api/settings/require-login`) nõuab lisaks ka juurdepääsutokeni ulatust `admin` (`ADMIN_MUTATION_EXACT_PATHS` failis `src/server/authz/accessScopes.ts`, täpne teevaste). `GET` jääb ulatuseks `read`, ning ülejäänud `/api/settings/*` alamarsruudid (puhverserverid, combo-vaikeseaded, mudelialiased, tihendus, puhastused …) säilitavad meetodist tuletatud ulatuse `write`.
- `POST /api/settings/import-json` jätab selle uuesti autentimise vahele, seega eemaldab see enne kirjutamist kõik võtmed failis `IMPORT_STRIPPED_SETTINGS_KEYS` (sama fail): parooli ja `currentPassword`-i, iga `SECURITY_IMPACTING_SETTINGS_KEYS` kirje ja armatuurlaua seansioleku (`sessionsValidAfter`, `revokedDashboardSessions`). Seetõttu ei saa vanema varukoopia importimine äratada seanssi, mille parooli muutmine või väljalogimine on juba lõpetanud.

## Marsruudiklassid

`src/server/authz/types.ts` määratleb kolm klassi. Iga marsruut, mida ei saa deterministlikult klassifitseerida, langeb vaikimisi klassi `MANAGEMENT`.

| Klass        | Kirjeldus                                                                                                                                             | Nõutav autentimine                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `PUBLIC`     | Selgesõnaliselt ohutud marsruudid: sisselogimine, väljalogimine, olek, lähtestamine, tervisekontroll ja onboarding-bootstrap.                         | Puudub                                                        |
| `CLIENT_API` | Mudeliteenuse lõpp-punktid: `/api/v1/*`, `/api/v1beta/*` ning aliased `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer-võti, kui funktsioonilipp `REQUIRE_API_KEY` on lubatud |
| `MANAGEMENT` | Armatuurlaua lehed, seaded, pakkujad, võtmed, admin- ja diagnostikalõpp-punktid.                                                                      | Armatuurlaua seanss VÕI Bearer `manage`-ulatusega             |

Mõned `MANAGEMENT` toimingud on **ainult operaatorile**: `manage`-võti ei ole piisav. Salvestatud mandaatide eksportimine (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), varukoopia taastamine praegusete andmete peale (`POST /api/db-backups/import`, sh `dryRun=true`, `POST /api/db-backups` taastamine ID järgi, `POST /api/settings/import-json`) ning taastepunktide hävitamine (`DELETE /api/db-backups` puhastus ja `PATCH /api/db-backups`, sest salvestatud säilitusaeg juhib automaatset puhastamist iga varukoopia järel) nõuavad armatuurlaua seanssi, kohalikku CLI-identiteeti või seda, et sisselogimine on keelatud. Sünkroonimistokeni väljastamine (`POST /api/sync/tokens`) ja `admin`-ulatusega CLI juurdepääsutokeni loomine (`POST /api/cli/tokens`) nõuavad armatuurlaua seanssi või kohalikku CLI-identiteeti igas sisselogimisrežiimis. API-võtmed igas ulatuses ja `oma_` juurdepääsutokenid ei ole operaatori mandaadid: need saavad vastuseks `403`, kui see on nõutav. Kontroll asub failis `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Sisselogimisseadete muutmine on samuti ainult operaatorile: `POST /api/settings/require-login` (haldusparooli määramine / `requireLogin` lülitamine) aktsepteerib neid mandaate pärast seda, kui parool on olemas. Esmase käivituse bootstrap-aken (parooli veel pole) on muutumatu ning armatuurlaua seanss peab parooli asendamiseks saatma `currentPassword`-i (`403`, kui see puudub või on vale, logitud kui `settings.update_failed`). Kohalik CLI ja instants, kus sisselogimine on keelatud, säilitavad taastamistee ning võivad parooli seada ilma selleta, sest mõlemad on seotud andmekataloogi omava hostiga.

## Töötluskonveier

```
Sissetulev päring → src/proxy.ts
  → runAuthzPipeline() failis src/server/authz/pipeline.ts
    1. Eemalda usaldatud sisemised päised (x-omniroute-auth-*, x-omniroute-route-class)
    2. Genereeri päringu ID, klassifitseeri marsruut funktsiooniga classifyRoute()
    3. Kui pathname == "/" → suuna ümber asukohta /dashboard
    4. Kui toimub tühjendamine (sujuv sulgemine) ja /api/* → 503
    5. Kui mitte-GET /api/* → kontrolli kaitsemehhanismiga checkBodySize()
    6. Kui OPTIONS → CORS-i eelkontroll 204
    7. Kui options.enforce == false → lase läbi koos marsruudiklassi päistega
    8. Vastasel juhul: POLICIES[routeClass].evaluate(ctx)
       - luba   → lisa x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - lükka tagasi → JSON-viga koos correlation_id-ga (töölaua lehed → 302 /login)
```

Usaldatud sisemised päised (määratletud failis `src/server/authz/headers.ts`) **eemaldatakse sissetulevatest päringutest** enne klassifitseerimist — kliendid ei saa subjekti kehastamiseks päiseid `x-omniroute-auth-*` eelnevalt määrata.

### Reeglistike lepingud

Igal marsruudiklassil on kataloogis `src/server/authz/policies/` oma reeglistik:

- **`publicPolicy`** (`policies/public.ts`) — tagastab alati `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — eraldab Bearer-väärtuse ja valideerib selle funktsiooniga `validateApiKey()`. Lubab anonüümse juurdepääsu ainult siis, kui kehtiv funktsioonilipp `REQUIRE_API_KEY` on keelatud. Kehtiv lipp tuvastatakse funktsiooniga `isRequireApiKeyEnabled()` (`andmebaasi funktsioonilipu ülekirjutus > process.env.REQUIRE_API_KEY > vaikeväärtus`), et töölaua funktsioonilipud ja keskkonnamuutujad haldaksid marsruute `/api/v1/*`, `/api/v1beta/*` ning aliaseid ühetaoliselt; lahendaja tõrgete korral juurdepääs keelatakse. Lubab kliendi API marsruutidel töölaua seansiga päringuid (sealhulgas `/api/v1/models`, mida kasutab töölaua mudelikataloog).
- **`managementPolicy`** (`policies/management.ts`) — aktsepteerib töölaua seanssi ja sisemisi mudelite sünkroonimise päringuid (mida võrreldakse mustriga `/api/providers/[name]/(sync-models|models)`) või jätab kontrolli täielikult vahele, kui `isAuthRequired()` tagastab väärväärtuse. Kui Bearer-tõend on olemas, kuid kehtetu, tagastab 403 (`AUTH_001`), muul juhul 401. Samuti jõustab enne mis tahes autentimisharu marsruudikaitse tasemed (LOCAL_ONLY / ALWAYS_PROTECTED) — vt [Marsruudikaitse tasemed](../security/ROUTE_GUARD_TIERS.md). Loendis `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` olevatele LOCAL_ONLY teedele (praegu `/api/mcp/`) pääseb juurde ka väljastpoolt loopback-liidest, kui Bearer-võtmel on `manage`-ulatus; kõik muud LOCAL_ONLY teed jäävad olenemata ulatusest rangelt loopback-liidesega piiratuks.

Edukas reeglistik tagastab `AuthSubject`-objekti väärtusega `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Allavoo töötlejad saavad seda lugeda failis `src/server/authz/assertAuth.ts` oleva funktsiooni `assertAuth(request, "CLIENT_API")` kaudu, selle asemel et autentimisloogikat uuesti käivitada.

## Avalike marsruutide loend

`src/shared/constants/publicApiRoutes.ts` on selgesõnaline lubatud marsruutide loend:

Loend on jaotatud **kuju** järgi ning see jaotus on kriitilise tähtsusega (GHSA-74g9-q8f6-793h): prefiks sobitatakse meetodiga `startsWith()`, mistõttu sobib see ka iga külgneva teega, mille algusmärgid on samad.
Prefiksina märkis `/api/usage/om-usage` marsruudi `/api/usage/om-usage<anything>` AVALIKUKS ning Next lahendab selle marsruudiks `/api/usage/[connectionId]` — töötlejaks, millel puudub oma autentimine.

```ts
// Tegelikud alampuud. Iga kirje PEAB lõppema märgiga "/" (seda kontrollib ühiktest).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // käsitletakse funktsioonis classify kui CLIENT_API, mitte kui „autentimiseta avalikku“
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Üksikud marsruudid, mida sobitatakse TÄPSELT (lõpukaldkriipsuga või ilma).
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

// Kirjutuskaitstud üksikud marsruudid, millele rakendub ka CORS-i päritolupiirangu leevendus.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Kirjutuskaitstud üksik marsruut ILMA CORS-i piirangu leevenduseta.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Kirjutuskaitstud marsruudid on avalikud **ainult** turvaliste meetodite puhul. Märkus: `classifyRoute()` välistab `/api/v1/*` ja `/api/v1beta/*` PUBLIC-i vaikimisi harust — need on alati `CLIENT_API`, et Bearer-võtme reegel endiselt rakenduks.

## Uue marsruudi lisamine

### Muster 1 — Avalik kliendi API otspunkt (Bearer-autentimine)

Marsruudid `/api/v1/` ja `/api/v1beta/` all liigitatakse automaatselt tüübiks `CLIENT_API`. Vahevara jõustab Bearer-kontrolli; marsruuditöötlejad ei pea seda kordama, kuid võivad vajaduse korral subjekti lugeda.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... töötleja loogika
}
```

### Muster 2 — Haldusotspunkt (seanss või Bearer + manage)

Kasutage funktsiooni `requireManagementAuth()` failist `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... töötleja loogika
}
```

`requireManagementAuth()` tagastab õnnestumise korral `null` või JSON-vormingus veavastuse `Response`:

- 401 `AUTH_001` „Autentimine on nõutav“ — identimisteave puudub täielikult
- 403 — Bearer on kehtetu **või** Bearer on olemas, kuid võtmel puudub ulatus `manage` / `admin`

`hasManageScope(scopes)` tagastab väärtuse true ulatuse `"manage"` või `"admin"` korral.

### Muster 3 — Avalikku lubatud marsruutide loendisse lisamine

Valige kogum kuju, mitte mugavuse järgi. Üks marsruut lisatakse kogumisse `PUBLIC_API_ROUTES_EXACT` (või ainult GET-i jaoks kogumisse `PUBLIC_READONLY_CORS_API_ROUTES`); kogumisse `PUBLIC_API_ROUTE_PREFIXES` lisatakse üksnes tegelik alampuu ning see **peab lõppema märgiga `/`**. Üksiku marsruudi lisamine prefiksiloendisse avalikustab ka kõik külgnevad teed, mille algusmärgid on samad — sealhulgas hiljem lisatud dünaamilise segmendiga sõsarmarsruudid (GHSA-74g9-q8f6-793h). Uuendage ühikteste failides `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ja `tests/unit/authz/classify.test.ts`.

## Skoobid

Kolm nimeruumi. Iga kontrollija loeb ainult oma stringe. Kõrvuti võrdlus,
sealhulgas miks `manage` ebaõnnestub `scopeMatches` puhul `read:compression` jaoks ja miks `read`
ligipääsutoken ei saa `PATCH /api/keys/{id}`, on
[Kolm skoobi nimeruumi](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API võtmed sisaldavad `scopes` massiivi (salvestatud JSON-ina `api_keys.scopes` all, vt `src/lib/db/apiKeys.ts`).

### Halduse skoop

- `manage` / `admin` — `hasManageScope`. Kandja ligipääs halduse API marsruutidele.
- `mcp:connect`, `self:usage`, `self:account-quota` ja
  `policy:bypass-provider-quota` on aditiivsed täpselt vastavad skoobid. Need
  asuvad väljaspool `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` avab ainult
  `/api/mcp/` mitte-tagasiside erandi.

### MCP tööriista skoobid

Kataloog ja vastavusreeglid (identne string või antud skoop, mis lõpeb `*`-ga):
[MCP tööriista skoobid](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` failis `src/shared/constants/mcpScopes.ts` on algne tüübitud
alamhulk, mitte see täielik kataloog. Jõustamine toimub
`open-sse/mcp-server/scopeEnforcement.ts` pärast seda, kui `resolveCallerScopeContext()`
lahendab skoobid MCP autentimisteabest, päringu metaandmetest või `OMNIROUTE_MCP_SCOPES`-ist.
See jääb välja lülitatuks, välja arvatud juhul, kui `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Ligipääsutokeni skoobid

`read` / `write` / `admin` `oma_live_…` tokenitel, järjestatud `scopeSatisfies`
järgi (`src/lib/accessTokens/scopes.ts`). See järjestus kehtib ainult
ligipääsutokeni mandaadile. Vt [Halduse autentimine](../guides/MANAGEMENT-AUTH.md).

## Autentimise nõudmise lüliti

`isAuthRequired()` failis `src/shared/utils/apiAuth.ts` otsustab, kas päringu puhul rakendatakse **üldse** mingit autentimist:

- `settings.requireLogin === false` → autentimine on globaalselt välja lülitatud, välja arvatud alati kaitstud tase (vt [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) ja kutsed, mis väljastavad mandaadi, mida see aktsepteerib. Need nõuavad sama mandaati, mis sisselogimise sisselülitamisel: sünkroonimistokenite väljastamine, CLI juurdepääsutokenite väljastamine mis tahes ulatuses ning `manage`/`admin`-ulatusega API-võtme loomine, selle ulatuse andmine võtmele või sellise võtme taasgenereerimine või kuvamine (`requireCredentialForManagementScopedKey()` failis `src/lib/api/requireManagementAuth.ts`). Ainult järeldamise võtmed jäävad avatuks.
- Parooli pole seadistatud **ja** keskkonnamuutujat `INITIAL_PASSWORD` pole → bootstrap-režiim lubab seadistusviisardi ja loopback-päringud, kuid avalikud võrgupäringud nõuavad endiselt mandaate.
- Mis tahes andmebaasi viga → keeldub ligipääsust (vaikimisi turvaline).

Kliendi API-võtme jõustamine kasutab funktsiooni `isRequireApiKeyEnabled()` failis `src/shared/utils/featureFlags.ts`, mitte otsest lugemist `process.env.REQUIRE_API_KEY`-st. See on juurutatud instantsside puhul oluline: `REQUIRE_API_KEY` lülitamine menüüs Dashboard → Feature Flags salvestab andmebaasi alistuse ning mõjutab kohe marsruute `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ja teisi kliendi API autentimiskontrolle, mis jagavad seda abifunktsiooni. Kui funktsioonilippude salvestust ei saa lugeda, keeldub kliendi API autentimine ligipääsust ja nõuab võtit.

## Ühilduvust katkestav muudatus — v3.8.0

Lõpp-punktid `/api/v1/agents/tasks/*` ja `/api/resilience/model-cooldowns` **nõuavad nüüd haldusautentimist** (commit `588a0333`). Kliendid, mis saatsid varem tavalise API-võtme ilma ulatuseta `manage`, saavad vastuseks `403`. Üleviimine: määrake võtmele API Keys juhtpaneelil ulatus `manage` või kasutage sisselogitud juhtpaneeliseanssi.

## Käitumise muudatus — v3.8.2

`/api/mcp/*` (MCP kaugserver) on endiselt vaikimisi LOCAL_ONLY, kuid aktsepteerib nüüd mitte-loopback-päringuid, kui päis `Authorization: Bearer <api-key>` sisaldab ulatust `manage`. Erand lubatakse iga tee jaoks eraldi konstandi `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` kaudu failis `src/server/authz/routeGuard.ts`; sama taseme LOCAL_ONLY prefiksist `/api/cli-tools/runtime/*` ei saa tahtlikult mööda minna, sest see võib käivitada suvalisi alamprotsesse. Mitte-loopback-aadressidelt pärit anonüümsed päringud teele `/api/mcp/*` saavad jätkuvalt vastuseks `403 LOCAL_ONLY` — iga uue LOCAL_ONLY tee vaikekäitumiseks jääb range loopback-piirang. Vt [Marsruudikaitse tasemed](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testimine

- Ühiktestid: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Avalik lubatud loend: `tests/unit/public-api-routes.test.ts`.
- Sihttesti käivitamine: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Silumine

Konveier märgistab vastused alati järgmiste päistega:

```
x-request-id:               <korrelatsiooni ID, kajastub veavastustes>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autenditud päringute puhul sisaldavad ülesvoolu (töötleja poolel olevad) päringupäised ka järgmist:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<viimased 4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (valikuline)
x-omniroute-auth-scopes:    komadega eraldatud loend
```

Kasutage töötlejates funktsiooni `assertAuth(req, expectedClass)` — kui vahevara jäeti vahele, väljastab see vea `AuthzAssertionError` koodiga `AUTHZ_NOT_INITIALIZED` (kasulik konfiguratsiooni regressioonide tuvastamiseks testides).

## Vaata ka

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentimismärgis iga lõpp-punkti kohta
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auditi logi autentimissündmuste jaoks
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — kolm skoobi nimeruumi ja MCP tööriista-skoobi kataloog
- Allikas: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
