# Reasoning Replay Cache (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **ប្រភពពិតប្រាកដ:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ:** 2026-06-28 — v3.8.40

OmniRoute ចាប់យក `reasoning_content` របស់ assistant ដែលបង្កើតដោយម៉ូដែលក្នុង thinking-mode ហើយចាក់វាឡើងវិញដោយតម្លាភាពលើសំណើច្រើនវេន នៅពេល upstream provider តម្រូវឱ្យមានវា។ វាលុបបំបាត់កំហុស HTTP 400 ដែល provider ដែលមានលក្ខខណ្ឌតឹងរ៉ឹងបញ្ចេញ នៅពេលប្រវត្តិសន្ទនារបស់ client បាត់ reasoning ពីវេនមុន។

## ហេតុអ្វីបានជាវាមាន

thinking-mode provider មួយចំនួនបដិសេធវេនបន្ទាប់ លុះត្រាតែ **សាររបស់ assistant មុនមាន `reasoning_content` ដើម**។ Upstream ត្រឡប់ 400 ជាមួយសារដូចជា៖

```
ប៉ារ៉ាម៉ែត្រមិនត្រឹមត្រូវ៖ reasoning_content ក្នុង thinking mode ត្រូវតែបញ្ជូនត្រឡប់ទៅ API។
```

ប៉ុន្តែ client ទូទៅ (Cursor, Cline, Roo Code, OpenAI SDK) ដក `reasoning_content` ចេញពីប្រវត្តិដែលពួកវាចាក់ឡើងវិញ។ OmniRoute ស្ដារវាពី cache នៅផ្នែក server ដើម្បីឱ្យសំណើដែល upstream មើលឃើញមានភាពស៊ីសង្វាក់គ្នា។ Issue #1628 បានណែនាំការរក្សាទុកបែបកូនកាត់ memory/SQLite ដើម្បីឱ្យ cache នៅតែមានបន្ទាប់ពី process ចាប់ផ្ដើមឡើងវិញ។

## ស្ថាបត្យកម្ម

```
វេន N (ជំនួយការបង្កើត):
  → ការឆ្លើយតបមាន reasoning_content + tool_calls
  → ប្រសិនបើ requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      សរសេរ (អង្គចងចាំ + DB) ដោយប្រើ tool_call.id នីមួយៗជាសោ
  → បញ្ជូនការឆ្លើយតបទៅម៉ាស៊ីនភ្ញៀវ (ដែលអាចរក្សាទុក ឬមិនរក្សាទុក reasoning)

វេន N+1 (ម៉ាស៊ីនភ្ញៀវផ្ញើសារបន្ត):
  → កម្មវិធីបកប្រែរកឃើញថា: requiresReasoningReplay(provider, model) === true
  → សម្រាប់សាររបស់ជំនួយការនីមួយៗដែលមាន tool_calls ហើយគ្មាន reasoning_content:
      lookupReasoning(toolCalls[0].id) → អង្គចងចាំ → DB
      រកឃើញ  → msg.reasoning_content = cached; recordReplay()
      រកមិនឃើញ → msg.reasoning_content = "" (ជម្រើសជំនួសបែបចាស់សម្រាប់ DeepSeek ជំនាន់ចាស់)
  → ប្រព័ន្ធខាងលើមើលឃើញប្រវត្តិស៊ីសង្វាក់គ្នា → គ្មាន 400
```

ការចាប់យកកើតឡើងនៅក្នុង `open-sse/handlers/chatCore.ts` (ពីរទីតាំង គឺនៅទីតាំងហៅ `cacheReasoningFromAssistantMessage` ទាំងពីរ)។ ការចាក់ឡើងវិញកើតឡើងនៅក្នុង `open-sse/translator/index.ts` បន្ទាប់ពីការបង្ខំឱ្យត្រូវតាមគ្រោងការណ៍ ប៉ុន្តែមុនពេលបញ្ជូនបន្ត។

