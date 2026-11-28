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

## Ụdị Mkpakọ

### Gbanyụọ

A naghị etinye mkpakọ. Ozi niile na-agafe n’agbanweghị ha.

### Ụdị Lite (~15% nchekwa, <1ms latency)

Ụdị kachasị nchebe — nhicha nhazi. Mbibi nsonaazụ ngwaọrụ na-atụfu ụfọdụ data, yabụ ụzọ ndabara
(enweghị `allow-lossy`, `engine:lite` ma ọ bụ nnabata `named-combo`) na-arụ `lite` na
`compressToolResults: false`: nsonaazụ ngwaọrụ ndị gara aga na-erute onye na-eweta ọrụ ahụ n’agbanweghị ha.

| Usoro                    | Nkọwa                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Jikọta ahịrị oghere ndị na-esochi onwe ha na oghere ndị dị na njedebe                                |
| `dedupSystemPrompt`      | Wepụ ozi sistemụ ndị kwughachiri onwe ha                                                             |
| `compressToolResults`    | Belata nsonaazụ ngwaọrụ ndị gara aga ruo na oke `lite` (na-atụfu data: naanị mgbe arịrịọ kwadoro ya) |
| `removeRedundantContent` | Wepụ ntuziaka ndị a kwughachiri onwe ha                                                              |
| `replaceImageUrls`       | Mee ka data URI onyonyo base64 dị mkpụmkpụ                                                           |

**Kachasị mma maka:** Ojiji na-agba mgbe niile, usoro ọrụ dị oke mkpa n’ihe gbasara nchebe.

### Ụdị Standard (~30% nchekwa)

Nke sitere n’ike mmụọ nsọ [Caveman](https://github.com/JuliusBrussee/caveman) — na-ewepụ okwu jupụtara na ederede na nkọwa ogologo ebe ọ na-echekwa ihe ọ pụtara:

- Na-ewepụ okwu ndochi ("please", "I think", "basically", "actually")
- Na-eme ka ahịrịokwu ogologo dị mkpụmkpụ ("in order to" → "to", "as a result of" → "because")
- Na-ewepụ okwu nkwanye ùgwù na-eme ka nkwupụta ghara ịdị ike ("Would you mind...", "If you could possibly...")
- Iwu regex karịrị 30 ahaziri maka mkpali mmemme

**Kachasị mma maka:** Usoro ọrụ mmemme kwa ụbọchị, otu ndị na-elekwasị anya n’ibelata ụgwọ.

### Ụdị Aggressive (~50% nchekwa)

Njikwa akụkọ ihe mere eme nwere ọgụgụ isi maka nnọkọ ogologo:

- **Ịka nká ozi** — ozi ndị ochie na-enweta mkpakọ na-arịwanye elu
- **Mkpakọ nsonaazụ ngwaọrụ** — a na-egbutu ma ọ bụ wepụ akụkụ nke nsonaazụ ngwaọrụ ndị toro ogologo (ahịrị mbụ/ikpeazụ,
  nzacha ahịrị dabara, mkpakọ igodo JSON)
- **Nchekwa iguzosi ike n’usoro** — na-ahụ na ụzọ abụọ `tool_use` + `tool_result` na-anọgide na-agbanwe agbanwe
- **Ịmara windo gburugburu** — na-asọpụrụ oke token nke ụdị ọ bụla

**Kachasị mma maka:** Nnọkọ mmezi njehie gbatịrị agbatị, ebe koodu buru ibu.

### Ụdị Ultra (~75% nchekwa)

Mkpakọ kachasị elu maka ọnọdụ ndị token bụ isi:

- **Mbelata dabere na heuristic** — mbelata token nke ederede nkọwa dabere na akara
- **Idobe nhazi** — a na-akara ngọngọ koodu nwere ogige, koodu dị n’ime ahịrị, URL na njirimara, ma jikọta ha ọzọ n’otu n’otu, anaghị ewepụ ha
- **Ọkwa SLM nhọrọ** — obere ụdị mpaghara nwere ike imezi mbelata ahụ mgbe ahaziri ya
- Ọ na-adabereghị na Ụdị Aggressive: ọ naghị arụ ịka nká ozi, mkpakọ nsonaazụ ngwaọrụ
  ma ọ bụ onye nchịkọta ndabere (naanị ọdịda ọkwa SLM nwere ike ibuga usoro ndabere site na aggressive)

**Kachasị mma maka:** Mgbe ị na-erute oke gburugburu ugboro ugboro.

### Ụdị RTK (60-90% oke nke upstream)

A haziri Ụdị RTK maka nsonaazụ ngwaọrụ ndị toro ogologo na-apụta na nnọkọ coding-agent:

- Na-achọpụta klaasị iwu/nsonaazụ dịka `git status`, `git diff`, `git log`, ndị na-agba ule,
  nrụpụta TypeScript/Vite/Webpack, ESLint/Biome/Prettier, nyocha/ntinye npm, ndekọ Docker, nsonaazụ infra,
  na nsonaazụ shell izugbe
- Na-etinye ngwugwu nzacha JSON sitere na `open-sse/services/compression/engines/rtk/filters/`
- Na-ebubata nzacha schema RTK TOML v1 site na faịlụ `filters.toml` nke ọrụ ma ọ bụ nke zuru ụwa ọnụ, na nkwado
  inline-test na njikwa ntụkwasị obi maka faịlụ ọrụ
- Na-ebufe nzacha 56 arụnyere n’ime ya nwere nlele inline verify
- Na-ewepụ usoro njikwa ANSI, ogwe ọganihu, ahịrị ndị kwughachiri onwe ha, na mkpọtụ na-enweghị ihe a ga-eme
- Na-echekwa ọdịda, njehie, ịdọ aka ná ntị, faịlụ gbanwere, nchịkọta, na ọdụ nke nsonaazụ ogologo
- Na-akwado nzacha ọrụ nke njikwa ntụkwasị obi, nzacha zuru ụwa ọnụ, na mgbake nsonaazụ raw nke nhọrọ nke e kpuchiri ihe nzuzo

**Kachasị mma maka:** Nnọkọ agent nwere transcripts nke shell, build, test, git, grep, na nsonaazụ faịlụ.

### Ụdị Stacked (78-95% oke ruru eru)

Ụdị Stacked na-agba ọtụtụ igwe mkpakọ n’usoro a kara aka. Pipeline ndabara bụ:

```txt
RTK -> Caveman
```

Usoro ahụ na-eme ka nsonaazụ terminal/ngwaọrụ dị mkpụmkpụ mbụ, ma mesịa tinye mkpụmkpụ ihe ọmụmụ nke Caveman
na mkpali asụsụ mmadụ nke fọdụrụ. Enwere ike ịhazi pipeline Stacked n’uju ụwa ma ọ bụ site na ngwakọta mkpakọ
e kenyere ngwakọta nhazi ụzọ.

**Kachasị mma maka:** Gwakọtara gburugburu nwere ndekọ ngwaọrụ buru ibu yana ntuziaka mmadụ ma ọ bụ nchịkọta onye enyemaka.

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

- **Caveman** — nhọrọ ọnọdụ, ngwugwu asụsụ, nlele tupu ebipụta, na ndabara zuru ụwa ọnụ
- **RTK** — nlele nzacha iwu, ntọala nchekwa RTK, na katalọgụ nzacha
- **Compression Combos** — pipeline engine ndị nwere aha e kenyere ngwakọta nhazi ụzọ
- **Auto-Trigger Threshold** — malite mkpakọ na-akpaghị aka mgbe ọnụ ọgụgụ token karịrị oke

### Ndochi nke Combo n'otu n'otu

Na `Dashboard → Context & Cache → Compression Combos`, kenye ngwakọta mkpakọ na ngwakọta nhazi ụzọ:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Nke a na-enye gị ohere iji mkpakọ a chịkọtara n'elu ndị na-enye ọrụ n'efu/coding, ebe ị na-edobe lite mode na ndenye aha akwụ ụgwọ.

Ndochi a nke "Per-Combo Override" bụ njikwa dị iche na ndochi **routing-combo compression mode** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schema nke ubi ahụ na-anabatakwa `rtk`, `stacked` na `omniglyph`) — ndochi ahụ anaghị ahọrọ pipeline compression-combo nwere aha; ọ na-edobe naanị ubi `compressionMode` nke `resolveCompressionPlan` na-eji. Enwere ike ịtọ ya na kaadị combo (`Dashboard → Combos`) ma ọ bụ, kemgbe #6760, maka ngwakọta nhazi ụzọ ọ bụla n'ime ndepụta "Assign to routing" dị na `Dashboard → Context & Cache → Compression Combos`, n'akụkụ aka nri nke igbe nhọrọ pipeline-assignment a kọwara n'elu. Ebe abụọ a na-echekwa mgbanwe site n'otu endpoint `PUT /api/combos/{id}` ahụ.

