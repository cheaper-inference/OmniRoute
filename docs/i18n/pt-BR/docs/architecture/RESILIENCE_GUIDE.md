# Resilience Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute possui três mecanismos de resiliência distintos, mas relacionados. Cada um tem um escopo e propósito diferente. Mantenha-os separados ao depurar o comportamento de roteamento.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Precedência Env-vs-dashboard para alternâncias de resiliência.** Os alternadores de resiliência opt-in propagados do ambiente — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — fornecem apenas o _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Um booleano persistiu em `resilienceSettings` (Dashboard →** Configurações de resiliência →** / `PATCH /api/resilience`, armazenado em `key_value`) vence o valor env: a normalização (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) mantém o booleano armazenado sempre que existir. Definir tal env var para `true` em uma implantação onde o painel já salvou `false` portanto, não muda nada — ative o botão de alternância** Configurações de resiliência →** (ou limpe o campo armazenado).

## 1. Circuit Breaker de Provedor

**Escopo:** provedor inteiro (por exemplo, `glm`, `openai`, `anthropic`).

**Propósito:** parar de enviar tráfego para um provedor que está falhando repetidamente no nível de upstream/serviço.

**Implementação:**

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Integração: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de status: `GET /api/monitoring/health`
- API de redefinição: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabela do banco de dados: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — tráfego normal permitido
- `DEGRADED` — tráfego ainda permitido, mas falhas elevadas do provedor estão sendo rastreadas; retorna a `CLOSED` após sucessos suficientes, após um teste de conexão válido, ou após a maior retenção em `OPEN` para o último tipo de falha (seu valor `cooldownByKind`, caso contrário `resetTimeout`, × `maxBackoffMultiplier`, no mínimo um cooldown) sem uma nova falha
- `OPEN` — provedor temporariamente bloqueado; o roteamento combo o ignora
- `HALF_OPEN` — timeout de redefinição decorrido; requisição de sondagem permitida

**Padrões configuráveis (`open-sse/config/constants.ts`, expostos em Dashboard → Configurações → Resiliência):**

| Classe       | Degrada com | Abre com  | Timeout de redefinição |
| ------------ | ----------- | --------- | ---------------------- |
| OAuth        | 5 falhas    | 8 falhas  | 60s                    |
| Chave de API | 7 falhas    | 12 falhas | 30s                    |
| Local        | derivado    | 2 falhas  | 15s                    |

`degradationThreshold` controla quando um provedor entra em `DEGRADED`; `failureThreshold` controla quando ele abre e passa a ser ignorado. Os perfis de provedor local ainda não estão expostos na página de configurações de Resiliência.

**Códigos de disparo:** apenas status de nível de provedor `[408, 500, 502, 503, 504]`. NÃO dispara para erros de nível de conta (a maioria dos 401/403/429 — esses pertencem ao cooldown ou lockout).

**Recuperação preguiçosa (lazy):** quando `OPEN` expira, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`. As mesmas leituras (e a próxima falha) fazem um `DEGRADED` obsoleto decair de volta para `CLOSED`. Nenhum timer em segundo plano é necessário.

---

### Cooldown global opcional de provedor (controle por janela)

Uma quarta camada, **opcional (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`, padrão **desativado**), mantém uma
memória entre requisições dos provedores com falha em
`open-sse/services/providerCooldownTracker.ts`, consultada pela resolução de
alvos do combo para que requisições combo consecutivas parem de percorrer novamente
um provedor que acabou de falhar. As entradas de nível de provedor respeitam o
controle de janela do `PROVIDER_PROFILES`:

| Perfil       | dispara após (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | permanece em cooldown por (`providerCooldownMs`) |
| ------------ | ----------------------------------------: | ------------------------------------: | -----------------------------------------------: |
| OAuth        |                                      `10` |                               `15min` |                                           `5min` |
| Chave de API |                                      `15` |                               `30min` |                                          `10min` |

Abaixo do limiar, o provedor **não** é considerado em cooldown; um sucesso limpa
a janela. As entradas de nível de conexão (`provider:connectionId`) mantêm, em vez disso,
o backoff exponencial `minRetryCooldownMs → maxRetryCooldownMs`. Substituições:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Proteção contra regressão: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Cooldown de conexão

**Escopo:** conexão/conta/chave de um único provedor.

**Objetivo:** ignorar uma chave com problemas enquanto outras conexões do mesmo provedor continuam atendendo.

**Implementação:**

- Marcar como indisponível: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção: `getProviderCredentials*` no mesmo arquivo
- Cálculo do cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configurações: `src/lib/resilience/settings.ts`

**Campos por conexão:**

- `rateLimitedUntil` — timestamp até o qual o cooldown expira
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contador de backoff exponencial

**Cooldowns padrão:**

- Base do OAuth: 5s
- Base da chave de API: 3s
- API-key 429: prefere cabeçalhos upstream `Retry-After`/reset/texto de reset analisável
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Atraso de nova tentativa por provedor.** A página de detalhes do provedor tem um seletor de **Atraso da nova tentativa** (Automático,
15s até 1h). Ele salva `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, por meio de `PATCH /api/resilience`). Quando um erro de limitação de taxa não contém uma
dica upstream de nova tentativa, esse valor substitui o backoff escalonado para o provedor e redefine
`backoffLevel` para 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Precedência para um erro de limitação de taxa, da maior
para a menor: dica upstream de nova tentativa, depois `providerSpecificData.rotationOverrides.rateLimitResetSeconds`
por conexão, depois o atraso de nova tentativa por provedor, depois
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` do ambiente e, por fim, o backoff escalonado. O modo
Automático remove o campo. Isso afeta apenas o motivo de limitação de taxa, nunca estados terminais.

**Proteção contra o efeito manada:** impede que falhas concorrentes estendam excessivamente o cooldown ou incrementem `backoffLevel` duas vezes.

**429s de limite de concorrência não avançam na escada de backoff.** Um `429` cujo corpo relata um
limite de concorrência ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) significa que a conta está saudável, mas ocupada.
`checkFallbackError()` retorna o motivo `concurrency_limited`: faz failover imediatamente para a próxima
conexão, aplica a esta conexão um cooldown fixo de `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ou a dica upstream de nova tentativa,
mantém `backoffLevel` inalterado e define `skipProviderBreaker`.
Um corpo de cota explícito ainda prevalece; portanto, um corpo que também corresponda a um padrão de cota
continua sendo considerado uma decisão de cota. Detecção: `looksLikeConcurrencyLimit()` em `src/shared/utils/classify429.ts`;
decisão: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (o `FailureKind` do
disjuntor) permanece inalterado e ainda lê `rate_limit` para esses corpos.

**Paradas no conteúdo do fluxo não aplicam cooldown à conta.** Quando o watchdog de parada de conteúdo
(`open-sse/utils/streamHandler.ts`) desiste de um fluxo que não enviou nenhuma saída do modelo no tempo
esperado, `markAccountUnavailable()` registra o erro na conexão, mas não define nenhum cooldown: a
parada pertence àquela solicitação, geralmente um turno de raciocínio longo sem saída até o momento.
Os operadores podem ativar esse comportamento com `resilienceSettings.streamStallCooldown.enabled`
(o padrão é `false`).

**Sinal de latência opcional para a seleção de contas `p2c`.** Cada tentativa enviada registra seu
tempo até o primeiro byte e o resultado por conexão (e por conexão + modelo) em uma janela móvel
na memória: as últimas 20 amostras dentro de 15 minutos
(`open-sse/services/connectionLatencyTracker.ts`, registradas a partir de `safeLogEvents()` em
`src/sse/handlers/chatHelpers.ts`). Quando `resilienceSettings.p2cLatency.weight` é maior que
`0` (intervalo de 0–20, padrão `0` = desativado), `compareP2CConnections()` em `src/sse/services/auth.ts` adiciona
até `weight` pontos a cada candidato do par. Metade disso vem da latência como uma proporção em relação
ao candidato mais rápido (duas vezes mais lento recebe metade do valor total) e metade vem da taxa de
erros móvel. O termo só se aplica quando ambos os candidatos têm pelo menos 3 amostras, para que contas
novas não sejam penalizadas, e seu teto permanece abaixo das penalidades de bloqueio e esgotamento de
cota. Ele não adiciona nenhum circuito próprio: contas com falha continuam sendo tratadas pelas camadas
de cooldown, bloqueio e disjuntor. Defina-o com `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Frames de raciocínio reiniciam o orçamento de parada do conteúdo.** Um modelo de raciocínio pode pensar por
minutos antes do primeiro token visível: o Claude transmite frames `thinking_delta` cujo texto de
raciocínio pode estar vazio, e a Responses API transmite um item de raciocínio após o outro.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) reconhece esses frames, e o watchdog
reinicia seu orçamento a cada um deles em vez de cancelar o turno. Eles ainda não são saída do modelo,
portanto um turno que termina apenas com raciocínio continua sendo reportado como vazio, e um turno que
para de raciocinar e envia apenas heartbeats ainda aciona o watchdog.

