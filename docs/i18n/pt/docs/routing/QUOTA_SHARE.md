# Quota Sharing Engine (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referência do documento**: `docs/routing/QUOTA_SHARE.md`
> Parte do Grupo B (planos 16 + 22).

---

## Visão geral

O Motor de Partilha de Quotas distribui de forma justa a quota temporal de um fornecedor (por exemplo, janela de 5 horas do Codex, 1500 pedidos/h do Kimi) entre várias chaves de API que partilham a mesma ligação.

**Problema que resolve:** o OmniRoute encaminha várias chaves de API para a mesma conta do fornecedor a montante. Sem lógica de partilha, um pico de pedidos da chave A pode esgotar a quota do fornecedor para essa hora, deixando as chaves B e C bloqueadas até a janela ser reiniciada. O motor evita isto ao:

1. Monitorizar o consumo contínuo de cada chave por dimensão (%, pedidos, tokens, $).
2. Aplicar um algoritmo de partilha justa que conserva a capacidade: uma chave pode utilizar quotas inativas enquanto o conjunto global não estiver saturado.
3. Aplicar o resultado no caminho crítico (`chatCore.ts`) antes de o pedido chegar ao executor a montante.

---

## Algoritmo: Conservação do Trabalho com Partilha Justa

Implementado em `src/lib/quota/fairShare.ts`.

### Modos

| Estado                                     | Modo         | Comportamento                                                     |
| ------------------------------------------ | ------------ | ----------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generoso** | A Key pode emprestar até ao limite global menos o total consumido |
| `globalUsedPercent >= saturationThreshold` | **Estrito**  | Aplicar estritamente a partilha justa individual                  |

`saturationThreshold = 0.5` padrão (env `QUOTA_SATURATION_THRESHOLD`).

