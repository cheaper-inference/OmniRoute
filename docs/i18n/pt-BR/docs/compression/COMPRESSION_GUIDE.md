# 🗜️ Prompt Compression Guide — OmniRoute (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Economize automaticamente de 15% a 95% no contexto elegível. Para uma visão geral rápida, consulte a [seção sobre compactação do README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Visão geral

O OmniRoute implementa um pipeline modular de compactação de prompts que é executado **proativamente** antes que as solicitações cheguem aos provedores upstream. Isso significa que sua economia de tokens ocorre de forma transparente — sem necessidade de alterar seu fluxo de trabalho.

```
Solicitação do cliente
  → Seletor de estratégia de compactação
    → Há uma substituição por combinação? → Usar configuração da combinação
    → Limite de acionamento automático atingido? → Usar modo automático
    → Modo padrão? → Usar configuração global
    → Desativado? → Ignorar compactação
  → Modo de compactação selecionado
    → Desativado: sem compactação
    → Leve: limpeza segura de espaços em branco/formatação (~15%)
    → Padrão: remoção de conteúdo supérfluo em estilo telegráfico (~30%)
    → Agressivo: envelhecimento do histórico + sumarização (~50%)
    → Ultra: poda heurística + redução de blocos de código (~75%)
    → RTK: filtragem de saída de terminal/ferramenta com reconhecimento de comandos (faixa upstream de 60-90%)
    → Empilhado: pipeline ordenado com vários mecanismos, normalmente RTK seguido por Caveman (faixa elegível de 78-95%)
  → Solicitação compactada → Provedor
```

---

## Modos de compressão

### Desativado

Nenhuma compressão aplicada. Todas as mensagens passam sem alterações.

### Modo Lite (~15% de economia, <1ms de latência)

O modo mais seguro — limpeza de formatação. O truncamento dos resultados de ferramentas é com perdas, portanto o
caminho padrão (sem `allow-lossy`, `engine:lite` ou ativação explícita de uma combinação nomeada) executa o modo lite com
`compressToolResults: false`: os resultados anteriores das ferramentas chegam ao provedor sem alterações.

| Técnica                  | Descrição                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Mescla linhas em branco consecutivas e espaços à direita                                                              |
| `dedupSystemPrompt`      | Remove mensagens de sistema duplicadas                                                                                |
| `compressToolResults`    | Trunca resultados anteriores das ferramentas até o limite do lite (com perdas: somente com uma solicitação explícita) |
| `removeRedundantContent` | Remove instruções repetidas                                                                                           |
| `replaceImageUrls`       | Encurta URIs de dados de imagens em base64                                                                            |

**Ideal para:** Uso contínuo e fluxos de trabalho críticos para a segurança.

### Modo Standard (~30% de economia)

