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

## 2. Savienojuma gaidīšanas periods

**Tvērums:** viena nodrošinātāja savienojums/konts/atslēga.

**Mērķis:** izlaist vienu nederīgu atslēgu, kamēr citi tā paša nodrošinātāja savienojumi turpina apkalpot pieprasījumus.

**Ieviešana:**

- Atzīmēšana kā nepieejamam: `src/sse/services/auth.ts::markAccountUnavailable()`
- Atlase: `getProviderCredentials*` tajā pašā failā
- Gaidīšanas perioda aprēķins: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Iestatījumi: `src/lib/resilience/settings.ts`

**Katra savienojuma lauki:**

- `rateLimitedUntil` — laika zīmogs, līdz kuram beidzas gaidīšanas periods
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponenciālās atkāpšanās skaitītājs

**Noklusējuma gaidīšanas periodi:**

- OAuth bāze: 5 s
- API atslēgas bāze: 3 s
- API atslēgas 429: priekšroka tiek dota augšupējām `Retry-After`/atiestatīšanas galvenēm/parsējamam atiestatīšanas tekstam
- Atkāpšanās: `baseCooldownMs * 2 ** failureIndex`

**Atkārtota mēģinājuma aizkave katram nodrošinātājam.** Nodrošinātāja detalizētajā lapā ir **Retry delay** atlase (Auto, no 15 s līdz 1 h). Tā saglabā `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600), izmantojot `PATCH /api/resilience`. Ja ātruma ierobežojuma kļūda nesatur augšupēju atkārtota mēģinājuma norādi, šī vērtība aizstāj mērogoto atkāpšanos konkrētajam nodrošinātājam un atiestata `backoffLevel` uz 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Prioritāte ātruma ierobežojuma kļūdai, sākot ar augstāko: augšupēja atkārtota mēģinājuma norāde, pēc tam katram savienojumam specifiska `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, pēc tam atkārtota mēģinājuma aizkave konkrētajam nodrošinātājam, pēc tam `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` vide, visbeidzot mērogotā atkāpšanās. Auto noņem šo lauku. Tas ietekmē tikai ātruma ierobežojuma iemeslu, nevis terminālos stāvokļus.

**Aizsardzība pret vienlaicīgu pieprasījumu uzplūdu:** novērš to, ka vienlaicīgas kļūmes pārmērīgi pagarina gaidīšanas periodu vai divkārši palielina `backoffLevel`.

**429 kļūmes, ko izraisa vienlaicības ierobežojums, nepalielina atkāpšanās līmeni.** `429`, kura pamattekstā norādīts vienlaicības ierobežojums ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`), nozīmē, ka konts ir darbspējīgs, bet aizņemts. `checkFallbackError()` atgriež iemeslu `concurrency_limited`: nekavējoties pārslēdzas uz nākamo savienojumu, šo savienojumu atdzesē uz fiksētu `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) vai uz augšupējā atkārtota mēģinājuma norādes laiku, saglabā `backoffLevel` nemainīgu un iestata `skipProviderBreaker`. Skaidri norādīts kvotas pamatteksts joprojām ir prioritārs, tāpēc pamatteksts, kas atbilst arī kvotas paraugam, paliek kvotas spriedums. Noteikšana: `looksLikeConcurrencyLimit()` failā `src/shared/utils/classify429.ts`; spriedums: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (pārtraucēja `FailureKind`) netiek mainīts un šādiem pamattekstiem joprojām nolasa `rate_limit`.

**Straumes satura dīkstāve kontu neatdzesē.** Kad satura dīkstāves uzraugs (`open-sse/utils/streamHandler.ts`) pārtrauc straumi, kas noteiktajā laikā nav nosūtījusi modeļa izvadi, `markAccountUnavailable()` reģistrē kļūdu savienojumam, bet neiestata gaidīšanas periodu: dīkstāve pieder šim pieprasījumam un visbiežāk rodas ilgstošas spriešanas laikā, kad izvade vēl nav parādījusies. Operatori var to ieslēgt ar `resilienceSettings.streamStallCooldown.enabled` (noklusējums `false`).

**Pēc izvēles ieslēdzams latentuma signāls `p2c` kontu atlasei.** Katrs nosūtītais mēģinājums katram savienojumam (un katram savienojuma un modeļa pārim) atmiņā slīdošā logā reģistrē laiku līdz pirmajam baitam un rezultātu: pēdējos 20 paraugus 15 minūšu laikā (`open-sse/services/connectionLatencyTracker.ts`, reģistrēts no `safeLogEvents()` failā `src/sse/handlers/chatHelpers.ts`). Ja `resilienceSettings.p2cLatency.weight` ir lielāks par `0` (diapazons 0–20, noklusējums `0` = izslēgts), `compareP2CConnections()` failā `src/sse/services/auth.ts` katram pāra kandidātam pievieno līdz `weight` punktiem. Pusi no tiem veido latentums kā attiecība pret ātrāko kandidātu (divreiz lēnāks kandidāts saņem visu šo pusi), bet otru pusi — slīdošais kļūdu līmenis. Šis komponents tiek piemērots tikai tad, ja abiem kandidātiem ir vismaz 3 paraugi, tāpēc jaunie konti netiek sodīti, un tā maksimālā vērtība paliek zem kvotas bloķēšanas un kvotas izsmelšanas sodiem. Tas pats par sevi neveido ķēdes pārtraucēju: kontus ar kļūmēm joprojām apstrādā gaidīšanas perioda, bloķēšanas un pārtraucēja slāņi. Iestatiet to ar `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Spriešanas kadri restartē satura dīkstāves budžetu.** Spriešanas modelis var domāt vairākas minūtes pirms pirmā redzamā marķiera: Claude straumē `thinking_delta` kadrus, kuru spriešanas teksts var būt tukšs, bet Responses API straumē vienu spriešanas vienumu pēc otra. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) atpazīst šos kadrus, un uzraugs restartē savu budžetu pēc katra no tiem, nevis atceļ izpildi. Tie joprojām nav modeļa izvade, tāpēc izpilde, kas beidzas tikai ar spriešanu, joprojām tiek ziņota kā tukša, bet izpilde, kurā spriešana apstājas un tiek sūtīti tikai sirdspuksti, joprojām aktivizē uzraugu.

Kiro binārie `reasoningContentEvent` kadri ar netukšu parakstu saglabā šo spriešanas aktivitāti izpildītājā kā tukšu `reasoning_content` delta. Paraksts netiek pārsūtīts. Metadati, nepabeigti kadri un tukši paraksti nerestartē satura budžetu; neatkarīgais aktīvās straumes taimauts un klienta atcelšana joprojām ir spēkā (`open-sse/executors/kiro/reasoning.ts`).

**Terminālie stāvokļi (NAV gaidīšanas periodi):**

- `banned` — iestata aizliegtu atslēgvārdu / konta aizlieguma noteikšana (skatiet [BAN_DETECTION](../security/BAN_DETECTION.md)). Augšupējs atteikums katram pieprasījumam (`request_rejected`, piemēram, Anthropic OAuth 403 "Request not allowed") to nekad neiestata: šādi atteikumi tiek uzskaitīti katram savienojumam un modelim un izņem šo modeli no rotācijas, izmantojot pieaugošu gaidīšanas periodu, kas ierobežots ar `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), vai atdzesē savienojumu, ja modelis nav zināms — `open-sse/services/requestRejectedStreak.ts`
- `expired` (pēc ierobežota atkārtotu mēģinājumu skaita pāriet terminālā stāvoklī — `EXPIRED_RETRY_MAX = 3` ar eksponenciālu atkāpšanos — lai īslaicīgas OAuth kļūdas varētu pašas novērsties, pirms konts tiek neatgriezeniski deaktivizēts)
- `credits_exhausted`

