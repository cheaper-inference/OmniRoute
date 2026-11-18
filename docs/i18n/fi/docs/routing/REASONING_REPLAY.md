# REASONING_REPLAY (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Totuuden lähde:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Viimeksi päivitetty:** 28.6.2026 — v3.8.40

OmniRoute kaappaa ajattelutilan mallien tuottaman avustajan `reasoning_content` ja toistaa sen läpinäkyvästi usean kierroksen pyynnöissä, kun ylävirran toimittaja sitä vaatii. Tämä eliminoi HTTP 400 -virheet, joita tiukat palveluntarjoajat nostavat esiin, kun asiakkaan keskusteluhistoriasta puuttuu edellisen vuoron perustelut.

## Miksi tämä on olemassa

Useat ajattelutavan tarjoajat hylkäävät seurantakäännöksen, ellei** edellinen avustajaviesti sisältää alkuperäisen `reasoning_content`** . Ylävirta palauttaa 400 viesteillä, kuten:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Mutta tyypilliset asiakkaat (Cursor, Cline, Roo Code , OpenAI SDK) poistavat `reasoning_content` historiasta, jonka he toistavat. OmniRoute palauttaa sen palvelinpuolen välimuistista, joten ylävirran näkemä pyyntö on johdonmukainen. Numero #1628 esitteli hybridi- memory/SQLite -pysyvyyden, jotta välimuisti kestää prosessin uudelleenkäynnistyksen.

## Arkkitehtuuri

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

Sieppaus tapahtuu `open-sse/handlers/chatCore.ts` (kahdessa paikassa, kahdessa `cacheReasoningFromAssistantMessage` -puhelupaikassa). Toisto tapahtuu `open-sse/translator/index.ts` ssä skeeman pakottamisen jälkeen, mutta ennen lähettämistä.

Työkalukutsun merkinnät tallennetaan kohtaan `buildToolCallCacheKey()`, pyynnön laajuuden tiivistelmä ja työkalukutsutunnus, joten toisen API -avaimen tai istunnon käyttämä sama id ei valitse merkintää. Laajuus tulee `buildReasoningCacheScope()`:stä: API -avaimen tunnus sekä istuntoavain, kun pyynnöllä on sellainen. Siksi `tool_call_id` sarake ja kojelauta näyttävät tämän tiivistelmän kyseisistä merkinnöistä.

Pelkät (ei-työkalukutsut) avustajan käännökset on näppäilty eri tavalla: `buildAssistantMessageCacheKey()` sulattaa istunnon laajuuden ja normalisoidun OpenAI-muotoisen transkription siihen vuoroon asti, koska DeepSeek vaatii _jokaisen_ edellisen käännöksen perustelut, kun `tools` on läsnä. Responses-API-kohteissa (esimerkiksi `opencode-go/deepseek-v4-flash`, reititetty `/responses`) ylävirran runko sisältää `input`, ei `messages`, joten `translateRequest()` (`open-sse/translator/index.ts`) raportoi pivot-transkription, joka on sulatettu takaisinsoittovaihtoehdon kautta, ja sieppauspaikat sulattavat saman transkriptin. Responses Replay Pass toimii OpenAI pivotissa jokaisessa lähdemuodossa, joten myös Anthropic Messages -asiakkaat (Claude → OpenAI → Responses) toistetaan uudelleen.

## Tallennustila — Hybridimuisti + SQLite

Kuuma polku käyttää muistissa olevaa `Map` (LRU-by-creation), jota tukee SQLite taulukko kaatumisista palautumiseen ja kojelaudan näkyvyyteen.

| Kerros | Toteutus                                       | Tarkoitus                                         |
| ------ | ---------------------------------------------- | ------------------------------------------------- |
| Muisti | `Map` in `open-sse/services/reasoningCache.ts` | Nopeat haut, häädöt vanhin 200-vuotiaana          |
| DB     | `reasoning_cache` pöytä (`src/lib/db/`)        | Pysyy uudelleenkäynnistysten ajan, ajaa tilastoja |

Kirjoitukset menevät molemmille. Lukemat tarkistavat ensin muistin, sitten palaavat DB (DB osumat siirretään takaisin muistiin). DB virheet eivät ole vakavia — muistissa oleva välimuisti palvelee edelleen kuumaa polkua.

**Oletukset:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Muistin enimmäismäärä: `200` (`MAX_MEMORY_ENTRIES`)
- Häätö: vanhin `createdAt` ensin

## Tietokantakaavio

Muutto: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksit: `expires_at`, `provider`, `model`, `created_at`. `expires_at` tallennetaan Unix-epokkisekunteina; SELECT taso normalisoi vanhat tekstiarvot `EXPIRES_AT_EPOCH_SQL` kautta.

