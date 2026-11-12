# Reasoning Replay Cache (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **உண்மையின் ஆதார மூலம்:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-06-28 — v3.8.40

சிந்தனைப் பயன்முறை மாதிரிகள் உருவாக்கும் உதவியாளரின் `reasoning_content`-ஐ OmniRoute சேகரித்து, அப்ஸ்ட்ரீம் வழங்குநருக்கு அது தேவைப்படும்போது பல-முறை கோரிக்கைகளில் வெளிப்படையாக மீண்டும் வழங்குகிறது. கிளையன்ட்டின் உரையாடல் வரலாற்றில் முந்தைய முறையின் பகுத்தறிவு இல்லாதபோது, கடுமையான வழங்குநர்கள் எழுப்பும் HTTP 400 பிழைகளை இது நீக்குகிறது.

## இது ஏன் உள்ளது

பல சிந்தனைப் பயன்முறை வழங்குநர்கள், **முந்தைய உதவியாளர் செய்தியில் அசல் `reasoning_content` இடம்பெறாவிட்டால்**, தொடர்ச்சியான முறையை நிராகரிக்கின்றனர். அப்ஸ்ட்ரீம் பின்வருவது போன்ற செய்திகளுடன் 400-ஐ வழங்குகிறது:

```
அளவுரு தவறானது: சிந்தனைப் பயன்முறையில் உள்ள reasoning_content மீண்டும் API-க்கு அனுப்பப்பட வேண்டும்.
```

ஆனால் வழக்கமான கிளையன்ட்கள் (Cursor, Cline, Roo Code, OpenAI SDK), தாங்கள் மீண்டும் வழங்கும் வரலாற்றிலிருந்து `reasoning_content`-ஐ நீக்கிவிடுகின்றன. அப்ஸ்ட்ரீம் காணும் கோரிக்கை சீராக இருக்கும்படி, சேவையகப் பக்கத் தேக்ககத்திலிருந்து OmniRoute அதை மீட்டமைக்கிறது. செயல்முறை மறுதொடக்கங்களுக்குப் பிறகும் தேக்ககம் நிலைத்திருக்கும்படி, கலப்பின நினைவகம்/SQLite நிலைத்தன்மையை Issue #1628 அறிமுகப்படுத்தியது.

## கட்டமைப்பு

```
சுற்று N (உதவியாளர் உருவாக்குகிறது):
  → பதிலில் reasoning_content + tool_calls உள்ளன
  → requiresReasoningReplay(provider, model) எனில்: cacheReasoningFromAssistantMessage()
      ஒவ்வொரு tool_call.id-ஐயும் விசையாகக் கொண்டு (நினைவகம் + DB)-இல் எழுதுகிறது
  → பதிலை கிளையண்டுக்கு அனுப்புகிறது (அது reasoning-ஐத் தக்கவைக்கலாம் அல்லது தக்கவைக்காமலும் இருக்கலாம்)

சுற்று N+1 (கிளையண்ட் தொடர் கோரிக்கையை அனுப்புகிறது):
  → மொழிபெயர்ப்பி கண்டறிகிறது: requiresReasoningReplay(provider, model) === true
  → tool_calls உள்ளதும் reasoning_content இல்லாததுமான ஒவ்வொரு உதவியாளர் செய்திக்கும்:
      lookupReasoning(toolCalls[0].id) → நினைவகம் → DB
      கிடைத்தது  → msg.reasoning_content = cached; recordReplay()
      கிடைக்கவில்லை → msg.reasoning_content = "" (பழைய DeepSeek பதிப்புகளுக்கான மரபுவழிப் பின்னிருப்பு)
  → மேல்நிலைச் சேவை சீரான வரலாற்றைக் காண்கிறது → 400 பிழை இல்லை
```

பதிவுசெய்தல் `open-sse/handlers/chatCore.ts`-இல் நிகழ்கிறது (`cacheReasoningFromAssistantMessage` அழைக்கப்படும் இரண்டு இடங்களில்). மறுஇயக்கம், schema coercion-க்குப் பிறகும் dispatch-க்கு முன்பும் `open-sse/translator/index.ts`-இல் நிகழ்கிறது.

