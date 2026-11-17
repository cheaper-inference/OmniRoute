# Chaos Mode (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **డ్యాష్బోర్డ్:** **Chaos Mode** (సైడ్బార్) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (డ్యాష్బోర్డ్ సెషన్) · `POST /api/skills/collect/chaos` (API కీ)  
> **మూలం:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ఒక టాస్క్ను ఒకేసారి అనేక ప్రొవైడర్లకు** పంపుతుంది — పాల్గొనే ప్రతి ప్రొవైడర్
ఒక మోడల్ ఇన్స్టాన్స్ను అందిస్తుంది, అలాగే మీరు అన్ని సమాధానాలను పక్కపక్కనే (లేదా చైన్గా) పొందుతారు. ఇది
బహుళ-మోడల్ ఎగ్జిక్యూషన్ సర్ఫేస్, రూటింగ్ వ్యూహం కాదు: మీ సాధారణ `/v1/chat/completions`
ట్రాఫిక్పై దీని ప్రభావం ఎప్పటికీ ఉండదు.

**స్పష్టీకరణ — "chaos" అనే పేరు కలిగిన మూడు విభిన్న అంశాలు అందించబడతాయి:**

| అంశం                 | అది ఏమిటి                                                                                                                                                                            | డాక్యుమెంటేషన్ ఎక్కడ ఉంది                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**       | ఇక్కడ వివరించిన డ్యాష్బోర్డ్ పేజీ + API: ఒక టాస్క్ను అనేక ప్రొవైడర్లకు విస్తరించడం (సమాంతరంగా లేదా సహకారాత్మకంగా).                                                                   | ఈ గైడ్                                       |
| `auto/chaos`         | Auto-Combo మోడల్ id: సమాంతర ఫ్యాన్-అవుట్, ఒక్కో ప్రొవైడర్కు ఒక మోడల్, ఒక్కొక్కదానికి ఒక అప్స్ట్రీమ్ కాల్. ఇది ఫాల్ట్ ఇంజెక్షన్ కాదు ([వివరాలు](#autochaos-parallel-fan-out)).        | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos కాంబో కాన్ఫిగ్ | `config.chaos.enabled` కలిగిన పర్సిస్ట్ చేసిన కాంబో అదే విధంగా ఫ్యాన్-అవుట్ చేస్తుంది (API ద్వారా మాత్రమే); `judgeModel` తుది సమాధానాన్ని మాత్రమే ఎంచుకుంటుంది, సింథసిస్ కాల్ ఉండదు. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: సమాంతర ఫ్యాన్-అవుట్

`auto/chaos` అనేది ఫాల్ట్-ఇంజెక్షన్ లేదా రెసిలియన్స్-టెస్టింగ్ నియంత్రణ **కాదు**.
`/v1/chat/completions`లో `model: "auto/chaos"`ను అభ్యర్థించడం:

1. **ఒక్కో ప్రొవైడర్కు ఒక మోడల్** చొప్పున ఒక ప్యానెల్ను నిర్మిస్తుంది: కనెక్ట్ అయిన ప్రతి
   ప్రొవైడర్కు చెందిన మొదటి క్యాండిడేట్ను, క్యాండిడేట్-పూల్ క్రమంలో, గరిష్ఠంగా 5 మంది సభ్యుల వరకు
   (`OMNIROUTE_CHAOS_MAX_PANEL`, గరిష్ఠ పరిమితి 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` వెయిట్
   ప్యాక్ ప్రతి సభ్యుని `weight`ను మాత్రమే సెట్ చేస్తుంది; ఫ్యాన్-అవుట్ దాన్ని చదవదు.
2. ఒకే అభ్యర్థనను ప్రతి ప్యానెల్ సభ్యునికి **సమాంతరంగా** పంపుతుంది, కాబట్టి ఒక్క అభ్యర్థనకు
   ప్రతి ప్యానెల్ సభ్యుడి కోసం ఒక అప్స్ట్రీమ్ కాల్ ఖర్చవుతుంది
   (`open-sse/services/autoCombo/chaosEngine.ts`,
   `open-sse/services/combo.ts` నుండి డిస్పాచ్ చేయబడుతుంది).
3. ప్రతి ప్యానెల్ సభ్యుని ఫలితం అందినప్పుడు దానికి ఒక స్టేటస్ లైన్ను స్ట్రీమ్ చేస్తుంది: డిఫాల్ట్గా ఒక SSE కామెంట్
   (`: chaos <index> ok|fail <model>`), అలాగే అభ్యర్థన
   `stream_options.include_chaos_parts: true`ను సెట్ చేసినప్పుడు ఒక `omni-chaos-part`
   ఈవెంట్ (`model`, `index`, `ok`, `error`). వీటిలో సమాధాన టెక్స్ట్ ఉండదు.
4. **ఒక** ప్యానెల్ సమాధానాన్ని తుది OpenAI-శైలి చంక్గా పంపుతుంది: మొదటి ప్యానెల్
   సభ్యుని సమాధానం (`auto/chaos` దానిని `judgeModel`గా సెట్ చేస్తుంది) విజయవంతమైతే అదే, లేకపోతే
   చివరిగా విజయవంతమైన సభ్యుని సమాధానం. ఇతర ప్యానెల్ సమాధానాలు తిరిగి ఇవ్వబడవు, కాబట్టి
   మీరు N కాల్లకు చెల్లించి ఒక కంప్లీషన్ను పొందుతారు.

## సెటప్

1. తెరవండి** డాష్బోర్డ్ → ఖోస్ మోడ్** (`/dashboard/chaos`)
2. దాన్ని తిరగండి** న** — ఖోస్ మోడ్ షిప్లు** డిఫాల్ట్గా నిలిపివేయబడింది** (`enabled: false` లో `src/lib/chaos/chaosConfig.ts`). నిలిపివేయబడినప్పుడు, `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` సమాధానం ఇస్తుంది.
3. పాల్గొనేవారిని మరియు డిఫాల్ట్లను ఎంచుకోండి (సెట్టింగ్ల స్టోర్ ద్వారా ఒక్కో ఉదాహరణకి కొనసాగుతుంది):

   | ఫీల్డ్              | అర్థం                                                                    | డిఫాల్ట్ / పరిమితులు                         |
   | ------------------- | ------------------------------------------------------------------------ | -------------------------------------------- |
   | `enabled`           | మాస్టర్ స్విచ్                                                           | `false`                                      |
   | `defaultMode`       | `parallel` లేదా `collaborative` (క్రింద చూడండి)                          | `parallel`                                   |
   | `providerOverrides` | ప్రతి ప్రొవైడర్ భాగస్వామ్యం (`providerId`, ఐచ్ఛికం `modelId`, `enabled`) | ఖాళీ = ప్రతి సక్రియ ప్రొవైడర్, గరిష్టంగా 200 |
   | `systemPrompt`      | అంతర్నిర్మిత ఖోస్ సిస్టమ్ ప్రాంప్ట్ కోసం భర్తీ చేయండి                    | ఐచ్ఛికం, గరిష్టంగా 10 000 అక్షరాలు           |
   | `timeoutMs`         | ఒక్కో మోడల్ కాల్కు గరిష్ట సమయం                                           | `120000` (5 000–600 000)                     |
   | `maxTokens`         | మోడల్ కాల్కు`max_tokens`                                                 | `4096` (256–128 000)                         |

4. పాల్గొనే ప్రతి ప్రొవైడర్కు ఇవ్వండి a** మోడల్** . ప్రొవైడర్ మోడల్ అనేది ఖోస్ మోడ్ పేజీలో దాని ప్రారంభించబడిన ఓవర్రైడ్ యొక్క `modelId` (ఇది గెలుస్తుంది), లేకపోతే** డిఫాల్ట్ మోడల్** దాని కనెక్షన్. ప్రొవైడర్ ఐడి ఎప్పుడూ మోడల్ పేరుగా ఉపయోగించబడదు. ఏదీ లేని ప్రొవైడర్** పిలవలేదు** : ఇది ఫలితాలలో _"ఈ ప్రొవైడర్ కోసం మోడల్ సెట్ `status: "error"`. దాని కోసం ఒక మోడల్ని ఖోస్ మోడ్ పేజీలో లేదా కనెక్షన్లో డిఫాల్ట్ మోడల్లో సెట్ చేయండి."_ మరియు ఖాళీ `modelId` అనే సందేశంతో ఫలితాలలో చూపబడుతుంది, అయితే ఇతర ప్రొవైడర్లు సాధారణంగా రన్ అవుతాయి. ఎంచుకున్న ప్రొవైడర్కు మోడల్ లేకపోతే, ఏదైనా అప్స్ట్రీమ్ అభ్యర్థనకు ముందు రన్ విఫలమవుతుంది _"ఏ ప్రొవైడర్కు మోడల్ సెట్ లేదు. ..."_ (రెండు ఎండ్ పాయింట్లలోHTTP 500).
5. ఎని అమలు చేయండి** పేజీ నుండే పరీక్షించండి** — ఫలితాల ప్యానెల్ ప్రతి ప్రొవైడర్ యొక్క సమాధానం, స్థితి మరియు వ్యవధిని చూపుతుంది.

## ఎగ్జిక్యూషన్ మోడ్లు

- **`parallel`** — ప్రతి మోడల్కు ఒకే టాస్క్ ఏకకాలంలో అందుతుంది; మీకు అన్ని సమాధానాలు
  స్వతంత్రంగా లభిస్తాయి.
- **`collaborative`** — మోడల్లు **గొలుసుగా** అమలవుతాయి: ప్రతి మోడల్ మునుపటి మోడల్ అవుట్పుట్ను చూసి,
  దాన్ని మెరుగుపరచమని, విస్తరించమని, విమర్శించమని లేదా ప్రత్యామ్నాయం అందించమని కోరబడుతుంది. ప్రతిస్పందనలోని `summary` ఫీల్డ్
  విజయవంతమైన అవుట్పుట్లను గొలుసు క్రమంలో కలుపుతుంది (`parallel` అమలులకు `summary` ఉండదు).

## API

### `POST /api/chaos/run` — డాష్బోర్డ్ సెషన్

కుకీ-ప్రామాణీకరించబడింది (నిర్వహణ సెషన్ — [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) చూడండి ); డాష్బోర్డ్ పేజీ ద్వారా ఉపయోగించబడుతుంది.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — API కీ

బాహ్య కాలర్ల కోసం బేరర్-టోకెన్ వేరియంట్. కీని తప్పనిసరిగా తీసుకెళ్లాలి** ఖోస్ మోడ్ అనుమతి** (`chaosModeEnabled`), అంటే** డిఫాల్ట్గా ఆఫ్** — ప్రతి కీ ఇన్ని ఎనేబుల్ చేస్తుంది** డాష్బోర్డ్ → API మేనేజర్ → ఎడిట్ కీ → అనుమతులు → ఖోస్ మోడ్** . పైన చెప్పినదే శరీరం.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

రెండు ముగింపు బిందువులు ఒకే ఆకారాన్ని అందిస్తాయి:

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
  "summary": "…", // collaborative mode only
}
```

## ట్రబుల్షూటింగ్

- **`400 Chaos Mode is not enabled`** పైన — దశ 2: గ్లోబల్ స్విచ్ ఆఫ్లో ఉంది.
- **API కీ `/api/skills/collect/chaos` లో తిరస్కరించబడుతుంది** — కీకి పర్-కీ `chaosModeEnabled` అనుమతి లేదు (డిఫాల్ట్గా ఆఫ్; ఇది సెట్టింగ్, లోపం కాదు).
- **ఒక ప్రొవైడర్ `No model set for this provider` చూపుతుంది** — దాని మోడల్ను ఖోస్ మోడ్ పేజీలో లేదా దాని కనెక్షన్లో డిఫాల్ట్ మోడల్ను సెట్ చేసింది (సెటప్, స్టెప్ 4 చూడండి).
- **మీరు ఆశించిన ప్రొవైడర్ ఫలితాలలో కనిపించలేదు** — ఖోస్ మోడ్ పేజీలో `providerOverrides` తనిఖీ చేయండి (ఒక డిసేబుల్ ఓవర్రైడ్ దానిని మినహాయిస్తుంది) మరియు ప్రొవైడర్ కనెక్షన్ సక్రియంగా ఉందో లేదో.
