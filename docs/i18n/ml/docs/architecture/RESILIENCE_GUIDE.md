# Resilience Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute മൂന്ന് വ്യത്യസ്തവും എന്നാൽ ബന്ധപ്പെട്ടതുമായ പ്രതിരോധ സംവിധാനങ്ങളുണ്ട്. ഓരോന്നിനും വ്യത്യസ്തമായ വ്യാപ്തിയും ലക്ഷ്യവുമുണ്ട്. റൂട്ടിംഗ് സ്വഭാവം ഡീബഗ്ഗ് ചെയ്യുമ്പോൾ അവ പ്രത്യേകം സൂക്ഷിക്കുക.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> ഉറവിടം: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **റെസിലൻസ് ടോഗിളുകൾക്കുള്ള എൻവി-വേഴ്സ്-ഡാഷ്ബോർഡ് മുൻഗണന.** — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — എന്നിവയിൽ നിന്ന് സീഡ് ചെയ്ത ഓപ്റ്റ്-ഇൻ റെസിലൻസ് ടോഗിൾ ചെയ്യുന്നത് _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) മാത്രമേ നൽകൂ. `resilienceSettings` ൽ ഒരു ബൂളിയൻ നിലനിന്നിരുന്നു (ഡാഷ്ബോർഡ് →** ക്രമീകരണങ്ങൾ → റെസിലിയൻസ്** / `PATCH /api/resilience`, `key_value` ൽ സംഭരിച്ചിരിക്കുന്നത്) env മൂല്യത്തെക്കാൾ വിജയിക്കുന്നു: നോർമലൈസേഷൻ (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) നിലവിലിരിക്കുന്നപ്പോഴെല്ലാം സംഭരിച്ച ബൂളിയൻ നിലനിർത്തുന്നു. ഡാഷ്ബോർഡ് `false` ഇതിനകം സംരക്ഷിച്ചിരിക്കുന്ന ഒരു വിന്യാസത്തിൽ അത്തരമൊരു env var `true` ആയി സജ്ജീകരിക്കുന്നു, അതിനാൽ ഒന്നും മാറ്റില്ല — ടോഗിൾ ഇൻ ഫ്ലിപ്പ് ചെയ്യുക** ക്രമീകരണങ്ങൾ → റെസിലിയൻസ്** (അല്ലെങ്കിൽ സംഭരിച്ച ഫീൽഡ് മായ്ക്കുക) പകരം.

## 1. പ്രൊവൈഡർ സർക്യൂട്ട് ബ്രേക്കർ

**പരിധി:** മുഴുവൻ പ്രൊവൈഡറും (ഉദാ., `glm`, `openai`, `anthropic`).

**ഉദ്ദേശ്യം:** അപ്സ്ട്രീം/സർവീസ് തലത്തിൽ ആവർത്തിച്ച് പരാജയപ്പെടുന്ന ഒരു പ്രൊവൈഡറിലേക്ക് ട്രാഫിക് അയയ്ക്കുന്നത് നിർത്തുക.

**നടപ്പിലാക്കൽ:**

- കോർ ക്ലാസ്: `src/shared/utils/circuitBreaker.ts`
- വയറിംഗ്: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- സ്റ്റാറ്റസ് API: `GET /api/monitoring/health`
- റീസെറ്റ് API: `POST /api/resilience/reset`
- റാപ്പറുകൾ: `open-sse/services/accountFallback.ts`
- DB ടേബിൾ: `domain_circuit_breakers`

**സ്റ്റേറ്റുകൾ:**

- `CLOSED` — സാധാരണ ട്രാഫിക് അനുവദനീയം
- `DEGRADED` — ട്രാഫിക് ഇപ്പോഴും അനുവദനീയമാണ്, എന്നാൽ വർധിച്ചുവരുന്ന പ്രൊവൈഡർ പരാജയങ്ങൾ ട്രാക്ക് ചെയ്യപ്പെടുന്നു; മതിയായ എണ്ണം വിജയങ്ങളിലൂടെയോ, സാധുവായ ഒരു കണക്ഷൻ ടെസ്റ്റിലൂടെയോ, അല്ലെങ്കിൽ അവസാനത്തെ പരാജയ തരത്തിനുള്ള ഏറ്റവും ദീർഘമായ `OPEN` ഹോൾഡിന് ശേഷം (അതിന്റെ `cooldownByKind` മൂല്യം, അല്ലെങ്കിൽ `resetTimeout`, × `maxBackoffMultiplier`, കുറഞ്ഞത് ഒരു കൂൾഡൗൺ) പുതിയ പരാജയമുണ്ടാകാതെ `CLOSED`-ലേക്ക് മടങ്ങുന്നു
- `OPEN` — പ്രൊവൈഡർ താൽക്കാലികമായി തടഞ്ഞിരിക്കുന്നു; കോംബോ റൂട്ടിംഗ് അതിനെ ഒഴിവാക്കുന്നു
- `HALF_OPEN` — റീസെറ്റ് ടൈംഔട്ട് കഴിഞ്ഞു; പ്രോബ് റിക്വസ്റ്റ് അനുവദനീയം

**കോൺഫിഗർ ചെയ്യാവുന്ന ഡിഫോൾട്ടുകൾ (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience-ൽ ലഭ്യം):**

| ക്ലാസ്  | ഡീഗ്രേഡഡ് ആകുന്നത് | ഓപ്പൺ ആകുന്നത് | റീസെറ്റ് ടൈംഔട്ട് |
| ------- | ------------------ | -------------- | ----------------- |
| OAuth   | 5 പരാജയങ്ങൾ        | 8 പരാജയങ്ങൾ    | 60s               |
| API-key | 7 പരാജയങ്ങൾ        | 12 പരാജയങ്ങൾ   | 30s               |
| Local   | കണക്കാക്കിയത്      | 2 പരാജയങ്ങൾ    | 15s               |

`degradationThreshold` ഒരു പ്രൊവൈഡർ എപ്പോൾ `DEGRADED`-ൽ പ്രവേശിക്കുമെന്ന് നിയന്ത്രിക്കുന്നു; `failureThreshold` അത് എപ്പോൾ ഓപ്പൺ ആകുകയും ഒഴിവാക്കപ്പെടുകയും ചെയ്യുമെന്ന് നിയന്ത്രിക്കുന്നു. ലോക്കൽ പ്രൊവൈഡർ പ്രൊഫൈലുകൾ ഇതുവരെ Resilience ക്രമീകരണങ്ങൾ പേജിൽ ലഭ്യമാക്കിയിട്ടില്ല.

**ട്രിപ്പ് കോഡുകൾ:** പ്രൊവൈഡർ-തല സ്റ്റാറ്റസുകൾ മാത്രം `[408, 500, 502, 503, 504]`. അക്കൗണ്ട്-തല പിശകുകൾക്ക് ട്രിപ്പ് ചെയ്യരുത് (മിക്ക 401/403/429-ഉം — അവ കൂൾഡൗണിന്റെയോ ലോക്ക്ഔട്ടിന്റെയോ പരിധിയിലാണ്).

**ലേസി റിക്കവറി:** `OPEN` കാലഹരണപ്പെടുമ്പോൾ, `getStatus()`, `canExecute()`, `getRetryAfterMs()` എന്നിവ സ്റ്റേറ്റ് `HALF_OPEN` ആയി പുതുക്കുന്നു. അതേ റീഡുകളും (അടുത്ത പരാജയവും) പഴഞ്ച `DEGRADED`-നെ വീണ്ടും `CLOSED`-ലേക്ക് താഴ്ത്തുന്നു. ബാക്ക്ഗ്രൗണ്ട് ടൈമർ ആവശ്യമില്ല.

---

### ഓപ്റ്റ്-ഇൻ ആഗോള പ്രൊവൈഡർ കൂൾഡൗൺ (വിൻഡോ ഗേറ്റ്)

നാലാമത്തെ, **ഓപ്റ്റ്-ഇൻ** ലേയർ (`PROVIDER_COOLDOWN_ENABLED`, ഡിഫോൾട്ട് **ഓഫ്**) പരാജയപ്പെടുന്ന പ്രൊവൈഡർമാരുടെ ക്രോസ്-റിക്വസ്റ്റ് മെമ്മറി `open-sse/services/providerCooldownTracker.ts`-ൽ സൂക്ഷിക്കുന്നു; കോംബോ ടാർഗറ്റ് റെസല്യൂഷൻ ഇത് കൺസൾട്ട് ചെയ്യുന്നു, അങ്ങനെ തുടർച്ചയായ കോംബോ റിക്വസ്റ്റുകൾ ഇപ്പോൾ പരാജയപ്പെട്ട പ്രൊവൈഡറിലൂടെ വീണ്ടും സഞ്ചരിക്കുന്നത് നിർത്തുന്നു. പ്രൊവൈഡർ-തല എൻട്രികൾ `PROVIDER_PROFILES` വിൻഡോ ഗേറ്റ് പിന്തുടരുന്നു:

| പ്രൊഫൈൽ | ട്രിപ്പ് ആകുന്നത് (`providerFailureThreshold`) ശേഷം | ഇതിനുള്ളിൽ (`providerFailureWindowMs`) | കൂൾ ചെയ്യുന്നത് (`providerCooldownMs`) |
| ------- | --------------------------------------------------: | -------------------------------------: | -------------------------------------: |
| OAuth   |                                                `10` |                                `15min` |                                 `5min` |
| API key |                                                `15` |                                `30min` |                                `10min` |

പരിധിക്ക് താഴെ പ്രൊവൈഡർ കൂൾ ചെയ്യുന്നതായി കണക്കാക്കുന്നത് **അല്ല**; ഒരു വിജയം വിൻഡോ മായ്ക്കുന്നു. കണക്ഷൻ-തല എൻട്രികൾ (`provider:connectionId`) പകരം ഘാതാംക `minRetryCooldownMs → maxRetryCooldownMs` ബാക്ക്-ഓഫ് നിലനിർത്തുന്നു. ഓവർറൈഡുകൾ: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
റിഗ്രഷൻ ഗാർഡ്: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. കണക്ഷൻ കൂൾഡൗൺ

**പരിധി:** ഒരൊറ്റ പ്രൊവൈഡർ കണക്ഷൻ/അക്കൗണ്ട്/കീ.

**ഉദ്ദേശ്യം:** അതേ പ്രൊവൈഡറിനായുള്ള മറ്റ് കണക്ഷനുകൾ സേവനം തുടർന്നുകൊണ്ടിരിക്കുമ്പോൾ, പ്രവർത്തനരഹിതമായ ഒരു കീ ഒഴിവാക്കുക.

**നടപ്പാക്കൽ:**

- ലഭ്യമല്ലെന്ന് അടയാളപ്പെടുത്തുക: `src/sse/services/auth.ts::markAccountUnavailable()`
- തിരഞ്ഞെടുക്കൽ: അതേ ഫയലിലെ `getProviderCredentials*`
- കൂൾഡൗൺ കണക്കുകൂട്ടൽ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ക്രമീകരണങ്ങൾ: `src/lib/resilience/settings.ts`

**ഓരോ കണക്ഷനുമുള്ള ഫീൽഡുകൾ:**

- `rateLimitedUntil` — കൂൾഡൗൺ അവസാനിക്കുന്ന സമയമുദ്ര
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — എക്സ്പോണൻഷ്യൽ ബാക്ക്ഓഫ് കൗണ്ടർ

**സ്ഥിരസ്ഥിതി കൂൾഡൗണുകൾ:**

- OAuth അടിസ്ഥാന സമയം: 5s
- API-key അടിസ്ഥാന സമയം: 3s
- API-key 429: അപ്സ്ട്രീം `Retry-After`/reset ഹെഡറുകൾ/പാഴ്സ് ചെയ്യാവുന്ന reset ടെക്സ്റ്റിന് മുൻഗണന നൽകുന്നു
- ബാക്ക്ഓഫ്: `baseCooldownMs * 2 ** failureIndex`

**ഓരോ പ്രൊവൈഡറിനുമുള്ള റിട്രൈ വൈകൽ.** പ്രൊവൈഡർ വിശദാംശങ്ങളുടെ പേജിൽ **റിട്രൈ വൈകൽ** എന്നൊരു തിരഞ്ഞെടുക്കൽ ഉണ്ട് (Auto,
15s മുതൽ 1h വരെ). ഇത്
`resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, `PATCH /api/resilience` വഴി) എന്നതിൽ സംരക്ഷിക്കുന്നു. റേറ്റ്-ലിമിറ്റ് പിശകിനൊപ്പം അപ്സ്ട്രീം റിട്രൈ
സൂചന ഇല്ലാത്തപ്പോൾ, ആ മൂല്യം പ്രൊവൈഡറിനുള്ള സ്കെയിൽ ചെയ്ത ബാക്ക്ഓഫിന് പകരമാകുകയും
`backoffLevel` 0 ആയി പുനഃസജ്ജമാക്കുകയും ചെയ്യുന്നു (`open-sse/services/rotationConfig.ts::overrideFor`). റേറ്റ്-ലിമിറ്റ് ചെയ്ത പിശകിനുള്ള മുൻഗണനാക്രമം, ഏറ്റവും ഉയർന്നത് ആദ്യം: അപ്സ്ട്രീം റിട്രൈ സൂചന, തുടർന്ന് ഓരോ കണക്ഷനുമുള്ള `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, തുടർന്ന് ഓരോ പ്രൊവൈഡറിനുമുള്ള റിട്രൈ വൈകൽ, തുടർന്ന്
env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, തുടർന്ന്
സ്കെയിൽ ചെയ്ത ബാക്ക്ഓഫ്. Auto ഫീൽഡ് നീക്കം ചെയ്യുന്നു. ഇത് റേറ്റ്-ലിമിറ്റ് കാരണത്തെ മാത്രമേ ബാധിക്കൂ; ടെർമിനൽ നിലകളെ ഒരിക്കലും ബാധിക്കില്ല.

**ആന്റി-തണ്ടറിംഗ്-ഹേർഡ് ഗാർഡ്:** ഒരേസമയം സംഭവിക്കുന്ന പരാജയങ്ങൾ കൂൾഡൗൺ അമിതമായി നീട്ടുന്നതും `backoffLevel` ഇരട്ടിയായി വർധിപ്പിക്കുന്നതും തടയുന്നു.

**കോൺകറൻസി-ലിമിറ്റ് 429-കൾ ബാക്ക്ഓഫ് ലാഡറിൽ ഉയരുന്നില്ല.** ബോഡിയിൽ
കോൺകറൻസി പരിധി സൂചിപ്പിക്കുന്ന ("too many concurrent requests", "concurrency limit",
"parallel request limit", GLM `并发数过高`) ഒരു `429` അക്കൗണ്ട് ആരോഗ്യകരമാണെങ്കിലും തിരക്കിലാണെന്ന് അർത്ഥമാക്കുന്നു.
`checkFallbackError()` `concurrency_limited` എന്ന കാരണം നൽകുന്നു: ഉടൻ അടുത്ത
കണക്ഷനിലേക്ക് ഫെയിൽ ഓവർ ചെയ്യുക, ഈ കണക്ഷനിൽ സ്ഥിരമായ
`CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) അല്ലെങ്കിൽ അപ്സ്ട്രീം റിട്രൈ സൂചന ഉപയോഗിച്ച് കൂൾഡൗൺ ഏർപ്പെടുത്തുക,
`backoffLevel` മാറ്റമില്ലാതെ നിലനിർത്തുക, കൂടാതെ `skipProviderBreaker` സജ്ജമാക്കുക.
വ്യക്തമായ ക്വോട്ടാ ബോഡിക്ക് ഇപ്പോഴും മുൻഗണനയുണ്ട്; അതിനാൽ ക്വോട്ടാ പാറ്റേണുമായി പൊരുത്തപ്പെടുന്ന ഒരു ബോഡി ക്വോട്ടാ വിധിയായി തന്നെ തുടരും. കണ്ടെത്തൽ:
`src/shared/utils/classify429.ts`-ലെ `looksLikeConcurrencyLimit()`; വിധി:
`open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (ബ്രേക്കറിന്റെ
`FailureKind`) മാറ്റമില്ലാതെ തുടരുകയും ഈ ബോഡികൾക്കായി `rate_limit` വായിക്കുകയും ചെയ്യുന്നു.

**സ്ട്രീം ഉള്ളടക്ക സ്റ്റാളുകൾ അക്കൗണ്ടിൽ കൂൾഡൗൺ ഏർപ്പെടുത്തുന്നില്ല.** ഉള്ളടക്ക-സ്റ്റാൾ വാച്ച്ഡോഗ്
(`open-sse/utils/streamHandler.ts`) സമയത്തിനുള്ളിൽ മോഡൽ ഔട്ട്പുട്ട് അയയ്ക്കാത്ത ഒരു സ്ട്രീമിൽ
നിന്ന് പിന്മാറുമ്പോൾ, `markAccountUnavailable()` കണക്ഷനിൽ പിശക് രേഖപ്പെടുത്തുന്നു, പക്ഷേ കൂൾഡൗൺ സജ്ജമാക്കുന്നില്ല: സ്റ്റാൾ ആ അഭ്യർത്ഥനയുടേതാണ്, മിക്കപ്പോഴും ഇതുവരെ ഔട്ട്പുട്ടില്ലാത്ത ദീർഘമായ reasoning turn ആയിരിക്കും. `resilienceSettings.streamStallCooldown.enabled` (സ്ഥിരസ്ഥിതി
`false`) ഉപയോഗിച്ച് ഓപ്പറേറ്റർമാർക്ക് ഇത് വീണ്ടും പ്രവർത്തനക്ഷമമാക്കാം.

**`p2c` അക്കൗണ്ട് തിരഞ്ഞെടുപ്പിനുള്ള ഓപ്റ്റ്-ഇൻ ലാറ്റൻസി സിഗ്നൽ.** വിതരണം ചെയ്യുന്ന ഓരോ ശ്രമവും ഓരോ കണക്ഷനിലും (ഓരോ കണക്ഷൻ + മോഡലിലും) അതിന്റെ ആദ്യ ബൈറ്റിലേക്കുള്ള സമയവും ഫലവും ഇൻ-മെമ്മറി റോളിംഗ് വിൻഡോയിൽ രേഖപ്പെടുത്തുന്നു: 15 മിനിറ്റിനുള്ളിലെ അവസാന 20 സാമ്പിളുകൾ
(`open-sse/services/connectionLatencyTracker.ts`, `src/sse/handlers/chatHelpers.ts`-ലെ
`safeLogEvents()`-ൽ നിന്ന് രേഖപ്പെടുത്തുന്നു). `resilienceSettings.p2cLatency.weight` `0`-നേക്കാൾ കൂടുതലായിരിക്കുമ്പോൾ
(പരിധി 0-20, സ്ഥിരസ്ഥിതി `0` = ഓഫ്), `src/sse/services/auth.ts`-ലെ
`compareP2CConnections()` ജോഡിയിലെ ഓരോ സ്ഥാനാർഥിക്കും പരമാവധി `weight` പോയിന്റുകൾ ചേർക്കുന്നു. അതിൽ പകുതി വേഗമേറിയ സ്ഥാനാർഥിയോട് അനുപാതപ്പെടുത്തിയ ലാറ്റൻസിയിൽ നിന്നാണ് (ഇരട്ടി വേഗം കുറഞ്ഞാൽ മുഴുവൻ പകുതി ലഭിക്കും), മറ്റേ പകുതി റോളിംഗ് പിശക് നിരക്കിൽ നിന്നുമാണ്. രണ്ട് സ്ഥാനാർഥികൾക്കും കുറഞ്ഞത് 3 സാമ്പിളുകൾ ഉള്ളപ്പോൾ മാത്രമേ ഈ ഘടകം പ്രയോഗിക്കൂ; അതിനാൽ പുതിയ അക്കൗണ്ടുകൾക്ക് ശിക്ഷ ലഭിക്കില്ല. കൂടാതെ, അതിന്റെ പരമാവധി ക്വോട്ടാ-ബ്ലോക്ക് ചെയ്തതും ക്വോട്ടാ-തീർന്നതുമായ ശിക്ഷകളേക്കാൾ താഴെയായിരിക്കും. ഇത് സ്വന്തമായി ഒരു സർക്യൂട്ട് ചേർക്കുന്നില്ല: പരാജയപ്പെടുന്ന അക്കൗണ്ടുകൾ കൂൾഡൗൺ, ലോക്കൗട്ട്, ബ്രേക്കർ പാളികൾ കൈകാര്യം ചെയ്യുന്നതുതന്നെയാണ്. ഇത്
`PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` ഉപയോഗിച്ച് സജ്ജമാക്കുക.

**റീസണിംഗ് ഫ്രെയിമുകൾ ഉള്ളടക്ക-സ്റ്റാൾ ബജറ്റ് പുനരാരംഭിക്കുന്നു.** ഒരു റീസണിംഗ് മോഡൽ ആദ്യ ദൃശ്യ ടോക്കണിന് മുമ്പ് മിനിറ്റുകളോളം ചിന്തിച്ചേക്കാം: Claude ശൂന്യമായിരിക്കാവുന്ന thinking ടെക്സ്റ്റുള്ള `thinking_delta` ഫ്രെയിമുകൾ സ്ട്രീം ചെയ്യുന്നു, കൂടാതെ Responses API ഒന്നിന് പിന്നാലെ മറ്റൊന്ന് എന്ന രീതിയിൽ റീസണിംഗ് ഇനം സ്ട്രീം ചെയ്യുന്നു. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ഈ ഫ്രെയിമുകൾ തിരിച്ചറിയുന്നു, കൂടാതെ ടേൺ റദ്ദാക്കുന്നതിനുപകരം ഓരോ ഫ്രെയിമിലും വാച്ച്ഡോഗ് അതിന്റെ ബജറ്റ് പുനരാരംഭിക്കുന്നു. അവ ഇപ്പോഴും മോഡൽ ഔട്ട്പുട്ടല്ല; അതിനാൽ റീസണിംഗ് മാത്രത്തോടെ അവസാനിക്കുന്ന ഒരു ടേൺ ശൂന്യമായി റിപ്പോർട്ട് ചെയ്യപ്പെടും, കൂടാതെ റീസണിംഗ് നിർത്തി ഹാർട്ട്ബീറ്റുകൾ മാത്രം അയക്കുന്ന ഒരു ടേൺ ഇപ്പോഴും വാച്ച്ഡോഗ് പ്രവർത്തിപ്പിക്കും.

