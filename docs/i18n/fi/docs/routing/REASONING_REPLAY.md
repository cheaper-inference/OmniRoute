# Reasoning Replay Cache (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Totuuden lähde:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Päivitetty viimeksi:** 2026-06-28 — v3.8.40

OmniRoute tallentaa ajattelutilan mallien tuottaman avustajan `reasoning_content`-sisällön ja toistaa sen läpinäkyvästi monivaiheisissa pyynnöissä, kun ylävirran palveluntarjoaja sitä edellyttää. Tämä poistaa HTTP 400 -virheet, joita tiukat palveluntarjoajat palauttavat, kun asiakkaan keskusteluhistoriasta puuttuu edellisen vuoron päättely.

## Miksi tämä on olemassa

Useat ajattelutilan palveluntarjoajat hylkäävät jatkovuoron, ellei **edellinen avustajan viesti sisällä alkuperäistä `reasoning_content`-sisältöä**. Ylävirta palauttaa 400-virheen esimerkiksi seuraavilla viesteillä:

```
Virheellinen parametri: ajattelutilan reasoning_content on välitettävä takaisin API:lle.
```

Tavalliset asiakkaat (Cursor, Cline, Roo Code, OpenAI SDK) kuitenkin poistavat `reasoning_content`-sisällön uudelleen lähettämästään historiasta. OmniRoute palauttaa sen palvelinpuolen välimuistista, jotta ylävirran vastaanottama pyyntö on johdonmukainen. Ongelma #1628 lisäsi muistin ja SQLiten yhdistävän hybriditallennuksen, jotta välimuisti säilyy prosessin uudelleenkäynnistysten yli.

## Arkkitehtuuri

```
Kierros N (avustaja generoi):
  → vastaus sisältää reasoning_content- ja tool_calls-kentät
  → jos requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      kirjoittaa (muistiin + tietokantaan), avaimena jokainen tool_call.id
  → välitä vastaus asiakkaalle (joka voi säilyttää päättelyn tai olla säilyttämättä sitä)

Kierros N+1 (asiakas lähettää jatkopyynnön):
  → muunnin havaitsee: requiresReasoningReplay(provider, model) === true
  → jokaiselle avustajaviestille, jolla on tool_calls mutta ei reasoning_content-kenttää:
      lookupReasoning(toolCalls[0].id) → muisti → tietokanta
      osuma → msg.reasoning_content = cached; recordReplay()
      huti  → msg.reasoning_content = "" (yhteensopivuusvararatkaisu vanhemmalle DeepSeekille)
  → ylävirta saa johdonmukaisen historian → ei 400-virhettä
```

Tallennus tapahtuu tiedostossa `open-sse/handlers/chatCore.ts` (kahdessa kohdassa, joissa kutsutaan `cacheReasoningFromAssistantMessage`-funktiota). Toisto tapahtuu tiedostossa `open-sse/translator/index.ts` skeeman pakotetun muunnoksen jälkeen mutta ennen välitystä.

Tavallisten (ilman työkalukutsua olevien) avustajakierrosten avaimet muodostetaan eri tavalla: `buildAssistantMessageCacheKey()` muodostaa tiivisteen istunnon laajuudesta sekä normalisoidusta OpenAI-muotoisesta keskusteluhistoriasta kyseiseen kierrokseen asti, koska DeepSeek vaatii _jokaisen_ aiemman kierroksen päättelyn, kun `tools` on mukana. Responses-API-kohteissa (esimerkiksi `opencode-go/deepseek-v4-flash`, joka reititetään polkuun `/responses`) ylävirran pyyntörunko sisältää `input`-kentän eikä `messages`-kenttää, joten `translateRequest()` (`open-sse/translator/index.ts`) ilmoittaa takaisinsoittovaihtoehdon kautta pivot-keskusteluhistorian, josta se muodosti tiivisteen, ja tallennuskohdat muodostavat tiivisteen samasta keskusteluhistoriasta. Responses-toistovaihe suoritetaan OpenAI-pivotille kaikissa lähdemuodoissa, joten myös Anthropic Messages -asiakkaiden (Claude → OpenAI → Responses) historia toistetaan.

## Tallennus — muistin ja SQLiten hybridi

Kriittinen suorituspolku käyttää muistissa olevaa `Map`-rakennetta (luontijärjestykseen perustuva LRU), jonka taustalla oleva SQLite-taulu mahdollistaa palautumisen kaatumisista ja näkyvyyden koontinäytössä.

| Kerros | Toteutus                                                | Tarkoitus                                             |
| ------ | ------------------------------------------------------- | ----------------------------------------------------- |
| Muisti | `Map` tiedostossa `open-sse/services/reasoningCache.ts` | Nopeat haut, poistaa vanhimman 200 merkinnän kohdalla |
| TK     | `reasoning_cache`-taulu (`src/lib/db/`)                 | Säilyy uudelleenkäynnistysten yli ja tuottaa tilastot |

Kirjoitukset tehdään molempiin. Luku tarkistaa ensin muistin ja käyttää sitten tarvittaessa tietokantaa (tietokantaosumat nostetaan takaisin muistiin). Tietokantavirheet eivät ole fataaleja — muistissa oleva välimuisti palvelee edelleen kriittistä suorituspolkua.

