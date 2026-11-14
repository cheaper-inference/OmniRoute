# REASONING_REPLAY (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Извор истине:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Последње ажурирано:** 2026-06-28 — в3.8.40

OmniRoute снима помоћника `reasoning_content` произведеног у моделима у начину размишљања и репродукује га транспарентно на захтевима за више окрета када то захтева претходни провајдер. Ово елиминише HTTP 400 грешке које строги провајдери покрећу када клијентовој историји разговора недостаје образложење претходног потеза.

## Зашто ово постоји

Неколико провајдера у начину размишљања одбија накнадно окретање осим ако не** претходна помоћна порука укључује оригинални `reasoning_content`** . Упстреам враћа 400 са порукама попут:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Али типични клијенти (Cursor, Cline, Роо Цоде, OpenAI SDK) уклањају `reasoning_content` из историје коју понављају. OmniRoute га враћа из кеша на страни сервера тако да је захтев који упстреам види конзистентан. Проблем #1628 увео је хибридну memory/SQLite постојаност тако да кеш преживи поновно покретање процеса.

## Архитектура

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), one entry per tool_call.id within the request scope
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(buildToolCallCacheKey(scope, toolCalls[0].id)) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Снимање се дешава у `open-sse/handlers/chatCore.ts` (две локације, на две `cacheReasoningFromAssistantMessage` позивне локације). Поновна репродукција се дешава у `open-sse/translator/index.ts` након принуде шеме, али пре слања.

Уноси позива алата се чувају под `buildToolCallCacheKey()`, сажетком обима захтева и ИД-ом позива алата, тако да исти ИД који користи други API кључ или сесија не бира унос. Опсег долази од `buildReasoningCacheScope()`: API ИД кључа, плус кључ сесије када га захтев има. Колона `tool_call_id` и контролна табла стога показују овај сажетак за те уносе.

Обични потези помоћника (без позивања алата) су различити кључеви: `buildAssistantMessageCacheKey()` обрађује обим сесије плус нормализовани транскрипт ОпенАИ формата до тог окрета, јер DeepSeek захтева образложење _сваког_ претходног окрета када је `tools` присутан. За мете АПИ-ја за одговоре (на пример `opencode-go/deepseek-v4-flash`, преусмерено на `/responses`) узводно тело носи `input`, а не `messages`, тако да `translateRequest()` (`open-sse/translator/index.ts`) извештава о централном транскрипту који је прегледао преко опције повратног позива, а локације за хватање обрађују тај исти транскрипт. Пролаз за понављање одговора се покреће на OpenAI пивот-у за сваки изворни формат, тако да се клијенти Anthropic порука (Claude → OpenAI → одговори) такође репродукују.

## Складиштење — Хибридна меморија + SQLite

Врућа путања користи `Map` у меморији (ЛРУ-би-цреатион) подржан од SQLite табеле за опоравак од пада и видљивост контролне табле.

| Лаиер    | Имплементација                                | Сврха                                              |
| -------- | --------------------------------------------- | -------------------------------------------------- |
| Меморија | `Map` у `open-sse/services/reasoningCache.ts` | Брзо тражење, избацивање најстаријег са 200 година |
| DB       | `reasoning_cache` табела (`src/lib/db/`)      | Опстаје током рестартовања, покреће статистику     |

Написи иду и једнима и другима. Читања прво консултују меморију, а затим се враћају на DB (DB погоци се враћају у меморију). DB кварови нису фатални — кеш у меморији наставља да служи врућој путањи.

**Подразумевано:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Макс. меморијски уноси: `200` (`MAX_MEMORY_ENTRIES`)
- Исељење: прво најстарији `createdAt`

## Шема базе података

Миграција: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Индекси: `expires_at`, `provider`, `model`, `created_at`. `expires_at` се чува као секунде Уник епохе; SELECT слој нормализује застареле текстуалне вредности преко `EXPIRES_AT_EPOCH_SQL`.

## Провајдер / откривање модела

Поновна репродукција је омогућена када `requiresReasoningReplay(provider, model)` врати `true`. Функција проверава две листе у `open-sse/services/reasoningCache.ts`.

**Добављач IDs (тачно подударање, не разликује велика и мала слова):**

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

**Обрасци регуларног израза модела (не разликују велика и мала слова):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` и `/deepseek[-/]?v4[-.]pro/i` (В4 Фласх / Про, опциони `-free` суфикс)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Додавање новог стриктног provider/model значи додавање на једну од ових листа и писање јединичног теста који потврђује убризгавање понављања. PR опис треба да цитира тачан узводни низ од 400 који је мотивисао промену.

## REST API

Кеш излаже две крајње тачке под `src/app/api/cache/reasoning/route.ts`. Оба захтевају аутентификацију управљања (`isAuthenticated` из `@/shared/utils/apiAuth`).

| Метод  | Крајња тачка                                              | Опис                                                   |
| ------ | --------------------------------------------------------- | ------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Статистика + пагинираних уноса                         |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Филтрирани листинг (`limit` спојен на `[1, 200]`)      |
| DELETE | `/api/cache/reasoning`                                    | Обришите све (мемори + DB) и ресетујте hit/miss цоунтс |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Обриши само уносе за једног провајдера                 |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Избришите један унос                                   |

**GET облик одговора:**

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

## Оперативне напомене

- **Чишћење:** `cleanupReasoningCache()` чисти истекле меморијске уносе и покреће `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Здравствени радници то повремено зову.
- **Опоравак од пада:** Након поновног покретања, меморија је празна, али DB још увек садржи неистекле уносе. Прво тражење за дати `tool_call_id` је DB погодак; накнадна претраживања су погоци меморије.
- **Без образложења, без кеша:** `cacheReasoningFromAssistantMessage` враћа `0` када порука помоћника нема поље `reasoning_content` / `reasoning`, тако да одговори без размишљања не коштају ништа.
- **Писање је такође затворено:** обе локације позива у `chatCore.ts` (без стримовања и стриминг) позивају само `cacheReasoningFromAssistantMessage()` када је `requiresReasoningReplay(provider, model)` `true` — исти предикат провере са стране за читање. Инсталације које никада не додирују провајдера за понављање престају да плаћају за писање, ажурирање индекса и try/catch за сваки одговор који садржи образложење.
- **Нестроги добављачи:** Када је `requiresReasoningReplay` `false`, а циљни формат OpenAI, преводилац** траке** било које `reasoning_content` поље из одлазних порука — OpenAI Довршења ћаскања га не прихвата.

