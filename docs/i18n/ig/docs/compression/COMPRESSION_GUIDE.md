# 🗜️ Prompt Compression Guide — OmniRoute (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Chekwa 15-95% nke context ndị tozuru etozu na-akpaghị aka. Maka nchịkọta ngwa ngwa, lee [ngalaba README Compression](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Nchịkọta

OmniRoute na-emejuputa pipeline prompt compression nwere modulu nke na-arụ ọrụ **tupu oge eruo** tupu arịrịọ eruo ndị provider dị n'elu. Nke a pụtara na nchekwa token gị na-eme n'ụzọ a na-adịghị ahụ anya — ọ dịghị mgbanwe achọrọ na workflow gị.

```
Arịrịọ Client
  → Onye Nhọrọ Usoro Compression
    → Enwere combo override? → Jiri ntọala combo
    → Eruru auto-trigger threshold? → Jiri auto mode
    → Enwere default mode? → Jiri ntọala zuru ụwa ọnụ
    → Off? → Mafere compression
  → Compression Mode Ahọpụtara
    → Off: Enweghị compression
    → Lite: Nhicha whitespace/formatting dị nchebe (~15%)
    → Standard: Mwepụ okwu mgbakwunye n'ụdị Caveman (~30%)
    → Aggressive: Ime ka history kaa nká + nchịkọta (~50%)
    → Ultra: Heuristic pruning + ime ka code-block dị gịrịgịrị (~75%)
    → RTK: Nzacha terminal/tool-output na-aghọta command (oke upstream 60-90%)
    → Stacked: Pipeline ọtụtụ engine ahaziri n'usoro, na-abụkarị RTK sochiri Caveman (oke ndị tozuru etozu 78-95%)
  → Arịrịọ Emechiri → Provider
```

---

## Compression Modes

### Off

A naghị etinye compression ọ bụla. Ozi niile na-agafe na-agbanweghị.

### Lite Mode (~15% nchekwa, <1ms latency)

Mode kacha dị nchebe — enweghị mgbanwe semantic ọ bụla, naanị nhicha formatting:

| Usoro                    | Nkọwa                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `collapseWhitespace`     | Jikọta ahịrị efu ndị na-esochi ibe ha na oghere dị na njedebe |
| `dedupSystemPrompt`      | Wepụ system message ndị e megharịrị                           |
| `compressToolResults`    | Mee ka output tool/function ndị toro ogologo dị mkpụmkpụ      |
| `removeRedundantContent` | Wepụ ntuziaka ndị e megharịrị                                 |
| `replaceImageUrls`       | Mee ka URI data onyonyo base64 dị mkpụmkpụ                    |

**Kachasị mma maka:** Ojiji na-arụ ọrụ mgbe niile, workflow ebe nchekwa dị oke mkpa.

### Standard Mode (~30% nchekwa)

