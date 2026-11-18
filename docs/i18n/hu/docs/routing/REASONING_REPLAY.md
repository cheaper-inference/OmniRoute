# REASONING_REPLAY (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Az igazság forrása:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Utolsó frissítés:** 2026-06-28 — v3.8.40

OmniRoute rögzíti a gondolkodásmódú modellek által előállított asszisztens `reasoning_content`, és transzparensen lejátssza azt többfordulós kérések esetén, amikor az upstream szolgáltató megköveteli. Ez kiküszöböli azokat a HTTP 400 hibákat, amelyeket a szigorú szolgáltatók vetnek fel, ha az ügyfél beszélgetési előzményeiből hiányzik az előző kör indoklása.

## Miért létezik ez

Számos gondolkodásmód-szolgáltató elutasítja a nyomon követést, kivéve, ha a** az előző asszisztensi üzenet tartalmazza az eredeti `reasoning_content`** . Az upstream 400-at ad vissza ilyen üzenetekkel:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

De a tipikus kliensek (Cursor, Cline, Roo Code, OpenAI SDK) kivonják `reasoning_content` az újrajátszott előzményekből. OmniRoute a szerveroldali gyorsítótárból állítja vissza, így az upstream által látott kérés konzisztens. A #1628-as számú probléma bevezette a hibrid memory/SQLite perzisztenciát, így a gyorsítótár túléli a folyamat újraindítását.

## Építészet

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

A rögzítés `open-sse/handlers/chatCore.ts` ban történik (két helyen, a két `cacheReasoningFromAssistantMessage` hívási helyen). A visszajátszás `open-sse/translator/index.ts` ben a séma kényszerítése után, de a feladás előtt történik.

Az eszközhívási bejegyzések `buildToolCallCacheKey()` alatt tárolódnak, amely a kérelem hatókörének és az eszközhívási azonosítónak a kivonata, így ugyanaz az azonosító, amelyet egy másik API kulcs vagy munkamenet használ, nem választja ki a bejegyzést. A hatókör `buildReasoningCacheScope()` ből származik: a API kulcs azonosítója, valamint a munkamenet kulcsa, ha a kérés rendelkezik ilyennel. A `tool_call_id` oszlop és az irányítópult ezért ezeket a bejegyzéseket jeleníti meg.

A sima (nem eszközhívásos) asszisztens körök eltérően vannak billentyűzve: `buildAssistantMessageCacheKey()` a munkamenet hatókörét és a normalizált OpenAI-formátumú átiratot emészti fel egészen addig a körig, mert DeepSeek megköveteli _minden_ előző kör érvelését, ha `tools` jelen van. A Responses-API-célok esetében (például `opencode-go/deepseek-v4-flash`, `/responses`-re irányítva) az upstream törzs `input` hordozza, nem `messages`, így `translateRequest()` (`open-sse/translator/index.ts`) jelenti a visszahívási opción keresztül megemésztett pivot-átiratot, és a rögzítési helyek ugyanazt az átiratot emésztik fel. A Responses replay pass minden forrásformátumhoz a OpenAI pivoton fut, így Anthropic Messages kliensek (Claude → OpenAI → Responses) is újrajátszanak.

## Tároló — hibrid memória + SQLite

A gyors elérési út egy memórián belüli `Map` (LRU-by-creation) használ, amelyet egy SQLite táblázat támogat az összeomlás helyreállításához és az irányítópult láthatóságához.

| Réteg   | Végrehajtás                                   | Cél                                                 |
| ------- | --------------------------------------------- | --------------------------------------------------- |
| Memória | `Map` a `open-sse/services/reasoningCache.ts` | Gyors keresés, a legrégebbi kilakoltatás 200 évesen |
| DB      | `reasoning_cache` asztal (`src/lib/db/`)      | Újraindításkor is megmarad, statisztikákat hajt     |

Mindkettőhöz megy az írás. Az olvasások először a memóriával konzultálnak, majd visszatérnek DB (DB találatai visszakerülnek a memóriába). DB hibák nem végzetesek. — a memórián belüli gyorsítótár továbbra is a forró útvonalat szolgálja ki.

**Alapértelmezések:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximális memóriabejegyzések: `200` (`MAX_MEMORY_ENTRIES`)
- Kilakoltatás: a legrégebbi `createdAt` először

## Adatbázis séma