## Мусе Опакуе-Реасонинг Овнерсхип

Мусе (`muse-code`) враћа непрозирно резоновање везано за позиваоца (`encrypted_content`). Поновна репродукција под другим налогом или промењеним акредитивима не успева узводно, тако да изворни OAuth захтеви користе власништво на нивоу сесије уместо ротације по захтеву (`src/sse/services/museSessionOwnership.ts`, примењено у `src/sse/handlers/chat.ts`). Експлицитно изабране везе са АПИ кључем и конфигурације само са АПИ кључем задржавају своје постојеће рутирање без овог режима власништва.

- Обезбедите стабилну сесију ID на сваком кораку: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` или `x-codex-session-id`; алтернативно користите `prompt_cache_key`, `session_id`, `conversation_id` или `metadata.session_id` у телу (у том редоследу приоритета). Недостаје или празан IDs враћа 400 када су активна два или више изворних OAuth налога; са једним OAuth налогом нема шта да се ротира, тако да такав захтев задржава неповезано рутирање. Опсег укључује OmniRoute АПИ-кључ ID позиваоца.
- Свеже независне сесије у кругу преко активних матичних OAuth налога дозвољених политиком повезивања АПИ кључа, поређане по конекцији ID. Роунд-робин прескаче налоге у време хлађења везе, са статусом терминала (`banned`, `expired`, `credits_exhausted`) или закључаним моделом за тражени модел; Мусе упстреам кварови бележе хлађење и стање прекида као и други провајдери. Експлицитно принудна веза заобилази кружни рад за нову сесију, али не може заменити постојећег власника.
- Док власник не пружи успешан одговор, сесија чији је власник постао недоступан се поново полаже на здрав налог. Након првог успешног одговора, сесија остаје закачена за тог власника све док не буде неактивна 30 дана (`MUSE_SESSION_IDLE_TTL_MS`).
- Сваки наставак и окретање резултата алата остају закачени за власника сесије: веза, идентитет налога и генерисање акредитива за закључивање, поново се проверава пре покушаја упстреам, укључујући поновне покушаје освежавања акредитива. Одговори позивају IDs/item референце и зкб алатке за завршавање IDs морају бити снимљени за ту сесију и генерацију.
- SQLite `key_value` записи у `muse_session_ownership` именском простору (`src/lib/db/museSessionOwnership.ts`) остају власништво и курсор ротације се поново покреће. Сваки захтев за полагање права и достављени одговор освежавају ознаку активности сесије; сесија неактивна дуже од `MUSE_SESSION_IDLE_TTL_MS` се смањује (пин власника, услужена заставица и снимљени opaque/reference хешеви), највише једном сваких 10 минута иу ограниченим серијама, тако да каснија реприза њене историје не успева да се затвори као непознати власник. Записи садрже IDs везе и хешеве идентитета налога, акредитиве, непрозиран садржај и референце за наставак, а не тајне или историју разговора. Клијенти морају задржати и послати своју пуну историју и непрозирно образложење.
- Непознато или страно непрозирно резоновање, недостајући власник, недоступан власнички налог или промена генерације са забележеном историјом не успевају да се закључе експлицитним 4xx/503 — никад тихим преласком на више налога и никада не одустају од размишљања.
- Поновљени кључ истог налога се усваја само када сесија није забележила историју која се може поново репродуковати; снимљене сесије не успевају затворене док не почну изнова.
- Празан одговор узводно (`upstream_empty_response` / `empty_response`, ништа се не емитује позиваоцу) се поново покушава највише два пута на истом власнику, након 0,5 с, а затим 1,5 с (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Ако су сви покушаји празни, оригинални 502 се враћа без хлађења или означавања прекидача, тако да пали одговор никада не блокира власника.
- Сви `muse-code` захтеви заобилазе читање и уписивање семантичког кеша, укључујући стримовање уписивања, тако да кеширани непрозирни излаз не може да добије другог власника сесије.

Регресиони чувари: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` и `tests/unit/chatcore-semantic-cache.test.ts`.

## Види такође

- [RESILIENCE_GUIDE.мд](../architecture/RESILIENCE_GUIDE.md) — прекидачи, хлађење, блокада модела
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — дијагностикује упстреам 400с
- Извор: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Миграција: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API рута: `src/app/api/cache/reasoning/route.ts`
- Оригинално издање: #1628
