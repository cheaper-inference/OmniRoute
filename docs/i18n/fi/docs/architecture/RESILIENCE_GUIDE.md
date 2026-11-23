# Resilience Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoutessa on kolme erillistä mutta toisiinsa liittyvää vikasietoisuusmekanismia. Jokaisella niistä on eri laajuus ja tarkoitus. Pidä ne erillään reitityksen toimintaa selvittäessäsi.

![Kolmikerroksinen vikasietoisuusmalli](../diagrams/exported/resilience-3layers.svg)

> Lähde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Palveluntarjoajan katkaisija

**Laajuus:** koko palveluntarjoaja (esim. `glm`, `openai`, `anthropic`).

**Tarkoitus:** estää liikenteen lähettäminen palveluntarjoajalle, jolla ilmenee toistuvasti virheitä ylävirran tai palvelun tasolla.

**Toteutus:**

- Ydinluokka: `src/shared/utils/circuitBreaker.ts`
- Kytkentä: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Tilan API: `GET /api/monitoring/health`
- Nollaus-API: `POST /api/resilience/reset`
- Kääreet: `open-sse/services/accountFallback.ts`
- Tietokantataulu: `domain_circuit_breakers`

**Tilat:**

- `CLOSED` — normaali liikenne sallitaan
- `DEGRADED` — liikenne sallitaan edelleen, mutta palveluntarjoajan kohonneita virhemääriä seurataan; palaa tilaan `CLOSED`, kun onnistumisia on riittävästi, yhteystesti onnistuu tai viimeisimmän virhetyypin pisin `OPEN`-pitoaika (sen `cooldownByKind`-arvo tai muuten `resetTimeout`, × `maxBackoffMultiplier`, vähintään yksi jäähdytysjakso) on kulunut ilman uutta virhettä
- `OPEN` — palveluntarjoaja on tilapäisesti estetty; yhdistelmäreititys ohittaa sen
- `HALF_OPEN` — nollauksen aikakatkaisu on kulunut; koepyyntö sallitaan

**Määritettävät oletusarvot (`open-sse/config/constants.ts`, käytettävissä kohdassa Dashboard → Settings → Resilience):**

| Luokka      | Heikentynyt, kun | Avautuu, kun | Nollauksen aikakatkaisu |
| ----------- | ---------------- | ------------ | ----------------------- |
| OAuth       | 5 virhettä       | 8 virhettä   | 60s                     |
| API-avain   | 7 virhettä       | 12 virhettä  | 30s                     |
| Paikallinen | johdettu         | 2 virhettä   | 15s                     |

`degradationThreshold` määrittää, milloin palveluntarjoaja siirtyy tilaan `DEGRADED`; `failureThreshold` määrittää, milloin katkaisija avautuu ja palveluntarjoaja ohitetaan. Paikallisten palveluntarjoajien profiileja ei vielä näytetä Resilience-asetussivulla.

**Laukaisukoodit:** vain palveluntarjoajatason tilakoodit `[408, 500, 502, 503, 504]`. ÄLÄ laukaise katkaisijaa tilitason virheistä (useimmat 401/403/429 — ne kuuluvat jäähdytyksen tai lukituksen piiriin).

**Laiska palautuminen:** kun `OPEN` vanhenee, `getStatus()`, `canExecute()` ja `getRetryAfterMs()` päivittävät tilaksi `HALF_OPEN`. Samat lukutoiminnot (sekä seuraava virhe) palauttavat vanhentuneen `DEGRADED`-tilan tilaksi `CLOSED`. Tausta-ajastinta ei tarvita.

---

### Valinnainen yleinen palveluntarjoajan jäähdytys (aikaikkunaportti)

Neljäs, **valinnainen** kerros (`PROVIDER_COOLDOWN_ENABLED`, oletuksena **pois käytöstä**) ylläpitää
pyyntöjen välistä muistia virheitä tuottavista palveluntarjoajista tiedostossa
`open-sse/services/providerCooldownTracker.ts`. Yhdistelmäkohteen
ratkaisu käyttää sitä, jotta peräkkäiset yhdistelmäpyynnöt eivät käy uudelleen läpi juuri
epäonnistunutta palveluntarjoajaa. Palveluntarjoajatason merkinnät noudattavat `PROVIDER_PROFILES`-aikaikkunaporttia:

| Profiili  | laukeaa määrän (`providerFailureThreshold`) jälkeen | aikavälillä (`providerFailureWindowMs`) | jäähdytysaika (`providerCooldownMs`) |
| --------- | --------------------------------------------------: | --------------------------------------: | -----------------------------------: |
| OAuth     |                                                `10` |                                 `15min` |                               `5min` |
| API-avain |                                                `15` |                                 `30min` |                              `10min` |

Kynnysarvon alapuolella palveluntarjoajan **ei** katsota olevan jäähdytystilassa; onnistuminen tyhjentää
aikaikkunan. Yhteystason merkinnät (`provider:connectionId`) säilyttävät sen sijaan
eksponentiaalisen `minRetryCooldownMs → maxRetryCooldownMs`-viiveen. Ohitukset:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressiosuojaus: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Yhteyden jäähdytysaika

**Laajuus:** yksittäinen palveluntarjoajan yhteys/tili/avain.

**Tarkoitus:** ohittaa yksi viallinen avain samalla, kun muut saman palveluntarjoajan yhteydet jatkavat palvelemista.

**Toteutus:**

- Merkitse ei-käytettäväksi: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valinta: `getProviderCredentials*` samassa tiedostossa
- Jäähdytysajan laskenta: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Asetukset: `src/lib/resilience/settings.ts`

**Yhteyskohtaiset kentät:**

- `rateLimitedUntil` — aikaleima, johon asti jäähdytysaika on voimassa
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentiaalisen viiveen laskuri

**Oletusjäähdytysajat:**

- OAuth-perusaika: 5 s
- API-avaimen perusaika: 3 s
- API-avaimen 429: käyttää ensisijaisesti upstream-palvelun `Retry-After`-/nollausotsakkeita tai jäsennettävissä olevaa nollausaikatekstiä
- Viive: `baseCooldownMs * 2 ** failureIndex`

**Samanaikaisten uusintayritysten esto:** estää samanaikaisia virheitä pidentämästä jäähdytysaikaa liikaa tai kasvattamasta `backoffLevel`-arvoa kahdesti.

**Samanaikaisuusrajoituksen aiheuttamat 429-virheet eivät kasvata eksponentiaalista viivettä.** `429`, jonka runko ilmoittaa samanaikaisuusrajoituksesta ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`), tarkoittaa, että tili on kunnossa mutta varattu.
`checkFallbackError()` palauttaa syyn `concurrency_limited`: siirry heti seuraavaan yhteyteen, aseta tälle yhteydelle kiinteä `CONCURRENCY_LIMIT_COOLDOWN_MS`-jäähdytysaika (1 s) tai upstream-palvelun ilmoittama uudelleenyritysviive, pidä `backoffLevel` muuttumattomana ja aseta `skipProviderBreaker`.
Nimenomainen kiintiötä koskeva runko on silti ensisijainen, joten myös kiintiömallia vastaava runko luokitellaan edelleen kiintiöksi.
Tunnistus: `looksLikeConcurrencyLimit()` tiedostossa `src/shared/utils/classify429.ts`; päätelmä: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()`-funktion tulos (katkaisijan `FailureKind`) säilyy muuttumattomana ja on näille rungoille edelleen `rate_limit`.

**Virran sisällön pysähtyminen ei aseta tiliä jäähdytystilaan.** Kun sisällön pysähtymisen valvonta-ajastin (`open-sse/utils/streamHandler.ts`) luopuu virrasta, joka ei lähettänyt mallin tulostetta määräajassa, `markAccountUnavailable()` kirjaa virheen yhteydelle mutta ei aseta jäähdytysaikaa: pysähtyminen koskee kyseistä pyyntöä ja johtuu useimmiten pitkästä päättelyvaiheesta, joka ei ole vielä tuottanut tulostetta. Operaattorit voivat ottaa jäähdytysajan takaisin käyttöön asetuksella `resilienceSettings.streamStallCooldown.enabled` (oletusarvo `false`).

**Päättelykehykset käynnistävät sisällön pysähtymisbudjetin uudelleen.** Päättelevä malli voi ajatella minuutteja ennen ensimmäistä näkyvää tokenia: Claude suoratoistaa `thinking_delta`-kehyksiä, joiden päättelyteksti voi olla tyhjä, ja Responses API suoratoistaa päättelykohteita peräkkäin. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tunnistaa nämä kehykset, ja valvonta-ajastin käynnistää budjettinsa uudelleen jokaisen kehyksen kohdalla vuoron peruuttamisen sijaan. Ne eivät edelleenkään ole mallin tulostetta, joten pelkkään päättelyyn päättyvä vuoro ilmoitetaan edelleen tyhjäksi, ja päättelyn lopettava sekä sen jälkeen vain heartbeat-viestejä lähettävä vuoro laukaisee edelleen valvonta-ajastimen.

Kiron binääriset `reasoningContentEvent`-kehykset, joilla on ei-tyhjä allekirjoitus, säilyttävät tämän päättelytoiminnan suorittajan läpi tyhjänä `reasoning_content`-deltana. Allekirjoitusta ei välitetä eteenpäin. Metatiedot, keskeneräiset kehykset ja tyhjät allekirjoitukset eivät käynnistä sisältöbudjettia uudelleen; erillinen aktiivisen virran aikakatkaisu ja asiakkaan tekemä peruutus ovat edelleen voimassa (`open-sse/executors/kiro/reasoning.ts`).

**Pysyvät tilat (EIVÄT jäähdytysaikoja):**

- `banned` — asetetaan kielletyn avainsanan / tilikiellon tunnistuksen perusteella (katso [BAN_DETECTION](../security/BAN_DETECTION.md)) sekä kolmen peräkkäisen upstream-palvelun pyyntökohtaisen hylkäyksen jälkeen (`request_rejected`, esimerkiksi Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); yksittäinen hylkäys vain asettaa yhteyden jäähdytystilaan
- `expired` (siirtyy pysyvään tilaan rajatun uudelleenyritysmäärän jälkeen — `EXPIRED_RETRY_MAX = 3` eksponentiaalisella viiveellä — jotta tilapäiset OAuth-virheet voivat korjaantua itsestään ennen tilin pysyvää käytöstäpoistoa)
- `credits_exhausted`

