# Reasoning Replay Cache (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **सत्यको आधिकारिक स्रोत:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **पछिल्लो अद्यावधिक:** 2026-06-28 — v3.8.40

OmniRoute ले thinking-mode मोडेलहरूद्वारा उत्पादित सहायकको `reasoning_content` सङ्कलन गर्छ र अपस्ट्रिम प्रदायकले आवश्यक ठानेमा बहु-टर्न अनुरोधहरूमा यसलाई पारदर्शी रूपमा पुनः प्रयोग गर्छ। यसले क्लाइन्टको वार्तालाप इतिहासमा अघिल्लो टर्नको reasoning नहुँदा कडा प्रदायकहरूले दिने HTTP 400 त्रुटिहरू हटाउँछ।

## यसको आवश्यकता किन छ

धेरै thinking-mode प्रदायकहरूले **अघिल्लो सहायक सन्देशमा मूल `reasoning_content` समावेश नभएसम्म** फलो-अप टर्न अस्वीकार गर्छन्। अपस्ट्रिमले यस्ता सन्देशहरूसहित 400 फर्काउँछ:

```
प्यारामिटर गलत छ: thinking mode मा रहेको reasoning_content API मा फिर्ता पठाउनुपर्छ।
```

तर सामान्य क्लाइन्टहरू (Cursor, Cline, Roo Code, OpenAI SDK) ले पुनः पठाउने इतिहासबाट `reasoning_content` हटाउँछन्। OmniRoute ले यसलाई सर्भर-साइड क्यासबाट पुनर्स्थापना गर्छ, जसले गर्दा अपस्ट्रिमले देख्ने अनुरोध सुसङ्गत हुन्छ। Issue #1628 ले हाइब्रिड मेमोरी/SQLite स्थायित्व प्रस्तुत गर्यो, जसले गर्दा प्रक्रिया पुनः सुरु भएपछि पनि क्यास कायम रहन्छ।

## आर्किटेक्चर

```
टर्न N (सहायकले उत्पन्न गर्छ):
  → प्रतिक्रियामा reasoning_content + tool_calls समावेश हुन्छन्
  → यदि requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      हरेक tool_call.id द्वारा कुञ्जीकृत गरी (मेमोरी + DB) मा लेख्छ
  → प्रतिक्रिया क्लाइन्टमा पठाउँछ (जसले reasoning कायम राख्न पनि सक्छ वा नराख्न पनि सक्छ)

टर्न N+1 (क्लाइन्टले फलो-अप पठाउँछ):
  → अनुवादकले पत्ता लगाउँछ: requiresReasoningReplay(provider, model) === true
  → tool_calls भएका र reasoning_content नभएका प्रत्येक सहायक सन्देशका लागि:
      lookupReasoning(toolCalls[0].id) → मेमोरी → DB
      भेटियो  → msg.reasoning_content = cached; recordReplay()
      भेटिएन → msg.reasoning_content = "" (पुरानो DeepSeek का लागि लिगेसी फल्ब्याक)
  → अपस्ट्रिमले एकरूप इतिहास देख्छ → 400 आउँदैन
```

क्याप्चर `open-sse/handlers/chatCore.ts` मा हुन्छ (दुई स्थानमा, दुईवटा `cacheReasoningFromAssistantMessage` कल साइटहरूमा)। रिप्ले स्किमा कोअर्सनपछि तर डिस्प्याचअघि `open-sse/translator/index.ts` मा हुन्छ।

सामान्य (टुल-कल नभएका) सहायक टर्नहरू फरक तरिकाले कुञ्जीकृत हुन्छन्: `buildAssistantMessageCacheKey()` ले सेसन स्कोप र उक्त टर्नसम्मको सामान्यीकृत OpenAI-ढाँचाको ट्रान्सक्रिप्टलाई डाइजेस्ट गर्छ, किनकि `tools` उपस्थित भएपछि DeepSeek लाई _हरेक_ अघिल्लो टर्नको रिजनिङ आवश्यक पर्छ। Responses-API लक्ष्यहरूका लागि (उदाहरणका लागि `opencode-go/deepseek-v4-flash`, जसलाई `/responses` मा रुट गरिन्छ) अपस्ट्रिम बडीले `messages` होइन, `input` बोक्छ, त्यसैले `translateRequest()` (`open-sse/translator/index.ts`) ले कलब्याक विकल्पमार्फत आफूले डाइजेस्ट गरेको पिभोट ट्रान्सक्रिप्ट रिपोर्ट गर्छ र क्याप्चर साइटहरूले त्यही ट्रान्सक्रिप्ट डाइजेस्ट गर्छन्। Responses रिप्ले पास प्रत्येक स्रोत ढाँचाका लागि OpenAI पिभोटमा चल्छ, त्यसैले Anthropic Messages क्लाइन्टहरू (Claude → OpenAI → Responses) पनि रिप्ले हुन्छन्।