Os frames binários `reasoningContentEvent` do Kiro com uma assinatura não vazia preservam essa atividade
de raciocínio através do executor como um delta `reasoning_content` vazio. A assinatura não é encaminhada.
Metadados, frames incompletos e assinaturas vazias não reiniciam o orçamento de conteúdo; o timeout
independente do fluxo ativo e o cancelamento pelo cliente ainda se aplicam
(`open-sse/executors/kiro/reasoning.ts`).

**Estados terminais (NÃO são cooldowns):**

- `banned` — definido pela detecção de palavra-chave proibida / banimento de conta (consulte [BAN_DETECTION](../security/BAN_DETECTION.md)). Recusas upstream por solicitação (`request_rejected`, por exemplo, OAuth do Anthropic 403 "Request not allowed") nunca o definem: elas são contabilizadas por conexão e modelo e retiram esse modelo da rotação com um cooldown crescente limitado a `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ou aplicam cooldown à conexão quando nenhum modelo é conhecido — `open-sse/services/requestRejectedStreak.ts`
- `expired` (passa para o estado terminal após novas tentativas limitadas — `EXPIRED_RETRY_MAX = 3` com backoff exponencial — para que erros transitórios de OAuth possam se recuperar automaticamente antes de a conta ser desativada permanentemente)
- `credits_exhausted`

Eles permanecem assim até que as credenciais mudem ou um operador os redefina. Não substitua estados terminais por um estado transitório de espera.

**Recuperação lenta:** quando `rateLimitedUntil` tiver passado, a conexão volta a estar elegível. Após um uso bem-sucedido, `clearAccountError()` limpa todos os campos de erro.

### Limite de uso do Claude OAuth: faixa de menor prioridade + redefinição do limite da sessão

**Escopo:** uma conexão de assinatura do Claude (OAuth). Ambos os recursos são **opcionais por
conexão** (Editar conexão → seção Claude → `lowPriorityMode` / `autoLimitReset` em
`providerSpecificData`, ambos desativados por padrão) e reproduzem os comandos `/low-priority` e
`/limit-reset` do Claude Code (contrato de comunicação capturado do Claude Code 2.1.263).

**Implementação:**

- Máquina de estados + classificação de respostas: `open-sse/services/claudeLowPriority.ts`
- Cliente de status/solicitação de redefinição: `open-sse/services/claudeLimitReset.ts`
- Hook do executor (injeção de cabeçalho + nova tentativa na mesma conta): `open-sse/executors/base.ts::execute()`
- Persistência da ativação: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Gatilho:** o limite de uso de 5 horas — um `429` cujos cabeçalhos contenham
`anthropic-ratelimit-unified-status: rejected` e, quando a conta for elegível,
`anthropic-ratelimit-unified-slow-offer: treatment`. Nada é enviado antes do primeiro `429` desse limite;
um `429` em rajada sem cabeçalhos unificados segue o caminho normal de espera.

**Faixa de menor prioridade** (`lowPriorityMode`):

- No `429` do limite, o executor aceita a oferta e tenta imediatamente novamente na **mesma**
  conta com `anthropic-usage-limit: slow`; a faixa permanece ativa até o
  `anthropic-ratelimit-unified-reset` anunciado (+60 s de tolerância), e todas as solicitações
  nessa janela carregam o cabeçalho. O `429` interceptado nunca chega a `handleChatCore`, portanto a
  conexão **não** entra em espera nem é alternada.
- `anthropic-ratelimit-unified-slow-status` em respostas posteriores: `active` / `not_needed`
  mantêm a faixa; `slot_busy` (429) ou um `529` aguardam o valor de
  `anthropic-ratelimit-unified-slow-retry-after` informado pelo servidor (padrão de 20 s, limitado
  entre 5 e 600 s, com jitter de ±30%) e tentam novamente, limitados por
  `anthropic-ratelimit-unified-slow-max-wait` (padrão de 20 min, limitado entre
  1 min e 6 h) — depois disso, a faixa termina e um período de espera de 10 minutos bloqueia uma
  nova aceitação. A espera também é limitada pelo tempo restante do próprio timeout de início do
  upstream da solicitação (`resolveFetchStartTimeout`, 10 min por padrão), menos uma margem de 5 s:
  sem esse limite, o `max-wait` padrão de 20 minutos ultrapassaria a duração da solicitação, e o
  sono seria interrompido no meio da espera, exibindo um `TimeoutError` em vez de um encerramento
  normal `max_wait` + período de espera.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, a virada da janela de 5 horas ou
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (que a encerra como
  `extra_usage` em qualquer status, pois o excedente pago agora cobre o limite) encerram a faixa; a
  resposta então segue para o caminho normal de espera. `budget_exhausted` é lembrado até a redefinição
  de orçamento anunciada (≤ 8 dias).
- A verificação do limite é executada após as próprias novas tentativas intraexecução orientadas por
  `400` do executor (edição de contexto, limites de thinking/effort, aprendizado automático de
  parâmetros), portanto um `429` de limite que só apareça em uma dessas novas tentativas ainda será
  interceptado, em vez de chegar ao caminho de espera.
- O estado fica na memória por conexão (uma reinicialização exige um `429` adicional do limite para
  aceitar novamente).

**Redefinição do limite da sessão** (`autoLimitReset`, tentada antes da faixa quando ambas estão ativadas):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloco
  `juniper_tide`; quando `arm: "reset"` e `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` com
  `{ "program": "juniper_tide" }` (UUID da organização obtido de `providerSpecificData.organizationUUID`,
  com fallback de inicialização).
- `result: reset|not_limited` → a solicitação é tentada novamente em velocidade máxima (sem o
  cabeçalho slow). `already_used` / `not_offered` armazenam em memória
  `next_available_at` (uma semana por padrão); qualquer falha aplica um recuo de 15 minutos. A
  redefinição ocorre uma vez por semana e ainda conta para o limite semanal.

Proteções de regressão: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinidade de sessão (#7274)

**Escopo:** uma sessão do cliente (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`
header) fixada a uma conexão, para **qualquer** provedor.

**Objetivo:** manter um agente de várias etapas (Claude Code, aider, agentes personalizados) na mesma
conta entre as solicitações, reduzindo a perda de contexto entre contas e os repetidos `429` de
inicialização a frio em provedores com estado de sessão por conta.

**Implementação:**

