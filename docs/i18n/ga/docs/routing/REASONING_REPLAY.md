# Reasoning Replay Cache (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Foinse na fírinne:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Nuashonraithe go deireanach:** 2026-06-28 — v3.8.40

Gabhann OmniRoute `reasoning_content` an chúntóra a tháirgeann samhlacha mód smaointeoireachta agus athsheinneann sé go trédhearcach é ar iarratais ilseala nuair a éilíonn an soláthraí réamhtheachtach é. Cuireann sé seo deireadh leis na hearráidí HTTP 400 a ghineann soláthraithe dochta nuair atá réasúnaíocht na seal roimhe sin ar iarraidh ó stair chomhrá an chliaint.

## Cén Fáth a bhfuil Seo Ann

Diúltaíonn roinnt soláthraithe mód smaointeoireachta do sheal leantach mura bhfuil an **`reasoning_content` bunaidh san áireamh i dteachtaireacht an chúntóra roimhe sin**. Filleann an córas réamhtheachtach 400 le teachtaireachtaí amhail:

```
Paraiméadar Mícheart: Ní mór an reasoning_content sa mhód smaointeoireachta a chur ar ais chuig an API.
```

Ach baineann gnáthchliaint (Cursor, Cline, Roo Code, OpenAI SDK) `reasoning_content` den stair a athsheinneann siad. Aischuireann OmniRoute é ó thaisce ar thaobh an fhreastalaí ionas go mbeidh an t-iarratas a fheiceann an córas réamhtheachtach comhsheasmhach. Tugadh isteach mar chuid d'eagrán #1628 an mharthanacht hibrideach cuimhne/SQLite ionas go mairfidh an taisce i ndiaidh atosuithe próisis.

## Ailtireacht

```
Seal N (gineann an cúntóir):
  → tá reasoning_content + tool_calls sa fhreagra
  → má tá requiresReasoningReplay(provider, model) i bhfeidhm: cacheReasoningFromAssistantMessage()
      scríobhann sé (cuimhne + DB), agus gach tool_call.id mar eochair
  → cuirtear an freagra ar aghaidh chuig an gcliant (agus d’fhéadfadh sé an réasúnú a choinneáil nó gan é a choinneáil)

Seal N+1 (seolann an cliant teachtaireacht leantach):
  → braitheann an t-aistritheoir: requiresReasoningReplay(provider, model) === true
  → do gach teachtaireacht ón gcúntóir ina bhfuil tool_calls ach nach bhfuil reasoning_content:
      lookupReasoning(toolCalls[0].id) → cuimhne → DB
      aimsiú  → msg.reasoning_content = cached; recordReplay()
      teip    → msg.reasoning_content = "" (cúltaca oidhreachta do leaganacha níos sine de DeepSeek)
  → feiceann an córas réamhtheachtach stair chomhsheasmhach → gan 400
```

Déantar an ghabháil in `open-sse/handlers/chatCore.ts` (in dhá áit, ag an dá shuíomh glao ar `cacheReasoningFromAssistantMessage`). Déantar an t-athsheinm in `open-sse/translator/index.ts` tar éis comhéigean na scéime ach roimh an seoladh.

Úsáidtear eochracha éagsúla do shealanna simplí ón gcúntóir (gan ghlao uirlise): déanann `buildAssistantMessageCacheKey()` achoimre den scóip seisiúin mar aon leis an tras-scríbhinn normalaithe i bhformáid OpenAI suas go dtí an seal sin, mar éilíonn DeepSeek réasúnú _gach_ seala roimhe sin a luaithe a bhíonn `tools` ann. I gcás spriocanna Responses-API (mar shampla `opencode-go/deepseek-v4-flash`, a sheoltar chuig `/responses`), iompraíonn an corp réamhtheachtach `input`, seachas `messages`, agus mar sin tuairiscíonn `translateRequest()` (`open-sse/translator/index.ts`) an tras-scríbhinn mhaighdeogach a ndearna sé achoimre di trí rogha aisghlao, agus déanann na suíomhanna gabhála achoimre den tras-scríbhinn chéanna. Ritheann pas athsheinm Responses ar mhaighdeog OpenAI i gcás gach formáide foinse, agus mar sin déantar athsheinm freisin do chliaint Anthropic Messages (Claude → OpenAI → Responses).

## Stóráil — Cuimhne Hibrideach + SQLite

Úsáideann an chonair the in-chuimhne `Map` (LRU de réir cruthaithe), agus tacaíonn tábla SQLite léi chun téarnamh ó chliseadh agus infheictheacht sa deais a sholáthar.

| Sraith  | Cur Chun Feidhme                               | Cuspóir                                                  |
| ------- | ---------------------------------------------- | -------------------------------------------------------- |
| Cuimhne | `Map` in `open-sse/services/reasoningCache.ts` | Cuardaigh thapa, díbríonn sé an ceann is sine ag 200     |
| DB      | tábla `reasoning_cache` (`src/lib/db/`)        | Maireann sé thar atosuithe, cumhachtaíonn sé staitisticí |

