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
