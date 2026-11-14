# Resilience Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute එකිනෙකට වෙනස් නමුත් ඊට අදාළ ඔරොත්තු දීමේ යාන්ත්‍රණ තුනක් ඇත. එක් එක් විෂය පථය සහ අරමුණ වෙනස් වේ. රවුටින් හැසිරීම නිදොස් කිරීමේදී ඒවා වෙනම තබා ගන්න.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> මූලාශ්රය: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **ඔරොත්තු දීමේ ටොගල් සඳහා Env-vs-dashboard ප්‍රමුඛතාවය.** — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — පරිසරයෙන් බීජ ටොගල් ප්‍රත්‍යස්ථතාව ටොගල් කරන්නේ _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) පමණි. `resilienceSettings` (උපකරණ පුවරුව →** සැකසීම් → ඔරොත්තු දීමේ හැකියාව** / `PATCH /api/resilience`, `key_value` හි ගබඩා කර ඇත ) env අගය ජය ගනී: සාමාන්‍යකරණය (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) එකක් පවතින විට ගබඩා කරන ලද boolean තබා ගනී. උපකරණ පුවරුව දැනටමත් `false` සුරකින ලද යෙදවුමක එවැනි env var `true` ලෙස සැකසීම, එබැවින් කිසිවක් වෙනස් නොවේ — ටොගලය පෙරළන්න** සැකසීම් → ඔරොත්තු දීමේ හැකියාව** (හෝ ගබඩා කර ඇති ක්ෂේත්‍රය හිස් කරන්න) ඒ වෙනුවට.

## 1. Provider Circuit Breaker

**විෂය පථය:** සම්පූර්ණ provider එක (උදා., `glm`, `openai`, `anthropic`).

**අරමුණ:** upstream/service මට්ටමින් නැවත නැවත අසාර්ථක වන provider කෙනෙකු වෙත යානා යැවීම නවත්වා දැමීම.

**ක්රියාත්මක කිරීම:**

- ප්රධාන class එක: `src/shared/utils/circuitBreaker.ts`
- සම්බන්ධ කිරීම: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- තත්ත්ව API එක: `GET /api/monitoring/health`
- Reset API එක: `POST /api/resilience/reset`
- Wrapper ඒවා: `open-sse/services/accountFallback.ts`
- DB වගුව: `domain_circuit_breakers`

**තත්ත්ව:**

- `CLOSED` — සාමාන්ය යානා වලට අවසර ඇත
- `DEGRADED` — යානා තවමත් වලට අවසර ඇත, නමුත් ඉහළ ගිය provider අසාර්ථකතා නිරීක්ෂණය කරමින් සිටී; ප්රමාණවත් සාර්ථකත්වයන් මත, වලංගු සම්බන්ධතා පරීක්ෂණයක් මත, හෝ අවසාන අසාර්ථක වර්ගය සඳහා දිගම `OPEN` රඳවා තැබීමෙන් පසු (එහි `cooldownByKind` අගය, නැතිනම් `resetTimeout`, × `maxBackoffMultiplier`, අවම වශයෙන් එක් cooldown එකක්) අලුත් අසාර්ථකත්වයක් නොමැතිව `CLOSED` වෙත ආපසු යයි
- `OPEN` — provider තාවකාලිකව අවහිර කර ඇත; combo routing එය මඟහරියි
- `HALF_OPEN` — reset කාලසීමාව ගෙවී ගොස් ඇත; probe ඉල්ලීමට අවසර ඇත

**වින්යාසගත කළ හැකි පෙරනිමි (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience හි නිරාවරණය වේ):**

| පන්තිය  | Degraded වන්නේ | විවෘත වන්නේ  | Reset කාලසීමාව |
| ------- | -------------- | ------------ | -------------- |
| OAuth   | අසාර්ථකතා 5    | අසාර්ථකතා 8  | 60s            |
| API-key | අසාර්ථකතා 7    | අසාර්ථකතා 12 | 30s            |
| Local   | ව්යුත්පන්න     | අසාර්ථකතා 2  | 15s            |

`degradationThreshold` මඟින් provider කෙනෙක් `DEGRADED` වෙත ඇතුළු වන අවස්ථාව පාලනය කරයි; `failureThreshold` මඟින් එය විවෘත වී මඟහරින අවස්ථාව පාලනය කරයි. Local provider profile ඒවා තවම Resilience settings පිටුවේ නිරාවරණය නොවේ.

**Trip කේත:** provider මට්ටමේ තත්ත්ව `[408, 500, 502, 503, 504]` පමණි. Account මට්ටමේ දෝෂ සඳහා trip නොවන්න (බොහෝ 401/403/429 — ඒවා cooldown හෝ lockout වෙත අයත් වේ).

**කම්මැලි ප්රතිසාධනය:** `OPEN` එක කල් ඉකුත් වූ විට, `getStatus()`, `canExecute()`, `getRetryAfterMs()` මඟින් තත්ත්වය `HALF_OPEN` වෙත නැවුම් කරයි. එම කියවීම්ම (සහ ඊළඟ අසාර්ථකත්වය) කල් ඉකුත් වූ `DEGRADED` එකක් `CLOSED` වෙත හීන කරයි. පසුබිම් timer එකක් අවශ්ය නොවේ.

---

### තේරීම්-පාදක ගෝලීය Provider Cooldown (කවුළු දොරටුව)

සිව්වන, **තේරීම්-පාදක** ස්ථරයක් (`PROVIDER_COOLDOWN_ENABLED`, පෙරනිමිය **අක්රිය**) අසාර්ථක වන provider ඒවා පිළිබඳ ඉල්ලීම්-හරහා මතකයක්
`open-sse/services/providerCooldownTracker.ts` හි තබා ගනී, එය combo target
නිරාකරණය විසින් සලකා බැලෙන අතර, එමඟින් අඛණ්ඩ combo ඉල්ලීම් මඳ වේලාවකට පෙර අසාර්ථක වූ
provider එකක් නැවත ගමන් කිරීම නවත්වයි. Provider මට්ටමේ ඇතුළත් කිරීම්
`PROVIDER_PROFILES` කවුළු දොරටුවට ගරු කරයි:

| Profile | ඉන් පසු trip වේ (`providerFailureThreshold`) | තුළ (`providerFailureWindowMs`) | cooldown වන්නේ (`providerCooldownMs`) |
| ------- | -------------------------------------------: | ------------------------------: | ------------------------------------: |
| OAuth   |                                         `10` |                         `15min` |                                `5min` |
| API key |                                         `15` |                         `30min` |                               `10min` |

සීමාවට වඩා අඩුවෙන් provider එක cooling ලෙස සැලකෙන්නේ **නැත**; සාර්ථකත්වයක්
කවුළුව මකා දමයි. සම්බන්ධතා මට්ටමේ ඇතුළත් කිරීම් (`provider:connectionId`) ඒ වෙනුවට
ඝාතීය `minRetryCooldownMs → maxRetryCooldownMs` backoff එක තබා ගනී. අභිබවා යාම්:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regression ආරක්ෂකය: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. සම්බන්ධතා සිසිලනය

**විෂය පථය:** තනි සැපයුම්කරු connection/account/key.

**අරමුණ:** එකම සැපයුම්කරු සඳහා වෙනත් සම්බන්ධතා දිගටම සේවය කරන අතරතුර එක් නරක යතුරක් මඟ හරින්න.

**ක්රියාත්මක කිරීම:**

- නොමැති ලකුණු කරන්න: `src/sse/services/auth.ts::markAccountUnavailable()`
- තේරීම: එකම ගොනුවේ `getProviderCredentials*`
- Cooldown ගණනය: `open-sse/services/accountFallback.ts::checkFallbackError()`
- සැකසීම්: `src/lib/resilience/settings.ts`

**සම්බන්ධතාවකට ක්ෂේත්‍ර:**

- සිසිලනය කල් ඉකුත් වන තෙක්`rateLimitedUntil` — වේලා මුද්‍රාව
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ඝාතීය බැක්ඕෆ් කවුන්ටරය

**පෙරනිමි සිසිල්කිරීම්:**

- OAuth පදනම: 5s
- API-යතුරු පදනම: 3s
- API-key 429: upstream `Retry-After`/reset headers/parseable reset text වලට කැමතියි
- පසුබැසීම: `baseCooldownMs * 2 ** failureIndex`

**එක්-සැපයුමකට නැවත උත්සාහ කිරීමේ ප්‍රමාදය.** සපයන්නාගේ විස්තර පිටුවේ ඇත** ප්‍රමාදය නැවත උත්සාහ කරන්න** තෝරන්න (ස්වයං, 15s දක්වා 1h දක්වා). එය `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, `PATCH /api/resilience` හරහා) සුරකියි. අනුපාත-සීමා දෝෂයක් උඩු ගංවතුර නැවත උත්සාහ කිරීමේ ඉඟියක් නොමැති විට, එම අගය සපයන්නා සඳහා පරිමාණය කළ පසුබෑම ප්‍රතිස්ථාපනය කර `backoffLevel` 0 (`open-sse/services/rotationConfig.ts::overrideFor`) වෙත යළි සකසයි. අනුපාත-සීමිත දෝෂයක් සඳහා ප්‍රමුඛතාවය, ඉහළම ප්‍රථමයෙන්: උඩුගං නැවත උත්සාහ ඉඟිය, පසුව එක්-සම්බන්ධතාවයකට `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, පසුව එක්-සැපයුම්කරුට නැවත උත්සාහ කිරීමේ ප්‍රමාදය, පසුව env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, පසුව පරිමාණයෙන් පසුබැසීම. ස්වයංක්‍රීයව ක්ෂේත්‍රය ඉවත් කරයි. එය අනුපාත-සීමා හේතුවට පමණක් බලපාන අතර, කිසිවිටෙක පර්යන්ත තත්ත්වයන් නොවේ.

**ගිගුරුම් විරෝධී-රංචු ආරක්ෂකයා:** සිසිලනය අධික ලෙස දිගු කිරීමෙන් හෝ `backoffLevel` ද්විත්ව වර්ධකයෙන් සමගාමී අසාර්ථකත්වය වළක්වයි.

**සමගාමී-සීමාව 429s backoff ඉණිමඟට නැගෙන්නේ නැත.** ශරීරය සමගාමී සීමාවක් වාර්තා කරන `429` ("සමගාමී ඉල්ලීම් වැඩි", "සමගාමී සීමාව", "සමාන්තර ඉල්ලීම් සීමාව", GLM `并发数过高`) යන්නෙන් අදහස් වන්නේ ගිණුම සෞඛ්‍ය සම්පන්න නමුත් කාර්යබහුලයි. `checkFallbackError()` හේතුව `concurrency_limited` ලබා දෙයි: දැන් ඊළඟ සම්බන්ධතාවයට අසමත් වන්න, ස්ථාවර `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) හෝ උඩුගං නැවත උත්සාහ කිරීමේ ඉඟිය සඳහා මෙය සිසිල් කරන්න, `backoffLevel` නොවෙනස්ව තබා, සහ `skipProviderBreaker` සකසන්න. පැහැදිලි කෝටා ආයතනයක් තවමත් ජයග්‍රහණය කරයි, එබැවින් කෝටා රටාවකට ගැළපෙන ශරීරයක් කෝටා තීන්දුවක් ලෙස පවතී. හඳුනාගැනීම: `looksLikeConcurrencyLimit()` `src/shared/utils/classify429.ts`; තීන්දුව: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (බ්‍රේකර්ගේ `FailureKind`) නොවෙනස්ව පවතින අතර තවමත් මෙම ශරීර සඳහා `rate_limit` කියවයි.

**ප්‍රවාහ අන්තර්ගත කුටි ගිණුම සිසිල් නොකරයි.** Content-stall watchdog (`open-sse/utils/streamHandler.ts`) නියමිත වේලාවට ආදර්ශ ප්‍රතිදානයක් නොයවා ඇති ප්‍රවාහයක් අත්හරින විට, `markAccountUnavailable()` සම්බන්ධතාවයේ දෝෂය වාර්තා කරන නමුත් කිසිදු සිසිල් කිරීමක් සිදු නොකරයි: කුටිය එම ඉල්ලීමට අයත් වේ, බොහෝ විට තවමත් ප්‍රතිදානයක් නොමැතිව දිගු තර්ක කිරීමේ හැරීමකි. ක්‍රියාකරුවන්ට `resilienceSettings.streamStallCooldown.enabled` (පෙරනිමි `false`) සමඟ නැවත ඇතුළු විය හැක.

**`p2c` ගිණුම් තේරීම සඳහා ප්‍රමාද සංඥාව තෝරා ගැනීම.** සෑම යවන ලද ප්‍රයත්නයක්ම එහි කාලය-පළමු-බයිට් සහ ප්‍රතිඵලය (සහ සම්බන්ධතාවකට + ආකෘතියකට) මතකයේ පෙරළීමේ කවුළුවක සටහන් කරයි: අවසන් සාම්පල 20 මිනිත්තු 15ක් ඇතුළත (`open-sse/services/connectionLatencyTracker.ts`, `safeLogEvents()` සිට `src/sse/handlers/chatHelpers.ts` වලින් වාර්තා කර ඇත). `resilienceSettings.p2cLatency.weight` `0` වඩා ඉහළින් ඇති විට (පරාසය 0-20, පෙරනිමි `0` = අක්‍රිය), `src/sse/services/auth.ts` හි `compareP2CConnections()` යුගලයේ එක් එක් අපේක්ෂකයාට `weight` ලකුණු දක්වා එකතු කරයි. එයින් අඩක් ප්‍රමාදයෙන් වේගවත් අපේක්ෂකයාට අනුපාතයක් ලෙස (දෙගුණයක් මන්දගාමීව සම්පූර්ණ භාගය ගනී) සහ අඩක් පෙරළීමේ දෝෂ අනුපාතයෙන් පැමිණේ. අයදුම්කරුවන් දෙදෙනාටම අවම වශයෙන් සාම්පල 3ක් ඇති විට පමණක් මෙම යෙදුම අදාළ වේ, එබැවින් නව ගිණුම්වලට දඬුවම් නොලබන අතර, එහි සීමාව කෝටා-අවහිර කළ සහ කෝටාව අවසන් වූ දඬුවම්වලට වඩා පහළින් පවතී. එය තමන්ගේම පරිපථයක් එකතු නොකරයි: අසාර්ථක ගිණුම් තවමත් හසුරුවනු ලබන්නේ කූල්ඩවුන්, ලොක්අවුට් සහ බ්‍රේකර් ස්ථර මගිනි. එය `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` සමඟ සකසන්න.

**තර්ක රාමු අන්තර්ගත-කුටි අයවැය නැවත ආරම්භ කරයි.** තාර්කික ආකෘතියකට එහි පළමු දෘශ්‍ය ටෝකනයට පෙර මිනිත්තු ගණනක් සිතිය හැක: Claude `thinking_delta` රාමු එහි චින්තන පාඨය හිස් විය හැකි අතර ප්‍රතිචාර API එක තර්ක අයිතම ප්‍රවාහ කරයි. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) මෙම රාමු හඳුනා ගන්නා අතර, මුරකරු වාරය අවලංගු කරනවා වෙනුවට එක් එක් ඒවායේ අයවැය නැවත ආරම්භ කරයි. ඒවා තවමත් ආදර්ශ ප්‍රතිදානයක් නොවේ, එබැවින් තර්කයෙන් පමණක් අවසන් වන හැරීමක් තවමත් හිස් ලෙස වාර්තා වන අතර තර්ක කිරීම නවතා හෘද ස්පන්දන පමණක් යවන හැරීමක් තවමත් මුර බල්ලා වෙත ගමන් කරයි.

හිස් නොවන අත්සනක් සහිත Kiro හි ද්විමය `reasoningContentEvent` රාමු මෙම තර්ක ක්‍රියාකාරකම ක්‍රියාත්මක කරන්නා හරහා හිස් `reasoning_content` ඩෙල්ටාවක් ලෙස ආරක්ෂා කරයි. අත්සන යොමු නොකෙරේ. පාරදත්ත, අසම්පූර්ණ රාමු සහ හිස් අත්සන් අන්තර්ගත අයවැය නැවත ආරම්භ නොකරයි; ස්වාධීන සක්‍රිය-ප්‍රවාහ කල් ඉකුත්වීම සහ සේවාදායක අවලංගු කිරීම තවමත් අදාළ වේ (`open-sse/executors/kiro/reasoning.ts`).

**පර්යන්ත තත්වයන් (NOT cooldowns):**

- `banned` — තහනම්-මූලපද/ගිණුම්-බාහික හඳුනාගැනීම මගින් සකසා ඇත ( [BAN_DETECTION](../security/BAN_DETECTION.md) බලන්න). Upstream per-request ප්‍රතික්ෂේප කිරීම් (`request_rejected`, උදා Anthropic OAuth 403 "ඉල්ලීමට අවසර නැත") කිසිවිටෙක එය සකසන්නේ නැත: ඒවා සම්බන්ධතාවයකට සහ ආකෘතියකට ගණන් කර එම ආකෘතිය `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) ට ආවරණය කර ඇති වැඩෙන සිසිලනය සමඟ භ්‍රමණයෙන් පිටතට ගන්න, නැතහොත් — `open-sse/services/requestRejectedStreak.ts` නොදන්නා විට සම්බන්ධතාවය සිසිල් කරන්න.
- `expired` (සීමිත නැවත උත්සාහ කිරීමෙන් පසු ටර්මිනලයට සංක්‍රමණය වීම ඝාතීය බැක්ඕෆ් — සමඟ — `EXPIRED_RETRY_MAX = 3` එබැවින් ගිණුම ස්ථිරවම අක්‍රිය කිරීමට පෙර තාවකාලික OAuth දෝෂ ස්වයං-සුව කළ හැක)
- `credits_exhausted`

