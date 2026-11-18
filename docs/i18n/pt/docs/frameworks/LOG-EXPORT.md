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

| Chave                | Notas                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Projeto GCP que contém o conjunto de dados                                                                                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                                          |
| `location`           | Utilizado apenas quando o conjunto de dados tem de ser criado (predefinição `EU`)                                                        |
| `serviceAccountJson` | Chave da conta de serviço. Segredo: encriptado em repouso, nunca devolvido                                                               |
| `autoCreate`         | Criar o conjunto de dados/tabela em falta; adicionar condicionalmente colunas anuláveis de evidência de utilização (predefinição `true`) |

A conta de serviço necessita de `bigquery.tables.updateData` na tabela de destino, além de
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` está ativo.
A atualização de uma tabela existente para adicionar os dois campos anuláveis de evidência de utilização também requer
`bigquery.tables.update`. A ausência de uma permissão faz a exportação falhar sem avançar o respetivo cursor.

Um lote configurado é uma unidade de **cursor**, não uma unidade HTTP: `send()` divide-o em chamadas
insertAll de, no máximo, 500 linhas, pelo que um `batch_size` elevado não pode exceder o limite de
10 MB dos pedidos do BigQuery. Os estados transitórios (408/429/500/502/503/504) são novamente
tentados até três vezes, com recuo exponencial, reutilizando os mesmos insertIds; as falhas de autenticação
e de esquema geram um erro na primeira tentativa, em vez de consumirem a execução.

Uma tabela criada há instantes ainda não está visível para o endpoint de transmissão, que responde
404 durante alguns segundos. Esse 404 é novamente tentado, mas **apenas quando esta execução criou a tabela** —
uma tabela genuinamente em falta falha imediatamente. Tenha em atenção que recriar uma tabela com um nome
que foi eliminado recentemente faz com que o BigQuery recuse inserções de transmissão durante vários
minutos; isso é uma propriedade da eliminação seguida de recriação, pelo que deve preferir um novo nome
de tabela a eliminar e readicionar uma tabela.

**Uma falha parcial chega como HTTP 200 com um `insertErrors[]` não vazio.** Isto é tratado como
uma falha e gera um erro, impedindo o cursor de avançar para além das linhas que o BigQuery nunca
aceitou; `tests/unit/log-export-bigquery.test.ts` fixa este comportamento.

O transporte é REST simples — uma asserção RS256 autoassinada é trocada por um token de acesso em
`https://oauth2.googleapis.com/token` e, em seguida, as linhas são enviadas para `tabledata.insertAll`.
Não é incluído nenhum SDK da Google. Os tokens de acesso são colocados em cache no processo, por conta de serviço e âmbito.

A tabela criada contém uma coluna por cada campo do separador Logs, além de `exported_at`, e está estruturada para
a forma como os registos de chamadas são efetivamente consultados:

- **Particionada por dia em `timestamp`**, para que uma consulta limitada por data só analise esses dias.
- **Agrupada por `api_key_name`, `provider`, `model`, `status`** (por esta ordem), para que a filtragem por
  quem a executou, para onde foi enviada ou se falhou elimine blocos dentro de cada partição. O BigQuery
  permite, no máximo, quatro colunas de agrupamento e a ordem é importante: um filtro apenas em
  `api_key_name` elimina blocos, mas um filtro apenas em `status` não.
- **Retenção opcional de partições** através de `partitionExpirationDays` (0 mantém tudo), aplicada
  quando a tabela é criada.

Ambas as definições são aplicadas no momento da criação. Uma tabela existente mantém a estrutura que já tem, pelo que
deve apontar o destino para um novo ID de tabela se quiser adotá-las.

`tests/unit/log-export-bigquery.test.ts` garante que o mapeador e o esquema da tabela permanecem
sincronizados, para que uma nova coluna de registos de chamadas não seja silenciosamente descartada durante a exportação.

Os lotes são divididos com base **tanto no número de linhas como nos bytes serializados**. O número de linhas, por si só, não é suficiente
quando as cargas úteis são exportadas: 500 linhas que contenham prompts podem ocupar dezenas de megabytes, e insertAll
rejeita um pedido superior a 10 MB. Os blocos terminam aos 500 linhas ou aos 9 MB, consoante o que ocorrer primeiro.

---

## 5. Destino de traces OTLP/HTTP

