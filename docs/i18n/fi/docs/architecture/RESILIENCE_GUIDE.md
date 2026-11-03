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

- `banned` — asetettu kielletyn avainsanan / tilikiellon tunnistuksen avulla (katso [BAN_DETECTION](../security/BAN_DETECTION.md) ) ja kolmella peräkkäisellä pyyntökohtaisella alkuvaiheen hylkäämisellä (`request_rejected`, esim Anthropic OAuth 403 "Pyyntöä ei sallita" — `open-sse/services/requestRejectedStreak.ts`); yksi kieltäytyminen vain jäähdyttää yhteyttä
- `expired` (siirtymät terminaaliin rajattujen uudelleenyritysten jälkeen — `EXPIRED_RETRY_MAX = 3` eksponentiaalisella perääntymisellä — jotta ohimenevät OAuth -virheet voivat korjata itsensä ennen kuin tili poistetaan pysyvästi)
- `credits_exhausted`

Nämä säilyvät, kunnes tunnistetiedot muuttuvat tai operaattori nollaa ne. Älä kirjoita päätetiloja ohimenevällä jäähdytystilalla.

**Laiska palautuminen:** kun `rateLimitedUntil` on mennyt, yhteys tulee jälleen kelvolliseksi. Onnistuneen käytön yhteydessä `clearAccountError()` tyhjentää kaikki virhekentät.

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

### Istuntosuhde (#7274)

