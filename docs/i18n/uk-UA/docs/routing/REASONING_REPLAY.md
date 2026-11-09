# REASONING_REPLAY (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Джерело правди:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute фіксує допоміжний `reasoning_content` створений моделями мисленнєвого режиму, і прозоро відтворює його на багаточергові запити, коли цього вимагає постачальник вищестоящого потоку. Це усуває помилки HTTP 400, які викликають суворі постачальники, коли в історії розмов клієнта відсутні міркування попереднього ходу.

## Чому це існує

Кілька постачальників режиму мислення відмовляються від наступного повороту, якщо не** попереднє повідомлення помічника містить оригінальний `reasoning_content`** . Вихідний поток повертає 400 із такими повідомленнями:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Але типові клієнти (Cursor, Cline, Roo Code, OpenAI SDK) видаляють `reasoning_content` з історії, яку вони відтворюють. OmniRoute відновлює його з кешу на стороні сервера, щоб запит, який бачить висхідний канал, був послідовним. Випуск #1628 представив гібридну постійність memory/SQLite, щоб кеш витримував перезапуски процесу.

## Архітектура

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

Захоплення відбувається в `open-sse/handlers/chatCore.ts` (два сайти, на двох сайтах виклику `cacheReasoningFromAssistantMessage` ). Повторне відтворення відбувається в `open-sse/translator/index.ts` після примусу схеми, але перед відправленням.

Звичайні ходи помічника (не виклику інструментів) ключаються по-іншому: `buildAssistantMessageCacheKey()` переварює область сеансу плюс нормалізовану стенограму у форматі OpenAI до цього ходу, оскільки DeepSeek вимагає обґрунтування _кожного_ попереднього ходу, коли `tools` присутній. Для цілей Responses-API (наприклад, `opencode-go/deepseek-v4-flash`, спрямованих на `/responses`) вихідне тіло містить `input`, а не `messages`, тому `translateRequest()` (`open-sse/translator/index.ts`) повідомляє зведену транскрипцію, яку він перетравлює через опцію зворотного виклику, а сайти захоплення переробляють ту саму транскрипт. Прохід повторного відтворення відповідей виконується на стержні OpenAI для кожного вихідного формату, тому клієнти повідомлень Anthropic (відповіді Claude → OpenAI → ) також відтворюються.

## Зберігання — Hybrid Memory + SQLite

Гарячий шлях використовує `Map` в пам’яті (LRU-by-creation), що підтримується таблицею SQLite для відновлення після збою та видимості інформаційної панелі.

| Шар     | Реалізація                                    | призначення                                           |
| ------- | --------------------------------------------- | ----------------------------------------------------- |
| Пам'ять | `Map` в `open-sse/services/reasoningCache.ts` | Швидкий пошук, виселяє найстаршого у віці 200 років   |
| DB      | таблиця `reasoning_cache` (`src/lib/db/`)     | Зберігається після перезапусків, накопичує статистику |

Написи йдуть до обох. Читання спочатку звертаються до пам’яті, а потім повертаються до DB (звернення DB повертаються в пам’ять). DB збої не фатальні — кеш у пам’яті продовжує обслуговувати гарячий шлях.

**За замовчуванням:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Максимальний об’єм пам’яті: `200` (`MAX_MEMORY_ENTRIES`)
- Виселення: спочатку найстаріший `createdAt`

## Схема бази даних

Міграція: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Індекси: `expires_at`, `provider`, `model`, `created_at`. `expires_at` зберігається як секунди епохи Unix; рівень SELECT нормалізує застарілі текстові значення через `EXPIRES_AT_EPOCH_SQL`.

## Виявлення постачальника/моделі

Відтворення вмикається, коли `requiresReasoningReplay(provider, model)` повертає `true`. Функція перевіряє два списки в `open-sse/services/reasoningCache.ts`.

**Постачальник IDs (точна відповідність, без урахування регістру):**

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

**Шаблони регулярних виразів моделі (незалежні від регістру):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` та `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, необов’язковий суфікс `-free` )
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Додавання нового суворого provider/model означає додавання до одного з цих списків і написання модульного тесту, що підтверджує впровадження повторного відтворення. В описі PR має бути вказано точний рядок 400 вище за течією, який мотивував зміну.

## REST API

Кеш відкриває дві кінцеві точки під `src/app/api/cache/reasoning/route.ts`. Обидва вимагають автентифікації керування (`isAuthenticated` від `@/shared/utils/apiAuth`).

| метод  | Кінцева точка                                             | опис                                                      |
| ------ | --------------------------------------------------------- | --------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Статистика + розбиті на сторінки записи                   |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Відфільтрований список (`limit` закріплено на `[1, 200]`) |
| DELETE | `/api/cache/reasoning`                                    | Очистіть усе (пам’ять + DB) і скиньте лічильники hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Очистити лише записи для одного постачальника             |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Видалити один запис                                       |

**форма відповіді GET :**

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

## Операційні примітки

