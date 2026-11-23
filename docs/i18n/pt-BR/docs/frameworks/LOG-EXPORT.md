# Log export (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Exportação contínua e incremental dos logs de chamadas do OmniRoute para um repositório externo de análises.

A aba Logs do painel mantém o histórico de requisições no SQLite (`call_logs`), limitado por
rotação e retenção. A exportação de logs envia o mesmo conjunto de registros de acordo com um agendamento para que ele possa sobreviver
ao banco de dados local e ser combinado com outros dados. O BigQuery é o primeiro destino; o
pipeline é um registro, portanto outros destinos podem ser adicionados.

---

## 1. Como funciona

```
servidor (descriptografa + valida a configuração, reconcilia o cursor)
  → inicia IPC → processo isolado exportChild do SO
    → storage.sqlite somente leitura → consulta/mapeamento compartilhado do registro de chamadas
      → hidratação assíncrona de artefatos → prepare()/send() do destino
        → IPC do lote → servidor persiste o cursor → IPC de confirmação
          → próximo lote; IPC de conclusão → servidor registra o sucesso
```

- **Agendamento** — um trabalho cron do `JobRegistry`, `log_export`, com o padrão `0 * * * *` (a cada hora,
  UTC). Registrado em `src/lib/initCloudSync.ts`; pode ser substituído por `OMNIROUTE_LOG_EXPORT_CRON`.
  Cada execução processa sequencialmente todos os destinos **habilitados**.
- **Cursor** — o `call_logs.rowid` implícito do SQLite, persistido por destino em
  `log_export_destinations.cursor_row_id`. `timestamp` deliberadamente não é o cursor: os chamadores
  podem fornecer seu próprio valor, portanto uma solicitação lenta pode ser gravada depois de outra mais rápida que começou
  posteriormente, e um cursor de timestamp a ignoraria.
- **Processamento em lotes** — `batch_size` linhas por solicitação (padrão 500), `max_rows_per_run` linhas por execução
  (padrão 10000), para que um grande acúmulo seja processado ao longo de várias execuções, em vez de bloquear uma única.
- **Entrega** — o cursor avança somente depois que `send()` é resolvido. Um lote com falha deixa o
  cursor onde estava, portanto as mesmas linhas são tentadas novamente na próxima execução. A garantia é
  de pelo menos uma vez, mais a desduplicação no destino, e não de exatamente uma vez de fato: o BigQuery identifica cada
  linha pelo ID do registro de chamadas, que ele respeita com base no melhor esforço dentro de sua própria janela de desduplicação.
- **Proteção contra sobreposição** — a execução cron e `POST .../run` podem ocorrer juntas. Um destino
  que já está sendo processado é ignorado, em vez de ser processado duas vezes (`skipped: true` no resultado da execução),
  portanto uma execução simultânea não pode reenviar um lote nem retroceder o cursor.
- **Recuperação após limpeza** — se `cursor_row_id` ficar acima de `MAX(rowid)` (a tabela inteira foi
  limpa e os rowids foram reiniciados), o executor retrocede para 0, em vez de ficar permanentemente sem detectar novas linhas.

### Executor isolado e limites

Cada execução de destino no Node inicia um processo filho separado e de curta duração do SO (`child_process`
com IPC, não `worker_threads`). Leituras de corpos, análise/serialização do JSON da carga, o
`prepare()` do destino e a E/S de rede do destino são todos executados nele, não no loop de eventos do servidor.
Somente a configuração e pequenas mensagens de progresso passam pelo IPC; os registros exportados nunca retornam ao
servidor. O trabalho cron e a rota Executar agora mantêm o mesmo resultado público e a mesma proteção contra sobreposição.

