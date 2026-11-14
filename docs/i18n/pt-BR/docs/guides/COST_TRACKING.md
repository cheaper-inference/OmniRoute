# Cost & Spend Tracking (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇫🇷 [fr](../../../fr/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Como o OmniRoute estima, registra e relata o custo de cada solicitação — e por que o
número no painel é um **indicador de economia**, não uma cobrança.

Veja também: [Guia do Usuário](./USER_GUIDE.md) · [Galeria de Recursos](./FEATURES.md)

---

## O que é (e o que não é)

O OmniRoute atribui um custo em USD por solicitação a cada conclusão, multiplicando as
contagens de tokens pelas tarifas do modelo. Esses números alimentam o painel de
**Custos**, a CLI `omniroute cost` / `omniroute usage`, as exportações CSV/JSON e os
orçamentos por chave de API.

> **O "custo" do painel é um indicador de economia, não uma cobrança.** O OmniRoute nunca
> cobra de você — ele encaminha suas solicitações para provedores que você já conectou
> (suas próprias assinaturas, camadas gratuitas e chaves de API). Um "custo total de
> US$ 290" acumulado inteiramente em modelos gratuitos significa aproximadamente
> **US$ 290 que você _não_ pagou** a uma API paga. O valor é uma _estimativa_ de quanto
> o mesmo tráfego teria custado pelos preços de tabela padrão, permitindo que você veja
> onde seu uso está concentrado e quanto o encaminhamento para provedores mais
> baratos/gratuitos está economizando.

Essa interpretação é declarada diretamente no [README](../../README.md) do projeto
("o 'custo' do painel é um indicador de economia, não uma cobrança").

Como o número é uma estimativa:

- Ele depende da tabela de preços que o OmniRoute possui para cada modelo. Um modelo sem
  uma entrada de preço contribui com custo `0` (ele aparece como uma linha
  "Legado / Gratuito" no explorador).
- O tráfego de camadas gratuitas e assinaturas ainda acumula um custo _estimado_ — esse
  é o valor que você está economizando, não um valor devido.

---

## Como os custos são estimados

### A fonte de preços

Os custos vêm da tabela de preços mesclada em [`src/lib/db/settings/pricing.ts`](../../src/lib/db/settings/pricing.ts), nesta ordem de precedência (** mais alto primeiro** ):

1. **Substituições de usuário** preços — definidos no painel ou via `PATCH /api/pricing` (o namespace `pricing` ).
2. **sincronização de modelos.dev** Preço — obtido do `https://models.dev/api.json` (o namespace `models_dev_pricing` ).
3. **sincronização LiteLLM** preços — obtidos do `model_prices_and_context_window.json` público de LiteLLM(o namespace `pricing_synced` ).
4. **Padrões codificados** taxas — enviadas em [`src/shared/constants/pricing/`](../../src/shared/constants/pricing/).

Para o mesmo provider/model, os valores das camadas de maior prioridade substituem os campos correspondentes nas camadas inferiores; campos ausentes de uma camada superior ainda podem vir de uma camada inferior. A ordem é fixa mesmo quando ambos os trabalhos de sincronização independentes são executados ao mesmo tempo. `GET /api/pricing?includeSources=1` retorna `pricing` e `sourceMap`, cujos rótulos por modelo (`user`, `modelsDev`, `litellm`, `default`) identificam a camada de maior prioridade que contém esse modelo.

**sincronização LiteLLM** é opcional, desabilitado por padrão. Suas variáveis de ambiente (veja [`.env.example`](../../.env.example) ) são:

| Variável ambiente       | Padrão    | Propósito                                                                                  |
| ----------------------- | --------- | ------------------------------------------------------------------------------------------ |
| `PRICING_SYNC_ENABLED`  | `false`   | Ative a sincronização de preços LiteLLM em segundo plano.                                  |
| `PRICING_SYNC_INTERVAL` | `86400`   | Intervalo de sincronização em segundos (diariamente).                                      |
| `PRICING_SYNC_SOURCES`  | `litellm` | Seleção de fonte apenas para esta sincronização; atualmente apenas `litellm` é compatível. |

**sincronização de modelos.dev** é separado da sincronização LiteLLM e também está desabilitado por padrão. Habilite-o em Configurações (sincronização de models.dev) ou use estas variáveis:

