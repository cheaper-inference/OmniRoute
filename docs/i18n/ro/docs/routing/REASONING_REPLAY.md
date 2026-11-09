# Reasoning Replay Cache (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sursa adevărului:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute capturează `reasoning_content` al asistentului, produs de modelele care folosesc modul de gândire, și îl redă în mod transparent în solicitările cu mai multe ture atunci când furnizorul din amonte îl impune. Astfel sunt eliminate erorile HTTP 400 pe care furnizorii stricți le returnează atunci când istoricul conversației unui client nu conține raționamentul din tura anterioară.

## De ce există această funcționalitate

Mai mulți furnizori care folosesc modul de gândire resping o tură ulterioară dacă **mesajul anterior al asistentului nu include valoarea `reasoning_content` originală**. Serviciul din amonte returnează o eroare 400 cu mesaje precum:

```
Parametru incorect: reasoning_content din modul de gândire trebuie retransmis către API.
```

Însă clienții obișnuiți (Cursor, Cline, Roo Code, OpenAI SDK) elimină `reasoning_content` din istoricul pe care îl retrimit. OmniRoute îl restaurează dintr-un cache de pe server, astfel încât solicitarea văzută de serviciul din amonte să fie consecventă. Problema #1628 a introdus persistența hibridă în memorie/SQLite, astfel încât conținutul cache-ului să supraviețuiască repornirilor procesului.

## Arhitectură

```
Pasul N (asistentul generează):
  → răspunsul conține reasoning_content + tool_calls
  → dacă requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      scrie (în memorie + BD), indexat după fiecare tool_call.id
  → redirecționează răspunsul către client (care poate păstra sau nu raționamentul)

Pasul N+1 (clientul trimite un mesaj ulterior):
  → translatorul detectează: requiresReasoningReplay(provider, model) === true
  → pentru fiecare mesaj al asistentului cu tool_calls și fără reasoning_content:
      lookupReasoning(toolCalls[0].id) → memorie → BD
      găsit   → msg.reasoning_content = cached; recordReplay()
      negăsit → msg.reasoning_content = "" (variantă de rezervă pentru versiunile DeepSeek mai vechi)
  → serviciul din amonte vede un istoric coerent → nicio eroare 400
```

Capturarea are loc în `open-sse/handlers/chatCore.ts` (în două locuri, la cele două apeluri `cacheReasoningFromAssistantMessage`). Reluarea are loc în `open-sse/translator/index.ts`, după conversia schemei, dar înainte de trimitere.

Răspunsurile simple ale asistentului (fără apeluri de instrumente) sunt indexate diferit: `buildAssistantMessageCacheKey()` calculează un rezumat criptografic al domeniului sesiunii împreună cu transcrierea normalizată în format OpenAI până la acel răspuns, deoarece DeepSeek necesită raționamentul pentru _fiecare_ răspuns anterior odată ce este prezent `tools`. Pentru țintele Responses API (de exemplu, `opencode-go/deepseek-v4-flash`, direcționat către `/responses`), corpul cererii din amonte conține `input`, nu `messages`, astfel încât `translateRequest()` (`open-sse/translator/index.ts`) raportează, printr-o opțiune de callback, transcrierea intermediară pentru care a calculat rezumatul criptografic, iar locurile de capturare calculează rezumatul aceleiași transcrieri. Etapa de reluare Responses rulează pe reprezentarea intermediară OpenAI pentru fiecare format sursă, astfel încât sunt reluate și cererile clienților Anthropic Messages (Claude → OpenAI → Responses).

## Stocare — memorie hibridă + SQLite

Calea critică utilizează un `Map` în memorie (LRU după momentul creării), susținut de un tabel SQLite pentru recuperarea după blocări și vizibilitatea în panoul de control.

| Strat   | Implementare                                   | Scop                                             |
| ------- | ---------------------------------------------- | ------------------------------------------------ |
| Memorie | `Map` în `open-sse/services/reasoningCache.ts` | Căutări rapide, elimină cele mai vechi la 200    |
| DB      | Tabelul `reasoning_cache` (`src/lib/db/`)      | Persistă după reporniri, furnizează statisticile |

