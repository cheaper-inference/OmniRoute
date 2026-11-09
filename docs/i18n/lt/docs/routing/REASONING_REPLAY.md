# REASONING_REPLAY (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Tiesos šaltinis:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute užfiksuoja pagalbinį `reasoning_content` sukurtą mąstymo režimo modelių, ir skaidriai atkuria jį kelių posūkių užklausose, kai to reikalauja tiekėjas. Tai pašalina HTTP 400 klaidas, kurias iškelia griežti paslaugų teikėjai, kai kliento pokalbių istorijoje trūksta ankstesnio posūkio motyvų.

## Kodėl Tai Egzistuoja

Keletas mąstymo režimo paslaugų teikėjų atmeta tolesnius veiksmus, nebent** ankstesniame asistento pranešime yra originalus `reasoning_content`** . Prieš srovę grįžta 400 su tokiais pranešimais kaip:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Tačiau tipiški klientai (Cursor, Cline, Roo Code, OpenAI SDK) pašalina `reasoning_content` iš istorijos, kurią jie atkuria. OmniRoute atkuria jį iš serverio talpyklos, todėl užklausa, kurią mato prieš srovę, yra nuosekli. #1628 leidimas pristatė hibridinį memory/SQLite patvarumą, kad talpykla išliktų paleidus procesą iš naujo.

## Architektūra

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

Užfiksuojama `open-sse/handlers/chatCore.ts` (dviejose vietose, dviejose `cacheReasoningFromAssistantMessage` skambučių vietose). Pakartojimas vyksta `open-sse/translator/index.ts` po schemos prievartos, bet prieš išsiuntimą.

Paprasti (neįrankio iškvietimo) asistento posūkiai įvedami skirtingai: `buildAssistantMessageCacheKey()` apdoroja seanso apimtį ir normalizuotą OpenAI formato nuorašą iki tos eilės, nes DeepSeek reikalauja _kiekvieno_ ankstesnio posūkio argumentavimo, kai yra `tools`. Atsakymų API tikslais (pvz., `opencode-go/deepseek-v4-flash`, nukreiptas į `/responses`) prieš srovę esančiame korpuse yra `input`, o ne `messages`, todėl `translateRequest()` (`open-sse/translator/index.ts`) praneša apie sukimosi nuorašą, suskaidytą per iškvietimo parinktį, o fiksavimo svetainės suvirškina tą patį nuorašą. Atsakymų pakartojimo leidimas veikia OpenAI suvestinėje kiekviename šaltinio formate, todėl Anthropic Messages klientai (Claude → OpenAI → atsakymai) taip pat atkuriami iš naujo.

## Saugykla — hibridinė atmintis + SQLite

Karštajame kelyje naudojamas atmintyje esantis `Map` (LRU-by-creation), paremtas SQLite lentele, kad būtų atkurta avarija ir prietaisų skydelio matomumas.

| Sluoksnis | Įgyvendinimas                                 | Tikslas                                           |
| --------- | --------------------------------------------- | ------------------------------------------------- |
| Atmintis  | `Map` į `open-sse/services/reasoningCache.ts` | Greitos paieškos, iškeldinami seniausias 200 metų |
| DB        | `reasoning_cache` stalas (`src/lib/db/`)      | Išlieka iš naujo paleidus, kaupia statistiką      |

Rašai eina abiem. Skaitymai pirmiausia atsižvelgia į atmintį, tada grįžta į DB (DB hitai grąžinami į atmintį). DB gedimai nėra mirtini — atmintyje esanti talpykla ir toliau tarnauja karštam keliui.

**Numatytieji nustatymai:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimalus atminties įrašų skaičius: `200` (`MAX_MEMORY_ENTRIES`)
- Iškeldinimas: pirmas seniausias `createdAt`

## Duomenų bazės schema

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

Indeksai: `expires_at`, `provider`, `model`, `created_at`. `expires_at` saugomas kaip Unix epochos sekundės; SELECT sluoksnis normalizuoja senas teksto reikšmes per `EXPIRES_AT_EPOCH_SQL`.

## Tiekėjo / modelio aptikimas

Atkūrimas įjungtas, kai `requiresReasoningReplay(provider, model)` grąžina `true`. Funkcija patikrina du `open-sse/services/reasoningCache.ts` sąrašus.

