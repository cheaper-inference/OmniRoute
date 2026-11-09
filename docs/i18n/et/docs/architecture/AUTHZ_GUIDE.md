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

Kasutatakse OpenAI/Anthropic/Gemini-ühilduvate kliendi-API-de ja mõne haldusteekonna puhul, kui võtmel on `manage` ulatus.

```
Authorization: Bearer <api-key>
```

Kontrollitakse funktsioonidega `isValidApiKey()` / `extractApiKey()` failis `src/sse/services/auth.ts` ning eksporditakse uuesti faili `src/shared/utils/apiAuth.ts` kaudu. Valideerija aktsepteerib püsivate läbipääsuvõtmetena ka keskkonnamuutujaid `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (issue #1350).

### 2. Juhtpaneeli seanss (auth_token küpsis)

Juhtpaneeli lehtede ja administraatoritoimingute jaoks.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Küpsis on seanss ainult siis, kui JWT valideerub **ja** sisaldab väärtust `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kõik
küpsise tarbijad (juhtpaneeli marsruudi kaitse (`isDashboardSessionAuthenticated()`), autoriseerimistoru värskendus, WebSocketi käepigistus, aktiivserver, `/api/settings/require-login`, `/api/auth/status`) läbivad selle abifunktsiooni.
Olemas on ka teised `JWT_SECRET`-iga allkirjastatud JWT-d — Cursor CLI edasisaatmine väljastab võtmeomanikele tunnused `iss "omniroute" / aud "cursor-cli"` — ning need ei ole kunagi seansid
(#13298).

Kontrollitakse funktsiooniga `isDashboardSessionAuthenticated()` failis `src/shared/utils/apiAuth.ts`. Toru värskendab JWT-d automaatselt, kui selle 30-päevases kehtivusajas on jäänud vähem kui 7 päeva.

Seanss võib lõppeda ka enne 30 päeva täitumist, sest iga väljastaja läbib funktsiooni `mintDashboardSessionToken` (väljastamisaja `iat` ja ID `jti`) ning valideerija kontrollib kahte seadistust: `sessionsValidAfter`, mis määratakse parooli muutmisel, mistõttu kõik enne seda väljastatud seansid lõpetavad valideerumise (parooli muutnud brauser saab uue küpsise), ning `revokedDashboardSessions`, kuhu `POST /api/auth/logout` lisab väljalogitud seansi `jti`. Vanema väljalaske väljastatud seansid ei sisalda kumbagi väidet ning jäävad kehtima kuni esimese paroolimuudatuseni. Kui seadistusi ei õnnestu lugeda, seanssi ei usaldata.

Mõned haldusteekonnad aktsepteerivad **kumbagi** režiimi: küpsist VÕI `Bearer <key>`-i, kui API-võtmel on `manage` (või `admin`) ulatus. See võimaldab v3.8-s lisatud töövoogu „konfigureeritav API-kutsete kaudu“.

#### Valikuline OIDC-sisselogimise lüüs (#6973)

Juhtpaneeli administraatori sisselogimine toetab vaikimisi parooliga sisselogimise kõrval ka **valikuliselt lubatavat** OIDC (OpenID Connect) voogu — parooliga sisselogimist ei eemaldata kunagi, seda ainult
täiendatakse:

- Keelatud, välja arvatud juhul, kui `settings.oidcEnabled === true` **ning** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` on kõik seadistatud (Seaded → Autentimine).
  `GET /api/auth/oidc/login` tagastab muul juhul `400`.
- `GET /api/auth/oidc/login` tuvastab `authorization_endpoint`-i väljastaja
  `/.well-known/openid-configuration`-ist (varuvariandina kasutatakse
  `<issuer>/authorize`), koostab sissetuleva päringu põhjal ümbersuunamise URI
  (`x-forwarded-proto`-i arvestades) ja suunab kasutaja IdP-sse juhusliku
  `state`-iga, mis salvestatakse `httpOnly` `oidc_state` küpsises.
- `GET /api/auth/oidc/callback` valideerib `state`-i, vahetab autoriseerimiskoodi
  ning kontrollib ID-märgise allkirja väljastaja JWKS-i kaudu
  (`jose`-i `createRemoteJWKSet`, vahemällu salvestatud JWKS URI-de kaupa),
  kontrollides ka `issuer`/`audience` väärtusi. Armatuurlauale pääsemiseks peab
  olema konfigureeritud mittetühi `oidcAllowedSubjects` loend,
  `oidcAdmissionClaim` reegel või mõlemad. Subjektide loend võrdleb `sub`-i või
  `email`-i ainult siis, kui `email_verified === true`. Valikuline claim-reegel
  kasutab punktidega eraldatud ID-märgise claim'i teed (näiteks
  `realm_access.roles`) ja lubatud väärtuste massiivi; lahendatud claim peab olema
  stringide massiiv, mis sisaldab vähemalt üht lubatud väärtust. Kui mõlemad reeglid
  on konfigureeritud, peavad mõlemad läbima. Puuduvad või vigases vormingus claim'id
  nurjuvad vaikimisi turvaliselt ning ilma kummagi reeglita keeldub callback
  sisselogimisest (`not_configured`). Olemasolevad ainult subjektil põhinevad
  konfiguratsioonid jätkavad muutumatult.
- Keycloak kannab realm'i rollid tavaliselt access token'itesse, mitte tingimata
  ID-märgistesse. Realm'i rolli `admin` nõudmiseks konfigureerige selle kliendi
  jaoks protokollimapper, mis lisab `realm_access.roles`-i **ID-märgisesse**, ning
  määrake `oidcAdmissionClaim` väärtuseks
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Enne ainult rollil põhineva ligipääsu lubamist kontrollige selle kliendi tegelikku
  ID-märgise claim'i; rakendus ei loe access token'i rolle. IdP-poolne tokeni
  tagasilükkamine võib seda rakendusepoolset kontrolli täiendada, kuid ei asenda seda.
- Edu korral väljastab see **täpselt sama** 30-päevase `auth_token` JWT, mille
  väljastab parooliga sisselogimine (`src/app/api/auth/login/route.ts`), seega
  ülejäänud armatuurlaua seansi töötlus (automaatne värskendamine, küpsiste lipud)
  jääb muutumatuks — OIDC asendab ainult küpsise väljastamise viisi, mitte seda,
  mida küpsis annab. IdP rollide või gruppide muudatused ei muuda olemasolevaid
  OmniRoute'i seansse kehtetuks; nende kehtivusaega määravad endiselt
  väljalogimine, parooli vahetamine või seansi aegumine.
- Kõik `oidc*` seaded (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) kuuluvad
  `SECURITY_IMPACTING_SETTINGS_KEYS`-i
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  vastab `400 PASSWORD_REQUIRED`, välja arvatud juhul, kui päringu kehas on
  haldusparool `currentPassword`-ina (`401 PASSWORD_MISMATCH`, kui see on vale).
  `oidcDisablePasswordLogin` keelab parooliga _sisselogimise_
  (`POST /api/auth/login`), kuid säilitab salvestatud parooliräsi ning
  uuesti autentimisel kontrollitakse endiselt `currentPassword`-i selle vastu.
- `corsOrigins` ja `bruteForceProtection` kuuluvad samuti
  `SECURITY_IMPACTING_SETTINGS_KEYS`-i: kummagi leevendamine nõrgestab
  sisselogimise kaitsemeetmeid, seega nõuavad need sama `currentPassword`-iga
  uuesti autentimist (vahekaart Turvalisus küsib seda) ning JSON-i import jätab
  need välja.
- Iga turvapoliitika võti — `SECURITY_IMPACTING_SETTINGS_KEYS`-i kirjed,
  kõik `oidc*` võtmed ja armatuurlaua seansi olek — on `PATCH /api/settings`-is
  **ainult operaatorile**: haldusskoopidega API-võti või `oma_` juurdepääsutoken
  lükatakse tagasi `403`-ga isegi siis, kui see saadab õige `currentPassword`-i,
  ning tagasilükkamine auditeeritakse sündmusena `settings.update_failed`
  väärtusega `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` failis `src/lib/api/operatorCredential.ts`).
  Tavalised seaded (teema, kuvamiseelistused) jäävad `manage`-võtme või
  `admin`-juurdepääsutokeniga muudetavaks. Iga `/api/settings` enda muudatus
  (ja ka `/api/settings/require-login`) nõuab samuti `admin`-juurdepääsutokeni
  skoobi (`ADMIN_MUTATION_EXACT_PATHS` failis `src/server/authz/accessScopes.ts`,
  täpse tee vaste); `GET` jääb `read`-iks ning muud `/api/settings/*`
  alamteed (puhverserverid, kombineeritud vaikeväärtused, mudelialiasid,
  tihendamine, puhastamised…) säilitavad meetodi põhjal tuletatud `write`-skoobi.
- `POST /api/settings/import-json` jätab selle uuesti autentimise vahele, seega
  eemaldab enne kirjutamist kõik võtmed loendist `IMPORT_STRIPPED_SETTINGS_KEYS`
  (samas failis): parooli ja `currentPassword`-i, kõik
  `SECURITY_IMPACTING_SETTINGS_KEYS`-i kirjed ning armatuurlaua seansi oleku
  (`sessionsValidAfter`, `revokedDashboardSessions`).
  Vanema varukoopia importimine ei saa seega taastada seanssi, mille parooli
  muutmine või väljalogimine on juba lõpetanud.

#### Valikuline TOTP kahefaktoriline sisselogimine (#16619)

Lubatakse Seaded → Turvalisus kaudu; vaikimisi on see välja lülitatud, kuni operaator
selle sisse lülitab (`src/server/auth/dashboardMfa.ts`).

- **Mida see hõlmab:** parooliga sisselogimist (`POST /api/auth/login`, mis vajab seejärel
  `POST /api/auth/mfa/verify`) ja `omniroute connect`-i (`POST /api/cli/connect`,
  mis keeldub ainult parooliga vahetusest ja võtab koodi väärtusena `totp`).
- **Mida see ei hõlma:** OIDC / SSO-ga sisselogimine (`/api/auth/oidc/callback`) ei
  küsi OmniRoute TOTP-d. See tugineb identiteedipakkuja enda teisele autentimistegurile,
  seega jõustage MFA identiteedipakkujas, kui OIDC on lubatud.
- **Taastamine** (seade on kadunud, taastekoode pole jäänud või tegurit ei saa enam
  kinnitada, näiteks pärast `STORAGE_ENCRYPTION_KEY` muutmist):
  1. Taaskäivitage server, kasutades `OMNIROUTE_DISABLE_MFA=true`.
  2. Logige hostis endas (loopback-kaaslane ja loopback-`Host`, näiteks
     `http://localhost:20128`) parooliga sisse. Teine tegur jäetakse vahele ainult selle päritolu puhul; kõik muud päritolud vajavad endiselt koodi.
  3. Valige Settings → Security → Disable, sisestage parool ja jätke kood tühjaks. `POST /api/auth/mfa/disable` aktsepteerib ilma `code`-ita keha ainult muutuja määramise ajal ja juhul, kui päring tuleb hostist; see nõuab endiselt juhtpaneeli seanssi ja praegust parooli ning selle kohta luuakse auditikirje `auth.mfa.disabled` väärtusega `secondFactor: "recovery_switch"`.
  4. Eemaldage `OMNIROUTE_DISABLE_MFA`, taaskäivitage server ja registreerige vajaduse korral uuesti.

## Marsruudiklassid

`src/server/authz/types.ts` määratleb kolm klassi; iga marsruut, mida ei saa deterministlikult klassifitseerida, liigitatakse vaikimisi klassi `MANAGEMENT`.

| Klass        | Kirjeldus                                                                                                                                                      | Nõutav autentimine                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PUBLIC`     | Selgesõnaliselt turvalised marsruudid — sisselogimine, väljalogimine, olek, tervisekontroll, esmase seadistuse alglaadimine.                                   | Puudub                                                                 |
| `CLIENT_API` | Mudelite teenindamise lõpp-punktid — `/api/v1/*`, `/api/v1beta/*` ning aliased `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Beareri võti, kui jõustuv `REQUIRE_API_KEY` funktsioonilipp on lubatud |
| `MANAGEMENT` | Juhtpaneeli lehed, sätted, teenusepakkujad, võtmed, administraatori- ja diagnostika-lõpp-punktid.                                                              | Juhtpaneeli seanss VÕI Bearer võtmega `manage` ulatus                  |

Mõned `MANAGEMENT`-i toimingud on **ainult operaatorile**: `manage`-võtmest ei piisa. Salvestatud
mandaatide eksportimine (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), varukoopia taastamine aktiivsete andmete peale
(`POST /api/db-backups/import`, sealhulgas `dryRun=true`, `POST /api/db-backups` taastamine ID järgi,
`POST /api/settings/import-json`), taastepunktide kustutamine (`DELETE /api/db-backups` puhastus
ja `PATCH /api/db-backups`, sest selle salvestatav säilitusperiood juhib automaatset kärpimist
pärast iga varukoopiat) nõuavad juhtpaneeli seanssi, kohaliku CLI subjekti või sisselogimise keelamist.
Sünkroonimislubamärgi väljastamine (`POST /api/sync/tokens`) ja `admin` CLI-pääsutokeni vermimine
(`POST /api/cli/tokens`) nõuavad igas sisselogimisrežiimis juhtpaneeli seanssi või kohalikku CLI subjekti.
Mis tahes ulatusega API-võtmed ja `oma_`-pääsutokenid ei ole operaatori mandaadid: need saavad
oleku `403` alati, kui operaatori mandaati nõutakse. Kontroll asub failis
`src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` /
`requireOperatorCredential()`). Sisselogimisseadete muutmine on samuti ainult operaatori õigus:
`POST /api/settings/require-login` (haldussalasõna määramine / `requireLogin` lülitamine) lubab
pärast salasõna olemasolu ainult neid mandaate — esmase käivituse aken (salasõna puudub)
jääb muutmata — ning salasõna asendamiseks peab juhtpaneeli seanss saatma `currentPassword`-i
(`403`, kui see puudub või on vale; auditeeritakse sündmusena `settings.update_failed`). Kohalik CLI
ja sisselogimisega keelatud eksemplar säilitavad taastetee ning võivad määrata salasõna ka ilma selleta,
sest mõlemad on seotud hostiga, millele andmekataloog kuulub.

## Konveier

```
Saabuv päring → src/proxy.ts
  → runAuthzPipeline() failis src/server/authz/pipeline.ts
    1. Usaldusväärsete sisemiste päiste eemaldamine (x-omniroute-auth-*, x-omniroute-route-class)
    2. Päringu ID genereerimine, marsruudi klassifitseerimine funktsiooni classifyRoute() kaudu
    3. Kui pathname == "/" → suuna ümber aadressile /dashboard
    4. Kui toimub tühjendus (sujuv sulgemine) ja tegemist on /api/* päringuga → 503
    5. Kui /api/* päring ei ole GET → kontrolli checkBodySize() kaitset
    6. Kui OPTIONS → CORS-i eelkontroll 204
    7. Kui options.enforce == false → edasta koos route-class päistega
    8. Muul juhul: POLICIES[routeClass].evaluate(ctx)
       - allow  → lisa x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON-i viga koos correlation_id-ga (juhtpaneeli lehed → 302 /login)
```

Usaldusväärsed sisemised päised (määratletud failis `src/server/authz/headers.ts`) **eemaldatakse sissetulevatest päringutest** enne klassifitseerimist — kliendid ei saa subjekti kehastamiseks eeltäita päiseid `x-omniroute-auth-*`.

### Poliitikalepped

Igal marsruudiklassil on poliitika asukohas `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — tagastab alati `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — eraldab Beareri, valideerib selle funktsiooni `validateApiKey()` kaudu. Läheb anonüümseks üle ainult siis, kui tegelik `REQUIRE_API_KEY` funktsioonilipp on keelatud. Tegelik lipp lahendatakse funktsiooni `isRequireApiKeyEnabled()` kaudu (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), mistõttu juhtpaneeli funktsioonilipud ja keskkonnamuutujad juhivad järjepidevalt marsruute `/api/v1/*`, `/api/v1beta/*` ja nende aliaseid; lahendaja tõrked sulgevad juurdepääsu. Lubab juhtpaneeli seansi päringud kliendi API marsruutidel, sealhulgas marsruudil `/api/v1/models`, mida kasutatakse juhtpaneeli mudelikataloogis.
  Kui Entra ID SSO on lubatud, käsitletakse struktuurilt Entra tokenina olevat Bearerit (kolm base64url-segmenti, `RS*` algoritm, `kid`) SSO-harus **enne** funktsiooni `validateApiKey()` ning selle otsus on lõplik — see ei lähe kunagi üle API-võtme teele ega anonüümseks taandumise harusse, mistõttu identiteedipakkuja katkestus ei saa muutuda avatud juurdepääsuks. Staatilisi API-võtmeid see ei mõjuta. Vt [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — aktsepteerib juhtpaneeli seansi, sisemisi mudelite sünkroonimise päringuid (sobitatud mustriga `/api/providers/[name]/(sync-models|models)`) või jätab kontrolli täielikult vahele, kui `isAuthRequired()` tagastab väärtuse `false`. Tagastab väärtuse 403 (`AUTH_001`), kui Beareri token on olemas, kuid kehtetu, muul juhul 401. Samuti jõustab marsruudivalve tasemed (LOCAL_ONLY / ALWAYS_PROTECTED) enne mis tahes autentimisharu — vt [Marsruudivalve tasemed](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY`-i teed prefiksis `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (praegu: `/api/mcp/`) võivad olla mitte-loopback-aadressilt juurdepääsetavad, kui Beareri võti sisaldab ulatust `manage`; kõik muud `LOCAL_ONLY`-i teed jäävad ulatusest olenemata rangelt loopback-põhiseks.

Edukalt lõpetanud poliitika tagastab `AuthSubject`-i, mille `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Alamjärgu töötlejad saavad seda lugeda funktsiooni `assertAuth(request, "CLIENT_API")` kaudu failis `src/server/authz/assertAuth.ts`, selle asemel et autentimisloogikat uuesti käivitada.

## Avalike marsruutide loend

`src/shared/constants/publicApiRoutes.ts` on selgesõnaline lubatud loend:

Loend on jaotatud **kuju** järgi ning jaotus on kriitilise tähtsusega (GHSA-74g9-q8f6-793h): prefiksit
võrreldakse funktsiooniga `startsWith()`, seega vastab see ka kõigile külgnevatele teedele, mille algusmärgid on samad.
`/api/usage/om-usage` prefiksina märgib `/api/usage/om-usage<anything>` PUBLIC-iks ning Next lahendab
selle marsruudiks `/api/usage/[connectionId]` — töötlejaks, millel puudub oma autentimine.

```ts
// Tegelikud alampuud. IGA kirje PEAB lõppema märgiga "/" (üksuse test kontrollib seda).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // käsitletakse classify-funktsioonis kui CLIENT_API-d, mitte kui "autentimiseta avalikku"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Üksikud marsruudid, millele vastatakse TÄPSELT (lõpus oleva kaldkriipsuga või ilma).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // sisselogimise 2. samm valikulise TOTP jaoks; vajab MFA-pending-küpsist
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Kirjutuskaitstud üksikud marsruudid, millele rakendatakse samuti CORS-i päritolu leevendust.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Kirjutuskaitstud üksik marsruut, millele CORS-i leevendust EI rakendata.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Kirjutuskaitstud marsruudid on avalikud **ainult** turvaliste meetodite korral. Märkus: `classifyRoute()` jätab `/api/v1/*` ja `/api/v1beta/*` avalikust varuvariandist välja — need on alati `CLIENT_API`, seega kehtib nende puhul endiselt Bearer-võtme poliitika.

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

## Autentimise nõude lüliti

`isAuthRequired()` failis `src/shared/utils/apiAuth.ts` otsustab, kas päringule rakendatakse **mis tahes** autentimist:

- `settings.requireLogin === false` → autentimine on globaalselt keelatud, välja arvatud alati kaitstud
  taseme puhul (vt [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) ja nende päringute puhul, mis väljastavad
  aktsepteeritava mandaadi ning vajavad sama mandaati nagu sisselogimise korral: sünkroonimislubade väljastamine,
  CLI juurdepääsutõendite loomine mis tahes ulatuses ja API-võtme loomine ulatusega `manage`/`admin`,
  selle ulatuse andmine võtmele või sellise võtme uuesti genereerimine või kuvamine
  (`requireCredentialForManagementScopedKey()` failis `src/lib/api/requireManagementAuth.ts`).
  Ainult järeldamiseks mõeldud võtmed jäävad avatuks. Kaitstud funktsioonilipu kirjutamiseks
  (`REQUIRE_API_KEY`, muud Security-lipud ning [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) loetletud
  SSRF-i / TLS-i / MCP ulatuse / liivakasti lipud) ja PII maskeerimise sätete salvestamiseks
  (`PUT /api/settings/pii`) on samuti endiselt vaja mandaati.
- Parooli pole konfigureeritud **ja** keskkonnamuutujat `INITIAL_PASSWORD` pole → alglaadimisrežiim lubab
  onboarding-viisardi ja loopback-päringud, kuid väljastpoolt pärinevad võrgupäringud vajavad endiselt mandaati.
  Erand: kaitstud funktsioonilipu kirjutamiseks ja PII maskeerimise sätete salvestamiseks
  (`PUT /api/settings/pii`) on mandaat vajalik isegi loopback-päringute korral, seega loopbackist üksi ei piisa.
- Mis tahes andmebaasiviga → päring lükatakse tagasi (turvalisus vaikimisi).

Kliendi API-võtme jõustamine kasutab funktsiooni `isRequireApiKeyEnabled()` failis `src/shared/utils/featureFlags.ts`,
mitte otsest `process.env.REQUIRE_API_KEY` lugemist. See on juurutatud eksemplaride puhul oluline:
`REQUIRE_API_KEY` muutmine jaotises Juhtpaneel → Funktsioonilipud salvestab andmebaasi alistuse ja mõjutab kohe
marsruute `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ning muid kliendi API
autentimiskontrolle, mis kasutavad seda abifunktsiooni. Kui funktsioonilippude hoidlast ei saa lugeda, siis kliendi
API autentimine ebaõnnestub turvaliselt ja nõuab võtit.

## Ühilduvust katkestav muudatus — v3.8.0

Lõpp-punktid `/api/v1/agents/tasks/*` ja `/api/resilience/model-cooldowns` **nõuavad nüüd haldusautentimist** (commit `588a0333`). Kliendid, mis saatsid varem tavalise API-võtme ilma ulatuseta `manage`, saavad vastuseks `403`. Üleviimine: määrake võtmele API Keys juhtpaneelil ulatus `manage` või kasutage sisselogitud juhtpaneeliseanssi.

## Käitumise muudatus — v3.8.2

`/api/mcp/*` (MCP kaugserver) on endiselt vaikimisi LOCAL_ONLY, kuid aktsepteerib nüüd mitte-loopback-päringuid, kui päis `Authorization: Bearer <api-key>` sisaldab ulatust `manage`. Erand lubatakse iga tee jaoks eraldi konstandi `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` kaudu failis `src/server/authz/routeGuard.ts`; sama taseme LOCAL_ONLY prefiksist `/api/cli-tools/runtime/*` ei saa tahtlikult mööda minna, sest see võib käivitada suvalisi alamprotsesse. Mitte-loopback-aadressidelt pärit anonüümsed päringud teele `/api/mcp/*` saavad jätkuvalt vastuseks `403 LOCAL_ONLY` — iga uue LOCAL_ONLY tee vaikekäitumiseks jääb range loopback-piirang. Vt [Marsruudikaitse tasemed](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testimine

- Ühiktestid: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Avalik lubatud loend: `tests/unit/public-api-routes.test.ts`.
- Sihttesti käivitamine: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Silumine

Konveier lisab vastustele alati järgmised päised:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autenditud päringute korral sisaldavad ülesvoolu (käsitlejapoolsed) päringupäised samuti järgmist:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Kasutage käsitlejates `assertAuth(req, expectedClass)` — see väljastab `AuthzAssertionError`i koodiga `AUTHZ_NOT_INITIALIZED`, kui vahevara jäeti vahele (see on kasulik konfiguratsiooni regressioonide tuvastamiseks testides).

## Vaata ka

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — autentimismärgis iga lõpp-punkti kohta
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auditi logi autentimissündmuste jaoks
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — kolm skoobi nimeruumi ja MCP tööriista-skoobi kataloog
- Allikas: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