Scrierile sunt efectuate în ambele straturi. Citirile verifică mai întâi memoria, apoi apelează la DB dacă nu găsesc rezultatul (rezultatele găsite în DB sunt promovate înapoi în memorie). Erorile DB nu sunt fatale — cache-ul din memorie continuă să deservească calea critică.

**Valori implicite:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Număr maxim de intrări în memorie: `200` (`MAX_MEMORY_ENTRIES`)
- Eliminare: mai întâi cea mai veche valoare `createdAt`

## Schema bazei de date

Migrare: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indecși: `expires_at`, `provider`, `model`, `created_at`. `expires_at` este stocat ca număr de secunde Unix epoch; stratul SELECT normalizează valorile text moștenite prin `EXPIRES_AT_EPOCH_SQL`.

## Detectarea furnizorului / modelului

Reluarea este activată atunci când `requiresReasoningReplay(provider, model)` returnează `true`. Funcția verifică două liste din `open-sse/services/reasoningCache.ts`.

**ID-uri de furnizor (potrivire exactă, fără a ține cont de majuscule și minuscule):**

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

**Expresii regulate pentru modele (fără a ține cont de majuscule și minuscule):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` și `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, cu sufixul opțional `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Adăugarea unui nou furnizor/model strict presupune adăugarea acestuia la una dintre aceste liste și scrierea unui test unitar care confirmă injectarea reluării. Descrierea PR-ului trebuie să citeze exact mesajul 400 din amonte care a motivat modificarea.

## API REST

Cache-ul expune două endpoint-uri în `src/app/api/cache/reasoning/route.ts`. Ambele necesită autentificare de administrare (`isAuthenticated` din `@/shared/utils/apiAuth`).

| Metodă | Endpoint                                                  | Descriere                                                              |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistici + intrări paginate                                          |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listare filtrată (`limit` este limitat la intervalul `[1, 200]`)       |
| DELETE | `/api/cache/reasoning`                                    | Șterge totul (memorie + BD) și resetează contoarele de reușite/eșecuri |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Șterge doar intrările pentru un singur furnizor                        |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Șterge o singură intrare                                               |

**Structura răspunsului GET:**

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

- **Curățare:** `cleanupReasoningCache()` elimină intrările expirate din memorie și execută `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Procesele de verificare a stării apelează periodic această funcție.
- **Recuperare după o oprire neașteptată:** După o repornire, memoria este goală, dar BD păstrează în continuare intrările neexpirate. Prima căutare pentru un anumit `tool_call_id` găsește rezultatul în BD; căutările ulterioare îl găsesc în memorie.
- **Fără raționament, fără cache:** `cacheReasoningFromAssistantMessage` returnează `0` atunci când mesajul asistentului nu are niciun câmp `reasoning_content` / `reasoning`, astfel încât răspunsurile fără raționament nu implică niciun cost.
- **Și scrierea este condiționată:** ambele puncte de apel din `chatCore.ts` (fără streaming și cu streaming) apelează `cacheReasoningFromAssistantMessage()` numai atunci când `requiresReasoningReplay(provider, model)` este `true` — același predicat verificat și de partea de citire. Instalările care nu utilizează niciodată un furnizor cu reluare nu mai suportă costul scrierii, al actualizării indexului și al blocului try/catch pentru fiecare răspuns care conține raționament.
- **Furnizori non-stricți:** Atunci când `requiresReasoningReplay` este `false`, iar formatul țintă este OpenAI, translatorul **elimină** orice câmp `reasoning_content` din mesajele trimise — OpenAI Chat Completions nu îl acceptă.

## Proprietatea raționamentului opac Muse

Muse (`muse-code`) returnează raționament opac legat de apelant (`encrypted_content`). Reluarea lui sub alt cont sau cu o credențială reemisă eșuează la upstream, astfel încât cererile OAuth native folosesc proprietate la nivel de sesiune în loc de rotație per cerere (`src/sse/services/museSessionOwnership.ts`, impusă în `src/sse/handlers/chat.ts`). Conexiunile cu cheie API selectate explicit și configurațiile numai cu chei API își păstrează rutarea existentă fără acest mod de proprietate.