අක්තපත්‍ර වෙනස් වන තුරු හෝ ක්‍රියාකරුවෙකු ඒවා නැවත සකසන තෙක් මේවා පවතී. තාවකාලික සිසිලන තත්ත්වය සමඟ පර්යන්ත තත්වයන් උඩින් ලියන්න එපා.

**කම්මැලි සුවය:** `rateLimitedUntil` පසු වූ විට, සම්බන්ධතාවය නැවත සුදුසු වේ. සාර්ථක භාවිතයේදී, `clearAccountError()` සියලු දෝෂ ක්ෂේත්‍ර ඉවත් කරයි.

### Claude OAuth භාවිත බිත්තිය: අඩු ප්‍රමුඛතා මංතීරුව + සැසි-සීමා යළි පිහිටුවීම

**විෂය පථය:** එක් Claude දායකත්වය (OAuth) සම්බන්ධතාවයක්. ලක්ෂණ දෙකම වේ** සම්බන්ධතාවයකට ඇතුල් වීම** (සම්බන්ධතාවය සංස්කරණය කරන්න → Claude කොටස → `lowPriorityMode` / `autoLimitReset` `providerSpecificData` වලදී, දෙකම පෙරනිමියෙන් ක්‍රියාවිරහිතයි) සහ Claude කේතයේ `/low-priority` සහ `/limit-reset` විධාන දර්පණ කරන්න ( Claude කේතය 2.1.263 වෙතින් ලබා ගත් වයර් කොන්ත්‍රාත්තුව).

**ක්රියාත්මක කිරීම:**

- රාජ්ය යන්ත්රය + ප්රතිචාර වර්ගීකරණය: `open-sse/services/claudeLowPriority.ts`
- status/claim සේවාලාභියා යළි පිහිටුවන්න: `open-sse/services/claudeLimitReset.ts`
- විධායක කොක්ක (ශීර්ෂක එන්නත් + එකම ගිණුම නැවත උත්සාහ කිරීම): `open-sse/executors/base.ts::execute()`
- තෝරා ගැනීමේ ස්ථීරභාවය: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ප්‍රේරකය:** 5-පැය භාවිත බිත්තිය — a `429` එහි ශීර්ෂයන් `anthropic-ratelimit-unified-status: rejected` සහ, ගිණුම සුදුසුකම් ඇති විට, `anthropic-ratelimit-unified-slow-offer: treatment`. එම පළමු බිත්තිය 429 ට පෙර කිසිවක් යවනු නොලැබේ; ඒකාබද්ධ ශීර්ෂයන් නොමැතිව 429 පිපිරීමක් සාමාන්‍ය සිසිල් කිරීමේ මාර්ගය හරහා ගමන් කරයි.

**අඩු ප්‍රමුඛතා මංතීරුව** (`lowPriorityMode`):

- බිත්තියේ 429 ක්‍රියාත්මක කරන්නා යෝජනාව පිළිගෙන වහාම නැවත උත්සාහ කරයි** එකම** `anthropic-usage-limit: slow` සමඟ ගිණුම; නිවේදනය කරන ලද `anthropic-ratelimit-unified-reset` (+ 60s grace) තෙක් මංතීරුව සක්‍රියව පවතින අතර එම කවුළුවේ ඇති සෑම ඉල්ලීමක්ම ශීර්ෂකය දරයි. බාධා කළ 429 කිසි විටෙකත් `handleChatCore` වෙත ළඟා නොවේ, එබැවින් සම්බන්ධතාවය වේ** නැත** කූල්ඩවුන් එකේ දමා ඉවතට කරකවන්නේ නැත.
- පසු ප්‍රතිචාර මත `anthropic-ratelimit-unified-slow-status` : `active` / `not_needed` පටුමග තබා ගන්න; `slot_busy` (429) හෝ `529` සේවාදායකයේ `anthropic-ratelimit-unified-slow-retry-after` රැඳී සිටින්න (පෙරනිමි 20s, clamp 5–600s, ± 30% jitter) සහ නැවත උත්සාහ කරන්න, `anthropic-ratelimit-unified-slow-max-wait` (පෙරනිමි 20, clamp 1 min–6 h) ට සීමා කර නැවත උත්සාහ කරන්න. — පිළිගැනීම. ඉල්ලීමේ උඩුගං ආරම්භක කාල සීමාව (`resolveFetchStartTimeout`, පෙරනිමියෙන් මිනිත්තු 10) තත්පර 5 ක ආන්තිකයකින් ඉතිරිව ඇති `max_wait` මගින් බලා සිටීම අතිරේකව සීමා කෙරේ: එම සීමාව නොමැතිව මිනිත්තු 20 ක පෙරනිමි උපරිම රැඳී සිටීම `TimeoutError` ඉක්මවා යන අතර + අවසන් වනු ඇත. සිසිල් කිරීම.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-කවුළු පෙරළීමක්, හෝ `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ඕනෑම තත්ත්‍වයකින් එය `extra_usage` ලෙස අවසන් වේ, මන්ද ගෙවන ලද අධික වීම දැන් බිත්තිය ආවරණය කරයි) මංතීරුව අවසන් කරන්න; එවිට ප්‍රතිචාරය සාමාන්‍ය සිසිල් කිරීමේ මාර්ගයට ගලා යයි. `budget_exhausted` ප්‍රකාශිත අයවැය යළි පිහිටුවීම තෙක් මතක තබා ගනී (≤ දින 8).
- බිත්ති පිරික්සුම ක්‍රියාත්මක කරන්නාගේම 400-ධාවන අභ්‍යන්තර ප්‍රයත්න නැවත උත්සාහ කිරීමෙන් පසුව ක්‍රියාත්මක වේ (සන්දර්භය සංස්කරණය, thinking/effort කලම්ප, පරාම් ස්වයංක්‍රීය ඉගෙනුම්), එබැවින් එම නැවත උත්සාහයන්ගෙන් එකක මතුපිට පමණක් ඇති බිත්ති 429 සිසිල් කිරීමේ මාර්ගයට ළඟා වීම වෙනුවට තවමත් බාධා වේ.
- එක් සම්බන්ධතාවයකට රාජ්‍යය මතකයේ ඇත (නැවත ආරම්භ කිරීමකට නැවත පිළිගැනීමට එක් අමතර බිත්තියක් 429ක් වැය වේ).

**සැසි-සීමා යළි පිහිටුවීම** (`autoLimitReset`, දෙකම ක්‍රියාත්මක වන විට මංතීරුවට පෙර උත්සාහ කර ඇත):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` බ්ලොක්; විට `arm: "reset"` සහ `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` සමඟ `{ "program": "juniper_tide" }` ( `providerSpecificData.organizationUUID` වෙතින් සංවිධානය UUID, bootstrap fallback).
- `result: reset|not_limited` → ඉල්ලීම සම්පූර්ණ වේගයෙන් නැවත උත්සාහ කර ඇත (මන්දගාමී ශීර්ෂයක් නැත). `already_used` / `not_offered` memoise `next_available_at` (පෙරනිමි සතියක්); ඕනෑම අසාර්ථකත්වයක් මිනිත්තු 15 කින් ඉවත් වේ. යළි පිහිටුවීම සතියකට වරක් වන අතර තවමත් සතිපතා සීමාවට ගණන් ගනී.

ප්‍රතිගාමී ආරක්ෂකයින්: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### බැංකු යළි පිහිටුවීම් ස්වයංක්‍රීයව යොදන්න

**විෂය පථය:** Codex සහ Claude දායකත්වය (OAuth) සම්බන්ධතා.** ඇතුළු වීම** : `bankedResetAutoApply` සැකසුම අක්‍රියව සහ පෙරනිමියෙන් `dry-run` මාදිලියේ ඇත (සැකසීම් → AI → ස්වයංක්‍රීයව බැංකු යළි පිහිටුවීම් යොදන්න).

**අරමුණ:** ගිණුමක් භාවිත බිත්තියකට පහර දුන් විට, සැපයුම්කරුගේ සීමාවන් පිටුවේ "මුදවා ගන්න" ඔබන තෙක් බලා සිටීම වෙනුවට බැංකුගත යළි පිහිටුවීම් තනිවම වියදම් කරන්න.

| ණය වර්ගය (`creditTypes`) | මුදවාගත් දේ                                 | දුවන තැන                                                |
| ------------------------ | ------------------------------------------- | ------------------------------------------------------- |
| `codexCredits`           | Codex ණය යළි පිහිටුවන්න                     | පසුබිම් කාර්යය, සෑම තත්පර 60 කට වරක්                    |
| `claudeCredits`          | Claude බැංකු ආධාර (`GRANT` ණය)              | පසුබිම් කාර්යය, සෑම තත්පර 60 කට වරක්                    |
| `claudeSessionReset`     | Claude සතිපතා සැසි-සීමා යළි පිහිටුවීම (ඉහළ) | එක් ගිණුමකට ටොගල් කරන ප්‍රතිපත්තියම හරහා ඉල්ලීම් මාර්ගය |

**ක්රියාත්මක කිරීම:**

- පිරිසිදු තීරණය (මාර්ග දෙකම සඳහා එක් රීතියක් සකසා ඇත): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- පසුබිම් කාර්යය: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` වලින් ආරම්භ කරන ලදී)
- Claude request-path gate: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` හි `setClaudeLimitResetPolicy()` හරහා ලියාපදිංචි කර ඇත
- ඉතිහාසය, කැප්ස් සහ webhook: `src/lib/usage/bankedResetAudit.ts`
- ඉතිහාසය API: `GET /api/settings/banked-reset-auto/history?limit=50` (කළමනාකරණ auth)

**තීරණ නියෝගය** (පළමු අසාර්ථක රීතිය වාර්තාගත හේතුවයි):

1. විශේෂාංග අක්‍රිය, ණය වර්ගය අක්‍රිය, හෝ විෂය පථයෙන් බැහැර ගිණුම (`accountScope` `all` / `selected` සහ එක් ගිණුමකට `connections` සිතියම).
2. විකල්ප UTC කාලසටහනෙන් පිටත (`startHourUtc` > `endHourUtc` මධ්‍යම රාත්‍රිය පසු කරයි).
3. අවසාන පැය 24 පුරා ඇති සීමාවන්: ඕනෑම මුදාගැනීම් දෙකක් අතර `maxPerAccountPerDay` (1), `maxPerDay` (3), සහ `minSpacingMinutes` (30).
4. ප්‍රේරකය: බිත්ති සහිත `session` හෝ `weekly` කවුළුවක් ( `getQuotaWindowStatus().reachedThreshold`, `isAccountQuotaExhausted()` නොව, වැය කරන සෑම කවුළුවක් සමඟම ගිණුමක් පමණක් වාර්තා කරයි) හෝ අවම වශයෙන් `expiringCreditMinUsedPercent` (50) භාවිතා කර ඇති ගිණුමක `expiringCreditHours` (24) ඇතුළත කල් ඉකුත් වන ණයක්.
5. ස්වභාවික යළි පිහිටුවීමේ ආරක්ෂකය: බිත්ති සහිත පැය 5ක කවුළුව `sessionResetGuardMinutes` (90) තුළ යළි පිහිටුවන විට හෝ බිත්ති සහිත සතිපතා කවුළුව `weeklyResetGuardHours` (12) තුළ ඇති විට මඟ හරින්න.
6. සතිපතා මහල: සතිපතා ඉතිරිය `weeklyFloorPercent` (10) ට වඩා අඩු වූ විට පැය 5ක යළි පිහිටුවීම මඟ හරින්න.
7. `last-resort` මාදිලිය: එකම සැපයුම්කරුගේ තවත් විෂය පථයේ ගිණුමක අවම වශයෙන් `poolHeadroomPercent` (10) කවුළු දෙකෙහිම ඉතිරිව තිබියදී මඟ හරින්න. කල් ඉකුත්වන ණය ප්‍රේරක මෙය මග හරියි.
8. `dry-run` පේළියක් වාර්තා කරන අතර කිසිවක් මුදා නොගනී; `last-resort` සහ `eager` මුදා හරින්න.

අස්ථානගත වූ කෝටා දත්ත කිසි විටෙක මුදා හැරීමක් අගුළු හරිනු නොලැබේ: නොදන්නා යළි පිහිටුවීමේ වේලාවක් හෝ සතිපතා භාවිතය මඟ හැරේ.

**Claude සැසි යළි පිහිටුවීම:** විශේෂාංගය අක්‍රිය හෝ `claudeSessionReset` ක්‍රියා විරහිත වීමත් සමඟ, එක් ගිණුමකට `autoLimitReset` ටොගලය පෙර පරිදිම තීරණය කරයි. දෙකම ක්‍රියාත්මක වීමත් සමඟ, විශේෂාංගය එක් ගිණුමකට ටොගල් ප්‍රතිස්ථාපනය කරයි: විෂය පථය තුළ ගිණුමකට හිමිකම් පෑ හැක්කේ ප්‍රතිපත්තිය එයට ඉඩ දෙන විට පමණක් වන අතර `dry-run` ප්‍රකාරයේදී හිමිකම් පෑමක් සිදු නොවේ.

**ආරක්ෂාව:** රැකියාව එක් ටික් එකකට වැඩිම ණයක් ලබා ගනී, ණය ලැයිස්තුගත කිරීමට පෙර තීරණය කරයි (මඟ හැරිය ගිණුමක් කිසි විටෙක ලැයිස්තුගත නොකෙරේ), idempotency යතුරු `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` භාවිතා කරයි, සහ අසාර්ථක ලැයිස්තුගත කිරීමකින් හෝ මුදා හැරීමකින් පසු පැය 1කට ගිණුමක් අක්‍රිය කරයි. සෑම මුදා ගැනීමක්ම, අසාර්ථක වීම සහ වියළි ධාවන තීරණයක් `audit_log` වෙත ලියා ඇත (`action: "bankedReset.redeem"`, ටෝකන හෝ ණය හැඳුනුම්පත් නැත); එම පේළි වලින් හිස්වැසුම් ගණන් කරනු ලැබේ, එබැවින් ඒවා නැවත ආරම්භ කිරීමෙන් බේරී ඇත. සාර්ථක මුදාගැනීම් `provider.reset_redeemed` webhook ද ගිනි දමයි.

ප්‍රතිගාමී ආරක්ෂකයින්: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### සැසි සම්බන්ධතාවය (#7274)

**විෂය පථය:** එක් සේවාදායක සැසියක් (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ශීර්ෂකය) එක් සම්බන්ධතාවයකට අමුණා ඇත,** ඕනෑම** සපයන්නා.

