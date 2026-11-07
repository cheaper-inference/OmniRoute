# REASONING_REPLAY (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Zdroj pravdy:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute zachycuje pomocné `reasoning_content` vytvořené modely v myšlenkovém režimu a transparentně je přehrává na víceotáčkových požadavcích, když to upstream poskytovatel požaduje. To eliminuje chyby HTTP 400, které striktní poskytovatelé upozorňují, když v historii konverzace klienta chybí zdůvodnění předchozího kola.

## Proč toto existuje

Několik poskytovatelů myšlenkových režimů odmítá následný obrat, pokud není** předchozí zpráva asistenta obsahuje původní `reasoning_content`** . Upstream vrátí 400 se zprávami jako:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ale typičtí klienti (Cursor, Cline, Roo Code, OpenAI SDK) stahují `reasoning_content` z historie, kterou přehrávají. OmniRoute jej obnoví z mezipaměti na straně serveru, takže požadavek, který upstream vidí, je konzistentní. Vydání #1628 zavedlo hybridní memory/SQLite persistenci, takže mezipaměť přežije restartování procesu.

## Architektura

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

Zachycení probíhá v `open-sse/handlers/chatCore.ts` (dvě místa, na dvou místech volání `cacheReasoningFromAssistantMessage` ). Přehrání proběhne v `open-sse/translator/index.ts` po vynucení schématu, ale před odesláním.

Obyčejné tahy asistenta (bez volání nástroje) jsou klíčovány odlišně: `buildAssistantMessageCacheKey()` zpracovává rozsah relace plus normalizovaný přepis ve formátu OpenAI až do tohoto tahu, protože DeepSeek vyžaduje zdůvodnění _každého_ předchozího tahu, jakmile je přítomen `tools`. U cílů Responses-API (například `opencode-go/deepseek-v4-flash`, směrované do `/responses`) tělo proti směru proudění nese `input`, nikoli `messages`, takže `translateRequest()` (`open-sse/translator/index.ts`) hlásí hlavní transkript, který natrávil prostřednictvím možnosti zpětného volání, a zachycovací místa stráví stejný přepis. Přehrávání Responses běží na pivotu OpenAI pro každý zdrojový formát, takže klienti Anthropic Messages (Claude → OpenAI → Responses) jsou také přehráni.

## Úložiště — Hybridní paměť + SQLite

Horká cesta používá in-memory `Map` (LRU-by-creation) podporovanou tabulkou SQLite pro zotavení po havárii a viditelnost řídicího panelu.

| Vrstva | Implementace                                  | Účel                                             |
| ------ | --------------------------------------------- | ------------------------------------------------ |
| Paměť  | `Map` v `open-sse/services/reasoningCache.ts` | Rychlé vyhledávání, vystěhování nejstarší na 200 |
| DB     | tabulka `reasoning_cache` (`src/lib/db/`)     | Přetrvává přes restarty, řídí statistiky         |

Zápisy jdou do obou. Čtení nejprve konzultuje paměť, pak se vrátí k DB (DB hity jsou povýšeny zpět do paměti). Selhání DB nejsou fatální — mezipaměť v paměti nadále obsluhuje horkou cestu.

**Výchozí:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximální paměťové položky: `200` (`MAX_MEMORY_ENTRIES`)
- Vystěhování: nejstarší `createdAt` jako první

## Schéma databáze

Migrace: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indexy: `expires_at`, `provider`, `model`, `created_at`. `expires_at` je uloženo jako sekundy epoch Unix; vrstva SELECT normalizuje hodnoty staršího textu pomocí `EXPIRES_AT_EPOCH_SQL`.

## Poskytovatel / Detekce modelu

Replay je povolen, když `requiresReasoningReplay(provider, model)` vrátí `true`. Funkce kontroluje dva seznamy v `open-sse/services/reasoningCache.ts`.

**Poskytovatel IDs (přesná shoda, nerozlišují se malá a velká písmena):**

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

**Modelování vzorů regulárních výrazů (nerozlišují se malá a velká písmena):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` a `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, volitelná přípona `-free` )
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Přidání nového přísného provider/model znamená připojení k jednomu z těchto seznamů a napsání testu jednotky s potvrzením replay injection. Popis PR by měl uvádět přesný řetězec 400 upstream, který změnu motivoval.

## REST API

Mezipaměť zpřístupňuje dva koncové body pod `src/app/api/cache/reasoning/route.ts`. Oba vyžadují autentizaci pro správu (`isAuthenticated` z `@/shared/utils/apiAuth`).

| Metoda | Koncový bod                                               | Popis                                               |
| ------ | --------------------------------------------------------- | --------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistiky + stránkované záznamy                    |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrovaný výpis (`limit` upnutý na `[1, 200]`)     |
| DELETE | `/api/cache/reasoning`                                    | Vymažte vše (paměť + DB) a resetujte počty hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Vymazat pouze záznamy pro jednoho poskytovatele     |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Smazat jeden záznam                                 |

**tvar odpovědi GET :**

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

## Provozní poznámky

