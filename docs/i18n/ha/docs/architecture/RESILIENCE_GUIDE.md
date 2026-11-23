# Resilience Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute yana da hanyoyin juriya guda uku mabambanta amma masu alaƙa. Kowannensu yana da iyaka da manufa daban. A ware su yayin binciken matsalolin halayen routing.

![Samfurin juriya mai matakai 3](../diagrams/exported/resilience-3layers.svg)

> Tushe: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Mai Katse Da'irar Mai Samarwa

**Iyaka:** dukkan mai samarwa (misali, `glm`, `openai`, `anthropic`).

**Manufa:** dakatar da aika zirga-zirga zuwa mai samarwa da ke yawan samun gazawa a matakin upstream/sabis.

**Aiwatarwa:**

- Babban class: `src/shared/utils/circuitBreaker.ts`
- Haɗawa: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API na matsayi: `GET /api/monitoring/health`
- API na sake saiti: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Teburin DB: `domain_circuit_breakers`

**Matsayai:**

- `CLOSED` — an yarda da zirga-zirga ta al'ada
- `DEGRADED` — har yanzu ana yarda da zirga-zirga, amma ana bibiyar ƙaruwar gazawar mai samarwa; yana komawa `CLOSED` bayan samun isassun nasarori, bayan ingantaccen gwajin haɗi, ko bayan mafi tsawon lokacin riƙewar `OPEN` na nau'in gazawa na ƙarshe (ƙimar `cooldownByKind` ɗinsa, in babu ita sai `resetTimeout`, × `maxBackoffMultiplier`, aƙalla cooldown ɗaya) ba tare da sabuwar gazawa ba
- `OPEN` — an toshe mai samarwa na ɗan lokaci; combo routing yana tsallake shi
- `HALF_OPEN` — lokacin sake saiti ya ƙare; an yarda da buƙatar gwaji

**Tsoffin ƙimomin da za a iya saita su (`open-sse/config/constants.ts`, ana nuna su a Dashboard → Settings → Resilience):**

| Nau'i   | Yana zama degraded a | Yana buɗewa a | Lokacin sake saiti |
| ------- | -------------------- | ------------- | ------------------ |
| OAuth   | gazawa 5             | gazawa 8      | 60s                |
| API-key | gazawa 7             | gazawa 12     | 30s                |
| Local   | ana ƙirga shi        | gazawa 2      | 15s                |

`degradationThreshold` yana sarrafa lokacin da mai samarwa zai shiga `DEGRADED`; `failureThreshold` yana sarrafa lokacin da zai buɗe kuma a tsallake shi. Har yanzu ba a nuna bayanan martabar masu samarwa na Local a shafin saitunan Resilience ba.

**Lambobin kunnawa:** kawai matsayai na matakin mai samarwa `[408, 500, 502, 503, 504]`. KADA a kunna shi saboda kurakuran matakin asusu (mafi yawan 401/403/429 — waɗannan na cooldown ko lockout ne).

**Farfadowa mai jinkiri:** idan lokacin `OPEN` ya ƙare, `getStatus()`, `canExecute()`, `getRetryAfterMs()` suna sabunta matsayi zuwa `HALF_OPEN`. Waɗannan karatuttukan (da gazawa ta gaba) su ma suna mayar da tsohon `DEGRADED` zuwa `CLOSED`. Ba a buƙatar timer na bango.

---

### Cooldown na Mai Samarwa na Duniya na Zaɓi (ƙofar taga)

Mataki na huɗu, na **zaɓi** (`PROVIDER_COOLDOWN_ENABLED`, a kashe yake ta
tsohuwa) yana riƙe ƙwaƙwalwar masu samarwa da ke gazawa tsakanin buƙatu a
`open-sse/services/providerCooldownTracker.ts`, kuma combo target
resolution yana duba shi domin kada buƙatun combo masu jere su ci gaba da sake bin mai samarwa da ya
gaza yanzu. Shigarwar matakin mai samarwa suna bin ƙofar taga ta `PROVIDER_PROFILES`:

| Bayanin martaba | yana kunnawa bayan (`providerFailureThreshold`) | a cikin (`providerFailureWindowMs`) | yana yin cooldown na (`providerCooldownMs`) |
| --------------- | ----------------------------------------------: | ----------------------------------: | ------------------------------------------: |
| OAuth           |                                            `10` |                             `15min` |                                      `5min` |
| API key         |                                            `15` |                             `30min` |                                     `10min` |

Idan bai kai threshold ba, **ba** a ɗaukar mai samarwa a matsayin yana cooldown; nasara tana share
tagar. Shigarwar matakin haɗi (`provider:connectionId`) suna ci gaba da amfani da
exponential backoff na `minRetryCooldownMs → maxRetryCooldownMs`. Sauye-sauye:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Kariyar regression: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Lokacin Jira Kafin Sake Haɗawa

**Iyaka:** haɗin mai samarwa/asusu/maɓalli guda ɗaya.

**Manufa:** tsallake maɓalli mara kyau guda ɗaya yayin da sauran haɗe-haɗen mai samarwar ɗaya suke ci gaba da aiki.

**Aiwatarwa:**

- Sanya alamar ba ya samuwa: `src/sse/services/auth.ts::markAccountUnavailable()`
- Zaɓi: `getProviderCredentials*` a cikin wannan fayil ɗin
- Lissafin lokacin jira: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Saituna: `src/lib/resilience/settings.ts`

**Filaye ga kowane haɗi:**

- `rateLimitedUntil` — tambarin lokaci har sai lokacin jira ya ƙare
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ƙididdigar jinkirin sake gwadawa mai ƙaruwa ninki-ninki

**Tsoffin lokutan jira:**

- Tushen OAuth: 5s
- Tushen API-key: 3s
- API-key 429: yana fifita `Retry-After` na uwar-garken sama/kanun sake saiti/rubutun sake saiti da za a iya fassara
- Jinkirin sake gwadawa: `baseCooldownMs * 2 ** failureIndex`

**Kariyar hana turmutsutsun buƙatu:** tana hana gazawa masu faruwa lokaci guda tsawaita lokacin jira fiye da kima ko ƙara `backoffLevel` sau biyu.

**Kurakuran 429 na iyakar haɗin lokaci guda ba sa hawa matakan jinkirin sake gwadawa.** `429` wanda jikinsa ya bayar da rahoton iyakar haɗin lokaci guda ("buƙatu masu yawa a lokaci guda", "iyakar haɗin lokaci guda", "iyakar buƙatu masu tafiya a layi ɗaya", GLM `并发数过高`) yana nufin asusun yana lafiya amma yana aiki da yawa.
`checkFallbackError()` yana dawo da dalilin `concurrency_limited`: koma zuwa haɗi na gaba yanzu, sanya wannan cikin tsayayyen lokacin jira na `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ko shawarar sake gwadawa ta uwar-garken sama, bar `backoffLevel` ba tare da canji ba, sannan saita `skipProviderBreaker`.
Jikin da ya bayyana ƙayyadadden kason amfani kai tsaye har yanzu yana da fifiko, saboda haka jikin da ya kuma dace da tsarin ƙayyadadden kason amfani zai ci gaba da samun hukuncin ƙayyadadden kason amfani. Ganowa: `looksLikeConcurrencyLimit()` a cikin `src/shared/utils/classify429.ts`; hukunci: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` na mai katsewa) bai canza ba kuma har yanzu yana karanta `rate_limit` ga waɗannan jikkuna.

**Tsayawar abun cikin rafi ba ta sanya asusun cikin lokacin jira.** Lokacin da mai sa ido kan tsayawar abun ciki (`open-sse/utils/streamHandler.ts`) ya daina jiran rafi wanda bai aika da wani fitarwar samfurin ba cikin lokaci, `markAccountUnavailable()` yana rubuta kuskuren a kan haɗin amma ba ya saita lokacin jira: tsayawar ta shafi wannan buƙatar ne, kuma galibi wani dogon zagayen tunani ne wanda bai fitar da komai ba tukuna. Masu gudanarwa za su iya zaɓar sake kunna wannan ta `resilienceSettings.streamStallCooldown.enabled` (tsoho `false`).

**Firam ɗin tunani suna sake fara kasafin lokacin tsayawar abun ciki.** Samfurin tunani zai iya yin tunani na mintuna kafin alamar rubutu ta farko da za a iya gani: Claude yana watsa firam ɗin `thinking_delta` waɗanda rubutun tunaninsu zai iya zama fanko, kuma Responses API yana watsa abu na tunani ɗaya bayan wani. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) yana gane waɗannan firam ɗin, kuma mai sa ido yana sake fara kasafin lokacinsa a kan kowannensu maimakon soke zagayen. Har yanzu ba fitarwar samfurin ba ne, don haka zagayen da ya ƙare da tunani kawai har yanzu ana bayar da rahotonsa a matsayin fanko, kuma zagayen da ya daina tunani sannan ya riƙa aika bugun-zuciya kawai har yanzu zai kunna mai sa ido.

Firam ɗin binary na Kiro na `reasoningContentEvent` masu sa hannu wanda ba fanko ba suna kiyaye wannan aikin tunani ta cikin mai aiwatarwa a matsayin delta na `reasoning_content` mai fanko. Ba a tura sa hannun gaba. Metadata, firam ɗin da ba su cika ba da sa hannun fanko ba sa sake fara kasafin lokacin abun ciki; keɓantaccen iyakar lokacin rafi mai aiki da sokewar abokin hulɗa har yanzu suna aiki (`open-sse/executors/kiro/reasoning.ts`).

**Yanayin ƙarshe (BA lokutan jira BA):**