**අරමුණ:** ඉල්ලීම් හරහා එකම ගිණුමේ බහු-හැරවුම් නියෝජිතයකු (Claude කේතය, සහායක, අභිරුචි නියෝජිතයන්) තබා ගැනීම, හරස් ගිණුම් සන්දර්භ අලාභය අඩු කිරීම සහ එක් ගිණුමකට සැසි තත්ත්වය සහිත සැපයුම්කරුවන් මත නැවත නැවතත් සීතල-ආරම්භක 429s.

**ක්රියාත්මක කිරීම:**

- TTL විභේදනය: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- පින් selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ශීර්ෂ නිස්සාරණය (සාමාන්‍ය, ඕනෑම සැපයුම්කරුවෙකු): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- දිගටම පවතින පින් වගුව: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- සැකසීම: `sessionAffinityTtlMs` (ms හි ගෝලීය TTL, `0` අක්‍රිය) — `src/lib/db/settings.ts`. සංක්‍රමණ `124_generic_session_affinity_ttl.sql` මගින් Codex-only `codexSessionAffinityTtlMs` වෙතින් නැවත නම් කර ඇත, එය නව පෙරනිමිය ලෙස කලින් වින්‍යාස කර ඇති ඕනෑම Codex TTL මත ගෙන යයි.

#7274 පෙර, `0` `codex` සෑම සැපයුම්කරුවෙකු සඳහාම `resolveSessionAffinityTtlMs()` දැඩි ඇප ලබා දී ඇත, එබැවින් TTL සැකසුම (සහ සැසි ශීර්ෂයන්) අන්‍ය තැන්වල කිසිදු බලපෑමක් නැතත්, පින් කිරීමේ යාන්ත්‍රණය සහ ශීර්ෂ නිස්සාරණය දැනටමත් සැපයුම්කරු-අඥෙයවාදී විය. නිවැරදි කිරීම එම කලින් ආපසු පැමිණීම ඉවත් කරන ලදී; TTL දැන් ගෝලීය වශයෙන් `0` ඉහළින් පිහිටුවා ඇති සෑම සැපයුම්කරුවෙකුටම එකසේ අදාළ වේ.

සැසි-සම්බන්ධතා ශීර්ෂ තුන කිසි විටෙක යොමු නොකෙරේ upstream — ක්‍රියාත්මක කරන්නන් සේවාලාභී ශීර්ෂ හරහා ගමන් කරනවාට වඩා මුල සිටම ඔවුන්ගේම උඩුගං ශීර්ෂ ගොඩනඟයි, එබැවින් මෙය අභ්‍යන්තර සහසම්බන්ධතා හැඳුනුම්පතක් පමණක් පවතී.

### සුවිශේෂී කළමනාකරණය කළ සැසි සම්බන්ධතා කල්බදු

**විෂය පථය:** එක් සක්‍රිය කළමනාකරන HTTP client/session එකකට සුදුසුකම් ඇති OmniRoute සම්බන්ධතාවයක් ඇත.

**අරමුණ:** ඉල්ලීම් හරහා දෘඪ මාර්ගගත වැටක් අවශ්‍ය සේවාලාභීන් සඳහා කල්පවත්නා අනන්‍ය සම්බන්ධතා හිමිකම ලබා දීම. මෙය මෘදු අඛණ්ඩ මනාපයක් වන සැසි සම්බන්ධතාවෙන් වෙනස් වේ: SQLite හි සුවිශේෂී කල්බදු ජීවන චක්‍ර තත්ත්වය පවතිනු ඇත, ගෝලීය සක්‍රීය හිමිකරු සහ සක්‍රිය-සම්බන්ධතා සුවිශේෂත්වය බලාත්මක කරයි, සහ සැපයුම්කරු යැවීමට පෙර පරණ පරම්පරාවක් ප්‍රතික්ෂේප කරයි.

විශේෂාංගය API යතුරකට තෝරා ගැනීමයි. කළමනාකරණය කළ යතුරක `lease:exclusive` විෂය පථය සහ පැහැදිලි හිස් නොවන `allowedConnections` ලැයිස්තුවක් තිබිය යුතුය. ඕනෑම HTTP සේවාදායකයෙකුට ජීවන චක්‍ර අන්ත ලක්ෂ්‍යය භාවිතා කළ හැක; සේවාලාභියාගේ නම, පරිශීලක නියෝජිතයා, සැපයුම්කරු, OAuth ක්‍රමය හෝ ආකෘතිය අවශ්‍ය නොවේ. ලීසිං සතුව ඇත්තේ සම්බන්ධතාවයක් මිස ආකෘතියක් නොවේ, එබැවින් සම්බන්ධතාවය සාමාන්‍යයෙන් සුදුසු වන අතර ආකෘතිය වෙනස් කිරීමක් බැඳීම රඳවා ගනී. සාමාන්‍ය මාදිලිය, කෝටාව, සෞඛ්‍යය, සිසිල් කිරීම සහ අවසර ලැයිස්තු නීති බලධාරීව පවතින අතර එම පරම්පරාවම වෙනත් නොමිලේ සුදුසුකම් ලත් සම්බන්ධතාවයකට සංක්‍රමණය විය හැක.

JSON ක්‍රියා `acquire`, `renew`, සහ `release` සමඟ ජීවන චක්‍රය `POST /api/v1/session-leases` වේ. කළමනාකරණය කරන ලද අනුමාන ඉල්ලීම් පාරාන්ධ `X-OmniRoute-Lease-Owner` අගය සහ නිශ්චිත `X-OmniRoute-Lease-Generation` ඉදිරිපත් කරයි. හිමිකරු `vlo_` භාවිතා කරයි, පසුව base64url අක්ෂර 43; එහි SHA-256 හැෂ් පමණක් ගබඩා කර ඇත. සෑම අවසාන යැවීමේ වැටක්ම සත්‍යාපනය කරන ලද API යතුර ID සහ සක්‍රීය සම්බන්ධතාවය ID බන්ධනය කරයි. කල්බදු පාලන ශීර්ෂ ලොග, රඳවා ගත් ඉල්ලීම් ස්නැප්ෂොට් සහ උඩු ප්‍රවාහ ක්‍රියාත්මක ශීර්ෂ වලින් ඉවත් කරනු ලැබේ.

සාමාන්‍ය මාර්ගගත කිරීම සඳහා සුදුසුකම් ලත් කළමනාකරණ අපේක්ෂකයින් සිටී නම්, නමුත් සෑම නිදහස් අපේක්ෂකයෙකුම විදේශීය සක්‍රීය කල්බදුවක් මගින් වාඩිලාගෙන සිටී නම්, OmniRoute HTTP `429`, කල්බදු-ධාරිතාව-නොලබන කේතය, ධාරිතාව සඳහා රැඳී සිටීමේ තත්වයක් සහ මුල්ම අදාළ කල් ඉකුත්වීමෙන් ලබාගත් සීමා සහිත `Retry-After` ආපසු ලබා දෙයි. සාමාන්‍ය හිස් සුදුසුකම් යනු ලීසිං මතභේදයක් නොවන අතර එහි පවතින මාර්ගගත දෝෂ අර්ථකථනය තබා ගනී.

අදාළ යාන්ත්‍රණ වෙන්ව පවතී:

- OAuth සැසි පදිංචිය යනු OAuth ගිණුම් සඳහා ක්‍රියාවලි-දේශීය මෘදු බෙදා හැරීමකි.
- ගිණුම් semaphores ඉල්ලීම්-සමගාමී බලපත්‍ර ලබා දෙන අතර ඉල්ලීමක් සම්පූර්ණ වූ විට අවසන් වේ.
- සුවිශේෂී කළමනාකරණය කරන ලද සැසි කල්බදු යනු පරම්පරාවේ වැටක් සහිත කල් පවත්නා ජීවන චක්‍ර හිමිකමකි.

---

## 3. ආකෘති අගුලු දැමීම

**විෂය පථය:** සැපයුම්කරු + සම්බන්ධතාව + ආකෘති ත්රිත්වය.

**තත්ත්වය අනුව ප්රධාන විෂය පථය:** අසාර්ථක තත්ත්වය මඟින් අගුලු දැමීම ලියන යතුර තීරණය කරයි
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — quota හෝ entitlement සංඥාවක් — **quota family** අගුලු දමයි:
  codex සඳහා සම්පූර්ණ `codex` / `spark` විෂය පථය (සම්බන්ධතාවයේ සෑම `gpt-5*` ආකෘතියක්ම), අනෙකුත්
  සැපයුම්කරුවන් සඳහා `getQuotaScopedModelForProvider()`.
- `404` මඟින් bare model අගුලු දමයි (`getModelLockKey()` මඟින් `not_found` පටු කරයි).
- වෙනත් ඕනෑම තත්ත්වයක් — `5xx` ප්රවාහන/සේවාදායක අසාර්ථකතා සහ quality validation මඟින් OmniRoute විසින්ම
  නිර්මාණය කරන ලද `502` — **නිශ්චිත**
  provider/connection/model tuple එක පමණක් අගුලු දමයි. එක් ආකෘතියක නරක stream එකක් ගිණුමේ quota පිළිබඳ
  සාක්ෂියක් නොවේ; මෙම නීතියට පෙර `codex/gpt-5.6-luna` හි එක් හිස් ප්රතිචාරයක් මඟින් එම සම්බන්ධතාවයේ සෑම
  `gpt-5*` ආකෘතියක්ම මිනිත්තු 2–30කට (ක්රමයෙන් වැඩි වෙමින්) routing වෙතින් ඉවත් කළ අතර එහි quota
  නොවෙනස්ව පැවතුණි.
- caller කෙනෙකුගේ පැහැදිලි `scope` විකල්පය සැමවිටම ප්රමුඛ වේ (Antigravity `"exact"` යවයි).

**අරමුණ:** එක් ආකෘතියක් පමණක් නොතිබෙන විට හෝ quota-සීමා වූ විට සම්පූර්ණ සම්බන්ධතාවයක් අක්රිය කිරීම වැළැක්වීම.

**උදාහරණ:**

- `429` ආපසු ලබාදෙන එක්-ආකෘති quota සැපයුම්කරුවන්
- එක් නොමැති ආකෘතියක් සඳහා `404` ආපසු ලබාදෙන දේශීය සැපයුම්කරුවන්
- සැපයුම්කරු-විශේෂිත mode/model අවසර අසාර්ථකතා (උදා: Grok modes)

**ක්රියාත්මක කිරීම:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### ආකෘති සිසිලන පුවරුව (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

සක්රිය අගුලු දැමීම් සමඟ: provider, connection, model, reason, expiresAt ලැයිස්තුගත කරයි. ක්රියාකරුවන්ට card එකෙන් ආකෘතියක්
අතින් නැවත සක්රිය කළ හැක.

**REST API:**

- `GET /api/resilience/model-cooldowns` — සක්රිය අගුලු දැමීම් ලැයිස්තුගත කරයි
- `DELETE /api/resilience/model-cooldowns` — අතින් නැවත සක්රිය කිරීම. Body: `{provider, connection, model}`. Auth: management.

### සිසිලන කළමනාකරු

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

එක් එක් සැපයුම්කරුගේ පිටුව විවෘත කිරීම වෙනුවට, තාවකාලික හේතුවක් නිසා routing වෙතින් ඉවත් කර ඇති සෑම සම්බන්ධතාවයක් සඳහාම
එක් පිටුවක්. එය සම්බන්ධතා සිසිලන තත්ත්වයන්, ආකෘති අගුලු දැමීම් සහ terminal
තත්ත්වයන් ලැයිස්තුගත කරයි; එක් සම්බන්ධතාවයකට, තේරීමකට හෝ සැපයුම්කරුවෙකුගේ සියලු සම්බන්ධතා සඳහා ඒවා ඉවත් කරයි;
එසේම වැඩිපුරම සකස් කරන ලද සිසිලන නීති සංස්කරණය කරයි: `streamStallCooldown.enabled` සහ OAuth / API-key
`connectionCooldown` මූලික සිසිලනය සහ උපරිම backoff පියවර ( `PATCH /api/resilience` හරහා සුරකියි).
Terminal තත්ත්වයන් (`banned`, `expired`, `credits_exhausted`) ලැයිස්තුගත කරනු ලබන නමුත් මෙහි කිසිවිටෙක ඉවත් නොකෙරේ.

එම පිටුවේ ඇති **Error cooldown rules** card එක, `PATCH /api/settings` හරහා operator error rules
(`settings.providerErrorRules`) සහ එක් එක් සැපයුම්කරු සඳහා වන catch-all defaults
(`settings.providerErrorDefaults`) සංස්කරණය කරයි — ඒවා ගැළපෙන ආකාරය සඳහා §7 යටතේ ඇති "Operator-declared
rules" බලන්න. කාලසීමා Default (නිශ්චිත සිසිලනයක් නැත), විනාඩි 30,
පැය 1, පැය 5, පැය 24 හෝ විනාඩි 1 සිට 43,200 දක්වා (දින 30) අභිරුචි අගයක් විය හැක.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — තත්ත්වය, ඉතිරි සිසිලන කාලය,
  backoff මට්ටම, අවසන් දෝෂ වර්ගය සහ ආකෘති අගුලු දැමීම් සහිත සම්බන්ධතා (අක්තපත්ර නොමැතිව)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` හෝ
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` ආපසු ලබාදෙයි

### අගුලු දැමීමේ සැකසුම් UI + සාර්ථකත්වය මත ක්ෂය වන ප්රතිසාධනය (v3.8.23)

ආකෘති අගුලු දැමීම සැමවිටම සක්රිය වූ hardcoded හැසිරීමක සිට, තමන්ගේම සැකසුම් card එකක් සහ ස්වයං-ප්රතිසාධන මාර්ගයක් සහිත,
සම්පූර්ණයෙන් වින්යාස කළ හැකි, opt-in විශේෂාංගයක් බවට පත්විය.

**සැකසුම් card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
මෙය ඉහත ඇති read-only `ModelCooldownsCard` වෙතින් **වෙනස්** වේ (එය සක්රිය අගුලු දැමීම් _ලැයිස්තුගත_ කිරීම පමණක් කරයි) —
නව card එක _පරාමිතීන් වින්යාස කරයි_. පෙරනිමි අගයන් `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) තුළ පවතී:

| Setting                 | Default                          | Meaning                                                          |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `enabled`               | `false`                          | ප්රධාන toggle — ආකෘති අගුලු දැමීම **පෙරනිමියෙන් අක්රියයි**.      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | ආකෘති-විෂය පථගත අසාර්ථකතාවක් ලෙස සැලකෙන upstream තත්ත්වයන්.      |
| `baseCooldownMs`        | `120_000` (120 s)                | පළමු අසාර්ථකතාව සඳහා ආරම්භක අගුලු දැමීමේ කාලසීමාව.               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | වැඩි කළ සිසිලනය සඳහා උපරිම සීමාව.                                |
| `maxBackoffSteps`       | `10`                             | ඝාතීය backoff වැඩි කිරීමේ උපරිම පියවර ගණන.                       |
| `useExponentialBackoff` | `true`                           | නැවත නැවත සිදුවන අසාර්ථකතා සිසිලනය ඝාතීය ලෙස වැඩි කළ යුතුද යන්න. |

සැකසුම් සාමාන්ය settings store හරහා ස්ථිර කරනු ලබන අතර resilience settings schema හරහා වලංගු කරයි; card එක
`baseCooldownMs`/`maxCooldownMs` (`maxCooldownMs ≥ baseCooldownMs` සමඟ) සහ `maxBackoffSteps` සීමා කරයි.

**සාර්ථකත්වය මත ක්ෂය වන ප්රතිසාධනය:** ප්රතිසාධනය සම්පූර්ණයෙන්ම timer අවසන් වීම මත පමණක් රඳා නොපවතී. සෞඛ්ය සම්පන්න
ප්රතිචාරයක් මඟින් ආකෘතියේ අසාර්ථකතා ගණන පහළට ගෙන යයි; එබැවින් මධ්යම කාල කවුළුවකදී ප්රතිසාධනය වූ ආකෘතියක්
වැඩිවීම නවතා, timer එක අවසන් වීමට පෙරම නැවත සක්රිය වේ (සහ අගුලු දැමීම ඉවත් කරයි). සාර්ථක combo target එකකදී,
`open-sse/services/combo.ts`, `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) කැඳවයි; එය ගබඩා කර ඇති
`failureCount` අඩකින් අඩු කරයි (`Math.floor(failureCount / 2)`); එය `0` වෙත ළඟා වූ විට අගුලු දැමීමේ
entry එක සම්පූර්ණයෙන් මකා දමයි. ඊට ප්රතිවිරුද්ධ `recordModelLockoutFailure()` මඟින් escalation කවුළුව තුළ සිදුවන
අසාර්ථකතා මත ගණන වැඩි කරයි (සහ සිසිලනය වැඩි කරයි). මෙම සාර්ථකත්වය මත ක්ෂය වීම සාමාන්ය timer අවසන් වීමට අමතරව සිදුවේ —
මොනෑම මාර්ගයකින් ආකෘතියක් නැවත සක්රිය කළ හැක.

