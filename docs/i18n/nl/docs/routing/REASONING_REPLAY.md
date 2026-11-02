# Reasoning Replay Cache (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Bron van waarheid:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute legt de door modellen in denkmodus geproduceerde `reasoning_content` van de assistent vast en speelt deze transparant opnieuw af bij verzoeken met meerdere beurten wanneer de upstreamprovider dit vereist. Dit voorkomt de HTTP 400-fouten die strikte providers retourneren wanneer in de gespreksgeschiedenis van een client de redenering van de vorige beurt ontbreekt.

## Waarom Dit Bestaat

Verschillende providers met een denkmodus weigeren een vervolgbeurt tenzij het **vorige assistentbericht de oorspronkelijke `reasoning_content` bevat**. De upstream retourneert een 400-fout met berichten zoals:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Gebruikelijke clients (Cursor, Cline, Roo Code, OpenAI SDK) verwijderen `reasoning_content` echter uit de geschiedenis die ze opnieuw versturen. OmniRoute herstelt deze vanuit een server-side cache, zodat het verzoek dat de upstream ontvangt consistent is. Issue #1628 introduceerde de hybride persistentie in geheugen/SQLite, zodat de cache behouden blijft na het opnieuw starten van het proces.

## Architectuur

```
Beurt N (assistant genereert):
  → respons bevat reasoning_content + tool_calls
  → als requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      schrijft (geheugen + DB), geïndexeerd op elke tool_call.id
  → stuur respons door naar client (die de redenering al dan niet bewaart)

Beurt N+1 (client stuurt vervolg):
  → vertaler detecteert: requiresReasoningReplay(provider, model) === true
  → voor elk assistant-bericht met tool_calls en zonder reasoning_content:
      lookupReasoning(toolCalls[0].id) → geheugen → DB
      treffer  → msg.reasoning_content = cached; recordReplay()
      gemist   → msg.reasoning_content = "" (legacy-terugvaloptie voor oudere DeepSeek)
  → upstream ontvangt consistente geschiedenis → geen 400
```

Vastlegging vindt plaats in `open-sse/handlers/chatCore.ts` (op twee plaatsen, bij de twee aanroepen van `cacheReasoningFromAssistantMessage`). Opnieuw afspelen vindt plaats in `open-sse/translator/index.ts`, na schemacoërcie maar vóór verzending.

Gewone assistant-beurten (zonder tool-call) worden anders geïndexeerd: `buildAssistantMessageCacheKey()` maakt een digest van het sessiebereik plus het genormaliseerde transcript in OpenAI-indeling tot en met die beurt, omdat DeepSeek de redenering van _elke_ eerdere beurt vereist zodra `tools` aanwezig is. Voor Responses-API-doelen (bijvoorbeeld `opencode-go/deepseek-v4-flash`, gerouteerd naar `/responses`) bevat de upstream-body `input`, niet `messages`. Daarom rapporteert `translateRequest()` (`open-sse/translator/index.ts`) via een callbackoptie het pivottranscript waarvan een digest is gemaakt, waarna de vastleggingslocaties een digest van datzelfde transcript maken. De Responses-herhalingsstap wordt voor elke bronindeling uitgevoerd op de OpenAI-pivot, zodat ook Anthropic Messages-clients (Claude → OpenAI → Responses) opnieuw worden afgespeeld.

## Opslag — Hybride Geheugen + SQLite

Het veelgebruikte pad gebruikt een `Map` in het geheugen (LRU op basis van aanmaaktijd), ondersteund door een SQLite-tabel voor herstel na crashes en zichtbaarheid in het dashboard.

| Laag     | Implementatie                                  | Doel                                              |
| -------- | ---------------------------------------------- | ------------------------------------------------- |
| Geheugen | `Map` in `open-sse/services/reasoningCache.ts` | Snelle zoekopdrachten, verwijdert oudste bij 200  |
| DB       | Tabel `reasoning_cache` (`src/lib/db/`)        | Blijft behouden na herstarts, levert statistieken |

Schrijfbewerkingen gaan naar beide. Leesbewerkingen raadplegen eerst het geheugen en vallen daarna terug op de DB (DB-treffers worden opnieuw naar het geheugen gepromoveerd). DB-fouten zijn niet fataal — de cache in het geheugen blijft het veelgebruikte pad bedienen.

**Standaardwaarden:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximaal aantal items in het geheugen: `200` (`MAX_MEMORY_ENTRIES`)
- Verwijdering: oudste `createdAt` eerst

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