O processo filho abre o `DATA_DIR/storage.sqlite` resolvido do servidor no modo somente leitura usando `node:sqlite`,
com `busy_timeout=5000` e `query_only=ON`. Ele não importa nenhum singleton de banco de dados e não realiza
migrações, backups nem atualizações do SQLite. A escrituração de artefatos ausentes/corrompidos (incluindo o
UPDATE de artefato corrompido) permanece apenas no caminho de detalhes do painel. Ambos os caminhos compartilham um
resolvedor de detalhes puro; a exportação usa leituras assíncronas do sistema de arquivos e a mesma ordem de resolução
artefato → inline legado → disco legado → nenhum. Uma execução captura o rowid máximo de inserção
quando o processo filho abre seu leitor; inserções posteriores aguardam a próxima execução. Esse é um limite de
inserção, não uma transação SQLite de longa duração: gravadores WAL e checkpoints permanecem livres durante
esperas de rede. Atualizações/exclusões de linhas existentes não são congeladas por esse limite.

Após cada lote aceito, o processo filho aguarda uma confirmação. Primeiro, o servidor persiste
o cursor com `advanceLogExportCursor` e, em seguida, envia `ack`; nenhum novo lote é iniciado antes disso.
Uma falha no envio, uma falha do processo ou um timeout registra a falha sem avançar esse lote. Os lotes
confirmados anteriormente permanecem efetivados; no máximo, o único lote não confirmado pode ser reenviado.
O sucesso é registrado somente após `done` e uma saída limpa do processo filho. As falhas encerram o processo filho
com SIGTERM, escalando para SIGKILL após 500 ms, e o executor aguarda o encerramento do processo.

| Variável de ambiente                          | Padrão | Finalidade                                         |
| --------------------------------------------- | ------ | -------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Limite de tempo decorrido por destino              |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | Limite de old-space do V8 no processo filho, em MB |