## भण्डारण — हाइब्रिड मेमोरी + SQLite

हट पाथले क्र्यास रिकभरी र ड्यासबोर्ड दृश्यताका लागि SQLite तालिकाद्वारा समर्थित इन-मेमोरी `Map` (सिर्जना समयअनुसार LRU) प्रयोग गर्छ।

| तह     | कार्यान्वयन                                          | उद्देश्य                                               |
| ------ | ---------------------------------------------------- | ------------------------------------------------------ |
| मेमोरी | `open-sse/services/reasoningCache.ts` मा रहेको `Map` | द्रुत लुकअप, 200 पुगेपछि सबैभन्दा पुरानो हटाउँछ        |
| DB     | `reasoning_cache` तालिका (`src/lib/db/`)             | पुनः सुरु हुँदा पनि कायम रहन्छ र तथ्याङ्क सञ्चालन गर्छ |

लेखाइ दुवैमा गरिन्छ। पढाइले पहिले मेमोरी जाँच्छ, त्यसपछि DB मा फलब्याक गर्छ (DB हिटहरू पुनः मेमोरीमा प्रवर्द्धन गरिन्छन्)। DB विफलताहरू घातक हुँदैनन् — इन-मेमोरी क्यासले हट पाथलाई सेवा दिन जारी राख्छ।

**पूर्वनिर्धारित मानहरू:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- अधिकतम मेमोरी प्रविष्टिहरू: `200` (`MAX_MEMORY_ENTRIES`)
- निष्कासन: सबैभन्दा पुरानो `createdAt` पहिले

## डाटाबेस स्किमा

माइग्रेसन: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

इन्डेक्सहरू: `expires_at`, `provider`, `model`, `created_at`। `expires_at` लाई Unix epoch सेकेन्डका रूपमा भण्डारण गरिन्छ; SELECT तहले `EXPIRES_AT_EPOCH_SQL` मार्फत पुराना टेक्स्ट मानहरूलाई सामान्यीकरण गर्छ।

## प्रदायक / मोडेल पहिचान

`requiresReasoningReplay(provider, model)` ले `true` फर्काउँदा Replay सक्षम हुन्छ। यस प्रकार्यले `open-sse/services/reasoningCache.ts` मा रहेका दुईवटा सूची जाँच गर्छ।

**प्रदायक ID हरू (ठ्याक्कै मिल्नुपर्ने, अक्षरको आकारप्रति असंवेदनशील):**

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

**मोडेल regex ढाँचाहरू (अक्षरको आकारप्रति असंवेदनशील):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` र `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, वैकल्पिक `-free` प्रत्यय)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

नयाँ strict प्रदायक/मोडेल थप्नु भनेको यी सूचीमध्ये एउटामा थप्नु र replay injection पुष्टि गर्ने unit test लेख्नु हो। PR विवरणमा परिवर्तन गर्न प्रेरित गर्ने upstream 400 को ठ्याक्कै string उल्लेख हुनुपर्छ।

## REST API

Cache ले `src/app/api/cache/reasoning/route.ts` अन्तर्गत दुईवटा endpoint उपलब्ध गराउँछ। दुवैलाई व्यवस्थापन प्रमाणीकरण (`@/shared/utils/apiAuth` बाट `isAuthenticated`) आवश्यक पर्छ।

| विधि   | Endpoint                                                  | विवरण                                                       |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | तथ्याङ्क + पृष्ठाङ्कित प्रविष्टिहरू                         |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | फिल्टर गरिएको सूची (`limit` लाई `[1, 200]` मा सीमित गरिन्छ) |
| DELETE | `/api/cache/reasoning`                                    | सबै कुरा (memory + DB) खाली गरी hit/miss गणना रिसेट गर्छ    |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | एउटा प्रदायकका प्रविष्टिहरू मात्र खाली गर्छ                 |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | एउटै प्रविष्टि मेटाउँछ                                      |

**GET प्रतिक्रियाको संरचना:**

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