- `banned` — ana saita shi ta hanyar gano haramtacciyar kalma/asusun da aka haramta (duba [BAN_DETECTION](../security/BAN_DETECTION.md)), da kuma ƙin buƙata guda uku a jere daga uwar-garken sama (`request_rejected`, misali Anthropic OAuth 403 "Ba a yarda da buƙatar ba" — `open-sse/services/requestRejectedStreak.ts`); ƙin buƙata guda ɗaya kawai yana sanya haɗin cikin lokacin jira
- `expired` (yana sauyawa zuwa yanayin ƙarshe bayan iyakantattun sake gwadawa — `EXPIRED_RETRY_MAX = 3` tare da jinkirin sake gwadawa mai ƙaruwa ninki-ninki — domin kurakuran OAuth na wucin gadi su iya gyara kansu kafin a kashe asusun na dindindin)
- `credits_exhausted`

Waɗannan suna dawwama har sai bayanan shaidar shiga sun canza ko mai gudanarwa ya sake saita su. Kada a maye gurbin yanayin ƙarshe da yanayin lokacin jira na wucin gadi.

**Farfadowa a lokacin buƙata:** idan `rateLimitedUntil` ya wuce, haɗin zai sake cancantar amfani. Bayan amfani cikin nasara, `clearAccountError()` yana share duk filayen kuskure.

### Katangar amfani ta Claude OAuth: layin da ke da ƙaramin fifiko + sake saita iyakar zaman

**Iyaka:** haɗin biyan kuɗin Claude (OAuth) guda ɗaya. Duk fasalolin biyu ana **zaɓar kunna su ne ga kowane haɗi** (Gyara haɗi → sashen Claude → `lowPriorityMode` / `autoLimitReset` a cikin `providerSpecificData`, dukkansu a kashe ne ta tsohuwa) kuma suna kwaikwayon umarnin `/low-priority` da `/limit-reset` na Claude Code (an samo yarjejeniyar sadarwa daga Claude Code 2.1.263).

**Aiwatarwa:**

- Injin yanayi + rarraba martani: `open-sse/services/claudeLowPriority.ts`
- Abokin hulɗar matsayin sake saiti/karɓar haƙƙi: `open-sse/services/claudeLimitReset.ts`
- Maƙallin mai aiwatarwa (shigar da kanun bayanai + sake gwadawa da asusun ɗaya): `open-sse/executors/base.ts::execute()`
- Adana zaɓin kunnawa: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Abin kunnawa:** katangar amfani ta awa 5 — `429` wanda kanun bayanansa suke ɗauke da `anthropic-ratelimit-unified-status: rejected` kuma, idan asusun ya cancanta, `anthropic-ratelimit-unified-slow-offer: treatment`. Ba a aika komai kafin wannan 429 na katanga na farko; 429 na cunkoson lokaci guda wanda ba shi da haɗaɗɗun kanun bayanai yana bi ta hanyar lokacin jira ta al'ada.

**Layi mai ƙaramin fifiko** (`lowPriorityMode`):

- A kan 429 na bango, mai aiwatarwa yana karɓar tayin kuma nan take ya sake gwada **asusun guda**
  tare da `anthropic-usage-limit: slow`; layin yana ci gaba da aiki har zuwa lokacin
  `anthropic-ratelimit-unified-reset` da aka sanar (+60s na ƙarin lokaci), kuma kowace buƙata a cikin wannan taga tana ɗauke da
  header ɗin. 429 ɗin da aka katse ba ya isa `handleChatCore`, don haka ba a saka haɗin cikin
  **cooldown** kuma ba a sauya shi zuwa wani haɗin daban.
- `anthropic-ratelimit-unified-slow-status` a martani na gaba: `active` / `not_needed`
  suna ci gaba da riƙe layin; `slot_busy` (429) ko `529` suna jira gwargwadon
  `anthropic-ratelimit-unified-slow-retry-after` na sabar (tsoho 20s, iyakance zuwa 5–600s, ±30% jitter)
  sannan su sake gwadawa, cikin iyakar `anthropic-ratelimit-unified-slow-max-wait` (tsoho minti 20, iyakance
  zuwa minti 1–awa 6) — bayan wannan layin zai ƙare, kuma lokacin hutawa na minti 10 zai hana sake karɓa. Ana kuma
  iyakance lokacin jira da abin da ya rage na timeout na fara-upstream na buƙatar kanta
  (`resolveFetchStartTimeout`, minti 10 ta tsohuwa) ban da tazarar 5 s: idan babu wannan iyaka,
  tsohuwar iyakar jira ta minti 20 za ta wuce tsawon rayuwar buƙatar, kuma za a katse baccin
  a tsakiyar jira, abin da zai fito da `TimeoutError` maimakon ƙarewar `max_wait` mai laushi + lokacin hutawa.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, sauyawar taga ta 5h, ko
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (wanda ke ƙare shi a matsayin
  `extra_usage` a kowane status, tun da ƙarin amfani na biya yanzu yana rufe bangon) suna ƙare layin; daga nan
  martanin ya bi hanyar cooldown ta yau da kullum. Ana tuna `budget_exhausted` har zuwa
  sake saitin kasafin da aka sanar (≤ kwanaki 8).
- Binciken bango yana gudana bayan sake-gwada-cikin-ƙoƙari na mai aiwatarwa da 400 ke haddasawa (gyaran
  context, clamps na thinking/effort, auto-learn na param), don haka 429 na bango da ke bayyana kawai a
  ɗaya daga cikin waɗannan sake-gwada har yanzu za a katse shi maimakon ya isa hanyar cooldown.
- State yana cikin memory na kowane haɗi (sake farawa yana haifar da ƙarin 429 na bango guda ɗaya don sake karɓa).

**Sake saitin iyakar zaman** (`autoLimitReset`, ana gwada shi kafin layin idan dukansu suna kunne):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → block na `juniper_tide`;
  idan `arm: "reset"` da `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` tare da
  `{ "program": "juniper_tide" }` (UUID na organization daga
  `providerSpecificData.organizationUUID`, bootstrap fallback).
- `result: reset|not_limited` → ana sake gwada buƙatar da cikakken sauri (ba tare da slow header ba).
  `already_used` / `not_offered` suna adana `next_available_at` (tsoho mako ɗaya); duk wata
  gazawa tana jinkirta sake-gwaji na minti 15. Sake saitin sau ɗaya ne a mako kuma har yanzu yana ƙididdiguwa cikin
  iyakar mako-mako.

