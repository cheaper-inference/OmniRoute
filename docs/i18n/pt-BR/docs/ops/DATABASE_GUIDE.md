# Database Schema & Operations Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: O OmniRoute usa **SQLite com registro em WAL** como armazenamento principal, com criptografia **AES-256-GCM** em repouso para campos confidenciais. Este guia aborda o esquema, as migrações, o backup/a recuperação e os runbooks operacionais.

**Fontes:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabelas básicas)
- `src/lib/db/migrationRunner.ts` — migrações versionadas
- `src/lib/db/migrations/` — 167 arquivos SQL versionados
- `src/lib/db/encryption.ts` — utilitários de criptografia
- `src/lib/db/backup.ts` — exportação/importação de backups
- `src/lib/db/healthCheck.ts` — diagnósticos de integridade

---

## Por que SQLite?

O OmniRoute escolheu o SQLite em vez do PostgreSQL/MySQL por vários motivos:

| Fator            | SQLite                                  | PostgreSQL                                   |
| ---------------- | --------------------------------------- | -------------------------------------------- |
| **Implantação**  | Integrado — sem servidor separado       | Exige configuração de servidor               |
| **Criptografia** | Camada da aplicação (AES-256-GCM)       | TDE integrada                                |
| **Desempenho**   | Mais rápido para cargas pequenas/médias | Melhor para muitas gravações simultâneas     |
| **Concorrência** | O modo WAL permite leituras simultâneas | MVCC completo                                |
| **Backup**       | Cópia de um único arquivo               | `pg_dump` ou snapshot do sistema de arquivos |
| **Caso de uso**  | Instalação por usuário, integrado       | SaaS multilocatário                          |

Para implantações de **usuário único e instância única** (o principal caso de uso do OmniRoute), o SQLite é mais simples e rápido.

### Registro em WAL

O `core.ts` abre o banco de dados no **modo WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

O WAL permite **leituras simultâneas** durante gravações — algo importante para o painel, que executa consultas enquanto as solicitações estão sendo registradas.

O tamanho padrão do cache é de **65.536 KiB (64 MiB)**. O SQLite interpreta um
`cache_size` negativo como um limite superior aproximado em KiB e aloca páginas sob demanda.
**Configurações > Sistema e armazenamento > Tamanho do cache** aceita valores inteiros de **1 a
1.000.000 KiB**; salvar a configuração a aplica à conexão ativa com o banco de dados,
e o OmniRoute restaura o valor persistido durante a inicialização.

---

## Localização do banco de dados

O arquivo SQLite é armazenado em:

| SO      | Caminho                                                  |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (configurável via `DATA_DIR`) |

Arquivos associados:

- `storage.sqlite-wal` — log de gravação antecipada
- `storage.sqlite-shm` — arquivo de memória compartilhada
- `call_logs/` — artefatos de payload das solicitações (se habilitado)

**Substitua a localização:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arquitetura dos Módulos de Domínio

O banco de dados do OmniRoute possui **110 módulos TypeScript de nível superior** em `src/lib/db/`. Cada módulo de domínio:

- É responsável por uma ou mais tabelas específicas
- Exporta funções CRUD tipadas
- Nunca acessa as tabelas de outro módulo
- Usa `getDbInstance()` de `core.ts` para acessar o banco de dados

### Os 110 Módulos de Banco de Dados de Nível Superior

O OmniRoute possui **110 arquivos TypeScript de nível superior** em `src/lib/db/`. Abaixo está uma amostra dos módulos principais; consulte a listagem do diretório para ver a lista completa:

| Módulo                  | Tabelas                                                        | Responsabilidade                                                                              |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registro e credenciais de provedores por OAuth/chave de API                                   |
| `models.ts`             | `key_value` (dados de modelos)                                 | Definições, recursos e preços dos modelos                                                     |
| `combos.ts`             | `combos`                                                       | Configurações e ordenação de roteamento de combos                                             |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclo de vida das chaves de API, escopos e monitoramento de cotas                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuração do sistema e armazenamento KV compartilhado                                      |
| `backup.ts`             | —                                                              | Operações de exportação/importação de backups                                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurações de proxy e regras de roteamento                                                 |
| `prompts.ts`            | `prompt_templates`                                             | Modelos de prompts reutilizáveis e controle de versões                                        |
| `webhooks.ts`           | `webhooks`                                                     | Assinaturas e logs de webhooks orientados a eventos                                           |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Registro de auditoria por requisição (opcional, alto volume)                                  |
| `domainState.ts`        | `domain_*` (5 tabelas)                                         | Orçamentos de domínio, circuit breakers, bloqueios, cadeias de fallback e histórico de custos |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Chaves de API autorizadas para MCP/A2A                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Histórico de uso de cotas                                                                     |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapeamento de modelos para combos padrão                                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | Estado persistente específico da CLI                                                          |
| `encryption.ts`         | —                                                              | Funções auxiliares para criptografar/descriptografar campos                                   |
| `readCache.ts`          | —                                                              | Cache em memória para operações com alto volume de leitura                                    |
| `secrets.ts`            | `key_value` (entradas criptografadas)                          | Armazenamento criptografado de segredos                                                       |
| `stateReset.ts`         | —                                                              | Limpeza/redefinição do estado do banco de dados para testes                                   |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contexto da sessão para transferência entre agentes                                           |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Monitoramento de uso                                                                          |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuração de compactação                                                                   |