Nämä säilyvät, kunnes tunnistetiedot muuttuvat tai operaattori nollaa ne. Älä korvaa pysyviä tiloja tilapäisellä jäähdytystilalla.

**Laiska palautuminen:** kun `rateLimitedUntil` on menneisyydessä, yhteys voidaan jälleen valita. Onnistuneen käytön jälkeen `clearAccountError()` tyhjentää kaikki virhekentät.

### Claude OAuth -käyttöraja: alemman prioriteetin kaista + istuntorajan nollaus

**Laajuus:** yksi Claude-tilauksen (OAuth) yhteys. Molemmat ominaisuudet ovat **yhteyskohtaisesti erikseen käyttöön otettavia** (Muokkaa yhteyttä → Claude-osio → `lowPriorityMode` / `autoLimitReset` kohdassa `providerSpecificData`, molemmat oletusarvoisesti pois käytöstä) ja vastaavat Claude Coden `/low-priority`- ja `/limit-reset`-komentoja (siirtoprotokolla tallennettu Claude Code 2.1.263 -versiosta).

**Toteutus:**

- Tilakone + vastauksen luokittelu: `open-sse/services/claudeLowPriority.ts`
- Nollaustilan/-lunastuksen asiakas: `open-sse/services/claudeLimitReset.ts`
- Suorittajan kytkentäpiste (otsakkeen lisäys + uudelleenyritys samalla tilillä): `open-sse/executors/base.ts::execute()`
- Käyttöönottoasetuksen pysyvyys: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Laukaisin:** viiden tunnin käyttöraja — `429`, jonka otsakkeissa on `anthropic-ratelimit-unified-status: rejected` ja, kun tili on oikeutettu, `anthropic-ratelimit-unified-slow-offer: treatment`. Mitään ei lähetetä ennen ensimmäistä käyttörajan aiheuttamaa 429-vastausta; ilman unified-otsakkeita saatu hetkellisen kuormituspiikin 429-vastaus käsitellään normaalin jäähdytyspolun kautta.

**Alemman prioriteetin kaista** (`lowPriorityMode`):

- Seinärajan 429-vastauksen yhteydessä suoritin hyväksyy tarjouksen ja yrittää heti uudelleen **samalla**
  tilillä käyttäen `anthropic-usage-limit: slow` -otsaketta; kaista pysyy aktiivisena ilmoitettuun
  `anthropic-ratelimit-unified-reset`-ajankohtaan asti (+60 s:n lisäaika), ja jokainen kyseisen aikaikkunan
  pyyntö sisältää otsakkeen. Siepattu 429 ei koskaan saavuta `handleChatCore`-toimintoa, joten yhteyttä
  **ei** aseteta jäähylle eikä vaihdeta toiseen.
- Myöhempien vastausten `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  säilyttävät kaistan; `slot_busy` (429) tai `529` odottavat palvelimen
  `anthropic-ratelimit-unified-slow-retry-after`-arvon mukaisesti (oletus 20 s, rajaus 5–600 s, ±30 %:n satunnaisvaihtelu)
  ja yrittävät uudelleen `anthropic-ratelimit-unified-slow-max-wait`-arvon rajoissa (oletus 20 min, rajaus
  1 min–6 h) — tämän jälkeen kaista päättyy ja 10 minuutin jäähy estää tarjouksen hyväksymisen uudelleen. Odotus
  rajataan lisäksi pyynnön oman ylävirran aloituksen aikakatkaisusta jäljellä olevaan aikaan
  (`resolveFetchStartTimeout`, oletuksena 10 min), josta vähennetään 5 s:n marginaali: ilman tätä rajausta
  20 minuutin enimmäisodotuksen oletusarvo ylittäisi pyynnön eliniän, ja odotus keskeytettäisiin
  sen aikana, jolloin hallitun `max_wait`-päättymisen ja jäähyn sijaan palautuisi `TimeoutError`.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 tunnin aikaikkunan vaihtuminen tai
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (joka päättää kaistan
  tilana `extra_usage` millä tahansa tilalla, koska maksullinen ylitys kattaa nyt seinärajan) päättävät kaistan;
  vastaus siirtyy tämän jälkeen normaaliin jäähypolkuun. `budget_exhausted` muistetaan ilmoitettuun
  budjetin nollaukseen asti (≤ 8 päivää).
- Seinärajan tarkistus suoritetaan suorittimen omien 400-vastauksista käynnistyvien yrityksen sisäisten uudelleenyritysten
  (kontekstin muokkaus, ajattelu-/ponnistusrajoitukset, parametrien automaattinen oppiminen) jälkeen, joten vain
  jossakin näistä uudelleenyrityksistä ilmenevä seinärajan 429 siepataan silti sen sijaan, että se päätyisi jäähypolkuun.
- Tila säilytetään muistissa yhteyskohtaisesti (uudelleenkäynnistys aiheuttaa yhden ylimääräisen seinärajan 429-vastauksen ennen tarjouksen hyväksymistä uudelleen).

**Istuntorajan nollaus** (`autoLimitReset`, kokeillaan ennen kaistaa, kun molemmat ovat käytössä):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-
  lohko; kun `arm: "reset"` ja `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` käyttäen
  sisältöä `{ "program": "juniper_tide" }` (organisaation UUID kohteesta
  `providerSpecificData.organizationUUID`, alustuksen varavaihtoehto).
- `result: reset|not_limited` → pyyntöä yritetään uudelleen täydellä nopeudella (ei hidastusotsaketta).
  `already_used` / `not_offered` tallentavat `next_available_at`-arvon muistiin (oletus yksi viikko);
  mikä tahansa virhe aiheuttaa 15 minuutin odotuksen. Nollaus on käytettävissä kerran viikossa ja lasketaan silti
  mukaan viikkorajaan.

Regressiosuojaukset: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Istuntoaffiniteetti (#7274)

**Soveltamisala:** yksi asiakasistunto (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-otsake) kiinnitetään yhteen yhteyteen **millä tahansa** palveluntarjoajalla.

**Tarkoitus:** pitää monivaiheinen agentti (Claude Code, aider, mukautetut agentit) samalla tilillä pyyntöjen välillä, mikä vähentää tilien välisestä kontekstin menetyksestä aiheutuvia ongelmia ja toistuvia kylmäkäynnistyksen 429-vastauksia palveluntarjoajilla, joilla on tilikohtainen istuntotila.

**Toteutus:**

- TTL:n määritys: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Kiinnityksen valinta/luonti: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Otsakkeen poiminta (yleinen, kaikki palveluntarjoajat): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Pysyvä kiinnitystaulu: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Asetus: `sessionAffinityTtlMs` (yleinen TTL millisekunteina, `0` poistaa käytöstä) — `src/lib/db/settings.ts`. Nimi muutettiin vain Codexia koskeneesta `codexSessionAffinityTtlMs`-asetuksesta migraatiossa `124_generic_session_affinity_ttl.sql`, joka siirtää kaikki aiemmin määritetyt Codexin TTL-arvot uudeksi oletusarvoksi.

Ennen muutosta #7274 `resolveSessionAffinityTtlMs()` palautti heti arvon `0` kaikille muille palveluntarjoajille paitsi `codex`, joten TTL-asetus (ja istunto-otsakkeet) eivät vaikuttaneet missään muualla, vaikka kiinnitysmekanismi ja otsakkeiden poiminta olivat jo palveluntarjoajariippumattomia. Korjaus poisti tämän aikaisen palautuksen; TTL koskee nyt yhdenmukaisesti kaikkia palveluntarjoajia, kun sen yleiseksi arvoksi on asetettu yli `0`.

Kolmea istuntoaffiniteetin otsaketta ei koskaan välitetä ylävirtaan — suorittimet muodostavat omat ylävirran otsakkeensa alusta alkaen sen sijaan, että ne välittäisivät asiakkaan otsakkeet sellaisinaan, joten tunniste säilyy vain sisäisenä korrelaatiotunnuksena.

### Hallittujen istuntoyhteyksien yksinomaiset vuokraukset

**Soveltamisala:** yksi aktiivinen hallittu HTTP-asiakasohjelma/-istunto omistaa yhden kelvollisen OmniRoute-yhteyden.

**Tarkoitus:** tarjota pysyvä ja yksinomainen yhteyden omistajuus asiakkaille, jotka tarvitsevat
tiukan reititysrajan pyyntöjen välillä. Tämä eroaa istuntoaffiniteetista, joka on pehmeä jatkuvuuspreferenssi:
yksinomainen vuokraus säilyttää elinkaaritilan SQLitessä, pakottaa aktiivisen omistajan ja
aktiivisen yhteyden yleisen yksikäsitteisyyden sekä hylkää vanhentuneen sukupolven ennen palveluntarjoajalle välittämistä.

Ominaisuus otetaan käyttöön erikseen kullekin API-avaimelle. Hallitulla avaimella on oltava `lease:exclusive`-käyttöoikeus ja
nimenomaisesti määritetty ei-tyhjä `allowedConnections`-luettelo. Mikä tahansa HTTP-asiakasohjelma voi käyttää elinkaaren päätepistettä;
asiakasohjelman nimeä, user-agentia, palveluntarjoajaa, OAuth-menetelmää tai mallia ei vaadita. Vuokraus omistaa yhteyden,
ei mallia, joten mallin vaihtaminen säilyttää sidoksen niin kauan kuin yhteys on tavanomaisesti
kelvollinen. Normaalit mallia, kiintiötä, kuntoa, jäähyä ja sallittujen luetteloa koskevat säännöt pysyvät määräävinä ja voivat
siirtää saman sukupolven toiseen vapaaseen kelvolliseen yhteyteen.

Elinkaari on `POST /api/v1/session-leases`, ja sen JSON-toiminnot ovat `acquire`, `renew` ja `release`.
Hallittujen päättelypyyntöjen mukana toimitetaan läpinäkymätön `X-OmniRoute-Lease-Owner`-arvo ja täsmällinen
`X-OmniRoute-Lease-Generation`. Omistaja-arvo alkaa merkkijonolla `vlo_`, jota seuraa 43 base64url-merkkiä; vain
sen SHA-256-tiiviste tallennetaan. Jokainen lopullinen dispatch-aita sidotaan myös todennetun API-avaimen tunnukseen ja
aktiivisen yhteyden tunnukseen. Vuokrasopimuksen hallintaotsakkeet poistetaan lokeista, säilytetyistä pyyntövedoksista ja
ylävirran suorittajalle välitettävistä otsakkeista.

Jos tavallisessa reitityksessä on kelvollisia hallittuja ehdokkaita, mutta jokainen vapaa ehdokas on
vieraan aktiivisen vuokrasopimuksen varaama, OmniRoute palauttaa HTTP `429` -vastauksen, lease-capacity-unavailable-koodin,
waiting-for-capacity-tilan sekä rajatun `Retry-After`-arvon, joka johdetaan aikaisimmasta merkityksellisestä vanhenemisajankohdasta.
Tavallinen tyhjä kelpoisuusjoukko ei ole vuokrasopimuskiista, vaan siinä säilytetään nykyinen reititysvirheiden semantiikka.

Liittyvät mekanismit pysyvät erillisinä:

- OAuth-istuntovaraus on prosessikohtaista, pehmeää kuormanjakoa OAuth-tileille.
- Tilikohtaiset semaforit myöntävät pyyntöjen rinnakkaisuuslupia, jotka päättyvät pyynnön valmistuessa.
- Eksklusiiviset hallitut istuntovuokrasopimukset tarjoavat pysyvän elinkaaren kattavan omistajuuden ja sukupolviaidan.

---

## 3. Mallin lukitus

**Laajuus:** palveluntarjoajan, yhteyden ja mallin yhdistelmä.

**Avaimen laajuus tilan mukaan:** virhetilakoodi määrittää, mihin avaimeen lukitus kirjoitetaan
(`resolveLockoutScope()` tiedostossa `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kiintiöön tai käyttöoikeuteen liittyvä signaali — lukitsee **kiintiöperheen**:
  codexin tapauksessa koko `codex`- / `spark`-laajuuden (yhteyden kaikki `gpt-5*`-mallit),
  muilla palveluntarjoajilla `getQuotaScopedModelForProvider()`.
