# Database Schema & Operations Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: O OmniRoute utiliza **SQLite com journaling WAL** como armazenamento principal, com encriptação **AES-256-GCM** em repouso para campos sensíveis. Este guia aborda o esquema, as migrações, as cópias de segurança/recuperação e os procedimentos operacionais.

**Fontes:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabelas base)
- `src/lib/db/migrationRunner.ts` — migrações com controlo de versão
- `src/lib/db/migrations/` — 167 ficheiros SQL com controlo de versão
- `src/lib/db/encryption.ts` — funções auxiliares de encriptação
- `src/lib/db/backup.ts` — exportação/importação de cópias de segurança
- `src/lib/db/healthCheck.ts` — diagnósticos de integridade

---

## Porquê SQLite?

O OmniRoute escolheu SQLite em vez de PostgreSQL/MySQL por vários motivos:

| Fator                  | SQLite                                  | PostgreSQL                                           |
| ---------------------- | --------------------------------------- | ---------------------------------------------------- |
| **Implementação**      | Incorporado — sem servidor separado     | Requer a configuração de um servidor                 |
| **Encriptação**        | Camada da aplicação (AES-256-GCM)       | TDE incorporada                                      |
| **Desempenho**         | Mais rápido para cargas pequenas/médias | Melhor para um grande volume de escritas simultâneas |
| **Concorrência**       | O modo WAL permite leituras simultâneas | MVCC completo                                        |
| **Cópia de segurança** | Cópia de um único ficheiro              | `pg_dump` ou instantâneo do sistema de ficheiros     |
| **Caso de utilização** | Instalação por utilizador, incorporado  | SaaS multi-inquilino                                 |

Para implementações com **um único utilizador e uma única instância** (o principal caso de utilização do OmniRoute), o SQLite é mais simples e mais rápido.

### Journaling WAL

O `core.ts` abre a base de dados no **modo WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

O WAL permite **leituras simultâneas** durante as escritas — importante para o painel, que efetua consultas enquanto os pedidos estão a ser registados.

O tamanho predefinido da cache é de **65 536 KiB (64 MiB)**. O SQLite interpreta um
`cache_size` negativo como um limite superior aproximado em KiB e aloca páginas conforme necessário.
**Definições > Sistema e Armazenamento > Tamanho da Cache** aceita valores inteiros entre **1 e
1 000 000 KiB**; guardar a definição aplica-a à ligação ativa à base de dados,
e o OmniRoute restaura o valor persistido no arranque.

---

## Localização da Base de Dados

O ficheiro SQLite é armazenado em:

| SO      | Caminho                                                         |
| ------- | --------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                   |
| macOS   | `~/.omniroute/storage.sqlite`                                   |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                       |
| Docker  | `/app/data/storage.sqlite` (configurável através de `DATA_DIR`) |

Ficheiros associados:

- `storage.sqlite-wal` — registo write-ahead
- `storage.sqlite-shm` — ficheiro de memória partilhada
- `call_logs/` — artefactos dos conteúdos dos pedidos (se ativado)

**Substituir a localização:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arquitetura dos Módulos de Domínio

A base de dados do OmniRoute tem **110 módulos TypeScript de nível superior** em `src/lib/db/`. Cada módulo de domínio:

- É responsável por uma ou mais tabelas específicas
- Exporta funções CRUD tipadas
- Nunca acede às tabelas de outro módulo
- Utiliza `getDbInstance()` de `core.ts` para aceder à BD

### Os 110 Módulos de BD de Nível Superior

O OmniRoute tem **110 ficheiros TypeScript de nível superior** em `src/lib/db/`. Abaixo encontra-se uma amostra dos módulos principais; consulte a listagem do diretório para ver a lista completa:

| Módulo                  | Tabelas                                                        | Responsabilidade                                                                             |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registo e credenciais de fornecedores através de OAuth/chaves de API                         |
| `models.ts`             | `key_value` (dados dos modelos)                                | Definições, capacidades e preços dos modelos                                                 |
| `combos.ts`             | `combos`                                                       | Configurações e ordenação do encaminhamento de combinações                                   |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclo de vida das chaves de API, âmbitos e monitorização de quotas                           |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configuração do sistema e armazenamento KV partilhado                                        |
| `backup.ts`             | —                                                              | Operações de exportação/importação de cópias de segurança                                    |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurações de proxy e regras de encaminhamento                                            |
| `prompts.ts`            | `prompt_templates`                                             | Modelos de prompts reutilizáveis e controlo de versões                                       |
| `webhooks.ts`           | `webhooks`                                                     | Subscrições e registos de webhooks orientados a eventos                                      |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Registo de auditoria por pedido (opcional, elevado volume)                                   |
| `domainState.ts`        | `domain_*` (5 tabelas)                                         | Orçamentos de domínio, disjuntores, bloqueios, cadeias de contingência e histórico de custos |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Chaves de API autorizadas para MCP/A2A                                                       |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Histórico da utilização de quotas                                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Associação de modelos às combinações predefinidas                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Estado persistente específico da CLI                                                         |
| `encryption.ts`         | —                                                              | Funções auxiliares para encriptar/desencriptar campos                                        |
| `readCache.ts`          | —                                                              | Cache em memória para operações com muitas leituras                                          |
| `secrets.ts`            | `key_value` (entradas encriptadas)                             | Armazenamento encriptado de segredos                                                         |
| `stateReset.ts`         | —                                                              | Eliminação/reposição do estado da BD para testes                                             |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contexto da sessão para transferência entre agentes                                          |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Monitorização da utilização                                                                  |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configuração da compressão                                                                   |

