# Resilience Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

O OmniRoute tem três mecanismos de resiliência distintos, mas relacionados. Cada um tem um âmbito e uma finalidade diferentes. Mantenha-os separados ao depurar o comportamento do encaminhamento.

![Modelo de resiliência em 3 camadas](../diagrams/exported/resilience-3layers.svg)

> Fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Precedência entre ambiente e painel para os comutadores de resiliência.** Os comutadores de resiliência opcionais inicializados a partir do ambiente — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`,
> `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`,
> `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` —
> apenas fornecem a _predefinição_ (`DEFAULT_RESILIENCE_SETTINGS`,
> `src/lib/resilience/settings.ts`). Um booleano persistido em
> `resilienceSettings` (Painel → **Definições → Resiliência** / `PATCH /api/resilience`, armazenado em
> `key_value`) prevalece sobre o valor do ambiente: a normalização (`toBoolean`,
> `src/lib/resilience/settings/normalize.ts`) mantém o booleano armazenado sempre que
> este existe. Definir uma destas variáveis de ambiente como `true` numa implementação em que o
> painel já tenha guardado `false` não altera nada — alterne a opção em
> **Definições → Resiliência** (ou limpe o campo armazenado).

## 1. Circuit Breaker de Fornecedor

**Âmbito:** fornecedor inteiro (p. ex., `glm`, `openai`, `anthropic`).

**Objetivo:** parar de enviar tráfego para um fornecedor que está a falhar repetidamente ao nível do serviço upstream.

**Implementação:**

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Ligações: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado: `GET /api/monitoring/health`
- API de reposição: `POST /api/resilience/reset`
- Wrappers: `open-sse/services/accountFallback.ts`
- Tabela da BD: `domain_circuit_breakers`

**Estados:**

- `CLOSED` — tráfego normal permitido
- `DEGRADED` — o tráfego continua a ser permitido, mas as falhas elevadas do fornecedor estão a ser monitorizadas; regressa a `CLOSED` após sucessos suficientes, após um teste de ligação válido, ou após a retenção em `OPEN` mais longa para o último tipo de falha (o seu valor `cooldownByKind`, caso contrário `resetTimeout`, × `maxBackoffMultiplier`, no mínimo um cooldown) sem uma nova falha
- `OPEN` — fornecedor temporariamente bloqueado; o encaminhamento combo ignora-o
- `HALF_OPEN` — o tempo limite de reposição decorreu; pedido de sonda permitido

**Predefinições configuráveis (`open-sse/config/constants.ts`, expostas em Dashboard → Settings → Resilience):**

| Classe  | Degrada em | Abre em   | Tempo limite de reposição |
| ------- | ---------- | --------- | ------------------------- |
| OAuth   | 5 falhas   | 8 falhas  | 60s                       |
| API-key | 7 falhas   | 12 falhas | 30s                       |
| Local   | derivado   | 2 falhas  | 15s                       |

O `degradationThreshold` controla quando um fornecedor entra em `DEGRADED`; o `failureThreshold` controla quando abre e é ignorado. Os perfis de fornecedores locais ainda não estão expostos na página de definições de Resilience.

**Códigos de disparo:** apenas códigos de estado ao nível do fornecedor `[408, 500, 502, 503, 504]`. NÃO dispare para erros ao nível da conta (a maioria dos 401/403/429 — esses pertencem ao cooldown ou ao lockout).

**Recuperação diferida (lazy):** quando o `OPEN` expira, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`. As mesmas leituras (e a falha seguinte) fazem decair um `DEGRADED` obsoleto de volta para `CLOSED`. Não é necessário nenhum temporizador em segundo plano.

---

### Cooldown global de fornecedor opcional (window gate)

Uma quarta camada, **opcional** (`PROVIDER_COOLDOWN_ENABLED`, predefinição **desativada**), mantém uma memória entre pedidos dos fornecedores em falha em
`open-sse/services/providerCooldownTracker.ts`, consultada pela resolução de destinos do combo para que pedidos combo consecutivos deixem de revisitar um fornecedor que acabou de falhar. As entradas ao nível do fornecedor respeitam o window gate de `PROVIDER_PROFILES`:

| Perfil  | dispara após (`providerFailureThreshold`) | dentro de (`providerFailureWindowMs`) | arrefece durante (`providerCooldownMs`) |
| ------- | ----------------------------------------: | ------------------------------------: | --------------------------------------: |
| OAuth   |                                      `10` |                               `15min` |                                  `5min` |
| API key |                                      `15` |                               `30min` |                                 `10min` |

Abaixo do limiar, o fornecedor **não** é considerado em arrefecimento; um sucesso limpa
a janela. As entradas ao nível da ligação (`provider:connectionId`) mantêm, em alternativa, o
backoff exponencial `minRetryCooldownMs → maxRetryCooldownMs`. Substituições:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Proteção de regressão: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Período de arrefecimento da ligação

**Âmbito:** ligação/conta/chave de um único fornecedor.

**Objetivo:** ignorar uma chave com problemas enquanto as outras ligações do mesmo fornecedor continuam a servir pedidos.

**Implementação:**

- Marcar como indisponível: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção: `getProviderCredentials*` no mesmo ficheiro
- Cálculo do período de arrefecimento: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Definições: `src/lib/resilience/settings.ts`

**Campos por ligação:**

- `rateLimitedUntil` — carimbo de data/hora até ao fim do período de arrefecimento
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — contador de recuo exponencial

**Períodos de arrefecimento predefinidos:**

- Base OAuth: 5s
- Base de chave API: 3s
- API-key 429: dá preferência aos cabeçalhos upstream `Retry-After`/reset ou a texto de reset analisável
- Recuo: `baseCooldownMs * 2 ** failureIndex`

**Atraso de repetição por fornecedor.** A página de detalhes do fornecedor inclui uma seleção **Atraso de repetição** (Automático, de 15s até 1h). Esta guarda `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, através de `PATCH /api/resilience`). Quando um erro de limitação de taxa não inclui uma indicação upstream de repetição, esse valor substitui o recuo escalado para o fornecedor e repõe `backoffLevel` a 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Precedência para um erro de limitação de taxa, da mais elevada para a mais baixa: indicação upstream de repetição, depois `providerSpecificData.rotationOverrides.rateLimitResetSeconds` por ligação, depois o atraso de repetição por fornecedor, depois `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` do ambiente e, por fim, o recuo escalado. O modo Automático remove o campo. Isto só afeta o motivo de limitação de taxa, nunca estados terminais.

**Proteção contra o efeito manada:** impede que falhas simultâneas prolonguem excessivamente o período de arrefecimento ou incrementem `backoffLevel` duas vezes.

**Os 429 de limite de concorrência não sobem na escala de recuo.** Um `429` cujo corpo indica um limite de concorrência ("too many concurrent requests", "concurrency limit", "parallel request limit", `并发数过高` do GLM) significa que a conta está saudável, mas ocupada. `checkFallbackError()` devolve o motivo `concurrency_limited`: muda imediatamente para a ligação seguinte, aplica a esta um período de arrefecimento fixo de `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ou a indicação upstream de repetição, mantém `backoffLevel` inalterado e define `skipProviderBreaker`. Um corpo de quota explícito prevalece, pelo que um corpo que também corresponda a um padrão de quota mantém a decisão de quota. Deteção: `looksLikeConcurrencyLimit()` em `src/shared/utils/classify429.ts`; decisão: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` do disjuntor) permanece inalterado e continua a ler `rate_limit` nestes corpos.

**As interrupções do conteúdo do fluxo não arrefecem a conta.** Quando o watchdog de interrupção do conteúdo (`open-sse/utils/streamHandler.ts`) desiste de um fluxo que não enviou saída do modelo atempadamente, `markAccountUnavailable()` regista o erro na ligação, mas não define qualquer período de arrefecimento: a interrupção pertence a esse pedido, na maioria das vezes devido a um turno de raciocínio longo sem saída ainda. Os operadores podem ativar esta opção através de `resilienceSettings.streamStallCooldown.enabled` (predefinição `false`).

**Sinal de latência opcional para a seleção de contas `p2c`.** Cada tentativa distribuída regista o respetivo tempo até ao primeiro byte e resultado por ligação (e por ligação + modelo) numa janela contínua em memória: as últimas 20 amostras nos últimos 15 minutos (`open-sse/services/connectionLatencyTracker.ts`, registadas a partir de `safeLogEvents()` em `src/sse/handlers/chatHelpers.ts`). Quando `resilienceSettings.p2cLatency.weight` é superior a `0` (intervalo 0–20, predefinição `0` = desativado), `compareP2CConnections()` em `src/sse/services/auth.ts` adiciona até `weight` pontos a cada candidato do par. Metade desse valor provém da latência, como proporção em relação ao candidato mais rápido (o dobro da lentidão obtém a metade completa), e a outra metade provém da taxa de erros contínua. O termo só se aplica quando ambos os candidatos têm pelo menos 3 amostras, para que as contas novas não sejam penalizadas, e o seu limite máximo permanece abaixo das penalizações de quota bloqueada e quota esgotada. Não adiciona nenhum circuito próprio: as contas com falhas continuam a ser tratadas pelas camadas de período de arrefecimento, bloqueio e disjuntor. Defina-o com `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Os frames de raciocínio reiniciam o orçamento de interrupção do conteúdo.** Um modelo de raciocínio pode pensar durante minutos antes do primeiro token visível: o Claude transmite frames `thinking_delta` cujo texto de raciocínio pode estar vazio, e a Responses API transmite um item de raciocínio após outro. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) reconhece estes frames, e o watchdog reinicia o respetivo orçamento a cada um, em vez de cancelar o turno. Continuam a não ser saída do modelo, pelo que um turno que termine apenas com raciocínio continua a ser comunicado como vazio, e um turno que pare de raciocinar e envie apenas heartbeats continua a ativar o watchdog.

