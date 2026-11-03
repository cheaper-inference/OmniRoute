# REASONING_REPLAY (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Patiesības avots:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Pēdējo reizi atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute tver asistentu `reasoning_content`, ko ražo domāšanas režīma modeļi, un pārskatāmi atskaņo to pēc vairāku apgriezienu pieprasījumiem, kad to pieprasa augšējais pakalpojumu sniedzējs. Tādējādi tiek novērstas HTTP 400 kļūdas, ko stingrie pakalpojumu sniedzēji rada, ja klienta sarunu vēsturē trūkst iepriekšējās kārtas argumentācijas.

## Kāpēc Tas pastāv

Vairāki domāšanas režīma nodrošinātāji noraida turpmāko darbību, ja vien** iepriekšējā asistenta ziņojumā ir iekļauts oriģinālais `reasoning_content`** . Augšējā plūsma atgriež 400 ar tādiem ziņojumiem kā:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Bet tipiski klienti (Cursor, Cline, Roo Code, OpenAI SDK) izņem `reasoning_content` no vēstures, ko viņi atkārto. OmniRoute atjauno to no servera puses kešatmiņas, lai pieprasījums, ko redz augšup, būtu konsekvents. 1628. izdevums ieviesa hibrīda memory/SQLite noturību, lai kešatmiņa izturētu procesa restartēšanu.

## Arhitektūra

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

Uztveršana notiek `open-sse/handlers/chatCore.ts` (divās vietās, divās `cacheReasoningFromAssistantMessage` zvanu vietās). Atkārtošana notiek `open-sse/translator/index.ts` pēc shēmas piespiešanas, bet pirms nosūtīšanas.

Vienkāršā (neizsaukšanas) palīga pagriezieni tiek ievadīti atšķirīgi: `buildAssistantMessageCacheKey()` apkopo sesijas tvērumu, kā arī normalizēto OpenAI formāta transkriptu līdz šim gājienam, jo DeepSeek ir nepieciešams argumentēt _katru_ iepriekšējo pagriezienu, tiklīdz ir `tools`. Responses-API mērķiem (piemēram, `opencode-go/deepseek-v4-flash`, kas novirzīts uz `/responses`) augšējais pamatteksts satur `input`, nevis `messages`, tāpēc `translateRequest()` (`open-sse/translator/index.ts`) ziņo par rakursa transkriptu, kas ir sagremots, izmantojot atzvanīšanas opciju, un tveršanas vietas sagremo šo pašu transkriptu. Atbilžu atkārtošanas caurlaide tiek atskaņota OpenAI rakursā katram avota formātam, tāpēc tiek atskaņoti arī Anthropic Messages klienti (Claude → OpenAI → atbildes).

## Krātuve — hibrīda atmiņa + SQLite

Karstajā ceļā tiek izmantots atmiņā esošais `Map` (LRU-by-creation), ko nodrošina SQLite tabula avāriju atkopšanai un informācijas paneļa redzamībai.

| Slānis | Īstenošana                                  | Mērķis                                                |
| ------ | ------------------------------------------- | ----------------------------------------------------- |
| Atmiņa | `Map` `open-sse/services/reasoningCache.ts` | Ātra meklēšana, izlikšana vecākais 200                |
| DB     | `reasoning_cache` galds (`src/lib/db/`)     | Paliek visā restartēšanas laikā, nodrošina statistiku |

Raksti iet uz abiem. Lasījumi vispirms tiek izmantoti atmiņā, pēc tam atgriežas pie DB (DB trāpījumi tiek pārvietoti atpakaļ atmiņā). DB kļūmes nav letālas — atmiņā esošā kešatmiņa turpina kalpot karstajam ceļam.

**Noklusējumi:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimālais atmiņas ieraksts: `200` (`MAX_MEMORY_ENTRIES`)
- Izlikšana: vecākā `createdAt` vispirms

## Datu bāzes shēma

