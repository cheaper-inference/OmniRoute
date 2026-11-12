# Reasoning Replay Cache (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Izvor istine:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute bilježi `reasoning_content` asistenta koji generišu modeli s načinom razmišljanja i transparentno ga ponovo koristi u zahtjevima s više poteza kada to zahtijeva nadređeni pružalac usluge. Time se uklanjaju HTTP 400 greške koje strogi pružaoci usluga prijavljuju kada u historiji razgovora klijenta nedostaje obrazloženje iz prethodnog poteza.

## Zašto ovo postoji

Nekoliko pružalaca usluga s načinom razmišljanja odbija naredni potez osim ako **prethodna poruka asistenta sadrži izvorni `reasoning_content`**. Nadređeni servis vraća 400 s porukama poput:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Međutim, uobičajeni klijenti (Cursor, Cline, Roo Code, OpenAI SDK) uklanjaju `reasoning_content` iz historije koju ponovo šalju. OmniRoute ga vraća iz predmemorije na strani servera kako bi zahtjev koji nadređeni servis vidi bio dosljedan. Problem #1628 uveo je hibridnu postojanost u memoriji/SQLite-u kako bi predmemorija preživjela ponovna pokretanja procesa.

## Arhitektura

```
Potez N (asistent generiše):
  → odgovor sadrži reasoning_content + tool_calls
  → ako requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      upisuje (memorija + baza podataka), koristeći svaki tool_call.id kao ključ
  → prosljeđuje odgovor klijentu (koji može, ali ne mora zadržati obrazloženje)

Potez N+1 (klijent šalje naredni zahtjev):
  → prevodilac otkriva: requiresReasoningReplay(provider, model) === true
  → za svaku poruku asistenta s tool_calls i bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → memorija → baza podataka
      pronađeno    → msg.reasoning_content = cached; recordReplay()
      nije pronađeno → msg.reasoning_content = "" (naslijeđena rezervna opcija za stariji DeepSeek)
  → nadređeni servis vidi dosljednu historiju → nema greške 400
```

Bilježenje se odvija u `open-sse/handlers/chatCore.ts` (na dva mjesta, na dvije lokacije poziva `cacheReasoningFromAssistantMessage`). Ponovna upotreba odvija se u `open-sse/translator/index.ts` nakon usklađivanja sa shemom, ali prije slanja.

Obični potezi asistenta (bez poziva alata) koriste drugačije ključeve: `buildAssistantMessageCacheKey()` sažima opseg sesije zajedno s normaliziranim transkriptom u OpenAI formatu do tog poteza, jer DeepSeek zahtijeva obrazloženje _svakog_ prethodnog poteza čim je prisutan `tools`. Za odredišta Responses API-ja (naprimjer `opencode-go/deepseek-v4-flash`, usmjeren na `/responses`) tijelo nadređenog zahtjeva sadrži `input`, a ne `messages`, pa `translateRequest()` (`open-sse/translator/index.ts`) putem opcije povratnog poziva prijavljuje pivotni transkript koji je sažeo, a mjesta bilježenja sažimaju taj isti transkript. Prolaz ponovne upotrebe za Responses izvršava se nad OpenAI pivotom za svaki izvorni format, pa se ona primjenjuje i na klijente Anthropic Messages (Claude → OpenAI → Responses).

## Pohrana — hibridna memorija + SQLite

Kritična putanja koristi `Map` u memoriji (LRU prema vremenu kreiranja), podržan SQLite tabelom radi oporavka nakon pada i vidljivosti na nadzornoj ploči.

| Sloj     | Implementacija                                | Namjena                                                           |
| -------- | --------------------------------------------- | ----------------------------------------------------------------- |
| Memorija | `Map` u `open-sse/services/reasoningCache.ts` | Brze pretrage, uklanja najstarije nakon 200 unosa                 |
| BP       | tabela `reasoning_cache` (`src/lib/db/`)      | Zadržava podatke nakon ponovnih pokretanja i omogućava statistiku |

Upisi se vrše u oba sloja. Čitanja prvo provjeravaju memoriju, a zatim bazu podataka (pogoci u bazi podataka ponovo se učitavaju u memoriju). Greške baze podataka nisu fatalne — predmemorija u memoriji nastavlja opsluživati kritičnu putanju.

