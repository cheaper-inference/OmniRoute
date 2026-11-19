# REASONING_REPLAY (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sanningens källa:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute fångar assistent `reasoning_content` som produceras av modeller i tänkande och spelar upp den på ett transparent sätt vid förfrågningar om flera svängar när uppströmsleverantören kräver det. Detta eliminerar de HTTP 400-fel som strikta leverantörer tar upp när en klients konversationshistorik saknar resonemanget från föregående vändning.

## Varför detta finns

Flera tankesättsleverantörer avvisar en uppföljningsvändning om inte** föregående assistentmeddelande innehåller den ursprungliga `reasoning_content`** . Uppströms returnerar 400 med meddelanden som:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Men typiska klienter (Cursor, Cline, Roo Code, OpenAI SDK) tar bort `reasoning_content` från historien som de spelar upp igen. OmniRoute återställer det från en server-side cache så begäran som uppströms ser är konsekvent. Utgåva #1628 introducerade hybrid memory/SQLite persistens så att cachen överlever processen startar om.

## Arkitektur

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

Infångning sker i `open-sse/handlers/chatCore.ts` (två platser, vid de två `cacheReasoningFromAssistantMessage` -anropsplatserna). Omspelning sker i `open-sse/translator/index.ts` efter schematvång men före avsändning.

Verktygsanropsposter lagras under `buildToolCallCacheKey()`, en sammanfattning av begäransomfånget och verktygsanrops-id, så samma id som används av en annan API nyckel eller session väljer inte posten. Omfattningen kommer från `buildReasoningCacheScope()`: API nyckel-id, plus sessionsnyckeln när begäran har en. Kolumnen `tool_call_id` och instrumentpanelen visar därför denna sammanfattning för dessa poster.

Vanliga (icke-verktyg-anrop) assistentsvängar skrivs på olika sätt: `buildAssistantMessageCacheKey()` sammanfattar sessionsomfånget plus det normaliserade OpenAI-formattranskriptet fram till den svängen, eftersom DeepSeek kräver resonemang från _varje_ föregående sväng när `tools` är närvarande. För Responses-API-mål (till exempel `opencode-go/deepseek-v4-flash`, dirigerad till `/responses`) bär uppströmskroppen `input`, inte `messages`, så `translateRequest()` (`open-sse/translator/index.ts`) rapporterar pivottranskriptet som den smälte genom ett återuppringningsalternativ och fångstplatserna sammanfattar samma transkript. Responses replay-passet körs på OpenAI pivoten för varje källformat, så Anthropic Messages-klienter (Claude → OpenAI → Responses) spelas också upp igen.

## Lagring — Hybridminne + SQLite

Den heta sökvägen använder en `Map` i minnet (LRU-by-creation) som backas upp av en SQLite tabell för kraschåterställning och synlighet på instrumentpanelen.

| Lager | Genomförande                                  | Ändamål                                      |
| ----- | --------------------------------------------- | -------------------------------------------- |
| Minne | `Map` i `open-sse/services/reasoningCache.ts` | Snabba uppslagningar, vräker äldst vid 200   |
| DB    | `reasoning_cache` tabell (`src/lib/db/`)      | Fortsätter under omstarter, driver statistik |

Skriver går till båda. Läser konsultera minnet först, fall sedan tillbaka till DB (DB träffar flyttas tillbaka till minnet). DB fel är icke-dödliga — cachen i minnet fortsätter att tjäna den heta vägen.

**Standardvärden:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Max minnesposter: `200` (`MAX_MEMORY_ENTRIES`)
- Vräkning: äldsta `createdAt` först

## Databasschema

Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Index: `expires_at`, `provider`, `model`, `created_at`. `expires_at` lagras som Unix-epoksekunder; SELECT lagret normaliserar äldre textvärden via `EXPIRES_AT_EPOCH_SQL`.

## Leverantör/modellidentifiering

Uppspelning är aktiverat när `requiresReasoningReplay(provider, model)` returnerar `true`. Funktionen kontrollerar två listor i `open-sse/services/reasoningCache.ts`.

**Provider IDs (exakt matchning, skiftlägesokänslig):**

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

**Modellregexmönster (okänslig för skiftläge):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` och `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, valfritt `-free` suffix)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Att lägga till en ny strikt provider/model innebär att lägga till en av dessa listor och skriva ett enhetstest som bekräftar replay-injektion. PR beskrivningen bör citera den exakta uppströms 400-strängen som motiverade förändringen.

## REST API

Cachen exponerar två slutpunkter under `src/app/api/cache/reasoning/route.ts`. Båda kräver hanteringsautentisering (`isAuthenticated` från `@/shared/utils/apiAuth`).

| Metod  | Slutpunkt                                                 | Beskrivning                                          |
| ------ | --------------------------------------------------------- | ---------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistik + paginerade poster                        |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrerad lista (`limit` fastspänd till `[1, 200]`)  |
| DELETE | `/api/cache/reasoning`                                    | Rensa allt (minne + DB) och återställ hit/miss antal |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Rensa endast poster för en leverantör                |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Ta bort en enstaka post                              |

**GET svarsform:**

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

## Driftsanmärkningar