சாதாரண (tool-call அல்லாத) உதவியாளர் சுற்றுகளுக்கு விசைகள் வேறுவிதமாக அமைக்கப்படுகின்றன: `buildAssistantMessageCacheKey()` அமர்வு வரம்புடன், அந்தச் சுற்று வரையிலான இயல்பாக்கப்பட்ட OpenAI-வடிவ உரையாடல் பதிவையும் சுருக்கமாக்குகிறது; ஏனெனில் `tools` இடம்பெற்றவுடன் முந்தைய _ஒவ்வொரு_ சுற்றின் reasoning-ஐயும் DeepSeek கோருகிறது. Responses-API இலக்குகளுக்கு (எடுத்துக்காட்டாக, `/responses`-க்கு வழிநடத்தப்படும் `opencode-go/deepseek-v4-flash`) மேல்நிலை request body-இல் `messages` அல்லாமல் `input` இடம்பெறும். எனவே, `translateRequest()` (`open-sse/translator/index.ts`) தான் சுருக்கமாக்கிய pivot உரையாடல் பதிவை callback விருப்பத்தின் மூலம் தெரிவிக்கிறது; பதிவுசெய்யும் இடங்களும் அதே உரையாடல் பதிவைச் சுருக்கமாக்குகின்றன. Responses மறுஇயக்கச் சுற்று ஒவ்வொரு மூல வடிவத்திற்கும் OpenAI pivot மீது இயங்குவதால், Anthropic Messages கிளையண்டுகளும் (Claude → OpenAI → Responses) மறுஇயக்கப்படுகின்றன.

## சேமிப்பகம் — கலப்பின நினைவகம் + SQLite

விரைவான பாதை, செயலிழப்பிலிருந்து மீட்பதற்கும் முகப்புப்பலகையில் காண்பிப்பதற்கும் SQLite அட்டவணையால் ஆதரிக்கப்படும் நினைவகத்திலுள்ள `Map`-ஐ (உருவாக்க நேரத்தின் அடிப்படையிலான LRU) பயன்படுத்துகிறது.

| அடுக்கு  | செயலாக்கம்                                           | நோக்கம்                                                                     |
| -------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| நினைவகம் | `open-sse/services/reasoningCache.ts`-இல் உள்ள `Map` | விரைவான தேடல்கள், 200-ஐ எட்டும்போது பழமையானதை வெளியேற்றுகிறது               |
| DB       | `reasoning_cache` அட்டவணை (`src/lib/db/`)            | மறுதொடக்கங்களுக்குப் பிறகும் நிலைத்திருக்கிறது, புள்ளிவிவரங்களை இயக்குகிறது |

எழுதுதல்கள் இரண்டிலும் மேற்கொள்ளப்படுகின்றன. வாசிப்புகள் முதலில் நினைவகத்தைச் சரிபார்த்து, பின்னர் DB-ஐ மாற்றுவழியாகப் பயன்படுத்துகின்றன (DB-இல் கிடைப்பவை மீண்டும் நினைவகத்திற்குப் பதவி உயர்த்தப்படுகின்றன). DB தோல்விகள் தீவிரமானவை அல்ல — நினைவகத் தேக்ககம் விரைவான பாதைக்குத் தொடர்ந்து சேவை வழங்குகிறது.

**இயல்புநிலைகள்:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- அதிகபட்ச நினைவகப் பதிவுகள்: `200` (`MAX_MEMORY_ENTRIES`)
- வெளியேற்றம்: முதலில் மிகப் பழைய `createdAt`

## தரவுத்தளத் திட்டவடிவம்

இடம்பெயர்வு: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

குறியீடுகள்: `expires_at`, `provider`, `model`, `created_at`. `expires_at` என்பது Unix epoch வினாடிகளாகச் சேமிக்கப்படுகிறது; SELECT அடுக்கு, மரபு உரை மதிப்புகளை `EXPIRES_AT_EPOCH_SQL` மூலம் இயல்பாக்குகிறது.