Os frames binários `reasoningContentEvent` do Kiro com uma assinatura não vazia preservam esta atividade de raciocínio através do executor como um delta `reasoning_content` vazio. A assinatura não é encaminhada. Os metadados, frames incompletos e assinaturas vazias não reiniciam o orçamento de conteúdo; o tempo limite independente do fluxo ativo e o cancelamento pelo cliente continuam a aplicar-se (`open-sse/executors/kiro/reasoning.ts`).

**Estados terminais (NÃO são períodos de arrefecimento):**

- `banned` — definido pela deteção de palavras-chave banidas / banimento da conta (consulte [BAN_DETECTION](../security/BAN_DETECTION.md)). As recusas upstream por pedido (`request_rejected`, por exemplo, "Request not allowed" do OAuth do Anthropic com 403) nunca o definem: são contabilizadas por ligação e modelo e retiram esse modelo da rotação com um período de arrefecimento crescente limitado por `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ou arrefecem a ligação quando não é conhecido nenhum modelo — `open-sse/services/requestRejectedStreak.ts`
- `expired` (passa a terminal após novas tentativas limitadas — `EXPIRED_RETRY_MAX = 3` com recuo exponencial — para que os erros OAuth transitórios possam ser recuperados automaticamente antes de a conta ser permanentemente desativada)
- `credits_exhausted`

Estes persistem até as credenciais serem alteradas ou um operador os repor. Não substitua estados terminais por um estado transitório de período de espera.

**Recuperação preguiçosa:** quando `rateLimitedUntil` já passou, a ligação volta a estar elegível. Após uma utilização bem-sucedida, `clearAccountError()` limpa todos os campos de erro.

### Limite de utilização do Claude OAuth: faixa de prioridade inferior + reposição do limite da sessão

**Âmbito:** uma ligação de subscrição Claude (OAuth). Ambas as funcionalidades são **opcionais por ligação** (Editar ligação → secção Claude → `lowPriorityMode` / `autoLimitReset` em `providerSpecificData`, ambas desativadas por predefinição) e replicam os comandos `/low-priority` e `/limit-reset` do Claude Code (contrato de comunicação capturado a partir do Claude Code 2.1.263).

**Implementação:**

- Máquina de estados + classificação de respostas: `open-sse/services/claudeLowPriority.ts`
- Cliente de estado/claim da reposição: `open-sse/services/claudeLimitReset.ts`
- Hook do executor (injeção de cabeçalho + nova tentativa na mesma conta): `open-sse/executors/base.ts::execute()`
- Persistência da ativação opcional: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Gatilho:** o limite de utilização de 5 horas — um `429` cujos cabeçalhos contêm
`anthropic-ratelimit-unified-status: rejected` e, quando a conta é elegível,
`anthropic-ratelimit-unified-slow-offer: treatment`. Nada é enviado antes desse primeiro `429` do limite; um `429` em rajada sem cabeçalhos unificados segue o percurso normal de período de espera.

**Faixa de prioridade inferior** (`lowPriorityMode`):

- No `429` do limite, o executor aceita a oferta e tenta imediatamente de novo na **mesma**
  conta com `anthropic-usage-limit: slow`; a faixa permanece ativa até ao
  `anthropic-ratelimit-unified-reset` anunciado (+60 s de tolerância) e todos os pedidos
  nessa janela incluem o cabeçalho. O `429` intercetado nunca chega a `handleChatCore`, pelo que a ligação **não** entra em período de espera nem é substituída.
- `anthropic-ratelimit-unified-slow-status` nas respostas seguintes: `active` / `not_needed`
  mantêm a faixa; `slot_busy` (`429`) ou um `529` aguardam o valor
  `anthropic-ratelimit-unified-slow-retry-after` indicado pelo servidor (20 s por predefinição,
  limite entre 5 e 600 s, jitter de ±30%) e tentam novamente, limitados por
  `anthropic-ratelimit-unified-slow-max-wait` (20 min por predefinição, limite entre
  1 min e 6 h) — após esse período, a faixa termina e um período de arrefecimento de
  10 minutos impede uma nova aceitação. A espera também é limitada pelo tempo restante do
  próprio tempo-limite de início a montante do pedido
  (`resolveFetchStartTimeout`, 10 min por predefinição), menos uma margem de 5 s: sem esse
  limite, o `max-wait` predefinido de 20 minutos ultrapassaria a duração do pedido e o
  repouso seria abortado a meio, expondo um `TimeoutError` em vez do encerramento normal
  `max_wait` + período de arrefecimento.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, uma mudança da janela de 5 horas, ou
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (que a termina como
  `extra_usage` em qualquer estado, uma vez que o excesso pago cobre agora o limite) terminam
  a faixa; a resposta segue então o percurso normal de período de espera. `budget_exhausted`
  é memorizado até à reposição do orçamento anunciada (até 8 dias).
- A verificação do limite é executada depois das novas tentativas intra-tentativa próprias do
  executor acionadas por `400` (edição de contexto, limites de thinking/effort, aprendizagem
  automática de parâmetros), pelo que um `429` do limite que só surja numa dessas novas
  tentativas continua a ser intercetado em vez de chegar ao percurso de período de espera.
- O estado reside em memória por ligação (um reinício implica mais um `429` do limite antes
  de voltar a aceitar).

**Reposição do limite da sessão** (`autoLimitReset`, tentada antes da faixa quando ambas estão ativas):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloco `juniper_tide`;
  quando `arm: "reset"` e `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` com
  `{ "program": "juniper_tide" }` (UUID da organização proveniente de
  `providerSpecificData.organizationUUID`, com fallback de bootstrap).
- `result: reset|not_limited` → o pedido é repetido à velocidade máxima (sem cabeçalho slow).
  `already_used` / `not_offered` memorizam `next_available_at` (uma semana por predefinição);
  qualquer falha aplica um recuo de 15 minutos. A reposição ocorre uma vez por semana e
  continua a contar para o limite semanal.

Proteções de regressão: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Aplicação automática de redefinições acumuladas

**Escopo:** conexões de assinatura Codex e Claude (OAuth). **Ativação opcional:** a configuração `bankedResetAutoApply` vem desativada e no modo `dry-run` por padrão (Configurações → AI → Aplicação automática de redefinições acumuladas).

**Objetivo:** usar créditos de redefinição acumulados quando uma conta atinge um limite de uso, sem esperar que um operador pressione "Resgatar" na página Limites do Provedor.

| Tipo de crédito (`creditTypes`) | O que é resgatado                                         | Onde é executado                                                           |
| ------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| `codexCredits`                  | Créditos de redefinição do Codex                          | tarefa em segundo plano, a cada 60 s                                       |
| `claudeCredits`                 | Créditos acumulados do Claude (créditos `GRANT`)          | tarefa em segundo plano, a cada 60 s                                       |
| `claudeSessionReset`            | Redefinição semanal do limite de sessão do Claude (acima) | caminho da requisição, pela mesma política usada na configuração por conta |

**Implementação:**

- Decisão pura (um conjunto de regras para os dois caminhos): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Tarefa em segundo plano: `src/lib/services/bankedResetAutoApply.ts` (iniciada em `src/instrumentation-node.ts`)
- Verificação no caminho da requisição do Claude: `src/lib/usage/claudeSessionResetPolicy.ts`, registrada por `setClaudeLimitResetPolicy()` em `open-sse/services/claudeLimitReset.ts`
- Histórico, limites e webhook: `src/lib/usage/bankedResetAudit.ts`
- API do histórico: `GET /api/settings/banked-reset-auto/history?limit=50` (autenticação de gerenciamento)

**Ordem de decisão** (a primeira regra que impedir a operação define o motivo registrado):

1. Recurso desativado, tipo de crédito desativado ou conta fora do escopo (`accountScope` `all` / `selected`, junto com o mapa `connections` por conta).
2. Fora do horário opcional em UTC (`startHourUtc` > `endHourUtc` indica um intervalo que atravessa a meia-noite).
3. Limites nas últimas 24 h: `maxPerAccountPerDay` (1), `maxPerDay` (3) e `minSpacingMinutes` (30) entre quaisquer dois resgates.
4. Gatilho: uma janela `session` ou `weekly` que atingiu o limite (obtida de `getQuotaWindowStatus().reachedThreshold`, e não de `isAccountQuotaExhausted()`, que só indica uma conta com todas as janelas esgotadas), ou um crédito que expira em até `expiringCreditHours` (24), em uma conta que já usou pelo menos `expiringCreditMinUsedPercent` (50).
5. Proteção para a redefinição natural: não resgatar quando a janela de 5 horas que atingiu o limite será redefinida em até `sessionResetGuardMinutes` (90), ou quando a janela semanal que atingiu o limite será redefinida em até `weeklyResetGuardHours` (12).
6. Mínimo semanal: não resgatar uma redefinição de 5 horas quando o saldo semanal restante estiver abaixo de `weeklyFloorPercent` (10).
7. Modo `last-resort`: não resgatar enquanto outra conta do mesmo provedor, dentro do escopo, ainda tiver pelo menos `poolHeadroomPercent` (10) disponível nas duas janelas. O gatilho de crédito prestes a expirar não passa por essa restrição.
8. `dry-run` registra uma linha sem resgatar nada; `last-resort` e `eager` efetuam o resgate.

Dados de cota ausentes nunca autorizam um resgate: se o horário de redefinição ou o uso semanal necessário à decisão for desconhecido, a conta é ignorada.

**Redefinição de sessão do Claude:** com o recurso desativado, ou com `claudeSessionReset` desativado, a configuração `autoLimitReset` por conta continua decidindo como antes. Com ambos ativados, o recurso substitui as configurações por conta: uma conta dentro do escopo só pode solicitar a redefinição quando a política permitir; no modo `dry-run`, nenhuma solicitação é feita.

**Segurança:** a tarefa resgata no máximo um crédito por execução, decide antes de listar os créditos (os créditos de uma conta ignorada nunca são listados), usa chaves de idempotência `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` e suspende novas tentativas nessa conta por 1 h após uma falha de listagem ou resgate. Cada resgate, falha e decisão de simulação é gravado em `audit_log` (`action: "bankedReset.redeem"`, sem tokens nem IDs de créditos). Os limites são calculados a partir desses registros e, por isso, persistem após reinicializações. Resgates bem-sucedidos também disparam o webhook `provider.reset_redeemed`.

Testes de regressão: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Afinidade da sessão (#7274)

**Âmbito:** uma sessão de cliente (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`
header) afixada a uma ligação, para **qualquer** fornecedor.