ശൂന്യമല്ലാത്ത സിഗ്നേച്ചറുള്ള Kiro-യുടെ ബൈനറി `reasoningContentEvent` ഫ്രെയിമുകൾ എക്സിക്യൂട്ടർ വഴി ഈ റീസണിംഗ് പ്രവർത്തനം ശൂന്യമായ `reasoning_content` ഡെൽറ്റയായി നിലനിർത്തുന്നു. സിഗ്നേച്ചർ ഫോർവേഡ് ചെയ്യില്ല. മെറ്റാഡാറ്റ, അപൂർണ്ണമായ ഫ്രെയിമുകൾ, ശൂന്യമായ സിഗ്നേച്ചറുകൾ എന്നിവ ഉള്ളടക്ക ബജറ്റ് പുനരാരംഭിക്കില്ല; സ്വതന്ത്രമായ ആക്റ്റീവ്-സ്ട്രീം ടൈംഔട്ടും ക്ലയന്റ് റദ്ദാക്കലും തുടർന്നും ബാധകമാണ് (`open-sse/executors/kiro/reasoning.ts`).

**ടെർമിനൽ നിലകൾ (കൂൾഡൗണുകളല്ല):**

- `banned` — നിരോധിത-കീവേഡ് / അക്കൗണ്ട്-ബാൻ കണ്ടെത്തൽ വഴി സജ്ജമാക്കുന്നു ([BAN_DETECTION](../security/BAN_DETECTION.md) കാണുക). അപ്സ്ട്രീം ഓരോ അഭ്യർത്ഥനയിലുമുള്ള നിരസിക്കലുകൾ (`request_rejected`, ഉദാ. Anthropic OAuth 403 "Request not allowed") ഇത് ഒരിക്കലും സജ്ജമാക്കില്ല: അവ ഓരോ കണക്ഷനും മോഡലിനുമായി എണ്ണുകയും, വളരുന്ന കൂൾഡൗണോടെ ആ മോഡലിനെ റൊട്ടേഷനിൽ നിന്ന് നീക്കം ചെയ്യുകയും ചെയ്യും; കൂൾഡൗൺ `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) വരെ പരിമിതപ്പെടുത്തിയിരിക്കും, അല്ലെങ്കിൽ മോഡൽ അറിയാത്തപ്പോൾ കണക്ഷനിൽ കൂൾഡൗൺ ഏർപ്പെടുത്തും — `open-sse/services/requestRejectedStreak.ts`
- `expired` (പരിമിതമായ റിട്രൈകൾക്ക് ശേഷം ടെർമിനലിലേക്ക് മാറുന്നു — എക്സ്പോണൻഷ്യൽ ബാക്ക്ഓഫോടുകൂടിയ `EXPIRED_RETRY_MAX = 3` — അതിനാൽ അക്കൗണ്ട് സ്ഥിരമായി നിർജ്ജീവമാക്കുന്നതിന് മുമ്പ് താൽക്കാലിക OAuth പിശകുകൾ സ്വയം പരിഹരിക്കാനാകും)
- `credits_exhausted`

ക്രെഡൻഷ്യലുകൾ മാറുകയോ ഒരു ഓപ്പറേറ്റർ അവ റീസെറ്റ് ചെയ്യുകയോ ചെയ്യുന്നതുവരെ ഇവ നിലനിൽക്കും. ടെർമിനൽ നിലകളെ താൽക്കാലിക കൂൾഡൗൺ നില ഉപയോഗിച്ച് ഓവർറൈറ്റ് ചെയ്യരുത്.

**Lazy recovery:** `rateLimitedUntil` കഴിഞ്ഞാൽ കണക്ഷൻ വീണ്ടും യോഗ്യമാകും. വിജയകരമായ ഉപയോഗത്തിൽ, `clearAccountError()` എല്ലാ പിശക് ഫീൽഡുകളും മായ്ക്കുന്നു.

### Claude OAuth ഉപയോഗ പരിധി: കുറഞ്ഞ മുൻഗണനാ ലെയിൻ + സെഷൻ-പരിധി റീസെറ്റ്

**പരിധി:** ഒരു Claude സബ്സ്ക്രിപ്ഷൻ (OAuth) കണക്ഷൻ. രണ്ട് സവിശേഷതകളും **ഓരോ കണക്ഷനും പ്രത്യേകം opt-in** ചെയ്യേണ്ടവയാണ് (കണക്ഷൻ എഡിറ്റ് ചെയ്യുക → Claude വിഭാഗം → `providerSpecificData`-യിലെ `lowPriorityMode` / `autoLimitReset`; രണ്ടിന്റെയും ഡിഫോൾട്ട് ഓഫ് ആണ്), കൂടാതെ Claude Code-ലെ `/low-priority`, `/limit-reset` കമാൻഡുകളെ പ്രതിഫലിപ്പിക്കുന്നു (Claude Code 2.1.263-ൽ നിന്നുള്ള വയർ കോൺട്രാക്ട്).

**നടപ്പാക്കൽ:**

- സ്റ്റേറ്റ് മെഷീനും പ്രതികരണ വർഗീകരണവും: `open-sse/services/claudeLowPriority.ts`
- റീസെറ്റ് സ്റ്റാറ്റസ്/ക്ലെയിം ക്ലയന്റ്: `open-sse/services/claudeLimitReset.ts`
- എക്സിക്യൂട്ടർ ഹുക്ക് (ഹെഡർ ഇൻജക്ഷൻ + അതേ അക്കൗണ്ടിൽ വീണ്ടും ശ്രമിക്കൽ): `open-sse/executors/base.ts::execute()`
- opt-in സ്ഥിരപ്പെടുത്തൽ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ട്രിഗർ:** 5 മണിക്കൂർ ഉപയോഗ പരിധി — ഹെഡറുകളിൽ
`anthropic-ratelimit-unified-status: rejected` ഉം, അക്കൗണ്ട് യോഗ്യമാണെങ്കിൽ,
`anthropic-ratelimit-unified-slow-offer: treatment` ഉം ഉള്ള ഒരു `429`. ആ ആദ്യ പരിധി
`429` വരുന്നതിന് മുമ്പ് ഒന്നും അയയ്ക്കില്ല; unified ഹെഡറുകളില്ലാത്ത burst `429` സാധാരണ കൂൾഡൗൺ പാതയിലൂടെ പോകും.

**കുറഞ്ഞ മുൻഗണനാ ലെയിൻ** (`lowPriorityMode`):

- പരിധി `429` ലഭിക്കുമ്പോൾ എക്സിക്യൂട്ടർ ഓഫർ സ്വീകരിച്ച് അതേ അക്കൗണ്ടിൽ
  `anthropic-usage-limit: slow` ഉപയോഗിച്ച് ഉടൻ തന്നെ **അതേ** അഭ്യർത്ഥന വീണ്ടും അയയ്ക്കുന്നു; പ്രഖ്യാപിച്ചിരിക്കുന്ന
  `anthropic-ratelimit-unified-reset` (+60s grace) വരെ ലെയിൻ സജീവമായി തുടരും, ആ സമയപരിധിയിലെ ഓരോ അഭ്യർത്ഥനയിലും ഹെഡർ ഉണ്ടായിരിക്കും. തടഞ്ഞുവെച്ച `429` ഒരിക്കലും `handleChatCore`-ലേക്ക് എത്തില്ല, അതിനാൽ കണക്ഷൻ കൂൾഡൗണിലേക്ക് ഇടപ്പെടുകയോ മറ്റൊന്നിലേക്ക് മാറ്റപ്പെടുകയോ ഇല്ല.
- പിന്നീടുള്ള പ്രതികരണങ്ങളിലെ `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed` ലെയിൻ നിലനിർത്തും; `slot_busy` (429) അല്ലെങ്കിൽ `529` സെർവറിന്റെ
  `anthropic-ratelimit-unified-slow-retry-after` അനുസരിച്ച് കാത്തിരിക്കും (ഡിഫോൾട്ട് 20s, clamp 5–600s, ±30% jitter)
  തുടർന്ന് വീണ്ടും ശ്രമിക്കും. ഇത് `anthropic-ratelimit-unified-slow-max-wait` പരിധിക്കുള്ളിലായിരിക്കും (ഡിഫോൾട്ട് 20 min, clamp
  1 min–6 h) — അതിനു ശേഷം ലെയിൻ അവസാനിക്കുകയും 10 മിനിറ്റ് കൂൾ-ഓഫ് വീണ്ടും സ്വീകരിക്കുന്നത് തടയുകയും ചെയ്യും. അഭ്യർത്ഥനയുടെ സ്വന്തം upstream-start timeout-ൽ ബാക്കിയുള്ള സമയവും (`resolveFetchStartTimeout`, ഡിഫോൾട്ടായി 10 min) 5 s മാർജിൻ കുറച്ചതും കാത്തിരിപ്പ് അധികമായി പരിമിതപ്പെടുത്തും: ഈ പരിധിയില്ലെങ്കിൽ 20 മിനിറ്റ് ഡിഫോൾട്ട് max-wait അഭ്യർത്ഥനയെക്കാൾ നീണ്ടുനിൽക്കുകയും ഉറക്കം കാത്തിരിപ്പിനിടെ മധ്യേ റദ്ദാക്കപ്പെടുകയും ചെയ്യും; അതോടെ സൗമ്യമായ `max_wait` അവസാനിപ്പിക്കൽ + കൂൾ-ഓഫിനു പകരം `TimeoutError` പുറത്തുവരും.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 മണിക്കൂർ വിൻഡോ റോളോവർ, അല്ലെങ്കിൽ
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (പണമടച്ചുള്ള overage ഇപ്പോൾ പരിധി കൈകാര്യം ചെയ്യുന്നതിനാൽ ഏത് സ്റ്റാറ്റസിലും ഇത് `extra_usage` ആയി അവസാനിപ്പിക്കുന്നു) ലെയിൻ അവസാനിപ്പിക്കും; തുടർന്ന് പ്രതികരണം സാധാരണ കൂൾഡൗൺ പാതയിലൂടെ പോകും. പ്രഖ്യാപിച്ചിരിക്കുന്ന ബജറ്റ് റീസെറ്റ് വരെ (≤ 8 ദിവസം) `budget_exhausted` ഓർമ്മയിൽ സൂക്ഷിക്കും.
- എക്സിക്യൂട്ടറിന്റെ സ്വന്തം 400-പ്രേരിത intra-attempt വീണ്ടും ശ്രമങ്ങൾ (context editing, thinking/effort clamps, param auto-learn) കഴിഞ്ഞാണ് പരിധി പരിശോധന നടക്കുന്നത്; അതിനാൽ അത്തരം ഒരു വീണ്ടും ശ്രമത്തിനിടെ മാത്രം പ്രത്യക്ഷപ്പെടുന്ന പരിധി `429` പോലും കൂൾഡൗൺ പാതയിലെത്താതെ തടയപ്പെടും.
- ഓരോ കണക്ഷനും സ്റ്റേറ്റിന്റെ ഇൻ-മെമ്മറി സംഭരണമാണ് ഉപയോഗിക്കുന്നത് (റീസ്റ്റാർട്ടിന് വീണ്ടും സ്വീകരിക്കാൻ ഒരു അധിക പരിധി `429` ആവശ്യമായി വരും).

**സെഷൻ-പരിധി റീസെറ്റ്** (`autoLimitReset`, രണ്ടും ഓണായിരിക്കുമ്പോൾ ലെയിനിന് മുമ്പ് ശ്രമിക്കുന്നു):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ബ്ലോക്ക്; `arm: "reset"` ഉം `available: true` ഉം ആയിരിക്കുമ്പോൾ,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ഉപയോഗിച്ച്
  `{ "program": "juniper_tide" }` അയയ്ക്കുന്നു (`providerSpecificData.organizationUUID`-ൽ നിന്നുള്ള organization UUID, bootstrap fallback).
- `result: reset|not_limited` → അഭ്യർത്ഥന പൂർണ്ണ വേഗത്തിൽ വീണ്ടും ശ്രമിക്കും (slow header ഇല്ലാതെ).
  `already_used` / `not_offered` `next_available_at` മെമ്മറൈസ് ചെയ്യും (ഡിഫോൾട്ട് one week); പരാജയമുണ്ടെങ്കിൽ 15 മിനിറ്റ് ബാക്ക്ഓഫ് ചെയ്യും. റീസെറ്റ് ആഴ്ചയിൽ ഒരിക്കൽ മാത്രമാണ്, കൂടാതെ weekly limit-ിൽ ഉൾപ്പെടും.

റിഗ്രഷൻ ഗാർഡുകൾ: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`,
`tests/unit/claude-low-priority-executor.test.ts`.

### ബാങ്ക് ചെയ്ത റീസെറ്റുകൾ സ്വയമേവ പ്രയോഗിക്കുക

**വ്യാപ്തി:** Codex, Claude സബ്സ്ക്രിപ്ഷൻ (OAuth) കണക്ഷനുകൾ.**തിരഞ്ഞെടുക്കൽ** : `bankedResetAutoApply` ക്രമീകരണം ഓഫാണ്, ഡിഫോൾട്ടായി `dry-run` മോഡിലാണ് (ക്രമീകരണങ്ങൾ → AI → സ്വയമേവ ബാങ്ക് റീസെറ്റുകൾ പ്രയോഗിക്കുക).

**ഉദ്ദേശം:** പ്രൊവൈഡർ ലിമിറ്റ് പേജിൽ ഒരു ഓപ്പറേറ്റർ "റിഡീം" അമർത്തുന്നതിനായി കാത്തിരിക്കുന്നതിനുപകരം, ഒരു അക്കൗണ്ട് ഉപയോഗ ഭിത്തിയിൽ പതിക്കുമ്പോൾ സ്വന്തമായി ബാങ്ക് റീസെറ്റുകൾ ചെലവഴിക്കുക.

| ക്രെഡിറ്റ് തരം (`creditTypes`) | എന്താണ് വീണ്ടെടുക്കപ്പെട്ടിരിക്കുന്നത്             | എവിടെ ഓടുന്നു                                                  |
| ------------------------------ | -------------------------------------------------- | -------------------------------------------------------------- |
| `codexCredits`                 | Codex റീസെറ്റ് ക്രെഡിറ്റുകൾ                        | പശ്ചാത്തല ജോലി, ഓരോ 60 സെക്കൻഡിലും                             |
| `claudeCredits`                | Claude ബാങ്ക് ഗ്രാൻ്റുകൾ (`GRANT` ക്രെഡിറ്റുകൾ)    | പശ്ചാത്തല ജോലി, ഓരോ 60 സെക്കൻഡിലും                             |
| `claudeSessionReset`           | Claude പ്രതിവാര സെഷൻ-പരിധി പുനഃസജ്ജമാക്കൽ (മുകളിൽ) | അഭ്യർത്ഥന പാത, ഓരോ അക്കൗണ്ടിനും ടോഗിൾ ചെയ്യുന്ന അതേ നയത്തിലൂടെ |

**നടപ്പിലാക്കൽ:**

- ശുദ്ധമായ തീരുമാനം (രണ്ട് പാതകൾക്കും ഒരു നിയമം സജ്ജമാക്കി): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- പശ്ചാത്തല ജോലി: `src/lib/services/bankedResetAutoApply.ts` ( `src/instrumentation-node.ts` ൽ ആരംഭിച്ചു)
- Claude അഭ്യർത്ഥന-പാത്ത് ഗേറ്റ്: `src/lib/usage/claudeSessionResetPolicy.ts`, `open-sse/services/claudeLimitReset.ts` ൽ `setClaudeLimitResetPolicy()` വഴി രജിസ്റ്റർ ചെയ്തു
- ചരിത്രം, ക്യാപ്സ്, വെബ്ഹുക്ക്: `src/lib/usage/bankedResetAudit.ts`
- ചരിത്രം API: `GET /api/settings/banked-reset-auto/history?limit=50` (മാനേജ്മെൻ്റ് ഓത്ത്)

**തീരുമാന ക്രമം** (ആദ്യ പരാജയ നിയമം രേഖപ്പെടുത്തിയ കാരണം):

1. ഫീച്ചർ ഓഫാണ്, ക്രെഡിറ്റ് ടൈപ്പ് ഓഫ്, അല്ലെങ്കിൽ അക്കൗണ്ട് പരിധിക്ക് പുറത്താണ് (`accountScope` `all` / `selected` കൂടാതെ ഓരോ അക്കൗണ്ടിനും `connections` മാപ്പ്).
2. ഓപ്ഷണൽ UTC ഷെഡ്യൂളിന് പുറത്ത് (`startHourUtc` > `endHourUtc` അർദ്ധരാത്രി കടന്നുപോകുന്നു).
3. അവസാന 24 മണിക്കൂറിലെ ക്യാപ്സ്: ഏതെങ്കിലും രണ്ട് വീണ്ടെടുക്കലുകൾക്കിടയിലുള്ള `maxPerAccountPerDay` (1), `maxPerDay` (3), `minSpacingMinutes` (30).
4. ട്രിഗർ: ഒരു ഭിത്തിയുള്ള `session` അല്ലെങ്കിൽ `weekly` വിൻഡോ ( `getQuotaWindowStatus().reachedThreshold` `isAccountQuotaExhausted()` നിന്ന് വായിക്കുക , ചിലവഴിച്ച എല്ലാ വിൻഡോയിലും ഒരു അക്കൗണ്ട് മാത്രമേ റിപ്പോർട്ട് ചെയ്യുന്നുള്ളൂ ) അല്ലെങ്കിൽ കുറഞ്ഞത് `expiringCreditMinUsedPercent` (50) ഉപയോഗിച്ച ഒരു അക്കൗണ്ടിൽ `expiringCreditHours` (24)-നുള്ളിൽ കാലഹരണപ്പെടുന്ന ക്രെഡിറ്റ്.
5. നാച്ചുറൽ-റീസെറ്റ് ഗാർഡ്: `sessionResetGuardMinutes` (90)-നുള്ളിൽ ഭിത്തിയുള്ള 5-മണിക്കൂർ വിൻഡോ പുനഃസജ്ജമാക്കുമ്പോൾ അല്ലെങ്കിൽ `weeklyResetGuardHours` (12)-നുള്ളിൽ വാൾഡ് വീക്ക്ലി വിൻഡോ റീസെറ്റ് ചെയ്യുമ്പോൾ ഒഴിവാക്കുക.
6. പ്രതിവാര നില: ആഴ്ചയിൽ ബാക്കിയുള്ളത് `weeklyFloorPercent` (10) ന് താഴെയാണെങ്കിൽ 5 മണിക്കൂർ റീസെറ്റ് ഒഴിവാക്കുക.
7. `last-resort` മോഡ്: ഒരേ ദാതാവിൻ്റെ മറ്റൊരു ഇൻ-സ്കോപ്പ് അക്കൗണ്ടിൽ രണ്ട് വിൻഡോകളിലും കുറഞ്ഞത് `poolHeadroomPercent` (10) ശേഷിക്കുമ്പോൾ ഒഴിവാക്കുക. കാലഹരണപ്പെടുന്ന-ക്രെഡിറ്റ് ട്രിഗറുകൾ ഇത് മറികടക്കുന്നു.
8. `dry-run` ഒരു വരി രേഖപ്പെടുത്തുകയും ഒന്നും വീണ്ടെടുക്കുകയും ചെയ്യുന്നു; `last-resort`, `eager` എന്നിവ റിഡീം ചെയ്യുന്നു.

നഷ്ടമായ ക്വാട്ട ഡാറ്റ ഒരിക്കലും ഒരു വീണ്ടെടുക്കൽ അൺലോക്ക് ചെയ്യില്ല: ഒരു അജ്ഞാത റീസെറ്റ് സമയം അല്ലെങ്കിൽ പ്രതിവാര ഉപയോഗം ഒഴിവാക്കുക.

**Claude സെഷൻ റീസെറ്റ്:** ഫീച്ചർ ഓഫ് അല്ലെങ്കിൽ `claudeSessionReset` ഓഫാണെങ്കിൽ, ഓരോ അക്കൗണ്ടിനും `autoLimitReset` ടോഗിൾ മുമ്പത്തെപ്പോലെ തന്നെ തീരുമാനിക്കുന്നു. ഇവ രണ്ടും ഓണായിരിക്കുമ്പോൾ, ഓരോ അക്കൗണ്ടിൻ്റെയും ടോഗിളുകളെ ഫീച്ചർ മാറ്റിസ്ഥാപിക്കുന്നു: പോളിസി അനുവദിക്കുമ്പോൾ മാത്രമേ ഇൻ-സ്കോപ്പ് അക്കൗണ്ട് ക്ലെയിം ചെയ്യൂ, `dry-run` മോഡിൽ ക്ലെയിം ചെയ്യുന്നില്ല.

**സുരക്ഷ:** ജോലി ഒരു ടിക്കിന് പരമാവധി ഒരു ക്രെഡിറ്റ് റിഡീം ചെയ്യുന്നു, ക്രെഡിറ്റുകൾ ലിസ്റ്റുചെയ്യുന്നതിന് മുമ്പ് തീരുമാനിക്കുന്നു (ഒഴിവാക്കിയ അക്കൗണ്ട് ഒരിക്കലും ലിസ്റ്റ് ചെയ്യില്ല), ഐഡംപോട്ടൻസി കീകൾ `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` ഉപയോഗിക്കുന്നു, പരാജയപ്പെട്ട ലിസ്റ്റിങ്ങിനോ വീണ്ടെടുക്കലിനോ ശേഷം ഒരു അക്കൗണ്ട് ബാക്ക് ചെയ്യുന്നു. എല്ലാ വീണ്ടെടുപ്പും പരാജയവും ഡ്രൈ-റൺ തീരുമാനവും `audit_log` യിൽ എഴുതിയിരിക്കുന്നു (`action: "bankedReset.redeem"`, ടോക്കണുകളോ ക്രെഡിറ്റ് ഐഡികളോ ഇല്ല); ആ വരികളിൽ നിന്ന് തൊപ്പികൾ കണക്കാക്കുന്നു, അതിനാൽ അവ പുനരാരംഭിക്കുമ്പോൾ അതിജീവിക്കും. വിജയകരമായ വീണ്ടെടുപ്പുകൾ `provider.reset_redeemed` വെബ്ഹൂക്കിലും പ്രവർത്തിക്കുന്നു.