**Zadane vrijednosti:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimalan broj unosa u memoriji: `200` (`MAX_MEMORY_ENTRIES`)
- Uklanjanje: prvo najstariji `createdAt`

## Shema baze podataka

Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksi: `expires_at`, `provider`, `model`, `created_at`. `expires_at` se pohranjuje kao broj sekundi Unix epohe; SELECT sloj normalizira naslijeđene tekstualne vrijednosti putem `EXPIRES_AT_EPOCH_SQL`.

## Otkrivanje pružaoca / modela

Ponovno reproduciranje je omogućeno kada `requiresReasoningReplay(provider, model)` vrati `true`. Funkcija provjerava dvije liste u `open-sse/services/reasoningCache.ts`.

**ID-ovi pružalaca (tačno podudaranje, bez razlikovanja velikih i malih slova):**

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

**Regex obrasci modela (bez razlikovanja velikih i malih slova):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` i `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcionalni sufiks `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodavanje novog strogog pružaoca/modela podrazumijeva dodavanje u jednu od ovih lista i pisanje jediničnog testa koji potvrđuje ubacivanje ponovne reprodukcije. Opis PR-a treba navesti tačan uzvodni tekst greške 400 koji je motivirao promjenu.

## REST API

Keš izlaže dvije krajnje tačke u `src/app/api/cache/reasoning/route.ts`. Obje zahtijevaju upravljačku autentifikaciju (`isAuthenticated` iz `@/shared/utils/apiAuth`).

| Metoda | Krajnja tačka                                             | Opis                                                                     |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Statistika + straničeni unosi                                            |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrirani prikaz (`limit` ograničen na raspon `[1, 200]`)               |
| DELETE | `/api/cache/reasoning`                                    | Briše sve (memoriju + bazu podataka) i resetuje brojače pogodaka/promaja |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Briše samo unose za jednog pružaoca                                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Briše jedan unos                                                         |

**Struktura GET odgovora:**

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

## Operativne napomene

- **Čišćenje:** `cleanupReasoningCache()` uklanja istekle unose iz memorije i izvršava `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Procesi za provjeru stanja periodično pozivaju ovu funkciju.
- **Oporavak nakon pada:** Nakon ponovnog pokretanja memorija je prazna, ali baza podataka i dalje sadrži unose koji nisu istekli. Prvo traženje za dati `tool_call_id` pristupa bazi podataka; naredna traženja pristupaju memoriji.
- **Bez rezonovanja nema ni keširanja:** `cacheReasoningFromAssistantMessage` vraća `0` kada poruka asistenta nema polje `reasoning_content` / `reasoning`, tako da odgovori bez rezonovanja ne troše resurse.
- **I upis je uslovljen:** obje lokacije poziva u `chatCore.ts` (bez streaminga i sa streamingom) pozivaju `cacheReasoningFromAssistantMessage()` samo kada je `requiresReasoningReplay(provider, model)` jednako `true` — isti predikat koji provjerava strana za čitanje. Instalacije koje nikada ne koriste pružaoca s ponovnom reprodukcijom više ne snose trošak upisa, ažuriranja indeksa i try/catch bloka za svaki odgovor koji sadrži rezonovanje.
- **Pružaoci bez strogih zahtjeva:** Kada je `requiresReasoningReplay` jednako `false`, a ciljni format je OpenAI, prevodilac **uklanja** svako polje `reasoning_content` iz odlaznih poruka — OpenAI Chat Completions ga ne prihvata.

## Vlasništvo nad neprozirnim zaključivanjem Muse

Muse (`muse-code`) vraća neprozirno zaključivanje vezano uz pozivatelja (`encrypted_content`). Njegovo ponovno slanje pod drugim računom ili ponovno izdanim vjerodajnicama ne uspijeva na upstreamu, pa izvorni zahtjevi OAuth koriste vlasništvo na razini sesije umjesto rotacije pri svakom zahtjevu (`src/sse/services/museSessionOwnership.ts`, provodi se u `src/sse/handlers/chat.ts`). Izričito odabrane veze s API ključem i konfiguracije samo s API ključevima zadržavaju postojeće usmjeravanje bez ovog načina vlasništva.