- **Čištění:** `cleanupReasoningCache()` vyčistí položky paměti s vypršenou platností a spustí `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pracovníci zdravotní kontroly to pravidelně volají.
- **Obnova po havárii:** Po restartu je paměť prázdná, ale DB stále obsahuje položky, které nevypršely. První vyhledávání pro daný `tool_call_id` je DB hit; následné vyhledávání jsou zásahy do paměti.
- **Žádné uvažování, žádná mezipaměť:** `cacheReasoningFromAssistantMessage` vrátí `0` když zpráva asistenta nemá pole `reasoning_content` / `reasoning`, takže odpovědi bez přemýšlení nic nestojí.
- **Zápis je také chráněn:** obě volací místa v `chatCore.ts` (bez streamování a streamování) volají `cacheReasoningFromAssistantMessage()` pouze tehdy, když `requiresReasoningReplay(provider, model)` je `true` — stejný predikát kontroly na straně čtení. Instalace, které se nikdy nedotknou poskytovatele přehrávání, přestanou platit za zápis, aktualizaci indexu a try/catch při každé odpovědi nesoucí důvod.
- **Nepřísní poskytovatelé:** Když `requiresReasoningReplay` je `false` a cílový formát je OpenAI, překladač** proužky** jakékoli pole `reasoning_content` z odchozích zpráv — OpenAI Chat Completions to nepřijímá.

## Vlastnictví Muse Opaque-Reasoning

Muse (`muse-code`) vrací neprůhledné uvažování vázané na volajícího (`encrypted_content`). Přehrání pod jiným účtem nebo připomenutým pověřením selže upstream, takže nativní požadavky OAuth používají vlastnictví na úrovni relace místo rotace podle požadavku (`src/sse/services/museSessionOwnership.ts`, vynuceno v `src/sse/handlers/chat.ts`). Explicitně vybraná připojení pomocí klíče API a konfigurace pouze s klíčem API si zachovají své stávající směrování bez tohoto režimu vlastnictví.

- Poskytněte stabilní relaci ID v každém tahu: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` nebo `x-codex-session-id`; alternativně použijte `prompt_cache_key`, `session_id`, `conversation_id` nebo `metadata.session_id` v těle (v tomto pořadí priority). Chybějící nebo prázdné IDs vrátí 400, když jsou aktivní dva nebo více nativních účtů OAuth ; s jedním účtem OAuth není co otáčet, takže takový požadavek udržuje nepřipnuté směrování. Rozsah zahrnuje klíč API OmniRoute volajícího ID.
- Nové nezávislé relace cyklicky napříč aktivními nativními účty OAuth povolenými zásadami připojení pomocí klíče API, seřazené podle připojení ID. Round-robin přeskakuje účty při ochlazení připojení, se stavem terminálu (`banned`, `expired`, `credits_exhausted`) nebo uzamčením modelu pro požadovaný model; Porucha Muse upstream zaznamenává cooldown a stav jističe jako ostatní poskytovatelé. Explicitně vynucené připojení obchází kruhovou obsluhu pro novou relaci, ale nemůže přepsat existujícího vlastníka.
- Dokud vlastník nedoručí úspěšnou odpověď, je relace, jejíž vlastník se stal nedostupným, znovu nárokována na zdravý účet. Po první úspěšné odpovědi zůstane relace připnutá k danému vlastníkovi, dokud nebude 30 dní nečinná (`MUSE_SESSION_IDLE_TTL_MS`).
- Každé pokračování a otočení výsledku nástroje zůstává připojeno k vlastníkovi relace: připojení, identita účtu a generování odvozených pověření, které jsou znovu zkontrolovány před pokusy o upstream, včetně opakovaných pokusů o obnovení pověření. Pro danou relaci a generování musí být zaznamenány odkazy na volání IDs/item odpovědí a volání nástroje IDs dokončení chatu.
- Záznamy SQLite `key_value` ve jmenném prostoru `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) přetrvávají vlastnictví a rotace kurzoru přes restarty. Každý požadavek a doručená odpověď obnoví razítko aktivity relace; nečinná relace delší než `MUSE_SESSION_IDLE_TTL_MS` je ořezána (pin vlastníka, obsluhovaný příznak a zaznamenané haše opaque/reference ), maximálně jednou za 10 minut a v omezených dávkách, takže pozdější přehrání její historie se nezdaří uzavřít jako neznámý vlastník. Záznamy obsahují IDs připojení a hash identity účtu, přihlašovací údaje, neprůhledný obsah a odkazy na pokračování, nikoli tajemství nebo historii konverzace. Klienti si musí uchovat a zaslat svou úplnou historii a neprůhledné odůvodnění.
- Neznámé nebo cizí neprůhledné zdůvodnění, chybějící vlastník, nedostupný účet vlastníka nebo generační změna se zaznamenanou historií se nezdaří s explicitním 4xx/503 — never silent cross-account failover a nikdy neupuštěné zdůvodnění.
- Připomenutý klíč stejného účtu je přijat pouze tehdy, když relace nezaznamenala žádnou opakovatelnou historii; zaznamenané relace se nedaří uzavřít, dokud nezačnou znovu.
- Prázdná odezva proti proudu (`upstream_empty_response` / `empty_response`, volajícímu se nic nevysílá) je u stejného vlastníka opakována maximálně dvakrát, po 0,5 s pak 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Pokud jsou všechny pokusy prázdné, původní 502 je vráceno bez cooldownu nebo bez označení jističe, takže nekvalitní odpověď nikdy nezablokuje vlastníka.
- Všechny požadavky `muse-code` obcházejí čtení a zápisy sémantické mezipaměti, včetně streamovaných zápisů, takže neprůhledný výstup uložený v mezipaměti nemůže získat jiného vlastníka relace.

Ochrany regrese: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` a `tests/unit/chatcore-semantic-cache.test.ts`.

## Viz také

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — jističe, cooldowny, model lockouts
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostika upstream 400s
- Zdroj: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrace: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- trasa API : `src/app/api/cache/reasoning/route.ts`
- Původní vydání: #1628