- Resolução do TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Seleção/criação da fixação: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extração do cabeçalho (genérica, qualquer provedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela de fixações persistidas: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Configuração: `sessionAffinityTtlMs` (TTL global em ms, `0` desativa) — `src/lib/db/settings.ts`. Renomeada
  de `codexSessionAffinityTtlMs`, exclusiva do Codex, pela migração
  `124_generic_session_affinity_ttl.sql`, que transfere qualquer TTL do Codex configurado anteriormente
  como o novo padrão.

Antes de #7274, `resolveSessionAffinityTtlMs()` retornava imediatamente `0` para todos os provedores
exceto `codex`, portanto a configuração de TTL (e os cabeçalhos de sessão) não tinha efeito em nenhum
outro lugar, embora o mecanismo de fixação e a extração de cabeçalhos já fossem independentes do
provedor. A correção removeu esse retorno antecipado; agora o TTL se aplica uniformemente a todos os
provedores quando definido globalmente acima de `0`.

Os três cabeçalhos de afinidade de sessão nunca são encaminhados ao upstream — os executores
constroem seus próprios cabeçalhos de upstream do zero, em vez de repassar os cabeçalhos do cliente,
portanto isso continua sendo apenas um identificador interno de correlação.

### Concessões exclusivas de conexão para sessões gerenciadas

**Escopo:** um cliente/sessão HTTP gerenciado ativo possui uma conexão OmniRoute elegível.

**Objetivo:** fornecer propriedade exclusiva e durável da conexão para clientes que precisam de uma
barreira rígida de roteamento entre solicitações. Isso difere da afinidade de sessão, que é uma
preferência de continuidade flexível: uma concessão exclusiva persiste o estado do ciclo de vida
no SQLite, impõe exclusividade global de proprietário ativo e conexão ativa e rejeita uma geração
obsoleta antes do encaminhamento ao provedor.

O recurso é opcional por chave de API. Uma chave gerenciada deve ter o escopo `lease:exclusive` e uma
lista `allowedConnections` explícita e não vazia. Qualquer cliente pode usar o endpoint do ciclo de
vida; nenhum nome de cliente, user-agent, provedor, método OAuth ou modelo é necessário. A concessão
possui uma conexão, não um modelo, portanto uma alteração de modelo mantém a vinculação enquanto a
conexão permanecer normalmente elegível. As regras normais de modelo, cota, integridade, cooldown e
lista de permissões continuam sendo autoritativas e podem transferir a mesma geração para outra
conexão elegível livre.

O ciclo de vida é `POST /api/v1/session-leases` com as ações JSON `acquire`, `renew` e `release`.
As solicitações de inferência gerenciadas apresentam o valor opaco
`X-OmniRoute-Lease-Owner` e o valor exato de `X-OmniRoute-Lease-Generation`. O proprietário usa
`vlo_` seguido por 43 caracteres base64url; somente seu hash SHA-256 é armazenado. Cada barreira de
encaminhamento final também associa o ID da chave de API autenticada e o ID da conexão ativa. Os
cabeçalhos de controle da concessão são removidos dos logs, dos instantâneos de solicitações retidos
e dos cabeçalhos do executor upstream.

Se o roteamento normal tiver candidatos gerenciados elegíveis, mas todos os candidatos livres
estiverem ocupados por uma concessão ativa de outra entidade, o OmniRoute retornará HTTP `429`, o
código lease-capacity-unavailable, o estado waiting-for-capacity e um `Retry-After` limitado
derivado da expiração relevante mais próxima. A ausência normal de elegibilidade não é contenção de
concessão e mantém a semântica de erro de roteamento existente.

Os mecanismos relacionados continuam separados:

- A ocupação de sessão OAuth é uma distribuição flexível local ao processo para contas OAuth.
- Os semáforos de conta concedem permissões de concorrência de solicitações e terminam quando uma solicitação é concluída.
- As concessões exclusivas de sessão gerenciada são propriedade durável do ciclo de vida com uma barreira de geração.

## 3. Bloqueio de modelo

**Escopo:** combinação de provedor + conexão + modelo.

**Escopo da chave por status:** o status que falhou determina em qual chave o bloqueio é gravado
(`resolveLockoutScope()` em `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — um sinal de cota ou direito de acesso — bloqueia a **família de cota**:
  para codex, todo o escopo `codex` / `spark` (todos os modelos `gpt-5*` da
  conexão); para outros provedores, `getQuotaScopedModelForProvider()`.
- `404` bloqueia o modelo básico (`getModelLockKey()` restringe `not_found`).
- Qualquer outro status — falhas de transporte/servidor `5xx` e o `502` sintetizado pelo próprio OmniRoute
  a partir da validação de qualidade — bloqueia apenas a combinação **exata**
  de provedor/conexão/modelo. Um stream inválido em um modelo não é evidência sobre a cota da conta; antes desta regra, uma resposta vazia em
  `codex/gpt-5.6-luna` removia todos os modelos `gpt-5*` dessa conexão do
  roteamento por 2–30 min (com escalonamento), enquanto sua cota permanecia intacta.
- A opção `scope` explícita do chamador sempre tem precedência (Antigravity transmite `"exact"`).

**Objetivo:** evitar desabilitar uma conexão inteira quando apenas um modelo está indisponível ou limitado por cota.

**Exemplos:**

- Provedores com cota por modelo retornando 429
- Provedores locais retornando 404 para um modelo ausente
- Falhas de permissão específicas do provedor para modo/modelo (por exemplo, modos do Grok)

**Implementação:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Painel de resfriamentos de modelos (v3.8.0)

UI: Configurações → Resfriamentos de modelos (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Lista bloqueios ativos com: provedor, conexão, modelo, motivo, expiresAt. Os operadores podem reativar manualmente um modelo pelo cartão.

**API REST:**

- `GET /api/resilience/model-cooldowns` — lista bloqueios ativos
- `DELETE /api/resilience/model-cooldowns` — reativação manual. Corpo: `{provider, connection, model}`. Auth: management.

### Gerenciador de resfriamentos

UI: Monitoramento → Gerenciador de resfriamentos (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Uma página para cada conexão que está fora do roteamento por um motivo transitório, em vez de
abrir a página de cada provedor. Ela lista resfriamentos de conexão, bloqueios de modelo e estados terminais,
limpa-os por conexão, para uma seleção ou para todas as conexões de um provedor,
e edita as regras de resfriamento mais ajustadas: `streamStallCooldown.enabled` e o resfriamento base
`connectionCooldown` de OAuth / chave de API e o número máximo de etapas de recuo (salvos por meio de
`PATCH /api/resilience`). Os estados terminais (`banned`, `expired`, `credits_exhausted`) são
listados, mas nunca são limpos aqui.

O cartão **Regras de resfriamento de erros** na mesma página edita as regras de erro do operador
(`settings.providerErrorRules`) e os padrões abrangentes por provedor
(`settings.providerErrorDefaults`) por meio de `PATCH /api/settings` — consulte "Regras declaradas pelo operador"
na §7 para saber como elas correspondem. As durações são Padrão (sem resfriamento explícito), 30 min,
1 h, 5 h, 24 h ou um valor personalizado de 1 a 43.200 minutos (30 dias).

**API REST** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — conexões com status, resfriamento restante,
  nível de recuo, último tipo de erro e bloqueios de modelo (sem credenciais)
- `POST /api/resilience/cooldowns` — corpo `{connectionIds: string[]}` ou
  `{all: true, provider?}`; retorna `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI de configurações de bloqueio + recuperação por redução após sucesso (v3.8.23)

O bloqueio de modelo deixou de ser um comportamento sempre ativo e codificado diretamente para se tornar um
recurso totalmente configurável e opcional, com seu próprio cartão de configurações e um caminho de recuperação autocorretivo.

**Cartão de configurações:** Configurações → Bloqueio de modelo
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ele é **distinto** do `ModelCooldownsCard` somente leitura acima (que apenas
_lista_ bloqueios ativos) — o novo cartão _configura os parâmetros_. Os padrões estão em
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Configuração            | Padrão                           | Significado                                                                  |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Alternância principal — o bloqueio de modelo fica **desativado por padrão**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Status upstream que contam como uma falha no escopo do modelo.               |
| `baseCooldownMs`        | `120_000` (120 s)                | Duração inicial do bloqueio na primeira falha.                               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite do resfriamento escalonado.                                           |
| `maxBackoffSteps`       | `10`                             | Número máximo de etapas de escalonamento do recuo exponencial.               |
| `useExponentialBackoff` | `true`                           | Define se falhas repetidas aumentam o resfriamento exponencialmente.         |

As configurações persistem pelo armazenamento normal de configurações e são validadas pelo
esquema de configurações de resiliência; o cartão limita `baseCooldownMs`/`maxCooldownMs`
(com `maxCooldownMs ≥ baseCooldownMs`) e `maxBackoffSteps`.

**Recuperação por redução após sucesso:** a recuperação **não** depende apenas do vencimento do temporizador. Uma
resposta saudável reduz progressivamente a contagem de falhas do modelo, para que um modelo que se recuperou
no meio da janela pare de escalar (e seja desbloqueado) antes do vencimento do temporizador. Em um alvo de combinação bem-sucedido, `open-sse/services/combo.ts` chama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que **divide pela metade** o valor armazenado de
`failureCount` (`Math.floor(failureCount / 2)`); quando chega a `0`, a entrada de bloqueio é excluída
por completo. O equivalente `recordModelLockoutFailure()` incrementa a contagem (e aumenta o resfriamento)
em falhas ocorridas dentro da janela de escalonamento. Essa redução após sucesso é adicional ao simples vencimento do temporizador —
qualquer um dos caminhos pode reativar um modelo.

**Estado:** os bloqueios são mantidos **na memória** (`Map`s por processo de
`ModelLockoutEntry` indexados por `provider:connectionId:model`; bloqueios de escopo exato por
`provider:connectionId:exact:model`), e não persistidos
no banco de dados — eles são perdidos ao reiniciar. As _configurações_ são persistidas; o _estado_ ativo dos
bloqueios é efêmero.

---

## 4. Controle de concorrência de compartilhamento de cota (v3.8.36)

Contas de assinatura (GLM, MiniMax etc.) geralmente aceitam apenas ~1–3
solicitações simultâneas; exceder esse limite aciona 429s e períodos de espera.
Isso é especialmente crítico em combinações de **compartilhamento de cota**
(`qtSd/…`), nas quais várias chaves de API compartilham uma conta upstream. Três
camadas impedem que uma conta compartilhada seja inundada.

### Limite de concorrência por conexão (`max_concurrent`)

Cada conexão de provedor pode declarar um limite de `max_concurrent`
(`provider_connections.max_concurrent`, definido no modal de conexão / API / DB).
Deixe-o vazio para não impor limite. Esse é o controle único que direciona a camada
de serialização abaixo — defina-o como a concorrência real da conta (por exemplo,
GLM ~1, MiniMax ~2).

### Limites de concorrência por modelo (`modelConcurrency`)

Uma conexão também pode declarar limites exatos de concorrência por modelo
dentro do mapa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Defina-o no modal de conexão (**Rate limit overrides → Per-model
concurrency caps**, um `model=cap` por linha) ou via
`PATCH /api/providers/[id]` com a mesma estrutura JSON. Semântica das chaves:

- **Limite para toda a conexão vs. específico do modelo:** `maxConcurrent` continua sendo o limite compartilhado para toda a conexão. Quando ambos se aplicam, os dois gates são adquiridos atomicamente no mesmo gate composto
  (`global → provider → account → model`); o comportamento efetivo é o limite aplicável mais restritivo.
- **Correspondência exata da chave do modelo:** a chave é a string do modelo passada ao executor após a resolução do roteamento — normalmente o ID bruto do modelo upstream
  (`glm-5`), não um alias `provider/model` do lado do cliente (`zai/glm-5` não corresponde a `glm-5`). Os valores são limites positivos inteiros de solicitações simultâneas.
- **Enfileiramento local, sem descoberta:** as solicitações excedentes entram na fila local com a semântica existente de fila/tempo limite (erros de admissão tipados `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). O OmniRoute não descobre nem infere políticas upstream — ele aplica os limites exatos configurados pelo operador. Um gate de modelo saturado nunca desabilita o provedor e nunca cria um bloqueio permanente do modelo; o comportamento upstream de 429/espera/alternativa continua sendo a proteção contra erros.
- **Escopo por conexão e por processo:** os limites são definidos por conexão do banco de dados e mantidos na memória, portanto duas conexões que reutilizem a mesma chave de API upstream não coordenam entre si.
- **Não configurado significa inalterado:** omitir o mapa (ou deixar o campo do painel em branco) não adiciona nenhum gate de modelo. Exemplo de configuração sem declarar nenhum limite universal de provedor:

```text
glm-5=1
glm-4.7=3
```

### Serialização de solicitações de compartilhamento de cota

Quando um despacho de compartilhamento de cota direciona para uma conexão que declara um
`max_concurrent` positivo, as solicitações simultâneas para essa **conta** são serializadas por meio de um semáforo por conexão (chave `qsconn:<connectionId>`): as solicitações excedentes **aguardam na fila** em vez de inundarem a conta. Ele é **fail-open** — uma fila saturada ou um tempo limite prossegue sem um slot, em vez de rejeitar uma solicitação que poderia ser despachada. Ative ou desative em **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ativado por padrão). Sem um limite `max_concurrent`, o comportamento permanece inalterado.

> O gate de roteamento de compartilhamento de cota (`selectQuotaShareTarget`, DRR + P2C) também é
> fail-open e apenas _reduz a prioridade_ de uma conexão no limite — com um
> pool de uma única conexão, ele não pode impor um limite rígido; portanto, este semáforo é o que efetivamente contém a inundação.

### Nova tentativa com reconhecimento do período de espera da combinação

Para todas as estratégias de combinação (quando ativadas), uma solicitação que cristalizaria um 429
para um período de espera transitório CURTO aguarda esse período e é redistribuída, em vez de
retornar o 429 — isso abrange janelas TPM/RPM de classe Gemini (~60s de retry-after)
em combinações de vários modelos, por exemplo, quando ambos os destinos de uma combinação de 2 modelos atingem um limite de taxa por modelo. Limitado por `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) em **Settings → Resilience**. Ele nunca aguarda em `quota_exhausted`
(bloqueado até a meia-noite) nem em motivos de autenticação/modelo não encontrado.

Uma combinação pode optar por não participar com `config.comboCooldownWaitEnabled: false`. Somente `false` literal desabilita essas esperas compartilhadas da combinação (espera pós-despacho e espera pré-despacho de circuito aberto/bloqueio do modelo) e a extensão do piso de tempo limite do orçamento de espera. Ausente ou `true` preserva a política global; `true` não pode ativar globalmente uma espera desabilitada. Um `targetTimeoutMs` explícito ainda prevalece. Essa opção não altera a espera pré-despacho separada de fixação de turno do Codex nativo.

O mesmo gate abrange o caso pré-despacho (#16319): quando todos os destinos de uma combinação são ignorados antes de qualquer tentativa porque o modelo está em um bloqueio transitório curto, o caminho com zero tentativas aguarda o fim do bloqueio dentro dos mesmos limites e redistribui, em vez de responder com um
`503 ALL_TARGETS_SKIPPED` sem dica. Quando nenhuma espera é permitida (limite, tentativas ou orçamento esgotado, ou recurso desativado), a resposta terminal é atualizada para
`429 rate_limit_error`, contendo `retry_after` / `reset_at` da expiração do bloqueio transitório mais próxima; bloqueios de cota, autenticação e modelo não encontrado continuam retornando 503 sem dica.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Controle de Admissão da Fila de Requisições (v3.8.49 · issue #6593)

**Escopo**: a fila local de rate limit por provedor+conexão (`open-sse/services/rateLimitManager.ts`,
respaldada pelo Bottleneck), uma camada abaixo dos três mecanismos acima.

**`maxWaitMs` limita a espera na fila; `executionMaxWaitMs` limita a execução.**
Os dois são deliberadamente separados, e nenhum alimenta o outro.

`resilienceSettings.requestQueue.maxWaitMs` é o **orçamento de espera na fila**: ele
cobre a espera por um slot do provedor e depois a permanência em QUEUED, e seu
temporizador é limpo no momento em que o job sai de QUEUED e começa a executar
(`rateLimitManager.ts`, `wrappedFn`). Uma requisição que o excede nunca chega
ao upstream. Padrão 30000ms, fornecido por `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
em `src/lib/resilience/settings.ts` e fixado por
`tests/unit/ratelimit-admission-control-6593.test.ts`, de modo que uma alteração nele
deixa esse teste vermelho em vez de deixar este parágrafo silenciosamente desatualizado.

`resilienceSettings.requestQueue.executionMaxWaitMs` é o que o Bottleneck
recebe como o `expiration` do job, cujo temporizador só inicia após o despacho. É
uma salvaguarda para executores sem um timeout de upstream próprio, e é
elevado ao timeout de início de fetch do próprio executor quando este é mais longo,
de modo que não pode cortar uma resposta saudável em andamento. Padrão 600000ms (10 min).

Alimentar o orçamento da fila no `expiration` era o que costumava matar gateways não incrementais
no meio do voo — eles rodam legitimamente por minutos antes dos primeiros bytes —
e é por isso que uma expiração é exposta como `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) enquanto o orçamento da fila carrega o
código de timeout da fila. Sobrescreva qualquer um deles via `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ou pelo dashboard
(**Settings → Resilience**). Ambos são restringidos ao intervalo de 1ms–24h quando normalizados.

**Precedência, para ambos:** a variável de ambiente só fornece o _padrão_. Um valor
persistido em `resilienceSettings.requestQueue` (dashboard / patch de API, armazenado
em `key_value`) prevalece sobre ela, e um
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` por conexão prevalece sobre esse. Definir
a variável de ambiente em uma implantação que já possui um valor persistido, portanto,
não muda nada — limpe ou atualize a configuração persistida em vez disso.

A permanência na fila é limitada pelo `maxWaitMs`; o `maxQueueDepth` abaixo limita quantos
chamadores podem estar enfileirados ao mesmo tempo.

**Retries declarados no corpo: ritmo vs bloqueio.** Um corpo 429 pode indicar sua própria espera
(`RetryInfo.retryDelay` do Gemini, texto "retry after Ns"), que o
`updateFromResponseBody` lê. Uma espera que cabe no `maxWaitMs`
da conexão é ritmo: o limitador esvazia seu reservatório por esse tempo e as chamadas
enfileiradas são despachadas quando ele se reabastece. Uma espera mais longa que o
`maxWaitMs` não é algo que a fila possa aguardar até o fim — o Gemini responde a uma
cota diária esgotada com `retryDelay: "86399s"`. O `Retry-After` retransmitido
no 429 reconstruído (#16528) já faz com que o motor de fallback bloqueie o modelo durante
essa janela, mas pausar o limitador por causa dela também ainda travaria qualquer
chamada que chegasse à chave mais cedo (após um reset de resiliência, por exemplo) por
todo o `maxWaitMs`. Quando tal espera vem de um detalhe `RetryInfo`
tipado do Google (a proveniência `google_rpc_retry_info`) e o limitador da chave
já tem escopo no modelo (veja `getLimiterKey`), o 429 passa a ser um
bloqueio de modelo naquela conexão (`lockModelForLongBodyRetry` em
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, limitado a 24h), e o
limitador permanece sem pausa. A seleção de conta pula com base nesse bloqueio via
`isModelLocked()`, e o mesmo acontece com o gate de pré-despacho do combo para alvos fixados
na conexão. No antigravity, cujo limitador é por família de cota, o bloqueio é
no modelo exato, como seus outros bloqueios de cota. O nome que o cliente solicitou
também é bloqueado quando um alias o resolveu para aquele modelo, porque essas
verificações usam o nome solicitado; ele é bloqueado de forma exata (`lockExactModel`),
de modo que um alias que cruza uma família de cota do antigravity ou um escopo do codex
nunca bloqueia o seu próprio. Uma dica em prosa, um `retryDelay` não tipado ou um
limitador compartilhado pela conexão inteira mantém a pausa. Quando o limitador que o
caminho do 429 acabou de reconstruir realmente pausa, um chamador cujo tempo restante
na fila termina antes do fim da pausa é rejeitado imediatamente com o código de
timeout da fila (`checkLimiterPause`), em vez de aguardar esse tempo se esgotar;
o fim registrado é ancorado antes de o limitador ser construído, onde o Bottleneck
inicia seu relógio de reabastecimento, e qualquer alteração posterior no reservatório
o esquece. Coberto por `tests/unit/rate-limit-long-body-retry-lockout.test.ts` e
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limite de admissão opcional (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
limita quantas requisições podem ficar enfileiradas (ainda não despachadas) para um
provedor+conexão ao mesmo tempo. Quando a fila já contém `maxQueueDepth`
requisições, uma nova requisição é rejeitada de forma rápida com um erro tipado
`code: "RATE_LIMIT_QUEUE_FULL"` **antes** de chegar a `limiter.schedule()`
— então a rejeição é barata e acontece antes de qualquer trabalho posterior de
compressão de prompt / tradução para essa requisição. Padrão `0` =
desabilitado, preservando o comportamento existente de fila ilimitada; limitado a 0–100000.
Sobrescreva via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ou
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch de API).

A verificação de admissão em si é uma função pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), portanto
pode ser testada unitariamente sem um limitador Bottleneck real.

> O RFC que abriu #6593 também propôs uma flag
> `bypassCompressionOnRateLimit`. O pipeline
> `open-sse/services/compression/` deste repositório é de compressão de
> prompt/contexto na requisição de saída para o LLM (`chatCore.ts`, em
> torno do bloco `resolveCompressionSettings`/`selectCompressionStrategy`),
> e não compressão de resposta HTTP em corpos 429 sintetizados — não existe
> um caminho de código correspondente para uma flag de bypass literal. Essa
> etapa de compressão de prompt também é executada atualmente _antes_ de
> `withRateLimit()` no pipeline de requisição, portanto reordená-la para
> ignorá-la em uma rejeição de fila cheia é uma mudança separada e maior do
> que o escopo desta issue; ela foi intencionalmente **não** implementada
> aqui e fica como trabalho futuro, caso a economia de CPU valha o risco da
> reordenação.

### Rede de Segurança de Ativação Automática de Rate-Limit e Proteção de Conexão (`rateLimitProtection`)

**Rede de segurança de ativação automática** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, padrão `true`):
Por padrão, o OmniRoute ativa automaticamente a proteção de fila de rate-limit para todas as conexões ativas de provedores de chave de API (`getProviderCategory(provider) === "apikey"`). Isso garante que as requisições recebidas destinadas a chaves de API upstream sensíveis a limite de taxa sejam enfileiradas e limitadas pelo Bottleneck, em vez de estourarem em erros 429 no upstream. A rede de segurança pode ser sobrescrita pela variável de ambiente `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` desativa, `true`/`1`/`on` força a ativação), que tem precedência sobre a configuração persistida do painel (**Configurações → Resiliência** / `PATCH /api/resilience`).

**Semântica do `rateLimitProtection` por conexão:**
A proteção de rate-limit por conexão é controlada pelo campo booleano `rateLimitProtection` nas conexões de provedor (persistido como `rate_limit_protection` no SQLite):

- **Ativado explicitamente (`rateLimitProtection === true`)**: a proteção de rate-limit está explicitamente ativada para esta conexão, independentemente da categoria do provedor ou de a rede de segurança de ativação automática estar ligada.
- **Desativado explicitamente (`rateLimitProtection === false`)**: desativa a proteção explícita, mas **não** exclui uma conexão ativa de chave de API da rede de segurança global de ativação automática. Em `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` e `undefined` são equivalentes: apenas `rateLimitProtection === true` é tratado como uma sobrescrita explícita. Se `rateLimitProtection` for `false` (ou não estiver definido), uma conexão ativa de chave de API ainda corresponde à condição de ativação automática e permanece protegida contra rate-limit.
- **Sem opt-out por conexão**: atualmente, um operador não pode expressar "esta única conexão ativa de chave de API deve rodar sem proteção de fila de rate-limit" mantendo a ativação automática ativa para as demais. Para rodar conexões de chave de API completamente sem filas de rate-limit, a rede de segurança deve ser desativada globalmente (`RATE_LIMIT_AUTO_ENABLE=false` ou `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Caminhos de escrita suportados:**

- **`POST /api/rate-limits`**: o caminho de escrita de gerenciamento suportado para alternar o `rateLimitProtection` de uma conexão (`{ connectionId: string, enabled: boolean }`). Chamá-lo com `enabled: true` ativa a proteção explícita; chamá-lo com `enabled: false` remove a proteção explícita (embora conexões ativas de chave de API permaneçam cobertas pela rede de segurança global, caso a ativação automática esteja ligada).
- **`PUT /api/providers/[id]`**: deliberadamente **não** aceita nem altera `rateLimitProtection` (#11278). Atualizar os metadados da conexão de provedor via `PUT /api/providers/[id]` nunca mudará o estado persistido da proteção de rate-limit.

---

## 6. Watchdog de taxa de transferência de fluxo lento (#9709)

O `resilienceSettings.streamRecovery.throughputWatchdog` guard opcional detecta um upstream que ainda está enviando pedaços, mas produzindo saída do assistente abaixo da taxa de saída útil configurada. É deliberadamente diferente do tempo limite de inatividade: pulsações e metadados não redefinem o cronômetro e não contam como progresso. Também é diferente do prazo de tentativa difícil (#9153), que permanece um limite de segurança absoluto, independentemente da qualidade da saída.

O watchdog requer um período de aquecimento seguido por uma janela contínua completa antes de poder abortar. Ele conta deltas de texto de eventos de saída API de conclusões e respostas de bate-papo (um proxy de byte UTF-8 conservador), ignora eventos somente de uso e vazios e suspende o julgamento enquanto eventos de chamada de ferramenta ou de raciocínio estão em andamento. Ele está desabilitado por padrão e pode ser habilitado com `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (esse valor env apenas propaga o — padrão e um booleano `resilienceSettings.streamRecovery.throughputWatchdog.enabled` salvo vence; consulte a nota de precedência env-vs-dashboard no início deste guia); a janela, o aquecimento, a taxa mínima e a saída mensurável mínima são limitados pela camada normal de normalização das configurações de resiliência.

Quando ativado, uma interrupção do watchdog é aplicada somente à tentativa upstream ativa. Antes de qualquer byte visível para o cliente, o caminho de recuperação antecipada da mesma conta existente pode reabrir a tentativa. Após a confirmação, o fluxo nunca é reproduzido cegamente; apenas o contrato de continuação seguro existente no meio do fluxo pode costurar um sufixo. A finalização permanece única, portanto, a contabilização do uso e a liberação do semáforo não são duplicadas.

---

## 7. Restabelecimento do status upstream (erros de cota informados incorretamente)

**Escopo:** um gateway upstream que informa esgotamento temporário de cota com o status HTTP incorreto.

**Objetivo:** corrigir um status enganoso ANTES da classificação, para que os consumidores downstream (mecanismo de fallback, agregação de combinações, resposta voltada ao cliente) vejam a verdadeira natureza passível de nova tentativa da falha.

Alguns gateways sinalizam esgotamento TEMPORÁRIO de cota com um status HTTP
que não permite nova tentativa. O `agentrouter.org` retorna `403` (às vezes `400`) com um corpo em chinês
(`用户额度不足` / `额度不足`) em vez do `429` padrão. Clientes como o Claude
Code tratam `403` como permanente e abortam a sessão e, sem a correção,
o mecanismo de fallback o classificaria como `AUTH_ERROR` em vez de um
evento de cota.

**Implementação:**

- Registro + correspondência: `open-sse/config/upstreamStatusRestatement.ts` — uma
  lista de regras por provedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), correspondidas por meio de `applyStatusRestatement()`.
- Ponto de chamada: o bloco `providerFailure:` em `open-sse/handlers/chatCore.ts`
  (próximo à linha 3654), imediatamente após `parseUpstreamError()` analisar
  uma resposta upstream com um status HTTP de erro (`!providerResponse.ok`) e antes de qualquer
  classificação ser executada, para que todos os consumidores downstream vejam o
  status corrigido. Erros incorporados em um fluxo SSE `200` seguem um caminho
  separado e posterior de análise do fluxo e **não** são cobertos por este hook atualmente —
  uma limitação conhecida, ainda não necessária para o misstatus do agentrouter
  (que aparece como um status HTTP de erro).
- Elegibilidade para nova tentativa: `429` está em
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`); portanto, um erro cujo status foi
  restabelecido carrega uma janela real para nova tentativa, em vez de aparecer como um
  `403` inativo.
- O `defaultRetryAfterMs` sintético de `60s` (`upstreamStatusRestatement.ts`)
  é apenas o que a resposta com status restabelecido informa ao **cliente**; ele não é, por si só,
  a duração do cooldown/bloqueio interno da conexão — isso é determinado separadamente pelo
  mecanismo que efetivamente trata o erro cujo status foi restabelecido
  (o backoff crescente do Cooldown de Conexão, §2, com base de `3s` para provedores
  de chave de API; ou o Bloqueio de Modelo, §3, para provedores com cota por modelo,
  como o agentrouter). O roteador pode se tornar elegível para tentar novamente
  internamente antes da janela de 60s que anuncia ao cliente — uma margem intencional,
  não um bug.

Erros permanentes (o `无权访问模型` do agentrouter — sem acesso a este modelo) **NUNCA** têm
o status restabelecido: `excludeMarkers` impede a regra mesmo quando `textMarkers` correspondem,
portanto o erro mantém seu status original e nada tenta novamente indefinidamente. A regra de
classificação do provedor correspondente
(`agentrouter-model-access-denied` em `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, um cooldown base declarado de `6h`) é consultada por
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
_antes_ do retorno antecipado genérico `FORBIDDEN` da categoria apikey, condicionada a
`honorsRuleLockScope(provider)` (#10334 — atualmente exclusiva do agentrouter por meio da
lista de permissões `HONORS_RULE_LOCK_SCOPE_PROVIDERS` em
`providerErrorRules.ts`). O cooldown declarado de 6h da regra é propagado como
`fallbackResult.baseCooldownMs`, mas ainda alimenta o caminho preexistente de bloqueio
por modelo e cota (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, inalterado por #10334, exceto pela origem do cooldown):
ele é reduzido ao valor máximo de `mlSettings.maxCooldownMs` do operador
(padrão `1_800_000ms` / 30min), como todo outro bloqueio de modelo, e o
_motivo do bloqueio persistido_ continua sendo o valor preexistente codificado
`"forbidden"`, não o `"auth_error"` da regra — somente a duração do cooldown é respeitada
de ponta a ponta, não a string do motivo. A própria conexão permanece ativa;
os modelos irmãos na mesma conexão não são afetados.

Erros de cota cujo status foi restabelecido (`额度不足`) chegam a uma regra de provedor em produção
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, sem cooldown declarado próprio — o backoff padrão escalonado da camada de
persistência é aplicado). Desde #10334, `scope` em
`ProviderErrorRuleMatch` É consumido de ponta a ponta, mas **somente** para provedores na
lista de permissões `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
atualmente apenas `"agentrouter"`, condicionado por `honorsRuleLockScope()`). Para todos os
outros provedores, `scope` continua sendo apenas informativo, exatamente como antes de #10334.
`checkFallbackError` expõe o escopo da regra correspondente como
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) é a proteção compartilhada que confirma que um
`ruleScope` é realmente seguro para ser respeitado como um sinal de abrangência de toda a conexão
e autorrecuperável (escopo `"connection"`, motivo `quota_exhausted`, nunca
`permanent`, nunca `creditsExhausted` — uma defesa contra um futuro pareamento de regra entre o
escopo `"connection"` e um estado de conta permanente). Dois consumidores a chamam:

- **Persistência** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  em vez de cair no branch de bloqueio **por modelo** do provedor passthrough (`agentrouter` é `passthroughModels: true` → `hasPerModelQuota()` retorna `true`), aplica um **cooldown temporário da conexão** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nunca um status terminal
  (`credits_exhausted`/`banned`/`expired`) — para que a conexão se recupere
  automaticamente quando o cooldown expirar, sem exigir uma redefinição manual das credenciais.
  Ignorado para conexões com `disableCooling: true` (#2997): essa opção
  faz com que o fluxo prossiga para o bloqueio por modelo (uma decisão de
  compromisso documentada — consulte o comentário no código acima do branch).
- **Roteamento de combinações na mesma requisição** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): a mesma proteção marca a
  conexão no conjunto em memória `exhaustedConnections`, identificado por
  `${provider}:${connectionId}`. Isso apenas ignora um destino restante da MESMA REQUISIÇÃO que _já carregue por si só esse `connectionId` exato_ em seu próprio objeto de destino (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes da consulta a `exhaustedConnections`) — uma combinação
  simples de lista de modelos, na qual os destinos irmãos não carregam seu
  próprio `connectionId` fixado e um deles só é resolvido por despacho a
  partir do cabeçalho `X-OmniRoute-Selected-Connection-Id` da resposta, nunca
  encontra essa correspondência de chave. Nesse caso comum, a proteção real
  contra uma etapa restante reutilizar a conta que acabou de ser esgotada NÃO
  é esse `Set` — é a camada de persistência acima (o `rateLimitedUntil` da
  conexão agora está no futuro), combinada com essa mesma proteção suprimindo
  `transientRateLimitedProviders` para a falha (consulte "Design em duas etapas"
  e o comentário no código sobre o branch
  `isAgentrouterConnectionQuotaScope` em `targetExhaustion.ts`): como esse
  `Set` permanece sem marcação, o `allowRateLimitedConnection` de permissão
  forçada de `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)
  NÃO é ativado para as etapas restantes do provedor; portanto, o filtro
  `rateLimitedUntil` da seleção de credenciais (`src/sse/services/auth.ts:1238`)
  é respeitado normalmente, e uma etapa restante escolhe outra conexão do
  agentrouter que ainda esteja elegível ou falha informando que não há
  credenciais disponíveis — ela não força seu caminho de volta para a conexão
  que esse branch acabou de colocar em cooldown.