### Limites dos Módulos

Uma regra arquitetural fundamental: **os módulos não acedem diretamente às tabelas uns dos outros**. Para trabalhar com dados de outro módulo, importe a função desse módulo.

```ts
// ❌ ERRADO: SQL direto a partir de outro módulo
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORRETO: utilizar a função do módulo providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Esta regra é aplicada através da revisão de código — não existe uma verificação estática, mas as violações são assinaladas.

---

## Esquema Base (17 tabelas)

`core.ts` define as 17 tabelas base em `SCHEMA_SQL`. Estas são criadas pela migração `001_initial_schema.sql` e constituem o esquema principal.

### Tabelas Principais (criadas na migração inicial)

| Tabela                     | Finalidade                                  | Colunas principais                                                      |
| -------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credenciais do fornecedor (encriptadas)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informações de encaminhamento dos nós       | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Armazenamento KV genérico                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Definições de combinações de encaminhamento | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Chaves de API para o gateway                | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadados da base de dados                  | `key`, `value`                                                          |
| `usage_history`            | Registos de utilização de pedidos           | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payloads e respostas dos pedidos            | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Registos de pedidos do proxy                | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Cadeias de modelo para fornecedor           | `model`, `chain`                                                        |
| `domain_budgets`           | Orçamentos de gastos por domínio            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Histórico de reposições de orçamento        | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Acompanhamento de custos por domínio        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Estado de limite de taxa do domínio         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Estado do disjuntor por domínio             | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache de respostas do LLM                   | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Instantâneos históricos de quotas           | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabelas Adicionais (adicionadas por migrações posteriores)

As migrações subsequentes adicionam tabelas como:

- `cli_tool_state` (migração 011) — estado da ferramenta CLI
- Tabelas `mcp_*` — auditoria do servidor MCP
- Tabelas `a2a_*` — estado das tarefas A2A
- Tabelas `usage_*` — acompanhamento da utilização
- Tabelas `plugin_*` — sistema de plugins
- `skill_executions` — histórico de execução de competências
- Tabelas `memory_*` — sistema de memória
- Tabelas `compression_*` — sistema de compressão
- Tabelas `webhook_*` — registo de entrega de webhooks
- Tabelas `acp_*` — Agent Client Protocol
- Tabelas `oneproxy_*` — marketplace 1proxy
- `proxy_assignments` — associações de âmbito do proxy
- `detailed_call_artifacts` — metadados dos artefactos dos registos de chamadas
- `quota_alert_history` — auditoria de alertas de quota
- `command_code_auth_sessions` — sessões OAuth do Command Code

A lista completa de mais de 30 tabelas encontra-se em `src/lib/db/migrations/`.

---

## Migrações

OmniRoute usa** migrações versionadas e idempotentes** em `src/lib/db/migrations/`. Cada migração é um único ficheiro SQL. Coexistem dois formatos de nomenclatura; a versão registada em `_omniroute_migrations` é o prefixo numérico.

### Nomenclatura de migração

| Formatar                                           | Exemplo                              | Usado para                                                                                                                                                                                    |
| -------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (exatamente 3 dígitos)       | `241_seen_models.sql`                | A antiga série `001`–`241`. Congelado quando o formato de carimbo de data/hora foi lançado (`240` e `241` foram fundidos pouco antes dele): nenhum novo ficheiro recebe um número sequencial. |
| `YYYYMMDDHHMMSS_description.sql` (14 dígitos, UTC) | `20261113120000_add_usage_index.sql` | Todas as migrações criadas a partir de 13/11/2026.                                                                                                                                            |

Porquê a mudança: com números sequenciais, PRs paralelo escolheu o mesmo número seguinte e todos, exceto um, tiveram de renumerar antes da fusão. Um carimbo de data/hora UTC fornece a cada PR a sua própria versão.

Regras para o formato do timestamp (aplicado por `npm run check:migration-numbering`, partilhado com o gerador em `scripts/check/lib/migrationNaming.mjs`):

- O carimbo de data/hora é uma data e hora UTC reais, não anterior a `20261113000000` e não mais de 10 minutos no futuro.
- A descrição é `snake_case` minúscula começando por uma letra (`a-z`, `0-9`, `_` único entre palavras), no máximo 80 caracteres.
- Dois ficheiros com o mesmo carimbo de data/hora são duplicados.
- A regra do não intervalo aplica-se apenas às séries antigas: todos os números de `001` a `241` devem existir, excepto os intervalos conhecidos `026`, `055` e `121`. A eliminação do `241` (ou de qualquer ficheiro antigo) falha no portão. `001` e `241` nunca podem ser adicionados à lista de permissões `KNOWN_GAPS`. Os ficheiros com carimbo de data/hora nunca criam uma lacuna.
- Cada entrada em `src/lib/db/migrations/` deve ser um ficheiro regular com um nome `.sql` válido em minúsculas. Um diretório, um link simbólico, um ficheiro `.SQL` ou `.sql.bak`, um ficheiro oculto ou um nome com espaço falha no portão, porque o executor o ignoraria silenciosamente ou travaria no arranque.

**Aplicar pedido.** O executor ordena pelo valor numérico do prefixo, e não por texto: primeiro os ficheiros `001`–`241` antigos, depois os ficheiros com carimbo de data e hora na ordem do carimbo de data e hora e, em seguida, quaisquer diretórios com namespace registados com `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` (versões como `ee-001`). Uma migração pendente é qualquer ficheiro cuja versão não esteja em `_omniroute_migrations`, pelo que uma migração de uma ramificação mais antiga que se funde após uma mais recente ainda se aplica às bases de dados existentes.

**O carimbo de data/hora é a ordem de criação, não a ordem de fusão.** Se a sua migração depender de uma tabela ou coluna criada por uma migração com um** mais recente** timestamp (por exemplo, um de outro PR que foi fundido primeiro), uma nova base de dados executaria a sua primeira e falharia. Enquanto o seu PR ainda estiver aberto, gere novamente o nome do ficheiro com `npm run db:new-migration` para obter um carimbo de data/hora mais recente ou torne-o independente. `npm run test:migrations:fresh` aplica todas as migrações a uma base de dados vazia e captura isso.

### Uma migração fundida nunca é eliminada ou renomeada

Uma vez que um ficheiro de migração está numa ramificação de lançamento ou `main`, já foi executado em bases de dados homólogas e de programador, em instalações VPS e na sincronização empresarial. A partir daí:

- **Nunca o apague.** As novas instalações perderiam o seu esquema enquanto as bases de dados atualizadas o manteriam.
- **Nunca o renomeie.** A versão em `_omniroute_migrations` deixaria de corresponder a um ficheiro, pelo que cada base de dados que já o aplicasse o executaria novamente. SQL não idempotente duplica os dados ou pára a inicialização.
- **Precisa de um esquema diferente?** Crie uma nova migração com `npm run db:new-migration`.

A renomeação só é segura para um ficheiro que ainda não foi fundido, que é o caso a que as dicas do portão se referem. Uma etiqueta de lançamento não muda nada aqui: cada push para uma ramificação `release/v*` publica a imagem Docker `:next` e é executado em homologação, instalações VPS e sincronização empresarial, pelo que uma migração combinada foi executada em bases de dados reais antes de existir qualquer etiqueta `vX.Y.Z`. O portão falha a cada remoção de um ficheiro base, marcado ou não.

- **Revertendo uma migração fundida.** Um `git revert` que apaga o ficheiro falha no portão. Mantenha o ficheiro e desfaça o seu esquema numa nova migração: `npm run db:new-migration -- <description>`, com `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` e assim por diante. Os bancos de dados atualizados e novos terminam com o mesmo esquema.
- **A renomeação aceite: uma entrada de compatibilidade e conteúdo idêntico.** Se um ficheiro fundido necessitar de ser movido (por exemplo, dois ficheiros fundidos partilham um carimbo de data/hora e o executor pára com uma colisão de versão), renomeie o último sem tocar no seu SQL e adicione `{ fromVersion, fromName, toVersion, toName }` a `RENAMED_MIGRATION_COMPATIBILITY` em `src/lib/db/migrationRunner/constants.ts`. As bases de dados que aplicaram a versão antiga têm a sua linha `_omniroute_migrations` movida em vez de executar o ficheiro novamente. O portão avisa-o sobre tal renomeação e executa sempre a verificação de comutação nele, qualquer que seja o novo carimbo de data/hora: as novas instalações aplicam o ficheiro na sua nova posição, as bases de dados atualizadas não, por isso escolha um novo carimbo de data/hora próximo do antigo. O portão falha a renomeação se o conteúdo for alterado (ainda ocorre uma alteração de esquema numa nova migração) ou se o ficheiro de destino da entrada não estiver no disco.
- **Nunca renomeie dentro do mesmo carimbo de data/hora.** Uma renomeação que mantém o carimbo de data e hora e altera apenas a descrição falha no portão, com ou sem entrada. Com uma entrada cujo `toVersion` é igual a `fromVersion`, o executor elimina a linha `_omniroute_migrations` antiga e aplica o ficheiro novamente a todas as bases de dados que já o tenham executado. Sem uma entrada, o executor apenas rastreia a versão: ignora o ficheiro nestas bases de dados (o novo conteúdo nunca é executado aí) e regista um erro de renumeração a cada inicialização. Utilize outro carimbo de data/hora mais uma entrada de compatibilidade ou mantenha o nome.
- **O portão verifica se o ficheiro renomeado não é executado novamente.** Para cada renomeação coberta, a porta passa o novo nome do ficheiro para a verificação de comutação com `--must-not-apply`. A verificação inicializa a base de dados atualizada com o executor real, e se o executor aplicar esse ficheiro novamente (por exemplo, porque a entrada tem uma versão ou nome errado, ou porque o analisador de texto do portão lê `constants.ts` ao contrário de TypeScript), o portão falha com `migration renomeada rodaria de novo` e solicita que verifique as versões e nomes antigos e novos da entrada.

### O que o portão verifica na base

Nas execuções de pull request e de merge na fila, `npm run check:migration-numbering` compara `src/lib/db/migrations/` no disco com o mesmo diretório na branch base. A base é, por esta ordem: `--base-latest-tag`, `--base <ref>`, a variável `MIGRATION_BASE_REF` ou, quando `GITHUB_EVENT_NAME` é `pull_request`, `pull_request_target` ou `merge_group`, o primeiro pai do commit de fusão, o `merge_group.base_sha` da carga útil do evento ou `git merge-base HEAD origin/$GITHUB_BASE_REF`. Numa solicitação pull ou fila de fusão executada sem base resolvível, o portão falha. Fora do CI sem `--base` imprime `comparação com a base: pulada (sem --base)` e ignora estas regras.

`--base-latest-tag` compara com a tag de lançamento mais recente (`vX.Y.Z` na ordem semver; tags com sufixo como nightlies não contam) que está na história do `HEAD`, com as mesmas regras do `--base`. O Release-Green (`scripts/quality/validate-release-green.mjs`) executa o portão desta forma, porque as execuções push e agendadas não têm uma base de pedido pull e pode ocorrer uma fusão sem uma nova execução CI. Sem qualquer tag de libertação no histórico, o portão falha; execute `git fetch --tags` (em CI, `actions/checkout` com `fetch-depth: 0` traz as tags).

| Alteração na pull request                                                                                                        | Resultado                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Um ficheiro que existe na base é renomeado, com uma entrada `RENAMED_MIGRATION_COMPATIBILITY`                                    | **Aviso** se o conteúdo for idêntico e a verificação de comutação for executada independentemente do novo carimbo de data/hora; falhará se a nova posição alterar o esquema final (desfazer a renomeação ou escolher outro novo carimbo de data/hora onde comuta) ou se o executor aplicar o ficheiro renomeado novamente numa base de dados atualizada.** Falha** se o conteúdo mudou. |
| Um ficheiro que existe na base é renomeado mantendo o seu timestamp (apenas a descrição é alterada)                              | **Falha** , com ou sem entrada: o executor aplicaria novamente (com a entrada) ou saltaria por versão (sem). Utilize outro carimbo de data/hora mais uma entrada de compatibilidade ou mantenha o nome.                                                                                                                                                                                 |
| Um ficheiro que existe na base é eliminado ou renomeado sem entrada                                                              | **Falha** , independentemente de o ficheiro estar ou não numa etiqueta de lançamento. Para desfazer, restaure o ficheiro com `git checkout <base> -- src/lib/db/migrations/<file>`; para reverter o seu esquema, adicione uma nova migração com `DROP ... IF EXISTS`.                                                                                                                   |
| Um ficheiro que existe na base tem conteúdo diferente                                                                            | **Aviso** (uma anotação `::warning` em ações GitHub ) e a verificação de comutação é executada. Falhará se a edição alterar o esquema final, porque as bases de dados atualizadas não aplicam o ficheiro editado novamente: coloque a alteração numa nova migração. Uma edição inofensiva (um comentário, `IF NOT EXISTS`) apenas avisa.                                                |
| Um ficheiro com carimbo de data e hora é adicionado com um carimbo de data e hora não mais recente do que o mais recente da base | Executa a verificação de comutação, descrita abaixo.                                                                                                                                                                                                                                                                                                                                    |
| Um ficheiro `NNN_` de formato antigo é adicionado com um número abaixo do ficheiro de formato antigo mais recente da base        | **Falha** , mesmo que `KNOWN_GAPS` seja editado no mesmo pull request: a série antiga está congelada, crie a migração com `npm run db:new-migration`. Os ficheiros de formato antigo acima do mais recente da base (um pull request de `release/v*` para `main` ) são aceites.                                                                                                          |
| Um ficheiro fora de ordem, editado ou renomeado contém instruções `INSERT`, `UPDATE`, `DELETE` ou `REPLACE`                      | **Aviso** : a verificação de comutação não compara os dados, por isso reveja se a ordem pela qual as bases de dados atualizadas e novas são aplicadas altera o resultado.                                                                                                                                                                                                               |

Uma execução da verificação de comutação cobre os ficheiros fora de ordem, os editados e os renomeados em conjunto.

A verificação de comutação (`scripts/check/migration-commutation.ts`) cria duas bases de dados temporárias com o caminho de instalação real: uma** atualizado** um (inicializar com as migrações base e, em seguida, arrancar novamente para o mesmo ficheiro com as migrações do pull request) e um** fresco** one (uma inicialização com as migrações do pull request). Compara os esquemas resultantes: tabelas e colunas (ignorando a ordem das colunas), restrições UNIQUE / PRIMARY KEY e FOREIGN KEY, o texto `CREATE TABLE` normalizado de cada tabela (que cobre restrições CHECK, agrupamentos, colunas geradas e opções de tabela), índices, triggers e visualizações. Os dados da linha não são comparados. Se corresponderem, o portão imprime que o ficheiro está fora de ordem, mas comuta e passa. Se forem diferentes, o portão falha com a diferença e uma dica para o caso: para um ficheiro fora de ordem, gere novamente o seu nome com `npm run db:new-migration`, o que é seguro porque o ficheiro ainda não foi fundido; para um ficheiro base editado, restaure o conteúdo base e coloque a alteração numa nova migração; para um ficheiro renomeado, desfaça a renomeação ou escolha outro novo carimbo de data/hora onde comuta, nunca o mesmo carimbo de data/hora com outro nome. Se a verificação em si não puder ser executada, o portão falhará em CI e avisará apenas localmente. Para um ficheiro base editado, a base de dados atualizada é construída com o conteúdo base desse ficheiro e a segunda inicialização ignora-a porque a sua versão já está registada. Para um ficheiro renomeado, a base de dados atualizada é criada com o ficheiro com o seu nome antigo e a segunda inicialização move a sua linha `_omniroute_migrations` pela entrada de compatibilidade em vez de a executar novamente; o portão passa o novo nome com `--must-not-apply`, pelo que a verificação falhará se a segunda inicialização o aplicar. Se uma migração de pull request não for aplicada no caminho atualizado, ou seja, após cada migração de base (independentemente de também falhar ou não numa nova instalação), o portão reportará `migration do PR não aplica` e solicitará que corrija o SQL em relação ao esquema atual da base; se o ficheiro depender de outra migração de pull request com um timestamp posterior, gere novamente o seu nome com `npm run db:new-migration`.

Para executar a mesma comparação localmente, passe a base explicitamente, por exemplo `npm run check:migration-numbering -- --base origin/<base-branch>` ou `npm run check:migration-numbering -- --base-latest-tag` para comparar com a versão mais recente.

### Conversão de uma migração `NNN` do Open PR

Um pull request aberto antes do switch pode ainda conter um ficheiro sequencial como `242_add_widgets.sql`. Os números antigos acima de `241` são rejeitados, por isso converta-os antes de fundir:

1. **Renomeie o ficheiro com o gerador, mantendo a descrição.** Execute `npm run db:new-migration -- <same description>` para obter o novo nome, mova o SQL para o mesmo e apague o ficheiro `NNN_` antigo. A descrição deve permanecer idêntica: a entrada de compatibilidade abaixo corresponde a esta.
2. **Adicione uma entrada de compatibilidade se uma base de dados persistente executasse o número antigo.** Se alguma base de dados mantida (homólogo, VPS, instalação do próprio contribuidor) tiver executado uma compilação do PR com o ficheiro `NNN_`, adicione `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` a `RENAMED_MIGRATION_COMPATIBILITY` em `src/lib/db/migrationRunner/constants.ts`. Isso é** necessário para `237` para `241`** : estes slots contêm agora os canónicos `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` e `241_seen_models.sql`, e sem a entrada tal base de dados salta a migração canónica para sempre e executa novamente a convertida. Também funciona para um slot que permanece vazio, como `242`, quando o destino é um carimbo de data/hora. Em caso de dúvida, adicione a entrada. Onde a adiciona na matriz não importa: quando o slot de destino de uma entrada ainda contém uma linha da qual outra entrada se afasta (por exemplo `237` mantendo uma linha PR enquanto uma linha `usage_history_calculated_cost` mais antiga espera para ser movida para `237`), o executor permite que essa entrada aguarde até que o slot esteja livre. Apenas um conflito real, como um slot mantido por uma linha sem movimentação de entrada ou duas entradas que trocam de slot, interrompe a inicialização com `Cannot reconcile ...`.
3. **Mantenha o SQL idempotente** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), pois a migração convertida pode encontrar uma base de dados onde o seu esquema já existe.
4. **Mover casos especiais com chave de versão.** Se o PR tiver adicionado um caso para o seu número antigo em `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) ou em `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`), altere a chave para o novo carimbo de data/hora.

