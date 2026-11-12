# Reasoning Replay Cache (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Fonte da verdade:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute captura o `reasoning_content` do assistente produzido por modelos no modo de raciocínio e o reproduz de forma transparente em solicitações com múltiplos turnos quando o provedor upstream exige isso. Isso elimina os erros HTTP 400 que provedores rigorosos geram quando o histórico da conversa de um cliente não contém o raciocínio do turno anterior.

## Por Que Isso Existe

Vários provedores no modo de raciocínio rejeitam um turno subsequente, a menos que a **mensagem anterior do assistente inclua o `reasoning_content` original**. O upstream retorna 400 com mensagens como:

```
Parâmetro incorreto: o reasoning_content no modo de raciocínio deve ser enviado de volta para a API.
```

No entanto, clientes comuns (Cursor, Cline, Roo Code, OpenAI SDK) removem o `reasoning_content` do histórico que reproduzem. O OmniRoute o restaura a partir de um cache no lado do servidor para que a solicitação recebida pelo upstream seja consistente. A issue #1628 introduziu a persistência híbrida em memória/SQLite para que o cache sobreviva a reinicializações do processo.

## Arquitetura

```
Turno N (o assistente gera):
  → a resposta contém reasoning_content + tool_calls
  → se requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      grava (memória + BD), indexado por cada tool_call.id
  → encaminha a resposta ao cliente (que pode ou não reter o raciocínio)

Turno N+1 (o cliente envia uma solicitação de acompanhamento):
  → o tradutor detecta: requiresReasoningReplay(provider, model) === true
  → para cada mensagem do assistente com tool_calls e sem reasoning_content:
      lookupReasoning(toolCalls[0].id) → memória → BD
      encontrado     → msg.reasoning_content = cached; recordReplay()
      não encontrado → msg.reasoning_content = "" (fallback legado para versões anteriores do DeepSeek)
  → o upstream recebe um histórico consistente → sem erro 400
```

A captura ocorre em `open-sse/handlers/chatCore.ts` (em dois locais, nos dois pontos de chamada de `cacheReasoningFromAssistantMessage`). A reprodução ocorre em `open-sse/translator/index.ts` após a coerção do esquema, mas antes do despacho.

Os turnos simples do assistente (sem chamadas de ferramentas) são indexados de forma diferente: `buildAssistantMessageCacheKey()` calcula um resumo criptográfico do escopo da sessão junto com a transcrição normalizada no formato OpenAI até aquele turno, porque o DeepSeek exige o raciocínio de _todos_ os turnos anteriores quando `tools` está presente. Para destinos da API Responses (por exemplo, `opencode-go/deepseek-v4-flash`, roteado para `/responses`), o corpo enviado ao upstream contém `input`, e não `messages`; por isso, `translateRequest()` (`open-sse/translator/index.ts`) informa, por meio de uma opção de callback, a transcrição intermediária cujo resumo criptográfico foi calculado, e os pontos de captura calculam o resumo dessa mesma transcrição. A etapa de reprodução do Responses é executada sobre a representação intermediária do OpenAI para todos os formatos de origem; portanto, clientes do Anthropic Messages (Claude → OpenAI → Responses) também têm o raciocínio reproduzido.

## Armazenamento — Memória Híbrida + SQLite

O caminho crítico usa um `Map` em memória (LRU por criação), respaldado por uma tabela SQLite para recuperação após falhas e visibilidade no painel.

| Camada  | Implementação                                  | Finalidade                                             |
| ------- | ---------------------------------------------- | ------------------------------------------------------ |
| Memória | `Map` em `open-sse/services/reasoningCache.ts` | Consultas rápidas, remove o mais antigo após 200       |
| DB      | Tabela `reasoning_cache` (`src/lib/db/`)       | Persiste entre reinicializações, alimenta estatísticas |

