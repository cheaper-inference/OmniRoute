# Reasoning Replay Cache (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Isi mmalite eziokwu:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Emelitere ikpeazụ:** 2026-06-28 — v3.8.40

OmniRoute na-ejide `reasoning_content` nke onye enyemaka nke ụdịdị na-eji ọnọdụ iche echiche mepụtara, ma na-akpọghachi ya n'ụzọ a na-adịghị ahụ anya na arịrịọ nwere ọtụtụ ntụgharị mgbe onye na-eweta ọrụ upstream chọrọ ya. Nke a na-ewepụ njehie HTTP 400 nke ndị na-eweta ọrụ nwere iwu siri ike na-ebute mgbe akụkọ mkparịta ụka nke onye ahịa enweghị ntụgharị echiche gara aga.

## Ihe Mere Nke A Ji Dị

Ụfọdụ ndị na-eweta ọrụ nwere ọnọdụ iche echiche na-ajụ ntụgharị na-esote ma ọ bụrụ na **ozi onye enyemaka gara aga etinyeghị `reasoning_content` izizi ahụ**. Upstream na-eweghachi 400 na ozi dịka:

```
Param ezighi ezi: A ga-ezigaghachi reasoning_content dị na ọnọdụ iche echiche na API.
```

Mana ndị ahịa a na-ahụkarị (Cursor, Cline, Roo Code, OpenAI SDK) na-ewepụ `reasoning_content` n'akụkọ ha na-akpọghachi. OmniRoute na-eweghachi ya site na cache dị n'akụkụ sava ka arịrịọ upstream na-ahụ wee bụrụ nke kwekọrọ. Issue #1628 webatara nchekwa ngwakọ memory/SQLite ka cache wee dịgide mgbe usoro malitegharịrị.

## Nhazi

```
Ntughari N (assistant na-emepụta):
  → nzaghachi nwere reasoning_content + tool_calls
  → ọ bụrụ na requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      na-ede (ebe nchekwa + DB), jiri tool_call.id ọ bụla dịka igodo
  → ziga nzaghachi ahụ n'ihu nye onye ahịa (onye nwere ike idowe reasoning ma ọ bụ ghara idowe ya)

Ntughari N+1 (onye ahịa na-eziga ozi mgbakwunye):
  → onye ntụgharị na-achọpụta: requiresReasoningReplay(provider, model) === true
  → maka ozi assistant ọ bụla nwere tool_calls ma na-enweghị reasoning_content:
      lookupReasoning(toolCalls[0].id) → ebe nchekwa → DB
      achọtara  → msg.reasoning_content = cached; recordReplay()
      ahụghị ya → msg.reasoning_content = "" (usoro ndabere ochie maka DeepSeek ochie)
  → usoro dị n'elu na-ahụ akụkọ kwekọrọ ekwekọ → enweghị 400
```

Njide ahụ na-eme na `open-sse/handlers/chatCore.ts` (n'ebe abụọ ahụ a na-akpọ `cacheReasoningFromAssistantMessage`). Mweghachi na-eme na `open-sse/translator/index.ts` mgbe mmanye schema gasịrị, mana tupu iziga ya.

A na-eji usoro ọzọ emepụta igodo maka ntughari assistant nkịtị (nke na-enweghị oku ngwaọrụ): `buildAssistantMessageCacheKey()` na-achịkọta mpaghara nnọkọ yana transcript e haziri ka ọ bụrụ usoro OpenAI ruo na ntughari ahụ, n'ihi na DeepSeek chọrọ reasoning nke ntughari _ọ bụla_ gara aga ozugbo `tools` dị. Maka ebe a na-eziga arịrịọ Responses-API (dịka ọmụmaatụ `opencode-go/deepseek-v4-flash`, nke a na-ebuga na `/responses`), ahụ arịrịọ dị n'elu na-ebu `input`, ọ bụghị `messages`, ya mere `translateRequest()` (`open-sse/translator/index.ts`) na-akọ transcript etiti ọ chịkọtara site na nhọrọ callback, ebe ebe njide ndị ahụ na-achịkọtakwa otu transcript ahụ. Usoro mweghachi Responses na-arụ ọrụ na pivot OpenAI maka usoro isi mmalite ọ bụla, ya mere a na-emegharịkwa nke ndị ahịa Anthropic Messages (Claude → OpenAI → Responses).

## Nchekwa — Ngwakọ Memory + SQLite

Ụzọ a na-ejikarị na-eji `Map` dị na ebe nchekwa (LRU-dabere-na-mmebe), nke tebụl SQLite na-akwado maka mgbake mgbe usoro dara na ka dashboard nwee ike igosi ya.

| Ogo    | Mmejuputa                                      | Ebumnuche                                              |
| ------ | ---------------------------------------------- | ------------------------------------------------------ |
| Memory | `Map` na `open-sse/services/reasoningCache.ts` | Nchọ ngwa ngwa, na-ewepụ nke kacha ochie na 200        |
| DB     | tebụl `reasoning_cache` (`src/lib/db/`)        | Na-adịgide mgbe usoro malitegharịrị, na-enye ọnụ ọgụgụ |

Edemede na-aga na ha abụọ. Ọgụgụ na-ebu ụzọ chọọ na memory, ma ọ bụrụ na ahụghị ya, ọ na-aga na DB (a na-akwalitekwa ihe achọtara na DB laghachi na memory). Ọdịda DB anaghị akwụsị usoro — cache dị na memory na-aga n'ihu ijere ụzọ a na-ejikarị ozi.

**Ntọala ndabara:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Ọnụọgụ ntinye memory kachasị: `200` (`MAX_MEMORY_ENTRIES`)
- Mwepụ: `createdAt` kacha ochie buru ụzọ

## Schema Ebe Nchekwa Data

Mbugharị: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indexes: `expires_at`, `provider`, `model`, `created_at`. A na-echekwa `expires_at` dịka sekọnd Unix epoch; oyi akwa SELECT na-eji `EXPIRES_AT_EPOCH_SQL` eme ka ụkpụrụ ederede ochie kwekọọ n'ụdị a na-eji ugbu a.

## Nchọpụta Provider / Model

A na-agbanye replay mgbe `requiresReasoningReplay(provider, model)` weghachiri `true`. Ọrụ ahụ na-enyocha ndepụta abụọ dị na `open-sse/services/reasoningCache.ts`.

**ID ndị Provider (ndakọrịta kpọmkwem, na-elegharaghị nnukwu/mkpụrụedemede anya):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Ụkpụrụ regex nke Model (na-elegharaghị nnukwu/mkpụrụedemede anya):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` na `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, na suffix `-free` nke bụ nhọrọ)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Ịgbakwunye provider/model ọhụrụ siri ike pụtara ịtinye ya na otu n'ime ndepụta ndị a ma dee unit test nke na-akwado ntinye replay. Nkọwa PR kwesịrị ịkpọpụta kpọmkwem upstream 400 string nke kpaliri mgbanwe ahụ.

