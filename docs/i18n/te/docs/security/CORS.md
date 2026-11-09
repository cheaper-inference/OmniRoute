# CORS Configuration & Security (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute దేనిని నియంత్రిస్తుంది**బ్రౌజర్ మూలాలు** ఒకే, కేంద్రీకృత అనుమతి జాబితా నుండి క్రాస్-ఆరిజిన్ ప్రతిస్పందనలను చదవవచ్చు. మోడల్ ఉంది**డిఫాల్ట్గా వైఫల్యం-మూసివేయబడింది** : మీరు ఒకదానిని ఎంచుకునే వరకు మూలం ఏదీ అనుమతించబడదు. ఈ పేజీ అనుమతి జాబితా ఎలా పరిష్కరిస్తుంది, `CORS_ALLOW_ALL=true` వాస్తవానికి ఏమి బహిర్గతం చేస్తుంది (మరియు, ముఖ్యంగా, అది ఏమి చేస్తుంది)**కాదు** ), dev vs ఉత్పత్తిని సురక్షితంగా ఎలా కాన్ఫిగర్ చేయాలి మరియు వైల్డ్కార్డ్ లైవ్లో ఉన్నప్పుడు డ్యాష్బోర్డ్ చూపే రన్టైమ్ హెచ్చరిక.

**సత్యానికి మూలం:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). అనుమతించబడిన జాబితా ఒకసారి వర్తించబడుతుంది, మిడిల్వేర్ (`src/server/authz/pipeline.ts`) — పర్-రూట్ హ్యాండ్లర్లు `Access-Control-Allow-Origin` తాము సెట్ చేయరు.

## మూలం ఎలా పరిష్కరించబడుతుంది

ప్రతి అభ్యర్థన కోసం మిడిల్వేర్ `Access-Control-Allow-Origin` విలువను ఈ క్రమంలో గణిస్తుంది:

