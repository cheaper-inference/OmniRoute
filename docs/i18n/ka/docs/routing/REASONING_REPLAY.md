# Reasoning Replay Cache (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **ჭეშმარიტების წყარო:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **ბოლოს განახლდა:** 2026-06-28 — v3.8.40

OmniRoute იღებს აზროვნების რეჟიმის მოდელების მიერ გენერირებულ ასისტენტის `reasoning_content`-ს და გამჭვირვალედ ხელახლა გადასცემს მას მრავალსვლიან მოთხოვნებში, როდესაც ამას ზედა დონის პროვაიდერი მოითხოვს. ეს გამორიცხავს HTTP 400 შეცდომებს, რომლებსაც მკაცრი პროვაიდერები აბრუნებენ, როდესაც კლიენტის საუბრის ისტორიაში წინა სვლის მსჯელობა არ არის.

## რატომ არსებობს ეს

აზროვნების რეჟიმის რამდენიმე პროვაიდერი უარყოფს მომდევნო სვლას, თუ **ასისტენტის წინა შეტყობინება თავდაპირველ `reasoning_content`-ს არ შეიცავს**. ზედა დონის სერვისი აბრუნებს 400 შეცდომას მსგავსი შეტყობინებებით:

```
არასწორი პარამეტრი: აზროვნების რეჟიმში reasoning_content ხელახლა უნდა გადაეცეს API-ს.
```

თუმცა ტიპური კლიენტები (Cursor, Cline, Roo Code, OpenAI SDK) ხელახლა გადაცემული ისტორიიდან `reasoning_content`-ს შლიან. OmniRoute აღადგენს მას სერვერის მხარეს არსებული კეშიდან, რათა ზედა დონის სერვისის მიერ მიღებული მოთხოვნა თანმიმდევრული იყოს. საკითხმა #1628 დანერგა მეხსიერებისა და SQLite-ის ჰიბრიდული პერმანენტული შენახვა, რათა კეში პროცესის ხელახლა გაშვების შემდეგაც შენარჩუნდეს.

## არქიტექტურა

```
რაუნდი N (ასისტენტი აგენერირებს):
  → პასუხი შეიცავს reasoning_content-ს + tool_calls-ს
  → თუ requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      ინახავს (მეხსიერებაში + DB-ში), გასაღებად ყოველი tool_call.id-ის გამოყენებით
  → პასუხს გადასცემს კლიენტს (რომელმაც reasoning შეიძლება შეინარჩუნოს ან არ შეინარჩუნოს)

რაუნდი N+1 (კლიენტი აგზავნის შემდგომ მოთხოვნას):
  → მთარგმნელი ამოიცნობს: requiresReasoningReplay(provider, model) === true
  → თითოეული ასისტენტის შეტყობინებისთვის, რომელსაც აქვს tool_calls და არ აქვს reasoning_content:
      lookupReasoning(toolCalls[0].id) → მეხსიერება → DB
      დამთხვევა  → msg.reasoning_content = cached; recordReplay()
      აცდენა → msg.reasoning_content = "" (ძველი DeepSeek-ისთვის მემკვიდრეობითი სათადარიგო ვარიანტი)
  → ზედა დონის სერვერი ხედავს თანმიმდევრულ ისტორიას → 400 არ წარმოიქმნება
```

ჩაწერა ხდება `open-sse/handlers/chatCore.ts`-ში (ორ ადგილას, `cacheReasoningFromAssistantMessage`-ის გამოძახების ორ წერტილში). ხელახალი ჩასმა ხდება `open-sse/translator/index.ts`-ში, სქემის იძულებითი გარდაქმნის შემდეგ, მაგრამ გადაგზავნამდე.

ასისტენტის ჩვეულებრივი (tool-call-ის არმქონე) რაუნდებისთვის გასაღები სხვაგვარად იქმნება: `buildAssistantMessageCacheKey()` ქმნის სესიის ფარგლებისა და ამ რაუნდამდე ნორმალიზებული OpenAI-ფორმატის ტრანსკრიპტის დაიჯესტს, რადგან `tools`-ის არსებობისას DeepSeek-ს _ყოველი_ წინა რაუნდის reasoning სჭირდება. Responses-API-ის სამიზნეებისთვის (მაგალითად, `opencode-go/deepseek-v4-flash`, რომელიც მარშრუტიზდება `/responses`-ზე) ზედა დონის მოთხოვნის სხეული შეიცავს `input`-ს და არა `messages`-ს, ამიტომ `translateRequest()` (`open-sse/translator/index.ts`) callback-პარამეტრის მეშვეობით ატყობინებს მის მიერ დამუშავებულ შუალედურ ტრანსკრიპტს, ხოლო ჩაწერის წერტილები იმავე ტრანსკრიპტის დაიჯესტს ქმნიან. Responses-ის ხელახალი ჩასმის ეტაპი ყველა საწყისი ფორმატისთვის OpenAI-ის შუალედურ წარმოდგენაზე სრულდება, ამიტომ Anthropic Messages-ის კლიენტებისთვისაც (Claude → OpenAI → Responses) ხდება ხელახალი ჩასმა.

