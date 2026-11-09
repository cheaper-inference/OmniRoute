# Guardrails (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte de verdade:** `src/lib/guardrails/`
> **Última atualização:** 2026-10-17 — v3.8.52 (adicionado [Cobertura e limites](#coverage-and-limits):
> quais rotas e caminhos de resposta os hooks alcançam, os headers de desativação mesclados (#16412), o modo de
> bloqueio de injeção como fronteira obrigatória (#16413) e o que vê uma resposta antes do post-call)

Os guardrails aplicam segurança, políticas e transformações de conteúdo na fronteira
entre o OmniRoute e os provedores upstream. Cada guardrail pode inspecionar (e
opcionalmente rejeitar, transformar ou anotar) payloads de requisição (`preCall`) e
respostas upstream (`postCall`).

O sistema é **fail-open**: se um guardrail lançar uma exceção durante a execução, o registro
registra o erro e continua com o próximo guardrail em vez de falhar a
requisição. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente.
A única exceção é uma requisição abortada: quando o `signal` do chamador é abortado,
um guardrail que lança exceção rejeita a execução do hook em vez de ser ignorado.

Os hooks **não** são executados em todas as rotas ou em todas as respostas. Leia
[Cobertura e limites](#coverage-and-limits) antes de confiar em um guardrail como um
controle de segurança.

## Guardrails Integrados

O registro carrega automaticamente seis guardrails em ordem de prioridade na importação
(veja `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Estágio(s)     | Arquivo               |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Números de prioridade mais baixos são executados **primeiro**.

### Ponte de Visão (`visionBridge.ts`) — Modalidade Ponte PR-1

O modelo base GLM 5.3 e `glm-5.3-{low,high,max}` possuem metadados `supportsVision:false` registry/spec explícitos. As variantes GLM 5.3 Flash permanecem modelos de visão nativa. A rota `/v1/messages` do código Claude entra na cadeia de proteção pré-chamada `handleChat` compartilhada** antes** Tradução de Claude para OpenAI; imagens aninhadas de resultados da ferramenta `Read` devem ser descritas ou tratadas antes que a tradução as eleve ao conteúdo OpenAI `image_url` (#17069).

Intercepta solicitações de imagens destinadas a** modelos sem visão** e redireciona toda a solicitação para um modelo com capacidade de visão ou substitui as partes da imagem por descrições de texto produzidas por um modelo de visão configurável antes da chamada upstream. Isso permite que provedores somente de texto lidem com cargas multimodais de forma transparente.

Fluxo:

1. Ignore se o modelo de destino já suporta visão (a menos que apareça na lista de pontes forçadas `isVisionBridgeForcedModel`).
2. Extraia partes da imagem via `extractImageParts(messages)` (`visionBridgeHelpers.ts`), que delega ao** detector de mídia unificado** `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a única fonte de verdade compartilhada com o filtro de compatibilidade combinado. A extração é permitida nas formas `replaceImageParts` pode emendar de volta (o contrato de substituição de extração ↔): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` e Respostas API `input_image`. As imagens correspondentes aninhadas nas saídas da ferramenta Claude Code `tool_result.content` e Responses também são extraídas e substituídas em seus caminhos originais; formas somente indicadoras são materiais de filtro combinado e não são extraídas. Pule se nenhum for encontrado.
3. Resolva a configuração do tempo de execução via `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): novas chaves de configurações `modalityBridge*` vencem; as chaves `visionBridge*` herdadas permanecem um** fallback de um ciclo** (janela de reversão). Ignore antes de qualquer passagem de mídia quando a ponte estiver desativada.
4. O seletor de modo (`modalityBridgeVisionMode`, veja a tabela abaixo) decide redirecionar versus descrever. Reroute retorna `modifiedPayload` com apenas `model` trocado, mais meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limite as imagens em `maxImages`, componha o prompt com reconhecimento de tarefa, consulte o cache de descrição, chame o modelo de visão** em paralelo** (`Promise.allSettled`) e injete partes de texto `[Image N]: <description>` em seus lugares. Uma descrição com falha produz `null`: a imagem bruta é preservada para alvos unknown/vision-capable (#4012), mas um** segmentação direta somente texto confirmada** ou zero-vision combo obtém um stub de texto `(unavailable — no vision-capable provider connected)` explícito para cada imagem não descrita, incluindo falhas parciais e imagens além do limite de chamada de descrição (#17069). O substituto de descrição do combo com todas as falhas existente permanece em vigor (#8430).
6. Retorna `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Padrão | Comportamento                                                                                                                                                                                                                                                                                                      |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔      | Heurística herdada, intocada (#6640/#7204): modelos não-combo/`auto/` redirecionam para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (depois descreva); os alvos do combo sempre descrevem.                                                                            |
| `describe` |        | Sempre descreva — o bloco de redirecionamento será totalmente ignorado; o modelo escolhido pelo usuário sempre responde.                                                                                                                                                                                           |
| `reroute`  |        | Forçar novo roteamento: a proteção do modelo keep-credentialed é ignorada. O redirecionamento-** alvo** O protetor de credenciais ainda aplica — quando não existe nenhum alvo de visão utilizável, a ponte bloqueia com um erro claro em vez de descrever ou enviar imagens brutas para um alvo somente de texto. |

Modos forçados em curto-circuito** antes** a heurística automática é executada; O comportamento `auto` é idêntico em bytes ao guardrail pre-PR-1.

#### Escopo da chave de API (`visionBridgeKeyScope.ts`)

Quando a chave API do chamador restringe `allowedConnections`, conjuntos de cotas (`allowedQuotas`) ou modelos (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), a ponte apenas escolhe o redirecionamento e descreve os modelos que a chave pode usar, nas conexões que a chave pode usar. A chamada de descrição sempre passa pelo auto-loop OmniRoute com o cabeçalho `x-omniroute-self-loop-key-id`, de modo que a solicitação de bate-papo recebida impõe novamente a conexão dessa chave e a política de modelo. `enforceApiKeyPolicy()` honra esse cabeçalho apenas junto com o portador do auto-loop, portanto, ele só pode restringir o acesso e um ID que não resolve é rejeitado.

Se nenhum modelo de visão for permitido para a chave, um** destino somente de texto confirmado** rejeita a solicitação de imagem localmente com um HTTP 400 limpo em vez de encaminhar bytes de imagem para um upstream incapaz (#17069). Para alvos com capacidade de visão nativa ou desconhecida, o caminho de descrição mantém seu comportamento anterior de falha aberta (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Solicitações sem chave e chaves sem essas restrições se comportam exatamente como antes.

#### Prompt de descrição com reconhecimento de tarefa (`modalityBridgeVisionTaskAware`)

Padrão** verdadeiro** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) anexa o texto do** última mensagem do usuário** (truncado para 500 caracteres) para o prompt de descrição base, direcionando a descrição para o que o usuário realmente pediu (padrão codex-vision-proxy) e pedindo ao modelo de visão para transcrever o texto visível. Com o sinalizador — desativado ou nenhum texto do usuário — o prompt base é usado inalterado.

A solicitação compatível com OpenAI do próprio autoloop de descrição (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) sempre solicita `image_url.detail: "high"` — incondicionalmente, para cada caller/provider, não bloqueado em nenhum sinal do cliente. A amostragem com poucos detalhes degrada a precisão OCR exatamente para a tarefa de transcrição de texto que esse prompt solicita, portanto, a chamada de descrição em si sempre solicita muitos detalhes, independentemente do nível de detalhe usado pela solicitação de entrada original. Isso afeta apenas o corpo da solicitação de descrição interna; isso não muda como OmniRoute encaminha o próprio `image_url.detail` do chamador na solicitação primária — esse padrão é aplicado separadamente e apenas para clientes OpenCode detectados, em `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). A ramificação em formato de fio Anthropic do autoloop de descrição não possui campo `detail` e não é afetada por nenhum dos padrões.

#### Descrever o limite de saída (`modalityBridgeVisionMaxChars`)

| Chave                          | Padrão | Faixa            |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100–50000 |

`0` (padrão) significa** sem limite** — a descrição retornada por `callVisionModel()` é passada sem modificação, preservando o comportamento existente. Qualquer valor no intervalo de 100 a 50.000 trunca a descrição com um sufixo `…` antes de ser emendada novamente como `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`). Aumente isso para tarefas OCR com muitos detalhes, onde o modelo downstream precisa da transcrição completa; reduza-o para o uso de tokens vinculados em modelos de visão tagarelas. O campo do painel fica no painel Avançado da guia Visão (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) e fixa qualquer valor entre 1 e 99 até o 100º andar, deixando um `0` explícito intocado — `0` é um valor Zod válido por si só (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), não apenas o padrão "não definido".

#### Descrever o cache (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL na memória para saídas descritas, compartilhadas em todo o processo. Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` com enquadramento de prefixo de comprimento (sem colisões de limite de campo). O componente do modelo é o** configurado** modelo de ponte, e não o modelo que realmente respondeu — `callVisionModel` pode recorrer internamente e a codificação por tentativa fragmentaria o cache. As descrições com falha nunca são armazenadas em cache. Configurações:

| Chave                           | Padrão | Faixa   |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalização remota de imagem (self-loop describe/base64 fetch)

Quando a ponte busca um** remoto** a própria imagem — o Anthropic descreve a autochamada e a conversão base64 do formato claude-wire (`ensureBase64ImagesForClaudeWire`), ambos via `fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — os dados resultantes URI são passados por `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) antes de serem incorporados na solicitação do modelo de visão. Imagens superdimensionadas são reduzidas para um** Borda longa de 2048px** (correspondendo ao limite de redimensionamento OpenAI/Anthropic já aplicado no lado do servidor), que corta o upload bytes/latency sem alterar o que o modelo de visão vê. O redimensionamento usa `sharp`, carregado por meio de importação dinâmica: em uma plataforma onde seu binário nativo falha ao carregar, `normalizeDataUri()`** nunca joga** — ele retorna para uma passagem dos bytes originais, então o caminho describe/base64-conversion sempre continua funcionando. Bytes que não são de imagem (uma busca que não retornou uma imagem decodificável) também passam intactos. Essa normalização tem como escopo imagens que a ponte busca para sua própria autochamada — e nunca é aplicada à carga útil de passagem bruta do chamador, consistente com o princípio de mutação somente opt-in (Hard Rule #20).

#### Migração do esquema + de configurações

As novas chaves `modalityBridge*` são validadas por Zod em `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, o `modalityBridgeCache*` trio e o grupo `modalityBridgeAudio*` usado pelo Audio Bridge. A migração `141_modality_bridge_settings.sql` copia os valores `visionBridge*` herdados existentes para as novas chaves correspondentes (idempotente, nunca substitui um valor `modalityBridge*` definido pelo operador); as chaves herdadas permanecem aceitas como substituto de leitura para um ciclo de lançamento.

#### Estatísticas + do cabeçalho de transparência

As respostas transformadas por descrição carregam `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construída por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`, carimbada por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`). Solicitações redirecionadas são obtidas** não** cabeçalho — a carga útil não foi alterada e a troca do modelo já está visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gerenciamento, mesmo nível de `GET /api/settings`) retorna os contadores por modalidade na memória `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e `video`. `averageLatencyMs` usa `latencySamples`, nem todas as tentativas, como denominador; uma operação sem temporização não fabrica uma amostra de zero milissegundos. `bridged` continua sendo o alias compatível com versões anteriores para conversões bem-sucedidas; tentativas fracassadas não o incrementam. Os contadores são redefinidos na reinicialização do processo por design (telemetria, não contabilidade).

#### Configuração do painel

A página dedicada do painel é `/dashboard/settings/modality-bridge`. Suas guias `Vision`, `Audio` e `Video` endereçáveis por URL preservam os parâmetros de consulta enquanto alternam o valor `tab`. A guia Visão expõe ativação, modo, seleção de modelo (incluindo o padrão automático), solicitação de reconhecimento de tarefa, limites timeout/image/description-length/cache avançados, contadores de tempo de execução e uma solicitação de amostra protegida. A guia Áudio também está ativa: ela expõe a ativação, um seletor de modelo somente STT com Automático, limites timeout/max-clip, contadores de áudio e um teste de amostra `input_audio`. A guia Vídeo é funcional: ela relata o estado de tempo de execução FFmpeg/ffprobe — um dos quatro estados UI explícitos (`unknown` enquanto o teste está em andamento ou não pôde ser concluído, `restricted` em um host de painel sem loopback onde o teste é ignorado no lado do cliente, `unavailable` uma vez testado e confirmado como ausente ou `available` com as versões FFmpeg/ffprobe ) — persiste nos limites enable/model/frame/video/timeout, filtra o seletor de modelo para modelos com capacidade de visão e expõe contadores de vídeo.

A antiga placa Vision Bridge nas configurações AI é um link de compatibilidade para a nova página; não possui mais uma segunda via do formulário. Os provedores de mídia também vinculam fluxos de trabalho de imagem para texto e fala para texto às guias correspondentes do Modality Bridge sem remover o playground existente de fala para texto.

**Bypass de admissão de auto-loop:** quando a chamada de descrição roteia através do próprio auto-loop `/v1` de OmniRoute(modelo de provedor não padrão), a subsolicitação envia `x-omniroute-admission-bypass: internal` e é autenticada com a credencial de auto-loop resolvida — o `sk_omniroute` sentinela local no modo local ou a chave `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env configurada pelo operador (#1350) para que as implantações `REQUIRE_API_KEY=true` ainda possam executar a chamada de descrição. O desvio só é respeitado para essas credenciais exatas, portanto, os clientes externos não podem usar o cabeçalho para ignorar a admissão.

Os padrões legados residem em `src/shared/constants/visionBridgeDefaults.ts`; os novos padrões mode/task-aware/cache e o resolvedor de configurações residem em `src/shared/constants/modalityBridgeDefaults.ts`. O guardrail expõe uma opção de construtor `deps` para que os testes possam injetar implementações falsas `getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta requisições de chat que carregam áudio antes que cheguem a um destino que não
é conhecido por aceitar entrada de áudio. Ele nunca redireciona a requisição de chat: as partes de áudio são
transcritas pelo endpoint multipart compatível com OpenAI existente, e o
modelo de chat escolhido prossegue com as transcrições em texto.

Fluxo:

1. Resolve `supportsAudio` por meio de `getResolvedModelCapabilities()`. Metadados
   explícitos do registro de provedores têm precedência, depois metadados estáticos
   do modelo, depois `modalities_input` sincronizado. Uma lista de entradas
   declarada sem `audio` é `false`; ausência de evidência de capacidade permanece
   `null`. Tanto `false` quanto `null` ativam a ponte conservadora, enquanto
   `true` a ignora.
2. Resolve as configurações `modalityBridgeAudio*` e extrai as partes de áudio de
   nível superior passíveis de splice de cada mensagem por meio do detector
   compartilhado `detectMediaParts()`. Os formatos de transmissão suportados são
   OpenAI `input_audio`, `audio_url` e `source.media_type: "audio/*"`. Áudio
   aninhado é detectado para roteamento, mas não é removido pelo caminho de
   splice. O trabalho é limitado por `modalityBridgeAudioMaxClips`; partes
   posteriores permanecem intactas.
3. Respeita um `provider/model` configurado, ou deixa `selectAudioBridgeModel()`
   percorrer `AUDIO_TRANSCRIPTION_PROVIDERS` na ordem estável do catálogo e
   selecionar o primeiro modelo com uma credencial de provedor ativa utilizável.
4. `callAudioTranscription()` converte áudio base64/data-URI em um `file`
   multipart, ou baixa um `audio_url` remoto por meio do guarda de saída
   somente-público com DNS pinning e um limite de 25 MB. Em seguida, envia via
   POST o arquivo e o modelo selecionado para o self-loop local
   `/v1/audio/transcriptions`, autenticado com `resolveSelfLoopBearer()`. A rota
   de transcrição existente executa a busca normal de credenciais, o tratamento
   de cooldown/limite de taxa e o despacho ao provedor.
5. Chamadas bem-sucedidas substituem suas partes por `[Audio N]: <transcript>`.
   As chamadas são executadas com `Promise.allSettled`: uma falha individual
   preserva a parte de áudio original (contrato #4012). Se todas as chamadas
   falharem e o destino estiver comprovado como `supportsAudio === false`, as
   partes se tornam `[Audio N]: (unavailable — no STT provider connected)`
   (contrato #8430). Para um destino desconhecido (`null`), um resultado de
   falha total permanece intacto. Um destino comprovadamente somente-texto sem
   credencial STT utilizável recebe o mesmo stub explícito sem emitir uma
   chamada de rede.

Transcrições bem-sucedidas usam o cache LRU/TTL do Modality Bridge, válido para
todo o processo. A chave combina a referência do áudio, o rótulo estável de
operação `audio-transcription` e o modelo STT selecionado; falhas nunca são
armazenadas em cache. Tentativas de áudio atualizam os contadores compartilhados
`bridged`, `cacheHits`, `failures` e `lastUsedAt`. Respostas transformadas
carregam `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
requisições não alteradas não recebem um segmento de Audio Bridge.

As configurações de tempo de execução são respaldadas por banco de dados e
validadas com Zod:

| Chave                         | Padrão  | Intervalo            |
| ----------------------------- | ------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                    |
| `modalityBridgeAudioModel`    | `""`    | Automático ou ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                 |

O cache compartilhado permanece controlado por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em Conclusões de bate-papo `messages` e Respostas API `input` antes que um destino sem suporte de vídeo nativo conhecido seja chamado. As formas suportadas são `input_video`, `video_url`, `video_source`, HTTPS URLs e `data:video/*;base64,...` data URIs. Nomes de arquivos simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) possui a travessia da solicitação, a verificação capability/policy, a agregação por solicitação e a carga útil da resposta. Aquisição — de trabalho por vídeo, o cache de resultado completo, descrevendo uma sequência de quadros (que funde qualquer transcrição de áudio declarada pelo chamador) e metrics/abort/cleanup — por tentativa está oculto atrás de `processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez por parte do vídeo dentro do loop de `preCall`. Esse módulo também define os limites de porta explícitos `VideoMediaBrokerPort` (adquirir bytes e extrair quadros amostrados), `VideoAudioTranscriptionPort` (fundir uma transcrição de áudio declarada pelo chamador com as legendas amostradas) e `VideoDrilldownPort` (a forma herdada de armazenamento bruto). A produção STT e a retenção de quadros são compostas em torno da porta de descrição por meio `createVideoSttAdapter` e `createVideoDrilldownAdapter`; o último usa o ciclo de vida compartilhado do identificador opaco.

O caminho de solicitação `/v1` público nunca importa ou invoca um subprocesso. Os vídeos remotos são baixados com limite de 50 MiB ; vídeos base64 inline têm um limite conservador decodificado de 36 MiB por vídeo, de modo que o envelope model/messages/framing pode permanecer dentro do limite de admissão de solicitação JSON pública de 50 MiB. As estimativas de comprimento embutido e tamanho decodificado são verificadas antes da alocação. HTTPS é necessário no URL remoto inicial e em cada redirecionamento, usando a proteção de saída somente pública existente com fixação DNS. Os bytes então cruzam o limite interno exato do corretor `POST /api/modality-bridge/video/extract`. Essa rota é `LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas uma solicitação de loopback confiável autenticada por processo e nunca aceita um URL, caminho do sistema de arquivos, executável ou lista de argumentos. O pipeline API body-size e o leitor de corpo incremental do manipulador impõem independentemente um limite de entrada do corretor MiB. Sua fila limitada executa uma extração por vez, permite quatro trabalhos pendentes e limita a entrada pendente em 100 MiB.

Dentro do corretor, `ffprobe` lê um arquivo local privado; a lista de permissões de formato fixo exclui formatos de lista de reprodução e manifesto. Para contêineres da família MOV permitidos, as referências de dados MOV externas permanecem desabilitadas por padrão e o comando fixo não as aceita. Tanto `ffprobe` quanto `ffmpeg` usam a lista de permissões do protocolo `file` -only, um thread, matrizes de argumentos fixos, sem shell e executáveis resolvidos a partir de `PATH`. Os streams de capa de imagens anexadas não são candidatos jogáveis. Todos os fluxos reproduzíveis devem satisfazer os limites, e um fluxo padrão explícito é preferido antes do substituto determinístico de índice mais baixo. Os vídeos são limitados a 600 segundos, 8.192 pixels por dimensão e 33.554.432 pixels de origem. FFmpeg amostra de 1 a 16 quadros JPEG de ponto médio, reduz a borda longa para no máximo 1.024 pixels sem aumentar a escala de entradas menores e nunca recebe um URL. A amostragem é `uniform` por padrão. As políticas opcionais `scene_aware` e experimental `segment_aware` executam uma passagem FFmpeg fixa adicional sobre o fluxo local já validado, selecionam carimbos de data/hora de cena `showinfo` limitados e retornam deterministicamente aos mesmos pontos médios uniformes em caso de falha do detector, tempo limite, saída malformada ou um conjunto de candidatos vazio. O modo com reconhecimento de segmento aloca amostras de ponto médio proporcionalmente aos intervalos de cena validados; evidências de reconhecimento de segmento e comportamento de fallback são detalhados abaixo. O limite rígido de 16 quadros é aplicado após a seleção em todas as políticas. Quando uma solicitação com reconhecimento de cena tem apenas um orçamento de um quadro, ela usa o ponto médio uniforme do vídeo completo ativo ou da janela de foco e relata `policyEffective: uniform`: um único quadro de cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode opcionalmente fornecer uma janela de foco finita (`start`/`end` segundos); os limites são limitados à duração da mídia, as janelas invertidas ou não finitas são rejeitadas e todas as políticas de amostragem são executadas apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não confiável para que os modelos downstream possam distinguir um trecho em foco da linha do tempo completa.

O foco da legenda semântica é uma configuração separada e explícita. O modo de análise `full` padrão preserva o prompt do quadro existente e nunca encaminha o texto da solicitação para o modelo de legenda. No modo `focused`, a ponte lê apenas o último `text`/`input_text` não vazio de autoria do usuário do mesmo contêiner Chat ou Responses, normaliza-o para NFC, recolhe caracteres de controle e espaços em branco e limita-o a 500 pontos de código Unicode. Um resultado vazio retorna ao prompt exato `full`. Uma dica utilizável é serializada como JSON em um bloco dedicado de contexto de usuário não confiável e pode priorizar apenas detalhes observáveis; ele não pode substituir o aviso separado das instruções visíveis ou audíveis na mídia. O foco textual nunca infere `start`/`end` ou altera o amostrador temporal.

#### evidência do segmento estrutural FU-07

`segment_aware` usa uma passagem de pré-análise limitada sobre o fluxo de vídeo local já validado. A cadeia de filtro fixa primeiro é dimensionada para no máximo 320 pixels de largura, detecta mudanças de cena e intervalos congelados e, em seguida, faz amostras de 1 quadro por segundo para desfoque, luma média e informações spatial/temporal. A passagem é limitada a 600 amostras estruturais, um thread FFmpeg/filter, o mesmo protocolo `file` -only e listas de permissões de contêiner, um limite de saída de processo de 1 MiB e no máximo 30 segundos dentro do abort/deadline. compartilhado do corretor. Ele nunca aceita um comando, filtro, caminho ou URL da solicitação.

Os valores estruturais são evidências de amostragem determinística, e não compreensão semântica do vídeo. Eles não inferem assuntos, ações, legendas, fala ou intenção do usuário. Os limites da cena e do congelamento formam segmentos; cobertura congelada, desfoque, exposição, detalhes espaciais e mudança temporal influenciam apenas como o orçamento existente de 1 a 16 quadros é alocado. Um segmento totalmente congelado é limitado a um quadro, enquanto os segmentos não congelados competem pelo orçamento restante. Quando os limites superam o número de quadros, a cobertura uniforme da linha do tempo é mantida, de modo que os cortes iniciais rápidos não conseguem ocultar um longo segmento final. Os limites da cena dentro da resolução de análise de 1 segundo de um limite congelado são unidos.

Filtros ausentes, evidências malformed/empty, um erro do detector ou o tempo limite de pré-análise limitado falham na abertura da política de ponto médio uniforme exata. Uma interrupção do chamador ou prazo do intermediário não falha na abertura: ele encerra o subprocesso em andamento, evita a extração posterior de quadros e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera acessórios FFmpeg reais determinísticos para economias de chamadas de legenda pós-desduplicação, alocação de orçamento de movimento denso, evidência blur/exposure/SI-TI, cortes rápidos com cauda longa e falsos positivos com desvanecimento gradual. Ele registra o tempo de parede da pré-análise e, onde `/usr/bin/time` está disponível, filho CPU e pico RSS. Suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legenda permanece `HOLD` porque este chicote não tem endpoint autorizado ou juiz congelado. A poupança monetária também permanece `HOLD` a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita por chamada; o script nunca fabrica nenhum dos resultados.

Cada quadro é limitado a 4 MiB, todos os quadros brutos juntos a 23 MiB e a resposta do corretor serializado a 32 MiB. Um diretório temporário privado é removido em `finally`. OmniRoute não empacota FFmpeg e não aceita um caminho executável personalizado. Antes da legenda, a ponte aplica uma passagem de desduplicação visual conservadora: cada JPEG é reduzido a um buffer de 16 × 16 tons de cinza e é comparado apenas com o último quadro retido. Para um orçamento de legenda solicitado acima de um quadro, a extração fornece um conjunto limitado de candidatos de até o dobro desse orçamento e nunca mais do que 16 quadros. O limite solicitado é aplicado somente após a desduplicação, com o primeiro e o último candidato selecionado preservados durante o desbaste final quando o orçamento for de pelo menos dois. A política `grayscale-16x16-mean-cells-v2` versionada usa o maior delta médio de luma e a proporção de células em miniatura cujo delta normalizado é de pelo menos 0,05. O limite duplicado é a constante 0,04, escolhida pela previsibilidade em vez de exposta como uma configuração de tempo de execução. Este sinal secundário de alto contraste preserva pequenos movimentos e alterações de texto visível que uma comparação apenas média pode ocultar. Os erros do comparador ou do decodificador falham na abertura e mantêm a cobertura. Os metadados de saída separam candidatos extraídos, quadros usados com sucesso e duplicatas visuais eliminadas.

Uma parte de vídeo marcada explicitamente pode solicitar uma folha de contato com registro de data e hora. A ponte constrói no máximo uma grade JPEG de 4 colunas e 16 quadros. Cada célula de 512 pixels grava seu carimbo de data/hora de origem em uma banda inferior de alto contraste, enquanto os mesmos carimbos de data/hora permanecem em metadados textuais para associação e auditoria downstream. O JPEG completo permanece limitado a 32 MiB. Se `sharp` não puder decodificar ou compor a grade, a ponte retornará aos quadros JPEG individuais; uma interrupção do cliente ainda se propaga pela operação de planilha.

A evidência de promoção é deliberadamente separada do microbenchmark da composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um chicote A/B com versão de esquema para modelos de visão reais compatíveis com OpenAI. Ele mede tokens relatados pelo provedor, latência de ponta a ponta (incluindo composição de planilha), contagem de chamadas de modelo e retenção de fatos definidos pelo manifesto. As respostas brutas do modelo não são gravadas no relatório; apenas resumos SHA-256 e fatos correspondentes IDs são retidos. O chicote não faz nenhuma chamada de rede ou de modelo pago, a menos que `--execute-real` seja passado e `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, seu veredicto legível por máquina permanece `HOLD`; medições sintéticas payload/call-count por si só não são evidências de promoção.

Os chamadores podem anexar uma matriz `transcript.cues` opcional a uma parte de vídeo suportada quando já possuem texto alinhado. Cada sugestão deve conter `text`, um intervalo `start`/`end` finito dentro da duração testada e um `source` na lista de permissões (`client`, `embedded` ou `audio-bridge`); `confidence` é padronizado como `1` e deve permanecer entre `0` e `1`. As sugestões duplicadas exatas são recolhidas. OmniRoute nunca inicia a transcrição desses metadados: dicas validadas são copiadas no resultado descrito com fonte, confiança e intervalo, e são renderizadas como observações não confiáveis junto com as legendas do quadro. Texto inválido, fora do intervalo ou sem origem é rejeitado em vez de misturado ao fluxo de legenda. Ambos os canais de transcrição do corpo da solicitação normalizam a proveniência fornecida para `client`, incluindo rótulos `embedded` ou `audio-bridge` autoafirmados. Somente um adaptador de propriedade do servidor pode atribuir esses rótulos confiáveis por meio do argumento `trustedSource` somente de código; um campo de solicitação JSON não pode alcançar esse argumento. O texto transcrito continua sendo conteúdo derivado de mídia não confiável, independentemente de sua procedência, e nunca deve determinar autorização.

Um chamador avançado pode fornecer uma faixa `audioTranscript` para o mesmo vídeo; ele é tratado como texto fornecido pelo cliente e não como prova de transcrição do servidor. A costura de fusão executa observações visuais e sonoras sob um prazo e sinal de aborto, ordena-as em uma linha do tempo comum, colapsa duplicatas exatas e relata um resultado parcial quando apenas um lado é bem-sucedido. Um `audioTranscript` inválido degrada esse resultado parcial — a descrição visual é mantida e a ramificação de áudio registra um código de falha limpo — em vez de falhar em todo o vídeo. A disponibilidade por filial, o sinalizador parcial e os códigos de falha higienizados são preservados no resultado descrito, nos metadados do guardrail (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), nos metadados do cache de resultados e nos contadores de fusão da ponte. O caminho padrão do Video Bridge não invoca fala para texto nem baixa uma segunda cópia de mídia; sem essa faixa explícita, permanece apenas em vídeo.

**Retenção de transcrição (#12150 P1).** Isso se aplica automaticamente sempre que o Video Bridge (ele próprio opcional) renderiza uma sugestão de transcrição — não há sinalizador de retenção separado. Quando uma solicitação renderiza qualquer sugestão de transcrição (um `transcript` declarado pelo chamador ou um `audioTranscript` fundido), o guardrail marca-o `videoBridgeObserved` e produz uma sombra redigida da descrição do vídeo — uma renderização idêntica na qual o corpo de texto livre de cada sugestão é substituído por `[redacted-video-transcript]`, construído substituindo o campo de sinalização estruturado antes da string ser montada (nunca analisando o texto achatado, portanto, nenhum conteúdo de sugestão — adversário ou comum, incluindo corpos contendo `]` como `[inaudible]`/`[music]` — pode sobreviver). O corpo da solicitação de registro de chamadas persistente troca cada parte de texto derivada de vídeo por aquela sombra redigida, correspondida pela igualdade de conteúdo; a âncora `fullText` é relida a partir da carga útil do guardrail pré-chamada finalizada, de modo que a correspondência ainda é bem-sucedida após os guardrails da cadeia posteriores (os PII e mascaradores de credenciais, prioridades 10/95) reescrever o texto de descrição no lugar e após a injeção system-prompt/handoff/memory remodelar a matriz de mensagens. O corpo enviado upstream para o modelo permanece inalterado. Uma solicitação observada também não preenche nenhuma memória durável (tanto a extração derivada da solicitação quanto a da resposta são ignoradas), portanto, a própria resposta do modelo não pode ecoar o texto transcrito na memória.

**Campos de vídeo bruto (#12430).** Quando a ponte está habilitada e o suporte de vídeo nativo é desconhecido ou ausente, os campos `transcript`/`audioTranscript` definidos também ativam `videoBridgeObserved`, mesmo após falha na descrição ou limite `maxVideos`. contagem de `null` e strings vazias; campos ausentes e metadados que não sejam de vídeo, não. As cópias retidas editam esses campos ou omitem a solicitação e caches/Memory são ignorados.

Nesses caminhos de fallback, dicas de chamador válidas tornam-se partes `text`/`input_text` suportadas em vez de campos de provedor não padrão. Ambas as faixas fornecidas pela solicitação permanecem observações `client` não confiáveis, com um aviso explícito de que o vídeo não foi descrito e os carimbos de data e hora não foram verificados na mídia. Os orçamentos totais e por sugestão existentes 256-cue/64-KiB se aplicam às duas faixas juntas; os carimbos de data e hora devem caber no teto de 600 segundos do corretor e em qualquer janela de foco fornecida. Faixas inválidas são descartadas e não encaminhadas como texto arbitrário; um irmão válido ainda pode ser usado, a menos que seu orçamento combinado seja excedido. Os campos Null/empty não adicionam texto. Nenhuma busca ou transcrição de mídia é adicionada por esse substituto. Os campos de extensão de transcrição são removidos da portadora de vídeo substituta e de seus objetos `video_url`/`source`. A lista de permissões de fios OpenAI permanece rigorosa; suportes de vídeo nativos desconhecidos permanecem disponíveis e alvos somente de texto conhecidos mantêm marcadores seguros. As sombras de redação estruturadas protegem o texto transcrito anexado, enquanto a solicitação original de propriedade do chamador permanece inalterada. Os destinos com suporte nativo e as pontes desabilitadas mantêm seu comportamento de desvio existente.

Cópias retidas adicionais usam o mesmo sinal de solicitação observada. O instantâneo bruto da solicitação do cliente pré-guardrail, a solicitação pendente na memória e o log de solicitação rejeitada antecipada substituem estruturalmente os campos de transcrição nas partes do vídeo; prompts de string sintetizados por estágios de pipeline e transferência de contexto são editados no coletor do corpo da solicitação persistente. O marcador `video_content_removed` persistente faz com que a continuação `previous_response_id` falhe no fechamento, em vez de reconstruir o texto que foi descartado intencionalmente. Se uma solicitação observada perder sua sombra de redação por parte antes do registro, ou mesmo uma das várias sombras de vídeo não corresponder após mutações de solicitação posteriores, o corpo da solicitação retido será totalmente omitido em vez de reter uma transcrição parcialmente editada.

Para uma solicitação observada, uma resposta do modelo pode citar qualquer parte da transcrição sem um limite de sugestão estruturado. Seu registro de chamadas persistente `responseBody` é, portanto, substituído por um marcador de omissão; o artefato detalhado do pipeline (que pode incluir corpos upstream/client e partes de fluxo) não é retido. Os caches semânticos, de idempotência e de repetição de raciocínio ignoram leituras e gravações para essa solicitação. A solicitação do provedor e a resposta visível ao cliente permanecem inalteradas. Os primeiros bytes de manutenção de atividade são drenados do buffer temporário quando o artefato detalhado é omitido. O aviso EventStream malformado de Kiro relata apenas a contagem de bytes de carga útil, nunca seu conteúdo ou o erro bruto do analisador JSON. Isto não afirma que todos os diagnósticos provider/plugin não relacionados foram auditados; a varredura mais ampla do coletor retido é rastreada em #11658.

O ciclo de vida interno `/api/modality-bridge/video/drilldown` é um substrato de cache loopback/token-authenticated separado. Cada operação também requer um principal canônico opaco ID. Antes de um chamador de produção ser habilitado, ele deverá derivar esse ID do locatário autenticado e nunca deverá encaminhar um valor selecionado pelo cliente. As chaves de cache vinculam esse principal à sessão canônica e à referência de vídeo IDs, armazenam apenas suas chaves SHA-256-derived e definem o escopo de leituras e exclusões para o mesmo principal. O cache armazena no máximo 16 quadros JPEG derivados por entrada, expira-os após dez minutos e suporta leituras `start`/`end` limitadas ou exclusão explícita de sessão.

Cada principal é limitado a 16 entradas e 64 MiB de dados canônicos JPEG. Esses limites são independentes do teto global 64-entry/256 MiB : a pressão da cota do principal despeja apenas as entradas menos utilizadas do principal antes que o despejo global LRU seja considerado. As entradas expiradas são varridas da contabilidade principal e global na atividade de cache, enquanto o cancelamento e a falha de validação não comprometem uma substituição parcial.

O cache rejeita Base64 não canônico, preenchimento excessivo, mídia não JPEG, JPEGs malformado ou truncado e JPEGs que produzem um aviso durante uma decodificação `sharp` imagem completa limitada. Ele recodifica cada imagem aceita como um JPEG canônico, deriva largura e altura dos bytes decodificados em vez de confiar nos campos do chamador e descarta quaisquer bytes poliglotas finais em vez de mantê-los. Somente o buffer compactado canônico limitado é cobrado de ambas as cotas. O limite de fio JSON inclui sobrecarga Base64 para o teto de entrada decodificada de 32 MiB. Cada derivação armazenada registra seu JPEG format/resolution validado, política de amostragem, versão de derivação, horário de criação, hash de conteúdo computado pelo servidor e referência pai com hash, além do hash de conteúdo pai do chamador confiável. O cancelamento é verificado entre as fases decode/hash assíncronas antes da confirmação do cache atômico.

O produtor de produção reutiliza quadros de corretagem já derivados somente após análise visual bem-sucedida, sem segundo vídeo download/extraction. Requer o operador `modalityBridgeVideoDrilldownEnabled=true`, estrito por parte `drilldown: true` e um registro de chave de API autenticado ID. Os valores principal/session declarados pelo cliente nunca estabelecem propriedade. Sem todas as três condições, ele não faz hash, redimensiona ou retém quadros adicionais. A falha de retenção preserva a resposta visual utilizável. As solicitações consentidas ignoram o cache de resultados de todo o vídeo para que os resultados armazenados em cache nunca reproduzam os identificadores.

As respostas JSON e SSE bem-sucedidas expõem no máximo quatro identificadores opacos no cabeçalho `x-omniroute-video-drilldown` limitado. As origens autorizadas do navegador podem ler esse cabeçalho sem ampliar a política de origem CORS. Novos identificadores usam `v1.<32-byte random base64url token>` e o registro retém apenas seus hashes SHA-256. O analisador reader/header também aceita tokens herdados de 64 hexadecimais. O consumidor público autenticado é `GET /api/v1/video-bridge/drilldown?handle=...`, controlado de forma independente por `modalityBridgeVideoDrilldownRemoteEnabled=true`. Falso persistente explícito revoga o acesso mesmo quando o fallback `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env herdado está habilitado. A retenção de produção tem o substituto legado `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` análogo. Ambos os substitutos são desativados por padrão.

O consumidor obtém a propriedade da chave autenticada e aplica a política de chave: GET e DELETE pertencem à categoria de endpoint `video`, incluindo os aliases `/v1` e `/api/v1`. As chaves com uma lista de permissões de endpoint não vazia devem incluir `video`; chaves irrestritas permanecem compatíveis. O consumidor retorna o mesmo 404 para identificadores desconhecidos, expirados e de outra chave. Ele aceita `variant=preview|standard|detail` (dimensão JPEG máxima 320/640/1280, nunca ampliado), `limit=1..8` (ou o alias herdado `frames`, nunca ambos), `page` baseado em zero e segundos de foco `start`/`end` opcionais. Chaves de consulta duplicadas e janelas de foco invertido são rejeitadas. Cada variante retornada possui um hash de seu conteúdo real e metadados de resolução reais, vinculados à fonte retida. As variantes são derivadas da leitura, em vez de armazenadas como cópias retidas extras. A resposta JSON, incluindo Base64/envelope, é limitada a 32 MiB; uma página superdimensionada retorna 413 e o cliente deve solicitar menos quadros. Lê o cancelamento da verificação em cada redimensionamento e verifica novamente a validade do identificador antes de retornar. `DELETE` pelo proprietário é idempotente; a exclusão ou expiração TTL libera a fonte retida e a contabilidade de uso.

O armazenamento compartilhado é local do processo: os identificadores expiram na reinicialização e não são transferíveis entre processos OmniRoute independentes. As estatísticas de gerenciamento expõem a política efetiva de retenção/remota e agregam apenas entries/bytes retido, nunca mídia, referências, IDs principal ou identificadores. O painel Configurações de vídeo mostra esses valores e pode persistir em ambas as opções de consentimento. Esta documentação de implementação não é uma evidência de implantação ou promoção em tempo real; a aceitação do modelo real é rastreada separadamente.

Os quadros são legendados sequencialmente com o modelo de vídeo configurado. Uma substituição de vídeo vazia herda a configuração Visão; se ambos estiverem vazios, o roteador automático Vision seleciona o modelo com capacidade de visão eficaz. As legendas bem-sucedidas substituem a parte original por um prefixo `[Video description:` estável que também marca o texto como uma observação não confiável derivada da mídia e diz aos modelos downstream para não seguirem as instruções encontradas na mídia. As chaves de cache de legenda de quadro incluem bytes JPEG, prompt, carimbo de data/hora e modelo efetivo; apenas as legendas bem-sucedidas são armazenadas em cache. As entradas de cache retêm o modelo de produtor real bem-sucedido, incluindo um modelo substituto; a ponte reporta `mixed` quando quadros diferentes foram produzidos por modelos diferentes. Um acerto de cache reutiliza a identidade do produtor em vez de rotulá-la novamente como o plano de roteamento solicitado. O cache de resultados de vídeo inteiro é digitado em cada entrada que altera o prompt — de saída, o modelo efetivo, a política de amostragem, a contagem de quadros, o modo de análise semântica, a impressão SHA-256 da dica de foco normalizada, a janela de foco, `transcript`, `audioTranscript` e o sinalizador da folha de contato —, portanto, alterar qualquer uma dessas dimensões é uma falha de cache, nunca uma reutilização obsoleta. A versão da política de desduplicação visual, o limite e a contagem de quadros candidatos limitados também são explícitos na chave e nos metadados do cache de resultados; uma mudança de política, portanto, não pode reutilizar uma descrição obsoleta de todo o vídeo. Os metadados do cache de resultados v4 mantêm o modo e a impressão digital, nunca a tarefa bruta do usuário. Os metadados Guardrail relatam os modos de análise solicitados e efetivos; um modo `focused` solicitado sem texto de usuário utilizável é relatado como `full`.

O guardrail extrai todas as partes de vídeo suportadas, mas não descreve mais do que `modalityBridgeVideoMaxVideos`. Para um alvo com `supportsVideo === false` comprovado, vídeos com falha e acima do limite tornam-se marcadores de texto seguros explícitos para que nenhum vídeo bruto sobreviva. Quando a capacidade é desconhecida, essas partes mantêm a sua portadora de vídeo; qualquer transcrição substituta segue a conversão de texto delimitada acima. Alvos com `supportsVideo === true` contornam a ponte. O sinal de interrupção da solicitação do cliente se propaga por meio de download, fila do intermediário, subprocessos e chamadas de legenda; os abortos param entre os vídeos e nunca falham na abertura da mídia bruta.

As configurações de tempo de execução são apoiadas pelo banco de dados e validadas pelo Zod:

| Chave                               | Padrão      | Alcance/comportamento                                                                                       |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Tempo de execução opcional, opt-in                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` preserva legendas genéricas; `focused` usa contexto de usuário mais recente limitado e não confiável |
| `modalityBridgeVideoModel`          | `""`        | Herdar o modelo Vision Bridge                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ou `segment_aware` proporcional; falha do detector volta para `uniform`            |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1.000–120.000 ms                                                                                            |

Valores de tempo limite de vídeo persistentes legados acima de 120 segundos são limitados ao prazo do corretor; novas configurações gravadas acima desse limite são rejeitadas. `GET /api/modality-bridge/video/runtime` requer localidade de loopback carimbada confiável antes da autenticação ou investigação em tempo de execução e, em seguida, requer autenticação de gerenciamento. Ele retorna apenas `available`, versões limpas FFmpeg/ffprobe e um motivo fixo quando o tempo de execução está indisponível. O endpoint de extração interna não é um upload público API: a saturação da fila retorna `503` mais `Retry-After`, uma desconexão do chamador retorna `499` e o prazo fixo do corretor retorna `504`. As respostas convertidas adicionam `video->text;model=<visionModel>;parts=<videos>` ao cabeçalho `x-omniroute-modality-bridge` central sem remover segmentos de visão ou áudio.

### Máscara PII (`piiMasker.ts`)

Continua **ambos** etapas.

- **`preCall`** clona a carga útil, percorre `system`, `messages`, `input` e `prompt` (incluindo itens de string simples) e aplica `processPII()` (de `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, PII detectado é editado na carga útil de saída. Isso é independente do `INPUT_SANITIZER_MODE` (que controla apenas a política de injeção imediata). Quando a redação está desativada, a detecção de registros de chamadas conta sem reescrever o conteúdo.
- **`postCall`** clona profundamente a resposta, executa `sanitizePIIResponse()` mais o mascarador em forma de API de respostas (`maskResponsesOutput` — cobre `output_text` e `output[].content[].text`). Se ocorrer alguma redação, a resposta modificada substitui a original.

O guardrail nunca bloqueia; apenas anota (`meta.detections`, `meta.redacted`) ou reescreve.

#### Seleção por tipo, padrões personalizados e contadores de detecção

**Configurações → do painel Segurança → → Máscara PII** escolhe _o que_ está mascarado. Ele não ativa o mascaramento: ainda é `PII_REDACTION_ENABLED` (solicitação) e `PII_RESPONSE_SANITIZATION` (resposta + SSE), ambos desativados por padrão.

- **Seleção por tipo** — os IDs integrados estão listados em `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa todos os tipos (o comportamento antes da existência dessa configuração). O padrão `ssn_us` do mecanismo de solicitação é mapeado para `ssn`. Os templates (Mínimo, Padrão, Financeiro, Brasileiro, USA, GDPR, POPIA, Completo) apenas preenchem os checkboxes do UI.
- **Identificadores GDPR e POPIA** — doze IDs integrados cobrindo identificadores pessoais EU e sul-africanos (tabela abaixo). Suas expressões regulares, validadores e tags de jurisdição residem em uma tabela, `src/shared/utils/piiPatterns.ts`, que é consumida tanto pelo sanitizador de resposta (`src/lib/piiSanitizer.ts`) quanto pelo mascarador de solicitação (`src/shared/utils/inputSanitizer.ts`). Uma correspondência é editada somente quando seu validador a aceita; uma série de dígitos nunca é suficiente. Um operador que salvou uma seleção restrita antes da existência desses ids mantém o comportamento que tinha até que os novos ids sejam marcados.
- **Padrões personalizados** — até 20 padrões regex ou curinga (`*` = até 64 caracteres sem espaço em branco, `?` = um). As partidas passam a ser `[CUSTOM_REDACTED]`. Todo padrão passa por `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): no máximo 500 caracteres, flags limitados a `g i m s u`, devem ser compilados, devem passar por `safe-regex` (retrocesso catastrófico) e não devem corresponder a uma string vazia ou a um espaço reservado de redação. Um padrão que falha é recusado quando salvo e testado, e uma linha armazenada que falha é ignorada em tempo de execução em vez de ser compilada. Os padrões personalizados só são executados enquanto a máscara está ativada.
- **Contadores de detecção** Contagens — por tipo (valores nunca correspondentes), mantidas na memória e redefinidas na reinicialização (`src/lib/pii/piiDetectionStats.ts`). Eles só aumentam enquanto a máscara está ativada.

