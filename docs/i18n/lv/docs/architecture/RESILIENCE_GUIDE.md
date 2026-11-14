# Resilience Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ir trīs atšķirīgi, bet saistīti noturības mehānismi. Katram no tiem ir atšķirīgs darbības joma un mērķis. Atkļūdojot maršrutēšanas darbību, turiet tos atsevišķi.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Avots: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-informācijas paneļa prioritāte elastības pārslēgšanai.** Izvēles noturība pārslēdz no vides — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — tikai nodrošina _noklusējuma_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Būla vērtība saglabājās `resilienceSettings` (dashboard →** Iestatījumi → Resilience** / `PATCH /api/resilience`, saglabāts `key_value`) pārspēj env vērtību: normalizācija (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) saglabā saglabāto Būla vērtību, kad vien tāda pastāv. Šāda env var iestatīšana uz `true` izvietošanai, kurā informācijas panelis jau ir saglabāts `false` tāpēc nekas nemainās. — pārslēdz slēdzi** Iestatījumi → Resilience** (vai notīriet saglabāto lauku).

## 1. Pakalpojumu sniedzēja ķēdes pārtraucējs

**Tvērums:** viss pakalpojumu sniedzējs (piem., `glm`, `openai`, `anthropic`).

**Mērķis:** pārtraukt sūtīt trafiku pakalpojumu sniedzējam, kas atkārtoti cieš neveiksmes augšplūsmas/pakalpojuma līmenī.

**Realizācija:**

- Galvenā klase: `src/shared/utils/circuitBreaker.ts`
- Sasaiste: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Statusa API: `GET /api/monitoring/health`
- Atiestatīšanas API: `POST /api/resilience/reset`
- Apvalki: `open-sse/services/accountFallback.ts`
- DB tabula: `domain_circuit_breakers`

**Stāvokļi:**

- `CLOSED` — parastais trafiks ir atļauts
- `DEGRADED` — trafiks joprojām ir atļauts, taču tiek izsekots paaugstināts pakalpojumu sniedzēja kļūmu skaits; atgriežas stāvoklī `CLOSED` pēc pietiekama veiksmīgu izsaukumu skaita, pēc veiksmīga savienojuma testa vai pēc ilgākās `OPEN` noturēšanas pēdējam kļūmes veidam (tā `cooldownByKind` vērtība, citādi `resetTimeout`, × `maxBackoffMultiplier`, vismaz viena dzesēšana) bez jaunas kļūmes
- `OPEN` — pakalpojumu sniedzējs īslaicīgi bloķēts; combo maršrutēšana to izlaiž
- `HALF_OPEN` — atiestatīšanas noilgums beidzies; atļauts pārbaudes pieprasījums

**Konfigurējamās noklusējuma vērtības (`open-sse/config/constants.ts`, pieejamas sadaļā Informācijas panelis → Iestatījumi → Noturība):**

| Klase   | Degradējas pie | Atveras pie | Atiestatīšanas noilgums |
| ------- | -------------- | ----------- | ----------------------- |
| OAuth   | 5 kļūmes       | 8 kļūmes    | 60s                     |
| API-key | 7 kļūmes       | 12 kļūmes   | 30s                     |
| Local   | atvasināts     | 2 kļūmes    | 15s                     |

`degradationThreshold` nosaka, kad pakalpojumu sniedzējs nonāk stāvoklī `DEGRADED`; `failureThreshold` nosaka, kad tas atveras un tiek izlaists. Lokālie pakalpojumu sniedzēju profili vēl nav pieejami Noturības iestatījumu lapā.

**Nostrādāšanas kodi:** tikai pakalpojumu sniedzēja līmeņa statusi `[408, 500, 502, 503, 504]`. Konta līmeņa kļūmēm NENOSTRĀDĀ (lielākā daļa 401/403/429 — tās pieder dzesēšanas vai bloķēšanas mehānismiem).

**Slinkā atkopšana:** kad `OPEN` termiņš beidzas, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atsvaidzina stāvokli uz `HALF_OPEN`. Tie paši lasījumi (un nākamā kļūme) novecojušu `DEGRADED` pakāpeniski atgriež atpakaļ uz `CLOSED`. Fona taimeris nav nepieciešams.

---

### Pēc izvēles ieslēdzama globālā pakalpojumu sniedzēja dzesēšana (laika loga slēdzis)

Ceturtais, **pēc izvēles ieslēdzams** slānis (`PROVIDER_COOLDOWN_ENABLED`, noklusējumā **izslēgts**) uztur atmiņu, kas saglabājas starp pieprasījumiem, par pakalpojumu sniedzējiem, kas cieš neveiksmes, failā `open-sse/services/providerCooldownTracker.ts`; to izmanto combo mērķu izšķirtspēja, lai secīgi combo pieprasījumi vairs neatkārtoti vērstos pie pakalpojumu sniedzēja, kas tikko cieta neveiksmi. Pakalpojumu sniedzēja līmeņa ieraksti ievēro `PROVIDER_PROFILES` laika loga slēdzi:

| Profils | nostrādā pēc (`providerFailureThreshold`) | laika logā (`providerFailureWindowMs`) | dzesējas (`providerCooldownMs`) |
| ------- | ----------------------------------------: | -------------------------------------: | ------------------------------: |
| OAuth   |                                      `10` |                                `15min` |                          `5min` |
| API key |                                      `15` |                                `30min` |                         `10min` |

Zem sliekšņa pakalpojumu sniedzējs **netiek** uzskatīts par dzesējamu; veiksmīgs pieprasījums notīra logu. Savienojuma līmeņa ieraksti (`provider:connectionId`) tā vietā patur eksponenciālo `minRetryCooldownMs → maxRetryCooldownMs` atkapšanos. Noklusējumu pārrakstīšana: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Aizsargs pret regresiju: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Savienojuma dzesēšana

**Darbības joma:** viens pakalpojumu sniedzējs connection/account/key.

**Mērķis:** izlaist vienu sliktu atslēgu, kamēr citi tā paša pakalpojumu sniedzēja savienojumi turpina apkalpot.

**Īstenošana:**

- Atzīmēt kā nepieejamu: `src/sse/services/auth.ts::markAccountUnavailable()`
- Atlase: `getProviderCredentials*` tajā pašā failā
- Atdzesēšanas aprēķins: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Iestatījumi: `src/lib/resilience/settings.ts`

**Lauki katram savienojumam:**

- `rateLimitedUntil` — laikspiedols līdz atdzišanas termiņa beigām
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponenciālais atkāpšanās skaitītājs

**Noklusējuma atdzišanas periodi:**

- OAuth bāze: 5s
- API atslēgas bāze: 3 s
- API atslēga 429: dod priekšroku augšpus `Retry-After`/reset headers/parseable atiestatīšanas tekstam
- Atkāpšanās: `baseCooldownMs * 2 ** failureIndex`

**Atkārtota mēģinājuma aizkave katram pakalpojumu sniedzējam.** Pakalpojumu sniedzēja informācijas lapā ir a** Mēģiniet vēlreiz, aizkave** izvēlieties (Auto, 15s līdz 1h). Tas ietaupa `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, izmantojot `PATCH /api/resilience`). Ja ātruma ierobežojuma kļūda nesniedz ieteikumu par atkārtotu mēģinājumu augšup, šī vērtība aizstāj nodrošinātāja mērogoto atkāpšanos un atiestata `backoffLevel` uz 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Ierobežota ātruma kļūdas prioritāte, vispirms augstākā: augšējais atkārtotā mēģinājuma padoms, pēc tam katram savienojumam `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, pēc tam katra nodrošinātāja atkārtotā mēģinājuma aizkave, pēc tam env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, pēc tam mērogotā atkāpšanās. Auto noņem lauku. Tas ietekmē tikai ātruma ierobežojuma iemeslu, nevis gala stāvokļus.

**Ganāmpulka aizsargs pret pērkonu:** novērš vienlaicīgu atteici no pārmērīgas dzesēšanas vai dubultas `backoffLevel` palielināšanas.

**Vienlaicīguma ierobežojums 429 nepakāpj pa atkāpšanās kāpnēm.** `429`, kura pamattekstā tiek ziņots par vienlaicīguma ierobežojumu ("pārāk daudz vienlaicīgu pieprasījumu", "vienlaicīguma ierobežojums", "paralēlā pieprasījuma ierobežojums", GLM `并发数过高`), nozīmē, ka konts ir vesels, bet aizņemts. `checkFallbackError()` atgriež iemeslu `concurrency_limited`: pārejiet pie nākamā savienojuma tūlīt, atdzesējiet šo savienojumu, lai iegūtu fiksētu `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) vai augšpuses atkārtota mēģinājuma mājienu, nemainītu `backoffLevel` un iestatītu `skipProviderBreaker`. Skaidrs kvotas pamatteksts joprojām uzvar, tāpēc pamatteksts, kas arī atbilst kvotas modelim, paliek kvotas spriedums. Atklāšana: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; spriedums: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (pārslēdzēja `FailureKind`) ir nemainīgs un joprojām nolasa `rate_limit` šiem korpusiem.

**Straumes satura stendi neatvēsina kontu.** Kad satura apstāšanās uzraugs (`open-sse/utils/streamHandler.ts`) atsakās no straumes, kas laikā nenosūtīja modeļa izvadi, `markAccountUnavailable()` reģistrē savienojuma kļūdu, bet neiestata atdzišanu: apstāklis attiecas uz šo pieprasījumu, visbiežāk tas ir garš argumentācijas pagrieziens bez izvades. Operatori var atkal izvēlēties, izmantojot `resilienceSettings.streamStallCooldown.enabled` (noklusējuma `false`).

**Pieteikšanās latentuma signāls `p2c` konta atlasei.** Katrs nosūtītais mēģinājums reģistrē laiku līdz pirmajam baitam un iznākumu katram savienojumam (un katram savienojumam + modelim) atmiņas ritošā logā: pēdējie 20 paraugi 15 minūšu laikā (`open-sse/services/connectionLatencyTracker.ts`, ierakstīts no `safeLogEvents()` in `src/sse/handlers/chatHelpers.ts`). Ja `resilienceSettings.p2cLatency.weight` ir virs `0` (diapazons 0–20, noklusējuma `0` = izslēgts), `compareP2CConnections()` `src/sse/services/auth.ts` katram pāra kandidātam pievieno `weight` punktus. Pusi no tā veido latentums kā attiecība pret ātrāko kandidātu (divreiz lēnākam ir pilna puse) un pusi no mainīgā kļūdu līmeņa. Šis termiņš ir spēkā tikai tad, ja abiem kandidātiem ir vismaz 3 paraugi, tāpēc jauni konti netiek sodīti, un tā griesti nepārsniedz kvotu bloķēto un kvotu izsmelto sodu. Tas nepievieno nekādu ķēdi: neveiksmīgos kontus joprojām apstrādā dzesēšanas, bloķēšanas un pārtraukuma slāņi. Iestatiet to ar `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Sprieduma rāmji restartē satura aiztures budžetu.** Spriešanas modelis var domāt minūtes pirms tā pirmā redzamā marķiera: Claude straumē `thinking_delta` kadrus, kuru domāšanas teksts var būt tukšs, un atbildes API straumē vienu argumentācijas vienumu pēc otra. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) atpazīst šos kadrus, un sargsuns restartē savu budžetu katram no tiem, nevis atceļ pagriezienu. Tie joprojām nav modeļa izvade, tāpēc pagrieziens, kas beidzas tikai ar argumentāciju, joprojām tiek ziņots kā tukšs, un pagrieziens, kas pārtrauc spriešanu un sūta tikai sirdspukstus, joprojām pakļauj sargsuni.

Kiro binārie `reasoningContentEvent` kadri ar netukšu parakstu saglabā šo spriešanas darbību caur izpildītāju kā tukšu `reasoning_content` delta. Paraksts netiek pārsūtīts. Metadati, nepilnīgi kadri un tukši paraksti nerestartē satura budžetu; joprojām ir spēkā neatkarīgais aktīvās straumes taimauts un klienta atcelšana (`open-sse/executors/kiro/reasoning.ts`).

**Termināla stāvokļi (NOT atdzišana):**

