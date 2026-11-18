# REASONING_REPLAY (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Bron van waarheid:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Laatst bijgewerkt:** 28-06-2026 — v3.8.40

OmniRoute legt assistent- `reasoning_content` vast die is geproduceerd door modellen in de denkmodus en speelt deze transparant af op multi-turn-verzoeken wanneer de upstream-provider dit nodig heeft. Dit elimineert de HTTP 400-fouten die strikte providers naar voren brengen wanneer de gespreksgeschiedenis van een cliënt de redenering van de vorige beurt mist.

## Waarom dit bestaat

Verschillende aanbieders van denkmodi wijzen een vervolgwending af, tenzij de** het vorige assistent-bericht bevat de originele `reasoning_content`** . De upstream retourneert 400 met berichten als:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Maar typische clients (Cursor, Cline, Roo Code, OpenAI SDK) ontdoen `reasoning_content` van de geschiedenis die ze opnieuw afspelen. OmniRoute herstelt het vanuit een cache op de server, zodat het verzoek dat de upstream ziet consistent is. Uitgave #1628 introduceerde de hybride memory/SQLite persistentie, zodat de cache het opnieuw opstarten van processen overleeft.

## Architectuur

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

Het vastleggen gebeurt in `open-sse/handlers/chatCore.ts` (twee locaties, op de twee `cacheReasoningFromAssistantMessage` -oproeplocaties). Herhaling gebeurt in `open-sse/translator/index.ts` na schemadwang maar vóór verzending.

Tool-call-items worden opgeslagen onder `buildToolCallCacheKey()`, een samenvatting van het verzoekbereik en de tool-call-ID, dus dezelfde id die door een andere API sleutel of sessie wordt gebruikt, selecteert het item niet. Het bereik komt van `buildReasoningCacheScope()`: de API -sleutel-ID, plus de sessiesleutel als het verzoek er een heeft. De `tool_call_id` kolom en het dashboard tonen daarom deze samenvatting voor die vermeldingen.

Gewone (niet-tool-call) assistent-beurten worden anders gecodeerd: `buildAssistantMessageCacheKey()` verteert de sessieomvang plus het genormaliseerde OpenAI-formaat transcript tot die beurt, omdat DeepSeek de redenering van _elke_ voorgaande beurt vereist zodra `tools` aanwezig is. Voor Responses-API-doelen (bijvoorbeeld `opencode-go/deepseek-v4-flash`, gerouteerd naar `/responses`) draagt het stroomopwaartse lichaam `input`, niet `messages`, dus `translateRequest()` (`open-sse/translator/index.ts`) rapporteert het draaitranscript dat het heeft verwerkt via een callback-optie en de opnamesites verwerken datzelfde transcript. De Responses replay pass draait op de OpenAI -spil voor elk bronformaat, dus Anthropic Messages-clients (Claude → OpenAI → Responses) worden ook opnieuw afgespeeld.

## Opslag — Hybride geheugen + SQLite

Het hot path maakt gebruik van een in-memory `Map` (LRU-by-creation) ondersteund door een SQLite tabel voor crashherstel en dashboardzichtbaarheid.

| Laag     | Uitvoering                                     | Doel                                                  |
| -------- | ---------------------------------------------- | ----------------------------------------------------- |
| Geheugen | `Map` in `open-sse/services/reasoningCache.ts` | Snelle zoekopdrachten, oudste uitzetting met 200      |
| DB       | `reasoning_cache` tafel (`src/lib/db/`)        | Blijft bestaan bij herstarts, zorgt voor statistieken |

Schrijven gaan naar beide. Leest eerst het geheugen raadplegen en valt dan terug naar DB (DB treffers worden terug naar het geheugen gepromoveerd). DB fouten zijn niet-fataal. — de cache in het geheugen blijft het hot path bedienen.

**Standaardinstellingen:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Max. geheugeninvoer: `200` (`MAX_MEMORY_ENTRIES`)
- Uitzetting: oudste `createdAt` eerst

## Databaseschema

Migratie: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indexen: `expires_at`, `provider`, `model`, `created_at`. `expires_at` wordt opgeslagen als Unix-epochseconden; de SELECT laag normaliseert oude tekstwaarden via `EXPIRES_AT_EPOCH_SQL`.