Estes dois modos descrevem um pool no modo de empréstimo padrão, `saturation`. Um pool no modo `consent` aplica sempre regras estritas, qualquer que seja a saturação. Consulte [Empréstimos consentidos (opção por pool)](#consented-lending-per-pool-opt-in).

### Decisão por dimensão

Para cada dimensão ativa no pool, o motor calcula:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Para as dimensões `percent`, `consumed` provém do livro de atribuição (consulte [Dimensões percentuais: atribuição por chave](#percent-dimensions-per-key-attribution) ).

Depois:

- **`policy = hard`** : se `consumed > fairShareAllowed` e modo forem estritamente →** bloco** .
- **`policy = soft`** : se `consumed > fairShareAllowed` e modo forem estritamente →** penalizar** (despriorizar no combo; nunca bloquear).
- **`policy = burst`** : permitir enquanto existir espaço global, independentemente do quinhão.

### Boné absoluto

`capValue` + `capUnit` numa alocação é um limite rígido independente do modo ou da política. Qualquer dimensão em que `consumed >= capValue` sempre** blocos** o pedido. Para um limite `percent`, `consumed` é apenas a parte atribuída à chave.

### Verificação multidimensional

Uma solicitação é bloqueada se** qualquer** dimensão no pool iria bloqueá-lo. As dimensões são independentes — uma exaustão de 5h% não afecta a dimensão semanal.

### Empréstimo

No modo generoso, uma chave cuja alocação é subconsumida pode utilizar o excedente das quotas não alocadas de outras chaves. A fórmula é:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

onde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. O tecto global (pool `limit` para esta dimensão) é sempre o tecto rígido.

### Empréstimo consentido (opção por pool)

Cada pool possui um modo de empréstimo. `saturation` é o padrão e mantém as regras acima. No modo `consent` uma chave `hard` passa a sua parte apenas dentro da capacidade que outras chaves concordaram em emprestar. O administrador define o modo de cada pool. Cada titular da chave define o seu próprio consentimento através do [Consentimento de Empréstimo](#lending-consent).

Um consentimento é uma percentagem de 0 a 100 e um prazo opcional em milissegundos de época. A chave empresta essa percentagem da sua parcela ociosa enquanto o prazo está no futuro.

Para uma dimensão, `L` é o limite efetivo: o limite do plano multiplicado pelas contas na pool. A porta calcula, para a chave requerente:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` é o peso da chave, ou `100 / n` para cada chave quando nenhum peso está acima de 0. `lend_k` é a percentagem ativa da chave e 0 quando o prazo expira. O próprio consentimento da chave requerente nunca conta. Uma chave `hard` é recusada quando o seu consumo atinge a sua quota mais `borrowAvailable`.

Capacidade que nenhuma alocação reclama (100 menos a soma dos pesos) não é emprestável. Nenhuma chave concordou em emprestá-lo.

**Exemplo.** `L` é 1000.

| Chave | Peso | Partilhar | Consumido | Empresta |
| ----- | ---- | --------- | --------- | -------- |
| UM    | 50   | 500       | 530       | 0%       |
| B     | 30   | 300       | 100       | 50%      |
| C     | 0    | 0         | 60        | 0%       |

- B empresta 50% dos seus 200 ociosos, que é 100. C já levou 60 acima da sua quota-parte. A pode pedir emprestado 40.
- A é servido a 530 e recusado quando o seu consumo atinge 540.
- Antes de C utilizar o que quer que fosse, com A igual ou inferior à sua parte, C podia pedir emprestado 100.
- Antes de C usar o que quer que fosse, com A em 530, C podia pedir emprestado 70.

**Peso zero.** Uma chave com peso 0 tem uma participação 0. É satisfeita apenas enquanto o seu consumo estiver abaixo do que outras emprestam. Quando ninguém empresta, é recusado desde o primeiro pedido.

**Prazos.** Nenhuma tarefa em segundo plano expira um consentimento. Cada pedido compara o prazo com o seu próprio horário, sendo que um prazo igual a esse horário já passou. Um prazo armazenado que não seja um número finito, ou que já tenha passado a maior data que um `Date` pode conter, conta como passado.

**`soft` e `burst`.** Os empréstimos não os limitam. Uma chave `soft` perde a prioridade depois de ultrapassar a sua partilha. Uma chave `burst` passa enquanto a piscina tem espaço. O teto da piscina ainda recusa todas as chaves quando o total da piscina atinge o seu limite.

**Custo no percurso da solicitação.** Um `saturation` pool não lê nada mais do que antes. Num pool `consent`, uma dimensão contável lê as outras chaves apenas para uma chave `hard` igual ou superior à sua quota-parte, enquanto outra chave empresta. De seguida, faz uma leitura por outra chave, em paralelo. Uma leitura com falha conta como um consumo de 0 para essa chave. Uma dimensão `percent` não acrescenta qualquer leitura, porque o livro de atribuição contém todas as chaves.

**Edição de um pool.** Uma edição mantém o consentimento das chaves que permanecem. Isto é válido para edições de alocação, substituições em todo o grupo e chamadas `ensure`. Uma chave removida perde o seu consentimento e uma chave adicionada começa novamente em 0. As rotas administrativas devolvem o consentimento de cada chave e nunca o gravam. Mudar um pool de volta para `saturation` mantém todos os consentimentos armazenados, o que não tem qualquer efeito neste modo. Mudar o pool para `consent` reativa novamente os consentimentos armazenados cujo prazo não expirou. Um detentor de chave pode limpar um consentimento armazenado em qualquer modo.

**Atualizando.** Se as colunas `lending_percent` e `lending_until` já existirem, a migração apenas adicionará `borrow_mode` e as percentagens armazenadas permanecerão como estão. Cada pool inicia no modo `saturation`. Ative `consent` por pool no assistente de pool. Nada é inferido dos valores armazenados.

**Limitações.**

- Um credor pode encontrar o pool no seu teto antes de utilizar a sua própria parcela. A capacidade emprestada por outros conta para o total do pool.
- A verificação é executada antes do pedido e não reserva nada. As solicitações simultâneas leem o consumo antes de qualquer uma ser registada, pelo que a capacidade emprestada pode ser gasta mais do que uma vez, limitada pelas solicitações em curso. A verificação de partilha do modo `saturation` tem a mesma propriedade.

---

## Contador de Janela Deslizante

Implementado em `src/lib/quota/sqliteQuotaStore.ts` e `redisQuotaStore.ts`.

Dois intervalos por `(apiKeyId, dimensionKey)`:

- `curr`: intervalo atual (`floor(nowMs / windowMs)`)
- `prev`: intervalo anterior (`curr - 1`)

Valor contínuo efetivo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precisão**: aproximadamente 99%. O erro é, no máximo, 1% do tamanho da janela no limite entre intervalos (inerente à aproximação de 2 intervalos).

### Concorrência

Controlador SQLite: um mutex em memória por chave `(apiKeyId | dimensionKey)` evita a condição de corrida de leitura-modificação-escrita. O padrão segue o mecanismo anti-thundering-herd de `src/sse/services/auth.ts`.

Controlador Redis: script Lua EVAL para incremento atómico — é executado como um único comando Redis.

---

## Drivers

### SQLite (predefinido, sem instalação)

- Tabela: `quota_consumption` (consulte a migração `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Mais adequado para implementações de instância única.
- Toda a persistência é efetuada na BD SQLite existente do OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opcional, várias instâncias)

- Requer o pacote npm `ioredis`.
- Os contadores são armazenados no Redis; os metadados (conjuntos/alocações) permanecem no SQLite.
- Mais adequado para implementações com várias réplicas, nas quais os contadores têm de ser partilhados.

### Alternar entre drivers

Através da interface de definições (`/dashboard/settings` → Armazenamento de Quotas), ou através de variáveis de ambiente:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

A definição da BD tem precedência sobre a variável de ambiente. Se `driver=redis`, mas o URL estiver ausente ou o
`ioredis` não estiver instalado, a fábrica reverte para SQLite e regista um aviso.

Ordem de seleção do driver:

1. Definição da BD `quotaStore.driver`
2. Variável de ambiente `QUOTA_STORE_DRIVER`
3. Predefinição: `sqlite`

---

## Multidimensional

Um pool pode ter múltiplas dimensões. Cada dimensão é independente:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Exemplo: plano Codex** (5h% + semanal%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Uma solicitação deve satisfazer todas as dimensões para ser permitida.

### Dimensões percentuais: atribuição por chave

Um plano percentual informa um valor de utilização por conta e janela do plano. O fornecedor não fornece contador por chave API.

Para dividir este valor entre chaves, cada pool mantém um livro de atribuição por conta e janela de plano. `src/lib/quota/percentLedger.ts` contém as regras do livro. `src/lib/quota/percentAttribution.ts` transforma o livro nos números que a fiscalização utiliza. O resultado é uma estimativa construída a partir dos tokens que cada rota principal.

#### Leituras que movem o livro

O livro avança apenas no valor do próprio fornecedor para a janela do plano solicitado. Estas conexões relatam uma:

| Provedor                             | Planear janelas |
| ------------------------------------ | --------------- |
| Claude, através de uma ligação OAuth | `5h`, `weekly`  |
| Codex                                | `5h`, `weekly`  |

Não contam como leitura:

- uma resposta que o cliente prestador marca como obsoleta
- uma janela Claude cuja percentagem o fornecedor não informou
- a figura de outra janela, ou o pior caso entre janelas
- o substituto do cabeçalho de limite de taxa
- uma leitura falhada

Outros fornecedores, incluindo Claude com chave API, não possuem livro. Cada chave é cobrada 0 nas suas dimensões percentuais, como antes desta alteração.

Uma leitura partilha a cache de 30 segundos do sinal de saturação. Uma leitura Claude é datada pelo momento em que o valor foi observado nos cabeçalhos de resposta ou lido no endpoint de utilização, quando essa hora é conhecida. Outras leituras são datadas de quando a entrada da cache foi criada.

#### O que o livro guarda

Cada pedido registado adiciona os seus tokens, uma vez, a um contador por pool, conta e chave. Um contador só cresce. O livro guarda três coisas:

- a linha de base: a figura quando o livro foi aberto ou a janela foi virada pela última vez
- a última figura aplicada
- por chave, o seu contador de tokens nesse mesmo momento, denominado marca

O livro é atualizado quando a aplicação ou a rota de utilização calcula a atribuição. As gravações são comparadas e definidas num número de revisão. Um escritor que perde tenta novamente uma vez numa nova leitura.

#### Como a parte de uma chave é calculada

A parte de cada chave é computada quando o livro é lido. O crescimento da figura desde a linha de base é dividido entre as chaves proporcionalmente aos tokens que cada uma encaminhou desde a sua marca.

Together, estes tokens explicam no máximo um ponto do valor por tokens `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (1.000 por defeito). O crescimento que não explicam é externo. A linha de base também é externa.

Por exemplo, um livro abre a 0. A chave A encaminha 900.000 tokens e a chave B encaminha 100.000. Com um valor de 60, a parte de A tem 54 pontos e a parte de B tem 6.

Um contador abaixo da marca da sua chave foi reiniciado e conta por completo. Uma chave sem marca, como uma chave que se junta à pool no meio de uma janela, conta todos os seus tokens. Um número atrasado em relação aos tokens provoca um erro que desaparece na leitura seguinte. Não acumula.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` é lido em todas as atribuições. Um valor que não seja um número finito de pelo menos 1 volta a 1.000.

#### Como uma leitura muda o livro

A primeira regra de correspondência aplica-se:

1. **Nenhum livro ainda:** a leitura abre o livro. A sua figura é a linha de base e cada contador está marcado.
2. **Leitura mais antiga:** uma leitura datada antes da última aplicada é ignorada. O mesmo acontece com uma leitura cujo tempo de reinicialização seja superior a 30 minutos anterior ao armazenado.
3. **Janela do novo fornecedor:** um tempo de reinicialização mais de 30 minutos depois do armazenado vira o livro. A figura torna-se a linha de base e cada contador é novamente marcado. Chaves sem contador saem do livro.
4. **Janela finalizada:** um tempo de reposição armazenado que não seja posterior à hora dos dados de leitura significa que a janela terminou. A leitura transforma-se no livro, seja qual for a sua figura.
5. **Figura mais alta:** apenas a última figura se move. A linha de base e as marcas permanecem.
6. **Mesma figura:** a figura, a linha de base e as marcas permanecem. Apenas um tempo de reinicialização que falta ao livro é escrito.
7. **Figura inferior:** um valor inferior nunca é aplicado como tal. O livro só vira quando três coisas se aguentam. É pelo menos dois minutos mais recente do que a última leitura aplicada. Nada diz que a janela é a mesma aberta. Está mais de um ponto abaixo.

A janela conta como a mesma aberta quando são mantidas três coisas. Ambos os tempos de reinicialização são conhecidos. Estão a 30 minutos um do outro. O armazenado ainda está à frente da leitura. Um número mais pequeno dentro dessa janela não altera nada.

Um tempo de reinicialização é armazenado apenas enquanto estiver à frente do tempo de dados da leitura que o transporta. Um valor mais elevado armazena o tempo de reposição da sua leitura quando aquela é utilizável, e mantém o armazenado caso contrário. Uma figura igual regista o tempo de reinicialização da sua leitura apenas quando o livro não possui nenhum. Não muda mais nada. Um valor inferior que não roda o livro regista qualquer tempo de reinicialização.

#### Quando o livro é utilizado

Após uma leitura, o livro é utilizado, a menos que o tempo de reinicialização armazenado não seja posterior à hora atual. Este caso surge quando uma leitura feita pouco antes do reset, como a que é veiculada na cache, é observada logo após o mesmo.

Sem uma leitura utilizável, o livro armazenado será utilizado apenas enquanto ainda puder ser o livro da janela atual. Isto vale em dois casos:

- o seu tempo de reinicialização é conhecido e ainda está por vir
- não tem tempo de reinicialização e a última leitura que o alterou tem no máximo 15 minutos

Caso contrário, nada é atribuído, como quando não há livro. Um livro cujo tempo de reinicialização armazenado tenha passado nunca será cobrado.

#### Aplicação

O consumo de uma chave na dimensão percentual é a parte atribuída mais uma parcela da parte exterior. A parte externa utiliza primeiro a capacidade sem declarações de alocação (100 menos a soma dos pesos). Apenas o excesso é dividido entre as chaves por peso.

Este consumo é comparado com o quinhão da chave como para qualquer outra dimensão. O modo estrito inicia-se ainda quando o sinal de saturação atinge `QUOTA_SATURATION_THRESHOLD` (padrão 0,5). Cada número é dimensionado pelo limite efetivo: o limite por conta vezes o número de contas na pool.

Um limite absoluto com `capUnit: "percent"` conta apenas a parte atribuída à chave, dimensionada da mesma forma. Considere um limite por conta de 100 e k contas. Um limite de N é então atingido quando a parte da chave do valor da conta servidora atinge N/k pontos. Cada conta é verificada no seu próprio livro. Por exemplo, com duas contas, é atingido um limite de 10 em 5 pontos do valor de uma conta.

Quando a loja não pode ser lida, nada é atribuído e cada chave é cobrada 0 nessa dimensão. Quando a escrita de um livro falha, esta atribuição utiliza o livro tal como foi lido. Uma gravação de token com falha deixa os tokens desse pedido fora do livro. Nenhuma destas falhas bloqueia uma solicitação.

Num pool `consent`, a fórmula de empréstimo utiliza o consumo de cada chave na dimensão percentual como descrito acima. Quando outra chave é emprestada, o livro é lido uma vez e atribuído a cada chave. Sem um livro utilizável, cada chave é cobrada 0. Uma chave com peso passa então, e uma chave com peso 0 passa apenas quando outra chave é emprestada.

#### Percurso de uso

`GET /api/quota/pools/{id}/usage` reporta os mesmos números através da mesma função. Uma dimensão percentual tem uma entrada por ligação de pool em `accounts`. Os seus `consumedTotal` e `perKey` de nível superior refletem a primeira entrada.

A rota também aplica a leitura atual, para que possa avançar o livro de acordo com um pedido. `internal + external` pode diferir de `consumedTotal` quando não existe uma leitura utilizável ou quando não é aplicado um valor inferior.

#### Armazenamento e retenção

Ambas as lojas de quotas mantêm o livro. No SQLite, a limpeza automática da base de dados, quando ativada, remove as linhas não atualizadas durante 60 dias. No Redis, os livros e os contadores de uma ligação de pool partilham uma chave. Expira 60 dias após a última gravação do token ou alteração do livro. Um livro que não muda não é reescrito, pelo que o corte é definido acima da janela mais longa do plano. A reposição manual do histórico de utilização também limpa os registos do SQLite (consulte Limitações).

#### Limitações

- Todo o crescimento do valor da conta desde a linha de base é dividido pelos tokens que cada chave encaminhou desde então. Quando esse crescimento aconteceu não interessa.
- Portanto, a utilização feita fora OmniRoute é cobrada das chaves até ao limite permitido pelos seus tokens. Isto inclui a utilização feita antes do primeiro pedido de chave da janela, quando o livro já estava aberto.
- Por exemplo, o uso externo aumenta a conta em 60 pontos, embora não existam rotas principais. Uma chave encaminha então 30.000 tokens e o número chega a 60,6.
- Se o livro foi aberto antes dessa utilização, a parte da chave vale 30 pontos. Também transporta 7,65 de utilização no exterior, com quatro teclas de peso 25.
- Se o livro for aberto após esta utilização, os 60 pontos serão considerados básicos. A parte da chave é de 0,6 pontos e carrega 15 de utilização exterior.
- Um pedido ou visita à rota de utilização abre o livro. Portanto, se esta utilização conta como linha de base depende de quando o livro foi aberto.
- Com o piso padrão, uma chave que encaminha 60.000 tokens enquanto o uso externo aumenta a conta em 60 pontos recebe todos os 60 como a sua própria parte.
- Com o piso nos 50 mil, a sua parte é de 1,2 pontos. Os outros 58,8 são externos e cobrados a peso, como qualquer uso externo.
- Defina `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` próximo do custo de um ponto no seu plano. O uso externo inclui o tráfego na mesma conta proveniente de chaves fora da pool.
- Um limite percentual aplica-se a todos os modos. Uma chave limitada pode ser recusada enquanto a conta estiver muito abaixo do limite de saturação.
- Tome um limite de 10 e 12 pontos de utilização no exterior no início da janela. Uma chave que encaminha 20.000 tokens é então recusada com um valor de conta de 12,4%.
- A divisão é uma estimativa por volume de token. Um pedido conta como os seus tokens de prompt mais os seus tokens de conclusão. Os descontos em cache e os preços dos modelos não alteram esta contagem.
- Um pedido que não termine com o estado 200 não regista nenhum token. Os exemplos são um fluxo que o cliente desliga e um erro upstream após o consumo da utilização.
- A utilização causada por tal pedido é cobrada às chaves que registaram os tokens, até ao limite permitido pelos seus tokens. O resto é externo. Ele não recua. Uma resposta que não reporta a utilização de tokens também não regista tokens.
- A utilização de um pedido em curso pode aparecer na parte de outra chave ativa para todo o pedido. Retrocede apenas quando a solicitação termina com o estado 200.
- A utilização já existente na conta quando um livro é aberto conta como externo. Isto cobre uma atualização, um novo pool e uma nova conta. A utilização numa nova janela antes da sua primeira leitura também conta como externo.
- Cada chave começa com a sua quota de peso desse uso, após a capacidade sem reivindicações de alocação. Com uma conta a 85% e cinco chaves de peso 20, cada uma começa com 17 das 20 utilizadas.
- Numa pool com diversas contas, o valor da conta servidora é aplicado ao orçamento somado. Isso permanece inalterado no livro.
- Um valor inferior dentro de uma janela que o fornecedor reporta como aberta não é aplicado. Um tempo de reinicialização que recue mais de 30 minutos é tratado como uma leitura antiga.
- Em ambos os casos, o livro mantém o seu estado até que o tempo de reinicialização armazenado passe. Depois disso, o livro não é carregado até que uma leitura o transforme.
- A solução é a reposição manual do histórico de utilização (`POST /api/settings/purge-usage-history`). Limpa os livros de atribuição e os seus contadores de tokens na base de dados SQLite.
- O período `all` limpa todos os livros e contadores. Um período mais curto limpa primeiro os livros não escritos nele. Em seguida, limpa os contadores não gravados nele, mas apenas para uma ligação de pool que não tenha nenhum livro restante. Um livro guardado ainda marca cada chave no seu balcão.
- Um livro cuja figura não se tenha movido não é reescrito, pelo que um período mais curto também pode limpar o livro da janela atual. A leitura seguinte abre um novo livro com a figura atual.
- A reposição não afeta um armazenamento de quotas Redis. Aí, um livro termina com a sua janela ou expira 60 dias após a sua última gravação.
- Quando o fornecedor não envia qualquer tempo de reinicialização, uma janela que reinicia e recarrega acima do valor antigo entre duas leituras parece um valor mais elevado. O livro mantém a linha de base e as marcas antigas.
- As leituras são datadas pelo relógio local. Quando é adiantado em relação ao fornecedor, ou uma fonte reporta um tempo de reposição um pouco mais cedo, o livro pode chegar a essa diferença mais cedo.
- O crescimento neste curto período é dividido pelos tokens nele encaminhados. A primeira leitura da janela seguinte corrige isso. Quando o livro virado não contém tempo de reinicialização, esta correção necessita de um valor inferior, pelo menos dois minutos mais recente do que a última leitura aplicada.
- Instâncias que partilham leituras de data de armazenamento Redis com os seus próprios relógios, por isso mantenha estes relógios sincronizados. As leituras de uma instância cujo relógio está atrasado parecem mais antigas e são ignoradas.
- Quando nenhuma leitura utilizável chega após o tempo de reposição armazenado, as partilhas percentuais e os limites percentuais por chave não são aplicados até que uma leitura regresse. Sem tempo de reset, começa 15 minutos após a última leitura que alterou o livro.
- Na loja Redis, um livro ocioso durante 60 dias pode expirar entre o cheque do escritor e a sua emissão. Em seguida, é recriado numa revisão acima de 1, que é um estado válido.

---

## Resolvedor de planos

Implementado em `src/lib/quota/planResolver.ts`.

Precedência (da mais alta para a mais baixa):

1. **Substituição manual na BD** — tabela `provider_plans`, por `connectionId`.
2. **Catálogo conhecido** — `src/lib/quota/planRegistry.ts` (apenas dados).
3. **Plano vazio** — sem dimensões; é necessária configuração manual.

### Catálogo conhecido

| Fornecedor            | Dimensões                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, desconhecido), `tokens/weekly`          |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Sem predefinição — é necessária configuração manual           |

---

## Integração de pipeline

### gancho PRE (`open-sse/handlers/chatCore.ts`)

É executado antes do executor upstream, após verificações de autenticação e de política:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Falha aberta** : se `enforceQuotaShare` for lançado, o pedido será permitido com um registo `pino.warn`. Isto evita que um bug do mecanismo de quotas bloqueie todo o tráfego.

**Quando a capacidade regressar.** A recusa na participação da chave ou no teto da piscina termina com uma de duas sentenças, em ambas as modalidades de empréstimo:

- Janela `percent` : `. The <window> window resets at <time>.` A hora é a reposição dos relatórios do fornecedor.
- Unidade contável: `. Enough <window> usage is expected to clear by <time>.` O tempo é um limite superior da janela deslizante, se a chave não enviar mais nada.

`<time>` é um instante ISO 8601 em UTC. A recusa carrega então `Retry-After`: os segundos inteiros até esse instante, mais um. Um cliente que espera tanto tempo tenta novamente no máximo um segundo após o instante. Quando o instante não é conhecido, a recusa não traz sentença nem cabeçalho. Uma recusa absoluta do limite não acarreta nenhuma das duas coisas. O código público mantém-se `quota_share_blocked`.

Uma recusa de partilha não afeta a ligação partilhada. Não define nenhum arrefecimento, nenhum bloqueio de modelo e nenhuma falha no disjuntor do fornecedor, e as outras chaves da pool continuam a ser atendidas. Quando cada alvo de um combo recusa a chave da sua partilha, o combo responde 429 sem esperar. A sua resposta traz a dica `Retry-After`. O caminho embeddings termina a sua recusa com a mesma frase e não envia `Retry-After`.

### gancho POST (consumo recorde)

Após uma resposta bem-sucedida:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Nota de deriva** : se `consume` falhar após a resposta, o contador contínuo será subcontado. O sinal de saturação do fornecedor (por exemplo, `anthropic-ratelimit-unified-5h-utilization`) corrige a estimativa global no pedido seguinte.

### Penalização suave combinada (`open-sse/services/combo.ts`)

Quando `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

A penalização é aplicada após todos os outros fatores de pontuação. Reduz a probabilidade de combinação automática de selecionar uma chave saturada sem a bloquear.

---

## Passo a passo UI

### `/dashboard/costs/quota-share` — Página principal dos pools

Componentes (todos em `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componente             | Finalidade                                                                     |
| ---------------------- | ------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Cartão introdutório que explica a partilha de quotas para novos usuários       |
| `CreatePoolModal`      | Crie um novo pool de quotas (ligação + nome + alocações iniciais)              |
| `PoolCard`             | Resumo por pool: nome, ligação, contagem de alocações                          |
| `DimensionBar`         | Barra empilhada por dimensão: a participação de cada chave + utilização global |
| `AllocationTable`      | Tabela com consumo, fair share, deficit/surplus, sinalizador de empréstimo     |
| `BurnRateChart`        | gráfico de linhas de taxa de queima EMA (recharts preguiçosos via `dynamic()`) |
| `EditAllocationsModal` | Editar pesos, limites e políticas de alocação para um pool                     |
| `BorrowModeField`      | Seletor de modo de empréstimo (`saturation` ou `consent`) no assistente        |
| `LendingBadge`         | Selo de leitura apenas numa chave que empresta, apenas em pools `consent`      |

O crachá de empréstimo mostra a percentagem e, quando definido, o prazo em UTC com a zona nomeada. Julga o prazo no momento do instantâneo de utilização. Um prazo expirado ou ilegível é apresentado como `lending expired`.

Os ganchos da página:

- `usePools` — procura `GET /api/quota/pools` a cada 30 segundos.
- `usePoolUsage` — procura `GET /api/quota/pools/[id]/usage` sob demanda.
- `useLocalStoragePoolMigration` — é executado uma vez na montagem para migrar dados LS legados.

A etapa de chaves do assistente de pool possui uma caixa `Show usage by member to key holders`. Define a opção `memberBreakdown` do pool (consulte [Utilização de membros](#member-usage) ). Abaixo dele, o assistente avisa que alguém que saiba qual a chave utilizada pode combinar uma barra com essa chave. Com a caixa marcada, isto ocorre quando o passo lista menos de três ou mais de 20 teclas, uma vez que as barras permanecem ocultas. Conta as chaves na etapa e não consegue dizer quais delas podem fazer pedidos.

### Configuração do plano do fornecedor `/dashboard/costs/quota-share/plans` —

- `ProviderPlanConfigClient.tsx`: menu suspenso para selecionar um fornecedor, visualizar o plano resolvido (automático do catálogo ou substituição manual) e editar dimensões.
- As alterações são gravadas em `PUT /api/quota/plans/[connectionId]`.
- A eliminação reverte para catálogo ou plano vazio.

---

## Quota de self-service API (opt-in)

`GET /api/v1/me/quota/{provider}` (também servido em `/v1/me/quota/{provider}`) permite que um detentor de chave API leia, com a sua própria chave, quanto de uma assinatura partilhada é dele e o que o está a bloquear. A rota é uma casca fina sobre `src/server/selfService/quotaHandler.ts`; a visualização é construída por `src/lib/quota/selfView.ts` e o seu contrato de resposta é `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` em `docs/openapi.yaml`).

### Habilitação e autenticação

- Sinalizador de recursos `QUOTA_SELF_PANEL`, padrão `false`. Enquanto estiver desativado, um pedido que atinja a rota obtém 404. Com `REQUIRE_API_KEY=true`, a política API do cliente recusa uma chave em falta ou inválida com 401 antes da rota ser executada, qualquer que seja o sinalizador. Um pedido sem chave, mas com uma sessão de painel ligada, passa esta política e obtém a própria resposta da rota. O sinalizador é resolvido como qualquer outro sinalizador (substituição do painel ou REST e, em seguida, a variável de ambiente com o mesmo nome); ver [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- O nome de visualização de cada pool e o rótulo de cada agendamento são devolvidos aos detentores de chaves do pool exatamente como o administrador os escreveu. Antes de acender os sinalizadores, verifique se os mesmos estão aptos para serem lidos pelos porta-chaves.
- A chave é lida apenas nos cabeçalhos: `Authorization: Bearer <key>` ou `x-api-key: <key>`. Quando ambos são enviados, é utilizado o primeiro que valida. Uma chave na string de consulta ou um cookie é ignorado. A chave de ambiente do servidor foi recusada (401).
- A chave precisa do escopo `self:usage` (403 sem ele).
- O segmento do fornecedor é cortado, em letras minúsculas e verificado em relação ao `^[a-z0-9][a-z0-9._-]{0,63}$` (400 caso contrário) e depois resolvido através do registo do fornecedor, de modo a que um alias como `cc` leia os pools `claude`. `claude` e `anthropic` lêem os mesmos pools.

### O que mostra cada visibilidade

| Visibilidade         | Requer                                                                                | Campos                                                                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Própria participação | `self:usage`                                                                          | `pools[]` (ref, nome, fornecedor, política, peso, limite), `dimensions[].yourShare`, `accounts[]` com `yourShare` (numa janela `percent` sem `attributed` e `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                           |
| Nível da conta       | `self:usage` + `self:account-quota` e o fornecedor no `sharedQuotaProviders` da chave | adiciona `dimensions[].total`, `accounts[].dimensions[].account` e `accounts[].modelWindows`, `attributed` e `external` no `yourShare` de uma janela `percent` e `members` numa pool com utilização de membros ativada (consulte [Utilização de membros](#member-usage) ) |

- `sharedQuotaProviders` é uma configuração por chave (`PUT /api/keys/[id]/self-service`): `null`, o padrão, significa cada fornecedor que a chave atinge; `[]` significa nenhum. `accountVisible` de cada pool indica qual a visibilidade que se lhe aplica.
- As barras de contas e as janelas de modelo são mostradas apenas para as contas cuja ligação a chave pode utilizar. Quando a chave tem uma lista de ligações permitidas, uma conta fora dela mantém a sua entrada `Account N` sem `account` ou `modelWindows`. Uma lista vazia significa ausência de restrição, como acontece com `/v1/me/status`. O total do pool (`dimensions[].total`) não depende desta lista.
- Duas figuras mostradas apenas com `self:usage` provêm do uso de outras teclas. `exhausted` de um orçamento programado reflete o consumo de cada chave nesse cronograma. Num pool cujos pesos são todos nulos, o `weight` da chave é `100 / number of members`. Ambos são o que a aplicação se aplica à chave.
- Um pool é identificado apenas por `ref`, um valor opaco ligado à chave de chamada. O seu nome de utilizador (`name`) está incluído tal como o administrador o escreveu. Um `ref` é derivado da chave e do pool com o segredo da chave API do servidor (`API_KEY_SECRET`). Os clientes não devem persistir: isto muda se o segredo for alternado.
- As contas são listadas como `Account 1`, `Account 2`,… na ordem do pool. Não é devolvido qualquer ID de pool, ID de ligação, e-mail de conta ou nome de conta e a resposta passa pelo esquema do contrato, que descarta qualquer campo fora do mesmo.
- As unidades contáveis (`requests`, `tokens`, `usd`) são reportadas como o bucket do pool que o portão de quota impõe: `limit` = plan limit × contas no pool, `fairShare` = peso / 100 × `limit` (divisão igual quando cada peso é 0), `consumed` = o próprio contador da chave no armazenamento de quotas, `remaining` = `fairShare` − `consumed`, com piso em 0.
- `blocks.schedules` lista as janelas de agendamento da chave (`open`/`closed`, `blackout` ou `outside-window`, `retryAfterSeconds`, pisos de reserva e se o orçamento da janela foi gasto); `blocks.modelCaps` lista os seus limites horários por modelo com consumo.
- Uma chave fora de cada pool do fornecedor recebe 200 com `pools: []`; `availableModels` (os `qtSd/` ids que a chave vê em `/v1/models`), `expiresAt` e `apiBaseUrl` ainda estão preenchidos.
- `apiBaseUrl` é `OMNIROUTE_PUBLIC_API_BASE_URL`, logo `OMNIROUTE_PUBLIC_BASE_URL`, senão `null`. Nunca é a própria origem do pedido.

### `status` e `reason`

| `status`      | Significado                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Uma leitura atual.                                                                                                                                                                                                                                                                                                                                                                |
| `stale`       | Uma leitura de conta em cache marcada como obsoleta ou cujo tempo de reposição já passou desde que foi lida. Os números mantêm-se. Uma janela do modelo cujo tempo de reinicialização passou marca todo o grupo `modelWindows` `stale`. Para a partilha da própria chave de uma janela `percent` : o livro foi lido sem uma leitura de conta na cache do portão para o confirmar. |
| `unavailable` | Sem leitura; os números são `null`, nunca `0`. `reason` diz porquê.                                                                                                                                                                                                                                                                                                               |

| `reason`                          | Quando                                                                                                                                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | O armazenamento de quotas não pôde ser lido ou não pode ler livros de atribuição.                                                                         |
| `percent_attribution_unavailable` | A própria partilha da chave de uma janela `percent` : ainda não existe nenhum livro de atribuição para essa conta e janela, ou o livro não lista a chave. |
| `percent_window_ended`            | A própria parte da chave de uma janela `percent` : o livro pertence a uma janela de plano que terminou.                                                   |
| `account_not_used_by_key`         | A própria partilha da chave numa janela `percent` : a ligação da conta está fora das ligações permitidas da chave. O seu livro não é lido.                |
| `window_not_reported`             | A cache de limites do fornecedor não tem leitura para esta janela do plano.                                                                               |
| `connection_lookup_failed`        | Não foi possível ler a ligação da conta.                                                                                                                  |
| `not_supported`                   | OmniRoute não consegue ler os limites de utilização do fornecedor da conta.                                                                               |
| `fetch_failed`                    | Nenhuma leitura em cache foi utilizável e a atualização dos limites do fornecedor falhou.                                                                 |
| `not_available`                   | A leitura não tem janelas de utilização ou a conta não tem qualquer leitura.                                                                              |

Quando o armazenamento de quotas não pode ser lido, os campos armazenados de `blocks` ( `exhausted` de um orçamento de cronograma, `consumed` e `reached` de um limite de modelo) são também `null`.

### Consentimento de empréstimo

`PATCH /api/v1/me/quota/{provider}` regista o consentimento da própria chave de chamada para um pool. Utiliza o sinalizador, os cabeçalhos e as regras do fornecedor do `GET`. O âmbito `self:usage` autoriza esta escrita, embora o seu nome seja de leitura apenas.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` é o `ref` que o `GET` devolve a esse pool.
- `lendingPercent` é um número inteiro de 0 a 100. Um valor 0 limpa o consentimento e o seu prazo. Um corpo com `lendingPercent` 0 é aceite em qualquer um dos modos.
- `lendingUntil` é opcional: milissegundos de época ou `null` sem prazo. Deve estar no futuro e no máximo 864000000000000. Um valor abaixo de 100000000000 é lido como segundos e é recusado.
- Qualquer outro campo é recusado. Um corpo com mais de 4096 bytes é recusado. A leitura pára nesse tamanho, pelo que um corpo mais comprido nunca é mantido inteiro.

As verificações são executadas pela ordem desta tabela. Cada recusa utiliza o corpo do erro padrão com uma mensagem fixa. A recusa de um destes cheques não significa nada.

| Estatuto | Mensagem                                                                                           | Quando                                                                    |
| -------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 404      | `Not found`                                                                                        | A bandeira `QUOTA_SELF_PANEL` está desligada.                             |
| 401      | `Valid API key required`                                                                           | A chave está em falta ou é inválida ou é a chave de ambiente do servidor. |
| 403      | `API key lacks the self:usage scope`                                                               | A chave não tem `self:usage`.                                             |
| 400      | `Invalid provider`                                                                                 | O segmento do fornecedor é inválido.                                      |
| 429      | `Too many lending changes. Retry later.`                                                           | A chave ultrapassou o seu limite. A resposta carrega `Retry-After`.       |
| 400      | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | O corpo não é JSON, é demasiado comprido ou não corresponde ao esquema.   |
| 400      | `lendingUntil must be a Unix time in milliseconds`                                                 | O prazo é lido em segundos.                                               |
| 400      | `lendingUntil must be in the future`                                                               | O prazo é igual ou anterior à hora do pedido.                             |
| 404      | `Pool not found`                                                                                   | O `ref` não nomeia nenhum conjunto desta chave para este fornecedor.      |
| 403      | `Lending is not enabled for this pool`                                                             | O pool está no modo `saturation` e `lendingPercent` está acima de 0.      |
| 500      | `Failed to build quota view`                                                                       | Qualquer outra falha. A sua causa está registada no servidor.             |

O limite é de 20 pedidos a cada 60 segundos para cada chave. Cada pedido que passa na verificação do fornecedor conta, mesmo um recusado posteriormente ou que não altera nada. Possui contador próprio, para além do limite de taxa de requisição da chave.

Um pedido que altera o consentimento armazenado grava um registo de auditoria `quota.pool.lending.updated`. Nomeia a chave com os valores antigos e novos. O mesmo órgão enviado duas vezes, escreve uma vez e audita uma vez. A resposta é 200 com a visualização completa `GET`, construída após a gravação.

A visualização `GET` reporta os empréstimos da seguinte forma:

- Cada pool transporta `borrowMode` (`saturation` ou `consent`) e os próprios `lendingPercent` e `lendingUntil` da chave.
- `lendingActive` é `true` apenas num pool `consent`, com percentagem acima de 0 e prazo não atingido.
- Num pool `consent`, cada `dimensions[].yourShare` contável transporta `borrowAvailable`. É o que a chave poderá utilizar acima da sua prestação agora, emprestada pelas restantes chaves.
- `borrowAvailable` utiliza a fórmula da porta. Lê todas as outras chaves, mesmo enquanto a chave está sob a sua partilha. Para uma chave `hard` que é uma leitura extra por outra chave e dimensão contável, em paralelo.
- `borrowAvailable` é `null` para uma chave `soft` ou `burst` e `null` quando uma leitura falha.
- `borrowAvailable` é um valor para todas as outras chaves juntas. Num conjunto de duas chaves é a própria figura da outra chave.
- `borrowAvailable` ainda não foi reportado para janelas `percent` ou `accounts[]`.
- Numa pool `saturation` a visualização reporta o consentimento armazenado com `lendingActive: false` e sem `borrowAvailable`.

### Erros

Cada resposta desta rota, sucesso ou erro, carrega `Cache-Control: no-store`. Uma recusa que ocorre antes da rota ser executada não a carrega, por exemplo, o 401 da política API do cliente ou o 403 do filtro IP Os erros da rota utilizam o corpo do erro padrão com uma mensagem fixa: 400 (fornecedor inválido), 401 (chave em falta ou inválida), 403 (falta `self:usage`), 404 (sinalizador desativado) e 500 (`Failed to build quota view`). O 500 cobre qualquer falha quando o pedido chega à rota, incluindo a própria consulta de chaves; a sua causa é registada no servidor e nunca é devolvida. Os erros `PATCH` estão listados em [Consentimento de Empréstimo](#lending-consent).

### Limitações

- `remaining` é a parte do quinhão da chave que ela não utilizou. Não é uma garantia. Uma chave pode ainda ser servida para além dela enquanto a piscina tiver espaço. Quando o total do pool atinge `limit`, todas as chaves do pool são recusadas, qualquer que seja a sua própria `remaining`, e uma chave sem `self:account-quota` não consegue ver esse total.
- `remaining` não tem em conta o `cap` absoluto da alocação. A aplicação recusa a chave quando o seu próprio consumo numa janela da unidade do limite atinge o valor do limite.
- A barra ao nível da conta vem da cache de limites do fornecedor e pode atrasar a decisão de aplicação em alguns minutos. Uma leitura cujo tempo de reinicialização já passou é reportada como `stale`.
- As janelas por modelo (`modelWindows`) são reportadas apenas para os fornecedores que possuem um mapeamento de janela de plano: Claude e Codex hoje. Para outros fornecedores, `modelWindows` ainda está presente quando os dados da conta são mostrados, com uma lista `windows` vazia.
- A participação da própria chave numa janela `percent` é uma estimativa. Vem do livro de atribuição e carrega todas as limitações listadas em "Dimensões percentuais: atribuição por chave" acima.
- `consumed` é a aplicação do número em comparação com a parte justa. É `attributed` mais `external` exatamente. `attributed` é a parte que o livro fornece a chave para os tokens que ele encaminhou. `external` é a parte da chave da utilização da conta que as chaves da pool não consideram.
- Ambas as partes são enviadas apenas quando o `accountVisible` do pool é verdadeiro: a chave tem `self:account-quota` e o fornecedor está no seu `sharedQuotaProviders`. Uma chave sem ela fica `consumed` sozinha, com os mesmos `status` e `reason`.
- Com ambas as peças e com o seu próprio peso, um titular pode calcular a utilização feita fora da piscina que fica a cargo das chaves da piscina. Um titular com âmbito de conta já visualiza o total da conta.
- Uma chave que não tenha encaminhado nada na janela pode ainda ler a sua carga externa de `consumed`, porque a sua parte atribuída é então 0.
- Por exemplo, um livro abre a 0, com as teclas A e B a pesarem 50 cada. A chave A encaminha 900.000 tokens e a chave B 100.000. A conta atinge então 60% de um limite de 100. Assim, `attributed` é 54 para a chave A e 6 para a chave B, e `external` é 0 para ambas.
- A visão lê o livro e nunca escreve o seu estado. Não abre um livro e nunca pede uma leitura ao fornecedor. Com o Redis storage , uma leitura remove os campos de revisão substituídos em segundo plano, tal como fazem as leituras do portão.
- A partilha é `ok` apenas enquanto a cache do portão mantiver uma leitura da conta. Sem ele é `stale`, portanto, num pool sem pedido recente, aparece como possivelmente desatualizado.
- Até que um pedido passe pelo pool, a partilha estará indisponível. Este pedido abre o livro, e o valor da conta nesse momento conta como utilização feita fora da pool.
- Numa pool com várias contas, cada entrada de conta utiliza o próprio livro dessa conta e o limite de uma conta. A aplicação dimensiona ambos os lados pelo número de contas, de modo a que a proporção seja a mesma.
- As janelas por modelo não transportam qualquer partilha para a chave. O livro não guarda os dados por modelo.
- Os pisos de reserva de uma programação não são avaliados pela visualização: uma programação pode ser apresentada como `open` enquanto um pedido é recusado pelo motivo `schedule-reserve`.
- Quando dois conjuntos da mesma chave partilham uma ligação, a imposição aplica um deles e a visualização lista ambos.
- Não há limite por endereço para tentativas de chave com falha: por trás de um proxy inverso, os chamadores podem partilhar um endereço (depende se os endereços de clientes encaminhados são fiáveis), pelo que um bloqueio pode negar a rota a todos os detentores de chaves. Com `REQUIRE_API_KEY=true`, uma chave inválida é recusada pela política API do cliente antes da rota ser executada, com o corpo 401 dessa política em vez do desta rota.

### Uso de membros

Um administrador pode permitir que os detentores de chaves vejam como a utilização de uma janela é dividida entre os membros da pool. A opção é o `memberBreakdown` do pool, desativado por defeito. É definido no assistente de pool ou com `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` e `GET /api/quota/pools/{id}` reportam isso.

Uma dimensão da visão transporta `members` apenas quando todas elas são válidas:

- a opção da piscina está ativada
- a pool tem um máximo de 20 chaves alocadas, e pelo menos três delas podem fazer pedidos: ativa, não revogada, não banida e sem expiração
- o `accountVisible` do pool é verdadeiro: a chave tem `self:account-quota` e o fornecedor está no seu `sharedQuotaProviders`
- numa janela `percent`, a ligação da conta é aquela que a chave pode utilizar
- a partilha da própria chave dessa janela foi lida: o seu `status` não é `unavailable`

Caso contrário, `members` estará ausente. Nunca é uma lista vazia.

- Cada fatia é `{ slot, consumed, isYou }`. O esquema de resposta rejeita qualquer outra propriedade numa fatia e uma lista de mais de 20 fatias. As fatias são listadas por ordem de ranhura.
- Existe uma fatia por chave alocada, incluindo uma chave que já não pode fazer pedidos. Um membro sem utilização mostra um zero real.
- O slot 1 é sempre a chave que solicita, com `isYou` verdadeiro. Os outros números de slot são classificações de um hash codificado. É codificado com `API_KEY_SECRET` e cobre o pool, a chave do requerente e o membro.
- Portanto, os números não alinham entre os titulares. Para um titular, mantêm-se iguais entre as visitas. Podem mudar quando uma chave entra ou sai da piscina, ou quando esse segredo é rodado.
- Numa janela contável, uma fatia é o contador do membro no armazenamento de quotas, o mesmo contador que o seu próprio `consumed`.
- Numa janela `percent` uma fatia é a parte `attributed` do membro, do mesmo livro lido como a partilha da própria chave. O uso feito fora da piscina nunca é dividido em fatias. Esta carga é dividida por peso, pelo que as fatias que a transportam mostrariam os pesos.
- Cada visualização lê um valor por outro membro e janela contável, em paralelo. Numa janela `percent` as fatias não custam leitura para além da leitura do próprio livro da partilha. Quando um valor não pode ser lido, esta janela não tem `members` e a partilha da chave mantém-se.
- A opção e o número de chaves utilizáveis são lidos uma vez por pool e apenas para uma chave que pode ver os dados da conta. Uma falha na leitura da opção ou da contagem de chaves utilizáveis desativa as barras desse pool. O servidor regista um aviso e o resto da vista é construído.

As barras não contêm nomes nem identificações. Ainda contam ao detentor da chave coisas sobre os outros membros:

- Os detentores podem ainda igualar as fatias pelos seus valores.
- Uma numeração estável permite ao titular acompanhar um membro ao longo do tempo.
- O número de fatias mostra quantas chaves estão alocadas na pool.
- Num conjunto de três chaves, alguém que saiba qual a chave utilizada pode dizer qual foi a última chave utilizada.
- Quando um pool desce abaixo de três chaves utilizáveis, as barras desaparecem. As visualizações obtidas anteriormente ainda mostram o que cada membro usou.
- Numa janela contável, o total do pool menos as fatias pode mostrar a utilização de chaves que já não estão alocadas.
- Um membro que mostra zero numa conta e utilização noutra pode mostrar qual o membro que utiliza cada conta.
- Num conjunto contável com a política `hard`, uma fatia que pára de crescer na quota-parte justa de um membro indica o peso desse membro.

### Série de utilização (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (também servido em `/v1/me/usage`) devolve a utilização e o custo dos próprios pedidos da chave de chamada: totais, uma entrada por dia UTC, por dia e modelo, por modelo e por fornecedor. Partilha o sinalizador, as regras de autenticação, o âmbito `self:usage`, `Cache-Control: no-store` e o comportamento de erro da rota de quota acima. A chave é verificada antes de `range`. Os erros são 400 (`Invalid range`), 401, 403, 404 e 500 (`Failed to build usage`).

- `range` é um dos `1d`, `7d`, `30d` (o padrão) ou `90d`. Qualquer outro valor, um valor vazio ou um parâmetro repetido é 400. O conjunto pára em `90d` para limitar o custo de uma chamada. A visualização apenas lê o histórico de utilização em bruto, nunca os resumos diários, que não possuem chave.
- As linhas são selecionadas pelo ID da chave de chamada. A coluna do nome da chave nunca é correspondida e as linhas registadas sem um ID da chave nunca são contadas.
- A construção de uma série executa cinco consultas agrupadas nas linhas da chave na janela. A série construída é reutilizada durante 60 segundos por chave e intervalo, e uma chamada reutilizada não executa nenhuma. O seu `generatedAt` dá a sua idade.
- A janela termina quando a série é construída. Uma linha carimbada posteriormente, por exemplo, por inclinação do relógio, não é contabilizada.
- `coverage.retentionDays` é a configuração de retenção do histórico de utilização bruto do operador (`retention.usageHistory` nas definições da base de dados). `coverage.truncatedByRetention` é verdadeiro quando o intervalo solicitado é superior a esta configuração. Compara os dois números e não verifica se as linhas estão realmente em falta.
- O fornecedor é devolvido conforme registado para as próprias solicitações da chave. Model é o nome registado após o seu último `/` e as linhas são agrupadas por este. Um pedido de combinação cujo destino foi recusado é registado com o rótulo de encaminhamento como fornecedor (o nome do combo, `auto` ou `combo`) e a string do modelo que o cliente enviou. Outros pedidos recusados, por exemplo, por um disjuntor aberto, um arrefecimento de modelo ou um salto estacionado em quota, mantêm o fornecedor e o modelo de destino.
- Além das contagens e dos custos, a resposta traz latência média, taxas de sucesso e tempos da primeira e da última solicitação.
- `byModel` lista os 50 pares de fornecedor e modelo com mais pedidos. Com mais pares, as suas entradas não somam `summary` e `summary.uniqueModels` conta cada ortografia do modelo registada. `byModelTruncated` é então verdadeira, e um modelo cujos pares caem em ambos os lados do corte mostra totais parciais.
- Dois custos são reportados. `costUsd` é o custo faturado, como mostram as análises de utilização. Os fornecedores de subscrição de taxa fixa, como o plano Claude Code, contam aí 0 dólares. `listPriceUsd` é a mesma utilização com preço de tabela, assinaturas incluídas. Uma solicitação cujo modelo não tem linha de preço conta o seu custo armazenado: um custo reportado pelo fornecedor ou calculado quando a solicitação foi registada. Apenas um pedido sem qualquer conta 0, sem marcador, pelo que um total pode ser parcial.
- O contrato de resposta é `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` em `docs/openapi.yaml`).

### Página de self-service

Com `QUOTA_SELF_PANEL` activado, `/quota/{provider}` é uma página pública. Um detentor de chaves digita aí uma chave API e vê os conjuntos dessa chave para o fornecedor. Cada pool mostra um cartão por janela do pool, com a utilização do pool para todos e a parcela da própria chave. Cada conta da pool tem os seus próprios cartões, com utilização da conta e parcela da chave. A utilização da conta aparece apenas quando a chave consegue ver os dados da conta. A página lista também os limites por modelo de cada conta e a utilização da própria chave. Um aviso aparece quando um agendamento bloqueia a chave neste momento. Um cartão lista todos os limites da chave por modelo com a sua utilização e marca os alcançados. `{provider}` é um ID de fornecedor ou o seu alias (`/quota/claude`, `/quota/cc`). Um fornecedor desconhecido e cada caminho `/quota/*` enquanto o sinalizador estiver desativado, responda 404. Os pools num nó personalizado compatível com OpenAI ou Anthropic não têm página. O API ainda responde por eles.

A página não tem sessão. A chave é enviada apenas no cabeçalho `Authorization` de `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` e `GET /api/v1/me/usage`, nunca em URL. Uma chave que o servidor aceita é mantida no separador `sessionStorage`. Com "Lembrar neste dispositivo", é mantido em `localStorage` e "Esquecer chave" remove-o de ambos. Uma chave rejeitada pelo servidor é removida do armazenamento.

Um pool no modo `consent` mostra um cartão de empréstimo. Aí, o detentor da chave define uma percentagem inteira de 0 a 100 da parcela ociosa da chave para emprestar. O titular escolhe também quanto tempo dura o consentimento: até ser desligado, 1 hora, 8 horas, 24 horas, 7 dias ou 30 dias. A duração conta a partir do momento do salvamento. Enquanto estiver em vigor um prazo, o titular pode mantê-lo. Se este prazo passar antes de Guardar, o cartão não envia nada e pede outra escolha. Com 0% não é enviado qualquer prazo. O cartão mostra o prazo armazenado com o seu fuso horário nomeado. Um consentimento cujo prazo expirou é apresentado como terminado.

Para uma chave `hard` o cartão também lista, por janela de pool, que outras chaves emprestam para a chave no momento. Cada linha é um número para todas as outras chaves juntas. Num conjunto de duas chaves é a própria figura da outra chave. Um valor que a visualização não reporta é lido como não disponível, e não como zero. Para uma chave `soft` ou `burst` o cartão diz que não se aplica qualquer valor.

Um pool no modo `saturation` cuja chave armazena uma percentagem acima de 0 mostra apenas um levantamento. Diz que a percentagem armazenada não tem efeito aí. O seu botão Retirar envia 0 sem prazo. Um pool no modo `saturation` com 0 armazenado não mostra nenhum cartão de empréstimo. Depois de guardar, um cartão que a visualização devolvida já não necessita permanece com a sua mensagem até que a visualização da página mude novamente.

Nada é guardado até que o titular pressione Guardar ou Retirar. Cada pressão envia um pedido `PATCH /api/v1/me/quota/{provider}` e um segundo pressão não envia nada enquanto o primeiro estiver pendente. O corpo carrega o `ref` opaco do pool desde a visualização, a percentagem e o prazo. A resposta é a visualização de cota reconstruída e a página mostra-a sem uma segunda leitura. Quando dois salvamentos se sobrepõem, a página lê a quota uma vez após a última resposta. A página não guarda o consentimento no armazenamento do browser.

Uma alteração recusada é explicada no cartão por um texto escolhido no estado HTTP. O corpo do erro não é lido. Um 401 diz que a chave não foi aceite e recarrega a quota. Um 403 diz que o pool não está a aceitar alterações de empréstimos e um 404 diz que o pool acabou. Ambos oferecem um botão que recarrega a quota. Uma resposta 400 ou outra 4xx pede ao titular que verifique a percentagem e o prazo. A 429 pede ao titular que aguarde, com os segundos de `Retry-After` quando a resposta lhes der. Uma resposta 5xx, um 408 ou uma falha de rede indica que a alteração pode não ter sido guardada e mantém os valores introduzidos. Uma resposta fora do contrato recarrega a quota. Uma falha ao guardar não remove a chave por si só. Quando o recarregamento é recusado, a página remove a chave como em qualquer leitura recusada.

Depois de uma chave ser aceite, a página também mostra um cartão “Configure as suas ferramentas” com três separadores. "Claude Code" fornece o bloco `env` para `~/.claude/settings.json`. "Shell" fornece as mesmas variáveis que as linhas `export`. "Claude Desktop" fornece os valores para a sua janela de inferência de terceiros. Os modelos são os modelos de quota-partilha que a chave pode exigir para esse fornecedor. Quando esta lista não vem com a chave, o bloco ativa a descoberta do modelo de gateway. O endereço do gateway é a origem pública API que o servidor reporta (`OMNIROUTE_PUBLIC_API_BASE_URL` e depois `OMNIROUTE_PUBLIC_BASE_URL`). Quando nenhum dos dois estiver definido, o cartão mostrará um espaço reservado e instruirá o titular para o solicitar ao administrador. A chave é mostrada como um espaço reservado. "Incluir a minha chave" coloca toda a chave no texto no ecrã e no que um botão copiar copia. Isto dura até que a caixa seja limpa, a chave seja esquecida ou substituída, ou a página seja abandonada. O cartão não envia qualquer pedido e não oferece download de ficheiros.

Uma leitura das marcas API `stale` é mostrada como possivelmente desatualizada. Uma leitura que marca `unavailable` é mostrada com o seu motivo, nunca como zero.

Nos planos percentuais, a página desenha a partilha da própria chave quando o API a reporta. Diz que o número é uma estimativa e nomeia as suas duas partes. Os limites por modelo apenas mostram a conta.

Quando uma janela carrega `members`, o seu cartão mostra também uma barra com um segmento por membro, pela ordem dos slots. O segmento da chave requerente utiliza a cor de destaque. Os outros segmentos percorrem as cores do gráfico do tema. Uma legenda de texto lista cada segmento com o seu valor, pelo que nada depende da cor. Os segmentos estão rotulados como `You` ou `Member N`, onde N é o slot.

### Porta dedicada para a página

`QUOTA_PANEL_PORT` abre um segundo listener que serve apenas a página de self-service. Está desativado, a menos que a variável esteja definida. `QUOTA_PANEL_HOST` é o endereço de ligação e o predefinido é `127.0.0.1`.

O listener retransmite estes caminhos para a porta principal e responde 404 para todos os outros caminhos:

| Percurso                                                                 | Serve                                           |
| ------------------------------------------------------------------------ | ----------------------------------------------- |
| `/quota/{provider}`                                                      | A página                                        |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | A visualização de cota que a página lê          |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | A série de utilização que a página lê           |
| `/_next/static/`                                                         | Scripts, estilos e tipos de letra da construção |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ícones                                          |

`GET` e `HEAD` são retransmitidos sem corpo. É também retransmitido um pedido com um corpo: um `PATCH` do caminho de visualização da quota, que a página envia para guardar uma opção de empréstimo. Qualquer outro método responde 404, exceto um pedido CONNECT, cuja ligação é terminada sem resposta. Qualquer outro pedido que declare um corpo responde 404 e a sua ligação é terminada. Os pedidos de atualização são recusados e a sua ligação é encerrada. Um caminho com um segmento de ponto ou marcador de fragmento é recusado, como na porta API. O mesmo acontece com um alvo de pedido com um caractere fora do ASCII imprimível. Um caractere de controlo em bruto no destino é respondido 400 pelo analisador HTTP, antes da própria verificação desta porta. Os cabeçalhos de pedido que a estrutura reserva para uso próprio não são retransmitidos: nomes que começam por `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` ou `x-next-`, e os nomes `x-matched-path` e `next-resume`. A solicitação é retransmitida sem eles. O dashboard, a página de login, o API de gestão e as rotas de inferência não podem ser acedidos por esta porta.

O `PATCH` deve carregar `Content-Type: application/json`, sem parâmetro ou apenas com `charset=utf-8`. Deve conter um `Content-Length` de 1 a 4096, escrito como dígitos simples, e nenhum `Transfer-Encoding`. Um `PATCH` que quebre uma destas regras responde 404. Alguns comprimentos malformados, como um assinado ou repetido, são respondidos 400 pelo analisador HTTP antes da própria verificação desta porta. A porta lê os bytes declarados antes de entrar em contacto com a porta principal e espera no máximo 5 segundos por eles. Um corpo que ainda não está completo responde 404 e a sua ligação é terminada. Nada chega à porta principal neste caso, ou quando o cliente sai primeiro. A porta retransmite exactamente os bytes declarados, com o mesmo `Content-Length`. Os bytes após eles são lidos como o próximo pedido na ligação. Um proxy reverso TLS à frente deve encaminhar `Content-Length` e não deve agrupar novamente o corpo do pedido. A porta principal verifica a chave API no cabeçalho `Authorization`, tal como para `GET`.

O corpo 404 é `{"error":"not_found","message":"Not found."}`. Um relé com falha responde 502 (`api_bridge_unavailable`) ou 504 (`api_bridge_timeout`) sem campo `detail`.

O ouvinte não lê `QUOTA_SELF_PANEL` e não liga a página. Enquanto o sinalizador estiver desativado, a página e o seu API respondem 404 na porta principal e o listener retransmite essa resposta.

No servidor de desenvolvimento (`next dev`), a página não se torna interactiva através desta porta. O socket de recarga a quente de desenvolvimento é um pedido de atualização e a porta recusa-a. Utilize a porta principal durante o desenvolvimento.

A porta serve HTTP simples e a página envia chaves API. Mantenha o endereço de ligação padrão e coloque um proxy reverso com TLS à sua frente. Um endereço de ligação diferente de loopback regista este aviso:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Um ponto de loopback que não envia qualquer cabeçalho de encaminhamento conta como local na porta principal. Assim, um proxy no mesmo host deve enviar `X-Forwarded-For`. Um proxy num endereço privado só é fiável para esse cabeçalho com `OMNIROUTE_TRUST_PROXY=private` (ou `lan`). Qualquer outro ponto é reportado pelo endereço da sua ligação e os cabeçalhos de encaminhamento enviados são descartados.

O ouvinte mantém no máximo 256 ligações de cada vez. Um cliente tem 10 segundos para enviar os cabeçalhos do pedido e 30 segundos para enviar todo o pedido. Uma ligação inativa mantida ativa é fechada após cerca de 5 segundos. Uma ligação sem atividade durante 60 segundos é terminada. Estes valores são fixos. Defina limites de ligação e taxa no proxy reverso também. Um proxy reverso na frente deve manter as suas ligações upstream ociosas durante menos de 5 segundos ou não as reutilizar. A retransmissão para a porta principal utiliza os tempos limite upstream da porta API (`API_BRIDGE_*`).

O listener também inicia quando `API_PORT` não está definido. `QUOTA_PANEL_PORT` deve ser uma porta de 1 a 65535, escrita apenas em dígitos. Deve ser diferente da porta do painel e da porta API. Enquanto o servidor WebSocket ativo estiver ativado, também deverá ser diferente do `LIVE_WS_PORT` (padrão 20132). Qualquer outro valor não abre nada e regista um aviso. Um aviso sobre um valor recusado nomeia a variável e não repete o valor. Uma porta que já está a ser utilizada não abre nada e regista este aviso:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Com `OMNIROUTE_BASE_PATH` definido, o listener espera todos os caminhos acima desse prefixo. Utilize o mesmo `OMNIROUTE_BASE_PATH` em tempo de construção e em tempo de execução. Escreva-o com uma barra inicial e sem barra final, por exemplo `/omniroute`. Outra forma, incluindo `/` e `/omniroute/`, deixa a porta desativada com um aviso, embora a compilação aceite estas formas. O mesmo acontece com um caminho base cujo primeiro segmento nomeia uma rota de aplicação: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` ou `connect`, em qualquer caso.

Limitações:

- `/quota/{provider}/` com uma barra final responde 404 nesta porta.
- O service worker e o manifesto da aplicação web não são servidos nesta porta.
- Um favicon personalizado definido no painel não é mostrado nesta porta.
- Os ícones não são mostrados quando a aplicação é executada num caminho base.
- O porto fala HTTP/1.1. simples
- Uma ligação que falhe não é tentada novamente até que o processo seja reiniciado.
- O listener não tem limite de ligação ou taxa por endereço de cliente.
- As configurações do contentor não são abordadas nesta secção.

---

## Variáveis de ambiente

| Variável                             | Predefinição   | Descrição                                                                            |
| ------------------------------------ | -------------- | ------------------------------------------------------------------------------------ |
| `QUOTA_STORE_DRIVER`                 | `sqlite`       | Driver a utilizar: `sqlite` ou `redis`                                               |
| `QUOTA_STORE_REDIS_URL`              | _(vazio)_      | Redis URL, por exemplo, `redis://localhost:6379`                                     |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`          | 0..1; `>= threshold` ativa o modo estrito                                            |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`         | Tokens que explicam no máximo um ponto de uma janela de plano percentual             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`          | 0..1; multiplicador para pontuação combinada de políticas suaves                     |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`           | Dias antes de GC remover os buckets `quota_consumption` antigos                      |
| `QUOTA_PANEL_PORT`                   | _(desativado)_ | Porta dedicada para a página de self-service. Não definido significa nenhum ouvinte. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`    | Endereço de ligação para essa porta                                                  |

As definições DB (`quotaStore.*`) substituem as env vars.

---

## Resolução de Problemas

### Redis configurado, mas sem estabelecer ligação

Verifique se `ioredis` está instalado (`npm ls ioredis`) e se `QUOTA_STORE_REDIS_URL`
está acessível. Em caso de falha de ligação, a fábrica recorre ao SQLite (registado
ao nível `warn`).

### `peek` devolve dados desatualizados / modo de falha aberta

Se `peek` lançar uma exceção, `enforceQuotaShare` interpreta o resultado como "permitir" (falha aberta).
Consulte os registos do `pino` para as entradas `quota:enforce` e `quota:factory`, a fim de identificar
a causa raiz.

### Desvio do contador de consumo

Se a utilização real do fornecedor diferir dos contadores, isso é esperado — a
janela deslizante de 2 buckets apresenta um erro de ~1% nos limites da janela, e `consume` é
executado sem aguardar resposta após a resposta. O sinal de saturação (`saturationSignals.ts`)
lê a utilização real do fornecedor com um TTL de 30 s e ajusta `globalUsedPercent`
em conformidade.

### O grupo apresenta "sem dados" para a taxa de consumo

`computeBurnRate` requer, pelo menos, 2 amostras históricas. Os novos grupos sem chamadas
`consume` anteriores apresentam `tokensPerSecond: 0` e `timeToExhaustionMs: null`.

---

## Migração a partir de localStorage

Quando `/dashboard/costs/quota-share` é carregado pela primeira vez, o hook `useLocalStoragePoolMigration`
verifica:

1. `localStorage.getItem("omniroute:quota-share:pools")` não está vazio.
2. `GET /api/quota/pools` devolve `[]` (a BD está vazia).

Se ambas as condições forem verdadeiras, envia cada pool legado em lote para `POST /api/quota/pools`
e, em seguida, remove a chave de localStorage. A migração é idempotente: a condição 2 impede
uma nova migração.

---

## Classificação da Estratégia Interna

`quota-share` é uma estratégia de encaminhamento **exclusivamente interna** (`INTERNAL_ROUTING_STRATEGY_VALUES` em
`src/shared/constants/routingStrategies.ts`). É utilizada exclusivamente por combinações de pools
`qtSd/` geradas pelo sistema e é deliberadamente excluída de `ROUTING_STRATEGY_VALUES`, para que nunca
apareça como uma opção selecionável pelo utilizador na IU ou na API.

---

## Cobertura de teste

Duas camadas de cobertura automatizada são fornecidas com o mecanismo de cota partilhada:

| Suíte                | Comando                                                                | O que cobre                                                                                                                                                                                                            |
| :------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unidade (29 testes)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | agendador DRR, controlo de saturação, limites de concorrência, matemática fairShare, fila de pendências                                                                                                                |
| Matriz de integração | `npm run test:combo:matrix`                                            | Decisão de encaminhamento ponta a ponta através do pipeline combinado real; DRR justiça + despriorização da saturação via costuras vivas (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

A matriz de integração funciona em CI juntamente com todas as 22 estratégias públicas. O conjunto de unidades pode ser executado de forma independente.

---

## Resumo do esquema DB

Três tabelas adicionadas pelas migrações `078`, `079` e `085`:

- `quota_pools` + `quota_allocations` — definições de pool e alocações por chave.
- `quota_consumption` — a rolar contadores de 2 baldes por `(apiKeyId, dimensionKey)`.
- Substituições manuais do plano do fornecedor `provider_plans` — (dimensões JSON por connectionId).

Todas as tabelas adicionadas através de migrações `CREATE TABLE IF NOT EXISTS` idempotentes.

O empréstimo consentido acrescenta três colunas: `quota_allocations.lending_percent` (número inteiro, padrão 0), `quota_allocations.lending_until` (época milissegundos ou `NULL` para sem prazo) e `quota_pools.borrow_mode` (padrão `saturation`). A sua migração apenas adiciona essas colunas e não grava nenhuma linha existente.

O livro de atribuição percentual adiciona `quota_percent_ledger` (uma linha por pool, conta e janela de plano) e `quota_percent_ledger_tokens` (um contador de tokens por pool, conta e chave API ). `src/lib/db/quotaPercentLedger.ts` lê-os e grava-os.