1. **`CORS_ALLOW_ALL=true`** (లేదా లెగసీ `CORS_ORIGIN=*`) → కాలర్ యొక్క `Origin` వెనుకకు ప్రతిధ్వనిస్తుంది (లేదా `Origin` హెడర్ లేనప్పుడు `*` ), `Vary: Origin` తో కాష్లు సరిగ్గా ఉంటాయి. అదే `applyCorsHeaders()` చోక్పాయింట్ టోకెన్-ప్రామాణీకరించబడిన `/v1*`/`/v1beta*` ఉపరితలంపై (`relaxForTokenAuth`, RFC 9110 §12.5.5, సంచిక #6737)పై ప్రతి 2xx-విత్-బాడీ ప్రతిస్పందనకు `Vary: Accept-Encoding` కూడా జోడిస్తుంది, కాబట్టి downstream/shared కాష్లు కంప్రెస్డ్ వర్సెస్ అన్కంప్రెస్డ్ వేరియంట్లను సరిగ్గా గుర్తించగలవు.
2. లేకపోతే, అభ్యర్థన `Origin` సాధారణీకరించబడింది (లోయర్-కేస్డ్, ట్రైలింగ్ స్లాష్ స్ట్రిప్డ్) మరియు దీనికి వ్యతిరేకంగా సరిపోలింది**విలీనమైన అనుమతి జాబితా** :
   - env **`CORS_ALLOWED_ORIGINS`** — కామాతో వేరు చేయబడిన జాబితా మరియు
   - అమలు సమయం**`corsOrigins`** సెట్టింగ్ (డాష్బోర్డ్ → సెక్యూరిటీ → _CORS అనుమతించబడిన మూలాలు_), `src/lib/config/runtimeSettings.ts` నుండి `setRuntimeAllowedOrigins()` ద్వారా ఇంజెక్ట్ చేయబడింది.
3. → తో సరిపోలలేదు**`Access-Control-Allow-Origin` హెడర్ ఏదీ విడుదల చేయబడలేదు** . బ్రౌజర్ క్రాస్-ఆరిజిన్ రీడ్ను బ్లాక్ చేస్తుంది. ఇది ఉద్దేశించిన ఫెయిల్-క్లోజ్డ్ డిఫాల్ట్.

| ఎన్వి వర్              | అర్థం                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | అనుమతించడానికి ఖచ్చితమైన మూలాల CSV (సిఫార్సు చేయబడింది).                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → ఏదైనా మూలం (వైల్డ్కార్డ్) ప్రతిధ్వనిస్తుంది. దేవ్ మాత్రమే.                      |
| `CORS_ORIGIN`          | వారసత్వం. `*` `CORS_ALLOW_ALL` లాగా ప్రవర్తిస్తుంది; అనుమతి జాబితాకు ఒకే విలువ జోడించబడింది. |

## `CORS_ALLOW_ALL=true` నిజంగా బహిర్గతం చేసే థ్రెట్ మోడల్ —

జెనరిక్ OWASP హెచ్చరిక ("వైల్డ్కార్డ్ CORS = ఏదైనా సైట్ మీ API కాల్ చేయవచ్చు") తీవ్రంగా పరిగణించదగినది, అయితే OmniRoute యొక్క బహిర్గతం**సాధారణ కేసు కంటే ఇరుకైనది** , ఒక నిర్దిష్ట అమలు వాస్తవం కారణంగా:

> **సెంట్రల్ `applyCorsHeaders()` ఎప్పుడూ `Access-Control-Allow-Credentials` విడుదల చేయదు.** సర్వర్ `Access-Control-Allow-Credentials: true` పంపితే తప్ప బ్రౌజర్ _credentialed_ (కుకీ-బేరింగ్) క్రాస్-ఆరిజిన్ ప్రతిస్పందనను బహిర్గతం చేయదు. OmniRoute యొక్క భాగస్వామ్య CORS మార్గం ఎప్పుడూ ఉండదు.

`CORS_ALLOW_ALL=true` తో కూడా ప్రతి ఉపరితలంపై అంటే ఏమిటి:

| ఉపరితలం                                      | ప్రమాణీకరణ విధానం         | వైల్డ్కార్డ్ CORS ప్రభావం                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| డాష్బోర్డ్ / MANAGEMENT `/api/*`             | కుకీ సెషన్                | మూలం ప్రతిధ్వనించింది, కానీ**`Allow-Credentials` లేకుండా** బ్రౌజర్**బ్లాక్స్** క్రెడెన్షియల్ రీడ్. హానికరమైన క్రాస్-ఆరిజిన్ సైట్**చదవలేరు** మీ ప్రామాణీకరించబడిన డాష్బోర్డ్ ప్రతిస్పందనలు మరియు సెషన్ కుక్కీ బహిర్గతం కాలేదు.                                                                                                                                                                                                                                                                                                          |
| క్లయింట్ API `/v1/*`, `/v1beta/*`            | బేరర్ / `x-api-key` హెడర్ | ఇప్పటికే అనుమతి ఉంది**డిజైన్ ద్వారా** (`relaxForTokenAuth`): బ్రౌజర్లు ఎప్పుడూ `Authorization`/`x-api-key` ని స్వయంచాలకంగా జోడించవు, కాబట్టి దాడి చేసేవారి పేజీ మీ కీని అందించదు. రిలాక్స్డ్ ఎకోకి ప్రామాణీకరించబడిన సబ్జెక్ట్ (ధృవీకరించబడిన API కీ లేదా డాష్బోర్డ్ సెషన్) అవసరం, కేవలం క్రెడెన్షియల్ హెడర్ మాత్రమే కాదు మరియు ఎప్పుడూ `Access-Control-Allow-Credentials` కలిగి ఉండదు. అనామక ప్రతిస్పందనలు (`REQUIRE_API_KEY=false`) స్పష్టమైన `CORS_ALLOW_ALL=true` ఎంపికతో సహా కాన్ఫిగర్ చేయబడిన మూలం అనుమతి జాబితాను ఉపయోగిస్తాయి. |
| పబ్లిక్ చదవడానికి మాత్రమే (`/api/health`, …) | ఏదీ లేదు                  | నాన్-సెన్సిటివ్; వైల్డ్కార్డ్ ప్రమాదకరం కాదు.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

కాబట్టి ది**అవశేష** `CORS_ALLOW_ALL=true` యొక్క బహిర్గతం వీటికి పరిమితం చేయబడింది: (a) నాన్-క్రెడెన్షియల్ క్రాస్-ఆరిజిన్**చదువుతాడు** ఇప్పటికే ప్రమాణీకరించని డేటా, మరియు (బి) CORS అనుమతించడం**ప్రీఫ్లైట్ పాస్** నిర్వహణ మార్గాలలో — ఇప్పటికీ ఒక క్రాస్-ఆరిజిన్ పేజీ అందించలేని ప్రామాణీకరణ అవసరం. ఇది**కాదు** షేర్డ్ CORS మార్గంలో సెషన్-హైజాక్ లేదా క్రెడెన్షియల్-థెఫ్ట్ వెక్టర్.

### ఒక నిజమైన మినహాయింపు — `/api/v1/agents/`

క్లౌడ్-ఏజెంట్ రూట్లు (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) వాటిని సెట్ చేశాయి**స్వంతం** CORS శీర్షికలు (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) మరియు**చేయండి** `Access-Control-Allow-Credentials: true` తో కలిసి `Access-Control-Allow-Origin: <origin>|*` విడుదల చేయండి. ఇది మూలం-ప్రతిధ్వని మరియు ఆధారాలు కలిసి ఉండే ఏకైక ఉపరితలం, మరియు ఇది**`CORS_ALLOW_ALL` నుండి స్వతంత్రమైనది** . ఈ మార్గాలు నిర్వహణ-ప్రామాణీకరించబడినవి (`requireManagementAuth`); డ్యాష్బోర్డ్ ఆఫ్-హోస్ట్ను బహిర్గతం చేసే ఆపరేటర్లు, ప్రతిస్పందన హెడర్ల ద్వారా క్రాస్-ఆరిజిన్ క్రెడెన్షియల్ రీడ్ అనుమతించబడిన ప్రదేశం ఇదేనని తెలుసుకోవాలి. ఇది స్పష్టమైన అనుమతి జాబితాకు బిగించడం ఈ CORS మార్గదర్శకత్వం నుండి విడిగా ట్రాక్ చేయబడుతుంది.

## ఉత్పత్తి చెక్లిస్ట్

- **ఉత్పత్తిలో `CORS_ALLOW_ALL=true` ఎప్పుడూ సెట్ చేయవద్దు.** సెట్ చేయకుండా వదిలేయండి.
- ఒక సెట్ చేయండి**స్పష్టమైన** మూలం జాబితా — env var లేదా సెక్యూరిటీ-ట్యాబ్ ఫీల్డ్:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute రివర్స్ ప్రాక్సీ / టన్నెల్ (nginx, Caddy, Cloudflare టన్నెల్, Tailscale) వెనుక నడుస్తున్నట్లయితే, CORS**కాదు** మీ ఏకైక నియంత్రణ — లూప్బ్యాక్ రూట్ గార్డ్ ఇప్పటికీ స్పాన్-సామర్థ్యం గల మార్గాలను రక్షిస్తుంది ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) చూడండి). 403ని "ఫిక్స్" చేయడానికి `X-Forwarded-For: 127.0.0.1` నకిలీ చేయవద్దు; ఇది RCE తరగతిని మళ్లీ తెరుస్తుంది, రూట్ గార్డ్ మూసివేస్తుంది.
- రన్టైమ్ స్థితిని నిర్ధారించండి: డాష్బోర్డ్ చూపిస్తుంది a **నిరంతర అంబర్ బ్యానర్** `CORS_ALLOW_ALL=true` లైవ్లో ఉన్నప్పుడు డాష్బోర్డ్ → సెక్యూరిటీ → ఆథరైజేషన్ ఇన్వెంటరీ కింద, మరియు `/api/settings/authz-inventory` తిరిగి `cors: { allowAll, allowedOrigins }` ఎన్వలప్ మానిటరింగ్ టూల్స్ పోల్ చేయగలదు.

