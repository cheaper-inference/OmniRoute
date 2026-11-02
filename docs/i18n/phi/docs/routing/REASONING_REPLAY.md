# Reasoning Replay Cache (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Huling na-update:** 2026-06-28 — v3.8.40

Kinukuha ng OmniRoute ang `reasoning_content` ng assistant na nililikha ng mga thinking-mode model at malinaw itong muling ipinapasa sa mga multi-turn request kapag hinihingi ito ng upstream provider. Inaalis nito ang mga HTTP 400 error na ibinabalik ng mahihigpit na provider kapag nawawala sa history ng pag-uusap ng client ang reasoning mula sa nakaraang turn.

## Bakit Ito Umiiral

Tinatanggihan ng ilang thinking-mode provider ang follow-up turn maliban kung **kasama sa nakaraang assistant message ang orihinal na `reasoning_content`**. Nagbabalik ang upstream ng 400 na may mga mensaheng tulad nito:

```
Param Incorrect: Ang reasoning_content sa thinking mode ay dapat muling ipasa sa API.
```

Ngunit karaniwang inaalis ng mga client (Cursor, Cline, Roo Code, OpenAI SDK) ang `reasoning_content` mula sa history na muli nilang ipinapasa. Ibinabalik ito ng OmniRoute mula sa server-side cache upang maging pare-pareho ang request na nakikita ng upstream. Ipinakilala ng Issue #1628 ang hybrid memory/SQLite persistence upang manatili ang cache kahit mag-restart ang proseso.

## Arkitektura

```
Yugto N (bumubuo ang assistant):
  → naglalaman ang tugon ng reasoning_content + tool_calls
  → kung requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      nagsusulat sa (memory + DB), na may key batay sa bawat tool_call.id
  → ipinapasa ang tugon sa client (na maaaring panatilihin o hindi ang reasoning)

Yugto N+1 (nagpapadala ang client ng kasunod na mensahe):
  → natutukoy ng translator na: requiresReasoningReplay(provider, model) === true
  → para sa bawat mensahe ng assistant na may tool_calls at walang reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      may nahanap  → msg.reasoning_content = cached; recordReplay()
      walang nahanap → msg.reasoning_content = "" (legacy na fallback para sa mas lumang DeepSeek)
  → nakakakita ang upstream ng pare-parehong history → walang 400
```

Nagaganap ang pag-capture sa `open-sse/handlers/chatCore.ts` (sa dalawang lokasyon, sa dalawang call site ng `cacheReasoningFromAssistantMessage`). Nagaganap ang replay sa `open-sse/translator/index.ts` pagkatapos ng schema coercion ngunit bago ang dispatch.

Iba ang paraan ng pag-key sa mga plain (walang tool call) na yugto ng assistant: dini-digest ng `buildAssistantMessageCacheKey()` ang session scope kasama ang normalized na transcript sa OpenAI format hanggang sa yugtong iyon, dahil kinakailangan ng DeepSeek ang reasoning ng _bawat_ naunang yugto kapag naroon ang `tools`. Para sa mga target ng Responses API (halimbawa, `opencode-go/deepseek-v4-flash`, na niru-route sa `/responses`), `input` ang nilalaman ng upstream body, hindi `messages`, kaya iniuulat ng `translateRequest()` (`open-sse/translator/index.ts`) sa pamamagitan ng callback option ang pivot transcript na na-digest nito, at dini-digest din ng mga capture site ang parehong transcript. Tumatakbo ang Responses replay pass sa OpenAI pivot para sa bawat source format, kaya nare-replay rin ang mga Anthropic Messages client (Claude → OpenAI → Responses).

## Storage — Hybrid Memory + SQLite

Gumagamit ang hot path ng in-memory na `Map` (LRU-ayon-sa-paglikha) na sinusuportahan ng isang SQLite table para sa pagbawi mula sa crash at visibility sa dashboard.

| Layer  | Implementasyon                                 | Layunin                                             |
| ------ | ---------------------------------------------- | --------------------------------------------------- |
| Memory | `Map` sa `open-sse/services/reasoningCache.ts` | Mabilis na lookup, inaalis ang pinakaluma sa 200    |
| DB     | `reasoning_cache` table (`src/lib/db/`)        | Nananatili sa mga restart, pinagmumulan ng mga stat |

Isinusulat ang data sa pareho. Tinitingnan muna ng mga read ang memory, pagkatapos ay gumagamit ng DB bilang fallback (ang mga hit sa DB ay muling inilalagay sa memory). Hindi nakamamatay ang mga failure sa DB — patuloy na pinagsisilbihan ng in-memory cache ang hot path.