## வழங்குநர் / மாதிரி கண்டறிதல்

`requiresReasoningReplay(provider, model)` என்பது `true` எனத் திருப்பும்போது மீளியக்கம் செயல்படுத்தப்படும். இந்தச் செயல்பாடு `open-sse/services/reasoningCache.ts` கோப்பிலுள்ள இரண்டு பட்டியல்களைச் சரிபார்க்கிறது.

**வழங்குநர் ID-கள் (துல்லியப் பொருத்தம், எழுத்துப் பெரிய/சிறிய வேறுபாடின்றி):**

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

**மாதிரி regex வடிவங்கள் (எழுத்துப் பெரிய/சிறிய வேறுபாடின்றி):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` மற்றும் `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, விருப்பத்திற்குரிய `-free` பின்னொட்டு)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

புதிய கண்டிப்பான வழங்குநர்/மாதிரியைச் சேர்க்க, இந்தப் பட்டியல்களில் ஒன்றில் அதை இணைத்து, மீளியக்கச் செருகலை உறுதிப்படுத்தும் unit test ஒன்றை எழுத வேண்டும். மாற்றத்தைத் தூண்டிய upstream 400 சரத்தின் துல்லியமான உரையை PR விளக்கம் மேற்கோள் காட்ட வேண்டும்.

## REST API

இந்த cache, `src/app/api/cache/reasoning/route.ts` என்பதன் கீழ் இரண்டு endpoint-களை வெளிப்படுத்துகிறது. இரண்டிற்கும் மேலாண்மை அங்கீகாரம் (`@/shared/utils/apiAuth` இலிருந்து `isAuthenticated`) தேவை.

| முறை   | Endpoint                                                  | விளக்கம்                                                                           |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | புள்ளிவிவரங்கள் + பக்கங்களாக்கப்பட்ட பதிவுகள்                                      |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | வடிகட்டப்பட்ட பட்டியல் (`limit` ஆனது `[1, 200]` வரம்பிற்குள் கட்டுப்படுத்தப்படும்) |
| DELETE | `/api/cache/reasoning`                                    | அனைத்தையும் (நினைவகம் + DB) அழித்து, hit/miss எண்ணிக்கைகளை மீட்டமைக்கும்           |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | ஒரு வழங்குநருக்கான பதிவுகளை மட்டும் அழிக்கும்                                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ஒற்றைப் பதிவை நீக்கும்                                                             |

**GET பதிலின் வடிவம்:**

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

## செயல்பாட்டுக் குறிப்புகள்

- **தூய்மைப்படுத்தல்:** `cleanupReasoningCache()` காலாவதியான நினைவகப் பதிவுகளை அகற்றி, `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` என்பதை இயக்குகிறது. Health-check worker-கள் இதை அவ்வப்போது அழைக்கின்றன.
- **செயலிழப்பிலிருந்து மீட்பு:** மறுதொடக்கத்திற்குப் பிறகு நினைவகம் காலியாக இருக்கும், ஆனால் காலாவதியாகாத பதிவுகளை DB தொடர்ந்து வைத்திருக்கும். குறிப்பிட்ட `tool_call_id`-க்கான முதல் lookup ஒரு DB hit ஆகும்; அடுத்தடுத்த lookup-கள் memory hit-களாக இருக்கும்.
- **Reasoning இல்லை, cache இல்லை:** assistant செய்தியில் `reasoning_content` / `reasoning` புலம் இல்லாதபோது `cacheReasoningFromAssistantMessage` ஆனது `0` எனத் திருப்பும்; எனவே reasoning இல்லாத பதில்களுக்கு எந்தச் செலவும் இல்லை.
- **எழுதுதலும் கட்டுப்படுத்தப்படுகிறது:** `chatCore.ts`-இல் உள்ள இரு call site-களும் (non-streaming மற்றும் streaming), `requiresReasoningReplay(provider, model)` என்பது `true` ஆக இருக்கும்போது மட்டுமே `cacheReasoningFromAssistantMessage()`-ஐ அழைக்கின்றன — வாசிப்புப் பக்கம் சரிபார்க்கும் அதே predicate இதுவாகும். மீளியக்க வழங்குநரை ஒருபோதும் பயன்படுத்தாத நிறுவல்கள், reasoning கொண்ட ஒவ்வொரு பதிலுக்கும் write, index update மற்றும் try/catch ஆகியவற்றுக்கான செலவைச் செலுத்துவதை நிறுத்துகின்றன.
- **கண்டிப்பற்ற வழங்குநர்கள்:** `requiresReasoningReplay` என்பது `false` ஆகவும் இலக்கு வடிவம் OpenAI ஆகவும் இருக்கும்போது, வெளியேறும் செய்திகளிலுள்ள எந்த `reasoning_content` புலத்தையும் translator **அகற்றுகிறது** — OpenAI Chat Completions அதை ஏற்றுக்கொள்வதில்லை.