### Design em duas etapas: reafirmação do status e, depois, classificação

A reafirmação do status (`upstreamStatusRestatement.ts`) e as regras de
classificação do provedor (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) são registros separados que usam o ID do provedor e
marcadores de texto como chaves, mas são executados em locais diferentes e
servem a propósitos distintos: a reafirmação reescreve o status HTTP
antecipadamente em `chatCore.ts`; as regras de classificação escolhem o
`reason` de fallback e bloqueiam o `scope`
(`model` / `provider` / `connection`) dentro de `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

As regras de classificação só veem o **texto** completo do erro (necessário
para corresponder a marcadores no corpo, como `额度不足`) para os provedores
listados na lista de permissões `FULL_TEXT_RULE_PROVIDERS` em
`providerErrorRules.ts` — atualmente, apenas `"agentrouter"`. Para todos os
outros provedores do **catálogo integrado**, `checkFallbackError` fornece a
`getProviderErrorRuleMatch` somente o erro estruturado (`{code, type}`), o que
é suficiente para regras baseadas em cabeçalho/status/código, mas não permite
ver marcadores de texto no corpo. O auxiliar `resolveRuleMatchBody()` faz
essa seleção: o texto completo do erro para provedores na lista de permissões,
e o erro estruturado nos demais casos. Adicionar um provedor **integrado** a
`FULL_TEXT_RULE_PROVIDERS` é uma habilitação explícita por provedor — ela
existe para que o caminho padrão de todos os provedores que não estão na
lista permaneça inalterado byte a byte.

O `scope` de uma regra (`model` / `provider` / `connection`) é uma habilitação
separada de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` só o expõe como
`fallbackResult.ruleScope`, e os consumidores posteriores só o tratam como
algo diferente de um rótulo informativo para provedores na lista de permissões
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo arquivo (controlado por
`honorsRuleLockScope()` — atualmente, apenas `"agentrouter"`). Consulte
"Erros de cota reafirmados" acima para saber o que uma correspondência
`scope: "connection"` realmente faz quando um provedor está nessa lista de
permissões.