| Variável ambiente          | Padrão         | Propósito                                                                                                                                                         |
| -------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MODELS_DEV_SYNC_ENABLED`  | _(desativado)_ | Desativar segue a alternância de configurações; `1/true/on/yes` força a ativação e `0/false/off/no` força a desativação (mesmo que as configurações o habilitem). |
| `MODELS_DEV_SYNC_INTERVAL` | `86400`        | Intervalo de sincronização padrão models.dev em segundos (diariamente).                                                                                           |

`PRICING_SYNC_SOURCES` faz** não** habilitar modelos.dev; ele controla apenas a sincronização LiteLLM. A exclusão de uma substituição de usuário não limpa nenhum namespace sincronizado; a próxima camada de preços disponível entra em vigor. Para um modelo sem preço, verifique as configurações de sincronização e o `sourceMap` antes de adicionar uma substituição manual.

### A fórmula de custo

O custo é calculado por solicitação a partir de contagens de tokens e taxas por milhão de tokens em [`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts) (`computeCostFromPricing` / `calculateCost`):

- **Tokens de entrada** (menos leituras de cache e tokens de criação de cache) × `input` rate.
- **Tokens de leitura de cache** taxa × `cached` (volta para a taxa de entrada).
- **Tokens de criação de cache** taxa × `cache_creation` (volta para a taxa de entrada).
- **Tokens de saída** taxa × `output`.
- **Tokens de raciocínio** taxa × `reasoning` (volta para a taxa de saída).

Todas as taxas são interpretadas como USD por 1.000.000 de tokens. Um nível de serviço Codex "rápido"/"prioritário" ou "flexível" aplica um multiplicador de custo (`getCodexFastCostMultiplier`). — por exemplo, flex é cobrado com um desconto simbólico de 50%, apresentado como** poupança flexível** no painel.

Os nomes dos modelos são normalizados primeiro (os prefixos do caminho do provedor, como `openai/` ou `accounts/fireworks/models/` são removidos) para que as linhas históricas ainda correspondam a um preço.

### Como os gastos são registrados