As gravações são realizadas em ambos. As leituras consultam primeiro a memória e depois recorrem ao DB (os resultados encontrados no DB são promovidos de volta para a memória). Falhas no DB não são fatais — o cache em memória continua atendendo ao caminho crítico.

**Valores padrão:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Máximo de entradas na memória: `200` (`MAX_MEMORY_ENTRIES`)
- Remoção: `createdAt` mais antigo primeiro

## Esquema do Banco de Dados

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

Índices: `expires_at`, `provider`, `model`, `created_at`. `expires_at` é armazenado como segundos da época Unix; a camada SELECT normaliza valores de texto legados por meio de `EXPIRES_AT_EPOCH_SQL`.

## Detecção de provedor / modelo

A repetição é habilitada quando `requiresReasoningReplay(provider, model)` retorna `true`. A função verifica duas listas em `open-sse/services/reasoningCache.ts`.

**IDs de provedores (correspondência exata, sem diferenciar maiúsculas de minúsculas):**

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

**Padrões regex de modelos (sem diferenciar maiúsculas de minúsculas):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` e `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, sufixo `-free` opcional)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Adicionar um novo provedor/modelo estrito significa acrescentá-lo a uma dessas listas e escrever um teste unitário que confirme a injeção da repetição. A descrição do PR deve citar a string exata do erro 400 upstream que motivou a alteração.

## API REST

O cache expõe dois endpoints em `src/app/api/cache/reasoning/route.ts`. Ambos exigem autenticação de gerenciamento (`isAuthenticated` de `@/shared/utils/apiAuth`).

| Método | Endpoint                                                  | Descrição                                                                   |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Estatísticas + entradas paginadas                                           |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Listagem filtrada (`limit` limitado ao intervalo `[1, 200]`)                |
| DELETE | `/api/cache/reasoning`                                    | Limpa tudo (memória + banco de dados) e zera as contagens de acertos/falhas |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Limpa apenas as entradas de um provedor                                     |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Exclui uma única entrada                                                    |

**Formato da resposta GET:**

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

## Notas operacionais

