# REASONING_REPLAY (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Kilde til sannhet:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute fanger opp assistent `reasoning_content` produsert av tenkemodusmodeller og spiller den på nytt på forespørsler om flere svinger når oppstrømsleverandøren krever det. Dette eliminerer HTTP 400-feilene som strenge tilbydere reiser når en klients samtalehistorikk mangler resonnementet fra forrige tur.

## Hvorfor dette eksisterer

Flere tenkemodusleverandører avviser en oppfølgingsvending med mindre** forrige assistentmelding inkluderer den originale `reasoning_content`** . Oppstrøms returnerer 400 med meldinger som:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Men typiske klienter (Cursor, Cline, Roo Code, OpenAI SDK) fjerner `reasoning_content` fra historien de spiller på nytt. OmniRoute gjenoppretter den fra en server-side cache slik at forespørselen oppstrøms ser er konsistent. Utgave #1628 introduserte hybrid memory/SQLite persistens slik at cachen overlever prosessen omstart.

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

Opptak skjer i `open-sse/handlers/chatCore.ts` (to steder, på de to `cacheReasoningFromAssistantMessage` -anropsstedene). Replay skjer i `open-sse/translator/index.ts` etter skjematvang, men før utsendelse.

Vanlige (ikke-verktøy-anrop) assistentsvinger tastes annerledes: `buildAssistantMessageCacheKey()` fordøyer sesjonsomfanget pluss det normaliserte OpenAI-formattranskripsjonen frem til den svingen, fordi DeepSeek krever resonnementet fra _hver_ forrige sving når `tools` er til stede. For Responses-API-mål (for eksempel `opencode-go/deepseek-v4-flash`, rutet til `/responses`) bærer oppstrømskroppen `input`, ikke `messages`, så `translateRequest()` (`open-sse/translator/index.ts`) rapporterer pivot-transkriptet den fordøyde gjennom et tilbakeringingsalternativ og fangststedene fordøyer det samme transkripsjonen. Responses-replay-passet kjører på OpenAI pivoten for hvert kildeformat, så Anthropic Messages-klienter (Claude → OpenAI → Responses) spilles også på nytt.

## Lagring — Hybrid Minne + SQLite

Den varme banen bruker en `Map` i minnet (LRU-by-creation) støttet av en SQLite tabell for krasjgjenoppretting og dashbordsynlighet.

| Lag        | Implementering                                | Hensikt                                    |
| ---------- | --------------------------------------------- | ------------------------------------------ |
| Hukommelse | `Map` i `open-sse/services/reasoningCache.ts` | Raske oppslag, kastes ut eldst på 200      |
| DB         | `reasoning_cache` tabell (`src/lib/db/`)      | Vedvarer over omstarter, kjører statistikk |

Skriver går til begge. Leser konsulterer først minnet, og fall deretter tilbake til DB (DB treff flyttes tilbake til minnet). DB feil er ikke-dødelige. — cachen i minnet fortsetter å betjene den varme banen.

**Standarder:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maks minneoppføringer: `200` (`MAX_MEMORY_ENTRIES`)
- Utkastelse: eldste `createdAt` først

## Databaseskjema

Migrering: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indekser: `expires_at`, `provider`, `model`, `created_at`. `expires_at` lagres som Unix-epokesekunder; SELECT laget normaliserer eldre tekstverdier via `EXPIRES_AT_EPOCH_SQL`.

## Leverandør/modellgjenkjenning

Replay er aktivert når `requiresReasoningReplay(provider, model)` returnerer `true`. Funksjonen sjekker to lister i `open-sse/services/reasoningCache.ts`.

**Leverandør IDs (eksakt samsvar, skiller mellom store og små bokstaver):**

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

**Modellregex-mønstre (uavhengig av store og små bokstaver):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` og `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, valgfritt `-free` suffiks)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Å legge til en ny streng provider/model betyr å legge til en av disse listene og skrive en enhetstest som bekrefter replay-injeksjon. PR beskrivelsen bør sitere den nøyaktige oppstrøms 400-strengen som motiverte endringen.

## REST API

Cachen viser to endepunkter under `src/app/api/cache/reasoning/route.ts`. Begge krever administrasjonsautentisering (`isAuthenticated` fra `@/shared/utils/apiAuth`).

| Metode | Endepunkt                                                 | Beskrivelse                                                 |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistikk + paginerte oppføringer                          |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrert oppføring (`limit` klemt til `[1, 200]`)           |
| DELETE | `/api/cache/reasoning`                                    | Fjern alt (minne + DB) og tilbakestill hit/miss -tellingene |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Slett bare oppføringer for én leverandør                    |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Slett en enkelt oppføring                                   |

**GET responsform:**

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

## Driftsnotater

