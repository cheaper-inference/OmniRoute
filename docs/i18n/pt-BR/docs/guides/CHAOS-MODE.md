# Chaos Mode (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Painel:** **Chaos Mode** (barra lateral) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sessão do painel) · `POST /api/skills/collect/chaos` (chave de API)  
> **Código-fonte:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

O Chaos Mode envia **uma tarefa para vários provedores ao mesmo tempo** — cada provedor participante
contribui com uma instância de modelo, e você recebe todas as respostas lado a lado (ou encadeadas). Trata-se de uma
superfície de execução multimodelo, não de uma estratégia de roteamento: o tráfego normal de `/v1/chat/completions`
nunca é afetado por ele.

**Esclarecimento — três recursos diferentes incluem "chaos" no nome:**

| Recurso                     | O que é                                                                                                                                                                            | Onde está documentado                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**              | A página do painel + a API descrita aqui: distribui uma tarefa entre vários provedores (em paralelo ou de forma colaborativa).                                                     | Este guia                                    |
| `auto/chaos`                | ID de modelo Auto-Combo: distribuição paralela, um modelo por provedor, uma chamada upstream para cada um. Não é injeção de falhas ([detalhes](#autochaos-distribuição-paralela)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configuração de combo chaos | Um combo persistido com `config.chaos.enabled` realiza a distribuição da mesma forma (somente via API); `judgeModel` apenas escolhe a resposta final, sem chamada de síntese.      | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: distribuição paralela

`auto/chaos` **não** é um mecanismo de injeção de falhas nem de teste de resiliência. Solicitar
`model: "auto/chaos"` em `/v1/chat/completions`:

1. Monta um painel com **um modelo por provedor**: o primeiro candidato de cada
   provedor conectado, na ordem do pool de candidatos, com até 5 membros
   (`OMNIROUTE_CHAOS_MAX_PANEL`, limitado a 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). O pacote de pesos `chaos-mode`
   apenas define o `weight` de cada membro; a distribuição não consulta esse valor.
2. Envia a mesma solicitação a todos os membros do painel **em paralelo**, portanto uma solicitação
   custa uma chamada upstream por membro do painel
   (`open-sse/services/autoCombo/chaosEngine.ts`, despachada a partir de
   `open-sse/services/combo.ts`).
3. Transmite uma linha de status por membro do painel à medida que cada resposta chega: um comentário SSE
   (`: chaos <index> ok|fail <model>`) por padrão, além de um evento `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) quando a solicitação define
   `stream_options.include_chaos_parts: true`. Esses dados não contêm o texto da resposta.
4. Envia **uma** resposta do painel como o chunk final no estilo OpenAI: a do primeiro
   membro do painel (`auto/chaos` o define como `judgeModel`) quando ela é bem-sucedida; caso contrário,
   a do último membro bem-sucedido. As outras respostas do painel não são retornadas, portanto
   você paga por N chamadas e recebe uma conclusão.

## Configurar

1. Abrir** Painel → Modo Caos** (`/dashboard/chaos`).
2. Vire** sobre** Navios do Modo Caos —** desativado por padrão** (`enabled: false` em `src/lib/chaos/chaosConfig.ts`). Enquanto desativado, `POST /api/chaos/run` responde `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Escolha os participantes e os padrões (persistidos por instância no armazenamento de configurações):

   | Campo               | Significado                                                             | Padrão/limites                          |
   | ------------------- | ----------------------------------------------------------------------- | --------------------------------------- |
   | `enabled`           | Interruptor mestre                                                      | `false`                                 |
   | `defaultMode`       | `parallel` ou `collaborative` (veja abaixo)                             | `parallel`                              |
   | `providerOverrides` | Participação por provedor (`providerId`, opcional `modelId`, `enabled`) | vazio = cada provedor ativo, máximo 200 |
   | `systemPrompt`      | Substituir o prompt do sistema Chaos integrado                          | opcional, máximo de 10.000 caracteres   |
   | `timeoutMs`         | Tempo máximo por chamada de modelo                                      | `120000` (5 000–600 000)                |
   | `maxTokens`         | `max_tokens` por chamada de modelo                                      | `4096` (256–128 000)                    |

4. Dê a cada fornecedor participante um** modelo** . O modelo de um provedor é o `modelId` de seu override habilitado na página do Modo Caos (ele vence), caso contrário o** modelo padrão** da sua conexão. Um ID de provedor nunca é usado como nome de modelo. Um provedor sem nenhum dos dois é** não ligou** : aparece nos resultados como `status: "error"` com a mensagem _"Nenhum modelo definido para este provedor. Defina um modelo para ele na página Modo Caos ou um modelo padrão na conexão."_ e um `modelId` vazio, enquanto os outros provedores funcionam normalmente. Se nenhum provedor selecionado tiver um modelo, a execução falhará antes de qualquer solicitação upstream com _"Nenhum provedor tem um modelo definido. …"_ (HTTP 500 em ambos os pontos de extremidade).
5. Execute um** teste na própria página** — o painel de resultados mostra a resposta, o status e a duração de cada provedor.

## Modos de execução

- **`parallel`** — todos os modelos recebem a mesma tarefa simultaneamente; você recebe todas as respostas
  de forma independente.
- **`collaborative`** — os modelos são executados **em cadeia**: cada um vê a saída do modelo anterior e
  é solicitado a refiná-la, ampliá-la, criticá-la ou oferecer uma alternativa. O campo `summary` da resposta
  concatena as saídas bem-sucedidas na ordem da cadeia (execuções paralelas não têm `summary`).

## API

### sessão do painel `POST /api/chaos/run` —

Autenticado por cookie (a sessão de gerenciamento — consulte [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); usado pela página do painel.

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### chave `POST /api/skills/collect/chaos` — API

Variante de token de portador para chamadores externos. A chave deve conter o** Permissão do Modo Caos** (`chaosModeEnabled`), que é** desativado por padrão** — habilite-o por chave** Painel → API Manager → editar chave → permissões → Modo Caos** . Mesmo corpo acima.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Ambos os pontos finais retornam a mesma forma:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## Solução de problemas

- **`400 Chaos Mode is not enabled`** — etapa 2 acima: a chave global está desligada.
- **A chave API é rejeitada no `/api/skills/collect/chaos`** — a chave não possui a permissão `chaosModeEnabled` por chave (desativada por padrão; esta é uma configuração, não um erro).
- **Um provedor mostra `No model set for this provider`** — define seu modelo na página Chaos Mode ou um modelo padrão em sua conexão (veja Configuração, etapa 4).
- **Um fornecedor que você esperava está faltando nos resultados** — verifique `providerOverrides` na página Modo Caos (uma substituição desabilitada o exclui) e se a conexão do provedor está ativa.