**තත්ත්වය:** lockout තත්ත්වයන් **මතකය තුළ** පවත්වාගෙන යයි (`ModelLockoutEntry` හි
`provider:connectionId:model` මගින් යතුරුගත කළ එක්-ක්රියාවලි `Map`s,
`provider:connectionId:exact:model` මගින් යතුරුගත කළ නිශ්චිත-පරාස lockout සඳහා), ඒවා
DB වෙත ස්ථිරව සුරැකෙන්නේ නැත — නැවත ආරම්භ කිරීමකදී ඒවා අහිමි වේ. _settings_ ස්ථිරව
සුරැකේ; සක්රිය lockout _state_ තාවකාලික වේ.

---

## 4. කෝටා-බෙදාගැනීමේ සමගාමී පාලනය (v3.8.36)

දායක ගිණුම් (GLM, MiniMax, ආදිය) බොහෝ විට පිළිගන්නේ ~ 1-3 සමගාමී ඉල්ලීම් පමණි; එය ඉක්මවා යාම 429s සහ cooldowns අවුලුවයි. මෙය උග්‍ර ය** කෝටා-කොටා** (`qtSd/…`) සංයෝජන, එහිදී API යතුරු කිහිපයක් එක් උඩුගත ගිණුමක් බෙදා ගනී. ස්ථර තුනක් බෙදාගත් ගිණුමක් ගංවතුරෙන් වළක්වයි.

### එක් සම්බන්ධතාවයකට සමගාමී සීමාව (`max_concurrent`)

එක් එක් සැපයුම්කරු සම්බන්ධතාවයකට `max_concurrent` සිවිලිමක් ප්‍රකාශ කළ හැකිය (`provider_connections.max_concurrent`, සම්බන්ධතා මාදිලියේ / API / DB). සීමාවක් නොමැතිව හිස්ව තබන්න. — පහළින් අනුක්‍රමික ස්තරය ධාවනය කරන තනි බොත්තම මෙයයි, එය ගිණුමේ සැබෑ සමගාමීත්වයට සකසන්න (උදා: GLM ~ 1, MiniMax ~ 2).

### එක් මාදිලියේ සමගාමී තොප්පි (`modelConcurrency`)

සම්බන්ධතාවයකට එහි `rateLimitOverrides` සිතියම තුළ එක් මාදිලියකට නිශ්චිත සමගාමී සිවිලිම් ප්‍රකාශ කළ හැක:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

සම්බන්ධතා මාදිලියේ එය සකසන්න (** අනුපාත සීමාව → එක් මාදිලියේ සමගාමී සීමාවන් අභිබවා යයි** , පේළියකට එක් `model=cap` ) හෝ එකම JSON හැඩය සහිත `PATCH /api/providers/[id]` හරහා. ප්‍රධාන අර්ථ ශාස්ත්‍රය:

- **සම්බන්ධතාවය-පුළුල් එදිරිව ආකෘතිය-විශේෂිත:** `maxConcurrent` හවුල් සම්බන්ධතා-පුළුල් සිවිලිම ලෙස පවතී. දෙකම අදාළ වන විට, ද්වාර දෙකම එකම සංයුක්ත ද්වාරය තුළ පරමාණුකව අත්පත් කර ගනී (`global → provider → account → model`); ඵලදායි හැසිරීම යනු දැඩි අදාළ සීමාවයි.
- **නිවැරදි මාදිලි-යතුරු ගැලපීම:** යතුර වන්නේ විභේදනය — රවුට් කිරීමෙන් පසු ක්‍රියාත්මක කරන්නා වෙත ලබා දෙන ආදර්ශ තන්තුව සාමාන්‍යයෙන් හිස් උඩු ප්‍රවාහ මාදිලියේ හැඳුනුම්පත (`glm-5`), සේවාලාභියාගේ පැත්තේ `provider/model` අන්වර්ථයක් නොවේ (`zai/glm-5` `glm-5` නොගැලපේ). අගයන් ධන නිඛිල සමගාමී ඉල්ලීම් සිවිලිම් වේ.
- **දේශීය පෝලිම්, සොයාගැනීමක් නැත:** අතිරික්ත ඉල්ලීම් පවතින queue/timeout අර්ථ ශාස්ත්‍රය සමඟ දේශීයව පෝලිම් වේ (ටයිප් කර ඇති `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ඇතුළත් කිරීමේ දෝෂ). OmniRoute upstream ප්‍රතිපත්ති — සොයා නොගනී හෝ අනුමාන නොකරයි, එය ක්‍රියාකරු විසින් වින්‍යාස කර ඇති නියම සිවිලිම් බලාත්මක කරයි. සංතෘප්ත ආදර්ශ ද්වාරයක් කිසිවිටෙක සපයන්නා අක්‍රිය නොකරන අතර කිසිවිටක ස්ථිර මාදිලියේ අගුලු දැමීමක් නිර්මාණය නොකරයි; upstream 429/cooldown/fallback හැසිරීම දෝෂය backstop ලෙස පවතී.
- **එක් සම්බන්ධතාවයකට, එක් ක්‍රියාවලියකට විෂය පථය:** caps එක් දත්ත සමුදා සම්බන්ධතාවයකට වන අතර මතකයේ රඳවා තබා ඇත, එබැවින් එකම upstream API යතුර නැවත භාවිතා කරන සම්බන්ධතා දෙකක් එකිනෙක සම්බන්ධීකරණය නොකරයි.
- **Unconfigured යන්නෙන් අදහස් වන්නේ වෙනස් නොවන බවයි:** සිතියම මඟ හැරීම (හෝ උපකරණ පුවරුවේ ක්ෂේත්‍රය හිස්ව තැබීම) ආදර්ශ ද්වාරය එකතු නොකරයි. කිසිදු විශ්ව සැපයුම්කරු සීමාවක් ප්‍රකාශ නොකර උදාහරණ වින්‍යාසය:

```text
glm-5=1
glm-4.7=3
```

### කෝටා-බෙදාගැනීම් ඉල්ලීම් අනුක්‍රමිකකරණය

කෝටා-කොටස් යැවීමක් ධනාත්මක `max_concurrent` ප්‍රකාශ කරන සම්බන්ධතාවයක් ඉලක්ක කරන විට, ඒ සඳහා සමගාමී ඉල්ලීම්** ගිණුම** එක් සම්බන්ධක සෙමාෆෝරයක් (යතුර `qsconn:<connectionId>`) හරහා අනුක්‍රමික වේ: අතිරික්ත ඉල්ලීම්** පෝලිමේ ඉන්න** ගිණුමට ගලා ඒම වෙනුවට. එය වේ** අසාර්ථක-විවෘත** — සන්තෘප්ත පෝලිමක් හෝ කල් ඉකුත්වීමක් කිසිවිටෙක යැවිය හැකි ඉල්ලීමක් ප්‍රතික්ෂේප කරනවාට වඩා ස්ලට් එකක් නොමැතිව ඉදිරියට යයි. ටොගල් කරන්න** සැකසීම් → ප්‍රත්‍යස්ථතාව → කෝටා-බෙදාගැනීමේ එක් සම්බන්ධතාවයකට සමගාමී** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, පෙරනිමිය ක්‍රියාත්මකයි). `max_concurrent` තොප්පියක් නොමැතිව හැසිරීම වෙනස් නොවේ.

> කෝටා-කොටා මාර්ගගත කිරීමේ ද්වාරය (`selectQuotaShareTarget`, DRR + P2C) එයම අසාර්ථක-විවෘත වන අතර එය දැඩි ලෙස සීමා කළ නොහැකි තනි සම්බන්ධතා සංචිතයක් සහිත at-cap connection — _deprioritizes_ පමණි, එබැවින් මෙම සෙමාෆෝරය ඇත්ත වශයෙන්ම ගංවතුර අඩංගු වේ.

### Combo cooldown-aware නැවත උත්සාහ කරන්න

සෑම Combo උපාය මාර්ගයක් සඳහාම (සක්‍රීය කර ඇති විට), SHORT තාවකාලික සිසිල් කිරීමක් සඳහා 429 ස්ඵටිකීකරණය කරන ලද ඉල්ලීමක් එය බලා සිටින අතර, මෙය Gemini-class TPM/RPM windows (~ 60s retry-after) ආවරණය කරන 429 — ආපසු ලබා දීම වෙනුවට නැවත-එවා යැවීම, combo- model two targetmos of combo 2 ඉලක්කම් මත. එක් මාදිලියකට අනුපාත සීමාව. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) මගින් සීමා කර ඇත** සැකසීම් → ඔරොත්තු දීමේ හැකියාව** . එය කිසි විටෙකත් `quota_exhausted` (මධ්‍යම රාත්‍රිය දක්වා අගුලු දමා ඇත) හෝ auth/not-found හේතු මත රැඳී නොසිටියි. `comboTimeoutMs` කට්ටලයක් සමඟ, එම කාලසීමාවට පෙර අවසන් කළ නොහැකි බලා සිටීමක් ආරම්භ නොවේ (#18998): කොම්බෝ එක `COMBO_TIMEOUT` 504 වෙනුවට එහි පර්යන්ත ප්‍රතිචාරය සමඟ එකවර පිළිතුරු දෙයි.

සංයෝජනයකට `config.comboCooldownWaitEnabled: false` සමඟින් ඉවත් විය හැක. වචනාර්ථයෙන් `false` පමණක් මෙම බෙදාගත් සංයුක්ත පොරොත්තු (පශ්චාත් යැවීමේ කූල්ඩවුන් සහ පෙර-ඩිස්පැච් circuit-open/model-lock රැඳී සිටීම්) සහ ඒවායේ පොරොත්තු-අයවැය කල් ඉකුත් වීමේ මහල දිගුව අක්‍රීය කරයි. අතුරුදහන් හෝ `true` ගෝලීය ප්‍රතිපත්තිය ආරක්ෂා කරයි; `true` ගෝලීය වශයෙන් ආබාධිත බලා සිටීම සක්‍රීය කළ නොහැක. පැහැදිලි `targetTimeoutMs` තවමත් ජය ගනී. මෙම ඉවත් වීම වෙනම දේශීය-කෝඩෙක්ස් හැරවුම්-පින් පෙර යැවීමේ පොරොත්තු වෙනස් නොකරයි.

එම ද්වාරයම පෙර යැවීමේ නඩුව (#16319) ආවරණය කරයි: සංයුක්තයක සෑම ඉලක්කයක්ම එහි ආකෘතිය කෙටි සංක්‍රමණික අගුලු දැමීමක පිහිටා ඇති නිසා ඕනෑම උත්සාහයක් කිරීමට පෙර මඟ හැරිය විට, ශුන්‍ය උත්සාහ මාර්ගය ඉඟියක්-අඩු `503 ALL_TARGETS_SKIPPED` වලට පිළිතුරු දීම වෙනුවට එම සිවිලිම් යට අගුලු දමා නැවත යවනු ලැබේ. රැඳී සිටීමට ඉඩ නොදෙන විට (සිවිලිම, උත්සාහය හෝ අයවැය අවසන් වූ විට, හෝ විශේෂාංගය ක්‍රියා විරහිත වූ විට), පර්යන්ත ප්‍රතිචාරය `429 rate_limit_error` රැගෙන `retry_after` / `reset_at` වෙත උත්ශ්‍රේණිගත වන්නේ මුල්ම තාවකාලික අගුල කල් ඉකුත්වීමෙන්; කෝටාව, සත්‍යාපනය සහ සොයාගත නොහැකි අගුල් ඉඟි-අඩු 503 තබා ගන්න.

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

## 5. ඉල්ලීම් පෝලිමට ඇතුළත් කිරීමේ පාලනය (v3.8.49 · ගැටලුව #6593)

**විෂය පථය**: ඉහත යාන්ත්රණ තුනට එක් ස්තරයක් පහළින් ඇති, දේශීය provider+connection එකකට අදාළ අනුපාත-සීමා පෝලිම (`open-sse/services/rateLimitManager.ts`,
Bottleneck මඟින් සහාය දක්වයි).

**`maxWaitMs` පෝලිමේ රැඳී සිටීම සීමා කරයි; `executionMaxWaitMs` ක්රියාත්මක කිරීම සීමා කරයි.**
මේ දෙක හිතාමතාම වෙන් කර ඇති අතර, එකක් අනෙකට බලපාන්නේ නැත.

`resilienceSettings.requestQueue.maxWaitMs` යනු **පෝලිම්-රැඳී සිටීමේ කාල අයවැයයි**: එය
provider slot එකක් සඳහා රැඳී සිටීමත්, ඉන්පසු QUEUED තත්ත්වයේ සිටීමත් ආවරණය කරන අතර, කාර්යය
QUEUED තත්ත්වයෙන් ඉවත් වී ක්රියාත්මක වීම ඇරඹෙන මොහොතේම එහි timer එක
ඉවත් කෙරේ (`rateLimitManager.ts`, `wrappedFn`). එය ඉක්මවන ඉල්ලීමක් කිසිවිටෙකත්
upstream වෙත ළඟා නොවේ. පෙරනිමි අගය 30000ms වන අතර, එය
`src/lib/resilience/settings.ts` හි `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
මඟින් සපයනු ලබන අතර
`tests/unit/ratelimit-admission-control-6593.test.ts` මඟින් ස්ථිර කර ඇත; එබැවින් එය වෙනස් කළහොත්
මෙම ඡේදය නිහඬව යල්පැනීමට ඉඩ නොදී එම පරීක්ෂණය අසමත් වේ.

`resilienceSettings.requestQueue.executionMaxWaitMs` යනු Bottleneck වෙත
කාර්යයේ `expiration` ලෙස ලැබෙන අගය වන අතර, එහි timer එක ආරම්භ වන්නේ dispatch කිරීමෙන් පසුව පමණි. එය
තමන්ගේම upstream timeout එකක් නොමැති executors සඳහා අවසාන ආරක්ෂාවක් වන අතර,
executor එකේම fetch-start timeout එක වඩා දිගු නම් එම අගය දක්වා වැඩි කෙරේ; එබැවින්
හොඳින් ක්රියාත්මක වන in-flight ප්රතිචාරයක් අතරමඟ නතර කිරීමට එයට නොහැකිය. පෙරනිමි අගය 600000ms (මිනිත්තු 10) වේ.

පෝලිම් අයවැය `expiration` වෙත ලබා දීම නිසා පෙරදී වර්ධක නොවන
gateways අතරමඟ නතර විය — ඒවා පළමු bytes ලැබීමට පෙර නීත්යානුකූලව මිනිත්තු ගණනක් ක්රියාත්මක විය හැක —
එම නිසා expiration එකක් `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ලෙස පෙන්වන අතර, පෝලිම් අයවැය
පෝලිම්-timeout code එක දරයි. `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) හෝ dashboard එකේ
(**සැකසීම් → ප්රත්යස්ථතාව**) හරහා ඕනෑම එකක් අභිබවා සකසන්න. සාමාන්යකරණයේදී දෙකම 1ms–24h අතරට සීමා කෙරේ.

