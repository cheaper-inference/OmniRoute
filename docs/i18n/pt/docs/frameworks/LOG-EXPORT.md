# Log export (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Exportação contínua e incremental dos registos de chamadas do OmniRoute para um repositório de análise externo.

O separador Registos do painel mantém o histórico de pedidos em SQLite (`call_logs`), limitado pela
rotação e retenção. A exportação de registos envia o mesmo conjunto de registos de forma agendada, para que possa perdurar
para além da base de dados local e ser cruzado com outros dados. O BigQuery é o primeiro destino; o
pipeline assenta num registo, pelo que é possível acrescentar mais destinos.

---

## 1. Como funciona

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Agendamento** — uma tarefa cron de `JobRegistry`, `log_export`, com o valor predefinido `0 * * * *` (de hora a hora,
  UTC). Registada em `src/lib/initCloudSync.ts`; pode ser substituída com `OMNIROUTE_LOG_EXPORT_CRON`.
  Cada execução processa todos os destinos **ativados**, sequencialmente.
- **Cursor** — o `call_logs.rowid` implícito do SQLite, persistido por destino em
  `log_export_destinations.cursor_row_id`. `timestamp` não é deliberadamente o cursor: os chamadores
  podem fornecer o seu próprio valor, pelo que um pedido lento pode ser escrito depois de um mais rápido que tenha começado
  mais tarde, e um cursor baseado na data/hora iria ignorá-lo.
- **Processamento em lotes** — `batch_size` linhas por pedido (500 por predefinição), `max_rows_per_run` linhas por execução
  (10000 por predefinição), para que um grande volume de dados pendentes seja processado ao longo de várias execuções agendadas, em vez de bloquear uma.
- **Entrega** — o cursor só avança depois de `send()` ser concluído com êxito. Um lote que falhe deixa o
  cursor onde estava, pelo que as mesmas linhas voltam a ser tentadas na execução seguinte. A garantia é de
  entrega pelo menos uma vez, com eliminação de duplicados no destino, e não de entrega efetiva exatamente uma vez: o BigQuery identifica cada
  linha pelo ID do registo de chamada, que respeita na medida do possível dentro da sua própria janela de eliminação de duplicados.
- **Proteção contra sobreposição** — a execução agendada pelo cron e `POST .../run` podem ser acionados em simultâneo. Um destino
  já em processamento é ignorado em vez de ser processado duas vezes (`skipped: true` no resultado da execução),
  pelo que uma execução concorrente não pode reenviar um lote nem fazer recuar o cursor.
- **Recuperação após purga** — se `cursor_row_id` ficar acima de `MAX(rowid)` (a tabela inteira foi
  purgada e os rowids reiniciados), o executor recua para 0 em vez de deixar permanentemente de detetar registos.

### Executor isolado e limites

Cada execução de destino em Node inicia um processo filho separado e de curta duração ao nível do sistema operativo (`child_process`
com IPC, não `worker_threads`). As leituras dos corpos, a análise/serialização de JSON dos dados, o
`prepare()` do destino e as operações de E/S de rede do destino são executados nesse processo, e não no ciclo de eventos do servidor.
Apenas a configuração e pequenas mensagens de progresso atravessam o IPC; os registos exportados nunca regressam
ao servidor. A tarefa cron e a rota Executar agora mantêm o mesmo resultado público e a mesma proteção contra sobreposição.

O processo filho abre o `DATA_DIR/storage.sqlite` resolvido pelo servidor em modo só de leitura, utilizando `node:sqlite`,
com `busy_timeout=5000` e `query_only=ON`. Não importa qualquer singleton da base de dados nem executa
migrações, cópias de segurança ou atualizações do SQLite. A gestão de artefactos em falta/corrompidos (incluindo o
UPDATE de artefactos corrompidos) permanece apenas no percurso de detalhe do painel. Ambos os percursos partilham um
resolvedor de detalhes puro; a exportação utiliza leituras assíncronas do sistema de ficheiros e a mesma ordem de resolução: artefacto → conteúdo
embutido legado → disco legado → nenhum. Uma execução captura o rowid máximo de inserção
quando o processo filho abre o seu leitor; as inserções posteriores aguardam a execução seguinte. Trata-se de um limite
de inserção, não de uma transação SQLite de longa duração: os escritores WAL e os pontos de controlo continuam livres durante
as esperas de rede. As atualizações/eliminações de linhas existentes não ficam congeladas por este limite.