**Objetivo:** manter um agente com várias interações (Claude Code, aider, agentes
personalizados) na mesma conta entre pedidos, reduzindo a perda de contexto entre contas
e os `429` repetidos de arranque a frio em fornecedores com estado de sessão por conta.

**Implementação:**

- Resolução do TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Seleção/criação da afixação: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Extração do cabeçalho (genérica, qualquer fornecedor): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela de afixações persistentes: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Definição: `sessionAffinityTtlMs` (TTL global em ms, `0` desativa) — `src/lib/db/settings.ts`.
  Renomeada de `codexSessionAffinityTtlMs`, exclusiva do Codex, pela migração
  `124_generic_session_affinity_ttl.sql`, que transfere qualquer TTL do Codex previamente
  configurado como novo valor predefinido.

Antes de #7274, `resolveSessionAffinityTtlMs()` terminava imediatamente com `0` para todos
os fornecedores exceto `codex`, pelo que a definição de TTL (e os cabeçalhos de sessão) não
produzia efeitos em nenhum outro local, apesar de o mecanismo de afixação e a extração de
cabeçalhos já serem independentes do fornecedor. A correção removeu esse retorno antecipado;
o TTL aplica-se agora uniformemente a todos os fornecedores quando definido globalmente acima
de `0`.

Os três cabeçalhos de afinidade da sessão nunca são encaminhados a montante — os executores
criam os seus próprios cabeçalhos a montante do zero, em vez de transmitirem os cabeçalhos do
cliente, pelo que isto permanece apenas um ID de correlação interno.

### Concessões exclusivas de ligações de sessão geridas

**Âmbito:** um cliente/sessão HTTP gerido ativo é proprietário de uma ligação OmniRoute elegível.

**Objetivo:** fornecer a propriedade exclusiva e duradoura de uma ligação para clientes que necessitem de uma
barreira rígida de encaminhamento entre pedidos. Isto difere da afinidade de sessão, que é uma preferência
flexível de continuidade:
um lease exclusivo mantém o estado do ciclo de vida em SQLite, impõe a unicidade global do proprietário ativo e
da ligação ativa e rejeita uma geração obsoleta antes do encaminhamento para o fornecedor.

A funcionalidade é opcional por chave de API. Uma chave gerida tem de possuir o âmbito `lease:exclusive` e uma
lista `allowedConnections` explícita e não vazia. Qualquer cliente HTTP pode utilizar o endpoint do ciclo de vida;
não é necessário um nome de cliente, user-agent, fornecedor, método OAuth ou modelo. O lease é proprietário de uma ligação,
não de um modelo, pelo que uma alteração de modelo mantém a associação enquanto a ligação continuar normalmente
elegível. As regras normais de modelo, quota, estado de saúde, período de arrefecimento e lista de permissões
continuam a ser autoritárias e podem transferir a mesma geração para outra ligação elegível livre.

O ciclo de vida é `POST /api/v1/session-leases`, com as ações JSON `acquire`, `renew` e `release`.
Os pedidos de inferência geridos apresentam o valor opaco `X-OmniRoute-Lease-Owner` e o
`X-OmniRoute-Lease-Generation` exato. O proprietário utiliza `vlo_` seguido de 43 caracteres base64url; apenas
o respetivo hash SHA-256 é armazenado. Cada barreira final de encaminhamento também associa o ID da chave de API
autenticada e o ID da ligação ativa. Os cabeçalhos de controlo do lease são removidos dos registos, dos instantâneos
de pedidos retidos e dos cabeçalhos do executor upstream.

Se o encaminhamento normal tiver candidatos geridos elegíveis, mas todos os candidatos livres estiverem ocupados
por um lease ativo pertencente a outro proprietário, o OmniRoute devolve HTTP `429`, o código
lease-capacity-unavailable, o estado waiting-for-capacity e um `Retry-After` limitado, derivado da expiração
relevante mais próxima. A ausência normal de elegibilidade não é contenção de lease e mantém a semântica de erro
de encaminhamento existente.

Os mecanismos relacionados continuam separados:

- A ocupação de sessões OAuth é uma distribuição flexível, local ao processo, para contas OAuth.
- Os semáforos de conta atribuem permissões de concorrência de pedidos e terminam quando um pedido é concluído.
- Os leases de sessão geridos exclusivos são uma propriedade duradoura do ciclo de vida com uma barreira de geração.

---

## 3. Bloqueio de modelos

**Âmbito:** combinação de fornecedor + ligação + modelo.

**Âmbito por estado:** o estado que falha determina a chave na qual um bloqueio escreve
(`resolveLockoutScope()` em `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — um sinal de quota ou entitlement — bloqueia a **família de quotas**:
  para codex, todo o âmbito `codex` / `spark` (todos os modelos `gpt-5*` da
  ligação); para outros fornecedores, `getQuotaScopedModelForProvider()`.
- `404` bloqueia o modelo base (`getModelLockKey()` restringe `not_found`).
- Qualquer outro estado — falhas de transporte/servidor `5xx` e o `502` sintetizado pelo
  próprio OmniRoute a partir da validação de qualidade — bloqueia apenas a combinação
  **exata** de fornecedor/ligação/modelo. Um fluxo inválido num modelo não é evidência
  sobre a quota da conta; antes desta regra, uma resposta vazia em
  `codex/gpt-5.6-luna` removia todos os modelos `gpt-5*` dessa ligação do encaminhamento
  durante 2–30 min (com escalada), enquanto a quota permanecia inalterada.
- A opção `scope` explícita do chamador prevalece sempre (Antigravity passa `"exact"`).

**Objetivo:** evitar desativar uma ligação inteira quando apenas um modelo está indisponível ou limitado por quota.

**Exemplos:**

- Fornecedores com quota por modelo que devolvem 429
- Fornecedores locais que devolvem 404 para um modelo em falta
- Falhas de permissões específicas do fornecedor para modo/modelo (por exemplo, modos do Grok)

**Implementação:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Painel de arrefecimentos de modelos (v3.8.0)

IU: Definições → Arrefecimentos de modelos (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Apresenta os bloqueios ativos com: fornecedor, ligação, modelo, motivo, expiresAt. Os operadores podem reativar manualmente um modelo a partir do cartão.

**API REST:**

- `GET /api/resilience/model-cooldowns` — listar bloqueios ativos
- `DELETE /api/resilience/model-cooldowns` — reativação manual. Corpo: `{provider, connection, model}`. Autenticação: gestão.

### Gestor de arrefecimentos

IU: Monitorização → Gestor de arrefecimentos (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Uma página para cada ligação que está fora do encaminhamento por um motivo transitório, em vez de
abrir a página de cada fornecedor. Apresenta os arrefecimentos das ligações, os bloqueios de
modelos e os estados terminais, permite limpá-los por ligação, para uma seleção ou para todas
as ligações de um fornecedor, e edita as regras de arrefecimento mais ajustadas:
`streamStallCooldown.enabled` e o arrefecimento base `connectionCooldown` e o número máximo
de passos de recuo das ligações OAuth / com chave de API (guardados através de
`PATCH /api/resilience`). Os estados terminais (`banned`, `expired`, `credits_exhausted`) são
apresentados, mas nunca são limpos aqui.

O cartão **Regras de arrefecimento de erros** na mesma página edita as regras de erro do operador
(`settings.providerErrorRules`) e as predefinições gerais por fornecedor
(`settings.providerErrorDefaults`) através de `PATCH /api/settings` — consulte "Regras
declaradas pelo operador" na secção §7 para saber como são correspondidas. As durações são
Predefinição (sem arrefecimento explícito), 30 min, 1 h, 5 h, 24 h ou um valor personalizado
de 1 a 43 200 minutos (30 dias).

**API REST** (`src/lib/resilience/cooldownManager.ts`, autenticação: gestão):

- `GET /api/resilience/cooldowns[?provider=]` — ligações com estado, arrefecimento restante,
  nível de recuo, último tipo de erro e bloqueios de modelos (sem credenciais)
- `POST /api/resilience/cooldowns` — corpo `{connectionIds: string[]}` ou
  `{all: true, provider?}`; devolve `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### IU das definições de bloqueio + recuperação por redução após sucesso (v3.8.23)

O bloqueio de modelos passou de um comportamento codificado e sempre ativo para uma funcionalidade
totalmente configurável e opcional, com o seu próprio cartão de definições e um processo de
recuperação autónomo.

**Cartão de definições:** Definições → Bloqueio de modelos
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Este cartão é **distinto** do `ModelCooldownsCard`, apenas de leitura, acima (que apenas
_l_lista_ os bloqueios ativos) — o novo cartão _configura os parâmetros_. As predefinições
estão em `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Definição               | Predefinição                     | Significado                                                                         |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Interruptor principal — o bloqueio de modelos está **desativado por predefinição**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Estados upstream que contam como uma falha ao nível do modelo.                      |
| `baseCooldownMs`        | `120_000` (120 s)                | Duração inicial do bloqueio para a primeira falha.                                  |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limite do arrefecimento escalado.                                                   |
| `maxBackoffSteps`       | `10`                             | Número máximo de passos de escalada do recuo exponencial.                           |
| `useExponentialBackoff` | `true`                           | Determina se as falhas repetidas aumentam exponencialmente o arrefecimento.         |

As definições persistem através do armazenamento normal de definições e são validadas pelo
esquema de definições de resiliência; o cartão limita `baseCooldownMs`/`maxCooldownMs`
(com `maxCooldownMs ≥ baseCooldownMs`) e `maxBackoffSteps`.

**Recuperação por redução após sucesso:** a recuperação **não** depende apenas da expiração do
temporizador. Uma resposta saudável reduz progressivamente o contador de falhas do modelo, para
que um modelo recuperado a meio da janela deixe de aumentar a escalada (e seja desbloqueado)
antes de o seu temporizador expirar. Num alvo de combinação bem-sucedido,
`open-sse/services/combo.ts` chama `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), que **divide por dois** o valor armazenado de
`failureCount` (`Math.floor(failureCount / 2)`); quando chega a `0`, a entrada do bloqueio é
eliminada por completo. O correspondente `recordModelLockoutFailure()` incrementa o contador
(e aumenta o arrefecimento) em falhas ocorridas dentro da janela de escalada. Esta redução após
sucesso é adicional à simples expiração do temporizador — qualquer um dos processos pode
reativar um modelo.

