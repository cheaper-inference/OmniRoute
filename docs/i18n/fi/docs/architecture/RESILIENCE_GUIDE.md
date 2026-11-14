# Resilience Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute on kolme erillistä, mutta toisiinsa liittyvää joustavuusmekanismia. Jokaisella on eri laajuus ja tarkoitus. Pidä ne erillään, kun korjaat reitityskäyttäytymistä.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Lähde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard ensisijaisuus joustavuuden vaihtajille.** Opt-in resilience vaihtaa ympäristöstä — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — toimittaa vain _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Boolean säilyi `resilienceSettings` (Dashboard →** Asetukset → Resilience** / `PATCH /api/resilience`, tallennettu `key_value`) voittaa env-arvon: normalisointi (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) säilyttää tallennetun loogisen arvon aina, kun sellainen on olemassa. Tällaisen env var:n asettaminen `true` :ksi käyttöönotossa, jossa kojelautaan on jo tallennettu `false` ei siksi muutu mitään. — käännä kytkin sisään** Asetukset → Resilience** (tai tyhjennä tallennettu kenttä) sen sijaan.

## 1. Palveluntarjoajan circuit breaker

**Laajuus:** koko palveluntarjoaja (esim. `glm`, `openai`, `anthropic`).

**Tarkoitus:** lopettaa liikenteen lähettäminen palveluntarjoajalle, joka epäonnistuu toistuvasti upstream-/palvelutasolla.

**Toteutus:**

- Ydinluokka: `src/shared/utils/circuitBreaker.ts`
- Kytkennät: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Tila-API: `GET /api/monitoring/health`
- Nollaus-API: `POST /api/resilience/reset`
- Wrapperit: `open-sse/services/accountFallback.ts`
- Tietokantataulu: `domain_circuit_breakers`

**Tilat:**

- `CLOSED` — normaali liikenne sallittu
- `DEGRADED` — liikenne on edelleen sallittua, mutta kohonneita palveluntarjoajan epäonnistumisia seurataan; palaa tilaan `CLOSED`, kun onnistumisia on kertynyt riittävästi, kun yhteystesti on kelvollinen, tai kun viimeisimmän epäonnistumislajin pisin `OPEN`-jakso (sen `cooldownByKind`-arvo, muuten `resetTimeout`, × `maxBackoffMultiplier`, vähintään yhden jäähdytysajan verran) on kulunut ilman uutta epäonnistumista
- `OPEN` — palveluntarjoaja tilapäisesti estetty; combo-reititys ohittaa sen
- `HALF_OPEN` — nollauksen aikakatkaisu on kulunut; koepyyntö sallittu

**Konfiguroitavat oletusarvot (`open-sse/config/constants.ts`, näkyvissä kohdassa Dashboard → Settings → Resilience):**

| Luokka      | Heikkenee         | Avautuu            | Nollauksen aikakatkaisu |
| ----------- | ----------------- | ------------------ | ----------------------- |
| OAuth       | 5 epäonnistumista | 8 epäonnistumista  | 60s                     |
| API-avain   | 7 epäonnistumista | 12 epäonnistumista | 30s                     |
| Paikallinen | johdettu          | 2 epäonnistumista  | 15s                     |

`degradationThreshold` määrittää, milloin palveluntarjoaja siirtyy tilaan `DEGRADED`; `failureThreshold` määrittää, milloin se avautuu ja ohitetaan. Paikallisten palveluntarjoajien profiileja ei vielä näytetä Resilience-asetussivulla.

**Laukaisukoodit:** vain palveluntarjoajatason tilakoodit `[408, 500, 502, 503, 504]`. ÄLÄ laukaise tilitason virheistä (useimmat 401/403/429 — ne kuuluvat jäähdytykselle tai lukitukselle).

**Laiska palautuminen:** kun `OPEN`-tila vanhenee, `getStatus()`, `canExecute()`, `getRetryAfterMs()` päivittävät tilan arvoksi `HALF_OPEN`. Samat lukutapahtumat (ja seuraava epäonnistuminen) palauttavat vanhentuneen `DEGRADED`-tilan takaisin tilaan `CLOSED`. Tausta-ajastinta ei tarvita.

---

### Valinnainen (opt-in) globaali palveluntarjoajan jäähdytys (ikkunaportti)

Neljäs, **opt-in**-periaatteella otettava kerros (`PROVIDER_COOLDOWN_ENABLED`, oletuksena **pois käytöstä**) pitää pyyntöjen välistä muistia epäonnistuvista palveluntarjoajista tiedostossa `open-sse/services/providerCooldownTracker.ts`. Combo-kohteiden ratkaisu hyödyntää sitä, jotta peräkkäiset combo-pyynnöt eivät enää käy läpi palveluntarjoajaa, joka juuri epäonnistui. Palveluntarjoajatason merkinnät noudattavat `PROVIDER_PROFILES`-ikkunaporttia:

| Profiili  | laukeaa kynnyksen jälkeen (`providerFailureThreshold`) | aikaikkunan sisällä (`providerFailureWindowMs`) | jäähtyy (`providerCooldownMs`) |
| --------- | -----------------------------------------------------: | ----------------------------------------------: | -----------------------------: |
| OAuth     |                                                   `10` |                                         `15min` |                         `5min` |
| API-avain |                                                   `15` |                                         `30min` |                        `10min` |

Kynnyksen alapuolella palveluntarjoajaa **ei** pidetä jäähdytyksessä; onnistuminen tyhjentää ikkunan. Yhteystason merkinnät (`provider:connectionId`) käyttävät sen sijaan eksponentiaalista `minRetryCooldownMs → maxRetryCooldownMs` -backoffia. Ylikirjoitukset: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Regressiosuojaus: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Yhteyden jäähdytys

**Laajuus:** yksi palveluntarjoaja connection/account/key.

**Tarkoitus:** ohita yksi huono avain, kun muut saman palveluntarjoajan yhteydet palvelevat edelleen.

**Toteutus:**

- Merkki ei saatavilla: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valinta: `getProviderCredentials*` samassa tiedostossa
- Jäähdytyslaskenta: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Asetukset: `src/lib/resilience/settings.ts`

**Kentät per yhteys:**

- `rateLimitedUntil` — aikaleima kunnes jäähtymisaika päättyy
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentiaalinen backoff laskuri

**Oletusjäähdytys:**

- OAuth pohja: 5s
- API-avainpohja: 3s
- API-avain 429: suosii ylävirran `Retry-After`/reset headers/parseable nollaustekstiä
- Takaisinkytkentä: `baseCooldownMs * 2 ** failureIndex`

**Palveluntarjoajakohtainen uudelleenyritysten viive.** Palveluntarjoajan tietosivulla on a** Yritä uudelleen viive** valitse (Auto, 15s - 1h). Se säästää `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, `PATCH /api/resilience` kautta). Kun nopeusrajoitusvirhe ei sisällä ylävirran uudelleenyritysvihjettä, tämä arvo korvaa palveluntarjoajan skaalatun peruutuksen ja palauttaa `backoffLevel` arvoon 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Nopeusrajoitetun virheen ensisijaisuus, korkein ensin: ylävirran uudelleenyritysvihje, sitten yhteyskohtainen `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, sitten palveluntarjoajakohtainen uudelleenyrityksen viive, sitten env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` ja sitten skaalattu peruutus. Auto poistaa kentän. Se vaikuttaa vain nopeusrajan syytä, ei koskaan päätetiloihin.

**Ukkosvartija:** estää samanaikaisia vikoja jäähdyttämästä liikaa tai lisäämästä `backoffLevel` kaksinkertaisesti.

**Samanaikaisuusrajan 429:t eivät nouse perääntymistikkailla.** `429` jonka runko ilmoittaa samanaikaisuusrajan ("liian monta samanaikaista pyyntöä", "samanaikaisuusraja", "rinnakkaispyyntöraja", GLM `并发数过高`), tarkoittaa, että tili on kunnossa, mutta varattu. `checkFallbackError()` palauttaa syyn `concurrency_limited`: siirry seuraavaan yhteyteen nyt, jäähdytä tämä kiinteää `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) tai ylävirran uudelleenyritysvinkkiä varten, pidä `backoffLevel` ennallaan ja aseta `skipProviderBreaker`. Eksplisiittinen kiintiön runko voittaa silti, joten myös kiintiömallia vastaava runko pysyy kiintiöpäätöksenä. Tunnistus: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; Tuomio: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (katkaisijan `FailureKind`) on muuttumaton ja lukee edelleen `rate_limit` näille kappaleille.

**Stream-sisältökojut eivät viilennä tiliä.** Kun sisältöpysähdysvahti (`open-sse/utils/streamHandler.ts`) luopuu streamista, joka ei lähettänyt mallitulostetta ajoissa, `markAccountUnavailable()` tallentaa yhteyden virheen, mutta ei aseta jäähdytystä: jumi kuuluu tähän pyyntöön, useimmiten pitkä päättelykierros ilman lähtöä. Operaattorit voivat valita takaisin `resilienceSettings.streamStallCooldown.enabled` llä (oletus `false`).

**Opt-in latenssisignaali `p2c` -tilin valinnassa.** Jokainen lähetetty yritys tallentaa aikansa ensimmäiseen tavuun ja tuloksensa yhteyskohtaisesti (ja yhteyskohtaisen + -mallin mukaan) muistissa olevaan rullaavaan ikkunaan: viimeiset 20 näytettä 15 minuutin sisällä (`open-sse/services/connectionLatencyTracker.ts`, tallennettu `safeLogEvents()` :stä `src/sse/handlers/chatHelpers.ts`:ssä). Kun `resilienceSettings.p2cLatency.weight` on arvon `0` yläpuolella (alue 0-20, oletusarvo `0` = pois päältä), `compareP2CConnections()` in `src/sse/services/auth.ts` laskee yhteen `weight` pisteitä jokaiseen parin ehdokkaaseen. Puolet siitä tulee latenssista suhteessa nopeampaan ehdokkaaseen (kaksi kertaa hitaampi vie koko puolet) ja puolet liukuvasta virhesuhteesta. Termi pätee vain, kun molemmilla ehdokkailla on vähintään 3 näytettä, joten uusia tilejä ei rangaista ja sen yläraja jää alle kiintiösuljettujen ja kiintiöiden loppuun kuluneiden sakkojen. Se ei lisää omaa piiriään: epäonnistuneet tilit käsitellään edelleen jäähdytys-, lukitus- ja katkaisijakerroksilla. Aseta se komennolla `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Päättelykehykset käynnistävät sisällön pysäytysbudjetin uudelleen.** Päättelymalli voi ajatella minuutteja ennen ensimmäistä näkyvää merkkiään: Claude suoratoistaa `thinking_delta` -kehyksiä, joiden ajatteluteksti voi olla tyhjä, ja Responses API suoratoistaa päättelykohteen toisensa jälkeen. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tunnistaa nämä kehykset, ja vahtikoira käynnistää budjetin uudelleen jokaisessa käännöksen peruuttamisen sijaan. Ne eivät edelleenkään ole mallitulosteita, joten käännös, joka päättyy vain päättelyyn, raportoidaan silti tyhjäksi ja käännös, joka lopettaa päättelyn ja lähettää vain sydämenlyöntejä, laukaisee silti vahtikoiran.

Kiro:n binaariset `reasoningContentEvent` kehykset, joissa on ei-tyhjä allekirjoitus, säilyttävät tämän päättelytoiminnon suorittajan kautta tyhjänä `reasoning_content` deltana. Allekirjoitusta ei lähetetä eteenpäin. Metatiedot, epätäydelliset kehykset ja tyhjät allekirjoitukset eivät käynnistä sisältöbudjettia uudelleen. riippumaton aktiivisen virran aikakatkaisu ja asiakkaan peruutus ovat edelleen voimassa (`open-sse/executors/kiro/reasoning.ts`).

**Päätetilat (NOT jäähdytys):**

- `banned` — asetettu kielletyn avainsanan / tilikiellon tunnistuksen avulla (katso [BAN_DETECTION](../security/BAN_DETECTION.md) ). Ylävirran pyyntökohtaiset kieltäytymiset (`request_rejected`, esim. Anthropic OAuth 403 "Pyyntö ei sallittu") eivät koskaan aseta sitä: ne lasketaan kytkentä- ja mallikohtaisesti ja ne otetaan pois kierrosta kasvavan jäähtymisrajan ollessa `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) tai jäähdytetään yhteys, kun mallia ei tunneta. — `open-sse/services/requestRejectedStreak.ts`
- `expired` (siirtymät terminaaliin rajattujen uudelleenyritysten jälkeen — `EXPIRED_RETRY_MAX = 3` eksponentiaalisella perääntymisellä — jotta ohimenevät OAuth -virheet voivat korjata itsensä ennen kuin tili poistetaan pysyvästi)
- `credits_exhausted`

