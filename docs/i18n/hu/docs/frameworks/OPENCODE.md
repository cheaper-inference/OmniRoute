# OpenCode Integration (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Állapot:** Általában elérhető.** Közönség:** Az üzemeltetők OpenCode a OmniRoute telepítéshez csatlakoztatják.** Az igazság forrása (konfigurációs séma):** `src/shared/services/opencodeConfig.ts`** Ajánlott npm csomagok:** `@omniroute/opencode-plugin/` (OpenCode v1, telepítette: `omniroute setup opencode`) és `@omniroute/opencode-plugin-v2/` (OpenCode v2). A régebbi `@omniroute/opencode-provider/` csomag az** elavult** (lásd 2. útvonal).

[OpenCode](https://opencode.ai) egy ügynöki CLI/desktop AI kliens. Beolvassa a szolgáltatói katalógust `~/.config/opencode/opencode.json` ből (vagy `opencode.jsonc`), és követi a `https://opencode.ai/config.json` sémáját. OmniRoute kiszolgáltatja magát OpenCode, mint azon szolgáltatók egyike — minden kérés OmniRoute szabványos OpenAI-kompatibilis `/v1` felületén halad át, így OpenCode automatikusan profitál az Auto-Combo útválasztásból, a megszakítókból, a kulcsszabályokból, a megfigyelhetőségből stb.

Ez az oldal az alábbi két statikus konfigurációs útvonalat dokumentálja; mindkettő ugyanazt a konfigurációt generálja. Az élő katalógust követő modelllistához használja helyette a beépülő modult: `omniroute setup opencode` telepíti `@omniroute/opencode-plugin` (OpenCode v1), `@omniroute/opencode-plugin-v2` pedig OpenCode v2-t célozza meg (lásd [CLI integrációkat](../guides/CLI-INTEGRATIONS.md) és a [OpenCode v2 beépülő modul útmutatóját](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## 1. útvonal — CLI-generátor (npm-telepítés nélkül)

Végfelhasználók számára ajánlott. Az OmniRoute részeként érkezik. Helyben írja az `opencode.json` fájlt.

```bash
# Az OmniRoute telepítése után (npm i -g @omniroute/cli vagy helyi klón)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

A háttérben a CLI a `mergeOpenCodeConfigText()` függvényt hívja meg (`src/shared/services/opencodeConfig.ts:104`), így egy meglévő `opencode.json` megtartja a többi szolgáltatóját és megjegyzését. Az OmniRoute-bejegyzés hozzáadása vagy lecserélése atomi módon történik.

Az eredményül kapott fájl (alapértelmezett modellkatalógus):

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

## 2. elérési út — npm csomag `@omniroute/opencode-provider` (elavult)

> **Elavult.** A csomag statikus modelllistát ír, amely az élő OmniRoute katalógus mögé sodródik. README je `@omniroute/opencode-plugin` (vagy OpenCode v2-n a `@omniroute/opencode-plugin-v2` ) való áttérést javasolja. Az alábbi API csak a meglévő szkriptekhez van megtartva.

A konfiguráció leírásakor használatos a Node/TS (CI pipelines, monorepos, egyéni telepítőfolyamok).

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

Egy létező fájl roncsolásmentes egyesítéséhez replikálja `mergeOpenCodeConfigText()` `opencodeConfig.ts` fájlból, vagy hívja a CLI generátort.

Tekintse meg a [README csomagot](../../@omniroute/opencode-provider/README.md) a teljes API ért.

---

## Mit végez ténylegesen a futtatókörnyezet?

Mindkét útvonal ugyanazt a `provider.omniroute.npm: "@ai-sdk/openai-compatible"` beállítást hozza létre. Futásidőben az OpenCode betölti az `@ai-sdk/openai-compatible` csomagot (amely már eleve az OpenCode tranzitív függősége), majd konfigurálja azt a `baseURL` és az `apiKey` használatával. Ettől kezdve:

```
OpenCode felhasználói felület/ügynök
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (az OmniRoute OpenAI-felülete)
         → OmniRoute /v1/chat/completions kezelő      (open-sse/handlers/chatCore.ts)
            → kombinált útválasztás / Auto-Combo / végrehajtó
               → felsőbb szintű szolgáltató
```

A beépülő modul soha nem kezel HTTP-forgalmat. Kizárólag konfigurációt állít elő.

---

## A modellkatalógus alapértelmezései

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Felülírhatja a `models: [...]` beállítással. Ajánlott kiegészítések:

- `"auto"` — elérhetővé teszi az OmniRoute [Auto-Combo](../routing/AUTO-COMBO.md) konfigurációt nem igénylő útválasztóját. Lehetővé teszi, hogy az OpenCode válassza ki „a legjobb elérhető modellt” anélkül, hogy a katalógust közvetlenül a kódba kellene írnia.
- `"<combo-name>"` — bármely, az irányítópulton meghatározott kombináció; az OmniRoute transzparens módon feloldja.

---

## URL-normalizálás

A segédfüggvény mindkét formátumot elfogadja, és pontosan egy `/v1` elemet ad hozzá:

| Bemenet                        | Kimenet (`options.baseURL`) |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Ez a duplikáció megszüntetése a régebbi konfigurációknál tapasztalt **leggyakoribb hibaforrás**. Ha olyan, v3.8.0 előtti `opencode.json` fájlja van, amely a `/v1/v1/...` útvonalra mutat, futtassa újra a generátort, vagy hívja meg ismét a `createOmniRouteProvider` függvényt.

---

## Hitelesítési módok

| OmniRoute-beállítás                               | Ajánlott `apiKey` érték                                                       |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (helyben alapértelmezett) | `sk_omniroute` (szó szerinti helyőrző)                                        |
| `REQUIRE_API_KEY=true`                            | Felhasználónkénti valódi API-kulcs az Irányítópult → API-kulcsok menüpontból. |

Az `x-api-key` + `anthropic-version` fejléceket küldő Anthropic-stílusú kliensek esetén az OmniRoute `extractApiKey` függvénye az `x-api-key` fejlécből származó kulcsot is elfogadja. Az OpenCode az OpenAI-felületet használja, ezért mindig az `Authorization: Bearer ${apiKey}` fejlécet küldi — itt nem érvényes semmilyen speciális Anthropic-kezelés.

---

## Hibaelhárítás

| Tünet                                                                  | Ok                                                                                               | Megoldás                                                                                                                                          |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `404` minden olyan kérésnél, amelynek URL-je `/v1/v1/` részt tartalmaz | Elavult konfiguráció a v3.8 előtti bővítményből, amely kétszer fűzte hozzá a `/v1` utótagot.     | Generálja újra az 1. vagy 2. eljárással.                                                                                                          |
| `401 Invalid API key`                                                  | Az OmniRoute-ban `REQUIRE_API_KEY=true` van beállítva, és a kulcs ismeretlen.                    | Hozza létre a kulcsot az irányítópulton, vagy állítsa be a `REQUIRE_API_KEY=false` értéket (csak helyben), és használja a `sk_omniroute` értéket. |
| A modelllista üres az OpenCode felhasználói felületén                  | Mind a 4 alapértelmezett modell rejtve van az OmniRoute szolgáltatói láthatósági beállításaiban. | Adja át a `models: ["auto", ...]` beállítást az engedélyezett modellek megjelenítéséhez.                                                          |
| OpenCode 500 a `cannot read property 'models'` üzenettel               | A régebbi OpenCode (< 0.1.x) nem fogadta el a beágyazott `models` értéket.                       | Frissítse az OpenCode-ot egy, a v1 sémát (`opencode.ai/config.json`) követő verzióra.                                                             |

---

## Lásd még

- [API referencia](../reference/API_REFERENCE.md) — teljes OmniRoute REST felület
- [Auto-Combo](../routing/AUTO-COMBO.md) — mit jelent `model: "auto"`
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (ajánlott)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (elavult)
- Forrás: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