### Limites dos Módulos

Uma regra arquitetural fundamental: **os módulos não acessam diretamente as tabelas uns dos outros**. Para trabalhar com os dados de outro módulo, importe a função desse módulo.

```ts
// ❌ ERRADO: SQL direto de outro módulo
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRETO: use a função do módulo providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Essa regra é aplicada por meio da revisão de código — não há uma verificação estática, mas as violações são sinalizadas.

---

## Esquema Base (17 tabelas)

`core.ts` define as 17 tabelas base em `SCHEMA_SQL`. Elas são criadas pela migração `001_initial_schema.sql` e formam o esquema principal.

### Tabelas Principais (criadas na migração inicial)

| Tabela                     | Finalidade                                | Colunas principais                                                      |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credenciais do provedor (criptografadas)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informações de roteamento do nó provedor  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Armazenamento KV de uso geral             | `namespace`, `key`, `value`                                             |
| `combos`                   | Definições de combinações de roteamento   | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Chaves de API para o gateway              | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadados do banco de dados               | `key`, `value`                                                          |
| `usage_history`            | Registros de uso das solicitações         | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Cargas úteis e respostas das solicitações | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logs de solicitações do proxy             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Cadeias de modelo para provedor           | `model`, `chain`                                                        |
| `domain_budgets`           | Orçamentos de gastos por domínio          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Histórico de redefinição de orçamento     | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Rastreamento de custos por domínio        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Estado de limitação de taxa do domínio    | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Estado do circuit breaker por domínio     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache de respostas do LLM                 | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshots históricos de cota              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabelas Adicionais (adicionadas por migrações posteriores)

Migrações subsequentes adicionam tabelas como:

- `cli_tool_state` (migração 011) — estado da ferramenta de CLI
- Tabelas `mcp_*` — auditoria do servidor MCP
- Tabelas `a2a_*` — estado das tarefas A2A
- Tabelas `usage_*` — rastreamento de uso
- Tabelas `plugin_*` — sistema de plugins
- `skill_executions` — histórico de execução de habilidades
- Tabelas `memory_*` — sistema de memória
- Tabelas `compression_*` — sistema de compressão
- Tabelas `webhook_*` — log de entrega de webhooks
- Tabelas `acp_*` — Agent Client Protocol
- Tabelas `oneproxy_*` — marketplace do 1proxy
- `proxy_assignments` — vinculações de escopo do proxy
- `detailed_call_artifacts` — metadados dos artefatos de log de chamadas
- `quota_alert_history` — auditoria de alertas de cota
- `command_code_auth_sessions` — sessões OAuth do Command Code

A lista completa de mais de 30 tabelas está em `src/lib/db/migrations/`.

---

## Migrações

OmniRoute usa** migrações versionadas e idempotentes** em `src/lib/db/migrations/`. Cada migração é um único arquivo SQL. Coexistem dois formatos de nomenclatura; a versão registrada em `_omniroute_migrations` é o prefixo numérico.

### Nomenclatura de migração

| Formatar                                           | Exemplo                              | Usado para                                                                                                                                                                                    |
| -------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (exatamente 3 dígitos)       | `241_seen_models.sql`                | A antiga série `001`–`241`. Congelado quando o formato de carimbo de data/hora foi lançado (`240` e `241` foram mesclados pouco antes dele): nenhum novo arquivo recebe um número sequencial. |
| `YYYYMMDDHHMMSS_description.sql` (14 dígitos, UTC) | `20261113120000_add_usage_index.sql` | Todas as migrações criadas a partir de 13/11/2026.                                                                                                                                            |

Por que a mudança: com números sequenciais, PRs paralelo escolheu o mesmo próximo número e todos, exceto um, tiveram que renumerar antes da fusão. Um carimbo de data/hora UTC fornece a cada PR sua própria versão.

Regras para o formato do carimbo de data/hora (aplicado por `npm run check:migration-numbering`, compartilhado com o gerador em `scripts/check/lib/migrationNaming.mjs`):

- O carimbo de data/hora é uma data e hora UTC reais, não anterior a `20261113000000` e não mais que 10 minutos no futuro.
- A descrição é `snake_case` minúscula começando com uma letra (`a-z`, `0-9`, `_` único entre palavras), no máximo 80 caracteres.
- Dois arquivos com o mesmo carimbo de data/hora são duplicados.
- A regra de não-intervalo aplica-se apenas às séries antigas: todos os números de `001` a `241` devem existir, exceto os intervalos conhecidos `026`, `055` e `121`. A exclusão do `241` (ou de qualquer arquivo antigo) falha no portão. `001` e `241` nunca podem ser adicionados à lista de permissões `KNOWN_GAPS`. Arquivos com carimbo de data/hora nunca criam uma lacuna.
- Cada entrada em `src/lib/db/migrations/` deve ser um arquivo regular com um nome `.sql` válido em minúsculas. Um diretório, um link simbólico, um arquivo `.SQL` ou `.sql.bak`, um arquivo oculto ou um nome com espaço falha no portão, porque o executor o ignoraria silenciosamente ou travaria na inicialização.

**Aplicar pedido.** O executor classifica pelo valor numérico do prefixo, não por texto: primeiro os arquivos `001`–`241` antigos, depois os arquivos com carimbo de data e hora na ordem do carimbo de data e hora e, em seguida, quaisquer diretórios com namespace registrados com `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versões como `ee-001`). Uma migração pendente é qualquer arquivo cuja versão não esteja em `_omniroute_migrations`, portanto, uma migração de uma ramificação mais antiga que se funde após uma mais recente ainda se aplica aos bancos de dados existentes.