**Laajuus:** yksi asiakasistunto (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` otsikko), joka on kiinnitetty yhteen yhteyteen,** mikä tahansa** tarjoaja.

**Tarkoitus:** Pidä usean kierroksen agentti (Claude koodi, avustaja, mukautetut agentit) samalla tilillä kaikissa pyynnöissä, mikä vähentää tilien välistä kontekstin menetystä ja toistuvia kylmäkäynnistystoimia palveluntarjoajille, joilla on tilikohtainen istuntotila.

**Toteutus:**

- TTL resoluutio: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Otsikon poiminta (yleinen, mikä tahansa toimittaja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Pysyvä neulapöytä: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Asetus: `sessionAffinityTtlMs` (globaali TTL ms, `0` ei käytössä) — `src/lib/db/settings.ts`. Nimetty uudelleen Codex-vain `codexSessionAffinityTtlMs` stä migraatiolla `124_generic_session_affinity_ttl.sql`, joka siirtää minkä tahansa aiemmin määritetyn Codex TTL uutena oletuksena.

Ennen #7274: `resolveSessionAffinityTtlMs()` oli kiinteästi liitetty `0` kaikille palveluntarjoajille paitsi `codex`, joten TTL asetuksella (ja istunnon otsikoilla) ei ollut vaikutusta missään muualla, vaikka kiinnitysmekanismi ja otsikon purkaminen olivat jo palveluntarjoajan agnostikkoja. Korjaus poisti tuon aikaisen palautuksen; TTL koskee nyt yhtenäisesti jokaista palveluntarjoajaa, kun se on asetettu maailmanlaajuisesti arvon `0` yläpuolelle.

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

## 3. Mallilukitus

**Laajuus:** palveluntarjoaja + yhteys + malli -kolmikko.

**Avaimen laajuus statuksen mukaan:** epäonnistunut status päättää, mihin avaimeen lukitus kirjoitetaan (`resolveLockoutScope()` tiedostossa `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kiintiö- tai käyttöoikeussignaali — lukitse **kiintiöperhe**:
  codexin kohdalla koko `codex` / `spark` -alue (kaikki yhteyden `gpt-5*`-mallit),
  muiden palveluntarjoajien kohdalla `getQuotaScopedModelForProvider()`.
- `404` lukitsee pelkän mallin (`getModelLockKey()` kaventaa `not_found`-tilanteen).
- Kaikki muut statukset — `5xx`-siirto-/palvelinvirheet sekä OmniRouten oma
  laadunvalidoinnin syntetisoima `502` — lukitsevat vain **tarkan**
  palveluntarjoaja/yhteys/malli-kolmikon. Yhden mallin viallinen stream ei ole
  näyttöä tilin kiintiöstä; ennen tätä sääntöä yksi tyhjä vastaus kohteessa
  `codex/gpt-5.6-luna` poisti kaikki kyseisen yhteyden `gpt-5*`-mallit reitityksestä
  2–30 minuutiksi (eskaloituvasti), vaikka sen kiintiö oli koskematon.
- Kutsujan eksplisiittinen `scope`-valinta voittaa aina (Antigravity välittää arvon `"exact"`).

**Tarkoitus:** välttää koko yhteyden poistamista käytöstä, kun vain yksi malli on poissa käytöstä tai kiintiörajoitettu.

**Esimerkkejä:**

- Mallikohtaista kiintiötä käyttävät palveluntarjoajat, jotka palauttavat 429
- Paikalliset palveluntarjoajat, jotka palauttavat 404 yhdestä puuttuvasta mallista
- Palveluntarjoajakohtaiset tila-/mallikäyttöoikeusvirheet (esim. Grok-tilat)

**Toteutus:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model Cooldowns -koontinäyttö (v3.8.0)

Käyttöliittymä: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Listaa aktiiviset lukitukset seuraavine tietoineen: provider, connection, model, reason, expiresAt. Operaattorit voivat ottaa mallin manuaalisesti uudelleen käyttöön kortista.

**REST API:**

- `GET /api/resilience/model-cooldowns` — listaa aktiiviset lukitukset
- `DELETE /api/resilience/model-cooldowns` — manuaalinen uudelleenaktivointi. Runko: `{provider, connection, model}`. Todennus: management.

### Cooldown Manager

Käyttöliittymä: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Yksi sivu kaikille yhteyksille, jotka ovat poissa reitityksestä ohimenevästä syystä,
sen sijaan että jokaisen palveluntarjoajan sivu avattaisiin erikseen. Sivu listaa
yhteyksien cooldownit, mallilukitukset ja terminaalitilat, poistaa ne yhteyskohtaisesti,
valikoidusti tai kaikilta palveluntarjoajan yhteyksiltä, sekä muokkaa useimmin
säädettyjä cooldown-sääntöjä: `streamStallCooldown.enabled` sekä OAuth-/API-avain-
yhteyksien `connectionCooldown`-asetuksen perus-cooldownia ja backoffin maksimiaskeleita
(tallennetaan kutsulla `PATCH /api/resilience`). Terminaalitilat (`banned`, `expired`,
`credits_exhausted`) listataan, mutta niitä ei koskaan poisteta täällä.

**REST API** (`src/lib/resilience/cooldownManager.ts`, todennus: management):

- `GET /api/resilience/cooldowns[?provider=]` — yhteydet tiedoilla: status, jäljellä oleva
  cooldown, backoff-taso, viimeisimmän virheen tyyppi ja mallilukitukset (ei tunnistetietoja)
- `POST /api/resilience/cooldowns` — runko `{connectionIds: string[]}` tai
  `{all: true, provider?}`; palauttaa `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Lukituksen asetusten käyttöliittymä + success-decay -palautuminen (v3.8.23)

Mallilukitus muuttui aina käytössä olevasta kovakoodatusta toiminnosta täysin
konfiguroitavaksi, erikseen käyttöönotettavaksi (opt-in) ominaisuudeksi, jolla on oma
asetuskorttinsa ja itseparantuva palautumispolku.

**Asetuskortti:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tämä on **erillinen** yllä olevasta vain luku -tilassa olevasta `ModelCooldownsCard`-kortista
(joka vain _listaa_ aktiiviset lukitukset) — uusi kortti _määrittää parametrit_.
Oletusarvot määritellään kohteessa `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Asetus                  | Oletus                           | Merkitys                                                         |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `enabled`               | `false`                          | Pääkytkin — mallilukitus on **oletuksena pois päältä**.          |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ylävirran statukset, jotka lasketaan mallikohtaiseksi virheeksi. |
| `baseCooldownMs`        | `120_000` (120 s)                | Ensimmäisen virheen alkuperäinen lukituksen kesto.               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Eskaloituneen cooldownin yläraja.                                |
| `maxBackoffSteps`       | `10`                             | Eksponentiaalisen backoff-eskalaation maksimiaskeleet.           |
| `useExponentialBackoff` | `true`                           | Eskaloivatko toistuvat virheet cooldownia eksponentiaalisesti.   |

Asetukset säilyvät tavallisen asetusvaraston kautta ja validoidaan resilience-asetusten
skeemalla; kortti rajaa arvot `baseCooldownMs`/`maxCooldownMs`
(ehtona `maxCooldownMs ≥ baseCooldownMs`) sekä `maxBackoffSteps`.

**Success-decay -palautuminen:** palautuminen **ei** ole pelkkää ajastimen
umpeutumista. Terve vastaus laskee mallin virhelaskuria takaisin alaspäin, jolloin
ikkunan keskellä toipunut malli lakkaa eskaloitumasta (ja vapautuu) ennen kuin sen
ajastin ehtisi umpeutua. Kun combo-kohde onnistuu, `open-sse/services/combo.ts`
kutsuu funktiota `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), joka **puolittaa** tallennetun
`failureCount`-luvun (`Math.floor(failureCount / 2)`); kun luku saavuttaa arvon `0`,
lukitusmerkintä poistetaan kokonaan. Vastinpari `recordModelLockoutFailure()`
kasvattaa laskuria (ja eskaloi cooldownia) eskalaatioikkunaan osuvien virheiden
yhteydessä. Tämä success-decay tulee tavallisen ajastimen umpeutumisen lisäksi —
kumpi tahansa polku voi ottaa mallin uudelleen käyttöön.

**Tila:** lukituksia pidetään **muistissa** (prosessikohtaisina `Map`-rakenteina,
jotka sisältävät `ModelLockoutEntry`-merkintöjä avaimella `provider:connectionId:model`,
exact-laajuiset lukitukset avaimella `provider:connectionId:exact:model`), eikä niitä
tallenneta tietokantaan — ne katoavat uudelleenkäynnistyksessä. _Asetukset_
tallennetaan pysyvästi; aktiivinen lukituksen _tila_ on ohimenevä.

---

## 4. Quota-share -samanaikaisuuden hallinta (v3.8.36)

Tilauspohjaiset tilit (GLM, MiniMax jne.) hyväksyvät usein vain noin 1–3 samanaikaista
pyyntöä; rajan ylittäminen laukaisee 429-virheitä ja jäähdytysaikoja. Ongelma korostuu
**quota-share**-yhdistelmissä (`qtSd/…`), joissa useat API-avaimet jakavat yhden
upstream-tilin. Kolme kerrosta estää jaetun tilin tulvimisen.

### Yhteyskohtainen samanaikaisuusraja (`max_concurrent`)

Jokainen provider-yhteys voi määrittää `max_concurrent`-ylärajan
(`provider_connections.max_concurrent`, asetetaan yhteysikkunassa / API:n kautta /
tietokannassa). Jätä tyhjäksi, jos rajaa ei haluta. Tämä on ainoa säädin, joka ohjaa
alla kuvattua sarjallistuskerrosta — aseta se tilin todellista samanaikaisuutta
vastaavaksi (esim. GLM ~1, MiniMax ~2).

### Mallikohtaiset samanaikaisuusrajat (`modelConcurrency`)

Yhteys voi lisäksi määrittää tarkat mallikohtaiset samanaikaisuusylärajat
`rateLimitOverrides`-kartan sisällä:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Aseta se yhteysikkunassa (**Rate limit overrides → Per-model
concurrency caps**, yksi `model=cap` per rivi) tai kutsulla
`PATCH /api/providers/[id]` samalla JSON-muodolla. Keskeinen semantiikka:

- **Koko yhteys vs. mallikohtainen:** `maxConcurrent` pysyy jaettuna koko yhteyden
  ylärajana. Kun molemmat ovat voimassa, molemmat portit hankitaan
  atomisesti samassa yhdistelmäportissa
  (`global → provider → account → model`); vaikuttava käyttäytyminen määräytyy
  tiukemman sovellettavan rajan mukaan.
- **Tarkka malliavainvastaavuus:** avain on mallimerkkijono, joka välitetään
  executorille reititysratkaisun jälkeen — yleensä pelkkä upstream-mallin tunnus
  (`glm-5`), ei asiakaspuolen `provider/model`-alias (`zai/glm-5` ei
  vastaa `glm-5`). Arvot ovat positiivisia kokonaislukuja, jotka toimivat
  samanaikaisten pyyntöjen ylärajoina.
- **Paikallinen jonotus, ei selvittelyä:** ylimääräiset pyynnöt jonottavat
  paikallisesti olemassa olevilla jono-/aikakatkaisusemantiikoilla (typitetyt
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` -pääsyvirheet). OmniRoute ei selvitä
  tai päättele upstream-käytäntöä — se valvoo täsmälleen operaattorin
  määrittelemiä ylärajoja. Kyllästynyt malliportti ei koskaan poista provideria
  käytöstä eikä luo pysyvää mallilukitusta; upstreamin 429-/jäähdytys-/fallback-
  käyttäytyminen toimii edelleen virheiden varmistuksena.
