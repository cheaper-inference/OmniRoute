# OmniRoute MCP Server Documentation (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> रूटिंग, कॅशे, कॉम्प्रेशन, मेमरी, स्किल्स, प्रॉक्सी, पूल, रडार आणि संदर्भ स्रोत ऑपरेशन्समध्ये 110 टूल्ससह मॉडेल कॉन्टेक्स्ट प्रोटोकॉल सर्व्हर.
>
> सत्याचा स्रोत: `open-sse/mcp-server/server.ts` computes** 110 अद्वितीय साधने** `countUniqueMcpTools()` सह : 45 कॅनोनिकल व्याख्या (सहा CCR लाइफसायकल टूल्ससह, एजंट-कौशल्य त्रिकूट, `omniroute_radar_catalog`, आणि `omniroute_x_search`), अधिक मेमरी (3), कौशल्ये (4), GitHub कौशल्ये (3), पूल (6), गेमिफिकेशन (8), प्लगइन (8), Notion (6), स्थानिक (6), Obsidian (6), स्थानिक RTK-केवळ कॉम्प्रेशन टूल्स.

## स्थापना

OmniRoute MCP अंगभूत आहे. यासह प्रारंभ करा:

```bash
omniroute --mcp
```

किंवा ओपन-एसएसई वाहतुकीद्वारे:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

HTTP वाहतूक (`sse` / `streamable-http`, डॅशबोर्ड सर्व्हरद्वारे प्रक्रियेत सेवा) डीफॉल्टनुसार बंद आहेत आणि पूर्वी फक्त `/dashboard/mcp` पृष्ठावरून टॉगल करण्यायोग्य होते. v3.8.51 नुसार CLI मध्ये समानता आहे:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH समान `mcpEnabled` (आणि पर्यायाने `mcpTransport`) `/api/settings` द्वारे डॅशबोर्ड टॉगल सेट करणे. `mcp restart` `POST /api/mcp/restart` कॉल करते : ते सक्रिय `sse`/`streamable-http` सत्रे काढून टाकते त्यामुळे पुढील विनंती स्वच्छपणे पुन्हा सुरू होते, MCP अक्षम असल्यास `409` परत करते आणि `stdio` वाहतुकीसाठी `501` (stdio क्लायंटचे स्वतःचे उपप्रक्रिया — रीस्टार्ट करण्यासाठी कोणतेही इन-प्रोसेस हँडल नसते).

## वाहतूक

MCP सर्व्हर तीन वाहतूक उघड करतो, सर्व समान `createMcpServer()` कारखान्याद्वारे समर्थित आहेत:

| वाहतूक            | कुठे                                           | कधी वापरायचे                                                 |
| :---------------- | :--------------------------------------------- | :----------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE एकत्रीकरण (Claude डेस्कटॉप, Cursor इ.)                   |
| `sse`             | `POST/GET /api/mcp/sse` द्वारे `httpTransport` | Browser/agent क्लायंट ज्यांना इव्हेंट प्रवाहाची आवश्यकता आहे |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | मल्टी-सेशन HTTP क्लायंट (`mcp-session-id` शीर्षलेख)          |

सक्रिय HTTP वाहतूक (`sse` किंवा `streamable-http`) `mcpTransport` सेटिंगद्वारे निवडली जाते. ट्रान्सपोर्ट स्विच केल्याने इतर ट्रान्सपोर्टवरील विद्यमान सत्रे बंद होतात.

### रिमोट ऍक्सेस (मॅनेज-स्कोप बायपास)

`/api/mcp/*` LOCAL_ONLY टियरमध्ये आहे (`src/server/authz/routeGuard.ts`) — बाय डीफॉल्ट फक्त लूपबॅक होस्ट (`localhost`, `127.0.0.1`, `::1`) त्यावर पोहोचू शकतात. v3.8.2 पासून, नॉन-लूपबॅक क्लायंट कनेक्ट करू शकतात जर त्यांनी `Authorization: Bearer <api-key>` सादर केला असेल ज्याची की `manage` स्कोप असेल. सुरंग, रिव्हर्स प्रॉक्सी किंवा सार्वजनिक होस्टनावाद्वारे रिमोट MCP सर्व्हरवर पोहोचण्याचा हा एकमेव मार्ग आहे.