- `404` lukitsee pelkän mallin (`getModelLockKey()` rajaa `not_found`-tilan).
- Mikä tahansa muu tila — `5xx`-siirto-/palvelinvirheet sekä OmniRouten laadunvarmistuksen
  itse muodostama `502` — lukitsee vain **täsmällisen**
  palveluntarjoajan, yhteyden ja mallin yhdistelmän. Yhden mallin viallinen virta ei ole todiste
  tilin kiintiöstä; ennen tätä sääntöä yksi tyhjä vastaus mallista
  `codex/gpt-5.6-luna` poisti kyseisen yhteyden kaikki `gpt-5*`-mallit
  reitityksestä 2–30 minuutiksi (porrastetusti), vaikka kiintiö ei ollut muuttunut.
- Kutsujan nimenomaisesti määrittämä `scope`-valinta ohittaa aina muut säännöt (Antigravity välittää arvon `"exact"`).

**Tarkoitus:** estää koko yhteyden poistaminen käytöstä, kun vain yksi malli ei ole käytettävissä tai sen kiintiö on rajoitettu.

**Esimerkkejä:**

- Mallikohtaista kiintiötä käyttävät palveluntarjoajat, jotka palauttavat tilan 429
- Paikalliset palveluntarjoajat, jotka palauttavat tilan 404 yhden puuttuvan mallin vuoksi
- Palveluntarjoajakohtaiset tila-/mallikäyttöoikeusvirheet (esim. Grok-tilat)

**Toteutus:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Mallien jäähdytysten hallintapaneeli (v3.8.0)