### Ndochi kwa-arịrịọ

Zipụ isi arịrịọ `x-omniroute-compression` iji dochie atụmatụ mkpakọ maka otu arịrịọ. Ọ nwere ụzọ kachasị elu — ọ na-emeri ndochi routing-combo, profaịlụ nọ n'ọrụ, auto-trigger, na panel Default. A na-eleghara ụkpụrụ amaghị ama anya (anaghị ajụ arịrịọ ahụ ma ọlị), ma mgba ọkụ nna ukwu zuru ụwa ọnụ ka na-achịkwa ihe niile: mgbe mkpakọ gbanyụrụ n'ụwa niile, isi arịrịọ ahụ enweghị ike ịgbanye ya. Ụkpụrụ ndị dị:

| Value         | Effect                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `off`         | Enweghị mkpakọ maka arịrịọ a.                                                                                        |
| `default`     | Profaịlụ Default nke panel wepụtara (ọ naghị elekọta profaịlụ nọ n'ọrụ). A na-ahapụ engines lossy ka ha gbanyụọ.     |
| `safe`        | Otu ihe ahụ dị ka ịhapụ isi arịrịọ ahụ.                                                                              |
| `allow-lossy` | Debe atụmatụ operator nke arịrịọ a, gụnyere nchịkọta, nzacha relevance, na mgbanwe ụdị.                              |
| `engine:<id>` | Otu engine mgbe agbanyere ya, dịka `engine:rtk`. Nke a bụ opt-in kwa-arịrịọ maka engine ahụ.                         |
| `<combo>`     | Combo nwere aha, a na-achọta ya site n'aha (na-eleghara nnukwu/obere mkpụrụedemede anya) nke mbụ, emesịa site na id. |

Enweghị `allow-lossy`, `engine:<id>`, ma ọ bụ combo nwere aha, a naghị etinye engines lossy. Mgbe a wedatara Default lossy, auto-trigger, ma ọ bụ routing override, OmniRoute na-edobe usoro lossless ndị a matara site na pipeline stacked ahaziri ahazi n'usoro ahaziri ahazi. Ọ na-alaghachi na `session-dedup → lite` naanị mgbe enweghị nzọụkwụ lossless ahaziri ahazi lanarịrị.

Nlele **Effective pipeline** nke Settings panel na-egosi atụmatụ nkịtị nke a na-eji mgbe usoro na-adịghị arụ ọrụ. Mgbe auto-trigger nwere ike ịgba ọsọ, otu nlele ahụ na-egosikwa pipeline effective nke nwere ọnọdụ ya, ka panel na mkpebi runtime na-enweghị isi arịrịọ wee nọgide kwekọọ.

A na-ezipụghachi atụmatụ etinyere n'isi nzaghachi `X-OmniRoute-Compression: <mode>; source=<source>`, ebe `<source>` bụ otu n'ime `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, ma ọ bụ `off`.

### API

```bash
# Nweta ntọala mkpakọ
curl http://localhost:20128/api/settings/compression

# Melite ntọala mkpakọ
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Nlele payload RTK/stacked a kapịrị ọnụ
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

## Sistemụ mkpakọ dị elu

Ewezuga ụdịdị 7 akọwara n'elu (isi iyi ahụ na-anabatakwa ụdị `codex-responses` na `omniglyph`, nke ntuziaka a anaghị ekpuchi), akụkụ ndị dị n'okpuru mkpuchi mkpuchi na-arụ ọrụ n'ime ma ọ bụ n'akụkụ ụdịdị ndị ahụ: Nrụpụta Nrụpụta Ngwá Ọrụ na Ọganihu Ọganihu bụ nzọụkwụ 1 na 2 nke engine ike ike (ọnọdụ ike na `aggressive` nzọụkwụ nke pipeline stacked), ka Stacked-Compression pipeline si arụ ọrụ. na-eweda `aggressive` na `ultra` na `standard` maka ndị na-eweta caching mgbe mkpakọ na-aga, yana ọnọdụ mmepụta Caveman na ụdị mmepụta Nwepu na-abanye na ntuziaka ngwa ngwa, gbanyụọ na ndabara, na-akpụpụta mmepụta ihe nlereanya kama ịpịkọta arịrịọ ahụ.

### Cache-Aware mkpakọ

Nkwado ụfọdụ ndị na-eweta (dị ka Anthropic nwere caching ozugbo).** ngwa ngwa caching** , nke na-ahapụ ha ka ha chekwaa akụkụ nke ngwa ngwa iji belata ọnụ ahịa na latency. Mgbe agbanyere caching, mkpakọ ike nwere ike n'ezie** merụọ ahụ** arụmọrụ n'ihi na ọ na-agbanwe akara ngosi echekwara, na-emebi cache ahụ.

Modul `cachingAware.ts` na-edozi nke a site na** na-achọpụta ọnọdụ caching** na** na-edozi atụmatụ mkpakọ** ya mere.

#### Ka o si arụ ọrụ

1. **Choputa onodu nchikota** — na-enyocha ahụ arịrịọ maka akara `cache_control`
2. **Chọpụta ndị na-eweta caching** — Na-enyocha ma ọ bụrụ na onye na-eweta ebumnuche kwadoro caching
3. **Gbanwee atụmatụ** — wedata `aggressive`/`ultra` ka ọ bụrụ `standard` maka ndị na-eweta caching
4. **Mafere ngwa ngwa sistemụ** — A na-echekwa ihe mkpali sistemu na-echekwa ya, yabụ achịkọtala ha

Onye inyeaka atụmatụ na-eweghachikwa ọkọlọtọ `deterministicOnly`, mana onye na-ewu atụmatụ na-eri naanị atụmatụ — ọ nweghị ihe na-agụ ọkọlọtọ taa.

#### Ihe atụ koodu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Mgbe iji

mkpakọ na-ahụ maka cache bụ** mgbe niile na** — enweghị nhazi achọrọ. Ọ na-amalite mgbe ọ bụla mkpakọ dị na onye na-eweta ya na-akwado caching ozugbo (Anthropic, OpenAI, wdg); Achọghị akara `cache_control` doro anya — onye na-eweta caching naanị na-ebute mbelata, na naanị akara akara anaghị eme (nchọpụta akara na-enye cache telemetry, ọ bụghị mkpebi atụmatụ).

OpenRouter na-agụta dị ka onye na-eweta caching naanị maka ụdị `anthropic/*` : Arịrịọ koodu Claude na-edobe ebe nkwụsịtụ `cache_control` ha (4 na ọtụtụ) na onye nche na-echekwa prefix, ebe ezinụlọ OpenRouter ọ bụla ọzọ (`openai/`, `google/`, `qwen/`, ...) na-anọpụ iche na echeghị ya.

### Ịka nká na-aga n'ihu

Mkparịta ụka ogologo na-achịkọta ọtụtụ ntụgharị ozi, mana ntụgharị ndị okenye na-adịchaghị mkpa. Modul `progressiveAging.ts`** na-eweda ozi site n'ebe dị anya** (anya tụrụ site na njedebe nke mkparịta ụka). Site na ndabara mbupu (`verbatim: 2, light: 2, moderate: 3`):

- **Ntụgharị 2 ikpeazụ (anya ≤ 2)** : Anọgidere n'okwu ọnụ
- **Anya 3** : Caveman mkpakọ (mwepụ ihe ndozi)
- **Anya 4 +** : Achịkọta ozi enyemaka; ozi ndị ọrụ belatara n'ahịrị nke mbụ ha, kpuchie na mkpụrụedemede 120; ọrụ ndị ọzọ emetụghị aka. A na-edobe mkpagharị sistemụ, ozi emegorolarị yana ozi onye ọrụ kachasị ọhụrụ na-ekwu okwu mgbe niile n'agbanyeghị ebe dị anya. Ọ dịghị ihe ọ bụla a kwụsịrị kpamkpam, na `light` band enweghị ike iru ya na ndabara mbupu (`light` nhata `verbatim`).

#### Ihe atụ koodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Mgbe iji

Ịka nká na-aga n'ihu bụ** mgbe niile na** maka `aggressive` mode — ọ bụ nzọụkwụ 2 nke `compressAggressive()`. Ultra mode anaghị arụ ọrụ ya. Ọ dị irè karịsịa maka:

- Oge ntinye koodu na-adịte aka
- Mkparịta ụka ọtụtụ ụbọchị
- Agentdị workflows nwere ọtụtụ oku ngwaọrụ

### Ụdị mmepụta Caveman

Ụdị mmepụta Caveman na-agbakwụnye** usoro ozugbo ntuziaka** nke na-ajụ ihe nlereanya n'onwe ya maka mmepụta terse — ọkwa `lite` na-ajụ azịza nkenke nke na-edobe ahịrịokwu zuru oke, `full` na-ajụ ya ka ọ "zaghachi terse dị ka smart caveman", `ultra` na-ajụ maka mmepụta telegraph; ntuziaka na-ajụ naanị, ha enweghị ike ikwe ya. Arịrịọ na-enweta ha site na `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` buru ụzọ dozie nhọrọ ahụ na azụ-compat shim (`resolveOutputStyleSelection()` na `open-sse/services/compression/outputStyles/backCompat.ts`), nke, mgbe `outputStyles` bụ ihe efu, maapụ `cavemanOutputMode` enyere aka na ụdị mmepụta `terse-prose` na `cavemanOutputMode.intensity` (lee Back-compat n'okpuru); a na-eji nhọrọ `outputStyles` na-adịghị efu eme ihe dị ka ọ dị, ma `cavemanOutputMode.enabled` na `intensity` enweghị mmetụta, ebe ngbanwe `autoClarity` ya ka na-emetụta. `outputMode.ts` na-ejide ederede ntụziaka (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), ngafe ọdịnaya yana onye inyeaka ntinye nke injection na-eji; injector `applyCavemanOutputMode()` nke ya enweghị onye na-akpọ mmepụta.