**Oletusarvot:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Muistimerkintöjen enimmäismäärä: `200` (`MAX_MEMORY_ENTRIES`)
- Poisto: vanhin `createdAt` ensin

## Tietokantaskeema

Migraatio: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksit: `expires_at`, `provider`, `model`, `created_at`. `expires_at` tallennetaan Unix-epookin sekunteina; SELECT-kerros normalisoi vanhat tekstiarvot `EXPIRES_AT_EPOCH_SQL`-lausekkeen avulla.

## Palveluntarjoajan / mallin tunnistus

Toisto otetaan käyttöön, kun `requiresReasoningReplay(provider, model)` palauttaa arvon `true`. Funktio tarkistaa kaksi luetteloa tiedostossa `open-sse/services/reasoningCache.ts`.

**Palveluntarjoajatunnukset (täsmällinen vastaavuus, kirjainkoolla ei ole merkitystä):**

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

**Mallien regex-mallit (kirjainkoolla ei ole merkitystä):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` ja `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, valinnainen `-free`-pääte)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Uuden tiukan palveluntarjoajan tai mallin lisääminen tarkoittaa sen lisäämistä jompaankumpaan näistä luetteloista sekä toiston lisäämisen varmistavan yksikkötestin kirjoittamista. PR-kuvauksessa tulee mainita muutoksen perusteena ollut täsmällinen ylävirran 400-virheteksti.

## REST API

Välimuisti tarjoaa kaksi päätepistettä tiedostossa `src/app/api/cache/reasoning/route.ts`. Molemmat edellyttävät hallintatason todennusta (`isAuthenticated` moduulista `@/shared/utils/apiAuth`).

| Menetelmä | Päätepiste                                                | Kuvaus                                                             |
| --------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| GET       | `/api/cache/reasoning`                                    | Tilastot + sivutetut tietueet                                      |
| GET       | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Suodatettu luettelo (`limit` rajataan välille `[1, 200]`)          |
| DELETE    | `/api/cache/reasoning`                                    | Tyhjennä kaikki (muisti + tietokanta) ja nollaa osuma-/ohilaskurit |
| DELETE    | `/api/cache/reasoning?provider=deepseek`                  | Tyhjennä vain yhden palveluntarjoajan tietueet                     |
| DELETE    | `/api/cache/reasoning?toolCallId=call_abc`                | Poista yksittäinen tietue                                          |

**GET-vastauksen rakenne:**

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

## Operatiiviset huomiot

