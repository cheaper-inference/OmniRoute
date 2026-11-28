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

- **Horário** — um cron job `JobRegistry`, `log_export`, padronizado como `0 * * * *` (por hora, UTC). Registado no `src/lib/initCloudSync.ts`; substituível por `OMNIROUTE_LOG_EXPORT_CRON`. Cada carraça drena cada** habilitado** destino, sequencialmente.
- **Cursor** — SQLite implícito `call_logs.rowid`, persistido por destino em `log_export_destinations.cursor_row_id`. `timestamp` não é deliberadamente o cursor: os chamadores podem fornecer o seu próprio valor, pelo que um pedido lento pode ser escrito após um pedido mais rápido iniciado posteriormente, e um cursor de registo de data e hora ignoraria.
- **Lote** linhas — `batch_size` por pedido (padrão 500), linhas `max_rows_per_run` por execução (padrão 10000), pelo que um grande backlog drena vários ticks em vez de bloquear um.
- **Entrega** — o cursor avança apenas após `send()` ser resolvido. Um lote com falha deixa o cursor onde estava, para que as mesmas linhas sejam repetidas na execução seguinte. A garantia é pelo menos uma vez mais a desduplicação no destino, não é verdade exactamente uma vez: BigQuery codifica cada linha pelo ID do registo de chamadas, que respeita com base no melhor esforço dentro da sua própria janela de desduplicação.
- **Proteção de sobreposição** — o cron tick e `POST .../run` podem disparar em conjunto. Um destino já drenado é ignorado em vez de ser drenado duas vezes (`skipped: true` no resultado da execução), pelo que uma execução simultânea não pode reenviar um lote ou escrever o cursor ao contrário.
- **Limpar recuperação** — se `cursor_row_id` terminar acima de `MAX(rowid)` (toda a tabela foi eliminada e os rowids reiniciados), o executor recua para 0 em vez de ficar permanentemente cego.

### Corredor isolado e limites

Cada destino executado no Node inicia um processo filho OS separado e de curta duração (`child_process` com IPC, e não `worker_threads`). As leituras do corpo, a carga útil JSON parsing/serialization, o destino `prepare()` e a rede de destino I/O são executados aí, e não no ciclo de eventos do servidor. Apenas as mensagens de configuração e as pequenas mensagens de progresso cruzam IPC; os registos exportados nunca regressam ao servidor. O cron job e a rota Run mantêm agora o mesmo resultado público e proteção de sobreposição.

O filho abre o `DATA_DIR/storage.sqlite` resolvido somente leitura do servidor usando `node:sqlite`, com `busy_timeout=5000` e `query_only=ON`. Não importa nenhum singleton DB e não realiza migrações, backups ou atualizações SQLite. A contabilização do artefacto Missing/corrupt (incluindo o artefacto corrompido UPDATE) permanece apenas no caminho de detalhe do painel. Ambos os caminhos partilham um resolvedor de detalhes puro; a exportação utiliza leituras assíncronas do sistema de ficheiros e o mesmo artefacto → legado inline → disco legado → sem ordem de resolução. Uma execução captura o rowid de inserção máximo quando o filho abre o seu leitor; inserções posteriores aguardam a próxima execução. Este é um limite de inserção, não uma transação SQLite de longa duração: os gravadores e os pontos de verificação WAL permanecem livres durante as esperas da rede. Updates/deletions de linhas existentes não são congeladas por este limite.

Após cada lote aceite, a criança aguarda uma confirmação. O servidor primeiro persiste o cursor com `advanceLogExportCursor` e depois envia `ack`; nenhum lote seguinte começa antes dele. Uma falha de envio, bloqueio ou tempo limite regista a falha sem avançar o lote. Os lotes previamente reconhecidos mantêm-se confirmados; no máximo, o lote não confirmado poderá ser reenviado. O sucesso é registado apenas após `done` e uma saída filho limpa. As falhas terminam o filho com SIGTERM, aumentando para SIGKILL após 500 ms, e o executor aguarda o fecho do processo.

| Variável de ambiente                          | Predefinição | Finalidade                              |
| --------------------------------------------- | ------------ | --------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000       | Limite de relógio de parede por destino |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024         | Limite de espaço antigo filho V8 em MB  |