**Teikėjas IDs (tiksli atitiktis, neskiriamos didžiosios ir mažosios raidės):**

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

**Modelio reguliariojo reiškinio šablonai (neskiriami didžiosios ir mažosios raidės):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ir `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, pasirenkama `-free` priesaga)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Pridėti naują griežtą provider/model reiškia pridėti prie vieno iš šių sąrašų ir parašyti vieneto testą, patvirtinantį pakartojimo injekciją. PR aprašyme turėtų būti nurodyta tiksli 400 eilutė, kuri paskatino pakeitimą.

## REST API

Talpykloje rodomi du galutiniai taškai pagal `src/app/api/cache/reasoning/route.ts`. Abiem reikalingas valdymo autentifikavimas (`isAuthenticated` iš `@/shared/utils/apiAuth`).

| Metodas | Galutinis taškas                                          | Aprašymas                                                                 |
| ------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| GET     | `/api/cache/reasoning`                                    | Statistika + puslapiais suskaidytus įrašus                                |
| GET     | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtruotas sąrašas (`limit` prispaustas prie `[1, 200]`)                  |
| DELETE  | `/api/cache/reasoning`                                    | Išvalykite viską (atmintis + DB) ir iš naujo nustatykite hit/miss skaičių |
| DELETE  | `/api/cache/reasoning?provider=deepseek`                  | Išvalyti tik vieno teikėjo įrašus                                         |
| DELETE  | `/api/cache/reasoning?toolCallId=call_abc`                | Ištrinti vieną įrašą                                                      |

**GET atsako forma:**

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

## Operatyvinės pastabos

- **Valymas:** `cleanupReasoningCache()` išvalo pasibaigusio galiojimo atminties įrašus ir paleidžia `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Periodiškai tai skambina sveikatos tikrintojai.
- **Avarijos atkūrimas:** Paleidus iš naujo, atmintis tuščia, bet DB vis dar turi nepasibaigusių įrašų. Pirmoji nurodyto `tool_call_id` paieška yra DB smūgis; vėlesnės paieškos yra atminties hitai.
- **Jokių samprotavimų, jokios talpyklos:** `cacheReasoningFromAssistantMessage` grąžina `0` kai asistento pranešime nėra `reasoning_content` / `reasoning` lauko, todėl nemąstantys atsakymai nieko nekainuoja.
- **Rašyti taip pat uždaryta:** abi skambučių svetainės `chatCore.ts` (ne srautinio perdavimo ir srautinio perdavimo) skambina `cacheReasoningFromAssistantMessage()` tik tada, kai `requiresReasoningReplay(provider, model)` yra `true` — tas pats predikatas, skaitymo pusės patikrinimai. Įdiegimai, kurie niekada nepaliečia atkūrimo teikėjo, nustoja mokėti už įrašymą, rodyklės atnaujinimą ir try/catch kiekviename argumentuotame atsake.
- **Negriežti teikėjai:** Kai `requiresReasoningReplay` yra `false`, o tikslinis formatas yra OpenAI, vertėjas** juostelės** bet koks `reasoning_content` laukas iš siunčiamų pranešimų — OpenAI Pokalbių užbaigimai jo nepriima.

## Muse Nepermatoma-protaujanti nuosavybė

Muse (`muse-code`) grąžina skambinančiojo nepermatomą samprotavimą (`encrypted_content`). Pakartotinai naudojant kitą paskyrą arba primintus kredencialus nepavyksta, todėl savosios OAuth užklausos naudoja seanso lygio nuosavybės teisę, o ne kaitaliojimą pagal užklausą (`src/sse/services/museSessionOwnership.ts`, vykdomas `src/sse/handlers/chat.ts`). Aiškiai parinktos API rakto jungtys ir tik API rakto konfigūracijos išlaiko esamą maršrutą be šio nuosavybės režimo.

