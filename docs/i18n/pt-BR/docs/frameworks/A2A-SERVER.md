# OmniRoute A2A Server Documentation (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Protocolo Agent-to-Agent v0.3 — OmniRoute como um agente de roteamento inteligente

A superfície A2A tem duas interfaces:

- **JSON-RPC 2.0** em `POST /a2a` (ponto de entrada canônico, definido em `src/app/a2a/route.ts`).
- **REST** em `/api/a2a/*` para painéis e ferramentas (status, lista de tarefas, cancelamento).

As tarefas são rastreadas pelo `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL padrão de 5 minutos). As habilidades são despachadas por meio de `A2A_SKILL_HANDLERS` em `src/lib/a2a/taskExecution.ts`.

## Descoberta do agente

```bash
curl http://localhost:20128/.well-known/agent.json
```

Retorna o Agent Card que descreve os recursos, as habilidades e os requisitos de autenticação do OmniRoute.

O campo `version` do Agent Card é obtido de `process.env.npm_package_version` (consulte `src/app/.well-known/agent.json/route.ts:13`), portanto, ele permanece sincronizado automaticamente com o `package.json` a cada versão lançada.

---

## Autenticação

Todas as solicitações para `/a2a` exigem uma chave de API por meio do cabeçalho `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Se nenhuma chave de API estiver configurada no servidor, a autenticação será ignorada.

## Habilitação

O A2A é controlado pela opção **Endpoints → A2A** e fica desabilitado por padrão. Quando desabilitado,
`GET /api/a2a/status` informa `status: "disabled"` e `online: false`; as chamadas JSON-RPC para
`POST /a2a` retornam HTTP 503 com o código de erro JSON-RPC `-32000`.

---

## Métodos JSON-RPC 2.0

### `message/send` — Execução síncrona

Envia uma mensagem para uma skill e aguarda a resposta completa.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

Para `smart-routing`, `metadata.combo` é uma substituição explícita de
`metadata.model` para a solicitação ao gateway; ele é enviado como o `model` real,
e não como um campo JSON `x-combo` ignorado. A autorização normal por chave de API e
por destino do gateway continua sendo aplicada. Um combo inválido ou vazio é rejeitado.

O resultado expõe `requested_combo` (intenção do chamador), `dispatched_model`
(a solicitação real ao gateway), `response_model` (resposta do gateway) e
`confirmed_combo`. O último campo é `null`, a menos que o gateway identifique
explicitamente um combo. Os logs de decisão A2A atribuem a execução apenas a um
combo confirmado, mantendo uma solicitação não confirmada como `requestedCombo`.

**Resposta:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — Streaming via SSE

Igual a `message/send`, mas retorna Server-Sent Events para streaming em tempo real.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**Eventos SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Consultar o status da tarefa

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Cancelar uma tarefa

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Habilidades disponíveis

