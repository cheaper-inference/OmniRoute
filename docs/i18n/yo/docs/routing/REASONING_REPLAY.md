# Reasoning Replay Cache (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Orísun òtítọ́:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Ìmúdójúìwọ̀n tó kẹ́yìn:** 2026-06-28 — v3.8.40

OmniRoute ń gba `reasoning_content` olùrànlọ́wọ́ tí àwọn àwòṣe ipò-ìrònú ṣẹ̀dá, ó sì ń tún un ṣe ní gbangba lórí àwọn ìbéèrè olóríṣiríṣi ìyípadà nígbà tí olùpèsè upstream bá nílò rẹ̀. Èyí ń mú àwọn àṣìṣe HTTP 400 tí àwọn olùpèsè tó muna ń gbé jáde kúrò, nígbà tí ìtàn ìjíròrò oníbàárà kò bá ní èrò láti ìyípadà tó ṣáájú.

## Ìdí Tí Èyí Fi Wà

Ọ̀pọ̀ àwọn olùpèsè ipò-ìrònú máa ń kọ ìyípadà àtẹ̀lé bí **ìfiránṣẹ́ olùrànlọ́wọ́ tó ṣáájú kò bá ní `reasoning_content` ojúlówó náà**. Upstream máa ń dá 400 padà pẹ̀lú àwọn ìfiránṣẹ́ bíi:

```
Párámítà Kò Tọ̀nà: A gbọ́dọ̀ fi reasoning_content inú ipò ìrònú padà sí API náà.
```

Ṣùgbọ́n àwọn oníbàárà tí a sábà máa ń lò (Cursor, Cline, Roo Code, OpenAI SDK) máa ń yọ `reasoning_content` kúrò nínú ìtàn tí wọ́n tún ń fi ránṣẹ́. OmniRoute máa ń mú un padà láti inú cache ẹgbẹ́ server kí ìbéèrè tí upstream rí lè wà ní ìbámu. Issue #1628 ló mú ìtọ́jú àkópọ̀ memory/SQLite wọlé kí cache náà lè yè lẹ́yìn ìbẹ̀rẹ̀ process tuntun.

## Àwòrán-ẹ̀rọ

```
Ìyípo N (olùrànlọ́wọ́ ń ṣe àgbéjáde):
  → èsì ní reasoning_content + tool_calls
  → bí requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      kọ̀wé sí (ìrántí + DB), pẹ̀lú gbogbo tool_call.id gẹ́gẹ́ bí kọ́kọ́rọ́
  → fi èsì ránṣẹ́ sí oníbàárà (èyí tí ó lè pa ìrònú mọ́ tàbí kí ó má pa á mọ́)

Ìyípo N+1 (oníbàárà fi ìtẹ̀lé ránṣẹ́):
  → olùtumọ̀ ṣàwárí pé: requiresReasoningReplay(provider, model) === true
  → fún ọ̀kọ̀ọ̀kan àwọn ìfiránṣẹ́ olùrànlọ́wọ́ tí ó ní tool_calls ṣùgbọ́n tí kò ní reasoning_content:
      lookupReasoning(toolCalls[0].id) → ìrántí → DB
      bá rí i  → msg.reasoning_content = cached; recordReplay()
      bí kò bá rí i → msg.reasoning_content = "" (ìpadàsẹ́yìn àtijọ́ fún DeepSeek àgbà)
  → ẹ̀ka òkè rí ìtàn tí ó bá ara rẹ̀ mu → kò sí 400
```

Ìgbàkọsílẹ̀ ń ṣẹlẹ̀ nínú `open-sse/handlers/chatCore.ts` (ní ibi méjì, ní àwọn ibi méjèèjì tí a ti pe `cacheReasoningFromAssistantMessage`). Ìtúnṣàgbéjáde ń ṣẹlẹ̀ nínú `open-sse/translator/index.ts` lẹ́yìn ìfipámú schema ṣùgbọ́n ṣáájú fífi ránṣẹ́.