- Dostavite stabilan ID sesije pri svakom potezu: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ili `x-codex-session-id`; alternativno u tijelu koristite `prompt_cache_key`, `session_id`, `conversation_id` ili `metadata.session_id` (tim redoslijedom prvenstva). Nedostajući ili prazni ID-jevi vraćaju 400 kada su aktivna dva ili više izvornih računa OAuth; uz jedan račun OAuth nema drugog računa za rotaciju, pa takav zahtjev zadržava usmjeravanje bez prikvačivanja. Opseg uključuje ID pozivateljeva API ključa OmniRoute.
- Nove nezavisne sesije kružno se raspoređuju po aktivnim izvornim računima OAuth dopuštenima pravilima povezivanja API ključa, poredanima prema ID-ju veze. Kružni odabir preskače račune u razdoblju čekanja veze, s terminalnim statusom (`banned`, `expired`, `credits_exhausted`) ili s blokadom traženog modela; neuspjesi Muse upstreama bilježe razdoblje čekanja i stanje zaštitnog prekidača kao kod ostalih pružatelja. Izričito nametnuta veza zaobilazi kružni odabir za novu sesiju, ali ne može nadjačati vlasnika nakon što je poslužio uspješan odgovor.
- Dok vlasnik ne posluži uspješan odgovor, sesija čiji je vlasnik postao nedostupan ponovno se dodjeljuje zdravom računu. Nakon prvog uspješnog odgovora sesija ostaje prikvačena uz tog vlasnika dok ne bude neaktivna 30 dana (`MUSE_SESSION_IDLE_TTL_MS`).
- Svaki nastavak i potez s rezultatom alata ostaje prikvačen uz vlasnika sesije: vezu, identitet računa i generaciju vjerodajnica za inferenciju, koji se ponovno provjeravaju prije pokušaja prema upstreamu, uključujući ponovne pokušaje nakon osvježavanja vjerodajnica. ID-jevi poziva i reference stavki Responses te ID-jevi poziva alata Chat Completions moraju biti zabilježeni za tu sesiju i generaciju.
- Zapisi SQLite `key_value` u prostoru imena `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) čuvaju vlasništvo i pokazivač rotacije kroz ponovna pokretanja. Svako preuzimanje i poslužen odgovor osvježava vremensku oznaku aktivnosti sesije; sesija neaktivna dulje od `MUSE_SESSION_IDLE_TTL_MS` čisti se (prikvačivanje vlasnika, oznaka posluženog odgovora i zabilježeni sažeci neprozirnog sadržaja/referenci), najviše jednom svakih 10 minuta i u ograničenim serijama, pa se kasnije ponovno slanje povijesti sigurno odbija kao nepoznat vlasnik. Zapisi sadrže ID-jeve veza i sažetke identiteta računa, vjerodajnica, neprozirnog sadržaja i referenci nastavka, a ne tajne ili povijest razgovora. Klijenti moraju zadržati i slati punu povijest i neprozirno zaključivanje.
- Nepoznato ili tuđe neprozirno zaključivanje, nepostojeći vlasnik, nedostupan račun vlasnika ili promjena generacije uz zabilježenu povijest sigurno se odbijaju uz izričit 4xx/503 — nikad nema tihog prelaska na drugi račun ni odbacivanja zaključivanja.
- Ponovno izdani ključ istog računa preuzima se samo kada sesija nema zabilježenu povijest koja se može ponovno slati; zabilježene sesije nastavljaju se sigurno odbijati dok se ne započnu iznova.
- Prazan odgovor upstreama (`upstream_empty_response` / `empty_response`, ništa nije poslano pozivatelju) ponavlja se najviše dvaput kod istog vlasnika, nakon 0.5 s pa 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Ako su svi pokušaji prazni, vraća se izvorni 502 bez označavanja razdoblja čekanja ili zaštitnog prekidača, pa nestabilan odgovor nikad ne blokira vlasnika.
- Svi zahtjevi `muse-code` zaobilaze čitanja i upise semantičke predmemorije, uključujući upise pri strujanju, kako predmemorirani neprozirni izlaz ne bi mogao dobiti drugog vlasnika sesije.

Regresijske zaštite: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` i `tests/unit/chatcore-semantic-cache.test.ts`.

## Pogledajte također

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — prekidači strujnog kola, periodi hlađenja, zaključavanja modela
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — dijagnosticiranje uzvodnih grešaka 400
- Izvor: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ruta: `src/app/api/cache/reasoning/route.ts`
- Izvorni problem: #1628
