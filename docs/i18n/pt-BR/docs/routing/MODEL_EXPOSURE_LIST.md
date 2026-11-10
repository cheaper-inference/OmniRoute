# Model Exposure Allow/Deny List (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Ativação, desativada por padrão (`modelVisibilityAllowlist`/`modelVisibilityDenylist` ambos vazios deixam o catálogo `/v1/models` AND cada byte do pool de candidatos `auto/*` idêntico). Um irmão de `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) para operadores que desejam uma lista de modelos com curadoria por motivos que não têm nada a ver com custo.

## Por que isso existe

`hidePaidModels` responde "este modelo é gratuito?" e `hideAutoCombos` responde "os IDs virtuais `auto/*` devem ser anunciados?" — também não permite que um operador selecione um subconjunto arbitrário de modelos (por exemplo, apresentando exatamente os modelos que um determinado cliente Claude Code/ OpenCode deve ver, independentemente do preço). # #11481 adiciona isso como duas configurações de matriz de strings independentes e opcionais.

## Configurações

| Chave                      | Tipo       | Padrão | Significado                                                                             |
| -------------------------- | ---------- | ------ | --------------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`   | As entradas correspondentes a um candidato ocultam-no do pool catalog/candidate.        |
| `modelVisibilityAllowlist` | `string[]` | `[]`   | Quando não vazias, as entradas ONLY correspondentes a um candidato permanecem expostas. |

Ambos aceitam até 500 entradas de até 200 caracteres cada (validado por Zod em `src/shared/validation/settingsSchemas.ts`). Uma entrada é:

- um ID de catálogo exato — `"gpt-4o"` (id de modelo simples) ou `"openai/gpt-4o"` (prefixado pelo provedor), ou
- um padrão glob usando `*`/`?` — por exemplo, `"openai/gpt-4*"` ou `"anthropic/*"` — resolvido através do mesmo matcher `globToRegex()` compartilhado (`src/shared/utils/globPattern.ts`) já usado pelos mapeamentos combinados por modelo de `ModelRoutingSection` e `freeModels.ts::matchesOnlyPaidModels`.

Precedência: a lista de bloqueios é verificada primeiro (uma entrada negada fica sempre oculta, mesmo que também corresponda à lista de permissões); quando a lista de permissões não está vazia, apenas as entradas correspondentes sobrevivem.

## Dois pontos de estrangulamento, não um

A lição de # #6512 (um filtro de catálogo `hidePaidModels` -only ainda permite que `auto/*` seja roteado para um modelo pago, já que o pool de candidatos combo foi construído de forma independente) se aplica de forma idêntica aqui. O predicado correspondente `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) é chamado de BOTH:

- `src/app/api/v1/models/catalog.ts` — a própria listagem `/v1/models`, nos mesmos 5 pontos de estrangulamento por origem `shouldHidePaid()` já bloqueia ( `PROVIDER_MODELS` estático, linhas de provedor sincronizadas, linhas personalizadas, linhas apoiadas por alias, linhas de fallback gerenciadas).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — chamado de `virtualFactory.ts::buildPreparedPool`, imediatamente após a chamada `filterPaidOnlyCandidates()` equivalente, portanto, um modelo negado também nunca pode ser selecionado em um pool de candidatos `auto/*`.

## O que é filtrado NOT

Espelha o comportamento existente de `hideAutoCombos`: um ID de modelo enviado** explicitamente** (não por meio de `auto/*` e não descoberto por meio da listagem do catálogo) nunca é bloqueado no envio — somente a associação advertisement/candidate-pool é filtrada. Isto é independente de `hidePaidModels`; um operador pode querer um conjunto selecionado por motivos que não têm nada a ver com custo, portanto, ambas as configurações são compostas como filtros AND independentes, da mesma forma que a composição multi-sinalizador existente em `catalog.ts`.

A exportação de configurações (`GET /api/settings/export-json`) inclui ambas as matrizes literalmente, como qualquer outro campo de configurações — diferentemente do filtro de exportação de etapa de combinação de `hidePaidModels`, não há risco de reidratação aqui: um ID negado incorporado em uma etapa de combinação exportada é a escolha de roteamento explícita do próprio operador, não algo que o limite de exportação precise remover.

## Listagem somente de combos (`exposeCombosOnly`)

Um booleano separado, também opt-in e `false` por padrão, para implantações onde os combos são a superfície do modelo público e os provedores são apenas back-ends. Quando é `true`, a listagem pública (`GET /v1/models`, `GET /v1` e as outras rotas de descoberta `/v1` construídas em `getUnifiedModelsResponse()`) mantém apenas linhas com `owned_by: "combo"`: combos de usuário mais os combos `auto/*` integrados (a menos que `hideAutoCombos` os oculte). Ele usa o mesmo teste de linha que o `catalogScope: "combos"` por chave, e os filtros allow/deny/scope da própria chave ainda se aplicam na parte superior.

Ative** Configurações Roteamento → Modelos → listagem API** , ou com `PATCH /api/settings {"exposeCombosOnly": true}`.

Assim como as listas acima, apenas altera a propaganda:

- um `provider/model` id explícito ainda é despachado e `GET /v1/models/{id}` ainda o resolve;
- o catálogo do painel (`GET /api/models/catalog`, usado pelos selecionadores de modelos) não é restrito;
- ele não é espelhado nos pools de candidatos `auto/*`, portanto, os combos `auto/*` mantêm seu pool completo.
