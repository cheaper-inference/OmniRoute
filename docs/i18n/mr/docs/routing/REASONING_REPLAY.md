# Reasoning Replay Cache (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **अधिकृत स्रोत:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40

OmniRoute हे विचार-मोड मॉडेल्सद्वारे तयार केलेले सहाय्यकाचे `reasoning_content` संकलित करते आणि अपस्ट्रीम प्रदात्याला त्याची आवश्यकता असताना बहु-टर्न विनंत्यांमध्ये ते पारदर्शकपणे पुन्हा वापरते. यामुळे क्लायंटच्या संभाषण इतिहासामध्ये मागील टर्नचे रीझनिंग नसताना कठोर प्रदात्यांकडून मिळणाऱ्या HTTP 400 त्रुटी टाळल्या जातात.

## हे का अस्तित्वात आहे

**मागील सहाय्यक संदेशामध्ये मूळ `reasoning_content` समाविष्ट नसल्यास**, अनेक विचार-मोड प्रदाते पुढील टर्न नाकारतात. अपस्ट्रीम खालीलप्रमाणे संदेशांसह 400 प्रतिसाद देते:

```
पॅरामीटर चुकीचा आहे: विचार-मोडमधील reasoning_content API कडे परत पाठवणे आवश्यक आहे.
```

परंतु सामान्य क्लायंट (Cursor, Cline, Roo Code, OpenAI SDK) ते पुन्हा वापरत असलेल्या इतिहासातून `reasoning_content` काढून टाकतात. OmniRoute ते सर्व्हर-साइड कॅशेमधून पुनर्संचयित करते, ज्यामुळे अपस्ट्रीमला दिसणारी विनंती सुसंगत राहते. प्रक्रिया रीस्टार्ट झाल्यानंतरही कॅशे टिकून राहावी यासाठी Issue #1628 मध्ये हायब्रिड मेमरी/SQLite पर्सिस्टन्स सादर करण्यात आले.

## आर्किटेक्चर

```
टर्न N (असिस्टंट जनरेट करतो):
  → प्रतिसादामध्ये reasoning_content + tool_calls असतात
  → जर requiresReasoningReplay(provider, model) असेल: cacheReasoningFromAssistantMessage()
      प्रत्येक tool_call.id नुसार की केलेले (मेमरी + DB मध्ये) लिहिते
  → प्रतिसाद क्लायंटकडे फॉरवर्ड केला जातो (जो reasoning राखून ठेवू शकतो किंवा ठेवू शकत नाही)

टर्न N+1 (क्लायंट फॉलो-अप पाठवतो):
  → ट्रान्सलेटर शोधतो: requiresReasoningReplay(provider, model) === true
  → tool_calls असलेल्या आणि reasoning_content नसलेल्या प्रत्येक असिस्टंट मेसेजसाठी:
      lookupReasoning(toolCalls[0].id) → मेमरी → DB
      हिट  → msg.reasoning_content = cached; recordReplay()
      मिस → msg.reasoning_content = "" (जुन्या DeepSeek साठी लेगसी फॉलबॅक)
  → अपस्ट्रीमला सुसंगत हिस्टरी दिसते → 400 त्रुटी नाही
```

कॅप्चर `open-sse/handlers/chatCore.ts` मध्ये होते (दोन ठिकाणी, दोन `cacheReasoningFromAssistantMessage` कॉल साइट्सवर). रिप्ले `open-sse/translator/index.ts` मध्ये स्कीमा कोअर्शननंतर, परंतु डिस्पॅचपूर्वी होते.

साध्या (टूल-कॉल नसलेल्या) असिस्टंट टर्न्सना वेगळ्या प्रकारे की केले जाते: `buildAssistantMessageCacheKey()` सेशन स्कोप आणि त्या टर्नपर्यंतच्या नॉर्मलाइझ केलेल्या OpenAI-फॉरमॅट ट्रान्सक्रिप्टचा डायजेस्ट तयार करते, कारण `tools` उपस्थित झाल्यानंतर DeepSeek ला _प्रत्येक_ आधीच्या टर्नचे रिझनिंग आवश्यक असते. Responses-API टार्गेट्ससाठी (उदाहरणार्थ `opencode-go/deepseek-v4-flash`, जे `/responses` कडे रूट केले जाते) अपस्ट्रीम बॉडीमध्ये `messages` ऐवजी `input` असते, त्यामुळे `translateRequest()` (`open-sse/translator/index.ts`) कॉलबॅक पर्यायाद्वारे त्याने डायजेस्ट केलेल्या पिव्हट ट्रान्सक्रिप्टची माहिती देते आणि कॅप्चर साइट्स त्याच ट्रान्सक्रिप्टचा डायजेस्ट तयार करतात. Responses रिप्ले पास प्रत्येक सोर्स फॉरमॅटसाठी OpenAI पिव्हटवर चालतो, त्यामुळे Anthropic Messages क्लायंट्सचाही (Claude → OpenAI → Responses) रिप्ले केला जातो.