[Caveman](https://github.com/JuliusBrussee/caveman) kpaliri ya — ọ na-ewepụ okwu mgbakwunye na ahịrịokwu toro ogologo ma na-echekwa ihe ha pụtara:

- Na-ewepụ okwu mgbakwunye ("biko", "echere m", "n'ụzọ bụ isi", "n'ezie")
- Na-eme ka ahịrịokwu toro ogologo dị mkpụmkpụ ("iji mee" → "ime", "n'ihi nke a" → "n'ihi na")
- Na-ewepụ okwu nkwanye ùgwù na-egosi enweghị nkwenye ("Ọ ga-ewute gị...", "Ọ bụrụ na ị nwere ike...")
- Iwu regex karịrị 30 a haziri maka coding prompt

**Kachasị mma maka:** Workflow coding kwa ụbọchị, otu ndị na-elebara ọnụ ahịa anya.

### Aggressive Mode (~50% nchekwa)

Njikwa history nwere ọgụgụ isi maka session ndị toro ogologo:

- **Ịka Nká nke Message** — a na-eme ka message ndị ochie na-adịwanye mkpụmkpụ nwayọọ nwayọọ
- **Compression nke Tool Result** — a na-ebipụ ma ọ bụ na-ewepụ akụkụ output tool ndị toro ogologo (ahịrị mbụ/ikpeazụ,
  nzacha ahịrị dabara adaba, ime ka JSON key dị mkpụmkpụ)
- **Ihe Nchekwa Structural Integrity** — na-eme ka ụzọ abụọ `tool_use` + `tool_result` nọgide kwekọọ
- **Ịma Oke Context Window** — na-asọpụrụ oke token nke model ọ bụla

**Kachasị mma maka:** Session debugging ogologo oge, codebase buru ibu.

### Ultra Mode (~75% nchekwa)

Compression kachasị elu maka ọnọdụ ebe token dị oke mkpa:

- **Heuristic Pruning** — pruning token nke prose dabere na score
- **Nchekwa Structure** — a na-akara fenced code block, inline code, URL na identifier
  dị ka tombstone ma jikọta ha ọzọ kpọmkwem otu ha dị; a naghị eme ha pruning
- **SLM tier Nhọrọ** — obere local model nwere ike imezi pruning ahụ mgbe a haziri ya
- Ọ nọọrọ onwe ya pụọ na Aggressive mode: ọ naghị arụ message aging, compression nke tool-result
  ma ọ bụ fallback summarizer (naanị ọdịda SLM-tier nwere ike iduga fallback pass site na
  aggressive)

**Kachasị mma maka:** Mgbe ị na-eru oke context ugboro ugboro.

### RTK Mode (oke upstream 60-90%)

A haziri RTK mode maka output tool toro ogologo nke na-apụta na session coding-agent:

- Na-achọpụta klaasị command/output dịka `git status`, `git diff`, `git log`, test runner,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/install, log Docker, output
  infra, na output shell izugbe
- Na-etinye ngwugwu JSON filter sitere na `open-sse/services/compression/engines/rtk/filters/`
- Na-ebubata filter RTK TOML schema v1 site na faịlụ `filters.toml` nke project ma ọ bụ nke zuru ụwa ọnụ, tinyere
  nkwado inline-test na trust-gating maka faịlụ project
- Na-abịa na filter arụnyere n'ime ya 55 nwere sample inline verify
- Na-ewepụ usoro njikwa ANSI, progress bar, ahịrị ndị e megharịrị, na mkpọtụ na-enweghị uru
- Na-echekwa ọdịda, error, warning, faịlụ gbanwere, nchịkọta, na njedebe nke output toro ogologo
- Na-akwado project filter nwere trust-gating, global filter, na mgbake raw-output e mere redaction nke bụ nhọrọ

**Kachasị mma maka:** Session agent nwere transcript shell, build, test, git, grep, na file-output.

### Stacked Mode (oke ndị tozuru etozu 78-95%)

Stacked mode na-agba ọtụtụ compression engine n'usoro a kara aka. Pipeline ndabara bụ:

```txt
RTK -> Caveman
```

Usoro ahụ na-ebu ụzọ mee ka output terminal/tool dị mkpụmkpụ, wee jiri Caveman mee semantic condensation na
prompt asụsụ mmadụ fọdụrụ. Enwere ike ịhazi stacked pipeline n'ụwa niile ma ọ bụ site na
compression combo e kenyere routing combo.

**Kachasị mma maka:** Context agwakọtara nwere nnukwu tool log tinyere ntuziaka mmadụ ma ọ bụ nchịkọta assistant.

---

## Mgbakọ Mbelata Upstream

OmniRoute na-edepụta mbelata sitere na mkpakọ site n’ebe abụọ: benchmark nke ọrụ upstream na
nhazi injin nke OmniRoute n’onwe ya.

| Isi mmalite | Ọnụọgụ dị na README upstream e ji mee ihe ebe a                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Caveman     | token mmepụta dị ole na ole site na `~75%`, nkezi mbelata mmepụta benchmark `65%`, oke `22-87%`, na ngwa mkpakọ ntinye `~46%` |
| RTK         | mbelata mmepụta iwu `60-90%`; nnọkọ atụ `~118,000 -> ~23,900` token, ma ọ bụ `79.7%` echekwara (`~80%`)                       |

Maka payload ngwa/ọnọdụ ndị na-adakọrịta, ngwakọta ndabara OmniRoute na-etinye injin ndị a n’usoro:

```txt
RTK -> Caveman
```

A na-amụba mbelata ndị ahụ ọnụ, anaghị agbakwunye ha ọnụ:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ọnụọgụ `78-95%` ahụ na-emetụta ọnọdụ ebe ma RTK ma Caveman nwere ike ibelata otu payload ntinye/ọnọdụ ahụ.
Ụdị mmepụta nzaghachi Caveman dị iche: mgbe enyere ya aka, jiri mbelata mmepụta nke Caveman n’onwe ya (`65%`
nkezi, `~75%` isi ọnụọgụ, oke `22-87%`). Mbelata ụgwọ mkpokọta dabere na ngwakọta prompt/mmepụta gị.

### Ihe "tozuru oke" pụtara n’ezie

Oke isi ọnụọgụ 15-95% bụ eziokwu, mana ọ na-emetụta naanị ọdịnaya **na-emegharị onwe ya ma ọ bụ nwere ọtụtụ okwu** — ahịrị
njehie ndị a na-emegharị, log build nke na-ezipụ otu ịdọ aka ná ntị ugboro ugboro, dump `grep`/ọgụgụ-faịlụ buru oke ibu. Ọ
**pụtaghị** na arịrịọ ọ bụla ga-echekwa ego ruru otu ahụ.

E gosipụtara nke a site na nnwale (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): otu
ọsọ `stacked` (RTK + Caveman) megide ngọngọ `tool_result` yiri nhazi Anthropic nke nwere ahịrị njehie 300 yiri onwe ha
mepụtara **mbelata token 95.93% / mbelata mkpụrụedemede 96.26%** — kpọmkwem n’ime oke e kwusara.
Mana mgbe otu pipeline ahụ na-arụ ọrụ na mmepụta ngwa nkịtị nke na-adịghị emegharị onwe ya (ndepụta nsonaazụ `grep` dị ọcha,
ọgụgụ faịlụ dị mkpụmkpụ, ederede mkparịta ụka nkịtị), ọ na-emepụta **mbelata dị nso na efu** dịka o kwesịrị, n’ihi na
ọ dịghị ihe na-emegharị onwe ya a ga-ewepụ, `validateCompression()` (`validation.ts`) anaghịkwa ekwe ka e ziga
ederede edegharịrị nke ga-ewepụ ma ọ bụ gbanwee ngọngọ koodu, URL, isiokwu, ụdị, ma ọ bụ njirimara constant ndị e dere kpamkpam na mkpụrụedemede ukwu.

Nke a bụ omume a tụrụ anya ya ma dị nchebe, ọ bụghị bug: nnọkọ ide koodu nke na-agụkarị/na-eji grep nyochaa faịlụ dị ọcha ga-
ahụ mbelata mkpokọta pere mpe ọbụna mgbe enyere mkpakọ aka n’uju, ebe nnọkọ zutere loop dara ada
ma ọ bụ linter na-ekwu ọtụtụ ihe ga-ahụ oke 78-95% zuru ezu na traffic ahụ. Ejila pasent mbelata mkpokọta dị ala nke otu nnọkọ
dị ka ihe akaebe na ahazighị mkpakọ nke ọma — buru ụzọ lelee ma mmepụta ngwa dị n’okpuru ya ọ na-emegharị onwe ya n’ezie.

---

## Ngosipụta Anya nke Mbelata Token

```
Na-enweghị mkpakọ: 47K token ezigara LLM
Na Lite:           40K token ezigara          (echekwara 15% — dị nchebe, na-arụ ọrụ mgbe niile)
Na Standard:       33K token ezigara          (echekwara 30% — iwu caveman-speak)
Na Aggressive:     24K token ezigara          (echekwara 50% — imeka nká + nchịkọta)
Na Ultra:          12K token ezigara          (echekwara 75% — mkpochapụ heuristic)
Na RTK:            19K-5K token ezigara       (echekwara 60-90% na mmepụta iwu/ngwa)
Na Stacked:        10K-2.5K token ezigara     (oke RTK+Caveman tozuru oke 78-95%)
```

---

## Nhazi

### Dashboard

Gaa na `Dashboard → Context & Cache`:

- **Caveman** — nhọrọ ọnọdụ, ngwugwu asụsụ, nlele tupu oge eruo, na ndabara zuru ụwa ọnụ
- **RTK** — nlele tupu oge eruo nke nzacha iwu, ntọala nchekwa RTK, na katalọgụ nzacha
- **Compression Combos** — usoro injin ndị nwere aha e kenyere ngwakọta ntụgharị
- **Auto-Trigger Threshold** — na-amalite mkpakọ na-akpaghị aka mgbe ọnụọgụ token gafere oke

### Mgbanwe Pụrụ Iche Maka Ngwakọta Ọ Bụla

Na `Dashboard → Context & Cache → Compression Combos`, kenye ngwakọta mkpakọ n'otu ngwakọta ntụgharị:

```txt
Ngwakọta: "free-tier-fallback"
  Ngwakọta Mkpakọ: "coding-agent-stack"
  Usoro: RTK -> Caveman
  Ebe Ezubere:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Nke a na-enye gị ohere iji mkpakọ ndị a kwakọtara ọnụ na ndị na-eweta ọrụ efu/koodu, ma na-edobe ọnọdụ dị mfe na ndebanye aha ndị a na-akwụ ụgwọ.

Nkenye "Mgbanwe Pụrụ Iche Maka Ngwakọta Ọ Bụla" a bụ njikwa dị iche na mgbanwe **ọnọdụ mkpakọ nke ngwakọta ntụgharị** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schema nke oghere ahụ na-anabatakwa `rtk`, `stacked` na `omniglyph`) — mgbanwe ahụ anaghị ahọrọ usoro ngwakọta mkpakọ nwere aha; naanị ihe ọ na-eme bụ ịtọ oghere `compressionMode` nke `resolveCompressionPlan` na-enyocha. Enwere ike ịtọ ya ma na kaadị ngwakọta (`Dashboard → Combos`) ma ọ bụ, kemgbe #6760, maka ngwakọta ntụgharị ọ bụla na ndepụta "Assign to routing" dị na `Dashboard → Context & Cache → Compression Combos`, kpọmkwem n'akụkụ igbe nlele nkenye usoro akọwara n'elu. Ebe abụọ ahụ na-echekwa site n'otu endpoint `PUT /api/combos/{id}` ahụ.

### Mgbanwe pụrụ iche maka arịrịọ ọ bụla

Zipụ isi arịrịọ `x-omniroute-compression` iji gbanwee atụmatụ mkpakọ maka otu arịrịọ. Ọ nwere mkpa kachasị elu — ọ na-emeri mgbanwe ngwakọta ntụgharị, profaịlụ na-arụ ọrụ, mmalite akpaka, na Default nke panel. A na-eleghara ụkpụrụ ndị a na-amaghị anya anya (anaghị ajụ arịrịọ ahụ ma ọlị), ma mgba ọkụ ukwu zuru ụwa ọnụ ka na-achị ihe niile: mgbe agbanyụrụ mkpakọ n'ụwa niile, isi ahụ enweghị ike ịgbanye ya. Ụkpụrụ:

| Uru           | Mmetụta                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Enweghị mkpakọ maka arịrịọ a.                                                                                                |
| `default`     | Profaịlụ Default sitere na panel (na-eleghara profaịlụ na-arụ ọrụ anya). A na-ahapụ injin ndị na-efunahụ data ka ha gbanyụọ. |
| `safe`        | Otu ihe ahụ dị ka ịhapụ isi ahụ: naanị iwepụ oyiri na ijikọta oghere ọcha.                                                   |
| `allow-lossy` | Debe atụmatụ onye njikwa maka arịrịọ a, gụnyere nchịkọta, nzacha mkpa, na ndegharị ụdị.                                      |
| `engine:<id>` | Otu injin mgbe agbanyere ya, dịka `engine:rtk`. Nke a bụ nkwenye maka injin ahụ n'arịrịọ ọ bụla.                             |
| `<combo>`     | Ngwakọta nwere aha, nke a na-ebu ụzọ kwekọọ site n'aha (na-enweghị iche nnukwu na obere mkpụrụedemede), emesịa site na id.   |

Na-enweghị `allow-lossy`, `engine:<id>`, ma ọ bụ ngwakọta nwere aha, anaghị etinye injin ndị na-efunahụ data n'ọrụ. Arịrịọ ahụ ka na-enweta iwepụ oyiri nke nnọkọ na ijikọta oghere ọcha mgbe mkpakọ dị ọkụ.

A na-eweghachi atụmatụ etinyere n'ọrụ n'isi nzaghachi `X-OmniRoute-Compression: <mode>; source=<source>`, ebe `<source>` bụ otu n'ime `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, ma ọ bụ `off`.

### API

```bash
# Nweta ntọala mkpakọ
curl http://localhost:20128/api/settings/compression

# Melite ntọala mkpakọ
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Lee otu payload RTK/stacked akọwapụtara tupu oge eruo
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Depụta ngwugwu nzacha RTK
curl http://localhost:20128/api/context/rtk/filters

# Nwalee RTK ozugbo site na metadata iwu nhọrọ
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ihe A Na-echekwa

Injin mkpakọ **na-echekwa ihe ndị a mgbe niile:**

- ✅ Blọk koodu (nke e ji fences mechie na nke dị n'ahịrị)
- ✅ URL na ụzọ faịlụ
- ✅ Ọdịdị JSON na data ahaziri ahazi
- ✅ Ihe njirimara na token teknụzụ echedoro
- ✅ Nkwupụta mgbakọ na mwepụ
- ✅ Nkọwa oku ngwá ọrụ/ọrụ
- ✅ Ntuziaka sistemụ (na mode lite)

Mweghachi raw-output RTK na-ekpuchi igodo API ndị a na-ahụkarị, bearer token, token Slack, igodo nnweta AWS,
okwuntughe, token, na ihe nzuzo tupu e debe ihe ọ bụla.

---

## Ọnụọgụ Nchịkọta Mkpakọ

Arịrịọ ọ bụla e tinyere mkpakọ nwere ọnụọgụ nchịkọta n'ime ndekọ sava:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Atụmatụ Usoro Oge

| Usoro    | Mode                                                                                                                                            | Ọnọdụ        |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Usoro 1  | Off, Lite                                                                                                                                       | ✅ Ewepụtala |
| Usoro 2  | Standard, Aggressive, Ultra                                                                                                                     | ✅ Ewepụtala |
| Usoro 3  | RTK, Stacked, Compression Combos                                                                                                                | ✅ Ewepụtala |
| Usoro 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                     | ✅ Ewepụtala |
| Usoro 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` na `PUT /api/settings/compression`) + njikwa mode/policy nke dashboard | ✅ Ewepụtala |

