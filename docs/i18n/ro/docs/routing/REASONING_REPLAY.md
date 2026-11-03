# REASONING_REPLAY (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sursa adevărului:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute captează asistentul `reasoning_content` produs de modele în modul de gândire și îl redă în mod transparent la solicitări cu mai multe viri atunci când furnizorul din amonte o solicită. Acest lucru elimină erorile HTTP 400 pe care furnizorii stricti le ridică atunci când istoricul conversațiilor unui client lipsește raționamentul rândului anterior.

## De ce există asta

Mai mulți furnizori de mod de gândire resping o viziune ulterioară, cu excepția cazului în care** mesajul anterior al asistentului include `reasoning_content` original** . În amonte returnează 400 cu mesaje precum:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Dar clienții tipici (Cursor, Cline, Roo Code, OpenAI SDK) scot `reasoning_content` din istoricul pe care îl redau. OmniRoute îl restaurează dintr-un cache pe partea serverului, astfel încât cererea pe care o vede în amonte este consecventă. Problema #1628 a introdus persistența hibridă memory/SQLite, astfel încât memoria cache să supraviețuiască repornirilor procesului.

## Arhitectură

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

Captura are loc în `open-sse/handlers/chatCore.ts` (două site-uri, la cele două site-uri de apel `cacheReasoningFromAssistantMessage` ). Reluarea are loc în `open-sse/translator/index.ts` după constrângerea schemei, dar înainte de expediere.

Virajele asistenților simple (fără apeluri de instrumente) sunt tastate diferit: `buildAssistantMessageCacheKey()` digeră domeniul sesiunii plus transcrierea normalizată în format OpenAI până la acel turn, deoarece DeepSeek necesită raționamentul _fiecărei_ ture anterioare odată ce `tools` este prezent. Pentru țintele Responses-API (de exemplu `opencode-go/deepseek-v4-flash`, direcționat către `/responses`) corpul din amonte poartă `input`, nu `messages`, așa că `translateRequest()` (`open-sse/translator/index.ts`) raportează transcrierea pivot pe care a digerat-o printr-o opțiune de apel invers, iar site-urile de captură digeră aceeași transcriere. Trecerea de reluare a răspunsurilor rulează pe pivotul OpenAI pentru fiecare format sursă, astfel încât clienții Anthropic Messages (Claude → OpenAI → Responses) sunt de asemenea reluați.

## Stocare — Hybrid Memory + SQLite

Calea fierbinte folosește un `Map` în memorie (LRU-by-creation) susținut de un tabel SQLite pentru recuperarea în caz de accident și vizibilitatea tabloului de bord.

| Strat   | Implementarea                                  | Scop                                                  |
| ------- | ---------------------------------------------- | ----------------------------------------------------- |
| Memorie | `Map` în `open-sse/services/reasoningCache.ts` | Căutări rapide, evacuează cel mai vechi la 200 de ani |
| DB      | tabel `reasoning_cache` (`src/lib/db/`)        | Persista prin reporniri, generează statistici         |

Scrierile merg la ambele. Citeste, consultă mai întâi memoria, apoi revine la DB (accesările DB sunt promovate înapoi în memorie). Eșecurile DB sunt non-fatale — cache-ul în memorie continuă să servească calea fierbinte.

**Valori implicite:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Înregistrări de memorie maximă: `200` (`MAX_MEMORY_ENTRIES`)
- Evacuarea: cel mai vechi `createdAt` primul

## Schema bazei de date

Migrație: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indici: `expires_at`, `provider`, `model`, `created_at`. `expires_at` este stocat ca secunde de epocă Unix; stratul SELECT normalizează valorile de text moștenite prin `EXPIRES_AT_EPOCH_SQL`.

## Detectarea furnizorului / modelului

Reluarea este activată când `requiresReasoningReplay(provider, model)` returnează `true`. Funcția verifică două liste în `open-sse/services/reasoningCache.ts`.

**Furnizor IDs (potrivire exactă, fără distincție între majuscule și minuscule):**

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

**Modele de expresii regex (insensibile la majuscule și minuscule):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` și `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, sufix `-free` opțional)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Adăugarea unui nou provider/model strict înseamnă adăugarea la una dintre aceste liste și scrierea unui test unitar care afirmă injecția de reluare. Descrierea PR ar trebui să citeze exact șirul 400 din amonte care a motivat schimbarea.

## REST API

Cache-ul expune două puncte finale sub `src/app/api/cache/reasoning/route.ts`. Ambele necesită autentificare de management (`isAuthenticated` din `@/shared/utils/apiAuth`).

| Metodă | Punct final                                               | Descriere                                                       |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistici + intrări paginate                                   |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listare filtrată (`limit` fixat la `[1, 200]`)                  |
| DELETE | `/api/cache/reasoning`                                    | Ștergeți totul (memorie + DB) și resetați contorizarea hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Ștergeți numai intrările pentru un singur furnizor              |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Ștergeți o singură intrare                                      |

**forma răspunsului GET :**

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

## Note operaționale

