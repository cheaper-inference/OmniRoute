# CORS Configuration & Security (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

जिसेOmniRoute नियंत्रित करता है**ब्राउज़र की उत्पत्ति** एकल, केंद्रीकृत अनुमति सूची से क्रॉस-ओरिजिन प्रतिक्रियाएँ पढ़ सकता है। मॉडल है**डिफ़ॉल्ट रूप से विफल-बंद** : जब तक आप इसमें शामिल नहीं हो जाते तब तक किसी भी उत्पत्ति की अनुमति नहीं है। यह पृष्ठ दस्तावेज करता है कि अनुमति सूची कैसे हल होती है, `CORS_ALLOW_ALL=true` वास्तव में क्या उजागर करता है (और, महत्वपूर्ण रूप से, यह क्या करता है)**नहीं** ), डेव बनाम प्रोडक्शन को सुरक्षित रूप से कैसे कॉन्फ़िगर करें, और वाइल्डकार्ड लाइव होने पर डैशबोर्ड पर रनटाइम चेतावनी दिखाई देती है।

**सत्य का स्रोत:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`)। अनुमति सूची एक बार लागू की जाती है, मिडलवेयर (`src/server/authz/pipeline.ts`) में — प्रति-रूट हैंडलर स्वयं `Access-Control-Allow-Origin` सेट नहीं करते हैं।

## किसी उत्पत्ति का समाधान कैसे होता है

प्रत्येक अनुरोध के लिए मिडलवेयर इस क्रम में `Access-Control-Allow-Origin` मान की गणना करता है:

1. **`CORS_ALLOW_ALL=true`** (या विरासत `CORS_ORIGIN=*`) → कॉलर के `Origin` वापस (या `*` जब कोई `Origin` हेडर नहीं है) `Vary: Origin` के साथ प्रतिध्वनित करता है ताकि कैश सही रहे। वही `applyCorsHeaders()` चोकपॉइंट टोकन-प्रमाणित `/v1*`/`/v1beta*` सतह (`relaxForTokenAuth`, RFC 9110 §12.5.5, जारी #6737) पर प्रत्येक 2xx-विद-बॉडी प्रतिक्रिया में `Vary: Accept-Encoding` भी जोड़ता है, ताकि downstream/shared कैश संपीड़ित बनाम असम्पीडित वेरिएंट को सही ढंग से अलग कर सके।
2. अन्यथा, अनुरोध `Origin` सामान्यीकृत किया जाता है (लोअर-केस, अनुगामी स्लैश हटा दिया जाता है) और इसके विरुद्ध मिलान किया जाता है**मर्ज की गई अनुमति सूची** :
   - env **`CORS_ALLOWED_ORIGINS`** — अल्पविराम से अलग की गई सूची, और
   - रनटाइम **`corsOrigins`** सेटिंग (डैशबोर्ड → सुरक्षा → _CORS स्वीकृत उत्पत्ति_), `src/lib/config/runtimeSettings.ts` से `setRuntimeAllowedOrigins()` के माध्यम से इंजेक्ट की गई।
3. → कोई मेल नहीं**कोई `Access-Control-Allow-Origin` हेडर उत्सर्जित नहीं होता है** . ब्राउज़र क्रॉस-ओरिजिन रीड को ब्लॉक कर देता है। यह इच्छित विफल-बंद डिफ़ॉल्ट है।

| पर्यावरण संस्करण       | अर्थ                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | अनुमति देने के लिए सटीक मूल काCSV (अनुशंसित)।                                                  |
| `CORS_ALLOW_ALL`       | `true`/`1` → किसी भी मूल (वाइल्डकार्ड) को प्रतिध्वनित करता है। केवल देव.                       |
| `CORS_ORIGIN`          | परंपरा। `*` `CORS_ALLOW_ALL` की तरह व्यवहार करता है; अनुमति सूची में एक एकल मान जोड़ा जाता है। |

## ख़तरा मॉडल — जिसे `CORS_ALLOW_ALL=true` वास्तव में उजागर करता है

सामान्य OWASP चेतावनी ("वाइल्डकार्ड CORS = कोई भी साइट आपके API कॉल कर सकती है") गंभीरता से लेने लायक है, लेकिन OmniRoute का एक्सपोज़र है**सामान्य मामले की तुलना में संकीर्ण** , एक ठोस कार्यान्वयन तथ्य के कारण:

> **केंद्रीय `applyCorsHeaders()` कभी भी `Access-Control-Allow-Credentials` उत्सर्जित नहीं करता है।** जब तक सर्वर `Access-Control-Allow-Credentials: true` नहीं भेजता, ब्राउज़र _credentialed_ (कुकी-बेयरिंग) क्रॉस-ओरिजिन प्रतिक्रिया को उजागर नहीं करेगा। OmniRoute का साझा CORS पथ कभी नहीं चलता।

`CORS_ALLOW_ALL=true` के साथ भी, प्रति सतह इसका क्या मतलब है:

| सतह                                            | प्रमाणीकरण तंत्र        | वाइल्डकार्ड CORS का प्रभाव                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| डैशबोर्ड/ MANAGEMENT `/api/*`                  | कुकी सत्र               | उत्पत्ति प्रतिध्वनित है, लेकिन **`Allow-Credentials` के बिना** ब्राउज़र **ब्लाकों** प्रमाणिक रूप से पढ़ा गया। एक दुर्भावनापूर्ण क्रॉस-ऑरिजिन साइट **नहीं पढ़ सकते** आपकी प्रमाणित डैशबोर्ड प्रतिक्रियाएँ, और सत्र कुकी उजागर नहीं हुई है।                                                                                                                                                                                                                                                                                                              |
| क्लाइंट API `/v1/*`, `/v1beta/*`               | बियरर/ `x-api-key` हेडर | पहले से ही अनुमति है**डिज़ाइन द्वारा** (`relaxForTokenAuth`): ब्राउज़र कभी भी `Authorization`/`x-api-key` को ऑटो-अटैच नहीं करते हैं, इसलिए किसी हमलावर का पेज आपकी कुंजी प्रदान नहीं कर सकता है। आरामदायक इको के लिए एक प्रमाणित विषय (एक मान्य API कुंजी या डैशबोर्ड सत्र) की आवश्यकता होती है, न कि केवल एक क्रेडेंशियल हेडर की, और इसमें कभी भी `Access-Control-Allow-Credentials` शामिल नहीं होता है। अनाम प्रतिक्रियाएँ (`REQUIRE_API_KEY=false`) एक स्पष्ट `CORS_ALLOW_ALL=true` ऑप्ट-इन सहित कॉन्फ़िगर की गई मूल अनुमति सूची का उपयोग करती हैं। |
| सार्वजनिक रूप से पढ़ने योग्य (`/api/health`,…) | कोई नहीं                | असंवेदनशील; वाइल्डकार्ड हानिरहित है.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

इतना**अवशिष्ट** `CORS_ALLOW_ALL=true` का एक्सपोज़र निम्न तक सीमित है: (ए) गैर-प्रमाणित क्रॉस-ओरिजिन **पढ़ता** पहले से ही अप्रमाणित डेटा, और (बी) CORS देना**उड़ान पूर्व पास** प्रबंधन मार्गों — पर अभी भी प्रमाणीकरण की आवश्यकता है जो एक क्रॉस-ओरिजिन पेज प्रदान नहीं कर सकता है। यह है**नहीं** साझा CORS पथ पर एक सत्र-हाइजैक या क्रेडेंशियल-चोरी वेक्टर।

### एक वास्तविक अपवाद — `/api/v1/agents/`

क्लाउड-एजेंट रूट (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ने उन्हें सेट किया**अपना** CORS हेडर (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) और **करना** `Access-Control-Allow-Credentials: true` के साथ `Access-Control-Allow-Origin: <origin>|*` उत्सर्जित करें। यह एकल सतह है जहां उत्पत्ति-प्रतिध्वनि और प्रमाण-पत्र सह-अस्तित्व में हैं, और यह है**`CORS_ALLOW_ALL` से स्वतंत्र** . ये मार्ग प्रबंधन-प्रमाणित (`requireManagementAuth`) हैं; डैशबोर्ड को ऑफ-होस्ट दिखाने वाले ऑपरेटरों को पता होना चाहिए कि यह वह स्थान है जहां प्रतिक्रिया हेडर द्वारा क्रॉस-ऑरिजिन क्रेडेंशियल पढ़ने की अनुमति है। इसे एक स्पष्ट अनुमति सूची में कसने को इस CORS मार्गदर्शन से अलग से ट्रैक किया जाता है।

## उत्पादन चेकलिस्ट

- **उत्पादन में कभी भी `CORS_ALLOW_ALL=true` सेट न करें.** इसे अव्यवस्थित छोड़ दें.
- एक सेट करें**मुखर** मूल सूची — या तो env var या सुरक्षा-टैब फ़ील्ड:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- यदि OmniRoute एक रिवर्स प्रॉक्सी / टनल (nginx, Caddy, Cloudflare टनल, Tailscale) के पीछे चलता है, तो CORS है**नहीं** आपका एकमात्र नियंत्रण — लूपबैक रूट गार्ड अभी भी स्पॉन-सक्षम मार्गों की सुरक्षा करता है ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) देखें)। 403 को "ठीक" करने के लिए `X-Forwarded-For: 127.0.0.1` का प्रयोग न करें; जो रूट गार्ड के बंद होने पर RCE क्लास को फिर से खोलता है।
- रनटाइम स्थिति की पुष्टि करें: डैशबोर्ड दिखाता है**लगातार एम्बर बैनर** डैशबोर्ड → सुरक्षा → प्राधिकरण इन्वेंटरी के तहत जब भी `CORS_ALLOW_ALL=true` लाइव होता है, और `/api/settings/authz-inventory` एक `cors: { allowAll, allowedOrigins }` लिफाफा लौटाता है, निगरानी उपकरण मतदान कर सकते हैं।

## विकास सुविधा — विशिष्ट स्थानीय मूल की अनुमति देती है

डेव में भी आपको वाइल्डकार्ड की शायद ही कभी आवश्यकता हो। केवल आपके द्वारा उपयोग किए जाने वाले डेव सर्वर को अनुमति दें:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

मूल को केस-असंवेदनशील रूप से मिलान किया जाता है और अनुगामी स्लैश को नजरअंदाज कर दिया जाता है, इसलिए `http://localhost:3000` और `http://localhost:3000/` समतुल्य हैं। उसी CSV रनटाइम पर सेट किया जा सकता है**डैशबोर्ड → सुरक्षा → CORS अनुमत उत्पत्ति** पुनः आरंभ किए बिना.

## API कुंजी बनाम कुकी सत्र

- **बियरर / `x-api-key` ( `/v1/*` अनुमान सतह):** ब्राउज़र इन्हें कभी भी स्वचालित रूप से संलग्न नहीं करते हैं. CORS यहां एक सार्थक बाधा नहीं है — API कुंजी — बाधा है यही कारण है कि वह सतह जानबूझकर अनुमेय है ताकि ब्राउज़र और Electron क्लाइंट उन प्रतिक्रियाओं को पढ़ सकें जिनके वे पहले से ही हकदार हैं। आरामदायक इको के लिए एक प्रमाणित विषय (एक मान्य API कुंजी या डैशबोर्ड सत्र) की आवश्यकता होती है, न कि केवल एक क्रेडेंशियल हेडर की, और इसमें कभी भी `Access-Control-Allow-Credentials` शामिल नहीं होता है। अनाम प्रतिक्रियाएँ (`REQUIRE_API_KEY=false`) एक स्पष्ट `CORS_ALLOW_ALL=true` ऑप्ट-इन सहित कॉन्फ़िगर की गई मूल अनुमति सूची का उपयोग करती हैं। प्रमाणीकरण अस्वीकार (401) पठनीय रहता है ताकि ग्राहक एक निरस्त या गलत टाइप की गई कुंजी (#5242) को सामने रख सकें: पाइपलाइन का अपना 401 प्रतिध्वनि रखता है, और एक मार्ग जो पाइपलाइन द्वारा इसे अज्ञात के रूप में सेवा देने के बाद कुंजी को अस्वीकार कर देता है (प्रबंधन प्रमाणीकरण कॉन्फ़िगर के साथ `/v1/models` और `/v1beta/models`, मालिक-स्कोप `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` और ऑटो-कॉम्बो उम्मीदवार मार्ग) उस 401 में प्रतिध्वनि जोड़ता है `credentialRejectionHeaders()` के माध्यम से। इको को एक क्रेडेंशियल हेडर (`Authorization`, `x-api-key`, `x-goog-api-key` या `auth_token` कुकी) वाले अनुरोध पर कुंजीबद्ध किया जाता है, न कि उनमें से किस पर रूट की जाँच की जाती है, और `Access-Control-Allow-Credentials` के साथ कभी भी जोड़ा नहीं जाता है; शरीर एक निश्चित त्रुटि लिफाफा है। `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) द्वारा संरक्षित `/api/v1/` के तहत प्रबंधन मार्ग इस क्रेडेंशियल-अस्वीकृति अपवाद का उपयोग नहीं करते हैं: `REQUIRE_API_KEY=false` के साथ, उनकी 401/403 प्रतिक्रियाएं कॉन्फ़िगर CORS मूल नीति का पालन करती हैं।
- **कुकी सत्र (डैशबोर्ड):** विफल-बंद डिफ़ॉल्ट द्वारा संरक्षित **और** साझा पथ पर `Access-Control-Allow-Credentials` की अनुपस्थिति से। management/dashboard मूल को किसी भी अनुमेय कॉन्फ़िगरेशन से बाहर रखें; उन्हें बिल्कुल असफल-बंद रहना चाहिए।

## WebSocket हैंडशेक (`/v1/responses`, `/v1/ws`)

ब्राउज़र CORS WebSocket पर लागू नहीं करते हैं, इसलिए WebSocket उस अनुमान आउटपुट को ट्रांसपोर्ट करता है जो हैंडशेक `Origin` स्वयं जांचता है (`src/server/origin/wsOrigin.ts`): प्रतिक्रियाएं WebSocket (`/v1/responses`) और, जब OmniRoute `npm start` / `npm run dev` के माध्यम से चलता है, तो `/v1/ws` और `/api/v1/ws` ब्रिज, जो `/v1/chat/completions`, `/v1/messages` और `/v1/responses` फ्रेम के रूप में स्ट्रीम करता है। ब्रिज `/api/v1/ws?handshake=1` फैसले के बारे में पूछता है और तब तक अपग्रेड करने से इंकार कर देता है जब तक कि उस रूट की जांच नहीं हो जाती। प्रमाणीकरण आवश्यकताएँ अभी भी अलग से लागू होती हैं। मूल जांच तब पास होती है जब:

- इसमें कोई `Origin` हेडर (Codex CLI, SDKs और अन्य गैर-ब्राउज़र क्लाइंट) नहीं है;
- `Origin` उपरोक्त अनुमति सूची (`CORS_ALLOWED_ORIGINS`, `corsOrigins` सेटिंग, `CORS_ORIGIN`, `CORS_ALLOW_ALL`) द्वारा स्वीकार किया गया है;
- `Origin` OmniRoute के स्वयं के सार्वजनिक मूल में से एक है (कॉन्फ़िगर किया गया सार्वजनिक आधार URL, एक विश्वसनीय प्रॉक्सी का अग्रेषित मूल, या IP शाब्दिक या `localhost` — के रूप में दिया गया प्रत्यक्ष loopback/LAN होस्ट वही उम्मीदवार है जो डैशबोर्ड म्यूटेशन चेक का उपयोग करता है); या
- इसमें HTTP `/v1/*` सतह की तरह एक वैध API कुंजी होती है।

बाकी किसी भी चीज़ को `403 ws_origin_forbidden` मिलता है। एक डैशबोर्ड सत्र कुकी किसी विदेशी `Origin` छूट नहीं देती है, क्योंकि ब्राउज़र इसे किसी भी पेज के सॉकेट से जोड़ देता है। किसी अन्य पोर्ट पर `localhost` समान-उत्पत्ति के रूप में नहीं माना जाता है; ऐसे देव मूल को `CORS_ALLOWED_ORIGINS` में जोड़ें।

## उदाहरण: OmniRoute के सामने रिवर्स प्रॉक्सी

CORS OmniRoute द्वारा ही लागू किया जाता है, इसलिए प्रॉक्सी को आम तौर पर ऐसा करना चाहिए **नहीं** `Access-Control-*` हेडर जोड़ें या फिर से लिखें (डबल हेडर ब्राउज़र को तोड़ते हैं)। TLS को समाप्त करें और — को आगे बढ़ाएं, OmniRoute उड़ान से पहले उत्तर देने दें:

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

अनुमत ब्राउज़र मूल को OmniRoute (`CORS_ALLOWED_ORIGINS` या सुरक्षा टैब) में सेट करें, प्रॉक्सी में नहीं।

## स्रोत फ़ाइलें

| चिंता                                    | फ़ाइल                                                                |
| ---------------------------------------- | -------------------------------------------------------------------- |
| अनुमति सूची संकल्प + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| मिडलवेयर एप्लिकेशन (सच्चाई का एकल स्रोत) | `src/server/authz/pipeline.ts`                                       |
| सेटिंग्स → रनटाइम मूल इंजेक्शन           | `src/lib/config/runtimeSettings.ts`                                  |
| डैशबोर्ड के लिए रनटाइम स्थिति            | `src/app/api/settings/authz-inventory/route.ts`                      |
| डैशबोर्ड चेतावनी बैनर                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS अनुमत मूल फ़ील्ड                    | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| क्लाउड-एजेंट प्रति-मार्ग CORS (अपवाद)    | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket हैंडशेक `Origin` चेक           | `src/server/origin/wsOrigin.ts`                                      |

## यह भी देखें

- स्पॉन-सक्षम मार्गों के लिए [रूट गार्ड टियर](./ROUTE_GUARD_TIERS.md) — लूपबैक प्रवर्तन (एक अलग, पूरक नियंत्रण)।
- [प्राधिकरण गाइड](../architecture/AUTHZ_GUIDE.md) — पूर्ण प्रमाणीकरण पाइपलाइन।
