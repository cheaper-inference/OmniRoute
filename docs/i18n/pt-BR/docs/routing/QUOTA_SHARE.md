# Quota Sharing Engine (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Referência do documento**: `docs/routing/QUOTA_SHARE.md`
> Parte do Grupo B (planos 16 + 22).

---

## Visão geral

O Mecanismo de Compartilhamento de Cota distribui de forma justa a cota baseada em tempo de um provedor (por exemplo, janela de 5 horas do Codex, 1500 req/h do Kimi) entre várias chaves de API que compartilham a mesma conexão.

**Problema que ele resolve:** o OmniRoute encaminha muitas chaves de API para a mesma conta de provedor upstream. Sem uma lógica de compartilhamento, uma rajada da chave A pode esgotar a cota do provedor durante aquela hora, deixando as chaves B e C bloqueadas até que a janela seja redefinida. O mecanismo evita isso:

1. Rastreando o consumo contínuo de cada chave por dimensão (%, requisições, tokens, $).
2. Aplicando um algoritmo de compartilhamento justo com conservação de trabalho: uma chave pode tomar emprestadas cotas ociosas enquanto o pool global não estiver saturado.
3. Aplicando o resultado no caminho crítico (`chatCore.ts`) antes que a requisição chegue ao executor upstream.

---

## Algoritmo: Conservação de Trabalho com Compartilhamento Justo

Implementado em `src/lib/quota/fairShare.ts`.

### Modos

| Doença                                     | Modo         | Comportamento                                                    |
| ------------------------------------------ | ------------ | ---------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generoso** | A Key pode emprestar até o limite global menos o total consumido |
| `globalUsedPercent >= saturationThreshold` | **Estrito**  | Aplicar estritamente a partilha justa individual                 |

`saturationThreshold = 0.5` padrão (env `QUOTA_SATURATION_THRESHOLD`).