## საცავი — მეხსიერებისა და SQLite-ის ჰიბრიდი

სწრაფი გზა იყენებს მეხსიერებაში არსებულ `Map`-ს (LRU შექმნის დროის მიხედვით), რომელსაც ავარიული აღდგენისა და მართვის პანელში ხილვადობისთვის SQLite-ის ცხრილი უდევს საფუძვლად.

| ფენა       | იმპლემენტაცია                                      | დანიშნულება                                               |
| ---------- | -------------------------------------------------- | --------------------------------------------------------- |
| მეხსიერება | `Map` ფაილში `open-sse/services/reasoningCache.ts` | სწრაფი ძიება, 200 ჩანაწერისას შლის ყველაზე ძველს          |
| DB         | `reasoning_cache` ცხრილი (`src/lib/db/`)           | ინახება ხელახლა გაშვებებს შორის, უზრუნველყოფს სტატისტიკას |

ჩაწერა ორივეგან ხდება. წაკითხვა ჯერ მეხსიერებას ამოწმებს, შემდეგ კი DB-ს მიმართავს (DB-ში ნაპოვნი ჩანაწერები კვლავ მეხსიერებაში გადადის). DB-ის შეცდომები ფატალური არ არის — მეხსიერებაში არსებული კეში სწრაფი გზის მომსახურებას განაგრძობს.

**ნაგულისხმევი მნიშვნელობები:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- მეხსიერების ჩანაწერების მაქსიმალური რაოდენობა: `200` (`MAX_MEMORY_ENTRIES`)
- ჩანაწერების წაშლა: ჯერ ყველაზე ძველი `createdAt`

## მონაცემთა ბაზის სქემა

მიგრაცია: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

ინდექსები: `expires_at`, `provider`, `model`, `created_at`. `expires_at` ინახება Unix ეპოქის წამების სახით; SELECT ფენა მემკვიდრეობით ტექსტურ მნიშვნელობებს `EXPIRES_AT_EPOCH_SQL`-ის მეშვეობით ახდენს ნორმალიზებას.

## პროვაიდერის / მოდელის გამოვლენა

ხელახალი დაკვრა ჩართულია, როდესაც `requiresReasoningReplay(provider, model)` აბრუნებს `true`-ს. ფუნქცია ამოწმებს ორ სიას ფაილში `open-sse/services/reasoningCache.ts`.

**პროვაიდერის ID-ები (ზუსტი დამთხვევა, რეგისტრის გაუთვალისწინებლად):**

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

**მოდელის რეგულარული გამოსახულების შაბლონები (რეგისტრის გაუთვალისწინებლად):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` და `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, არასავალდებულო `-free` სუფიქსით)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

ახალი მკაცრი პროვაიდერის/მოდელის დასამატებლად საჭიროა მისი ერთ-ერთ ამ სიაში ჩამატება და ერთეულოვანი ტესტის დაწერა, რომელიც ხელახალი დაკვრის ჩასმას ადასტურებს. PR-ის აღწერაში მითითებული უნდა იყოს ზუსტი ზედა დონის 400 შეცდომის ტექსტი, რომელმაც ცვლილება განაპირობა.

## REST API

ქეში ხელმისაწვდომს ხდის ორ საბოლოო წერტილს `src/app/api/cache/reasoning/route.ts`-ის ქვეშ. ორივე მოითხოვს მართვის ავტორიზაციას (`isAuthenticated` მოდულიდან `@/shared/utils/apiAuth`).

| მეთოდი | საბოლოო წერტილი                                           | აღწერა                                                                    |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | სტატისტიკა + გვერდებად დაყოფილი ჩანაწერები                                |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | გაფილტრული სია (`limit` შეზღუდულია `[1, 200]` დიაპაზონით)                 |
| DELETE | `/api/cache/reasoning`                                    | ყველაფრის გასუფთავება (მეხსიერება + DB) და hit/miss მრიცხველების განულება |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | მხოლოდ ერთი პროვაიდერის ჩანაწერების გასუფთავება                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ერთი ჩანაწერის წაშლა                                                      |

**GET პასუხის სტრუქტურა:**

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

## საოპერაციო შენიშვნები