Käyttöliittymä: Asetukset → Mallien jäähdytykset (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Luettelee aktiiviset lukitukset ja näyttää seuraavat tiedot: palveluntarjoaja, yhteys, malli, syy ja expiresAt. Operaattorit voivat ottaa mallin manuaalisesti uudelleen käyttöön kortista.

**REST API:**

- `GET /api/resilience/model-cooldowns` — luettelee aktiiviset lukitukset
- `DELETE /api/resilience/model-cooldowns` — manuaalinen uudelleenkäyttöönotto. Runko: `{provider, connection, model}`. Todennus: hallinta.

### Jäähdytysten hallinta

Käyttöliittymä: Valvonta → Jäähdytysten hallinta (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Yksi sivu kaikille yhteyksille, jotka on poistettu reitityksestä tilapäisen syyn vuoksi, jotta
jokaista palveluntarjoajasivua ei tarvitse avata erikseen. Se luettelee yhteyksien jäähdytykset, mallien lukitukset ja lopulliset
tilat, tyhjentää ne yhteyskohtaisesti, valinnalle tai palveluntarjoajan kaikille yhteyksille
sekä muokkaa eniten hienosäädettyjä jäähdytyssääntöjä: `streamStallCooldown.enabled` ja OAuth-/API-avainpohjaisen
`connectionCooldown`-asetuksen perusjäähdytystä sekä vastaviiveen enimmäisaskelmäärää (tallennetaan
`PATCH /api/resilience` -pyynnöllä). Lopulliset tilat (`banned`, `expired`, `credits_exhausted`)
luetellaan, mutta niitä ei koskaan tyhjennetä täällä.

**REST API** (`src/lib/resilience/cooldownManager.ts`, todennus: hallinta):

- `GET /api/resilience/cooldowns[?provider=]` — yhteydet sekä niiden tila, jäljellä oleva jäähdytys,
  vastaviivetaso, viimeisin virhetyyppi ja mallien lukitukset (ei tunnistetietoja)
- `POST /api/resilience/cooldowns` — runko `{connectionIds: string[]}` tai
  `{all: true, provider?}`; palauttaa `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Lukitusasetusten käyttöliittymä ja onnistumisiin perustuva palautuminen (v3.8.23)

Mallien lukitus muuttui aina käytössä olleesta kiinteästi koodatusta toiminnasta täysin määritettäväksi,
erikseen käyttöön otettavaksi ominaisuudeksi, jolla on oma asetuskorttinsa ja itsekorjautuva palautumispolku.

**Asetuskortti:** Asetukset → Mallin lukitus
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tämä **eroaa** yllä olevasta vain luku -tilassa olevasta `ModelCooldownsCard`-kortista (joka ainoastaan
_luettelee_ aktiiviset lukitukset) — uusi kortti _määrittää parametrit_. Oletusarvot
ovat kohteessa `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Asetus                  | Oletusarvo                       | Merkitys                                                          |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | Pääkytkin — mallin lukitus on **oletusarvoisesti pois käytöstä**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ylävirran tilakoodit, jotka lasketaan mallikohtaisiksi virheiksi. |
| `baseCooldownMs`        | `120_000` (120 s)                | Ensimmäisen virheen lukituksen alkuperäinen kesto.                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Porrastetun jäähdytyksen yläraja.                                 |
| `maxBackoffSteps`       | `10`                             | Eksponentiaalisen vastaviiveen eskaloinnin enimmäisaskelmäärä.    |
| `useExponentialBackoff` | `true`                           | Kasvattavatko toistuvat virheet jäähdytystä eksponentiaalisesti.  |

Asetukset säilytetään normaalissa asetusvarastossa ja validoidaan
resilienssiasetusten skeemalla; kortti rajaa `baseCooldownMs`-/`maxCooldownMs`-arvot
(ehdolla `maxCooldownMs ≥ baseCooldownMs`) sekä `maxBackoffSteps`-arvon.

**Onnistumisiin perustuva palautuminen:** palautuminen **ei** perustu pelkästään ajastimen umpeutumiseen. Toimiva
vastaus pienentää mallin virhemäärää asteittain, joten kesken aikajakson palautunut malli
lakkaa eskaloitumasta (ja sen lukitus poistuu) ennen ajastimen umpeutumista. Kun yhdistelmäkohde onnistuu,
`open-sse/services/combo.ts` kutsuu funktiota `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), joka **puolittaa** tallennetun
`failureCount`-arvon (`Math.floor(failureCount / 2)`); kun arvo saavuttaa arvon `0`, lukitusmerkintä
poistetaan kokonaan. Vastinfunktio `recordModelLockoutFailure()`
kasvattaa määrää (ja porrastaa jäähdytystä) eskalointi-ikkunan aikana tapahtuvien virheiden yhteydessä.
Tämä onnistumisiin perustuva palautuminen täydentää tavallista ajastimen umpeutumista —
kumpi tahansa polku voi ottaa mallin uudelleen käyttöön.

**Tila:** lukitukset säilytetään **muistissa** (prosessikohtaiset `Map`-rakenteet,
joiden `ModelLockoutEntry`-arvot on avaimettu muodossa `provider:connectionId:model` ja täsmällisen laajuuden lukitukset muodossa
`provider:connectionId:exact:model`), eikä niitä tallenneta
tietokantaan — ne menetetään uudelleenkäynnistyksen yhteydessä. _Asetukset_ säilytetään; aktiivinen
lukitus_tila_ on tilapäinen.

---

## 4. Kiintiöjaon rinnakkaisuuden hallinta (v3.8.36)

Tilauspohjaiset tilit (GLM, MiniMax jne.) hyväksyvät usein vain noin 1–3 samanaikaista
pyyntöä. Tämän rajan ylittäminen aiheuttaa 429-virheitä ja jäähyjaksoja. Ongelma korostuu
**kiintiöjako**-yhdistelmissä (`qtSd/…`), joissa useat API-avaimet jakavat saman
ylävirran tilin. Kolme kerrosta estävät jaetun tilin ylikuormittamisen.

### Yhteyskohtainen rinnakkaisuusraja (`max_concurrent`)

Jokaiselle palveluntarjoajayhteydelle voidaan määrittää `max_concurrent`-yläraja
(`provider_connections.max_concurrent`, asetetaan yhteyden valintaikkunassa / API:n / tietokannan kautta).
Jätä se tyhjäksi, jos et halua rajaa. Tämä on ainoa asetus, joka ohjaa alla olevaa
sarjallistamiskerrosta — aseta siihen tilin todellinen rinnakkaisuusraja (esim. GLM ~1, MiniMax ~2).

### Mallikohtaiset rinnakkaisuusrajat (`modelConcurrency`)

Yhteydelle voidaan lisäksi määrittää tarkat mallikohtaiset rinnakkaisuusrajat
sen `rateLimitOverrides`-määrityksessä:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Määritä se yhteyden valintaikkunassa (**Nopeusrajojen ohitukset → Mallikohtaiset
rinnakkaisuusrajat**, yksi `model=cap` riviä kohden) tai
`PATCH /api/providers/[id]` -pyynnöllä käyttäen samaa JSON-rakennetta. Avainten semantiikka:

- **Yhteydenlaajuinen vs. mallikohtainen:** `maxConcurrent` säilyy jaettuna
  yhteydenlaajuisena ylärajana. Kun molemmat ovat käytössä, molemmat portit varataan
  atomisesti samassa yhdistelmäportissa
  (`global → provider → account → model`); käytännössä tiukempi sovellettava raja
  määrää toiminnan.
- **Mallin avaimen tarkka vastaavuus:** avain on reitityksen ratkaisun jälkeen
  suorittajalle välitettävä mallimerkkijono — tavallisesti ylävirran mallin pelkkä tunniste
  (`glm-5`), ei asiakaspuolen `provider/model`-alias (`zai/glm-5` ei
  vastaa tunnistetta `glm-5`). Arvot ovat samanaikaisten pyyntöjen ylärajoja ilmaisevia positiivisia kokonaislukuja.
- **Paikallinen jonotus, ei automaattista tunnistusta:** ylimääräiset pyynnöt jonotetaan paikallisesti
  nykyisten jono- ja aikakatkaisukäytäntöjen mukaisesti (tyypitetyt `SEMAPHORE_TIMEOUT`- /
  `SEMAPHORE_QUEUE_FULL`-hyväksyntävirheet). OmniRoute ei tunnista tai
  päättele ylävirran käytäntöä — se valvoo täsmälleen operaattorin
  määrittämiä ylärajoja. Täynnä oleva malliportti ei koskaan poista palveluntarjoajaa käytöstä eikä
  koskaan aiheuta mallin pysyvää lukkiutumista. Ylävirran 429-/jäähy-/varareittikäyttäytyminen
  säilyy virheiden viimeisenä varmistuksena.
- **Yhteys- ja prosessikohtainen laajuus:** rajat ovat tietokantayhteyskohtaisia
  ja niitä ylläpidetään muistissa, joten kaksi samaa ylävirran API-avainta käyttävää yhteyttä
  eivät koordinoi toimintaansa keskenään.
- **Määrittämätön tarkoittaa muuttumatonta:** määrityksen pois jättäminen (tai
  hallintapaneelin kentän jättäminen tyhjäksi) ei lisää malliporttia. Esimerkkimääritys,
  joka ei oleta yleistä palveluntarjoajakohtaista rajaa:

```text
glm-5=1
glm-4.7=3
```

### Kiintiöjakopyyntöjen sarjallistaminen

Kun kiintiöjaon välitys kohdistuu yhteyteen, jolle on määritetty positiivinen
`max_concurrent`, kyseiselle **tilille** osoitetut samanaikaiset pyynnöt sarjallistetaan
yhteyskohtaisella semaforilla (avain `qsconn:<connectionId>`): ylimääräiset pyynnöt **odottavat
jonossa** sen sijaan, että ne ylikuormittaisivat tiliä. Toiminta on **fail-open** — täysi
jono tai aikakatkaisu jatkaa ilman varattua paikkaa sen sijaan, että välitettävissä oleva
pyyntö koskaan hylättäisiin. Toiminnon voi ottaa käyttöön tai poistaa käytöstä kohdassa **Asetukset → Häiriönsieto → Kiintiöjaon yhteyskohtainen
rinnakkaisuus** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, oletuksena
käytössä). Ilman `max_concurrent`-rajaa toiminta ei muutu.

> Kiintiöjaon reititysportti (`selectQuotaShareTarget`, DRR + P2C) on itsessään
> fail-open ja vain _alentaa prioriteettia_ rajansa saavuttaneelta yhteydeltä — yhden
> yhteyden varannossa se ei voi asettaa kovaa rajaa, joten juuri tämä semafori tosiasiassa
> hillitsee pyyntötulvaa.

### Jäähyn huomioiva yhdistelmäuudelleenyritys

Kun toiminto on käytössä, kaikissa yhdistelmästrategioissa pyyntö, joka muutoin vahvistaisi
429-virheen LYHYEN tilapäisen jäähyn vuoksi, odottaa jäähyn päättymistä ja välitetään uudelleen
429-virheen palauttamisen sijaan — tämä kattaa Gemini-tyyppiset TPM-/RPM-ikkunat (noin 60 sekunnin retry-after)
usean mallin yhdistelmissä, esimerkiksi silloin, kun kaksimallisen yhdistelmän molemmat kohteet
saavuttavat mallikohtaisen nopeusrajan. Toimintoa rajoittaa `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) kohdassa **Asetukset → Häiriönsieto**. Se ei koskaan odota syyn ollessa `quota_exhausted`
(lukittu keskiyöhön asti) eikä todennus- tai ei löydy -syiden vuoksi.

Sama portti kattaa välitystä edeltävän tilanteen (#16319): kun yhdistelmän jokainen kohde
ohitetaan ennen yhtäkään yritystä, koska sen malli on lyhyessä
tilapäisessä lukituksessa, nollan yrityksen polku odottaa lukituksen päättymistä samojen
ylärajojen puitteissa ja välittää pyynnön uudelleen sen sijaan, että se vastaisi vihjeettömällä
`503 ALL_TARGETS_SKIPPED`-virheellä. Kun odottamista ei sallita (yläraja, yritysmäärä tai budjetti
on käytetty loppuun tai toiminto on pois käytöstä), lopullinen vastaus korotetaan muotoon
`429 rate_limit_error`, ja se sisältää aikaisimman tilapäisen lukituksen päättymisestä saadut
`retry_after`- / `reset_at`-arvot. Kiintiö-, todennus- ja ei löydy -lukitukset säilyttävät vihjeettömän 503-vastauksen.

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

## 5. Pyyntöjonon sisäänoton hallinta (v3.8.49 · ongelma #6593)

**Laajuus**: paikallinen palveluntarjoaja- ja yhteyskohtainen nopeusrajoitusjono (`open-sse/services/rateLimitManager.ts`,
jonka taustalla toimii Bottleneck), yhtä tasoa alempana kuin kolme yllä kuvattua mekanismia.

**`maxWaitMs` rajoittaa jonotusaikaa; `executionMaxWaitMs` rajoittaa suoritusaikaa.**
Nämä kaksi on tarkoituksella erotettu toisistaan, eikä kumpikaan vaikuta toiseen.

`resilienceSettings.requestQueue.maxWaitMs` on **jonotusajan budjetti**: se
kattaa palveluntarjoajan vapaan paikan odottamisen ja sitä seuraavan QUEUED-tilassa
olemisen, ja sen ajastin tyhjennetään heti, kun työ poistuu QUEUED-tilasta ja
aloittaa suorituksen (`rateLimitManager.ts`, `wrappedFn`). Sen ylittävä pyyntö
ei koskaan päädy ylävirran palveluun. Oletusarvo on 30000ms, ja sen antaa
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` tiedostossa
`src/lib/resilience/settings.ts`. Arvo on myös kiinnitetty testissä
`tests/unit/ratelimit-admission-control-6593.test.ts`, joten sen muuttaminen
rikkoo testin sen sijaan, että tämä kappale vanhenisi huomaamatta.

`resilienceSettings.requestQueue.executionMaxWaitMs` on arvo, jonka Bottleneck
saa työn `expiration`-arvoksi ja jonka ajastin käynnistyy vasta lähettämisen
jälkeen. Se toimii varmistuksena suorittajille, joilla ei ole omaa ylävirran
aikakatkaisua, ja se nostetaan suorittajan oman haun aloituksen aikakatkaisun
tasolle, jos tämä on pidempi, joten se ei voi katkaista tervettä, käynnissä
olevaa vastausta. Oletusarvo on 600000ms (10 min).

Jonotusbudjetin syöttäminen `expiration`-arvoksi aiheutti aiemmin sen, että
ei-inkrementaaliset yhdyskäytävät keskeytettiin suorituksen aikana — ne voivat
oikeutetusti toimia useita minuutteja ennen ensimmäisiä tavuja — ja tämän vuoksi
vanheneminen esitetään muodossa `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), kun taas jonotusbudjetti käyttää
jonon aikakatkaisukoodia. Kumman tahansa voi ohittaa asetuksella
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (ympäristömuuttuja)
tai hallintapaneelissa (**Asetukset → Vikasietoisuus**). Molemmat rajataan
normalisoinnin yhteydessä välille 1ms–24h.

**Molempien etusijajärjestys:** ympäristömuuttuja määrittää vain _oletusarvon_.
Kohteeseen `resilienceSettings.requestQueue` tallennettu arvo (hallintapaneelin
/ API-korjauksen kautta, tallennettuna kohteeseen `key_value`) ohittaa sen, ja
yhteyskohtainen `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ohittaa
puolestaan tallennetun arvon. Jos käyttöönotossa on jo tallennettu arvo,
ympäristömuuttujan asettaminen ei siis muuta mitään — tyhjennä tai päivitä
tallennettu asetus sen sijaan.

Jonossaoloa rajoittaa `maxWaitMs`; alla kuvattu `maxQueueDepth` rajoittaa sitä,
kuinka monta kutsujaa voi olla samanaikaisesti jonossa.

**Vastauksen rungossa ilmoitetut uudelleenyritykset: tahdistus vai lukitus.**
429-vastauksen runko voi määrittää oman odotusaikansa (Geminin
`RetryInfo.retryDelay`, teksti "retry after Ns"), jonka `updateFromResponseBody`
lukee. Yhteyden `maxWaitMs`-arvoon mahtuva odotus on tahdistusta: rajoitin
tyhjentää säiliönsä kyseiseksi ajaksi, ja jonossa olevat kutsut lähetetään, kun
säiliö täyttyy uudelleen. `maxWaitMs`-arvoa pidempää odotusta jono ei voi
odottaa loppuun — Gemini vastaa kuluneeseen päiväkohtaiseen kiintiöön arvolla
`retryDelay: "86399s"`. Uudelleen muodostetussa 429-vastauksessa (#16528)
välitetty `Retry-After` saa jo varamekanismin lukitsemaan mallin kyseiseksi
ajaksi, mutta rajoittimen keskeyttäminen samaksi ajaksi pysäyttäisi silti
kaikki avaimelle liian aikaisin saapuvat kutsut (esimerkiksi vikasietoisuuden
nollauksen jälkeen) koko `maxWaitMs`-ajaksi. Kun tällainen odotus tulee
tyypitetystä Googlen `RetryInfo`-tiedosta (`google_rpc_retry_info`-alkuperä) ja
avaimen rajoitin on jo rajattu malliin (katso `getLimiterKey`), 429-vastauksesta
tulee sen sijaan kyseisen yhteyden mallilukitus (`lockModelForLongBodyRetry`
tiedostossa `open-sse/services/rateLimitManager/bodyRetryPause.ts`, enintään
24h), eikä rajoitinta keskeytetä. Tilin valinta ohittaa lukitun mallin
`isModelLocked()`-tarkistuksen avulla, samoin kuin yhdistelmän lähetystä edeltävä
portti yhteyteen kiinnitetyille kohteille. Antigravityssa, jossa rajoitin on
kiintiöperhekohtainen, lukitus kohdistuu täsmälliseen malliin muiden
kiintiölukitusten tapaan. Myös asiakkaan pyytämä nimi lukitaan, kun alias
ratkaisi sen kyseiseksi malliksi, koska nämä tarkistukset käyttävät pyydettyä
nimeä; se lukitaan täsmällisesti (`lockExactModel`), joten antigravityn
kiintiöperheen tai codex-alueen ylittävä alias ei koskaan lukitse itseään.
Sanallinen vihje, tyypittämätön `retryDelay` tai koko yhteyden jakama rajoitin
säilyttää keskeytyksen. Kun juuri uudelleen muodostettu 429-polun rajoitin
keskeytyy, kutsuja, jonka jäljellä oleva jonotusaika päättyy ennen keskeytystä,
hylätään välittömästi jonon aikakatkaisukoodilla (`checkLimiterPause`) sen
sijaan, että se odottaisi ajan loppuun; tallennettu päättymisaika ankkuroidaan
ennen rajoittimen luomista kohtaan, jossa Bottleneck käynnistää
päivityskellonsa, ja kaikki myöhemmät säiliön muutokset unohtavat sen. Tämän
kattavat `tests/unit/rate-limit-long-body-retry-lockout.test.ts` ja
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — valinnainen sisäänoton rajoitus (uusi).** `resilienceSettings.requestQueue.maxQueueDepth`
rajoittaa sitä, kuinka monta pyyntöä voi olla samanaikaisesti jonossa (ei vielä
lähetettynä) yhtä palveluntarjoaja- ja yhteysyhdistelmää kohden. Kun jonossa on
jo `maxQueueDepth` pyyntöä, uusi pyyntö hylätään nopeasti tyypitetyllä
`code: "RATE_LIMIT_QUEUE_FULL"` -virheellä **ennen** kuin se koskaan saavuttaa
kutsun `limiter.schedule()` — näin hylkäys on kevyt ja tapahtuu ennen kyseisen
pyynnön myöhempää kehotteen pakkaus- tai käännöstyötä. Oletusarvo `0` =
poissa käytöstä, mikä säilyttää nykyisen rajoittamattoman jonon toiminnan;
rajattu välille 0–100000. Arvon voi ohittaa asetuksella
`RATE_LIMIT_MAX_QUEUE_DEPTH` (ympäristömuuttuja) tai
`resilienceSettings.requestQueue.maxQueueDepth` (hallintapaneelin/API:n korjaus).

Sisäänoton tarkistus on itsessään puhdas funktio
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), joten
sitä voidaan yksikkötestata ilman todellista Bottleneck-rajoitinta.

> RFC, joka avasi ongelman #6593, ehdotti myös `bypassCompressionOnRateLimit`-
> lippua. Tämän repon `open-sse/services/compression/`-putki käsittelee
> kehotteen/kontekstin pakkausta lähtevälle LLM-pyynnölle (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy`-lohkon ympärillä),
> ei HTTP-vastauksen pakkausta muodostetuille 429-vastauksille — kirjaimelliselle
> ohituslipulle ei ole vastaavaa koodipolkua. Tämä kehotteen pakkausvaihe
> suoritetaan tällä hetkellä myös _ennen_ `withRateLimit()`-kutsua pyyntöputkessa,
> joten vaiheiden järjestäminen uudelleen siten, että pakkaus ohitetaan jonon
> täyttymisestä johtuvan hylkäyksen yhteydessä, on erillinen ja tämän ongelman
> laajuutta suurempi muutos. Sitä ei tarkoituksellisesti **toteutettu** tässä,
> vaan se jätetään jatkotoimenpiteeksi, jos suorittimen kuormituksen vähentämisestä
> saatava hyöty on uudelleenjärjestämisen riskin arvoinen.

