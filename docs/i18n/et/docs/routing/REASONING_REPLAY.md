# Reasoning Replay Cache (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Tõeallikas:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute salvestab mõtlemisrežiimi mudelite loodud assistendi `reasoning_content`-i ja taasesitab selle mitmevoorulistes päringutes läbipaistvalt, kui ülesvoolu teenusepakkuja seda nõuab. See kõrvaldab HTTP 400 vead, mille ranged teenusepakkujad tagastavad juhul, kui kliendi vestlusajaloost puudub eelmise vooru arutluskäik.

## Miks see olemas on

Mitu mõtlemisrežiimi teenusepakkujat lükkavad jätkuvooru tagasi, kui **eelmine assistendi sõnum ei sisalda algset `reasoning_content`-i**. Ülesvoolu teenus tagastab 400 veateate koos järgmiste sõnumitega:

```
Vale parameeter: mõtlemisrežiimis tuleb reasoning_content API-le tagasi saata.
```

Kuid tavapärased kliendid (Cursor, Cline, Roo Code, OpenAI SDK) eemaldavad `reasoning_content`-i ajaloost, mille nad uuesti saadavad. OmniRoute taastab selle serveripoolsest vahemälust, et ülesvoolu teenusele nähtav päring oleks järjepidev. Probleem #1628 lisas hübriidse mälu/SQLite'i püsimälu, et vahemälu säiliks ka pärast protsessi taaskäivitamist.

## Arhitektuur

```
Voor N (assistent genereerib):
  → vastus sisaldab reasoning_content + tool_calls
  → kui requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      kirjutab (mälu + DB), võtmena kasutatakse iga tool_call.id väärtust
  → edasta vastus kliendile (kes võib reasoning'u säilitada või mitte)

Voor N+1 (klient saadab jätkupäringu):
  → tõlkija tuvastab: requiresReasoningReplay(provider, model) === true
  → iga assistendi sõnumi puhul, millel on tool_calls, kuid puudub reasoning_content:
      lookupReasoning(toolCalls[0].id) → mälu → DB
      leidub   → msg.reasoning_content = cached; recordReplay()
      ei leidu → msg.reasoning_content = "" (pärandvaruvariant vanema DeepSeeki jaoks)
  → ülesvool näeb ühtset ajalugu → viga 400 ei teki
```

Hõivamine toimub failis `open-sse/handlers/chatCore.ts` (kahes kohas, kahe `cacheReasoningFromAssistantMessage` väljakutse juures). Taasesitus toimub failis `open-sse/translator/index.ts` pärast skeemi koertsiooni, kuid enne edastamist.

Tavaliste (ilma tööriistakutseta) assistendi voorude võtmed luuakse teisiti: `buildAssistantMessageCacheKey()` räsib seansi ulatuse koos normaliseeritud OpenAI-vormingus transkriptiga kuni vastava vooruni, sest DeepSeek nõuab pärast `tools` olemasolu _iga_ varasema vooru arutluskäiku. Responses API sihtmärkide puhul (näiteks `opencode-go/deepseek-v4-flash`, mis suunatakse marsruudile `/responses`) sisaldab ülesvoolu päringu keha välja `input`, mitte `messages`, seega edastab `translateRequest()` (`open-sse/translator/index.ts`) tagasikutse suvandi kaudu kasutatud vahetranskripti ning hõivamiskohad räsivad sama transkripti. Responsesi taasesitusetapp töötab OpenAI vahevormingu põhjal iga lähtevormingu puhul, seega taasesitatakse ka Anthropic Messagesi klientide päringud (Claude → OpenAI → Responses).

## Salvestus — hübriidne mälu + SQLite

Kiirtee kasutab mälusisest `Map`-i (loomisjärgse LRU-ga), mida toetab SQLite'i tabel krahhist taastumiseks ja juhtpaneelil nähtavuse tagamiseks.

| Kiht | Teostus                                            | Eesmärk                                              |
| ---- | -------------------------------------------------- | ---------------------------------------------------- |
| Mälu | `Map` failis `open-sse/services/reasoningCache.ts` | Kiired otsingud, eemaldab vanimad alates 200 kirjest |
| DB   | Tabel `reasoning_cache` (`src/lib/db/`)            | Säilib taaskäivituste vahel, tagab statistika        |

Kirjed kirjutatakse mõlemasse. Lugemisel kontrollitakse esmalt mälu ja seejärel DB-d (DB-st leitud kirjed tõstetakse tagasi mällu). DB tõrked ei ole fataalsed — mälusisene vahemälu jätkab kiirtee teenindamist.