Àwọn ìyípo olùrànlọ́wọ́ lasan (tí kì í ṣe tool-call) ní ọ̀nà míì tí a fi ń ṣe kọ́kọ́rọ́ wọn: `buildAssistantMessageCacheKey()` ń ṣe digest ti ààlà session pẹ̀lú transcript tó ti jẹ́ normalized ní OpenAI-format títí dé ìyípo yẹn, nítorí DeepSeek nílò ìrònú ti _gbogbo_ ìyípo ṣáájú nígbà tí `tools` bá wà. Fún àwọn ibi-àfojúsùn Responses-API (fún àpẹẹrẹ `opencode-go/deepseek-v4-flash`, tí a darí sí `/responses`), body tí a rán sí ẹ̀ka òkè ní `input`, kì í ṣe `messages`, nítorí náà `translateRequest()` (`open-sse/translator/index.ts`) ń jabo pivot transcript tí ó ṣe digest rẹ̀ nípasẹ̀ aṣàyàn callback, àwọn ibi ìgbàkọsílẹ̀ náà sì ń ṣe digest transcript kan náà. Ìpele ìtúnṣàgbéjáde Responses ń ṣiṣẹ́ lórí pivot OpenAI fún gbogbo source format, nítorí náà àwọn oníbàárà Anthropic Messages (Claude → OpenAI → Responses) tún ń gba ìtúnṣàgbéjáde.

## Ìpamọ́ — Àkópọ̀ Memory + SQLite

Ọ̀nà tí a sábà ń lò máa ń lo `Map` inú memory (LRU-gẹ́gẹ́-bí-àkókò-ẹ̀dá), tí tábìlì SQLite ń ṣe àtìlẹ́yìn fún un láti mú padà lẹ́yìn ìdálẹ́kun àti fún híhàn lórí dashboard.

| Ìpele  | Ìmúlò                                            | Ète                                        |
| ------ | ------------------------------------------------ | ------------------------------------------ |
| Memory | `Map` nínú `open-sse/services/reasoningCache.ts` | Ìṣàwárí kíákíá, yọ èyí tó ti pẹ́ jù ní 200  |
| DB     | Tábìlì `reasoning_cache` (`src/lib/db/`)         | Wà títí lẹ́yìn ìbẹ̀rẹ̀ tuntun, ó ń pèsè stats |

A máa ń kọ sí méjèèjì. Ìkà máa ń kọ́kọ́ ṣàyẹ̀wò memory, lẹ́yìn náà ó máa ń lo DB bí kò bá rí i (àwọn àbájáde DB ni a máa ń gbé padà sínú memory). Ìkùnà DB kì í dá iṣẹ́ dúró — cache inú memory máa ń tẹ̀síwájú láti ṣiṣẹ́ fún ọ̀nà tí a sábà ń lò.

**Àwọn iye àkọ́kọ́:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Àpapọ̀ àkọọlẹ̀ memory tó pọ̀ jù: `200` (`MAX_MEMORY_ENTRIES`)
- Ìyọkúrò: `createdAt` tó ti pẹ́ jù ni àkọ́kọ́

## Àwòrán Ìpìlẹ̀ Data

Ìṣíkiri: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Àwọn atọ́ka: `expires_at`, `provider`, `model`, `created_at`. A máa ń tọ́jú `expires_at` gẹ́gẹ́ bí ìṣẹ́jú-àáyá epoch Unix; ipele SELECT máa ń ṣe àwọn iye ọ̀rọ̀ àtijọ́ ní ìbámu pẹ̀lú ìlànà kan náà nípasẹ̀ `EXPIRES_AT_EPOCH_SQL`.

## Ìṣàwárí Olùpèsè / Mọ́dẹ́lì

