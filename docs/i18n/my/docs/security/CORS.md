# CORS Configuration & Security (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute မည်သည့်အရာကို ထိန်းချုပ်သည်။**browser ဇစ်မြစ်** တစ်ခုတည်းသော ဗဟိုချုပ်ကိုင်မှု ခွင့်ပြုစာရင်းမှ မူရင်း တုံ့ပြန်ချက်များကို ဖတ်နိုင်သည်။ မော်ဒယ်က **ပျက်ကွက်-ပုံမှန်အားဖြင့် ပိတ်ထားသည်။** − သင်ရွေးချယ်သည့်အချိန်အထိ မည်သည့်ဇာစ်မြစ်ကိုမျှ ခွင့်မပြုပါ။ ဤစာမျက်နှာတွင် ခွင့်ပြုစာရင်းမှ ဖြေရှင်းပုံ၊ `CORS_ALLOW_ALL=true` အမှန်တကယ် ဖော်ထုတ်ထားသည်များကို မှတ်တမ်းတင်ထားပါသည် (နှင့် အရေးကြီးသည်မှာ၊ ၎င်းသည် မည်သည့်အရာဖြစ်သည်၊**မဟုတ်ဘူး** ) dev နှင့် ထုတ်လုပ်မှုကို လုံခြုံစွာ စီစဉ်သတ်မှတ်နည်း၊ နှင့် runtime သတိပေးချက်သည် ဒက်ရှ်ဘုတ်တွင် wildcard တစ်ခု တိုက်ရိုက်လွှင့်နေချိန်တွင် ပြသသည်။

**အမှန်တရားအရင်းအမြစ်-** `src/server/cors/origins.ts` (`resolveAllowedOrigin`၊ `applyCorsHeaders`၊ `getCorsStatus`)။ ခွင့်ပြုစာရင်းကို တစ်ကြိမ်အသုံးပြုပြီး၊ အလယ်တန်းဆော့ဖ်ဝဲ (`src/server/authz/pipeline.ts`) — တွင် လမ်းကြောင်းတစ်ခုစီကို ကိုင်တွယ်သူများသည် `Access-Control-Allow-Origin` ၎င်းတို့ကို မသတ်မှတ်ထားပေ။

## ဇာစ်မြစ်ကို ဘယ်လိုဖြေရှင်းမလဲ။

တောင်းဆိုမှုတစ်ခုစီအတွက် Middleware သည် ဤအစီစဥ်တွင် `Access-Control-Allow-Origin` တန်ဖိုးကိုတွက်ချက်သည်-