Tie saglabājas, līdz tiek mainīti akreditācijas dati vai operators tos atiestata. Nepārrakstiet termināļa stāvokļus ar īslaicīga atdzišanas perioda stāvokli.

**Lēna atkopšana:** kad `rateLimitedUntil` laiks ir pagājis, savienojums atkal kļūst pieejams. Pēc veiksmīgas izmantošanas `clearAccountError()` notīra visus kļūdu laukus.

### Claude OAuth lietojuma ierobežojums: zemākas prioritātes kanāls + sesijas ierobežojuma atiestatīšana

**Tvērums:** viens Claude abonementa (OAuth) savienojums. Abas funkcijas ir **pēc izvēles iespējojamas katram savienojumam** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` sadaļā `providerSpecificData`; abas pēc noklusējuma ir izslēgtas) un atspoguļo Claude Code komandas `/low-priority` un `/limit-reset` (protokola līgums iegūts no Claude Code 2.1.263).

**Implementācija:**

- Stāvokļu mašīna un atbilžu klasifikācija: `open-sse/services/claudeLowPriority.ts`
- Atiestatīšanas statusa/pieprasījuma klients: `open-sse/services/claudeLimitReset.ts`
- Izpildītāja āķis (galvenes ievietošana + atkārtots mēģinājums ar to pašu kontu): `open-sse/executors/base.ts::execute()`
- Iespējas saglabāšana: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Aktivizētājs:** 5 stundu lietojuma ierobežojums — `429`, kura galvenēs ir
`anthropic-ratelimit-unified-status: rejected` un, ja konts ir piemērots,
`anthropic-ratelimit-unified-slow-offer: treatment`. Pirms pirmā ierobežojuma `429` nekas netiek nosūtīts; sērijveida `429` bez vienotajām galvenēm tiek apstrādāts parastajā atdzišanas perioda ceļā.

**Zemākas prioritātes kanāls** (`lowPriorityMode`):

- Pēc ierobežojuma `429` izpildītājs pieņem piedāvājumu un nekavējoties atkārto pieprasījumu ar **to pašu** kontu, izmantojot `anthropic-usage-limit: slow`; kanāls paliek aktīvs līdz paziņotajam `anthropic-ratelimit-unified-reset` laikam (+60 sekunžu pielaide), un katram pieprasījumam šajā periodā tiek pievienota galvene. Pārtvertais `429` nekad nesasniedz `handleChatCore`, tāpēc savienojums **netiek** ievietots atdzišanas periodā un netiek nomainīts.
- `anthropic-ratelimit-unified-slow-status` turpmākajās atbildēs: `active` / `not_needed` saglabā kanālu; `slot_busy` (`429`) vai `529` gaida servera norādīto `anthropic-ratelimit-unified-slow-retry-after` (pēc noklusējuma 20 s, ierobežojums 5–600 s, ±30% nejauša variācija) un atkārto pieprasījumu, ievērojot `anthropic-ratelimit-unified-slow-max-wait` (pēc noklusējuma 20 min, ierobežojums 1 min–6 h) — pēc šī laika kanāls tiek izbeigts, un 10 minūšu atdzišanas periods bloķē atkārtotu pieņemšanu. Gaidīšanas laiku papildus ierobežo tas, kas atlicis no paša pieprasījuma augšupējās darbības sākšanas taimauta (`resolveFetchStartTimeout`, pēc noklusējuma 10 min) mīnus 5 sekunžu rezerve: bez šī ierobežojuma noklusējuma 20 minūšu maksimālais gaidīšanas laiks pārsniegtu pieprasījuma darbības laiku, un gaidīšana tiktu pārtraukta tās vidū, parādot `TimeoutError`, nevis nodrošinot korektu `max_wait` beigas un atdzišanas periodu.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 stundu loga pāreja uz nākamo periodu vai `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (kas to izbeidz kā `extra_usage` pie jebkura statusa, jo maksas pārtēriņš tagad sedz šo ierobežojumu) izbeidz kanālu; pēc tam atbilde tiek nodota parastajam atdzišanas perioda ceļam. `budget_exhausted` tiek saglabāts līdz paziņotajai budžeta atiestatīšanai (ne vairāk kā 8 dienas).
- Ierobežojuma pārbaude tiek veikta pēc izpildītāja paša 400 izraisītajiem atkārtotajiem mēģinājumiem viena mēģinājuma ietvaros (konteksta rediģēšana, domāšanas/centības ierobežojumi, parametru automātiskā apguve), tāpēc ierobežojuma `429`, kas parādās tikai kādā no šiem atkārtotajiem mēģinājumiem, joprojām tiek pārtverts, nevis nonāk atdzišanas perioda ceļā.
- Stāvoklis tiek glabāts atmiņā katram savienojumam (pēc restartēšanas nepieciešams vēl viens ierobežojuma `429`, lai atkārtoti pieņemtu piedāvājumu).

**Sesijas ierobežojuma atiestatīšana** (`autoLimitReset`, ja abas funkcijas ir ieslēgtas, tiek izmēģināta pirms kanāla):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` bloks; ja `arm: "reset"` un `available: true`, tiek izpildīts
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ar
  `{ "program": "juniper_tide" }` (organizācijas UUID no `providerSpecificData.organizationUUID`, ar sākotnējās ielādes rezerves vērtību).
- `result: reset|not_limited` → pieprasījums tiek atkārtots ar pilnu ātrumu (bez lēnās darbības galvenes).
  `already_used` / `not_offered` saglabā `next_available_at` (pēc noklusējuma viena nedēļa); pēc jebkuras kļūmes tiek piemērota 15 minūšu pauze. Atiestatīšana notiek reizi nedēļā un joprojām tiek ieskaitīta nedēļas ierobežojumā.

Regresijas aizsargi: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sesijas piesaiste (#7274)

**Tvērums:** viena klienta sesija (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` galvene) tiek piesaistīta vienam savienojumam jebkuram pakalpojumu sniedzējam.

**Mērķis:** saglabāt vairāku mijiedarbību aģentu (Claude Code, aider, pielāgoti aģenti) vienā kontā starp pieprasījumiem, samazinot konteksta zudumu kontu maiņas dēļ un atkārtotus aukstās palaišanas `429` stāvokļus pakalpojumu sniedzējiem ar katram kontam specifisku sesijas stāvokli.

**Implementācija:**

- TTL noteikšana: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Piesaistes izvēle/izveide: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Galvenes izvilkšana (vispārīga, jebkuram pakalpojumu sniedzējam): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persistenta piesaistes tabula: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Iestatījums: `sessionAffinityTtlMs` (globālais TTL milisekundēs, `0` atspējo) — `src/lib/db/settings.ts`. Pārdēvēts no tikai Codex paredzētā `codexSessionAffinityTtlMs`, izmantojot migrāciju `124_generic_session_affinity_ttl.sql`, kas jebkuru iepriekš konfigurētu Codex TTL pārnes kā jauno noklusējuma vērtību.