## Provider-/modeldetectie

Opnieuw afspelen is ingeschakeld wanneer `requiresReasoningReplay(provider, model)` `true` retourneert. De functie controleert twee lijsten in `open-sse/services/reasoningCache.ts`.

**Provider IDs (exacte overeenkomst, hoofdlettergevoelig):**

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

**Modelregex-patronen (niet hoofdlettergevoelig):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` en `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, optioneel `-free` achtervoegsel)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Het toevoegen van een nieuwe strikte provider/model betekent het toevoegen aan een van deze lijsten en het schrijven van een eenheidstest waarin replay-injectie wordt bevestigd. De PR -beschrijving moet de exacte stroomopwaartse 400-reeks vermelden die de verandering motiveerde.

## REST API

De cache toont twee eindpunten onder `src/app/api/cache/reasoning/route.ts`. Beide vereisen beheerauthenticatie (`isAuthenticated` van `@/shared/utils/apiAuth`).

| Methode | Eindpunt                                                  | Beschrijving                                          |
| ------- | --------------------------------------------------------- | ----------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statistieken + gepagineerde vermeldingen              |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Gefilterde lijst (`limit` vastgeklemd aan `[1, 200]`) |
| DELETE  | `/api/cache/reasoning`                                    | Wis alles (geheugen + DB) en reset hit/miss aantallen |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Wis alleen vermeldingen voor één provider             |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Eén item verwijderen                                  |

**GET -antwoordvorm:**

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

## Operationele opmerkingen

- **Opruimen:** `cleanupReasoningCache()` verwijdert verlopen geheugengegevens en voert `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` uit. Gezondheidscontrolemedewerkers noemen dit periodiek.
- **Crashherstel:** Na een herstart is het geheugen leeg, maar de DB bevat nog steeds niet-verlopen vermeldingen. De eerste zoekopdracht voor een bepaalde `tool_call_id` is een DB hit; daaropvolgende zoekopdrachten zijn geheugenhits.
- **Geen redenering, geen cache:** `cacheReasoningFromAssistantMessage` retourneert `0` wanneer het assistentbericht geen `reasoning_content` / `reasoning` veld heeft, dus niet-denkende antwoorden kosten niets.
- **Schrijven is ook beveiligd:** beide oproepsites in `chatCore.ts` (niet-streaming en streaming) bellen alleen `cacheReasoningFromAssistantMessage()` wanneer `requiresReasoningReplay(provider, model)` `true` is — hetzelfde predicaat de leeszijdecontroles. Installaties die nooit een replay-provider raken, betalen niet meer voor het schrijven, de indexupdate en de try/catch voor elke redenerende reactie.
- **Niet-strikte aanbieders:** Wanneer `requiresReasoningReplay` `false` is en het doelformaat OpenAI is, is de vertaler** stroken** elk `reasoning_content` veld uit uitgaande berichten — OpenAI Chat Completions accepteert het niet.

## Muse ondoorzichtig redenerend eigendom

Muse (`muse-code`) retourneert bellergebonden ondoorzichtige redenering (`encrypted_content`). Het opnieuw afspelen ervan onder een ander account of een ander herinnerde referentie mislukt stroomopwaarts, dus native OAuth -verzoeken gebruiken eigendom op sessieniveau in plaats van rotatie per verzoek (`src/sse/services/museSessionOwnership.ts`, afgedwongen in `src/sse/handlers/chat.ts`). Expliciet geselecteerde API-sleutelverbindingen en configuraties met alleen API-sleutel behouden hun bestaande routering zonder deze eigendomsmodus.

