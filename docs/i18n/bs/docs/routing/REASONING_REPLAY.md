# REASONING_REPLAY (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Izvor istine:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute hvata pomoćnika `reasoning_content` proizvedenog u modelima u načinu razmišljanja i reprodukuje ga transparentno na zahtjeve za više okreta kada to zahtijeva upstream provajder. Ovo eliminiše HTTP 400 greške koje strogi provajderi podižu kada klijentovoj istoriji razgovora nedostaje obrazloženje prethodnog poteza.

## Zašto ovo postoji

Nekoliko provajdera načina razmišljanja odbija naknadno okretanje osim ako ne** prethodna poruka pomoćnika uključuje originalni `reasoning_content`** . Upstream vraća 400 s porukama poput:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ali tipični klijenti (Cursor, Cline, Roo Code, OpenAI SDK) uklanjaju `reasoning_content` iz istorije koju ponavljaju. OmniRoute ga vraća iz keš memorije na strani servera tako da je zahtjev koji upstream vidi konzistentan. Izdanje #1628 uvodi hibridnu memory/SQLite postojanost tako da keš preživi ponovno pokretanje procesa.

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

Hvatanje se dešava u `open-sse/handlers/chatCore.ts` (dvije lokacije, na dvije `cacheReasoningFromAssistantMessage` pozivne lokacije). Reprodukcija se dešava u `open-sse/translator/index.ts` nakon prisile sheme, ali prije slanja.

Unosi poziva alata su pohranjeni pod `buildToolCallCacheKey()`, sažetak opsega zahtjeva i ID poziva alata, tako da isti ID koji koristi drugi API ključ ili sesija ne odabire unos. Opseg dolazi od `buildReasoningCacheScope()`: API ID ključa, plus ključ sesije kada ga zahtjev ima. Kolona `tool_call_id` i kontrolna tabla stoga pokazuju ovaj sažetak za te unose.

Obični (bez alata) okreti pomoćnika su različiti ključevi: `buildAssistantMessageCacheKey()` analizira opseg sesije plus normalizovani transkript OpenAI formata do tog okreta, jer DeepSeek zahtijeva obrazloženje _svakog_ prethodnog skretanja kada je `tools` prisutan. Za Responses-API ciljeve (na primjer `opencode-go/deepseek-v4-flash`, usmjeren na `/responses`) uzvodno tijelo nosi `input`, a ne `messages`, tako da `translateRequest()` (`open-sse/translator/index.ts`) izvještava o centralnom transkriptu koji je pregledao putem opcije povratnog poziva i lokacije za hvatanje probavljaju taj isti transkript. Prolaz za ponavljanje odgovora se pokreće na OpenAI pivotu za svaki izvorni format, tako da se klijenti Anthropic poruka (Claude → OpenAI → odgovori) također reproduciraju.

## Skladištenje — Hybrid Memory + SQLite

Vrući put koristi `Map` u memoriji (LRU-by-creation) podržan SQLite tablicom za oporavak od rušenja i vidljivost kontrolne ploče.

| Layer    | Implementacija                                | Svrha                                                |
| -------- | --------------------------------------------- | ---------------------------------------------------- |
| Memorija | `Map` u `open-sse/services/reasoningCache.ts` | Brzo traženje, izbacivanje najstarijeg sa 200 godina |
| DB       | `reasoning_cache` stol (`src/lib/db/`)        | Traje nakon ponovnog pokretanja, pokreće statistiku  |

Napisi idu i jednima i drugima. Čitanja prvo konsultuju memoriju, a zatim se vraćaju na DB (DB pogoci se vraćaju u memoriju). DB kvarovi nisu fatalni — keš memorija nastavlja da služi vrućoj stazi.

**Zadano:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimalni memorijski unosi: `200` (`MAX_MEMORY_ENTRIES`)
- Deložacija: prvo najstariji `createdAt`

