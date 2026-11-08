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

**സ്കോപ്പ്:** provider + connection + model ത്രയം.

**സ്റ്റാറ്റസ് അനുസരിച്ചുള്ള കീ സ്കോപ്പ്:** പരാജയപ്പെട്ട സ്റ്റാറ്റസാണ് ഒരു ലോക്ക്ഔട്ട് ഏത് കീയിലേക്ക് എഴുതണമെന്ന് തീരുമാനിക്കുന്നത് (`open-sse/services/accountFallback/exactModelLock.ts`-ൽ `resolveLockoutScope()`):

- `429` / `403` / `402` — ക്വോട്ടയുടെയോ അനുമതിയുടെയോ (entitlement) ഒരു സിഗ്നൽ — **ക്വോട്ട കുടുംബം** ലോക്ക് ചെയ്യുക:
  codex-ന് മുഴുവൻ `codex` / `spark` സ്കോപ്പും (ആ കണക്ഷനിലെ എല്ലാ `gpt-5*` മോഡലുകളും), മറ്റ് പ്രൊവൈഡറുകൾക്ക് `getQuotaScopedModelForProvider()`.
- `404` വെറും മോഡലിനെ ലോക്ക് ചെയ്യുന്നു (`getModelLockKey()` `not_found`-നെ ചുരുക്കുന്നു).
- മറ്റെല്ലാ സ്റ്റാറ്റസുകളും — `5xx` ട്രാൻസ്പോർട്ട്/സെർവർ പരാജയങ്ങളും, ക്വാളിറ്റി വാലിഡേഷനിൽ നിന്ന് OmniRoute സ്വയം സൃഷ്ടിക്കുന്ന `502`-ഉം — **കൃത്യമായ** provider/connection/model ട്യൂപ്പിളിനെ മാത്രം ലോക്ക് ചെയ്യുന്നു. ഒരു മോഡലിലെ മോശം സ്ട്രീം ആ അക്കൗണ്ടിന്റെ ക്വോട്ടയെക്കുറിച്ചുള്ള തെളിവല്ല; ഈ നിയമം വരുന്നതിന് മുൻപ് `codex/gpt-5.6-luna`-ലെ ഒരൊറ്റ ശൂന്യ പ്രതികരണം ആ കണക്ഷനിലെ എല്ലാ `gpt-5*` മോഡലുകളെയും റൂട്ടിംഗിൽ നിന്ന് 2–30 മിനിറ്റ് വരെ (എസ്കലേറ്റിംഗ്) നീക്കിക്കളയുമായിരുന്നു — അതിന്റെ ക്വോട്ടയിൽ മാറ്റമൊന്നുമില്ലാതെ.
- കോളറുടെ സ്പഷ്ടമായ `scope` ഓപ്ഷന് എല്ലായ്പ്പോഴും മുൻഗണന ലഭിക്കും (Antigravity `"exact"` അയയ്ക്കുന്നു).

**ഉദ്ദേശ്യം:** ഒരു മോഡൽ മാത്രം ലഭ്യമല്ലാതിരിക്കുമ്പോഴോ ക്വോട്ട-പരിമിതിയിലാകുമ്പോഴോ ഒരു മുഴുവൻ കണക്ഷനെയും പ്രവർത്തനരഹിതമാക്കുന്നത് ഒഴിവാക്കുക.

**ഉദാഹരണങ്ങൾ:**

- 429 തിരികെ നൽകുന്ന മോഡൽ-തല ക്വോട്ട പ്രൊവൈഡറുകൾ
- ഒരു നഷ്ടപ്പെട്ട മോഡലിന് 404 തിരികെ നൽകുന്ന ലോക്കൽ പ്രൊവൈഡറുകൾ
- പ്രൊവൈഡർ-നിർദ്ദിഷ്ട മോഡ്/മോഡൽ അനുമതി പരാജയങ്ങൾ (ഉദാ., Grok മോഡുകൾ)

**നടപ്പിലാക്കൽ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### മോഡൽ കൂൾഡൗൺസ് ഡാഷ്ബോർഡ് (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

സജീവ ലോക്ക്ഔട്ടുകൾ ഇവയോടൊപ്പം ലിസ്റ്റ് ചെയ്യുന്നു: provider, connection, model, reason, expiresAt. കാർഡിൽ നിന്ന് ഒരു മോഡലിനെ ഓപ്പറേറ്റർമാർക്ക് സ്വമേധയാ വീണ്ടും പ്രാപ്തമാക്കാം.

**REST API:**

- `GET /api/resilience/model-cooldowns` — സജീവ ലോക്ക്ഔട്ടുകൾ ലിസ്റ്റ് ചെയ്യുക
- `DELETE /api/resilience/model-cooldowns` — സ്വമേധയാ വീണ്ടും പ്രാപ്തമാക്കൽ. Body: `{provider, connection, model}`. Auth: management.

### കൂൾഡൗൺ മാനേജർ

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

ഓരോ പ്രൊവൈഡർ പേജും തുറക്കുന്നതിന് പകരം, ഒരു താൽക്കാലിക കാരണത്താൽ റൂട്ടിംഗിൽ നിന്ന് പുറത്തുനിൽക്കുന്ന ഓരോ കണക്ഷനും ഒരൊറ്റ പേജിൽ. ഇത് കണക്ഷൻ കൂൾഡൗണുകളും, മോഡൽ ലോക്ക്ഔട്ടുകളും, ടർമിനൽ സ്റ്റേറ്റുകളും ലിസ്റ്റ് ചെയ്യുന്നു; അവയെ ഓരോ കണക്ഷനു വേണ്ടിയോ, ഒരു തിരഞ്ഞെടുപ്പിനോ, അല്ലെങ്കിൽ ഒരു പ്രൊവൈഡറിന്റെ എല്ലാ കണക്ഷനുകൾക്കും വേണ്ടി മായ്ക്കുന്നു. ഏറ്റവും കൂടുതൽ ട്യൂൺ ചെയ്യുന്ന കൂൾഡൗൺ നിയമങ്ങളും എഡിറ്റ് ചെയ്യുന്നു: `streamStallCooldown.enabled` ഉം OAuth / API-key `connectionCooldown` അടിസ്ഥാന കൂൾഡൗണും പരമാവധി ബാക്ക്ഓഫ് സ്റ്റെപ്പുകളും (`PATCH /api/resilience` വഴി സേവ് ചെയ്യുന്നു). ടർമിനൽ സ്റ്റേറ്റുകൾ (`banned`, `expired`, `credits_exhausted`) ലിസ്റ്റ് ചെയ്യുന്നുണ്ടെങ്കിലും ഇവിടെ ഒരിക്കലും മായ്ക്കപ്പെടുന്നില്ല.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — സ്റ്റാറ്റസ്, ശേഷിക്കുന്ന കൂൾഡൗൺ, ബാക്ക്ഓഫ് ലെവൽ, അവസാന എറർ ടൈപ്പ്, മോഡൽ ലോക്ക്ഔട്ടുകൾ എന്നിവയുള്ള കണക്ഷനുകൾ (ക്രെഡൻഷ്യലുകളില്ലാതെ)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` അല്ലെങ്കിൽ
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` തിരികെ നൽകുന്നു

### ലോക്ക്ഔട്ട് സെറ്റിംഗ്സ് UI + സക്സസ്-ഡിക്കേ റിക്കവറി (v3.8.23)