**O carimbo de data/hora é a ordem de criação, não a ordem de mesclagem.** Se a sua migração depender de uma tabela ou coluna criada por uma migração com um** mais recente** timestamp (por exemplo, um de outro PR que foi mesclado primeiro), um novo banco de dados executaria o seu primeiro e falharia. Enquanto seu PR ainda estiver aberto, gere novamente o nome do arquivo com `npm run db:new-migration` para obter um carimbo de data/hora mais recente ou torne-o independente. `npm run test:migrations:fresh` aplica todas as migrações a um banco de dados vazio e captura isso.

### Uma migração mesclada nunca é excluída ou renomeada

Uma vez que um arquivo de migração está em uma ramificação de lançamento ou `main`, ele já foi executado em bancos de dados homólogos e de desenvolvedor, em instalações VPS e na sincronização corporativa. A partir daí:

- **Nunca exclua-o.** Novas instalações perderiam seu esquema enquanto os bancos de dados atualizados o manteriam.
- **Nunca renomeie-o.** A versão em `_omniroute_migrations` não corresponderia mais a um arquivo, então cada banco de dados que já o aplicasse o executaria novamente. SQL não idempotente duplica os dados ou interrompe a inicialização.
- **Precisa de um esquema diferente?** Crie uma nova migração com `npm run db:new-migration`.

A renomeação é segura apenas para um arquivo que ainda não foi mesclado, que é o caso ao qual as dicas do portão se referem. Uma tag de lançamento não muda nada aqui: cada push para uma ramificação `release/v*` publica a imagem Docker `:next` e é executado em homologação, instalações VPS e sincronização corporativa, portanto, uma migração mesclada foi executada em bancos de dados reais antes que qualquer tag `vX.Y.Z` exista. O portão falha a cada remoção de um arquivo base, marcado ou não.