**#11104 — as regras declaradas pelo operador ignoram ambas as listas de permissões.** Um operador pode declarar uma regra por provedor em tempo de
execução por meio de `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
sem editar este arquivo. Submeter uma regra do operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listas de
permissões destinadas a proteger o comportamento **padrão** das regras do
catálogo integrado — tornaria o mecanismo de configurações inerte para todos
os provedores, exceto os já listados, pois declarar a regra já é a habilitação
explícita do operador. `resolveRuleMatchBody()` e `honorsRuleLockScope()` verificam
`hasOperatorRuleForProvider()` primeiro: um provedor com uma regra do operador
recebe o texto bruto do erro e tem seu `scope` declarado respeitado,
independentemente de também aparecer em uma das listas de permissões.

**Regras declaradas pelo operador** (`OperatorProviderErrorRule`): cada regra
tem um `status` opcional e um `match` opcional (uma substring simples, sem
diferenciação entre maiúsculas e minúsculas, do texto do erro, nunca uma
RegExp, portanto não pode causar ReDoS), e deve definir pelo menos um dos
dois. Quando ambos são definidos, eles são combinados com AND; um campo
omitido corresponde a qualquer valor, portanto `{match: "insufficient_quota"}`
corresponde a qualquer status que contenha esse código. A primeira regra
correspondente vence. `cooldownMs` aceita até 30 dias; no máximo 50 regras
no total.

**Padrões gerais padrão** (`settings.providerErrorDefaults`, opt-in, definido por
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
com `cooldownMs` de 1 minuto a 30 dias. Um padrão se aplica somente quando
nenhuma regra do operador e nenhuma regra do catálogo integrado corresponderem,
e somente a erros 402, 403, 408, 429 e 5xx. Erros de formato da solicitação
(400, 404, 409, 413, 422) e erros 401 sem informações adicionais mantêm seu
próprio tratamento. Sem um `reason` explícito, o motivo vem do status, da mesma
forma que `classifyError` faz. Declarar um padrão conta como uma regra do
operador para `hasOperatorRuleForProvider()`, portanto seu `scope` (padrão
`"connection"`) é respeitado. O cooldown efetivo de um padrão é o maior valor
entre seu `cooldownMs` e a indicação de nova tentativa do próprio provedor
(`Retry-After`, `x-ratelimit-reset` ou uma indicação de redefinição no corpo, a
mesma indicação que o mecanismo respeita quando a configuração de cooldown da
conexão "usar indicações de nova tentativa upstream" está ativada), portanto um
padrão pode prolongar uma indicação upstream curta, mas nunca encurtar uma
redefinição real. Uma regra explícita do operador mantém seu `cooldownMs` exato.
Nem uma regra nem um padrão ignoram as proteções de cooldown da conexão em
`markAccountUnavailable`: um cooldown ativo e mais longo nunca é encurtado e
um status terminal nunca é sobrescrito. Os detectores de texto integrados que
são executados anteriormente em `checkFallbackError` (créditos esgotados,
cota diária, conta desativada) ainda têm precedência para suas próprias frases.

**Lacuna conhecida — `providerRuleRegistry` nunca é consultado para HTTP 400.**
A ramificação `BAD_REQUEST` de `checkFallbackError` classifica o status 400
inteiramente por meio de seus próprios arrays de padrões
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`, etc. em
`accountFallback.ts`) e retorna antes que a ramificação
`configuredRule`/`getProviderErrorRuleMatch` acima dela seja alcançada.
Uma regra do catálogo integrado (ou uma regra do operador) com `status: 400` é
sintaticamente válida, mas nunca será acionada. Nenhuma regra existente tem como
alvo 400 atualmente, portanto nada em produção é afetado — mas uma regra 400
futura precisará modificar essa ramificação primeiro, o que é uma mudança maior
do que adicionar uma regra (ela reclassifica 400 para todos os provedores que já
dependem do comportamento baseado em arrays de padrões) e está fora do escopo
da adição de uma regra para um único provedor.

