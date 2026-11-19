# REASONING_REPLAY (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Pinagmulan ng katotohanan:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Huling na-update:** 2026-06-28 — v3.8.40

Kinukuha ng OmniRoute ang assistant `reasoning_content` na ginawa ng mga modelo ng thinking-mode at malinaw na ipinapalabas ito sa mga kahilingang multi-turn kapag kailangan ito ng upstream provider. Inaalis nito ang HTTP 400 na mga error na itinataas ng mga mahigpit na provider kapag ang kasaysayan ng pag-uusap ng isang kliyente ay nawawala ang pangangatwiran ng naunang pagliko.

## Bakit Ito Umiiral

Maraming mga provider ng thinking-mode ang tumatanggi sa isang follow-up turn maliban kung ang** Kasama sa naunang mensahe ng katulong ang orihinal `reasoning_content`** . Ang upstream ay nagbabalik ng 400 na may mga mensahe tulad ng:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ngunit ang mga tipikal na kliyente (Cursor, Cline, Roo Code, OpenAI SDK) ay nag-alis ng `reasoning_content` mula sa kasaysayan na kanilang nire-replay. Nire-restore ito OmniRoute mula sa isang server-side cache upang ang kahilingan na nakikita ng upstream ay pare-pareho. Ipinakilala ng Isyu #1628 ang hybrid memory/SQLite persistence kaya ang cache ay nakaligtas sa proseso ng pag-restart.

## Arkitektura

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Nangyayari ang pagkuha sa `open-sse/handlers/chatCore.ts` (dalawang site, sa dalawang site ng tawag sa `cacheReasoningFromAssistantMessage` ). Nangyayari ang replay sa `open-sse/translator/index.ts` pagkatapos ng pamimilit ng schema ngunit bago ipadala.

Ang mga simpleng (non-tool-call) na pagliko ng assistant ay naiiba sa pagkaka-key: digest `buildAssistantMessageCacheKey()` ang saklaw ng session kasama ang na-normalize na OpenAI-format na transcript hanggang sa pagliko na iyon, dahil nangangailangan ang DeepSeek ng pangangatwiran ng _every_ prior turn kapag naroroon na `tools`. Para sa mga target na Responses-API (halimbawa `opencode-go/deepseek-v4-flash`, idinala sa `/responses`) ang upstream na body ay nagdadala ng `input`, hindi `messages`, kaya iniuulat ng `translateRequest()` (`open-sse/translator/index.ts`) ang pivot transcript na na-digest nito sa pamamagitan ng isang callback na opsyon at ang mga capture site ay nagdigest ng parehong transcript na iyon. Gumagana ang Responses replay pass sa OpenAI pivot para sa bawat source format, kaya Anthropic Messages clients (Claude → OpenAI → Responses) ay nire-replay din.

## Imbakan — Hybrid Memory + SQLite

Gumagamit ang mainit na landas ng in-memory `Map` (LRU-by-creation) na sinusuportahan ng SQLite table para sa pagbawi ng pag-crash at visibility ng dashboard.

| Layer  | Pagpapatupad                                   | Layunin                                                     |
| ------ | ---------------------------------------------- | ----------------------------------------------------------- |
| Alaala | `Map` sa `open-sse/services/reasoningCache.ts` | Mabilis na paghahanap, pinaalis ang pinakamatanda sa 200    |
| DB     | `reasoning_cache` table (`src/lib/db/`)        | Nagpapatuloy sa mga pag-restart, humimok ng mga istatistika |

Ang mga pagsusulat ay napupunta sa pareho. Binabasa muna ang kumonsulta sa memorya, pagkatapos ay bumalik sa DB ( ang mga hit DB ay na-promote pabalik sa memorya). Ang mga pagkabigo DB ay hindi nakamamatay — ang in-memory na cache ay patuloy na nagsisilbi sa mainit na landas.

**Mga Default:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Max memory entry: `200` (`MAX_MEMORY_ENTRIES`)
- Pagpapalayas: pinakalumang `createdAt` muna

## Schema ng Database

Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Mga index: `expires_at`, `provider`, `model`, `created_at`. `expires_at` ay naka-imbak bilang Unix epoch na mga segundo; ang SELECT layer ay nag-normalize ng mga legacy na value ng text sa pamamagitan ng `EXPIRES_AT_EPOCH_SQL`.

## Provider / Detection ng Modelo

Ang replay ay pinagana kapag ibinalik ng `requiresReasoningReplay(provider, model)` `true`. Sinusuri ng function ang dalawang listahan sa `open-sse/services/reasoningCache.ts`.