`tests/unit/db/codex-fence-migration-rename.test.ts` é um exemplo prático de teste para uma migração renomeada.

### Backports para filiais antes da mudança

Nunca escolha ou faça backport de um ficheiro `YYYYMMDDHHMMSS_` para uma ramificação anterior à troca (por exemplo, uma ramificação `release/v*` mais antiga). O executor classifica os nomes dos ficheiros como texto, de modo que um ficheiro com carimbo de data e hora seria executado entre `201_` e `202_` numa base de dados nova, e o portão antigo não compreende prefixos de 14 dígitos. Numa tal ramificação, escreva a alteração como o próximo ficheiro `NNN_` da ramificação, idempotente, para que não haja operação quando a versão com carimbo de data e hora chegar mais tarde.

### Como as migrações são executadas

No arranque, `migrationRunner.ts`:

1. Cria tabela `_omniroute_migrations` se não existir
2. Consultas para migrações já aplicadas
3. Aplica quaisquer novas migrações por ordem, cada uma numa transação
4. Regista cada migração aplicada com um carimbo de data/hora

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

As migrações devem ser** idempotente** — executá-los duas vezes deve ser autónomo:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilize as cláusulas `IF NOT EXISTS`, `IF EXISTS` e `OR IGNORE` / `OR REPLACE` liberalmente.

