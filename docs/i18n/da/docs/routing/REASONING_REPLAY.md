# REASONING_REPLAY (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sandhedens kilde:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Sidst opdateret:** 2026-06-28 — v3.8.40

OmniRoute fanger assistent `reasoning_content` produceret af tænkende modeller og afspiller det gennemsigtigt på multi-turn anmodninger, når upstream udbyderen kræver det. Dette eliminerer de HTTP 400-fejl, som strenge udbydere rejser, når en klients samtalehistorik mangler den forudgående turs begrundelse.

## Hvorfor dette eksisterer

Flere udbydere af tænkemåde afviser en opfølgende tur, medmindre de** forrige assistentmeddelelse indeholder den originale `reasoning_content`** . Upstream returnerer 400 med beskeder som:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Men typiske klienter (Cursor, Cline, Roo Code, OpenAI SDK) fjerner `reasoning_content` fra den historie, de afspiller igen. OmniRoute gendanner det fra en server-side cache, så anmodningen upstream ser er konsistent. Udgave #1628 introducerede hybrid memory/SQLite persistens, så cachen overlever, genstarter processen.

## Arkitektur

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

Capture sker i `open-sse/handlers/chatCore.ts` (to steder, på de to `cacheReasoningFromAssistantMessage` -opkaldssteder). Genafspilning sker i `open-sse/translator/index.ts` efter skematvang, men før afsendelse.

Almindelige (ikke-værktøj-opkald) assistent-vendinger er indtastet anderledes: `buildAssistantMessageCacheKey()` fordøjer sessionsomfanget plus det normaliserede OpenAI-format transskription op til den tur, fordi DeepSeek kræver ræsonnementet fra _hver_ foregående tur, når `tools` er til stede. For Responses-API-mål (f.eks. `opencode-go/deepseek-v4-flash`, dirigeret til `/responses`) bærer opstrømslegemet `input`, ikke `messages`, så `translateRequest()` (`open-sse/translator/index.ts`) rapporterer pivot-transkriptet, det fordøjede gennem en tilbagekaldsmulighed, og opsamlingsstederne fordøjer det samme transkript. Responses replay pass kører på OpenAI pivot for hvert kildeformat, så Anthropic Messages-klienter (Claude → OpenAI → Responses) afspilles også.

## Opbevaring — Hybrid Memory + SQLite

Den varme sti bruger en `Map` i hukommelsen (LRU-by-creation) understøttet af en SQLite tabel til gendannelse af nedbrud og synlighed i dashboardet.

| Lag        | Implementering                                | Formål                                           |
| ---------- | --------------------------------------------- | ------------------------------------------------ |
| Hukommelse | `Map` i `open-sse/services/reasoningCache.ts` | Hurtige opslag, smidt ældste på 200              |
| DB         | `reasoning_cache` tabel (`src/lib/db/`)       | Vedvarer på tværs af genstarter, kører statistik |

Skriver går til begge. Læser konsulterer først hukommelsen, og fald derefter tilbage til DB (DB hits forfremmes tilbage i hukommelsen). DB fejl er ikke-fatale — cachen i hukommelsen fortsætter med at betjene den varme vej.

**Standardindstillinger:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maks. hukommelsesindgange: `200` (`MAX_MEMORY_ENTRIES`)
- Udsættelse: ældste `createdAt` først

## Database skema

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

Indekser: `expires_at`, `provider`, `model`, `created_at`. `expires_at` er gemt som Unix epoke sekunder; SELECT laget normaliserer ældre tekstværdier via `EXPIRES_AT_EPOCH_SQL`.

## Udbyder / Model Detektion

Genafspilning er aktiveret, når `requiresReasoningReplay(provider, model)` returnerer `true`. Funktionen tjekker to lister i `open-sse/services/reasoningCache.ts`.

**Udbyder IDs (nøjagtig match, der skelnes mellem store og små bogstaver):**

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

**Model regex-mønstre (uafhængig af store og små bogstaver):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` og `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, valgfri `-free` suffiks)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Tilføjelse af en ny streng provider/model betyder at tilføje til en af disse lister og skrive en enhedstest, der hævder gentagelsesinjektion. PR beskrivelsen bør citere den nøjagtige opstrøms 400-streng, der motiverede ændringen.

## REST API

Cachen afslører to endepunkter under `src/app/api/cache/reasoning/route.ts`. Begge kræver administrationsgodkendelse (`isAuthenticated` fra `@/shared/utils/apiAuth`).

| Metode | Slutpunkt                                                 | Beskrivelse                                         |
| ------ | --------------------------------------------------------- | --------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistik + paginerede poster                       |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtreret liste (`limit` fastspændt til `[1, 200]`) |
| DELETE | `/api/cache/reasoning`                                    | Ryd alt (hukommelse + DB) og nulstil hit/miss tal   |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Ryd kun poster for én udbyder                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Slet en enkelt post                                 |

**GET svar form:**

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

## Operationelle noter

