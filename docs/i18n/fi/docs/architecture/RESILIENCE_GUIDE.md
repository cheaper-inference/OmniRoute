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

**Kattavuus:** yhden palveluntarjoajan yhteys/tili/avain.

**Tarkoitus:** ohita yksi viallinen avain samalla, kun muut saman palveluntarjoajan yhteydet jatkavat palvelemista.

**Toteutus:**

- Merkitse käytettävissä olemattomaksi: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valinta: saman tiedoston `getProviderCredentials*`
- Jäähdytyksen laskenta: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Asetukset: `src/lib/resilience/settings.ts`

**Yhteyskohtaiset kentät:**

- `rateLimitedUntil` — aikaleima, johon asti jäähdytys kestää
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentiaalisen porrastuksen laskuri

**Jäähdytyksen oletusarvot:**

- OAuth-perusarvo: 5 s
- API-avaimen perusarvo: 3 s
- API-avaimen 429: käyttää ensisijaisesti upstream-palvelun `Retry-After`-/reset-otsakkeita tai jäsennettävää reset-tekstiä
- Porrastus: `baseCooldownMs * 2 ** failureIndex`

**Palveluntarjoajakohtainen uudelleenyrityksen viive.** Palveluntarjoajan tietosivulla on **Uudelleenyrityksen viive** -valitsin (Auto, 15 s – 1 h). Se tallentaa arvon `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600) rajapinnan `PATCH /api/resilience` kautta. Kun rajoitusvirhe ei sisällä upstream-palvelun uudelleenyritysvihjettä, kyseinen arvo korvaa palveluntarjoajan skaalatun porrastuksen ja nollaa arvon `backoffLevel` (`open-sse/services/rotationConfig.ts::overrideFor`). Rajoitusvirheen prioriteettijärjestys suurimmasta pienimpään on seuraava: upstream-palvelun uudelleenyritysvihje, sitten yhteyskohtainen `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, sitten palveluntarjoajakohtainen uudelleenyrityksen viive, sitten ympäristömuuttuja `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, ja lopuksi skaalattu porrastus. Auto poistaa kentän. Tämä vaikuttaa vain rajoituksen syyhyn, ei koskaan päätetiloihin.

**Samanaikaisten pyyntöjen ryntäyksen estävä suojaus:** estää samanaikaisten virheiden aiheuttaman jäähdytyksen liiallisen pidentymisen tai arvon `backoffLevel` kaksinkertaisen kasvattamisen.

**Samanaikaisuusrajoituksen 429-virheet eivät kasvata porrastusta.** `429`, jonka runko ilmoittaa samanaikaisuusrajoituksesta ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`), tarkoittaa, että tili on kunnossa mutta varattu. `checkFallbackError()` palauttaa syyksi `concurrency_limited`: siirry heti seuraavaan yhteyteen, jäähdytä tämä yhteys kiinteän ajan `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) tai upstream-palvelun uudelleenyritysvihjeen ajan, pidä `backoffLevel` ennallaan ja aseta `skipProviderBreaker`. Eksplisiittinen kiintiöilmoitus voittaa edelleen, joten myös kiintiökuvion täyttävä runko tulkitaan kiintiövirheeksi. Tunnistus: `looksLikeConcurrencyLimit()` tiedostossa `src/shared/utils/classify429.ts`; tulkinta: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (katkaisijan `FailureKind`) ei muutu, ja se lukee edelleen näiden runkojen arvoksi `rate_limit`.

**Suoratoistosisällön jumittuminen ei jäähdytä tiliä.** Kun sisällön jumittumisen valvoja (`open-sse/utils/streamHandler.ts`) luovuttaa suoratoiston, joka ei lähettänyt mallin tulostetta ajoissa, `markAccountUnavailable()` tallentaa virheen yhteydelle mutta ei aseta jäähdytystä: jumittuminen koskee kyseistä pyyntöä ja johtuu useimmiten pitkästä päättelyvaiheesta, josta ei ole vielä tulostetta. Operaattorit voivat ottaa tämän käyttöön asetuksella `resilienceSettings.streamStallCooldown.enabled` (oletus `false`).

**Valinnainen viiveeseen perustuva signaali `p2c`-tilivalintaa varten.** Jokainen lähetetty yritys tallentaa yhteyskohtaisesti (sekä yhteyden ja mallin yhdistelmän osalta) ajan ensimmäiseen tavuun ja lopputuloksen muistissa olevaan liukuvaan ikkunaan: viimeiset 20 näytettä 15 minuutin ajalta (`open-sse/services/connectionLatencyTracker.ts`, tallennetaan kohteesta `safeLogEvents()` tiedostossa `src/sse/handlers/chatHelpers.ts`). Kun `resilienceSettings.p2cLatency.weight` on suurempi kuin `0` (alue 0–20, oletus `0` = pois käytöstä), tiedoston `src/sse/services/auth.ts` `compareP2CConnections()` lisää parin kumpaankin ehdokkaaseen enintään `weight` pistettä. Puolet pisteistä perustuu viiveeseen suhteessa nopeampaan ehdokkaaseen (kaksi kertaa hitaampi saa koko puolikkaan) ja puolet liukuvaan virhesuhteeseen. Termiä käytetään vain, kun molemmilla ehdokkailla on vähintään 3 näytettä, joten uusia tilejä ei rangaista, ja sen yläraja pysyy kiintiön estämisestä ja kiintiön loppumisesta aiheutuvia rangaistuksia pienempänä. Se ei lisää omaa katkaisijaa: epäonnistuvia tilejä käsittelevät edelleen jäähdytys-, lukitus- ja katkaisijakerrokset. Aseta se komennolla `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Päättelykehykset käynnistävät sisällön jumittumisen budjetin uudelleen.** Päättelymalli voi ajatella minuutteja ennen ensimmäistä näkyvää tokenia: Claude suoratoistaa `thinking_delta`-kehyksiä, joiden ajatteluteksti voi olla tyhjä, ja Responses API suoratoistaa peräkkäin yhden päättelykohteen toisensa jälkeen. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tunnistaa nämä kehykset, ja valvoja käynnistää budjettinsa uudelleen jokaisen kehyksen yhteydessä sen sijaan, että peruuttaisi suoritusvuoron. Ne eivät kuitenkaan edelleenkään ole mallin tulostetta, joten pelkkään päättelyyn päättyvä suoritusvuoro ilmoitetaan edelleen tyhjänä, ja suoritusvuoro, joka lopettaa päättelyn ja lähettää vain sykeviestejä, käynnistää edelleen valvojan.