### Adicionando uma nova migração

1. **Crie o ficheiro com o gerador** : `npm run db:new-migration -- <description>` (por exemplo `npm run db:new-migration -- add combo priority`). Escreve `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` com a hora UTC atual e um cabeçalho de comentário, avança um segundo se esse carimbo de data e hora for obtido e nunca sobrescreve um ficheiro. Não escolha um número manualmente.
2. **Use DDL seguro** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Preencha os dados com cuidado** : utilizar `UPDATE ... WHERE ...` para lidar com linhas existentes
4. **Verifique a ordem e a nomenclatura** : `npm run test:migrations:fresh` (todas as migrações numa base de dados vazia) e `npm run check:migration-numbering`
5. **Teste numa cópia** : nunca execute migrações não testadas em produção
6. **Uma tabela criada a partir de código também necessita de migração** : se um módulo também cria a tabela de forma preguiçosa (`CREATE TABLE IF NOT EXISTS`, mantida como um caminho de auto-correcção), uma migração deve criá-la com o mesmo DDL. Caso contrário, uma instalação limpa e uma instalação atualizada resultarão em esquemas diferentes, dependendo se o caminho do código foi executado. `tests/unit/db/lazy-table-migration-guard.test.ts` verifica `src/` e `open-sse/` e falha um `CREATE` preguiçoso sem migração (#20557). Exemplo: `src/lib/db/migrations/20261118120853_compression_run_telemetry.sql`.

Exemplo:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Alterações incompatíveis com versões anteriores** ex., eliminar colunas) são complicados. OmniRoute NOT suporta o downgrade — depois de uma migração ser aplicada, a mudança de esquema é permanente. Planeie adequadamente.