---

## Ekele

Iwu mkpakọ mode Standard sitere n'ike mmụọ nsọ nke **[Caveman](https://github.com/JuliusBrussee/caveman)** nke **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) mere — ọrụ ama ama "gịnị mere a ga-eji ọtụtụ token mgbe token ole na ole nwere ike ịrụ ọrụ ahụ". Caveman na-akọ token mmepụta dị ole na ole site na `~75%`, nkezi nchekwa mmepụta benchmark nke `65%`, oke mmepụta nke `22-87%`, na ngwá ọrụ mkpakọ ntinye nke `~46%`.

Mode RTK sitere n'ike mmụọ nsọ nke **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** nke **[RTK AI](https://github.com/rtk-ai)** mere — ọrụ mkpakọ mmepụta iwu na-arụ ọrụ nke ọma maka terminal, build, test, git, na nzacha mmepụta ngwá ọrụ. RTK na-akọ nchekwa nke `60-90%`, ebe nnọkọ nlele dị na README ya na-egosi na echekwara `~80%`.

---

## Sistemụ Mkpakọ Dị Elu

E wezụga ụdị 7 akọwara n'elu (isi mmalite ahụ na-anabatakwa ụdị `codex-responses` na
`omniglyph`, nke ntuziaka a anaghị ekpuchi), ngalaba ndị dị n'okpuru na-akọwa atụmatụ
ndị na-arụ ọrụ n'ime ma ọ bụ n'akụkụ ụdị ndị ahụ: Tool Result Compression na Progressive Aging
bụ nzọụkwụ 1 na 2 nke injin ike (ụdị Aggressive na nzọụkwụ `aggressive` nke
paịpụ e dokọtara ọnụ), Stacked Pipeline bụ ụzọ ụdị Stacked si arụ ọrụ, Cache-Aware Compression
na-ewedata `aggressive` na `ultra` gaa na `standard` maka ndị na-eweta ọrụ caching mgbe
mkpakọ nọ n'ọrụ, ebe Caveman Output Mode na Output Styles bụ ntuziaka system-prompt a na-ahọrọ iji,
ndị agbanyụrụ na ndabara, nke na-akpụpụta mmepụta model kama ịkpachikọta arịrịọ ahụ.