Pirms #7274 `resolveSessionAffinityTtlMs()` katram pakalpojumu sniedzējam, izņemot `codex`, nekavējoties atgrieza `0`, tāpēc TTL iestatījumam (un sesijas galvenēm) nekur citur nebija ietekmes, lai gan piesaistes mehānisms un galveņu izvilkšana jau bija neatkarīga no pakalpojumu sniedzēja. Labojums noņēma šo agrīno atgriešanos; TTL tagad tiek vienādi piemērots visiem pakalpojumu sniedzējiem, tiklīdz tas globāli iestatīts uz vērtību, kas lielāka par `0`.

Trīs sesijas piesaistes galvenes nekad netiek pārsūtītas augšupējā sistēmā — izpildītāji paši no jauna izveido augšupējās galvenes, nevis pārsūta klienta galvenes, tāpēc šis paliek tikai iekšējs korelācijas identifikators.

### Ekskluzīvas pārvaldītu sesiju savienojumu nomas tiesības

**Tvērums:** viena aktīva pārvaldīta HTTP klienta/sesijas instance ir piesaistīta vienam piemērotam OmniRoute savienojumam.

**Mērķis:** nodrošināt noturīgu ekskluzīvu savienojuma īpašumtiesību klientiem, kuriem pieprasījumu ietvaros nepieciešama stingra maršrutēšanas robeža. Tas atšķiras no sesijas piesaistes, kas ir maiga nepārtrauktības preference: ekskluzīva noma saglabā dzīves cikla stāvokli SQLite, nodrošina globālu aktīvā īpašnieka un aktīvā savienojuma unikalitāti un noraida novecojušu paaudzi pirms nosūtīšanas pakalpojumu sniedzējam.

Šī funkcija ir izvēles iespēja katrai API atslēgai. Pārvaldītai atslēgai ir jābūt tvērumam `lease:exclusive` un skaidri norādītam sarakstam `allowedConnections`, kas nav tukšs. Dzīves cikla galapunktu var izmantot jebkurš HTTP klients; klienta nosaukums, lietotāja aģents, pakalpojumu sniedzējs, OAuth metode vai modelis nav nepieciešams. Noma pārvalda savienojumu, nevis modeli, tāpēc modeļa maiņa saglabā piesaisti, kamēr savienojums joprojām ir parasti piemērots. Parastie modeļa, kvotas, veselības stāvokļa, gaidīšanas perioda un atļauto sarakstu noteikumi joprojām ir noteicošie un var pārvietot to pašu paaudzi uz citu brīvu piemērotu savienojumu.

Dzīves ciklu veido `POST /api/v1/session-leases` ar JSON darbībām `acquire`, `renew` un `release`. Pārvaldītiem inferenču pieprasījumiem tiek nosūtīta necaurspīdīgā `X-OmniRoute-Lease-Owner` vērtība un precīza `X-OmniRoute-Lease-Generation` vērtība. Īpašnieks sākas ar `vlo_`, kam seko 43 base64url rakstzīmes; tiek saglabāta tikai tā SHA-256 jaucējvērtība. Katra galīgā nosūtīšanas pārbaude papildus piesaista autentificētās API atslēgas ID un aktīvā savienojuma ID. Nomas vadības galvenes tiek izņemtas no žurnāliem, saglabātajiem pieprasījumu momentuzņēmumiem un augšupējā izpildītāja galvenēm.

Ja parastajā maršrutēšanā ir piemēroti pārvaldīti kandidāti, bet katru brīvo kandidātu aizņem ārēja aktīva noma, OmniRoute atgriež HTTP `429`, nomas kapacitātes nepieejamības kodu, stāvokli `waiting-for-capacity` un ierobežotu `Retry-After`, kas aprēķināts, pamatojoties uz agrāko attiecināmo derīguma termiņu. Parasta piemērotu kandidātu neesamība nav nomu izraisīta konkurence, un tai tiek saglabāta esošā maršrutēšanas kļūdu semantika.

Saistītie mehānismi paliek nošķirti:

- OAuth sesiju noslodze ir procesam lokāla, maiga OAuth kontu sadale.
- Kontu semafori piešķir pieprasījumu paralēlās izpildes atļaujas un beidzas, kad pieprasījums ir pabeigts.
- Ekskluzīvas pārvaldītu sesiju nomas ir noturīgas dzīves cikla īpašumtiesības ar paaudzes pārbaudi.

## 3. Modeļa bloķēšana

**Tvērums:** pakalpojumu sniedzēja + savienojuma + modeļa trīne.