- **გასუფთავება:** `cleanupReasoningCache()` შლის მეხსიერებიდან ვადაგასულ ჩანაწერებს და ასრულებს `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` მოთხოვნას. მდგომარეობის შემოწმების მუშაკები ამას პერიოდულად იძახებენ.
- **ავარიული შეწყვეტის შემდეგ აღდგენა:** ხელახლა გაშვების შემდეგ მეხსიერება ცარიელია, მაგრამ DB-ში ვადაგაუსვლელი ჩანაწერები კვლავ რჩება. მოცემული `tool_call_id`-ისთვის პირველი მოძიება DB-ში მოხვედრაა; მომდევნო მოძიებები კი მეხსიერებაში მოხვედრებია.
- **მსჯელობის გარეშე ქეშიც არ არის:** `cacheReasoningFromAssistantMessage` აბრუნებს `0`-ს, როდესაც ასისტენტის შეტყობინებას არ აქვს `reasoning_content` / `reasoning` ველი, ამიტომ მსჯელობის არმქონე პასუხები არაფერს ხარჯავს.
- **ჩაწერაც პირობითია:** `chatCore.ts`-ში ორივე გამოძახების ადგილი (ნაკადური და არანაკადური) `cacheReasoningFromAssistantMessage()`-ს მხოლოდ მაშინ იძახებს, როდესაც `requiresReasoningReplay(provider, model)` არის `true` — ეს იგივე პრედიკატია, რომელსაც წაკითხვის მხარე ამოწმებს. ინსტალაციები, რომლებიც ხელახალი დაკვრის პროვაიდერს არასდროს იყენებენ, აღარ იხდიან ჩაწერის, ინდექსის განახლებისა და ყველა მსჯელობის შემცველ პასუხზე try/catch-ის შესრულების საფასურს.
- **არამკაცრი პროვაიდერები:** როდესაც `requiresReasoningReplay` არის `false` და სამიზნე ფორმატია OpenAI, მთარგმნელი გამავალ შეტყობინებებს `reasoning_content` ველს **აცილებს** — OpenAI Chat Completions მას არ იღებს.

## Muse-ის გაუმჭვირვალე მსჯელობის მფლობელობა

Muse (`muse-code`) აბრუნებს გამომძახებელზე მიბმულ გაუმჭვირვალე მსჯელობას (`encrypted_content`). სხვა ანგარიშით ან ხელახლა გაცემული ავტორიზაციის მონაცემებით მისი გამეორება upstream-ზე მარცხდება, ამიტომ მშობლიური OAuth მოთხოვნები თითო მოთხოვნის როტაციის ნაცვლად სესიის დონის მფლობელობას იყენებს (`src/sse/services/museSessionOwnership.ts`, აღსრულდება `src/sse/handlers/chat.ts`-ში). აშკარად შერჩეული API გასაღების კავშირები და მხოლოდ API გასაღებიანი კონფიგურაციები არსებულ მარშრუტიზაციას ამ მფლობელობის რეჟიმის გარეშე ინარჩუნებს.

