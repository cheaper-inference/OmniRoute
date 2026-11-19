# REASONING_REPLAY (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Chanzo cha ukweli:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Mara ya mwisho kusasishwa:** 2026-06-28 — v3.8.40

OmniRoute hunasa `reasoning_content` msaidizi inayotolewa na miundo ya modi ya kufikiri na kuirudisha kwa uwazi kwenye maombi ya zamu nyingi wakati mtoaji wa huduma ya juu anapohitaji. Hii huondoa hitilafu za HTTP 400 ambazo watoa huduma kali huibua wakati historia ya mazungumzo ya mteja inakosa hoja za zamu ya awali.

## Kwanini Hii ipo

Watoa huduma kadhaa wa modi ya kufikiri wanakataa zamu ya ufuatiliaji isipokuwa tu** ujumbe wa awali wa msaidizi unajumuisha `reasoning_content` asili** . Mkondo wa juu unarudisha 400 na ujumbe kama:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Lakini wateja wa kawaida (Cursor, Cline, Roo Code, OpenAI SDK) huondoa `reasoning_content` kwenye historia wanayocheza tena. OmniRoute huirejesha kutoka kwa kache ya upande wa seva ili ombi la mkondo unaona liwe thabiti. Toleo #1628 lilianzisha uendelevu wa mseto memory/SQLite ili akiba isalimie mchakato kuanza tena.

## Usanifu

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

Kunasa hufanyika katika `open-sse/handlers/chatCore.ts` (tovuti mbili, kwenye tovuti mbili za simu `cacheReasoningFromAssistantMessage` ). Kucheza tena hufanyika `open-sse/translator/index.ts` baada ya kulazimishwa kwa schema lakini kabla ya kutumwa.

Maingizo ya simu ya zana huhifadhiwa chini ya `buildToolCallCacheKey()`, muhtasari wa upeo wa ombi na kitambulisho cha simu ya zana, kwa hivyo kitambulisho sawa kinachotumiwa na kitufe kingine API au kipindi hakichagui ingizo. Wigo unatoka `buildReasoningCacheScope()`: kitambulisho cha API, pamoja na kitufe cha kikao wakati ombi lina moja. Kwa hivyo safu wima `tool_call_id` na dashibodi huonyesha muhtasari huu kwa maingizo hayo.

Zamu za usaidizi wa kawaida (zisizo za simu) huwekwa vifunguo tofauti: `buildAssistantMessageCacheKey()` huchanganua upeo wa kipindi pamoja na manukuu ya umbizo la OpenAI iliyorekebishwa hadi zamu hiyo, kwa sababu DeepSeek inahitaji hoja ya _kila_ zamu ya awali mara `tools` inapopatikana. Kwa malengo ya Responses-API (kwa mfano `opencode-go/deepseek-v4-flash`, iliyoelekezwa kwa `/responses`) sehemu ya juu ya mkondo hubeba `input`, si `messages`, kwa hivyo `translateRequest()` (`open-sse/translator/index.ts`) huripoti nakala ya egemeo iliyochakachuliwa kupitia chaguo la kurudisha nyuma na tovuti za kunasa huchanganua nakala hiyo hiyo. Pasi ya uchezaji wa marudio ya Majibu inaendeshwa kwenye egemeo la OpenAI kwa kila umbizo la chanzo, kwa hivyo wateja wa Anthropic Messages (Claude → OpenAI → Majibu) huchezwa tena.

## Uhifadhi — Hybrid Kumbukumbu + SQLite

Njia ya moto hutumia `Map` ya ndani ya kumbukumbu (LRU-by-creation) inayoungwa mkono na jedwali la SQLite kwa urejeshaji wa ajali na mwonekano wa dashibodi.

| Tabaka     | Utekelezaji                                        | Kusudi                                                     |
| ---------- | -------------------------------------------------- | ---------------------------------------------------------- |
| Kumbukumbu | `Map` katika `open-sse/services/reasoningCache.ts` | Utafutaji wa haraka, anafukuzwa akiwa na umri wa miaka 200 |
| DB         | meza `reasoning_cache` (`src/lib/db/`)             | Huendelea katika kuwashwa upya, huhifadhi takwimu          |

Anaandika kwenda kwa wote wawili. Usomaji unashauriana na kumbukumbu kwanza, kisha urudi kwa DB ( vibao vya DB vinapandishwa cheo na kuwa kumbukumbu). DB kushindwa sio mbaya — kache ya kumbukumbu inaendelea kutumikia njia moto.

**Chaguomsingi:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maingizo ya kumbukumbu ya juu: `200` (`MAX_MEMORY_ENTRIES`)
- Kufukuzwa: `createdAt` kongwe kwanza