**Mga default:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Pinakamaraming entry sa memory: `200` (`MAX_MEMORY_ENTRIES`)
- Eviction: inuuna ang pinakalumang `createdAt`

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

Mga index: `expires_at`, `provider`, `model`, `created_at`. Iniimbak ang `expires_at` bilang mga segundo ng Unix epoch; ginagawang pamantayan ng SELECT layer ang mga legacy na text value sa pamamagitan ng `EXPIRES_AT_EPOCH_SQL`.

## Pag-detect ng Provider / Model

Naka-enable ang replay kapag nagbalik ng `true` ang `requiresReasoningReplay(provider, model)`. Sinusuri ng function ang dalawang listahan sa `open-sse/services/reasoningCache.ts`.

**Mga Provider ID (eksaktong tugma, hindi sensitibo sa case):**

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

**Mga regex pattern ng model (hindi sensitibo sa case):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` at `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opsyonal na suffix na `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Ang pagdaragdag ng bagong mahigpit na provider/model ay nangangahulugang pagdaragdag nito sa isa sa mga listahang ito at pagsulat ng unit test na nagpapatunay sa replay injection. Dapat banggitin sa paglalarawan ng PR ang eksaktong upstream na 400 string na naging dahilan ng pagbabago.

## REST API

Naglalantad ang cache ng dalawang endpoint sa ilalim ng `src/app/api/cache/reasoning/route.ts`. Parehong nangangailangan ng authentication para sa pamamahala (`isAuthenticated` mula sa `@/shared/utils/apiAuth`).

| Pamamaraan | Endpoint                                                  | Paglalarawan                                                       |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| GET        | `/api/cache/reasoning`                                    | Mga istatistika + mga naka-pagination na entry                     |
| GET        | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Na-filter na listahan (ang `limit` ay nililimitahan sa `[1, 200]`) |
| DELETE     | `/api/cache/reasoning`                                    | Burahin ang lahat (memory + DB) at i-reset ang bilang ng hit/miss  |
| DELETE     | `/api/cache/reasoning?provider=deepseek`                  | Burahin lamang ang mga entry para sa isang provider                |
| DELETE     | `/api/cache/reasoning?toolCallId=call_abc`                | Burahin ang isang entry                                            |

**Hugis ng tugon sa GET:**

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

## Mga Tala sa Operasyon

- **Paglilinis:** Tinatanggal ng `cleanupReasoningCache()` ang mga nag-expire na entry sa memory at pinapatakbo ang `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pana-panahong tinatawag ito ng mga health-check worker.
- **Pag-recover mula sa crash:** Pagkatapos ng restart, walang laman ang memory ngunit nananatili sa DB ang mga hindi pa nag-e-expire na entry. Ang unang lookup para sa isang partikular na `tool_call_id` ay isang DB hit; ang mga susunod na lookup ay mga memory hit.
- **Walang reasoning, walang cache:** Nagbabalik ang `cacheReasoningFromAssistantMessage` ng `0` kapag walang field na `reasoning_content` / `reasoning` ang mensahe ng assistant, kaya walang dagdag na gastos ang mga tugong hindi gumagamit ng thinking.
- **May gate din ang pagsusulat:** Tinatawag lamang ng parehong call site sa `chatCore.ts` (non-streaming at streaming) ang `cacheReasoningFromAssistantMessage()` kapag `true` ang `requiresReasoningReplay(provider, model)` — ang parehong predicate na sinusuri ng read side. Ang mga installation na hindi kailanman gumagamit ng replay provider ay hindi na magbabayad para sa pagsusulat, pag-update ng index, at try/catch sa bawat tugong naglalaman ng reasoning.
- **Mga non-strict na provider:** Kapag `false` ang `requiresReasoningReplay` at OpenAI ang target na format, **tinatanggal** ng translator ang anumang field na `reasoning_content` mula sa mga papalabas na mensahe — hindi ito tinatanggap ng OpenAI Chat Completions.

## Pagmamay-ari ng opaque reasoning ng Muse

Nagbabalik ang Muse (`muse-code`) ng opaque reasoning na nakatali sa tumatawag (`encrypted_content`). Nabibigo sa upstream ang pag-replay nito sa ibang account o gamit ang muling inilabas na credential, kaya gumagamit ang mga native OAuth request ng pagmamay-ari sa antas ng session sa halip na rotation sa bawat kahilingan (`src/sse/services/museSessionOwnership.ts`, na ipinapatupad sa `src/sse/handlers/chat.ts`). Pinananatili ng mga tahasang piniling API-key connection at mga configuration na API key lamang ang umiiral nilang routing nang wala ang ownership mode na ito.