- **Yhteys- ja prosessikohtainen laajuus:** rajat ovat tietokantayhteyskohtaisia
  ja säilytetään muistissa, joten kaksi samaa upstream-API-avainta käyttävää
  yhteyttä eivät koordinoi keskenään.
- **Määrittämätön tarkoittaa muuttumatonta:** kartan pois jättäminen (tai
  hallintapaneelin kentän jättäminen tyhjäksi) ei lisää malliporttia.
  Esimerkkikonfiguraatio ilman väitettä mistään yleisestä provider-rajasta:

```text
glm-5=1
glm-4.7=3
```

### Quota-share -pyyntöjen sarjallistaminen

Kun quota-share -lähetys kohdistuu yhteyteen, jossa on määritetty positiivinen
`max_concurrent`, kyseiseen **tiliin** kohdistuvat samanaikaiset pyynnöt
sarjallistetaan yhteyskohtaisen semaforin kautta (avain `qsconn:<connectionId>`):
ylimääräiset pyynnöt **odottavat jonossa** sen sijaan, että ne tulvisivat tiliä.
Ratkaisu on **fail-open** — täysi jono tai aikakatkaisu jatkaa ilman paikkaa sen
sijaan, että lähetettävissä oleva pyyntö koskaan hylättäisiin. Ominaisuuden voi
kytkeä kohdassa **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
oletuksena päällä). Ilman `max_concurrent`-rajaa toiminta on ennallaan.

> Quota-share -reititysportti (`selectQuotaShareTarget`, DRR + P2C) on itsessään
> fail-open ja vain _alentaa_ kapasiteetin ylärajaan saavuttaneen yhteyden
> _prioriteettia_ — yhden yhteyden poolissa se ei voi asettaa ehdotonta rajaa,
> joten tämä semafori on se, joka todella pitää tulvan hallinnassa.

### Yhdistelmien jäähdytykseen mukautuva uudelleenyritys