វេនរបស់ជំនួយការធម្មតា (ដែលមិនមែនជាការហៅឧបករណ៍) ត្រូវបានកំណត់សោតាមវិធីផ្សេង៖ `buildAssistantMessageCacheKey()` បង្កើតសេចក្ដីសង្ខេបពីវិសាលភាពសម័យ រួមជាមួយកំណត់ត្រាសន្ទនាទម្រង់ OpenAI ដែលបានធ្វើឱ្យមានទម្រង់ស្តង់ដារ រហូតដល់វេននោះ ព្រោះ DeepSeek តម្រូវឱ្យមាន reasoning នៃវេនមុនៗ _ទាំងអស់_ នៅពេលមាន `tools`។ សម្រាប់គោលដៅ Responses-API (ឧទាហរណ៍ `opencode-go/deepseek-v4-flash` ដែលត្រូវបានបញ្ជូនទៅ `/responses`) តួសំណើខាងលើមាន `input` មិនមែន `messages` ទេ ដូច្នេះ `translateRequest()` (`open-sse/translator/index.ts`) រាយការណ៍កំណត់ត្រាសន្ទនាចំណុចកណ្ដាលដែលវាបានបង្កើតសេចក្ដីសង្ខេប តាមរយៈជម្រើស callback ហើយទីតាំងចាប់យកទាំងនោះក៏បង្កើតសេចក្ដីសង្ខេបពីកំណត់ត្រាសន្ទនាដូចគ្នានោះដែរ។ ដំណាក់កាលចាក់ឡើងវិញរបស់ Responses ដំណើរការលើចំណុចកណ្ដាល OpenAI សម្រាប់គ្រប់ទម្រង់ប្រភព ដូច្នេះម៉ាស៊ីនភ្ញៀវ Anthropic Messages (Claude → OpenAI → Responses) ក៏ត្រូវបានចាក់ឡើងវិញផងដែរ។

## ការផ្ទុក — Memory + SQLite បែបកូនកាត់

Hot path ប្រើ `Map` ក្នុង memory (LRU តាមពេលបង្កើត) ដែលគាំទ្រដោយតារាង SQLite សម្រាប់ការស្ដារឡើងវិញក្រោយ crash និងភាពអាចមើលឃើញនៅលើ dashboard។

| ស្រទាប់ | ការអនុវត្ត                                        | គោលបំណង                                                   |
| ------- | ------------------------------------------------- | --------------------------------------------------------- |
| Memory  | `Map` ក្នុង `open-sse/services/reasoningCache.ts` | ការស្វែងរកលឿន ដកធាតុចាស់បំផុតចេញនៅចំនួន 200               |
| DB      | តារាង `reasoning_cache` (`src/lib/db/`)           | រក្សាទុកឆ្លងកាត់ការចាប់ផ្ដើមឡើងវិញ និងផ្ដល់ទិន្នន័យស្ថិតិ |

ការសរសេរត្រូវបានធ្វើទៅទាំងពីរ។ ការអានពិនិត្យ memory ជាមុនសិន បន្ទាប់មកត្រឡប់ទៅប្រើ DB ប្រសិនបើរកមិនឃើញ (លទ្ធផលដែលរកឃើញក្នុង DB ត្រូវបានដាក់ត្រឡប់ចូល memory)។ ការបរាជ័យរបស់ DB មិនបណ្ដាលឱ្យប្រព័ន្ធឈប់ដំណើរការទេ — cache ក្នុង memory បន្តបម្រើ hot path។

**តម្លៃលំនាំដើម:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- ចំនួនធាតុអតិបរមាក្នុង memory: `200` (`MAX_MEMORY_ENTRIES`)
- ការដកចេញ: `createdAt` ចាស់បំផុតមុន

## គ្រោងការណ៍មូលដ្ឋានទិន្នន័យ