### Adicionando um novo gateway que informa incorretamente a cota

1. Registre um array de regras em `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenha `textMarkers`
   específicos do provedor; nunca reutilize frases genéricas em inglês que
   colidam com `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registre regras de classificação em
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para
   escolher o escopo de bloqueio correto (`connection` para cota em toda a
   conta, `model` para erros específicos de um modelo). Esta etapa só tem efeito
   em produção para provedores cujas regras precisam do texto completo do erro
   (marcadores no corpo): adicione o id do provedor a
   `FULL_TEXT_RULE_PROVIDERS` no mesmo arquivo — caso contrário,
   `checkFallbackError` só entrega à regra o erro estruturado
   `{code, type}`, e uma regra baseada no texto do corpo nunca corresponderá ao
   tráfego real.
   Regras que correspondem puramente a `status`/`headers` (como as do Opencode
   ou do Minimax) não precisam desse opt-in. Separadamente, se a regra declarar
   `scope: "connection"` e a intenção for um cooldown real em toda a conexão,
   além de ignorar a combinação na mesma solicitação (não apenas um rótulo
   informativo), adicione o id do provedor a
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo arquivo — isso controla o uso no
   estilo de `isAgentrouterConnectionQuotaScope()` em
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sem isso, `scope` ainda
   percorre `fallbackResult.ruleScope`, mas nada age sobre ele.
