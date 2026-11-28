# OpenCode Integration (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Općenito dostupno.** Publika:** Operatori spajaju OpenCode na OmniRoute implementaciju.** Izvor istine (konfiguracijska shema):** `src/shared/services/opencodeConfig.ts`** Preporučeni npm paketi:** `@omniroute/opencode-plugin/` (OpenCode v1, instalirao `omniroute setup opencode`) i `@omniroute/opencode-plugin-v2/` (OpenCode v2). Stariji `@omniroute/opencode-provider/` paket je** zastario** (vidi Put 2).

[OpenCode](https://opencode.ai) je agentski CLI/desktop AI klijent. Čita svoj katalog pružatelja iz `~/.config/opencode/opencode.json` (ili `opencode.jsonc`) i slijedi shemu na `https://opencode.ai/config.json`. OmniRoute se izlaže OpenCode u kao jedan od onih pružatelja — svaki zahtjev teče kroz OmniRoute-ovu standardnu OpenAI-kompatibilnu `/v1` površinu, tako da OpenCode automatski ima koristi od automatskog kombiniranog usmjeravanja, prekidača strujnog kruga, ključnih pravila, vidljivosti itd.

Ova stranica dokumentira dvije statičke konfiguracijske staze u nastavku; oba generiraju istu konfiguraciju. Za popis modela koji slijedi vaš živi katalog umjesto toga upotrijebite dodatak: `omniroute setup opencode` instalira `@omniroute/opencode-plugin` (OpenCode v1), a `@omniroute/opencode-plugin-v2` cilja OpenCode v2 (pogledajte [CLI integracije](../guides/CLI-INTEGRATIONS.md) i [vodič za dodatak OpenCode v2](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## 1. način — CLI generator (bez npm instalacije)

Preporučuje se krajnjim korisnicima. Isporučuje se s OmniRouteom. Izravno zapisuje `opencode.json`.

```bash
# Nakon instaliranja OmniRoutea (npm i -g @omniroute/cli ili lokalni klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI u pozadini poziva `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), pa postojeći `opencode.json` zadržava ostale pružatelje i komentare. Unos za OmniRoute dodaje se ili zamjenjuje atomski.

Rezultirajuća datoteka (zadani katalog modela):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<vaš-ključ>",
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

## Staza 2 — npm paket `@omniroute/opencode-provider` (zastarjelo)

> **Zastarjelo.** Paket piše statički popis modela koji lebdi iza vašeg live OmniRoute kataloga. Njegov README preporučuje prelazak na `@omniroute/opencode-plugin` (ili `@omniroute/opencode-plugin-v2` na OpenCode v2). API u nastavku čuva se samo za postojeće skripte.

Koristi se prilikom skriptiranja konfiguracije iz Node/TS (CI cjevovoda, monoreposa, tokova prilagođenog programa za instalaciju).

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

Za nedestruktivno spajanje postojeće datoteke, replicirajte `mergeOpenCodeConfigText()` iz `opencodeConfig.ts` ili pozovite CLI generator.

Pogledajte [paket README](../../@omniroute/opencode-provider/README.md) za cijeli API.

---

## Što izvršno okruženje zapravo radi

Oba načina proizvode isti `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Tijekom izvođenja OpenCode učitava `@ai-sdk/openai-compatible` (koji je već prijelazna ovisnost OpenCodea) i konfigurira ga pomoću `baseURL` + `apiKey`. Od tog trenutka:

```
OpenCode korisničko sučelje/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OpenAI sučelje OmniRoutea)
         → OmniRoute rukovatelj /v1/chat/completions  (open-sse/handlers/chatCore.ts)
            → kombinirano usmjeravanje / Auto-Combo / izvršitelj
               → nadređeni pružatelj
```

Dodatak nikada ne pristupa HTTP-u. On samo generira konfiguraciju.

---

## Zadane postavke kataloga modela

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Možete ih nadjačati putem `models: [...]`. Preporučeni dodaci:

- `"auto"` — omogućuje OmniRouteov [Auto-Combo](../routing/AUTO-COMBO.md) usmjerivač bez potrebe za konfiguracijom. Omogućuje OpenCodeu da odabere „najbolji dostupni model” bez ručnog definiranja kataloga.
- `"<combo-name>"` — bilo koja kombinacija koju ste definirali na nadzornoj ploči; OmniRoute je razrješava transparentno.

---

## Normalizacija URL-a

Pomoćna funkcija prihvaća oba oblika i generira točno jedan `/v1`:

| Ulaz                           | Izlaz (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Ova deduplikacija je **najčešći uzrok neispravnosti** u starijim konfiguracijama. Ako imate `opencode.json` iz verzije prije v3.8.0 koji upućuje na `/v1/v1/...`, ponovno pokrenite generator ili ponovno pozovite `createOmniRouteProvider`.

---

## Načini autentifikacije

| Postavka OmniRoutea                         | Preporučena vrijednost za `apiKey`                                         |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (zadano za lokalno) | `sk_omniroute` (doslovna zamjenska vrijednost)                             |
| `REQUIRE_API_KEY=true`                      | Stvarni API ključ za pojedinog korisnika iz Nadzorna ploča → API ključevi. |

Za klijente u stilu Anthropica koji šalju `x-api-key` + `anthropic-version`, OmniRouteov `extractApiKey` također prihvaća ključ iz `x-api-key`. OpenCode koristi OpenAI sučelje, pa će uvijek slati `Authorization: Bearer ${apiKey}` — ovdje se ne primjenjuje poseban slučaj za Anthropic.

---

## Otklanjanje poteškoća

| Simptom                                                 | Uzrok                                                                           | Rješenje                                                                                                           |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `404` na svakom zahtjevu s URL-om koji sadrži `/v1/v1/` | Zastarjela konfiguracija dodatka prije v3.8 koja je dvaput dodavala `/v1`.      | Ponovno je generirajte putem 1. ili 2. načina.                                                                     |
| `401 Invalid API key`                                   | OmniRoute ima `REQUIRE_API_KEY=true`, a ključ nije poznat.                      | Izradite ključ na nadzornoj ploči ili postavite `REQUIRE_API_KEY=false` (samo lokalno) i koristite `sk_omniroute`. |
| Popis modela prazan je u korisničkom sučelju OpenCodea  | Sva 4 zadana modela skrivena su u postavkama vidljivosti pružatelja OmniRoutea. | Proslijedite `models: ["auto", ...]` kako bi se prikazali oni koje ste omogućili.                                  |
| OpenCode vraća 500 uz `cannot read property 'models'`   | Starije verzije OpenCodea (< 0.1.x) nisu prihvaćale ugrađeni `models`.          | Nadogradite OpenCode na verziju koja slijedi v1 shemu (`opencode.ai/config.json`).                                 |

---

## Vidi također

- [API referentna](../reference/API_REFERENCE.md) — puna OmniRoute REST površina
- [Auto-Combo](../routing/AUTO-COMBO.md) — što znači `model: "auto"`
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (preporučeno)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (zastarjelo)
- Izvor: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
