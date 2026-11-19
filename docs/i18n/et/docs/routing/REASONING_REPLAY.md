# REASONING_REPLAY (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Tõe allikas:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Viimati värskendatud:** 2026-06-28 — v3.8.40

OmniRoute jäädvustab mõtlemisrežiimi mudelite toodetud assistendi `reasoning_content` ja esitab selle läbipaistvalt uuesti mitme pöörde päringu korral, kui ülesvoolu pakkuja seda nõuab. See välistab HTTP 400 vead, mida ranged pakkujad tõstatavad, kui kliendi vestluste ajaloost puudub eelneva pöörde põhjendus.

## Miks see eksisteerib

Mitmed mõtlemisrežiimi pakkujad lükkavad järeltegevuse tagasi, välja arvatud juhul, kui** eelmine abilise sõnum sisaldab algset `reasoning_content`** . Ülesvool tagastab 400 järgmiste sõnumitega:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Kuid tüüpilised kliendid (Cursor, Cline, Roo Code, OpenAI SDK) eemaldavad `reasoning_content` ajaloost, mida nad taasesitavad. OmniRoute taastab selle serveripoolsest vahemälust, nii et päring, mida ülesvoolu näeb, on järjepidev. Väljaanne #1628 tutvustas hübriidset memory/SQLite püsivust, et vahemälu säiliks protsessi taaskäivitamise korral.

## Arhitektuur

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), one entry per tool_call.id within the request scope
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(buildToolCallCacheKey(scope, toolCalls[0].id)) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Jäädvustamine toimub `open-sse/handlers/chatCore.ts` (kahes kohas, kahel `cacheReasoningFromAssistantMessage` -kõne saidil). Kordus toimub `open-sse/translator/index.ts` pärast skeemi sundimist, kuid enne saatmist.

Tööriistakõne kirjed salvestatakse `buildToolCallCacheKey()` alla, mis on päringu ulatuse kokkuvõte ja tööriista kutse ID, nii et sama ID, mida kasutab muu API -võti või seanss, ei vali kirjet. Ulatus pärineb `buildReasoningCacheScope()`: API -võtme ID ja seansivõti, kui päringul see on. Veerg `tool_call_id` ja armatuurlaud näitavad seetõttu nende kirjete kokkuvõtet.

Lihtsad (tööriistakutsumata) assistendi pöörded on sisestatud erinevalt: `buildAssistantMessageCacheKey()` seedib seansi ulatuse ja normaliseeritud OpenAI-vormingus transkripti kuni selle pöördeni, sest DeepSeek nõuab _iga_ eelneva pöörde põhjendamist, kui `tools` on olemas. Responses-API sihtmärkide puhul (nt `opencode-go/deepseek-v4-flash`, suunatakse `/responses`-sse) kannab ülesvoolu keha `input`, mitte `messages`, nii et `translateRequest()` (`open-sse/translator/index.ts`) teatab tagasihelistamise valiku kaudu seeditava pöördetranskripti ja püüdmissaidid seedivad sama ärakirja. Vastuste korduskäik töötab OpenAI -liigendil iga allikavormingu jaoks, seega esitatakse uuesti ka Anthropic Messagesi kliente (Claude → OpenAI → vastuseid).

## Salvestus — hübriidmälu + SQLite

Kuum tee kasutab krahhi taastamiseks ja armatuurlaua nähtavuse tagamiseks mälusisest `Map` (LRU-by-creation), mida toetab SQLite tabel.

| Kiht | Rakendamine                                 | Eesmärk                                            |
| ---- | ------------------------------------------- | -------------------------------------------------- |
| Mälu | `Map` `open-sse/services/reasoningCache.ts` | Kiired otsingud, vanim väljatõstmine 200-aastaselt |
| DB   | `reasoning_cache` tabel (`src/lib/db/`)     | Püsib kogu taaskäivitamise ajal, juhib statistikat |

Kirjad lähevad mõlemale. Lugemised kontrollivad esmalt mälu, seejärel langevad tagasi DB (DB -löögid viiakse tagasi mällu). DB tõrked ei ole surmavad — mälusisene vahemälu teenindab jätkuvalt kuuma teed.

**Vaikeseaded:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimaalne mälumaht: `200` (`MAX_MEMORY_ENTRIES`)
- Väljatõstmine: vanim `createdAt` kõigepealt

