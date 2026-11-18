# Authorization Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Totuuden lähde:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Viimeksi päivitetty:** 2026-09-22 — laajuuden nimiavaruudet osoittavat tiedostoon MCP-SERVER.md

OmniRoutessa on reittitietoinen valtuutusputki, joka valvoo jokaista API-pyyntöä. Luokittelu on **deterministinen** ja **fail-closed** — kaikki, mitä ei voida luokitella, päätyy `MANAGEMENT`-luokkaan ja vaatii istunnon tai hallintatason tunnuksen. Tämä sivu selittää mallin insinööreille, jotka ylläpitävät reittejä tai suunnittelevat uusia päätepisteitä.

![Valtuutusputki (3 reittiluokkaa + käytäntöjen arviointi)](../diagrams/exported/authz-pipeline.svg)

> Lähde: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Kaksi todennustilaa

### 1. API-avain (Bearer)

Käytetään OpenAI-/Anthropic-/Gemini-yhteensopivissa asiakas-API-liittymissä sekä joissakin hallintareiteissä, kun avaimella on `manage`-käyttöoikeus.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`-tiedoston `isValidApiKey()` / `extractApiKey()` validoi avaimen, ja ne viedään uudelleen käyttöön `src/shared/utils/apiAuth.ts`-tiedoston kautta. Validoija hyväksyy myös `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`-ympäristömuuttujat pysyvinä välitykseen käytettävinä avaimina (ongelma #1350).

### 2. Hallintapaneelin istunto (`auth_token`-eväste)

Hallintapaneelin sivuille ja järjestelmänvalvojan toimintoihin.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Eväste on istunto vain, kun JWT:n allekirjoitus varmistuu **ja** se sisältää `authenticated: true` -arvon
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Jokainen
evästettä käyttävä komponentti (hallintapaneelin reittivartija (`isDashboardSessionAuthenticated()`), valtuutusputken päivitys, WebSocket-kättely, live
server, `/api/settings/require-login`, `/api/auth/status`) käyttää tätä apufunktiota.
Muita `JWT_SECRET`-avaimella allekirjoitettuja JWT-tunnisteita on olemassa — Cursor CLI -välityspalvelin luo
avainten haltijoille `iss "omniroute" / aud "cursor-cli"` -tunnisteita — eivätkä ne ole koskaan istuntoja
(#13298).

Varmistetaan `src/shared/utils/apiAuth.ts`-tiedoston `isDashboardSessionAuthenticated()`-funktiolla. Putki päivittää JWT:n automaattisesti, kun sen 30 päivän voimassaoloajasta on jäljellä alle 7 päivää.

Istunto voi päättyä myös ennen 30 päivän täyttymistä, koska jokainen luoja käyttää `mintDashboardSessionToken`-funktiota (luontiaika `iat` ja tunniste `jti`) ja varmistaja tarkistaa kaksi asetusta: `sessionsValidAfter`, joka asetetaan salasanan vaihdon yhteydessä, jolloin kaikki sitä ennen luodut istunnot lakkaavat läpäisemästä varmennusta (salasanan vaihtanut selain saa uuden evästeen), sekä `revokedDashboardSessions`, johon `POST /api/auth/logout` lisää uloskirjautuneen istunnon `jti`-tunnisteen. Vanhemman julkaisun luomat istunnot eivät sisällä kumpaakaan väitettä, ja ne pysyvät voimassa ensimmäiseen salasanan vaihtoon asti. Jos asetuksia ei voida lukea, istuntoon ei luoteta.

Jotkin hallintareitit hyväksyvät **kumman tahansa** tilan: evästeen TAI `Bearer <key>` -avaimen, kun API-avaimella on `manage`- (tai `admin`-) käyttöoikeus. Tämä mahdollistaa v3.8:ssa lisätyn ”konfiguroitavissa API-kutsujen kautta” -työnkulun.

#### Valinnainen OIDC-kirjautumisrajoitus (#6973)

Hallintapaneelin järjestelmänvalvojan kirjautuminen tukee oletusarvoisen salasanakirjautumisen rinnalla myös
**valinnaisesti käyttöön otettavaa** OIDC- (OpenID Connect) -kulkua —
salasanakirjautumista ei koskaan poisteta, vaan sitä ainoastaan
täydennetään:

- Poistettu käytöstä, ellei `settings.oidcEnabled === true` **ja** kaikkia asetuksia
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` ole määritetty (Asetukset → Todennus).
  `GET /api/auth/oidc/login` palauttaa muutoin vastauksen `400`.