Após cada lote aceite, o processo filho aguarda uma confirmação. Primeiro, o servidor persiste
o cursor com `advanceLogExportCursor` e depois envia `ack`; nenhum lote seguinte começa antes disso.
Uma falha no envio, uma falha do processo ou um tempo limite excedido regista uma falha sem fazer avançar esse lote. Os lotes
anteriormente confirmados mantêm-se consolidados; no máximo, apenas o lote não confirmado pode ser reenviado.
O êxito só é registado após `done` e uma saída normal do processo filho. As falhas terminam o processo filho
com SIGTERM, passando a SIGKILL após 500 ms, e o executor aguarda o encerramento do processo.

| Variável de ambiente                          | Predefinição | Finalidade                                             |
| --------------------------------------------- | ------------ | ------------------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000       | Limite de tempo real por destino                       |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024         | Limite do espaço antigo do V8 do processo filho, em MB |

Os valores inválidos/não positivos/não inteiros utilizam as predefinições. A definição da heap não constitui um limite
total de RSS; lotes muito grandes podem ainda esgotar a memória do processo filho e fazer a execução falhar em segurança.
A predefinição de 1024 MB deixa margem para o lote predefinido de 500 linhas de artefactos de 512 KiB com
os corpos ativados, incluindo a serialização JSON do BigQuery em blocos de bytes. Não torna seguro um
lote de 10000 linhas com corpos. O esgotamento da heap do V8 regista uma falha com indicação de como agir: reduza o tamanho
do lote ou aumente `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; o cursor permanece no último
lote confirmado. Os corpos históricos embutidos/em disco não estão abrangidos pelo limite dos artefactos modernos.
Os operadores devem prever o consumo de RSS separadamente, sobretudo em contentores com memória limitada.

O processo filho herda apenas o `DATA_DIR` resolvido, `NODE_ENV`, o `TZ` explícito (resolução
da hora local de nomes de ficheiro legados), `ELECTRON_RUN_AS_NODE` quando presente e os seguintes parâmetros de saída:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (e as respetivas formas em minúsculas),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Um dispatcher global do Undici partilha a resolução de proxy baseada exclusivamente em variáveis de ambiente e as regras
de exclusão de anfitriões locais do servidor, incluindo `NO_PROXY`; não importa `proxyFetch.ts` nem os respetivos sinalizadores de BD/funcionalidades.
As credenciais do proxy são ocultadas na saída reencaminhada e nos erros registados. As credenciais do destino
são transmitidas apenas numa mensagem IPC de arranque, nunca em argv nem no ambiente; o reencaminhamento de saída/erros
recebe um prefixo e é sanitizado. Apenas `ExperimentalWarning` é desativado nos argumentos de execução do processo filho para evitar
repetir o aviso de SQLite do Node em cada execução do cron; os outros tipos de aviso permanecem visíveis.

Os módulos de destino têm de poder ser importados sem dependências de Next.js/exclusivas do servidor. A implementação
existente do BigQuery já cumpre esse contrato. As caches de tokens de acesso duram apenas durante a execução do processo
filho, não entre execuções. O Node é o ambiente de execução suportado (`package.json` engines), mas a secção de instalação
do Bun no README e `Dockerfile.bun` também apresentam uma via de compatibilidade em produção com
`bun:sqlite` (`src/lib/db/core.ts` / adaptadores). Assim, no Bun, as exportações mantêm a via anterior
no mesmo processo e emitem um aviso uma única vez: o isolamento da memória heap e do tempo limite do processo filho não está disponível. Utilize
o Node para isolamento do ciclo de eventos e de situações de memória esgotada (OOM); o Bun não é tratado aqui como exclusivo de desenvolvimento.

Quando `includeBodies` estiver ativado, prefira uma frequência de poucos minutos, como
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, em vez de acumular uma hora de payloads pendentes.
Os limites de lotes e de linhas continuam a limitar cada execução. O custo de arranque do processo é incorrido por destino em cada execução;
isto troca um pequeno custo de arranque pelo isolamento do ciclo de eventos do servidor, não por uma redução da utilização total da CPU.

### Payloads (prompts e respostas)

Por predefinição, a exportação contém apenas os campos de resumo apresentados na **lista** de Registos. Ativar
**Exportar prompts e respostas** (`includeBodies`) envia também o que o painel de **detalhes** de Registos
apresenta para cada chamada:

| Campo                            | O que contém                                                          |
| -------------------------------- | --------------------------------------------------------------------- |
| `request_body` / `response_body` | Os payloads da chamada tal como o painel os apresenta                 |
| `pipeline_route_decision`        | O destino e o modelo escolhidos pelo encaminhador                     |
| `pipeline_client_request`        | O pedido em bruto, exatamente como foi enviado pelo cliente           |
| `pipeline_openai_request`        | Após a tradução para o formato interno da OpenAI                      |
| `pipeline_provider_request`      | Tal como foi efetivamente enviado ao fornecedor, no respetivo dialeto |
| `pipeline_provider_response`     | A resposta em bruto do fornecedor                                     |
| `pipeline_client_response`       | O que foi devolvido ao chamador                                       |
| `pipeline_error`                 | Detalhes do erro ao nível do pipeline numa chamada falhada            |
| `bodies_truncated`               | Verdadeiro quando algum dos campos acima atingiu `maxBodyBytes`       |

Trata-se de conteúdo de prompts, pelo que está **desativado por predefinição** e é deliberadamente uma opção por destino.
O que é enviado é o que o painel apresenta, porque a exportação e `getCallLogById` partilham a resolução
de detalhes: os payloads já
têm os dados pessoais sanitizados e os segredos ocultados quando são gravados, e uma chamada efetuada com uma
chave de API `noLog` não armazena qualquer payload, pelo que não há nada para exportar.

Os payloads são lidos por linha a partir do artefacto no sistema de ficheiros, pelo que a hidratação só é executada para os destinos
que a solicitaram. Um artefacto em falta ou corrompido resulta na exportação do respetivo resumo com payloads nulos, em vez
de fazer falhar o lote e deixar o cursor bloqueado.

`maxBodyBytes` (predefinição: 262144) limita cada campo. Os payloads mais longos são **truncados em vez de
descartados** — um prompt cortado continua a responder a «o que foi pedido» — e a linha é assinalada com
`bodies_truncated`. Os deltas transmitidos em fluxo, bloco a bloco, não são exportados; a resposta reconstituída
já se encontra em `pipeline_provider_response` e `pipeline_client_response`.

---

## 2. Ficheiros

| Componente                              | Localização                                  |
| --------------------------------------- | -------------------------------------------- |
| Contrato de destino                     | `src/lib/logExport/types.ts`                 |
| Registo                                 | `src/lib/logExport/registry.ts`              |
| Gestão de segredos                      | `src/lib/logExport/secrets.ts`               |
| Executor (IPC do processo principal)    | `src/lib/logExport/runner.ts`                |
| Ciclo de vida do processo               | `src/lib/logExport/childRunner.ts`           |
| Ponto de entrada do processo filho      | `src/lib/logExport/exportChild.ts`           |
| Abertura em modo só de leitura          | `src/lib/db/logExportReadOnly.ts`            |
| Consulta/mapeamento partilhados         | `src/lib/usage/callLogExportQueries.ts`      |
| Resolução de detalhes                   | `src/lib/usage/callLogDetailResolver.ts`     |
| Projeção da API                         | `src/lib/logExport/presenter.ts`             |
| Destino BigQuery                        | `src/lib/logExport/destinations/bigquery.ts` |
| Autenticação da conta de serviço Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Origem do registo de chamadas           | `src/lib/usage/callLogExportSource.ts`       |
| Persistência                            | `src/lib/db/logExportDestinations.ts`        |
| Tarefa cron                             | `src/lib/jobs/logExportJob.ts`               |
| Camada REST                             | `src/app/api/log-export/`                    |
| Página do painel                        | `src/app/(dashboard)/dashboard/log-export/`  |

Esquema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Todas as rotas exigem autenticação de gestão (`requireManagementAuth`). Os segredos nunca são devolvidos:
um segredo armazenado é devolvido como o valor literal `__stored__`, e enviar esse valor numa atualização
mantém a credencial armazenada.

Criar ou atualizar um destino cujo tipo declare um segredo **exige
`STORAGE_ENCRYPTION_KEY`**. Sem esta variável, `encrypt()` deixa os dados passar sem os alterar e sem emitir avisos, pelo que a escrita é
recusada com um erro 400, em vez de guardar uma credencial em texto simples no SQLite (a mesma proteção que o
webhook do Telegram aplica).

| Método   | Caminho                                  | Finalidade                                                                  |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipos de destino + respetiva lista de campos de configuração                |
| `GET`    | `/api/log-export/destinations`           | Listar destinos (segredos ocultados)                                        |
| `POST`   | `/api/log-export/destinations`           | Criar um destino                                                            |
| `GET`    | `/api/log-export/destinations/{id}`      | Consultar um destino                                                        |
| `PUT`    | `/api/log-export/destinations/{id}`      | Atualizar nome / estado de ativação / configuração / processamento em lotes |
| `DELETE` | `/api/log-export/destinations/{id}`      | Eliminar                                                                    |
| `POST`   | `/api/log-export/destinations/{id}/test` | Testar credenciais, sem escrever dados                                      |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Escoar os dados pendentes agora, pelo mesmo fluxo da execução agendada      |
| `GET`    | `/api/log-export/status`                 | Estado do cron, execuções recentes, dados pendentes por destino             |

`GET /api/log-export/types` é o que torna a interface genérica: o formulário do painel é apresentado a partir
dos descritores de campos devolvidos, pelo que um novo destino não exige alterações à interface.

---

## 4. Destino BigQuery

Chaves de configuração (`type: "bigquery"`):

| Chave                | Notas                                                                               |
| -------------------- | ----------------------------------------------------------------------------------- |
| `projectId`          | Projeto GCP que contém o conjunto de dados                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                     |
| `location`           | Utilizada apenas quando é necessário criar o conjunto de dados (predefinição: `EU`) |
| `serviceAccountJson` | Chave da conta de serviço. Segredo: cifrado em repouso, nunca devolvido             |
| `autoCreate`         | Criar o conjunto de dados e a tabela na primeira exportação (predefinição: `true`)  |

A conta de serviço precisa de `bigquery.tables.updateData` na tabela de destino, bem como de
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` está ativo.