### Nopeusrajoituksen automaattisen käyttöönoton turvaverkko ja yhteyksien suojaus (`rateLimitProtection`)

**Automaattisen käyttöönoton turvaverkko** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, oletus `true`):
Oletusarvoisesti OmniRoute ottaa automaattisesti käyttöön nopeusrajoitusjonon suojauksen kaikille aktiivisille API-avaimia käyttäville palveluntarjoajayhteyksille (`getProviderCategory(provider) === "apikey"`). Näin varmistetaan, että nopeusrajoituksille alttiisiin ylävirran API-avaimiin kohdistuvat saapuvat pyynnöt jonotetaan ja niiden nopeutta rajoitetaan Bottleneckin avulla sen sijaan, että ne lähetettäisiin ryöppyinä ja aiheuttaisivat ylävirrassa 429-virheitä. Turvaverkon asetuksen voi ohittaa `RATE_LIMIT_AUTO_ENABLE`-ympäristömuuttujalla (`false`/`0`/`off` poistaa sen käytöstä, `true`/`1`/`on` pakottaa sen käyttöön), joka on etusijalla hallintapaneelin pysyvään asetukseen nähden (**Asetukset → Vikasietoisuus** / `PATCH /api/resilience`).

**Yhteyskohtaisen `rateLimitProtection`-asetuksen semantiikka:**
Yhteyskohtaista nopeusrajoitussuojausta seurataan palveluntarjoajayhteyksien `rateLimitProtection`-totuusarvokentän avulla (tallennetaan SQLiteen nimellä `rate_limit_protection`):

- **Nimenomaisesti käytössä (`rateLimitProtection === true`)**: Nopeusrajoitussuojaus on otettu nimenomaisesti käyttöön tälle yhteydelle riippumatta palveluntarjoajan luokasta tai siitä, onko automaattisen käyttöönoton turvaverkko käytössä.
- **Nimenomaisesti pois käytöstä (`rateLimitProtection === false`)**: Poistaa nimenomaisen suojauksen käytöstä, mutta **ei** vapauta aktiivista API-avainyhteyttä globaalista automaattisen käyttöönoton turvaverkosta. Kohdassa `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) arvot `false` ja `undefined` ovat samanarvoisia: vain `rateLimitProtection === true` käsitellään nimenomaisena ohituksena. Jos `rateLimitProtection` on `false` (tai sitä ei ole asetettu), aktiivinen API-avainyhteys täyttää edelleen automaattisen käyttöönoton ehdon ja pysyy nopeusrajoitussuojattuna.
- **Ei yhteyskohtaista poissulkemista**: Ylläpitäjä ei tällä hetkellä voi määrittää, että ”tämän yksittäisen aktiivisen API-avainyhteyden on toimittava ilman nopeusrajoitusjonon suojausta”, samalla kun automaattinen käyttöönotto pysyy aktiivisena muille yhteyksille. Jotta API-avainyhteyksiä voidaan käyttää kokonaan ilman nopeusrajoitusjonoja, turvaverkko on poistettava käytöstä globaalisti (`RATE_LIMIT_AUTO_ENABLE=false` tai `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Tuetut kirjoituspolut:**