## स्टोरेज — हायब्रिड मेमरी + SQLite

हॉट पाथ क्रॅश रिकव्हरी आणि डॅशबोर्ड दृश्यमानतेसाठी SQLite टेबलद्वारे समर्थित इन-मेमरी `Map` (निर्मितीनुसार LRU) वापरतो.

| स्तर  | अंमलबजावणी                                       | उद्देश                                      |
| ----- | ------------------------------------------------ | ------------------------------------------- |
| मेमरी | `open-sse/services/reasoningCache.ts` मधील `Map` | जलद लुकअप्स, 200 वर सर्वांत जुनी नोंद काढते |
| DB    | `reasoning_cache` टेबल (`src/lib/db/`)           | रीस्टार्टनंतरही टिकते, आकडेवारी चालवते      |

लेखन दोन्हीकडे होते. वाचन प्रथम मेमरीमध्ये शोधते आणि नंतर DB चा फॉलबॅक म्हणून वापर करते (DB हिट्स पुन्हा मेमरीमध्ये प्रमोट केले जातात). DB अपयश घातक नसतात — इन-मेमरी कॅशे हॉट पाथला सेवा देणे सुरू ठेवते.

**डीफॉल्ट्स:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- कमाल मेमरी नोंदी: `200` (`MAX_MEMORY_ENTRIES`)
- इव्हिक्शन: सर्वांत जुने `createdAt` प्रथम

## डेटाबेस स्कीमा

मायग्रेशन: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

इंडेक्सेस: `expires_at`, `provider`, `model`, `created_at`. `expires_at` हे Unix epoch सेकंदांमध्ये संग्रहित केले जाते; SELECT स्तर `EXPIRES_AT_EPOCH_SQL` द्वारे जुन्या मजकूर मूल्यांचे सामान्यीकरण करतो.

## प्रदाता / मॉडेल शोध

`requiresReasoningReplay(provider, model)` ने `true` परत केल्यावर Replay सक्षम होते. हे फंक्शन `open-sse/services/reasoningCache.ts` मधील दोन याद्या तपासते.

**प्रदाता IDs (अचूक जुळणी, अक्षरांचा आकार विचारात न घेता):**

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

**मॉडेल regex नमुने (अक्षरांचा आकार विचारात न घेता):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` आणि `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, पर्यायी `-free` प्रत्यय)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

नवीन कठोर प्रदाता/मॉडेल जोडण्यासाठी यापैकी एका यादीत त्याची भर घालावी आणि Replay अंतःक्षेपाची पुष्टी करणारी unit test लिहावी. PR वर्णनात बदलासाठी कारणीभूत ठरलेली अचूक upstream 400 स्ट्रिंग नमूद करावी.

## REST API

कॅशे `src/app/api/cache/reasoning/route.ts` अंतर्गत दोन endpoints उपलब्ध करून देते. दोन्हींसाठी व्यवस्थापन प्रमाणीकरण (`@/shared/utils/apiAuth` मधील `isAuthenticated`) आवश्यक आहे.

| पद्धत  | Endpoint                                                  | वर्णन                                                                |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | आकडेवारी + पृष्ठांकित नोंदी                                          |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | फिल्टर केलेली सूची (`limit` हे `[1, 200]` पर्यंत मर्यादित केले जाते) |
| DELETE | `/api/cache/reasoning`                                    | सर्वकाही (मेमरी + DB) साफ करून hit/miss संख्या रीसेट करते            |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | केवळ एका प्रदात्याच्या नोंदी साफ करते                                |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | एकच नोंद हटवते                                                       |

**GET प्रतिसादाची रचना:**

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

## कार्यान्वयनविषयक नोंदी