A configuração usa `type: "otlp-http"`. Esta é uma exportação agendada, baseada em cursor, dos
registos de chamadas persistidos, e não o sink de eventos de encaminhamento em tempo real de
melhor esforço em `open-sse/services/routing/otel.ts`. Não lê nem altera as variáveis de ambiente,
temporizadores ou buffers desse sink. Ativar ambos pode produzir dois tipos independentes de spans;
use o âmbito de instrumentação `omniroute.log-export` para distinguir estes spans de registos de chamadas.

| Chave                    | Predefinição / finalidade                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `endpoint`               | URL completa de traces HTTP(S) obrigatória; não é acrescentado o sufixo `/v1/traces`          |
| `headers`                | Linhas opcionais `Name: value` ou objeto JSON de strings; encriptado                          |
| `requestHeaderAllowlist` | Vazio (desativado); nomes/prefixos de cabeçalhos do cliente a capturar como atributos do span |
| `serviceName`            | `omniroute`; recurso `service.name`                                                           |
| `langfuseMapping`        | `false`; adiciona atributos de geração/sessão/utilizador do Langfuse                          |
| `identity`               | `pseudonymous`, `keyName` ou `none`                                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                       |
| `timeoutMs`              | `30000` por tentativa HTTP                                                                    |
| `environment`            | Não definido; `langfuse.environment` opcional                                                 |

O dashboard genérico apresenta estes campos. `paths` aceita um array da API ou uma área de texto
com caminhos exatos separados por linhas novas/vírgulas. Embeddings, rerank e outros caminhos
são ignorados, salvo se forem explicitamente permitidos. As linhas ignoradas continuam a avançar
o cursor; os contadores `exported`/`exportedTotal` do runner existente contam as linhas de origem
processadas, incluindo as linhas filtradas, e não os spans aceites. A filtragem é efetuada no
processo subordinado, sem alterar o contrato de IPC/cursor.

A validação de URL utiliza o helper sem DB `parseAndValidateNonMetadataUrl` de
`src/shared/network/outboundUrlGuard.ts`: a política `block-metadata`. Tem as mesmas verificações
incondicionais de metadados/protocolo/credenciais incorporadas que o validador de webhooks, com
URLs privadas permitidas, mas permite deliberadamente destinos localhost/LAN sem uma substituição
global de feature flag. Isto permite endpoints self-hosted do Langfuse, Phoenix, Tempo e Collector,
incluindo endpoints HTTP privados. Os hosts de metadados da cloud são sempre bloqueados.
Os redirecionamentos não são seguidos, pelo que um collector não pode redirecionar credenciais
para um host diferente. Tal como o guard lexical de URLs existente, isto não fixa a resolução
DNS; configure apenas hosts controlados pelo operador. Prefira HTTPS sempre que o endpoint não
esteja numa rede de confiança.

### Payload e entrega

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) transporta um
span CLIENT por cada linha permitida, cujo nome corresponde ao caminho exato do pedido. A
designação do caminho distingue Chat Completions, Responses e Messages sem incorporar dados do
modelo ou da identidade no nome do span. Os atributos do recurso incluem `service.name` e
`service.version` do pacote.

O logger normal de tentativas de chat (`open-sse/handlers/chatCore/attemptLogging.ts`) escreve
`duration = Date.now() - startTime` na conclusão e não fornece um timestamp;
`saveCallLogOperation` em `src/lib/usage/callLogs.ts` predefine o timestamp como o momento da
escrita (conclusão). Por isso, a exportação define end como o timestamp da linha e start como
end − duration (milissegundos, convertidos em nanossegundos decimais). Os timestamps históricos
fornecidos pelo chamador também são preservados como o tempo end; não existe um discriminador
por linha entre início/conclusão. Uma duração nula torna-se zero. Timestamps inválidos/em falta
fazem falhar o lote, em vez de criarem spans não determinísticos. `ttftMs` aceita nulos e é
mapeado para `omniroute.ttft_ms`.

Os atributos incluem `gen_ai.operation.name="chat"`, fornecedor, modelo pedido/de resposta,
tokens de entrada/saída, tokens opcionais de leitura/criação de cache/raciocínio, estado HTTP,
combo, origem da cache, etiqueta de sessão e ID de correlação. Os valores inteiros OTLP e os
timestamps são strings decimais; as strings, booleanos e números fracionários utilizam as suas
variantes de valor OTLP nativas. Os spans de erro têm estado ERROR e uma mensagem de estado
sanitizada. O registo canónico não contém o URL do host upstream, pelo que `server.address` é
omitido em vez de identificar incorretamente o collector como o servidor do modelo. O custo não
é exportado.