- **Rengöring:** `cleanupReasoningCache()` rensar utgångna minnesposter och kör `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Hälsokontrollpersonal ringer detta med jämna mellanrum.
- **Kraschåterställning:** Efter en omstart är minnet tomt men DB innehåller fortfarande poster som inte har gått ut. Den första uppslagningen för en given `tool_call_id` är en DB träff; efterföljande uppslagningar är minnesträffar.
- **Inget resonemang, ingen cache:** `cacheReasoningFromAssistantMessage` returnerar `0` när assistentmeddelandet inte har något `reasoning_content` / `reasoning` fält, så icke-tänkande svar kostar ingenting.
- **Skriv är också gated:** båda anropsplatserna i `chatCore.ts` (icke-strömmande och strömmande) anropar bara `cacheReasoningFromAssistantMessage()` när `requiresReasoningReplay(provider, model)` är `true` — samma predikat lässidan kontrollerar. Installationer som aldrig rör en replay-leverantör slutar betala för skrivningen, indexuppdateringen och try/catch för varje resonemangsbärande svar.
- **Icke strikta leverantörer:** När `requiresReasoningReplay` är `false` och målformatet är OpenAI, översättaren** remsor** alla `reasoning_content` fält från utgående meddelanden — OpenAI Chat Completions accepterar det inte.

## Muse Opaque-Reasoning Ownership

Muse (`muse-code`) returnerar anropsbundna ogenomskinliga resonemang (`encrypted_content`). Att spela om det under ett annat konto eller återupprättade autentiseringsuppgifter misslyckas uppströms, så inbyggda OAuth förfrågningar använder äganderätt på sessionsnivå istället för rotation per begäran (`src/sse/services/museSessionOwnership.ts`, framtvingad i `src/sse/handlers/chat.ts`). Explicit valda API-nyckelanslutningar och API-nyckelkonfigurationer behåller sin befintliga routing utan detta ägarläge.

- Ge en stabil session ID vid varje tur: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` eller `x-codex-session-id`; alternativt använd `prompt_cache_key`, `session_id`, `conversation_id` eller `metadata.session_id` i kroppen (i den prioritetsordningen). Saknade eller tomma IDs returnerar 400 när två eller flera inbyggda OAuth konton är aktiva; med ett enda OAuth -konto finns det inget att rotera till, så en sådan begäran behåller routing utan fäste. Omfattningen inkluderar anroparens OmniRoute API-nyckel ID.
- Färska oberoende sessioner runt om i aktiva inbyggda OAuth konton som tillåts av API-nyckelanslutningspolicyn, sorterade efter anslutning ID. Round-robin hoppar över konton vid nedkylning av anslutningar, med terminalstatus (`banned`, `expired`, `credits_exhausted`), eller modelllåst för den begärda modellen; Muse upstream-fel registrerar nedkylning och brytarstatus som andra leverantörer. En uttryckligen påtvingad anslutning kringgår round-robin för en ny session men kan inte åsidosätta en befintlig ägare.
- Tills ägaren levererar ett framgångsrikt svar, görs anspråk på en session vars ägare har blivit otillgänglig på ett hälsosamt konto. Efter det första lyckade svaret förblir sessionen fäst till den ägaren tills den har varit inaktiv i 30 dagar (`MUSE_SESSION_IDLE_TTL_MS`).
- Varje fortsättning och vändning av verktygsresultat förblir låst till sessionsägaren: anslutning, kontoidentitet och generering av slutledningsuppgifter, kontrolleras igen innan uppströmsförsök, inklusive försök att uppdatera autentiseringsuppgifterna igen. Svar call IDs/item referenser och Chat Completions tool-call IDs måste ha spelats in för den sessionen och generationen.
- SQLite `key_value` -poster i `muse_session_ownership` namnområdet (`src/lib/db/museSessionOwnership.ts`) behåller ägandet och rotationsmarkören över startar om. Varje anspråk och skickat svar uppdaterar sessionens aktivitetsstämpel; en session inaktiv längre än `MUSE_SESSION_IDLE_TTL_MS` beskärs (ägarnål, serverad flagga och inspelade opaque/reference hashar), högst en gång var tionde minut och i begränsade partier, så en senare uppspelning av dess historia misslyckas som en okänd ägare. Posterna innehåller anslutnings- IDs och hash för kontoidentitet, autentiseringsuppgifter, ogenomskinligt innehåll och fortsättningsreferenser, inte hemligheter eller konversationshistorik. Kunder måste behålla och skicka sin fullständiga historia och ogenomskinliga resonemang.
- Okänt eller främmande ogenomskinligt resonemang, en saknad ägare, ett otillgängligt ägarkonto eller en generationsväxling med registrerad historik misslyckas stängd med en explicit 4xx/503 — aldrig tyst övergången mellan konton och aldrig släppt resonemang.
- En återskapad nyckel för samma konto används endast när sessionen inte spelade in någon omspelbar historik; inspelade sessioner fortsätter att misslyckas stängda tills de startas på nytt.
- Ett tomt svar uppströms (`upstream_empty_response` / `empty_response`, inget sänds ut till den som ringer) görs om högst två gånger på samma ägare, efter 0,5 s sedan 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Om alla försök är tomma, returneras den ursprungliga 502:an utan nedkylnings- eller breaker-märkning, så ett fläckigt svar låser aldrig ägaren.
- Alla `muse-code` förfrågningar kringgår semantisk cacheläsning och skrivning, inklusive strömmande skrivningar, så cachad ogenomskinlig utdata kan inte få en annan sessionsägare.

Regressionsskydd: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` och `tests/unit/chatcore-semantic-cache.test.ts`.

## Se även

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — effektbrytare, nedkylningar, modelllås
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostisera uppströms 400s
- Källa: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API rutt: `src/app/api/cache/reasoning/route.ts`
- Ursprungligt nummer: #1628
