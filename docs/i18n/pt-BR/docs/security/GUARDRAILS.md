# Guardrails (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte da verdade:** `src/lib/guardrails/`

Guardrails impõem transformações de segurança, políticas e conteúdo na fronteira entre OmniRoute e provedores upstream. Cada guardrail pode inspecionar (e opcionalmente rejeitar, transformar ou anotar) cargas úteis de solicitação (`preCall`) e respostas upstream (`postCall`).

O sistema é** falha aberta** : se um guardrail for lançado durante a execução, o registro registrará o erro e continuará com o próximo guardrail em vez de falhar na solicitação. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente. A única exceção é uma solicitação abortada: quando o `signal` do chamador é abortado, um guardrail de lançamento rejeita a execução do gancho em vez de ser ignorado.

Os ganchos fazem** não** executado em todas as rotas ou em todas as respostas. Leia [Cobertura e limites](#coverage-and-limits) antes de confiar em uma proteção como controle de segurança.

## Guarda-corpos embutidos

O registro carrega automaticamente essas proteções em ordem de prioridade na importação (consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Estágio(s)     | Arquivo                   |
| ---------- | ------------------- | -------------- | ------------------------- |
| `1`        | `agent-guard`       | `preCall`      | `agentGuard/guardrail.ts` |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`         |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`          |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`          |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`            |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`      |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts`     |

Números de prioridade mais baixa são executados** primeiro** .

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
| `reroute`  |        | Forçar novo roteamento: o guarda do modelo mantido credenciado é ignorado. O redirecionamento-** alvo** O protetor de credenciais ainda aplica — quando não existe nenhum alvo de visão utilizável, a ponte bloqueia com um erro claro em vez de descrever ou enviar imagens brutas para um alvo somente de texto. |

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

### Ponte de Áudio (`audioBridge.ts`) — Modalidade Ponte PR-3

Intercepta solicitações de bate-papo com áudio antes que elas alcancem um alvo que não aceita entrada de áudio. Ele nunca redireciona a solicitação de chat: as partes de áudio são transcritas por meio do endpoint multipart existente compatível com OpenAI e o modelo de chat escolhido continua com transcrições de texto.

Fluxo:

1. Resolva `supportsAudio` por meio de `getResolvedModelCapabilities()`. Os metadados explícitos do registro do provedor são ganhos, depois os metadados do modelo estático e, em seguida, sincronizados `modalities_input`. Uma lista de entrada declarada sem `audio` é `false`; nenhuma evidência de capacidade permanece `null`. Tanto `false` quanto `null` ativam a ponte conservadora, enquanto `true` a contorna.
2. Resolva as configurações `modalityBridgeAudio*` e extraia partes de áudio de nível superior unidas de cada mensagem por meio do detector `detectMediaParts()` compartilhado. Os formatos de fio suportados são OpenAI `input_audio`, `audio_url` e `source.media_type: "audio/*"`. O áudio aninhado é detectado para roteamento, mas não removido pelo caminho de emenda. O trabalho é limitado por `modalityBridgeAudioMaxClips`; as partes posteriores permanecem intactas.
3. Respeite um `provider/model` configurado ou deixe `selectAudioBridgeModel()` percorrer `AUDIO_TRANSCRIPTION_PROVIDERS` na ordem de catálogo estável e selecione o primeiro modelo com uma credencial de provedor ativa utilizável.
4. `callAudioTranscription()` converte o áudio base64/data-URI em um `file` multipart ou baixa um `audio_url` remoto por meio do protetor de saída somente público com fixação DNS e um limite de 25 MB. Em seguida, ele POSTs o arquivo e o modelo selecionado para o autoloop `/v1/audio/transcriptions` local, autenticado com `resolveSelfLoopBearer()`. A rota de transcrição existente realiza pesquisa normal de credenciais, manipulação cooldown/rate-limit e envio de provedor.
5. Chamadas bem-sucedidas substituem suas partes por `[Audio N]: <transcript>`. As chamadas são executadas com `Promise.allSettled`: uma falha individual preserva a parte de áudio original ( contrato #4012 ). Se todas as chamadas falharem e o alvo for comprovado `supportsAudio === false`, as partes se tornarão `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430 ). Para um alvo desconhecido (`null`), um resultado de falha total permanece inalterado. Um destino somente texto comprovado sem credencial STT utilizável recebe o mesmo stub explícito sem emitir uma chamada de rede.

As transcrições bem-sucedidas usam o cache LRU/TTL do Modality Bridge em todo o processo. A chave combina a referência de áudio, o rótulo de operação `audio-transcription` estável e o modelo STT selecionado; as falhas nunca são armazenadas em cache. As tentativas de áudio atualizam os contadores `bridged`, `cacheHits`, `failures` e `lastUsedAt` compartilhados. As respostas transformadas carregam `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; solicitações intocadas não recebem um segmento Audio Bridge.

As configurações de tempo de execução são apoiadas pelo banco de dados e validadas pelo Zod:

| Chave                         | Padrão  | Faixa                |
| ----------------------------- | ------- | -------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                    |
| `modalityBridgeAudioModel`    | `""`    | Automático ou STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                 |

O cache compartilhado permanece controlado por `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em Conclusões de bate-papo `messages` e Respostas API `input` antes que um destino sem suporte de vídeo nativo conhecido seja chamado. As formas suportadas são `input_video`, `video_url`, `video_source`, HTTPS URLs e `data:video/*;base64,...` data URIs. Nomes de arquivos simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) possui a travessia da solicitação, a verificação capability/policy, a agregação por solicitação e a carga útil da resposta. Aquisição — de trabalho por vídeo, o cache de resultado completo, descrevendo uma sequência de quadros (que funde qualquer transcrição de áudio declarada pelo chamador) e metrics/abort/cleanup — por tentativa está oculto atrás de `processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez por parte do vídeo dentro do loop de `preCall`. Esse módulo também define os limites de porta explícitos `VideoMediaBrokerPort` (adquirir bytes e extrair quadros amostrados), `VideoAudioTranscriptionPort` (fundir uma transcrição de áudio declarada pelo chamador com as legendas amostradas) e `VideoDrilldownPort` (a forma herdada de armazenamento bruto). A produção STT e a retenção de quadros são compostas em torno da porta de descrição por meio `createVideoSttAdapter` e `createVideoDrilldownAdapter`; o último usa o ciclo de vida compartilhado do identificador opaco.

O caminho de solicitação `/v1` público nunca importa ou invoca um subprocesso. Os vídeos remotos são baixados com limite de 50 MiB ; vídeos base64 inline têm um limite conservador decodificado de 36 MiB por vídeo, de modo que o envelope model/messages/framing pode permanecer dentro do limite de admissão de solicitação JSON pública de 50 MiB. As estimativas de comprimento embutido e tamanho decodificado são verificadas antes da alocação. HTTPS é necessário no URL remoto inicial e em cada redirecionamento, usando a proteção de saída somente pública existente com fixação DNS. Os bytes então cruzam o limite interno exato do corretor `POST /api/modality-bridge/video/extract`. Essa rota é `LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas uma solicitação de loopback confiável autenticada por processo e nunca aceita um URL, caminho do sistema de arquivos, executável ou lista de argumentos. O pipeline API body-size e o leitor de corpo incremental do manipulador impõem independentemente um limite de entrada do corretor MiB. Sua fila limitada executa uma extração por vez, permite quatro trabalhos pendentes e limita a entrada pendente em 100 MiB.

Dentro do corretor, `ffprobe` lê um arquivo local privado; a lista de permissões de formato fixo exclui formatos de lista de reprodução e manifesto. Para contêineres da família MOV permitidos, as referências de dados MOV externas permanecem desabilitadas por padrão e o comando fixo não as aceita. Tanto `ffprobe` quanto `ffmpeg` usam a lista de permissões do protocolo `file` -only, um thread, matrizes de argumentos fixos, sem shell e executáveis resolvidos a partir de `PATH`. Os streams de capa de imagens anexadas não são candidatos jogáveis. Todos os fluxos reproduzíveis devem satisfazer os limites, e um fluxo padrão explícito é preferido antes do substituto determinístico de índice mais baixo. Os vídeos são limitados a 600 segundos, 8.192 pixels por dimensão e 33.554.432 pixels de origem. FFmpeg amostra de 1 a 16 quadros JPEG de ponto médio, reduz a borda longa para no máximo 1.024 pixels sem aumentar a escala de entradas menores e nunca recebe um URL. A amostragem é `uniform` por padrão. As políticas opcionais `scene_aware` e experimental `segment_aware` executam uma passagem FFmpeg fixa adicional sobre o fluxo local já validado, selecionam carimbos de data/hora de cena `showinfo` limitados e retornam deterministicamente aos mesmos pontos médios uniformes em caso de falha do detector, tempo limite, saída malformada ou um conjunto de candidatos vazio. O modo com reconhecimento de segmento aloca amostras de ponto médio proporcionalmente aos intervalos de cena validados; evidências de reconhecimento de segmento e comportamento de fallback são detalhados abaixo. O limite rígido de 16 quadros é aplicado após a seleção em todas as políticas. Quando uma solicitação com reconhecimento de cena tem apenas um orçamento de um quadro, ela usa o ponto médio uniforme do vídeo completo ativo ou da janela de foco e relata `policyEffective: uniform`: um único quadro de cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode opcionalmente fornecer uma janela de foco finita (`start`/`end` segundos); os limites são limitados à duração da mídia, as janelas invertidas ou não finitas são rejeitadas e todas as políticas de amostragem são executadas apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não confiável para que os modelos downstream possam distinguir um trecho em foco da linha do tempo completa.

O foco da legenda semântica é uma configuração separada e explícita. O modo de análise `full` padrão preserva o prompt do quadro existente e nunca encaminha o texto da solicitação para o modelo de legenda. No modo `focused`, a ponte lê apenas o último `text`/`input_text` não vazio de autoria do usuário do mesmo contêiner Chat ou Responses, normaliza-o para NFC, recolhe caracteres de controle e espaços em branco e limita-o a 500 pontos de código Unicode. Um resultado vazio retorna ao prompt exato `full`. Uma dica utilizável é serializada como JSON em um bloco dedicado de contexto de usuário não confiável e pode priorizar apenas detalhes observáveis; ele não pode substituir o aviso separado das instruções visíveis ou audíveis na mídia. O foco textual nunca infere `start`/`end` ou altera o amostrador temporal.

#### evidência do segmento estrutural FU-07

`segment_aware` usa uma passagem de pré-análise limitada sobre o fluxo de vídeo local já validado. A cadeia de filtro fixa primeiro é dimensionada para no máximo 320 pixels de largura, detecta mudanças de cena e intervalos congelados e, em seguida, faz amostras de 1 quadro por segundo para desfoque, luma média e informações spatial/temporal. A passagem é limitada a 600 amostras estruturais, um thread FFmpeg/filter, o mesmo protocolo `file` -only e listas de permissões de contêiner, um limite de saída de processo de 1 MiB e no máximo 30 segundos dentro do abort/deadline. compartilhado do corretor. Ele nunca aceita um comando, filtro, caminho ou URL da solicitação.

Os valores estruturais são evidências de amostragem determinística, e não compreensão semântica do vídeo. Eles não inferem assuntos, ações, legendas, fala ou intenção do usuário. Os limites da cena e do congelamento formam segmentos; cobertura congelada, desfoque, exposição, detalhes espaciais e mudança temporal influenciam apenas como o orçamento existente de 1 a 16 quadros é alocado. Um segmento totalmente congelado é limitado a um quadro, enquanto os segmentos não congelados competem pelo orçamento restante. Quando os limites superam o número de quadros, a cobertura uniforme da linha do tempo é mantida, de modo que os cortes iniciais rápidos não conseguem ocultar um longo segmento final. Os limites da cena dentro da resolução de análise de 1 segundo de um limite congelado são unidos.

Filtros ausentes, evidências malformed/empty, um erro do detector ou o tempo limite de pré-análise limitado falham na abertura da política exata de ponto médio uniforme. Uma interrupção do chamador ou prazo do intermediário não falha na abertura: ele encerra o subprocesso em andamento, evita a extração posterior de quadros e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera acessórios FFmpeg reais determinísticos para economias de chamadas de legenda pós-desduplicação, alocação de orçamento de movimento denso, evidência blur/exposure/SI-TI, cortes rápidos com cauda longa e falsos positivos com desvanecimento gradual. Ele registra o tempo de parede da pré-análise e, onde `/usr/bin/time` está disponível, filho CPU e pico RSS. Suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legenda permanece `HOLD` porque este chicote não tem endpoint autorizado ou juiz congelado. A poupança monetária também permanece `HOLD` a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita por chamada; o script nunca fabrica nenhum dos resultados.

Cada quadro é limitado a 4 MiB, todos os quadros brutos juntos a 23 MiB e a resposta do corretor serializado a 32 MiB. Um diretório temporário privado é removido em `finally`. OmniRoute não empacota FFmpeg e não aceita um caminho executável personalizado. Antes da legenda, a ponte aplica uma passagem de desduplicação visual conservadora: cada JPEG é reduzido a um buffer de 16 × 16 tons de cinza e é comparado apenas com o último quadro retido. Para um orçamento de legenda solicitado acima de um quadro, a extração fornece um conjunto limitado de candidatos de até o dobro desse orçamento e nunca mais do que 16 quadros. O limite solicitado é aplicado somente após a desduplicação, com o primeiro e o último candidato selecionado preservados durante o desbaste final quando o orçamento for de pelo menos dois. A política `grayscale-16x16-mean-cells-v2` versionada usa o maior delta médio de luma e a proporção de células em miniatura cujo delta normalizado é de pelo menos 0,05. O limite duplicado é a constante 0,04, escolhida pela previsibilidade em vez de exposta como uma configuração de tempo de execução. Este sinal secundário de alto contraste preserva pequenos movimentos e alterações de texto visível que uma comparação apenas média pode ocultar. Os erros do comparador ou do decodificador falham na abertura e mantêm a cobertura. Os metadados de saída separam candidatos extraídos, quadros usados com sucesso e duplicatas visuais eliminadas.

Uma parte de vídeo marcada explicitamente pode solicitar uma folha de contato com registro de data e hora. A ponte constrói no máximo uma grade JPEG de 4 colunas e 16 quadros. Cada célula de 512 pixels grava seu carimbo de data/hora de origem em uma banda inferior de alto contraste, enquanto os mesmos carimbos de data/hora permanecem em metadados textuais para associação e auditoria downstream. O JPEG completo permanece limitado a 32 MiB. Se `sharp` não puder decodificar ou compor a grade, a ponte retornará aos quadros JPEG individuais; uma interrupção do cliente ainda se propaga pela operação de planilha.

A evidência de promoção é deliberadamente separada do microbenchmark da composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um chicote A/B com versão de esquema para modelos de visão reais compatíveis com OpenAI. Ele mede tokens relatados pelo provedor, latência de ponta a ponta (incluindo composição de planilha), contagem de chamadas de modelo e retenção de fatos definidos pelo manifesto. As respostas brutas do modelo não são gravadas no relatório; apenas resumos SHA-256 e fatos correspondentes IDs são retidos. O chicote não faz nenhuma chamada de rede ou de modelo pago, a menos que `--execute-real` seja passado e `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, seu veredicto legível por máquina permanece `HOLD`; medições sintéticas payload/call-count por si só não são evidências de promoção.

O `scripts/perf/video-bridge-promotion-eval.ts` separado consome observações FU-07 ou FU-09. A admissão à promoção requer todos os oito tipos de cenários sintéticos mais um clipe real higienizado, pelo menos três repetições medidas por função e caso, todas as dez métricas declaradas, resumos media/prompt/expected-fact/settings congelados, observação única IDs e ordem A/B semeada verificada. O recibo de execução vincula o resumo do corpus, o candidato exato SHA e a revisão do modelo. Medições ausentes ou inválidas permanecem `HOLD`, incluindo CPU acima de 30 s, pico RSS acima de 512 MiB ou pré-análise acima de 30 s. Esses são limites de admissão de evidências, não uma nova garantia de aplicação RSS em tempo de execução.

FU-07 requer pelo menos 98% de retenção de qualidade e latência p95 não superior a 1,2x da linha de base, além de uma melhoria média absoluta de recall com balanceamento de caso de 0,05 em chamadas médias de legenda equivalentes ou pelo menos 10% menos chamadas médias de legenda pós-desduplicação. FU-09 requer qualidade de pelo menos 0,85, 95% de retenção, 20% de redução de latência mediana e 10% de redução de token. A perda de fatos críticos, a conformidade com a injeção ou a falta de uso impedem a promoção. Uma execução não pode promover nada: `--previous-report` confirma duas execuções distintas, não sobrepostas e consecutivamente elegíveis do mesmo policy/model revision/candidate/corpus. Um experimento de amostragem não pode confirmar um experimento de folha de contato.

Os coletores devem pontuar as respostas na memória e salvar `responseDigest` além de métricas e ligações de observação, nunca texto de resposta. O consumidor também lê observações brutas herdadas, mas nunca copia esse texto em seus relatórios. Exatamente um dentre `responseDigest` ou `rawResponseText` é aceito para cada observação. A lista de permissões versionada permanece vazia com um padrão `hold` imutável. Uma entrada elegível requer referência de evidência, política, revisão de modelo, candidato exato SHA, resumo do manifesto e duas execuções distintas IDs; contextos conflitantes são rejeitados. Esses metadados são um contrato de auditoria e não uma prova de que um arquivo referenciado contém medições genuínas. Revise os recibos reais antes de adicionar qualquer entrada. O endpoint de estatísticas de gerenciamento e o painel de vídeo expõem uma prontidão conservadora. Um alias de modelo configurado por si só não estabelece sua revisão ou o candidato em execução SHA, portanto, o painel atual relata `HOLD` em vez de reutilizar a elegibilidade de outro contexto de execução. A seleção experimental explícita permanece separada da promoção; nenhum padrão é alterado automaticamente.

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

O consumidor obtém a propriedade da chave autenticada e aplica a política de chave: GET e DELETE pertencem à categoria de endpoint `video`, incluindo os aliases `/v1` e `/api/v1`. As chaves com uma lista de permissões de endpoint não vazia devem incluir `video`; chaves irrestritas permanecem compatíveis. O consumidor retorna o mesmo 404 para identificadores desconhecidos, expirados e de outra chave. Ele aceita `variant=preview|standard|detail` (dimensão JPEG máxima 320/640/1280, nunca ampliada), `limit=1..8` (ou o alias herdado `frames`, nunca ambos), `page` baseado em zero e segundos de foco `start`/`end` opcionais. Chaves de consulta duplicadas e janelas de foco invertido são rejeitadas. Cada variante retornada possui um hash de seu conteúdo real e metadados de resolução reais, vinculados à fonte retida. As variantes são derivadas da leitura, em vez de armazenadas como cópias retidas extras. A resposta JSON, incluindo Base64/envelope, é limitada a 32 MiB; uma página superdimensionada retorna 413 e o cliente deve solicitar menos quadros. Lê o cancelamento da verificação em cada redimensionamento e verifica novamente a validade do identificador antes de retornar. `DELETE` pelo proprietário é idempotente; a exclusão ou expiração TTL libera a fonte retida e a contabilidade de uso.

O armazenamento compartilhado é local do processo: os identificadores expiram na reinicialização e não são transferíveis entre processos OmniRoute independentes. As estatísticas de gerenciamento expõem a política efetiva de retenção/remota e agregam apenas entries/bytes retido, nunca mídia, referências, IDs principal ou identificadores. O painel Configurações de vídeo mostra esses valores e pode persistir em ambas as opções de consentimento. Esta documentação de implementação não é uma evidência de implantação ou promoção em tempo real; a aceitação do modelo real é rastreada separadamente.

Os quadros são legendados sequencialmente com o modelo de vídeo configurado. Uma substituição de vídeo vazia herda a configuração Visão; se ambos estiverem vazios, o roteador automático Vision seleciona o modelo com capacidade de visão eficaz. As legendas bem-sucedidas substituem a parte original por um prefixo `[Video description:` estável que também marca o texto como uma observação não confiável derivada da mídia e diz aos modelos downstream para não seguirem as instruções encontradas na mídia. As chaves de cache de legenda de quadro incluem bytes JPEG, prompt, carimbo de data/hora e modelo efetivo; apenas as legendas bem-sucedidas são armazenadas em cache. As entradas de cache retêm o modelo de produtor real bem-sucedido, incluindo um modelo substituto; a ponte reporta `mixed` quando quadros diferentes foram produzidos por modelos diferentes. Um acerto de cache reutiliza a identidade do produtor em vez de rotulá-la novamente como o plano de roteamento solicitado. O cache de resultados de todo o vídeo é digitado em cada entrada que altera o prompt — de saída, o modelo efetivo, a política de amostragem, a contagem de quadros, o modo de análise semântica, a impressão SHA-256 da dica de foco normalizada, a janela de foco, `transcript`, `audioTranscript` e o sinalizador da folha de contato —, portanto, alterar qualquer uma dessas dimensões é uma falha de cache, nunca uma reutilização obsoleta. A versão da política de desduplicação visual, o limite e a contagem de quadros candidatos limitados também são explícitos na chave e nos metadados do cache de resultados; uma mudança de política, portanto, não pode reutilizar uma descrição obsoleta de todo o vídeo. Os metadados do cache de resultados v4 mantêm o modo e a impressão digital, nunca a tarefa bruta do usuário. Os metadados Guardrail relatam os modos de análise solicitados e efetivos; um modo `focused` solicitado sem texto de usuário utilizável é relatado como `full`.

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

Os valores de tempo limite de vídeo persistente legado acima de 120 segundos são limitados ao prazo do corretor; novas configurações gravadas acima desse limite são rejeitadas. `GET /api/modality-bridge/video/runtime` requer localidade de loopback carimbada confiável antes da autenticação ou investigação em tempo de execução e, em seguida, requer autenticação de gerenciamento. Ele retorna apenas `available`, versões limpas FFmpeg/ffprobe e um motivo fixo quando o tempo de execução está indisponível. O endpoint de extração interna não é um upload público API: a saturação da fila retorna `503` mais `Retry-After`, uma desconexão do chamador retorna `499` e o prazo fixo do corretor retorna `504`. As respostas convertidas adicionam `video->text;model=<visionModel>;parts=<videos>` ao cabeçalho `x-omniroute-modality-bridge` central sem remover segmentos de visão ou áudio.

### PII Mascarador (`piiMasker.ts`)

Continua** ambos** etapas.

- **`preCall`** clona a carga útil, percorre `system`, `messages`, `input` e `prompt` (incluindo itens de string simples) e aplica `processPII()` (de `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`. Quando `PII_REDACTION_ENABLED=true`, PII detectado é editado na carga útil de saída. Isso é independente do `INPUT_SANITIZER_MODE` (que controla apenas a política de injeção imediata). Quando a redação está desativada, a detecção de registros de chamadas conta sem reescrever o conteúdo.
- **`postCall`** clona profundamente a resposta, executa `sanitizePIIResponse()` mais o mascarador em forma de API de respostas (`maskResponsesOutput` — cobre `output_text` e `output[].content[].text`). Se ocorrer alguma redação, a resposta modificada substitui a original.

O guardrail nunca bloqueia; apenas anota (`meta.detections`, `meta.redacted`) ou reescreve.

**Cofre reversível (`PII_REVERSIBLE_VAULT_ENABLED`, padrão `false`).** Quando `PII_REDACTION_ENABLED` e `PII_REVERSIBLE_VAULT_ENABLED` estão ativados (DB override > env > padrão, lido uma vez por solicitação), `handleChat` abre um cofre por solicitação do cliente (`src/lib/pii/requestTokenVaultScope.ts`) e o passa para a passagem de pré-chamada como `GuardrailContext.tokenVault`. O mascarador então grava tokens substitutos, como `<<PII_EMAIL_QWERTYUI_1>>` em vez de `[EMAIL_REDACTED]`, para regras integradas, validadas (GDPR/POPIA) e personalizadas. O nonce tem 8 letras maiúsculas aleatórias por solicitação, e o mesmo valor obtém o mesmo token na solicitação. Apenas o mascarador é válido: o guarda de injeção imediata e `/api/guardrails/test` funcionam sem cofre e mantêm os espaços reservados.

- O provedor, cada perna do combo, nova tentativa, membro do painel de fusão e o juiz de fusão veem apenas tokens. Os tokens são restaurados uma vez, na resposta 2xx que deixa `handleChat`: por campo no SSE analisado (um token dividido entre eventos ainda é resolvido; os argumentos de chamada de ferramenta têm escape JSON) ou por campo em um corpo JSON, com um `Content-Length` recalculado. O conteúdo e o texto de raciocínio e os argumentos de chamada de ferramenta são restaurados. Os corpos de erro (4xx/5xx) mantêm os tokens.
- As falhas permanecem privadas: se a cunhagem falhar ou o cofre recusar um valor (1000 entradas, 256 caracteres por valor, 64 KB no total), o espaço reservado será escrito; um token que o vault não consegue resolver ou uma restauração que falha permanece literal e apenas uma contagem é registrada. O cofre não contém temporizadores nem estados globais; ele é limpo quando o fluxo de resposta termina, é cancelado ou há erros.
- Quando uma solicitação gera tokens, a extração de memória, o salvamento de idempotência e as gravações do cache semântico são ignoradas, porque nenhuma solicitação posterior poderia resolver esses tokens. Nos registros de chamadas, a solicitação e a resposta do provedor carregam tokens; o corpo da solicitação do cliente registrado ainda é a entrada bruta do cliente, como acontece com a redação simples.
- Os tokens usam um nonce aleatório por solicitação, portanto, o prefixo do prompt muda a cada turno: o cache de prompt do lado do provedor não atinge turnos mascarados e um token que retorna em um turno posterior (por exemplo, via `previous_response_id`) pertence a uma solicitação antiga e permanece literal.

#### Seleção por tipo, padrões personalizados e contadores de detecção

**Painel → Configurações → Segurança → PII mascaramento** escolhe _o que_ está mascarado. Ele não ativa o mascaramento: ainda `PII_REDACTION_ENABLED` (solicitação) e `PII_RESPONSE_SANITIZATION` (resposta + SSE), ambos desativados por padrão.

- **Seleção por tipo** — os IDs integrados estão listados em `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa todos os tipos (o comportamento antes da existência dessa configuração). O padrão `ssn_us` do mecanismo de solicitação é mapeado para `ssn`. Os modelos (Mínimo, Padrão, Financeiro, Brasileiro, USA, GDPR, POPIA, Completo) apenas preenchem as caixas de seleção no UI.
- **identificadores GDPR e POPIA** — doze ids integrados cobrindo identificadores pessoais EU e sul-africanos (tabela abaixo). Suas expressões regulares, validadores e tags de jurisdição residem em uma tabela, `src/shared/utils/piiPatterns.ts`, que tanto o sanitizador de resposta (`src/lib/piiSanitizer.ts`) quanto o mascarador de solicitação (`src/shared/utils/inputSanitizer.ts`) consomem. Uma correspondência é editada somente quando seu validador a aceita; uma série de dígitos nunca é suficiente. Um operador que salvou uma seleção restrita antes da existência desses ids mantém o comportamento que tinha até que os novos ids sejam marcados.
- **Padrões personalizados** — até 20 padrões regex ou curinga (`*` = até 64 caracteres sem espaço em branco, `?` = um). As correspondências tornam-se `[CUSTOM_REDACTED]`. Todo padrão passa por `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): no máximo 500 caracteres, sinalizadores limitados a `g i m s u`, devem ser compilados, devem passar por `safe-regex` (retrocesso catastrófico) e não devem corresponder a uma string vazia ou a um espaço reservado de redação. Um padrão que falha é recusado quando salvo e testado, e uma linha armazenada que falha é ignorada em tempo de execução em vez de ser compilada. Os padrões personalizados só são executados enquanto a máscara está ativada.
- **Contadores de detecção** — contagens por tipo (valores nunca correspondentes), mantidas na memória e redefinidas na reinicialização (`src/lib/pii/piiDetectionStats.ts`). Eles só aumentam enquanto a máscara está ativada.

As configurações ficam na tabela `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) e são lidas por meio de um cache de 1 s. API:

| Método | Caminho                  | Propósito                                                                    |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado da bandeira, `enabledTypes`, `customPatterns`, contadores de detecção |
| `PUT`  | `/api/settings/pii`      | Substitua `enabledTypes` (`null` = todos) and/or `customPatterns`            |
| `POST` | `/api/settings/pii/test` | Teste um padrão contra uma amostra de no máximo 8 KB; nada é armazenado      |

Todos os três exigem autenticação de gerenciamento e validam o corpo com Zod (`src/shared/validation/schemas/piiSettings.ts`). Com o login desabilitado (`requireLogin=false`), `GET` e o endpoint de teste estão abertos, mas `PUT` ainda precisa de uma sessão de painel, uma chave `manage` -scope API, um token de acesso `oma_` com escopo de gravação ou superior ou o token CLI ou token de serviço interno enviado do loopback.

#### Identificadores GDPR (EU) e POPIA (África do Sul)

| Eu ia               | Identificador             | Validação                                                                                 |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------------------- |
| `iban`              | IBAN                      | País conhecido, comprimento exato desse país, ISO 13616 MOD-97-10                         |
| `eu_vat`            | número EU VAT             | Prefixo do estado membro conhecido e formato numérico desse estado (sem pesquisa VIES )   |
| `es_dni_nie`        | Espanhol DNI / NIE        | Carta de controle (valor mod 23); NIE é `X/Y/Z` + 7 dígitos                               |
| `it_codice_fiscale` | Códice Fiscal Italiano    | Carta de controle das tabelas de posição odd/even                                         |
| `pl_pesel`          | PESEL polonês             | Soma de verificação ponderada e uma data de nascimento codificada existente               |
| `nl_bsn`            | BSN holandês              | 11 provas (pesos 9..2, -1)                                                                |
| `de_steuer_id`      | Steuer-ID alemão          | ISO 7064 Mod 11,10 mais as regras de estrutura de dígitos (sem 0 inicial)                 |
| `se_personnummer`   | Número de pessoa sueco    | Luhn sobre os últimos dez dígitos e uma data de nascimento plausível (10 ou 12 dígitos)   |
| `za_id`             | Número ID sul-africano    | Luhn com todos os 13 dígitos, nascimento válido month/day, dígito de cidadania 0 ou 1     |
| `za_phone`          | Telefone sul-africano     | Prefixo `+27` / `27`, ou a forma nacional `0..` escrita com um espaço ou hífen            |
| `za_vat`            | Número VAT sul-africano   | 10 dígitos começando com `4`** e** "VAT" / "BTW" nos 48 caracteres anteriores             |
| `za_tax_ref`        | Ref. fiscal sul-africana. | 10 dígitos começando com `0`-`3`, Luhn,** e** "tax" / "SARS" nos 48 caracteres anteriores |

Como os formatos somente de dígitos colidem com números de pedido, números de construção e carimbos de data e hora, os mais fracos (`za_vat`, `za_tax_ref`) precisam da palavra-chave cue, e um número `0..` simples de dez dígitos não é tratado como um número de telefone sul-africano. IBANs espaçados (`GB29 NWBK ...`) não são correspondidos. No caminho de streaming, a sugestão é procurada apenas dentro do bloco atual. Os ids ficam à frente dos padrões genéricos de telefone, portanto, um identificador validado mantém seu próprio espaço reservado (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Os modelos `gdpr` e `popia` selecionam os IDs EU e sul-africano, respectivamente. O mascaramento em si permanece ativo (regra rígida #20): nada aqui altera o padrão do sinalizador de recurso.

### Injeção imediata (`promptInjection.ts`)

Detecta estruturas adversárias em conteúdo fornecido pelo usuário e aplica a política configurada. O comportamento é orientado por variáveis de ambiente e opções de construtor:

| Contexto           | Variável ambiente                                                                                                    | Padrão | Efeito                                                                                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado         | `INPUT_SANITIZER_ENABLED`                                                                                            | `true` | Quando `false`, o guardrail entra em curto-circuito.                                                                                                                                                        |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                      | `warn` | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceito para retrocompatibilidade, mas não** não** texto de injeção de tira; a solicitação PII rewrite é controlada por `PII_REDACTION_ENABLED`.) |
| Limite de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (também conhecido como `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Gravidade mínima necessária para bloquear. Médio é somente observação por padrão.                                                                                                                           |

**Precedência de modo** (`getMode`): chamador `options.mode` → `INJECTION_GUARD_MODE`** substituição do sinalizador de recurso DB** (Configurações do painel → Sinalizadores de recurso → ) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Uma substituição do painel, portanto, vence os env vars, de modo que os Feature Flags UI controlam o guarda em execução ao vivo (sem reinicialização). A leitura DB é à prova de falhas: se ocorrer erro, o guarda volta ao comportamento baseado em ambiente e, quando nenhuma substituição é definida, o comportamento é idêntico à resolução somente de ambiente.

Fontes de detecção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de detectores compartilhados usado em outra parte do pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrado (atualmente `system_override_inline` e `markdown_system_block`, ambos com gravidade `high` ).
3. `customPatterns` opcional passado por meio de opções de construtor (strings, regex ou registros `{ name, pattern, severity }` ).

Quando `mode === "block"`** e** pelo menos uma detecção atende ao limite de gravidade, `preCall` retorna `{ block: true, message: "Request rejected: suspicious content detected" }`. Nos modos `warn`/`log`, o guardrail registra, mas permite a chamada. O auxiliar compartilhado `evaluatePromptInjection()` também é exportado para chamadores que precisam avaliar prompts sem passar pelo registro.

**Limite de digitalização (v3.8.20):** o detector apenas inspeciona o** primeiros 16 KB** de texto de prompt unido — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 bytes) em `src/shared/utils/inputSanitizer.ts`. `detectInjection()` e `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de executar o loop padrão. As diretivas de injeção ficam próximas ao topo de uma entrada, portanto, isso limita o regex CPU/GC em cargas úteis de centenas de KB sem enfraquecer a detecção (cf. #3932, #4041).

### Mascarador de credenciais (`credentialMasker.ts`)

Continua** ambos** estágios, últimos na cadeia padrão (prioridade `95`). Edita padrões conhecidos de chave de API/token secreto da carga útil de saída (conteúdo da mensagem, argumentos de chamada de ferramenta, resultados de ferramenta)** e** a resposta do provedor, de modo que uma credencial colada em um prompt (ou repetida por um resultado de ferramenta) não vaze para o provedor upstream ou de volta para o cliente.

- **Opt-in only**, same convention as PII redaction (Hard Rule #20-adjacent): disabled unless `settings.credentialRedactionEnabled === true` **or** `CREDENTIAL_REDACTION_ENABLED=true`. With it off, the guardrail is a no-op — it never blocks and never rewrites.
- `redactCredentials()` percorre toda a árvore payload/response (`walkValue()`, protótipo-poluição-segura, ciclo-seguro via `WeakSet`) e substitui as correspondências por um espaço reservado `[REDACTED:<type>]`, clonando apenas as ramificações que realmente foram alteradas.
- `CREDENTIAL_PATTERNS` cobre chaves do provedor LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves de nuvem ( chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves privadas / JWTs, suporte de credencial strings de conexão (`mongodb://user:pass@...`, etc.) e um padrão genérico de valor de cabeçalho `Authorization`/`x-api-key`/`api-key`/`apikey`. Chaves em formato de cabeçalho (`authorization`, `x-api-key`, `api-key`, `apikey`) são editadas estruturalmente (somente valor, prefixo de esquema como `Bearer `/`Basic ` preservado) em vez de por meio do regex de texto genérico.
- Um valor atrás de um rótulo é mascarado mesmo quando não tem prefixo de provedor: `DB_PASSWORD=…`, `AWS_SECRET_ACCESS_KEY=…`, `client_secret: …`, `?api_key=…` (rótulos: `password`, `passwd`, `secret`, `secret_key`, `secret_access_key`, `api_key`, `access_token`, `refresh_token`, `auth_token`, com qualquer prefixo como `DB_`). O rótulo e o separador permanecem e o valor passa a ser `[REDACTED:secret]`. O valor precisa de 12 ou mais caracteres, portanto, prosa como `password: required` permanece legível; um valor que começa com `$` ou `%` (uma referência de variável) é deixado de lado.
- O guardrail nunca bloqueia; ele apenas reescreve (`modifiedPayload` / `modifiedResponse`) e anota (`meta.credentialsRedacted`, `meta.count`).

Guarda de regressão: `tests/unit/credential-masker-guardrail.test.ts`.

### Agente Guarda (`agentGuard/`)

O agente guard classifica o cliente por trás de uma solicitação ao provedor `claude` ou `anthropic` a partir de seus cabeçalhos. `AGENT_GUARD_MODE` assume três valores: `off` (padrão), `monitor` e `block`. Com `off`, nenhum cabeçalho é lido e nada é registrado.

Os agentes oficiais são reconhecidos por estes cabeçalhos (comparados sem distinção entre maiúsculas e minúsculas):

- Código Claude : um `User-Agent` começando com `claude-cli/` ou `claude-code/`, ou `x-app: cli` junto com um cabeçalho `anthropic-beta` ou um `User-Agent` que contém `claude`.
- Anthropic SDKs: um `User-Agent` começando com `Anthropic/`, `AsyncAnthropic/`, `anthropic-typescript/` ou `anthropic-python/`.

O nível padrão do criador de logs em produção (`info`) mostra os dois tipos de linha. Com o `APP_LOG_LEVEL=warn` apenas as linhas de terceiros conhecidas permanecem.

Campos de registro: `agent`, `thirdParty`, `provider`, `model`, `apiKeyId`, `userAgent`, `xApp`, `anthropicBeta`, `xTitle`, `referer`, `stainless`. Os valores do cabeçalho e a sequência do modelo são limitados a 200 caracteres. O referenciador é registrado sem sua string de consulta, fragmento e informações do usuário. A chave API, `Authorization`, `x-api-key` e cookies nunca são lidos.

Arquivos: `src/lib/guardrails/agentGuard/classifier.ts`, `src/lib/guardrails/agentGuard/policy.ts`, `src/lib/guardrails/agentGuard/guardrail.ts`, `src/lib/guardrails/agentGuard/settings.ts`, `src/lib/guardrails/agentGuard/logLine.ts`, `src/lib/guardrails/agentGuard/enforcement.ts`, `src/sse/handlers/chat/agentGuardGate.ts`.

**Limites de classificação (ambos os modos):**

- Um agente construído em um SDK oficial que não envia `X-Title`, `HTTP-Referer` ou `User-Agent` próprio se parece com o SDK. Os cabeçalhos `x-stainless-*` por si só não tornam um cliente oficial.
- Agentes terceirizados são correspondidos por tokens de palavras inteiras em `User-Agent`, `X-Title` e `HTTP-Referer` (ou `Referer`). Os clientes não listados aparecem como `unknown`.
- Solicitações de clientes baseados em navegador carregam o próprio `User-Agent` do navegador e aparecem como não identificadas, a menos que `X-Title` ou o referenciador carregue um token de terceiros conhecido.
- Uma linha de log por solicitação observada: espere volume em instâncias ocupadas.

#### Monitor

Com `AGENT_GUARD_MODE=monitor`, as solicitações cuja sequência de modelo nomeia o provedor `claude` ou `anthropic` são classificadas por seus cabeçalhos de cliente. Quando o cliente não é um agente oficial, uma linha de log com `tag: "AGENT_GUARD"` é gravada. É `warn` para um agente terceirizado conhecido e `info` para um cliente não identificado. Prioridade `1`: o guardrail apenas lê cabeçalhos e nunca altera a carga útil, portanto, é executado antes das pontes de mídia. `monitor` nunca bloqueia.

**Limites de `monitor`:**

- Cada sinal é um cabeçalho controlado pelo cliente. Isto é observação, não controle de acesso.
- O provedor é lido na sequência do modelo antes de o modelo ser resolvido: `provider/model`, um alias de provedor como `cc/…` e IDs de compartilhamento de cota (`qtSd/<group>/<provider>/<model>`). IDs de modelo simples, aliases de modelo, combos e posterior normalização de roteamento não são seguidos. Essas solicitações não são atendidas.
- Um chamador pode ignorá-lo por solicitação por meio dos canais de desativação do registro (consulte [Desativando Guardrails por solicitação](#disabling-guardrails-per-request) ). Solicitações ignoradas não são observadas.
- Ele é executado apenas onde `runPreCallHooks` é executado (consulte [Cobertura e limites](#coverage-and-limits) ).

#### Bloquear

Com `AGENT_GUARD_MODE=block`, o guardrail pré-chamada não faz nada. Em vez disso, o manipulador do chat toma a decisão:

1. A decisão é tomada quando um alvo está prestes a ser despachado, no provedor para o qual a solicitação foi resolvida. Aliases de provedor, IDs de modelo simples, IDs de compartilhamento de cota e todos os alvos combinados são abordados.
2. Ele não é executado no registro guardrail, portanto, os canais desabilitados por solicitação não se aplicam a ele.
3. Um agente terceirizado conhecido é recusado. Um cliente não identificado é registrado como em `monitor` e recusado apenas com `AGENT_GUARD_STRICT=true`. O código Claude e o Anthropic SDKs oficial nunca são recusados.
4. A recusa é HTTP 403 com `error.type` `permission_error` e `error.code` `client_agent_not_allowed`. O corpo é um erro no estilo OpenAI. Nas solicitações no formato Antrópico, ele também carrega `type: "error"` no nível superior. Não há cabeçalho `Retry-After` e a recusa é retornada antes do início de qualquer fluxo.
5. Uma recusa não é uma falha do fornecedor. Não afeta o disjuntor do provedor, os resfriamentos da conexão ou os bloqueios do modelo.
6. Em um combo, um alvo recusado é ignorado e os alvos restantes são executados. A solicitação falha com o erro de política quando pelo menos um alvo foi recusado e nenhum alvo passou pela guarda. O combo mantém seu próprio erro quando uma entrada de nível superior nomeia outro provedor conhecido, por um prefixo ou pelo ID do provedor da etapa. Um alvo de prioridade recusado com `fallbackOnlyOnQuotaExhaustion` é ignorado da mesma forma e não interrompe o combo. Um alvo sombrio é verificado e registrado, mas nunca conta como um alvo que passou pela guarda.
7. Um combo `fusion` falha antes que o painel seja executado, quando o juiz que o serviço de fusão usará será recusado. Esse juiz vem da configuração do combo ou dos padrões globais do combo. A mesma verificação é executada quando um combo de fusão é alcançado através do redirecionamento da rede de segurança.
8. Uma linha de log por solicitação e provedor, com `tag: "AGENT_GUARD"`, `warn` para recusa e os mesmos campos de `monitor`.
9. Em caso de erro interno, a proteção falha ao abrir. A solicitação prossegue e uma linha `warn` `agent guard failed open` é registrada.

**Limites de `block`:**

- Cada sinal é um cabeçalho controlado pelo cliente. Um cliente que envia `User-Agent: claude-cli/…` é tratado como código Claude. `block` dissuade agentes terceirizados não modificados. Não é controle de acesso.
- Um proxy que remove os cabeçalhos de identificação transforma qualquer cliente em um cliente não identificado. Esse cliente é atendido sem `AGENT_GUARD_STRICT` e recusado. Execute a guarda na instância que enfrenta os clientes. Uma segunda instância OmniRoute atrás da primeira vê os cabeçalhos da primeira.
- `AGENT_GUARD_STRICT` recusa todos os clientes desses provedores que não sejam o código Claude ou um SDK oficial. Isso inclui clientes baseados em navegador e o playground do painel. O teste ao vivo do painel combinado está isento, também por meio do redirecionamento da rede de segurança.
- Alguns recursos criam sua própria solicitação de chat em vez de repassar a solicitação do cliente. Quatro deles enviam de volta através das rotas `/v1/...` de OmniRoute:
  - trabalhos em lote (`src/lib/batches/dispatch.ts`)
  - as ferramentas de inferência MCP (`open-sse/mcp-server/tools/inferenceTools.ts`)
  - Roteamento inteligente A2A (`src/lib/a2a/skills/smartRouting.ts`)
  - a ponte de visão quando descreve uma imagem através de OmniRoute (`src/lib/guardrails/visionBridgeHelpers.ts`)
- O proxy de chat Telegram (`src/lib/telegram/chatProxy.ts`) cria sua solicitação em processo e chama o manipulador de chat diretamente.
- Essas solicitações internas carregam os próprios cabeçalhos de OmniRoute, não os cabeçalhos do cliente que as iniciou. O guarda os classifica como clientes não identificados.
- Sem `AGENT_GUARD_STRICT`, essas solicitações internas são atendidas nos provedores protegidos, seja qual for o cliente original. Um agente terceirizado que chegue Claude por meio deles não será recusado.
- Com `AGENT_GUARD_STRICT`, essas solicitações internas são recusadas nos provedores protegidos que as iniciaram, incluindo o código Claude.
- Somente as solicitações que passam pelo manipulador de chat são bloqueadas. A validação do modelo (`src/lib/modelValidation/runner.ts`) chama o núcleo da solicitação diretamente e não é bloqueada.
- Apenas os provedores `claude` e `anthropic` são cobertos. Os modelos Claude atendidos por outro provedor não são cobertos, nem o provedor `claude-web`.
- Alguns combos nomeiam seus destinos restantes sem um prefixo de provedor, como IDs de modelo simples ou combos aninhados. Quando esses alvos estão indisponíveis por um motivo não relacionado (disjuntor aberto, resfriamento, bloqueio), a solicitação falha com o erro de política.
- Um alvo de combo ignorado limpa o último pino válido desse alvo, como qualquer alvo ignorado faz.
- Um juiz de fusão nomeado com um prefixo de provedor protegido é recusado antes da execução do painel. Isso abrange `anthropic/…`, `claude/…`, um alias como `cc/…`, um sufixo de contexto como `[1m]` e nomes de cota compartilhada nesses provedores.
- Um juiz de fusão escrito como um ID de modelo simples, ou como um alias de modelo que resolve para um provedor protegido, é recusado somente quando é despachado. O painel já foi executado até então. Nomear o juiz com seu prefixo de provedor evita isso. Nenhuma ortografia do juiz chega a um provedor protegido sem ser recusada.
- A pré-verificação recusa um juiz Claude configurado mesmo quando o serviço de fusão descarta esse juiz em tempo de execução. O serviço dispensa um juiz que a operadora escondeu e um juiz que não pode atender a mídia da solicitação. O segundo caso abrange suporte visual não confirmado e outros meios de comunicação que o juiz não aceita. Ambos os caminhos combinados se comportam dessa maneira.
- No redirecionamento da rede de segurança, o serviço combinado recebe configurações vazias. Um juiz definido apenas nos padrões do combo global nunca é usado lá.
- Enquanto `block` estiver ativado, um cliente que o guarda recusaria em um provedor protegido não usa o atalho sidecar, para nenhum modelo. Em `AGENT_GUARD_STRICT` estão todos os clientes não identificados. Após a verificação do token de retransmissão, `POST /v1/relay/chat/completions/bifrost` responde a essas solicitações com um 503 e o cabeçalho `X-Bifrost-Fallback`.
- `POST /v1/messages/count_tokens` fornece a estimativa local para um cliente que o guarda recusaria no provedor para o qual o modelo resolve.
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

- `register(guardrail)` — adiciona (ou substitui pelo nome normalizado) um guardrail e reclassifica em ordem crescente `priority`.
- Ajudantes administrativos `clear()` / `list()` —.
- `runPreCallHooks(payload, context)` — itera guardrails ativos, encadeia a carga útil por meio `modifiedPayload` e para no primeiro `block: true`.
- `runPostCallHooks(response, context)` — mesmo fluxo no lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e, opcionalmente, registra novamente os padrões para isolamento de teste limpo.

Ambos os executores retornam `{ blocked, payload|response, results, guardrail?, message? }` onde `results` é uma matriz de registros `GuardrailExecutionResult` que inclui campos `blocked`, `skipped`, `modified`, `error` e `meta` por guardrail, úteis para rastreamento.

### Desativando Guardrails por solicitação

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma lista desduplicada de nomes de guardrail que devem ser ignorados na solicitação atual. Existem cinco canais, lidos nesta ordem e mesclados em uma lista (a primeira ocorrência vence na desduplicação):

1. `apiKeyInfo.disabledGuardrails`
2. Corpo da solicitação `disabledGuardrails` (nível superior)
3. Solicitar corpo `metadata.disabledGuardrails` (somente quando `metadata` for um objeto)
4. Cabeçalho `x-omniroute-disabled-guardrails`
5. Cabeçalho legado `x-disabled-guardrails`

Todos os cinco canais são mesclados, os dois cabeçalhos incluídos: o envio `x-omniroute-disabled-guardrails` e `x-disabled-guardrails` ignora a união de suas listas, e um cabeçalho moderno vazio não oculta mais o legado ( [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412), corrigido em [#16805](https://github.com/cheaper-inference/OmniRoute/pull/16805) ).

Os valores podem ser matrizes de strings ou uma string separada por vírgula; os nomes são cortados e normalizados para letras minúsculas kebab-case (`pii_masker` → `pii-masker`) e as entradas vazias são eliminadas. O resultado é passado por `context.disabledGuardrails` para o registro, que ignora as proteções correspondentes (`skipped: true` em `results`).

A lista de desativação afeta apenas o** registro** . O modo `block` de injeção de prompt é um limite obrigatório: o middleware de proteção de injeção (`src/middleware/promptInjectionGuard.ts`) chama `evaluatePromptInjection()` sem nenhuma lista de desabilitação controlada pelo chamador (a chamada `resolveDisabledGuardrails({ body })` morta que ele costumava fazer foi removida em [#16934](https://github.com/cheaper-inference/OmniRoute/pull/16934) ), portanto, uma solicitação que desativa `prompt-injection` ainda é rejeitada no modo `block`. Isso ocorre intencionalmente. Os canais desabilitados são controlados pelo chamador (corpo da solicitação, metadados, cabeçalhos) e um chamador não deve ser capaz de desligar um controle de segurança definido pelo operador ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). A união de cabeçalho do [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412) altera apenas quais proteções de registro são ignoradas; não permite que um cliente ignore o middleware. As políticas de proteção obrigatórias por chave e por grupo são rastreadas na v4 RFC [#16417](https://github.com/cheaper-inference/OmniRoute/issues/16417). Consulte [Cobertura e limites](#coverage-and-limits).

## Ordem de execução

Para cada solicitação que passa por `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts` (as rotas da família de chat listadas em
[Escopo e limites](#escopo-e-limites)):

1. `resolveDisabledGuardrails(...)` cria a lista de itens a ignorar a partir da chave da API, do corpo e dos cabeçalhos.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` executa os guardrails em ordem crescente de prioridade:
   - Os guardrails desabilitados são registrados como `skipped`.
   - O `preCall` de cada guardrail pode reescrever o payload por meio de `modifiedPayload`.
   - O primeiro `block: true` interrompe a cadeia, e o handler retorna uma resposta de rejeição do guardrail.
3. O payload (potencialmente reescrito) segue para o roteamento de combinações e o envio upstream.
4. **Somente sem streaming:** depois que a resposta é montada,
   `guardrailRegistry.runPostCallHooks(...)` executa a mesma cadeia na resposta. `block: true` aqui descarta a resposta upstream e retorna HTTP 400. Respostas transmitidas por streaming ignoram esta etapa completamente.
5. **Somente no vault reversível:** quando a solicitação cunhou tokens, `handleChat`
   os restaura na resposta 2xx que retorna, depois dos hooks pós-chamada e da transformação de PII do streaming, para que `PII_RESPONSE_SANITIZATION` veja os tokens e a PII gerada pelo modelo, nunca uma original restaurada.

Guardrails que geram uma exceção são registrados com `error: <message>` e registrados por meio de `logger.warn`, mas a cadeia continua — comportamento fail-open por definição.

## Cobertura e limites

O registro guardrail está conectado apenas ao pipeline de chat. Esses limites são fixados por `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` e `tests/unit/guardrail-pipeline-characterization.test.ts`; atualize esses testes deliberadamente quando o comportamento mudar.

### Onde os ganchos correm

| Gancho / controle                              | Continua                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                              | Solicitações tratadas por `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (e `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` e o proxy de chat Telegram. Além disso, o endpoint de teste do painel `/api/guardrails/test`. Um bloco de pré-chamada retorna HTTP 400. |
| `runPostCallHooks`                             | **Sem streaming** apenas respostas de bate-papo (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). As respostas transmitidas nunca chegam até ele.                                                                                                                                                                                                                                                                                         |
| Streaming PII                                  | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), canalizado em `streamingPipeline.ts` quando `PII_RESPONSE_SANITIZATION` está ativado. Não é um guardrail, então os canais desativados não o afetam.                                                                                                                                                                                                                               |
| Cofre reversível PII                           | Solicitações tratadas apenas pelo `handleChat`, quando `PII_REDACTION_ENABLED` e `PII_REVERSIBLE_VAULT_ENABLED` estão ativados. Os tokens são emitidos pela pré-chamada `pii-masker` e restaurados na saída `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Desativar `pii-masker` para uma solicitação significa que nada será cunhado.                                                                                                |
| Middleware de proteção contra injeção (legado) | Cada rota `/v1` imediata, família de bate-papo incluída (consulte [a cobertura da rota](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Apenas injeção imediata.                                                                                                                                                                                                                                                                 |

### O que não está coberto

- **Mídia, incorporações e rotas de dados** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) nunca alcança o registro. Nenhum mascaramento PII, mascaramento de credencial ou ponte de modalidade é executado lá. Sua única verificação é o middleware herdado de proteção contra injeção.
- **Respostas transmitidas** não obtenha proteções pós-chamada: sem pós-chamada `pii-masker` ou `credential-masker` e sem bloqueio pós-chamada. Somente a transformação PII de streaming se aplica (quando `PII_RESPONSE_SANITIZATION` está ativado). Uma credencial ecoada em uma resposta transmitida não é editada.
- **Desative canais versus middleware (por design):** o middleware avalia a injeção imediata com sua própria chamada para `evaluatePromptInjection()`, sem passar nenhuma lista de desabilitação controlada pelo chamador. O modo `block` é um limite obrigatório que as desativações controladas pelo chamador não podem ignorar, inclusive em rotas de família de bate-papo ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). Desativar `prompt-injection` apenas ignora a proteção do registro.

### O que vê uma resposta antes da pós-chamada

No caminho sem streaming, a ordem é: extração de memória → execução da ferramenta integrada → guarda-corpos pós-chamada → saída do bloco pós-chamada → armazenamento de cache semântico.

- **Extração de memória** e** execução de ferramenta** veja a resposta antes que as proteções pós-chamada possam reescrevê-la ou bloqueá-la. Desde [#16401](https://github.com/cheaper-inference/OmniRoute/pull/16401), a extração de memória executa o texto extraído por meio `sanitizePII` quando `PII_RESPONSE_SANITIZATION` está ativado (streaming e não streaming), mas uma resposta que blocos posteriores pós-chamada ainda foi oferecida à memória e às ferramentas.
- **O cache semântico** armazena a resposta após a pós-chamada, portanto armazena a resposta reescrita e uma resposta bloqueada nunca é armazenada em cache. As entradas de cache são codificadas por chave API.

## Configuração

Variáveis de ambiente lidas pelas proteções integradas:

| Variável                              | Usado por                  | Efeito                                                                                                                             |
| ------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Configure `false` para desabilitar totalmente a detecção.                                                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Política de injeção: `warn`, `block` ou `log`. O valor herdado `redact` não reescreve o texto de injeção.                          |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modo para proteção de injeção; também um sinalizador de recurso DB que** substituições** os env vars (DB > ENV).                   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Gravidade mínima que `MODE=block` rejeita: `high` (padrão), `medium` ou `low`.                                                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias legado para `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Quando `true`, a solicitação PII é editada (independentemente do modo de injeção).                                                 |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Com `PII_REDACTION_ENABLED`, crie tokens reversíveis e restaure-os em respostas 2xx.                                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (a jusante)   | Controla o comportamento do mascarador do lado da resposta.                                                                        |
| `AGENT_GUARD_MODE`                    | `agent-guard`              | `off` (padrão), `monitor` ou `block`. Também um sinalizador de recurso DB (DB > ENV).                                              |
| `AGENT_GUARD_STRICT`                  | `agent-guard`              | `false` (padrão) ou `true`. Com `block`, também recusa clientes não identificados. Também um sinalizador de recurso DB (DB > ENV). |

Os guardrails do Modality Bridge leem a configuração do tempo de execução do armazenamento de configurações apoiado pelo banco de dados (`getSettings()`), não env vars. As chaves primárias do Vision são `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`. As chaves `visionBridge*` herdadas são aceitas apenas como substituto de leitura de um ciclo documentado; as gravações do painel usam as chaves primárias. Os padrões e o resolvedor substituto residem em `src/shared/constants/modalityBridgeDefaults.ts`, com constantes herdadas retidas em `src/shared/constants/visionBridgeDefaults.ts`.

O áudio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, além das configurações `modalityBridgeCache*` compartilhadas. O áudio não tem substituto de chave legada porque essas chaves foram introduzidas com o esquema Modality Bridge.

O vídeo usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` e `modalityBridgeVideoTimeout`, além das configurações `modalityBridgeCache*` compartilhadas. Ele está desabilitado por padrão porque FFmpeg/ffprobe são dependências operacionais opcionais e a legenda de quadros adiciona latência e custo de modelo.

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

## Cobertura da rota da guarda de injeção e equipe vermelha (Fase 8 · Bloco D)

O protetor de injeção (`createInjectionGuard` / `withInjectionGuard`) cobre todas as rotas que aceitam solicitações do usuário. Ele respeita `INJECTION_GUARD_MODE` (apenas `warn` = log padrão; `block` = retorna HTTP 400 `SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo padrão |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | avisar      |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | avisar      |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | avisar      |

A extração de texto (`extractMessageContents`) abrange `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system`.

**Equipe vermelha (noturno, `nightly-llm-security.yml`):** promptfoo valida que cada rota bloqueia o corpus OWASP-LLM em `INJECTION_GUARD_MODE=block`; garak executa testes (pula sem segredo). `moderations` está incluído para consistência. O modo de bloco é um limite obrigatório: `evaluatePromptInjection()` ignora a lista de desativação por solicitação que o middleware passa, então `disabledGuardrails` o faz** não** isentar uma rota dele ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ).

O fluxo de trabalho noturno (`.github/workflows/nightly-llm-security.yml`, cron + envio manual) tem dois trabalhos:

- **`promptfoo-guard` (bloqueio)** — executa `promptfoo eval -c promptfooconfig.yaml` com `INJECTION_GUARD_MODE=block`. Cada caso adversário (por exemplo, "ignorar todas as instruções anteriores…", jailbreaks estilo DAN) afirma que a resposta carrega `error.code === "SECURITY_001"`, ou seja, o guarda realmente rejeitou a solicitação.
- **`garak` (consultivo)** — executa garak `--probes promptinject,dan,leakreplay` em uma instância local OmniRoute (`http://localhost:20128/v1`). Fechado em um segredo de provedor (`PROMPTFOO_PROVIDER_KEY`); pula normalmente e tem o sufixo `|| true`, portanto, relata sem falhar CI.

A cobertura do auxiliar de guarda (`createInjectionGuard` / `withInjectionGuard`) abrange todas as rotas `/v1` que suportam prompt; o texto do prompt é extraído de `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system` por `extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
