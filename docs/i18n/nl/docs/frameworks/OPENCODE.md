# OpenCode Integration (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Algemeen beschikbaar.** Publiek:** Operators die OpenCode aansluiten op een OmniRoute implementatie.** Bron van waarheid (configuratieschema):** `src/shared/services/opencodeConfig.ts`** Aanbevolen npm-pakketten:** `@omniroute/opencode-plugin/` (OpenCode v1, geïnstalleerd door `omniroute setup opencode`) en `@omniroute/opencode-plugin-v2/` (OpenCode v2). Het oudere `@omniroute/opencode-provider/` -pakket is** verouderd** (zie Pad 2).

[OpenCode](https://opencode.ai) is een agentische CLI/desktop AI client. Het leest zijn providercatalogus van `~/.config/opencode/opencode.json` (of `opencode.jsonc`) en volgt het schema op `https://opencode.ai/config.json`. OmniRoute stelt zichzelf bloot aan OpenCode als een van die providers — elk verzoek stroomt door OmniRoute's standaard OpenAI-compatibele `/v1` oppervlak, dus OpenCode profiteert automatisch van Auto-Combo-routing, stroomonderbrekers, sleutelbeleid, observatie, enz.

Deze pagina documenteert de twee onderstaande static-config-paden; beide genereren dezelfde configuratie. Voor een modellijst die uw live catalogus volgt, gebruikt u in plaats daarvan de plug-in: `omniroute setup opencode` installeert `@omniroute/opencode-plugin` (OpenCode v1) en `@omniroute/opencode-plugin-v2` richt zich op OpenCode v2 (zie [CLI integraties](../guides/CLI-INTEGRATIONS.md) en de [OpenCode v2-plug-inhandleiding](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## Methode 1 — CLI-generator (geen npm-installatie)

Aanbevolen voor eindgebruikers. Wordt meegeleverd met OmniRoute. Schrijft `opencode.json` op de bestaande locatie.

```bash
# Na installatie van OmniRoute (npm i -g @omniroute/cli of lokale kloon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Achter de schermen roept de CLI `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) aan, zodat een bestaande `opencode.json` de overige providers en opmerkingen behoudt. De OmniRoute-vermelding wordt atomair toegevoegd of vervangen.

Resulterend bestand (standaardmodelcatalogus):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<uw-sleutel>",
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

## Pad 2 — npm-pakket `@omniroute/opencode-provider` (verouderd)

> **Afgekeurd.** Het pakket schrijft een statische modellijst die achter uw live OmniRoute catalogus zweeft. De README raadt aan om naar `@omniroute/opencode-plugin` te migreren (of `@omniroute/opencode-plugin-v2` op OpenCode v2). De onderstaande API wordt alleen voor bestaande scripts bewaard.

Wordt gebruikt bij het scripten van de configuratie van Node/TS (CI pijplijnen, monorepos, aangepaste installatiestromen).

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

Voor een niet-destructieve samenvoeging van een bestaand bestand repliceert u `mergeOpenCodeConfigText()` vanuit `opencodeConfig.ts` of roept u de CLI generator aan.

Zie het [pakket README](../../@omniroute/opencode-provider/README.md) voor de volledige API.

---

## Wat de runtime daadwerkelijk doet

Beide methoden produceren dezelfde `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Tijdens runtime laadt OpenCode `@ai-sdk/openai-compatible` (al een transitieve afhankelijkheid van OpenCode) en configureert het pakket met `baseURL` + `apiKey`. Vanaf daar:

```
OpenCode-UI/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OpenAI-interface van OmniRoute)
         → OmniRoute-handler voor /v1/chat/completions (open-sse/handlers/chatCore.ts)
            → combo-routering / Auto-Combo / executor
               → upstream-provider
```

De plug-in verwerkt nooit HTTP-verkeer. Deze genereert uitsluitend configuratie.

---

## Standaardwaarden voor de modelcatalogus

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Je kunt dit overschrijven via `models: [...]`. Aanbevolen toevoegingen:

- `"auto"` — maakt OmniRoute's [Auto-Combo](../routing/AUTO-COMBO.md)-router zonder configuratie beschikbaar. Hiermee kan OpenCode „het beste beschikbare model” kiezen zonder dat je de catalogus hardcodeert.
- `"<combo-name>"` — elke combo die je in het dashboard hebt gedefinieerd; OmniRoute handelt deze transparant af.

---

## URL-normalisatie

De helper accepteert beide vormen en genereert exact één `/v1`:

| Invoer                         | Uitvoer (`options.baseURL`) |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Deze deduplicatie is **het meest voorkomende probleem** in oudere configuraties. Als je een `opencode.json` van vóór v3.8.0 hebt die naar `/v1/v1/...` verwijst, voer dan de generator opnieuw uit of roep `createOmniRouteProvider` opnieuw aan.

---

## Authenticatiemodi

| OmniRoute-instelling                       | Aanbevolen waarde voor `apiKey`                               |
| ------------------------------------------ | ------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (standaard lokaal) | `sk_omniroute` (letterlijke tijdelijke aanduiding)            |
| `REQUIRE_API_KEY=true`                     | Een echte API-sleutel per gebruiker uit Dashboard → API Keys. |

Voor clients in Anthropic-stijl die `x-api-key` + `anthropic-version` verzenden, accepteert OmniRoute's `extractApiKey` ook de sleutel uit `x-api-key`. OpenCode gebruikt de OpenAI-interface en verzendt dus altijd `Authorization: Bearer ${apiKey}` — hier is geen speciale verwerking voor Anthropic van toepassing.

---

## Problemen oplossen

| Symptoom                                         | Oorzaak                                                                             | Oplossing                                                                                                           |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `404` bij elk verzoek met `/v1/v1/` in de URL    | Verouderde configuratie van een plug-in van vóór v3.8 die `/v1` dubbel toevoegde.   | Genereer de configuratie opnieuw via pad 1 of 2.                                                                    |
| `401 Invalid API key`                            | OmniRoute heeft `REQUIRE_API_KEY=true` en de sleutel is onbekend.                   | Maak de sleutel in het dashboard aan, of stel `REQUIRE_API_KEY=false` in (alleen lokaal) en gebruik `sk_omniroute`. |
| Modellijst is leeg in de OpenCode-interface      | Alle 4 standaardmodellen zijn verborgen via de providerzichtbaarheid van OmniRoute. | Geef `models: ["auto", ...]` door om de modellen beschikbaar te maken die je hebt ingeschakeld.                     |
| OpenCode 500 met `cannot read property 'models'` | Oudere OpenCode-versies (< 0.1.x) accepteerden geen inline `models`.                | Upgrade OpenCode naar een versie die het v1-schema (`opencode.ai/config.json`) volgt.                               |

---

## Zie ook

- [API referentie](../reference/API_REFERENCE.md) — volledig OmniRoute REST oppervlak
- [Auto-Combo](../routing/AUTO-COMBO.md) — wat `model: "auto"` betekent
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (aanbevolen)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (verouderd)
- Bron: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