- **Limpeza:** `cleanupReasoningCache()` remove entradas expiradas da memória e executa `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Os workers de verificação de integridade chamam essa função periodicamente.
- **Recuperação após falha:** Após uma reinicialização, a memória fica vazia, mas o banco de dados ainda mantém as entradas não expiradas. A primeira consulta de um determinado `tool_call_id` resulta em um acerto no banco de dados; as consultas subsequentes resultam em acertos na memória.
- **Sem raciocínio, sem cache:** `cacheReasoningFromAssistantMessage` retorna `0` quando a mensagem do assistente não contém o campo `reasoning_content` / `reasoning`, portanto respostas sem raciocínio não geram custo algum.
- **A gravação também é condicionada:** ambos os locais de chamada em `chatCore.ts` (sem streaming e com streaming) só chamam `cacheReasoningFromAssistantMessage()` quando `requiresReasoningReplay(provider, model)` é `true` — o mesmo predicado verificado no lado da leitura. Instalações que nunca usam um provedor com repetição deixam de arcar com a gravação, a atualização do índice e o try/catch em cada resposta que contém raciocínio.
- **Provedores não estritos:** Quando `requiresReasoningReplay` é `false` e o formato de destino é OpenAI, o tradutor **remove** qualquer campo `reasoning_content` das mensagens de saída — o OpenAI Chat Completions não o aceita.

## Responsabilidade pelo raciocínio opaco do Muse

O Muse (`muse-code`) retorna raciocínio opaco vinculado ao chamador (`encrypted_content`). Reproduzi-lo com outra conta ou uma credencial reemitida falha no upstream; por isso, solicitações OAuth nativas usam responsabilidade por sessão em vez de rotação por solicitação (`src/sse/services/museSessionOwnership.ts`, aplicada em `src/sse/handlers/chat.ts`). Conexões por chave de API selecionadas explicitamente e configurações que usam somente chave de API mantêm seu roteamento existente sem esse modo de responsabilidade.

- Forneça um ID de sessão estável em cada turno: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` ou `x-codex-session-id`; alternativamente, use `prompt_cache_key`, `session_id`, `conversation_id` ou `metadata.session_id` no corpo (nessa ordem de precedência). IDs ausentes ou vazios retornam 400 quando duas ou mais contas OAuth nativas estão ativas; com uma única conta OAuth, não há outra conta para rotação, então essa solicitação mantém o roteamento sem vínculo fixo. O escopo inclui o ID da chave de API OmniRoute do chamador.
- Sessões novas e independentes alternam em round-robin entre as contas OAuth nativas ativas permitidas pela política de conexão da chave de API, ordenadas por ID de conexão. O round-robin pula contas em cooldown de conexão, com estado terminal (`banned`, `expired`, `credits_exhausted`) ou com bloqueio para o modelo solicitado; falhas do upstream Muse registram cooldown e estado do circuit breaker como outros provedores. Uma conexão forçada explicitamente ignora o round-robin para uma nova sessão, mas não pode substituir um responsável depois que ele tiver servido uma resposta bem-sucedida.
- Até o responsável servir uma resposta bem-sucedida, uma sessão cujo responsável ficou indisponível é reivindicada novamente por uma conta saudável. Após a primeira resposta bem-sucedida, a sessão permanece vinculada àquele responsável até ficar inativa por 30 dias (`MUSE_SESSION_IDLE_TTL_MS`).
- Cada continuação e turno de resultado de ferramenta permanece vinculado ao responsável da sessão: conexão, identidade da conta e geração da credencial de inferência, verificadas novamente antes das tentativas no upstream, inclusive nas novas tentativas após atualização de credenciais. IDs de chamada/referências de item de Responses e IDs de chamada de ferramenta de Chat Completions precisam ter sido registrados para aquela sessão e geração.
- Registros SQLite `key_value` no namespace `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) persistem a responsabilidade e o cursor de rotação entre reinicializações. Cada reivindicação e resposta servida atualiza a marca de atividade da sessão; uma sessão inativa por mais de `MUSE_SESSION_IDLE_TTL_MS` é removida (vínculo do responsável, flag de resposta servida e hashes registrados de conteúdo opaco/referências), no máximo uma vez a cada 10 minutos e em lotes limitados, de modo que uma reprodução posterior de seu histórico resulta em bloqueio seguro por responsável desconhecido. Os registros contêm IDs de conexão e hashes de identidade da conta, credenciais, conteúdo opaco e referências de continuação, não segredos ou histórico de conversa. Os clientes precisam reter e enviar seu histórico completo e o raciocínio opaco.
- Raciocínio opaco desconhecido ou de terceiros, responsável ausente, conta responsável indisponível ou mudança de geração com histórico registrado resulta em bloqueio seguro com um 4xx/503 explícito — nunca há failover silencioso entre contas nem descarte do raciocínio.
- Uma chave reemitida da mesma conta só é adotada quando a sessão não registrou histórico reproduzível; sessões com registros continuam em bloqueio seguro até serem iniciadas do zero.
- Uma resposta vazia do upstream (`upstream_empty_response` / `empty_response`, sem nada emitido ao chamador) gera no máximo duas novas tentativas no mesmo responsável, após 0.5 s e depois 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Se todas as tentativas forem vazias, o 502 original é retornado sem marcar cooldown ou circuit breaker, para que uma resposta instável nunca bloqueie o responsável.
- Todas as solicitações `muse-code` ignoram leituras e gravações do cache semântico, inclusive gravações de streaming, para que uma saída opaca em cache não adquira outro responsável de sessão.

Proteções contra regressão: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` e `tests/unit/chatcore-semantic-cache.test.ts`.

## Veja também

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakers, períodos de espera, bloqueios de modelos
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnóstico de erros 400 de serviços upstream
- Código-fonte: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migração: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rota da API: `src/app/api/cache/reasoning/route.ts`
- Issue original: #1628