Jokaisessa yhdistelmästrategiassa (kun ominaisuus on käytössä) pyyntö, joka
muuten tuottaisi 429-virheen LYHYEN ohimenevän jäähdytysajan vuoksi, odottaa sen
päättymistä ja lähetetään uudelleen sen sijaan, että 429 palautettaisiin — tämä
kattaa Gemini-luokan TPM/RPM-ikkunat (~60 s retry-after) usean mallin
yhdistelmissä, esimerkiksi kun kahden mallin yhdistelmän molemmat kohteet osuvat
mallikohtaiseen nopeusrajoitukseen. Rajoituksia ohjaa `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) kohdassa **Settings →
Resilience**. Se ei koskaan odota `quota_exhausted`-tilan vuoksi (lukittuna
keskiyöhön asti) tai auth-/not-found-syistä.

Sama portti kattaa myös lähetystä edeltävän tapauksen (#16319): kun kaikki
yhdistelmän kohteet ohitetaan ennen yhtään yritystä, koska niiden mallit ovat
lyhyessä ohimenevässä lukituksessa, nollayrityspolku odottaa lukon päättymistä
samojen ylärajojen puitteissa ja lähettää uudelleen sen sijaan, että vastaisi
vihjeettömällä `503 ALL_TARGETS_SKIPPED` -virheellä. Kun odotusta ei sallita
(yläraja, yritys- tai budjettivaraus lopussa tai ominaisuus pois päältä),
lopullinen vastaus muuttuu muotoon `429 rate_limit_error`, joka sisältää
`retry_after`- / `reset_at`-arvot aikaisimmasta ohimenevän lukon
päättymisajankohdasta; quota-, auth- ja not-found-lukot säilyttävät vihjeettömän
503-vastauksen.

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

## 7. Upstream-statuksen oikaisu (virheellisesti ilmoitetut kiintiövirheet)

**Kattavuus:** yksi upstream-gateway, joka ilmoittaa väliaikaisen kiintiön loppumisen väärällä HTTP-statuksella.

**Tarkoitus:** korjata harhaanjohtava status ENNEN luokittelua, jotta alavirran kuluttajat (fallback-moottori, combo-aggregointi, asiakkaalle näkyvä vastaus) näkevät virheen todellisen, uudelleenyrityskelpoisen luonteen.

Jotkin gatewayt ilmaisevat VÄLIAIKAISEN kiintiön loppumisen HTTP-statuksella, joka ei ole uudelleenyrityskelpoinen. `agentrouter.org` palauttaa `403`-statuksen (joskus `400`) kiinalaisella viestirungolla (`用户额度不足` / `额度不足`) standardin `429`:n sijaan. Claude Coden kaltaiset asiakkaat tulkitsevat `403`:n pysyväksi ja keskeyttävät istunnon, ja ilman oikaisua fallback-moottori luokittelisi sen `AUTH_ERROR`:ksi kiintiötapahtuman sijaan.

**Toteutus:**

- Rekisteri + täsmääjä: `open-sse/config/upstreamStatusRestatement.ts` —
  tarjoajakohtainen sääntölista (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), joka täsmätään
  `applyStatusRestatement()`-funktiolla.
- Kutsukohta: `providerFailure:`-lohko tiedostossa `open-sse/handlers/chatCore.ts`
  (noin rivi 3654), heti sen jälkeen kun `parseUpstreamError()` on jäsentänyt
  virheellisen HTTP-statuksen sisältävän upstream-vastauksen
  (`!providerResponse.ok`) ja ennen kuin mikään luokittelu suoritetaan, jotta
  jokainen alavirran kuluttaja näkee korjatun statuksen. `200`-SSE-virran
  sisään upotetut virheet kulkevat erillistä, myöhempää virranjäsennysreittiä,
  eikä tämä hook kata niitä tänään — kyseessä on tunnettu rajoitus, jota ei
  vielä tarvita agentrouterin väärän statuksen käsittelyyn (joka ilmenee
  virheellisenä HTTP-statuksena).
- Uudelleenyritysoikeus: `429` kuuluu joukkoon `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), joten oikaistu virhe
  saa todellisen uudelleenyritysikkunan sen sijaan, että se näkyisi kuolleena
  `403`:na.