- **Opprydding:** `cleanupReasoningCache()` renser utløpte minneoppføringer og kjører `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Helsesjekkarbeidere ringer dette med jevne mellomrom.
- **Krasjgjenoppretting:** Etter en omstart er minnet tomt, men DB har fortsatt uutløpte oppføringer. Det første oppslaget for en gitt `tool_call_id` er et DB -treff; påfølgende oppslag er minnetreff.
- **Ingen resonnement, ingen cache:** `cacheReasoningFromAssistantMessage` returnerer `0` når assistentmeldingen ikke har noe `reasoning_content` / `reasoning` felt, så ikke-tenkende svar koster ingenting.
- **Skriv er også inngjerdet:** begge kallestedene i `chatCore.ts` (ikke-streaming og streaming) kaller bare `cacheReasoningFromAssistantMessage()` når `requiresReasoningReplay(provider, model)` er `true` — det samme predikatet som lesesiden sjekker. Installasjoner som aldri berører en replay-leverandør slutter å betale for skrivingen, indeksoppdateringen og try/catch for hvert resonnementbærende svar.
- **Ikke-strenge leverandører:** Når `requiresReasoningReplay` er `false` og målformatet er OpenAI, oversetteren** strimler** ethvert `reasoning_content` felt fra utgående meldinger — OpenAI Chatfullføringer godtar det ikke.

## Muse Opaque-Reasoning Eierskap

Muse (`muse-code`) returnerer anropsbundet ugjennomsiktig resonnement (`encrypted_content`). Å spille den på nytt under en annen konto eller reminted legitimasjon mislykkes oppstrøms, så native OAuth forespørsler bruker eierskap på øktnivå i stedet for rotasjon per forespørsel (`src/sse/services/museSessionOwnership.ts`, håndheves i `src/sse/handlers/chat.ts`). Eksplisitt valgte API-nøkkelforbindelser og API-nøkkel-konfigurasjoner beholder sin eksisterende ruting uten denne eierskapsmodusen.

- Gi en stabil økt ID på hver tur: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` eller `x-codex-session-id`; alternativt bruk `prompt_cache_key`, `session_id`, `conversation_id` eller `metadata.session_id` i brødteksten (i den prioriterte rekkefølgen). Manglende eller blank IDs returnerer 400 når to eller flere native OAuth kontoer er aktive; med en enkelt OAuth -konto er det ingenting å rotere til, så en slik forespørsel beholder ruting uten feste. Omfanget inkluderer innringerens OmniRoute API-nøkkel ID.
- Friske uavhengige økter rundt om på tvers av aktive opprinnelige OAuth kontoer tillatt av API-nøkkeltilkoblingspolicyen, sortert etter tilkobling ID. Round-robin hopper over kontoer i forbindelsesavkjøling, med terminalstatus (`banned`, `expired`, `credits_exhausted`), eller modelllåst for den forespurte modellen; Muse oppstrømsfeil registrerer nedkjøling og brytertilstand som andre leverandører. En eksplisitt tvungen tilkobling omgår round-robin for en ny økt, men kan ikke overstyre en eksisterende eier.
- Inntil eieren gir et vellykket svar, blir en økt hvis eier har blitt utilgjengelig gjort krav på en sunn konto. Etter det første vellykkede svaret forblir økten festet til den eieren til den har vært inaktiv i 30 dager (`MUSE_SESSION_IDLE_TTL_MS`).
- Hver fortsettelse og verktøyresultatvending forblir festet til økteieren: tilkobling, kontoidentitet og generering av slutningslegitimasjon, sjekket på nytt før oppstrømsforsøk, inkludert påloggingsoppdatering på nytt. Respons call IDs/item -referanser og Chat Completions tool-call IDs må ha blitt registrert for den økten og generasjonen.
- SQLite `key_value` -poster i `muse_session_ownership` navneområdet (`src/lib/db/museSessionOwnership.ts`) fortsetter å eie og rotasjonsmarkøren over starter på nytt. Hvert krav og levert svar oppdaterer øktens aktivitetsstempel; en økt inaktiv lenger enn `MUSE_SESSION_IDLE_TTL_MS` beskjæres (eierpinne, servert flagg og registrerte opaque/reference hasher), høyst én gang hvert 10. minutt og i avgrensede partier, så en senere replay av historien mislykkes lukket som en ukjent eier. Postene inneholder tilkoblings- IDs og hashes av kontoidentitet, legitimasjon, ugjennomsiktig innhold og fortsettelsesreferanser, ikke hemmeligheter eller samtalehistorikk. Klienter må beholde og sende hele sin historie og ugjennomsiktige resonnement.
- Ukjent eller utenlandsk ugjennomsiktig resonnement, en manglende eier, en utilgjengelig eierkonto, eller en generasjonsendring med registrert historikk mislykkes lukket med en eksplisitt 4xx/503 — aldri stille failover på tvers av kontoer og aldri droppet resonnement.
- En gjenopprettet nøkkel for samme konto brukes bare når økten ikke har registrert noen gjenspillbar historikk; innspilte økter holder feilstengt til de starter på nytt.
- Et tomt oppstrømssvar (`upstream_empty_response` / `empty_response`, ingenting sendt til den som ringer) prøves på nytt maksimalt to ganger på samme eier, etter 0,5 s og deretter 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Hvis alle forsøk er tomme, returneres den originale 502 uten nedkjølings- eller breaker-merking, slik at et flakete svar aldri låser eieren ute.
- Alle `muse-code` forespørsler omgår lesing og skriving av semantisk cache, inkludert streaming-skriving, slik at bufret ugjennomsiktig utgang ikke kan anskaffe en annen økteier.

Regresjonsvakter: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` og `tests/unit/chatcore-semantic-cache.test.ts`.

## Se også

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — effektbrytere, nedkjøling, modellsperringer
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostisering oppstrøms 400s
- Kilde: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrering: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API rute: `src/app/api/cache/reasoning/route.ts`
- Opprinnelig utgave: #1628