## सञ्चालनसम्बन्धी टिप्पणीहरू

- **सफाइ:** `cleanupReasoningCache()` ले म्याद सकिएका memory प्रविष्टिहरू हटाउँछ र `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` चलाउँछ। Health-check worker हरूले यसलाई आवधिक रूपमा आह्वान गर्छन्।
- **Crash recovery:** पुनः सुरु गरेपछि memory खाली हुन्छ, तर DB मा म्याद नसकिएका प्रविष्टिहरू रहिरहन्छन्। दिइएको `tool_call_id` का लागि पहिलो lookup DB hit हुन्छ; त्यसपछिका lookup हरू memory hit हुन्छन्।
- **Reasoning छैन भने cache पनि हुँदैन:** सहायक सन्देशमा `reasoning_content` / `reasoning` field नभएमा `cacheReasoningFromAssistantMessage` ले `0` फर्काउँछ, त्यसैले non-thinking प्रतिक्रियाहरूमा कुनै लागत लाग्दैन।
- **लेखन पनि नियन्त्रित छ:** `chatCore.ts` का दुवै call site (non-streaming र streaming) ले `requiresReasoningReplay(provider, model)` `true` हुँदा मात्र `cacheReasoningFromAssistantMessage()` आह्वान गर्छन् — read side ले जाँच्ने predicate पनि यही हो। Replay प्रदायक कहिल्यै प्रयोग नगर्ने installation हरूले reasoning समावेश भएको प्रत्येक प्रतिक्रियामा write, index update, र try/catch को लागत व्यहोर्नु पर्दैन।
- **Non-strict प्रदायकहरू:** `requiresReasoningReplay` `false` हुँदा र लक्षित ढाँचा OpenAI हुँदा, translator ले बाहिर जाने सन्देशहरूबाट कुनै पनि `reasoning_content` field **हटाउँछ** — OpenAI Chat Completions ले यसलाई स्वीकार गर्दैन।

## Muse अपारदर्शी तर्कको स्वामित्व

Muse (`muse-code`) ले कलरसँग बाँधिएको अपारदर्शी तर्क (`encrypted_content`) फर्काउँछ। फरक खाता वा फेरि जारी गरिएको प्रमाणबाट त्यसको रिप्ले अपस्ट्रिममा असफल हुन्छ, त्यसैले नेटिभ OAuth अनुरोधले प्रति-अनुरोध फेरबदलको सट्टा सत्र-स्तरको स्वामित्व प्रयोग गर्छन् (`src/sse/services/museSessionOwnership.ts`, `src/sse/handlers/chat.ts` मा लागू)। स्पष्ट रूपमा छानिएका API-कुञ्जी कनेक्सन र API-कुञ्जी-मात्र कन्फिगरेसनले यो स्वामित्व मोडबिना आफ्नो विद्यमान राउटिङ राख्छन्।