Apenas `includeBodies=true` hidrata o conteúdo. Com `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` transportam o JSON sanitizado do corpo do
pedido/resposta tal como armazenado pelo OmniRoute (canonicizado quando analisável), e não um
array de mensagens semconv remodelado. Os corpos truncados/não JSON permanecem como texto bruto.
Com `langfuseMapping=true`, os corpos são emitidos apenas como
`langfuse.observation.input` / `langfuse.observation.output`; os atributos
`gen_ai.*.messages` são omitidos para que cada corpo seja enviado uma vez. Ambos os modos
herdam `maxBodyBytes` do caminho de hidratação existente;
`omniroute.bodies_truncated=true` assinala o truncamento.
Este destino não adiciona snapshots de pipeline nem leituras de artefactos não sanitizados;
a captura opcional de cabeçalhos do pedido utiliza o snapshot de cliente hidratado existente
descrito abaixo. Utilize uma cadência ao nível dos minutos, como
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, ao exportar corpos, em vez de acumular um backlog
horário.

### Cabeçalhos opcionais do pedido do cliente

A captura de cabeçalhos está **desativada por predefinição**. Defina `requestHeaderAllowlist` na configuração do destino
e ative **Export prompts and responses** (`includeBodies: true` no destino).
A allowlist aceita um array da API ou uma área de texto com nomes separados por linhas novas/vírgulas:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Os nomes correspondem sem distinção entre maiúsculas e minúsculas e exatamente, exceto quando um único `*` terminal seleciona um prefixo não vazio do nome do cabeçalho. `*` isolado, curingas incorporados e nomes de cabeçalho HTTP inválidos são rejeitados. Existem no máximo 64 seletores, cada um com um nome/prefixo de, no máximo, 256 bytes ASCII. Esta definição é independente de `headers`, que autentica o exportador junto do coletor.

A captura lê apenas `pipeline_client_request`, preenchido a partir de `clientRawRequest` (ou do legado `clientRequest`) do pipeline detalhado guardado. Nunca recorre aos cabeçalhos do pedido do fornecedor. O registo detalhado do pipeline tem de ter sido ativado quando o pedido foi registado. Com `includeBodies` desativado, ou quando o JSON do instantâneo do cliente está em falta, corrompido ou truncado, não são emitidos atributos de cabeçalho. Aumentar `maxBodyBytes` pode evitar o truncamento do instantâneo no momento da exportação; não pode restaurar detalhes que nunca foram guardados. Um instantâneo com mais de 1 MiB ou com mais de 256 entradas de cabeçalho é ignorado. A exportação existente de prompts/respostas continua ativada juntamente com a captura de cabeçalhos; a lista de permissões não fornece um modo de hidratação apenas de cabeçalhos.

Os valores selecionados tornam-se matrizes de strings OTLP `http.request.header.<full lowercase header name>`, mesmo quando existe apenas uma string. Por exemplo, `X-OmniRoute-Meta-Team: example-team` torna-se `http.request.header.x-omniroute-meta-team` com
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
O prefixo completo é preservado: estes são cabeçalhos comuns, sem análise de campos de negócio nem conversão para `omniroute.metadata.*` / metadados do Langfuse. `langfuseMapping` não altera a semântica dos cabeçalhos. Um `User-Agent` selecionado com um único valor também define o escalar padrão `user_agent.original`. As vírgulas dentro de um valor não são divididas. As variantes de maiúsculas e minúsculas são combinadas pela ordem das entradas guardadas; qualquer variante inválida omite o cabeçalho completo. Os atributos são ordenados pelo nome em minúsculas.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, cabeçalhos de chaves de API, nomes que contenham marcadores de autenticação/token/segredo/palavra-passe/credencial e credenciais internas do gateway são sempre excluídos, mesmo quando selecionados ou parcialmente mascarados no armazenamento. Os padrões de credenciais conhecidos reutilizam o detetor de credenciais partilhado; os marcadores de redação são omitidos e não são exportados como valores seguros. Apenas strings e matrizes de strings não vazias são aceites; não são feitas conversões de números ou objetos. Nomes inválidos, chaves de protótipo, caracteres de controlo (exceto tabulação horizontal) e Unicode malformado são ignorados sem causar a falha do lote nem refletir o seu conteúdo nos erros.

