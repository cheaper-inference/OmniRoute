# OmniRoute Auto-Combo Engine (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Para Utilizadores**: Procura uma forma de começar rapidamente? Consulte o [Guia do Utilizador do Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) para obter explicações e exemplos simples.

> Cadeias de modelos autogeridas com pontuação adaptativa + encaminhamento automático sem configuração

## Encaminhamento automático sem configuração (prefixo `auto/`)

> **NOVO:** Não é necessário criar combos. Utilize o prefixo `auto/` diretamente em qualquer cliente.

### Exemplos rápidos

| ID do modelo   | Variante    | Comportamento                                                                       |
| -------------- | ----------- | ----------------------------------------------------------------------------------- |
| `auto`         | predefinida | Todos os fornecedores ligados, estratégia LKGP, pesos equilibrados                  |
| `auto/coding`  | coding      | Pesos centrados na qualidade, adequados para geração de código                      |
| `auto/fast`    | fast        | Seleção ponderada de baixa latência                                                 |
| `auto/cheap`   | cheap       | Encaminhamento otimizado para o custo (menor custo primeiro)                        |
| `auto/offline` | offline     | Favorece fornecedores com maior disponibilidade de quota                            |
| `auto/smart`   | smart       | Qualidade primeiro + maior taxa de exploração (10%) para descobrir modelos melhores |
| `auto/lkgp`    | lkgp        | LKGP explícito (igual ao `auto` predefinido)                                        |
| `auto/chaos`   | chaos       | Distribuição paralela, um modelo por fornecedor (não é injeção de falhas)           |

### Composição de categoria × nível (`auto/<category>:<tier>`)

