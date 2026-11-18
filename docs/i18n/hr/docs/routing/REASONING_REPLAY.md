# REASONING_REPLAY (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Izvor istine:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Zadnje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute snima asistenta `reasoning_content` koji proizvode modeli načina razmišljanja i reproducira ga transparentno na višestrukim zahtjevima kada uzlazni pružatelj to zahtijeva. Ovo eliminira pogreške HTTP 400 koje postavljaju strogi pružatelji usluga kada u povijesti razgovora klijenta nedostaje obrazloženje prethodnog poteza.

## Zašto ovo postoji

Nekoliko pružatelja načina razmišljanja odbija naknadni zaokret osim ako** prethodna poruka pomoćnika uključuje izvorni `reasoning_content`** . Upstream vraća 400 s porukama poput:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ali tipični klijenti (Cursor, Cline, Roo Code, OpenAI SDK) uklanjaju `reasoning_content` iz povijesti koju reproduciraju. OmniRoute ga vraća iz predmemorije na strani poslužitelja tako da je zahtjev koji uzvodno vidi dosljedan. Izdanje #1628 uvelo je hibridnu postojanost memory/SQLite tako da predmemorija preživi ponovno pokretanje procesa.

## Arhitektura

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

Hvatanje se događa u `open-sse/handlers/chatCore.ts` (dva mjesta, na dva `cacheReasoningFromAssistantMessage` mjesta poziva). Reprodukcija se događa u `open-sse/translator/index.ts` nakon prisiljavanja sheme, ali prije slanja.

Unosi poziva alata pohranjeni su pod `buildToolCallCacheKey()`, pregledom opsega zahtjeva i ID-a poziva alata, tako da isti ID koji koristi drugi API ključ ili sesija ne odabire unos. Opseg dolazi od `buildReasoningCacheScope()`: API ID ključa, plus ključ sesije kada ga zahtjev ima. Stupac `tool_call_id` i nadzorna ploča stoga prikazuju ovaj sažetak za te unose.

Obični (ne-poziv alata) zaokreti pomoćnika imaju drugačije ključeve: `buildAssistantMessageCacheKey()` probavlja opseg sesije plus normalizirani transkript OpenAI-formata do tog zaokreta, jer DeepSeek zahtijeva obrazloženje _svakog_ prethodnog zaokreta nakon što je `tools` prisutan. Za Responses-API ciljeve (na primjer `opencode-go/deepseek-v4-flash`, usmjeren na `/responses`) uzvodno tijelo nosi `input`, a ne `messages`, tako da `translateRequest()` (`open-sse/translator/index.ts`) izvješćuje o zaokretnom transkriptu koji je probavio putem opcije povratnog poziva, a web-mjesta za snimanje probavljaju taj isti transkript. Prolaz ponavljanja odgovora pokreće se na OpenAI stožeru za svaki izvorni format, tako da se ponovno reproduciraju i klijenti Anthropic poruka (Claude → OpenAI → odgovori).

## Pohrana — hibridna memorija + SQLite

Hot path koristi `Map` u memoriji (LRU-by-creation) podržan SQLite tablicom za oporavak od pada i vidljivost nadzorne ploče.

| Sloj     | Provedba                                      | Svrha                                                 |
| -------- | --------------------------------------------- | ----------------------------------------------------- |
| Memorija | `Map` u `open-sse/services/reasoningCache.ts` | Brzo traženje, izbacuje najstarijeg sa 200 godina     |
| DB       | `reasoning_cache` tablica (`src/lib/db/`)     | Ustraje nakon ponovnih pokretanja, pokreće statistiku |

Zapisi idu na oba. Čitanja prvo konzultiraju memoriju, a zatim se vraćaju na DB (DB pogoci se promiču natrag u memoriju). DB kvarovi nisu fatalni — predmemorija u memoriji nastavlja služiti vrućoj stazi.

**Zadane postavke:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimalni unos memorije: `200` (`MAX_MEMORY_ENTRIES`)
- Iseljavanje: prvo najstariji `createdAt`

