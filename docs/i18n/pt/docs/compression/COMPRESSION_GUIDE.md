# 🗜️ Prompt Compression Guide — OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Poupe automaticamente 15-95% do contexto elegível. Para uma visão geral rápida, consulte a [secção sobre compressão no README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Visão geral

O OmniRoute implementa um pipeline modular de compressão de prompts que é executado **proativamente** antes de os pedidos chegarem aos fornecedores a montante. Isto significa que a poupança de tokens ocorre de forma transparente — sem necessidade de alterar o seu fluxo de trabalho.

```
Pedido do cliente
  → Seletor da estratégia de compressão
    → Substituição por combo? → Utilizar a definição do combo
    → Limiar de ativação automática? → Utilizar o modo automático
    → Modo predefinido? → Utilizar a definição global
    → Desativado? → Ignorar a compressão
  → Modo de compressão selecionado
    → Desativado: Sem compressão
    → Lite: Limpeza segura de espaços em branco/formatação (~15%)
    → Standard: Remoção de conteúdo supérfluo em estilo telegráfico (~30%)
    → Aggressive: Envelhecimento do histórico + resumo (~50%)
    → Ultra: Poda heurística + redução de blocos de código (~75%)
    → RTK: Filtragem baseada em comandos de resultados do terminal/ferramentas (intervalo a montante de 60-90%)
    → Stacked: Pipeline ordenado com vários motores, normalmente RTK seguido de Caveman (intervalo elegível de 78-95%)
  → Pedido comprimido → Fornecedor
```

---

## Modos de compressão

### Desativado

Não é aplicada qualquer compressão. Todas as mensagens passam sem alterações.

### Modo Lite (~15% de poupança, <1ms de latência)

O modo mais seguro — limpeza da formatação. O truncamento dos resultados das ferramentas é sujeito a perdas, pelo que o caminho predefinido
(sem `allow-lossy`, `engine:lite` ou ativação explícita de uma combinação nomeada) executa o modo lite com
`compressToolResults: false`: os resultados anteriores das ferramentas chegam ao fornecedor sem alterações.

| Técnica                  | Descrição                                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Combina linhas em branco consecutivas e espaços à direita                                                                     |
| `dedupSystemPrompt`      | Remove mensagens do sistema duplicadas                                                                                        |
| `compressToolResults`    | Trunca resultados anteriores das ferramentas para o limite do modo lite (com perdas: apenas com ativação explícita no pedido) |
| `removeRedundantContent` | Remove instruções repetidas                                                                                                   |
| `replaceImageUrls`       | Encurta URIs de dados de imagens em base64                                                                                    |

**Ideal para:** Utilização contínua e fluxos de trabalho críticos para a segurança.

### Modo Standard (~30% de poupança)