## Palveluntarjoajan/mallin tunnistus

Toisto on käytössä, kun `requiresReasoningReplay(provider, model)` palauttaa `true`. Funktio tarkistaa kaksi listaa `open-sse/services/reasoningCache.ts` ssä.

**Palveluntarjoajan IDs (tarkka vastaavuus, kirjainkoolla ei ole merkitystä):**

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

**Mallin säännölliset lausekkeet (kirjainkoolla ei ole merkitystä):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ja `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, valinnainen `-free` liite)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Uuden tiukan provider/model lisääminen tarkoittaa liittämistä johonkin näistä luetteloista ja yksikkötestin kirjoittamista, jossa vahvistetaan uusinta-injektio. PR kuvauksessa tulee mainita tarkka ylävirran 400 merkkijono, joka motivoi muutosta.

## REST API

Välimuisti paljastaa kaksi päätepistettä `src/app/api/cache/reasoning/route.ts` alla. Molemmat vaativat hallinnan todennuksen (`isAuthenticated` alkaen `@/shared/utils/apiAuth`).

| Menetelmä | Päätepiste                                                | Kuvaus                                                   |
| --------- | --------------------------------------------------------- | -------------------------------------------------------- |
| GET       | `/api/cache/reasoning`                                    | Tilastot + sivutetut merkinnät                           |
| GET       | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Suodatettu listaus (`limit` kiinnitetty `[1, 200]`)      |
| DELETE    | `/api/cache/reasoning`                                    | Tyhjennä kaikki (muisti + DB) ja nollaa hit/miss -määrät |
| DELETE    | `/api/cache/reasoning?provider=deepseek`                  | Tyhjennä vain yhden palveluntarjoajan merkinnät          |
| DELETE    | `/api/cache/reasoning?toolCallId=call_abc`                | Poista yksittäinen merkintä                              |

**GET -vasteen muoto:**

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

## Operatiiviset huomautukset

- **Puhdistus:** `cleanupReasoningCache()` tyhjentää vanhentuneet muistimerkinnät ja suorittaa `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Terveystarkastuksen työntekijät soittavat tälle säännöllisesti.
- **Kaatumisista palautuminen:** Uudelleenkäynnistyksen jälkeen muisti on tyhjä, mutta DB sisältää edelleen vanhentumattomia merkintöjä. Ensimmäinen haku tietylle `tool_call_id` :lle on DB osuma; myöhemmät haut ovat muistiosumia.
- **Ei perusteluja, ei välimuistia:** `cacheReasoningFromAssistantMessage` palauttaa `0` kun avustajaviestissä ei ole `reasoning_content` / `reasoning` kenttää, joten ajattelemattomat vastaukset eivät maksa mitään.
- **Myös kirjoitus on suljettu:** molemmat `chatCore.ts` n soittopaikat (ei-suoratoisto ja suoratoisto) kutsuvat vain `cacheReasoningFromAssistantMessage()`, kun `requiresReasoningReplay(provider, model)` on `true` — sama predikaatti lukupuolen tarkistukset. Asennukset, jotka eivät koskaan koske toiston tarjoajaa, lakkaavat maksamasta kirjoittamisesta, indeksin päivityksestä ja try/catch stä jokaisesta päättelyä sisältävästä vastauksesta.
- **Ei-tiukat palveluntarjoajat:** Kun `requiresReasoningReplay` on `false` ja kohdemuoto on OpenAI, kääntäjä** nauhat** kaikki lähtevien viestien `reasoning_content` -kenttä — OpenAI Chat Completions ei hyväksy sitä.

## Muse Opaque-Reasoning Omistus

Muse (`muse-code`) palauttaa soittajaan sidotun läpinäkymättömän päättelyn (`encrypted_content`). Sen toistaminen toisella tilillä tai muistetuilla tunnistetiedoilla epäonnistuu alkuvaiheessa, joten alkuperäiset OAuth pyynnöt käyttävät istuntotason omistajuutta pyyntökohtaisen vuorottelun sijaan (`src/sse/services/museSessionOwnership.ts`, pakotettu `src/sse/handlers/chat.ts`:ssä). Eksplisiittisesti valitut API-avainyhteydet ja vain API-avainmääritykset säilyttävät nykyisen reitityksensä ilman tätä omistustilaa.