OmniRoute expõe 6 habilidades A2A conectadas ao `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Cada módulo de habilidade reside no `src/lib/a2a/skills/`.

| Habilidade             | ID                   | Descrição                                                                                                                                                                             | Etiquetas                         | Exemplos                                           |
| :--------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------- | :------------------------------------------------- |
| Roteamento Inteligente | `smart-routing`      | Roteia um prompt através do provider/combo ideal usando o mecanismo combinado de pontuação + do OmniRoute                                                                             | roteamento, provedores            | "Roteie este prompt através do melhor modelo"      |
| Gerenciamento de cotas | `quota-management`   | Informa o estado da cota por provedor e ajuda os chamadores a decidir quando fazer throttle/switch                                                                                    | cota, provedores                  | “Verificar cota para antrópicos”                   |
| Descoberta de provedor | `provider-discovery` | Lista provedores instalados com recursos, sinalizadores de nível gratuito, status OAuth                                                                                               | provedores, descoberta            | "Quais provedores estão disponíveis?"              |
| Análise de custos      | `cost-analysis`      | Estima o custo de um request/conversation de acordo com o uso recente do catálogo +                                                                                                   | custo, uso                        | "Estimar o custo desta conversa"                   |
| Relatório de Saúde     | `health-report`      | Agrega disjuntor, resfriamento e estado de bloqueio por provedor                                                                                                                      | saúde, resiliência                | "Mostrar o estado de saúde de todos os provedores" |
| Listar recursos        | `list-capabilities`  | Retorna o catálogo completo de habilidades do agente com 45 entradas (configuração 23 API + 21 CLI + 1) como uma tabela de descontos com SKILL.md URLs bruto para injeção de contexto | catálogo, descoberta, habilidades | "Listar todos os recursos OmniRoute "              |

> O Cartão de Agente deve ser mantido alinhado com o catálogo ativo de 387 provedores; contagens de provedores e metadados free/no-auth são provenientes do registro de tempo de execução.

### Detalhe da habilidade `list-capabilities`

A habilidade `list-capabilities` é particularmente útil para agentes externos que precisam descobrir o que OmniRoute expõe antes de enviar chamadas API. Ele retorna um artefato estruturado de tabela de descontos:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Cada linha inclui a coluna `rawUrl` para que os agentes possam buscar imediatamente o SKILL.md completo. O campo `metadata.totalSkills` reflete o tamanho do catálogo (45 hoje). Implementação: `src/lib/a2a/skills/listCapabilities.ts`. Veja também [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (auxiliar)

O endpoint JSON-RPC `/a2a` é o ponto de entrada canônico A2A. Os endpoints REST abaixo fornecem acesso auxiliar para painéis e ferramentas externas:

| Ponto final                  | Método | Descrição                                                          | Autenticação                                                                                                    |
| :--------------------------- | :----- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Status do servidor, habilidades registradas                        | (público)                                                                                                       |
| `/api/a2a/tasks`             | GET    | Listar tarefas com filtros                                         | gerenciamento ou chave API (veja abaixo)                                                                        |
| `/api/a2a/tasks/[id]`        | GET    | Obter tarefa por ID                                                | gerenciamento ou chave API (veja abaixo)                                                                        |
| `/api/a2a/tasks/[id]/cancel` | POST   | Cancelar tarefa em execução                                        | gerenciamento ou chave API (veja abaixo)                                                                        |
| `/.well-known/agent.json`    | GET    | Cartão de agente (descoberta A2A )                                 | (público, 3600 em cache)                                                                                        |
| `/api/a2a/tasks`             | POST   | Delegação de entrada para a frota OmniConductor (Condutor PRD RF5) | igual a `GET`, mais `OMNIROUTE_API_KEY` se definido enquanto `REQUIRE_API_KEY` estiver desativado; `a2aEnabled` |

Quem acessa as rotas `/api/a2a/tasks*` depende das configurações de login e chave de API:

- `requireLogin=true` (padrão): o middleware admite apenas credenciais de gerenciamento (sessão de painel, chave `manage` -scope API, token de acesso `oma_` ) e `OMNIROUTE_API_KEY`. Uma chave de inferência simples obtém `403`. No cabeçalho `Authorization` o middleware só aceita `OMNIROUTE_API_KEY` como `Bearer <key>`; uma chave simples ou uma guia após `Bearer` obter `401`.
- `requireLogin=false`, ou a janela de loopback antes da integração: com `REQUIRE_API_KEY=true` qualquer chave OmniRoute API válida ou credencial de gerenciamento é aceita e chamadores anônimos recebem `401`; com `REQUIRE_API_KEY` desligado as rotas estão abertas.
- `POST /api/a2a/tasks` adicionalmente requer `OMNIROUTE_API_KEY` no cabeçalho `Authorization` quando essa variável está definida e `REQUIRE_API_KEY` está desativado. Outros cabeçalhos, como `x-api-key`, não contam aqui. Com o login desativado ou antes da integração, a chave passa com ou sem prefixo `Bearer` ; com o login ativado, apenas `Bearer <key>` passa pelo middleware.

Onde uma credencial é necessária, um token `read` -scope `oma_` funciona apenas para `GET`.

**Delegação do Condutor de Entrada (`POST /api/a2a/tasks`):** agentes A2A externos delegam o trabalho de codificação para a frota OmniConductor por meio OmniRoute. Corpo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — apenas as habilidades da frota do Condutor (aquelas anunciadas no Cartão de Agente) são delegáveis; `metadata.conductor.repo.url` é necessário (a frota funciona em repositórios git). A rota é traduzida para o `POST /v1/tasks` do hub usando o `CONDUCTOR_ORCHESTRATOR_TOKEN` do lado do servidor (fallback `CONDUCTOR_HUB_TOKEN`) e retorna `201 { conductor_task_id, state: "submitted" }`; os estados da tarefa fluem de volta através do espelho SSE→A2A (RF1) e são visíveis via `GET /api/a2a/tasks?skill=conductor`.

---

## Adicionando uma nova habilidade

1. **Criar arquivo de habilidade:** `src/lib/a2a/skills/<your-skill>.ts`

   Exporte uma função assíncrona `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Siga o formato das habilidades existentes, como `smartRouting.ts`. Se a habilidade retornar para OmniRoute por meio de HTTP, crie os cabeçalhos com `buildSelfLoopHeaders(caller)` de `src/lib/a2a/selfLoopAuth.ts` para que a chamada seja executada com a chave do chamador A2A, não `OMNIROUTE_API_KEY`, e passe `redirect: "error"` para `fetch` para que um redirecionamento nunca obtenha a chave. O auxiliar apenas cria cabeçalhos; cada habilidade define a própria política de redirecionamento. Ele lança `UnsafeSelfLoopTargetError` em vez de anexar uma chave quando o URL base resolvido é http simples fora da rede privada (loopback, um contêiner ou nome de serviço e endereços privados são adequados) ou contém credenciais, portanto, uma habilidade que engole chamadas rejeitadas deve relançar esse erro.