Cada span captura, no máximo, 32 cabeçalhos, 16 valores por cabeçalho, 4096 bytes UTF-8 por valor e 16384 bytes UTF-8 no total entre os nomes e valores dos cabeçalhos capturados. Os cabeçalhos demasiado grandes ou inválidos são omitidos na totalidade, não truncados. A seleção é uma decisão de privacidade do operador: nomes aparentemente seguros podem ainda conter dados pessoais, e estes limites/detetores não são um mecanismo geral de remoção de PII.

### Limites de entrega

Os pedidos estão limitados a 500 spans e 4 MiB de JSON UTF-8, incluindo o envelope. Cada span permitido é verificado quanto ao tamanho antes do primeiro pedido de um lote de cursor. Um span individual maior do que o limite não envia qualquer parte desse lote e falha com instruções para reduzir `maxBodyBytes`; não é silenciosamente descartado. A pré-verificação retém apenas referências aos registos e contagens de bytes, descartando cada span/JSON temporário; os spans são reconstruídos em blocos limitados, em vez de manter uma segunda cópia serializada do lote. Os erros HTTP 408/429/5xx, as falhas de rede e os tempos limite têm, no máximo, três tentativas, com recuo exponencial de 250/500 ms. Os segundos de `Retry-After` ou as datas HTTP podem prolongar um atraso até 5 segundos. Os restantes estados falham imediatamente. Uma rejeição parcial OTLP 2xx também gera um erro, em vez de confirmar um span perdido; confirmações JSON vazias ou válidas são aceites, com um limite de leitura da resposta de 64 KiB.

Os erros contêm apenas factos pertencentes ao exportador: estado HTTP, classe de nova tentativa, número de tentativas e contagens de spans enviados, ou uma mensagem fixa de falha de confirmação/rede. Os corpos das respostas do coletor, as contagens de sucesso parcial e os cabeçalhos de resposta nunca são copiados para erros, registos ou o painel. Um lote com falhas ou parcialmente aceite não é confirmado: o destino apresenta o estado Com falhas com esse estado, o cursor permanece no último lote confirmado e a execução seguinte reenvia as mesmas linhas. Os estados permanentes continuam a falhar até que o coletor ou a configuração sejam corrigidos. Utilize os próprios registos do coletor para obter detalhes da resposta. Os resumos de erros do registo de chamadas mantêm a sua redação independente.
`prepare()` não aprovisiona nada; Testar publica exatamente `{"resourceSpans":[]}` e comunica o estado HTTP sem escrever spans no registo de chamadas.

Os IDs de trace e os IDs de span são os primeiros 32/16 dígitos hexadecimais de SHA-256 sobre
`"omniroute.trace\\0" + callLogId` e `"omniroute.span\\0" + callLogId`. Os reenvios transportam IDs idênticos. Isto não constitui uma garantia de desduplicação: alguns backends, incluindo a ingestão v4 do Langfuse, não desduplicam spans com o mesmo ID. Uma falha do processo ou uma falha parcial de um bloco pode reenviar, no máximo, o único lote de cursor não confirmado; todo esse lote pode ser duplicado, não apenas o seu último bloco HTTP. Tenha esse compromisso em consideração ao escolher o tamanho do lote do cursor.

### Exemplo de Langfuse

Configure estes campos para uma instância do Langfuse autoalojada:

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

