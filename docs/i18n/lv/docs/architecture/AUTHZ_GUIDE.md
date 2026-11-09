# Authorization Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Patiesības avots:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Pēdējoreiz atjaunināts:** 2026-09-22 — tvēruma nosaukumvietas norāda uz MCP-SERVER.md

OmniRoute ir maršrutu apzinoša autorizācijas cauruļvads, kas aizsargā katru API pieprasījumu. Klasifikācija ir **deterministiska** un **slēgta kļūmes gadījumā** — viss, ko nevar klasificēt, nonāk kā `MANAGEMENT` un prasa sesiju vai pārvaldības līmeņa pilnvaru. Šī lapa izskaidro modeli inženieriem, kas uztur maršrutus vai izstrādā jaunus galapunktus.

![Autorizācijas cauruļvads (3 maršrutu klases + politikas novērtēšana)](../diagrams/exported/authz-pipeline.svg)

> Avots: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Divi autentifikācijas režīmi

### 1. API atslēga (Bearer)

Tiek izmantota ar OpenAI/Anthropic/Gemini saderīgām klientu API un dažiem pārvaldības maršrutiem, kad atslēgai ir `manage` tvērums.

```
Authorization: Bearer <api-key>
```

Validēta ar `isValidApiKey()` / `extractApiKey()` failā `src/sse/services/auth.ts` un atkārtoti eksportēta, izmantojot `src/shared/utils/apiAuth.ts`. Validators pieņem arī vides mainīgos `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kā pastāvīgas caurlaides atslēgas (issue #1350).

### 2. Informācijas paneļa sesija (`auth_token` sīkdatne)

Informācijas paneļa lapām un administratora darbībām.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Sīkdatne ir sesija tikai tad, ja JWT tiek veiksmīgi verificēts **un** tajā ir `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Katrs
sīkdatnes izmantotājs (informācijas paneļa maršruta aizsargs (`isDashboardSessionAuthenticated()`), autorizācijas cauruļvada atsvaidzināšana, WebSocket rokasspiediens, tiešsaistes
serveris, `/api/settings/require-login`, `/api/auth/status`) izmanto šo palīgfunkciju.
Pastāv arī citi JWT, kas parakstīti ar `JWT_SECRET` — Cursor CLI caurlaide atslēgu turētājiem izveido
žetonus ar `iss "omniroute" / aud "cursor-cli"`, un tie nekad nav sesijas
(#13298).

Verificēta ar `isDashboardSessionAuthenticated()` failā `src/shared/utils/apiAuth.ts`. Cauruļvads automātiski atsvaidzina JWT, kad tā 30 dienu darbības laikā ir atlikušas mazāk nekā 7 dienas.

Sesija var beigties arī pirms 30 dienu termiņa beigām, jo katrs tās izveidotājs izmanto `mintDashboardSessionToken` (izveides laiku `iat` un identifikatoru `jti`), bet verifikators pārbauda divus iestatījumus: `sessionsValidAfter`, ko iestata paroles maiņa, tādējādi pārstājot verificēt visas pirms šī brīža izsniegtās sesijas (pārlūkprogramma, kurā tika mainīta parole, saņem jaunu sīkdatni), un `revokedDashboardSessions`, kam `POST /api/auth/logout` pievieno izrakstītās sesijas `jti`. Sesijām, kas izveidotas ar vecāku laidienu, nav neviena no šiem atribūtiem, un tās paliek derīgas līdz pirmajai paroles maiņai. Ja iestatījumus nevar nolasīt, sesija netiek uzticēta.

Daži pārvaldības maršruti pieņem **jebkuru** režīmu: sīkdatni VAI `Bearer <key>`, ja API atslēgai ir `manage` (vai `admin`) tvērums. Tas nodrošina darbplūsmu “konfigurējams, izmantojot API izsaukumus”, kas pievienota v3.8.

#### Neobligāts OIDC pieteikšanās ierobežojums (#6973)

Informācijas paneļa administratora pieteikšanās atbalsta arī **pēc izvēles aktivizējamu** OIDC (OpenID Connect) plūsmu
līdztekus noklusējuma pieteikšanās iespējai ar paroli — pieteikšanās ar paroli nekad netiek noņemta, tikai
papildināta:

- Atspējots, ja vien `settings.oidcEnabled === true` **un** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` nav visi konfigurēti (Iestatījumi → Autentifikācija).
  `GET /api/auth/oidc/login` pretējā gadījumā atgriež `400`.
- `GET /api/auth/oidc/login` iegūst `authorization_endpoint` no izdevēja
  `/.well-known/openid-configuration` (kā rezerves variantu izmanto
  `<issuer>/authorize`), izveido novirzīšanas URI no ienākošā pieprasījuma
  (ņemot vērā `x-forwarded-proto`) un novirza uz IdP, izmantojot nejaušu `state`,
  kas tiek saglabāts `httpOnly` `oidc_state` sīkfailā.
- `GET /api/auth/oidc/callback` validē `state`, apmaina autorizācijas kodu un
  pārbauda ID marķiera parakstu, izmantojot izdevēja JWKS
  (`jose` `createRemoteJWKSet`, kešots katram JWKS URI), kā arī pārbauda
  `issuer`/`audience`. Piekļuve informācijas panelim prasa neaizpildītu
  `oidcAllowedSubjects` sarakstu, `oidcAdmissionClaim` politiku vai abus.
  Subjekta saraksts atbilst tikai `sub` vai `email`, ja
  `email_verified === true`. Neobligātā pretenzijas politika izmanto ar
  punktiem atdalītu ID marķiera pretenzijas ceļu (piemēram,
  `realm_access.roles`) un pieņemto vērtību masīvu; atrisinātajai pretenzijai
  jābūt virkņu masīvam, kurā ir vismaz viena pieņemtā vērtība. Ja ir
  konfigurētas abas politikas, abām ir jāizpildās. Trūkstošas vai nepareizi
  veidotas pretenzijas izraisa drošu atteikumu, un bez kādas no šīm politikām
  atzvanīšana atsaka pieteikšanos (`not_configured`). Esošās konfigurācijas,
  kas izmanto tikai subjektu, turpina darboties bez izmaiņām.
- Keycloak parasti kartē realm lomas piekļuves marķieros, nevis obligāti ID
  marķieros. Lai pieprasītu realm lomu `admin`, konfigurējiet šim klientam
  protokola kartētāju, kas iekļauj `realm_access.roles` tā **ID marķierī**, un
  pēc tam iestatiet `oidcAdmissionClaim` uz
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Pirms uz lomu balstītas piekļuves iespējošanas pārbaudiet šī klienta faktisko
  ID marķiera pretenziju; lietotne nelasa piekļuves marķiera lomas. IdP puses
  marķiera atteikums var papildināt, bet nevar aizstāt šo lietotnes puses pārbaudi.
- Veiksmīgas pieteikšanās gadījumā tiek izveidots **tieši tas pats** 30 dienu
  `auth_token` JWT, ko izveido paroles pieteikšanās
  (`src/app/api/auth/login/route.ts`), tāpēc pārējais informācijas paneļa
  sesijas process (automātiskā atsvaidzināšana, sīkfailu karodziņi) paliek
  nemainīgs — OIDC aizstāj tikai sīkfaila izveides veidu, nevis to, ko tas
  piešķir. Izmaiņas IdP lomās/grupās nepadara esošās OmniRoute sesijas
  nederīgas; to darbības ilgumu joprojām nosaka atteikšanās, paroles maiņa vai
  sesijas termiņa beigas.
- Katrs `oidc*` iestatījums (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) ir iekļauts
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  atbild ar `400 PASSWORD_REQUIRED`, ja pieprasījuma pamattekstā nav pārvaldības
  paroles kā `currentPassword` (`401 PASSWORD_MISMATCH`, ja tā ir nepareiza).
  `oidcDisablePasswordLogin` atsaka paroles _pieteikšanos_
  (`POST /api/auth/login`), bet saglabā paroles jaucējvērtību, un atkārtotai
  autentifikācijai joprojām tiek pārbaudīts `currentPassword`.
- `corsOrigins` un `bruteForceProtection` arī ir iekļauti
  `SECURITY_IMPACTING_SETTINGS_KEYS`: jebkura no tiem atslābināšana vājina
  pieteikšanās aizsardzību, tāpēc tiem nepieciešama tā pati atkārtotā
  autentifikācija ar `currentPassword` (cilne Drošība to pieprasa), un JSON
  importēšana tos izmet.
- Katrs drošības politikas atslēgas elements — `SECURITY_IMPACTING_SETTINGS_KEYS`
  ieraksti, katra `oidc*` atslēga un informācijas paneļa sesijas stāvoklis —
  `PATCH /api/settings` ir pieejams **tikai operatoram**: API atslēga ar
  manage tvērumu vai `oma_` piekļuves marķieris tiek noraidīts ar `403` pat tad,
  ja tajā ir nosūtīts pareizs `currentPassword`, un atteikums tiek reģistrēts
  auditā kā `settings.update_failed` ar `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` failā `src/lib/api/operatorCredential.ts`).
  Parastos iestatījumus (motīvu, attēlojuma preferences) joprojām var mainīt ar
  `manage` atslēgu vai `admin` piekļuves marķieri. Katrai pašas
  `/api/settings` (kā arī `/api/settings/require-login`) mutācijai ir
  nepieciešams arī `admin` piekļuves marķiera tvērums
  (`ADMIN_MUTATION_EXACT_PATHS` failā `src/server/authz/accessScopes.ts`,
  precīza ceļa atbilstība); `GET` joprojām izmanto `read`, bet pārējie
  `/api/settings/*` apakšmaršruti (starpniekserveri, kombināciju noklusējumi,
  modeļu aizstājvārdi, saspiešana, tīrīšana…) saglabā pēc metodes noteikto
  `write` tvērumu.
- `POST /api/settings/import-json` izlaiž šo atkārtoto autentifikāciju, tāpēc
  pirms rakstīšanas izmet katru atslēgu no `IMPORT_STRIPPED_SETTINGS_KEYS`
  (tajā pašā failā): paroli un `currentPassword`, katru
  `SECURITY_IMPACTING_SETTINGS_KEYS` ierakstu un informācijas paneļa sesijas
  stāvokli (`sessionsValidAfter`, `revokedDashboardSessions`).
  Tādējādi vecākas dublējumkopijas importēšana nevar atjaunot sesiju, kuru jau
  pārtrauca paroles maiņa vai izrakstīšanās.

#### Neobligāta TOTP divu faktoru pieteikšanās (#16619)

Iestatīšana notiek sadaļā Iestatījumi → Drošība; funkcija ir izslēgta, līdz
operators to ieslēdz (`src/server/auth/dashboardMfa.ts`).

- **Kas tajā ietilpst:** pieteikšanās ar paroli (`POST /api/auth/login`), kam pēc tam nepieciešams
  `POST /api/auth/mfa/verify`, un `omniroute connect` (`POST /api/cli/connect`), kas noraida
  apmaiņu, izmantojot tikai paroli, un pieņem kodu kā `totp`.
- **Kas tajā neietilpst:** OIDC / SSO pieteikšanās (`/api/auth/oidc/callback`) nepieprasa OmniRoute TOTP. Tā
  izmanto paša identitātes nodrošinātāja otro faktoru, tāpēc, ja OIDC ir iespējots, iespējojiet MFA IdP.
- **Atkopšana** (pazaudēta ierīce, vairs nav atkopšanas kodu vai faktoru vairs nevar verificēt,
  piemēram, pēc `STORAGE_ENCRYPTION_KEY` maiņas):
  1. Restartējiet serveri ar `OMNIROUTE_DISABLE_MFA=true`.
  2. Pašā resursdatorā (ar cilpas atgriezeniskās saites peer un cilpas atgriezeniskās saites `Host`, piemēram,
     `http://localhost:20128`) piesakieties ar paroli. Otrais faktors tiek izlaists tikai šim avotam; visiem
     pārējiem avotiem kods joprojām ir nepieciešams.
  3. Sadaļā Iestatījumi → Drošība → Atspējot ievadiet paroli un atstājiet koda lauku tukšu. `POST /api/auth/mfa/disable` pieņem pamattekstu bez `code` tikai tad, ja mainīgais ir iestatīts un pieprasījums nāk no resursdatora; tam joprojām ir nepieciešama informācijas paneļa sesija un pašreizējā parole, un darbība tiek reģistrēta audita žurnālā kā `auth.mfa.disabled` ar `secondFactor: "recovery_switch"`.
  4. Noņemiet `OMNIROUTE_DISABLE_MFA` iestatījumu, restartējiet serveri un, ja nepieciešams, vēlreiz reģistrējiet faktoru.

## Maršrutu klases

`src/server/authz/types.ts` definē trīs klases. Jebkurš maršruts, ko nevar deterministiski klasificēt, pēc noklusējuma tiek piešķirts `MANAGEMENT`.

| Klase        | Apraksts                                                                                                                                                          | Nepieciešamā autentifikācija                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | Skaidri drošie maršruti: pieteikšanās, izrakstīšanās, statuss, inicializācija, veselības pārbaude un onboarding bootstrap.                                        | Nav                                                                   |
| `CLIENT_API` | Modeļu apkalpošanas galapunkti: `/api/v1/*`, `/api/v1beta/*`, kā arī aizstājvārdi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer atslēga, kad ir iespējots funkciju karodziņš `REQUIRE_API_KEY` |
| `MANAGEMENT` | Infopaneļa lapas, iestatījumi, pakalpojumu sniedzēji, atslēgas, administratīvie un diagnostikas galapunkti.                                                       | Infopaneļa sesija VAI Bearer ar `manage` darbības jomu                |

Dažas `MANAGEMENT` darbības ir **tikai operatoram**: viena `manage` atslēga nepietiek. Saglabāto pilnvaru eksports (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), dublējuma atjaunošana pār pašreizējiem datiem (`POST /api/db-backups/import`, ieskaitot `dryRun=true`, `POST /api/db-backups` atjaunošana pēc id, `POST /api/settings/import-json`) un atjaunošanas punktu iznīcināšana (`DELETE /api/db-backups` tīrīšana, kā arī `PATCH /api/db-backups`, jo saglabātais glabāšanas laiks vada automātisko tīrīšanu pēc katras dublējuma kopijas) prasa infopaneļa sesiju, vietējo CLI identitāti vai to, ka pieteikšanās ir atspējota. Sinhronizācijas žetona izdošana (`POST /api/sync/tokens`) un `admin` darbības jomas CLI piekļuves žetona izveide (`POST /api/cli/tokens`) prasa infopaneļa sesiju vai vietējo CLI identitāti jebkurā pieteikšanās režīmā. API atslēgas jebkurā darbības jomā un `oma_` piekļuves žetoni nav operatora pilnvaras: tiem atgriež `403`, kad tāda nepieciešama. Pārbaude atrodas failā `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Pieteikšanās iestatījumu maiņa arī ir tikai operatoram: `POST /api/settings/require-login` (iestatīt pārvaldības paroli / pārslēgt `requireLogin`) pieņem šīs pilnvaras tikai tad, kad parole jau ir. Sākotnējās iestatīšanas bootstrap logs (paroles vēl nav) nemainās, un infopaneļa sesijai, lai aizstātu paroli, jānosūta `currentPassword` (`403`, ja tā trūkst vai ir nepareiza, reģistrēts kā `settings.update_failed`). Vietējais CLI un instance ar atspējotu pieteikšanos saglabā atjaunošanas ceļu un drīkst iestatīt paroli bez tā, jo abi ir piesaistīti resursdatoram, kas pieder datu direktorijai.

## Cauruļvads

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

Uzticamas iekšējās galvenes (definētas `src/server/authz/headers.ts`) ir** atņemts no ienākošajiem pieprasījumiem** pirms klasifikācijas — klienti nevar iepriekš aizpildīt `x-omniroute-auth-*`, lai uzdotos par subjektu.

### Polišu līgumi

Katrai maršruta klasei ir `src/server/authz/policies/` politika:

- **`publicPolicy`** (`policies/public.ts`) — vienmēr atgriež `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izvilkumi nesējs, apstiprina, izmantojot `validateApiKey()`. Tiek uzskatīts par anonīmu tikai tad, ja ir atspējots efektīvais `REQUIRE_API_KEY` līdzekļa karodziņš. Efektīvais karodziņš tiek atrisināts, izmantojot `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), tāpēc informācijas paneļa līdzekļu karogi un vides mainīgie konsekventi pārvalda `/api/v1/*`, `/api/v1beta/*` un aizstājvārdus; atrisinātāja kļūmes neizdodas aizvērtas. Ļauj informācijas paneļa sesiju pieprasījumus klienta API maršrutos (tostarp `/api/v1/models`, ko izmanto informācijas paneļa modeļu katalogā). Kad Entra ID SSO ir iespējots, nesēju, kas strukturāli ir Entra marķieris (trīs base64url segmenti, `RS*` alg, `kid`), apstrādā SSO filiāle.** pirms tam** `validateApiKey()` un tā spriedums ir galīgs — tas nekad neietilpst API atslēgas ceļā vai atzarojumā no degradācijas uz anonīmu, tāpēc identitātes nodrošinātāja darbības pārtraukums nevar kļūt par atvērtu piekļuvi. Statiskie API taustiņi netiek ietekmēti. Skatiet sadaļu [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — pieņem informācijas paneļa sesiju, iekšējā modeļa sinhronizācijas pieprasījumus (saskaņo ar `/api/providers/[name]/(sync-models|models)`) vai pilnībā izlaiž, ja `isAuthRequired()` atgriež false. Atgriež 403 (`AUTH_001`), ja uzrādītāja marķieris ir, bet nederīgs, pretējā gadījumā atgriež 401. Ievieš arī maršruta apsardzes līmeņus (LOCAL_ONLY / ALWAYS_PROTECTED) pirms jebkuras autentifikācijas filiāles — see [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY ceļiem `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (šodien: `/api/mcp/`) var piekļūt no atpakaļcilpas, ja nesēja atslēga nes `manage` tvērumu; visi pārējie LOCAL_ONLY ceļi paliek stingras cilpas neatkarīgi no darbības jomas.

Veiksmīga politika atgriež `AuthSubject` ar `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Pakārtotie apstrādātāji var to nolasīt, izmantojot `assertAuth(request, "CLIENT_API")` programmā `src/server/authz/assertAuth.ts` nevis atkārtoti palaist autentifikācijas loģiku.

## Publisko maršrutu saraksts

`src/shared/constants/publicApiRoutes.ts` ir eksplicīts atļauto saraksts:

Saraksts ir sadalīts pēc **formas**, un šis sadalījums ir kritiski svarīgs (GHSA-74g9-q8f6-793h): prefikss
tiek salīdzināts ar `startsWith()`, tāpēc tas atbilst arī katram blakus esošam ceļam, kuram ir tādi paši sākuma simboli.
`/api/usage/om-usage` kā prefikss atzīmē `/api/usage/om-usage<anything>` kā PUBLIC, un Next to atrisina
uz `/api/usage/[connectionId]` — apdarinātāju, kuram nav savas autentifikācijas.

```ts
// Īstas apakškoka struktūras. Katram ierakstam OBLIGĀTI jābeidzas ar "/" (to pārbauda vienības tests).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify funkcijā tiek apstrādāts kā CLIENT_API, nevis kā "publisks bez autentifikācijas"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Atsevišķi maršruti, kuriem tiek piemērota PRECĪZA atbilstība (ar beigu slīpsvītru vai bez tās).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // 2. pieteikšanās darbība izvēles TOTP gadījumā; nepieciešams MFA gaidīšanas sīkfails
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Tikai lasāmi atsevišķi maršruti, kuriem tiek piemērota arī CORS izcelsmes atslābināšana.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Tikai lasāms atsevišķs maršruts BEZ CORS izcelsmes atslābināšanas.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Tikai lasāmi maršruti ir publiski **tikai** drošajām metodēm. Piezīme: `classifyRoute()` izslēdz `/api/v1/*` un `/api/v1beta/*` no PUBLIC
rezerves apstrādes — tie vienmēr ir `CLIENT_API`, tāpēc uz tiem joprojām attiecas Bearer atslēgas politika.

## Jauna maršruta pievienošana

### 1. modelis — publisks klienta API galapunkts (Bearer autentifikācija)

Maršruti zem `/api/v1/` un `/api/v1beta/` tiek automātiski klasificēti kā `CLIENT_API`. Starpprogrammatūra veic Bearer pārbaudi; maršrutu apstrādātājiem tā nav jāatkārto, bet vajadzības gadījumā tie var nolasīt subjektu.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... apstrādātāja loģika
}
```

### 2. modelis — pārvaldības galapunkts (sesija vai Bearer + manage)

Izmantojiet `requireManagementAuth()` no `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... apstrādātāja loģika
}
```

Veiksmes gadījumā `requireManagementAuth()` atgriež `null`, bet kļūdas gadījumā — JSON kļūdas `Response`:

- 401 `AUTH_001` "Nepieciešama autentifikācija" — akreditācijas datu nav vispār
- 403 — nederīgs Bearer **vai** Bearer ir norādīts, bet atslēgai nav tvēruma `manage` / `admin`

`hasManageScope(scopes)` atgriež true vērtībai `"manage"` vai `"admin"`.

### 3. modelis — pievienošana publiskajam atļauto maršrutu sarakstam

Izvēlieties kopu pēc struktūras, nevis ērtības. Viens maršruts jāievieto `PUBLIC_API_ROUTES_EXACT` (vai `PUBLIC_READONLY_CORS_API_ROUTES`, ja atļauts tikai GET); tikai īsts apakškoks jāievieto `PUBLIC_API_ROUTE_PREFIXES`, un tam **obligāti jābeidzas ar `/`**. Ievietojot vienu maršrutu prefiksu sarakstā, tiek publicēts arī katrs blakus esošais ceļš ar tādiem pašiem sākuma simboliem — tostarp vēlāk pievienoti dinamisko segmentu līdzvērtīgie maršruti (GHSA-74g9-q8f6-793h). Atjauniniet vienībtestus failos `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` un `tests/unit/authz/classify.test.ts`.

## Darbības jomas

Trīs nosaukumvietas. Katrs pārbaudītājs lasa tikai savas virknes. Salīdzinājums,
tostarp tas, kāpēc `manage` neiztur `scopeMatches` pārbaudi attiecībā uz `read:compression` un kāpēc `read` piekļuves marķieris nevar `PATCH /api/keys/{id}`, ir
[Trīs darbības jomu nosaukumvietas](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API atslēgas satur `scopes` masīvu (saglabāts kā JSON failā `api_keys.scopes`, skatīt `src/lib/db/apiKeys.ts`).

### Pārvaldības darbības joma

- `manage` / `admin` — `hasManageScope`. Nesēja piekļuve pārvaldības API maršrutiem.
- `mcp:connect`, `self:usage`, `self:account-quota` un
  `policy:bypass-provider-quota` ir aditīvas precīzas atbilstības darbības jomas. Tās atrodas ārpus `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` atver tikai
  `/api/mcp/` bezcilpas izgriezumu.

### MCP rīku darbības jomas

Katalogs un atbilstības noteikumi (identiska virkne vai piešķirta darbības joma, kas beidzas ar `*`):
[MCP rīku darbības jomas](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` failā `src/shared/constants/mcpScopes.ts` ir oriģinālā tipizētā
apakškopa, nevis pilns katalogs. Izpilde notiek
`open-sse/mcp-server/scopeEnforcement.ts` pēc tam, kad `resolveCallerScopeContext()` atrisina darbības jomas no MCP autentifikācijas informācijas, pieprasījuma metadatiem vai `OMNIROUTE_MCP_SCOPES`.
Tā paliek izslēgta, ja vien `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Piekļuves marķiera darbības jomas

`read` / `write` / `admin` uz `oma_live_…` marķieriem, ranžēti pēc `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Šis rangs attiecas tikai uz piekļuves marķiera
akreditācijas datiem. Skatīt [Pārvaldības autentifikācija](../guides/MANAGEMENT-AUTH.md).

## Nepieciešamās autentifikācijas slēdzis

`isAuthRequired()` failā `src/shared/utils/apiAuth.ts` nosaka, vai pieprasījumam tiek piemērota **jebkāda** autentifikācija:

- `settings.requireLogin === false` → autentifikācija ir globāli atspējota, izņemot vienmēr aizsargāto līmeni (skat. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) un izsaukumus, kas izsniedz pilnvaru, ko tā pieņem. Tiem nepieciešama tā pati pilnvara, kāda ir nepieciešama, ja pieteikšanās ir ieslēgta: sinhronizācijas žetonu izdošana, CLI piekļuves žetonu izdošana jebkurā darbības jomā un API atslēgas izveide ar `manage`/`admin` darbības jomu, šīs darbības jomas piešķiršana atslēgai vai tādas atslēgas regenerēšana vai parādīšana (`requireCredentialForManagementScopedKey()` failā `src/lib/api/requireManagementAuth.ts`). Atslēgas tikai secinājumiem paliek atvērtas.
- Parole nav konfigurēta **un** nav vides mainīgā `INITIAL_PASSWORD` → bootstrap režīms atļauj iestatīšanas vedni un loopback pieprasījumus, bet ārējie tīkla pieprasījumi joprojām prasa pilnvaras.
- Jebkura DB kļūda → bloķē piekļuvi (drošs pēc noklusējuma).

Klienta API atslēgu piemērošanai izmanto `isRequireApiKeyEnabled()` no `src/shared/utils/featureFlags.ts`, nevis tiešu `process.env.REQUIRE_API_KEY` nolasīšanu. Tas ir svarīgi izvietotām instancēm: `REQUIRE_API_KEY` pārslēgšana Dashboard → Feature Flags saglabā DB pārrakstījumu un tūlīt ietekmē `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` un citas klienta API autentifikācijas pārbaudes, kas izmanto šo palīgfunkciju. Ja funkciju karodziņu krātuvi nevar nolasīt, klienta API autentifikācija bloķē piekļuvi un prasa atslēgu.

## Nesaderīgas izmaiņas — v3.8.0

Galapunktiem `/api/v1/agents/tasks/*` un `/api/resilience/model-cooldowns` **tagad ir nepieciešama pārvaldības autentifikācija** (komits `588a0333`). Klienti, kas iepriekš nosūtīja parastu API atslēgu bez `manage` tvēruma, saņem `403`. Migrācija: piešķiriet atslēgai `manage` tvērumu API Keys informācijas panelī vai izmantojiet informācijas paneļa sesiju, kurā esat pieteicies.

## Darbības izmaiņas — v3.8.2

`/api/mcp/*` (attālais MCP serveris) pēc noklusējuma joprojām ir LOCAL_ONLY, taču tagad pieņem pieprasījumus, kas nav no lokālās atgriezeniskās cilpas, ja galvene `Authorization: Bearer <api-key>` ietver `manage` tvērumu. Šis izņēmums katram ceļam tiek nepārprotami ierobežots, izmantojot `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` failā `src/server/authz/routeGuard.ts`; saistīto LOCAL_ONLY prefiksu `/api/cli-tools/runtime/*` apzināti nevar apiet, jo tas var palaist patvaļīgus apakšprocesus. Anonīmi pieprasījumi uz `/api/mcp/*`, kas nav no lokālās atgriezeniskās cilpas, joprojām saņem `403 LOCAL_ONLY` — jebkuram jaunam LOCAL_ONLY ceļam pēc noklusējuma joprojām ir spēkā stingra lokālās atgriezeniskās cilpas prasība. Skatiet [Maršrutu aizsarga līmeņi](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testēšana

- Vienībtesti: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Publiskais atļauto maršrutu saraksts: `tests/unit/public-api-routes.test.ts`.
- Fokusēta palaišana: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Atkļūdošana

Cauruļvads vienmēr apzīmogo atbildes ar:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentificētiem pieprasījumiem augšupējās (apstrādātāja puses) pieprasījumu galvenes ietver arī:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Lietojiet `assertAuth(req, expectedClass)` iekšējie apstrādātāji — tas izmet `AuthzAssertionError` ar kodu `AUTHZ_NOT_INITIALIZED` ja starpprogrammatūra tika apieta (noder, lai pārbaudēs uztvertu konfigurācijas regresijas).

## Skatīt arī

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentifikācijas marķieris katram galapunktam
- [COMPLIANCE.md](../security/COMPLIANCE.md) — audita žurnāls autentifikācijas notikumiem
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trīs darbības jomas nosaukumvietas un MCP rīku darbības jomas katalogs
- Avots: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
