# OmniRoute A2A Server Documentation (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute como agente de encaminhamento inteligente

A interface A2A tem duas vertentes:

- **JSON-RPC 2.0** em `POST /a2a` (ponto de entrada canónico, definido em `src/app/a2a/route.ts`).
- **REST** em `/api/a2a/*` para painéis e ferramentas (estado, lista de tarefas, cancelamento).

As tarefas são monitorizadas por `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL predefinido de 5 minutos). As competências são encaminhadas através de `A2A_SKILL_HANDLERS` em `src/lib/a2a/taskExecution.ts`.

## Descoberta do agente

```bash
curl http://localhost:20128/.well-known/agent.json
```

Devolve o Cartão do Agente que descreve as capacidades, competências e requisitos de autenticação do OmniRoute.

O campo `version` do Cartão do Agente é obtido a partir de `process.env.npm_package_version` (consulte `src/app/.well-known/agent.json/route.ts:13`), pelo que permanece automaticamente sincronizado com o `package.json` em cada versão.

---

## Autenticação

Todos os pedidos a `/a2a` requerem uma chave de API através do cabeçalho `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Se não estiver configurada qualquer chave de API no servidor, a autenticação é ignorada.

## Ativação

O A2A é controlado pela opção **Endpoints → A2A** e está desativado por predefinição. Quando está desativado,
`GET /api/a2a/status` comunica `status: "disabled"` e `online: false`; as chamadas JSON-RPC para
`POST /a2a` devolvem HTTP 503 com o código de erro JSON-RPC `-32000`.

---

## Métodos JSON-RPC 2.0

### `message/send` — Execução síncrona

Envia uma mensagem para uma competência e aguarda pela resposta completa.

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
`metadata.model` para o pedido ao gateway; é enviado como o `model` real,
e não como um campo JSON `x-combo` ignorado. A autenticação normal por chave de API
e a autorização por destino do gateway continuam a aplicar-se. Um combo inválido ou vazio é rejeitado.

O resultado apresenta `requested_combo` (intenção do autor da chamada), `dispatched_model`
(o pedido efetivamente enviado ao gateway), `response_model` (resposta do gateway) e
`confirmed_combo`. O último campo é `null`, a menos que o gateway identifique explicitamente
um combo. Os registos de decisões A2A atribuem a execução apenas a um
combo confirmado, mantendo um pedido não confirmado como `requestedCombo`.

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

### `message/stream` — Transmissão por SSE

Igual a `message/send`, mas devolve Server-Sent Events para transmissão em tempo real.

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

### `tasks/get` — Consultar o estado da tarefa

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

## Competências disponíveis

