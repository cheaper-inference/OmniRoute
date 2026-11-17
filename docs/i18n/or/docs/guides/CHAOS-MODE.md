# Chaos Mode (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ଡ୍ୟାଶବୋର୍ଡ:** **Chaos Mode** (ସାଇଡ୍ବାର୍) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ଡ୍ୟାଶବୋର୍ଡ ସେସନ୍) · `POST /api/skills/collect/chaos` (API କୀ)  
> **ଉତ୍ସ:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ଗୋଟିଏ କାର୍ଯ୍ୟକୁ ଏକାସାଙ୍ଗରେ ଅନେକ ପ୍ରଦାନକାରୀଙ୍କ ନିକଟକୁ ପଠାଏ** — ଅଂଶଗ୍ରହଣକାରୀ ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ
ଗୋଟିଏ ମଡେଲ୍ ଇନ୍ଷ୍ଟାନ୍ସ ଯୋଗଦାନ କରନ୍ତି, ଏବଂ ଆପଣ ସମସ୍ତ ଉତ୍ତରକୁ ପାଖାପାଖି (କିମ୍ବା ଶୃଙ୍ଖଳିତ ଭାବରେ) ପାଆନ୍ତି। ଏହା ଏକ
ବହୁ-ମଡେଲ୍ ନିଷ୍ପାଦନ ପୃଷ୍ଠ, କୌଣସି ରାଉଟିଂ କୌଶଳ ନୁହେଁ: ଆପଣଙ୍କ ସାଧାରଣ `/v1/chat/completions`
ଟ୍ରାଫିକ୍ ଏହା ଦ୍ୱାରା କେବେବି ପ୍ରଭାବିତ ହୁଏ ନାହିଁ।

**ଦ୍ୱନ୍ଦ୍ୱ ନିରାକରଣ — ନାମରେ "chaos" ଥିବା ତିନୋଟି ଭିନ୍ନ ଜିନିଷ ପ୍ରଦାନ କରାଯାଏ:**