Um lote configurado é uma unidade de **cursor**, não uma unidade HTTP: `send()` divide-o em chamadas insertAll
de, no máximo, 500 linhas, pelo que um `batch_size` elevado não pode exceder o limite de 10 MB por pedido do BigQuery.
Os códigos de estado transitórios (408/429/500/502/503/504) dão origem a até três novas tentativas com um intervalo
de espera exponencial, reutilizando os mesmos insertIds; as falhas de autenticação e de esquema lançam uma exceção na primeira tentativa, em vez
de desperdiçarem a execução.

Uma tabela criada há instantes ainda não está visível para o endpoint de streaming, que responde com
404 durante alguns segundos. Esse 404 dá origem a novas tentativas, mas **apenas quando a tabela foi criada nesta execução** —
uma tabela que esteja realmente em falta continua a provocar uma falha imediata. Tenha em atenção que recriar uma tabela com um nome que
foi eliminado recentemente faz com que o BigQuery recuse inserções por streaming durante vários minutos; trata-se de uma
característica da operação de eliminar e depois recriar, pelo que é preferível usar um novo nome de tabela em vez de eliminar e voltar a adicionar uma.

**Uma falha parcial chega como HTTP 200 com um `insertErrors[]` não vazio.** Isto é tratado como
uma falha e lança uma exceção, o que impede o cursor de avançar para além das linhas que o BigQuery nunca
aceitou; `tests/unit/log-export-bigquery.test.ts` fixa este comportamento.