## REST API

Cache ahụ na-ekpughe endpoint abụọ n'okpuru `src/app/api/cache/reasoning/route.ts`. Ha abụọ chọrọ njirimara njikwa (`isAuthenticated` sitere na `@/shared/utils/apiAuth`).

| Method | Endpoint                                                  | Nkọwa                                                       |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Stats + ndenye e kewara n'ibe                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Ndepụta a nyochara (`limit` ka a kpaara na `[1, 200]`)      |
| DELETE | `/api/cache/reasoning`                                    | Hichapụ ihe niile (memory + DB) ma tọgharịa ọnụọgụ hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Hichapụ naanị ndenye nke otu provider                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Hichapụ otu ndenye                                          |

**Ọdịdị nzaghachi GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Ndetu Banyere Ọrụ

- **Nhichapụ:** `cleanupReasoningCache()` na-ekpochapụ ndenye memory ndị kubiela ma na-eme `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Ndị worker na-eme health-check na-akpọ nke a kwa oge.
- **Mweghachi mgbe crash gasịrị:** Mgbe e mere restart, memory na-adị efu mana DB ka na-ejide ndenye ndị na-ekubibeghị. Lookup mbụ maka `tool_call_id` enyere bụ DB hit; lookup ndị na-esote bụ memory hit.
- **Enweghị reasoning, enweghị cache:** `cacheReasoningFromAssistantMessage` na-eweghachi `0` mgbe ozi assistant enweghị field `reasoning_content` / `reasoning`, ya mere nzaghachi ndị na-adịghị eche echiche anaghị efu ihe ọ bụla.
- **A na-achịkwa ide ihe kwa:** call site abụọ dị na `chatCore.ts` (non-streaming na streaming) na-akpọ `cacheReasoningFromAssistantMessage()` naanị mgbe `requiresReasoningReplay(provider, model)` bụ `true` — otu predicate ahụ akụkụ ọgụgụ na-enyocha. Install ndị na-adịghị eji replay provider eme ihe anaghịzi akwụ ụgwọ maka ide ihe, mmelite index, na try/catch na nzaghachi ọ bụla nwere reasoning.
- **Provider ndị na-adịghị siri ike:** Mgbe `requiresReasoningReplay` bụ `false` ma target format bụ OpenAI, translator ahụ **na-ewepụ** field `reasoning_content` ọ bụla na ozi ndị na-apụ apụ — OpenAI Chat Completions anaghị anabata ya.

## Nwe opaque reasoning nke Muse

Muse (`muse-code`) na-eweghachi opaque reasoning ejikọtara na onye na-akpọ (`encrypted_content`). Ime replay ya n'akaụntụ ọzọ ma ọ bụ na nkọwa nbanye e wepụtara ọhụrụ na-ada na upstream, ya mere native OAuth request na-eji ownership n'ogo session kama ntụgharị kwa request (`src/sse/services/museSessionOwnership.ts`, a na-amanye ya na `src/sse/handlers/chat.ts`). Njikọ API-key a họọrọ kpọmkwem na configuration nwere API key naanị na-edobe routing ha dịbu na-enweghị ownership mode a.

- Nye session ID kwụsiri ike na turn ọ bụla: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, ma ọ bụ `x-codex-session-id`; ma ọ bụ jiri `prompt_cache_key`, `session_id`, `conversation_id`, ma ọ bụ `metadata.session_id` na body (n'usoro mkpa ahụ). ID furu efu ma ọ bụ oghere na-eweghachi 400 mgbe native OAuth account abụọ ma ọ bụ karịa na-arụ ọrụ; ọ bụrụ na naanị otu OAuth account dị, ọ dịghị ọzọ a ga-atụgharị gaa na ya, ya mere request ahụ na-edobe routing na-enweghị pin. Scope na-agụnye OmniRoute API-key ID nke onye na-akpọ.
- Session ọhụrụ nwere onwe ha na-eme round-robin n'etiti native OAuth account na-arụ ọrụ nke API-key connection policy kwere, n'usoro connection ID. Round-robin na-awụfe akaụntụ nọ na connection cooldown, nwere terminal status (`banned`, `expired`, `credits_exhausted`), ma ọ bụ nwere model-lock maka model achọrọ; ọdịda upstream Muse na-edekọ cooldown na breaker state dịka provider ndị ọzọ. Njikọ a manyere kpọmkwem na-awụfe round-robin maka session ọhụrụ, mana ọ gaghị edochi onye nwe ya mgbe ọ nyerela azịza gara nke ọma.
- Ruo mgbe onye nwe ya nyere azịza gara nke ọma, session nke onye nwe ya adịghịzi a na-enyeghachi akaụntụ dị mma. Mgbe azịza mbụ gara nke ọma gasịrị, session na-anọgide na onye nwe ahụ ruo mgbe ọ nọrọ n'efu ụbọchị 30 (`MUSE_SESSION_IDLE_TTL_MS`).
- Continuation na tool-result turn ọ bụla na-anọgide na onye nwe session: connection, account identity na generation nke inference credential, a na-enyocha ha ọzọ tupu upstream attempt, gụnyere credential-refresh retry. A ga-ebu ụzọ dekọọ Responses call ID/item reference na Chat Completions tool-call ID maka session na generation ahụ.
- SQLite `key_value` record na namespace `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) na-echekwa ownership na rotation cursor n'agbanyeghị restart. Claim ọ bụla na azịza e nyere na-emelite akara ọrụ session; a na-ehichapụ session nọrọ n'efu karịa `MUSE_SESSION_IDLE_TTL_MS` (owner pin, served flag na opaque/reference hash e dekọrọ), ọ bụghị karịa otu ugboro n'ime nkeji 10 na batch nwere oke, ka replay nke akụkọ ya e mesịrị jụ maka nchekwa dịka onye nwe a na-amaghị. Record nwere connection ID na hash nke account identity, credential, opaque content na continuation reference, ọ bụghị ihe nzuzo ma ọ bụ akụkọ mkparịta ụka. Client ga-edobe ma zipụ akụkọ ha dum na opaque reasoning ha.
- Opaque reasoning a na-amaghị ma ọ bụ nke ọzọ, onye nwe na-adịghị, akaụntụ onye nwe a na-apụghị iji, ma ọ bụ mgbanwe generation mgbe akụkọ edekọrịrị, na-ajụ maka nchekwa na 4xx/503 doro anya; enweghị failover nzuzo gafee akaụntụ, a naghịkwa atụfu reasoning.
- A na-anabata key e wepụtara ọhụrụ maka otu akaụntụ naanị mgbe session edekọbeghị akụkọ a pụrụ replay; session nwere ndekọ na-ajụ maka nchekwa ruo mgbe a malitere ọhụrụ.
- Azịza upstream efu (`upstream_empty_response` / `empty_response`, ọ dịghị ihe e zigara onye na-akpọ) a na-anwa ya ọzọ n'otu onye nwe ahụ, ma ọ bụghị karịa ugboro abụọ, mgbe 0.5 s gasịrị, mesịa 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Ọ bụrụ na attempt niile bụ efu, a na-eweghachi 502 mbụ na-enweghị cooldown ma ọ bụ breaker marking, ka azịza na-adịghị akwụsi ike ghara imechi onye nwe ya.
- Request `muse-code` niile na-awụfe semantic-cache read na write, gụnyere streaming write, ka opaque output echekwara na cache ghara inweta onye nwe session ọzọ.

Nchedo regression: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, na `tests/unit/chatcore-semantic-cache.test.ts`.

## Hụkwa

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ndị nkwụsị sekit, oge izu ike, mkpọchi ụdị
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — ịchọpụta njehie 400 sitere na ọrụ ndị dị n'elu
- Koodu mmalite: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Mbugharị: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Ụzọ API: `src/app/api/cache/reasoning/route.ts`
- Nsogbu mbụ: #1628