## Šema baze podataka

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` se pohranjuje kao sekunde Unix epohe; SELECT sloj normalizira zastarjele tekstualne vrijednosti preko `EXPIRES_AT_EPOCH_SQL`.

## Provajder / Detekcija modela

Ponovna reprodukcija je omogućena kada `requiresReasoningReplay(provider, model)` vrati `true`. Funkcija provjerava dvije liste u `open-sse/services/reasoningCache.ts`.

**Provajder IDs (tačno podudaranje, bez obzira na velika i mala slova):**

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

**Model regex obrazaca (ne osjetljiv na velika i mala slova):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` i `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcijski `-free` sufiks)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodavanje novog striktnog provider/model znači dodavanje na jednu od ovih lista i pisanje jediničnog testa koji potvrđuje injekciju replaya. PR opis bi trebao citirati tačan uzvodni niz od 400 koji je motivirao promjenu.

## REST API

Keš izlaže dvije krajnje tačke pod `src/app/api/cache/reasoning/route.ts`. Oba zahtijevaju autentifikaciju upravljanja (`isAuthenticated` iz `@/shared/utils/apiAuth`).

| Metoda | Krajnja tačka                                             | Opis                                                        |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + paginiranih unosa                              |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrirani popis (`limit` spojen na `[1, 200]`)             |
| DELETE | `/api/cache/reasoning`                                    | Obrišite sve (memorija + DB) i resetirajte hit/miss brojače |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Obriši samo unose za jednog provajdera                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Izbrišite jedan unos                                        |

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

## Operativne napomene

- **čišćenje:** `cleanupReasoningCache()` čisti istekle memorijske unose i pokreće `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Zdravstveni radnici to povremeno zovu.
- **Oporavak od rušenja:** Nakon ponovnog pokretanja, memorija je prazna, ali DB još uvijek sadrži neistekle unose. Prvo traženje za dati `tool_call_id` je DB pogodak; naknadna pretraživanja su pogoci memorije.
- **Bez obrazloženja, bez predmemorije:** `cacheReasoningFromAssistantMessage` vraća `0` kada poruka pomoćnika nema polje `reasoning_content` / `reasoning`, tako da odgovori bez razmišljanja ne koštaju ništa.
- **Pisanje je također zatvoreno:** obje lokacije poziva u `chatCore.ts` (ne-streaming i streaming) pozivaju samo `cacheReasoningFromAssistantMessage()` kada je `requiresReasoningReplay(provider, model)` `true` — isti predikat provjerava strane čitanja. Instalacije koje nikada ne dotiču provajdera ponovnog reprodukcije prestaju da plaćaju za pisanje, ažuriranje indeksa i try/catch za svaki odgovor koji sadrži obrazloženje.
- **Nestrogi pružaoci usluga:** Kada je `requiresReasoningReplay` `false` i ciljni format je OpenAI, prevodilac** trake** bilo koje `reasoning_content` polje iz odlaznih poruka — OpenAI Chat Completions ne prihvata.

## Muse Opaque-Reasoning Ownership

Muse (`muse-code`) vraća neprozirno razmišljanje vezano za pozivatelja (`encrypted_content`). Ponovna reprodukcija pod drugim računom ili ponovnom akreditacijom ne uspijeva uzvodno, tako da izvorni OAuth zahtjevi koriste vlasništvo na razini sesije umjesto rotacije po zahtjevu (`src/sse/services/museSessionOwnership.ts`, prinudno u `src/sse/handlers/chat.ts`). Eksplicitno odabrane veze s API ključem i konfiguracije samo s API ključem zadržavaju svoje postojeće usmjeravanje bez ovog načina vlasništva.

