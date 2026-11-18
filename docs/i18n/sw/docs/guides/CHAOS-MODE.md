# Chaos Mode (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashibodi:** **Chaos Mode** (upau wa pembeni) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (kipindi cha dashibodi) · `POST /api/skills/collect/chaos` (ufunguo wa API)  
> **Chanzo:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode hutuma **jukumu moja kwa watoa huduma kadhaa kwa wakati mmoja** — kila mtoa huduma anayeshiriki
huchangia instansi moja ya modeli, na unapata majibu yote yakiwa sambamba (au yakiwa yameunganishwa kwa mfululizo). Hii ni
sehemu ya utekelezaji wa modeli nyingi, si mkakati wa uelekezaji: trafiki yako ya kawaida ya `/v1/chat/completions`
haiathiriwi kamwe nayo.

**Ufafanuzi — kuna vitu vitatu tofauti vinavyotolewa vikiwa na "chaos" katika jina:**

| Kitu                      | Ni nini                                                                                                                                                                                               | Kilipoelezewa                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**            | Ukurasa wa dashibodi + API iliyoelezewa hapa: sambaza jukumu moja kwa watoa huduma wengi (kwa sambamba au kwa ushirikiano).                                                                           | Mwongozo huu                                 |
| `auto/chaos`              | Kitambulisho cha modeli ya Auto-Combo: usambazaji sambamba, modeli moja kwa kila mtoa huduma, mwito mmoja wa chanzo kwa kila mmoja. Si udungaji wa hitilafu ([maelezo](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Usanidi wa combo ya Chaos | Combo iliyohifadhiwa yenye `config.chaos.enabled` husambaza kwa njia hiyo hiyo (API pekee); `judgeModel` huchagua tu jibu la mwisho, bila mwito wa usanisi.                                           | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: usambazaji sambamba

`auto/chaos` **si** kidhibiti cha udungaji wa hitilafu au majaribio ya ustahimilivu. Kuomba
`model: "auto/chaos"` kwenye `/v1/chat/completions`:

1. Huunda jopo la **modeli moja kwa kila mtoa huduma**: mgombea wa kwanza wa kila
   mtoa huduma aliyeunganishwa, kwa mpangilio wa kundi la wagombea, hadi wanachama 5
   (`OMNIROUTE_CHAOS_MAX_PANEL`, ikiwa na kikomo cha 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Kifurushi cha uzito cha `chaos-mode`
   huweka tu `weight` ya kila mwanachama; usambazaji hausomi thamani hiyo.
2. Hutuma ombi lilelile kwa kila mwanachama wa jopo **kwa sambamba**, hivyo ombi moja
   hugharimu mwito mmoja wa chanzo kwa kila mwanachama wa jopo
   (`open-sse/services/autoCombo/chaosEngine.ts`, likitumwa kutoka
   `open-sse/services/combo.ts`).
3. Hutiririsha mstari mmoja wa hali kwa kila mwanachama wa jopo unapowasili: maoni ya SSE
   (`: chaos <index> ok|fail <model>`) kwa chaguo-msingi, pamoja na tukio la `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) wakati ombi linaweka
   `stream_options.include_chaos_parts: true`. Haya hayabebi maandishi ya jibu.
4. Hutuma jibu **moja** la jopo kama sehemu ya mwisho yenye mtindo wa OpenAI: la mwanachama wa kwanza
   wa jopo (`auto/chaos` humweka kama `judgeModel`) anapofaulu, vinginevyo
   la mwanachama aliyefaulu mwisho. Majibu mengine ya jopo hayarejeshwi, kwa hivyo
   unalipia miito N na kupokea ukamilishaji mmoja.

## Usanidi

1. Fungua **Dashibodi → Chaos Mode** (`/dashboard/chaos`).
2. Iwashe — Chaos Mode huja ikiwa **imezimwa kwa chaguo-msingi** (`enabled: false` katika
   `src/lib/chaos/chaosConfig.ts`). Ikiwa imezimwa, `POST /api/chaos/run` hujibu
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Chagua washiriki na mipangilio chaguo-msingi (huhifadhiwa kwa kila instance kupitia hifadhi ya mipangilio):

   | Sehemu              | Maana                                                                      | Chaguo-msingi / mipaka                         |
   | ------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- |
   | `enabled`           | Swichi kuu                                                                 | `false`                                        |
   | `defaultMode`       | `parallel` au `collaborative` (tazama hapa chini)                          | `parallel`                                     |
   | `providerOverrides` | Ushiriki wa kila mtoa huduma (`providerId`, `modelId` ya hiari, `enabled`) | tupu = kila mtoa huduma aliye hai, isizidi 200 |
   | `systemPrompt`      | Maelekezo mbadala ya mfumo wa Chaos yaliyojengewa ndani                    | ya hiari, isizidi herufi 10 000                |
   | `timeoutMs`         | Muda wa juu kwa kila ombi la modeli                                        | `120000` (5 000–600 000)                       |
   | `maxTokens`         | `max_tokens` kwa kila ombi la modeli                                       | `4096` (256–128 000)                           |

4. Mpe kila mtoa huduma anayeshiriki **modeli**. Modeli ya mtoa huduma ni `modelId` ya
   override yake iliyowashwa kwenye ukurasa wa Chaos Mode (hiyo ndiyo hutumika kwanza), la sivyo ni **modeli chaguo-msingi** ya muunganisho wake. Kitambulisho cha mtoa huduma hakitumiki kamwe kama jina la modeli. Mtoa huduma asiye na mojawapo ya hizo **haitaitwa**: huonekana katika matokeo ikiwa na `status: "error"` pamoja na ujumbe _"No model set for this provider. Set a model for it on the Chaos Mode page or a default model on the connection."_ na `modelId` tupu, huku watoa huduma wengine wakiendelea kufanya kazi kama kawaida. Ikiwa hakuna mtoa huduma aliyechaguliwa aliye na modeli, utekelezaji hushindikana kabla ya ombi lolote la upstream kwa ujumbe _"No provider has a model set. …"_ (HTTP 500 kwenye endpoints zote mbili).
5. Fanya **jaribio kutoka kwenye ukurasa wenyewe** — paneli ya matokeo huonyesha jibu, hali na muda wa kila mtoa huduma.

## Hali za utekelezaji

- **`parallel`** — kila modeli hupokea jukumu lilelile kwa wakati mmoja; unapokea majibu yote
  kwa kujitegemea.
- **`collaborative`** — modeli hutekelezwa **kwa mfuatano**: kila moja huona matokeo ya modeli iliyotangulia na
  huombwa kuyaboresha, kuyapanua, kuyakosoa au kutoa mbadala. Sehemu ya `summary` ya jibu
  huunganisha matokeo yaliyofaulu kwa mpangilio wa mfuatano (utekelezaji sambamba hauna `summary`).

## API

### `POST /api/chaos/run` — kipindi cha dashboard

Imethibitishwa kwa cookie (kikao cha usimamizi — tazama
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); hutumiwa na ukurasa wa dashboard.

```jsonc
// mwili
{
  "task": "Compare approaches to X", // inahitajika
  "providers": ["glm", "kimi"], // kichujio cha hiari
  "mode": "parallel", // hiari — hubatilisha defaultMode
  "systemPrompt": "…", // ubatilishaji wa hiari
  "maxTokens": 4096, // ubatilishaji wa hiari
}
```

### `POST /api/skills/collect/chaos` — ufunguo wa API

Toleo la tokeni ya Bearer kwa wapigaji wa nje. Ufunguo lazima uwe na **ruhusa ya Chaos Mode**
(`chaosModeEnabled`), ambayo **imezimwa kwa chaguo-msingi** — iwashe kwa kila ufunguo kupitia
**Dashboard → API Manager → edit key → permissions → Chaos Mode**. Mwili ni sawa na hapo juu.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Njia zote mbili za mwisho hurejesha muundo sawa:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // hali ya ushirikiano pekee
}
```

## Utatuzi wa Matatizo

- **`400 Chaos Mode is not enabled`** — hatua ya 2 hapo juu: swichi ya kimataifa imezimwa.
- **Ufunguo wa API unakataliwa kwenye `/api/skills/collect/chaos`** — ufunguo hauna ruhusa ya kila ufunguo
  ya `chaosModeEnabled` (imezimwa kwa chaguo-msingi; hii ni mipangilio, si hitilafu).
- **Mtoa huduma anaonyesha `No model set for this provider`** — weka modeli yake kwenye ukurasa wa Chaos Mode
  au modeli chaguo-msingi kwenye muunganisho wake (tazama Usanidi, hatua ya 4).
- **Mtoa huduma uliyemtarajia haupo kwenye matokeo** — angalia `providerOverrides` kwenye
  ukurasa wa Chaos Mode (override iliyozimwa huiondoa) na ikiwa muunganisho wa mtoa huduma unatumika.