Téann scríbhinní chuig an dá cheann. Seiceálann léamha an chuimhne ar dtús, agus ansin téann siad siar chuig DB (cuirtear torthaí ó DB chun cinn ar ais isteach sa chuimhne). Níl teipeanna DB marfach — leanann an taisce in-chuimhne de bheith ag freastal ar an gconair the.

**Réamhshocruithe:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Uasmhéid iontrálacha cuimhne: `200` (`MAX_MEMORY_ENTRIES`)
- Díbirt: an `createdAt` is sine ar dtús

## Scéimre an Bhunachair Sonraí

Imirce: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Innéacsanna: `expires_at`, `provider`, `model`, `created_at`. Stóráiltear `expires_at` mar shoicindí Aga Unix; normalaíonn an tsraith SELECT luachanna téacs oidhreachta trí `EXPIRES_AT_EPOCH_SQL`.

## Brath Soláthraí / Samhla

Cumasaítear athsheinm nuair a fhilleann `requiresReasoningReplay(provider, model)` `true`. Seiceálann an fheidhm dhá liosta in `open-sse/services/reasoningCache.ts`.

**Aitheantais soláthraí (meaitseáil bheacht, gan beann ar chás):**

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

**Patrúin slonn rialta samhla (gan beann ar chás):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` agus `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, iarmhír roghnach `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Chun soláthraí/samhail dhocht nua a chur leis, ní mór cur le ceann de na liostaí seo agus tástáil aonaid a scríobh a dhearbhaíonn instealladh athsheinnte. Ba cheart don tuairisc PR an teaghrán 400 cruinn réamhtheachtach ba chúis leis an athrú a lua.

## REST API

Nochtann an taisce dhá chríochphointe faoi `src/app/api/cache/reasoning/route.ts`. Éilíonn an dá cheann fíordheimhniú bainistíochta (`isAuthenticated` ó `@/shared/utils/apiAuth`).

| Modh   | Críochphointe                                             | Cur síos                                                         |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Staitisticí + iontrálacha uimhrithe ina leathanaigh              |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Liostú scagtha (`limit` clampáilte go `[1, 200]`)                |
| DELETE | `/api/cache/reasoning`                                    | Glan gach rud (cuimhne + DB) agus athshocraigh áirimh amas/teipe |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Glan iontrálacha le haghaidh soláthraí amháin                    |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Scrios iontráil aonair                                           |

**Cruth freagartha GET:**

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

## Nótaí Oibríochtúla

- **Glanadh:** Glanann `cleanupReasoningCache()` iontrálacha cuimhne atá imithe in éag agus ritheann sé `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Glaonn próisis oibre seiceála sláinte air seo go tréimhsiúil.
- **Athshlánú tar éis tuairteála:** Tar éis atosaithe, bíonn an chuimhne folamh ach coinníonn an DB iontrálacha nár imigh in éag. Is amas DB é an chéad chuardach le haghaidh `tool_call_id` ar leith; is amais chuimhne iad cuardaigh ina dhiaidh sin.
- **Gan réasúnaíocht, gan taisce:** Filleann `cacheReasoningFromAssistantMessage` `0` nuair nach bhfuil réimse `reasoning_content` / `reasoning` i dteachtaireacht an chúntóra, mar sin ní bhíonn aon chostas ag baint le freagraí nach mbaineann smaointeoireacht leo.
- **Tá an scríobh geataithe freisin:** ní ghlaonn an dá ionad glao in `chatCore.ts` (neamhshruthaithe agus sruthaithe) ar `cacheReasoningFromAssistantMessage()` ach amháin nuair atá `requiresReasoningReplay(provider, model)` cothrom le `true` — an tuar céanna a sheiceálann taobh na léitheoireachta. Ní íocann suiteálacha nach mbaineann riamh le soláthraí athsheinnte as an scríobh, nuashonrú na hinnéacsála, ná an try/catch ar gach freagra ina bhfuil réasúnaíocht.
- **Soláthraithe neamhdhochta:** Nuair atá `requiresReasoningReplay` cothrom le `false` agus OpenAI mar spriocfhormáid, **baineann** an t-aistritheoir aon réimse `reasoning_content` de theachtaireachtaí amach — ní ghlacann OpenAI Chat Completions leis.

## Úinéireacht ar réasúnaíocht theimhneach Muse

Tugann Muse (`muse-code`) réasúnaíocht theimhneach atá ceangailte leis an nglaoiteoir ar ais (`encrypted_content`). Teipeann ar a hathsheinm faoi chuntas eile nó dintiúr atheisithe sa réamhtheachtaí, mar sin úsáideann iarratais dhúchasacha OAuth úinéireacht ar leibhéal an tseisiúin in ionad rothlaithe in aghaidh an iarratais (`src/sse/services/museSessionOwnership.ts`, curtha i bhfeidhm in `src/sse/handlers/chat.ts`). Coinníonn naisc eochrach API a roghnaíodh go follasach agus cumraíochtaí eochrach API amháin a ródú reatha gan an modh úinéireachta seo.