O transporte usa apenas REST — uma asserção RS256 autoassinada é trocada por um token de acesso em
`https://oauth2.googleapis.com/token` e, em seguida, as linhas são enviadas para `tabledata.insertAll`. Não é
incluído qualquer SDK da Google. Os tokens de acesso são mantidos em cache no processo por par (conta de serviço, âmbito).

A tabela criada contém uma coluna por campo do separador Logs, mais `exported_at`, e está organizada de acordo com
a forma como os registos de chamadas são efetivamente consultados:

- **Particionada por dia com base em `timestamp`**, para que uma consulta limitada por data só analise esses dias.
- **Agrupada por `api_key_name`, `provider`, `model`, `status`** (por esta ordem), para que a filtragem por
  quem executou a chamada, para onde foi enviada ou se falhou exclua blocos dentro de cada partição. O BigQuery
  permite, no máximo, quatro colunas de agrupamento e a ordem é importante: um filtro apenas por `api_key_name`
  exclui blocos, mas um filtro apenas por `status` não.
- **Retenção opcional das partições** através de `partitionExpirationDays` (0 mantém tudo), aplicada
  quando a tabela é criada.

Ambas as definições são aplicadas no momento da criação. Uma tabela existente mantém a organização que já tem, pelo que
deve apontar o destino para um novo identificador de tabela se quiser adotá-las.

`tests/unit/log-export-bigquery.test.ts` verifica que o mapeador e o esquema da tabela se mantêm
sincronizados, para que uma nova coluna do registo de chamadas não possa ser omitida silenciosamente durante a exportação.

Os lotes são divididos em blocos com base **tanto** no número de linhas como nos bytes serializados. O número de linhas, por si só, não é suficiente
quando os dados completos são exportados: 500 linhas que contenham prompts podem ocupar dezenas de megabytes, e insertAll
rejeita pedidos superiores a 10 MB. Os blocos são fechados ao atingir 500 linhas ou 9 MB, consoante o que ocorrer primeiro.

