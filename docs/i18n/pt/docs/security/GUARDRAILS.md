# Guardrails (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte da verdade:** `src/lib/guardrails/`

Os guardrails impõem transformações de segurança, políticas e conteúdo na fronteira entre OmniRoute e os fornecedores upstream. Cada guardrail pode inspecionar (e opcionalmente rejeitar, transformar ou anotar) as cargas úteis de pedido (`preCall`) e as respostas a montante (`postCall`).

O sistema é** falha aberta** : se um guardrail for lançado durante a execução, o registo registará o erro e continuará com o próximo guardrail em vez de falhar o pedido. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente. A única exceção é um pedido abortado: quando o `signal` do chamador é abortado, um guardrail de lançamento rejeita a execução do gancho em vez de ser ignorado.

Os ganchos fazem** não** executado em todas as rotas ou em todas as respostas. Leia [a Cobertura e os limites](#coverage-and-limits) antes de confiar numa proteção como controlo de segurança.

## Guarda-corpos embutidos

O registo carrega automaticamente estas proteções por ordem de prioridade na importação (consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Estágio(s)     | Ficheiro                  |
| ---------- | ------------------- | -------------- | ------------------------- |
| `1`        | `agent-guard`       | `preCall`      | `agentGuard/guardrail.ts` |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`         |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`          |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`          |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`            |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`      |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts`     |

Os números de prioridade mais baixa são executados** primeiro** .

### Ponte de Visão (`visionBridge.ts`) — Modalidade Ponte PR-1

O modelo base GLM 5.3 e `glm-5.3-{low,high,max}` têm metadados `supportsVision:false` registry/spec explícitos. As variantes GLM 5.3 Flash permanecem modelos de visão nativa. A rota `/v1/messages` do código Claude entra na cadeia de proteção pré-chamada `handleChat` partilhada** antes** Tradução de Claude para a OpenAI; imagens aninhadas de resultados da ferramenta `Read` devem ser descritas ou tratadas antes que a tradução as eleve ao conteúdo OpenAI `image_url` (#17069).

Intercepta pedidos de imagens destinadas a** modelos sem visão** e redireciona todo o pedido para um modelo com capacidade de visão ou substitui as partes da imagem por descrições de texto produzidas por um modelo de visão configurável antes da chamada upstream. Isto permite que os fornecedores apenas de texto lidem com cargas multimodais de forma transparente.

Fluxo:

1. Ignore se o modelo de destino já suporta a visão (a menos que apareça na lista de pontes forçadas `isVisionBridgeForcedModel`).
2. Extraia partes da imagem através do `extractImageParts(messages)` (`visionBridgeHelpers.ts`), que delega no** detector de media unificado** `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a única fonte de verdade partilhada com o filtro de compatibilidade combinado. A extracção é permitida nas formas `replaceImageParts` pode emendar de volta (o contrato de substituição de extracção ↔): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` e Respostas API `input_image`. As imagens correspondentes aninhadas nas saídas da ferramenta Claude Code `tool_result.content` e Responses são também extraídas e substituídas nos seus caminhos originais; formas apenas indicadoras são materiais de filtro combinado e não são extraídas. Salte se nenhum for encontrado.
3. Resolva a configuração do tempo de execução através do `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): novas chaves de definições `modalityBridge*` vencem; as chaves `visionBridge*` herdadas permanecem um** fallback de um ciclo** (janela de reversão). Ignore antes de qualquer passagem de suporte quando a ponte estiver desativada.
4. O selector de modo (`modalityBridgeVisionMode`, ver tabela abaixo) decide redireccionar versus descrever. Reroute retorna `modifiedPayload` com apenas `model` trocado, mais meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limite as imagens em `maxImages`, componha o prompt com reconhecimento de tarefa, consulte a cache de descrição, chame o modelo de vista** em paralelo** (`Promise.allSettled`) e injecte partes de texto `[Image N]: <description>` nos seus lugares. Uma descrição com falha produz `null`: a imagem em bruto é preservada para alvos unknown/vision-capable (#4012), mas um** segmentação direta apenas texto confirmada** ou zero-vision combo obtém um stub de texto `(unavailable — no vision-capable provider connected)` explícito para cada imagem não descrita, incluindo falhas parciais e imagens para além do limite de chamada de descrição (#17069). O substituto de descrição do combo com todas as falhas existente mantém-se em vigor (#8430).
6. Retorna `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selector de modo (`modalityBridgeVisionMode`)

| Modo       | Predefinição | Comportamento                                                                                                                                                                                                                                                                                                               |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Heurística herdada, intocada (#6640/#7204): os modelos não-combo/`auto/` redirecionam para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (depois descreva); os alvos do combo descrevem sempre.                                                                                  |
| `describe` |              | Descreva sempre — o bloco de redireccionamento será totalmente ignorado; o modelo escolhido pelo utilizador responde sempre.                                                                                                                                                                                                |
| `reroute`  |              | Forçar novo encaminhamento: o guarda do modelo mantido credenciado é ignorado. O redireccionamento-** objetivo** O protector de credenciais ainda aplica — quando não existe nenhum alvo de visão utilizável, a ponte bloqueia com um erro claro em vez de descrever ou enviar imagens brutas para um alvo apenas de texto. |

Modos forçados em curto-circuito** antes** é executada a heurística automática; O comportamento `auto` é idêntico em bytes ao guardrail pre-PR-1.

#### Âmbito da chave API (`visionBridgeKeyScope.ts`)

Quando a chave API do chamador restringe `allowedConnections`, conjuntos de cotas (`allowedQuotas`) ou modelos (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), a ponte apenas escolhe o redireccionamento e descreve os modelos que a chave pode utilizar, nas ligações que a chave pode utilizar. A chamada de descrição passa sempre pelo auto-loop OmniRoute com o cabeçalho `x-omniroute-self-loop-key-id`, pelo que o pedido de chat recebido impõe novamente a ligação dessa chave e a política de modelo. `enforceApiKeyPolicy()` honra este cabeçalho apenas juntamente com o portador do auto-loop, pelo que apenas pode restringir o acesso e um ID que não resolva é rejeitado.

Se não for permitido nenhum modelo de visão para a chave, um** destino apenas de texto confirmado** rejeita o pedido de imagem localmente com um HTTP 400 limpo em vez de encaminhar bytes de imagem para um upstream incapaz (#17069). Para alvos com capacidade de visão nativa ou desconhecida, o caminho de descrição mantém o seu comportamento anterior de falha aberta (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Os pedidos sem chave e as chaves sem estas restrições comportam-se exatamente como antes.

#### Prompt de descrição com reconhecimento de tarefas (`modalityBridgeVisionTaskAware`)

Predefinição** VERDADE** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) anexa o texto do** última mensagem do utilizador** (truncado para 500 caracteres) para o pedido de descrição base, direcionando a descrição para o que o utilizador realmente pediu (padrão codex-vision-proxy) e pedindo ao modelo de visão para transcrever o texto visível. Com o sinalizador — desativado ou sem texto do utilizador — o aviso base é utilizado inalterado.

O pedido compatível com OpenAI do próprio autoloop de descrição (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) solicita sempre `image_url.detail: "high"` — incondicionalmente, para cada caller/provider, não bloqueado em qualquer sinal do cliente. A amostragem com poucos detalhes degrada a precisão OCR exatamente para a tarefa de transcrição de texto que este prompt solicita, pelo que a chamada de descrição em si solicita sempre muitos detalhes, independentemente do nível de detalhe utilizado pelo pedido de entrada original. Isto afeta apenas o corpo do pedido de descrição interna; isto não altera a forma como OmniRoute encaminha o próprio `image_url.detail` do chamador no pedido primário — este padrão é aplicado separadamente e apenas para clientes OpenCode detectados, em `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). A ramificação em formato de fio Anthropic do autoloop de descrição não tem campo `detail` e não é afetada por nenhum dos padrões.

#### Descrever o limite de saída (`modalityBridgeVisionMaxChars`)

| Chave                          | Predefinição | Intervalo        |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` ou 100–50000 |

`0` (padrão) significa** sem limite** — a descrição devolvida por `callVisionModel()` é passada sem modificação, preservando o comportamento existente. Qualquer valor no intervalo de 100 a 50.000 trunca a descrição com um sufixo `…` antes de ser novamente emendada como `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`). Aumente isto para tarefas OCR com muitos detalhes, onde o modelo a jusante precisa da transcrição completa; reduza-o para o uso de tokens ligados em modelos de visão tagarelas. O campo do painel encontra-se no painel Avançado do separador Visão (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) e fixa qualquer valor entre 1 e 99 até ao 100º piso, deixando um `0` explícito intocado — `0` é um valor Zod válido por si só (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), e não apenas o padrão "não definido".

#### Descrever o cache (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL na memória para as saídas descritas, partilhadas em todo o processo. Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` com enquadramento de prefixo de comprimento (sem colisões de limite de campo). O componente do modelo é o** configurado** modelo de ponte, e não o modelo que realmente respondeu — `callVisionModel` pode recorrer internamente e a codificação por tentativa fragmentaria a cache. As descrições com falha nunca são armazenadas em cache. Configurações:

| Chave                           | Predefinição | Intervalo |
| ------------------------------- | ------------ | --------- |
| `modalityBridgeCacheEnabled`    | `true`       | —         |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000   |

#### Normalização remota de imagem (self-loop describe/base64 fetch)

Quando a ponte procura um** remoto** a própria imagem — o Anthropic descreve a auto-chamada e a conversão base64 do formato claude-wire (`ensureBase64ImagesForClaudeWire`), ambos via `fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — os dados resultantes URI são passados por `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) antes de serem incorporados no pedido do modelo de visão. As imagens sobredimensionadas são reduzidas para um** Borda longa de 2048px** (correspondente ao limite de redimensionamento OpenAI/Anthropic já aplicado no lado do servidor), que corta o upload bytes/latency sem alterar o que o modelo de vista vê. O redimensionamento utiliza `sharp`, carregado através de importação dinâmica: numa plataforma onde o seu binário nativo falha o carregamento, `normalizeDataUri()`** nunca joga** — ele retorna para uma passagem dos bytes originais, pelo que o caminho describe/base64-conversion continua sempre a funcionar. Os bytes que não são de imagem (uma pesquisa que não retornou uma imagem descodificável) também passam intactos. Esta normalização tem como âmbito imagens que a ponte procura para a sua própria auto-chamada — e nunca é aplicada à carga útil de passagem bruta do chamador, consistente com o princípio de mutação apenas opt-in (Hard Rule #20).

#### Migração do esquema + de configurações

As novas chaves `modalityBridge*` são validadas pelo Zod em `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o grupo `modalityBridgeAudio*` utilizado pelo Audio Bridge. A migração `141_modality_bridge_settings.sql` copia os valores `visionBridge*` herdados existentes para as novas chaves correspondentes (idempotente, nunca substitui um valor `modalityBridge*` definido pelo operador); as chaves herdadas permanecem aceites como substituto de leitura para um ciclo de lançamento.

#### Estatísticas + do cabeçalho de transparência

As respostas transformadas por descrição transportam `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construída por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`, carimbada por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`). As solicitações redirecionadas são obtidas** Não** cabeçalho — a carga útil não foi alterada e a troca do modelo já é visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gestão, mesmo nível de `GET /api/settings`) devolve os contadores por modalidade na memória `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e `video`. `averageLatencyMs` utiliza `latencySamples`, nem todas as tentativas, como denominador; uma operação sem temporização não fabrica uma amostra de zero milissegundos. `bridged` continua a ser o alias compatível com versões anteriores para conversões bem-sucedidas; tentativas falhadas não o incrementam. Os contadores são repostos na reinicialização do processo por design (telemetria, não contabilização).

#### Configuração do painel

A página dedicada do painel é `/dashboard/settings/modality-bridge`. Os seus separadores `Vision`, `Audio` e `Video` endereçáveis URL preservam os parâmetros de consulta enquanto alternam o valor `tab`. O separador Visão expõe a ativação, o modo, a seleção de modelo (incluindo o padrão automático), o pedido de reconhecimento de tarefas, os limites timeout/image/description-length/cache avançados, os contadores de tempo de execução e um pedido de amostra protegida. O separador Áudio também está ativo: expõe a ativação, um seletor de modelo apenas STT com Automático, limites timeout/max-clip, contadores de áudio e um teste de amostra `input_audio`. O separador Vídeo é funcional: reporta o estado de tempo de execução FFmpeg/ffprobe — um dos quatro estados UI explícitos (`unknown` enquanto o teste está em curso ou não pôde ser concluído, `restricted` num host de painel sem loopback onde o teste é ignorado no lado do cliente, `unavailable` uma vez testado e confirmado como ausente ou `available` com as versões FFmpeg/ffprobe ) — persiste nos limites enable/model/frame/video/timeout, filtra o seletor de modelo para modelos com capacidade de visão e expõe contadores de vídeo.

A antiga placa Vision Bridge nas definições AI é um link de compatibilidade para a nova página; já não possui uma segunda via do formulário. Os fornecedores de media também ligam os fluxos de trabalho de imagem para texto e de fala para texto aos separadores correspondentes do Modality Bridge sem remover o playground existente de fala para texto.

**Bypass de admissão de auto-loop:** quando a chamada de descrição encaminha através do próprio auto-loop `/v1` de OmniRoute(modelo de fornecedor não padrão), a subsolicitação envia `x-omniroute-admission-bypass: internal` e é autenticada com a credencial de auto-loop resolvida — o `sk_omniroute` sentinela local no modo local ou a chave `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env configurada pelo operador (#1350) para que as implementações `REQUIRE_API_KEY=true` ainda possam executar a chamada de descrição. O desvio só é respeitado para estas credenciais exatas, pelo que os clientes externos não podem utilizar o cabeçalho para ignorar a admissão.

Os padrões legados residem em `src/shared/constants/visionBridgeDefaults.ts`; os novos padrões mode/task-aware/cache e o resolvedor de configurações residem no `src/shared/constants/modalityBridgeDefaults.ts`. O guardrail expõe uma opção de construtor `deps` para que os testes possam injetar implementações falsas `getSettings` e `callVisionModel`.

### Ponte Áudio (`audioBridge.ts`) — Modalidade Ponte PR-3

Interceta pedidos de chat com áudio antes que estes atinjam um alvo que não aceita entrada de áudio. Nunca redireciona o pedido de chat: as partes de áudio são transcritas através do endpoint multipart existente compatível com OpenAI e o modelo de chat escolhido continua com transcrições de texto.

Fluxo:

1. Resolva `supportsAudio` por meio de `getResolvedModelCapabilities()`. Os metadados explícitos do registo do fornecedor são ganhos, depois os metadados do modelo estático e depois sincronizados `modalities_input`. Uma lista de entrada declarada sem `audio` é `false`; nenhuma evidência de capacidade permanece `null`. Tanto `false` como `null` ativam a ponte conservadora, enquanto `true` a contorna.
2. Resolva as definições `modalityBridgeAudio*` e extraia partes de áudio de nível superior unidas de cada mensagem através do detetor `detectMediaParts()` partilhado. Os formatos de fio suportados são OpenAI `input_audio`, `audio_url` e `source.media_type: "audio/*"`. O áudio aninhado é detetado para encaminhamento, mas não removido pelo caminho de emenda. O trabalho é limitado por `modalityBridgeAudioMaxClips`; as partes posteriores permanecem intactas.
3. Respeite um `provider/model` configurado ou deixe `selectAudioBridgeModel()` percorrer `AUDIO_TRANSCRIPTION_PROVIDERS` na ordem de catálogo estável e selecione o primeiro modelo com uma credencial de fornecedor ativa utilizável.
4. `callAudioTranscription()` converte o áudio base64/data-URI num `file` multipart ou descarrega um `audio_url` remoto através do protetor de saída apenas público com fixação DNS e um limite de 25 MB. Em seguida, POSTs o ficheiro e o modelo seleccionado para o autoloop `/v1/audio/transcriptions` local, autenticado com `resolveSelfLoopBearer()`. A rota de transcrição existente realiza a pesquisa normal de credenciais, a manipulação cooldown/rate-limit e o envio de fornecedores.
5. As chamadas bem-sucedidas substituem as suas partes por `[Audio N]: <transcript>`. As chamadas são executadas com `Promise.allSettled`: uma falha individual preserva a parte áudio original (#4012 contract ). Se todas as chamadas falharem e o alvo for comprovado `supportsAudio === false`, as partes passarão a ser `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430 ). Para um alvo desconhecido (`null`), um resultado de falha total permanece inalterado. Um destino comprovado apenas por texto sem credencial STT utilizável recebe o mesmo stub explícito sem emitir uma chamada de rede.

As transcrições bem-sucedidas utilizam a cache LRU/TTL do Modality Bridge em todo o processo. A chave combina a referência áudio, o rótulo de operação `audio-transcription` estável e o modelo STT selecionado; as falhas nunca são armazenadas em cache. As tentativas de áudio atualizam os contadores partilhados `bridged`, `cacheHits`, `failures` e `lastUsedAt`. As respostas transformadas transportam `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; pedidos intocados não recebem um segmento Audio Bridge.

As definições de tempo de execução são suportadas pela base de dados e validadas pelo Zod:

| Chave                         | Predefinição | Intervalo            |
| ----------------------------- | ------------ | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                    |
| `modalityBridgeAudioModel`    | `""`         | Automático ou STT ID |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10                 |

O cache partilhado permanece controlado por `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em Conclusões de chat `messages` e Respostas API `input` antes de um destino sem suporte de vídeo nativo conhecido ser chamado. As formas suportadas são `input_video`, `video_url`, `video_source`, HTTPS URLs e `data:video/*;base64,...` data URIs. Os nomes de ficheiros simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) possui a travessia do pedido, a verificação capability/policy, a agregação por pedido e a carga útil da resposta. Aquisição — de trabalho por vídeo, o cache de resultado completo, descrevendo uma sequência de fotogramas (que funde qualquer transcrição de áudio declarada pelo chamador) e metrics/abort/cleanup — por tentativa está oculto atrás de `processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez por parte do vídeo dentro do loop de `preCall`. Este módulo também define os limites de porta explícitos `VideoMediaBrokerPort` (adquirir bytes e extrair fotogramas amostrados), `VideoAudioTranscriptionPort` (fundir uma transcrição áudio declarada pelo chamador com as legendas amostradas) e `VideoDrilldownPort` (a forma herdada de armazenamento em bruto). A produção STT e a retenção de quadros são compostas em torno da porta de descrição através `createVideoSttAdapter` e `createVideoDrilldownAdapter`; este último utiliza o ciclo de vida partilhado do identificador opaco.

O caminho de pedido `/v1` público nunca importa ou invoca um subprocesso. Os vídeos remotos são descarregados com um limite de 50 MiB ; vídeos base64 inline têm um limite conservador descodificado de 36 MiB por vídeo, pelo que o envelope model/messages/framing pode permanecer dentro do limite de admissão de pedido JSON público de 50 MiB. As estimativas de comprimento incorporado e tamanho descodificado são verificadas antes da alocação. HTTPS é necessário no URL remoto inicial e em cada redireccionamento, utilizando a proteção de saída apenas pública existente com fixação DNS. Os bytes cruzam então o limite interno exacto do corrector `POST /api/modality-bridge/video/extract`. Esta rota é `LOCAL_ONLY` e `SPAWN_CAPABLE`, apenas aceita um pedido de loopback fiável autenticado por processo e nunca aceita um URL, caminho do sistema de ficheiros, executável ou lista de argumentos. O pipeline API body-size e o leitor de corpo incremental do manipulador impõem independentemente um limite de entrada do corrector MiB. A sua fila limitada executa uma extração de cada vez, permite quatro trabalhos pendentes e limita a entrada pendente a 100 MiB.

Dentro do corretor, `ffprobe` lê um ficheiro local privado; a lista de permissões de formato fixo elimina os formatos de lista de reprodução e de manifesto. Para os contentores da família MOV permitidos, as referências de dados MOV externas permanecem desativadas por defeito e o comando fixo não as aceita. Tanto `ffprobe` como `ffmpeg` utilizam a lista de permissões do protocolo `file` -only, um thread, arrays de argumentos fixos, sem shell e executáveis resolvidos a partir do `PATH`. Os streams de capa de imagens anexadas não são candidatos jogáveis. Todos os fluxos reproduzíveis devem satisfazer os limites, e um fluxo padrão explícito é preferido antes do substituto determinístico de índice mais baixo. Os vídeos estão limitados a 600 segundos, 8.192 pixéis por dimensão e 33.554.432 pixéis de origem. FFmpeg amostra de 1 a 16 fotogramas JPEG de ponto médio, reduz a borda longa para um máximo de 1024 pixéis sem aumentar a escala de entradas mais pequenas e nunca recebe um URL. A amostragem é `uniform` por defeito. As políticas opcionais `scene_aware` e experimental `segment_aware` executam uma passagem FFmpeg fixa adicional sobre o fluxo local já validado, selecionam carimbos de data/hora de cena `showinfo` limitados e retornam deterministicamente aos mesmos pontos médios uniformes em caso de falha do detetor, tempo limite, saída malformada ou um conjunto de candidatos vazio. O modo com reconhecimento de segmentos aloca as amostras de ponto médio proporcionalmente aos intervalos de cena validados; evidências de reconhecimento de segmentos e comportamento de fallback são detalhadas abaixo. O limite rígido de 16 fotogramas é aplicado após a seleção em todas as políticas. Quando um pedido com reconhecimento de cena tem apenas um orçamento de um fotograma, utiliza o ponto médio uniforme do vídeo completo ativo ou da janela de focagem e reporta `policyEffective: uniform`: um único fotograma de cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode opcionalmente fornecer uma janela de foco finita (`start`/`end` segundos); os limites são limitados à duração do suporte, as janelas invertidas ou não finitas são rejeitadas e todas as políticas de amostragem são executadas apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não fiável para que os modelos a jusante possam distinguir um trecho focado da linha do tempo completa.

O foco da legenda semântica é uma configuração separada e explícita. O modo de análise `full` padrão preserva o pedido do quadro existente e nunca encaminha o texto do pedido para o modelo de legenda. No modo `focused`, a ponte lê apenas o último `text`/`input_text` não vazio de autoria do utilizador do mesmo contentor Chat ou Responses, normaliza-o para NFC, recolhe caracteres de controlo e espaços em branco e limita-o a 500 pontos de código Unicode. Um resultado vazio retorna ao prompt exacto `full`. Uma dica utilizável é serializada como JSON num bloco dedicado de contexto de utilizador não fiável e pode priorizar apenas detalhes observáveis; não pode substituir o aviso separado das instruções visíveis ou audíveis nos suportes. O foco textual nunca infere `start`/`end` nem altera o amostrador temporal.

#### evidência do segmento estrutural FU-07

`segment_aware` utiliza uma passagem de pré-análise limitada sobre o fluxo de vídeo local já validado. A cadeia de filtro fixa é primeiro dimensionada para um máximo de 320 pixels de largura, deteta mudanças de cena e intervalos congelados e, em seguida, faz amostras de 1 fotograma por segundo para desfocagem, luma média e informações spatial/temporal. A passagem está limitada a 600 amostras estruturais, um thread FFmpeg/filter, o mesmo protocolo `file` -only e listas de permissões de contentores, um limite de saída de processo de 1 MiB e um máximo de 30 segundos dentro do abort/deadline. partilhado do corrector. Nunca aceita um comando, filtro, caminho ou URL do pedido.

Os valores estruturais são evidência de amostragem determinística, e não de compreensão semântica do vídeo. Não inferem assuntos, ações, legendas, discurso ou intenção do utilizador. Os limites da cena e do congelamento formam segmentos; cobertura congelada, desfocagem, exposição, detalhes espaciais e mudança temporal apenas influenciam a forma como o orçamento existente de 1 a 16 fotogramas é alocado. Um segmento totalmente congelado está limitado a um quadro, enquanto os segmentos não congelados competem pelo orçamento restante. Quando os limites superam o número de fotogramas, a cobertura uniforme da linha de tempo é mantida, pelo que os cortes iniciais rápidos não conseguem ocultar um segmento final longo. Os limites da cena dentro da resolução de análise de 1 segundo de um limite congelado são unidos.

Filtros em falta, evidência malformed/empty, um erro do detetor ou o tempo limite de pré-análise limitado falham a abertura da política exata de ponto médio uniforme. Uma interrupção do chamador ou prazo do intermediário não falha a abertura: termina o subprocesso em curso, evita a extração posterior de tramas e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera acessórios FFmpeg reais determinísticos para poupanças de chamadas de legenda pós-desduplicação, alocação de orçamento de movimento denso, evidência blur/exposure/SI-TI, cortes rápidos com cauda longa e falsos positivos com desvanecimento gradual. Regista o tempo de parede da pré-análise e, onde `/usr/bin/time` está disponível, filho CPU e pico RSS. As suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legenda permanece `HOLD` porque este chicote não tem endpoint autorizado ou juiz congelado. A poupança monetária também se mantém `HOLD` a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita por chamada; o script nunca fabrica nenhum dos resultados.

Cada fotograma está limitado a 4 MiB, todos os fotogramas em bruto juntos a 23 MiB e a resposta do corrector serializado a 32 MiB. Um diretório temporário privado é removido em `finally`. OmniRoute não empacota FFmpeg e não aceita um caminho executável personalizado. Antes da legenda, a ponte aplica uma passagem de desduplicação visual conservadora: cada JPEG é reduzido a um buffer de 16 × 16 tons de cinzento e é comparado apenas com o último fotograma retido. Para um orçamento de legendas solicitado acima de um quadro, a extração proporciona um conjunto limitado de candidatos até o dobro desse orçamento e nunca mais de 16 quadros. O limite solicitado é aplicado apenas após a desduplicação, sendo o primeiro e o último candidato selecionado preservados durante o desbaste final quando o orçamento é de, pelo menos, dois. A política `grayscale-16x16-mean-cells-v2` versionada utiliza o delta médio de luma mais elevado e a proporção de células miniatura cujo delta normalizado é de, pelo menos, 0,05. O limiar duplicado é a constante 0,04, escolhida pela previsibilidade em vez de exposta como uma definição de tempo de execução. Este sinal secundário de alto contraste preserva pequenos movimentos e alterações de texto visível que uma comparação apenas média pode ocultar. Os erros do comparador ou do descodificador falham a abertura e mantêm a cobertura. Os metadados de saída separam os candidatos extraídos, os quadros utilizados com sucesso e os duplicados visuais eliminados.

Uma parte de vídeo marcada explicitamente pode solicitar uma folha de contacto com registo de data e hora. A ponte constrói no máximo uma grelha JPEG de 4 colunas e 16 quadros. Cada célula de 512 pixéis grava o seu carimbo de data/hora de origem numa banda inferior de alto contraste, enquanto os mesmos carimbos de data/hora permanecem em metadados textuais para associação e auditoria a jusante. O JPEG completo continua limitado a 32 MiB. Se `sharp` não conseguir descodificar ou compor a grelha, a ponte regressará aos quadros JPEG individuais; uma interrupção do cliente ainda se propaga pela operação de folha de cálculo.

A evidência de promoção é deliberadamente separada do microbenchmark da composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um chicote A/B com versão de esquema para modelos de visão reais compatíveis com OpenAI. Mede os tokens reportados pelo fornecedor, a latência de ponta a ponta (incluindo a composição da folha de cálculo), a contagem de chamadas de modelo e a retenção de factos definidos pelo manifesto. As respostas brutas do modelo não são gravadas no relatório; apenas os resumos SHA-256 e os factos correspondentes IDs são retidos. O chicote não faz qualquer chamada de rede ou de modelo pago, a menos que seja passado `--execute-real` e esteja configurado `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY`. Sem esta execução real explícita, o seu veredicto legível por máquina permanece `HOLD`; medições sintéticas payload/call-count por si só não são evidência de promoção.

O `scripts/perf/video-bridge-promotion-eval.ts` separado consome observações FU-07 ou FU-09. A admissão à promoção requer todos os oito tipos de cenários sintéticos mais um clipe real higienizado, pelo menos três repetições medidas por função e caso, todas as dez métricas declaradas, resumos media/prompt/expected-fact/settings congelados, observação única IDs e ordem A/B semeada verificada. O recibo de execução liga o resumo do corpus, o candidato exato SHA e a revisão do modelo. As medições em falta ou inválidas permanecem `HOLD`, incluindo CPU acima de 30 s, RSS de pico acima de 512 MiB ou pré-análise acima de 30 s. Estes são limites de admissão de provas, não uma nova garantia de aplicação RSS em tempo de execução.

FU-07 requer pelo menos 98% de retenção de qualidade e latência p95 não superior a 1,2x da linha de base, além de uma melhoria média absoluta de recall com balanceamento de caso de 0,05 em chamadas médias de legenda equivalentes ou pelo menos 10% menos chamadas médias de legenda pós-desduplicação. FU-09 requer uma qualidade de pelo menos 0,85, 95% de retenção, 20% de redução da latência mediana e 10% de redução do token. A perda de factos críticos, a conformidade com a injeção ou a falta de utilização impedem a promoção. Uma execução não pode promover nada: `--previous-report` confirma duas execuções distintas, não sobrepostas e consecutivamente elegíveis do mesmo policy/model revision/candidate/corpus. Uma experiência de amostragem não pode confirmar uma experiência de folha de contacto.

Os coletores devem pontuar as respostas na memória e guardar `responseDigest` além de métricas e ligações de observação, nunca texto de resposta. O consumidor também lê observações brutas herdadas, mas nunca copia esse texto para os seus relatórios. Exatamente um de entre `responseDigest` ou `rawResponseText` é aceite para cada observação. A lista de permissões versionada permanece vazia com um padrão `hold` imutável. Uma entrada elegível requer referência de evidência, política, revisão do modelo, candidato exato SHA, resumo do manifesto e duas execuções distintas IDs; contextos conflituantes são rejeitados. Estes metadados são um contrato de auditoria e não uma prova de que um ficheiro referenciado contém medições genuínas. Reveja os recibos reais antes de adicionar qualquer entrada. O endpoint de estatísticas de gestão e o painel de vídeo expõem uma prontidão conservadora. Um alias de modelo configurado por si só não estabelece a sua revisão ou o candidato em execução SHA, pelo que o painel atual reporta `HOLD` em vez de reutilizar a elegibilidade de outro contexto de execução. A seleção experimental explícita permanece separada da promoção; nenhum padrão é alterado automaticamente.

Os chamadores podem anexar uma matriz `transcript.cues` opcional a uma parte de vídeo suportada quando já possuem texto alinhado. Cada sugestão deve conter `text`, um intervalo `start`/`end` finito dentro da duração testada e um `source` na lista de permissões (`client`, `embedded` ou `audio-bridge`); `confidence` é padronizado como `1` e deve permanecer entre `0` e `1`. As sugestões duplicadas exatas são recolhidas. OmniRoute nunca inicia a transcrição destes metadados: as dicas validadas são copiadas para o resultado descrito com fonte, confiança e intervalo, e são renderizadas como observações não fiáveis juntamente com as legendas do quadro. O texto inválido, fora do intervalo ou sem origem é rejeitado em vez de ser misturado no fluxo de legendas. Ambos os canais de transcrição do corpo do pedido normalizam a proveniência fornecida para `client`, incluindo as etiquetas `embedded` ou `audio-bridge` auto-afirmadas. Apenas um adaptador de propriedade do servidor pode atribuir estes rótulos fiáveis através do argumento `trustedSource` apenas de código; um campo de pedido JSON não consegue alcançar este argumento. O texto transcrito continua a ser conteúdo derivado de suportes não fidedignos, independentemente da sua origem, e nunca deve determinar autorização.

Um chamador avançado pode fornecer uma faixa `audioTranscript` para o mesmo vídeo; é tratado como texto fornecido pelo cliente e não como prova de transcrição do servidor. A costura de fusão executa observações visuais e sonoras sob um prazo e sinal de aborto, ordena-as numa linha temporal comum, colapsa duplicados exatos e reporta um resultado parcial quando apenas um dos lados é bem-sucedido. Um `audioTranscript` inválido degrada este resultado parcial — a descrição visual é mantida e a ramificação de áudio regista um código de falha — limpo em vez de falhar todo o vídeo. A disponibilidade por filial, o sinalizador parcial e os códigos de falha higienizados são preservados no resultado descrito, nos metadados do guardrail (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), nos metadados da cache de resultados e nos contadores de fusão da ponte. O caminho padrão do Video Bridge não invoca a fala para texto nem descarrega uma segunda cópia de media; sem essa faixa explícita, mantém-se apenas em vídeo.

**Retenção da transcrição (#12150 P1).** Isto aplica-se automaticamente sempre que o Video Bridge (ele próprio opcional) renderiza uma sugestão de transcrição — não existe um sinalizador de retenção separado. Quando um pedido renderiza qualquer sugestão de transcrição (um `transcript` declarado pelo chamador ou um `audioTranscript` fundido), o guardrail marca-o `videoBridgeObserved` e produz uma sombra redigida da descrição do vídeo — uma renderização idêntica na qual o corpo de texto livre de cada sugestão é substituído por `[redacted-video-transcript]`, construído substituindo o campo de sinalização estruturado antes da string ser montada (nunca analisando o texto achatado, portanto, nenhum conteúdo de sugestão — adversário ou comum, incluindo corpos contendo `]` como `[inaudible]`/`[music]` — pode sobreviver). O corpo do pedido de registo de chamadas persistente troca cada parte de texto derivada de vídeo por essa sombra redigida, correspondida pela igualdade de conteúdo; a âncora `fullText` é relida a partir da carga útil do guardrail pré-chamada finalizada, de modo que a correspondência ainda é bem-sucedida após os guardrails da cadeia posteriores (os PII e mascaradores de credenciais, prioridades 10/95) reescreverem o texto de descrição no lugar e após a injeção system-prompt/handoff/memory remodelar a matriz de mensagens. O corpo enviado para montante para o modelo permanece inalterado. Um pedido observado também não preenche nenhuma memória durável (tanto a extração derivada do pedido como a da resposta são ignoradas), pelo que a própria resposta do modelo não pode ecoar o texto transcrito na memória.

**Campos de vídeo em bruto (#12430).** Quando a ponte está ativada e o suporte de vídeo nativo é desconhecido ou está em falta, os campos `transcript`/`audioTranscript` definidos também ativam `videoBridgeObserved`, mesmo após falha na descrição ou limite `maxVideos`. contagem de `null` e strings vazias; campos em falta e metadados que não sejam de vídeo, não. As cópias retidas editam estes campos ou omitem o pedido e caches/Memory são ignorados.

Nestes caminhos de fallback, as dicas válidas do chamador tornam-se partes `text`/`input_text` suportadas em vez de campos de fornecedor não padrão. Ambas as faixas fornecidas pelo pedido permanecem observações `client` não fiáveis, com um aviso explícito de que o vídeo não foi descrito e os carimbos de data e hora não foram verificados nos meios de comunicação social. Os orçamentos totais e por sugestão existentes 256-cue/64-KiB aplicam-se às duas faixas em conjunto; os carimbos de data e hora devem caber no teto de 600 segundos do corretor e em qualquer janela de focagem fornecida. As faixas inválidas são descartadas e não encaminhadas como texto arbitrário; um irmão válido ainda pode ser utilizado, a menos que o seu orçamento combinado seja excedido. Os campos Null/empty não adicionam texto. Nenhuma pesquisa ou transcrição de média é adicionada por este substituto. Os campos de extensão de transcrição são removidos da portadora de vídeo substituta e dos seus objetos `video_url`/`source`. A lista de permissões de fios OpenAI permanece rigorosa; suportes de vídeo nativos desconhecidos permanecem disponíveis e os alvos apenas de texto conhecidos mantêm os marcadores seguros. As sombras de escrita estruturadas protegem o texto transcrito anexado, enquanto o pedido original de propriedade do chamador permanece inalterado. Os destinos com suporte nativo e as pontes desativadas mantêm o seu comportamento de desvio existente.

Cópias retidas adicionais utilizam o mesmo sinal de pedido observado. O instantâneo bruto do pedido do cliente pré-guardrail, o pedido pendente na memória e o registo de pedido rejeitado antecipado substituem estruturalmente os campos de transcrição nas partes do vídeo; os prompts de string sintetizados por fases de pipeline e de transferência de contexto são editados no coletor do corpo do pedido persistente. O marcador `video_content_removed` persistente faz com que a continuação `previous_response_id` falhe no fecho, em vez de reconstruir o texto que foi intencionalmente descartado. Se um pedido observado perder a sua sombra de escrita por parte antes do registo, ou mesmo uma das várias sombras de vídeo não corresponder após mutações de pedido posteriores, o corpo do pedido retido será totalmente omitido em vez de reter uma transcrição parcialmente editada.

Para um pedido observado, uma resposta do modelo pode citar qualquer parte da transcrição sem um limiar de sugestão estruturado. O seu registo de chamadas persistente `responseBody` é, portanto, substituído por um marcador de omissão; o artefacto detalhado do pipeline (que pode incluir corpos upstream/client e partes de fluxo) não é retido. Os caches semânticos, de idempotência e de repetição de raciocínio ignoram as leituras e escritas para este pedido. O pedido do fornecedor e a resposta visível ao cliente permanecem inalterados. Os primeiros bytes de manutenção de atividade são drenados do buffer temporário quando o artefacto detalhado é omitido. O aviso EventStream malformado de Kiro apenas reporta a contagem de bytes de carga útil, nunca o seu conteúdo ou o erro bruto do analisador JSON. Isto não afirma que todos os diagnósticos provider/plugin não relacionados foram auditados; a varredura mais ampla do coletor retido é rastreada em #11658.

O ciclo de vida interno `/api/modality-bridge/video/drilldown` é um substrato de cache loopback/token-authenticated separado. Cada operação requer também um principal canónico opaco ID. Antes de um chamador de produção ser activado, terá de derivar esse ID do tenant autenticado e nunca deverá encaminhar um valor seleccionado pelo cliente. As chaves de cache ligam este principal à sessão canónica e à referência de vídeo IDs, armazenam apenas as suas chaves SHA-256-derived e definem o âmbito das leituras e eliminações para o mesmo principal. A cache armazena um máximo de 16 quadros JPEG derivados por entrada, expira-os após dez minutos e suporta leituras `start`/`end` limitadas ou eliminação explícita de sessões.

Cada principal está limitado a 16 entradas e 64 MiB de dados canónicos JPEG. Estes limites são independentes do tecto global 64-entry/256 MiB : a pressão da cota do principal despeja apenas as entradas menos utilizadas do principal antes de ser considerado o despejo global LRU. As entradas expiradas são varridas da contabilização principal e global na atividade de cache, enquanto o cancelamento e a falha de validação não comprometem uma substituição parcial.

A cache rejeita Base64 não canónico, preenchimento excessivo, suporte não JPEG, JPEGs malformado ou truncado e JPEGs que produzem um aviso durante uma descodificação `sharp` imagem completa limitada. Recodifica cada imagem aceite como um JPEG canónico, deriva a largura e a altura dos bytes descodificados em vez de confiar nos campos do chamador e descarta quaisquer bytes poliglotas finais em vez de os manter. Apenas o buffer compactado canónico limitado é cobrado a ambas as quotas. O limite de fio JSON inclui a sobrecarga Base64 para o teto de entrada descodificada de 32 MiB. Cada derivação armazenada regista o seu JPEG format/resolution validado, política de amostragem, versão de derivação, hora de criação, hash de conteúdo computado pelo servidor e referência pai com hash, além do hash de conteúdo pai do chamador fidedigno. O cancelamento é verificado entre as fases decode/hash assíncronas antes da confirmação da cache atómica.

O produtor de produção reutiliza os quadros de corretagem já derivados apenas após análise visual bem-sucedida, sem segundo vídeo download/extraction. Requer o operador `modalityBridgeVideoDrilldownEnabled=true`, estrito por parte `drilldown: true` e um registo de chave API autenticado ID. Os valores principal/session declarados pelo cliente nunca estabelecem a propriedade. Sem as três condições, não faz hash, redimensiona ou retém fotogramas adicionais. A falha de retenção preserva a resposta visual utilizável. Os pedidos consentidos ignoram a cache de resultados de todo o vídeo para que os resultados armazenados em cache nunca reproduzam os identificadores.

As respostas JSON e SSE bem-sucedidas expõem um máximo de quatro identificadores opacos no cabeçalho `x-omniroute-video-drilldown` limitado. As origens autorizadas do browser podem ler este cabeçalho sem ampliar a política de origem CORS. Os novos identificadores usam `v1.<32-byte random base64url token>` e o registo retém apenas os seus hashes SHA-256. O analisador reader/header também aceita tokens herdados de 64 hexadecimais. O consumidor público autenticado é `GET /api/v1/video-bridge/drilldown?handle=...`, controlado de forma independente por `modalityBridgeVideoDrilldownRemoteEnabled=true`. O falso persistente explícito revoga o acesso mesmo quando o fallback `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env herdado está ativado. A retenção de produção tem o substituto legado `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` análogo. Ambos os substitutos estão desativados por defeito.

O consumidor obtém a propriedade da chave autenticada e aplica a política de chave: GET e DELETE pertencem à categoria de endpoint `video`, incluindo os alias `/v1` e `/api/v1`. As chaves com uma lista de permissões de endpoint não vazia devem incluir `video`; chaves irrestritas permanecem compatíveis. O consumidor devolve o mesmo 404 para identificadores desconhecidos, expirados e de outra chave. Aceita `variant=preview|standard|detail` (dimensão JPEG máxima 320/640/1280, nunca ampliada), `limit=1..8` (ou o alias herdado `frames`, nunca ambos), `page` baseado em zero e segundos de foco `start`/`end` opcionais. As chaves de consulta duplicadas e as janelas de foco invertido são rejeitadas. Cada variante devolvida tem um hash do seu conteúdo real e metadados de resolução reais, ligados à fonte retida. As variantes são derivadas da leitura, em vez de serem armazenadas como cópias retidas extra. A resposta JSON, incluindo Base64/envelope, está limitada a 32 MiB; uma página sobredimensionada devolve 413 e o cliente deve solicitar menos fotogramas. Lê o cancelamento da verificação em cada redimensionamento e verifica novamente a validade do identificador antes de regressar. `DELETE` pelo proprietário é idempotente; a eliminação ou expiração TTL liberta a fonte retida e a contabilização de utilização.

O armazenamento partilhado é local do processo: os identificadores expiram no reinício e não são transferíveis entre processos OmniRoute independentes. As estatísticas de gestão expõem a política de retenção/remota efetiva e agregam apenas entries/bytes retido, nunca os meios, as referências, IDs principal ou os identificadores. O painel Definições de vídeo mostra estes valores e pode persistir em ambas as opções de consentimento. Esta documentação de implementação não é uma evidência de implementação ou promoção em tempo real; a aceitação do modelo real é rastreada separadamente.

Os fotogramas são legendados sequencialmente com o modelo de vídeo configurado. Uma substituição de vídeo vazia herda a configuração Visão; se ambos estiverem vazios, o router automático Vision seleciona o modelo com capacidade de visão eficaz. As legendas bem-sucedidas substituem a parte original por um prefixo `[Video description:` estável que também marca o texto como uma observação não fiável derivada dos media e diz aos modelos a jusante para não seguirem as instruções encontradas nos media. As chaves de cache de legendas de quadros incluem bytes JPEG, prompt, carimbo de data/hora e modelo efetivo; apenas as legendas bem-sucedidas são armazenadas em cache. As entradas de cache retêm o modelo de produtor real bem-sucedido, incluindo um modelo substituto; a ponte reporta `mixed` quando frames diferentes foram produzidos por modelos diferentes. Um acerto de cache reutiliza a identidade do produtor em vez de a rotular novamente como o plano de encaminhamento solicitado. A cache de resultados de todo o vídeo é digitada em cada entrada que altera o prompt — de saída, o modelo efetivo, a política de amostragem, a contagem de fotogramas, o modo de análise semântica, a impressão SHA-256 da dica de foco normalizada, a janela de foco, `transcript`, `audioTranscript` e o sinalizador da folha de contacto —, pelo que a alteração de qualquer uma destas dimensões é uma falha de cache, nunca uma reutilização obsoleta. A versão da política de desduplicação visual, o limite e a contagem de quadros candidatos limitados também são explícitos na chave e nos metadados da cache de resultados; uma alteração de política, pelo que não pode reutilizar uma descrição obsoleta de todo o vídeo. Os metadados da cache de resultados v4 mantêm o modo e a impressão digital, nunca a tarefa bruta do utilizador. Os metadados Guardrail reportam os modos de análise solicitados e eficazes; um modo `focused` solicitado sem texto de utilizador utilizável é reportado como `full`.

O guardrail extrai todas as partes de vídeo suportadas, mas não descreve mais do que `modalityBridgeVideoMaxVideos`. Para um alvo com `supportsVideo === false` comprovado, os vídeos com falha e acima do limiar tornam-se marcadores de texto seguros explícitos para que nenhum vídeo em bruto sobreviva. Quando a capacidade é desconhecida, estas partes mantêm a sua portadora de vídeo; qualquer transcrição substituta segue a conversão de texto delimitada acima. Os alvos com `supportsVideo === true` contornam a ponte. O sinal de interrupção do pedido do cliente propaga-se através de download, fila do intermediário, subprocessos e chamadas de legenda; os abortos param entre os vídeos e nunca falham na abertura dos media brutos.

As definições de tempo de execução são suportadas pela base de dados e validadas pelo Zod:

| Chave                               | Predefinição | Alcance/comportamento                                                                                       |
| ----------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`      | Tempo de execução opcional, opt-in                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` preserva legendas genéricas; `focused` usa contexto de utilizador mais recente limitado e não fiável |
| `modalityBridgeVideoModel`          | `""`         | Herdar o modelo Vision Bridge                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` ou `segment_aware` proporcional; falha do detector volta a `uniform`               |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`     | 1.000–120.000 ms                                                                                            |

Os valores de tempo limite de vídeo persistente legado acima de 120 segundos estão limitados ao prazo do corretor; novas definições gravadas acima desse limite são rejeitadas. `GET /api/modality-bridge/video/runtime` requer uma localidade de loopback carimbada fiável antes da autenticação ou investigação em tempo de execução e, em seguida, requer autenticação de gestão. Apenas retorna `available`, versões limpas FFmpeg/ffprobe e um motivo fixo quando o tempo de execução está indisponível. O endpoint de extração interna não é um upload público API: a saturação da fila retorna `503` mais `Retry-After`, uma desconexão do chamador retorna `499` e o prazo fixo do corretor retorna `504`. As respostas convertidas adicionam `video->text;model=<visionModel>;parts=<videos>` ao cabeçalho `x-omniroute-modality-bridge` central sem remover segmentos de visão ou áudio.

### PII Mascarador (`piiMasker.ts`)

Continua** ambos** etapas.

- **`preCall`** clona a carga útil, percorre `system`, `messages`, `input` e `prompt` (incluindo itens de string simples) e aplica `processPII()` (de `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, PII detetado é editado na carga útil de saída. Isto é independente do `INPUT_SANITIZER_MODE` (que apenas controla a política de injeção imediata). Quando a redação está desativada, a deteção de registos de chamadas conta sem reescrever o conteúdo.
- **`postCall`** clona profundamente a resposta, executa `sanitizePIIResponse()` mais o mascarador em forma de API de respostas (`maskResponsesOutput` — cobre `output_text` e `output[].content[].text`). Se ocorrer alguma formulação, a resposta modificada substitui a original.

O guarda-corpos nunca bloqueia; apenas anota (`meta.detections`, `meta.redacted`) ou reescreve.

**Cofre reversível (`PII_REVERSIBLE_VAULT_ENABLED`, norma `false`).** Quando `PII_REDACTION_ENABLED` e `PII_REVERSIBLE_VAULT_ENABLED` estão activados (DB override > env > default, lido uma vez por pedido), `handleChat` abre um cofre por pedido do cliente (`src/lib/pii/requestTokenVaultScope.ts`) e passa-o para a passagem de pré-chamada como `GuardrailContext.tokenVault`. O mascarador escreve então tokens substitutos, como `<<PII_EMAIL_QWERTYUI_1>>` em vez de `[EMAIL_REDACTED]`, para regras integradas, validadas (GDPR/POPIA) e personalizadas. O nonce tem 8 letras maiúsculas aleatórias por pedido, e o mesmo valor obtém o mesmo token no pedido. Apenas o mascarador é válido: o guarda de injeção imediata e `/api/guardrails/test` funcionam sem cofre e mantêm os espaços reservados.

- O fornecedor, cada perna do combo, nova tentativa, membro do painel de fusão e o juiz de fusão apenas vêem tokens. Os tokens são restaurados uma vez, na resposta 2xx que deixa `handleChat`: por campo no SSE analisado (um token dividido entre eventos ainda é resolvido; os argumentos de chamada de ferramenta têm escape JSON) ou por campo num corpo JSON, com um `Content-Length` recalculado. O conteúdo e o texto de raciocínio e os argumentos de chamada de ferramenta são restaurados. Os corpos de erro (4xx/5xx) mantêm os tokens.
- As falhas permanecem privadas: se a cunhagem falhar ou o cofre recusar um valor (1000 entradas, 256 caracteres por valor, 64 KB no total), o espaço reservado será escrito; um token que o cofre não consegue resolver ou uma restauração que falha permanece literal e apenas uma contagem é registada. O cofre não contém temporizadores nem estados globais; é limpo quando o fluxo de resposta termina, é cancelado ou existem erros.
- Quando um pedido gera tokens, a extração de memória, o salvamento de idempotência e as escritas da cache semântica são ignoradas, porque nenhum pedido posterior poderia resolver estes tokens. Nos registos de chamadas, o pedido e a resposta do fornecedor transportam tokens; o corpo do pedido do cliente registado é ainda a entrada bruta do cliente, como acontece com a escrita simples.
- Os tokens utilizam um nonce aleatório por pedido, pelo que o prefixo do prompt muda a cada turno: a cache de prompt do lado do fornecedor não atinge turnos mascarados e um token que regressa num turno posterior (por exemplo, através de `previous_response_id`) pertence a um pedido antigo e permanece literal.

#### Seleção por tipo, padrões personalizados e contadores de deteção

**Painel → Definições → Segurança → PII mascaramento** escolhe _o que_ está mascarado. Não ativa o mascaramento: ainda `PII_REDACTION_ENABLED` (pedido) e `PII_RESPONSE_SANITIZATION` (resposta + SSE), ambos desativados por defeito.

- **Seleção por tipo** — os IDs integrados estão listados em `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa todos os tipos (o comportamento antes da existência desta configuração). O padrão `ssn_us` do mecanismo de pedido é mapeado para `ssn`. Os modelos (Mínimo, Standard, Financeiro, Brasileiro, USA, GDPR, POPIA, Completo) apenas preenchem as caixas de selecção no UI.
- **identificadores GDPR e POPIA** — doze ids integrados que abrangem os identificadores pessoais EU e sul-africanos (quadro abaixo). As suas expressões regulares, validadores e etiquetas de jurisdição residem numa tabela, `src/shared/utils/piiPatterns.ts`, que tanto o higienizador de resposta (`src/lib/piiSanitizer.ts`) como o mascarador de pedido (`src/shared/utils/inputSanitizer.ts`) consomem. Uma correspondência é editada apenas quando o seu validador a aceita; uma série de dígitos nunca é suficiente. Um operador que tenha guardado uma seleção restrita antes da existência destes ids mantém o comportamento que tinha até que os novos ids sejam marcados.
- **Padrões personalizados** — até 20 padrões regex ou wildcard (`*` = até 64 caracteres sem espaço em branco, `?` = um). As correspondências passam a ser `[CUSTOM_REDACTED]`. Todo o padrão passa por `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): no máximo 500 caracteres, flags limitados a `g i m s u`, devem ser compilados, devem passar por `safe-regex` (retrocesso catastrófico) e não devem corresponder a uma string vazia ou a um espaço reservado de escrita. Um padrão que falha é recusado quando guardado e testado, e uma linha armazenada que falha é ignorada em tempo de execução em vez de ser compilada. Os padrões personalizados só são executados enquanto a máscara está ativada.
- **Contadores de deteção** — contagens por tipo (valores nunca correspondentes), mantidas na memória e repostas no reset (`src/lib/pii/piiDetectionStats.ts`). Só aumentam enquanto a máscara está ativada.

As configurações encontram-se na tabela `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) e são lidas através de uma cache de 1 s. API:

| Método | Percurso                 | Finalidade                                                                   |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado da bandeira, `enabledTypes`, `customPatterns`, contadores de detecção |
| `PUT`  | `/api/settings/pii`      | Substituir `enabledTypes` (`null` = todos) and/or `customPatterns`           |
| `POST` | `/api/settings/pii/test` | Teste um padrão contra uma amostra de, no máximo, 8 KB; nada é armazenado    |

Todos os três requerem autenticação de gestão e validam o corpo com Zod (`src/shared/validation/schemas/piiSettings.ts`). Com o login desativado (`requireLogin=false`), `GET` e o endpoint de teste estão abertos, mas `PUT` ainda precisa de uma sessão de painel, uma chave `manage` -scope API, um token de acesso `oma_` com âmbito de escrita ou superior ou o token CLI ou token de serviço interno enviado a partir do loopback.

#### Identificadores GDPR (EU) e POPIA (África do Sul)

| Eu ia               | Identificador             | Validação                                                                                 |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------------------- |
| `iban`              | IBAN                      | País conhecido, comprimento exato desse país, ISO 13616 MOD-97-10                         |
| `eu_vat`            | número EU VAT             | Prefixo do estado membro conhecido e formato numérico desse estado (sem pesquisa VIES )   |
| `es_dni_nie`        | Espanhol DNI / NIE        | Carta de controlo (valor mod 23); NIE é `X/Y/Z` + 7 dígitos                               |
| `it_codice_fiscale` | Códice Fiscal Italiano    | Carta de controlo das tabelas de posição odd/even                                         |
| `pl_pesel`          | PESEL polaco              | Soma de verificação ponderada e uma data de nascimento codificada existente               |
| `nl_bsn`            | BSN holandês              | 11 testes (pesos 9..2, -1)                                                                |
| `de_steuer_id`      | Steuer-ID alemão          | ISO 7064 Mod 11,10 mais as regras de estrutura de dígitos (sem 0 inicial)                 |
| `se_personnummer`   | Número de pessoa sueco    | Luhn sobre os últimos dez dígitos e uma data de nascimento plausível (10 ou 12 dígitos)   |
| `za_id`             | Número ID sul-africano    | Luhn com todos os 13 dígitos, nascimento válido month/day, dígito de cidadania 0 ou 1     |
| `za_phone`          | Telefone sul-africano     | Prefixo `+27` / `27`, ou a forma nacional `0..` escrita com um espaço ou hífen            |
| `za_vat`            | Número VAT sul-africano   | 10 dígitos começados por `4`** e** "VAT" / "BTW" nos 48 caracteres anteriores             |
| `za_tax_ref`        | Ref. fiscal sul-africana. | 10 dígitos começados por `0`-`3`, Luhn,** e** "tax" / "SARS" nos 48 caracteres anteriores |

Uma vez que os formatos apenas com dígitos colidem com os números de encomenda, números de construção e carimbos de data e hora, os mais fracos (`za_vat`, `za_tax_ref`) necessitam da palavra-chave cue, e um número `0..` simples de dez dígitos não é tratado como um número de telefone sul-africano. IBANs espaçados (`GB29 NWBK ...`) não são correspondidos. No caminho de streaming, a sugestão é procurada apenas dentro do bloco atual. Os ids estão à frente dos padrões genéricos de telefone, pelo que um identificador validado mantém o seu próprio espaço reservado (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Os modelos `gdpr` e `popia` selecionam os IDs EU e sul-africano, respetivamente. O mascaramento em si permanece ativo (regra rígida #20): nada aqui altera o padrão do sinalizador de recurso.

### Injecção imediata (`promptInjection.ts`)

Deteta estruturas adversárias em conteúdo fornecido pelo utilizador e aplica a política configurada. O comportamento é orientado por variáveis de ambiente e opções de construtor:

| Definição          | Variável ambiente                                                                                                   | Predefinição | Efeito                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado         | `INPUT_SANITIZER_ENABLED`                                                                                           | `true`       | Quando `false`, o guarda-corpos entra em curto-circuito.                                                                                                                                                |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                     | `warn`       | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceite para retrocompatibilidade, mas não** não** texto de injeção de tiras; o pedido PII rewrite é controlado por `PII_REDACTION_ENABLED`.) |
| Limite de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (também conhecido por `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Gravidade mínima necessária para bloquear. Médio é apenas observação por defeito.                                                                                                                       |

**Precedência de modo** (`getMode`): `options.mode` → `INJECTION_GUARD_MODE` chamador** substituição do sinalizador de recurso DB** (Configurações do painel → Sinalizadores de recursos → ) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Uma substituição do painel, portanto, vence os env vars, de modo que os Feature Flags UI controlam o guarda em execução ao vivo (sem reinicialização). A leitura DB é à prova de falhas: se ocorrer erro, o guarda volta ao comportamento baseado no ambiente e, quando não é definida nenhuma substituição, o comportamento é idêntico à resolução apenas do ambiente.

Fontes de deteção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de detetores partilhados utilizado noutra parte do pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrado (actualmente `system_override_inline` e `markdown_system_block`, ambos com gravidade `high` ).
3. `customPatterns` opcional passado através de opções de construtor (strings, regex ou registos `{ name, pattern, severity }` ).

Quando `mode === "block"`** e** pelo menos uma deteção cumpre o limite de gravidade, `preCall` devolve `{ block: true, message: "Request rejected: suspicious content detected" }`. Nos modos `warn`/`log`, o guardrail regista, mas permite a chamada. O auxiliar partilhado `evaluatePromptInjection()` também é exportado para os chamadores que precisam de avaliar os avisos sem passar pelo registo.

**Limite de digitalização (v3.8.20):** o detector apenas inspeciona o** primeiros 16 KB** de texto de prompt unido — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 bytes) em `src/shared/utils/inputSanitizer.ts`. `detectInjection()` e `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de executar o ciclo padrão. As diretivas de injeção estão perto do topo de uma entrada, pelo que isto limita o regex CPU/GC em cargas úteis de centenas de KB sem enfraquecer a deteção (cf. #3932, #4041).

### Mascarador de credenciais (`credentialMasker.ts`)

Continua** ambos** estágios, últimos na cadeia padrão (prioridade `95`). Edita os padrões conhecidos de chave API/token secreto da carga útil de saída (conteúdo da mensagem, argumentos de chamada de ferramenta, resultados de ferramenta)** e** a resposta do fornecedor, de modo a que uma credencial colada num aviso (ou repetida por um resultado de ferramenta) não seja divulgada para o fornecedor a montante ou de volta para o cliente.

- **Opt-in only**, same convention as PII redaction (Hard Rule #20-adjacent): disabled unless `settings.credentialRedactionEnabled === true` **or** `CREDENTIAL_REDACTION_ENABLED=true`. With it off, the guardrail is a no-op — it never blocks and never rewrites.
- `redactCredentials()` percorre toda a árvore payload/response (`walkValue()`, protótipo-poluição-segura, ciclo-seguro via `WeakSet`) e substitui as correspondências por um espaço reservado `[REDACTED:<type>]`, clonando apenas as ramificações que foram realmente alteradas.
- `CREDENTIAL_PATTERNS` cobre chaves do fornecedor LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves de nuvem ( chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves privadas / JWTs, suporte de strings de ligação de credenciais (`mongodb://user:pass@...`, etc.) e um padrão genérico de valor de cabeçalho `Authorization`/`x-api-key`/`api-key`/`apikey`. As chaves em formato de cabeçalho (`authorization`, `x-api-key`, `api-key`, `apikey`) são editadas estruturalmente (apenas valor, prefixo de esquema como `Bearer `/`Basic ` preservado) em vez de através da regex de texto genérico.
- Um valor atrás de um rótulo é mascarado mesmo quando não tem prefixo de fornecedor: `DB_PASSWORD=…`, `AWS_SECRET_ACCESS_KEY=…`, `client_secret: …`, `?api_key=…` (rótulos: `password`, `passwd`, `secret`, `secret_key`, `secret_access_key`, `api_key`, `access_token`, `refresh_token`, `auth_token`, com qualquer prefixo como `DB_`). O rótulo e o separador mantêm-se e o valor passa a ser `[REDACTED:secret]`. O valor precisa de 12 ou mais caracteres, pelo que prosa como `password: required` permanece legível; um valor que começa por `$` ou `%` (uma referência de variável) é posto de lado.
- O guarda-corpos nunca bloqueia; apenas reescreve (`modifiedPayload` / `modifiedResponse`) e anota (`meta.credentialsRedacted`, `meta.count`).

Guarda de regressão: `tests/unit/credential-masker-guardrail.test.ts`.

### Agente Guarda (`agentGuard/`)

O agente guard classifica o cliente por detrás de um pedido ao fornecedor `claude` ou `anthropic` a partir dos seus cabeçalhos. `AGENT_GUARD_MODE` assume três valores: `off` (padrão), `monitor` e `block`. Com `off`, não é lido nenhum cabeçalho e nada é registado.

Os agentes oficiais são reconhecidos por estes cabeçalhos (comparados sem distinção entre maiúsculas e minúsculas):

- Código Claude : um `User-Agent` que começa por `claude-cli/` ou `claude-code/`, ou `x-app: cli` juntamente com um cabeçalho `anthropic-beta` ou um `User-Agent` que contém `claude`.
- Anthropic SDKs: um `User-Agent` que começa por `Anthropic/`, `AsyncAnthropic/`, `anthropic-typescript/` ou `anthropic-python/`.

O nível padrão do criador de registos em produção (`info`) mostra ambos os tipos de linha. Com o `APP_LOG_LEVEL=warn` apenas as linhas de terceiros conhecidas permanecem.

Campos de registo: `agent`, `thirdParty`, `provider`, `model`, `apiKeyId`, `userAgent`, `xApp`, `anthropicBeta`, `xTitle`, `referer`, `stainless`. Os valores do cabeçalho e a sequência do modelo estão limitados a 200 caracteres. O referenciador é registado sem a sua string de consulta, fragmento e informação do utilizador. A chave API, `Authorization`, `x-api-key` e cookies nunca são lidas.

Ficheiros: `src/lib/guardrails/agentGuard/classifier.ts`, `src/lib/guardrails/agentGuard/policy.ts`, `src/lib/guardrails/agentGuard/guardrail.ts`, `src/lib/guardrails/agentGuard/settings.ts`, `src/lib/guardrails/agentGuard/logLine.ts`, `src/lib/guardrails/agentGuard/enforcement.ts`, `src/sse/handlers/chat/agentGuardGate.ts`.

**Limites de classificação (ambos os modos):**

- Um agente construído num SDK oficial que não envia `X-Title`, `HTTP-Referer` ou `User-Agent` próprio parece-se com o SDK. Os cabeçalhos `x-stainless-*` por si só não tornam um cliente oficial.
- Os agentes terceirizados são correspondidos por tokens de palavras inteiras em `User-Agent`, `X-Title` e `HTTP-Referer` (ou `Referer`). Os clientes não listados aparecem como `unknown`.
- Os pedidos de clientes baseados no browser carregam o próprio `User-Agent` do browser e aparecem como não identificados, a menos que `X-Title` ou o referenciador carregue um token de terceiros conhecido.
- Uma linha de registo por pedido observado: aguarde volume em instâncias ocupadas.

#### Monitor

Com `AGENT_GUARD_MODE=monitor`, os pedidos cuja sequência de modelo nomeia o fornecedor `claude` ou `anthropic` são classificados pelos seus cabeçalhos de cliente. Quando o cliente não é um agente oficial, é gravada uma linha de registo com `tag: "AGENT_GUARD"`. É `warn` para um agente externo conhecido e `info` para um cliente não identificado. Prioridade `1`: o guardrail apenas lê os cabeçalhos e nunca altera a carga útil, pelo que é executado antes das pontes de media. `monitor` nunca bloqueia.

**Limites de `monitor`:**

- Cada sinal é um cabeçalho controlado pelo cliente. Isto é observação, não controlo de acessos.
- O fornecedor é lido na sequência do modelo antes de o modelo ser resolvido: `provider/model`, um alias de fornecedor como `cc/…` e IDs de partilha de quota (`qtSd/<group>/<provider>/<model>`). Os IDs de modelo simples, os aliases de modelo, os combos e a posterior normalização de encaminhamento não são seguidos. Estas solicitações não são atendidas.
- Um chamador pode ignorá-lo por pedido através dos canais de desativação do registo (consulte [Desativar Guardrails por pedido](#disabling-guardrails-per-request) ). Solicitações ignoradas não são observadas.
- É executado apenas onde `runPreCallHooks` é executado (consulte [Cobertura e limites](#coverage-and-limits) ).

#### Bloco

Com o `AGENT_GUARD_MODE=block`, o guardrail pré-chamada não faz nada. Em vez disso, o manipulador do chat toma a decisão:

1. A decisão é tomada quando um alvo está prestes a ser despachado, no fornecedor para o qual o pedido foi resolvido. Os aliases de fornecedor, os IDs de modelo simples, os IDs de partilha de quota e todos os alvos combinados são abordados.
2. Não é executado no registo guardrail, pelo que os canais desativados por solicitação não se aplicam a ele.
3. Um agente externo conhecido é recusado. Um cliente não identificado é registado como em `monitor` e recusado apenas com `AGENT_GUARD_STRICT=true`. O código Claude e o Anthropic SDKs oficial nunca são recusados.
4. A recusa é HTTP 403 com `error.type` `permission_error` e `error.code` `client_agent_not_allowed`. O corpo é um erro ao estilo OpenAI. Nos pedidos no formato Antrópico, também carrega `type: "error"` no nível superior. Não existe cabeçalho `Retry-After` e a recusa é devolvida antes do início de qualquer fluxo.
5. Uma recusa não é uma falha do fornecedor. Não afeta o disjuntor do fornecedor, os arrefecimentos da ligação ou os bloqueios do modelo.
6. Num combo, um alvo recusado é ignorado e os restantes alvos são executados. O pedido falha com o erro de política quando pelo menos um alvo foi recusado e nenhum alvo passou pela guarda. O combo mantém o seu próprio erro quando uma entrada de nível superior nomeia outro fornecedor conhecido, por um prefixo ou pelo ID do fornecedor da etapa. Um alvo de prioridade recusado com `fallbackOnlyOnQuotaExhaustion` é ignorado da mesma forma e não interrompe o combo. Um alvo sombrio é verificado e registado, mas nunca conta como um alvo que passou pela guarda.
7. Um combo `fusion` falha antes de o painel ser executado, altura em que o juiz que o serviço de fusão utilizará será recusado. Este juiz vem da configuração do combo ou dos padrões globais do combo. A mesma verificação é executada quando um combo de fusão é alcançado através do redireccionamento da rede de segurança.
8. Uma linha de log por pedido e fornecedor, com `tag: "AGENT_GUARD"`, `warn` para recusa e os mesmos campos de `monitor`.
9. Em caso de erro interno, a proteção falha a abertura. O pedido prossegue e uma linha `warn` `agent guard failed open` é registada.

**Limites de `block`:**

- Cada sinal é um cabeçalho controlado pelo cliente. Um cliente que envia `User-Agent: claude-cli/…` é tratado como código Claude. `block` dissuade agentes terceirizados não modificados. Não é controlo de acessos.
- Um proxy que remove os cabeçalhos de identificação transforma qualquer cliente num cliente não identificado. Esse cliente é atendido sem `AGENT_GUARD_STRICT` e recusado. Execute a guarda na instância que enfrenta os clientes. Uma segunda instância OmniRoute atrás da primeira vê os cabeçalhos da primeira.
- `AGENT_GUARD_STRICT` recusa todos os clientes destes fornecedores que não sejam o código Claude ou um SDK oficial. Isto inclui clientes baseados no browser e o playground do painel. O teste ao vivo do painel combinado está isento, também através do redirecionamento da rede de segurança.
- Alguns recursos criam o seu próprio pedido de chat em vez de repassar o pedido do cliente. Quatro deles enviam de volta através das rotas `/v1/...` de OmniRoute:
  - trabalhos em batch (`src/lib/batches/dispatch.ts`)
  - as ferramentas de inferência MCP (`open-sse/mcp-server/tools/inferenceTools.ts`)
  - Encaminhamento inteligente A2A (`src/lib/a2a/skills/smartRouting.ts`)
  - a ponte de visão quando descreve uma imagem através de OmniRoute (`src/lib/guardrails/visionBridgeHelpers.ts`)
- O proxy de chat Telegram (`src/lib/telegram/chatProxy.ts`) cria o seu pedido em processo e chama o manipulador de chat diretamente.
- Estes pedidos internos transportam os próprios cabeçalhos de OmniRoute, e não os cabeçalhos do cliente que os iniciou. O guarda classifica-os como clientes não identificados.
- Sem `AGENT_GUARD_STRICT`, estes pedidos internos são atendidos nos fornecedores protegidos, seja qual for o cliente original. Um agente terceirizado que chegue Claude através deles não será recusado.
- Com o `AGENT_GUARD_STRICT`, estes pedidos internos são recusados nos fornecedores protegidos que os iniciaram, incluindo o código Claude.
- Apenas as solicitações que passam pelo manipulador de chat são bloqueadas. A validação do modelo (`src/lib/modelValidation/runner.ts`) chama o núcleo do pedido diretamente e não é bloqueada.
- Apenas os fornecedores `claude` e `anthropic` estão cobertos. Os modelos Claude servidos por outro fornecedor não estão cobertos, nem o fornecedor `claude-web`.
- Alguns combos nomeiam os seus destinos restantes sem um prefixo de fornecedor, como IDs de modelo simples ou combos aninhados. Quando estes alvos estão indisponíveis por um motivo não relacionado (disjuntor aberto, arrefecimento, bloqueio), o pedido falha com o erro de política.
- Um alvo de combo ignorado limpa o último pino válido desse alvo, como qualquer alvo ignorado faz.
- Um juiz de fusão nomeado com um prefixo de prestador protegido é recusado antes da execução do painel. Isto abrange `anthropic/…`, `claude/…`, um alias como `cc/…`, um sufixo de contexto como `[1m]` e nomes de quota partilhada nesses fornecedores.
- Um juiz de fusão escrito como um ID de modelo simples, ou como um alias de modelo que resolve para um fornecedor protegido, é recusado apenas quando é despachado. O painel já foi executado até então. Nomear o juiz com o seu prefixo de provedor evita isso. Nenhuma ortografia do juiz chega a um fornecedor protegido sem ser recusada.
- A pré-verificação recusa um juiz Claude configurado mesmo quando o serviço de fusão descarta esse juiz em tempo de execução. O serviço dispensa um juiz que a operadora escondeu e um juiz que não pode atender aos meios de comunicação do pedido. O segundo caso abrange o suporte visual não confirmado e outros meios de comunicação que o juiz não aceita. Ambos os caminhos combinados se comportam desta forma.
- No redireccionamento da rede de segurança, o serviço combinado recebe definições vazias. Um juiz definido apenas nos padrões do combo global nunca é utilizado lá.
- Enquanto `block` estiver ativado, um cliente que o guarda recusaria num fornecedor protegido não utiliza o atalho sidecar, para nenhum modelo. Em `AGENT_GUARD_STRICT` estão todos os clientes não identificados. Após a verificação do token de retransmissão, `POST /v1/relay/chat/completions/bifrost` responde a estes pedidos com um 503 e o cabeçalho `X-Bifrost-Fallback`.
- `POST /v1/messages/count_tokens` fornece a estimativa local para um cliente que o guarda recusaria no fornecedor para o qual o modelo resolve.
- Não há isenção por chave.

## Contrato Base (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true faz curto-circuito à cadeia
  message?: string; // exposta ao bloquear
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // devolvido por preCall para reescrever o pedido
  modifiedResponse?: TValue; // devolvido por postCall para reescrever a resposta
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Uma guardrail assinala "sem alterações" devolvendo `void`, `{}` ou
`{ block: false }`. Devolver um `modifiedPayload`/`modifiedResponse` substitui
o valor que flui através da cadeia para as guardrails a jusante.
`signal?: AbortSignal` transporta o ciclo de vida do chamador para dentro das
guardrails. Um abort do pedido é a exceção deliberada de fail-open: as media
bridges interrompem o trabalho e fazem a limpeza sem restaurar o conteúdo
multimédia original para um destino que se sabe não o suportar.

## Registo (`registry.ts`)

O singleton `guardrailRegistry` expõe:

- `register(guardrail)` — adiciona (ou substitui pelo nome normalizado) um guardrail e reclassifica por ordem crescente `priority`.
- Ajudantes administrativos `clear()` / `list()` —.
- `runPreCallHooks(payload, context)` — itera guardrails ativos, encadeia a carga útil através `modifiedPayload` e pára no primeiro `block: true`.
- `runPostCallHooks(response, context)` — mesmo fluxo no lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e, opcionalmente, volta a registar os padrões para o isolamento de teste limpo.

Ambos os executores devolvem `{ blocked, payload|response, results, guardrail?, message? }` em que `results` é uma matriz de registos `GuardrailExecutionResult` que inclui os campos `blocked`, `skipped`, `modified`, `error` e `meta` por guardrail, úteis para o rastreio.

### Desativando os Guardrails por solicitação

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma lista desduplicada de nomes de guardrail que devem ser ignorados no pedido atual. Existem cinco canais, lidos por esta ordem e fundidos numa lista (a primeira ocorrência ganha na desduplicação):

1. `apiKeyInfo.disabledGuardrails`
2. Corpo do pedido `disabledGuardrails` (nível superior)
3. Solicitar corpo `metadata.disabledGuardrails` (apenas quando `metadata` é um objeto)
4. Cabeçalho `x-omniroute-disabled-guardrails`
5. Cabeçalho legado `x-disabled-guardrails`

Todos os cinco canais são fundidos, os dois cabeçalhos incluídos: o envio `x-omniroute-disabled-guardrails` e `x-disabled-guardrails` ignora a união das suas listas, e um cabeçalho moderno vazio já não oculta o legado ( [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412), corrigido em [#16805](https://github.com/cheaper-inference/OmniRoute/pull/16805) ).

Os valores podem ser arrays de strings ou uma string separada por vírgulas; os nomes são cortados e normalizados para letras minúsculas kebab-case (`pii_masker` → `pii-masker`) e as entradas vazias são eliminadas. O resultado é passado por `context.disabledGuardrails` para o registo, que ignora as protecções correspondentes (`skipped: true` em `results`).

A lista de desativação apenas afeta o** registo** . O modo `block` de injeção de prompt é um limite obrigatório: o middleware de proteção de injeção (`src/middleware/promptInjectionGuard.ts`) chama `evaluatePromptInjection()` sem qualquer lista de desativação controlada pelo chamador (a chamada `resolveDisabledGuardrails({ body })` morta que ele costumava fazer foi removida em [#16934](https://github.com/cheaper-inference/OmniRoute/pull/16934) ), pelo que um pedido que desativa `prompt-injection` ainda é rejeitado no modo `block`. Isso ocorre intencionalmente. Os canais desativados são controlados pelo chamador (corpo do pedido, metadados, cabeçalhos) e um chamador não deve ser capaz de desligar um controlo de segurança definido pelo operador ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). A união de cabeçalho do [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412) altera apenas quais as proteções de registo que são ignoradas; não permite que um cliente ignore o middleware. As políticas de proteção obrigatórias por chave e por grupo são rastreadas na v4 RFC [#16417](https://github.com/cheaper-inference/OmniRoute/issues/16417). Consulte [Cobertura e limites](#coverage-and-limits).

## Ordem de execução

Para cada pedido que percorra `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts` (as rotas da família de chat listadas em
[Cobertura e limites](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` cria a lista de exclusão a partir da chave da API, do corpo e dos cabeçalhos.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` executa os guardrails por ordem crescente de prioridade:
   - Os guardrails desativados são registados como `skipped`.
   - O `preCall` de cada guardrail pode reescrever o payload através de `modifiedPayload`.
   - O primeiro `block: true` interrompe a cadeia e o handler devolve uma resposta de rejeição do guardrail.
3. O payload (potencialmente reescrito) é encaminhado para o roteamento de combinações e o envio para o serviço upstream.
4. **Apenas em respostas não transmitidas:** depois de a resposta ser montada, `guardrailRegistry.runPostCallHooks(...)` executa a mesma cadeia sobre a resposta. Um `block: true` nesta fase descarta a resposta do serviço upstream e devolve HTTP 400. As respostas transmitidas ignoram completamente esta etapa.
5. **Apenas no cofre reversível:** quando o pedido cria tokens, `handleChat` restaura-os na resposta 2xx que devolve, depois dos hooks pós-chamada e da transformação PII da transmissão, para que `PII_RESPONSE_SANITIZATION` veja tokens e PII gerados pelo modelo, nunca um original restaurado.

Os guardrails que lançam exceções são registados com `error: <message>` e registados através de `logger.warn`, mas a cadeia continua — comportamento fail-open por conceção.

## Cobertura e limites

O registo guardrail está ligado apenas ao pipeline de chat. Estes limites são fixados por `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` e `tests/unit/guardrail-pipeline-characterization.test.ts`; atualize estes testes deliberadamente quando o comportamento mudar.

### Onde os ganchos correm

| Gancho / comando                               | Continua                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                              | Pedidos tratados por `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (e `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` e o proxy de chat Telegram. Além disso, o endpoint de teste do painel `/api/guardrails/test`. Um bloco de pré-chamada devolve HTTP 400. |
| `runPostCallHooks`                             | **Sem streaming** apenas respostas de chat (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). As respostas transmitidas nunca lhe chegam.                                                                                                                                                                                                                                                                                             |
| Streaming PII                                  | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), canalizado em `streamingPipeline.ts` quando `PII_RESPONSE_SANITIZATION` está activado. Não é um guarda-corpo, pelo que os canais desativados não o afetam.                                                                                                                                                                                                                   |
| Cofre reversível PII                           | Pedidos tratados apenas pelo `handleChat`, quando `PII_REDACTION_ENABLED` e `PII_REVERSIBLE_VAULT_ENABLED` estão ativados. Os tokens são emitidos pela pré-chamada `pii-masker` e restaurados na saída `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Desativar `pii-masker` para um pedido significa que nada será cunhado.                                                                                                      |
| Middleware de proteção contra injeção (legado) | Cada rota `/v1` imediata, família de chat incluída (consulte [a cobertura da rota](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Apenas injeção imediata.                                                                                                                                                                                                                                                                 |

### O que não está coberto

- **Media, incorporações e rotas de dados** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) nunca atinge o registo. Nenhum mascaramento PII, mascaramento de credencial ou ponte de modalidade é executado lá. A sua única verificação é o middleware herdado de proteção contra injeção.
- **Respostas transmitidas** não obtenha proteções pós-chamada: sem pós-chamada `pii-masker` ou `credential-masker` e sem bloqueio pós-chamada. Apenas a transformação PII de streaming se aplica (quando `PII_RESPONSE_SANITIZATION` está ativado). Uma credencial ecoada numa resposta transmitida não é editada.
- **Desative canais versus middleware (por design):** o middleware avalia a injeção imediata com a sua própria chamada a `evaluatePromptInjection()`, sem passar qualquer lista de desativação controlada pelo chamador. O modo `block` é um limite obrigatório que as desativações controladas pelo chamador não podem ignorar, incluindo nas rotas de família de chat ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). Desativar `prompt-injection` apenas ignora a proteção do registo.

### O que vê uma resposta antes da pós-chamada

No caminho sem streaming, a ordem é: extração de memória → execução da ferramenta integrada → guarda-corpos pós-chamada → saída do bloco pós-chamada → armazenamento de cache semântico.

- **Extração de memória** e** execução de ferramenta** ver a resposta antes que as proteções pós-chamada possam reescrevê-la ou bloqueá-la. Desde [#16401](https://github.com/cheaper-inference/OmniRoute/pull/16401), a extração de memória executa o texto extraído através `sanitizePII` quando `PII_RESPONSE_SANITIZATION` está ativado (streaming e não streaming), mas uma resposta que blocos posteriores pós-chamada ainda foi oferecida à memória e às ferramentas.
- **O cache semântico** armazena a resposta após a pós-chamada, pelo que armazena a resposta reescrita e uma resposta bloqueada nunca é armazenada em cache. As entradas de cache são codificadas por chave API.

## Configuração

Variáveis de ambiente lidas pelas proteções integradas:

| Variável                              | Usado por                  | Efeito                                                                                                                             |
| ------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Configure `false` para desativar totalmente a deteção.                                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Política de injeção: `warn`, `block` ou `log`. O valor herdado `redact` não reescreve o texto de injecção.                         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modo para proteção de injeção; também um sinalizador de recurso DB que** substituições** os env vars (DB > ENV).                   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Gravidade mínima que `MODE=block` rejeita: `high` (padrão), `medium` ou `low`.                                                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias legado para `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Quando `true`, o pedido PII é editado (independentemente do modo de injeção).                                                      |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Com `PII_REDACTION_ENABLED`, crie tokens reversíveis e restaure-os em respostas 2xx.                                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (a jusante)   | Controla o comportamento do mascarador do lado da resposta.                                                                        |
| `AGENT_GUARD_MODE`                    | `agent-guard`              | `off` (padrão), `monitor` ou `block`. Também um sinalizador de recurso DB (DB > ENV).                                              |
| `AGENT_GUARD_STRICT`                  | `agent-guard`              | `false` (padrão) ou `true`. Com `block`, também recusa clientes não identificados. Também um sinalizador de recurso DB (DB > ENV). |

Os guardrails do Modality Bridge lêem a configuração do tempo de execução do armazenamento de definições suportado pela base de dados (`getSettings()`), e não env vars. As chaves primárias do Vision são `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`. As chaves `visionBridge*` herdadas são apenas aceites como substituto de leitura de um ciclo documentado; as gravações do painel utilizam as chaves primárias. Os padrões e o resolvedor substituto residem em `src/shared/constants/modalityBridgeDefaults.ts`, com constantes herdadas retidas em `src/shared/constants/visionBridgeDefaults.ts`.

O áudio utiliza `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, além das definições `modalityBridgeCache*` partilhadas. O áudio não tem substituto de chave legada porque estas chaves foram introduzidas com o esquema Modality Bridge.

O vídeo utiliza `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` e `modalityBridgeVideoTimeout`, para além das definições `modalityBridgeCache*` partilhadas. Está desativado por defeito porque FFmpeg/ffprobe são dependências operacionais opcionais e a legenda de fotogramas adiciona latência e custo de modelo.

## Guardrails personalizados

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Passos:

1. Criar `src/lib/guardrails/myGuardrail.ts` a estender `BaseGuardrail`.
2. Implementar `preCall` e/ou `postCall`.
3. Registar no momento da importação (push a partir de
   `registerDefaultGuardrails`) ou chamar `guardrailRegistry.register(...)` em
   tempo de execução — o registo substitui qualquer guardrail anterior com o
   mesmo nome normalizado.
4. Adicionar testes em `tests/unit/` (exemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testes

Utilize `resetGuardrailsForTests()` entre testes para partir de um estado
conhecido. Passe `{ registerDefaults: false }` para começar com um registo
vazio e registar apenas os guardrails em teste. O Vision Bridge aceita injeção
de dependências (`deps.getSettings`, `deps.callVisionModel`); o Audio Bridge
expõe os pontos de extensão equivalentes para definições, capacidades, seleção
do modelo STT, verificações de credenciais e transcrição. Os testes podem
assim exercer ambos os fluxos sem acesso à base de dados ou à rede.

## Ver também

- `src/lib/guardrails/` — implementação
- `src/shared/utils/inputSanitizer.ts` — detetor partilhado que alimenta a
  deteção de injeção de prompts e o mascaramento de PII
- `src/shared/constants/visionBridgeDefaults.ts` — predefinições do Vision
  Bridge e lista de modelos de bridge forçada
- `src/shared/constants/modalityBridgeDefaults.ts` — predefinições de runtime
  partilhadas de Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — camada ortogonal (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — referência completa de variáveis de ambiente

## Cobertura da rota da guarda de injeção e da equipa vermelha (Fase 8 · Bloco D)

O protetor de injeção (`createInjectionGuard` / `withInjectionGuard`) cobre todas as rotas que aceitam pedidos do utilizador. Respeita `INJECTION_GUARD_MODE` (apenas `warn` = log padrão; `block` = retorna HTTP 400 `SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo padrão |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | avisar      |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | avisar      |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | avisar      |

A extracção de texto (`extractMessageContents`) abrange `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system`.

**Equipa vermelha (noturno, `nightly-llm-security.yml`):** promptfoo valida que cada rota bloqueia o corpus OWASP-LLM em `INJECTION_GUARD_MODE=block`; garak executa testes (salta sem segredo). `moderations` está incluído para consistência. O modo de bloco é um limite obrigatório: `evaluatePromptInjection()` ignora a lista de desativação por pedido que o middleware passa, pelo que `disabledGuardrails` o faz** não** isentar uma rota do mesmo ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ).

O fluxo de trabalho noturno (`.github/workflows/nightly-llm-security.yml`, cron + envio manual) tem dois trabalhos:

- **`promptfoo-guard` (bloqueio)** — executa `promptfoo eval -c promptfooconfig.yaml` com `INJECTION_GUARD_MODE=block`. Cada caso adversário (por exemplo, "ignorar todas as instruções anteriores…", jailbreaks estilo DAN) afirma que a resposta carrega `error.code === "SECURITY_001"`, ou seja, o guarda rejeitou realmente o pedido.
- **`garak` (consultivo)** — executa garak `--probes promptinject,dan,leakreplay` numa instância local OmniRoute (`http://localhost:20128/v1`). Fechado num segredo de provedor (`PROMPTFOO_PROVIDER_KEY`); salta normalmente e tem o sufixo `|| true`, pelo que reporta sem falhar CI.

A cobertura do auxiliar de guarda (`createInjectionGuard` / `withInjectionGuard`) abrange todas as rotas `/v1` que suportam o prompt; o texto do prompt é extraído de `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system` por `extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