**Atslēgas tvērums atkarībā no statusa:** neveiksmes statuss nosaka, kurai atslēgai tiek veidots bloķēšanas ieraksts (`resolveLockoutScope()` failā `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvotas vai tiesību signāls — bloķē **kvotas saimi**:
  codex gadījumā viss `codex` / `spark` tvērums (katrs savienojuma
  `gpt-5*` modelis), citiem pakalpojumu sniedzējiem `getQuotaScopedModelForProvider()`.
- `404` bloķē pašu modeli (`getModelLockKey()` sašaurina `not_found`).
- Jebkurš cits statuss — `5xx` transporta/servera kļūmes un paša OmniRoute
  sintezētais `502` no kvalitātes validācijas — bloķē tikai **precīzu**
  pakalpojumu sniedzēja/savienojuma/modeļa kopu. Slikta plūsma vienā modelī nav
  pierādījums par konta kvotu; pirms šī noteikuma viena tukša atbilde no
  `codex/gpt-5.6-luna` izņēma visus šī savienojuma `gpt-5*` modeļus no
  maršrutēšanas uz 2–30 min (eskalējoties), lai gan tā kvota palika neskarta.
- Izsaucēja skaidri norādītā `scope` opcija vienmēr ir noteicošā (Antigravity nodod `"exact"`).

**Mērķis:** izvairīties no visa savienojuma atspējošanas, ja tikai viens modelis nav pieejams vai ir ierobežots kvotas ziņā.

**Piemēri:**

- Pakalpojumu sniedzēji ar kvotām katram modelim, kas atgriež 429
- Lokālie pakalpojumu sniedzēji, kas atgriež 404 vienam trūkstošam modelim
- Pakalpojumu sniedzējam raksturīgas režīma/modeļa atļauju kļūmes (piemēram, Grok režīmi)

**Implementācija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Modeļu atdzesēšanas informācijas panelis (v3.8.0)

UI: Iestatījumi → Modeļu atdzesēšana (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Uzskaita aktīvās bloķēšanas ar: provider, connection, model, reason, expiresAt. Operatori var manuāli atkārtoti iespējot modeli no kartes.

**REST API:**

- `GET /api/resilience/model-cooldowns` — uzskaita aktīvās bloķēšanas
- `DELETE /api/resilience/model-cooldowns` — manuāla atkārtota iespējošana. Ķermenis: `{provider, connection, model}`. Autentifikācija: management.

### Atdzesēšanas pārvaldnieks

UI: Uzraudzība → Atdzesēšanas pārvaldnieks (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Viena lapa katram savienojumam, kas pārejoša iemesla dēļ ir izņemts no maršrutēšanas,
tā vietā, lai atvērtu katru pakalpojumu sniedzēja lapu. Tā uzskaita savienojumu
atdzesēšanas, modeļu bloķēšanas un galīgos stāvokļus, notīra tos pa savienojumiem,
atlasītai grupai vai visiem pakalpojumu sniedzēja savienojumiem un rediģē
visbiežāk regulējamos atdzesēšanas noteikumus: `streamStallCooldown.enabled` un OAuth / API atslēgas
`connectionCooldown` pamata atdzesēšanu un maksimālos atkāpšanās soļus (saglabāti, izmantojot
`PATCH /api/resilience`). Galīgie stāvokļi (`banned`, `expired`, `credits_exhausted`) tiek
uzskaitīti, bet šeit nekad netiek notīrīti.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikācija: management):

- `GET /api/resilience/cooldowns[?provider=]` — savienojumi ar statusu, atlikušo atdzesēšanu,
  atkāpšanās līmeni, pēdējās kļūdas veidu un modeļu bloķēšanām (bez akreditācijas datiem)
- `POST /api/resilience/cooldowns` — ķermenis `{connectionIds: string[]}` vai
  `{all: true, provider?}`; atgriež `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Bloķēšanas iestatījumu UI + atkopšanās ar veiksmes samazināšanu (v3.8.23)

Modeļa bloķēšana pārgāja no vienmēr ieslēgtas, cieti iekodētas uzvedības uz pilnībā konfigurējamu,
pēc izvēles ieslēdzamu funkciju ar savu iestatījumu karti un pašatjaunojošu atkopšanās ceļu.

**Iestatījumu karte:** Iestatījumi → Modeļa bloķēšana
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tā **atšķiras** no iepriekš minētās tikai lasāmās `ModelCooldownsCard` (kas tikai
_uzskaita_ aktīvās bloķēšanas) — jaunā karte _konfigurē parametrus_. Noklusējumi
atrodas `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Iestatījums             | Noklusējums                      | Nozīme                                                                |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `enabled`               | `false`                          | Galvenais slēdzis — modeļa bloķēšana **pēc noklusējuma ir izslēgta**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream statusi, kas tiek uzskatīti par modeļa tvēruma neveiksmi.    |
| `baseCooldownMs`        | `120_000` (120 s)                | Sākotnējais bloķēšanas ilgums pirmajai neveiksmei.                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Eskalētās atdzesēšanas griesti.                                       |
| `maxBackoffSteps`       | `10`                             | Maksimālie eksponenciālās atkāpšanās eskalācijas soļi.                |
| `useExponentialBackoff` | `true`                           | Vai atkārtotas neveiksmes eskalē atdzesēšanu eksponenciāli.           |

Iestatījumi tiek saglabāti, izmantojot parasto iestatījumu krātuvi, un validēti
atbilstoši noturības iestatījumu shēmai; karte ierobežo `baseCooldownMs`/`maxCooldownMs`
(ar `maxCooldownMs ≥ baseCooldownMs`) un `maxBackoffSteps`.

**Atkopšanās ar veiksmes samazināšanu:** atkopšanās **nav** tikai taimera termiņa
beigas. Korekta atbilde samazina modeļa neveiksmju skaitītāju, tāpēc modelis,
kas atguvisies loga vidū, pārtrauc eskalēties (un tiek notīrīts) pirms tā taimeris
beigtos. Veiksmīga combo mērķa gadījumā `open-sse/services/combo.ts` izsauc
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), kas
**samazina uz pusi** saglabāto `failureCount` (`Math.floor(failureCount / 2)`);
kad tas sasniedz `0`, bloķēšanas ieraksts tiek pilnībā izdzēsts. Pretstats
`recordModelLockoutFailure()` palielina skaitītāju (un eskalē atdzesēšanu)
neveiksmēm eskalācijas logā. Šī veiksmes samazināšana darbojas papildus
parastajām taimera termiņa beigām — jebkurš no ceļiem var atkārtoti iespējot modeli.

**Stāvoklis:** bloķēšanas tiek turētas **operatīvajā atmiņā** (katra procesa `Map`
struktūrās ar `ModelLockoutEntry` ierakstiem, kuru atslēgas ir `provider:connectionId:model`,
bet precīza tvēruma slēdzenēm — `provider:connectionId:exact:model`), netiek
saglabātas datubāzē — pārstartējot tās pazūd. _Iestatījumi_ tiek saglabāti; aktīvais
bloķēšanas _stāvoklis_ ir īslaicīgs.

---

## 4. Kvotas koplietojoša vienlaicīguma kontrole (v3.8.36)

Abonementa konti (GLM, MiniMax u. c.) bieži pieņem tikai ~1–3 vienlaicīgus
pieprasījumus; pārsniedzot šo skaitu, tiek aktivizētas 429 kļūdas un
atdzišanas periodi. Tas īpaši izteikti notiek ar **kvotas koplietošanas**
(`qtSd/…`) kombinācijām, kur vairāki API atslēgu pāri izmanto vienu augšupējo
kontu. Trīs slāņi neļauj koplietotajam kontam tikt pārslogotam.

### Viena savienojuma vienlaicīguma ierobežojums (`max_concurrent`)

Katrs nodrošinātāja savienojums var deklarēt `max_concurrent` augšējo robežu
(`provider_connections.max_concurrent`, kas iestatīta savienojuma modālajā logā / API / DB).
Atstājiet lauku tukšu, lai neiestatītu ierobežojumu. Šis ir vienīgais parametrs,
kas vada tālāk aprakstīto serializācijas slāni — iestatiet to atbilstoši konta
faktiskajam vienlaicīguma līmenim (piem., GLM ~1, MiniMax ~2).

### Viena modeļa vienlaicīguma ierobežojumi (`modelConcurrency`)

Savienojums var papildus deklarēt precīzas viena modeļa vienlaicīguma augšējās
robežas savā `rateLimitOverrides` kartē:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Iestatiet to savienojuma modālajā logā (**Rate limit overrides → Per-model
concurrency caps**, vienu `model=cap` katrā rindā) vai, izmantojot
`PATCH /api/providers/[id]`, ar tādu pašu JSON struktūru. Galvenie darbības principi:

- **Savienojuma mēroga un modeļa specifiskais ierobežojums:** `maxConcurrent` joprojām
  ir kopīgā savienojuma mēroga augšējā robeža. Ja tiek piemēroti abi, abi vārti
  tiek iegūti atomiski vienā kombinētajā vārtā
  (`global → provider → account → model`); faktiskā darbība atbilst stingrākajam
  piemērojamajam ierobežojumam.
- **Precīza modeļa atslēgas atbilstība:** atslēga ir modeļa virkne, kas pēc
  maršrutēšanas atrisināšanas tiek nodota izpildītājam — parasti neapstrādātais
  augšupējā modeļa identifikators (`glm-5`), nevis klienta puses
  `provider/model` aizstājvārds (`zai/glm-5` neatbilst `glm-5`). Vērtībām jābūt
  pozitīvām veselām skaitliskām vienlaicīgo pieprasījumu augšējām robežām.
- **Lokāla ievietošana rindā, bez atklāšanas:** pārsniegtie pieprasījumi tiek
  ievietoti lokālajā rindā, izmantojot esošo rindas/noklusējuma laika semantiku
  (tipizētas `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` pieņemšanas kļūdas).
  OmniRoute neatklāj un neizsecina augšupējā pakalpojuma politiku — tas piemēro
  tieši operatora konfigurētās augšējās robežas. Piesātināts modeļa vārts nekad
  neatspējo nodrošinātāju un nerada pastāvīgu modeļa bloķēšanu; augšupējās
  429 kļūdas/atdzišanas periodi/rezerves izvēles darbība joprojām ir kļūdu
  rezerves mehānisms.
- **Viena savienojuma, viena procesa tvērums:** ierobežojumi attiecas uz katru
  datubāzes savienojumu un tiek glabāti atmiņā, tāpēc divi savienojumi, kas
  atkārtoti izmanto vienu un to pašu augšupējā pakalpojuma API atslēgu,
  savā starpā nesaskaņo darbību.
- **Nekonfigurēts nozīmē nemainītu darbību:** kartes izlaišana (vai paneļa lauka
  atstāšana tukša) nepievieno modeļa vārtus. Konfigurācijas piemērs, kurā netiek
  deklarēts universāls nodrošinātāja ierobežojums:

```text
glm-5=1
glm-4.7=3
```

### Kvotas koplietošanas pieprasījumu serializācija

Ja kvotas koplietošanas nosūtīšana ir vērsta uz savienojumu, kuram deklarēts
pozitīvs `max_concurrent`, vienlaicīgie pieprasījumi uz šo **kontu** tiek
serializēti, izmantojot katram savienojumam paredzētu semaforu (atslēga
`qsconn:<connectionId>`): pārsniegtie pieprasījumi **gaida rindā**, nevis pārpludina
kontu. Tas ir **atteikumnoturīgs** — piesātināta rinda vai noildze turpina
darbību bez vietas, nevis jebkad noraida nosūtāmu pieprasījumu. Ieslēdziet to
sadaļā **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, pēc
noklusējuma ieslēgts). Ja `max_concurrent` ierobežojums nav iestatīts, darbība
nemainās.

> Kvotas koplietošanas maršrutēšanas vārti (`selectQuotaShareTarget`, DRR + P2C)
> paši ir atteikumnoturīgi un tikai _samazina prioritāti_ savienojumam, kas
> sasniedzis ierobežojumu — ja kopā ir tikai viens savienojums, tie nevar
> piemērot stingru ierobežojumu, tāpēc tieši šis semafors faktiski ierobežo
> pārpludināšanu.

### Kombinācijas atdzišanas periodam pielāgota atkārtota mēģināšana

Katrai kombinācijas stratēģijai (ja tā ir ieslēgta), ja pieprasījums izraisītu
429 kļūdu ar ĪSU pārejošu atdzišanas periodu, tas nogaida šo periodu un tiek
nosūtīts atkārtoti, nevis atgriež 429 kļūdu — tas attiecas arī uz Gemini klases
TPM/RPM logiem (~60 s `retry-after`) vairāku modeļu kombinācijās, piemēram, kad
abi 2 modeļu kombinācijas mērķi sasniedz katram modelim noteiktu ātruma
ierobežojumu. To ierobežo `comboCooldownWait` (`enabled`, `maxWaitMs`,
`maxAttempts`, `budgetMs`) sadaļā **Settings → Resilience**. Tas nekad negaida
`quota_exhausted` gadījumā (bloķēts līdz pusnaktij) vai autentifikācijas/“nav
atrasts” iemeslu dēļ.

Kombinācija var atteikties no šīs darbības, izmantojot
`config.comboCooldownWaitEnabled: false`. Tikai burtiskā vērtība `false`
atspējo šos kopīgās kombinācijas gaidīšanas gadījumus (pēc nosūtīšanas
notiekošu atdzišanu un pirms nosūtīšanas notiekošu ķēdes pārtraucēja atvērtas
ķēdes/modeļa bloķēšanas gaidīšanu), kā arī to gaidīšanas budžeta noildzes
grīdas pagarinājumu. Ja vērtība nav norādīta vai ir `true`, globālā politika
tiek saglabāta; `true` nevar ieslēgt globāli atspējotu gaidīšanu. Skaidri
iestatīts `targetTimeoutMs` joprojām ir prioritārs. Šī atteikšanās nemaina
atsevišķo native-Codex gājiena piesaistes pirmsnosūtīšanas gaidīšanu.

Tas pats vārts aptver arī pirmsnosūtīšanas gadījumu (#16319): ja katrs
kombinācijas mērķis tiek izlaists, pirms tiek veikts jebkāds mēģinājums, jo tā
modelis atrodas īsā pārejošā bloķēšanas periodā, nulles mēģinājumu ceļš nogaida
bloķēšanas perioda beigas saskaņā ar tiem pašiem ierobežojumiem un nosūta
pieprasījumu atkārtoti, nevis atgriež norādi nesaturošu
`503 ALL_TARGETS_SKIPPED`. Ja gaidīšana nav atļauta (sasniegti griesti,
izsmelts mēģinājumu vai budžeta limits vai funkcija ir izslēgta), terminālā
atbilde tiek paaugstināta uz `429 rate_limit_error`, ietverot
`retry_after` / `reset_at` no agrākās pārejošās bloķēšanas beigām; kvotas,
autentifikācijas un “nav atrasts” bloķējumi saglabā norādi nesaturošu 503.

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

## 7. Augšupstraumes statusa pārformulēšana (nepareizi norādītas kvotas kļūdas)

**Tvērums:** viena augšupstraumes vārteja, kas par īslaicīgu kvotas izsmelšanu ziņo ar nepareizu HTTP statusu.

**Mērķis:** izlabot maldinošu statusu PIRMS klasifikācijas, lai lejupstraumes patērētāji (rezerves mehānisms, kombinētā apkopošana, klientam paredzētā atbilde) redzētu kļūmes patieso, atkārtoti mēģināmo raksturu.

Dažas vārtejas par ĪSLAICĪGU kvotas izsmelšanu signalizē ar HTTP statusu,
kas neparedz atkārtotu mēģinājumu. `agentrouter.org` atgriež `403` (dažreiz `400`) ar tekstu ķīniešu valodā
(`用户额度不足` / `额度不足`), nevis standarta `429`. Tādi klienti kā Claude
Code uzskata `403` par pastāvīgu kļūdu un pārtrauc sesiju, un bez korekcijas
rezerves mehānisms to klasificētu kā `AUTH_ERROR`, nevis kā kvotas
notikumu.

**Implementācija:**

- Reģistrs un atbilstības meklētājs: `open-sse/config/upstreamStatusRestatement.ts` — katram
  nodrošinātājam definēts noteikumu saraksts (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), kura atbilstību nosaka ar `applyStatusRestatement()`.
- Izsaukuma vieta: `providerFailure:` bloks failā `open-sse/handlers/chatCore.ts`
  (aptuveni 3654. rindā), uzreiz pēc tam, kad `parseUpstreamError()` parsē augšupstraumes
  atbildi ar kļūdas HTTP statusu (`!providerResponse.ok`), un pirms jebkādas
  klasifikācijas izpildes, lai katrs lejupstraumes patērētājs redzētu koriģēto
  statusu. Kļūdas, kas iegultas `200` SSE straumē, tiek apstrādātas pa atsevišķu,
  vēlāku straumes parsēšanas ceļu, un šis pārtveršanas punkts tās pašlaik **neaptver** — tas ir
  zināms ierobežojums, kas agentrouter nepareizajam statusam vēl nav būtisks (jo tas
  tiek atgriezts kā kļūdas HTTP statuss).
- Atkārtota mēģinājuma pieļaujamība: `429` ir iekļauts `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), tādēļ pārformulētajai kļūdai
  tiek piešķirts reāls atkārtota mēģinājuma laika logs, nevis tā tiek parādīta kā neatkopjams `403`.