- **Oprydning:** `cleanupReasoningCache()` renser udløbne hukommelsesposter og kører `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Sundhedstjekarbejdere ringer til dette med jævne mellemrum.
- **Gendannelse af nedbrud:** Efter en genstart er hukommelsen tom, men DB indeholder stadig uudløbne poster. Det første opslag for en given `tool_call_id` er et DB hit; efterfølgende opslag er hukommelseshits.
- **Ingen begrundelse, ingen cache:** `cacheReasoningFromAssistantMessage` returnerer `0` når assistentmeddelelsen ikke har noget `reasoning_content` / `reasoning` felt, så ikke-tænkende svar koster ingenting.
- **Skriv er også lukket:** begge opkaldssteder i `chatCore.ts` (ikke-streaming og streaming) kalder kun `cacheReasoningFromAssistantMessage()` når `requiresReasoningReplay(provider, model)` er `true` — det samme prædikat læsesiden kontrollerer. Installationer, der aldrig rører en replay-udbyder, stopper med at betale for skrivningen, indeksopdateringen og try/catch ved hvert ræsonnementbærende svar.
- **Ikke-strenge udbydere:** Når `requiresReasoningReplay` er `false` og målformatet er OpenAI, oversætteren** strimler** ethvert `reasoning_content` felt fra udgående beskeder — OpenAI Chat-afslutninger accepterer det ikke.

## Muse Opaque-Reasoning Ejerskab

Muse (`muse-code`) returnerer opkaldsbundet uigennemsigtig ræsonnement (`encrypted_content`). Genafspilning af det under en anden konto eller genindlæst legitimationsoplysninger mislykkes opstrøms, så native OAuth -anmodninger bruger ejerskab på sessionsniveau i stedet for rotation pr. anmodning (`src/sse/services/museSessionOwnership.ts`, håndhævet i `src/sse/handlers/chat.ts`). Eksplicit valgte API-nøgleforbindelser og API-nøgle-kun-konfigurationer bevarer deres eksisterende routing uden denne ejerskabstilstand.

- Giv en stabil session ID på hver tur: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` eller `x-codex-session-id`; brug alternativt `prompt_cache_key`, `session_id`, `conversation_id` eller `metadata.session_id` i brødteksten (i den rækkefølge). Manglende eller blank IDs returnerer 400, når to eller flere native OAuth -konti er aktive; med en enkelt OAuth -konto er der ikke noget at rotere til, så en sådan anmodning bevarer unpinned routing. Omfanget inkluderer opkalderens OmniRoute API-nøgle ID.
- Friske uafhængige sessioner rundt om på tværs af aktive native OAuth -konti tilladt af API-nøgleforbindelsespolitikken, sorteret efter forbindelse ID. Round-robin springer konti over i forbindelsesnedkøling med en terminalstatus (`banned`, `expired`, `credits_exhausted`) eller modellåst for den anmodede model; Muse upstream-fejl registrerer nedkøling og breaker-tilstand ligesom andre udbydere. En eksplicit tvungen forbindelse omgår round-robin for en ny session, men kan ikke tilsidesætte en eksisterende ejer.
- Indtil ejeren modtager et vellykket svar, bliver en session, hvis ejer er blevet utilgængelig, krævet igen på en sund konto. Efter det første vellykkede svar forbliver sessionen fastgjort til den pågældende ejer, indtil den har været inaktiv i 30 dage (`MUSE_SESSION_IDLE_TTL_MS`).
- Hver fortsættelse og værktøjsresultatvending forbliver fastgjort til sessionsejeren: forbindelse, kontoidentitet og generering af inferens-legitimationsoplysninger, kontrolleret igen før upstream-forsøg, inklusive genforsøg med legitimationsopdatering. Svar call IDs/item referencer og Chat Completions tool-call IDs skal være blevet optaget for den pågældende session og generation.
- SQLite `key_value` -poster i `muse_session_ownership` navneområdet (`src/lib/db/museSessionOwnership.ts`) bevarer ejerskabet, og rotationsmarkøren over genstarter. Hvert krav og serverede svar opdaterer sessionens aktivitetsstempel; en session inaktiv længere end `MUSE_SESSION_IDLE_TTL_MS` beskæres (ejernål, serveret flag og registrerede opaque/reference hashes), højst én gang hvert 10. minut og i afgrænsede partier, så en senere genafspilning af dens historie mislykkes som en ukendt ejer. Optegnelser indeholder forbindelses- IDs og hashes af kontoidentitet, legitimationsoplysninger, uigennemsigtigt indhold og fortsættelsesreferencer, ikke hemmeligheder eller samtalehistorik. Kunder skal beholde og sende deres fulde historie og uigennemsigtige begrundelser.
- Ukendt eller udenlandsk uigennemsigtig ræsonnement, en manglende ejer, en utilgængelig ejerkonto eller et generationsskifte med registreret historie fejler lukket med en eksplicit 4xx/503 — aldrig tavs failover på tværs af konti og aldrig droppet ræsonnement.
- En genindspillet nøgle til samme konto anvendes kun, når sessionen ikke har registreret nogen historik, der kan genspilles; optagede sessioner bliver ved med at være lukkede, indtil de starter på ny.
- Et tomt opstrømssvar (`upstream_empty_response` / `empty_response`, intet udsendt til den, der ringer) prøves højst to gange på den samme ejer, efter 0,5 s og derefter 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Hvis alle forsøg er tomme, returneres den originale 502 uden cooldown eller breaker-mærkning, så et skævt svar låser aldrig ejeren ude.
- Alle `muse-code` anmodninger omgår semantisk cache-læsning og -skrivning, inklusive streamingskrivning, så cachelagret uigennemsigtigt output ikke kan anskaffe en anden sessionsejer.

Regressionsbeskyttelse: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` og `tests/unit/chatcore-semantic-cache.test.ts`.

## Se også

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — afbrydere, nedkøling, model lockouts
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticering upstream 400s
- Kilde: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API rute: `src/app/api/cache/reasoning/route.ts`
- Originalt nummer: #1628