**Estado:** os bloqueios são mantidos **em memória** (por `Map`s por processo de
`ModelLockoutEntry`, indexados por `provider:connectionId:model`, e bloqueios de
âmbito exato por `provider:connectionId:exact:model`), não persistidos na
BD — perdem-se ao reiniciar. As _definições_ são persistidas; o _estado_ ativo
dos bloqueios é efémero.

---

## 4. Controlo de simultaneidade de quota-partilha (v3.8.36)

As contas de subscrição (GLM, MiniMax, etc.) geralmente só aceitam pedidos simultâneos ~ 1–3; exceder isso aciona 429s e cooldowns. Isto é agudo sob **quota-partilha** (`qtSd/…`), em que várias chaves API partilham uma conta upstream. Três camadas evitam que uma conta partilhada seja inundada.

### Limite de simultaneidade por ligação (`max_concurrent`)

Cada ligação do fornecedor pode declarar um tecto `max_concurrent` (`provider_connections.max_concurrent`, definido no modal de ligação / API / DB). Deixe-o vazio sem limite. Este é o botão único que orienta a camada de serialização abaixo do —, configurando-a para a simultaneidade real da conta (por exemplo GLM ~ 1, MiniMax ~ 2).

### Limites de simultaneidade por modelo (`modelConcurrency`)

Além disso, uma ligação pode declarar limites exatos de simultaneidade por modelo dentro do seu mapa `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Defina-o no modal de ligação (**O limite de taxa substitui os limites de simultaneidade → por modelo** , um `model=cap` por linha) ou via `PATCH /api/providers/[id]` com o mesmo formato JSON. Semântica chave:

- **Em toda a ligação versus específico do modelo:** `maxConcurrent` continua a ser o teto partilhado para toda a ligação. Quando ambos se aplicam, ambas as portas são adquiridas atomicamente na mesma porta composta (`global → provider → account → model`); o comportamento efetivo é o limite aplicável mais rigoroso.
- **Correspondência exata da chave do modelo:** a chave é a string do modelo passada ao executor após a resolução de encaminhamento — normalmente o ID do modelo upstream simples (`glm-5`), e não um alias `provider/model` do lado do cliente (`zai/glm-5` não corresponde `glm-5`). Os valores são limites máximos de pedidos simultâneos de número inteiro positivo.
- **Enfileiramento local, sem descoberta:** os pedidos em excesso são enfileirados localmente com a semântica queue/timeout existente (erros de admissão `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` digitados). OmniRoute não descobre nem infere a política upstream — impõe os limites exatos que o operador configurou. Um modelo saturado nunca desativa o fornecedor e nunca cria um bloqueio permanente do modelo; o comportamento upstream 429/cooldown/fallback continua a ser o backstop de erro.
- **Âmbito por ligação e por processo:** os caps são por ligação à base de dados e mantidos em memória, pelo que duas ligações que reutilizam a mesma chave API upstream não estão coordenadas entre si.
- **Não configurado significa inalterado:** omitir o mapa (ou deixar o campo do painel em branco) não acrescenta nenhuma porta de modelo. Exemplo de configuração sem declarar qualquer limite de fornecedor universal:

```text
glm-5=1
glm-4.7=3
```

### Serialização de pedido de quota partilhada

Quando um despacho de quota partilhada tem como alvo uma ligação que declara um `max_concurrent` positivo, os pedidos simultâneos para esse **conta** são serializados através de um semáforo por ligação (chave `qsconn:<connectionId>`): excesso de pedidos **espere na fila** em vez de inundar a conta. Isso é **falha aberta** — uma fila saturada ou tempo limite prossegue sem um slot, em vez de rejeitar um pedido despachável. Ativar **Configurações Resiliência → Simultaneidade de quota partilhada por ligação →** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, padrão activado). Sem um limiar `max_concurrent` o comportamento permanece inalterado.

> A porta de encaminhamento de quota-partilha (`selectQuotaShareTarget`, DRR + P2C) é aberta em caso de falha e apenas _desprioriza_ uma ligação — at-cap com um pool de ligação única que não pode ser limitado, pelo que este semáforo é o que realmente contém a inundação.

### Nova tentativa com reconhecimento de arrefecimento combinado

Para cada estratégia de combinação (quando ativada), um pedido que cristalizaria um 429 para um arrefecimento transitório SHORT espera e reenvia em vez de devolver o 429 — Isto cobre janelas TPM/RPM da classe Gemini (repetição após ~ 60s) em combos de vários modelos, por exemplo, ambos os alvos de um combo de 2 modelos a atingir um limite de taxa por modelo. Delimitado por `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) em **Configurações Resiliência →** . Nunca espera por motivos `quota_exhausted` (bloqueado até à meia-noite) ou auth/not-found. Com `comboTimeoutMs` definido, não é iniciada uma espera que não possa terminar antes desse prazo (#18998): o combo responde imediatamente com a sua resposta terminal em vez de um `COMBO_TIMEOUT` 504.

Um combo pode ser cancelado com `config.comboCooldownWaitEnabled: false`. Apenas `false` literal desativa estas esperas combinadas partilhadas (arrefecimento pós-despacho e esperas circuit-open/model-lock pré-despacho) e a sua extensão de tempo limite de orçamento de espera. Ausente ou `true` preserva a política global; `true` não pode ativar a espera desativada globalmente. Um `targetTimeoutMs` explícito ainda ganha. Esta desativação não altera a espera de pré-despacho separada do código nativo do Codex.

A mesma porta cobre o caso de pré-despacho (#16319): quando cada alvo de um combo é ignorado antes de qualquer tentativa ser feita porque o seu modelo fica num bloqueio transitório curto, o caminho de tentativa zero aguarda o bloqueio sob os mesmos limites e reenvia, em vez de responder a um `503 ALL_TARGETS_SKIPPED` sem dicas. Quando não é permitida qualquer espera (teto, tentativa ou orçamento esgotados, ou recurso desativado), a resposta do terminal é atualizada para `429 rate_limit_error` transportando `retry_after` / `reset_at` a partir da primeira expiração transitória do bloqueio; Os bloqueios de quota, autenticação e não encontrado mantêm o 503 sem dicas.

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

## 5. Controlo de Admissão da Fila de Pedidos (v3.8.49 · issue #6593)

**Âmbito**: a fila local de rate limit por fornecedor+ligação (`open-sse/services/rateLimitManager.ts`,
suportada pelo Bottleneck), uma camada abaixo dos três mecanismos acima.

**`maxWaitMs` limita a espera em fila; `executionMaxWaitMs` limita a execução.**
Os dois são deliberadamente separados, e nenhum alimenta o outro.

`resilienceSettings.requestQueue.maxWaitMs` é o **orçamento de espera em fila**: cobre
a espera por um slot do fornecedor e depois a permanência em QUEUED, e o seu
temporizador é limpo no momento em que a tarefa sai de QUEUED e começa a executar
(`rateLimitManager.ts`, `wrappedFn`). Um pedido que o exceda nunca chega
ao upstream. Predefinição de 30000ms, fornecida por `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
em `src/lib/resilience/settings.ts` e fixada por
`tests/unit/ratelimit-admission-control-6593.test.ts`, pelo que uma alteração a esse valor
torna esse teste vermelho em vez de deixar este parágrafo silenciosamente desatualizado.

`resilienceSettings.requestQueue.executionMaxWaitMs` é o que o Bottleneck
recebe como `expiration` da tarefa, cujo temporizador só arranca após o despacho. É
uma salvaguarda para executores sem um timeout de upstream próprio, e é
elevado ao timeout de início de fetch do próprio executor quando este é mais longo, para
não poder cortar uma resposta saudável em curso. Predefinição de 600000ms (10 min).

Alimentar o orçamento da fila no `expiration` era o que costumava matar gateways não incrementais
a meio do voo — estes funcionam legitimamente durante minutos antes dos primeiros bytes —
e é por isso que uma expiração é exposta como `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), enquanto o orçamento da fila transporta o
código de timeout da fila. Substitua qualquer um deles através de `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ou do dashboard
(**Definições → Resiliência**). Ambos são limitados ao intervalo 1ms–24h quando normalizados.

**Precedência, para ambos:** a variável de ambiente apenas fornece a _predefinição_. Um valor
persistido em `resilienceSettings.requestQueue` (dashboard / patch de API, guardado
em `key_value`) prevalece sobre ela, e um
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` por ligação prevalece sobre esse. Definir
a variável de ambiente numa implementação que já tem um valor persistido, portanto,
não muda nada — limpe ou atualize antes a definição persistida.

A permanência em fila é limitada por `maxWaitMs`; o `maxQueueDepth` abaixo limita quantos
chamadores podem estar em fila em simultâneo.

**Retries declarados no corpo: pacing vs bloqueio.** Um corpo 429 pode indicar a sua própria espera
(Gemini `RetryInfo.retryDelay`, texto "retry after Ns"), que o
`updateFromResponseBody` lê. Uma espera que cabe no `maxWaitMs`
da ligação é pacing: o limiter esvazia o seu reservatório durante esse tempo e as chamadas em fila
são despachadas quando este volta a encher. Uma espera mais longa do que `maxWaitMs` não é algo que a
fila possa aguardar — o Gemini responde a uma quota diária esgotada com
`retryDelay: "86399s"`. O `Retry-After` retransmitido no 429 reconstruído (#16528)
já faz com que o motor de fallback bloqueie o modelo durante essa janela, mas pausar
também o limiter por causa disso continuaria a bloquear qualquer chamada que chegue à chave mais cedo
(após um reset de resiliência, por exemplo) durante todo o `maxWaitMs`. Quando essa espera provém de um detalhe `RetryInfo`
tipado da Google (a proveniência `google_rpc_retry_info`) e o limiter da chave
já tem âmbito no modelo (ver `getLimiterKey`), o 429 passa a ser um
bloqueio do modelo nessa ligação (`lockModelForLongBodyRetry` em
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, com teto de 24h), e o
limiter não é pausado. A seleção de conta salta esse bloqueio através de
`isModelLocked()`, tal como o gate de pré-despacho do combo para alvos fixados
à ligação. No antigravity, cujo limiter é por família de quota, o bloqueio é
no modelo exato, tal como os seus outros bloqueios de quota. O nome que o cliente pediu
também é bloqueado quando um alias o resolveu para esse modelo, porque essas verificações usam
o nome solicitado; é bloqueado exatamente (`lockExactModel`), pelo que um alias que
atrasse uma família de quota do antigravity ou um âmbito codex nunca bloqueia o seu próprio. Uma
dica em texto livre, um `retryDelay` não tipado, ou um
limiter partilhado por toda a ligação mantém a pausa. Quando o limiter que
o caminho do 429 acabou de reconstruir entra efetivamente em pausa, um chamador cujo tempo restante em fila termina
antes do fim da pausa é rejeitado de imediato com o código de timeout da fila
(`checkLimiterPause`), em vez de esperar que esse tempo se esgote; o fim registado é
ancorado antes de o limiter ser construído, onde o Bottleneck inicia o seu relógio de
renovação, e qualquer alteração posterior ao reservatório esquece-o. Coberto por
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` e
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — limite de admissão opt-in (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
limita quantos pedidos podem estar em fila (ainda não despachados) para um
fornecedor+ligação em simultâneo. Quando a fila já contém `maxQueueDepth`
pedidos, um novo pedido é rejeitado de imediato com um erro tipado
`code: "RATE_LIMIT_QUEUE_FULL"` **antes** de chegar sequer a `limiter.schedule()`
— pelo que a rejeição é barata e acontece antes de qualquer trabalho a jusante
de compressão de prompts / tradução para esse pedido. Predefinição `0` =
desativado, preservando o comportamento existente de fila ilimitada; limitado a 0–100000.
Substituição via `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ou
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/patch de API).

A própria verificação de admissão é uma função pura
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), pelo que
é testável unitariamente sem um limiter Bottleneck real.