ការផ្លាស់ប្តូរគ្រោងការណ៍៖ `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

លិបិក្រម៖ `expires_at`, `provider`, `model`, `created_at`។ `expires_at` ត្រូវបានរក្សាទុកជាចំនួនវិនាទីនៃ Unix epoch; ស្រទាប់ SELECT ធ្វើឱ្យតម្លៃអត្ថបទចាស់ៗមានទម្រង់ស្តង់ដារតាមរយៈ `EXPIRES_AT_EPOCH_SQL`។

## ការរកឃើញ Provider / Model

Replay ត្រូវបានបើកនៅពេល `requiresReasoningReplay(provider, model)` ត្រឡប់ `true`។ អនុគមន៍នេះពិនិត្យបញ្ជីពីរនៅក្នុង `open-sse/services/reasoningCache.ts`។

**Provider IDs (ផ្គូផ្គងដាច់ខាត ដោយមិនប្រកាន់អក្សរធំតូច):**

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

**លំនាំ regex របស់ Model (មិនប្រកាន់អក្សរធំតូច):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` និង `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro ជាមួយបច្ច័យ `-free` ដែលអាចមានឬមិនមាន)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

ការបន្ថែម provider/model ថ្មីដែលមានលក្ខខណ្ឌតឹងរ៉ឹង មានន័យថាត្រូវបន្ថែមវាទៅក្នុងបញ្ជីមួយក្នុងចំណោមបញ្ជីទាំងនេះ និងសរសេរ unit test ដើម្បីបញ្ជាក់ពីការបញ្ចូល replay។ សេចក្ដីពិពណ៌នា PR គួរតែយោងខ្សែអក្សរ upstream 400 ដាច់ខាត ដែលជាមូលហេតុនាំឱ្យមានការផ្លាស់ប្ដូរនេះ។

## REST API

Cache ផ្ដល់ endpoint ចំនួនពីរនៅក្រោម `src/app/api/cache/reasoning/route.ts`។ ទាំងពីរតម្រូវឱ្យមានការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវសម្រាប់ការគ្រប់គ្រង (`isAuthenticated` ពី `@/shared/utils/apiAuth`)។

| Method | Endpoint                                                  | ការពិពណ៌នា                                                     |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | ស្ថិតិ + ធាតុដែលបែងចែកជាទំព័រ                                  |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | បញ្ជីដែលបានត្រង (`limit` ត្រូវបានកម្រិតក្នុងចន្លោះ `[1, 200]`) |
| DELETE | `/api/cache/reasoning`                                    | សម្អាតទាំងអស់ (memory + DB) និងកំណត់ចំនួន hit/miss ឡើងវិញ      |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | សម្អាតតែធាតុសម្រាប់ provider មួយប៉ុណ្ណោះ                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | លុបធាតុតែមួយ                                                   |

**ទម្រង់ response របស់ GET:**

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

## កំណត់សម្គាល់ប្រតិបត្តិការ

- **ការសម្អាត:** `cleanupReasoningCache()` លុបចោលធាតុ memory ដែលផុតកំណត់ និងដំណើរការ `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`។ Worker ពិនិត្យសុខភាពហៅវាជាប្រចាំ។
- **ការស្ដារឡើងវិញបន្ទាប់ពីគាំង:** បន្ទាប់ពីចាប់ផ្ដើមឡើងវិញ memory គឺទទេ ប៉ុន្តែ DB នៅតែរក្សាធាតុដែលមិនទាន់ផុតកំណត់។ ការស្វែងរកលើកដំបូងសម្រាប់ `tool_call_id` ដែលបានផ្ដល់ គឺជា DB hit; ការស្វែងរកជាបន្តបន្ទាប់គឺជា memory hit។
- **គ្មាន reasoning គ្មាន cache:** `cacheReasoningFromAssistantMessage` ត្រឡប់ `0` នៅពេលសារ assistant មិនមាន field `reasoning_content` / `reasoning` ដូច្នេះ response ដែលមិនប្រើការគិតមិនចំណាយអ្វីឡើយ។
- **ការសរសេរក៏ត្រូវបានគ្រប់គ្រងដោយលក្ខខណ្ឌផងដែរ:** call site ទាំងពីរនៅក្នុង `chatCore.ts` (non-streaming និង streaming) ហៅ `cacheReasoningFromAssistantMessage()` តែនៅពេល `requiresReasoningReplay(provider, model)` គឺ `true` ប៉ុណ្ណោះ — ជា predicate ដូចគ្នាដែលផ្នែកអានពិនិត្យ។ ការដំឡើងដែលមិនដែលប្រើ replay provider នឹងមិនចាំបាច់ចំណាយលើការសរសេរ ការធ្វើបច្ចុប្បន្នភាព index និង try/catch សម្រាប់រាល់ response ដែលមាន reasoning ទៀតទេ។
- **Provider ដែលមិនមានលក្ខខណ្ឌតឹងរ៉ឹង:** នៅពេល `requiresReasoningReplay` គឺ `false` ហើយទម្រង់គោលដៅគឺ OpenAI នោះ translator នឹង **ដកចេញ** field `reasoning_content` ទាំងឡាយពីសារដែលផ្ញើចេញ — OpenAI Chat Completions មិនទទួលយកវាទេ។

## ភាពជាម្ចាស់នៃ reasoning ស្រអាប់របស់ Muse

Muse (`muse-code`) ត្រឡប់ reasoning ស្រអាប់ដែលភ្ជាប់នឹងអ្នកហៅ (`encrypted_content`)។ ការចាក់វាឡើងវិញក្រោមគណនីផ្សេង ឬព័ត៌មានសម្គាល់អត្តសញ្ញាណដែលចេញថ្មី បរាជ័យនៅ upstream ដូច្នេះសំណើ OAuth ដើមប្រើភាពជាម្ចាស់កម្រិតសម័យ ជំនួសឱ្យការបង្វិលរាល់សំណើ (`src/sse/services/museSessionOwnership.ts` អនុវត្តនៅ `src/sse/handlers/chat.ts`)។ ការតភ្ជាប់សោ API ដែលបានជ្រើសច្បាស់លាស់ និងការកំណត់រចនាសម្ព័ន្ធដែលមានតែសោ API រក្សាការកំណត់ផ្លូវដែលមានស្រាប់ ដោយគ្មានរបៀបភាពជាម្ចាស់នេះ។

- ផ្ដល់ ID សម័យមានស្ថិរភាពនៅរាល់វេន៖ `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ឬ `x-codex-session-id`; ជាជម្រើស ប្រើ `prompt_cache_key`, `session_id`, `conversation_id` ឬ `metadata.session_id` ក្នុង body (តាមលំដាប់អាទិភាពនេះ)។ ID ដែលបាត់ ឬទទេ ត្រឡប់ 400 ពេលគណនី OAuth ដើមពីរ ឬច្រើនសកម្ម; បើមានគណនី OAuth តែមួយ គ្មានគណនីផ្សេងសម្រាប់បង្វិលទៅទេ ដូច្នេះសំណើនោះរក្សាការកំណត់ផ្លូវមិនខ្ទាស់។ វិសាលភាពរួមមាន ID សោ API OmniRoute របស់អ្នកហៅ។
- សម័យឯករាជ្យថ្មីបង្វិលតាម round-robin រវាងគណនី OAuth ដើមសកម្មដែលគោលការណ៍ការតភ្ជាប់សោ API អនុញ្ញាត ដោយរៀបតាម ID ការតភ្ជាប់។ round-robin រំលងគណនីក្នុងរយៈពេលផ្អាកការតភ្ជាប់ មានស្ថានភាពបញ្ចប់ (`banned`, `expired`, `credits_exhausted`) ឬចាក់សោសម្រាប់ម៉ូដែលដែលបានស្នើ; ការបរាជ័យ upstream Muse កត់ត្រារយៈពេលផ្អាក និងស្ថានភាព breaker ដូចអ្នកផ្ដល់សេវាផ្សេង។ ការតភ្ជាប់ដែលបង្ខំច្បាស់លាស់រំលង round-robin សម្រាប់សម័យថ្មី ប៉ុន្តែមិនអាចជំនួសម្ចាស់ ក្រោយពេលម្ចាស់នោះបានផ្ដល់ចម្លើយជោគជ័យ។
- រហូតដល់ម្ចាស់ផ្ដល់ចម្លើយជោគជ័យ សម័យដែលម្ចាស់មិនអាចប្រើបានទៀត ត្រូវបានទាមទារឡើងវិញដោយគណនីដែលដំណើរការល្អ។ ក្រោយចម្លើយជោគជ័យដំបូង សម័យនៅតែខ្ទាស់ទៅម្ចាស់នោះ រហូតដល់វាអសកម្មរយៈពេល 30 ថ្ងៃ (`MUSE_SESSION_IDLE_TTL_MS`)។
- រាល់ការបន្ត និងវេនលទ្ធផលឧបករណ៍ នៅតែខ្ទាស់ទៅម្ចាស់សម័យ៖ ការតភ្ជាប់ អត្តសញ្ញាណគណនី និងជំនាន់ព័ត៌មានសម្គាល់អត្តសញ្ញាណសម្រាប់ inference ដែលត្រូវពិនិត្យម្ដងទៀតមុនការសាកល្បង upstream រួមទាំងការព្យាយាមម្ដងទៀតក្រោយធ្វើឱ្យព័ត៌មានសម្គាល់អត្តសញ្ញាណថ្មីឡើងវិញ។ ID ការហៅ/សេចក្ដីយោងធាតុ Responses និង ID ការហៅឧបករណ៍ Chat Completions ត្រូវបានកត់ត្រារួចសម្រាប់សម័យនិងជំនាន់នោះ។
- កំណត់ត្រា SQLite `key_value` ក្នុង namespace `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) រក្សាភាពជាម្ចាស់ និងទស្សន៍ទ្រនិចបង្វិលឆ្លងកាត់ការចាប់ផ្ដើមឡើងវិញ។ រាល់ការទាមទារ និងចម្លើយដែលផ្ដល់ធ្វើបច្ចុប្បន្នភាពត្រាសកម្មភាពសម័យ; សម័យដែលអសកម្មយូរជាង `MUSE_SESSION_IDLE_TTL_MS` ត្រូវបានសម្អាត (pin ម្ចាស់ ទង់បានបម្រើ និង hash ស្រអាប់/សេចក្ដីយោងដែលបានកត់ត្រា) យ៉ាងញឹកញាប់បំផុតមួយដងរៀងរាល់ 10 នាទី និងក្នុងបាច់មានកម្រិត ដូច្នេះការចាក់ប្រវត្តិវាឡើងវិញពេលក្រោយត្រូវបដិសេធដោយសុវត្ថិភាព ព្រោះមិនស្គាល់ម្ចាស់។ កំណត់ត្រាមាន ID ការតភ្ជាប់ និង hash នៃអត្តសញ្ញាណគណនី ព័ត៌មានសម្គាល់អត្តសញ្ញាណ ខ្លឹមសារស្រអាប់ និងសេចក្ដីយោងការបន្ត មិនមែនអាថ៌កំបាំង ឬប្រវត្តិសន្ទនាទេ។ កម្មវិធីភ្ញៀវត្រូវរក្សា និងផ្ញើប្រវត្តិពេញលេញ និង reasoning ស្រអាប់របស់ខ្លួន។
- reasoning ស្រអាប់មិនស្គាល់ ឬមកពីខាងផ្សេង ម្ចាស់ដែលបាត់ គណនីម្ចាស់មិនអាចប្រើបាន ឬការប្ដូរជំនាន់ជាមួយប្រវត្តិដែលបានកត់ត្រា ត្រូវបដិសេធដោយសុវត្ថិភាពជាមួយ 4xx/503 ច្បាស់លាស់; មិនដែលប្ដូរគណនីបម្រុងដោយស្ងៀមស្ងាត់ និងមិនដែលបោះចោល reasoning ទេ។
- សោចេញថ្មីសម្រាប់គណនីដូចគ្នា ត្រូវបានទទួលយកតែនៅពេលសម័យគ្មានប្រវត្តិដែលអាចចាក់ឡើងវិញបានកត់ត្រាទុក; សម័យដែលមានកំណត់ត្រានៅតែត្រូវបដិសេធដោយសុវត្ថិភាព រហូតដល់ចាប់ផ្ដើមថ្មី។
- ចម្លើយ upstream ទទេ (`upstream_empty_response` / `empty_response` គ្មានអ្វីបញ្ចេញទៅអ្នកហៅ) ត្រូវបានព្យាយាមម្ដងទៀតច្រើនបំផុតពីរដងលើម្ចាស់ដូចគ្នា ក្រោយ 0.5 s រួច 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`)។ បើការសាកល្បងទាំងអស់ទទេ នោះ 502 ដើមត្រូវបានត្រឡប់ ដោយគ្មានការសម្គាល់រយៈពេលផ្អាក ឬ breaker ដូច្នេះចម្លើយមិនស្ថិរភាពមិនដែលចាក់សោម្ចាស់ទេ។
- សំណើ `muse-code` ទាំងអស់រំលងការអាន និងសរសេរឃ្លាំងសម្ងាត់ន័យ រួមទាំងការសរសេរស្ទ្រីម ដើម្បីឱ្យលទ្ធផលស្រអាប់ក្នុងឃ្លាំងសម្ងាត់មិនអាចទទួលម្ចាស់សម័យផ្សេង។

ការការពារការថយក្រោយ៖ `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` និង `tests/unit/chatcore-semantic-cache.test.ts`។

## សូមមើលផងដែរ

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakers, រយៈពេលរង់ចាំ, ការចាក់សោម៉ូដែល
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ការធ្វើរោគវិនិច្ឆ័យកំហុស 400 ពី upstream
- កូដប្រភព៖ `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- ការផ្លាស់ទីទិន្នន័យ៖ `src/lib/db/migrations/033_create_reasoning_cache.sql`
- ផ្លូវ API៖ `src/app/api/cache/reasoning/route.ts`
- បញ្ហាដើម៖ #1628