- Sintētiskais `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ir tikai tas, ko pārformulētā atbilde norāda **klientam**; tas pats par sevi
  nav savienojuma iekšējais gaidīšanas/bloķēšanas ilgums — to atsevišķi nosaka
  mehānisms, kas faktiski apstrādā pārformulēto kļūdu
  (savienojuma gaidīšanas perioda pieaugošā atkāpšanās, §2, ar pamata ilgumu `3s`
  API atslēgu nodrošinātājiem; vai modeļa bloķēšana, §3, nodrošinātājiem ar kvotu katram modelim,
  piemēram, agentrouter). Maršrutētājs var iekšēji atkal kļūt piemērots mēģinājumam
  ātrāk nekā klientam paziņotais 60 sekunžu logs — tā ir apzināta rezerve,
  nevis kļūda.

Pastāvīgas kļūdas (agentrouter `无权访问模型` — nav piekļuves šim modelim)
NEKAD netiek pārformulētas: `excludeMarkers` noraida noteikumu pat tad, ja ir atrasta atbilstība `textMarkers`,
tādēļ kļūda saglabā sākotnējo statusu un nekas to nemēģina atkārtot bezgalīgi. Atbilstošais
nodrošinātāja klasifikācijas noteikums
(`agentrouter-model-access-denied` failā `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarēts pamata gaidīšanas periods `6h`) tiek
izvērtēts funkcijā `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_pirms_ vispārīgās apikey kategorijas `FORBIDDEN` priekšlaicīgās atgriešanas, ja
`honorsRuleLockScope(provider)` to atļauj (#10334 — pašlaik tikai agentrouter,
izmantojot `HONORS_RULE_LOCK_SCOPE_PROVIDERS` atļauto sarakstu failā
`providerErrorRules.ts`). Noteikumā deklarētais 6 stundu gaidīšanas periods tiek nodots tālāk kā
`fallbackResult.baseCooldownMs`, taču tas joprojām nonāk iepriekš pastāvošajā
katram modelim noteiktās kvotas bloķēšanas ceļā (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ko #10334 nav mainījis, izņemot gaidīšanas perioda
avotu): tas tiek samazināts līdz operatora `mlSettings.maxCooldownMs`
(noklusējums `1_800_000ms` / 30 min), tāpat kā jebkura cita modeļa bloķēšana, un
_saglabātais bloķēšanas iemesls_ paliek iepriekš pastāvošā, stingri kodētā vērtība `"forbidden"`,
nevis noteikuma `"auth_error"` — pilnībā tiek ievērots tikai gaidīšanas perioda ilgums,
nevis iemesla virkne. Pats savienojums paliek aktīvs;
citi modeļi tajā pašā savienojumā netiek ietekmēti.

Pārformulētās kvotas kļūdas (`额度不足`) produkcijas vidē sasniedz nodrošinātāja noteikumu
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez sava deklarēta gaidīšanas perioda — tiek izmantota persistences slāņa
mērogotās atkāpšanās noklusējuma vērtība). Kopš #10334 lauks `scope` objektā
`ProviderErrorRuleMatch` TIEK izmantots visā apstrādes ķēdē, taču **tikai** nodrošinātājiem,
kas iekļauti `HONORS_RULE_LOCK_SCOPE_PROVIDERS` atļauto sarakstā (`providerErrorRules.ts` —
pašlaik tikai `"agentrouter"`, ar pārbaudi `honorsRuleLockScope()`). Visiem
pārējiem nodrošinātājiem `scope` joprojām ir tikai informatīvs, tieši tāpat kā pirms #10334.
`checkFallbackError` atgriež atbilstošā noteikuma tvērumu kā
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ir koplietota pārbaude, kas apstiprina, ka
`ruleScope` tiešām ir droši ievērot kā visu savienojumu aptverošu, pašatjaunojošos
signālu (tvērums `"connection"`, iemesls `quota_exhausted`, nekad `permanent`,
nekad `creditsExhausted` — aizsardzība pret iespējamu nākotnes noteikumu, kurā tvērums
`"connection"` būtu sasaistīts ar pastāvīgu konta stāvokli). To izsauc divi patērētāji:

- **Noturība** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  tā vietā, lai nonāktu caurlaides nodrošinātāja **katram modelim atsevišķas** bloķēšanas
  zarā (agentrouter ir `passthroughModels: true` → `hasPerModelQuota()`
  atgriež `true`), tiek piemērots **īslaicīgs savienojuma atdzišanas periods** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, bet nekad galīgs statuss
  (`credits_exhausted`/`banned`/`expired`) — tādēļ pēc atdzišanas perioda beigām
  savienojums atjaunojas pats, nevis pieprasa manuālu akreditācijas datu atiestatīšanu.
  Tas tiek izlaists savienojumiem ar `disableCooling: true` (#2997): šī atteikšanās
  tā vietā noved pie katram modelim atsevišķas bloķēšanas (dokumentēts kompromiss —
  skatiet koda komentāru virs šī zara).
- **Kombinētā maršrutēšana viena pieprasījuma ietvaros** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): tas pats aizsargnosacījums pievieno
  savienojumu atmiņā glabātajai kopai `exhaustedConnections`, izmantojot atslēgu
  `${provider}:${connectionId}`. Tas izlaiž tikai atlikušo TĀ PAŠA PIEPRASĪJUMA
  mērķi, kura _paša mērķa objektā jau ir tieši šis `connectionId`_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` pirms `exhaustedConnections` uzmeklēšanas) — vienkārša
  modeļu saraksta kombinācija, kurā blakus esošajiem mērķiem nav sava piesaistīta
  `connectionId` un tas katrai nosūtīšanai tiek noteikts tikai no atbildes
  galvenes `X-OmniRoute-Selected-Connection-Id`, nekad neatbilst šai atslēgai. Šajā
  bieži sastopamajā gadījumā īstā aizsardzība pret to, ka atlikušais posms atkārtoti
  izmanto tikko izsmelto kontu, NAV šī kopa — tas ir iepriekš aprakstītais
  noturības slānis (savienojuma `rateLimitedUntil` tagad ir iestatīts nākotnē)
  kopā ar to, ka šis pats aizsargnosacījums kļūmes gadījumā neļauj izmantot
  `transientRateLimitedProviders` (skatiet sadaļu "Divpakāpju uzbūve" un koda
  komentāru par `isAgentrouterConnectionQuotaScope` zaru failā
  `targetExhaustion.ts`): tā kā šī kopa paliek neatzīmēta, `combo.ts`
  `allowRateLimitedConnection` piespiedu atļaušana
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NETIEK aktivizēta
  pārējiem nodrošinātāja posmiem, tādēļ akreditācijas datu atlases
  `rateLimitedUntil` filtrs (`src/sse/services/auth.ts:1238`) tiek ievērots
  kā parasti un atlikušais posms vai nu izvēlas citu, joprojām piemērotu
  agentrouter savienojumu, vai neizdodas, jo nav pieejamu akreditācijas datu —
  tas nepiespiež atkārtoti izmantot savienojumu, kuram šis zars tikko piemēroja
  atdzišanas periodu.