മോഡൽ ലോക്ക്ഔട്ട് എപ്പോഴും ഓൺ ആയ ഹാർഡ്കോഡ് ചെയ്ത സ്വഭാവത്തിൽ നിന്ന്, സ്വന്തം സെറ്റിംഗ്സ് കാർഡും സ്വയം പരിഹാര റിക്കവറി പാതയുമുള്ള പൂർണ്ണമായും കോൺഫിഗർ ചെയ്യാവുന്ന, opt-in ഫീച്ചറായി മാറി.

**സെറ്റിംഗ്സ് കാർഡ്:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
ഇത് മുകളിലുള്ള റീഡ്-ഓൺലി `ModelCooldownsCard`-ൽ നിന്ന് **വ്യത്യസ്തമാണ്** (അത് സജീവ ലോക്ക്ഔട്ടുകൾ _ലിസ്റ്റ്_ ചെയ്യുക മാത്രം ചെയ്യുന്നു) — പുതിയ കാർഡ് _പാരാമീറ്ററുകൾ കോൺഫിഗർ ചെയ്യുന്നു_. ഡിഫോൾട്ടുകൾ `DEFAULT_MODEL_LOCKOUT_SETTINGS`-ലാണ്
(`src/lib/resilience/modelLockoutSettings.ts`):

| സെറ്റിംഗ്               | ഡിഫോൾട്ട്                        | അർത്ഥം                                                                       |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `enabled`               | `false`                          | മാസ്റ്റർ ടോഗിൾ — മോഡൽ ലോക്ക്ഔട്ട് **ഡിഫോൾട്ടായി ഓഫ് ആണ്**.                   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | മോഡൽ-സ്കോപ്പ് പരാജയമായി കണക്കാക്കുന്ന അപ്സ്ട്രീം സ്റ്റാറ്റസുകൾ.              |
| `baseCooldownMs`        | `120_000` (120 s)                | ആദ്യ പരാജയത്തിന്റെ പ്രാരംഭ ലോക്ക്ഔട്ട് ദൈർഘ്യം.                              |
| `maxCooldownMs`         | `1_800_000` (30 min)             | എസ്കലേറ്റ് ചെയ്ത കൂൾഡൗണിന്റെ പരിധി.                                          |
| `maxBackoffSteps`       | `10`                             | പരമാവധി എക്സ്പോണൻഷ്യൽ-ബാക്ക്ഓഫ് എസ്കലേഷൻ സ്റ്റെപ്പുകൾ.                       |
| `useExponentialBackoff` | `true`                           | ആവർത്തിക്കുന്ന പരാജയങ്ങൾ കൂൾഡൗണെ എക്സ്പോണൻഷ്യലായി എസ്കലേറ്റ് ചെയ്യുന്നുണ്ടോ. |

സെറ്റിംഗ്സുകൾ സാധാരണ സെറ്റിംഗ്സ് സ്റ്റോർ വഴി സൂക്ഷിക്കുകയും resilience സെറ്റിംഗ്സ് സ്കീമ വഴി വാലിഡേറ്റ് ചെയ്യുകയും ചെയ്യുന്നു; കാർഡ് `baseCooldownMs`/`maxCooldownMs` എന്നിവ ക്ലാമ്പ് ചെയ്യുന്നു
(`maxCooldownMs ≥ baseCooldownMs` ആയിരിക്കണം) `maxBackoffSteps`-ഉം കൂടെ.

**സക്സസ്-ഡിക്കേ റിക്കവറി:** റിക്കവറി **കേവലം** ടൈമർ കാലാവധി പൂർത്തിയാകലല്ല. ഒരു ആരോഗ്യകരമായ പ്രതികരണം മോഡലിന്റെ ഫെയിലിയർ കൗണ്ട് താഴേക്ക് കൊണ്ടുവരുന്നു, അതിനാൽ ജാലകത്തിനിടയിൽ സൗഖ്യം പ്രാപിച്ച ഒരു മോഡൽ ടൈമർ പൂർത്തിയാകുന്നതിന് മുൻപേ എസ്കലേറ്റ് ചെയ്യുന്നത് നിർത്തുകയും (മായ്ക്കപ്പെടുകയും) ചെയ്യുന്നു. വിജയകരമായ ഒരു കോംബോ ടാർഗറ്റിൽ, `open-sse/services/combo.ts` `decayModelFailureCount()` വിളിക്കുന്നു
(`open-sse/services/accountFallback.ts`), അത് സൂക്ഷിച്ചിട്ടുള്ള
`failureCount`-നെ **പകുതിയാക്കുന്നു** (`Math.floor(failureCount / 2)`); അത് `0`-ൽ എത്തുമ്പോൾ ലോക്ക്ഔട്ട് എൻട്രി പൂർണ്ണമായും ഡിലീറ്റ് ചെയ്യപ്പെടുന്നു. അതിന്റെ കൂട്ടക്ഷേമിയായ `recordModelLockoutFailure()` എസ്കലേഷൻ ജാലകത്തിനുള്ളിലെ പരാജയങ്ങളിൽ കൗണ്ട് വർധിപ്പിക്കുന്നു (കൂൾഡൗണും എസ്കലേറ്റ് ചെയ്യുന്നു). ഈ സക്സസ്-ഡിക്കേ സാധാരണ ടൈമർ കാലാവധിയോട് കൂടുതലാണ് —
രണ്ട് പാതകളിലൂടെയും ഒരു മോഡലിനെ വീണ്ടും പ്രാപ്തമാക്കാം.

**സ്റ്റേറ്റ്:** ലോക്ക്ഔട്ടുകൾ **ഇൻ-മെമ്മറിയിലാണ്** സൂക്ഷിക്കുന്നത് (`provider:connectionId:model` എന്നതിൽ കീ ചെയ്ത `ModelLockoutEntry`-യുടെ പ്രോസസ്-തല `Map`-കൾ, എക്സാക്റ്റ്-സ്കോപ്പ് ലോക്കുകൾ `provider:connectionId:exact:model` എന്നതിൽ കീ ചെയ്തത്), DB-യിലേക്ക് സൂക്ഷിക്കുന്നില്ല — റീസ്റ്റാർട്ടിൽ അവ നഷ്ടപ്പെടും. _സെറ്റിംഗ്സുകൾ_ സൂക്ഷിക്കപ്പെടുന്നു; സജീവ ലോക്ക്ഔട്ട് _സ്റ്റേറ്റ്_ താൽക്കാലികമാണ്.

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

## 7. അപ്സ്ട്രീം സ്റ്റാറ്റസ് റീസ്റ്റേറ്റ്മെന്റ് (തെറ്റായി സൂചിപ്പിച്ച ക്വോട്ട പിശകുകൾ)

**പരിധി:** താൽക്കാലിക ക്വോട്ട ക്ഷയത്തെ തെറ്റായ HTTP സ്റ്റാറ്റസിനൊപ്പം റിപ്പോർട്ട് ചെയ്യുന്ന ഒരു അപ്സ്ട്രീം ഗേറ്റ്വേ.