**දෙකටම ප්රමුඛතා අනුපිළිවෙළ:** env var එක සපයන්නේ _පෙරනිමි_ අගය පමණි.
`resilienceSettings.requestQueue` තුළ ස්ථිරව ගබඩා කළ අගයක් (dashboard / API patch එකක් හරහා,
`key_value` තුළ ගබඩා කළ) එයට වඩා ප්රමුඛ වන අතර, connection එකකට අදාළ
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` අගයක් ඒ දෙකටම වඩා ප්රමුඛ වේ. ඒ නිසා
දැනටමත් ස්ථිරව ගබඩා කළ අගයක් ඇති deployment එකක env var එක සැකසීමෙන්
කිසිවක් වෙනස් නොවේ — ඒ වෙනුවට ස්ථිරව ගබඩා කළ සැකසුම ඉවත් කරන්න හෝ යාවත්කාලීන කරන්න.

පෝලිමේ රැඳී සිටීම `maxWaitMs` මඟින් සීමා කෙරේ; පහත `maxQueueDepth` මඟින්
එකවර පෝලිම්ගතව සිටිය හැකි callers ගණන සීමා කෙරේ.

**Body එකේ සඳහන් retries: වේග පාලනය සහ lockout අතර වෙනස.** 429 body එකකට තමන්ගේම රැඳී සිටීමේ කාලය
(Gemini `RetryInfo.retryDelay`, "තත්පර Nකට පසු නැවත උත්සාහ කරන්න" යන පාඨය) සඳහන් කළ හැකි අතර,
`updateFromResponseBody` එය කියවයි. connection එකේ `maxWaitMs` තුළ ගැළපෙන රැඳී සිටීමක්
වේග පාලනයකි: limiter එක එම කාලයට එහි reservoir එක හිස් කරන අතර එය නැවත පිරුණු විට පෝලිම්ගත calls
dispatch කෙරේ. `maxWaitMs` ට වඩා දිගු රැඳී සිටීමක් පෝලිමට බලා සිට අවසන් කළ හැකි දෙයක් නොවේ —
Gemini අවසන් වූ දෛනික quota එකකට
`retryDelay: "86399s"` ලෙස පිළිතුරු දෙයි. නැවත ගොඩනැගූ 429 (#16528) මත relay කළ `Retry-After`
දැනටමත් fallback engine එක එම කාල කවුළුව සඳහා model එක lock කිරීමට සලස්වයි; නමුත් ඒ වෙනුවෙන්
limiter එකත් pause කිරීමෙන්, key එක වෙත කලින් ළඟා වන ඕනෑම call එකක්
(උදාහරණයක් ලෙස resilience reset එකකට පසුව) සම්පූර්ණ `maxWaitMs` කාලය පුරාම තවමත් අඩාල වේ.
එවැනි රැඳී සිටීමක් type සහිත Google `RetryInfo`
detail එකකින් (`google_rpc_retry_info` provenance එකෙන්) පැමිණෙන විට සහ key එකේ limiter එක
දැනටමත් model එකට සීමා කර ඇති විට (`getLimiterKey` බලන්න), 429 එක ඒ වෙනුවට එම connection එකේ model
lockout එකක් බවට පත්වේ (`open-sse/services/rateLimitManager/bodyRetryPause.ts` තුළ
`lockModelForLongBodyRetry`, 24h දක්වා සීමා කර ඇත), සහ limiter එක pause නොකර තබයි.
Account තේරීම එම lock එක `isModelLocked()` හරහා මඟහරින අතර, connection එකට pin කර ඇති targets සඳහා
combo pre-dispatch gate එකත් එසේ කරයි. limiter එක quota family එකකට අදාළ වන antigravity හිදී, එහි වෙනත්
quota locks මෙන්ම lock එකත් නිශ්චිත model එක මත වේ. alias එකක් client ඉල්ලා සිටි නම එම model එකට resolve
කළේ නම් එම නමත් lock කෙරේ, මන්ද එම පරීක්ෂා requested name එක භාවිත කරයි; එය නිශ්චිතවම lock කෙරේ
(`lockExactModel`), එබැවින් antigravity quota family එකක් හෝ codex scope එකක් හරහා යන alias එකක් කිසිවිටෙකත්
තමන්වම lock නොකරයි. සාමාන්ය පාඨමය ඉඟියක්, type රහිත `retryDelay` එකක්, හෝ
මුළු connection එකම බෙදාගන්නා limiter එකක් pause එක පවත්වා ගනී. 429 path එක දැන් නැවත ගොඩනැගූ limiter එක
pause වන විට, pause එක අවසන් වීමට පෙර caller කෙනෙකුගේ ඉතිරි පෝලිම් කාලය අවසන් වන්නේ නම්,
එම කාලය ගෙවෙන තෙක් රැඳී සිටීම වෙනුවට පෝලිම්-timeout code එක සමඟ වහාම ප්රතික්ෂේප කෙරේ
(`checkLimiterPause`); සටහන් කළ අවසානය limiter එක ගොඩනැගීමට පෙර ඇති කාලයට නැංගුරම් කර ඇත,
මන්ද Bottleneck එහි refresh clock එක ආරම්භ කරන්නේ එහිදී වන අතර, reservoir එකට පසුව සිදු කරන ඕනෑම
වෙනසක් එය අමතක කරවයි. මෙය
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` සහ
`tests/unit/rate-limit-body-retry-pause.test.ts` මඟින් ආවරණය කර ඇත.

**`maxQueueDepth` — කැමැත්තෙන් සක්රිය කළ හැකි ඇතුළත් කිරීමේ සීමාව (නව).** `resilienceSettings.requestQueue.maxQueueDepth`
එක් provider+connection එකක් සඳහා එකවර පෝලිම්ගතව සිටිය හැකි (තවමත් dispatch නොකළ) ඉල්ලීම් ගණන
සීමා කරයි. පෝලිමේ දැනටමත් `maxQueueDepth`
ඉල්ලීම් තිබේ නම්, නව ඉල්ලීමක් `limiter.schedule()` වෙත කිසිසේත් ළඟා වීමට **පෙර**
type සහිත `code: "RATE_LIMIT_QUEUE_FULL"` දෝෂයක් සමඟ වහාම ප්රතික්ෂේප කෙරේ
— එබැවින් ප්රතික්ෂේප කිරීම අඩු වියදම් වන අතර, එම ඉල්ලීම සඳහා වන ඕනෑම downstream
prompt-compression / translation කාර්යයකට පෙර සිදුවේ. පෙරනිමි `0` =
අක්රියයි; එමඟින් දැනට පවතින සීමා රහිත පෝලිම් හැසිරීම රැකේ; සීමාව 0–100000 වේ.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) හෝ
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) හරහා අභිබවා සකසන්න.

ඇතුළත් කිරීමේ පරීක්ෂාවම pure function එකකි
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), එබැවින්
සැබෑ Bottleneck limiter එකක් නොමැතිව එය unit-test කළ හැක.