- Synteettinen `60s`:n `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  on vain se, minkä oikaistu vastaus kertoo **asiakkaalle**; se ei itsessään
  ole yhteyden sisäinen cooldown-/lockout-kesto — sitä säätelee erikseen se
  mekanismi, joka todella käsittelee oikaistun virheen (Connection Cooldownin
  kiihtyvä backoff, §2, perusarvo `3s` API-avaintarjoajille; tai Model
  Lockout, §3, mallikohtaisen kiintiön tarjoajille kuten agentrouter).
  Reititin voi tulla sisäisesti uudelleenyrityskelpoiseksi jo ennen kuin
  asiakkaalle ilmoitettu 60 sekunnin ikkuna on kulunut — kyseessä on
  tarkoituksellinen varmuusmarginaali, ei bugi.

Pysyviä virheitä (agentrouterin `无权访问模型` — ei käyttöoikeutta tähän
malliin) ei KOSKAAN oikaista: `excludeMarkers` torjuu säännön silloinkin, kun
`textMarkers` osuu, joten virhe säilyttää alkuperäisen statuksensa eikä mikään
yritä sitä uudelleen loputtomiin. Vastaavaa tarjoajan luokittelusääntöä
(`agentrouter-model-access-denied` tiedostossa
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope:
"model"`, ilmoitettu `6h`:n perus-cooldown) konsultoi `checkFallbackError`
(`open-sse/services/accountFallback.ts`) _ennen_ yleisen apikey-kategorian
`FORBIDDEN`-early-returnia, ehdollisena `honorsRuleLockScope(provider)`-
tarkistukselle (#10334 — tällä hetkellä vain agentrouterille
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen listan kautta tiedostossa
`providerErrorRules.ts`). Säännön ilmoitettu 6 tunnin cooldown välittyy
muodossa `fallbackResult.baseCooldownMs`, mutta se syöttää edelleen olemassa
olevaan mallikohtaisen kiintiön lukituspolkuun (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, jota #10334 ei muuttanut paitsi cooldownin
lähteen osalta): se leikataan operaattorin `mlSettings.maxCooldownMs`-arvoon
(oletus `1_800_000ms` / 30 min), kuten jokainen muukin mallilukitus, ja
_persistoitu lukituksen syy_ pysyy aiemmin kovakoodattuna
`"forbidden"`-arvona, ei säännön `"auth_error"`:na — vain cooldownin kesto
otetaan huomioon päästä päähän, ei syymerkkijonoa. Yhteys itsessään pysyy
aktiivisena; saman yhteyden sisarmallit eivät vaikutu.

Oikaistut kiintiövirheet (`额度不足`) osuvat tuotannossa tarjoajasääntöön
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ei omaa ilmoitettua cooldownia — sovelletaan
persistointikerroksen skaalautuvaa backoff-oletusta). Muutoksesta #10334
lähtien `ProviderErrorRuleMatch`-tyypin `scope` KULUTETAAN päästä päähän,
mutta **vain** tarjoajille, jotka kuuluvat
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen listalle
(`providerErrorRules.ts` — tänään vain `"agentrouter"`, ehdollisena
`honorsRuleLockScope()`-tarkistuksen kautta). Kaikilla muilla tarjoajilla
`scope` pysyy vain informatiivisena, aivan kuten ennen #10334:ttä.
`checkFallbackError` näyttää osuneen säännön scopen muodossa
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) on jaettu vartija, joka varmistaa, että
`ruleScope` on aidosti turvallinen kunnioittaa koko yhteyden kattavana,
itsestään palautuvana signaalina (scope `"connection"`, syy
`quota_exhausted`, ei koskaan `permanent`, ei koskaan `creditsExhausted` —
puolustus tulevaa sääntöä vastaan, joka parittaisi scopen `"connection"`
pysyvän tilitilan kanssa). Kaksi kuluttajaa kutsuu sitä:

- **Pysyvyys** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  sen sijaan että se joutuisi passthrough-palveluntarjoajan **mallikohtaiseen**
  lukitushaaraan (agentrouter on `passthroughModels: true` → `hasPerModelQuota()`
  palauttaa `true`), se määrää **väliaikaisen yhteyden jäähdytysajan** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ei koskaan lopullista tilaa
  (`credits_exhausted`/`banned`/`expired`) — joten yhteys palautuu itsestään
  jäähdytysajan päätyttyä sen sijaan että se vaatisi tunnistetietojen
  manuaalista nollausta. Ohitetaan yhteyksille, joilla on `disableCooling: true`
  (#2997): tämä opt-out jatkaa sen sijaan mallikohtaiseen lukitukseen
  (dokumentoitu kompromissi — katso koodikommentti haaran yläpuolella).
- **Saman pyynnön combo-reititys** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): sama suojaus merkitsee
  yhteyden muistissa olevaan `exhaustedConnections`-joukkoon, avaimena
  `${provider}:${connectionId}`. Tämä ohittaa vain jäljellä olevan SAMAN
  PYNNÖN kohteen, joka _itse jo kantaa kyseistä `connectionId`:tä_ omassa
  kohdeobjektissaan (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ennen `exhaustedConnections`-hakua) — tavallinen
  mallilista-combo, jossa sisarkohteilla ei ole omaa kiinteää
  `connectionId`:tä ja sellainen ratkaistaan vain lähetyskohtaisesti vastauksen
  `X-OmniRoute-Selected-Connection-Id`-otsakkeesta, ei koskaan osu kyseiseen
  avainvastaavuuteen. Tässä yleisessä tapauksessa todellinen suoja sitä
  vastaan, että jäljellä oleva osa käyttäisi uudelleen juuri loppuun
  käytettyä tiliä, EI ole tämä Set — se on yllä oleva pysyvyyskerros (yhteyden
  `rateLimitedUntil` on nyt tulevaisuudessa) yhdistettynä siihen, että tämä
  sama suojaus vaimentaa `transientRateLimitedProviders`-merkinnän kyseiselle
  virheelle (katso "Kaksivaiheinen rakenne" ja koodikommentti
  `isAgentrouterConnectionQuotaScope`-haarassa tiedostossa
  `targetExhaustion.ts`): kun kyseinen Set jätetään merkitsemättä, `combo.ts`:n
  `allowRateLimitedConnection`-pakotettu sallinta
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) EI tule voimaan
  palveluntarjoajan jäljellä oleville osille, joten tunnistetietojen valinnan
  `rateLimitedUntil`-suodatin (`src/sse/services/auth.ts:1238`) otetaan
  huomioon normaalisti ja jäljellä oleva osa joko valitsee toisen, edelleen
  kelvollisen agentrouter-yhteyden tai epäonnistuu ilman käytettävissä olevia
  tunnistetietoja — se ei pääse pakkokeinoin takaisin yhteyteen, jonka tämä
  haara juuri jäähdytti.

