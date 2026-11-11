# OmniRoute MCP Server Documentation (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> ரூட்டிங், கேச், கம்ப்ரஷன், மெமரி, திறன்கள், ப்ராக்ஸி, பூல், ரேடார் மற்றும் சூழல் மூல செயல்பாடுகள் முழுவதும் 110 கருவிகளைக் கொண்ட மாதிரி சூழல் நெறிமுறை சேவையகம்.
>
> Source of truth: `open-sse/mcp-server/server.ts` computes **110 unique tools** with `countUniqueMcpTools()`: 45 canonical definitions (including the six CCR lifecycle tools, the agent-skills trio, `omniroute_radar_catalog`, and `omniroute_x_search`), plus memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), and two RTK-only compression tools.

## நிறுவல்

OmniRoute MCP உள்ளமைக்கப்பட்டுள்ளது. இதனுடன் தொடங்கவும்:

```bash
omniroute --mcp
```

அல்லது திறந்தவெளி போக்குவரத்து வழியாக:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

HTTP ட்ரான்ஸ்போர்ட்கள் (`sse` / `streamable-http`, டாஷ்போர்டு சர்வரால் செயல்பாட்டில் வழங்கப்படுகின்றன) இயல்புநிலையாக முடக்கப்பட்டு, முன்பு `/dashboard/mcp` பக்கத்திலிருந்து மட்டுமே மாற்றக்கூடியதாக இருந்தது. v3.8.51 இன் படி CLI சமநிலையைக் கொண்டுள்ளது:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH அதே `mcpEnabled` (மற்றும் விருப்பமாக `mcpTransport`) டாஷ்போர்டை `/api/settings` வழியாக மாற்றுகிறது. `mcp restart` `POST /api/mcp/restart` அழைக்கிறது: இது செயலில் உள்ள `sse`/`streamable-http` அமர்வுகளை கிழித்துவிடும், எனவே அடுத்த கோரிக்கை மீண்டும் தொடங்கும், MCP முடக்கப்பட்டிருந்தால் `409` வழங்குகிறது, மேலும் `stdio` போக்குவரத்திற்கு `501` வழங்குகிறது (stdio கிளையன்ட்கள் தங்கள் சொந்த துணை செயலாக்க — மறுதொடக்கம் செய்ய எந்த செயலாக்க கைப்பிடியும் இல்லை).

## போக்குவரத்து

MCP சேவையகம் மூன்று போக்குவரத்துகளை வெளிப்படுத்துகிறது, இவை அனைத்தும் ஒரே `createMcpServer()` தொழிற்சாலையால் ஆதரிக்கப்படுகின்றன:

| போக்குவரத்து      | எங்கே                                          | எப்போது பயன்படுத்த வேண்டும்                               |
| :---------------- | :--------------------------------------------- | :-------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE ஒருங்கிணைப்புகள் (Claude டெஸ்க்டாப், Cursor, முதலியன) |
| `sse`             | `POST/GET /api/mcp/sse` வழியாக `httpTransport` | நிகழ்வு ஸ்ட்ரீம் தேவைப்படும்Browser/agent கிளையண்டுகள்    |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | பல அமர்வு HTTP கிளையண்டுகள் (`mcp-session-id` தலைப்பு)    |

செயலில் உள்ள HTTP போக்குவரத்து (`sse` அல்லது `streamable-http`) `mcpTransport` அமைப்பால் தேர்ந்தெடுக்கப்பட்டது. போக்குவரத்துகளை மாற்றுவது மற்ற போக்குவரத்தில் இருக்கும் அமர்வுகளை மூடுகிறது.

### தொலைநிலை அணுகல் (நிர்வகி-ஸ்கோப் பைபாஸ்)

`/api/mcp/*` ஆனது LOCAL_ONLY அடுக்கு (`src/server/authz/routeGuard.ts`) — இல் இயல்பாகவே லூப்பேக் ஹோஸ்ட்கள் (`localhost`, `127.0.0.1`, `::1`) மட்டுமே அடைய முடியும். v3.8.2 முதல், லூப்பேக் அல்லாத கிளையன்ட்கள் `manage` ஸ்கோப்பைக் கொண்டிருக்கும் ஒரு `Authorization: Bearer <api-key>` ஐ வழங்கினால் இணைக்கப்படலாம். சுரங்கப்பாதை, ரிவர்ஸ் ப்ராக்ஸி அல்லது பொது ஹோஸ்ட்பெயர் மூலம் தொலைநிலை MCP சேவையகத்தை அடைவதற்கான ஒரே வழி இதுதான்.

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

நிர்வகிக்காத விசை (அல்லது தாங்குபவர் இல்லை) `403 LOCAL_ONLY` வழங்குகிறது. [—](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) முன்னொட்டு `/api/cli-tools/runtime/*` என்பது வேண்டுமென்றே NOT கடந்து செல்லக்கூடிய — ஆகும்.

### மூல சரிபார்ப்பு

அங்கீகாரத்திற்குப் பிறகு, `/api/mcp/*` — க்கான ஒவ்வொரு கோரிக்கையும் போக்குவரத்துகள் மற்றும் `status`, `tools`, `audit` மற்றும் `restart` — போன்ற மேலாண்மை வழிகள் அதன் `Origin` தலைப்பு சரிபார்க்கப்பட்டது, அழைப்பவர் எதுவாக இருந்தாலும் (API விசை, CLI டோக்கன், டாஷ்போர்டு அமர்வு அல்லது பெயரிடப்படாத லூப்பேக் உடன்). இது MCP ஸ்ட்ரீமபிள் HTTP விவரக்குறிப்புக்கு தேவைப்படும் DNS-ரீபைண்டிங் பாதுகாப்பு.

- **`Origin` தலைப்பு இல்லை** → அனுமதிக்கப்படுகிறது. OmniRoute CLI, SDK மற்றும் IDE கிளையண்டுகள் ஒன்றை அனுப்பவில்லை.
- **அனுமதிக்கப்பட்ட `Origin`** → `localhost`, `127.0.0.1` அல்லது `[::1]` ஏதேனும் ஒரு போர்ட்டில், அல்லது OmniRoute இன் சொந்த பொது தோற்றம்: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, நம்பகமான தலைகீழ் ப்ராக்ஸியின் அனுப்பப்பட்ட தோற்றம் (`OMNIROUTE_TRUST_PROXY`, அடிப்படை URL அமைக்கப்படாத போது மட்டுமே) அல்லது நேரடி loopback/LAN IP ஹோஸ்ட். `Host` தலைப்பு மட்டும் ஒரு மூலத்தை நம்பகமானதாக மாற்றாது.
- **`null` உட்பட வேறு ஏதேனும் `Origin`** → `403` ஒரு JSON-RPC பிழை அமைப்புடன்: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. செல்லுபடியாகும் CSRF டோக்கனை வழங்கும் டேஷ்போர்டு அமர்வு, மற்ற டாஷ்போர்டு எழுதுவது போல் இன்னும் ஏற்றுக்கொள்ளப்படுகிறது.

ஒரு உலாவி MCP கிளையண்ட் ஒரு தலைகீழ் ப்ராக்ஸியின் பின்னால் சேவை செய்ய வேண்டும் `OMNIROUTE_PUBLIC_BASE_URL`; பிற தோற்றங்களுக்கான அனுமதிப் பட்டியல் இல்லை. CORS preflight (`OPTIONS`) தோற்றம் சரிபார்க்கப்படவில்லை; என்பது பின்வரும் கோரிக்கை.

## IDE கட்டமைப்பு