## Shema baze podataka

Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` je pohranjen kao sekunde Unix epohe; sloj SELECT normalizira naslijeđene tekstualne vrijednosti putem `EXPIRES_AT_EPOCH_SQL`.

## Detekcija pružatelja/modela

Ponavljanje je omogućeno kada `requiresReasoningReplay(provider, model)` vrati `true`. Funkcija provjerava dvije liste u `open-sse/services/reasoningCache.ts`.

**Davatelj IDs (točno podudaranje, neosjetljivo na velika i mala slova):**

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

**Uzorci regularnih izraza modela (neosjetljivo na velika i mala slova):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` i `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, izborni `-free` sufiks)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodavanje novog strogog provider/model znači dodavanje jednom od ovih popisa i pisanje jediničnog testa koji potvrđuje ubacivanje ponavljanja. PR opis trebao bi navesti točan uzvodni niz 400 koji je motivirao promjenu.

## REST API

Predmemorija izlaže dvije krajnje točke pod `src/app/api/cache/reasoning/route.ts`. Oba zahtijevaju provjeru autentičnosti upravljanja (`isAuthenticated` od `@/shared/utils/apiAuth`).

| metoda | Krajnja točka                                             | Opis                                                        |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Stats + paginirani unosi                                    |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrirani popis (`limit` spojen na `[1, 200]`)             |
| DELETE | `/api/cache/reasoning`                                    | Obrišite sve (memorija + DB) i resetirajte hit/miss brojače |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Brisanje samo unosa za jednog pružatelja usluga             |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Brisanje jednog unosa                                       |

**GET oblik odgovora:**

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

## Operativne bilješke

- **Čišćenje:** `cleanupReasoningCache()` čisti istekle memorijske unose i pokreće `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Radnici na zdravstvenom pregledu povremeno ga zovu.
- **Oporavak od pada:** Nakon ponovnog pokretanja, memorija je prazna, ali DB i dalje sadrži unose koji nisu istekli. Prvo pretraživanje za dati `tool_call_id` je DB pogodak; naknadna traženja su pogoci memorije.
- **Nema razmišljanja, nema predmemorije:** `cacheReasoningFromAssistantMessage` vraća `0` kada poruka pomoćnika nema polje `reasoning_content` / `reasoning`, tako da odgovori bez razmišljanja ne koštaju ništa.
- **Pisanje je također zatvoreno:** oba pozivna mjesta u `chatCore.ts` (ne-streaming i streaming) pozivaju samo `cacheReasoningFromAssistantMessage()` kada je `requiresReasoningReplay(provider, model)` `true` — isti predikat provjerava strana čitanja. Instalacije koje nikad ne dodiruju pružatelja replaya prestaju plaćati pisanje, ažuriranje indeksa i try/catch za svaki odgovor koji nosi argument.
- **Nestrogi pružatelji usluga:** Kada je `requiresReasoningReplay` `false`, a ciljni format OpenAI, prevoditelj** trake** bilo koje `reasoning_content` polje iz odlaznih poruka — OpenAI Chat Completions ga ne prihvaća.

## Muse Opaque-Reasoning Vlasništvo

Muse (`muse-code`) vraća neprozirno razmišljanje vezano za pozivatelja (`encrypted_content`). Ponovno reproduciranje pod drugim računom ili remintiranom vjerodajnicom ne uspijeva uzvodno, tako da izvorni OAuth zahtjevi koriste vlasništvo na razini sesije umjesto rotacije po zahtjevu (`src/sse/services/museSessionOwnership.ts`, nametnuto u `src/sse/handlers/chat.ts`). Izričito odabrane veze s API ključem i konfiguracije samo s API ključem zadržavaju svoje postojeće usmjeravanje bez ovog načina vlasništva.