- **`POST /api/rate-limits`**: Tuettu hallinnan kirjoituspolku yhteyden `rateLimitProtection`-asetuksen vaihtamiseen (`{ connectionId: string, enabled: boolean }`). Kutsu arvolla `enabled: true` ottaa nimenomaisen suojauksen käyttöön; kutsu arvolla `enabled: false` poistaa nimenomaisen suojauksen (aktiiviset API-avainyhteydet kuuluvat kuitenkin edelleen globaalin turvaverkon piiriin, jos automaattinen käyttöönotto on käytössä).
- **`PUT /api/providers/[id]`**: Ei tarkoituksellisesti hyväksy eikä muuta `rateLimitProtection`-asetusta (#11278). Palveluntarjoajayhteyden metatietojen päivittäminen reitin `PUT /api/providers/[id]` kautta ei koskaan muuta tallennettua nopeusrajoitussuojauksen tilaa.

---

## 6. Hitaan tietovirran läpäisykyvyn valvontamekanismi (#9709)

Valinnainen `resilienceSettings.streamRecovery.throughputWatchdog`-suoja tunnistaa
ylävirran, joka lähettää edelleen osia mutta tuottaa avustajan tulostetta alle
määritetyn hyödyllisen tulosteen nopeuden. Se on tarkoituksellisesti erillinen
joutoaikakatkaisusta: sykepaketit ja metatiedot eivät nollaa kumpaakaan ajastinta
eikä niitä lasketa edistymiseksi. Se on myös erillinen yrityksen ehdottomasta
määräajasta (#9153), joka säilyy absoluuttisena turvarajana tulosteen laadusta
riippumatta.

Valvontamekanismi edellyttää lämpenemisjaksoa ja sen jälkeen kokonaista liukuvaa
aikaikkunaa ennen kuin se voi keskeyttää. Se laskee Chat Completions- ja Responses
API -tulostetapahtumien tekstimuutokset (konservatiivisena UTF-8-tavujen
likimääräisenä mittana), ohittaa vain käyttöä koskevat ja tyhjät tapahtumat sekä
keskeyttää arvioinnin työkalukutsu- tai päättelytapahtumien ollessa käynnissä. Se on
oletusarvoisesti poistettu käytöstä ja voidaan ottaa käyttöön asetuksella
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; ikkunaa, lämpenemisaikaa,
vähimmäisnopeutta ja mitattavissa olevan tulosteen vähimmäismäärää rajoittaa
normaali häiriönsietoasetusten normalisointikerros.

Kun valvontamekanismi on käytössä, sen tekemä keskeytys kohdistetaan vain aktiiviseen
ylävirtayritykseen. Ennen kuin asiakkaalle näkyviä tavuja on lähetetty, olemassa
oleva saman tilin varhainen palautuspolku voi avata yrityksen uudelleen. Vahvistuksen
jälkeen tietovirtaa ei koskaan toisteta sokeasti; vain olemassa oleva turvallinen
tietovirran keskeltä jatkamisen sopimus voi liittää loppuosan. Viimeistely tehdään
edelleen vain kerran, joten käytön laskentaa ja semaforin vapautusta ei tehdä
kahteen kertaan.

---

## 7. Ylävirran tilan uudelleenmäärittely (virheellisesti ilmoitetut kiintiövirheet)

**Soveltamisala:** yksi ylävirran yhdyskäytävä, joka ilmoittaa tilapäisestä kiintiön loppumisesta väärällä HTTP-tilalla.

**Tarkoitus:** korjata harhaanjohtava tila ENNEN luokittelua, jotta alavirran kuluttajat (varajärjestelmä, yhdistelmäkoonti ja asiakkaalle annettava vastaus) näkevät virheen todellisen, uudelleenyrityksen sallivan luonteen.

Jotkin yhdyskäytävät ilmoittavat TILAPÄISESTÄ kiintiön loppumisesta HTTP-tilalla,
joka ei salli uudelleenyritystä. `agentrouter.org` palauttaa tilan `403` (joskus
`400`) ja kiinankielisen rungon (`用户额度不足` / `额度不足`) normaalin tilan `429`
sijaan. Claude Coden kaltaiset asiakkaat käsittelevät tilan `403` pysyvänä ja
keskeyttävät istunnon, ja ilman korjausta varajärjestelmä luokittelisi sen
`AUTH_ERROR`-virheeksi kiintiötapahtuman sijaan.

**Toteutus:**

- Rekisteri + täsmäytin: `open-sse/config/upstreamStatusRestatement.ts` —
  palveluntarjoajakohtainen sääntöluettelo (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), joka täsmäytetään funktiolla `applyStatusRestatement()`.
- Kutsukohta: `providerFailure:`-lohko tiedostossa `open-sse/handlers/chatCore.ts`
  (noin rivillä 3654), heti sen jälkeen, kun `parseUpstreamError()` on jäsentänyt
  virheellisen HTTP-tilan sisältävän ylävirran vastauksen (`!providerResponse.ok`),
  ja ennen minkään luokittelun suorittamista, jotta jokainen alavirran kuluttaja
  näkee korjatun tilan. `200` SSE -tietovirran sisään upotetut virheet kulkevat
  erillistä, myöhempää tietovirran jäsennyspolkua, eikä tämä koukku **kata** niitä
  tällä hetkellä — kyseessä on tunnettu rajoitus, jota ei vielä tarvita
  agentrouterin virheellisesti ilmoittamaan tilaan (joka ilmenee virheellisenä
  HTTP-tilana).
- Uudelleenyrityksen kelpoisuus: `429` sisältyy joukkoon
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), joten uudelleenmääritetty
  virhe sisältää todellisen uudelleenyritysikkunan sen sijaan, että se näkyisi
  käyttökelvottomana `403`-tilana.
- Synteettinen `60s`-arvo `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  kertoo ainoastaan sen, mitä uudelleenmääritetty vastaus ilmoittaa
  **asiakkaalle**; se ei itsessään ole yhteyden sisäisen jäähdytys- tai
  lukitusjakson kesto — sitä hallitsee erikseen mekanismi, joka tosiasiallisesti
  käsittelee uudelleenmääritetyn virheen (yhteyden jäähdytyksen kasvava
  eksponentiaalinen viive, §2, perusarvo `3s` API-avainpohjaisille
  palveluntarjoajille; tai mallin lukitus, §3, agentrouterin kaltaisille
  mallikohtaista kiintiötä käyttäville palveluntarjoajille). Reititin voi tulla
  sisäisesti uudelleenyrityskelpoiseksi aiemmin kuin asiakkaalle ilmoitettu 60s:n
  ikkuna — tämä on tarkoituksellista pelivaraa, ei ohjelmavirhe.

Pysyviä virheitä (agentrouterin `无权访问模型` — ei käyttöoikeutta tähän malliin) ei
KOSKAAN määritellä uudelleen: `excludeMarkers` estää säännön, vaikka
`textMarkers` täsmäisi, joten virhe säilyttää alkuperäisen tilansa eikä mikään yritä
sitä uudelleen loputtomasti. Vastaavaa palveluntarjoajan luokittelusääntöä
(`agentrouter-model-access-denied` tiedostossa `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, ilmoitettu `6h`:n perusjäähdytys)
käyttää `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_ennen_ yleistä apikey-luokan `FORBIDDEN`-varhaispalautusta, ehdollisesti funktion
`honorsRuleLockScope(provider)` perusteella (#10334 — tällä hetkellä vain
agentrouterille sallittu tiedoston `providerErrorRules.ts`
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen luettelon kautta). Säännön ilmoitettu
6h:n jäähdytys välittyy arvona `fallbackResult.baseCooldownMs`, mutta se syötetään
edelleen ennestään olemassa olevaan mallikohtaisen kiintiön lukituspolkuun
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, jota #10334 ei
muuttanut jäähdytyksen lähdettä lukuun ottamatta): se rajataan alaspäin
operaattorin `mlSettings.maxCooldownMs`-arvoon (oletuksena `1_800_000ms` / 30min)
kuten kaikki muutkin mallilukitukset, ja _tallennettu lukituksen syy_ säilyy
ennestään kovakoodattuna arvona `"forbidden"`, ei säännön arvona `"auth_error"` —
vain jäähdytyksen kesto huomioidaan päästä päähän, ei syymerkkijonoa. Itse yhteys
pysyy aktiivisena; tämä ei vaikuta saman yhteyden rinnakkaisiin malleihin.

Uudelleen ilmaistut kiintiövirheet (`额度不足`) osuvat tuotannossa palveluntarjoajasääntöön
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ei omaa määritettyä jäähdytysaikaa — pysyvyyskerroksen
skaalatun viiveen oletusarvoa käytetään). Muutoksesta #10334 lähtien
`ProviderErrorRuleMatch`-objektin `scope` välitetään koko käsittelyketjun läpi,
mutta **vain** `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen palveluntarjoajien
osalta (`providerErrorRules.ts` — tällä hetkellä vain `"agentrouter"`,
rajattuna funktion `honorsRuleLockScope()` kautta). Kaikilla muilla
palveluntarjoajilla `scope` on edelleen vain informatiivinen, aivan kuten
ennen muutosta #10334. `checkFallbackError` tuo täsmänneen säännön vaikutusalueen
saataville kentässä `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) on yhteinen suojatarkistus, joka vahvistaa, että
`ruleScope` on aidosti turvallista tulkita koko yhteyttä koskevaksi,
itsestään palautuvaksi signaaliksi (vaikutusalue `"connection"`, syy
`quota_exhausted`, ei koskaan `permanent`, ei koskaan `creditsExhausted` —
suoja siltä varalta, että tuleva sääntö yhdistäisi vaikutusalueen
`"connection"` pysyvään tilin tilaan). Sitä kutsuu kaksi kuluttajaa:

- **Pysyvyys** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  sen sijaan, että käsittely siirtyisi läpivientipalveluntarjoajan
  **mallikohtaiseen** lukitushaaraan (agentrouter käyttää asetusta
  `passthroughModels: true` → `hasPerModelQuota()` palauttaa arvon `true`),
  se ottaa käyttöön **väliaikaisen yhteyden jäähdytysajan** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ei koskaan lopullista tilaa
  (`credits_exhausted`/`banned`/`expired`) — joten yhteys palautuu itsestään
  jäähdytysajan päätyttyä eikä edellytä tunnistetietojen manuaalista
  nollaamista. Tämä ohitetaan yhteyksillä, joilla on `disableCooling: true`
  (#2997): kyseinen poiskytkentä siirtää käsittelyn sen sijaan mallikohtaiseen
  lukitukseen (dokumentoitu kompromissi — katso haaran yläpuolella oleva
  koodikommentti).
- **Saman pyynnön yhdistelmäreititys** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): sama suojatarkistus lisää
  yhteyden muistissa olevaan `exhaustedConnections`-joukkoon avaimella
  `${provider}:${connectionId}`. Tämä ohittaa vain jäljellä olevan SAMAN PYYNNÖN
  kohteen, jolla _itsellään on jo täsmälleen sama `connectionId`_ omassa
  kohdeobjektissaan (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ennen `exhaustedConnections`-hakua) — pelkkä malliluettelon
  yhdistelmä, jossa rinnakkaiskohteilla ei ole omaa kiinnitettyä
  `connectionId`-arvoa ja sellainen ratkaistaan lähetyskohtaisesti vain
  vastauksen `X-OmniRoute-Selected-Connection-Id`-otsakkeesta, ei koskaan
  täsmää tähän avaimeen. Tässä yleisessä tapauksessa todellinen suoja sitä
  vastaan, että jäljellä oleva vaihe käyttäisi uudelleen juuri loppuun
  kulunutta tiliä, EI ole tämä Set — vaan yllä kuvattu pysyvyyskerros
  (yhteyden `rateLimitedUntil` on nyt tulevaisuudessa) yhdessä sen kanssa,
  että sama suojatarkistus estää arvon `transientRateLimitedProviders`
  asettamisen tälle virheelle (katso ”Kaksivaiheinen rakenne” ja
  `targetExhaustion.ts`-tiedoston `isAgentrouterConnectionQuotaScope`-haaran
  koodikommentti): kun kyseinen Set jätetään merkitsemättä, `combo.ts`-tiedoston
  `allowRateLimitedConnection`-pakko-ohitus
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) EI aktivoidu
  palveluntarjoajan jäljellä oleville vaiheille, joten tunnistetietojen
  valinnan `rateLimitedUntil`-suodatinta (`src/sse/services/auth.ts:1238`)
  noudatetaan normaalisti ja jäljellä oleva vaihe joko valitsee toisen,
  edelleen kelvollisen agentrouter-yhteyden tai epäonnistuu, koska
  tunnistetietoja ei ole saatavilla — se ei pakota itseään takaisin yhteyteen,
  jonka tämä haara juuri asetti jäähdytystilaan.

### Kaksivaiheinen rakenne: tilan uudelleenilmaisu ja sitten luokittelu

Tilan uudelleenilmaisun (`upstreamStatusRestatement.ts`) ja palveluntarjoajan
luokittelusääntöjen (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) rekisterit ovat erillisiä. Molemmat käyttävät avaimina
palveluntarjoajan tunnusta ja tekstimerkkejä, mutta ne suoritetaan eri paikoissa
ja palvelevat eri tarkoituksia: uudelleenilmaisu kirjoittaa HTTP-tilan uudelleen
varhaisessa vaiheessa tiedostossa `chatCore.ts`; luokittelusäännöt valitsevat
varareitityksen `reason`-arvon ja lukituksen `scope`-arvon
(`model` / `provider` / `connection`) funktion `checkFallbackError()` sisällä
(`open-sse/services/accountFallback.ts`).

Luokittelusäännöt näkevät täydellisen virheen **tekstin** (jota tarvitaan
rungon merkkien, kuten `额度不足`, täsmäyttämiseen) vain
`providerErrorRules.ts`-tiedoston `FULL_TEXT_RULE_PROVIDERS`-sallittujen
palveluntarjoajien osalta — tällä hetkellä vain `"agentrouter"`. Jokaisen muun
**sisäänrakennetun luettelon** palveluntarjoajan kohdalla `checkFallbackError`
välittää funktiolle `getProviderErrorRuleMatch` vain rakenteisen virheen
(`{code, type}`), mikä riittää otsake-, tila- ja koodipohjaisille säännöille,
mutta ei näe rungon tekstimerkkejä. Apufunktio `resolveRuleMatchBody()` tekee
tämän valinnan: täydellinen virheteksti sallituille palveluntarjoajille,
muutoin rakenteinen virhe. **Sisäänrakennetun** palveluntarjoajan lisääminen
joukkoon `FULL_TEXT_RULE_PROVIDERS` on nimenomainen palveluntarjoajakohtainen
käyttöönotto — sen tarkoituksena on varmistaa, että oletuspolku pysyy
tavu tavulta muuttumattomana jokaiselle palveluntarjoajalle, jota luettelossa
ei ole.

Säännön `scope` (`model` / `provider` / `connection`) on erillinen
käyttöönotto verrattuna luetteloon `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` tuo sen saataville vain kentässä
`fallbackResult.ruleScope`, ja myöhemmät kuluttajat käsittelevät sitä muuna
kuin informatiivisena selitteenä vain saman tiedoston
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen palveluntarjoajien osalta
(`gated via honorsRuleLockScope()` — tällä hetkellä vain `"agentrouter"`).
Katso yllä olevasta kohdasta ”Uudelleen ilmaistut kiintiövirheet”, mitä
`scope: "connection"` -täsmäys käytännössä tekee sen jälkeen, kun
palveluntarjoaja on lisätty kyseiseen sallittujen luetteloon.

**#11104 — operaattorin määrittämät säännöt ohittavat molemmat sallittujen luettelot.** Operaattori voi
määrittää palveluntarjoajakohtaisen säännön ajon aikana asetuksella `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
muokkaamatta tätä tiedostoa. Operaattorin säännön rajaaminen
`FULL_TEXT_RULE_PROVIDERS`-/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen luetteloiden taakse —
joiden tarkoituksena on suojata sisäänrakennettujen katalogisääntöjen **oletusarvoista**
toimintaa — tekisi asetusmekanismista toimimattoman kaikille muille paitsi jo
luetteloissa oleville palveluntarjoajille, koska säännön määrittäminen on jo itsessään operaattorin
nimenomainen hyväksyntä. `resolveRuleMatchBody()` ja `honorsRuleLockScope()` tarkistavat
molemmat ensin `hasOperatorRuleForProvider()`-funktion: operaattorin säännön saanut palveluntarjoaja saa
raakamuotoisen virhetekstin, ja sen määrittämää `scope`-arvoa noudatetaan riippumatta siitä,
esiintyykö palveluntarjoaja lisäksi kummassakaan sallittujen luettelossa.

