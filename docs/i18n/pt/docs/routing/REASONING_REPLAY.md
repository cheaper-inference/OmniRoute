# REASONING_REPLAY (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Fonte da verdade:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Última atualização:** 28/06/2026 — v3.8.40

OmniRoute captura o assistente `reasoning_content` produzido pelos modelos de modo de pensamento e reproduz-no de forma transparente em pedidos multi-volta quando o fornecedor upstream o exige. Isto elimina os erros HTTP 400 que os fornecedores estritos levantam quando o histórico de conversação de um cliente não contém o raciocínio do turno anterior.

## Por que razão existe

Vários fornecedores de modo de pensamento rejeitam uma mudança de seguimento, a menos que o** a mensagem anterior do assistente inclui o `reasoning_content` original** . O upstream retorna 400 com mensagens como:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Mas os clientes típicos (Cursor, Cline, Roo Code, OpenAI SDK) retiram `reasoning_content` do histórico que reproduzem. OmniRoute restaura-o a partir de uma cache do lado do servidor para que o pedido que o upstream vê seja consistente. O problema nº #1628 introduziu a persistência memory/SQLite híbrida para que a cache sobreviva às reinicializações do processo.

## Arquitetura

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

A captura acontece em `open-sse/handlers/chatCore.ts` (dois sites, nos dois sites de chamada `cacheReasoningFromAssistantMessage` ). A repetição acontece no `open-sse/translator/index.ts` após a coerção do esquema, mas antes do envio.

Os turnos de assistente simples (sem chamada de ferramenta) são codificados de forma diferente: `buildAssistantMessageCacheKey()` resume o âmbito da sessão mais a transcrição normalizada do formato OpenAI até esse turno, porque DeepSeek requer o raciocínio de _todos_ os turnos anteriores, uma vez que `tools` está presente. Para alvos da API de respostas (por exemplo `opencode-go/deepseek-v4-flash`, encaminhado para `/responses`) o corpo a montante transporta `input`, e não `messages`, pelo que `translateRequest()` (`open-sse/translator/index.ts`) reporta a transcrição dinâmica digerida através de uma opção de callback e os sites de captura digerem essa mesma transcrição. A passagem de reprodução de respostas é executada no pivot OpenAI para cada formato de origem, pelo que os clientes de mensagens Anthropic (Claude → OpenAI → Responses) também são reproduzidos.

## Armazenamento — Memória Híbrida + SQLite

O hot path utiliza um `Map` em memória (LRU por criação) suportado por uma tabela SQLite para recuperação de falhas e visibilidade do painel.

| Camada  | Implementação                                  | Finalidade                                       |
| ------- | ---------------------------------------------- | ------------------------------------------------ |
| Memória | `Map` em `open-sse/services/reasoningCache.ts` | Pesquisas rápidas, despeja o mais velho aos 200  |
| DB      | tabela `reasoning_cache` (`src/lib/db/`)       | Persiste nas reinicializações, gera estatísticas |

As gravações vão para ambos. As leituras consultam primeiro a memória e depois voltam para DB (os acessos DB são promovidos de volta para a memória). As falhas DB não são fatais. — o cache na memória continua a servir o caminho activo.

**Padrões:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Entradas máximas de memória: `200` (`MAX_MEMORY_ENTRIES`)
- Despejo: `createdAt` mais antigo primeiro

## Esquema de base de dados

Migração: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Índices: `expires_at`, `provider`, `model`, `created_at`. `expires_at` é armazenado como segundos da época Unix; a camada SELECT normaliza os valores de texto legados através do `EXPIRES_AT_EPOCH_SQL`.

## Detecção de fornecedor/modelo

A reprodução é ativada quando `requiresReasoningReplay(provider, model)` retorna `true`. A função verifica duas listas em `open-sse/services/reasoningCache.ts`.

**Fornecedor IDs (correspondência exata, sem distinção entre maiúsculas e minúsculas):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Padrões de regex do modelo (sem distinção entre maiúsculas e minúsculas):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` e `/deepseek[-/]?v4[-.]pro/i` (V4 Flash/Pro, sufixo `-free` opcional)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Adicionar um novo provider/model estrito significa anexar a uma destas listas e escrever um teste de unidade afirmando a injeção de repetição. A descrição PR deve citar a string upstream 400 exata que motivou a mudança.

## REST API

A cache expõe dois endpoints em `src/app/api/cache/reasoning/route.ts`. Ambos requerem autenticação de gestão (`isAuthenticated` de `@/shared/utils/apiAuth`).

| Método | Ponto final                                               | Descrição                                                 |
| ------ | --------------------------------------------------------- | --------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Estatísticas de entradas paginadas +                      |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listagem filtrada (`limit` fixada em `[1, 200]`)          |
| DELETE | `/api/cache/reasoning`                                    | Limpe tudo (memória + DB) e reponha as contagens hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Limpar apenas as entradas de um fornecedor                |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Apagar uma única entrada                                  |

**formato de resposta GET :**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Notas Operacionais

- **Limpar:** `cleanupReasoningCache()` limpa as entradas de memória expiradas e executa `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Os profissionais de saúde ligam para isso periodicamente.
- **Recuperação de avarias:** Após o reinício, a memória fica vazia, mas o DB ainda contém entradas não expiradas. A primeira pesquisa para um determinado `tool_call_id` é um hit DB ; pesquisas subsequentes são ocorrências de memória.
- **Sem raciocínio, sem cache:** `cacheReasoningFromAssistantMessage` devolve `0` quando a mensagem do assistente não tem campo `reasoning_content` / `reasoning`, pelo que as respostas sem pensamento não custam nada.
- **A gravação também está bloqueada:** ambos os sites de chamada em `chatCore.ts` (sem streaming e streaming) apenas chamam `cacheReasoningFromAssistantMessage()` quando `requiresReasoningReplay(provider, model)` é `true` — o mesmo predicado que o lado de leitura verifica. As instalações que nunca tocam num fornecedor de reprodução deixam de pagar pela gravação, pela actualização do índice e pelo try/catch em cada resposta com raciocínio.
- **Prestadores não estritos:** Quando `requiresReasoningReplay` é `false` e o formato de destino é OpenAI, o tradutor** tiras** qualquer campo `reasoning_content` de mensagens de saída — OpenAI Chat Completions não o aceita.