- O custo por solicitação é calculado na conclusão da solicitação. O consumo da cota compartilhada é agendado no próximo tick do loop de eventos via [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- O gasto da chave de API é armazenado em buffer e liberado em lotes pelo [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (intervalo de liberação padrão de 60 segundos, buffer de 1.000 entradas). Ajustável via:

  | Variável ambiente                   | Padrão  | Propósito                                        |
  | ----------------------------------- | ------- | ------------------------------------------------ |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Intervalo de liberação em milissegundos.         |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Máximo de entradas em buffer antes da liberação. |

Os custos preferem uma cobrança exata informada pelo provedor (`provider_cost_usd`), depois um instantâneo de solicitação com preço de catálogo (`calculated_cost_usd`) e, em seguida, uma redefinição de preço do token do catálogo atual. Os custos armazenados não são cobrados novamente através da contagem de tokens. As linhas somente de token legado ainda mudam quando o preço de catálogo muda.

### OCR e incorporações

- Solicitações `/v1/ocr` bem-sucedidas usam `usage_info.pages_processed` upstream, não o intervalo de páginas solicitado ou o número de objetos de página retornados. A estimativa é de páginas × `ocr_cost_per_page` (absoluto USD/page,** não** USD/million).
- Solicitações com anotações de documento ou caixa delimitadora exigem uma tarifa `ocr_cost_per_annotated_page` separada. Sem isso, o custo permanece desconhecido; a tarifa OCR normal não é substituída silenciosamente.
- LiteLLM sync mapeia seu campo upstream `annotation_cost_per_page` em `ocr_cost_per_annotated_page`, retendo o valor USD/page absoluto e entradas somente de anotação, incluindo zero explícito. Um campo canônico fornecido tem precedência; valores de alias inválidos são ignorados. As substituições de preços do usuário mantêm a prioridade normal. Consulte [as chaves de preços OCR do LiteLLM](https://docs.litellm.ai/docs/providers/mistral_batches#batch-ocr-cost-tracking).
- O uso OCR armazena a contagem de páginas, o preço unitário, o custo USD calculado, a chave API e a conexão selecionada. As páginas nunca são representadas como tokens. Os registros de chamadas contêm metadados de cobrança, não documentos URLs, PDF bytes ou texto extraído.
- As solicitações `/v1/embeddings` bem-sucedidas registram uma linha de uso por lote físico, incluindo lotes separados concluídos no mesmo milissegundo. As cobranças informadas pelo provedor têm precedência sobre as estimativas simbólicas; wrappers combinados não adicionam cobrança.
- O histórico de uso, a análise de custos, as janelas provider/account, os limites de gastos da chave de API, o livro-razão de custos de solicitação e os acúmulos de uso diário incluem essas cobranças. As chaves sem registro mantêm a contabilidade numérica sem reter o texto fonte.
- O uso ou as tarifas ausentes são** desconhecido** , não gratuito: o cabeçalho de custo de resposta é omitido e a política de uso sem preço existente se aplica a chaves API limitadas. As taxas zero explicitamente configuradas permanecem válidas para uso de custo zero.

Esta é uma contabilidade somente futura. Chamadas OCR/embedding antigas que nunca gravaram o histórico de uso não podem ser reconstruídas a partir desta migração. As estimativas de catálogo são estimativas USD, não uma fatura, e não incluem conversão de moeda, impostos ou descontos.

### Fala e imagens

- As tentativas bem-sucedidas `/v1/audio/transcriptions`, `/v1/audio/speech` e geração de imagens compartilham a contabilidade numérica. As chamadas diretas e combinadas carregam a chave API do chamador e a conexão selecionada; um wrapper combinado nunca adiciona um segundo débito.
- USD informado pelo provedor vence uma estimativa de catálogo, incluindo uma cobrança zero explícita. OpenRouterJSON de `usage.cost` é normalizado para `cost_usd`. Caso contrário, os tokens medidos usam preços de token, os segundos de transcrição usam preços por segundo, a entrada de fala usa contagens de caracteres Unicode e as imagens de preço fixo usam o número realmente retornado, não o `n` solicitado.
- O binário OpenRouter TTS não possui corpo de uso JSON. Depois que o áudio for concluído ou o chamador cancelar, OmniRoute consulta sua geração ID no** mesmo** origem OpenRouter configurada. Uma solicitação EU nunca retorna à origem global. Esta é uma pesquisa limitada e somente leitura; a síntese não é repetida para contabilização. Os registros de cobrança podem aparecer após o término do áudio: novas tentativas de pesquisa são executadas em segundo plano por até 52 segundos, incluindo prazos de rede.
- Durante essa pesquisa, a resposta de áudio possui `X-OmniRoute-Cost-Status: pending` e nenhum cabeçalho de custo de resposta. Sua cobrança final aparece no histórico de uso, na análise e no livro principal após a reconciliação. Se os metadados não estiverem disponíveis, é utilizado um instantâneo tarifário configurado; caso contrário, o custo permanecerá desconhecido.
- Contagens de segundos, caracteres e imagens têm campos de unidade de cobrança separados, nunca contagens de tokens falsos. A contabilidade retém apenas o uso numérico, não texto de fala, transcrições ou bytes de imagem. As isenções existentes para imagens sem preço permanecem inalteradas: uma tarifa de imagem genuinamente ausente não bloqueia novamente uma chave limitada e a resposta omite o cabeçalho de custo em vez de declarar a chamada gratuita. Uma falha na loja de preços ainda retém evidências de uso para aplicação de falha fechada.

Nenhuma cobrança histórica speech/image é inventada ou preenchida. A faturação do prestador continua a ser a referência para faturas e chamadas cuja cobrança não foi reportada.

---

## Dashboard: a página de Custos

A página **Custos** fica em `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Sua visualização principal é a aba **Visão geral de custos**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
que carrega todos os dados de `GET /api/usage/analytics`.

O que ela mostra:

- **Blocos de gastos** — gastos estimados para _Hoje (1d)_, _7d_, _30d_ e o período
  selecionado. Seletor de intervalo: `7d`, `30d`, `90d`, `all`.
- **Métricas de destaque** — solicitações no período, provedores ativos, modelos ativos e
  custo médio por solicitação.
- **Explorador de custos** — uma tabela ordenável e filtrável agrupada por **provedor**, **modelo**,
  **chave de API**, **conta** ou **nível de serviço**, com custo, solicitações, tokens, custo
  médio por solicitação e percentual do total.
- **Uso de tokens** — total de tokens / tokens de entrada / tokens de saída e proporção entre entrada e saída.
- **Eficiência do roteamento** — quantidade de fallbacks, taxa de fallback e cobertura do modelo solicitado.
- **Previsão mensal** — projeta os gastos até o fim do mês com base na média diária recente.
- **Comparação de períodos** — variação percentual entre a primeira e a segunda metade do período.
- **Gráficos** — tendência diária de custos, participação por provedor (pizza), principais provedores, principais modelos, custo
  por chave de API, custo por conta, padrão de uso semanal e um mapa de calor de atividade.
- **Exportação** — baixe o período atual como **CSV** ou **JSON** (os botões aparecem
  quando há dados de custo diferentes de zero).

Quando não há tráfego com preço definido, as linhas exibem o rótulo "Legado / Gratuito" em vez de `$0`,
refletindo o modelo de acompanhamento de economia.

### Subpáginas relacionadas a Custos

A área de Custos também inclui (todas em `/dashboard/costs/`):

- **Preços** (`/dashboard/costs/pricing`) — visualize e substitua os preços por modelo (renderiza
  a aba compartilhada de Preços).
- **Orçamento** (`/dashboard/costs/budget`) — defina limites de gastos por escopo (renderiza a aba
  compartilhada de Orçamento).
- **Compartilhamento de cota** (`/dashboard/costs/quota-share`) — pools de cotas compartilhadas e visualizações
  da taxa de consumo.

---

## Pontos de extremidade API

Tudo isso requer autenticação de gerenciamento (loopback/JWT, via `requireManagementAuth`), salvo indicação em contrário.

### Análise de uso e custos

| Método | Ponto final              | Propósito                                                                                                                                                          |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/usage/analytics`   | Análise cost/usage completa: resumo, tendência diária, por provider/model/API key/account/tier. Consulta: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Utilização da cota por provedor ao longo do tempo. Consulta: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                          |
| `GET`  | `/api/usage/history`     | Linhas do histórico de uso bruto.                                                                                                                                  |
| `GET`  | `/api/usage/call-logs`   | Logs de chamadas por solicitação (modelo, tokens, custo, latência, status).                                                                                        |
| `GET`  | `/api/usage/quota`       | Status da cota do provedor.                                                                                                                                        |
| `GET`  | `/api/usage/proxy-logs`  | Logs de solicitação de proxy.                                                                                                                                      |

### Orçamentos

| Método | Ponto final              | Propósito                                                                                                      |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Resumo de custos verificação de orçamento + para uma chave API (parâmetro de consulta `apiKeyId` obrigatório). |
| `POST` | `/api/usage/budget`      | Definir limites daily/weekly/monthly USD limite de aviso + para uma chave API.                                 |
| `GET`  | `/api/usage/budget/bulk` | Resumos de orçamento em massa nas chaves API.                                                                  |

> O orçamento API tem como escopo** chave API** (`apiKeyId`). Os limites retornados por `GET /api/usage/budget` incluem `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`, a `warningThreshold` e os totais acumulados (`totalCostToday`, `totalCostMonth`,…).

### Preços

| Método   | Ponto final             | Propósito                                                                                                                                                         |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Preços mesclados de quatro camadas (usuário, models.dev, LiteLLM, padrões). `?includeSources=1` retorna `pricing` + `sourceMap`.                                  |
| `PATCH`  | `/api/pricing`          | Substituir preços para `{ provider: { model: { input, output, cached, … } } }`.                                                                                   |
| `DELETE` | `/api/pricing`          | Remover substituições de preços do usuário (opcionalmente com escopo `?provider=&model=`); taxas sincronizadas ou padrões integrados permanecem como substitutos. |
| `GET`    | `/api/pricing/defaults` | Mostrar taxas de fallback per-1M padrão.                                                                                                                          |
| `GET`    | `/api/pricing/models`   | Preços definidos por modelo.                                                                                                                                      |
| `POST`   | `/api/pricing/sync`     | Acione uma sincronização manual de fontes externas (LiteLLM).                                                                                                     |
| `GET`    | `/api/pricing/sync`     | Status de sincronização atual.                                                                                                                                    |
| `DELETE` | `/api/pricing/sync`     | Limpar apenas preços sincronizados com LiteLLM (`pricing_synced`); Os dados de models.dev são separados.                                                          |

### Outros endpoints relevantes em termos de custos

| Método | Ponto final                   | Propósito                                                                           |
| ------ | ----------------------------- | ----------------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Totais de tokens de modelo gratuito, usados neste mês e subsídio gratuito restante. |
| `GET`  | `/api/quota/pools/[id]/usage` | Uso para um pool de cota compartilhada.                                             |

---

## CLI

A CLI do OmniRoute disponibiliza comandos de custo, uso e preços (registrados em
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Um relatório de custos agregado a partir de `/api/usage/analytics`.

```bash
omniroute cost                          # últimos 30d, agrupados por provedor
omniroute cost --period 7d              # últimos 7 dias
omniroute cost --group-by model         # agrupar por provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Colunas: grupo, requisições, tokens de entrada/saída, custo (USD) e % do total. Uma linha com o total geral
é exibida ao final (suprimida com `--quiet` ou `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # resumo de custos por provedor
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Orçamentos
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` lê `GET /api/pricing/defaults`. Para editar os preços de modelos individuais,
> use a página **Preços** do painel ou `PATCH /api/pricing`.

---

## Solução de problemas

- **Todos os custos mostram $0 / "Legacy / Free".** Os modelos em uso não têm uma entrada de preços.
  Ative a sincronização externa (`PRICING_SYNC_ENABLED=true`) e execute `omniroute pricing sync`, ou
  defina os preços manualmente pela página Preços / `PATCH /api/pricing`.
- **Um modelo histórico está com o preço incorreto.** Corrija o preço (substitua-o ou sincronize novamente) — o custo é
  recalculado a partir das contagens de tokens em cada leitura analítica, portanto as estimativas são atualizadas retroativamente.
- **Os gastos estão atrasados em relação ao tempo real.** Os gastos por chave são processados em lotes; reduza
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` caso precise de números mais atualizados.

---

Para saber como isso se integra ao painel mais amplo, consulte o [Guia do Usuário](./USER_GUIDE.md) e
a [Galeria de Recursos](./FEATURES.md).
