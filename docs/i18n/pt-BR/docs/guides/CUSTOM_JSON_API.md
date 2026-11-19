# Custom JSON API provider nodes (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Um nó JSON API customizado conecta um terminal de negócios JSON que não fala o protocolo OpenAI ou Anthropic. OmniRoute preenche um modelo de solicitação JSON, envia-o para o endpoint completo URL, lê a resposta de um caminho de resposta e a retorna ao cliente no próprio formato do cliente (conclusões de bate-papo, respostas, mensagens, ...).

É um nó compatível com OpenAI com `apiType: "custom-json"`; seu id tem o formato `openai-compatible-custom-json-<suffix>`. O formulário do painel ainda não está disponível. Crie e edite esses nós por meio do nó do provedor API abaixo.

## Crie um nó

`POST /api/provider-nodes` (autenticação de gerenciamento):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` é o** completo** ponto final URL. Nada é anexado (sem `/chat/completions`, sem `/models`) e, ao contrário de outros nós compatíveis com OpenAI, não há URL padrão. Deve ser `http(s)`, sem credenciais incorporadas ou `#fragment`, e passa pelo mesmo URL guard de saída que cada nó do provedor, tanto quando o nó é salvo quanto em cada solicitação.
- Um nó que envia a chave de conexão (`authType` `bearer` ou `api-key`, incluindo o padrão) deve usar `https://`. `http://` simples é aceito apenas para um host de loopback (`localhost`, `127.0.0.0/8`, `::1`) ou com `authType: "none"`, que não envia nenhuma chave. Endereços LAN privados (`10.x`, `172.16-31.x`, `192.168.x`) não estão isentos: qualquer pessoa nessa rede pode ler a chave. Salvar tal nó falha com `400`, e um nó armazenado anteriormente falha ao ser fechado em todas as solicitações com a mesma mensagem, antes que qualquer solicitação seja enviada. Para um endpoint com chave em um LAN, coloque-o atrás de TLS (por exemplo, um proxy reverso).
- `customJson` é validado com Zod; chaves desconhecidas são rejeitadas. Cada campo é opcional:

| Campo             | Valores                                    | Padrão                                                 |
| ----------------- | ------------------------------------------ | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                     | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                | `bearer`                                               |
| `authHeader`      | nome do cabeçalho usado quando `api-key`   | `X-API-Key`                                            |
| `requestTemplate` | objeto JSON (≤ 64 KB, profundidade ≤ 32)   | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | caminho do campo, ou `$` para todo o corpo | `choices[0].message.content`                           |

- O segredo fica na chave API da conexão, nunca no template. `bearer` envia `Authorization: Bearer <key>`; `api-key` envia `<authHeader>: <key>`. O cabeçalho de autenticação não pode ser `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` ou um cabeçalho hop-by-hop. Com `none`, as conexões não precisam de chave.
- Cabeçalhos estáticos extras usam o `customHeaders` regular do nó (mesma validação de qualquer outro nó compatível; cabeçalhos de autenticação não são permitidos lá).

`PUT /api/provider-nodes/<id>` aceita o mesmo `customJson` e reescreve `baseUrl` e a configuração em cada conexão existente do nó. A omissão de `customJson` mantém a configuração armazenada; mudar `apiType` para `chat` ou `responses` remove-o do nó e de suas conexões.

Em seguida, adicione uma conexão ao nó normalmente (`POST /api/providers` com o ID do nó) e solicite `<prefix>/<model>`, por exemplo `biz/assistant-v1`. O endpoint não expõe nenhuma lista de modelos, então adicione os IDs dos modelos manualmente.

## Solicitar modelos

Os modelos são simples JSON. Um valor de string pode conter marcadores `{{placeholder}}` ; nada é avaliado ou executado e as chaves dos objetos nunca são substituídas.

| Espaço reservado     | Valor                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `{{prompt}}`         | Texto da última mensagem do usuário (partes de texto unidas por novas linhas) |
| `{{messages}}`       | A conversa no formato OpenAI chat                                             |
| `{{model}}`          | O ID do modelo solicitado, sem o prefixo do provedor                          |
| `{{stream}}`         | Sempre `false` — o endpoint responde com um documento JSON                    |
| `{{request.<path>}}` | Um campo da solicitação traduzida (formato OpenAI chat)                       |

- Um valor que é exatamente um espaço reservado mantém seu tipo JSON (`"{{messages}}"` se torna um array); um espaço reservado dentro de uma string mais longa é inserido como texto.
- Um espaço reservado que não resolve nada falha na solicitação com HTTP 400 em vez de enviar uma carga útil incompleta.
- Os caminhos usam notação de ponto e índices numéricos (`data.items[0].text`). `__proto__`, `prototype` e `constructor` são rejeitados em chaves e caminhos.

## Respostas

O valor em `responsePath` se torna a resposta do assistente: as strings passam, outros valores JSON são serializados. Um campo ausente ou `null`, ou um corpo que não seja JSON, retorna HTTP 502. Os status de erro upstream são transmitidos. Para clientes de streaming OmniRoute espera por toda a resposta JSON e então a emite como um pedaço de conteúdo mais o pedaço final; isso não é streaming de token. As chamadas de ferramenta e os campos de uso não são mapeados.

## Nunca reproduzido

Uma solicitação comercial pode ter efeitos colaterais mesmo quando falha. OmniRoute portanto, envia uma vez:

- nenhuma nova tentativa de transporte e nenhum redirecionamento seguinte;
- nenhuma nova tentativa em outra conexão (fallback de conta) — a falha é retornada como está e a conexão não é resfriada;
- nenhum substituto para o próximo alvo de combinação, mesmo para uma resposta vazia ou com falha.

Solicitações de clientes separadas e painéis de fusão que chamam explicitamente vários modelos ainda invocam o endpoint de forma independente.

## Testando um nó

Salvando uma conexão, a conexão** Teste** O botão e as verificações de integridade em segundo plano nunca chamam o endpoint: eles apenas validam a configuração armazenada e relatam a conexão como não verificável.

`POST /api/provider-nodes/validate` com `"apiType": "custom-json"` e os campos do nó (`baseUrl`, `apiKey`, `customJson`, opcional `customHeaders` e `modelId`) envia exatamente uma solicitação real, com `ping` como o texto do usuário mais recente. Ele responde `{ "valid": true }` ou ao status upstream (nunca ao corpo upstream).

## Armazenar

A configuração é armazenada em `provider_nodes.custom_json_config_json` (migração `240_provider_node_custom_json_config.sql`) e copiada em cada conexão `providerSpecificData.customJson`.

Implementação: `open-sse/utils/customJson.ts` (validação e modelagem), `open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` e `src/sse/handlers/chat/responsePolicies.ts` (sem repetição).
