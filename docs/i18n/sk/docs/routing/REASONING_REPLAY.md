# REASONING_REPLAY (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Zdroj pravdy:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute zachytáva pomocnú `reasoning_content` produkovanú modelmi v režime myslenia a transparentne ju prehráva pri viacnásobných požiadavkách, keď to poskytovateľ upstream vyžaduje. To eliminuje chyby HTTP 400, ktoré prísni poskytovatelia upozorňujú, keď v histórii konverzácie klienta chýba zdôvodnenie predchádzajúceho kola.

## Prečo toto existuje

Viacerí poskytovatelia módu myslenia odmietajú následný obrat, pokiaľ nie** predchádzajúca správa asistenta obsahuje pôvodné `reasoning_content`** . Upstream vráti 400 so správami ako:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Typickí klienti (Cursor, Cline, Roo Code, OpenAI SDK) však vyberajú `reasoning_content` z histórie, ktorú prehrávajú. OmniRoute ho obnoví z vyrovnávacej pamäte na strane servera, takže požiadavka, ktorú vidí upstream, je konzistentná. Vydanie #1628 zaviedlo hybridnú perzistenciu memory/SQLite, takže vyrovnávacia pamäť prežije reštart procesu.

## Architektúra

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

Zachytenie prebieha v `open-sse/handlers/chatCore.ts` (dve miesta, na dvoch volacích miestach `cacheReasoningFromAssistantMessage` ). Opakované prehrávanie prebieha v `open-sse/translator/index.ts` po prinútení schémy, ale pred odoslaním.

Obyčajné obraty asistenta (bez zavolania nástroja) sú kľúčové inak: `buildAssistantMessageCacheKey()` spracuje rozsah relácie plus normalizovaný prepis vo formáte OpenAI až do tohto kola, pretože DeepSeek vyžaduje odôvodnenie _každého_ predchádzajúceho ťahu, keď je prítomný `tools`. Pre ciele Responses-API (napríklad `opencode-go/deepseek-v4-flash` smerované do `/responses`) telo proti prúdu nesie `input`, nie `messages`, takže `translateRequest()` (`open-sse/translator/index.ts`) hlási kľúčový prepis, ktorý spracoval prostredníctvom možnosti spätného volania, a zachytávacie miesta strávia ten istý prepis. Prehrávanie odpovedí prebieha na pivote OpenAI pre každý zdrojový formát, takže klienti správ Anthropic (Claude → OpenAI → odpovede) sa tiež prehrajú.

## Úložisko — Hybridná pamäť + SQLite

Horúca cesta využíva in-memory `Map` (LRU-by-creation) podporovanú tabuľkou SQLite na obnovu po zlyhaní a viditeľnosť dashboardu.

| Vrstva | Implementácia                                 | Účel                                                |
| ------ | --------------------------------------------- | --------------------------------------------------- |
| pamäť  | `Map` v `open-sse/services/reasoningCache.ts` | Rýchle vyhľadávanie, vysťahovanie najstaršie na 200 |
| DB     | tabuľka `reasoning_cache` (`src/lib/db/`)     | Pretrváva počas reštartov, riadi štatistiky         |

Zápisy idú obom. Čítanie najprv konzultuje pamäť, potom sa vráti k DB (zásahy DB sa vrátia späť do pamäte). Zlyhania DB nie sú fatálne — vyrovnávacia pamäť v pamäti naďalej obsluhuje horúcu cestu.

**Predvolené:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximálny počet pamäťových položiek: `200` (`MAX_MEMORY_ENTRIES`)
- Vysťahovanie: najskôr najstarší `createdAt`

## Schéma databázy

Migrácia: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indexy: `expires_at`, `provider`, `model`, `created_at`. `expires_at` je uložený ako sekundy epoch Unix; vrstva SELECT normalizuje hodnoty starého textu pomocou `EXPIRES_AT_EPOCH_SQL`.

## Poskytovateľ / Detekcia modelu