- **Revertendo uma migração mesclada.** Um `git revert` que exclui o arquivo falha no portão. Mantenha o arquivo e desfaça seu esquema em uma nova migração: `npm run db:new-migration -- <description>`, com `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` e assim por diante. Os bancos de dados atualizados e novos terminam com o mesmo esquema.
- **A renomeação aceita: uma entrada de compatibilidade e conteúdo idêntico.** Se um arquivo mesclado precisar ser movido (por exemplo, dois arquivos mesclados compartilham um carimbo de data/hora e o executor para com uma colisão de versão), renomeie o último sem tocar em seu SQL e adicione `{ fromVersion, fromName, toVersion, toName }` a `RENAMED_MIGRATION_COMPATIBILITY` em `src/lib/db/migrationRunner/constants.ts`. Os bancos de dados que aplicaram a versão antiga têm sua linha `_omniroute_migrations` movida em vez de executar o arquivo novamente. O portão avisa sobre tal renomeação e sempre executa a verificação de comutação nele, qualquer que seja o novo carimbo de data/hora: novas instalações aplicam o arquivo em sua nova posição, bancos de dados atualizados não, então escolha um novo carimbo de data/hora próximo ao antigo. O portão falha na renomeação se o conteúdo for alterado (uma alteração de esquema ainda ocorre em uma nova migração) ou se o arquivo de destino da entrada não estiver no disco.
- **Nunca renomeie dentro do mesmo carimbo de data/hora.** Uma renomeação que mantém o carimbo de data e hora e altera apenas a descrição falha no portão, com ou sem entrada. Com uma entrada cujo `toVersion` é igual a `fromVersion`, o executor exclui a linha `_omniroute_migrations` antiga e aplica o arquivo novamente em todos os bancos de dados que já o executaram. Sem uma entrada, o executor rastreia apenas a versão: ele ignora o arquivo nesses bancos de dados (o novo conteúdo nunca é executado lá) e registra um erro de renumeração a cada inicialização. Use outro carimbo de data/hora mais uma entrada de compatibilidade ou mantenha o nome.
- **O portão verifica se o arquivo renomeado não é executado novamente.** Para cada renomeação coberta, a porta passa o novo nome do arquivo para a verificação de comutação com `--must-not-apply`. A verificação inicializa o banco de dados atualizado com o executor real, e se o executor aplicar esse arquivo novamente (por exemplo, porque a entrada tem uma versão ou nome errado, ou porque o analisador de texto do portão lê `constants.ts` diferentemente de TypeScript), o portão falha com `migration renomeada rodaria de novo` e solicita que você verifique as versões e nomes antigos e novos da entrada.

### O que o portão verifica na base

Nas execuções de solicitação pull e fila de mesclagem, `npm run check:migration-numbering` compara `src/lib/db/migrations/` no disco com o mesmo diretório na ramificação base. A base é, nesta ordem: `--base-latest-tag`, `--base <ref>`, a variável `MIGRATION_BASE_REF` ou, quando `GITHUB_EVENT_NAME` é `pull_request`, `pull_request_target` ou `merge_group`, o primeiro pai do commit de mesclagem, o `merge_group.base_sha` da carga útil do evento ou `git merge-base HEAD origin/$GITHUB_BASE_REF`. Em uma solicitação pull ou fila de mesclagem executada sem base resolvível, o portão falha. Fora do CI sem `--base` ele imprime `comparação com a base: pulada (sem --base)` e ignora essas regras.