**Tunnettu puute — `providerRuleRegistry`-rekisteriä ei koskaan käytetä HTTP 400 -virheille.**
`checkFallbackError`-funktion `BAD_REQUEST`-haara luokittelee tilan 400 kokonaan
omien mallitaulukoidensa kautta (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` jne. tiedostossa `accountFallback.ts`) ja palauttaa tuloksen ennen kuin
sen yläpuolella oleva `configuredRule`-/`getProviderErrorRuleMatch`-haara saavutetaan.
Sisäänrakennettu katalogisääntö (tai operaattorin sääntö), jonka `status: 400`, on
syntaktisesti kelvollinen, mutta sitä ei koskaan suoriteta. Mikään nykyinen sääntö ei kohdistu tilaan 400,
joten tämä ei vaikuta mihinkään tuotannossa — tuleva 400-sääntö edellyttää kuitenkin ensin
tämän haaran muuttamista, mikä on suurempi muutos kuin säännön lisääminen (se
luokittelee tilan 400 uudelleen jokaiselle palveluntarjoajalle, joka jo käyttää mallitaulukoihin perustuvaa
toimintaa), eikä kuulu yksittäisen palveluntarjoajan säännön lisäämisen laajuuteen.

### Uuden kiintiön väärin ilmoittavan yhdyskäytävän lisääminen

1. Rekisteröi yksi sääntötaulukko rekisteriin `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Pidä `textMarkers`
   palveluntarjoajakohtaisina; älä koskaan käytä uudelleen yleisiä englanninkielisiä ilmauksia, jotka ovat ristiriidassa
   `CREDITS_EXHAUSTED_SIGNALS`-arvojen kanssa (`open-sse/services/accountFallback.ts`).
2. Rekisteröi halutessasi luokittelusäännöt tiedostossa
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) oikean
   lukituksen laajuuden valitsemiseksi (`connection` tilikohtaiselle kiintiölle, `model`
   mallikohtaisille virheille). Tämä vaihe vaikuttaa tuotannossa vain niihin
   palveluntarjoajiin, joiden säännöt tarvitsevat koko virhetekstin (rungon merkkijonot): lisää
   palveluntarjoajan tunnus saman tiedoston `FULL_TEXT_RULE_PROVIDERS`-luetteloon — muutoin
   `checkFallbackError` välittää säännölle aina vain jäsennellyn
   `{code, type}`-virheen, eikä rungon tekstiin perustuva sääntö koskaan vastaa tuotantoliikenteessä.
   Säännöt, jotka vastaavat pelkästään `status`-/`headers`-tietojen perusteella (kuten Opencoden tai
   Minimaxin säännöt), eivät tarvitse tätä käyttöönottoa. Jos sääntö lisäksi määrittää
   `scope: "connection"` ja tarkoituksena on varsinainen yhteydenlaajuinen jäähdytysjakso
   sekä saman pyynnön yhdistelmän ohittaminen (ei vain informatiivinen tunniste), lisää
   palveluntarjoajan tunnus saman tiedoston `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-luetteloon — tämä
   rajaa `isAgentrouterConnectionQuotaScope()`-tyylisen käsittelyn käytön funktiossa
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ja funktiossa
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); ilman sitä `scope`
   välitetään edelleen `fallbackResult.ruleScope`-arvon kautta, mutta mikään ei reagoi siihen.
3. Lisää yksikkötestit tiedostojen `tests/unit/upstream-status-restatement.test.ts`
   ja `tests/unit/agentrouter-error-rules.test.ts` mallin mukaisesti (mukaan lukien
   not-permanent- / not-creditsExhausted-suojaukset sekä — jos palveluntarjoaja tarvitsee
   sallittujen luetteloa — testi, joka varmistaa `resolveRuleMatchBody()`-funktion palauttavan
   koko tekstin vain kyseiselle palveluntarjoajalle).

Muutoksia tiedostoihin `chatCore.ts`, `classifyError` tai yhdistelmälogiikkaan ei tarvita.

#### Lähtöliikennekohtaisesti ryhmitelty lukitus (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-luettelon palveluntarjoajia (opencode-perhe) käsitellään
lähtö-IP:n mukaan ryhmiteltyinä ylävirtapalveluina (opencoden ilmaistaso on ryhmitelty IP-osoitteen eikä
tilin mukaan — katso #9611): tilan 429 luokittelu arvoksi `quota_exhausted`
**tai** `rate_limit_exceeded` asettaa jäähdytysjakson jokaiselle sallitun perheen yhteydelle,
jonka viimeksi tunnettu lähtö-IP vastaa epäonnistuneen yhteyden IP-osoitetta, ennen kuin
kierto voi yrittää niitä
— näin vältetään N-1 varmasti epäonnistuvaa ylävirtakutsua (sama rakenne kuin tapauksissa #10460/#10525).
`rate_limit_exceeded` on mukana tarkoituksella: `markAccountUnavailable`-polulla
opencode-kohtaiset säännöt eivät koskaan vastaa (otsakkeita/runkoa ei välitetä
`checkFallbackError`-funktiolle, eikä opencode ole `FULL_TEXT_RULE_PROVIDERS`-luettelossa), joten 429,
jonka runko sisältää tilauskiintiön tekstin ("monthly usage limit
reached"), luokitellaan arvoksi `quota_exhausted` kiintiötekstin varatoiminnon avulla
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 tunnin jäähdytysjakso) ennen kuin
`status_429`-sääntö edes saavutetaan — kun taas 429 ilman kiintiötekstiä (tavallinen
nopeusrajoitus) luokitellaan `status_429`-säännön kautta arvoksi `rate_limit_exceeded`
ja asettaa silti IP-perheen jäähdytysjaksolle. Sallitun luettelon palveluntarjoajalle IP-kohtainen
nopeusrajoitus on sama signaali kuin loppuun käytetty kiintiö. Tiedossa olevat rajoitteet:

- **Parhaan yrityksen periaate**: lukitus selvittää yhteyden viimeksi tunnetun `egress_ip`-arvon
  `proxy_logs`-taulusta (24 tunnin ikkuna, synkroninen, ei välimuistia). Jos välimuisti on kylmä (lähtevää
  IP-osoitetta ei ole koskaan tarkistettu) tai riviä ei löydy → epäonnistunut yhteys asetetaan silti
  haaran määrittämälle jäähdytysjaksolle (kirjataan kuten nykyään), mutta sisaryhteyttä ei lukita.
- **Ei koskaan lopullinen**: jäähdytysjakso on uusiutuva kiintiöikkuna
  (`testStatus: "unavailable"`); pysyvää tilaa ei koskaan johdeta
  IP-tason signaalista. `disableCooling`-yhteydet ohittavat haaran kokonaan.
- **Lukituksen rakeisuus muuttuu sallittujen palveluntarjoajien perheelle**: tämä on laajuuden
  muutos, ei pelkästään sisaryhteyksiä koskeva optimointi. opencode on `passthroughModels`-
  palveluntarjoaja, joten ennen tätä haaraa 429 tuotti mallikohtaisen lukituksen; nyt se
  tuottaa yhteyden jäähdytysjakson — myös operaattorille, jolla on käytössä vain yksi
  yhteys eikä lainkaan sisaryhteyksiä. Tämä on rakeisuus, jonka opencoden sääntötaulukko
  on jo määrittänyt oikeaksi (`scope: "connection"`,
  `providerErrorRules.ts`), mutta jota ei ole tähän asti noudatettu, koska opencode ei kuulu
  joukkoon `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Haara kirjoittaa epäonnistuneen
  yhteyden jäähdytysjakson + `backoffLevel`-arvon itse, yhteyskohtaisen
  agentrouter-haaran tapaan, ja palaa — alla olevaan mallikohtaiseen estoon ja
  yleiseen polkuun ei koskaan päädytä.