A máa ń mú àtúnṣeré ṣiṣẹ́ nígbà tí `requiresReasoningReplay(provider, model)` bá dá `true` padà. Fọ́ńṣọ̀nù náà ń ṣàyẹ̀wò àkójọ méjì nínú `open-sse/services/reasoningCache.ts`.

**Àwọn ID olùpèsè (ìbámu pípé, láìka lẹ́tà ńlá tàbí kékeré sí):**

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

**Àwọn àpẹẹrẹ regex mọ́dẹ́lì (láìka lẹ́tà ńlá tàbí kékeré sí):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` àti `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, àfikún `-free` tí kò pọndandan)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Fífi olùpèsè/mọ́dẹ́lì tó muna tuntun kún un túmọ̀ sí fífi í sí ọ̀kan lára àwọn àkójọ wọ̀nyí àti kíkọ ìdánwò ẹyọ kan tó jẹ́rìí fífi àtúnṣeré sínú rẹ̀. Àpèjúwe PR gbọ́dọ̀ tọ́ka sí gbolóhùn upstream 400 gan-an tó fa ìyípadà náà.

## REST API

Kaṣe náà ṣí àwọn endpoint méjì sílẹ̀ lábẹ́ `src/app/api/cache/reasoning/route.ts`. Àwọn méjèèjì nílò ìfàṣẹsí ìṣàkóso (`isAuthenticated` láti `@/shared/utils/apiAuth`).

| Ọ̀nà    | Endpoint                                                  | Àpèjúwe                                                      |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Ìṣirò + àwọn àkọọlẹ̀ tí a pín sí ojúewé                       |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Àkójọ tí a ti ṣàlẹ̀mọ́ (`limit` ni a fi mọ́ àárín `[1, 200]`)   |
| DELETE | `/api/cache/reasoning`                                    | Pa gbogbo rẹ̀ rẹ́ (memory + DB), kí o sì tún iye hit/miss ṣètò |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Pa àwọn àkọọlẹ̀ olùpèsè kan ṣoṣo rẹ́                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Pa àkọọlẹ̀ kan ṣoṣo rẹ́                                        |

**Ìrísí ìdáhùn GET:**

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

## Àwọn Àkíyèsí Ìṣiṣẹ́