## అభివృద్ధి సౌలభ్యం — నిర్దిష్ట స్థానిక మూలాలను అనుమతిస్తుంది

దేవ్లో కూడా మీకు చాలా అరుదుగా వైల్డ్కార్డ్ అవసరం. మీరు ఉపయోగించే dev సర్వర్లను మాత్రమే అనుమతించండి:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

విస్మరించబడిన వెనుకబడిన స్లాష్తో మూలాలు కేస్-సెన్సిటివ్గా సరిపోలాయి, కాబట్టి `http://localhost:3000` మరియు `http://localhost:3000/` సమానంగా ఉంటాయి. అదే CSV రన్టైమ్లో సెట్ చేయవచ్చు**డాష్బోర్డ్ → సెక్యూరిటీ → CORS అనుమతించబడిన మూలాలు** పునఃప్రారంభం లేకుండా.

## API కీలు vs కుక్కీ సెషన్లు

- **బేరర్ / `x-api-key` ( `/v1/*` అనుమితి ఉపరితలం):** బ్రౌజర్లు వీటిని స్వయంచాలకంగా జోడించవు. CORS ఇక్కడ అర్ధవంతమైన అవరోధం కాదు — API కీ అవరోధం —, అందుకే ఆ ఉపరితలం ఉద్దేశపూర్వకంగా అనుమతించబడుతుంది కాబట్టి బ్రౌజర్ మరియు Electron క్లయింట్లు తమకు ఇప్పటికే హక్కు ఉన్న ప్రతిస్పందనలను చదవగలరు. రిలాక్స్డ్ ఎకోకి ప్రామాణీకరించబడిన సబ్జెక్ట్ (ధృవీకరించబడిన API కీ లేదా డాష్బోర్డ్ సెషన్) అవసరం, కేవలం క్రెడెన్షియల్ హెడర్ మాత్రమే కాదు మరియు ఎప్పుడూ `Access-Control-Allow-Credentials` కలిగి ఉండదు. అనామక ప్రతిస్పందనలు (`REQUIRE_API_KEY=false`) స్పష్టమైన `CORS_ALLOW_ALL=true` ఎంపికతో సహా కాన్ఫిగర్ చేయబడిన మూలం అనుమతి జాబితాను ఉపయోగిస్తాయి. ప్రామాణీకరణ తిరస్కరణలు (401) చదవగలిగేలా ఉంటాయి కాబట్టి క్లయింట్లు ఉపసంహరించబడిన లేదా తప్పుగా టైప్ చేయబడిన కీ (#5242): పైప్లైన్ యొక్క స్వంత 401 ప్రతిధ్వనిని ఉంచుతుంది మరియు పైప్లైన్ దానిని అనామకంగా అందించిన తర్వాత కీని తిరస్కరించే మార్గం (`/v1/models` మరియు `/v1beta/models` తో నిర్వహణ auth కాన్ఫిగర్ చేయబడింది, `/v1/files`, `/v1/batches`, ZQ, `/v1/media`, `/v1/session-leases` ఆటో-కాంబో అభ్యర్థి మార్గాలు) `credentialRejectionHeaders()` ద్వారా ఆ 401కి ప్రతిధ్వనిని జోడిస్తుంది. క్రెడెన్షియల్ హెడర్ (`Authorization`, `x-api-key`, `x-goog-api-key` లేదా `auth_token` కుక్కీ)ని కలిగి ఉన్న అభ్యర్థనపై ప్రతిధ్వని కీ చేయబడింది, వాటిలో ఏది మార్గం తనిఖీ చేయబడిందో కాదు మరియు `Access-Control-Allow-Credentials` తో ఎప్పుడూ జత చేయబడదు; శరీరం ఒక స్థిర దోషం ఎన్వలప్. `/api/v1/` కింద నిర్వహణ మార్గాలు `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ద్వారా ఈ క్రెడెన్షియల్-తిరస్కరణ మినహాయింపును ఉపయోగించవు: `REQUIRE_API_KEY=false` తో , వారి 401/403 ప్రతిస్పందనలు కాన్ఫిగర్ చేయబడిన CORS మూల విధానాన్ని అనుసరిస్తాయి.
- **కుకీ సెషన్ (డాష్బోర్డ్):** ఫెయిల్-క్లోజ్డ్ డిఫాల్ట్ ద్వారా రక్షించబడింది**మరియు** భాగస్వామ్య మార్గంలో `Access-Control-Allow-Credentials` లేకపోవడం ద్వారా. management/dashboard మూలాలను ఏదైనా అనుమతి కాన్ఫిగరేషన్ నుండి దూరంగా ఉంచండి; అవి ఖచ్చితంగా ఫెయిల్-క్లోజ్డ్గా ఉండాలి.

## WebSocket హ్యాండ్షేక్లు (`/v1/responses`, `/v1/ws`)

బ్రౌజర్లు WebSocket కి CORS వర్తింపజేయవు, కాబట్టి WebSocket ట్రాన్స్పోర్ట్లు రిటర్న్ చేసే ఇన్ఫరెన్స్ అవుట్పుట్ హ్యాండ్షేక్ `Origin` స్వయంగా తనిఖీ చేస్తుంది (`src/server/origin/wsOrigin.ts`): ప్రతిస్పందనలు WebSocket (`/v1/responses`) మరియు, OmniRoute `npm start` / `npm run dev`, `/v1/ws` మరియు `/api/v1/ws` బ్రిడ్జ్ ద్వారా నడుస్తున్నప్పుడు, ఇది `/v1/chat/completions`, `/v1/messages` మరియు `/v1/responses` వంటి ఫ్రేమ్లను ప్రసారం చేస్తుంది. వంతెన తీర్పు కోసం `/api/v1/ws?handshake=1` అడుగుతుంది మరియు ఆ మార్గం చెక్ను అమలు చేస్తే తప్ప అప్గ్రేడ్ చేయడానికి నిరాకరిస్తుంది. ప్రమాణీకరణ అవసరాలు ఇప్పటికీ విడిగా వర్తిస్తాయి. మూలం చెక్ పాస్ అయినప్పుడు:

- దీనికి `Origin` హెడర్ లేదు (Codex CLI, SDKs మరియు ఇతర నాన్-బ్రౌజర్ క్లయింట్లు);
- `Origin` ఎగువన అనుమతించబడిన జాబితా ద్వారా అనుమతించబడుతుంది (`CORS_ALLOWED_ORIGINS`, `corsOrigins` సెట్టింగ్, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` అనేది OmniRoute యొక్క స్వంత పబ్లిక్ మూలాలలో ఒకటి (కాన్ఫిగర్ చేయబడిన పబ్లిక్ బేస్ URL, విశ్వసనీయ ప్రాక్సీ యొక్క ఫార్వార్డ్ మూలం లేదా IP లిటరల్ లేదా `localhost` — వలె ఇవ్వబడిన డైరెక్ట్ loopback/LAN హోస్ట్ అదే అభ్యర్థులను డాష్బోర్డ్ మ్యుటేషన్ చెక్ ఉపయోగిస్తుంది); లేదా
- ఇది HTTP `/v1/*` ఉపరితలం వలె చెల్లుబాటు అయ్యే API కీని కలిగి ఉంటుంది.

మరేదైనా `403 ws_origin_forbidden` పొందుతుంది. డాష్బోర్డ్ సెషన్ కుక్కీ విదేశీ `Origin` మినహాయించదు , ఎందుకంటే బ్రౌజర్ దానిని ఏదైనా పేజీ యొక్క సాకెట్కు జోడించింది. మరొక పోర్ట్లోని `localhost` అదే-మూలంగా పరిగణించబడదు; అటువంటి దేవ్ మూలాలను `CORS_ALLOWED_ORIGINS` కి జోడించండి.

## ఉదాహరణ: OmniRoute ముందు రివర్స్ ప్రాక్సీ

CORS OmniRoute ద్వారానే అమలు చేయబడుతుంది, కాబట్టి ప్రాక్సీ సాధారణంగా ఉండాలి**కాదు** `Access-Control-*` హెడర్లను జోడించండి లేదా తిరిగి వ్రాయండి (డబుల్ హెడర్లు బ్రౌజర్లను విచ్ఛిన్నం చేస్తాయి). TLS ముగించి, — ని ఫార్వార్డ్ OmniRoute ని ప్రిఫ్లైట్కి సమాధానం ఇవ్వనివ్వండి:

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

అనుమతించబడిన బ్రౌజర్ మూలాలను ప్రాక్సీలో కాకుండా OmniRoute (`CORS_ALLOWED_ORIGINS` లేదా సెక్యూరిటీ ట్యాబ్లో సెట్ చేయండి.

## మూల ఫైళ్లు

| ఆందోళన                                       | ఫైల్                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------- |
| + `getCorsStatus()` రిజల్యూషన్ని అనుమతించండి | `src/server/cors/origins.ts`                                         |
| మిడిల్వేర్ అప్లికేషన్ (సత్యం యొక్క ఒకే మూలం) | `src/server/authz/pipeline.ts`                                       |
| → రన్టైమ్ మూలం ఇంజెక్షన్ సెట్టింగ్లు         | `src/lib/config/runtimeSettings.ts`                                  |
| డాష్బోర్డ్ కోసం రన్టైమ్ స్థితి               | `src/app/api/settings/authz-inventory/route.ts`                      |
| డ్యాష్బోర్డ్ హెచ్చరిక బ్యానర్                | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS అనుమతించబడిన మూలాల ఫీల్డ్               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| క్లౌడ్-ఏజెంట్ పర్-రూట్ CORS (మినహాయింపు)     | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket హ్యాండ్షేక్ `Origin` చెక్          | `src/server/origin/wsOrigin.ts`                                      |

## ఇది కూడా చూడండి

- స్పాన్-సామర్థ్యం గల మార్గాల కోసం [రూట్ గార్డ్ టైర్స్](./ROUTE_GUARD_TIERS.md) — లూప్బ్యాక్ ఎన్ఫోర్స్మెంట్ (ప్రత్యేకమైన, కాంప్లిమెంటరీ కంట్రోల్).
- [ఆథరైజేషన్ గైడ్](../architecture/AUTHZ_GUIDE.md) — పూర్తి ప్రమాణీకరణ పైప్లైన్.