**ഉദ്ദേശ്യം:** വർഗ്ഗീകരണത്തിന് **മുൻപ്** തെറ്റിദ്ധാരണയുണ്ടാക്കുന്ന സ്റ്റാറ്റസ് ശരിയാക്കുക, അതുവഴി ഡൗൺസ്ട്രീം ഉപഭോക്താക്കൾ (ഫോൾബാക്ക് എഞ്ചിൻ, കോംബോ അഗ്രഗേഷൻ, ക്ലയന്റിനെ അഭിമുഖീകരിക്കുന്ന പ്രതികരണം) പരാജയത്തിന്റെ യഥാർത്ഥ റിട്രൈ-ചെയ്യാവുന്ന സ്വഭാവം കാണും.

ചില ഗേറ്റ്വേകൾ താൽക്കാലിക ക്വോട്ട ക്ഷയത്തെ റിട്രൈ ചെയ്യാൻ കഴിയാത്ത HTTP
സ്റ്റാറ്റസിനൊപ്പം സൂചിപ്പിക്കുന്നു. `agentrouter.org` സ്റ്റാൻഡേർഡ് `429`-ന്
പകരം ചൈനീസ് ബോഡിയോടെ (`用户额度不足` / `额度不足`) `403` (ചിലപ്പോൾ `400`)
തിരികെ നൽകുന്നു. Claude Code പോലുള്ള ക്ലയന്റുകൾ `403`-നെ സ്ഥിരമായതായി
കണക്കാക്കി സെഷൻ അവസാനിപ്പിക്കുന്നു, കൂടാതെ ശരിയാക്കൽ ഇല്ലെങ്കിൽ ഫോൾബാക്ക്
എഞ്ചിൻ അതിനെ ഒരു ക്വോട്ട ഇവന്റിന് പകരം `AUTH_ERROR` ആയി വർഗ്ഗീകരിക്കും.

**നടപ്പിലാക്കൽ:**

