# OpenCode Integration (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Matsayi:** Gabaɗaya akwai.** Masu sauraro:** Masu aiki suna haɗa OpenCode zuwa tura OmniRoute.** Tushen gaskiya (tsarin tsari):** `src/shared/services/opencodeConfig.ts`** Abubuwan da aka ba da shawarar npm:** `@omniroute/opencode-plugin/` (OpenCode v1, wanda `omniroute setup opencode` ya shigar) da `@omniroute/opencode-plugin-v2/` (OpenCode v2). Tsohuwar kunshin `@omniroute/opencode-provider/` shine** deprecated** (duba Hanya ta 2).

[OpenCode](https://opencode.ai) abokin ciniki ne na CLI/desktop AI. Yana karanta kasidar mai bada sa daga `~/.config/opencode/opencode.json` (ko `opencode.jsonc`) kuma yana bin tsarin a `https://opencode.ai/config.json`. OmniRoute tana fallasa kanta ga OpenCode a matsayin ɗaya daga cikin waɗancan masu samar da — kowace buƙata tana gudana ta daidaitaccen OmniRoute's daidaitaccen OpenAI mai dacewa `/v1`, don haka OpenCode yana fa'ida ta atomatik daga zirga-zirgar Auto-Combo, masu saɓowar kewayawa, mahimman manufofin, lura, da sauransu.

Wannan shafin yana rubuta hanyoyin daidaita-daidaitacce guda biyu a ƙasa; duka suna samar da tsari iri ɗaya. Don lissafin samfurin da ke biye da kas ɗin ku na rayuwa, yi amfani da plugin ɗin maimakon: `omniroute setup opencode` yana shigar da `@omniroute/opencode-plugin` (OpenCode v1), da `@omniroute/opencode-plugin-v2` hari OpenCode v2 (duba [haɗin haɗin CLI](../guides/CLI-INTEGRATIONS.md) da [jagorar plugin OpenCode v2](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## Hanya ta 1 — Mai samarwa ta CLI (ba sai an shigar da npm ba)

An ba da shawarar wannan ga masu amfani na ƙarshe. Yana zuwa tare da OmniRoute. Yana rubuta `opencode.json` kai tsaye a wurinsa.

```bash
# Bayan shigar da OmniRoute (npm i -g @omniroute/cli ko kwafin gida)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

A bayan fage, CLI yana kiran `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), don haka `opencode.json` da ya riga ya kasance zai riƙe sauran masu samar da sabis da sharhinsa. Ana ƙara ko maye gurbin shigarwar OmniRoute ta hanya mai atomic.

Fayil ɗin da aka samar (tsohon kundin samfura):

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

## Hanyar 2 — npm kunshin `@omniroute/opencode-provider` (wanda aka yanke)

> **Deprecated.** Kunshin yana rubuta jeri na ƙirar ƙira wanda ke tafiya a bayan kundin kundin OmniRoute na ku. README ɗinsa yana ba da shawarar ƙaura zuwa `@omniroute/opencode-plugin` (ko `@omniroute/opencode-plugin-v2` akan OpenCode v2). An ajiye API da ke ƙasa don rubutun da ake da su kawai.

Ana amfani dashi lokacin rubuta saitin daga Node/TS (bututun CI, monorepos, mai shigar da al'ada).

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

Don haɗakar da ba ta lalacewa da fayil ɗin data kasance, kwafi `mergeOpenCodeConfigText()` daga `opencodeConfig.ts` ko kira janareta CLI.

Duba [kunshin README](../../@omniroute/opencode-provider/README.md) don cikakken API.

---

## Abin da runtime yake yi a zahiri

Duk hanyoyin biyu suna samar da `provider.omniroute.npm: "@ai-sdk/openai-compatible"` iri ɗaya. A lokacin aiki, OpenCode yana loda `@ai-sdk/openai-compatible` (wanda tuni yake dogaro na kaikaice na OpenCode) kuma yana daidaita shi da `baseURL` + `apiKey`. Daga nan:

```
Fuskar OpenCode/wakili
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (Fuskar OmniRoute ta OpenAI)
         → Mai sarrafa OmniRoute /v1/chat/completions (open-sse/handlers/chatCore.ts)
            → turawar combo / Auto-Combo / executor
               → mai samar da sabis na sama
```

Plugin ɗin ba ya hulɗa da HTTP ko kaɗan. Yana samar da daidaitawa ne kawai.

---

## Tsoffin katalogin samfura

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Za ka iya sauya su ta hanyar `models: [...]`. Ƙarin da ake ba da shawara:

- `"auto"` — yana bayyana na'ura mai ba da hanya ta [Auto-Combo](../routing/AUTO-COMBO.md) ta OmniRoute wadda ba ta buƙatar saiti. Yana ba OpenCode damar zaɓar "mafi kyawun samfurin da ake da shi" ba tare da ka ƙayyade katalogin kai tsaye a lamba ba.
- `"<combo-name>"` — duk wani combo da ka ayyana a dashboard; OmniRoute yana warware shi ba tare da wani ƙarin aiki daga gare ka ba.

---

## Daidaita URL

Kayan taimakon yana karɓar duka nau'ikan kuma yana fitar da `/v1` guda ɗaya tak:

| Shigarwa                       | Fitarwa (`options.baseURL`) |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Wannan cire maimaitawar ita ce **matsalar da aka fi gani** a tsofaffin saituna. Idan kana da `opencode.json` daga sigar da ta gabaci v3.8.0 wanda ke nuni zuwa `/v1/v1/...`, sake gudanar da na'urar ƙirƙirawa ko kuma sake kiran `createOmniRouteProvider`.

---

## Hanyoyin tantancewa

| Saitin OmniRoute                            | Ƙimar `apiKey` da ake ba da shawara                                    |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (tsoho don na gida) | `sk_omniroute` (madadin rubutu na zahiri)                              |
| `REQUIRE_API_KEY=true`                      | Maɓallin API na ainihi na kowane mai amfani daga Dashboard → API Keys. |

Ga clients masu salon Anthropic waɗanda ke aika `x-api-key` + `anthropic-version`, `extractApiKey` na OmniRoute yana kuma karɓar maɓallin daga `x-api-key`. OpenCode yana amfani da fuskar OpenAI, saboda haka koyaushe zai aika `Authorization: Bearer ${apiKey}` — babu wani keɓantaccen yanayin Anthropic da ya shafi wannan.

---

## Warware matsaloli

| Alama                                                | Dalili                                                              | Gyara                                                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `404` kan kowace buƙata mai URL ɗauke da `/v1/v1/`   | Tsohon saiti daga plugin na kafin v3.8 wanda ya ninka ƙarin `/v1`.  | Sake ƙirƙira ta Hanya ta 1 ko ta 2.                                                                                   |
| `401 Invalid API key`                                | OmniRoute yana da `REQUIRE_API_KEY=true` kuma ba a san maɓallin ba. | Ƙirƙiri maɓallin a dashboard, ko saita `REQUIRE_API_KEY=false` (na gida kawai) sannan ka yi amfani da `sk_omniroute`. |
| Jerin samfura babu komai a UI na OpenCode            | An ɓoye duk tsoffin samfura 4 a ganuwar provider ta OmniRoute.      | Wuce `models: ["auto", ...]` don bayyana waɗanda ka kunna.                                                            |
| OpenCode 500 tare da `cannot read property 'models'` | Tsohon OpenCode (< 0.1.x) bai karɓi `models` na cikin layi ba.      | Sabunta OpenCode zuwa sigar da ke bin tsarin v1 (`opencode.ai/config.json`).                                          |

---

## Duba kuma

- [API reference](../reference/API_REFERENCE.md) — cikakken OmniRoute REST surface
- [Auto-Combo](../routing/AUTO-COMBO.md) — me `model: "auto"` ke nufi
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (an ba da shawarar)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (deprecated)
- Source: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