Migrācija: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` tiek saglabāts kā Unix laikmeta sekundes; SELECT slānis normalizē mantotās teksta vērtības, izmantojot `EXPIRES_AT_EPOCH_SQL`.

## Pakalpojumu sniedzēja/modeļa noteikšana

Atkārtošana ir iespējota, kad `requiresReasoningReplay(provider, model)` atgriež `true`. Funkcija pārbauda divus sarakstus `open-sse/services/reasoningCache.ts`.

**Nodrošinātājs IDs (precīza atbilstība, reģistrjutīgs):**

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

**Modelējiet regulārās izteiksmes modeļus (neatkarīgi no reģistriem):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` un `/deepseek[-/]?v4[-.]pro/i` (V4 Flash/Pro, pēc izvēles `-free` sufikss)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Jauna stingra provider/model pievienošana nozīmē pievienošanu vienam no šiem sarakstiem un vienības pārbaudes rakstīšanu, kas apliecina atkārtojuma injekciju. PR aprakstā jānorāda precīza 400 virkne, kas motivēja izmaiņas.

## REST API

Kešatmiņa parāda divus galapunktus zem `src/app/api/cache/reasoning/route.ts`. Abiem nepieciešama pārvaldības autentifikācija (`isAuthenticated` no `@/shared/utils/apiAuth`).

| Metode | Galapunkts                                                | Apraksts                                                   |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + paginated ierakstus                           |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrēts saraksts (`limit` saspiests ar `[1, 200]`)        |
| DELETE | `/api/cache/reasoning`                                    | Notīriet visu (atmiņa + DB) un atiestatiet hit/miss skaitu |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Notīrīt tikai viena pakalpojumu sniedzēja ierakstus        |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Dzēst vienu ierakstu                                       |

**GET atbildes forma:**

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

## Darbības piezīmes