- റെജിസ്ട്രി + മാച്ചർ: `open-sse/config/upstreamStatusRestatement.ts` — ഓരോ
  പ്രൊവൈഡറിനുമുള്ള റൂളുകളുടെ ലിസ്റ്റ് (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` വഴി മാച്ച്
  ചെയ്യപ്പെടുന്നു.
- കോൾ സൈറ്റ്: `open-sse/handlers/chatCore.ts`-ലെ `providerFailure:` ബ്ലോക്ക്
  (ഏകദേശം വരി 3654), ഒരു പിശക് HTTP സ്റ്റാറ്റസിനൊപ്പം (`!providerResponse.ok`)
  ഉള്ള ഒരു അപ്സ്ട്രീം പ്രതികരണം `parseUpstreamError()` പാഴ്സ് ചെയ്ത ഉടൻ,
  ഏത് വർഗ്ഗീകരണവും ഓടുന്നതിന് മുൻപ് — അതുവഴി ഓരോ ഡൗൺസ്ട്രീം ഉപഭോക്താവും
  ശരിയാക്കിയ സ്റ്റാറ്റസ് കാണുന്നു. ഒരു `200` SSE സ്ട്രീമിനുള്ളിൽ ഉൾപ്പെടുത്തിയിരിക്കുന്ന
  പിശകുകൾ പ്രത്യേകവും പിന്നീടുള്ളതുമായ ഒരു സ്ട്രീം-പാഴ്സിംഗ് പാത പിന്തുടരുന്നു,
  അവ ഈ ഹുക്കിൽ ഇന്ന് ഉൾപ്പെടുന്നതുമാണ് **അല്ല** — അറിയപ്പെടുന്ന ഒരു പരിമിതി,
  agentrouter-ന്റെ തെറ്റായ സ്റ്റാറ്റസിന് (അത് ഒരു പിശക് HTTP സ്റ്റാറ്റസ് ആയി
  പ്രത്യക്ഷപ്പെടുന്നു) ഇത് ഇതുവരെ ആവശ്യമായിട്ടില്ല.
- റിട്രൈ യോഗ്യത: `429` `RETRY_AFTER_ELIGIBLE_STATUSES`-ൽ
  (`open-sse/services/combo/unavailableRetryGate.ts`) ഉണ്ട്, അതിനാൽ ഒരു
  റീസ്റ്റേറ്റ് ചെയ്ത പിശക് മൃതമായ ഒരു `403` ആയി പ്രത്യക്ഷപ്പെടുന്നതിന് പകരം
  യഥാർത്ഥ ഒരു റിട്രൈ വിൻഡോ കൊണ്ടുപോകുന്നു.
- കൃത്രിമമായ `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  റീസ്റ്റേറ്റ് ചെയ്ത പ്രതികരണം **ക്ലയന്റിനോട്** പറയുന്നത് മാത്രമാണ്; അത് തന്നെ
  കണക്ഷന്റെ ആന്തരിക കൂൾഡൗൺ/ലോക്ക്ഔട്ട് ദൈർഘ്യമല്ല — റീസ്റ്റേറ്റ് ചെയ്ത പിശകിനെ
  ഏത് മെക്കാനിസം യഥാർത്ഥത്തിൽ കൈകാര്യം ചെയ്യുന്നുവോ അത് പ്രത്യേകം
  നിയന്ത്രിക്കുന്നു (Connection Cooldown-ന്റെ എസ്കലേറ്റിംഗ് ബാക്ക്ഓഫ്, §2,
  API-കീ പ്രൊവൈഡർമാർക്ക് അടിസ്ഥാനം `3s`; അല്ലെങ്കിൽ agentrouter പോലുള്ള
  per-model-quota പ്രൊവൈഡർമാർക്ക് Model Lockout, §3). ക്ലയന്റിനോട്
  പ്രഖ്യാപിക്കുന്ന 60s വിൻഡോയേക്കാൾ നേരത്തെ റൂട്ടർ ആന്തരികമായി റിട്രൈ ചെയ്യാൻ
  യോഗ്യത നേടാം — ഉദ്ദേശപരമായ ഹെഡ്റൂം, ഒരു ബഗ് അല്ല.

സ്ഥിരമായ പിശകുകൾ (agentrouter-ന്റെ `无权访问模型` — ഈ മോഡലിലേക്ക് പ്രവേശനമില്ല)
ഒരിക്കലും റീസ്റ്റേറ്റ് ചെയ്യുന്നില്ല: `textMarkers` ഹിറ്റ് ചെയ്താലും
`excludeMarkers` റൂളിനെ തിരസ്കരിക്കുന്നു, അതിനാൽ പിശക് അതിന്റെ യഥാർത്ഥ
സ്റ്റാറ്റസ് നിലനിർത്തുന്നു, ഒന്നും അതിനെ എന്നേക്കും റിട്രൈ ചെയ്യുന്നില്ല.
പൊരുത്തപ്പെടുന്ന പ്രൊവൈഡർ വർഗ്ഗീകരണ റൂൾ
(`open-sse/config/providerErrorRules.ts`-ലെ `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, പ്രഖ്യാപിച്ച `6h` അടിസ്ഥാന കൂൾഡൗൺ)
`checkFallbackError` (`open-sse/services/accountFallback.ts`) ജനറിക്
apikey-കാറ്റഗറി `FORBIDDEN` എർലി-റിട്ടേണിന് _മുൻപ്_ പരാമർശിക്കുന്നു,
`honorsRuleLockScope(provider)`-ൽ ഗേറ്റ് ചെയ്യപ്പെട്ടിരിക്കുന്നു (#10334 —
നിലവിൽ `providerErrorRules.ts`-ലെ `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
അലൗലിസ്റ്റ് വഴി agentrouter-മാത്രം). റൂളിന്റെ പ്രഖ്യാപിച്ച 6h കൂൾഡൗൺ
`fallbackResult.baseCooldownMs` ആയി ഒഴുകുന്നു, പക്ഷേ അത് ഇപ്പോഴും
നിലവിലുള്ള per-model-quota ലോക്ക്ഔട്ട് പാതയിലേക്കാണ് പോകുന്നത്
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, കൂൾഡൗൺ സോഴ്സ്
ഒഴികെ #10334-ൽ മാറ്റമൊന്നുമില്ല): മറ്റ് എല്ലാ മോഡൽ ലോക്ക്ഔട്ടുകളെയും പോലെ
അത് ഓപ്പറേറ്ററുടെ `mlSettings.maxCooldownMs`-ലേക്ക് (ഡിഫോൾട്ട് `1_800_000ms`
/ 30 മിനിറ്റ്) ചുരുക്കപ്പെടുന്നു, കൂടാതെ _സ്ഥിരമാക്കിയ ലോക്ക്ഔട്ട് കാരണം_
റൂളിന്റെ `"auth_error"` അല്ല, നിലവിലുള്ള ഹാർഡ്കോഡഡ് `"forbidden"` ആയി
തുടരുന്നു — കൂൾഡൗൺ ദൈർഘ്യം മാത്രമാണ് എൻഡ്-റ്റു-എൻഡ് ബഹുമാനിക്കപ്പെടുന്നത്,
കാരണ സ്ട്രിംഗ് അല്ല. കണക്ഷൻ തന്നെ സജീവമായി തുടരുന്നു; അതേ കണക്ഷനിലെ സഹോദര
മോഡലുകൾ ബാധിക്കപ്പെടുന്നില്ല.

റീസ്റ്റേറ്റ് ചെയ്ത ക്വോട്ട പിശകുകൾ (`额度不足`) പ്രൊഡക്ഷനിൽ ഒരു പ്രൊവൈഡർ
റൂളിൽ എത്തുന്നു (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, സ്വന്തമായി പ്രഖ്യാപിച്ച കൂൾഡൗണൊന്നുമില്ല — പേർസിസ്റ്റൻസ്
ലേയറുടെ സ്കേൽഡ് ബാക്ക്ഓഫ് ഡിഫോൾട്ട് ബാധകമാകുന്നു). #10334 മുതൽ,
`ProviderErrorRuleMatch`-ലെ `scope` എൻഡ്-റ്റു-എൻഡ് ഉപയോഗിക്കപ്പെടുന്നു, പക്ഷേ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` അലൗലിസ്റ്റിലുള്ള പ്രൊവൈഡർമാർക്ക്
**മാത്രം** (`providerErrorRules.ts` — ഇന്ന് `"agentrouter"` മാത്രം,
`honorsRuleLockScope()` വഴി ഗേറ്റ് ചെയ്യപ്പെട്ടിരിക്കുന്നു). മറ്റ് ഓരോ
പ്രൊവൈഡർക്കും `scope` #10334-ന് മുൻപത്തെപ്പോലെ തന്നെ വിവരപരമായി തുടരുന്നു.
`checkFallbackError` പൊരുത്തപ്പെട്ട റൂളിന്റെ scope-നെ `fallbackResult.ruleScope`
ആയി പ്രത്യക്ഷപ്പെടുത്തുന്നു; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ഒരു `ruleScope` കണക്ഷൻ-വ്യാപകവും സ്വയം-വീണ്ടെടുക്കുന്നതുമായ
സിഗ്നലായി ബഹുമാനിക്കാൻ യഥാർത്ഥത്തിൽ സുരക്ഷിതമാണോ എന്ന് സ്ഥിരീകരിക്കുന്ന
പങ്കിട്ട ഗാർഡാണ് (scope `"connection"`, reason `quota_exhausted`, ഒരിക്കലും
`permanent` അല്ല, ഒരിക്കലും `creditsExhausted` അല്ല — സ്കോപ്പ് `"connection"`-നെ
ഒരു സ്ഥിരമായ അക്കൗണ്ട് സ്റ്റേറ്റുമായി ജോടിയാക്കുന്ന ഭാവിയിലെ ഒരു റൂളിനെതിരായ
പ്രതിരോധം). രണ്ട് ഉപഭോക്താക്കൾ ഇതിനെ വിളിക്കുന്നു:

- **സ്ഥിരത** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  പാസ്ത്രൂ-പ്രൊവൈഡറിന്റെ **ഓരോ മോഡലിനുമുള്ള** ലോക്കൗട്ട്
  ബ്രാഞ്ചിലേക്ക് പോകുന്നതിനുപകരം (agentrouter-ന് `passthroughModels: true` ആണ് → `hasPerModelQuota()`
  `true` നൽകുന്നു), ഇത് ഒരു **താൽക്കാലിക കണക്ഷൻ കൂൾഡൗൺ** പ്രയോഗിക്കുന്നു —
  `testStatus: "unavailable"` + `rateLimitedUntil`; ഒരിക്കലും ഒരു അന്തിമ സ്റ്റാറ്റസ്
  (`credits_exhausted`/`banned`/`expired`) നൽകുന്നില്ല — അതിനാൽ കൂൾഡൗൺ കാലാവധി
  കഴിയുമ്പോൾ, മാനുവൽ ക്രെഡൻഷ്യൽ റീസെറ്റ് ആവശ്യമില്ലാതെ കണക്ഷൻ സ്വയം വീണ്ടെടുക്കുന്നു.
  `disableCooling: true` ഉള്ള കണക്ഷനുകൾക്ക് ഇത് ഒഴിവാക്കുന്നു (#2997): പകരം ആ ഓപ്റ്റ്-ഔട്ട്
  ഓരോ മോഡലിനുമുള്ള ലോക്കൗട്ടിലേക്ക് കടക്കുന്നു (രേഖപ്പെടുത്തിയ ഒരു വിട്ടുവീഴ്ച —
  ബ്രാഞ്ചിന് മുകളിലുള്ള കോഡ് കമന്റ് കാണുക).
- **ഒരേ അഭ്യർത്ഥനയിലെ കോംബോ റൂട്ടിംഗ്** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ഇതേ ഗാർഡ്, കണക്ഷനെ
  `${provider}:${connectionId}` കീ ഉപയോഗിച്ച് ഇൻ-മെമ്മറി `exhaustedConnections` സെറ്റിൽ
  അടയാളപ്പെടുത്തുന്നു. സ്വന്തം ടാർഗറ്റ് ഒബ്ജക്റ്റിൽ _കൃത്യമായ അതേ `connectionId` ഇതിനകം ഉള്ള_
  ശേഷിക്കുന്ന ഒരു SAME-REQUEST ടാർഗറ്റിനെ മാത്രമാണ് ഇത് ഒഴിവാക്കുന്നത്
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` എന്നത് `exhaustedConnections` ലുക്കപ്പിന് മുമ്പ്) — സഹോദര ടാർഗറ്റുകൾക്ക്
  അവരുടേതായി പിൻ ചെയ്ത `connectionId` ഇല്ലാത്തതും, റെസ്പോൺസിന്റെ
  `X-OmniRoute-Selected-Connection-Id` ഹെഡറിൽനിന്ന് ഓരോ ഡിസ്പാച്ചിലും മാത്രം ഒന്ന്
  പരിഹരിക്കപ്പെടുന്നതുമായ ഒരു സാധാരണ മോഡൽ-ലിസ്റ്റ് കോംബോയ്ക്ക് ആ കീ പൊരുത്തം ഒരിക്കലും
  സംഭവിക്കില്ല. ആ പൊതുവായ സാഹചര്യത്തിൽ, ശേഷിക്കുന്ന ഒരു ലെഗ് ഇപ്പോൾ തീർന്ന അക്കൗണ്ട്
  വീണ്ടും ഉപയോഗിക്കുന്നതിനെതിരെയുള്ള യഥാർഥ സംരക്ഷണം ഈ സെറ്റ് അല്ല — അത് മുകളിലെ
  സ്ഥിരതാ ലെയറും (കണക്ഷന്റെ `rateLimitedUntil` ഇപ്പോൾ ഭാവിയിലാണ്), പരാജയത്തിനായി
  `transientRateLimitedProviders` അടിച്ചമർത്തുന്ന ഇതേ ഗാർഡും ചേർന്നുള്ളതാണ്
  ("രണ്ട്-ഘട്ട രൂപകൽപ്പന"യും `targetExhaustion.ts`-ലെ
  `isAgentrouterConnectionQuotaScope` ബ്രാഞ്ചിലെ കോഡ് കമന്റും കാണുക): ആ സെറ്റ്
  അടയാളപ്പെടുത്താതെ വിട്ടാൽ, പ്രൊവൈഡറിന്റെ ശേഷിക്കുന്ന ലെഗുകൾക്കായി `combo.ts`-ലെ
  `allowRateLimitedConnection` ഫോഴ്സ്-അലോ
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) സജീവമാകില്ല; അതിനാൽ
  ക്രെഡൻഷ്യൽ തിരഞ്ഞെടുപ്പിലെ `rateLimitedUntil` ഫിൽട്ടർ
  (`src/sse/services/auth.ts:1238`) സാധാരണപോലെ മാനിക്കപ്പെടുകയും, ശേഷിക്കുന്ന ലെഗ്
  മറ്റൊരു, ഇപ്പോഴും യോഗ്യമായ agentrouter കണക്ഷൻ തിരഞ്ഞെടുക്കുകയോ ലഭ്യമായ
  ക്രെഡൻഷ്യലുകളില്ലാത്തതിനാൽ പരാജയപ്പെടുകയോ ചെയ്യും — ഈ ബ്രാഞ്ച് ഇപ്പോൾ കൂൾഡൗൺ
  ചെയ്ത കണക്ഷനിലേക്ക് അത് നിർബന്ധിച്ച് വീണ്ടും കടക്കില്ല.