## Schema ya Hifadhidata

Uhamiaji: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Fahirisi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` imehifadhiwa kama sekunde za epoch za Unix; safu ya SELECT hurekebisha maadili ya maandishi ya urithi kupitia `EXPIRES_AT_EPOCH_SQL`.

## Utambuzi wa Mtoa huduma / Mfano

Kucheza tena kunawezeshwa `requiresReasoningReplay(provider, model)` inaporudi `true`. Chaguo la kukokotoa hukagua orodha mbili ndani `open-sse/services/reasoningCache.ts`.

**Mtoa huduma IDs (unaolingana kabisa, haujali kesi):**

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

**Miundo ya regex ya mfano (isiyojali kesi):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` na `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, kiambishi tamati cha `-free` cha hiari)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Kuongeza provider/model mpya kali kunamaanisha kuambatanisha na mojawapo ya orodha hizi na kuandika jaribio la kitengo linalodai uchezaji wa marudio. Maelezo PR yanapaswa kutaja mfuatano halisi wa mkondo wa 400 ambao ulichochea mabadiliko.

## REST API

Akiba inafichua ncha mbili chini ya `src/app/api/cache/reasoning/route.ts`. Zote zinahitaji uthibitishaji wa usimamizi (`isAuthenticated` kutoka `@/shared/utils/apiAuth`).

| Mbinu  | Mwisho                                                    | Maelezo                                                        |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Takwimu + maingizo paginated                                   |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Orodha iliyochujwa (`limit` imebanwa hadi `[1, 200]`)          |
| DELETE | `/api/cache/reasoning`                                    | Futa kila kitu (kumbukumbu + DB) na uweke upya hesabu hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Futa maingizo kwa mtoaji mmoja pekee                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Futa ingizo moja                                               |

**sura ya majibu GET :**

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

## Vidokezo vya Uendeshaji

- **Kusafisha:** `cleanupReasoningCache()` husafisha maingizo ya kumbukumbu ambayo muda wake umekwisha na huendesha `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Wahudumu wa afya hupiga simu hii mara kwa mara.
- **Urejeshaji wa ajali:** Baada ya kuwasha upya, kumbukumbu ni tupu lakini DB bado ina maingizo ambayo hayajaisha muda wake. Utafutaji wa kwanza wa `tool_call_id` iliyotolewa ni hit DB ; uchunguzi unaofuata ni kumbukumbu.
- **Hakuna hoja, hakuna kache:** `cacheReasoningFromAssistantMessage` hurejesha `0` wakati ujumbe wa msaidizi hauna sehemu ya `reasoning_content` / `reasoning`, kwa hivyo majibu yasiyo ya kufikiri hayagharimu chochote.
- **Uandishi umefungwa pia:** tovuti zote mbili za simu katika `chatCore.ts` (zisizotiririsha na kutiririsha) piga tu `cacheReasoningFromAssistantMessage()` wakati `requiresReasoningReplay(provider, model)` ni `true` — kivumishi sawa cha ukaguzi wa upande uliosomwa. Usakinishaji ambao haugusi mtoa huduma wa kucheza tena huacha kulipia uandishi, usasishaji wa faharasa na try/catch kwa kila jibu linalotokana na sababu.
- **Watoa huduma wasio madhubuti:** Wakati `requiresReasoningReplay` ni `false` na umbizo lengwa ni OpenAI, mfasiri** vipande** sehemu yoyote `reasoning_content` kutoka kwa jumbe zinazotoka — OpenAI Ukamilishaji wa Gumzo haukubali.

## Muse Opaque-Hoja Umiliki

Muse (`muse-code`) inarejesha hoja zisizo wazi za mpigaji simu (`encrypted_content`). Kuicheza tena chini ya akaunti tofauti au kitambulisho kilichorejeshwa kunashindwa kupanda, kwa hivyo maombi asilia OAuth hutumia umiliki wa kiwango cha kikao badala ya mzunguko wa kila ombi (`src/sse/services/museSessionOwnership.ts`, inayotekelezwa katika `src/sse/handlers/chat.ts`). Miunganisho ya ufunguo wa API iliyochaguliwa kwa uwazi na usanidi wa ufunguo wa API pekee huhifadhi uelekezaji wao uliopo bila hali hii ya umiliki.