## Propriedade do raciocínio opaco da Muse

Muse (`muse-code`) devolve raciocínio opaco ligado ao chamador (`encrypted_content`). A reprodução numa conta diferente ou credencial recordada falha no upstream, pelo que os pedidos OAuth nativos utilizam a propriedade ao nível da sessão em vez da rotação por pedido (`src/sse/services/museSessionOwnership.ts`, aplicada em `src/sse/handlers/chat.ts`). As ligações de chave API explicitamente selecionadas e as definições apenas de chave API mantêm o seu encaminhamento existente sem este modo de propriedade.

- Forneça uma sessão estável ID em cada turno: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ou `x-codex-session-id`; em alternativa, utilize `prompt_cache_key`, `session_id`, `conversation_id` ou `metadata.session_id` no corpo (por esta ordem de precedência). IDs em falta ou em branco retorna 400 quando duas ou mais contas OAuth nativas estão ativas; com uma única conta OAuth não há nada para onde rodar, pelo que tal pedido mantém o encaminhamento desafixado. O âmbito inclui a chave API OmniRoute ID do chamador.
- Novas sessões independentes round-robin em contas OAuth nativas ativas permitidas pela política de ligação de chaves API, ordenadas por ligação ID. O round-robin ignora as contas no arrefecimento da ligação, com o estado de terminal (`banned`, `expired`, `credits_exhausted`) ou bloqueado por modelo para o modelo solicitado; As falhas upstream do Muse registam o arrefecimento e o estado do disjuntor como outros fornecedores. Uma ligação explicitamente forçada ignora o round-robin para uma nova sessão, mas não pode substituir um proprietário existente.
- Até que o proprietário forneça uma resposta bem-sucedida, uma sessão cujo proprietário ficou indisponível será novamente reivindicada numa conta íntegra. Após a primeira resposta bem-sucedida, a sessão permanece fixada nesse proprietário até ficar inativa durante 30 dias (`MUSE_SESSION_IDLE_TTL_MS`).
- Cada continuação e resultado da ferramenta permanecem fixados ao proprietário da sessão: ligação, identidade da conta e geração de credenciais de inferência, verificadas novamente antes das tentativas de upstream, incluindo novas tentativas de atualização de credenciais. As respostas chamam referências IDs/item e as chamadas de ferramenta IDs de conclusões de chat devem ter sido registadas para essa sessão e geração.
- Os registos SQLite `key_value` no namespace `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) persistem a propriedade e o cursor de rotação entre reinicializações. Cada reclamação e resposta servida atualiza o carimbo de atividade da sessão; uma sessão ociosa durante mais tempo que `MUSE_SESSION_IDLE_TTL_MS` é removida (pino do proprietário, sinalizador servido e hashes opaque/reference registados), no máximo uma vez a cada 10 minutos e em lotes limitados, para que uma repetição posterior do seu histórico falhe quando fechado como proprietário desconhecido. Os registos contêm IDs de ligação e hashes de identidade da conta, credenciais, conteúdo opaco e referências de continuação, e não segredos ou histórico de conversas. Os clientes devem reter e enviar o seu histórico completo e raciocínio opaco.
- Raciocínio opaco desconhecido ou estrangeiro, um proprietário ausente, uma conta de proprietário indisponível ou uma mudança de geração com histórico registado falha no fecho com um 4xx/503 — explícito, nunca failover silencioso entre contas e nunca abandonou o raciocínio.
- Uma chave da mesma conta relembrada é adotada apenas quando a sessão não registou qualquer histórico reproduzível; as sessões gravadas continuam a falhar o fecho até serem iniciadas do zero.
- Uma resposta upstream vazia (`upstream_empty_response` / `empty_response`, nada emitido para o chamador) é repetida no máximo duas vezes no mesmo proprietário, após 0,5 s e depois 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Se todas as tentativas estiverem vazias, o 502 original é devolvido sem arrefecimento ou marcação de disjuntor, pelo que uma resposta fragmentada nunca bloqueia o proprietário.
- Todos os pedidos `muse-code` ignoram leituras e escritas de cache semântico, incluindo gravações de streaming, pelo que a saída opaca armazenada em cache não pode adquirir um proprietário de sessão diferente.

Guardas de regressão: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` e `tests/unit/chatcore-semantic-cache.test.ts`.

## Veja também

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — disjuntores, arrefecimentos, bloqueios de modelos
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosticando upstream 400s
- Fonte: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migração: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rota API : `src/app/api/cache/reasoning/route.ts`
- Edição original: #1628