Valores inválidos, não positivos ou não inteiros usam os padrões. A configuração de heap não é um limite total de
RSS; lotes muito grandes ainda podem esgotar a memória do processo filho e fazer com que a execução falhe com segurança.
O padrão de 1024 MB deixa margem para o lote padrão de 500 linhas com artefatos de 512 KiB e
corpos habilitados, incluindo a serialização JSON em blocos de bytes do BigQuery. Isso não torna seguro um
lote de corpos com 10000 linhas. O esgotamento do heap do V8 registra uma falha que permite ação corretiva: reduza o tamanho
do lote ou aumente `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; o cursor permanece no último
lote confirmado. Corpos históricos inline/em disco não são cobertos pelo limite moderno de artefatos.
Os operadores devem dimensionar o RSS separadamente, especialmente em contêineres com memória limitada.

O processo filho herda apenas o `DATA_DIR` resolvido, `NODE_ENV`, o `TZ` explícito (resolução por horário
local de nomes de arquivos legados), `ELECTRON_RUN_AS_NODE` quando presente e as seguintes entradas de saída:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (e suas formas em letras minúsculas),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Um dispatcher global do Undici compartilha a resolução pura de proxy por ambiente do servidor e as regras de desvio
para hosts locais, incluindo `NO_PROXY`; ele não importa `proxyFetch.ts` nem seus sinalizadores de banco de dados/recursos.
As credenciais de proxy são ocultadas da saída encaminhada e dos erros registrados. As credenciais do destino
trafegam somente em uma mensagem IPC de inicialização, nunca em argv nem no ambiente; o encaminhamento de saída/erros
recebe um prefixo e é sanitizado. Somente `ExperimentalWarning` é desabilitado nos argumentos de execução do processo filho para evitar
a repetição do aviso do SQLite do Node a cada execução cron; os outros tipos de aviso permanecem visíveis.

Os módulos de destino devem poder ser importados sem dependências exclusivas do Next.js/servidor. A implementação existente do
BigQuery já atende a esse contrato. Os caches de tokens de acesso duram apenas durante a execução
filha, não entre execuções. Node é o runtime compatível (`package.json` engines), mas a seção de
instalação do Bun no README e o `Dockerfile.bun` também divulgam um caminho de compatibilidade
para produção usando `bun:sqlite` (`src/lib/db/core.ts` / adaptadores). Portanto, no Bun, as
exportações mantêm o caminho anterior no processo e emitem um aviso uma única vez: o isolamento
de heap/timeout do processo filho não está disponível. Use Node para isolamento do loop de eventos
e de OOM; o Bun não é tratado aqui como exclusivo para desenvolvimento.

Quando `includeBodies` estiver habilitado, prefira uma cadência em nível de minutos, como
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, em vez de acumular um backlog de payloads por uma hora.
Os limites de lote e de linhas ainda restringem cada execução. O custo de inicialização do processo
é incorrido por destino, a cada execução; isso troca um pequeno custo de inicialização pelo
isolamento do loop de eventos do servidor, não pela redução do uso total de CPU.

### Payloads (prompts e conclusões)

Por padrão, a exportação contém apenas os campos de resumo exibidos pela **lista** de Logs. Ativar
**Exportar prompts e respostas** (`includeBodies`) também envia o que o painel de **detalhes**
de Logs mostra para cada chamada:

| Campo                            | O que contém                                                     |
| -------------------------------- | ---------------------------------------------------------------- |
| `request_body` / `response_body` | Os payloads da chamada conforme renderizados pelo dashboard      |
| `pipeline_route_decision`        | Qual destino e modelo o roteador escolheu                        |
| `pipeline_client_request`        | A solicitação bruta exatamente como o cliente a enviou           |
| `pipeline_openai_request`        | Após a tradução para o formato interno do OpenAI                 |
| `pipeline_provider_request`      | Como foi realmente enviada ao upstream, no dialeto do provedor   |
| `pipeline_provider_response`     | A resposta upstream bruta                                        |
| `pipeline_client_response`       | O que foi devolvido ao chamador                                  |
| `pipeline_error`                 | Detalhes do erro no nível do pipeline para uma chamada com falha |
| `bodies_truncated`               | Verdadeiro quando qualquer campo acima atingiu `maxBodyBytes`    |

Isso é conteúdo de prompt, portanto fica **desativado por padrão** e é deliberadamente uma escolha
por destino. O que é enviado corresponde ao que o dashboard mostra, pois a exportação e
`getCallLogById` compartilham a resolução dos detalhes: os payloads já têm as PII sanitizadas e os
segredos ocultados quando são gravados, e uma chamada feita com uma chave de API `noLog` não
armazena nenhum payload, portanto não há nada para exportar.

Os payloads são lidos por linha a partir do artefato no sistema de arquivos, portanto a hidratação
só é executada para os destinos que a solicitaram. Um artefato ausente ou corrompido exporta seu
resumo com payloads nulos, em vez de causar falha no lote e deixar o cursor travado.

`maxBodyBytes` (padrão 262144) limita cada campo. Payloads mais longos são **truncados em vez de
descartados** — um prompt cortado ainda responde à pergunta "o que foi solicitado" — e a linha é
marcada com `bodies_truncated`. Deltas transmitidos em streaming, parte por parte, não são
exportados; a resposta montada já está em `pipeline_provider_response` e
`pipeline_client_response`.

---

## 2. Arquivos

| Componente                        | Localização                                  |
| --------------------------------- | -------------------------------------------- |
| Contrato de destino               | `src/lib/logExport/types.ts`                 |
| Registro                          | `src/lib/logExport/registry.ts`              |
| Gerenciamento de segredos         | `src/lib/logExport/secrets.ts`               |
| Executor (IPC pai)                | `src/lib/logExport/runner.ts`                |
| Ciclo de vida do processo         | `src/lib/logExport/childRunner.ts`           |
| Entrada do processo filho         | `src/lib/logExport/exportChild.ts`           |
| Abertura somente leitura          | `src/lib/db/logExportReadOnly.ts`            |
| Consulta/mapeamento compartilhado | `src/lib/usage/callLogExportQueries.ts`      |
| Resolvedor de detalhes            | `src/lib/usage/callLogDetailResolver.ts`     |
| Projeção da API                   | `src/lib/logExport/presenter.ts`             |
| Destino do BigQuery               | `src/lib/logExport/destinations/bigquery.ts` |
| Autenticação de SA do Google      | `src/lib/logExport/googleServiceAccount.ts`  |
| Fonte do registro de chamadas     | `src/lib/usage/callLogExportSource.ts`       |
| Persistência                      | `src/lib/db/logExportDestinations.ts`        |
| Tarefa cron                       | `src/lib/jobs/logExportJob.ts`               |
| Camada REST                       | `src/app/api/log-export/`                    |
| Página do painel                  | `src/app/(dashboard)/dashboard/log-export/`  |

Esquema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Todas as rotas exigem autenticação de gerenciamento (`requireManagementAuth`). Os segredos nunca são retornados:
um segredo armazenado é retornado como o literal `__stored__`, e enviar esse valor de volta em uma atualização
mantém a credencial armazenada.

Criar ou atualizar um destino cujo tipo declara um segredo **requer
`STORAGE_ENCRYPTION_KEY`**. Sem ela, `encrypt()` é um passthrough silencioso; portanto, a gravação é
recusada com um erro 400, em vez de armazenar uma credencial em texto simples no SQLite (a mesma proteção
aplicada pelo webhook do Telegram).

| Método   | Caminho                                  | Finalidade                                              |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipos de destino + lista de campos de configuração      |
| `GET`    | `/api/log-export/destinations`           | Lista destinos (segredos ocultados)                     |
| `POST`   | `/api/log-export/destinations`           | Cria um destino                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | Consulta um destino                                     |
| `PUT`    | `/api/log-export/destinations/{id}`      | Atualiza nome / habilitação / configuração / lotes      |
| `DELETE` | `/api/log-export/destinations/{id}`      | Exclui                                                  |
| `POST`   | `/api/log-export/destinations/{id}/test` | Testa credenciais sem gravar nada                       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Esvazia agora, pelo mesmo fluxo da execução agendada    |
| `GET`    | `/api/log-export/status`                 | Estado do cron, execuções recentes, backlog por destino |

`GET /api/log-export/types` é o que torna a interface genérica: o formulário do painel é renderizado a partir
dos descritores de campo retornados; portanto, um novo destino não exige alterações na interface.

---

## 4. Destino BigQuery

Chaves de configuração (`type: "bigquery"`):

| Chave                | Observações                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `projectId`          | Projeto do GCP que contém o conjunto de dados                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                                               |
| `location`           | Usada somente quando o conjunto de dados precisa ser criado (padrão `EU`)     |
| `serviceAccountJson` | Chave da conta de serviço. Segredo: criptografada em repouso, nunca retornada |
| `autoCreate`         | Cria o conjunto de dados e a tabela na primeira exportação (padrão `true`)    |

A conta de serviço precisa de `bigquery.tables.updateData` na tabela de destino, além de
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` está habilitado.