- **Curăță:** `cleanupReasoningCache()` șterge intrările de memorie expirate și rulează `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Lucrătorii de la controlul de sănătate sună la asta periodic.
- **Recuperare în caz de accident:** După o repornire, memoria este goală, dar DB păstrează în continuare intrări neexpirate. Prima căutare pentru un anumit `tool_call_id` este un hit DB ; căutările ulterioare sunt accesări de memorie.
- **Fără raționament, fără cache:** `cacheReasoningFromAssistantMessage` returnează `0` atunci când mesajul asistentului nu are câmp `reasoning_content` / `reasoning`, deci răspunsurile care nu se gândesc nu costă nimic.
- **Scrierea este și ea închisă:** ambele site-uri de apeluri din `chatCore.ts` (non-streaming și streaming) apelează numai `cacheReasoningFromAssistantMessage()` atunci când `requiresReasoningReplay(provider, model)` este `true` — același predicat verifică partea de citire. Instalările care nu ating niciodată un furnizor de reluare nu mai plătesc pentru scriere, actualizarea indexului și try/catch pentru fiecare răspuns care poartă raționament.
- **Furnizori non-stricți:** Când `requiresReasoningReplay` este `false` și formatul țintă este OpenAI, traducătorul** benzi** orice câmp `reasoning_content` din mesajele trimise — OpenAI Chat Completions nu îl acceptă.

## Proprietatea Opac-Raţionament Muze

Muse (`muse-code`) returnează raționamentul opac legat de apelant (`encrypted_content`). Redarea acestuia sub un alt cont sau acreditările rememorate nu reușește în amonte, așa că solicitările native OAuth folosesc proprietatea la nivel de sesiune în loc de rotația pe solicitare (`src/sse/services/museSessionOwnership.ts`, impusă în `src/sse/handlers/chat.ts`). Conexiunile API-cheie selectate în mod explicit și configurațiile numai cu cheia API își păstrează rutarea existentă fără acest mod de proprietate.

- Furnizați o sesiune stabilă ID la fiecare viraj: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, sau `x-codex-session-id`; alternativ, utilizați `prompt_cache_key`, `session_id`, `conversation_id` sau `metadata.session_id` în corp (în acea ordine de prioritate). IDs lipsă sau necompletat returnează 400 atunci când două sau mai multe conturi native OAuth sunt active; cu un singur cont OAuth nu există nimic spre care să se rotească, așa că o astfel de solicitare păstrează rutarea nefixată. Domeniul de aplicare include cheia API OmniRoute ID a apelantului.
- Sesiuni noi independente round-robin în conturile native active OAuth permise de politica de conectare a cheii API, ordonate în funcție de conexiune ID. Round-robin omite conturile în timpul de răcire a conexiunii, cu o stare de terminal (`banned`, `expired`, `credits_exhausted`) sau blocat de model pentru modelul solicitat; Eșecurile Muse din amonte înregistrează starea de răcire și starea întrerupătorului ca și alți furnizori. O conexiune forțată în mod explicit ocolește round-robin pentru o nouă sesiune, dar nu poate suprascrie un proprietar existent.
- Până când proprietarul oferă un răspuns de succes, o sesiune al cărei proprietar a devenit indisponibil este revendicată într-un cont sănătos. După primul răspuns de succes, sesiunea rămâne fixată de proprietarul respectiv până când este inactivă timp de 30 de zile (`MUSE_SESSION_IDLE_TTL_MS`).
- Fiecare continuare și fiecare rând de rezultat al instrumentului rămâne fixat pe proprietarul sesiunii: conexiune, identitatea contului și generarea de acreditări prin inferență, verificate din nou înainte de încercările în amonte, inclusiv încercările de reîmprospătare a acreditărilor. Răspunsurile apel referințe IDs/item și instrumentul IDs completări chat trebuie să fi fost înregistrate pentru acea sesiune și generație.
- Înregistrările SQLite `key_value` din spațiul de nume `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) persistă proprietatea și cursorul de rotație peste reporniri. Fiecare reclamație și răspuns difuzat reîmprospătează ștampila activității sesiunii; o sesiune inactivă mai lungă decât `MUSE_SESSION_IDLE_TTL_MS` este tăiată (pin proprietar, steag servit și hash opaque/reference înregistrat), cel mult o dată la 10 minute și în loturi delimitate, astfel încât o reluare ulterioară a istoriei sale eșuează închisă ca proprietar necunoscut. Înregistrările conțin IDs de conexiune și hash-uri ale identității contului, acreditări, conținut opac și referințe de continuare, nu secrete sau istoricul conversațiilor. Clienții trebuie să păstreze și să trimită istoricul lor complet și raționamentul opac.
- Raționament necunoscut sau străin opac, un proprietar dispărut, un cont de proprietar indisponibil sau o schimbare de generație cu istoric înregistrat eșuează închise cu o eroare explicită 4xx/503 — never silențioasă între conturi și raționamentul nu a fost niciodată abandonat.
- O cheie rememorată pentru același cont este adoptată numai atunci când sesiunea nu a înregistrat niciun istoric rejucat; sesiunile înregistrate continuă să eșueze închise până la început.
- Un răspuns gol în amonte (`upstream_empty_response` / `empty_response`, nimic emis către apelant) este reîncercat de cel mult două ori pe același proprietar, după 0,5 s apoi 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Dacă toate încercările sunt goale, 502 inițial este returnat fără marcare de răcire sau întrerupător, astfel încât un răspuns neclar nu îl blochează niciodată pe proprietar.
- Toate cererile `muse-code` ocolesc citirile și scrierile din memoria cache semantică, inclusiv scrierile în flux, astfel încât ieșirea opace din cache nu poate obține un proprietar de sesiune diferit.

Apărătoare de regresie: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` și `tests/unit/chatcore-semantic-cache.test.ts`.

## Vezi De asemenea

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — întreruptoare, cooldowns, model lockouts
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticare amonte 400s
- Sursa: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrație: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- traseul API : `src/app/api/cache/reasoning/route.ts`
- Emisiune originală: #1628