- **Siivous:** `cleanupReasoningCache()` poistaa vanhentuneet muistitietueet ja suorittaa komennon `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Kuntotarkistustyöntekijät kutsuvat tätä säännöllisesti.
- **Palautuminen kaatumisesta:** Uudelleenkäynnistyksen jälkeen muisti on tyhjä, mutta tietokannassa ovat edelleen vanhentumattomat tietueet. Tietyn `tool_call_id`-arvon ensimmäinen haku osuu tietokantaan; myöhemmät haut osuvat muistiin.
- **Ei päättelyä, ei välimuistia:** `cacheReasoningFromAssistantMessage` palauttaa arvon `0`, kun avustajan viestissä ei ole `reasoning_content`- tai `reasoning`-kenttää, joten päättelyä sisältämättömistä vastauksista ei aiheudu kustannuksia.
- **Myös kirjoittaminen on ehdollista:** `chatCore.ts`-tiedoston molemmat kutsukohdat (ei-suoratoistava ja suoratoistava) kutsuvat `cacheReasoningFromAssistantMessage()`-funktiota vain, kun `requiresReasoningReplay(provider, model)` on `true` — kyseessä on sama predikaatti, jonka lukupuoli tarkistaa. Asennuksissa, jotka eivät koskaan käytä toistoa edellyttävää palveluntarjoajaa, ei enää makseta kirjoittamisesta, indeksin päivittämisestä eikä jokaisen päättelyä sisältävän vastauksen try/catch-käsittelystä.
- **Ei-tiukat palveluntarjoajat:** Kun `requiresReasoningReplay` on `false` ja kohdemuoto on OpenAI, muunnin **poistaa** kaikki `reasoning_content`-kentät lähtevistä viesteistä — OpenAI Chat Completions ei hyväksy niitä.

## Musen läpinäkymättömän päättelyn omistajuus

Muse (`muse-code`) palauttaa kutsujaan sidottua läpinäkymätöntä päättelyä (`encrypted_content`). Sen toistaminen toisella tilillä tai uudelleen luodulla tunnistetiedolla epäonnistuu upstream-palvelussa, joten natiivit OAuth-pyynnöt käyttävät istuntotason omistajuutta pyyntökohtaisen kierrätyksen sijaan (`src/sse/services/museSessionOwnership.ts`, toimeenpano tiedostossa `src/sse/handlers/chat.ts`). Eksplisiittisesti valitut API-avainyhteydet ja vain API-avaimia käyttävät määritykset säilyttävät nykyisen reitityksensä ilman tätä omistajuustilaa.

- Anna jokaisella vuorolla vakaa istuntotunnus: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` tai `x-codex-session-id`; vaihtoehtoisesti käytä rungossa `prompt_cache_key`-, `session_id`-, `conversation_id`- tai `metadata.session_id`-kenttää (tässä etusijajärjestyksessä). Puuttuva tai tyhjä tunnus palauttaa 400, kun vähintään kaksi natiivia OAuth-tiliä on aktiivisena; yhdellä OAuth-tilillä ei ole toista tiliä kierrätettäväksi, joten tällainen pyyntö säilyttää kiinnittämättömän reitityksen. Soveltamisala sisältää kutsujan OmniRoute-API-avaimen tunnuksen.
- Uudet erilliset istunnot kiertävät vuorotellen API-avaimen yhteyskäytännön sallimien aktiivisten natiivien OAuth-tilien välillä yhteystunnuksen järjestyksessä. Vuorottelu ohittaa tilit, joilla on yhteyden jäähyaika, lopullinen tila (`banned`, `expired`, `credits_exhausted`) tai pyydetyn mallin mallikohtainen esto; Musen upstream-virheet kirjaavat jäähyajan ja katkaisimen tilan kuten muutkin palveluntarjoajat. Eksplisiittisesti pakotettu yhteys ohittaa vuorottelun uudessa istunnossa mutta ei voi syrjäyttää omistajaa sen tarjottua onnistuneen vastauksen.
- Ennen kuin omistaja on tarjonnut onnistuneen vastauksen, istunto, jonka omistaja ei enää ole käytettävissä, varataan uudelleen terveelle tilille. Ensimmäisen onnistuneen vastauksen jälkeen istunto pysyy kiinnitettynä tähän omistajaan, kunnes se on ollut käyttämättä 30 päivää (`MUSE_SESSION_IDLE_TTL_MS`).
- Jokainen jatko- ja työkalutulosvuoro pysyy kiinnitettynä istunnon omistajaan: yhteyteen, tili-identiteettiin ja päättelyn tunnistetietosukupolveen, jotka tarkistetaan uudelleen ennen upstream-yrityksiä, myös tunnistetietojen päivityksen jälkeisissä uusintayrityksissä. Responses-kutsutunnusten/kohdeviitteiden ja Chat Completions -työkalukutsutunnusten on oltava kirjattu kyseiselle istunnolle ja sukupolvelle.
- SQLiten `key_value`-tietueet nimiavaruudessa `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) säilyttävät omistajuuden ja kierrätyskohdistimen uudelleenkäynnistyksissä. Jokainen varaus ja tarjottu vastaus päivittää istunnon aktiivisuusleiman; pidempään kuin `MUSE_SESSION_IDLE_TTL_MS` käyttämättä ollut istunto poistetaan (omistajakiinnitys, vastauslippu ja tallennetut läpinäkymättömän sisällön/viitteiden tiivisteet) enintään kerran 10 minuutissa rajatuissa erissä, joten sen historian myöhempi toisto estetään tuntemattoman omistajan vuoksi. Tietueet sisältävät yhteystunnukset sekä tili-identiteetin, tunnistetietojen, läpinäkymättömän sisällön ja jatkoviitteiden tiivisteet, eivät salaisuuksia tai keskusteluhistoriaa. Asiakkaiden on säilytettävä ja lähetettävä koko historiansa ja läpinäkymätön päättely.
- Tuntematon tai vieras läpinäkymätön päättely, puuttuva omistaja, omistajan tilin saavuttamattomuus tai sukupolven vaihtuminen tallennetun historian kanssa estää toiminnon eksplisiittisellä 4xx/503-virheellä — koskaan ei tehdä hiljaista varavaihtoa toiselle tilille eikä pudoteta päättelyä pois.
- Uudelleen luotu saman tilin avain otetaan käyttöön vain, jos istunto ei tallentanut toistettavaa historiaa; historiaa tallentaneet istunnot pysyvät estettyinä, kunnes aloitetaan alusta.
- Tyhjää upstream-vastausta (`upstream_empty_response` / `empty_response`, kutsujalle ei ole lähetetty mitään) yritetään enintään kahdesti uudelleen samalla omistajalla, ensin 0.5 s ja sitten 1.5 s kuluttua (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Jos kaikki yritykset ovat tyhjiä, alkuperäinen 502 palautetaan ilman jäähyaika- tai katkaisinmerkintää, joten epävakaa vastaus ei koskaan estä omistajaa.
- Kaikki `muse-code`-pyynnöt ohittavat semanttisen välimuistin luvut ja kirjoitukset, myös suoratoistokirjoitukset, joten välimuistissa oleva läpinäkymätön tuloste ei voi saada eri istunto-omistajaa.

Regressiosuojat: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` ja `tests/unit/chatcore-semantic-cache.test.ts`.

## Katso myös

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — piirikatkaisimet, palautumisajat, mallien lukitukset
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ylätason palvelujen 400-virheiden diagnosointi
- Lähdekoodi: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migraatio: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API-reitti: `src/app/api/cache/reasoning/route.ts`
- Alkuperäinen ongelma: #1628