Inspirado no [Caveman](https://github.com/JuliusBrussee/caveman) — remove palavras de preenchimento e formulações prolixas, preservando o significado:

- Remove palavras de preenchimento ("please", "I think", "basically", "actually")
- Condensa frases prolixas ("in order to" → "to", "as a result of" → "because")
- Remove ressalvas de polidez ("Would you mind...", "If you could possibly...")
- Mais de 30 regras de expressão regular ajustadas para prompts de programação

**Ideal para:** Fluxos de trabalho diários de programação e equipes preocupadas com custos.

### Modo Aggressive (~50% de economia)

Gerenciamento inteligente do histórico para sessões longas:

- **Envelhecimento de mensagens** — mensagens mais antigas são comprimidas progressivamente
- **Compressão de resultados de ferramentas** — saídas longas de ferramentas são truncadas ou omitidas (primeiras/últimas linhas,
  filtragem por linhas correspondentes, compactação de chaves JSON)
- **Proteções de integridade estrutural** — garante que os pares `tool_use` + `tool_result` permaneçam consistentes
- **Consciência da janela de contexto** — respeita os limites de tokens por modelo

**Ideal para:** Sessões prolongadas de depuração e bases de código grandes.

### Modo Ultra (~75% de economia)

Compressão máxima para cenários críticos em tokens:

- **Poda heurística** — poda de tokens baseada em pontuação no texto em prosa
- **Preservação da estrutura** — blocos de código cercados, código inline, URLs e identificadores são preservados e reinseridos
  literalmente, nunca podados
- **Camada SLM opcional** — um modelo local pequeno pode refinar a poda quando configurado
- Independente do modo Aggressive: não executa envelhecimento de mensagens, compressão de resultados de ferramentas
  nem o sumarizador de fallback (somente uma falha da camada SLM pode encaminhar uma passagem de fallback pelo modo aggressive)

**Ideal para:** Quando você atinge repetidamente os limites de contexto.

### Modo RTK (faixa upstream de 60–90%)

O modo RTK é otimizado para saídas prolixas de ferramentas que aparecem em sessões de agentes de programação:

- Detecta classes de comandos/saídas como `git status`, `git diff`, `git log`, executores de testes,
  builds de TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorias/instalações do npm, logs do Docker, saídas de infraestrutura
  e saídas genéricas do shell
- Aplica pacotes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros de esquema TOML v1 do RTK a partir de arquivos `filters.toml` do projeto ou globais, com validação de
  testes inline e controle de confiança para arquivos do projeto
- Inclui 56 filtros integrados com amostras de verificação inline
- Remove sequências de controle ANSI, barras de progresso, linhas repetidas e ruído não acionável
- Preserva falhas, erros, avisos, arquivos alterados, resumos e o final de saídas longas
- Oferece suporte a filtros de projeto controlados por confiança, filtros globais e recuperação opcional da saída bruta redigida

**Ideal para:** Sessões de agentes com transcrições de shell, build, teste, git, grep e saída de arquivos.

### Modo Stacked (faixa elegível de 78–95%)

O modo Stacked executa vários mecanismos de compressão em uma ordem determinística. O pipeline padrão é:

```txt
RTK -> Caveman
```

Essa ordem mantém primeiro a saída do terminal/ferramenta compacta e, em seguida, aplica a condensação semântica do Caveman
ao prompt restante em linguagem natural. Os pipelines Stacked podem ser configurados globalmente ou por meio de
combinações de compressão atribuídas a combinações de roteamento.

**Ideal para:** Contexto misto com grandes logs de ferramentas e instruções humanas ou resumos do assistente.

## Cálculo da economia upstream

O OmniRoute documenta a economia com compressão a partir de duas fontes: benchmarks dos projetos upstream e a própria composição de mecanismos do OmniRoute.

| Fonte   | Número do README upstream usado aqui                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` menos tokens de saída, economia média de `65%` na saída em benchmarks, faixa de `22-87%` e ferramenta com compressão de entrada de `~46%` |
| RTK     | Economia de `60-90%` na saída de comandos; sessão de exemplo com `~118,000 -> ~23,900` tokens, ou `79.7%` de economia (`~80%`)                   |

Para payloads de ferramentas/contexto sobrepostos, a combinação padrão do OmniRoute encadeia os mecanismos:

```txt
RTK -> Caveman
```

A economia combinada é multiplicativa, não aditiva:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Esse número de `78-95%` se aplica quando tanto o RTK quanto o Caveman podem reduzir o mesmo payload de entrada/contexto. O modo de saída de respostas do Caveman é separado: quando ativado, use os próprios valores de economia de saída do Caveman (média de `65%`, destaque de `~75%`, faixa de `22-87%`). A economia total de cobrança depende da sua combinação de prompts e saídas.

### O que "elegível" realmente significa

A faixa de destaque de 15-95% é real, mas aplica-se apenas a conteúdo **redundante ou verboso** — linhas de erro repetidas, um log de build que envia o mesmo aviso incessantemente, uma saída superdimensionada de `grep`/leitura de arquivo. Isso **não** significa que toda solicitação economizará tanto.

Verificado empiricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uma execução `stacked` (RTK + Caveman) em um bloco `tool_result` no formato da Anthropic contendo 300 linhas de erro idênticas produziu **95.93% de economia de tokens / 96.26% de economia de caracteres** — perfeitamente dentro da faixa anunciada. Porém, a mesma pipeline executada em uma saída normal e não redundante de ferramenta (uma lista limpa de correspondências do `grep`, uma leitura curta de arquivo, texto de conversa comum) produz corretamente uma **economia próxima de zero**, pois não há nada repetitivo a remover e `validateCompression()` (`validation.ts`) se recusa a enviar uma reescrita que removeria ou alteraria blocos de código, URLs, títulos, versões ou identificadores de constantes em MAIÚSCULAS.

Esse é um comportamento esperado e seguro, não um bug: uma sessão de programação que principalmente lê/pesquisa com grep em arquivos limpos terá uma economia total modesta, mesmo com a compressão totalmente ativada, enquanto uma sessão que entra em um loop com falhas ou encontra um linter verboso terá a faixa completa de 78-95% de economia nesse tráfego. Não use o baixo percentual agregado de economia de uma única sessão como evidência de que a compressão está configurada incorretamente — primeiro verifique se a saída subjacente da ferramenta era realmente redundante.

---

## Visualização da economia de tokens

```
Sem compressão: 47K tokens enviados ao LLM
Com Lite:       40K tokens enviados          (15% economizados — seguro, sempre ativo)
Com Standard:   33K tokens enviados          (30% economizados — regras caveman-speak)
Com Aggressive: 24K tokens enviados          (50% economizados — envelhecimento + sumarização)
Com Ultra:      12K tokens enviados          (75% economizados — poda heurística)
Com RTK:        19K-5K tokens enviados       (60-90% economizados na saída de comandos/ferramentas)
Com Stacked:    10K-2.5K tokens enviados     (faixa elegível de 78-95% com RTK+Caveman)
```

---

## Configuração

### Dashboard

Navegue até `Dashboard → Context & Cache`:

- **Caveman** — seleção de modo, pacotes de idioma, visualização e padrões globais
- **RTK** — visualização do filtro de comandos, configurações de segurança do RTK e catálogo de filtros
- **Compression Combos** — pipelines de mecanismo nomeados atribuídos a combos de roteamento
- **Auto-Trigger Threshold** — ativa automaticamente a compressão quando a contagem de tokens excede o limite

### Substituição por combo

Em `Dashboard → Context & Cache → Compression Combos`, atribua um combo de compressão a um
combo de roteamento:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Isso permite usar compressão empilhada com provedores gratuitos/de codificação, mantendo o modo lite em
assinaturas pagas.

Essa atribuição de "Per-Combo Override" é um controle diferente da substituição de **routing-combo compression
mode** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — o esquema do campo também aceita
`rtk`, `stacked` e `omniglyph`) — essa substituição não seleciona um pipeline de compression-combo
nomeado; ela apenas define o campo `compressionMode` consultado por
`resolveCompressionPlan`. Ela pode ser definida no cartão do combo (`Dashboard → Combos`) ou, desde
#6760, por combo de roteamento na lista "Assign to routing" em
`Dashboard → Context & Cache → Compression Combos`, logo ao lado da caixa de seleção de atribuição do pipeline
documentada acima. Ambas as interfaces persistem por meio do mesmo endpoint
`PUT /api/combos/{id}`.

### Substituição por requisição

Envie o cabeçalho de requisição `x-omniroute-compression` para substituir o plano de compressão de uma única
requisição. Ele tem a maior precedência — prevalece sobre a substituição do combo de roteamento, o perfil ativo,
o acionamento automático e o padrão do painel. Valores desconhecidos são ignorados (a requisição nunca é rejeitada) e
o interruptor mestre global ainda controla tudo: quando a compressão está desativada globalmente, o cabeçalho não pode
ativá-la. Valores:

| Valor         | Efeito                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Nenhuma compressão para esta requisição.                                                                                      |
| `default`     | O perfil Default derivado do painel (ignora o perfil ativo). Mecanismos com perdas permanecem desativados.                    |
| `safe`        | Igual a omitir o cabeçalho.                                                                                                   |
| `allow-lossy` | Mantém o plano do operador desta requisição, incluindo resumos, filtros de relevância e reescritas de estilo.                 |
| `engine:<id>` | Um único mecanismo quando ativado, por exemplo, `engine:rtk`. Esta é a ativação explícita por requisição para esse mecanismo. |
| `<combo>`     | Um combo nomeado, correspondido primeiro pelo nome (sem distinção entre maiúsculas e minúsculas) e depois pelo id.            |

Sem `allow-lossy`, `engine:<id>` ou um combo nomeado, mecanismos com perdas não são aplicados. Quando um
Default, acionamento automático ou substituição de roteamento com perdas é rebaixado, o OmniRoute mantém as
etapas reconhecidas sem perdas do pipeline empilhado configurado, na ordem configurada. Ele recorre a
`session-dedup → lite` somente quando nenhuma etapa configurada sem perdas permanece.

A visualização **Effective pipeline** do painel de Configurações mostra o plano comum em estado persistente. Quando
um acionamento automático pode ser executado, a mesma visualização também mostra seu pipeline efetivo condicional,
para que o painel e a resolução em tempo de execução sem cabeçalho permaneçam alinhados.

O plano aplicado é retornado no cabeçalho de resposta
`X-OmniRoute-Compression: <mode>; source=<source>`, onde `<source>` é um destes valores:
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` ou `off`.

### API

```bash
# Obter configurações de compressão
curl http://localhost:20128/api/settings/compression

# Atualizar configurações de compressão
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Visualizar uma carga específica de RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listar pacotes de filtros do RTK
curl http://localhost:20128/api/context/rtk/filters

# Testar o RTK diretamente com metadados opcionais do comando
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## O que é protegido

O mecanismo de compressão **sempre preserva:**

- ✅ Blocos de código (delimitados e inline)
- ✅ URLs e caminhos de arquivos
- ✅ Estruturas JSON e dados estruturados
- ✅ Identificadores e tokens técnicos protegidos
- ✅ Expressões matemáticas
- ✅ Definições de chamadas de ferramentas/funções
- ✅ Prompts de sistema (no modo lite)

A recuperação de saída bruta do RTK oculta chaves de API comuns, tokens bearer, tokens do Slack, chaves de acesso da AWS,
senhas, tokens e segredos antes que qualquer dado seja persistido.

---

## Estatísticas de compressão

Cada solicitação comprimida inclui estatísticas nos logs do servidor:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Roteiro das fases

| Fase    | Modos                                                                                                                                                                 | Status     |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Fase 1  | Off, Lite                                                                                                                                                             | ✅ Lançada |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                           | ✅ Lançada |
| Fase 3  | RTK, Stacked, Combinações de compressão                                                                                                                               | ✅ Lançada |
| Fase 4  | Estilos de saída, Ultra de nível SLM, estrutura de avaliação                                                                                                          | ✅ Lançada |
| Fase 4C | Orçamento de contexto adaptativo ("dial") — mecanismo de computação + API (`contextBudget` em `PUT /api/settings/compression`) + controles de modo/política no painel | ✅ Lançada |

---

## Agradecimentos

As regras de compressão do modo Standard são inspiradas no **[Caveman](https://github.com/JuliusBrussee/caveman)**, de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51 mil+) — o projeto viral "por que usar muitos tokens quando poucos tokens resolvem". O Caveman relata `~75%` menos tokens de saída, economia média de `65%` na saída em benchmarks, uma faixa de `22-87%` na saída e uma ferramenta de compressão de entrada de `~46%`.

O modo RTK é inspirado no **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, da **[RTK AI](https://github.com/rtk-ai)** — o projeto de alto desempenho para compressão de saída de comandos para terminal, compilação, testes, git e filtragem da saída de ferramentas. O RTK relata uma economia de `60-90%`, com a sessão de exemplo em seu README mostrando uma economia de `~80%`.

---

## Sistemas avançados de compressão

Além dos 7 modos descritos acima (a fonte também aceita os modos `codex-responses` e `omniglyph`, que este guia não cobre), as seções abaixo cobrem recursos que funcionam dentro ou junto com esses modos: Compressão de resultado de ferramenta e Envelhecimento progressivo são as etapas 1 e 2 do mecanismo agressivo (modo agressivo e uma etapa `aggressive` de um pipeline empilhado), o pipeline empilhado é como o modo empilhado é executado, a compactação com reconhecimento de cache faz o downgrade `aggressive` e `ultra` para `standard` para armazenamento em cache provedores enquanto a compactação está ativada, e o modo de saída e os estilos de saída do Caveman são instruções opcionais de prompt do sistema, desativadas por padrão, que moldam a saída do modelo em vez de compactar a solicitação.

### Compressão com reconhecimento de cache

Alguns provedores (como Anthropic com cache imediato) oferecem suporte** cache de prompt** , o que permite armazenar em cache partes do prompt para reduzir custos e latência. Quando o cache está ativado, a compactação agressiva pode realmente** ferir** desempenho porque altera os tokens armazenados em cache, invalidando o cache.

O módulo `cachingAware.ts` resolve isso por** detectando contexto de cache** e** ajustando a estratégia de compressão** de acordo.

#### Como funciona

1. **Detectar contexto de cache** — Verifica o corpo da solicitação em busca de marcadores `cache_control`
2. **Identifique provedores de cache** — Verifica se o provedor de destino suporta cache
3. **Ajustar estratégia** — faz downgrade `aggressive`/`ultra` para `standard` para provedores de cache
4. **Ignorar prompt do sistema** Os prompts do sistema — geralmente são armazenados em cache, portanto, não os compacte

O auxiliar de estratégia também retorna um sinalizador `deterministicOnly`, mas o construtor de plano consome apenas a estratégia — nada downstream lê o sinalizador hoje.

#### Exemplo de código

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Quando usar

A compactação com reconhecimento de cache é** sempre ligado** — nenhuma configuração necessária. Ele entra em ação sempre que a compactação está ativada e o provedor de destino oferece suporte ao cache de prompt (Anthropic, OpenAI, etc.); marcadores `cache_control` explícitos não são necessários — um provedor de cache sozinho aciona o downgrade, e os marcadores sozinhos nunca o fazem (a detecção de marcadores alimenta a telemetria do cache, não a decisão estratégica).

OpenRouter conta como um provedor de cache apenas para modelos `anthropic/*` : as solicitações de código Claude mantêm seus pontos de interrupção `cache_control` (4 no máximo) e o guard protege o prefixo, enquanto todas as outras famílias OpenRouter (`openai/`, `google/`, `qwen/`, …) permanecem despojadas e desprotegidas.

### Envelhecimento Progressivo

Conversas longas acumulam muitos turnos de mensagens, mas os turnos mais antigos tornam-se menos relevantes. O módulo `progressiveAging.ts`** degrada mensagens por distância de giro** (distância medida do final da conversa). Com os padrões enviados (`verbatim: 2, light: 2, moderate: 3`):

- **Últimos 2 turnos (distância ≤ 2)** : Mantido literalmente
- **Distância 3** : Compressão Caveman (remoção de preenchimento)
- **Distância 4 +** : Mensagens do assistente resumidas; mensagens de usuários reduzidas à primeira linha, com limite de 120 caracteres; outros papéis intocados. Prompts do sistema, mensagens antigas e a mensagem mais recente do usuário são sempre mantidas na íntegra, independentemente da distância. Nada é eliminado imediatamente e a banda `light` fica inacessível com os padrões fornecidos (`light` é igual `verbatim`).

#### Exemplo de código

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Quando usar

O envelhecimento progressivo é** sempre ligado** para o modo `aggressive` — é a etapa 2 de `compressAggressive()`. O modo Ultra não o executa. É particularmente eficaz para:

- Sessões de codificação de longa duração
- Conversas de vários dias
- Fluxos de trabalho agentes com muitas chamadas de ferramentas

### Modo de saída do homem das cavernas

O modo de saída Caveman adiciona** instruções de prompt do sistema** que solicitam ao próprio modelo uma saída concisa — o nível `lite` pede respostas concisas que mantêm frases completas, `full` pede para "responder concisamente como um homem das cavernas inteligente" e `ultra` pede uma saída telegráfica; as instruções apenas perguntam, elas não podem garantir isso. As solicitações as recebem por meio de `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` primeiro resolve a seleção com o shim de retrocompatibilidade (`resolveOutputStyleSelection()` em `open-sse/services/compression/outputStyles/backCompat.ts`), que, enquanto `outputStyles` está vazio, mapeia um `cavemanOutputMode` habilitado para o estilo de saída `terse-prose` em `cavemanOutputMode.intensity` (veja Back-compat abaixo); uma seleção `outputStyles` não vazia é usada como está, e `cavemanOutputMode.enabled` e `intensity` não têm efeito, enquanto sua alternância `autoClarity` ainda se aplica. `outputMode.ts` contém os textos de instrução (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), o bypass de conteúdo e o auxiliar de posicionamento que a injeção usa; seu próprio injetor `applyCavemanOutputMode()` não possui chamador de produção.

#### Como funciona

Este modo não compacta a entrada. Ele adiciona um bloco de instruções ao prompt do sistema (veja Como funciona a injeção abaixo), e qualquer modo de compactação de entrada selecionado para a solicitação ainda será executado posteriormente, no corpo que agora carrega o bloco. Antes da cláusula de limites compartilhados com a qual cada nível termina, o nível `full` em inglês diz:

> "Responda concisamente como um homem das cavernas inteligente. Descarte artigos (a/an/the), preenchimento (just/really/basically/actually/simply), gentilezas, cobertura. Fragmentos OK. Sinônimos curtos (grande, não extenso, consertar, não implementar). Mantenha toda a substância técnica, código, erros, URLs, identificadores exatos."

Isso funciona particularmente bem para:

- Geração de código (saída terser = menos tokens)
- Perguntas e respostas rápidas (sem necessidade de explicações elaboradas)
- Processamento em lote (maximizar o rendimento)

#### Quando usar

O modo de saída do homem das cavernas é** aceitar** . Com a compactação ativada (`enabled: true`, a alternância principal na página Configurações de compactação), ative-a com `cavemanOutputMode.enabled`; `intensity` escolhe `lite`, `full` ou `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Um combo de compressão** Modo de saída** toggle (`outputMode`, level in `outputModeIntensity`) define a mesma opção para as solicitações às quais combo se aplica, e a ferramenta `omniroute_set_compression_engine` MCP a grava por meio de seu argumento booleano `outputMode`. Uma seleção `outputStyles` não vazia tem precedência sobre esta opção. No painel, habilitando o** Prosa concisa** o estilo de saída injeta o mesmo bloco (veja Estilos de saída abaixo).

### Estilos de saída (catálogo)

O modo de saída do Caveman acima é o** caminho legado de estilo único** . A Fase 4 generalizou-o em um catálogo de estilos de saída que podem ser compostos: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo é uma instrução do sistema que solicita ao próprio modelo uma saída mais barata; os estilos podem ser habilitados juntos e injetados na ordem do catálogo.

| Estilo                                           | `id`            | O que isso faz                                                                                                                                                                                                                                                                 | Idiomas de instrução                          |
| ------------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Prosa concisa                                    | `terse-prose`   | Solte filler/articles/hedging; manter a substância técnica exata. Mesmo texto do modo de saída legado do homem das cavernas (referenciado, não digitado novamente).                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menos código                                     | `less-code`     | escada YAGNI : menor mudança de trabalho, sem abstrações não solicitadas.                                                                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Rabo de cavalo (desenvolvedor sênior preguiçoso) | `ponytail`      | "O melhor código é o código nunca escrito": reutilizar > rewrite, causa raiz sintoma >, diferença de trabalho mais curta.                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Eu tenho ADHD (ação primeiro)                    | `i-have-adhd`   | Ação primeiro (command/path/snippet antes da prosa), etapas limitadas numeradas, ONE próxima etapa concreta, não preamble/recap/closers. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Filtro anti-slop UI                              | `antislop-ui`   | Toda técnica visual deve passar por um teste de finalidade (hierarquia, identidade, legibilidade); sem gradients/glass/glow padrão, paleta limitada, sem layouts de modelo. Ambos os estilos anti-slop adicionam um limite sem controles mortos/sem reivindicações fabricadas. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Cópia anti-slop e filtro humano                  | `antislop-copy` | Cópia específica (sem travessão, CTAs genérico, chavões, fechos de chatbot, fatos inventados) mais regras de pessoas: contraste WCAG AA, foco visível, alcance do teclado, estados empty/loading/error, refluxo móvel.                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Conciso CJK (文言)                               | `terse-cjk`     | resposta `full`/`ultra` em chinês clássico (文言); `lite` pede apenas respostas breves, sem palavras funcionais, gentilezas ou enfeites.                                                                                                                                       | zh (localizado, veja abaixo)                  |

Cada estilo vem com três níveis de intensidade — `lite`, `full`, `ultra` — e cada nível termina com a cláusula de limites compartilhados (`SHARED_BOUNDARIES` em `outputMode.ts`), que mantém blocos de código, caminhos de arquivo, comandos, erros e URLs exatos. Os textos de nível `terse-prose` e `terse-cjk` adicionam identificadores a essa lista.

`terse-cjk` é controlado por localidade para `zh` em dois lugares. A página Configurações de compactação lista sua linha somente quando o idioma UI do painel é chinês (`zh-CN` ou `zh-TW`) e `applyOutputStyles()` a injeta somente quando o idioma resolvido da solicitação (consulte Seleção de idioma abaixo) é `zh`. Ocultar a linha não limpa uma seleção `terse-cjk` salva: as configurações API aceitam qualquer ID de estilo e salvar outros estilos na página o mantém. No momento da solicitação, a verificação do idioma `applyOutputStyles()` é a única porta de localidade.

#### Como funciona a injeção

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resolve a seleção em relação ao catálogo (ids desconhecidos e estilos incompatíveis com localidade são descartados, nunca um erro; uma seleção que não resolve nenhum estilo deixa o corpo inalterado, ignorado como `no_styles`), concatena as instruções selecionadas na ordem do catálogo, anexa a cláusula de limites** uma vez** (mais a cláusula de segurança, `SAFETY_BOUNDARIES` ou sua tradução, quando `less-code` ou `ponytail` é selecionado) e inicia o bloco com um único marcador de idempotência (`[OmniRoute Output Styles]`), portanto, a reaplicação é uma operação autônoma. Quando o idioma resolvido (veja Seleção de idioma abaixo) possui uma tradução, a instrução localizada é injetada em vez do inglês.

Em um corpo com uma matriz `messages` não vazia, a verificação de idempotência é executada antes do desvio de conteúdo: quando o marcador `[OmniRoute Output Styles]` já está no campo `system` de nível superior (uma string ou uma matriz de bloco de conteúdo) ou em uma mensagem do sistema com conteúdo de string, o corpo permanece inalterado como `already_applied` e nenhuma verificação de palavra-chave é executada. Caso contrário, um desvio de conteúdo (`shouldBypassCavemanOutputMode()` em `open-sse/services/compression/outputMode.ts`) verifica o texto das últimas três mensagens, qualquer que seja sua função, e pula os estilos para todo o turno quando esse texto corresponde às suas palavras-chave de segurança, ação irreversível ou esclarecimento, ou uma sequência sensível à ordem: `first`, `then`, `after that`, `before`, `rollback` ou `backup` seguido dentro de 240 caracteres por `delete`, `drop`, `migrate`, `deploy` ou `release`. O bypass funciona enquanto o** Ignorar clareza automática** toggle (`cavemanOutputMode.autoClarity`, ativado por padrão) está ativado; desativar o botão de alternância ignora a verificação de palavras-chave.

Quando o bypass permite a passagem, `placeSystemInstruction()` (mesmo arquivo), que nunca cria um novo `messages[0]`, coloca o bloco no primeiro que encontrar:

1. Uma mensagem principal do sistema com conteúdo de string: o bloco é anexado após seu texto.
2. O campo `system` de nível superior: o bloco é anexado após o texto de uma string ou adicionado como um novo bloco de texto a uma matriz de blocos de conteúdo.
3. A primeira mensagem posterior do sistema com conteúdo de string: o bloco é anexado após seu texto.
4. Nenhuma das opções acima: o bloco entra em uma nova mensagem do sistema no final de `messages`.

Em um corpo sem uma matriz `messages` (ou com uma matriz vazia), nenhum desvio de conteúdo é executado e um campo `system` de nível superior não é consultado. O bloco é anexado após o texto de um campo de string `instructions`, a menos que esse campo já contenha o marcador `[OmniRoute Output Styles]`, caso em que o corpo permanece inalterado como `already_applied`. Quando o corpo não possui um campo de string `instructions`, mas carrega `input` (uma string ou uma matriz), o bloco se torna `instructions`, substituindo qualquer valor que não seja de string contido nesse campo. Um corpo sem um campo de string `instructions` nem uma string ou array `input` é deixado inalterado e ignorado como `no_messages`.

#### Como habilitar

No painel:** Contexto de compactação Configurações de compactação →** (`/dashboard/context/settings`), Seção de estilos de saída: uma linha por estilo com uma alternância on/off e um seletor de nível. Os estilos são injetados enquanto a compactação está ativada (a alternância mestre da página, `enabled`). O** Ignorar clareza automática** alternar está no** Homem das cavernas** página (`/dashboard/context/caveman`), em seu** Modo de saída** cartão. Programaticamente, a configuração de compactação persiste na seleção como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Retrocompatibilidade: enquanto `outputStyles` está vazio, a configuração herdada `cavemanOutputMode.enabled` é mapeada para `terse-prose` em `cavemanOutputMode.intensity`. O bloco então começa com o marcador `[OmniRoute Output Styles]`, onde o injetor `applyCavemanOutputMode()` legado escreveu `[OmniRoute Caveman Output Mode]`. Abaixo do marcador, o texto corresponde à injeção de legado em en, pt-BR, es, de, fr, it, ru, id e vi; em ja e zh carrega um espaço extra antes da cláusula de limites. `terse-prose` se traduz em pt-BR, es, de, fr, it, ru, zh, ja, id e vi, então uma solicitação cujo idioma resolvido é `hu` obtém o texto em inglês onde o injetor legado usou o húngaro.

Seleção de idioma no estilo de saída (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): com `languageConfig.enabled` ativado, `autoDetect` faz uma amostra da última mensagem do usuário no array `messages` da solicitação que contém texto (conteúdo de string ou o `text` de suas partes de conteúdo) e executa o detector do mecanismo Caveman (`detectCompressionLanguage()`) nele. O detector retorna `zh` para texto com caracteres Han e sem kana; caso contrário, ele retorna qualquer um dos `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` e `id` que tiver mais correspondências de dicas e `en` quando nenhuma correspondência — texto ele não pode classificar fica em inglês, nunca `defaultLanguage` e `vi` nunca é detectado, embora os estilos enviem texto `vi`. Um corpo Responses API mantém seus turnos em `input`, que não é amostrado, então fica `defaultLanguage`, depois inglês. Quando nenhuma mensagem do usuário em `messages` tem texto, ou com `autoDetect` desativado, `defaultLanguage` se aplica e depois em inglês. Com `languageConfig.enabled` desativado, o idioma é o inglês — a menos que um combo de compactação se aplique à solicitação (um combo atribuído ao combo de roteamento da solicitação ou o combo de compactação padrão chatCore retorna para o pipeline empilhado integrado): aplicar um combo ativa `languageConfig.enabled` para essa solicitação e define `defaultLanguage` a partir dos pacotes de idiomas do combo (o valor salvo se for um dos pacotes do combo, caso contrário, o primeiro pacote do combo, cujo padrão é `en`), enquanto o `autoDetect` salvo (ativado por padrão) ainda se aplica. O mecanismo de entrada do Caveman escolhe sua linguagem de pacote de regras de maneira diferente — por parte do texto e, com a detecção automática desativada, é bloqueado em `enabledPacks`.

A matriz de linguagem de estilo × é fixada por `tests/unit/compression/output-styles-i18n-matrix.test.ts`: todo estilo de catálogo precisa de uma entrada no `BASELINE_LANGUAGES` do teste; um estilo que não seja controlado por localidade deve enviar uma tradução pt-BR (o `terse-cjk` controlado por localidade está isento desta regra), a menos que esteja listado em `KNOWN_ENGLISH_ONLY`, que pode conter apenas estilos sem nenhuma tradução — um estilo listado que tenha qualquer tradução falha no teste; e um estilo falha no teste quando perde um idioma listado em sua entrada `BASELINE_LANGUAGES`. Para adicionar um estilo, consulte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressão do resultado da ferramenta

`compressToolResult()` em `open-sse/services/compression/toolResultCompressor.ts` compacta o texto do resultado da ferramenta com** 5 estratégias** . Ele as testa nesta ordem, e a primeira estratégia habilitada cuja verificação corresponde ao conteúdo decide o resultado:

1. **`fileContent`** : conteúdo de 3 ou mais linhas em que pelo menos uma linha, ignorando o recuo inicial, começa com `import `, `export `, `function `, `class `, `const `, `let `, `var ` ou `return ` (a palavra-chave mais um espaço), ou com `if`, `for` ou `while` seguido por `(` ou ` (`, mantém suas primeiras 20 e últimas 5 linhas, com o meio elidido marcado.
2. **`grepSearch`** : conteúdo com pelo menos uma linha no formato `<path>:<digits>:`, onde o texto antes dos primeiros dois pontos não tem espaço em branco, mantém apenas essas linhas, no máximo 30, seguidas por uma contagem de quaisquer correspondências adicionais e a lista de arquivos correspondentes; todas as outras linhas são descartadas. Uma dessas linhas é suficiente para acionar a estratégia, portanto, uma linha de log começando com um carimbo de data/hora como `12:30:45` também conta.
3. **`shellOutput`** : a saída que contém uma sequência ANSI CSI (`ESC[` depois dígitos ou ponto-e-vírgula e depois uma letra, como em códigos de cores) ou um `$` seguido por espaço em branco em qualquer lugar do texto perde essas sequências (outros escapes, como `ESC[?25l` ou uma sequência de título de janela OSC, são mantidos) e mantém suas últimas 50 linhas, com linhas repetidas consecutivas recolhidas. Como essa verificação é executada antes de `json` e `errorMessage`, JSON ou saída de erro que contém tal `$` nunca os alcança enquanto `shellOutput` está ativado.
4. **`json`** : uma carga útil JSON com mais de 2.000 caracteres que começa com `{` ou `[` (após o espaço em branco opcional) e a análise é resumida: uma matriz de mais de 7 itens mantém seus primeiros 5 e últimos 2 itens e sua contagem total, e um objeto mantém suas primeiras 20 chaves, com cada objeto aninhado ou valor de matriz substituído por um espaço reservado `{…N keys}` (para uma matriz, N é seu comprimento) e um marcador `_remaining_<N>_keys` contando as chaves descartadas após as 20 primeiras. Os valores escalares são copiados inteiros, portanto, um objeto de 20 chaves ou menos, sem valores aninhados, é apenas reindentado — um objeto minificado ganha caracteres e permanece inalterado.
5. **`errorMessage`** : saída que contém, em qualquer lugar e em qualquer letra, `error:`, `error ` (a palavra seguida por um espaço, como em `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ou `traceback` mantém sua primeira linha, as próximas 10 linhas e as 3 últimas, com um marcador `… [N frames elided] …` no lugar das linhas entre elas. O marcador aparece somente quando mais de 13 linhas seguem a primeira linha, portanto, a saída de erro de 14 linhas ou menos não é encurtada (em 12 ou 13 linhas, as últimas 3 linhas repetidas já são mantidas).

Depois de uma estratégia corresponder, mesmo que não economize nada, as estratégias posteriores não são tentadas. Quando a estratégia de correspondência não salva tokens estimados (comprimento ÷ 4, arredondado para cima) — por exemplo, um arquivo semelhante a um código de 25 linhas ou menos, ou uma matriz JSON com mais de 2.000 caracteres com 7 itens ou menos — o mecanismo agressivo mantém o resultado original da ferramenta: ambos os chamadores (`compressAggressive()` e `compressAnthropicToolResultBlock()`) mantêm o original quando `saved` é 0 ou menos, enquanto o próprio `compressToolResult()` ainda retorna a saída dessa estratégia. A etapa do resultado da ferramenta não é a última palavra: o resumidor substituto do mecanismo ainda pode encurtar uma mensagem `tool` ou `function` com mais de 8.192 caracteres (`maxTokensPerMessage`, 2.048, vezes 4).

#### Quando usar

A compactação do resultado da ferramenta é a etapa 1 do mecanismo agressivo (`compressAggressive()` em `open-sse/services/compression/aggressive.ts`), portanto, ela é executada no modo Agressivo e em uma etapa `aggressive` de um pipeline empilhado. Ele compacta mensagens `tool` e `function` em formato OpenAI e o texto dentro de blocos Anthropic `tool_result`. Cada estratégia tem seu próprio switch em `aggressive.toolStrategies`, tudo ativado por padrão. No painel, as opções estão na página do Caveman** Avançado** visualizar enquanto a compactação está ativada e o modo padrão é Agressivo.

### Pipeline empilhado

O modo empilhado é executado** vários motores em sequência** — geralmente RTK primeiro (60-90% de economia na saída da ferramenta), depois Caveman no texto restante (~ 46% de economia de entrada). Composto, esse é o** Faixa elegível de 78-95%** (veja Matemática de Economia Upstream acima): `1 - (1 - 0.60..0.90) × (1 - 0.46)` tem média ≈ 89%.

#### Como funciona

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Quando usar

Use o modo empilhado para:

- Fluxos de trabalho com muitas ferramentas (codificação de agente, pesquisa)
- Processamento em lote sensível ao custo
- Quando você precisa de economia máxima de tokens

Pipelines empilhados são configurados por meio da configuração de compactação `stackedPipeline` global ou por meio de um combo de compactação nomeado atribuído a um combo de roteamento (consulte Substituição por combinação acima) — e não por meio de um `modePack` de combinação automática (esse campo apenas pesa novamente a seleção do modelo de combinação automática e `stacked` não é um nome de pacote válido).

---

## Substituições de Compressão por Combo

Você pode substituir o modo de compressão global **por combo** para ajustar o comportamento
a diferentes casos de uso:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Isso é útil para:

- **Combos de programação**: use o modo `aggressive` para sessões longas
- **Combos de perguntas e respostas rápidas**: use o modo `lite` para respostas rápidas
- **Combos com uso intensivo de ferramentas**: use o modo `stacked` para obter a máxima economia
- **Combos de produção**: deixe a substituição desativada para provedores com cache — o ajuste
  com reconhecimento de cache, que está sempre ativo, rebaixa `aggressive`/`ultra` para `standard` automaticamente
  (não há um modo `cache-aware` selecionável)

---

## Veja Também

- [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Variáveis de ambiente de compressão
- [Guia de Arquitetura](../architecture/ARCHITECTURE.md) — Detalhes internos do pipeline de compressão
- [Guia do Usuário](../guides/USER_GUIDE.md) — Primeiros passos com a compressão
- [Compressão RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confiança, etapa de verificação e recuperação da saída bruta
- [Mecanismos de Compressão](./COMPRESSION_ENGINES.md) — Caveman, RTK, empilhamento, APIs, MCP e painel
- [Formato das Regras de Compressão](./COMPRESSION_RULES_FORMAT.md) — Formato JSON do pacote de regras
- [Pacotes de Idiomas de Compressão](./COMPRESSION_LANGUAGE_PACKS.md) — Regras do Caveman específicas por idioma