- Tabhair ID seisiúin cobhsaí i ngach seal: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, nó `x-codex-session-id`; mar rogha eile úsáid `prompt_cache_key`, `session_id`, `conversation_id`, nó `metadata.session_id` sa chorp (san ord tosaíochta sin). Tugann IDanna ar iarraidh nó folamh 400 ar ais nuair atá dhá chuntas dúchasacha OAuth nó níos mó gníomhach; le cuntas OAuth amháin níl cuntas eile le rothlú chuige, mar sin coinníonn a leithéid d'iarratas ródú neamhphionnáilte. Áirítear ID eochrach API OmniRoute an ghlaoiteora sa scóip.
- Roinntear seisiúin úra neamhspleácha ar a seal idir cuntais dhúchasacha OAuth ghníomhacha a cheadaíonn beartas naisc na heochrach API, in ord ID naisc. Scipeálann an rothlú cuntais atá i bhfuarú naisc, a bhfuil stádas críochnaitheach acu (`banned`, `expired`, `credits_exhausted`), nó atá glasáilte don tsamhail iarrtha; taifeadann teipeanna réamhtheachtacha Muse staid fuaraithe agus bhristeora mar a dhéanann soláthraithe eile. Seachnaíonn nasc a cuireadh i bhfeidhm go follasach an rothlú do sheisiún nua ach ní féidir leis úinéir a shárú tar éis dó freagra rathúil a sheirbheáil.
- Go dtí go seirbheálann an t-úinéir freagra rathúil, athéilítear seisiún ar chuntas folláin má tá a úinéir éirithe neamh-inúsáidte. Tar éis an chéad fhreagra rathúil, fanann an seisiún pionnáilte don úinéir sin go dtí go bhfuil sé díomhaoin ar feadh 30 lá (`MUSE_SESSION_IDLE_TTL_MS`).
- Fanann gach leanúint agus seal toraidh uirlise pionnáilte d'úinéir an tseisiúin: nasc, aitheantas cuntais agus glúin dintiúr tátail, a sheiceáiltear arís roimh iarrachtaí réamhtheachtacha, lena n-áirítear atrialacha athnuachana dintiúr. Caithfidh IDanna glaonna/tagairtí míreanna Responses agus IDanna glaonna uirlisí Chat Completions a bheith taifeadta don seisiún agus don ghlúin sin.
- Caomhnaíonn taifid SQLite `key_value` san ainmspás `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) úinéireacht agus cúrsóir rothlaithe thar atosuithe. Athnuann gach éileamh agus freagra seirbheáilte stampa gníomhaíochta an tseisiúin; baintear seisiún atá díomhaoin níos faide ná `MUSE_SESSION_IDLE_TTL_MS` (pionna úinéara, bratach freagartha seirbheáilte agus haiseanna teimhneacha/tagartha taifeadta), uair amháin ar a mhéad gach 10 nóiméad agus i mbaisceanna teoranta, ionas go ndiúltaítear go sábháilte d'athsheinm níos déanaí dá stair mar úinéir anaithnid. Tá IDanna naisc agus haiseanna aitheantais cuntais, dintiúr, inneachair theimhnigh agus tagairtí leanúna sna taifid, ní rúin ná stair chomhrá. Caithfidh cliaint a stair iomlán agus a réasúnaíocht theimhneach a choinneáil agus a sheoladh.
- Diúltaítear go sábháilte do réasúnaíocht theimhneach anaithnid nó choimhthíoch, úinéir ar iarraidh, cuntas úinéara nach bhfuil ar fáil, nó athrú glúine le stair taifeadta, le 4xx/503 follasach — ní dhéantar teipaistriú ciúin idir cuntais ná ní chaitear réasúnaíocht amach choíche.
- Ní ghlactar le heochair atheisithe den chuntas céanna ach nuair nach bhfuil aon stair in-athsheinnte taifeadta ag an seisiún; leanann seisiúin le stair taifeadta ag diúltú go sábháilte go dtí go dtosaítear as an nua.
- Déantar athiarracht ar fhreagra réamhtheachtach folamh (`upstream_empty_response` / `empty_response`, gan rud ar bith a bheith astaithe don ghlaoiteoir) faoi dhó ar a mhéad leis an úinéir céanna, tar éis 0.5 s agus ansin 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Má tá gach iarracht folamh, tugtar an 502 bunaidh ar ais gan marcáil fuaraithe ná bhristeora, mar sin ní ghlasálann freagra éagobhsaí an t-úinéir amach choíche.
- Seachnaíonn gach iarratas `muse-code` léamha agus scríbhinní taisce séimeantaí, lena n-áirítear scríbhinní sruthaithe, ionas nach féidir le haschur teimhneach taiscthe úinéir seisiúin eile a fháil.

Cosaintí aischéimnithe: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, agus `tests/unit/chatcore-semantic-cache.test.ts`.

## Féach Freisin

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — scoradáin chiorcaid, tréimhsí fuaraithe, frithdhúnadh samhlacha
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 400í réamhtheachtacha a dhiagnóisiú
- Foinse: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Imirce: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Bealach API: `src/app/api/cache/reasoning/route.ts`
- Buncheist: #1628