Migráció: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indexek: `expires_at`, `provider`, `model`, `created_at`. `expires_at` Unix epocha másodpercként van tárolva; a SELECT réteg normalizálja a régi szövegértékeket `EXPIRES_AT_EPOCH_SQL` segítségével.

## Szolgáltató/modellészlelés

A visszajátszás engedélyezve van, ha `requiresReasoningReplay(provider, model)` visszaadja `true`. A függvény két listát ellenőriz `open-sse/services/reasoningCache.ts` ben.

**Szolgáltató IDs (pontos egyezés, nem különbözik a kis- és nagybetűktől):**

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

**Modell reguláris kifejezési minták (kis- és nagybetűk megkülönböztetése):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` és `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcionális `-free` utótag)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Új szigorú provider/model hozzáadása azt jelenti, hogy hozzá kell fűzni az egyik listát, és meg kell írni egy egységtesztet, amely megerősíti a visszajátszást. A PR leírásának pontosan meg kell említenie azt az upstream 400-as karakterláncot, amely a változtatást motiválta.

## REST API

A gyorsítótár két végpontot tesz közzé `src/app/api/cache/reasoning/route.ts` alatt. Mindkettőhöz felügyeleti hitelesítés szükséges (`isAuthenticated` `@/shared/utils/apiAuth` ből).

| Módszer | Végpont                                                   | Leírás                                                                  |
| ------- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statisztika + oldalszámozott bejegyzések                                |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Szűrt lista (`limit` a `[1, 200]`- hez rögzítve )                       |
| DELETE  | `/api/cache/reasoning`                                    | Töröljön mindent (memória + DB), és állítsa vissza hit/miss számlálókat |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Csak egy szolgáltató bejegyzéseinek törlése                             |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Egyetlen bejegyzés törlése                                              |

**GET válaszforma:**

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

## Működési megjegyzések