---

## Encriptação de Dados em Repouso

Os campos confidenciais (chaves de API, tokens OAuth, cadeias de ligação) são encriptados em repouso através de **AES-256-GCM**.

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

### Onde É Utilizada

- `provider_connections.api_key` — encriptado ao nível da aplicação
- `provider_connections.access_token`, `refresh_token`, `id_token` — encriptados ao nível da aplicação
- Entradas `key_value` com `namespace = "secrets"` — encriptadas ao nível da aplicação
- `proxy_registry.auth` — encriptado ao nível da aplicação (se existir)

### Chave de Encriptação

A chave de encriptação é derivada de uma **frase secreta** (definida através da variável de ambiente `STORAGE_ENCRYPTION_KEY`) e de um **salt** (armazenado na base de dados). Ambos são necessários para desencriptar os dados.

```bash
# Gerar uma frase secreta segura
openssl rand -hex 32

# Definir em .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Crítico**: perder a chave de encriptação significa perder o acesso a todos os dados encriptados. **Crie uma cópia de segurança da chave separadamente da base de dados**.

### O Que NÃO É Encriptado

Por motivos de desempenho, os seguintes elementos são armazenados em texto simples:

- Nomes de apresentação dos fornecedores
- Definições de modelos (já são públicas)
- Regras de encaminhamento
- Registos de utilização (sem dados pessoais)

---

## Ressalvas sobre encriptação (v3.8.16+)

O OmniRoute utiliza **`migrateLegacyEncryptedString()`** para processar de forma transparente dois métodos de encriptação:

- **Legado** (anterior à v3.5.0): «encriptação» baseada em XOR (não é criptografia real)
- **Atual**: AES-256-GCM com IV e etiqueta de autenticação adequados

O auxiliar de migração deteta o formato legado e volta a encriptá-lo com o novo método aquando da primeira leitura. Isto significa que pode atualizar uma base de dados antiga sem perder credenciais.

---

## Cache de leitura

Para dados lidos frequentemente (modelos, fornecedores, definições), `readCache.ts` disponibiliza uma **cache em memória**:

```ts
// Colocado em cache no arranque, invalidado na escrita
const providers = await getCachedProviders(); // Rápido, em memória
const fresh = await listProviders(); // Lento, acede à BD
```

| Entidade em cache      | Chave de cache | TTL               |
| ---------------------- | -------------- | ----------------- |
| `models`               | `models:v1`    | Até haver escrita |
| `provider_connections` | `providers:v1` | Até haver escrita |
| `settings`             | `settings:v1`  | Até haver escrita |
| `combos`               | `combos:v1`    | Até haver escrita |

A cache é invalidada em cada escrita na tabela correspondente.

---

## Cópia de segurança e recuperação

### Cópia de segurança manual

```bash
# Utilize a CLI para criar uma cópia de segurança local
omniroute backup create --name pre-migration