- Omogućite stabilnu sesiju ID na svakom koraku: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ili `x-codex-session-id`; alternativno koristite `prompt_cache_key`, `session_id`, `conversation_id` ili `metadata.session_id` u tijelu (tim redoslijedom prvenstva). Nedostaje ili je prazan IDs vraća 400 kada su aktivna dva ili više izvornih OAuth računa; s jednim OAuth računom nema se na što rotirati, tako da takav zahtjev ostavlja neprikvačeno usmjeravanje. Opseg uključuje pozivateljev OmniRoute API-ključ ID.
- Svježe neovisne sesije kružnim putem preko aktivnih izvornih OAuth računa dopuštenih pravilima povezivanja API ključa, poredanih prema vezi ID. Round-robin preskače račune u hlađenju veze, sa terminalnim statusom (`banned`, `expired`, `credits_exhausted`) ili model zaključan za traženi model; Kvarovi Muse uzvodno bilježe hlađenje i stanje prekidača poput drugih pružatelja usluga. Izričito prisilna veza zaobilazi kružni postupak za novu sesiju, ali ne može nadjačati postojećeg vlasnika.
- Sve dok vlasnik ne posluži uspješan odgovor, sesija čiji je vlasnik postao nedostupan ponovno se polaže na ispravan račun. Nakon prvog uspješnog odgovora, sesija ostaje prikvačena za tog vlasnika dok ne bude u mirovanju 30 dana (`MUSE_SESSION_IDLE_TTL_MS`).
- Svaki nastavak i zaokret rezultata alata ostaju prikvačeni za vlasnika sesije: veza, identitet računa i generiranje vjerodajnica zaključka, ponovno se provjeravaju prije uzlaznih pokušaja, uključujući ponovne pokušaje osvježavanja vjerodajnica. Responses call IDs/item reference i Chat Completions tool-call IDs moraju biti snimljeni za tu sesiju i generaciju.
- SQLite `key_value` zapisi u `muse_session_ownership` imenskom prostoru (`src/lib/db/museSessionOwnership.ts`) zadržavaju vlasništvo i rotacijski kursor se ponovno pokreće. Svaki zahtjev i posluženi odgovor osvježavaju oznaku aktivnosti sesije; sesija u stanju mirovanja duža od `MUSE_SESSION_IDLE_TTL_MS` se skraćuje (pin vlasnika, poslužena zastavica i snimljeni opaque/reference hashovi), najviše jednom svakih 10 minuta i u ograničenim serijama, tako da kasnija reprodukcija njezine povijesti ne uspijeva zatvoriti kao nepoznati vlasnik. Zapisi sadrže IDs veze i hashove identiteta računa, vjerodajnice, neproziran sadržaj i reference nastavka, a ne tajne ili povijest razgovora. Klijenti moraju zadržati i poslati svoju punu povijest i nejasna obrazloženja.
- Nepoznato ili strano neprozirno obrazloženje, nedostajući vlasnik, nedostupan vlasnički račun ili promjena generacije sa snimljenom poviješću ne uspijeva se zatvoriti eksplicitnim 4xx/503 — nikad tihim prelaskom na više računa i nikad ispuštenim obrazloženjem.
- Remintirani ključ istog računa usvaja se samo kada sesija nije zabilježila povijest koja se može reproducirati; snimljene sesije ostaju neuspješno zatvorene dok se ne počnu iznova.
- Prazan uzvodni odgovor (`upstream_empty_response` / `empty_response`, pozivatelju se ništa ne emitira) pokušava se ponoviti najviše dva puta na istom vlasniku, nakon 0,5 s, a zatim 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Ako su svi pokušaji prazni, originalni 502 se vraća bez hlađenja ili označavanja prekida, tako da nesigurni odgovor nikada ne zaključava vlasnika.
- Svi `muse-code` zahtjevi zaobilaze čitanje i pisanje semantičke predmemorije, uključujući strujanje pisanja, tako da predmemorirani neprozirni izlaz ne može dobiti drugog vlasnika sesije.

Čuvari regresije: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` i `tests/unit/chatcore-semantic-cache.test.ts`.

## Vidi također

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — prekidači, hlađenja, isključenja modela
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — dijagnosticiranje uzvodno 400s
- Izvor: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- ruta API : `src/app/api/cache/reasoning/route.ts`
- Izvorno izdanje: #1628