> O RFC que abriu #6593 também propôs uma flag
> `bypassCompressionOnRateLimit`. O pipeline
> `open-sse/services/compression/` deste repositório é compressão de
> prompt/contexto no pedido LLM de saída (`chatCore.ts`, em torno do bloco
> `resolveCompressionSettings`/`selectCompressionStrategy`), e não compressão
> de resposta HTTP em corpos 429 sintetizados — não existe um caminho de código
> correspondente para uma flag literal de bypass. Esse passo de compressão de
> prompt também corre atualmente _antes_ de `withRateLimit()` no pipeline de
> pedidos, pelo que reordenar para o ignorar numa rejeição por fila cheia é
> uma alteração separada e maior do que o âmbito deste issue; foi
> intencionalmente **não** implementada aqui e fica como follow-up, caso o
> ganho de poupança de CPU justifique o risco de reordenação.

### Rede de Segurança de Ativação Automática de Limite de Taxa e Proteção de Ligações (`rateLimitProtection`)

**Rede de segurança de ativação automática** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, predefinição `true`):
Por predefinição, o OmniRoute ativa automaticamente a proteção por fila de limite de taxa para todas as ligações ativas de fornecedores com chave API (`getProviderCategory(provider) === "apikey"`). Isto garante que os pedidos recebidos destinados a chaves API upstream sensíveis a limites de taxa são enfileirados e limitados através do Bottleneck, em vez de explodirem em erros 429 no upstream. A rede de segurança pode ser sobreposta através da variável de ambiente `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` desativa, `true`/`1`/`on` força a ativação), que tem precedência sobre a definição persistida no dashboard (**Definições → Resiliência** / `PATCH /api/resilience`).

**Semântica de `rateLimitProtection` por ligação:**
A proteção de limite de taxa por ligação é controlada através do campo booleano `rateLimitProtection` nas ligações de fornecedores (persistido como `rate_limit_protection` no SQLite):

- **Explicitamente ativada (`rateLimitProtection === true`)**: A proteção de limite de taxa está explicitamente ativada para esta ligação, independentemente da categoria do fornecedor ou de a rede de segurança de ativação automática estar ligada.
- **Explicitamente desativada (`rateLimitProtection === false`)**: Desativa a proteção explícita, mas **não** exclui uma ligação ativa de chave API da rede de segurança global de ativação automática. Em `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` e `undefined` são equivalentes: apenas `rateLimitProtection === true` é tratado como uma sobreposição explícita. Se `rateLimitProtection` for `false` (ou não estiver definido), uma ligação ativa de chave API continua a corresponder à condição de ativação automática e permanece protegida por limite de taxa.
- **Sem exclusão por ligação**: Um operador não pode atualmente expressar "esta única ligação ativa de chave API deve correr sem proteção por fila de limite de taxa" mantendo a ativação automática ativa para as restantes. Para correr ligações de chave API totalmente sem filas de limite de taxa, a rede de segurança tem de ser desativada globalmente (`RATE_LIMIT_AUTO_ENABLE=false` ou `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Caminhos de escrita suportados:**

- **`POST /api/rate-limits`**: O caminho de escrita de gestão suportado para alternar `rateLimitProtection` numa ligação (`{ connectionId: string, enabled: boolean }`). Chamar este endpoint com `enabled: true` ativa a proteção explícita; chamar com `enabled: false` remove a proteção explícita (embora as ligações ativas de chave API permaneçam cobertas pela rede de segurança global, se a ativação automática estiver ligada).
- **`PUT /api/providers/[id]`**: Deliberadamente **não** aceita nem altera `rateLimitProtection` (#11278). Atualizar os metadados da ligação de fornecedor via `PUT /api/providers/[id]` nunca mudará o estado persistido da proteção de limite de taxa.

---

## 6. Watchdog do débito de streams lentos (#9709)

O mecanismo opcional `resilienceSettings.streamRecovery.throughputWatchdog` deteta um upstream que continua a enviar blocos, mas produz conteúdo do assistente abaixo da taxa de saída útil configurada. É deliberadamente distinto do tempo limite de inatividade: os heartbeats e os metadados não reiniciam nenhum dos temporizadores nem contam como progresso. Também é distinto do prazo limite rígido da tentativa (#9153), que continua a ser um limite de segurança absoluto, independentemente da qualidade da saída.

O watchdog requer um período de aquecimento seguido de uma janela móvel completa antes de poder abortar. Conta os deltas de texto provenientes do Chat Completions e dos eventos de saída da Responses API (uma aproximação conservadora baseada em bytes UTF-8), ignora eventos apenas de utilização e eventos vazios, e suspende a avaliação enquanto estiverem em curso eventos de chamadas de ferramentas ou de raciocínio. Está desativado por predefinição e pode ser ativado com `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (esse valor de ambiente apenas inicializa a predefinição — um booleano guardado em `resilienceSettings.streamRecovery.throughputWatchdog.enabled` prevalece; consulte a nota sobre a precedência entre ambiente e dashboard no início deste guia); a janela, o aquecimento, a taxa mínima e a saída mínima mensurável são limitados pela camada normal de normalização das definições de resiliência.

Quando ativado, um aborto pelo watchdog é aplicado apenas à tentativa upstream ativa. Antes de quaisquer bytes visíveis para o cliente, o caminho existente de recuperação antecipada para a mesma conta pode reabrir a tentativa. Após a confirmação, o stream nunca é reproduzido cegamente; apenas o contrato existente de continuação segura a meio do stream pode concatenar um sufixo. A finalização continua a ocorrer uma única vez, pelo que a contabilização da utilização e a libertação do semáforo não são duplicadas.

---

## 7. Reafirmação do estado upstream (erros de quota incorretamente indicados)

**Âmbito:** um gateway upstream que comunica temporariamente o esgotamento da quota com o estado HTTP errado.

**Objetivo:** corrigir um estado enganador ANTES da classificação, para que os consumidores a jusante (motor de fallback, agregação de combinações, resposta apresentada ao cliente) vejam a verdadeira natureza transitória da falha.

Alguns gateways sinalizam o esgotamento TEMPORÁRIO da quota com um estado HTTP não reexecutável. `agentrouter.org` devolve `403` (por vezes `400`) com um corpo em chinês
(`用户额度不足` / `额度不足`) em vez do `429` padrão. Clientes como o Claude
Code tratam `403` como permanente e abortam a sessão e, sem esta correção,
o motor de fallback classificá-lo-ia como `AUTH_ERROR` em vez de um
evento de quota.

**Implementação:**

- Registo + matcher: `open-sse/config/upstreamStatusRestatement.ts` — uma
  lista de regras por fornecedor (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), correspondidas através de `applyStatusRestatement()`.
- Ponto de chamada: o bloco `providerFailure:` em `open-sse/handlers/chatCore.ts`
  (por volta da linha 3654), imediatamente depois de `parseUpstreamError()` analisar uma
  resposta upstream com um estado HTTP de erro (`!providerResponse.ok`) e antes de
  ser executada qualquer classificação, para que todos os consumidores a jusante vejam o
  estado corrigido. Os erros incorporados num fluxo SSE `200` seguem um caminho
  separado e posterior de análise do fluxo e **não** são abrangidos por este hook atualmente —
  uma limitação conhecida, ainda não necessária para o erro de estado do agentrouter
  (que surge como um estado HTTP de erro).
- Elegibilidade para nova tentativa: `429` está incluído em
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), pelo que um erro
  reafirmado transporta uma janela real para nova tentativa, em vez de surgir como um
  `403` inerte.