Um lote configurado é uma unidade de **cursor**, não uma unidade HTTP: `send()` o divide em chamadas insertAll
de no máximo 500 linhas, de modo que um `batch_size` grande não ultrapasse o limite de 10 MB por requisição
do BigQuery. Status transitórios (408/429/500/502/503/504) são tentados novamente até três vezes, com backoff
exponencial e reutilizando os mesmos insertIds; falhas de autenticação e de esquema lançam uma exceção na
primeira tentativa, em vez de desperdiçar a execução.

Uma tabela criada há poucos instantes ainda não está visível para o endpoint de streaming, que responde
com 404 por alguns segundos. Esse 404 é tentado novamente, mas **somente quando esta execução criou a tabela** —
uma tabela realmente ausente continua falhando imediatamente. Observe que recriar uma tabela com um nome que
foi excluído recentemente faz o BigQuery recusar inserções por streaming durante vários minutos; essa é uma
característica da operação de excluir e recriar, portanto prefira um novo nome de tabela em vez de remover e
adicionar novamente uma tabela.

**Uma falha parcial chega como HTTP 200 com um `insertErrors[]` não vazio.** Isso é tratado como
falha e lança uma exceção, impedindo que o cursor avance além das linhas que o BigQuery não
aceitou; `tests/unit/log-export-bigquery.test.ts` garante esse comportamento.