1. **`CORS_ALLOW_ALL=true`** (သို့မဟုတ် အမွေအနှစ် `CORS_ORIGIN=*`) → ခေါ်ဆိုသူ၏ သံယောင်သံ `Origin` နောက် (သို့မဟုတ် `*` မရှိသောအခါ `Origin` header) နှင့် `Vary: Origin` ထို့ကြောင့် ကက်ရှ်များ မှန်ကန်နေပါစေ။ အတူတူ `applyCorsHeaders()` chokepoint လည်း ပါပါသည်။ `Vary: Accept-Encoding` တိုကင်-စစ်မှန်ကြောင်းသက်သေပြထားသော 2xx-with-body တုံ့ပြန်မှုတိုင်းအတွက် `/v1*`/`/v1beta*` မျက်နှာပြင် (`relaxForTokenAuth`, RFC 9110 §12.5.5၊ ပြဿနာ #6737) ဒါဆို downstream/shared ကက်ရှ်များသည် ဖိသိပ်ထားသည်နှင့် ဖိသိပ်မထားသော မျိုးကွဲများကို မှန်ကန်စွာ ခွဲခြားနိုင်သည်။
2. မဟုတ်ပါက၊ တောင်းဆိုချက် `Origin` ကို ပုံမှန်ပုံစံပြုလုပ်ထားသည် (အသေးစား၊ ကပ်နေသောမျဉ်းစောင်းများကို ဖယ်ရှားထားသည်) နှင့် ကိုက်ညီသည်**ပေါင်းစည်းခွင့်ပြုစာရင်း** :
   - env **`CORS_ALLOWED_ORIGINS`** — ကော်မာ ခြားထားသော စာရင်း နှင့်
   - runtime **`corsOrigins`** ဆက်တင် (Dashboard → Security → _CORS Allowed Origins_)၊ `src/lib/config/runtimeSettings.ts` မှ `setRuntimeAllowedOrigins()` မှ တစ်ဆင့် ထိုးသွင်းသည်။
3. → နှင့် ကိုက်ညီမှုမရှိပါ။**`Access-Control-Allow-Origin` ခေါင်းစီးကို ထုတ်လွှတ်ခြင်းမရှိပါ။** . ဘရောင်ဇာသည် မူရင်းဖတ်ခြင်းကို ပိတ်ဆို့သည်။ ဤသည်မှာ ရည်ရွယ်ထားသော ပျက်ကွက်-ပိတ်သည့် ပုံသေဖြစ်သည်။

| Env var                | အဓိပ္ပါယ်                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ခွင့်ပြုရန် အတိအကျ မူရင်းဇစ်မြစ်များ၏CSV (အကြံပြုထားသည်)။                                               |
| `CORS_ALLOW_ALL`       | `true`/`1` → မည်သည့်ဇာစ်မြစ် (wildcard) ကိုမဆို သံယောင်လိုက်ပါသည်။ Dev သာ။                              |
| `CORS_ORIGIN`          | အမွေအနှစ်။ `*` `CORS_ALLOW_ALL` ကဲ့သို့ ပြုမူသည်။ တစ်ခုတည်းသောတန်ဖိုးကို ခွင့်ပြုစာရင်းတွင် ထည့်ထားသည်။ |

## ခြိမ်းခြောက်မှု မော်ဒယ် — သည် `CORS_ALLOW_ALL=true` အမှန်တကယ် ထုတ်ဖော်သည်။

ယေဘူယျ OWASP သတိပေးချက် ("wildcard CORS = မည်သည့်ဆိုက်မဆို သင့် API ဟုခေါ်ဆိုနိုင်သည်") သည် အလေးအနက်ထားသင့်သော်လည်း OmniRoute၏ ထိတွေ့မှုသည်၊**ယေဘူယျကိစ္စထက် ပိုကျဉ်းတယ်။** တိကျသေချာသော အကောင်အထည်ဖော်မှုတစ်ခုကြောင့်၊

> **ဗဟို `applyCorsHeaders()` `Access-Control-Allow-Credentials` ဘယ်သောအခါမှ မထုတ်လွှတ်ပါ။** ဆာဗာမှ `Access-Control-Allow-Credentials: true` မပေးပို့ပါက ဘရောက်ဆာသည် _credentialed_ (cookie-bearing) အရင်းခံဖြတ်ကျော်တုံ့ပြန်မှုကို ဖော်ထုတ်မည်မဟုတ်ပါ။ OmniRoute's shared CORS လမ်းကြောင်းကို ဘယ်တော့မှ မလုပ်ဘူး။

`CORS_ALLOW_ALL=true` နှင့်ပင် မျက်နှာပြင်တစ်ခုစီကို ဆိုလိုသည်။

| အပေါ်ယံ                                     | Auth ယန္တရား                   | CORS သင်္ကေတ၏အကျိုးသက်ရောက်မှု                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ဒက်ရှ်ဘုတ် / MANAGEMENT `/api/*`            | ကွတ်ကီးကဏ္ဍ                    | မူလက ပဲ့တင်ထပ်သော်လည်း၊**`Allow-Credentials` မပါဘဲ** browser ကို**တုံး** credentialed ကိုဖတ်ပါ။ အန္တရာယ်ရှိသော မူရင်းဆိုက်တစ်ခု**ဖတ်လို့မရဘူး** သင်၏စစ်မှန်ကြောင်းသက်သေပြထားသော ဒက်ရှ်ဘုတ်တုံ့ပြန်မှုများနှင့် စက်ရှင်ကွတ်ကီးကို ထုတ်ဖော်ပြသခြင်းမပြုပါ။                                                                                                                                                                                                                                                                                                                                 |
| ဖောက်သည် API `/v1/*`၊ `/v1beta/*`           | Bearer / `x-api-key` ခေါင်းစီး | ခွင့်ပြုပြီးသား**ဒီဇိုင်းအားဖြင့်** (`relaxForTokenAuth`) : ဘရောက်ဆာများသည် `Authorization`/`x-api-key` တို့ကို အလိုအလျောက် တွဲပေးမည်မဟုတ်သောကြောင့် တိုက်ခိုက်သူ၏စာမျက်နှာသည် သင့်သော့ကို ပေးဆောင်နိုင်မည်မဟုတ်ပေ။ ဖြေလျှော့ထားသော ပဲ့တင်သံသည် စစ်မှန်ကြောင်း အတည်ပြုထားသော အကြောင်းအရာ (တရားဝင် API သော့ သို့မဟုတ် ဒက်ရှ်ဘုတ် စက်ရှင်)၊ အထောက်အထား ခေါင်းစီးတစ်ခုသာမက `Access-Control-Allow-Credentials` မပါဝင်ပါ။ အမည်မသိ တုံ့ပြန်မှုများ (`REQUIRE_API_KEY=false`) သည် တိကျသေချာသော `CORS_ALLOW_ALL=true` ရွေးချယ်မှု အပါအဝင် ပြင်ဆင်သတ်မှတ်ထားသော မူလခွင့်ပြုစာရင်းကို အသုံးပြုသည်။ |
| အများသူငှာ ဖတ်ရန်သီးသန့် (`/api/health`, …) | တစ်ခုမှ                        | အထိခိုက်မခံသော၊ wildcard သည် အန္တရာယ်မရှိပါ။                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

ဒါကြောင့်**ကျန်နေတဲ့** `CORS_ALLOW_ALL=true` ၏ ထိတွေ့မှုကို ကန့်သတ်ထားသည်- (က) အထောက်အထားမရှိသော ကူးသန်းရောင်းဝယ်ရေး-ဇာစ်မြစ်အတွက် ကန့်သတ်ထားသည်။**ဖတ်တယ်။** အထောက်အထားမခိုင်လုံသောဒေတာနှင့် (ခ) CORS ခွင့်ပြုခြင်း။**preflight pass** မူရင်းစာမျက်နှာတစ်ခုမှ မပေးနိုင်သည့် အထောက်အထားများ လိုအပ်နေသေးသည့် စီမံခန့်ခွဲမှုလမ်းကြောင်း — တွင်။ ၎င်းသည်**မဟုတ်ဘူး** မျှဝေထားသော CORS လမ်းကြောင်းရှိ session-hijack သို့မဟုတ် credential-theft vector။

### စစ်မှန်သောခြွင်းချက်တစ်ခု — `/api/v1/agents/`

Cloud-Agent လမ်းကြောင်းများ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) သည် ၎င်းတို့၏ သတ်မှတ်ချက်များ**ကိုယ်ပိုင်** CORS ခေါင်းစီးများ (`src/lib/cloudAgent/api.ts`၊ `getCloudAgentCorsHeaders`) နှင့်**လုပ်ပါ။** `Access-Control-Allow-Credentials: true` နှင့်အတူ `Access-Control-Allow-Origin: <origin>|*` ထုတ်လွှတ်သည်။ ဤသည်မှာ မူရင်း-ပဲ့တင်သံနှင့် အထောက်အထားများ ပူးတွဲတည်ရှိသည့် တစ်ခုတည်းသော မျက်နှာပြင်ဖြစ်ပြီး ၎င်းဖြစ်သည်။**`CORS_ALLOW_ALL`၏ သီးခြား** . ဤလမ်းကြောင်းများသည် စီမံခန့်ခွဲမှု-စစ်မှန်ကြောင်းအထောက်အထားပြထားသည် (`requireManagementAuth`); ဒက်ရှ်ဘုတ်ကို host ပြင်ပမှ ထုတ်ပြသော အော်ပရေတာများသည် ဤနေရာသည် တုံ့ပြန်မှုဆိုင်ရာ ခေါင်းစီးများမှ ခွင့်ပြုထားသည့် အရင်းအမြစ်ကို ဖြတ်ကျော်ထားသော အထောက်အထားဖြင့် ဖတ်ရှုနိုင်သည့်နေရာဖြစ်သည်ကို သတိပြုသင့်သည်။ ၎င်းအား ရှင်းလင်းပြတ်သားသော ခွင့်ပြုစာရင်းသို့ တင်းကြပ်ခြင်းသည် ဤ CORS လမ်းညွှန်ချက်မှ သီးခြားစီ ခြေရာခံပါသည်။

