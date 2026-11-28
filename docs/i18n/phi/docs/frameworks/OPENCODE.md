# OpenCode Integration (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Katayuan:** Karaniwang magagamit.** Madla:** Inire-wire ng mga operator OpenCode sa isang deployment OmniRoute.** Pinagmulan ng katotohanan (config schema):** `src/shared/services/opencodeConfig.ts`** Inirerekomendang npm packages:** `@omniroute/opencode-plugin/` (OpenCode v1, na-install ng `omniroute setup opencode`) at `@omniroute/opencode-plugin-v2/` (OpenCode v2). Ang mas lumang `@omniroute/opencode-provider/` package ay** hindi na ginagamit** (tingnan ang Landas 2).

[OpenCode](https://opencode.ai) ay isang ahenteng CLI/desktop AI na kliyente. Binabasa nito ang catalog ng provider nito mula sa `~/.config/opencode/opencode.json` (o `opencode.jsonc`) at sinusunod ang schema sa `https://opencode.ai/config.json`. Inilalantad OmniRoute ang sarili sa OpenCode bilang isa sa mga provider na iyon — ang bawat kahilingan ay dumadaloy sa karaniwang OpenAI-compatible na `/v1` surface ng OmniRoute, kaya awtomatikong nakikinabang OpenCode mula sa Auto-Combo routing, circuit breaker, pangunahing patakaran, observability, atbp.

Ang pahinang ito ay nagdodokumento ng dalawang static-config na landas sa ibaba; parehong bumubuo ng parehong config. Para sa isang listahan ng modelo na sumusunod sa iyong live na catalog, gamitin na lang ang plugin: `omniroute setup opencode` installs `@omniroute/opencode-plugin` (OpenCode v1), at `@omniroute/opencode-plugin-v2` target OpenCode v2 (tingnan ang [CLI integrations](../guides/CLI-INTEGRATIONS.md) at ang [OpenCode v2 plugin guide](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## Paraan 1 — CLI generator (walang npm install)

Inirerekomenda para sa mga end user. Kasama sa OmniRoute. Direktang isinusulat ang `opencode.json`.

```bash
# Pagkatapos i-install ang OmniRoute (npm i -g @omniroute/cli o lokal na clone)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Sa likod ng mga eksena, tinatawag ng CLI ang `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), kaya napapanatili ng umiiral na `opencode.json` ang iba pang provider at mga komento nito. Idinaragdag o pinapalitan nang atomiko ang entry ng OmniRoute.

Ang mabubuong file (default na catalog ng modelo):

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

## Path 2 — npm package `@omniroute/opencode-provider` (hindi na ginagamit)

> **Hindi na ginagamit.** Ang package ay nagsusulat ng static na listahan ng modelo na lumilipat sa likod ng iyong live OmniRoute catalog. Inirerekomenda ng README nito ang paglipat sa `@omniroute/opencode-plugin` (o `@omniroute/opencode-plugin-v2` sa OpenCode v2). Ang API sa ibaba ay pinananatili para sa mga kasalukuyang script lamang.

Ginagamit kapag ini-script ang config mula sa Node/TS (CI pipelines, monorepos, custom installer flows).

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

Para sa isang hindi mapanirang pagsasama laban sa isang umiiral na file, kopyahin `mergeOpenCodeConfigText()` mula sa `opencodeConfig.ts` o tawagan ang CLI generator.

Tingnan ang [package README](../../@omniroute/opencode-provider/README.md) para sa buong API.

---

## Ang aktuwal na ginagawa ng runtime

Parehong binubuo ng dalawang paraan ang parehong `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Sa runtime, nilo-load ng OpenCode ang `@ai-sdk/openai-compatible` (isa nang transitive dependency ng OpenCode) at kino-configure ito gamit ang `baseURL` + `apiKey`. Mula roon:

```
OpenCode UI/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OpenAI surface ng OmniRoute)
         → OmniRoute /v1/chat/completions handler     (open-sse/handlers/chatCore.ts)
            → combo routing / Auto-Combo / executor
               → upstream provider
```

Hindi kailanman direktang nakikipag-ugnayan ang plugin sa HTTP. Configuration lamang ang inilalabas nito.

---

## Mga default ng catalog ng modelo

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Maaari mo itong i-override sa pamamagitan ng `models: [...]`. Mga inirerekomendang idagdag:

- `"auto"` — inilalantad ang zero-config router na [Auto-Combo](../routing/AUTO-COMBO.md) ng OmniRoute. Hinahayaan nitong piliin ng OpenCode ang "pinakamahusay na available na modelo" nang hindi mo kailangang i-hard-code ang catalog.
- `"<combo-name>"` — anumang combo na tinukoy mo sa dashboard; transparent itong nireresolba ng OmniRoute.

---

## Normalisasyon ng URL

Tinatanggap ng helper ang parehong anyo at naglalabas ng eksaktong isang `/v1`:

| Input                          | Output (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Ang deduplication na ito ang **pinakakaraniwang sanhi ng pagkasira** na nakikita sa mga lumang config. Kung mayroon kang `opencode.json` mula bago ang v3.8.0 na nakaturo sa `/v1/v1/...`, patakbuhing muli ang generator o tawaging muli ang `createOmniRouteProvider`.

---

## Mga mode ng authentication

| Setting ng OmniRoute                            | Inirerekomendang value ng `apiKey`                                      |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (default para sa local) | `sk_omniroute` (literal na placeholder)                                 |
| `REQUIRE_API_KEY=true`                          | Isang tunay na API key para sa bawat user mula sa Dashboard → API Keys. |

Para sa mga Anthropic-style client na nagpapadala ng `x-api-key` + `anthropic-version`, kinikilala rin ng `extractApiKey` ng OmniRoute ang key mula sa `x-api-key`. Ginagamit ng OpenCode ang OpenAI surface, kaya palagi itong magpapadala ng `Authorization: Bearer ${apiKey}` — walang nalalapat na espesyal na kaso para sa Anthropic dito.

---

## Pag-troubleshoot

| Sintomas                                                     | Sanhi                                                                             | Ayos                                                                                                           |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `404` sa bawat request na may URL na naglalaman ng `/v1/v1/` | Lumang config mula sa plugin bago ang v3.8 na nagdoble ng suffix na `/v1`.        | Muling bumuo gamit ang Path 1 o 2.                                                                             |
| `401 Invalid API key`                                        | May `REQUIRE_API_KEY=true` ang OmniRoute at hindi kilala ang key.                 | Gumawa ng key sa dashboard, o itakda ang `REQUIRE_API_KEY=false` (local lamang) at gamitin ang `sk_omniroute`. |
| Walang laman ang listahan ng modelo sa OpenCode UI           | Nakatago sa provider visibility ng OmniRoute ang lahat ng 4 na default na modelo. | Ipasa ang `models: ["auto", ...]` upang ilantad ang mga pinagana mo.                                           |
| OpenCode 500 na may `cannot read property 'models'`          | Hindi tinatanggap ng mas lumang OpenCode (< 0.1.x) ang inline na `models`.        | I-upgrade ang OpenCode sa isang bersyong sumusunod sa v1 schema (`opencode.ai/config.json`).                   |

---

## Tingnan din

- [API reference](../reference/API_REFERENCE.md) — buong OmniRoute REST surface
- [Auto-Combo](../routing/AUTO-COMBO.md) — kung ano ang ibig sabihin ng `model: "auto"`
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (inirerekomenda)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (hindi na ginagamit)
- Pinagmulan: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