---

## 5. Destino de rastos OTLP/HTTP

A configuração utiliza `type: "otlp-http"`. Trata-se de uma exportação agendada, baseada num cursor, de registos
de chamadas persistidos, e não do destino de eventos de encaminhamento em tempo real com entrega de melhor esforço em
`open-sse/services/routing/otel.ts`. Não lê nem altera as variáveis de ambiente,
os temporizadores ou os buffers desse destino. Ativar ambos pode produzir dois tipos independentes de spans;
utilize o âmbito de instrumentação `omniroute.log-export` para distinguir estes spans dos registos de chamadas.

| Chave                    | Predefinição / finalidade                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `endpoint`               | URL HTTP(S) completo de rastos obrigatório; não é acrescentado o sufixo `/v1/traces`           |
| `headers`                | Linhas `Name: value` ou objeto JSON de strings opcionais; encriptados                          |
| `requestHeaderAllowlist` | Vazio (desativado); nomes/prefixos de cabeçalhos do cliente a capturar como atributos de spans |
| `serviceName`            | `omniroute`; recurso `service.name`                                                            |
| `langfuseMapping`        | `false`; adiciona atributos de geração/sessão/utilizador do Langfuse                           |
| `identity`               | `pseudonymous`, `keyName` ou `none`                                                            |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                        |
| `timeoutMs`              | `30000` por tentativa HTTP                                                                     |
| `environment`            | Não definido; `langfuse.environment` opcional                                                  |

O painel genérico apresenta estes campos. `paths` aceita um array da API ou uma área de texto
com caminhos exatos separados por quebras de linha/vírgulas. Os caminhos de embeddings, rerank e outros são
ignorados, a menos que sejam explicitamente permitidos. As linhas ignoradas continuam a fazer avançar o cursor; os
contadores `exported`/`exportedTotal` do executor existente contam as linhas de origem processadas, incluindo as linhas
filtradas, e não os spans aceites. A filtragem é efetuada no processo filho, sem alterar o respetivo
contrato IPC/cursor.

A validação de URL utiliza a função auxiliar `parseAndValidateNonMetadataUrl`, que não depende da base de dados, de
`src/shared/network/outboundUrlGuard.ts`: a política `block-metadata`. Aplica as mesmas
verificações incondicionais de metadados/protocolo/credenciais incorporadas que o validador de webhooks com
URLs privados autorizados, mas permite deliberadamente destinos localhost/LAN sem uma
sobreposição global por sinalizador de funcionalidade. Isto permite endpoints autoalojados de Langfuse, Phoenix, Tempo e Collector,
incluindo endpoints HTTP privados. Os hosts de metadados da nuvem são sempre bloqueados.
Os redirecionamentos não são seguidos, pelo que um coletor não pode redirecionar credenciais para outro host.
Tal como a proteção lexical de URL existente, isto não fixa a resolução DNS; configure apenas
hosts controlados pelo operador. Prefira HTTPS sempre que o endpoint não esteja numa rede de confiança.

### Conteúdo e entrega

O JSON OTLP/HTTP (`ExportTraceServiceRequest`, `Content-Type: application/json`) transporta um
span CLIENT por linha permitida, com o nome do caminho exato do pedido. A nomenclatura por caminho distingue
Chat Completions, Responses e Messages sem incorporar dados do modelo ou da identidade no
nome do span. Os atributos do recurso incluem `service.name` e o `service.version` do pacote.

O mecanismo normal de registo de tentativas de chat (`open-sse/handlers/chatCore/attemptLogging.ts`) escreve
`duration = Date.now() - startTime` na conclusão e não fornece uma marca temporal;
`saveCallLogOperation` em `src/lib/usage/callLogs.ts` utiliza por predefinição a hora de escrita
(conclusão) como marca temporal. Assim, a exportação define fim = marca temporal da linha e início = fim − duração
(milissegundos, convertidos em nanossegundos decimais). As marcas temporais históricas fornecidas pelo chamador
também são preservadas como hora de fim; não existe um discriminador de início/conclusão por linha.
Uma duração nula passa a zero. Marcas temporais inválidas/em falta fazem falhar o lote em vez de criar
spans não determinísticos. `ttftMs` admite valores nulos e é mapeado para `omniroute.ttft_ms`.