| ଜିନିଷ               | ଏହା କ’ଣ                                                                                                                                                                                 | କେଉଁଠାରେ ଡକ୍ୟୁମେଣ୍ଟ କରାଯାଇଛି                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**      | ଏଠାରେ ବର୍ଣ୍ଣିତ ଡ୍ୟାଶବୋର୍ଡ ପୃଷ୍ଠା + API: ଗୋଟିଏ କାର୍ଯ୍ୟକୁ ଅନେକ ପ୍ରଦାନକାରୀଙ୍କ ପାଖକୁ ବିସ୍ତାର କରେ (ସମାନ୍ତରାଳ କିମ୍ବା ସହଯୋଗମୂଳକ)।                                                              | ଏହି ମାର୍ଗଦର୍ଶିକା                             |
| `auto/chaos`        | Auto-Combo ମଡେଲ୍ id: ସମାନ୍ତରାଳ ବିସ୍ତାର, ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପାଇଁ ଗୋଟିଏ ମଡେଲ୍, ପ୍ରତ୍ୟେକ ପାଇଁ ଗୋଟିଏ ଅପ୍ଷ୍ଟ୍ରିମ୍ କଲ୍। ଏହା ତ୍ରୁଟି ଅନ୍ତଃକ୍ଷେପ ନୁହେଁ ([ବିବରଣୀ](#autochaos-parallel-fan-out))। | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos କମ୍ବୋ କନ୍ଫିଗ୍ | `config.chaos.enabled` ସହିତ ଏକ ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ କମ୍ବୋ ସମାନ ଭାବରେ ବିସ୍ତାର କରେ (କେବଳ API); `judgeModel` କେବଳ ଚୂଡ଼ାନ୍ତ ଉତ୍ତର ବାଛେ, କୌଣସି ସଂଶ୍ଳେଷଣ କଲ୍ ନାହିଁ।                           | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: ସମାନ୍ତରାଳ ବିସ୍ତାର

`auto/chaos` କୌଣସି ତ୍ରୁଟି-ଅନ୍ତଃକ୍ଷେପ କିମ୍ବା ସ୍ଥିତିସ୍ଥାପକତା-ପରୀକ୍ଷଣ ନିୟନ୍ତ୍ରଣ ନୁହେଁ। `/v1/chat/completions`ରେ
`model: "auto/chaos"` ଅନୁରୋଧ କରିବା:

1. **ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପାଇଁ ଗୋଟିଏ ମଡେଲ୍** ବିଶିଷ୍ଟ ଏକ ପ୍ୟାନେଲ୍ ତିଆରି କରେ: ପ୍ରତ୍ୟେକ
   ସଂଯୁକ୍ତ ପ୍ରଦାନକାରୀଙ୍କ ପ୍ରଥମ ପ୍ରାର୍ଥୀ, ପ୍ରାର୍ଥୀ-ପୁଲ୍ କ୍ରମରେ, ସର୍ବାଧିକ 5 ଜଣ ସଦସ୍ୟ ପର୍ଯ୍ୟନ୍ତ
   (`OMNIROUTE_CHAOS_MAX_PANEL`, ସର୍ବାଧିକ 10ରେ ସୀମିତ)
   (`open-sse/services/autoCombo/virtualFactory.ts`)। `chaos-mode` ଓଜନ
   ପ୍ୟାକ୍ କେବଳ ପ୍ରତ୍ୟେକ ସଦସ୍ୟଙ୍କ `weight` ସେଟ୍ କରେ; ବିସ୍ତାର ଏହାକୁ ପଢ଼େ ନାହିଁ।
2. ସମାନ ଅନୁରୋଧକୁ ପ୍ୟାନେଲ୍ର ପ୍ରତ୍ୟେକ ସଦସ୍ୟଙ୍କ ନିକଟକୁ **ସମାନ୍ତରାଳ ଭାବରେ** ପଠାଏ, ତେଣୁ ଗୋଟିଏ ଅନୁରୋଧ
   ପାଇଁ ପ୍ୟାନେଲ୍ର ପ୍ରତ୍ୟେକ ସଦସ୍ୟ ପିଛା ଗୋଟିଏ ଅପ୍ଷ୍ଟ୍ରିମ୍ କଲ୍ ଖର୍ଚ୍ଚ ହୁଏ
   (`open-sse/services/autoCombo/chaosEngine.ts`, ଏଠାରୁ ପ୍ରେରିତ:
   `open-sse/services/combo.ts`)।
3. ପ୍ୟାନେଲ୍ର ପ୍ରତ୍ୟେକ ସଦସ୍ୟଙ୍କ ଫଳାଫଳ ପହଞ୍ଚିବା ସହିତ ଗୋଟିଏ ସ୍ଥିତି ଧାଡ଼ି ଷ୍ଟ୍ରିମ୍ କରେ: ଡିଫଲ୍ଟ ଭାବରେ ଗୋଟିଏ SSE ମନ୍ତବ୍ୟ
   (`: chaos <index> ok|fail <model>`), ଏବଂ ଅନୁରୋଧରେ
   `stream_options.include_chaos_parts: true` ସେଟ୍ କରାଯାଇଥିଲେ ଏକ `omni-chaos-part`
   ଇଭେଣ୍ଟ (`model`, `index`, `ok`, `error`)। ଏଗୁଡ଼ିକରେ କୌଣସି ଉତ୍ତର ପାଠ୍ୟ ନଥାଏ।
4. ଚୂଡ଼ାନ୍ତ OpenAI-ଶୈଳୀ ଚଙ୍କ୍ ଭାବରେ **ଗୋଟିଏ** ପ୍ୟାନେଲ୍ ଉତ୍ତର ପଠାଏ: ପ୍ରଥମ ପ୍ୟାନେଲ୍
   ସଦସ୍ୟଙ୍କ ଉତ୍ତର (`auto/chaos` ଏହାକୁ `judgeModel` ଭାବେ ସେଟ୍ କରେ), ଯଦି ତାହା ସଫଳ ହୁଏ; ଅନ୍ୟଥା
   ଶେଷ ସଫଳ ସଦସ୍ୟଙ୍କ ଉତ୍ତର। ପ୍ୟାନେଲ୍ର ଅନ୍ୟ ଉତ୍ତରଗୁଡ଼ିକ ଫେରସ୍ତ କରାଯାଏ ନାହିଁ, ତେଣୁ
   ଆପଣ Nଟି କଲ୍ ପାଇଁ ଦେୟ ଦିଅନ୍ତି ଏବଂ ଗୋଟିଏ କମ୍ପ୍ଲିସନ୍ ପାଆନ୍ତି।

## ସେଟଅପ୍।

1. ଖୋଲନ୍ତୁ।** ଡ୍ୟାସବୋର୍ଡ → ବିଶୃଙ୍ଖଳା ମୋଡ୍।** (`/dashboard/chaos`)
2. ଏହାକୁ ଟର୍ନ୍ କର।** ଉପରେ** — ବିଶୃଙ୍ଖଳା ମୋଡ୍ ଜାହାଜ।** ଡିଫଲ୍ଟ ଭାବରେ ଅକ୍ଷମ ହୋଇଛି।** (`enabled: false` ରେ `src/lib/chaos/chaosConfig.ts`) ଅକ୍ଷମ ଥିବାବେଳେ, `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` ଉତ୍ତର ଦେଇଥାଏ।
3. ଅଂଶଗ୍ରହଣକାରୀ ଏବଂ ଡିଫଲ୍ଟଗୁଡିକ ବାଛନ୍ତୁ (ସେଟିଂସମୂହ ଷ୍ଟୋର ମାଧ୍ୟମରେ ପ୍ରତି ଉଦାହରଣରେ ସ୍ଥିର):

   | କ୍ଷେତ୍ର             | ଅର୍ଥ                                                                    | ଡିଫଲ୍ଟ / ସୀମା                                    |
   | ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
   | `enabled`           | ମାଷ୍ଟର ସୁଇଚ୍।                                                           | `false`                                          |
   | `defaultMode`       | `parallel` କିମ୍ବା `collaborative` (ତଳେ ଦେଖନ୍ତୁ)                         | `parallel`                                       |
   | `providerOverrides` | ପ୍ରତି-ପ୍ରଦାନକାରୀ ଅଂଶଗ୍ରହଣ (`providerId`, ଇଚ୍ଛାଧୀନ `modelId`, `enabled`) | ପ୍ରତ୍ୟେକ ସକ୍ରିୟ ପ୍ରଦାନକାରୀ ଖାଲି =, ସର୍ବାଧିକ 200। |
   | `systemPrompt`      | ବିଲ୍ଟ-ଇନ୍ ବିଶୃଙ୍ଖଳା ସିଷ୍ଟମ୍ ପ୍ରମ୍ପ୍ଟ ପାଇଁ ନବଲିଖନ କରନ୍ତୁ।                | ବ al କଳ୍ପିକ, ସର୍ବାଧିକ 10 000 ଅକ୍ଷର।              |
   | `timeoutMs`         | ମଡେଲ୍ କଲ୍ ପାଇଁ ସର୍ବାଧିକ ସମୟ।                                            | `120000` (5 000–600 000)                         |
   | `maxTokens`         | `max_tokens` ପ୍ରତି ମଡେଲ୍ କଲ୍।                                           | `4096` (256–128 000)                             |

4. ପ୍ରତ୍ୟେକ ଅଂଶଗ୍ରହଣକାରୀ ପ୍ରଦାନକାରୀଙ୍କୁ ଦିଅନ୍ତୁ a** ମଡେଲ୍** । ଏକ ପ୍ରଦାନକାରୀଙ୍କ ମଡେଲ୍ ହେଉଛି ବିଶୃଙ୍ଖଳା ମୋଡ୍ ପୃଷ୍ଠାରେ ଏହାର ସକ୍ଷମ ହୋଇଥିବା ଓଭରବାଇଡ୍ ର `modelId` (ଏହା ଜିତେ), ଅନ୍ୟଥା** ଡିଫଲ୍ଟ ମଡେଲ୍।** ଏହାର ସଂଯୋଗର। ଏକ ପ୍ରଦାନକାରୀ id କେବେବି ମଡେଲ ନାମ ଭାବରେ ବ୍ୟବହୃତ ହୁଏ ନାହିଁ। ନା ଏକ ପ୍ରଦାନକାରୀ।** ଡକାଯାଇ ନାହିଁ** : ଏହା ଫଳାଫଳଗୁଡିକରେ `status: "error"` ଭାବରେ ଦେଖାଯାଏ _ "ଏହି ପ୍ରଦାନକାରୀ ପାଇଁ କ model ଣସି ମଡେଲ୍ ସେଟ୍ ହୋଇନାହିଁ। ବିଶୃଙ୍ଖଳା ମୋଡ୍ ପୃଷ୍ଠାରେ ଏହା ପାଇଁ ଏକ ମଡେଲ୍ ସେଟ୍ କରନ୍ତୁ କିମ୍ବା ସଂଯୋଗରେ ଏକ ଡିଫଲ୍ଟ ମଡେଲ୍ ସେଟ୍ କରନ୍ତୁ।" _ ଏବଂ ଏକ ଖାଲି `modelId`, ଯେତେବେଳେ ଅନ୍ୟ ପ୍ରଦାନକାରୀମାନେ ସାଧାରଣ ଭାବରେ ଚଲାନ୍ତି। ଯଦି କ selected ଣସି ମନୋନୀତ ପ୍ରଦାନକାରୀଙ୍କର ଏକ ମଡେଲ୍ ନାହିଁ, _ "କ prov ଣସି ପ୍ରଦାନକାରୀଙ୍କର ମଡେଲ୍ ସେଟ୍ ନାହିଁ।" _ (ଉଭୟ ଏଣ୍ଡପଏଣ୍ଟରେHTTP 500) ସହିତ କ up ଣସି ଅପଷ୍ଟ୍ରିମ୍ ଅନୁରୋଧ ପୂର୍ବରୁ ଚାଲିବା ବିଫଳ ହୁଏ।
5. ଚଲାନ୍ତୁ a** ନିଜେ ପୃଷ୍ଠାରୁ ପରୀକ୍ଷା କର।** — ଫଳାଫଳ ପ୍ୟାନେଲ୍ ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀଙ୍କ ଉତ୍ତର, ସ୍ଥିତି ଏବଂ ଅବଧି ଦର୍ଶାଏ।

## ନିଷ୍ପାଦନ ମୋଡ୍ଗୁଡ଼ିକ

- **`parallel`** — ପ୍ରତ୍ୟେକ ମଡେଲ୍ ଏକାସାଙ୍ଗରେ ସମାନ କାର୍ଯ୍ୟ ପାଏ; ଆପଣ ସମସ୍ତ ଉତ୍ତର
  ସ୍ୱାଧୀନ ଭାବରେ ପାଆନ୍ତି।
- **`collaborative`** — ମଡେଲ୍ଗୁଡ଼ିକ **ଏକ ଶୃଙ୍ଖଳରେ** ଚାଲେ: ପ୍ରତ୍ୟେକଟି ପୂର୍ବ ମଡେଲ୍ର ଆଉଟ୍ପୁଟ୍ ଦେଖେ ଏବଂ
  ତାହାକୁ ପରିଷ୍କୃତ, ବିସ୍ତାରିତ, ସମାଲୋଚନା କରିବା କିମ୍ବା ଏକ ବିକଳ୍ପ ପ୍ରଦାନ କରିବାକୁ କୁହାଯାଏ। ପ୍ରତିକ୍ରିୟାର `summary` ଫିଲ୍ଡ
  ସଫଳ ଆଉଟ୍ପୁଟ୍ଗୁଡ଼ିକୁ ଶୃଙ୍ଖଳ କ୍ରମରେ ସଂଯୋଜିତ କରେ (`parallel` ରନ୍ଗୁଡ଼ିକରେ `summary` ନଥାଏ)।

## API

### `POST /api/chaos/run` — ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ।

କୁକି-ପ୍ରାମାଣିକିକରଣ (ପରିଚାଳନା ଅଧିବେଶନ — [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ଦେଖନ୍ତୁ); ଡ୍ୟାସବୋର୍ଡ ପୃଷ୍ଠା ଦ୍ୱାରା ବ୍ୟବହୃତ।

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

### `POST /api/skills/collect/chaos` — API କି

ବାହ୍ୟ କଲ୍ ପାଇଁ ବିୟର-ଟୋକେନ୍ ପ୍ରକାର। ଚାବି ନିଶ୍ଚୟ ବହନ କରିବ।** ବିଶୃଙ୍ଖଳା ମୋଡ୍ ଅନୁମତି।** (`chaosModeEnabled`), ଯାହା ହେଉଛି।** ଡିଫଲ୍ଟ ଭାବରେ ବନ୍ଦ।** — ଏହାକୁ ପ୍ରତି କିରେ ସକ୍ଷମ କରେ।** ଡ୍ୟାସବୋର୍ଡ → API ମ୍ୟାନେଜର୍ → ସଂପାଦନ କୀ → ଅନୁମତି → ବିଶୃଙ୍ଖଳା ମୋଡ୍।** । ଉପର ପରି ସମାନ ଶରୀର।

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

ଉଭୟ ଶେଷ ପଏଣ୍ଟ ସମାନ ଆକାର ଫେରାଇଥାଏ:

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

## ତ୍ରୁଟି ନିବାରଣ

- **`400 Chaos Mode is not enabled`** — ଷ୍ଟେପ୍ 2 ଉପରେ: ଗ୍ଲୋବାଲ୍ ସୁଇଚ୍ ଅଫ୍ ଅଛି।
- **API କି `/api/skills/collect/chaos` ରେ ପ୍ରତ୍ୟାଖ୍ୟାନ ହୁଏ।** — ଚାବିରେ ପ୍ରତି କିରେ `chaosModeEnabled` ଅନୁମତିର ଅଭାବ ଅଛି (ଡିଫଲ୍ଟ ଭାବରେ ବନ୍ଦ; ଏହା ଏକ ସେଟିଂ, ତ୍ରୁଟି ନୁହେଁ)।
- **ଏକ ପ୍ରଦାନକାରୀ `No model set for this provider` ଦେଖାଏ।** — ଏହାର ମଡେଲକୁ ବିଶୃଙ୍ଖଳା ମୋଡ୍ ପୃଷ୍ଠାରେ କିମ୍ବା ଏହାର ସଂଯୋଗରେ ଏକ ଡିଫଲ୍ଟ ମଡେଲ୍ ସେଟ୍ କରେ (ସେଟଅପ୍, ଷ୍ଟେପ୍ 4 ଦେଖନ୍ତୁ)।
- **ଆପଣ ଆଶା କରୁଥିବା ଏକ ପ୍ରଦାନକାରୀ ଫଳାଫଳରୁ ଅନୁପସ୍ଥିତ।** ବିଶୃଙ୍ଖଳା ମୋଡ୍ ପୃଷ୍ଠାରେ — ଯାଞ୍ଚ `providerOverrides` (ଏକ ଅକ୍ଷମ ହୋଇଥିବା ଓଭରଡାଇଡ୍ ଏହାକୁ ବାଦ ଦେଇଥାଏ) ଏବଂ ପ୍ରଦାନକାରୀ ସଂଯୋଗ ସକ୍ରିୟ ଅଛି କି ନାହିଁ।