### Kaksivaiheinen rakenne: tilakoodin uudelleenmuotoilu, sitten luokittelu

Tilakoodin uudelleenmuotoilu (`upstreamStatusRestatement.ts`) ja
palveluntarjoajan luokittelusäännöt (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ovat erillisiä rekistereitä, jotka molemmat
avainnoituvat palveluntarjoajan tunnuksen ja tekstimerkkien perusteella, mutta
ne suoritetaan eri paikoissa ja palvelevat eri tarkoituksia: uudelleenmuotoilu
kirjoittaa HTTP-tilakoodin uudelleen varhaisessa vaiheessa `chatCore.ts`:ssä;
luokittelusäännöt valitsevat varavastauksen `reason`-arvon ja lukitsevat
`scope`-arvon (`model` / `provider` / `connection`) funktion
`checkFallbackError()` sisällä (`open-sse/services/accountFallback.ts`).

Luokittelusäännöt näkevät täyden virhe**tekstin** (tarvitaan runkotekstin
merkkien, kuten `额度不足`, täsmäämiseen) vain palveluntarjoajille, jotka on
lueteltu `FULL_TEXT_RULE_PROVIDERS`-sallittujen listalla tiedostossa
`providerErrorRules.ts` — tällä hetkellä vain `"agentrouter"`. Kaikkien muiden
**sisäänrakennetun luettelon** palveluntarjoajien osalta `checkFallbackError`
antaa `getProviderErrorRuleMatch`-funktiolle vain jäsennellyn virheen
(`{code, type}`), mikä riittää otsake-, tilakoodi- ja koodipohjaisille
säännöille mutta on sokea runkotekstin merkeille. Apufunktio
`resolveRuleMatchBody()` tekee tämän valinnan: täysi virheteksti sallittujen
listalla oleville palveluntarjoajille, muulloin jäsennelty virhe.
**Sisäänrakennetun** palveluntarjoajan lisääminen listaan
`FULL_TEXT_RULE_PROVIDERS` on nimenomainen palveluntarjoajakohtainen opt-in —
se on olemassa, jotta jokaisen listalla olemattoman palveluntarjoajan
oletuspolku pysyy tavua tavulta muuttumattomana.

Säännön `scope` (`model` / `provider` / `connection`) on erillinen opt-in
kuin `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` vain paljastaa sen
muodossa `fallbackResult.ruleScope`, ja jälkikäteen tulevat kuluttajat
kunnioittavat sitä muuna kuin informatiivisena merkintänä vain
palveluntarjoajille, jotka ovat `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen
listalla samassa tiedostossa (portattu `honorsRuleLockScope()`-funktion kautta —
tänään vain `"agentrouter"`). Katso yllä oleva kohta "Uudelleenmuotoillut
kiintiövirheet" nähdäksesi, mitä `scope: "connection"`-osuma todella tekee,
kun palveluntarjoaja on kyseisellä sallittujen listalla.

**#11104 — operaattorin määrittelemät säännöt ohittavat molemmat sallittujen
listat.** Operaattori voi määritellä palveluntarjoajakohtaisen säännön
ajonaikaisesti asetuksen `settings.providerErrorRules` kautta
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
muokkaamatta tätä tiedostoa. Operaattorisäännön porttaaminen listojen
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` taakse —
listojen, joiden tarkoitus on suojata sisäänrakennettujen luettelosääntöjen
**oletus**käyttäytymistä — tekisi asetusmekanismista tehottoman jokaiselle
palveluntarjoajalle paitsi niille, jotka on jo siellä lueteltu, koska säännön
määritteleminen itsessään on jo operaattorin nimenomainen opt-in.
`resolveRuleMatchBody()` ja `honorsRuleLockScope()` tarkistavat molemmat ensin
`hasOperatorRuleForProvider()`: palveluntarjoaja, jolla on operaattorisääntö,
saa raa'an virhetekstin ja sen määriteltyä `scope`-arvoa kunnioitetaan
riippumatta siitä, esiintyykö se myös jommallakummalla sallittujen listalla.

**Tunnettu puute — `providerRuleRegistry`-rekisteriä ei koskaan käytetä
HTTP 400 -tilakoodille.** `checkFallbackError`-funktion `BAD_REQUEST`-haara
luokittelee tilakoodin 400 kokonaan omien mallitaulukoidensa avulla
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` jne. tiedostossa
`accountFallback.ts`) ja palauttaa ennen kuin sen yläpuolella olevaan
`configuredRule`/`getProviderErrorRuleMatch`-haaraan päästään. Sisäänrakennettu
luettelosääntö (tai operaattorisääntö), jolla on `status: 400`, on
syntaktisesti kelvollinen mutta ei koskaan laukea. Mikään olemassa oleva
sääntö ei tänään kohdistu tilakoodiin 400, joten tuotannossa ei ole
vaikutuksia — mutta tuleva 400-sääntö edellyttää, että tähän haaraan
kosketaan ensin, mikä on suurempi muutos kuin säännön lisääminen (se
luokittelee 400-tilakoodin uudelleen jokaisen palveluntarjoajan osalta, joka
jo nojaa mallitaulukkokäyttäytymiseen), ja se on yhden palveluntarjoajan
sääntölisäyksen laajuuden ulkopuolella.

### Uuden kiintiötiedot virheellisesti ilmoittavan gatewayn lisääminen

1. Rekisteröi yksi sääntötaulukko kohteeseen `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Pidä `textMarkers`
   palveluntarjoajakohtaisena; älä koskaan käytä uudelleen yleisiä englanninkielisiä
   ilmauksia, jotka törmäävät `CREDITS_EXHAUSTED_SIGNALS`-kokoelman kanssa
   (`open-sse/services/accountFallback.ts`).
2. Rekisteröi halutessasi luokittelusäännöt tiedostossa
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) oikean
   lukituslaajuuden valitsemiseksi (`connection` tilinlaajuiselle kiintiölle,
   `model` mallikohtaisille virheille). Tämä vaihe vaikuttaa tuotannossa vain
   niiden palveluntarjoajien osalta, joiden säännöt tarvitsevat koko
   virhetekstin (body-merkit): lisää palveluntarjoajan tunnus
   `FULL_TEXT_RULE_PROVIDERS`-listaan samassa tiedostossa — muuten
   `checkFallbackError` antaa säännölle ainoastaan rakenteisen `{code, type}`
   -virheen, eikä body-tekstisääntö koskaan täsmää tuotantoliikenteessä.
   Säännöt, jotka täsmäävät puhtaasti `status`-/`headers`-kenttien perusteella
   (kuten Opencoden tai Minimaxin), eivät vaadi tätä opt-in-valintaa. Jos sääntö
   lisäksi määrittelee `scope: "connection"` ja tarkoituksena on todellinen
   yhteyslaajuinen jäähdytys sekä saman pyynnön combo-ohitus (ei pelkkä
   informatiivinen merkintä), lisää palveluntarjoajan tunnus
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-listaan samassa tiedostossa — tämä on se,
   mikä sallii `isAgentrouterConnectionQuotaScope()`-tyyppisen käytön
   funktioissa `markAccountUnavailable()` (`src/sse/services/auth.ts`) ja
   `applyComboTargetExhaustion()` (`open-sse/services/combo/targetExhaustion.ts`);
   ilman sitä `scope` kulkee edelleen läpi `fallbackResult.ruleScope`-kentän,
   mutta mikään ei toimi sen perusteella.