- Geef bij elke beurt een stabiele sessie ID : `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` of `x-codex-session-id`; U kunt ook `prompt_cache_key`, `session_id`, `conversation_id` of `metadata.session_id` in de hoofdtekst gebruiken (in die prioriteitsvolgorde). Ontbrekende of blanco IDs retourneert 400 wanneer twee of meer native OAuth accounts actief zijn; met een enkel OAuth -account is er niets om naartoe te roteren, dus een dergelijk verzoek blijft ongepinde routering. Het bereik omvat de OmniRoute API-sleutel ID van de aanroeper.
- Nieuwe onafhankelijke sessies round-robin over actieve native OAuth accounts toegestaan door het API-sleutelverbindingsbeleid, geordend op verbinding ID. Round-robin slaat accounts over tijdens het afkoelen van de verbinding, met een terminalstatus (`banned`, `expired`, `credits_exhausted`), of model-vergrendeld voor het gevraagde model; Muse upstream-fouten registreren de cooldown- en breaker-status, net als andere providers. Een expliciet geforceerde verbinding omzeilt round-robin voor een nieuwe sessie, maar kan een bestaande eigenaar niet overschrijven.
- Totdat de eigenaar een succesvol antwoord geeft, wordt een sessie waarvan de eigenaar niet meer beschikbaar is, opnieuw geclaimd op een gezond account. Na de eerste succesvolle reactie blijft de sessie vastgezet aan die eigenaar totdat deze 30 dagen inactief is geweest (`MUSE_SESSION_IDLE_TTL_MS`).
- Elke vervolg- en toolresultaatbeurt blijft vastgezet aan de sessie-eigenaar: verbinding, accountidentiteit en genereren van inferentiegegevens, opnieuw gecontroleerd vóór upstream-pogingen, inclusief nieuwe pogingen om de inloggegevens te vernieuwen. Reacties die IDs/item referenties aanroepen en de tool Chat Completions-aanroep IDs moeten zijn opgenomen voor die sessie en generatie.
- SQLite `key_value` records in de `muse_session_ownership` naamruimte (`src/lib/db/museSessionOwnership.ts`) behouden het eigendom en de rotatiecursor bij opnieuw opstarten. Elke claim en elke beantwoorde reactie vernieuwt de activiteitsstempel van de sessie; een sessie die langer inactief is dan `MUSE_SESSION_IDLE_TTL_MS` wordt gesnoeid (eigenaarpin, bediende vlag en geregistreerde opaque/reference hashes), maximaal één keer per 10 minuten en in begrensde batches, zodat een latere herhaling van de geschiedenis mislukt, gesloten als een onbekende eigenaar. Records bevatten IDs en hashes van accountidentiteit, inloggegevens, ondoorzichtige inhoud en vervolgreferenties, geen geheimen of gespreksgeschiedenis. Klanten moeten hun volledige geschiedenis en ondoorzichtige redenering bewaren en verzenden.
- Onbekende of vreemde ondoorzichtige redeneringen, een ontbrekende eigenaar, een niet-beschikbaar eigenaarsaccount of een generatiewisseling met vastgelegde geschiedenis mislukt, afgesloten met een expliciete 4xx/503 — nooit stille failover voor meerdere accounts en nooit afgebroken redenering.
- Een herinnerde sleutel voor hetzelfde account wordt alleen overgenomen als de sessie geen herspeelbare geschiedenis heeft vastgelegd; opgenomen sessies blijven mislukken totdat ze opnieuw zijn begonnen.
- Een leeg stroomopwaarts antwoord (`upstream_empty_response` / `empty_response`, niets verzonden naar de beller) wordt maximaal twee keer opnieuw geprobeerd bij dezelfde eigenaar, na 0,5 s en daarna 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Als alle pogingen leeg zijn, wordt de originele 502 teruggestuurd zonder cooldown- of breaker-markering, dus een vaag antwoord sluit de eigenaar nooit uit.
- Alle `muse-code` -verzoeken omzeilen semantische cache-lees- en -schrijfbewerkingen, inclusief streaming-schrijfbewerkingen, zodat in de cache opgeslagen ondoorzichtige uitvoer geen andere sessie-eigenaar kan krijgen.

Regressiewachters: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` en `tests/unit/chatcore-semantic-cache.test.ts`.

## Zie ook

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — stroomonderbrekers, cooldowns, modelvergrendelingen
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticeert stroomopwaartse 400's
- Bron: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migratie: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API -route: `src/app/api/cache/reasoning/route.ts`
- Oorspronkelijke uitgave: #1628