3. Adicione testes unitários correspondentes a
   `tests/unit/upstream-status-restatement.test.ts` e
   `tests/unit/agentrouter-error-rules.test.ts` (incluindo as proteções
   not-permanent / not-creditsExhausted e — se o provedor precisar da lista de
   permissões — um teste que confirme que `resolveRuleMatchBody()` retorna o
   texto completo somente para esse provedor).

Nenhuma alteração em `chatCore.ts`, `classifyError` ou combo é necessária.

#### Bloqueio agrupado por bucket de saída (#10880)

Os provedores em `EGRESS_BUCKETED_LOCK_PROVIDERS` (família opencode) são
tratados como upstream agrupado por IP (o nível gratuito do opencode é
agrupado por IP, não por conta — consulte #9611): um status-429 classificado
como `quota_exhausted` **ou** `rate_limit_exceeded` aplica cooldown a todas as
conexões da família permitida cujo último IP de saída conhecido corresponda ao
da conexão que falhou, antes que a rotação possa tentar essas conexões
— evitando N-1 chamadas upstream que certamente falhariam (mesmo formato de
#10460/#10525).
`rate_limit_exceeded` é incluído deliberadamente: no caminho de
`markAccountUnavailable`, as regras específicas do opencode nunca correspondem
(nenhum cabeçalho/corpo é entregue a `checkFallbackError`, e o opencode não
está em `FULL_TEXT_RULE_PROVIDERS`), portanto um 429 cujo corpo contenha o texto
de cota da assinatura ("limite de uso mensal atingido") é classificado como
`quota_exhausted` pelo fallback de texto de cota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown de 1h) antes
que a regra `status_429` seja alcançada — enquanto um 429 sem texto de cota
(classificação simples de limitação de taxa) é classificado pela regra
`status_429` como `rate_limit_exceeded` e ainda aplica cooldown à família de IP.
Para um provedor permitido, uma limitação de taxa agrupada por IP é o mesmo
sinal que uma cota esgotada. Limites honestos:

- **Melhor esforço**: o bloqueio resolve o último `egress_ip` conhecido da conexão
  a partir de `proxy_logs` (janela de 24h, síncrono, sem cache). Cache frio (o
  IP de saída nunca foi sondado) ou nenhuma linha → a conexão com falha ainda é
  resfriada pelo ramo (registrada como hoje), apenas nenhum irmão é bloqueado.
- **Nunca terminal**: o resfriamento é uma janela de cota renovável
  (`testStatus: "unavailable"`); um estado permanente nunca é derivado de um
  sinal no nível do IP. Conexões `disableCooling` ignoram o ramo inteiramente.
- **A granularidade do bloqueio muda para a família permitida**: esta é uma
  mudança de escopo, não apenas uma otimização de irmãos. opencode é um
  provedor `passthroughModels`, portanto, antes deste ramo, um 429 produzia um
  bloqueio por MODELO; agora ele produz um resfriamento da conexão — inclusive
  para um operador executando uma única conexão, sem nenhum irmão. Essa é a
  granularidade que a tabela de regras do opencode já declara como correta
  (`scope: "connection"`, `providerErrorRules.ts`), mas que nunca foi respeitada
  até agora porque opencode não está em
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. O ramo grava por conta própria o
  resfriamento da conexão com falha + `backoffLevel`, seguindo o padrão do ramo
  agentrouter com escopo de conexão, e retorna — o bloqueio por modelo e o
  caminho genérico abaixo nunca são alcançados.
- **Combo incluído**: assim como no ramo agentrouter, o escopo ignora
  deliberadamente o downgrade `persistUnavailableState`/`isCombo` aplicado por
  um chamador combo a um 429. Um bloqueio por modelo não é uma forma mais fraca
  deste escopo; é a unidade errada: ele não diz nada sobre o IP esgotado, então
  a rotação do combo continuaria consumindo uma chamada garantidamente
  malsucedida por irmão.
- **Segurança dos irmãos**: um irmão já terminal (banned/credits_exhausted) ou
  que já esteja em um resfriamento mais longo nunca é sobrescrito.
- **Allowlist exclusiva**: ampliar `EGRESS_BUCKETED_LOCK_PROVIDERS` é uma
  decisão explícita do responsável; não há integração genérica (padrão
  #10334/#10419). A consulta de irmãos usa essa mesma allowlist, em vez de
  repeti-la como um literal SQL, portanto ampliá-la continua sendo uma mudança
  de uma linha.
- **Rotação do IP de saída, nas duas direções**: a janela de consulta (24h) é
  muito mais ampla que o TTL do cache de IP de saída (5 min), então o “último IP
  conhecido” é histórico, não o estado atual. Se o proxy de uma conexão rotacionou
  dentro da janela, o bloqueio pode **não detectar** um IP realmente
  compartilhado (o IP registrado é o novo, ainda não esgotado) — e,
  simetricamente, pode **resfriar um irmão que desde então rotacionou para
  longe** do IP esgotado. O segundo caso custa a esse irmão uma janela de
  resfriamento; ambos são limites aceitos de melhor esforço de uma consulta
  baseada em histórico.
- **Custo**: duas varreduras limitadas de `proxy_logs` (filtradas pela janela
  via `idx_pl_timestamp`), somente na frequência de 429. Nenhum índice novo
  (migração 134 YAGNI). Medido em uma cópia de banco de dados com tráfego real e
  tamanho moderado; uma instância de alto throughput mantém proporcionalmente
  mais linhas na mesma janela.

## Outros Recursos de Resiliência

- **20 estratégias de roteamento** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — veja [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Roteamento sensível a reset** (v3.8.0) — prioriza conexões pelo horário de reset da cota.
- **Degradação do modo background** — o `background: true` da Responses API é degradado para síncrono com aviso.
- **Detecção dinâmica de limite de ferramentas** — aplica backoff aos provedores quando os limites de contagem de ferramentas são atingidos.
- **Fallback de emergência** — controlado por `OMNIROUTE_EMERGENCY_FALLBACK`; operadores podem sobrescrevê-lo na página Feature Flags sem reinicialização.

---

## Depuração

- O combo weighted responde `503 all_targets_cooling_down` (`Retry-After` definido, `diagnostics.excluded` lista todos os alvos com `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → o pool está configurado e conectado, todos os alvos estão apenas excluídos por um timer de resiliência; o aviso `[COMBO] Weighted selection: every target excluded before dispatch — …` indica os motivos e os segundos restantes. Um `404 no_executable_targets` do mesmo combo significa que nenhum timer de resiliência esteve envolvido (nada para executar, ou todas as contas falharam na sonda de disponibilidade). Construído em `open-sse/services/combo/pinRecovery.ts` a partir das exclusões coletadas em `targetResolution.ts`.
- Todas as chaves de um provedor ignoradas → verifique tanto o estado do circuit breaker QUANTO o `rateLimitedUntil`/`testStatus` de cada conexão.
- Provedor excluído permanentemente após a janela de reset → código lendo `state` bruto em vez de `getStatus()`/`canExecute()`.
- Uma chave falha, as outras deveriam funcionar → prefira o cooldown de conexão em vez do circuit breaker.
- Apenas um modelo falha → prefira o lockout de modelo em vez do cooldown de conexão.
- O estado deveria se autorrecuperar, mas não o faz → verifique se há timestamp no futuro + caminho de leitura que atualiza o estado expirado. Status permanentes exigem alterações manuais.

---

## Estado de runtime — referência rápida para o agente

> Movido verbatim de `AGENTS.md` → "Resilience Runtime State" (PR #12743) para que o guia
> do agente permaneça dentro do orçamento de contexto de 40k. É a visão condensada, voltada
> ao agente, das seções acima; as seções numeradas permanecem como a referência completa.

A OmniRoute tem três mecanismos de falha temporária relacionados, porém distintos. Mantenha
seus escopos separados ao depurar o comportamento de roteamento. Consulte o
[diagrama de resiliência de 3 camadas](../diagrams/exported/resilience-3layers.svg)
(fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
para um mapa de visão rápida.

### Circuit breaker de provedor

**Escopo**: provedor inteiro, ex. `glm`, `openai`, `anthropic`.

**Propósito**: parar de enviar tráfego para um provedor que está falhando repetidamente no
nível upstream/serviço, para que um provedor não saudável não desacelere todas as requisições.

**Implementação**:

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Integração do gate/execução do chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de status de runtime: `src/app/api/monitoring/health/route.ts`
- Wrappers compartilhados: `open-sse/services/accountFallback.ts`
- Tabela de estado persistido: `domain_circuit_breakers`

**Estados** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: tráfego normal é permitido.
- `DEGRADED`: faixa de alerta antecipado — as falhas ultrapassaram o limiar de degradação,
  mas ainda não o limiar do breaker; o tráfego ainda flui, os dashboards exibem o aviso. Um
  teste de conexão válido ou uma janela tranquila sem novas falhas o retorna a `CLOSED`
  (o `docs/architecture/RESILIENCE_GUIDE.md` tem a janela).
- `OPEN`: o provedor está temporariamente bloqueado; os chamadores recebem uma resposta
  provider-circuit-open ou o roteamento de combo pula para outro alvo.
- `HALF_OPEN`: o timeout de reset decorreu; permite uma requisição de sonda. O sucesso fecha
  o breaker, a falha o abre novamente.

**Padrões** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consumidos via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` em `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` em `src/sse/handlers/chatHelpers.ts`). O breaker de
provedor inteiro opera com `circuitBreakerThreshold` / `circuitBreakerReset`:

| Perfil  | degrada em | abre em (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | ---------: | ----------------------------------: | ----------------------------: |
| OAuth   |        `5` |                                 `8` |                         `60s` |
| API key |        `7` |                                `12` |                         `30s` |
| Local   | (derivado) |                                 `2` |                         `15s` |

`PROVIDER_PROFILES` também define `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) e `providerCooldownMs` (5/10/1 min): eles alimentam o
**gate de janela do Provider Cooldown global opcional (opt-in)** (`PROVIDER_COOLDOWN_ENABLED`,
desativado por padrão) — uma entrada em nível de provedor em
`open-sse/services/providerCooldownTracker.ts` só conta como em cooldown após
`providerFailureThreshold` falhas dentro de `providerFailureWindowMs`, e então permanece em
cooldown por `providerCooldownMs`. Eles NÃO são os limiares do breaker ativo — não os ajuste
esperando comportamento do breaker. Cada padrão pode ser sobrescrito pelas variáveis de
ambiente `OMNIROUTE_PROVIDER_BREAKER_*` e `OMNIROUTE_CIRCUIT_BREAKER_*`; a tabela de
referência precisa do runtime está em `docs/architecture/RESILIENCE_GUIDE.md`.

Apenas status de falha em nível de provedor devem disparar o breaker de provedor:

```ts
(408, 500, 502, 503, 504);
```

Não dispare o breaker de provedor inteiro para erros normais de conta/chave/modelo, como a
maioria dos casos `401`, `403` ou `429`. Esses geralmente pertencem ao cooldown de conexão
ou ao lockout de modelo. Um `403` de um provedor genérico de chave de API deve ser
recuperável, a menos que seja classificado como um erro terminal de provedor/conta.

O breaker usa recuperação lazy, não um timer em segundo plano. Quando `OPEN` expira, leituras como `getStatus()`, `canExecute()` e `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`, para que dashboards e construtores de candidatos de combo não continuem excluindo indefinidamente um provedor expirado.

### Cooldown de Conexão

**Escopo**: uma conexão/conta/chave de provedor.

**Finalidade**: ignorar temporariamente uma chave/conta problemática enquanto permite que outras conexões do mesmo provedor continuem atendendo requisições.

**Implementação**:

- Caminho de escrita/atualização: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção/filtragem de contas: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo de cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configurações: `src/lib/resilience/settings.ts`

Campos importantes nas conexões de provedor:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante a seleção de conta, uma conexão é ignorada enquanto:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Os cooldowns também são lazy: quando `rateLimitedUntil` está no passado, a conexão volta a ser elegível. Em uso bem-sucedido, `clearAccountError()` limpa `testStatus`, `rateLimitedUntil`, campos de erro e `backoffLevel`.

Comportamento padrão do cooldown de conexão:

- Cooldown base para OAuth: `5s`.
- Cooldown base para chave de API: `3s`.
- Para chave de API, `429` deve priorizar dicas de retry do upstream (`Retry-After`, cabeçalhos de reset ou texto de reset interpretável) quando disponíveis.
- Falhas recuperáveis repetidas usam backoff exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

A proteção anti-thundering-herd impede que falhas concorrentes na mesma conexão estendam repetidamente o cooldown ou incrementem `backoffLevel` em dobro.

Estados terminais não são cooldowns. `banned`, `expired` (que se torna terminal somente após N tentativas limitadas via `EXPIRED_RETRY_MAX`) e `credits_exhausted` devem permanecer indisponíveis até que credenciais/configurações mudem ou um operador os redefina. Não sobrescreva estados terminais com estado de cooldown transitório.

### Bloqueio de Modelo

**Escopo**: provedor + conexão + modelo.

**Finalidade**: evitar desabilitar uma conexão inteira quando apenas um modelo está indisponível ou limitado por cota para aquela conexão.

Exemplos:

- Provedores com cota por modelo retornando `429`.
- Provedores locais retornando `404` para um modelo ausente.
- Falhas de permissão de modo/modelo específicas do provedor, como modos Grok selecionados.

O bloqueio de modelo fica em `open-sse/services/accountFallback.ts` e permite que a mesma conexão continue atendendo outros modelos.

### Orientações de Depuração

- Se todas as chaves de um provedor forem ignoradas, inspecione tanto o estado do breaker do provedor quanto o `rateLimitedUntil`/`testStatus` de cada conexão.
- Se um provedor parecer permanentemente excluído após a janela de reset, verifique se o código está lendo `state` bruto em vez de usar `getStatus()`/`canExecute()`.
- Se uma chave de provedor falhar, mas outras deveriam funcionar, prefira cooldown de conexão em vez de breaker de provedor.
- Se apenas um modelo falhar, prefira bloqueio de modelo em vez de cooldown de conexão.
- Se um estado deve se recuperar sozinho, ele deve ter um timestamp futuro/timeout de reset e um caminho de leitura que atualize estados expirados. Status permanentes exigem alterações manuais de credenciais ou configuração.

---

## TLS Fingerprinting e Stealth

O stealth específico de cada provider (JA3/JA4, CCH, ofuscação) está documentado separadamente — consulte `docs/security/STEALTH_GUIDE.md` (git; não compilado em `/docs`).

---

## Testes de resiliência (Fase 8 · Bloco C)

Além dos testes unitários para a lógica de resiliência, três testes exercitam o runtime sob
condições reais de estresse/falha (todos de integração/nightly — nenhum bloqueia PRs):

| Teste       | O que faz                                                                                                                                                                      | Execução                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Chaos       | O nó de fake-upstream injeta latência/reset/timeout/503 reais; valida que o circuit breaker abre/recupera e que `checkFallbackError` classifica 503 como fallback recuperável. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams por `createSSEStream` sob `--expose-gc`; falha se o heap crescer além do teto (proteção contra OOM #3069).                                                        | `npm run test:heap`                      |
| k6 soak     | Carga sustentada contra `/api/monitoring/health`; limites de p95/erro.                                                                                                         | `k6 run tests/load/k6-soak.js` (nightly) |

Orquestrado por `.github/workflows/nightly-resilience.yml` (cron + dispatch). No
`test:integration` padrão, chaos e heap se auto-ignoram (sem `RUN_CHAOS_INT`/`--expose-gc`).

---

## Veja também

- [Architecture Guide](./ARCHITECTURE.md) — Arquitetura do sistema e internos
- [User Guide](../guides/USER_GUIDE.md) — Providers, combos, integração com CLI
- [Auto-Combo Engine](../routing/AUTO-COMBO.md) — Pontuação de 16 fatores, mode packs