## Muse opaque reasoning இன் உரிமை

Muse (`muse-code`) caller உடன் பிணைந்த opaque reasoning (`encrypted_content`) ஐத் தருகிறது. அதை வேறு account அல்லது புதிதாக மீண்டும் வழங்கப்பட்ட credential இல் replay செய்தால் upstream இல் தோல்வியுறும்; எனவே native OAuth request கள் ஒவ்வொரு request க்கும் rotation செய்வதற்குப் பதிலாக session அளவிலான ownership ஐப் பயன்படுத்துகின்றன (`src/sse/services/museSessionOwnership.ts`, `src/sse/handlers/chat.ts` இல் அமல்படுத்தப்படுகிறது). வெளிப்படையாகத் தேர்ந்த API-key connection களும் API-key மட்டும் கொண்ட configuration களும் இந்த ownership mode இன்றி தற்போதைய routing ஐத் தக்கவைக்கும்.

- ஒவ்வொரு turn இலும் நிலையான session ID வழங்கவும்: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` அல்லது `x-codex-session-id`; மாற்றாக body இல் `prompt_cache_key`, `session_id`, `conversation_id` அல்லது `metadata.session_id` பயன்படுத்தவும் (அந்த முன்னுரிமை வரிசையில்). இரண்டு அல்லது அதற்கு மேற்பட்ட native OAuth account கள் active ஆக இருந்தால், காணாத அல்லது காலியான ID கள் 400 தரும்; ஒரே OAuth account இருந்தால் சுழற்ற வேறு account இல்லை என்பதால் அந்த request pin இல்லாத routing ஐத் தக்கவைக்கும். Scope இல் caller இன் OmniRoute API-key ID அடங்கும்.
- புதிய சுயாதீன session கள் API-key connection policy அனுமதிக்கும் active native OAuth account களிடையே connection ID வரிசையில் round-robin ஆகப் பகிரப்படும். Connection cooldown இல் உள்ளவை, terminal status (`banned`, `expired`, `credits_exhausted`) கொண்டவை அல்லது கேட்ட model க்கு lock செய்யப்பட்ட account களை round-robin தவிர்க்கும்; பிற provider களைப் போல Muse upstream தோல்விகள் cooldown மற்றும் breaker நிலையைப் பதிவு செய்யும். வெளிப்படையாகக் கட்டாயப்படுத்தப்பட்ட connection புதிய session க்கு round-robin ஐத் தவிர்க்கும்; ஆனால் owner வெற்றிகரமான response வழங்கியபின் அவரை மாற்ற முடியாது.
- Owner வெற்றிகரமான response வழங்கும்வரை, அவர் கிடைக்காமல் போன session ஆரோக்கியமான account க்கு மீண்டும் claim செய்யப்படும். முதல் வெற்றிகரமான response க்குப் பிறகு, session 30 நாட்கள் செயலற்றதாகும் வரை (`MUSE_SESSION_IDLE_TTL_MS`) அந்த owner உடனேயே pin ஆக இருக்கும்.
- ஒவ்வொரு continuation மற்றும் tool-result turn உம் session owner உடனேயே pin ஆக இருக்கும்: connection, account identity மற்றும் inference-credential generation; credential-refresh retry கள் உட்பட upstream முயற்சிகளுக்கு முன் இவை மீண்டும் சரிபார்க்கப்படும். Responses call ID கள்/item reference களும் Chat Completions tool-call ID களும் அந்த session மற்றும் generation க்காகப் பதிவாகியிருக்க வேண்டும்.
- `muse_session_ownership` namespace இல் உள்ள SQLite `key_value` பதிவுகள் (`src/lib/db/museSessionOwnership.ts`) restart களிடையிலும் ownership மற்றும் rotation cursor ஐத் தக்கவைக்கும். ஒவ்வொரு claim மற்றும் வழங்கப்பட்ட response உம் session activity timestamp ஐப் புதுப்பிக்கும்; `MUSE_SESSION_IDLE_TTL_MS` ஐவிட அதிகமாகச் செயலற்ற session, அதிகபட்சம் ஒவ்வொரு 10 நிமிடத்திற்கும் ஒருமுறை, வரம்புள்ள batch களில் அகற்றப்படும் (owner pin, served flag மற்றும் பதிவான opaque/reference hash கள்). ஆகவே அதன் history ஐப் பின்னர் replay செய்தால் unknown owner என அனுமதி மறுக்கப்படும். பதிவுகளில் connection ID களும் account identity, credential கள், opaque content, continuation reference களின் hash களும் உள்ளன; secrets அல்லது conversation history இல்லை. Client கள் முழு history மற்றும் opaque reasoning ஐ வைத்திருந்து அனுப்ப வேண்டும்.
- தெரியாத அல்லது வேறொருவரின் opaque reasoning, காணாத owner, கிடைக்காத owner account அல்லது பதிவான history இருக்கும்போது generation மாற்றம் — இவை வெளிப்படையான 4xx/503 உடன் அனுமதி மறுக்கும்; ஒருபோதும் மௌனமாக வேறு account க்கு failover செய்யாது, reasoning ஐக் கைவிடாது.
- அதே account க்குப் புதிதாக வழங்கப்பட்ட key, session இல் replay செய்யக்கூடிய history எதுவும் பதிவாகாதபோது மட்டுமே ஏற்கப்படும்; பதிவான session கள் புதிதாகத் தொடங்கப்படும்வரை தொடர்ந்து அனுமதி மறுக்கப்படும்.
- காலியான upstream response (`upstream_empty_response` / `empty_response`, caller க்கு எதுவும் வெளியிடப்படவில்லை) அதே owner இல் அதிகபட்சம் இருமுறை retry செய்யப்படும், முதலில் 0.5 s, பின்னர் 1.5 s கழித்து (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). எல்லா முயற்சிகளும் காலியானால் cooldown அல்லது breaker குறியிடாமல் மூல 502 திரும்பும்; ஆகவே நிலையற்ற reply owner ஐ ஒருபோதும் lock செய்யாது.
- எல்லா `muse-code` request களும் semantic-cache read மற்றும் write களை, streaming write கள் உட்பட, தவிர்க்கும்; இதனால் cache செய்யப்பட்ட opaque output வேறொரு session owner க்குச் செல்லாது.

Regression பாதுகாப்புகள்: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` மற்றும் `tests/unit/chatcore-semantic-cache.test.ts`.

## மேலும் காண்க

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — சர்க்யூட் பிரேக்கர்கள், குளிர்விப்பு காலங்கள், மாதிரி முடக்கங்கள்
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — அப்ஸ்ட்ரீம் 400 பிழைகளைக் கண்டறிதல்
- மூலம்: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- இடமாற்றம்: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API வழித்தடம்: `src/app/api/cache/reasoning/route.ts`
- அசல் சிக்கல்: #1628