## ထုတ်လုပ်မှုစာရင်း

- **ထုတ်လုပ်မှုတွင် `CORS_ALLOW_ALL=true` ဘယ်တော့မှမသတ်မှတ်ပါ။** မသတ်မှတ်ထားပါ။
- တစ်ခုသတ်မှတ်ပါ။**ပြတ်သားသည်။** မူရင်းစာရင်း — env var သို့မဟုတ် Security-tab အကွက်-

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ပြောင်းပြန် proxy/tunnel (nginx၊ Caddy၊ Cloudflare Tunnel၊ Tailscale) နောက်ကွယ်တွင် အလုပ်လုပ်နေပါက CORS သည်**မဟုတ်ဘူး** သင်၏တစ်ခုတည်းသော — ထိန်းချုပ်မှုသည် loopback လမ်းကြောင်းအစောင့်သည် သားပေါက်နိုင်သောလမ်းကြောင်းများကို ဆက်လက်ကာကွယ်ပေးသည် ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ကြည့်ပါ)။ 403 ကို "ပြင်ဆင်ရန်" `X-Forwarded-For: 127.0.0.1` မဖန်တီးပါနှင့်။ RCE အတန်းကို ပြန်ဖွင့်ပြီး route guard ပိတ်ပါတယ်။
- runtime အခြေအနေအား အတည်ပြုပါ- ဒက်ရှ်ဘုတ်တွင် a **ပယင်းနဖူးစည်းစာတန်း** Dashboard အောက်တွင် → လုံခြုံရေး → ခွင့်ပြုချက်စာရင်းကို `CORS_ALLOW_ALL=true` တိုက်ရိုက်လွှင့်သည့်အခါတိုင်း `/api/settings/authz-inventory` `cors: { allowAll, allowedOrigins }` စာအိတ်ကို စောင့်ကြည့်ရေးကိရိယာများ စစ်တမ်းကောက်ယူနိုင်သည်။