- **स्वच्छता:** `cleanupReasoningCache()` कालबाह्य झालेल्या मेमरी नोंदी काढून टाकते आणि `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` चालवते. Health-check workers हे वेळोवेळी कॉल करतात.
- **क्रॅशनंतर पुनर्प्राप्ती:** रीस्टार्टनंतर मेमरी रिकामी असते, परंतु DB मध्ये अद्याप कालबाह्य न झालेल्या नोंदी असतात. दिलेल्या `tool_call_id` साठी पहिला lookup हा DB hit असतो; त्यानंतरचे lookups हे memory hits असतात.
- **Reasoning नाही, cache नाही:** assistant संदेशात `reasoning_content` / `reasoning` field नसल्यास `cacheReasoningFromAssistantMessage` हे `0` परत करते, त्यामुळे non-thinking प्रतिसादांसाठी काहीही खर्च होत नाही.
- **लेखनावरही नियंत्रण आहे:** `chatCore.ts` मधील दोन्ही call sites (non-streaming आणि streaming) `requiresReasoningReplay(provider, model)` हे `true` असतानाच `cacheReasoningFromAssistantMessage()` कॉल करतात — read side तपासते तोच हा predicate आहे. जे installs कधीही replay provider वापरत नाहीत, त्यांना प्रत्येक reasoning-bearing प्रतिसादासाठी write, index update आणि try/catch यांचा खर्च करावा लागत नाही.
- **Non-strict providers:** `requiresReasoningReplay` हे `false` असताना आणि target format OpenAI असताना, translator जाणाऱ्या संदेशांमधून कोणतेही `reasoning_content` field **काढून टाकतो** — OpenAI Chat Completions ते स्वीकारत नाही.

## Muse अपारदर्शक तर्काचे स्वामित्व

Muse (`muse-code`) कॉलरशी बांधलेला अपारदर्शक तर्क (`encrypted_content`) परत करतो. तो वेगळ्या खात्याने किंवा पुन्हा जारी केलेल्या क्रेडेन्शियलने रीप्ले केल्यास अपस्ट्रीमवर अपयशी होतो, म्हणून नेटिव्ह OAuth विनंत्या प्रति-विनंती फेरबदलाऐवजी सत्र-पातळीचे स्वामित्व वापरतात (`src/sse/services/museSessionOwnership.ts`, अंमलबजावणी `src/sse/handlers/chat.ts` मध्ये). स्पष्टपणे निवडलेली API-की कनेक्शन आणि फक्त API-की असलेली कॉन्फिगरेशन या स्वामित्व मोडशिवाय त्यांचे विद्यमान राउटिंग राखतात.