Opakované prehrávanie je povolené, keď `requiresReasoningReplay(provider, model)` vráti `true`. Funkcia kontroluje dva zoznamy v `open-sse/services/reasoningCache.ts`.

**Poskytovateľ IDs (presná zhoda, nerozlišujú sa malé a veľké písmená):**

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

**Modelovanie vzorov regulárneho výrazu (nerozlišujú sa malé a veľké písmená):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` a `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, voliteľná prípona `-free` )
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Pridanie nového prísneho provider/model znamená pripojenie k jednému z týchto zoznamov a napísanie testu jednotky, ktorý potvrdzuje injekciu opakovaného prehrávania. V popise PR by sa mal uviesť presný reťazec 400 na začiatku, ktorý motivoval zmenu.

## REST API

Cache odhaľuje dva koncové body pod `src/app/api/cache/reasoning/route.ts`. Obidva vyžadujú autentifikáciu manažmentu (`isAuthenticated` od `@/shared/utils/apiAuth`).

| Metóda | Koncový bod                                               | Popis                                                  |
| ------ | --------------------------------------------------------- | ------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Štatistika + stránkovaných záznamov                    |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrovaný zoznam (`limit` upnuté na `[1, 200]`)       |
| DELETE | `/api/cache/reasoning`                                    | Vymažte všetko (pamäť + DB) a vynulujte počty hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Vymazať len záznamy pre jedného poskytovateľa          |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Vymažte jeden záznam                                   |

**tvar odpovede GET :**

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

## Prevádzkové poznámky