- `GET /api/auth/oidc/login` selvittää `authorization_endpoint`-päätepisteen
  myöntäjän `/.well-known/openid-configuration`-määrityksestä (käyttää
  varmistuksena osoitetta `<issuer>/authorize`), muodostaa uudelleenohjaus-URI:n
  saapuvasta pyynnöstä (`x-forwarded-proto` huomioiden) ja uudelleenohjaa
  identiteetintarjoajalle satunnaisen `state`-arvon kanssa. Arvo tallennetaan
  `httpOnly`-asetuksella määritettyyn `oidc_state`-evästeeseen.
- `GET /api/auth/oidc/callback` vahvistaa `state`-arvon, vaihtaa
  valtuutuskoodin ja tarkistaa ID-tunnisteen allekirjoituksen myöntäjän JWKS:n
  avulla (`jose`-kirjaston `createRemoteJWKSet`, välimuisti JWKS-URI:a kohden)
  sekä `issuer`- ja `audience`-tarkistuksilla. Hallintapaneeliin pääsy edellyttää
  ei-tyhjää `oidcAllowedSubjects`-luetteloa, `oidcAdmissionClaim`-käytäntöä tai
  molempia. Aiheiden luettelo täsmää `sub`- tai `email`-arvoon vain, kun
  `email_verified === true`. Valinnainen claim-käytäntö vastaanottaa
  pisteillä erotellun ID-tunnisteen claim-polun (esimerkiksi
  `realm_access.roles`) ja hyväksyttyjen arvojen taulukon; ratkaistun claimin
  on oltava merkkijonoja sisältävä taulukko, jossa on vähintään yksi hyväksytty
  arvo. Jos molemmat käytännöt on määritetty, molempien on täytyttävä.
  Puuttuvat tai virheelliset claimit hylätään oletusarvoisesti, ja ilman
  kumpaakaan käytäntöä takaisinsoitto estää kirjautumisen (`not_configured`).
  Nykyiset vain aiheeseen perustuvat määritykset jatkavat toimintaansa
  muuttumattomina.
- Keycloak yhdistää realm-roolit yleensä access-tunnisteisiin, ei välttämättä
  ID-tunnisteisiin. Jos haluat edellyttää realm-roolia `admin`, määritä tälle
  asiakkaalle protokollamuunnin, joka sisällyttää `realm_access.roles`-arvon
  **ID-tunnisteeseen**, ja aseta `oidcAdmissionClaim`-arvoksi
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Tarkista tämän asiakkaan todellinen ID-tunnisteen claim ennen
  roolipohjaisen pääsyn käyttöönottoa; sovellus ei lue access-tunnisteiden
  rooleja. Identiteetintarjoajan puolella tehtävä tunnisteen estäminen voi
  täydentää tätä, mutta ei korvaa sovelluksen puolella tehtävää tarkistusta.
- Onnistuneen kirjautumisen jälkeen sovellus luo **täsmälleen saman** 30 päivän
  `auth_token`-JWT:n, jonka salasanakirjautuminen luo
  (`src/app/api/auth/login/route.ts`). Näin muu hallintapaneelin
  istuntoputki (automaattinen päivitys, evästeiden liput) pysyy muuttumattomana —
  OIDC korvaa vain evästeen luontitavan, ei sitä, mitä eväste myöntää.
  Identiteetintarjoajan rooleihin tai ryhmiin tehdyt muutokset eivät mitätöi
  olemassa olevia OmniRoute-istuntoja; niiden voimassaoloa määrittävät edelleen
  uloskirjautuminen, salasanan vaihtaminen tai istunnon vanheneminen.