O transporte usa REST simples — uma asserção RS256 autoassinada é trocada por um token de acesso em
`https://oauth2.googleapis.com/token`, e depois as linhas são enviadas para `tabledata.insertAll`. Nenhum SDK
do Google é incluído. Os tokens de acesso são armazenados em cache no processo por (conta de serviço, escopo).

A tabela criada contém uma coluna para cada campo da aba Logs, além de `exported_at`, e é estruturada de acordo
com a forma como os logs de chamadas são realmente consultados:

- **Particionada por dia em `timestamp`**, para que uma consulta limitada por data examine apenas esses dias.
- **Clusterizada por `api_key_name`, `provider`, `model`, `status`** (nessa ordem), de modo que filtrar por
  quem executou, para onde foi ou se houve falha elimine blocos dentro de cada partição. O BigQuery
  permite no máximo quatro colunas de clusterização, e a ordem importa: um filtro somente por `api_key_name`
  elimina blocos; um filtro somente por `status` não.
- **Retenção opcional de partições** por meio de `partitionExpirationDays` (0 mantém tudo), aplicada
  quando a tabela é criada.

Ambas as configurações são aplicadas no momento da criação. Uma tabela existente mantém o layout que já possui, portanto
aponte o destino para um novo id de tabela se quiser adotá-las.

`tests/unit/log-export-bigquery.test.ts` garante que o mapeador e o esquema da tabela permaneçam
sincronizados, para que uma nova coluna de log de chamadas não seja descartada silenciosamente durante a exportação.

Os lotes são divididos tanto pela contagem de linhas quanto pelos bytes serializados. Apenas a contagem de linhas não é suficiente
quando os payloads são exportados: 500 linhas contendo prompts podem totalizar dezenas de megabytes, e insertAll
rejeita uma solicitação com mais de 10 MB. Os blocos são fechados ao atingir 500 linhas ou 9 MB, o que ocorrer primeiro.

---

## 5. Adicionando um destino

1. Crie `src/lib/logExport/destinations/<name>.ts` exportando um `LogExportDestinationType`:
   um `configSchema` do Zod, um array descritor `fields` para a interface, `secretFields` e uma
   função `createClient(config)` que retorne `test()` / `prepare()` / `send(records)`.
2. Adicione-o ao array `DESTINATIONS` em `src/lib/logExport/registry.ts`.
3. Escreva testes em `tests/unit/`.

Essa é toda a alteração necessária: a persistência, a tarefa cron, a camada REST, a criptografia de segredos e o
formulário do painel usam o registro.

Duas regras para um novo destino:

- `send()` **deve lançar uma exceção** em caso de falha parcial. Ser resolvido significa que "o destino contém estas linhas",
  e o cursor avança permanentemente para além delas.
- Um destino que aceite uma URL fornecida pelo usuário deve validá-la por meio de
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) antes de realizar a solicitação,
  da mesma forma que os webhooks. O BigQuery não precisa disso: seus hosts são constantes.

---

## 6. Operando o recurso

- **Painel**: Integrações → Exportação de logs. Adicione um destino, execute **Testar** para verificar as credenciais
  sem gravar linhas e, em seguida, habilite-o.
- **Itens pendentes**: cada cartão de destino mostra as linhas pendentes e o cursor; `GET
/api/log-export/status` retorna os mesmos dados, além das últimas 20 execuções da tarefa.
- **Uma falha em um destino não causa falha nos demais** — o resumo da execução registra o status de cada destino
  em `last_status` / `last_error`, e o histórico de execuções da tarefa mantém os dados agregados.
- **Excluir um destino exclui seu cursor.** Adicioná-lo novamente faz com que ele comece pelo log de chamadas retido
  mais antigo, reenviando linhas que o destino talvez já contenha. No BigQuery, o `insertId` por linha
  evita duplicatas apenas dentro da janela de desduplicação do próprio BigQuery; portanto, prefira desabilitar
  um destino em vez de excluí-lo.