3. Lisää yksikkötestit mallina tiedostot
   `tests/unit/upstream-status-restatement.test.ts` ja
   `tests/unit/agentrouter-error-rules.test.ts` (mukaan lukien not-permanent-
   ja not-creditsExhausted-varmistukset sekä — jos palveluntarjoaja tarvitsee
   sallittujen listan — testi, joka varmistaa, että `resolveRuleMatchBody()`
   palauttaa koko tekstin vain kyseiselle palveluntarjoajalle).

Muutoksia kohteisiin `chatCore.ts`, `classifyError` tai combo ei tarvita.

#### Egress-bucketoitu lukitus (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-listan palveluntarjoajia (opencode-perhe)
kohdellaan IP-bucketoituina upstream-palveluina (opencoden ilmaistaso on
IP-bucketoitu, ei tilibucketoitu — ks. #9611): status-429:llä luokiteltu
`quota_exhausted` **tai** `rate_limit_exceeded` jäähdyttää jokaisen sallittuun
perheeseen kuuluvan yhteyden, jonka viimeksi tunnettu egress-IP vastaa
epäonnistuneen yhteyden IP-osoitetta, ennen kuin kierto ehtii kokeilla niitä
— näin vältetään N-1 takuuvarmasti epäonnistuvaa upstream-kutsua (sama malli
kuin #10460/#10525). `rate_limit_exceeded` on mukana tarkoituksella:
`markAccountUnavailable`-polulla opencode-kohtaiset säännöt eivät koskaan
täsmää (`checkFallbackError`-funktiolle ei luovuteta headers-/body-tietoja,
eikä opencode ole `FULL_TEXT_RULE_PROVIDERS`-listassa), joten 429-virhe, jonka
body sisältää tilauskiintiötekstin ("monthly usage limit reached"),
luokitellaan `quota_exhausted`-luokkaan kiintiötekstin varatoiminnolla
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 h jäähdytys) ennen
kuin `status_429`-sääntöön koskaan ehditäisiin — kun taas kiintiötekstistä
vapaa 429 (pelkkä nopeusrajoitus) luokitellaan `status_429`-säännön kautta
`rate_limit_exceeded`-luokkaan ja jäähdyttää silti IP-perheen. Sallittujen
listalla olevalle palveluntarjoajalle IP-bucketoitu nopeusrajoitus on sama
signaali kuin loppuun kulunut kiintiö. Rehelliset rajoitukset:

- **Best-effort**: lukitus selvittää yhteyden viimeksi tunnetun `egress_ip`-arvon
  `proxy_logs`-lokista (24 tunnin ikkuna, synkroninen, ei välimuistia). Kylmä
  välimuisti (egress-IP:tä ei koskaan koeheta) tai ei riviä → epäonnistuva
  yhteys jäähdytetään silti haaran toimesta (tallennetaan kuten nykyään), vain
  sitä, ettei sisaryhteyttä lukita.
- **Ei koskaan lopullinen**: jäähy on uusiutuva kiintiöikkuna
  (`testStatus: "unavailable"`); pysyvää tilaa ei koskaan johdeta IP-tason
  signaalista. `disableCooling`-yhteydet ohittavat haaran kokonaan.
- **Lukituksen granulariteetti muuttuu sallittujen listalla olevalle
  perheelle**: kyseessä on laajuuden muutos, ei vain sisaroptimointi. opencode
  on `passthroughModels`-palveluntarjoaja, joten ennen tätä haaraa 429 tuotti
  mallikohtaisen (per-MODEL) lockoutin; nyt se tuottaa yhteyden jäähyn — myös
  operaattorille, joka ajaa yhtä yhteyttä ilman yhtään sisaryhteyttä. Tämä on
  se granulariteetti, jonka opencoden sääntötaulukko jo julistaa oikeaksi
  (`scope: "connection"`, `providerErrorRules.ts`), mutta jota ei ole
  toistaiseksi noudatettu, koska opencode ei ole
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-listalla. Haara kirjoittaa itse
  epäonnistuvan yhteyden jäähyn + `backoffLevel`-arvon, yhteyksen laajuista
  agentrouter-haaraa mukaillen, ja palaa — mallikohtaista lohkoa ja sen
  alapuolella olevaa yleistä polkua ei koskaan saavuteta.
- **Combo mukana**: kuten agentrouter-haara, laajuus ohittaa tahallaan
  `persistUnavailableState`/`isCombo`-alennuksen, jonka combo-kutsuja soveltaa
  429:ään. Mallikohtainen lockout ei ole heikompi muoto tästä laajuudesta,
  vaan väärä yksikkö: se ei sano mitään loppuneesta IP:stä, joten combo-kierto
  jatkaisi yhden taatusti epäonnistuvan kutsun polttamista sisaryhteyttä
  kohti.
- **Sisarusten turvallisuus**: jo lopullisessa tilassa olevan
  (banned/credits_exhausted) tai jo pidemmässä jäähyssä olevan sisaruksen
  päälle ei koskaan kirjoiteta.
- **Eksklusiivinen sallittujen lista**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-listan
  laajentaminen on eksplisiittinen omistajan päätös; ei geneeristä kytkentää
  (malli #10334/#10419). Sisarkysely sitoo saman sallittujen listan sen sijaan
  että toistaisi sen SQL-literaalina, joten laajentaminen pysyy yhden rivin
  muutoksena.
- **Egress-IP:n kierto, molempiin suuntiin**: hakui kkuna (24 h) on paljon
  leveämpi kuin egress-IP-välimuistin TTL (5 min), joten "viimeksi tunnettu
  IP" on historiaa, ei nykytilaa. Jos yhteyden välityspalvelin kierti ikkunan
  sisällä, lukitus voi **jättää huomaamatta** aidosti jaetun IP:n (tallennettu
  IP on uusi, käyttämätön) — ja symmetrisesti se voi **jäähdyttää
  sisaryhteyden, joka on sittemmin kiertänyt pois** loppuneesta IP:stä.
  Jälkimmäinen tapaus maksaa kyseiselle sisaryhteydelle yhden jäähyikkunan;
  molemmat ovat hyväksyttyjä historiaan perustuvan haun best-effort-rajoja.
- **Kustannus**: kaksi rajattua `proxy_logs`-skannausta (ikkunasuodatettuna
  `idx_pl_timestamp`-indeksin kautta), vain 429-virheiden taajuudella. Ei
  uutta indeksiä (migraatio 134 YAGNI). Mitattu kohtalaisen kokoisella
  todellisen liikenteen tietokantakopiolla; korkean läpäisyn instanssi pitää
  suhteessa enemmän rivejä samassa ikkunassa.

## Muut vikasietoisuusominaisuudet

- **20 reititysstrategiaa** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — katso [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-aware -reititys** (v3.8.0) — priorisoi yhteydet kiintiön nollautumisajan mukaan.
- **Taustatilan heikennys** — Responses API:n `background: true` alennetaan synkroniseksi varoituksen kera.
- **Dynaaminen työkalurajojen tunnistus** — vetäytyy palveluntarjoajilta, kun työkalujen määrärajat tulevat vastaan.
- **Hätävaraohjaus** — ohjataan muuttujalla `OMNIROUTE_EMERGENCY_FALLBACK`; operaattorit voivat ohittaa sen Feature Flags -sivulta ilman uudelleenkäynnistystä.

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