### രണ്ട്-ഘട്ട രൂപകൽപ്പന: സ്റ്റാറ്റസ് പുനർപ്രസ്താവനം, തുടർന്ന് വർഗ്ഗീകരണം

സ്റ്റാറ്റസ് പുനർപ്രസ്താവന (`upstreamStatusRestatement.ts`)യും പ്രൊവൈഡർ
വർഗ്ഗീകരണ നിയമങ്ങളും (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) പ്രൊവൈഡർ ഐഡിയും ടെക്സ്റ്റ് മാർക്കറുകളും കീകളായി ഉപയോഗിക്കുന്ന
വേറിട്ട രജിസ്ട്രികളാണ്; എന്നാൽ അവ വ്യത്യസ്ത ഇടങ്ങളിൽ പ്രവർത്തിക്കുകയും വ്യത്യസ്ത
ലക്ഷ്യങ്ങൾ നിറവേറ്റുകയും ചെയ്യുന്നു: പുനർപ്രസ്താവന `chatCore.ts`-ൽ തുടക്കത്തിൽത്തന്നെ
HTTP സ്റ്റാറ്റസ് തിരുത്തുന്നു; വർഗ്ഗീകരണ നിയമങ്ങൾ `checkFallbackError()`-നുള്ളിൽ
(`open-sse/services/accountFallback.ts`) ഫാൾബാക്ക് `reason`-ഉം ലോക്ക് `scope`-ഉം
(`model` / `provider` / `connection`) തിരഞ്ഞെടുക്കുന്നു.

`providerErrorRules.ts`-ലെ `FULL_TEXT_RULE_PROVIDERS` അലൗലിസ്റ്റിൽ ഉൾപ്പെട്ട
പ്രൊവൈഡറുകൾക്കായി മാത്രമാണ് വർഗ്ഗീകരണ നിയമങ്ങൾക്ക് പൂർണ്ണ എറർ **ടെക്സ്റ്റ്**
(ഉദാഹരണത്തിന് `额度不足` പോലുള്ള ബോഡി മാർക്കറുകൾ പൊരുത്തപ്പെടുത്താൻ ആവശ്യമാണ്)
കാണാനാകുന്നത് — നിലവിൽ `"agentrouter"` മാത്രം. മറ്റെല്ലാ **ബിൽറ്റ്-ഇൻ കാറ്റലോഗ്**
പ്രൊവൈഡറുകൾക്കും, `checkFallbackError` എന്നത് `getProviderErrorRuleMatch`-ന്
ഘടനാബദ്ധമായ എറർ (`{code, type}`) മാത്രം കൈമാറുന്നു; ഹെഡർ/സ്റ്റാറ്റസ്/കോഡ് അടിസ്ഥാനമാക്കിയുള്ള
നിയമങ്ങൾക്ക് ഇത് മതിയെങ്കിലും ബോഡി-ടെക്സ്റ്റ് മാർക്കറുകൾ അതിന് കാണാനാവില്ല.
`resolveRuleMatchBody()` ഹെൽപ്പർ ഈ തിരഞ്ഞെടുപ്പ് നടത്തുന്നു: അലൗലിസ്റ്റിലുള്ള
പ്രൊവൈഡറുകൾക്ക് പൂർണ്ണ എറർ ടെക്സ്റ്റും അല്ലാത്തവർക്ക് ഘടനാബദ്ധമായ എററും.
`FULL_TEXT_RULE_PROVIDERS`-ലേക്ക് ഒരു **ബിൽറ്റ്-ഇൻ** പ്രൊവൈഡറെ ചേർക്കുന്നത്
വ്യക്തമായ ഓരോ-പ്രൊവൈഡർ ഓപ്റ്റ്-ഇൻ ആണ് — ലിസ്റ്റിൽ ഇല്ലാത്ത എല്ലാ പ്രൊവൈഡറുകളുടെയും
ഡിഫോൾട്ട് പാത ബൈറ്റ്-ഫോർ-ബൈറ്റ് മാറ്റമില്ലാതെ നിലനിർത്താനാണ് ഇത് ഉള്ളത്.