As configurações ficam na tabela `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) e são lidas por meio de um cache de 1 s. API:

| Método | Caminho                  | Finalidade                                                                   |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado das flags, `enabledTypes`, `customPatterns`, contadores de detecção   |
| `PUT`  | `/api/settings/pii`      | Substitui `enabledTypes` (`null` = todos) e/ou `customPatterns`              |
| `POST` | `/api/settings/pii/test` | Dry-run de um padrão contra uma amostra de no máximo 8 KB; nada é armazenado |

Todos os três exigem autenticação de gerenciamento e validam o corpo com Zod (`src/shared/validation/schemas/piiSettings.ts`). Com login desabilitado (`requireLogin=false`), `GET` e o endpoint de teste estão abertos, mas `PUT` ainda precisa de uma sessão de painel, uma chave `manage` -scope API, um token de acesso `oma_` com escopo de gravação ou superior ou o token CLI ou token de serviço interno enviado do loopback.

#### Identificadores GDPR (EU) e POPIA (África do Sul)

| ID                  | Identificador                  | Validação                                                                                  |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                           | País conhecido, comprimento exato para esse país, ISO 13616 MOD-97-10                      |
| `eu_vat`            | Número VAT da UE               | Prefixo de Estado-membro conhecido e formato de número desse Estado (sem consulta ao VIES) |
| `es_dni_nie`        | DNI / NIE espanhol             | Letra de controle (valor mod 23); NIE é `X/Y/Z` + 7 dígitos                                |
| `it_codice_fiscale` | Codice Fiscale italiano        | Letra de controle das tabelas de posições ímpares/pares                                    |
| `pl_pesel`          | PESEL polonês                  | Checksum ponderado e faixas plausíveis de mês/dia de nascimento codificados                |
| `nl_bsn`            | BSN neerlandês                 | Prova de 11 (pesos 9..2, -1)                                                               |
| `de_steuer_id`      | Steuer-ID alemão               | ISO 7064 Mod 11,10 mais as regras de estrutura dos dígitos (sem 0 inicial)                 |
| `se_personnummer`   | personnummer sueco             | Luhn sobre os últimos dez dígitos e data de nascimento plausível (10 ou 12 dígitos)        |
| `za_id`             | Número de ID sul-africano      | Luhn sobre todos os 13 dígitos, mês/dia de nascimento válidos, dígito de cidadania 0 ou 1  |
| `za_phone`          | Telefone sul-africano          | Prefixo `+27` / `27`, ou a forma nacional `0..` escrita com espaço ou hífen                |
| `za_vat`            | Número VAT sul-africano        | 10 dígitos começando com `4` **e** "VAT" / "BTW" nos 48 caracteres anteriores              |
| `za_tax_ref`        | Referência fiscal sul-africana | 10 dígitos começando com `0`-`3`, Luhn **e** "tax" / "SARS" nos 48 caracteres anteriores   |

Como os formatos somente de dígitos colidem com números de pedido, números de construção e carimbos de data e hora, os mais fracos (`za_vat`, `za_tax_ref`) precisam da palavra-chave cue, e um número `0..` simples de dez dígitos não é tratado como um número de telefone sul-africano. IBANs espaçados (`GB29 NWBK ...`) não são correspondidos. No caminho de streaming, a sugestão é procurada apenas dentro do bloco atual. Os IDs ficam à frente dos padrões genéricos de telefone, portanto, um identificador validado mantém seu próprio espaço reservado (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Os modelos `gdpr` e `popia` selecionam os IDs EU e Sul-Africano, respectivamente. O mascaramento em si permanece opcional (regra rígida #20): nada aqui altera o padrão do sinalizador de recurso.

### Injeção de Prompt (`promptInjection.ts`)

Detecta estruturas adversariais no conteúdo fornecido pelo usuário e aplica a
política configurada. O comportamento é controlado por variáveis de ambiente e
opções do construtor:

| Configuração       | Variável de ambiente                                                                                 | Padrão | Efeito                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ativado            | `INPUT_SANITIZER_ENABLED`                                                                            | `true` | Quando `false`, o guardrail é contornado.                                                                                                                                                                       |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn` | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceito para retrocompatibilidade, mas **não** remove o texto de injeção; a reescrita de PII na requisição é controlada por `PII_REDACTION_ENABLED`.) |
| Limiar de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Severidade mínima exigida para bloquear. No padrão, Medium é somente observado.                                                                                                                                 |