Indexen: `expires_at`, `provider`, `model`, `created_at`. `expires_at` wordt opgeslagen als Unix-epochtijd in seconden; de SELECT-laag normaliseert verouderde tekstwaarden via `EXPIRES_AT_EPOCH_SQL`.

## Detectie van provider/model

Replay wordt ingeschakeld wanneer `requiresReasoningReplay(provider, model)` `true` retourneert. De functie controleert twee lijsten in `open-sse/services/reasoningCache.ts`.

**Provider-ID's (exacte overeenkomst, hoofdletterongevoelig):**

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

**Reguliere-expressiepatronen voor modellen (hoofdletterongevoelig):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` en `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, optioneel achtervoegsel `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Om een nieuwe strikte provider of een nieuw strikt model toe te voegen, voegt u deze toe aan een van deze lijsten en schrijft u een unit-test die de replay-injectie bevestigt. De PR-beschrijving moet de exacte upstream 400-tekenreeks vermelden die aanleiding gaf tot de wijziging.

## REST-API

De cache biedt twee endpoints onder `src/app/api/cache/reasoning/route.ts`. Beide vereisen beheerauthenticatie (`isAuthenticated` uit `@/shared/utils/apiAuth`).

| Methode | Endpoint                                                  | Beschrijving                                                             |
| ------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| GET     | `/api/cache/reasoning`                                    | Statistieken + gepagineerde vermeldingen                                 |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Gefilterde lijst (`limit` begrensd tot `[1, 200]`)                       |
| DELETE  | `/api/cache/reasoning`                                    | Alles wissen (geheugen + DB) en het aantal hits/misses opnieuw instellen |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Alleen vermeldingen voor één provider wissen                             |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Eén vermelding verwijderen                                               |

**Structuur van het GET-antwoord:**

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

- **Opschoning:** `cleanupReasoningCache()` verwijdert verlopen vermeldingen uit het geheugen en voert `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` uit. Healthcheck-workers roepen dit periodiek aan.
- **Herstel na een crash:** Na een herstart is het geheugen leeg, maar bevat de DB nog steeds niet-verlopen vermeldingen. De eerste opzoekactie voor een bepaalde `tool_call_id` is een DB-hit; volgende opzoekacties zijn geheugenhits.
- **Geen redenering, geen cache:** `cacheReasoningFromAssistantMessage` retourneert `0` wanneer het assistentbericht geen veld `reasoning_content` / `reasoning` bevat, zodat niet-redenerende antwoorden niets kosten.
- **Ook schrijven is voorwaardelijk:** beide aanroeplocaties in `chatCore.ts` (niet-streaming en streaming) roepen `cacheReasoningFromAssistantMessage()` alleen aan wanneer `requiresReasoningReplay(provider, model)` `true` is — hetzelfde predicaat dat door de leeszijde wordt gecontroleerd. Installaties die nooit een replay-provider gebruiken, hoeven niet langer te betalen voor de schrijfactie, de indexupdate en de try/catch voor elk antwoord dat een redenering bevat.
- **Niet-strikte providers:** Wanneer `requiresReasoningReplay` `false` is en de doelindeling OpenAI is, **verwijdert** de vertaler elk veld `reasoning_content` uit uitgaande berichten — OpenAI Chat Completions accepteert dit veld niet.

## Eigenaarschap van ondoorzichtige Muse-redeneringen

Muse (`muse-code`) retourneert ondoorzichtige redeneringen die aan de aanroeper zijn gebonden (`encrypted_content`). Opnieuw afspelen onder een ander account of met opnieuw uitgegeven inloggegevens faalt upstream; native OAuth-verzoeken gebruiken daarom eigenaarschap per sessie in plaats van rotatie per verzoek (`src/sse/services/museSessionOwnership.ts`, afgedwongen in `src/sse/handlers/chat.ts`). Expliciet geselecteerde API-sleutelverbindingen en configuraties met alleen API-sleutels behouden hun bestaande routering zonder deze eigenaarschapsmodus.

- Geef bij elke beurt een stabiele sessie-ID mee: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` of `x-codex-session-id`; gebruik als alternatief `prompt_cache_key`, `session_id`, `conversation_id` of `metadata.session_id` in de inhoud (in die prioriteitsvolgorde). Ontbrekende of lege ID's geven 400 wanneer twee of meer native OAuth-accounts actief zijn; met één OAuth-account is er geen ander account om naartoe te roteren, dus zo'n verzoek behoudt routering zonder vaste toewijzing. De scope omvat de OmniRoute-API-sleutel-ID van de aanroeper.
- Nieuwe onafhankelijke sessies worden om de beurt verdeeld over actieve native OAuth-accounts die het verbindingsbeleid van de API-sleutel toestaat, gesorteerd op verbindings-ID. Deze verdeling slaat accounts over met verbindingscooldown, een terminale status (`banned`, `expired`, `credits_exhausted`) of een modelblokkering voor het gevraagde model; upstream-fouten van Muse registreren cooldown en circuitbreakerstatus zoals bij andere providers. Een expliciet afgedwongen verbinding omzeilt deze verdeling voor een nieuwe sessie, maar kan een eigenaar niet vervangen nadat die een geslaagd antwoord heeft geleverd.
- Tot de eigenaar een succesvol antwoord levert, wordt een sessie waarvan de eigenaar onbeschikbaar is geworden opnieuw geclaimd op een gezond account. Na het eerste succesvolle antwoord blijft de sessie aan die eigenaar vastgezet totdat zij 30 dagen inactief is geweest (`MUSE_SESSION_IDLE_TTL_MS`).
- Elke voortzetting en beurt met toolresultaten blijft aan de sessie-eigenaar vastgezet: verbinding, accountidentiteit en generatie van de inferentie-inloggegevens, opnieuw gecontroleerd vóór upstream-pogingen, inclusief herhaalde pogingen na vernieuwing van inloggegevens. Responses-aanroep-ID's/itemverwijzingen en Chat Completions-toolaanroep-ID's moeten voor die sessie en generatie zijn geregistreerd.
- SQLite-records in `key_value` binnen de naamruimte `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) bewaren eigenaarschap en de rotatiecursor over herstarts heen. Elke claim en elk geleverd antwoord vernieuwt het activiteitsstempel van de sessie; een sessie die langer dan `MUSE_SESSION_IDLE_TTL_MS` inactief is, wordt opgeschoond (eigenaartoewijzing, geleverd-vlag en geregistreerde hashes van ondoorzichtige inhoud/verwijzingen), hoogstens eenmaal per 10 minuten en in begrensde batches, zodat later opnieuw afspelen van haar geschiedenis uit voorzorg wordt geweigerd wegens een onbekende eigenaar. Records bevatten verbindings-ID's en hashes van accountidentiteit, inloggegevens, ondoorzichtige inhoud en voortzettingsverwijzingen, geen geheimen of gespreksgeschiedenis. Clients moeten hun volledige geschiedenis en ondoorzichtige redeneringen bewaren en meesturen.
- Onbekende of vreemde ondoorzichtige redeneringen, een ontbrekende eigenaar, een onbeschikbaar eigenaarsaccount of een generatiewijziging bij geregistreerde geschiedenis leiden tot weigering uit voorzorg met een expliciete 4xx/503 — nooit stille terugval naar een ander account en nooit het weggooien van redeneringen.
- Een opnieuw uitgegeven sleutel voor hetzelfde account wordt alleen overgenomen als de sessie geen opnieuw afspeelbare geschiedenis heeft geregistreerd; geregistreerde sessies blijven uit voorzorg falen totdat een nieuwe sessie wordt begonnen.
- Een leeg upstream-antwoord (`upstream_empty_response` / `empty_response`, niets naar de aanroeper verstuurd) wordt hoogstens tweemaal bij dezelfde eigenaar opnieuw geprobeerd, na 0.5 s en daarna 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Als alle pogingen leeg zijn, wordt de oorspronkelijke 502 teruggestuurd zonder cooldown- of circuitbreakermarkering, zodat een onbetrouwbaar antwoord de eigenaar nooit buitensluit.
- Alle `muse-code`-verzoeken omzeilen lezen en schrijven van de semantische cache, inclusief streamingschrijfacties, zodat gecachte ondoorzichtige uitvoer geen andere sessie-eigenaar kan krijgen.

Regressiecontroles: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` en `tests/unit/chatcore-semantic-cache.test.ts`.

## Zie ook

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuitbreakers, afkoelperioden, modelblokkeringen
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — upstream 400-fouten diagnosticeren
- Bron: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migratie: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API-route: `src/app/api/cache/reasoning/route.ts`
- Oorspronkelijk issue: #1628