- Tarjoa vakaa istunto ID joka käänteessä: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` tai `x-codex-session-id`; vaihtoehtoisesti käytä `prompt_cache_key`, `session_id`, `conversation_id` tai `metadata.session_id` tekstissä (tässä tärkeysjärjestyksessä). Puuttuva tai tyhjä IDs palauttaa 400, kun kaksi tai useampi natiivi OAuth -tili on aktiivinen; yhdellä OAuth -tilillä ei ole mitään, jolle käännetä, joten tällainen pyyntö pitää kiinnittämättömän reitityksen. Soveltamisalaan kuuluu soittajan OmniRoute API-avain ID.
- Tuoreet itsenäiset istunnot kiertoroinnilla aktiivisten alkuperäisten OAuth tilien välillä API-avainyhteyskäytännön sallimissa yhteyksissä ID mukaan. Round-robin ohittaa tilit yhteyden jäähtyessä, päätteen tilalla (`banned`, `expired`, `credits_exhausted`) tai mallilukittuina pyydettyä mallia varten; Musen alkupään häiriöt tallentavat jäähtymisen ja katkaisun tilan muiden palveluntarjoajien tavoin. Eksplisiittisesti pakotettu yhteys ohittaa uuden istunnon kiertokulkua, mutta ei voi ohittaa olemassa olevaa omistajaa.
- Kunnes omistaja antaa onnistuneen vastauksen, istunto, jonka omistaja ei ole tavoitettavissa, vaaditaan uudelleen terveelle tilille. Ensimmäisen onnistuneen vastauksen jälkeen istunto pysyy kiinnitettynä kyseiselle omistajalle, kunnes se on ollut käyttämättömänä 30 päivää (`MUSE_SESSION_IDLE_TTL_MS`).
- Jokainen jatko- ja työkalutuloksen käännös pysyy kiinnitettynä istunnon omistajalle: yhteys, tilin identiteetti ja päätelmien tunnistetietojen luominen, jotka tarkistetaan uudelleen ennen alkuvaiheen yrityksiä, mukaan lukien tunnistetietojen päivitysyritykset. Vastaukset kutsuvat IDs/item -viittauksia ja Chat Completions -työkalukutsu IDs on täytynyt tallentaa kyseiselle istunnolle ja sukupolvelle.
- SQLite `key_value` -tietueet `muse_session_ownership` nimiavaruudessa (`src/lib/db/museSessionOwnership.ts`) säilyttävät omistajuuden ja kiertokursori käynnistyy uudelleen. Jokainen vaatimus ja toimitettu vastaus päivittää istunnon aktiviteettileiman; `MUSE_SESSION_IDLE_TTL_MS` pidempi istunto tyhjäkäynnillä leikataan (omistajan merkki, tarjottu lippu ja tallennetut opaque/reference tiivisteet), enintään 10 minuutin välein ja rajoitetuissa erissä, joten sen historian myöhempi toisto epäonnistuu ja suljetaan tuntemattomana omistajana. Tietueet sisältävät yhteyden IDs ja tilin identiteetin, valtuustietojen, läpinäkymättömän sisällön ja jatkoviittaukset, eivät salaisuuksia tai keskusteluhistoriaa. Asiakkaiden on säilytettävä ja lähetettävä koko historiansa ja läpinäkymättömät perustelunsa.
- Tuntematon tai ulkopuolinen läpinäkymätön päättely, puuttuva omistaja, käytettävissä oleva omistajatili tai sukupolven vaihto, jolla on tallennettu historia, epäonnistuu, suljettiin eksplisiittisellä 4xx/503 — ei koskaan hiljaa tilien välisellä vikasietosuhteella eikä koskaan pudonnut perusteluja.
- Muistutettu saman tilin avain otetaan käyttöön vain, kun istunto ei tallentanut uudelleentoistohistoriaa; tallennetut istunnot epäonnistuvat suljettuina, kunnes ne aloitetaan uudelleen.
- Tyhjä ylävirran vastaus (`upstream_empty_response` / `empty_response`, soittajalle ei lähetetä mitään) yritetään uudelleen enintään kahdesti samalla omistajalla, 0,5 s ja sitten 1,5 s kuluttua (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Jos kaikki yritykset ovat tyhjiä, alkuperäinen 502 palautetaan ilman jäähdytys- tai katkaisijamerkintää, joten hilseilevä vastaus ei koskaan lukitse omistajaa.
- Kaikki `muse-code` pyynnöt ohittavat semanttisen välimuistin luku- ja kirjoitustoiminnot, mukaan lukien suoratoistokirjoitukset, joten välimuistissa oleva läpinäkymätön tulos ei voi saada eri istunnon omistajaa.

Regressiovartijat: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` ja `tests/unit/chatcore-semantic-cache.test.ts`.

## Katso myös

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — katkaisijat, jäähdytys, mallien lukitukset
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosointi ylävirran 400s
- Lähde: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Muutto: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API reitti: `src/app/api/cache/reasoning/route.ts`
- Alkuperäinen numero: #1628