Nämä säilyvät, kunnes tunnistetiedot muuttuvat tai operaattori nollaa ne. Älä kirjoita päätetilojen päälle ohimenevällä jäähdytystilalla.

**Laiska toipuminen:** kun `rateLimitedUntil` on mennyt, yhteys tulee jälleen kelvolliseksi. Onnistuneen käytön yhteydessä `clearAccountError()` tyhjentää kaikki virhekentät.

### Claude OAuth käyttöseinä: alemman prioriteetin kaista + -istuntorajoituksen nollaus

**Laajuus:** yksi Claude -liittymä (OAuth) Molemmat ominaisuudet ovat** opt-in yhteyskohtaisesti** (Muokkaa yhteyden → Claude -osiota → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, molemmat oletusarvoisesti pois päältä) ja peilaa Claude -koodin `/low-priority` ja `/limit-reset` -komennot (johtosopimus kaapattu Claude -koodista 2.1.263).

**Toteutus:**

- Tilakoneen + -vasteluokitus: `open-sse/services/claudeLowPriority.ts`
- Nollaa status/claim -asiakas: `open-sse/services/claudeLimitReset.ts`
- Suoritinkoukku (otsikon lisäys + saman tilin uudelleenyritys): `open-sse/executors/base.ts::execute()`
- Opt-in pysyvyys: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Laukaista:** 5 tunnin käyttöseinä — a `429`, jonka otsikoissa on `anthropic-ratelimit-unified-status: rejected` ja, kun tili on kelvollinen, `anthropic-ratelimit-unified-slow-offer: treatment`. Mitään ei lähetetä ennen ensimmäistä seinää 429; purske 429 ilman yhtenäisiä otsikoita kulkee normaalin jäähtymispolun läpi.

**Alemman prioriteetin kaista** (`lowPriorityMode`):

- Seinällä 429 toimeenpanija hyväksyy tarjouksen ja yrittää välittömästi uudelleen** sama** tili `anthropic-usage-limit: slow`; kaista pysyy aktiivisena ilmoitettuun `anthropic-ratelimit-unified-reset` (+ 60s grace) asti ja jokainen pyyntö tuossa ikkunassa sisältää otsikon. Siepattu 429 ei koskaan saavuta `handleChatCore`, joten yhteys on** ei** laittaa jäähdytykseen eikä sitä käännetä pois.
- `anthropic-ratelimit-unified-slow-status` myöhemmissä vastauksissa: `active` / `not_needed` pidä kaista; `slot_busy` (429) tai `529` odota palvelimen `anthropic-ratelimit-unified-slow-retry-after` (oletus 20 s, clamp 5–600 s, ± 30 % jitter) ja yritä uudelleen, rajoittaa `anthropic-ratelimit-unified-slow-max-wait` (oletus 20 min, puristus 1 min - 6 h) — sen jälkeen, että kaista päättyy ja jäähtyä 10 minuuttia. Odotusta rajoittaa lisäksi se, mikä on jäljellä pyynnön omasta ylävirran aloitusaikakatkaisusta (`resolveFetchStartTimeout`, oletuksena 10 min) miinus 5 s marginaali: ilman tätä rajaa 20 minuutin oletusarvoinen enimmäisodotus kestäisi pyynnön ja nukkuminen keskeytettäisiin odottamisen puolivälissä, jolloin näkyviin tulee `TimeoutError` `max_wait` viileän loppumisen sijaan +.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 tunnin ikkunan kaatuminen tai `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (joka päättyy `extra_usage` ksi missä tahansa tilassa, koska maksettu ylitys kattaa nyt seinän) lopettaa kaistan; sitten vaste virtaa normaalille jäähtymispolulle. `budget_exhausted` muistetaan ilmoitettuun budjetin nollaukseen saakka (≤ 8 päivää).
- Seinätarkistus suoritetaan toteuttajan omien 400 ohjaaman sisäisen yrityksen uudelleenyritysten jälkeen (kontekstin muokkaus, thinking/effort kiinnikkeet, param automaattinen oppiminen), joten seinä 429, joka tulee pintaan vain yhdellä näistä uudelleenyrityksistä, siepataan edelleen sen sijaan, että se saavuttaisi jäähtymispolun.
- Tila on muistissa per yhteys (uudelleenkäynnistys maksaa yhden ylimääräisen seinän 429 uudelleen hyväksymisestä).

**Istuntorajoituksen nollaus** (`autoLimitReset`, yritetty ennen kaistaa, kun molemmat ovat päällä):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` estää; kun `arm: "reset"` ja `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` `{ "program": "juniper_tide" }` kanssa (organisaatio UUID alkaen `providerSpecificData.organizationUUID`, bootstrap-varaus).
- `result: reset|not_limited` → pyyntöä yritetään uudelleen täydellä nopeudella (ei hidasta otsikkoa). `already_used` / `not_offered` memoise `next_available_at` (oletusarvo yksi viikko); mikä tahansa vika peruuntuu 15 minuutin kuluttua. Nollaus tapahtuu kerran viikossa ja se laskee silti viikoittaiseen rajaan.

Regressiovartijat: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Käytä automaattisesti talletettuja nollauksia

**Laajuus:** Codex ja Claude -liittymäliitännät (OAuth).** Osallistu** : `bankedResetAutoApply` asetus on pois päältä ja oletusarvoisesti `dry-run` -tilassa (Asetukset → AI → Käytä tallennetut nollaukset automaattisesti).

**Tarkoitus:** kuluttavat pankin palautuksia itsekseen, kun tili osuu käyttöseinään, sen sijaan, että odottaisi operaattorin painavan "Lunasta" Palveluntarjoajan rajoitukset -sivulla.

| Luottotyyppi (`creditTypes`) | Mitä lunastetaan                                   | Missä se juoksee                                                   |
| ---------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| `codexCredits`               | Codex nollaa krediittejä                           | taustatyö, 60s välein                                              |
| `claudeCredits`              | Claude pankin myöntämät apurahat (`GRANT` credits) | taustatyö, 60s välein                                              |
| `claudeSessionReset`         | Claude viikoittainen istuntorajan nollaus (yllä)   | pyyntöpolku saman käytännön kautta kuin tilikohtainen vaihtokytkin |

**Toteutus:**

- Puhdas päätös (yksi sääntö asetettu molemmille poluille): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Taustatyö: `src/lib/services/bankedResetAutoApply.ts` (alkoi `src/instrumentation-node.ts` ssä)
- Claude -pyyntöpolkuportti: `src/lib/usage/claudeSessionResetPolicy.ts`, rekisteröity `setClaudeLimitResetPolicy()` kautta `open-sse/services/claudeLimitReset.ts` ssä
- Historia, lippikset ja webhook: `src/lib/usage/bankedResetAudit.ts`
- Historia API: `GET /api/settings/banked-reset-auto/history?limit=50` (hallinnon todennus)

**Päätösjärjestys** (ensimmäinen epäonnistunut sääntö on tallennettu syy):

1. Ominaisuus pois käytöstä, luottotyyppi pois käytöstä tai tili soveltamisalan ulkopuolella (`accountScope` `all` / `selected` plus tilikohtainen `connections` kartta).
2. Valinnaisen UTC aikataulun ulkopuolella (`startHourUtc` > `endHourUtc` ylittää keskiyön).
3. Rajat viimeisen 24 tunnin ajalta: `maxPerAccountPerDay` (1), `maxPerDay` (3) ja `minSpacingMinutes` (30) kahden lunastuksen välillä.
4. Liipaisu: aidattu `session` tai `weekly` ikkuna (lue `getQuotaWindowStatus().reachedThreshold` stä, ei `isAccountQuotaExhausted()`, joka raportoi vain tilin jokaisella kulutetulla ikkunalla) tai `expiringCreditHours` (24):n sisällä umpeutuva luotto tilillä, joka on käyttänyt vähintään `expiringCreditMinUsedPercent` :a (50).
5. Luonnollinen nollaussuoja: ohita, kun aidattu 5 tunnin ikkuna nollautuu `sessionResetGuardMinutes` :n (90) sisällä tai aidattu viikoittainen ikkuna `weeklyResetGuardHours` sisällä (12).
6. Viikoittainen kerros: ohita 5 tunnin nollaus, kun viikoittainen jäljellä oleva aika on alle `weeklyFloorPercent` (10).
7. `last-resort` -tila: ohita, kun saman palveluntarjoajan toisella soveltamisalaan kuuluvalla tilillä on vähintään `poolHeadroomPercent` (10) jäljellä molemmissa ikkunoissa. Vanhenevan luotto-laukaisimet ohittavat tämän.
8. `dry-run` tallentaa rivin eikä lunasta mitään; `last-resort` ja `eager` lunastaa.

Puuttuvat kiintiötiedot eivät koskaan avaa lunastusta: tuntematon palautusaika tai viikoittainen käyttö ohittaa.

**Claude -istunnon nollaus:** Kun ominaisuus on pois päältä tai `claudeSessionReset` pois päältä, tilikohtainen `autoLimitReset` -kytkin päättää täsmälleen kuten ennen. Kun molemmat ovat käytössä, ominaisuus korvaa tilikohtaiset valinnat: soveltamisalaan kuuluva tili voi vaatia vain, kun käytäntö sallii sen, ja `dry-run` -tilassa vaatimuksia ei tehdä.

**Turvallisuus:** työ lunastaa enintään yhden pisteen per rasti, tekee päätöksen ennen krediittien listaamista (ohitettua tiliä ei koskaan listata), käyttää idempotenssiavaimia `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` ja peruuttaa tilin 1 tunnin ajan epäonnistuneen listauksen tai lunastuksen jälkeen. Jokainen lunastus, epäonnistuminen ja kuivakäyntipäätös kirjoitetaan `audit_log` (`action: "bankedReset.redeem"`, ei tokeneita tai luottotunnuksia); caps lasketaan noilta riveiltä, joten ne selviävät uudelleenkäynnistyksistä. Onnistuneet lunastukset käynnistävät myös `provider.reset_redeemed` webhookin.