**Provider IDs (eksaktong tugma, case-insensitive):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Mga pattern ng regex ng modelo (case-insensitive):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` at `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opsyonal na `-free` suffix)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Ang pagdaragdag ng bagong mahigpit provider/model ay nangangahulugan ng pagdaragdag sa isa sa mga listahang ito at pagsulat ng isang pagsubok sa yunit na nagsasaad ng replay na iniksyon. Dapat banggitin ng paglalarawan PR ang eksaktong upstream na 400 string na nag-udyok sa pagbabago.

## REST API

Inilalantad ng cache ang dalawang endpoint sa ilalim ng `src/app/api/cache/reasoning/route.ts`. Parehong nangangailangan ng pagpapatunay ng pamamahala (`isAuthenticated` mula sa `@/shared/utils/apiAuth`).

| Pamamaraan | Endpoint                                                  | Paglalarawan                                                          |
| ---------- | --------------------------------------------------------- | --------------------------------------------------------------------- |
| GET        | `/api/cache/reasoning`                                    | Stats + paginated entry                                               |
| GET        | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Naka-filter na listahan ( naka-clamp ang `limit` sa `[1, 200]`)       |
| DELETE     | `/api/cache/reasoning`                                    | I-clear ang lahat (memory + DB) at i-reset ang mga bilang ng hit/miss |
| DELETE     | `/api/cache/reasoning?provider=deepseek`                  | I-clear lamang ang mga entry para sa isang provider                   |
| DELETE     | `/api/cache/reasoning?toolCallId=call_abc`                | Tanggalin ang isang entry                                             |

**hugis ng tugon GET :**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Mga Tala sa Pagpapatakbo