`--base-latest-tag` compara com a tag de lançamento mais recente (`vX.Y.Z` na ordem semver; tags com sufixo como nightlies não contam) que está na história do `HEAD`, com as mesmas regras do `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) executa o portão dessa maneira, porque as execuções push e agendadas não têm base de solicitação pull e uma mesclagem pode ocorrer sem uma nova execução CI. Sem nenhuma tag de liberação no histórico, o portão falha; execute `git fetch --tags` (em CI, `actions/checkout` com `fetch-depth: 0` traz as tags).

| Alteração na solicitação pull                                                                                                | Resultado                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Um arquivo que existe na base é renomeado, com uma entrada `RENAMED_MIGRATION_COMPATIBILITY`                                 | **Aviso** se o conteúdo for idêntico e a verificação de comutação for executada independentemente do novo carimbo de data/hora; ele falhará se a nova posição alterar o esquema final (desfazer a renomeação ou escolher outro novo carimbo de data/hora onde ele comuta) ou se o executor aplicar o arquivo renomeado novamente em um banco de dados atualizado.** Falha** se o conteúdo mudou. |
| Um arquivo que existe na base é renomeado mantendo seu timestamp (apenas a descrição muda)                                   | **Falha** , com ou sem entrada: o executor aplicaria novamente (com a entrada) ou pularia por versão (sem). Use outro carimbo de data/hora mais uma entrada de compatibilidade ou mantenha o nome.                                                                                                                                                                                               |
| Um arquivo que existe na base é excluído ou renomeado sem entrada                                                            | **Falha** , independentemente de o arquivo estar ou não em uma tag de lançamento. Para desfazer, restaure o arquivo com `git checkout <base> -- src/lib/db/migrations/<file>`; para reverter seu esquema, adicione uma nova migração com `DROP ... IF EXISTS`.                                                                                                                                   |
| Um arquivo que existe na base possui conteúdo diferente                                                                      | **Aviso** (uma anotação `::warning` em ações GitHub ) e a verificação de comutação é executada. Falhará se a edição alterar o esquema final, porque os bancos de dados atualizados não aplicam o arquivo editado novamente: coloque a alteração em uma nova migração. Uma edição inofensiva (um comentário, `IF NOT EXISTS`) apenas avisa.                                                       |
| Um arquivo com carimbo de data e hora é adicionado com um carimbo de data e hora não mais recente que o mais recente da base | Executa a verificação de comutação, descrita abaixo.                                                                                                                                                                                                                                                                                                                                             |
| Um arquivo `NNN_` de formato antigo é adicionado com um número abaixo do arquivo de formato antigo mais recente da base      | **Falha** , mesmo que `KNOWN_GAPS` seja editado na mesma solicitação pull: a série antiga está congelada, crie a migração com `npm run db:new-migration`. Arquivos de formato antigo acima do mais recente da base (uma solicitação pull de `release/v*` para `main` ) são aceitos.                                                                                                              |
| Um arquivo fora de ordem, editado ou renomeado contém instruções `INSERT`, `UPDATE`, `DELETE` ou `REPLACE`                   | **Aviso** : a verificação de comutação não compara os dados, portanto, revise se a ordem em que os bancos de dados atualizados e novos são aplicados altera o resultado.                                                                                                                                                                                                                         |

Uma execução da verificação de comutação cobre os arquivos fora de ordem, os editados e os renomeados juntos.

A verificação de comutação (`scripts/check/migration-commutation.ts`) cria dois bancos de dados temporários com o caminho de instalação real: um** atualizado** um (inicialize com as migrações base e, em seguida, inicialize novamente no mesmo arquivo com as migrações da solicitação pull) e um** fresco** one (uma inicialização com as migrações da solicitação pull). Ele compara os esquemas resultantes: tabelas e colunas (ignorando a ordem das colunas), restrições UNIQUE / PRIMARY KEY e FOREIGN KEY, o texto `CREATE TABLE` normalizado de cada tabela (que cobre restrições CHECK, agrupamentos, colunas geradas e opções de tabela), índices, gatilhos e visualizações. Os dados da linha não são comparados. Se corresponderem, o portão imprime que o arquivo está fora de ordem, mas comuta e passa. Se forem diferentes, o portão falha com a diferença e uma dica para o caso: para um arquivo fora de ordem, gere novamente seu nome com `npm run db:new-migration`, o que é seguro porque o arquivo ainda não foi mesclado; para um arquivo base editado, restaure o conteúdo base e coloque a alteração em uma nova migração; para um arquivo renomeado, desfaça a renomeação ou escolha outro novo carimbo de data/hora onde ele comuta, nunca o mesmo carimbo de data/hora com outro nome. Se a verificação em si não puder ser executada, o portão falhará em CI e avisará apenas localmente. Para um arquivo base editado, o banco de dados atualizado é construído com o conteúdo base desse arquivo e a segunda inicialização o ignora porque sua versão já está registrada. Para um arquivo renomeado, o banco de dados atualizado é criado com o arquivo com seu nome antigo e a segunda inicialização move sua linha `_omniroute_migrations` pela entrada de compatibilidade em vez de executá-lo novamente; o portão passa o novo nome com `--must-not-apply`, portanto a verificação falhará se a segunda inicialização o aplicar. Se uma migração de solicitação pull não for aplicada no caminho atualizado, ou seja, após cada migração de base (independentemente de ela também falhar ou não em uma nova instalação), o portão reportará `migration do PR não aplica` e solicitará que você corrija o SQL em relação ao esquema atual da base; se o arquivo depender de outra migração de pull request com um carimbo de data/hora posterior, gere novamente seu nome com `npm run db:new-migration`.

Para executar a mesma comparação localmente, passe a base explicitamente, por exemplo `npm run check:migration-numbering -- --base origin/<base-branch>` ou `npm run check:migration-numbering -- --base-latest-tag` para comparar com a versão mais recente.

### Convertendo uma migração `NNN` do Open PR

Uma solicitação pull aberta antes do switch ainda pode conter um arquivo sequencial como `242_add_widgets.sql`. Os números antigos acima de `241` são rejeitados, então converta-os antes de mesclar:

1. **Renomeie o arquivo com o gerador, mantendo a descrição.** Execute `npm run db:new-migration -- <same description>` para obter o novo nome, mova o SQL para ele e exclua o arquivo `NNN_` antigo. A descrição deve permanecer idêntica: a entrada de compatibilidade abaixo corresponde a ela.
2. **Adicione uma entrada de compatibilidade se um banco de dados persistente executasse o número antigo.** Se algum banco de dados mantido (homólogo, VPS, instalação do próprio contribuidor) executou uma compilação do PR com o arquivo `NNN_`, adicione `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` a `RENAMED_MIGRATION_COMPATIBILITY` em `src/lib/db/migrationRunner/constants.ts`. Isso é** necessário para `237` para `241`** : esses slots agora contêm os canônicos `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` e `241_seen_models.sql`, e sem a entrada tal banco de dados pula a migração canônica para sempre e executa a convertida novamente. Também funciona para um slot que permanece vazio, como `242`, quando o destino é um carimbo de data/hora. Em caso de dúvida, adicione a entrada. Onde você a adiciona na matriz não importa: quando o slot de destino de uma entrada ainda contém uma linha que outra entrada se afasta (por exemplo `237` mantendo uma linha PR enquanto uma linha `usage_history_calculated_cost` mais antiga espera para ser movida para `237`), o executor permite que essa entrada espere até que o slot esteja livre. Somente um conflito real, como um slot mantido por uma linha sem movimentação de entrada ou duas entradas que trocam de slot, interrompe a inicialização com `Cannot reconcile ...`.
3. **Mantenha o SQL idempotente** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), pois a migração convertida pode encontrar um banco de dados onde seu esquema já existe.
4. **Mova casos especiais com chave de versão.** Se o PR adicionou um caso para seu número antigo em `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ou em `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), altere a chave para o novo carimbo de data/hora.

`tests/unit/db/codex-fence-migration-rename.test.ts` é um exemplo prático de teste para uma migração renomeada.

### Backports para filiais antes da mudança

Nunca escolha ou faça backport de um arquivo `YYYYMMDDHHMMSS_` para uma ramificação anterior à troca (por exemplo, uma ramificação `release/v*` mais antiga). O executor classifica os nomes dos arquivos como texto, de modo que um arquivo com carimbo de data e hora seria executado entre `201_` e `202_` em um banco de dados novo, e o portão antigo não entende prefixos de 14 dígitos. Em tal ramificação, escreva a alteração como o próximo arquivo `NNN_` da ramificação, idempotente, para que não haja operação quando a versão com carimbo de data e hora chegar mais tarde.

### Como as migrações são executadas

Na inicialização, `migrationRunner.ts`:

1. Cria tabela `_omniroute_migrations` se não existir
2. Consultas para migrações já aplicadas
3. Aplica quaisquer novas migrações em ordem, cada uma em uma transação
4. Registra cada migração aplicada com carimbo de data/hora

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotência

As migrações devem ser** idempotente** — executá-los duas vezes deve ser autônomo:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Use as cláusulas `IF NOT EXISTS`, `IF EXISTS` e `OR IGNORE` / `OR REPLACE` liberalmente.

### Adicionando uma nova migração

1. **Crie o arquivo com o gerador** : `npm run db:new-migration -- <description>` (por exemplo `npm run db:new-migration -- add combo priority`). Ele grava `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` com a hora UTC atual e um cabeçalho de comentário, avança um segundo se esse carimbo de data e hora for obtido e nunca sobrescreve um arquivo. Não escolha um número manualmente.
2. **Use DDL seguro** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Preencha os dados com cuidado** : use `UPDATE ... WHERE ...` para lidar com linhas existentes
4. **Verifique a ordem e a nomenclatura** : `npm run test:migrations:fresh` (todas as migrações em um banco de dados vazio) e `npm run check:migration-numbering`
5. **Teste em uma cópia** : nunca execute migrações não testadas em produção

Exemplo:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Alterações incompatíveis com versões anteriores** (por exemplo, eliminar colunas) são complicados. OmniRoute NOT suporta downgrade — depois que uma migração é aplicada, a mudança de esquema é permanente. Planeje adequadamente.

---

## Criptografia em Repouso

Campos confidenciais (chaves de API, tokens OAuth e strings de conexão) são criptografados em repouso usando **AES-256-GCM**.

### Como Funciona

```ts
// src/lib/db/encryption.ts (simplificado)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Onde É Usada