- Pateikite stabilų seansą ID kiekviename žingsnyje: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` arba `x-codex-session-id`; Arba turinyje naudokite `prompt_cache_key`, `session_id`, `conversation_id` arba `metadata.session_id` (ta pirmumo tvarka). Trūksta arba tuščia IDs grąžina 400, kai aktyvios dvi ar daugiau savųjų OAuth paskyrų; su viena OAuth paskyra nėra į ką pasukti, todėl tokia užklausa išlaiko neprisegtą maršrutą. Apimtis apima skambinančiojo OmniRoute API raktą ID.
- Nauji nepriklausomi seansai, vykstantys aktyviose savosiose OAuth paskyrose, leidžiamose pagal API rakto ryšio politiką, sutvarkytą pagal ryšį ID. Apsaugos sistema praleidžia paskyras, kai ryšys atšaldomas, su terminalo būsena (`banned`, `expired`, `credits_exhausted`) arba modeliu užrakintas prašomam modeliui; „Muse“ prieš srovę įvykę gedimai įrašo aušinimo ir pertraukiklio būseną, kaip ir kiti teikėjai. Aiškiai priverstinis ryšys apeina naujos sesijos apeiti, bet negali nepaisyti esamo savininko.
- Kol savininkas nepateikia sėkmingo atsakymo, seansas, kurio savininkas tapo nepasiekiamas, iš naujo įtraukiamas į sveiką paskyrą. Gavus pirmąjį sėkmingą atsakymą, seansas lieka prisegtas prie to savininko tol, kol bus nenaudojamas 30 dienų (`MUSE_SESSION_IDLE_TTL_MS`).
- Kiekvienas tęsinys ir įrankio rezultato posūkis lieka prisegtas seanso savininkui: ryšys, paskyros tapatybė ir išvados kredencialų generavimas, dar kartą patikrinami prieš bandant pirmyn, įskaitant kredencialų atnaujinimo bandymus. Atsakymų skambučio IDs/item nuorodos ir pokalbių užbaigimo įrankio skambutis IDs turi būti įrašyti tam seansui ir generavimui.
- SQLite `key_value` įrašai `muse_session_ownership` vardų erdvėje (`src/lib/db/museSessionOwnership.ts`) išlaiko nuosavybės teisę ir sukimosi žymeklį paleidžiant iš naujo. Kiekviena pretenzija ir pateiktas atsakymas atnaujina seanso veiklos antspaudą; neaktyvus, ilgesnis nei `MUSE_SESSION_IDLE_TTL_MS` seansas apkarpomas (savininko PIN kodas, pateikta vėliavėlė ir įrašytos opaque/reference maišos), daugiausiai kartą per 10 minučių ir ribotomis partijomis, todėl vėlesnis jos istorijos pakartojimas nepavyksta uždaryti kaip nežinomas savininkas. Įrašuose yra ryšio IDs ir paskyros tapatybės, kredencialų, nepermatomo turinio ir tęsinių nuorodų maišos, o ne paslapčių ar pokalbių istorijos. Klientai turi išsaugoti ir atsiųsti visą savo istoriją ir neskaidrius argumentus.
- Nežinomas arba svetimas nepermatomas samprotavimas, trūkstamas savininkas, nepasiekiama savininko paskyra arba kartos pakeitimas su įrašyta istorija nesėkmingas, uždarytas su aiškiu 4xx/503 — niekada tyliu kelių paskyrų perkėlimu ir niekada neatsisakė samprotavimo.
- Primintas tos pačios paskyros raktas priimamas tik tada, kai seansas neužfiksavo pakartotinos istorijos; įrašyti seansai užsidaro, kol nepradedami iš naujo.
- Tuščias atsakymas prieš srovę (`upstream_empty_response` / `empty_response`, nieko nesiunčiama skambinančiajam) bandomas pakartotinai daugiausia du kartus su tuo pačiu savininku, po 0,5 s, tada po 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Jei visi bandymai yra tušti, originalus 502 grąžinamas be aušinimo ar pertraukiklio žymėjimo, todėl neryškus atsakymas niekada neužblokuoja savininko.
- Visos `muse-code` užklausos apeina semantinės talpyklos nuskaitymą ir rašymą, įskaitant srautinį rašymą, todėl talpykloje saugoma nepermatoma išvestis negali įgyti kito seanso savininko.

Regresijos apsaugos priemonės: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` ir `tests/unit/chatcore-semantic-cache.test.ts`.

## Taip pat žr

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — automatiniai jungikliai, atvėsimai, modelių užraktai
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnozuojant prieš srovę 400s
- Šaltinis: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracija: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API maršrutas: `src/app/api/cache/reasoning/route.ts`
- Originalus numeris: #1628
