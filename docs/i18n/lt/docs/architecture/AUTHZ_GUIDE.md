# Authorization Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Tiesos šaltinis:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Paskutinį kartą atnaujinta:** 2026-09-22 — aprėpties vardų sritys nurodo į MCP-SERVER.md

OmniRoute turi maršrutą atpažįstančią autorizacijos sistemą, kuri kontroliuoja kiekvieną API užklausą. Klasifikacija yra **deterministinė** ir **uždaroma gedimo atveju** — viskas, kas negali būti klasifikuota, tampa `MANAGEMENT` ir reikalauja sesijos arba valdymo lygio prieigos rakto. Šiame puslapyje paaiškinamas modelis inžinieriams, prižiūrintiems maršrutus arba kuriantiems naujus galinius taškus.

![Autorizacijos sistema (3 maršrutų klasės + politikos vertinimas)](../diagrams/exported/authz-pipeline.svg)

> Šaltinis: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Du autentifikavimo režimai

### 1. API raktas (Bearer)

Naudojamas su OpenAI/Anthropic/Gemini suderinamomis klientų API ir keliais administravimo maršrutais, kai raktas turi `manage` aprėptį.

```
Authorization: Bearer <api-key>
```

Tikrinamas naudojant `isValidApiKey()` / `extractApiKey()` faile `src/sse/services/auth.ts` ir pakartotinai eksportuojamas per `src/shared/utils/apiAuth.ts`. Tikrintuvas taip pat priima `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` aplinkos kintamuosius kaip nuolatinius tiesioginio perdavimo raktus (issue #1350).

### 2. Prietaisų skydelio sesija (auth_token slapukas)

Skirta prietaisų skydelio puslapiams ir administratoriaus operacijoms.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Slapukas laikomas sesija tik tada, kai JWT patikrinamas **ir** jame yra `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kiekvienas
slapuko naudotojas (prietaisų skydelio maršrutų apsauga (`isDashboardSessionAuthenticated()`), autorizacijos
konvejerio atnaujinimas, WebSocket ryšio užmezgimas, tiesioginis serveris,
`/api/settings/require-login`, `/api/auth/status`) naudoja šį pagalbinį įrankį.
Egzistuoja ir kitų JWT, pasirašytų naudojant `JWT_SECRET` — Cursor CLI tiesioginio perdavimo funkcija
raktų turėtojams sugeneruoja prieigos raktus su `iss "omniroute" / aud "cursor-cli"` — ir jie niekada nėra
sesijos (#13298).

Tikrinama naudojant `isDashboardSessionAuthenticated()` faile `src/shared/utils/apiAuth.ts`. Konvejeris automatiškai
atnaujina JWT, kai iki jo 30 dienų galiojimo pabaigos lieka mažiau nei 7 dienos.

Sesija taip pat gali baigtis nepasibaigus 30 dienų laikotarpiui, nes kiekvienas jos išdavėjas naudoja
`mintDashboardSessionToken` (išdavimo laiko `iat` ir ID `jti`), o tikrintuvas tikrina du nustatymus:
`sessionsValidAfter`, nustatomą pakeitus slaptažodį, todėl kiekviena iki jo išduota sesija nebegali būti patikrinta
(slaptažodį pakeitusi naršyklė gauna naują slapuką), ir `revokedDashboardSessions`, į kurį
`POST /api/auth/logout` įtraukia atsijungusios sesijos `jti`. Senesnės versijos išduotose sesijose nėra nė vieno iš šių
teiginių, todėl jos galioja iki pirmojo slaptažodžio pakeitimo. Jei nustatymų nepavyksta perskaityti, sesija nelaikoma patikima.

Kai kurie administravimo maršrutai priima **bet kurį** režimą: slapuką ARBA `Bearer <key>`, kai API raktas turi `manage` (arba `admin`) aprėptį. Tai įgalina „konfigūruojama naudojant API iškvietimus“ darbo eigą, pridėtą v3.8 versijoje.

#### Pasirinktinis OIDC prisijungimo vartas (#6973)

Prietaisų skydelio administratoriaus prisijungimas taip pat palaiko **pasirinktinai įjungiamą** OIDC (OpenID Connect) eigą
šalia numatytojo prisijungimo naudojant slaptažodį — prisijungimas naudojant slaptažodį niekada nepašalinamas, tik
papildomas:

- Išjungta, nebent `settings.oidcEnabled === true` **ir** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` yra visi sukonfigūruoti (Nustatymai → Autentifikavimas).
  `GET /api/auth/oidc/login` kitu atveju grąžina `400`.
- `GET /api/auth/oidc/login` išdavėjo `/.well-known/openid-configuration` faile aptinka
  `authorization_endpoint` (atsarginis variantas – `<issuer>/authorize`), sukuria
  peradresavimo URI pagal gaunamą užklausą (atsižvelgiant į `x-forwarded-proto`) ir
  peradresuoja į IdP, atsitiktinę `state` reikšmę išsaugodamas `httpOnly` slapuke
  `oidc_state`.
- `GET /api/auth/oidc/callback` patikrina `state`, pakeičia autorizacijos kodą ir
  patikrina ID žetono parašą naudodamas išdavėjo JWKS
  (`jose`'s `createRemoteJWKSet`, spartinančiąją atmintį taikant kiekvienam JWKS URI),
  taip pat atlikdamas `issuer` / `audience` patikras. Patekimas į valdymo skydą
  leidžiamas tik tada, kai yra ne tuščias `oidcAllowedSubjects` sąrašas, nustatyta
  `oidcAdmissionClaim` politika arba tenkinamos abi sąlygos. Subjektų sąrašas sutampa
  su `sub` arba `email` tik tada, kai `email_verified === true`. Pasirinktinė teisių
  suteikimo politika priima taškais atskirtą ID žetono teiginio kelią (pavyzdžiui,
  `realm_access.roles`) ir priimtinų reikšmių masyvą; išspręstas teiginys turi būti
  eilučių masyvas, kuriame yra bent viena priimtina reikšmė. Jei sukonfigūruotos abi
  politikos, abi turi būti įvykdytos. Trūkstami arba netinkamo formato teiginiai
  atmetami saugiai, o nesant nė vienos politikos, atgalinis iškvietimas atsisako
  prisijungimo (`not_configured`). Esamos tik subjektais pagrįstos konfigūracijos
  veikia nepakitusios.
- Keycloak paprastai susieja srities roles su prieigos žetonais, bet nebūtinai su ID
  žetonais. Norėdami reikalauti srities rolės `admin`, sukonfigūruokite šiam klientui
  protokolo susiejimą, kuris įtraukia `realm_access.roles` į jo **ID žetoną**, tada
  nustatykite `oidcAdmissionClaim` į `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Prieš įjungdami tik rolėmis pagrįstą teisių suteikimą patikrinkite faktinį šio kliento
  ID žetono teiginį; programa neskaito prieigos žetono rolių. IdP pusėje taikomas
  žetono atsisakymas gali papildyti, bet nepakeičia šios programos atliekamos patikros.
- Sėkmės atveju sukuriamas **lygiai toks pats** 30 dienų `auth_token` JWT, kokį išduoda
  prisijungimas naudojant slaptažodį (`src/app/api/auth/login/route.ts`), todėl likęs
  valdymo skydelio sesijos procesas (automatinis atnaujinimas, slapukų vėliavėlės)
  nesikeičia — OIDC pakeičia tik tai, kaip sukuriamas slapukas, o ne tai, ką jis suteikia.
  Pakeitus IdP roles ar grupes, esamos OmniRoute sesijos nepanaikinamos; jų galiojimo
  trukmę ir toliau lemia atsijungimas, slaptažodžio pakeitimas arba sesijos
  galiojimo pabaiga.
- Kiekvienas `oidc*` nustatymas (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) yra įtrauktas į
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  atsako `400 PASSWORD_REQUIRED`, nebent užklausoje kaip `currentPassword` pateiktas
  valdymo slaptažodis (`401 PASSWORD_MISMATCH`, kai jis neteisingas).
  `oidcDisablePasswordLogin` atsisako slaptažodinio _prisijungimo_ (`POST /api/auth/login`),
  tačiau išsaugo slaptažodžio maišą, o pakartotinio autentifikavimo metu vis tiek
  tikrina `currentPassword` pagal jį.
- `corsOrigins` ir `bruteForceProtection` taip pat įtraukti į
  `SECURITY_IMPACTING_SETTINGS_KEYS`: sušvelninus bet kurį iš jų susilpnėja
  prisijungimo apsauga, todėl jiems taikomas toks pats pakartotinis autentifikavimas
  naudojant `currentPassword` (saugos skirtukas jo paprašo), o JSON importas juos
  pašalina.
- Kiekvienas saugos politikos raktas — `SECURITY_IMPACTING_SETTINGS_KEYS` įrašai,
  kiekvienas `oidc*` raktas ir valdymo skydelio sesijos būsena — `PATCH /api/settings`
  yra skirtas **tik operatoriui**: valdymo srities API raktas arba `oma_` prieigos
  žetonas atmetamas su `403`, net jei pateikia teisingą `currentPassword`, o
  atmetimas audituojamas kaip `settings.update_failed` su
  `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` faile `src/lib/api/operatorCredential.ts`).
  Įprastus nustatymus (temą, rodymo nuostatas) ir toliau galima keisti naudojant
  `manage` raktą arba `admin` prieigos žetoną. Kiekvienai pačios `/api/settings`
  (ir `/api/settings/require-login`) mutacijai taip pat reikalinga `admin` prieigos
  žetono sritis (`ADMIN_MUTATION_EXACT_PATHS` faile
  `src/server/authz/accessScopes.ts`, taikant tikslų kelio sutapimą); `GET` ir toliau
  lieka `read`, o kituose `/api/settings/*` antriniuose maršrutuose (tarpiniuose
  serveriuose, jungtiniuose numatytuosiuose nustatymuose, modelių pseudonimuose,
  glaudinime, išvalymuose…) išlieka pagal metodą nustatoma `write` sritis.
- `POST /api/settings/import-json` praleidžia šį pakartotinį autentifikavimą, todėl
  prieš įrašydamas pašalina kiekvieną raktą iš `IMPORT_STRIPPED_SETTINGS_KEYS`
  (to paties failo): slaptažodį ir `currentPassword`, kiekvieną
  `SECURITY_IMPACTING_SETTINGS_KEYS` įrašą bei valdymo skydelio sesijos būseną
  (`sessionsValidAfter`, `revokedDashboardSessions`). Todėl importuojant senesnę
  atsarginę kopiją neįmanoma atkurti sesijos, kurią jau nutraukė slaptažodžio
  pakeitimas arba atsijungimas.

#### Pasirinktinis TOTP dviejų veiksnių prisijungimas (#16619)

Užregistruojamas per Nustatymai → Saugumas; išjungtas, kol operatorius jo neįjungia
(`src/server/auth/dashboardMfa.ts`).

- **Kas aptariama:** prisijungimas naudojant slaptažodį (`POST /api/auth/login`, kuriam vėliau reikia
  `POST /api/auth/mfa/verify`) ir `omniroute connect` (`POST /api/cli/connect`,
  kuris atsisako vien slaptažodžio mainų ir priima kodą kaip `totp`).
- **Kas neaptariama:** OIDC / SSO prisijungimas (`/api/auth/oidc/callback`) neprašo „OmniRoute“ TOTP. Jis
  remiasi paties tapatybės teikėjo antruoju veiksniu, todėl, jei įjungtas OIDC, įgalinkite MFA tapatybės
  teikėjuje.
- **Atkūrimas** (pamestas įrenginys, nebelikę atkūrimo kodų arba veiksnys nebegali būti
  patvirtintas, pavyzdžiui, pasikeitus `STORAGE_ENCRYPTION_KEY`):
  1. Paleiskite serverį iš naujo su `OMNIROUTE_DISABLE_MFA=true`.
  2. Pačiame pagrindiniame kompiuteryje (grįžtamojo ryšio lygiarangis ir grįžtamojo ryšio `Host`, pvz.,
     `http://localhost:20128`) prisijunkite naudodami slaptažodį. Antrasis veiksnys praleidžiamas tik tai
     kilmei; visoms kitoms kilmėms kodo vis tiek reikės.
  3. Eikite į Nustatymai → Saugumas → Išjungti, įveskite slaptažodį ir kodo lauką palikite tuščią. `POST /api/auth/mfa/disable` priima užklausos turinį be `code` tik tada, kai kintamasis nustatytas ir užklausa gaunama iš pagrindinio kompiuterio; vis tiek reikalinga skydelio sesija ir dabartinis slaptažodis, o veiksmas užregistruojamas audite kaip
     `auth.mfa.disabled` su `secondFactor: "recovery_switch"`.
  4. Pašalinkite `OMNIROUTE_DISABLE_MFA` reikšmę, paleiskite serverį iš naujo ir, jei reikia, dar kartą
     užregistruokite veiksnį.

## Maršruto klasės

`src/server/authz/types.ts` apibrėžia tris klases; bet koks maršrutas, kurio negalima klasifikuoti deterministiškai, grįžta į `MANAGEMENT`.

| Klasė        | Aprašymas                                                                                                                                                           | Reikalingas autentifikavimas                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `PUBLIC`     | Aiškiai saugūs maršrutai — prisijungimas, atsijungimas, būsena, sveikata, įkrovos įkrovimas.                                                                        | Nėra                                                                        |
| `CLIENT_API` | Modelio aptarnavimo galiniai taškai — `/api/v1/*`, `/api/v1beta/*` ir slapyvardžiai `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Nešiklio raktas, kai įjungta efektyvi `REQUIRE_API_KEY` funkcijos vėliavėlė |
| `MANAGEMENT` | Informacijos suvestinės puslapiai, nustatymai, teikėjai, raktai, administratoriaus ir diagnostikos galutiniai taškai.                                               | Prietaisų skydelio seansas OR Bearer su `manage` apimtimi                   |

Keletas `MANAGEMENT` veiksmų yra** tik operatoriui** : `manage` klavišo neužtenka. Išsaugotų kredencialų eksportavimas (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), atsarginės kopijos atkūrimas naudojant tiesioginius duomenis (`POST /api/db-backups/import` įskaitant `dryRun=true`, `POST /api/db-backups` atkūrimas pagal id , `POST /api/settings/import-json`), atkūrimo taškų naikinimas (`DELETE /api/db-backups` valymas ir `PATCH /api/db-backups` nes saugojimas, kurio reikia, po kiekvienos automatinės atsarginės plokštės datos atsarginės kopijos). CLI tema arba prisijungimas išjungtas. Norint išduoti sinchronizavimo prieigos raktą (`POST /api/sync/tokens`) ir sukurti `admin` CLI prieigos prieigos raktą (`POST /api/cli/tokens`), kiekviename prisijungimo režime reikalingas prietaisų skydelio seansas arba vietinis CLI objektas. bet kokios apimties API raktai ir `oma_` prieigos prieigos raktai nėra operatoriaus kredencialai: jie gauna `403` kai jų reikia. Čekis gyvena `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Prisijungimo parametrus taip pat gali keisti tik operatorius: `POST /api/settings/require-login` (nustatyti valdymo slaptažodį / perjungti `requireLogin`) priima tik tuos kredencialus, kai yra slaptažodis — pirmojo paleidimo įkrovos langas (slaptažodžio dar nėra) nepakeičiamas — ir prietaisų skydelio sesija turi siųsti `currentPassword` kad pakeistų slaptažodį (`403`, kai jis patikrintas kaip neteisingas `settings.update_failed`). Vietinis CLI ir egzempliorius su išjungtu prisijungimu išlaiko atkūrimo kelią ir gali nustatyti slaptažodį be jo, nes abu yra susieti su pagrindiniu kompiuteriu, kuriam priklauso duomenų katalogas.

## Dujotiekis

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

Patikimos vidinės antraštės (apibrėžtos `src/server/authz/headers.ts`) yra** atimta nuo gaunamų užklausų** prieš klasifikuodami — klientai negali iš anksto užpildyti `x-omniroute-auth-*` kad galėtų apsimesti subjektu.

### Politikos sutartys

Kiekviena maršruto klasė turi `src/server/authz/policies/` politiką:

- **`publicPolicy`** (`policies/public.ts`) — visada grąžina `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ekstraktai Nenešėjas, patvirtina per `validateApiKey()`. Patenka į anoniminį tik tada, kai išjungta efektyvi `REQUIRE_API_KEY` funkcijos vėliavėlė. Veiksminga vėliavėlė išsprendžiama naudojant `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), todėl prietaisų skydelio funkcijų vėliavėlės ir aplinkos kintamieji nuosekliai valdo `/api/v1/*`, `/api/v1beta/*` ir slapyvardžius; sprendiklio gedimai nepavyksta uždaryti. Leidžia pateikti informacijos suvestinės seanso užklausas kliento API maršrutuose (įskaitant `/api/v1/models`, naudojamą prietaisų skydelio modelių kataloge). Kai Entra ID SSO yra įjungtas, nešėją, kuri struktūriškai yra Entra prieigos raktas (trys base64url segmentai, `RS*` alg, `kid`), tvarko SSO šaka.** prieš** `validateApiKey()` ir jo sprendimas yra galutinis. — jis niekada nepatenka į API rakto kelią arba į anoniminį atšaką, todėl tapatybės teikėjo gedimas negali tapti atvira prieiga. Statiniai API klavišai neturi įtakos. Žr. [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — priima prietaisų skydelio seansą, vidinio modelio sinchronizavimo užklausas (atitinka `/api/providers/[name]/(sync-models|models)`) arba visiškai praleidžia, jei `isAuthRequired()` grąžina false. Grąžina 403 (`AUTH_001`), kai yra nešiklio ženklas, bet jis negalioja, 401 kitu atveju. Taip pat įgyvendina maršruto apsaugos pakopas (LOCAL_ONLY / ALWAYS_PROTECTED) prieš bet kurią autentifikavimo šaką — see [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY keliai `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (šiandien: `/api/mcp/`) gali būti pasiekiami be kilpos, kai nešiklio raktas turi `manage` sritį; visi kiti LOCAL_ONLY keliai išlieka griežti atgal, nepaisant taikymo srities.

Sėkminga politika grąžina `AuthSubject` su `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Tolesni tvarkytojai gali jį nuskaityti naudodami `assertAuth(request, "CLIENT_API")` `src/server/authz/assertAuth.ts` o ne pakartotinai paleisti autentifikavimo logiką.

## Viešųjų maršrutų sąrašas

`src/shared/constants/publicApiRoutes.ts` yra aiškus leidimų sąrašas:

Sąrašas suskirstytas pagal** forma** , o padalijimas yra nešantis (GHSA-74g9-q8f6-793h): priešdėlis suderinamas su `startsWith()`, taigi jis taip pat atitinka kiekvieną gretimą kelią, dalijantį pagrindinius simbolius. `/api/usage/om-usage` kaip priešdėlis pažymėtas `/api/usage/om-usage<anything>` PUBLIC, o Next išsprendžia, kad `/api/usage/[connectionId]` — tvarkytojas, neturintis savo autentifikavimo.

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

Tik skaitomi maršrutai yra vieši** tik** saugiems metodams. Pastaba: `classifyRoute()` neįtraukia `/api/v1/*` ir `/api/v1beta/*` į PUBLIC kritimo — jie visada yra `CLIENT_API` todėl nešiklio rakto politika vis tiek taikoma.

## Naujo maršruto pridėjimas

### 1 šablonas — viešasis kliento API galinis taškas (Bearer autentifikavimas)

Maršrutai, esantys `/api/v1/` ir `/api/v1beta/`, automatiškai klasifikuojami kaip `CLIENT_API`. Tarpinė programinė įranga užtikrina Bearer patikrą; maršrutų apdorojimo funkcijoms nereikia jos kartoti, tačiau prireikus jos gali nuskaityti subjektą.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... apdorojimo funkcijos logika
}
```

### 2 šablonas — valdymo galinis taškas (seansas arba Bearer + manage)

Naudokite `requireManagementAuth()` iš `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... apdorojimo funkcijos logika
}
```

Sėkmės atveju `requireManagementAuth()` grąžina `null`, o klaidos atveju — JSON klaidos objektą `Response`:

- 401 `AUTH_001` "Būtina autentifikuotis" — visiškai nėra prisijungimo duomenų
- 403 — netinkamas Bearer **arba** Bearer pateiktas, tačiau raktas neturi `manage` / `admin` aprėpties

`hasManageScope(scopes)` grąžina „true“, jei yra `"manage"` arba `"admin"`.

### 3 šablonas — įtraukimas į viešąjį leidžiamų maršrutų sąrašą

Rinkinį pasirinkite pagal formą, o ne pagal patogumą. Vienas maršrutas įtraukiamas į `PUBLIC_API_ROUTES_EXACT` (arba į `PUBLIC_READONLY_CORS_API_ROUTES`, jei jis skirtas tik GET); į `PUBLIC_API_ROUTE_PREFIXES` įtraukiamas tik tikras pomedis, ir jis **privalo baigtis `/`**. Į prefiksų sąrašą įtraukus vieną maršrutą, taip pat paviešinamas kiekvienas gretimas kelias, turintis tuos pačius pradinius simbolius, įskaitant vėliau pridėtus giminingus maršrutus su dinaminiais segmentais (GHSA-74g9-q8f6-793h). Atnaujinkite vienetinius testus failuose `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ir `tests/unit/authz/classify.test.ts`.

## Aprėptys

Trys vardų sritys. Kiekvienas tikrintojas skaito tik savo eilutes. Palyginimas,
įskaitant tai, kodėl `manage` nepavyksta `scopeMatches` dėl `read:compression` ir kodėl `read` prieigos raktas negali `PATCH /api/keys/{id}`, yra
[Trys aprėpties vardų sritys](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API raktai turi `scopes` masyvą (saugomą kaip JSON `api_keys.scopes`, žr. `src/lib/db/apiKeys.ts`).

### Valdymo aprėptis

- `manage` / `admin` — `hasManageScope`. Nešėjo prieiga prie valdymo API maršrutų.
- `mcp:connect`, `self:usage`, `self:account-quota` ir
  `policy:bypass-provider-quota` yra adityvios tikslios atitikties aprėptys. Jos yra už `MANAGEMENT_API_KEY_SCOPES` ribų. `mcp:connect` atidaro tik
  `/api/mcp/` negrįžtamojo ryšio išpjovą.

### MCP įrankio aprėptys

Katalogas ir atitikimo taisyklės (identiška eilutė arba suteikta aprėptis, besibaigianti `*`):
[MCP įrankio aprėptys](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` faile `src/shared/constants/mcpScopes.ts` yra originalus tipizuotas
poaibis, o ne visas katalogas. Vykdymas vyksta
`open-sse/mcp-server/scopeEnforcement.ts` po to, kai `resolveCallerScopeContext()`
išsprendžia aprėptis iš MCP autentifikavimo informacijos, užklausos metaduomenų arba `OMNIROUTE_MCP_SCOPES`.
Jis lieka išjungtas, nebent `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Prieigos rakto aprėptys

`read` / `write` / `admin` ant `oma_live_…` žetonų, reitinguojamų pagal `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Šis reitingas taikomas tik prieigos rakto
kredencialui. Žr. [Valdymo autentifikavimas](../guides/MANAGEMENT-AUTH.md).

## Reikalingas autentifikavimas

`isAuthRequired()` `src/shared/utils/apiAuth.ts` nusprendžia, ar** bet koks** Auth vykdomas užklausai:

- `settings.requireLogin === false` → autentifikavimas yra išjungtas visame pasaulyje, išskyrus visada apsaugotą pakopą (žr. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) ir iškvietimus, išduodančius kredencialus, kuriuos ji priima, kuriems reikalingi tie patys kredencialai kaip ir prisijungiant: sinchronizavimo prieigos raktų išdavimas, CLI prieigos prieigos raktų kalimas bet kokia apimtimi, API rakto suteikimas / `manage` taikymo sritis `requireCredentialForManagementScopedKey()` `admin` `src/lib/api/requireManagementAuth.ts`). Tik išvados raktai lieka atidaryti. Įrašant apsaugotos funkcijos vėliavėlę (`REQUIRE_API_KEY`, kitas saugos žymas ir SSRF / TLS / MCP taikymo srities / smėlio dėžės vėliavėles, išvardytas [Funkcijų vėliavėlėse](../reference/FEATURE_FLAGS.md#rest-api) ) ir išsaugant PII maskavimo nustatymus (`PUT /api/settings/pii`), taip pat reikia kredencialų.
- Nekonfigūruotas slaptažodis** ir** no `INITIAL_PASSWORD` env var → įkrovos režimas leidžia įjungimo vedlį ir atgalinio ryšio užklausas, tačiau atviroms tinklo užklausoms vis tiek reikia kredencialų. Išimtis: norint parašyti apsaugotos funkcijos vėliavėlę ir išsaugoti PII maskavimo nustatymus (`PUT /api/settings/pii`), reikia kredencialo net iš grįžtamojo ryšio, todėl vien atgalinio ciklo neužtenka.
- Bet kokia DB klaida → nepavyksta uždaryti (saugus pagal numatytuosius nustatymus).

Kliento API rakto vykdymas naudoja `isRequireApiKeyEnabled()` `src/shared/utils/featureFlags.ts`, o ne tiesioginį `process.env.REQUIRE_API_KEY` skaitymą. Tai svarbu įdiegtiems egzemplioriams: perjungus `REQUIRE_API_KEY` prietaisų skydelyje → funkcijų vėliavėlės išsaugo DB nepaisymą ir iš karto paveikia `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ir kitus kliento API autentifikavimo patikrinimus, kurie naudojasi šiuo pagalbininku. Jei funkcijos vėliavėlės saugyklos nuskaityti nepavyksta, kliento API autentifikavimas nepavyksta uždaryti ir reikia rakto.

## Nesuderinamas pakeitimas — v3.8.0

Galiniams taškams `/api/v1/agents/tasks/*` ir `/api/resilience/model-cooldowns` **dabar reikalingas valdymo autentifikavimas** (įsipareigojimas `588a0333`). Klientai, anksčiau siuntę įprastą API raktą be `manage` aprėpties, gauna `403`. Migravimas: API Keys valdymo skydelyje suteikite raktui `manage` aprėptį arba naudokite prisijungto valdymo skydelio seansą.

## Veikimo pakeitimas — v3.8.2

`/api/mcp/*` (nuotolinis MCP serveris) pagal numatytąją nuostatą tebėra LOCAL_ONLY, tačiau dabar priima užklausas ne iš vietinio grįžtamojo ryšio adreso, kai antraštėje `Authorization: Bearer <api-key>` pateiktas raktas turi `manage` aprėptį. Ši išimtis kiekvienam keliui aiškiai valdoma per `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` faile `src/server/authz/routeGuard.ts`; susijusio LOCAL_ONLY prefikso `/api/cli-tools/runtime/*` tyčia negalima apeiti, nes jis gali paleisti bet kokius antrinius procesus. Anoniminėms užklausoms į `/api/mcp/*` ne iš vietinio grįžtamojo ryšio adreso ir toliau grąžinama `403 LOCAL_ONLY` — bet kuriam naujam LOCAL_ONLY keliui pagal numatytąją nuostatą tebėra taikomas griežtas vietinio grįžtamojo ryšio adreso reikalavimas. Žr. [Maršrutų apsaugos lygiai](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testavimas

- Vienetų testai: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Viešasis leidžiamų elementų sąrašas: `tests/unit/public-api-routes.test.ts`.
- Tikslinis paleidimas: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Derinimas

Dujotiekis visada antspauduoja atsakymus su:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentifikuotų užklausų užklausų antraštės taip pat apima:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Jei tarpinė programinė įranga buvo apeinama, naudokite `assertAuth(req, expectedClass)` viduje tvarkyklės — ji išmeta `AuthzAssertionError` su kodu `AUTHZ_NOT_INITIALIZED` (padeda užfiksuoti konfigūracijos regresijas testuose).

## Taip pat žr.

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentifikavimo žymė kiekvienam galiniam taškui
- [COMPLIANCE.md](../security/COMPLIANCE.md) — audito žurnalas autentifikavimo įvykiams
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — trys apimties vardų sritys ir MCP įrankių apimties katalogas
- Šaltinis: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