- `provider_connections.api_key` — criptografado no nível da aplicação
- `provider_connections.access_token`, `refresh_token`, `id_token` — criptografados no nível da aplicação
- Entradas de `key_value` com `namespace = "secrets"` — criptografadas no nível da aplicação
- `proxy_registry.auth` — criptografado no nível da aplicação (se estiver presente)

### Chave de Criptografia

A chave de criptografia é derivada de uma **frase secreta** (definida por meio da variável de ambiente `STORAGE_ENCRYPTION_KEY`) e de um **salt** (armazenado no banco de dados). Ambos são necessários para descriptografar os dados.

```bash
# Gere uma frase secreta segura
openssl rand -hex 32

# Defina em .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Crítico**: perder a chave de criptografia significa perder o acesso a todos os dados criptografados. **Faça backup da chave separadamente do banco de dados**.

### O Que NÃO É Criptografado

Por motivos de desempenho, os seguintes dados são armazenados em texto simples:

- Nomes de exibição dos provedores
- Definições de modelos (já são públicas)
- Regras de roteamento
- Registros de uso (sem PII)

---

## Ressalvas sobre criptografia (v3.8.16+)

O OmniRoute usa **`migrateLegacyEncryptedString()`** para lidar com dois esquemas de criptografia de forma transparente:

- **Legado** (anterior à v3.5.0): "criptografia" baseada em XOR (não é criptografia real)
- **Atual**: AES-256-GCM com IV e tag de autenticação adequados

O auxiliar de migração detecta o formato legado e criptografa novamente com o novo esquema na primeira leitura. Isso significa que você pode atualizar um banco de dados antigo sem perder as credenciais.

---

## Cache de leitura

Para dados lidos com frequência (modelos, provedores, configurações), `readCache.ts` fornece um **cache em memória**:

```ts
// Armazenado em cache na inicialização, invalidado na gravação
const providers = await getCachedProviders(); // Rápido, em memória
const fresh = await listProviders(); // Lento, acessa o banco de dados
```

| Entidade armazenada em cache | Chave do cache | TTL              |
| ---------------------------- | -------------- | ---------------- |
| `models`                     | `models:v1`    | Até uma gravação |
| `provider_connections`       | `providers:v1` | Até uma gravação |
| `settings`                   | `settings:v1`  | Até uma gravação |
| `combos`                     | `combos:v1`    | Até uma gravação |

O cache é invalidado a cada gravação na tabela correspondente.

---

## Backup e recuperação

### Backup manual

```bash
# Use a CLI para criar um backup local
omniroute backup create --name pre-migration