റിഗ്രഷൻ ഗാർഡുകൾ: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### സെഷൻ അഫിനിറ്റി (#7274)

**പരിധി:** ഒരു ക്ലയന്റ് സെഷൻ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ഹെഡർ) ഏത് പ്രൊവൈഡറിനും ഒരു കണക്ഷനിൽ പിൻ ചെയ്യുന്നു.

**ഉദ്ദേശ്യം:** ഒരു മൾട്ടി-ടേൺ ഏജന്റിനെ (Claude Code, aider, കസ്റ്റം ഏജന്റുകൾ) അഭ്യർത്ഥനകൾക്കിടയിൽ അതേ അക്കൗണ്ടിൽ നിലനിർത്തുക; ഇതിലൂടെ അക്കൗണ്ടുകൾക്കിടയിലെ കോൺടെക്സ്റ്റ് നഷ്ടവും ഓരോ അക്കൗണ്ടിലും ഉള്ള സെഷൻ സ്റ്റേറ്റിനെ ആശ്രയിക്കുന്ന പ്രൊവൈഡറുകളിൽ ആവർത്തിച്ചുള്ള cold-start `429`-കളും കുറയ്ക്കാം.

**നടപ്പാക്കൽ:**

- TTL പരിഹാരം: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- പിൻ തിരഞ്ഞെടുക്കലും സൃഷ്ടിക്കലും: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ഹെഡർ എക്സ്ട്രാക്ഷൻ (ജനറിക്, ഏത് പ്രൊവൈഡറും): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- സ്ഥിരപ്പെടുത്തിയ പിൻ ടേബിൾ: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ക്രമീകരണം: `sessionAffinityTtlMs` (മില്ലിസെക്കൻഡിലുള്ള ആഗോള TTL, `0` ഡിസേബിൾ ചെയ്യുന്നു) — `src/lib/db/settings.ts`. Codex-മാത്രമായ `codexSessionAffinityTtlMs` എന്ന പേരിൽ നിന്ന് `124_generic_session_affinity_ttl.sql` മൈഗ്രേഷൻ വഴി പുനർനാമകരണം ചെയ്തു; മുമ്പ് ക്രമീകരിച്ചിരുന്ന Codex TTL ഉണ്ടായിരുന്നെങ്കിൽ അത് പുതിയ ഡിഫോൾട്ടായി കൈമാറും.

#7274-ന് മുമ്പ്, `resolveSessionAffinityTtlMs()` `codex` ഒഴികെയുള്ള എല്ലാ പ്രൊവൈഡർമാർക്കും `0` ആയി ഉടൻ അവസാനിച്ചിരുന്നു. അതിനാൽ പിൻ ചെയ്യൽ സംവിധാനവും ഹെഡർ എക്സ്ട്രാക്ഷനും ഇതിനകം പ്രൊവൈഡർ-അജ്ഞേയമായിരുന്നിട്ടും TTL ക്രമീകരണത്തിനും സെഷൻ ഹെഡറുകൾക്കും മറ്റൊരിടത്തും ഫലമുണ്ടായിരുന്നില്ല. പരിഹാരം ആ ആദ്യകാല റിട്ടേൺ നീക്കം ചെയ്തു; ആഗോളമായി `0`-നു മുകളിൽ സജ്ജീകരിച്ചാൽ TTL ഇപ്പോൾ എല്ലാ പ്രൊവൈഡർമാർക്കും ഒരേപോലെ ബാധകമാണ്.

മൂന്ന് സെഷൻ-അഫിനിറ്റി ഹെഡറുകളും upstream-ലേക്ക് ഒരിക്കലും ഫോർവേഡ് ചെയ്യില്ല — ക്ലയന്റ് ഹെഡറുകൾ നേരിട്ട് കൈമാറുന്നതിനുപകരം എക്സിക്യൂട്ടറുകൾ സ്വന്തം upstream ഹെഡറുകൾ ആരംഭത്തിൽ നിന്ന് നിർമ്മിക്കുന്നു; അതിനാൽ ഇത് ഒരു ആഭ്യന്തര correlation id മാത്രമായി തുടരും.

### പ്രത്യേകമായി നിയന്ത്രിക്കപ്പെടുന്ന സെഷൻ കണക്ഷൻ ലീസുകൾ

**പരിധി:** ഒരു സജീവ മാനേജുചെയ്ത HTTP ക്ലയന്റ്/സെഷൻ ഒരു യോഗ്യമായ OmniRoute കണക്ഷന്റെ ഉടമസ്ഥത വഹിക്കുന്നു.

**ഉദ്ദേശ്യം:** അഭ്യർത്ഥനകളിലുടനീളം കർശനമായ റൂട്ടിംഗ് അതിർത്തി ആവശ്യമായ ക്ലയന്റുകൾക്കായി ദീർഘകാലം നിലനിൽക്കുന്ന പ്രത്യേക കണക്ഷൻ ഉടമസ്ഥത നൽകുക. ഇത് സെഷൻ അഫിനിറ്റിയിൽ നിന്ന് വ്യത്യസ്തമാണ്; സെഷൻ അഫിനിറ്റി മൃദുവായ തുടർച്ചാ മുൻഗണനയാണ്: ഒരു പ്രത്യേക ലീസ് ലൈഫ്സൈക്കിൾ നില SQLite-ൽ സ്ഥിരമായി സൂക്ഷിക്കുകയും, ആഗോള സജീവ-ഉടമയും സജീവ-കണക്ഷനും തമ്മിലുള്ള ഏകത്വം ഉറപ്പാക്കുകയും, പ്രൊവൈഡറിലേക്ക് dispatch ചെയ്യുന്നതിന് മുമ്പ് പഴകിയ generation നിരസിക്കുകയും ചെയ്യുന്നു.

ഈ സവിശേഷത ഓരോ API കീയ്ക്കും opt-in ആണ്. ഒരു മാനേജുചെയ്ത കീയ്ക്ക് `lease:exclusive` scope-ഉം, ശൂന്യമല്ലാത്ത വ്യക്തമായ `allowedConnections` ലിസ്റ്റും ഉണ്ടായിരിക്കണം. ഏതൊരു HTTP ക്ലയന്റിനും ലൈഫ്സൈക്കിൾ endpoint ഉപയോഗിക്കാം; ക്ലയന്റ് നാമം, user-agent, provider, OAuth രീതി, അല്ലെങ്കിൽ model ഒന്നും ആവശ്യമായിട്ടില്ല. ലീസ് ഒരു model-നെയല്ല, ഒരു കണക്ഷനെയാണ് സ്വന്തമാക്കുന്നത്; അതിനാൽ കണക്ഷൻ സാധാരണയായി യോഗ്യമായി തുടരുന്നിടത്തോളം model മാറ്റിയാലും binding നിലനിൽക്കും. സാധാരണ model, quota, health, cooldown, allowlist നിയമങ്ങൾക്കാണ് മുൻഗണന; അവ ഒരേ generation-നെ മറ്റൊരു സ്വതന്ത്ര യോഗ്യമായ കണക്ഷനിലേക്ക് മാറ്റിയേക്കാം.

ലൈഫ്സൈക്കിൾ `POST /api/v1/session-leases` ആണ്; JSON actions `acquire`, `renew`, `release` എന്നിവയാണ്. മാനേജുചെയ്ത inference അഭ്യർത്ഥനകൾ opaque `X-OmniRoute-Lease-Owner` മൂല്യവും കൃത്യമായ `X-OmniRoute-Lease-Generation` മൂല്യവും നൽകുന്നു. ഉടമ `vlo_`-ന് പിന്നാലെ വരുന്ന 43 base64url അക്ഷരങ്ങൾ ഉപയോഗിക്കുന്നു; അതിന്റെ SHA-256 hash മാത്രമാണ് സംഭരിക്കുന്നത്. ഓരോ അന്തിമ dispatch fence-ഉം authenticated API key ID-യും active connection ID-യും ബന്ധിപ്പിക്കുന്നു. Lease control headers-ുകൾ logs, നിലനിർത്തുന്ന request snapshots, upstream executor headers എന്നിവയിൽ നിന്ന് നീക്കം ചെയ്യുന്നു.

സാധാരണ routing-ന് യോഗ്യമായ managed candidates ഉണ്ടായിരിക്കെ, എല്ലാ സ്വതന്ത്ര candidates-ഉം വിദേശ സജീവ lease കൈവശപ്പെടുത്തിയിട്ടുണ്ടെങ്കിൽ, OmniRoute HTTP `429`, lease-capacity-unavailable code, waiting-for-capacity state, കൂടാതെ പ്രസക്തമായ ഏറ്റവും നേരത്തെയുള്ള expiry-ൽ നിന്ന് കണക്കാക്കുന്ന പരിധിയുള്ള `Retry-After` എന്നിവ മടക്കിനൽകുന്നു. സാധാരണ eligibility ശൂന്യമായിരിക്കുന്നത് lease contention അല്ല; അതിനാൽ നിലവിലുള്ള routing error semantics തന്നെ തുടരുന്നു.

ബന്ധപ്പെട്ട സംവിധാനങ്ങൾ വേർതിരിച്ചുതന്നെ നിലനിൽക്കും:

- OAuth session occupancy എന്നത് OAuth അക്കൗണ്ടുകൾക്കായുള്ള process-local soft distribution ആണ്.
- Account semaphores request-concurrency permits അനുവദിക്കുകയും ഒരു request പൂർത്തിയാകുമ്പോൾ അവസാനിക്കുകയും ചെയ്യുന്നു.
- Exclusive managed session leases ഒരു generation fence ഉള്ള സ്ഥിരതയുള്ള ലൈഫ്സൈക്കിൾ ഉടമസ്ഥതയാണ്.

## 3. മോഡൽ ലോക്ക്ഔട്ട്

**പരിധി:** provider + connection + model ട്രിപ്പിൾ.

**സ്റ്റാറ്റസ് അനുസരിച്ചുള്ള കീ പരിധി:** പരാജയപ്പെട്ട സ്റ്റാറ്റസ് ഏത് കീയിൽ ലോക്ക്ഔട്ട് എഴുതണമെന്ന് നിർണ്ണയിക്കുന്നു
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ക്വോട്ട അല്ലെങ്കിൽ അവകാശസൂചന — **ക്വോട്ട കുടുംബം** ലോക്ക് ചെയ്യുന്നു:
  codex-നായി മുഴുവൻ `codex` / `spark` സ്കോപ്പ് (connection-ലെ എല്ലാ `gpt-5*` മോഡലുകളും), മറ്റ് provider-കൾക്കായി `getQuotaScopedModelForProvider()`.
- `404` ബെയർ മോഡൽ ലോക്ക് ചെയ്യുന്നു (`getModelLockKey()` `not_found` ചുരുക്കുന്നു).
- മറ്റേതെങ്കിലും സ്റ്റാറ്റസ് — `5xx` ട്രാൻസ്പോർട്ട്/സെർവർ പരാജയങ്ങളും ഗുണനിലവാര പരിശോധനയിൽ OmniRoute സ്വയം സൃഷ്ടിക്കുന്ന
  `502`-ഉം — **കൃത്യമായ** provider/connection/model ട്യൂപ്പിൾ മാത്രം ലോക്ക് ചെയ്യുന്നു. ഒരു മോഡലിലെ മോശം സ്ട്രീം
  അക്കൗണ്ടിന്റെ ക്വോട്ടയെക്കുറിച്ചുള്ള തെളിവല്ല; ഈ നിയമത്തിന് മുമ്പ് `codex/gpt-5.6-luna`-യിലെ ഒരു ശൂന്യ പ്രതികരണം
  ആ connection-ലെ എല്ലാ `gpt-5*` മോഡലുകളും 2–30 മിനിറ്റേക്ക് (വർധിച്ചുകൊണ്ട്) റൂട്ടിംഗിൽ നിന്ന് നീക്കം ചെയ്തിരുന്നു,
  അതേസമയം അതിന്റെ ക്വോട്ട മാറ്റമില്ലാതെ തുടർന്നു.
- ഒരു caller-ന്റെ വ്യക്തമായി നൽകിയ `scope` ഓപ്ഷനാണ് എല്ലായ്പ്പോഴും മുൻഗണന നേടുന്നത് (Antigravity `"exact"` കൈമാറുന്നു).

**ഉദ്ദേശ്യം:** ഒരു മോഡൽ മാത്രം ലഭ്യമല്ലാത്തപ്പോഴോ ക്വോട്ട പരിമിതമായപ്പോഴോ മുഴുവൻ connection പ്രവർത്തനരഹിതമാക്കുന്നത് ഒഴിവാക്കുക.

**ഉദാഹരണങ്ങൾ:**

- 429 നൽകുന്ന ഓരോ മോഡലിനും വേറിട്ട ക്വോട്ടയുള്ള provider-കൾ
- കാണാതായ ഒരു മോഡലിനായി 404 നൽകുന്ന പ്രാദേശിക provider-കൾ
- Provider-നിർദ്ദിഷ്ട മോഡ്/മോഡൽ അനുമതി പരാജയങ്ങൾ (ഉദാ., Grok മോഡുകൾ)

**നടപ്പാക്കൽ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### മോഡൽ കൂൾഡൗൺസ് ഡാഷ്ബോർഡ് (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

സജീവമായ ലോക്ക്ഔട്ടുകൾ provider, connection, model, കാരണം, expiresAt എന്നിവയോടെ പട്ടികപ്പെടുത്തുന്നു. കാർഡിൽ നിന്ന് ഒരു മോഡൽ ഓപ്പറേറ്റർമാർക്ക് മാനുവലായി വീണ്ടും പ്രവർത്തനക്ഷമമാക്കാം.

**REST API:**

- `GET /api/resilience/model-cooldowns` — സജീവമായ ലോക്ക്ഔട്ടുകളുടെ പട്ടിക
- `DELETE /api/resilience/model-cooldowns` — മാനുവലായി വീണ്ടും പ്രവർത്തനക്ഷമമാക്കൽ. Body: `{provider, connection, model}`. Auth: management.

### കൂൾഡൗൺ മാനേജർ

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

താൽക്കാലിക കാരണത്താൽ റൂട്ടിംഗിൽ നിന്ന് പുറത്തായിരിക്കുന്ന ഓരോ connection-നും വേറിട്ട provider പേജ് തുറക്കുന്നതിന് പകരം
ഒരു പേജ്. ഇത് connection കൂൾഡൗണുകൾ, മോഡൽ ലോക്ക്ഔട്ടുകൾ, ടെർമിനൽ സ്റ്റേറ്റുകൾ എന്നിവ പട്ടികപ്പെടുത്തുന്നു; connection-പ്രകാരം,
തിരഞ്ഞെടുത്തവയ്ക്കായി, അല്ലെങ്കിൽ ഒരു provider-ന്റെ എല്ലാ connection-കൾക്കുമായി അവ മായ്ച്ചുകളയുന്നു; കൂടാതെ ഏറ്റവും കൂടുതൽ
ക്രമീകരിക്കപ്പെടുന്ന കൂൾഡൗൺ നിയമങ്ങൾ തിരുത്തുന്നു: `streamStallCooldown.enabled`, OAuth / API-key
`connectionCooldown`-ന്റെ അടിസ്ഥാന കൂൾഡൗൺ, പരമാവധി backoff ഘട്ടങ്ങൾ എന്നിവ
(`PATCH /api/resilience` വഴി സംരക്ഷിക്കുന്നു). ടെർമിനൽ സ്റ്റേറ്റുകൾ (`banned`, `expired`, `credits_exhausted`) പട്ടികപ്പെടുത്തും,
എന്നാൽ ഇവിടെ ഒരിക്കലും മായ്ച്ചുകളയില്ല.

അതേ പേജിലെ **Error cooldown rules** കാർഡ്, `PATCH /api/settings` വഴി ഓപ്പറേറ്റർ പിശക് നിയമങ്ങൾ
(`settings.providerErrorRules`)യും ഓരോ provider-നുമുള്ള catch-all ഡിഫോൾട്ടുകൾ
(`settings.providerErrorDefaults`)യും തിരുത്തുന്നു — അവ എങ്ങനെ പൊരുത്തപ്പെടുന്നു എന്നതിന് §7-ലെ
"Operator-declared rules" കാണുക. ദൈർഘ്യങ്ങൾ Default (വ്യക്തമായ കൂൾഡൗൺ ഇല്ല), 30 മിനിറ്റ്,
1 മണിക്കൂർ, 5 മണിക്കൂർ, 24 മണിക്കൂർ, അല്ലെങ്കിൽ 1 മുതൽ 43,200 മിനിറ്റ് വരെ (30 ദിവസം) ഉള്ള ഇഷ്ടാനുസൃത
മൂല്യം ആയിരിക്കാം.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — സ്റ്റാറ്റസ്, ശേഷിക്കുന്ന കൂൾഡൗൺ,
  backoff ലെവൽ, അവസാന പിശക് തരം, മോഡൽ ലോക്ക്ഔട്ടുകൾ എന്നിവയുള്ള connection-കൾ (credentials ഇല്ല)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` അല്ലെങ്കിൽ
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` നൽകുന്നു

### ലോക്ക്ഔട്ട് ക്രമീകരണ UI + വിജയ-ക്ഷയ വീണ്ടെടുക്കൽ (v3.8.23)

മോഡൽ ലോക്ക്ഔട്ട് എല്ലായ്പ്പോഴും സജീവമായ hardcoded പെരുമാറ്റത്തിൽ നിന്ന്, സ്വന്തം ക്രമീകരണ കാർഡും
സ്വയം-പരിഹരിക്കുന്ന വീണ്ടെടുക്കൽ പാതയും ഉള്ള, പൂർണ്ണമായി ക്രമീകരിക്കാവുന്ന opt-in സവിശേഷതയായി മാറി.

**ക്രമീകരണ കാർഡ്:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
ഇത് മുകളിൽ പറഞ്ഞ വായിക്കാൻ മാത്രം കഴിയുന്ന `ModelCooldownsCard`-ൽ നിന്ന് **വ്യത്യസ്തമാണ്**
(അത് സജീവമായ ലോക്ക്ഔട്ടുകൾ മാത്രം _പട്ടികപ്പെടുത്തുന്നു_) — പുതിയ കാർഡ് _പരാമീറ്ററുകൾ ക്രമീകരിക്കുന്നു_.
ഡിഫോൾട്ടുകൾ `DEFAULT_MODEL_LOCKOUT_SETTINGS`-ൽ
(`src/lib/resilience/modelLockoutSettings.ts`) നിലനിൽക്കുന്നു:

| ക്രമീകരണം               | ഡിഫോൾട്ട്                        | അർത്ഥം                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | മാസ്റ്റർ ടോഗിൾ — മോഡൽ ലോക്ക്ഔട്ട് ഡിഫോൾട്ടായി **ഓഫ്** ആണ്.               |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | മോഡൽ-സ്കോപ്പിലുള്ള പരാജയമായി കണക്കാക്കുന്ന upstream സ്റ്റാറ്റസുകൾ.       |
| `baseCooldownMs`        | `120_000` (120 s)                | ആദ്യ പരാജയത്തിനുള്ള പ്രാരംഭ ലോക്ക്ഔട്ട് ദൈർഘ്യം.                         |
| `maxCooldownMs`         | `1_800_000` (30 min)             | വർധിപ്പിച്ച കൂൾഡൗണിന്റെ പരമാവധി പരിധി.                                   |
| `maxBackoffSteps`       | `10`                             | എക്സ്പോണൻഷ്യൽ-backoff വർധനയുടെ പരമാവധി ഘട്ടങ്ങൾ.                         |
| `useExponentialBackoff` | `true`                           | ആവർത്തിച്ചുള്ള പരാജയങ്ങൾ കൂൾഡൗൺ എക്സ്പോണൻഷ്യൽ ആയി വർധിപ്പിക്കണമോ എന്നത്. |

ക്രമീകരണങ്ങൾ സാധാരണ settings store വഴി നിലനിൽക്കുകയും resilience settings schema വഴി സാധൂകരിക്കപ്പെടുകയും ചെയ്യുന്നു;
കാർഡ് `baseCooldownMs`/`maxCooldownMs`-നെ (`maxCooldownMs ≥ baseCooldownMs` ആയി) കൂടാതെ
`maxBackoffSteps`-നെയും പരിധിയിടുന്നു.