Masu tsaron regression: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Dacewar zaman (#7274)

**Iyaka:** zaman client guda ɗaya (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) da aka ɗaure da haɗi guda ɗaya, ga **kowane** provider.

**Manufa:** riƙe agent mai zagaye da yawa (Claude Code, aider, custom agents) a kan asusu guda tsakanin buƙatu, don rage asarar context tsakanin asusu da maimaitattun 429 na fara-sanyi a kan providers masu state na zaman na kowane asusu.

**Aiwatarwa:**

- Tantance TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Zaɓi/ƙirƙirar pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ciro header (na gama-gari, kowane provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Teburin pin da aka adana: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Saiti: `sessionAffinityTtlMs` (TTL na gama-gari cikin ms, `0` yana kashe shi) — `src/lib/db/settings.ts`. An sauya sunansa daga `codexSessionAffinityTtlMs` na Codex kaɗai ta migration `124_generic_session_affinity_ttl.sql`, wanda ke ɗaukar duk wani Codex TTL da aka riga aka saita ya zama sabon tsoho.

Kafin #7274, `resolveSessionAffinityTtlMs()` yana fita nan take da `0` ga kowane provider sai `codex`, don haka saitin TTL (da headers na zaman) ba su da tasiri a ko'ina dabam, duk da cewa tsarin pinning da ciro header sun riga sun kasance masu zaman kansu daga provider. Gyaran ya cire wannan early-return; yanzu TTL yana aiki iri ɗaya ga kowane provider da zarar an saita shi gaba ɗaya sama da `0`.

Ba a taɓa tura headers uku na dacewar zaman zuwa upstream — executors suna gina nasu upstream headers daga tushe maimakon wuce headers na client kai tsaye, don haka wannan yana ci gaba da zama internal correlation id kawai.

### Leases na musamman na haɗin zaman da ake sarrafawa

**Iyaka:** HTTP client/zaman da ake sarrafawa guda ɗaya mai aiki yana mallakar haɗin OmniRoute guda ɗaya da ya cancanta.

**Manufa:** samar da mallakar haɗi na musamman mai ɗorewa ga clients da ke buƙatar shingen routing
mai tsauri tsakanin buƙatu. Wannan ya bambanta da dacewar zaman, wadda fifiko ne mai sassauci na ci gaba:
lease na musamman yana adana lifecycle state a SQLite, yana tilasta keɓantuwar active-owner da
active-connection a matakin gama-gari, kuma yana ƙin stale generation kafin dispatch zuwa provider.

Ana kunna fasalin ne bisa zaɓi ga kowane API key. Managed key dole ne ya kasance da scope na `lease:exclusive` da
jerin `allowedConnections` bayyananne wanda ba fanko ba. Kowane HTTP client zai iya amfani da lifecycle endpoint; ba a
buƙatar sunan client, user-agent, provider, hanyar OAuth, ko model. Lease ɗin yana mallakar haɗi,
ba model ba, don haka sauya model yana ci gaba da riƙe binding matuƙar haɗin yana nan a matsayin wanda ya
cancanta. Ƙa'idodin model, quota, health, cooldown, da allowlist na yau da kullum suna ci gaba da zama masu iko, kuma za su iya
mayar da wannan generation ɗin zuwa wani haɗi kyauta da ya cancanta.

Tsarin rayuwar yana amfani da `POST /api/v1/session-leases` tare da ayyukan JSON na `acquire`, `renew`, da `release`.
Buƙatun inference masu sarrafawa suna gabatar da ƙimar `X-OmniRoute-Lease-Owner` da ba a bayyana ma’anarta ba da kuma ainihin
`X-OmniRoute-Lease-Generation`. Mai mallakar yana amfani da `vlo_` sannan haruffan base64url guda 43; hash ɗinsa na
SHA-256 kaɗai ake adanawa. Duk wani shingen aikawa na ƙarshe kuma yana ɗaure ID na maɓallin API da aka tantance da
ID na haɗin da ke aiki. Ana cire kanun sarrafa lease daga rajistan ayyuka, hotunan buƙata da aka adana, da
kanun mai aiwatarwa na upstream.

Idan tsarin zaɓin hanya na yau da kullum yana da ’yan takara masu sarrafawa da suka cancanta amma duk wani ɗan takara
da yake samuwa yana ƙarƙashin lease mai aiki na wani, OmniRoute zai mayar da HTTP `429`, lambar lease-capacity-unavailable,
yanayin jira-don-samuwa, da `Retry-After` mai iyaka wanda aka samo daga lokacin ƙarewa mafi kusa da ya dace.
Rashin cancantar kowa a tsarin yau da kullum ba takaddamar lease ba ce, kuma yana ci gaba da amfani da ma’anonin kuskuren zaɓin hanya da ake da su.

Hanyoyin da ke da alaƙa suna ci gaba da kasancewa dabam:

- Mamayar zaman OAuth rabawa ce mai sassauci ta cikin tsari guda don asusun OAuth.
- Semaphore na asusu suna ba da izinin gudanar da buƙatu a lokaci guda kuma suna ƙarewa idan buƙata ta kammala.
- Lease na zaman sarrafawa na keɓantacce mallakar tsarin rayuwa ne mai ɗorewa tare da shingen generation.

---

## 3. Kulle Samfuri

**Iyaka:** haɗin provider + connection + model.

**Iyar maɓalli bisa matsayi:** matsayin da ya gaza ne ke tantance maɓallin da za a rubuta kullewa
a kai (`resolveLockoutScope()` a cikin `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — alamar ƙayyadadden kaso ko izinin amfani — suna kulle **rukunin ƙayyadadden kaso**:
  ga codex, dukkan iyakar `codex` / `spark` (kowane samfurin `gpt-5*` na
  connection ɗin), ga sauran providers kuwa `getQuotaScopedModelForProvider()`.
- `404` yana kulle samfurin kai tsaye (`getModelLockKey()` yana taƙaita `not_found`).
- Duk wani matsayi daban — gazawar jigila/server ta `5xx` da kuma
  `502` da OmniRoute da kansa ya ƙirƙira daga tabbatar da inganci — yana kulle **ainihin**
  haɗin provider/connection/model kawai. Mummunan stream a samfuri ɗaya ba shaida ba ce
  game da ƙayyadadden kason account; kafin wannan ƙa'idar, amsa mara komai guda ɗaya daga
  `codex/gpt-5.6-luna` tana cire kowane samfurin `gpt-5*` na wannan connection daga
  routing na minti 2–30 (yana ƙaruwa), alhali ba a taɓa ƙayyadadden kason nasa ba.
- Zaɓin `scope` da caller ya bayyana kai tsaye koyaushe shi ne ke da rinjaye (Antigravity yana tura `"exact"`).

**Manufa:** guje wa kashe connection gaba ɗaya alhali samfuri ɗaya kawai ne babu shi ko kuma ƙayyadadden kason sa ya yi iyaka.

**Misalai:**

- Providers masu ƙayyadadden kaso ga kowane samfuri da ke mayar da 429
- Providers na cikin gida da ke mayar da 404 saboda samfuri ɗaya da ya ɓace
- Gazawar izinin yanayi/samfuri da ta keɓanta ga provider (misali, yanayin Grok)

**Aiwatarwa:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard na Lokutan Dakatar da Samfuri (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Yana jera kulle-kulle masu aiki tare da: provider, connection, model, reason, expiresAt. Masu gudanarwa za su iya sake kunna samfuri da hannu daga katin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — jera kulle-kulle masu aiki
- `DELETE /api/resilience/model-cooldowns` — sake kunnawa da hannu. Body: `{provider, connection, model}`. Auth: management.

### Mai Kula da Lokutan Dakatarwa

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Shafi guda ɗaya ga kowane connection da aka cire daga routing saboda wani dalili na wucin gadi, maimakon
buɗe shafin kowane provider. Yana jera lokutan dakatarwar connection, kulle-kullen samfuri da matakan
ƙarshe, yana share su bisa kowane connection, ga waɗanda aka zaɓa, ko ga duk connections na wani provider,
kuma yana gyara ƙa'idodin lokacin dakatarwa da aka fi daidaitawa: `streamStallCooldown.enabled` da lokacin
dakatarwa na asali na `connectionCooldown` na OAuth / API-key da matsakaicin matakan backoff (ana adanawa ta
`PATCH /api/resilience`). Ana jera matakan ƙarshe (`banned`, `expired`, `credits_exhausted`) amma
ba a taɓa share su a nan.

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connections tare da matsayi, sauran lokacin dakatarwa,
  matakin backoff, nau'in kuskuren ƙarshe da kulle-kullen samfuri (babu credentials)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` ko
  `{all: true, provider?}`; yana mayar da `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI na saitunan kullewa + murmurewar raguwar gazawa bayan nasara (v3.8.23)

Kulle samfuri ya sauya daga hali mai lambar da aka kafa wanda yake aiki koyaushe zuwa fasali mai cikakken daidaitawa,
wanda sai an zaɓi a kunna shi, tare da katin saitunansa da kuma hanyar murmurewa mai gyara kanta.

**Katin saituna:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Wannan ya **bambanta** da `ModelCooldownsCard` na karantawa kawai da ke sama (wanda kawai
ke _jera_ kulle-kulle masu aiki) — sabon katin yana _daidaita sigogi_. Tsoffin ƙimomi
suna cikin `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Saiti                   | Tsohon ƙima                      | Ma'ana                                                                        |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Babban maɓalli — kulle samfuri **a kashe yake ta tsohuwa**.                   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Matsayin upstream da ake ƙirgawa a matsayin gazawa ta samfuri.                |
| `baseCooldownMs`        | `120_000` (120 s)                | Tsawon kullewa na farko saboda gazawar farko.                                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Iyakar lokacin dakatarwa bayan ƙaruwa.                                        |
| `maxBackoffSteps`       | `10`                             | Matsakaicin matakan ƙaruwa na exponential-backoff.                            |
| `useExponentialBackoff` | `true`                           | Ko gazawa mai maimaituwa za ta ƙara lokacin dakatarwa a tsari na exponential. |

Ana adana saituna ta ma'ajiyar saituna ta yau da kullum kuma ana tabbatar da ingancinsu ta
schema na saitunan resilience; katin yana sanya iyaka ga `baseCooldownMs`/`maxCooldownMs`
(tare da `maxCooldownMs ≥ baseCooldownMs`) da `maxBackoffSteps`.

**Murmurewar raguwar gazawa bayan nasara:** murmurewa **ba** ƙarewar agogo kaɗai ba ce. Amsa mai lafiya
tana rage adadin gazawar samfurin domin samfurin da ya murmure
a tsakiyar lokacin kada ya ci gaba da ƙaruwa (kuma a share shi) kafin agogonsa ya ƙare. Lokacin da combo target ya yi nasara,
`open-sse/services/combo.ts` yana kiran `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), wanda ke **raba** `failureCount` da aka adana
biyu (`Math.floor(failureCount / 2)`); idan ya kai `0`, ana share shigarwar kullewar
gaba ɗaya. Kishiyarsa `recordModelLockoutFailure()`
tana ƙara adadin (kuma tana ƙara lokacin dakatarwa) idan gazawa ta faru a cikin
lokacin ƙaruwa. Wannan raguwar gazawa bayan nasara ƙari ne ga ƙarewar agogo ta yau da kullum —
kowace hanya za ta iya sake kunna samfuri.

**Matsayi:** ana riƙe kulle-kulle **a cikin memory** (`Map`s na kowane process na
`ModelLockoutEntry` waɗanda aka yi musu key da `provider:connectionId:model`, kulle-kullen exact-scope kuma da
`provider:connectionId:exact:model`), ba a adana su a
DB — suna ɓacewa idan an sake farawa. Ana adana _saitunan_; amma _matsayin_ kullewa mai aiki na wucin gadi ne.

---

## 4. Sarrafa Buƙatun Lokaci Guda na Quota-Share (v3.8.36)

Asusun biyan kuɗi (GLM, MiniMax, da sauransu) sau da yawa suna karɓar buƙatu
~1–3 kacal a lokaci guda; wuce wannan yana jawo 429 da lokutan jira. Wannan ya fi
tsanani a haɗin **quota-share** (`qtSd/…`), inda maɓallan API da dama suke amfani
da asusun upstream guda ɗaya. Matakai uku suna hana cika asusun da ake rabawa da
buƙatu fiye da kima.

### Iyakar buƙatun lokaci guda ta kowace haɗi (`max_concurrent`)

Kowace haɗin mai samarwa na iya ayyana iyakar `max_concurrent`
(`provider_connections.max_concurrent`, ana saita ta a modal ɗin haɗi / API / DB).
Bar ta babu komai idan ba a son iyaka. Wannan shi ne saitin guda ɗaya da ke sarrafa
matakin jerantawa da ke ƙasa — saita shi zuwa ainihin ƙarfin buƙatun lokaci guda na
asusun (misali GLM ~1, MiniMax ~2).

### Iyakokin buƙatun lokaci guda na kowace ƙira (`modelConcurrency`)

Haɗi na iya kuma ayyana takamaiman iyakokin buƙatun lokaci guda na kowace ƙira
a cikin taswirar `rateLimitOverrides` ɗinsa:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Saita shi a modal ɗin haɗi (**Rate limit overrides → Per-model
concurrency caps**, `model=cap` ɗaya a kowane layi) ko ta
`PATCH /api/providers/[id]` da tsarin JSON iri ɗaya. Ma’anonin maɓallan:

- **Faɗin haɗi da takamaiman ƙira:** `maxConcurrent` ya ci gaba da zama iyakar
  haɗin gaba ɗaya da ake rabawa. Idan duka biyun sun shafi buƙata, ana samun izinin
  duka ƙofofin lokaci guda cikin haɗaɗɗiyar ƙofa guda
  (`global → provider → account → model`); iyaka mafi tsauri daga cikin waɗanda
  suka dace ita ce ke aiki.
- **Daidaitaccen dacewar maɓallin ƙira:** maɓallin shi ne igiyar ƙirar da ake
  miƙawa ga executor bayan warware hanyar turawa — yawanci ainihin upstream model id
  (`glm-5`), ba client-side `provider/model` alias ba (`zai/glm-5` ba ya
  dacewa da `glm-5`). Ƙimomin dole ne su zama tabbatattun lambobin cikakku na
  iyakar buƙatun lokaci guda.
- **Jerin jira na gida, babu ganowa:** buƙatun da suka wuce iyaka suna jira a
  gida bisa ƙa’idojin jerin jira/ƙarewar lokaci da ake da su (kurakuran karɓa masu
  nau’in `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ba ya gano ko
  hasashen manufofin upstream — yana aiwatar da ainihin iyakokin da mai gudanarwa
  ya saita. Cikar ƙofar ƙira ba ta taɓa kashe mai samarwa kuma ba ta taɓa haifar
  da kullewar ƙira ta dindindin; halayen upstream na 429/cooldown/fallback suna
  ci gaba da zama kariyar ƙarshe idan kuskure ya faru.
- **Faɗin kowace haɗi, kowace process:** iyakokin suna aiki ne ga kowace haɗin
  database kuma ana riƙe su a cikin memory, saboda haka haɗi biyu da suke sake
  amfani da upstream API key ɗaya ba sa daidaita aiki da juna.
- **Rashin saiti yana nufin babu canji:** barin taswirar gaba ɗaya (ko barin
  filin dashboard babu komai) ba ya ƙara ƙofar ƙira. Misalin saiti ba tare da
  tabbatar da wata iyakar gama-gari ta mai samarwa ba:

```text
glm-5=1
glm-4.7=3
```

### Jeranta buƙatun quota-share

Lokacin da tura quota-share ta nufi haɗin da ya ayyana tabbataccen
`max_concurrent`, ana jeranta buƙatun lokaci guda zuwa wannan **account** ta hanyar
semaphore na kowace haɗi (maɓalli `qsconn:<connectionId>`): buƙatun da suka wuce
iyaka suna **jira a cikin jerin jira** maimakon cika asusun da buƙatu. Tsarinsa
**fail-open** ne — cikakken jerin jira ko ƙarewar lokaci yana bari a ci gaba ba tare
da slot ba, maimakon ya ƙi buƙatar da za a iya turawa. Kunna ko kashe shi a
**Settings → Resilience → Quota-share per-connection concurrency**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, yana kunne ta tsohuwa).
Idan babu iyakar `max_concurrent`, halin ba ya canzawa.

> Ƙofar zaɓin hanyar quota-share (`selectQuotaShareTarget`, DRR + P2C) kanta
> **fail-open** ce kuma kawai tana _rage fifikon_ haɗin da ya kai iyaka — idan
> pool ɗin yana da haɗi guda ɗaya, ba za ta iya tilasta ƙaƙƙarfan iyaka ba, don
> haka wannan semaphore ne a zahiri yake daƙile ambaliyar buƙatun.

### Sake gwadawa mai la’akari da combo cooldown

Ga kowace dabarar combo (idan an kunna), buƙatar da za ta tabbatar da 429 saboda
ɗan gajeren cooldown na wucin gadi tana jira ya ƙare sannan a sake turawa maimakon
mayar da 429 — wannan ya haɗa da tagogin TPM/RPM na ajin Gemini (~60s retry-after)
a kan combo masu ƙira da yawa, misali duk maƙasudan combo mai ƙira 2 sun ci karo
da iyakar buƙatun kowace ƙira. `comboCooldownWait` (`enabled`, `maxWaitMs`,
`maxAttempts`, `budgetMs`) ne ke ƙayyade iyakarsa a **Settings → Resilience**.
Ba ya taɓa jira kan `quota_exhausted` (wanda yake kulle har tsakar dare) ko
dalilan auth/not-found.

Ƙofar guda ɗin tana kuma kula da yanayin kafin turawa (#16319): idan aka tsallake
kowace manufa ta combo kafin a yi kowane yunƙuri saboda ƙirarta tana cikin ɗan
gajeren kullewar wucin gadi, hanyar da ba ta yi yunƙuri ko ɗaya ba tana jira
kullewar ta ƙare a ƙarƙashin iyakoki iri ɗaya sannan ta sake turawa, maimakon ta
amsa da `503 ALL_TARGETS_SKIPPED` marar bayani. Idan ba a yarda da jira ba
(saboda an kai iyaka, an ƙare yawan yunƙuri ko budget, ko an kashe fasalin),
amsar ƙarshe tana haɓaka zuwa `429 rate_limit_error` mai ɗauke da `retry_after` /
`reset_at` daga lokacin ƙarewar kullewar wucin gadi mafi kusa; kulle-kullen quota,
auth da not-found suna ci gaba da mayar da 503 marar bayani.

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

## 5. Sarrafa Karɓar Buƙatu Zuwa Jerin Jira (v3.8.49 · issue #6593)

**Iyaka**: jerin jiran iyakar ƙima na gida na kowane provider+connection (`open-sse/services/rateLimitManager.ts`,
wanda Bottleneck ke tallafawa), mataki ɗaya a ƙasa da hanyoyi uku da ke sama.

**`maxWaitMs` yana iyakance jiran jerin gwano; `executionMaxWaitMs` yana iyakance aiwatarwa.**
An raba su biyun da gangan, kuma babu ɗayansu da ke ciyar da ɗayan.

`resilienceSettings.requestQueue.maxWaitMs` shi ne **kasafin lokacin jiran jerin gwano**: yana
rufe lokacin jiran gurbin provider sannan da zama a matsayin QUEUED, kuma ana
goge ma'aunin lokacinsa da zarar aikin ya bar QUEUED ya fara aiwatuwa
(`rateLimitManager.ts`, `wrappedFn`). Buƙatar da ta wuce wannan lokaci ba za ta
taɓa isa upstream ba. Tsoho shi ne 30000ms, wanda
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` ke bayarwa a cikin
`src/lib/resilience/settings.ts` kuma
`tests/unit/ratelimit-admission-control-6593.test.ts` ya tabbatar da shi, don haka
canza shi zai sa wannan gwajin ya gaza maimakon barin wannan sakin layi ya tsufa
ba tare da an lura ba.

`resilienceSettings.requestQueue.executionMaxWaitMs` shi ne abin da Bottleneck
ke karɓa a matsayin `expiration` na aikin, wanda ma'aunin lokacinsa ke farawa
ne kawai bayan turawa. Kariyar ƙarshe ce ga executors waɗanda ba su da nasu
lokacin ƙarewar upstream, kuma ana ɗaga ta zuwa lokacin ƙarewar fara fetch na
executor idan wannan ya fi tsawo, don kada ta katse amsa mai kyau da ke kan
hanya. Tsoho shi ne 600000ms (minti 10).

Sanya kasafin jerin gwano cikin `expiration` shi ne abin da a baya ke kashe
gateways marasa incremental a tsakiyar aiki — a halacce suna iya aiki na
mintuna kafin bytes na farko — kuma shi ya sa ake bayyana ƙarewar lokaci da
`code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), yayin da kasafin jerin gwano
ke ɗauke da lambar ƙarewar lokacin jerin gwano. Sauya kowanne ta
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ko dashboard
(**Settings → Resilience**). Ana takaita duka zuwa 1ms–24h lokacin normalisation.

**Matsayin fifiko, ga duka biyun:** env var yana samar da _tsohon ƙima_ ne kawai.
Ƙimar da aka adana a cikin `resilienceSettings.requestQueue` (dashboard / API
patch, wadda aka adana a `key_value`) tana rinjayarta, sannan
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` na takamaiman connection
yana rinjayar wannan. Saboda haka, saita env var a deployment wanda tuni yake da
ƙimar da aka adana ba zai canza komai ba — maimakon haka, goge ko sabunta
saitin da aka adana.

`maxWaitMs` yana iyakance zaman jerin gwano; `maxQueueDepth` da ke ƙasa yana
iyakance yawan masu kira da za su iya kasancewa cikin jerin gwano lokaci guda.

**Sake-gwaji da jikin amsa ya bayyana: daidaita tazara vs kullewa.** Jikin 429
na iya bayyana lokacin jiransa da kansa (Gemini `RetryInfo.retryDelay`, rubutun
"retry after Ns"), wanda `updateFromResponseBody` ke karantawa. Jiran da ya yi
daidai da `maxWaitMs` na connection daidaita tazara ne: limiter yana zubar da
reservoir ɗinsa na tsawon wannan lokaci, sannan kiran da ke jerin gwano su tafi
lokacin da ya sake cika. Jiran da ya fi `maxWaitMs` tsawo ba abu ne da jerin
gwano zai iya jira har ya ƙare ba — Gemini yana amsa ƙarewar adadin izinin rana
da `retryDelay: "86399s"`. `Retry-After` da aka tura a kan 429 da aka sake ginawa
(#16528) tuni yana sa fallback engine ya kulle model na wannan tsawon lokaci,
amma dakatar da limiter saboda shi ma zai ci gaba da tsaida duk wani kira da ya
isa key da wuri (misali, bayan resilience reset) na tsawon dukkan `maxWaitMs`.
Lokacin da irin wannan jira ya fito daga cikakken nau'in Google `RetryInfo`
detail (asalin `google_rpc_retry_info`) kuma limiter na key ɗin ya riga ya
takaitu ga model (duba `getLimiterKey`), 429 ɗin zai zama kullewar model a kan
wannan connection maimakon haka (`lockModelForLongBodyRetry` a cikin
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, wanda aka takaita zuwa
24h), kuma ba a dakatar da limiter. Zaɓin account yana tsallake wannan kullen ta
`isModelLocked()`, haka kuma combo pre-dispatch gate yake yi ga targets da aka
ɗaure da connection. A kan antigravity, wanda limiter ɗinsa yake na kowace quota
family, kullen yana kan ainihin model, kamar sauran quota locks nasa. Ana kuma
kulle sunan da client ya nema lokacin da alias ya warware shi zuwa wannan
model, domin waɗannan binciken suna amfani da sunan da aka nema; ana kulle shi
kai tsaye (`lockExactModel`), don haka alias da ya ketare antigravity quota
family ko codex scope ba ya taɓa kulle nasa. Alamar rubutu, `retryDelay` marar
nau'i, ko limiter da dukan connection ke rabawa yana ci gaba da amfani da
dakatarwar. Lokacin da limiter ɗin da hanyar 429 ta sake ginawa ya dakata, mai
kira wanda sauran lokacin jerin jiransa zai ƙare kafin dakatarwar ta ƙare ana
ƙi shi nan take da lambar ƙarewar lokacin jerin gwano (`checkLimiterPause`)
maimakon a bar shi ya jira har lokacin ya ƙare; an ɗaure ƙarshen da aka rubuta
kafin a gina limiter, inda Bottleneck ke fara agogon refresh ɗinsa, kuma duk
wani canji na gaba ga reservoir yana mantar da shi. An rufe wannan da
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` da
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — iyakar karɓa ta zaɓi (sabo).** `resilienceSettings.requestQueue.maxQueueDepth`
yana iyakance yawan buƙatun da za su iya zama cikin jerin gwano (ba a tura su
ba tukuna) na provider+connection guda ɗaya lokaci guda. Lokacin da jerin gwano
ya riga ya ƙunshi buƙatu `maxQueueDepth`, ana ƙin sabuwar buƙata nan take tare
da kuskure mai nau'in `code: "RATE_LIMIT_QUEUE_FULL"` **kafin** ta taɓa isa
`limiter.schedule()` — don haka ƙin ba ya cin albarkatu sosai kuma yana faruwa
kafin duk wani aikin prompt-compression / translation na downstream don wannan
buƙatar. Tsohon ƙima `0` = an kashe, yana kiyaye halin jerin gwano marar iyaka
da ake da shi; an takaita shi zuwa 0–100000. Sauya shi ta
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ko
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Binciken karɓar kansa pure function ne
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) don haka
ana iya yi masa unit test ba tare da ainihin Bottleneck limiter ba.

> RFC ɗin da ya buɗe #6593 ya kuma gabatar da tutar `bypassCompressionOnRateLimit`.
> Bututun `open-sse/services/compression/` na wannan repo yana yin matse
> prompt/context ne a kan buƙatar LLM mai fita (`chatCore.ts`, a kusa da
> sashen `resolveCompressionSettings`/`selectCompressionStrategy`), ba matse
> amsar HTTP a kan jikin 429 da aka ƙirƙira ba — babu hanyar lamba da ta dace
> da tutar bypass ta kai tsaye. Wannan matakin matse prompt a halin yanzu kuma
> yana gudana _kafin_ `withRateLimit()` a cikin bututun buƙata, don haka sake
> tsara shi domin a tsallake shi idan an ƙi buƙata saboda layin jira ya cika
> wani canji ne daban kuma mafi girma fiye da iyakar wannan batu; da gangan
> **ba a** aiwatar da shi a nan ba, kuma an bar shi a matsayin aikin gaba idan
> ribar rage amfani da CPU ta cancanci haɗarin sake tsarawa.

### Kariyar Kunna Iyakance-Adadi Ta Atomatik & Kariyar Haɗi (`rateLimitProtection`)

**Kariyar kunna ta atomatik** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, tsoho `true`):
Ta tsohuwa, OmniRoute yana kunna kariyar layin jiran iyakance-adadi ta atomatik ga duk haɗin masu samarwa masu API key da suke aiki (`getProviderCategory(provider) === "apikey"`). Wannan yana tabbatar da cewa buƙatun da ke shigowa zuwa API keys na upstream masu saurin kaiwa iyaka ana jera su a layin jira kuma ana daidaita yawansu ta hanyar Bottleneck maimakon su yi tururuwa su haifar da kurakuran 429 na upstream. Ana iya soke wannan kariya ta hanyar environment variable `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` yana kashewa, `true`/`1`/`on` yana tilasta kunnawa), wanda yake da fifiko a kan saitin dashboard da aka adana (**Settings → Resilience** / `PATCH /api/resilience`).