#### Ka o si arụ ọrụ

Nke a mode anaghị mpikota onu ntinye. Ọ na-agbakwụnye ngọngọ ntụziaka na ngwa ngwa usoro (lee otú injection si arụ ọrụ n'okpuru ebe a), na ọnọdụ ntinye ntinye ọ bụla ahọpụtara maka arịrịọ ahụ ka na-aga n'ihu, n'ahụ nke na-ebu ngọngọ ugbu a. N'ihu nkebiokwu oke oke nke ọkwa ọ bụla na-ejedebe, ọkwa `full` Bekee gụrụ:

> "Na-aza terse dị ka smart caveman. Drop articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries, hedging. Mpekere OK. Short synonyms (nnukwu adịghị obosara, idozi adịghị emejuputa). Debe niile teknuzu umi, koodu, njehie, URLs, identifiers kpọmkwem. "

Nke a na-arụ ọrụ nke ọma maka:

- Ọgbọ koodu (mpụta terser = ole na ole token)
- Q&A ngwa ngwa (ọ dịghị mkpa maka nkọwa sara mbara)
- Nhazi ogbe (bulie oke ntinye)

#### Mgbe iji

Ụdị mmepụta Caveman bụ** Nwepu** . Na mkpakọ na (`enabled: true`, nna ukwu na-atụgharị na ibe Ntọala mkpakọ), gbanye ya na `cavemanOutputMode.enabled`; `intensity` na-ahọrọ `lite`, `full` ma ọ bụ `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Ngwakọta mkpakọ** Ụdị mmepụta** toggle (`outputMode`, larịị na `outputModeIntensity`) na-edobe otu mgba ọkụ maka arịrịọ ndị combo metụtara, na `omniroute_set_compression_engine` MCP ngwá ọrụ na-ede ya site na arụmụka boolean `outputMode` ya. Nhọrọ `outputStyles` na-adịghị efu na-ebute ụzọ karịa mgba ọkụ a. Na dashboard, na-enyere aka** Akwụkwọ akụkọ** Ụdị mmepụta na-agbanye otu ngọngọ (lee Ụdị mmepụta n'okpuru).

### Ụdị mmepụta (katalọgụ)

Ụdị mmepụta Caveman dị n'elu bụ** ụzọ otu ụdị nke ketara** . Nkeji 4 chịkọtara ya n'ime katalọgụ nke ụdị mmepụta enwere ike ịmekọrịta: `OUTPUT_STYLE_CATALOG` na `open-sse/services/compression/outputStyles/catalog.ts`. Ụdị ọ bụla bụ ntụziaka ngwa ngwa nke na-ajụ ihe nlereanya n'onwe ya maka mmepụta dị ọnụ ala; Enwere ike ịmekọrịta ụdị ọnụ ma tinye ya n'usoro katalọgụ.

| Ụdị                                     | `id`            | Ihe ọ na-eme                                                                                                                                                                                                                                                    | Asụsụ ntụziaka                                |
| --------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Akwụkwọ akụkọ                           | `terse-prose`   | Wepu filler/articles/hedging; na-teknuzu umi kpọmkwem. Otu ederede dị ka ụdị mmepụta ọgba ọgba tum tum (atụnyere aka, ọ bụghịkwa edegharị).                                                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Obere koodu                             | `less-code`     | YAGNI ubube: kacha nta na-arụ ọrụ mgbanwe, enweghị abstractions achọghị.                                                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (ndị umengwụ agadi dev)        | `ponytail`      | "koodu kachasị mma bụ koodu edeghị ede": megharịa > rewrite, mgbọrọgwụ kpatara > akara, kacha dị mkpụmkpụ na-arụ ọrụ dị iche.                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Enwere ADHD (omume-mbụ)                 | `i-have-adhd`   | Omume mbụ (command/path/snippet tupu prose), nzọụkwụ nwere oke ọnụ, ONE ihe nzọụkwụ ọzọ, enweghị preamble/recap/closers. emetere na [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI nyo                         | `antislop-ui`   | Usoro ọ bụla a na-ahụ anya ga-agafe ule ebumnuche (ndị isi, njirimara, ịgụ ihe); enweghị ndabara gradients/glass/glow, palette mkpuchi, enweghị nhazi ndebiri. Ụdị antislop abụọ a na-agbakwunye oke njikwa enweghị-anwụ anwụ / enweghị arụpụtara-oke nkwupụta. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mpempe akwụkwọ Antislop na nzacha mmadụ | `antislop-copy` | Mpempe akwụkwọ akọwapụtara (enweghị em dash, jeneriki CTAs, buzzwords, chatbot closers, chepụtara eziokwu) gbakwunyere iwu ndị mmadụ: ọdịiche WCAG AA, anya a na-ahụ anya, iru ahụigodo, steeti empty/loading/error, mgbagharị ekwentị.                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                        | `terse-cjk`     | azịza `full`/`ultra` n'asụsụ Chinese oge gboo (文言); `lite` na-arịọ naanị maka azịza dị nkenke na-enweghị okwu ọrụ, ihe ụtọ ma ọ bụ ihe ịchọ mma.                                                                                                              | zh (mpaghara-gated, lee n'okpuru)             |

Ụdị ọ bụla na-ebufe ọkwa atọ ike — `lite`, `full`, `ultra` — na ọkwa ọ bụla na-ejedebe na njedebe nkekọrịta oke (`SHARED_BOUNDARIES` na `outputMode.ts`), nke na-echekwa koodu ngọngọ, ụzọ faịlụ, iwu, njehie na URLs kpọmkwem. Ederede ọkwa `terse-prose` na `terse-cjk` na-agbakwunye ihe nchọpụta na ndepụta ahụ.

`terse-cjk` bụ mpaghara-gated ruo `zh` n'ebe abụọ. Ibe ntọala mkpakọ na-edepụta ahịrị ya naanị mgbe asụsụ UI dashboard bụ Chinese (`zh-CN` ma ọ bụ `zh-TW`), na `applyOutputStyles()` na-agbanye ya naanị mgbe asụsụ edoziziri arịrịọ (lee nhọrọ asụsụ n'okpuru) bụ `zh`. Izochi ahịrị anaghị ekpochapụ nhọrọ `terse-cjk` echekwara: ntọala API na-anabata id ụdị ọ bụla, yana ichekwa ụdị ndị ọzọ na ibe ahụ na-edobe ya. N'oge arịrịọ, nlele asụsụ `applyOutputStyles()` bụ naanị ọnụ ụzọ mpaghara.

#### Kedu ka injection si arụ ọrụ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) na-edozi nhọrọ ahụ megide katalọgụ (ids amaghi ama na ụdị ndị na-emegiderịta onwe ya na-adaba, ọ dịghị mgbe ọ bụla njehie; nhọrọ nke na-ekpebi na ọ dịghị ụdị na-ahapụ ahụ adịghị agbanwe agbanwe, wụsara dị ka `no_styles`), na-ejikọta ntụziaka ndị ahọpụtara n'usoro katalọgụ, na-etinye aka na njedebe oke.** otu ugboro** (gbakwunyere nkebi nchekwa, `SAFETY_BOUNDARIES` ma ọ bụ ntụgharị ya, mgbe ahọpụtara `less-code` ma ọ bụ `ponytail` ), wee malite ngọngọ ahụ site na otu akara idempotency (`[OmniRoute Output Styles]`), ya mere itinyegharị ya bụ enweghị-op. Mgbe asụsụ edoziziri (lee nhọrọ Asụsụ dị n'okpuru) nwere ntụgharị asụsụ, a na-agbanye nkuzi mpaghara kama ịbụ Bekee.

N'elu ahụ nke nwere ụdị `messages` na-adịghị efu, nlele idempotency na-agba ọsọ tupu ọdịnaya gafere: mgbe akara `[OmniRoute Output Styles]` abanyelarị n'ọhịa `system` dị elu (eriri ma ọ bụ ihe mgbochi ọdịnaya) ma ọ bụ na ozi sistemụ nwere ọdịnaya eriri, a na-ahapụ ahụ ahụ na-agbanweghị ka `already_applied` na enweghị nyocha isiokwu na-agba ọsọ. Ma ọ bụghị ya, ngafe ọdịnaya (`shouldBypassCavemanOutputMode()` na `open-sse/services/compression/outputMode.ts`) na-enyocha ederede nke ozi atọ ikpeazụ, ihe ọ bụla ọrụ ha na-arụ, ma na-awụpụ ụdị ahụ maka oge dum mgbe ederede ahụ dabara na nchekwa ya, ihe omume ma ọ bụ okwu nkọwa, ma ọ bụ usoro nwere mmetụta: `first`, `then`, `after that`, `before`, `rollback` n'ime `delete` agwa `backup` `drop`, `migrate` ma ọ bụ `deploy` `release` The bypass na-agba ọsọ mgbe** Gafefe doro anya na akpaaka** ngbanwe (`cavemanOutputMode.autoClarity`, na ndabara) dị; ịgbanyụ mgbanyụ ọkụ na-amapụ nlele isiokwu.

Mgbe ngafe ahụ na-ahapụ ntụgharị ahụ, `placeSystemInstruction()` (otu faịlụ), nke na-emepụtaghị `messages[0]` ọhụrụ, na-etinye ngọngọ na nke mbụ n'ime ihe ndị a:

1. Ozi usoro na-eduga na ọdịnaya eriri: a na-agbakwunye ngọngọ ahụ mgbe ederede ya gasịrị.
2. Ogige `system` dị elu: a na-agbakwunye ngọngọ ahụ mgbe ederede nke eriri, ma ọ bụ gbakwunyere dị ka ngọngọ ederede ọhụrụ na nhazi ihe mgbochi ọdịnaya.
3. Ozi sistemụ izizi nke nwere ọdịnaya eriri: a na-agbakwunye ngọngọ mgbe ederede ya gasịrị.
4. Ọ dịghị nke dị n'elu: ngọngọ na-abanye na ozi usoro ọhụrụ na njedebe nke `messages`.

N'anụ ahụ na-enweghị usoro `messages` (ma ọ bụ nke nwere ihe efu), ọ nweghị ihe ngafe ọ bụla na-agba ọsọ, a naghị elekwa mpaghara `system` ọkwa dị elu. A na-agbakwunye ngọngọ ahụ ka ederede nke eriri `instructions` ubi, ọ gwụla ma mpaghara ahụ enweelarị akara `[OmniRoute Output Styles]`, nke a na-ahapụ ahụ ahụ na-agbanweghị ka `already_applied`. Mgbe ahụ enweghị eriri `instructions` ubi ma na-ebu `input` (eriri ma ọ bụ n'usoro), ngọngọ ahụ na-aghọ `instructions`, dochie uru ọ bụla na-abụghị eriri nke ubi ahụ ejidere. Ahụ na-enweghị eriri `instructions` ubi ma ọ bụ eriri ma ọ bụ n'usoro `input` na-ahapụ agbanweghi agbanwe wee maafe dị ka `no_messages`.

#### Otu esi eme ya

Na dashboard:** → mkpakọ ọnọdụ** (`/dashboard/context/settings`), ngalaba ụdị mmepụta: otu ahịrị n'ụdị ọ bụla nwere ngbanwe on/off na onye na-ahọrọ ọkwa. Ụdị ịgbanye mgbe mkpakọ n'onwe ya dị (ntụgharị isi nke ibe ahụ, `enabled`). Nke** Gafefe doro anya na akpaaka** toggle dị na** onye caveman** ibe (`/dashboard/context/caveman`), na ya** Ụdị mmepụta** kaadị. Na mmemme, nhazi mkpakọ na-aga n'ihu na nhọrọ dị ka:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: mgbe `outputStyles` bụ ihe efu, ihe nketa `cavemanOutputMode.enabled` na-edobe maapụ na `terse-prose` na `cavemanOutputMode.intensity`. Ihe mgbochi ahụ ga-amalite na akara `[OmniRoute Output Styles]`, ebe ihe nketa `applyCavemanOutputMode()` injector dere `[OmniRoute Caveman Output Mode]`. N'okpuru akara ngosi ahụ, ederede dabara na ịgba ọgwụ ike na en, pt-BR, es, de, fr, it, ru, id na vi; na ja na zh ọ na-ebu otu oghere n'ihu nkebiokwu oke. `terse-prose` sụgharịrị n'asụsụ pt-BR, es, de, fr, it, ru, zh, ja, id na vi, yabụ arịrịọ nke asụsụ ya edoziziri bụ `hu` na-enweta ederede Bekee ebe onye injector nketa jiri nke Hungarian ya.

Nhọrọ asụsụ ụdị mmepụta (`resolveOutputStyleLanguage()` na `outputStyles/apply.ts`): na `languageConfig.enabled` na-agbanye, `autoDetect` na-enyocha ozi onye ọrụ kachasị ọhụrụ n'ụdị `messages` nke arịrịọ nke nwere ederede (ọdịnaya eriri, ma ọ bụ `text` nke akụkụ ọdịnaya ya) wee na-agbaba ihe nchọpụta Caveman (`detectCompressionLanguage()`) na ya. Ihe nchọta weghachiri `zh` maka ederede nwere mkpụrụedemede Han na enweghị kana; ma ọ bụghị ya, ọ na-eweghachi nke ọ bụla nke `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` na `id` nwere kacha hint ọkụ, na `en` mgbe ọ bụla — ederede ọ na-enweghị ike nkewa na-enweta English, mgbe `defaultLanguage`, na `vi` adịghị mgbe achọpụtara ọ bụ ezie na ụdị ụgbọ mmiri `vi` ederede. Azịza API ahụ na-edobe ntụgharị ya na `input`, nke na-adịghị atụpụta ya, ya mere ọ na-enweta `defaultLanguage`, wee bụrụ Bekee. Mgbe ọ nweghị ozi onye ọrụ na `messages` nwere ederede, ma ọ bụ na-ewepụ `autoDetect`, `defaultLanguage` na-emetụta, wee bekee. Na `languageConfig.enabled` gbanyụọ, asụsụ a bụ English — ma ọ bụrụ na ngwakọta mkpakọ emetụtara arịrịọ ahụ (nchịkọta nke e kenyere na nhazi nke arịrịọ ahụ, ma ọ bụ nke ndabara combo chatCore daa azụ maka pipeline arụnyere n'ime ya): itinye ngwakọta na-atụgharị `languageConfig.enabled` maka arịrịọ ahụ wee tọọ `defaultLanguage` site na ngwugwu asụsụ ahụ, ma ọ bụrụ na ọ bụ otu ngwugwu asụsụ ahụ. ngwugwu mbụ combo, nke na-adabara na `en`), ebe `autoDetect` echekwara (na ndabara) ka na-emetụta. Igwe ntinye Caveman na-ahọrọ asụsụ iwu-mkpọ ya dị iche iche — kwa akụkụ ederede yana, na-achọpụta onwe ya, gated na `enabledPacks`.

Ụdị matrix asụsụ × a na-atụnye ya site na `tests/unit/compression/output-styles-i18n-matrix.test.ts`: ụdị katalọgụ ọ bụla chọrọ ntinye na `BASELINE_LANGUAGES` ule; ụdị nke na-abụghị mpaghara-gated ga-ebuga ntụgharị pt-BR (nke a ga-ewepụ `terse-cjk` locale-gated na iwu a) ọ gwụla ma edepụtara ya na `KNOWN_ENGLISH_ONLY`, nke nwere ike ijide naanị ụdị na-enweghị ntụgharị ọ bụla — ụdị edepụtara nke nwere ntụgharị ọ bụla dara ule ahụ; na ụdị na-ada ule mgbe ọ tụfuru asụsụ nke ndenye `BASELINE_LANGUAGES` ya depụtara. Iji tinye ụdị, hụ [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Mkpakọ nsonaazụ akụrụngwa

`compressToolResult()` na `open-sse/services/compression/toolResultCompressor.ts` -ejiri chịkọba ederede nsonaazụ ngwaọrụ** 5 atụmatụ** . Ọ na-anwale ha n'usoro a, na atụmatụ enyere aka nke mbụ nke nlele ya dakọtara na ọdịnaya na-ekpebi nsonaazụ ya:

1. **`fileContent`** : ọdịnaya nke 3 ma ọ bụ karịa ahịrị nke ma ọ dịkarịa ala otu ahịrị, na-eleghara eduga indentation, na-amalite na `import `, `export `, `function `, `class `, `const `, `let `, `var ` ma ọ bụ `return ` (okwu ahụ gbakwunyere oghere), ma ọ bụ na `if`, `for` ma ọ bụ `while` sochiri `(` ma ọ bụ ` (` 2, na-edobe nke ikpeazụ.
2. **`grepSearch`** : ọdịnaya na ma ọ dịkarịa ala otu akara nke ụdị `<path>:<digits>:`, ebe ederede tupu colon mbụ enweghị oghere ọcha, na-edebe naanị ahịrị ndị ahụ, ma ọ dịkarịa ala 30, na-esote ọnụ ọgụgụ nke egwuregwu ọ bụla ọzọ na ndepụta nke faịlụ dakọtara; ahịrị ọ bụla ọzọ ka a tụfuru. Otu ahịrị dị otú ahụ ezuru iji kpalite atụmatụ ahụ, yabụ ahịrị log na-amalite na akara timestamp dị ka `12:30:45` nwekwara ọnụ.
3. **`shellOutput`** : mmepụta nke nwere usoro ANSI CSI (`ESC[` wee digits ma ọ bụ semicolons wee akwụkwọ ozi, dịka na koodu agba) ma ọ bụ `$` na-esote oghere ọcha n'ebe ọ bụla n'ime ederede na-efunahụ usoro ndị ahụ (mgbanarị ndị ọzọ, dị ka `ESC[?25l` ma ọ bụ OSC windo aha usoro, ka edobere) ma na-edobe ahịrị 50 ikpeazụ ya, na-adabere na ya. N'ihi na nlele a na-agba tupu `json` na `errorMessage`, JSON ma ọ bụ njehie mmepụta nke nwere ụdị `$` adịghị eru ha mgbe `shellOutput` dị.
4. **`json`** : ibu JSON karịrị mkpụrụedemede 2,000 na-amalite site na `{` ma ọ bụ `[` (mgbe nhọrọ ọcha) na parses na-achịkọta: ọtụtụ ihe karịrị 7 ihe na-edobe ihe mbụ 5 na nke ikpeazụ 2 na mkpokọta ya, ihe na-edobe igodo 20 mbụ ya, na-eji ihe ọ bụla akwụ ụgwọ ma ọ bụ ọnụ ahịa nhazi nke `{…N keys}` ya (maka n'ogologo ya). akara `_remaining_<N>_keys` na-agụta igodo tụdara 20 nke mbụ. A na-eṅomi ụkpụrụ Scalar n'ozuzu ya, yabụ ihe nwere igodo 20 ma ọ bụ ole na ole na-enweghị ụkpụrụ akwụghị ụgwọ ka a na-etinyekwa ya — naanị otu onye na-enweta mkpụrụedemede wee na-agbanwe agbanwe.
5. **`errorMessage`** : mmepụta nke nwere, n'ebe ọ bụla na n'ime akwụkwọ ozi ọ bụla, `error:`, `error ` (okwu na-esote oghere, dịka na `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ma ọ bụ `traceback` na-edobe ahịrị mbụ ya, ahịrị 10 na-esote na nke ikpeazụ 3, na akara `… [N frames elided] …` n'ọnọdụ nke ahịrị dị n'etiti ha. Ihe nrịbama a na-egosi naanị mgbe ihe karịrị ahịrị 13 na-esote ahịrị nke mbụ, yabụ, nsonaazụ njehie nke ahịrị 14 ma ọ bụ nke pere mpe adịghị mkpụmkpụ (na ahịrị 12 ma ọ bụ 13 nke ikpeazụ 3 megharịrị ahịrị edoberelarị).

Mgbe atụmatụ dabara adaba, ọbụlagodi nke na-echekwa ihe ọ bụla, a naghị anwale usoro ndị ọzọ. Mgbe atụmatụ dabara adaba na-echekwa enweghị atụmatụ atụmatụ (ogologo ÷ 4, agbakọta) — dịka ọmụmaatụ faịlụ yiri koodu nke ahịrị 25 ma ọ bụ obere, ma ọ bụ JSON n'usoro ihe karịrị mkpụrụedemede 2,000 nwere ihe 7 ma ọ bụ — ole na ole, injin ike na-edobe nsonaazụ ngwaọrụ mbụ: ma ndị na-akpọ oku (`compressAggressive()` na `compressAnthropicToolResultBlock()`) ka na-alaghachi `saved` n'onwe ya `compressToolResult()` mmepụta atụmatụ. Nzọụkwụ-nsonaazụ ngwá ọrụ abụghị okwu ikpeazụ: nchịkọta ọdịda nke engine ka nwere ike belata ozi `tool` ma ọ bụ `function` ogologo karịa mkpụrụedemede 8,192 (`maxTokensPerMessage`, 2,048, ugboro 4).

#### Mgbe iji

Mkpakọ nsonaazụ ngwaọrụ bụ nzọụkwụ 1 nke injin ike ike (`compressAggressive()` na `open-sse/services/compression/aggressive.ts`), yabụ ọ na-agba ọsọ na ọnọdụ ike na n'usoro `aggressive` nke pipeline. Ọ na-akpakọ OpenAI-ụdị `tool` na ozi `function` yana ederede n'ime Anthropic `tool_result` blocks. Atụmatụ ọ bụla nwere ngbanwe nke ya n'okpuru `aggressive.toolStrategies`, niile na ndabara. N'ime dashboard, mgba ọkụ ndị ahụ dị na ibe Caveman** Nke dị elu** lelee mgbe mkpakọ na-agbanye na ọnọdụ ndabara bụ ike ike.

### Pipeline tokọrọ

Ụdị ekpokọtara na-agba ọsọ** otutu engines n'usoro** — na-emekarị RTK mbụ (60-90% ego na mmepụta ngwá ọrụ), mgbe ahụ Caveman na ederede fọdụrụ (~ 46% ntinye ego). Edere ya, ya bụ** 78-95% oke tozuru oke** (lee Mgbakọ Mgbakọ Ego Mgbago n'elu): nkezi `1 - (1 - 0.60..0.90) × (1 - 0.46)` ≈ 89%.

#### Ka o si arụ ọrụ

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Mgbe iji

Jiri ụdị agbakọtara maka:

- Ngwá ọrụ na-arụ ọrụ dị arọ (ntụgharị koodu, nyocha)
- Nhazi ogbe na-erite uru
- Mgbe ịchọrọ nchekwa ego kacha

A na-ahazi pipeline nke agbakọtara site na ntọala `stackedPipeline` zuru ụwa ọnụ, ma ọ bụ site na ngwakọta mkpakọ akpọrọ aha na-ekenye na combo ntụgharị (lee Per-Combo Override n'elu) — ọ bụghị site na auto-combo `modePack` (ubi ahụ naanị re-weights auto-combo model nhọrọ, na `stacked` abụghị aha mkpọ dabara adaba).

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