Esses dois modos descrevem um pool no modo de empréstimo padrão, `saturation`. Um pool no modo `consent` sempre aplica regras estritas, qualquer que seja a saturação. Consulte [Empréstimos consentidos (opção por pool)](#consented-lending-per-pool-opt-in).

### Decisão por dimensão

Para cada dimensão ativa no pool, o mecanismo calcula:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Para dimensões `percent`, `consumed` vem do livro de atribuição (consulte [Dimensões percentuais: atribuição por chave](#percent-dimensions-per-key-attribution) ).

Então:

- **`policy = hard`** : se `consumed > fairShareAllowed` e modo forem estritamente →** bloquear** .
- **`policy = soft`** : se `consumed > fairShareAllowed` e modo forem estritamente →** penalizar** (despriorizar no combo; nunca bloquear).
- **`policy = burst`** : permitir enquanto existir espaço global, independentemente do quinhão.

### Boné absoluto

`capValue` + `capUnit` em uma alocação é um limite rígido independente do modo ou da política. Qualquer dimensão onde `consumed >= capValue` sempre** blocos** o pedido. Para um limite `percent`, `consumed` é apenas a parte atribuída à chave.

### Verificação multidimensional

Uma solicitação é bloqueada se** qualquer** dimensão no pool iria bloqueá-lo. As dimensões são independentes — uma exaustão de 5h% não afeta a dimensão semanal.

### Empréstimo

No modo generoso, uma chave cuja alocação é subconsumida pode utilizar o excedente das cotas não alocadas de outras chaves. A fórmula é:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

onde `consumedByOtherKeys = consumedTotal - consumedByThisKey`. O teto global (pool `limit` para essa dimensão) é sempre o teto rígido.

### Empréstimo consentido (opção por pool)

Cada pool possui um modo de empréstimo. `saturation` é o padrão e mantém as regras acima. No modo `consent` uma chave `hard` passa sua parte apenas dentro da capacidade que outras chaves concordaram em emprestar. O administrador define o modo de cada pool. Cada titular da chave define seu próprio consentimento por meio do [Consentimento de empréstimo](#lending-consent).

Um consentimento é uma porcentagem de 0 a 100 e um prazo opcional em milissegundos de época. A chave empresta essa porcentagem de sua parcela ociosa enquanto o prazo está no futuro.

Para uma dimensão, `L` é o limite efetivo: o limite do plano multiplicado pelas contas no pool. A porta calcula, para a chave solicitante:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` é o peso da chave, ou `100 / n` para cada chave quando nenhum peso estiver acima de 0. `lend_k` é a porcentagem ativa da chave e 0 quando o prazo expirar. O próprio consentimento da chave solicitante nunca conta. Uma chave `hard` é recusada quando seu consumo atinge sua parcela mais `borrowAvailable`.

Capacidade que nenhuma alocação reivindica (100 menos a soma dos pesos) não é emprestável. Nenhuma chave concordou em emprestá-lo.

**Exemplo.** `L` é 1000.

| Chave | Peso | Compartilhar | Consumido | Empresta |
| ----- | ---- | ------------ | --------- | -------- |
| UM    | 50   | 500          | 530       | 0%       |
| B     | 30   | 300          | 100       | 50%      |
| C     | 0    | 0            | 60        | 0%       |

- B empresta 50% de seus 200 ociosos, que é 100. C já pegou 60 acima de sua parcela. A pode pegar emprestado 40.
- A é servido a 530 e recusado quando o seu consumo atinge 540.
- Antes de C usar qualquer coisa, com A igual ou inferior à sua parte, C poderia pedir emprestado 100.
- Antes de C usar qualquer coisa, com A em 530, C poderia emprestar 70.

**Peso zero.** Uma chave com peso 0 tem participação 0. Ela é atendida apenas enquanto seu consumo estiver abaixo do que outras emprestam. Quando ninguém empresta, é recusado desde o primeiro pedido.

**Prazos.** Nenhuma tarefa em segundo plano expira um consentimento. Cada solicitação compara o prazo com seu próprio horário, e um prazo igual a esse horário já passou. Um prazo armazenado que não seja um número finito, ou que já tenha passado da maior data que um `Date` pode conter, conta como passado.

**`soft` e `burst`.** Os empréstimos não os limitam. Uma chave `soft` perde a prioridade depois de ultrapassar seu compartilhamento. Uma chave `burst` passa enquanto a piscina tem espaço. O teto da piscina ainda recusa todas as chaves quando o total da piscina atinge o seu limite.

**Custo no caminho da solicitação.** Um pool `saturation` não lê nada mais do que antes. Em um pool `consent`, uma dimensão contável lê as outras chaves apenas para uma chave `hard` igual ou superior à sua parcela, enquanto outra chave empresta. Em seguida, faz uma leitura por outra chave, em paralelo. Uma leitura com falha conta como um consumo de 0 para essa chave. Uma dimensão `percent` não adiciona nenhuma leitura, porque o livro de atribuição contém todas as chaves.

**Editando um pool.** Uma edição mantém o consentimento das chaves que permanecem. Isso vale para edições de alocação, substituições em todo o grupo e chamadas `ensure`. Uma chave removida perde seu consentimento e uma chave adicionada novamente começa em 0. As rotas administrativas retornam o consentimento de cada chave e nunca o gravam. Mudar um pool de volta para `saturation` mantém todos os consentimentos armazenados, o que não tem efeito nesse modo. Mudar o pool para `consent` novamente reativa os consentimentos armazenados cujo prazo não expirou. Um detentor de chave pode limpar um consentimento armazenado em qualquer modo.

**Atualizando.** Se as colunas `lending_percent` e `lending_until` já existirem, a migração adicionará apenas `borrow_mode` e as porcentagens armazenadas permanecerão como estão. Cada pool inicia no modo `saturation`. Ative `consent` por pool no assistente de pool. Nada é inferido dos valores armazenados.

**Limitações.**

- Um credor pode encontrar o pool em seu teto antes de usar sua própria parcela. A capacidade emprestada por outros conta para o total do pool.
- A verificação é executada antes da solicitação e não reserva nada. As solicitações simultâneas leem o consumo antes que qualquer uma seja registrada, portanto, a capacidade emprestada pode ser gasta mais de uma vez, limitada pelas solicitações em andamento. A verificação de compartilhamento do modo `saturation` tem a mesma propriedade.

---

## Contador de janela deslizante

Implementado em `src/lib/quota/sqliteQuotaStore.ts` e `redisQuotaStore.ts`.

Dois buckets por `(apiKeyId, dimensionKey)`:

- `curr`: bucket atual (`floor(nowMs / windowMs)`)
- `prev`: bucket anterior (`curr - 1`)

Valor contínuo efetivo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precisão**: ~99% de precisão. O erro é de, no máximo, 1% do tamanho da janela no limite entre buckets (inerente à aproximação de 2 buckets).

### Concorrência

Driver SQLite: um mutex em memória por chave `(apiKeyId | dimensionKey)` evita a condição de corrida de leitura-modificação-gravação. O padrão espelha a prevenção de thundering herd de `src/sse/services/auth.ts`.

Driver Redis: script Lua EVAL para incremento atômico — executado como um único comando do Redis.

---

## Drivers

### SQLite (padrão, sem instalação)

- Tabela: `quota_consumption` (consulte as migrações `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Ideal para implantações de instância única.
- Toda a persistência fica no banco de dados SQLite existente do OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (opcional, múltiplas instâncias)

- Requer o pacote npm `ioredis`.
- Os contadores são armazenados no Redis; os metadados (pools/alocações) permanecem no SQLite.
- Ideal para implantações com múltiplas réplicas nas quais os contadores precisam ser compartilhados.

### Alternância de drivers

Por meio da interface de configurações (`/dashboard/settings` → Armazenamento de Cotas) ou de variáveis de ambiente:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

A configuração do banco de dados tem precedência sobre as variáveis de ambiente. Se `driver=redis`, mas a URL estiver ausente ou
`ioredis` não estiver instalado, a fábrica volta a usar SQLite e registra um aviso.

Ordem de seleção do driver:

1. Configuração do banco de dados `quotaStore.driver`
2. Variável de ambiente `QUOTA_STORE_DRIVER`
3. Padrão: `sqlite`

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

Um plano percentual informa um valor de uso por conta e janela do plano. O provedor não fornece contador por chave API.

Para dividir esse valor entre chaves, cada pool mantém um livro de atribuição por conta e janela de plano. `src/lib/quota/percentLedger.ts` contém as regras do livro. `src/lib/quota/percentAttribution.ts` transforma o livro nos números que a fiscalização usa. O resultado é uma estimativa construída a partir dos tokens que cada rota principal.

#### Leituras que movem o livro

O livro avança apenas no valor do próprio provedor para a janela do plano solicitado. Essas conexões relatam uma:

| Provedor                             | Planejar janelas |
| ------------------------------------ | ---------------- |
| Claude, através de uma conexão OAuth | `5h`, `weekly`   |
| Codex                                | `5h`, `weekly`   |

Não contam como leitura:

- uma resposta que o cliente provedor marca como obsoleta
- uma janela Claude cuja porcentagem o provedor não informou
- a figura de outra janela, ou o pior caso entre janelas
- o substituto do cabeçalho de limite de taxa
- uma leitura falhada

Outros provedores, incluindo Claude com chave API, não possuem livro. Cada chave é cobrada 0 em suas dimensões percentuais, como antes dessa alteração.

Uma leitura compartilha o cache de 30 segundos do sinal de saturação. Uma leitura Claude é datada pelo momento em que o valor foi observado nos cabeçalhos de resposta ou lido no endpoint de uso, quando esse horário for conhecido. Outras leituras são datadas de quando a entrada do cache foi criada.

#### O que o livro guarda

Cada solicitação registrada adiciona seus tokens, uma vez, a um contador por pool, conta e chave. Um contador só cresce. O livro guarda três coisas:

- a linha de base: a figura quando o livro foi aberto ou a janela foi virada pela última vez
- a última figura aplicada
- por chave, seu contador de tokens naquele mesmo momento, chamado de marca

O livro é atualizado quando a aplicação ou a rota de uso calcula a atribuição. As gravações são comparadas e definidas em um número de revisão. Um escritor que perde tenta novamente uma vez em uma nova leitura.

#### Como a parte de uma chave é calculada

A parte de cada chave é computada quando o livro é lido. O crescimento da figura desde a linha de base é dividido entre as chaves proporcionalmente aos tokens que cada uma roteou desde sua marca.

Together, esses tokens explicam no máximo um ponto do valor por tokens `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (padrão 1.000). O crescimento que eles não explicam é externo. A linha de base também é externa.

Por exemplo, um livro abre em 0. A chave A roteia 900.000 tokens e a chave B roteia 100.000. Com um valor de 60, a parte de A tem 54 pontos e a parte de B tem 6.

Um contador abaixo da marca da sua chave foi reiniciado e conta por completo. Uma chave sem marca, como uma chave que se junta ao pool no meio de uma janela, conta todos os seus tokens. Um número atrasado em relação aos tokens causa um erro que desaparece na próxima leitura. Não acumula.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` é lido em todas as atribuições. Um valor que não é um número finito de pelo menos 1 volta para 1.000.

#### Como uma leitura muda o livro

A primeira regra de correspondência se aplica:

1. **Nenhum livro ainda:** a leitura abre o livro. Sua figura é a linha de base e cada contador está marcado.
2. **Leitura mais antiga:** uma leitura datada antes da última aplicada é ignorada. O mesmo ocorre com uma leitura cujo tempo de reinicialização seja mais de 30 minutos anterior ao armazenado.
3. **Janela do novo provedor:** um tempo de reinicialização mais de 30 minutos depois do armazenado vira o livro. A figura se torna a linha de base e cada contador é marcado novamente. Chaves sem contador saem do livro.
4. **Janela finalizada:** um tempo de redefinição armazenado que não seja posterior ao horário dos dados de leitura significa que a janela terminou. A leitura vira o livro, seja qual for a sua figura.
5. **Figura mais alta:** apenas a última figura se move. A linha de base e as marcas permanecem.
6. **Mesma figura:** a figura, a linha de base e as marcas permanecem. Apenas um tempo de reinicialização que falta ao livro é escrito.
7. **Figura inferior:** um valor inferior nunca é aplicado como tal. O livro só vira quando três coisas se sustentam. É pelo menos dois minutos mais recente que a última leitura aplicada. Nada diz que a janela é a mesma aberta. Está mais de um ponto abaixo.

A janela conta como a mesma aberta quando três coisas são mantidas. Ambos os tempos de reinicialização são conhecidos. Eles estão a 30 minutos um do outro. O armazenado ainda está à frente da leitura. Um número menor dentro dessa janela não muda nada.

Um tempo de reinicialização é armazenado apenas enquanto estiver à frente do tempo de dados da leitura que o transporta. Um valor mais alto armazena o tempo de redefinição de sua leitura quando aquela é utilizável, e mantém o armazenado caso contrário. Uma figura igual registra o tempo de reinicialização de sua leitura apenas quando o livro não possui nenhum. Não muda mais nada. Um valor inferior que não gira o livro registra nenhum tempo de reinicialização.

#### Quando o livro é usado

Após uma leitura, o livro é usado, a menos que o tempo de reinicialização armazenado não seja posterior ao horário atual. Esse caso surge quando uma leitura feita pouco antes do reset, como aquela veiculada no cache, é observada logo após o mesmo.

Sem uma leitura utilizável, o livro armazenado será usado apenas enquanto ainda puder ser o livro da janela atual. Isso vale em dois casos:

- seu tempo de reinicialização é conhecido e ainda está por vir
- não tem tempo de reinicialização e a última leitura que o alterou tem no máximo 15 minutos

Caso contrário, nada é atribuído, como quando não há livro. Um livro cujo tempo de reinicialização armazenado tenha passado nunca será cobrado.

#### Aplicação

O consumo de uma chave na dimensão percentual é a parte atribuída mais uma parcela da parte externa. A parte externa utiliza primeiro a capacidade sem declarações de alocação (100 menos a soma dos pesos). Apenas o excesso é dividido entre as chaves por peso.

Esse consumo é comparado com o quinhão da chave como para qualquer outra dimensão. O modo estrito ainda inicia quando o sinal de saturação atinge `QUOTA_SATURATION_THRESHOLD` (padrão 0,5). Cada número é dimensionado pelo limite efetivo: o limite por conta vezes o número de contas no pool.

Um limite absoluto com `capUnit: "percent"` conta apenas a parte atribuída à chave, dimensionada da mesma forma. Considere um limite por conta de 100 e k contas. Um limite de N é então alcançado quando a parte da chave do valor da conta servidora atinge N/k pontos. Cada conta é verificada em seu próprio livro. Por exemplo, com duas contas, um limite de 10 é alcançado em 5 pontos do valor de uma conta.

Quando a loja não pode ser lida, nada é atribuído e cada chave é cobrada 0 nessa dimensão. Quando a escrita de um livro falha, essa atribuição usa o livro tal como foi lido. Uma gravação de token com falha deixa os tokens dessa solicitação fora do livro. Nenhuma dessas falhas bloqueia uma solicitação.

Em um pool `consent`, a fórmula de empréstimo usa o consumo de cada chave na dimensão percentual conforme descrito acima. Quando outra chave é emprestada, o livro é lido uma vez e atribuído a cada chave. Sem um livro utilizável, cada chave é cobrada 0. Uma chave com peso então passa, e uma chave com peso 0 passa apenas quando outra chave é emprestada.

#### Rota de uso

`GET /api/quota/pools/{id}/usage` relata os mesmos números por meio da mesma função. Uma dimensão percentual possui uma entrada por conexão de pool em `accounts`. Seus `consumedTotal` e `perKey` de nível superior refletem a primeira entrada.

A rota também aplica a leitura atual, para que possa avançar o livro conforme uma solicitação. `internal + external` pode diferir de `consumedTotal` quando não há leitura utilizável ou quando um valor inferior não é aplicado.

#### Armazenamento e retenção

Ambas as lojas de cotas mantêm o livro. No SQLite, a limpeza automática do banco de dados, quando habilitada, remove linhas não atualizadas por 60 dias. No Redis, os livros e contadores de uma conexão de pool compartilham uma chave. Ele expira 60 dias após a última gravação do token ou alteração do livro. Um livro que não muda não é reescrito, portanto o corte é definido acima da janela mais longa do plano. A redefinição manual do histórico de uso também limpa os registros do SQLite (consulte Limitações).

#### Limitações

- Todo o crescimento do valor da conta desde a linha de base é dividido pelos tokens que cada chave roteou desde então. Quando esse crescimento aconteceu não importa.
- Portanto, o uso feito fora OmniRoute é cobrado das chaves até o limite permitido por seus tokens. Isso inclui o uso feito antes da primeira solicitação de chave da janela, quando o livro já estava aberto.
- Por exemplo, o uso externo aumenta a conta em 60 pontos, embora não haja rotas principais. Uma chave então roteia 30.000 tokens e o número chega a 60,6.
- Se o livro foi aberto antes desse uso, a parte da chave vale 30 pontos. Também carrega 7,65 de uso externo, com quatro teclas de peso 25.
- Se o livro for aberto após esse uso, os 60 pontos serão considerados básicos. A parte da chave é de 0,6 pontos e carrega 15 de uso externo.
- Uma solicitação ou visita à rota de utilização abre o livro. Portanto, se esse uso conta como linha de base depende de quando o livro foi aberto.
- Com o piso padrão, uma chave que roteia 60.000 tokens enquanto o uso externo aumenta a conta em 60 pontos recebe todos os 60 como sua própria parte.
- Com o piso em 50 mil, a sua parte é de 1,2 pontos. Os outros 58,8 são externos e cobrados por peso, como qualquer uso externo.
- Defina `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` próximo ao custo de um ponto em seu plano. O uso externo inclui tráfego na mesma conta proveniente de chaves fora do pool.
- Um limite percentual se aplica a todos os modos. Uma chave limitada pode ser recusada enquanto a conta estiver muito abaixo do limite de saturação.
- Tome um limite de 10 e 12 pontos de uso externo no início da janela. Uma chave que roteia 20.000 tokens é então recusada com um valor de conta de 12,4%.
- A divisão é uma estimativa por volume de token. Uma solicitação conta como seus tokens de prompt mais seus tokens de conclusão. Os descontos em cache e os preços dos modelos não alteram essa contagem.
- Uma solicitação que não termina com o status 200 não registra nenhum token. Os exemplos são um fluxo que o cliente desconecta e um erro upstream após o consumo do uso.
- O uso causado por tal solicitação é cobrado das chaves que registraram os tokens, até o limite permitido por seus tokens. O resto é externo. Ele não recua. Uma resposta que não relata uso de token também não registra tokens.
- A utilização de uma solicitação em andamento pode aparecer na parte de outra chave ativa para toda a solicitação. Ele retrocede somente quando a solicitação termina com status 200.
- O uso já existente na conta quando um livro é aberto conta como externo. Isto cobre uma atualização, um novo pool e uma nova conta. O uso em uma nova janela antes de sua primeira leitura também conta como externo.
- Cada chave começa com sua parcela de peso desse uso, após a capacidade sem reivindicações de alocação. Com uma conta a 85% e cinco chaves de peso 20, cada uma começa com 17 das 20 usadas.
- Em um pool com diversas contas, o valor da conta servidora é aplicado ao orçamento somado. Isso permanece inalterado no livro.
- Um valor inferior dentro de uma janela que o provedor reporta como aberta não é aplicado. Um tempo de reinicialização que recue mais de 30 minutos é tratado como uma leitura antiga.
- Em ambos os casos, o livro mantém seu estado até que o tempo de reinicialização armazenado passe. Depois disso, o livro não é carregado até que uma leitura o transforme.
- A solução é a redefinição manual do histórico de uso (`POST /api/settings/purge-usage-history`). Ele limpa os livros de atribuição e seus contadores de tokens no banco de dados SQLite.
- O período `all` limpa todos os livros e contadores. Um período mais curto primeiro limpa os livros não escritos nele. Em seguida, ele limpa os contadores não gravados nele, mas apenas para uma conexão de pool que não possui nenhum livro restante. Um livro guardado ainda marca cada chave em seu balcão.
- Um livro cuja figura não se moveu não é reescrito, portanto, um período mais curto também pode limpar o livro da janela atual. A próxima leitura abre um novo livro com a figura atual.
- A redefinição não afeta um armazenamento de cotas Redis. Lá, um livro termina com sua janela ou expira 60 dias após sua última gravação.
- Quando o provedor não envia nenhum tempo de reinicialização, uma janela que reinicia e recarrega acima do valor antigo entre duas leituras parece um valor mais alto. O livro mantém a linha de base e as marcas antigas.
- As leituras são datadas pelo relógio local. Quando é adiantado em relação ao provedor, ou uma fonte relata um tempo de redefinição um pouco mais cedo, o livro pode chegar a essa diferença mais cedo.
- O crescimento nesse curto período é dividido pelos tokens roteados nele. A primeira leitura da próxima janela corrige isso. Quando o livro virado não contém tempo de reinicialização, essa correção precisa de um valor inferior, pelo menos dois minutos mais recente que a última leitura aplicada.
- Instâncias que compartilham leituras de data de armazenamento Redis com seus próprios relógios, portanto, mantenha esses relógios sincronizados. As leituras de uma instância cujo relógio está atrasado parecem mais antigas e são ignoradas.
- Quando nenhuma leitura utilizável chega após o tempo de redefinição armazenado, os compartilhamentos percentuais e os limites percentuais por chave não são aplicados até que uma leitura retorne. Sem tempo de reinicialização, começa 15 minutos após a última leitura que alterou o livro.
- Na loja Redis, um livro ocioso por 60 dias pode expirar entre o cheque do escritor e sua emissão. Em seguida, é recriado em uma revisão acima de 1, que é um estado válido.

---

## Resolvedor de planos

Implementado em `src/lib/quota/planResolver.ts`.

Precedência (da mais alta para a mais baixa):

1. **Substituição manual no banco de dados** — tabela `provider_plans`, por `connectionId`.
2. **Catálogo conhecido** — `src/lib/quota/planRegistry.ts` (somente dados).
3. **Plano vazio** — sem dimensões; configuração manual necessária.

### Catálogo conhecido

| Provedor              | Dimensões                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, desconhecido), `tokens/weekly`          |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Sem padrão — configuração manual necessária                   |

---

## Integração de pipeline

### gancho PRE (`open-sse/handlers/chatCore.ts`)

É executado antes do executor upstream, após verificações de autenticação e política:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Falha aberta** : se `enforceQuotaShare` for lançado, a solicitação será permitida com um log `pino.warn`. Isso evita que um bug do mecanismo de cota bloqueie todo o tráfego.

**Quando a capacidade retornar.** A recusa na participação da chave ou no teto do pool termina com uma de duas sentenças, em ambas as modalidades de empréstimo:

- Janela `percent` : `. The <window> window resets at <time>.` A hora é a redefinição dos relatórios do provedor.
- Unidade contável: `. Enough <window> usage is expected to clear by <time>.` O tempo é um limite superior da janela deslizante, se a chave não enviar mais nada.

`<time>` é um instante ISO 8601 em UTC. A recusa então carrega `Retry-After`: os segundos inteiros até aquele instante, mais um. Um cliente que espera tanto tempo tenta novamente no máximo um segundo após o instante. Quando o instante não é conhecido, a recusa não traz sentença nem cabeçalho. Uma recusa absoluta do limite não acarreta nenhuma das duas coisas. O código público permanece `quota_share_blocked`.

Uma recusa de compartilhamento não afeta a conexão compartilhada. Ele não define nenhum resfriamento, nenhum bloqueio de modelo e nenhuma falha no disjuntor do provedor, e as outras chaves do pool continuam sendo atendidas. Quando cada alvo de um combo recusa a chave de seu compartilhamento, o combo responde 429 sem esperar. Sua resposta traz a dica `Retry-After`. O caminho embeddings termina sua recusa com a mesma frase e não envia `Retry-After`.

### gancho POST (consumo recorde)

Após uma resposta bem-sucedida:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Nota de deriva** : se `consume` falhar após a resposta, o contador contínuo será subcontado. O sinal de saturação do provedor (por exemplo, `anthropic-ratelimit-unified-5h-utilization`) corrige a estimativa global na próxima solicitação.

### Penalidade suave combinada (`open-sse/services/combo.ts`)

Quando `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

A penalidade é aplicada após todos os outros fatores de pontuação. Ele reduz a probabilidade de combinação automática de selecionar uma chave saturada sem bloqueá-la.

---

## Passo a passo UI

### `/dashboard/costs/quota-share` — Página principal dos pools

Componentes (todos em `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componente             | Propósito                                                                      |
| ---------------------- | ------------------------------------------------------------------------------ |
| `QuotaConceptCard`     | Cartão introdutório explicando o compartilhamento de cotas para novos usuários |
| `CreatePoolModal`      | Crie um novo pool de cotas (conexão + nome + alocações iniciais)               |
| `PoolCard`             | Resumo por pool: nome, conexão, contagem de alocações                          |
| `DimensionBar`         | Barra empilhada por dimensão: a participação de cada chave + uso global        |
| `AllocationTable`      | Tabela com consumo, fair share, deficit/surplus, sinalizador de empréstimo     |
| `BurnRateChart`        | gráfico de linhas de taxa de queima EMA (recharts preguiçosos via `dynamic()`) |
| `EditAllocationsModal` | Editar pesos, limites e políticas de alocação para um pool                     |
| `BorrowModeField`      | Seletor de modo de empréstimo (`saturation` ou `consent`) no assistente        |
| `LendingBadge`         | Selo somente leitura em uma chave que empresta, somente em pools `consent`     |

O crachá de empréstimo mostra o percentual e, quando definido, o prazo em UTC com a zona nomeada. Ele julga o prazo no momento do instantâneo de uso. Um prazo expirado ou ilegível é exibido como `lending expired`.

Os ganchos da página:

- `usePools` — busca `GET /api/quota/pools` a cada 30 segundos.
- `usePoolUsage` — busca `GET /api/quota/pools/[id]/usage` sob demanda.
- `useLocalStoragePoolMigration` — é executado uma vez na montagem para migrar dados LS legados.

A etapa de chaves do assistente de pool possui uma caixa `Show usage by member to key holders`. Ele define a opção `memberBreakdown` do pool (consulte [Uso de membros](#member-usage) ). Abaixo dele, o assistente avisa que alguém que sabe qual chave é usada pode combinar uma barra com essa chave. Com a caixa marcada, isso ocorre quando a etapa lista menos de três ou mais de 20 teclas, pois as barras permanecem ocultas. Ele conta as chaves na etapa e não consegue dizer quais delas podem fazer solicitações.

### Configuração do plano do provedor `/dashboard/costs/quota-share/plans` —

- `ProviderPlanConfigClient.tsx`: menu suspenso para selecionar um provedor, visualizar o plano resolvido (automático do catálogo ou substituição manual) e editar dimensões.
- As alterações são gravadas em `PUT /api/quota/plans/[connectionId]`.
- A exclusão reverte para catálogo ou plano vazio.

---

## Cota de autoatendimento API (opt-in)

`GET /api/v1/me/quota/{provider}` (também servido em `/v1/me/quota/{provider}`) permite que um detentor de chave API leia, com sua própria chave, quanto de uma assinatura compartilhada é dele e o que o está bloqueando. A rota é uma casca fina sobre `src/server/selfService/quotaHandler.ts`; a visualização é construída por `src/lib/quota/selfView.ts` e seu contrato de resposta é `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` em `docs/openapi.yaml`).

### Habilitação e autenticação

- Sinalizador de recurso `QUOTA_SELF_PANEL`, padrão `false`. Enquanto estiver desativado, uma solicitação que atinge a rota obtém 404. Com `REQUIRE_API_KEY=true`, a política API do cliente recusa uma chave ausente ou inválida com 401 antes da rota ser executada, qualquer que seja o sinalizador. Uma solicitação sem chave, mas com uma sessão de painel conectada, passa nessa política e obtém a própria resposta da rota. O sinalizador é resolvido como qualquer outro sinalizador (substituição do painel ou REST e, em seguida, a variável de ambiente de mesmo nome); veja [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- O nome de exibição de cada pool e o rótulo de cada agendamento são retornados aos detentores de chaves do pool exatamente como o administrador os escreveu. Antes de acender os sinalizadores, verifique se os mesmos estão aptos para serem lidos pelos porta-chaves.
- A chave é lida apenas nos cabeçalhos: `Authorization: Bearer <key>` ou `x-api-key: <key>`. Quando ambos são enviados, é utilizado o primeiro que valida. Uma chave na string de consulta ou um cookie é ignorado. A chave de ambiente do servidor foi recusada (401).
- A chave precisa do escopo `self:usage` (403 sem ele).
- O segmento do provedor é cortado, em letras minúsculas e verificado em relação ao `^[a-z0-9][a-z0-9._-]{0,63}$` (400 caso contrário) e, em seguida, resolvido por meio do registro do provedor, de modo que um alias como `cc` leia os pools `claude`. `claude` e `anthropic` leem os mesmos pools.

### O que cada visibilidade mostra

| Visibilidade         | Requer                                                                              | Campos                                                                                                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Própria participação | `self:usage`                                                                        | `pools[]` (ref, nome, provedor, política, peso, limite), `dimensions[].yourShare`, `accounts[]` com `yourShare` (em uma janela `percent` sem `attributed` e `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                              |
| Nível da conta       | `self:usage` + `self:account-quota` e o provedor no `sharedQuotaProviders` da chave | adiciona `dimensions[].total`, `accounts[].dimensions[].account` e `accounts[].modelWindows`, `attributed` e `external` no `yourShare` de uma janela `percent` e `members` em um pool com uso de membros ativado (consulte [Uso de membros](#member-usage) ) |

- `sharedQuotaProviders` é uma configuração por chave (`PUT /api/keys/[id]/self-service`): `null`, o padrão, significa cada provedor que a chave alcança; `[]` significa nenhum. `accountVisible` de cada pool indica qual visibilidade se aplica a ele.
- Barras de contas e janelas de modelo são mostradas apenas para contas cuja conexão a chave pode usar. Quando a chave tem uma lista de conexões permitidas, uma conta fora dela mantém sua entrada `Account N` sem `account` ou `modelWindows`. Uma lista vazia significa nenhuma restrição, como acontece com `/v1/me/status`. O total do pool (`dimensions[].total`) não depende dessa lista.
- Duas figuras mostradas apenas com `self:usage` vêm do uso de outras chaves. `exhausted` de um orçamento programado reflete o consumo de cada chave nesse cronograma. Em um pool cujos pesos são todos zero, o `weight` da chave é `100 / number of members`. Ambos são o que a aplicação se aplica à chave.
- Um pool é identificado apenas por `ref`, um valor opaco vinculado à chave de chamada. Seu nome de exibição (`name`) está incluído conforme o administrador o escreveu. Um `ref` é derivado da chave e do pool com o segredo da chave de API do servidor (`API_KEY_SECRET`). Os clientes não devem persistir: isso muda se o segredo for alternado.
- As contas são listadas como `Account 1`, `Account 2`,… na ordem do pool. Nenhum ID de pool, ID de conexão, e-mail de conta ou nome de conta é retornado e a resposta passa pelo esquema do contrato, que descarta qualquer campo fora dele.
- Unidades contáveis (`requests`, `tokens`, `usd`) são relatadas como o bucket do pool que o portão de cota impõe: `limit` = plan limit × contas no pool, `fairShare` = peso / 100 × `limit` (divisão igual quando cada peso é 0), `consumed` = o próprio contador da chave no armazenamento de cotas, `remaining` = `fairShare` − `consumed`, com piso em 0.
- `blocks.schedules` lista as janelas de agendamento da chave (`open`/`closed`, `blackout` ou `outside-window`, `retryAfterSeconds`, pisos de reserva e se o orçamento da janela foi gasto); `blocks.modelCaps` lista seus limites horários por modelo com consumo.
- Uma chave fora de cada pool do provedor recebe 200 com `pools: []`; `availableModels` (os `qtSd/` ids que a chave vê em `/v1/models`), `expiresAt` e `apiBaseUrl` ainda estão preenchidos.
- `apiBaseUrl` é `OMNIROUTE_PUBLIC_API_BASE_URL`, então `OMNIROUTE_PUBLIC_BASE_URL`, senão `null`. Nunca é a própria origem do pedido.

### `status` e `reason`

| `status`      | Significado                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Uma leitura atual.                                                                                                                                                                                                                                                                                                                                                                             |
| `stale`       | Uma leitura de conta em cache marcada como obsoleta ou cujo tempo de redefinição já passou desde que foi lida. Os números são mantidos. Uma janela do modelo cujo tempo de reinicialização passou marca todo o grupo `modelWindows` `stale`. Para o compartilhamento da própria chave de uma janela `percent` : o livro foi lido sem uma leitura de conta no cache do portão para confirmá-lo. |
| `unavailable` | Sem leitura; os números são `null`, nunca `0`. `reason` diz por quê.                                                                                                                                                                                                                                                                                                                           |

| `reason`                          | Quando                                                                                                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | O armazenamento de cotas não pôde ser lido ou não pode ler livros de atribuição.                                                                                  |
| `percent_attribution_unavailable` | O próprio compartilhamento da chave de uma janela `percent` : ainda não existe nenhum livro de atribuição para essa conta e janela, ou o livro não lista a chave. |
| `percent_window_ended`            | A própria parte da chave de uma janela `percent` : o livro pertence a uma janela de plano que terminou.                                                           |
| `account_not_used_by_key`         | O próprio compartilhamento da chave em uma janela `percent` : a conexão da conta está fora das conexões permitidas da chave. Seu livro não é lido.                |
| `window_not_reported`             | O cache de limites do provedor não possui leitura para essa janela do plano.                                                                                      |
| `connection_lookup_failed`        | Não foi possível ler a conexão da conta.                                                                                                                          |
| `not_supported`                   | OmniRoute não consegue ler os limites de uso do provedor da conta.                                                                                                |
| `fetch_failed`                    | Nenhuma leitura em cache foi utilizável e a atualização dos limites do provedor falhou.                                                                           |
| `not_available`                   | A leitura não possui janelas de uso ou a conta não possui nenhuma leitura.                                                                                        |

Quando o armazenamento de cotas não pode ser lido, os campos armazenados de `blocks` ( `exhausted` de um orçamento de cronograma, `consumed` e `reached` de um limite de modelo) também são `null`.

### Consentimento de empréstimo

`PATCH /api/v1/me/quota/{provider}` registra o consentimento da própria chave de chamada para um pool. Ele usa o sinalizador, os cabeçalhos e as regras do provedor do `GET`. O escopo `self:usage` autoriza esta gravação, embora seu nome seja somente leitura.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` é o `ref` que o `GET` retorna para esse pool.
- `lendingPercent` é um número inteiro de 0 a 100. Um valor 0 limpa o consentimento e seu prazo. Um corpo com `lendingPercent` 0 é aceito em qualquer um dos modos.
- `lendingUntil` é opcional: milissegundos de época ou `null` sem prazo. Deve estar no futuro e no máximo 864000000000000. Um valor abaixo de 100000000000 é lido como segundos e é recusado.
- Qualquer outro campo é recusado. Um corpo com mais de 4.096 bytes é recusado. A leitura para nesse tamanho, portanto, um corpo mais longo nunca é mantido inteiro.

As verificações são executadas na ordem desta tabela. Cada recusa utiliza o corpo do erro padrão com uma mensagem fixa. A recusa de um desses cheques não significa nada.

| Status | Mensagem                                                                                           | Quando                                                                   |
| ------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 404    | `Not found`                                                                                        | A bandeira `QUOTA_SELF_PANEL` está desligada.                            |
| 401    | `Valid API key required`                                                                           | A chave está ausente ou é inválida ou é a chave de ambiente do servidor. |
| 403    | `API key lacks the self:usage scope`                                                               | A chave não possui `self:usage`.                                         |
| 400    | `Invalid provider`                                                                                 | O segmento do provedor é inválido.                                       |
| 429    | `Too many lending changes. Retry later.`                                                           | A chave ultrapassou seu limite. A resposta carrega `Retry-After`.        |
| 400    | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | O corpo não é JSON, é muito longo ou não corresponde ao esquema.         |
| 400    | `lendingUntil must be a Unix time in milliseconds`                                                 | O prazo é lido em segundos.                                              |
| 400    | `lendingUntil must be in the future`                                                               | O prazo é igual ou anterior ao horário da solicitação.                   |
| 404    | `Pool not found`                                                                                   | O `ref` não nomeia nenhum conjunto desta chave para este provedor.       |
| 403    | `Lending is not enabled for this pool`                                                             | O pool está no modo `saturation` e `lendingPercent` está acima de 0.     |
| 500    | `Failed to build quota view`                                                                       | Qualquer outra falha. Sua causa está registrada no servidor.             |

O limite é de 20 solicitações a cada 60 segundos para cada chave. Cada solicitação que passa na verificação do provedor conta, mesmo uma recusada posteriormente ou que não muda nada. Possui contador próprio, além do limite de taxa de solicitação da chave.

Uma solicitação que altera o consentimento armazenado grava um registro de auditoria `quota.pool.lending.updated`. Ele nomeia a chave com os valores antigos e novos. O mesmo órgão enviado duas vezes, escreve uma vez e audita uma vez. A resposta é 200 com a visualização `GET` completa, construída após a gravação.

A visualização `GET` relata os empréstimos da seguinte forma:

- Cada pool carrega `borrowMode` (`saturation` ou `consent`) e os próprios `lendingPercent` e `lendingUntil` da chave.
- `lendingActive` é `true` apenas em um pool `consent`, com percentual acima de 0 e prazo não atingido.
- Em um pool `consent`, cada `dimensions[].yourShare` contável carrega `borrowAvailable`. É o que a chave poderá utilizar acima de sua parcela agora, emprestada pelas demais chaves.
- `borrowAvailable` usa a fórmula da porta. Ele lê todas as outras chaves, mesmo enquanto a chave está sob seu compartilhamento. Para uma chave `hard` que é uma leitura extra por outra chave e dimensão contável, em paralelo.
- `borrowAvailable` é `null` para uma chave `soft` ou `burst` e `null` quando uma leitura falha.
- `borrowAvailable` é um valor para todas as outras chaves juntas. Num conjunto de duas chaves é a própria figura da outra chave.
- `borrowAvailable` ainda não foi relatado para janelas `percent` ou `accounts[]`.
- Em um pool `saturation` a visualização relata o consentimento armazenado com `lendingActive: false` e sem `borrowAvailable`.

### Erros

Cada resposta desta rota, sucesso ou erro, carrega `Cache-Control: no-store`. Uma recusa que ocorre antes da rota ser executada não a carrega, por exemplo, o 401 da política API do cliente ou o 403 do filtro IP Os erros da rota usam o corpo do erro padrão com uma mensagem fixa: 400 (provedor inválido), 401 (chave ausente ou inválida), 403 (faltando `self:usage`), 404 (sinalizador desativado) e 500 (`Failed to build quota view`). O 500 cobre qualquer falha quando a solicitação chega à rota, incluindo a própria consulta de chave; sua causa é registrada no servidor e nunca retornada. Os erros do `PATCH` estão listados em [Consentimento de empréstimo](#lending-consent).

### Limitações

- `remaining` é a parte do quinhão da chave que ela não utilizou. Não é uma garantia. Uma chave ainda pode ser servida além dela enquanto a piscina tiver espaço. Quando o total do pool atinge `limit`, todas as chaves do pool são recusadas, qualquer que seja a sua própria `remaining`, e uma chave sem `self:account-quota` não pode ver esse total.
- `remaining` não leva em consideração o `cap` absoluto da alocação. A aplicação recusa a chave quando o seu próprio consumo em uma janela da unidade do limite atinge o valor do limite.
- A barra no nível da conta vem do cache de limites do provedor e pode atrasar a decisão de aplicação em alguns minutos. Uma leitura cujo tempo de reinicialização já passou é relatada como `stale`.
- As janelas por modelo (`modelWindows`) são relatadas apenas para provedores que possuem um mapeamento de janela de plano: Claude e Codex hoje. Para outros provedores, `modelWindows` ainda está presente quando os dados da conta são mostrados, com uma lista `windows` vazia.
- A participação da própria chave em uma janela `percent` é uma estimativa. Ele vem do livro de atribuição e carrega todas as limitações listadas em "Dimensões percentuais: atribuição por chave" acima.
- `consumed` é a aplicação do número em comparação com a parte justa. É `attributed` mais `external` exatamente. `attributed` é a parte que o livro fornece a chave para os tokens que ele roteou. `external` é a parte da chave do uso da conta que as chaves do pool não consideram.
- Ambas as partes são enviadas apenas quando o `accountVisible` do pool é verdadeiro: a chave possui `self:account-quota` e o provedor está em seu `sharedQuotaProviders`. Uma chave sem ela fica `consumed` sozinha, com os mesmos `status` e `reason`.
- Com ambas as peças e com o seu próprio peso, um titular pode calcular o uso feito fora da piscina que fica a cargo das chaves da piscina. Um titular com escopo de conta já visualiza o total da conta.
- Uma chave que não roteou nada na janela ainda pode ler sua carga externa de `consumed`, porque sua parte atribuída é então 0.
- Por exemplo, um livro abre em 0, com as teclas A e B pesando 50 cada. A chave A roteia 900.000 tokens e a chave B 100.000. A conta então atinge 60% de um limite de 100. Então `attributed` é 54 para a chave A e 6 para a chave B, e `external` é 0 para ambas.
- A visão lê o livro e nunca escreve seu estado. Não abre um livro e nunca pede uma leitura ao fornecedor. Com o armazenamento Redis, uma leitura remove os campos de revisão substituídos em segundo plano, como fazem as leituras do portão.
- O compartilhamento é `ok` apenas enquanto o cache do portão mantém uma leitura da conta. Sem ele é `stale`, portanto, em um pool sem solicitação recente, ele aparece como possivelmente desatualizado.
- Até que uma solicitação passe pelo pool, o compartilhamento estará indisponível. Essa solicitação abre o livro, e o valor da conta naquele momento conta como uso feito fora do pool.
- Em um pool com diversas contas, cada entrada de conta utiliza o próprio livro dessa conta e o limite de uma conta. A aplicação dimensiona ambos os lados pelo número de contas, de modo que a proporção é a mesma.
- As janelas por modelo não carregam nenhum compartilhamento para a chave. O livro não mantém dados por modelo.
- Os pisos de reserva de uma programação não são avaliados pela visualização: uma programação pode ser exibida como `open` enquanto uma solicitação é recusada pelo motivo `schedule-reserve`.
- Quando dois conjuntos da mesma chave compartilham uma conexão, a imposição aplica um deles e a visualização lista ambos.
- Não há limite por endereço para tentativas de chave com falha: por trás de um proxy reverso, os chamadores podem compartilhar um endereço (depende se os endereços de clientes encaminhados são confiáveis), portanto, um bloqueio pode negar a rota para todos os detentores de chave. Com `REQUIRE_API_KEY=true`, uma chave inválida é recusada pela política API do cliente antes da rota ser executada, com o corpo 401 dessa política em vez do desta rota.

### Uso de membros

Um administrador pode permitir que os detentores de chaves vejam como o uso de uma janela é dividido entre os membros do pool. A opção é o `memberBreakdown` do pool, desativado por padrão. Ele é definido no assistente de pool ou com `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` e `GET /api/quota/pools/{id}` relatam isso.

Uma dimensão da visão carrega `members` somente quando todas elas são válidas:

- a opção da piscina está ativada
- o pool tem no máximo 20 chaves alocadas, e pelo menos três delas podem fazer solicitações: ativa, não revogada, não banida e sem expiração
- o `accountVisible` do pool é verdadeiro: a chave tem `self:account-quota` e o provedor está em seu `sharedQuotaProviders`
- em uma janela `percent`, a conexão da conta é aquela que a chave pode usar
- o compartilhamento da própria chave dessa janela foi lido: seu `status` não é `unavailable`

Caso contrário, `members` estará ausente. Nunca é uma lista vazia.

- Cada fatia é `{ slot, consumed, isYou }`. O esquema de resposta rejeita qualquer outra propriedade em uma fatia e uma lista de mais de 20 fatias. As fatias são listadas em ordem de slot.
- Há uma fatia por chave alocada, incluindo uma chave que não pode mais fazer solicitações. Um membro sem uso mostra um zero real.
- O slot 1 é sempre a chave solicitante, com `isYou` verdadeiro. Os outros números de slot são classificações de um hash codificado. É codificado com `API_KEY_SECRET` e cobre o pool, a chave solicitante e o membro.
- Portanto, os números não se alinham entre os titulares. Para um titular, eles permanecem iguais entre as visitas. Eles podem mudar quando uma chave entra ou sai do pool, ou quando esse segredo é girado.
- Em uma janela contável, uma fatia é o contador do membro no armazenamento de cotas, o mesmo contador que seu próprio `consumed`.
- Em uma janela `percent` uma fatia é a parte `attributed` do membro, do mesmo livro lido como o compartilhamento da própria chave. O uso feito fora da piscina nunca é dividido em fatias. Essa carga é dividida por peso, de modo que as fatias que a carregam mostrariam os pesos.
- Cada visualização lê um valor por outro membro e janela contável, em paralelo. Em uma janela `percent` as fatias não custam leitura além da leitura do próprio livro do compartilhamento. Quando um valor não pode ser lido, essa janela não possui `members` e o compartilhamento da chave permanece.
- A opção e o número de chaves utilizáveis são lidos uma vez por pool e apenas para uma chave que pode ver dados da conta. Uma falha na leitura da opção ou da contagem de chaves utilizáveis desativa as barras desse pool. O servidor registra um aviso e o restante da visualização é construído.

As barras não contêm nomes ou identificações. Eles ainda contam ao detentor da chave coisas sobre os outros membros:

- Os detentores ainda podem igualar as fatias pelos seus valores.
- Uma numeração estável permite que o titular siga um membro ao longo do tempo.
- O número de fatias mostra quantas chaves estão alocadas no pool.
- Em um conjunto de três chaves, alguém que sabe qual chave foi usada pode dizer qual foi a última chave usada.
- Quando um pool cai abaixo de três chaves utilizáveis, as barras desaparecem. As visualizações obtidas anteriormente ainda mostram o que cada membro usou.
- Em uma janela contável, o total do pool menos as fatias pode mostrar o uso de chaves que não estão mais alocadas.
- Um membro que mostra zero em uma conta e uso em outra pode mostrar qual membro usa qual conta.
- Num conjunto contável com a política `hard`, uma fatia que pára de crescer na quota-parte justa de um membro indica o peso desse membro.

### Série de uso (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (também servido em `/v1/me/usage`) retorna o uso e o custo das próprias solicitações da chave de chamada: totais, uma entrada por dia UTC, por dia e modelo, por modelo e por provedor. Ele compartilha o sinalizador, as regras de autenticação, o escopo `self:usage`, `Cache-Control: no-store` e o comportamento de erro da rota de cota acima. A chave é verificada antes de `range`. Os erros são 400 (`Invalid range`), 401, 403, 404 e 500 (`Failed to build usage`).

- `range` é um dos `1d`, `7d`, `30d` (o padrão) ou `90d`. Qualquer outro valor, um valor vazio ou um parâmetro repetido é 400. O conjunto para em `90d` para limitar o custo de uma chamada. A visualização lê apenas o histórico de uso bruto, nunca os resumos diários, que não possuem chave.
- As linhas são selecionadas pelo ID da chave de chamada. A coluna do nome da chave nunca é correspondida e as linhas registradas sem um ID da chave nunca são contadas.
- A construção de uma série executa cinco consultas agrupadas nas linhas da chave na janela. A série construída é reutilizada por 60 segundos por chave e intervalo, e uma chamada reutilizada não executa nenhuma. Seu `generatedAt` dá sua idade.
- A janela termina quando a série é construída. Uma linha carimbada posteriormente, por exemplo, por inclinação do relógio, não é contada.
- `coverage.retentionDays` é a configuração de retenção do histórico de uso bruto do operador (`retention.usageHistory` nas configurações do banco de dados). `coverage.truncatedByRetention` é verdadeiro quando o intervalo solicitado é maior que essa configuração. Ele compara os dois números e não verifica se as linhas estão realmente faltando.
- O provedor é retornado conforme registrado para as próprias solicitações da chave. Model é o nome registrado após seu último `/` e as linhas são agrupadas por ele. Uma solicitação de combinação cujo destino foi recusado é registrada com o rótulo de roteamento como provedor (o nome do combo, `auto` ou `combo`) e a string do modelo que o cliente enviou. Outras solicitações recusadas, por exemplo, por um disjuntor aberto, um resfriamento de modelo ou um salto estacionado em cota, mantêm o provedor e o modelo de destino.
- Além de contagens e custos, a resposta traz latência média, taxas de sucesso e tempos da primeira e da última solicitação.
- `byModel` lista os 50 pares de provedor e modelo com mais solicitações. Com mais pares, suas entradas não somam `summary` e `summary.uniqueModels` conta cada ortografia do modelo registrada. `byModelTruncated` é então verdadeiro, e um modelo cujos pares caem em ambos os lados do corte mostra totais parciais.
- Dois custos são relatados. `costUsd` é o custo faturado, conforme mostram as análises de uso. Provedores de assinatura de taxa fixa, como o plano Claude Code, contam US$ 0 lá. `listPriceUsd` é o mesmo uso com preço de tabela, assinaturas incluídas. Uma solicitação cujo modelo não possui linha de preço conta seu custo armazenado: um custo relatado pelo provedor ou calculado quando a solicitação foi registrada. Somente uma solicitação sem nenhum conta 0, sem marcador, portanto um total pode ser parcial.
- O contrato de resposta é `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` em `docs/openapi.yaml`).

### Página de autoatendimento

Com `QUOTA_SELF_PANEL` ativado, `/quota/{provider}` é uma página pública. Um detentor de chave digita uma chave API lá e vê os conjuntos dessa chave para o provedor. Cada pool mostra um cartão por janela do pool, com o uso do pool para todos e a parcela da própria chave. Cada conta do pool possui seus próprios cartões, com uso da conta e parcela da chave. O uso da conta aparece apenas quando a chave pode ver os dados da conta. A página também lista os limites por modelo de cada conta e o uso da própria chave. Um aviso aparece quando um agendamento bloqueia a chave neste momento. Um cartão lista todos os limites da chave por modelo com seu uso e marca aqueles alcançados. `{provider}` é um ID de provedor ou seu alias (`/quota/claude`, `/quota/cc`). Um provedor desconhecido e cada caminho `/quota/*` enquanto o sinalizador estiver desativado, responda 404. Pools em um nó personalizado compatível com OpenAI ou Anthropic não têm página. O API ainda responde por eles.

A página não tem sessão. A chave é enviada apenas no cabeçalho `Authorization` de `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` e `GET /api/v1/me/usage`, nunca em URL. Uma chave que o servidor aceita é mantida na guia `sessionStorage`. Com "Lembrar neste dispositivo", ele é mantido em `localStorage` e "Esquecer chave" o remove de ambos. Uma chave rejeitada pelo servidor é removida do armazenamento.

Um pool no modo `consent` mostra um cartão de empréstimo. Lá, o detentor da chave define uma porcentagem inteira de 0 a 100 da parcela ociosa da chave para emprestar. O titular também escolhe quanto tempo dura o consentimento: até ser desligado, 1 hora, 8 horas, 24 horas, 7 dias ou 30 dias. A duração conta a partir do momento do salvamento. Enquanto estiver em vigor um prazo, o titular pode mantê-lo. Se esse prazo passar antes de Salvar, o cartão não envia nada e pede outra escolha. Com 0% nenhum prazo é enviado. O cartão mostra o prazo armazenado com seu fuso horário nomeado. Um consentimento cujo prazo expirou é mostrado como encerrado.

Para uma chave `hard` o cartão também lista, por janela de pool, quais outras chaves emprestam para a chave no momento. Cada linha é um número para todas as outras chaves juntas. Num conjunto de duas chaves é a própria figura da outra chave. Um valor que a visualização não relata é lido como não disponível, e não como zero. Para uma chave `soft` ou `burst` o cartão diz que nenhum valor se aplica.

Um pool no modo `saturation` cuja chave armazena uma porcentagem acima de 0 mostra apenas uma retirada. Diz que a porcentagem armazenada não tem efeito aí. Seu botão Retirar envia 0 sem prazo. Um pool no modo `saturation` com 0 armazenado não mostra nenhum cartão de empréstimo. Depois de salvar, um cartão que a visualização retornada não precisa mais permanece com sua mensagem até que a visualização da página mude novamente.

Nada é salvo até que o titular pressione Salvar ou Retirar. Cada pressionamento envia uma solicitação `PATCH /api/v1/me/quota/{provider}` e um segundo pressionamento não envia nada enquanto o primeiro estiver pendente. O corpo carrega o `ref` opaco do pool desde a visualização, o percentual e o prazo. A resposta é a visualização de cota reconstruída e a página a mostra sem uma segunda leitura. Quando dois salvamentos se sobrepõem, a página lê a cota uma vez após a última resposta. A página não guarda o consentimento no armazenamento do navegador.

Uma alteração recusada é explicada no cartão por um texto escolhido no status HTTP. O corpo do erro não é lido. Um 401 diz que a chave não foi aceita e recarrega a cota. Um 403 diz que o pool não está aceitando alterações de empréstimos e um 404 diz que o pool acabou. Ambos oferecem um botão que recarrega a cota. Uma resposta 400 ou outra 4xx pede ao titular que verifique o percentual e o prazo. A 429 pede ao titular que espere, com os segundos de `Retry-After` quando a resposta lhes der. Uma resposta 5xx, um 408 ou uma falha de rede indica que a alteração pode não ter sido salva e mantém os valores digitados. Uma resposta fora do contrato recarrega a cota. Uma falha ao salvar não remove a chave por si só. Quando o recarregamento é recusado, a página remove a chave como em qualquer leitura recusada.

Depois que uma chave é aceita, a página também mostra um cartão “Configure suas ferramentas” com três guias. "Claude Code" fornece o bloco `env` para `~/.claude/settings.json`. "Shell" fornece as mesmas variáveis que as linhas `export`. "Claude Desktop" fornece os valores para sua janela de inferência de terceiros. Os modelos são os modelos de quota-partilha que a chave pode exigir para esse fornecedor. Quando essa lista não vem com a chave, o bloco ativa a descoberta do modelo de gateway. O endereço do gateway é a origem pública API que o servidor relata (`OMNIROUTE_PUBLIC_API_BASE_URL` e depois `OMNIROUTE_PUBLIC_BASE_URL`). Quando nenhum dos dois estiver definido, o cartão mostrará um espaço reservado e instruirá o titular a solicitar ao administrador. A chave é mostrada como um espaço reservado. "Incluir minha chave" coloca toda a chave no texto na tela e no que um botão copiar copia. Isso dura até que a caixa seja limpa, a chave seja esquecida ou substituída, ou a página seja abandonada. O cartão não envia nenhuma solicitação e não oferece download de arquivos.

Uma leitura das marcas API `stale` é mostrada como possivelmente desatualizada. Uma leitura que marca `unavailable` é mostrada com seu motivo, nunca como zero.

Nos planos percentuais, a página desenha o compartilhamento da própria chave quando o API a reporta. Diz que o número é uma estimativa e nomeia suas duas partes. Os limites por modelo mostram apenas a conta.

Quando uma janela carrega `members`, seu cartão também mostra uma barra com um segmento por membro, na ordem dos slots. O segmento da chave solicitante usa a cor de destaque. Os outros segmentos percorrem as cores do gráfico do tema. Uma legenda de texto lista cada segmento com seu valor, portanto nada depende da cor. Os segmentos são rotulados como `You` ou `Member N`, onde N é o slot.

### Porta dedicada para a página

`QUOTA_PANEL_PORT` abre um segundo ouvinte que atende apenas a página de autoatendimento. Está desativado, a menos que a variável seja definida. `QUOTA_PANEL_HOST` é o endereço de ligação e o padrão é `127.0.0.1`.

O ouvinte retransmite esses caminhos para a porta principal e responde 404 para todos os outros caminhos:

| Caminho                                                                  | Serve                                   |
| ------------------------------------------------------------------------ | --------------------------------------- |
| `/quota/{provider}`                                                      | A página                                |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | A visualização de cota que a página lê  |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | A série de uso que a página lê          |
| `/_next/static/`                                                         | Scripts, estilos e fontes da construção |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Ícones                                  |

`GET` e `HEAD` são retransmitidos sem corpo. Uma solicitação com um corpo também é retransmitida: um `PATCH` do caminho de visualização da cota, que a página envia para salvar uma opção de empréstimo. Qualquer outro método responde 404, exceto uma solicitação CONNECT, cuja conexão é encerrada sem resposta. Qualquer outra solicitação que declare um corpo responde 404 e sua conexão é encerrada. As solicitações de atualização são recusadas e sua conexão é encerrada. Um caminho com um segmento de ponto ou marcador de fragmento é recusado, como na porta API. O mesmo acontece com um alvo de solicitação com um caractere fora do ASCII imprimível. Um caractere de controle bruto no destino é respondido 400 pelo analisador HTTP, antes da própria verificação desta porta. Os cabeçalhos de solicitação que a estrutura reserva para seu próprio uso não são retransmitidos: nomes que começam com `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` ou `x-next-`, e os nomes `x-matched-path` e `next-resume`. A solicitação é retransmitida sem eles. O dashboard, a página de login, o API de gerenciamento e as rotas de inferência não podem ser acessados por esta porta.

O `PATCH` deve carregar `Content-Type: application/json`, sem parâmetro ou apenas com `charset=utf-8`. Deve conter um `Content-Length` de 1 a 4096, escrito como dígitos simples, e nenhum `Transfer-Encoding`. Um `PATCH` que quebra uma dessas regras responde 404. Alguns comprimentos malformados, como um assinado ou repetido, são respondidos 400 pelo analisador HTTP antes da própria verificação desta porta. A porta lê os bytes declarados antes de entrar em contato com a porta principal e espera no máximo 5 segundos por eles. Um corpo que ainda não está completo responde 404 e sua conexão é encerrada. Nada chega à porta principal nesse caso, ou quando o cliente sai primeiro. A porta retransmite exatamente os bytes declarados, com o mesmo `Content-Length`. Os bytes após eles são lidos como a próxima solicitação na conexão. Um proxy reverso TLS na frente deve encaminhar `Content-Length` e não deve agrupar novamente o corpo da solicitação. A porta principal verifica a chave API no cabeçalho `Authorization`, como para `GET`.

O corpo 404 é `{"error":"not_found","message":"Not found."}`. Um relé com falha responde 502 (`api_bridge_unavailable`) ou 504 (`api_bridge_timeout`) sem campo `detail`.

O ouvinte não lê `QUOTA_SELF_PANEL` e não liga a página. Enquanto o sinalizador estiver desativado, a página e seu API respondem 404 na porta principal e o ouvinte retransmite essa resposta.

No servidor de desenvolvimento (`next dev`), a página não se torna interativa por meio desta porta. O soquete de recarga a quente de desenvolvimento é uma solicitação de atualização e a porta a recusa. Use a porta principal durante o desenvolvimento.

A porta serve HTTP simples e a página envia chaves API. Mantenha o endereço de ligação padrão e coloque um proxy reverso com TLS na frente dele. Um endereço de ligação diferente de loopback registra este aviso:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Um ponto de loopback que não envia nenhum cabeçalho de encaminhamento conta como local na porta principal. Portanto, um proxy no mesmo host deve enviar `X-Forwarded-For`. Um proxy em um endereço privado é confiável apenas para esse cabeçalho com `OMNIROUTE_TRUST_PROXY=private` (ou `lan`). Qualquer outro ponto é relatado pelo endereço de sua conexão e os cabeçalhos de encaminhamento enviados são descartados.

O ouvinte mantém no máximo 256 conexões por vez. Um cliente tem 10 segundos para enviar os cabeçalhos da solicitação e 30 segundos para enviar a solicitação inteira. Uma conexão inativa mantida ativa é fechada após cerca de 5 segundos. Uma conexão sem atividade por 60 segundos é encerrada. Esses valores são fixos. Defina limites de conexão e taxa no proxy reverso também. Um proxy reverso na frente deve manter suas conexões upstream ociosas por menos de 5 segundos ou não reutilizá-las. A retransmissão para a porta principal usa os tempos limite upstream da porta API (`API_BRIDGE_*`).

O ouvinte também inicia quando `API_PORT` não está definido. `QUOTA_PANEL_PORT` deve ser uma porta de 1 a 65535, escrita apenas em dígitos. Deve ser diferente da porta do painel e da porta API. Enquanto o servidor WebSocket ativo estiver ativado, ele também deverá ser diferente do `LIVE_WS_PORT` (padrão 20132). Qualquer outro valor não abre nada e registra um aviso. Um aviso sobre um valor recusado nomeia a variável e não repete o valor. Uma porta que já está em uso não abre nada e registra este aviso:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Com `OMNIROUTE_BASE_PATH` definido, o ouvinte espera todos os caminhos acima desse prefixo. Use o mesmo `OMNIROUTE_BASE_PATH` em tempo de construção e em tempo de execução. Escreva-o com uma barra inicial e sem barra final, por exemplo `/omniroute`. Outra forma, incluindo `/` e `/omniroute/`, deixa a porta desativada com um aviso, embora a compilação aceite essas formas. O mesmo acontece com um caminho base cujo primeiro segmento nomeia uma rota de aplicação: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` ou `connect`, em qualquer caso.

Limitações:

- `/quota/{provider}/` com uma barra final responde 404 nesta porta.
- O service worker e o manifesto do aplicativo web não são servidos nesta porta.
- Um favicon personalizado definido no painel não é mostrado nesta porta.
- Os ícones não são mostrados quando o aplicativo é executado em um caminho base.
- O porto fala HTTP/1.1. simples
- Uma ligação que falha não é tentada novamente até que o processo seja reiniciado.
- O ouvinte não tem limite de conexão ou taxa por endereço de cliente.
- As configurações do contêiner não são abordadas nesta seção.

---

## Variáveis de ambiente

| Variável                             | Padrão         | Descrição                                                                               |
| ------------------------------------ | -------------- | --------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`       | Driver a ser usado: `sqlite` ou `redis`                                                 |
| `QUOTA_STORE_REDIS_URL`              | _(vazio)_      | Redis URL, por exemplo, `redis://localhost:6379`                                        |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`          | 0..1; `>= threshold` ativa o modo estrito                                               |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`         | Tokens que explicam no máximo um ponto de uma janela de plano percentual                |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`          | 0..1; multiplicador para pontuação combinada de políticas brandas                       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`           | Dias antes de GC remover buckets `quota_consumption` antigos                            |
| `QUOTA_PANEL_PORT`                   | _(desativado)_ | Porta dedicada para a página de autoatendimento. Não definido significa nenhum ouvinte. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`    | Endereço de ligação para essa porta                                                     |

As configurações DB (`quotaStore.*`) substituem env vars.

---

## Solução de problemas

### Redis configurado, mas não está se conectando

Verifique se `ioredis` está instalado (`npm ls ioredis`) e se `QUOTA_STORE_REDIS_URL`
está acessível. Em caso de falha de conexão, a factory recorre ao SQLite (registrado no
nível `warn`).

### `peek` retorna dados desatualizados / fail-open

Se `peek` lançar uma exceção, `enforceQuotaShare` tratará o resultado como "permitir" (fail-open).
Verifique nos logs do `pino` as entradas `quota:enforce` e `quota:factory` para identificar
a causa raiz.

### Divergência do contador de consumo

Se o uso real do provedor for diferente dos contadores, isso é esperado — a
janela deslizante de 2 buckets tem um erro de aproximadamente 1% nos limites da janela, e `consume` é
executado no modo fire-and-forget após a resposta. O sinal de saturação (`saturationSignals.ts`)
lê a utilização real do provedor com um TTL de 30s e ajusta `globalUsedPercent`
adequadamente.

### O pool mostra "sem dados" para a taxa de consumo

`computeBurnRate` requer pelo menos 2 amostras históricas. Novos pools sem chamadas
anteriores a `consume` exibirão `tokensPerSecond: 0` e `timeToExhaustionMs: null`.

---

## Migração do localStorage

Quando `/dashboard/costs/quota-share` é carregado pela primeira vez, o hook `useLocalStoragePoolMigration`
verifica:

1. `localStorage.getItem("omniroute:quota-share:pools")` não está vazio.
2. `GET /api/quota/pools` retorna `[]` (o banco de dados está vazio).

Se ambas as condições forem verdadeiras, ele envia cada pool legado para `POST /api/quota/pools` em lote
e, em seguida, remove a chave do localStorage. A migração é idempotente: a condição 2 impede
que a migração seja executada novamente.

---

## Classificação interna da estratégia

`quota-share` é uma estratégia de roteamento **exclusivamente interna** (`INTERNAL_ROUTING_STRATEGY_VALUES` em
`src/shared/constants/routingStrategies.ts`). Ela é usada exclusivamente por combos de pool `qtSd/`
gerados pelo sistema e é deliberadamente excluída de `ROUTING_STRATEGY_VALUES` para que nunca
apareça como uma opção selecionável pelo usuário na interface ou na API.

---

## Cobertura de teste

Duas camadas de cobertura automatizada são fornecidas com o mecanismo de cota compartilhada:

| Suíte                | Comando                                                                | O que cobre                                                                                                                                                                                                        |
| :------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unidade (29 testes)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | agendador DRR, controle de saturação, limites de simultaneidade, matemática fairShare, fila de pendências                                                                                                          |
| Matriz de integração | `npm run test:combo:matrix`                                            | Decisão de roteamento ponta a ponta através do pipeline combinado real; DRR justiça + despriorização de saturação via costuras vivas (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

A matriz de integração funciona em CI juntamente com todas as 22 estratégias públicas. O conjunto de unidades pode ser executado de forma independente.

---

## Resumo do esquema DB

Três tabelas adicionadas pelas migrações `078`, `079` e `085`:

- `quota_pools` + `quota_allocations` — definições de pool e alocações por chave.
- `quota_consumption` — rolando contadores de 2 baldes por `(apiKeyId, dimensionKey)`.
- Substituições manuais do plano do provedor `provider_plans` — (dimensões JSON por connectionId).

Todas as tabelas adicionadas por meio de migrações `CREATE TABLE IF NOT EXISTS` idempotentes.

O empréstimo consentido adiciona três colunas: `quota_allocations.lending_percent` (número inteiro, padrão 0), `quota_allocations.lending_until` (época milissegundos ou `NULL` para sem prazo) e `quota_pools.borrow_mode` (padrão `saturation`). Sua migração apenas adiciona essas colunas e não grava nenhuma linha existente.

O livro de atribuição percentual adiciona `quota_percent_ledger` (uma linha por pool, conta e janela de plano) e `quota_percent_ledger_tokens` (um contador de token por pool, conta e chave API ). `src/lib/db/quotaPercentLedger.ts` os lê e grava.