ഒരു നിയമത്തിന്റെ `scope` (`model` / `provider` / `connection`) എന്നത്
`FULL_TEXT_RULE_PROVIDERS`-ൽനിന്ന് വേറിട്ട ഓപ്റ്റ്-ഇൻ ആണ്: `checkFallbackError`
അതിനെ `fallbackResult.ruleScope` ആയി മാത്രമാണ് പുറത്തുകൊണ്ടുവരുന്നത്; അതേ ഫയലിലെ
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` അലൗലിസ്റ്റിലുള്ള പ്രൊവൈഡറുകൾക്കായി മാത്രമേ
ഡൗൺസ്ട്രീം ഉപഭോക്താക്കൾ അതിനെ വിവരദായക ലേബലിന് അപ്പുറം മറ്റെന്തെങ്കിലും ആയി
മാനിക്കൂ (`honorsRuleLockScope()` വഴി ഗേറ്റ് ചെയ്യുന്നു — ഇന്ന് `"agentrouter"`
മാത്രം). ഒരു പ്രൊവൈഡർ ആ അലൗലിസ്റ്റിൽ ഉൾപ്പെട്ടുകഴിഞ്ഞാൽ `scope: "connection"`
പൊരുത്തം യഥാർഥത്തിൽ എന്താണ് ചെയ്യുന്നതെന്ന് അറിയാൻ മുകളിലെ "പുനർപ്രസ്താവിച്ച ക്വോട്ട
എററുകൾ" കാണുക.

**#11104 — ഓപ്പറേറ്റർ പ്രഖ്യാപിച്ച നിയമങ്ങൾ രണ്ട് അലൗലിസ്റ്റുകളെയും മറികടക്കുന്നു.**
ഒരു ഓപ്പറേറ്റർക്ക് ഈ ഫയൽ എഡിറ്റ് ചെയ്യാതെ, റൺടൈമിൽ `settings.providerErrorRules`
വഴി ഓരോ പ്രൊവൈഡറിനുമുള്ള നിയമം പ്രഖ്യാപിക്കാം
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`).
**ബിൽറ്റ്-ഇൻ കാറ്റലോഗ് നിയമങ്ങളുടെ** ഡിഫോൾട്ട് പെരുമാറ്റം സംരക്ഷിക്കാൻ ഉദ്ദേശിച്ചിട്ടുള്ള
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` അലൗലിസ്റ്റുകൾക്ക്
പിന്നിൽ ഒരു ഓപ്പറേറ്റർ നിയമം ഗേറ്റ് ചെയ്യുന്നത്, അവിടെ ഇതിനകം ലിസ്റ്റ് ചെയ്തിട്ടുള്ളവ
ഒഴികെയുള്ള എല്ലാ പ്രൊവൈഡറുകൾക്കും സെറ്റിങ്സ് സംവിധാനം പ്രവർത്തനരഹിതമാക്കും;
കാരണം നിയമം പ്രഖ്യാപിക്കുന്നതുതന്നെ ഓപ്പറേറ്ററുടെ വ്യക്തമായ ഓപ്റ്റ്-ഇൻ ആണ്.
`resolveRuleMatchBody()`-ഉം `honorsRuleLockScope()`-ഉം ആദ്യം
`hasOperatorRuleForProvider()` പരിശോധിക്കുന്നു: ഒരു ഓപ്പറേറ്റർ നിയമമുള്ള പ്രൊവൈഡർക്ക്,
രണ്ട് അലൗലിസ്റ്റുകളിലേതിലെങ്കിലും അതും ഉൾപ്പെട്ടിട്ടുണ്ടോ എന്നത് പരിഗണിക്കാതെതന്നെ,
റോ എറർ ടെക്സ്റ്റ് ലഭിക്കുകയും അതിന്റെ പ്രഖ്യാപിത `scope` മാനിക്കപ്പെടുകയും ചെയ്യും.

**അറിയപ്പെടുന്ന വിടവ് — HTTP 400-നായി `providerRuleRegistry` ഒരിക്കലും
പരിശോധിക്കപ്പെടുന്നില്ല.** `checkFallbackError`-ന്റെ `BAD_REQUEST` ബ്രാഞ്ച് സ്റ്റാറ്റസ്
400-നെ പൂർണ്ണമായും അതിന്റെ സ്വന്തം പാറ്റേൺ അറേകളിലൂടെ
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, തുടങ്ങിയവ
`accountFallback.ts`-ൽ) വർഗ്ഗീകരിക്കുകയും, അതിന് മുകളിലുള്ള
`configuredRule`/`getProviderErrorRuleMatch` ബ്രാഞ്ചിൽ എത്തുന്നതിന് മുമ്പ് റിട്ടേൺ
ചെയ്യുകയും ചെയ്യുന്നു. `status: 400` ഉള്ള ഒരു ബിൽറ്റ്-ഇൻ കാറ്റലോഗ് നിയമം
(അല്ലെങ്കിൽ ഓപ്പറേറ്റർ നിയമം) സിന്റാക്റ്റിക്കായി സാധുവാണെങ്കിലും ഒരിക്കലും
പ്രവർത്തിക്കില്ല. നിലവിൽ ഒരു നിയമവും 400 ലക്ഷ്യമിടുന്നില്ല, അതിനാൽ പ്രൊഡക്ഷനിലെ
ഒന്നിനെയും ഇത് ബാധിക്കുന്നില്ല — എന്നാൽ ഭാവിയിലെ ഒരു 400 നിയമത്തിന് ആദ്യം ഈ
ബ്രാഞ്ചിൽ മാറ്റം വരുത്തേണ്ടിവരും; അത് ഒരു നിയമം ചേർക്കുന്നതിനേക്കാൾ വലിയ മാറ്റമാണ്
(പാറ്റേൺ-അറേ പെരുമാറ്റത്തെ ഇതിനകം ആശ്രയിക്കുന്ന എല്ലാ പ്രൊവൈഡറുകൾക്കുമായി ഇത് 400-നെ
വീണ്ടും വർഗ്ഗീകരിക്കുന്നു), കൂടാതെ ഒരൊറ്റ പ്രൊവൈഡർ നിയമം ചേർക്കുന്നതിന്റെ
പരിധിക്ക് പുറത്തുമാണ്.

### പുതിയ quota-മിസ്സ്റ്റേറ്റിംഗ് ഗേറ്റ്വേ ചേർക്കൽ

1. `statusRestatementRegistry`-യിൽ ഒരു റൂൾ അറേ രജിസ്റ്റർ ചെയ്യുക
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`
   പ്രൊവൈഡർ-നിർദ്ദിഷ്ടമായി സൂക്ഷിക്കുക; `CREDITS_EXHAUSTED_SIGNALS`-മായി
   (`open-sse/services/accountFallback.ts`) കൂട്ടിമുട്ടുന്ന പൊതുവായ ഇംഗ്ലീഷ്
   ഫ്രേസുകൾ ഒരിക്കലും പുനരുപയോഗിക്കരുത്.
