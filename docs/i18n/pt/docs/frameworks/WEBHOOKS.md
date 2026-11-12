# Webhooks (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Fonte da verdade:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**Última atualização:** 2026-06-28 — v3.8.40

OmniRoute pode disparar webhooks HTTP em eventos de plataforma. Utilize-os para integração com Slack, PagerDuty, Datadog, serviços de alerta interno ou qualquer receptor HTTP.

O transitário assina cada entrega com HMAC-SHA256, tenta novamente em caso de falhas transitórias, acompanha a integridade da entrega por webhook e desativa automaticamente os endpoints que continuam a falhar.

## Eventos Suportados

O tipo `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, consumido pelo `src/lib/webhookDispatcher.ts`) modela actualmente sete eventos:

| Evento                    | Incendeia quando                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `request.completed`       | Uma solicitação com proxy foi concluída com sucesso                                                                       |
| `request.failed`          | Uma solicitação com proxy falha depois de todo retries/fallback                                                           |
| `quota.exceeded`          | Uma chave API ultrapassa um limite budget/quota                                                                           |
| `proxy.set_aside`         | Um membro do proxy pool é anulado após recusas repetidas (apenas transição)                                               |
| `proxy.pool.exhausted`    | Cada membro de um âmbito de pool de proxy é reservado                                                                     |
| `provider.reset_redeemed` | A aplicação automática de redefinições bancárias resgatou um crédito de reposição ou a reposição semanal da sessão Claude |
| `test.ping`               | Evento sintético utilizado pelo endpoint de teste                                                                         |

As subscrições aceitam o `"*"` literal para receber todos os eventos. Os nomes de eventos desconhecidos no `events` são ignorados no momento do despacho.

> Nota: o despachante API está ligado, mas os locais de chamada de produção para alguns dos eventos não `test.ping` ainda estão a chegar. Verifique `grep dispatchEvent` para ver quais os caminhos que invocam atualmente o despachante na sua versão.

## Arquitetura

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

O despacho é do tipo disparar e esquecer para o chamador: `Promise.allSettled` engole erros por webhook para que um receptor defeituoso não possa bloquear os outros.

## Assinatura HMAC

Quando um webhook possui um `secret`, OmniRoute assina o corpo JSON e envia:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Os nomes de cabeçalho utilizam o prefixo `X-Webhook-*` (e não `X-OmniRoute-*`). O valor da assinatura é `sha256=<hex>` — para verificar o prefixo completo.

Se `createWebhook` for chamado sem segredo, o módulo DB irá gerar um (`whsec_<48 hex>`) para que todos os webhooks sejam assinados por defeito.

### Verificando no receptor

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifique sempre em relação ao **cru** corpo do pedido, antes de qualquer análise JSON.

## Política de novas tentativas e falhas

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Tempo limite de 10 segundos por tentativa (`AbortController`).
- HTTP 2xx conta como sucesso.
- HTTP 3xx/4xx conta como um estado final não repetível — registado como entregue com `success = res.ok`.
- HTTP 5xx e os erros de rede são repetidos com espera exponencial: `2^attempt * 1000 ms` (1s, 2s, 4s).
- Após `maxRetries`, a entrega é registada como falhada.
- Cada entrega atualiza `last_triggered_at`, `last_status` e reinicia ou incrementa `failure_count`.
- O despachante chama `disableWebhooksWithHighFailures(10)` após cada distribuição, pelo que qualquer webhook com `failure_count >= 10` é automaticamente desativado.

## Banco de dados

Tabela `webhooks` (migração `011_webhooks.sql`):

| Coluna              | Tipo    | Notas                                                      |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | URL de destino                                             |
| `events`            | TEXT    | Matriz JSON ; `["*"]` padrão                               |
| `secret`            | TEXT    | Segredo HMAC (gerado automaticamente se não for fornecido) |
| `enabled`           | INT     | 0/1; o padrão é 1                                          |
| `description`       | TEXT    | Etiqueta humana opcional                                   |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | Atualizado em cada tentativa de entrega                    |
| `last_status`       | INT     | Estado HTTP da última tentativa (0 rede = )                |
| `failure_count`     | INT     | Reposto a 0 em caso de sucesso, + 1 em caso de falha       |

O histórico de entregas é persistido na tabela `webhook_deliveries` dedicada (migração `069_webhook_deliveries.sql`, gravada via `src/lib/db/webhookDeliveries.ts::insertDelivery` em cada tentativa), para além dos contadores agregados na linha `webhooks`. Os metadados de tipo (Slack / Discord / Telegram /transformadores de carga útil personalizados) foram adicionados por `070_webhooks_kind_metadata.sql`.

## REST API

Todos os endpoints requerem autenticação de gestão (`requireManagementAuth`).

| Ponto final                     | Método | Descrição                                      |
| ------------------------------- | ------ | ---------------------------------------------- |
| `/api/webhooks`                 | GET    | Listar webhooks (segredos mascarados)          |
| `/api/webhooks`                 | POST   | Criar webhook                                  |
| `/api/webhooks/[id]`            | GET    | Detalhe do webhook (segredo completo)          |
| `/api/webhooks/[id]`            | PUT    | Atualizar campos                               |
| `/api/webhooks/[id]`            | DELETE | Remover                                        |
| `/api/webhooks/[id]/test`       | POST   | Disparar um `test.ping` (sem novas tentativas) |
| `/api/webhooks/[id]/deliveries` | GET    | Tentativas recentes de entrega de um webhook   |
| `/api/webhooks/validate-url`    | POST   | Validação URL pré-voo (guarda SSRF )           |

`GET /api/webhooks` mascara o segredo do `<first 10 chars>...` para evitar fugas nas páginas de listagem. Utilize o `[id]` GET quando realmente precisar do segredo.

### Criar webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Se `secret` for omitido, o servidor gera um segredo `whsec_<hex>` e devolve-o na resposta.

### Testar webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Retorna `{ delivered, status, error }`. Nenhuma nova tentativa é feita. — é útil para validar rapidamente se o receptor aceita a carga útil e a assinatura.

## Painel

A página do painel no `/dashboard/webhooks` (consulte `src/app/(dashboard)/dashboard/webhooks/page.tsx`) fornece:

- Webhooks Create/edit com seletor de eventos
- Indicador de estado (ativo/inativo/com erro) baseado em `enabled`, `failure_count` e `last_status`
- Entrega de teste com um clique
- Alternar enable/disable manualmente

## Exemplos de carga útil

### solicitação.concluída

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### teste.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Os formatos de campo para eventos não `test.ping` são definidos pelos locais de chamada que os emitem; tratar o objeto `data` como compatível com versões futuras (adicionar campos, não depender de ausência).

## Melhores Práticas

- **Verifique a assinatura em cada entrega** contra o corpo bruto — evita POSTs falsificado de qualquer pessoa que adivinhe o seu webhook URL.
- **Responder 2xx dentro ~ em 5 segundos** — o despachante atinge o tempo limite em 10 s. Os receptores lentos consumirão novas tentativas e inflacionarão `failure_count`.
- **Tornar os manipuladores idempotentes** Novas tentativas — e semântica de entrega pelo menos uma vez significam que são possíveis duplicados.
- **Assine minimamente** — lista apenas os eventos que realmente consome; `"*"` irá adicionar custos aos receptores que não controla.
- **Assistir `failure_count`** Os endpoints — são automaticamente desativados em 10 falhas consecutivas; reponha chamando `PUT /api/webhooks/[id]` com `enabled: true` após reparar o recetor.
- **Alterne segredos periodicamente** — `PUT` um novo `secret`, implemente o novo valor no recetor e confirme através do endpoint de teste.

## Veja também

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — gestão completa da superfície API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) Semântica do disjuntor/arrefecimento — por trás das falhas do fornecedor que surgiram via `request.failed`
- Fonte: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
