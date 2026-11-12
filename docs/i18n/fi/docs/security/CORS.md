# CORS Configuration & Security (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute hallitsee mitä **selaimen alkuperä** voi lukea eri lähteiden vastauksia yhdestä keskitetystä sallittujen luettelosta. Malli on **oletusarvoisesti epäonnistunut** : mitään alkuperää ei sallita, ennen kuin valitset sellaisen. Tällä sivulla kerrotaan, kuinka sallittujen luettelo ratkaistaan, mitä `CORS_ALLOW_ALL=true` todella paljastaa (ja mikä tärkeintä, mitä se tekee **ei** ), kuinka dev vs production määritetään turvallisesti, ja ajonaikainen varoitus kojelaudassa näyttää, kun jokerimerkki on käytössä.

**Totuuden lähde:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Sallittujen luetteloa käytetään kerran, väliohjelmistossa (`src/server/authz/pipeline.ts`) — reittikohtaiset käsittelijät eivät aseta `Access-Control-Allow-Origin` itse.

## Miten alkuperä ratkaistaan

Kullekin pyynnölle väliohjelmisto laskee `Access-Control-Allow-Origin` arvon tässä järjestyksessä:

1. **`CORS_ALLOW_ALL=true`** (tai vanha `CORS_ORIGIN=*`) → toistaa soittajan `Origin` takaisin (tai `*`, kun `Origin` otsikkoa ei ole), `Vary: Origin` llä, jotta välimuistit pysyvät oikein. Sama `applyCorsHeaders()` rikastuspiste myös liittää `Vary: Accept-Encoding` jokaiseen 2xx-rungolla-vasteeseen token-varmennetulla `/v1*`/`/v1beta*` -pinnalla (`relaxForTokenAuth`, RFC 9110 §12.5.5, numero #6737), joten downstream/shared välimuistit voivat erottaa pakatut ja pakkaamattomat variantit oikein.
2. Muussa tapauksessa pyyntö `Origin` normalisoidaan (pienet kirjaimet, perässä oleva kauttaviiva poistetaan) ja sovitetaan **yhdistetty sallittu luettelo** :
   - env **`CORS_ALLOWED_ORIGINS`** — pilkuilla eroteltu luettelo ja
   - suoritusaika **`corsOrigins`** asetus (Dashboard → Security → _CORS Allowed Origins_), injektoitu `setRuntimeAllowedOrigins()` `src/lib/config/runtimeSettings.ts`:n kautta.
3. Ei vastaa →**`Access-Control-Allow-Origin` otsikkoa ei lähetetä** . Selain estää useiden lähteiden lukemisen. Tämä on suunniteltu epäonnistuneen sulkemisen oletusarvo.

| Env var                | Merkitys                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV tarkan alkuperän sallimiseksi (suositus).                                            |
| `CORS_ALLOW_ALL`       | `true`/`1` → toistaa minkä tahansa alkuperän (jokerimerkki). Vain kehittäjä              |
| `CORS_ORIGIN`          | Legacy. `*` käyttäytyy kuin `CORS_ALLOW_ALL`; yksi arvo lisätään sallittujen luetteloon. |

## Uhkamalli —, jonka `CORS_ALLOW_ALL=true` todella paljastaa

Yleinen OWASP varoitus ("jokerimerkki CORS = mikä tahansa sivusto voi kutsua API täsi") kannattaa ottaa vakavasti, mutta OmniRoute:n altistuminen on **kapeampi kuin yleinen tapaus** , koska yksi konkreettinen toteutus seikka:

> **Keski- `applyCorsHeaders()` ei koskaan lähetä `Access-Control-Allow-Credentials`.** Selain ei paljasta _credentialed_ (evästeitä sisältävää) cross-origin -vastausta, ellei palvelin lähetä `Access-Control-Allow-Credentials: true`. OmniRoute:n yhteinen CORS polku ei koskaan toimi.

Mitä tämä tarkoittaa pintaa kohden, jopa `CORS_ALLOW_ALL=true`:

| Pinta                                         | Todennusmekanismi              | Jokerimerkin CORS vaikutus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kojelauta / MANAGEMENT `/api/*`               | Eväste-istunto                 | Alkuperää kaikutaan, mutta **ilman `Allow-Credentials`** selaimessa **lohkot** valtakirja lukea. Haitallinen usean alkuperän sivusto **ei osaa lukea** todennetut hallintapaneelin vastauksesi, eikä istuntoeväste paljasteta.                                                                                                                                                                                                                                                                                                                   |
| Asiakas API `/v1/*`, `/v1beta/*`              | Lähetin / `x-api-key` -otsikko | Jo salliva **suunnittelun mukaan** (`relaxForTokenAuth`): selaimet eivät koskaan liitä `Authorization`/`x-api-key` automaattisesti, joten hyökkääjän sivu ei voi toimittaa avaintasi. Rento kaiku vaatii todennettua aihetta (vahvistetun API -avaimen tai kojelautaistunnon), ei vain valtuustietojen otsikkoa, eikä se koskaan sisällä `Access-Control-Allow-Credentials`. Anonyymit vastaukset (`REQUIRE_API_KEY=false`) käyttävät määritettyä alkuperän sallittujen luetteloa, mukaan lukien eksplisiittinen `CORS_ALLOW_ALL=true` -valinta. |
| Julkinen vain luku -tilassa (`/api/health`,…) | Ei mitään                      | Ei-herkkä; jokerimerkki on vaaraton.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

Joten **jäännös** `CORS_ALLOW_ALL=true` :lle altistuminen rajoittuu: (a) ei-valtuutettuun ristiin **lukee** jo todentamattomista tiedoista ja (b) CORS salliminen **lentoa edeltävä passi** hallintareiteillä —, jotka vaativat edelleen todennusta, jota eri alkuperäsivu ei voi tarjota. Se on **ei** istunnon kaappaus- tai käyttöoikeustietojen varkausvektori jaetulla CORS polulla.

### Yksi aito poikkeus — `/api/v1/agents/`

Cloud-Agent-reitit (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) asettavat oman **oma** CORS otsikot (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ja **tehdä** lähettää `Access-Control-Allow-Origin: <origin>|*` yhdessä `Access-Control-Allow-Credentials: true` kanssa. This is the single surface where origin-echo and credentials coexist, and it is **riippumaton `CORS_ALLOW_ALL`:stä** . These routes are management-authenticated (`requireManagementAuth`); operaattoreiden, jotka paljastavat kojelaudan isäntäkoneen ulkopuolella, tulisi olla tietoisia siitä, että tämä on ainoa paikka, jossa vastausotsikot sallivat useiden lähteiden valtuustietojen lukemisen. Tightening it to an explicit allowlist is tracked separately from this CORS guidance.

## Tuotannon tarkistuslista

- **Älä koskaan aseta `CORS_ALLOW_ALL=true` ta tuotantoon.** Jätä asettamatta.
- Aseta an **selkeää** origin list — either the env var or the Security-tab field:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- If OmniRoute runs behind a reverse proxy / tunnel (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS is **ei** your only control — the loopback route guard still protects spawn-capable routes (see [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Älä väärennä `X-Forwarded-For: 127.0.0.1` tä "korjaamaan" 403:a; that re-opens the RCE class the route guard closes.
- Vahvista ajonaikainen tila: kojelaudassa näkyy a **pysyvä keltainen banneri** under Dashboard → Security → Authorization Inventory whenever `CORS_ALLOW_ALL=true` is live, and `/api/settings/authz-inventory` returns a `cors: { allowAll, allowedOrigins }` envelope monitoring tools can poll.

## Kehittämismukavuus — mahdollistaa tietyn paikallisen alkuperän

Jokerimerkkiä tarvitaan harvoin edes devissä. Salli vain käyttämäsi kehityspalvelimet:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Alkuperät yhdistetään isot ja pienet kirjaimet erottelematta perässä olevaa kauttaviivaa huomiotta, joten `http://localhost:3000` ja `http://localhost:3000/` ovat vastaavia. Sama CSV voidaan asettaa ajon aikana **Dashboard → Security → CORS Sallitut alkuperät** ilman uudelleenkäynnistystä.

## API avaimet vs. evästeistunnot

- **Bearer / `x-api-key` ( `/v1/*` -päättelypinta):** selaimet eivät koskaan liitä näitä automaattisesti. CORS ei ole tässä merkityksellinen este. — API -avain on — -este, minkä vuoksi tämä pinta on tarkoituksellisesti salliva, jotta selain- ja Electron -asiakkaat voivat lukea vastauksia, joihin heillä on jo oikeus. Rento kaiku vaatii todennettua aihetta (vahvistetun API -avaimen tai kojelautaistunnon), ei vain valtuustietojen otsikkoa, eikä se koskaan sisällä `Access-Control-Allow-Credentials`. Anonyymit vastaukset (`REQUIRE_API_KEY=false`) käyttävät määritettyä alkuperän sallittujen luetteloa, mukaan lukien eksplisiittinen `CORS_ALLOW_ALL=true` -valinta. Todennushylkäykset (401) pysyvät luettavissa, jotta asiakkaat voivat tuoda esiin peruutetun tai väärin kirjoitetun avaimen (#5242): liukuhihnan oma 401 säilyttää kaiun ja reitti, joka hylkää itse avaimen sen jälkeen, kun liukuhihna on toiminut sen anonyyminä (`/v1/models` ja `/v1beta/models` hallinnan todennus on määritetty, omistajan laajuinen `/v1/files`, `/v1/batches` `/v1/media`, `/v1/session-leases` ehdokasreitit) lisää kaiun tähän 401:een `credentialRejectionHeaders()` kautta. Kaiku näppäillään pyyntöön, joka sisältää tunnistetietojen otsikon (`Authorization`, `x-api-key`, `x-goog-api-key` tai `auth_token` -eväste), ei kumpaan niistä reitti on tarkistettu, eikä sitä koskaan yhdistetä `Access-Control-Allow-Credentials` kanssa; runko on kiinteä virhekuori. `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) suojaamat `/api/v1/` hallintareitit eivät käytä tätä tunnistetietojen hylkäyspoikkeusta: `REQUIRE_API_KEY=false` kanssa niiden 401/403 vastaukset noudattavat määritettyä CORS alkuperäkäytäntöä.
- **Eväste-istunto (hallintapaneeli):** suojattu epäonnistuneen sulkemisen oletusarvolla **ja** `Access-Control-Allow-Credentials` :n puuttuessa jaetulla polulla. Pidä management/dashboard algorit poissa kaikista sallivista määrityksistä; niiden on pysyttävä täsmälleen epäonnistuneina kiinni.

## WebSocket -kättelyt (`/v1/responses`, `/v1/ws`)

Selaimet eivät käytä CORS ta WebSocket, joten päättelytuloksen palauttavat WebSocket kuljetukset tarkistavat itse kättelyn `Origin` (`src/server/origin/wsOrigin.ts`): vastaukset WebSocket (`/v1/responses`) ja, kun OmniRoute kulkee `npm start` / `npm run dev` kautta, `/v1/ws` ja `/api/v1/ws` sillan, joka suoratoistaa `/v1/chat/completions` `/v1/messages` ja `/v1/responses`. Silta pyytää `/api/v1/ws?handshake=1` ltä tuomiota ja kieltäytyy päivittämästä, ellei tämä reitti suorita tarkistusta. Todennusvaatimukset ovat edelleen voimassa erikseen. Alkuperätarkastus läpäisee, kun:

- sillä ei ole `Origin` -otsikkoa (Codex CLI, SDKs ja muut ei-selainasiakkaat);
- yllä oleva sallittu luettelo sallii `Origin` (`CORS_ALLOWED_ORIGINS`, `corsOrigins` asetus, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` on yksi OmniRoute:n omista julkisista lähteistä (määritetty julkinen URL, luotetun välityspalvelimen edelleenlähetetty alkuperä tai suora loopback/LAN isäntä, joka on annettu IP literaalina tai `localhost` — nä, samat ehdokkaat, joita kojelaudan mutaatiotarkistus käyttää); tai
- siinä on voimassa oleva API avain, kuten HTTP `/v1/*` -pinnalla.

Kaikki muu saa `403 ws_origin_forbidden`. Kojelaudan istunnon eväste ei vapauta ulkomaista `Origin`, koska selain liittää sen minkä tahansa sivun liitäntään. Toisessa portissa olevaa `localhost` ei pidetä samana alkuperänä; lisää tällaiset kehitysalkukohdat `CORS_ALLOWED_ORIGINS`.

## Esimerkki: käänteinen välityspalvelin OmniRoute n edessä

CORS pakottaa OmniRoute itse, joten välityspalvelimen pitäisi yleensä olla **ei** lisätä tai kirjoittaa uudelleen `Access-Control-*` otsikot (kaksoisotsikot rikkovat selaimia). Lopeta TLS ja välitä —, anna OmniRoute vastata esitarkastukseen:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Aseta sallitut selaimen alkuperät OmniRoute :ssa (`CORS_ALLOWED_ORIGINS` tai Suojaus-välilehti), älä välityspalvelimessa.

## Lähdetiedostot

| Koskea                                               | Tiedosto                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Sallittujen luettelon resoluutio + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware-sovellus (yksi totuuden lähde)            | `src/server/authz/pipeline.ts`                                       |
| Asetukset → runtime origin injektio                  | `src/lib/config/runtimeSettings.ts`                                  |
| Kojelaudan ajonaikainen tila                         | `src/app/api/settings/authz-inventory/route.ts`                      |
| Kojelaudan varoitusbanneri                           | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins -kenttä                         | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent reittikohtainen CORS (poikkeus)          | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket handshake `Origin` check                   | `src/server/origin/wsOrigin.ts`                                      |

## Katso myös

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback -valvonta syntymiskykyisille reiteille (erillinen, täydentävä ohjaus).
- [Valtuutusopas](../architecture/AUTHZ_GUIDE.md) — täydellinen todennusputki.