# Ou por meio da API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

O arquivo de backup inclui:

- Todas as tabelas do banco de dados (serializadas em JSON)
- Artefatos de logs de chamadas (codificados em base64, opcionais)
- Configurações + segredos (criptografados)
- Configuração de plugins

### Restauração

```bash
# Por meio da CLI
omniroute restore pre-migration

# Por meio da API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Aviso**: A restauração sobrescreve todo o banco de dados. Interrompa todos os clientes primeiro.

### Backups automatizados

```bash
# Habilite backups diários automatizados por meio da CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

O agendamento é executado no servidor por uma tarefa em segundo plano que roda a cada 30 segundos
(padrão) e avalia a expressão cron em relação ao horário local do servidor.

| Variável                                    | Padrão  | Descrição                                                                                                             |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Intervalo de execução em ms (mín. `5000`). Deve ser menor que 60 s para ocorrer de forma confiável no minuto do cron. |

### Backup a quente do SQLite

Para fazer backup de um banco de dados ativo sem tempo de inatividade:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Isso usa a API de backup online do SQLite — é seguro executá-la enquanto o OmniRoute estiver em execução.

---

## Ajuste de desempenho

### Modo WAL

WAL está habilitado por padrão. Para cargas de trabalho de alta gravação, considere:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute não define `journal_size_limit`. Um ponto de verificação move os quadros WAL para o arquivo principal, mas o arquivo WAL mantém seu maior tamanho alocado. O guarda `OMNIROUTE_WAL_GUARD_MAX_MB` apenas avisa e executa `wal_checkpoint(RESTART)`; não é um limite de tamanho de disco.

### Índices

Índices-chave de desempenho (criados automaticamente por migrações):

- pesquisas de modelo `idx_models_provider` — por provedor
- expansão de alvo combo `idx_combo_targets_combo_id` —
- análise de uso `idx_usage_history_api_key_timestamp` —
- rastreamento de cota `idx_quota_snapshots_api_key_window` —
- consultas de registro de chamadas `idx_call_logs_timestamp` —

Para adicionar um novo índice, crie uma migração:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O mapeado em memória

Para bancos de dados muito grandes (> 10GB), o mapeamento de memória pode ser ajustado via SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compactação

Instâncias OmniRoute de longa execução se beneficiam de `VACUUM` ocasionais:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Execute mensalmente durante janelas de baixo tráfego. (o modo WAL reduz a necessidade, mas não a elimina.)

---

## Verificação de integridade

`src/lib/db/healthCheck.ts` fornece **diagnósticos de integridade no nível do banco de dados**:

Ambos os verbos exigem autenticação (`401` caso contrário). `GET` apenas diagnostica; `POST` executa a
mesma verificação com `autoRepair` habilitado.

```bash
GET  /api/db/health   # diagnosticar
POST /api/db/health   # diagnosticar + reparar
```