Os valores Invalid/non-positive/non-integer utilizam os padrões. A configuração do heap não é um limite total RSS ; lotes demasiado grandes ainda podem esgotar a memória filha e falhar a execução em segurança. O padrão 1024 MB deixa espaço para o lote padrão de 500 linhas de 512 artefactos KiB com corpos habilitados, incluindo a serialização JSON fragmentada em bytes de BigQuery. Isto não torna seguro um lote de corpos de 10.000 linhas. O esgotamento de heap V8 regista uma falha acionável: diminuir o tamanho do lote ou aumentar `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; o cursor permanece no último lote reconhecido. Os corpos inline/disk históricos não estão abrangidos pelo limite de artefacto moderno. Os operadores devem orçamentar RSS separadamente, especialmente dentro de contentores com memória limitada.

O filho herda apenas `DATA_DIR`, `NODE_ENV`, `TZ` explícito (resolução de tempo local de nome de ficheiro legado), `ELECTRON_RUN_AS_NODE` quando presente e as seguintes entradas de saída: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (e as suas formas minúsculas), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Um despachante Undici global partilha a resolução de proxy de ambiente puro do servidor e as regras de desvio de host local, incluindo `NO_PROXY`; ele não importa `proxyFetch.ts` ou os seus sinalizadores DB/feature. As credenciais de proxy são editadas a partir da saída encaminhada e dos erros registados. As credenciais de destino apenas viajam numa mensagem start IPC, nunca em argv ou ambiente; o encaminhamento output/error é prefixado e higienizado. Apenas `ExperimentalWarning` é desativado nos argumentos exec filhos para evitar a repetição do aviso SQLite do Node a cada execução do cron; outros tipos de aviso permanecem visíveis.

Os módulos de destino devem ser importáveis sem dependências Next.js/server-only. A implementação existente BigQuery já cumpre este contrato. Os caches de tokens de acesso duram apenas para a execução secundária, e não entre execuções. Node é o tempo de execução compatível (mecanismos `package.json` ). Existe um caminho de compatibilidade Bun de melhor esforço e não suportado (`bun:sqlite` em `src/lib/db/core.ts` / adaptadores e `Dockerfile.bun`), pelo que as exportações não devem ser interrompidas no mesmo. Em Bun, as exportações mantêm o caminho anterior do processo e emitem um aviso único: o isolamento filho heap/timeout não está disponível. Utilize o Node para o loop de eventos e isolamento OOM.

Quando `includeBodies` estiver ativado, prefira uma cadência de nível de minuto, como `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, em vez de acumular uma lista de pendências de carga útil por hora. Os limites de lote e de linha ainda limitam cada execução. A inicialização do processo é paga por destino, por execução; isto representa um pequeno custo inicial para o isolamento do loop de eventos do servidor, e não redução da utilização total CPU.

### Encargos úteis (prompts e conclusões)

By default the export carries only the summary fields the Logs **list** shows. Turning on **Export prompts and responses** (`includeBodies`) additionally ships what the Logs **detail** pane shows for each call:

| Campo                            | O que contém                                                    |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | As cargas úteis da chamada à medida que o painel as renderiza   |
| `pipeline_route_decision`        | Qual o alvo e modelo que o router escolheu                      |
| `pipeline_client_request`        | A solicitação bruta exatamente como o cliente a enviou          |
| `pipeline_openai_request`        | Após a tradução para a forma OpenAI interna                     |
| `pipeline_provider_request`      | Como realmente enviado upstream, no dialecto do fornecedor      |
| `pipeline_provider_response`     | A resposta upstream bruta                                       |
| `pipeline_client_response`       | O que foi devolvido ao chamador                                 |
| `pipeline_error`                 | Detalhe do erro ao nível do pipeline para uma chamada com falha |
| `bodies_truncated`               | Verdadeiro quando qualquer campo acima atinge `maxBodyBytes`    |

Este é um conteúdo imediato, pelo que é** desativado por defeito** e deliberadamente uma escolha por destino. O que vem é o que o painel mostra, porque o export e `getCallLogById` partilham a resolução de detalhes: as cargas úteis já são higienizadas com PII e editadas em segredo quando são gravadas, e uma chamada feita com uma chave `noLog` API não armazena qualquer carga útil, pelo que não há nada para exportar.

As cargas úteis são lidas por linha do artefacto do sistema de ficheiros, pelo que a hidratação só é executada para destinos que a solicitaram. Um artefacto em falta ou corrompido exporta o seu resumo com cargas nulas em vez de falhar no lote e bloquear o cursor.

`maxBodyBytes` (default 262144) caps each field. Longer payloads are **truncated rather than dropped** — a clipped prompt still answers "what was asked" — and the row is flagged with `bodies_truncated`. Streamed chunk-by-chunk deltas are not exported; the assembled response is already in `pipeline_provider_response` and `pipeline_client_response`.

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