# Ou através da API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

O ficheiro de cópia de segurança inclui:

- Todas as tabelas da BD (serializadas em JSON)
- Artefactos do registo de chamadas (codificados em base64, opcionais)
- Definições + segredos (encriptados)
- Configuração de plug-ins

### Restauro

```bash
# Através da CLI
omniroute restore pre-migration

# Através da API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Aviso**: o restauro substitui toda a BD. Pare primeiro todos os clientes.

### Cópias de segurança automatizadas

```bash
# Ative cópias de segurança diárias automatizadas através da CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

O agendamento é executado no servidor por uma tarefa em segundo plano, que é acionada a cada 30 segundos
(por predefinição) e avalia a expressão cron relativamente à hora local do servidor.

| Variável                                    | Predefinição | Descrição                                                                                                                            |
| ------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`      | Intervalo de acionamento em ms (mín. `5000`). Tem de ser inferior a 60 s para ocorrer de forma fiável no minuto cron correspondente. |

### Cópia de segurança dinâmica do SQLite

Para efetuar uma cópia de segurança sem tempo de inatividade de uma BD em utilização:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Este comando utiliza a API de cópia de segurança online do SQLite — é seguro executá-lo enquanto o OmniRoute está em funcionamento.

---

## Ajuste de desempenho

### Modo WAL

WAL está ativado por defeito. Para cargas de trabalho de elevada gravação, considere:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute não define `journal_size_limit`. Um ponto de verificação move os quadros WAL para o ficheiro principal, mas o ficheiro WAL mantém o seu maior tamanho alocado. O guarda `OMNIROUTE_WAL_GUARD_MAX_MB` apenas avisa e executa `wal_checkpoint(RESTART)`; não é um limite de tamanho do disco.

### Índices

Índices-chave de desempenho (criados automaticamente pelas migrações):

- pesquisas de modelo `idx_models_provider` — por fornecedor
- expansão de alvos combo `idx_combo_targets_combo_id` —
- análise de utilização `idx_usage_history_api_key_timestamp` —
- rastreio de cota `idx_quota_snapshots_api_key_window` —
- consultas de registo de chamadas `idx_call_logs_timestamp` —

Para adicionar um novo índice, crie uma migração:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O mapeado em memória

Para bases de dados muito grandes (> 10GB), o mapeamento de memória pode ser ajustado através do SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compactação

As instâncias OmniRoute de longa execução beneficiam de `VACUUM` ocasionais:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Execute mensalmente durante janelas de baixo tráfego. (o modo WAL reduz a necessidade, mas não a elimina.)

---

## Verificação de Estado

`src/lib/db/healthCheck.ts` fornece **diagnósticos do estado ao nível da BD**:

Ambos os verbos requerem autenticação (caso contrário, `401`). `GET` apenas efetua o diagnóstico; `POST` executa a
mesma verificação com `autoRepair` ativado.

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
      "description": "Os orçamentos dos domínios faziam referência a chaves de API que já não existem.",
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

| Campo             | Significado                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` quando `issues` está vazio. `driver` nunca o influencia.                                                                                                                                              |
| `issues[].type`   | Um de `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                                       |
| `repairedCount`   | Linhas reparadas durante esta execução; é sempre `0` quando `autoRepair` é false.                                                                                                                            |
| `backupCreated`   | Indica se foi criada uma cópia de segurança antes da reparação.                                                                                                                                              |
| `checkedAt`       | Carimbo de data/hora ISO partilhado pela execução e por qualquer nota de reparação que esta escreva.                                                                                                         |
| `driver.name`     | Controlador SQLite que serve a base de dados verificada.                                                                                                                                                     |
| `driver.degraded` | `true` quando as escritas não são guardadas de forma duradoura pelo ficheiro da base de dados — o recurso de contingência WASM `sql.js` (persistência do ficheiro completo) ou uma base de dados em memória. |

A mesma carga útil é devolvida pela ferramenta MCP `omniroute_db_health_check`.

Execute `PRAGMA integrity_check` para detetar corrupção:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Deve apresentar: ok
```