Construa localmente o valor de Authorization como Base64 da string literal `public-key:secret-key`
(por exemplo, com `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Não introduza credenciais reais em registos, capturas de ecrã ou issues. O mapeamento define automaticamente
`x-langfuse-ingestion-version: 4`; Authorization continua a ser fornecido em `headers`.
Tanto os cabeçalhos como o salt de identidade gerado utilizam o mecanismo existente de campos secretos encriptados e os marcadores de posição da API; `STORAGE_ENCRYPTION_KEY` é obrigatório.

O mapeamento adiciona o tipo/modelo de geração, detalhes de utilização de JSON (entrada/saída/total e chaves de cache disponíveis), instantâneos de entrada/saída JSON, nível ERROR/DEFAULT, mensagem de estado sanitizada, nome do trace, ID da sessão, ambiente opcional e `langfuse.observation.metadata.<key>` filtrável para o fornecedor, modelo solicitado, caminho, combinação, origem da cache e estado. `langfuse.observation.completion_start_time` é definido em ISO 8601 no início + TTFT apenas quando o TTFT é conhecido e está dentro da duração. Não são enviados atributos de custo.

Os modos de identidade aplicam-se a `langfuse.user.id`:

- `pseudonymous` (predefinido): HMAC-SHA256 do ID interno da chave da API com um salt aleatório de 32 bytes por destino. O salt é gerado na criação, caso esteja ausente, encriptado como `identitySalt`, nunca é devolvido e é mantido durante as edições. Os IDs brutos das chaves nunca são colocados nos atributos dos spans. Recriar ou rodar o salt de um destino altera as identidades.
- `keyName`: o nome configurado da chave da API, revelando intencionalmente essa etiqueta do operador.
- `none`: nenhum ID de utilizador. As etiquetas de sessão continuam a ser exportadas quando presentes; estes modos não anonimizam conteúdo arbitrário de prompts nem etiquetas de sessão/correlação fornecidas pelo operador.

### Começar sem preenchimento retroativo

Apenas na criação, ative **Começar na posição atual (ignorar registos existentes)** ou passe `startFromCurrentPosition: true` no nível superior do payload da API de criação. Isto inicializa `cursor_row_id` para o rowid máximo atual dos registos de chamadas retidos, utilizando os auxiliares de cursor existentes, sem uma migração. O valor predefinido é false (cursor 0 e preenchimento retroativo do histórico retido). Não é uma definição de reposição do cursor em atualizações.

A adição partilhada de `ttftMs` também adiciona uma coluna anulável `ttft_ms` ao mapeador do BigQuery e ao esquema de novas tabelas: o teste do esquema exige que todos os campos de registo canónicos tenham uma coluna. As tabelas existentes continuam a exportar sem alterações: `prepare()` lê o esquema da tabela e omite apenas `ttft_ms` quando essa coluna está ausente. Adicione a coluna INT64 anulável para obter o TTFT na próxima execução ou utilize uma tabela nova. A coluna TTFT opcional não desencadeia uma atualização do esquema. As colunas de evidências de utilização seguem abaixo o fluxo condicional de compatibilidade com adesão explícita; os restantes campos das linhas mantêm a verificação rigorosa do esquema.

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

## 7. Operação

- **Painel**: Integrações → Exportação de registos. Adicione um destino, execute **Testar** para verificar as credenciais
  sem escrever linhas e, em seguida, ative-o.
- **Backlog**: cada cartão de destino mostra as linhas pendentes e o cursor; `GET
/api/log-export/status` devolve os mesmos valores, além das últimas 20 execuções de tarefas.
- **Uma falha num destino não faz falhar os restantes** — o resumo da execução regista o
  estado por destino em `last_status` / `last_error`, e o histórico de execuções de tarefas mantém o agregado.
- **A eliminação de um destino elimina o respetivo cursor.** Ao adicioná-lo novamente, começa
  pelo registo de chamadas retido mais antigo, reenviando linhas que o destino poderá já conter. No BigQuery, o
  `insertId` por linha apenas absorve esta situação dentro da própria janela de desduplicação do BigQuery; por isso, prefira
  desativar um destino a eliminá-lo.

### Compatibilidade do esquema de evidências de utilização

As novas tabelas do BigQuery incluem `usage_evidence` anulável (STRING contendo JSON) e
`usage_estimated` (BOOL). Com `autoCreate` ativado, uma tabela existente pode receber
apenas estas colunas anuláveis em falta. O exportador preserva o esquema existente completo, incluindo os metadados dos campos,
e envia um PATCH condicional utilizando o etag devolvido. Uma alteração simultânea ao esquema faz falhar a exportação em vez de
o substituir; a execução seguinte lê novamente a tabela.

Com `autoCreate` desativado, adicione estas colunas manualmente antes de exportar registos
com evidências de utilização. A ausência de metadados do esquema/etag ou uma atualização falhada também impede inserções que contenham evidências. O cursor de exportação não avança aquando dessa falha e as evidências nunca são silenciosamente descartadas. A retenção de registos local continua a aplicar-se enquanto uma exportação estiver bloqueada, por isso resolva a falha antes de expirarem as linhas de origem retidas.