- O `defaultRetryAfterMs` sintético de `60s` (`upstreamStatusRestatement.ts`)
  é apenas o que a resposta reafirmada comunica ao **cliente**; não é, por si só,
  a duração interna de arrefecimento/bloqueio da ligação — esta é governada
  separadamente pelo mecanismo que efetivamente trata o erro reafirmado
  (o backoff crescente do Connection Cooldown, §2, com base de `3s` para
  fornecedores de chaves API; ou o Model Lockout, §3, para fornecedores com quota por
  modelo, como o agentrouter). O router pode tornar-se internamente elegível para uma nova
  tentativa antes da janela de 60s que anuncia ao cliente — margem intencional,
  não um erro.

Os erros permanentes (o `无权访问模型` do agentrouter — sem acesso a este modelo) **NUNCA** são reafirmados: `excludeMarkers` impede a regra mesmo quando `textMarkers` corresponde, pelo que o erro mantém o seu estado original e nada o tenta novamente indefinidamente. A regra de classificação do fornecedor correspondente
(`agentrouter-model-access-denied` em `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, um arrefecimento base declarado de
`6h`) é consultada por `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_antes_ do retorno antecipado genérico de `FORBIDDEN` da categoria apikey, condicionado por
`honorsRuleLockScope(provider)` (#10334 — atualmente exclusivo do agentrouter através da
lista de permissões `HONORS_RULE_LOCK_SCOPE_PROVIDERS` em
`providerErrorRules.ts`). O arrefecimento declarado de 6h da regra é propagado como
`fallbackResult.baseCooldownMs`, mas continua a alimentar o caminho preexistente de
bloqueio por modelo e quota (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, não alterado pelo #10334 exceto quanto à origem do
arrefecimento): é reduzido ao valor de `mlSettings.maxCooldownMs` do operador
(predefinição `1_800_000ms` / 30min), como qualquer outro bloqueio de modelo, e o
_motivo do bloqueio persistido_ mantém-se no valor predefinido hardcoded preexistente
`"forbidden"`, não no `"auth_error"` da regra — apenas a duração do arrefecimento é
respeitada de ponta a ponta, não a cadeia do motivo. A própria ligação permanece ativa;
os modelos irmãos na mesma ligação não são afetados.

Os erros de quota reafirmados (`额度不足`) chegam, em produção, a uma regra do fornecedor
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, sem arrefecimento declarado próprio — aplica-se o backoff predefinido
escalado da camada de persistência). Desde o #10334, o `scope` em
`ProviderErrorRuleMatch` É consumido de ponta a ponta, mas **apenas** para fornecedores
incluídos na lista de permissões `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — atualmente apenas `"agentrouter"`, condicionado através de
`honorsRuleLockScope()`). Para todos os outros fornecedores, `scope` continua a ser
meramente informativo, exatamente como antes do #10334.
`checkFallbackError` expõe o âmbito da regra correspondente como
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) é a proteção partilhada que confirma que um
`ruleScope` é genuinamente seguro para ser respeitado como um sinal de âmbito global da
ligação e de autorrecuperação (âmbito `"connection"`, motivo `quota_exhausted`, nunca
`permanent`, nunca `creditsExhausted` — uma defesa contra uma futura associação do âmbito
`"connection"` a um estado permanente da conta). Dois consumidores chamam-no:

- **Persistência** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  em vez de entrar no ramo de bloqueio **por modelo** do fornecedor passthrough
  (agentrouter tem `passthroughModels: true` → `hasPerModelQuota()`
  devolve `true`), aplica um **período de arrefecimento temporário da ligação** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nunca um estado terminal
  (`credits_exhausted`/`banned`/`expired`) — para que a ligação se recupere
  automaticamente quando o período de arrefecimento terminar, sem exigir uma
  reposição manual das credenciais.
  Ignorado para ligações com `disableCooling: true` (#2997): essa opção de exclusão
  faz com que o fluxo continue para o bloqueio por modelo (um compromisso
  documentado — consulte o comentário no código acima do ramo).
- **Encaminhamento de combinações no mesmo pedido** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): a mesma proteção marca a
  ligação no conjunto em memória `exhaustedConnections`, indexado por
  `${provider}:${connectionId}`. Isto apenas ignora um destino restante do MESMO
  PEDIDO que _já tenha esse `connectionId` exato_ no seu próprio objeto de destino
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` antes da consulta a `exhaustedConnections`) — uma combinação simples
  de lista de modelos, em que os destinos irmãos não têm um `connectionId`
  associado no próprio objeto e um deles só é resolvido por despacho a partir do
  cabeçalho `X-OmniRoute-Selected-Connection-Id` da resposta, nunca encontra essa
  correspondência de chave. Nesse caso comum, a proteção efetiva contra uma perna
  restante reutilizar a conta que acabou de ficar esgotada NÃO é este Set — é a
  camada de persistência acima (o `rateLimitedUntil` da ligação está agora no
  futuro), combinada com esta mesma proteção a suprimir
  `transientRateLimitedProviders` para a falha (consulte "Conceção em duas etapas"
  e o comentário no código sobre o ramo
  `isAgentrouterConnectionQuotaScope` em `targetExhaustion.ts`): como esse Set fica
  sem marcação, o `allowRateLimitedConnection` de permissão forçada de
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NÃO é ativado
  para as pernas restantes do fornecedor, pelo que o filtro
  `rateLimitedUntil` da seleção de credenciais (`src/sse/services/auth.ts:1238`)
  é respeitado normalmente e uma perna restante seleciona outra ligação
  agentrouter ainda elegível ou falha sem credenciais disponíveis — não força o
  regresso à ligação que este ramo acabou de colocar em arrefecimento.

### Conceção em duas etapas: reformulação do estado e, depois, classificação

A reformulação do estado (`upstreamStatusRestatement.ts`) e as regras de
classificação do fornecedor (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) são registos separados que usam ambos o ID do fornecedor
e marcadores de texto como chaves, mas são executados em locais diferentes e
servem propósitos diferentes: a reformulação reescreve antecipadamente o estado
HTTP em `chatCore.ts`; as regras de classificação escolhem o `reason` de recurso
e bloqueiam o `scope` (`model` / `provider` / `connection`) dentro de
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

As regras de classificação só veem o **texto** completo do erro (necessário para
corresponder a marcadores no corpo, como `额度不足`) para os fornecedores
indicados na lista de permissões `FULL_TEXT_RULE_PROVIDERS` em
`providerErrorRules.ts` — atualmente apenas `"agentrouter"`. Para todos os
outros fornecedores do **catálogo incorporado**, `checkFallbackError` passa a
`getProviderErrorRuleMatch` apenas o erro estruturado (`{code, type}`), o que é
suficiente para regras baseadas em cabeçalhos/estado/código, mas não deteta
marcadores no texto do corpo. O auxiliar `resolveRuleMatchBody()` faz esta
seleção: o texto completo do erro para fornecedores autorizados; o erro
estruturado nos restantes casos. Adicionar um fornecedor **incorporado** a
`FULL_TEXT_RULE_PROVIDERS` é uma ativação explícita por fornecedor — existe para
que o caminho predefinido de todos os fornecedores que não constam da lista
permaneça inalterado byte a byte.

O `scope` de uma regra (`model` / `provider` / `connection`) é uma ativação
separada de `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` apenas o expõe como
`fallbackResult.ruleScope`, e os consumidores a jusante só o respeitam como algo
mais do que uma etiqueta informativa para os fornecedores da lista de permissões
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo ficheiro (controlado através de
`honorsRuleLockScope()` — atualmente apenas `"agentrouter"`). Consulte
"Erros de quota reformulados" acima para saber o que uma correspondência
`scope: "connection"` faz quando um fornecedor está nessa lista de permissões.

**#11104 — as regras declaradas pelo operador ignoram ambas as listas de permissões.**
Um operador pode declarar uma regra por fornecedor em tempo de execução através de
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
sem editar este ficheiro. Submeter uma regra do operador a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listas de
permissões destinadas a proteger o comportamento **predefinido** das regras do
catálogo incorporado — tornaria o mecanismo de definições inerte para todos os
fornecedores, exceto os que já constam dessas listas, uma vez que declarar a
regra já é a ativação explícita do operador. Tanto `resolveRuleMatchBody()` como
`honorsRuleLockScope()` verificam primeiro
`hasOperatorRuleForProvider()`: um fornecedor com uma regra do operador recebe o
texto bruto do erro e tem o `scope` declarado respeitado, independentemente de
também aparecer numa das listas de permissões.

**Regras declaradas pelo operador** (`OperatorProviderErrorRule`): cada regra tem
um `status` opcional e um `match` opcional (uma substring simples,
não sensível a maiúsculas e minúsculas, do texto do erro, nunca um RegExp, pelo
que não pode causar ReDoS), e tem de definir pelo menos um dos dois. Quando ambos
estão definidos, são combinados com AND; um campo omitido corresponde a qualquer
valor, pelo que `{match: "insufficient_quota"}` corresponde a qualquer estado
que contenha esse código. A primeira regra correspondente é aplicada.
`cooldownMs` aceita até 30 dias; no máximo 50 regras no total.