## Andmebaasi skeem

Ränne: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksid: `expires_at`, `provider`, `model`, `created_at`. `expires_at` salvestatakse Unixi ajastusekunditena; SELECT kiht normaliseerib pärandteksti väärtused `EXPIRES_AT_EPOCH_SQL` kaudu.

## Pakkuja/mudeli tuvastamine

Taasesitus on lubatud, kui `requiresReasoningReplay(provider, model)` tagastab `true`. Funktsioon kontrollib kahte loendit `open-sse/services/reasoningCache.ts`.

**Pakkuja IDs (täpne vaste, tõstutundlik):**

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

**Mudeli regex-mustrid (tõstutundlikud):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ja `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, valikuline `-free` järelliide)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Uue range provider/model lisamine tähendab ühele neist loenditest lisamist ja ühikutesti kirjutamist, mis kinnitab kordussüsti. PR kirjeldus peaks viitama täpselt ülesvoolu 400 stringile, mis muudatuse ajendas.

## REST API

Vahemälu paljastab `src/app/api/cache/reasoning/route.ts` all kaks lõpp-punkti. Mõlemad nõuavad halduse autentimist (`isAuthenticated` alates `@/shared/utils/apiAuth`).

| meetod | Lõpp-punkt                                                | Kirjeldus                                                    |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | Statistika + lehekülgede kaupa kirjeid                       |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtreeritud kirje (`limit` klambriga `[1, 200]`)            |
| DELETE | `/api/cache/reasoning`                                    | Tühjendage kõik (mälu + DB) ja lähtestage hit/miss loendused |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Kustutage ainult ühe teenusepakkuja kirjed                   |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Kustutage üks kirje                                          |

**GET vastuse kuju:**

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

## Operatiivsed märkused

- **Puhastamine:** `cleanupReasoningCache()` puhastab aegunud mälukirjed ja käivitab `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Tervisekontrolli töötajad helistavad sellele perioodiliselt.
- **Krahhi taastamine:** Pärast taaskäivitamist on mälu tühi, kuid DB sisaldab endiselt aegumata kirjeid. Antud `tool_call_id` esimene otsing on DB tabamus; järgnevad otsingud on mälu tabamused.
- **Ilma põhjenduseta, ilma vahemäluta:** `cacheReasoningFromAssistantMessage` tagastab `0`, kui assistendi sõnumil pole välja `reasoning_content` / `reasoning`, seega ei maksa mittemõtlevad vastused midagi.
- **Write on samuti suletud:** mõlemad `chatCore.ts` kõnesaidid (mittevoogedastus ja voogesitus) kutsuvad `cacheReasoningFromAssistantMessage()` ainult siis, kui `requiresReasoningReplay(provider, model)` on `true` — sama predikaat, mida loetakse külje kontrollimiseks. Installid, mis ei puuduta kordagi taasesituse pakkujat, ei maksa enam iga põhjendust kandva vastuse kirjutamise, indeksi värskendamise ja try/catch eest.
- **Mitteranged pakkujad:** Kui `requiresReasoningReplay` on `false` ja sihtvorming on OpenAI, siis tõlkija** ribad** väljaminevate sõnumite `reasoning_content` väljad — OpenAI Chat Completions ei aktsepteeri seda.

## Muse läbipaistmatu-arutlev omandiõigus

Muse (`muse-code`) tagastab helistajaga seotud läbipaistmatu arutluskäigu (`encrypted_content`). Selle taasesitamine teisel kontol või uuesti tehtud mandaadiga nurjub ülesvoolu, nii et OAuth omapäringud kasutavad päringupõhise pööramise asemel seansitaseme omandiõigust (`src/sse/services/museSessionOwnership.ts`, jõustatud `src/sse/handlers/chat.ts`). Selgelt valitud API-võtmega ühendused ja ainult API-võtmega konfiguratsioonid säilitavad oma olemasoleva marsruutimise ilma selle omandirežiimita.