A resposta é o `DbHealthCheckResult` produzido por `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Os orçamentos de domínio faziam referência a chaves de API que não existem mais.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Campo             | Significado                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` quando `issues` está vazio. `driver` nunca influencia esse valor.                                                                                                                   |
| `issues[].type`   | Um entre `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                  |
| `repairedCount`   | Linhas reparadas durante esta execução; sempre `0` quando `autoRepair` é falso.                                                                                                            |
| `backupCreated`   | Indica se um backup foi criado antes do reparo.                                                                                                                                            |
| `checkedAt`       | Carimbo de data/hora ISO compartilhado pela execução e por qualquer nota de reparo gravada por ela.                                                                                        |
| `driver.name`     | Driver SQLite que atende ao banco de dados verificado.                                                                                                                                     |
| `driver.degraded` | `true` quando as gravações não são armazenadas de forma durável no arquivo do banco de dados — o fallback WASM `sql.js` (persistência do arquivo inteiro) ou um banco de dados em memória. |

O mesmo payload é retornado pela ferramenta MCP `omniroute_db_health_check`.

Execute `PRAGMA integrity_check` para detectar corrupção:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Deve exibir: ok
```

Se retornar qualquer resultado diferente de `ok`, **pare de usar o banco de dados imediatamente** e restaure-o a partir do backup.

---

## Recuperação de Desastres

### Cenário 1: Arquivo WAL Perdido

O arquivo `-wal` está ausente, mas o `-shm` e o banco de dados principal estão intactos:

```bash
# Recupera automaticamente na próxima abertura
omniroute
```

Se o SQLite não conseguir realizar a recuperação automática:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Cenário 2: Arquivo Principal do Banco de Dados Corrompido

Restaure a partir do backup:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` apenas baixa um arquivo `.tar.gz` completo de um servidor em execução
(`GET /api/db-backups/exportAll`, credencial de operador obrigatória); ele não restaura nada.

### Cenário 3: Chave de Criptografia Perdida

**Nenhuma recuperação é possível** sem a chave. Os campos criptografados ficam ilegíveis. Adicione novamente todos os provedores manualmente com novas credenciais.

> **Mitigação**: Sempre faça backup da chave de criptografia separadamente, de preferência em um gerenciador de senhas ou KMS.

### Cenário 4: Disco Cheio

O SQLite retornará erros `SQLITE_FULL`. Libere espaço em disco e, em seguida:

```bash
# Faz checkpoint do WAL para liberar espaço
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operações Comuns

### Inspecionar uma Tabela

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Contar Linhas em Todas as Tabelas

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Redefinir (Apagar) Todos os Dados

```bash
# Primeiro, interrompa o OmniRoute
omniroute stop

# Exclua o arquivo do banco de dados
rm ~/.omniroute/storage.sqlite*

# Reinicie (isso recriará um banco de dados vazio)
omniroute
```

Para uma redefinição **seletiva** (manter os provedores e apagar os dados de uso):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exportar uma Única Tabela

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Solução de Problemas

### "O banco de dados está bloqueado"

Outro processo está mantendo um bloqueio de gravação. Você pode:

- Aguardar a conclusão do outro processo (verifique com `lsof | grep storage.sqlite`)
- Encerrar o outro processo
- Se o problema persistir, reiniciar o OmniRoute

### "Falha na restrição de chave estrangeira"

Um módulo de domínio está violando a integridade referencial. Verifique:

- Linhas órfãs em tabelas dependentes
- Exclusões em cascata que não foram propagadas
- Migração recente que alterou uma chave estrangeira

Execute `PRAGMA foreign_key_check;` para encontrar violações.

### "Memória insuficiente"

A E/S mapeada em memória do SQLite está excedendo o limite do sistema operacional. Reduza-a por meio de um pragma do SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB em vez de 256MB
```

Ou desative-a:

```sql
PRAGMA mmap_size = 0;
```

### "A migração falhou no meio do processo"

A migração foi executada em uma transação, portanto deveria ter sido revertida. Caso isso não tenha ocorrido:

1. **Interrompa o OmniRoute** (para evitar novas tentativas)
2. **Verifique o estado do banco de dados** com `sqlite3`
3. **Corrija manualmente** a migração parcial
4. **Execute novamente** o OmniRoute (a migração será repetida)

Para evitar esse problema, sempre teste primeiro as migrações em uma cópia.

---

## Veja Também

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabelas de uso
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitoramento da integridade
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — fluxo de lançamento
- Código-fonte: `src/lib/db/` (mais de 80 arquivos, cerca de 25 mil linhas de código)
