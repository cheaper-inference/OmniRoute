# Chaos Mode (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (ဘေးဘက်မီနူး) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (dashboard session) · `POST /api/skills/collect/chaos` (API key)  
> **Source:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode သည် **လုပ်ဆောင်စရာတစ်ခုကို provider အများအပြားထံ တစ်ပြိုင်နက် ပေးပို့သည်** — ပါဝင်သည့် provider တစ်ခုစီက model instance တစ်ခုစီ ပံ့ပိုးပြီး၊ အဖြေအားလုံးကို ဘေးချင်းယှဉ်၍ (သို့မဟုတ် ဆက်တိုက်ချိတ်ဆက်၍) ရရှိမည်ဖြစ်သည်။ ၎င်းသည် routing strategy မဟုတ်ဘဲ multi-model execution surface တစ်ခုဖြစ်သည်။ သင်၏ ပုံမှန် `/v1/chat/completions` traffic ကို ၎င်းက မည်သည့်အခါမျှ သက်ရောက်မှုမရှိပါ။

**ရှင်းလင်းချက် — အမည်တွင် "chaos" ပါဝင်သော မတူညီသည့်အရာ သုံးမျိုး ပါရှိသည်-**

| အရာ                | ၎င်းသည် မည်သည့်အရာဖြစ်သနည်း                                                                                                                                                                                | မှတ်တမ်းတင်ထားသည့်နေရာ                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**     | ဤနေရာတွင် ဖော်ပြထားသည့် dashboard စာမျက်နှာ + API ဖြစ်ပြီး၊ လုပ်ဆောင်စရာတစ်ခုကို provider အများအပြားထံ ဖြန့်ပို့သည် (အပြိုင် သို့မဟုတ် ပူးပေါင်းဆောင်ရွက်မှုဖြင့်)။                                        | ဤလမ်းညွှန်                                   |
| `auto/chaos`       | Auto-Combo model id ဖြစ်သည်- provider တစ်ခုလျှင် model တစ်ခုဖြင့် အပြိုင်ဖြန့်ပို့ပြီး၊ တစ်ခုစီအတွက် upstream call တစ်ကြိမ် ပြုလုပ်သည်။ Fault injection မဟုတ်ပါ ([အသေးစိတ်](#autochaos-parallel-fan-out))။ | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo config | `config.chaos.enabled` ပါဝင်သော သိမ်းဆည်းထားသည့် combo တစ်ခုသည် အလားတူနည်းဖြင့် ဖြန့်ပို့သည် (API မှသာ အသုံးပြုနိုင်သည်)။ `judgeModel` သည် နောက်ဆုံးအဖြေကိုသာ ရွေးချယ်ပြီး synthesis call မပြုလုပ်ပါ။      | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: အပြိုင်ဖြန့်ပို့ခြင်း

`auto/chaos` သည် fault-injection သို့မဟုတ် resilience-testing အတွက် ချိန်ညှိခလုတ်တစ်ခု **မဟုတ်ပါ**။ `/v1/chat/completions` တွင် `model: "auto/chaos"` ဖြင့် တောင်းဆိုပါက-

1. **provider တစ်ခုလျှင် model တစ်ခု** ပါဝင်သော panel တစ်ခုကို တည်ဆောက်သည်- ချိတ်ဆက်ထားသည့် provider တစ်ခုစီ၏ ပထမဆုံး candidate ကို candidate-pool အစီအစဉ်အတိုင်း ရွေးချယ်ပြီး အများဆုံး အဖွဲ့ဝင် 5 ခုအထိ ထည့်သွင်းသည်
   (`OMNIROUTE_CHAOS_MAX_PANEL`၊ အများဆုံး 10 အဖြစ် ကန့်သတ်ထားသည်)
   (`open-sse/services/autoCombo/virtualFactory.ts`)။ `chaos-mode` weight
   pack သည် အဖွဲ့ဝင်တစ်ခုစီ၏ `weight` ကိုသာ သတ်မှတ်ပြီး၊ ဖြန့်ပို့မှုက ၎င်းကို ဖတ်ရှုအသုံးမပြုပါ။
2. တူညီသော request ကို panel အဖွဲ့ဝင်အားလုံးထံ **အပြိုင်** ပေးပို့သောကြောင့် request တစ်ခုအတွက် panel အဖွဲ့ဝင်တစ်ခုလျှင် upstream call တစ်ကြိမ် ကုန်ကျသည်
   (`open-sse/services/autoCombo/chaosEngine.ts` မှ၊
   `open-sse/services/combo.ts` က ပေးပို့သည်)။
3. Panel အဖွဲ့ဝင်တစ်ခုစီ၏ ရလဒ် ရောက်ရှိလာသည်နှင့် status စာကြောင်းတစ်ကြောင်းစီကို stream လုပ်သည်- မူလသတ်မှတ်ချက်အရ SSE comment
   (`: chaos <index> ok|fail <model>`) တစ်ခုဖြစ်ပြီး၊ request တွင်
   `stream_options.include_chaos_parts: true` သတ်မှတ်ထားပါက `omni-chaos-part`
   event (`model`, `index`, `ok`, `error`) ကိုပါ ပေးပို့သည်။ ၎င်းတို့တွင် အဖြေစာသား မပါဝင်ပါ။
4. Panel အဖြေ **တစ်ခု** ကို နောက်ဆုံး OpenAI ပုံစံ chunk အဖြစ် ပေးပို့သည်- ပထမဆုံး panel
   အဖွဲ့ဝင်၏ အဖြေ (`auto/chaos` က ၎င်းကို `judgeModel` အဖြစ် သတ်မှတ်သည်) အောင်မြင်ပါက ထိုအဖြေကို အသုံးပြုပြီး၊ မအောင်မြင်ပါက နောက်ဆုံး အောင်မြင်ခဲ့သော အဖွဲ့ဝင်၏ အဖြေကို အသုံးပြုသည်။ အခြား panel အဖြေများကို ပြန်မပေးသောကြောင့် call N ကြိမ်အတွက် ကုန်ကျပြီး completion တစ်ခုသာ ရရှိမည်ဖြစ်သည်။

## တည်ဆောက်သည်

1. ဖွင့်သည်။** ဒက်ရှ်ဘုတ် → Chaos မုဒ်** (`/dashboard/chaos`) ။
2. လှည့်ပါ။** on** — Chaos Mode သင်္ဘောများ** ပုံမှန်အားဖြင့် ပိတ်ထားသည်။** (`enabled: false` in `src/lib/chaos/chaosConfig.ts`)။ ပိတ်ထားစဉ်တွင် `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` ကိုဖြေသည်။
3. ပါဝင်သူများနှင့် ပုံသေများကို ရွေးပါ (ဆက်တင်များစတိုးမှတဆင့် ဆက်လက်လုပ်ဆောင်နေသည်)

   | လယ်ကွင်း            | အဓိပ္ပါယ်                                                                                    | ပုံသေ/ကန့်သတ်ချက်များ                         |
   | ------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------- |
   | `enabled`           | မာစတာခလုတ်                                                                                   | `false`                                       |
   | `defaultMode`       | `parallel` သို့မဟုတ် `collaborative` (အောက်တွင်ကြည့်ပါ)                                      | `parallel`                                    |
   | `providerOverrides` | ဝန်ဆောင်မှုပေးသူ တစ်ဦးချင်း ပါဝင်ခြင်း (`providerId`၊ ရွေးချယ်နိုင်သော `modelId`၊ `enabled`) | empty = every active provider, max 200        |
   | `systemPrompt`      | Built-in Chaos စနစ်အမှာစာအတွက် ထပ်ရေးပါ။                                                     | ရွေးချယ်နိုင်သည်၊ အများဆုံး 10 000 စာလုံးများ |
   | `timeoutMs`         | မော်ဒယ်ခေါ်ဆိုမှုတစ်ခုအတွက် အများဆုံးအချိန်                                                  | `120000` (5 000–600 000)                      |
   | `maxTokens`         | မော်ဒယ်ခေါ်ဆိုမှုအလိုက်`max_tokens`                                                          | `4096` (256–128 000)                          |

4. ပါဝင်ပံ့ပိုးပေးသူတိုင်းကို တစ်ခုပေးပါ။** မော်ဒယ်** . ဝန်ဆောင်မှုပေးသူ၏ မော်ဒယ်သည် Chaos Mode စာမျက်နှာပေါ်ရှိ ၎င်း၏ ဖွင့်ထားသော အစားထိုးမှု၏ `modelId` (၎င်းသည် အနိုင်ရသည်)၊ သို့မဟုတ်ပါက၊** မူရင်းမော်ဒယ်** ၎င်း၏ချိတ်ဆက်မှု။ ဝန်ဆောင်မှုပေးသူ ID ကို မော်ဒယ်အမည်အဖြစ် ဘယ်တော့မှ အသုံးမပြုပါ။ ပေးသူလည်း မရှိ။** မခေါ်ပါ။** : ရလဒ်များတွင် `status: "error"` အဖြစ် ပေါ်လာသည် _"ဤဝန်ဆောင်မှုပေးသူအတွက် မော်ဒယ်သတ်မှတ်ထားခြင်းမရှိပါ။ Chaos Mode စာမျက်နှာ သို့မဟုတ် ချိတ်ဆက်မှုပေါ်ရှိ ပုံသေပုံစံတစ်ခုတွင် ၎င်းအတွက် မော်ဒယ်ကို သတ်မှတ်ပါ။"_ နှင့် အလွတ် `modelId`၊ အခြားဝန်ဆောင်မှုပေးသူများသည် ပုံမှန်အတိုင်း လုပ်ဆောင်နေပါသည်။ ရွေးချယ်ထားသောဝန်ဆောင်မှုပေးသူတွင် မော်ဒယ်တစ်ခုမရှိပါက၊ _"ဝန်ဆောင်မှုပေးသူတွင် မော်ဒယ်သတ်မှတ်ထားခြင်းမရှိပါ။ ..."_ (HTTP 500) နှင့် အထက်ရေစီးကြောင်းတောင်းဆိုမှု တစ်စုံတစ်ရာမပြုလုပ်မီ ပြေးခြင်းသည် ပျက်သွားပါသည်။
5. တစ်ပြေး** စာမျက်နှာကိုယ်တိုင်စမ်းသပ်ပါ။** — ရလဒ်အကန့်သည် ဝန်ဆောင်မှုပေးသူတိုင်း၏ အဖြေ၊ အခြေအနေနှင့် ကြာချိန်ကို ပြသသည်။

## လုပ်ဆောင်မှုမုဒ်များ

- **`parallel`** — မော်ဒယ်တိုင်းသည် တူညီသော လုပ်ဆောင်စရာကို တစ်ပြိုင်နက် ရရှိပြီး အဖြေအားလုံးကို သီးခြားစီ ရရှိမည်။
- **`collaborative`** — မော်ဒယ်များကို **ကွင်းဆက်အလိုက်** လုပ်ဆောင်သည်။ မော်ဒယ်တစ်ခုစီသည် ယခင်မော်ဒယ်၏ output ကို မြင်ရပြီး ၎င်းကို ပိုမိုကောင်းမွန်စေရန်၊ တိုးချဲ့ရန်၊ ဝေဖန်သုံးသပ်ရန် သို့မဟုတ် အခြားရွေးချယ်စရာတစ်ခု ပေးရန် တောင်းဆိုခံရသည်။ တုံ့ပြန်မှု၏ `summary` နယ်ပယ်သည် အောင်မြင်သော output များကို ကွင်းဆက်အစီအစဉ်အတိုင်း ဆက်စပ်ပေါင်းစည်းပေးသည် (`parallel` လုပ်ဆောင်မှုများတွင် `summary` မပါဝင်ပါ)။

## API

### `POST /api/chaos/run` — ဒက်ရှ်ဘုတ် ဆက်ရှင်

Cookie-authenticated (စီမံခန့်ခွဲမှုစက်ရှင် — ကြည့်ပါ [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); ဒက်ရှ်ဘုတ်စာမျက်နှာတွင် အသုံးပြုသည်။

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

### `POST /api/skills/collect/chaos` — API သော့

ပြင်ပခေါ်ဆိုသူများအတွက် Bearer-token မူကွဲ။ သော့ဆောင်ထားရမယ်။** Chaos Mode ခွင့်ပြုချက်** (`chaosModeEnabled`) ဟူသည်မှာ၊** ပုံသေအားဖြင့် ပိတ်သည်။** — သော့တစ်ခုအတွင်း ၎င်းကိုဖွင့်ပါ။** ဒက်ရှ်ဘုတ် → API မန်နေဂျာ → တည်းဖြတ်သော့ → ခွင့်ပြုချက်များ → Chaos မုဒ်** . အပေါ်ကပုံအတိုင်းပါပဲ။

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

အဆုံးမှတ်နှစ်ခုလုံးသည် တူညီသောပုံစံကို ပြန်ပေးသည်-

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

## ပြသာနာရှာဖွေရှင်းပေးခြင်း

- **`400 Chaos Mode is not enabled`** — အဆင့် 2 အထက်တွင်- ကမ္ဘာလုံးဆိုင်ရာခလုတ်ကို ပိတ်ထားသည်။
- **API သော့သည် `/api/skills/collect/chaos` တွင် ငြင်းပယ်ခံရသည်။** — သော့သည် per-key `chaosModeEnabled` ခွင့်ပြုချက်မရှိပါ (ပုံမှန်အားဖြင့် ပိတ်သည်၊ ၎င်းသည် ဆက်တင်တစ်ခုဖြစ်ပြီး အမှားအယွင်းတစ်ခုမဟုတ်)။
- **ဝန်ဆောင်မှုပေးသူတစ်ဦးသည် `No model set for this provider` ပြသသည်။** — ၎င်း၏မော်ဒယ်ကို Chaos Mode စာမျက်နှာတွင် သို့မဟုတ် ၎င်း၏ချိတ်ဆက်မှုတွင် ပုံသေမော်ဒယ်အဖြစ် သတ်မှတ်ပါ (တပ်ဆင်ခြင်း အဆင့် 4 ကိုကြည့်ပါ)။
- **သင်မျှော်လင့်ထားသည့် ဝန်ဆောင်မှုပေးသူတစ်ဦးသည် ရလဒ်များမှ ပျောက်ဆုံးနေပါသည်။** — Chaos Mode စာမျက်နှာပေါ်ရှိ `providerOverrides` စစ်ဆေးပါ (ပိတ်ထားသော override သည် ၎င်းကိုဖယ်ထုတ်ထားသည်) နှင့် ဝန်ဆောင်မှုပေးသူချိတ်ဆက်မှုသည် အသက်ဝင်သည်ဖြစ်စေ၊
