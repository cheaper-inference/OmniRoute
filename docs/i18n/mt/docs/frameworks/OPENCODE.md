# OpenCode Integration (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Ġeneralment disponibbli.** Udjenza:** Operaturi wiring OpenCode għal OmniRoute deployment.** Sors tal-verità (config schema):** `src/shared/services/opencodeConfig.ts`** Pakketti npm rakkomandati:** `@omniroute/opencode-plugin/` (OpenCode v1, installat minn `omniroute setup opencode`) u `@omniroute/opencode-plugin-v2/` (OpenCode v2). Il-pakkett `@omniroute/opencode-provider/` antik huwa** deprecated** (ara Mogħdija 2).

[OpenCode](https://opencode.ai) huwa klijent aġenti CLI/desktop AI. Jaqra l-katalgu tal-fornitur tiegħu minn `~/.config/opencode/opencode.json` (jew `opencode.jsonc`) u jsegwi l-iskema `https://opencode.ai/config.json`. OmniRoute jesponi ruħu għal OpenCode bħala wieħed minn dawk il-fornituri — kull talba tgħaddi mill-wiċċ `/v1` standard kompatibbli mal-OpenAI ta ' OmniRoute, għalhekk OpenCode jibbenefika awtomatikament minn rotta Auto-Combo, circuit breakers, politiki ewlenin, osservabilità, eċċ.

Din il-paġna tiddokumenta ż-żewġ mogħdijiet static-config hawn taħt; it-tnejn jiġġeneraw l-istess konfigurazzjoni. Għal lista mudell li ssegwi l-katalgu dirett tiegħek, uża l-plugin minflok: `omniroute setup opencode` jinstalla `@omniroute/opencode-plugin` (OpenCode v1), u `@omniroute/opencode-plugin-v2` jimmira OpenCode v2 (ara [l-integrazzjonijiet CLI](../guides/CLI-INTEGRATIONS.md) u l- [gwida tal-plugin OpenCode v2](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## Mogħdija 1 — Ġeneratur CLI (mingħajr installazzjoni npm)

Rakkomandat għall-utenti finali. Jiġi inkluż ma’ OmniRoute. Jikteb `opencode.json` direttament fil-post.

```bash
# Wara li tinstalla OmniRoute (npm i -g @omniroute/cli jew klonu lokali)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Minn wara l-kwinti, is-CLI jsejjaħ `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), għalhekk `opencode.json` eżistenti jżomm il-fornituri u l-kummenti l-oħra tiegħu. L-entrata ta’ OmniRoute tiżdied jew tinbidel b’mod atomiku.

Il-fajl li jirriżulta (katalgu predefinit tal-mudelli):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Mogħdija 2 — npm pakkett `@omniroute/opencode-provider` (deprecated)

> **Deprecated.** Il-pakkett jikteb lista tal-mudelli statiċi li tgħaddi wara l-katalgu OmniRoute ħaj tiegħek. README tiegħu jirrakkomanda li jemigra lejn `@omniroute/opencode-plugin` (jew `@omniroute/opencode-plugin-v2` fuq OpenCode v2). API hawn taħt jinżamm għal skripts eżistenti biss.

Użat meta ssir script tal-konfigurazzjoni minn Node/TS (pipelines CI, monorepos, flussi ta' installatur tad-dwana).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Optional: override the model catalog exposed to OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Għal amalgamazzjoni mhux distruttiva kontra fajl eżistenti, irreplika `mergeOpenCodeConfigText()` minn `opencodeConfig.ts` jew ċempel lill-ġeneratur CLI.

Ara l [-pakkett README](../../@omniroute/opencode-provider/README.md) ghaz- API shih.

---

## X’jagħmel effettivament ir-runtime

Iż-żewġ mogħdijiet jipproduċu l-istess `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Waqt ir-runtime, OpenCode jgħabbi `@ai-sdk/openai-compatible` (li diġà huwa dipendenza tranżittiva ta’ OpenCode) u jikkonfigurah b’`baseURL` + `apiKey`. Minn hemm:

```
UI/aġent ta’ OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (interfaċċa OpenAI ta’ OmniRoute)
         → handler ta’ OmniRoute għal /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → routing ikkombinat / Auto-Combo / eżekutur
               → fornitur upstream
```

Il-plugin qatt ma jinteraġixxi ma’ HTTP. Huwa jiġġenera biss il-konfigurazzjoni.

---

## Valuri awtomatiċi tal-katalgu tal-mudelli

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Tista' tissostitwixxihom permezz ta' `models: [...]`. Żidiet rakkomandati:

- `"auto"` — jesponi r-router [Auto-Combo](../routing/AUTO-COMBO.md) ta' OmniRoute li ma jeħtieġ ebda konfigurazzjoni. Jippermetti lil OpenCode jagħżel "l-aħjar mudell disponibbli" mingħajr ma jkollok tikkodifika l-katalgu direttament.
- `"<combo-name>"` — kwalunkwe combo li ddefinixxejt fid-dashboard; OmniRoute jirriżolviha b'mod trasparenti.

---

## Normalizzazzjoni tal-URL

Il-funzjoni awżiljarja taċċetta ż-żewġ forom u tipproduċi eżattament `/v1` wieħed:

| Input                          | Output (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Din id-deduplikazzjoni hija **l-aktar kawża komuni ta' ħsarat** li tidher f'konfigurazzjonijiet eqdem. Jekk għandek `opencode.json` minn qabel v3.8.0 li jipponta lejn `/v1/v1/...`, erġa' ħaddem il-ġeneratur jew erġa' sejjaħ lil `createOmniRouteProvider`.

---

## Modi ta' awtentikazzjoni

| Konfigurazzjoni ta' OmniRoute                         | Valur rakkomandat ta' `apiKey`                           |
| ----------------------------------------------------- | -------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (default għal ambjent lokali) | `sk_omniroute` (placeholder litterali)                   |
| `REQUIRE_API_KEY=true`                                | API key reali għal kull utent minn Dashboard → API Keys. |

Għal klijenti bi stil Anthropic li jibagħtu `x-api-key` + `anthropic-version`, `extractApiKey` ta' OmniRoute jirrispetta wkoll iċ-ċavetta minn `x-api-key`. OpenCode juża l-interfaċċa OpenAI, għalhekk dejjem jibgħat `Authorization: Bearer ${apiKey}` — hawnhekk ma japplika ebda każ speċjali għal Anthropic.

---

## Soluzzjoni tal-problemi

| Sintomu                                                  | Kawża                                                                                 | Soluzzjoni                                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `404` fuq kull talba b'URL li fih `/v1/v1/`              | Konfigurazzjoni skaduta minn plugin ta' qabel v3.8 li żied `/v1` darbtejn.            | Iġġenera mill-ġdid permezz tal-Mogħdija 1 jew 2.                                                            |
| `401 Invalid API key`                                    | OmniRoute għandu `REQUIRE_API_KEY=true` u ċ-ċavetta mhijiex magħrufa.                 | Oħloq iċ-ċavetta fid-dashboard, jew issettja `REQUIRE_API_KEY=false` (lokalment biss) u uża `sk_omniroute`. |
| Il-lista tal-mudelli hija vojta fl-UI ta' OpenCode       | L-4 mudelli awtomatiċi kollha huma moħbija fil-viżibbiltà tal-fornitur ta' OmniRoute. | Għaddi `models: ["auto", ...]` biex tesponi dawk li ppermettejt.                                            |
| Żball 500 ta' OpenCode b'`cannot read property 'models'` | Verżjonijiet eqdem ta' OpenCode (< 0.1.x) ma kinux jaċċettaw `models` inline.         | Aġġorna OpenCode għal verżjoni li ssegwi l-iskema v1 (`opencode.ai/config.json`).                           |

---

## Ara wkoll

- [API referenza](../reference/API_REFERENCE.md) — sħiħ OmniRoute REST wiċċ
- [Auto-Combo](../routing/AUTO-COMBO.md) — xi tfisser `model: "auto"`
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (rakkomandat)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (deprecated)
- Sors: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