- **Очищення:** `cleanupReasoningCache()` очищає прострочені записи пам'яті та запускає `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Сюди періодично дзвонять санітарні працівники.
- **Відновлення після збою:** Після перезапуску пам’ять порожня, але DB все ще містить непрострочені записи. Перший пошук для даного `tool_call_id` є зверненням DB ; наступні пошуки є зверненнями до пам'яті.
- **Без міркувань, без кешу:** `cacheReasoningFromAssistantMessage` повертає `0` коли повідомлення помічника не має поля `reasoning_content` / `reasoning`, тому відповіді без роздумів не коштують нічого.
- **Запис також закритий:** обидва сайти викликів у `chatCore.ts` (не потоковий і потоковий) викликають лише `cacheReasoningFromAssistantMessage()` коли `requiresReasoningReplay(provider, model)` є `true` — той самий предикат, який перевіряє сторона читання. Інсталяції, які ніколи не торкаються постачальника відтворення, перестають платити за запис, оновлення індексу та try/catch за кожну резонансну відповідь.
- **Нестрогі провайдери:** Коли `requiresReasoningReplay` є `false`, а цільовим форматом є OpenAI, перекладач** смужки** будь-яке поле `reasoning_content` із вихідних повідомлень — OpenAI Chat Completions не приймає його.

## Muse Opaque-Reasoning Власність

Muse (`muse-code`) повертає непрозоре міркування, пов’язане з абонентом (`encrypted_content`). Повторне відтворення під іншим обліковим записом або переробленими обліковими даними не вдається отримати, тому рідні запити OAuth використовують право власності на рівні сеансу замість ротації за запитом (`src/sse/services/museSessionOwnership.ts`, примусово в `src/sse/handlers/chat.ts`). Явно вибрані з’єднання з ключем API та конфігурації лише з ключем API зберігають існуючу маршрутизацію без цього режиму власності.

- Забезпечуйте стабільну сесію ID кожного ходу: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` або `x-codex-session-id`; альтернативно використовуйте `prompt_cache_key`, `session_id`, `conversation_id` або `metadata.session_id` в тілі (у цьому порядку пріоритету). Відсутній або порожній IDs повертає 400, якщо активні два або більше рідних облікових записів OAuth ; з одним обліковим записом OAuth немає чого обертатися, тому такий запит залишає незакріпленою маршрутизацію. Область включає в себе API-ключ OmniRoute абонента ID.
- Нові незалежні сеанси циклічного переміщення між активними рідними обліковими записами OAuth, дозволеними політикою підключення ключа API, упорядкованими за підключенням ID. Циклічний перемикач пропускає облікові записи під час відновлення з’єднання, із термінальним статусом (`banned`, `expired`, `credits_exhausted`) або модель заблокована для запитуваної моделі; Збої вгорі Muse записують час відновлення та стан вимикача, як і інші постачальники. Явно примусове з’єднання обходить циклічний перехід для нового сеансу, але не може замінити існуючого власника.
- Доки власник не надасть успішну відповідь, сеанс, власник якого став недоступним, повторно затребується на справний обліковий запис. Після першої успішної відповіді сеанс залишається прикріпленим до цього власника, доки він не буде неактивний протягом 30 днів (`MUSE_SESSION_IDLE_TTL_MS`).
- Кожен хід продовження та результатів інструменту залишається прикріпленим до власника сеансу: з’єднання, ідентифікатор облікового запису та генерація облікових даних для висновку, перевіряються ще раз перед спробами висхідного потоку, включаючи повторні спроби оновлення облікових даних. Для цього сеансу та генерації мають бути записані посилання на виклики відповідей IDs/item та виклик інструмента завершення чату IDs.
- SQLite Записи `key_value` у просторі імен `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) зберігають право власності та перезапускають курсор обертання. Кожна претензія та надана відповідь оновлює штамп активності сеансу; сеанс простою, який триває довше, ніж `MUSE_SESSION_IDLE_TTL_MS` скорочується (пін-код власника, прапорець обслуговування та записані хеші opaque/reference ), щонайбільше раз на 10 хвилин і в обмежених пакетах, тому пізніший повтор його історії не закривається як невідомий власник. Записи містять IDs підключення та хеші ідентифікації облікового запису, облікові дані, непрозорий вміст і посилання на продовження, а не секрети чи історію розмов. Клієнти повинні зберігати та надсилати свою повну історію та непрозорі міркування.
- Невідоме або стороннє непрозоре обґрунтування, відсутній власник, недоступний обліковий запис власника або зміна покоління із записаною історією не вдалося закрити за допомогою явного 4xx/503 — ніколи не мовчазного перемикання збоїв між обліковими записами та ніколи не скиданого міркування.
- Перероблений ключ того самого облікового запису приймається лише тоді, коли сеанс не записав історію повторного відтворення; записані сеанси залишаються невдалими закритими, доки не розпочнуться заново.
- Порожня вихідна відповідь (`upstream_empty_response` / `empty_response`, абоненту нічого не надсилається) повторюється щонайбільше двічі для того самого власника, через 0,5 с, потім через 1,5 с (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Якщо всі спроби порожні, оригінальний 502 повертається без відновлення або маркування вимикача, тому нестійка відповідь ніколи не блокує власника.
- Усі запити `muse-code` обходять читання та запис семантичного кешу, включаючи потокові записи, тому кешований непрозорий вихід не може отримати іншого власника сеансу.

Захисники регресії: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` і `tests/unit/chatcore-semantic-cache.test.ts`.

## Дивіться також

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — автоматичні вимикачі, перезарядка, блокування моделі
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — діагностика вгору 400s
- Джерело: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Міграція: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- маршрут API : `src/app/api/cache/reasoning/route.ts`
- Оригінальний випуск: #1628