**Precedência de modo** (`getMode`): `options.mode` do chamador → **override
de `INJECTION_GUARD_MODE` via feature flag no banco de dados** (Dashboard →
Configurações → Feature Flags) → env `INJECTION_GUARD_MODE` → env
`INPUT_SANITIZER_MODE` → `warn`. Um override do dashboard, portanto, vence as
variáveis de ambiente, de modo que a UI de Feature Flags controla o guard em
execução ao vivo (sem reinicialização). A leitura do banco de dados é
fail-safe: se ocorrer erro, o guard volta ao comportamento baseado em env e,
quando nenhum override está definido, o comportamento é idêntico à resolução
somente por env.

Fontes de detecção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto
   compartilhado de detectores usado em outras partes do pipeline).
2. `DEFAULT_GUARD_PATTERNS` internos (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com severidade `high`).
3. `customPatterns` opcionais passados via opções do construtor (strings,
   regex ou registros `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma detecção atinge o limiar de
severidade, `preCall` retorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, o guardrail registra,
mas permite a chamada. O helper compartilhado `evaluatePromptInjection()` também
é exportado para chamadores que precisam avaliar prompts sem passar pelo registry.

**Limite de varredura (v3.8.20):** o detector inspeciona apenas os **primeiros 16 KB**
do texto de prompt concatenado — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) em
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` quanto
`evaluatePromptInjection()` executam `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de rodar
o loop de padrões. Diretivas de injeção ficam próximas ao início de uma entrada, então isso
limita o uso de CPU/GC por regex em payloads de várias centenas de KB sem enfraquecer a
detecção (cf. #3932, #4041).

### Mascarador de credenciais (`credentialMasker.ts`)

Continua** ambos** estágios, últimos na cadeia padrão (prioridade `95`). Edita padrões conhecidos de chave de API/token secreto da carga útil de saída (conteúdo da mensagem, argumentos de chamada de ferramenta, resultados de ferramenta)** e** a resposta do provedor, de modo que uma credencial colada em um prompt (ou repetida por um resultado de ferramenta) não vaze para o provedor upstream ou de volta para o cliente.

- **Opt-in only**, same convention as PII redaction (Hard Rule #20-adjacent): disabled unless `settings.credentialRedactionEnabled === true` **or** `CREDENTIAL_REDACTION_ENABLED=true`. With it off, the guardrail is a no-op — it never blocks and never rewrites.
- `redactCredentials()` percorre toda a árvore payload/response (`walkValue()`, protótipo-poluição-segura, ciclo-seguro via `WeakSet`) e substitui as correspondências por um espaço reservado `[REDACTED:<type>]`, clonando apenas as ramificações que realmente foram alteradas.
- `CREDENTIAL_PATTERNS` cobre chaves do provedor LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves de nuvem ( chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves privadas / JWTs, suporte de credencial strings de conexão (`mongodb://user:pass@...`, etc.) e um padrão genérico de valor de cabeçalho `Authorization`/`x-api-key`/`api-key`/`apikey`. Chaves em formato de cabeçalho (`authorization`, `x-api-key`, `api-key`, `apikey`) são editadas estruturalmente (somente valor, prefixo de esquema como `Bearer `/`Basic ` preservado) em vez de por meio do regex de texto genérico.
- O guardrail nunca bloqueia; ele apenas reescreve (`modifiedPayload` / `modifiedResponse`) e anota (`meta.credentialsRedacted`, `meta.count`).

Guarda de regressão: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true interrompe a cadeia em curto-circuito
  message?: string; // exibida ao bloquear
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // retornado por preCall para reescrever a requisição
  modifiedResponse?: TValue; // retornado por postCall para reescrever a resposta
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

Uma guardrail sinaliza "nenhuma alteração" retornando `void`, `{}` ou
`{ block: false }`. Retornar um `modifiedPayload`/`modifiedResponse` substitui
o valor que flui pela cadeia para as guardrails subsequentes.
`signal?: AbortSignal` carrega o ciclo de vida do chamador para dentro das guardrails. O abort de uma requisição é a exceção deliberada de fail-open: as pontes de mídia interrompem o trabalho e fazem a limpeza sem restaurar a mídia bruta para um destino que se sabe não suportá-la.

## Registro (`registry.ts`)

O singleton `guardrailRegistry` expõe:

- `register(guardrail)` — adiciona (ou substitui pelo nome normalizado) uma guardrail e
  reordena por `priority` ascendente.
- `clear()` / `list()` — auxiliares administrativos.
- `runPreCallHooks(payload, context)` — itera as guardrails ativas, passa o
  payload através de `modifiedPayload` e para no primeiro `block: true`.
- `runPostCallHooks(response, context)` — mesmo fluxo no lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e, opcionalmente,
  registra novamente os padrões para um isolamento limpo de testes.

Ambos os executores retornam `{ blocked, payload|response, results, guardrail?, message? }`,
onde `results` é um array de registros `GuardrailExecutionResult` que incluem
os campos `blocked`, `skipped`, `modified`, `error` e `meta` por guardrail,
úteis para rastreamento.

### Desativando Guardrails por Requisição

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma
lista sem duplicatas de nomes de guardrails que devem ser ignoradas para a
requisição atual. Existem cinco canais, lidos nesta ordem e mesclados em uma única lista
(a primeira ocorrência vence na desduplicação):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` no corpo da requisição (nível superior)
3. `metadata.disabledGuardrails` no corpo da requisição (somente quando `metadata` é um objeto)
4. Header `x-omniroute-disabled-guardrails`
5. Header legado `x-disabled-guardrails`

Todos os cinco canais são mesclados, incluindo os dois headers: enviar tanto
`x-omniroute-disabled-guardrails` quanto `x-disabled-guardrails` ignora a união de
suas listas, e um header moderno vazio não oculta mais o legado
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), corrigido em
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Os valores podem ser arrays de strings ou uma string separada por vírgulas; os nomes
têm espaços removidos e são normalizados para kebab-case minúsculo (`pii_masker` → `pii-masker`), e entradas
vazias são descartadas. O resultado é passado através de `context.disabledGuardrails`
para o registro, que ignora as guardrails correspondentes (`skipped: true` em `results`).

A lista de desativação afeta apenas o **registro**. O modo `block` de injeção de prompt
é uma fronteira obrigatória: o middleware de proteção contra injeção
(`src/middleware/promptInjectionGuard.ts`) chama `evaluatePromptInjection()`
sem nenhuma lista de desativação controlada pelo chamador (a chamada morta
`resolveDisabledGuardrails({ body })` que ele costumava fazer foi removida em
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), portanto uma requisição
que desativa `prompt-injection` ainda é rejeitada no modo `block`. Isso é
intencional. Os canais de desativação são controlados pelo chamador (corpo da requisição,
metadados, headers), e um chamador não deve ser capaz de desligar um controle de segurança
que o operador definiu
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). A união
de headers de [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
altera apenas quais guardrails do registro são ignoradas; ela não permite que um cliente
contorne o middleware. Políticas obrigatórias de guardrails por chave e por grupo são
rastreadas na RFC v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Consulte [Cobertura e limites](#coverage-and-limits).

## Ordem de execução

Para cada requisição que flui por `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts` (as rotas da família de chat listadas em
[Cobertura e limites](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` monta a lista de itens a ignorar a partir da
   chave de API, do corpo e dos cabeçalhos.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` executa os guardrails em ordem
   crescente de prioridade:
   - Guardrails desabilitados são registrados como `skipped`.
   - O `preCall` de cada guardrail pode reescrever o payload via `modifiedPayload`.
   - O primeiro `block: true` faz um curto-circuito na cadeia e o handler retorna
     uma resposta de rejeição do guardrail.
3. O payload (potencialmente reescrito) flui para o roteamento de combo e o
   despacho para o upstream.
4. **Somente não-streaming:** após a resposta ser montada,
   `guardrailRegistry.runPostCallHooks(...)` executa a mesma cadeia sobre a
   resposta. Um `block: true` aqui descarta a resposta do upstream e retorna HTTP 400. Respostas em streaming pulam totalmente esta etapa.

Guardrails que lançam exceção são registrados com `error: <message>` e logados via
`logger.warn`, mas a cadeia continua — fail-open por design.

## Cobertura e limites

O registro de guardrails está conectado apenas ao pipeline de chat. Esses limites
são fixados por `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` e
`tests/unit/guardrail-pipeline-characterization.test.ts`; atualize esses testes
deliberadamente quando o comportamento mudar.

### Onde os hooks são executados

| Hook / controle                     | Executa em                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                   | Requisições tratadas pelo `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (e `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` e o proxy de chat do Telegram. Também o endpoint de teste do dashboard `/api/guardrails/test`. Um bloqueio pré-chamada retorna HTTP 400. |
| `runPostCallHooks`                  | Apenas respostas de chat **não-streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Respostas em streaming nunca chegam a ele.                                                                                                                                                                                                                                                                                                    |
| PII em streaming                    | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), encadeado em `streamingPipeline.ts` quando `PII_RESPONSE_SANITIZATION` está ativado. Ele não é um guardrail, portanto os canais de desativação não o afetam.                                                                                                                                                                                                                       |
| Middleware injection-guard (legado) | Toda rota `/v1` que carrega prompt, incluindo a família de chat (veja [cobertura de rotas](#injection-guard-route-coverage--red-team-phase-8--block-d)). Somente injeção de prompt.                                                                                                                                                                                                                                                              |

### O que não é coberto

- **Rotas de mídia, embeddings e dados** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nunca alcançam o registro. Nenhum
  mascaramento de PII, mascaramento de credenciais ou ponte de modalidade é
  executado nelas. Sua única verificação é o middleware legado de injection-guard.
- **Respostas em streaming** não recebem guardrails pós-chamada: sem `pii-masker`
  nem `credential-masker` pós-chamada, e sem bloqueio pós-chamada. Apenas a
  transformação de PII em streaming se aplica (quando `PII_RESPONSE_SANITIZATION`
  está ativado). Uma credencial ecoada de volta em uma resposta em streaming não
  é mascarada.
- **Canais de desativação vs. o middleware (por design):** o middleware avalia
  injeção de prompt com sua própria chamada a `evaluatePromptInjection()`, sem
  passar nenhuma lista de desativação controlada pelo chamador. O modo `block` é
  uma fronteira obrigatória que desativações controladas pelo chamador não podem
  contornar, inclusive nas rotas da família de chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Desabilitar o
  `prompt-injection` apenas pula o guardrail do registro.

### O que acessa a resposta antes do pós-chamada

No caminho não-streaming, a ordem é: extração de memória → execução de ferramentas
embutidas → guardrails pós-chamada → saída por bloqueio pós-chamada → gravação no
cache semântico.

- **A extração de memória** e **a execução de ferramentas** veem a resposta antes que os
  guardrails pós-chamada possam reescrevê-la ou bloqueá-la. Desde
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), a extração de
  memória passa o texto extraído pelo `sanitizePII` quando
  `PII_RESPONSE_SANITIZATION` está ativado (tanto em streaming quanto sem streaming), mas uma
  resposta que o pós-chamada bloqueia posteriormente ainda assim foi oferecida à memória e
  às ferramentas.
- **O cache semântico** armazena a resposta após o pós-chamada, portanto ele armazena a
  resposta reescrita, e uma resposta bloqueada nunca é armazenada em cache. As entradas de cache são
  indexadas por chave de API.

## Configuração

Variáveis de ambiente lidas pelos guardrails integrados:

| Variável                              | Usado por                | Efeito                                                                                                                     |
| ------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Defina como `false` para desativar a detecção por completo.                                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Política de injeção: `warn`, `block` ou `log`. O valor legado `redact` não reescreve o texto da injeção.                   |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Modo do guarda de injeção; também uma feature flag no banco de dados que **sobrepõe** as variáveis de ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Severidade mínima que `MODE=block` rejeita: `high` (padrão), `medium` ou `low`.                                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Alias legado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Quando `true`, as PII da requisição são redigidas (independentemente do modo de injeção).                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (a jusante) | Controla o comportamento do mascarador no lado da resposta.                                                                |

Os guardrails do Modality Bridge leem a configuração de runtime a partir do
armazenamento de configurações respaldado por banco de dados
(`getSettings()`), e não de variáveis de ambiente. As chaves primárias do Vision são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceitas apenas como o fallback de leitura documentado
de um ciclo; as gravações do dashboard usam as chaves primárias. Os padrões e o
resolvedor de fallback ficam em `src/shared/constants/modalityBridgeDefaults.ts`, com as
constantes legadas mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O Audio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, além das configurações
compartilhadas `modalityBridgeCache*`. O Audio não possui fallback de chave legada
porque essas chaves foram introduzidas com o esquema do Modality Bridge.

O Video usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, além das configurações compartilhadas `modalityBridgeCache*`.
Ele fica desativado por padrão porque FFmpeg/ffprobe são dependências operacionais
opcionais e a legendação de frames adiciona latência e custo de modelo.

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

Etapas:

1. Crie `src/lib/guardrails/myGuardrail.ts` estendendo `BaseGuardrail`.
2. Implemente `preCall` e/ou `postCall`.
3. Registre no momento da importação (push a partir de `registerDefaultGuardrails`) ou
   chame `guardrailRegistry.register(...)` em tempo de execução — o registro substitui
   qualquer guardrail anterior com o mesmo nome normalizado.
4. Adicione testes em `tests/unit/` (exemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testes

Use `resetGuardrailsForTests()` entre os testes para partir de um estado conhecido.
Passe `{ registerDefaults: false }` para começar com um registro vazio e
registrar apenas os guardrails sob teste. O Vision Bridge aceita injeção de
dependência (`deps.getSettings`, `deps.callVisionModel`); o Audio Bridge expõe os
pontos de extensão equivalentes para configurações, capacidades, seleção de modelo
STT, verificações de credenciais e transcrição. Os testes podem, portanto, exercitar
ambos os fluxos sem acesso a banco de dados ou rede.

## Veja também

- `src/lib/guardrails/` — implementação
- `src/shared/utils/inputSanitizer.ts` — detector compartilhado que alimenta
  a proteção contra injeção de prompt e a mascaramento de PII
- `src/shared/constants/visionBridgeDefaults.ts` — padrões do Vision Bridge e
  lista de modelos de bridge forçada
- `src/shared/constants/modalityBridgeDefaults.ts` — padrões de runtime compartilhados de Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — camada ortogonal (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — referência completa de variáveis de ambiente

## Cobertura de rotas do injection-guard e red-team (Fase 8 · Bloco D)

O injection-guard (`createInjectionGuard` / `withInjectionGuard`) cobre todas as rotas
que aceitam prompts do usuário. Ele respeita `INJECTION_GUARD_MODE` (padrão `warn` = apenas log;
`block` = retorna HTTP 400 `SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo padrão |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn        |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn        |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn        |

A extração de texto (`extractMessageContents`) cobre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (noturno, `nightly-llm-security.yml`):** o promptfoo valida que cada rota bloqueia
o corpus OWASP-LLM em `INJECTION_GUARD_MODE=block`; o garak executa probes (é ignorado sem secret).
`moderations` está incluído por consistência. O modo block é um limite obrigatório: `evaluatePromptInjection()`
ignora a lista de desativação por requisição que o middleware lhe passa, portanto `disabledGuardrails`
**não** isenta uma rota dele ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

O workflow noturno (`.github/workflows/nightly-llm-security.yml`, cron + disparo
manual) tem dois jobs:

- **`promptfoo-guard` (bloqueante)** — executa `promptfoo eval -c promptfooconfig.yaml`
  com `INJECTION_GUARD_MODE=block`. Cada caso adversarial (ex.: "ignore todas as
  instruções anteriores…", jailbreaks no estilo DAN) verifica que a resposta carrega
  `error.code === "SECURITY_001"`, ou seja, que o guard realmente rejeitou a requisição.
- **`garak` (consultivo)** — executa garak `--probes promptinject,dan,leakreplay`
  contra uma instância local do OmniRoute (`http://localhost:20128/v1`). Condicionado a um
  secret de provedor (`PROMPTFOO_PROVIDER_KEY`); é ignorado graciosamente e recebe o sufixo
  `|| true`, portanto reporta sem falhar o CI.

A cobertura do helper de guard (`createInjectionGuard` / `withInjectionGuard`)
abrange todas as rotas `/v1` que carregam prompts; o texto do prompt é extraído de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` por
`extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