Os atributos incluem `gen_ai.operation.name="chat"`, fornecedor, modelo pedido/de resposta,
tokens de entrada/saída, tokens opcionais de leitura de cache/criação de cache/raciocínio, estado HTTP,
combo, origem da cache, etiqueta de sessão e identificador de correlação. Os valores inteiros OTLP e as marcas temporais
são strings decimais; as strings, os booleanos e os números fracionários utilizam as respetivas variantes nativas de valores
OTLP. Os spans de erro têm o estado ERROR e uma mensagem de estado sanitizada. O registo
canónico não contém um URL do host a montante, pelo que `server.address` é omitido em vez de
identificar incorretamente o coletor como servidor do modelo. O custo não é exportado.

Apenas `includeBodies=true` carrega o conteúdo. Com `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` transportam o JSON sanitizado do corpo do pedido/da resposta
tal como armazenado pelo OmniRoute (canonicalizado quando é possível analisá-lo), e não um array de mensagens
reestruturado segundo as convenções semânticas. Os corpos truncados/não JSON permanecem como texto em bruto. Com `langfuseMapping=true`,
os corpos são emitidos apenas como `langfuse.observation.input` / `langfuse.observation.output`;
os atributos `gen_ai.*.messages` são omitidos para que cada corpo seja enviado uma única vez. Ambos os modos
herdam `maxBodyBytes` do fluxo de carregamento existente;
`omniroute.bodies_truncated=true` assinala o truncamento.
Este destino não adiciona instantâneos adicionais do pipeline nem leituras de artefactos não sanitizados;
a captura opcional de cabeçalhos do pedido utiliza o instantâneo do cliente já carregado, descrito abaixo.
Utilize uma cadência ao nível do minuto, como `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, ao exportar
corpos, em vez de acumular um volume pendente de uma hora.

### Cabeçalhos opcionais dos pedidos do cliente

A captura de cabeçalhos está **desativada por predefinição**. Defina `requestHeaderAllowlist` na configuração do destino
e ative **Exportar prompts e respostas** (`includeBodies: true` no destino).
A lista de permissões aceita um array da API ou uma área de texto com nomes separados por quebras de linha/vírgulas:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Os nomes são comparados de forma exata, sem distinguir maiúsculas de minúsculas, exceto quando um único `*` no final seleciona um prefixo
não vazio de nome de cabeçalho. São rejeitados `*` isolado, carateres universais no interior e nomes de cabeçalhos HTTP inválidos.
São permitidos, no máximo, 64 seletores, cada um com um nome/prefixo de, no máximo, 256 bytes ASCII.
Esta definição é independente de `headers`, que autentica o exportador junto do coletor.

A captura lê apenas `pipeline_client_request`, preenchido a partir de
`clientRawRequest` (ou do antigo `clientRequest`) do pipeline detalhado guardado. Nunca recorre aos cabeçalhos do pedido ao fornecedor.
O registo detalhado do pipeline tem de ter estado ativado quando o pedido foi registado. Com
`includeBodies` desativado, ou se o JSON do instantâneo do cliente estiver em falta, corrompido ou truncado, não são emitidos
atributos de cabeçalho. Aumentar `maxBodyBytes` pode evitar o truncamento do instantâneo durante a exportação;
não permite recuperar detalhes que nunca foram guardados. Um instantâneo com mais de 1 MiB ou que contenha mais de
256 entradas de cabeçalho é ignorado. A exportação existente de prompts/respostas mantém-se ativada em simultâneo com
a captura de cabeçalhos; a lista de permissões não disponibiliza um modo de hidratação apenas de cabeçalhos.

Os valores selecionados tornam-se matrizes de cadeias de carateres OTLP `http.request.header.<full lowercase header name>`,
mesmo quando existe apenas uma cadeia de carateres. Por exemplo, `X-OmniRoute-Meta-Team: example-team` torna-se
`http.request.header.x-omniroute-meta-team` com
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
O prefixo completo é preservado: são cabeçalhos comuns, sem análise de campos de negócio nem
conversão para metadados `omniroute.metadata.*` / Langfuse. `langfuseMapping` não altera a semântica
dos cabeçalhos. Um `User-Agent` selecionado com um único valor também define o atributo escalar padrão
`user_agent.original`. As vírgulas dentro de um valor não são usadas para o dividir. As variantes de maiúsculas e minúsculas são agregadas pela ordem
das entradas guardadas; qualquer variante inválida leva à omissão de todo esse cabeçalho. Os atributos são ordenados pelo nome em minúsculas.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, cabeçalhos de chaves de API, nomes que contenham
marcadores auth/token/secret/password/credential e credenciais internas do gateway são sempre
excluídos, mesmo que sejam selecionados ou estejam parcialmente mascarados no armazenamento. Os padrões de credenciais conhecidos reutilizam
o detetor de credenciais partilhado; os marcadores de ocultação são omitidos, não são exportados como valores seguros.
Só são aceites cadeias de carateres e matrizes não vazias de cadeias de carateres; números ou objetos não são convertidos.
Nomes inválidos, chaves de protótipo, carateres de controlo (exceto a tabulação horizontal) e Unicode malformado
são ignorados sem fazer falhar o lote nem reproduzir o seu conteúdo nos erros.

Cada span captura, no máximo, 32 cabeçalhos, 16 valores por cabeçalho, 4096 bytes UTF-8 por valor
e 16384 bytes UTF-8 no total dos nomes e valores dos cabeçalhos capturados. Os cabeçalhos demasiado grandes ou inválidos
são omitidos na íntegra, não são truncados. A seleção é uma decisão de privacidade do operador: nomes aparentemente seguros
podem, ainda assim, conter dados pessoais, e estes limites/detetores não constituem um mecanismo geral de remoção de dados de identificação pessoal.

### Limites de entrega

Os pedidos estão limitados a 500 spans e 4 MiB de JSON UTF-8, incluindo o invólucro.
O tamanho de cada span permitido é verificado antes do primeiro pedido de um lote do cursor. Um
span individual que exceda o limite impede o envio de qualquer parte desse lote e provoca uma falha com indicação para reduzir
`maxBodyBytes`; não é descartado silenciosamente. A verificação prévia mantém apenas referências aos registos e
contagens de bytes, descartando cada span/JSON temporário; os spans são reconstruídos em blocos de tamanho limitado,
em vez de manter uma segunda cópia serializada do lote. Os estados HTTP 408/429/5xx, as falhas de rede e os tempos limite dão origem a, no máximo,
três tentativas, com espera exponencial de 250/500 ms. Os segundos ou as datas HTTP de `Retry-After`
podem prolongar a espera até 5 segundos. Os restantes estados provocam uma falha imediata. Uma rejeição parcial OTLP 2xx também gera uma exceção em vez de
confirmar um span perdido; são aceites confirmações vazias ou em JSON válido, com um
limite de leitura da resposta de 64 KiB.

Os erros contêm apenas factos próprios do exportador: estado HTTP, classe de repetição, número de tentativas e contagens de spans
enviados, ou mensagens fixas de falha de confirmação/rede. Os corpos das respostas do coletor,
as contagens de sucesso parcial e os cabeçalhos de resposta nunca são copiados para erros, registos ou para o
painel. Um lote que falhe ou seja parcialmente aceite não é confirmado: o destino apresenta
o estado A falhar com esse código de estado, o cursor permanece no último lote confirmado e a execução seguinte
reenvia as mesmas linhas. Os estados permanentes continuam a provocar falhas até que o coletor ou a configuração
sejam corrigidos. Utilize os registos do próprio coletor para obter detalhes da resposta. Os resumos de erros dos registos de chamadas mantêm
o seu mecanismo de ocultação separado.
`prepare()` não aprovisiona nada; o teste envia por POST exatamente `{"resourceSpans":[]}` e comunica
o estado HTTP sem escrever spans de registos de chamadas.

Os IDs de trace e de span são os primeiros 32/16 dígitos hexadecimais do SHA-256 de
`"omniroute.trace\\0" + callLogId` e `"omniroute.span\\0" + callLogId`. Os reenvios contêm
IDs idênticos. Isto não garante a desduplicação: alguns backends, incluindo a ingestão do Langfuse
v4, não desduplicam spans com o mesmo ID. Uma falha abrupta ou uma falha parcial de um bloco pode
reenviar, no máximo, o único lote do cursor ainda não confirmado; todo esse lote pode ser duplicado,
não apenas o seu último bloco HTTP. Escolha o tamanho do lote do cursor tendo em conta este compromisso.

### Exemplo de Langfuse

Configure estes campos para uma instância de Langfuse alojada pelo próprio utilizador:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Construa o valor de Authorization localmente como a codificação Base64 da cadeia de carateres literal `public-key:secret-key`
(por exemplo, com `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Não cole credenciais reais em registos, capturas de ecrã ou relatórios de problemas. O mapeamento define automaticamente
`x-langfuse-ingestion-version: 4`; Authorization continua a ser fornecido em `headers`.
Tanto os cabeçalhos como o salt de identidade gerado utilizam o mecanismo existente de campos secretos
encriptados e os marcadores de posição da API; `STORAGE_ENCRYPTION_KEY` é obrigatório.