- **Paglilinis:** `cleanupReasoningCache()` ay naglilinis ng mga nag-expire na entry sa memorya at nagpapatakbo ng `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pana-panahong tinatawag ito ng mga health-check worker.
- **Pagbawi ng pag-crash:** Pagkatapos ng pag-restart, ang memorya ay walang laman ngunit ang DB ay nagtataglay pa rin ng mga hindi pa natatapos na mga entry. Ang unang paghahanap para sa isang ibinigay na `tool_call_id` ay isang DB hit; ang mga kasunod na paghahanap ay memory hits.
- **Walang pangangatwiran, walang cache:** `cacheReasoningFromAssistantMessage` ay nagbabalik ng `0` kapag ang mensahe ng katulong ay walang patlang na `reasoning_content` / `reasoning`, kaya walang halaga ang mga sagot na hindi nag-iisip.
- **Ang pagsulat ay may gate din:** parehong tumatawag sa mga site sa `chatCore.ts` (non-streaming at streaming) tumawag lang `cacheReasoningFromAssistantMessage()` kapag `requiresReasoningReplay(provider, model)` ay `true` — ang parehong predicate sa read side checks. Ang mga pag-install na hindi kailanman nakakaapekto sa isang replay provider ay huminto sa pagbabayad para sa pagsulat, pag-update ng index, at ang try/catch sa bawat tugon na may katwiran.
- **Mga hindi mahigpit na provider:** Kapag `requiresReasoningReplay` ay `false` at ang target na format ay OpenAI, ang tagasalin** mga piraso** anumang `reasoning_content` field mula sa mga papalabas na mensahe — OpenAI Chat Completions ay hindi tumatanggap nito.

## Muse Opaque-Reasoning Ownership

Ang Muse (`muse-code`) ay nagbabalik ng caller-bound opaque reasoning (`encrypted_content`). Ang pag-replay nito sa ilalim ng ibang account o reminted na kredensyal ay nabigo sa upstream, kaya ang mga native OAuth na kahilingan ay gumagamit ng pagmamay-ari sa antas ng session sa halip na pag-ikot sa bawat kahilingan (`src/sse/services/museSessionOwnership.ts`, ipinapatupad sa `src/sse/handlers/chat.ts`). Ang mga tahasang napiling API-key na koneksyon at API-key-only na configuration ay nagpapanatili ng kanilang kasalukuyang pagruruta nang walang ganitong pagmamay-ari na mode.

- Magbigay ng stable na session ID sa bawat pagliko: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, o `x-codex-session-id`; Bilang kahalili, gumamit `prompt_cache_key`, `session_id`, `conversation_id`, o `metadata.session_id` sa katawan (sa pagkakasunud-sunod na iyon). Nawawala o blangko IDs ibalik ang 400 kapag dalawa o higit pang mga native OAuth account ang aktibo; na may iisang OAuth account ay walang maiikot, kaya ang naturang kahilingan ay nagpapanatili ng hindi naka-pin na pagruruta. Kasama sa saklaw ang OmniRoute API-key ID ng tumatawag.
- Mga bagong independent na session na round-robin sa mga aktibong native OAuth account na pinahihintulutan ng patakaran sa koneksyon ng API-key, na inayos ayon sa koneksyon ID. Nilaktawan ng round-robin ang mga account na may kaugnayan sa cooldown, na may terminal status (`banned`, `expired`, `credits_exhausted`), o naka-lock ang modelo para sa hiniling na modelo; Ang mga pagkabigo sa upstream ng Muse ay nagtatala ng cooldown at breaker state tulad ng ibang mga provider. Ang isang tahasang sapilitang koneksyon ay lumalampas sa round-robin para sa isang bagong session ngunit hindi ma-override ang isang umiiral nang may-ari.
- Hanggang sa maghatid ng matagumpay na tugon ang may-ari, ang isang session na naging hindi available ang may-ari ay muling kine-claim sa isang malusog na account. Pagkatapos ng unang matagumpay na tugon, mananatiling naka-pin ang session sa may-ari na iyon hanggang sa maging idle ito sa loob ng 30 araw (`MUSE_SESSION_IDLE_TTL_MS`).
- Ang bawat pagpapatuloy at pagliko ng resulta ng tool ay mananatiling naka-pin sa may-ari ng session: koneksyon, pagkakakilanlan ng account, at pagbuo ng kredensyal ng inference, na sinuri muli bago ang mga upstream na pagtatangka, kabilang ang muling pag-refresh ng kredensyal. Dapat na naitala ang mga tugon na tumawag sa mga IDs/item at tool-call ng Mga Pagkumpleto ng Chat IDs para sa session at henerasyong iyon.
- Ang mga SQLite `key_value` na tala sa `muse_session_ownership` namespace (`src/lib/db/museSessionOwnership.ts`) ay nagpapatuloy sa pagmamay-ari at ang pag-ikot ng cursor sa buong pag-restart. Nire-refresh ng bawat pag-claim at naihatid na tugon ang selyo ng aktibidad ng session; ang isang session na idle na mas mahaba kaysa sa `MUSE_SESSION_IDLE_TTL_MS` ay pinuputol (pin ng may-ari, inihain ang flag at naitala na mga hash opaque/reference ), nang hindi hihigit sa isang beses bawat 10 minuto at sa mga bounded na batch, kaya ang isang pag-replay sa ibang pagkakataon ng kasaysayan nito ay nabigong sarado bilang hindi kilalang may-ari. Naglalaman ang mga talaan ng koneksyon IDs at mga hash ng pagkakakilanlan ng account, mga kredensyal, opaque na nilalaman, at mga sanggunian sa pagpapatuloy, hindi mga lihim o kasaysayan ng pag-uusap. Dapat panatilihin at ipadala ng mga kliyente ang kanilang buong kasaysayan at hindi malinaw na pangangatwiran.
- Ang hindi kilala o dayuhang malabo na pangangatwiran, isang nawawalang may-ari, isang hindi available na account ng may-ari, o isang pagbabago sa henerasyon na may naitalang kasaysayan ay nabigong isinara nang may tahasang 4xx/503 — na hindi kailanman nanahimik na cross-account failover at hindi kailanman bumaba sa pangangatuwiran.
- Ang isang reminted na parehong-account na key ay pinagtibay lamang kapag ang session ay nagtala ng walang replayable na kasaysayan; ang mga naitalang session ay patuloy na nabigo sa pagsasara hanggang sa magsimulang bago.
- Ang isang walang laman na tugon sa upstream (`upstream_empty_response` / `empty_response`, walang ilalabas sa tumatawag) ay muling susubukan nang hindi hihigit sa dalawang beses sa parehong may-ari, pagkatapos ng 0.5 s pagkatapos ay 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Kung walang laman ang lahat ng pagtatangka, ibinabalik ang orihinal na 502 nang walang pagmarka ng cooldown o breaker, kaya hindi na-lock out ng isang patumpik-tumpik na tugon ang may-ari.
- Lahat ng hiling `muse-code` ay lampasan ang mga semantic-cache na nagbabasa at nagsusulat, kasama ang streaming na pagsusulat, kaya ang naka-cache na opaque na output ay hindi makakakuha ng ibang may-ari ng session.

Mga bantay ng regression: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, at `tests/unit/chatcore-semantic-cache.test.ts`.

## Tingnan din

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breaker, cooldown, model lockout
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — na nag-diagnose ng upstream 400s
- Pinagmulan: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ruta: `src/app/api/cache/reasoning/route.ts`
- Orihinal na isyu: #1628