- **Tīrīšana:** `cleanupReasoningCache()` iztīra atmiņas ierakstus, kuriem beidzies derīguma termiņš, un palaiž `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Veselības pārbaudes darbinieki periodiski piezvana.
- **Avārijas atkopšana:** Pēc restartēšanas atmiņa ir tukša, bet DB joprojām glabā ierakstus, kuriem nav beidzies derīguma termiņš. Pirmā konkrētā `tool_call_id` meklēšana ir DB trāpījums; turpmākie meklējumi ir trāpījumi atmiņā.
- **Bez argumentācijas, bez kešatmiņas:** `cacheReasoningFromAssistantMessage` atgriež `0` ja asistenta ziņojumā nav `reasoning_content` / `reasoning` lauka, tāpēc nedomājošas atbildes nemaksā neko.
- **Write ir arī ierobežots:** abas `chatCore.ts` zvanu vietnes (nestraumēšana un straumēšana) izsauc `cacheReasoningFromAssistantMessage()` tikai tad, ja `requiresReasoningReplay(provider, model)` ir `true` — tas pats predikāts lasīšanas sānu pārbaudēm. Instalācijas, kas nekad nepieskaras atkārtošanas nodrošinātājam, pārstāj maksāt par rakstīšanu, indeksa atjaunināšanu un try/catch par katru argumentāciju nesošo atbildi.
- **Nestingri pakalpojumu sniedzēji:** Ja `requiresReasoningReplay` ir `false` un mērķa formāts ir OpenAI, tulkotājs** sloksnes** jebkurš `reasoning_content` lauks no izejošajiem ziņojumiem — OpenAI Chat Completions to nepieņem.

## Muse nepārredzami saprātīgi īpašumtiesības

Muse (`muse-code`) atgriež zvanītāja necaurredzamu argumentāciju (`encrypted_content`). Atkārtoti atskaņojot to, izmantojot citu kontu vai atgādinot akreditācijas datus, iepriekš neizdodas, tāpēc vietējie OAuth pieprasījumi izmanto sesijas līmeņa īpašumtiesības, nevis katra pieprasījuma rotāciju (`src/sse/services/museSessionOwnership.ts`, ieviests `src/sse/handlers/chat.ts`). Īpaši atlasītie API atslēgas savienojumi un tikai API atslēgas konfigurācijas saglabā esošo maršrutēšanu bez šī īpašumtiesību režīma.

- Nodrošiniet stabilu sesiju ID katrā solī: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` vai `x-codex-session-id`; alternatīvi izmantojiet `prompt_cache_key`, `session_id`, `conversation_id` vai `metadata.session_id` pamattekstā (šajā prioritātes secībā). Trūkst vai tukšs IDs atgriež 400, ja ir aktīvi divi vai vairāki vietējie OAuth konti; ar vienu OAuth kontu nav ko pagriezt, tāpēc šāds pieprasījums saglabā atspraustu maršrutēšanu. Darbības joma ietver zvanītāja OmniRoute API taustiņu ID.
- Jaunas neatkarīgas sesijas, kas tiek veiktas aktīvos vietējos OAuth kontos, ko atļauj API atslēgas savienojuma politika, sakārtotas pēc savienojuma ID. Apkārtējā sistēma izlaiž kontus savienojuma atdzišanas laikā ar termināļa statusu (`banned`, `expired`, `credits_exhausted`) vai modelim bloķētu pieprasītajam modelim; Muse iepriekšējās kļūmes reģistrē dzesēšanas un pārtraukuma stāvokli tāpat kā citi pakalpojumu sniedzēji. Skaidri piespiedu savienojums apiet jaunu sesiju, bet nevar ignorēt esošo īpašnieku.
- Kamēr īpašnieks nesniedz veiksmīgu atbildi, sesija, kuras īpašnieks ir kļuvis nepieejams, tiek atkārtoti pieprasīta veselīgā kontā. Pēc pirmās veiksmīgās atbildes sesija paliek piesprausta šim īpašniekam, līdz tā ir dīkstāvē 30 dienas (`MUSE_SESSION_IDLE_TTL_MS`).
- Katrs turpinājums un rīka rezultāta pagrieziens paliek piesprausts sesijas īpašniekam: savienojums, konta identitāte un secinājumu akreditācijas datu ģenerēšana, kas tiek pārbaudīta vēlreiz pirms augšupējiem mēģinājumiem, tostarp akreditācijas datu atsvaidzināšanas mēģinājumiem. Atbilžu izsaukuma IDs/item atsauces un tērzēšanas pabeigšanas rīka izsaukuma IDs ir jābūt reģistrētām šai sesijai un paaudzei.
- SQLite `key_value` ieraksti `muse_session_ownership` nosaukumvietā (`src/lib/db/museSessionOwnership.ts`) saglabā īpašumtiesības un rotācijas kursoru pāri restartēšanas reizēm. Katra pretenzija un sniegtā atbilde atsvaidzina sesijas aktivitātes zīmogu; dīkstāves sesija, kas ir ilgāka par `MUSE_SESSION_IDLE_TTL_MS` tiek apgriezta (īpašnieka spraudīte, norādītais karodziņš un ierakstītās opaque/reference jaucējvērtības), ne vairāk kā reizi 10 minūtēs un ierobežotās partijās, tāpēc vēlāka tās vēstures atkārtošana neizdodas aizvērt kā nezināms īpašnieks. Ieraksti satur savienojuma IDs un konta identitātes, akreditācijas datu, necaurredzama satura un turpinājumu atsauces, nevis noslēpumus vai sarunu vēsturi. Klientiem ir jāsaglabā un jānosūta visa sava vēsture un nepārskatāmie argumenti.
- Nezināms vai svešs necaurredzams pamatojums, pazudis īpašnieks, nepieejams īpašnieka konts vai paaudzes maiņa ar reģistrētu vēsturi, kas ir slēgta ar skaidru 4xx/503 — nekad klusu starpkontu kļūmjpārlēci un nekad nav atmeta argumentācija. (#1628)
- Atgādināta tā paša konta atslēga tiek pieņemta tikai tad, ja sesijā nav reģistrēta atkārtojama vēsture; ierakstītās sesijas tiek aizvērtas, līdz tiek sāktas no jauna.
- Tukša augšupejoša atbilde (`upstream_empty_response` / `empty_response`, zvanītājam nekas netiek nosūtīts) vienam un tam pašam īpašniekam tiek mēģināts atkārtoti ne vairāk kā divas reizes, pēc 0,5 s, pēc tam pēc 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Ja visi mēģinājumi ir tukši, oriģinālais 502 tiek atgriezts bez dzesēšanas vai slēdža marķējuma, tāpēc neskaidra atbilde nekad nebloķē īpašnieku.
- Visi `muse-code` pieprasījumi apiet semantiskās kešatmiņas lasīšanu un rakstīšanu, tostarp straumēšanas rakstīšanu, tāpēc kešatmiņā saglabātā necaurspīdīgā izvade nevar iegūt citu sesijas īpašnieku.

Regresijas aizsargi: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` un `tests/unit/chatcore-semantic-cache.test.ts`.

## Skatīt arī

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — automātiskie slēdži, dzesēšanas sistēmas, modeļu bloķēšana
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticing upstream 400s
- Avots: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrācija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API maršruts: `src/app/api/cache/reasoning/route.ts`
- Sākotnējais izdevums: #1628