### Mkpakọ Na-aghọta Cache

Ụfọdụ ndị na-eweta ọrụ (dị ka Anthropic nwere prompt caching) na-akwado **prompt caching**,
nke na-enye ha ohere idowe akụkụ ụfọdụ nke prompt na cache iji belata ụgwọ na oge nchere. Mgbe
agbanyere caching, mkpakọ ike nwere ike n'ezie **imebi** arụmọrụ
n'ihi na ọ na-agbanwe token ndị e debere na cache, si otú ahụ mee ka cache ahụ ghara ịdị irè.

Modul `cachingAware.ts` na-edozi nke a site na **ịchọpụta ọnọdụ caching** na
**ịhazigharị atụmatụ mkpakọ** dịka ọnọdụ ahụ siri dị.

#### Otu o si arụ ọrụ

1. **Chọpụta ọnọdụ caching** — Na-enyocha request body maka akara `cache_control`
2. **Mata ndị na-eweta ọrụ caching** — Na-elele ma onye na-eweta ọrụ e zubere ọ na-akwado caching
3. **Hazie atụmatụ** — Na-ewedata `aggressive`/`ultra` gaa na `standard` maka ndị na-eweta ọrụ caching
4. **Mafere system prompt** — A na-edobekarị system prompt na cache, ya mere akpachikọla ha

Ihe enyemaka atụmatụ ahụ na-eweghachikwa ọkọlọtọ `deterministicOnly`, mana onye na-ewu atụmatụ ahụ na-eji
naanị atụmatụ ahụ — ọ dịghị ihe dị n'akụkụ usoro ndị na-esote na-agụ ọkọlọtọ ahụ ugbu a.

#### Ọmụmaatụ koodu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Akara cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Mgbe a ga-eji ya

Mkpakọ na-aghọta cache **na-adị n'ọrụ mgbe niile** — nhazi adịghị mkpa. Ọ na-amalite mgbe ọ bụla
mkpakọ nọ n'ọrụ ma onye na-eweta ọrụ e zubere na-akwado prompt caching (Anthropic, OpenAI,
wdg.); akara `cache_control` akọwapụtara abụghị iwu — naanị ịbụ onye na-eweta ọrụ caching
na-akpalite mwedata ahụ, ebe naanị akara anaghị eme ya (nchọpụta akara na-enye ozi maka
telemetry cache, ọ bụghị mkpebi atụmatụ).

### Ịka Nka Nke Ji Nwayọọ Nwayọọ

Mkparịta ụka ogologo na-achịkọta ọtụtụ ntụgharị ozi, mana ntụgharị ndị ochie na-adịwanye
ntakịrị mkpa. Modul `progressiveAging.ts` **na-ebelata ogo ozi dịka anya ntụgharị ha dị**
(a na-atụ anya ahụ site na ngwụcha mkparịta ụka). Site na ndabara ndị e tinyere
(`verbatim: 2, light: 2, moderate: 3`):

- **Ntụgharị 2 ikpeazụ (anya ≤ 2)**: A na-edobe ha kpọmkwem dịka ha dị
- **Anya 3**: Mkpakọ Caveman (iwepụ okwu ndochi)
- **Anya 4+**: A na-achịkọta ozi assistant; a na-ebelata ozi user ruo naanị ahịrị mbụ ha,
  nke oke ya bụ mkpụrụedemede 120; a naghị emetụ role ndị ọzọ aka. System prompt, ozi ndị
  e meela ka ha kaa nka na ozi user kacha ọhụrụ ka a na-edobe mgbe niile kpọmkwem dịka ha dị
  n'agbanyeghị anya ha. A naghị atụfu ihe ọ bụla kpamkpam, ebe band `light`
  enweghị ike iru site na ndabara ndị e tinyere (`light` hà nhata `verbatim`).

#### Ọmụmaatụ koodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... ntụgharị 50 ọzọ ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // ntụgharị 3 ikpeazụ: kpọmkwem dịka ha dị
  light: 8, // anya <= 8: mkpakọ dị mfe
  moderate: 20, // anya <= 20: mkpakọ caveman
  fullSummary: 5, // type chọrọ ya, mana koodu banding anaghị agụ ya
  // anya > 20: a na-achịkọta ya (assistant) / a na-edobe ahịrị mbụ (user)
});

