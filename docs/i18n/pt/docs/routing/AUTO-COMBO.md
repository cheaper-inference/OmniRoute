# OmniRoute Auto-Combo Engine (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Para Utilizadores**: Procura uma forma de começar rapidamente? Consulte o [Guia do Utilizador do Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) para obter explicações e exemplos simples.

> Cadeias de modelos autogeridas com pontuação adaptativa + encaminhamento automático sem configuração

## Encaminhamento automático de configuração zero (prefixo `auto/` )

Nenhuma criação de combo é necessária. Utilize `auto` ou uma variante `auto/` diretamente no seu cliente.

### Exemplos rápidos

| Modelo ID           | Comportamento                                                                                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`              | Modelos de fornecedores elegíveis, estratégia LKGP e pesos equilibrados                                                                                           |
| `auto/coding`       | Pesos de qualidade em primeiro lugar para tarefas de codificação                                                                                                  |
| `auto/fast`         | Favorece menor latência e fornecedores saudáveis                                                                                                                  |
| `auto/cheap`        | Pesos de redução de custos: favorece preços de catálogo mais baixos; mantém a aderência LKGP, e não uma classificação estritamente mais barata                    |
| `auto/subscription` | Apenas quota incluída no plano, verificada ao vivo; um pool vazio retorna HTTP 503, nunca um substituto cobrado                                                   |
| `auto/thrifty`      | subscrição → keyless → grátis → barato → premium, um degrau de cada vez; pode cobrar                                                                              |
| `auto/offline`      | Favorece a disponibilidade de quotas e a saúde do prestador (`offline-friendly` pack); os pedidos — de inferência não offline ainda vão para fornecedores remotos |
| `auto/smart`        | Pesos de qualidade em primeiro lugar com uma taxa de exploração de 10%                                                                                            |
| `auto/lkgp`         | LKGP explícito, com os mesmos pesos do `auto` padrão                                                                                                              |
| `auto/chaos`        | Painel paralelo com um modelo por fornecedor, até cinco por defeito, devolvendo uma resposta                                                                      |

As variantes de peso mantêm a aderência LKGP, pelo que `fast` e `cheap` expressam preferências em vez de garantir a menor latência ou preço em cada pedido. `auto/chaos` faz várias chamadas upstream. `auto/thrifty` pode utilizar capacidade paga; o regresso à quota do plano depende da elegibilidade renovada e do tempo de espera da ligação, e não apenas do tempo de reposição. Consulte [Encaminhamento que prioriza a subscrição](./SUBSCRIPTION_LADDER.md).

### Categoria × Composição da camada (`auto/<category>:<tier>`)

Sufixos estilo OpenRouter separados** que tipo de percurso** (categoria) de** como otimizá-lo** (camada), para que os possa compor livremente (#4235 Fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorias** : `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` mantêm modelos com capacidade de visão; `reasoning` mantém os modelos reasoning/thinking. `coding` e `chat` não adicionam um filtro de capacidade. As categorias que não são de chat selecionam os pesos de qualidade antes de qualquer substituição de nível.
- **Níveis** (escolha os pesos de pontuação/filtro de pool): `fast` (envio rápido) · `cheap` (alias `floor`, poupança de custos) · `reliable` (integridade do disjuntor + estabilidade de latência) · `free` / `pro` (filtre o pool por nível de modelo através do `classifyTier` — nível gratuito vs. premium). `subscription` e `thrifty` aplicam a [escada de assinatura](./SUBSCRIPTION_LADDER.md) baseada na ligação.

| Exemplo                | Resolve                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------- |
| `auto/coding:fast`     | pool qualificado, pesos de baixa latência                                             |
| `auto/coding:cheap`    | pool elegível, pesos de poupança de custos (também conhecido por `auto/coding:floor`) |
| `auto/reasoning:pro`   | Apenas modelos reasoning/thinking, nível premium                                      |
| `auto/vision`          | modelos com capacidade de visão com pesos de qualidade em primeiro lugar              |
| `auto/multimodal:free` | modelos com capacidade multimodal, apenas nível gratuito                              |

Qualquer `auto/<category>[:<tier>]` válido é resolvido a pedido; um subconjunto seleccionado é anunciado em `/v1/models` e no painel (`AUTO_SUFFIX_VARIANTS` em `open-sse/services/autoCombo/builtinCatalog.ts`). A filtragem Category/tier é** fechado com falha por defeito** : se nenhum modelo elegível corresponder, o combo virtual terá um pool vazio e o resolvedor de chat devolverá HTTP 503 (`src/sse/handlers/chatHelpers.ts`). O filtro é `narrowPoolByCategoryTier` em `open-sse/services/autoCombo/virtualFactory.ts`.

`OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL=true` restaura o substituto herdado category/tier para o pool completo quando o filtro não corresponde a nada; isto pode descartar o nível solicitado ou a restrição de capacidade. Os filtros da família de modelos nunca utilizam este substituto, e o encaminhamento apenas por subscrição ainda requer capacidade verificada incluída no plano.

> **Inteligência do modelo ao vivo:** a aptidão do encaminhamento automático é informada ao vivo** Arena ELO** classificações +** modelos.dev** dados da camada quando o sinalizador `ARENA_ELO_SYNC_ENABLED` está ativado (caso contrário, volta ao mapa de aptidão estático).

**Como usar:**

```bash
# Any IDE or CLI tool that supports OpenAI format
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# In your code/config, set model to:
model: "auto"                 # balanced default
model: "auto/coding"          # favor coding task fit
model: "auto/fast"            # favor lower latency
model: "auto/cheap"           # favor lower catalog cost
```

**O que acontece:**

1. OmniRoute detecta prefixo `auto/` em `src/sse/handlers/chat.ts`
2. Consulta tudo** ligações de provedor ativas** do banco de dados
3. Aplica filtros de credenciais, visibilidade do modelo e elegibilidade
4. Cria candidatos lógicos provider/model a partir de modelos disponíveis, mantendo listas de permissões de contas qualificadas para envio
5. Constrói um** combinação virtual** na memória (não armazenado em DB)
6. Percursos utilizando a estratégia + LKGP do perfil de peso da variante selecionada

**Propriedades principais:**

- ✅** Sempre ativo:** Sem alternância, sem criação de combo, sem necessidade de configuração
- ✅** Dinâmico:** Reflete automaticamente os fornecedores conectados atuais
- ✅** Aderência da sessão:** LKGP garante que o último fornecedor bem-sucedido é priorizado
- ✅** Consciente de múltiplas contas:** Os candidatos lógicos provider/model mantêm listas de permissões de contas qualificadas
- ✅** Não é necessário nenhum combo guardado:** A configuração virtual permanece na memória; métricas de encaminhamento normais e o estado de tempo de execução ainda podem persistir

### Controlo do candidato por chave (#7819, Nível 1 + 2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = o sufixo depois de `auto/`, ou a literal `auto` para o canal base) é um** somente leitura** endpoint que lista o pool de candidatos atual de um canal `auto/*` decorado com acessibilidade ao vivo, reutilizando as leituras de resiliência existentes (nunca o disjuntor bruto `state`):

- disjuntor do fornecedor — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- arrefecimento da ligação — `rateLimitedUntil` / `testStatus` na linha `provider_connections` resolvida
- bloqueio de modelo — `isModelLocked(provider, connectionId, model)`

Cada candidato também transporta o sinalizador `excluded` desta chave API. As exclusões são armazenadas por chave API ( tabela `auto_candidate_overrides`, migração `128`) — OmniRoute é de locatário único sem tabela `users`, então `apiKeyId` é a identidade real por chamador mais próxima — e aplicada no ponto de estrangulamento do pool de candidatos em `open-sse/services/autoCombo/virtualFactory.ts` através do `filterExcludedCandidates()` puro e testado em unidade (`open-sse/services/autoCombo/candidateOverrides.ts`). O filtro é** falha aberta** : um apiKeyId/channel não definido ou uma falha de pesquisa DB deixam o pool sem filtro, pelo que um operador sem substituições configuradas vê o encaminhamento idêntico ao byte antes deste recurso.

**Adiado para um problema de seguimento:** por candidato pondera a ordenação explícita + (o nível 3 — alimenta os caminhos de estratégia weighted/priority existentes) e fixa uma estratégia `combo.ts` específica por canal `auto/*` (nível 4). Consulte o plano #7819 para a questão em aberto sobre se as substituições devem permanecer por chave API ou tornar-se globais, dado o modelo de locatário único.

**Nos bastidores:**

```txt
Request: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detects prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool from active connections
   ↓
handleComboChat (same engine as persisted combos)
   ↓
Auto-scoring selects best provider/model per request
```

**Ficheiros de implementação:**

| Ficheiro                                                  | Finalidade                                           |
| --------------------------------------------------------- | ---------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analisador de prefixos (`parseAutoPrefix`)           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Cria objetos `AutoComboConfig` virtuais              |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Gancho de teste para zombar do registo do fornecedor |
| `src/sse/handlers/chat.ts`                                | Integração: curto-circuito de prefixo automático     |
| `src/shared/constants/providers.ts`                       | entrada do sistema `SYSTEM_PROVIDERS.auto`           |

## Preferências de conta para combos automáticos guardados

O editor Intelligent Auto oferece um opcional** Preferências da conta** secção. Cada ligação pode ser Preferencial, Normal (o predefinido), Reserva ou Eliminada. Várias ligações podem partilhar uma camada. A seleção automática ocorre no primeiro nível elegível, mantendo o seu comportamento scoring/router nesse local; as tentativas falhadas recaem nas restantes contas concretas, preferidas antes do normal antes da reserva. As ligações excluídas nunca são utilizadas por este combo.

A configuração é guardada como `config.accountPreferences`, codificada pela ligação ID:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

Um mapa omitido ou vazio mantém a rota existente. As preferências não permitem ligações desativadas, concedem acesso à chave API, restauram candidatos bloqueados por quotas ou ignoram verificações de orçamento. Cada tentativa é restrita à sua ligação concreta, pelo que o substituto da conta não pode saltar níveis atrás do router combinado. A afinidade de sessão existente pode manter uma conta elegível; eliminar a conta ligada a um turno nativo interrompe esse turno em vez de alterar as contas silenciosamente.

As preferências configuradas utilizam o caminho automático com reconhecimento de conta: cache de contexto não ligado, pipeline inteligente, caos e atalhos de sombra não são despachados. A cobertura especulativa está desativada para estes pedidos, pelo que as contas de reserva não podem concorrer com as preferenciais. Outras estratégias de combinação não interpretam esta configuração. Alterar um combo para longe de Automático mantém as preferências guardadas para uma troca posterior.

## Nomes combinados que correspondem a um ID de modelo real

Um combo cujo `name` é idêntico a um ID de modelo simples (por exemplo, um combo chamado `gpt-5.5`) é um** padrão intencional e suportado** , não é um bug: é o mecanismo para o fallback do fornecedor de ID de modelo documentado em [#6940](https://github.com/cheaper-inference/OmniRoute/issues/6940). Como a resolução do combo é verificada antes da resolução do ID do modelo simples (`getComboForModel()` in `src/sse/services/model.ts`), um pedido para o id simples `gpt-5.5` é encaminhado através dos alvos do combo (por exemplo, `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) em vez de diretamente para um único fornecedor — que reutiliza a precedência combo-before-rewrite construída para [#3227/#3233](https://github.com/cheaper-inference/OmniRoute/issues/3227) e é testada por regressão por `tests/unit/responses-combo-resolution-3227.test.ts` e `tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Criar ou renomear um combo para um nome que oculte um ID de modelo real é** nunca rejeitado** — fazer isso quebraria esse fluxo de trabalho documentado. Em vez disso (#8530), `POST /api/combos` e `PUT /api/combos/[id]` anexam um campo `warning` sem bloqueio à resposta quando o (novo) nome colide com um ID de modelo real:

```json
{ "warning": { "code": "COMBO_NAME_SHADOWS_MODEL", "modelId": "gpt-5.5", "providerId": "openai" } }
```

No arranque, `scanComboModelNameCollisionsAtBoot()` (`src/instrumentation-node.ts`) também regista um aviso `[STARTUP]` de uma linha enumerando cada combo existente que oculta um ID de modelo, para que os operadores que acertarem isto por acidente (em vez de intencionalmente, por #6940) tenham um sinal. O auxiliar de deteção reside em `src/lib/combos/modelNameCollision.ts`.

## Chamar um combo personalizado de um cliente

Os combos persistentes ( → Combos Settings) só são utilizados quando o cliente envia os combos** nome exato** no campo `model` — não há correspondência parcial ou difusa do nome do combo e não há prefixo `auto/` envolvido. Ordem de resolução (`getComboForModel()` em `src/sse/services/model.ts`):

1. correspondência exata do nome da combinação (`model: "my-combo"`),
2. prefixo `combo/<name>` (`model: "combo/my-combo"`),
3. mapeamentos combinados de glob do modelo →(`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Duas armadilhas comuns:

- **`auto` não usa os seus combos.** `auto`/`auto/*` constrói o seu próprio pool de candidatos com configuração zero e apenas consulta combos persistentes se um combo for literalmente denominado `auto` (não recomendado). Para encaminhar um combo, envie o seu nome exato — não `auto`.
- **`openrouter/auto` é um produto OpenRouter realmente pago** ("Auto Best Available"), e não um alias OmniRoute. É a única entrada do modelo estático do registo OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) e é cobrada separadamente. Utilize as Definições → Routing → Ocultar modelos pagos para os eliminar dos pools `auto`.

Veja [#7992](https://github.com/cheaper-inference/OmniRoute/issues/7992) e [#7111](https://github.com/cheaper-inference/OmniRoute/issues/7111) para a confusão original que estes documentos.

## Como funciona (combos automáticos persistentes)

O Auto-Combo Engine pontua dinamicamente os candidatos provider/model utilizando** 16 fatores declarados** (definido em `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Os pesos padrão somam `1.0`; os pesos personalizados são renormalizados por `normalizeScoringWeights()`. Três fatores têm peso zero por defeito: `cacheAffinity`, `resetWindowAffinity` e `reliability`. Os pacotes de modo dão `reliability` um peso de `0.03` ou `0.04` em `reliability-first`; `quality` carrega `0.03` por defeito e em `quality-first` e `0.02` nos outros pacotes. `cacheAffinity` também bloqueia a desduplicação do prompt-cache fora da pontuação ponderada.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Fonte: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenerar via `npm run docs:render-diagrams`). O nome do ficheiro é histórico; a fonte e o diagrama renderizado mostram todos os 16 fatores declarados em `DEFAULT_WEIGHTS`.

| Fator                 | Peso padrão | Descrição                                                                                                                                                                                                                                |
| :-------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429      | Cota restante/espaço limite de taxa [0..1]                                                                                                                                                                                               |
| `health`              | 0.1605      | Pontuação de integridade do disjuntor (CLOSED= 1,0, HALF_OPEN= 0,5, OPEN= 0,0)                                                                                                                                                           |
| `costInv`             | 0.1429      | Inverso** misturado** custo (60% de entrada + 40% de preço do token de saída, normalizado) — mais barato = pontuação mais alta                                                                                                           |
| `latencyInv`          | 0.1143      | Latência inversa p95 normalizada para agrupar — mais rápido = pontuação mais alta                                                                                                                                                        |
| `taskFit`             | 0.0762      | Aptidão do tipo de tarefa (codificação, revisão, planeamento, análise, depuração, documentação)                                                                                                                                          |
| `stability`           | 0.0476      | Estabilidade baseada na variância do desvio padrão da latência — um candidato cujo tempo de resposta oscila com uma pontuação mais baixa                                                                                                 |
| `tierPriority`        | 0.0476      | Prioridade ao nível da conta — Ultra = 1.0, Pro = 0.67, Standard = 0.33, Free = 0.0                                                                                                                                                      |
| `tierAffinity`        | 0.0476      | Afinidade entre o nível do candidato e o nível recomendado pelo manifesto                                                                                                                                                                |
| `specificityMatch`    | 0.0476      | Correspondência entre a especificidade do pedido (dica manifestada) e a camada do modelo                                                                                                                                                 |
| `contextAffinity`     | 0.0476      | Afinidade entre a necessidade da janela de contexto do pedido e a janela de contexto do modelo                                                                                                                                           |
| `sessionAvailability` | 0.0476      | Disponibilidade da sessão OAuth da ligação candidata para esta sessão (`getOAuthSessionAvailability()`; pontuação das ligações não OAuth 1,0)                                                                                            |
| `connectionDensity`   | 0.0476      | Distribui a carga entre ligações do mesmo fornecedor (anticoncentração)                                                                                                                                                                  |
| `cacheAffinity`       | 0.00        | Afinidade de hash de encontro com a ligação com maior probabilidade de já conter o prefixo de cache de prompt deste pedido (`open-sse/services/combo/promptCacheAffinity.ts`); desativado por defeito (#8008)                            |
| `resetWindowAffinity` | 0.00        | Tendência para ligações cuja janela de reposição de cota é favorável (desativada por defeito)                                                                                                                                            |
| `quality`             | 0.03        | Sinal de qualidade de saída orientado por feedback do rastreador de qualidade de eventos de encaminhamento; os candidatos sem observações recebem um neutro 0,5                                                                          |
| `reliability`         | 0.00        | Parcela de sucesso observada, `1 - failureRate`, de 24 horas de histórico de utilização atrás de um piso de dez amostras (caso contrário, métricas em tempo real); candidatos sem observações são lidos como 1,0. Desativado por defeito |

O rastreador `quality` na memória (`open-sse/services/routing/quality.ts`) fica vazio após um reset a frio, pelo que cada candidato pontua um `0.5` neutro até que as primeiras observações cheguem.

> **Cota ilegível (#15347).** Quando um fornecedor tem um coletor de quotas, mas não devolve nada legível (falha na pesquisa, credenciais em falta, utilização apenas de mensagens ou um instantâneo malformado sem `windows` analisável e sem `percentUsed` finito, incluindo `percentUsed: null`), o candidato pontua `0` no eixo `quota` e a sua pontuação final é multiplicada por `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` (0,5, `autoStrategy.ts`), o mesmo padrão de penalização suave que a penalização do estado da ligação. Uma leitura de utilização com falha é uma evidência sobre a telemetria, não sobre o fornecedor, pelo que é classificada estritamente abaixo de qualquer leitura real, incluindo uma leitura 100%-used confirmada, mas nunca é bloqueada ou despejada. Um fornecedor sem limite reporta `unlimited: true` e pontua como quota total; um fornecedor sem coletor de quotas registado não possui qualquer fonte de telemetria e mantém o padrão `100`.

**Sombra:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` conforme indicado em `DEFAULT_WEIGHTS`; os pesos configurados pelo utilizador são renormalizados numa distribuição por `normalizeScoringWeights()` antes da pontuação.

## Pacotes de modos

6 perfis de pesos predefinidos em `open-sse/services/autoCombo/modePacks.ts`. Cada pacote substitui totalmente os pesos predefinidos para orientar a seleção para um objetivo. Cada pacote já totaliza `1.0` (`0.9999` quando apresentado com quatro casas decimais), pelo que `normalizeScoringWeights()` não tem nada de significativo a corrigir quando um pacote está ativo — os valores abaixo são, tendo em conta o arredondamento, os que o avaliador aplica.

| Fator                 | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Notas:

- **Os pacotes incluem `quality` e `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) e substituem por completo o mapa de pesos (`weights = pack`, não é uma intercalação). `DEFAULT_WEIGHTS` inclui `quality 0.03 / reliability 0`; selecionar `balanced`/`default` mantém esses valores predefinidos, enquanto selecionar um pacote utiliza os respetivos valores acima. Num conjunto ainda sem dados (sem observações, pelo que `quality 0.5` e `reliability 1`), estes dois fatores adicionam `+0.04` com um pacote genérico (`0.03 + 0.01`), `+0.045` com `quality-first` e `+0.05` com `reliability-first`.
- `tierAffinity`, `specificityMatch` e `resetWindowAffinity` são explicitamente definidos como `0` em todos os pacotes.
- Resumo da ênfase de cada pacote:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (ligações saudáveis e de baixa latência)
  - **cost-saver** → costInv 0.3324 (ganham os tokens mais baratos)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, o valor mais elevado de qualquer pacote (o melhor modelo para a tarefa, com consistência)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (margem máxima, independentemente da velocidade/do custo)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, o valor mais elevado de qualquer pacote (menos surpresas)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (o pacote de pesos que `auto/chaos` atribui aos membros do respetivo painel; a distribuição paralela não lê estes pesos e este não é um perfil de injeção de falhas; consulte [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Controlos por pedido (cabeçalhos) — #6023 / #6024 / #6025 / #3470

Uma combinação `auto` pode ser orientada **por pedido** através de três cabeçalhos, sem alterar a configuração armazenada da
combinação. Estes aplicam-se apenas à estratégia `auto` e apenas ao pedido que
os inclui; os valores `modePack`/`budgetCap`/`budgetFallback` guardados da combinação são utilizados
quando o cabeçalho está ausente.

| Cabeçalho                     | Aceita                                                                                                                                                                                                             | Efeito                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | um alias de predefinição (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ou um nome de pacote sem tratamento (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Substitui as ponderações de pontuação para este pedido. `balanced`/`default` aplicam obrigatoriamente as ponderações predefinidas (sem pacote). Os valores desconhecidos são ignorados (a configuração é preservada).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Budget`          | um número positivo (máximo de USD por pedido)                                                                                                                                                                      | Limite máximo rígido de custos: os candidatos cujo custo estimado o exceda são filtrados antes da seleção. O que acontece quando **todos** os candidatos o excedem é controlado pelo cabeçalho `X-OmniRoute-Budget-Fallback` abaixo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (predefinição, aliases: `cheapest-viable`, `soft`) ou `strict` (aliases: `block`, `hard`)                                                                                                               | `cheapest`: recorre ao candidato globalmente mais barato, apesar de este continuar a exceder o limite (comportamento legado). `strict`: recusa efetuar uma seleção — o pedido falha imediatamente com `HTTP 402`, em vez de exceder silenciosamente o orçamento. Os valores desconhecidos são ignorados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `X-OmniRoute-Effort`          | `auto` (outros valores reservados)                                                                                                                                                                                 | Orçamento de raciocínio adaptativo: quando o pedido **não** inclui qualquer campo de raciocínio (`reasoning_effort`, `reasoning`, `thinking`), o gateway resolve `auto` como `low`/`medium`/`high` a partir de sinais determinísticos da estrutura do pedido (comprimento da última mensagem do utilizador, tamanho do contexto até à última mensagem do utilizador, resultados anteriores de ferramentas, profundidade do ciclo de ferramentas). Os sinais estão limitados ao turno atual — tudo o que se encontra após a última mensagem do utilizador é ignorado — pelo que todos os pedidos num ciclo de ferramentas são resolvidos para o mesmo nível (fixação por turno sem estado, sem estado de sessão e sem escalamento a meio do ciclo que quebraria os prefixos da cache de pedidos do serviço a montante). Um campo de raciocínio explícito do cliente tem sempre precedência. Limitado a pedidos cujo encaminhamento para o serviço a montante seja resolvido para o formato OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` é um campo no formato da OpenAI, pelo que o cabeçalho não produz qualquer efeito num pedido destinado ao Claude ou ao Gemini (consulte `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forçar o perfil mais rápido, limitar este pedido a $0.05 e bloquear estritamente em vez de exceder o orçamento
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

A resolução é uma função pura (`open-sse/services/autoCombo/requestControls.ts`); os
valores resolvidos alimentam as entradas `config.modePack` / `config.budgetCap` /
`config.budgetFallback` existentes no motor. O `config.budgetFallback` armazenado de uma combinação ("strict" |
"cheapest") define a política persistente; o cabeçalho substitui-a para um único pedido.

## Todas as estratégias de encaminhamento

O mecanismo de combinação do OmniRoute suporta** 22 estratégias de encaminhamento** (declarado em `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). O próprio mecanismo Auto Combo está exposto na estratégia `auto` ; os restantes estão disponíveis para combos persistentes.

| Estratégia          | Descrição                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Lista ordenada do primeiro alvo com prioridade explícita                                                                                                                                                                                                                                                                                                                                                          |
| `weighted`          | Sorteio aleatório proporcional por pedido por peso alvo; os outros alvos tornam-se substitutos (ver abaixo)                                                                                                                                                                                                                                                                                                       |
| `round-robin`       | Percorrer os alvos por ordem, em lotes fixos (3 sucessos por alvo por defeito; ver abaixo)                                                                                                                                                                                                                                                                                                                        |
| `context-relay`     | Ordem de prioridade mais um resumo da transferência quando a conversa passa para outra conta                                                                                                                                                                                                                                                                                                                      |
| `fill-first`        | Preencha a quota de cada destino antes de passar para o próximo                                                                                                                                                                                                                                                                                                                                                   |
| `p2c`               | Experimente dois alvos e prefira o mais saudável e mais rápido                                                                                                                                                                                                                                                                                                                                                    |
| `random`            | Embaralhamento fresco de Fisher-Yates por solicitação; pedidos consecutivos podem começar no mesmo destino                                                                                                                                                                                                                                                                                                        |
| `least-used`        | Escolha o destino com o menor número de pedidos registados neste combo (por modelo de conta + )                                                                                                                                                                                                                                                                                                                   |
| `cost-optimized`    | Experimente primeiro o preço mais baixo do token de entrada do catálogo; os preços desconhecidos vão por último (não o custo final do pedido)                                                                                                                                                                                                                                                                     |
| `reset-aware` ⭐    | Pontuação de sobras de sessão e quota semanal, bem como urgência de redefinição; quase-laços giram                                                                                                                                                                                                                                                                                                                |
| `reset-window`      | Prefira destinos cuja janela de quotas seja reposta mais cedo                                                                                                                                                                                                                                                                                                                                                     |
| `expiry-first`      | Gastar a conta cuja quota expiraria primeiro sem ser utilizada — o maior valor restante com o prazo de reposição mais próximo vai primeiro                                                                                                                                                                                                                                                                        |
| `headroom`          | Escolha o alvo com o maior espaço de cota restante                                                                                                                                                                                                                                                                                                                                                                |
| `quota-weighted`    | Distribuir os pedidos por disponibilidade de quota e carga em voo; preservar a afinidade da sessão                                                                                                                                                                                                                                                                                                                |
| `strict-random`     | Baralho embaralhado por combo: cada alvo é utilizado uma vez antes de voltar a baralhar; o último de um ciclo nunca inicia o seguinte                                                                                                                                                                                                                                                                             |
| `auto`              | Utilizar pontuação de combinação automática (16 fatores) —** recomendado**                                                                                                                                                                                                                                                                                                                                        |
| `lkgp`              | Último caminho válido (fixa o último fornecedor bem-sucedido e depois volta às regras)                                                                                                                                                                                                                                                                                                                            |
| `context-optimized` | Experimente primeiro a maior janela de contexto conhecida (limites de capacidade do modelo resolvidos)                                                                                                                                                                                                                                                                                                            |
| `cache-optimized`   | Prefira a ligação elegível que provavelmente conterá o prefixo do prompt na cache (`open-sse/services/combo/promptCacheAffinity.ts`, #8008)                                                                                                                                                                                                                                                                       |
| `fusion` 🧬         | Distribua-se por um painel de modelos em paralelo e, em seguida, sintetize uma resposta através de um juiz (ver abaixo)                                                                                                                                                                                                                                                                                           |
| `pipeline`          | Execute os destinos sequencialmente, encadeando a saída de cada passo na entrada do passo seguinte; apenas a resposta final é devolvida (#6396)                                                                                                                                                                                                                                                                   |
| `jev`               | Lista de preferências ordenadas pelo utilizador; TypeSafe Jev admite quais as entradas que são executadas para este pedido. Vencedor primeiro, outros alvos admitidos mantêm o seu pedido. Ativado e pago: chamado apenas quando `COMBO_JEV_STRATEGY_ENABLED` está ativado (desativado por defeito); cada chamada envia um trecho limitado para api.typesafe.ai. Volta ao seu pedido quando indisponível (#15276) |

⭐ = Novo na v3.8.0 · 🧬 = Novo na v3.8.36

A estratégia `jev` faz chamadas TypeSafe pagas apenas quando `COMBO_JEV_STRATEGY_ENABLED` está activado. Uma chave TypeSafe armazenada por si só não o habilita. Com a flag desactivada, o combo mantém a ordem da operadora sem efectuar essa chamada (`open-sse/services/combo/jevAsk.ts`).

### semântica `weighted`

`weighted` é um** sorteio aleatório proporcional por pedido** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), e não um equalizador:

- Cada solicitação atrai** um** passo com probabilidade `weight / totalWeight`; os restantes passos são ordenados por peso decrescente como a cadeia de fallback para esse pedido.
- Um passo cujo peso é `0` (ou em falta) é** nunca desenhado** embora qualquer outra etapa tenha um peso > 0 — só pode servir de substituto após a falha da etapa desenhada. Somente quando** tudo** os pesos são 0, a seleção torna-se uniforme.
- Etapas cujos alvos são indisponíveis — Provider Circuit breaker `OPEN`, connection cooldown, model lockout — são removidas do sorteio antes que aconteça (`open-sse/services/combo/targetResolution.ts`), portanto, uma única etapa íntegra pode vencer temporariamente todas as solicitações.
- `stickyWeightedLimit` (configuração de combinação, padrão `1` = desativado) fixa o passo desenhado para tantos sucessos consecutivos antes de redesenhar.

Para rotação estrita utilize `round-robin`; pesos iguais em `weighted` fornecem — estatístico e não equilíbrio estrito —.

### Modo de pipeline agente

Um combo `pipeline` com pelo menos dois modelos pode optar pelo encaminhamento planner/executor com `config.agenticOrchestration.enabled`. O primeiro alvo possui planeamento e respostas finais; o segundo alvo emite chamadas de ferramentas nativas do cliente. OmniRoute deteta continuações de resultados de ferramentas do protocolo de pedido, pergunta ao planeador se é necessária outra ronda de ferramentas e torna dinamicamente o executor ou o planeador a etapa final orientada para o cliente.

`config.agenticOrchestration.contextCompaction` opcional aplica um orçamento de carga útil separado antes de cada planeador ou envio de executor. Active-o explicitamente:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Estes são orçamentos de caracteres JSON serializados selecionados pelo operador, e não janelas de contexto de token ou limites de upstream garantidos. O modelo exato IDs substitui o padrão. Acima do limiar, a compressão remove definições de ferramentas idênticas, corta as provas de ferramentas sobredimensionadas com um resumo e remove grupos históricos completos antigos em direção à proporção desejada. Retém as instruções system/developer, o pedido mais recente do utilizador, a última ronda de ferramentas, incluindo calls/results paralelo e as principais instruções de encaminhamento do Gemini. As instruções de nível superior e as definições das ferramentas são preservadas. Um marcador de omissão regista o histórico removido; trata-se de um recorte determinístico, não de um resumo semântico. Se o contexto fixado ainda exceder o orçamento, o pedido retornará 413 antes de contactar o modelo. Com a compressão desativada ou abaixo do limite, o pedido passa inalterado.

Nas continuações dos resultados da ferramenta, OmniRoute também interrompe a execução quando duas rondas consecutivas concluídas repetem as mesmas chamadas de ferramenta com resultados inalterados, ou quando todos os resultados marcados explicitamente em duas rondas consecutivas falham. Os resultados alterados permitem chamadas repetidas (por exemplo, sondagens). O guarda é reposto num novo pedido do utilizador, agrupa as chamadas paralelas numa ronda e suporta Anthropic, conclusões de chat, respostas e históricos Gemini. O planeador recebe o motivo e possui a resposta final, mesmo que solicite outra ronda de ferramentas.

Os modelos adicionais após o segundo destino são backups de executores ordenados. Uma resposta HTTP ou exceção de transporte com falha avança para o próximo executor, transportando a mesma decisão do planeador e ferramentas nativas, mas o prompt de passo do próprio executor e a ligação resolvida. A primeira resposta bem-sucedida é devolvida inalterada, incluindo o streaming SSE ; falhas após o início de um fluxo bem-sucedido não podem ser aqui repetidas. Se todos os executores falharem, será devolvida a última falha. O cliente cancela o envio interrompido.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

O executor pode emitir múltiplas chamadas independentes numa resposta. As chamadas dependentes são tratadas em turnos posteriores de resultados da ferramenta do cliente, com o planeador a rever cada resultado. `maxToolRounds` é padronizado como `8` e aceita `1`–`32`; uma vez atingido, o planeador deve produzir a melhor resposta final disponível. As decisões internas do planeador são armazenadas em buffer, enquanto a resposta selecionada orientada para o cliente preserva a preferência de streaming original.

### `round-robin` sticky batch e expansão de conta

O round-robin é em lote, não é um pedido por etapa:

- `stickyRoundRobinLimit` (configuração combinada, depois `comboStickyRoundRobinLimit`, depois `settings.stickyRoundRobinLimit`, padrão** 3** ) mantém o mesmo alvo durante tantos sucessos consecutivos antes de rodar. Defina a substituição combinada como `1` para a rotação de um pedido. O editor combinado mostra o valor efetivo e de que camada veio.
- `connectionAwareExpansion` (configuração combinada, depois definições, predefinição** FALSO** ) expande cada etapa ao nível do fornecedor em metas por conta antes da rotação. As estratégias do Grupo B (prioritária, ponderada, round-robin, aleatória, p2c, menos utilizada, otimizada para custos, lkgp, preencher primeiro, aleatório estrito, otimizada para contexto, otimizada para cache, retransmissão de contexto, fusão, pipeline, jev) mantêm uma visão ao nível do fornecedor até que esta seja ativada. O editor combinado expõe herdar/ligar/desligar; herdar utiliza o padrão global (desligado).
- Encaminhamento de localidade de cache de prompt (`promptCacheAffinityEnabled`, padrão** VERDADE** ) reordena as ligações fixadas para que as chaves de cache correspondentes permaneçam numa conta. Tem precedência sobre o round-robin e a rotação ponderada nos degraus fixados por conta. Desative-o em Configurações padrão → Combo se precisar de rotação rigorosa. Não há substituição por combinado.

Para rotação de várias contas num modelo, prefira** uma etapa de conta dinâmica** ( `connectionId` vazio, pool inteiro) com limite fixo `1`, e não três `connectionId` s fixados. Os passos fixados e a afinidade são recolhidos na mesma conta, mesmo enquanto o contador RR avança.

## Estratégia Fusion

`fusion` é a única estratégia que **não** escolhe um único destino. Distribui o prompt
por **todos os modelos do painel em paralelo** e, em seguida, um **modelo avaliador** configurável sintetiza
uma única resposta final a partir de todas as respostas do painel. Adaptada do projeto original `decolua/9router`
(design Fusion da OpenRouter); implementação em `open-sse/services/fusion.ts`.

Como funciona:

0. **Desvio para pedidos com ferramentas** — um pedido que contenha um array `tools` não vazio e
   cujo `tool_choice` não esteja explicitamente definido como `"none"` ignora totalmente o painel: é encaminhado diretamente para
   um único modelo (o avaliador configurado ou `panel[0]`), com `tools`/`tool_choice`
   transmitidos sem alterações. Os membros do painel não têm acesso a ferramentas e a
   diretiva de síntese do avaliador desencoraja a emissão de chamadas de ferramentas, pelo que os clientes
   agênticos/com suporte para chamadas de ferramentas obtêm uma decisão real de chamada de ferramenta em vez de prosa sintetizada (#6771).
1. **Distribuição em leque** (apenas pedidos sem ferramentas) — o prompt é enviado simultaneamente para todos os modelos
   do painel, forçando o modo sem streaming e removendo as ferramentas (o avaliador necessita de
   prosa completa para efetuar a síntese).
2. **Recolha com quórum e período de tolerância** — assim que chegam `minPanel` respostas, é iniciado um curto temporizador
   de tolerância para os modelos atrasados; em seguida, a fusão prossegue com tudo o que tiver sido recolhido.
   Isto limita a penalização do modelo mais lento no tempo total, dentro dos limites de um tempo limite rígido.
3. **Síntese pelo avaliador** — as respostas do painel são anonimizadas (`Source 1`, `Source 2`, … — para que
   o avaliador pondere o conteúdo, e não a marca do modelo) e entregues ao avaliador, que analisa
   consensos / contradições / cobertura parcial / perspetivas únicas / pontos cegos e, em seguida,
   redige **uma** resposta definitiva. A chamada ao avaliador mantém o sinalizador `stream` original
   do cliente + as ferramentas, pelo que o streaming e a utilização subsequente de ferramentas continuam a funcionar.
4. **Degradação controlada** — 0 respostas do painel → `503`; exatamente 1 resposta sobrevivente → essa resposta
   é devolvida diretamente (não há nada para fundir); um painel com um único modelo responde diretamente.

Um membro do painel também pode ser um passo `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) que referencia
outro combo — é resolvido como **uma única voz opaca do painel** (um despacho recursivo completo para o
combo referenciado, e não uma distribuição em leque pelos destinos desse combo), com a mesma proteção
contra profundidade/ciclos que todas as outras estratégias que utilizam combo-ref já usam (#6764).

### Configuração

Configurada no objeto `config` do combo (sem migração de esquema — reutiliza a tabela
`combos` existente):

| Campo                                    | Tipo     | Predefinição              | Finalidade                                                                                                      |
| :--------------------------------------- | :------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | primeiro modelo do painel | Modelo que sintetiza a resposta final                                                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`                       | Respostas bem-sucedidas necessárias antes de o temporizador de tolerância iniciar (limitado a `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                    | Tempo de espera pelos modelos atrasados após o quórum ser atingido                                              |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                   | Limite absoluto para impedir que um modelo bloqueado atrase o pedido                                            |

Os valores predefinidos encontram-se em `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Exemplo

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Depois, invoque-o como qualquer outro combo: `{"model":"fusion-panel","messages":[...]}`.

## Fábrica Virtual de Auto-Combo

O motor Auto Combo não requer combos predefinidos. Em vez disso, `open-sse/services/autoCombo/virtualFactory.ts` cria candidatos dinamicamente:

1. Obtém `getProviderConnections({ isActive: true })` (todas as ligações ativadas)
2. Filtra as que têm credenciais válidas (chave de API ou token OAuth não expirado através de `hasUsableOAuthToken()`)
3. Cruza os dados com `getProviderRegistry()` para determinar a disponibilidade dos modelos e os preços
4. Para cada tuplo `(provider, model, connection)`, cria um `VirtualAutoComboCandidate`
5. Escolhe `connection.defaultModel` (ou o primeiro modelo do registo) como destino de encaminhamento
6. Pontua cada candidato utilizando o `scorePool()` de 16 fatores e o conjunto de pesos da variante
7. Devolve o `AutoComboConfig` resultante em memória para `handleComboChat()` — nunca é guardado na BD

Isto significa que **adicionar um novo fornecedor com `auto/*` ativado expande automaticamente o conjunto de candidatos** — não é necessária qualquer edição manual do combo. O combo virtual é recriado em cada pedido, pelo que as ligações recentemente adicionadas ou que tenham recuperado são utilizadas imediatamente.

## Autorrecuperação

- **Exclusão temporária**: Pontuação < 0,2 → excluído durante 5 min (recuo progressivo, máximo de 30 min)
- **Deteção do disjuntor**: OPEN → excluído automaticamente; HALF_OPEN → pedidos de sondagem
- **Modo de incidente**: >50% OPEN → desativar a exploração, maximizar a estabilidade
- **Recuperação após o período de espera**: Após a exclusão, o primeiro pedido é uma "sondagem" com um tempo limite reduzido

## Exploração Bandit

5% dos pedidos (configurável) são encaminhados para fornecedores aleatórios para exploração. Desativada no modo de incidente.

## API

Existe** nenhum endpoint `POST /api/combos/auto` dedicado** — Auto-Combo é consumido de duas formas:

1. **Configuração zero (recomendado):** Envie qualquer pedido de conclusão de chat com `model: "auto"` ou `model: "auto/<variant>"`. A fábrica virtual constrói o combo por pedido — sem persistência, sem necessidade de chamadas API.

2. **Combo persistente com `strategy: "auto"`:** Crie um combo regular através de `POST /api/combos` e defina `strategy: "auto"` mais `config.auto.weights` / `config.auto.candidatePool`. É utilizado o mesmo mecanismo de pontuação; o combo é armazenado em `combos` e reutilizável por ID.

Para descoberta, `GET /api/combos/auto` lista cada variante com o seu pool de candidatos resolvido mais `context_length` / `max_output_tokens` — o MAX nas janelas do pool de candidatos. Os clientes (por exemplo, o plugin opencode) devem anunciar estes valores em vez de `0`: um contexto zero desativa totalmente a compressão automática do opencode, permitindo que as sessões cresçam até que a limpeza do histórico da gateway destrua o contexto. MAX é seguro para anunciar porque o pré-filtro de contexto de combinação automática encaminha pedidos sobredimensionados para candidatos de janelas grandes.

```bash
# Zero-config usage (no combo creation)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Persisted auto combo via the regular combos endpoint
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Estratégias de router automático

Os combos `strategy: "auto"` persistentes podem definir `config.routerStrategy` (ou `config.auto.routerStrategy` legacy ) como um dos seguintes:

- pontuação ponderada padrão `rules` —
- `score` — seleciona a pontuação ponderada configurada mais elevada. Os empates exatos preservam a ordem dos candidatos configurada; as amostras `explorationRate` existentes do conjunto classificado completo.
- `cost` / `eco` — fornecedor saudável mais barato
- `latency` / `fast` — menor latência p95 com penalização de fiabilidade
- `sla-aware` / `sla` — preferem candidatos que satisfaçam latência p95, taxa de erro e custo opcional SLOs
- `lkgp` — último fornecedor bom conhecido primeiro
- `nadir` — pergunta à decisão de [Nadir](https://getnadir.com) API qual o modelo na pool que o prompt necessita; aceitar, abrir com falha para `rules`
- `decision` — pergunte a um decisor configurado (TypeSafe System One, a sua própria decisão URL ou um dos modelos próprios do combo) qual o modelo na pool que se ajusta ao pedido; atrás do sinalizador `COMBO_DECISION_ROUTER_ENABLED` desativado por defeito, falha na abertura para `rules`

### Estratégias de router em detalhes

O mecanismo de combinação automática expõe 7 plugáveis**RouterStrategy** implementações que pode trocar através do `config.routerStrategy` (ou do legado `config.auto.routerStrategy`). Cada estratégia escolhe um fornecedor do conjunto de candidatos, dado um `RoutingContext` (tipo de tarefa, dicas tool/vision, estimativa de token, política SLA opcional, último fornecedor válido opcional).

#### 1. `rules` (padrão) — pontuação ponderada de 16 fatores

Envolve o mecanismo de pontuação existente. Filtra os candidatos a disjuntores `OPEN` e, em seguida, executa `scorePool()` com o tipo de tarefa atual e `getTaskFitness()`, escolhendo o fornecedor com a pontuação mais elevada.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Quando usar** : Padrão. Utilize quando pretende uma compensação equilibrada entre todos os sinais.

**Alias** : `rules` (sem alias)

---

#### 2. `cost` / `eco` — fornecedor saudável mais barato

Classifica o conjunto de candidatos por `costPer1MTokens` (crescente) e escolhe o mais barato. Filtra primeiro os candidatos `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quando usar** : cargas de trabalho sensíveis ao custo, processamento em batch ou trabalhos em segundo plano.

**Aliases** : `cost`, `eco`

---

#### 3. `latency` / `fast` — menor latência p95 com penalização de fiabilidade

Classifica por `p95LatencyMs + (errorRate * 1000)`. A penalização pela taxa de erro garante que os fornecedores não fiáveis têm uma classificação inferior, mesmo que a sua latência nominal seja baixa.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quando usar** : cargas de trabalho sensíveis à latência, como chat em tempo real, preenchimento automático ou assistentes de codificação interativos.

**Aliases** : `latency`, `fast`

---

#### 4.º Conformidade `sla-aware` / `sla` — latency/error/cost SLO

Pontua cada candidato de acordo com a forma como satisfaz a política SLO configurada:

| Fator                     | Peso | Fórmula                                            |
| ------------------------- | ---- | -------------------------------------------------- |
| Pontuação de latência     | 35%  | `threshold / max(value, ε)`                        |
| Pontuação de erro         | 35%  | `threshold / max(value, ε)`                        |
| Pontuação de saúde        | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)  |
| Pontuação de custo        | 10%  | `threshold / max(value, ε)` ou inverso normalizado |
| Pontuação de estabilidade | 5%   | latência normalizada inversa stddev                |

Quando `hardConstraints: true`, os candidatos são classificados principalmente por** pontuação de violação** (até que ponto excedem qualquer SLO) e depois por pontuação composta. Caso contrário, é apenas a pontuação composta.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... scores each candidate against policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**campos SLA** (definido na configuração do combo):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Quando usar** : cargas de trabalho de produção com latência, taxa de erro ou orçamentos de custos rigorosos.

**Aliases** : `sla-aware`, `sla`

---

#### 5. `lkgp` — último bom fornecedor conhecido primeiro

Tenta o** último bom fornecedor conhecido** (se definido) primeiro, depois volta à estratégia `rules`. Útil para a permanência da sessão — o mesmo fornecedor trata dos pedidos de acompanhamento numa conversa.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Fallback to rules strategy
    return getStrategy("rules").select(pool, context);
  }
}
```

**Quando usar** : Conversas multivoltas em que pretende que o mesmo fornecedor lide com pedidos de acompanhamento (por exemplo, para armazenamento em cache, continuidade de contexto ou consistência de preços).

**Alias** : `lkgp` (sem alias)

---

#### 6. Escolha do modelo com reconhecimento de prompt `nadir` — via Nadir

Cada estratégia acima classifica os candidatos por telemetria própria; nenhum deles lê o pedido. `nadir` envia o último turno do utilizador mais os ids do modelo do pool para a decisão de [Nadir](https://getnadir.com) API (`POST /v1/bucket`) e encaminha para o modelo que Nadir selecciona nesse menu (`simple` → o modelo mais barato, `complex` → o de fronteira). A ligação que serve este modelo é ainda escolhida por `rules`, portanto, a quota, a integridade e o custo continuam a decidir qual a conta.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` e `OMNIROUTE_NADIR_BASE_URL` são substitutos de ambiente para as duas strings. `baseUrl` só é necessário para um Nadir auto-hospedado (um `/v1` final é tolerado). As chamadas sem chave chegam ao nível anónimo do Nadir, que tem uma taxa limitada por IP. Com uma chave ( [criar uma](https://app.getnadir.com/dashboard/api-keys) ), cada decisão é registada no painel do Nadir. Configuração completa e verificação: [getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

O que sai da caixa: o texto da última mensagem do utilizador (primeiros 16 mil caracteres), os ids do modelo candidato e uma tag do canal `source: "omniroute"`. Sem prompt do sistema, histórico, ferramentas ou cabeçalhos.

O comportamento de falha é fail-open: um tempo limite (2000 ms por defeito), um non-2xx, um host inacessível, uma resposta malformada ou uma seleção fora da pool resolve a decisão `rules` e o motivo é prefixado `NadirStrategy: fallback (…)`. Após uma falha na chamada, a estratégia ignora a rede durante 30 s, pelo que uma interrupção custa um tempo limite a cada 30 s, em vez de um por pedido. Os eventos de encaminhamento reportam `strategy: "nadir"` apenas quando Nadir fez realmente a escolha.

**Quando usar** : tráfego de dificuldade mista numa pool que abrange camadas de modelo (um modelo pequeno, médio e de fronteira), em que sempre-fronteira é o custo que se pretende cortar.

**Alias** : `nadir` (sem alias)

---

#### 7. O decisor plugável `decision` — escolhe o modelo

`decision` pergunta a um** decisor** qual o modelo no pool que se ajusta ao pedido e, em seguida, restringe o pool a esse modelo e permite que `rules` escolha a ligação (quota, integridade e custo ainda escolhem a conta). O decisor é definido no bloco de decisão do combo — `config.decision` quando os botões do router estão na parte superior de `config` (o que o painel escreve) ou `config.auto.decision` junto a `config.auto.routerStrategy`:

| `decider`     | Quem responde                                                                                                              | Precisa                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `systemone`   | TypeSafe System One (`POST https://api.typesafe.ai/v1/systemone`), modelo standard `jev-latest`                            | uma ligação `typesafe` ou a chave env          |
| `http`        | a sua própria decisão em `baseUrl`: `wire: "systemone"` (`{baseUrl}/v1/systemone`) ou `"openai-chat"` (conclusões de chat) | `baseUrl` + `model`; chave opcional            |
| `combo-model` | um dos seus modelos de provedor, denominado em processo como o juiz de fusão                                               | `model` como `provider/model` (sem combinação) |

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "decision",
    "decision": {
      "decider": "http",
      "baseUrl": "https://decider.example.com",
      "wire": "openai-chat",
      "model": "qwen-small",
      "connectionId": "<stored connection id>",
      "timeoutMs": 2000,
      "minConfidence": 0.6,
      "descriptions": { "gpt-4o-mini": "Quick drafts and short answers" }
    }
  }
}
```

Campos (validados por um esquema estrito ao guardar e novamente no momento do pedido):

- `decider` — `systemone`, `http` ou `combo-model`.
- modelo `model` — TypeSafe, o modelo de decisão no seu URL ou o `provider/model` de uma chamada de modelo combinado (até 200 caracteres).
- `baseUrl` — `http` only: um `http(s)` URL até 500 caracteres, sem credenciais, consulta ou fragmento. Um URL que aponta para este OmniRoute (loopback + `PORT`) é recusado.
- `wire` — apenas `http` : `systemone` (padrão) ou `openai-chat`.
- `connectionId` — a ligação armazenada cuja chave é utilizada (apenas dentro das ligações permitidas da chave API chamadora). Sem ele, `systemone` lê uma ligação `typesafe` e todo o decisor de rede volta para `OMNIROUTE_DECISION_API_KEY`. Não existe campo `apiKey` : uma chave nunca é guardada num combo.
- `timeoutMs` — inteiro, 100–5000, norma 2000.
- `minConfidence` — 0–1; uma resposta de menor confiança volta para `rules` (um decisor que não reporta qualquer confiança conta como 0).
- `descriptions` — até 50 entradas (chave até 300, texto até 1000 caracteres), introduzidas por ID de modelo ou `provider/model`; entradas não definidas obtêm uma descrição de classificação de custos gerada.

**Bandeira.** `COMBO_DECISION_ROUTER_ENABLED` ( `false` standard ) bloqueia todos os decisores. Enquanto estiver desativado, um combo `decision` não lê nenhuma credencial, não faz nenhuma chamada e encaminha com `rules`; o log diz `fallback (disabled)`. Uma chave armazenada sozinha nunca a ativa. Os combos sem bloco de decisão não são afetados.

**O que sai da caixa.** Apenas o texto da última mensagem do utilizador (até 8.000 caracteres; chat/Claude `messages` ou Respostas `input`) e o menu de ids dos modelos com as suas descrições. Nunca o prompt do sistema, Respostas `instructions`, ferramentas, histórico, cabeçalhos ou dados da conta. As chamadas de rede passam pela proteção de saída do fornecedor sem novas tentativas, sem redireccionamentos e com um limite de resposta de 64 KB. A chamada `combo-model` é sem streaming, sem ferramentas, `temperature: 0`, com um orçamento de 256 tokens; uma decisão iniciada dentro de uma chamada de decisão é recusada.

**Comportamento de falha** é fail-open: qualquer falha é resolvida para a decisão `rules`, e a razão é `decision(<decider>): fallback (<reason>)`, com `<reason>` um de `disabled`, `not_configured`, `missing_credential`, `timeout`, `http_error`, `invalid_response`, `out_of_menu`, `refused`, `cooldown`, `network_error`, `recursion`, `low_confidence`, `single_option` ou `no_user_text`. Após um tempo limite, erro HTTP ou erro de rede, o endpoint é ignorado durante 30 s. Uma escolha bem-sucedida diz `decision(<decider>): selected <model> from <n>; confidence <c> (<rules reason>)`. Nenhum URL, chave, prompt ou corpo upstream chega ao registo.

O construtor combo mostra estes campos quando a estratégia do router é `decision`, com as descrições geradas como espaços reservados e um** Decisão de teste** botão que chama `POST /api/combos/decision-preview` uma vez com as definições não guardadas (mesmo sinalizador).

**Quando usar** : tráfego de dificuldade mista em que se pretende que a camada seja escolhida por pedido por um classificador à sua escolha, e não por Nadir especificamente.

**Alias** : `decision` (sem alias)

---

### Estratégias de router personalizadas

Pode registar a sua própria implementação `RouterStrategy` através do API público:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Your routing logic here
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Então use-o:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guia de seleção de estratégia de router

| Caso de uso                   | Estratégia  | Razão                                   |
| ----------------------------- | ----------- | --------------------------------------- |
| Carga de trabalho equilibrada | `rules`     | — padrão considera todos os fatores     |
| Minimizar custos              | `cost`      | Escolhe sempre o mais barato            |
| Minimize a latência           | `latency`   | Escolhe o fornecedor fiável mais rápido |
| SLOs estrito                  | `sla-aware` | Filtros por limites p95/error/cost      |
| Bate-papo multiturno          | `lkgp`      | Persistência da sessão                  |
| Dificuldade mista             | `nadir`     | Escolhe a camada do modelo por prompt   |
| Classificador próprio         | `decision`  | O seu decisor escolhe o modelo          |

Campos com reconhecimento de SLA:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Adequação às tarefas

Mais de 30 modelos avaliados em 6 tipos de tarefas (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Suporta padrões com caracteres universais (por exemplo, `*-coder` → pontuação elevada em programação).

## Recapitulação das variantes automáticas

`AutoVariant` em `autoPrefix.ts` declara** 7 valores** (`coding`, `fast`, `cheap`, `offline`, `smart`, `lkgp`, `chaos`). Together com `auto` simples (tratado por `parseAutoPrefix()` como `variant: undefined`) e as duas sobreposições de camadas planas `auto/subscription` e `auto/thrifty` (`FLAT_TIER_OVERLAY_IDS` em `builtinCatalog.ts`), existem** 10 modelo plano IDs** :

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`, `auto/chaos`, `auto/subscription`, `auto/thrifty`

Além disso, as composições `auto/<category>[:<tier>]`, a família de modelos IDs (por exemplo `auto/claude-opus`) e os alias `auto/best-*` / `auto/pro-*` em `builtinCatalog.ts` são também resolvidos.

## Como os escalões se integram no Auto-Combo

A função de pontuação de 16 fatores (`open-sse/services/autoCombo/scoring.ts`) trata a pertença a um escalão como dois sinais: `tierPriority` (0.0476) e `tierAffinity` (0.0476). Consulte a [tabela canónica de fatores de pontuação](#how-it-works-persisted-auto-combos) acima para ver o conjunto completo de `DEFAULT_WEIGHTS` — as substituições específicas de cada pacote (ship-fast/cost-saver/quality-first/
offline-friendly) estão indicadas na tabela "Perfis de pesos por pacote".

O escalão, por si só, **não** força o Escalão 1 a ficar em primeiro lugar — se a latência do Escalão 1 for elevada ou a relação custo-qualidade não for ideal, o Escalão 2 prevalece. Para impor a ordenação por escalão, utilize a estratégia de combinação `priority` e organize os fornecedores por escalão.

Para favorecer fortemente o Escalão 1 (subscrição), aumente o peso de `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consulte [`docs/guides/TIERS.md`](../guides/TIERS.md) para obter as definições dos escalões e a classificação dos fornecedores.

## Teste e cobertura

### Matriz determinística de decisão de encaminhamento (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` prova o encaminhamento** decisão** das estratégias públicas que cobre de ponta a ponta através do pipeline combinado real com um upstream simulado. A cobertura inclui:

- 18 das 22 estratégias públicas `ROUTING_STRATEGY_VALUES` (ordenadas, ponderadas, custos, contexto, fusão,…); `quota-weighted`, `cache-optimized`, `pipeline` e `jev` não são exercidos pela matriz e dependem dos seus próprios testes unitários.
- `quota-share` (interno) ponta a ponta: DRR imparcialidade + despriorização da saturação através da costura `selectQuotaShareTarget` real (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- cobertura de transferência universal `context-relay` em todas as contagens alvo.

Este conjunto é executado em CI (`test:integration` job) com `--test-concurrency=1` e `--test-force-exit`, pelo que é determinístico e não requer credenciais ativas.

### Fumo ao vivo fechado (NOT em CI — fornecedores reais)

| Comando                                | O que faz                                                                                             |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Encaminhamento real em processo com `RUN_COMBO_LIVE=1`; captura instantâneo de um DBOmniRoute ao vivo |
| `npm run test:combo:live:vps`          | chamadas HTTP num servidor OmniRoute ativo (set `COMBO_LIVE_BASE_URL`)                                |
| `npm run test:combo:live:vps:failover` | O mesmo, com cenários de failover deliberados                                                         |

Estes testes de fumo exercitam o percurso real do fio (conclusão → do fornecedor → combinado). São intencionalmente eliminados do CI porque exigem credenciais ativas e acesso VPS.

---

## Arquivos

| Ficheiro                                                  | Finalidade                                                                                                                                |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Função de pontuação de 16 fatores, `DEFAULT_WEIGHTS`, norma do pool                                                                       |
| `open-sse/services/autoCombo/taskFitness.ts`              | Inquérito de aptidão da tarefa do modelo ×                                                                                                |
| `open-sse/services/autoCombo/engine.ts`                   | Lógica de seleção, bandido, limite orçamental                                                                                             |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusão, investigações, modo de incidente                                                                                                |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 perfis de peso (envio rápido, económico, qualidade em primeiro lugar, compatível com offline, fiabilidade em primeiro lugar, modo caos) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | analisador de prefixo `auto/` + 6 variantes                                                                                               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Constrói `AutoComboConfig` na memória a partir de ligações ao vivo                                                                        |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Gancho de teste para zombar do registo do fornecedor                                                                                      |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (22 estratégias)                                                                                                |
| `src/sse/handlers/chat.ts`                                | Integração: curto-circuito de prefixo automático                                                                                          |