- `banned` — ko iestata aizliegta atslēgvārda/konta aizlieguma noteikšana (sk. [BAN_DETECTION](../security/BAN_DETECTION.md) ). Augšupējie pieprasījuma atteikumi (`request_rejected`, piemēram, Anthropic OAuth 403 "Pieprasījums nav atļauts") nekad to neiestata: tie tiek skaitīti katram savienojumam un modelim un tiek izņemti no rotācijas ar pieaugošu atdzišanu, kas ierobežota līdz `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), vai atdzesē savienojumu, ja nav zināms modelis — `open-sse/services/requestRejectedStreak.ts`
- `expired` (pārejas uz termināli pēc ierobežotiem mēģinājumiem — `EXPIRED_RETRY_MAX = 3` ar eksponenciālu atkāpšanos —, lai pārejošas OAuth kļūdas varētu pašdziedināties, pirms konts tiek neatgriezeniski deaktivizēts)
- `credits_exhausted`

Tie saglabājas, līdz tiek mainīti akreditācijas dati vai operators tos atiestata. Nepārrakstīt termināļa stāvokļus ar pārejošu dzesēšanas stāvokli.

**Slinka atveseļošanās:** kad `rateLimitedUntil` ir pagājis, savienojums atkal kļūst piemērots. Veiksmīgas lietošanas gadījumā `clearAccountError()` notīra visus kļūdu laukus.

### Claude OAuth lietošanas siena: zemākas prioritātes joslas + sesijas ierobežojumu atiestatīšana

**Darbības joma:** viens Claude abonementa (OAuth) savienojums. Abas funkcijas ir** izvēlēties katram savienojumam** (Rediģēt savienojuma → Claude sadaļu → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, abas noklusējuma ir izslēgtas) un atspoguļot Claude koda komandas `/low-priority` un `/limit-reset` (vadu līgums, kas iegūts no Claude koda 2.1.263).

**Īstenošana:**

- Stāvokļa mašīnas + reakcijas klasifikācija: `open-sse/services/claudeLowPriority.ts`
- Atiestatīt status/claim klientu: `open-sse/services/claudeLimitReset.ts`
- Izpildītāja āķis (galvenes injekcija + tajā pašā kontā atkārtots mēģinājums): `open-sse/executors/base.ts::execute()`
- Pieteikšanās noturība: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Aktivizētājs:** 5 stundu lietošanas siena — a `429`, kuras galvenēs ir `anthropic-ratelimit-unified-status: rejected` un, ja konts ir piemērots, `anthropic-ratelimit-unified-slow-offer: treatment`. Pirms šīs pirmās sienas nekas netiek nosūtīts 429; sērijveida 429 bez vienotām galvenēm iziet cauri parastajam atdzišanas ceļam.

**Zemākas prioritātes josla** (`lowPriorityMode`):

- Uz sienas 429 izpildītājs pieņem piedāvājumu un nekavējoties mēģina vēlreiz** tas pats** konts `anthropic-usage-limit: slow`; josla paliek aktīva līdz paziņotajam `anthropic-ratelimit-unified-reset` (+ 60s grace), un katrs pieprasījums šajā logā satur galveni. Pārtvertais 429 nekad nesasniedz `handleChatCore`, tāpēc savienojums ir** nē** ieliek dzesēšanā un netiek pagriezts prom.
- `anthropic-ratelimit-unified-slow-status` uz vēlākām atbildēm: `active` / `not_needed` saglabāt joslu; `slot_busy` (429) vai `529` pagaidiet servera `anthropic-ratelimit-unified-slow-retry-after` (noklusējums 20 s, skavs 5–600 s, ±— % nervozitāte) un mēģiniet vēlreiz, ierobežojot ar `anthropic-ratelimit-unified-slow-max-wait` (noklusējums 20 min, skavs 1 min–6 h). Gaidīšanu papildus ierobežo tas, kas ir palicis no paša pieprasījuma augšupvērstā sākuma sākuma taimauta (`resolveFetchStartTimeout`, 10 min pēc noklusējuma), mīnus 5 s robeža: bez šī ierobežojuma 20 minūšu noklusējuma maksimālā gaidīšanas laiks pārsniegs pieprasījumu un miegs tiktu pārtraukts gaidīšanas vidū, parādot `TimeoutError` nevis graciozo + `max_wait`
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 h loga apgāšanās vai `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (kas beidzas kā `extra_usage` jebkurā statusā, jo apmaksātais pārsniegums tagad sedz sienu) beidz joslu; reakcija pēc tam plūst uz parasto dzesēšanas ceļu. `budget_exhausted` tiek atcerēts līdz paziņotajai budžeta atiestatīšanai (≤ 8 dienas).
- Sienas pārbaude tiek veikta pēc paša izpildītāja 400 virzītiem atkārtotiem mēģinājumiem (konteksta rediģēšana, thinking/effort skavas, automātiskās mācīšanās parametrs), tāpēc siena 429, kas atrodas tikai vienā no šiem atkārtojumiem, joprojām tiek pārtverta, nevis sasniedz atdzišanas ceļu.
- Katra savienojuma statuss ir atmiņā (restartēšana maksā vienu papildu sienu 429, lai atkārtoti pieņemtu).

**Sesijas ierobežojumu atiestatīšana** (`autoLimitReset`, mēģināts pirms joslas, kad abi ir ieslēgti):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` bloks; kad `arm: "reset"` un `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ar `{ "program": "juniper_tide" }` (organizācija UUID no `providerSpecificData.organizationUUID`, bootstrap atkāpšanās).
- `result: reset|not_limited` → pieprasījums tiek mēģināts atkārtoti pilnā ātrumā (nav lēnas galvenes). `already_used` / `not_offered` memoise `next_available_at` (noklusējuma viena nedēļa); jebkura kļūme atkāpjas pēc 15 minūtēm. Atiestatīšana notiek reizi nedēļā, un tā joprojām tiek ieskaitīta nedēļas limitā.

Regresijas aizsargi: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Automātiski lietot bankas atiestatīšanu

**Darbības joma:** Codex un Claude abonēšanas (OAuth) savienojumi.** Pieteikties** : `bankedResetAutoApply` iestatījums ir izslēgts un pēc noklusējuma ir `dry-run` režīmā (Iestatījumi → AI → Automātiski lietot bankas atiestatīšanu).

**Mērķis:** tērēt bankas atiestatīšanas pašas, kad konts saskaras ar lietošanas sienu, nevis gaidīt, līdz operators nospiež "Izpirkt" lapā Pakalpojumu sniedzēja ierobežojumi.

| Kredīta veids (`creditTypes`) | Kas ir izpirkts                                        | Kur tas iet                                                                   |
| ----------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `codexCredits`                | Codex atiestatīt kredītus                              | fona darbs, ik pēc 60 s                                                       |
| `claudeCredits`               | Claude bankas dotācijas (`GRANT` kredīti)              | fona darbs, ik pēc 60 s                                                       |
| `claudeSessionReset`          | Claude nedēļas sesijas limita atiestatīšana (iepriekš) | pieprasījuma ceļu, izmantojot to pašu politiku, ko izmanto konta pārslēgšanai |

**Īstenošana:**

- Tīrs lēmums (viens noteikums abiem ceļiem): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Fona darbs: `src/lib/services/bankedResetAutoApply.ts` (sākās `src/instrumentation-node.ts`)
- Claude pieprasījuma ceļa vārti: `src/lib/usage/claudeSessionResetPolicy.ts`, reģistrēts caur `setClaudeLimitResetPolicy()` `open-sse/services/claudeLimitReset.ts`
- Vēsture, vāciņi un tīmekļa aizķere: `src/lib/usage/bankedResetAudit.ts`
- Vēsture API: `GET /api/settings/banked-reset-auto/history?limit=50` (pārvaldības autentifikācija)

**Lēmuma rīkojums** (pirmais neveiksmes noteikums ir reģistrētais iemesls):

1. Funkcija izslēgta, kredīta veids izslēgts vai konts ir ārpus darbības jomas (`accountScope` `all` / `selected` plus `connections` karte katram kontam).
2. Ārpus izvēles UTC grafika (`startHourUtc` > `endHourUtc` šķērso pusnakti).
3. Ierobežojumi pēdējo 24 stundu laikā: `maxPerAccountPerDay` (1), `maxPerDay` (3) un `minSpacingMinutes` (30) starp jebkurām divām izpirkšanas reizēm.
4. Aktivizētājs: `session` vai `weekly` logs ar sienu (lasīt no `getQuotaWindowStatus().reachedThreshold`, nevis `isAccountQuotaExhausted()`, kas ziņo tikai par kontu ar katru iztērēto logu) vai kredīts, kura derīguma termiņš beidzas `expiringCreditHours` (24) laikā kontā, kurā ir izmantots vismaz `expiringCreditMinUsedPercent` (50).
5. Dabiskās atiestatīšanas aizsargs: izlaidiet, ja sienas 5 stundu logs tiek atiestatīts `sessionResetGuardMinutes` (90) robežās vai sienas iknedēļas logs `weeklyResetGuardHours` (12) robežās.
6. Nedēļas minimālā vērtība: izlaidiet 5 stundu atiestatīšanu, ja nedēļas atlikušais rādītājs ir mazāks par `weeklyFloorPercent` (10).
7. `last-resort` režīms: izlaist, kamēr citā tā paša pakalpojumu sniedzēja kontā ir atlicis vismaz `poolHeadroomPercent` (10) abos logos. Kredīta izbeigšanās aktivizētāji to apiet.
8. `dry-run` ieraksta rindu un neko neizpērk; `last-resort` un `eager` izpirkt.

Trūkstošie kvotas dati nekad neatbloķē izpirkšanu: nezināms atiestatīšanas laiks vai iknedēļas lietojums tiek izlaists.

**Claude sesijas atiestatīšana:** Ja funkcija ir izslēgta vai `claudeSessionReset` izslēgta, katram kontam paredzētais `autoLimitReset` pārslēgs izlemj tieši tāpat kā iepriekš. Ja abi ir ieslēgti, funkcija aizstāj konta pārslēgšanas slēdžus: darbības jomā esošs konts var pieprasīt tikai tad, ja politika to atļauj, un `dry-run` režīmā pretenzija netiek iesniegta.

**Drošība:** darbs izpērk ne vairāk kā vienu kredītu uz vienu atzīmi, pieņem lēmumu pirms kredītu iekļaušanas sarakstā (izlaists konts nekad netiek iekļauts sarakstā), izmanto idempotences taustiņus `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` un atmaksā kontu 1 stundu pēc neveiksmīga ierakstīšanas vai izpirkšanas. Katrs izpirkšanas, neveiksmes un sausās darbības lēmums tiek rakstīts uz `audit_log` (`action: "bankedReset.redeem"`, bez žetoniem vai kredīta ID); vāciņi tiek skaitīti no šīm rindām, tāpēc tie izdzīvo restartēšanu. Veiksmīga izpirkšana arī aktivizē `provider.reset_redeemed` tīmekļa aizķeri.