// saved = ọnụọgụ token echekwara
```

#### Mgbe a ga-eji ya

Ịka nka nke ji nwayọọ nwayọọ **na-adị n'ọrụ mgbe niile** maka ụdị `aggressive` — ọ bụ nzọụkwụ 2 nke
`compressAggressive()`. Ụdị Ultra anaghị agba ya. Ọ na-arụ ọrụ nke ọma karịsịa maka:

- Oge ide koodu na-aga ogologo oge
- Mkparịta ụka na-ewe ọtụtụ ụbọchị
- Usoro ọrụ agentic nwere ọtụtụ ọkpụkpọ tool

### Ụdị Mmepụta Caveman

Ụdị mmepụta Caveman na-agbakwunye **ntuziaka system prompt** nke na-arịọ model ahụ n'onwe ya ka o nye
mmepụta dị nkenke — ọkwa `lite` na-arịọ maka azịza dị nkenke nke na-edobe ahịrịokwu zuru ezu, `full`
na-arịọ ya ka ọ "zaghachi nkenke dịka caveman maara ihe", ebe `ultra` na-arịọ maka mmepụta telegraphic;
ntuziaka na-arịọ naanị, ha enweghị ike ikwe nkwa na ọ ga-eme ya. Arịrịọ na-enweta ha site na
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` na-ebu ụzọ kpebie nhọrọ ahụ site na shim ndakọrịta ochie
(`resolveOutputStyleSelection()` dị na
`open-sse/services/compression/outputStyles/backCompat.ts`), nke, mgbe `outputStyles`
tọgbọ chakoo, na-atụgharị `cavemanOutputMode` agbanyere gaa na output style `terse-prose` na
`cavemanOutputMode.intensity` (lee Ndakọrịta ochie n'okpuru); a na-eji nhọrọ `outputStyles`
na-adịghị tọgbọ chakoo dịka ọ dị, mgbe ahụ `cavemanOutputMode.enabled` na `intensity` agaghịzi enwe
mmetụta, ebe toggle `autoClarity` ya ka na-emetụta. `outputMode.ts` nwere ederede
ntuziaka (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), ụzọ ịgafe ọdịnaya na ihe enyemaka nhọpụta ọnọdụ
nke injection na-eji; injector `applyCavemanOutputMode()` nke ya enweghị onye na-akpọ ya
na production.

#### Otu o si arụ ọrụ

Ụdị a anaghị akpakọta ntinye. Ọ na-agbakwunye blọkụ ntụziaka na system prompt
(lee Otu ntinye si arụ ọrụ n'okpuru), ụdị mkpakọ ntinye ọ bụla ahọpụtara maka arịrịọ ahụ
ka na-agbakwa ma e mesịa, n'ahụ nke buzi blọkụ ahụ. Tupu nkebi oke a na-ekekọrịta
nke ọkwa ọ bụla ji agwụ, ọkwa `full` Bekee na-ekwu:

> "Zaghachi nkenke dịka onye ọgba nwere ọgụgụ isi. Wepụ articles (a/an/the), okwu mmeju (just/really/basically/actually/simply), ekele, okwu na-egosi enweghị nkwenye. Iberibe ahịrịokwu dị mma. Jiri okwu ndị ọzọ dị mkpụmkpụ (big kama extensive, fix kama implement). Debe ọdịnaya teknụzụ niile, code, errors, URLs, identifiers otu ha dị."

Nke a na-arụ ọrụ nke ọma karịsịa maka:

- Mmepụta code (mmepụta dị nkenke = tokens ole na ole)
- Ajụjụ na azịza ngwa ngwa (nkọwa sara mbara adịghị mkpa)
- Nhazi n'ìgwè (mee ka throughput ruo oke)

#### Mgbe a ga-eji ya

Ụdị mmepụta Caveman bụ **opt-in**. Mgbe mkpakọ dị (`enabled: true`, master toggle
dị na ibe Compression Settings), gbanye ya site na `cavemanOutputMode.enabled`; `intensity`
na-ahọrọ `lite`, `full` ma ọ bụ `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Toggle **Output Mode** nke combo mkpakọ (`outputMode`, ebe ọkwa dị na `outputModeIntensity`)
na-edobe otu switch ahụ maka arịrịọ combo ahụ metụtara, ngwá ọrụ MCP
`omniroute_set_compression_engine` na-edekwa ya site na argument boolean ya `outputMode`.
Nhọrọ `outputStyles` na-abụghị ihe efu na-ebute ụzọ karịa switch a. Na dashboard, ịgbanye
ụdị mmepụta **Terse prose** na-etinye otu blọkụ ahụ (lee Output Styles n'okpuru).

### Ụdị Mmepụta (katalọgụ)

Ụdị mmepụta Caveman dị n'elu bụ **ụzọ otu ụdị ochie**. Phase 4 mere ka ọ gbasaa
ghọọ katalọgụ nke ụdị mmepụta enwere ike ijikọta: `OUTPUT_STYLE_CATALOG` dị na
`open-sse/services/compression/outputStyles/catalog.ts`. Ụdị ọ bụla bụ ntụziaka system-prompt
nke na-arịọ model ahụ n'onwe ya ka o nye mmepụta dị ọnụ ala; enwere ike ịgbanye ọtụtụ ụdị
ọnụ, a na-etinyekwa ha dịka usoro katalọgụ si dị.

| Ụdị                                   | `id`            | Ihe ọ na-eme                                                                                                                                                                                                                                                                | Asụsụ ntụziaka                                |
| ------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Prose dị nkenke                       | `terse-prose`   | Wepụ okwu mmeju/articles/okwu na-egosi enweghị nkwenye; debe ọdịnaya teknụzụ otu ọ dị. Otu ederede ahụ dịka ụdị mmepụta caveman ochie (a na-arụtụ aka na ya, anaghị edegharị ya).                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Code pere mpe                         | `less-code`     | Ọkwa YAGNI: mgbanwe kacha nta na-arụ ọrụ, enweghị abstractions a na-arịọghị.                                                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (senior dev umengwụ)         | `ponytail`      | "Code kacha mma bụ code a na-edeghị mgbe ọ bụla": reuse > rewrite, root cause > symptom, diff kacha mkpụmkpụ na-arụ ọrụ.                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Enwere m ADHD (ọrụ-mbụ)               | `i-have-adhd`   | Ọrụ mbụ (command/path/snippet tupu prose), nzọụkwụ nwere nọmba na oke, OTU nzọụkwụ ọzọ doro anya, enweghị preamble/recap/closers. E si na [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) hazie ya.                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Nzacha UI Antislop                    | `antislop-ui`   | Usoro ngosi ọ bụla ga-agafe ule ebumnuche (hierarchy, identity, readability); enweghị gradients/glass/glow ndabara, palette nwere oke, enweghị template layouts. Ụdị antislop abụọ ahụ na-agbakwunye oke enweghị-controls-na-adịghị-arụ-ọrụ / enweghị-nkwupụta-echere-eche. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Nzacha Antislop maka ederede na mmadụ | `antislop-copy` | Ederede akọwapụtara nke ọma (enweghị em dash, generic CTAs, buzzwords, chatbot closers, eziokwu echepụtara) tinyere iwu gbasara mmadụ: WCAG AA contrast, visible focus, keyboard reach, empty/loading/error states, mobile reflow.                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK dị nkenke (文言)                  | `terse-cjk`     | Azịza `full`/`ultra` n'asụsụ Chinese Oge Ochie (文言); `lite` na-arịọ naanị azịza dị mkpụmkpụ na-enweghị function words, ekele ma ọ bụ ịchọ mma.                                                                                                                            | zh (locale-gated, lee n'okpuru)               |

Ụdị ọ bụla nwere ọkwa intensity atọ — `lite`, `full`, `ultra` — ọkwa ọ bụla
na-ejedebekwa na nkebi oke a na-ekekọrịta (`SHARED_BOUNDARIES` dị na `outputMode.ts`), nke
na-edebe code blocks, file paths, commands, errors na URLs otu ha dị. Ederede ọkwa
`terse-prose` na `terse-cjk` na-agbakwunye identifiers na ndepụta ahụ.

A na-egbochi `terse-cjk` site na locale `zh` n'ebe abụọ. Ibe Compression Settings na-egosi
ahịrị ya naanị mgbe asụsụ UI dashboard bụ Chinese (`zh-CN` ma ọ bụ `zh-TW`), ebe
`applyOutputStyles()` na-etinye ya naanị mgbe asụsụ arịrịọ ahụ e kpebiri (lee Nhọrọ asụsụ
n'okpuru) bụ `zh`. Izobe ahịrị ahụ anaghị ehichapụ nhọrọ `terse-cjk` echekwara:
settings API na-anabata style id ọ bụla, ma ichekwa ụdị ndị ọzọ na ibe ahụ na-edobe ya.
N'oge arịrịọ, nyocha asụsụ `applyOutputStyles()` bụ naanị locale gate.

#### Otu ntinye si arụ ọrụ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) na-enyocha
nhọrọ ahụ megide katalọgụ (a na-ewepụ ids ndị a na-amaghị na ụdị ndị locale ha adabaghị,
ọ dịghị mgbe ọ bụ njehie; nhọrọ nke na-enweghị ụdị ọ bụla mgbe e nyochachara na-ahapụ body
ahụ dịka ọ dị, a na-amafe ya dịka `no_styles`), na-ejikọta ntuziaka ndị ahọpụtara dịka
usoro ha si dị na katalọgụ,
na-agbakwunye nkebi boundaries ahụ **otu ugboro** (tinyere nkebi nchekwa,
`SAFETY_BOUNDARIES` ma ọ bụ ntụgharị ya, mgbe ahọpụtara `less-code` ma ọ bụ `ponytail`),
ma jiri otu akara idempotency (`[OmniRoute Output Styles]`) malite block ahụ, ya mere
itinye ya ọzọ anaghị eme ihe ọ bụla. Mgbe asụsụ e kpebiri (lee Nhọrọ asụsụ n'okpuru)
nwere ntụgharị, a na-etinye ntuziaka e mere ka ọ kwekọọ na locale kama nke Bekee.

N’elu body nwere array `messages` na-adịghị efu, a na-eme nyocha idempotency tupu
content bypass: mgbe akara `[OmniRoute Output Styles]` adịlarị n’ime field `system`
nke top-level (string ma ọ bụ content-block array), ma ọ bụ n’ime system message nwere
string content, a na-ahapụ body ahụ dịka ọ dị dịka `already_applied`, a naghịkwa eme
nnyocha keyword. Ma ọ bụghị ya, content bypass (`shouldBypassCavemanOutputMode()` dị na
`open-sse/services/compression/outputMode.ts`) na-enyocha ederede nke messages atọ
ikpeazụ, n’agbanyeghị role ha, ma na-amafe styles maka turn ahụ dum mgbe ederede ahụ
dakọtara na keyword nchekwa, irreversible-action, ma ọ bụ clarification ya, ma ọ bụ
usoro na-adabere n’usoro okwu: `first`, `then`, `after that`, `before`, `rollback` ma ọ bụ
`backup` nke `delete`, `drop`, `migrate`, `deploy` ma ọ bụ `release` sochiri n’ime
characters 240. Bypass ahụ na-arụ ọrụ mgbe toggle **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, nke dị on na ndabara) dị on; ịgbanyụ toggle ahụ
na-eme ka a ghara ime nnyocha keyword.

Mgbe bypass ahụ kwere ka turn ahụ gafere, `placeSystemInstruction()` (n’otu faịlụ ahụ),
nke na-adịghị emepụta `messages[0]` ọhụrụ, na-etinye block ahụ n’ebe mbụ n’ime ndị a ọ
hụrụ:

1. System message dị n’isi nke nwere string content: a na-agbakwunye block ahụ n’azụ
   ederede ya.
2. Field `system` nke top-level: a na-agbakwunye block ahụ n’azụ ederede nke string, ma ọ
   bụ tinye ya dịka text block ọhụrụ n’ime content-block array.
3. System message mbụ nke bịara n’azụ ma nwee string content: a na-agbakwunye block ahụ
   n’azụ ederede ya.
4. Ọ bụrụ na nke ọ bụla n’ime ndị dị n’elu adịghị: block ahụ na-abanye n’ime system
   message ọhụrụ na ngwụcha `messages`.

N’elu body na-enweghị array `messages` (ma ọ bụ nke nwere nke tọgbọ chakoo), content
bypass anaghị arụ ọrụ, a naghịkwa ele field `system` nke top-level anya. A na-agbakwunye
block ahụ n’azụ ederede nke string field `instructions`, belụsọ ma field ahụ enweelarị
akara `[OmniRoute Output Styles]`; n’ọnọdụ ahụ, a na-ahapụ body ahụ dịka ọ dị dịka
`already_applied`. Mgbe body ahụ na-enweghị string field `instructions` ma nwee `input`
(string ma ọ bụ array), block ahụ na-aghọ `instructions`, ma dochie uru ọ bụla na-abụghị
string nke field ahụ nwere. A na-ahapụ body na-enweghị string field `instructions` ma ọ
bụ `input` nke bụ string ma ọ bụ array dịka ọ dị, a na-amafekwa ya dịka `no_messages`.

#### Otu esi eme ka ọ rụọ ọrụ

Na dashboard: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), ngalaba Output styles: otu row maka style ọ bụla nwere
toggle on/off na level selector. Styles na-etinye ntuziaka mgbe compression n’onwe ya dị
on (master toggle nke ibe ahụ, `enabled`). Toggle **Auto-Clarity Bypass** dị na ibe
**Caveman** (`/dashboard/context/caveman`), n’ime card **Output Mode** ya. Site na
program, compression config na-echekwa nhọrọ ahụ dịka:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Ndakọrịta azụ: mgbe `outputStyles` tọgbọ chakoo, setting ochie
`cavemanOutputMode.enabled` na-ejikọta na `terse-prose` na
`cavemanOutputMode.intensity`. Mgbe ahụ, block ahụ na-amalite na akara
`[OmniRoute Output Styles]`, ebe injector ochie `applyCavemanOutputMode()` dere
`[OmniRoute Caveman Output Mode]`. N’okpuru akara ahụ, ederede ahụ dabara na injection
ochie na en, pt-BR, es, de, fr, it, ru, id na vi; na ja na zh, ọ nwere otu oghere ọzọ
tupu nkebi boundaries ahụ. A na-atụgharị `terse-prose` gaa na pt-BR, es, de, fr, it, ru,
zh, ja, id na vi, ya mere request nke asụsụ e kpebiri bụ `hu` na-enweta ederede Bekee
ebe injector ochie jiri nke Hungarian ya.

Nhọrọ asụsụ output-style (`resolveOutputStyleLanguage()` dị na
`outputStyles/apply.ts`): mgbe `languageConfig.enabled` dị on, `autoDetect` na-ewere
sample site na user message kacha ọhụrụ n’ime array `messages` nke request ahụ nwere
ederede (string content, ma ọ bụ `text` nke content parts ya), wee mee ka detector nke
Caveman engine (`detectCompressionLanguage()`) nyochaa ya. Detector ahụ na-eweghachi
`zh` maka ederede nwere characters Han ma na-enweghị kana; ma ọ bụghị ya, ọ na-eweghachi
nke ọ bụla n’ime `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` na `id` nke nwere hint
matches kachasị, ma weghachite `en` mgbe ọ dịghị nke dakọtara — ederede ọ na-enweghị ike
ịkọwa na-enweta Bekee, ọ bụghị `defaultLanguage`, a naghịkwa achọpụta `vi` ọ bụ ezie na
styles ahụ nwere ederede `vi`. Body nke Responses API na-edebe turns ya n’ime `input`,
nke a naghị ewere sample na ya, ya mere ọ na-enweta `defaultLanguage`, mesịa Bekee.
Mgbe user message ọ bụla n’ime `messages` enweghị ederede, ma ọ bụ mgbe `autoDetect` dị
off, `defaultLanguage` ka a na-eji, mesịa Bekee. Mgbe `languageConfig.enabled` dị off,
asụsụ ahụ bụ Bekee — belụsọ ma compression combo metụtara request ahụ (combo e kenyere
routing combo nke request ahụ, ma ọ bụ default compression combo nke chatCore na-alaghachi
na ya maka built-in stacked pipeline): itinye combo na-agbanye
`languageConfig.enabled` ka ọ bụrụ on maka request ahụ ma na-esetịpụ `defaultLanguage`
site na language packs nke combo ahụ (uru echekwara ma ọ bụrụ na ọ bụ otu n’ime packs
nke combo ahụ, ma ọ bụghị ya pack mbụ nke combo ahụ, nke ndabara ya bụ `en`), ebe
`autoDetect` echekwara (nke dị on na ndabara) ka na-arụ ọrụ. Caveman input engine
na-ahọrọ asụsụ rule-pack ya n’ụzọ dị iche — maka text part ọ bụla, nakwa, mgbe
auto-detect dị off, dabere na `enabledPacks`.

A na-akpọgide matriksị ụdị × asụsụ site na
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: ụdị katalọgụ ọ bụla chọrọ
ntinye n'ime `BASELINE_LANGUAGES` nke ule ahụ; ụdị a na-ejighị locale gbochie ga-enwerịrị
ntụgharị pt-BR (`terse-cjk` nke locale na-egbochi apụghị n'iwu a) belụsọ ma e depụtara ya
na `KNOWN_ENGLISH_ONLY`, nke nwere ike ịnwe naanị ụdị ndị na-enweghị ntụgharị ọ bụla —
ụdị e depụtara nke nwere ntụgharị ọ bụla ga-ada ule ahụ; ụdị ga-adakwa ule ahụ mgbe ọ
tụfuru asụsụ e depụtara na ntinye `BASELINE_LANGUAGES` ya. Iji tinye ụdị, lee
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Mkpakọ Nsonaazụ Ngwaọrụ

`compressToolResult()` dị na `open-sse/services/compression/toolResultCompressor.ts`
na-eji **usoro 5** akpakọ ederede nsonaazụ-ngwaọrụ. Ọ na-anwale ha n'usoro a, usoro mbụ
agbanyere nke nyocha ya dabara na ọdịnaya ga-ekpebi nsonaazụ:

1. **`fileContent`**: ọdịnaya nwere ahịrị 3 ma ọ bụ karịa, ebe ọ dịkarịa ala otu ahịrị,
   mgbe a leghaara oghere mbido anya, ji `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ma ọ bụ `return ` bido (okwu igodo ahụ tinyere otu oghere),
   ma ọ bụ ji `if`, `for` ma ọ bụ `while` nke `(` ma ọ bụ ` (` na-esochi bido; ọ na-edobe
   ahịrị 20 mbụ na ahịrị 5 ikpeazụ, ma kaa etiti ewepụrụ akara.
2. **`grepSearch`**: ọdịnaya nwere ọ dịkarịa ala otu ahịrị n'ụdị `<path>:<digits>:`,
   ebe ederede dị n'ihu colon mbụ na-enweghị whitespace, na-edobe naanị ahịrị ndị ahụ,
   ruo 30 kacha elu, tinyere ọnụọgụ ndakọrịta ndị ọzọ ọ bụla na ndepụta faịlụ ndị
   dabara; a na-atụfu ahịrị ndị ọzọ niile. Otu ahịrị dị otu a ezuru iji kpalite usoro a,
   ya mere ahịrị ndekọ ji timestamp dịka `12:30:45` bido sokwa na ya.
3. **`shellOutput`**: mmepụta nwere usoro ANSI CSI (`ESC[` nke digit ma ọ bụ semicolon
   na-esochi, ma mkpụrụedemede mechie ya, dịka na koodu agba) ma ọ bụ `$` nke whitespace
   na-esochi n'ebe ọ bụla n'ime ederede ga-efunahụ usoro ndị ahụ (a na-edobe escape ndị
   ọzọ, dịka `ESC[?25l` ma ọ bụ usoro aha-windo OSC), ma debe ahịrị 50 ikpeazụ, ebe a
   na-achịkọta ahịrị ndị na-emegharị n'usoro ka ha bụrụ otu. N'ihi na nyocha a na-agba
   tupu `json` na `errorMessage`, mmepụta JSON ma ọ bụ njehie nwere `$` dị otu a
   agaghị erute ha ma `shellOutput` dị ọkụ.
4. **`json`**: a na-achịkọta payload JSON karịrị mkpụrụedemede 2,000 nke ji `{` ma ọ bụ
   `[` bido (mgbe whitespace nhọrọ gasịrị) ma nwee ike ịparse: array nwere ihe karịrị
   7 na-edobe ihe 5 mbụ na ihe 2 ikpeazụ tinyere ngụkọta ọnụọgụ ya, object na-edobekwa
   key 20 mbụ, ebe a na-eji placeholder `{…N keys}` dochie uru object ma ọ bụ array
   ọ bụla dị n'ime ya (maka array, N bụ ogologo ya), tinyere akara `_remaining_<N>_keys`
   nke na-agụ key ndị a tụfuru gafee 20 mbụ. A na-eṅomi scalar value n'uju, ya mere
   object nwere key 20 ma ọ bụ ihe na-erughị ya nke na-enweghị uru ndị dị n'ime naanị
   ka a na-emegharị indent ya — nke e minify-rị na-enwetakwu mkpụrụedemede ma nọgide
   na-agbanweghị.
5. **`errorMessage`**: mmepụta nwere, n'ebe ọ bụla na n'ụdị nnukwu ma ọ bụ obere
   mkpụrụedemede ọ bụla, `error:`, `error ` (okwu ahụ nke oghere na-esochi, dịka na
   `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ma ọ bụ
   `traceback` na-edobe ahịrị mbụ ya, ahịrị 10 na-esote na ahịrị 3 ikpeazụ, ebe a
   na-etinye akara `… [N frames elided] …` n'ọnọdụ ahịrị ndị dị n'etiti ha. Akara ahụ
   na-apụta naanị mgbe ihe karịrị ahịrị 13 sochiri ahịrị mbụ, ya mere a naghị ebelata
   mmepụta njehie nwere ahịrị 14 ma ọ bụ ihe na-erughị ya (n'ahịrị 12 ma ọ bụ 13,
   ahịrị 3 ikpeazụ na-emegharị ahịrị ndị e debelarị).

Mgbe usoro dabara, ọbụlagodi nke na-echekwaghị ihe ọ bụla, a naghị anwale usoro ndị
na-esote. Mgbe usoro dabara adịghị echekwa token e mere atụmatụ ya (ogologo ÷ 4, e buliri
ya ruo integer na-esote) — dịka ọmụmaatụ faịlụ yiri koodu nwere ahịrị 25 ma ọ bụ ihe
na-erughị ya, ma ọ bụ array JSON karịrị mkpụrụedemede 2,000 nwere ihe 7 ma ọ bụ ihe
na-erughị ya — engine aggressive na-edobe nsonaazụ ngwaọrụ mbụ: ndị na-akpọ ya abụọ
(`compressAggressive()` na `compressAnthropicToolResultBlock()`) na-edobe nke mbụ mgbe
`saved` bụ 0 ma ọ bụ ihe na-erughị ya, ebe `compressToolResult()` n'onwe ya ka na-eweghachi
mmepụta usoro ahụ. Nzọụkwụ nsonaazụ-ngwaọrụ abụghị mkpebi ikpeazụ: fallback summarizer
nke engine ka nwere ike ibelata ozi `tool` ma ọ bụ `function` nke karịrị mkpụrụedemede
8,192 (`maxTokensPerMessage`, 2,048, ugboro 4).

#### Mgbe e kwesịrị iji ya

Mkpakọ nsonaazụ ngwaọrụ bụ nzọụkwụ 1 nke engine aggressive (`compressAggressive()` dị na
`open-sse/services/compression/aggressive.ts`), ya mere ọ na-agba na mode Aggressive na
na nzọụkwụ `aggressive` nke pipeline agbakọtara. Ọ na-akpakọ ozi `tool` na `function`
nwere ọdịdị OpenAI, yana ederede dị n'ime block `tool_result` nke Anthropic. Usoro ọ bụla
nwere switch nke ya n'okpuru `aggressive.toolStrategies`, a na-agbanye ha niile na
ndabara. Na dashboard, switch ndị ahụ dị na nlele **Advanced** nke ibe Caveman mgbe
mkpakọ dị ọkụ ma mode ndabara bụ Aggressive.

### Pipeline Agbakọtara

Mode stacked na-agba **ọtụtụ engine n'usoro** — ọtụtụ mgbe RTK na-ebu ụzọ
(nchekwa 60-90% na mmepụta ngwaọrụ), Caveman esozie na ederede fọdụrụ (~46% nchekwa
ntinye). Mgbe e jikọtara ha, nke ahụ bụ **oke 78-95% nke ruru eru** (lee Mgbakọ Nchekwa
Upstream dị n'elu): `1 - (1 - 0.60..0.90) × (1 - 0.46)` na-enye nkezi ≈89%.

#### Otu o si arụ ọrụ

```
Ntinye (token 1000)
  → RTK (ihe nzacha maara command) → token 200
    → Caveman (iwepụ ihe mmeju) → token 108
  → Mmepụta (token 108, ~89% nchekwa)
```

#### Mgbe e kwesịrị iji ya

Jiri mode stacked maka:

- Usoro ọrụ ndị ji ngwa ọrụ nke ukwuu (agentic coding, nyocha)
- Nhazi batch nke na-elebara ọnụ ahịa anya
- Mgbe ịchọrọ nchekwa token kachasị elu

A na-ahazi pipeline stacked site na ntọala mkpakọ zuru ụwa ọnụ `stackedPipeline`,
ma ọ bụ site na combo mkpakọ nwere aha e kenyere routing combo (lee
Override Kwa-Combo dị n'elu) — ọ bụghị site na `modePack` nke auto-combo (field ahụ
na-agbanwe naanị ibu nhọrọ model nke auto-combo, `stacked` abụghịkwa aha pack ziri ezi).

---

## Mgbanwe Ndị Na-emeri Ntọala Mkpakọ Maka Combo

Ị nwere ike ịgbanwe ọnọdụ mkpakọ zuru ụwa ọnụ **maka combo ọ bụla** iji hazie omume nke ọma
maka ojiji dị iche iche:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Nke a bara uru maka:

- **Combo ide koodu**: Jiri ọnọdụ `aggressive` maka oge ọrụ dị ogologo
- **Combo ajụjụ na azịza ngwa ngwa**: Jiri ọnọdụ `lite` maka nzaghachi ngwa ngwa
- **Combo ndị na-eji ọtụtụ ngwaọrụ**: Jiri ọnọdụ `stacked` iji nweta nchekwa kachasị
- **Combo mmepụta**: hapụ mgbanwe na-emeri ntọala ka ọ ghara ịrụ ọrụ maka ndị na-eweta caching — nhazi cache-aware nke na-arụ ọrụ mgbe niile na-agbadata `aggressive`/`ultra` gaa na `standard` na-akpaghị aka
  (enweghị ọnọdụ `cache-aware` a pụrụ ịhọrọ)

---

## Leekwa

- [Nhazi Environment](../reference/ENVIRONMENT.md) — Mgbanwe environment maka mkpakọ
- [Nduzi Architecture](../architecture/ARCHITECTURE.md) — Ọrụ ime pipeline mkpakọ
- [Nduzi Onye Ọrụ](../guides/USER_GUIDE.md) — Otu esi amalite iji mkpakọ
- [Mkpakọ RTK](./RTK_COMPRESSION.md) — Ihe nzacha RTK, usoro ntụkwasị obi, verify gate, na iweghachite raw-output
- [Injin Mkpakọ](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, na dashboard
- [Ụdị Iwu Mkpakọ](./COMPRESSION_RULES_FORMAT.md) — Ụdị ngwugwu iwu JSON
- [Ngwugwu Asụsụ Mkpakọ](./COMPRESSION_LANGUAGE_PACKS.md) — Iwu Caveman ndị ahaziri maka asụsụ dị iche iche