2. **Manipulador de registro:** em `src/lib/a2a/taskExecution.ts`, adicione uma entrada a `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Expor no Cartão de Agente:** em `src/lib/a2a/agentCardMetadata.ts` (compartilhado por `/.well-known/agent.json` e `/.well-known/agent-card.json`), anexe ao array `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Escreva testes:** `tests/unit/a2a-<your-skill>.test.ts`. Cubra o caminho do erro + do caminho feliz.

5. **Documento** a nova habilidade na tabela `Available Skills` deste arquivo.

---

## TTL da tarefa

As tarefas expiram após `ttlMinutes` (5 min por padrão) — configurado no construtor `A2ATaskManager` em `src/lib/a2a/taskManager.ts:82`. Para personalizar, faça um fork da instanciação de `A2ATaskManager` e passe um valor diferente (por exemplo, `new A2ATaskManager(15)` para um TTL de 15 minutos). Um intervalo em segundo plano remove as tarefas expiradas a cada 60 segundos.

---

## Ciclo de vida da tarefa

```
submitted → working → completed
                    → failed
                    → cancelled
```

- As tarefas expiram após 5 minutos por padrão (consulte [TTL da tarefa](#task-ttl))
- Estados terminais: `completed`, `failed`, `cancelled`
- O log de eventos registra cada transição de estado

---

## Códigos de erro

| Código | Significado                           |
| :----- | :------------------------------------ |
| -32700 | Erro de análise (JSON inválido)       |
| -32600 | Solicitação inválida / Não autorizado |
| -32601 | Método ou skill não encontrado        |
| -32602 | Parâmetros inválidos                  |
| -32603 | Erro interno                          |
| -32000 | O endpoint A2A está desabilitado      |

---

## Exemplos de integração

### Python (solicitações)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (buscar)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