**Predefinições abrangentes** (`settings.providerErrorDefaults`, opt-in, definidas através de
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
com `cooldownMs` de 1 minuto a 30 dias. Uma predefinição só se aplica quando não
foi encontrada nenhuma regra do operador nem nenhuma regra do catálogo
incorporado, e apenas a erros 402, 403, 408, 429 e 5xx. Os erros relacionados
com o formato do pedido (400, 404, 409, 413, 422) e os 401 isolados mantêm o
seu próprio tratamento. Sem um `reason` explícito, o motivo é obtido a partir do
estado, da mesma forma que `classifyError` o faz. Declarar uma predefinição
conta como uma regra do operador para `hasOperatorRuleForProvider()`, pelo que o
seu `scope` (por predefinição, `"connection"`) é respeitado. O cooldown efetivo
de uma predefinição é o mais longo entre o seu `cooldownMs` e a indicação de
nova tentativa do próprio fornecedor (`Retry-After`,
`x-ratelimit-reset` ou uma indicação de reinicialização no corpo, a mesma
indicação que o motor respeita quando a definição de cooldown da ligação
"use upstream retry hints" está ativa), pelo que uma predefinição pode prolongar
uma indicação curta do fornecedor, mas nunca encurtar uma reinicialização real.
Uma regra explícita do operador mantém o seu `cooldownMs` exato. Nem uma regra
nem uma predefinição contornam as salvaguardas de cooldown da ligação em
`markAccountUnavailable`: um cooldown ativo e mais longo nunca é encurtado e um
estado terminal nunca é substituído. Os detetores de texto incorporados que são
executados anteriormente em `checkFallbackError` (créditos esgotados, quota
diária, conta desativada) continuam a ter precedência para as suas próprias
frases.

**Lacuna conhecida — `providerRuleRegistry` nunca é consultado para HTTP 400.**
A ramificação `BAD_REQUEST` de `checkFallbackError` classifica o estado 400
inteiramente através das suas próprias matrizes de padrões
(`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. em `accountFallback.ts`) e termina antes de
ser alcançada a ramificação `configuredRule`/`getProviderErrorRuleMatch` acima.
Uma regra do catálogo incorporado (ou uma regra do operador) com
`status: 400` é sintaticamente válida, mas nunca será aplicada. Atualmente,
nenhuma regra existente visa 400, pelo que nada em produção é afetado — mas
uma futura regra para 400 exigirá primeiro uma alteração nesta ramificação, o
que constitui uma mudança maior do que adicionar uma regra (reclassifica 400
para todos os fornecedores que já dependem do comportamento das matrizes de
padrões) e está fora do âmbito da adição de uma regra para um único fornecedor.

### Adicionar um novo gateway que deturpa a quota

1. Registe um array de regras em `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Mantenha `textMarkers`
   específicos do fornecedor; nunca reutilize frases genéricas em inglês que
   colidam com `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcionalmente, registe regras de classificação em
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) para escolher
   o âmbito de bloqueio correto (`connection` para quota ao nível da conta,
   `model` para erros específicos de um modelo). Este passo só tem efeito em
   produção para fornecedores cujas regras precisam do texto completo do erro
   (marcadores no corpo): adicione o id do fornecedor a
   `FULL_TEXT_RULE_PROVIDERS` no mesmo ficheiro — caso contrário,
   `checkFallbackError` só fornece à regra o erro estruturado
   `{code, type}` e uma regra baseada no texto do corpo nunca corresponderá ao
   tráfego real. As regras que correspondem apenas a `status`/`headers` (como as
   de Opencode ou Minimax) não precisam desta ativação. Separadamente, se a
   regra declarar `scope: "connection"` e a intenção for um cooldown efetivo ao
   nível da ligação, juntamente com a omissão da combinação no mesmo pedido
   (e não apenas uma etiqueta informativa), adicione o id do fornecedor a
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` no mesmo ficheiro — é isto que controla o
   consumo ao estilo de `isAgentrouterConnectionQuotaScope()` em
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) e em
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); sem isto, `scope`
   continua a ser propagado através de `fallbackResult.ruleScope`, mas nada
   atua sobre ele.
3. Adicione testes unitários que reproduzam o padrão de
   `tests/unit/upstream-status-restatement.test.ts`
   e `tests/unit/agentrouter-error-rules.test.ts` (incluindo as salvaguardas
   not-permanent / not-creditsExhausted e — se o fornecedor precisar da lista
   de permissões — um teste que confirme que `resolveRuleMatchBody()` devolve o
   texto completo apenas para esse fornecedor).

Não são necessárias alterações a `chatCore.ts`, `classifyError` ou combo.

#### Bloqueio agrupado por segmento de saída (#10880)