O mapeamento adiciona o tipo/modelo de geração, detalhes de utilização em JSON (entrada/saída/total e chaves
de cache disponíveis), capturas da entrada/saída em JSON, nível ERROR/DEFAULT, mensagem de estado sanitizada,
nome do rastreio, ID de sessão, ambiente opcional e
`langfuse.observation.metadata.<key>` filtrável para fornecedor, modelo pedido, caminho, combinação, origem
da cache e estado. `langfuse.observation.completion_start_time` é apresentado em ISO 8601 como
início + TTFT apenas quando o TTFT é conhecido e está dentro da duração. Não são enviados atributos de custo.

Os modos de identidade aplicam-se a `langfuse.user.id`:

- `pseudonymous` (predefinição): HMAC-SHA256 do ID interno da chave de API com um salt aleatório
  de 32 bytes por destino. O salt é gerado na criação, se estiver ausente, encriptado
  como `identitySalt`, nunca devolvido e mantido durante as edições. Os IDs de chave em bruto nunca são
  colocados nos atributos dos spans. Recriar/rodar o salt de um destino altera as identidades.
- `keyName`: o nome configurado da chave de API, revelando intencionalmente essa etiqueta do operador.
- `none`: sem ID de utilizador. As etiquetas de sessão continuam a ser exportadas quando presentes; estes modos não
  anonimizam conteúdo arbitrário dos prompts nem etiquetas de sessão/correlação fornecidas pelo operador.