> #6593 විවෘත කළ RFC එක ද `bypassCompressionOnRateLimit` ධජයක්
> යෝජනා කළේය. මෙම repo එකේ `open-sse/services/compression/` pipeline
> එක යනු සෑදූ 429 body මත HTTP ප්රතිචාර සම්පීඩනය නොව, පිටතට යන LLM
> ඉල්ලීම මත prompt/context සම්පීඩනයයි (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` block එක වටා)
> — වචනාර්ථයෙන් bypass ධජයක් සඳහා ගැලපෙන කේත මාර්ගයක් නොමැත. එම
> prompt-සම්පීඩන පියවර ද දැනට ඉල්ලීම් pipeline එකේ `withRateLimit()` ට
> _පෙර_ ක්රියාත්මක වන බැවින්, පෝලිම-පිරුණු ප්රතික්ෂේපයක් මත එය
> මඟහැරීමට නැවත සැකසීම මෙම issue එකේ විෂය පථයට වඩා වෙනම, විශාල වෙනසකි;
> CPU-ඉතිරිකිරීමේ ලාභය නැවත සැකසීමේ අවදානමට වටී නම්, එය හිතාමතාම මෙහි
> ක්රියාත්මක **නොකර** පසු-අනුගමනයක් ලෙස ඉතිරි කර ඇත.

### Rate-Limit ස්වයංක්රීය-සක්රීය ආරක්ෂක ජාලය සහ සම්බන්ධතා ආරක්ෂණය (`rateLimitProtection`)

**ස්වයංක්රීය-සක්රීය ආරක්ෂක ජාලය** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, පෙරනිමි `true`):
පෙරනිමියෙන්, OmniRoute සියලුම සක්රීය API-key provider සම්බන්ධතා සඳහා (`getProviderCategory(provider) === "apikey"`) rate-limit පෝලිම් ආරක්ෂණය ස්වයංක්රීයව සක්රීය කරයි. මෙය rate-සංවේදී upstream API keys වෙත එන ඉල්ලීම් upstream 429 දෝෂවලට කඩා නොවැටී Bottleneck හරහා පෝලිම්ගත කර throttle කරන බව සහතික කරයි. ආරක්ෂක ජාලය `RATE_LIMIT_AUTO_ENABLE` පරිසර විචල්යය හරහා අභිබවා යා හැක (`false`/`0`/`off` අක්රීය කරයි, `true`/`1`/`on` බලෙන් සක්රීය කරයි), එය ගබඩා කර ඇති dashboard සැකසුමට (**Settings → Resilience** / `PATCH /api/resilience`) වඩා ප්රමුඛතාවය ගනී.

**සෑම සම්බන්ධතාවකටම `rateLimitProtection` හි අර්ථකථනය:**
සෑම සම්බන්ධතාවකටම rate-limit ආරක්ෂණය provider සම්බන්ධතාවල `rateLimitProtection` boolean ක්ෂේත්රය හරහා නිරීක්ෂණය කරනු ලැබේ (SQLite හි `rate_limit_protection` ලෙස ගබඩා කර ඇත):

- **පැහැදිලි ලෙස සක්රීය (`rateLimitProtection === true`)**: Provider කාණ්ඩය හෝ ස්වයංක්රීය-සක්රීය ආරක්ෂක ජාලය සක්රීය කර තිබීම නොසලකා, මෙම සම්බන්ධතාව සඳහා rate-limit ආරක්ෂණය පැහැදිලි ලෙස සක්රීය කර ඇත.
- **පැහැදිලි ලෙස අක්රීය (`rateLimitProtection === false`)**: පැහැදිලි ආරක්ෂණය අක්රීය කරයි, නමුත් සක්රීය API-key සම්බන්ධතාවක් ගෝලීය ස්වයංක්රීය-සක්රීය ආරක්ෂක ජාලයෙන් **ඉවත් නොකරයි**. `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) තුළ, `false` සහ `undefined` සමාන වේ: `rateLimitProtection === true` පමණක් පැහැදිලි අභිබවා යෑමක් ලෙස සලකනු ලැබේ. `rateLimitProtection` `false` (හෝ සකසා නොමැත) නම්, සක්රීය API-key සම්බන්ධතාවක් තවමත් ස්වයංක්රීය-සක්රීය කොන්දේසියට ගැළපෙන අතර rate-limit ආරක්ෂිතව පවතී.
- **සෑම සම්බන්ධතාවකටම ඉවත්වීමක් නොමැත**: අනෙක් ඒවා සඳහා ස්වයංක්රීය-සක්රීය ක්රියාත්මකව තබා ගනිමින්, "මෙම තනි සක්රීය API-key සම්බන්ධතාව rate-limit පෝලිම් ආරක්ෂණය නොමැතිව ක්රියාත්මක විය යුතුය" යනුවෙන් ක්රියාකරුවෙකුට දැනට ප්රකාශ කළ නොහැක. Rate-limit පෝලිම් නොමැතිව API-key සම්බන්ධතා සම්පූර්ණයෙන්ම ක්රියාත්මක කිරීමට, ආරක්ෂක ජාලය ගෝලීයව අක්රීය කළ යුතුය (`RATE_LIMIT_AUTO_ENABLE=false` හෝ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**සහාය දක්වන ලිවීමේ මාර්ග:**

- **`POST /api/rate-limits`**: සම්බන්ධතාවක් සඳහා `rateLimitProtection` මාරු කිරීමට සහාය දක්වන කළමනාකරණ ලිවීමේ මාර්ගය (`{ connectionId: string, enabled: boolean }`). මෙය `enabled: true` සමඟ කැඳවීම පැහැදිලි ආරක්ෂණය සක්රීය කරයි; `enabled: false` සමඟ කැඳවීම පැහැදිලි ආරක්ෂණය ඉවත් කරයි (ස්වයංක්රීය-සක්රීය සක්රීයව තිබේ නම් සක්රීය API-key සම්බන්ධතා ගෝලීය ආරක්ෂක ජාලය යටතේ ආවරණය වී පවතී).
- **`PUT /api/providers/[id]`**: හිතාමතාම `rateLimitProtection` භාර නොගනී හෝ මාරු **නොකරයි** (#11278). `PUT /api/providers/[id]` හරහා provider සම්බන්ධතා metadata යාවත්කාලීන කිරීම කිසි විටෙක ගබඩා කර ඇති rate-limit ආරක්ෂණ තත්ත්වය වෙනස් නොකරයි.

---

## 6. මන්දගාමී ප්‍රවාහ ප්‍රවාහ මුරකරු (#9709)

විකල්ප `resilienceSettings.streamRecovery.throughputWatchdog` ආරක්ෂකයා තවමත් කොටස් යවන නමුත් වින්‍යාස කර ඇති ප්‍රයෝජනවත්-ප්‍රතිදාන අනුපාතයට වඩා පහළින් සහකාර ප්‍රතිදානය නිපදවන උඩු ප්‍රවාහයක් හඳුනා ගනී. එය ක්‍රියා විරහිත කල් ඉකුත්වීමෙන් හිතාමතාම වෙනස් වේ: හෘද ස්පන්දන සහ පාර-දත්ත ටයිමරය නැවත සකසන්නේ නැති අතර ප්‍රගතිය ලෙස ගණන් නොගනී. එය ප්‍රතිදාන ගුණාත්මක භාවය නොසලකා නිරපේක්ෂ ආරක්ෂිත සීමාවක් ලෙස පවතින දැඩි උත්සාහ කාල සීමාව (#9153) වෙතින් ද වෙනස් වේ.

මුර බල්ලාට ගබ්සා කිරීමට පෙර උණුසුම් කාල සීමාවක් සහ සම්පූර්ණ පෙරළීමේ කවුළුවක් අවශ්‍ය වේ. එය කතාබස් සම්පූර්ණ කිරීම් සහ ප්‍රතිචාර API ප්‍රතිදාන සිදුවීම් වලින් පෙළ ඩෙල්ටා ගණන් කරයි (කොන්සර්වේටිව් UTF-8 බයිට් ප්‍රොක්සියක්), භාවිතය-පමණක් සහ හිස් සිදුවීම් නොසලකා හරියි, සහ මෙවලම් ඇමතුම් හෝ තර්ක කිරීමේ සිදුවීම් පියාසර කරන අතරතුර විනිශ්චය අත්හිටුවයි. එය පෙරනිමියෙන් අක්‍රිය කර ඇති අතර `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` සමඟින් සක්‍රිය කළ හැක (එම env අගය පෙරනිමි — a saved `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean දිනයි; මෙම මාර්ගෝපදේශයේ ඉහළින් ඇති env-vs-dashboard ප්‍රමුඛතා සටහන බලන්න); කවුළුව, උණුසුම් කිරීම, අවම අනුපාතය සහ අවම මැනිය හැකි ප්රතිදානය සාමාන්ය ප්රත්යාස්ථතා-සැකසීම් සාමාන්යකරණ ස්තරය මගින් සීමා වේ.

සබල කළ විට, සක්‍රිය උඩු ගංවතුර උත්සාහයට පමණක් මුර බල්ලා ගබ්සාවක් යොදනු ලැබේ. ඕනෑම සේවාදායක-දෘශ්‍ය බයිටයකට පෙර, පවතින එකම ගිණුමේ මුල්-ප්‍රතිසාධන මාර්ගය උත්සාහය නැවත විවෘත කළ හැක. කැපවීමෙන් පසු, ප්‍රවාහය කිසි විටෙක අන්ධ ලෙස නැවත ධාවනය නොවේ; දැනට පවතින ආරක්ෂිත මැද-ප්‍රවාහ අඛණ්ඩ කොන්ත්‍රාත්තුවට පමණක් උපසර්ගයක් මැසීමට හැකිය. අවසන් කිරීම තනි පහරක් ලෙස පවතී, එබැවින් භාවිත ගිණුම්කරණය සහ සෙමාෆෝර් නිකුතුව අනුපිටපත් නොවේ.

---

## 7. Upstream තත්ත්වය නැවත ප්රකාශ කිරීම (වැරදි ලෙස දක්වන ලද quota දෝෂ)

**විෂය පථය:** තාවකාලික quota අවසන් වීමක් වැරදි HTTP තත්ත්වයක් සමඟ වාර්තා කරන එක් upstream gateway එකක්.

**අරමුණ:** වර්ගීකරණයට පෙර නොමඟ යවන තත්ත්වය නිවැරදි කිරීම, එවිට පහළ පරිභෝජකයන් (fallback engine, combo aggregation, client-facing response) දෝෂයේ සැබෑ නැවත උත්සාහ කළ හැකි ස්වභාවය දකිනු ඇත.

සමහර gateway මඟින් TEMPORARY quota අවසන් වීම non-retryable HTTP
තත්ත්වයක් සමඟ සංඥා කරයි. `agentrouter.org` සම්මත `429` වෙනුවට චීන body එකක්
(`用户额度不足` / `额度不足`) සමඟ `403` (සමහර විට `400`) ආපසු ලබා දෙයි. Claude
Code වැනි clients `403` ස්ථිර දෝෂයක් ලෙස සලකා session එක නවත්වන අතර, නිවැරදි කිරීමක්
නොමැති විට fallback engine එය quota event එකක් වෙනුවට `AUTH_ERROR` ලෙස වර්ගීකරණය
කරනු ඇත.

**ක්රියාත්මක කිරීම:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — එක් එක් provider සඳහා
  නීති ලැයිස්තුවක් (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` හරහා ගැළපේ.
- Call site: `open-sse/handlers/chatCore.ts` හි `providerFailure:` block එක
  (line 3654 ආසන්නයේ), `parseUpstreamError()` මඟින් error HTTP status එකක් සහිත
  upstream response එකක් (`!providerResponse.ok`) විග්රහ කළ වහාම සහ ඕනෑම
  වර්ගීකරණයක් ක්රියාත්මක වීමට පෙරය. එබැවින් සෑම පහළ පරිභෝජකයෙකුටම නිවැරදි කළ
  තත්ත්වය පෙනේ. `200` SSE stream එකක් තුළ ඇතුළත් දෝෂ වෙනම, පසුව සිදුවන
  stream-parsing path එකක් අනුගමනය කරන අතර අද මෙම hook එකෙන් **ආවරණය නොවේ** —
  මෙය දැනට දන්නා සීමාවකි; error HTTP status එකක් ලෙස මතු වන agentrouter හි
  misstatus සඳහා තවම අවශ්ය නොවේ.
- Retry eligibility: `429` `RETRY_AFTER_ELIGIBLE_STATUSES` තුළ ඇත
  (`open-sse/services/combo/unavailableRetryGate.ts`), එබැවින් restated error එකක්
  dead `403` එකක් ලෙස මතු වීම වෙනුවට සැබෑ retry window එකක් රැගෙන යයි.
- Synthetic `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) යනු
  restated response එක **client** වෙත දන්වන කාලය පමණි; එය connection හි
  අභ්යන්තර cooldown/lockout කාලය නොවේ — එය restated error එක සැබැවින් හසුරුවන
  යාන්ත්රණය මඟින් වෙනම පාලනය වේ (Connection Cooldown හි වර්ධනය වන backoff,
  §2, API-key providers සඳහා මූලික `3s`; හෝ agentrouter වැනි per-model-quota
  providers සඳහා Model Lockout, §3). Router එක client වෙත ප්රචාරණය කරන 60s
  window එකට වඩා ඉක්මනින් අභ්යන්තරව නැවත උත්සාහ කිරීමට සුදුසු විය හැකිය — මෙය
  හිතාමතා තබන ලද headroom එකක් මිස bug එකක් නොවේ.

ස්ථිර දෝෂ (`无权访问模型` — මෙම model එකට ප්රවේශයක් නොමැත) කිසිවිටෙකත්
නැවත ප්රකාශ නොකරයි: `textMarkers` ගැළපුණත් `excludeMarkers` මඟින් rule එක
veto කරයි. එබැවින් දෝෂය එහි මුල් status එක තබා ගන්නා අතර කිසිවක් සදාකාලිකව
නැවත උත්සාහ නොකරයි. ගැළපෙන provider classification rule එක
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, ප්රකාශිත `6h` මූලික cooldown එකක්)
generic apikey-category `FORBIDDEN` early-return එකට _පෙර_
`checkFallbackError` (`open-sse/services/accountFallback.ts`) මඟින් පරීක්ෂා කරයි.
මෙය `honorsRuleLockScope(provider)` (#10334 — දැනට
`providerErrorRules.ts` හි `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist හරහා
agentrouter සඳහා පමණක් සක්රිය) මත සීමා වේ. Rule එකේ ප්රකාශිත 6h cooldown එක
`fallbackResult.baseCooldownMs` ලෙස ගලා යන නමුත්, එය තවමත් පවතින
per-model-quota lockout path එකට (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, cooldown source එක හැර #10334 මඟින් වෙනස් නොකළ)
යොමු වේ: අනෙකුත් සෑම model lockout එකක් මෙන්ම එය operator ගේ
`mlSettings.maxCooldownMs` (පෙරනිමිය `1_800_000ms` / 30min) දක්වා අඩු කරනු ලැබේ,
සහ _persisted lockout reason_ එක rule හි `"auth_error"` නොව, පෙරනිමියෙන්
hardcoded කර ඇති `"forbidden"` ලෙසම පවතී — සම්පූර්ණ ක්රියාවලිය පුරා ගරු කරන්නේ
cooldown කාලයට පමණි, reason string එකට නොවේ. Connection එකම සක්රියව පවතින අතර;
එම connection එකේ sibling models වෙත බලපෑමක් නොමැත.

Restated quota errors (`额度不足`) production තුළ provider rule එකකට ළඟා වේ
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, තමන්ගේම ප්රකාශිත cooldown එකක් නොමැත — persistence layer හි
scaled backoff default එක යෙදේ). #10334 සිට `ProviderErrorRuleMatch` හි
`scope` end-to-end භාවිත වේ, නමුත් **පමණක්**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist හි ඇති providers සඳහාය
(`providerErrorRules.ts` — අද `"agentrouter"` පමණි, `honorsRuleLockScope()` හරහා
සීමා කර ඇත). අනෙකුත් සෑම provider එකක් සඳහාම `scope` #10334 ට පෙර මෙන්ම
තොරතුරුමය පමණි. `checkFallbackError` ගැළපුණු rule එකේ scope එක
`fallbackResult.ruleScope` ලෙස මතු කරයි; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) යනු `ruleScope` එක connection-wide,
self-recovering signal එකක් ලෙස ගරු කිරීමට සැබැවින්ම ආරක්ෂිත බව තහවුරු කරන
හවුල් guard එකයි (scope `"connection"`, reason `quota_exhausted`, කිසිවිටෙක
`permanent` නොවේ, කිසිවිටෙක `creditsExhausted` නොවේ — අනාගත rule එකක්
scope `"connection"` සහ permanent account state එකක් සමඟ යුගල වීමෙන් ආරක්ෂා
කරන ක්රමයකි). එය පරිභෝජකයන් දෙදෙනෙකු විසින් කැඳවනු ලැබේ:

- **ස්ථායිකරණය** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider හි **එක්-මොඩලයකට** අදාළ lockout
  ශාඛාවට වැටීම වෙනුවට (agentrouter සතුව `passthroughModels: true` බැවින්
  `hasPerModelQuota()` මඟින් `true` ආපසු ලබා දෙයි), එය **තාවකාලික සම්බන්ධතා
  cooldown** එකක් යොදයි —
  `testStatus: "unavailable"` + `rateLimitedUntil`; කිසිවිටෙක අවසාන තත්ත්වයක්
  (`credits_exhausted`/`banned`/`expired`) නොවේ — එබැවින් අතින් credential reset
  කිරීමක් අවශ්ය නොවී cooldown කාලය අවසන් වූ පසු සම්බන්ධතාව ස්වයංක්රීයව
  නැවත යථා තත්ත්වයට පත් වේ.
  `disableCooling: true` සහිත සම්බන්ධතා සඳහා මෙය මඟ හැරේ (#2997): එම opt-out
  එක වෙනුවට per-model lockout වෙත වැටේ (ලේඛනගත trade-off එකක් —
  ශාඛාවට ඉහළින් ඇති code comment එක බලන්න).
- **එකම ඉල්ලීමේ combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): එම guard එක මඟින්
  සම්බන්ධතාවය in-memory `exhaustedConnections` set එකට ඇතුළත් කරයි, එය
  `${provider}:${connectionId}` මඟින් key කර ඇත. මෙය මඟ හරින්නේ,
  ඉතිරි SAME-REQUEST target එකක තමන්ගේම target object එකේ එම නිශ්චිත
  `connectionId` එක දැනටමත් තිබෙන විට පමණි
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  lookup එකට පෙර `if (provider &&
connectionId)`) — සාමාන්ය model-list combo එකක sibling targets සතුව තමන්ගේ
  ම pinned `connectionId` එකක් නොමැති බැවින්, එක් target එකක් පමණක් සෑම
  dispatch එකකදීම response හි
  `X-OmniRoute-Selected-Connection-Id` header එකෙන් resolve වන අතර, එය කිසිවිටෙක
  එම key match එකට නොපැමිණේ. එම සාමාන්ය අවස්ථාවේදී, ඉතිරි leg එකක් vừa
  අසාර්ථක වූ account එක නැවත භාවිත කිරීම වැළැක්වීමට ඇති සැබෑ ආරක්ෂාව මෙම Set
  එක නොවේ — එය ඉහත persistence layer එකයි (සම්බන්ධතාවයේ
  `rateLimitedUntil` දැන් අනාගත කාලයක පවතී), එයට අමතරව මෙම guard එක එම
  අසාර්ථකත්වය සඳහා `transientRateLimitedProviders` suppress කිරීමයි
  ( `targetExhaustion.ts` හි "Two-stage design" සහ
  `isAgentrouterConnectionQuotaScope` branch එකේ code comment බලන්න): එම Set එක
  mark නොකළ විට, `combo.ts` හි `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider හි ඉතිරි
  legs සඳහා ක්රියාත්මක නොවේ. එබැවින් credential selection හි
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) සාමාන්ය ලෙස
  ගරු කරනු ලබන අතර, ඉතිරි leg එක වෙනත්, තවමත්-සුදුසු agentrouter
  සම්බන්ධතාවයක් තෝරා ගනී හෝ credentials නොමැති බවට අසාර්ථක වේ — මෙම branch එක
  දැන් cooldown කළ සම්බන්ධතාවයට බලහත්කාරයෙන් නැවත නොයයි.

### අදියර දෙකක සැලසුම: තත්ත්වය නැවත ප්රකාශ කිරීම, ඉන්පසු වර්ගීකරණය

තත්ත්වය නැවත ප්රකාශ කිරීම (`upstreamStatusRestatement.ts`) සහ provider
වර්ගීකරණ නීති (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) යනු provider id සහ පෙළ සලකුණු මත පදනම් වන වෙනම
registries දෙකකි. එහෙත් ඒවා විවිධ ස්ථානවල ක්රියාත්මක වන අතර විවිධ අරමුණු
ඉටු කරයි: restatement මඟින් `chatCore.ts` තුළ HTTP status එක මුල් අවස්ථාවේදීම
නැවත ලියයි; classification rules මඟින්
`checkFallbackError()` (`open-sse/services/accountFallback.ts`) තුළ fallback
`reason` එක තෝරා `scope` (`model` / `provider` / `connection`) lock කරයි.

`providerErrorRules.ts` හි `FULL_TEXT_RULE_PROVIDERS` allowlist එකේ සඳහන්
providers සඳහා පමණක් classification rules සම්පූර්ණ error **text** එක දකී
(`额度不足` වැනි body markers ගැළපීමට මෙය අවශ්ය වේ) — දැනට `"agentrouter"` පමණි.
අනෙක් සෑම **built-in catalog** provider එකක් සඳහාම,
`checkFallbackError` මඟින් `getProviderErrorRuleMatch` වෙත ලබා දෙන්නේ
structured error (`{code, type}`) පමණි. එය header/status/code මත පදනම් වූ
rules සඳහා ප්රමාණවත් වුවත් body-text markers නොපෙනේ.
`resolveRuleMatchBody()` helper එක මෙම තේරීම සිදු කරයි: allowlist කර ඇති
providers සඳහා සම්පූර්ණ error text එකත්, අනෙක් අයට structured error එකත් යොදා
ගනී. `FULL_TEXT_RULE_PROVIDERS` වෙත **built-in** provider එකක් එක් කිරීම
පැහැදිලි per-provider opt-in එකකි — ලැයිස්තුවේ නොමැති සෑම provider එකකම
default path එක byte-for-byte ලෙස නොවෙනස්ව තබා ගැනීමට එය පවතී.

Rule එකක `scope` (`model` / `provider` / `connection`) යනු
`FULL_TEXT_RULE_PROVIDERS` වෙතින් වෙනම opt-in එකකි:
`checkFallbackError` එය `fallbackResult.ruleScope` ලෙස පමණක් ඉදිරිපත් කරයි.
පසුව භාවිත කරන components එය තොරතුරුමය label එකකට වඩා වැඩි දෙයක් ලෙස ගරු
කරන්නේ එකම file එකේ ඇති `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist එකේ
සඳහන් providers සඳහා පමණි (`honorsRuleLockScope()` හරහා පාලනය වේ — අද
`"agentrouter"` පමණි). Provider එකක් එම allowlist එකේ සිටින විට
`scope: "connection"` match එකක් සැබවින්ම සිදු කරන්නේ කුමක්දැයි ඉහත
"Restated quota errors" බලන්න.

**#11104 — operator විසින් ප්රකාශ කරන rules allowlists දෙකම මඟ හරී.**
Operator කෙනෙකුට මෙම file එක සංස්කරණය නොකර runtime එකේදී
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) හරහා
per-provider rule එකක් ප්රකාශ කළ හැක. Operator rule එකක්
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` පිටුපසට සීමා කිරීම —
**default** built-in catalog rules වල හැසිරීම ආරක්ෂා කිරීමට අදහස් කළ allowlists —
දැනටමත් එහි ලැයිස්තුගත providers හැර සෑම provider එකක් සඳහාම settings
mechanism එක අක්රිය කරනු ඇත, මන්ද rule එක ප්රකාශ කිරීමම operator ගේ පැහැදිලි
opt-in එකක් වන බැවිනි. `resolveRuleMatchBody()` සහ `honorsRuleLockScope()`
දෙකම පළමුව `hasOperatorRuleForProvider()` පරීක්ෂා කරයි: operator rule එකක්
ඇති provider එකකට raw error text ලැබෙන අතර, එය allowlist එකක තිබේද නැද්ද
යන්න නොසලකා එහි ප්රකාශිත `scope` ගරු කරනු ලැබේ.

**Operator විසින් ප්රකාශ කරන rules** (`OperatorProviderErrorRule`): සෑම
rule එකකටම optional `status` එකක් සහ optional `match` එකක් ඇත
(`match` යනු error text හි ඇති සරල, case-insensitive substring එකකි; කිසිවිටෙක
RegExp එකක් නොවන බැවින් ReDoS ඇති කළ නොහැක), එසේම ඒ දෙකෙන් අවම වශයෙන් එකක්
සැකසිය යුතුය. දෙකම සකසා ඇති විට ඒවා AND ලෙස යෙදේ; field එකක් නොමැති නම්
එය ඕනෑම දෙයකට ගැළපේ. එබැවින් `{match: "insufficient_quota"}` මඟින් එම code
අඩංගු ඕනෑම status එකකට ගැළපේ. ගැළපෙන පළමු rule එක ජය ගනී.
`cooldownMs` උපරිම දින 30ක් පිළිගනී; සම්පූර්ණ rules ගණන උපරිම 50කි.

**සියල්ලට අදාළ පෙරනිමි අගයන්** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` හරහා සකසනු ලැබේ): `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs` මිනිත්තු 1 සිට දින 30 දක්වා විය හැක. ක්රියාකරුගේ නියමයක් හෝ built-in catalog නියමයක් නොගැළපුණු විට පමණක්, සහ 402, 403, 408, 429 तथा 5xx දෝෂ සඳහා පමණක් පෙරනිමි අගයක් යෙදේ. Request-shape දෝෂ (400, 404, 409, 413, 422) සහ හිස් 401 දෝෂ සඳහා ඒවාටම අදාළ හැසිරීම පවතී. පැහැදිලි `reason` එකක් නොමැති විට, `classifyError` කරන ආකාරයටම, තත්ත්වයෙන් reason එක ලබා ගනී. පෙරනිමි අගයක් ප්රකාශ කිරීම `hasOperatorRuleForProvider()` සඳහා ක්රියාකරුගේ නියමයක් ලෙස ගණන් ගන්නා බැවින්, එහි `scope` (පෙරනිමිය `"connection"`) ගරු කරනු ලැබේ. පෙරනිමි අගයක සැබෑ cooldown එක එහි `cooldownMs` සහ provider විසින් ලබා දෙන retry ඉඟිය (`Retry-After`, `x-ratelimit-reset` හෝ body තුළ ඇති reset ඉඟිය — connection-cooldown සැකසුමේ "use upstream retry hints" සක්රිය විට engine ගරු කරන එම ඉඟියම) අතරින් දිගු එක වේ. එබැවින් පෙරනිමියකට කෙටි upstream ඉඟියක් දිගු කළ හැකි නමුත් සැබෑ reset එකක් කෙටි කළ නොහැක. පැහැදිලි ක්රියාකරු නියමයක් එහි නිශ්චිත `cooldownMs` අගයම තබා ගනී. `markAccountUnavailable` තුළ ඇති connection-cooldown ආරක්ෂක සීමා කිසිදු නියමයකින් හෝ පෙරනිමි අගයකින් මඟහැරෙන්නේ නැත: සක්රිය, දිගු cooldown එකක් කිසිවිටෙක කෙටි නොකරන අතර terminal status එකක් කිසිවිටෙක නැවත ලියන්නේ නැත. `checkFallbackError` තුළ කලින් ක්රියාත්මක වන built-in text detectors (credits exhausted, daily quota, account deactivated) ඒවාට අදාළ වාක්ය ඛණ්ඩ සඳහා තවදුරටත් ප්රමුඛ වේ.