- Pakkuge igal sammul stabiilne seanss ID : `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` või `x-codex-session-id`; alternatiivselt kasutage kehas `prompt_cache_key`, `session_id`, `conversation_id` või `metadata.session_id` (selles tähtsusjärjekorras). Puuduv või tühi IDs tagastab 400, kui kaks või enam algset OAuth kontot on aktiivsed; ühe OAuth kontoga pole midagi pöörata, nii et selline päring hoiab marsruutimist kinnitamata. Ulatus hõlmab helistaja OmniRoute API-klahvi ID.
- Värsked sõltumatud seansid aktiivsete OAuth algkontode vahel, mis on lubatud API-võtme ühenduse poliitikaga, järjestatud ühenduse ID järgi. Round-robin jätab kontod vahele ühenduse jahtumisel, terminali olekuga (`banned`, `expired`, `credits_exhausted`) või soovitud mudeli jaoks lukustatud mudeliga; Muse'i ülesvoolu tõrked salvestavad jahtumise ja katkestuste oleku nagu teised pakkujad. Selgelt sunnitud ühendus möödub uue seansi jaoks ümberringi, kuid ei saa alistada olemasolevat omanikku.
- Kuni omanik ei esita edukat vastust, nõutakse seansi eest, mille omanik on muutunud kättesaamatuks, uuesti tervele kontole. Pärast esimest edukat vastust jääb seanss selle omaniku külge kinnitatud, kuni see on 30 päeva jõude olnud (`MUSE_SESSION_IDLE_TTL_MS`).
- Iga jätk ja tööriistade tulemuste pööre jääb seansi omanikule kinnitatud: ühendus, konto identiteet ja järeldus-mandaadi genereerimine, mida kontrollitakse uuesti enne ülesvoolu katseid, sealhulgas mandaadi värskendamise katseid. Selle seansi ja generatsiooni jaoks peavad olema salvestatud vastused kõne IDs/item viitele ja vestluse lõpuleviimise tööriistakõne IDs.
- SQLite `key_value` kirjed `muse_session_ownership` nimeruumis (`src/lib/db/museSessionOwnership.ts`) säilitavad omandiõiguse ja pööramiskursori taaskäivitamisel. Iga nõue ja kättetoimetatud vastus värskendab seansi tegevustemplit; `MUSE_SESSION_IDLE_TTL_MS` st pikemat jõudeolekut seanssi kärbitakse (omaniku nööpnõel, serveeritud lipp ja salvestatud opaque/reference räsid), kõige rohkem kord iga 10 minuti järel ja piiratud partiidena, nii et selle ajaloo hilisem taasesitus nurjub, suletakse tundmatu omanikuna. Kirjed sisaldavad ühenduse IDs ja konto identiteedi, mandaatide, läbipaistmatu sisu ja jätkamise viiteid, mitte saladusi ega vestluste ajalugu. Kliendid peavad säilitama ja saatma oma täieliku ajaloo ja läbipaistmatud põhjendused.
- Tundmatu või võõras läbipaistmatu arutluskäik, puuduv omanik, kättesaamatu omanikukonto või salvestatud ajalooga põlvkonna vahetus ebaõnnestumine, mis suletakse selgesõnalise 4xx/503 — kunagi vaikiva kontoülese tõrkesiirdega ega kaotanud kunagi arutluskäiku.
- Meenutatud sama konto võti võetakse kasutusele ainult siis, kui seanss ei salvestanud kordusesitatavat ajalugu; salvestatud seansid jäävad suletuks, kuni alustatakse uuesti.
- Tühja ülesvoolu vastust (`upstream_empty_response` / `empty_response`, helistajale ei edastata midagi) proovitakse sama omaniku puhul uuesti maksimaalselt kaks korda, 0,5 s ja seejärel 1,5 s pärast (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Kui kõik katsed on tühjad, tagastatakse algne 502 ilma jahtumise või kaitselüliti märgistuseta, nii et ebaühtlane vastus ei lukusta kunagi omanikku.
- Kõik `muse-code` -päringud mööduvad semantilise vahemälu lugemisest ja kirjutamisest, sealhulgas voogesituse kirjutamisest, nii et vahemällu salvestatud läbipaistmatu väljund ei saa omandada teist seansi omanikku.

Regressioonikaitsed: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` ja `tests/unit/chatcore-semantic-cache.test.ts`.

## Vaata ka

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — kaitselülitid, jahutused, mudeli lukustused
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnoosimine ülesvoolu 400s
- Allikas: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Ränne: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API marsruut: `src/app/api/cache/reasoning/route.ts`
- Algne väljaanne: #1628