- **Upratovanie:** `cleanupReasoningCache()` vyčistí položky pamäte s vypršanou platnosťou a spustí `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pravidelne to volajú pracovníci zdravotnej kontroly.
- **Obnova po havárii:** Po reštarte je pamäť prázdna, ale DB stále obsahuje neukončené záznamy. Prvé vyhľadávanie pre daný `tool_call_id` je DB hit; následné vyhľadávania sú zásahy do pamäte.
- **Bez uvažovania, bez vyrovnávacej pamäte:** `cacheReasoningFromAssistantMessage` vráti `0` keď správa asistenta nemá pole `reasoning_content` / `reasoning`, takže odpovede bez premýšľania nič nestoja.
- **Zápis je tiež chránený:** obe volacie stránky v `chatCore.ts` (nestreamingové a streamingové) volajú `cacheReasoningFromAssistantMessage()` len vtedy, keď `requiresReasoningReplay(provider, model)` je `true` — rovnaký predikát kontroly na strane čítania. Inštalácie, ktoré sa nikdy nedotknú poskytovateľa prehrávania, prestanú platiť za zápis, aktualizáciu indexu a try/catch pri každej odpovedi nesúcej dôvod.
- **Neprísni poskytovatelia:** Keď `requiresReasoningReplay` je `false` a cieľový formát je OpenAI, prekladateľ** prúžky** akékoľvek pole `reasoning_content` z odchádzajúcich správ — OpenAI Chat Completions to neakceptuje.

## Vlastníctvo Múzy Nepriehľadné-uvažujúce

Muse (`muse-code`) vracia nepriehľadné uvažovanie viazané na volajúceho (`encrypted_content`). Opätovné prehrávanie pod iným účtom alebo pripomenutým poverením zlyhá, takže natívne požiadavky OAuth používajú vlastníctvo na úrovni relácie namiesto rotácie podľa žiadosti (`src/sse/services/museSessionOwnership.ts`, vynútené v `src/sse/handlers/chat.ts`). Explicitne vybrané pripojenia kľúča API a konfigurácie iba kľúča API si zachovajú svoje existujúce smerovanie bez tohto režimu vlastníctva.

- Poskytnite stabilnú reláciu ID na každom kroku: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` alebo `x-codex-session-id`; alternatívne použite `prompt_cache_key`, `session_id`, `conversation_id` alebo `metadata.session_id` v tele (v tomto poradí). Chýbajúci alebo prázdny IDs návrat 400, keď sú aktívne dva alebo viac natívnych OAuth účtov; s jedným účtom OAuth nie je čo otáčať, takže takáto požiadavka udržiava nepripnuté smerovanie. Rozsah zahŕňa kľúč API OmniRoute volajúceho ID.
- Nové nezávislé relácie cyklicky naprieč aktívnymi natívnymi účtami OAuth, ktoré povoľuje politika pripojenia kľúča API, zoradené podľa pripojenia ID. Round-robin preskakuje účty pri ochladzovaní pripojenia, so stavom terminálu (`banned`, `expired`, `credits_exhausted`) alebo uzamknutým modelom pre požadovaný model; Zlyhania Muse upstream zaznamenávajú chladenie a stav ističa ako ostatní poskytovatelia. Explicitne vynútené pripojenie obchádza opakovanú reláciu pre novú reláciu, ale nemôže prepísať existujúceho vlastníka.
- Kým vlastník nedoručí úspešnú odpoveď, relácia, ktorej vlastník sa stal nedostupným, bude znova nárokovaná na zdravý účet. Po prvej úspešnej odpovedi zostane relácia pripnutá k danému vlastníkovi, kým nebude 30 dní nečinná (`MUSE_SESSION_IDLE_TTL_MS`).
- Každé pokračovanie a otočenie výsledku nástroja zostáva pripnuté k vlastníkovi relácie: pripojenie, identita účtu a generovanie odvodených poverení sú znova skontrolované pred pokusmi o upstream, vrátane opakovaných pokusov o obnovenie poverení. Pre túto reláciu a generovanie musia byť zaznamenané referencie volania IDs/item odpovedí a volanie nástroja IDs dokončenia rozhovoru.
- Záznamy SQLite `key_value` v priestore názvov `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) pretrvávajú vo vlastníctve a otáčaní kurzora cez reštarty. Každý nárok a doručená odpoveď obnoví pečiatku aktivity relácie; relácia, ktorá je nečinná dlhšie ako `MUSE_SESSION_IDLE_TTL_MS` je orezaná (kód vlastníka, obsluhovaná vlajka a zaznamenané haše opaque/reference ), maximálne raz za 10 minút a v ohraničených dávkach, takže neskoršie prehratie jej histórie zlyhá ako neznámy vlastník. Záznamy obsahujú IDs pripojenia a hash identity účtu, poverenia, nepriehľadný obsah a odkazy na pokračovanie, nie tajomstvá alebo históriu konverzácií. Klienti si musia ponechať a odoslať celú svoju históriu a nepriehľadné odôvodnenie.
- Neznáme alebo cudzie netransparentné zdôvodnenie, chýbajúci vlastník, nedostupný účet vlastníka alebo generačná zmena so zaznamenanou históriou zlyhala s explicitným 4xx/503 — nikdy tichým prepnutím medzi účtami pri zlyhaní a nikdy neupustila zdôvodnenie.
- Pripomenutý kľúč rovnakého účtu je prijatý iba vtedy, keď relácia nezaznamenala žiadnu opakovateľnú históriu; zaznamenané relácie zlyhávajú, kým sa nezačnú znovu.
- Prázdna odozva proti prúdu (`upstream_empty_response` / `empty_response`, volajúcemu sa nič nevyšle) sa u toho istého vlastníka zopakuje maximálne dvakrát, po 0,5 s potom 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Ak sú všetky pokusy prázdne, pôvodný 502 sa vráti bez označenia cooldownu alebo prerušovača, takže vratká odpoveď nikdy nezablokuje vlastníka.
- Všetky požiadavky `muse-code` obchádzajú čítania a zápisy sémantickej vyrovnávacej pamäte, vrátane streamovaných zápisov, takže nepriehľadný výstup uložený vo vyrovnávacej pamäti nemôže získať iného vlastníka relácie.

Ochrany regresie: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` a `tests/unit/chatcore-semantic-cache.test.ts`.

## Pozri tiež

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ističe, cooldowny, model lockouts
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostikovanie upstream 400s
- Zdroj: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrácia: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API trasa: `src/app/api/cache/reasoning/route.ts`
- Pôvodné vydanie: #1628