**വിജയ-ക്ഷയ വീണ്ടെടുക്കൽ:** വീണ്ടെടുക്കൽ പൂർണ്ണമായും ടൈമർ കാലഹരണപ്പെടുന്നതിൽ ആശ്രയിച്ചുള്ളതല്ല. ആരോഗ്യകരമായ
പ്രതികരണം മോഡലിന്റെ പരാജയ കണക്ക് കുറച്ചുകൊണ്ടിരിക്കും; അതിനാൽ ഇടക്കാലത്ത് വീണ്ടെടുത്ത മോഡൽ വർധിച്ചുകൊണ്ടിരിക്കാതെ
തന്റെ ടൈമർ അവസാനിക്കുന്നതിന് മുമ്പുതന്നെ നിർത്തുകയും (ലോക്ക്ഔട്ട് മായ്ച്ചുകളയുകയും) ചെയ്യും. വിജയകരമായ
combo target-ൽ, `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) വിളിക്കുന്നു; ഇത് സംഭരിച്ചിരിക്കുന്ന
`failureCount`-നെ പകുതിയാക്കുന്നു (`Math.floor(failureCount / 2)`); അത് `0`-ൽ എത്തുമ്പോൾ ലോക്ക്ഔട്ട് എൻട്രി
പൂർണ്ണമായും ഇല്ലാതാക്കുന്നു. ഇതിന്റെ പ്രതിരൂപമായ `recordModelLockoutFailure()`
പരാജയങ്ങളിൽ failure count വർധിപ്പിക്കുകയും (കൂൾഡൗൺ വർധിപ്പിക്കുകയും) ചെയ്യുന്നു. ഈ വിജയ-ക്ഷയം സാധാരണ ടൈമർ
കാലഹരണപ്പെടലിന് പുറമേയുള്ളതാണ് — ഏതെങ്കിലും പാതയിലൂടെ മോഡൽ വീണ്ടും പ്രവർത്തനക്ഷമമാക്കാം.

**അവസ്ഥ:** ലോക്കൗട്ടുകൾ **മെമ്മറിയിൽ** സൂക്ഷിക്കുന്നു (പ്രോസസ്-തലത്തിലുള്ള `Map`s, `provider:connectionId:model` പ്രകാരം കീ ചെയ്ത `ModelLockoutEntry`-കൾ, കൂടാതെ `provider:connectionId:exact:model` പ്രകാരമുള്ള കൃത്യ-സ്കോപ്പ് ലോക്കുകൾ), അവ DB-യിൽ സ്ഥിരമായി സൂക്ഷിക്കുന്നില്ല — പുനരാരംഭിക്കുമ്പോൾ അവ നഷ്ടപ്പെടും. _ക്രമീകരണങ്ങൾ_ സ്ഥിരമായി സൂക്ഷിക്കപ്പെടുന്നു; സജീവമായ ലോക്കൗട്ട് _അവസ്ഥ_ താൽക്കാലികമാണ്.

---

## 4. ക്വോട്ടാ-ഷെയർ കോൺകറൻസി നിയന്ത്രണം (v3.8.36)

സബ്സ്ക്രിപ്ഷൻ അക്കൗണ്ടുകൾ (GLM, MiniMax തുടങ്ങിയവ) സാധാരണയായി ~1–3 സമകാലിക
അഭ്യർത്ഥനകൾ മാത്രമേ സ്വീകരിക്കാറുള്ളൂ; അതിൽ കൂടുതലായാൽ 429-കളും കൂൾഡൗണുകളും
ട്രിഗർ ചെയ്യും. നിരവധി API കീകൾ ഒരേ അപ്സ്ട്രീം അക്കൗണ്ട് പങ്കിടുന്ന
**quota-share** (`qtSd/…`) കോമ്പോകളിൽ ഇത് പ്രത്യേകിച്ച് ഗുരുതരമാണ്. പങ്കിട്ട അക്കൗണ്ട്
അമിതമായി നിറയുന്നത് തടയാൻ മൂന്ന് പാളികൾ പ്രവർത്തിക്കുന്നു.

### ഓരോ കണക്ഷനുമുള്ള കോൺകറൻസി പരിധി (`max_concurrent`)

ഓരോ പ്രൊവൈഡർ കണക്ഷനും ഒരു `max_concurrent` പരമാവധി പരിധി പ്രഖ്യാപിക്കാം
(`provider_connections.max_concurrent`, കണക്ഷൻ മോഡൽ / API / DB-യിൽ സജ്ജമാക്കുന്നത്).
പരിധി വേണ്ടെങ്കിൽ ഇത് ശൂന്യമായി വിടുക. താഴെയുള്ള സീരിയലൈസേഷൻ ലെയറിനെ നിയന്ത്രിക്കുന്ന
ഒറ്റ നോബാണിത് — അക്കൗണ്ടിന്റെ യഥാർത്ഥ കോൺകറൻസിക്ക് അനുസരിച്ച് ഇത് സജ്ജമാക്കുക
(ഉദാ. GLM ~1, MiniMax ~2).

### ഓരോ മോഡലിനുമുള്ള കോൺകറൻസി പരിധികൾ (`modelConcurrency`)

ഒരു കണക്ഷന് അതിന്റെ `rateLimitOverrides` മാപ്പിനുള്ളിൽ കൃത്യമായ ഓരോ മോഡലിനുമുള്ള
കോൺകറൻസി പരിധികളും പ്രഖ്യാപിക്കാം:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

ഇത് കണക്ഷൻ മോഡലിൽ (**Rate limit overrides → Per-model
concurrency caps**, ഓരോ വരിയിലും ഒരു `model=cap`) അല്ലെങ്കിൽ അതേ JSON ഘടനയോടെ
`PATCH /api/providers/[id]` വഴി സജ്ജമാക്കാം. പ്രധാന സെമാന്റിക്സ്:

- **കണക്ഷൻ-വ്യാപകവും മോഡൽ-നിർദ്ദിഷ്ടവും:** `maxConcurrent` പങ്കിട്ട
  കണക്ഷൻ-വ്യാപക പരിധിയായി തുടരും. രണ്ടും ബാധകമായാൽ, ഒരേ കോമ്പോസിറ്റ് ഗേറ്റിൽ
  (`global → provider → account → model`) രണ്ട് ഗേറ്റുകളും ആറ്റമിക്കായി കൈവരിക്കും;
  പ്രാബല്യത്തിലുള്ള പെരുമാറ്റം ബാധകമായ പരിധികളിൽ കൂടുതൽ കർശനമായതായിരിക്കും.
- **കൃത്യമായ മോഡൽ-കീ പൊരുത്തം:** റൂട്ടിംഗ് പരിഹരിച്ചതിന് ശേഷം എക്സിക്യൂട്ടറിലേക്ക്
  കൈമാറുന്ന മോഡൽ സ്ട്രിംഗാണ് കീ — സാധാരണയായി ക്ലയന്റ്-സൈഡ്
  `provider/model` അലിയാസല്ലാത്ത, അപ്സ്ട്രീം മോഡലിന്റെ അടിസ്ഥാന ഐഡി
  (`glm-5`) ആയിരിക്കും (`zai/glm-5` എന്നത് `glm-5`-നോട് പൊരുത്തപ്പെടില്ല).
  മൂല്യങ്ങൾ പോസിറ്റീവ്-ഇന്റിജർ സമകാലിക-അഭ്യർത്ഥന പരിധികളായിരിക്കണം.
- **ലോക്കൽ ക്യൂയിംഗ്, ഡിസ്കവറി ഇല്ല:** അധിക അഭ്യർത്ഥനകൾ നിലവിലുള്ള
  ക്യൂ/ടൈംഔട്ട് സെമാന്റിക്സുപയോഗിച്ച് ലോക്കലായി ക്യൂവിൽ കാത്തിരിക്കും (ടൈപ്പ് ചെയ്ത
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` അഡ്മിഷൻ പിശകുകൾ). ഓപ്പറേറ്റർ
  കോൺഫിഗർ ചെയ്ത കൃത്യമായ പരിധികൾ മാത്രമാണ് OmniRoute നടപ്പാക്കുന്നത്; അപ്സ്ട്രീം
  നയം കണ്ടെത്തുകയോ അനുമാനിക്കുകയോ ചെയ്യില്ല. നിറഞ്ഞ മോഡൽ ഗേറ്റ് പ്രൊവൈഡറെ
  പ്രവർത്തനരഹിതമാക്കുകയോ സ്ഥിരമായ മോഡൽ ലോക്കൗട്ട് സൃഷ്ടിക്കുകയോ ചെയ്യില്ല;
  അപ്സ്ട്രീം 429/കൂൾഡൗൺ/ഫോൾബാക്ക് പെരുമാറ്റം പിശകുകൾക്കുള്ള ബാക്ക്സ്റ്റോപ്പായി
  തുടരും.
- **ഓരോ കണക്ഷനും, ഓരോ പ്രോസസിനുമുള്ള സ്കോപ്പ്:** പരിധികൾ ഓരോ ഡാറ്റാബേസ്
  കണക്ഷനും പ്രത്യേകം ബാധകമാണ്, മെമ്മറിയിൽ സൂക്ഷിക്കപ്പെടുന്നു; അതിനാൽ ഒരേ
  അപ്സ്ട്രീം API കീ വീണ്ടും ഉപയോഗിക്കുന്ന രണ്ട് കണക്ഷനുകൾ പരസ്പരം
  ഏകോപിപ്പിക്കില്ല.
- **കോൺഫിഗർ ചെയ്യാത്തത് എന്നാൽ മാറ്റമില്ല:** മാപ്പ് ഒഴിവാക്കുകയോ ഡാഷ്ബോർഡ്
  ഫീൽഡ് ശൂന്യമായി വിടുകയോ ചെയ്താൽ മോഡൽ ഗേറ്റ് ചേർക്കില്ല. സർവത്രികമായ
  പ്രൊവൈഡർ പരിധി പ്രഖ്യാപിക്കാത്ത ഉദാഹരണ കോൺഫിഗറേഷൻ:

```text
glm-5=1
glm-4.7=3
```

### ക്വോട്ടാ-ഷെയർ അഭ്യർത്ഥന സീരിയലൈസേഷൻ

ഒരു ക്വോട്ടാ-ഷെയർ ഡിസ്പാച്ച് പോസിറ്റീവ് `max_concurrent` പ്രഖ്യാപിച്ചിരിക്കുന്ന
കണക്ഷനെ ലക്ഷ്യമിടുമ്പോൾ, ആ **അക്കൗണ്ടിലേക്കുള്ള** സമകാലിക അഭ്യർത്ഥനകൾ ഓരോ
കണക്ഷനുമുള്ള സെമാഫോറിലൂടെ സീരിയലൈസ് ചെയ്യും (കീ `qsconn:<connectionId>`):
അധിക അഭ്യർത്ഥനകൾ അക്കൗണ്ടിലേക്ക് ഒരുമിച്ച് ഒഴുക്കിവിടുന്നതിനുപകരം
**ക്യൂവിൽ കാത്തിരിക്കും**. ഇത് **fail-open** ആണ് — നിറഞ്ഞ ക്യൂവോ ടൈംഔട്ടോ
വന്നാലും ഒരു സ്ലോട്ട് ഇല്ലാതെ തന്നെ തുടരും; ഡിസ്പാച്ച് ചെയ്യാവുന്ന അഭ്യർത്ഥനയെ
ഒരിക്കലും നിരസിക്കില്ല. **Settings → Resilience → Quota-share per-connection
concurrency**-ൽ ടോഗിൾ ചെയ്യാം
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ഡിഫോൾട്ട്
on). `max_concurrent` പരിധിയില്ലെങ്കിൽ പെരുമാറ്റത്തിൽ മാറ്റമില്ല.

> ക്വോട്ടാ-ഷെയർ റൂട്ടിംഗ് ഗേറ്റ് (`selectQuotaShareTarget`, DRR + P2C) തന്നെ
> fail-open ആണ്, പരിധിയിലെത്തിയ കണക്ഷന് കുറഞ്ഞ മുൻഗണന മാത്രമേ നൽകൂ — ഒറ്റ
> കണക്ഷനുള്ള പൂളിൽ ഇതിന് കർശന പരിധി ഏർപ്പെടുത്താനാകില്ല; അതിനാൽ യഥാർത്ഥത്തിൽ
> ഈ ഒഴുക്ക് നിയന്ത്രിക്കുന്നത് ഈ സെമാഫോറാണ്.

### കോമ്പോ കൂൾഡൗൺ-അവബോധമുള്ള റിട്രൈ

എല്ലാ കോമ്പോ സ്ട്രാറ്റജികൾക്കും (പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോൾ), ഒരു SHORT
താൽക്കാലിക കൂൾഡൗണിൽ 429 ഉണ്ടാകാൻ ഇടയുള്ള അഭ്യർത്ഥന 429 തിരികെ നൽകുന്നതിനുപകരം
കൂൾഡൗൺ അവസാനിക്കുന്നതുവരെ കാത്തിരുന്ന് വീണ്ടും ഡിസ്പാച്ച് ചെയ്യും — മൾട്ടി-മോഡൽ
കോമ്പോകളിലെ Gemini-ക്ലാസ് TPM/RPM വിൻഡോകൾക്ക് (~60s retry-after) ഇത് ബാധകമാണ്;
ഉദാഹരണത്തിന് 2-മോഡൽ കോമ്പോയിലെ രണ്ട് ടാർഗറ്റുകളും ഓരോ മോഡലിനുമുള്ള റേറ്റ്
ലിമിറ്റിൽ തട്ടുമ്പോൾ. **Settings → Resilience**-ലുള്ള `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ഇതിനെ പരിധിയിടുന്നു.
`quota_exhausted`-നായി (അർദ്ധരാത്രിവരെ ലോക്ക് ചെയ്തിരിക്കുന്നത്) അല്ലെങ്കിൽ
auth/not-found കാരണങ്ങൾക്കായി ഇത് ഒരിക്കലും കാത്തിരിക്കില്ല.

ഒരു കോമ്പോയ്ക്ക് `config.comboCooldownWaitEnabled: false` ഉപയോഗിച്ച് ഒഴിവാകാം.
ലിറ്ററൽ `false` മാത്രമാണ് ഈ പങ്കിട്ട കോമ്പോ കാത്തിരിപ്പുകൾ (ഡിസ്പാച്ചിനു ശേഷമുള്ള
കൂൾഡൗണും ഡിസ്പാച്ചിനു മുമ്പുള്ള സർക്യൂട്ട്-ഓപ്പൺ/മോഡൽ-ലോക്ക് കാത്തിരിപ്പുകളും)
അവയുടെ wait-budget timeout-floor വിപുലീകരണവും പ്രവർത്തനരഹിതമാക്കുന്നത്.
ഇല്ലാത്തതോ `true` ആയതോ ആഗോള നയം നിലനിർത്തും; ആഗോളമായി കാത്തിരിപ്പ്
പ്രവർത്തനരഹിതമാക്കിയിരിക്കുമ്പോൾ `true` അതിനെ പ്രവർത്തനക്ഷമമാക്കില്ല.
വ്യക്തമായി നൽകിയ `targetTimeoutMs`-നാണ് ഇപ്പോഴും മുൻഗണന. വേറിട്ട native-Codex
turn-pin ഡിസ്പാച്ചിനു മുമ്പുള്ള കാത്തിരിപ്പിനെ ഈ opt-out മാറ്റില്ല.

അതേ ഗേറ്റ് ഡിസ്പാച്ചിനു മുമ്പുള്ള സാഹചര്യവും ഉൾക്കൊള്ളുന്നു (#16319): ഒരു
ശ്രമവും നടത്തുന്നതിന് മുമ്പ് ഓരോ ടാർഗറ്റിന്റെയും മോഡൽ ചെറിയ താൽക്കാലിക
ലോക്കൗട്ടിലായതിനാൽ കോമ്പോയിലെ എല്ലാ ടാർഗറ്റുകളും ഒഴിവാക്കപ്പെടുമ്പോൾ, പൂജ്യ
ശ്രമങ്ങളുള്ള പാത അതേ പരിധികൾക്കുള്ളിൽ ലോക്കൗട്ട് അവസാനിക്കുന്നതുവരെ കാത്തിരുന്ന്
വീണ്ടും ഡിസ്പാച്ച് ചെയ്യും; hint ഇല്ലാത്ത `503 ALL_TARGETS_SKIPPED` മറുപടി
നൽകുകയില്ല. കാത്തിരിപ്പ് അനുവദനീയമല്ലെങ്കിൽ (പരിധി, ശ്രമങ്ങളുടെ എണ്ണം, അല്ലെങ്കിൽ
ബജറ്റ് തീർന്നാൽ, അഥവാ ഫീച്ചർ ഓഫ് ആണെങ്കിൽ), ടെർമിനൽ പ്രതികരണം
`retry_after` / `reset_at` ഉൾക്കൊള്ളുന്ന `429 rate_limit_error` ആയി ഉയർത്തും;
ഇത് ഏറ്റവും നേരത്തെയുള്ള താൽക്കാലിക ലോക്ക് അവസാനിക്കുന്ന സമയത്തിൽ നിന്നുള്ളതാണ്.
ക്വോട്ടാ, auth, not-found ലോക്കുകൾ hint ഇല്ലാത്ത 503 ആയി തുടരും.

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

## 5. അഭ്യർത്ഥന ക്യൂ അഡ്മിഷൻ നിയന്ത്രണം (v3.8.49 · ഇഷ്യൂ #6593)

**പരിധി**: ഓരോ പ്രൊവൈഡർ+കണക്ഷനിലുമുള്ള പ്രാദേശിക റേറ്റ്-ലിമിറ്റ് ക്യൂ (`open-sse/services/rateLimitManager.ts`, Bottleneck അധിഷ്ഠിതം), മുകളിൽ വിവരിച്ച മൂന്ന് സംവിധാനങ്ങൾക്ക് ഒരു നില താഴെയുള്ളത്.

**`maxWaitMs` ക്യൂ കാത്തിരിപ്പിനെ പരിമിതപ്പെടുത്തുന്നു; `executionMaxWaitMs` എക്സിക്യൂഷനെ പരിമിതപ്പെടുത്തുന്നു.**
രണ്ടും ബോധപൂർവ്വം വേർതിരിച്ചിട്ടുള്ളതാണ്; ഒന്ന് മറ്റൊന്നിനെ ഫീഡ് ചെയ്യുന്നുമില്ല.

`resilienceSettings.requestQueue.maxWaitMs` എന്നത് **ക്യൂ-കാത്തിരിപ്പ് ബജറ്റ്** ആണ്: ഒരു പ്രൊവൈഡർ സ്ലോട്ടിനായി കാത്തിരിക്കുന്നതും തുടർന്ന് QUEUED-ൽ ഇരിക്കുന്നതും ഇത് ഉൾക്കൊള്ളുന്നു; ജോബ് QUEUED വിട്ട് എക്സിക്യൂട്ട് ചെയ്യാൻ തുടങ്ങുന്ന ഉടനടി അതിന്റെ ടൈമർ ക്ലിയർ ചെയ്യപ്പെടുന്നു
(`rateLimitManager.ts`, `wrappedFn`). ഇത് കവിയുന്ന ഒരു അഭ്യർത്ഥന ഒരിക്കലും അപ്സ്ട്രീമിൽ എത്തുന്നില്ല. ഡിഫോൾട്ട് 30000ms, `src/lib/resilience/settings.ts`-ലെ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` നൽകുന്നതും `tests/unit/ratelimit-admission-control-6593.test.ts` പിൻ ചെയ്യുന്നതും ആണ് — അതിനാൽ അതിലെ ഒരു മാറ്റം ആ ടെസ്റ്റിനെ ചുവപ്പാക്കും, ഈ ഖंडികയെ നിശ്ശബ്ദമായി കാലഹരണപ്പെട്ടതായി അവശേഷിപ്പിക്കുകയല്ല.

`resilienceSettings.requestQueue.executionMaxWaitMs` എന്നത് Bottleneck ജോബിന്റെ `expiration` ആയി സ്വീകരിക്കുന്നതാണ്; അതിന്റെ ടൈമർ ഡിസ്പാച്ചിന് ശേഷം മാത്രമേ ആരംഭിക്കൂ. സ്വന്തമായി അപ്സ്ട്രീം ടൈംഔട്ട് ഇല്ലാത്ത എക്സിക്യൂട്ടർമാർക്കുള്ള ഒരു ബാക്ക്സ്റ്റോപ്പാണിത്; എക്സിക്യൂട്ടറിന്റെ സ്വന്തം ഫെച്ച്-സ്റ്റാർട്ട് ടൈംഔട്ട് അതിലും ദൈർഘ്യമേറിയതാണെങ്കിൽ അതിനനുസരിച്ച് ഇത് ഉയർത്തപ്പെടുന്നു — അതിനാൽ ആരോഗ്യകരമായി പുരോഗമിക്കുന്ന (in-flight) ഒരു പ്രതികരണത്തെ ഇതിന് മുറിച്ചുകളയാനാവില്ല. ഡിഫോൾട്ട് 600000ms (10 മിനിറ്റ്).

ക്യൂ ബജറ്റ് `expiration`-ലേക്ക് ഫീഡ് ചെയ്യുന്നതാണ് non-incremental ഗേറ്റ്വേകളെ മധ്യയാത്രയിൽ നിർത്തിക്കൊന്നിരുന്നത് — ആദ്യ ബൈറ്റുകൾക്ക് മുമ്പ് അവ ന്യായമായും മിനിറ്റുകളോളം ഓടാറുണ്ട് — ഒരു expiration `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ആയി പ്രത്യക്ഷപ്പെടാനും ക്യൂ ബജറ്റ് ക്യൂ-ടൈംഔട്ട് കോഡ് വഹിക്കാനും കാരണം ഇതുതന്നെയാണ്. `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) വഴിയോ ഡാഷ്ബോർഡ് (**Settings → Resilience**) വഴിയോ ഏതിനെയും അസാധുവാക്കാം. നോർമലൈസ് ചെയ്യുമ്പോൾ രണ്ടും 1ms–24h പരിധിയിൽ ക്ലാമ്പ് ചെയ്യപ്പെടുന്നു.

**മുൻഗണന, രണ്ടിനും:** env var _ഡിഫോൾട്ട്_ മാത്രമേ നൽകൂ. `resilienceSettings.requestQueue`-ൽ സ്ഥിരമായി സൂക്ഷിച്ചിരിക്കുന്ന ഒരു മൂല്യം (ഡാഷ്ബോർഡ് / API patch, `key_value`-ൽ സൂക്ഷിക്കപ്പെട്ടത്) അതിനെ മറികടക്കും; ഓരോ കണക്ഷനിലുമുള്ള `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` അതിനെയും മറികടക്കും. അതിനാൽ, ഇതിനകം സൂക്ഷിച്ച മൂല്യമുള്ള ഒരു ഡിപ്ലോയ്മെന്റിൽ env var സജ്ജീകരിച്ചാലും ഒന്നും മാറുന്നില്ല — പകരം സൂക്ഷിച്ചിരിക്കുന്ന ക്രമീകരണം മായ്ക്കുകയോ അപ്ഡേറ്റ് ചെയ്യുകയോ ചെയ്യുക.

ക്യൂവിലെ താമസം `maxWaitMs` കൊണ്ട് പരിമിതമാണ്; താഴെ പറയുന്ന `maxQueueDepth` ഏതൊരു സമയത്ത് എത്ര കോളർമാർക്ക് ക്യൂവിൽ ഇരിക്കാമെന്നത് പരിമിതപ്പെടുത്തുന്നു.