- **Yhdistelmä mukana**: agentrouter-haaran tavoin laajuus ohittaa tarkoituksella
  `persistUnavailableState`/`isCombo`-lievennyksen, jonka yhdistelmäkutsuja
  soveltaa 429-virheeseen. Mallikohtainen lukitus ei ole tämän laajuuden lievempi
  muoto, vaan väärä yksikkö: se ei kerro mitään kiintiönsä käyttäneestä IP-osoitteesta, joten yhdistelmän
  kierrätys kuluttaisi edelleen yhden varmasti epäonnistuvan kutsun jokaista sisaryhteyttä kohden.
- **Sisaryhteyksien turvallisuus**: sisaryhteyttä, joka on jo lopullisessa tilassa (banned/credits_exhausted)
  tai jo pidemmällä jäähdytysjaksolla, ei koskaan korvata uudella tilalla.
- **Eksklusiivinen sallittujen luettelo**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-joukon laajentaminen on
  nimenomainen omistajan päätös; ei yleistä kytkentää (malli #10334/#10419). Sisaryhteyskysely
  käyttää sidontaan samaa sallittujen luetteloa sen sijaan, että se toistettaisiin SQL-
  literaalina, joten sen laajentaminen säilyy yhden rivin muutoksena.
- **Lähtevän IP-osoitteen kierto kumpaankin suuntaan**: hakuikkuna (24 tuntia) on paljon
  pidempi kuin lähtevän IP-osoitteen välimuistin TTL (5 min), joten ”viimeksi tunnettu IP” on historiatietoa,
  ei nykyinen tila. Jos yhteyden välityspalvelimen IP-osoite on vaihtunut ikkunan aikana,
  lukitus voi **ohittaa** aidosti jaetun IP-osoitteen (tallennettu IP-osoite on uusi,
  eikä sen kiintiötä ole käytetty loppuun) — ja vastaavasti se voi **asettaa jäähdytysjaksolle sisaryhteyden, joka on sittemmin
  siirtynyt pois** kiintiönsä käyttäneestä IP-osoitteesta. Jälkimmäinen tapaus maksaa sisaryhteydelle yhden
  jäähdytysjakson; molemmat hyväksytään historiapohjaisen
  haun parhaan yrityksen periaatteeseen kuuluvina rajoitteina.
- **Kustannus**: kaksi rajattua `proxy_logs`-taulun läpikäyntiä (aikaikkunalla suodatettuina
  `idx_pl_timestamp`-indeksin avulla), vain 429-virheiden esiintymistiheydellä. Ei uutta indeksiä (migraatio 134,
  YAGNI). Mitattu kohtuullisen kokoisella todellisen liikenteen tietokantakopiolla;
  suuren suorituskyvyn instanssi sisältää suhteellisesti enemmän rivejä samassa ikkunassa.

---

## Muut vikasietoisuusominaisuudet

- **20 reititysstrategiaa** (prioriteetti, painotettu, vuorottelu, kontekstin välitys, täytä ensin, p2c, satunnainen, vähiten käytetty, kustannusoptimoitu, nollauksen huomioiva, nollausikkuna, liikkumavara, kiintiöpainotettu, aidosti satunnainen, automaattinen, lkgp, kontekstioptimoitu, välimuistioptimoitu, yhdistelmä, liukuhihna) — katso [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Nollauksen huomioiva reititys** (v3.8.0) — priorisoi yhteydet kiintiön nollausajan perusteella.
- **Taustatilan hallittu heikennys** — Responses API:n `background: true` vaihdetaan synkroniseen tilaan ja näytetään varoitus.
- **Dynaaminen työkalurajan tunnistus** — vähentää palveluntarjoajien käyttöä, kun työkalumäärän rajat saavutetaan.
- **Hätävarajärjestely** — toimintaa ohjaa `OMNIROUTE_EMERGENCY_FALLBACK`; operaattorit voivat ohittaa asetuksen Feature Flags -sivulla ilman uudelleenkäynnistystä.

---

## Vianmääritys

- Painotettu yhdistelmä vastaa `503 all_targets_cooling_down` (`Retry-After` on asetettu, ja `diagnostics.excluded` luettelee kaikki kohteet syyllä `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pooli on määritetty ja yhdistetty, mutta jokainen kohde on suljettu pois palautumiseen liittyvän ajastimen vuoksi; varoitus `[COMBO] Weighted selection: every target excluded before dispatch — …` ilmoittaa syyt ja jäljellä olevat sekunnit. Saman yhdistelmän palauttama `404 no_executable_targets` tarkoittaa, ettei palautumisajastimia ollut mukana (mitään suoritettavaa ei ole tai jokainen tili epäonnistui saatavuustarkistuksessa). Toteutus on tiedostossa `open-sse/services/combo/pinRecovery.ts`, ja se perustuu tiedostossa `targetResolution.ts` kerättyihin poissulkemisiin.
- Kaikki palveluntarjoajan avaimet ohitetaan → tarkista sekä piirikatkaisijan tila ETTÄ kunkin yhteyden `rateLimitedUntil`/`testStatus`.
- Palveluntarjoaja pysyy pysyvästi poissuljettuna nollausjakson jälkeen → koodi lukee raakaa `state`-arvoa metodin `getStatus()`/`canExecute()` sijaan.
- Yksi avain epäonnistuu, mutta muiden pitäisi toimia → suosi yhteyskohtaista jäähdytysaikaa piirikatkaisijan sijaan.
- Vain yksi malli epäonnistuu → suosi mallikohtaista lukitusta yhteyskohtaisen jäähdytysajan sijaan.
- Tilan pitäisi palautua itsestään, mutta niin ei tapahdu → tarkista tulevaisuuteen asetettu aikaleima sekä lukupolku, joka päivittää vanhentuneen tilan. Pysyvät tilat edellyttävät manuaalisia muutoksia.

---

## TLS-sormenjäljet ja häivetekniikat

Palveluntarjoajakohtaiset häivetekniikat (JA3/JA4, CCH, obfuscation) on dokumentoitu erikseen — katso `docs/security/STEALTH_GUIDE.md` (git; ei käännetä osaksi `/docs`-hakemistoa).

---

## Häiriönsietotestaus (vaihe 8 · lohko C)

Häiriönsietologiikan yksikkötestien lisäksi kolme testiä kuormittaa suoritusympäristöä
todellisissa rasitus- ja vikatilanteissa (kaikki ovat integraatio-/yötestejä — mikään niistä ei estä PR:iä):

| Testi         | Mitä                                                                                                                                                                                                                                                          | Suoritus                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Kaaos         | Väärennetty upstream-solmu aiheuttaa todellista viivettä, nollauksia, aikakatkaisuja ja 503-virheitä; varmistaa, että katkaisija avautuu ja palautuu sekä että `checkFallbackError` luokittelee 503-virheen palautumiskelpoiseksi varajärjestelmätilanteeksi. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Keon kasvu    | ~500 suoratoistoa kutakin `createSSEStream`-kutsua kohden asetuksella `--expose-gc`; epäonnistuu, jos keko kasvaa enimmäisrajan yli (OOM-suojaus #3069).                                                                                                      | `npm run test:heap`                    |
| k6-kestotesti | Jatkuva kuormitus kohteeseen `/api/monitoring/health`; p95-/virhekynnykset.                                                                                                                                                                                   | `k6 run tests/load/k6-soak.js` (yöajo) |

Orkestroinnin hoitaa `.github/workflows/nightly-resilience.yml` (cron + dispatch). Oletusarvoisessa
`test:integration`-ajossa kaaos- ja kekotestit ohittavat itsensä (ilman `RUN_CHAOS_INT`/`--expose-gc`-asetusta).

---

## Katso myös

- [Arkkitehtuuriopas](./ARCHITECTURE.md) — Järjestelmäarkkitehtuuri ja sisäinen toiminta
- [Käyttöopas](../guides/USER_GUIDE.md) — Palveluntarjoajat, yhdistelmät ja CLI-integraatio
- [Automaattinen yhdistelmämoottori](../routing/AUTO-COMBO.md) — 16 tekijän pisteytys ja tilapaketit