- **Ìfọ̀mọ́:** `cleanupReasoningCache()` ń yọ àwọn àkọọlẹ̀ memory tí àkókò wọn ti parí, ó sì ń ṣiṣẹ́ `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Àwọn worker àyẹ̀wò ìlera máa ń pe èyí lẹ́ẹ̀kọ̀ọ̀kan.
- **Ìmúpadàbọ̀sípò lẹ́yìn ìjákulẹ̀:** Lẹ́yìn àtún bẹ̀rẹ̀, memory máa ṣófo ṣùgbọ́n DB ṣì máa ní àwọn àkọọlẹ̀ tí àkókò wọn kò tíì parí. Ìṣàwárí àkọ́kọ́ fún `tool_call_id` kan jẹ́ hit DB; àwọn ìṣàwárí tó tẹ̀ lé e jẹ́ hit memory.
- **Kò sí ìrònú, kò sí kaṣe:** `cacheReasoningFromAssistantMessage` máa dá `0` padà nígbà tí ìfiránṣẹ́ olùrànlọ́wọ́ kò bá ní pápá `reasoning_content` / `reasoning`, nítorí náà àwọn ìdáhùn tí kì í ṣe ti ìrònú kò ná ohunkóhun.
- **A tún ń ṣàkóso ìkọ̀wé:** àwọn ibi ìpè méjèèjì nínú `chatCore.ts` (èyí tí kì í ṣe streaming àti èyí tí ó jẹ́ streaming) máa ń pe `cacheReasoningFromAssistantMessage()` nìkan nígbà tí `requiresReasoningReplay(provider, model)` bá jẹ́ `true` — predicate kan náà tí apá kíkà ń ṣàyẹ̀wò. Àwọn ìfisílẹ̀ tí kò bá lo olùpèsè àtúnṣeré láéláé kò ní san owó iṣẹ́ ìkọ̀wé, ìmúdójúìwọ̀n index, àti try/catch lórí gbogbo ìdáhùn tó ní ìrònú mọ́.
- **Àwọn olùpèsè tí kò muna:** Nígbà tí `requiresReasoningReplay` bá jẹ́ `false` tí fọ́ọ̀mù àfojúsùn sì jẹ́ OpenAI, atúmọ̀ náà máa ń **yọ** pápá `reasoning_content` èyíkéyìí kúrò nínú àwọn ìfiránṣẹ́ tí ń jáde — OpenAI Chat Completions kò gbà á.

## Ìní opaque reasoning ti Muse

Muse (`muse-code`) ń dá opaque reasoning tí a so mọ́ ẹni tó pè é padà (`encrypted_content`). Ṣíṣe replay rẹ̀ ní abẹ́ àkọọ́lẹ̀ mìíràn tàbí pẹ̀lú ìwé-ẹ̀rí ìwọlé tí a tún pèsè ń kùnà ní upstream, nítorí náà native OAuth request ń lo ìní ní ìpele session dípò ìyípadà fún request kọ̀ọ̀kan (`src/sse/services/museSessionOwnership.ts`, tí a ń fi òfin mú ní `src/sse/handlers/chat.ts`). API-key connection tí a yàn ní kedere àti configuration API key nìkan ń pa routing tó wà tẹ́lẹ̀ mọ́ láì lo ownership mode yìí.

- Pèsè session ID tó dúró ṣinṣin lórí turn kọ̀ọ̀kan: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, tàbí `x-codex-session-id`; tàbí lo `prompt_cache_key`, `session_id`, `conversation_id`, tàbí `metadata.session_id` nínú body (ní ọ̀nà ìṣáájú yẹn). ID tí kò sí tàbí tí ó ṣófo ń dá 400 padà nígbà tí native OAuth account méjì tàbí ju bẹ́ẹ̀ lọ bá ń ṣiṣẹ́; pẹ̀lú OAuth account kan, kò sí òmíràn láti yí sí, nítorí náà request yẹn ń pa routing tí kò ní pin mọ́. Scope náà ní OmniRoute API-key ID ẹni tó pè é nínú.
- Session tuntun tí kò gbára lé ara wọn ń ṣe round-robin láàárín native OAuth account tí ń ṣiṣẹ́ tí API-key connection policy yọ̀ǹda, ní ìtòlẹ́sẹẹsẹ connection ID. Round-robin ń fo àkọọ́lẹ̀ tó wà ní connection cooldown, tó ní terminal status (`banned`, `expired`, `credits_exhausted`), tàbí tí ó ní model-lock fún model tí a béèrè. Ìkùnà upstream Muse ń ṣe àkọsílẹ̀ cooldown àti breaker state bí àwọn provider yòókù. Connection tí a fi tipátipá yàn ní kedere ń fo round-robin fún session tuntun, ṣùgbọ́n kò lè rọ́pò ẹni tó ní i lẹ́yìn tó ti fúnni ní ìdáhùn tó ṣàṣeyọrí.
- Títí ẹni tó ní i yóò fi pèsè ìdáhùn tó ṣàṣeyọrí, session tí ẹni tó ní i kò sí mọ́ ni a ń tún fi lé àkọọ́lẹ̀ tó dára lọ́wọ́. Lẹ́yìn ìdáhùn àkọ́kọ́ tó ṣàṣeyọrí, session ń bá ẹni tó ní i dúró títí yóò fi wà láì ṣiṣẹ́ fún ọjọ́ 30 (`MUSE_SESSION_IDLE_TTL_MS`).
- Continuation àti tool-result turn kọ̀ọ̀kan ń bá ẹni tó ní session dúró: connection, account identity àti generation inference credential, tí a ń tún ṣàyẹ̀wò ṣáájú upstream attempt, pẹ̀lú credential-refresh retry. A gbọ́dọ̀ ti ṣe àkọsílẹ̀ Responses call ID/item reference àti Chat Completions tool-call ID fún session àti generation yẹn.
- SQLite `key_value` record nínú namespace `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) ń pa ownership àti rotation cursor mọ́ kọjá restart. Claim kọ̀ọ̀kan àti ìdáhùn tí a pèsè ń sọ àmì ìṣiṣẹ́ session di tuntun; session tí kò ṣiṣẹ́ fún àkókò tó ju `MUSE_SESSION_IDLE_TTL_MS` lọ ni a ń fọ mọ́ (owner pin, served flag àti opaque/reference hash tí a ṣe àkọsílẹ̀), kì í ju ẹ̀ẹ̀kan lọ nínú ìṣẹ́jú 10, nínú batch tí ó ní ààlà, kí replay ìtàn rẹ̀ lẹ́yìn náà lè jẹ́ kíkọ̀ fún ààbò bí ẹni tó ní i kò ṣe jẹ́ mímọ̀. Record ní connection ID àti hash account identity, credential, opaque content àti continuation reference, kì í ṣe àṣírí tàbí ìtàn ìjíròrò. Client gbọ́dọ̀ pa gbogbo ìtàn àti opaque reasoning wọn mọ́, kí wọ́n sì rán wọn.
- Opaque reasoning tí a kò mọ̀ tàbí ti ẹlòmíràn, ẹni tó ní i tí ó sọnù, àkọọ́lẹ̀ ẹni tó ní i tí kò sí, tàbí ìyípadà generation nígbà tí ìtàn ti wà ní àkọsílẹ̀ ń jẹ́ kíkọ̀ fún ààbò pẹ̀lú 4xx/503 tó hàn kedere; kò sí failover ìkọ̀kọ̀ sí àkọọ́lẹ̀ mìíràn, a kò sì ju reasoning nù.
- Key tí a tún pèsè fún àkọọ́lẹ̀ kan náà ni a ń gba kìkì bí session kò bá ti ṣe àkọsílẹ̀ ìtàn tí a lè replay; session tí ó ní àkọsílẹ̀ ń tẹ̀síwájú nínú kíkọ̀ fún ààbò títí a ó fi bẹ̀rẹ̀ tuntun.
- Ìdáhùn upstream ṣófo (`upstream_empty_response` / `empty_response`, kò sí ohun tí a fi rán ẹni tó pè é) ni a ń tún gbìyànjú láì ju ẹ̀ẹ̀mejì lọ lórí ẹni tó ní i kan náà, lẹ́yìn 0.5 s, lẹ́yìn náà 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Bí gbogbo attempt bá ṣófo, a ń dá 502 àkọ́kọ́ padà láì fi àmì cooldown tàbí breaker sí i, kí ìdáhùn tí kò dúró ṣinṣin má bàa ti ẹni tó ní i síta.
- Gbogbo request `muse-code` ń fo semantic-cache read àti write, pẹ̀lú streaming write, kí opaque output tí ó wà ní cache má bàa gba ẹni tó ní session mìíràn.

Àwọn ìdáàbòbo regression: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, àti `tests/unit/chatcore-semantic-cache.test.ts`.

## Tún Wo Èyí Pẹ̀lú

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — àwọn olùdáwọ́dúró àyíká, àwọn àkókò ìtútù, àti dídènà àwọn àwòṣe
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ṣíṣe àyẹ̀wò àwọn àṣìṣe 400 láti upstream
- Kóòdù ìpilẹ̀ṣẹ̀: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Ìṣíkiri: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Ojú-ọ̀nà API: `src/app/api/cache/reasoning/route.ts`
- Ọ̀ràn ìpilẹ̀ṣẹ̀: #1628
