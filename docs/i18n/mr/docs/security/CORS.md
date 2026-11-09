# CORS Configuration & Security (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute जे नियंत्रित करते**ब्राउझर मूळ** एकल, केंद्रीकृत अनुमत सूचीमधील क्रॉस-ओरिजिन प्रतिसाद वाचू शकतात. मॉडेल आहे**डीफॉल्टनुसार अयशस्वी-बंद** : तुम्ही निवड करेपर्यंत कोणत्याही मूळची परवानगी नाही. हे पृष्ठ अनुमत यादी कशी निराकरण करते, `CORS_ALLOW_ALL=true` प्रत्यक्षात काय उघड करते (आणि महत्त्वाचे म्हणजे ते काय करते हे दस्तऐवज देते**नाही** ), dev vs उत्पादन सुरक्षितपणे कसे कॉन्फिगर करावे आणि वाइल्डकार्ड लाइव्ह असताना डॅशबोर्डवर रनटाइम चेतावणी दर्शवते.

**सत्याचा स्रोत:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). अनुमत यादी एकदा लागू केली जाते, मिडलवेअरमध्ये (`src/server/authz/pipeline.ts`) — प्रति-रूट हँडलर स्वतः `Access-Control-Allow-Origin` सेट करत नाहीत.

## मूळ कसे सोडवले जाते

प्रत्येक विनंतीसाठी मिडलवेअर या क्रमाने `Access-Control-Allow-Origin` मूल्याची गणना करते:

1. **`CORS_ALLOW_ALL=true`** (किंवा लीगेसी `CORS_ORIGIN=*`) → कॉलरचा `Origin` बॅक (किंवा `Origin` शीर्षलेख नसताना `*` ) प्रतिध्वनी करतो, त्यामुळे `Vary: Origin` योग्य राहतात. हाच `applyCorsHeaders()` चोकपॉइंट टोकन-प्रमाणीकृत `/v1*`/`/v1beta*` पृष्ठभागावरील प्रत्येक 2xx-विथ-बॉडी प्रतिसादाला `Vary: Accept-Encoding` जोडतो (`relaxForTokenAuth`, RFC 9110 §12.5.5, अंक #6737), त्यामुळे downstream/shared कॅशे संकुचित विरुद्ध असंपीडित व्हेरिएंट योग्यरित्या ओळखू शकतात.
2. अन्यथा, विनंती `Origin` सामान्यीकृत केली जाते (लोअर-केस, ट्रेलिंग स्लॅश स्ट्रिप्ड) आणि जुळते**अनुमत सूची विलीन केली** :
   - env **`CORS_ALLOWED_ORIGINS`** — स्वल्पविरामाने विभक्त केलेली यादी, आणि
   - रनटाइम **`corsOrigins`** सेटिंग (डॅशबोर्ड → सुरक्षा → _CORS अनुमत उत्पत्ति_), `src/lib/config/runtimeSettings.ts` कडून `setRuntimeAllowedOrigins()` द्वारे इंजेक्ट केलेले.
3. → जुळत नाही**कोणतेही `Access-Control-Allow-Origin` शीर्षलेख उत्सर्जित केलेले नाही** . ब्राउझर क्रॉस-ओरिजिन रीड ब्लॉक करतो. हे इच्छित अयशस्वी-बंद डीफॉल्ट आहे.

| Env var                | अर्थ                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | परवानगी देण्यासाठी अचूक उत्पत्तीचेCSV (शिफारस केलेले).                        |
| `CORS_ALLOW_ALL`       | `true`/`1` → कोणत्याही मूळ (वाइल्डकार्ड) प्रतिध्वनी. देव फक्त.                |
| `CORS_ORIGIN`          | वारसा. `*` `CORS_ALLOW_ALL` सारखे वागते; अनुमत सूचीमध्ये एकच मूल्य जोडले आहे. |

## थ्रेट मॉडेल — जे `CORS_ALLOW_ALL=true` खरोखर उघड करते

जेनेरिक OWASP चेतावणी ("वाइल्डकार्ड CORS = कोणतीही साइट तुमचा API कॉल करू शकते") गांभीर्याने घेण्यासारखे आहे, परंतु OmniRoute चे एक्सपोजर आहे**जेनेरिक केस पेक्षा अरुंद** , एका ठोस अंमलबजावणी वस्तुस्थितीमुळे:

> **मध्यवर्ती `applyCorsHeaders()` कधीही `Access-Control-Allow-Credentials` उत्सर्जित करत नाही.** जोपर्यंत सर्व्हर `Access-Control-Allow-Credentials: true` पाठवत नाही तोपर्यंत ब्राउझर _credentialed_ (कुकी-बेअरिंग) क्रॉस-ओरिजिन प्रतिसाद उघड करणार नाही. OmniRoute चा सामायिक CORS मार्ग कधीही करत नाही.

`CORS_ALLOW_ALL=true` सह देखील प्रति पृष्ठभाग याचा अर्थ काय आहे:

| पृष्ठभाग                                 | प्रमाणीकरण यंत्रणा          | वाइल्डकार्ड CORS चा प्रभाव                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| डॅशबोर्ड / MANAGEMENT `/api/*`           | कुकी सत्र                   | मूळ प्रतिध्वनी आहे, परंतु**`Allow-Credentials` शिवाय** ब्राउझर **ब्लॉक** क्रेडेन्शियल वाचले. एक दुर्भावनापूर्ण क्रॉस-ओरिजिन साइट **वाचू शकत नाही** तुमचे प्रमाणीकृत डॅशबोर्ड प्रतिसाद, आणि सत्र कुकी उघड होत नाही.                                                                                                                                                                                                                                                                                               |
| क्लायंट API `/v1/*`, `/v1beta/*`         | वाहक / `x-api-key` शीर्षलेख | आधीच परवानगी आहे**डिझाइनद्वारे** (`relaxForTokenAuth`): ब्राउझर कधीही `Authorization`/`x-api-key` स्वयं-संलग्न करत नाहीत, त्यामुळे आक्रमणकर्त्याचे पृष्ठ तुमची की पुरवू शकत नाही. आरामशीर प्रतिध्वनी साठी प्रमाणीकृत विषय (एक प्रमाणित API की किंवा डॅशबोर्ड सत्र) आवश्यक आहे, केवळ क्रेडेन्शियल शीर्षलेख नाही आणि त्यात कधीही `Access-Control-Allow-Credentials` समाविष्ट नाही. निनावी प्रतिसाद (`REQUIRE_API_KEY=false`) स्पष्ट `CORS_ALLOW_ALL=true` ऑप्ट-इनसह कॉन्फिगर केलेल्या मूळ अनुमत सूचीचा वापर करतात. |
| सार्वजनिक केवळ-वाचनीय (`/api/health`, …) | काहीही नाही                 | गैर-संवेदनशील; वाइल्डकार्ड निरुपद्रवी आहे.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

त्यामुळे द **अवशिष्ट** `CORS_ALLOW_ALL=true` चे एक्सपोजर इतकेच मर्यादित आहे: (a) नॉन-क्रेडेन्शियल क्रॉस-ओरिजिन **वाचतो** आधीच-अप्रमाणित डेटाचे, आणि (b) CORS ला देणे**प्रीफ्लाइट पास** व्यवस्थापन मार्गांवर — ज्यांना अद्याप प्रमाणीकरण आवश्यक आहे जे क्रॉस-ओरिजिन पृष्ठ प्रदान करू शकत नाही. आहे**नाही** सामायिक केलेल्या CORS मार्गावर सत्र-हायजॅक किंवा क्रेडेन्शियल-चोरी वेक्टर.

### एक अस्सल अपवाद — `/api/v1/agents/`

क्लाउड-एजंट मार्ग (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) त्यांचे सेट करतात **स्वतःचे** CORS शीर्षलेख (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) आणि**करा** `Access-Control-Allow-Credentials: true` सह `Access-Control-Allow-Origin: <origin>|*` उत्सर्जित करा. ही एकच पृष्ठभाग आहे जिथे उत्पत्ति-प्रतिध्वनी आणि क्रेडेन्शियल्स एकत्र राहतात आणि ते आहे**`CORS_ALLOW_ALL` पासून स्वतंत्र** . हे मार्ग व्यवस्थापन-प्रमाणीकृत आहेत (`requireManagementAuth`); जे ऑपरेटर डॅशबोर्ड ऑफ-होस्ट उघड करतात त्यांनी हे लक्षात ठेवावे की प्रतिसाद शीर्षलेखांद्वारे क्रॉस-ओरिजिन क्रेडेन्शिअल रीड करण्याची ही एक जागा आहे. या CORS मार्गदर्शनातून सुस्पष्ट अनुमत सूचीमध्ये घट्ट करणे स्वतंत्रपणे ट्रॅक केले जाते.

## उत्पादन चेकलिस्ट

- **उत्पादनामध्ये कधीही `CORS_ALLOW_ALL=true` सेट करू नका.** ते सेट न करता सोडा.
- सेट करा**स्पष्ट** मूळ सूची — एकतर env var किंवा सुरक्षा-टॅब फील्ड:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- जर OmniRoute रिव्हर्स प्रॉक्सी / बोगद्याच्या मागे धावत असेल (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS आहे**नाही** तुमचे एकमेव नियंत्रण — लूपबॅक रूट गार्ड अजूनही स्पॉन-सक्षम मार्गांचे संरक्षण करते ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) पहा). 403 चे "निश्चित" करण्यासाठी `X-Forwarded-For: 127.0.0.1` बनवू नका; जे मार्ग गार्ड बंद होणारा RCE वर्ग पुन्हा उघडतो.
- रनटाइम स्थितीची पुष्टी करा: डॅशबोर्ड दाखवते a **पर्सिस्टंट एम्बर बॅनर** डॅशबोर्ड → सिक्युरिटी → ऑथोरायझेशन इन्व्हेंटरी अंतर्गत जेव्हाही `CORS_ALLOW_ALL=true` लाइव्ह असते आणि `/api/settings/authz-inventory` एक `cors: { allowAll, allowedOrigins }` लिफाफा मॉनिटरिंग टूल्स मतदान करू शकतात.

