# Chaos Mode (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **डैशबोर्ड:** **Chaos Mode** (साइडबार) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (डैशबोर्ड सत्र) · `POST /api/skills/collect/chaos` (API कुंजी)  
> **स्रोत:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **एक कार्य को एक साथ कई प्रदाताओं को भेजता है** — भाग लेने वाला प्रत्येक प्रदाता
एक मॉडल इंस्टेंस का योगदान देता है, और आपको सभी उत्तर साथ-साथ (या शृंखलाबद्ध) मिलते हैं। यह
एक मल्टी-मॉडल निष्पादन सतह है, रूटिंग रणनीति नहीं: आपका सामान्य `/v1/chat/completions`
ट्रैफ़िक इससे कभी प्रभावित नहीं होता।

**स्पष्टीकरण — "chaos" नाम वाली तीन अलग-अलग चीज़ें उपलब्ध हैं:**

| चीज़                      | यह क्या है                                                                                                                                                   | दस्तावेज़ कहाँ उपलब्ध हैं                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**            | यहाँ वर्णित डैशबोर्ड पेज + API: एक कार्य को कई प्रदाताओं तक फैलाएँ (समानांतर या सहयोगात्मक रूप से)।                                                          | यह मार्गदर्शिका                              |
| `auto/chaos`              | Auto-Combo मॉडल id: समानांतर फ़ैन-आउट, प्रति प्रदाता एक मॉडल, प्रत्येक के लिए एक अपस्ट्रीम कॉल। फ़ॉल्ट इंजेक्शन नहीं ([विवरण](#autochaos-parallel-fan-out))। | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos कॉम्बो कॉन्फ़िगरेशन | `config.chaos.enabled` वाला एक स्थायी कॉम्बो इसी तरह फ़ैन-आउट करता है (केवल API); `judgeModel` केवल अंतिम उत्तर चुनता है, कोई संश्लेषण कॉल नहीं होती।        | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: समानांतर फ़ैन-आउट

`auto/chaos` फ़ॉल्ट-इंजेक्शन या रेज़िलिएंस-परीक्षण नियंत्रण **नहीं** है।
`/v1/chat/completions` पर `model: "auto/chaos"` का अनुरोध करना:

1. **प्रति प्रदाता एक मॉडल** का पैनल बनाता है: प्रत्येक कनेक्टेड प्रदाता का
   पहला उम्मीदवार, उम्मीदवार-पूल क्रम में, अधिकतम 5 सदस्यों तक
   (`OMNIROUTE_CHAOS_MAX_PANEL`, जिसकी अधिकतम सीमा 10 है)
   (`open-sse/services/autoCombo/virtualFactory.ts`)। `chaos-mode` वेट
   पैक केवल प्रत्येक सदस्य का `weight` सेट करता है; फ़ैन-आउट इसे नहीं पढ़ता।
2. प्रत्येक पैनल सदस्य को समान अनुरोध **समानांतर रूप से** भेजता है, इसलिए एक अनुरोध
   के लिए प्रति पैनल सदस्य एक अपस्ट्रीम कॉल का खर्च आता है
   (`open-sse/services/autoCombo/chaosEngine.ts`, जिसे
   `open-sse/services/combo.ts` से डिस्पैच किया जाता है)।
3. प्रत्येक पैनल सदस्य के परिणाम आते ही उसके लिए एक स्थिति पंक्ति स्ट्रीम करता है: डिफ़ॉल्ट
   रूप से एक SSE टिप्पणी (`: chaos <index> ok|fail <model>`), साथ ही जब अनुरोध
   `stream_options.include_chaos_parts: true` सेट करता है, तब एक `omni-chaos-part`
   इवेंट (`model`, `index`, `ok`, `error`)। इनमें उत्तर का कोई टेक्स्ट नहीं होता।
4. अंतिम OpenAI-शैली चंक के रूप में पैनल का **एक** उत्तर भेजता है: पहला पैनल
   सदस्य (`auto/chaos` इसे `judgeModel` के रूप में सेट करता है), यदि वह सफल होता है; अन्यथा
   अंतिम सफल सदस्य का उत्तर। पैनल के अन्य उत्तर वापस नहीं किए जाते, इसलिए
   आप N कॉल के लिए भुगतान करते हैं और एक पूर्णता प्राप्त करते हैं।

## स्थापित करना

1. खुला** डैशबोर्ड → मोड से संबंधित है** (`/dashboard/chaos`).
2. इसे पलटें** पर** — कैओस मोड जहाज** डिफ़ॉल्ट रूप से अक्षम** ( `src/lib/chaos/chaosConfig.ts` में`enabled: false` )। अक्षम होने पर, `POST /api/chaos/run` `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` उत्तर देता है।
3. प्रतिभागियों और डिफ़ॉल्ट को चुनें (सेटिंग्स स्टोर के माध्यम से प्रति उदाहरण जारी):

   | मैदान               | अर्थ                                                                 | डिफ़ॉल्ट/सीमाएँ                            |
   | ------------------- | -------------------------------------------------------------------- | ------------------------------------------ |
   | `enabled`           | मास्टर स्विच                                                         | `false`                                    |
   | `defaultMode`       | `parallel` या `collaborative` (नीचे देखें)                           | `parallel`                                 |
   | `providerOverrides` | प्रति-प्रदाता भागीदारी (`providerId`, वैकल्पिक `modelId`, `enabled`) | प्रत्येक सक्रिय प्रदाता खाली =, अधिकतम 200 |
   | `systemPrompt`      | अंतर्निहित कैओस सिस्टम प्रॉम्प्ट के लिए ओवरराइड करें                 | वैकल्पिक, अधिकतम 10,000 वर्ण               |
   | `timeoutMs`         | प्रति मॉडल कॉल अधिकतम समय                                            | `120000` (5 000–600 000)                   |
   | `maxTokens`         | `max_tokens` प्रति मॉडल कॉल                                          | `4096` (256–128 000)                       |

4. प्रत्येक भाग लेने वाले प्रदाता को एक दें** नमूना** . एक प्रदाता का मॉडल कैओस मोड पेज पर उसके सक्षम ओवरराइड का `modelId` है (यह जीतता है), अन्यथा** डिफ़ॉल्ट मॉडल** इसके कनेक्शन का. प्रदाता आईडी का उपयोग कभी भी मॉडल नाम के रूप में नहीं किया जाता है। ऐसा प्रदाता जिसके पास कोई नहीं है** नहीं बुलाया गया** : यह परिणामों में `status: "error"` के रूप में संदेश के साथ दिखाई देता है _"इस प्रदाता के लिए कोई मॉडल सेट नहीं है। कैओस मोड पेज पर इसके लिए एक मॉडल सेट करें या कनेक्शन पर एक डिफ़ॉल्ट मॉडल सेट करें।"_ और एक खाली `modelId`, जबकि अन्य प्रदाता सामान्य रूप से चलते हैं। यदि किसी चयनित प्रदाता के पास कोई मॉडल नहीं है, तो किसी भी अपस्ट्रीम अनुरोध से पहले रन विफल हो जाता है _"किसी प्रदाता के पास मॉडल सेट नहीं है। ..."_ (दोनों एंडपॉइंट पर HTTP 500)।
5. ए चलाओ** पृष्ठ से ही परीक्षण करें** — परिणाम पैनल प्रत्येक प्रदाता का उत्तर, स्थिति और अवधि दिखाता है।

## निष्पादन मोड

- **`parallel`** — प्रत्येक मॉडल को एक ही कार्य एक साथ मिलता है; आपको सभी उत्तर
  स्वतंत्र रूप से प्राप्त होते हैं।
- **`collaborative`** — मॉडल **एक श्रृंखला में** चलते हैं: प्रत्येक मॉडल पिछले मॉडल का आउटपुट देखता है और
  उसे परिष्कृत या विस्तृत करने, उसकी समीक्षा करने या कोई विकल्प देने के लिए कहा जाता है। प्रतिक्रिया का `summary` फ़ील्ड
  सफल आउटपुट को श्रृंखला क्रम में जोड़ता है (`parallel` रन में कोई `summary` नहीं होता)।

## API

### `POST /api/chaos/run` — डैशबोर्ड सत्र

कुकी-प्रमाणीकृत (प्रबंधन सत्र — देखें [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); डैशबोर्ड पृष्ठ द्वारा उपयोग किया जाता है.

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

### `POST /api/skills/collect/chaos` — API कुंजी

बाहरी कॉल करने वालों के लिए बियरर-टोकन संस्करण। चाबी साथ रखनी होगी** कैओस मोड अनुमति** (`chaosModeEnabled`), जो है** डिफ़ॉल्ट रूप से बंद** — इसे प्रति कुंजी सक्षम करें** डैशबोर्ड → API प्रबंधक → कुंजी संपादित करें → अनुमतियाँ → कैओस मोड** . ऊपर जैसा ही शरीर.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

दोनों समापन बिंदु एक ही आकार लौटाते हैं:

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

## समस्या निवारण

- **`400 Chaos Mode is not enabled`** उपरोक्त — चरण 2: वैश्विक स्विच बंद है।
- **API कुंजी `/api/skills/collect/chaos` पर अस्वीकृत हो जाती है** — कुंजी में प्रति-कुंजी `chaosModeEnabled` अनुमति का अभाव है (डिफ़ॉल्ट रूप से बंद; यह एक सेटिंग है, कोई त्रुटि नहीं)।
- **एक प्रदाता `No model set for this provider` दिखाता है** — कैओस मोड पेज पर अपना मॉडल या उसके कनेक्शन पर एक डिफ़ॉल्ट मॉडल सेट किया है (सेटअप देखें, चरण 4)।
- **जिस प्रदाता से आपने अपेक्षा की थी वह परिणामों से गायब है** — कैओस मोड पेज पर `providerOverrides` जांच करें (एक अक्षम ओवरराइड इसे बाहर करता है) और क्या प्रदाता कनेक्शन सक्रिय है।