```bash
# Grant manage scope: open the dashboard API Keys page and toggle
# "Management Access" on the key, or POST scopes:["manage"] when creating.

# Then connect from a remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

व्यवस्थापित न केलेली की (किंवा वाहक नाही) `403 LOCAL_ONLY` परत करते. सिबलिंग उपसर्ग `/api/cli-tools/runtime/*` हे हेतुपुरस्सर NOT बायपास करण्यायोग्य — आहे [रूट गार्ड टियर्स — मॅनेज-स्कोप कार्व्ह-आउट](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) पहा.

### मूळ प्रमाणीकरण

प्रमाणीकरणानंतर, `/api/mcp/*` — वाहतूक आणि व्यवस्थापन मार्ग जसे की `status`, `tools`, `audit` आणि `restart` —, कॉलर काहीही असो (API की, CLI टोकन, डॅशबोर्ड सत्र, किंवा अनामित लूपबॅकसह) `Origin` हेडर प्रमाणित केले जाते. हे DNS-रीबाइंडिंग संरक्षण आहे जे MCP स्ट्रीम करण्यायोग्य HTTP स्पेकसाठी आवश्यक आहे.

- **`Origin` शीर्षलेख नाही** → परवानगी आहे. OmniRoute CLI, SDK आणि IDE क्लायंट एक पाठवत नाहीत.
- **परवानगी `Origin`** → `localhost`, `127.0.0.1` किंवा `[::1]` कोणत्याही पोर्टवर, किंवा OmniRoute चे स्वतःचे सार्वजनिक मूळ: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, विश्वासार्ह रिव्हर्स प्रॉक्सीचे फॉरवर्ड केलेले मूळ (`OMNIROUTE_TRUST_PROXY`, केवळ बेस URL सेट केलेले नसताना), किंवा थेट loopback/LAN IP. केवळ `Host` शीर्षलेख कधीही मूळ विश्वासू बनवत नाही.
- **`null` सह इतर कोणतेही `Origin`** JSON-RPC त्रुटी मुख्य भागासह → `403` : `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. वैध CSRF टोकन सादर करणारे डॅशबोर्ड सत्र अजूनही स्वीकारले जाते, जसे की इतर डॅशबोर्ड लेखनासाठी.

रिव्हर्स प्रॉक्सीच्या मागे सर्व्ह केलेल्या ब्राउझर MCP क्लायंटला `OMNIROUTE_PUBLIC_BASE_URL` आवश्यक आहे; इतर उत्पत्तीसाठी परवानगी-सूची नाही. CORS preflight (`OPTIONS`) मूळ-तपासलेले नाही; पुढील विनंती आहे.

## IDE कॉन्फिगरेशन

Claude डेस्कटॉप, Cursor, Cline आणि सुसंगत MCP क्लायंट सेटअपसाठी [MCP क्लायंट कॉन्फिगरेशन](../guides/SETUP_GUIDE.md#mcp-client-configuration) पहा.

---

## आवश्यक साधने (14) — फेज 1

| साधन                            | व्याप्ती              | वर्णन                                                                                                                             |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | अपटाइम, मेमरी, सर्किट ब्रेकर्स, दर मर्यादा, कॅशे आकडेवारी                                                                         |
| `omniroute_list_combos`         | `read:combos`         | धोरणांसह सर्व कॉन्फिगर केलेले कॉम्बो (पर्यायी मेट्रिक्स)                                                                          |
| `omniroute_get_combo_metrics`   | `read:combos`         | विशिष्ट कॉम्बोसाठी कार्यप्रदर्शन मेट्रिक्स                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | कॉम्बो सक्रिय किंवा निष्क्रिय करा                                                                                                 |
| `omniroute_create_combo`        | `write:combos`        | विद्यमान कॉम्बो API द्वारे प्रमाणित कॉम्बो तयार करा                                                                               |
| `omniroute_check_quota`         | `read:quota`          | कोटा used/total, टक्के शिल्लक, रीसेट वेळ, टोकन आरोग्य                                                                             |
| `omniroute_route_request`       | `execute:completions` | OmniRoute रूटिंगद्वारे चॅट पूर्ण करण्यासाठी पाठवा                                                                                 |
| `omniroute_cost_report`         | `read:usage`          | कालावधीनुसार खर्च अहवाल (session/day/week/month)                                                                                  |
| `omniroute_list_models_catalog` | `read:models`         | क्षमता, स्थिती, किंमतीसह पूर्ण मॉडेल कॅटलॉग                                                                                       |
| `omniroute_radar_catalog`       | `read:radar`          | स्थानिक स्वाक्षरी केलेले रडार कॅटलॉग; पर्यायी provider/family फिल्टर                                                              |
| `omniroute_tool_search`         | `read:tools`          | नोंदणीकृत MCP कॅटलॉगमधून साधने शोधा                                                                                               |
| `omniroute_web_search`          | `execute:search`      | कॉन्फिगर केलेल्या शोध प्रदात्यांद्वारे वेब शोध. X/Twitter. नाही                                                                   |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok द्वारे X शोधा, किंवा Xquik API परिणामांसाठी `xquik-search` निवडा. निवडलेल्या बॅकएंडसाठी क्रेडेन्शियल्स आवश्यक आहेत. |
| `omniroute_web_fetch`           | `execute:search`      | कॉन्फिगर केलेल्या फेच प्रदात्यांद्वारे वेब सामग्री मिळवा                                                                          |

## प्रगत साधने (11) — फेज 2

| साधन                               | व्याप्ती                             | वर्णन                                                                                                      |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | फॉलबॅक ट्रीसह ड्राय-रन रूटिंग सिम्युलेशन                                                                   |
| `omniroute_set_budget_guard`       | `write:budget`                       | degrade/block/alert कृतीसह सत्राचे बजेट                                                                    |
| `omniroute_set_routing_strategy`   | `write:combos`                       | रनटाइमवर कॉम्बो स्ट्रॅटेजी अपडेट करा (priority/weighted/auto/etc.)                                         |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` लवचिकता प्रीसेट लागू करा                                        |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | वास्तविक अपस्ट्रीम कॉल वापरून कॉम्बोमधील प्रत्येक प्रदात्याची थेट चाचणी                                    |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 विलंबता आणि सर्किट ब्रेकर स्थितीसह प्रति-प्रदाता मेट्रिक्स                                     |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | budget/latency मर्यादांसह कार्य प्रकारानुसार कॉम्बोची शिफारस करा                                           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | प्रदात्याकडे विनंती का पाठवली गेली ते स्पष्ट करा (स्कोअरिंग घटक + फॉलबॅक)                                  |
| `omniroute_get_session_snapshot`   | `read:usage`                         | पूर्ण सत्र स्नॅपशॉट: खर्च, टोकन, शीर्ष models/providers, त्रुटी, बजेट गार्ड                                |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | तुटलेल्या कॉम्बो रेफ / अनाथ पंक्ती सारख्या डेटाबेस ड्रिफ्टचे निदान (आणि वैकल्पिकरित्या स्वयं-दुरुस्ती) करा |
| `omniroute_sync_pricing`           | `pricing:write`                      | बाह्य स्त्रोतांकडून किंमत डेटा समक्रमित करा (LiteLLM); `dryRun` समर्थन करते                                |

## कॅशे टूल्स (2)

| साधन                    | व्याप्ती      | वर्णन                                                     |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | सिमेंटिक कॅशे, प्रॉम्प्ट-कॅशे आणि इडेम्पोटेन्सी आकडेवारी  |
| `omniroute_cache_flush` | `write:cache` | जागतिक स्तरावर किंवा signature/model द्वारे कॅशे फ्लश करा |

## कॉम्प्रेशन टूल्स (१३)

| साधन                                | व्याप्ती            | वर्णन                                                                                                                       |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | कम्प्रेशन सेटिंग्ज, विश्लेषण सारांश आणि कॅशे-जागरूक आकडेवारी ( `analytics.mcpDescriptionCompression` मेटाडेटा समाविष्ट आहे) |
| `omniroute_compression_configure`   | `write:compression` | कॉम्प्रेशन मोड, थ्रेशोल्ड, लक्ष्य प्रमाण, सिस्टम-प्रॉम्प्ट संरक्षण, MCP वर्णन कॉम्प्रेशन टॉगल कॉन्फिगर करा                  |
| `omniroute_set_compression_engine`  | `write:compression` | सक्रिय इंजिन (off/caveman/rtk/stacked) आणि Caveman/RTK तीव्रता निवडा                                                        |
| `omniroute_list_compression_combos` | `read:compression`  | कॉम्प्रेशन कॉम्बो आणि त्यांच्या इंजिन पाइपलाइन्सची यादी करा                                                                 |
| `omniroute_compression_combo_stats` | `read:compression`  | कॉम्प्रेशन कॉम्बो आणि इंजिनद्वारे गटबद्ध केलेले विश्लेषण                                                                    |
| `omniroute_ccr_store`               | `write:compression` | कॉलर-पृथक सामग्री बाउंडेड इन-मेमरी CCR स्टोअरमध्ये संचयित करा आणि मार्कर अधिक `ccr://` संदर्भ परत करा                       |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR सामग्री पूर्ण किंवा डोके, शेपूट, रेषा, grep आणि आकडेवारी मोडसह पुनर्प्राप्त करा                                         |
| `omniroute_ccr_inspect`             | `read:compression`  | सामग्री परत न करता कॉलरच्या मालकीच्या CCR मेटाडेटाची तपासणी करा                                                             |
| `omniroute_ccr_list`                | `read:compression`  | कॉलरच्या मालकीच्या CCR ब्लॉक्ससाठी पृष्ठांकित मेटाडेटा सूचीबद्ध करा                                                         |
| `omniroute_ccr_delete`              | `write:compression` | कॉलरच्या मालकीचा CCR ब्लॉक हटवा                                                                                             |
| `omniroute_ccr_stats`               | `read:compression`  | कॉलर-स्कोप्ड मेमरी वापर, लाइफसायकल काउंटर आणि स्टोअर मर्यादा नोंदवा                                                         |
| `omniroute_rtk_discover`            | `read:compression`  | RTK आउटपुट नमुन्यांमध्ये आवर्ती आवाज शोधा                                                                                   |
| `omniroute_rtk_learn`               | `read:compression`  | निवड नमुन्यांमधून पुनरावलोकन करण्यायोग्य RTK फिल्टर मसुदा व्युत्पन्न करा                                                    |

CCR नोंदी फक्त मेमरीमध्ये असतात आणि रीस्टार्ट झाल्यावर अदृश्य होतात. प्रत्येक ब्लॉक 2 MiB पर्यंत मर्यादित आहे, प्रत्येक प्रिन्सिपल 16 MiB पर्यंत आणि ग्लोबल स्टोअर 64 MiB पर्यंत मर्यादित आहे. नोंदी डीफॉल्ट 24-तास TTL (जास्तीत जास्त सात दिवस). पूर्ण MCP पुनर्प्राप्ती 256 KiB पर्यंत मर्यादित आहे; मोठे ब्लॉक रेंज्ड आणि ग्रेप मोडद्वारे उपलब्ध राहतात. स्टोरेज, पुनर्प्राप्ती, सूची, तपासणी, हटवणे आणि आकडेवारी प्रमाणीकृत API-की प्रिन्सिपलद्वारे विलग केली जाते. ऑडिट रेकॉर्डमध्ये हॅश आणि आकाराचा मेटाडेटा असतो, कधीही सामग्री नसते.

`omniroute_compression_status` `analytics.mcpDescriptionCompression` अंतर्गत स्वतंत्रपणे MCP वर्णन कॉम्प्रेशनचा अहवाल देतो. ती मूल्ये MCP सूचीबद्ध करण्यायोग्य वर्णनांसाठी मेटाडेटा-आकार अंदाज आहेत (`tools`, `prompts`, `resources`, आणि `resourceTemplates`); त्या प्रदाता वापराच्या पावत्या नाहीत आणि `source: "mcp_metadata_estimate"` ने चिन्हांकित केल्या आहेत.

### MCP प्रवेशयोग्यता ट्री फिल्टर (v3.8.0)

वरील कॉम्प्रेशन टूल्सपासून वेगळे, OmniRoute मध्ये पोस्ट-एक्सिक्युशन फिल्टर समाविष्ट आहे जे कॉम्प्रेस करते** साधन परिणाम** MCP browser/accessibility टूल्स एजंटला परत करण्याआधी. हे फिल्टर स्वतः एक साधन — नाही ते कोणत्याही साधन परिणामांवर पारदर्शकपणे चालते ज्यामध्ये वर्बोज ऍक्सेसिबिलिटी-ट्री किंवा ब्राउझर-स्नॅपशॉट मजकूर (≥ 2000 वर्ण) असतो.

मुख्य वर्तन:

- हेड + टेल सारांश मध्ये ≥ 30 सलग पुनरावृत्ती झालेल्या भावंड ओळी कोलॅप्स करते
- Playwright/computer-use ला आवश्यक असलेले `[ref=eXX]` अँकर संरक्षित करते
- नेव्हिगेशन इशारासह मोठ्या आकाराचा मजकूर (> 50,000 वर्ण) हार्ड-ट्रंकेट करतो
- अपेक्षित बचत:** 60-80%** ब्राउझर स्नॅपशॉट पेलोड्सवर

कॉन्फिगरेशन: जागतिक सेटिंग्जमध्ये `compression.mcpAccessibility` (स्थलांतर 056). अंमलबजावणी: `open-sse/services/compression/engines/mcpAccessibility/`. पूर्ण दस्तऐवज: [कॉम्प्रेशन इंजिन — MCP प्रवेशयोग्यता ट्री फिल्टर](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

या साधनांमागील रनटाइम कॉम्प्रेशन मॉडेलसाठी [कॉम्प्रेशन इंजिन](../compression/COMPRESSION_ENGINES.md) आणि [RTK कॉम्प्रेशन](../compression/RTK_COMPRESSION.md) पहा.

## 1प्रॉक्सी साधने (3)

| साधन                        | व्याप्ती       | वर्णन                                                                                       |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1प्रॉक्सी मार्केटप्लेसमधून विनामूल्य प्रॉक्सी मिळवा (protocol/country/quality/limit फिल्टर) |
| `omniroute_oneproxy_rotate` | `read:proxies` | धोरणानुसार पुढील उपलब्ध प्रॉक्सी मिळवा (`random` / `quality` / `sequential`)                |
| `omniroute_oneproxy_stats`  | `read:proxies` | पूल आकडेवारी, समक्रमण स्थिती, प्रोटोकॉल आणि देशानुसार वितरण                                 |

## मेमरी टूल्स (3)

`open-sse/mcp-server/tools/memoryTools.ts` मध्ये परिभाषित केले आहे. Auth/scope अंमलबजावणी मानक MCP स्कोप पाइपलाइनद्वारे केली जाते.

| साधन                      | व्याप्ती       | वर्णन                                                                                     |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | टोकन-बजेट अंमलबजावणीसह क्वेरी / टाइप / API की द्वारे आठवणी शोधा                           |
| `omniroute_memory_add`    | `write:memory` | नवीन मेमरी एंट्री जोडा (`factual` / `episodic` / `procedural` / `semantic`)               |
| `omniroute_memory_clear`  | `write:memory` | API की साठी मेमरी साफ करा, पर्यायाने प्रकार किंवा `olderThan` टाइमस्टॅम्पनुसार फिल्टर करा |

## कौशल्य साधने (4)

`open-sse/mcp-server/tools/skillTools.ts` मध्ये परिभाषित केले आहे. `src/lib/skills/registry` + `src/lib/skills/executor` द्वारे समर्थित.

| साधन                          | व्याप्ती         | वर्णन                                                                                   |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API की, नाव किंवा सक्षम स्थितीनुसार वैकल्पिक फिल्टरिंगसह नोंदणीकृत कौशल्ये सूचीबद्ध करा |
| `omniroute_skills_enable`     | `write:skills`   | ID द्वारे विशिष्ट कौशल्य सक्षम किंवा अक्षम करा                                          |
| `omniroute_skills_execute`    | `execute:skills` | प्रदान केलेल्या इनपुटसह कौशल्य कार्यान्वित करा आणि अंमलबजावणी रेकॉर्ड परत करा           |
| `omniroute_skills_executions` | `read:skills`    | अलीकडील कौशल्य अंमलबजावणी इतिहास सूचीबद्ध करा                                           |

## Notion संदर्भ स्रोत (6)

`open-sse/mcp-server/tools/notionTools.ts` मध्ये परिभाषित केले आहे. टोकन `src/lib/db/notion.ts` द्वारे `key_value` टेबलमध्ये साठवले जाते. `src/lib/notion/api.ts` मध्ये REST क्लायंट. `src/app/api/settings/notion/route.ts` मध्ये API सेटिंग्ज. `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` मध्ये डॅशबोर्ड UI.

वरून तुमचे Notion एकत्रीकरण टोकन कॉन्फिगर करा** संदर्भ स्रोत** एंडपॉइंट डॅशबोर्डमधील टॅब, किंवा REST API द्वारे :

```bash
# Set token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Check status
curl http://localhost:20128/api/settings/notion

# Disconnect
curl -X DELETE http://localhost:20128/api/settings/notion
```

| साधन                         | व्याप्ती       | वर्णन                                                          |
| :--------------------------- | :------------- | :------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | सर्व पृष्ठे आणि डेटाबेसमध्ये पूर्ण-मजकूर शोध                   |
| `notion_get_page`            | `read:notion`  | त्याच्या गुणधर्मांसह ID द्वारे पृष्ठ मिळवा                     |
| `notion_list_block_children` | `read:notion`  | पेज किंवा ब्लॉकच्या चाइल्ड ब्लॉक्सची यादी करा                  |
| `notion_query_database`      | `read:notion`  | फिल्टर, प्रकार आणि पृष्ठांकनासह डेटाबेसची क्वेरी करा           |
| `notion_get_database`        | `read:notion`  | ID द्वारे डेटाबेस स्कीमा मिळवा                                 |
| `notion_append_blocks`       | `write:notion` | मुलांच्या ब्लॉकला पालक ब्लॉकमध्ये जोडा (प्रति विनंती कमाल 100) |

## एजंट कौशल्य कॅटलॉग साधने (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` मध्ये परिभाषित केले आहे. `src/lib/agentSkills/catalog` द्वारे समर्थित. ही साधने 45-एंट्री एजंट स्किल दस्तऐवजीकरण कॅटलॉग MCP क्लायंट आणि बाह्य एजंट्सना उघड करतात. व्याप्ती: `read:catalog`.

| साधन                              | व्याप्ती       | वर्णन                                                                                                                   |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | पर्यायी `category` (api\| cli) आणि `area` फिल्टरसह सर्व 45 एजंट कौशल्यांची यादी करा; मेटाडेटा + कव्हरेज परत करते        |
| `omniroute_agent_skills_get`      | `read:catalog` | कॅनॉनिकल `id` द्वारे एकाच कौशल्यासाठी संपूर्ण मेटाडेटा + SKILL.md सामग्री मिळवा                                         |
| `omniroute_agent_skills_coverage` | `read:catalog` | कव्हरेज आकडेवारी: 23 API, 21 CLI आणि 1 कॉन्फिगरेशन कौशल्यांपैकी किती SKILL.md फाइल्स फाइल सिस्टम वि कॅटलॉग बेरीजवर आहेत |

संपूर्ण कॅटलॉग आणि बाह्य एजंट ते कसे वापरतात यासाठी [AGENT-SKILLS.md](./AGENT-SKILLS.md) पहा.

## संबंधित फ्रेमवर्क (v3.8.0)

वरील MCP टूल इन्व्हेंटरी (110 अनन्य साधने, `countUniqueMcpTools()` द्वारे गणना केलेली) जाणूनबुजून रनटाइम routing/cache/compression/memory/skills/proxy/context-source ऑपरेशन्ससाठी व्यापलेली आहे. दोन समीप फ्रेमवर्क MCP सर्व्हरच्या बाजूने v3.8.0 मध्ये पाठवले जातात आणि स्वतंत्रपणे दस्तऐवजीकरण केले जातात:

### क्लाउड एजंट

क्लाउड एजंट हे AI कोडिंग एजंट्स (कोडेक्स-क्लाउड, कर्सर-क्लाउड, डेव्हिन, ज्यूल्स) LLM प्रदात्यांसाठी वापरल्या जाणाऱ्या समान कनेक्शन मॉडेलद्वारे OmniRoute मध्ये वायर्ड केलेले आहेत. ते त्यांच्या स्वत: च्या REST पृष्ठभाग (`/api/v1/agents/*`) द्वारे उघड आहेत आणि आहेत** नाही** MCP टूल कॅटलॉगचा एक भाग — क्लाउड एजंटला कॉल करताना MCP स्कोप वापरत नाही.

- अंमलबजावणी: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- जीवनचक्र: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- दस्तऐवजीकरण: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### रेलिंग

गार्डरेल्स हे चॅट पाइपलाइनमध्ये लावलेले pre/post-execution फिल्टर (व्हिजन-ब्रिज, पीआय-मास्कर, प्रॉम्प्ट-इंजेक्शन) आहेत. ते MCP tool/route स्तरावर पोहोचण्यापूर्वी धावतात आणि ऑडिट पाइपलाइनमध्ये संरचित उल्लंघने उत्सर्जित करतात; ते MCP टूल्स म्हणून वापरले जात नाहीत.

- अंमलबजावणी: `src/lib/guardrails/`.
- दस्तऐवजीकरण: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

ब्लॉक केलेला MCP कॉल डीबग करताना, MCP ऑडिट लॉग (`scope_denied:*` नोंदी) आणि रेलिंग ऑडिट ट्रेल — दोन्ही तपासा रेलिंगद्वारे विनंती नाकारली जाऊ शकते** आधी** ते कधीही MCP स्कोप अंमलबजावणी स्तरावर पोहोचते.

---

## REST API एंडपॉइंट्स

| शेवटचा बिंदू           | पद्धत                 | वर्णन                                                                                            | प्रमाण                     |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | सर्व्हर स्थिती: हृदयाचा ठोका, HTTP वाहतूक स्थिती, ऑडिट क्रियाकलाप सारांश                         | व्यवस्थापन (session/admin) |
| `/api/mcp/tools`       | `GET`                 | टूल कॅटलॉग (नाव, वर्णन, स्कोप, फेज, स्त्रोत एंडपॉइंट)                                            | व्यवस्थापन                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ट्रान्सपोर्ट एंडपॉइंट ( `mcpEnabled` + `mcpTransport === "sse"` द्वारे गेट केलेले)           | API की + स्कोप             |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | प्रवाह करण्यायोग्य HTTP वाहतूक ( `mcp-session-id` शीर्षलेख वापरते; `DELETE` सत्र समाप्त करते)    | API की + स्कोप             |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` कडून ऑडिट लॉग एंट्री (फिल्टर: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | व्यवस्थापन                 |
| `/api/mcp/audit/stats` | `GET`                 | एकत्रित ऑडिट आकडेवारी (`totalCalls`, `successRate`, `avgDurationMs`, शीर्ष साधने)                | व्यवस्थापन                 |

स्त्रोत फाइल्स: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

सेटिंग्ज (`mcpEnabled`) मध्ये MCP सर्व्हर सक्षम होईपर्यंत आणि योग्य `mcpTransport` निवडले जाईपर्यंत SSE आणि Streamable HTTP दोन्ही वाहतूक अवरोधित केली जाते. जर चुकीची वाहतूक कॉन्फिगर केली असेल तर सेटिंग्ज स्विच करण्याच्या इशारासह मार्ग HTTP 400 परत करतो.

---

## प्रमाणीकरण आणि व्याप्ती

MCP टूल कॉल कॉलरकडून स्कोप स्ट्रिंग वाचतो. तो चेक तीन स्वतंत्र नेमस्पेसेसपैकी एक आहे. एका तपासकाचा पास हा इतरांचा पास नसतो. नियम [तीन स्कोप नेमस्पेसेस](#three-scope-namespaces) आहेत. टूल कॅटलॉग हे [MCP टूल स्कोप](#mcp-tool-scopes) आहे.

### तीन स्कोप नेमस्पेसेस

API की वर `manage`, MCP टूलवर `read:compression` आणि `oma_live_…` ऍक्सेस टोकनवर `read` हे तीन वेगवेगळे अनुदान आहेत. म्युटेटिंग मॅनेजमेंट रूटवर `read` ऍक्सेस टोकन पाठवणाऱ्या कॉलर्सना HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` मिळते ती रँक `scopeSatisfies` आहे. हे MCP टेबलचा सल्ला घेत नाही आणि MCP जुळणारा त्याचा सल्ला घेत नाही.

| नेमस्पेस          | ओळखपत्र                                                                   | तपासक                  | एक पास परवानगी देतो                                                      |
| :---------------- | :------------------------------------------------------------------------ | :--------------------- | :----------------------------------------------------------------------- |
| API-की व्यवस्थापन | `api_keys.scopes`                                                         | `hasManageScope`       | त्या वाहक की साठी व्यवस्थापन REST                                        |
| API-की ऍडिटीव्ह   | समान ॲरे, एक अचूक स्ट्रिंग                                                | खाली नाव दिलेले मदतनीस | फक्त एकच क्षमता                                                          |
| MCP टूल स्कोप     | समान ॲरे, बाकी MCP `_meta` ( फक्त HTTP/SSE ), बाकी `OMNIROUTE_MCP_SCOPES` | `scopeMatches`         | ते साधन, एकदा अंमलबजावणी चालू आहे                                        |
| प्रवेश टोकन       | `oma_live_…`                                                              | `scopeSatisfies`       | व्यवस्थापन मार्ग ज्याच्या पद्धती आणि मार्गाला त्या श्रेणीची आवश्यकता आहे |

[व्यवस्थापन प्रमाणीकरणामध्ये](../guides/MANAGEMENT-AUTH.md) प्रत्येक क्रेडेन्शियल मिंट करणे समाविष्ट आहे.

#### API-की स्कोप

एक `api_keys.scopes` ॲरे दोन नोकऱ्या पुरवतो. ते विविध कार्ये वापरतात.

**व्यवस्थापन REST.** `manage` आणि `admin` हे `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) चे सदस्य आहेत. `hasManageScope` हे त्या की साठी व्यवस्थापन मार्ग अधिकृत करते. `admin` त्या मार्गांवर व्यवस्थापन-सक्षम आहे. येथे `admin` हा शब्द प्रवेश-टोकन रँक नाही आणि तो MCP टूल स्कोपमध्ये विस्तारत नाही.

**ॲडिटीव्ह स्ट्रिंग्स.** प्रत्येक एक अचूक सदस्यत्व चाचणी आहे आणि प्रत्येकजण `MANAGEMENT_API_KEY_SCOPES` बाहेर राहतो.

| व्याप्ती                       | एक पास परवानगी देतो                                                                                                                                      |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | नॉन-लूपबॅक `/api/mcp/` LOCAL_ONLY कोरव्ह-आउट फक्त (`hasMcpConnectOrManageScope`). `manage` किंवा `admin` असलेली की अजूनही ती कोरून काढते.                |
| `self:usage`                   | या कीसाठी`GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` हे स्कोप तयार (`normalizeSelfServiceScopesForCreate`) वर जोडते. |
| `self:account-quota`           | त्या स्टेटस पेलोडमध्ये अपस्ट्रीम खाते कोटा (`src/lib/usage/apiKeySelfService.ts`). स्थिती मार्गासाठी अद्याप `self:usage` आवश्यक आहे.                     |
| `policy:bypass-provider-quota` | या कीचे अनुमान प्रदाता-कोटा धोरण वगळा (`hasProviderQuotaBypassScope` मध्ये `src/sse/handlers/chat.ts`) कॉल करते.                                         |

#### जुळणारे

कॅटलॉग हे [MCP टूल स्कोप](#mcp-tool-scopes) अंतर्गत टेबल आहे. `src/shared/constants/mcpScopes.ts` मधील `MCP_SCOPE_LIST` ला कॅटलॉग मानू नका: तो मूळ टाइप केलेला उपसंच आहे. नंतरची साधने त्याच्या बाजूला पुढील स्कोप घोषित करतात (`read:notion`, `read:skills`, `read:local-corpus`, आणि उर्वरित सारणी).

`open-sse/mcp-server/scopeEnforcement.ts` मधील `evaluateToolScopes` कॉलला परवानगी देतो जेव्हा प्रत्येक आवश्यक स्कोप काही मंजूर स्कोपशी जुळतो:

- `*` प्रत्येक आवश्यक व्याप्तीशी जुळते.
- `*` मध्ये समाप्त होणारी मंजूर स्कोप आवश्यक व्याप्तीशी जुळते जी तारेच्या आधी उपसर्गाने सुरू होते. `read:*` `read:compression` जुळतो.
- प्रत्येक इतर मंजूर स्कोप फक्त समान आवश्यक स्ट्रिंगशी जुळतो.

एक की ज्याचे स्कोप `["manage"]` आहेत ते `read:compression` साठी `scopeMatches` फेल होते. `admin`, `mcp:connect`, `read`, आणि `write` साठी समान कॉल अयशस्वी होतो जेव्हा ते फक्त मंजूर स्ट्रिंग असतात. अनुगामी `*` पलीकडे MCP टूल स्कोपमध्ये कोणतीही श्रेणीबद्धता नाही.

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` (डिफॉल्ट `false`) नसल्यास अंमलबजावणी बंद आहे. ते बंद असताना, `evaluateToolScopes` कॉलला अनुमती देते आणि कॅटलॉग वगळते. ते चालू असताना, HTTP बेअरर कीचे `api_keys.scopes` `authInfo` म्हणून वापरते ( [पर-की HTTP स्कोप बाइंडिंग](#per-key-http-scope-binding-7895) पहा). जेव्हा कोणतेही मुख्य कार्यक्षेत्र निराकरण होत नाही, तेव्हा मंजूर केलेला संच MCP `_meta` द्वारे येतो (केवळ HTTP/SSE कॉलरसाठी सन्मानित, HTTP प्रमाणीकरण संदर्भामध्ये; stdio कॉलरच्या `_meta` दुर्लक्ष केले जाते कारण क्लायंट नियंत्रित करतो आणि त्यात प्रति-कॉलर ओळख नसते), नंतर `OMNIROUTE_MCP_SCOPES`.

#### प्रवेश-टोकन स्कोप

`oma_live_…` टोकन (`src/lib/accessTokens/scopes.ts`) मध्ये `read`, `write`, किंवा `admin` असतात . `scopeSatisfies` एक रँक आहे: `admin` `write` आणि `read` कव्हर करते आणि `write` `read` कव्हर करते. अज्ञात स्कोप काहीही कव्हर करत नाहीत.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) त्या रँकची `inferRequiredScope` (`src/server/authz/accessScopes.ts`) शी तुलना करते :

- `GET`, `HEAD`, आणि `OPTIONS` `read` आवश्यक आहे.
- इतर प्रत्येक पद्धतीसाठी `write` आवश्यक आहे.
- `ADMIN_SCOPE_PREFIXES` मधील पथांना प्रत्येक पद्धतीसाठी `admin` आवश्यक आहे. `/api/mcp` त्या सूचीमध्ये आहे, त्यामुळे `write` ऍक्सेस टोकन अद्याप MCP HTTP पृष्ठभागावर कॉल करू शकत नाही.
- `ADMIN_MUTATION_PREFIXES` मधील पथांना केवळ उत्परिवर्तनांसाठी `admin` आवश्यक आहे.
- `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) मधील पथांना केवळ उत्परिवर्तनासाठी `admin` आवश्यक आहे आणि फक्त त्याच मार्गावर — इतर `/api/settings/*` उप-मार्ग `write` ठेवतात.

`PATCH /api/keys/{id}` एक उत्परिवर्तन आहे आणि त्या प्रशासक सूचीमध्ये नाही, म्हणून `read` टोकन 403 `Access token scope 'read' is insufficient; 'write' required.` A `write` किंवा `admin` प्रवेश टोकन प्राप्त करतो त्या मार्गाचे समाधान करतो. डॅशबोर्ड JWT, लूपबॅक CLI मशीन-आयडी टोकन, आणि `manage` किंवा `admin` सह API की इतर शाखा घेतात आणि या श्रेणीनुसार संकुचित नाहीत.

`/api/mcp` साठी `scopeSatisfies` पास करणाऱ्या ऍक्सेस टोकनने फक्त व्यवस्थापन गेट साफ केले आहे. टूल कॉल अजूनही API-की स्कोप विरुद्ध `scopeMatches` चालवतात. प्रवेश-टोकन रँक `scopeMatches` साठी इनपुट नाही.

### MCP टूल स्कोप

व्याप्ती अंमलबजावणी `open-sse/mcp-server/scopeEnforcement.ts` मध्ये केंद्रीकृत आहे. प्रत्येक साधनाला विशिष्ट स्कोप आवश्यक आहेत:

| व्याप्ती              | साधने                                                                                                                                                                        |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                            |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                    |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                       |
| `read:quota`          | `check_quota`                                                                                                                                                                |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                       |
| `read:models`         | `list_models_catalog`                                                                                                                                                        |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                        |
| `write:budget`        | `set_budget_guard`                                                                                                                                                           |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                  |
| `pricing:write`       | `sync_pricing`                                                                                                                                                               |
| `read:cache`          | `cache_stats`                                                                                                                                                                |
| `write:cache`         | `cache_flush`                                                                                                                                                                |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                   |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                            |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                        |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                             |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                       |
| `read:memory`         | `memory_search`                                                                                                                                                              |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                 |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                           |
| `write:skills`        | `skills_enable`                                                                                                                                                              |
| `execute:skills`      | `skills_execute`                                                                                                                                                             |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                             |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                      |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                    |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                             |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                               |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                           |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                              |
| `read:obsidian`       | 13 वाचन साधने — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 लेखन साधने — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                            |

वाइल्डकार्ड स्कोप समर्थित आहेत: `read:*` सर्व वाचन-स्कोप मंजूर करते, `*` पूर्ण प्रवेश मंजूर करते.

### `mcp:connect` — अरुंद मार्ग क्षमता (#7895)

नॉन-लूपबॅकवरून HTTP/SSE MCP वाहतूक (`/api/mcp/*`) पर्यंत पोहोचण्यासाठी `/api/mcp/` LOCAL_ONLY कोरीव-आऊट आवश्यक आहे ( `docs/security/ROUTE_GUARD_TIERS.md` पहा). ऐतिहासिकदृष्ट्या ते कोरीव-आऊटने फक्त `manage`/`admin` -scope API की — स्वीकारली आहे जी कॉलरसाठी फक्त MCP बोलणे आवश्यक आहे. `src/shared/constants/managementScopes.ts` आता `MCP_CONNECT_SCOPE = "mcp:connect"` निर्यात करते: एक अतिरिक्त, अरुंद स्कोप ( `SELF_USAGE_SCOPE` प्रमाणेच उदाहरण) जे ONLY `src/server/authz/policies/management.ts` — मध्ये `/api/mcp/` बायपास अधिकृत करते, ते इतर कोणतेही व्यवस्थापन-मार्ग प्रवेश मंजूर करत नाही आणि मुद्दाम `MANAGEMENT_API_KEY_SCOPES` चे OUT ठेवले जाते. `manage`/`admin` धारण केलेली की अजूनही न बदलता कोरीव-आउट पास करते; `mcp:connect` हा रिमोट MCP-केवळ कॉलरसाठी कमी-विशेषाधिकार पर्याय आहे, `hasMcpConnectOrManageScope()` द्वारे तपासला जातो.

### प्रति-की HTTP स्कोप बंधनकारक (#7895)

HTTP/SSE वर, `open-sse/mcp-server/httpTransport.ts` आता कॉलरच्या रिअल `api_keys.scopes` `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) द्वारे निराकरण करते आणि ते MCP SDK च्या `transport.handleRequest(req, { authInfo })` कडे जाते, त्यामुळे `extra.authInfo.scopes` प्रत्येक टूल कॉलवर पोहोचणे हे बेअरर कीचे स्वतःचे कार्यक्षेत्र प्रतिबिंबित करते. `scopeEnforcement.ts` च्या `resolveCallerScopeContext()` आधीच `_meta` वर `authInfo` प्राधान्य दिले आहे आणि `OMNIROUTE_MCP_SCOPES` env फॉलबॅक — हे फक्त प्रथम, सर्वोच्च-प्राधान्य स्त्रोत भरते, जे पूर्वी HTTP वर अनफेड होते. जेव्हा कोणतीही API की निराकरण करत नाही (कोणतेही शीर्षलेख, अवैध की नाही), `authInfo` `undefined` राहते आणि रिझोल्यूशन अपरिवर्तित विद्यमान `meta`/env चेनमध्ये येते. stdio ची प्रति-कॉलर ओळख नाही ( `mcpCallerIdentity.ts` पहा) आणि प्रति-की बंधनकारक — द्वारे प्रभावित होत नाही ते `_meta` चरण वगळते (`_meta` फक्त HTTP प्रमाणीकरण संदर्भ, #15159 मध्ये सन्मानित केले जाते) आणि केवळ `OMNIROUTE_MCP_SCOPES` env की वरून निराकरण करते.

**HTTP/SSE काहीही असो `OMNIROUTE_MCP_ENFORCE_SCOPES`** `OMNIROUTE_MCP_ENFORCE_SCOPES` ला `false` डीफॉल्ट करणे केवळ local/stdio सिंगल-ऑपरेटर प्रवाहासाठी सुरक्षित आहे, जेथे प्रति-कॉलर ओळख विरुद्ध स्कोप नाही. `open-sse/mcp-server/server.ts::withScopeEnforcement()` प्रति-टूल स्कोप अंमलबजावणी बिनशर्त ( `scopeEnforcement.ts` मध्ये`shouldForceScopeEnforcement()` ) वर वळते जेव्हा `resolveCallerScopeContext()` ने `source === "authInfo"` (म्हणजे वास्तविक प्रति-की HTTP ऑथोरायझेशन हेडर, HTTP/SSE-only) AND ती की पूर्ण `manage`/`admin` स्कोप धारण करत नाही. हे अंतर बंद करते जेथे ONLY संकुचित `mcp:connect` बायपास स्कोप — वर दस्तऐवजीकरण केलेल्या `/api/mcp/` LOCAL_ONLY कोरीव-आउट — शिवाय काहीही अधिकृत करत नाही, अन्यथा ऑपरेटरने remote/non-loopback MCP ऍक्सेस सक्षम केल्यावर प्रत्येक MCP टूलला विनंती करू शकते, फक्त कारण `OMNIROUTE_MCP_ENFORCE_SCOPES` जहाजे `false` द्वारे डिफॉल्ट. HTTP वर पूर्ण `manage`/`admin` की, आणि प्रत्येक stdio/local कॉलर, विद्यमान `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated वर्तन अपरिवर्तित ठेवा.

---

## पर्यावरण परिवर्तने

| चल                                      | डीफॉल्ट                               | उद्देश                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-------------------------------------- | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | OmniRoute अंतर्गत APIs कॉल करताना MCP सर्व्हर बेस URL वापरतो                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_API_KEY`                     | (रिक्त)                               | API की अंतर्गत API कॉलवर `Authorization: Bearer` म्हणून अग्रेषित केली जाते                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (केवळ `"true"` ते सक्षम करते) | सक्षम केल्यावर, गहाळ स्कोप टूल कॉल नाकारतात आणि ऑडिट लॉगमध्ये `scope_denied:<reason>` लॉग करतात. पूर्ण `manage`/`admin` स्कोप — नसलेल्या प्रति-की ऑथोरायझेशन हेडर (`source === "authInfo"`) वरून सोडवलेल्या कोणत्याही HTTP/SSE कॉलरसाठी या ध्वजाची पर्वा न करता अंमलबजावणी ALSO सक्ती केली जाते उदा. फक्त अरुंद `mcp:connect` बायपास स्कोप — धारण केलेली की त्यामुळे हे डीफॉल्ट केवळ local/stdio नेव्हर-ऑपरेटर-नॉन-ऑपरेटर-रिफॉल्ट ऍक्सेससाठी सुरक्षित आहे. |
| `OMNIROUTE_MCP_SCOPES`                  | (रिक्त)                               | डीफॉल्टनुसार "उपलब्ध" मानल्या जाणाऱ्या स्कोपची स्वल्पविरामाने विभक्त केलेली अनुमत सूची (जेव्हा कॉलर स्वतःचे स्कोप प्रदान करत नाही तेव्हा वापरले जाते)                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | ( = अनसेट करा)                        | `0/false/off/no` वर सेट केल्यावर, नोंदणीच्या वेळी MCP वर्णन कॉम्प्रेशन अक्षम करते                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | ( = अनसेट करा)                        | वरीलप्रमाणे समान टॉगलसाठी पर्यायी उपनाव                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | अंतर्गत व्यवस्थापन वाचनासाठी बजेट रद्द करा (आरोग्य, लवचिकता, कॉम्बो, कोटा, वापर)                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | प्रदात्यावर वाट पाहणाऱ्या हॉप्ससाठी बजेट रद्द करा (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                             |
| `MCP_TOOL_DENY`                         | ( = नो फिल्टर अनसेट करा)              | स्वल्पविरामाने विभक्त केलेल्या साधनांची नावे `tools/list` मधून टाकली जातील (टूल-कार्डिनॅलिटी रिडक्शन — खाली पहा)                                                                                                                                                                                                                                                                                                                                           |
| `MCP_TOOL_ALLOW`                        | ( = नो फिल्टर अनसेट करा)              | केवळ ठेवण्यासाठी स्वल्पविरामाने विभक्त केलेल्या साधनांची नावे (अनुमती-सूची मोड — खाली पहा)                                                                                                                                                                                                                                                                                                                                                                 |
| `DATA_DIR`                              | `~/.omniroute`                        | हार्टबीट फाइल `${DATA_DIR}/runtime/mcp-heartbeat.json` वर लिहिली आहे                                                                                                                                                                                                                                                                                                                                                                                       |

---

## वर्णन कॉम्प्रेशन

MCP टूल, प्रॉम्प्ट आणि रिसोर्स रेजिस्ट्री क्लायंटच्या समोर येणारा मेटाडेटा फूटप्रिंट कमी करण्यासाठी registration/list वेळी वर्णन संकुचित करू शकतात (आणि म्हणून त्वरित संदर्भ खर्च). अंमलबजावणी `open-sse/mcp-server/descriptionCompressor.ts` मध्ये राहते आणि `createMcpServer()` आत `compressMcpRegistryMetadata` द्वारे MCP सर्व्हरमध्ये वायर्ड केली जाते.

- कॉम्प्रेशन वर्णन मजकूरावर Caveman Ruleset (`getRulesForContext("all", "full")`) वापरून संरक्षित-ब्लॉक एक्स्ट्रक्शन (कोड स्पॅन्स, फेंस्ड ब्लॉक्स इ.) वापरून चालते त्यामुळे संरचनात्मक सामग्री बदलली जात नाही.
- `key_value` सेटिंग्ज टेबलमधील `compression.mcpDescriptionCompressionEnabled` मूल्याद्वारे प्रति-डिप्लॉयमेंट टॉगल करा (डीफॉल्ट: सक्षम) UI मध्ये — म्हणून उघड** विश्लेषण → MCP वर्णन कॉम्प्रेशन** .
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` किंवा `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` द्वारे प्रक्रिया-व्यापी टॉगल करा.
- रिअलटाइम आकडेवारी `omniroute_compression_status` द्वारे `analytics.mcpDescriptionCompression` अंतर्गत समोर आली आहे आणि वास्तविक प्रदात्याच्या वापराच्या पावत्यांमधून स्पष्टीकरण देण्यासाठी `source: "mcp_metadata_estimate"` टॅग केले आहे.

---

## टूल कार्डिनॅलिटी रिडक्शन (F4.3)

वर्णन कॉम्प्रेशन प्रत्येक टूलचा मेटाडेटा संकुचित करते;** साधन-कार्डिनॅलिटी घट** _किती_ साधने जाहीर केली आहेत ते कमी करून एक पाऊल पुढे जाते. `tools/list` मॅनिफेस्टमध्ये कमी टूल्सची जाहिरात केल्याने क्लायंटचे मॉडेल टूल कॅटलॉग ("लेयर 5" कॉम्प्रेशन) साठी देणाऱ्या प्रति-विनंती टोकन खर्चात कपात करते. अंमलबजावणी हे `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) मधील शुद्ध, स्टेटलेस फिल्टर आहे, जे `createMcpServer()` (`open-sse/mcp-server/server.ts`) मधील नोंदणी लूपमध्ये वायर्ड आहे.

**निवड करा, डीफॉल्टनुसार बंद करा.** फिल्टर फक्त तेव्हाच चालतो जेव्हा दोनपैकी किमान एक पर्यावरण व्हेरिएबल्स सेट केले जातात; कोणत्याही सेटसह, सर्व 110 साधने अपरिवर्तित घोषित केली जातात.

| चल               | मोड                                                                                                          |
| :--------------- | :----------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | — स्वल्पविरामाने विभक्त केलेल्या साधनांची नावे ब्लॅकलिस्ट करा जी नेहमी `tools/list` मधून वगळली जातात         |
| `MCP_TOOL_ALLOW` | — स्वल्पविरामाने विभक्त केलेल्या साधनांच्या नावांना परवानगी द्या; फक्त हेच टिकतात, बाकी सर्व काही सोडले जाते |

`deny` `allow` पेक्षा प्राधान्य घेते. नावे स्वल्पविरामाने विभक्त केलेली आहेत, ट्रिम केलेली आहेत आणि रिक्त नोंदी दुर्लक्षित केल्या आहेत. उदाहरणे:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**फिल्टर केलेली साधने कशी काढली जातात:** नोंदणी नेहमी यशस्वी होते; प्रोफाईलने नाकारलेले साधन नंतर MCP SDK हँडलवर `.disable()` d असते, त्यामुळे ते `tools/list` मध्ये कधीही दिसत नाही परंतु वायरिंग अखंड राहते (क्लीन enable/disable, पुन्हा नोंदणी नाही). प्रोफाइल पार्सर हे `readMcpToolProfileFromEnv(process.env)` आहे, जे दोन्ही var रिक्त असताना `null` (कोणतेही फिल्टरिंग नाही) परत करते.

`reduceToolManifest` मागे असलेला समृद्ध `ToolProfile` आकार स्कोप-इंटरसेक्शन फिल्टरिंग (`allowScopes`, `read:*` -style वाइल्डकार्ड मॅचिंगसह) आणि एक निर्धारक `maxTools` कॅपला देखील समर्थन देतो, परंतु त्या दोन नॉब्सना नोंदणीच्या वेळी पूर्ण प्रकटीकरण आवश्यक आहे आणि ते आहेत** नाही** आज पर्यावरण व्हेरिएबल्सद्वारे उघड झाले आहे (एक `tools/list` -level हुक ट्रॅक केलेला फॉलो-अप आहे). कपात करण्यापूर्वी आणि नंतर मॅनिफेस्ट टोकन खर्चाची तुलना करण्यासाठी `estimateManifestTokens()` उपलब्ध आहे.

---

## रनटाइम हार्टबीट

stdio वाहतूक दर 5 सेकंदांनी `${DATA_DIR}/runtime/mcp-heartbeat.json` पर्यंत जिवंत राहते. डॅशबोर्ड (`/api/mcp/status`) `online` मिळवण्यासाठी ही फाईल अधिक PID लाइव्हनेस वाचतो. HTTP त्याऐवजी प्रक्रियेतील `getMcpHttpStatus()` वरून अहवालाची स्थिती वाहतूक करते (फाइल लिहू नका).

हृदयाचा ठोका स्नॅपशॉटमध्ये समाविष्ट आहे:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## ऑडिट लॉगिंग

प्रत्येक टूल कॉल `open-sse/mcp-server/audit.ts` द्वारे SQLite `mcp_tool_audit` टेबलवर लॉग इन केला जातो:

- साधनाचे नाव, युक्तिवाद (hashed/truncated प्रति-टूल `auditLevel`), परिणाम
- ms मध्ये कालावधी, success/failure ध्वज, त्रुटी संदेश (लागू असेल तेव्हा)
- API की हॅश, टाइमस्टॅम्प
- स्कोप नकार गहाळ स्कोप सूचीसह `scope_denied:<reason>` म्हणून लॉग केले जातात

अलीकडील कॉल्सची तपासणी करण्यासाठी डॅशबोर्ड किंवा `/api/mcp/audit` आणि `/api/mcp/audit/stats` REST एंडपॉइंट्स वापरा.

---

## फाईल्स

| फाईल                                                                     | उद्देश                                                                  |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP सर्व्हर फॅक्टरी, stdio एंट्री पॉइंट, स्कोप्ड टूल नोंदणी             |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + प्रवाह करण्यायोग्य HTTP वाहतूक (सत्र व्यवस्थापन)                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | टूल स्कोप मूल्यांकन आणि कॉलर रिझोल्यूशन                                 |
| `open-sse/mcp-server/audit.ts`                                           | टूल कॉल ऑडिट लॉगिंग (`mcp_tool_audit`)                                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio हृदयाचा ठोका लेखक (`mcp-heartbeat.json`)                          |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | टूल / प्रॉम्प्ट / संसाधन नोंदणीसाठी वर्णन कॉम्प्रेशन                    |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod स्कीमा + टूल रेजिस्ट्री (`MCP_TOOLS`, 45 नोंदी)                     |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | फेज 2 + कॅशे + 1प्रॉक्सी टूल हँडलर                                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | कॉम्प्रेशन टूल हँडलर                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | मेमरी टूल व्याख्या (3 साधने)                                            |
| `open-sse/mcp-server/tools/skillTools.ts`                                | कौशल्य साधन व्याख्या (4 साधने)                                          |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion संदर्भ स्रोत साधन व्याख्या (6 साधने)                             |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | गेमिफिकेशन टूल व्याख्या (8 साधने)                                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | प्लगइन नोंदणी आणि व्यवस्थापन साधने (8 साधने)                            |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` एंडपॉइंट                                              |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` एंडपॉइंट                                               |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE वाहतूक मार्ग                                         |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` प्रवाही HTTP वाहतूक मार्ग                             |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ऑडिट लॉग क्वेरी                                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` एकत्रित ऑडिट मेट्रिक्स                           |
| `src/lib/notion/api.ts`                                                  | Notion REST API क्लायंट (पुन्हा प्रयत्न करा, कालबाह्य, त्रुटी वर्गीकरण) |
| `src/lib/db/notion.ts`                                                   | Notion टोकन पर्सिस्टन्स (`key_value` टेबल)                              |
| `src/app/api/settings/notion/route.ts`                                   | Notion सेटिंग्ज API (GET/POST/DELETE)                                   |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion टोकन व्यवस्थापन UI                                               |
| `tests/unit/notion-api.test.ts`                                          | Notion API क्लायंट चाचण्या (7)                                          |
| `tests/unit/notion-tools.test.ts`                                        | Notion टूल्स स्कोप अंमलबजावणी चाचण्या (10)                              |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB मॉड्यूल चाचण्या (3)                                           |