- Magbigay ng matatag na session ID sa bawat turn: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, o `x-codex-session-id`; maaari ring gamitin ang `prompt_cache_key`, `session_id`, `conversation_id`, o `metadata.session_id` sa body (sa ganoong pagkakasunod ng prayoridad). Nagbabalik ng 400 ang nawawala o blankong ID kapag aktibo ang dalawa o higit pang native OAuth account; kapag iisa ang OAuth account, walang ibang paglilipatan, kaya pinananatili ng kahilingang iyon ang routing na walang pin. Kasama sa scope ang OmniRoute API-key ID ng tumatawag.
- Ang mga bagong hiwalay na session ay umiikot sa mga aktibong native OAuth account na pinapahintulutan ng API-key connection policy, ayon sa pagkakaayos ng connection ID. Nilalaktawan ng round-robin ang mga account na nasa connection cooldown, may terminal status (`banned`, `expired`, `credits_exhausted`), o naka-model-lock para sa hinihinging model; itinatala ng mga upstream failure ng Muse ang cooldown at breaker state tulad ng ibang provider. Nilalaktawan ng tahasang sapilitang koneksyon ang round-robin para sa bagong session ngunit hindi nito mapapalitan ang may-ari matapos itong makapagbigay ng matagumpay na tugon.
- Hangga't hindi nakakapagbigay ng matagumpay na tugon ang may-ari, muling inaangkin ng isang malusog na account ang session kapag hindi na available ang may-ari nito. Pagkatapos ng unang matagumpay na tugon, nananatiling naka-pin ang session sa may-aring iyon hanggang hindi ito magamit nang 30 araw (`MUSE_SESSION_IDLE_TTL_MS`).
- Bawat continuation at tool-result turn ay nananatiling naka-pin sa may-ari ng session: koneksyon, account identity, at generation ng inference credential, na sinusuri muli bago ang mga upstream attempt, kasama ang credential-refresh retry. Dapat naitala para sa session at generation na iyon ang mga Responses call ID/item reference at Chat Completions tool-call ID.
- Pinananatili ng mga SQLite `key_value` record sa namespace na `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) ang pagmamay-ari at rotation cursor sa mga restart. Bawat claim at naihatid na tugon ay nagre-refresh sa activity stamp ng session; nililinis ang session na idle nang mas matagal sa `MUSE_SESSION_IDLE_TTL_MS` (owner pin, served flag at mga naitalang opaque/reference hash), hindi mas madalas sa isang beses bawat 10 minuto at sa mga limitadong batch, kaya ligtas na tinatanggihan ang susunod na replay ng history nito dahil hindi kilala ang may-ari. Connection ID at mga hash ng account identity, credential, opaque content, at continuation reference ang laman ng mga record, hindi mga lihim o conversation history. Kailangang panatilihin at ipadala ng mga client ang kanilang buong history at opaque reasoning.
- Ang hindi kilala o dayuhang opaque reasoning, nawawalang may-ari, hindi available na account ng may-ari, o pagbabago ng generation na may naitalang history ay ligtas na tinatanggihan na may tahasang 4xx/503; walang tahimik na failover sa ibang account at walang reasoning na itinatapon.
- Tinatanggap lamang ang muling inilabas na key ng parehong account kapag walang naitalang history ang session na maaaring i-replay; patuloy na ligtas na tinatanggihan ang mga session na may rekord hanggang magsimula nang panibago.
- Ang walang-lamang upstream response (`upstream_empty_response` / `empty_response`, walang naipadala sa tumatawag) ay muling sinusubukan nang hindi hihigit sa dalawang beses sa parehong may-ari, pagkalipas ng 0.5 s at pagkatapos ay 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Kung walang laman ang lahat ng attempt, ibinabalik ang orihinal na 502 nang walang cooldown o breaker marking, kaya hindi kailanman nalo-lock out ang may-ari dahil sa hindi matatag na tugon.
- Nilalaktawan ng lahat ng `muse-code` request ang mga read at write ng semantic cache, kabilang ang streaming write, upang hindi magkaroon ng ibang may-ari ng session ang naka-cache na opaque output.

Mga pananggalang sa regression: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, at `tests/unit/chatcore-semantic-cache.test.ts`.

## Tingnan Din

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — mga circuit breaker, cooldown, at pag-lockout ng modelo
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — pag-diagnose ng mga upstream na 400 error
- Source: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API route: `src/app/api/cache/reasoning/route.ts`
- Orihinal na isyu: #1628