- Obezbedite stabilnu sesiju ID na svakom koraku: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ili `x-codex-session-id`; alternativno koristite `prompt_cache_key`, `session_id`, `conversation_id` ili `metadata.session_id` u tijelu (u tom redoslijedu prioriteta). Nedostaje ili prazan IDs vraća 400 kada su aktivna dva ili više izvornih OAuth naloga; sa jednim OAuth nalogom nema šta da se rotira, tako da takav zahtev zadržava nepovezano rutiranje. Opseg uključuje OmniRoute API-ključ ID pozivaoca.
- Svježe nezavisne sesije kruže po aktivnim izvornim OAuth nalozima dozvoljenim politikom povezivanja API ključa, poredanih po konekciji ID. Round-robin preskače račune u hlađenju veze, sa statusom terminala (`banned`, `expired`, `credits_exhausted`) ili zaključanim modelom za traženi model; Muse upstream kvarovi bilježe hlađenje i stanje prekida kao i drugi provajderi. Eksplicitno prisilna veza zaobilazi kružni rad za novu sesiju, ali ne može nadjačati postojećeg vlasnika.
- Dok vlasnik ne pruži uspješan odgovor, sesija čiji je vlasnik postao nedostupan ponovo se preuzima na zdrav račun. Nakon prvog uspješnog odgovora, sesija ostaje zakačena za tog vlasnika sve dok ne bude neaktivna 30 dana (`MUSE_SESSION_IDLE_TTL_MS`).
- Svaki nastavak i skretanje rezultata alata ostaju zakačeni za vlasnika sesije: veza, identitet naloga i generisanje akreditiva za zaključivanje, ponovo se provjeravaju prije pokušaja upstream, uključujući ponovne pokušaje osvježavanja vjerodajnica. Odgovori pozivaju IDs/item reference i chat dovršetke alat-poziv IDs moraju biti snimljeni za tu sesiju i generaciju.
- SQLite `key_value` zapisi u `muse_session_ownership` imenskom prostoru (`src/lib/db/museSessionOwnership.ts`) ostaju vlasništvo i kursor rotacije se ponovo pokreće. Svaki zahtjev i dostavljeni odgovor osvježavaju oznaku aktivnosti sesije; sesija neaktivna duže od `MUSE_SESSION_IDLE_TTL_MS` se smanjuje (pin vlasnika, servirana zastavica i snimljeni opaque/reference heševi), najviše jednom svakih 10 minuta iu ograničenim serijama, tako da kasnija repriza historije nije zatvorena kao nepoznati vlasnik. Zapisi sadrže IDs veze i hasheve identiteta naloga, akreditive, neproziran sadržaj i reference za nastavak, a ne tajne ili istoriju razgovora. Klijenti moraju zadržati i poslati svoju punu istoriju i neprozirno obrazloženje.
- Nepoznato ili strano neprozirno rezonovanje, nedostajući vlasnik, nedostupan vlasnički nalog ili promena generacije sa zabeleženom istorijom ne uspeva da se zatvori eksplicitnim 4xx/503 — nikad tihim prelaskom na grešku na više naloga i nikada nije odbačeno rezonovanje.
- Ponovljeni ključ istog naloga se usvaja samo kada sesija nije zabeležila istoriju koja se može ponovo reprodukovati; snimljene sesije ostaju zatvorene dok ne počnu iznova.
- Prazan odgovor uzvodno (`upstream_empty_response` / `empty_response`, ništa se ne emituje pozivaocu) se ponovo pokušava najviše dva puta na istom vlasniku, nakon 0,5 s zatim 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Ako su svi pokušaji prazni, originalni 502 se vraća bez hlađenja ili označavanja prekida, tako da nepostojani odgovor nikada ne blokira vlasnika.
- Svi `muse-code` zahtjevi zaobilaze čitanje i pisanje semantičke keš memorije, uključujući strimovanje upisivanja, tako da keširani neprozirni izlaz ne može dobiti drugog vlasnika sesije.

Regresijski čuvari: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` i `tests/unit/chatcore-semantic-cache.test.ts`.

## Vidi također

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — prekidači, hlađenje, blokada modela
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — dijagnosticiranje upstream 400s
- Izvor: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ruta: `src/app/api/cache/reasoning/route.ts`
- Originalno izdanje: #1628
