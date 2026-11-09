# CORS Configuration & Security (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute कुनलाई नियन्त्रण गर्छ **ब्राउजर उत्पत्ति** एकल, केन्द्रीकृत अनुमति सूचीबाट क्रस-ओरिजिन प्रतिक्रियाहरू पढ्न सक्छ। मोडल छ **पूर्वनिर्धारित रूपमा असफल-बन्द** : तपाईंले एउटा अप्ट इन नगरेसम्म कुनै पनि उत्पत्तिलाई अनुमति दिइँदैन। यो पृष्ठले कसरी अनुमति दिने सूचीको समाधान गर्छ, `CORS_ALLOW_ALL=true` वास्तवमा के प्रकट गर्छ (र, महत्त्वपूर्ण कुरा, यसले के गर्छ भनेर कागजात गर्छ।**होइन** , कसरी सुरक्षित रूपमा dev बनाम उत्पादन कन्फिगर गर्ने, र वाइल्डकार्ड लाइभ हुँदा ड्यासबोर्डले रनटाइम चेतावनी दिन्छ।

**सत्यको स्रोत:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`)। अनुमति सूची एक पटक लागू हुन्छ, मिडलवेयरमा (`src/server/authz/pipeline.ts`) — प्रति-रूट ह्यान्डलरहरूले `Access-Control-Allow-Origin` आफैं सेट गर्दैनन्।

## कसरी एक उत्पत्ति समाधान हुन्छ

प्रत्येक अनुरोधको लागि मिडलवेयरले यस क्रममा `Access-Control-Allow-Origin` मान गणना गर्दछ:

1. **`CORS_ALLOW_ALL=true`** (वा लिगेसी `CORS_ORIGIN=*`) → कलरको `Origin` ब्याक (वा `Origin` हेडर नभएको बेला `*` ) लाई `Vary: Origin` सँग इको गर्छ, त्यसैले क्यासहरू सही रहन्छन्। एउटै `applyCorsHeaders()` चोकपोइन्टले टोकन-प्रमाणीकृत `/v1*`/`/v1beta*` सतह (`relaxForTokenAuth`, RFC 9110 §12.5.5, मुद्दा #6737) मा प्रत्येक 2xx-विथ-बॉडी प्रतिक्रियामा `Vary: Accept-Encoding` पनि जोड्छ, त्यसैले downstream/shared क्यासहरूले कम्प्रेस गरिएको र असम्पीडित भेरियन्टहरूलाई सही रूपमा छुट्याउन सक्छ।
2. अन्यथा, अनुरोध `Origin` सामान्य बनाइन्छ (लोअर-केस, ट्रेलिङ स्ल्याश स्ट्रिप गरिएको) र मिलाइएको छ।**मर्ज गरिएको अनुमति सूची** :
   - env **`CORS_ALLOWED_ORIGINS`** — अल्पविराम-विभाजित सूची, र
   - रनटाइम **`corsOrigins`** सेटिङ (ड्यासबोर्ड → सुरक्षा → _CORS Allowed Origins_), `src/lib/config/runtimeSettings.ts` बाट `setRuntimeAllowedOrigins()` मार्फत इंजेक्शन।
3. → सँग मेल खाँदैन **कुनै `Access-Control-Allow-Origin` हेडर उत्सर्जित छैन** । ब्राउजरले क्रस-ओरिजिन पढ्न रोक्छ। यो अभिप्रेत असफल-बंद पूर्वनिर्धारित हो।

| Env var                | अर्थ                                                                             |
| ---------------------- | -------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | अनुमति दिनको लागि सही उत्पत्तिकोCSV (सिफारिस गरिएको)।                            |
| `CORS_ALLOW_ALL`       | `true`/`1` → कुनै पनि उत्पत्ति (वाइल्डकार्ड) इको। देव मात्र।                     |
| `CORS_ORIGIN`          | विरासत। `*` `CORS_ALLOW_ALL` जस्तै व्यवहार गर्छ; अनुमति सूचीमा एकल मान थपिएको छ। |

## थ्रेट मोडेल — के `CORS_ALLOW_ALL=true` ले वास्तवमा उजागर गर्दछ

जेनेरिक OWASP चेतावनी ("वाइल्डकार्ड CORS = कुनै पनि साइटले तपाइँको API कल गर्न सक्छ") लाई गम्भीरतापूर्वक लिन लायक छ, तर OmniRoute को एक्सपोजर हो।**जेनेरिक केस भन्दा साँघुरो** , एउटा ठोस कार्यान्वयन तथ्यको कारण:

> **केन्द्रीय `applyCorsHeaders()` कहिल्यै `Access-Control-Allow-Credentials` उत्सर्जन गर्दैन।** सर्भरले `Access-Control-Allow-Credentials: true` पठाउँदैन भने ब्राउजरले _credentialed_ (कुकी-असर) क्रस-ओरिजिन प्रतिक्रियालाई खुलासा गर्दैन। OmniRoute को साझा CORS मार्ग कहिल्यै गर्दैन।

`CORS_ALLOW_ALL=true` का साथ पनि प्रति सतह के हो:

| सतह                                      | प्रमाणीकरण संयन्त्र     | वाइल्डकार्ड CORS को प्रभाव                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ड्यासबोर्ड / MANAGEMENT `/api/*`         | कुकी सत्र               | उत्पत्ति प्रतिध्वनित छ, तर **`Allow-Credentials` बिना** ब्राउजर **ब्लकहरू** प्रमाण पत्र पढियो। एक दुर्भावनापूर्ण क्रस-मूल साइट **पढ्न सक्दैनन्** तपाईंको प्रमाणिकरण ड्यासबोर्ड प्रतिक्रियाहरू, र सत्र कुकी खुला छैन।                                                                                                                                                                                                                                                                                                                            |
| ग्राहक API `/v1/*`, `/v1beta/*`          | वाहक / `x-api-key` हेडर | पहिले नै अनुमति छ **डिजाइन द्वारा** (`relaxForTokenAuth`): ब्राउजरहरूले `Authorization`/`x-api-key` लाई कहिल्यै स्वत: संलग्न गर्दैन, त्यसैले आक्रमणकर्ताको पृष्ठले तपाईंको कुञ्जी आपूर्ति गर्न सक्दैन। आरामदायी प्रतिध्वनिका लागि प्रमाणिकरण गरिएको विषय (एक प्रमाणीकृत API कुञ्जी वा ड्यासबोर्ड सत्र) चाहिन्छ, प्रमाणिक हेडर मात्र होइन, र `Access-Control-Allow-Credentials` कहिल्यै समावेश हुँदैन। बेनामी प्रतिक्रियाहरू (`REQUIRE_API_KEY=false`) ले स्पष्ट `CORS_ALLOW_ALL=true` अप्ट-इन सहित कन्फिगर गरिएको मूल अनुमति सूची प्रयोग गर्दछ। |
| सार्वजनिक मात्र पढ्ने (`/api/health`, …) | कुनै पनि छैन            | गैर-संवेदनशील; वाइल्डकार्ड हानिरहित छ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

त्यसैले द **अवशिष्ट** `CORS_ALLOW_ALL=true` को एक्सपोजर निम्नमा सीमित छ: (a) गैर-क्रेडेन्शियल क्रस-ओरिजिन **पढ्छ** पहिले नै-अप्रमाणित डाटाको, र (b) CORS अनुमति दिँदै**पूर्व उडान पास** व्यवस्थापन मार्गहरूमा — जसलाई अझै प्रमाणीकरण चाहिन्छ जुन क्रस-ओरिजिन पृष्ठले प्रदान गर्न सक्दैन। यो छ **होइन** साझा CORS मार्गमा सत्र-हाइज्याक वा प्रमाण-चोरी भेक्टर।

### एक वास्तविक अपवाद — `/api/v1/agents/`

क्लाउड-एजेन्ट मार्गहरू (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) तिनीहरूको सेट **आफ्नै** CORS हेडर (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) र **गर्नु** `Access-Control-Allow-Credentials: true` सँग `Access-Control-Allow-Origin: <origin>|*` उत्सर्जन गर्नुहोस्। यो एकल सतह हो जहाँ उत्पत्ति-प्रतिध्वनि र प्रमाणहरू सहअस्तित्वमा हुन्छन्, र यो हो**`CORS_ALLOW_ALL` बाट स्वतन्त्र** । यी मार्गहरू व्यवस्थापन-प्रमाणीकृत छन् (`requireManagementAuth`); ड्यासबोर्ड अफ-होस्टको खुलासा गर्ने अपरेटरहरू सचेत हुनुपर्छ कि प्रतिक्रिया हेडरहरूद्वारा क्रस-ओरिजिन क्रेडेन्सियल पठन अनुमति दिइएको यो एउटा ठाउँ हो। यो CORS मार्गदर्शनबाट छुट्टै ट्र्याक गरिएको छ।

## उत्पादन चेकलिस्ट

- **उत्पादनमा `CORS_ALLOW_ALL=true` कहिल्यै सेट नगर्नुहोस्।** यसलाई सेट नगरी छोड्नुहोस्।
- एक सेट गर्नुहोस्**स्पष्ट** मूल सूची — या त env var वा सुरक्षा-ट्याब क्षेत्र:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- यदि OmniRoute रिभर्स प्रोक्सी / टनेल (nginx, Caddy, Cloudflare Tunnel, Tailscale) को पछाडि दौडन्छ, CORS हो**होइन** तपाईको मात्र नियन्त्रण — ले लुपब्याक मार्ग गार्डले अझै पनि स्पन-सक्षम मार्गहरू सुरक्षित गर्दछ ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) हेर्नुहोस्)। 403 लाई "फिक्स" गर्न `X-Forwarded-For: 127.0.0.1` नबनाउनुहोस्; जसले RCE क्लास पुन: खोल्छ रुट गार्ड बन्द हुन्छ।
- रनटाइम अवस्था पुष्टि गर्नुहोस्: ड्यासबोर्डले देखाउँछ a **निरन्तर एम्बर ब्यानर** ड्यासबोर्ड → सुरक्षा → प्राधिकरण सूची अन्तर्गत जब पनि `CORS_ALLOW_ALL=true` लाइभ हुन्छ, र `/api/settings/authz-inventory` ले `cors: { allowAll, allowedOrigins }` खाम अनुगमन उपकरणहरूले मतदान गर्न सक्छ।

## विकास सुविधा — विशिष्ट स्थानीय उत्पत्तिहरूलाई अनुमति दिन्छ

तपाईंलाई dev मा पनि विरलै वाइल्डकार्ड चाहिन्छ। तपाईंले प्रयोग गर्नुहुने dev सर्भरहरूलाई मात्र अनुमति दिनुहोस्:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

उत्पत्तिहरू केस-असंवेदनशील रूपमा ट्रेलिङ स्ल्याशलाई बेवास्ता गरी मिलाइन्छ, त्यसैले `http://localhost:3000` र `http://localhost:3000/` बराबर छन्। उही CSV रनटाइम मा सेट गर्न सकिन्छ **ड्यासबोर्ड → सुरक्षा → CORS अनुमति दिइएको मूल** पुन: सुरु बिना।

## API कुकीहरू बनाम कुकी सत्रहरू

- **वाहक / `x-api-key` (द `/v1/*` अनुमान सतह):** ब्राउजरहरूले यसलाई स्वचालित रूपमा संलग्न गर्दैनन्। CORS यहाँ अर्थपूर्ण बाधा छैन — द API कुञ्जी बाधा हो — त्यसकारण त्यो सतह जानाजानी अनुमति दिइएको छ त्यसैले ब्राउजर र Electron ग्राहकहरूले प्रतिक्रियाहरू पढ्न सक्छन् जुन तिनीहरू पहिले नै हकदार छन्। आरामदायी प्रतिध्वनिलाई एक प्रमाणीकृत विषय चाहिन्छ (एक मान्य API कुञ्जी वा ड्यासबोर्ड सत्र), केवल एक प्रमाण हेडर मात्र होइन, र कहिल्यै समावेश गर्दैन `Access-Control-Allow-Credentials`। बेनामी प्रतिक्रिया (`REQUIRE_API_KEY=false`) स्पष्ट सहित कन्फिगर गरिएको मूल अनुमति सूची प्रयोग गर्नुहोस् `CORS_ALLOW_ALL=true` अप्ट-इन। प्रमाणीकरण अस्वीकारहरू (401) पढ्न योग्य रहन्छन् ताकि क्लाइन्टहरूले खारेज वा गलत टाइप गरिएको कुञ्जी सतह गर्न सक्छन् (#5242): पाइपलाइनको आफ्नै 401 ले प्रतिध्वनि राख्छ, र पाइपलाइनले यसलाई अज्ञात रूपमा सेवा गरेपछि कुञ्जीलाई अस्वीकार गर्ने मार्ग (`/v1/models` र `/v1beta/models` व्यवस्थापन प्रमाणीकरण कन्फिगर गरिएको, मालिकको दायरा `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` र स्वत: कम्बो उम्मेद्वार मार्गहरू) ले 401 मार्फत प्रतिध्वनि थप्छ `credentialRejectionHeaders()`। क्रेडेन्सियल हेडर (`Authorization`, `x-api-key`, `x-goog-api-key` वा `auth_token` कुकी), ती मध्ये कुन रुटमा जाँच गरिएको होइन, र कहिल्यै जोडिएको छैन `Access-Control-Allow-Credentials`; शरीर एक निश्चित त्रुटि खाम हो। व्यवस्थापन मार्गहरू अन्तर्गत `/api/v1/` द्वारा संरक्षित `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) यो प्रमाण-अस्वीकार अपवाद प्रयोग नगर्नुहोस्: साथ `REQUIRE_API_KEY=false`, तिनीहरूको 401/403 प्रतिक्रियाहरू कन्फिगर गरिएको पालना गर्नुहोस् CORS मूल नीति।
- **कुकी सत्र (ड्यासबोर्ड):** असफल-बंद पूर्वनिर्धारित द्वारा सुरक्षित **र** साझा मार्गमा `Access-Control-Allow-Credentials` को अनुपस्थिति द्वारा। management/dashboard उत्पत्तिलाई कुनै पनि अनुमति दिने कन्फिगरेसनबाट बाहिर राख्नुहोस्; तिनीहरू ठ्याक्कै असफल बन्द रहनु पर्छ।

## WebSocket ह्यान्डशेक (`/v1/responses`, `/v1/ws`)

ब्राउजरहरूले WebSocket मा CORS लागू गर्दैनन्, त्यसैले WebSocket ट्रान्सपोर्टहरू जसले इन्फरेन्स आउटपुट फर्काउँछ ह्यान्डशेक `Origin` आफैं जाँच गर्दछ (`src/server/origin/wsOrigin.ts`): प्रतिक्रियाहरू WebSocket (`/v1/responses`) र, जब OmniRoute `npm start` / `npm run dev`, `/v1/ws` र `/api/v1/ws` ब्रिज हुँदै जान्छ, जसले `/v1/chat/completions`, `/v1/messages` र `/v1/responses` लाई स्ट्रिम गर्दछ। ब्रिजले `/api/v1/ws?handshake=1` निर्णयको लागि सोध्छ र त्यो मार्गले चेक चलाउन नसकेसम्म अपग्रेड गर्न अस्वीकार गर्छ। प्रमाणीकरण आवश्यकताहरू अझै पनि छुट्टै लागू हुन्छन्। उत्पत्ति जाँच पास हुन्छ जब:

- यसमा कुनै `Origin` हेडर छैन (Codex CLI, SDKs र अन्य गैर-ब्राउजर ग्राहकहरू);
- `Origin` माथिको अनुमोदित सूचीद्वारा भर्ना गरिएको छ (`CORS_ALLOWED_ORIGINS`, `corsOrigins` सेटिङ, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` OmniRoute को आफ्नै सार्वजनिक उत्पत्तिहरू मध्ये एक हो (कन्फिगर गरिएको सार्वजनिक आधार URL, एक विश्वसनीय प्रोक्सीको फर्वार्ड गरिएको मूल, वा IP शाब्दिक वा `localhost` — उही उम्मेद्वारहरूले ड्यासबोर्ड उत्परिवर्तन जाँचको रूपमा प्रयोग गर्ने प्रत्यक्ष loopback/LAN होस्ट); वा
- यसले एक वैध API कुञ्जी बोक्छ, जस्तै HTTP `/v1/*` सतहमा।

अरू कुनै पनि कुराले `403 ws_origin_forbidden` पाउँछ। ड्यासबोर्ड सत्र कुकीले विदेशी `Origin` छुट दिँदैन, किनभने ब्राउजरले यसलाई कुनै पनि पृष्ठको सकेटमा संलग्न गर्छ। अर्को पोर्टमा `localhost` समान-उत्पत्तिको रूपमा व्यवहार गरिएको छैन; `CORS_ALLOWED_ORIGINS` मा यस्तो dev origins थप्नुहोस्।

## उदाहरण: OmniRoute को अगाडि रिभर्स प्रोक्सी

CORS OmniRoute आफैले लागू गरेको छ, त्यसैले प्रोक्सी सामान्यतया हुनुपर्छ **होइन** `Access-Control-*` हेडरहरू थप्नुहोस् वा पुन: लेख्नुहोस् (डबल हेडरहरू ब्राउजरहरू तोड्नुहोस्)। TLS समाप्त गर्नुहोस् र — लाई OmniRoute लाई प्रिफ्लाइटको जवाफ दिनुहोस्:

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

अनुमति दिइएको ब्राउजर उत्पत्ति OmniRoute (`CORS_ALLOWED_ORIGINS` वा सुरक्षा ट्याब) मा सेट गर्नुहोस्, प्रोक्सीमा होइन।

## स्रोत फाइलहरू

| चिन्ता                                 | फाइल                                                                 |
| -------------------------------------- | -------------------------------------------------------------------- |
| स्वीकृत रिजोल्युसन + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| मिडलवेयर अनुप्रयोग (सत्यको एकल स्रोत)  | `src/server/authz/pipeline.ts`                                       |
| सेटिङहरू → रनटाइम मूल इंजेक्शन         | `src/lib/config/runtimeSettings.ts`                                  |
| ड्यासबोर्डको लागि रनटाइम स्थिति        | `src/app/api/settings/authz-inventory/route.ts`                      |
| ड्यासबोर्ड चेतावनी ब्यानर              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS अनुमति दिइएको उत्पत्ति क्षेत्र    | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| क्लाउड-एजेन्ट प्रति-रुट CORS (अपवाद)   | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket ह्यान्डशेक `Origin` चेक      | `src/server/origin/wsOrigin.ts`                                      |

## यो पनि हेर्नुहोस्

- [रुट गार्ड टियर्स](./ROUTE_GUARD_TIERS.md) — लुपब्याक प्रवर्तन स्पोन-सक्षम मार्गहरूको लागि (एक अलग, पूरक नियन्त्रण)।
- [प्राधिकरण गाइड](../architecture/AUTHZ_GUIDE.md) — पूर्ण प्रमाणीकरण पाइपलाइन।