Se devolver qualquer resultado que não seja `ok`, **pare imediatamente de utilizar a base de dados** e restaure-a a partir de uma cópia de segurança.

---

## Recuperação após desastre

### Cenário 1: Ficheiro WAL perdido

O ficheiro `-wal` está em falta, mas o ficheiro `-shm` e a BD principal estão intactos:

```bash
# Recupera automaticamente na próxima abertura
omniroute
```

Se o SQLite não conseguir recuperar automaticamente:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Cenário 2: Ficheiro da BD principal corrompido

Restaure a partir da cópia de segurança:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` apenas transfere um arquivo `.tar.gz` completo a partir de um servidor em execução
(`GET /api/db-backups/exportAll`, é necessária uma credencial de operador); não restaura nada.

### Cenário 3: Chave de encriptação perdida

**Não é possível recuperar** sem a chave. Os campos encriptados estão ilegíveis. Volte a adicionar manualmente todos os fornecedores com novas credenciais.

> **Mitigação**: Crie sempre uma cópia de segurança da chave de encriptação em separado, idealmente num gestor de palavras-passe ou KMS.

### Cenário 4: Disco cheio

O SQLite devolverá erros `SQLITE_FULL`. Liberte espaço em disco e, em seguida:

```bash
# Efetuar o checkpoint do WAL para libertar espaço
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