### Divpakāpju uzbūve: statusa pārformulēšana un pēc tam klasificēšana

Statusa pārformulēšana (`upstreamStatusRestatement.ts`) un nodrošinātāja
klasificēšanas kārtulas (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ir atsevišķi reģistri, kas abi izmanto nodrošinātāja ID
un teksta marķierus kā atslēgas, taču tie darbojas dažādās vietās un kalpo
dažādiem mērķiem: pārformulēšana procesa sākumā failā `chatCore.ts` pārraksta
HTTP statusu; klasificēšanas kārtulas izvēlas atkāpšanās `reason` un bloķēšanas
`scope` (`model` / `provider` / `connection`) funkcijā `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klasificēšanas kārtulas redz pilnu kļūdas **tekstu** (tas nepieciešams, lai
atrastu tādus pamatteksta marķierus kā `额度不足`) tikai tiem nodrošinātājiem,
kas iekļauti `FULL_TEXT_RULE_PROVIDERS` atļauto sarakstā failā
`providerErrorRules.ts` — pašlaik tikai `"agentrouter"`. Katram citam
**iebūvētā kataloga** nodrošinātājam `checkFallbackError` nodod
`getProviderErrorRuleMatch` tikai strukturēto kļūdu (`{code, type}`), ar ko
pietiek uz galvenēm, statusu vai kodu balstītām kārtulām, bet kas neredz
pamatteksta marķierus. Palīgfunkcija `resolveRuleMatchBody()` veic šo izvēli:
pilns kļūdas teksts atļauto sarakstā iekļautajiem nodrošinātājiem, bet pārējiem —
strukturētā kļūda. **Iebūvēta** nodrošinātāja pievienošana sarakstam
`FULL_TEXT_RULE_PROVIDERS` ir nepārprotama katra nodrošinātāja atsevišķa
piekrišana — tas pastāv, lai noklusējuma ceļš katram sarakstā neiekļautajam
nodrošinātājam baitu līmenī paliktu nemainīgs.

Kārtulas `scope` (`model` / `provider` / `connection`) ir no
`FULL_TEXT_RULE_PROVIDERS` neatkarīga piekrišana: `checkFallbackError` to tikai
atgriež kā `fallbackResult.ruleScope`, un pakārtotie patērētāji to interpretē
kā kaut ko vairāk par informatīvu etiķeti tikai tiem nodrošinātājiem, kuri ir
iekļauti tā paša faila `HONORS_RULE_LOCK_SCOPE_PROVIDERS` atļauto sarakstā
(to ierobežo `honorsRuleLockScope()` — pašlaik tikai `"agentrouter"`). Skatiet
iepriekš sadaļu "Pārformulētas kvotu kļūdas", lai uzzinātu, ko
`scope: "connection"` atbilstība faktiski dara pēc nodrošinātāja iekļaušanas
šajā atļauto sarakstā.

**#11104 — operatora deklarētās kārtulas apiet abus atļauto sarakstus.**
Operators izpildlaikā var deklarēt katram nodrošinātājam atsevišķu kārtulu,
izmantojot `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
nerediģējot šo failu. Operatora kārtulas ierobežošana ar
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — atļauto
sarakstiem, kuru mērķis ir aizsargāt iebūvētā kataloga kārtulu **noklusējuma**
darbību — padarītu iestatījumu mehānismu neaktīvu visiem nodrošinātājiem,
izņemot jau šajos sarakstos iekļautos, jo kārtulas deklarēšana jau pati par
sevi ir nepārprotama operatora piekrišana. Gan `resolveRuleMatchBody()`, gan
`honorsRuleLockScope()` vispirms pārbauda `hasOperatorRuleForProvider()`:
nodrošinātājs ar operatora kārtulu saņem neapstrādāto kļūdas tekstu, un tā
deklarētais `scope` tiek ievērots neatkarīgi no tā, vai nodrošinātājs ir
iekļauts kādā no šiem atļauto sarakstiem.

**Zināms trūkums — HTTP 400 gadījumā `providerRuleRegistry` nekad netiek
izmantots.** Funkcijas `checkFallbackError` zars `BAD_REQUEST` statusu 400
pilnībā klasificē, izmantojot savus paraugu masīvus
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` u.c. failā
`accountFallback.ts`), un atgriež rezultātu, pirms tiek sasniegts virs tā
esošais `configuredRule`/`getProviderErrorRuleMatch` zars. Iebūvētā kataloga
kārtula (vai operatora kārtula) ar `status: 400` ir sintaktiski derīga, taču
nekad netiks aktivizēta. Pašlaik neviena esoša kārtula nav paredzēta statusam
400, tādēļ produkcijas vidē nekas netiek ietekmēts — tomēr turpmākas 400
kārtulas pievienošanai vispirms jāmaina šis zars, un tās būtu plašākas
izmaiņas nekā kārtulas pievienošana (tās pārklasificētu 400 statusu katram
nodrošinātājam, kas jau paļaujas uz paraugu masīvu darbību), tādēļ tas neietilpst
vienam nodrošinātājam paredzētas kārtulas pievienošanas tvērumā.

### Jaunas, kvotas kļūdaini ziņojošas vārtejas pievienošana

1. Reģistrējiet vienu noteikumu masīvu `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Saglabājiet `textMarkers`
   specifiskus konkrētam sniedzējam; nekad nelietojiet atkārtoti vispārīgas
   angļu valodas frāzes, kas pārklājas ar
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Pēc izvēles reģistrējiet klasifikācijas noteikumus failā
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), lai
   izvēlētos pareizo bloķēšanas tvērumu (`connection` visa konta kvotai,
   `model` atsevišķa modeļa kļūdām). Šis solis produkcijas vidē iedarbojas
   tikai sniedzējiem, kuru noteikumiem nepieciešams pilns kļūdas teksts
   (ķermeņa marķieri): pievienojiet sniedzēja ID sarakstam
   `FULL_TEXT_RULE_PROVIDERS` tajā pašā failā — pretējā gadījumā
   `checkFallbackError` noteikumam vienmēr nodod tikai strukturēto
   `{code, type}` kļūdu, un ķermeņa teksta noteikums reālajā satiksmē
   nekad neatbildīs. Noteikumiem, kas atbilst tikai pēc `status`/`headers`
   (kā Opencode vai Minimax noteikumi), šāda ieslēgšana (opt-in) nav
   nepieciešama. Atsevišķi: ja noteikums deklarē `scope: "connection"` un
   mērķis ir faktiska visa savienojuma atdzesēšana plus tā paša pieprasījuma
   kombinācijas (combo) izlaišana (nevis tikai informatīvs marķējums),
   pievienojiet sniedzēja ID sarakstam `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
   tajā pašā failā — tieši tas nosaka `isAgentrouterConnectionQuotaScope()`
   stila patēriņu `markAccountUnavailable()` (`src/sse/services/auth.ts`) un
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez tā `scope`
   joprojām nonāk `fallbackResult.ruleScope`, bet nekas uz to nereaģē.
3. Pievienojiet vienībtestus, kas atspoguļo
   `tests/unit/upstream-status-restatement.test.ts` un
   `tests/unit/agentrouter-error-rules.test.ts` (ieskaitot not-permanent /
   not-creditsExhausted aizsargpārbaudes, un — ja sniedzējam nepieciešams
   atļauto saraksts — testu, kas pārbauda, ka `resolveRuleMatchBody()`
   atgriež pilnu tekstu tikai attiecīgajam sniedzējam).

Izmaiņas `chatCore.ts`, `classifyError` vai combo mehānismā nav nepieciešamas.

#### Bloķēšana pa izejas IP grupām (#10880)

Sniedzēji `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode saime) tiek uzskatīti
par augšupvērsajiem (upstream) ar grupēšanu pa IP (opencode bezmaksas
līmenis ir grupēts pa IP, nevis pa kontu — sk. #9611): ar statusu 429
klasificēts `quota_exhausted` **vai** `rate_limit_exceeded` atdzesē visus
atļautajā sarakstā iekļautās saimes savienojumus, kuru pēdējā zināmā izejas
IP adrese sakrīt ar neveiksmīgā savienojuma adresi, pirms rotācija tos
vispār var izmēģināt — tādējādi izvairoties no N-1 garantēti neveiksmīgiem
augšupvērsajiem izsaukumiem (tā pati shēma kā #10460/#10525).
`rate_limit_exceeded` ir iekļauts apzināti: `markAccountUnavailable` ceļā
opencode specifiskie noteikumi nekad neatbilst (`checkFallbackError` netiek
nodotas ne galvenes, ne ķermeņa teksts, un opencode nav iekļauts
`FULL_TEXT_RULE_PROVIDERS`), tāpēc 429 atbilde, kuras ķermenī ir abonementa
kvotas teksts ("monthly usage limit reached"), tiek klasificēta kā
`quota_exhausted` pēc kvotas teksta rezerves mehānisma
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h atdzesēšana),
pirms vispār tiek sasniegts `status_429` noteikums — savukārt 429 bez
kvotas teksta (parasta ātruma ierobežošana) klasificējas caur `status_429`
noteikumu kā `rate_limit_exceeded` un tikpat labi atdzesē IP saimi.
Atļautajā sarakstā iekļautam sniedzējam pa IP grupēts ātruma ierobežojums
ir tāds pats signāls kā izsmelta kvota. Godīgi ierobežojumi:

- **Pēc labākās gribas**: bloķēšana nosaka savienojuma pēdējo zināmo `egress_ip`
  no `proxy_logs` (24h logs, sinhroni, bez kešatmiņas). Aukstā kešatmiņa
  (izejošā IP nekad nav zondēta) vai nav rindas → neveiksmīgais savienojums
  zarā joprojām tiek atdzesēts (reģistrēts tāpat kā līdz šim), tikai netiek
  bloķēts neviens radniecīgais savienojums.
- **Nekad nav galīgs**: atdzesēšana ir atjaunojošs kvotas logs
  (`testStatus: "unavailable"`); pastāvīgs stāvoklis nekad netiek atvasināts
  no IP līmeņa signāla. `disableCooling` savienojumi šo zaru pilnībā izlaiž.
- **Atļautajā sarakstā iekļautajai saimei mainās bloķēšanas granularitāte**:
  tā ir tvēruma maiņa, nevis tikai radniecīgo savienojumu optimizācija.
  opencode ir `passthroughModels` nodrošinātājs, tāpēc pirms šī zara atbilde
  429 izraisīja bloķēšanu katra atsevišķa modeļa līmenī; tagad tā izraisa
  savienojuma atdzesēšanu — tostarp operatoram, kurš darbina vienu
  savienojumu bez jebkāda radniecīga savienojuma. Tā ir tieši tā
  granularitāte, ko opencode noteikumu tabula jau pasludina par pareizu
  (`scope: "connection"`, `providerErrorRules.ts`), bet kas līdz šim nekad
  nav ievērota, jo opencode nav iekļauts
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Zars pats ieraksta neveiksmīgā
  savienojuma atdzesēšanu + `backoffLevel`, atspoguļojot agentrouter
  savienojuma tvēruma zaru, un atgriežas — katra modeļa līmeņa bloks un
  zemāk esošais vispārīgais ceļš nekad netiek sasniegti.
- **Kombo iekļauts**: tāpat kā agentrouter zars, šis tvērums apzināti
  ignorē `persistUnavailableState`/`isCombo` pazeminājumu, ko kombinētais
  izsaucējs piemēro atbildei 429. Bloķēšana katra modeļa līmenī nav vājāka
  šī tvēruma forma — tā ir nepareizā mērvienība: tā neko nesaka par
  izsmelto IP, tāpēc kombo rotācija turpinātu sadedzināt pa vienam garantēti
  neveiksmīgam izsaukumam uz katru radniecīgo savienojumu.
- **Radniecīgo savienojumu drošība**: radniecīgs savienojums, kas jau ir
  galīgā stāvoklī (banned/credits_exhausted) vai jau atrodas ilgākā
  atdzesēšanā, nekad netiek pārrakstīts.
- **Ekskluzīvs atļautais saraksts**: `EGRESS_BUCKETED_LOCK_PROVIDERS`
  paplašināšana ir nepārprotams īpašnieka lēmums; bez vispārīga sasaistes
  mehānisma (pattern #10334/#10419). Radniecīgo savienojumu vaicājums saista
  tieši to pašu atļauto sarakstu, nevis atkārto to kā SQL literāli, tāpēc tā
  paplašināšana paliek vienas rindiņas izmaiņa.
- **Izejošās IP rotācija abos virzienos**: meklēšanas logs (24h) ir daudz
  plašāks nekā izejošās IP kešatmiņas TTL (5 min), tāpēc „pēdējā zināmā IP"
  ir vēsture, nevis pašreizējais stāvoklis. Ja savienojuma starpniekserveris
  loga laikā ir rotējis, bloķēšana var **nepamanīt** patiesi koplietotu IP
  (ierakstītā IP ir jaunā, vēl neizsmeltā) — un simetriski tā var
  **atdzesēt radniecīgu savienojumu, kas kopš tam ir aizrotējis** no
  izsmeltās IP. Otrais gadījums šim radniecīgajam savienojumam izmaksā vienu
  atdzesēšanas logu; abi ir pieņemti uz vēsturi balstītas meklēšanas
  ierobežojumi pēc labākās gribas.
- **Izmaksas**: divas ierobežotas `proxy_logs` skenēšanas (pēc loga
  filtrētas, izmantojot `idx_pl_timestamp`), tikai ar atbilžu 429 biežumu.
  Nav jauna indeksa (migrācija 134 YAGNI). Izmērīts uz vidēja lieluma reāla
  trafika DB kopijas; lielas caurlaidspējas instance tajā pašā logā satur
  proporcionāli vairāk rindu.

---

## Citas noturības funkcijas

- **20 maršrutēšanas stratēģijas** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — skatiet [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Maršrutēšana, ņemot vērā atiestatīšanas laiku** (v3.8.0) — prioritizē savienojumus pēc kvotas atiestatīšanas laika.
- **Fona režīma degradācija** — Responses API `background: true` tiek pazemināts uz sinhrono izpildi ar brīdinājumu.
- **Dinamiska rīku limitu noteikšana** — uz laiku atturas no sniedzējiem, kad sasniegti rīku skaita ierobežojumi.
- **Ārkārtas rezerves režīms** — to kontrolē `OMNIROUTE_EMERGENCY_FALLBACK`; operatori to var pārdefinēt Feature Flags lapā bez restartēšanas.

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
