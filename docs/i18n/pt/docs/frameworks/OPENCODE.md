# OpenCode Integration (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Estatuto:** Geralmente disponível.** Audiência:** Operadores que ligam OpenCode a uma implementação OmniRoute.** Fonte da verdade (esquema de configuração):** `src/shared/services/opencodeConfig.ts`** Pacotes npm recomendados:** `@omniroute/opencode-plugin/` (OpenCode v1, instalado pelo `omniroute setup opencode`) e `@omniroute/opencode-plugin-v2/` (OpenCode v2). O pacote `@omniroute/opencode-provider/` mais antigo é** obsoleto** (ver Caminho 2).

[OpenCode](https://opencode.ai) é um cliente agente CLI/desktop AI. Lê o seu catálogo de fornecedores em `~/.config/opencode/opencode.json` (ou `opencode.jsonc`) e segue o esquema em `https://opencode.ai/config.json`. OmniRoute expõe-se ao OpenCode como um destes fornecedores — cada pedido flui através da superfície `/v1` padrão compatível com OpenAI do OmniRoute, pelo que OpenCode beneficia automaticamente do encaminhamento Auto-Combo, disjuntores, políticas principais, observabilidade, etc.

Esta página documenta os dois caminhos de configuração estática abaixo; ambos geram a mesma configuração. Para obter uma lista de modelos que segue o seu catálogo ativo, utilize o plug-in: `omniroute setup opencode` instala `@omniroute/opencode-plugin` (OpenCode v1) e `@omniroute/opencode-plugin-v2` tem como alvo OpenCode v2 (consulte [integrações CLI](../guides/CLI-INTEGRATIONS.md) e o [guia do plug-in OpenCode v2](../guides/OPENCODE-V2-PLUGIN.md) ).

---

## Método 1 — Gerador CLI (sem instalar via npm)

Recomendado para utilizadores finais. Incluído no OmniRoute. Escreve diretamente em `opencode.json`.

```bash
# Depois de instalar o OmniRoute (npm i -g @omniroute/cli ou clone local)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Nos bastidores, a CLI chama `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), pelo que um `opencode.json` existente mantém os outros fornecedores e comentários. A entrada do OmniRoute é adicionada/substituída atomicamente.

Ficheiro resultante (catálogo de modelos predefinido):

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

## Caminho 2 — pacote npm `@omniroute/opencode-provider` (obsoleto)

> **Obsoleto.** O pacote grava uma lista de modelos estáticos que se encontra por trás do seu catálogo OmniRoute ativo. O seu README recomenda migrar para `@omniroute/opencode-plugin` (ou `@omniroute/opencode-plugin-v2` no OpenCode v2). O API abaixo é mantido apenas para scripts existentes.

Utilizado ao criar scripts da configuração do Node/TS (CI pipelines, monorepos, fluxos do instalador personalizado).

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

Para uma fusão não destrutiva num ficheiro existente, replique `mergeOpenCodeConfigText()` de `opencodeConfig.ts` ou chame o gerador CLI.

Veja o [pacote README](../../@omniroute/opencode-provider/README.md) para o API completo.

---

## O que o runtime faz realmente

Ambos os métodos produzem o mesmo `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Durante a execução, o OpenCode carrega `@ai-sdk/openai-compatible` (que já é uma dependência transitiva do OpenCode) e configura-o com `baseURL` + `apiKey`. A partir daí:

```
Interface/agente do OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (interface OpenAI do OmniRoute)
         → processador /v1/chat/completions do OmniRoute     (open-sse/handlers/chatCore.ts)
            → encaminhamento combinado / Auto-Combo / executor
               → fornecedor a montante
```

O plugin nunca interage diretamente com HTTP. Limita-se a emitir a configuração.

---

## Predefinições do catálogo de modelos

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Pode substituir através de `models: [...]`. Adições recomendadas:

- `"auto"` — disponibiliza o router [Auto-Combo](../routing/AUTO-COMBO.md) sem configuração do OmniRoute. Permite que o OpenCode escolha «o melhor modelo disponível» sem ter de codificar manualmente o catálogo.
- `"<combo-name>"` — qualquer combinação que tenha definido no painel; o OmniRoute resolve-a de forma transparente.

---

## Normalização de URLs

A função auxiliar aceita ambos os formatos e produz exatamente um `/v1`:

| Entrada                        | Saída (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Esta desduplicação é **a causa mais comum de falhas** observada em configurações mais antigas. Se tiver um `opencode.json` anterior à v3.8.0 que aponte para `/v1/v1/...`, execute novamente o gerador ou volte a chamar `createOmniRouteProvider`.

---

## Modos de autenticação

| Definição do OmniRoute                       | Valor recomendado de `apiKey`                                |
| -------------------------------------------- | ------------------------------------------------------------ |
| `REQUIRE_API_KEY=false` (predefinição local) | `sk_omniroute` (marcador de posição literal)                 |
| `REQUIRE_API_KEY=true`                       | Uma chave de API real por utilizador do Painel → Chaves API. |

Para clientes ao estilo da Anthropic que enviam `x-api-key` + `anthropic-version`, o `extractApiKey` do OmniRoute também aceita a chave de `x-api-key`. O OpenCode utiliza a interface OpenAI, pelo que enviará sempre `Authorization: Bearer ${apiKey}` — não se aplica aqui nenhum caso especial da Anthropic.

---

## Resolução de problemas

| Sintoma                                                   | Causa                                                                                       | Correção                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `404` em todos os pedidos com um URL que contém `/v1/v1/` | Configuração obsoleta de um plugin anterior à v3.8 que duplicava o sufixo `/v1`.            | Volte a gerar através do Caminho 1 ou 2.                                                               |
| `401 Invalid API key`                                     | O OmniRoute tem `REQUIRE_API_KEY=true` e a chave é desconhecida.                            | Crie a chave no painel ou defina `REQUIRE_API_KEY=false` (apenas localmente) e utilize `sk_omniroute`. |
| Lista de modelos vazia na interface do OpenCode           | Todos os 4 modelos predefinidos estão ocultos na visibilidade de fornecedores do OmniRoute. | Passe `models: ["auto", ...]` para disponibilizar os que ativou.                                       |
| Erro 500 do OpenCode com `cannot read property 'models'`  | Versões mais antigas do OpenCode (< 0.1.x) não aceitavam `models` inline.                   | Atualize o OpenCode para uma versão que siga o esquema v1 (`opencode.ai/config.json`).                 |

---

## Veja também

- [referência API](../reference/API_REFERENCE.md) — superfície completa OmniRoute REST
- [Auto-Combo](../routing/AUTO-COMBO.md) — o que significa `model: "auto"`
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (recomendado)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (obsoleto)
- Fonte: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