**Vaikeväärtused:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksimaalne kirjete arv mälus: `200` (`MAX_MEMORY_ENTRIES`)
- Eemaldamine: kõige vanem `createdAt` esimesena

## Andmebaasi skeem

Migratsioon: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksid: `expires_at`, `provider`, `model`, `created_at`. `expires_at` salvestatakse Unixi epohhi sekunditena; SELECT-kiht normaliseerib pärandtekstiväärtused `EXPIRES_AT_EPOCH_SQL` kaudu.

## Pakkuja / mudeli tuvastamine

Taasesitus on lubatud, kui `requiresReasoningReplay(provider, model)` tagastab `true`. Funktsioon kontrollib kahte loendit failis `open-sse/services/reasoningCache.ts`.

**Pakkujate ID-d (täpne vaste, tõstutundetu):**

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

**Mudelite regulaaravaldiste mustrid (tõstutundetud):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ja `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, valikuline järelliide `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Uue range pakkuja/mudeli lisamiseks tuleb see lisada ühte neist loenditest ja kirjutada ühiktest, mis kontrollib taasesituse sisestamist. PR-i kirjelduses tuleb viidata täpsele ülesvoolu 400 veateatele, mis muudatuse ajendas.

## REST API

Vahemälu pakub faili `src/app/api/cache/reasoning/route.ts` kaudu kahte lõpp-punkti. Mõlemad nõuavad haldusautentimist (`isAuthenticated` moodulist `@/shared/utils/apiAuth`).

| Meetod | Lõpp-punkt                                                | Kirjeldus                                                                 |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistika + lehekülgedeks jaotatud kirjed                                |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtreeritud loend (`limit` piiratakse vahemikku `[1, 200]`)              |
| DELETE | `/api/cache/reasoning`                                    | Kustutab kõik (mälu + DB) ning lähtestab tabamuste/möödalaskude loendurid |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Kustutab ainult ühe pakkuja kirjed                                        |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Kustutab ühe kirje                                                        |

**GET-vastuse struktuur:**

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

## Käitusmärkused

