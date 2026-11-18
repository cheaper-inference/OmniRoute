# Chaos Mode (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashboard:** **Chaos Mode** (साइडबार) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (डॅशबोर्ड सत्र) · `POST /api/skills/collect/chaos` (API की)  
> **स्रोत:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **एकच कार्य एकाच वेळी अनेक प्रदात्यांकडे पाठवतो** — सहभागी होणारा प्रत्येक प्रदाता
एका मॉडेल इन्स्टन्सचे योगदान देतो आणि तुम्हाला सर्व उत्तरे शेजारी-शेजारी (किंवा साखळीबद्ध) मिळतात. हा
बहु-मॉडेल अंमलबजावणी पृष्ठभाग आहे, राउटिंग धोरण नाही: तुमच्या नेहमीच्या `/v1/chat/completions`
ट्रॅफिकवर याचा कधीही परिणाम होत नाही.

**संदिग्धता निवारण — "chaos" नाव असलेल्या तीन भिन्न गोष्टी उपलब्ध आहेत:**

| गोष्ट                    | ती काय आहे                                                                                                                                                            | दस्तऐवजीकरण कुठे आहे                         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**           | येथे वर्णन केलेले डॅशबोर्ड पृष्ठ + API: एक कार्य अनेक प्रदात्यांकडे वितरित करा (समांतर किंवा सहयोगात्मक पद्धतीने).                                                    | हे मार्गदर्शक                                |
| `auto/chaos`             | Auto-Combo मॉडेल आयडी: समांतर वितरण, प्रत्येक प्रदात्यासाठी एक मॉडेल आणि प्रत्येकी एक अपस्ट्रीम कॉल. हे दोष अंतःक्षेपण नाही ([तपशील](#autochaos-parallel-fan-out)).   | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos कॉम्बो कॉन्फिगरेशन | `config.chaos.enabled` असलेला कायमस्वरूपी जतन केलेला कॉम्बो त्याच प्रकारे वितरण करतो (केवळ API); `judgeModel` फक्त अंतिम उत्तर निवडतो, कोणताही संश्लेषण कॉल करत नाही. | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: समांतर वितरण

`auto/chaos` हे दोष अंतःक्षेपण किंवा लवचिकता-चाचणीसाठीचे नियंत्रण **नाही**. `/v1/chat/completions` वर
`model: "auto/chaos"` ची विनंती केल्यास:

1. **प्रत्येक प्रदात्याकडून एक मॉडेल** असलेले पॅनेल तयार होते: प्रत्येक
   कनेक्ट केलेल्या प्रदात्याचा पहिला उमेदवार, उमेदवार-पूल क्रमाने, कमाल 5 सदस्यांपर्यंत
   (`OMNIROUTE_CHAOS_MAX_PANEL`, कमाल मर्यादा 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` वेट
   पॅक फक्त प्रत्येक सदस्याचे `weight` सेट करतो; वितरण प्रक्रिया ते वाचत नाही.
2. समान विनंती प्रत्येक पॅनेल सदस्याला **समांतरपणे** पाठवली जाते, त्यामुळे एका विनंतीसाठी
   प्रत्येक पॅनेल सदस्यामागे एक अपस्ट्रीम कॉल लागतो
   (`open-sse/services/autoCombo/chaosEngine.ts`, येथून पाठवले जाते:
   `open-sse/services/combo.ts`).
3. प्रत्येक पॅनेल सदस्याचा निकाल येताच त्याच्यासाठी एक स्थिती ओळ प्रवाहित केली जाते: डीफॉल्टनुसार एक SSE टिप्पणी
   (`: chaos <index> ok|fail <model>`), तसेच विनंतीमध्ये
   `stream_options.include_chaos_parts: true` सेट केलेले असल्यास एक `omni-chaos-part`
   इव्हेंट (`model`, `index`, `ok`, `error`). यांमध्ये उत्तराचा कोणताही मजकूर नसतो.
4. अंतिम OpenAI-शैलीतील खंड म्हणून पॅनेलमधील **एक** उत्तर पाठवले जाते: पहिल्या पॅनेल
   सदस्याचे (`auto/chaos` त्याला `judgeModel` म्हणून सेट करतो) उत्तर यशस्वी झाल्यास ते, अन्यथा
   शेवटच्या यशस्वी सदस्याचे उत्तर. पॅनेलमधील इतर उत्तरे परत केली जात नाहीत, त्यामुळे
   तुम्ही N कॉलसाठी पैसे देता आणि तुम्हाला एक पूर्ण प्रतिसाद मिळतो.

## सेटअप

1. उघडा** डॅशबोर्ड → अराजक मोड** (`/dashboard/chaos`)
2. ते वळवा** वर** — अराजक मोड जहाजे** डीफॉल्टनुसार अक्षम** (`enabled: false` मध्ये `src/lib/chaos/chaosConfig.ts`) अक्षम असताना, `POST /api/chaos/run` उत्तर देते `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. सहभागी आणि डीफॉल्ट निवडा (सेटिंग्ज स्टोअरद्वारे प्रति उदाहरण कायम):

   | फील्ड               | अर्थ                                                                 | डीफॉल्ट / मर्यादा                          |
   | ------------------- | -------------------------------------------------------------------- | ------------------------------------------ |
   | `enabled`           | मास्टर स्विच                                                         | `false`                                    |
   | `defaultMode`       | `parallel` किंवा `collaborative` (खाली पहा)                          | `parallel`                                 |
   | `providerOverrides` | प्रति-प्रदात्याचा सहभाग (`providerId`, पर्यायी `modelId`, `enabled`) | रिकामे = प्रत्येक सक्रिय प्रदाता, कमाल 200 |
   | `systemPrompt`      | बिल्ट-इन केओस सिस्टम प्रॉम्प्टसाठी ओव्हरराइड करा                     | पर्यायी, कमाल 10 000 वर्ण                  |
   | `timeoutMs`         | प्रति मॉडेल कॉल कमाल वेळ                                             | `120000` (5 000–600 000)                   |
   | `maxTokens`         | `max_tokens` प्रति मॉडेल कॉल                                         | `4096` (256–128 000)                       |

4. प्रत्येक सहभागी प्रदात्याला द्या a** मॉडेल** . प्रदात्याचे मॉडेल हे कॅओस मोड पृष्ठावरील त्याच्या सक्षम ओव्हरराइडचे `modelId` आहे (तो जिंकतो), अन्यथा** डीफॉल्ट मॉडेल** त्याच्या कनेक्शनचे. प्रदाता आयडी कधीही मॉडेल नाव म्हणून वापरला जात नाही. दोन्हीपैकी एक प्रदाता आहे** बोलावले नाही** : ते परिणामांमध्ये `status: "error"` म्हणून _"या प्रदात्यासाठी कोणतेही मॉडेल सेट केलेले नाही. कॅओस मोड पृष्ठावर त्यासाठी मॉडेल सेट करा किंवा कनेक्शनवर डीफॉल्ट मॉडेल सेट करा."_ आणि रिक्त `modelId`, तर इतर प्रदाते सामान्यपणे चालतात. कोणत्याही निवडलेल्या प्रदात्याकडे मॉडेल नसल्यास, _"कोणत्याही प्रदात्याकडे मॉडेल सेट नसलेल्या कोणत्याही अपस्ट्रीम विनंतीपूर्वी रन अयशस्वी होते. …"_ ( दोन्ही एंडपॉइंट्सवर HTTP 500).
5. धावा a** पृष्ठावरूनच चाचणी** — परिणाम पॅनेल प्रत्येक प्रदात्याचे उत्तर, स्थिती आणि कालावधी दर्शविते.

## अंमलबजावणी मोड

- **`parallel`** — प्रत्येक मॉडेलला एकच कार्य एकाच वेळी मिळते; तुम्हाला सर्व उत्तरे
  स्वतंत्रपणे मिळतात.
- **`collaborative`** — मॉडेल्स **साखळीमध्ये** चालतात: प्रत्येकाला मागील मॉडेलचे आउटपुट दिसते आणि
  ते सुधारण्यास, विस्तारण्यास, त्याचे समीक्षण करण्यास किंवा पर्याय सुचवण्यास सांगितले जाते. प्रतिसादातील `summary` फील्ड
  साखळीच्या क्रमाने यशस्वी आउटपुट्स एकत्र जोडते (`parallel` रनमध्ये `summary` नसतो).

## API

### `POST /api/chaos/run` — डॅशबोर्ड सत्र

कुकी-प्रमाणीकृत (व्यवस्थापन सत्र — [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) पहा); डॅशबोर्ड पृष्ठाद्वारे वापरले जाते.

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

### `POST /api/skills/collect/chaos` — API

बाह्य कॉलर्ससाठी बेअरर-टोकन प्रकार. किल्ली नेणे आवश्यक आहे** अनागोंदी मोड परवानगी** (`chaosModeEnabled`), जे आहे** डीफॉल्टनुसार बंद** — प्रति की इन सक्षम करा** डॅशबोर्ड → API व्यवस्थापक → संपादन की → परवानग्या → अराजक मोड** . वरीलप्रमाणेच शरीर.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

दोन्ही शेवटचे बिंदू समान आकार देतात:

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

## समस्यानिवारण

- **`400 Chaos Mode is not enabled`** वरील — चरण 2: जागतिक स्विच बंद आहे.
- **API की `/api/skills/collect/chaos` वर नाकारली जाते** — की मध्ये per-key `chaosModeEnabled` परवानगी नाही (डिफॉल्टनुसार बंद; ही सेटिंग आहे, त्रुटी नाही).
- **प्रदाता `No model set for this provider` दाखवतो** — चे मॉडेल कॅओस मोड पृष्ठावर किंवा त्याच्या कनेक्शनवर डीफॉल्ट मॉडेल सेट करते (सेटअप, चरण 4 पहा).
- **तुम्हाला अपेक्षित असलेला प्रदाता निकालांमधून गहाळ आहे** — चाओस मोड पृष्ठावर `providerOverrides` तपासा (अक्षम केलेले ओव्हरराइड ते वगळते) आणि प्रदाता कनेक्शन सक्रिय आहे की नाही.