- **Tisztítás:** `cleanupReasoningCache()` törli a lejárt memóriabejegyzéseket, és futtatja `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Az egészségügyi ellenőrző dolgozók ezt rendszeresen felhívják.
- **Összeomlás helyreállítása:** Újraindítás után a memória üres, de a DB még mindig tartalmaz le nem járt bejegyzéseket. Egy adott `tool_call_id` első keresése DB találat; a későbbi keresések memóriatalálatok.
- **Nincs érvelés, nincs gyorsítótár:** `cacheReasoningFromAssistantMessage` `0` értéket ad vissza, ha az asszisztens üzenetben nincs `reasoning_content` / `reasoning` mező, így a nem gondolkodó válaszok nem kerülnek semmibe.
- **Az írás is zárt:** mindkét hívási hely `chatCore.ts` ban (nem streaming és streaming) csak akkor hívja meg `cacheReasoningFromAssistantMessage()`, ha `requiresReasoningReplay(provider, model)` `true` — ugyanaz a predikátum, mint az olvasási oldal ellenőrzése. Azok a telepítések, amelyek soha nem érintenek visszajátszási szolgáltatót, nem fizetnek az írásért, az indexfrissítésért és a try/catch ért minden érvelést hordozó válasz esetén.
- **Nem szigorú szolgáltatók:** Ha `requiresReasoningReplay` `false` és a célformátum OpenAI, a fordító** csíkok** A kimenő üzenetekből származó `reasoning_content` mezők — OpenAI Chat Completions nem fogadja el.

## Muse átláthatatlan-okoskodó tulajdonjog

A Muse (`muse-code`) a hívóhoz kötött átláthatatlan érvelést (`encrypted_content`) ad vissza. Másik fiókkal vagy újramintázott hitelesítő adatokkal történő újrajátszása meghiúsul, ezért a natív OAuth kérelmek munkamenet-szintű tulajdonjogot használnak a kérésenkénti rotáció helyett (`src/sse/services/museSessionOwnership.ts`, `src/sse/handlers/chat.ts`-ben kötelező). A kifejezetten kiválasztott API-kulcsos kapcsolatok és a csak API-kulcsot használó konfigurációk megtartják meglévő útválasztásukat e tulajdonosi mód nélkül.

- Biztosítson stabil munkamenetet ID minden körben: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` vagy `x-codex-session-id`; vagy használja `prompt_cache_key`, `session_id`, `conversation_id` vagy `metadata.session_id` karaktereket a törzsben (ebben a sorrendben). Hiányzó vagy üres IDs 400-at ad vissza, ha két vagy több natív OAuth fiók aktív; egyetlen OAuth fiókkal nincs mire forgatni, így egy ilyen kérés megtartja a rögzítetlen útválasztást. A hatókör tartalmazza a hívó OmniRoute API-kulcsát, ID.
- Friss független munkamenetek kör-robin az aktív natív OAuth fiókok között, az API-kulcs csatlakozási szabályzata által engedélyezett, ID kapcsolat szerint rendezve. A kör-robin átugorja a fiókokat a kapcsolat lehűlésekor, terminálállapottal (`banned`, `expired`, `credits_exhausted`), vagy a kért modellhez modellzárolt; A Muse upstream meghibásodásai más szolgáltatókhoz hasonlóan rögzítik a lehűlést és a megszakítási állapotot. Egy kifejezetten kényszerített kapcsolat megkerüli az új munkamenet körbejárását, de nem bírálhat felül egy meglévő tulajdonost.
- Amíg a tulajdonos sikeres választ nem ad, a munkamenetet, amelynek tulajdonosa elérhetetlenné vált, a rendszer újra igényelte egy működő fiókban. Az első sikeres válasz után a munkamenet a tulajdonoshoz rögzítve marad, amíg 30 napig tétlen lesz (`MUSE_SESSION_IDLE_TTL_MS`).
- Minden folytatás és eszköz-eredmény fordulat rögzítve marad a munkamenet tulajdonosához: kapcsolat, fiókazonosító és következtetés-hitelesítő adatok generálása, újra ellenőrizve a felfelé irányuló próbálkozások előtt, beleértve a hitelesítő adatok frissítésének újrapróbálkozásait is. IDs/item hivatkozások és a Chat Completions tool-call IDs válaszokat rögzíteni kell az adott munkamenethez és generációhoz.
- SQLite `key_value` rekordok a `muse_session_ownership` névtérben (`src/lib/db/museSessionOwnership.ts`) megőrzik a tulajdonjogot, és a forgatási kurzor újraindul. Minden követelés és kézbesített válasz frissíti a munkamenet tevékenységbélyegzőjét; `MUSE_SESSION_IDLE_TTL_MS` nél hosszabb tétlen munkamenetet levágják (tulajdonos PIN-kódja, kiszolgált zászló és rögzített opaque/reference kivonatok), legfeljebb 10 percenként és korlátozott kötegekben, így az előzmények későbbi visszajátszása ismeretlen tulajdonosként meghiúsul. A rekordok kapcsolódási IDs és fiókazonosítók, hitelesítő adatok, átláthatatlan tartalom és folytatási hivatkozások kivonatát tartalmazzák, nem pedig titkokat vagy beszélgetési előzményeket. Az ügyfeleknek meg kell őrizniük és el kell küldeniük teljes történetüket és átláthatatlan érvelésüket.
- Ismeretlen vagy idegen átláthatatlan érvelés, hiányzó tulajdonos, nem elérhető tulajdonosi fiók vagy nemzedékváltás rögzített előzményekkel meghiúsult, explicit 4xx/503 — soha nem hallgatott fiókok közötti feladatátvétellel, és soha nem ejtette el az érvelést.
- Az újramintázott, azonos fiókhoz tartozó kulcs csak akkor kerül elfogadásra, ha a munkamenet nem rögzített újrajátszható előzményeket; a rögzített munkamenetek mindaddig meghibásodnak, amíg újra nem kezdik.
- Egy üres felfelé irányuló választ (`upstream_empty_response` / `empty_response`, semmi nem ad ki a hívónak) legfeljebb kétszer próbálkozik újra ugyanazon a tulajdonoson, 0,5 mp, majd 1,5 mp (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`) után. Ha minden próbálkozás üres, az eredeti 502-t visszaküldik lehűlés vagy megszakító jelölés nélkül, így a kéretlen válasz soha nem zárja ki a tulajdonost.
- Minden `muse-code` kérés megkerüli a szemantikus gyorsítótár olvasását és írását, beleértve a streamelési írásokat is, így a gyorsítótárazott átlátszatlan kimenet nem szerezhet másik munkamenet-tulajdonost.

Regressziós védők: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` és `tests/unit/chatcore-semantic-cache.test.ts`.

## Lásd még

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — megszakítók, lehűtések, modellzárak
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosztikai upstream 400s
- Forrás: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migráció: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API útvonal: `src/app/api/cache/reasoning/route.ts`
- Eredeti szám: #1628