Kiron binääriset `reasoningContentEvent`-kehykset, joilla on ei-tyhjä allekirjoitus, säilyttävät tämän päättelytoiminnan suorittimen läpi tyhjänä `reasoning_content`-delta-arvona. Allekirjoitettä ei välitetä eteenpäin. Metatiedot, keskeneräiset kehykset ja tyhjät allekirjoitukset eivät käynnistä sisältöbudjettia uudelleen; erillinen aktiivisen suoratoiston aikakatkaisu ja asiakkaan peruutus ovat edelleen voimassa (`open-sse/executors/kiro/reasoning.ts`).

**Päätetilat (EIVÄT ole jäähdytyksiä):**

- `banned` — asetetaan kiellettyjen avainsanojen / tilin eston tunnistuksen perusteella (katso [BAN_DETECTION](../security/BAN_DETECTION.md)). Upstream-palvelun pyyntökohtaiset hylkäykset (`request_rejected`, esimerkiksi Anthropicin OAuth 403 "Request not allowed") eivät koskaan aseta tätä: ne lasketaan yhteyden ja mallin mukaan, ja kyseinen malli poistetaan kierrosta kasvavalla jäähdytyksellä, jonka yläraja on `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), tai yhteys jäähdytetään, jos mallia ei tunneta — `open-sse/services/requestRejectedStreak.ts`
- `expired` (siirtyy päätetilaan rajoitetun uudelleenyritysmäärän jälkeen — `EXPIRED_RETRY_MAX = 3` eksponentiaalisella porrastuksella — jotta tilapäiset OAuth-virheet voivat korjaantua itsestään ennen tilin pysyvää deaktivointia)
- `credits_exhausted`

Nämä säilyvät, kunnes tunnistetiedot muuttuvat tai operaattori nollaa ne. Älä korvaa päätetiloja tilapäisellä jäähdytystilalla.

**Laiska palautuminen:** kun `rateLimitedUntil` on menneisyydessä, yhteys voi jälleen tulla valituksi. Onnistuneen käytön jälkeen `clearAccountError()` tyhjentää kaikki virhekentät.

### Claude OAuth -käyttöraja: alemman prioriteetin väylä + istuntorajan nollaus

**Laajuus:** yksi Claude-tilauksen (OAuth) yhteys. Molemmat ominaisuudet ovat **yhteyskohtaisesti
valinnaisia** (Muokkaa yhteyttä → Claude-osio → `lowPriorityMode` / `autoLimitReset` kohteessa
`providerSpecificData`; molemmat ovat oletusarvoisesti poissa käytöstä) ja vastaavat Claude Coden
`/low-priority`- ja `/limit-reset`-komentoja (johtosopimus on kaapattu Claude Code 2.1.263:sta).

**Toteutus:**

- Tilakone + vastausten luokittelu: `open-sse/services/claudeLowPriority.ts`
- Nollauksen tila-/varausasiakas: `open-sse/services/claudeLimitReset.ts`
- Suorittimen koukku (otsakkeen lisäys + saman tilin uudelleenyritys): `open-sse/executors/base.ts::execute()`
- Valinnaisuuden tallennus: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Käynnistin:** 5 tunnin käyttöraja — `429`, jonka otsakkeissa on
`anthropic-ratelimit-unified-status: rejected` ja tilin ollessa kelvollinen
`anthropic-ratelimit-unified-slow-offer: treatment`. Mitään ei lähetetä ennen ensimmäistä rajaa
ilmaisevaa `429`-vastausta; yhtenäisiä otsakkeita sisältämätön purskeena saapuva `429` kulkee
normaalia jäähdytyspolkua pitkin.

**Alemman prioriteetin väylä** (`lowPriorityMode`):

- Rajaa ilmaisevan `429`-vastauksen yhteydessä suoritin hyväksyy tarjouksen ja yrittää välittömästi
  uudelleen **samalla** tilillä otsakkeella `anthropic-usage-limit: slow`; väylä pysyy aktiivisena
  ilmoitettuun `anthropic-ratelimit-unified-reset`-aikaan asti (+60 sekunnin armonaika), ja jokainen
  pyyntö kyseisenä aikana sisältää otsakkeen. Siepattu `429` ei koskaan saavuta
  `handleChatCore`-käsittelijää, joten yhteyttä **ei** aseteta jäähdytykseen eikä siitä siirrytä
  toiseen yhteyteen.
- `anthropic-ratelimit-unified-slow-status` myöhemmissä vastauksissa: `active` / `not_needed`
  pitävät väylän aktiivisena; `slot_busy` (`429`) tai `529` odottavat palvelimen ilmoittaman
  `anthropic-ratelimit-unified-slow-retry-after`-ajan (oletusarvo 20 s, rajoitus 5–600 s, ±30 %
  vaihtelu) ja yrittävät uudelleen. Tätä rajoittaa `anthropic-ratelimit-unified-slow-max-wait`
  (oletusarvo 20 min, rajoitus 1 min–6 h) — sen ylityttyä väylä päättyy ja 10 minuutin
  jäähdytysesto estää uuden hyväksynnän. Odotusaikaa rajoittaa lisäksi pyyntökohtaisesta
  upstream-aloituksen aikakatkaisusta (`resolveFetchStartTimeout`, oletusarvoisesti 10 min)
  jäljelle jäävä aika vähennettynä 5 sekunnin marginaalilla: ilman tätä rajoitusta 20 minuutin
  oletusarvoinen enimmäisodotusaika ylittäisi pyynnön keston ja odotus keskeytyisi kesken kaiken,
  jolloin näkyviin tulisi `TimeoutError` normaalin `max_wait`-päättymisen ja jäähdytyksen sijaan.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 tunnin aikaikkunan vaihtuminen tai
  `ineligible` yhdessä `anthropic-ratelimit-unified-overage-in-use: true` -arvon kanssa
  (joka päättää väylän `extra_usage`-syyllä missä tahansa tilassa, koska maksullinen ylitys kattaa
  nyt rajan) päättävät väylän; vastaus siirtyy sen jälkeen normaalille jäähdytyspolulle.
  `budget_exhausted` muistetaan ilmoitettuun budjetin nollausaikaan asti (enintään 8 päivää).
- Rajan tarkistus suoritetaan suoritimen omien 400-vastausten perusteella tehtävien yritysten
  (kontekstin muokkaus, ajattelun/tehon rajoitukset, parametrien automaattinen oppiminen) jälkeen,
  joten myös vain jonkin tällaisen yrityksen yhteydessä ilmenevä rajaa ilmaiseva `429` siepataan
  sen sijaan, että se etenisi jäähdytyspolulle.
- Tila säilytetään yhteyskohtaisesti muistissa (uudelleenkäynnistys edellyttää yhtä ylimääräistä
  rajaa ilmaisevaa `429`-vastausta ennen uutta hyväksyntää).

**Istuntorajan nollaus** (`autoLimitReset`, yritetään ennen väylää, kun molemmat ovat käytössä):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  -lohko; kun `arm: "reset"` ja `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` arvolla
  `{ "program": "juniper_tide" }` (organisaation UUID kohteesta
  `providerSpecificData.organizationUUID`, käynnistyksen varamenettely).
- `result: reset|not_limited` → pyyntö yritetään uudelleen täydellä nopeudella (ilman slow-otsaketta).
  `already_used` / `not_offered` tallentavat muistiin `next_available_at`-arvon (oletusarvo yksi
  viikko); mikä tahansa virhe käynnistää 15 minuutin perääntymisen. Nollaus tehdään kerran viikossa,
  ja se lasketaan edelleen mukaan viikoittaiseen rajaan.

Regressiosuojat: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Istunnon affiniteetti (#7274)

**Laajuus:** yksi asiakasistunto (`X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session`-otsake) sidotaan yhteen yhteyteen **millä tahansa** palveluntarjoajalla.

**Tarkoitus:** pitää monivaiheinen agentti (Claude Code, aider, mukautetut agentit) samalla tilillä
pyyntöjen välillä, mikä vähentää tilien välisen kontekstin katoamista ja toistuvia kylmäkäynnistyksen
429-virheitä palveluntarjoajilla, joilla on tilikohtainen istuntotila.

**Toteutus:**

- TTL-arvon määritys: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Sidonnan valinta/luonti: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Otsakkeen poiminta (yleinen, mikä tahansa palveluntarjoaja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Pysyvä sidontataulu: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Asetus: `sessionAffinityTtlMs` (yleinen TTL millisekunteina, `0` poistaa käytöstä) —
  `src/lib/db/settings.ts`. Nimi muutettiin vain Codexille tarkoitetusta
  `codexSessionAffinityTtlMs`-asetuksesta migraatiolla `124_generic_session_affinity_ttl.sql`,
  joka siirtää aiemmin määritetyn Codex TTL -arvon uudeksi oletusarvoksi.

Ennen muutosta #7274 `resolveSessionAffinityTtlMs()` palautti aina aikaisin arvon `0` kaikille
muille palveluntarjoajille kuin `codex`, joten TTL-asetuksella (ja istunto-otsakkeilla) ei ollut
vaikutusta missään muualla, vaikka sidontamekanismi ja otsakkeiden poiminta olivat jo
palveluntarjoajasta riippumattomia. Korjaus poisti tämän ennenaikaisen palautuksen; TTL koskee nyt
yhtenäisesti kaikkia palveluntarjoajia, kun se asetetaan yleisesti suuremmaksi kuin `0`.

Kolmea istuntoaffiniteetin otsaketta ei koskaan välitetä upstreamiin — suorittimet rakentavat omat
upstream-otsakkeensa alusta alkaen sen sijaan, että välittäisivät asiakkaan otsakkeet sellaisinaan,
joten tämä toimii vain sisäisenä korrelaatiotunnisteena.

### Hallittujen istuntoyhteyksien yksinomaiset vuokraukset

**Laajuus:** yksi aktiivinen hallittu HTTP-asiakasistunto omistaa yhden kelvollisen OmniRoute-yhteyden.

**Tarkoitus:** tarjota kestävä yksinomainen yhteyden omistus asiakkaille, jotka tarvitsevat tiukan reititysrajan pyyntöjen välillä. Tämä eroaa istunnon affiniteetista, joka on pehmeä jatkuvuuspreferenssi: yksinomainen vuokra säilyttää elinkaaritilan SQLite-tietokannassa, valvoo aktiivisen omistajan ja aktiivisen yhteyden maailmanlaajuista yksikäsitteisyyttä ja hylkää vanhentuneen sukupolven ennen palveluntarjoajalle välittämistä.

Ominaisuus otetaan käyttöön API-avainkohtaisesti. Hallitulla avaimella on oltava `lease:exclusive`-laajuus ja nimenomaisesti määritetty, epätyhjä `allowedConnections`-luettelo. Mikä tahansa HTTP-asiakas voi käyttää elinkaaripäätepistettä; asiakkaan nimeä, user-agentia, palveluntarjoajaa, OAuth-menetelmää tai mallia ei vaadita. Vuokra omistaa yhteyden, ei mallia, joten mallin vaihtaminen säilyttää sidonnan, kun yhteys pysyy tavalliseen tapaan kelvollisena. Normaalit mallia, kiintiötä, kuntoa, jäähdytysaikaa ja sallittujen luetteloa koskevat säännöt pysyvät ensisijaisina, ja ne voivat siirtää saman sukupolven toiseen vapaaseen, kelvolliseen yhteyteen.

Elinkaari on `POST /api/v1/session-leases`, jonka JSON-toiminnot ovat `acquire`, `renew` ja `release`. Hallitut päättelypyynnöt sisältävät peittämättömän `X-OmniRoute-Lease-Owner`-arvon ja täsmällisen `X-OmniRoute-Lease-Generation`-arvon. Omistaja käyttää etuliitettä `vlo_`, jota seuraa 43 base64url-merkkiä; vain sen SHA-256-tiiviste tallennetaan. Jokainen lopullinen välityksen reititysraja sitoo lisäksi todennetun API-avaimen tunnisteen ja aktiivisen yhteyden tunnisteen. Vuokran hallinnan otsakkeet poistetaan lokeista, säilytetyistä pyyntövedoksista ja ylemmän tason suorittajan otsakkeista.

Jos tavallisella reitityksellä on kelvollisia hallittuja ehdokkaita, mutta jokainen vapaa ehdokas on vieraan aktiivisen vuokran käytössä, OmniRoute palauttaa HTTP-tilakoodin `429`, lease-capacity-unavailable-koodin, waiting-for-capacity-tilan ja rajatun `Retry-After`-arvon, joka johdetaan aikaisimmasta asiaankuuluvasta vanhenemisesta. Tavallinen kelvollisten vaihtoehtojen puuttuminen ei ole vuokrakiistaa, joten sen aiemmat reititysvirheen semantiikat säilyvät.

Liittyvät mekanismit pysyvät erillisinä:

- OAuth-istuntojen käyttöaste on OAuth-tilien prosessikohtaista pehmeää jakelua.
- Tilien semaforit myöntävät pyyntöjen rinnakkaisuuslupia ja päättyvät pyynnön valmistuessa.
- Hallitut yksinomaiset istuntovuokrat ovat kestävää elinkaaren aikaista omistajuutta, johon liittyy sukupolvirajoitus.

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

## 4. Kiintiöjaon samanaikaisuuden hallinta (v3.8.36)

Tilausasiakkaat (GLM, MiniMax jne.) hyväksyvät usein vain noin 1–3 samanaikaista
pyyntöä; rajan ylittäminen aiheuttaa 429-virheitä ja jäähdytyksiä. Tämä on
erityisen ongelmallista **kiintiöjaon** (`qtSd/…`) yhdistelmissä, joissa useat
API-avaimet jakavat saman upstream-tilin. Kolme kerrosta estää jaetun tilin
tulvimisen.

### Yhteyskohtainen samanaikaisuuden enimmäisraja (`max_concurrent`)

Kukin palveluntarjoajayhteys voi ilmoittaa samanaikaisten pyyntöjen
`max_concurrent`-enimmäisrajan
(`provider_connections.max_concurrent`, määritetään yhteysikkunassa / API:ssa / tietokannassa).
Jätä kenttä tyhjäksi, jos rajoitusta ei haluta. Tämä on ainoa asetus, joka ohjaa
alla kuvattua sarjallistamiskerrosta — määritä arvoksi tilin todellinen
samanaikaisuuden raja (esim. GLM noin 1, MiniMax noin 2).

### Mallikohtaiset samanaikaisuuden enimmäisrajat (`modelConcurrency`)

Yhteydelle voi lisäksi määrittää tarkat mallikohtaiset samanaikaisuuden
enimmäisrajat sen `rateLimitOverrides`-kartassa:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Määritä tämä yhteysikkunassa (**Rate limit overrides → Per-model
concurrency caps**, yksi `model=cap` riviä kohden) tai
`PATCH /api/providers/[id]`-pyynnöllä käyttäen samaa JSON-rakennetta. Keskeiset
semantiikat:

- **Yhteydenlaajuinen vs. mallikohtainen:** `maxConcurrent` säilyy koko yhteyden
  yhteisenä enimmäisrajana. Kun molempia sovelletaan, molemmat portit varataan
  atomisesti samassa yhdistelmäportissa
  (`global → provider → account → model`); käytännössä sovelletaan tiukempaa
  soveltuvaa rajoitusta.
- **Täsmällinen mallin avaimen vastaavuus:** avain on reitityksen ratkaisemisen
  jälkeen suorittajalle välitetty mallimerkkijono — yleensä upstreamin paljas
  mallin tunniste (`glm-5`), ei asiakkaan puolen `provider/model`-alias
  (`zai/glm-5` ei vastaa tunnistetta `glm-5`). Arvojen on oltava positiivisia
  kokonaislukuna ilmoitettuja samanaikaisten pyyntöjen enimmäisrajoja.
- **Paikallinen jonotus, ei tunnistusta:** ylimääräiset pyynnöt jonottavat
  paikallisesti nykyisten jono- ja aikakatkaisusemantiikkojen mukaisesti
  (tyypitetyt `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` -hyväksymisvirheet).
  OmniRoute ei tunnista tai päättele upstreamin käytäntöä — se pakottaa
  operaattorin määrittämät täsmälliset enimmäisrajat. Täyttynyt mallikohtainen
  portti ei koskaan poista palveluntarjoajaa käytöstä eikä luo pysyvää mallin
  estoa; upstreamin 429-/jäähdytys-/varatoimintakäyttäytyminen säilyy
  virhetilanteiden varajärjestelmänä.
- **Yhteys- ja prosessikohtainen laajuus:** rajat ovat tietokantayhteyskohtaisia
  ja niitä pidetään muistissa, joten kaksi samaa upstream-API-avainta käyttävää
  yhteyttä eivät koordinoi toimintaansa keskenään.
- **Määrittämätön tarkoittaa ennallaan:** kartan pois jättäminen (tai
  hallintapaneelin kentän jättäminen tyhjäksi) ei lisää mallikohtaista porttia.
  Esimerkkimääritys ilman minkään yleisen palveluntarjoajakohtaisen rajan
  määrittämistä:

```text
glm-5=1
glm-4.7=3
```

### Kiintiöjaon pyyntöjen sarjallistaminen

Kun kiintiöjaon lähetys kohdistuu yhteyteen, jolla on positiivinen
`max_concurrent`, kyseiseen **tiliin** kohdistuvat samanaikaiset pyynnöt
sarjallistetaan yhteyskohtaisen semaforin kautta (avain `qsconn:<connectionId>`):
ylimääräiset pyynnöt **odottavat jonossa** sen sijaan, että tili tulvitettaisiin.
Toiminto on **salliva virhetilanteissa** — täysi jono tai aikakatkaisu jatkaa
ilman paikkaa sen sijaan, että lähetettävissä oleva pyyntö koskaan hylättäisiin.
Ota toiminto käyttöön tai poista se kohdassa **Settings → Resilience →
Quota-share per-connection concurrency**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, oletusarvo on käytössä).
Ilman `max_concurrent`-rajaa toiminta säilyy ennallaan.

> Kiintiöjaon reititysportti (`selectQuotaShareTarget`, DRR + P2C) on itsessään
> salliva virhetilanteissa ja vain _alentaa at-cap-yhteyden prioriteettia_ — yhden
> yhteyden joukossa se ei voi asettaa kovaa rajaa, joten tämä semafori on se,
> joka todellisuudessa estää tulvimisen.

### Yhdistelmän jäähdytyksen huomioiva uudelleenyritys

Kaikissa yhdistelmästrategioissa (kun ne ovat käytössä) pyyntö, joka aiheuttaisi
429-virheen lyhyen ohimenevän jäähdytyksen vuoksi, odottaa jäähdytyksen loppuun ja
lähettää pyynnön uudelleen sen sijaan, että palauttaisi 429-virheen — tämä kattaa
Gemini-tyyppiset TPM-/RPM-ikkunat (noin 60 sekunnin retry-after-arvo)
usean mallin yhdistelmissä, esimerkiksi kun yhdistelmän molempiin kohteisiin
kohdistuu mallikohtainen nopeusrajoitus. Toimintoa rajoittavat
`comboCooldownWait`-asetuksen (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) arvot kohdassa **Settings → Resilience**. Se ei koskaan odota
`quota_exhausted`-tilanteissa (lukittu keskiyöhön asti) eikä todennus- tai
puuttuvan kohteen syissä.

Yhdistelmä voi poistua käytöstä asetuksella
`config.comboCooldownWaitEnabled: false`. Vain literaali `false` poistaa käytöstä
nämä jaetut yhdistelmäodotukset (lähetyksen jälkeisen jäähdytyksen sekä lähetystä
edeltävät katkaisimen aukiolo- ja mallilukko-odotukset) ja niiden odotusbudjetin
aikakatkaisun alarajan pidennyksen. Puuttuva arvo tai `true` säilyttää yleisen
käytännön; `true` ei voi ottaa odotusta käyttöön, jos se on poistettu käytöstä
yleisesti. Eksplisiittinen `targetTimeoutMs` voittaa edelleen. Tämä käytöstä
poistaminen ei muuta erillistä natiivin Codex-vuoron kiinnityksen lähettämistä
edeltävää odotusta.

Sama portti kattaa lähettämistä edeltävän tapauksen (#16319): kun kaikki
yhdistelmän kohteet ohitetaan ennen yhtäkään yritystä, koska niiden malli on
lyhytaikaisesti lukittu, nolla-yrityksen polku odottaa lukituksen päättymistä
samojen rajojen mukaisesti ja lähettää pyynnön uudelleen sen sijaan, että
palauttaisi vihjeettömän `503 ALL_TARGETS_SKIPPED`-vastauksen. Kun odotusta ei
sallita (yläraja, yritysten enimmäismäärä tai budjetti on käytetty tai toiminto
on poistettu käytöstä), lopullinen vastaus muutetaan muotoon
`429 rate_limit_error`, joka sisältää aikaisimman ohimenevän lukituksen
vanhenemisesta saadut `retry_after`- ja `reset_at`-arvot; kiintiö-, todennus- ja
puuttuvan kohteen lukitukset säilyttävät vihjeettömän 503-vastauksen.

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