- Jokainen `oidc*`-asetus (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) kuuluu
  `SECURITY_IMPACTING_SETTINGS_KEYS`-joukkoon
  (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings` vastaa `400 PASSWORD_REQUIRED`, ellei pyynnön runko
  sisällä hallintasalasanaa arvona `currentPassword` (`401 PASSWORD_MISMATCH`,
  jos salasana on väärä). `oidcDisablePasswordLogin` estää salasanalla
  kirjautumisen (`POST /api/auth/login`), mutta säilyttää tallennetun
  salasanatiivisteen, ja uudelleentunnistautuminen tarkistaa edelleen
  `currentPassword`-arvon sitä vasten.
- Myös `corsOrigins` ja `bruteForceProtection` kuuluvat
  `SECURITY_IMPACTING_SETTINGS_KEYS`-joukkoon: kumman tahansa lieventäminen
  heikentää kirjautumisen suojauksia, joten ne edellyttävät samaa
  `currentPassword`-uudelleentunnistautumista (Suojaus-välilehti pyytää sitä),
  ja JSON-tuonti poistaa ne.
- Jokainen suojauskäytännön avain — `SECURITY_IMPACTING_SETTINGS_KEYS`-merkinnät,
  kaikki `oidc*`-avaimet ja hallintapaneelin istunnon tila — on
  `PATCH /api/settings`-pyynnöissä **vain operaattorin käytettävissä**:
  manage-laajuinen API-avain tai `oma_`-käyttöoikeustunniste hylätään
  vastauksella `403`, vaikka sen mukana lähetettäisiin oikea
  `currentPassword`-arvo, ja hylkäys kirjataan tapahtumana
  `settings.update_failed` syyllä `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` tiedostossa
  `src/lib/api/operatorCredential.ts`). Tavallisia asetuksia (teema,
  näyttöasetukset) voi edelleen muuttaa `manage`-avaimella tai
  `admin`-käyttöoikeustunnisteella. Jokainen `/api/settings`-osoitteen
  (sekä `/api/settings/require-login`-osoitteen) muutos edellyttää lisäksi
  `admin`-käyttöoikeustunnisteen laajuutta
  (`ADMIN_MUTATION_EXACT_PATHS` tiedostossa
  `src/server/authz/accessScopes.ts`, täsmällinen polkuosuma);
  `GET` säilyy `read`-laajuutena, ja muut `/api/settings/*`-alireitit
  (välityspalvelimet, yhdistelmäoletukset, mallialiakset, pakkaus,
  tyhjennykset…) säilyttävät metodin perusteella päätellyn `write`-laajuuden.
- `POST /api/settings/import-json` ohittaa tämän uudelleentunnistautumisen,
  joten se poistaa kaikki avaimet `IMPORT_STRIPPED_SETTINGS_KEYS`-joukosta
  (sama tiedosto) ennen kirjoittamista: salasanan ja `currentPassword`-arvon,
  kaikki `SECURITY_IMPACTING_SETTINGS_KEYS`-merkinnät sekä hallintapaneelin
  istunnon tilan (`sessionsValidAfter`, `revokedDashboardSessions`).
  Vanhemman varmuuskopion tuominen ei näin ollen voi palauttaa istuntoa,
  jonka salasanan vaihtaminen tai uloskirjautuminen on jo päättänyt.

#### Valinnainen TOTP-kaksivaiheinen kirjautuminen (#16619)

Kaksivaiheinen kirjautuminen otetaan käyttöön kohdassa Asetukset → Suojaus;
se on poissa käytöstä, kunnes operaattori ottaa sen käyttöön
(`src/server/auth/dashboardMfa.ts`).

- **Mitä se kattaa:** salasanakirjautumisen (`POST /api/auth/login`, joka tarvitsee sen
  jälkeen `POST /api/auth/mfa/verify`) ja `omniroute connect` -komennon (`POST /api/cli/connect`,
  joka kieltäytyy pelkän salasanan vaihdosta ja käyttää koodina arvoa `totp`).
- **Mitä se ei kata:** OIDC- / SSO-kirjautuminen (`/api/auth/oidc/callback`) ei
  pyydä OmniRoute TOTP:tä. Se käyttää identiteetintarjoajan omaa toista
  vahvistustekijää, joten pakota MFA käyttöön IdP:ssä, jos OIDC on käytössä.
- **Palautus** (laite on kadonnut, palautuskoodeja ei ole jäljellä tai tekijää ei
  voi enää vahvistaa, esimerkiksi sen jälkeen, kun `STORAGE_ENCRYPTION_KEY` on
  muuttunut):
  1. Käynnistä palvelin uudelleen komennolla `OMNIROUTE_DISABLE_MFA=true`.
  2. Kirjaudu itse isännässä (silmukkaliitännän vertaisosapuoli ja silmukkaliitännän
     `Host`, kuten `http://localhost:20128`) salasanalla. Toinen vahvistustekijä
     ohitetaan vain kyseisen alkuperän osalta; kaikki muut alkuperät tarvitsevat
     edelleen koodin.
  3. Valitse Asetukset → Suojaus → Poista käytöstä, anna salasana ja jätä koodi
     tyhjäksi. `POST /api/auth/mfa/disable` hyväksyy pyynnön ilman `code`-kenttää
     vain, kun muuttuja on asetettu ja pyyntö tulee isännästä; se edellyttää
     edelleen hallintapaneelin istuntoa ja nykyistä salasanaa, ja tapahtuma
     kirjataan tunnisteella `auth.mfa.disabled` sekä arvolla
     `secondFactor: "recovery_switch"`.
  4. Poista `OMNIROUTE_DISABLE_MFA` käytöstä, käynnistä palvelin uudelleen ja
     rekisteröi MFA uudelleen tarvittaessa.

## Reittiluokat

`src/server/authz/types.ts` määrittelee kolme luokkaa; mikä tahansa reitti, jota ei voida luokitella deterministisesti, kuuluu takaisin `MANAGEMENT`.

| Luokka       | Kuvaus                                                                                                                                                      | Todennus vaaditaan                                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `PUBLIC`     | Erityisen turvalliset reitit — kirjautuminen, uloskirjautuminen, tila, kunto, aloituskäynnistys.                                                            | Ei mitään                                                                     |
| `CLIENT_API` | Mallia palvelevat päätepisteet — `/api/v1/*`, `/api/v1beta/*` sekä aliakset `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Siirtotieavain, kun tehokas `REQUIRE_API_KEY` -ominaisuuden lippu on käytössä |
| `MANAGEMENT` | Kojelautasivut, asetukset, palveluntarjoajat, avaimet, järjestelmänvalvojan ja diagnostiikan päätepisteet.                                                  | Dashboard-istunto OR Bearer `manage` -säteellä                                |

A few `MANAGEMENT` actions are **operator-only**: a `manage` key is not enough. Exporting stored credentials (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), restoring a backup over the live data (`POST /api/db-backups/import` including `dryRun=true`, `POST /api/db-backups` restore by id, `POST /api/settings/import-json`), destroying restore points (`DELETE /api/db-backups` cleanup, and `PATCH /api/db-backups` because the retention it persists drives the automatic pruning after every backup) require a dashboard session, the local CLI subject, or login disabled. Issuing a sync token (`POST /api/sync/tokens`) and minting an `admin` CLI access token (`POST /api/cli/tokens`) require a dashboard session or the local CLI subject in every login mode. API keys of any scope and `oma_` access tokens are not operator credentials: they get `403` whenever one is required. The check lives in `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Changing the login settings is operator-only too: `POST /api/settings/require-login` (set the management password / toggle `requireLogin`) accepts only those credentials once a password exists — the first-run bootstrap window (no password yet) is unchanged — and a dashboard session must send `currentPassword` to replace the password (`403` when it is missing or wrong, audited as `settings.update_failed`). The local CLI and an instance with login disabled keep the recovery path and may set a password without it, since both are bound to the host that owns the data directory.

## Putkilinja

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

Luotetut sisäiset otsikot (määritelty muodossa `src/server/authz/headers.ts`) ovat** poistettu saapuvista pyynnöistä** ennen luokitusta — asiakkaat eivät voi esitäyttää `x-omniroute-auth-*` esiintyäkseen aiheena.

### Vakuutussopimukset

Jokaisella reittiluokalla on käytäntö `src/server/authz/policies/`:ssa:

- **`publicPolicy`** (`policies/public.ts`) — palauttaa aina `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — poimii siirtotiestä, vahvistaa `validateApiKey()` kautta. Menee nimettömäksi vain, kun tehokas `REQUIRE_API_KEY` -ominaisuuden lippu on poistettu käytöstä. Tehokas lippu ratkaistaan `isRequireApiKeyEnabled()` :n (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) avulla, joten hallintapaneelin ominaisuusliput ja ympäristömuuttujat hallitsevat `/api/v1/*`, `/api/v1beta/*` ja aliaksia johdonmukaisesti. Ratkaisijavika epäonnistuu suljettu. Sallii kojelauta-istuntopyynnöt asiakkaan API reiteillä (mukaan lukien `/api/v1/models`, jota käytetään kojelautamalliluettelossa). Kun Entra ID SSO on käytössä, SSO -haara käsittelee siirtotietä, joka on rakenteellisesti Entra-tunnus (kolme base64url-segmenttiä, `RS*` alg, `kid`).** ennen** `validateApiKey()` ja sen tuomio on lopullinen — se ei koskaan putoa API-avaimen polulle tai degrade-anonyymiksi haaralle, joten identiteetintarjoajan katkosta ei voi tulla avointa pääsyä. Staattiset API -näppäimet eivät muutu. Katso [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — hyväksyy kojelautaistunnon, sisäiset mallisynkronointipyynnöt (verrataan `/api/providers/[name]/(sync-models|models)`) tai ohittaa kokonaan, jos `isAuthRequired()` palauttaa epätosi. Palauttaa 403 (`AUTH_001`), kun siirtotie on olemassa, mutta virheellinen, 401 muussa tapauksessa. Pakottaa myös reittivartijatasot (LOCAL_ONLY / ALWAYS_PROTECTED) ennen todennushaaraa — katso [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` :n LOCAL_ONLY polkuja (tänään: `/api/mcp/`) voidaan käyttää ei-paluupalkin kautta, kun siirtotieavain kantaa `manage` aluetta; kaikki muut LOCAL_ONLY polut pysyvät tiukkana takaisinkytkentäisinä laajuudesta riippumatta.

Onnistunut käytäntö palauttaa `AuthSubject` ja `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Alavirran käsittelijät voivat lukea sen `assertAuth(request, "CLIENT_API")` kautta `src/server/authz/assertAuth.ts` ssä sen sijaan, että he suorittaisivat todennuslogiikkaa uudelleen.

## Julkisten reittien luettelo

`src/shared/constants/publicApiRoutes.ts` on selkeä sallittu luettelo:

Lista on jaettu** muoto** , ja jako on kantava (GHSA-74g9-q8f6-793h): etuliite yhdistetään `startsWith()` lle, joten se vastaa myös kaikkia viereisiä polkuja, jotka jakavat johtavat merkit. `/api/usage/om-usage` etuliitteenä merkitty `/api/usage/om-usage<anything>` PUBLIC, ja Next ratkaisee sen `/api/usage/[connectionId]` — -käsittelijäksi, jolla ei ole omaa todennusta.

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

Vain luku -reitit ovat julkisia** vain** turvallisia menetelmiä varten. Huomautus: `classifyRoute()` sulkee pois `/api/v1/*` ja `/api/v1beta/*` PUBLIC fall-through —, ne ovat aina `CLIENT_API` joten siirtoavaimen käytäntö on edelleen voimassa.

## Uuden reitin lisääminen

### Malli 1 — Julkinen asiakas-API:n päätepiste (Bearer-todennus)

Reitit `/api/v1/`- ja `/api/v1beta/`-polkujen alla luokitellaan automaattisesti `CLIENT_API`-reiteiksi. Väliohjelmisto suorittaa Bearer-tarkistuksen; reittikäsittelijöiden ei tarvitse tehdä sitä uudelleen, mutta ne voivat tarvittaessa lukea subjektin.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... käsittelijän logiikka
}
```

### Malli 2 — Hallinnan päätepiste (istunto tai Bearer + manage)

Käytä `requireManagementAuth()`-funktiota tiedostosta `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... käsittelijän logiikka
}
```

`requireManagementAuth()` palauttaa onnistuessaan arvon `null` tai virhetilanteessa JSON-virheen sisältävän `Response`-vastauksen:

- 401 `AUTH_001` "Todennus vaaditaan" — tunnistetietoja ei ole lainkaan
- 403 — virheellinen Bearer **tai** Bearer on annettu, mutta avaimelta puuttuu `manage`- / `admin`-käyttöalue

`hasManageScope(scopes)` palauttaa arvon true, jos käyttöalue on `"manage"` tai `"admin"`.

### Malli 3 — Lisääminen julkisten reittien sallittujen luetteloon

Valitse joukko muodon, älä helppouden perusteella. Yksittäinen reitti lisätään joukkoon `PUBLIC_API_ROUTES_EXACT` (tai vain GET-pyynnöille joukkoon `PUBLIC_READONLY_CORS_API_ROUTES`); vain aito alipuu lisätään joukkoon `PUBLIC_API_ROUTE_PREFIXES`, ja sen **täytyy päättyä merkkiin `/`**. Yksittäisen reitin lisääminen etuliiteluetteloon julkaisee myös kaikki viereiset polut, joilla on samat alkumerkit — mukaan lukien myöhemmin lisättävät dynaamisten segmenttien sisarreitit (GHSA-74g9-q8f6-793h). Päivitä yksikkötestit tiedostoissa `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ja `tests/unit/authz/classify.test.ts`.

## Laajuudet

Kolme nimiavaruutta. Jokainen tarkistaja lukee vain omat merkkijononsa. Vertailu,
mukaan lukien miksi `manage` epäonnistuu `scopeMatches`-tarkistuksessa `read:compression`-kohdalla ja miksi `read`-käyttöoikeustunnus ei voi `PATCH /api/keys/{id}`, löytyy
[Kolme laajuuden nimiavaruutta](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API-avaimet sisältävät `scopes`-taulukon (tallennetaan JSON-muodossa `api_keys.scopes`-kenttään, katso `src/lib/db/apiKeys.ts`).

### Hallintalaajuus

- `manage` / `admin` — `hasManageScope`. Bearer-pääsy hallinnan API-reitteihin.
- `mcp:connect`, `self:usage`, `self:account-quota` ja
  `policy:bypass-provider-quota` ovat additiivisia tarkkoja vastaavuuslaajuuksia. Ne ovat
  `MANAGEMENT_API_KEY_SCOPES`-ulkopuolella. `mcp:connect` avaa vain
  `/api/mcp/`-reitin, joka on ei-loopback-poikkeus.

### MCP-työkalun laajuudet

Luettelo ja vastaavuussäännöt (identtinen merkkijono tai myönnetty laajuus, joka päättyy `*`):
[MCP-työkalun laajuudet](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` tiedostossa `src/shared/constants/mcpScopes.ts` on alkuperäinen tyypitetty
osajoukko, ei koko luettelo. Täytäntöönpano tapahtuu
`open-sse/mcp-server/scopeEnforcement.ts`-tiedostossa sen jälkeen, kun `resolveCallerScopeContext()`
ratkaisee laajuudet MCP-todennustiedoista, pyynnön metatiedoista tai `OMNIROUTE_MCP_SCOPES`-muuttujasta.
Se pysyy poissa käytöstä, ellei `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Käyttöoikeustunnuksen laajuudet

`read` / `write` / `admin` `oma_live_…`-tunnuksissa, järjestetty `scopeSatisfies`-funktion mukaan
(`src/lib/accessTokens/scopes.ts`). Tämä järjestys koskee vain käyttöoikeustunnuksen
tunnistetietoja. Katso [Hallinnan todennus](../guides/MANAGEMENT-AUTH.md).

## Todennus vaaditaan -kytkin

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` päättää, onko** mikä tahansa** todennus pakotetaan pyynnölle:

- `settings.requireLogin === false` → auth on maailmanlaajuisesti poistettu käytöstä, lukuun ottamatta aina suojattua tasoa (katso [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) ja kutsuja, jotka jakavat sen hyväksymän valtuustiedot, jotka tarvitsevat samat valtuustiedot kuin sisäänkirjautumisen yhteydessä: synkronointitunnisteiden myöntäminen, CLI käyttötunnisteiden lyöminen missä tahansa laajuudessa, API avaimen luominen `manage`-`admin` -avaimella. avain tai sellaisen avaimen uudelleen luominen tai paljastaminen (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`). Vain päättelyavaimet pysyvät auki. Suojatun ominaisuuden lipun kirjoittaminen (`REQUIRE_API_KEY`, muut suojausliput ja [Ominaisuusliput](../reference/FEATURE_FLAGS.md#rest-api) -osiossa luetellut SSRF / TLS / MCP-scope / sandbox -liput) ja PII peiteasetusten (`PUT /api/settings/pii`) tallentaminen edellyttävät myös valtuustietoja.
- Salasanaa ei ole määritetty** ja** no `INITIAL_PASSWORD` env var → bootstrap -tila mahdollistaa ohjatun aloitustoiminnon ja takaisinkytkentäpyynnöt, mutta avoimet verkkopyynnöt tarvitsevat silti kirjautumistiedot. Poikkeus: suojatun ominaisuuden lipun kirjoittaminen ja PII peittoasetusten (`PUT /api/settings/pii`) tallentaminen vaativat valtuustiedot jopa silmukasta, joten silmukka itsessään ei riitä.
- Kaikki DB -virheet → epäonnistuu sulkeutumaan (oletussuojattu).

Asiakkaan API -avaimen valvonta käyttää `isRequireApiKeyEnabled()` `src/shared/utils/featureFlags.ts` ssä, ei suoraa `process.env.REQUIRE_API_KEY` lukua. Tällä on merkitystä käyttöönotetuissa tapauksissa: `REQUIRE_API_KEY` vaihtaminen Dashboardissa → Feature Flags tallentaa DB -korjauksen ja vaikuttaa välittömästi `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ja muihin asiakassovellusliittymän todennustarkistuksiin, jotka jakavat tämän apuohjelman. Jos ominaisuuden lippuvarastoa ei voida lukea, asiakkaan API -todennus epäonnistuu ja vaatii avaimen.

## Rikkova muutos — v3.8.0

Päätepisteet `/api/v1/agents/tasks/*` ja `/api/resilience/model-cooldowns` **edellyttävät nyt hallinnan todennusta** (commit `588a0333`). Asiakkaat, jotka aiemmin lähettivät tavallisen API-avaimen ilman `manage`-käyttöoikeusaluetta, saavat vastauksen `403`. Siirtyminen: myönnä avaimelle `manage`-käyttöoikeusalue API Keys -hallintapaneelissa tai käytä sisäänkirjautunutta hallintapaneeli-istuntoa.

## Toiminnan muutos — v3.8.2

`/api/mcp/*` (MCP-etäpalvelin) on edelleen oletusarvoisesti LOCAL_ONLY, mutta hyväksyy nyt muut kuin loopback-pyynnöt, kun `Authorization: Bearer <api-key>` -otsake sisältää `manage`-käyttöoikeusalueen. Poikkeus sallitaan eksplisiittisesti reittikohtaisesti tiedoston `src/server/authz/routeGuard.ts` määrityksellä `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`; rinnakkaista LOCAL_ONLY-etuliitettä `/api/cli-tools/runtime/*` ei tarkoituksella voi ohittaa, koska se voi käynnistää mielivaltaisia aliprosesseja. Anonyymit pyynnöt reitille `/api/mcp/*` muista kuin loopback-osoitteista saavat edelleen vastauksen `403 LOCAL_ONLY` — uusien LOCAL_ONLY-reittien oletuksena säilyy tiukka loopback-rajoitus. Katso [Reittisuojauksen tasot](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testaus

- Yksikkötestit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Julkisten reittien sallittujen luettelo: `tests/unit/public-api-routes.test.ts`.
- Kohdennetun testin suorittaminen: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Virheenkorjaus

Liukulinja leimaa aina vastaukset seuraavasti:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Todennettujen pyyntöjen ylävirran (käsittelijän puolen) pyyntöotsikot sisältävät myös:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Käytä `assertAuth(req, expectedClass)` käsittelijöiden sisällä — se heittää `AuthzAssertionError` koodilla `AUTHZ_NOT_INITIALIZED` jos väliohjelmisto ohitettiin (apua konfiguraatioregressioiden havaitsemiseen testeissä).

## Katso myös

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — todennusmerkintä päätepistettä kohti
- [COMPLIANCE.md](../security/COMPLIANCE.md) — tarkastusloki todennustapahtumille
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — kolme laajuusnimiavaruutta ja MCP-työkalun laajuuskatalogi
- Lähde: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