**Ma’anar `rateLimitProtection` na kowane haɗi:**
Ana bibiyar kariyar iyakance-adadi ta kowane haɗi ta hanyar filin boolean na `rateLimitProtection` a kan haɗin masu samarwa (ana adana shi a matsayin `rate_limit_protection` a cikin SQLite):

- **An kunna kai tsaye (`rateLimitProtection === true`)**: An kunna kariyar iyakance-adadi kai tsaye ga wannan haɗin, ba tare da la’akari da nau’in mai samarwa ko ko an kunna kariyar kunna ta atomatik ba.
- **An kashe kai tsaye (`rateLimitProtection === false`)**: Yana kashe kariyar da aka kunna kai tsaye, amma **ba ya** cire haɗin API key mai aiki daga kariyar kunna ta atomatik ta duniya. A cikin `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` da `undefined` daidai suke: `rateLimitProtection === true` kaɗai ake ɗauka a matsayin keɓantaccen override. Idan `rateLimitProtection` ya kasance `false` (ko ba a saita shi ba), haɗin API key mai aiki har yanzu yana cika sharadin kunna ta atomatik kuma yana ci gaba da samun kariyar iyakance-adadi.
- **Babu ficewa ga kowane haɗi**: A halin yanzu, mai gudanarwa ba zai iya bayyana cewa “wannan haɗin API key guda ɗaya mai aiki dole ne ya gudana ba tare da kariyar layin jiran iyakance-adadi ba” tare da barin kunna ta atomatik yana aiki ga sauran ba. Domin gudanar da haɗin API key gaba ɗaya ba tare da layukan jiran iyakance-adadi ba, dole ne a kashe kariyar ta duniya (`RATE_LIMIT_AUTO_ENABLE=false` ko `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Hanyoyin rubutawa da ake goyon baya:**

- **`POST /api/rate-limits`**: Hanyar rubutawar gudanarwa da ake goyon baya domin sauya `rateLimitProtection` na wani haɗi (`{ connectionId: string, enabled: boolean }`). Kiran wannan da `enabled: true` yana kunna kariyar kai tsaye; kiransa da `enabled: false` yana cire kariyar kai tsaye (duk da cewa haɗin API key masu aiki za su ci gaba da kasancewa ƙarƙashin kariyar duniya idan kunna ta atomatik yana kunne).
- **`PUT /api/providers/[id]`**: Da gangan **ba ya** karɓa ko sauya `rateLimitProtection` (#11278). Sabunta metadata na haɗin mai samarwa ta hanyar `PUT /api/providers/[id]` ba zai taɓa canza yanayin kariyar iyakance-adadi da aka adana ba.

---

## 6. Mai sa ido kan yawan fitarwa na rafin da ke tafiya a hankali (#9709)

Kariyar zaɓi ta `resilienceSettings.streamRecovery.throughputWatchdog` tana gano
tushen sama wanda har yanzu yake aika gutsattsarin bayanai amma yake samar da amsar mataimaki ƙasa da
ƙimar fitarwa mai amfani da aka saita. An ware ta da gangan daga wa'adin rashin aiki:
bugun-zuciya da metadata ba sa sake saita kowane mai ƙidayar lokaci kuma ba a ɗauke su a matsayin ci gaba. Haka kuma
ta bambanta da wa'adin ƙarshe na yunƙuri (#9153), wanda ya kasance cikakken iyakar
tsaro ba tare da la'akari da ingancin fitarwa ba.

Mai sa idon yana buƙatar lokacin fara aiki, sannan cikakkiyar taga mai motsi kafin
ya iya katsewa. Yana ƙirga bambance-bambancen rubutu daga abubuwan fitarwa na Chat Completions da Responses API
(a matsayin kimantawa mai taka-tsantsan ta bytes na UTF-8), yana yin watsi da abubuwan da ke ɗauke da bayanan amfani kawai da kuma marasa komai, sannan yana
dakatar da yanke hukunci yayin da abubuwan kiran kayan aiki ko na tunani ke gudana. A kashe yake
ta tsohuwa kuma ana iya kunna shi da `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; ana iyakance
tagar, lokacin fara aiki, mafi ƙarancin ƙima, da mafi ƙarancin fitarwar da za a iya aunawa ta
matakin daidaita saitunan juriyar matsala na yau da kullum.

Idan an kunna shi, katsewar mai sa ido tana shafar yunƙurin tushe na sama da ke aiki ne kawai. Kafin
a aika duk wani byte da abokin ciniki zai iya gani, hanyar dawo da aiki da wuri ta asusu ɗaya da ake da ita na iya sake buɗe
yunƙurin. Bayan tabbatar da aikawa, ba a taɓa maimaita rafin kai-tsaye ba; yarjejeniyar
ci gaba mai aminci a tsakiyar rafi da ake da ita ce kaɗai za ta iya haɗa ƙarin ƙarshen. Kammalawa ta ci gaba da kasancewa
sau ɗaya kacal, don haka ba a maimaita lissafin amfani da sakin semaphore.

---

## 7. Sake Bayyana Matsayin Tushen Sama (kurakuran ƙayyadadden amfani da aka bayyana ba daidai ba)

**Iyakar aiki:** ƙofar tushen sama guda ɗaya da ke bayar da rahoton ƙarewar ƙayyadadden amfani na ɗan lokaci da matsayin HTTP mara daidai.

**Manufa:** gyara matsayi mai ruɗarwa KAFIN rarrabawa, domin masu amfani na ƙasa (injin fallback, tara combo, amsar da ake nuna wa abokin ciniki) su ga ainihin yanayin gazawar da za a iya sake gwadawa.

Wasu ƙofofi suna nuna ƙarewar ƙayyadadden amfani na ƊAN LOKACI da matsayin HTTP
wanda ba za a sake gwadawa ba. `agentrouter.org` yana mayar da `403` (wani lokaci `400`) tare da jikin saƙo
na Sinanci (`用户额度不足` / `额度不足`) maimakon daidaitaccen `429`. Abokan ciniki kamar Claude
Code suna ɗaukar `403` a matsayin na dindindin kuma su katse zaman, kuma idan ba a gyara ba
injin fallback zai rarraba shi a matsayin `AUTH_ERROR` maimakon lamarin
ƙayyadadden amfani.

**Aiwatarwa:**

- Rijista + mai daidaitawa: `open-sse/config/upstreamStatusRestatement.ts` — jerin
  ƙa'idoji na kowane mai samarwa (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), waɗanda ake daidaitawa ta `applyStatusRestatement()`.
- Wurin kira: ɓangaren `providerFailure:` a cikin `open-sse/handlers/chatCore.ts`
  (kusa da layi na 3654), nan da nan bayan `parseUpstreamError()` ya fassara amsar tushen
  sama mai matsayin kuskuren HTTP (`!providerResponse.ok`), kuma kafin duk wata
  rarrabawa ta gudana, domin kowane mai amfani na ƙasa ya ga matsayin da aka
  gyara. Kurakuran da aka saka a cikin rafin SSE na `200` suna bin wata hanya ta daban
  ta fassara rafi daga baya kuma **ba** su ƙarƙashin wannan hook a yau — wannan
  sananniyar gazawa ce, kuma har yanzu ba a buƙace ta don kuskuren matsayin agentrouter ba (wanda
  ke bayyana a matsayin matsayin kuskuren HTTP).
- Cancantar sake gwadawa: `429` yana cikin `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), don haka kuskuren da aka sake bayyana
  yana ɗauke da ainihin tagar sake gwadawa maimakon bayyana a matsayin mataccen `403`.
- `60s` na ƙirƙira na `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  shi ne kawai abin da amsar da aka sake bayyana ke gaya wa **abokin ciniki**; ba shi ne
  tsawon lokacin sanyaya/kulle haɗin na ciki ba — wannan yana ƙarƙashin
  kulawar wata dabara dabam da ke sarrafa kuskuren da aka sake bayyana
  (jinkirin baya mai ƙaruwa na Connection Cooldown, §2, tushen `3s` ga masu samarwa
  na API-key; ko Model Lockout, §3, ga masu samarwa masu ƙayyadadden amfani na kowane model kamar
  agentrouter). Router na iya sake cancantar yin yunƙuri a ciki kafin
  tagar 60s da yake sanar da abokin ciniki — wannan sarari ne na ganganci,
  ba bug ba.

Kurakurai na dindindin (`无权访问模型` na agentrouter — babu izinin shiga wannan model) BA A
TAƁA sake bayyana su ba: `excludeMarkers` yana soke ƙa'idar ko da `textMarkers` ya dace,
don haka kuskuren yana riƙe matsayinsa na asali kuma babu abin da zai ci gaba da sake gwada shi har abada. Ƙa'idar
rarraba mai samarwa da ta dace
(`agentrouter-model-access-denied` a cikin `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, tushen lokacin sanyaya na `6h` da aka bayyana) ana
duba ta ta `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_kafin_ dawowar-wuri ta gama-gari ta rukunin apikey mai `FORBIDDEN`, bisa sharadin
`honorsRuleLockScope(provider)` (#10334 — a halin yanzu agentrouter kaɗai ne ta hanyar
jerin izinin `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a cikin
`providerErrorRules.ts`). Lokacin sanyaya na 6h da ƙa'idar ta bayyana yana wucewa a matsayin
`fallbackResult.baseCooldownMs`, amma har yanzu yana shiga hanyar kullewa ta
ƙayyadadden amfani na kowane model da ta riga ta kasance (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, wanda #10334 bai canza ba sai dai tushen lokacin sanyaya):
ana rage shi zuwa `mlSettings.maxCooldownMs` na mai gudanarwa
(tsoho `1_800_000ms` / 30min), kamar kowane kullen model, kuma
_dalilin kullen da aka adana_ yana ci gaba da kasancewa tsohon ƙayyadadden `"forbidden"`,
ba `"auth_error"` na ƙa'idar ba — tsawon lokacin sanyaya ne kawai ake mutuntawa
daga farko zuwa ƙarshe, ba zaren dalilin ba. Haɗin kansa yana ci gaba da aiki;
sauran model da ke kan wannan haɗin ba su shafu ba.

Kurakuran ƙa’ida da aka sake bayyana (`额度不足`) suna kaiwa ga ƙa’idar mai bayarwa a production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ba tare da bayyana wani lokacin jira na kansa ba — tsohon saitin
scaled backoff na persistence layer ne yake aiki). Tun daga #10334, ana amfani da
`scope` da ke kan `ProviderErrorRuleMatch` daga farko har ƙarshe, amma **kawai** ga
masu bayarwa da ke cikin allowlist na `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — a yau `"agentrouter"` kaɗai, wanda ake sarrafawa ta
`honorsRuleLockScope()`). Ga kowane mai bayarwa dabam, `scope` yana ci gaba da zama
na bayani kawai, daidai kamar yadda yake kafin #10334.
`checkFallbackError` yana fito da scope na ƙa’idar da ta dace a matsayin
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) shi ne shared guard da ke tabbatar da cewa wani
`ruleScope` yana da aminci da gaske a ɗauke shi a matsayin sigina mai shafar
connection gaba ɗaya kuma mai murmurewa da kansa (scope `"connection"`, reason
`quota_exhausted`, ba zai taɓa zama `permanent` ba, kuma ba zai taɓa zama
`creditsExhausted` ba — kariya ce daga wata ƙa’ida ta gaba da za ta haɗa scope
`"connection"` da halin account na dindindin). Consumers guda biyu suna kiransa:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  maimakon shiga reshen lockout na **kowane model** na passthrough-provider
  (agentrouter yana da `passthroughModels: true` → `hasPerModelQuota()`
  yana mayar da `true`), yana sanya **cooldown na connection na wucin gadi** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ba tare da sanya terminal status
  (`credits_exhausted`/`banned`/`expired`) ba — don haka connection ɗin zai murmure
  da kansa bayan cooldown ya ƙare maimakon buƙatar sake saita credential da hannu.
  Ana tsallake wannan ga connections masu `disableCooling: true` (#2997): wannan
  opt-out ɗin yana faɗawa cikin lockout na kowane model maimakon haka (wani
  trade-off da aka rubuta — duba code comment da ke sama da reshen).
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): wannan guard ɗin yana sanya
  connection ɗin cikin in-memory `exhaustedConnections` set, mai key na
  `${provider}:${connectionId}`. Wannan yana tsallake remaining SAME-REQUEST
  target ne kawai idan _shi kansa ya riga ya ƙunshi ainihin wannan `connectionId`_
  a kan target object ɗinsa (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` kafin binciken `exhaustedConnections`) — plain
  model-list combo, inda sibling targets ba su ɗauke da pinned `connectionId` na
  kansu kuma ake resolve ɗaya ne kawai a kowane dispatch daga header na response
  `X-OmniRoute-Selected-Connection-Id`, ba ya taɓa samun daidaituwar wannan key.
  Ga wannan yanayin da aka fi samu, ainihin kariyar da ke hana remaining leg sake
  amfani da account ɗin da quota ɗinsa ya ƙare BA wannan Set ba ne — persistence
  layer da ke sama ne (yanzu `rateLimitedUntil` na connection ɗin yana nan gaba)
  haɗe da wannan guard ɗin da ke hana `transientRateLimitedProviders` ga wannan
  failure (duba "Tsarin matakai biyu" da code comment da ke kan reshen
  `isAgentrouterConnectionQuotaScope` a cikin `targetExhaustion.ts`): idan aka bar
  wannan Set ba tare da marking ba, `allowRateLimitedConnection` force-allow na
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) BA ya fara
  aiki ga remaining legs na mai bayarwar, don haka ana bin filter na
  `rateLimitedUntil` na credential selection (`src/sse/services/auth.ts:1238`)
  yadda aka saba, kuma remaining leg ko dai ya zaɓi wani agentrouter connection
  dabam wanda har yanzu ya cancanta, ko ya gaza saboda babu credentials da ake
  da su — ba ya tilasta komawa kan connection ɗin da wannan reshen ya saka a
  cooldown.

### Tsarin matakai biyu: sake bayyana status, sannan classification

Sake bayyana status (`upstreamStatusRestatement.ts`) da classification rules na
mai bayarwa (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) registries ne daban-daban waɗanda duka suke amfani da
provider id da text markers a matsayin key, amma suna gudana a wurare daban-daban
kuma suna da manufofi daban-daban: restatement yana sake rubuta HTTP status tun
da wuri a cikin `chatCore.ts`; classification rules suna zaɓar fallback `reason`
da lock `scope` (`model` / `provider` / `connection`) a cikin
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Classification rules suna ganin cikakken error **text** ne kawai (wanda ake buƙata
domin daidaitawa da body markers kamar `额度不足`) ga masu bayarwa da ke cikin
allowlist na `FULL_TEXT_RULE_PROVIDERS` a cikin `providerErrorRules.ts` — a halin
yanzu `"agentrouter"` kaɗai. Ga kowane sauran mai bayarwa na **built-in catalog**,
`checkFallbackError` yana miƙa wa `getProviderErrorRuleMatch` structured error
kawai (`{code, type}`), wanda ya isa ga rules masu dogaro da header/status/code
amma ba ya iya ganin body-text markers. Helper ɗin `resolveRuleMatchBody()` ne
yake yin wannan zaɓin: cikakken error text ga masu bayarwa da ke cikin allowlist,
structured error kuma ga sauran. Ƙara wani **built-in** provider zuwa
`FULL_TEXT_RULE_PROVIDERS` wani bayyanannen opt-in ne na kowane provider — an yi
shi ne domin default path na kowane provider da ba ya cikin jerin ya ci gaba da
zama iri ɗaya byte-for-byte ba tare da wani canji ba.

`scope` na ƙa’ida (`model` / `provider` / `connection`) opt-in ne daban da
`FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` yana fito da shi ne kawai a
matsayin `fallbackResult.ruleScope`, sannan downstream consumers ba sa ɗaukar sa
a matsayin wani abu fiye da informational label sai ga masu bayarwa da ke cikin
allowlist na `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a wannan file ɗin (`gated via
honorsRuleLockScope()` — a yau `"agentrouter"` kaɗai). Duba "Kurakuran ƙa’ida
da aka sake bayyana" da ke sama don ganin abin da matching na
`scope: "connection"` yake yi a zahiri bayan an saka provider cikin wannan
allowlist.

**#11104 — ƙa’idojin da mai gudanarwa ya ayyana suna tsallake dukkan jerin izini biyu.** Mai gudanarwa zai iya
ayyana ƙa’ida ta kowane mai samarwa a lokacin aiki ta hanyar `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ba tare da gyara wannan fayil ba. Sanya ƙa’idar mai gudanarwa a bayan
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — jerin izini
da aka tsara don kare halayen **tsoho** na ƙa’idojin katalog da aka gina ciki — zai
sa tsarin saitunan ya zama marar aiki ga kowane mai samarwa sai waɗanda aka riga aka
jera a wurin, domin ayyana ƙa’idar da kansa ya riga ya zama amincewar mai gudanarwa
kai tsaye. `resolveRuleMatchBody()` da `honorsRuleLockScope()` dukansu suna fara duba
`hasOperatorRuleForProvider()`: mai samarwa da ke da ƙa’idar mai gudanarwa yana samun
asalin rubutun kuskure kuma ana mutunta `scope` da ya ayyana, ba tare da la’akari da
ko yana cikin ɗaya daga cikin jerin izinin ba.

**Gurbin da aka sani — ba a taɓa tuntubar `providerRuleRegistry` don HTTP 400.**
Reshen `BAD_REQUEST` na `checkFallbackError` yana rarraba matsayi 400 gaba ɗaya
ta hanyar jerukan tsarin kalmominsa (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, da sauransu a cikin `accountFallback.ts`) sannan ya dawo kafin
a kai ga reshen `configuredRule`/`getProviderErrorRuleMatch` da ke samansa.
Ƙa’idar katalog da aka gina ciki (ko ƙa’idar mai gudanarwa) mai `status: 400`
tana da ingantaccen tsarin rubutu amma ba za ta taɓa aiki ba. Babu wata ƙa’ida da ke nufin 400 a yau,
don haka babu abin da abin ya shafa a tsarin samarwa — amma duk wata ƙa’idar 400 ta gaba tana buƙatar
a fara taɓa wannan reshe, wanda ya fi ƙara ƙa’ida girman canji (yana
sake rarraba 400 ga kowane mai samarwa da ya riga ya dogara da halayen jerin
tsarin kalmomi) kuma ya wuce iyakar ƙarin ƙa’ida ga mai samarwa guda.

### Ƙara sabuwar ƙofar da ke bayyana adadin ƙayyadadden amfani ba daidai ba

1. Yi rajistar jerin ƙa’ida guda ɗaya a cikin `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Ka sa `textMarkers`
   su kasance na musamman ga mai samarwa; kada ka sake amfani da jimlolin Turanci na gama-gari da ke karo da
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Idan ana so, yi rajistar ƙa’idojin rarrabawa a cikin
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) don zaɓar
   madaidaicin iyakar kullewa (`connection` don ƙayyadadden amfani na dukkan asusu, `model` don
   kurakurai na kowane samfuri). Wannan matakin yana aiki ne kawai a tsarin samarwa ga
   masu samarwa waɗanda ƙa’idojinsu ke buƙatar cikakken rubutun kuskure (alamomin jiki): ƙara
   id ɗin mai samarwa zuwa `FULL_TEXT_RULE_PROVIDERS` a cikin fayil ɗin nan — in ba haka ba
   `checkFallbackError` zai miƙa wa ƙa’idar kuskuren da aka tsara kawai
   `{code, type}`, kuma ƙa’idar rubutun jiki ba za ta taɓa dacewa da zirga-zirgar kai tsaye ba.
   Ƙa’idojin da ke dacewa kawai bisa `status`/`headers` (kamar na Opencode ko
   Minimax) ba sa buƙatar wannan amincewar. A gefe guda, idan ƙa’idar ta ayyana
   `scope: "connection"` kuma manufar ita ce ainihin lokacin sanyaya na duk haɗin
   tare da tsallake haɗin zaɓuɓɓuka a buƙata ɗaya (ba wai lakabin bayani kawai ba), ƙara
   id ɗin mai samarwa zuwa `HONORS_RULE_LOCK_SCOPE_PROVIDERS` a cikin fayil ɗin nan — wannan
   ne ke ba da izinin amfani irin na `isAgentrouterConnectionQuotaScope()` a cikin
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) da
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); ba tare da shi ba, `scope`
   har yanzu yana bi ta cikin `fallbackResult.ruleScope` amma babu abin da ke aiki da shi.