Os sufixos ao estilo do OpenRouter separam **o tipo de rota** (categoria) de **como a otimizar** (nível), permitindo combiná-los livremente (#4235 Fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorias** (filtram o conjunto de candidatos por capacidade): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` mantêm modelos com capacidades de visão; `reasoning` mantém modelos de raciocínio/reflexão.
- **Níveis** (selecionam os pesos de pontuação/filtro do conjunto): `fast` (lançamento rápido) · `cheap` (alias `floor`, poupança de custos) · `reliable` (estado do disjuntor + estabilidade da latência) · `free` / `pro` (filtram o conjunto por nível do modelo através de `classifyTier` — nível gratuito vs. premium).

| Exemplo                | Resolve para                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| `auto/coding:fast`     | conjunto de coding, pesos de baixa latência                            |
| `auto/coding:cheap`    | conjunto de coding, otimizado para o custo (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | apenas modelos de raciocínio/reflexão, nível premium                   |
| `auto/vision`          | modelos com capacidades de visão (sem nível → pesos equilibrados)      |
| `auto/multimodal:free` | modelos com capacidades multimodais, apenas do nível gratuito          |

Qualquer `auto/<category>[:<tier>]` válido é resolvido a pedido; um subconjunto selecionado é apresentado em `/v1/models` e no painel (`AUTO_SUFFIX_VARIANTS` em `open-sse/services/autoCombo/builtinCatalog.ts`). A filtragem é **fail-open** — se uma restrição não corresponder a nenhum modelo ligado, é utilizado o conjunto completo para que o encaminhamento nunca falhe. O sistema principal de pontuação (`combo.ts`) permanece inalterado; o filtro de categoria/nível é aplicado em `buildAutoCandidates`.

> **Informações em tempo real sobre modelos:** a adequação do encaminhamento automático baseia-se nas classificações **Arena ELO** em tempo real + dados de níveis do **models.dev** quando o sinalizador `ARENA_ELO_SYNC_ENABLED` está ativo (caso contrário, recorre ao mapa estático de adequação).

**Como utilizar:**

```bash
# Qualquer IDE ou ferramenta CLI compatível com o formato OpenAI
URL base: http://localhost:20128/v1
Chave da API:  <a-chave-do-seu-endpoint>

# No seu código/configuração, defina o modelo como:
model: "auto"                 # predefinição equilibrada
model: "auto/coding"          # melhor para tarefas de programação
model: "auto/fast"            # o mais rápido disponível
model: "auto/cheap"           # o mais barato por token
```

**O que acontece:**

1. O OmniRoute deteta o prefixo `auto/` em `src/sse/handlers/chat.ts`
2. Consulta todas as **ligações ativas a fornecedores** na base de dados
3. Filtra as ligações que têm credenciais válidas (chave de API ou token OAuth)
4. Determina o modelo por ligação (`connection.defaultModel` ou o primeiro modelo do fornecedor)
5. Cria um **combo virtual** em memória (não armazenado na BD)
6. Efetua o encaminhamento utilizando o perfil de pesos da variante selecionada + estratégia LKGP

**Propriedades principais:**

- ✅ **Sempre ativo:** Não necessita de ativação, criação de combos ou configuração
- ✅ **Dinâmico:** Reflete automaticamente os fornecedores atualmente ligados
- ✅ **Persistência de sessão:** O LKGP garante que é dada prioridade ao último fornecedor bem-sucedido
- ✅ **Compatível com várias contas:** Cada ligação a um fornecedor torna-se um candidato separado
- ✅ **Sem escritas na BD:** O combo virtual existe apenas durante o pedido, sem qualquer sobrecarga de persistência

### Controlo de candidatos por chave (#7819, Nível 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = o sufixo após `auto/`, ou
o literal `auto` para o canal base) é um endpoint **só de leitura** que lista o
conjunto atual de candidatos de um canal `auto/*`, complementado com dados de
acessibilidade em tempo real, reutilizando as leituras de resiliência existentes
(nunca o `state` bruto do disjuntor):

- disjuntor do fornecedor — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- período de espera da ligação — `rateLimitedUntil` / `testStatus` na linha
  `provider_connections` resolvida
- bloqueio do modelo — `isModelLocked(provider, connectionId, model)`

Cada candidato também inclui o sinalizador `excluded` desta chave de API. As exclusões
são armazenadas por chave de API (tabela `auto_candidate_overrides`, migração `128`) —
o OmniRoute é de inquilino único e não possui uma tabela `users`, pelo que `apiKeyId`
é a identidade real por autor da chamada mais aproximada — e são aplicadas no ponto
de controlo do conjunto de candidatos em
`open-sse/services/autoCombo/virtualFactory.ts` através da função pura e testada
unitariamente `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
O filtro é **fail-open**: um apiKeyId/canal não definido ou uma falha na consulta à BD
deixam o conjunto sem filtragem, pelo que um operador sem substituições configuradas
obtém um encaminhamento idêntico, byte por byte, ao existente antes desta funcionalidade.

**Adiado para uma issue subsequente:** pesos por candidato + ordenação explícita (Nível 3
— alimenta os caminhos existentes das estratégias ponderada/prioritária) e a fixação de uma
estratégia `combo.ts` específica por canal `auto/*` (Nível 4). Consulte o plano da #7819 para a questão
em aberto sobre se as substituições devem permanecer por chave de API ou tornar-se globais, dado o
modelo de inquilino único.

**Nos bastidores:**

```txt
Pedido: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts deteta o prefixo
   ↓
createVirtualAutoCombo('coding') → candidatePool a partir das ligações ativas
   ↓
handleComboChat (o mesmo motor dos combos persistidos)
   ↓
A pontuação automática seleciona o melhor fornecedor/modelo para cada pedido
```

**Ficheiros de implementação:**

| Ficheiro                                                  | Finalidade                                             |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analisador de prefixos (`parseAutoPrefix`)             |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Cria objetos `AutoComboConfig` virtuais                |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Gancho de teste para simular o registo de fornecedores |
| `src/sse/handlers/chat.ts`                                | Integração: curto-circuito do prefixo automático       |
| `src/shared/constants/providers.ts`                       | Entrada de sistema `SYSTEM_PROVIDERS.auto`             |

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

## Nomes de combos que correspondem a um ID de modelo real

Um combo cujo `name` é idêntico a um ID de modelo simples (por exemplo, um combo chamado
`gpt-5.5`) é um **padrão intencional e suportado**, não um erro: é o
mecanismo para a contingência entre fornecedores por ID de modelo documentado em
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Como a resolução de
combos é verificada antes da resolução de IDs de modelo simples
(`getComboForModel()` em `src/sse/services/model.ts`), um pedido para o ID simples
`gpt-5.5` é encaminhado através dos destinos do combo (por exemplo,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`), em vez de ser enviado diretamente
para um único fornecedor — isto reutiliza a precedência de combo antes da reescrita criada para
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) e é
abrangido por testes de regressão em `tests/unit/responses-combo-resolution-3227.test.ts` e
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

A criação ou alteração do nome de um combo para um nome que oculta um ID de modelo real
**nunca é rejeitada** — fazê-lo interromperia este fluxo de trabalho documentado. Em vez
disso (#8530), `POST /api/combos` e `PUT /api/combos/[id]` adicionam um campo
`warning` não bloqueante à resposta quando o nome (novo) colide com um ID de
modelo real:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

No arranque, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) também regista um aviso `[STARTUP]` numa única linha,
enumerando todos os combos existentes que ocultam um ID de modelo, para que os operadores que
se deparem com esta situação por acidente (em vez de intencionalmente, conforme o #6940) recebam um alerta.
A função auxiliar de deteção encontra-se em `src/lib/combos/modelNameCollision.ts`.

## Chamar um combo personalizado a partir de um cliente

Os combos persistentes (Definições → Combos) só são utilizados quando o cliente envia o **nome exato** do combo no campo `model` — não existe correspondência aproximada ou parcial do nome do combo, nem está envolvido qualquer prefixo `auto/`. Ordem de resolução (`getComboForModel()` em `src/sse/services/model.ts`):

1. correspondência exata do nome do combo (`model: "my-combo"`),
2. prefixo `combo/<name>` (`model: "combo/my-combo"`),
3. mapeamentos modelo→combo com padrões glob (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dois problemas comuns:

- **`auto` não utiliza os seus combos.** `auto`/`auto/*` cria o seu próprio conjunto de candidatos sem necessidade de configuração e só consulta os combos persistentes se existir um combo chamado literalmente `auto` (não recomendado). Para encaminhar através de um combo, envie o respetivo nome exato — não `auto`.
- **`openrouter/auto` é um produto pago real da OpenRouter** ("Auto Best Available"), não um alias do OmniRoute. É a única entrada de modelo estática do registo da OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) e é faturado separadamente. Utilize Definições → Encaminhamento → Ocultar modelos pagos para o excluir dos conjuntos de `auto`.

Consulte [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) e [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) para conhecer a confusão original aqui documentada.

## Como funciona (combos automáticos persistentes)

O Auto-Combo Engine seleciona dinamicamente o melhor provider/model para cada pedido utilizando um **Função de pontuação de 16 fatores** (definido em `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Os pesos padrão somam `1.0`; os pesos personalizados são renormalizados pelo `normalizeScoringWeights()`. Dois dos dezasseis — `cacheAffinity` e `resetWindowAffinity` — transportam um peso padrão de `0`; `reliability` carrega `0` em `DEFAULT_WEIGHTS`, mas `0.03` em pacotes genéricos e `0.04` em `reliability-first`, e `quality` carrega `0.02` em pacotes (`0.03` em `quality-first`): ainda são calculados para cada candidato, e `cacheAffinity` bloqueia a desduplicação imediata da cache fora da pontuação, pelo que os factores padrão zero simplesmente não votam por defeito, enquanto os pacotes o fazem.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Fonte: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenerar via `npm run docs:render-diagrams`). O nome do ficheiro é histórico; a fonte e o diagrama renderizado mostram todos os 16 fatores declarados no `DEFAULT_WEIGHTS`.

| Fator                 | Peso Predefinido | Descrição                                                                                                                                                                                                                                     |
| :-------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429           | Cota restante/espaço limite de taxa [0..1]                                                                                                                                                                                                    |
| `health`              | 0.1605           | Pontuação de integridade do disjuntor (CLOSED= 1.0, HALF_OPEN= 0.5, OPEN= 0.0)                                                                                                                                                                |
| `costInv`             | 0.1429           | Inverso **misturado** custo (60% + de entrada 40% preço do token de saída, normalizado) — mais barato = pontuação mais elevada                                                                                                                |
| `latencyInv`          | 0.1143           | Latência inversa do p95 normalizada para agrupar — mais rapidamente, pontuação mais elevada =                                                                                                                                                 |
| `taskFit`             | 0.0762           | Aptidão do tipo de tarefa (codificação, revisão, planeamento, análise, depuração, documentação)                                                                                                                                               |
| `stability`           | 0.0476           | Estabilidade baseada na variância do desvio padrão da latência — um candidato cujo tempo de resposta oscila com uma pontuação mais baixa                                                                                                      |
| `tierPriority`        | 0.0476           | Prioridade ao nível da conta — Ultra = 1.0, Pro = 0.67, Standard = 0.33, Free = 0.0                                                                                                                                                           |
| `tierAffinity`        | 0.0476           | Afinidade entre o nível do candidato e o nível recomendado pelo manifesto                                                                                                                                                                     |
| `specificityMatch`    | 0.0476           | Correspondência entre a especificidade do pedido (dica manifestada) e a camada do modelo                                                                                                                                                      |
| `contextAffinity`     | 0.0476           | Afinidade entre a necessidade da janela de contexto do pedido e a janela de contexto do modelo                                                                                                                                                |
| `sessionAvailability` | 0.0476           | Disponibilidade da sessão OAuth da ligação candidata para esta sessão (`getOAuthSessionAvailability()`; pontuação das ligações não OAuth 1,0)                                                                                                 |
| `connectionDensity`   | 0.0476           | Distribui a carga entre ligações do mesmo fornecedor (anticoncentração)                                                                                                                                                                       |
| `cacheAffinity`       | 0.00             | Afinidade de hash rendezvous com a ligação que tem maior probabilidade de já conter o prefixo da cache de prompts deste pedido (`open-sse/services/combo/promptCacheAffinity.ts`); desativada por predefinição (#8008)                        |
| `resetWindowAffinity` | 0.00             | Tendência para ligações cuja janela de reposição de cota é favorável (desativada por defeito)                                                                                                                                                 |
| `quality`             | 0.03             | Sinal de qualidade de saída orientado por feedback do rastreador de qualidade de eventos de encaminhamento; os candidatos sem observações recebem um neutro 0,5                                                                               |
| `reliability`         | 0.00             | Participação de sucesso observada, `1 - failureRate`, de 24 horas de histórico de utilização atrás de um piso de dez amostras (caso contrário, métricas em tempo real); candidatos sem observações são lidos como 1,0. Desativado por defeito |

O rastreador `quality` na memória (`open-sse/services/routing/quality.ts`) fica vazio após um reset a frio, pelo que cada candidato pontua um `0.5` neutro até que as primeiras observações cheguem.

> **Quota ilegível (#15347).** Quando um fornecedor tem um coletor de quotas, mas não devolve nada legível (falha na pesquisa, credenciais em falta, utilização apenas de mensagens ou um instantâneo malformado sem `windows` analisável e sem `percentUsed` finito, incluindo `percentUsed: null`), o candidato pontua `0` no eixo `quota` e a sua pontuação final é multiplicada por `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` (0,5, `autoStrategy.ts`), o mesmo padrão de penalização suave que a penalização do estado da ligação. Uma leitura de utilização com falha é uma evidência sobre a telemetria, não sobre o fornecedor, pelo que é classificada estritamente abaixo de qualquer leitura real, incluindo uma leitura 100%-used confirmada, mas nunca é bloqueada ou despejada. Um fornecedor sem limite reporta `unlimited: true` e pontua como quota total; um fornecedor sem coletor de quotas registado não possui qualquer fonte de telemetria e mantém o padrão `100`.

**Sombra:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` conforme declarado em `DEFAULT_WEIGHTS`; os pesos configurados pelo utilizador são renormalizados numa distribuição pelo `normalizeScoringWeights()` antes da pontuação.

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

O mecanismo combinado do OmniRoute suporta **20 estratégias de encaminhamento** (declarado em `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). O próprio mecanismo Auto Combo está exposto na estratégia `auto` ; os restantes estão disponíveis para combos persistentes.

| Estratégia          | Descrição                                                                                                                                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Lista ordenada do primeiro alvo com prioridade explícita                                                                                                                                                            |
| `weighted`          | Ponderado aleatoriamente pelo peso por alvo                                                                                                                                                                         |
| `round-robin`       | Percorrer os alvos por ordem (em lote; ver abaixo)                                                                                                                                                                  |
| `context-relay`     | Distribuir o contexto pelos alvos (longas conversas)                                                                                                                                                                |
| `fill-first`        | Preencha a quota de cada destino antes de passar para o próximo                                                                                                                                                     |
| `p2c`               | Balanceamento de carga aleatório Power-of-2-choices                                                                                                                                                                 |
| `random`            | Seleção aleatória uniforme                                                                                                                                                                                          |
| `least-used`        | Escolha o alvo com menor carga atual                                                                                                                                                                                |
| `cost-optimized`    | Minimize $ por pedido de acordo com o preço de catálogo                                                                                                                                                             |
| `reset-aware` ⭐    | Priorizar por tempo de redefinição de cota Janelas de redefinição curta — com classificação superior                                                                                                                |
| `reset-window`      | Prefira destinos cuja janela de quotas seja reposta mais cedo                                                                                                                                                       |
| `headroom`          | Escolha o alvo com o maior espaço de cota restante                                                                                                                                                                  |
| `quota-weighted`    | Ignore as contas esgotadas e escolha entre as restantes na proporção da quota restante dividida pela carga de voo; as conversas existentes permanecem fixadas                                                       |
| `strict-random`     | Aleatório sem desduplicação de repetições                                                                                                                                                                           |
| `auto`              | Utilizar pontuação de combinação automática (16 fatores) —**recomendado**                                                                                                                                           |
| `lkgp`              | Último caminho válido (fixa o último fornecedor bem-sucedido e depois volta às regras)                                                                                                                              |
| `context-optimized` | Escolha o alvo que melhor se adapta ao tamanho do contexto atual                                                                                                                                                    |
| `cache-optimized`   | Reordene os destinos por afinidade de cache de prompt — a ligação com maior probabilidade de já conter o prefixo em cache deste pedido é tentada primeiro (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Distribua-se por um painel de modelos em paralelo e, em seguida, sintetize uma resposta através de um juiz (ver abaixo)                                                                                             |
| `pipeline`          | Execute os destinos sequencialmente, encadeando a saída de cada passo na entrada do passo seguinte; apenas a resposta final é devolvida (#6396)                                                                     |

⭐ = Novo na v3.8.0 · 🧬 = Novo na v3.8.36

### Semântica `weighted`

`weighted` é um **sorteio aleatório proporcional por pedido** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), e não um equalizador:

- Cada solicitação atrai **um** passo com probabilidade `weight / totalWeight`; os restantes passos são ordenados por peso decrescente como a cadeia de fallback para esse pedido.
- Uma etapa cujo peso é `0` (ou em falta) é **nunca desenhado** embora qualquer outra etapa tenha um peso > 0 — só pode servir de substituto após a falha da etapa desenhada. Somente quando **tudo** os pesos são 0, a seleção torna-se uniforme.
- Passos cujos alvos são todos indisponíveis Disjuntor do fornecedor — `OPEN`, arrefecimento da ligação, bloqueio do modelo — são removidos do sorteio antes de acontecer (`open-sse/services/combo/targetResolution.ts`), pelo que um único passo intacto pode vencer temporariamente todos os pedidos.
- `stickyWeightedLimit` (configuração de combinação, `1` padrão = desativado) fixa o passo desenhado para tantos sucessos consecutivos antes de redesenhar.

Para rotação estrita utilize `round-robin`; pesos iguais no `weighted` fornecem — estatístico e não um equilíbrio estrito —.

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

Estes são orçamentos de caracteres JSON serializados selecionados pelo operador, e não janelas de contexto de token ou limites de upstream garantidos. O modelo exato IDs substitui o padrão. Acima do limiar, a compressão remove definições de ferramentas idênticas, corta as provas de ferramentas sobredimensionadas com um resumo e remove grupos históricos completos antigos em direção à proporção desejada. Retém as instruções system/developer, o último pedido do utilizador, a última ronda de ferramentas, incluindo calls/results paralelo, e as principais instruções de encaminhamento do Gemini. As instruções de nível superior e as definições das ferramentas são preservadas. Um marcador de omissão regista o histórico removido; trata-se de um recorte determinístico, não de um resumo semântico. Se o contexto fixado ainda exceder o orçamento, o pedido retornará 413 antes de contactar o modelo. Com a compressão desativada ou abaixo do limite, o pedido passa inalterado.

Nas continuações dos resultados da ferramenta, OmniRoute também interrompe a execução quando duas rondas consecutivas concluídas repetem as mesmas chamadas de ferramenta com resultados inalterados ou quando todos os resultados marcados explicitamente em duas rondas consecutivas falham. Os resultados alterados permitem chamadas repetidas (por exemplo, sondagens). A proteção é redefinida numa nova solicitação do utilizador, agrupa as chamadas paralelas numa ronda e suporta Anthropic, conclusões de chat, respostas e históricos Gemini. O planeador recebe o motivo e possui a resposta final, mesmo que solicite outra ronda de ferramentas.

Os modelos adicionais após o segundo destino são backups de executores ordenados. Uma resposta HTTP com falha ou exceção de transporte avança para o próximo executor, transportando a mesma decisão do planeador e ferramentas nativas, mas o próprio passo do executor solicita e resolve a ligação. A primeira resposta bem-sucedida é devolvida inalterada, incluindo o streaming SSE ; falhas após o início de um fluxo bem-sucedido não podem ser aqui repetidas. Se todos os executores falharem, será devolvida a última falha. O cliente cancela o envio interrompido.

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

### Lote fixo `round-robin` e expansão da conta

O round-robin é em lote, não é um pedido por etapa:

- `stickyRoundRobinLimit` (configuração combinada, depois `comboStickyRoundRobinLimit`, depois `settings.stickyRoundRobinLimit`, padrão **3** ) mantém o mesmo alvo durante tantos sucessos consecutivos antes de rodar. Defina a substituição combinada como `1` para a rotação de um pedido. O editor combinado mostra o valor efetivo e de que camada veio.
- `connectionAwareExpansion` (configuração combinada, depois definições, predefinição **FALSO** ) expande cada etapa ao nível do fornecedor em metas por conta antes da rotação. As estratégias do Grupo B (prioritária, ponderada, round-robin, aleatória, p2c, menos utilizada, otimizada para custos, lkgp, preencher primeiro, aleatório estrito, otimizada para contexto, otimizada para cache, retransmissão de contexto, fusão, pipeline) mantêm uma visão ao nível do fornecedor até que esta seja ativada. O editor combinado expõe herdar/ligar/desligar; herdar utiliza o padrão global (desligado).
- Encaminhamento de localidade de cache de prompt (`promptCacheAffinityEnabled`, padrão **VERDADE** ) reordena as ligações fixadas para que as chaves de cache correspondentes permaneçam numa conta. Tem precedência sobre o round-robin e a rotação ponderada nos degraus fixados por conta. Desative-o em Configurações padrão → Combo se precisar de uma rotação rigorosa. Não há substituição por combinado.

Para rotação de várias contas num modelo, prefira **uma etapa de conta dinâmica** ( `connectionId` vazio, pool inteiro) com limite fixo `1`, e não três `connectionId` s fixados. Os passos fixados e a afinidade são recolhidos na mesma conta, mesmo enquanto o contador RR avança.

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

**Não existe um endpoint `POST /api/combos/auto` dedicado** — o Auto-Combo é utilizado de duas formas:

1. **Sem configuração (recomendado):** Envie qualquer pedido de conclusão de chat com `model: "auto"` ou `model: "auto/<variant>"`. A fábrica virtual cria a combinação para cada pedido — sem persistência nem chamadas de API adicionais.

2. **Combinação persistida com `strategy: "auto"`:** Crie uma combinação normal através de `POST /api/combos` e defina `strategy: "auto"`, juntamente com `config.auto.weights` / `config.auto.candidatePool`. É utilizado o mesmo motor de pontuação; a combinação é armazenada em `combos` e pode ser reutilizada através do respetivo ID.

Para descoberta, `GET /api/combos/auto` apresenta todas as variantes com o respetivo conjunto de candidatos resolvido, bem como `context_length` / `max_output_tokens` — o valor MÁXIMO entre as janelas do conjunto de candidatos. Os clientes (por exemplo, o plugin opencode) têm de anunciar estes valores em vez de `0`: um contexto igual a zero desativa completamente a compactação automática do opencode, permitindo que as sessões cresçam até que a limpeza do histórico do gateway destrua o contexto. É seguro anunciar o valor MÁXIMO, porque o pré-filtro de contexto do Auto-Combo encaminha pedidos demasiado grandes para candidatos com janelas maiores.

```bash
# Utilização sem configuração (sem criar uma combinação)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combinação automática persistida através do endpoint normal de combinações
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Estratégias do router automático

As combinações persistidas com `strategy: "auto"` podem definir `config.routerStrategy` (ou a opção legada
`config.auto.routerStrategy`) como uma das seguintes:

- `rules` — pontuação ponderada predefinida
- `score` — seleciona a pontuação ponderada configurada mais elevada. Em caso de empate exato, é preservada a ordem
  configurada dos candidatos; o `explorationRate` existente efetua a amostragem a partir de todo o conjunto ordenado.
- `cost` / `eco` — fornecedor saudável mais barato
- `latency` / `fast` — menor latência p95, com penalização de fiabilidade
- `sla-aware` / `sla` — dá preferência a candidatos que satisfaçam os SLO de latência p95, taxa de erros e, opcionalmente,
  custo
- `lkgp` — começa pelo último fornecedor conhecido como funcional
- `nadir` — consulta a API de decisão do [Nadir](https://getnadir.com) para determinar qual dos modelos do conjunto é necessário para o
  prompt; requer ativação explícita e, em caso de falha, recorre a `rules`

### Estratégias do router em detalhe

O motor do Auto-Combo disponibiliza 7 implementações **RouterStrategy** modulares, que
pode alternar através de `config.routerStrategy` (ou da opção legada `config.auto.routerStrategy`).
Cada estratégia escolhe um fornecedor do conjunto de candidatos, com base num `RoutingContext`
(tipo de tarefa, indicadores de ferramentas/visão, estimativa de tokens, política de SLA opcional e
último fornecedor conhecido como funcional opcional).

#### 1. `rules` (predefinição) — pontuação ponderada com 16 fatores

Encapsula o motor de pontuação existente. Filtra os candidatos cujo circuit breaker está
no estado `OPEN` e, em seguida, executa `scorePool()` com o tipo de tarefa atual e `getTaskFitness()`,
escolhendo o fornecedor com a pontuação mais elevada.

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

**Quando utilizar**: Predefinição. Utilize quando pretender um equilíbrio entre todos os sinais.

**Nome alternativo**: `rules` (sem nome alternativo)

---

#### 2. `cost` / `eco` — fornecedor saudável mais barato

Ordena o conjunto de candidatos por `costPer1MTokens` (ordem ascendente) e escolhe o mais barato.
Filtra primeiro os candidatos no estado `OPEN`.

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

**Quando utilizar**: Cargas de trabalho sensíveis ao custo, processamento em lote ou tarefas em segundo plano.

**Nomes alternativos**: `cost`, `eco`

---

#### 3. `latency` / `fast` — menor latência p95, com penalização de fiabilidade

Ordena por `p95LatencyMs + (errorRate * 1000)`. A penalização da taxa de erros garante
que os fornecedores pouco fiáveis ficam numa posição inferior, mesmo que a respetiva latência nominal seja baixa.

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

**Quando utilizar**: Cargas de trabalho sensíveis à latência, como chat em tempo real, preenchimento automático ou
assistentes de programação interativos.

**Nomes alternativos**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — conformidade com SLO de latência/erros/custo

Atribui uma pontuação a cada candidato com base no grau de cumprimento da política de SLO configurada:

| Fator                     | Peso | Fórmula                                             |
| ------------------------- | ---- | --------------------------------------------------- |
| Pontuação de latência     | 35%  | `threshold / max(value, ε)`                         |
| Pontuação de erros        | 35%  | `threshold / max(value, ε)`                         |
| Pontuação de estado       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)   |
| Pontuação de custo        | 10%  | `threshold / max(value, ε)` ou normalização inversa |
| Pontuação de estabilidade | 5%   | desvio-padrão da latência com normalização inversa  |

Quando `hardConstraints: true`, os candidatos são ordenados principalmente pela **pontuação de violação**
(o quanto excedem qualquer SLO) e, em seguida, pela pontuação composta. Caso contrário, é utilizada apenas
a pontuação composta.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... atribui uma pontuação a cada candidato com base na política: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Campos de SLA** (definidos na configuração da combinação):

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

**Quando utilizar**: Cargas de trabalho de produção com orçamentos rigorosos de latência, taxa de erros ou custo.

**Aliases**: `sla-aware`, `sla`

---

#### 5. `lkgp` — último fornecedor conhecido como funcional em primeiro lugar

Tenta primeiro o **último fornecedor conhecido como funcional** (se estiver definido) e, em seguida, recorre à
estratégia `rules`. Útil para a afinidade da sessão — o mesmo fornecedor processa
os pedidos subsequentes numa conversa.

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

    // Recurso à estratégia rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Quando utilizar**: Conversas com múltiplos turnos nas quais pretende que o mesmo fornecedor processe
os pedidos subsequentes (por exemplo, para colocação em cache, continuidade do contexto ou consistência dos preços).

**Alias**: `lkgp` (sem alias)

---

#### 6. `nadir` — escolha de modelo sensível ao prompt através do Nadir

Cada uma das estratégias acima classifica os candidatos com base na sua própria telemetria; nenhuma delas lê
o pedido. `nadir` envia o último turno do utilizador, juntamente com os IDs dos modelos do conjunto, para
a API de decisão do [Nadir](https://getnadir.com) (`POST /v1/bucket`) e encaminha para o modelo
selecionado pelo Nadir nesse menu (`simple` → o modelo capaz mais económico, `complex` → o
modelo de ponta). A ligação que disponibiliza esse modelo continua a ser escolhida por `rules`, pelo que a quota,
o estado e o custo continuam a determinar a conta utilizada.

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

`OMNIROUTE_NADIR_API_KEY` e `OMNIROUTE_NADIR_BASE_URL` são alternativas de ambiente para as duas
cadeias de caracteres. `baseUrl` só é necessário para uma instância autoalojada do Nadir (é aceite um `/v1` no final).
As chamadas sem chave são encaminhadas para o nível anónimo do Nadir, que tem um limite de pedidos por IP. Com uma chave
([crie uma](https://app.getnadir.com/dashboard/api-keys)), cada decisão é
registada no seu painel do Nadir. Configuração e verificação completas:
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

Dados enviados: o texto da última mensagem do utilizador (os primeiros 16 mil caracteres), os IDs dos
modelos candidatos e uma etiqueta de canal `source: "omniroute"`. Não são enviados o prompt de sistema, o histórico, as ferramentas ou
os cabeçalhos.

O comportamento em caso de falha é fail-open: um timeout (2000 ms por predefinição), uma resposta que não seja 2xx, um
anfitrião inacessível, uma resposta inválida ou uma seleção que não pertença ao conjunto resulta na decisão de `rules`
e o motivo recebe o prefixo `NadirStrategy: fallback (…)`. Após uma chamada falhada, a
estratégia ignora a rede durante 30 s, pelo que uma indisponibilidade causa um timeout a cada 30 s, em vez de
um por pedido. Os eventos de encaminhamento indicam `strategy: "nadir"` apenas quando o Nadir tomou efetivamente
a decisão.

**Quando utilizar**: tráfego com vários níveis de dificuldade num conjunto que abrange diferentes níveis de modelos (um modelo pequeno, um
intermédio e um de ponta), quando pretende reduzir o custo de utilizar sempre o modelo de ponta.

**Alias**: `nadir` (sem alias)

---

### Estratégias de encaminhamento personalizadas

Pode registar a sua própria implementação de `RouterStrategy` através da API pública:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // A sua lógica de encaminhamento aqui
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

Em seguida, utilize-a:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guia de seleção da estratégia de encaminhamento

| Caso de utilização            | Estratégia  | Motivo                                       |
| ----------------------------- | ----------- | -------------------------------------------- |
| Carga de trabalho equilibrada | `rules`     | Predefinição — considera todos os fatores    |
| Minimizar custos              | `cost`      | Seleciona sempre o mais barato               |
| Minimizar latência            | `latency`   | Seleciona o fornecedor fiável mais rápido    |
| SLO rigorosos                 | `sla-aware` | Filtra por limiares de p95/erros/custos      |
| Conversa com vários turnos    | `lkgp`      | Afinidade de sessão                          |
| Dificuldade variável          | `nadir`     | Seleciona o nível do modelo para cada prompt |

Campos compatíveis com SLA:

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

## Recapitulação das variantes Auto

Incluindo o `auto` simples (predefinição) e os 6 valores de `AutoVariant` declarados em `autoPrefix.ts`, existem **7 IDs de modelo invocáveis**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` propriamente dito enumera 6 valores; a 7.ª opção é «sem variante» — o `auto` simples — processada por `parseAutoPrefix()` como `variant: undefined`.)

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

## Testes e cobertura

### Matriz determinística de decisões de encaminhamento (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` comprova a **decisão** de encaminhamento das 19 estratégias públicas, de ponta a ponta, através do pipeline de combinação real com um serviço a montante simulado. A cobertura inclui:

- Todas as 19 estratégias `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interna) de ponta a ponta: equidade DRR + despriorização por saturação através do ponto de integração real `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Cobertura da transferência universal de `context-relay` para todas as quantidades de destinos.

Este conjunto de testes é executado em CI (tarefa `test:integration`) com `--test-concurrency=1` e `--test-force-exit`, pelo que é determinístico e não requer credenciais reais.

### Smoke tests reais condicionados (NÃO incluídos em CI — fornecedores reais)

| Comando                                | O que faz                                                                                                    |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Encaminhamento real no processo com `RUN_COMBO_LIVE=1`; cria um snapshot de uma base de dados OmniRoute real |
| `npm run test:combo:live:vps`          | Chamadas HTTP a um servidor OmniRoute real (defina `COMBO_LIVE_BASE_URL`)                                    |
| `npm run test:combo:live:vps:failover` | O mesmo, com cenários de ativação pós-falha deliberados                                                      |

Estes smoke tests exercitam o percurso de comunicação real (combinação → fornecedor → conclusão). São intencionalmente excluídos de CI porque requerem credenciais reais e acesso a um VPS.

---

## Ficheiros

| Ficheiro                                                  | Finalidade                                                                                                     |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Função de pontuação com 16 fatores, `DEFAULT_WEIGHTS`, normalização do conjunto                                |
| `open-sse/services/autoCombo/taskFitness.ts`              | Consulta de adequação modelo × tarefa                                                                          |
| `open-sse/services/autoCombo/engine.ts`                   | Lógica de seleção, bandit, limite de orçamento                                                                 |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusão, sondas, modo de incidente                                                                            |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 perfis de ponderação (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analisador do prefixo `auto/` + 6 variantes                                                                    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Cria uma `AutoComboConfig` em memória a partir de ligações ativas                                              |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Gancho de teste para simular o registo de fornecedores                                                         |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 estratégias)                                                                     |
| `src/sse/handlers/chat.ts`                                | Integração: curto-circuito do prefixo automático                                                               |