Inspirado no [Caveman](https://github.com/JuliusBrussee/caveman) — remove palavras de preenchimento e formulações prolixas, preservando o significado:

- Remove palavras de preenchimento ("please", "I think", "basically", "actually")
- Condensa formulações prolixas ("in order to" → "to", "as a result of" → "because")
- Remove atenuações de cortesia ("Would you mind...", "If you could possibly...")
- Mais de 30 regras regex ajustadas para pedidos de programação

**Ideal para:** Fluxos de trabalho diários de programação e equipas preocupadas com os custos.

### Modo Aggressive (~50% de poupança)

Gestão inteligente do histórico para sessões longas:

- **Envelhecimento de mensagens** — as mensagens mais antigas são progressivamente comprimidas
- **Compressão dos resultados das ferramentas** — resultados extensos são truncados ou omitidos (primeiras/últimas linhas,
  filtragem por linhas correspondentes, compactação de chaves JSON)
- **Proteções de integridade estrutural** — garante que os pares `tool_use` + `tool_result` permanecem consistentes
- **Consciência da janela de contexto** — respeita os limites de tokens por modelo

**Ideal para:** Sessões de depuração prolongadas e bases de código de grandes dimensões.

### Modo Ultra (~75% de poupança)

Compressão máxima para cenários críticos em termos de tokens:

- **Poda heurística** — poda de tokens baseada em pontuação para texto corrido
- **Preservação da estrutura** — blocos de código delimitados, código inline, URLs e identificadores são
  marcados e reinseridos literalmente, nunca são podados
- **Camada SLM opcional** — um modelo local pequeno pode aperfeiçoar a poda quando configurado
- Independente do modo Aggressive: não executa envelhecimento de mensagens, compressão de resultados de ferramentas
  nem o sumarizador de recurso (apenas uma falha da camada SLM pode encaminhar uma passagem de recurso através do modo aggressive)

**Ideal para:** Situações em que os limites de contexto são atingidos repetidamente.

### Modo RTK (intervalo upstream de 60-90%)

O modo RTK está otimizado para resultados extensos de ferramentas que aparecem em sessões com agentes de programação:

- Deteta classes de comandos/resultados como `git status`, `git diff`, `git log`, executores de testes,
  compilações de TypeScript/Vite/Webpack, ESLint/Biome/Prettier, auditorias/instalações do npm, registos do Docker, resultados de infraestrutura
  e resultados genéricos da shell
- Aplica pacotes de filtros JSON de `open-sse/services/compression/engines/rtk/filters/`
- Importa filtros do esquema TOML v1 do RTK a partir de ficheiros `filters.toml` do projeto ou globais, com validação de testes inline
  e controlo de confiança para ficheiros do projeto
- Inclui 56 filtros integrados com exemplos de verificação inline
- Remove sequências de controlo ANSI, barras de progresso, linhas repetidas e ruído sem ações relevantes
- Preserva falhas, erros, avisos, ficheiros alterados, resumos e o final de resultados extensos
- Suporta filtros do projeto sujeitos a confiança, filtros globais e recuperação opcional do resultado bruto redigido

**Ideal para:** Sessões de agentes com transcrições de shell, compilação, testes, git, grep e resultados de ficheiros.

### Modo Stacked (intervalo elegível de 78-95%)

O modo Stacked executa vários motores de compressão por uma ordem determinística. O pipeline predefinido é:

```txt
RTK -> Caveman
```

Esta ordem mantém primeiro os resultados do terminal/ferramentas compactos e, em seguida, aplica a condensação semântica do Caveman
ao texto corrido restante do pedido. Os pipelines Stacked podem ser configurados globalmente ou através de combinações de compressão atribuídas a combinações de encaminhamento.

**Ideal para:** Contexto misto com grandes registos de ferramentas, instruções humanas ou resumos do assistente.

## Cálculo das Poupanças a Montante

O OmniRoute documenta as poupanças de compressão de duas fontes: benchmarks de projetos a montante e
a composição dos próprios motores do OmniRoute.

| Fonte   | Valor do README a montante utilizado aqui                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` menos tokens de saída, `65%` de poupança média de saída nos benchmarks, intervalo de `22-87%` e ferramenta de compressão de entrada de `~46%` |
| RTK     | `60-90%` de poupança na saída de comandos; sessão de exemplo com `~118,000 -> ~23,900` tokens, ou `79.7%` poupados (`~80%`)                          |

Para payloads de ferramentas/contexto sobrepostos, a combinação predefinida do OmniRoute encadeia os motores:

```txt
RTK -> Caveman
```

As poupanças combinadas são multiplicativas, não aditivas:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Esse valor de `78-95%` aplica-se quando tanto o RTK como o Caveman conseguem reduzir o mesmo payload de entrada/contexto.
O modo de saída de respostas do Caveman é separado: quando ativado, utilize as poupanças de saída do próprio Caveman (`65%`
em média, `~75%` em destaque, intervalo de `22-87%`). As poupanças totais na faturação dependem da combinação de prompts/saídas.

### O que significa realmente "elegível"

O intervalo de destaque de 15-95% é real, mas aplica-se apenas a conteúdo **redundante ou verboso** — linhas de
erro repetidas, um registo de compilação que repete incessantemente o mesmo aviso, um despejo sobredimensionado de `grep`/leitura de ficheiros. Isto
**não** significa que todos os pedidos permitam poupar esse valor.

Verificado empiricamente (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): uma
execução `stacked` (RTK + Caveman) num bloco `tool_result` com o formato da Anthropic, contendo 300 linhas de
erro idênticas, produziu **95.93% de poupança de tokens / 96.26% de poupança de caracteres** — claramente dentro do intervalo
anunciado. Contudo, o mesmo pipeline executado sobre a saída normal e não redundante de uma ferramenta (uma lista limpa de correspondências de `grep`,
uma leitura curta de um ficheiro, texto de conversação comum) produz corretamente **poupanças próximas de zero**, porque
não existe nada repetitivo para remover e `validateCompression()` (`validation.ts`) recusa enviar uma
reescrita que elimine ou altere blocos de código, URLs, títulos, versões ou identificadores de constantes em MAIÚSCULAS.

Este é um comportamento esperado e seguro, não um erro: uma sessão de programação que leia/pesquise sobretudo ficheiros sem ruído
terá poupanças totais modestas, mesmo com a compressão totalmente ativada, enquanto uma sessão que entre num ciclo de falhas
ou encontre um linter demasiado verboso terá o intervalo completo de 78-95% nesse tráfego. Não utilize a baixa percentagem
de poupança agregada de uma única sessão como prova de que a compressão está mal configurada — verifique primeiro se a
saída subjacente da ferramenta era realmente redundante.

---

## Visualização das Poupanças de Tokens

```
Sem compressão: 47K tokens enviados ao LLM
Com Lite:       40K tokens enviados          (15% poupados — seguro, sempre ativo)
Com Standard:   33K tokens enviados          (30% poupados — regras caveman-speak)
Com Aggressive: 24K tokens enviados          (50% poupados — envelhecimento + sumarização)
Com Ultra:      12K tokens enviados          (75% poupados — poda heurística)
Com RTK:        19K-5K tokens enviados       (60-90% poupados na saída de comandos/ferramentas)
Com Stacked:    10K-2.5K tokens enviados     (intervalo elegível de 78-95% com RTK+Caveman)
```

---

## Configuração

### Painel

Navegue até `Dashboard → Context & Cache`:

- **Caveman** — seleção do modo, pacotes de idiomas, pré-visualização e predefinições globais
- **RTK** — pré-visualização do filtro de comandos, definições de segurança do RTK e catálogo de filtros
- **Compression Combos** — pipelines de motores nomeados atribuídos a combinações de encaminhamento
- **Auto-Trigger Threshold** — ativa automaticamente a compressão quando a contagem de tokens excede o limite

### Substituição por combinação

Em `Dashboard → Context & Cache → Compression Combos`, atribua uma combinação de compressão a uma
combinação de encaminhamento:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Isto permite utilizar compressão empilhada com fornecedores gratuitos/de programação, mantendo o modo
lite nas subscrições pagas.

Esta atribuição de "Per-Combo Override" é um controlo diferente da substituição do **routing-combo compression
mode** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — o esquema do campo também aceita
`rtk`, `stacked` e `omniglyph`) — essa substituição não seleciona um pipeline de
`compression-combo` nomeado; apenas define o campo `compressionMode` consultado por
`resolveCompressionPlan`. Pode ser definida no cartão da combinação (`Dashboard → Combos`) ou, desde
#6760, por combinação de encaminhamento na lista "Assign to routing" em
`Dashboard → Context & Cache → Compression Combos`, imediatamente ao lado da caixa de verificação de atribuição
do pipeline documentada acima. Ambas as superfícies são persistidas através do mesmo endpoint
`PUT /api/combos/{id}`.

### Substituição por pedido

Envie o cabeçalho de pedido `x-omniroute-compression` para substituir o plano de compressão num único
pedido. Tem a precedência mais elevada — sobrepõe-se à substituição da combinação de encaminhamento, ao perfil
ativo, ao acionamento automático e à predefinição do painel. Valores desconhecidos são ignorados (o pedido
nunca é rejeitado) e o comutador principal global continua a controlar tudo: quando a compressão está
globalmente desativada, o cabeçalho não a pode ativar. Valores:

| Valor         | Efeito                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Sem compressão para este pedido.                                                                                         |
| `default`     | O perfil Default derivado do painel (ignora o perfil ativo). Os motores com perdas permanecem desativados.               |
| `safe`        | Igual a omitir o cabeçalho.                                                                                              |
| `allow-lossy` | Mantém o plano de operadores deste pedido, incluindo resumos, filtros de relevância e reescritas de estilo.              |
| `engine:<id>` | Um único motor quando ativado, por exemplo, `engine:rtk`. Esta é a ativação explícita por pedido para esse motor.        |
| `<combo>`     | Uma combinação nomeada, correspondida primeiro pelo nome (sem distinção entre maiúsculas e minúsculas) e depois pelo id. |

Sem `allow-lossy`, `engine:<id>` ou uma combinação nomeada, os motores com perdas não são aplicados. Quando
um Default, acionamento automático ou substituição de encaminhamento com perdas é reduzido, o OmniRoute
mantém as etapas sem perdas reconhecidas do pipeline empilhado configurado, pela ordem configurada. Recorre a
`session-dedup → lite` apenas quando nenhuma etapa sem perdas configurada permanece.

A pré-visualização **Effective pipeline** do painel Settings mostra o plano normal configurado. Quando um
acionamento automático pode ser executado, a mesma pré-visualização também mostra o pipeline efetivo
condicional, para que o painel e a resolução do runtime sem cabeçalho permaneçam alinhados.

O plano aplicado é devolvido no cabeçalho de resposta
`X-OmniRoute-Compression: <mode>; source=<source>`, em que `<source>` é um de
`request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` ou `off`.

### API

```bash
# Obter definições de compressão
curl http://localhost:20128/api/settings/compression

# Atualizar definições de compressão
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pré-visualizar um payload RTK/empilhado específico
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Listar pacotes de filtros RTK
curl http://localhost:20128/api/context/rtk/filters

# Testar diretamente o RTK com metadados de comando opcionais
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## O Que Fica Protegido

O motor de compressão **preserva sempre:**

- ✅ Blocos de código (delimitados e em linha)
- ✅ URLs e caminhos de ficheiros
- ✅ Estruturas JSON e dados estruturados
- ✅ Identificadores e tokens técnicos protegidos
- ✅ Expressões matemáticas
- ✅ Definições de chamadas de ferramentas/funções
- ✅ Prompts de sistema (no modo lite)

A recuperação de resultados em bruto do RTK oculta chaves de API comuns, tokens bearer, tokens do Slack, chaves de acesso da AWS,
palavras-passe, tokens e segredos antes de qualquer informação ser guardada.

---

## Estatísticas de Compressão

Cada pedido comprimido inclui estatísticas nos registos do servidor:

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

## Roteiro de Fases

| Fase    | Modos                                                                                                                                                                | Estado        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Fase 1  | Desativado, Lite                                                                                                                                                     | ✅ Disponível |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                                          | ✅ Disponível |
| Fase 3  | RTK, Stacked, Combinações de Compressão                                                                                                                              | ✅ Disponível |
| Fase 4  | Estilos de Saída, Ultra de nível SLM, infraestrutura de avaliação                                                                                                    | ✅ Disponível |
| Fase 4C | Orçamento de contexto adaptativo ("seletor") — motor de computação + API (`contextBudget` em `PUT /api/settings/compression`) + controlos de modo/política no painel | ✅ Disponível |

---

## Agradecimentos

As regras de compressão do modo Standard são inspiradas no **[Caveman](https://github.com/JuliusBrussee/caveman)** de **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ mais de 51 mil) — o projeto viral "porquê usar muitos token quando poucos token fazem serviço". O Caveman indica `~75%` menos tokens de saída, uma poupança média de `65%` nos tokens de saída em testes de referência, um intervalo de `22-87%` na saída e uma ferramenta de compressão de entrada de `~46%`.

O modo RTK é inspirado no **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** da **[RTK AI](https://github.com/rtk-ai)** — o projeto de compressão de alto desempenho para resultados de comandos de terminal, compilação, testes, git e filtragem de resultados de ferramentas. O RTK indica poupanças de `60-90%`, com a sessão de exemplo no respetivo README a demonstrar uma poupança de `~80%`.

---

## Sistemas avançados de compressão

Para além dos 7 modos descritos acima (a fonte também aceita os modos `codex-responses` e `omniglyph`, que este guia não cobre), as secções abaixo cobrem características que funcionam dentro ou em conjunto com estes modos: Compressão de resultados de ferramentas e Envelhecimento progressivo são os passos 1 e 2 do mecanismo agressivo (modo agressivo e um passo `aggressive` de um pipeline empilhado), o pipeline empilhado é a forma como o modo empilhado é executado, a compressão com reconhecimento de cache faz o downgrade `aggressive` e `ultra` para `standard` para os fornecedores de armazenamento em cache enquanto a compressão está ativada, e o modo de saída e os estilos de saída do Caveman são instruções opcionais de prompt do sistema, desativadas por defeito, que moldam a saída do modelo em vez de comprimir o pedido.

### Compressão com reconhecimento de cache

Alguns fornecedores (como Anthropic com cache imediato) suportam** cache de prompt** , o que permite armazenar em cache partes do prompt para reduzir os custos e a latência. Quando a cache está ativada, a compressão agressiva pode realmente** magoar** desempenho porque altera os tokens armazenados em cache, invalidando a cache.

O módulo `cachingAware.ts` resolve isso por** detetar contexto de cache** e** ajustando a estratégia de compressão** de acordo.

#### Como funciona

1. **Detetar contexto de cache** — Verifica o corpo do pedido em busca de marcadores `cache_control`
2. **Identifique os fornecedores de cache** — Verifica se o fornecedor de destino suporta cache
3. **Ajustar estratégia** — faz downgrade `aggressive`/`ultra` para `standard` para fornecedores de cache
4. **Ignorar o prompt do sistema** Os prompts do sistema — são geralmente armazenados em cache, por isso não os comprima

O auxiliar de estratégia também devolve um sinalizador `deterministicOnly`, mas o construtor de planos consome apenas a estratégia — nada a jusante lê o sinalizador hoje.

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

A compressão com reconhecimento de cache é** sempre ligado** — nenhuma configuração necessária. Entra em ação sempre que a compressão está ativada e o fornecedor de destino suporta a cache de prompt (Anthropic, OpenAI, etc.); os marcadores `cache_control` explícitos não são necessários — um fornecedor de cache sozinho aciona o downgrade, e os marcadores por si só nunca o fazem (a deteção de marcadores alimenta a telemetria da cache, não a decisão estratégica).

OpenRouter conta como um fornecedor de cache apenas para os modelos `anthropic/*` : os pedidos de código Claude mantêm os seus pontos de interrupção `cache_control` (4 no máximo) e o guard protege o prefixo, enquanto todas as outras famílias OpenRouter (`openai/`, `google/`, `qwen/`, …) permanecem despojadas e desprotegidas.

### Envelhecimento Progressivo

As conversas longas acumulam muitos turnos de mensagens, mas os turnos mais antigos tornam-se menos relevantes. O módulo `progressiveAging.ts`** degrada mensagens por distância de rotação** (distância medida do final da conversa). Com os padrões enviados (`verbatim: 2, light: 2, moderate: 3`):

- **Últimos 2 turnos (distância ≤ 2)** : Mantido literalmente
- **Distância 3** : Compressão Caveman (remoção de enchimento)
- **Distância 4 +** : Mensagens do assistente resumidas; mensagens dos utilizadores reduzidas à primeira linha, com um limite de 120 caracteres; outros papéis intocados. Os avisos do sistema, as mensagens antigas e a mensagem mais recente do utilizador são sempre mantidos na íntegra, independentemente da distância. Nada é eliminado de imediato e a banda `light` fica inacessível com os padrões fornecidos (`light` é igual `verbatim`).

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

O envelhecimento progressivo é** sempre ligado** para o modo `aggressive` — é o passo 2 de `compressAggressive()`. O modo Ultra não o executa. É particularmente eficaz para:

- Sessões de codificação de longa duração
- Conversas de vários dias
- Fluxos de trabalho agentes com muitas chamadas de ferramentas

### Modo de saída do homem das cavernas

O modo de saída Caveman adiciona** instruções de prompt do sistema** que solicitam ao próprio modelo uma saída concisa — o nível `lite` pede respostas concisas que mantêm frases completas, `full` pede para "responder concisamente como um homem das cavernas inteligente" e `ultra` pede uma saída telegráfica; as instruções apenas perguntam, não podem garantir isso. Os pedidos recebem-nos através de `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`): `open-sse/handlers/chatCore.ts` resolve primeiro a seleção com o shim de retrocompatibilidade (`resolveOutputStyleSelection()` em `open-sse/services/compression/outputStyles/backCompat.ts`), que, enquanto `outputStyles` está vazio, mapeia um `cavemanOutputMode` habilitado para o estilo de saída `terse-prose` em `cavemanOutputMode.intensity` (ver Back-compat abaixo); uma seleção `outputStyles` não vazia é utilizada tal como está, e `cavemanOutputMode.enabled` e `intensity` não têm qualquer efeito, enquanto a sua alternância `autoClarity` ainda se aplica. `outputMode.ts` contém os textos de instrução (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), o bypass de conteúdo e o auxiliar de posicionamento que a injecção utiliza; o seu próprio injetor `applyCavemanOutputMode()` não tem chamador de produção.

#### Como funciona

Este modo não compacta a entrada. Adiciona um bloco de instruções ao prompt do sistema (consulte Como funciona a injeção abaixo), e qualquer modo de compressão de entrada selecionado para o pedido será ainda executado mais tarde, no corpo que agora carrega o bloco. Antes da cláusula de limites partilhados com que cada nível termina, o nível `full` em inglês diz:

> "Responda concisamente como um homem das cavernas inteligente. Descarte artigos (a/an/the), preenchimento (just/really/basically/actually/simply), gentilezas, cobertura. Fragmentos OK. Sinónimos curtos (grande, não extenso, fixar, não implementar). Mantenha toda a substância técnica, código, erros, URLs, identificadores exatos."

Isto funciona particularmente bem para:

- Geração de código (saída terser = menos tokens)
- Perguntas e respostas rápidas (sem necessidade de explicações elaboradas)
- Processamento em batch (maximizar o rendimento)

#### Quando usar

O modo de saída do homem das cavernas é** aceitar** . Com a compressão ativada (`enabled: true`, a alternância principal na página Definições de compressão), ative-a com `cavemanOutputMode.enabled`; `intensity` escolhe `lite`, `full` ou `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Um combo de compressão** Modo de saída** toggle (`outputMode`, level in `outputModeIntensity`) define a mesma opção para os pedidos aos quais se aplica o combo, e a ferramenta `omniroute_set_compression_engine` MCP escreve-a através do seu argumento booleano `outputMode`. Uma seleção `outputStyles` não vazia tem precedência sobre esta opção. No painel, ativando o** Prosa concisa** o estilo de saída injeta o mesmo bloco (consulte Estilos de saída abaixo).

### Estilos de saída (catálogo)

O modo de saída do Caveman acima é o** caminho legado de estilo único** . A Fase 4 generalizou-o num catálogo de estilos de saída que podem ser compostos: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Cada estilo é uma instrução do sistema que solicita ao próprio modelo uma saída mais barata; os estilos podem ser habilitados em conjunto e injetados na ordem do catálogo.

| Estilo                                           | `id`            | O que faz                                                                                                                                                                                                                                                                          | Línguas de instrução                          |
| ------------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Prosa concisa                                    | `terse-prose`   | Solte filler/articles/hedging; manter a substância técnica exata. Mesmo texto do modo de saída legado do homem das cavernas (referenciado, não digitado novamente).                                                                                                                | pt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menos código                                     | `less-code`     | escada YAGNI : menor mudança de trabalho, sem abstracções não solicitadas.                                                                                                                                                                                                         | pt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Rabo de cavalo (desenvolvedor sénior preguiçoso) | `ponytail`      | "O melhor código é o código nunca escrito": reutilizar > rewrite, causa raiz sintoma >, diferença de trabalho mais curta.                                                                                                                                                          | pt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Tenho ADHD (ação primeiro)                       | `i-have-adhd`   | Ação primeiro (command/path/snippet antes da prosa), passos limitados numerados, ONE passo concreto seguinte, não preamble/recap/closers. Adaptado de [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT).                                                           | pt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Filtro anti-slop UI                              | `antislop-ui`   | Toda a técnica visual deve passar por um teste de finalidade (hierarquia, identidade, legibilidade); sem gradients/glass/glow padrão, paleta limitada, sem layouts de modelo. Ambos os estilos anti-slop acrescentam um limite sem controlos mortos/sem reivindicações fabricadas. | pt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Cópia anti-slop e filtro humano                  | `antislop-copy` | Cópia específica (sem travessão, CTAs genérico, chavões, fechos de chatbot, factos inventados) mais regras de pessoas: contraste WCAG AA, foco visível, alcance do teclado, estados empty/loading/error, refluxo móvel.                                                            | pt, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Conciso CJK (文言)                               | `terse-cjk`     | resposta `full`/`ultra` em chinês clássico (文言); `lite` pede apenas respostas breves, sem palavras funcionais, gentilezas ou enfeites.                                                                                                                                           | zh (localizado, ver abaixo)                   |

Cada estilo vem com três níveis de intensidade — `lite`, `full`, `ultra` — e cada nível termina com a cláusula de limites partilhados (`SHARED_BOUNDARIES` em `outputMode.ts`), que mantém blocos de código, caminhos de ficheiros, comandos, erros e URLs exatos. Os textos de nível `terse-prose` e `terse-cjk` acrescentam identificadores a esta lista.

`terse-cjk` é controlado por localidade para `zh` em dois locais. A página Definições de compressão lista a sua linha apenas quando o idioma UI do painel é chinês (`zh-CN` ou `zh-TW`) e `applyOutputStyles()` injeta-a apenas quando o idioma resolvido do pedido (consulte Seleção de idioma abaixo) é `zh`. Ocultar a linha não limpa uma seleção `terse-cjk` guardada: as definições API aceitam qualquer ID de estilo e guardar outros estilos na página mantém-no. No momento do pedido, a verificação do idioma `applyOutputStyles()` é a única porta de localidade.

#### Como funciona a injeção

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) resolve a selecção em relação ao catálogo (ids desconhecidos e estilos incompatíveis com a localidade são descartados, nunca um erro; uma selecção que não resolve nenhum estilo deixa o corpo inalterado, ignorado como `no_styles`), concatena as instruções seleccionadas na ordem do catálogo, anexa a cláusula de limites** uma vez** (mais a cláusula de segurança, `SAFETY_BOUNDARIES` ou a sua tradução, quando `less-code` ou `ponytail` é seleccionado) e inicia o bloco com um único marcador de idempotência (`[OmniRoute Output Styles]`), pelo que a reaplicação é uma operação autónoma. Quando o idioma resolvido (ver Seleção de idioma abaixo) tem uma tradução, é injetada a instrução localizada em vez do inglês.

Num corpo com um array `messages` não vazio, a verificação de idempotência é executada antes do desvio de conteúdo: quando o marcador `[OmniRoute Output Styles]` já se encontra no campo `system` de nível superior (uma string ou um array de blocos de conteúdo) ou numa mensagem do sistema com conteúdo de string, o corpo permanece inalterado como `already_applied` e não é executada qualquer verificação de palavras-chave. Caso contrário, um desvio de conteúdo (`shouldBypassCavemanOutputMode()` em `open-sse/services/compression/outputMode.ts`) verifica o texto das três últimas mensagens, qualquer que seja a sua função, e salta os estilos para todo o turno quando o texto corresponde às suas palavras-chave de segurança, acção irreversível ou esclarecimento, ou uma sequência sensível à ordem: `first`, `then`, `after that`, `before`, `rollback` ou `backup` seguido dentro de 240 caracteres por `delete`, `drop`, `migrate`, `deploy` ou `release`. O bypass funciona enquanto o** Ignorar a clareza automática** toggle (`cavemanOutputMode.autoClarity`, activado por defeito) está activado; desativar o botão de alternância ignora a verificação de palavras-chave.

Quando o bypass permite a passagem, `placeSystemInstruction()` (mesmo ficheiro), que nunca cria um novo `messages[0]`, coloca o bloco no primeiro que encontrar:

1. Uma mensagem principal do sistema com conteúdo de string: o bloco é anexado após o seu texto.
2. O campo `system` de nível superior: o bloco é anexado após o texto de uma string ou adicionado como um novo bloco de texto a uma matriz de blocos de conteúdo.
3. A primeira mensagem posterior do sistema com conteúdo de string: o bloco é anexado após o seu texto.
4. Nenhuma das opções anteriores: o bloco entra numa nova mensagem do sistema no final de `messages`.

Num corpo sem matriz `messages` (ou com matriz vazia), não é executado qualquer desvio de conteúdo e não é consultado um campo `system` de nível superior. O bloco é anexado após o texto de um campo de string `instructions`, a menos que esse campo já contenha o marcador `[OmniRoute Output Styles]`, caso em que o corpo permanece inalterado como `already_applied`. Quando o corpo não possui um campo de string `instructions`, mas transporta `input` (uma string ou um array), o bloco passa a ser `instructions`, substituindo qualquer valor que não seja de string contido nesse campo. Um corpo sem um campo de string `instructions` nem uma string ou array `input` é deixado inalterado e ignorado como `no_messages`.

#### Como habilitar

No painel:** Contexto de compressão Configurações de compressão →** (`/dashboard/context/settings`), Secção de estilos de saída: uma linha por estilo com um comutador on/off e um selector de nível. Os estilos são injetados enquanto a compressão está ativada (a alternância master da página, `enabled`). O** Ignorar a clareza automática** alternar está no** Homem das cavernas** página (`/dashboard/context/caveman`), no seu** Modo de saída** cartão. Programaticamente, a configuração de compressão persiste na seleção como:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Retrocompatibilidade: enquanto `outputStyles` está vazio, a configuração herdada `cavemanOutputMode.enabled` é mapeada para `terse-prose` em `cavemanOutputMode.intensity`. O bloco começa então com o marcador `[OmniRoute Output Styles]`, onde o injector `applyCavemanOutputMode()` legado escreveu `[OmniRoute Caveman Output Mode]`. Abaixo do marcador, o texto corresponde à injeção de legado em en, pt-BR, es, de, fr, it, ru, id e vi; em ja e zh transporta um espaço extra antes da cláusula limite. `terse-prose` traduz-se em pt-BR, es, de, fr, it, ru, zh, ja, id e vi, então um pedido cujo idioma resolvido é `hu` obtém o texto em inglês onde o injetor legado usou o húngaro.

Seleção de idioma no estilo de saída (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): com `languageConfig.enabled` ativado, `autoDetect` faz uma amostra da última mensagem do utilizador no array `messages` do pedido que contém texto (conteúdo de string ou o `text` das suas partes de conteúdo) e executa o detetor do motor Caveman (`detectCompressionLanguage()`) sobre o mesmo. O detector devolve `zh` para texto com caracteres Han e sem kana; caso contrário, devolve qualquer um dos `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` e `id` que tenha mais correspondências de dicas e `en` quando nenhuma correspondência — texto ele não pode classificar fica em inglês, nunca `defaultLanguage` e `vi` nunca é detectado, embora os estilos enviem texto `vi`. Um corpo Responses API mantém os seus turnos em `input`, que não é amostrado, pelo que fica `defaultLanguage`, depois inglês. Quando nenhuma mensagem do utilizador em `messages` tem texto, ou com `autoDetect` desativado, aplica-se `defaultLanguage` e depois em inglês. Com `languageConfig.enabled` desativado, o idioma é o inglês — a menos que se aplique um combo de compressão ao pedido (um combo atribuído ao combo de encaminhamento do pedido ou o combo de compressão padrão chatCore regressa ao pipeline empilhado integrado): a aplicação de um combo ativa `languageConfig.enabled` para esse pedido e define `defaultLanguage` a partir dos pacotes de idioma do combo (o valor guardado se for um dos pacotes do combo, caso contrário, o primeiro pacote do combo, cujo padrão é `en`), enquanto o `autoDetect` guardado (ativado por defeito) ainda se aplica. O mecanismo de entrada do Caveman escolhe a sua linguagem de pacote de regras de forma diferente — por parte do texto e, com a deteção automática desativada, é bloqueado em `enabledPacks`.

A matriz de linguagem de estilo × é fixada por `tests/unit/compression/output-styles-i18n-matrix.test.ts`: todo o estilo de catálogo necessita de uma entrada no `BASELINE_LANGUAGES` do teste; um estilo que não seja controlado por localidade deve enviar uma tradução pt-BR (o `terse-cjk` controlado por localidade está isento desta regra), a menos que esteja listado em `KNOWN_ENGLISH_ONLY`, que pode conter apenas estilos sem qualquer tradução — um estilo listado que tenha qualquer tradução falhada no teste; e um estilo falha o teste quando perde um idioma listado na sua entrada `BASELINE_LANGUAGES`. Para adicionar um estilo, consulte [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compressão do resultado da ferramenta

`compressToolResult()` em `open-sse/services/compression/toolResultCompressor.ts` comprime o texto do resultado da ferramenta com** 5 estratégias** . Testa-os por esta ordem, e a primeira estratégia ativada cuja verificação corresponde ao conteúdo decide o resultado:

1. **`fileContent`** : conteúdo de 3 ou mais linhas em que pelo menos uma linha, ignorando o avanço inicial, começa por `import `, `export `, `function `, `class `, `const `, `let `, `var ` ou `return ` (a palavra-chave mais um espaço), ou por `if`, `for` ou `while` seguido de `(` ou ` (`, mantém as suas primeiras 20 e últimas 5 linhas, com o meio elidido marcado.
2. **`grepSearch`** : conteúdo com pelo menos uma linha no formato `<path>:<digits>:`, em que o texto antes dos primeiros dois pontos não tem espaço em branco, mantém apenas essas linhas, no máximo 30, seguidas de uma contagem de quaisquer correspondências adicionais e da lista de ficheiros correspondentes; todas as outras linhas são descartadas. Uma destas linhas é suficiente para acionar a estratégia, pelo que uma linha de registo que começa com um carimbo de data/hora como `12:30:45` também conta.
3. **`shellOutput`** : a saída que contém uma sequência ANSI CSI (`ESC[` depois dígitos ou ponto e vírgula e depois uma letra, como nos códigos de cor) ou um `$` seguido de espaço em branco em qualquer parte do texto perde essas sequências (outros escapes, como `ESC[?25l` ou uma sequência de título de janela OSC, são mantidos) e mantém as suas últimas 50 linhas, com linhas repetidas consecutivas recolhidas. Como esta verificação é executada antes de `json` e `errorMessage`, JSON ou saída de erro que contenha tal `$` nunca os alcança enquanto `shellOutput` está activado.
4. **`json`** : uma carga útil JSON com mais de 2000 caracteres que começa com `{` ou `[` (após o espaço em branco opcional) e a análise é resumida: uma matriz de mais de 7 itens mantém os seus primeiros 5 e últimos 2 itens e a sua contagem total, e um objeto mantém as suas primeiras 20 chaves, com cada objeto aninhado ou valor de matriz substituído por um espaço reservado `{…N keys}` (para uma matriz, N é o seu comprimento) e um marcador `_remaining_<N>_keys` contando as chaves descartadas após 20 primeiras. Os valores escalares são copiados inteiros, pelo que um objeto de 20 chaves ou menos, sem valores aninhados, é apenas reindentado — um objeto minificado ganha caracteres e permanece inalterado.
5. **`errorMessage`** : saída que contém, em qualquer lugar e em qualquer letra, `error:`, `error ` (a palavra seguida de um espaço, como em `no error found`), `[error]`, `exception:`, `exception `, `[exception]` ou `traceback` mantém a sua primeira linha, as 10 linhas seguintes e as 3 últimas, com um marcador `… [N frames elided] …` no lugar das linhas entre elas. O marcador só aparece quando mais de 13 linhas seguem a primeira linha, pelo que a saída de erro de 14 linhas ou menos não é encurtada (em 12 ou 13 linhas, as últimas 3 linhas repetidas já são mantidas).

Depois de uma estratégia corresponder, mesmo que não poupe nada, as estratégias posteriores não são tentadas. Quando a estratégia de correspondência não guarda tokens estimados (comprimento ÷ 4, arredondado para cima) — por exemplo, um ficheiro semelhante a um código de 25 linhas ou menos, ou uma matriz JSON com mais de 2000 caracteres com 7 itens ou menos — o mecanismo agressivo mantém o resultado original da ferramenta: ambos os chamadores (`compressAggressive()` e `compressAnthropicToolResultBlock()`) mantêm o original quando `saved` é 0 ou menos, enquanto o próprio `compressToolResult()` ainda retorna a saída dessa estratégia. A etapa do resultado da ferramenta não é a última palavra: o resumidor substituto do motor pode ainda encurtar uma mensagem `tool` ou `function` com mais de 8.192 caracteres (`maxTokensPerMessage`, 2.048, vezes 4).

#### Quando usar

A compressão do resultado da ferramenta é o passo 1 do mecanismo agressivo (`compressAggressive()` em `open-sse/services/compression/aggressive.ts`), pelo que é executado no modo Agressivo e num passo `aggressive` de um pipeline empilhado. Comprime as mensagens `tool` e `function` em formato OpenAI e o texto dentro de blocos Anthropic `tool_result`. Cada estratégia tem o seu próprio switch em `aggressive.toolStrategies`, tudo ativado por defeito. No painel, as opções estão na página do Caveman** Avançado** visualizar enquanto a compressão está ativada e o modo predefinido é Agressivo.

### Pipeline empilhado

O modo empilhado é executado** vários motores em sequência** — geralmente RTK primeiro (60-90% de poupança na saída da ferramenta), depois Caveman no texto restante (~ 46% de poupança de entrada). Composto, este é o** Faixa elegível de 78-95%** (ver Matemática de Economia a montante acima): `1 - (1 - 0.60..0.90) × (1 - 0.46)` tem uma média ≈ 89%.

#### Como funciona

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Quando usar

Utilize o modo empilhado para:

- Fluxos de trabalho com muitas ferramentas (codificação de agentes, pesquisa)
- Processamento em lote sensível ao custo
- Quando precisa de poupança máxima de tokens

Os pipelines empilhados são configurados através da configuração de compressão `stackedPipeline` global ou através de um combo de compressão nomeado atribuído a um combo de encaminhamento (consulte Substituição por combinação acima) — e não através de um `modePack` de combinação automática (este campo apenas pesa novamente a seleção do modelo de combinação automática e `stacked` não é um nome de pacote válido).

---

## Substituições de Combinação para Compressão

Pode substituir o modo de compressão global **por combinação** para ajustar o comportamento
a diferentes casos de utilização:

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

Isto é útil para:

- **Combinações de programação**: Utilize o modo `aggressive` para sessões longas
- **Combinações de perguntas e respostas rápidas**: Utilize o modo `lite` para respostas rápidas
- **Combinações com utilização intensiva de ferramentas**: Utilize o modo `stacked` para obter a máxima poupança
- **Combinações de produção**: deixe a substituição desativada para fornecedores com cache — o ajuste com reconhecimento de cache, sempre ativo, reduz automaticamente `aggressive`/`ultra` para `standard`
  (não existe um modo `cache-aware` selecionável)

---

## Consulte Também

- [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Variáveis de ambiente de compressão
- [Guia de Arquitetura](../architecture/ARCHITECTURE.md) — Funcionamento interno do pipeline de compressão
- [Guia do Utilizador](../guides/USER_GUIDE.md) — Introdução à compressão
- [Compressão RTK](./RTK_COMPRESSION.md) — Filtros RTK, modelo de confiança, porta de verificação e recuperação da saída não processada
- [Motores de Compressão](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP e painel
- [Formato das Regras de Compressão](./COMPRESSION_RULES_FORMAT.md) — Formato JSON dos pacotes de regras
- [Pacotes de Idiomas de Compressão](./COMPRESSION_LANGUAGE_PACKS.md) — Regras Caveman específicas de cada idioma