2. ശരിയായ ലോക്ക് സ്കോപ്പ് തിരഞ്ഞെടുക്കാൻ ഓപ്ഷനലായി ക്ലാസിഫിക്കേഷൻ റൂളുകൾ
   `open-sse/config/providerErrorRules.ts`-യിൽ (`providerRuleRegistry`)
   രജിസ്റ്റർ ചെയ്യുക (അക്കൗണ്ട്-വൈഡ് quota-യ്ക്ക് `connection`,
   per-model പിഴവുകൾക്ക് `model`). ഈ ഘട്ടം പ്രൊഡക്ഷനിൽ പ്രാബല്യത്തിൽ വരുന്നത്
   മുഴുവൻ എറർ ടെക്സ്റ്റ് (body മാർക്കറുകൾ) ആവശ്യമുള്ള റൂളുകളുള്ള
   പ്രൊവൈഡർമാർക്ക് മാത്രമാണ്: പ്രൊവൈഡർ ഐഡി അതേ ഫയലിലെ
   `FULL_TEXT_RULE_PROVIDERS`-ൽ ചേർക്കുക — അല്ലെങ്കിൽ `checkFallbackError`
   റൂളിന് നൽകുന്നത് എല്ലായ്പ്പോഴും ഘടനാപരമായ `{code, type}` എറർ മാത്രമായിരിക്കും,
   body-text റൂൾ ലൈവ് ട്രാഫിക്കിൽ ഒരിക്കലും മാച്ച് ആകുകയില്ല. പൂർണ്ണമായും
   `status`/`headers` അടിസ്ഥാനമാക്കി മാച്ച് ആകുന്ന റൂളുകൾക്ക് (Opencode-ന്റെതോ
   Minimax-ന്റെതോ പോലെ) ഈ opt-in ആവശ്യമില്ല. പ്രത്യേകം, റൂൾ
   `scope: "connection"` പ്രഖ്യാപിക്കുകയും ഉദ്ദേശം യഥാർത്ഥ കണക്ഷൻ-വൈഡ് കൂൾഡൗൺ
   കൂടാതെ same-request കോംബോ സ്കിപ്പ് ആണെങ്കിൽ (വെറും ഇൻഫർമേഷണൽ ലേബലല്ല),
   പ്രൊവൈഡർ ഐഡി അതേ ഫയലിലെ `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ൽ ചേർക്കുക —
   `markAccountUnavailable()`-ലും (`src/sse/services/auth.ts`)
   `applyComboTargetExhaustion()`-ലും (`open-sse/services/combo/targetExhaustion.ts`)
   `isAgentrouterConnectionQuotaScope()`-ശൈലിയിലുള്ള ഉപഭോഗത്തെ നിയന്ത്രിക്കുന്നത്
   ഇതാണ്; ഇതില്ലാതെ `scope` `fallbackResult.ruleScope` വഴി ഒഴുകുമെങ്കിലും
   ഒന്നും അതനുസരിച്ച് പ്രവർത്തിക്കില്ല.
3. `tests/unit/upstream-status-restatement.test.ts`, `tests/unit/agentrouter-error-rules.test.ts`
   എന്നിവയ്ക്ക് സമാനമായി യൂണിറ്റ് ടെസ്റ്റുകൾ ചേർക്കുക (not-permanent /
   not-creditsExhausted ഗാർഡുകൾ ഉൾപ്പെടെ, കൂടാതെ — പ്രൊവൈഡർക്ക് allowlist
   ആവശ്യമാണെങ്കിൽ — `resolveRuleMatchBody()` ആ പ്രൊവൈഡർക്ക് മാത്രം മുഴുവൻ
   ടെക്സ്റ്റ് മടക്കിനൽകുന്നുവെന്ന് ഉറപ്പാക്കുന്ന ഒരു ടെസ്റ്റും).

`chatCore.ts`, `classifyError`, കോംബോ എന്നിവയിൽ മാറ്റങ്ങളൊന്നും ആവശ്യമില്ല.

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-ലുള്ള പ്രൊവൈഡർമാരെ (opencode കുടുംബം)
IP-bucketed അപ്സ്ട്രീം ആയി കണക്കാക്കുന്നു (opencode ഫ്രീ ടയർ
account-bucketed അല്ല, IP-bucketed ആണ് — #9611 കാണുക): status-429 ആയി
ക്ലാസിഫൈ ചെയ്ത `quota_exhausted` **അല്ലെങ്കിൽ** `rate_limit_exceeded`,
റൊട്ടേഷന് അവരെ പരീക്ഷിക്കുന്നതിന് മുമ്പ്, പരാജയപ്പെട്ട കണക്ഷന്റെ അവസാനമായി
അറിയപ്പെടുന്ന egress IP-യുമായി പൊരുത്തപ്പെടുന്ന എല്ലാ allowlisted-family
കണക്ഷനെയും കൂൾ ഡൗൺ ചെയ്യുന്നു — N-1 ഉറപ്പായ പരാജയ അപ്സ്ട്രീം കോളുകൾ
ഒഴിവാക്കിക്കൊണ്ട് (#10460/#10525-ന്റെ അതേ ആകൃതി). `rate_limit_exceeded`
ഉൾപ്പെടുത്തിയത് ബോധപൂർവമാണ്: `markAccountUnavailable` പാതയിൽ opencode-നിർദ്ദിഷ്ട
റൂളുകൾ ഒരിക്കലും മാച്ച് ആകുന്നില്ല (`checkFallbackError`-ലേക്ക് headers/body
നൽകുന്നില്ല, opencode `FULL_TEXT_RULE_PROVIDERS`-ൽ ഇല്ല), അതിനാൽ body-യിൽ
സബ്സ്ക്രിപ്ഷൻ-quota ടെക്സ്റ്റ് ഉള്ള ഒരു 429 ("monthly usage limit reached"),
`status_429` റൂളിൽ എത്തുന്നതിന് മുമ്പേ quota-text ഫോൾബാക്ക് വഴി
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h കൂൾഡൗൺ)
`quota_exhausted` ആയി ക്ലാസിഫൈ ചെയ്യപ്പെടുന്നു — അതേസമയം quota-text ഇല്ലാത്ത
ഒരു 429 (സാധാരണ rate limiting) `status_429` റൂൾ വഴി `rate_limit_exceeded`
ആയി ക്ലാസിഫൈ ചെയ്യപ്പെടുകയും IP കുടുംബത്തെ ഇപ്പോഴും കൂൾ ഡൗൺ ചെയ്യുകയും ചെയ്യുന്നു.
ഒരു allowlisted പ്രൊവൈഡർക്ക് IP-bucketed rate limit എന്നത് തീർന്നുപോയ quota-യുടെ
അതേ സിഗ്നലാണ്. യഥാർത്ഥ പരിമിതികൾ:

- **ബെസ്റ്റ്-എഫർട്ട്**: ലോക്ക് കണക്ഷന്റെ അവസാനം അറിയപ്പെട്ട `egress_ip`
  `proxy_logs`-ൽ നിന്ന് കണ്ടെത്തുന്നു (24 മണിക്കൂർ വിൻഡോ, സിംക്രണസ്, കാഷെ
  ഇല്ല). കോൾഡ് കാഷെ (egress IP ഒരിക്കലും പ്രോബ് ചെയ്തിട്ടില്ല) അല്ലെങ്കിൽ
  വരിയില്ല → പരാജയപ്പെട്ട കണക്ഷനെ ബ്രാഞ്ച് ഇപ്പോഴും കൂൾ ചെയ്യുന്നു
  (ഇന്നത്തെപ്പോലെ രേഖപ്പെടുത്തുന്നു), വെറും സിബ്ലിംഗൊന്നും ലോക്ക്
  ചെയ്യപ്പെടുന്നില്ല.
- **ഒരിക്കലും ടെർമിനൽ അല്ല**: കൂൾഡൗൺ പുതുക്കപ്പെടുന്ന ഒരു ക്വോട്ട വിൻഡോ
  ആണ് (`testStatus: "unavailable"`); ഒരു IP-ലെവൽ സിഗ്നലിൽ നിന്ന് സ്ഥായിയായ
  അവസ്ഥ ഒരിക്കലും ഉണ്ടാക്കുന്നില്ല. `disableCooling` കണക്ഷനുകൾ ബ്രാഞ്ച്
  പൂർണ്ണമായും ഒഴിവാക്കുന്നു.
- **അലോലിസ്റ്റ് ചെയ്ത കുടുംബത്തിന് ലോക്ക് ഗ്രാനുലാരിറ്റി മാറുന്നു**: ഇത് ഒരു
  സ്കോപ്പ് മാറ്റമാണ്, വെറും ഒരു സിബ്ലിംഗ് ഒപ്റ്റിമൈസേഷൻ മാത്രമല്ല. opencode ഒരു
  `passthroughModels` പ്രൊവൈഡർ ആയതിനാൽ, ഈ ബ്രാഞ്ചിന് മുൻപ് ഒരു 429 ഓരോ
  മോഡലിനും ലോക്ക്ഔട്ട് ഉണ്ടാക്കിയിരുന്നു; ഇപ്പോൾ അത് ഒരു കണക്ഷൻ കൂൾഡൗൺ
  ഉണ്ടാക്കുന്നു — സിബ്ലിംഗ് ഒന്നുംതന്നെയില്ലാതെ ഒരു കണക്ഷൻ മാത്രം ഓടിക്കുന്ന
  ഒപ്പറേറ്റർക്കും ഉൾപ്പെടെ. opencode റൂൾ ടേബിൾ ഇതിനകം ശരിയാണെന്ന് പ്രഖ്യാപിക്കുന്ന
  ഗ്രാനുലാരിറ്റി അതാണ് (`scope: "connection"`,
  `providerErrorRules.ts`), opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ൽ
  ഇല്ലാത്തതിനാൽ ഇതുവരെ ഒരിക്കലും പാലിക്കപ്പെട്ടിട്ടില്ല. ബ്രാഞ്ച് പരാജയപ്പെട്ട
  കണക്ഷന്റെ കൂൾഡൗണും `backoffLevel`-ഉം സ്വയം എഴുതുന്നു, കണക്ഷൻ-സ്കോപ്പുള്ള
  agentrouter ബ്രാഞ്ചിനെ അനുകരിച്ചുകൊണ്ട്, പിന്നെ തിരിച്ചുപോകുന്നു — ഓരോ-മോഡൽ
  ബ്ലോക്കും താഴെയുള്ള ജനറിക് പാതയും ഒരിക്കലും എത്തപ്പെടുന്നില്ല.
- **കോംബോ ഉൾപ്പെടുന്നു**: agentrouter ബ്രാഞ്ച് പോലെ, ഒരു കോംബോ കോളർ 429-ൽ
  പ്രയോഗിക്കുന്ന `persistUnavailableState`/`isCombo` ഡൗൺഗ്രേഡ് ഈ സ്കോപ്പ്
  ബോധപൂർവ്വം അവഗണിക്കുന്നു. ഓരോ-മോഡൽ ലോക്ക്ഔട്ട് ഈ സ്കോപ്പിന്റെ ദുർബലമായ
  രൂപമല്ല, അത് തെറ്റായ യൂണിറ്റാണ്: തീർന്നുപോയ IP-യെക്കുറിച്ച് അത് ഒന്നും
  പറയുന്നില്ല, അതിനാൽ കോംബോ റൊട്ടേഷൻ ഓരോ സിബ്ലിംഗിലും ഉറപ്പായ് പരാജയപ്പെടുന്ന
  ഒരു കോൾ വീതം ചെലവഴിച്ചുകൊണ്ടിരിക്കും.
- **സിബ്ലിംഗ് സുരക്ഷ**: ഇതിനകം ടെർമിനൽ ആയ (banned/credits_exhausted) ഒരു
  സിബ്ലിംഗിനെയോ, ഇതിനകം കൂടുതൽ ദൈർഘ്യമുള്ള കൂൾഡൗണിലുള്ള ഒരു സിബ്ലിംഗിനെയോ
  ഒരിക്കലും മുകളിൽ എഴുതുന്നില്ല.
- **എക്സ്ക്ലൂസീവ് അലോലിസ്റ്റ്**: `EGRESS_BUCKETED_LOCK_PROVIDERS`
  വികസിപ്പിക്കുന്നത് ഉടമയുടെ വ്യക്തമായ തീരുമാനമാണ്; ജനറിക് വയറിംഗ് ഇല്ല
  (pattern #10334/#10419). സിബ്ലിംഗ് ക്വറി അതിനെ ഒരു SQL ലിറ്ററൽ ആയി
  ആവർത്തിക്കുന്നതിന് പകരം അതേ അലോലിസ്റ്റിനെ ബൈൻഡ് ചെയ്യുന്നു, അതിനാൽ അതിന്റെ
  വികസനം ഒരു-വരി മാറ്റം ആയിത്തന്നെ നിൽക്കും.
- **Egress IP റൊട്ടേഷൻ, ഇരു ദിശകളിലും**: ലൂക്കപ്പ് വിൻഡോ (24 മണിക്കൂർ)
  egress-IP കാഷെ TTL-നേക്കാൾ (5 മിനിറ്റ്) വളരെ വലുതാണ്, അതിനാൽ "അവസാനം അറിഞ്ഞ
  IP" ചരിത്രമാണ്, നിലവിലെ അവസ്ഥയല്ല. ഒരു കണക്ഷന്റെ പ്രോക്സി വിൻഡോയ്ക്കുള്ളിൽ
  റൊട്ടേറ്റ് ആയിട്ടുണ്ടെങ്കിൽ, യഥാർത്ഥത്തിൽ പങ്കിടുന്ന ഒരു IP ലോക്കിന്
  **നഷ്ടപ്പെടാം** (രേഖപ്പെടുത്തിയ IP പുതിയതും തീരാത്തതുമാണ്) — സമമിതിയായി,
  തീർന്നുപോയ IP-യിൽ നിന്ന് അതിനുശേഷം റൊട്ടേറ്റ് ആയിപ്പോയ ഒരു സിബ്ലിംഗിനെ അത്
  **കൂൾ ചെയ്യുകയും ചെയ്യാം**. രണ്ടാമത്തെ അവസ്ഥ ആ സിബ്ലിംഗിന് ഒരു കൂൾഡൗൺ
  വിൻഡോയുടെ വില കൊടുക്കും; രണ്ടും ചരിത്രാധിഷ്ഠിത ലൂക്കപ്പിന്റെ അംഗീകൃത
  ബെസ്റ്റ്-എഫർട്ട് പരിമിതികളാണ്.
- **ചിലവ്**: `proxy_logs`-ന്റെ രണ്ട് പരിമിത സ്കാനുകൾ (`idx_pl_timestamp` വഴി
  വിൻഡോ-ഫിൽട്ടർ ചെയ്തവ), 429 ആവൃത്തിയിൽ മാത്രം. പുതിയ ഇൻഡക്സ് ഇല്ല (migration
  134 YAGNI). മിതമായ വലുപ്പമുള്ള ഒരു യഥാർത്ഥ-ട്രാഫിക് DB പകർപ്പിൽ അളന്നു;
  ഉയർന്ന-ത്രൂപുട്ടുള്ള ഒരു ഇൻസ്റ്റൻസിൽ അതേ വിൻഡോയിൽ അനുപാതത്തിൽ കൂടുതൽ വരികൾ
  ഉണ്ടാകും.

---

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
