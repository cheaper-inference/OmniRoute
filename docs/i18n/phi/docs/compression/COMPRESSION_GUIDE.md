# 🗜️ Prompt Compression Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Awtomatikong makatipid ng 15-95% sa kwalipikadong konteksto. Para sa mabilisang pangkalahatang-ideya, tingnan ang [seksyong Compression ng README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pangkalahatang-ideya

Nagpapatupad ang OmniRoute ng modular na pipeline para sa prompt compression na tumatakbo nang **proaktibo** bago makarating ang mga kahilingan sa mga upstream provider. Nangangahulugan itong transparent na nangyayari ang iyong pagtitipid sa token — walang kailangang baguhin sa iyong workflow.

```
Kahilingan ng Client
  → Tagapili ng Diskarte sa Compression
    → May override ba sa combo? → Gamitin ang setting ng combo
    → Naabot ba ang threshold ng awtomatikong pag-trigger? → Gamitin ang auto mode
    → Default mode? → Gamitin ang global na setting
    → Naka-off? → Laktawan ang compression
  → Napiling Compression Mode
    → Off: Walang compression
    → Lite: Ligtas na paglilinis ng whitespace/pag-format (~15%)
    → Standard: Pag-aalis ng mga salitang palaman gamit ang Caveman-speak (~30%)
    → Aggressive: Pagpapatanda ng history + pagbubuod (~50%)
    → Ultra: Heuristic pruning + pagpapagaan ng mga code block (~75%)
    → RTK: Pag-filter ng terminal/tool output na isinasaalang-alang ang command (60-90% upstream range)
    → Stacked: Nakaayos na multi-engine pipeline, karaniwang RTK pagkatapos ay Caveman (78-95% kwalipikadong saklaw)
  → Na-compress na Kahilingan → Provider
```

---

## Compression Modes

### Off

Walang inilapat na compression. Naipapasa ang lahat ng mensahe nang walang pagbabago.

### Lite Mode (~15% pagtitipid, <1ms latency)

Ang pinakaligtas na mode — paglilinis ng formatting. Lossy ang truncation ng mga resulta ng tool nito, kaya ang default
na path (walang `allow-lossy`, `engine:lite`, o opt-in sa pinangalanang combo) ay nagpapatakbo ng lite na may
`compressToolResults: false`: naihahatid sa provider ang mga naunang resulta ng tool nang walang pagbabago.

| Technique                | Description                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Pagsasama ng magkakasunod na blangkong linya at mga trailing space                                |
| `dedupSystemPrompt`      | Pag-aalis ng mga duplicate na system message                                                      |
| `compressToolResults`    | Pag-truncate ng mga naunang resulta ng tool sa lite cap (lossy: kapag may opt-in lang sa request) |
| `removeRedundantContent` | Pag-aalis ng mga inuulit na instruction                                                           |
| `replaceImageUrls`       | Pagpapaikli ng base64 image data URI                                                              |

**Pinakamainam para sa:** Palaging naka-on na paggamit, mga workflow na kritikal sa kaligtasan.

### Standard Mode (~30% pagtitipid)