- **Puhastamine:** `cleanupReasoningCache()` eemaldab aegunud mälukirjed ja käivitab käsu `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Tervisekontrolli tööprotsessid kutsuvad seda perioodiliselt välja.
- **Taastamine pärast krahhi:** pärast taaskäivitust on mälu tühi, kuid DB sisaldab endiselt aegumata kirjeid. Esimene otsing konkreetse `tool_call_id` järgi on DB tabamus; järgnevad otsingud on mälutabamused.
- **Põhjenduskäik puudub, vahemällu ei salvestata:** `cacheReasoningFromAssistantMessage` tagastab `0`, kui assistendi sõnumis puudub väli `reasoning_content` / `reasoning`, seega ei tekita mõtlemist mittekasutavad vastused kulu.
- **Ka kirjutamine on piiratud:** mõlemad väljakutsekohad failis `chatCore.ts` (mittevoogedastus ja voogedastus) kutsuvad funktsiooni `cacheReasoningFromAssistantMessage()` välja ainult siis, kui `requiresReasoningReplay(provider, model)` on `true` — sama predikaati kontrollib lugemispool. Installatsioonid, mis ei kasuta kunagi taasesitust nõudvat pakkujat, ei pea enam iga põhjenduskäiku sisaldava vastuse puhul kandma kirjutamise, indeksi uuendamise ega try/catch-ploki kulu.
- **Mitteranged pakkujad:** kui `requiresReasoningReplay` on `false` ja sihtvorming on OpenAI, **eemaldab** teisendaja väljaminevatest sõnumitest välja `reasoning_content` — OpenAI Chat Completions ei aktsepteeri seda.

## Muse'i läbipaistmatu arutluse omand

Muse (`muse-code`) tagastab kutsujaga seotud läbipaistmatu arutluse (`encrypted_content`). Selle taasesitus teise konto või uuesti väljastatud autentimisandmetega ebaõnnestub ülesvoolus, seega kasutavad natiivsed OAuthi päringud seansipõhist omandit päringupõhise rotatsiooni asemel (`src/sse/services/museSessionOwnership.ts`, jõustamine failis `src/sse/handlers/chat.ts`). Otseselt valitud API-võtmeühendused ja ainult API-võtmetega seadistused säilitavad olemasoleva marsruutimise ilma selle omandirežiimita.

- Anna igal voorul stabiilne seansi ID: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` või `x-codex-session-id`; alternatiivina kasuta sisus `prompt_cache_key`, `session_id`, `conversation_id` või `metadata.session_id` (selles prioriteedijärjekorras). Puuduvad või tühjad ID-d annavad 400, kui aktiivne on vähemalt kaks natiivset OAuthi kontot; ühe OAuthi konto korral pole teist kontot, millele roteerida, seega säilitab selline päring kinnitamata marsruutimise. Ulatus sisaldab kutsuja OmniRoute'i API-võtme ID-d.
- Uued sõltumatud seansid jaotatakse järgemööda aktiivsete natiivsete OAuthi kontode vahel, mida API-võtme ühenduspoliitika lubab, ühenduse ID järjekorras. Jaotus jätab vahele ühenduse ooteajaga, lõppolekus (`banned`, `expired`, `credits_exhausted`) või taotletud mudeli suhtes lukustatud kontod; Muse'i ülesvoolutõrked salvestavad ooteaja ja kaitselüliti oleku nagu teistel pakkujatel. Otseselt sunnitud ühendus möödub uue seansi järgemööda jaotusest, kuid ei saa omanikku asendada pärast seda, kui omanik on edastanud eduka vastuse.
- Kuni omanik pole edukat vastust edastanud, hõivatakse kättesaamatuks muutunud omanikuga seanss uuesti tervele kontole. Pärast esimest edukat vastust jääb seanss sellele omanikule kinnitatuks, kuni see on olnud jõude 30 päeva (`MUSE_SESSION_IDLE_TTL_MS`).
- Iga jätku- ja tööriistatulemuse voor jääb seansi omanikule kinnitatuks: ühendus, kontoidentiteet ja inferentsi autentimisandmete põlvkond kontrollitakse uuesti enne ülesvoolukatseid, ka pärast autentimisandmete värskendamist tehtavaid korduskatseid. Responses'i kutse-ID-d/üksuseviited ja Chat Completionsi tööriistakutse-ID-d peavad olema selle seansi ja põlvkonna jaoks salvestatud.
- SQLite'i `key_value` kirjed nimeruumis `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) säilitavad omandi ja rotatsioonikursori taaskäivituste vahel. Iga hõivamine ja edastatud vastus värskendab seansi aktiivsusajatemplit; kauem kui `MUSE_SESSION_IDLE_TTL_MS` jõude olnud seanss puhastatakse (omanikukinnitus, vastuse edastamise lipp ja salvestatud läbipaistmatu sisu/viidete räsid), kõige rohkem kord 10 minuti jooksul piiratud suurusega partiidena, nii et selle ajaloo hilisem taasesitus keeldub turvaliselt tundmatu omaniku tõttu. Kirjed sisaldavad ühenduse ID-sid ning kontoidentiteedi, autentimisandmete, läbipaistmatu sisu ja jätkuviidete räsisid, mitte saladusi ega vestlusajalugu. Kliendid peavad säilitama ja saatma kogu oma ajaloo ning läbipaistmatu arutluse.
- Tundmatu või võõras läbipaistmatu arutlus, puuduv omanik, kättesaamatu omaniku konto või salvestatud ajalooga põlvkonnavahetus keeldub turvaliselt selge 4xx/503 veaga — mitte kunagi vaikne varulülitus teisele kontole ega arutluse kõrvalejätmine.
- Sama konto uuesti väljastatud võti võetakse kasutusele ainult siis, kui seanss ei salvestanud taasesitatavat ajalugu; salvestatud ajalooga seansid keelduvad turvaliselt kuni värske alustamiseni.
- Tühja ülesvooluvastust (`upstream_empty_response` / `empty_response`, kutsujale pole midagi väljastatud) proovitakse sama omanikuga uuesti kõige rohkem kaks korda, pärast 0.5 s ja seejärel 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Kui kõik katsed on tühjad, tagastatakse algne 502 ooteaega või kaitselülitit märkimata, seega ei lukusta ebastabiilne vastus kunagi omanikku.
- Kõik `muse-code` päringud mööduvad semantilise vahemälu lugemistest ja kirjutustest, ka voogkirjutustest, et vahemällu salvestatud läbipaistmatu väljund ei saaks teist seansiomanikku.

Regressioonikaitsed: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` ja `tests/unit/chatcore-semantic-cache.test.ts`.

## Vaata ka

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — kaitselülitid, ooteajad, mudelite lukustused
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ülesvoolu 400-vigade diagnoosimine
- Lähtekood: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migratsioon: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API marsruut: `src/app/api/cache/reasoning/route.ts`
- Algne probleem: #1628