Claude டெஸ்க்டாப், Cursor, Cline, மற்றும் இணக்கமான MCP கிளையன்ட் அமைப்பிற்கான [MCP கிளையண்ட் உள்ளமைவைப்](../guides/SETUP_GUIDE.md#mcp-client-configuration) பார்க்கவும்.

---

## அத்தியாவசிய கருவிகள் (14) — கட்டம் 1

| கருவி                           | நோக்கங்கள்            | விளக்கம்                                                                                                                                                    |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | இயக்க நேரம், நினைவகம், சர்க்யூட் பிரேக்கர்கள், வீத வரம்புகள், கேச் புள்ளிவிவரங்கள்                                                                          |
| `omniroute_list_combos`         | `read:combos`         | உத்திகள் கொண்ட அனைத்து உள்ளமைக்கப்பட்ட காம்போக்கள் (விரும்பினால் அளவீடுகள்)                                                                                 |
| `omniroute_get_combo_metrics`   | `read:combos`         | ஒரு குறிப்பிட்ட சேர்க்கைக்கான செயல்திறன் அளவீடுகள்                                                                                                          |
| `omniroute_switch_combo`        | `write:combos`        | ஒரு சேர்க்கையை இயக்கவும் அல்லது செயலிழக்கச் செய்யவும்                                                                                                       |
| `omniroute_create_combo`        | `write:combos`        | ஏற்கனவே உள்ள காம்போ API மூலம் சரிபார்க்கப்பட்ட சேர்க்கையை உருவாக்கவும்                                                                                      |
| `omniroute_check_quota`         | `read:quota`          | ஒதுக்கீடு used/total, சதவீதம் மீதமுள்ளது, நேரத்தை மீட்டமைத்தல், டோக்கன் ஆரோக்கியம்                                                                          |
| `omniroute_route_request`       | `execute:completions` | OmniRoute ரூட்டிங் மூலம் அரட்டை நிறைவு அனுப்பவும்                                                                                                           |
| `omniroute_cost_report`         | `read:usage`          | காலத்தின் அடிப்படையில் செலவு அறிக்கை (session/day/week/month)                                                                                               |
| `omniroute_list_models_catalog` | `read:models`         | திறன்கள், நிலை, விலை நிர்ணயம் கொண்ட முழு மாதிரி பட்டியல்                                                                                                    |
| `omniroute_radar_catalog`       | `read:radar`          | உள்ளூர் கையொப்பமிடப்பட்ட ரேடார் பட்டியல்; விருப்பமான provider/family வடிப்பான்கள்                                                                           |
| `omniroute_tool_search`         | `read:tools`          | பதிவுசெய்யப்பட்ட MCP பட்டியலிலிருந்து கருவிகளைக் கண்டறியவும்                                                                                                |
| `omniroute_web_search`          | `execute:search`      | கட்டமைக்கப்பட்ட தேடல் வழங்குநர்கள் மூலம் இணையத் தேடல். X/Twitter. அல்ல                                                                                      |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok மூலம் X ஐத் தேடவும் அல்லது Xquik API முடிவுகளுக்கு `xquik-search` தேர்ந்தெடுக்கவும். தேர்ந்தெடுக்கப்பட்ட பின்தளத்திற்கு நற்சான்றிதழ்கள் தேவை. |
| `omniroute_web_fetch`           | `execute:search`      | உள்ளமைக்கப்பட்ட பெறுதல் வழங்குநர்கள் மூலம் இணைய உள்ளடக்கத்தைப் பெறவும்                                                                                      |

## மேம்பட்ட கருவிகள் (11) — கட்டம் 2

| கருவி                              | நோக்கங்கள்                           | விளக்கம்                                                                                                                      |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ஃபால்பேக் ட்ரீயுடன் ட்ரை-ரன் ரூட்டிங் சிமுலேஷன்                                                                               |
| `omniroute_set_budget_guard`       | `write:budget`                       | degrade/block/alert செயலுடன் கூடிய அமர்வு பட்ஜெட்                                                                             |
| `omniroute_set_routing_strategy`   | `write:combos`                       | இயக்க நேரத்தில் காம்போ உத்தியைப் புதுப்பிக்கவும் (priority/weighted/auto/etc.)                                                |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` பின்னடைவு முன்னமைவைப் பயன்படுத்தவும்                                               |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | உண்மையான அப்ஸ்ட்ரீம் அழைப்பைப் பயன்படுத்தி காம்போவில் உள்ள ஒவ்வொரு வழங்குநரின் நேரடி சோதனை                                    |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 தாமதம் மற்றும் சர்க்யூட் பிரேக்கர் நிலையுடன் ஒவ்வொரு வழங்குநருக்கும் அளவீடுகள்                                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | budget/latency கட்டுப்பாடுகளுடன் பணி வகையின்படி சேர்க்கையை பரிந்துரைக்கவும்                                                   |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | ஒரு கோரிக்கை ஏன் வழங்குநருக்கு அனுப்பப்பட்டது என்பதை விளக்குங்கள் (மதிப்பீட்டு காரணிகள் + வீழ்ச்சிகள்)                        |
| `omniroute_get_session_snapshot`   | `read:usage`                         | முழு அமர்வு ஸ்னாப்ஷாட்: செலவு, டோக்கன்கள், மேல் models/providers, பிழைகள், பட்ஜெட் பாதுகாப்பு                                 |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | உடைந்த சேர்க்கை குறிப்புகள் / அனாதை வரிசைகள் போன்ற தரவுத்தள சறுக்கல்களைக் கண்டறிதல் (மற்றும் விருப்பமாக தானாக பழுதுபார்த்தல்) |
| `omniroute_sync_pricing`           | `pricing:write`                      | வெளிப்புற மூலங்களிலிருந்து விலை தரவை ஒத்திசைக்கவும் (LiteLLM); `dryRun` ஆதரிக்கிறது                                           |

## தற்காலிக சேமிப்பு கருவிகள் (2)

| கருவி                   | நோக்கங்கள்    | விளக்கம்                                                             |
| :---------------------- | :------------ | :------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | சொற்பொருள் கேச், ப்ராம்ட்-கேச் மற்றும் ஐடிம்போடென்சி புள்ளிவிவரங்கள் |
| `omniroute_cache_flush` | `write:cache` | உலகளாவிய அல்லது signature/model மூலம் தற்காலிக சேமிப்பை பறிக்கவும்   |

## சுருக்க கருவிகள் (13)

| கருவி                               | நோக்கங்கள்          | விளக்கம்                                                                                                                                                  |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | சுருக்க அமைப்புகள், பகுப்பாய்வு சுருக்கம் மற்றும் கேச்-விழிப்புணர்வு புள்ளிவிவரங்கள் ( `analytics.mcpDescriptionCompression` மெட்டாடேட்டாவை உள்ளடக்கியது) |
| `omniroute_compression_configure`   | `write:compression` | சுருக்க முறை, த்ரெஷோல்ட், இலக்கு விகிதம், கணினி-விரைவில் பாதுகாப்பு, MCP விளக்கம் சுருக்க நிலைமாற்றம் ஆகியவற்றை உள்ளமைக்கவும்                             |
| `omniroute_set_compression_engine`  | `write:compression` | செயலில் உள்ள இயந்திரம் (off/caveman/rtk/stacked) மற்றும் Caveman/RTK தீவிரம் ஆகியவற்றைத் தேர்ந்தெடுக்கவும்                                                |
| `omniroute_list_compression_combos` | `read:compression`  | சுருக்க காம்போக்கள் மற்றும் அவற்றின் எஞ்சின் பைப்லைன்கள் என்று பெயரிடப்பட்ட பட்டியல்                                                                      |
| `omniroute_compression_combo_stats` | `read:compression`  | கம்ப்ரஷன் காம்போ மற்றும் எஞ்சின் மூலம் குழுவாக்கப்பட்ட பகுப்பாய்வு                                                                                        |
| `omniroute_ccr_store`               | `write:compression` | வரம்பிற்குட்பட்ட இன்-மெமரி CCR ஸ்டோரில் அழைப்பாளர்-தனிமைப்படுத்தப்பட்ட உள்ளடக்கத்தைச் சேமித்து, மார்க்கர் மற்றும் `ccr://` குறிப்பை வழங்கவும்             |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR உள்ளடக்கத்தை முழுமையாக அல்லது தலை, வால், கோடுகள், grep மற்றும் புள்ளிவிவர முறைகளுடன் மீட்டெடுக்கவும்                                                  |
| `omniroute_ccr_inspect`             | `read:compression`  | உள்ளடக்கத்தைத் திரும்பப் பெறாமல் அழைப்பாளருக்குச் சொந்தமான CCR மெட்டாடேட்டாவைச் சரிபார்க்கவும்                                                            |
| `omniroute_ccr_list`                | `read:compression`  | அழைப்பாளருக்குச் சொந்தமான CCR தொகுதிகளுக்கான பக்க மெட்டாடேட்டாவைப் பட்டியலிடுங்கள்                                                                        |
| `omniroute_ccr_delete`              | `write:compression` | அழைப்பாளருக்குச் சொந்தமான CCR தொகுதியை நீக்கவும்                                                                                                          |
| `omniroute_ccr_stats`               | `read:compression`  | அழைப்பாளர் நோக்கம் கொண்ட நினைவகப் பயன்பாடு, லைஃப்சைக்கிள் கவுண்டர்கள் மற்றும் ஸ்டோர் வரம்புகளைப் புகாரளிக்கவும்                                           |
| `omniroute_rtk_discover`            | `read:compression`  | தேர்வு செய்யப்பட்ட RTK வெளியீட்டு மாதிரிகளில் தொடர்ச்சியான இரைச்சலைக் கண்டறியவும்                                                                         |
| `omniroute_rtk_learn`               | `read:compression`  | தேர்வு செய்யப்பட்ட மாதிரிகளிலிருந்து மதிப்பாய்வு செய்யக்கூடிய RTK வடிகட்டி வரைவை உருவாக்கவும்                                                             |

CCR உள்ளீடுகள் இரண்டு-அடுக்கு ஸ்டோரைப் பயன்படுத்துகின்றன: உள்ளூர் கிளவுட் அல்லாத இயக்க நேரங்களில், நீடித்த SQLite அடுக்கு (`ccr_blocks`, இயல்புநிலை) மூலம் ஆதரிக்கப்படும் சூடான இன்-மெமரி அடுக்கு, எனவே ஒரு தொகுதி வெளியேற்றப்படாமல் அல்லது மறுதொடக்கம் செய்யும் வரை அதன் TTL ஆனது — தவிர, 512-க்கு மேல் கிளவுட் KB க்கு மேல் நினைவகம் இயங்கும் வரை இருக்கும். ஒவ்வொரு தொகுதியும் 2 MiB ஆகவும், ஒவ்வொரு முதன்மையும் 16 MiB ஆகவும், உலகளாவிய அங்காடி 64 MiB ஆகவும் வரையறுக்கப்பட்டுள்ளது. உள்ளீடுகள் இயல்புநிலை 24-மணிநேர TTL (அதிகபட்சம் ஏழு நாட்கள்). முழு MCP மீட்டெடுப்பு 256 KiB வரை வரையறுக்கப்பட்டுள்ளது; பெரிய தொகுதிகள் வரம்பு மற்றும் grep முறைகள் மூலம் கிடைக்கும். சேமிப்பு, மீட்டெடுப்பு, பட்டியல், ஆய்வு, நீக்குதல் மற்றும் புள்ளிவிவரங்கள் அங்கீகரிக்கப்பட்ட API-விசை முதன்மையால் தனிமைப்படுத்தப்படுகின்றன. தணிக்கை பதிவுகளில் ஹாஷ்கள் மற்றும் அளவு மெட்டாடேட்டா உள்ளது, உள்ளடக்கம் இல்லை. ஆபரேட்டர் எதிர்கொள்ளும் விவரங்கள் (இரண்டு குறிப்பான்கள், கிளையன்ட் முன்நிபந்தனைகள், `codemode:false`, ஒரு கருவிக்கான நோக்கங்கள், பேஜினேஷன் மற்றும் ஒரு கண்டறியும் மேட்ரிக்ஸ்) [சுருக்க இயந்திரங்கள் → முன்நிபந்தனைகள் / ஆபரேட்டர் வழிகாட்டி](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` `analytics.mcpDescriptionCompression` இன் கீழ் தனித்தனியாக MCP விளக்க சுருக்கத்தை அறிக்கை செய்கிறது. அந்த மதிப்புகள் MCP பட்டியலிடக்கூடிய விளக்கங்களுக்கான மெட்டாடேட்டா அளவு மதிப்பீடுகள் (`tools`, `prompts`, `resources`, மற்றும் `resourceTemplates`); அவை வழங்குநரின் பயன்பாட்டு ரசீதுகள் அல்ல மேலும் `source: "mcp_metadata_estimate"` என்று குறிக்கப்பட்டுள்ளன.

### MCP அணுகல் மர வடிகட்டி (v3.8.0)

மேலே உள்ள சுருக்கக் கருவிகளிலிருந்து தனித்தனியாக, OmniRoute ஆனது ஒரு பிந்தைய செயலாக்க வடிகட்டியை உள்ளடக்கியது.** கருவி முடிவுகள்** MCP browser/accessibility கருவிகள் முகவருக்குத் திரும்புவதற்கு முன். இந்த வடிப்பான் ஒரு கருவி அல்ல — இது verbose accessibility-tree அல்லது browser-snapshot text (≥ 2000 chars) உள்ள எந்த கருவி முடிவுகளிலும் வெளிப்படையாக இயங்கும்.

முக்கிய நடத்தைகள்:

- ≥ 30 தொடர்ச்சியான உடன்பிறப்பு வரிகளை ஹெட் + வால் சுருக்கத்தில் சுருக்குகிறது
- Playwright/computer-use க்கு தேவைப்படும் `[ref=eXX]` ஆங்கர்களைப் பாதுகாக்கிறது
- வழிசெலுத்தல் குறிப்புடன் பெரிதாக்கப்பட்ட உரையை (> 50,000 எழுத்துகள்) கடினமாக துண்டிக்கிறது
- எதிர்பார்த்த சேமிப்பு:** 60–80%** உலாவி ஸ்னாப்ஷாட் பேலோடுகளில்

கட்டமைப்பு: உலகளாவிய அமைப்புகளில் `compression.mcpAccessibility` (இடம்பெயர்வு 056). செயல்படுத்தல்: `open-sse/services/compression/engines/mcpAccessibility/`. முழு ஆவணம்: [சுருக்க இயந்திரங்கள் — MCP அணுகல்தன்மை மரம் வடிகட்டி](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

இந்தக் கருவிகளுக்குப் பின்னால் உள்ள இயக்க நேர சுருக்க மாதிரிக்கு [சுருக்க இயந்திரங்கள்](../compression/COMPRESSION_ENGINES.md) மற்றும் [RTK சுருக்கத்தைப்](../compression/RTK_COMPRESSION.md) பார்க்கவும்.

## 1ப்ராக்ஸி கருவிகள் (3)

| கருவி                       | நோக்கங்கள்     | விளக்கம்                                                                                          |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1ப்ராக்ஸி சந்தையிலிருந்து இலவச ப்ராக்ஸிகளைப் பெறவும் (protocol/country/quality/limit வடிகட்டிகள்) |
| `omniroute_oneproxy_rotate` | `read:proxies` | உத்தி மூலம் அடுத்த கிடைக்கக்கூடிய ப்ராக்ஸியைப் பெறவும் (`random` / `quality` / `sequential`)      |
| `omniroute_oneproxy_stats`  | `read:proxies` | பூல் புள்ளிவிவரங்கள், ஒத்திசைவு நிலை, நெறிமுறை மற்றும் நாட்டின் விநியோகம்                         |

## நினைவக கருவிகள் (3)

`open-sse/mcp-server/tools/memoryTools.ts` இல் வரையறுக்கப்பட்டுள்ளது. Auth/scope நிலையான MCP ஸ்கோப் பைப்லைன் மூலம் செயல்படுத்தப்படுகிறது.

| கருவி                     | நோக்கங்கள்     | விளக்கம்                                                                                  |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | டோக்கன்-பட்ஜெட் அமலாக்கத்துடன் வினவல் / வகை / API விசை மூலம் நினைவுகளைத் தேடுங்கள்        |
| `omniroute_memory_add`    | `write:memory` | புதிய நினைவக உள்ளீட்டைச் சேர்க்கவும் (`factual` / `episodic` / `procedural` / `semantic`) |
| `omniroute_memory_clear`  | `write:memory` | API விசைக்கான தெளிவான நினைவுகள், வகை அல்லது `olderThan` நேர முத்திரை மூலம் வடிகட்டப்படும் |

## திறன் கருவிகள் (4)

`open-sse/mcp-server/tools/skillTools.ts` இல் வரையறுக்கப்பட்டுள்ளது. `src/lib/skills/registry` + `src/lib/skills/executor` ஆல் ஆதரிக்கப்பட்டது.

| கருவி                         | நோக்கங்கள்       | விளக்கம்                                                                                                         |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API விசை, பெயர் அல்லது இயக்கப்பட்ட நிலை மூலம் விருப்ப வடிகட்டுதலுடன் பதிவுசெய்யப்பட்ட திறன்களைப் பட்டியலிடுங்கள் |
| `omniroute_skills_enable`     | `write:skills`   | ID மூலம் ஒரு குறிப்பிட்ட திறனை இயக்கவும் அல்லது முடக்கவும்                                                       |
| `omniroute_skills_execute`    | `execute:skills` | வழங்கப்பட்ட உள்ளீட்டைக் கொண்டு ஒரு திறமையைச் செயல்படுத்தி, செயலாக்கப் பதிவைத் திருப்பி அனுப்பவும்                |
| `omniroute_skills_executions` | `read:skills`    | சமீபத்திய திறன் செயல்படுத்தல் வரலாற்றை பட்டியலிடுங்கள்                                                           |

## Notion சூழல் ஆதாரம் (6)

`open-sse/mcp-server/tools/notionTools.ts` இல் வரையறுக்கப்பட்டுள்ளது. டோக்கன் `key_value` அட்டவணையில் `src/lib/db/notion.ts` வழியாக சேமிக்கப்படுகிறது. `src/lib/notion/api.ts` இல் REST கிளையன்ட். `src/app/api/settings/notion/route.ts` இல் API அமைப்புகள். `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` இல் டாஷ்போர்டு UI.

இலிருந்து உங்கள் Notion ஒருங்கிணைப்பு டோக்கனை உள்ளமைக்கவும்** சூழல் ஆதாரங்கள்** எண்ட்பாயிண்ட் டாஷ்போர்டில் உள்ள டேப் அல்லது REST API வழியாக:

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

| கருவி                        | நோக்கங்கள்     | விளக்கம்                                                                               |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | அனைத்து பக்கங்களிலும் தரவுத்தளங்களிலும் முழு உரை தேடல்                                 |
| `notion_get_page`            | `read:notion`  | அதன் பண்புகளுடன் ID மூலம் ஒரு பக்கத்தைப் பெறுங்கள்                                     |
| `notion_list_block_children` | `read:notion`  | ஒரு பக்கம் அல்லது தொகுதியின் குழந்தை தொகுதிகளை பட்டியலிடுங்கள்                         |
| `notion_query_database`      | `read:notion`  | வடிப்பான்கள், வரிசைகள் மற்றும் பேஜினேஷன் கொண்ட தரவுத்தளத்தை வினவவும்                   |
| `notion_get_database`        | `read:notion`  | ID மூலம் தரவுத்தளத் திட்டத்தைப் பெறவும்                                                |
| `notion_append_blocks`       | `write:notion` | குழந்தைகள் தொகுதிகளை பெற்றோர் தொகுதியில் சேர்க்கவும் (ஒரு கோரிக்கைக்கு அதிகபட்சம் 100) |

## முகவர் திறன் பட்டியல் கருவிகள் (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` இல் வரையறுக்கப்பட்டுள்ளது. `src/lib/agentSkills/catalog` ஆல் ஆதரிக்கப்பட்டது. இந்தக் கருவிகள் 45-நுழைவு முகவர் திறன் ஆவணப்படுத்தல் பட்டியலை MCP கிளையண்டுகள் மற்றும் வெளிப்புற முகவர்களிடம் வெளிப்படுத்துகின்றன. நோக்கம்: `read:catalog`.

| கருவி                             | நோக்கங்கள்     | விளக்கம்                                                                                                                                            |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | விருப்பமான `category` (api\| cli) மற்றும் `area` வடிப்பான்களுடன் அனைத்து 45 முகவர் திறன்களையும் பட்டியலிடுங்கள்; மெட்டாடேட்டா + கவரேஜை வழங்குகிறது  |
| `omniroute_agent_skills_get`      | `read:catalog` | `id` மெட்டாடேட்டா + SKILL.md உள்ளடக்கத்தைப் பெறவும்                                                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | கவரேஜ் புள்ளிவிவரங்கள்: 23 API, 21 CLI மற்றும் 1 config திறன்களில் எத்தனை SKILL.md கோப்புகளை கோப்பு முறைமை மற்றும் பட்டியல் மொத்தத்தில் கொண்டுள்ளது |

முழு பட்டியல் மற்றும் வெளிப்புற முகவர்கள் அதை எவ்வாறு பயன்படுத்துகிறார்கள் என்பதற்கு [AGENT-SKILLS.md](./AGENT-SKILLS.md) பார்க்கவும்.

## தொடர்புடைய கட்டமைப்புகள் (v3.8.0)

மேலே உள்ள MCP டூல் இன்வென்டரி (110 தனிப்பட்ட கருவிகள், `countUniqueMcpTools()` ஆல் கணக்கிடப்பட்டது) வேண்டுமென்றே இயக்க நேர routing/cache/compression/memory/skills/proxy/context-source செயல்பாடுகளுக்கு நோக்கம் கொண்டது. v3.8.0 இல் MCP சேவையகத்துடன் இரண்டு அருகிலுள்ள கட்டமைப்புகள் அனுப்பப்பட்டு தனித்தனியாக ஆவணப்படுத்தப்பட்டுள்ளன:

### கிளவுட் முகவர்கள்

க்ளவுட் ஏஜெண்டுகள் என்பது AI குறியீட்டு முகவர்கள் (கோடெக்ஸ்-கிளவுட், கர்சர்-கிளவுட், டெவின், ஜூல்ஸ்) LLM வழங்குநர்களுக்குப் பயன்படுத்தப்படும் அதே இணைப்பு மாதிரி மூலம் OmniRoute இல் இணைக்கப்பட்டுள்ளது. அவை அவற்றின் சொந்த REST மேற்பரப்பு (`/api/v1/agents/*`) வழியாக வெளிப்படும்** இல்லை** MCP டூல் கேட்லாக் — க்ளவுட் ஏஜெண்டை அழைக்கும் ஒரு பகுதி MCP ஸ்கோப்பைப் பயன்படுத்தாது.

- செயல்படுத்தல்: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- வாழ்க்கைச் சுழற்சி: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- ஆவணம்: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### காவலர்கள்

Guardrails என்பது pre/post-execution வடிகட்டிகள் (விஷன்-பிரிட்ஜ், பை-மாஸ்கர், ப்ராம்ட்-இன்ஜெக்ஷன்) அரட்டை பைப்லைனுக்குள் பயன்படுத்தப்படும். அவை MCP tool/route அடுக்கை அடைவதற்கு முன்பே இயங்கி, தணிக்கைக் குழாய்க்கு கட்டமைக்கப்பட்ட மீறல்களை வெளியிடுகின்றன; அவை MCP கருவிகளாகப் பயன்படுத்தப்படவில்லை.

- செயல்படுத்தல்: `src/lib/guardrails/`.
- ஆவணம்: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

தடுக்கப்பட்டதாக தோன்றும் MCP அழைப்பை பிழைத்திருத்தம் செய்யும் போது, MCP தணிக்கை பதிவு (`scope_denied:*` உள்ளீடுகள்) மற்றும் காவலர் தணிக்கை பாதை — இரண்டையும் சரிபார்க்கவும், ஒரு கோரிக்கை ஒரு காவலரால் நிராகரிக்கப்படலாம்** முன்** அது எப்போதும் MCP ஸ்கோப் அமலாக்க அடுக்கை அடைகிறது.

---

## REST API இறுதிப்புள்ளிகள்

| இறுதிப்புள்ளி          | முறை                  | விளக்கம்                                                                                                                     | அங்கீகாரம்               |
| :--------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------- |
| `/api/mcp/status`      | `GET`                 | சேவையக நிலை: இதய துடிப்பு, HTTP போக்குவரத்து நிலை, தணிக்கை நடவடிக்கை சுருக்கம்                                               | மேலாண்மை (session/admin) |
| `/api/mcp/tools`       | `GET`                 | கருவி பட்டியல் (பெயர், விளக்கம், நோக்கங்கள், கட்டம், மூல முனைப்புள்ளிகள்)                                                    | மேலாண்மை                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE போக்குவரத்து முடிவுப்புள்ளி ( `mcpEnabled` + `mcpTransport === "sse"` ஆல் நுழைவு)                                        | API முக்கிய + நோக்கங்கள் |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ஸ்ட்ரீமபிள் HTTP போக்குவரத்து ( `mcp-session-id` தலைப்பைப் பயன்படுத்துகிறது; `DELETE` அமர்வு முடிவடைகிறது)                   | API முக்கிய + நோக்கங்கள் |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` இலிருந்து பதிவு பதிவுகளை தணிக்கை செய்யவும் (வடிப்பான்கள்: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | மேலாண்மை                 |
| `/api/mcp/audit/stats` | `GET`                 | ஒருங்கிணைக்கப்பட்ட தணிக்கை புள்ளிவிவரங்கள் (`totalCalls`, `successRate`, `avgDurationMs`, சிறந்த கருவிகள்)                   | மேலாண்மை                 |

மூல கோப்புகள்: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

அமைப்புகளில் (`mcpEnabled`) MCP சேவையகம் இயக்கப்பட்டு, பொருத்தமான `mcpTransport` தேர்ந்தெடுக்கப்படும் வரை SSE மற்றும் ஸ்ட்ரீம் செய்யக்கூடிய HTTP போக்குவரத்துகள் இரண்டும் தடுக்கப்படும். தவறான போக்குவரத்து உள்ளமைக்கப்பட்டால், பாதை அமைப்புகளை மாற்றுவதற்கான குறிப்புடன் HTTP 400 ஐத் திருப்பியளிக்கும்.

---

## அங்கீகாரம் & நோக்கங்கள்

MCP கருவி அழைப்பாளரிடமிருந்து ஸ்கோப் சரங்களைப் படிக்கிறது. அந்த காசோலை மூன்று சுயாதீன பெயர்வெளிகளில் ஒன்றாகும். ஒரு செக்கரிடமிருந்து ஒரு பாஸ் மற்றவரிடமிருந்து பாஸ் அல்ல. விதிகள் [மூன்று நோக்கம் பெயர்வெளிகள்](#three-scope-namespaces). கருவி பட்டியல் [MCP கருவி நோக்கங்கள்](#mcp-tool-scopes) ஆகும்.

### மூன்று நோக்கம் பெயர்வெளிகள்

API விசையில்`manage`, MCP கருவியில் `read:compression` மற்றும் `oma_live_…` அணுகல் டோக்கனில் `read` ஆகியவை மூன்று வெவ்வேறு மானியங்கள். `read` அணுகல் டோக்கனை மாற்றும் மேலாண்மை வழிக்கு அனுப்பும் அழைப்பாளர்களுக்கு HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` கிடைக்கும் அந்த தரவரிசை `scopeSatisfies` ஆகும். இது MCP அட்டவணையை ஆலோசிக்கவில்லை, மேலும் MCP மேட்சர் அதைக் கலந்தாலோசிக்கவில்லை.

| பெயர்வெளி            | நற்சான்றிதழ்                                                                | செக்கர்                     | ஒரு பாஸ் அனுமதிக்கிறது                                  |
| :------------------- | :-------------------------------------------------------------------------- | :-------------------------- | :------------------------------------------------------ |
| API-விசை மேலாண்மை    | `api_keys.scopes`                                                           | `hasManageScope`            | அந்த தாங்கி விசைக்கான மேலாண்மை REST                     |
| API-விசை சேர்க்கை    | அதே அணிவரிசை, ஒரு சரியான சரம்                                               | கீழே பெயரிடப்பட்ட உதவியாளர் | அந்த ஒரு திறன் மட்டுமே                                  |
| MCP கருவி நோக்கங்கள் | அதே வரிசை, வேறு MCP `_meta` (HTTP/SSE மட்டும்), வேறு `OMNIROUTE_MCP_SCOPES` | `scopeMatches`              | அந்த கருவி, அமலாக்கம் இயக்கப்பட்டதும்                   |
| அணுகல் டோக்கன்       | `oma_live_…`                                                                | `scopeSatisfies`            | மேலாண்மை பாதை அதன் முறை மற்றும் பாதைக்கு அந்த தரம் தேவை |

ஒவ்வொரு நற்சான்றிதழையும் அச்சிடுவது [மேலாண்மை அங்கீகாரத்தில்](../guides/MANAGEMENT-AUTH.md) உள்ளடக்கப்பட்டுள்ளது.

#### API-விசை நோக்கங்கள்

ஒரு `api_keys.scopes` வரிசை இரண்டு வேலைகளுக்கு உணவளிக்கிறது. அவை வெவ்வேறு செயல்பாடுகளைப் பயன்படுத்துகின்றன.

**மேலாண்மை REST.** `manage` மற்றும் `admin` ஆகியவை `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) இன் உறுப்பினர்கள். `hasManageScope` என்பது அந்த விசைக்கான மேலாண்மை வழிகளை அங்கீகரிக்கிறது. அந்த வழிகளில் `admin` மேலாண்மை திறன் கொண்டது. இங்கே `admin` என்ற சொல் அணுகல்-டோக்கன் தரவரிசை அல்ல மேலும் அது MCP கருவி நோக்கங்களாக விரிவடையாது.

**சேர்க்கை சரங்கள்.** ஒவ்வொன்றும் ஒரு துல்லியமான உறுப்பினர் சோதனை, மேலும் ஒவ்வொன்றும் `MANAGEMENT_API_KEY_SCOPES` வெளியே இருக்கும்.

| நோக்கம்                        | ஒரு பாஸ் அனுமதிக்கிறது                                                                                                                                                            |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | லூப்பேக் அல்லாத `/api/mcp/` LOCAL_ONLY கார்வ்-அவுட் மட்டும் (`hasMcpConnectOrManageScope`). `manage` அல்லது `admin` கொண்ட விசை இன்னும் அந்த செதுக்குதலைக் கடந்து செல்கிறது.       |
| `self:usage`                   | இந்த விசைக்கான `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` உருவாக்கத்தில் (`normalizeSelfServiceScopesForCreate`) இந்த நோக்கத்தை சேர்க்கிறது. |
| `self:account-quota`           | அந்த நிலை பேலோடில் உள்ள அப்ஸ்ட்ரீம் கணக்கு ஒதுக்கீடுகள் (`src/lib/usage/apiKeySelfService.ts`). நிலை பாதைக்கு இன்னும் `self:usage` தேவைப்படுகிறது.                                |
| `policy:bypass-provider-quota` | இந்த விசையின் அனுமான அழைப்புகள் வழங்குநர்-ஒதுக்கீட்டுக் கொள்கையைத் தவிர்க்கின்றன (`hasProviderQuotaBypassScope` இல் `src/sse/handlers/chat.ts`).                                  |

#### பொருத்தம்

அட்டவணை என்பது [MCP கருவி நோக்கங்களின்](#mcp-tool-scopes) கீழ் உள்ள அட்டவணை ஆகும். `src/shared/constants/mcpScopes.ts` இல் `MCP_SCOPE_LIST` அந்த அட்டவணையாகக் கருத வேண்டாம்: இது அசல் தட்டச்சு செய்யப்பட்ட துணைக்குழு ஆகும். பிந்தைய கருவிகள் அதன் அருகில் மேலும் நோக்கங்களை அறிவிக்கின்றன (`read:notion`, `read:skills`, `read:local-corpus`, மற்றும் அட்டவணையின் மீதமுள்ளவை).

`open-sse/mcp-server/scopeEnforcement.ts` இல் உள்ள `evaluateToolScopes` தேவைப்படும் ஒவ்வொரு நோக்கமும் சில அனுமதிக்கப்பட்ட நோக்கத்துடன் பொருந்தும்போது அழைப்பை அனுமதிக்கிறது:

- `*` தேவையான ஒவ்வொரு நோக்கத்திற்கும் பொருந்துகிறது.
- `*` இல் முடிவடையும் ஒரு வழங்கப்பட்ட நோக்கம், நட்சத்திரத்திற்கு முன் முன்னொட்டுடன் தொடங்கும் தேவையான நோக்கத்துடன் பொருந்துகிறது. `read:*` `read:compression` உடன் பொருந்துகிறது.
- மற்ற அனைத்து வழங்கப்பட்ட நோக்கமும் ஒரே மாதிரியான தேவையான சரத்துடன் மட்டுமே பொருந்தும்.

`["manage"]` ஆக இருக்கும் விசை `read:compression` க்கு `scopeMatches` இல் தோல்வியடைகிறது. `admin`, `mcp:connect`, `read`, மற்றும் `write` ஆகியவை மட்டுமே வழங்கப்பட்ட சரங்களாக இருக்கும்போது அதே அழைப்பு தோல்வியடையும். `*` க்கு அப்பால் MCP கருவி நோக்கங்களில் படிநிலை இல்லை.

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` (இயல்புநிலை `false`) இல்லாவிட்டால் அமலாக்கம் முடக்கப்பட்டுள்ளது. இது முடக்கத்தில் இருக்கும்போது, `evaluateToolScopes` அழைப்பை அனுமதிக்கிறது மற்றும் பட்டியலைத் தவிர்க்கிறது. இது இயக்கத்தில் இருக்கும் போது, HTTP தாங்கி விசையின் `api_keys.scopes` `authInfo` ஆகப் பயன்படுத்துகிறது ( [ஒவ்வொரு விசைக்கும் HTTP ஸ்கோப் பைண்டிங்கைப்](#per-key-http-scope-binding-7895) பார்க்கவும்). முக்கிய நோக்கங்கள் எதுவும் தீர்க்கப்படாதபோது, வழங்கப்பட்ட தொகுப்பு MCP `_meta` ( HTTP/SSE அழைப்பாளர்களுக்கு மட்டுமே மதிப்பளிக்கப்படுகிறது, HTTP auth சூழலில் உள்ளது; ஒரு stdio அழைப்பாளரின் `_meta` புறக்கணிக்கப்படுகிறது, ஏனெனில் கிளையன்ட் அதைக் கட்டுப்படுத்துகிறது மற்றும் அது ஒவ்வொரு அழைப்பாளரின் அடையாளத்தையும் கொண்டிருக்கவில்லை), பின்னர் `OMNIROUTE_MCP_SCOPES`.

#### அணுகல்-டோக்கன் நோக்கங்கள்

`oma_live_…` டோக்கன்கள் (`src/lib/accessTokens/scopes.ts`) `read`, `write` அல்லது `admin` ஆகியவற்றைக் கொண்டு செல்கின்றன. `scopeSatisfies` என்பது ஒரு தரவரிசை: `admin` என்பது `write` மற்றும் `read` உள்ளடக்கியது, மேலும் `write` என்பது `read` உள்ளடக்கியது. தெரியாத நோக்கங்கள் எதையும் மறைக்காது.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) அந்த தரவரிசையை `inferRequiredScope` (`src/server/authz/accessScopes.ts`) உடன் ஒப்பிடுகிறது:

- `GET`, `HEAD` மற்றும் `OPTIONS` `read` தேவைப்படுகிறது.
- மற்ற எல்லா முறைகளுக்கும் `write` தேவைப்படுகிறது.
- `ADMIN_SCOPE_PREFIXES` இல் உள்ள பாதைகளுக்கு ஒவ்வொரு முறைக்கும் `admin` தேவைப்படுகிறது. `/api/mcp` அந்தப் பட்டியலில் உள்ளது, எனவே `write` அணுகல் டோக்கன் இன்னும் MCP HTTP மேற்பரப்பை அழைக்க முடியாது.
- `ADMIN_MUTATION_PREFIXES` இல் உள்ள பாதைகளுக்கு பிறழ்வுகளுக்கு மட்டுமே `admin` தேவைப்படுகிறது.
- `ADMIN_MUTATION_EXACT_PATHS` இல் உள்ள பாதைகள் (`/api/settings`, `/api/settings/require-login`) பிறழ்வுகளுக்கு மட்டுமே `admin` தேவைப்படுகிறது, மேலும் அந்த சரியான பாதையில் மட்டுமே — மற்ற `/api/settings/*` துணை வழிகள் `write` வைத்திருக்கும்.

`PATCH /api/keys/{id}` என்பது ஒரு பிறழ்வு மற்றும் அந்த நிர்வாகி பட்டியலில் இல்லை, எனவே `read` டோக்கன் 403 `Access token scope 'read' is insufficient; 'write' required.` A `write` அல்லது `admin` அணுகல் டோக்கன் அந்த வழியை திருப்திப்படுத்துகிறது. ஒரு டாஷ்போர்டு JWT, லூப்பேக் CLI மெஷின்-ஐடி டோக்கன் மற்றும் `manage` அல்லது `admin` உடன் ஒரு API விசை மற்ற கிளைகளை எடுத்துக்கொள்கிறது மற்றும் இந்த ரேங்கால் சுருக்கப்படவில்லை.

`/api/mcp` க்கு `scopeSatisfies` கடக்கும் அணுகல் டோக்கன் நிர்வாக வாயிலை மட்டும் அழிக்கிறது. கருவி அழைப்புகள் இன்னும் `scopeMatches` ஏபிஐ-விசை ஸ்கோப்புகளுக்கு எதிராக இயக்குகின்றன. அணுகல்-டோக்கன் தரவரிசை `scopeMatches` க்கு உள்ளீடு அல்ல.

### MCP கருவி நோக்கங்கள்

ஸ்கோப் அமலாக்கம் `open-sse/mcp-server/scopeEnforcement.ts` இல் மையப்படுத்தப்பட்டுள்ளது. ஒவ்வொரு கருவிக்கும் குறிப்பிட்ட நோக்கங்கள் தேவை:

| நோக்கம்               | கருவிகள்                                                                                                                                                                            |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                   |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                           |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                              |
| `read:quota`          | `check_quota`                                                                                                                                                                       |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                              |
| `read:models`         | `list_models_catalog`                                                                                                                                                               |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                       |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                               |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                  |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                         |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                      |
| `read:cache`          | `cache_stats`                                                                                                                                                                       |
| `write:cache`         | `cache_flush`                                                                                                                                                                       |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                          |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                   |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                               |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                    |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                              |
| `read:memory`         | `memory_search`                                                                                                                                                                     |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                        |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                  |
| `write:skills`        | `skills_enable`                                                                                                                                                                     |
| `execute:skills`      | `skills_execute`                                                                                                                                                                    |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                    |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                             |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                           |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                    |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                      |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                  |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                     |
| `read:obsidian`       | 13 வாசிப்பு கருவிகள் — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 எழுதும் கருவிகள் — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                   |

வைல்டு கார்டு ஸ்கோப்புகள் ஆதரிக்கப்படுகின்றன: `read:*` அனைத்து ரீட்-ஸ்கோப்புகளையும் வழங்குகிறது, `*` முழு அணுகலை வழங்குகிறது.

### `mcp:connect` — குறுகிய பாதை திறன் (#7895)

லூப்பேக் அல்லாதவற்றிலிருந்து HTTP/SSE MCP போக்குவரத்தை (`/api/mcp/*`) அடைய `/api/mcp/` LOCAL_ONLY கார்வ்-அவுட் தேவைப்படுகிறது ( `docs/security/ROUTE_GUARD_TIERS.md` பார்க்கவும்). வரலாற்று ரீதியாக அந்த கார்வ்-அவுட் ஒரு முழு `manage`/`admin` -scope API விசை — மட்டுமே ஏற்றுக்கொண்டது, MCP மட்டுமே பேச வேண்டிய அழைப்பாளருக்கு மிகவும் அகலமானது. `src/shared/constants/managementScopes.ts` இப்போது `MCP_CONNECT_SCOPE = "mcp:connect"` ஏற்றுமதி செய்கிறது: `src/server/authz/policies/management.ts` — இல் `/api/mcp/` பைபாஸை ONLY அங்கீகரிக்கும் ஒரு சேர்க்கை, குறுகிய நோக்கம் ( `SELF_USAGE_SCOPE` போன்ற முன்மாதிரி) இது வேறு எந்த மேலாண்மை-பாதை அணுகலையும் வழங்காது மற்றும் வேண்டுமென்றே `MANAGEMENT_API_KEY_SCOPES` இன் OUT இல் வைக்கப்படுகிறது. `manage`/`admin` வைத்திருக்கும் ஒரு விசையானது செதுக்குதலை மாற்றாமல் கடந்து செல்கிறது; `mcp:connect` என்பது ரிமோட் MCP-மட்டும் அழைப்பாளர்களுக்கான குறைந்த சலுகை மாற்றாகும், `hasMcpConnectOrManageScope()` வழியாக சரிபார்க்கப்பட்டது.

### ஒரு விசைக்கு HTTP ஸ்கோப் பைண்டிங் (#7895)

HTTP/SSE க்கு மேல், `open-sse/mcp-server/httpTransport.ts` இப்போது அழைப்பாளரின் உண்மையான `api_keys.scopes` `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) வழியாகத் தீர்த்து, அதை MCP SDK இன் `transport.handleRequest(req, { authInfo })` க்கு அனுப்புகிறது, எனவே `extra.authInfo.scopes` ஒவ்வொரு கருவி அழைப்பையும் அடைவது பியர் விசையின் சொந்த நோக்கங்களைப் பிரதிபலிக்கிறது. `scopeEnforcement.ts` இன் `resolveCallerScopeContext()` ஏற்கனவே `_meta` மற்றும் `OMNIROUTE_MCP_SCOPES` env ஃபால்பேக் — விட `authInfo` முன்னுரிமை அளித்துள்ளது, இது முதலில் HTTP மேல் வழங்கப்படாத முதல், அதிக முன்னுரிமை மூலத்தை மட்டுமே நிரப்புகிறது. எந்த API விசையும் தீர்க்கப்படாதபோது (தலைப்பு இல்லை, தவறான விசை), `authInfo` `undefined` ஆக இருக்கும் மற்றும் தெளிவுத்திறன் தற்போதுள்ள `meta`/env சங்கிலியில் மாறாமல் இருக்கும். stdio க்கு ஒவ்வொரு அழைப்பாளர் அடையாளமும் இல்லை ( `mcpCallerIdentity.ts` ஐப் பார்க்கவும்) மேலும் ஒவ்வொரு விசை பிணைப்பு — ஆல் பாதிக்கப்படாது, இது `_meta` படியைத் தவிர்க்கிறது (`_meta` HTTP auth சூழலில் மட்டுமே மதிக்கப்படுகிறது, #15159) மற்றும் `OMNIROUTE_MCP_SCOPES` env விசையிலிருந்து மட்டும் தீர்க்கப்படும்.

**`OMNIROUTE_MCP_ENFORCE_SCOPES` ஐப் பொருட்படுத்தாமல் குறுகிய நோக்கமுள்ள HTTP/SSE அழைப்பாளர்களுக்கு அமலாக்கம் கட்டாயப்படுத்தப்படுகிறது.** `false` க்கு இயல்புநிலை `OMNIROUTE_MCP_ENFORCE_SCOPES` ஆனது local/stdio சிங்கிள்-ஆபரேட்டர் ஃப்ளோவிற்கு மட்டுமே பாதுகாப்பானது, அங்கு ஒவ்வொரு அழைப்பாளரின் அடையாளமும் இல்லை. `resolveCallerScopeContext()` `source === "authInfo"` தீர்க்கும் போதெல்லாம் (அதாவது ஒரு உண்மையான HTTP அங்கீகார தலைப்பு, HTTP/SSE-only) AND அந்த விசை முழு `manage`/`admin` ஸ்கோப்பை வைத்திருக்காத போதெல்லாம், `open-sse/mcp-server/server.ts::withScopeEnforcement()` ஒரு-கருவி நோக்கம் அமலாக்கத்தை நிபந்தனையின்றி இயக்குகிறது ( `scopeEnforcement.ts` இல்`shouldForceScopeEnforcement()` ). இது ONLY வைத்திருக்கும் குறுகிய `mcp:connect` பைபாஸ் ஸ்கோப் — வைத்திருக்கும் இடைவெளியை மூடுகிறது `false` `/api/mcp/` LOCAL_ONLY கார்வ்-அவுட் — தவிர வேறு எதையும் அங்கீகரிக்கவில்லை என ஆவணப்படுத்தப்பட்டுள்ளது `OMNIROUTE_MCP_ENFORCE_SCOPES` இல்லையெனில் ஒரு ஆபரேட்டர் remote/non-loopback MCP அணுகலை இயக்கியவுடன் ஒவ்வொரு MCP கருவியையும் செயல்படுத்த முடியும். HTTP மீது ஒரு முழு `manage`/`admin` விசை மற்றும் ஒவ்வொரு stdio/local அழைப்பாளரும், தற்போதுள்ள `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated நடத்தையை மாற்றாமல் வைத்திருங்கள்.

---

## சுற்றுச்சூழல் மாறிகள்

| மாறி                                    | இயல்புநிலை                                        | நோக்கம்                                                                                                                                                                                                                                                                                                                                              |
| :-------------------------------------- | :------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                          | அடிப்படை URL MCP சேவையகம் OmniRoute உள் APIs அழைக்கும் போது பயன்படுத்தும்                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_API_KEY`                     | (காலி)                                            | API விசை உள் API அழைப்புகளுக்கு `Authorization: Bearer` ஆக அனுப்பப்பட்டது                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` ( `"true"` மட்டுமே அதை செயல்படுத்துகிறது) | இயக்கப்பட்டால், விடுபட்ட ஸ்கோப்கள் கருவி அழைப்புகளை மறுத்து, தணிக்கைப் பதிவில் `scope_denied:<reason>` பதிவு செய்யும். முழு `manage`/`admin` ஸ்கோப் — இல்லாத ஒரு விசை அங்கீகாரத் தலைப்பு (`source === "authInfo"`) மூலம் தீர்க்கப்பட்ட `mcp:connect` HTTP/SSE அழைப்பாளருக்கும் local/stdio கொடியைப் பொருட்படுத்தாமல் ALSO கட்டாயப்படுத்தப்படுகிறது — |
| `OMNIROUTE_MCP_SCOPES`                  | (காலி)                                            | காற்புள்ளியால் பிரிக்கப்பட்ட ஸ்கோப்களின் அனுமதிப் பட்டியல் இயல்பாகவே "கிடைக்கிறது" என்று கருதப்படும் (அழைப்பாளர் தனது சொந்த நோக்கங்களை வழங்காதபோது பயன்படுத்தப்படும்)                                                                                                                                                                                |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | ( = ஐ அமைக்கவில்லை)                               | `0/false/off/no` க்கு அமைக்கப்படும் போது, பதிவு நேரத்தில் MCP விளக்க சுருக்கத்தை முடக்குகிறது                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | ( = ஐ அமைக்கவில்லை)                               | மேலே உள்ள அதே நிலைமாற்றத்திற்கான மாற்று மாற்றுப்பெயர்                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                           | உள் நிர்வாகத்திற்கான பட்ஜெட்டை நிறுத்து (உடல்நலம், பின்னடைவு, சேர்க்கைகள், ஒதுக்கீடு, பயன்பாடு)                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                           | வழங்குநரிடம் காத்திருக்கும் ஹாப்ஸிற்கான பட்ஜெட்டை நிறுத்து (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                              |
| `MCP_TOOL_DENY`                         | (வடிப்பானை அமைக்கவில்லை = )                       | காற்புள்ளியால் பிரிக்கப்பட்ட கருவி பெயர்கள் `tools/list` இலிருந்து கைவிடப்படும் (கருவி-கார்டினாலிட்டி குறைப்பு — கீழே பார்க்கவும்)                                                                                                                                                                                                                   |
| `MCP_TOOL_ALLOW`                        | (வடிப்பானை அமைக்கவில்லை = )                       | காற்புள்ளியால் பிரிக்கப்பட்ட கருவிப் பெயர்கள் பிரத்தியேகமாக வைத்திருக்க வேண்டும் (அனுமதி-பட்டியல் பயன்முறை — கீழே காண்க)                                                                                                                                                                                                                             |
| `DATA_DIR`                              | `~/.omniroute`                                    | இதய துடிப்பு கோப்பு `${DATA_DIR}/runtime/mcp-heartbeat.json` க்கு எழுதப்பட்டுள்ளது                                                                                                                                                                                                                                                                   |

---

## விளக்கம் சுருக்கம்

MCP கருவி, உடனடி மற்றும் ஆதாரப் பதிவேடுகள் வாடிக்கையாளர்களுக்கு வெளிப்படும் மெட்டாடேட்டா தடயத்தைக் குறைக்க registration/list நேரத்தில் விளக்கங்களைச் சுருக்கலாம் (எனவே உடனடி சூழல் செலவு). செயல்படுத்தல் `open-sse/mcp-server/descriptionCompressor.ts` இல் வாழ்கிறது மற்றும் `createMcpServer()` இன் உள்ளே `compressMcpRegistryMetadata` வழியாக MCP சேவையகத்தில் இணைக்கப்படுகிறது.

- சுருக்கமானது கேவ்மேன் ரூல்செட் (`getRulesForContext("all", "full")`) ஐப் பயன்படுத்தி பாதுகாக்கப்பட்ட-தடுப்பு பிரித்தெடுத்தல் (குறியீடு ஸ்பான்கள், வேலியிடப்பட்ட தொகுதிகள், முதலியன) மூலம் விளக்க உரையில் இயங்குகிறது, எனவே கட்டமைப்பு உள்ளடக்கம் மாற்றப்படாது.
- `key_value` அமைப்புகளின் அட்டவணையில் உள்ள `compression.mcpDescriptionCompressionEnabled` மதிப்பு வழியாக ஒவ்வொரு வரிசைப்படுத்தலையும் மாற்றவும் (இயல்புநிலை: இயக்கப்பட்டது) UI இல் — வெளிப்படும்** Analytics → MCP விளக்கம் சுருக்கம்** .
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` அல்லது `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` வழியாக செயல்முறை முழுவதும் மாறவும்.
- நிகழ்நேர புள்ளிவிவரங்கள் `analytics.mcpDescriptionCompression` இன் கீழ் `omniroute_compression_status` வழியாக வெளியிடப்படுகின்றன மற்றும் உண்மையான வழங்குநரின் பயன்பாட்டு ரசீதுகளிலிருந்து தெளிவற்ற `source: "mcp_metadata_estimate"` குறியிடப்படுகின்றன.

---

## கருவி கார்டினாலிட்டி குறைப்பு (F4.3)

விளக்க சுருக்கமானது ஒவ்வொரு கருவியின் மெட்டாடேட்டாவையும் சுருக்குகிறது;** கருவி-கார்டினலிட்டி குறைப்பு** _எத்தனை_ கருவிகள் அறிவிக்கப்படுகின்றன என்பதைக் குறைப்பதன் மூலம் ஒரு படி மேலே செல்கிறது. `tools/list` மேனிஃபெஸ்டில் குறைவான கருவிகளை விளம்பரப்படுத்துவது, கருவி அட்டவணைக்கு ("லேயர் 5" சுருக்கம்) வாடிக்கையாளர் மாதிரி செலுத்தும் ஒரு கோரிக்கைக்கான டோக்கன் செலவைக் குறைக்கிறது. செயல்படுத்தல் என்பது `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) இல் உள்ள தூய, நிலையற்ற வடிகட்டியாகும், இது `createMcpServer()` (`open-sse/mcp-server/server.ts`) இல் பதிவு வளையத்தில் இணைக்கப்பட்டுள்ளது.

**தேர்வு, இயல்பாக ஆஃப்.** குறைந்தது இரண்டு சூழல் மாறிகளில் ஒன்றை அமைக்கும் போது மட்டுமே வடிகட்டி இயங்கும்; இரண்டும் அமைக்கப்படாமல், அனைத்து 110 கருவிகளும் மாறாமல் அறிவிக்கப்படுகின்றன.

| மாறி             | பயன்முறை                                                                                                                    |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | `tools/list` இலிருந்து எப்போதும் கைவிடப்படும் — கமாவால் பிரிக்கப்பட்ட கருவிப் பெயர்களை பிளாக்லிஸ்ட் செய்யவும்               |
| `MCP_TOOL_ALLOW` | — காற்புள்ளியால் பிரிக்கப்பட்ட கருவிப் பெயர்களை அனுமதிக்கவும்; இவை மட்டுமே உயிர்வாழ்கின்றன, மற்ற அனைத்தும் கைவிடப்படுகின்றன |

`allow` விட `deny` முன்னுரிமை பெறுகிறது. பெயர்கள் கமாவால் பிரிக்கப்பட்டவை, டிரிம் செய்யப்பட்டவை மற்றும் வெற்று உள்ளீடுகள் புறக்கணிக்கப்படும். எடுத்துக்காட்டுகள்:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**வடிகட்டப்பட்ட கருவிகள் எவ்வாறு அகற்றப்படுகின்றன:** பதிவு எப்போதும் வெற்றி பெறுகிறது; சுயவிவரம் நிராகரிக்கும் ஒரு கருவி MCP SDK கைப்பிடியில் `.disable()` d ஆகும், எனவே அது `tools/list` இல் தோன்றாது ஆனால் வயரிங் அப்படியே இருக்கும் (சுத்தமான enable/disable, மறு பதிவு இல்லை). சுயவிவரப் பாகுபடுத்தி `readMcpToolProfileFromEnv(process.env)` ஆகும், இது இரண்டு varகளும் காலியாக இருக்கும்போது `null` (வடிகட்டுதல் இல்லை) வழங்கும்.

`reduceToolManifest` பின்னால் உள்ள பணக்கார `ToolProfile` வடிவம், ஸ்கோப்-இன்டர்செக்ஷன் ஃபில்டரிங் (`allowScopes`, `read:*` -style வைல்டு கார்டு பொருத்தத்துடன்) மற்றும் ஒரு உறுதியான `maxTools` தொப்பியையும் ஆதரிக்கிறது, ஆனால் அந்த இரண்டு கைப்பிடிகளுக்கும் பதிவு நேரத்தில் முழு மேனிஃபெஸ்ட் தேவை.** இல்லை** இன்று சூழல் மாறிகள் மூலம் வெளிப்படுகிறது (ஒரு `tools/list` -level ஹூக் என்பது கண்காணிக்கப்பட்ட பின்தொடர்தல் ஆகும்). `estimateManifestTokens()` மேனிஃபெஸ்ட் டோக்கன் விலையை குறைப்பதற்கு முன்னும் பின்னும் ஒப்பிடுவதற்கு கிடைக்கிறது.

---

## இயக்கநேர இதய துடிப்பு

stdio போக்குவரத்து ஒவ்வொரு 5 வினாடிகளுக்கும் `${DATA_DIR}/runtime/mcp-heartbeat.json` வரை உயிர்ப்புடன் தொடர்கிறது. டாஷ்போர்டு (`/api/mcp/status`) இந்தக் கோப்பைப் படிக்கும் மேலும் `online` ஐப் பெற PID லைவ்னஸ். HTTP அதற்குப் பதிலாகச் செயலாக்கத்தில் உள்ள `getMcpHttpStatus()` இலிருந்து அறிக்கை நிலையைக் கடத்துகிறது (கோப்பு எழுதுவது இல்லை).

இதயத் துடிப்பு ஸ்னாப்ஷாட்டில் பின்வருவன அடங்கும்:

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

## தணிக்கை பதிவு

ஒவ்வொரு கருவி அழைப்பும் SQLite `mcp_tool_audit` அட்டவணையில் `open-sse/mcp-server/audit.ts` மூலம் உள்நுழைந்துள்ளது:

- கருவியின் பெயர், வாதங்கள் (hashed/truncated ஒவ்வொரு கருவிக்கும் `auditLevel`), முடிவு
- கால அளவு ms, success/failure கொடி, பிழை செய்தி (பொருந்தும் போது)
- API கீ ஹாஷ், நேர முத்திரை
- ஸ்கோப் மறுப்புகள் விடுபட்ட ஸ்கோப் பட்டியலுடன் `scope_denied:<reason>` ஆக பதிவு செய்யப்பட்டுள்ளன

சமீபத்திய அழைப்புகளை ஆய்வு செய்ய டாஷ்போர்டு அல்லது `/api/mcp/audit` மற்றும் `/api/mcp/audit/stats` REST இறுதிப்புள்ளிகளைப் பயன்படுத்தவும்.

---

## கோப்புகள்

| கோப்பு                                                                   | நோக்கம்                                                                  |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP சர்வர் தொழிற்சாலை, stdio நுழைவு புள்ளி, நோக்கம் கொண்ட கருவி பதிவுகள் |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + ஸ்ட்ரீமபிள் HTTP போக்குவரத்து (அமர்வு மேலாண்மை)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | கருவி நோக்கம் மதிப்பீடு மற்றும் அழைப்பாளர் தீர்மானம்                     |
| `open-sse/mcp-server/audit.ts`                                           | கருவி அழைப்பு தணிக்கை பதிவு (`mcp_tool_audit`)                           |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio இதய துடிப்பு எழுத்தாளர் (`mcp-heartbeat.json`)                     |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | கருவி / உடனடி / ஆதாரப் பதிவேடுகளுக்கான விளக்க சுருக்கம்                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod ஸ்கீமாஸ் + டூல் ரெஜிஸ்ட்ரி (`MCP_TOOLS`, 45 உள்ளீடுகள்)              |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | கட்டம் 2 + கேச் + 1ப்ராக்ஸி கருவி ஹேண்ட்லர்கள்                           |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | சுருக்க கருவி கையாளுபவர்கள்                                              |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | நினைவக கருவி வரையறைகள் (3 கருவிகள்)                                      |
| `open-sse/mcp-server/tools/skillTools.ts`                                | திறன் கருவி வரையறைகள் (4 கருவிகள்)                                       |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion சூழல் மூல கருவி வரையறைகள் (6 கருவிகள்)                            |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | கேமிஃபிகேஷன் கருவி வரையறைகள் (8 கருவிகள்)                                |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | செருகுநிரல் பதிவு மற்றும் மேலாண்மை கருவிகள் (8 கருவிகள்)                 |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` இறுதிப்புள்ளி                                          |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` இறுதிப்புள்ளி                                           |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE போக்குவரத்து பாதை                                     |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` ஸ்ட்ரீமபிள் HTTP போக்குவரத்து பாதை                     |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` தணிக்கை பதிவு வினவல்                                    |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` ஒருங்கிணைந்த தணிக்கை அளவீடுகள்                    |
| `src/lib/notion/api.ts`                                                  | Notion REST API கிளையன்ட் (மீண்டும் முயற்சி, காலக்கெடு, பிழை வகைப்பாடு)  |
| `src/lib/db/notion.ts`                                                   | Notion டோக்கன் நிலைத்தன்மை (`key_value` அட்டவணை)                         |
| `src/app/api/settings/notion/route.ts`                                   | Notion அமைப்புகள் API (GET/POST/DELETE)                                  |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion டோக்கன் மேலாண்மை UI                                               |
| `tests/unit/notion-api.test.ts`                                          | Notion API கிளையன்ட் சோதனைகள் (7)                                        |
| `tests/unit/notion-tools.test.ts`                                        | Notion கருவிகள் ஸ்கோப் அமலாக்க சோதனைகள் (10)                             |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB தொகுதி சோதனைகள் (3)                                            |