Regressiovartijat: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Istunnon affiniteetti (#7274)

**Laajuus:** yksi asiakasistunto (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` otsikko), joka on kiinnitetty yhteen yhteyteen,** mikä tahansa** tarjoaja.

**Tarkoitus:** Pidä usean kierroksen agentti (Claude koodi, avustaja, mukautetut agentit) samalla tilillä kaikissa pyynnöissä, mikä vähentää tilien välistä kontekstin menetystä ja toistuvia kylmäkäynnistystoimia palveluntarjoajille, joilla on tilikohtainen istuntotila.

**Toteutus:**

- TTL resoluutio: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Otsikon poiminta (yleinen, mikä tahansa toimittaja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Pysyvä neulapöytä: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Asetus: `sessionAffinityTtlMs` (globaali TTL ms, `0` ei käytössä) — `src/lib/db/settings.ts`. Nimetty uudelleen Codex-vain `codexSessionAffinityTtlMs` stä migraatiolla `124_generic_session_affinity_ttl.sql`, joka siirtää minkä tahansa aiemmin määritetyn Codex TTL uutena oletuksena.

Ennen #7274: `resolveSessionAffinityTtlMs()` oli kiinteästi liitetty `0` kaikille palveluntarjoajille paitsi `codex`, joten TTL asetuksella (ja istunnon otsikoilla) ei ollut vaikutusta missään muualla, vaikka kiinnitysmekanismi ja otsikon purkaminen olivat jo palveluntarjoajan agnostikkoja. Korjaus poisti tuon aikaisen palautuksen; TTL koskee nyt yhtenäisesti jokaista palveluntarjoajaa, kun se on asetettu maailmanlaajuisesti `0` yläpuolelle.

Kolmea istuntoaffiniteettiotsikkoa ei koskaan välitetä eteenpäin. — suoritukset rakentavat omat ylävirran otsikkonsa tyhjästä sen sijaan, että välittäisivät asiakasotsikoita läpi, joten tämä pysyy vain sisäisenä korrelaatiotunnuksena.

### Ainutlaatuiset hallitun istunnon yhteysvuokrasopimukset

**Laajuus:** yksi aktiivinen hallittu HTTP client/session omistaa yhden kelvollisen OmniRoute yhteyden.

**Tarkoitus:** tarjoavat kestävän yksinomaisen yhteyden omistusoikeuden asiakkaille, jotka tarvitsevat kovan reititysaidan yli pyyntöjen. Tämä eroaa istunnon affiniteettista, joka on pehmeä jatkuvuusasetus: yksinoikeusvuokrasopimus säilyttää elinkaaren tilan SQLite:ssa, pakottaa maailmanlaajuisen aktiivisen omistajan ja aktiivisen yhteyden ainutlaatuisuuden ja hylkää vanhentuneen sukupolven ennen palveluntarjoajan lähettämistä.

Ominaisuus on valittavissa API -näppäimellä. Hallitulla avaimella on oltava `lease:exclusive` -alue ja selkeä, ei-tyhjä `allowedConnections` luettelo. Mikä tahansa HTTP asiakas voi käyttää elinkaaren päätepistettä; asiakkaan nimeä, käyttäjäagenttia, toimittajaa, OAuth -menetelmää tai mallia ei vaadita. Vuokrasopimus omistaa yhteyden, ei mallia, joten mallin muutos säilyttää sitovuuden, kun yhteys on normaalisti kelvollinen. Normaalimalli-, kiintiö-, terveys-, viilennys- ja sallittujen luettelosäännöt pysyvät pätevinä ja voivat siirtää saman sukupolven toiseen ilmaiseen kelvolliseen yhteyteen.

Elinkaari on `POST /api/v1/session-leases` JSON -toiminnot `acquire`, `renew` ja `release`. Hallitut päättelypyynnöt esittävät läpinäkymättömän `X-OmniRoute-Lease-Owner` arvon ja tarkan `X-OmniRoute-Lease-Generation`. Omistaja käyttää `vlo_`, jota seuraa 43 base64url-merkkiä; vain sen SHA-256 hash on tallennettu. Jokainen lopullinen lähetysaita sitoo myös autentikoidun API -avaimen ID ja aktiivisen yhteyden ID. Vuokraushallinnan otsikot poistetaan lokeista, säilytetyistä pyyntöjen tilannekuvista ja ylävirran suorittajan otsikoista.

Jos tavallisella reitityksellä on kelvollisia hallittuja ehdokkaita, mutta jokainen vapaa ehdokas on ulkomaisen aktiivisen vuokrasopimuksen varassa, OmniRoute palauttaa HTTP `429`, lease-capacity-ei-available -koodin, odotuskapasiteetin tilan ja rajoitetun `Retry-After`, joka on johdettu aikaisimmasta asiaankuuluvasta vanhenemisesta. Tavallinen tyhjä kelpoisuus ei ole vuokrakiista ja säilyttää olemassa olevan reititysvirhesemantiikan.

Asiaan liittyvät mekanismit pysyvät erillisinä:

- OAuth -istunnon käyttöaste on prosessi-paikallinen pehmeä jakelu OAuth -tileille.
- Tilin semaforit myöntävät pyyntöjen samanaikaisuusluvat ja päättyvät, kun pyyntö on valmis.
- Eksklusiiviset hallitut istuntojen vuokrasopimukset ovat kestävää elinkaaren ajan omistusta sukupolven aidalla.

---

## 3. Mallin lukitus

**Laajuus:** palveluntarjoaja + yhteys + malli -kolmikko.

**Tilaan perustuva laajuus:** epäonnistunut tila määrittää, mihin avaimeen lukitus kirjoitetaan
(`resolveLockoutScope()` tiedostossa `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kiintiö- tai käyttöoikeussignaali — lukitse **kiintiöperhe**:
  codexin tapauksessa koko `codex` / `spark` -laajuus (kaikki yhteyden
  `gpt-5*`-mallit), muiden palveluntarjoajien tapauksessa
  `getQuotaScopedModelForProvider()`.
- `404` lukitsee paljaan mallin (`getModelLockKey()` rajaa `not_found`-tilan).
- Kaikki muut tilat — `5xx`-siirto-/palvelinvirheet ja OmniRouten laadun
  tarkistuksen tuottama synteettinen `502` — lukitse vain **tarkka**
  palveluntarjoaja/yhteys/malli-kolmikko. Yhden mallin virheellinen stream ei ole todiste
  tilin kiintiöstä; ennen tätä sääntöä yksi tyhjä vastaus mallissa
  `codex/gpt-5.6-luna` poisti kaikki kyseisen yhteyden `gpt-5*`-mallit
  reitityksestä 2–30 minuutiksi (asteittain pitenevästi), vaikka sen kiintiöön ei
  koskettu.
- Kutsujan eksplisiittinen `scope`-asetus voittaa aina (Antigravity välittää arvon `"exact"`).

**Tarkoitus:** välttää koko yhteyden poistaminen käytöstä, kun vain yksi malli ei ole käytettävissä tai sen kiintiö on rajoitettu.

**Esimerkkejä:**

- Mallikohtaiset kiintiöpalveluntarjoajat, jotka palauttavat arvon 429
- Paikalliset palveluntarjoajat, jotka palauttavat arvon 404 yhden puuttuvan mallin vuoksi
- Palveluntarjoajakohtaiset tila-/mallikäyttöoikeusvirheet (esim. Grok-tilat)

**Toteutus:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Mallien jäähdytyksen hallintapaneeli (v3.8.0)

Käyttöliittymä: Asetukset → Mallien jäähdytys (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Luettelee aktiiviset lukitukset ja näyttää seuraavat tiedot: palveluntarjoaja, yhteys, malli, syy, expiresAt. Ylläpitäjät voivat ottaa mallin manuaalisesti uudelleen käyttöön kortista.

**REST API:**

- `GET /api/resilience/model-cooldowns` — luettele aktiiviset lukitukset
- `DELETE /api/resilience/model-cooldowns` — ota malli manuaalisesti uudelleen käyttöön. Runkosisältö: `{provider, connection, model}`. Todennus: hallinta.

### Jäähdytyksen hallinta

Käyttöliittymä: Valvonta → Jäähdytyksen hallinta (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Yksi sivu jokaiselle yhteydelle, joka on tilapäisen syyn vuoksi poissa reitityksestä, sen sijaan että
jokainen palveluntarjoajan sivu avattaisiin erikseen. Sivulla luetellaan yhteyksien jäähdytykset, mallien lukitukset ja päätetilat, ja ne voidaan tyhjentää yhteyskohtaisesti, valinnan osalta tai palveluntarjoajan kaikkien yhteyksien osalta. Lisäksi sivulla voi muokata eniten säädettyjä jäähdytyssääntöjä: `streamStallCooldown.enabled` sekä OAuth- ja API-avaimen
`connectionCooldown`-jäähdytyksen perusarvoa ja enimmäismäärää asteittaisia palautusaskelia (tallennetaan
kutsulla `PATCH /api/resilience`). Päätetilat (`banned`, `expired`, `credits_exhausted`) luetellaan,
mutta niitä ei koskaan tyhjennetä täällä.

Saman sivun **Virheiden jäähdytyssäännöt** -kortilla muokataan ylläpitäjän virhesääntöjä
(`settings.providerErrorRules`) ja palveluntarjoajakohtaisia yleisiä oletusarvoja
(`settings.providerErrorDefaults`) kutsulla `PATCH /api/settings` — katso kohdan §7
”Ylläpitäjän määrittämät säännöt” siitä, miten ne täsmäävät. Kestot ovat Oletus (ei eksplisiittistä jäähdytystä), 30 min,
1 h, 5 h, 24 h tai mukautettu 1–43 200 minuuttia (30 päivää).

**REST API** (`src/lib/resilience/cooldownManager.ts`, todennus: hallinta):

- `GET /api/resilience/cooldowns[?provider=]` — yhteydet, niiden tila, jäljellä oleva jäähdytys,
  palautusaskel, viimeisin virhetyyppi ja mallien lukitukset (ei tunnistetietoja)
- `POST /api/resilience/cooldowns` — runko `{connectionIds: string[]}` tai
  `{all: true, provider?}`; palauttaa `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Lukituksen asetusten käyttöliittymä + onnistumiseen perustuva palautuminen (v3.8.23)

Mallin lukitus siirtyi aina käytössä olevasta kovakoodatusta toiminnasta täysin määritettäväksi,
käyttäjän erikseen käyttöön ottamaksi ominaisuudeksi, jolla on oma asetuskorttinsa ja itsekorjautuva palautuspolku.

**Asetuskortti:** Asetukset → Mallin lukitus
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tämä on **eri asia** kuin vain luku -tilassa oleva yllä mainittu `ModelCooldownsCard` (joka vain
_luettelee_ aktiiviset lukitukset) — uusi kortti _määrittää asetukset_. Oletusarvot ovat
kohteessa `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Asetus                  | Oletus                           | Merkitys                                                                       |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Pääkytkin — mallin lukitus on **oletusarvoisesti pois käytöstä**.              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ylävirran tilat, jotka lasketaan mallikohtaiseksi virheeksi.                   |
| `baseCooldownMs`        | `120_000` (120 s)                | Ensimmäisen virheen aiheuttaman lukituksen alkuperäinen kesto.                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Asteittain pitenevän jäähdytyksen enimmäiskesto.                               |
| `maxBackoffSteps`       | `10`                             | Eksponentiaalisen palautuksen enimmäismäärä.                                   |
| `useExponentialBackoff` | `true`                           | Kasvatetaanko jäähdytystä toistuvien virheiden yhteydessä eksponentiaalisesti. |

Asetukset tallennetaan normaalin asetussäilön kautta ja validoidaan resilience-asetusten skeemaa käyttäen; kortti rajoittaa arvoja `baseCooldownMs`/`maxCooldownMs`
(siten, että `maxCooldownMs ≥ baseCooldownMs`) sekä arvoa `maxBackoffSteps`.

**Onnistumiseen perustuva palautuminen:** palautuminen ei perustu **pelkästään** ajastimen
umpeutumiseen. Onnistunut vastaus pienentää mallin virhelukua, joten kesken ikkunan palautunut
malli lakkaa kasvattamasta jäähdytystä (ja lukitus poistuu) ennen ajastimen umpeutumista. Kun yhdistelmäkohde onnistuu,
`open-sse/services/combo.ts` kutsuu funktiota `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), joka **puolittaa** tallennetun
`failureCount`-arvon (`Math.floor(failureCount / 2)`); kun arvo saavuttaa `0`:n, lukitusmerkintä poistetaan kokonaan. Vastineena toimiva
`recordModelLockoutFailure()` kasvattaa lukua (ja pidentää jäähdytystä) eskalointi-ikkunan aikana tapahtuvien virheiden yhteydessä. Tämä onnistumiseen perustuva palautuminen toimii tavallisen ajastimen umpeutumisen lisäksi —
kumpi tahansa polku voi ottaa mallin uudelleen käyttöön.

**Tila:** estot säilytetään **muistissa** (prosessikohtaisissa `Map`-kokoelmissa, joiden avaimina ovat
`ModelLockoutEntry`-merkinnät muodossa `provider:connectionId:model`, tarkasti rajatut estot muodossa
`provider:connectionId:exact:model`), eikä niitä tallenneta
tietokantaan — ne menetetään uudelleenkäynnistyksen yhteydessä. _Asetukset_ tallennetaan; aktiivinen
estotila on väliaikainen.

---

## 4. Kiintiön jaon samanaikaisuuden hallinta (v3.8.36)

Tilaustilit (GLM, MiniMax jne.) hyväksyvät usein vain ~ 1–3 samanaikaista pyyntöä; sen ylittäminen laukaisee 429s ja jäähtymisen. Tämä on akuutti alla** kiintiöosuus** (`qtSd/…`) -yhdistelmät, joissa useat API näppäimet jakavat yhden ylävirran tilin. Kolme kerrosta estävät jaetun tilin tulvimisen.

### Yhteyskohtainen samanaikaisuuden yläraja (`max_concurrent`)

Jokainen palveluntarjoajayhteys voi ilmoittaa `max_concurrent` -katon (`provider_connections.max_concurrent`, asetettu yhteyden modaalissa / API / DB). Jätä se tyhjäksi ilman rajoituksia. Tämä on yksi nuppi, joka ohjaa sarjoituskerrosta — alapuolella ja asettaa sen tilin todelliseen samanaikaisuuteen (esim. GLM ~ 1, MiniMax ~ 2).

### Mallikohtaiset samanaikaisuusrajat (`modelConcurrency`)

Yhteys voi lisäksi ilmoittaa tarkat mallikohtaiset samanaikaisuuskatot `rateLimitOverrides` kartassa:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Aseta se yhteysmodaaliin (** Hintaraja ohittaa → -mallikohtaiset samanaikaisuuskatot** , yksi `model=cap` riviä kohden) tai `PATCH /api/providers/[id]` kautta samalla JSON muodolla. Keskeiset semantiikka:

- **Yhteydenlaajuinen vs mallikohtainen:** `maxConcurrent` pysyy jaetun yhteyden laajuisena kattona. Kun molemmat ovat voimassa, molemmat portit hankitaan atomisesti samassa komposiittiportissa (`global → provider → account → model`); tehokas käyttäytyminen on tiukempi sovellettava raja.
- **Tarkka malli-avain vastaavuus:** avain on mallimerkkijono, joka välitetään toteuttajalle reititysresoluution — jälkeen, yleensä paljas ylävirran mallitunnus (`glm-5`), ei asiakaspuolen `provider/model` alias (`zai/glm-5` ei vastaa `glm-5`). Arvot ovat positiivisten kokonaislukujen samanaikaisten pyyntöjen enimmäismääriä.
- **Paikallinen jonotus, ei löytöä:** ylimääräiset pyynnöt jonottavat paikallisesti olemassa olevan queue/timeout semantiikan kanssa (kirjoitettu `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` -pääsyvirheet). OmniRoute ei löydä tai päättele ylävirran käytäntöä — se valvoo operaattorin määrittämiä tarkat enimmäismäärät. Kyllästynyt malliportti ei koskaan poista palveluntarjoajaa käytöstä eikä luo pysyvää mallin lukitusta; ylävirran 429/cooldown/fallback käyttäytyminen on edelleen virheen esto.
- **Yhteyskohtainen, prosessikohtainen laajuus:** caps ovat tietokantayhteyskohtaisia ja säilytetään muistissa, joten kaksi samaa ylävirran API avainta uudelleen käyttävää yhteyttä eivät koordinoi toisiaan.
- **Määrittämätön tarkoittaa muuttumatonta:** kartan jättäminen pois (tai kojelautakentän tyhjäksi jättäminen) ei lisää malliporttia. Esimerkki kokoonpanosta ilman yleispalvelun tarjoajan rajoitusta:

```text
glm-5=1
glm-4.7=3
```

### Kiintiönjakopyynnön sarjoittaminen

Kun kiintiöosuuslähetys kohdistuu yhteyteen, joka ilmoittaa positiivisen `max_concurrent`, samanaikaiset pyynnöt tälle** tili** sarjoitetaan yhteyskohtaisen semaforin kautta (avain `qsconn:<connectionId>`): ylimääräiset pyynnöt** odota jonossa** tilin tulvimisen sijaan. Se on** epäonnistunut** — kyllästynyt jono tai aikakatkaisu etenee ilman aikaväliä sen sijaan, että koskaan hylättäisiin lähetettävä pyyntö. Vaihda sisään** Asetukset → Resilience → Kiintiön osuus yhteyskohtaisesti samanaikaisuus** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, oletus käytössä). Ilman `max_concurrent` korkkia käyttäytyminen ei muutu.

> Kiintiön jaon reititysportti (`selectQuotaShareTarget`, DRR + P2C) on itsessään vikasietoinen ja vain _depriorisoi_ at-cap-yhteyden — jossa on yksiyhteyspooli, jota se ei voi tiukasti rajoittaa, joten tämä semafori on se, joka todella sisältää tulvan.

### Yhdistelmäjäähdytystietoinen uudelleenyritys

Jokaisen yhdistelmästrategian kohdalla (kun käytössä) pyyntö, joka kiteyttää 429:n SHORT ohimenevään jäähtymiseen, odottaa sen ja lähettää uudelleen sen sijaan, että se palauttaisi 429 — Tämä kattaa Gemini-luokan TPM/RPM ikkunat (~ 60s uudelleenyritysten jälkeen) usean mallin yhdistelmässä, esim. molemmissa rajoissa model-model-mallit. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) rajoittama** Asetukset → Resilience** . Se ei koskaan odota `quota_exhausted` (lukittu keskiyöhön asti) tai auth/not-found syistä. Kun `comboTimeoutMs` on asetettu, odotus, joka ei voi päättyä ennen tätä määräaikaa, ei ala (#18998): yhdistelmä vastaa heti päätevastauksellaan `COMBO_TIMEOUT` 504:n sijaan.

Yhdistelmä voi kieltäytyä käytöstä `config.comboCooldownWaitEnabled: false` kanssa. Vain kirjaimellinen `false` poistaa käytöstä nämä jaetut yhdistelmä-odotukset (lähetyksen jälkeiset jäähdytys- ja lähetystä edeltävät circuit-open/model-lock odotukset) ja niiden odotusbudjetin aikakatkaisukerroslaajennus. Puuttuva tai `true` säilyttää globaalin käytännön; `true` ei voi ottaa käyttöön maailmanlaajuisesti käytöstä poistettua odotusta. Selkeä `targetTimeoutMs` voittaa silti. Tämä kieltäytyminen ei muuta erillistä alkuperäisen Codexin kääntönasta ennen lähettämistä.

Sama portti peittää lähettämistä edeltävän tapauksen (#16319): kun yhdistelmän jokainen kohde ohitetaan ennen kuin yritetään tehdä, koska sen malli on lyhyessä ohimenevässä lukituksessa, nollayrityspolku odottaa lukitusta samojen kattojen alla ja lähettää uudelleen sen sijaan, että vastaisi vihjeettömään `503 ALL_TARGETS_SKIPPED`. Kun odotus ei ole sallittua (katto, yritys tai budjetti on käytetty loppuun tai ominaisuus pois päältä), päätteen vastaus päivittyy `429 rate_limit_error`, joka kuljettaa `retry_after` / `reset_at` aikaisimmasta ohimenevän lukon päättymisestä; kiintiö-, todennus- ja ei-found-lukot pitävät vihjettömän 503:n.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Pyyntöjonoon pääsyn hallinta (v3.8.49 · ongelma #6593)

**Laajuus**: paikallinen palveluntarjoaja- ja yhteyskohtainen nopeusrajoitusjono (`open-sse/services/rateLimitManager.ts`,
jonka taustalla toimii Bottleneck), yksi taso edellä kuvattujen kolmen mekanismin alapuolella.

**`maxWaitMs` rajoittaa jonotusaikaa; `executionMaxWaitMs` rajoittaa suoritusaikaa.**
Nämä kaksi on tarkoituksella erotettu toisistaan, eikä kumpikaan vaikuta toiseen.

`resilienceSettings.requestQueue.maxWaitMs` on **jonotusajan enimmäisbudjetti**: se
kattaa palveluntarjoajan vapaan paikan odottamisen ja sitä seuraavan QUEUED-tilassa
vietetyn ajan, ja sen ajastin tyhjennetään heti, kun työ poistuu QUEUED-tilasta ja
sen suoritus alkaa (`rateLimitManager.ts`, `wrappedFn`). Sen ylittävä pyyntö ei
koskaan saavuta ylävirran palvelua. Oletusarvo on 30000ms, ja sen antaa
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` tiedostossa `src/lib/resilience/settings.ts`.
Arvo on kiinnitetty testillä `tests/unit/ratelimit-admission-control-6593.test.ts`,
joten sen muuttaminen saa testin epäonnistumaan sen sijaan, että tämä kappale
jäisi huomaamatta vanhentuneeksi.

`resilienceSettings.requestQueue.executionMaxWaitMs` on arvo, jonka Bottleneck
saa työn `expiration`-arvoksi ja jonka ajastin käynnistyy vasta lähettämisen
jälkeen. Se toimii varmistuksena suorittajille, joilla ei ole omaa ylävirran
aikakatkaisua, ja se nostetaan suorittajan oman haun aloituksen aikakatkaisun
tasolle, jos tämä on pidempi, joten se ei voi katkaista normaalisti toimivaa,
käynnissä olevaa vastausta. Oletusarvo on 600000ms (10 min).

Jonobudjetin syöttäminen `expiration`-arvoksi aiheutti aiemmin sen, että
ei-inkrementaaliset yhdyskäytävät keskeytettiin kesken suorituksen — ne voivat
hyväksyttävästi toimia minuutteja ennen ensimmäisten tavujen saapumista — ja
siksi vanheneminen esitetään muodossa `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), kun taas jonobudjetti käyttää
jonon aikakatkaisukoodia. Kummankin voi ohittaa ympäristömuuttujalla
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` tai hallintapaneelissa
(**Asetukset → Vikasietoisuus**). Molemmat rajataan normalisoinnin yhteydessä
välille 1ms–24h.

**Molempien ensisijaisuusjärjestys:** ympäristömuuttuja määrittää vain
_oletusarvon_. Kohteeseen `resilienceSettings.requestQueue` tallennettu arvo
(hallintapaneelin / API-korjauksen kautta, tallennettuna kohteeseen `key_value`)
ohittaa sen, ja yhteyskohtainen `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` ohittaa puolestaan tämän. Ympäristömuuttujan asettaminen
käyttöönotossa, jossa on jo tallennettu arvo, ei siksi muuta mitään — tyhjennä
tai päivitä sen sijaan tallennettu asetus.

`maxWaitMs` rajoittaa jonossa vietettyä aikaa; alla kuvattu `maxQueueDepth`
rajoittaa sitä, kuinka monta kutsujaa voi olla jonossa samanaikaisesti.

**Vastauksen rungossa ilmoitetut uudelleenyritykset: tahdistus vs. lukitus.**
429-vastauksen runko voi määrittää oman odotusaikansa (Geminin
`RetryInfo.retryDelay`, teksti "retry after Ns"), jonka `updateFromResponseBody`
lukee. Yhteyden `maxWaitMs`-rajaan mahtuva odotus käsitellään tahdistuksena:
rajoitin tyhjentää resurssivarantonsa kyseiseksi ajaksi, ja jonossa olevat kutsut
lähetetään, kun varanto täyttyy uudelleen. `maxWaitMs`-rajaa pidempää odotusta
jono ei voi odottaa loppuun — Gemini vastaa loppuun käytettyyn päiväkohtaiseen
kiintiöön arvolla `retryDelay: "86399s"`. Uudelleen muodostetussa
429-vastauksessa (#16528) välitetty `Retry-After` saa jo varajärjestelmän
lukitsemaan mallin kyseiseksi ajaksi, mutta myös rajoittimen keskeyttäminen sen
ajaksi pysäyttäisi silti jokaisen avaimen ennenaikaisesti saavuttavan kutsun
(esimerkiksi vikasietoisuuden nollauksen jälkeen) koko `maxWaitMs`-ajaksi. Kun
tällainen odotus tulee tyypitetystä Googlen `RetryInfo`-tiedosta
(`google_rpc_retry_info`-alkuperä) ja avaimen rajoitin on jo rajattu malliin
(katso `getLimiterKey`), 429-vastauksesta tulee sen sijaan kyseisen yhteyden
mallilukitus (`lockModelForLongBodyRetry` tiedostossa
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, enintään 24h), eikä
rajoitinta keskeytetä. Tilin valinta ohittaa lukitun tilin `isModelLocked()`-tarkistuksen
perusteella, ja samoin toimii yhdistelmän lähettämistä edeltävä portti kohteille,
jotka on kiinnitetty kyseiseen yhteyteen. Antigravityssa, jossa rajoitin on
kiintiöperhekohtainen, lukitus kohdistuu täsmälliseen malliin samalla tavoin
kuin sen muutkin kiintiölukitukset. Myös asiakkaan pyytämä nimi lukitaan, kun
alias johti kyseiseen malliin, koska nämä tarkistukset käyttävät pyydettyä nimeä;
se lukitaan täsmällisesti (`lockExactModel`), joten antigravity-kiintiöperheen
tai codex-laajuuden ylittävä alias ei koskaan lukitse itseään. Proosamuotoinen
vihje, tyypittämätön `retryDelay` tai koko yhteyden jakama rajoitin säilyttää
keskeytyksen. Kun 429-käsittelypolun juuri uudelleen muodostama rajoitin
keskeytetään, kutsuja, jonka jäljellä oleva jonotusaika päättyy ennen keskeytyksen
päättymistä, hylätään välittömästi jonon aikakatkaisukoodilla
(`checkLimiterPause`) sen sijaan, että se odottaisi ajan loppuun. Tallennettu
päättymisaika ankkuroidaan hetkeen ennen rajoittimen muodostamista, jolloin
Bottleneck käynnistää päivityskellonsa, ja kaikki myöhemmät resurssivarannon
muutokset unohtavat sen. Tämän kattavat testit
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` ja
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — valinnainen pääsyraja (uusi).** `resilienceSettings.requestQueue.maxQueueDepth`
rajoittaa sitä, kuinka monta pyyntöä voi samanaikaisesti odottaa jonossa
(ei vielä lähetettynä) yhtä palveluntarjoaja+yhteys-yhdistelmää kohden. Kun
jonossa on jo `maxQueueDepth` pyyntöä, uusi pyyntö hylätään nopeasti tyypitetyllä
`code: "RATE_LIMIT_QUEUE_FULL"`-virheellä **ennen** kuin se koskaan saavuttaa
kutsua `limiter.schedule()` — hylkäys on siten kevyt ja tapahtuu ennen kyseisen
pyynnön myöhempää kehotteen pakkaus- tai käännöstyötä. Oletusarvo `0` =
poistettu käytöstä, mikä säilyttää nykyisen rajoittamattoman jonon toiminnan;
sallittu väli on 0–100000. Arvon voi ohittaa ympäristömuuttujalla
`RATE_LIMIT_MAX_QUEUE_DEPTH` tai asetuksella
`resilienceSettings.requestQueue.maxQueueDepth` (hallintapaneelin/API:n korjaus).

Pääsytarkistus itsessään on puhdas funktio
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), joten
se voidaan yksikkötestata ilman todellista Bottleneck-rajoitinta.

> RFC, joka avasi tiketin #6593, ehdotti myös
> `bypassCompressionOnRateLimit`-lippua. Tämän repositorion
> `open-sse/services/compression/`-putki on lähtevän LLM-pyynnön
> kehote-/kontekstipakkausta (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy`-lohkon
> tuntumassa), ei HTTP-vastauspakkausta syntetisoiduille
> 429-runkovastauksille — kirjaimelliselle ohituslipulle ei ole
> olemassa vastaavaa koodipolkua. Kyseinen kehotepakkausvaihe
> suoritetaan lisäksi tällä hetkellä _ennen_ `withRateLimit()`-funktiota
> pyyntöputkessa, joten putken uudelleenjärjestäminen sen ohittamiseksi
> jonon täyttymisen aiheuttamassa hylkäyksessä on erillinen, laajempi
> muutos kuin tämän tiketin laajuus; sitä ei tarkoituksella toteutettu
> tässä, vaan se jätettiin jatkotoimeksi, jos prosessorisäästön hyöty
> on uudelleenjärjestelyriskin arvoinen.

### Nopeusrajoituksen automaattisen käyttöönoton turvaverkko ja yhteyssuojaus (`rateLimitProtection`)

**Automaattisen käyttöönoton turvaverkko** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, oletus `true`):
Oletusarvoisesti OmniRoute ottaa automaattisesti käyttöön nopeusrajoituksen jonosuojauksen kaikille aktiivisille API-avaintyyppisille palveluntarjoajayhteyksille (`getProviderCategory(provider) === "apikey"`). Tämä varmistaa, että rajoitusherkkiin upstream-API-avaimiin kohdistuvat saapuvat pyynnöt jonotetaan ja kuristetaan Bottleneckin kautta sen sijaan, että ne purkautuisivat äkillisinä upstream-429-virheinä. Turvaverkko voidaan ohittaa `RATE_LIMIT_AUTO_ENABLE`-ympäristömuuttujalla (`false`/`0`/`off` poistaa käytöstä, `true`/`1`/`on` pakottaa päälle), ja se menee hallintapaneeliin tallennetun asetuksen edelle (**Asetukset → Vikasietoisuus** / `PATCH /api/resilience`).

**Yhteyskohtaisen `rateLimitProtection`-kentän semantiikka:**
Yhteyskohtaista nopeusrajoitussuojausta seurataan palveluntarjoajayhteyksien `rateLimitProtection`-totuusarvokentällä (tallennetaan SQLiteen kenttänä `rate_limit_protection`):

- **Eksplisiittisesti päällä (`rateLimitProtection === true`)**: Nopeusrajoitussuojaus on nimenomaisesti käytössä tälle yhteydelle riippumatta palveluntarjoajan kategoriasta tai siitä, onko automaattisen käyttöönoton turvaverkko päällä.
- **Eksplisiittisesti pois (`rateLimitProtection === false`)**: Poistaa eksplisiittisen suojauksen käytöstä, mutta **ei** vapauta aktiivista API-avainyhteyttä globaalista automaattisen käyttöönoton turvaverkosta. Funktiossa `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) `false` ja `undefined` ovat keskenään yhtäpitäviä: vain `rateLimitProtection === true` tulkitaan eksplisiittiseksi ohitukseksi. Jos `rateLimitProtection` on `false` (tai asettamatta), aktiivinen API-avainyhteys täyttää silti automaattisen käyttöönoton ehdon ja pysyy nopeusrajoitussuojattuna.
- **Ei yhteyskohtaista poisjääntimahdollisuutta**: Operaattori ei voi tällä hetkellä määrittää, että "tämän yksittäisen aktiivisen API-avainyhteyden on toimittava ilman nopeusrajoituksen jonosuojausta", samalla kun automaattinen käyttöönotto pidetään aktiivisena muille. Jotta API-avainyhteydet voisivat toimia kokonaan ilman nopeusrajoitusjonoja, turvaverkko on kytkettävä pois päältä globaalisti (`RATE_LIMIT_AUTO_ENABLE=false` tai `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Tuetut kirjoituspolut:**

- **`POST /api/rate-limits`**: Tuettu hallinnan kirjoituspolku yhteyden `rateLimitProtection`-arvon vaihtamiseksi (`{ connectionId: string, enabled: boolean }`). Kutsu arvolla `enabled: true` kytkee eksplisiittisen suojauksen päälle; kutsu arvolla `enabled: false` poistaa eksplisiittisen suojauksen (tosin aktiiviset API-avainyhteydet pysyvät globaalin turvaverkon suojaamina, jos automaattinen käyttöönotto on päällä).
- **`PUT /api/providers/[id]`**: Ei tarkoituksella hyväksy eikä muuta `rateLimitProtection`-arvoa (#11278). Palveluntarjoajayhteyden metatietojen päivittäminen `PUT /api/providers/[id]`-reitin kautta ei koskaan muuta tallennettua nopeusrajoitussuojauksen tilaa.

---

## 6. Slow-stream-vahtikoira (#9709)

Valinnainen `resilienceSettings.streamRecovery.throughputWatchdog` suoja havaitsee ylävirtaan, joka lähettää edelleen paloja, mutta tuottaa avustajan ulostulon määritetyn hyödyllisen tehon alapuolella. Se eroaa tarkoituksella tyhjäkäynnin aikakatkaisusta: sydämenlyönnit ja metatiedot eivät nollaa ajastinta, eikä niitä lasketa edistykseksi. Se eroaa myös kovan yrityksen määräajasta (#9153), joka on ehdoton turvakatto tulosten laadusta riippumatta.

Vahtikoira vaatii lämpenemisjakson, jota seuraa täydellinen rullaava ikkuna, ennen kuin se voi keskeyttää. Se laskee tekstin deltat Chat Completions and Responses API tulostustapahtumista (konservatiivinen UTF-8 tavuvälityspalvelin), jättää huomioimatta vain käyttöä koskevat tapahtumat ja tyhjät tapahtumat ja keskeyttää harkinnan työkalukutsun tai päättelytapahtumien ollessa käynnissä. Se on oletusarvoisesti poissa käytöstä ja voidaan ottaa käyttöön `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` llä (tämä env-arvo vain siementää oletusarvoisen — jonka tallennettu `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean voittaa; katso tämän oppaan yläosassa olevaa env-vs-dashboard-ensisijaisuushuomautusta); ikkuna, lämpeneminen, miniminopeus ja pienin mitattava teho on rajoitettu normaalin kimmoisuuden asetusten normalisointikerrokseen.

Kun se on käytössä, vahtikoiran keskeytystä sovelletaan vain aktiiviseen ylävirran yritykseen. Ennen asiakkaan näkyviä tavuja olemassa oleva saman tilin varhaisen palautuksen polku voi avata yrityksen uudelleen. Sitoutumisen jälkeen streamia ei koskaan toisteta sokeasti. vain olemassa oleva turvallinen puolivälin jatkosopimus voi ommella jälkiliitteen. Viimeistely pysyy kertaheitolla, joten käyttölaskenta ja semaforien julkaisu eivät ole päällekkäisiä.

---

## 7. Ylävirran tilan uudelleenmäärittely (virheelliset kiintiövirheet)

**Laajuus:** yksi ylävirran yhdyskäytävä, joka ilmoittaa tilapäisestä kiintiön loppumisesta väärällä HTTP-tilalla.

**Tarkoitus:** korjata harhaanjohtava tila ENNEN luokittelua, jotta downstream-kuluttajat (varajärjestelmä, yhdistelmäaggregointi, asiakkaalle palautettava vastaus) näkevät virheen todellisen uudelleenyrityskelpoisen luonteen.

Jotkin yhdyskäytävät ilmoittavat TILAPÄISESTÄ kiintiön loppumisesta
tilalla, joka ei salli uudelleenyritystä. `agentrouter.org` palauttaa `403`-tilan
(ajoittain `400`) kiinankielisellä rungolla
(`用户额度不足` / `额度不足`) tavallisen `429`-tilan sijaan. Claude
Coden kaltaiset asiakkaat käsittelevät `403`-tilaa pysyvänä ja keskeyttävät
istunnon, ja ilman korjausta varajärjestelmä luokittelisi sen
`AUTH_ERROR`-virheeksi kiintiötapahtuman sijaan.

**Toteutus:**

- Rekisteri + täsmäytin: `open-sse/config/upstreamStatusRestatement.ts` — palveluntarjoajakohtainen
  sääntöluettelo (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), jota käsitellään funktion
  `applyStatusRestatement()` kautta.
- Kutsukohta: `providerFailure:`-lohko tiedostossa `open-sse/handlers/chatCore.ts`
  (rivin 3654 tienoilla), heti sen jälkeen kun `parseUpstreamError()` on
  jäsentänyt ylävirran vastauksen, jolla on virheen HTTP-tila
  (`!providerResponse.ok`), ja ennen minkään luokittelun suorittamista, jotta
  jokainen downstream-kuluttaja näkee korjatun tilan. `200`-tilaisessa SSE-virrassa
  olevat virheet kulkevat erillisen, myöhemmän virran jäsennysreitin kautta, eivätkä
  siksi kuulu tällä hetkellä tämän käsittelykoukun piiriin — tämä on tunnettu rajoitus,
  jota ei vielä tarvita agentrouterin virheellisen tilan tapauksessa (joka
  ilmenee virheen HTTP-tilana).
- Uudelleenyrityskelpoisuus: `429` kuuluu kohteeseen
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), joten uudelleenmääritetty
  virhe sisältää todellisen uudelleenyritysikkunan sen sijaan, että se ilmenisi
  päättyneenä `403`-virheenä.
- Synteettinen `60s`-arvo `defaultRetryAfterMs`-kentässä
  (`upstreamStatusRestatement.ts`) on vain se, minkä uudelleenmääritetty vastaus kertoo
  **asiakkaalle**; se ei itsessään ole yhteyden sisäinen jäähdytys- tai lukitusaika —
  sen määrittää erikseen se mekanismi, joka tosiasiassa käsittelee uudelleenmääritetyn
  virheen (Connection Cooldownin kasvava backoff, §2, API-avainpalveluntarjoajien
  perusarvolla `3s`; tai Model Lockout, §3, mallikohtaista kiintiötä käyttävillä
  palveluntarjoajilla, kuten agentrouterilla). Reititin voi tulla sisäisesti
  uudelleenyrityskelpoiseksi ennen asiakkaalle ilmoitettavan 60 sekunnin ikkunan
  päättymistä — tämä on tarkoituksellista pelivaraa, ei virhe.

Pysyviä virheitä (agentrouterin `无权访问模型` — tähän malliin ei ole pääsyä) ei
KOSKAAN määritetä uudelleen: `excludeMarkers` estää säännön, vaikka
`textMarkers` täsmäisi, joten virhe säilyttää alkuperäisen tilansa eikä sitä
yritetä uudelleen loputtomasti. Vastaava palveluntarjoajan luokittelusääntö
(`agentrouter-model-access-denied` tiedostossa `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, ilmoitettu `6h`:n perusjäähdytys)
tarkistetaan funktion `checkFallbackError` (`open-sse/services/accountFallback.ts`)
avulla _ennen_ yleistä apikey-luokan `FORBIDDEN`-pikapalautusta, ja se on
riippuvainen funktiosta `honorsRuleLockScope(provider)` (#10334 — tällä hetkellä
yksinomaan agentrouter käytössä `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen
palveluntarjoajien luettelon kautta tiedostossa
`providerErrorRules.ts`). Säännön ilmoitettu 6 tunnin jäähdytys kulkee läpi
arvona `fallbackResult.baseCooldownMs`, mutta se syötetään edelleen ennestään
olemassa olevaan mallikohtaiseen kiintiölukituspolkuun
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`; #10334 ei muuttanut sitä lukuun ottamatta
jäähdytyksen lähdettä): se rajoitetaan operaattorin
`mlSettings.maxCooldownMs`-arvoon (oletuksena `1_800_000ms` / 30 min), kuten
kaikki muutkin mallilukitukset, ja _pysyvään lukitukseen tallennettu syy_ säilyy
ennestään kovakoodattuna arvona `"forbidden"` eikä muutu säännön arvoksi
`"auth_error"` — ainoastaan jäähdytyksen kesto otetaan huomioon päästä päähän,
ei syymerkkijono. Yhteys itsessään säilyy aktiivisena; saman yhteyden
sisarusmallit eivät vaikutu.

Uudelleenmääritetyt kiintiövirheet (`额度不足`) osuvat tuotannossa
palveluntarjoajan sääntöön (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ei omaa ilmoitettua jäähdytystä — pysyvyyskerroksen skaalattu
oletus-backoff pätee). #10334:n jälkeen `scope` kohteessa
`ProviderErrorRuleMatch` KÄYTETÄÄN päästä päähän, mutta **vain**
palveluntarjoajille, jotka kuuluvat `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen
palveluntarjoajien luetteloon (`providerErrorRules.ts` — tällä hetkellä vain
`"agentrouter"`, funktion `honorsRuleLockScope()` kautta). Kaikilla muilla
palveluntarjoajilla `scope` säilyy informatiivisena, täsmälleen kuten ennen
#10334:a. `checkFallbackError` välittää täsmäytetyn säännön scopena arvon
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) on jaettu tarkistus, joka vahvistaa, että
`ruleScope` on aidosti turvallinen käsitellä yhteydenlaajuisena,
itsestään palautuvana signaalina (scope `"connection"`, syy
`quota_exhausted`, ei koskaan `permanent` eikä `creditsExhausted` — suoja
tulevaa sääntöparia vastaan, jossa scope `"connection"` yhdistettäisiin
pysyvään tilitilaan). Sitä kutsuu kaksi kuluttajaa:

- **Pysyvyys** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  sen sijaan että se päätyisi passthrough-palvelun **mallikohtaiseen** estohaaraan
  (agentrouter on `passthroughModels: true` → `hasPerModelQuota()`
  palauttaa arvon `true`), se ottaa käyttöön **väliaikaisen yhteyden jäähdytysajan** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ei koskaan päätetilaa
  (`credits_exhausted`/`banned`/`expired`) — joten yhteys palautuu itsestään
  jäähdytysajan päätyttyä eikä tunnistetietoja tarvitse palauttaa manuaalisesti.
  Ohitetaan yhteyksillä, joiden asetuksena on `disableCooling: true` (#2997):
  tämä poiskytkentä ohjaa sen sijaan mallikohtaiseen estoon (dokumentoitu kompromissi —
  katso haaran yläpuolella oleva koodikommentti).
- **Saman pyynnön yhdistelmäreititys** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): sama suoja merkitsee
  yhteyden muistiissa pidettävään `exhaustedConnections`-joukkoon avaimella
  `${provider}:${connectionId}`. Tämä ohittaa vain jäljellä olevan SAMAN PYYNNÖN
  kohteen, joka _itse sisältää jo kyseisen `connectionId`-arvon_ omassa
  kohdeobjektissaan (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ennen `exhaustedConnections`-hakua) — tavallinen
  malliluetteloyhdistelmä, jossa sisaruskohteet eivät sisällä omaa sidottua
  `connectionId`-arvoa ja joka ratkaistaan vain lähetyskohtaisesti vastauksen
  `X-OmniRoute-Selected-Connection-Id`-otsakkeesta, ei koskaan osu tähän
  avainosumaan. Tässä yleisessä tapauksessa todellinen suoja jäljellä olevaa
  osaa vastaan, joka käyttäisi juuri käytöstä poistettua tiliä uudelleen, EI ole
  tämä Set-joukko — vaan yllä kuvattu pysyvyyskerros (yhteyden
  `rateLimitedUntil` on nyt tulevaisuudessa) yhdessä tämän saman suojan kanssa,
  joka estää `transientRateLimitedProviders`-arvon lisäämisen tähän virheeseen
  (katso "Kaksivaiheinen suunnittelu" ja `targetExhaustion.ts`-tiedoston
  `isAgentrouterConnectionQuotaScope`-haaran koodikommentti): koska Set-joukkoon
  ei lisätä merkintää, `combo.ts`:n `allowRateLimitedConnection`-pakko-ohitus
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) EI aktivoidu palveluntarjoajan
  jäljellä oleville osille, joten tunnistetietojen valinnan
  `rateLimitedUntil`-suodatin (`src/sse/services/auth.ts:1238`) toimii normaalisti
  ja jäljellä oleva osa joko valitsee toisen, edelleen kelvollisen agentrouter-yhteyden
  tai epäonnistuu ilman käytettävissä olevia tunnistetietoja — se ei pakota itseään
  takaisin yhteydelle, jonka tämä haara juuri jäähdytti.

### Kaksivaiheinen suunnittelu: tilan uudelleenilmaisu ja luokittelu

Tilan uudelleenilmaisu (`upstreamStatusRestatement.ts`) ja palveluntarjoajan
luokittelusäännöt (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ovat erillisiä rekistereitä, jotka käyttävät avaimina
sekä palveluntarjoajan tunnistetta että tekstimerkkejä, mutta ne suoritetaan eri
paikoissa ja palvelevat eri tarkoituksia: uudelleenilmaisu kirjoittaa HTTP-tilan
uudelleen varhain `chatCore.ts`:ssä; luokittelusäännöt valitsevat varasyyn
`reason` ja lukituksen `scope`-arvon
(`model` / `provider` / `connection`) `checkFallbackError()`-funktion sisällä
(`open-sse/services/accountFallback.ts`).

Luokittelusäännöt näkevät täyden virhetekstin **vain** (`额度不足`-tyyppisten
runko-osan merkkien täsmäyttämiseksi) niillä palveluntarjoajilla, jotka on
lueteltu `providerErrorRules.ts`-tiedoston
`FULL_TEXT_RULE_PROVIDERS`-sallittujen luettelossa — tällä hetkellä vain
`"agentrouter"`. Kaikkien muiden **sisäänrakennettujen luettelon**
palveluntarjoajien kohdalla `checkFallbackError` välittää
`getProviderErrorRuleMatch`-funktiolle vain rakenteisen virheen (`{code, type}`),
mikä riittää otsake-, tila- ja koodipohjaisille säännöille mutta ei näe
virherungon tekstimerkkejä. Apufunktio `resolveRuleMatchBody()` valitsee tämän:
sallittujen palveluntarjoajien tapauksessa täyden virhetekstin ja muussa
tapauksessa rakenteisen virheen. **Sisäänrakennetun** palveluntarjoajan lisääminen
`FULL_TEXT_RULE_PROVIDERS`-luetteloon on nimenomainen palveluntarjoajakohtainen
opt-in — sen ansiosta jokaisen luettelon ulkopuolisen palveluntarjoajan
oletuspolku pysyy tavu tavulta muuttumattomana.

Säännön `scope` (`model` / `provider` / `connection`) on erillinen opt-in
asetuksesta `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` tuo sen esiin vain
arvossa `fallbackResult.ruleScope`, ja alavirran kuluttajat käsittelevät sitä
muuna kuin tiedoksi tarkoitetuna tunnisteena vain niillä palveluntarjoajilla,
jotka on lueteltu saman tiedoston
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-luettelossa (ohjattuna
`honorsRuleLockScope()`-funktion kautta — tällä hetkellä vain
`"agentrouter"`). Katso edeltävästä kohdasta "Kiintiövirheiden uudelleenilmaisu",
mitä `scope: "connection"`-osuma käytännössä tekee, kun palveluntarjoaja on
tässä luettelossa.

**#11104 — operaattorin ilmoittamat säännöt ohittavat molemmat sallittujen luettelot.**
Operaattori voi ilmoittaa palveluntarjoajakohtaisen säännön ajonaikaisesti
asetuksella `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
muokkaamatta tätä tiedostoa. Operaattorin säännön rajoittaminen
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-luetteloilla —
luetteloilla, joiden tarkoitus on suojata **sisäänrakennettujen** luettelosääntöjen
**oletustoimintaa** — tekisi asetusmekanismista toimimattoman kaikilla muilla
palveluntarjoajilla kuin niillä, jotka on jo lueteltu, koska säännön ilmoittaminen
on jo operaattorin nimenomainen opt-in. Sekä `resolveRuleMatchBody()` että
`honorsRuleLockScope()` tarkistavat ensin `hasOperatorRuleForProvider()`-funktion:
operaattorin säännön sisältävä palveluntarjoaja saa raakavirhetekstin ja sen
ilmoittamaa `scope`-arvoa noudatetaan riippumatta siitä, esiintyykö se jommassakummassa
sallittujen luettelossa.

**Operaattorin ilmoittamat säännöt** (`OperatorProviderErrorRule`): jokaisella
säännöllä on valinnainen `status` ja valinnainen `match` (virhetekstin tavallinen,
kirjainkoosta riippumaton osamerkkijonohaku, ei koskaan RegExp, joten se ei voi
aiheuttaa ReDoS-hyökkäystä), ja vähintään toinen näistä on asetettava. Kun molemmat
on asetettu, niiden on täytyttävä yhtä aikaa; puuttuva kenttä täsmää kaikkeen, joten
`{match: "insufficient_quota"}` täsmää mihin tahansa tilaan, joka sisältää kyseisen
koodin. Ensimmäinen täsmäävä sääntö voittaa. `cooldownMs` hyväksyy enintään
30 päivää; sääntöjä voi olla yhteensä enintään 50.

**Kaikenkattavat oletusarvot** (`settings.providerErrorDefaults`, opt-in, määritetään
`setOperatorProviderErrorDefaults`-kutsulla): `{[provider]: {cooldownMs, scope?, reason?}}`
arvolla `cooldownMs` 1 minuutista 30 päivään. Oletusarvoa käytetään vain, kun mikään
operaattorin sääntö tai sisäänrakennetun luettelon sääntö ei täsmännyt, ja vain
virheille 402, 403, 408, 429 ja 5xx. Pyynnön rakenteeseen liittyvät virheet (400, 404,
409, 413, 422) sekä pelkät 401-virheet säilyttävät oman käsittelynsä. Jos `reason`-arvoa
ei ole määritetty erikseen, syy johdetaan tilasta samalla tavalla kuin
`classifyError`-funktiossa. Oletusarvon määrittäminen lasketaan operaattorin säännöksi
`hasOperatorRuleForProvider()`-funktion kannalta, joten sen `scope` (oletuksena
`"connection"`) otetaan huomioon. Oletusarvon todellinen jäähdytysaika on pidempi
seuraavista: sen `cooldownMs` ja palveluntarjoajan oma uudelleenyritysvihje
(`Retry-After`, `x-ratelimit-reset` tai rungossa oleva reset-vihje, sama vihje jota
moottori noudattaa, kun yhteyden jäähdytysasetuksen "use upstream retry hints" on
käytössä). Näin oletusarvo voi pidentää lyhyttä upstream-vihjettä, mutta se ei koskaan
lyhennä todellista resetointia. Eksplisiittinen operaattorin sääntö säilyttää täsmälleen
oman `cooldownMs`-arvonsa. Sääntö tai oletusarvo ei ohita
`markAccountUnavailable`-funktion yhteyden jäähdytyksen suojauksia: aktiivista,
pidempää jäähdytystä ei koskaan lyhennetä, eikä päätetilaa koskaan korvata. Aiemmin
`checkFallbackError`-funktiossa suoritettavat sisäänrakennetut tekstintunnistimet
(kiintiön loppuminen, päiväkohtainen kiintiö, tili poistettu käytöstä) ovat edelleen
etusijalla omien ilmaustensa kohdalla.

**Tunnettu puute — `providerRuleRegistry`-rekisteriä ei koskaan tarkisteta HTTP 400:n yhteydessä.**
`checkFallbackError`-funktion `BAD_REQUEST`-haara luokittelee tilan 400 kokonaan omien
mallitaulukkojensa avulla (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` jne. tiedostossa `accountFallback.ts`) ja palauttaa ennen
kuin sen yläpuolella oleva `configuredRule`/`getProviderErrorRuleMatch`-haara ehditään
saavuttaa. Sisäänrakennetun luettelon sääntö (tai operaattorin sääntö), jonka
`status: 400`, on syntaktisesti kelvollinen, mutta se ei koskaan aktivoidu. Yksikään
nykyinen sääntö ei kohdistu arvoon 400, joten tuotannossa ei ole vaikutuksia — mutta
tuleva 400-sääntö edellyttää tämän haaran muuttamista ensin. Tämä on suurempi muutos
kuin yhden palveluntarjoajakohtaisen säännön lisääminen (se luokittelee arvon 400
uudelleen jokaiselle palveluntarjoajalle, joka jo käyttää mallitaulukoiden mukaista
toimintaa), eikä se kuulu yhden palveluntarjoajakohtaisen säännön lisäämisen
laajuuteen.

### Uuden kiintiön väärin ilmoittavan yhdyskäytävän lisääminen

1. Rekisteröi yksi sääntötaulukko `statusRestatementRegistry`-rekisteriin
   (`open-sse/config/upstreamStatusRestatement.ts`). Pidä `textMarkers`-arvot
   palveluntarjoajakohtaisina; älä koskaan käytä uudelleen yleisiä englanninkielisiä
   ilmauksia, jotka voivat osua yhteen `CREDITS_EXHAUSTED_SIGNALS`-signaalien kanssa
   (`open-sse/services/accountFallback.ts`).
2. Rekisteröi halutessasi luokittelusääntöjä tiedostossa
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), jotta oikea
   lukituksen laajuus voidaan valita (`connection` tilin laajuiselle kiintiölle,
   `model` mallikohtaisille virheille). Tämä vaihe vaikuttaa tuotannossa vain
   palveluntarjoajiin, joiden säännöt tarvitsevat koko virhetekstin (runkomerkinnät):
   lisää palveluntarjoajan tunniste `FULL_TEXT_RULE_PROVIDERS`-luetteloon samassa
   tiedostossa — muuten `checkFallbackError` välittää säännölle vain jäsennellyn
   `{code, type}`-virheen, eikä rungon tekstisääntö koskaan täsmää liikenteessä.
   Säännöt, jotka täsmäävät pelkästään `status`-/`headers`-arvojen perusteella
   (kuten Opencoden tai Minimaxin säännöt), eivät tarvitse tätä opt-in-asetusta.
   Jos sääntö ilmoittaa erikseen `scope: "connection"` ja tarkoituksena on todellinen
   koko yhteyden kattava jäähdytys sekä saman pyynnön yhdistelmän ohitus (eikä vain
   informatiivinen tunniste), lisää palveluntarjoajan tunniste erikseen
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-luetteloon samassa tiedostossa — tämä ohjaa
   `isAgentrouterConnectionQuotaScope()`-tyyppisen käsittelyn käyttöä
   `markAccountUnavailable()`-funktiossa (`src/sse/services/auth.ts`) ja
   `applyComboTargetExhaustion()`-funktiossa
   (`open-sse/services/combo/targetExhaustion.ts`); ilman sitä `scope`
   kulkee edelleen `fallbackResult.ruleScope`-arvona, mutta mikään ei käytä sitä.
3. Lisää yksikkötestit, jotka vastaavat tiedostojen
   `tests/unit/upstream-status-restatement.test.ts` ja
   `tests/unit/agentrouter-error-rules.test.ts` testejä (mukaan lukien
   not-permanent- ja not-creditsExhausted-suojaukset sekä — jos palveluntarjoaja
   tarvitsee sallittujen palveluntarjoajien luetteloa — testi, joka varmistaa, että
   `resolveRuleMatchBody()` palauttaa koko tekstin vain kyseiselle palveluntarjoajalle).

Muutoksia tiedostoihin `chatCore.ts`, `classifyError` tai combo ei tarvita.

#### Egress-ryhmitelty lukitus (#10880)

Palveluntarjoajia, jotka ovat mukana `EGRESS_BUCKETED_LOCK_PROVIDERS`-luettelossa
(opencode-perhe), käsitellään IP-ryhmiteltyinä upstream-palveluntarjoajina (opencoden
ilmaisporras on IP-ryhmitelty, ei tilikohtainen — katso #9611): tilan 429, joka on
luokiteltu arvoksi `quota_exhausted` **tai** `rate_limit_exceeded`, jäähdytetään kaikki
sallitun palveluntarjoajaperheen yhteydet, joiden viimeksi tunnettu egress-IP vastaa
epäonnistuneen yhteyden osoitetta, ennen kuin kierto voi yrittää niitä
— näin vältetään N-1 varmasti epäonnistuvaa upstream-kutsua (sama toimintamalli kuin
#10460/#10525). `rate_limit_exceeded` sisältyy tähän tarkoituksella:
`markAccountUnavailable`-polulla opencode-kohtaiset säännöt eivät koskaan täsmää
(`checkFallbackError`-funktiolle ei välitetä otsakkeita/runkotietoja, eikä opencode ole
`FULL_TEXT_RULE_PROVIDERS`-luettelossa), joten 429, jonka rungossa on
tilauskiintiöön liittyvä teksti ("monthly usage limit reached"), luokitellaan
`quota_exhausted`-arvoksi kiintiötekstin varakäsittelyssä
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 tunnin jäähdytys), ennen
kuin `status_429`-sääntöä ehditään tarkistaa — kun taas kiintiötekstitön 429 (tavallinen
nopeusrajoitus) luokitellaan `status_429`-säännön kautta arvoksi
`rate_limit_exceeded`, ja se jäähdyttää edelleen IP-perheen. Sallitulle
palveluntarjoajalle IP-ryhmitelty nopeusrajoitus on sama signaali kuin loppuun käytetty
kiintiö. Rehelliset rajoitukset:

- **Parhaansa tekevä**: lukitus selvittää yhteyden viimeksi tunnetun `egress_ip`-arvon
  `proxy_logs`-taulusta (24 tunnin ikkuna, synkroninen, ei välimuistia). Tyhjä välimuisti
  (`egress_ip`-osoitetta ei ole koskaan selvitetty) tai rivin puuttuminen → vikaantunut
  yhteys jäähdytetään edelleen haarassa (kirjataan kuten nykyäänkin), mutta sisaryhteyttä
  ei lukita.
- **Ei koskaan lopullinen**: jäähdytys on uusiutuva kiintiöikkuna
  (`testStatus: "unavailable"`); pysyvää tilaa ei koskaan johdeta IP-tason signaalista.
  `disableCooling`-yhteydet ohittavat haaran kokonaan.
- **Lukituksen rakeisuus muuttuu sallittujen listalla olevalle perheelle**: kyseessä on
  laajuuden muutos, ei pelkästään sisaryhteyksien optimointi. opencode on
  `passthroughModels`-palveluntarjoaja, joten ennen tätä haaraa 429 aiheutti
  mallikohtaisen lukituksen; nyt se aiheuttaa yhteyden jäähdytyksen — myös operaattorille,
  joka käyttää vain yhtä yhteyttä ilman sisaryhteyksiä. Tämä on rakeisuus, jonka opencoden
  sääntötaulukko ilmoittaa jo oikeaksi (`scope: "connection"`,
  `providerErrorRules.ts`), mutta jota ei ole tähän mennessä koskaan noudatettu, koska
  opencode ei kuulu joukkoon `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Haara kirjoittaa
  vikaantuneen yhteyden jäähdytyksen ja `backoffLevel`-arvon itse, jäljitellen
  yhteyden laajuista agentrouter-haaraa, ja palautuu — alla olevaa mallikohtaista estoa ja
  yleistä polkua ei koskaan saavuteta.
- **Yhdistelmä mukana**: agentrouter-haaran tavoin laajuus ohittaa tarkoituksella
  yhdistelmäkutsujan 429-virheelle tekemän `persistUnavailableState`/`isCombo`-alennuksen.
  Mallikohtainen lukitus ei ole tämän laajuuden heikompi muoto, vaan väärä yksikkö: se ei
  kerro mitään ehtyneestä IP-osoitteesta, joten yhdistelmän kierto jatkaisi yhden varmasti
  epäonnistuvan kutsun kuluttamista sisarvuorollaan.
- **Sisaryhteyksien turvallisuus**: jo lopullisessa tilassa oleva sisaryhteys
  (banned/credits_exhausted) tai jo pidemmässä jäähdytyksessä oleva sisaryhteys ei koskaan
  ylikirjoitu.
- **Yksinomainen sallittujen lista**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-joukon
  laajentaminen on omistajan nimenomainen päätös; yleistä kytkentää ei tehdä
  (kuviot #10334/#10419). Sisaryhteyksien kysely sitoo saman sallittujen listan sen sijaan,
  että toistaisi sen SQL-literaalina, joten sen laajentaminen pysyy yhden rivin muutoksena.
- **Poistuvan IP-osoitteen kierto molempiin suuntiin**: hakuväli (24 tuntia) on
  huomattavasti laajempi kuin poistuvan IP-osoitteen välimuistin TTL (5 min), joten
  ”viimeksi tunnettu IP” on historiaa, ei nykytila. Jos yhteyden välityspalvelin kiersi
  ikkunan aikana, lukitus voi **jättää aidosti jaetun IP-osoitteen huomaamatta** (tallennettu
  IP-osoite on uusi, ehtymätön osoite) — ja vastaavasti se voi **jäähdyttää sisaryhteyden,
  joka on sittemmin kiertänyt pois** ehtyneestä IP-osoitteesta. Toinen tapaus maksaa
  kyseiselle sisaryhteydelle yhden jäähdytysikkunan; molemmat hyväksytään
  historiapohjaisen haun parhaansa tekevinä rajoituksina.
- **Kustannus**: kaksi rajattua `proxy_logs`-taulun läpikäyntiä (ikkuna suodatetaan
  `idx_pl_timestamp`-indeksin kautta), vain 429-taajuudella. Uutta indeksiä ei tarvita
  (migraatio 134, YAGNI). Mittaus tehtiin todellisen liikenteen tietokantakopiolla, joka
  oli kooltaan kohtalainen; suuren läpimenon instanssi sisältää samassa ikkunassa
  suhteellisesti enemmän rivejä.

## Muut joustavuusominaisuudet

- **22 reititysstrategiaa** (priority, painotettu, round-robin, kontekstivälitys, täytä ensin, p2c, satunnainen, vähiten käytetty, kustannusoptimoitu, reset-tietoinen, reset-window, expiry-first, headroom, kiintiöpainotettu, tiukka satunnainen, automaattinen, lkgp, kontekstioptimoitu, välimuisti optimoitu, fuusio) —, [AUTO-COMBO.md](../routing/AUTO-COMBO.md) )
- **Reset-tietoinen reititys** (v3.8.0) — priorisoi yhteydet kiintiön nollausajan mukaan.
- **Taustatilan heikkeneminen** — Responses API `background: true` on degradoitu synkronoitumaan varoituksen kanssa.
- **Dynaaminen työkalurajan tunnistus** — luopuu palveluntarjoajista, kun työkalujen määrärajat osuvat.
- **Hätävaraus** — ohjaa `OMNIROUTE_EMERGENCY_FALLBACK`; operaattorit voivat ohittaa sen Ominaisuusliput -sivulta ilman uudelleenkäynnistystä.

---

## Virheenkorjaus

- Painotettu combo vastaa `503 all_targets_cooling_down` (`Retry-After` asetettu, `diagnostics.excluded` listaa jokaisen kohteen tiloilla `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → allas on määritetty ja yhdistetty, jokainen kohde on vain vikasietoisuusajastimen sulkema pois; varoitus `[COMBO] Weighted selection: every target excluded before dispatch — …` nimee syyt ja jäljellä olevat sekunnit. Samasta kombosta tuleva `404 no_executable_targets` tarkoittaa, ettei vikasietoisuusajastin ollut osallisena (ei mitään ajettavaa, tai jokainen tili epäonnistui saatavuuskokeessa). Toteutettu tiedostossa `open-sse/services/combo/pinRecovery.ts` tiedoston `targetResolution.ts` keräämistä poissulkennoista.
- Kaikki palveluntarjoajan avaimet ohitettu → tarkista sekä katkaisijan tila ETTÄ kunkin yhteyden `rateLimitedUntil`/`testStatus`.
- Palveluntarjoaja pysyvästi pois suljettuna nollausikkunan jälkeen → koodi lukee raakaa `state`-arvoa `getStatus()`/`canExecute()`-kutsujen sijaan.
- Yksi avain epäonnistuu, muiden pitäisi toimia → epäile yhteyden jäähdyttelyä katkaisijan sijaan.
- Vain yksi malli epäonnistuu → epäile mallilukitusta yhteyden jäähdyttelyn sijaan.
- Tilan pitäisi palautua itsestään, mutta ei palaudu → tarkista tulevaisuudessa oleva aikaleima + vanhentuneen tilan päivittävä lukupolku. Pysyvät tilat vaativat manuaalisia muutoksia.

---

## Ajonaikainen tila — agentin pikaviite

> Siirretty sellaisenaan tiedostosta `AGENTS.md` → "Resilience Runtime State" (PR #12743),
> jotta agenttiopas pysyy alle 40k:n kontekstibudjetin. Kyseessä on tiivistetty,
> agenteille suunnattu näkymä yllä oleviin osioihin; numeroidut osiot pysyvät täydenä
> viitteenä.

OmniRoutessa on kolme toisiinsa liittyvää mutta erillistä tilapäisvirhemekanismia. Pidä
niiden vaikutusaluet erillään reitityksen käyttäytymistä virheenkorjatessasi. Katso
[3-kerroksinen vikasietoisuuskaavio](../diagrams/exported/resilience-3layers.svg)
(lähde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
nopeaa yleiskuvaa varten.

### Palveluntarjoajan katkaisija

**Vaikutusalue**: koko palveluntarjoaja, esim. `glm`, `openai`, `anthropic`.

**Tarkoitus**: lopettaa liikenteen lähettäminen palveluntarjoajalle, joka epäonnistuu
toistuvasti upstream-/palvelutasolla, jotta yksi epäkunnossa oleva palveluntarjoaja ei
hidasta jokaista pyyntöä.

**Toteutus**:

- Ydinluokka: `src/shared/utils/circuitBreaker.ts`
- Chat-portin/suorituksen kytkennät: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Ajonaikaisen tilan API: `src/app/api/monitoring/health/route.ts`
- Jaetut wrapperit: `open-sse/services/accountFallback.ts`
- Pysyväistetty tilataulu: `domain_circuit_breakers`

**Tilat** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normaali liikenne sallitaan.
- `DEGRADED`: varhaisvaroitusvyöhyke — virheet ylittivät heikkenemiskynnyksen mutta eivät
  vielä katkaisukynnystä; liikenne virtaa edelleen, hallintanäkymät näyttävät varoituksen.
  Onnistunut yhteystesti tai hiljainen jakso ilman uusia virheitä palauttaa sen tilaan
  `CLOSED` (ikkunan tiedot ovat tiedostossa `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: palveluntarjoaja on tilapäisesti estetty; kutsujat saavat provider-circuit-open
  -vastauksen tai combo-reititys siirtyy toiseen kohteeseen.
- `HALF_OPEN`: nollausaikakatkaisu on kulunut umpeen; salli koepyyntö. Onnistuminen sulkee
  katkaisijan, epäonnistuminen avaa sen uudelleen.

**Oletusarvot** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, käytetään kohdan
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` kautta tiedostossa
`src/lib/resilience/settings.ts` → `getCircuitBreaker(provider, …)` tiedostossa
`src/sse/handlers/chatHelpers.ts`). Koko palveluntarjoajan katkaisija toimii parametreilla
`circuitBreakerThreshold` / `circuitBreakerReset`:

| Profiili    |  heikkenee | avautuu (`circuitBreakerThreshold`) | nollautuu (`circuitBreakerReset`) |
| ----------- | ---------: | ----------------------------------: | --------------------------------: |
| OAuth       |        `5` |                                 `8` |                             `60s` |
| API-avain   |        `7` |                                `12` |                             `30s` |
| Paikallinen | (johdettu) |                                 `2` |                             `15s` |

`PROVIDER_PROFILES` määrittelee myös `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) ja `providerCooldownMs` (5/10/1 min): nämä
ruokkivat **valinnaisen globaalin Provider Cooldown -jäähdyttelyn ikkunaportin**
(`PROVIDER_COOLDOWN_ENABLED`, oletuksena pois päältä) — palveluntarjoajatason merkintä
tiedostossa `open-sse/services/providerCooldownTracker.ts` lasketaan jäähtyvänä vasta
`providerFailureThreshold` virheen jälkeen ikkunan `providerFailureWindowMs` sisällä, ja
jäähtyy sitten `providerCooldownMs`:n ajan. Ne EIVÄT ole käytössä olevan katkaisijan
kynnyksiä — älä säädä niitä odottaen katkaisijan käyttäytymistä. Jokainen oletusarvo on
ohitettavissa `OMNIROUTE_PROVIDER_BREAKER_*`- ja
`OMNIROUTE_CIRCUIT_BREAKER_*`-ympäristömuuttujilla; ajonaikaisesti tarkka viitetaulukko
sijaitsee tiedostossa `docs/architecture/RESILIENCE_GUIDE.md`.

Vain palveluntarjoajatason virhetilojen pitäisi laukaista palveluntarjoajan katkaisija:

```ts
(408, 500, 502, 503, 504);
```

Älä laukaise koko palveluntarjoajan katkaisijaa tavallisten tili-/avain-/mallivirheiden
vuoksi, kuten useimmissa `401`-, `403`- tai `429`-tapauksissa. Ne kuuluvat yleensä
yhteyden jäähdyttelyn tai mallilukituksen piiriin. Yleisen API-avainpalveluntarjoajan
`403`-virheen pitäisi olla palautuva, ellei sitä luokitella lopulliseksi
palveluntarjoaja-/tilivirheeksi.

Katkaisija käyttää laiskaa palautumista, ei tausta-ajastinta. Kun `OPEN`-tila vanhenee, lukukutsut kuten `getStatus()`, `canExecute()` ja `getRetryAfterMs()` päivittävät tilan tilaan `HALF_OPEN`, jotta koontinäytöt ja combo-ehdokkaiden muodostajat eivät jatka vanhentuneen palveluntarjoajan poissulkemista loputtomiin.

### Yhteyden jäähdytysaika

**Laajuus**: yksi palveluntarjoajan yhteys/tili/avain.

**Tarkoitus**: ohittaa väliaikaisesti yksi viallinen avain/tili samalla, kun muut saman palveluntarjoajan yhteydet voivat jatkaa pyyntöjen käsittelyä.

**Toteutus**:

- Kirjoitus-/päivityspolku: `src/sse/services/auth.ts::markAccountUnavailable()`
- Tilin valinta/suodatus: `src/sse/services/auth.ts::getProviderCredentials...`
- Jäähdytysajan laskenta: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Asetukset: `src/lib/resilience/settings.ts`

Tärkeät kentät palveluntarjoajan yhteyksissä:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tilin valinnan aikana yhteys ohitetaan, kun:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Jäähdytysjaksot ovat myös laiskoja: kun `rateLimitedUntil` on menneisyydessä, yhteys tulee jälleen kelvolliseksi. Onnistuneen käytön yhteydessä `clearAccountError()` tyhjentää `testStatus`- ja `rateLimitedUntil`-kentät, virhekentät sekä `backoffLevel`-kentän.

Yhteyden jäähdytysajan oletuskäyttäytyminen:

- OAuth-perusjäähdytysaika: `5s`.
- API-avaimen perusjäähdytysaika: `3s`.
- API-avaimen `429`-virheessä tulee suosia ylävirran uudelleenyritysvihjeitä (`Retry-After`, reset-otsakkeet tai jäsenneltävä nollausteksti), kun niitä on saatavilla.
- Toistuvat korjattavissa olevat virheet käyttävät eksponentiaalista viivettä (backoff):

```ts
baseCooldownMs * 2 ** failureIndex;
```

Thundering herd -ilmiön estävä suojaus estää samanaikaisia virheitä samassa yhteydessä pidentämästä jäähdytysaikaa toistuvasti tai kasvattamasta `backoffLevel`-arvoa kahdesti.

Lopputilat eivät ole jäähdytysjaksoja. `banned`, `expired` (josta tulee lopputila vasta N:n rajatun uudelleenyrityksen jälkeen `EXPIRED_RETRY_MAX`-arvon kautta) ja `credits_exhausted` on tarkoitus pysyä poissa käytöstä, kunnes tunnistetiedot tai asetukset muuttuvat tai operaattori nollaa ne. Älä korvaa lopputiloja ohimenevällä jäähdytystilalla.

### Mallilukitus

**Laajuus**: palveluntarjoaja + yhteys + malli.

**Tarkoitus**: välttää koko yhteyden poistamista käytöstä, kun vain yksi malli on käyttämättävissä tai kiintiörajoitettu kyseisessä yhteydessä.

Esimerkkejä:

- Mallikohtaisia kiintiöitä käyttävät palveluntarjoajat, jotka palauttavat `429`.
- Paikalliset palveluntarjoajat, jotka palauttavat `404` yhdestä puuttuvasta mallista.
- Palveluntarjoajakohtaiset tila-/mallioikeusvirheet, kuten tietyt Grok-tilat.

Mallilukitus sijaitsee tiedostossa `open-sse/services/accountFallback.ts`, ja se antaa saman yhteyden jatkaa muiden mallien käsittelyä.

### Vianmääritysohjeet

- Jos kaikki palveluntarjoajan avaimet ohitetaan, tarkista sekä palveluntarjoajan katkaisijan tila että kunkin yhteyden `rateLimitedUntil`/`testStatus`.
- Jos palveluntarjoaja vaikuttaa olevan pysyvästi poissuljettu nollausikkunan jälkeen, tarkista, lukeeko koodi raakaa `state`-arvoa sen sijaan, että se käyttäisi `getStatus()`/`canExecute()`-funktioita.
- Jos yksi palveluntarjoajan avain epäonnistuu, mutta muiden pitäisi toimia, suosi yhteyden jäähdytysaikaa palveluntarjoajan katkaisijan sijaan.
- Jos vain yksi malli epäonnistuu, suosi mallilukitusta yhteyden jäähdytysajan sijaan.
- Jos tilan pitäisi palautua itsestään, sillä tulisi olla tuleva aikaleima/nollauksen aikakatkaisu sekä lukupolku, joka päivittää vanhentuneen tilan. Pysyvät tilat vaativat manuaalisia tunnistetieto- tai konfiguraatiomuutoksia.

---

## TLS-sormenjälkitys ja stealth

Tarjoajakohtainen stealth (JA3/JA4, CCH, obfuskointi) on dokumentoitu erikseen — katso `docs/security/STEALTH_GUIDE.md` (git; ei käännetä kansioon `/docs`).

---

## Vikasietoisuuden testaus (vaihe 8 · lohko C)

Vikasietoisuuslogiikan yksikkötestien lisäksi kolme testiä rasittavat ajonaikaista ympäristöä todellisissa stressi-/vikaolosuhteissa (kaikki integration-/nightly-testejä — mikään niistä ei estä PR:ien yhdistämistä):

| Testi       | Mitä                                                                                                                                                                                                                                   | Ajo                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Vale-upstream-solmu aiheuttaa todellista viivettä/reset/timeout/503-virheitä; varmistaa, että katkaisija (circuit breaker) avautuu ja palautuu sekä että `checkFallbackError` luokittelee 503-virheen palautettavaksi varatoiminnoksi. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 streamia `createSSEStream`-kutsua kohden `--expose-gc`-lipun alla; epäonnistuu, jos keko kasvaa yli asetetun rajan (OOM-suojaus #3069).                                                                                           | `npm run test:heap`                    |
| k6 soak     | Jatkuva kuormitus kohdetta `/api/monitoring/health` vastaan; p95-/virhekynnykset.                                                                                                                                                      | `k6 run tests/load/k6-soak.js` (yöajo) |

Orkestroinnista vastaa `.github/workflows/nightly-resilience.yml` (cron + dispatch). Oletusarvoisessa `test:integration`-ajossa chaos- ja heap-testit ohittavat itsensä (ilman `RUN_CHAOS_INT`-muuttujaa tai `--expose-gc`-lippua).

---

## Katso myös

- [Arkkitehtuuriopas](./ARCHITECTURE.md) — Järjestelmän arkkitehtuuri ja sisäinen toiminta
- [Käyttöopas](../guides/USER_GUIDE.md) — Tarjoajat, yhdistelmät, CLI-integraatio
- [Auto-Combo-moottori](../routing/AUTO-COMBO.md) — 16 tekijän pisteytys, tilapaketit