### Repor (Apagar) Todos os Dados

```bash
# Pare primeiro o OmniRoute
omniroute stop

# Elimine o ficheiro da BD
rm ~/.omniroute/storage.sqlite*

# Reinicie (será recriada uma BD vazia)
omniroute
```

Para uma reposição **seletiva** (manter os fornecedores e apagar os dados de utilização):

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

## Resolução de Problemas

### "A base de dados está bloqueada"

Outro processo está a manter um bloqueio de escrita. Pode:

- Aguardar que o outro processo termine (verifique com `lsof | grep storage.sqlite`)
- Terminar o outro processo
- Se o problema persistir, reiniciar o OmniRoute

### "Falha na restrição de chave externa"

Um módulo de domínio está a violar a integridade referencial. Verifique:

- Linhas órfãs em tabelas dependentes
- Eliminações em cascata que não foram propagadas
- Uma migração recente que tenha alterado uma chave externa

Execute `PRAGMA foreign_key_check;` para encontrar violações.

### "Memória insuficiente"

A E/S mapeada em memória do SQLite está a exceder o limite do sistema operativo. Reduza-a através de um pragma do SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB em vez de 256MB
```

Ou desative-a:

```sql
PRAGMA mmap_size = 0;
```

### "A migração falhou a meio"

A migração foi executada numa transação, pelo que deverá ter sido revertida. Caso contrário:

1. **Pare o OmniRoute** (para impedir novas tentativas)
2. **Verifique o estado da BD** com `sqlite3`
3. **Corrija manualmente** a migração parcial
4. **Volte a executar** o OmniRoute (a migração será repetida)

Para evitar esta situação, teste sempre primeiro as migrações numa cópia.

---

## Consulte Também

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabelas de utilização
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorização do estado
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — fluxo de lançamento
- Código-fonte: `src/lib/db/` (mais de 80 ficheiros, cerca de 25 mil linhas de código)