**ബോഡി-പ്രസ്താവിത റീട്രൈകൾ: പേസിംഗ് vs ലോക്ക്ഔട്ട്.** ഒരു 429 ബോഡിക്ക് അതിന്റെ സ്വന്തം കാത്തിരിപ്പ് നിർദ്ദേശിക്കാം
(Gemini `RetryInfo.retryDelay`, "retry after Ns" ടെക്സ്റ്റ്), ഇത് `updateFromResponseBody` വായിക്കുന്നു. കണക്ഷന്റെ `maxWaitMs`-ൽ ഒതുങ്ങുന്ന ഒരു കാത്തിരിപ്പ് പേസിംഗ് ആണ്: ലിമിറ്റർ അത്ര നേരത്തേക്ക് തന്റെ റിസർവോയർ ശൂന്യമാക്കുന്നു, അത് വീണ്ടും നിറയുമ്പോൾ ക്യൂവിലുള്ള കോളുകൾ ഡിസ്പാച്ച് ചെയ്യപ്പെടുന്നു. `maxWaitMs`-ൽ കൂടുതലുള്ള ഒരു കാത്തിരിപ്പ് ക്യൂവിന് താങ്ങിയിരിക്കാൻ കഴിയുന്നതല്ല — തീർന്നുപോയ പ്രതിദിന ക്വോട്ടയ്ക്ക് Gemini `retryDelay: "86399s"` എന്നാണ് മറുപടി നൽകുന്നത്. പുനർനിർമ്മിച്ച 429-ലെ റിലേ ചെയ്യപ്പെട്ട `Retry-After` (#16528) ആ സമയജാലകത്തേക്ക് ഫോൾബാക്ക് എഞ്ചിൻ മോഡലിനെ ലോക്ക് ചെയ്യാൻ ഇതിനകം ഇടയാക്കുന്നു; എന്നാൽ അതിനായി ലിമിറ്ററിനെയും pause ചെയ്യുന്നത്, കീയിലേക്ക് നേരത്തെ എത്തുന്ന ഏത് കോളിനെയും (ഉദാഹരണത്തിന്, ഒരു റെസിലിയൻസ് റീസെറ്റിന് ശേഷം) മുഴുവൻ `maxWaitMs`-ത്തേക്കും തടഞ്ഞുനിർത്തും. അത്തരം ഒരു കാത്തിരിപ്പ് ടൈപ്പ് ചെയ്ത ഒരു Google `RetryInfo` ഡീറ്റെയിലിൽ നിന്ന് (`google_rpc_retry_info` ഉത്ഭവം) വരുമ്പോഴും കീയുടെ ലിമിറ്റർ ഇതിനകം മോഡലിലേക്ക് സ്കോപ്പ് ചെയ്യപ്പെട്ടിരിക്കുമ്പോഴും (കാണുക `getLimiterKey`), ആ 429 പകരം ആ കണക്ഷനിലെ ഒരു മോഡൽ ലോക്ക്ഔട്ടായി മാറുന്നു (`open-sse/services/rateLimitManager/bodyRetryPause.ts`-ലെ `lockModelForLongBodyRetry`, 24 മണിക്കൂറിൽ പരിധിക്ല്പ്തം), ലിമിറ്റർ pause ചെയ്യാതെ തന്നെ അവശേഷിക്കുന്നു. അക്കൗണ്ട് തിരഞ്ഞെടുപ്പ് `isModelLocked()` വഴി ആ ലോക്കിൽ ഒഴിവാക്കുന്നു; കണക്ഷനിലേക്ക് പിൻ ചെയ്തിരിക്കുന്ന ടാർഗറ്റുകൾക്കുള്ള കോംബോ പ്രീ-ഡിസ്പാച്ച് ഗേറ്റും അതുപോലെ ചെയ്യുന്നു. ഓരോ ക്വോട്ട ഫാമിലിക്കും ലിമിറ്ററുള്ള antigravity-യിൽ, ലോക്ക് കൃത്യമായ മോഡലിലാണ് — അതിന്റെ മറ്റ് ക്വോട്ട ലോക്കുകളെപ്പോലെ. ഒരു അലിയസ് അതിനെ ആ മോഡലിലേക്ക് പരിഹരിച്ചപ്പോൾ ക്ലയന്റ് ചോദിച്ച പേരും ലോക്ക് ചെയ്യപ്പെടുന്നു, കാരണം ആ പരിശോധനകൾ അഭ്യർത്ഥിച്ച പേരാണ് ഉപയോഗിക്കുന്നത്; അത് കൃത്യമായി ലോക്ക് ചെയ്യപ്പെടുന്നു (`lockExactModel`), അതിനാൽ ഒരു antigravity ക്വോട്ട ഫാമിലിയോ codex സ്കോപ്പോ കടന്നുപോകുന്ന ഒരു അലിയസ് ഒരിക്കലും സ്വന്തത്തിനെ ലോക്ക് ചെയ്യുന്നില്ല. ഒരു വാച്യ സൂചന (prose hint), ടൈപ്പ് ചെയ്യാത്ത ഒരു `retryDelay`, അല്ലെങ്കിൽ മുഴുവൻ കണക്ഷനും പങ്കിടുന്ന ഒരു ലിമിറ്റർ — ഇവ pause-നെ നിലനിർത്തുന്നു. 429 പാത്ത ഇതിനിടെ പുനർനിർമ്മിച്ച ലിമിറ്റർ യഥാർത്ഥത്തിൽ pause ചെയ്യുമ്പോൾ, pause-ന് മുമ്പ് അവശേഷിക്കുന്ന ക്യൂ സമയം അവസാനിക്കുന്ന ഒരു കോളറെ ആ സമയം കാത്തിരിക്കാതെ ഉടൻതന്നെ ക്യൂ-ടൈംഔട്ട് കോഡോടെ തിരിച്ചയയ്ക്കുന്നു (`checkLimiterPause`); രേഖപ്പെടുത്തിയ അവസാനം ലിമിറ്റർ നിർമ്മിക്കുന്നതിന് മുമ്പായി അങ്കർ ചെയ്യപ്പെടുന്നു — Bottleneck അതിന്റെ റിഫ്രഷ് ക്ലോക്ക് ആരംഭിക്കുന്നിടത്ത് — റിസർവോയറിലെ പിന്നീടുള്ള ഏത് മാറ്റവും അതിനെ മറന്നുകളയുന്നു. `tests/unit/rate-limit-long-body-retry-lockout.test.ts`-ഉം `tests/unit/rate-limit-body-retry-pause.test.ts`-ഉം ഇത് ഉൾക്കൊള്ളുന്നു.

**`maxQueueDepth` — ഓപ്റ്റ്-ഇൻ അഡ്മിഷൻ പരിധി (പുതിയത്).** `resilienceSettings.requestQueue.maxQueueDepth` ഒരു പ്രൊവൈഡർ+കണക്ഷനിൽ ഏതൊരു സമയത്ത് എത്ര അഭ്യർത്ഥനങ്ങൾക്ക് ക്യൂവിൽ (ഇതുവരെ ഡിസ്പാച്ച് ചെയ്യാതെ) ഇരിക്കാമെന്ന് പരിമിതപ്പെടുത്തുന്നു. ക്യൂവിൽ ഇതിനകം `maxQueueDepth` അഭ്യർത്ഥനങ്ങൾ ഉണ്ടെങ്കിൽ, ഒരു പുതിയ അഭ്യർത്ഥന `limiter.schedule()`-ൽ എത്തുന്നതിന് **മുമ്പ്** തന്നെ ടൈപ്പ് ചെയ്ത `code: "RATE_LIMIT_QUEUE_FULL"` പിശകോടെ വേഗത്തിൽ നിരാകരിക്കപ്പെടുന്നു — അതിനാൽ നിരാകരണം ചെലവ് കുറഞ്ഞതാണ്, കൂടാതെ ആ അഭ്യർത്ഥനയ്ക്കുള്ള ഏത് ഡൗൺസ്ട്രീം പ്രോംപ്റ്റ്-കംപ്രഷൻ / ട്രാൻസ്ലേഷൻ ജോലിക്കും മുമ്പാണ് സംഭവിക്കുന്നത്. ഡിഫോൾട്ട് `0` = അപ്രാപ്തമാക്കിയത്, നിലവിലെ അപരിമിത-ക്യൂ സ്വഭാവം നിലനിർത്തിക്കൊണ്ട്; പരിധി 0–100000. `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) വഴിയോ `resilienceSettings.requestQueue.maxQueueDepth` (ഡാഷ്ബോർഡ്/API patch) വഴിയോ അസാധുവാക്കാം.

അഡ്മിഷൻ പരിശോധന തന്നെ ഒരു ശുദ്ധ ഫങ്ഷനാണ് (pure function)
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), അതിനാൽ യഥാർത്ഥ Bottleneck ലിമിറ്റർ ഇല്ലാതെ തന്നെ ഇത് യൂണിറ്റ്-ടെസ്റ്റ് ചെയ്യാൻ കഴിയും.

> #6593-ൻ തുടക്കമിട്ട RFC ഒരു `bypassCompressionOnRateLimit`
> ഫ്ലാഗും നിർദ്ദേശിച്ചിരുന്നു. ഈ റിപ്പോയിലെ `open-sse/services/compression/` പൈപ്പ്ലൈൻ
> ഔട്ട്ബൗണ്ട് LLM റിക്വസ്റ്റിലെ പ്രോംപ്റ്റ്/കonteക്സ്റ്റ് കംപ്രഷനാണ് (`chatCore.ts`-ൽ
> `resolveCompressionSettings`/`selectCompressionStrategy` ബ്ലോക്കിന് ചുറ്റും),
> സിന്തസൈസ് ചെയ്ത 429 ബോഡികളിലെ HTTP റെസ്പോൺസ് കംപ്രഷനല്ല — അക്ഷരാർത്ഥത്തിലുള്ള
> ഒരു bypass ഫ്ലാഗിന് യോജിക്കുന്ന കോഡ് പാത്ത് ഇവിടെയില്ല. ആ പ്രോംപ്റ്റ്-കംപ്രഷൻ ഘട്ടം
> നിലവിൽ റിക്വസ്റ്റ് പൈപ്പ്ലൈനിൽ `withRateLimit()`-ന് _മുമ്പാണ്_ പ്രവർത്തിക്കുന്നത്, അതിനാൽ
> ക്യൂ-ഫുൾ റിജെക്ഷനിൽ അത് ഒഴിവാക്കാനായി പുഃക്രമീകരിക്കുന്നത് ഈ ഇഷ്യുവിന്റെ പരിധിയേക്കാൾ
> വലുതും പ്രത്യേകവുമായ ഒരു മാറ്റമാണ്; അത് ഇവിടെ ബോധപൂർവ്വം നടപ്പിലാക്കിയിട്ട് **ഇല്ല**,
> CPU-ലാഭം പുഃക്രമീകരണ റിസ്കിന് യോഗ്യമാണെങ്കിൽ ഒരു ഫോളോ-അപ്പായി നിലനിർത്തിയിരിക്കുന്നു.

### റേറ്റ്-ലിമിറ്റ് ഓട്ടോ-എനേബിൾ സേഫ്റ്റി നെറ്റും കണക്ഷൻ പ്രൊട്ടക്ഷനും (`rateLimitProtection`)

**ഓട്ടോ-എനേബിൾ സേഫ്റ്റി നെറ്റ്** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, ഡിഫോൾട്ട് `true`):
ഡിഫോൾട്ടായി, എല്ലാ സജീവ API-കീ പ്രൊവൈഡർ കണക്ഷനുകൾക്കും (`getProviderCategory(provider) === "apikey"`) OmniRoute യാന്ത്രികമായി റേറ്റ്-ലിമിറ്റ് ക്യൂ പ്രൊട്ടക്ഷൻ പ്രാപ്തമാക്കുന്നു. റേറ്റ്-സെൻസിറ്റീവ് അപ്സ്ട്രീം API കീകളിലേക്കുള്ള ഇൻകമിംഗ് റിക്വസ്റ്റുകൾ അപ്സ്ട്രീം 429 എററുകളിലേക്ക് പെട്ടെന്ന് പൊട്ടിത്തെറിക്കുന്നതിന് പകരം Bottleneck വഴി ക്യൂ ചെയ്യപ്പെടുകയും ത്രോട്ടിൽ ചെയ്യപ്പെടുകയും ചെയ്യുന്നു എന്ന് ഇത് ഉറപ്പാക്കുന്നു. ഈ സേഫ്റ്റി നെറ്റിനെ `RATE_LIMIT_AUTO_ENABLE` എൻവയൺമെന്റ് വേരിയബിൾ വഴി ഓവർറൈഡ് ചെയ്യാം (`false`/`0`/`off` അപ്രാപ്തമാക്കുന്നു, `true`/`1`/`on` നിർബന്ധിതമായി ഓൺ ചെയ്യുന്നു), ഇത് സ്ഥിരപ്പെടുത്തിയ ഡാഷ്ബോർഡ് ക്രമീകരണത്തേക്കാൾ (**Settings → Resilience** / `PATCH /api/resilience`) മുൻഗണന നേടുന്നു.

**ഓരോ കണക്ഷനും ഉള്ള `rateLimitProtection`-ന്റെ സെമാന്റിക്സ്:**
ഓരോ കണക്ഷനും ഉള്ള റേറ്റ്-ലിമിറ്റ് പ്രൊട്ടക്ഷൻ പ്രൊവൈഡർ കണക്ഷനുകളിലെ `rateLimitProtection` ബൂളിയൻ ഫീൽഡ് വഴി ട്രാക്ക് ചെയ്യുന്നു (SQLite-ൽ `rate_limit_protection` എന്ന് സൂക്ഷിക്കുന്നു):

- **വ്യക്തമായി ഓൺ (`rateLimitProtection === true`)**: പ്രൊവൈഡർ കാറ്റഗറിയോ ഓട്ടോ-എനേബിൾ സേഫ്റ്റി നെറ്റ് ഓൺ ആണോ എന്നതോ പരിഗണിക്കാതെ, ഈ കണക്ഷന് റേറ്റ്-ലിമിറ്റ് പ്രൊട്ടക്ഷൻ വ്യക്തമായി പ്രാപ്തമാക്കിയിരിക്കുന്നു.
- **വ്യക്തമായി ഓഫ് (`rateLimitProtection === false`)**: വ്യക്തമായ പ്രൊട്ടക്ഷൻ അപ്രാപ്തമാക്കുന്നു, എന്നാൽ സജീവമായ ഒരു API-കീ കണക്ഷനെ ആഗോള ഓട്ടോ-എനേബിൾ സേഫ്റ്റി നെറ്റിൽ നിന്ന് ഒഴിവാക്കുക **ചെയ്യുന്നില്ല**. `reconcileEnabledConnections`-ൽ (`open-sse/services/rateLimitManager.ts`), `false`-ഉം `undefined`-ഉം തുല്യമാണ്: `rateLimitProtection === true` മാത്രമേ വ്യക്തമായ ഓവർറൈഡായി കണക്കാക്കുന്നുള്ളൂ. `rateLimitProtection` `false` ആണെങ്കിൽ (അല്ലെങ്കിൽ സെറ്റ് ചെയ്തിട്ടില്ലെങ്കിൽ), സജീവമായ ഒരു API-കീ കണക്ഷൻ ഇപ്പോഴും ഓട്ടോ-എനേബിൾ വ്യവസ്ഥയുമായി പൊരുത്തപ്പെടുകയും റേറ്റ്-ലിമിറ്റ് പ്രൊട്ടക്ടഡായി തുടരുകയും ചെയ്യും.
- **ഓരോ കണക്ഷനും ഒപ്റ്റ്-ഔട്ട് ഇല്ല**: മറ്റുള്ളവയ്ക്ക് ഓട്ടോ-എനേബിൾ സജീവമായി നിലനിർത്തിക്കൊണ്ട്, "ഈ ഒരൊറ്റ സജീവ API-കീ കണക്ഷൻ റേറ്റ്-ലിമിറ്റ് ക്യൂ പ്രൊട്ടക്ഷൻ ഇല്ലാതെ പ്രവർത്തിക്കണം" എന്ന് ഒരു ഓപ്പറേറ്റർക്ക് നിലവിൽ പ്രകടിപ്പിക്കാൻ കഴിയില്ല. API-കീ കണക്ഷനുകൾ റേറ്റ്-ലിമിറ്റ് ക്യൂകൾ കൂടാതെ പൂർണ്ണമായും പ്രവർത്തിപ്പിക്കാൻ, സേഫ്റ്റി നെറ്റ് ആഗോളതലത്തിൽ ഓഫ് ചെയ്യണം (`RATE_LIMIT_AUTO_ENABLE=false` അല്ലെങ്കിൽ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**പിന്തുണയ്ക്കുന്ന റൈറ്റ് പാത്തുകൾ:**

- **`POST /api/rate-limits`**: ഒരു കണക്ഷന് `rateLimitProtection` മാറ്റുന്നതിനുള്ള പിന്തുണയ്ക്കുന്ന മാനേജ്മെന്റ് റൈറ്റ് പാത്ത് (`{ connectionId: string, enabled: boolean }`). ഇത് `enabled: true` ആയി വിളിക്കുന്നത് വ്യക്തമായ പ്രൊട്ടക്ഷൻ ഓൺ ചെയ്യുന്നു; `enabled: false` ആയി വിളിക്കുന്നത് വ്യക്തമായ പ്രൊട്ടക്ഷൻ നീക്കം ചെയ്യുന്നു (എന്നിരുന്നാലും, ഓട്ടോ-എനേബിൾ ഓൺ ആണെങ്കിൽ സജീവമായ API-കീ കണക്ഷനുകൾ ആഗോള സേഫ്റ്റി നെറ്റിന്റെ പരിരക്ഷയിൽ തുടരും).
- **`PUT /api/providers/[id]`**: ബോധപൂർവ്വം `rateLimitProtection` സ്വീകരിക്കുകയോ മാറ്റുകയോ ചെയ്യുന്ന **ഇല്ല** (#11278). `PUT /api/providers/[id]` വഴി പ്രൊവൈഡർ കണക്ഷൻ മെറ്റാഡാറ്റ അപ്ഡേറ്റ് ചെയ്യുന്നത് സൂക്ഷിച്ചിട്ടുള്ള റേറ്റ്-ലിമിറ്റ് പ്രൊട്ടക്ഷൻ സ്റ്റേറ്റിനെ ഒരിക്കലും മാറ്റില്ല.

---

## 6. സ്ലോ-സ്ട്രീം ത്രൂപുട്ട് വാച്ച്ഡോഗ് (#9709)

ഓപ്ഷണൽ `resilienceSettings.streamRecovery.throughputWatchdog` ഗാർഡ് ഇപ്പോഴും ചങ്കുകൾ അയയ്ക്കുന്ന ഒരു അപ്സ്ട്രീം കണ്ടെത്തുന്നു, എന്നാൽ കോൺഫിഗർ ചെയ്ത ഉപയോഗപ്രദമായ-ഔട്ട്പുട്ട് നിരക്കിന് താഴെ അസിസ്റ്റൻ്റ് ഔട്ട്പുട്ട് ഉത്പാദിപ്പിക്കുന്നു. ഇത് നിഷ്ക്രിയ സമയപരിധിയിൽ നിന്ന് മനഃപൂർവ്വം വ്യത്യസ്തമാണ്: ഹൃദയമിടിപ്പുകളും മെറ്റാഡാറ്റയും ടൈമറുകളൊന്നും പുനഃസജ്ജമാക്കുന്നില്ല, പുരോഗതിയായി കണക്കാക്കുന്നില്ല. ഔട്ട്പുട്ട് ഗുണനിലവാരം പരിഗണിക്കാതെ തന്നെ ഒരു കേവല സുരക്ഷാ പരിധിയായി തുടരുന്ന ഹാർഡ് അറ്റംപ്റ്റ് ഡെഡ്ലൈനിൽ നിന്ന് (#9153) ഇത് വ്യത്യസ്തമാണ്.

വാച്ച്ഡോഗിന് വാം-അപ്പ് കാലയളവ് ആവശ്യമാണ്, തുടർന്ന് അത് നിർത്തലാക്കുന്നതിന് മുമ്പ് പൂർണ്ണമായ റോളിംഗ് വിൻഡോ ആവശ്യമാണ്. ഇത് ചാറ്റ് പൂർത്തിയാക്കലുകളിൽ നിന്നും പ്രതികരണങ്ങളിൽ നിന്നുമുള്ള ടെക്സ്റ്റ് ഡെൽറ്റകളെ കണക്കാക്കുന്നു API ഔട്ട്പുട്ട് ഇവൻ്റുകൾ (ഒരു യാഥാസ്ഥിതിക UTF-8 ബൈറ്റ് പ്രോക്സി), ഉപയോഗത്തിന് മാത്രമുള്ളതും ശൂന്യവുമായ ഇവൻ്റുകൾ അവഗണിക്കുന്നു, ടൂൾ-കോൾ അല്ലെങ്കിൽ ന്യായവാദ ഇവൻ്റുകൾ ഫ്ലൈറ്റിലായിരിക്കുമ്പോൾ ന്യായവിധി താൽക്കാലികമായി നിർത്തുന്നു. ഇത് ഡിഫോൾട്ടായി പ്രവർത്തനരഹിതമാക്കുകയും `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ഉപയോഗിച്ച് പ്രവർത്തനക്ഷമമാക്കുകയും ചെയ്യാം (ആ env മൂല്യം ഡിഫോൾട്ട് — ഒരു സംരക്ഷിച്ച `resilienceSettings.streamRecovery.throughputWatchdog.enabled` ബൂളിയൻ വിജയിക്കുന്നതിന് വിത്ത് മാത്രമേ നൽകൂ; ഈ ഗൈഡിൻ്റെ മുകളിലുള്ള env-vs-ഡാഷ്ബോർഡ് മുൻഗണന കുറിപ്പ് കാണുക); വിൻഡോ, വാം-അപ്പ്, മിനിമം നിരക്ക്, കുറഞ്ഞ അളക്കാവുന്ന ഔട്ട്പുട്ട് എന്നിവ സാധാരണ റെസിലൻസ്-സെറ്റിംഗ്സ് നോർമലൈസേഷൻ ലെയറിനാൽ പരിമിതപ്പെടുത്തിയിരിക്കുന്നു.

പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോൾ, സജീവമായ അപ്സ്ട്രീം ശ്രമത്തിന് മാത്രമേ ഒരു വാച്ച്ഡോഗ് അബോർട്ട് ബാധകമാകൂ. ഏതെങ്കിലും ക്ലയൻ്റ്-ദൃശ്യമായ ബൈറ്റുകൾക്ക് മുമ്പ്, നിലവിലുള്ള അതേ അക്കൗണ്ട് നേരത്തെയുള്ള വീണ്ടെടുക്കൽ പാത്ത് ശ്രമം വീണ്ടും തുറന്നേക്കാം. പ്രതിബദ്ധതയ്ക്ക് ശേഷം, സ്ട്രീം ഒരിക്കലും അന്ധമായി വീണ്ടും പ്ലേ ചെയ്യില്ല; നിലവിലുള്ള സുരക്ഷിത മിഡ്-സ്ട്രീം തുടർച്ച കരാറിന് മാത്രമേ ഒരു പ്രത്യയം തയ്യാൻ കഴിയൂ. അന്തിമമാക്കൽ ഒറ്റത്തവണയായി തുടരുന്നു, അതിനാൽ ഉപയോഗ അക്കൗണ്ടിംഗും സെമാഫോർ റിലീസും തനിപ്പകർപ്പല്ല.

---

## 7. അപ്സ്ട്രീം സ്റ്റാറ്റസ് പുനർപ്രസ്താവനം (തെറ്റായി പ്രസ്താവിച്ച ക്വോട്ട പിശകുകൾ)

**പരിധി:** താൽക്കാലിക ക്വോട്ടാ ക്ഷയം തെറ്റായ HTTP സ്റ്റാറ്റസോടെ റിപ്പോർട്ട് ചെയ്യുന്ന ഒരു അപ്സ്ട്രീം ഗേറ്റ്വേ.

**ഉദ്ദേശ്യം:** വർഗ്ഗീകരണത്തിന് മുമ്പ് തെറ്റിദ്ധരിപ്പിക്കുന്ന സ്റ്റാറ്റസ് ശരിയാക്കുക, അതുവഴി ഡൗൺസ്ട്രീം ഉപഭോക്താക്കൾക്ക് (ഫാൾബാക്ക് എഞ്ചിൻ, കോമ്പോ അഗ്രിഗേഷൻ, ക്ലയന്റ് അഭിമുഖമായ പ്രതികരണം) പരാജയത്തിന്റെ യഥാർത്ഥ റിട്രൈ ചെയ്യാവുന്ന സ്വഭാവം ലഭിക്കും.

ചില ഗേറ്റ്വേകൾ TEMPORARY ക്വോട്ടാ ക്ഷയം റിട്രൈ ചെയ്യാനാകാത്ത HTTP
സ്റ്റാറ്റസോടെ സൂചിപ്പിക്കുന്നു. `agentrouter.org` സാധാരണ `429`-ന് പകരം ചൈനീസ് ബോഡിയോടുകൂടി
(`用户额度不足` / `额度不足`) `403` (ചിലപ്പോൾ `400`) നൽകുന്നു. Claude
Code പോലുള്ള ക്ലയന്റുകൾ `403`-നെ സ്ഥിരമായ പിശകായി കണക്കാക്കി സെഷൻ നിർത്തുന്നു, കൂടാതെ തിരുത്തൽ
ഇല്ലെങ്കിൽ ഫാൾബാക്ക് എഞ്ചിൻ അതിനെ ഒരു ക്വോട്ടാ ഇവന്റിന് പകരം
`AUTH_ERROR` ആയി വർഗ്ഗീകരിക്കും.

**നടപ്പാക്കൽ:**

- രജിസ്ട്രിയും മാച്ചറും: `open-sse/config/upstreamStatusRestatement.ts` — ഓരോ
  പ്രൊവൈഡറിനുമുള്ള നിയമങ്ങളുടെ പട്ടിക (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` വഴി
  പൊരുത്തപ്പെടുത്തുന്നു.
- കോൾ സൈറ്റ്: `open-sse/handlers/chatCore.ts`-ലെ (ഏകദേശം ലൈൻ 3654)
  `providerFailure:` ബ്ലോക്ക്. അപ്സ്ട്രീം പ്രതികരണം പിശക് HTTP സ്റ്റാറ്റസോടെ
  (`!providerResponse.ok`) `parseUpstreamError()` പാഴ്സ് ചെയ്തതിന് തൊട്ടുപിന്നാലെയും,
  ഏതെങ്കിലും വർഗ്ഗീകരണം നടക്കുന്നതിന് മുമ്പും ഇത് പ്രവർത്തിക്കുന്നു; അതിനാൽ എല്ലാ
  ഡൗൺസ്ട്രീം ഉപഭോക്താക്കൾക്കും തിരുത്തിയ സ്റ്റാറ്റസ് ലഭിക്കും. `200` SSE
  സ്ട്രീമിനുള്ളിൽ ഉൾപ്പെടുത്തിയിരിക്കുന്ന പിശകുകൾ പിന്നീട് നടക്കുന്ന വേറിട്ട
  സ്ട്രീം-പാഴ്സിംഗ് പാത പിന്തുടരുന്നു; അവ ഇന്ന് ഈ ഹുക്കിന്റെ പരിധിയിൽ **ഉൾപ്പെടുന്നില്ല** —
  അറിയാവുന്ന ഒരു പരിമിതിയാണിത്, കൂടാതെ പിശക് HTTP സ്റ്റാറ്റസായി പ്രത്യക്ഷപ്പെടുന്ന
  agentrouter-ന്റെ തെറ്റായ സ്റ്റാറ്റസിന് ഇത് ഇതുവരെ ആവശ്യമായിട്ടില്ല.
- റിട്രൈ യോഗ്യത: `429` `RETRY_AFTER_ELIGIBLE_STATUSES`-ൽ
  (`open-sse/services/combo/unavailableRetryGate.ts`) ഉൾപ്പെട്ടിരിക്കുന്നു; അതിനാൽ
  പുനർപ്രസ്താവിച്ച പിശക് പ്രവർത്തനരഹിതമായ `403` ആയി പുറത്തുവരുന്നതിന് പകരം യഥാർത്ഥ
  റിട്രൈ വിൻഡോ വഹിക്കുന്നു.
- സിന്തറ്റിക് `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  പുനർപ്രസ്താവിച്ച പ്രതികരണം **ക്ലയന്റിനോട്** പറയുന്ന മൂല്യം മാത്രമാണ്; അത് കണക്ഷന്റെ
  ആന്തരിക കൂൾഡൗൺ/ലോക്ക്ഔട്ട് ദൈർഘ്യം തന്നെയല്ല — പുനർപ്രസ്താവിച്ച പിശക് യഥാർത്ഥത്തിൽ
  കൈകാര്യം ചെയ്യുന്ന സംവിധാനമാണ് അത് വേർതിരിച്ച് നിയന്ത്രിക്കുന്നത്
  (കണക്ഷൻ കൂൾഡൗണിന്റെ വർധിച്ചുവരുന്ന ബാക്കോഫ്, §2, API-key
  പ്രൊവൈഡർമാർക്ക് അടിസ്ഥാന `3s`; അല്ലെങ്കിൽ agentrouter പോലുള്ള ഓരോ-മോഡൽ-ക്വോട്ടാ
  പ്രൊവൈഡർമാർക്ക് മോഡൽ ലോക്ക്ഔട്ട്, §3). ക്ലയന്റിനോട് പരസ്യം ചെയ്യുന്ന 60s വിൻഡോയേക്കാൾ
  മുമ്പ് തന്നെ റൂട്ടറിന് ആന്തരികമായി വീണ്ടും റിട്രൈ ചെയ്യാൻ യോഗ്യത ലഭിച്ചേക്കാം — ഇത്
  ഉദ്ദേശപൂർവ്വമുള്ള അധിക ഇടവേളയാണ്, ഒരു ബഗ് അല്ല.

സ്ഥിരമായ പിശകുകൾ (agentrouter-ന്റെ `无权访问模型` — ഈ മോഡലിലേക്ക് പ്രവേശനമില്ല) ഒരിക്കലും
പുനർപ്രസ്താവിക്കില്ല: `textMarkers` പൊരുത്തപ്പെട്ടാലും `excludeMarkers` നിയമത്തെ
തടയും; അതിനാൽ പിശക് അതിന്റെ യഥാർത്ഥ സ്റ്റാറ്റസ് നിലനിർത്തുകയും ഒന്നും എന്നെന്നേക്കുമായി
റിട്രൈ ചെയ്യാതിരിക്കുകയും ചെയ്യും. പൊരുത്തപ്പെടുന്ന പ്രൊവൈഡർ വർഗ്ഗീകരണ നിയമം
(`open-sse/config/providerErrorRules.ts`-ലെ
`agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, പ്രഖ്യാപിച്ച `6h` അടിസ്ഥാന കൂൾഡൗൺ)
`checkFallbackError` (`open-sse/services/accountFallback.ts`) വഴി
പൊതുവായ apikey-വിഭാഗത്തിലെ `FORBIDDEN` early-return-ന് മുമ്പ് പരിശോധിക്കുന്നു;
`honorsRuleLockScope(provider)` (#10334 — നിലവിൽ
`providerErrorRules.ts`-ലെ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist വഴി
agentrouter-ക്ക് മാത്രമായി) ഇതിന് ഗേറ്റ് ചെയ്യുന്നു. നിയമത്തിൽ പ്രഖ്യാപിച്ച 6h കൂൾഡൗൺ
`fallbackResult.baseCooldownMs` ആയി ഒഴുകിയെത്തുന്നു, എന്നാൽ ഇത് നിലവിലുള്ള
ഓരോ-മോഡൽ-ക്വോട്ടാ ലോക്ക്ഔട്ട് പാതയിലേക്കാണ്
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, കൂൾഡൗണിന്റെ ഉറവിടം ഒഴികെ #10334 ഇത് മാറ്റിയിട്ടില്ല)
വീണ്ടും നൽകുന്നത്: മറ്റെല്ലാ മോഡൽ ലോക്ക്ഔട്ടുകളെയും പോലെ ഇത് ഓപ്പറേറ്ററുടെ
`mlSettings.maxCooldownMs` (സ്ഥിരസ്ഥിതി `1_800_000ms` / 30min) വരെ കുറയ്ക്കപ്പെടുന്നു,
കൂടാതെ _സ്ഥിരീകരിച്ച ലോക്ക്ഔട്ട് കാരണം_ നിയമത്തിലെ `"auth_error"` അല്ല, മുമ്പുണ്ടായിരുന്ന
ഹാർഡ്കോഡ് ചെയ്ത `"forbidden"` തന്നെയായിരിക്കും — കൂൾഡൗൺ ദൈർഘ്യം മാത്രമാണ്
അവസാനംവരെ മാനിക്കുന്നത്, കാരണം സ്ട്രിംഗ് അല്ല. കണക്ഷൻ തന്നെ സജീവമായി തുടരും;
അതേ കണക്ഷനിലെ സഹോദര മോഡലുകളെ ഇത് ബാധിക്കില്ല.

പുനർപ്രസ്താവിച്ച ക്വോട്ടാ പിശകുകൾ (`额度不足`) ഉൽപ്പാദനത്തിൽ ഒരു പ്രൊവൈഡർ നിയമത്തിലെത്തുന്നു
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, സ്വന്തമായി പ്രഖ്യാപിച്ച കൂൾഡൗൺ ഇല്ല — persistence layer-ന്റെ സ്കെയിൽ
ചെയ്ത ബാക്കോഫ് ഡീഫോൾട്ട് ബാധകമാണ്). #10334 മുതൽ, `ProviderErrorRuleMatch`-ലെ
`scope` എൻഡ്-ടു-എൻഡ് ആയി ഉപയോഗിക്കുന്നു, എന്നാൽ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ലുള്ള പ്രൊവൈഡർമാർക്ക് മാത്രം
(`providerErrorRules.ts` — ഇന്ന് `"agentrouter"` മാത്രം,
`honorsRuleLockScope()` വഴി ഗേറ്റ് ചെയ്യുന്നു). മറ്റെല്ലാ പ്രൊവൈഡർമാർക്കും `scope`
#10334-ന് മുമ്പുണ്ടായിരുന്നതുപോലെ വിവരപ്രദമായത് മാത്രമായി തുടരുന്നു.
`checkFallbackError` പൊരുത്തപ്പെട്ട നിയമത്തിലെ scope-നെ
`fallbackResult.ruleScope` ആയി പുറത്തുകൊടുക്കുന്നു;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ഒരു `ruleScope` കണക്ഷൻ-വ്യാപകവും സ്വയം വീണ്ടെടുക്കാൻ
കഴിയുന്നതുമായ സിഗ്നലായി മാനിക്കുന്നത് യഥാർത്ഥത്തിൽ സുരക്ഷിതമാണെന്ന് സ്ഥിരീകരിക്കുന്ന
പങ്കിട്ട ഗാർഡാണ് (scope `"connection"`, reason `quota_exhausted`, ഒരിക്കലും
`permanent` അല്ല, ഒരിക്കലും `creditsExhausted` അല്ല — ഭാവിയിൽ scope
`"connection"`-നെ സ്ഥിരമായ അക്കൗണ്ട് നിലയുമായി ജോടിയാക്കുന്നതിനെതിരായ പ്രതിരോധം).
ഇതിനെ രണ്ട് ഉപഭോക്താക്കൾ വിളിക്കുന്നു:

- **സ്ഥിരത (Persistence)** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider-ന്റെ **ഓരോ-മോഡൽ** lockout
  branch-ലേക്ക് വീഴുന്നതിനുപകരം (agentrouter is `passthroughModels: true` → `hasPerModelQuota()`
  returns `true`), ഇത് ഒരു **താൽക്കാലിക കണക്ഷൻ cooldown** പ്രയോഗിക്കുന്നു —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ഒരിക്കലും terminal status
  (`credits_exhausted`/`banned`/`expired`) അല്ല — അതിനാൽ manual credential reset
  ആവശ്യപ്പെടുന്നതിന് പകരം cooldown അവസാനിച്ചുകഴിഞ്ഞാൽ കണക്ഷൻ സ്വയം വീണ്ടെടുക്കും.
  `disableCooling: true` ഉള്ള കണക്ഷനുകൾക്ക് ഇത് ഒഴിവാക്കുന്നു (#2997): ആ opt-out
  പകരം per-model lockout-ലേക്ക് തുടരും (രേഖപ്പെടുത്തിയ trade-off —
  branch-ന് മുകളിലുള്ള code comment കാണുക).
- **അതേ-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): അതേ guard കണക്ഷനെ
  `${provider}:${connectionId}` എന്ന key ഉപയോഗിച്ച് in-memory
  `exhaustedConnections` set-ലേക്ക് അടയാളപ്പെടുത്തുന്നു. ഇത് സ്വന്തം target object-ൽ
  അതേ കൃത്യമായ `connectionId` ഇതിനകം വഹിക്കുന്ന ഒരു ശേഷിക്കുന്ന SAME-REQUEST
  target മാത്രമേ ഒഴിവാക്കൂ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` before the `exhaustedConnections` lookup) — plain
  model-list combo-യിൽ sibling targets-ന് സ്വന്തമായി pinned `connectionId`
  ഉണ്ടാകില്ല; ഓരോ dispatch-ലും response-ന്റെ
  `X-OmniRoute-Selected-Connection-Id` header-ൽ നിന്ന് ഒന്നുമാത്രം resolve ചെയ്യുന്നതിനാൽ,
  ആ common case ഒരിക്കലും ആ key match കൈവരിക്കില്ല. ആ സാധാരണ സാഹചര്യത്തിൽ,
  ശേഷിക്കുന്ന leg വീണ്ടും ഇപ്പോൾ exhausted ആയ account ഉപയോഗിക്കാതിരിക്കാനുള്ള യഥാർത്ഥ
  സംരക്ഷണം ഈ Set അല്ല — മുകളിലെ persistence layer ആണ് (കണക്ഷന്റെ
  `rateLimitedUntil` ഇപ്പോൾ ഭാവിയിലായിരിക്കും); കൂടാതെ ഈ same guard failure-നായി
  `transientRateLimitedProviders` suppress ചെയ്യുകയും ചെയ്യുന്നു ("Two-stage design"
  കാണുക; `targetExhaustion.ts`-ലെ `isAgentrouterConnectionQuotaScope` branch-ന്റെ
  code comment-ഉം കാണുക): ആ Set അടയാളപ്പെടുത്താതെ വെച്ചിരിക്കുന്നതിനാൽ,
  `combo.ts`-ലെ `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provider-ന്റെ
  ശേഷിക്കുന്ന legs-ൽ പ്രാബല്യത്തിൽ വരില്ല. അതിനാൽ credential selection-ന്റെ
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) സാധാരണ രീതിയിൽ
  മാനിക്കപ്പെടും; ശേഷിക്കുന്ന leg മറ്റൊരു, ഇപ്പോഴും eligible ആയ agentrouter
  കണക്ഷൻ തിരഞ്ഞെടുക്കുകയോ credentials available അല്ലെന്നതോടെ പരാജയപ്പെടുകയോ ചെയ്യും —
  ഈ branch ഇപ്പോൾ cooldown ചെയ്ത കണക്ഷനിലേക്ക് അത് ബലമായി മടങ്ങുകയില്ല.

### രണ്ട്-ഘട്ട രൂപകൽപ്പന: status restatement, തുടർന്ന് classification

Status restatement (`upstreamStatusRestatement.ts`), provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) എന്നിവ provider id-യും text markers-ഉം അടിസ്ഥാനമാക്കി
പ്രവർത്തിക്കുന്ന വേർതിരിച്ച registries ആണെങ്കിലും, അവ വ്യത്യസ്ത ഇടങ്ങളിൽ പ്രവർത്തിക്കുകയും
വ്യത്യസ്ത ആവശ്യങ്ങൾ നിറവേറ്റുകയും ചെയ്യുന്നു: restatement `chatCore.ts`-ൽ HTTP status
ആദ്യഘട്ടത്തിൽ rewrite ചെയ്യുന്നു; classification rules
`checkFallbackError()`-നുള്ളിൽ (`open-sse/services/accountFallback.ts`) fallback
`reason` തിരഞ്ഞെടുക്കുകയും `scope`
(`model` / `provider` / `connection`) lock ചെയ്യുകയും ചെയ്യുന്നു.

`providerErrorRules.ts`-ലെ `FULL_TEXT_RULE_PROVIDERS`
allowlist-ൽ ഉൾപ്പെടുത്തിയിരിക്കുന്ന providers-ക്കായി മാത്രമാണ് classification rules-ന്
പൂർണ്ണ error **text** കാണാൻ കഴിയുന്നത് (body markers ആയ `额度不足` പോലുള്ളവ
match ചെയ്യാൻ ഇത് ആവശ്യമാണ്) — നിലവിൽ `"agentrouter"` മാത്രം. മറ്റെല്ലാ
**built-in catalog** providers-ക്കുമായി, `checkFallbackError`,
`getProviderErrorRuleMatch`-ന് structured error (`{code, type}`) മാത്രമേ നൽകൂ;
header/status/code അടിസ്ഥാനമാക്കിയുള്ള rules-ന് ഇത് മതിയെങ്കിലും body-text markers
കാണാൻ കഴിയില്ല. `resolveRuleMatchBody()` helper ആണ് ഈ തിരഞ്ഞെടുപ്പ് നടത്തുന്നത്:
allowlist-ിലുള്ള providers-ക്കായി full error text, മറ്റുള്ളവർക്കായി structured error.
ഒരു **built-in** provider-നെ `FULL_TEXT_RULE_PROVIDERS`-ലേക്ക് ചേർക്കുന്നത്
വ്യക്തമായ per-provider opt-in ആണ് — പട്ടികയിൽ ഇല്ലാത്ത എല്ലാ providers-ന്റെയും
default path byte-for-byte മാറ്റമില്ലാതെ തുടരുന്നതിനാണ് ഇത് നിലനിൽക്കുന്നത്.

ഒരു rule-ന്റെ `scope` (`model` / `provider` / `connection`) എന്നത്
`FULL_TEXT_RULE_PROVIDERS`-ൽ നിന്നുള്ള വേറിട്ട opt-in ആണ്:
`checkFallbackError` അത് `fallbackResult.ruleScope` ആയി മാത്രമേ പുറത്തുവിടൂ;
താഴെത്തട്ടിലെ consumers അത് informational label-നേക്കാൾ കൂടുതലായി അംഗീകരിക്കുന്നത്
അതേ file-ലെ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist-ിലുള്ള providers-ക്കായി
മാത്രമാണ് (`honorsRuleLockScope()` വഴി gated — ഇന്ന് `"agentrouter"` മാത്രം).
Provider ആ allowlist-ൽ ഉൾപ്പെട്ടതിന് ശേഷം `scope: "connection"` match യഥാർത്ഥത്തിൽ
എന്ത് ചെയ്യുന്നു എന്നതിന് മുകളിലെ "Restated quota errors" കാണുക.

**#11104 — operator-declared rules രണ്ട് allowlists-നെയും bypass ചെയ്യുന്നു.**
ഒരു operator-ന് file edit ചെയ്യാതെ തന്നെ `settings.providerErrorRules` വഴി
runtime-ൽ per-provider rule പ്രഖ്യാപിക്കാം
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`).
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — **default**
behavior of built-in catalog rules സംരക്ഷിക്കാൻ ഉദ്ദേശിച്ച allowlists —
operator rule-നെ അവയ്ക്ക് പിന്നിൽ gate ചെയ്യുന്നത്, rule പ്രഖ്യാപിക്കൽ ഇതിനകം
operator-ന്റെ explicit opt-in ആയതിനാൽ, അവിടെ ഇതിനകം പട്ടികപ്പെടുത്തിയിരിക്കുന്ന
providers ഒഴികെയുള്ള എല്ലാവർക്കുമായി settings mechanism-നെ inert ആക്കും.
`resolveRuleMatchBody()`-യും `honorsRuleLockScope()`-യും ആദ്യം
`hasOperatorRuleForProvider()` പരിശോധിക്കുന്നു: operator rule ഉള്ള provider-ന്
raw error text ലഭിക്കുകയും അതിന്റെ declared `scope` അംഗീകരിക്കപ്പെടുകയും ചെയ്യും;
അത് ഏതെങ്കിലും allowlist-ലും ഉൾപ്പെട്ടിട്ടുണ്ടോ എന്നത് പരിഗണിക്കില്ല.

**Operator-declared rules** (`OperatorProviderErrorRule`): ഓരോ rule-നും
optional `status`-ഉം optional `match`-ഉം ഉണ്ട് (`match` error text-ന്റെ plain,
case-insensitive substring ആയിരിക്കണം; ഒരിക്കലും RegExp അല്ല, അതിനാൽ ReDoS
ഉണ്ടാക്കാൻ കഴിയില്ല), കൂടാതെ രണ്ടിൽ കുറഞ്ഞത് ഒന്ന് നിർബന്ധമായും സജ്ജമാക്കിയിരിക്കണം.
രണ്ടും സജ്ജമാക്കിയാൽ അവ AND ആയി പരിഗണിക്കും; ഏതെങ്കിലും field ഒഴിവാക്കിയാൽ അത്
എന്തിനെയും match ചെയ്യും. അതിനാൽ `{match: "insufficient_quota"}` ആ code വഹിക്കുന്ന
ഏത് status-നെയും match ചെയ്യും. ആദ്യം match ചെയ്യുന്ന rule ആണ് വിജയിക്കുന്നത്.
`cooldownMs` പരമാവധി 30 ദിവസം സ്വീകരിക്കും; ആകെ പരമാവധി 50 rules.

**എല്ലാം ഉൾക്കൊള്ളുന്ന ഡീഫോൾട്ടുകൾ** (`settings.providerErrorDefaults`, opt-in, `setOperatorProviderErrorDefaults` വഴി സജ്ജീകരിക്കുന്നത്): `{[provider]: {cooldownMs, scope?, reason?}}`
`cooldownMs` 1 മിനിറ്റിൽ നിന്ന് 30 ദിവസത്തേക്കുള്ള പരിധിയിലായിരിക്കണം. ഒരു operator നിയമവും ബിൽറ്റ്-ഇൻ കാറ്റലോഗ് നിയമവും പൊരുത്തപ്പെടാത്തപ്പോൾ മാത്രം, കൂടാതെ 402, 403, 408, 429, 5xx പിശകുകൾക്കു മാത്രം ഒരു ഡീഫോൾട്ട് പ്രാബല്യത്തിൽ വരും. Request-shape പിശകുകൾ (400, 404, 409, 413, 422), കൂടാതെ സ്വതന്ത്രമായ 401-കൾ, അവയുടെ സ്വന്തം കൈകാര്യം ചെയ്യൽ തുടരും. വ്യക്തമായ `reason` ഇല്ലെങ്കിൽ, `classifyError` ചെയ്യുന്നതുപോലെ തന്നെ, സ്റ്റാറ്റസിൽ നിന്നാണ് കാരണം ലഭിക്കുന്നത്. `hasOperatorRuleForProvider()`-നായി ഒരു ഡീഫോൾട്ട് പ്രഖ്യാപിക്കുന്നത് operator നിയമമായി കണക്കാക്കപ്പെടുന്നതിനാൽ, അതിന്റെ `scope` (ഡീഫോൾട്ട് `"connection"`) മാനിക്കപ്പെടും. ഒരു ഡീഫോൾട്ടിന്റെ ഫലപ്രദമായ cooldown, അതിലെ `cooldownMs`-നും provider-ന്റെ സ്വന്തം retry സൂചനയ്ക്കും (`Retry-After`, `x-ratelimit-reset`, അല്ലെങ്കിൽ body-യിലെ reset സൂചന — connection-cooldown ക്രമീകരണം "use upstream retry hints" ഓണായിരിക്കുമ്പോൾ engine മാനിക്കുന്ന അതേ സൂചന) ഇടയിലെ ദൈർഘ്യമേറിയതായിരിക്കും. അതിനാൽ ഒരു ഡീഫോൾട്ടിന് upstream-ന്റെ ചെറിയ സൂചന നീട്ടാനാകും, പക്ഷേ യഥാർത്ഥ reset-നെ ഒരിക്കലും ചുരുക്കാനാകില്ല. വ്യക്തമായ operator നിയമം അതിന്റെ കൃത്യമായ `cooldownMs` തന്നെ നിലനിർത്തും. `markAccountUnavailable`-ലെ connection-cooldown guards ഒന്നും ഒരു നിയമമോ ഡീഫോൾട്ടോ മറികടക്കില്ല: സജീവമായ, കൂടുതൽ ദൈർഘ്യമുള്ള cooldown ഒരിക്കലും ചുരുക്കില്ല, terminal status ഒരിക്കലും മാറ്റിയെഴുതുകയുമില്ല. `checkFallbackError`-ൽ മുമ്പേ പ്രവർത്തിക്കുന്ന ബിൽറ്റ്-ഇൻ ടെക്സ്റ്റ് ഡിറ്റക്ടറുകൾ (credits exhausted, daily quota, account deactivated) അവയ്ക്കു സ്വന്തം വാചകങ്ങൾക്ക് ഇപ്പോഴും മുൻഗണന നൽകും.

**അറിയപ്പെടുന്ന വിടവ് — HTTP 400-നായി `providerRuleRegistry` ഒരിക്കലും പരിശോധിക്കപ്പെടുന്നില്ല.**
`checkFallbackError`-ന്റെ `BAD_REQUEST` ശാഖ, `accountFallback.ts`-ലുള്ള സ്വന്തം pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` മുതലായവ) ഉപയോഗിച്ച് മാത്രം status 400-നെ തരംതിരിക്കുകയും, മുകളിലുള്ള `configuredRule`/`getProviderErrorRuleMatch` ശാഖയിലെത്തുന്നതിന് മുമ്പ് തിരിച്ചെത്തുകയും ചെയ്യുന്നു. `status: 400` ഉള്ള ഒരു ബിൽറ്റ്-ഇൻ കാറ്റലോഗ് നിയമമോ operator നിയമമോ syntax പ്രകാരം സാധുവാണ്, പക്ഷേ അത് ഒരിക്കലും പ്രവർത്തിക്കില്ല. നിലവിൽ ഒരു നിയമവും 400-നെ ലക്ഷ്യമിടുന്നില്ല, അതിനാൽ production-ൽ ഒന്നിനും ബാധകമല്ല — എന്നാൽ ഭാവിയിലെ 400 നിയമത്തിന് ആദ്യം ഈ ശാഖയിൽ മാറ്റം വരുത്തണം. ഇത് ഒരു നിയമം ചേർക്കുന്നതിനെക്കാൾ വലിയ മാറ്റമാണ്, കാരണം pattern-array പെരുമാറ്റത്തെ ഇതിനകം ആശ്രയിക്കുന്ന എല്ലാ provider-കൾക്കുമായി 400-നെ വീണ്ടും തരംതിരിക്കേണ്ടിവരും; അതിനാൽ ഒരു provider-നുള്ള ഒറ്റ നിയമം ചേർക്കുന്ന പരിധിക്ക് ഇത് പുറത്താണ്.

### quota-misstating gateway പുതുതായി ചേർക്കൽ

1. `statusRestatementRegistry`-ൽ ഒരു rule array രജിസ്റ്റർ ചെയ്യുക
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   provider-നു പ്രത്യേകമായവയായി നിലനിർത്തുക; `CREDITS_EXHAUSTED_SIGNALS`-മായി
   (`open-sse/services/accountFallback.ts`) കൂട്ടിമുട്ടുന്ന പൊതുവായ ഇംഗ്ലീഷ് വാക്യങ്ങൾ ഒരിക്കലും പുനരുപയോഗിക്കരുത്.
2. ശരിയായ lock scope തിരഞ്ഞെടുക്കുന്നതിനായി classification rules
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`)-ൽ
   ഐച്ഛികമായി രജിസ്റ്റർ ചെയ്യാം (`connection` account-wide quota-യ്ക്കും,
   `model` per-model പിശകുകൾക്കുമായി). പൂർണ്ണമായ error text ആവശ്യമുള്ള
   provider-കളുടെ production പെരുമാറ്റത്തിൽ മാത്രമേ ഈ ഘട്ടം ഫലപ്രദമാകൂ
   (body markers): അതേ ഫയലിലെ `FULL_TEXT_RULE_PROVIDERS`-ലേക്ക് provider id
   ചേർക്കുക — അല്ലെങ്കിൽ `checkFallbackError` structured
   `{code, type}` error മാത്രമേ rule-ന് കൈമാറൂ, അതിനാൽ body-text rule live
   traffic-ൽ ഒരിക്കലും match ചെയ്യില്ല. `status`/`headers` മാത്രം അടിസ്ഥാനമാക്കി
   match ചെയ്യുന്ന rules (Opencode-ന്റെയോ Minimax-ന്റെയോ പോലെ) ഈ opt-in
   ആവശ്യമില്ല. വേർതിരിച്ച്, rule `scope: "connection"` പ്രഖ്യാപിക്കുകയും
   യഥാർത്ഥത്തിൽ connection-wide cooldown-ും same-request combo skip-ഉം
   (വിവരപരമായ label മാത്രമല്ല) ഉദ്ദേശിക്കുന്നുവെങ്കിൽ, അതേ ഫയലിലെ
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ലേക്ക് provider id ചേർക്കുക — ഇതാണ്
   `markAccountUnavailable()`
   (`src/sse/services/auth.ts`)-ലെയും
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)-ലെയും
   `isAgentrouterConnectionQuotaScope()`-ശൈലിയിലുള്ള consumption നിയന്ത്രിക്കുന്നത്;
   ഇത് ഇല്ലെങ്കിൽ `scope` ഇപ്പോഴും `fallbackResult.ruleScope` വഴി ഒഴുകും,
   പക്ഷേ അതിന്മേൽ ഒന്നും പ്രവർത്തിക്കില്ല.