- प्रत्येक टर्नमध्ये स्थिर सत्र ID द्या: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` किंवा `x-codex-session-id`; पर्यायाने बॉडीत `prompt_cache_key`, `session_id`, `conversation_id` किंवा `metadata.session_id` वापरा (याच प्राधान्यक्रमाने). दोन किंवा अधिक नेटिव्ह OAuth खाती सक्रिय असताना गहाळ किंवा रिकामे ID 400 परत करतात; एकच OAuth खाते असल्यास बदलण्यासाठी दुसरे खाते नसते, म्हणून अशी विनंती पिन नसलेले राउटिंग राखते. स्कोपमध्ये कॉलरच्या OmniRoute API-कीचा ID समाविष्ट असतो.
- नवीन स्वतंत्र सत्रे API-की कनेक्शन धोरणाने परवानगी दिलेल्या सक्रिय नेटिव्ह OAuth खात्यांमध्ये कनेक्शन ID क्रमाने आळीपाळीने वाटली जातात. हे वाटप कनेक्शन कूलडाउनमधील, अंतिम स्थितीतील (`banned`, `expired`, `credits_exhausted`) किंवा मागितलेल्या मॉडेलसाठी लॉक असलेली खाती वगळते; Muse अपस्ट्रीम अपयश इतर प्रदात्यांप्रमाणे कूलडाउन आणि ब्रेकर स्थिती नोंदवतात. स्पष्टपणे सक्तीचे कनेक्शन नवीन सत्रासाठी आळीपाळीचे वाटप वगळते, पण यशस्वी उत्तर दिल्यानंतर मालक बदलू शकत नाही.
- मालकाने यशस्वी उत्तर देईपर्यंत, मालक अनुपलब्ध झालेल्या सत्राचा दावा निरोगी खात्यावर पुन्हा केला जातो. पहिल्या यशस्वी उत्तरानंतर सत्र 30 दिवस निष्क्रिय होईपर्यंत त्याच मालकाला पिन राहते (`MUSE_SESSION_IDLE_TTL_MS`).
- प्रत्येक पुढील विनंती आणि साधन-परिणाम टर्न सत्र मालकाला पिन राहतो: कनेक्शन, खाते-ओळख आणि इन्फरन्स क्रेडेन्शियलची पिढी; अपस्ट्रीम प्रयत्नांपूर्वी, क्रेडेन्शियल-रीफ्रेश पुनर्प्रयत्नांसह, पुन्हा तपासली जातात. Responses कॉल ID/आयटम संदर्भ आणि Chat Completions साधन-कॉल ID त्या सत्रासाठी आणि पिढीसाठी नोंदलेले असणे आवश्यक आहे.
- `muse_session_ownership` नेमस्पेसमधील SQLite `key_value` रेकॉर्ड (`src/lib/db/museSessionOwnership.ts`) स्वामित्व आणि फेरबदल कर्सर रीस्टार्टनंतरही राखतात. प्रत्येक दावा आणि दिलेले उत्तर सत्राचा सक्रियता ठसा अद्यतनित करते; `MUSE_SESSION_IDLE_TTL_MS` पेक्षा जास्त निष्क्रिय सत्र काढले जाते (मालक पिन, उत्तर दिल्याचा फ्लॅग आणि नोंदलेले अपारदर्शक/संदर्भ हॅश), जास्तीत जास्त दर 10 मिनिटांनी एकदा आणि मर्यादित बॅचमध्ये; त्यामुळे नंतर इतिहास रीप्ले केल्यास अज्ञात मालक म्हणून सुरक्षित नकार मिळतो. रेकॉर्डमध्ये कनेक्शन ID आणि खाते-ओळख, क्रेडेन्शियल्स, अपारदर्शक सामग्री व पुढील संदर्भांचे हॅश असतात, गुपिते किंवा संभाषण इतिहास नाही. क्लायंटने पूर्ण इतिहास आणि अपारदर्शक तर्क राखून पाठवणे आवश्यक आहे.
- अज्ञात किंवा परकीय अपारदर्शक तर्क, गहाळ मालक, अनुपलब्ध मालक-खाते किंवा नोंदलेल्या इतिहासासह पिढी बदलल्यास स्पष्ट 4xx/503 सह सुरक्षित नकार दिला जातो — खात्यांदरम्यान गुपचूप फेलओव्हर कधीही होत नाही आणि तर्क कधीही टाकून दिला जात नाही.
- त्याच खात्यासाठी पुन्हा जारी केलेली की फक्त सत्रात रीप्ले करता येणारा इतिहास नोंदलेला नसेल तर स्वीकारली जाते; इतिहास नोंदलेली सत्रे नव्याने सुरू होईपर्यंत सुरक्षित नकार देत राहतात.
- रिकाम्या अपस्ट्रीम उत्तराचा (`upstream_empty_response` / `empty_response`, कॉलरला काहीही पाठवलेले नाही) त्याच मालकावर जास्तीत जास्त दोनदा, प्रथम 0.5 s आणि नंतर 1.5 s नंतर पुनर्प्रयत्न होतो (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). सर्व प्रयत्न रिकामे असल्यास कूलडाउन किंवा ब्रेकर नोंद न करता मूळ 502 परत होतो, त्यामुळे अस्थिर उत्तर मालकाला कधीही लॉकआउट करत नाही.
- सर्व `muse-code` विनंत्या स्ट्रीमिंग लेखनासह सेमॅंटिक-कॅश वाचन आणि लेखन वगळतात, त्यामुळे कॅश केलेल्या अपारदर्शक आउटपुटला वेगळा सत्र मालक मिळू शकत नाही.

रिग्रेशन संरक्षण: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` आणि `tests/unit/chatcore-semantic-cache.test.ts`.

## हे देखील पहा

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकर्स, कूलडाउन कालावधी, मॉडेल लॉकआउट्स
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — अपस्ट्रीम 400 त्रुटींचे निदान
- स्रोत: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- स्थलांतर: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API मार्ग: `src/app/api/cache/reasoning/route.ts`
- मूळ समस्या: #1628