**දන්නා හිඩැස — `providerRuleRegistry` HTTP 400 සඳහා කිසිවිටෙක පරීක්ෂා නොකෙරේ.**
`checkFallbackError` හි `BAD_REQUEST` ශාඛාව status 400 සම්පූර්ණයෙන්ම තමන්ගේම pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, ආදිය `accountFallback.ts` තුළ) හරහා වර්ගීකරණය කර, ඉහළින් ඇති `configuredRule`/`getProviderErrorRuleMatch` ශාඛාවට ළඟා වීමට පෙර return කරයි.
`status: 400` සහිත built-in catalog rule එකක් (හෝ ක්රියාකරුගේ නියමයක්) syntax අනුව වලංගු වුවද කිසිවිටෙක ක්රියාත්මක නොවේ. අද වන විට පවතින කිසිදු නියමයක් 400 ඉලක්ක නොකරන බැවින් production තුළ කිසිවකට බලපෑමක් නැත — නමුත් අනාගත 400 නියමයක් සඳහා පළමුව මෙම ශාඛාව වෙනස් කළ යුතුය. එය නියමයක් එක් කිරීමට වඩා විශාල වෙනසකි (දැනට pattern-array හැසිරීම මත රඳා සිටින සෑම provider එකක් සඳහාම 400 නැවත වර්ගීකරණය කරන බැවින්) සහ තනි provider නියමයක් එක් කිරීමේ පරාසයෙන් පිටත වේ.

### quota වැරදි ලෙස සඳහන් කරන නව gateway එකක් එක් කිරීම

1. `statusRestatementRegistry` තුළ එක් rule array එකක් ලියාපදිංචි කරන්න
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   provider-විශේෂිතව තබන්න; `CREDITS_EXHAUSTED_SIGNALS` සමඟ ගැටෙන
   සාමාන්ය English වාක්ය ඛණ්ඩ කිසිවිටෙක නැවත භාවිත නොකරන්න
   (`open-sse/services/accountFallback.ts`).