- प्रत्येक टर्नमा स्थिर सत्र ID दिनुहोस्: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` वा `x-codex-session-id`; विकल्पमा बडीमा `prompt_cache_key`, `session_id`, `conversation_id` वा `metadata.session_id` प्रयोग गर्नुहोस् (यही प्राथमिकता क्रममा)। दुई वा बढी नेटिभ OAuth खाता सक्रिय हुँदा नभएको वा खाली ID ले 400 फर्काउँछ; एउटै OAuth खाता हुँदा बदल्न अर्को खाता हुँदैन, त्यसैले यस्तो अनुरोधले पिन नगरिएको राउटिङ राख्छ। स्कोपमा कलरको OmniRoute API-कुञ्जी ID समावेश हुन्छ।
- नयाँ स्वतन्त्र सत्र API-कुञ्जी कनेक्सन नीतिले अनुमति दिएका सक्रिय नेटिभ OAuth खातामा कनेक्सन ID को क्रममा पालैपालो बाँडिन्छन्। यसले कनेक्सन कूलडाउनमा रहेका, अन्तिम स्थिति (`banned`, `expired`, `credits_exhausted`) भएका वा मागिएको मोडेलका लागि लक भएका खाता छोड्छ; Muse अपस्ट्रिम असफलताले अन्य प्रदायकजस्तै कूलडाउन र ब्रेकर अवस्था लेख्छन्। स्पष्ट रूपमा बाध्य गरिएको कनेक्सनले नयाँ सत्रमा पालैपालो वितरण छोड्छ तर सफल उत्तर दिइसकेको मालिक बदल्न सक्दैन।
- मालिकले सफल उत्तर नदिएसम्म, मालिक अनुपलब्ध भएको सत्र स्वस्थ खातामा फेरि दाबी गरिन्छ। पहिलो सफल उत्तरपछि सत्र 30 दिन निष्क्रिय नभएसम्म त्यही मालिकमा पिन रहन्छ (`MUSE_SESSION_IDLE_TTL_MS`)।
- प्रत्येक निरन्तरता र टुल-नतिजा टर्न सत्र मालिकमा पिन रहन्छ: कनेक्सन, खाता पहिचान र इन्फरेन्स प्रमाणको पुस्ता; प्रमाण रिफ्रेसपछिका पुनःप्रयाससहित अपस्ट्रिम प्रयासअघि यी फेरि जाँचिन्छन्। Responses कल ID/आइटम सन्दर्भ र Chat Completions टुल-कल ID त्यस सत्र र पुस्ताका लागि रेकर्ड भएको हुनुपर्छ।
- `muse_session_ownership` नेमस्पेसका SQLite `key_value` रेकर्ड (`src/lib/db/museSessionOwnership.ts`) ले स्वामित्व र फेरबदल कर्सर पुनःसुरु भएपछि पनि राख्छन्। प्रत्येक दाबी र दिइएको उत्तरले सत्रको सक्रियता समय अद्यावधिक गर्छ; `MUSE_SESSION_IDLE_TTL_MS` भन्दा लामो निष्क्रिय सत्र हटाइन्छ (मालिक पिन, उत्तर दिएको फ्ल्याग र रेकर्ड गरिएका अपारदर्शी/सन्दर्भ ह्यास), बढीमा हरेक 10 मिनेटमा एकपटक र सीमित ब्याचमा, त्यसैले पछिको इतिहास रिप्ले अज्ञात मालिकका रूपमा सुरक्षित रूपमा अस्वीकार हुन्छ। रेकर्डमा कनेक्सन ID र खाता पहिचान, प्रमाण, अपारदर्शी सामग्री तथा निरन्तरता सन्दर्भका ह्यास हुन्छन्, गोप्य कुरा वा कुराकानी इतिहास होइन। क्लाइन्टले पूरा इतिहास र अपारदर्शी तर्क राखेर पठाउनुपर्छ।
- अज्ञात वा अरूको अपारदर्शी तर्क, हराएको मालिक, अनुपलब्ध मालिक खाता वा रेकर्ड गरिएको इतिहाससँगै पुस्ता परिवर्तन हुँदा स्पष्ट 4xx/503 सहित सुरक्षित अस्वीकार हुन्छ — चुपचाप अर्को खातामा फेलओभर कहिल्यै हुँदैन र तर्क कहिल्यै हटाइँदैन।
- उही खाताको फेरि जारी कुञ्जी सत्रले रिप्ले गर्न मिल्ने इतिहास रेकर्ड नगरेको अवस्थामा मात्र अपनाइन्छ; रेकर्ड भएका सत्र नयाँ सुरु नभएसम्म सुरक्षित रूपमा अस्वीकार भइरहन्छन्।
- खाली अपस्ट्रिम उत्तर (`upstream_empty_response` / `empty_response`, कलरलाई केही पठाइएको छैन) उही मालिकमा बढीमा दुईपटक, पहिले 0.5 s र त्यसपछि 1.5 s पछि फेरि प्रयास गरिन्छ (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`)। सबै प्रयास खाली भए कूलडाउन वा ब्रेकर चिन्हबिना मूल 502 फर्काइन्छ, त्यसैले अस्थिर उत्तरले मालिकलाई कहिल्यै लकआउट गर्दैन।
- सबै `muse-code` अनुरोधले स्ट्रिमिङ लेखाइसमेत सेमान्टिक-क्यास पढाइ र लेखाइ छोड्छन्, त्यसैले क्यास गरिएको अपारदर्शी आउटपुटले फरक सत्र मालिक पाउन सक्दैन।

रिग्रेसन सुरक्षा: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` र `tests/unit/chatcore-semantic-cache.test.ts`.

## यो पनि हेर्नुहोस्

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकरहरू, कूलडाउनहरू, मोडेल लकआउटहरू
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — अपस्ट्रिम 400 त्रुटिहरूको निदान
- स्रोत: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- माइग्रेसन: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API रुट: `src/app/api/cache/reasoning/route.ts`
- मूल समस्या: #1628