- ყოველ turn-ზე მიაწოდეთ სტაბილური სესიის ID: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ან `x-codex-session-id`; ალტერნატიულად სხეულში გამოიყენეთ `prompt_cache_key`, `session_id`, `conversation_id` ან `metadata.session_id` (პრიორიტეტის ამ რიგით). გამოტოვებული ან ცარიელი ID-ები აბრუნებს 400-ს, როცა ორი ან მეტი მშობლიური OAuth ანგარიში აქტიურია; ერთი OAuth ანგარიშისას როტაციის სხვა სამიზნე არ არსებობს, ამიტომ ასეთი მოთხოვნა მიუმაგრებელ მარშრუტიზაციას ინარჩუნებს. scope მოიცავს გამომძახებლის OmniRoute API გასაღების ID-ს.
- ახალი დამოუკიდებელი სესიები round-robin-ით ნაწილდება აქტიურ მშობლიურ OAuth ანგარიშებზე, რომლებსაც API გასაღების კავშირის პოლიტიკა უშვებს, კავშირის ID-ით დალაგებულად. round-robin გამოტოვებს კავშირის მოცდის პერიოდში მყოფ, ტერმინალურ სტატუსიან (`banned`, `expired`, `credits_exhausted`) ან მოთხოვნილი მოდელისთვის დაბლოკილ ანგარიშებს; Muse-ის upstream ჩავარდნები სხვა პროვაიდერების მსგავსად აღრიცხავს მოცდის პერიოდსა და breaker-ის მდგომარეობას. აშკარად იძულებითი კავშირი ახალი სესიისთვის round-robin-ს გვერდს უვლის, მაგრამ მფლობელს ვეღარ შეცვლის მას შემდეგ, რაც მან წარმატებული პასუხი გასცა.
- სანამ მფლობელი წარმატებულ პასუხს გასცემს, სესია, რომლის მფლობელი მიუწვდომელი გახდა, გამართულ ანგარიშს ხელახლა მიეკუთვნება. პირველი წარმატებული პასუხის შემდეგ სესია ამ მფლობელზე მიბმული რჩება, სანამ 30 დღე უმოქმედო არ იქნება (`MUSE_SESSION_IDLE_TTL_MS`).
- ყოველი გაგრძელება და ხელსაწყოს შედეგის turn სესიის მფლობელზე რჩება მიბმული: კავშირი, ანგარიშის იდენტობა და inference-ის ავტორიზაციის მონაცემების თაობა ხელახლა მოწმდება upstream მცდელობებამდე, მათ შორის ავტორიზაციის განახლების შემდეგ გამეორებამდე. Responses-ის call ID-ები/item მითითებები და Chat Completions-ის tool-call ID-ები ამ სესიისა და თაობისთვის უკვე აღრიცხული უნდა იყოს.
- SQLite-ის `key_value` ჩანაწერები `muse_session_ownership` სახელთა სივრცეში (`src/lib/db/museSessionOwnership.ts`) მფლობელობასა და როტაციის კურსორს გადატვირთვებს შორის ინარჩუნებს. ყოველი claim და გაცემული პასუხი აახლებს სესიის აქტივობის ნიშნულს; სესია, რომელიც `MUSE_SESSION_IDLE_TTL_MS`-ზე მეტხანს უმოქმედოა, იწმინდება (მფლობელის მიმაგრება, პასუხის გაცემის flag და აღრიცხული გაუმჭვირვალე შიგთავსის/მითითებების ჰეშები), არა უმეტეს ერთხელ ყოველ 10 წუთში და შეზღუდულ პაკეტებად, ამიტომ მისი ისტორიის მოგვიანებით გამეორება უცნობი მფლობელის გამო უსაფრთხოების მიზნით იბლოკება. ჩანაწერები შეიცავს კავშირის ID-ებსა და ანგარიშის იდენტობის, ავტორიზაციის მონაცემების, გაუმჭვირვალე შიგთავსისა და გაგრძელების მითითებების ჰეშებს და არა საიდუმლოებებს ან საუბრის ისტორიას. კლიენტებმა სრული ისტორია და გაუმჭვირვალე მსჯელობა უნდა შეინახოს და გამოაგზავნოს.
- უცნობი ან უცხო გაუმჭვირვალე მსჯელობა, დაკარგული მფლობელი, მფლობელის მიუწვდომელი ანგარიში ან თაობის ცვლილება აღრიცხული ისტორიის არსებობისას იწვევს უსაფრთხოების მიზნით ბლოკირებას აშკარა 4xx/503-ით; არასოდეს ხდება ჩუმი გადართვა სხვა ანგარიშზე ან მსჯელობის გადაგდება.
- იმავე ანგარიშისთვის ხელახლა გაცემული გასაღები მიიღება მხოლოდ მაშინ, როცა სესიას გასამეორებელი ისტორია არ აღურიცხავს; ისტორიის მქონე სესიები უსაფრთხოების მიზნით ბლოკირებული რჩება ახლიდან დაწყებამდე.
- upstream-ის ცარიელი პასუხი (`upstream_empty_response` / `empty_response`, გამომძახებელს არაფერი მიუღია) იმავე მფლობელზე მაქსიმუმ ორჯერ მეორდება, ჯერ 0.5 s-ის, შემდეგ 1.5 s-ის შემდეგ (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). თუ ყველა მცდელობა ცარიელია, ბრუნდება საწყისი 502 მოცდის პერიოდის ან breaker-ის მონიშვნის გარეშე, ამიტომ არასტაბილური პასუხი მფლობელს არასოდეს ბლოკავს.
- ყველა `muse-code` მოთხოვნა გვერდს უვლის სემანტიკური ქეშის წაკითხვებსა და ჩაწერებს, მათ შორის სტრიმულ ჩაწერებს, რათა ქეშირებულმა გაუმჭვირვალე შედეგმა სხვა სესიის მფლობელი ვერ მიიღოს.

რეგრესიის დამცავი შემოწმებები: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` და `tests/unit/chatcore-semantic-cache.test.ts`.

## აგრეთვე იხილეთ

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ამომრთველები, შეყოვნების პერიოდები, მოდელის ბლოკირებები
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ზემდგომი სერვისიდან მიღებული 400 შეცდომების დიაგნოსტიკა
- საწყისი კოდი: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- მიგრაცია: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API მარშრუტი: `src/app/api/cache/reasoning/route.ts`
- თავდაპირველი საკითხი: #1628