2. නිවැරදි lock scope එක තෝරා ගැනීම සඳහා, අවශ්ය නම්
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) තුළ
   වර්ගීකරණ නියම ලියාපදිංචි කරන්න (`connection` යනු account-wide quota සඳහාත්,
   `model` යනු එක් model එකකට අදාළ දෝෂ සඳහාත් වේ). මෙම පියවර production තුළ
   සම්පූර්ණ error text එක අවශ්ය වන provider සඳහා පමණක් ක්රියාත්මක වේ
   (body markers): එම file එකේම `FULL_TEXT_RULE_PROVIDERS` වෙත provider id එක
   එක් කරන්න — එසේ නොමැති නම් `checkFallbackError` නියමයට ලබා දෙන්නේ
   ව්යුහගත `{code, type}` error එක පමණක් වන අතර body-text නියමයක් live traffic
   තුළ කිසිවිටෙක නොගැළපේ.
   `status`/`headers` මත පමණක් ගැළපෙන නියම (Opencode හෝ Minimax නියම වැනි)
   සඳහා මෙම opt-in අවශ්ය නොවේ. වෙනම, නියමය `scope: "connection"` ප්රකාශ කරන්නේ නම්
   සහ අරමුණ සැබෑ connection-wide cooldown එකක් හා එම request එකේම combo skip එකක්
   (තොරතුරුමය label එකක් පමණක් නොව) නම්, එම file එකේම
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` වෙත provider id එක එක් කරන්න — මෙය
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) තුළ
   `isAgentrouterConnectionQuotaScope()`-ආකාරයේ consumption සහ
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ක්රියාත්මක වීම පාලනය කරයි;
   එසේ නොමැති නම් `scope` තවදුරටත් `fallbackResult.ruleScope` හරහා ගලා යන නමුත්
   එය මත කිසිවක් ක්රියා නොකරයි.
3. `tests/unit/upstream-status-restatement.test.ts`
   සහ `tests/unit/agentrouter-error-rules.test.ts` ආදර්ශයට ගනිමින් unit tests
   එක් කරන්න (not-permanent / not-creditsExhausted guards ඇතුළුව, සහ — provider එකට
   allowlist එක අවශ්ය නම් — `resolveRuleMatchBody()` එම provider සඳහා පමණක්
   සම්පූර්ණ text එක ලබා දෙන බව තහවුරු කරන test එකක්ද ඇතුළුව).

`chatCore.ts`, `classifyError`, හෝ combo සඳහා වෙනස්කම් අවශ්ය නොවේ.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` තුළ ඇති provider (opencode family) IP-bucketed upstream ලෙස සලකනු ලැබේ (opencode free tier එක account-bucketed නොව IP-bucketed වේ — #9611 බලන්න): `quota_exhausted`
**හෝ** `rate_limit_exceeded` ලෙස වර්ගීකරණය කළ status-429 එකක්, අසමත් වූ connection එකේ අවසන් වරට දන්නා egress IP එකට ගැළපෙන අවසන් වරට allowlisted-family connection සෑම එකක්ම rotation එකට ඒවා උත්සාහ කිරීමට පෙර cooldown කරයි
— N-1 ලෙස නියත වශයෙන් අසමත් වන upstream calls වළක්වමින් (#10460/#10525 හි ආකාරයටම).
`rate_limit_exceeded` හිතාමතාම ඇතුළත් කර ඇත: `markAccountUnavailable`
path එකේදී opencode-විශේෂිත නියම කිසිවිටෙක නොගැළපේ (`checkFallbackError` වෙත headers/body ලබා නොදෙන අතර, opencode `FULL_TEXT_RULE_PROVIDERS` තුළද නැත). එබැවින් subscription-quota text ("monthly usage limit reached") අඩංගු body එකක් සහිත 429 එකක් `status_429` නියමයට ළඟා වීමට පෙර quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; පැය 1ක cooldown) මගින් `quota_exhausted` ලෙස වර්ගීකරණය වේ — quota-text නොමැති 429 එකක් (සාමාන්ය rate limiting) `status_429` නියමය හරහා `rate_limit_exceeded` ලෙස වර්ගීකරණය වී IP family එකද cooldown කරයි. Allowlisted provider එකක් සඳහා IP-bucketed rate limit එකක් exhausted quota එකකට සමාන signal එකකි. අවංක සීමාවන්:

- **හැකි උපරිම උත්සාහය**: lock එක `proxy_logs` වෙතින් (පැය 24ක කවුළුවක්, synchronous, cache නොමැතිව) connection එකේ අවසන් වරට දන්නා `egress_ip` විසඳයි. Cold cache (`egress_ip` කිසිදා probe කර නොමැති විට) හෝ row එකක් නොමැති විට → අසාර්ථක connection එක branch එක මඟින් තවදුරටත් cooldown කරනු ලැබේ (අද මෙන් record කරමින්), නමුත් sibling එකක් lock නොකෙරේ.
- **කිසිවිටෙක terminal නොවේ**: cooldown එක අලුත් කරමින් පවතින quota window එකකි (`testStatus: "unavailable"`); IP-level signal එකකින් permanent state එකක් කිසිවිටෙක derive නොකෙරේ. `disableCooling` connections branch එක සම්පූර්ණයෙන්ම මඟ හරියි.
- **allowlisted family එක සඳහා lock granularity වෙනස් වේ**: මෙය sibling optimization එකක් පමණක් නොව scope වෙනසකි. opencode යනු `passthroughModels` provider එකක් බැවින්, මෙම branch එකට පෙර 429 එකක් per-MODEL lockout එකක් ඇති කළේය; දැන් එය connection cooldown එකක් ඇති කරයි — කිසිදු sibling එකක් නොමැතිව තනි connection එකක් පමණක් ධාවනය කරන operator කෙනෙකු සඳහාද ඇතුළුව. `providerErrorRules.ts` හි `scope: "connection"` ලෙස opencode rule table එක දැනටමත් නිවැරදි බව ප්රකාශ කරන granularity එක මෙයයි; එහෙත් opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` තුළ නොමැති නිසා මෙතෙක් කිසිවිටෙක එය ක්රියාත්මක නොවීය. මෙම branch එක අසාර්ථක connection එකේ cooldown + `backoffLevel` තමන්ම ලියමින්, connection-scoped agentrouter branch එක අනුකරණය කර, return වේ — per-model block එක සහ පහත generic path එක කිසිවිටෙක ළඟා නොවේ.
- **Combo ඇතුළත් වේ**: agentrouter branch එක මෙන්ම, 429 එකකට combo caller කෙනෙකු යොදන `persistUnavailableState`/`isCombo` downgrade එක scope එක හිතාමතා නොසලකා හරියි. per-model lockout එක මෙම scope එකේ දුර්වල ආකාරයක් නොවේ; එය වැරදි unit එකයි: එය අවසන් වූ IP එක පිළිබඳ කිසිවක් නොකියන බැවින්, combo rotation එක sibling එකකට අනිවාර්යයෙන්ම අසාර්ථක වන call එක බැගින් යළි සිදු කරනු ඇත.
- **Sibling ආරක්ෂාව**: දැනටමත් terminal (banned/credits_exhausted) තත්ත්වයේ ඇති හෝ දැනටමත් දිගු cooldown එකක ඇති sibling එකක් කිසිවිටෙක overwrite නොකෙරේ.
- **Exclusive allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` පුළුල් කිරීම explicit owner decision එකකි; generic wiring නොමැත (pattern #10334/#10419). sibling query එක එම allowlist එකම bind කරයි; එය SQL literal එකක් ලෙස නැවත ලිවීමක් නොකරන බැවින්, එය පුළුල් කිරීම one-line change එකක් ලෙස පවතී.
- **Egress IP rotation, දෙපසටම**: lookup window එක (24h) egress-IP cache TTL එකට (5 min) වඩා බෙහෙවින් පුළුල් බැවින්, “last known IP” යනු ඉතිහාසය මිස වත්මන් තත්ත්වය නොවේ. connection එකක proxy එක window එක තුළ rotate වී ඇත්නම්, lock එකට සැබැවින්ම share වන IP එකක් **මඟ හැරිය හැක** (record කර ඇති IP එක අලුත්, තවමත් exhausted නොවූ IP එක වන බැවින්) — සහ ඒ හා සමානව, exhausted IP එකෙන් එතැන් පසු rotate වී ඉවත්ව ඇති sibling එකක් **cooldown කළ හැක**. දෙවන අවස්ථාව එම sibling එකට එක් cooldown window එකක පිරිවැයක් ඇති කරයි; මේ දෙකම history-based lookup එකක best-effort සීමා ලෙස පිළිගනු ලැබේ.
- **පිරිවැය**: `proxy_logs` හි සීමා කළ scans දෙකක් (`idx_pl_timestamp` හරහා window-filtered), 429 සිදුවන සංඛ්යාතයේදී පමණි. නව index එකක් නොමැත (migration 134 YAGNI). මධ්යම ප්රමාණයේ සැබෑ-traffic DB copy එකක් මත මිනුම් ගන්නා ලදී; high-throughput instance එකක් එම window එක තුළ සමානුපාතිකව වැඩි rows ප්රමාණයක් තබා ගනී.

## වෙනත් ඔරොත්තු දීමේ විශේෂාංග

- **මාර්ගගත කිරීමේ උපාය මාර්ග 22** (ප්‍රමුඛත්වය, බර කළ, රවුම්-රොබින්, සන්දර්භය-රිලේ, පුරවන්න-පළමු, p2c, අහඹු, අඩුවෙන් භාවිත, පිරිවැය-ප්‍රශස්ත, යළි පිහිටුවීම-දැනුවත් කිරීම, යළි පිහිටුවීම-කවුළුව, කල් ඉකුත්වන-පළමු, ප්‍රධාන කාමරය, කෝටා-බර, දැඩි-සසම්භාවී, ස්වයංක්‍රීය, lkgp, සන්දර්භය-ප්‍රශස්ත, කැචෙවියුෂන් බලන්න [AUTO-COMBO.md](../routing/AUTO-COMBO.md) —
- **නැවත සකසන්න-දැනුවත් මාර්ගගත කිරීම** (v3.8.0) — කෝටා යළි පිහිටුවීමේ වේලාව අනුව සම්බන්ධතාවලට ප්‍රමුඛත්වය දෙයි.
- **පසුබිම් මාදිලිය පිරිහීම** — ප්‍රතිචාර API `background: true` අවවාදය සමග සමමුහුර්ත කිරීමට පහත වැටේ.
- **ගතික මෙවලම් සීමාව හඳුනාගැනීම** මෙවලම් ගණන් කිරීමේ සීමාවන් පැමිණි විට — සැපයුම්කරුවන්ට පිටුබලය දෙයි.
- **හදිසි පසුබැසීම** `OMNIROUTE_EMERGENCY_FALLBACK` මගින් පාලනය වන — ; ක්‍රියාකරුවන්ට නැවත ආරම්භ කිරීමකින් තොරව විශේෂාංග කොඩි පිටුවෙන් එය අභිබවා යා හැක.

---

## නිදොස්කරණය

- Weighted combo එක `503 all_targets_cooling_down` ලෙස පිළිතුරු දේ (`Retry-After` සකසා ඇත, `diagnostics.excluded` සෑම ඉලක්කයක්ම `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` සමඟ ලැයිස්තුගත කරයි) → පොල එක වින්යාසගත කර සම්බන්ධ කර ඇත, සෑම ඉලක්කයක්ම ඔරොත්තු දැක්වීමේ ටයිමරයකින් බැහැර කර ඇති බවක් පමණි; `[COMBO] Weighted selection: every target excluded before dispatch — …` අවවාදය හේතු සහ ඉතිරි තත්පර සඳහන් කරයි. එම combo එකෙන්ම ලැබෙන `404 no_executable_targets` යනු කිසිදු ඔරොත්තු ටයිමරයක් සම්බන්ධ නොවූ බවයි (ධාවනය කිරීමට දෙයක් නැත, නැතහොත් සෑම ගිණුමක්ම ලබා ගත හැකි බව පරීක්ෂා කිරීමෙන් අසාර්ථක විය). `targetResolution.ts` හි එකතු කරන ලද බැහැර කිරීම් වලින් `open-sse/services/combo/pinRecovery.ts` හි ඉදිකර ඇත.
- සැපයුම්කරුවෙකුගේ සියලුම යතුරු මඟහරින ලදි → circuit breaker තත්ත්වය සහ සෑම සම්බන්ධතාවයකම `rateLimitedUntil`/`testStatus` යන දෙකම පරීක්ෂා කරන්න.
- යළි සැකසුම් කවුළුවෙන් පසු සැපයුම්කරු ස්ථිරවම බැහැර කර ඇත → `getStatus()`/`canExecute()` වෙනුවට අමු `state` කියවන කේතයක්.
- එක් යතුරක් අසාර්ථක වන නමුත් අනෙකුත් යතුරු වැඩ කළ යුතුය → circuit breaker වෙනුවට connection cooldown එකට මුල් තැන දෙන්න.
- එක් ආකෘතියක් පමණක් අසාර්ථක වේ → connection cooldown වෙනුවට model lockout එකට මුල් තැන දෙන්න.
- තත්ත්වය ස්වයං-ප්රතිසාධනය විය යුතු නමුත් වන්නේ නැත → අනාගත කාලරාමුවක් සහ කල් ඉකුත් වූ තත්ත්වය නැවුම් කරන කියවීමේ මාර්ගයක් තිබේදැයි පරීක්ෂා කරන්න. ස්ථිර තත්ත්ව සඳහා අතින් වෙනස්කම් අවශ්ය වේ.

---

## ධාවන කාලීන තත්ත්වය — නියෝජිත ඉක්මන් සඳහන

> නියෝජිත මාර්ගෝපදේශය 40k සන්දර්භ අයවැය යටතේ රැඳී සිටීම සඳහා `AGENTS.md` → "ඔරොත්තු දැක්වීමේ ධාවන කාලීන තත්ත්වය" වෙතින් වචනානුසාරයෙන් ගෙන එන ලදි (PR #12743). එය ඉහත කොටස්වල සංක්ෂිප්ත, නියෝජිතයා-මුහුණුවර දර්ශනයයි; අංකිත කොටස් සම්පූර්ණ සඳහන ලෙස පවතී.

OmniRoute හි සම්බන්ධ නමුත් වෙනස් තාවකාලික-අසාර්ථකත්ව යාන්ත්රණ තුනක් ඇත. මාර්ග හැසිරීම නිදොස්කරණය කරන විට ඒවායේ විෂය පථය වෙන වෙනම තබන්න. එක බැල්මක සිතියමක් සඳහා
[ස්ථර-3 ඔරොත්තු දැක්වීමේ රූපසටහන](../diagrams/exported/resilience-3layers.svg)
(මූලාශ්රය: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
බලන්න.

### සැපයුම්කරු පරිපථ විච්ඡේදකය

**විෂය පථය**: සම්පූර්ණ සැපයුම්කරු, උදා. `glm`, `openai`, `anthropic`.

**අරමුණ**: ඉහළ ගලායාම/සේවා මට්ටමින් නැවත නැවත අසාර්ථක වන සැපයුම්කරුවෙකු වෙත ගමනාගමනය යැවීම නැවැත්වීම, එවිට එක් අසෞඛ්ය සම්පන්න සැපයුම්කරුවෙකු සෑම ඉල්ලීමක්ම මන්දගාමී නොකරයි.

**ක්රියාත්මක කිරීම**:

- මූලික පංතිය: `src/shared/utils/circuitBreaker.ts`
- Chat දොරටු/ක්රියාත්මක වයරින්: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ධාවන කාලීන තත්ත්ව API: `src/app/api/monitoring/health/route.ts`
- බෙදාගත් ආවරණ: `open-sse/services/accountFallback.ts`
- ස්ථාවර තත්ත්ව වගුව: `domain_circuit_breakers`

**තත්ත්ව** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: සාමාන්ය ගමනාගමනයට අවසර ඇත.
- `DEGRADED`: මුල් අවවාද කලාපය — අසාර්ථකත්ව පහත වැටීමේ සීමාව පසු කළ නමුත් බ්රේකර් සීමාව තවම නොවේ; ගමනාගමනය තවමත් ගලා යයි, උපකරණ පුවරු අවවාදය පෙන්වයි. වලංගු සම්බන්ධතා පරීක්ෂණයක් හෝ නව අසාර්ථකත්වයක් නොමැති නිශ්ශබ්ද කවුළුවක් එය `CLOSED` වෙත ආපසු ගෙන එයි
  (`docs/architecture/RESILIENCE_GUIDE.md` හි කවුළුව ඇත).
- `OPEN`: සැපයුම්කරු තාවකාලිකව අවහිර කර ඇත; අමතන්නන්ට provider-circuit-open පිළිතුරක් ලැබේ
  නැතහොත් combo මාර්ගය වෙනත් ඉලක්කයකට මඟ හරියි.
- `HALF_OPEN`: යළි සැකසුම් කාලය ඉකුත් වී ඇත; පරීක්ෂණ ඉල්ලීමකට අවසර දෙන්න. සාර්ථකත්වය බ්රේකරය වසා දමයි, අසාර්ථකත්වය එය නැවත විවෘත කරයි.

**පෙරනිමි** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts` හි `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` හරහා පරිභෝජනය වේ →
`src/sse/handlers/chatHelpers.ts` හි `getCircuitBreaker(provider, …)`). සම්පූර්ණ-සැපයුම්කරු
බ්රේකරය `circuitBreakerThreshold` / `circuitBreakerReset` මත ක්රියාත්මක වේ:

| පැතිකඩය | පහත වැටෙන්නේ | විවෘත වන්නේ (`circuitBreakerThreshold`) | යළි සැකසීම (`circuitBreakerReset`) |
| ------- | -----------: | --------------------------------------: | ---------------------------------: |
| OAuth   |          `5` |                                     `8` |                              `60s` |
| API key |          `7` |                                    `12` |                              `30s` |
| Local   | (ව්යුත්පන්න) |                                     `2` |                              `15s` |

`PROVIDER_PROFILES` තවද `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) සහ `providerCooldownMs` (5/10/1 min) අර්ථ දක්වයි: මේවා
**විකල්ප ලෙස තෝරාගත හැකි ගෝලීය Provider Cooldown එකේ කවුළු දොරටුව** බලගන්වයි (`PROVIDER_COOLDOWN_ENABLED`, පෙරනිමිය වසා ඇත)
— `open-sse/services/providerCooldownTracker.ts` හි සැපයුම්කරු-මට්ටමින් ඇතුළත් කිරීමක්, `providerFailureWindowMs` තුළ `providerFailureThreshold` අසාර්ථකත්වයන්ට පසුව පමණක්
සිසිලනය ලෙස ගණනය වේ, පසුව `providerCooldownMs` තරම කාලයක් සිසිල වේ. මේවා සජීවී බ්රේකරයේ සීමාවන්
නොවේ — බ්රේකර් හැසිරීම අපේක්ෂා කරමින් ඒවා සකස් නොකරන්න. සෑම පෙරනිමියක්ම
`OMNIROUTE_PROVIDER_BREAKER_*` සහ `OMNIROUTE_CIRCUIT_BREAKER_*` පරිසර විචල්යයන් හරහා අභිබවා යා හැක;
ධාවන-නිවැරදි සඳහන් වගුව `docs/architecture/RESILIENCE_GUIDE.md` හි පවතී.

සැපයුම්කරු-මට්ටමින් අසාර්ථකත්ව තත්ත්ව පමණක් සැපයුම්කරු බ්රේකරය ක්රියාත්මක කළ යුතුය:

```ts
(408, 500, 502, 503, 504);
```

බොහෝ `401`, `403`, හෝ `429` අවස්ථා වැනි සාමාන්ය ගිණුම්/යතුරු/ආකෘති දෝෂ සඳහා සම්පූර්ණ-සැපයුම්කරු
බ්රේකරය ක්රියාත්මක නොකරන්න. ඒවා සාමාන්යයෙන් connection cooldown හෝ model
lockout වලට අයත් වේ. සාමාන්ය API-යතුරු සැපයුම්කරුවෙකුගේ `403` එකක්, අවසාන සැපයුම්කරු/ගිණුම්
දෝෂයක් ලෙස වර්ගීකරණය කර නොමැති නම්, ප්රතිසාධනය කළ හැකි එකක් විය යුතුය.

Breaker එක background timer එකක් නොව, lazy recovery භාවිතා කරයි. `OPEN` කල් ඉකුත් වූ විට, `getStatus()`, `canExecute()`, සහ `getRetryAfterMs()` වැනි reads state එක `HALF_OPEN` ලෙස refresh කරයි, එබැවින් dashboards සහ combo candidate builders කල් ඉකුත් වූ provider කෙනෙකු සදහටම බැහැර කර නොතබයි.

### සම්බන්ධතා Cooldown

**විෂය පථය**: එක් provider සම්බන්ධතාවයක්/ගිණුමක්/key එකක්.

**අරමුණ**: එකම provider සඳහා වෙනත් සම්බන්ධතා ඉල්ලීම් සැපයීම දිගටම කරගෙන යාමට ඉඩ දෙන අතරතුර, දෝෂ සහිත එක් key/ගිණුමක් තාවකාලිකව මඟ හැරීම.

**ක්රියාත්මක කිරීම**:

- ලිවීමේ/යාවත්කාලීන කිරීමේ මාර්ගය: `src/sse/services/auth.ts::markAccountUnavailable()`
- ගිණුම් තේරීම/පෙරීම: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown ගණනය කිරීම: `open-sse/services/accountFallback.ts::checkFallbackError()`
- සැකසුම්: `src/lib/resilience/settings.ts`

Provider සම්බන්ධතා මත ඇති වැදගත් ක්ෂේත්ර:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ගිණුම් තේරීමේදී, පහත කොන්දේසිය සත්ය වන අතරතුර සම්බන්ධතාවයක් මඟ හරිනු ලැබේ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns ද lazy වේ: `rateLimitedUntil` අතීතයේ ඇති විට, සම්බන්ධතාවය නැවත සුදුසුකම් ලබයි. සාර්ථක භාවිතයකදී, `clearAccountError()` විසින් `testStatus`, `rateLimitedUntil`, දෝෂ ක්ෂේත්ර, සහ `backoffLevel` ඉවත් කරයි.

පෙරනිමි සම්බන්ධතා cooldown හැසිරීම:

- OAuth මූලික cooldown: `5s`.
- API-key මූලික cooldown: `3s`.
- API-key `429` සඳහා ලබා ගත හැකි විට upstream retry ඉඟි (`Retry-After`, reset headers, හෝ parse කළ හැකි reset text) ප්රමුඛත්වය දිය යුතුය.
- නැවත නැවත ඇති වන නැවත ලබා ගත හැකි අසාර්ථකත්වයන් exponential backoff භාවිතා කරයි:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd ආරක්ෂකය, එකම සම්බන්ධතාවයක සමවිරිත (concurrent) අසාර්ථකත්වයන් cooldown එක නැවත නැවත දීර්ඝ කිරීමෙන් හෝ `backoffLevel` දෙවරක් වැඩි කිරීමෙන් වළක්වයි.

අවසාන (terminal) තත්ත්වයන් cooldowns නොවේ. `banned`, `expired` (`EXPIRED_RETRY_MAX` හරහා N සීමිත නැවත උත්සාහයන්ට පසුව පමණක් අවසාන වේ), සහ `credits_exhausted` යනු credentials/සැකසුම් වෙනස් වන තෙක් හෝ operator කෙනෙකු ඒවා reset කරන තෙක් නොලැබෙන ලෙස රැඳී සිටීමට අදහස් කර ඇත. අවසාන තත්ත්වයන් තාවකාලික cooldown තත්ත්වයකින් නැවත ලියන්න එපා.

### ආකෘති Lockout

**විෂය පථය**: provider + සම්බන්ධතාවය + ආකෘතිය.

**අරමුණ**: එම සම්බන්ධතාවය සඳහා එක් ආකෘතියක් පමණක් නොලැබෙන හෝ quota-සීමිත වූ විට, මුළු සම්බන්ධතාවයම අක්රීය කිරීම වළක්වා ගැනීම.

උදාහරණ:

- `429` ලබා දෙන ආකෘති-එකක quota providers.
- අස්ථානගත වූ එක් ආකෘතියක් සඳහා `404` ලබා දෙන දේශීය providers.
- තෝරාගත් Grok modes වැනි provider-විශේෂිත mode/model අවසර අසාර්ථකත්වයන්.

Model lockout `open-sse/services/accountFallback.ts` හි පිහිටා ඇති අතර, එකම සම්බන්ධතාවයට වෙනත් ආකෘතීන් සැපයීම දිගටම කරගෙන යාමට ඉඩ දෙයි.

### Debugging මඟ පෙන්වීම

- Provider කෙනෙකුගේ සියලුම keys මඟ හැර ඇත්නම්, provider breaker state එක සහ එක් එක් සම්බන්ධතාවයේ `rateLimitedUntil`/`testStatus` යන දෙකම පරීක්ෂා කරන්න.
- Reset window එකෙන් පසුව provider කෙනෙකු ස්ථිරවම බැහැර කර ඇති බව පෙනේ නම්, කේතය `getStatus()`/`canExecute()` භාවිතා කිරීම වෙනුවට අමු `state` කියවනවාදැයි බලන්න.
- එක් provider key එකක් අසාර්ථක වුවත් අනෙක් ඒවා ක්රියාත්මක විය යුතු නම්, provider breaker වලට වඩා සම්බන්ධතා cooldown එකට ප්රමුඛත්වය දෙන්න.
- එක් ආකෘතියක් පමණක් අසාර්ථක වුවහොත්, සම්බන්ධතා cooldown වලට වඩා model lockout එකට ප්රමුඛත්වය දෙන්න.
- තත්ත්වයක් ස්වයං-ප්රත්යාරෝපණය විය යුතු නම්, එයට අනාගත timestamp/reset timeout එකක් සහ කල් ඉකුත් වූ තත්ත්වය refresh කරන read path එකක් තිබිය යුතුය. ස්ථිර තත්ත්වයන්ට අතින් credential හෝ config වෙනස් කිරීම් අවශ්ය වේ.

---

## TLS Fingerprinting සහ Stealth

Provider-විශේෂිත stealth (JA3/JA4, CCH, obfuscation) වෙනම ලේඛනගත කර ඇත — `docs/security/STEALTH_GUIDE.md` බලන්න (git; `/docs` වෙත compile කර නොමැත).

---

## Resilience පරීක්ෂණ (Phase 8 · Block C)

Resilience තර්කනය සඳහා unit පරීක්ෂණවලින් ඔබ්බට, පරීක්ෂණ තුනක් සැබෑ stress/අසාර්ථකතා තත්ත්වයන් යටතේ runtime එක ක්රියාත්මක කරයි (සියල්ල integration/nightly — කිසිවක් PRs අවහිර නොකරයි):

| පරීක්ෂණය    | කුමක්ද                                                                                                                                                                                                   | ධාවනය                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream node එක සැබෑ latency/reset/timeout/503 එනේක්ෂණය කරයි; circuit breaker එක විවෘත වී/ප්රතිසාධනය වන බවත් `checkFallbackError` 503 නැවත ලබාගත හැකි fallback ලෙස වර්ගීකරණය කරන බවත් තහවුරු කරයි. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc` යටතේ `createSSEStream` එකකට streams ~500ක්; heap එක සීමාව ඉක්මවා වර්ධනය වුවහොත් අසාර්ථක වේ (OOM guard #3069).                                                                              | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health` වෙත අඛණ්ඩ load එක; p95/error සීමා.                                                                                                                                              | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) මගින් සම්බන්ධීකරණය කර ඇත. පෙරනිමි `test:integration` තුළ, chaos සහ heap ස්වයං-මඟහැරේ (`RUN_CHAOS_INT`/`--expose-gc` නොමැතිව).

---

## මෙයත් බලන්න

- [ගෘහ නිර්මාණ ශිල්ප මාර්ගෝපදේශය](./ARCHITECTURE.md) — පද්ධති ගෘහ නිර්මාණ ශිල්පය සහ අභ්යන්තර කරුණු
- [පරිශීලක මාර්ගෝපදේශය](../guides/USER_GUIDE.md) — Providers, combos, CLI ඒකාබද්ධ කිරීම
- [Auto-Combo එන්ජිම](../routing/AUTO-COMBO.md) — සාධක-16 ලකුණු කිරීම, mode packs