- Furnizați un ID de sesiune stabil la fiecare tură: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` sau `x-codex-session-id`; alternativ folosiți `prompt_cache_key`, `session_id`, `conversation_id` sau `metadata.session_id` în corp (în această ordine de prioritate). ID-urile absente sau goale returnează 400 când sunt active două sau mai multe conturi OAuth native; cu un singur cont OAuth nu există alt cont pentru rotație, așa că o astfel de cerere păstrează rutarea fără fixare. Domeniul include ID-ul cheii API OmniRoute a apelantului.
- Sesiunile noi și independente sunt distribuite round-robin între conturile OAuth native active permise de politica de conexiuni a cheii API, ordonate după ID-ul conexiunii. Round-robin omite conturile în perioada de așteptare a conexiunii, cu stare terminală (`banned`, `expired`, `credits_exhausted`) sau blocate pentru modelul cerut; erorile upstream Muse înregistrează perioada de așteptare și starea circuit breaker-ului la fel ca alți furnizori. O conexiune forțată explicit ocolește round-robin pentru o sesiune nouă, dar nu poate înlocui un proprietar după ce acesta a servit un răspuns reușit.
- Până când proprietarul servește un răspuns reușit, o sesiune al cărei proprietar a devenit indisponibil este revendicată din nou pe un cont sănătos. După primul răspuns reușit, sesiunea rămâne fixată la acel proprietar până când a fost inactivă timp de 30 de zile (`MUSE_SESSION_IDLE_TTL_MS`).
- Fiecare continuare și tură cu rezultat de instrument rămâne fixată la proprietarul sesiunii: conexiune, identitatea contului și generația credențialei de inferență, reverificate înainte de încercările upstream, inclusiv reîncercările după reîmprospătarea credențialelor. ID-urile de apel/referințele de elemente Responses și ID-urile apelurilor de instrumente Chat Completions trebuie să fi fost înregistrate pentru sesiunea și generația respectivă.
- Înregistrările SQLite `key_value` din spațiul de nume `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) păstrează proprietatea și cursorul de rotație între reporniri. Fiecare revendicare și răspuns servit actualizează marca de activitate a sesiunii; o sesiune inactivă mai mult decât `MUSE_SESSION_IDLE_TTL_MS` este curățată (fixarea proprietarului, indicatorul de răspuns servit și hashurile înregistrate ale conținutului opac/referințelor), cel mult o dată la 10 minute și în loturi limitate, astfel încât o reluare ulterioară a istoricului ei este refuzată în siguranță din cauza unui proprietar necunoscut. Înregistrările conțin ID-uri de conexiune și hashuri ale identității contului, credențialelor, conținutului opac și referințelor de continuare, nu secrete sau istoricul conversației. Clienții trebuie să păstreze și să trimită istoricul complet și raționamentul opac.
- Raționamentul opac necunoscut sau străin, un proprietar absent, un cont al proprietarului indisponibil sau o schimbare de generație cu istoric înregistrat produce un refuz sigur cu 4xx/503 explicit — niciodată transfer silențios între conturi și niciodată eliminarea raționamentului.
- O cheie reemisă pentru același cont este adoptată numai când sesiunea nu a înregistrat istoric ce poate fi reluat; sesiunile cu înregistrări continuă să fie refuzate în siguranță până când sunt începute de la zero.
- Un răspuns upstream gol (`upstream_empty_response` / `empty_response`, nimic emis către apelant) este reîncercat de cel mult două ori pe același proprietar, după 0.5 s și apoi 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Dacă toate încercările sunt goale, este returnat 502 original fără marcarea perioadei de așteptare sau a circuit breaker-ului, astfel încât un răspuns instabil nu blochează niciodată proprietarul.
- Toate cererile `muse-code` ocolesc citirile și scrierile cache-ului semantic, inclusiv scrierile în streaming, astfel încât ieșirea opacă din cache nu poate dobândi un alt proprietar de sesiune.

Protecții împotriva regresiilor: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` și `tests/unit/chatcore-semantic-cache.test.ts`.

## Consultați și

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — întrerupătoare de circuit, perioade de așteptare, blocarea modelelor
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticarea erorilor 400 din amonte
- Sursă: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrare: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rută API: `src/app/api/cache/reasoning/route.ts`
- Problemă originală: #1628