Hango sa [Caveman](https://github.com/JuliusBrussee/caveman) — nag-aalis ng mga salitang pampuno at mahahabang parirala habang pinananatili ang kahulugan:

- Nag-aalis ng mga salitang pampuno ("please", "I think", "basically", "actually")
- Pinaiikli ang mahahabang parirala ("in order to" → "to", "as a result of" → "because")
- Inaalis ang magagalang na pagpapalambot ("Would you mind...", "If you could possibly...")
- 30+ regex rule na inayos para sa mga coding prompt

**Pinakamainam para sa:** Pang-araw-araw na coding workflow, mga team na maingat sa gastos.

### Aggressive Mode (~50% pagtitipid)

Matalinong pamamahala ng history para sa mahahabang session:

- **Message Aging** — unti-unting kino-compress ang mas lumang mga mensahe
- **Tool Result Compression** — tina-truncate o inie-elide ang mahahabang output ng tool (mga unang/huling linya,
  pag-filter batay sa linya ng tugma, compaction ng mga JSON key)
- **Structural Integrity Guards** — tinitiyak na nananatiling pare-pareho ang mga pares na `tool_use` + `tool_result`
- **Context Window Awareness** — isinasaalang-alang ang mga limitasyon ng token sa bawat modelo

**Pinakamainam para sa:** Mahahabang debugging session, malalaking codebase.

### Ultra Mode (~75% pagtitipid)

Pinakamataas na compression para sa mga sitwasyong kritikal sa token:

- **Heuristic Pruning** — pruning ng mga token sa prose batay sa score
- **Structure Preservation** — ang mga fenced code block, inline code, URL at identifier ay
  itinatago at muling ibinabalik nang eksakto, at hindi kailanman pinu-prune
- **Optional SLM tier** — maaaring gumamit ng maliit na lokal na modelo para pinuhin ang prune kapag na-configure
- Independent sa Aggressive mode: hindi nito pinapatakbo ang message aging, tool-result compression
  o fallback summarizer (ang failure lang sa SLM tier ang maaaring mag-route ng fallback pass sa
  aggressive)

**Pinakamainam para sa:** Kapag paulit-ulit na lumalampas sa mga limitasyon ng context.

### RTK Mode (60-90% upstream range)

Ino-optimize ang RTK mode para sa mahahabang output ng tool na lumalabas sa mga coding-agent session:

- Tinutukoy ang mga klase ng command/output gaya ng `git status`, `git diff`, `git log`, mga test runner,
  TypeScript/Vite/Webpack build, ESLint/Biome/Prettier, npm audit/install, Docker log, infra
  output, at generic shell output
- Inilalapat ang mga JSON filter pack mula sa `open-sse/services/compression/engines/rtk/filters/`
- Nag-i-import ng RTK TOML schema v1 filter mula sa project o global na `filters.toml` file, na may inline-test
  validation at trust-gating para sa mga project file
- Naglalaman ng 56 built-in filter na may inline verify sample
- Nag-aalis ng ANSI control sequence, progress bar, inuulit na linya, at ingay na hindi nangangailangan ng aksyon
- Pinananatili ang mga failure, error, warning, binagong file, summary, at hulihan ng mahahabang output
- Sinusuportahan ang trust-gated project filter, global filter, at opsyonal na redacted raw-output recovery

**Pinakamainam para sa:** Mga agent session na may shell, build, test, git, grep, at mga transcript ng file-output.

### Stacked Mode (78-95% eligible range)

Nagpapatakbo ang Stacked mode ng maraming compression engine sa deterministikong pagkakasunod-sunod. Ang default na pipeline ay:

```txt
RTK -> Caveman
```

Pinananatiling compact ng pagkakasunod-sunod na iyon ang terminal/tool output muna, pagkatapos ay inilalapat ang Caveman semantic condensation sa
natitirang natural-language prompt. Maaaring i-configure ang mga stacked pipeline sa buong system o sa pamamagitan ng
mga compression combo na itinalaga sa mga routing combo.

**Pinakamainam para sa:** Pinaghalong context na may malalaking tool log at mga instruction ng tao o mga summary ng assistant.

## Matematika ng Pagtitipid mula sa Upstream

Itinatala ng OmniRoute ang pagtitipid mula sa compression batay sa dalawang pinagmulan: mga benchmark ng upstream project at
sariling komposisyon ng engine ng OmniRoute.

| Pinagmulan | Numero mula sa upstream README na ginamit dito                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman    | `~75%` mas kaunting output token, `65%` average na pagtitipid sa output sa benchmark, saklaw na `22-87%`, at tool na may `~46%` input compression |
| RTK        | `60-90%` pagtitipid sa command output; halimbawang session na `~118,000 -> ~23,900` token, o `79.7%` ang natipid (`~80%`)                         |

Para sa magkasanib na tool/context payload, pinagsasalansan ng default na combo ng OmniRoute ang mga engine:

```txt
RTK -> Caveman
```

Ang pinagsamang pagtitipid ay multiplicative, hindi additive:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Nalalapat ang numerong `78-95%` kapag parehong kayang bawasan ng RTK at Caveman ang iisang input/context payload.
Hiwalay ang response output mode ng Caveman: kapag naka-enable, gamitin ang sariling pagtitipid sa output ng Caveman (`65%`
na average, `~75%` na headline, saklaw na `22-87%`). Nakadepende ang kabuuang pagtitipid sa billing sa kombinasyon ng iyong prompt/output.

### Ano talaga ang ibig sabihin ng "eligible"

Totoo ang headline na saklaw na 15-95%, ngunit nalalapat lamang ito sa **redundant o verbose** na content — mga inuulit na
error line, build log na paulit-ulit na naglalabas ng parehong warning, o napakalaking `grep`/file-read dump. **Hindi**
ito nangangahulugang gayon kalaki ang matitipid sa bawat request.

Napatunayan sa pamamagitan ng empirical testing (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): ang
isang `stacked` (RTK + Caveman) run sa isang Anthropic-shape na `tool_result` block na naglalaman ng 300 magkakaparehong
error line ay nagresulta sa **95.93% pagtitipid sa token / 96.26% pagtitipid sa character** — pasok na pasok sa ina-advertise na
saklaw. Ngunit kapag pinatakbo ang parehong pipeline sa normal at hindi redundant na tool output (isang malinis na listahan ng match mula sa `grep`,
isang maikling file read, o ordinaryong conversational text), tama itong nagreresulta sa **halos walang matitipid**, dahil
walang paulit-ulit na content na maaalis at hindi pinapayagan ng `validateCompression()` (`validation.ts`) na ipadala ang isang
rewrite na mag-aalis o magbabago ng mga code block, URL, heading, version, o ALL-CAPS na constant identifier.

Ito ay inaasahan at ligtas na gawi, hindi isang bug: ang isang coding session na karamihan ay nagbabasa/nagse-`grep` ng malilinis na file ay
makakakita lamang ng katamtamang kabuuang pagtitipid kahit ganap na naka-enable ang compression, samantalang ang isang session na nakatagpo ng paulit-ulit na failure
loop o masalitang linter ay makakakita ng buong saklaw na 78-95% sa naturang traffic. Huwag gamitin ang mababang pinagsama-samang porsiyento ng pagtitipid
mula sa iisang session bilang ebidensiyang mali ang pagkaka-configure ng compression — suriin muna kung talagang redundant ang
pinagbabatayang tool output.

---

## Biswalisasyon ng Pagtitipid sa Token

```
Walang compression: 47K token ang ipinadala sa LLM
May Lite:           40K token ang ipinadala          (15% ang natipid — ligtas, palaging naka-on)
May Standard:       33K token ang ipinadala          (30% ang natipid — mga panuntunang caveman-speak)
May Aggressive:     24K token ang ipinadala          (50% ang natipid — aging + summarization)
May Ultra:          12K token ang ipinadala          (75% ang natipid — heuristic pruning)
May RTK:            19K-5K token ang ipinadala       (60-90% ang natipid sa command/tool output)
May Stacked:        10K-2.5K token ang ipinadala     (78-95% na saklaw para sa eligible na RTK+Caveman)
```

---

## Configuration

### Dashboard

Mag-navigate sa `Dashboard → Context & Cache`:

- **Caveman** — pagpili ng mode, mga language pack, preview, at mga global default
- **RTK** — preview ng command-filter, mga setting ng kaligtasan ng RTK, at katalogo ng mga filter
- **Compression Combos** — mga pinangalanang pipeline ng engine na itinalaga sa mga routing combo
- **Auto-Trigger Threshold** — awtomatikong magpatupad ng compression kapag lumampas sa threshold ang bilang ng token

### Override sa Bawat Combo

Sa `Dashboard → Context & Cache → Compression Combos`, magtalaga ng compression combo sa isang routing
combo:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Nagbibigay-daan ito sa paggamit ng stacked compression sa mga free/coding provider habang nananatili ang lite mode sa mga bayad na subscription.

Ang pagtatalaga na ito na "Per-Combo Override" ay ibang control mula sa **routing-combo compression
mode** override (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — tinatanggap din ng schema ng field ang
`rtk`, `stacked` at `omniglyph`) — hindi pumipili ang override na iyon ng pinangalanang
compression-combo pipeline; itinatakda lamang nito ang field na `compressionMode` na ginagamit ng
`resolveCompressionPlan`. Maaari itong itakda sa combo card (`Dashboard → Combos`) o, simula sa
#6760, para sa bawat routing combo sa listahang "Assign to routing" sa
`Dashboard → Context & Cache → Compression Combos`, katabi mismo ng checkbox para sa pagtatalaga ng pipeline
na nakadokumento sa itaas. Parehong sine-save ng dalawang interface ang mga pagbabago sa pamamagitan ng parehong
`PUT /api/combos/{id}` endpoint.

### Override sa Bawat Request

Ipadala ang `x-omniroute-compression` request header upang i-override ang compression plan para sa isang request.
Ito ang may pinakamataas na precedence — inuuna nito ang routing-combo override, aktibong profile,
auto-trigger, at Default ng panel. Binabalewala ang mga hindi kilalang value (hindi kailanman tinatanggihan ang request) at
ang global master switch ay nananatiling may kontrol sa lahat: kapag globally naka-off ang compression, hindi ito
maaaring i-on ng header. Mga value:

| Value         | Epekto                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Walang compression para sa request na ito.                                                                               |
| `default`     | Ang Default profile na nagmula sa panel (binabalewala ang aktibong profile). Nananatiling naka-off ang mga lossy engine. |
| `safe`        | Kapareho ng hindi paggamit ng header.                                                                                    |
| `allow-lossy` | Panatilihin ang operator plan ng request na ito, kabilang ang mga summary, relevance filter, at style rewrite.           |
| `engine:<id>` | Isang engine kapag naka-enable, hal. `engine:rtk`. Ito ang per-request opt-in para sa engine na iyon.                    |
| `<combo>`     | Isang pinangalanang combo, na unang itinutugma ayon sa pangalan (case-insensitive), pagkatapos ay ayon sa id.            |

Kung wala ang `allow-lossy`, `engine:<id>`, o isang pinangalanang combo, hindi ilalapat ang mga lossy engine. Kapag
na-downgrade ang isang lossy Default, auto-trigger, o routing override, pinananatili ng OmniRoute ang mga kinikilalang
lossless step mula sa naka-configure na stacked pipeline ayon sa naka-configure na pagkakasunod-sunod. Bumabagsak ito sa
`session-dedup → lite` kapag walang naka-configure na lossless step ang natira.

Ipinapakita ng preview na **Effective pipeline** ng Settings panel ang karaniwang plan habang hindi pa ito ginagamit. Kapag
maaaring patakbuhin ang isang auto-trigger, ipinapakita rin ng parehong preview ang conditional effective pipeline nito upang
magkatugma ang resolution ng panel at ang runtime resolution na walang header.

Ibinabalik ang inilapat na plan sa `X-OmniRoute-Compression: <mode>; source=<source>` response
header, kung saan ang `<source>` ay isa sa `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, o `off`.

### API

```bash
# Kunin ang mga setting ng compression
curl http://localhost:20128/api/settings/compression

# I-update ang mga setting ng compression
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# I-preview ang isang partikular na RTK/stacked payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Ilista ang mga RTK filter pack
curl http://localhost:20128/api/context/rtk/filters

# Direktang subukan ang RTK gamit ang opsyonal na command metadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ano ang Pinoprotektahan

**Palaging pinapanatili** ng compression engine ang:

- ✅ Mga code block (fenced at inline)
- ✅ Mga URL at file path
- ✅ Mga JSON structure at structured data
- ✅ Mga identifier at protektadong technical token
- ✅ Mga mathematical expression
- ✅ Mga depinisyon ng tool/function call
- ✅ Mga system prompt (sa lite mode)

Nire-redact ng RTK raw-output recovery ang mga karaniwang API key, bearer token, Slack token, AWS access key,
password, token, at secret bago i-persist ang anumang bagay.

---

## Mga Istatistika ng Compression

Ang bawat na-compress na request ay may kasamang mga istatistika sa mga server log:

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

## Roadmap ng mga Yugto

| Yugto    | Mga Mode                                                                                                                                                  | Katayuan    |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Yugto 1  | Off, Lite                                                                                                                                                 | ✅ Inilabas |
| Yugto 2  | Standard, Aggressive, Ultra                                                                                                                               | ✅ Inilabas |
| Yugto 3  | RTK, Stacked, Compression Combos                                                                                                                          | ✅ Inilabas |
| Yugto 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                               | ✅ Inilabas |
| Yugto 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` sa `PUT /api/settings/compression`) + mga kontrol sa mode/patakaran ng dashboard | ✅ Inilabas |

---

## Mga Pagkilala

Ang mga panuntunan sa compression ng Standard mode ay hango sa **[Caveman](https://github.com/JuliusBrussee/caveman)** ni **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — ang sumikat na proyektong "why use many token when few token do trick." Iniulat ng Caveman ang `~75%` na mas kaunting output token, `65%` na average na pagtitipid sa output sa benchmark, `22-87%` na saklaw ng output, at isang `~46%` na tool para sa input compression.

Ang RTK mode ay hango sa **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** ng **[RTK AI](https://github.com/rtk-ai)** — ang high-performance na proyekto sa compression ng command output para sa terminal, build, test, git, at pag-filter ng tool output. Iniulat ng RTK ang `60-90%` na pagtitipid, kung saan makikita sa sample session ng README nito na `~80%` ang natipid.

---

## Advanced na Compression System

Higit pa sa 7 mode na inilarawan sa itaas (tinatanggap din ng source ang mga `codex-responses` at `omniglyph` mode, na hindi sinasaklaw ng gabay na ito), ang mga seksyon sa ibaba ay sumasaklaw sa mga feature na gumagana sa loob o sa tabi ng mga mode na iyon: Ang Tool Result Compression at Progressive Aging ay mga hakbang 1 at 2 ng agresibong engine (Aggressive mode at isang `aggressive` step ng stacked na pipeline), ang Stacked Pichegrade na mode na tumatakbo, ang Stacked Pichegrade na pagpapatakbo ng Compression. `aggressive` at `ultra` to `standard` para sa mga provider ng pag-cache habang naka-on ang compression, at ang Caveman Output Mode at Output Styles ay mga opt-in system-prompt na mga tagubilin, bilang default, na humuhubog sa output ng modelo sa halip na i-compress ang kahilingan.

### Cache-Aware Compression

Suporta ng ilang provider (tulad ng Anthropic na may prompt na pag-cache).** agarang pag-cache** , na nagbibigay-daan sa kanila na i-cache ang mga bahagi ng prompt upang mabawasan ang mga gastos at latency. Kapag pinagana ang caching, maaari talaga ang agresibong compression** nasaktan** performance dahil binabago nito ang mga naka-cache na token, na nagpapawalang-bisa sa cache.

Ang `cachingAware.ts` module ay nilulutas ito sa pamamagitan ng** pag-detect ng konteksto ng pag-cache** at** pagsasaayos ng diskarte sa compression** naaayon.

#### Paano ito gumagana

1. **I-detect ang konteksto ng pag-cache** — Ini-scan ang katawan ng kahilingan para sa mga marker `cache_control`
2. **Kilalanin ang mga provider ng caching** — Sinusuri kung sinusuportahan ng target na provider ang pag-cache
3. **Ayusin ang diskarte** Dina-downgrade — `aggressive`/`ultra` sa `standard` para sa mga provider ng caching
4. **Laktawan ang prompt ng system** — System prompt ay karaniwang naka-cache, kaya huwag i-compress ang mga ito

Ang katulong sa diskarte ay nagbabalik din ng isang `deterministicOnly` flag, ngunit ang tagabuo ng plano ay gumagamit lamang ng diskarte — wala sa ibaba ng agos na nagbabasa ng bandila ngayon.

#### Halimbawa ng code

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

#### Kailan gagamitin

Cache-aware compression ay** laging naka-on** — walang kinakailangang configuration. Nagsisimula ito sa tuwing naka-on ang compression at sinusuportahan ng target na provider ang prompt caching (Anthropic, OpenAI, atbp.); Ang mga tahasang marker `cache_control` ay hindi kinakailangan — isang provider ng caching lamang ang nagti-trigger ng pag-downgrade, at ang mga marker lamang ay hindi kailanman nagagawa (ang pag-detect ng marker ay nagbibigay ng cache telemetry, hindi ang desisyon ng diskarte).

Binibilang OpenRouter bilang provider ng caching para lang sa mga modelong `anthropic/*` : Pinapanatili ng mga kahilingan ng Claude Code ang kanilang `cache_control` breakpoints (4 ang pinakamarami) at pinoprotektahan ng guard ang prefix, habang ang bawat iba pang pamilya OpenRouter (`openai/`, `google/`, `qwen/`, …) ay nananatiling nahuhubad at hindi nababantayan.

### Progresibong Pagtanda

Ang mga mahabang pag-uusap ay nag-iipon ng maraming pagliko ng mensahe, ngunit ang mga mas lumang mga pagliko ay nagiging hindi gaanong nauugnay. Ang `progressiveAging.ts` module** pinapababa ang mga mensahe ayon sa distansya ng pagliko** (sinukat ang distansya mula sa dulo ng pag-uusap). Gamit ang mga naipadalang default (`verbatim: 2, light: 2, moderate: 3`):

- **Huling 2 pagliko (distansya ≤ 2)** : Pinananatiling verbatim
- **Distansya 3** : Caveman compression (pagtanggal ng filler)
- **Distansya 4 +** : Mga mensahe ng Assistant na buod; nabawasan ang mga mensahe ng user sa kanilang unang linya, na nilimitahan sa 120 character; ibang papel na hindi ginagalaw. Ang mga prompt ng system, mga mensaheng nasa edad na at ang pinakabagong mensahe ng user ay palaging pinananatiling verbatim anuman ang distansya. Walang direktang na-drop, at ang `light` band ay hindi maabot sa mga naipadalang default (`light` equals `verbatim`).

#### Halimbawa ng code

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

#### Kailan gagamitin

Ang progresibong pagtanda ay** laging naka-on** para sa `aggressive` mode — ito ay hakbang 2 ng `compressAggressive()`. Hindi ito pinapatakbo ng ultra mode. Ito ay partikular na epektibo para sa:

- Matagal nang coding session
- Mga pag-uusap sa maraming araw
- Mga ahenteng daloy ng trabaho na may maraming tawag sa tool

### Mode ng Output ng Caveman

Nagdaragdag ang mode ng output ng Caveman** agarang mga tagubilin ng system** na humihingi sa mismong modelo ng maikling output — ang `lite` level ay humihingi ng maigsi na mga sagot na nagpapanatili ng buong pangungusap, hinihiling ito ng `full` na "tumugon nang maikli tulad ng matalinong caveman", at `ultra` ay humihingi ng telegraphic na output; ang mga tagubilin ay humihiling lamang, hindi nila ito magagarantiya. Natatanggap ng mga kahilingan ang mga ito sa pamamagitan ng `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): niresolba muna `open-sse/handlers/chatCore.ts` ang pagpili gamit ang back-compat shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`), na, habang walang laman `outputStyles`, nagmamapa ng naka-enable na `cavemanOutputMode` sa `terse-prose` output style sa `cavemanOutputMode.intensity` (tingnan ang Back-compat sa ibaba); ginagamit ang isang walang laman na seleksyon `outputStyles`, at walang epekto `cavemanOutputMode.enabled` at `intensity`, habang nalalapat pa rin `autoClarity` toggle nito. Hawak `outputMode.ts` ang mga teksto ng pagtuturo (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), ang bypass ng nilalaman at ang placement helper na ginagamit ng iniksyon; ang sarili nitong `applyCavemanOutputMode()` injector ay walang production caller.

#### Paano ito gumagana

Hindi sinisiksik ng mode na ito ang input. Nagdaragdag ito ng instruction block sa system prompt (tingnan ang Paano gumagana ang injection sa ibaba), at anumang input compression mode na pinili para sa kahilingan ay tatakbo pa rin pagkatapos, sa katawan na nagdadala ngayon ng block. Sa unahan ng clause ng shared boundaries kung saan nagtatapos ang bawat antas, ang English na antas `full` ay mababasa:

> "Tumugon nang maikli tulad ng matalinong caveman. Mag-drop ng mga artikulo (a/an/the), filler (just/really/basically/actually/simply), pleasantries, hedging. Fragment OK. Maiikling kasingkahulugan (malaki hindi malawak, ayusin hindi ipatupad). Panatilihing eksakto ang lahat ng teknikal na sangkap, code, error, URLs, mga identifier."

Ito ay partikular na gumagana para sa:

- Pagbuo ng code (terser output = mas kaunting mga token)
- Mabilis na Q&A (hindi na kailangan ng mga detalyadong paliwanag)
- Batch processing (maximize throughput)

#### Kailan gagamitin

Caveman output mode ay** mag-opt-in** . Kapag naka-on ang compression (`enabled: true`, ang master toggle sa page ng Mga Setting ng Compression), i-on ito gamit ang `cavemanOutputMode.enabled`; pinipili `intensity` `lite`, `full` o `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Isang compression combo's** Output Mode** toggle (`outputMode`, level in `outputModeIntensity`) ay nagtatakda ng parehong switch para sa mga kahilingan kung saan nalalapat ang combo, at isinusulat ito ng `omniroute_set_compression_engine` MCP tool sa pamamagitan ng boolean `outputMode` argument nito. Ang isang walang laman na seleksyon `outputStyles` ay nangunguna sa switch na ito. Sa dashboard, pinapagana ang** Terse prosa** ang estilo ng output ay nag-inject ng parehong bloke (tingnan ang Mga Estilo ng Output sa ibaba).

### Mga Estilo ng Output (catalog)

Caveman output mode sa itaas ay ang** legacy na single-style na landas** . Ang Phase 4 ay nag-generalize nito sa isang catalog ng mga composable na istilo ng output: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Ang bawat istilo ay isang sistema-prompt na pagtuturo na humihiling sa mismong modelo ng mas murang output; ang mga estilo ay maaaring paganahin nang magkasama at ini-inject sa catalog order.

| Estilo                            | `id`            | Ano ang ginagawa nito                                                                                                                                                                                                                                                                                                                        | Mga wika ng pagtuturo                         |
| --------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Terse prosa                       | `terse-prose`   | Ihulog filler/articles/hedging; panatilihing eksakto ang teknikal na sangkap. Parehong text sa legacy caveman output mode (na-reference, hindi muling na-type).                                                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mas kaunting code                 | `less-code`     | YAGNI ladder: pinakamaliit na pagbabago sa trabaho, walang hindi hiniling na abstraction.                                                                                                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Nakapusod (tamad na senior dev)   | `ponytail`      | "Ang pinakamagandang code ay ang code na hindi kailanman nakasulat": muling gamitin > rewrite, ugat sanhi ng sintomas >, pinakamaikling working diff.                                                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mayroon akong ADHD (action-first) | `i-have-adhd`   | Aksyon muna (command/path/snippet bago tuluyan), may bilang na may hangganan na mga hakbang, ONE kongkreto susunod na hakbang, walang preamble/recap/closers. Hinango mula sa [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filter                | `antislop-ui`   | Ang bawat visual na pamamaraan ay dapat pumasa sa isang pagsubok sa layunin (hierarchy, pagkakakilanlan, pagiging madaling mabasa); walang default gradients/glass/glow, naka-cap na palette, walang mga layout ng template. Ang parehong mga estilo ng antislop ay nagdaragdag ng hangganan na walang-patay na kontrol / walang gawa-claim. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop copy at human filter     | `antislop-copy` | Partikular na kopya (walang em dash, generic CTAs, buzzwords, chatbot closers, imbentong katotohanan) kasama ang mga panuntunan ng mga tao: WCAG AA contrast, nakikitang focus, abot ng keyboard, empty/loading/error states, mobile reflow.                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                  | `terse-cjk`     | `full`/`ultra` sagot sa Classical Chinese (文言); `lite` ay humihingi lamang ng mga maikling sagot nang walang mga function na salita, kaaya-aya o pagpapaganda.                                                                                                                                                                             | zh (locale-gated, tingnan sa ibaba)           |

Ang bawat istilo ay nagpapadala ng tatlong antas ng intensity — `lite`, `full`, `ultra` — at ang bawat antas ay nagtatapos sa shared boundaries clause (`SHARED_BOUNDARIES` sa `outputMode.ts`), na nagpapanatili ng mga bloke ng code, path ng file, command, error at URLs na eksakto. Ang mga teksto sa antas ng `terse-prose` at `terse-cjk` ay nagdaragdag ng mga identifier sa listahang iyon.

`terse-cjk` ay locale-gated sa `zh` sa dalawang lugar. Ang pahina ng Mga Setting ng Compression ay naglilista lamang ng hilera nito kapag ang dashboard na UI na wika ay Chinese (`zh-CN` o `zh-TW`), at ini-inject lang ito ng `applyOutputStyles()` kapag ang nalutas na wika ng kahilingan (tingnan ang Pagpili ng wika sa ibaba) ay `zh`. Ang pagtatago sa row ay hindi nag-clear ng isang naka-save `terse-cjk` na seleksyon: ang mga setting API ay tumatanggap ng anumang style id, at ang pag-save ng iba pang mga estilo sa page ay nagpapanatili nito. Sa oras ng kahilingan, ang `applyOutputStyles()` language check ay ang tanging locale gate.

#### Paano gumagana ang iniksyon

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ay nireresolba ang pagpili laban sa catalog (ang mga hindi kilalang mga id at mga lokal na hindi tugmang mga estilo ay ibinabagsak, hindi kailanman isang error; ang isang seleksyon na nalutas sa walang istilo ay nag-iiwan sa katawan na hindi nagbabago, nilaktawan bilang `no_styles`), pinagsasama-sama ang mga napiling tagubilin sa pagkakasunud-sunod ng catalog, idinadagdag ang sugnay ng mga hangganan** minsan** (kasama ang sugnay na pangkaligtasan, `SAFETY_BOUNDARIES` o pagsasalin nito, kapag `less-code` o `ponytail` ang napili), at sinimulan ang block na may isang solong idempotency marker (`[OmniRoute Output Styles]`), kaya ang muling pag-apply ay isang no-op. Kapag ang nalutas na wika (tingnan ang Pagpili ng wika sa ibaba) ay may pagsasalin, ang naisalokal na pagtuturo ay ini-inject sa halip na Ingles.

Sa isang body na may hindi walang laman `messages` array, ang idempotency check ay tumatakbo bago ang content bypass: kapag ang `[OmniRoute Output Styles]` marker ay nasa top-level `system` field (isang string o isang content-block array) o sa isang mensahe ng system na may string content, ang body ay hindi nababago bilang `already_applied` at walang keyword check na tumatakbo. Kung hindi, sinusuri ng content bypass (`shouldBypassCavemanOutputMode()` sa `open-sse/services/compression/outputMode.ts`) ang text ng huling tatlong mensahe, anuman ang kanilang tungkulin, at nilalaktawan ang mga istilo para sa buong pagliko kapag tumugma ang tekstong iyon sa mga keyword na panseguridad, hindi maibabalik na aksyon o paglilinaw `before`, o isang pagkakasunud-sunod na sensitibo sa pagkakasunud-sunod: `first`, `then`, `after that`, `rollback`, na sinusundan ng `delete` o `backup` `drop`, `migrate` o `deploy` `release` Ang bypass ay tumatakbo habang ang** Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, sa bilang default) ay naka-on; Ang pag-off sa toggle ay lumalaktaw sa pagsusuri ng keyword.

Kapag hinayaan ng bypass ang pagliko, `placeSystemInstruction()` (parehong file), na hindi kailanman lumilikha ng bagong `messages[0]`, inilalagay ang bloke sa una sa mga ito na makikita nito:

1. Isang nangungunang mensahe ng system na may nilalamang string: ang bloke ay idinagdag pagkatapos ng teksto nito.
2. Ang top-level `system` field: ang block ay idinagdag pagkatapos ng text ng isang string, o idinagdag bilang bagong text block sa isang content-block array.
3. Ang unang mas huling mensahe ng system na may nilalamang string: ang bloke ay idinagdag pagkatapos ng teksto nito.
4. Wala sa itaas: ang block ay napupunta sa isang bagong mensahe ng system sa dulo ng `messages`.

Sa isang katawan na walang `messages` array (o may isang walang laman), walang content bypass na tumatakbo at isang top-level `system` na field ay hindi kinokonsulta. Ang block ay idinagdag pagkatapos ng teksto ng isang string `instructions` field, maliban kung ang field na iyon ay naglalaman na ng `[OmniRoute Output Styles]` marker, kung saan ang katawan ay hindi nababago bilang `already_applied`. Kapag ang katawan ay walang string `instructions` field ngunit nagdadala ng `input` (isang string o isang array), ang bloke ay nagiging `instructions`, na pinapalitan ang anumang hindi string na halaga na hawak ng field. Ang katawan na walang string `instructions` field o string o array `input` ay hindi nababago at nilaktawan bilang `no_messages`.

#### Paano paganahin

Sa dashboard:** Konteksto ng Compression → Mga Setting ng Compression** (`/dashboard/context/settings`), seksyon ng Mga istilo ng output: isang hilera bawat istilo na may on/off toggle at isang tagapili ng antas. Ang mga istilo ay nag-inject habang naka-on ang mismong compression (master toggle ng page, `enabled`). Ang** Auto-Clarity Bypass** toggle ay nasa** taong maninira sa lungga** pahina (`/dashboard/context/caveman`), sa nito** Output Mode** card. Sa programmatically, ang compression config ay nagpatuloy sa pagpili bilang:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: habang walang laman `outputStyles`, ang legacy na setting `cavemanOutputMode.enabled` ay nagmamapa sa `terse-prose` at `cavemanOutputMode.intensity`. Magsisimula ang block sa `[OmniRoute Output Styles]` marker, kung saan isinulat ng legacy `applyCavemanOutputMode()` injector `[OmniRoute Caveman Output Mode]`. Sa ibaba ng marker, tumutugma ang text sa legacy na iniksyon sa en, pt-BR, es, de, fr, it, ru, id at vi; sa ja at zh nagdadala ito ng isang dagdag na espasyo bago ang sugnay ng mga hangganan. `terse-prose` ay isinasalin sa pt-BR, es, de, fr, it, ru, zh, ja, id at vi, kaya ang isang kahilingan na ang nalutas na wika ay `hu` ay nakakakuha ng English na text kung saan ginamit ng legacy injector ang Hungarian nito.

Output-style na pagpili ng wika (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): na may `languageConfig.enabled` on, `autoDetect` ay nagsa-sample ng pinakabagong mensahe ng user sa `messages` array ng kahilingan na mayroong text (string content, o ang `text` ng mga bahagi ng content nito) at nagpapatakbo ng Caveman engine's detector (`detectCompressionLanguage()`) dito. Ang detektor ay nagbabalik ng `zh` para sa teksto na may mga Han character at walang kana; kung hindi, ibinabalik nito ang alinman sa `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` at `id` ang may pinakamaraming tugmang pahiwatig, at `en` kapag walang tumutugma — na text na hindi nito mauuri ay makakakuha ng English, hindi kailanman `defaultLanguage`, at `vi` ay hindi kailanman nade-detect ang mga estilo ng `vi`. Ang isang Responses API body ay patuloy na umiikot sa `input`, na hindi na-sample, kaya ito ay nakakuha `defaultLanguage`, pagkatapos ay English. Kapag walang mensahe ng user sa `messages` na may text, o naka-off ang `autoDetect`, nalalapat ang `defaultLanguage`, pagkatapos ay English. Kapag naka-off `languageConfig.enabled`, ang wika ay English — maliban na lang kung may compression combo na nalalapat sa kahilingan (isang combo na itinalaga sa routing combo ng kahilingan, o ang default na compression combo chatCore ay bumabalik sa built-in na stacked pipeline): ang paglalapat ng combo ay magpapasara `languageConfig.enabled` para sa kahilingang iyon at nagtatakda ng `defaultLanguage` mula sa combo na value kung ito ay ang combo. pack, kung hindi man ay ang unang pack ng combo, na nagde-default sa `en`), habang nalalapat pa rin ang naka-save na `autoDetect` (naka-on bilang default). Pinipili ng Caveman input engine ang rule-pack na wika nito sa ibang paraan na — bawat bahagi ng text at, nang naka-off ang auto-detect, naka-gate sa `enabledPacks`.

Ang style × language matrix ay naka-pin ng `tests/unit/compression/output-styles-i18n-matrix.test.ts`: bawat istilo ng catalog ay nangangailangan ng entry sa `BASELINE_LANGUAGES` ng pagsubok; ang isang istilong hindi locale-gated ay dapat magpadala ng isang pt-BR na pagsasalin (ang locale-gated `terse-cjk` ay hindi kasama sa panuntunang ito) maliban kung ito ay nakalista sa `KNOWN_ENGLISH_ONLY`, na maaaring magkaroon lamang ng mga istilo na walang mga pagsasalin sa lahat — isang nakalistang istilo na mayroong anumang pagsasalin ay hindi nabigo sa pagsubok; at ang isang istilo ay nabigo sa pagsubok kapag nawalan ito ng isang wika na nakalista sa `BASELINE_LANGUAGES` entry nito. Upang magdagdag ng istilo, tingnan [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compression ng Resulta ng Tool

`compressToolResult()` sa `open-sse/services/compression/toolResultCompressor.ts` ay nag-compress ng tool-resultang teksto gamit ang** 5 diskarte** . Sinusubukan nito ang mga ito sa ganitong pagkakasunud-sunod, at ang unang naka-enable na diskarte na ang tseke ay tumutugma sa nilalaman ang magpapasya sa resulta:

1. **`fileContent`** : nilalaman ng 3 o higit pang mga linya kung saan kahit isang linya, na binabalewala ang nangunguna na indentation, ay nagsisimula sa `import `, `export `, `function `, `class `, `const `, `let `, `var ` o `return ` (ang keyword na may kasamang espasyo), o may `if`, `for` o `while` na sinusundan ng `(` o ` (` 20, na may huling markang e .
2. **`grepSearch`** : nilalaman na may hindi bababa sa isang linya ng form na `<path>:<digits>:`, kung saan ang teksto bago ang unang colon ay walang whitespace, pinapanatili lamang ang mga linyang iyon, hindi hihigit sa 30, na sinusundan ng isang bilang ng anumang karagdagang mga tugma at ang listahan ng mga katugmang file; ang bawat isa pang linya ay bumaba. Ang isang ganoong linya ay sapat na upang ma-trigger ang diskarte, kaya ang isang log line na nagsisimula sa isang timestamp gaya ng `12:30:45` ay binibilang din.
3. **`shellOutput`** : output na naglalaman ng ANSI CSI sequence (`ESC[` pagkatapos ay mga digit o semicolon pagkatapos ay isang titik, tulad ng sa mga color code) o isang `$` na sinusundan ng whitespace saanman sa text ay nawawala ang mga sequence na iyon (ang iba pang mga escape, gaya ng `ESC[?25l` o isang OSC window-title sequence, ay pinapanatili) at pinapanatili ang huling 50 linya nito, na may magkakasunod na linya. Dahil ang pagsusuring ito ay tumatakbo bago `json` at `errorMessage`, JSON o error na output na naglalaman ng ganoong `$` ay hindi makakarating sa kanila habang naka-on `shellOutput`.
4. **`json`** : ang isang JSON payload na higit sa 2,000 character na nagsisimula sa `{` o `[` (pagkatapos ng opsyonal na whitespace) at mga pag-parse ay nabubuod: isang array ng higit sa 7 item ang nagpapanatili ng una nitong 5 at huling 2 item at ang kabuuang bilang nito, at ang isang object ay nagpapanatili ng unang 20 key nito, na ang bawat nested object o array value ay pinapalitan ng isang `{…N keys}` na marking, N ang haba ng placeholder ay (para sa `_remaining_<N>_keys` marking) ang mga key ay bumaba sa unang 20. Ang mga halaga ng scaler ay kinokopya nang buo, kaya ang isang bagay na may 20 key o mas kaunti na walang mga nested na halaga ay muling indented — ang isang pinaliit ay nakakakuha ng mga character at nananatiling hindi nagbabago.
5. **`errorMessage`** : output na naglalaman ng, kahit saan at sa anumang letter case, `error:`, `error ` (ang salitang sinusundan ng isang puwang, tulad ng sa `no error found`), `[error]`, `exception:`, `exception `, `[exception]` o `traceback` ay nagpapanatili sa unang linya nito, ang susunod na 10 linya at ang huling 3, na may `… [N frames elided] …` marker sa lugar ng mga linya sa pagitan nila. Ang marker ay lilitaw lamang kapag higit sa 13 linya ang sumusunod sa unang linya, kaya ang error na output ng 14 na linya o mas kaunti ay hindi pinaikli (sa 12 o 13 linya ang huling 3 paulit-ulit na linya ay napanatili na).

Pagkatapos ng isang diskarte na tumutugma, kahit isa na walang nai-save, ang mga susunod na diskarte ay hindi sinubukan. Kapag ang diskarte sa pagtutugma ay walang na-save na mga tinantyang token (haba ÷ 4, naka-round up) — halimbawa isang code-like na file na may 25 linya o mas kaunti, o isang JSON array na mahigit sa 2,000 character na may 7 item o mas kaunting — pinapanatili ng agresibong engine ang orihinal na resulta ng tool: parehong tumatawag (`compressAggressive()` at `compressAnthropicToolResultBlock()`) habang pinapanatili ang orihinal na 0 o `saved`, habang ang orihinal ay `compressToolResult()` output ng diskarte. Ang hakbang sa resulta ng tool ay hindi ang huling salita: ang fallback summarizer ng engine ay maaari pa ring paikliin ang isang `tool` o `function` na mensahe na mas mahaba sa 8,192 character (`maxTokensPerMessage`, 2,048, beses 4).

#### Kailan gagamitin

Ang compression ng resulta ng tool ay hakbang 1 ng agresibong makina (`compressAggressive()` sa `open-sse/services/compression/aggressive.ts`), kaya tumatakbo ito sa Aggressive mode at sa isang `aggressive` na hakbang ng isang stacked pipeline. Kino-compress nito ang OpenAI-shape `tool` at `function` na mga mensahe at ang teksto sa loob Anthropic `tool_result` blocks. Ang bawat diskarte ay may sariling switch sa ilalim ng `aggressive.toolStrategies`, lahat ay naka-on bilang default. Sa dashboard, ang mga switch ay nasa pahina ng Caveman** Advanced** tingnan habang naka-on ang compression at ang default na mode ay Aggressive.

### Nakasalansan na Pipeline

Tumatakbo ang stacked mode** maramihang mga makina sa pagkakasunud-sunod** — karaniwang RTK muna (60-90% savings sa tool output), pagkatapos Caveman sa natitirang teksto (~ 46% input savings). Binubuo, iyon ay ang** 78-95% kwalipikadong saklaw** (tingnan ang Upstream Savings Math sa itaas): `1 - (1 - 0.60..0.90) × (1 - 0.46)` average ≈ 89%.

#### Paano ito gumagana

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Kailan gagamitin

Gamitin ang stacked mode para sa:

- Mga workflow na mabigat sa tool (agent coding, pananaliksik)
- Pagproseso ng batch na sensitibo sa gastos
- Kapag kailangan mo ng maximum na pagtitipid ng token

Ang mga stacked pipeline ay na-configure sa pamamagitan ng global `stackedPipeline` compression setting, o sa pamamagitan ng isang pinangalanang compression combo na itinalaga sa isang routing combo (tingnan ang Per-Combo Override sa itaas) — hindi sa pamamagitan ng isang auto-combo `modePack` (ang field na iyon ay muling nagtitimbang ng auto-combo na seleksyon ng modelo, at `stacked` ay hindi isang valid na pangalan ng pack).

---

## Mga Override ng Compression sa Bawat Combo

Maaari mong i-override ang pandaigdigang compression mode **sa bawat combo** upang mas pinong maiangkop ang gawi
para sa iba't ibang gamit:

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

Kapaki-pakinabang ito para sa:

- **Mga coding combo**: Gamitin ang `aggressive` mode para sa mahahabang session
- **Mga combo para sa mabilisang tanong at sagot**: Gamitin ang `lite` mode para sa mabilis na mga tugon
- **Mga combo na maraming ginagamit na tool**: Gamitin ang `stacked` mode para sa pinakamalaking pagtitipid
- **Mga production combo**: huwag paganahin ang override para sa mga caching provider — awtomatikong ibinababa ng palaging naka-enable
  na cache-aware na pagsasaayos ang `aggressive`/`ultra` sa `standard`
  (walang mapipiling `cache-aware` mode)

---

## Tingnan Din

- [Configuration ng Environment](../reference/ENVIRONMENT.md) — Mga environment variable para sa compression
- [Gabay sa Arkitektura](../architecture/ARCHITECTURE.md) — Mga internal na detalye ng compression pipeline
- [Gabay ng Gumagamit](../guides/USER_GUIDE.md) — Pagsisimula sa compression
- [RTK Compression](./RTK_COMPRESSION.md) — Mga RTK filter, trust model, verify gate, at pag-recover ng raw output
- [Mga Compression Engine](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, mga API, MCP, at dashboard
- [Format ng Mga Panuntunan sa Compression](./COMPRESSION_RULES_FORMAT.md) — Format ng JSON rule-pack
- [Mga Language Pack para sa Compression](./COMPRESSION_LANGUAGE_PACKS.md) — Mga panuntunan ng Caveman na partikular sa wika