3. `tests/unit/upstream-status-restatement.test.ts`-നും
   `tests/unit/agentrouter-error-rules.test.ts`-നും അനുസൃതമായി unit tests
   ചേർക്കുക (not-permanent / not-creditsExhausted guards ഉൾപ്പെടെ; provider-ന്
   allowlist ആവശ്യമുണ്ടെങ്കിൽ — ആ provider-നു മാത്രമേ
   `resolveRuleMatchBody()` full text തിരികെ നൽകൂ എന്ന് ഉറപ്പാക്കുന്ന ഒരു test
   ഉൾപ്പെടെ).

`chatCore.ts`, `classifyError`, അല്ലെങ്കിൽ combo-യിൽ മാറ്റങ്ങളൊന്നും ആവശ്യമില്ല.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-ലുള്ള provider-കൾ (opencode family) IP-bucketed upstream ആയി കണക്കാക്കപ്പെടുന്നു (opencode free tier account-bucketed അല്ല, IP-bucketed ആണ് — #9611 കാണുക): `quota_exhausted`
**അല്ലെങ്കിൽ** `rate_limit_exceeded` ആയി തരംതിരിച്ച status-429, പരാജയപ്പെട്ട connection-ന്റെ അവസാനമായി അറിയപ്പെട്ട egress IP-യുമായി പൊരുത്തപ്പെടുന്ന എല്ലാ allowlisted-family connection-കൾക്കും cooldown നൽകും; rotation അവ പരീക്ഷിക്കുന്നതിന് മുമ്പ് തന്നെ
— N-1 ഉറപ്പായും പരാജയപ്പെടുന്ന upstream calls ഒഴിവാക്കുന്നു (#10460/#10525-ന്റെ അതേ രൂപം).
`rate_limit_exceeded` ഉദ്ദേശപൂർവം ഉൾപ്പെടുത്തിയതാണ്: `markAccountUnavailable` path-ൽ opencode-നു പ്രത്യേകമായ rules ഒരിക്കലും match ചെയ്യില്ല (`checkFallbackError`-ലേക്ക് headers/body കൈമാറുന്നില്ല, opencode `FULL_TEXT_RULE_PROVIDERS`-ൽ ഇല്ല), അതിനാൽ subscription-quota text ("monthly usage limit reached") ഉള്ള body-യോടുകൂടിയ 429, `status_429` rule-ൽ എത്തുന്നതിന് മുമ്പ് quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown) വഴി `quota_exhausted` ആയി തരംതിരിക്കപ്പെടും — quota-text ഇല്ലാത്ത 429 (സാധാരണ rate limiting) `status_429` rule വഴി `rate_limit_exceeded` ആയി തരംതിരിക്കപ്പെടുകയും IP family-ക്ക് cooldown നൽകുകയും ചെയ്യും. allowlisted provider-നായി, IP-bucketed rate limit exhausted quota-യുടെ അതേ സൂചനയാണ്. യാഥാർത്ഥ്യപരമായ പരിധികൾ:

- **പരമാവധി ശ്രമം**: `proxy_logs`-ൽ നിന്ന് (24 മണിക്കൂർ വിൻഡോ, synchronous, cache ഇല്ലാതെ) കണക്ഷന്റെ അവസാനം അറിയപ്പെട്ട `egress_ip` ലോക്ക് പരിഹരിക്കുന്നു. Cold cache (egress
  IP ഒരിക്കലും probe ചെയ്തിട്ടില്ല) അല്ലെങ്കിൽ row ഇല്ല → പരാജയപ്പെട്ട കണക്ഷൻ branch
  വഴി ഇപ്പോഴും cooldown ചെയ്യപ്പെടും (ഇന്നത്തെ രീതിയിൽ രേഖപ്പെടുത്തും), sibling-നെ മാത്രം ലോക്ക് ചെയ്യില്ല.
- **ഒരിക്കലും terminal അല്ല**: cooldown ഒരു പുതുക്കിക്കൊണ്ടിരിക്കുന്ന quota window ആണ്
  (`testStatus: "unavailable"`); IP-level signal-ൽ നിന്ന് permanent state ഒരിക്കലും derived ചെയ്യില്ല. `disableCooling` കണക്ഷനുകൾ branch മുഴുവനായും ഒഴിവാക്കുന്നു.
- **allowlisted family-ക്കായി ലോക്ക് granularity മാറുന്നു**: ഇത് sibling optimization മാത്രം അല്ല, scope
  മാറ്റമാണ്. opencode ഒരു `passthroughModels` provider ആയതിനാൽ, ഈ branch-ന് മുമ്പ് ഒരു 429 ഓരോ MODEL-നും പ്രത്യേകം lockout സൃഷ്ടിച്ചിരുന്നു; ഇപ്പോൾ അത് ഒരു connection cooldown സൃഷ്ടിക്കുന്നു — sibling ഒന്നുമില്ലാത്ത, ഒരൊറ്റ connection മാത്രം പ്രവർത്തിപ്പിക്കുന്ന operator-നും ഇത് ബാധകം. opencode rule
  table ഇതിനകം ശരിയെന്ന് പ്രഖ്യാപിക്കുന്ന granularity ഇതാണ് (`scope: "connection"`,
  `providerErrorRules.ts`); എന്നാൽ opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ൽ ഇല്ലാത്തതിനാൽ ഇതുവരെ ഒരിക്കലും പ്രാബല്യത്തിൽ വന്നിരുന്നില്ല. connection-scoped agentrouter branch-നെ അനുകരിച്ച്, branch പരാജയപ്പെട്ട
  connection-ന്റെ cooldown + `backoffLevel` സ്വയം എഴുതുകയും return ചെയ്യുകയും ചെയ്യുന്നു — per-model block-ലേക്കോ താഴെയുള്ള generic path-ലേക്കോ ഒരിക്കലും എത്തില്ല.
- **Combo ഉൾപ്പെടുത്തിയിരിക്കുന്നു**: agentrouter branch പോലെ, 429-ന് combo caller പ്രയോഗിക്കുന്ന
  `persistUnavailableState`/`isCombo` downgrade-നെ scope ഉദ്ദേശപൂർവ്വം അവഗണിക്കുന്നു. per-model lockout ഈ scope-ന്റെ ദുർബലമായ രൂപമല്ല; അത് തെറ്റായ unit ആണ്: exhausted IP-യെക്കുറിച്ച് അതൊന്നും പറയുന്നില്ല, അതിനാൽ combo rotation ഓരോ sibling-ലും ഉറപ്പായും പരാജയപ്പെടുന്ന ഒരു call വീതം തുടർച്ചയായി ചെലവഴിക്കും.
- **Sibling സുരക്ഷ**: ഇതിനകം terminal ആയ (banned/credits_exhausted) sibling-നെയോ ഇതിനകം കൂടുതൽ ദൈർഘ്യമുള്ള cooldown-ലുള്ള sibling-നെയോ ഒരിക്കലും overwrite ചെയ്യില്ല.
- **Exclusive allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` വിപുലീകരിക്കുന്നത് ഉടമയുടെ വ്യക്തമായ തീരുമാനമാണ്; generic wiring ഇല്ല (pattern #10334/#10419). sibling query അതേ allowlist-നെ bind ചെയ്യുന്നു, അതിനാൽ SQL literal ആയി വീണ്ടും എഴുതേണ്ടതില്ല; അതിനെ വിപുലീകരിക്കുന്നത് ഒരു വരി മാറ്റമായി തുടരും.
- **Egress IP rotation, രണ്ട് ദിശകളിലും**: lookup window (24h), egress-IP cache TTL (5 min)-നേക്കാൾ വളരെ വിശാലമാണ്, അതിനാൽ “last known IP” ചരിത്രമാണ്, നിലവിലെ state അല്ല. ഒരു connection-ന്റെ proxy window-യ്ക്കുള്ളിൽ rotate ചെയ്താൽ, ലോക്ക് യഥാർത്ഥത്തിൽ പങ്കിട്ട IP **നഷ്ടപ്പെടുത്താം** (രേഖപ്പെടുത്തിയ IP പുതിയത്, exhausted അല്ലാത്തത് ആയിരിക്കും) — അതുപോലെ തന്നെ exhausted IP-യിൽ നിന്ന് പിന്നീട് rotate away ചെയ്ത sibling-നെ **cooldown ചെയ്യാനും** കഴിയും. രണ്ടാമത്തെ സാഹചര്യത്തിൽ ആ sibling-ന് ഒരു cooldown window നഷ്ടമാകും; ചരിത്രാധിഷ്ഠിത lookup-ന്റെ best-effort പരിധികളായി രണ്ടും അംഗീകരിക്കുന്നു.
- **ചെലവ്**: 429 ഉണ്ടാകുന്ന സമയത്ത് മാത്രം രണ്ട് bounded `proxy_logs` scans (`idx_pl_timestamp` വഴി window-filtered). പുതിയ index ഇല്ല (migration 134
  YAGNI). മിതമായ വലുപ്പമുള്ള real-traffic DB copy-യിൽ അളന്നതാണ്; high-throughput instance അതേ window-യിൽ അനുപാതികമായി കൂടുതൽ rows നിലനിർത്തും.

## മറ്റ് റെസിലിയൻസ് സവിശേഷതകൾ

- **20 റൂട്ടിംഗ് സ്ട്രാറ്റജികൾ** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) കാണുക.
- **റീസെറ്റ്-അവേർ റൂട്ടിംഗ്** (v3.8.0) — ക്വോട്ട റീസെറ്റ് സമയം അനുസരിച്ച് കണക്ഷനുകൾക്ക് മുൻഗണന നൽകുന്നു.
- **ബാക്ക്ഗ്രൗണ്ട് മോഡ് ഡിഗ്രഡേഷൻ** — Responses API `background: true` മുന്നറിയിപ്പോടെ സിങ്ക് ആയി ഡിഗ്രേഡ് ചെയ്യപ്പെടുന്നു.
- **ഡൈനാമിക് ടൂൾ ലിമിറ്റ് ഡിറ്റക്ഷൻ** — ടൂൾ കൗണ്ട് പരിധികൾ എത്തുമ്പോൾ പ്രൊവൈഡറുകളെ ബാക്ക്-ഓഫ് ചെയ്യുന്നു.
- **എമർജൻസി ഫാൾബാക്ക്** — `OMNIROUTE_EMERGENCY_FALLBACK` നിയന്ത്രിക്കുന്നു; റീസ്റ്റാർട്ട് ഇല്ലാതെ ഫീച്ചർ ഫ്ലാഗ്സ് പേജിൽ നിന്ന് ഓപ്പറേറ്റർമാർക്ക് ഇത് ഓവർറൈഡ് ചെയ്യാം.

---

## ഡീബഗ്ഗിംഗ്

- Weighted കോംബോ `503 all_targets_cooling_down` എന്ന് മറുപടി നൽകുന്നു (`Retry-After` സെറ്റ് ചെയ്തിരിക്കുന്നു, `diagnostics.excluded` `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` എന്നിവയോടെ ഓരോ ടാർഗറ്റിനെയും ലിസ്റ്റ് ചെയ്യുന്നു) → പൂൾ കോൺഫിഗർ ചെയ്തും കണക്ട് ചെയ്തും കഴിഞ്ഞിരിക്കുന്നു, ഓരോ ടാർഗറ്റും ഒരു റെസിലിയൻസ് ടൈമർ വഴി ഒഴിവാക്കപ്പെട്ടിരിക്കുകയാണ്; `[COMBO] Weighted selection: every target excluded before dispatch — …` എന്ന മുന്നറിയിപ്പ് കാരണങ്ങളെയും ബാക്കിയുള്ള സെക്കൻഡുകളെയും പേരിട്ട് വ്യക്തമാക്കുന്നു. അതേ കോംബോയിൽ നിന്നുള്ള ഒരു `404 no_executable_targets` എന്നാൽ ഒരു റെസിലിയൻസ് ടൈമറും ഉൾപ്പെട്ടിട്ടില്ല എന്നാണ് അർത്ഥം (പ്രവർത്തിപ്പിക്കാൻ ഒന്നുമില്ല, അല്ലെങ്കിൽ എല്ലാ അക്കൗണ്ടുകളും ലഭ്യതാ പ്രോബിൽ പരാജയപ്പെട്ടു). `targetResolution.ts`-ൽ ശേഖരിച്ച ഒഴിവാക്കലുകളിൽ നിന്ന് `open-sse/services/combo/pinRecovery.ts`-ൽ നിർമ്മിച്ചിരിക്കുന്നു.
- ഒരു പ്രൊവൈഡറിന്റെ എല്ലാ കീകളും സ്കിപ്പ് ചെയ്യപ്പെട്ടു → സർക്യൂട്ട് ബ്രേക്കർ സ്റ്റേറ്റും ഓരോ കണക്ഷന്റെയും `rateLimitedUntil`/`testStatus` എന്നിവ രണ്ടും പരിശോധിക്കുക.
- റീസെറ്റ് വിൻഡോയ്ക്ക് ശേഷം പ്രൊവൈഡർ എന്നെന്നേക്കുമായി ഒഴിവാക്കപ്പെട്ടു → `getStatus()`/`canExecute()` എന്നിവയ്ക്ക് പകരം അസംസ്കൃത `state` വായിക്കുന്ന കോഡ്.
- ഒരു കീ പരാജയപ്പെട്ടു, മറ്റുള്ളവ പ്രവർത്തിക്കണം → സർക്യൂട്ട് ബ്രേക്കറിനേക്കാൾ കണക്ഷൻ കൂൾഡൗൺ തിരഞ്ഞെടുക്കുക.
- ഒരു മോഡൽ മാത്രം പരാജയപ്പെടുന്നു → കണക്ഷൻ കൂൾഡൗണിനേക്കാൾ മോഡൽ ലോക്ക്ഔട്ട് തിരഞ്ഞെടുക്കുക.
- സ്റ്റേറ്റ് സ്വയം പുനഃസ്ഥാപിക്കണം, പക്ഷേ സംഭവിക്കുന്നില്ല → ഭാവി ടൈംസ്റ്റാമ്പും കാലഹരണപ്പെട്ട സ്റ്റേറ്റ് പുതുക്കുന്ന റീഡ് പാത്തും പരിശോധിക്കുക. സ്ഥിരമായ സ്റ്റാറ്റസുകൾക്ക് മാനുവൽ മാറ്റങ്ങൾ ആവശ്യമാണ്.

---

## റൺടൈം സ്റ്റേറ്റ് — ഏജന്റ് ദ്രുത റഫറൻസ്

> `AGENTS.md`-ൽ നിന്ന് → "Resilience Runtime State" (PR #12743) എന്നതിൽ നിന്ന് യഥാതഥം മാറ്റിയതാണ്, അങ്ങനെ ഏജന്റ് ഗൈഡ് 40k കonteക്സ്റ്റ് ബജറ്റിന് താഴെ നിലനിൽക്കുന്നു. ഇത് മുകളിലെ വിഭാഗങ്ങളുടെ സാന്ദ്രീകൃതമായ, ഏജന്റ്-അഭിമുഖ കാഴ്ചയാണ്; നമ്പർ ചെയ്ത വിഭാഗങ്ങൾ പൂർണ്ണ റഫറൻസായി തുടരുന്നു.

OmniRoute-ന് പരസ്പരം ബന്ധമുള്ളതും എന്നാൽ വ്യത്യസ്തവുമായ മൂന്ന് താൽക്കാലിക-പരാജയ സംവിധാനങ്ങളുണ്ട്. റൂട്ടിംഗ് പെരുമാറ്റം ഡീബഗ് ചെയ്യുമ്പോൾ അവയുടെ സ്കോപ്പ് വെവ്വേറെ സൂക്ഷിക്കുക. ഒറ്റനോട്ടത്തിലുള്ള മാപ്പിനായി [3-ലെയർ റെസിലിയൻസ് ഡയഗ്രം](../diagrams/exported/resilience-3layers.svg) (സോഴ്സ്: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)) കാണുക.

### പ്രൊവൈഡർ സർക്യൂട്ട് ബ്രേക്കർ

**സ്കോപ്പ്**: മുഴുവൻ പ്രൊവൈഡറും, ഉദാ. `glm`, `openai`, `anthropic`.

**ലക്ഷ്യം**: അപ്സ്ട്രീം/സർവീസ് ലെവലിൽ ആവർത്തിച്ച് പരാജയപ്പെടുന്ന ഒരു പ്രൊവൈഡറിലേക്ക് ട്രാഫിക് അയയ്ക്കുന്നത് നിർത്തുക, അങ്ങനെ അനാരോഗ്യകരമായ ഒരു പ്രൊവൈഡർ ഓരോ റിക്വസ്റ്റിനെയും മന്ദഗതിയിലാക്കാതിരിക്കും.

**നടപ്പിലാക്കൽ**:

- കോർ ക്ലാസ്: `src/shared/utils/circuitBreaker.ts`
- ചാറ്റ് ഗേറ്റ്/എക്സിക്യൂഷൻ വയറിംഗ്: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- റൺടൈം സ്റ്റാറ്റസ് API: `src/app/api/monitoring/health/route.ts`
- പങ്കിട്ട റാപ്പറുകൾ: `open-sse/services/accountFallback.ts`
- സ്ഥിരമായി സൂക്ഷിച്ച സ്റ്റേറ്റ് ടേബിൾ: `domain_circuit_breakers`

**സ്റ്റേറ്റുകൾ** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: സാധാരണ ട്രാഫിക്ക് അനുവാദമുണ്ട്.
- `DEGRADED`: നേരത്തെയുള്ള-മുന്നറിയിപ്പ് ബാൻഡ് — പരാജയങ്ങൾ ഡിഗ്രഡേഷൻ പരിധി കടന്നു, പക്ഷേ ബ്രേക്കർ പരിധി ഇതുവരെ കടന്നിട്ടില്ല; ട്രാഫിക് ഇപ്പോഴും ഒഴുകുന്നു, ഡാഷ്ബോർഡുകൾ മുന്നറിയിപ്പ് കാണിക്കുന്നു. സാധുവായ ഒരു കണക്ഷൻ ടെസ്റ്റോ പുതിയ പരാജയമില്ലാത്ത ശാന്തമായ ഒരു വിൻഡോയോ അതിനെ `CLOSED`-ലേക്ക് തിരികെ കൊണ്ടുവരും (`docs/architecture/RESILIENCE_GUIDE.md`-ൽ വിൻഡോ ഉണ്ട്).
- `OPEN`: പ്രൊവൈഡർ താൽക്കാലികമായി തടഞ്ഞിരിക്കുന്നു; കോളർമാർക്ക് ഒരു പ്രൊവൈഡർ-സർക്യൂട്ട്-ഓപ്പൺ മറുപടി ലഭിക്കുന്നു അല്ലെങ്കിൽ കോംബോ റൂട്ടിംഗ് മറ്റൊരു ടാർഗറ്റിലേക്ക് സ്കിപ്പ് ചെയ്യുന്നു.
- `HALF_OPEN`: റീസെറ്റ് ടൈംഔട്ട് കഴിഞ്ഞിരിക്കുന്നു; ഒരു പ്രോബ് റിക്വസ്റ്റ് അനുവദിക്കുക. വിജയം ബ്രേക്കർ അടയ്ക്കുന്നു, പരാജയം അതിനെ വീണ്ടും തുറക്കുന്നു.

**ഡിഫോൾട്ടുകൾ** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts`-ലെ `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` വഴി ഉപഭോഗിക്കപ്പെടുന്നു → `src/sse/handlers/chatHelpers.ts`-ലെ `getCircuitBreaker(provider, …)`). മുഴുവൻ-പ്രൊവൈഡർ ബ്രേക്കർ `circuitBreakerThreshold` / `circuitBreakerReset`-ലാണ് പ്രവർത്തിക്കുന്നത്:

| പ്രൊഫൈൽ | ഡിഗ്രേഡ് ആകുന്നത് | തുറക്കുന്നത് (`circuitBreakerThreshold`) | റീസെറ്റ് (`circuitBreakerReset`) |
| ------- | ----------------: | ---------------------------------------: | -------------------------------: |
| OAuth   |               `5` |                                      `8` |                            `60s` |
| API key |               `7` |                                     `12` |                            `30s` |
| ലോക്കൽ  |        (ഡിരൈവ്ഡ്) |                                      `2` |                            `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2), `providerFailureWindowMs` (15/30/5 മിനിറ്റ്), `providerCooldownMs` (5/10/1 മിനിറ്റ്) എന്നിവയും നിർവ്വചിക്കുന്നു: ഇവയാണ് **ഓപ്റ്റ്-ഇൻ ആഗോള പ്രൊവൈഡർ കൂൾഡൗണിന്റെ വിൻഡോ ഗേറ്റിന്** ശക്തി നൽകുന്നത് (`PROVIDER_COOLDOWN_ENABLED`, ഡിഫോൾട്ട് ഓഫ്) — `open-sse/services/providerCooldownTracker.ts`-ലെ ഒരു പ്രൊവൈഡർ-ലെവൽ എൻട്രി `providerFailureWindowMs`-ക്കുള്ളിൽ `providerFailureThreshold` പരാജയങ്ങൾക്ക് ശേഷം മാത്രമേ കൂളിംഗായി കണക്കാക്കപ്പെടൂ, തുടർന്ന് `providerCooldownMs` സമയത്തേക്ക് കൂൾ ആകുന്നു. ഇവ തത്സമയ ബ്രേക്കറിന്റെ പരിധികളല്ല — ബ്രേക്കർ പെരുമാറ്റം പ്രതീക്ഷിച്ചുകൊണ്ട് അവ ക്രമീകരിക്കരുത്. ഓരോ ഡിഫോൾട്ടും `OMNIROUTE_PROVIDER_BREAKER_*` ഒപ്പം `OMNIROUTE_CIRCUIT_BREAKER_*` env വേരിയബിളുകൾ വഴി ഓവർറൈഡ് ചെയ്യാവുന്നതാണ്; റൺടൈം-കൃത്യമായ റഫറൻസ് ടേബിൾ `docs/architecture/RESILIENCE_GUIDE.md`-ൽ ആണ്.

പ്രൊവൈഡർ-ലെവൽ പരാജയ സ്റ്റാറ്റസുകൾ മാത്രമേ പ്രൊവൈഡർ ബ്രേക്കറെ ട്രിപ്പ് ചെയ്യാവൂ:

```ts
(408, 500, 502, 503, 504);
```

മിക്ക `401`, `403`, `429` കേസുകൾ പോലെയുള്ള സാധാരണ അക്കൗണ്ട്/കീ/മോഡൽ പിശകുകൾക്ക് മുഴുവൻ-പ്രൊവൈഡർ ബ്രേക്കറെ ട്രിപ്പ് ചെയ്യരുത്. അവ സാധാരണയായി കണക്ഷൻ കൂൾഡൗണിന്റെയോ മോഡൽ ലോക്ക്ഔട്ടിന്റെയോ പരിധിയിലാണ്. ഒരു ജനറിക് API-കീ പ്രൊവൈഡർ `403` പുനഃസ്ഥാപിക്കാവുന്നതായിരിക്കണം, അതിനെ ഒരു ടെർമിനൽ പ്രൊവൈഡർ/അക്കൗണ്ട് പിശകായി തരംതിരിച്ചിട്ടുണ്ടെങ്കിൽ മാത്രം ഒഴികെ.

ബ്രേക്കർ ബാക്ക്ഗ്രൗണ്ട് ടൈമറല്ല, ലേസി റിക്കവറിയാണ് ഉപയോഗിക്കുന്നത്. `OPEN` കാലഹരണപ്പെടുമ്പോൾ, `getStatus()`, `canExecute()`, `getRetryAfterMs()` പോലുള്ള റീഡുകൾ സ്റ്റേറ്റ് `HALF_OPEN` ആയി പുതുക്കുന്നു, അതിനാൽ ഡാഷ്ബോർഡുകളും കോംബോ കാൻഡിഡേറ്റ് ബിൽഡറുകളും കാലഹരണപ്പെട്ട ഒരു പ്രൊവൈഡറെ എന്നേക്കുമായി ഒഴിവാക്കിക്കൊണ്ടിരിക്കില്ല.

### കണക്ഷൻ കൂൾഡൗൺ

**പരിധി**: ഒരു പ്രൊവൈഡർ കണക്ഷൻ/അക്കൗണ്ട്/കീ.

**ഉദ്ദേശ്യം**: ഒരേ പ്രൊവൈഡറിന്റെ മറ്റ് കണക്ഷനുകൾ റിക്വസ്റ്റുകൾ സർവ് ചെയ്യുന്നത് തുടരാൻ അനുവദിച്ചുകൊണ്ട്, മോശമായ ഒരു കീ/അക്കൗണ്ടിനെ താൽക്കാലികമായി ഒഴിവാക്കുക.

**നടപ്പിലാക്കൽ**:

- എഴുത്ത്/അപ്ഡേറ്റ് പാത്ത്: `src/sse/services/auth.ts::markAccountUnavailable()`
- അക്കൗണ്ട് തിരഞ്ഞെടുപ്പ്/ഫിൽട്ടറിംഗ്: `src/sse/services/auth.ts::getProviderCredentials...`
- കൂൾഡൗൺ കണക്കുകൂട്ടൽ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- സെറ്റിംഗ്സ്: `src/lib/resilience/settings.ts`

പ്രൊവൈഡർ കണക്ഷനുകളിലെ പ്രധാന ഫീൽഡുകൾ:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

അക്കൗണ്ട് തിരഞ്ഞെടുപ്പിനിടയിൽ, ഇപ്രകാരമുള്ളപ്പോൾ ഒരു കണക്ഷൻ ഒഴിവാക്കപ്പെടും:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

കൂൾഡൗണുകളും ലേസി ആണ്: `rateLimitedUntil` കഴിഞ്ഞുപോയാൽ, കണക്ഷൻ വീണ്ടും യോഗ്യമാകും. വിജയകരമായ ഉപയോഗത്തിൽ, `clearAccountError()` `testStatus`, `rateLimitedUntil`, എറർ ഫീൽഡുകൾ, `backoffLevel` എന്നിവ മായ്ക്കും.

ഡിഫോൾട്ട് കണക്ഷൻ കൂൾഡൗൺ സ്വഭാവം:

- OAuth അടിസ്ഥാന കൂൾഡൗൺ: `5s`.
- API-കീ അടിസ്ഥാന കൂൾഡൗൺ: `3s`.
- API-കീ `429`-ൽ, ലഭ്യമാകുമ്പോൾ അപ്സ്ട്രീം റിട്രൈ സൂചനകൾ (`Retry-After`, റീസെറ്റ് ഹെഡറുകൾ, അല്ലെങ്കിൽ പാഴ്സ് ചെയ്യാവുന്ന റീസെറ്റ് ടെക്സ്റ്റ്) മുൻഗണന നൽകണം.
- ആവർത്തിക്കുന്ന റിക്കവറബിൾ പരാജയങ്ങൾ എക്സ്പോണൻഷ്യൽ ബാക്ക്ഓഫ് ഉപയോഗിക്കുന്നു:

```ts
baseCooldownMs * 2 ** failureIndex;
```

ആന്റി-തണ്ടറിംഗ്-ഹേർഡ് ഗാർഡ്, ഒരേ കണക്ഷനിലെ സമാന്തര പരാജയങ്ങൾ കൂൾഡൗൺ ആവർത്തിച്ച് നീട്ടുന്നതിനെയും `backoffLevel` ഇരട്ടി-ഇൻക്രിമെന്റ് ചെയ്യുന്നതിനെയും തടയുന്നു.

ടർമിനൽ സ്റ്റേറ്റുകൾ കൂൾഡൗണുകളല്ല. ക്രെഡൻഷ്യലുകൾ/സെറ്റിംഗ്സ് മാറുന്നതുവരെ അല്ലെങ്കിൽ ഒരു ഓപ്പറേറ്റർ അവ റീസെറ്റ് ചെയ്യുന്നതുവരെ ലഭ്യമല്ലാതെ തുടരാനാണ് `banned`, `expired` (`EXPIRED_RETRY_MAX` വഴി N ബൗണ്ടഡ് റിട്രൈകൾക്ക് ശേഷം മാത്രമേ ടർമിനൽ ആവൂ), `credits_exhausted` എന്നിവ ഉദ്ദേശിച്ചിരിക്കുന്നത്. ടർമിനൽ സ്റ്റേറ്റുകളെ താൽക്കാലിക കൂൾഡൗൺ സ്റ്റേറ്റ് കൊണ്ട് ഓവർറൈറ്റ് ചെയ്യരുത്.

### മോഡൽ ലോക്ക്ഔട്ട്

**പരിധി**: പ്രൊവൈഡർ + കണക്ഷൻ + മോഡൽ.

**ഉദ്ദേശ്യം**: ആ കണക്ഷനിൽ ഒരു മോഡൽ മാത്രം ലഭ്യമല്ലാത്തതോ ക്വോട്ട-പരിമിതമായതോ ആയപ്പോൾ മുഴുവൻ കണക്ഷനും അപ്രാപ്തമാക്കുന്നത് ഒഴിവാക്കുക.

ഉദാഹരണങ്ങൾ:

- `429` തിരിച്ചുനൽകുന്ന മോഡൽ-തല ക്വോട്ട പ്രൊവൈഡറുകൾ.
- നഷ്ടപ്പെട്ട ഒരു മോഡലിനായി `404` തിരിച്ചുനൽകുന്ന ലോക്കൽ പ്രൊവൈഡറുകൾ.
- തിരഞ്ഞെടുത്ത Grok മോഡുകൾ പോലുള്ള പ്രൊവൈഡർ-നിർദ്ദിഷ്ട മോഡ്/മോഡൽ അനുമതി പരാജയങ്ങൾ.

മോഡൽ ലോക്ക്ഔട്ട് `open-sse/services/accountFallback.ts`-ൽ ആണ്, അതേ കണക്ഷൻ മറ്റ് മോഡലുകൾ സർവ് ചെയ്യുന്നത് തുടരാൻ ഇത് അനുവദിക്കുന്നു.

### ഡീബഗ്ഗിംഗ് മാർഗ്ഗനിർദ്ദേശം

- ഒരു പ്രൊവൈഡറുടെ എല്ലാ കീകളും ഒഴിവാക്കപ്പെടുന്നുവെങ്കിൽ, പ്രൊവൈഡർ ബ്രേക്കർ സ്റ്റേറ്റും ഓരോ കണക്ഷന്റെയും `rateLimitedUntil`/`testStatus` എന്നിവ പരിശോധിക്കുക.
- റീസെറ്റ് വിൻഡോയ്ക്ക് ശേഷം ഒരു പ്രൊവൈഡർ സ്ഥിരമായി ഒഴിവാക്കപ്പെട്ടതായി തോന്നുന്നുവെങ്കിൽ, കോഡ് `getStatus()`/`canExecute()` ഉപയോഗിക്കുന്നതിന് പകരം റോ `state` വായിക്കുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക.
- ഒരു പ്രൊവൈഡർ കീ പരാജയപ്പെട്ടാലും മറ്റുള്ളവ പ്രവർത്തിക്കേണ്ടതാണെങ്കിൽ, പ്രൊവൈഡർ ബ്രേക്കറിന് പകരം കണക്ഷൻ കൂൾഡൗൺ തിരഞ്ഞെടുക്കുക.
- ഒരു മോഡൽ മാത്രം പരാജയപ്പെടുന്നുവെങ്കിൽ, കണക്ഷൻ കൂൾഡൗണിന് പകരം മോഡൽ ലോക്ക്ഔട്ട് തിരഞ്ഞെടുക്കുക.
- ഒരു സ്റ്റേറ്റ് സ്വയം-റിക്കവർ ചെയ്യേണ്ടതാണെങ്കിൽ, അതിന് ഒരു ഭാവി ടൈംസ്റ്റാമ്പ്/റീസെറ്റ് ടൈംഔട്ടും കാലഹരണപ്പെട്ട സ്റ്റേറ്റ് പുതുക്കുന്ന ഒരു റീഡ് പാത്തും ഉണ്ടായിരിക്കണം. സ്ഥിരമായ സ്റ്റാറ്റസുകൾക്ക് മാനുവൽ ക്രെഡൻഷ്യൽ അല്ലെങ്കിൽ കോൺഫിഗ് മാറ്റങ്ങൾ ആവശ്യമാണ്.

---

## TLS ഫിംഗർപ്രിന്റിംഗ് & സ്റ്റെൽത്ത്

പ്രൊവൈഡർ-നിർദ്ദിഷ്ട സ്റ്റെൽത്ത് (JA3/JA4, CCH, ഒബ്ഫസ്കേഷൻ) പ്രത്യേകം ഡോക്യുമെന്റ് ചെയ്തിട്ടുണ്ട് — `docs/security/STEALTH_GUIDE.md` കാണുക (git; `/docs`-ലേക്ക് കംപൈൽ ചെയ്തിട്ടില്ല).

---

## റെസിലിയൻസ് പരിശോധന (Phase 8 · Block C)

റെസിലിയൻസ് ലോജിക്കിനായുള്ള യൂണിറ്റ് ടെസ്റ്റുകൾക്ക് പുറമേ, യഥാർത്ഥ സ്ട്രസ്സ്/പരാജയ സാഹചര്യങ്ങളിൽ റൺടൈമിനെ പ്രവർത്തിപ്പിക്കുന്ന മൂന്ന് ടെസ്റ്റുകൾ (എല്ലാം integration/nightly — ഒന്നും PR-കളെ തടയുന്നില്ല):

| ടെസ്റ്റ്    | എന്ത്                                                                                                                                                                                                                                         | റൺ                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | കളവ്-അപ്സ്ട്രീം നോഡ് യഥാർത്ഥ latency/reset/timeout/503 ഇഞ്ജക്ട് ചെയ്യുന്നു; സർക്യൂട്ട് ബ്രേക്കർ തുറക്കുന്നുവെന്നും വീണ്ടെടുക്കുന്നുവെന്നും, `checkFallbackError` 503-നെ വീണ്ടെടുക്കാവുന്ന ഫോൾബാക്കായി തരംതിരിക്കുന്നുവെന്നും സാധൂകരിക്കുന്നു. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | `--expose-gc`-ൽ ഓരോ `createSSEStream`-നും ~500 സ്ട്രീമുകൾ; ഹീപ് പരിധിക്കപ്പുറം വളർന്നാൽ പരാജയപ്പെടും (OOM ഗാർഡ് #3069).                                                                                                                       | `npm run test:heap`                      |
| k6 soak     | `/api/monitoring/health`-നെതിരെ തുടർച്ചയായ ലോഡ്; p95/എറർ ത്രെഷോൾഡുകൾ.                                                                                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` ഓർക്കസ്ട്രേറ്റ് ചെയ്യുന്നു (cron + dispatch).
ഡിഫോൾട്ട് `test:integration`-ൽ, chaos-ഉം heap-ഉം സ്വയം സ്കിപ്പ് ചെയ്യുന്നു (`RUN_CHAOS_INT`/`--expose-gc` ഇല്ലാതെ).

---

## ഇതും കാണുക

- [ആർക്കിടെക്ചർ ഗൈഡ്](./ARCHITECTURE.md) — സിസ്റ്റം ആർക്കിടെക്ചറും ആന്തരിക പ്രവർത്തനങ്ങളും
- [യൂസർ ഗൈഡ്](../guides/USER_GUIDE.md) — പ്രൊവൈഡറുകൾ, കോമ്പോകൾ, CLI ഇന്റഗ്രേഷൻ
- [ഓട്ടോ-കോമ്പോ എഞ്ചിൻ](../routing/AUTO-COMBO.md) — 16-ഫാക്ടർ സ്കോറിംഗ്, മോഡ് പാക്കുകൾ
