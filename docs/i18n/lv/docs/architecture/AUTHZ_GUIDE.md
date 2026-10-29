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

Tiek izmantota ar OpenAI/Anthropic/Gemini saderīgajām klientu API un dažiem pārvaldības maršrutiem, ja atslēgai ir tvērums `manage`.

```
Authorization: Bearer <api-key>
```

To validē `isValidApiKey()` / `extractApiKey()` failā `src/sse/services/auth.ts`, un tā tiek atkārtoti eksportēta, izmantojot `src/shared/utils/apiAuth.ts`. Validators pieņem arī vides mainīgos `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` kā pastāvīgas caurlaides atslēgas (problēma #1350).

### 2. Informācijas paneļa sesija (auth_token sīkfails)

Informācijas paneļa lapām un administratora darbībām.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Sīkfails ir sesija tikai tad, ja JWT ir sekmīgi verificēts **un** satur `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Katrs
sīkfaila patērētājs (informācijas paneļa maršruta aizsargs (`isDashboardSessionAuthenticated()`), autorizācijas konveijera atsvaidzināšana, WebSocket savienojuma izveide, reāllaika
serveris, `/api/settings/require-login`, `/api/auth/status`) izmanto šo palīgfunkciju.
Pastāv arī citi JWT, kas parakstīti ar `JWT_SECRET` — Cursor CLI caurlaides mehānisms atslēgu
turētājiem izsniedz marķierus ar `iss "omniroute" / aud "cursor-cli"` — un tie nekad nav sesijas
(#13298).

To verificē `isDashboardSessionAuthenticated()` failā `src/shared/utils/apiAuth.ts`. Konveijers automātiski atsvaidzina JWT, ja no tā 30 dienu derīguma termiņa ir atlikušas mazāk nekā 7 dienas.

Sesija var beigties arī pirms tās 30 dienu termiņa beigām, jo katrs izsniedzējs izmanto `mintDashboardSessionToken` (izsniegšanas laiks `iat` un identifikators `jti`), un verificētājs pārbauda divus iestatījumus: `sessionsValidAfter`, kas tiek iestatīts paroles maiņas laikā, lai visas pirms tam izsniegtās sesijas vairs netiktu verificētas (pārlūkprogramma, kurā parole tika mainīta, saņem jaunu sīkfailu), un `revokedDashboardSessions`, kuram `POST /api/auth/logout` pievieno tās sesijas `jti`, no kuras lietotājs ir izrakstījies. Vecākā laidienā izsniegtās sesijas nesatur nevienu no šīm pretenzijām un paliek derīgas līdz pirmajai paroles maiņai. Ja iestatījumus nevar nolasīt, sesija netiek uzskatīta par uzticamu.

Daži pārvaldības maršruti pieņem **jebkuru** no abiem režīmiem: sīkfailu VAI `Bearer <key>`, ja API atslēgai ir tvērums `manage` (vai `admin`). Tas nodrošina versijā v3.8 pievienoto darbplūsmu „konfigurējams, izmantojot API izsaukumus”.

#### Neobligāts OIDC pieteikšanās ierobežojums (#6973)

Informācijas paneļa administratora pieteikšanās līdztekus noklusējuma pieteikšanās iespējai ar paroli atbalsta arī **brīvprātīgi iespējojamu** OIDC (OpenID Connect) plūsmu — pieteikšanās ar paroli nekad netiek noņemta, bet tikai
papildināta:

- Atspējots, ja vien `settings.oidcEnabled === true` **un** nav konfigurēti visi
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` (Iestatījumi → Autentifikācija).
  Pretējā gadījumā `GET /api/auth/oidc/login` atgriež `400`.
- `GET /api/auth/oidc/login` nosaka `authorization_endpoint` no izdevēja
  `/.well-known/openid-configuration` (ja tas neizdodas, izmanto
  `<issuer>/authorize`), izveido novirzīšanas URI no ienākošā pieprasījuma
  (ņemot vērā `x-forwarded-proto`) un novirza uz IdP ar nejauši ģenerētu `state`,
  kas glabājas `httpOnly` sīkfailā `oidc_state`.
- `GET /api/auth/oidc/callback` validē `state`, apmaina autorizācijas kodu
  un pārbauda ID marķiera parakstu, izmantojot izdevēja JWKS
  (`jose` funkciju `createRemoteJWKSet`, kešotu katram JWKS URI), kā arī veic
  `issuer`/`audience` pārbaudes. Piekļuve informācijas panelim pieprasa aizpildītu
  `oidcAllowedSubjects` sarakstu, `oidcAdmissionClaim` politiku vai abus.
  Subjektu saraksts salīdzina `sub` vai `email` tikai tad, ja
  `email_verified === true`. Neobligātā atribūtu politika pieņem ar punktiem
  atdalītu ID marķiera atribūta ceļu (piemēram, `realm_access.roles`) un
  pieņemamo vērtību masīvu; atrisinātajam atribūtam jābūt virkņu masīvam, kas
  satur vismaz vienu pieņemamo vērtību. Ja ir konfigurētas abas politikas,
  abām pārbaudēm jābūt sekmīgām. Trūkstoši vai nepareizi veidoti atribūti drošā
  veidā liedz piekļuvi, un, ja nav nevienas politikas, atzvanīšanas punkts
  atsaka pieteikšanos (`not_configured`). Esošās konfigurācijas, kurās norādīti
  tikai subjekti, turpina darboties bez izmaiņām.
- Keycloak parasti kartē realm lomas piekļuves marķieros, nevis obligāti ID
  marķieros. Lai pieprasītu realm lomu `admin`, konfigurējiet šim klientam
  protokola kartētāju, kas tā **ID marķierī** iekļauj `realm_access.roles`, un pēc
  tam iestatiet `oidcAdmissionClaim` uz `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Pirms iespējojat piekļuvi tikai pēc lomas, pārbaudiet šī klienta faktisko
  ID marķiera atribūtu; lietojumprogramma nelasa piekļuves marķiera lomas.
  Marķiera izsniegšanas atteikums IdP pusē var papildināt šo pārbaudi
  lietojumprogrammas pusē, bet nevar to aizstāt.
- Sekmīgas pieteikšanās gadījumā tiek izveidots **tieši tāds pats** 30 dienu
  `auth_token` JWT, kādu izsniedz pieteikšanās ar paroli
  (`src/app/api/auth/login/route.ts`), tāpēc pārējā informācijas paneļa sesijas
  apstrādes ķēde (automātiskā atsvaidzināšana, sīkfailu karodziņi) paliek
  nemainīga — OIDC aizstāj tikai sīkfaila izveides veidu, nevis tā piešķirtās
  tiesības. IdP lomu vai grupu izmaiņas nepadara esošās OmniRoute sesijas
  nederīgas; to darbības laiku joprojām nosaka atteikšanās, paroles maiņa vai
  sesijas termiņa beigas.
- Katrs `oidc*` iestatījums (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) ir iekļauts
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  atbild ar `400 PASSWORD_REQUIRED`, ja vien pieprasījuma pamattekstā pārvaldības
  parole nav norādīta kā `currentPassword` (ja tā ir nepareiza, tiek atgriezts
  `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` liedz _pieteikšanos_ ar
  paroli (`POST /api/auth/login`), taču saglabā glabāto paroles jaucējvērtību,
  un atkārtotā autentifikācija joprojām salīdzina `currentPassword` ar to.
- Arī `corsOrigins` un `bruteForceProtection` ir iekļauti
  `SECURITY_IMPACTING_SETTINGS_KEYS`: jebkura no tiem prasību mīkstināšana vājina
  pieteikšanās aizsardzību, tāpēc tiem nepieciešama tā pati atkārtotā
  autentifikācija ar `currentPassword` (cilnē Drošība tas tiek pieprasīts), un
  JSON importēšanas laikā tie tiek atmesti.
- Katra drošības politikas atslēga — `SECURITY_IMPACTING_SETTINGS_KEYS` ieraksti,
  katra `oidc*` atslēga un informācijas paneļa sesijas stāvoklis — pieprasījumā
  `PATCH /api/settings` ir pieejama **tikai operatoram**: API atslēga ar `manage`
  tvērumu vai `oma_` piekļuves marķieris tiek noraidīts ar `403` pat tad, ja tas
  nosūta pareizo `currentPassword`, un atteikums tiek reģistrēts audita žurnālā
  kā `settings.update_failed` ar `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` failā `src/lib/api/operatorCredential.ts`).
  Parastos iestatījumus (motīvu, attēlošanas preferences) joprojām var mainīt ar
  `manage` atslēgu vai `admin` piekļuves marķieri. Katra paša `/api/settings`
  modificēšanas darbība (kā arī `/api/settings/require-login` modificēšana)
  pieprasa arī piekļuves marķiera `admin` tvērumu
  (`ADMIN_MUTATION_EXACT_PATHS` failā `src/server/authz/accessScopes.ts`, precīza
  ceļa atbilstība); `GET` joprojām nepieciešams `read`, bet pārējie
  `/api/settings/*` apakšmaršruti (starpniekserveri, kombināciju noklusējumi,
  modeļu aizstājvārdi, saspiešana, tīrīšana…) saglabā no metodes atvasināto
  `write` tvērumu.
- `POST /api/settings/import-json` izlaiž šo atkārtoto autentifikāciju, tāpēc pirms
  rakstīšanas tas atmet katru `IMPORT_STRIPPED_SETTINGS_KEYS` atslēgu (tajā pašā
  failā): paroli un `currentPassword`, katru `SECURITY_IMPACTING_SETTINGS_KEYS`
  ierakstu un informācijas paneļa sesijas stāvokli (`sessionsValidAfter`,
  `revokedDashboardSessions`). Tādēļ vecākas dublējumkopijas importēšana nevar
  atjaunot sesiju, kuru jau izbeidza paroles maiņa vai atteikšanās.

## Maršrutu klases

`src/server/authz/types.ts` definē trīs klases. Jebkurš maršruts, ko nevar deterministiski klasificēt, pēc noklusējuma tiek piešķirts `MANAGEMENT`.

| Klase        | Apraksts                                                                                                                                                          | Nepieciešamā autentifikācija                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | Skaidri drošie maršruti: pieteikšanās, izrakstīšanās, statuss, inicializācija, veselības pārbaude un onboarding bootstrap.                                        | Nav                                                                   |
| `CLIENT_API` | Modeļu apkalpošanas galapunkti: `/api/v1/*`, `/api/v1beta/*`, kā arī aizstājvārdi `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Bearer atslēga, kad ir iespējots funkciju karodziņš `REQUIRE_API_KEY` |
| `MANAGEMENT` | Infopaneļa lapas, iestatījumi, pakalpojumu sniedzēji, atslēgas, administratīvie un diagnostikas galapunkti.                                                       | Infopaneļa sesija VAI Bearer ar `manage` darbības jomu                |

Dažas `MANAGEMENT` darbības ir **tikai operatoram**: viena `manage` atslēga nepietiek. Saglabāto pilnvaru eksports (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), dublējuma atjaunošana pār pašreizējiem datiem (`POST /api/db-backups/import`, ieskaitot `dryRun=true`, `POST /api/db-backups` atjaunošana pēc id, `POST /api/settings/import-json`) un atjaunošanas punktu iznīcināšana (`DELETE /api/db-backups` tīrīšana, kā arī `PATCH /api/db-backups`, jo saglabātais glabāšanas laiks vada automātisko tīrīšanu pēc katras dublējuma kopijas) prasa infopaneļa sesiju, vietējo CLI identitāti vai to, ka pieteikšanās ir atspējota. Sinhronizācijas žetona izdošana (`POST /api/sync/tokens`) un `admin` darbības jomas CLI piekļuves žetona izveide (`POST /api/cli/tokens`) prasa infopaneļa sesiju vai vietējo CLI identitāti jebkurā pieteikšanās režīmā. API atslēgas jebkurā darbības jomā un `oma_` piekļuves žetoni nav operatora pilnvaras: tiem atgriež `403`, kad tāda nepieciešama. Pārbaude atrodas failā `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Pieteikšanās iestatījumu maiņa arī ir tikai operatoram: `POST /api/settings/require-login` (iestatīt pārvaldības paroli / pārslēgt `requireLogin`) pieņem šīs pilnvaras tikai tad, kad parole jau ir. Sākotnējās iestatīšanas bootstrap logs (paroles vēl nav) nemainās, un infopaneļa sesijai, lai aizstātu paroli, jānosūta `currentPassword` (`403`, ja tā trūkst vai ir nepareiza, reģistrēts kā `settings.update_failed`). Vietējais CLI un instance ar atspējotu pieteikšanos saglabā atjaunošanas ceļu un drīkst iestatīt paroli bez tā, jo abi ir piesaistīti resursdatoram, kas pieder datu direktorijai.

## Konveijers

```
Ienākošais pieprasījums → src/proxy.ts
  → runAuthzPipeline() failā src/server/authz/pipeline.ts
    1. Noņemt uzticamos iekšējos header laukus (x-omniroute-auth-*, x-omniroute-route-class)
    2. Ģenerēt pieprasījuma id, klasificēt maršrutu ar classifyRoute()
    3. Ja pathname == "/" → novirzīt uz /dashboard
    4. Ja notiek pieprasījumu apkalpošanas pārtraukšana (graceful shutdown) un /api/* → 503
    5. Ja /api/* pieprasījums nav GET → checkBodySize() pārbaude
    6. Ja OPTIONS → CORS pirmslidojuma pārbaude 204
    7. Ja options.enforce == false → turpināt apstrādi ar maršruta klases header laukiem
    8. Pretējā gadījumā: POLICIES[routeClass].evaluate(ctx)
       - atļaut  → pievienot x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - noraidīt → JSON kļūda ar correlation_id (informācijas paneļa lapas → 302 /login)
```

Uzticamie iekšējie header lauki (definēti `src/server/authz/headers.ts`) tiek **noņemti no ienākošajiem pieprasījumiem** pirms klasifikācijas — klienti nevar iepriekš pievienot `x-omniroute-auth-*`, lai uzdotos par subjektu.

### Politiku līgumi

Katrai maršrutu klasei ir politika direktorijā `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — vienmēr atgriež `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — izgūst Bearer un validē to ar `validateApiKey()`. Pāriet uz anonīmu piekļuvi tikai tad, ja efektīvais `REQUIRE_API_KEY` funkcionalitātes karogs ir atspējots. Efektīvais karogs tiek noteikts ar `isRequireApiKeyEnabled()` (`DB funkcionalitātes karoga pārrakstīšana > process.env.REQUIRE_API_KEY > noklusējums`), lai informācijas paneļa funkcionalitātes karogi un vides mainīgie konsekventi pārvaldītu `/api/v1/*`, `/api/v1beta/*` un aizstājējvārdus; atrisinātāja kļūmes izraisa piekļuves liegšanu. Atļauj informācijas paneļa sesijas pieprasījumus klienta API maršrutos (tostarp `/api/v1/models`, ko izmanto informācijas paneļa modeļu katalogs).
- **`managementPolicy`** (`policies/management.ts`) — pieņem informācijas paneļa sesiju un iekšējos modeļu sinhronizācijas pieprasījumus (kas atbilst `/api/providers/[name]/(sync-models|models)`) vai pilnībā izlaiž pārbaudi, ja `isAuthRequired()` atgriež false. Atgriež 403 (`AUTH_001`), ja Bearer pilnvara ir norādīta, bet nederīga; citos gadījumos atgriež 401. Pirms jebkura autentifikācijas atzara piemēro arī maršrutu aizsardzības līmeņus (LOCAL_ONLY / ALWAYS_PROTECTED) — skatiet [Maršrutu aizsardzības līmeņi](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY` ceļiem, kas iekļauti `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (pašlaik: `/api/mcp/`), var piekļūt no adresēm ārpus lokālās atgriezeniskās cilpas, ja Bearer atslēgai ir `manage` tvērums; visi pārējie `LOCAL_ONLY` ceļi neatkarīgi no tvēruma joprojām ir stingri pieejami tikai no lokālās atgriezeniskās cilpas.

Sekmīga politika atgriež `AuthSubject` ar `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Pakārtotie apstrādātāji var to nolasīt ar `assertAuth(request, "CLIENT_API")` failā `src/server/authz/assertAuth.ts`, atkārtoti neizpildot autentifikācijas loģiku.

## Publisko maršrutu saraksts

`src/shared/constants/publicApiRoutes.ts` ir skaidri definētais atļauto maršrutu saraksts:

Saraksts ir sadalīts pēc **struktūras**, un šis sadalījums ir kritiski svarīgs (GHSA-74g9-q8f6-793h): prefikss tiek
salīdzināts ar `startsWith()`, tādēļ tas atbilst arī katram blakus esošajam ceļam ar tādiem pašiem sākuma simboliem.
Prefikss `/api/usage/om-usage` padarīja `/api/usage/om-usage<anything>` PUBLISKU, un Next to novirza uz
`/api/usage/[connectionId]` — apstrādātāju bez savas autentifikācijas.

```ts
// Īsti apakškoki. Katram ierakstam OBLIGĀTI jābeidzas ar "/" (to pārbauda vienībtests).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // klasifikācijā apstrādāts kā CLIENT_API, nevis kā publisks bez autentifikācijas
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Atsevišķi maršruti, kas tiek salīdzināti PRECĪZI (ar vai bez beigu slīpsvītras).
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

// Atsevišķi tikai lasāmi maršruti, kuriem piemēro arī CORS izcelsmes ierobežojuma atvieglojumu.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Atsevišķs tikai lasāms maršruts BEZ CORS ierobežojuma atvieglojuma.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Tikai lasāmi maršruti ir publiski **tikai** drošajām metodēm. Piezīme: `classifyRoute()` izslēdz `/api/v1/*` un `/api/v1beta/*` no PUBLIC noklusējuma klasifikācijas — tie vienmēr ir `CLIENT_API`, lai joprojām tiktu piemērota Bearer atslēgas politika.

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

Konveijers atbildēm vienmēr pievieno šādas galvenes:

```
x-request-id:               <korelācijas id, atkārtots kļūdu atbilžu pamattekstā>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentificētiem pieprasījumiem augšupstraumes (apdarinātāja puses) pieprasījumu galvenēs ir iekļauts arī:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<pēdējie-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (neobligāts)
x-omniroute-auth-scopes:    ar komatiem atdalīts saraksts
```

Apdarinātājos izmantojiet `assertAuth(req, expectedClass)` — tas izmet `AuthzAssertionError` ar kodu `AUTHZ_NOT_INITIALIZED`, ja starpprogrammatūra tika apieta (tas palīdz testos konstatēt konfigurācijas regresijas).

## Skatīt arī

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentifikācijas marķieris katram galapunktam
- [COMPLIANCE.md](../security/COMPLIANCE.md) — audita žurnāls autentifikācijas notikumiem
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trīs darbības jomas nosaukumvietas un MCP rīku darbības jomas katalogs
- Avots: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
