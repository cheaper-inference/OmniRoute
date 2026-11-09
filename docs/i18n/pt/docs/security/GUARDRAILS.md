# Guardrails (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte de verdade:** `src/lib/guardrails/`
> **Última atualização:** 2026-10-17 — v3.8.52 (adicionada [Cobertura e limites](#coverage-and-limits):
> que rotas e caminhos de resposta os hooks alcançam, os cabeçalhos de desativação
> combinados (#16412), o modo de bloqueio de injeção como fronteira obrigatória
> (#16413), e o que vê uma resposta antes do pós-chamada)

Os guardrails aplicam segurança, política e transformações de conteúdo na fronteira
entre o OmniRoute e os fornecedores a montante. Cada guardrail pode inspecionar (e,
opcionalmente, rejeitar, transformar ou anotar) os payloads de pedidos (`preCall`)
e as respostas a montante (`postCall`).

O sistema é **fail-open**: se um guardrail lançar uma exceção durante a execução, o
registo assinala o erro e continua com o guardrail seguinte em vez de falhar o
pedido. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente.
A única exceção é um pedido abortado: quando o `signal` do chamador é abortado,
um guardrail que lance exceção rejeita a execução do hook em vez de ser ignorado.

Os hooks **não** são executados em todas as rotas nem em todas as respostas. Leia
[Cobertura e limites](#coverage-and-limits) antes de confiar num guardrail como
controlo de segurança.

## Guardrails integrados

O registo carrega automaticamente seis guardrails por ordem de prioridade na
importação (ver `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Fase(s)        | Ficheiro              |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Os números de prioridade mais baixos são executados **primeiro**.

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

| Modo       | Predefinição | Comportamento                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Heurística herdada, intocada (#6640/#7204): os modelos não-combo/`auto/` redirecionam para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (depois descreva); os alvos do combo descrevem sempre.                                                                                    |
| `describe` |              | Descreva sempre — o bloco de redireccionamento será totalmente ignorado; o modelo escolhido pelo utilizador responde sempre.                                                                                                                                                                                                  |
| `reroute`  |              | Forçar novo encaminhamento: o guarda do modelo mantido credenciado é ignorado. O redireccionamento-** objetivo** O protector de credenciais ainda aplica — quando não existe nenhum alvo de visão utilizável, a ponte bloqueia com um erro claro em vez de descrever ou enviar imagens em bruto para um alvo apenas de texto. |

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

A página dedicada do painel é `/dashboard/settings/modality-bridge`. Os seus separadores `Vision`, `Audio` e `Video` endereçáveis por URL preservam os parâmetros de consulta enquanto alternam o valor `tab`. O separador Visão expõe a ativação, o modo, a seleção de modelo (incluindo o padrão automático), o pedido de reconhecimento de tarefas, os limites timeout/image/description-length/cache avançados, os contadores de tempo de execução e um pedido de amostra protegida. O separador Áudio também está ativo: expõe a ativação, um seletor de modelo apenas STT com Automático, limites timeout/max-clip, contadores de áudio e um teste de amostra `input_audio`. O separador Vídeo é funcional: reporta o estado de tempo de execução FFmpeg/ffprobe — um dos quatro estados UI explícitos (`unknown` enquanto o teste está em curso ou não pôde ser concluído, `restricted` num host de painel sem loopback onde o teste é ignorado no lado do cliente, `unavailable` uma vez testado e confirmado como ausente ou `available` com as versões FFmpeg/ffprobe ) — persiste nos limites enable/model/frame/video/timeout, filtra o seletor de modelo para modelos com capacidade de visão e expõe contadores de vídeo.

A antiga placa Vision Bridge nas definições AI é um link de compatibilidade para a nova página; já não possui uma segunda via do formulário. Os fornecedores de media também ligam os fluxos de trabalho de imagem para texto e de fala para texto aos separadores correspondentes do Modality Bridge sem remover o playground existente de fala para texto.

**Bypass de admissão de auto-loop:** quando a chamada de descrição encaminha através do próprio auto-loop `/v1` de OmniRoute(modelo de fornecedor não padrão), a subsolicitação envia `x-omniroute-admission-bypass: internal` e é autenticada com a credencial de auto-loop resolvida — o `sk_omniroute` sentinela local no modo local ou a chave `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env configurada pelo operador (#1350) para que as implementações `REQUIRE_API_KEY=true` ainda possam executar a chamada de descrição. O desvio só é respeitado para estas credenciais exatas, pelo que os clientes externos não podem utilizar o cabeçalho para ignorar a admissão.

Os padrões legados residem em `src/shared/constants/visionBridgeDefaults.ts`; os novos padrões mode/task-aware/cache e o resolvedor de configurações residem no `src/shared/constants/modalityBridgeDefaults.ts`. O guardrail expõe uma opção de construtor `deps` para que os testes possam injetar implementações falsas `getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Interceta pedidos de chat que transportam áudio antes de chegarem a um destino que não se sabe aceitar entrada de áudio. Nunca reencaminha o pedido de chat: as partes de áudio são transcritas através do endpoint multipart existente compatível com OpenAI e o modelo de chat escolhido prossegue com transcrições em texto.

Fluxo:

1. Determina o `supportsAudio` através de `getResolvedModelCapabilities()`.
   Os metadados explícitos do registo de fornecedores prevalecem, seguidos
   pelos metadados estáticos do modelo e, por fim, pelo `modalities_input`
   sincronizado. Uma lista de entradas declarada sem `audio` resulta em
   `false`; sem evidência de capacidade, o valor permanece `null`. Tanto
   `false` como `null` ativam a bridge conservadora, enquanto `true` a
   contorna.
2. Determina as definições `modalityBridgeAudio*` e extrai as partes de
   áudio de nível superior passíveis de splice de cada mensagem através do
   detetor partilhado `detectMediaParts()`. Os formatos de transmissão
   suportados são `input_audio` da OpenAI, `audio_url` e
   `source.media_type: "audio/*"`. O áudio aninhado é detetado para
   encaminhamento, mas não é removido pelo caminho de splice. O trabalho é
   limitado por `modalityBridgeAudioMaxClips`; as partes subsequentes
   permanecem intocadas.
3. Respeita um `provider/model` configurado ou deixa o
   `selectAudioBridgeModel()` percorrer `AUDIO_TRANSCRIPTION_PROVIDERS` na
   ordem estável do catálogo e selecionar o primeiro modelo com uma
   credencial de fornecedor ativa e utilizável.
4. O `callAudioTranscription()` converte áudio em base64/data-URI num
   `file` multipart ou transfere um `audio_url` remoto através da proteção
   de saída restrita a destinos públicos, com DNS pinning e um limite de
   25 MB. Em seguida, envia por POST o ficheiro e o modelo selecionado para
   o self-loop local `/v1/audio/transcriptions`, autenticado com
   `resolveSelfLoopBearer()`. A rota de transcrição existente executa a
   pesquisa normal de credenciais, o tratamento de cooldown/rate-limit e o
   despacho para o fornecedor.
5. As chamadas bem-sucedidas substituem as respetivas partes por
   `[Audio N]: <transcript>`. As chamadas são executadas com
   `Promise.allSettled`: uma falha individual preserva essa parte de áudio
   original (contrato #4012). Se todas as chamadas falharem e o destino
   tiver comprovadamente `supportsAudio === false`, as partes passam a ser
   `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430).
   Para um destino desconhecido (`null`), um resultado de falha total
   permanece intocado. Um destino comprovadamente apenas de texto, sem
   credencial STT utilizável, recebe o mesmo stub explícito sem efetuar
   qualquer chamada de rede.

As transcrições bem-sucedidas utilizam a cache LRU/TTL da Modality Bridge à
escala do processo. A chave combina a referência de áudio, a etiqueta de
operação estável `audio-transcription` e o modelo STT selecionado; as falhas
nunca são colocadas em cache. As tentativas de áudio atualizam os contadores
partilhados `bridged`, `cacheHits`, `failures` e `lastUsedAt`. As respostas
transformadas transportam
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; os
pedidos não modificados não recebem um segmento de Audio Bridge.

As definições de runtime são persistidas em base de dados e validadas com
Zod:

| Chave                         | Predefinição | Intervalo               |
| ----------------------------- | ------------ | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                       |
| `modalityBridgeAudioModel`    | `""`         | Automático ou ID de STT |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10                    |

A cache partilhada continua a ser controlada por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em Conclusões de chat `messages` e Respostas API `input` antes de um destino sem suporte de vídeo nativo conhecido ser chamado. As formas suportadas são `input_video`, `video_url`, `video_source`, HTTPS URLs e `data:video/*;base64,...` data URIs. Os nomes de ficheiros simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) possui a travessia do pedido, a verificação capability/policy, a agregação por pedido e a carga útil da resposta. Aquisição — de trabalho por vídeo, o cache de resultado completo, descrevendo uma sequência de fotogramas (que funde qualquer transcrição de áudio declarada pelo chamador) e metrics/abort/cleanup — por tentativa está oculto atrás de `processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez por parte do vídeo dentro do loop de `preCall`. Este módulo também define os limites de porta explícitos `VideoMediaBrokerPort` (adquirir bytes e extrair fotogramas amostrados), `VideoAudioTranscriptionPort` (fundir uma transcrição áudio declarada pelo chamador com as legendas amostradas) e `VideoDrilldownPort` (a forma herdada de armazenamento em bruto). A produção STT e a retenção de quadros são compostas em torno da porta de descrição através `createVideoSttAdapter` e `createVideoDrilldownAdapter`; este último utiliza o ciclo de vida partilhado do identificador opaco.

O caminho de pedido `/v1` público nunca importa ou invoca um subprocesso. Os vídeos remotos são descarregados com um limite de 50 MiB ; vídeos base64 inline têm um limite conservador descodificado de 36 MiB por vídeo, pelo que o envelope model/messages/framing pode permanecer dentro do limite de admissão de pedido JSON público de 50 MiB. As estimativas de comprimento incorporado e tamanho descodificado são verificadas antes da alocação. HTTPS é necessário no URL remoto inicial e em cada redireccionamento, utilizando a proteção de saída apenas pública existente com fixação DNS. Os bytes cruzam então o limite interno exacto do corrector `POST /api/modality-bridge/video/extract`. Esta rota é `LOCAL_ONLY` e `SPAWN_CAPABLE`, apenas aceita um pedido de loopback fiável autenticado por processo e nunca aceita um URL, caminho do sistema de ficheiros, executável ou lista de argumentos. O pipeline API body-size e o leitor de corpo incremental do manipulador impõem independentemente um limite de entrada do corrector MiB. A sua fila limitada executa uma extração de cada vez, permite quatro trabalhos pendentes e limita a entrada pendente a 100 MiB.

Dentro do corretor, `ffprobe` lê um ficheiro local privado; a lista de permissões de formato fixo elimina os formatos de lista de reprodução e de manifesto. Para os contentores da família MOV permitidos, as referências de dados MOV externas permanecem desativadas por defeito e o comando fixo não as aceita. Tanto `ffprobe` como `ffmpeg` utilizam a lista de permissões do protocolo `file` -only, um thread, arrays de argumentos fixos, sem shell e executáveis resolvidos a partir do `PATH`. Os streams de capa de imagens anexadas não são candidatos jogáveis. Todos os fluxos reproduzíveis devem satisfazer os limites, e um fluxo padrão explícito é preferido antes do substituto determinístico de índice mais baixo. Os vídeos estão limitados a 600 segundos, 8.192 pixéis por dimensão e 33.554.432 pixéis de origem. FFmpeg amostra de 1 a 16 fotogramas JPEG de ponto médio, reduz a borda longa para um máximo de 1024 pixéis sem aumentar a escala de entradas mais pequenas e nunca recebe um URL. A amostragem é `uniform` por defeito. As políticas opcionais `scene_aware` e experimental `segment_aware` executam uma passagem FFmpeg fixa adicional sobre o fluxo local já validado, selecionam carimbos de data/hora de cena `showinfo` limitados e retornam deterministicamente aos mesmos pontos médios uniformes em caso de falha do detetor, tempo limite, saída malformada ou um conjunto de candidatos vazio. O modo com reconhecimento de segmentos aloca as amostras de ponto médio proporcionalmente aos intervalos de cena validados; evidências de reconhecimento de segmentos e comportamento de fallback são detalhadas abaixo. O limite rígido de 16 fotogramas é aplicado após a seleção em todas as políticas. Quando um pedido com reconhecimento de cena tem apenas um orçamento de um fotograma, utiliza o ponto médio uniforme do vídeo completo ativo ou da janela de focagem e reporta `policyEffective: uniform`: um único fotograma de cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode opcionalmente fornecer uma janela de foco finita (`start`/`end` segundos); os limites são limitados à duração do suporte, as janelas invertidas ou não finitas são rejeitadas e todas as políticas de amostragem são executadas apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não fiável para que os modelos a jusante possam distinguir um trecho focado da linha do tempo completa.

O foco da legenda semântica é uma configuração separada e explícita. O modo de análise `full` padrão preserva o pedido do quadro existente e nunca encaminha o texto do pedido para o modelo de legenda. No modo `focused`, a ponte lê apenas o último `text`/`input_text` não vazio de autoria do utilizador do mesmo contentor Chat ou Responses, normaliza-o para NFC, recolhe caracteres de controlo e espaços em branco e limita-o a 500 pontos de código Unicode. Um resultado vazio retorna ao prompt exacto `full`. Uma dica utilizável é serializada como JSON num bloco dedicado de contexto de utilizador não fiável e pode priorizar apenas detalhes observáveis; não pode substituir o aviso separado das instruções visíveis ou audíveis nos suportes. O foco textual nunca infere `start`/`end` nem altera o amostrador temporal.

#### evidência do segmento estrutural FU-07

`segment_aware` utiliza uma passagem de pré-análise limitada sobre o fluxo de vídeo local já validado. A cadeia de filtro fixa é primeiro dimensionada para um máximo de 320 pixels de largura, deteta mudanças de cena e intervalos congelados e, em seguida, faz amostras de 1 fotograma por segundo para desfocagem, luma média e informações spatial/temporal. A passagem está limitada a 600 amostras estruturais, um thread FFmpeg/filter, o mesmo protocolo `file` -only e listas de permissões de contentores, um limite de saída de processo de 1 MiB e um máximo de 30 segundos dentro do abort/deadline. partilhado do corrector. Nunca aceita um comando, filtro, caminho ou URL do pedido.

Os valores estruturais são evidência de amostragem determinística, e não de compreensão semântica do vídeo. Não inferem assuntos, ações, legendas, discurso ou intenção do utilizador. Os limites da cena e do congelamento formam segmentos; cobertura congelada, desfocagem, exposição, detalhes espaciais e mudança temporal apenas influenciam a forma como o orçamento existente de 1 a 16 fotogramas é alocado. Um segmento totalmente congelado está limitado a um quadro, enquanto os segmentos não congelados competem pelo orçamento restante. Quando os limites superam o número de fotogramas, a cobertura uniforme da linha de tempo é mantida, pelo que os cortes iniciais rápidos não conseguem ocultar um segmento final longo. Os limites da cena dentro da resolução de análise de 1 segundo de um limite congelado são unidos.

Filtros em falta, evidência malformed/empty, um erro do detector ou o tempo limite de pré-análise limitado falham a abertura da política de ponto médio uniforme exacta. Uma interrupção do chamador ou prazo do intermediário não falha a abertura: termina o subprocesso em curso, evita a extração posterior de tramas e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera acessórios FFmpeg reais determinísticos para poupanças de chamadas de legenda pós-desduplicação, alocação de orçamento de movimento denso, evidência blur/exposure/SI-TI, cortes rápidos com cauda longa e falsos positivos com desvanecimento gradual. Regista o tempo de parede da pré-análise e, onde `/usr/bin/time` está disponível, filho CPU e pico RSS. As suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legenda permanece `HOLD` porque este chicote não tem endpoint autorizado ou juiz congelado. A poupança monetária também se mantém `HOLD` a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita por chamada; o script nunca fabrica nenhum dos resultados.

Cada fotograma está limitado a 4 MiB, todos os fotogramas em bruto juntos a 23 MiB e a resposta do corrector serializado a 32 MiB. Um diretório temporário privado é removido em `finally`. OmniRoute não empacota FFmpeg e não aceita um caminho executável personalizado. Antes da legenda, a ponte aplica uma passagem de desduplicação visual conservadora: cada JPEG é reduzido a um buffer de 16 × 16 tons de cinzento e é comparado apenas com o último fotograma retido. Para um orçamento de legendas solicitado acima de um quadro, a extração proporciona um conjunto limitado de candidatos até o dobro desse orçamento e nunca mais de 16 quadros. O limite solicitado é aplicado apenas após a desduplicação, sendo o primeiro e o último candidato selecionado preservados durante o desbaste final quando o orçamento é de, pelo menos, dois. A política `grayscale-16x16-mean-cells-v2` versionada utiliza o delta médio de luma mais elevado e a proporção de células miniatura cujo delta normalizado é de, pelo menos, 0,05. O limiar duplicado é a constante 0,04, escolhida pela previsibilidade em vez de exposta como uma definição de tempo de execução. Este sinal secundário de alto contraste preserva pequenos movimentos e alterações de texto visível que uma comparação apenas média pode ocultar. Os erros do comparador ou do descodificador falham a abertura e mantêm a cobertura. Os metadados de saída separam os candidatos extraídos, os quadros utilizados com sucesso e os duplicados visuais eliminados.

Uma parte de vídeo marcada explicitamente pode solicitar uma folha de contacto com registo de data e hora. A ponte constrói no máximo uma grelha JPEG de 4 colunas e 16 quadros. Cada célula de 512 pixéis grava o seu carimbo de data/hora de origem numa banda inferior de alto contraste, enquanto os mesmos carimbos de data/hora permanecem em metadados textuais para associação e auditoria a jusante. O JPEG completo continua limitado a 32 MiB. Se `sharp` não conseguir descodificar ou compor a grelha, a ponte regressará aos quadros JPEG individuais; uma interrupção do cliente ainda se propaga pela operação de folha de cálculo.

A evidência de promoção é deliberadamente separada do microbenchmark da composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um chicote A/B com versão de esquema para modelos de visão reais compatíveis com OpenAI. Mede os tokens reportados pelo fornecedor, a latência de ponta a ponta (incluindo a composição da folha de cálculo), a contagem de chamadas de modelo e a retenção de factos definidos pelo manifesto. As respostas brutas do modelo não são gravadas no relatório; apenas os resumos SHA-256 e os factos correspondentes IDs são retidos. O chicote não faz qualquer chamada de rede ou de modelo pago, a menos que seja passado `--execute-real` e esteja configurado `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY`. Sem esta execução real explícita, o seu veredicto legível por máquina permanece `HOLD`; medições sintéticas payload/call-count por si só não são evidência de promoção.

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

O consumidor obtém a propriedade da chave autenticada e aplica a política de chave: GET e DELETE pertencem à categoria de endpoint `video`, incluindo os alias `/v1` e `/api/v1`. As chaves com uma lista de permissões de endpoint não vazia devem incluir `video`; chaves irrestritas permanecem compatíveis. O consumidor devolve o mesmo 404 para identificadores desconhecidos, expirados e de outra chave. Aceita `variant=preview|standard|detail` (dimensão JPEG máxima 320/640/1280, nunca ampliado), `limit=1..8` (ou o alias herdado `frames`, nunca ambos), `page` baseado em zero e segundos de foco `start`/`end` opcionais. As chaves de consulta duplicadas e as janelas de foco invertido são rejeitadas. Cada variante devolvida tem um hash do seu conteúdo real e metadados de resolução reais, ligados à fonte retida. As variantes são derivadas da leitura, em vez de serem armazenadas como cópias retidas extra. A resposta JSON, incluindo Base64/envelope, está limitada a 32 MiB; uma página sobredimensionada devolve 413 e o cliente deve solicitar menos fotogramas. Lê o cancelamento da verificação em cada redimensionamento e verifica novamente a validade do identificador antes de regressar. `DELETE` pelo proprietário é idempotente; a eliminação ou expiração TTL liberta a fonte retida e a contabilização de utilização.

O armazenamento partilhado é local do processo: os identificadores expiram no reinício e não são transferíveis entre processos OmniRoute independentes. As estatísticas de gestão expõem a política de retenção/remota efetiva e agregam apenas entries/bytes retido, nunca os meios, as referências, IDs principal ou os identificadores. O painel Definições de vídeo mostra estes valores e pode persistir em ambas as opções de consentimento. Esta documentação de implementação não é uma evidência de implementação ou promoção em tempo real; a aceitação do modelo real é rastreada separadamente.

Os fotogramas são legendados sequencialmente com o modelo de vídeo configurado. Uma substituição de vídeo vazia herda a configuração Visão; se ambos estiverem vazios, o router automático Vision seleciona o modelo com capacidade de visão eficaz. As legendas bem-sucedidas substituem a parte original por um prefixo `[Video description:` estável que também marca o texto como uma observação não fiável derivada dos media e diz aos modelos a jusante para não seguirem as instruções encontradas nos media. As chaves de cache de legendas de quadros incluem bytes JPEG, prompt, carimbo de data/hora e modelo efetivo; apenas as legendas bem-sucedidas são armazenadas em cache. As entradas de cache retêm o modelo de produtor real bem-sucedido, incluindo um modelo substituto; a ponte reporta `mixed` quando foram produzidos quadros diferentes por modelos diferentes. Um acerto de cache reutiliza a identidade do produtor em vez de a rotular novamente como o plano de encaminhamento solicitado. A cache de resultados de vídeo inteiro é digitada em cada entrada que altera o prompt — de saída, o modelo efetivo, a política de amostragem, a contagem de quadros, o modo de análise semântica, a impressão SHA-256 da dica de foco normalizada, a janela de foco, `transcript`, `audioTranscript` e o sinalizador da folha de contacto —, pelo que a alteração de qualquer uma destas dimensões é uma falha de cache, nunca uma reutilização obsoleta. A versão da política de desduplicação visual, o limite e a contagem de quadros candidatos limitados também são explícitos na chave e nos metadados da cache de resultados; uma alteração de política, pelo que não pode reutilizar uma descrição obsoleta de todo o vídeo. Os metadados da cache de resultados v4 mantêm o modo e a impressão digital, nunca a tarefa bruta do utilizador. Os metadados Guardrail reportam os modos de análise solicitados e eficazes; um modo `focused` solicitado sem texto de utilizador utilizável é reportado como `full`.

O guardrail extrai todas as partes de vídeo suportadas, mas não descreve mais do que `modalityBridgeVideoMaxVideos`. Para um alvo com `supportsVideo === false` comprovado, os vídeos com falha e acima do limiar tornam-se marcadores de texto seguros explícitos para que nenhum vídeo em bruto sobreviva. Quando a capacidade é desconhecida, estas partes mantêm a sua portadora de vídeo; qualquer transcrição substituta segue a conversão de texto delimitada acima. Os alvos com `supportsVideo === true` contornam a ponte. O sinal de interrupção do pedido do cliente propaga-se através de download, fila do intermediário, subprocessos e chamadas de legenda; os abortos param entre vídeos e nunca falham a abertura dos media brutos.

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

Os valores de tempo limite de vídeo persistentes legados acima de 120 segundos estão limitados ao prazo do corretor; novas definições gravadas acima desse limite são rejeitadas. `GET /api/modality-bridge/video/runtime` requer uma localidade de loopback carimbada fiável antes da autenticação ou investigação em tempo de execução e, em seguida, requer autenticação de gestão. Apenas retorna `available`, versões limpas FFmpeg/ffprobe e um motivo fixo quando o tempo de execução está indisponível. O endpoint de extração interna não é um upload público API: a saturação da fila retorna `503` mais `Retry-After`, uma desconexão do chamador retorna `499` e o prazo fixo do corretor retorna `504`. As respostas convertidas adicionam `video->text;model=<visionModel>;parts=<videos>` ao cabeçalho `x-omniroute-modality-bridge` central sem remover segmentos de visão ou áudio.

### Máscara PII (`piiMasker.ts`)

Continua **ambos** etapas.

- **`preCall`** clona a carga útil, percorre `system`, `messages`, `input` e `prompt` (incluindo itens de cadeia simples) e aplica `processPII()` (de `@/shared/utils/inputSanitizer`) aos campos de cadeia `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, PII detetado é editado na carga útil de saída. Isto é independente do `INPUT_SANITIZER_MODE` (que apenas controla a política de injeção imediata). Quando a redação está desativada, a deteção de registos de chamadas conta sem reescrever o conteúdo.
- **`postCall`** clona profundamente a resposta, executa `sanitizePIIResponse()` mais o mascarador sob a forma de API de respostas (`maskResponsesOutput` — cobre `output_text` e `output[].content[].text`). Se ocorrer alguma formulação, a resposta modificada substitui a original.

O guarda-corpos nunca bloqueia; apenas anota (`meta.detections`, `meta.redacted`) ou reescreve.

#### Seleção por tipo, padrões personalizados e contadores de deteção

**Configurações → do painel Segurança → → Máscara PII** escolhe _o que_ está mascarado. Não ativa o mascaramento: continua a ser `PII_REDACTION_ENABLED` (solicitação) e `PII_RESPONSE_SANITIZATION` (resposta + SSE), ambos desativados por defeito.

- **Seleção por tipo** — os IDs integrados estão listados em `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa todos os tipos (o comportamento antes da existência desta configuração). O padrão `ssn_us` do mecanismo de pedido está mapeado para `ssn`. Os templates (Mínimo, Standard, Financeiro, Brasileiro, USA, GDPR, POPIA, Completo) apenas preenchem as checkboxes do UI.
- **Identificadores GDPR e POPIA** — doze IDs integrados que abrangem os identificadores pessoais EU e sul-africanos (quadro abaixo). As suas expressões regulares, validadores e etiquetas de jurisdição residem numa tabela, `src/shared/utils/piiPatterns.ts`, que é consumida tanto pelo higienizante de resposta (`src/lib/piiSanitizer.ts`) como pelo mascarador de pedido (`src/shared/utils/inputSanitizer.ts`). Uma correspondência é editada apenas quando o seu validador a aceita; uma série de dígitos nunca é suficiente. Um operador que tenha guardado uma seleção restrita antes da existência destes ids mantém o comportamento que tinha até que os novos ids sejam marcados.
- **Padrões personalizados** — até 20 padrões regex ou wildcard (`*` = até 64 caracteres sem espaço em branco, `?` = um). As partidas passam a ser `[CUSTOM_REDACTED]`. Todo o padrão passa por `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): no máximo 500 caracteres, flags limitados a `g i m s u`, devem ser compilados, devem passar por `safe-regex` (retrocesso catastrófico) e não devem corresponder a uma string vazia ou a um espaço reservado de escrita. Um padrão que falha é recusado quando guardado e testado, e uma linha armazenada que falha é ignorada em tempo de execução em vez de ser compilada. Os padrões personalizados só são executados enquanto a máscara está ativada.
- **Contadores de deteção** Contagens — por tipo (valores nunca correspondentes), mantidas na memória e repostas no reset (`src/lib/pii/piiDetectionStats.ts`). Só aumentam enquanto a máscara está ativada.

As configurações encontram-se na tabela `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) e são lidas através de uma cache de 1 s. API:

| Método | Caminho                  | Finalidade                                                                                         |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado das flags, `enabledTypes`, `customPatterns`, contadores de deteção                          |
| `PUT`  | `/api/settings/pii`      | Substituir `enabledTypes` (`null` = todos) e/ou `customPatterns`                                   |
| `POST` | `/api/settings/pii/test` | Execução de teste (dry-run) de um padrão contra uma amostra de, no máximo, 8 KB; nada é armazenado |

Todos os três requerem autenticação de gestão e validam o corpo com Zod (`src/shared/validation/schemas/piiSettings.ts`). Com o login desativado (`requireLogin=false`), `GET` e o endpoint de teste estão abertos, mas `PUT` ainda precisa de uma sessão de painel, uma chave `manage` -scope API, um token de acesso `oma_` com âmbito de escrita ou superior ou o token CLI ou token de serviço interno enviado a partir do loopback.

#### Identificadores GDPR (EU) e POPIA (África do Sul)

| ID                  | Identificador                  | Validação                                                                                  |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                           | País conhecido, comprimento exato para esse país, ISO 13616 MOD-97-10                      |
| `eu_vat`            | Número VAT da UE               | Prefixo de Estado-membro conhecido e formato de número desse Estado (sem consulta ao VIES) |
| `es_dni_nie`        | DNI / NIE espanhol             | Letra de controle (valor mod 23); NIE é `X/Y/Z` + 7 dígitos                                |
| `it_codice_fiscale` | Codice Fiscale italiano        | Letra de controle das tabelas de posições ímpares/pares                                    |
| `pl_pesel`          | PESEL polaco                   | Checksum ponderado e faixas plausíveis de mês/dia de nascimento codificados                |
| `nl_bsn`            | BSN neerlandês                 | Prova de 11 (pesos 9..2, -1)                                                               |
| `de_steuer_id`      | Steuer-ID alemão               | ISO 7064 Mod 11,10 mais as regras de estrutura dos dígitos (sem 0 inicial)                 |
| `se_personnummer`   | personnummer sueco             | Luhn sobre os últimos dez dígitos e data de nascimento plausível (10 ou 12 dígitos)        |
| `za_id`             | Número de ID sul-africano      | Luhn sobre todos os 13 dígitos, mês/dia de nascimento válidos, dígito de cidadania 0 ou 1  |
| `za_phone`          | Telefone sul-africano          | Prefixo `+27` / `27`, ou a forma nacional `0..` escrita com espaço ou hífen                |
| `za_vat`            | Número VAT sul-africano        | 10 dígitos começando com `4` **e** "VAT" / "BTW" nos 48 caracteres anteriores              |
| `za_tax_ref`        | Referência fiscal sul-africana | 10 dígitos começando com `0`-`3`, Luhn **e** "tax" / "SARS" nos 48 caracteres anteriores   |

Uma vez que os formatos apenas com dígitos colidem com os números de encomenda, números de construção e carimbos de data e hora, os mais fracos (`za_vat`, `za_tax_ref`) necessitam da palavra-chave cue, e um número `0..` simples de dez dígitos não é tratado como um número de telefone sul-africano. IBANs espaçados (`GB29 NWBK ...`) não são correspondidos. No caminho de streaming, a sugestão é procurada apenas dentro do bloco atual. Os IDs estão à frente dos padrões genéricos de telefone, pelo que um identificador validado mantém o seu próprio espaço reservado (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Os modelos `gdpr` e `popia` selecionam os IDs EU e Sul-Africano, respetivamente. O mascaramento em si permanece opcional (regra rígida #20): nada aqui altera o padrão do sinalizador de recurso.

### Injeção de Prompts (`promptInjection.ts`)

Deteta estruturas adversariais no conteúdo fornecido pelo utilizador e aplica a
política configurada. O comportamento é controlado por variáveis de ambiente e
opções do construtor:

| Definição          | Variável de ambiente                                                                                 | Predefinição | Efeito                                                                                                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ativado            | `INPUT_SANITIZER_ENABLED`                                                                            | `true`       | Quando `false`, a guarda é contornada.                                                                                                                                                                     |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`       | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceite por retrocompatibilidade, mas **não** remove o texto de injeção; a reescrita de PII no pedido é controlada por `PII_REDACTION_ENABLED`.) |
| Limiar de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Severidade mínima exigida para bloquear. Com a predefinição, a severidade média é apenas observada.                                                                                                        |

**Precedência de modos** (`getMode`): `options.mode` do chamador →
**override de feature flag em BD** de `INJECTION_GUARD_MODE` (Dashboard →
Definições → Feature Flags) → env `INJECTION_GUARD_MODE` → env
`INPUT_SANITIZER_MODE` → `warn`. Assim, um override definido no dashboard
prevalece sobre as variáveis de ambiente, pelo que a IU de Feature Flags controla
a guarda em execução em tempo real (sem reinício). A leitura da BD é à prova de
falhas: se der erro, a guarda volta ao comportamento baseado nas variáveis de
ambiente e, quando não está definido nenhum override, o comportamento é idêntico
ao da resolução apenas por variáveis de ambiente.

Fontes de deteção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto partilhado de
   detetores usado noutros pontos do pipeline).
2. `DEFAULT_GUARD_PATTERNS` incorporados (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com severidade `high`).
3. `customPatterns` opcionais passados através das opções do construtor (strings,
   regex ou registos `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma deteção atinge o limiar de
gravidade, `preCall` devolve `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, o guardrail regista
mas permite a chamada. O helper partilhado `evaluatePromptInjection()` também
é exportado para chamadores que precisem de avaliar prompts sem passar pelo
registo.

**Limite de análise (v3.8.20):** o detetor inspeciona apenas os **primeiros
16 KB** do texto de prompt concatenado — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 bytes) em `src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()`
como `evaluatePromptInjection()` fazem `slice(0, MAX_INJECTION_SCAN_BYTES)`
antes de executar o ciclo de padrões. As diretivas de injeção situam-se perto
do início de um input, pelo que isto limita o CPU/GC das regex em payloads de
várias centenas de KB sem enfraquecer a deteção (cf. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Executa em **ambas** as fases, em último na cadeia predefinida (prioridade
`95`). Mascara padrões bem conhecidos de chaves de API / tokens secretos do
payload de saída (conteúdo das mensagens, argumentos de tool calls, resultados
de ferramentas) **e** da resposta do provider, para que uma credencial colada
num prompt (ou ecoada de volta por um resultado de ferramenta) não seja
divulgada ao provider upstream nem devolvida ao cliente.

- **Apenas por opt-in**, a mesma convenção da redação de PII (adjacente à
  Hard Rule #20): desativado a menos que `settings.credentialRedactionEnabled === true`
  **ou** `CREDENTIAL_REDACTION_ENABLED=true`. Com isto desligado, o guardrail
  é um no-op — nunca bloqueia e nunca reescreve.
- `redactCredentials()` percorre a árvore completa do payload/resposta
  (`walkValue()`, segura contra prototype pollution, segura contra ciclos via
  `WeakSet`) e substitui as correspondências por um placeholder
  `[REDACTED:<type>]`, clonando apenas os ramos que foram efetivamente
  alterados.
- `CREDENTIAL_PATTERNS` cobre chaves de providers de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square),
  chaves cloud (chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves
  privadas / JWTs, cadeias de ligação com credenciais
  (`mongodb://user:pass@...`, etc.) e um padrão genérico de valor de cabeçalho
  `Authorization`/`x-api-key`/`api-key`/`apikey`. As chaves em formato de
  cabeçalho (`authorization`, `x-api-key`, `api-key`, `apikey`) são mascaradas
  estruturalmente (apenas o valor, preservando o prefixo de esquema como
  `Bearer `/`Basic `) em vez de o serem pela regex genérica de texto.
- O guardrail nunca bloqueia; apenas reescreve (`modifiedPayload` /
  `modifiedResponse`) e anota (`meta.credentialsRedacted`, `meta.count`).

Proteção contra regressões: `tests/unit/credential-masker-guardrail.test.ts`.

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

- `register(guardrail)` — adiciona (ou substitui pelo nome normalizado) uma
  guardrail e volta a ordenar por `priority` ascendente.
- `clear()` / `list()` — auxiliares administrativos.
- `runPreCallHooks(payload, context)` — itera as guardrails ativas, passa o
  payload através de `modifiedPayload` e para no primeiro `block: true`.
- `runPostCallHooks(response, context)` — o mesmo fluxo do lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e,
  opcionalmente, volta a registar as predefinições para um isolamento limpo
  dos testes.

Ambos os executores devolvem `{ blocked, payload|response, results, guardrail?, message? }`,
em que `results` é um array de registos `GuardrailExecutionResult` que incluem
os campos `blocked`, `skipped`, `modified`, `error` e `meta` por guardrail,
úteis para rastreio.

### Desativar Guardrails por Pedido

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma lista sem
duplicados de nomes de guardrails que devem ser ignoradas para o pedido atual.
Existem cinco canais, lidos por esta ordem e fundidos numa única lista (a
primeira ocorrência prevalece na desduplicação):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` no corpo do pedido (nível superior)
3. `metadata.disabledGuardrails` no corpo do pedido (apenas quando `metadata` é um objeto)
4. Cabeçalho `x-omniroute-disabled-guardrails`
5. Cabeçalho legado `x-disabled-guardrails`

Os cinco canais são fundidos, incluindo os dois cabeçalhos: enviar tanto
`x-omniroute-disabled-guardrails` como `x-disabled-guardrails` ignora a união
das suas listas, e um cabeçalho moderno vazio já não esconde o legado
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), corrigido em
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Os valores podem ser arrays de strings ou uma string separada por vírgulas; os
nomes são aparados e normalizados para kebab-case em minúsculas (`pii_masker` →
`pii-masker`), e as entradas vazias são descartadas. O resultado é passado
através de `context.disabledGuardrails` ao registo, que ignora as guardrails
correspondentes (`skipped: true` em `results`).

A lista de desativação afeta apenas o **registo**. O modo `block` da proteção
contra injeção de prompts é uma fronteira obrigatória: o middleware
injection-guard (`src/middleware/promptInjectionGuard.ts`) chama
`evaluatePromptInjection()` sem qualquer lista de desativação controlada pelo
chamador (a chamada morta `resolveDisabledGuardrails({ body })` que costumava
fazer foi removida em
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), pelo que um
pedido que desative `prompt-injection` continua a ser rejeitado no modo
`block`. Isto é intencional. Os canais de desativação são controlados pelo
chamador (corpo do pedido, metadata, cabeçalhos), e um chamador não pode
desligar um controlo de segurança definido pelo operador
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). A união de
cabeçalhos de [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
altera apenas quais as guardrails do registo que são ignoradas; não permite que
um cliente contorne o middleware. As políticas obrigatórias de guardrails por
chave e por grupo são acompanhadas no RFC v4
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Consulte [Cobertura e limites](#coverage-and-limits).

## Ordem de execução

Para cada pedido que passa por `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts` (as rotas da família de chat listadas em
[Cobertura e limites](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` constrói a lista de exclusões a partir da
   chave de API, do corpo e dos cabeçalhos.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` executa os guardrails por
   ordem ascendente de prioridade:
   - Os guardrails desativados são registados como `skipped`.
   - O `preCall` de cada guardrail pode reescrever o payload através de
     `modifiedPayload`.
   - O primeiro `block: true` curto-circuita a cadeia e o handler devolve uma
     resposta de rejeição do guardrail.
3. O payload (potencialmente reescrito) flui para o roteamento de combos e o
   envio para o upstream.
4. **Apenas sem streaming:** depois de a resposta ser montada,
   `guardrailRegistry.runPostCallHooks(...)` executa a mesma cadeia sobre a
   resposta. Um `block: true` aqui descarta a resposta do upstream e devolve
   HTTP 400. As respostas em streaming ignoram este passo por completo.

Os guardrails que lançam erros são registados com `error: <message>` e
reportados no log através de `logger.warn`, mas a cadeia continua — fail-open
por conceção.

## Cobertura e limites

O registo de guardrails está ligado apenas ao pipeline de chat. Estes limites
são fixados por `tests/unit/guardrail-pipeline-wiring-characterization.test.ts`
e `tests/unit/guardrail-pipeline-characterization.test.ts`; atualize esses
testes deliberadamente quando o comportamento mudar.

### Onde os hooks são executados

| Hook / controlo                     | É executado em                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Pedidos tratados por `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (e `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` e o proxy de chat do Telegram. Também o endpoint de teste do dashboard `/api/guardrails/test`. Um bloqueio pré-chamada devolve HTTP 400. |
| `runPostCallHooks`                  | Apenas respostas de chat **sem streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). As respostas em streaming nunca o atingem.                                                                                                                                                                                                                                                                                               |
| PII em streaming                    | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), encadeado em `streamingPipeline.ts` quando `PII_RESPONSE_SANITIZATION` está ativo. Não é um guardrail, pelo que os canais de desativação não o afetam.                                                                                                                                                                                                                        |
| Middleware injection-guard (legado) | Todas as rotas `/v1` que transportam prompts, incluindo as da família de chat (ver [cobertura de rotas](#injection-guard-route-coverage--red-team-phase-8--block-d)). Apenas injeção de prompts.                                                                                                                                                                                                                                            |

### O que não está coberto

- **Rotas de multimédia, embeddings e dados** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nunca atingem o registo.
  Nenhum mascaramento de PII, mascaramento de credenciais ou ponte de
  modalidade é executado aí. A única verificação a que estão sujeitas é o
  middleware injection-guard legado.
- **Respostas em streaming** não recebem guardrails pós-chamada: nem
  `pii-masker` nem `credential-masker` pós-chamada, e nenhum bloqueio
  pós-chamada. Apenas se aplica a transformação de PII em streaming (quando
  `PII_RESPONSE_SANITIZATION` está ativo). Uma credencial ecoada numa resposta
  em streaming não é ocultada.
- **Canais de desativação vs. o middleware (por conceção):** o middleware
  avalia a injeção de prompts com a sua própria chamada a
  `evaluatePromptInjection()`, sem passar qualquer lista de desativação
  controlada pelo chamador. O modo `block` é uma fronteira obrigatória que as
  desativações controladas pelo chamador não podem contornar, incluindo nas
  rotas da família de chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Desativar
  o `prompt-injection` apenas salta o guardrail do registo.

### O que vê a resposta antes da fase pós-chamada

No caminho sem streaming, a ordem é: extração de memória → execução de
ferramentas integradas → guardrails pós-chamada → saída por bloqueio
pós-chamada → armazenamento na cache semântica.

- **A extração de memória** e **a execução de ferramentas** veem a resposta antes de as
  guardrails pós-chamada a poderem reescrever ou bloquear. Desde a
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), a extração de
  memória passa o texto extraído por `sanitizePII` quando
  `PII_RESPONSE_SANITIZATION` está ativado (tanto em streaming como em
  não-streaming), mas uma resposta que a pós-chamada bloqueie posteriormente já
  foi oferecida à memória e às ferramentas.
- **A cache semântica** armazena a resposta após a pós-chamada, pelo que armazena a
  resposta reescrita, e uma resposta bloqueada nunca é colocada em cache. As
  entradas da cache são indexadas por chave de API.

## Configuração

Variáveis de ambiente lidas pelas guardrails integradas:

| Variável                              | Utilizada por            | Efeito                                                                                                                    |
| ------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Defina como `false` para desativar totalmente a deteção.                                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Política de injeção: `warn`, `block` ou `log`. O valor legado `redact` não reescreve o texto de injeção.                  |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Modo da guarda de injeção; também uma feature flag na base de dados que **sobrepõe** as variáveis de ambiente (BD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Severidade mínima que `MODE=block` rejeita: `high` (predefinição), `medium` ou `low`.                                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Alias legado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Quando `true`, os PII do pedido são ocultados (independentemente do modo de injeção).                                     |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (a jusante) | Controla o comportamento do masker do lado da resposta.                                                                   |

As guardrails do Modality Bridge leem a configuração de runtime a partir do
armazenamento de definições suportado por base de dados (`getSettings()`), e não
de variáveis de ambiente. As chaves primárias do Vision são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceites apenas como o fallback de leitura de um ciclo
documentado; as escritas do dashboard utilizam as chaves primárias. As
predefinições e o resolvedor de fallback encontram-se em
`src/shared/constants/modalityBridgeDefaults.ts`, com as constantes legadas
mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O Audio utiliza `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, mais as definições
partilhadas `modalityBridgeCache*`. O Audio não tem fallback de chaves legadas
porque estas chaves foram introduzidas com o esquema do Modality Bridge.

O Video utiliza `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, mais as definições partilhadas
`modalityBridgeCache*`. Está desativado por predefinição porque o FFmpeg/ffprobe
são dependências operacionais opcionais e a legendagem de fotogramas acrescenta
latência e custo de modelo.

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

## Cobertura de rotas do injection-guard e red-team (Fase 8 · Bloco D)

O injection-guard (`createInjectionGuard` / `withInjectionGuard`) cobre todas
as rotas que aceitam prompts do utilizador. Respeita o `INJECTION_GUARD_MODE`
(predefinição `warn` = apenas registo em log; `block` = devolve HTTP 400
`SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo predefinido |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

A extração de texto (`extractMessageContents`) cobre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (noturno, `nightly-llm-security.yml`):** o promptfoo valida que
cada rota bloqueia o corpus OWASP-LLM em `INJECTION_GUARD_MODE=block`; o garak
executa probes (é ignorado sem secret). `moderations` está incluído por
consistência. O modo block é um limite obrigatório: `evaluatePromptInjection()`
ignora a lista de desativação por pedido que o middleware lhe passa, pelo que
`disabledGuardrails` **não** isenta uma rota do mesmo
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

O workflow noturno (`.github/workflows/nightly-llm-security.yml`, cron +
acionamento manual) tem dois jobs:

- **`promptfoo-guard` (bloqueante)** — executa `promptfoo eval -c
promptfooconfig.yaml` com `INJECTION_GUARD_MODE=block`. Cada caso
  adversarial (p. ex. "ignore all previous instructions…", jailbreaks do tipo
  DAN) verifica que a resposta contém `error.code === "SECURITY_001"`, ou
  seja, que o guard rejeitou efetivamente o pedido.
- **`garak` (consultivo)** — executa o garak `--probes
promptinject,dan,leakreplay` contra uma instância local do OmniRoute
  (`http://localhost:20128/v1`). Condicionado a um secret do fornecedor
  (`PROMPTFOO_PROVIDER_KEY`); é ignorado graciosamente e tem o sufixo
  `|| true`, pelo que reporta sem fazer falhar o CI.

A cobertura do helper de guard (`createInjectionGuard` / `withInjectionGuard`)
abrangese todas as rotas `/v1` que transportam prompts; o texto do prompt é
extraído de `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
por `extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