3. Ƙara gwaje-gwajen raka’a masu kwaikwayon `tests/unit/upstream-status-restatement.test.ts`
   da `tests/unit/agentrouter-error-rules.test.ts` (ciki har da
   kariyar not-permanent / not-creditsExhausted, kuma — idan mai samarwar yana buƙatar
   jerin izinin — gwajin da ke tabbatar da cewa `resolveRuleMatchBody()` yana dawo da
   cikakken rubutu ga wannan mai samarwar kawai).

Ba a buƙatar canje-canje ga `chatCore.ts`, `classifyError`, ko combo.

#### Kulle bisa rukunin egress (#10880)

Masu samarwa da ke cikin `EGRESS_BUCKETED_LOCK_PROVIDERS` (dangin opencode) ana ɗaukar su
a matsayin upstream da aka rarraba bisa IP (matakin kyauta na opencode an rarraba shi bisa IP ne, ba
bisa asusu ba — duba #9611): matsayi-429 da aka rarraba a matsayin `quota_exhausted`
**ko** `rate_limit_exceeded` yana sanyaya duk haɗin dangin da ke cikin jerin izini
waɗanda adireshin egress IP da aka sani na ƙarshe ya dace da na haɗin da ya gaza, kafin
juyawa ya gwada su
— don kauce wa kiran upstream N-1 waɗanda tabbas za su gaza (tsari iri ɗaya da #10460/#10525).
An haɗa `rate_limit_exceeded` da gangan: a kan hanyar `markAccountUnavailable`
ƙa’idojin musamman na opencode ba sa dacewa (ba a miƙa headers/body ga
`checkFallbackError`, kuma opencode ba ya cikin `FULL_TEXT_RULE_PROVIDERS`), saboda haka 429
wanda jikinsa ke ɗauke da rubutun ƙayyadadden amfani na rajista ("monthly usage limit
reached") ana rarraba shi a matsayin `quota_exhausted` ta hanyar fallback na rubutun ƙayyadadden amfani
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; lokacin sanyaya na awa 1) kafin
a kai ga ƙa’idar `status_429` — yayin da 429 marar rubutun ƙayyadadden amfani (ƙayyade
yawan buƙatu kawai) ake rarraba shi ta hanyar ƙa’idar `status_429` a matsayin `rate_limit_exceeded`
kuma har yanzu yana sanyaya dangin IP ɗin. Ga mai samarwa da ke cikin jerin izini, ƙayyade yawan buƙatu
bisa rukunin IP alama ɗaya ce da ƙayyadadden amfani da ya ƙare. Iyakoki na gaskiya:

- **Iyakar ƙoƙari**: makullin yana gano `egress_ip` na ƙarshe da aka sani na haɗin
  daga `proxy_logs` (tazarar 24h, aiki kai tsaye, babu cache). Idan cache babu komai (ba a
  taɓa gwada egress IP ba) ko babu layi → har yanzu reshen yana sanya haɗin da ya gaza
  cikin lokacin jira (ana rubuta shi kamar yadda ake yi a yau), sai dai ba a kulle ɗan'uwansa ba.
- **Ba ya taɓa zama na ƙarshe**: lokacin jira taga ce ta ƙayyadadden adadi da ake sabuntawa
  (`testStatus: "unavailable"`); ba a taɓa fitar da matsayi na dindindin daga
  siginar matakin IP ba. Haɗin `disableCooling` suna tsallake reshen gaba ɗaya.
- **Matsayin girman makulli ya canza ga dangin da ke cikin jerin izini**: wannan canjin
  fage ne, ba kawai inganta 'yan'uwa ba. opencode mai samar da `passthroughModels`
  ne, don haka kafin wannan reshen, 429 yana haifar da kullewa ga kowane MODEL; yanzu
  yana haifar da lokacin jiran haɗi — har ma ga ma'aikacin da ke gudanar da haɗi guda
  ɗaya ba tare da wani ɗan'uwa ba. Wannan shi ne girman da teburin dokokin opencode
  ya riga ya ayyana a matsayin daidai (`scope: "connection"`,
  `providerErrorRules.ts`), amma ba a taɓa mutunta shi ba zuwa yanzu saboda opencode ba ya cikin
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Reshen da kansa yana rubuta lokacin jiran haɗin
  da ya gaza + `backoffLevel`, yana kwaikwayon reshen agentrouter mai fagen haɗi,
  sannan ya dawo — ba a taɓa kaiwa ga toshewar kowane model da hanyar gama-gari
  da ke ƙasa ba.
- **An haɗa combo**: kamar reshen agentrouter, fagen da gangan yake
  watsi da rage matsayin `persistUnavailableState`/`isCombo` da mai kiran combo
  yake amfani da shi ga 429. Kullewar kowane model ba wani nau'i mafi rauni na wannan fage ba ne,
  raka'ar da ba daidai ba ce: ba ta faɗi komai game da IP ɗin da ya ƙare ba, don haka
  jujjuyawar combo za ta ci gaba da ɓata kira guda da tabbas zai gaza ga kowane ɗan'uwa.
- **Kariyar 'yan'uwa**: ba a taɓa maye gurbin ɗan'uwan da ya riga ya kai matsayi na ƙarshe
  (banned/credits_exhausted) ko wanda ya riga yake cikin lokacin jira mafi tsawo ba.
- **Keɓantaccen jerin izini**: faɗaɗa `EGRESS_BUCKETED_LOCK_PROVIDERS`
  shawara ce bayyananniya ta mai shi; babu haɗawa ta gama-gari (tsarin #10334/#10419). Query na
  'yan'uwa yana ɗaure wannan jerin izinin ɗaya maimakon maimaita shi a matsayin SQL
  literal, don haka faɗaɗa shi zai ci gaba da zama canjin layi guda.
- **Jujjuyawar egress IP, ta ɓangarorin biyu**: tazarar nema (24h) ta fi
  TTL na cache ɗin egress-IP (5 min) faɗi sosai, don haka "IP na ƙarshe da aka sani" tarihi ne,
  ba halin yanzu ba. Idan proxy na wani haɗi ya juya a cikin wannan tazara,
  makullin na iya **rasa** IP da ake rabawa da gaske (IP ɗin da aka rubuta shi ne sabon wanda
  bai ƙare ba) — haka kuma yana iya **sanya ɗan'uwan da tun daga lokacin ya
  juya daga** IP ɗin da ya ƙare cikin lokacin jira. Lamari na biyu yana sa wannan ɗan'uwan ya rasa
  taga ɗaya ta lokacin jira; an amince da duka biyun a matsayin iyakokin iyakar ƙoƙari na
  bincike mai dogaro da tarihi.
- **Kuɗin aiki**: bincike biyu masu iyaka a cikin `proxy_logs` (an tace tazara ta hanyar
  `idx_pl_timestamp`), a mitar 429 kawai. Babu sabon index (migration 134
  YAGNI). An auna a kan kwafin DB na zirga-zirgar gaske mai matsakaicin girma;
  tsarin da ke sarrafa zirga-zirga mai yawa yana riƙe da layuka masu yawa daidai gwargwado
  a cikin wannan tazara.

---

## Sauran Fasalolin Juriya

- **Dabarun zaɓen hanya guda 20** (fifiko, mai nauyi, round-robin, context-relay, fill-first, p2c, bazuwar, mafi ƙarancin amfani, ingantaccen-farashi, mai lura da sake saiti, taga-sake-saiti, sararin-ragowa, mai nauyin ƙayyadadden rabo, tsantsar-bazuwar, auto, lkgp, ingantaccen-mahallin aiki, ingantaccen-ma'ajiyar wucin gadi, haɗewa, jerin-aiki) — duba [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Zaɓen hanya mai lura da sake saiti** (v3.8.0) — yana fifita haɗin sadarwa bisa lokacin sake saita ƙayyadadden rabo.
- **Raguwar damar yanayin bango** — Responses API `background: true` yana komawa aiki tare da gargaɗi.
- **Gano iyakar kayan aiki mai sauyawa** — yana janye masu samarwa idan an kai iyakar adadin kayan aiki.
- **Madadin gaggawa** — `OMNIROUTE_EMERGENCY_FALLBACK` ne ke sarrafa shi; masu gudanarwa za su iya sauya saitinsa daga shafin Feature Flags ba tare da sake kunnawa ba.

---

## Debugging

- Weighted combo yana amsa da `503 all_targets_cooling_down` (an saita `Retry-After`, sannan `diagnostics.excluded` yana jera kowace manufa tare da `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → an saita pool ɗin kuma an haɗa shi, sai dai kowace manufa an cire ta ne saboda ma'aunin lokacin juriya; gargadin `[COMBO] Weighted selection: every target excluded before dispatch — …` yana bayyana dalilan da daƙiƙun da suka rage. `404 no_executable_targets` daga combo ɗin nan yana nufin babu ma'aunin lokacin juriya da ya shiga tsakani (babu abin da za a gudanar, ko kuma kowane account ya gaza gwajin availability). An gina shi a cikin `open-sse/services/combo/pinRecovery.ts` daga abubuwan da aka cire da aka tattara a `targetResolution.ts`.
- An tsallake dukkan keys na provider → bincika duka matsayin circuit breaker DA `rateLimitedUntil`/`testStatus` na kowane connection.
- An cire provider har abada bayan reset window → code yana karanta raw `state` maimakon `getStatus()`/`canExecute()`.
- Key ɗaya ya gaza, ya kamata sauran su yi aiki → fi son connection cooldown maimakon circuit breaker.
- Model ɗaya kaɗai ya gaza → fi son model lockout maimakon connection cooldown.
- Ya kamata state ya farfaɗo da kansa amma bai yi ba → bincika timestamp na gaba + hanyar karantawa da ke sabunta state da ya ƙare. Permanent statuses suna buƙatar sauye-sauye da hannu.

---

## TLS Fingerprinting & Stealth

An rubuta takaddun stealth na musamman ga provider (JA3/JA4, CCH, obfuscation) daban — duba `docs/security/STEALTH_GUIDE.md` (git; ba a haɗa shi cikin `/docs` ba).

---

## Gwajin juriya (Phase 8 · Block C)

Baya ga unit tests na dabarun juriya, gwaje-gwaje guda uku suna gwada runtime a ƙarƙashin
yanayin matsin lamba/gazawa na gaske (duk integration/nightly ne — babu wanda ke hana PRs):

| Gwaji       | Abin da yake yi                                                                                                                                                                                                                       | Yadda ake gudanarwa                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Fake-upstream node yana shigar da latency/reset/timeout/503 na gaske; yana tabbatar da cewa circuit breaker yana buɗewa/farfadowa kuma `checkFallbackError` yana rarraba 503 a matsayin fallback da za a iya farfaɗowa daga gare shi. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams ga kowane `createSSEStream` ƙarƙashin `--expose-gc`; yana gazawa idan heap ya girma fiye da iyakar da aka saita (kariyar OOM #3069).                                                                                     | `npm run test:heap`                      |
| k6 soak     | Ci gaba da load a kan `/api/monitoring/health`; iyakokin p95/error.                                                                                                                                                                   | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` ne ke tsara su (cron + dispatch). A cikin
`test:integration` na asali, chaos da heap suna tsallake kansu (idan babu `RUN_CHAOS_INT`/`--expose-gc`).

---

## Duba Kuma

- [Jagorar Tsarin Gine-gine](./ARCHITECTURE.md) — Tsarin gine-ginen tsarin da abubuwan cikinsa
- [Jagorar Mai Amfani](../guides/USER_GUIDE.md) — Masu samarwa, haɗe-haɗe, haɗin CLI
- [Injin Haɗe-haɗe ta Atomatik](../routing/AUTO-COMBO.md) — Ƙididdiga mai dalilai 16, fakitin yanayi