OmniRoute expõe 6 competências A2A ligadas ao `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Cada módulo de habilidade reside no `src/lib/a2a/skills/`.

| Competência              | ID                   | Descrição                                                                                                                                                                                 | Etiquetas                          | Exemplos                                            |
| :----------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- | :-------------------------------------------------- |
| Roteamento Inteligente   | `smart-routing`      | Encaminha um prompt através do provider/combo ideal utilizando o mecanismo combinado de pontuação + do OmniRoute                                                                          | encaminhamento, provedores         | "Roteie este prompt através do melhor modelo"       |
| Gestão de cotas          | `quota-management`   | Informa o estado da quota por fornecedor e ajuda os chamadores a decidir quando fazer throttle/switch                                                                                     | quota, fornecedores                | “Verificar cota para antrópicos”                    |
| Descoberta de fornecedor | `provider-discovery` | Lista os fornecedores instalados com recursos, sinalizadores de nível gratuito, estado OAuth                                                                                              | fornecedores, descoberta           | "Quais os fornecedores disponíveis?"                |
| Análise de custos        | `cost-analysis`      | Estima o custo de um request/conversation de acordo com a utilização recente do catálogo +                                                                                                | custo, utilização                  | "Estimar o custo desta conversa"                    |
| Relatório de saúde       | `health-report`      | Agrega disjuntor, arrefecimento e estado de bloqueio por fornecedor                                                                                                                       | saúde, resiliência                 | "Mostrar o estado de saúde de todos os prestadores" |
| Listar recursos          | `list-capabilities`  | Retorna o catálogo completo de competências do agente com 45 entradas (configuração 23 API + 21 CLI + 1) como uma tabela de descontos com SKILL.md URLs em bruto para injeção de contexto | catálogo, descoberta, competências | "Listar todos os recursos OmniRoute "               |

> O Cartão de Agente deve ser mantido alinhado com o catálogo ativo de 386 prestadores; as contagens de fornecedores e os metadados free/no-auth são provenientes do registo de tempo de execução.

### Detalhe da habilidade `list-capabilities`

A habilidade `list-capabilities` é particularmente útil para agentes externos que precisam de descobrir o que OmniRoute expõe antes de enviar chamadas API. Devolve um artefacto estruturado de tabela de descontos:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Cada linha inclui a coluna `rawUrl` para que os agentes possam procurar imediatamente o SKILL.md completo. O campo `metadata.totalSkills` reflete o tamanho do catálogo (45 hoje). Implementação: `src/lib/a2a/skills/listCapabilities.ts`. Ver também [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (auxiliar)

O endpoint JSON-RPC `/a2a` é o ponto de entrada canónico A2A. Os endpoints REST abaixo fornecem acesso auxiliar para painéis e ferramentas externas:

| Ponto final                  | Método | Descrição                                                          | Autenticação                                                                                                    |
| :--------------------------- | :----- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET    | Estado do servidor, habilidades registadas                         | (público)                                                                                                       |
| `/api/a2a/tasks`             | GET    | Listar tarefas com filtros                                         | gestão ou chave API (ver abaixo)                                                                                |
| `/api/a2a/tasks/[id]`        | GET    | Obter tarefa por ID                                                | gestão ou chave API (ver abaixo)                                                                                |
| `/api/a2a/tasks/[id]/cancel` | POST   | Cancelar tarefa em execução                                        | gestão ou chave API (ver abaixo)                                                                                |
| `/.well-known/agent.json`    | GET    | Cartão de agente (descoberta A2A )                                 | (público, 3600 em cache)                                                                                        |
| `/api/a2a/tasks`             | POST   | Delegação de entrada para a frota OmniConductor (Condutor PRD RF5) | igual a `GET`, mais `OMNIROUTE_API_KEY` se definido enquanto `REQUIRE_API_KEY` estiver desativado; `a2aEnabled` |

Quem acede às rotas `/api/a2a/tasks*` depende das definições de login e chave API:

- `requireLogin=true` (padrão): o middleware apenas admite credenciais de gestão (sessão de painel, chave `manage` -scope API, token de acesso `oma_` ) e `OMNIROUTE_API_KEY`. Uma chave de inferência simples obtém `403`. No cabeçalho `Authorization` o middleware apenas aceita `OMNIROUTE_API_KEY` como `Bearer <key>`; uma chave simples ou uma guia após `Bearer` obter `401`.
- `requireLogin=false`, ou a janela de loopback antes da integração: com `REQUIRE_API_KEY=true` qualquer chave OmniRoute API válida ou credencial de gestão é aceite e os chamadores anónimos recebem `401`; com `REQUIRE_API_KEY` desligado as rotas estão abertas.
- `POST /api/a2a/tasks` requer adicionalmente `OMNIROUTE_API_KEY` no cabeçalho `Authorization` quando esta variável está definida e `REQUIRE_API_KEY` está desativado. Outros cabeçalhos, como `x-api-key`, não contam aqui. Com o login desativado ou antes da integração, a chave passa com ou sem prefixo `Bearer` ; com o login activado, apenas `Bearer <key>` passa pelo middleware.

Quando é necessária uma credencial, um token `read` -scope `oma_` funciona apenas para `GET`.

**Delegação do Condutor de Entrada (`POST /api/a2a/tasks`):** os agentes A2A externos delegam o trabalho de codificação à frota OmniConductor através OmniRoute. Corpo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — apenas as habilidades da frota do Condutor (as anunciadas no Cartão de Agente) são delegáveis; `metadata.conductor.repo.url` é necessário (a frota funciona em repositórios git). A rota é traduzida para o `POST /v1/tasks` do hub utilizando o `CONDUCTOR_ORCHESTRATOR_TOKEN` do lado do servidor (fallback `CONDUCTOR_HUB_TOKEN`) e retorna `201 { conductor_task_id, state: "submitted" }`; os estados da tarefa fluem de volta através do espelho SSE→A2A (RF1) e são visíveis através de `GET /api/a2a/tasks?skill=conductor`.

---

## Adicionando uma nova habilidade

1. **Criar ficheiro de habilidade:** `src/lib/a2a/skills/<your-skill>.ts`

   Exporte uma função assíncrona `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>`. Siga o formato das habilidades existentes, como `smartRouting.ts`. Se a habilidade voltar a OmniRoute através de HTTP, crie os cabeçalhos com `buildSelfLoopHeaders(caller)` de `src/lib/a2a/selfLoopAuth.ts` para que a chamada seja executada com a chave do chamador A2A, e não `OMNIROUTE_API_KEY`, e passe `redirect: "error"` para `fetch` para que um redireccionamento nunca obtenha a chave. O auxiliar apenas cria cabeçalhos; cada competência define a própria política de redireccionamento. Lança `UnsafeSelfLoopTargetError` em vez de anexar uma chave quando o URL base resolvido é http simples fora da rede privada (loopback, um contentor ou nome de serviço e endereços privados são adequados) ou contém credenciais, pelo que uma habilidade que engole chamadas rejeitadas deve relançar este erro.

2. **Manipulador de registo:** em `src/lib/a2a/taskExecution.ts`, adicione uma entrada a `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **Expor no Cartão de Agente:** em `src/lib/a2a/agentCardMetadata.ts` (partilhado por `/.well-known/agent.json` e `/.well-known/agent-card.json`), anexar ao array `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Escrever testes:** `tests/unit/a2a-<your-skill>.test.ts`. Cubra o caminho do erro + do caminho feliz.

5. **Documento** a nova habilidade na tabela `Available Skills` deste ficheiro.

---

## TTL das tarefas

As tarefas expiram após `ttlMinutes` (predefinição: 5 min) — configurado no construtor `A2ATaskManager` em `src/lib/a2a/taskManager.ts:82`. Para personalizar, faça um fork da instanciação de `A2ATaskManager` e indique um valor diferente (por exemplo, `new A2ATaskManager(15)` para um TTL de 15 minutos). Um intervalo em segundo plano elimina as tarefas expiradas a cada 60 segundos.

---

## Ciclo de vida das tarefas

```
submetida → em curso → concluída
                     → falhou
                     → cancelada
```

- Por predefinição, as tarefas expiram após 5 minutos (consulte [TTL das tarefas](#task-ttl))
- Estados terminais: `completed`, `failed`, `cancelled`
- O registo de eventos acompanha todas as transições de estado

---

## Códigos de erro

| Código | Significado                          |
| :----- | :----------------------------------- |
| -32700 | Erro de análise (JSON inválido)      |
| -32600 | Pedido inválido / Não autorizado     |
| -32601 | Método ou competência não encontrado |
| -32602 | Parâmetros inválidos                 |
| -32603 | Erro interno                         |
| -32000 | O endpoint A2A está desativado       |

---

## Exemplos de integração

### Python (pedidos)

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

### TypeScript (procurar)

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