## ဖွံ့ဖြိုးတိုးတက်မှု အဆင်ပြေစေရန် — သီးခြားဒေသတွင်း ဇစ်မြစ်များကို ခွင့်ပြုသည်။

dev မှာတောင် စာလုံးသင်္ကေတကို သင်လိုအပ်ခဲပါတယ်။ သင်အသုံးပြုသည့် dev ဆာဗာများကိုသာ ခွင့်ပြုပါ-

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ဇာစ်မြစ်များကို လျစ်လျူရှုထားသည့်နောက်မှ မျဥ်းမျဉ်းများဖြင့် အသေးစိပ်တွဲထားသည်၊ ထို့ကြောင့် `http://localhost:3000` နှင့် `http://localhost:3000/` သည် ညီမျှသည်။ တူညီသော CSV runtime တွင်သတ်မှတ်နိုင်သည်။**ဒက်ရှ်ဘုတ် → လုံခြုံရေး → CORS ခွင့်ပြုထားသော မူလအစများ** ပြန်လည်စတင်ခြင်းမရှိဘဲ။

## API သော့များနှင့် ကွတ်ကီးဆက်ရှင်များ

- **Bearer / `x-api-key` ( `/v1/*` အနုမာန မျက်နှာပြင်):** ဘရောက်ဆာများသည် ၎င်းတို့ကို မည်သည့်အခါမျှ အလိုအလျောက် မတွဲပါ။ CORS သည် ဤနေရာတွင် အဓိပ္ပါယ်ရှိသော အတားအဆီးတစ်ခုမဟုတ်ပါ — API သော့သည် အတားအဆီး — ဖြစ်သောကြောင့် ၎င်းမျက်နှာပြင်သည် ရည်ရွယ်ချက်ရှိရှိ ခွင့်ပြုထားသောကြောင့် ဘရောက်ဆာနှင့် Electron သုံးစွဲသူများသည် ၎င်းတို့ရပိုင်ခွင့်ရှိပြီးသား တုံ့ပြန်ချက်များကို ဖတ်နိုင်သည်။ ဖြေလျှော့ထားသော ပဲ့တင်သံသည် စစ်မှန်ကြောင်း အတည်ပြုထားသော အကြောင်းအရာ (အတည်ပြုထားသော API သော့ သို့မဟုတ် ဒက်ရှ်ဘုတ် စက်ရှင်)၊ အထောက်အထားဆိုင်ရာ ခေါင်းစီးတစ်ခုသာမက `Access-Control-Allow-Credentials` မပါဝင်ပါ။ အမည်မသိ တုံ့ပြန်မှုများ (`REQUIRE_API_KEY=false`) သည် တိကျပြတ်သားသော `CORS_ALLOW_ALL=true` ရွေးချယ်မှုအပါအဝင် ပြင်ဆင်သတ်မှတ်ထားသော မူလခွင့်ပြုစာရင်းကို အသုံးပြုသည်။ Auth rejections (401) သည် ဆက်လက်ဖတ်ရှုနိုင်စေရန်အတွက် သုံးစွဲသူများသည် ရုပ်သိမ်းထားသော သို့မဟုတ် ရိုက်ထားသောသော့ကို ဖော်ပြနိုင်သည် (#5242) : ပိုက်လိုင်း၏ကိုယ်ပိုင် 401 သည် ပဲ့တင်သံကို ထိန်းသိမ်းထားပြီး ပိုက်လိုင်းသည် အမည်မသိအဖြစ် လုပ်ဆောင်ပြီးနောက် သော့ကို ငြင်းပယ်သည့်လမ်းကြောင်း (`/v1/models` နှင့် `/v1beta/models` ၊ စီမံခန့်ခွဲခွင့်အထောက်အထားဖြင့် `/v1/files`၊ ပိုင်ရှင်သတ်မှတ်ထားသော `/v1/batches`၊ `/v1/media` auto-combo ကိုယ်စားလှယ်လောင်းလမ်းကြောင်းများ) သည် `credentialRejectionHeaders()` မှတဆင့် `/v1/session-leases` သို့ ပဲ့တင်သံကို ပေါင်းထည့်သည်။ အထောက်အထားခေါင်းစီး (`Authorization`၊ `x-api-key`၊ `x-goog-api-key` သို့မဟုတ် `auth_token` ကွက်ကီး) ပါရှိသော တောင်းဆိုချက်တွင် ပဲ့တင်သံကို သော့ခတ်ထားပြီး ၎င်းတို့အနက်မှ မည်သည့်လမ်းကြောင်းမှ စစ်ဆေးပြီး `Access-Control-Allow-Credentials` နှင့် ဘယ်သောအခါမှ တွဲချိတ်မည်မဟုတ်ပါ။ body သည် fixed error envelope ဖြစ်သည်။ `requireManagementAuth()` လက်အောက်ရှိ `/api/v1/` မှ စောင့်ကြပ်ထားသော စီမံခန့်ခွဲမှုလမ်းကြောင်းများ (`/api/v1/management/*`၊ `/api/v1/registered-keys`၊ `/api/v1/providers/[provider]/limits`၊ `/api/v1/accounts/[id]/limits`၊ `/api/v1/issues/report`) သည် ဤအထောက်အထား-ငြင်းပယ်ခြင်းခြွင်းချက်အား အသုံးမပြုပါ- `REQUIRE_API_KEY=false` ဖြင့်၊ ၎င်းတို့၏ 401/403 တုံ့ပြန်မှုများသည် ပြင်ဆင်ထားသော CORS မူလမူဝါဒကို လိုက်နာပါသည်။
- **ကွတ်ကီးစက်ရှင် (ဒက်ရှ်ဘုတ်)-** fail-closed default ဖြင့် ကာကွယ်ထားသည်။**နှင့်** မျှဝေထားသောလမ်းကြောင်းပေါ်တွင် `Access-Control-Allow-Credentials` မရှိခြင်းကြောင့်။ ခွင့်ပြုထားသော မည်သည့်ပုံစံမှမဆို management/dashboard မူလဇစ်မြစ်ကို သိမ်းဆည်းထားပါ။ အတိအကျ ပြတ်ပြတ်သားသားနေရမယ်။

## WebSocket လက်ဆွဲနှုတ်ဆက်ခြင်း (`/v1/responses`၊ `/v1/ws`)

ဘရောက်ဆာများသည် မသက်ဆိုင်ပါ။ CORS ရန် WebSocketဒါကြောင့် WebSocket အနုမာန အထွက်ကို ပြန်ပေးသော ပို့ဆောင်မှုများကို လက်ဆွဲ၍ စစ်ဆေးပါ။ `Origin` သူတို့ကိုယ်သူတို့ (`src/server/origin/wsOrigin.ts`): တုံ့ပြန်မှုများ WebSocket (`/v1/responses`) နဲ့ ဘယ်တော့လဲ။ OmniRoute ဖြတ်သန်းသည်။ `npm start` / `npm run dev`၊ `/v1/ws` နှင့် `/api/v1/ws` ချောင်းကူးတံတား `/v1/chat/completions`, `/v1/messages` နှင့် `/v1/responses` ဘောင်များအဖြစ်။ တံတားက မေးတယ်။ `/api/v1/ws?handshake=1` စီရင်ချက်အတွက်၊ ထိုလမ်းကြောင်းသည် စစ်ဆေးမှုမပြီးပါက အဆင့်မြှင့်ရန် ငြင်းဆိုထားသည်။ အထောက်အထားစိစစ်ခြင်း လိုအပ်ချက်များသည် သီးခြားစီသက်ရောက်ဆဲဖြစ်သည်။ မူရင်းစစ်ဆေးမှုသည် ဖြတ်သန်းသည့်အခါ-

- ၎င်းတွင် `Origin` ခေါင်းစီးမရှိပါ (Codex CLI၊ SDKs နှင့် အခြားဘရောက်ဆာမဟုတ်သော client များ)။
- `Origin` အထက်ဖော်ပြပါ ခွင့်ပြုစာရင်းမှ လက်ခံပါသည် (`CORS_ALLOWED_ORIGINS`၊ `corsOrigins` ဆက်တင် ၊ `CORS_ORIGIN`၊ `CORS_ALLOW_ALL`);
- `Origin` သည် OmniRoute၏ ကိုယ်ပိုင်အများပြည်သူဆိုင်ရာ ဇစ်မြစ်များထဲမှ တစ်ခုဖြစ်သည် (ဖွဲ့စည်းထားသော အများသူငှာအခြေခံ URL၊ ယုံကြည်စိတ်ချရသော ပရောက်စီ၏ ထပ်ဆင့်ပေးပို့သည့် မူရင်း သို့မဟုတ် IP ပကတိအဖြစ် ပေးထားသည့် တိုက်ရိုက် loopback/LAN လက်ခံသူ သို့မဟုတ် `localhost` — တူညီသော ကိုယ်စားလှယ်လောင်းများသည် ဒက်ရှ်ဘုတ် ပြောင်းလဲမှုစစ်ဆေးမှုကို အသုံးပြုသည်); သို့မဟုတ်
- ၎င်းသည် HTTP `/v1/*` မျက်နှာပြင်ပေါ်တွင်ကဲ့သို့ တရားဝင် API သော့ကို သယ်ဆောင်သည်။

အခြားမည်သည့်အရာမဆို `403 ws_origin_forbidden` ရရှိသည်။ ဒက်ရှ်ဘုတ် စက်ရှင် ကွက်ကီးသည် နိုင်ငံခြား `Origin` မှ ကင်းလွတ်ခွင့် မပေးပါ၊ ဘရောင်ဇာသည် ၎င်းကို စာမျက်နှာတိုင်း၏ ပေါက်ပေါက်တွင် ချိတ်ထားသောကြောင့် ဖြစ်သည်။ အခြားဆိပ်ကမ်းရှိ `localhost` တူညီသောမူလအဖြစ် မခံယူပါ။ `CORS_ALLOWED_ORIGINS` တွင် ထိုကဲ့သို့သော dev အရင်းအမြစ်များကို ထည့်ပါ။

## ဥပမာ- OmniRoute ရှေ့တွင် ပြောင်းပြန် proxy

CORS ကို OmniRoute ကိုယ်တိုင်က ပြဌာန်းထားသောကြောင့် ပရောက်စီသည် ယေဘူယျအားဖြင့် ဖြစ်သင့်သည်။**မဟုတ်ဘူး** `Access-Control-*` ခေါင်းစီးများကို ထည့်ပါ သို့မဟုတ် ပြန်ရေးပါ (ခေါင်းစီးနှစ်ထပ် ဘရောက်ဆာများကို ချိုးဖျက်ခြင်း)။ TLS အဆုံးသတ်ပြီး — သို့ပေးပို့ပါ OmniRoute အဖြေကြိုတင်ပျံသန်းခွင့်ပြုပါ-

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

ပရောက်စီတွင်မဟုတ်ဘဲ OmniRoute (`CORS_ALLOWED_ORIGINS` သို့မဟုတ် လုံခြုံရေးတက်ဘ်) တွင် ခွင့်ပြုထားသောဘရောက်ဆာမူရင်းများကို သတ်မှတ်ပါ။

## အရင်းအမြစ်ဖိုင်များ

| စိုးရိမ်စရာ                                                | ဖို                                                                  |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| ခွင့်ပြုစာရင်းဖြေရှင်းချက် + `getCorsStatus()`             | `src/server/cors/origins.ts`                                         |
| Middleware အပလီကေးရှင်း (အမှန်တရား၏တစ်ခုတည်းသောအရင်းအမြစ်) | `src/server/authz/pipeline.ts`                                       |
| ဆက်တင်များ → runtime ဇာစ်မြစ်ထိုးခြင်း။                    | `src/lib/config/runtimeSettings.ts`                                  |
| ဒက်ရှ်ဘုတ်အတွက် Runtime အခြေအနေ                            | `src/app/api/settings/authz-inventory/route.ts`                      |
| ဒက်ရှ်ဘုတ် သတိပေးနဖူးစည်းပုံ                               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS ခွင့်ပြုထားသော မူရင်းအကွက်                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS လမ်းကြောင်းတစ်ခုလျှင် Cloud-Agent (ခြွင်းချက်)        | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket လက်ဆွဲ `Origin` စစ်ဆေးပါ။                        | `src/server/origin/wsOrigin.ts`                                      |

## ကြည့်ပါ။

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback enforcement (သီးခြား၊ ဖြည့်စွက်ထိန်းချုပ်မှု)။
- [တရားဝင်ခွင့်ပြုချက်လမ်းညွှန်](../architecture/AUTHZ_GUIDE.md) — အပြည့်အစုံ။