Os fornecedores em `EGRESS_BUCKETED_LOCK_PROVIDERS` (família opencode) são
tratados como upstream agrupado por IP (o nível gratuito do opencode é agrupado
por IP, não por conta — consulte #9611): um estado 429 classificado como
`quota_exhausted` **ou** `rate_limit_exceeded` inicia o cooldown de todas as
ligações da família permitida cujo último IP de saída conhecido corresponda ao
da ligação que falhou, antes de a rotação poder tentar essas ligações
— evitando N-1 chamadas upstream destinadas a falhar (com a mesma forma que
#10460/#10525). `rate_limit_exceeded` é incluído deliberadamente: no caminho de
`markAccountUnavailable`, as regras específicas do opencode nunca correspondem
(não são fornecidos cabeçalhos/corpo a `checkFallbackError`, e o opencode não
está em `FULL_TEXT_RULE_PROVIDERS`), pelo que um 429 cujo corpo contenha o texto
de quota da subscrição ("monthly usage limit
reached") é classificado como `quota_exhausted` pelo fallback de texto de quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown de 1 h) antes
de a regra `status_429` ser alcançada — enquanto um 429 sem texto de quota
(limitação de taxa simples) é classificado através da regra `status_429` como
`rate_limit_exceeded` e continua a aplicar o cooldown à família IP. Para um
fornecedor permitido, uma limitação de taxa agrupada por IP é o mesmo sinal que
uma quota esgotada. Limitações honestas:

- **Melhor esforço**: o bloqueio resolve o último `egress_ip` conhecido da ligação
  a partir de `proxy_logs` (janela de 24 h, síncrona, sem cache). Cache frio (o
  IP de saída nunca foi sondado) ou nenhuma linha → a ligação em falha continua
  a entrar em arrefecimento pelo ramo (registado como atualmente), apenas sem
  bloquear nenhuma ligação irmã.
- **Nunca terminal**: o arrefecimento é uma janela de quota renovável
  (`testStatus: "unavailable"`); nunca é derivado um estado permanente de um
  sinal ao nível do IP. As ligações `disableCooling` ignoram completamente o
  ramo.
- **A granularidade do bloqueio muda para a família allowlisted**: isto é uma
  alteração de âmbito, não apenas uma otimização para ligações irmãs. opencode é
  um fornecedor `passthroughModels`, pelo que, antes deste ramo, um 429 produzia
  um bloqueio por MODELO; agora produz um arrefecimento da ligação — incluindo
  para um operador que execute uma única ligação sem qualquer ligação irmã. Essa
  é a granularidade que a tabela de regras do opencode já declara como correta
  (`scope: "connection"`,
  `providerErrorRules.ts`), nunca respeitada até agora porque opencode não está
  em `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. O ramo escreve ele próprio o
  arrefecimento e o `backoffLevel` da ligação em falha, imitando o ramo
  connection-scoped do agentrouter, e retorna — o bloqueio por modelo e o
  caminho genérico abaixo nunca são alcançados.
- **Combo incluído**: tal como no ramo do agentrouter, o âmbito ignora
  deliberadamente a redução `persistUnavailableState`/`isCombo` aplicada por um
  chamador combo a um 429. Um bloqueio por modelo não é uma forma mais fraca
  deste âmbito; é a unidade errada: não diz nada sobre o IP esgotado, pelo que a
  rotação combo continuaria a consumir uma chamada garantidamente falhada por
  ligação irmã.
- **Segurança das ligações irmãs**: uma ligação irmã que já esteja num estado
  terminal (banned/credits_exhausted) ou que já esteja num arrefecimento mais
  longo nunca é substituída.
- **Allowlist exclusiva**: alargar `EGRESS_BUCKETED_LOCK_PROVIDERS` é uma
  decisão explícita do responsável; não existe ligação genérica (padrão
  #10334/#10419). A consulta de ligações irmãs usa essa mesma allowlist em vez
  de a repetir como literal SQL, pelo que alargá-la continua a ser uma alteração
  de uma linha.
- **Rotação do IP de saída, em ambas as direções**: a janela de pesquisa (24 h)
  é muito mais ampla do que o TTL da cache do IP de saída (5 min), pelo que o
  “último IP conhecido” é histórico, não o estado atual. Se o proxy de uma
  ligação rodou dentro da janela, o bloqueio pode **falhar** um IP genuinamente
  partilhado (o IP registado é o novo, ainda não esgotado) — e, simetricamente,
  pode **arrefecer uma ligação irmã que entretanto tenha rodado para longe** do
  IP esgotado. O segundo caso custa a essa ligação irmã uma janela de
  arrefecimento; ambos são limites aceitáveis, de melhor esforço, de uma pesquisa
  baseada em histórico.
- **Custo**: duas varreduras limitadas de `proxy_logs` (filtradas pela janela
  através de `idx_pl_timestamp`), apenas com a frequência dos 429. Nenhum índice
  novo (migração 134 YAGNI). Medido numa cópia de uma base de dados com tráfego
  real e tamanho moderado; uma instância de elevado débito mantém
  proporcionalmente mais linhas na mesma janela.

## Outras Funcionalidades de Resiliência

- **20 estratégias de encaminhamento** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — consulte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Encaminhamento sensível à reposição** (v3.8.0) — dá prioridade a ligações com base na hora de reposição da quota.
- **Degradação do modo em segundo plano** — o `background: true` da Responses API é degradado para síncrono, com aviso.
- **Deteção dinâmica de limites de ferramentas** — faz backoff aos fornecedores quando os limites de número de ferramentas são atingidos.
- **Fallback de emergência** — controlado pela variável `OMNIROUTE_EMERGENCY_FALLBACK`; os operadores podem substituí-lo na página de Feature Flags sem reiniciar.

---

## Depuração

- O combo ponderado responde `503 all_targets_cooling_down` (`Retry-After` definido, `diagnostics.excluded` lista todos os alvos com `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → o pool está configurado e ligado, todos os alvos estão apenas excluídos por um temporizador de resiliência; o aviso `[COMBO] Weighted selection: every target excluded before dispatch — …` indica os motivos e os segundos restantes. Um `404 no_executable_targets` do mesmo combo significa que não esteve envolvido nenhum temporizador de resiliência (nada para executar, ou todas as contas falharam a sonda de disponibilidade). Construído em `open-sse/services/combo/pinRecovery.ts` a partir das exclusões recolhidas em `targetResolution.ts`.
- Todas as chaves de um fornecedor ignoradas → verifique tanto o estado do circuit breaker como o `rateLimitedUntil`/`testStatus` de cada ligação.
- Fornecedor permanentemente excluído após a janela de reposição → código a ler o `state` em bruto em vez de `getStatus()`/`canExecute()`.
- Uma chave falha, as outras deveriam funcionar → prefira o cooldown de ligação ao circuit breaker.
- Apenas um modelo falha → prefira o bloqueio de modelo ao cooldown de ligação.
- O estado deveria recuperar-se automaticamente mas não o faz → verifique se existe um timestamp no futuro + um caminho de leitura que atualize o estado expirado. Os estados permanentes requerem alterações manuais.

---

## Estado de runtime — referência rápida para o agente

> Movido textualmente de `AGENTS.md` → "Resilience Runtime State" (PR #12743) para que o guia
> do agente se mantenha abaixo do orçamento de contexto de 40k. É a visão condensada, dirigida
> ao agente, das secções acima; as secções numeradas continuam a ser a referência completa.

O OmniRoute tem três mecanismos de falha temporária relacionados mas distintos. Mantenha os seus
âmbitos separados ao depurar o comportamento de encaminhamento. Consulte o
[diagrama de resiliência de 3 camadas](../diagrams/exported/resilience-3layers.svg)
(fonte: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
para um mapa de consulta imediata.

### Circuit Breaker de Fornecedor

**Âmbito**: fornecedor inteiro, p. ex. `glm`, `openai`, `anthropic`.

**Objetivo**: deixar de enviar tráfego para um fornecedor que falha repetidamente ao nível do
upstream/serviço, para que um fornecedor com problemas não abrande todos os pedidos.

**Implementação**:

- Classe principal: `src/shared/utils/circuitBreaker.ts`
- Interligação do gate/execução do chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado em runtime: `src/app/api/monitoring/health/route.ts`
- Wrappers partilhados: `open-sse/services/accountFallback.ts`
- Tabela de estado persistido: `domain_circuit_breakers`

**Estados** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: o tráfego normal é permitido.
- `DEGRADED`: faixa de aviso antecipado — as falhas ultrapassaram o limiar de degradação mas ainda
  não o limiar do breaker; o tráfego continua a fluir e os dashboards mostram o aviso. Um teste de
  ligação válido ou uma janela tranquila sem novas falhas devolve-o a `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` tem a janela).
- `OPEN`: o fornecedor está temporariamente bloqueado; os chamadores recebem uma resposta de
  circuito de fornecedor aberto ou o encaminhamento combo salta para outro alvo.
- `HALF_OPEN`: o timeout de reposição decorreu; permite um pedido de sonda. O sucesso fecha o
  breaker, a falha volta a abri-lo.

**Predefinições** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, consumidas via
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` em `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` em `src/sse/handlers/chatHelpers.ts`). O breaker de fornecedor
inteiro é governado por `circuitBreakerThreshold` / `circuitBreakerReset`:

| Perfil  | degrada em | abre em (`circuitBreakerThreshold`) | reposição (`circuitBreakerReset`) |
| ------- | ---------: | ----------------------------------: | --------------------------------: |
| OAuth   |        `5` |                                 `8` |                             `60s` |
| API key |        `7` |                                `12` |                             `30s` |
| Local   | (derivado) |                                 `2` |                             `15s` |

`PROVIDER_PROFILES` também define `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) e `providerCooldownMs` (5/10/1 min): estes alimentam o
**gate de janela do Provider Cooldown global, opt-in** (`PROVIDER_COOLDOWN_ENABLED`, desativado
por predefinição) — uma entrada ao nível do fornecedor em `open-sse/services/providerCooldownTracker.ts`
só conta como em cooldown após `providerFailureThreshold` falhas dentro de `providerFailureWindowMs`,
e depois arrefece durante `providerCooldownMs`. NÃO são os limiares do breaker em execução — não os
ajuste à espera de comportamento do breaker. Todas as predefinições são substituíveis através das
variáveis de ambiente `OMNIROUTE_PROVIDER_BREAKER_*` e `OMNIROUTE_CIRCUIT_BREAKER_*`; a tabela de
referência precisa para o runtime encontra-se em `docs/architecture/RESILIENCE_GUIDE.md`.

Apenas os códigos de estado de falha ao nível do fornecedor devem disparar o breaker de fornecedor:

```ts
(408, 500, 502, 503, 504);
```

Não dispare o breaker de fornecedor inteiro para erros normais de conta/chave/modelo, como a
maioria dos casos `401`, `403` ou `429`. Estes pertencem normalmente ao cooldown de ligação ou ao
bloqueio de modelo. Um `403` de um fornecedor genérico de chave API deve ser recuperável, a menos
que seja classificado como erro terminal de fornecedor/conta.

O breaker usa recuperação lazy, não um temporizador em segundo plano. Quando `OPEN` expira, leituras como `getStatus()`, `canExecute()` e `getRetryAfterMs()` atualizam o estado para `HALF_OPEN`, para que os dashboards e os construtores de candidatos a combos não continuem a excluir indefinidamente um fornecedor expirado.

### Cooldown de Ligação

**Âmbito**: uma ligação/conta/chave de fornecedor.

**Objetivo**: ignorar temporariamente uma chave/conta problemática, permitindo que outras ligações do mesmo fornecedor continuem a servir pedidos.

**Implementação**:

- Caminho de escrita/atualização: `src/sse/services/auth.ts::markAccountUnavailable()`
- Seleção/filtragem de contas: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo do cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Definições: `src/lib/resilience/settings.ts`

Campos importantes nas ligações de fornecedores:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante a seleção de contas, uma ligação é ignorada enquanto:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Os cooldowns também são lazy: quando `rateLimitedUntil` está no passado, a ligação volta a ficar elegível. Após uma utilização bem-sucedida, `clearAccountError()` limpa `testStatus`, `rateLimitedUntil`, os campos de erro e `backoffLevel`.

Comportamento predefinido do cooldown de ligações:

- Cooldown base para OAuth: `5s`.
- Cooldown base para chaves API: `3s`.
- Um `429` de chave API deve dar preferência a indicações de retry do upstream (`Retry-After`, cabeçalhos de reset ou texto de reset analisável), quando disponíveis.
- Falhas recuperáveis repetidas usam backoff exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

A proteção anti-thundering-herd impede que falhas concorrentes na mesma ligação prolonguem repetidamente o cooldown ou incrementem `backoffLevel` em duplicado.

Os estados terminais não são cooldowns. `banned`, `expired` (que só se torna terminal após N tentativas limitadas através de `EXPIRED_RETRY_MAX`) e `credits_exhausted` destinam-se a permanecer indisponíveis até que as credenciais/definições sejam alteradas ou um operador os reponha. Não substitua estados terminais por estado transitório de cooldown.

### Lockout de Modelo

**Âmbito**: fornecedor + ligação + modelo.

**Objetivo**: evitar desativar uma ligação inteira quando apenas um modelo está indisponível ou limitado por quota nessa ligação.

Exemplos:

- Fornecedores com quota por modelo que devolvem `429`.
- Fornecedores locais que devolvem `404` para um modelo em falta.
- Falhas de permissão de modo/modelo específicas do fornecedor, como modos Grok selecionados.

O lockout de modelo reside em `open-sse/services/accountFallback.ts` e permite que a mesma ligação continue a servir outros modelos.

### Orientações de Depuração

- Se todas as chaves de um fornecedor forem ignoradas, inspecione tanto o estado do breaker do fornecedor como o `rateLimitedUntil`/`testStatus` de cada ligação.
- Se um fornecedor parecer permanentemente excluído após a janela de reset, verifique se o código está a ler o `state` em bruto em vez de usar `getStatus()`/`canExecute()`.
- Se uma chave de fornecedor falhar mas as outras deverem funcionar, prefira o cooldown de ligação em vez do breaker de fornecedor.
- Se apenas um modelo falhar, prefira o lockout de modelo em vez do cooldown de ligação.
- Se um estado se deve autorrecuperar, deve ter um timestamp/timeout de reset futuro e um caminho de leitura que atualize o estado expirado. Os estados permanentes exigem alterações manuais às credenciais ou à configuração.

---

## Fingerprinting TLS e Furtividade

A furtividade específica de cada fornecedor (JA3/JA4, CCH, ofuscação) está documentada separadamente — consulte `docs/security/STEALTH_GUIDE.md` (git; não compilado em `/docs`).

---

## Testes de resiliência (Fase 8 · Bloco C)

Para além dos testes unitários da lógica de resiliência, três testes exercitam o runtime sob
condições reais de stress/falha (todos de integração/noturnos — nenhum bloqueia PRs):

| Teste       | O que faz                                                                                                                                                                    | Execução                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Um nó fake-upstream injeta latência/reset/timeout/503 reais; valida que o circuit breaker abre/recupera e que `checkFallbackError` classifica 503 como fallback recuperável. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams por `createSSEStream` sob `--expose-gc`; falha se o heap crescer além do limite (proteção OOM #3069).                                                           | `npm run test:heap`                      |
| k6 soak     | Carga sustentada contra `/api/monitoring/health`; limites de p95/erros.                                                                                                      | `k6 run tests/load/k6-soak.js` (noturno) |

Orquestrados por `.github/workflows/nightly-resilience.yml` (cron + dispatch). No
`test:integration` predefinido, chaos e heap ignoram-se automaticamente (sem `RUN_CHAOS_INT`/`--expose-gc`).

---

## Consulte também

- [Guia de Arquitetura](./ARCHITECTURE.md) — Arquitetura do sistema e funcionamento interno
- [Guia do Utilizador](../guides/USER_GUIDE.md) — Fornecedores, combos, integração com a CLI
- [Motor Auto-Combo](../routing/AUTO-COMBO.md) — Pontuação de 16 fatores, pacotes de modos