Regresijas aizsargi: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Sesijas interese (#7274)

**Darbības joma:** viena klienta sesija (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` galvene) ir piesprausta vienam savienojumam,** jebkura** pakalpojumu sniedzējs.

**Mērķis:** Saglabājiet vairāku apgriezienu aģentu (Claude Code, aider, custom agents) vienā kontā visos pieprasījumos, samazinot starpkontu konteksta zudumus un atkārtotas aukstās palaišanas 429s pakalpojumu sniedzējiem ar viena konta sesijas stāvokli.

**Īstenošana:**

- TTL izšķirtspēja: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Galvenes izvilkšana (vispārējs, jebkurš nodrošinātājs): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Noturīgs tapu galds: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Iestatījums: `sessionAffinityTtlMs` (globālais TTL ms, `0` atspējo) — `src/lib/db/settings.ts`. Pārdēvēts no Codex-only `codexSessionAffinityTtlMs` ar migrāciju `124_generic_session_affinity_ttl.sql`, kas pārņem jebkuru iepriekš konfigurētu Codex TTL kā jauno noklusējuma vērtību.

Pirms #7274 `resolveSessionAffinityTtlMs()` tika stingri savienots ar `0` visiem pakalpojumu sniedzējiem, izņemot `codex`, tāpēc TTL iestatījumam (un sesijas galvenēm) nekur citur nebija nekādas ietekmes, lai gan piespraušanas mehānisms un galvenes izvilkšana jau bija pakalpojumu sniedzēja agnostiķis. Labojums noņēma šo agrīno atgriešanos; TTL tagad vienādi attiecas uz visiem pakalpojumu sniedzējiem, kad globāli iestatīts virs `0`.

Trīs sesijas radniecības galvenes nekad netiek pārsūtītas, jo — izpildītāji izveido paši savas augšteces galvenes no nulles, nevis nodod klientu galvenes, tāpēc tas paliek tikai iekšējās korelācijas ID.

### Ekskluzīvas pārvaldītas sesijas savienojuma nomas līgumi

**Darbības joma:** vienam aktīvam pārvaldītam HTTP client/session pieder viens piemērots OmniRoute savienojums.

**Mērķis:** nodrošiniet ilgstošas ekskluzīvas savienojuma īpašumtiesības klientiem, kuriem ir nepieciešams stingrs maršrutēšanas žogs pāri pieprasījumiem. Tas atšķiras no sesijas radniecības, kas ir mīksta nepārtrauktības izvēle: ekskluzīva noma saglabā dzīves cikla stāvokli SQLite, nodrošina globālu aktīvā īpašnieka un aktīvā savienojuma unikalitāti un noraida novecojušu ģenerēšanu pirms pakalpojumu sniedzēja nosūtīšanas.

Funkciju var izvēlēties katrai API atslēgai. Pārvaldītajai atslēgai ir jābūt `lease:exclusive` tvērumam un nepārprotamam `allowedConnections` sarakstam, kas nav tukšs. Jebkurš HTTP klients var izmantot dzīves cikla galapunktu; nav nepieciešams klienta nosaukums, lietotāja aģents, nodrošinātājs, OAuth metode vai modelis. Nomas līgumam pieder savienojums, nevis modelis, tāpēc modeļa maiņa saglabā saistību, kamēr savienojums joprojām ir piemērots. Parasta modeļa, kvotas, veselības stāvokļa, atdzišanas un atļaušanas saraksta noteikumi paliek autoritatīvi un var pāriet to pašu paaudzi uz citu bezmaksas piemērotu savienojumu.

Dzīves cikls ir `POST /api/v1/session-leases` ar JSON darbībām `acquire`, `renew` un `release`. Pārvaldītie secinājumu pieprasījumi uzrāda necaurspīdīgo `X-OmniRoute-Lease-Owner` vērtību un precīzu `X-OmniRoute-Lease-Generation`. Īpašnieks izmanto `vlo_` kam seko 43 base64url rakstzīmes; tiek saglabāts tikai tā SHA-256 hash. Katrs galīgais nosūtīšanas žogs saista arī autentificēto API taustiņu ID un aktīvo savienojumu ID. Nomas kontroles galvenes tiek noņemtas no žurnāliem, saglabātajiem pieprasījumu momentuzņēmumiem un iepriekšējās izpildītāja galvenes.

Ja parastajā maršrutēšanā ir piemēroti pārvaldīti kandidāti, bet katrs brīvais kandidāts ir aizņemts ar ārvalstu aktīvu nomu, OmniRoute atgriež HTTP `429`, nomas jaudas nav pieejams kods, gaidīšanas jaudas statuss un ierobežots `Retry-After` kas iegūts no agrākā attiecīgā derīguma termiņa beigām. Parasta tukša piemērotība nav strīds par nomu un saglabā esošo maršrutēšanas kļūdu semantiku.

Saistītie mehānismi paliek atsevišķi:

- OAuth sesijas noslogojums ir procesa lokālais mīkstais sadalījums OAuth kontiem.
- Konta semafori piešķir pieprasījumu sakritības atļaujas un beidzas, kad pieprasījums ir pabeigts.
- Ekskluzīvas pārvaldītas sesijas nomas līgumi ir ilgstošas dzīves cikla īpašumtiesības ar paaudzes žogu.

---

## 3. Modeļa bloķēšana

**Tvērums:** nodrošinātājs + savienojums + modeļa trijnieks.

**Tvērums pēc statusa:** neveiksmes statuss nosaka, kurā atslēgā bloķēšana tiek ierakstīta
(`resolveLockoutScope()` failā `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvotas vai tiesību signāls — bloķē **kvotas saimi**:
  codex gadījumā visu `codex` / `spark` tvērumu (katru savienojuma `gpt-5*` modeli),
  citiem nodrošinātājiem `getQuotaScopedModelForProvider()`.
- `404` bloķē nepaplašināto modeli (`getModelLockKey()` sašaurina `not_found`).
- Jebkurš cits statuss — `5xx` transporta/servera kļūmes un paša OmniRoute
  sintezētais `502` kvalitātes validācijas rezultātā — bloķē tikai **precīzo**
  nodrošinātāja/savienojuma/modeļa trijnieku. Slikta straume vienā modelī nav pierādījums
  par konta kvotu; pirms šī noteikuma viena tukša atbilde uz
  `codex/gpt-5.6-luna` izņēma no maršrutēšanas visus šī savienojuma `gpt-5*` modeļus
  uz 2–30 minūtēm (ar pakāpenisku palielināšanu), kamēr tā kvota palika neskarta.
- Izsaucēja tieši norādītā `scope` opcija vienmēr ir prioritāra (Antigravity nodod `"exact"`).

**Mērķis:** nepieļaut visa savienojuma atspējošanu, ja nav pieejams vai kvotas ierobežots ir tikai viens modelis.

**Piemēri:**

- Nodrošinātāji ar katram modelim atsevišķu kvotu, kas atgriež 429
- Lokālie nodrošinātāji, kas vienam trūkstošam modelim atgriež 404
- Nodrošinātājam specifiskas režīma/modeļa atļauju kļūmes (piem., Grok režīmi)

**Implementācija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Modeļu atdzišanas informācijas panelis (v3.8.0)

UI: Iestatījumi → Modeļu atdzišana (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Uzskaita aktīvās bloķēšanas ar šādu informāciju: nodrošinātājs, savienojums, modelis, iemesls, expiresAt. Operatoriem no kartītes ir iespējams modeli manuāli atkārtoti iespējot.

**REST API:**

- `GET /api/resilience/model-cooldowns` — uzskaita aktīvās bloķēšanas
- `DELETE /api/resilience/model-cooldowns` — manuāla atkārtota iespējošana. Body: `{provider, connection, model}`. Autentifikācija: management.

### Atdzišanas pārvaldnieks

UI: Pārraudzība → Atdzišanas pārvaldnieks (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Viena lapa katram savienojumam, kas īslaicīga iemesla dēļ nav pieejams maršrutēšanai, tādējādi nav jāatver katra nodrošinātāja lapa atsevišķi. Tajā tiek uzskaitītas savienojumu atdzišanas, modeļu bloķēšanas un terminālie stāvokļi, un tās var notīrīt vienam savienojumam, atlasītajiem savienojumiem vai visiem nodrošinātāja savienojumiem; turklāt var rediģēt visbiežāk pielāgotos atdzišanas noteikumus: `streamStallCooldown.enabled` un OAuth / API atslēgas `connectionCooldown` bāzes atdzišanu un maksimālo atkāpšanās soļu skaitu (saglabā, izmantojot `PATCH /api/resilience`). Terminālie stāvokļi (`banned`, `expired`, `credits_exhausted`) tiek uzskaitīti, bet šeit nekad netiek notīrīti.

Tās pašas lapas kartītē **Kļūdu atdzišanas noteikumi** tiek rediģēti operatora kļūdu noteikumi (`settings.providerErrorRules`) un katra nodrošinātāja vispārīgie noklusējuma iestatījumi (`settings.providerErrorDefaults`), izmantojot `PATCH /api/settings` — par to, kā tie tiek piemeklēti, skatiet §7 sadaļu “Operatora deklarētie noteikumi”. Ilgumi ir Noklusējums (bez tieši norādītas atdzišanas), 30 min, 1 h, 5 h, 24 h vai pielāgots ilgums no 1 līdz 43 200 minūtēm (30 dienām).

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikācija: management):

- `GET /api/resilience/cooldowns[?provider=]` — savienojumi ar statusu, atlikušo atdzišanas laiku, atkāpšanās līmeni, pēdējo kļūdas tipu un modeļu bloķēšanām (bez akreditācijas datiem)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` vai `{all: true, provider?}`; atgriež `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Bloķēšanas iestatījumu UI + atkopšana, samazinoties pēc panākumiem (v3.8.23)

Modeļa bloķēšana no vienmēr ieslēgtas, cieti kodētas darbības kļuva par pilnībā konfigurējamu, pēc izvēles aktivizējamu funkciju ar savu iestatījumu kartīti un pašatjaunojošas atkopšanas ceļu.

**Iestatījumu kartīte:** Iestatījumi → Modeļa bloķēšana
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tā ir **atšķirīga** no iepriekš minētās tikai lasāmās `ModelCooldownsCard` (kas tikai
_uzskaita_ aktīvās bloķēšanas) — jaunā kartīte _konfigurē parametrus_. Noklusējuma vērtības atrodas `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Iestatījums             | Noklusējums                      | Nozīme                                                                  |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `enabled`               | `false`                          | Galvenais slēdzis — modeļa bloķēšana pēc noklusējuma ir **izslēgta**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Augšupējā servera statusi, kas tiek uzskatīti par modeļa tvēruma kļūmi. |
| `baseCooldownMs`        | `120_000` (120 s)                | Sākotnējais bloķēšanas ilgums pirmajai kļūmei.                          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Palielinātās atdzišanas maksimālā robeža.                               |
| `maxBackoffSteps`       | `10`                             | Maksimālais eksponenciālās atkāpšanās palielināšanas soļu skaits.       |
| `useExponentialBackoff` | `true`                           | Vai atkārtotas kļūmes atdzišanu palielina eksponenciāli.                |

Iestatījumi tiek saglabāti parastajā iestatījumu krātuvē un validēti, izmantojot noturības iestatījumu shēmu; kartīte ierobežo `baseCooldownMs`/`maxCooldownMs`
(ar `maxCooldownMs ≥ baseCooldownMs`) un `maxBackoffSteps` vērtības.

**Atkopšana, samazinoties pēc panākumiem:** atkopšana nav **tikai** taimera
beigušās darbības rezultāts. Veselīga atbilde samazina modeļa kļūmju skaitu, tādēļ modelis, kas atkopies loga vidū, pārstāj palielināt atdzišanu (un tiek atbloķēts) pirms taimera beigām. Ja kombinācijas mērķis ir veiksmīgs, `open-sse/services/combo.ts` izsauc `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), kas **samazina uz pusi** saglabāto
`failureCount` (`Math.floor(failureCount / 2)`); kad tas sasniedz `0`, bloķēšanas ieraksts tiek pilnībā dzēsts. Pretējā funkcija `recordModelLockoutFailure()` palielina skaitu (un palielina atdzišanu) kļūmēm eskalācijas loga laikā. Šī samazināšanās pēc panākumiem papildina parasto taimera beigušos darbību — jebkurš no šiem ceļiem var atkārtoti iespējot modeli.

**Stāvoklis:** bloķējumi tiek glabāti **atmiņā** (katrā procesā atsevišķās `Map`s, kuru atslēgas ir
`ModelLockoutEntry`, izmantojot `provider:connectionId:model`, bet precīza tvēruma bloķējumiem
`provider:connectionId:exact:model`), nevis saglabāti
DB — pēc restartēšanas tie tiek zaudēti. _Iestatījumi_ tiek saglabāti; aktīvais
bloķējuma _stāvoklis_ ir īslaicīgs.

---

## 4. Kvotas koplietošanas vienlaicības kontrole (v3.8.36)

Abonēšanas konti (GLM, MiniMax utt.) bieži vien pieņem tikai ~ 1–3 vienlaicīgus pieprasījumus; pārsniegšana izraisa 429s un atdzišanu. Tas ir akūts zem** kvotas daļa** (`qtSd/…`) kombinācijas, kur vairākiem API taustiņiem ir kopīgs viens augšupējais konts. Trīs slāņi neļauj koplietotajam kontam tikt appludinātam.

### Vienlaicības ierobežojums katram savienojumam (`max_concurrent`)

Katrs pakalpojumu sniedzēja savienojums var deklarēt `max_concurrent` griestus (`provider_connections.max_concurrent`, kas iestatīts savienojumā modāls / API / DB). Atstājiet to tukšu bez ierobežojumiem. Šī ir vienīgā poga, kas vada serializācijas slāni zem — iestata to uz konta reālo vienlaicību (piemēram GLM ~ 1, MiniMax ~ 2).

### Vienlaicības ierobežojumi katram modelim (`modelConcurrency`)

Savienojums savā `rateLimitOverrides` kartē var papildus deklarēt precīzus katra modeļa vienlaicīguma griestus:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Iestatiet to savienojuma modālā (** Likmes ierobežojums ignorē → Vienlaicības ierobežojumus katram modelim** , viens `model=cap` katrā rindā) vai caur `PATCH /api/providers/[id]` ar tādu pašu JSON formu. Galvenā semantika:

- **Visā savienojumā salīdzinājumā ar modeli:** `maxConcurrent` joprojām ir koplietošanas savienojuma griesti. Ja tiek piemēroti abi, abi vārti tiek iegūti atomiski tajos pašos saliktajos vārtos (`global → provider → account → model`); efektīva rīcība ir stingrāka piemērojamā robeža.
- **Precīza modeļa un atslēgas atbilstība:** galvenais ir modeļa virkne, kas tiek nodota izpildītājam pēc maršrutēšanas izšķirtspējas — parasti tukšais augšpus modeļa ID (`glm-5`), nevis klienta puses `provider/model` aizstājvārds (`zai/glm-5` neatbilst `glm-5`). Vērtības ir pozitīvu veselu skaitļu vienlaicīga pieprasījuma griesti.
- **Vietējā rinda, bez atklāšanas:** lieko pieprasījumu rinda lokāli ar esošo queue/timeout semantiku (ierakstītas `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` uzņemšanas kļūdas). OmniRoute neatklāj vai neizsecina augšupējo politiku. — tā ievieš precīzus operatora konfigurētos griestus. Piesātināta modeļa vārti nekad neatspējo pakalpojumu sniedzēju un nerada pastāvīgu modeļa bloķēšanu; augšpus 429/cooldown/fallback uzvedība joprojām ir kļūdas bloķētājs.
- **Katram savienojumam, katram procesam:** vāciņi ir katram datu bāzes savienojumam un tiek turēti atmiņā, tāpēc divi savienojumi, kas atkārtoti izmanto vienu un to pašu augšupējo API taustiņu, nesaskaņojas viens ar otru.
- **Nekonfigurēts nozīmē nemainīts:** izlaižot karti (vai atstājot informācijas paneļa lauku tukšu), modeļa vārti netiek pievienoti. Konfigurācijas piemērs, nenosakot nekādu universālo pakalpojumu sniedzēja ierobežojumu:

```text
glm-5=1
glm-4.7=3
```

### Kvotas dalīšanas pieprasījuma serializācija

Ja kvotas sadales nosūtīšanas mērķis ir savienojums, kas deklarē pozitīvu `max_concurrent`, tam tiek nosūtīti vienlaicīgi pieprasījumi** kontu** tiek serializēti, izmantojot katra savienojuma semaforu (taustiņu `qsconn:<connectionId>`): lieki pieprasījumi** gaidiet rindā** tā vietā, lai pārpludinātu kontu. Tā ir** neveiksmīgs** — piesātināta rinda vai taimauts turpinās bez slota, nevis nekad noraidītu nosūtāmu pieprasījumu. Pārslēgt** Iestatījumi → Noturība → Kvotas koplietošanas savienojuma vienlaicīgums** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, noklusējuma ieslēgts). Bez `max_concurrent` vāciņa uzvedība nemainās.

> Kvotas koplietošanas maršrutēšanas vārti (`selectQuotaShareTarget`, DRR + P2C) pati par sevi ir atvērti kļūmēm un tikai _atšķiras no prioritātēm_ at-cap savienojumam — ar viena savienojuma kopu, ko nevar stingri ierobežot, tāpēc šis semafors ir tas, kas faktiski satur plūdus.

### Atkārtots mēģinājums kombinētajā režīmā

Katrai kombinācijas stratēģijai (ja ir iespējota) pieprasījums, kas izkristalizētu 429 SHORT pārejošai atdzišanai, gaida to un tiek nosūtīts atkārtoti, nevis atgriež 429 — tas attiecas uz Gemini klases TPM/RPM logiem (~ 60s atkārtots mēģinājums pēc) vairāku modeļu kombinācijas, piemēram, ķemmes 2 mērķa trāpīšanas ātrums katram modelim. Ierobežo `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`)** Iestatījumi → Resilience** . Tas nekad negaida `quota_exhausted` (bloķēts līdz pusnaktij) vai auth/not-found iemeslu dēļ. Ja ir iestatīts `comboTimeoutMs`, gaidīšana, kas nevar beigties pirms šī termiņa, nesākas (#18998): kombinācija atbild uzreiz ar termināla atbildi, nevis `COMBO_TIMEOUT` 504.

Kombinācijā var atteikties ar `config.comboCooldownWaitEnabled: false`. Tikai burtiskā `false` atspējo šīs koplietotās kombinētās gaidīšanas (pēc nosūtīšanas atdzesēšanas un pirmsnosūtīšanas circuit-open/model-lock gaidīšanas) un to gaidīšanas budžeta noildzes un grīdas pagarinājumu. Trūkst vai `true` saglabā globālo politiku; `true` nevar iespējot globāli atspējotu gaidīšanu. Skaidrs `targetTimeoutMs` joprojām uzvar. Šī atteikšanās nemaina atsevišķu vietējā Codex pagriežamo pirmsnosūtīšanas gaidīšanu.

Tie paši vārti aptver pirmsnosūtīšanas gadījumu (#16319): ja katrs kombinācijas mērķis tiek izlaists pirms jebkāda mēģinājuma, jo tā modelis atrodas īsā pārejā bloķētā stāvoklī, nulles mēģinājuma ceļš gaida bloķēšanu zem tiem pašiem griestiem un tiek nosūtīts atkārtoti, tā vietā, lai atbildētu uz `503 ALL_TARGETS_SKIPPED` bez mājiena. Ja nav atļauts gaidīt (griesti, mēģinājums vai budžets ir izsmelts vai funkcija ir izslēgta), termināļa atbilde tiek atjaunināta uz `429 rate_limit_error` kas pārnēsā `retry_after` / `reset_at` no agrākās īslaicīgās slēdzenes derīguma termiņa beigām; Kvotas, autentifikācijas un neatrastas slēdzenes saglabā 503. izmantošanu bez mājiena.

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

## 5. Pieprasījumu rindas uzņemšanas kontrole (v3.8.49 · issue #6593)

**Darbības joma**: lokālā, katram pakalpojumu sniedzējam + savienojumam paredzētā pieprasījumu biežuma ierobežošanas rinda (`open-sse/services/rateLimitManager.ts`, kuras pamatā ir Bottleneck), vienu līmeni zemāk par trim iepriekš minētajiem mehānismiem.

**`maxWaitMs` ierobežo gaidīšanu rindā; `executionMaxWaitMs` ierobežo izpildi.**
Šie divi ir apzināti atdalīti, un neviens no tiem nepadod vērtību otram.

`resilienceSettings.requestQueue.maxWaitMs` ir **rindas gaidīšanas budžets**: tas
ietver gaidīšanu pēc pakalpojumu sniedzēja slota un pēc tam atrašanos statusā
QUEUED, un tā taimeris tiek notīrīts brīdī, kad uzdevums pamet QUEUED un sāk
izpildīties (`rateLimitManager.ts`, `wrappedFn`). Pieprasījums, kas šo budžetu
pārsniedz, nekad nesasniedz augšupvirzo pakalpojumu. Noklusējums 30000ms, ko
nodrošina `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` failā
`src/lib/resilience/settings.ts` un ko nofiksē
`tests/unit/ratelimit-admission-control-6593.test.ts`, tāpēc tās maiņa padara
šo testu sarkanu, nevis ļauj šai rindkopai klusi novecot.

`resilienceSettings.requestQueue.executionMaxWaitMs` ir tas, ko Bottleneck
saņem kā uzdevuma `expiration`, un tā taimeris sāk darboties tikai pēc
nosūtīšanas. Tas ir drošības barjera izpildītājiem, kuriem nav sava
augšupvirzējā taimauta, un tas tiek paaugstināts līdz izpildītāja paša
fetch-sākuma taimautam, ja tas ir garāks, tāpēc tas nevar pārgriezt veselīgu,
jau ceļā esošu atbildi. Noklusējums 600000ms (10 min).

Rindas budžeta padodana uz `expiration` ir tas, kas agrāk nogalināja
neinkrementālās vārtejas lidojuma vidū — tās leģitīmi darbojas minūtes ilgi
pirms pirmo baitu saņemšanas —, un tas ir iemesls, kāpēc derīguma termiņa
beigu gadījumā tiek parādīts `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), savukārt rindas budžets nes
rindas taimauta kodu. Jebkuru no tiem var pārrakstīt ar
`RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (vides mainīgie) vai informācijas panelī
(**Settings → Resilience**). Normalizējot, abi tiek ierobežoti diapazonā
1ms–24h.

**Prioritāte abiem gadījumiem:** vides mainīgais nodrošina tikai
_noklusējumu_. Vērtība, kas saglabāta `resilienceSettings.requestQueue`
(informācijas panelis / API labojums, glabājas `key_value`), ir spēcīgāka par
to, un katram savienojumam noteiktais
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ir spēcīgāks par šo.
Tāpēc vides mainīgā iestatīšana izvietojumā, kurā jau ir saglabāta vērtība,
neko nemaina — tā vietā notīriet vai atjauniniet saglabāto iestatījumu.

Uzturēšanos rindā ierobežo `maxWaitMs`; turpmāk aprakstītais `maxQueueDepth`
ierobežo, cik daudz izsaucēju vienlaikus var atrasties rindā.

**Ķermenī norādītie atkārtojumi: tempa noteikšana pret bloķēšanu.** 429
atbildes ķermenis var norādīt savu gaidīšanas laiku
(Gemini `RetryInfo.retryDelay`, teksts "retry after Ns"), ko nolasa
`updateFromResponseBody`. Gaidīšana, kas ietilpst savienojuma `maxWaitMs`, ir
tempa noteikšana: ierobežotājs uz šo laiku iztukšo savu rezervuāru, un rindā
esošie izsauki tiek nosūtīti, kad tas atkal piepildās. Gaidīšana, kas garāka
par `maxWaitMs`, nav kaut kas, ko rinda varētu izsēdēt — Gemini uz izsmeltu
dienas kvotu atbild ar
`retryDelay: "86399s"`. Pārsūtītais `Retry-After` uz pārbūvēto 429 atbildi
(#16528) jau liek rezerves dzinējam bloķēt modeli uz šo laika logu, taču
ierobežotāja apturēšana uz to pašu laiku joprojām apturētu jebkuru izsauku,
kas sasniedz atslēgu pārāk agri (piemēram, pēc noturības atiestatīšanas), uz
visu `maxWaitMs`. Kad šāda gaidīšana nāk no tipizētas Google `RetryInfo`
detaļas (provenience `google_rpc_retry_info`) un atslēgas ierobežotājs jau ir
ietverts uz modeli (sk. `getLimiterKey`), 429 tā vietā kļūst par modeļa
bloķēšanu šajā savienojumā (`lockModelForLongBodyRetry` failā
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, ierobežota līdz 24h),
un ierobežotājs paliek neapturēts. Kontu atlase to izlaiž, izmantojot šo
bloķēšanu caur `isModelLocked()`, un tāpat rīkojas arī kombinēto pieprasījumu
pirmsnosūtīšanas pārbaude mērķiem, kas piesprausti šim savienojumam.
Antigravity gadījumā, kura ierobežotājs ir uz kvotu saimi, bloķēšana attiecas
uz precīzu modeli, tāpat kā citas tā kvotu bloķēšanas. Klients pieprasītais
nosaukums tiek bloķēts arī tad, kad alias to atrisināja uz šo modeli, jo šīs
pārbaudes izmanto pieprasīto nosaukumu; tas tiek bloķēts precīzi
(`lockExactModel`), tāpēc alias, kas šķērso antigravity kvotu saimi vai codex
tvērumu, nekad nebloķē savējo. Prozisks mājiens, netipizēts `retryDelay` vai
ierobežotājs, ko koplieto viss savienojums, saglabā pauzi. Kad ierobežotājs,
ko 429 apstrādes ceļš tikko pārbūvēja, tomēr pauzējas, izsaucējs, kura
atlikušais rindas laiks beidzas agrāk nekā pauze, tiek uzreiz noraidīts ar
rindas taimauta kodu (`checkLimiterPause`), nevis gaida, kamēr šis laiks
beidzas; reģistrētais beigu brīdis ir noenkurots pirms ierobežotāja
izveidošanas, kur Bottleneck sāk savu atsvaidzināšanas pulksteni, un jebkuras
vēlākas rezervuāra izmaiņas to aizmirst. To sedz
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` un
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — pēc izvēles ieslēdzama uzņemšanas robeža (jaunums).** `resilienceSettings.requestQueue.maxQueueDepth`
ierobežo, cik daudz pieprasījumu vienlaikus var atrasties rindā (vēl
nenosūtītu) vienam pakalpojumu sniedzējam + savienojumam. Kad rindā jau ir
`maxQueueDepth` pieprasījumi, jauns pieprasījums tiek ātri noraidīts ar
tipizētu
`code: "RATE_LIMIT_QUEUE_FULL"` kļūdu **pirms** tas vispār sasniedz
`limiter.schedule()` — tāpēc noraidījums ir lēts un notiek pirms jebkāda
tālākā uzvedņu saspiešanas / tulkošanas darba šim pieprasījumam. Noklusējums
`0` = atspējots, saglabājot esošo neierobežotās rindas uzvedību; robežas
0–100000. Pārrakstāms ar `RATE_LIMIT_MAX_QUEUE_DEPTH` (vides mainīgais) vai
`resilienceSettings.requestQueue.maxQueueDepth` (informācijas panelis / API
labojums).

Pati uzņemšanas pārbaude ir tīra funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`),
tāpēc to var vienību-testēt bez reāla Bottleneck ierobežotāja.

> RFC, kas atvēra #6593, ieteica arī `bypassCompressionOnRateLimit`
> karodziņu. Šī repozitorija `open-sse/services/compression/` konveijers ir
> uzvednes/konteksta saspiešana izejošajam LLM pieprasījumam (`chatCore.ts`,
> ap `resolveCompressionSettings`/`selectCompressionStrategy` bloku), nevis
> HTTP atbilžu saspiešana sintezētajiem 429 saturiem — nav atbilstoša koda
> ceļa burtiskam apiešanas karodziņam. Šis uzvednes saspiešanas solis pašlaik
> izpildās _pirms_ `withRateLimit()` pieprasījumu konveijerā, tāpēc tā
> pārkārtošana, lai to izlaistu noraidījuma gadījumā, kad rinda ir pilna, ir
> atsevišķas, apjomīgākas izmaiņas nekā šī jautājuma tvērums; tas šeit tika
> apzināti **neimplementēts** un atstāts kā turpmāks uzdevums gadījumam, ja
> CPU ietaupījuma ieguvums attaisno pārkārtošanas risku.

### Pieprasījumu biežuma ierobežojuma automātiskās iespējošanas drošības tīkls un savienojumu aizsardzība (`rateLimitProtection`)

**Automātiskās iespējošanas drošības tīkls** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, noklusējums `true`):
Pēc noklusējuma OmniRoute automātiski iespējo pieprasījumu biežuma ierobežojuma rindas aizsardzību visiem aktīvajiem API atslēgu nodrošinātāju savienojumiem (`getProviderCategory(provider) === "apikey"`). Tas nodrošina, ka ienākošie pieprasījumi uz pret biežuma ierobežojumiem jūtīgām augšupējām API atslēgām tiek ievietoti rindā un to plūsma tiek ierobežota ar Bottleneck, nevis strauji izraisot augšupējās 429 kļūdas. Drošības tīklu var pārdefinēt ar `RATE_LIMIT_AUTO_ENABLE` vides mainīgo (`false`/`0`/`off` atspējo, `true`/`1`/`on` piespiež ieslēgt), kuram ir prioritāte pār saglabāto informācijas paneļa iestatījumu (**Iestatījumi → Noturība** / `PATCH /api/resilience`).

**Katra savienojuma `rateLimitProtection` semantika:**
Katra savienojuma pieprasījumu biežuma ierobežojuma aizsardzība tiek izsekota ar `rateLimitProtection` loģisko lauku nodrošinātāju savienojumos (SQLite saglabāts kā `rate_limit_protection`):

- **Skaidri ieslēgts (`rateLimitProtection === true`)**: Pieprasījumu biežuma ierobežojuma aizsardzība šim savienojumam ir skaidri iespējota neatkarīgi no nodrošinātāja kategorijas un no tā, vai automātiskās iespējošanas drošības tīkls ir ieslēgts.
- **Skaidri izslēgts (`rateLimitProtection === false`)**: Atspējo skaidri izteikto aizsardzību, bet **neizņem** aktīvu API atslēgas savienojumu no globālā automātiskās iespējošanas drošības tīkla. Funkcijā `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) `false` un `undefined` ir līdzvērtīgi: tikai `rateLimitProtection === true` tiek uzskatīts par skaidri izteiktu pārdefinējumu. Ja `rateLimitProtection` ir `false` (vai nav iestatīts), aktīvs API atslēgas savienojums joprojām atbilst automātiskās iespējošanas nosacījumam un paliek aizsargāts ar pieprasījumu biežuma ierobežojumu.
- **Nav iespējas atteikties atsevišķam savienojumam**: Operators pašlaik nevar izteikt prasību "šim vienam aktīvajam API atslēgas savienojumam jādarbojas bez pieprasījumu biežuma ierobežojuma rindas aizsardzības", vienlaikus saglabājot automātisko iespējošanu aktīvu pārējiem. Lai API atslēgu savienojumi pilnībā darbotos bez pieprasījumu biežuma ierobežojuma rindām, drošības tīkls ir jāizslēdz globāli (`RATE_LIMIT_AUTO_ENABLE=false` vai `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Atbalstītie rakstīšanas ceļi:**

- **`POST /api/rate-limits`**: Atbalstītais pārvaldības rakstīšanas ceļš, lai pārslēgtu `rateLimitProtection` savienojumam (`{ connectionId: string, enabled: boolean }`). Izsaucot to ar `enabled: true`, skaidrā aizsardzība tiek ieslēgta; izsaucot ar `enabled: false`, skaidrā aizsardzība tiek noņemta (lai gan aktīvie API atslēgu savienojumi joprojām paliek aizsargāti globālajā drošības tīklā, ja automātiskā iespējošana ir ieslēgta).
- **`PUT /api/providers/[id]`**: Apzināti **nepieņem** un nepārslēdz `rateLimitProtection` (#11278). Nodrošinātāja savienojuma metadatu atjaunināšana ar `PUT /api/providers/[id]` nekad nemainīs saglabāto pieprasījumu biežuma ierobežojuma aizsardzības stāvokli.

---

## 6. Lēnas plūsmas caurlaidspējas sargsuns (#9709)

Papildaprīkojuma `resilienceSettings.streamRecovery.throughputWatchdog` aizsargs konstatē augšup padevi, kas joprojām sūta gabalus, bet rada palīga izvadi, kas ir zemāka par konfigurēto lietderīgās izvades ātrumu. Tas apzināti atšķiras no dīkstāves taimauta: sirdspuksti un metadati netiek atiestatīti neviens taimeris un netiek uzskatīti par progresu. Tas atšķiras arī no grūtā mēģinājuma termiņa (#9153), kas joprojām ir absolūti drošības griesti neatkarīgi no produkcijas kvalitātes.

Sargsunim ir nepieciešams iesildīšanās periods, kam seko pilnīgs ritošais logs, pirms tas var pārtraukt. Tas uzskaita teksta deltas no tērzēšanas pabeigšanas un atbilžu API izvades notikumiem (konservatīvs UTF-8 baitu starpniekserveris), ignorē tikai lietojuma un tukšas darbības un aptur spriedumu, kamēr notiek rīku izsaukuma vai argumentācijas notikumi. Pēc noklusējuma tas ir atspējots, un to var iespējot ar `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (šī env vērtība tikai ievada noklusējuma — uzvar saglabātā `resilienceSettings.streamRecovery.throughputWatchdog.enabled` Būla vērtība; skatiet env-vs-dashboard prioritātes piezīmi šīs rokasgrāmatas augšdaļā); logu, iesildīšanu, minimālo ātrumu un minimālo izmērāmo izvadi ierobežo parastā elastības iestatījumu normalizācijas slānis.

Ja tas ir iespējots, sargsuņa pārtraukšana tiek lietota tikai aktīvajam mēģinājumam augšup. Pirms klienta redzamiem baitiem esošais tā paša konta agrīnās atkopšanas ceļš var atkārtoti atvērt mēģinājumu. Pēc apņemšanās straume nekad netiek akli atskaņota; tikai esošais drošais vidus straumes turpinājuma līgums var uzšūt sufiksu. Pabeigšana paliek vienreizēja, tāpēc lietojuma uzskaite un semafora izlaišana netiek dublēta.

---

## 7. Augšupējā statusa atkārtota iestatīšana (kļūdaini norādītas kvotas kļūdas)

**Tvērums:** viena augšupējā vārteja, kas par pagaidu kvotas izsmelšanu ziņo ar nepareizu HTTP statusu.

**Mērķis:** izlabot maldinošo statusu PIRMS klasificēšanas, lai lejupējie patērētāji (atkāpšanās dzinis, kombinētā apkopošana, klientam paredzētā atbilde) redzētu kļūmes faktisko atkārtojamo raksturu.

Dažas vārtejas par PAGAIDU kvotas izsmelšanu signalizē ar HTTP statusu, kas
nav atkārtojams. `agentrouter.org` atgriež `403` (dažreiz `400`) ar ķīniešu
tekstu (`用户额度不足` / `额度不足`) standarta `429` vietā. Tādi klienti kā Claude
Code uzskata `403` par neatgriezenisku kļūdu un pārtrauc sesiju, bet bez
korekcijas atkāpšanās dzinis to klasificētu kā `AUTH_ERROR`, nevis kā kvotas
notikumu.

**Implementācija:**

- Reģistrs + atbilstības meklētājs: `open-sse/config/upstreamStatusRestatement.ts` — katram
  pakalpojumu sniedzējam paredzēts noteikumu saraksts (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), ko apstrādā, izmantojot `applyStatusRestatement()`.
- Izsaukuma vieta: `providerFailure:` bloks failā `open-sse/handlers/chatCore.ts`
  (aptuveni 3654. rinda), uzreiz pēc tam, kad `parseUpstreamError()` parsē
  augšupējo atbildi ar kļūdas HTTP statusu (`!providerResponse.ok`), un pirms
  jebkādas klasificēšanas sākšanas, lai visi lejupējie patērētāji redzētu
  izlaboto statusu. Kļūdas, kas ietvertas `200` SSE straumē, seko atsevišķam,
  vēlākam straumes parsēšanas ceļam, un šis āķis uz tām šodien **neattiecas** —
  tas ir zināms ierobežojums, kas pagaidām nav nepieciešams `agentrouter`
  nepareizi norādītā statusa gadījumā (tas parādās kā kļūdas HTTP statuss).
- Atkārtošanas piemērotība: `429` ir iekļauts `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), tāpēc atkārtoti iestatīta
  kļūda nes sev līdzi reālu atkārtošanas logu, nevis tiek parādīta kā neaktīvs
  `403`.
- Sintētiskais `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ir tikai tas, ko atkārtoti iestatītā atbilde paziņo **klientam**; tas pats par
  sevi nav savienojuma iekšējais atdzišanas/bloķēšanas ilgums — to atsevišķi
  nosaka mehānisms, kas faktiski apstrādā atkārtoti iestatīto kļūdu
  (Connection Cooldown eskalējošā atkāpšanās, §2, ar bāzes vērtību `3s` API
  atslēgu nodrošinātājiem; vai Model Lockout, §3, katram modelim paredzētiem
  kvotas nodrošinātājiem, piemēram, agentrouter). Maršrutētājs iekšēji var kļūt
  gatavs atkārtot mēģinājumu ātrāk par klientam reklamēto 60 sekunžu logu —
  tas ir apzināts drošības rezervju laiks, nevis kļūda.

Neatgriezeniskas kļūdas (`agentrouter` `无权访问模型` — nav piekļuves šim
modelim) NEKAD netiek atkārtoti iestatītas: `excludeMarkers` atceļ noteikumu
pat tad, ja atbilst `textMarkers`, tāpēc kļūda saglabā sākotnējo statusu un
nekas nemēģina to bezgalīgi atkārtot. Atbilstošais pakalpojumu sniedzēja
klasificēšanas noteikums
(`agentrouter-model-access-denied` failā `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarētā bāzes atdzišanas vērtība
`6h`) tiek pārbaudīts ar `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_pirms_ vispārīgās apikey kategorijas `FORBIDDEN` agrīnās atgriešanas, ja
`honorsRuleLockScope(provider)` (#10334 — pašlaik ekskluzīvi agentrouter
pakalpojumu sniedzējam, izmantojot `HONORS_RULE_LOCK_SCOPE_PROVIDERS` atļauto
sarakstu failā `providerErrorRules.ts`). Noteikumā deklarētā 6 stundu
atdzišana tiek nodota kā `fallbackResult.baseCooldownMs`, taču tā joprojām
izmanto jau esošo katram modelim paredzēto kvotas bloķēšanas ceļu
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ko #10334 nav mainījis, izņemot atdzišanas
avotu): tā tiek samazināta līdz operatora `mlSettings.maxCooldownMs`
noklusējuma vērtībai `1_800_000ms` / 30 minūtēm, tāpat kā jebkura cita modeļa
bloķēšana, un _persistētais bloķēšanas iemesls_ paliek iepriekš cieti
iekodētais `"forbidden"`, nevis noteikuma `"auth_error"` — pilnā izpildes
plūsmā tiek ņemts vērā tikai atdzišanas ilgums, nevis iemesla virkne.
Savienojums pats paliek aktīvs; blakus modeļi tajā pašā savienojumā netiek
ietekmēti.

Atkārtoti iestatītas kvotas kļūdas (`额度不足`) produkcijā sasniedz
pakalpojumu sniedzēja noteikumu (`agentrouter-user-quota-exhausted`:
`reason: "quota_exhausted"`, `scope:
"connection"`, bez paša deklarēta atdzišanas ilguma — tiek izmantota
persistences slāņa mērogotā noklusējuma atkāpšanās). Kopš #10334 `scope` laukam
`ProviderErrorRuleMatch` TIEK piemērota ietekme visā izpildes plūsmā, taču
**tikai** pakalpojumu sniedzējiem, kas iekļauti `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
atļautajā sarakstā (`providerErrorRules.ts` — šodien tas ir tikai
`"agentrouter"`, ko kontrolē `honorsRuleLockScope()`). Visiem pārējiem
pakalpojumu sniedzējiem `scope` paliek informatīvs, tieši tāpat kā pirms
#10334. `checkFallbackError` atbilstošā noteikuma tvērumu parāda kā
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ir kopīgais aizsargmehānisms, kas apstiprina, ka
`ruleScope` patiešām ir droši izmantojams kā visam savienojumam piemērojams,
pašatjaunojošs signāls (tvērums `"connection"`, iemesls `quota_exhausted`,
nekad `permanent`, nekad `creditsExhausted` — aizsardzība pret nākotnē
iespējamu noteikuma savienošanu pārī, kur tvērums `"connection"` tiek apvienots
ar neatgriezenisku konta stāvokli). To izsauc divi patērētāji:

- **Persistēšana** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  tā vietā, lai nonāktu caurlaides nodrošinātāja **katram modelim** paredzētajā bloķēšanas zarā (agentrouter ir `passthroughModels: true` → `hasPerModelQuota()`
  atgriež `true`), tā piemēro **īslaicīgu savienojuma atdzišanas periodu** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nekad neizmantojot gala statusu
  (`credits_exhausted`/`banned`/`expired`) — tādējādi savienojums pēc atdzišanas perioda beigām automātiski atjaunojas, nevis pieprasa manuālu akreditācijas datu atiestatīšanu.
  Izlaists savienojumiem ar `disableCooling: true` (#2997): šī atteikšanās iespēja tā vietā nonāk katram modelim paredzētajā bloķēšanā (dokumentēts kompromiss —
  skatiet koda komentāru virs šī zara).
- **Kombinētā maršrutēšana viena pieprasījuma ietvaros** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): tā pati aizsardzība atzīmē
  savienojumu atmiņā uzturētajā `exhaustedConnections` kopā ar atslēgu
  `${provider}:${connectionId}`. Tas izlaiž tikai atlikušo SAME-REQUEST mērķi, kuram _pašam jau ir pievienots tieši šis `connectionId`_ tā paša mērķa objektā (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` pirms `exhaustedConnections` meklēšanas) — parasta kombinācija ar modeļu sarakstu, kur brāļu mērķiem nav piesaistīta sava `connectionId` un viens savienojums tiek atrisināts katrai nosūtīšanai no atbildes `X-OmniRoute-Selected-Connection-Id` galvenes, nekad nesakrīt ar šo atslēgu. Šajā biežajā gadījumā reālā aizsardzība pret to, ka atlikušais posms atkārtoti izmanto tikko izsmelto kontu, NAV šī kopa — tā ir iepriekš aprakstītais persistēšanas slānis (savienojuma `rateLimitedUntil` tagad atrodas nākotnē) kopā ar šo pašu aizsardzību, kas apspiež `transientRateLimitedProviders` neveiksmes gadījumā (skatiet “Divpakāpju dizains” un koda komentāru par
  `isAgentrouterConnectionQuotaScope` zaru failā `targetExhaustion.ts`): ja šis kopas elements netiek atzīmēts, `combo.ts` piespiedu atļaušana `allowRateLimitedConnection`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NETIEK aktivizēta pakalpojuma sniedzēja atlikušajiem posmiem, tāpēc akreditācijas datu atlases `rateLimitedUntil` filtrs (`src/sse/services/auth.ts:1238`) tiek ievērots kā parasti un atlikušais posms vai nu izvēlas citu, joprojām pieejamu agentrouter savienojumu, vai arī neizdodas ar paziņojumu par pieejamu akreditācijas datu trūkumu — tas nepiespiež sevi atgriezties pie savienojuma, kuram šis zars tikko piemēroja atdzišanas periodu.

### Divpakāpju dizains: statusa pārformulēšana, pēc tam klasificēšana

Statusa pārformulēšana (`upstreamStatusRestatement.ts`) un pakalpojuma sniedzēja klasifikācijas noteikumi (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ir atsevišķi reģistri, kas abi izmanto pakalpojuma sniedzēja ID un teksta marķierus, taču tie darbojas dažādās vietās un kalpo atšķirīgiem mērķiem: pārformulēšana agri pārraksta HTTP statusu failā `chatCore.ts`;
klasifikācijas noteikumi izvēlas rezerves `reason` un bloķēšanas `scope`
(`model` / `provider` / `connection`) funkcijas `checkFallbackError()` ietvaros (`open-sse/services/accountFallback.ts`).

Klasifikācijas noteikumi redz tikai pilnu kļūdas **tekstu** (kas nepieciešams, lai atrastu pamatteksta marķierus, piemēram, `额度不足`) tiem pakalpojumu sniedzējiem, kas norādīti `FULL_TEXT_RULE_PROVIDERS` atļauto pakalpojumu sniedzēju sarakstā failā `providerErrorRules.ts` — pašlaik tikai `"agentrouter"`. Visiem pārējiem **iebūvētā kataloga** pakalpojumu sniedzējiem `checkFallbackError` nodod
`getProviderErrorRuleMatch` tikai strukturēto kļūdu (`{code, type}`), ar ko pietiek galvenes/statusa/koda noteikumiem, bet ne ķermeņa teksta marķieriem.
Palīgfunkcija `resolveRuleMatchBody()` veic šo atlasi: pilns kļūdas teksts atļauto pakalpojumu sniedzēju gadījumā, strukturētā kļūda — pārējos gadījumos. **Iebūvēta** pakalpojumu sniedzēja pievienošana `FULL_TEXT_RULE_PROVIDERS` ir skaidra konkrētā pakalpojumu sniedzēja izvēle — tā nodrošina, ka noklusējuma ceļš visiem sarakstā neiekļautajiem pakalpojumu sniedzējiem paliek nemainīgs līdz pat baitiem.

Noteikuma `scope` (`model` / `provider` / `connection`) ir no `FULL_TEXT_RULE_PROVIDERS` neatkarīga izvēles iespēja: `checkFallbackError` to atklāj tikai kā `fallbackResult.ruleScope`, un pakārtotie patērētāji to respektē kā jebko vairāk par informatīvu marķējumu tikai tiem pakalpojumu sniedzējiem, kas norādīti tā paša faila `HONORS_RULE_LOCK_SCOPE_PROVIDERS` atļauto pakalpojumu sniedzēju sarakstā (kontrole tiek veikta ar `honorsRuleLockScope()` — pašlaik tikai `"agentrouter"`). Informāciju par to, ko `scope: "connection"` atbilstība faktiski dara, tiklīdz pakalpojumu sniedzējs ir iekļauts šajā atļauto pakalpojumu sniedzēju sarakstā, skatiet iepriekš sadaļā “Pārformulētas kvotas kļūdas”.

**#11104 — operatora deklarētie noteikumi apiet abus atļauto pakalpojumu sniedzēju sarakstus.** Operators var izpildlaikā deklarēt katram pakalpojumu sniedzējam paredzētu noteikumu, izmantojot `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`), neveicot izmaiņas šajā failā. Operatora noteikuma pakļaušana `FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` nosacījumiem — šie saraksti ir paredzēti iebūvēto kataloga noteikumu **noklusējuma** darbības aizsardzībai — padarītu iestatījumu mehānismu neaktīvu visiem pakalpojumu sniedzējiem, izņemot tos, kas tajā jau ir norādīti, jo noteikuma deklarēšana jau pati par sevi ir skaidra operatora izvēle. Gan `resolveRuleMatchBody()`, gan `honorsRuleLockScope()` vispirms pārbauda `hasOperatorRuleForProvider()`: pakalpojumu sniedzējs ar operatora noteikumu saņem neapstrādātu kļūdas tekstu, un tā deklarētais `scope` tiek ievērots neatkarīgi no tā, vai pakalpojumu sniedzējs ir iekļauts kādā no atļauto pakalpojumu sniedzēju sarakstiem.

**Operatora deklarētie noteikumi** (`OperatorProviderErrorRule`): katram noteikumam ir neobligāts `status` un neobligāts `match` (vienkārša, reģistrnejutīga apakšvirkne kļūdas tekstā, nekad ne RegExp, tāpēc tā nevar izraisīt ReDoS), un jābūt iestatītam vismaz vienam no tiem. Ja iestatīti abi, tiem tiek piemērots AND nosacījums; neiekļauts lauks atbilst jebkam, tāpēc `{match: "insufficient_quota"}` atbilst jebkuram statusam, kas satur šo kodu. Uzvar pirmais atbilstošais noteikums. `cooldownMs` pieņem vērtības līdz 30 dienām; kopumā drīkst būt ne vairāk kā 50 noteikumi.

**Vispārīgie noklusējumi** (`settings.providerErrorDefaults`, jāieslēdz, iestatot
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`,
kur `cooldownMs` ir no 1 minūtes līdz 30 dienām. Noklusējums tiek piemērots tikai tad,
ja nav atbilstoša operatora noteikuma un iebūvētā kataloga noteikuma, un tikai 402, 403, 408,
429 un 5xx kļūdām. Pieprasījuma formas kļūdas (400, 404, 409, 413, 422) un vienkāršas
401 kļūdas saglabā savu apstrādi. Ja `reason` nav skaidri norādīts, iemesls tiek iegūts no
statusa tāpat kā `classifyError` gadījumā. Noklusējuma deklarēšana tiek uzskatīta par
operatora noteikumu funkcijai `hasOperatorRuleForProvider()`, tāpēc tās `scope` (noklusējums
`"connection"`) tiek ņemts vērā. Noklusējuma faktiskā aizkave ir garākā no tās
`cooldownMs` vērtības un nodrošinātāja paša atkārtošanas ieteikuma (`Retry-After`,
`x-ratelimit-reset` vai atiestatīšanas ieteikuma pamattekstā — tā paša ieteikuma, ko dzinējs
ņem vērā, ja savienojuma aizkaves iestatījums "use upstream retry hints" ir ieslēgts),
tādējādi noklusējums var pagarināt īsu augšupējā servera ieteikumu, bet nekad nevar saīsināt
īstu atiestatīšanas periodu. Skaidri norādīts operatora noteikums saglabā savu precīzo
`cooldownMs`. Ne noteikums, ne noklusējums neapiet savienojuma aizkaves aizsardzību
`markAccountUnavailable`: aktīva, garāka aizkave nekad netiek saīsināta, un termināls statuss
nekad netiek pārrakstīts. Iebūvētie teksta detektori, kas `checkFallbackError` darbojas agrāk
(izsmelti kredīti, dienas kvota, deaktivizēts konts), joprojām ir prioritāri attiecībā uz
saviem konkrētajiem formulējumiem.

**Zināma nepilnība — `providerRuleRegistry` nekad netiek izmantots HTTP 400 gadījumā.**
`checkFallbackError` `BAD_REQUEST` zars statusu 400 klasificē pilnībā, izmantojot savus
šablonu masīvus (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` u. c. failā `accountFallback.ts`), un atgriežas, pirms tiek
sasniegts iepriekš esošais `configuredRule`/`getProviderErrorRuleMatch` zars.
Iebūvēts kataloga noteikums (vai operatora noteikums) ar `status: 400` ir sintaktiski
derīgs, taču nekad netiks izpildīts. Pašlaik neviens esošais noteikums neattiecas uz 400,
tāpēc produkcijā nekas netiek ietekmēts — tomēr nākotnes 400 noteikumam vispirms būtu
jāmaina šis zars, kas ir plašākas izmaiņas nekā viena noteikuma pievienošana (tas
pārklasificē 400 visiem nodrošinātājiem, kuri jau paļaujas uz šablonu masīvu darbību), un
neietilpst viena nodrošinātāja noteikuma pievienošanas tvērumā.

### Jauna kvotu kļūdaini norādoša vārteja

1. Reģistrējiet vienu noteikumu masīvu `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Saglabājiet `textMarkers`
   specifiskus nodrošinātājam; nekad neizmantojiet atkārtoti vispārīgas angļu frāzes, kas
   konfliktē ar `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Pēc izvēles reģistrējiet klasifikācijas noteikumus
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), lai izvēlētos pareizo
   bloķēšanas tvērumu (`connection` visas kvotas kontam, `model` kļūdām konkrētam modelim).
   Šis solis produkcijā stājas spēkā tikai tiem nodrošinātājiem, kuru noteikumiem
   nepieciešams pilns kļūdas teksts (pamatteksta marķieri): pievienojiet nodrošinātāja
   identifikatoru `FULL_TEXT_RULE_PROVIDERS` tajā pašā failā — pretējā gadījumā
   `checkFallbackError` noteikumam nodod tikai strukturēto `{code, type}` kļūdu, un
   pamatteksta noteikums reālā datplūsmā nekad nesakritīs. Noteikumiem, kas atbilst tikai
   pēc `status`/`headers` (piemēram, Opencode vai Minimax noteikumiem), šī izvēles
   ieslēgšana nav nepieciešama. Atsevišķi, ja noteikums deklarē `scope: "connection"` un
   iecere ir īsta visa savienojuma aizkave kopā ar tā paša pieprasījuma kombinācijas
   izlaišanu (nevis tikai informatīva etiķete), pievienojiet nodrošinātāja identifikatoru
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` tajā pašā failā — tas kontrolē
   `isAgentrouterConnectionQuotaScope()` tipa izmantošanu `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) un
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez tā `scope`
   joprojām tiek nodots caur `fallbackResult.ruleScope`, taču nekas uz to nereaģē.
3. Pievienojiet vienības testus, atspoguļojot
   `tests/unit/upstream-status-restatement.test.ts`
   un `tests/unit/agentrouter-error-rules.test.ts` (iekļaujot
   `not-permanent` / `not-creditsExhausted` aizsargpārbaudes un, ja nodrošinātājam
   nepieciešams atļaušanas saraksts, testu, kas apstiprina, ka
   `resolveRuleMatchBody()` atgriež pilnu tekstu tikai šim nodrošinātājam).

Izmaiņas `chatCore.ts`, `classifyError` vai kombinācijas loģikā nav nepieciešamas.

#### Izvades grupas bloķēšana (#10880)

Nodrošinātāji no `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode saime) tiek uzskatīti
par IP grupētiem augšupējiem serveriem (opencode bezmaksas līmenis ir grupēts pēc IP,
nevis pēc konta — skatiet #9611): 429. statusam, kas klasificēts kā `quota_exhausted`
**vai** `rate_limit_exceeded`, tiek iestatīta aizkave katram atļautās saimes savienojumam,
kura pēdējā zināmā izejas IP adrese atbilst kļūmes savienojuma adresei, pirms rotācija var
tos izmēģināt
— tādējādi tiek novērsti N-1 garantēti neveiksmīgi izsaukumi uz augšupējo serveri (tāda
pati struktūra kā #10460/#10525). `rate_limit_exceeded` ir iekļauts apzināti:
`markAccountUnavailable` ceļā opencode specifiskie noteikumi nekad nesakrīt (uz
`checkFallbackError` netiek nodoti ne galvenes, ne pamatteksts, un opencode nav
`FULL_TEXT_RULE_PROVIDERS` sarakstā), tāpēc 429, kura pamattekstā ir abonementa kvotas
teksts ("monthly usage limit reached"), kvotas teksta atkāpšanās mehānismā
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 stundas aizkave) tiek
klasificēts kā `quota_exhausted`, pirms vispār tiek sasniegts `status_429` noteikums —
savukārt 429 bez kvotas teksta (parasta ātruma ierobežošana) tiek klasificēts ar
`status_429` noteikumu kā `rate_limit_exceeded` un joprojām izraisa IP saimes aizkavi.
Atļautam nodrošinātājam IP grupēts ātruma ierobežojums ir tas pats signāls, kas izsmelta
kvota. Godīgi ierobežojumi:

- **Labākā mēģinājuma režīms**: bloķēšana sinhroni, bez kešatmiņas, no `proxy_logs` (24 stundu logā) iegūst savienojuma pēdējo zināmo `egress_ip`.
  Ja kešatmiņa ir auksta (`egress_ip` nekad nav pārbaudīts) vai rinda nepastāv, savienojums, kurā radusies kļūme, joprojām tiek atdzesēts ar zaru (ierakstīts tāpat kā šodien), tikai neviens blakus savienojums netiek bloķēts.
- **Nekad nav gala stāvoklis**: atdzišana ir atjaunojams kvotas logs
  (`testStatus: "unavailable"`); pastāvīgs stāvoklis nekad netiek iegūts no IP līmeņa signāla. Savienojumi ar `disableCooling` pilnībā izlaiž šo zaru.
- **Bloķēšanas granularitāte mainās allowlistētajai saimei**: šīs ir tvēruma izmaiņas, nevis tikai blakus savienojumu optimizācija. opencode ir `passthroughModels` nodrošinātājs, tāpēc pirms šī zara 429 izraisīja bloķēšanu katram MODELIM; tagad tas izraisa savienojuma atdzišanu — arī operatoram, kurš izmanto vienu savienojumu bez neviena blakus savienojuma. Šī ir granularitāte, ko opencode noteikumu tabula jau deklarē kā pareizu (`scope: "connection"`, `providerErrorRules.ts`), taču līdz šim tā nekad netika ievērota, jo opencode nav iekļauts `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Zars pats ieraksta kļūmes savienojuma atdzišanu un `backoffLevel`, atdarinot savienojuma tvēruma agentrouter zaru, un atgriež rezultātu — modeļa līmeņa bloķēšana un tālāk esošais vispārīgais ceļš nekad netiek sasniegti.
- **Iekļautas kombinācijas**: tāpat kā agentrouter zarā, tvērums apzināti ignorē `persistUnavailableState`/`isCombo` samazinājumu, ko kombinācijas izsaucējs piemēro 429 gadījumā. Modeļa līmeņa bloķēšana nav vājāka šī tvēruma forma — tā ir nepareizā vienība: tā neko nepasaka par izsmelto IP, tāpēc kombinācijas rotācija turpinātu katram blakus savienojumam iztērēt vienu garantēti neveiksmīgu izsaukumu.
- **Blakus savienojumu drošība**: blakus savienojums, kas jau atrodas terminālā stāvoklī (banned/credits_exhausted) vai jau ir ilgākā atdzišanas periodā, nekad netiek pārrakstīts.
- **Ekskluzīvs allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` paplašināšana ir skaidrs īpašnieka lēmums; vispārīga sasaistīšana netiek veikta (pattern #10334/#10419). Blakus savienojumu vaicājums piesaista šo pašu allowlist, nevis atkārto to kā SQL literāli, tāpēc tā paplašināšana joprojām ir vienas rindas izmaiņa.
- **Izejošā IP rotācija abos virzienos**: meklēšanas logs (24 stundas) ir daudz plašāks par izejošās IP kešatmiņas TTL (5 minūtes), tāpēc “pēdējā zināmā IP” ir vēsture, nevis pašreizējais stāvoklis. Ja savienojuma starpniekserveris loga laikā nomainīja IP, bloķēšana var **neatrast** patiešām koplietotu IP (ierakstītā IP ir jaunā, neizsmeltā IP) — un simetriski tā var **atdzesēt blakus savienojumu, kas kopš tā laika ir nomainījis IP** un vairs neizmanto izsmelto IP. Otrais gadījums šim blakus savienojumam maksā vienu atdzišanas logu; abi gadījumi ir pieņemami uz vēstures balstītas meklēšanas labākā mēģinājuma ierobežojumi.
- **Izmaksas**: divas ierobežotas `proxy_logs` skenēšanas (logs tiek filtrēts, izmantojot `idx_pl_timestamp`), tikai 429 biežumā. Jauns indekss netiek pievienots (migrācija 134 YAGNI). Mērīts reālas datplūsmas mērenas ietilpības DB kopijā; augstas caurlaidības instance tajā pašā logā glabā proporcionāli vairāk rindu.

## Citas elastīguma funkcijas

- **22 maršrutēšanas stratēģijas** (prioritāte, svērtais, apļveida, konteksta relejs, aizpildiet vispirms, p2c, nejaušs, vismazāk izmantots, izmaksu optimizēts, reset-aware, reset-window, expiry-first, reset-window, expiry-first, headroom, kvotas svērtais, stingri nejaušs, automātisks, lkgp, kontekstam optimizēts, kešatmiņas optimizēts, sapludināšana) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)
- **Reset-aware maršrutēšana** (v3.8.0) — piešķir prioritāti savienojumiem pēc kvotas atiestatīšanas laika.
- **Fona režīma pasliktināšanās** — atbildes API `background: true` ir degradētas, lai sinhronizētu ar brīdinājumu.
- **Dinamiskā instrumentu ierobežojumu noteikšana** — atkāpjas no pakalpojumu sniedzējiem, kad tiek sasniegti rīku skaita ierobežojumi.
- **Avārijas atkāpšanās** — kontrolē `OMNIROUTE_EMERGENCY_FALLBACK`; operatori var to ignorēt no funkciju karogu lapas bez restartēšanas.

---

## Atkļūdošana

- Svērtā kombinācija atbild ar `503 all_targets_cooling_down` (iestatīts `Retry-After`, `diagnostics.excluded` uzskaita katru mērķi ar `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → baseins ir konfigurēts un savienots, katrs mērķis vienkārši ir izslēgts ar noturības taimeri; brīdinājums `[COMBO] Weighted selection: every target excluded before dispatch — …` norāda iemeslus un atlikušās sekundes. `404 no_executable_targets` no tās pašas kombinācijas nozīmē, ka neviens noturības taimeris nav bijis iesaistīts (nav ko palaist vai arī neviena konta pieejamības pārbaude neizdevās). Iebūvēts `open-sse/services/combo/pinRecovery.ts`, pamatojoties uz izslēgšanām, kas savāktas `targetResolution.ts`.
- Visas sniedzēja atslēgas izlaistas → pārbaudiet gan ķēdes pārtraucēja stāvokli, GAN katra savienojuma `rateLimitedUntil`/`testStatus`.
- Sniedzējs pastāvīgi izslēgts pēc atiestatīšanas loga → kods nolasa neapstrādātu `state`, nevis izmanto `getStatus()`/`canExecute()`.
- Viena atslēga nedarbojas, pārējām vajadzētu darboties → dodiet priekšroku savienojuma dzesēšanai, nevis ķēdes pārtraucējam.
- Nedarbojas tikai viens modelis → dodiet priekšroku modeļa bloķēšanai, nevis savienojuma dzesēšanai.
- Stāvoklim vajadzētu atjaunoties pašam, bet tā nenotiek → pārbaudiet, vai nav laika zīmogs nākotnē, un lasīšanas ceļu, kas atsvaidzina beigušos stāvokli. Pastāvīgie statusi prasa manuālas izmaiņas.

---

## Izpildlaika stāvoklis — ātra atsauce aģentam

> Pārvietots bez izmaiņām no `AGENTS.md` → "Resilience Runtime State" (PR #12743), lai
> aģenta ceļvedis nepārsniegtu 40k konteksta budžetu. Tas ir iepriekšējo sadaļu saīsināts,
> aģentam vērsts skatījums; numurētās sadaļas paliek pilnā atsauce.

OmniRoute ir trīs savstarpēji saistīti, bet atšķirīgi pagaidu kļūmju mehānismi. Atkļūdojot
maršrutēšanas uzvedību, turiet to darbības jomas atsevišķi. Skatiet
[3 slāņu noturības diagrammu](../diagrams/exported/resilience-3layers.svg)
(avots: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)),
lai ātri gūtu pārskatu.

### Sniedzēja ķēdes pārtraucējs

**Darbības joma**: viss sniedzējs, piem., `glm`, `openai`, `anthropic`.

**Mērķis**: pārtraukt sūtīt trafiku uz sniedzēju, kas atkārtoti neizdodas
augšupgājuma/pakalpojuma līmenī, lai viens nedarbīgs sniedzējs nepalēninātu katru pieprasījumu.

**Implementācija**:

- Galvenā klase: `src/shared/utils/circuitBreaker.ts`
- Čata vārtejas/izpildes pieslēgums: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Izpildlaika statusa API: `src/app/api/monitoring/health/route.ts`
- Koplietotie apvalki: `open-sse/services/accountFallback.ts`
- Saglabātā stāvokļa tabula: `domain_circuit_breakers`

**Stāvokļi** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: parastais trafiks ir atļauts.
- `DEGRADED`: agrīnās brīdināšanas josla — kļūmes pārsniegušas degradācijas slieksni, bet vēl
  ne pārtraucēja slieksni; trafiks joprojām plūst, informācijas paneļi rāda brīdinājumu. Derīga
  savienojuma pārbaude vai klusais logs bez jaunām kļūmēm to atgriež uz `CLOSED`
  (logu skatiet `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: sniedzējs ir uz laiku bloķēts; izsaucēji saņem atbildi par atvērtu sniedzēja
  ķēdi vai kombinētā maršrutēšana pāriet uz citu mērķi.
- `HALF_OPEN`: atiestatīšanas noilgums ir pagājis; atļauts zondes pieprasījums. Veiksme aizver
  pārtraucēju, neveiksme to atkal atver.

**Noklusējumi** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, tiek izmantoti caur
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` failā `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` failā `src/sse/handlers/chatHelpers.ts`). Visa sniedzēja
pārtraucējs darbojas ar `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profils     | degradējas pie | atveras pie (`circuitBreakerThreshold`) | atiestate (`circuitBreakerReset`) |
| ----------- | -------------: | --------------------------------------: | --------------------------------: |
| OAuth       |            `5` |                                     `8` |                             `60s` |
| API atslēga |            `7` |                                    `12` |                             `30s` |
| Lokālais    |   (atvasināts) |                                     `2` |                             `15s` |

`PROVIDER_PROFILES` definē arī `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) un `providerCooldownMs` (5/10/1 min): tie darbina
**pieslēdzamās globālās sniedzēja dzesēšanas (Provider Cooldown) loga slieksni**
(`PROVIDER_COOLDOWN_ENABLED`, pēc noklusējuma izslēgts) — ieraksts sniedzēja līmenī
`open-sse/services/providerCooldownTracker.ts` tiek uzskatīts par dzesēšanu tikai pēc
`providerFailureThreshold` kļūmēm `providerFailureWindowMs` laikā, un pēc tam tas dzesē
`providerCooldownMs`. Tie NAV aktīvā pārtraucēja sliekšņi — neregulējiet tos, gaidot
pārtraucēja uzvedību. Katru noklusējumu var pārdefinēt ar
`OMNIROUTE_PROVIDER_BREAKER_*` un `OMNIROUTE_CIRCUIT_BREAKER_*` vides mainīgajiem;
izpildlaikā precīzā atsauces tabula atrodas `docs/architecture/RESILIENCE_GUIDE.md`.

Tikai sniedzēja līmeņa kļūmju statusiem vajadzētu aktivizēt sniedzēja pārtraucēju:

```ts
(408, 500, 502, 503, 504);
```

Neaktivizējiet visa sniedzēja pārtraucēju parastu konta/atslēgas/modeļa kļūmju dēļ, piemēram,
lielākajā daļā `401`, `403` vai `429` gadījumu. Tās parasti pieder savienojuma dzesēšanas
vai modeļa bloķēšanas jomai. Vispārīgam API atslēgas sniedzējam `403` vajadzētu būt
atjaunojamam, ja vien tas nav klasificēts kā termināla sniedzēja/konta kļūme.

Pārtraucējs izmanto slinko atjaunošanos, nevis fona taimeri. Kad `OPEN` termiņš beidzas, tādi nolasījumi kā `getStatus()`, `canExecute()` un `getRetryAfterMs()` atsvaidzina stāvokli uz `HALF_OPEN`, tāpēc informācijas paneļi un kombināciju kandidātu veidotāji neturpina uz mūžu izslēgt pakalpojumu sniedzēju, kura termiņš beidzies.

### Savienojuma dzesēšana

**Apjoms**: viens pakalpojumu sniedzēja savienojums/konts/atslēga.

**Mērķis**: īslaicīgi izlaist vienu problēmisku atslēgu/kontu, vienlaikus ļaujot citiem tā paša pakalpojumu sniedzēja savienojumiem turpināt apkalpot pieprasījumus.

**Implementācija**:

- Rakstīšanas/atjaunināšanas ceļš: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontu atlase/filtrēšana: `src/sse/services/auth.ts::getProviderCredentials...`
- Dzesēšanas aprēķins: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Iestatījumi: `src/lib/resilience/settings.ts`

Svarīgi lauki pakalpojumu sniedzēja savienojumiem:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Kontu atlases laikā savienojums tiek izlaists, kamēr:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Dzesēšana arī ir slinka: kad `rateLimitedUntil` ir pagātnē, savienojums atkal kļūst izmantojams. Pēc veiksmīgas izmantošanas `clearAccountError()` notīra `testStatus`, `rateLimitedUntil`, kļūdu laukus un `backoffLevel`.

Noklusējuma savienojuma dzesēšanas uzvedība:

- OAuth pamata dzesēšana: `5s`.
- API atslēgas pamata dzesēšana: `3s`.
- API atslēgas `429` gadījumā, ja pieejamas, priekšroka jādod augšupējā avota atkārtota mēģinājuma norādēm (`Retry-After`, atiestatīšanas galvenēm vai parsējamam atiestatīšanas tekstam).
- Atkārtotām atkopjamām kļūmēm tiek izmantota eksponenciāla atkāpšanās:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Aizsardzība pret thundering herd efektu neļauj vienlaicīgām kļūmēm vienā un tajā pašā savienojumā atkārtoti pagarināt dzesēšanu vai divkārši palielināt `backoffLevel`.

Terminālie stāvokļi nav dzesēšana. `banned`, `expired` (kas kļūst termināls tikai pēc N ierobežotiem atkārtotiem mēģinājumiem, izmantojot `EXPIRED_RETRY_MAX`) un `credits_exhausted` ir paredzēti palikt nepieejami, līdz mainās akreditācijas dati/iestatījumi vai operators tos atiestata. Nepārrakstiet terminālos stāvokļus ar pārejošu dzesēšanas stāvokli.

### Modeļa bloķēšana

**Apjoms**: pakalpojumu sniedzējs + savienojums + modelis.

**Mērķis**: izvairīties no visa savienojuma atspējošanas, ja konkrētajā savienojumā nav pieejams vai kvotas ierobežots tikai viens modelis.

Piemēri:

- Pakalpojumu sniedzēji ar kvotām pa modeļiem, kas atgriež `429`.
- Lokālie pakalpojumu sniedzēji, kas vienam trūkstošam modelim atgriež `404`.
- Pakalpojumu sniedzējam specifiskas režīma/modeļa atļauju kļūmes, piemēram, izvēlētie Grok režīmi.

Modeļa bloķēšanas loģika atrodas `open-sse/services/accountFallback.ts`, un tā ļauj tam pašam savienojumam turpināt apkalpot citus modeļus.

### Atkļūdošanas vadlīnijas

- Ja visas pakalpojumu sniedzēja atslēgas tiek izlaistas, pārbaudiet gan pakalpojumu sniedzēja pārtraucēja stāvokli, gan katra savienojuma `rateLimitedUntil`/`testStatus`.
- Ja pēc atiestatīšanas loga pakalpojumu sniedzējs šķiet pastāvīgi izslēgts, pārbaudiet, vai kods nolasa jēlo `state`, nevis izmanto `getStatus()`/`canExecute()`.
- Ja viena pakalpojumu sniedzēja atslēga nedarbojas, bet pārējām vajadzētu strādāt, izvēlieties savienojuma dzesēšanu, nevis pakalpojumu sniedzēja pārtraucēju.
- Ja nedarbojas tikai viens modelis, izvēlieties modeļa bloķēšanu, nevis savienojuma dzesēšanu.
- Ja stāvoklim vajadzētu pašatjaunoties, tam jābūt nākotnes laika zīmogam/atiestatīšanas noilgumam un lasīšanas ceļam, kas atsvaidzina beigušos stāvokli. Pastāvīgie statusi prasa manuālas akreditācijas datu vai konfigurācijas izmaiņas.

---

## TLS pirkstu nospiedumi un slēpšanās

Konkrētiem pakalpojumu sniedzējiem paredzētā slēpšanās (JA3/JA4, CCH, maskēšana) ir dokumentēta atsevišķi — skatiet `docs/security/STEALTH_GUIDE.md` (git; netiek kompilēts mapē `/docs`).

---

## Noturības testēšana (8. fāze · C bloks)

Papildus vienības testiem noturības loģikai trīs testi pārbauda izpildvidi reālos slodzes/kļūmju apstākļos (visi ir integrācijas/nakts testi — neviens nebloķē PR):

| Tests              | Kas                                                                                                                                                                                                      | Palaišana                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Haoss              | Viltus augšupstraumes mezgls ievada reālu aizturi/atiestatīšanu/noilgumu/503; pārbauda, ka ķēdes pārtraucējs atveras/atjaunojas un ka `checkFallbackError` klasificē 503 kā atkopjamu rezerves variantu. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Kaudzes pieaugums  | ~500 straumes katrā `createSSEStream` izsaukumā ar `--expose-gc`; neizdodas, ja kaudze pārsniedz griestus (OOM aizsargs #3069).                                                                          | `npm run test:heap`                     |
| k6 ilgstošā slodze | Ilgstoša slodze pret `/api/monitoring/health`; p95/kļūdu sliekšņi.                                                                                                                                       | `k6 run tests/load/k6-soak.js` (naktīs) |

To orķestrē `.github/workflows/nightly-resilience.yml` (cron + dispatch). Noklusējuma `test:integration` haosa un kaudzes testi izlaižas paši (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Skatīt arī

- [Arhitektūras ceļvedis](./ARCHITECTURE.md) — Sistēmas arhitektūra un iekšējā uzbūve
- [Lietotāja ceļvedis](../guides/USER_GUIDE.md) — Pakalpojumu sniedzēji, kombinācijas, CLI integrācija
- [Auto-Combo dzinējs](../routing/AUTO-COMBO.md) — 16 faktoru vērtēšana, režīmu paketes