- Toa kipindi ID thabiti kwa kila zamu: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, au `x-codex-session-id`; vinginevyo tumia `prompt_cache_key`, `session_id`, `conversation_id`, au `metadata.session_id` katika mwili (katika mpangilio huo wa utangulizi). IDs haipo au tupu inarudisha 400 wakati akaunti mbili au zaidi OAuth za asili zinatumika; ukiwa na akaunti moja OAuth hakuna cha kuzungusha, kwa hivyo ombi kama hilo huweka njia isiyobanwa. Upeo ni pamoja na ufunguo wa API wa OmniRoute ID.
- Vipindi mpya vya kujitegemea katika akaunti za OAuth asilia zinazotumika zinazoruhusiwa na sera ya uunganisho wa ufunguo wa API, iliyopangwa kwa muunganisho ID. Robin-raundi anaruka akaunti zilizo katika hali ya kupozea kwa muunganisho, zenye hali ya mwisho (`banned`, `expired`, `credits_exhausted`), au iliyofungwa modeli kwa muundo ulioombwa; Mapungufu ya Muse juu ya mkondo hurekodi hali ya kupoa na hali ya kuvunja kama watoa huduma wengine. Muunganisho wa kulazimishwa wazi hupita mzunguko-robin kwa kipindi kipya lakini hauwezi kubatilisha mmiliki aliyepo.
- Hadi mmiliki atoe jibu lililofanikiwa, kipindi ambacho mmiliki wake hajapatikana kitadaiwa tena kwenye akaunti yenye afya. Baada ya jibu la kwanza lililofaulu, kipindi husalia kikiwa kimebandikwa kwa mmiliki huyo hadi kitakapokuwa bila kufanya kitu kwa siku 30 (`MUSE_SESSION_IDLE_TTL_MS`).
- Kila zamu ya muendelezo na tokeo la zana husalia ikiwa imebandikwa kwa mmiliki wa kipindi: muunganisho, utambulisho wa akaunti, na uundaji wa vitambulisho vya makisio, huangaliwa tena kabla ya majaribio ya juu, ikijumuisha majaribio ya kuonyesha upya kitambulisho. Majibu huita marejeleo IDs/item na upigaji simu wa zana ya Kukamilisha Gumzo IDs lazima ziwe zimerekodiwa kwa kipindi na kizazi hicho.
- Rekodi za SQLite `key_value` katika nafasi ya majina `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) zinaendelea kumiliki na kielekezi cha kuzunguka huwashwa tena. Kila dai na jibu lililotolewa huonyesha upya muhuri wa shughuli ya kipindi; kipindi kisichofanya kazi kwa muda mrefu zaidi ya `MUSE_SESSION_IDLE_TTL_MS` hupogolewa (pini ya mmiliki, bendera iliyotolewa na heshi za opaque/reference zilizorekodiwa), mara moja kila baada ya dakika 10 na kwa vikundi vilivyo na mipaka, kwa hivyo urudiaji wa historia yake unashindwa kufungwa kama mmiliki asiyejulikana. Rekodi zina muunganisho wa IDs na heshi za utambulisho wa akaunti, vitambulisho, maudhui yasiyo wazi, na marejeleo ya mwendelezo, si siri au historia ya mazungumzo. Wateja lazima wahifadhi na kutuma historia yao kamili na hoja zisizo wazi.
- Unknown or foreign opaque reasoning, a missing owner, an unavailable owner account, or a generation change with recorded history fails closed with an explicit 4xx/503 — never silent cross-account failover and never dropped reasoning.
- Ufunguo wa akaunti sawa uliohifadhiwa hupitishwa tu wakati kipindi hakina historia inayoweza kuchezwa tena; vipindi vilivyorekodiwa huendelea kushindwa kufungwa hadi vianze upya.
- Jibu tupu la mkondo wa juu (`upstream_empty_response` / `empty_response`, hakuna chochote kilichotolewa kwa mpiga simu) hujaribiwa tena mara mbili kwa mmiliki mmoja, baada ya 0.5 kisha 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Majaribio yote yakiwa tupu, 502 ya awali inarejeshwa bila kupoezwa au kuashiria kivunja, kwa hivyo jibu lisilo na uhakika halimfungii mmiliki nje.
- Maombi yote `muse-code` yanapita kache ya semantic inasomwa na kuandika, ikijumuisha maandishi ya kutiririsha, kwa hivyo pato lisilo wazi lililo kwenye akiba haliwezi kupata mmiliki wa kipindi tofauti.

Walinzi wa kurudi nyuma: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, na `tests/unit/chatcore-semantic-cache.test.ts`.

## Tazama Pia

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — vivunja saketi, vipunguza joto, vifunga nje vya mfano
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — inachunguza 400s ya juu
- Chanzo: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Uhamiaji: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- njia ya API : `src/app/api/cache/reasoning/route.ts`
- Toleo la asili: #1628