### Iniciar sem preenchimento retroativo

Apenas na criação, ative **Iniciar a partir da posição atual (ignorar registos existentes)** ou passe
`startFromCurrentPosition: true` no nível superior do payload da API de criação. Isto inicializa
`cursor_row_id` com o rowid máximo atual dos registos de chamadas retidos, utilizando as funções auxiliares
de cursor existentes, sem uma migração. A predefinição é false (cursor 0 e preenchimento retroativo do histórico retido).
Não se trata de uma definição para repor o cursor durante uma atualização.

A adição partilhada de `ttftMs` também adiciona uma coluna `ttft_ms` que aceita valores nulos ao mapeador do BigQuery
e ao esquema de novas tabelas: o respetivo teste de esquema exige que cada campo canónico de registo tenha uma
coluna. As tabelas existentes continuam a exportar sem alterações: `prepare()` lê o esquema da tabela e
omite apenas `ttft_ms` quando essa coluna está ausente. Adicione a coluna INT64 que aceita valores nulos para obter o TTFT
na execução seguinte, ou utilize uma nova tabela. Não são necessários PATCH, alterações automáticas do esquema nem
permissões adicionais; todos os outros campos de linha mantêm a verificação estrita do esquema.

---

## 6. Adicionar um destino

1. Crie `src/lib/logExport/destinations/<name>.ts` que exporte um `LogExportDestinationType`:
   um `configSchema` Zod, um array de descritores `fields` para a interface, `secretFields` e um
   `createClient(config)` que devolva `test()` / `prepare()` / `send(records)`.
2. Adicione-o ao array `DESTINATIONS` em `src/lib/logExport/registry.ts`.
3. Escreva testes em `tests/unit/`.

Esta é toda a alteração: a persistência, a tarefa cron, a camada REST, a encriptação de segredos e o
formulário do painel de controlo leem todos o registo.

Duas regras para um novo destino:

- `send()` **tem de lançar uma exceção** em caso de falha parcial. A resolução significa «o destino tem estas linhas»,
  e o cursor avança permanentemente para além delas.
- Um destino que aceite um URL fornecido pelo utilizador tem de o validar através de
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) antes de efetuar o pedido,
  tal como fazem os webhooks. O BigQuery não precisa disto: os seus anfitriões são constantes.

---

## 7. Utilização

- **Painel de controlo**: Integrações → Exportação de registos. Adicione um destino, execute **Testar** para verificar as credenciais
  sem escrever linhas e, em seguida, ative-o.
- **Linhas pendentes**: cada cartão de destino mostra as linhas pendentes e o cursor; `GET
/api/log-export/status` devolve os mesmos valores, juntamente com as últimas 20 execuções da tarefa.
- **Um destino com falhas não faz falhar os restantes** — o resumo da execução regista o estado de cada destino
  em `last_status` / `last_error`, e o histórico de execuções da tarefa mantém os dados agregados.
- **Eliminar um destino elimina o respetivo cursor.** Ao adicioná-lo novamente, o processamento começa no registo de
  chamadas mais antigo ainda retido, o que reenvia linhas que o destino poderá já ter. No BigQuery, o
  `insertId` de cada linha só evita essa duplicação dentro da janela de desduplicação do próprio BigQuery, pelo que é preferível desativar
  um destino em vez de o eliminar.