## विकास सुविधा — विशिष्ट स्थानिक उत्पत्तीस परवानगी देते

डेव्हमध्येही तुम्हाला क्वचितच वाइल्डकार्डची आवश्यकता असते. तुम्ही वापरत असलेल्या डेव्हल सर्व्हरला अनुमती द्या:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

मूळ केस-संवेदनशीलतेने अनुगामी स्लॅशकडे दुर्लक्ष करून जुळले आहे, म्हणून `http://localhost:3000` आणि `http://localhost:3000/` समतुल्य आहेत. मध्ये रनटाइमवर समान CSV सेट केले जाऊ शकते**डॅशबोर्ड → सुरक्षा → CORS अनुमत मूळ** रीस्टार्ट न करता.

## API की वि कुकी सत्रे

- **वाहक / `x-api-key` (द `/v1/*` अनुमान पृष्ठभाग):** ब्राउझर हे कधीही आपोआप संलग्न करत नाहीत. CORS येथे अर्थपूर्ण अडथळा नाही — द API की अडथळा आहे — म्हणूनच ती पृष्ठभाग हेतुपुरस्सर परवानगी आहे म्हणून ब्राउझर आणि Electron क्लायंट प्रतिसाद वाचू शकतात ज्याचा त्यांना आधीच हक्क आहे. आरामशीर प्रतिध्वनीला एक प्रमाणीकृत विषय आवश्यक आहे (एक प्रमाणित API की किंवा डॅशबोर्ड सत्र), फक्त क्रेडेन्शियल हेडर नाही आणि कधीही समाविष्ट नाही `Access-Control-Allow-Credentials`. निनावी प्रतिसाद (`REQUIRE_API_KEY=false`) कॉन्फिगर केलेल्या मूळ अनुमत सूचीचा वापर करा, त्यात स्पष्ट समावेश आहे `CORS_ALLOW_ALL=true` निवड करा. प्रमाणीकरण नकार (401) वाचनीय राहतात जेणेकरून क्लायंट रद्द केलेली किंवा चुकीची टाइप केलेली की (#5242): पाइपलाइनचा स्वतःचा 401 प्रतिध्वनी ठेवतो आणि एक मार्ग जो पाइपलाइनने अनामिक म्हणून सर्व्ह केल्यानंतर की स्वतःच नाकारतो (`/v1/models` आणि `/v1beta/models` व्यवस्थापन ऑथ कॉन्फिगर केलेले, मालक-व्याप्त `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` आणि स्वयं-कॉम्बो उमेदवार मार्ग) त्या 401 द्वारे प्रतिध्वनी जोडते `credentialRejectionHeaders()`. क्रेडेन्शियल हेडर असलेल्या विनंतीवर प्रतिध्वनी की केली जाते (`Authorization`, `x-api-key`, `x-goog-api-key` किंवा `auth_token` कुकी), त्यापैकी कोणत्या मार्गावर तपासले गेले नाही आणि ते कधीही जोडलेले नाही `Access-Control-Allow-Credentials`; शरीर एक निश्चित त्रुटी लिफाफा आहे. अंतर्गत व्यवस्थापन मार्ग `/api/v1/` द्वारे संरक्षित `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) हा क्रेडेन्शियल-नकार अपवाद वापरू नका: सह `REQUIRE_API_KEY=false`, त्यांचे 401/403 प्रतिसाद कॉन्फिगर केलेले अनुसरण करतात CORS मूळ धोरण.
- **कुकी सत्र (डॅशबोर्ड):** अयशस्वी-बंद डीफॉल्टद्वारे संरक्षित **आणि** सामायिक मार्गावर `Access-Control-Allow-Credentials` च्या अनुपस्थितीमुळे. management/dashboard मूळ कोणत्याही अनुज्ञेय कॉन्फिगरेशनच्या बाहेर ठेवा; ते अगदी अयशस्वी-बंद राहिले पाहिजे.

## WebSocket हँडशेक (`/v1/responses`, `/v1/ws`)

ब्राउझर WebSocket ला CORS लागू करत नाहीत, त्यामुळे WebSocket ट्रान्सपोर्ट्स जे निष्कर्ष आउटपुट परत करतात ते हँडशेक `Origin` स्वतः तपासतात (`src/server/origin/wsOrigin.ts`): प्रतिसाद WebSocket (`/v1/responses`) आणि जेव्हा OmniRoute `npm start` / `npm run dev`, `/v1/ws` आणि `/api/v1/ws` ब्रिज वरून चालते, जे `/v1/chat/completions`, `/v1/messages` आणि `/v1/responses` म्हणून प्रवाहित होते. ब्रिज `/api/v1/ws?handshake=1` निकालासाठी विचारतो आणि जोपर्यंत तो मार्ग तपासत नाही तोपर्यंत अपग्रेड करण्यास नकार देतो. प्रमाणीकरण आवश्यकता अजूनही स्वतंत्रपणे लागू होतात. मूळ तपासणी पास होते जेव्हा:

- यात `Origin` शीर्षलेख नाही (Codex CLI, SDKs आणि इतर नॉन-ब्राउझर क्लायंट);
- `Origin` वरील अनुमती यादीद्वारे प्रवेश दिला जातो (`CORS_ALLOWED_ORIGINS`, `corsOrigins` सेटिंग, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` हे OmniRoute च्या स्वतःच्या सार्वजनिक मूळपैकी एक आहे (कॉन्फिगर केलेला सार्वजनिक आधार URL, विश्वासार्ह प्रॉक्सीचा फॉरवर्ड केलेला मूळ, किंवा थेट loopback/LAN होस्ट IP शब्दशः किंवा `localhost` — समान उमेदवार डॅशबोर्ड उत्परिवर्तन तपासणी वापरतो); किंवा
- त्यात HTTP `/v1/*` पृष्ठभागाप्रमाणे वैध API की आहे.

इतर कोणत्याही गोष्टीला `403 ws_origin_forbidden` मिळते. डॅशबोर्ड सत्र कुकी विदेशी `Origin` सूट देत नाही, कारण ब्राउझर कोणत्याही पृष्ठाच्या सॉकेटशी संलग्न करतो. दुसऱ्या पोर्टवरील `localhost` समान-मूळ मानले जात नाही; `CORS_ALLOWED_ORIGINS` मध्ये अशी dev मूळ जोडा.

## उदाहरण: OmniRoute समोर रिव्हर्स प्रॉक्सी

CORS अंमलबजावणी OmniRoute द्वारेच केली जाते, त्यामुळे प्रॉक्सी सामान्यतः असावी**नाही** `Access-Control-*` शीर्षलेख जोडा किंवा पुन्हा लिहा (डबल हेडर ब्राउझर ब्रेक). TLS संपुष्टात आणा आणि — अग्रेषित करा OmniRoute प्रीफ्लाइटला उत्तर द्या:

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

प्रॉक्सीमध्ये नव्हे तर OmniRoute (`CORS_ALLOWED_ORIGINS` किंवा सुरक्षा टॅब) मध्ये अनुमत ब्राउझर मूळ सेट करा.

## स्त्रोत फायली

| काळजी                                  | फाईल                                                                 |
| -------------------------------------- | -------------------------------------------------------------------- |
| अनुमत रिजोल्यूशन + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| मिडलवेअर ऍप्लिकेशन (सत्याचा एकच स्रोत) | `src/server/authz/pipeline.ts`                                       |
| सेटिंग्ज → रनटाइम मूळ इंजेक्शन         | `src/lib/config/runtimeSettings.ts`                                  |
| डॅशबोर्डसाठी रनटाइम स्थिती             | `src/app/api/settings/authz-inventory/route.ts`                      |
| डॅशबोर्ड चेतावणी बॅनर                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS अनुमत मूळ फील्ड                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| क्लाउड-एजंट प्रति-मार्ग CORS (अपवाद)   | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket हँडशेक `Origin` चेक          | `src/server/origin/wsOrigin.ts`                                      |

## हे देखील पहा

- स्पॉन-सक्षम मार्गांसाठी [रूट गार्ड टियर्स](./ROUTE_GUARD_TIERS.md) — लूपबॅक अंमलबजावणी (एक वेगळे, पूरक नियंत्रण).
- [अधिकृतता मार्गदर्शक](../architecture/AUTHZ_GUIDE.md) — पूर्ण प्रमाणीकरण पाइपलाइन.
