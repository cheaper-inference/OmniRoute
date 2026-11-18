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

## Guardrails integrados

O registro carrega automaticamente seis guardrails na ordem de prioridade durante a importação
(consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Estágio(s)     | Arquivo               |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Números de prioridade menores são executados **primeiro**.

### Vision Bridge (`visionBridge.ts`) — PR-1 da ponte de modalidade

O modelo base GLM 5.3 e `glm-5.3-{low,high,max}` têm metadados explícitos
`supportsVision:false` no registro/especificação. As variantes GLM 5.3 Flash
continuam sendo modelos nativos de visão. A rota `/v1/messages` do Claude Code entra na cadeia compartilhada de guardrails de pré-chamada `handleChat` **antes** da tradução de Claude para OpenAI; as imagens aninhadas nos resultados da ferramenta `Read` devem ser descritas ou tratadas antes que essa tradução as converta em conteúdo OpenAI `image_url` (#17069).

Intercepta solicitações que contêm imagens e são destinadas a **modelos sem visão** e redireciona toda a solicitação para um modelo compatível com visão ou substitui as partes de imagem por descrições de texto produzidas por um modelo de visão configurável antes da chamada upstream. Isso permite que provedores somente de texto lidem de forma transparente com payloads multimodais.

Fluxo:

1. Ignora se o modelo de destino já oferece suporte a visão (a menos que apareça na lista de pontes forçadas `isVisionBridgeForcedModel`).
2. Extrai as partes de imagem por meio de `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega ao **detector de mídia unificado** `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a única fonte de verdade compartilhada com o filtro de compatibilidade combo.
   A extração é permitida apenas para as estruturas que `replaceImageParts` pode inserir de volta (o contrato extração↔substituição): `image_url` da OpenAI, `source.type:"base64"` da Anthropic, URL da Anthropic `source.type:"url"` e `input_image` da Responses API. Imagens correspondentes aninhadas em `tool_result.content` do Claude Code e nas saídas de ferramentas da Responses API também são extraídas e substituídas em seus caminhos originais; estruturas que servem apenas como indicadores são material do filtro combo e não são extraídas.
   Ignora se nenhuma for encontrada.
3. Resolve a configuração de runtime por meio de `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de configuração `modalityBridge*` têm precedência; as chaves legadas `visionBridge*` continuam sendo um **fallback de um ciclo** (janela de reversão). Ignora antes de percorrer qualquer mídia quando a ponte está desabilitada.
4. O seletor de modo (`modalityBridgeVisionMode`, consulte a tabela abaixo) decide entre redirecionar e descrever. O redirecionamento retorna `modifiedPayload` com apenas `model`
   substituído, além dos metadados `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limita as imagens a `maxImages`, compõe o prompt com reconhecimento da tarefa, consulta o cache de descrições, chama o modelo de visão **em paralelo**
   (`Promise.allSettled`) e insere partes de texto `[Image N]: <description>` no lugar delas. Uma descrição com falha produz `null`: a imagem bruta é preservada para destinos desconhecidos ou compatíveis com visão (#4012), mas um **destino direto confirmado como somente de texto** ou um combo sem visão recebe um stub de texto explícito
   `(unavailable — no vision-capable provider connected)` para cada imagem não descrita, incluindo falhas parciais e imagens além do limite de chamadas de descrição (#17069). O fallback de descrição existente para combos em que todas as descrições falham continua disponível (#8430).
6. Retorna `modifiedPayload` + metadados (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Padrão | Comportamento                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Heurística legada, inalterada (#6640/#7204): modelos que não são combo ou `auto/` são redirecionados para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (nesse caso, descreve); destinos combo sempre descrevem.                                                                                        |
| `describe` |        | Sempre descreve — o bloco de redirecionamento é totalmente ignorado; o modelo escolhido pelo usuário sempre responde.                                                                                                                                                                                                                              |
| `reroute`  |        | Força o redirecionamento: a verificação de preservação do modelo com credenciais é ignorada. A verificação de credenciais do **destino** do redirecionamento ainda se aplica — quando não existe um destino de visão utilizável, a ponte bloqueia com um erro claro em vez de descrever ou enviar imagens brutas para um destino somente de texto. |

Os modos forçados interrompem o processamento antes da execução da heurística automática; o comportamento de `auto` é idêntico byte a byte ao do guardrail anterior ao PR-1.

#### Escopo da chave de API (`visionBridgeKeyScope.ts`)

Quando a chave de API do chamador restringe `allowedConnections`, pools de cota
(`allowedQuotas`) ou modelos (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a ponte seleciona
apenas modelos de redirecionamento e descrição que a chave pode usar, em conexões
que a chave pode usar. A chamada de descrição sempre passa pelo self-loop do
OmniRoute com o cabeçalho `x-omniroute-self-loop-key-id`, de modo que a solicitação
de chat receptora aplique novamente a política de conexão e modelo dessa chave.
`enforceApiKeyPolicy()` considera esse cabeçalho somente em conjunto com o bearer
do self-loop, portanto ele só pode restringir o acesso, e um ID que não possa ser
resolvido é rejeitado.

Se nenhum modelo de visão for permitido para a chave, um **destino confirmado
como somente texto** rejeita localmente a solicitação de imagem com um HTTP 400
claro, em vez de encaminhar os bytes da imagem para um upstream incompatível
(#17069). Para destinos com capacidade de visão desconhecida ou nativa, o caminho
de descrição mantém seu comportamento fail-open anterior (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Solicitações sem uma
chave e chaves sem essas restrições comportam-se exatamente como antes.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

O padrão é **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) acrescenta
o texto da **última mensagem do usuário** (truncado em 500 caracteres) ao prompt
base de descrição, direcionando a descrição para o que o usuário realmente
perguntou (padrão codex-vision-proxy) e solicitando que o modelo de visão
transcreva o texto visível. Com o sinalizador desativado — ou sem texto do
usuário —, o prompt base é usado sem alterações.

A própria solicitação compatível com OpenAI do self-loop de descrição
(`callVisionModelSingle()` em `visionBridgeHelpers.ts`) sempre solicita
`image_url.detail: "high"` — incondicionalmente, para cada chamador/provedor, sem
depender de qualquer sinal do cliente. A amostragem com baixo nível de detalhes
reduz a precisão do OCR justamente para a tarefa de transcrição de texto
solicitada por esse prompt; portanto, a própria chamada de descrição sempre
solicita alto nível de detalhes, independentemente do nível de detalhes usado
pela solicitação de entrada original. Isso afeta apenas o corpo da solicitação
interna de descrição; não altera a forma como o OmniRoute encaminha o
`image_url.detail` do próprio chamador na solicitação principal — esse padrão é
aplicado separadamente, e somente para clientes OpenCode detectados, em
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). A
ramificação no formato de protocolo Anthropic do self-loop de descrição não tem
um campo `detail` e não é afetada por nenhum dos padrões.

#### Limite da saída de descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Padrão | Intervalo        |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100–50000 |

`0` (padrão) significa **sem limite** — a descrição retornada por
`callVisionModel()` é repassada sem modificações, preservando o comportamento
existente. Qualquer valor no intervalo de 100–50000 trunca a descrição com um
sufixo `…` antes que ela seja reinserida como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`).
Aumente esse valor para tarefas de OCR com muitos detalhes, nas quais o modelo
downstream precisa da transcrição completa; reduza-o para limitar o uso de tokens
por modelos de visão verbosos. O campo do dashboard fica no painel Avançado da
aba Visão (`modality-bridge-max-chars` em `ModalityBridgeVisionTab.tsx`) e ajusta
qualquer valor entre 1 e 99 para o limite mínimo de 100, enquanto mantém um `0`
explícito intacto — `0` é um valor Zod válido por si só
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), e não apenas
o padrão de “não definido”.

#### Cache de descrições (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para saídas de descrição, compartilhado em todo o
processo. Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` com
enquadramento por prefixo de comprimento (sem colisões nos limites dos campos).
O componente de modelo é o modelo de ponte **configurado**, não o modelo que
realmente respondeu — `callVisionModel` pode recorrer internamente a um fallback,
e usar uma chave por tentativa fragmentaria o cache. Descrições que falharam
nunca são armazenadas em cache. Configurações:

| Chave                           | Padrão | Intervalo |
| ------------------------------- | ------ | --------- |
| `modalityBridgeCacheEnabled`    | `true` | —         |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000   |

#### Normalização de imagens remotas (descrição por self-loop/busca em base64)

Quando a ponte busca por conta própria uma imagem **remota** — a autochamada de
descrição do Anthropic e a conversão para base64 no formato de protocolo do
Claude (`ensureBase64ImagesForClaudeWire`), ambas por meio de
`fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` —, o URI de dados
resultante é processado por `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de ser incorporado à solicitação do
modelo de visão. Imagens grandes demais são reduzidas para uma **borda mais longa
de 2048 px** (correspondendo ao limite de redimensionamento que OpenAI/Anthropic
já aplicam no servidor), o que reduz os bytes de upload e a latência sem alterar
o que o modelo de visão vê. O redimensionamento usa `sharp`, carregado por meio
de importação dinâmica: em uma plataforma na qual o binário nativo não consiga
ser carregado, `normalizeDataUri()` **nunca lança uma exceção** — ele recorre ao
repasse dos bytes originais, para que o caminho de descrição/conversão para
base64 continue sempre funcionando. Bytes que não representam uma imagem (uma
busca que não retornou uma imagem decodificável) também são repassados sem
alterações. Essa normalização é limitada às imagens que a ponte busca para sua
própria autochamada — ela nunca é aplicada ao payload bruto de repasse do
chamador, em conformidade com o princípio de mutação somente mediante adesão
(Regra Rígida #20).

#### Esquema de configurações + migração

As novas chaves `modalityBridge*` são validadas pelo Zod em `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o grupo
`modalityBridgeAudio*` usado pelo Audio Bridge. A migração
`141_modality_bridge_settings.sql` copia os valores legados existentes de
`visionBridge*` para as novas chaves correspondentes (idempotente, nunca
substitui um valor de `modalityBridge*` definido pelo operador); as chaves
legadas continuam aceitas como fallback de leitura durante um ciclo de
lançamento.

#### Cabeçalho de transparência + estatísticas

As respostas descritas carregam
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(gerado por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`,
adicionado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`).
As solicitações redirecionadas não recebem cabeçalho — o payload não foi
alterado, e a troca de modelo já está visível no campo `model` do corpo da
resposta.

`GET /api/modality-bridge/stats` (autenticação de gerenciamento, no mesmo nível
de `GET /api/settings`) retorna os contadores em memória por modalidade
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e
`video`. `averageLatencyMs` usa `latencySamples`, e não todas as tentativas,
como denominador; uma operação sem medição de tempo não fabrica uma amostra de
zero milissegundos. `bridged` continua sendo o alias compatível com versões
anteriores para conversões bem-sucedidas; tentativas com falha não o
incrementam.
Os contadores são redefinidos na reinicialização do processo por definição
(telemetria, não contabilização).

#### Configuração do dashboard

A página dedicada do dashboard é
`/dashboard/settings/modality-bridge`. Suas abas `Vision`, `Audio` e `Video`,
endereçáveis por URL, preservam os parâmetros de consulta ao alternar o valor
de `tab`. A aba Vision expõe ativação, modo, seleção de modelo (incluindo o
padrão automático), prompts sensíveis à tarefa, limites avançados de tempo
limite/imagens/comprimento da descrição/cache, contadores de execução e uma
solicitação de amostra protegida. A aba Audio também está ativa: ela expõe
ativação, um seletor de modelos somente para STT com Auto, limites de tempo
limite/duração máxima do clipe, contadores de áudio e um teste de amostra
`input_audio`. A aba Video é funcional: ela informa o estado de execução do
FFmpeg/ffprobe — um dos quatro estados explícitos da UI (`unknown` enquanto a
sondagem está em andamento ou não pôde ser concluída, `restricted` em um host
de dashboard que não seja de loopback, onde a sondagem é ignorada no cliente,
`unavailable` quando a sondagem é concluída e confirma a ausência, ou
`available` com as versões do FFmpeg/ffprobe) — persiste limites de
habilitação/modelo/quadros/vídeo/tempo limite, filtra o seletor de modelos para
modelos compatíveis com visão e expõe contadores de vídeo.

O antigo cartão Vision Bridge nas configurações de IA é um link de
compatibilidade para a nova página; ele não mantém mais uma segunda cópia do
formulário. Media Providers também vincula os fluxos de trabalho Image-to-Text
e Speech-to-Text às abas correspondentes do Modality Bridge, sem remover o
playground existente de Speech-to-Text.

**Desvio da admissão do self-loop:** quando a chamada de descrição passa pelo
self-loop `/v1` do OmniRoute (modelo de provedor não padrão), a subsolicitação
envia `x-omniroute-admission-bypass: internal` e é autenticada com a credencial
resolvida do self-loop — o sentinela local `sk_omniroute` no modo local, ou a
chave de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada pelo
operador (#1350), para que as implantações com `REQUIRE_API_KEY=true` ainda
possam executar a chamada de descrição. O desvio só é respeitado para essas
credenciais exatas, portanto clientes externos não podem usar o cabeçalho para
ignorar a admissão.

Os padrões legados ficam em `src/shared/constants/visionBridgeDefaults.ts`; os
novos padrões de modo, sensibilidade à tarefa e cache, além do resolvedor de
configurações, ficam em `src/shared/constants/modalityBridgeDefaults.ts`. O
guardrail expõe uma opção de construtor `deps` para que os testes possam
injetar implementações fictícias de `getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta solicitações de chat que contêm áudio antes que elas cheguem a um
destino que não seja conhecido por aceitar entrada de áudio. Ele nunca
redireciona a solicitação de chat: as partes de áudio são transcritas por meio
do endpoint multipart compatível com OpenAI existente, e o modelo de chat
escolhido continua usando as transcrições de texto.

Fluxo:

1. Resolva `supportsAudio` por meio de `getResolvedModelCapabilities()`. Os metadados explícitos do registro de provedores têm prioridade, seguidos pelos metadados estáticos do modelo e, por fim, por `modalities_input` sincronizado. Uma lista de entradas declarada sem `audio` resulta em `false`; quando não há evidências de capacidade, o resultado é `null`. Tanto `false` quanto `null` ativam a ponte conservadora, enquanto `true` a ignora.
2. Resolva as configurações `modalityBridgeAudio*` e extraia as partes de áudio de nível superior que podem ser substituídas de cada mensagem por meio do detector compartilhado `detectMediaParts()`. As formas de transmissão compatíveis são `input_audio` e `audio_url` da OpenAI, além de `source.media_type: "audio/*"`. Áudio aninhado é detectado para roteamento, mas não é removido pelo caminho de substituição. O trabalho é limitado por `modalityBridgeAudioMaxClips`; as partes posteriores permanecem inalteradas.
3. Respeite um `provider/model` configurado ou permita que `selectAudioBridgeModel()` percorra `AUDIO_TRANSCRIPTION_PROVIDERS` na ordem estável do catálogo e selecione o primeiro modelo com uma credencial ativa utilizável do provedor.
4. `callAudioTranscription()` converte áudio em base64/URI de dados em um `file` multipart ou baixa um `audio_url` remoto por meio da proteção de saída somente pública, com fixação de DNS e limite de 25 MB. Em seguida, faz POST do arquivo e do modelo selecionado para o self-loop local `/v1/audio/transcriptions`, autenticado com `resolveSelfLoopBearer()`. A rota de transcrição existente executa a busca normal de credenciais, o tratamento de cooldown/limite de taxa e o encaminhamento ao provedor.
5. Chamadas bem-sucedidas substituem suas partes por `[Audio N]: <transcript>`. As chamadas são executadas com `Promise.allSettled`: uma falha individual preserva a parte de áudio original (contrato #4012). Se todas as chamadas falharem e for comprovado que o destino tem `supportsAudio === false`, as partes se tornam
   `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para um destino desconhecido (`null`), um resultado em que todas as chamadas falharam permanece inalterado. Um destino comprovadamente somente de texto sem uma credencial STT utilizável recebe o mesmo stub explícito sem realizar uma chamada de rede.

As transcrições bem-sucedidas usam o cache LRU/TTL do Modality Bridge, compartilhado por todo o processo. A chave combina a referência de áudio, o rótulo estável da operação `audio-transcription` e o modelo STT selecionado; falhas nunca são armazenadas em cache. As tentativas de áudio atualizam os contadores compartilhados `bridged`, `cacheHits`, `failures` e `lastUsedAt`. As respostas transformadas incluem
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; solicitações inalteradas não recebem um segmento do Audio Bridge.

As configurações de runtime são armazenadas no banco de dados e validadas com Zod:

| Chave                         | Padrão  | Intervalo      |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto ou ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

O cache compartilhado continua sendo controlado por
`modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em `messages` da API Chat Completions e em `input` da API Responses antes que um destino sem suporte nativo de vídeo conhecido seja chamado. As formas compatíveis são `input_video`, `video_url`, `video_source`, URLs HTTPS e URIs de dados `data:video/*;base64,...`. Nomes de arquivo simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) é responsável pela travessia da solicitação, pela verificação de capacidade/política, pela agregação por solicitação e pelo payload de resposta.
O trabalho por vídeo — aquisição, cache do resultado completo, descrição de uma sequência de quadros (que combina qualquer transcrição de áudio declarada pelo chamador) e métricas, cancelamento e limpeza por tentativa — fica oculto atrás de `processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez para cada parte de vídeo dentro do loop de `preCall`.
Esse módulo também define os limites explícitos das portas `VideoMediaBrokerPort` (aquisição de bytes e extração de quadros amostrados), `VideoAudioTranscriptionPort` (combinação de uma transcrição de áudio declarada pelo chamador com as legendas amostradas) e `VideoDrilldownPort` (a forma legada do armazenamento bruto). O STT de produção e a retenção de quadros são compostos em torno da porta de descrição por meio de `createVideoSttAdapter` e `createVideoDrilldownAdapter`; este último usa o ciclo de vida compartilhado de identificadores opacos.

O caminho público de solicitação `/v1` nunca importa nem invoca um subprocesso. Vídeos remotos são baixados sob um limite de 50 MiB; vídeos base64 embutidos têm um limite conservador de 36 MiB decodificados por vídeo, para que o envelope de modelo/mensagens/estrutura permaneça dentro do limite público de admissão de solicitações JSON de 50 MiB. As estimativas de comprimento embutido e tamanho decodificado são verificadas antes da alocação. HTTPS é obrigatório na URL remota inicial e em todos os redirecionamentos, usando a proteção de saída somente pública existente com fixação de DNS. Os bytes então atravessam o limite exato do broker interno `POST /api/modality-bridge/video/extract`. Essa rota é tanto `LOCAL_ONLY` quanto `SPAWN_CAPABLE`, aceita somente uma solicitação autenticada por processo e proveniente de loopback confiável, e nunca aceita uma URL, caminho de sistema de arquivos, executável ou lista de argumentos. O pipeline de tamanho do corpo da API e o leitor incremental de corpo do handler impõem, de forma independente, um limite de entrada de 50 MiB no broker. Sua fila limitada executa uma extração por vez, permite quatro jobs pendentes e limita a entrada pendente a 100 MiB.

Dentro do broker, `ffprobe` lê um arquivo local privado; a lista de permissões de formatos fixa exclui formatos de playlist e manifesto. Para contêineres da família MOV permitidos, as referências externas de dados MOV continuam desabilitadas por padrão, e o comando fixo não as habilita. Tanto `ffprobe` quanto `ffmpeg` usam a lista de permissões de protocolos somente com `file`, uma thread, arrays de argumentos fixos, sem shell, e executáveis resolvidos a partir de `PATH`. Fluxos de imagem de capa anexada não são candidatos reproduzíveis. Todos os fluxos reproduzíveis devem obedecer aos limites, e um fluxo padrão explícito tem preferência antes do fallback determinístico para o menor índice. Os vídeos são limitados a 600 segundos, 8.192 pixels por dimensão e 33.554.432 pixels de origem. O FFmpeg amostra de 1 a 16 quadros JPEG nos pontos médios, reduzindo a escala da maior dimensão para no máximo 1.024 pixels sem ampliar entradas menores, e nunca recebe uma URL. A amostragem é `uniform` por padrão. As políticas opcionais `scene_aware` e experimental `segment_aware` executam uma passagem adicional fixa do FFmpeg sobre o fluxo local já validado, selecionam marcas de tempo de cena limitadas de `showinfo` e retornam deterministicamente aos mesmos pontos médios uniformes em caso de falha do detector, tempo limite, saída malformada ou conjunto de candidatos vazio. O modo segment-aware aloca amostras nos pontos médios proporcionalmente aos intervalos de cena validados; as evidências e o comportamento de fallback do modo segment-aware são detalhados abaixo. O limite rígido de 16 quadros é aplicado após a seleção em todas as políticas. Quando uma solicitação scene-aware tem um orçamento de apenas um quadro, ela usa o ponto médio uniforme da janela ativa do vídeo completo ou de foco e informa `policyEffective: uniform`: um único quadro de cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode fornecer opcionalmente uma janela de foco finita (`start`/`end` em segundos); os limites são ajustados à duração da mídia, janelas invertidas ou não finitas são rejeitadas, e todas as políticas de amostragem são executadas somente dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não confiável, para que os modelos downstream possam distinguir um trecho focado da linha do tempo completa.

O foco semântico da legenda é uma configuração separada e explícita. O modo de análise padrão `full` preserva o prompt de quadros existente e nunca encaminha o texto da solicitação ao modelo de legendas. No modo `focused`, a ponte lê apenas o `text`/`input_text` mais recente, não vazio e escrito pelo usuário, do mesmo contêiner de Chat ou Responses, normaliza-o para NFC, compacta caracteres de controle e espaços em branco e o limita a 500 pontos de código Unicode. Um resultado vazio recorre ao prompt `full` exato. Uma indicação utilizável é serializada como JSON em um bloco dedicado de contexto do usuário não confiável e só pode priorizar detalhes observáveis; ela não pode substituir o aviso separado contra seguir instruções visíveis ou audíveis na mídia. O foco textual nunca infere `start`/`end` nem altera o amostrador temporal.

#### Evidências estruturais de segmentos FU-07

`segment_aware` usa uma passagem de pré-análise limitada sobre o fluxo de vídeo local já validado. A cadeia de filtros fixa primeiro reduz a escala para no máximo 320 pixels de largura, detecta mudanças de cena e intervalos congelados e, em seguida, amostra a 1 quadro por segundo para obter desfoque, luma média e informações espaciais/temporais. A passagem é limitada a 600 amostras estruturais, uma thread de filtro/FFmpeg, as mesmas listas de permissões de protocolos e contêineres somente com `file`, um limite de 1 MiB para a saída do processo e no máximo 30 segundos dentro do cancelamento/tempo limite compartilhado do broker. Ela nunca aceita um comando, filtro, caminho ou URL da solicitação.

Os valores estruturais são evidências determinísticas de amostragem, não compreensão semântica de vídeo. Eles não inferem sujeitos, ações, legendas, fala ou intenção do usuário. Os limites de cena e congelamento formam segmentos; a cobertura de congelamento, o desfoque, a exposição, os detalhes espaciais e a mudança temporal influenciam apenas como o orçamento existente de 1 a 16 quadros é alocado. Um segmento totalmente congelado é limitado a um quadro, enquanto os segmentos não congelados competem pelo orçamento restante. Quando os limites excedem o número de quadros, a cobertura uniforme da linha do tempo é mantida para que cortes rápidos no início não possam ocultar um segmento longo no final. Limites de cena dentro da resolução de análise de 1 segundo de um limite de congelamento são coalescidos.

Filtros ausentes, evidências malformadas ou vazias, um erro do detector ou o tempo limite limitado da pré-análise falham de forma aberta para a política exata de pontos médios uniformes. Um cancelamento do chamador ou o prazo do broker não falha de forma aberta: ele encerra o subprocesso em andamento, impede a extração posterior de quadros e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera fixtures determinísticas reais do FFmpeg para a economia de chamadas de legenda após a deduplicação, a alocação de orçamento para movimento denso, evidências de desfoque/exposição/SI-TI, cortes rápidos com uma cauda longa e falsos positivos de desvanecimento gradual. Ele registra o tempo de parede da pré-análise e, quando `/usr/bin/time` está disponível, o uso de CPU do processo filho e o RSS máximo. Suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legendas permanece `HOLD` porque este harness não tem um endpoint autorizado nem um avaliador congelado. A economia monetária também permanece `HOLD`, a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita por chamada; o script nunca fabrica nenhum dos dois resultados.

Cada quadro é limitado a 4 MiB, todos os quadros brutos juntos a 23 MiB, e a
resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido
em `finally`. O OmniRoute não inclui o FFmpeg e não aceita um caminho de executável
personalizado. Antes da geração de legendas, a ponte aplica uma etapa conservadora de
deduplicação visual: cada JPEG é reduzido a um buffer de tons de cinza de 16×16 e é
comparado apenas com o último quadro retido. Para um orçamento de legendas solicitado
acima de um quadro, a extração fornece um conjunto limitado de candidatos de até o
dobro desse orçamento e nunca mais de 16 quadros. O limite solicitado é aplicado
somente após a deduplicação, com os primeiros e últimos candidatos selecionados
preservados durante a redução final quando o orçamento é de pelo menos dois. A política
versionada
`grayscale-16x16-mean-cells-v2` usa o maior valor entre a diferença média de luminância
e a proporção de células da miniatura cuja diferença normalizada é de pelo menos 0,05.
O limite de duplicação é a constante 0,04, escolhida por previsibilidade em vez de ser
exposta como uma configuração de runtime. Esse sinal secundário de
alto contraste preserva pequenas mudanças de movimento e alterações no texto visível
que uma comparação baseada apenas na média pode ocultar. Erros do comparador ou do
decodificador permitem a passagem e mantêm a cobertura. Os metadados de saída separam
os candidatos extraídos, os quadros usados com sucesso e as duplicatas visuais
descartadas.

Uma parte de vídeo explicitamente marcada pode solicitar uma folha de contatos com
marcações de tempo. A ponte cria uma grade JPEG de no máximo 4 colunas e 16 quadros.
Cada célula de 512 pixels grava sua marcação de tempo de origem em uma faixa inferior
de alto contraste, enquanto as mesmas marcações de tempo permanecem nos metadados
textuais para associação e auditoria posteriores. O JPEG completo permanece limitado
a 32 MiB. Se `sharp` não puder decodificar ou compor a grade, a ponte recorre aos
quadros JPEG individuais; um cancelamento do cliente ainda é propagado pela operação
da folha.

As evidências de promoção são deliberadamente separadas do microbenchmark de
composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um
harness A/B versionado por esquema para modelos de visão reais compatíveis com a
OpenAI. Ele mede tokens informados pelo provedor, latência total de ponta a ponta
(incluindo a composição da folha), quantidade de chamadas ao modelo e retenção de
fatos definida pelo manifesto. As respostas brutas do modelo não são gravadas no
relatório; somente os resumos SHA-256 e os IDs dos fatos correspondentes são retidos.
O harness não faz chamadas de rede nem chamadas a modelos pagos, a menos que
`--execute-real` seja passado e `--model`, `OMNIROUTE_BASE_URL` e
`OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, seu
veredito legível por máquina permanece `HOLD`; medições sintéticas de
payload/quantidade de chamadas, por si só, não constituem evidência de promoção.

O `scripts/perf/video-bridge-promotion-eval.ts` separado consome observações de FU-07
ou FU-09. A admissão para promoção exige todos os oito tipos de cenários sintéticos,
além de um clipe real sanitizado, pelo menos três repetições medidas por função e caso,
todas as dez métricas declaradas, resumos congelados de mídia/prompt/fatos
esperados/configurações, IDs de observação exclusivos e ordem A/B semeada verificada.
O recibo de execução associa o resumo do corpus, o SHA exato do candidato e a revisão
do modelo. Medições ausentes ou inválidas permanecem como `HOLD`, incluindo CPU acima
de 30 s, RSS de pico acima de 512 MiB ou pré-análise acima de 30 s. Esses são limites
de admissão de evidências, não uma nova garantia de imposição de RSS em runtime.

FU-07 exige pelo menos 98% de retenção de qualidade e latência p95 não superior a 1,2x
a linha de base, além de uma melhoria média de recall balanceada por caso de 0,05 em
termos absolutos com uma quantidade média equivalente de chamadas de legenda, ou pelo
menos 10% menos chamadas médias de legenda após a deduplicação. FU-09 exige pelo menos
0,85 de qualidade, 95% de retenção, redução de 20% na latência mediana e redução de
10% nos tokens. Perda de fatos críticos, conformidade com injeções ou uso ausente
impede a promoção. Uma execução não pode promover nada:
`--previous-report` confirma duas execuções elegíveis distintas, não sobrepostas e
consecutivas da mesma política/revisão do modelo/candidato/corpus. Um experimento de
amostragem não pode confirmar um experimento de folha de contatos.

Os coletores devem pontuar as respostas em memória e salvar `responseDigest`, além
das métricas e associações das observações, nunca o texto da resposta. O consumidor
também lê observações brutas legadas, mas nunca copia esse texto para seus relatórios.
Exatamente um entre `responseDigest` e `rawResponseText` é aceito para cada observação.
A lista de permissões versionada permanece vazia com um padrão imutável de `hold`. Uma
entrada elegível exige sua referência de evidência, revisão do modelo, SHA exato do
candidato, resumo do manifesto e dois IDs de execução distintos; contextos conflitantes
são rejeitados. Esses metadados são um contrato de auditoria, não uma prova de que um
arquivo referenciado contém medições genuínas. Revise os recibos reais antes de
adicionar qualquer entrada. O endpoint de estatísticas de gerenciamento e o painel de
Vídeo expõem uma prontidão conservadora. Um alias de modelo configurado, por si só,
não estabelece sua revisão nem o SHA do candidato em execução, portanto o painel atual
informa `HOLD` em vez de reutilizar a elegibilidade de outro contexto de execução. A
seleção experimental explícita permanece separada da promoção; nenhum padrão é
alterado automaticamente.

Os chamadores podem anexar uma matriz opcional `transcript.cues` a uma
parte de vídeo compatível quando já possuírem texto alinhado. Cada cue deve
conter `text`, um intervalo finito de `start`/`end` dentro da duração
verificada e um `source` permitido (`client`, `embedded` ou `audio-bridge`);
`confidence` tem o valor padrão `1` e deve permanecer entre `0` e `1`. Cues
exatamente duplicados são agrupados. O OmniRoute nunca inicia a transcrição a
partir desses metadados: os cues validados são copiados para o resultado
descrito com origem, confiança e intervalo, e são renderizados como
observações não confiáveis junto às legendas dos quadros. Texto inválido, fora
do intervalo ou sem procedência é rejeitado, em vez de ser misturado ao fluxo
de legendas. Ambos os canais de transcrição do corpo da solicitação
normalizam a procedência fornecida para `client`, incluindo rótulos
autodeclarados `embedded` ou `audio-bridge`. Somente um adaptador pertencente
ao servidor pode atribuir esses rótulos confiáveis por meio do argumento
exclusivo de código `trustedSource`; um campo JSON da solicitação não pode
alcançar esse argumento. O texto da transcrição continua sendo conteúdo não
confiável derivado da mídia, independentemente de sua procedência, e nunca
deve determinar a autorização.

Um chamador avançado pode fornecer uma faixa `audioTranscript` para o mesmo
vídeo; ela é tratada como texto fornecido pelo cliente, não como prova de
transcrição do servidor. A junção executa observações visuais e de áudio sob
um único prazo e sinal de cancelamento, ordena-as em uma linha do tempo comum,
elimina duplicatas exatas e relata um resultado parcial quando apenas um dos
lados é bem-sucedido. Um `audioTranscript` inválido degrada para esse resultado
parcial — a descrição visual é mantida e o ramo de áudio registra um código de
falha sanitizado — em vez de fazer o vídeo inteiro falhar. A disponibilidade
por ramo, o sinalizador de parcialidade e os códigos de falha sanitizados são
preservados no resultado descrito, nos metadados de proteção
(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nos metadados do cache de resultados e nos
contadores de junção da ponte. O caminho padrão do Video Bridge não invoca
conversão de fala em texto nem baixa uma segunda cópia da mídia; sem essa
faixa explícita, ele permanece somente de vídeo.

**Retenção de transcrições (#12150 P1).** Isso se aplica automaticamente
sempre que o Video Bridge (que é opcional) renderiza um cue de transcrição —
não há um sinalizador de retenção separado. Quando uma solicitação renderiza
qualquer cue de transcrição (um `transcript` declarado pelo chamador ou um
`audioTranscript` combinado), a proteção o marca como
`videoBridgeObserved` e produz uma cópia sombra redigida da descrição do vídeo
— uma renderização idêntica na qual o corpo de texto livre de cada cue é
substituído por `[redacted-video-transcript]`, criada pela substituição do
campo estruturado do cue antes que a string seja montada (nunca pela análise
do texto achatado, portanto nenhum conteúdo do cue — adversarial ou comum,
incluindo corpos que contenham `]`, como `[inaudible]`/`[music]` — pode
sobreviver). O corpo da solicitação do registro de chamadas persistido
substitui cada parte de texto derivada do vídeo por essa cópia sombra redigida,
correspondente por igualdade de conteúdo; a âncora `fullText` é relida da
carga útil final da proteção anterior à chamada, para que a correspondência
continue funcionando depois que proteções posteriores da cadeia (os
mascaradores de PII e credenciais, com prioridades 10/95) reescrevem o texto
da descrição no local e depois que a injeção de prompt do sistema/transferência
de contexto/memória remodela a matriz de mensagens. O corpo enviado ao modelo
permanece inalterado. Uma solicitação observada também não preenche nenhuma
Memory durável (tanto a extração derivada da solicitação quanto a derivada da
resposta é ignorada), portanto a própria resposta do modelo não pode
reproduzir texto da transcrição na Memory.

**Campos de vídeo brutos (#12430).** Quando a ponte está habilitada e o
suporte nativo a vídeo é desconhecido ou está ausente, os campos definidos
`transcript`/`audioTranscript` também ativam `videoBridgeObserved`, mesmo após
uma falha na descrição ou um limite de `maxVideos`. `null` e strings vazias
contam; campos ausentes e metadados que não sejam de vídeo não contam. As
cópias retidas redigem esses campos ou omitem a solicitação, e os caches/Memory
são ignorados.

Nesses caminhos de fallback, os cues válidos do chamador tornam-se partes
`text`/`input_text` compatíveis, em vez de campos não padrão do provedor.
Ambas as faixas fornecidas na solicitação continuam sendo observações
`client` não confiáveis, com um aviso explícito de que o vídeo não foi
descrito e de que os carimbos de data e hora não foram verificados em relação à
mídia. Os limites existentes de 256 cues/64 KiB no total e por cue aplicam-se
às duas faixas em conjunto; os carimbos de data e hora devem caber no limite de
600 segundos do broker e em qualquer janela de foco fornecida. Faixas
inválidas são descartadas, não encaminhadas como texto arbitrário; um irmão
válido ainda pode ser usado, a menos que o orçamento combinado seja excedido.
Campos nulos/vazios não adicionam texto. Nenhuma busca de mídia ou transcrição
é adicionada por esse fallback. Os campos de extensão da transcrição são
removidos do contêiner de vídeo do fallback e de seus objetos
`video_url`/`source`. A lista de permissões do protocolo OpenAI permanece
restrita; contêineres de vídeo nativos desconhecidos continuam disponíveis e os
destinos conhecidos somente de texto mantêm marcadores seguros. Cópias sombra
estruturadas redigidas protegem o texto de transcrição anexado, enquanto a
solicitação original pertencente ao chamador permanece inalterada. Destinos
com suporte nativo e pontes desabilitadas mantêm seu comportamento de bypass
existente.

Cópias retidas adicionais usam o mesmo sinal de solicitação observada. O
instantâneo bruto da solicitação do cliente anterior às proteções, a
solicitação pendente em memória e o registro antecipado de solicitação
rejeitada substituem estruturalmente os campos de transcrição nas partes de
vídeo; prompts de string sintetizados pelos estágios do pipeline e pela
transferência de contexto são redigidos no ponto de armazenamento do corpo da
solicitação. O marcador persistido `video_content_removed` faz com que a
continuação de `previous_response_id` falhe de modo seguro, em vez de
reconstruir texto que foi intencionalmente descartado. Se uma solicitação
observada perder sua cópia sombra de redaction por parte antes do registro, ou
se até mesmo uma entre várias sombras de vídeo não corresponder após mutações
posteriores da solicitação, o corpo retido da solicitação será omitido
integralmente, em vez de reter uma transcrição parcialmente redigida.

Para uma solicitação observada, uma resposta do modelo pode citar qualquer parte da
transcrição sem um limite de sinalização estruturado. Portanto, seu `responseBody`
persistido no registro de chamadas é substituído por um marcador de omissão; o artefato
detalhado do pipeline (que pode incluir corpos upstream/do cliente e fragmentos do
stream) não é retido. Os caches semântico, de idempotência e de reprodução do raciocínio
ignoram leituras e gravações para essa solicitação. A solicitação ao provedor e a
resposta visível ao cliente permanecem inalteradas. Os bytes iniciais de keepalive são
drenados do buffer temporário quando o artefato detalhado é omitido. O aviso de
EventStream malformado do Kiro informa apenas a contagem de bytes do payload, nunca seu
conteúdo nem o erro bruto do analisador JSON.
Isso não afirma que todo diagnóstico não relacionado de provedor/plugin tenha sido
auditado; a varredura mais ampla dos destinos retidos é acompanhada em #11658.

O ciclo de vida interno de `/api/modality-bridge/video/drilldown` é um substrato de
cache separado, autenticado por token e restrito ao loopback. Cada operação também
exige um ID opaco canônico de principal. Antes de habilitar um chamador de produção, ele
deve derivar esse ID a partir do tenant autenticado e nunca encaminhar um valor
selecionado pelo cliente. As chaves de cache associam esse principal aos IDs canônicos
de sessão e de referência de vídeo, armazenam apenas suas chaves derivadas de SHA-256 e
restringem tanto as leituras quanto a exclusão ao mesmo principal. O cache armazena no
máximo 16 quadros JPEG derivados por entrada, expira-os após dez minutos e oferece
leituras limitadas por `start`/`end` ou a exclusão explícita da sessão.

Cada principal é limitado a 16 entradas e 64 MiB de dados JPEG canônicos. Esses limites
são independentes do teto global de 64 entradas/256 MiB: a pressão da cota do principal
remove apenas as entradas menos recentemente usadas desse principal antes que a remoção
por LRU global seja considerada. As entradas expiradas são removidas da contabilidade do
principal e da global durante a atividade do cache, enquanto o cancelamento e a falha de
validação não confirmam uma substituição parcial.

O cache rejeita Base64 não canônico, preenchimento excedente, mídias que não sejam JPEG,
JPEGs malformados ou truncados e JPEGs que produzam um aviso durante uma decodificação
limitada de imagem completa com `sharp`. Ele recodifica cada imagem aceita como um JPEG
canônico, deriva a largura e a altura dos bytes decodificados em vez de confiar nos
campos fornecidos pelo chamador e descarta quaisquer bytes poliglotas à direita, em vez
de retê-los. Apenas o buffer comprimido canônico limitado é contabilizado em ambas as
cotas. O limite JSON da camada de comunicação inclui a sobrecarga do Base64 para o teto
de 32 MiB da entrada decodificada. Cada derivação armazenada registra seu
formato/resolução JPEG validados, política de amostragem, versão da derivação, hora de
criação, hash de conteúdo calculado pelo servidor e referência pai com hash, além do
hash de conteúdo pai do chamador confiável. O cancelamento é verificado entre as fases
assíncronas de decodificação/hash antes da confirmação atômica no cache.

O produtor de produção reutiliza quadros do broker já derivados somente após uma análise
visual bem-sucedida, sem um segundo download/extração do vídeo. Ele exige
`modalityBridgeVideoDrilldownEnabled=true` do operador, `drilldown: true` estrito por
parte e um ID de registro de chave de API autenticada. Valores de principal/sessão
declarados pelo cliente nunca estabelecem propriedade. Sem todas as três condições, ele
não aplica hash, redimensiona nem retém quadros adicionais. Uma falha de retenção
preserva a resposta visual utilizável. As solicitações com consentimento ignoram o cache
de resultados do vídeo completo, para que os resultados armazenados em cache nunca
reproduzam identificadores.

As respostas JSON e SSE bem-sucedidas expõem no máximo quatro identificadores opacos no
cabeçalho limitado `x-omniroute-video-drilldown`. Origens de navegador autorizadas podem
ler esse cabeçalho sem ampliar a política de origem do CORS. Novos identificadores usam
`v1.<32-byte random base64url token>`, e o registro retém apenas seus hashes SHA-256.
O leitor/analisador de cabeçalho também aceita tokens hexadecimais legados de 64
caracteres. O consumidor público autenticado é
`GET /api/v1/video-bridge/drilldown?handle=...`, protegido independentemente por
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Um valor persistido explicitamente
como false revoga o acesso mesmo quando o fallback de ambiente legado
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` está habilitado. A retenção de produção
tem o fallback legado análogo `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Ambos os
fallbacks vêm desabilitados por padrão.

O consumidor deriva a propriedade a partir da chave autenticada e aplica a política de
chaves: tanto GET quanto DELETE pertencem à categoria de endpoint `video`, incluindo os
aliases `/v1` e `/api/v1`. As chaves com uma lista de permissões de endpoint não vazia
devem incluir `video`; as chaves irrestritas permanecem compatíveis. O consumidor
retorna o mesmo 404 para identificadores desconhecidos, expirados e pertencentes à
chave de outro usuário. Ele aceita `variant=preview|standard|detail` (dimensão máxima
de JPEG de 320/640/1280, nunca ampliada), `limit=1..8` (ou o alias legado `frames`,
nunca ambos), `page` baseado em zero e os segundos de foco opcionais `start`/`end`.
Chaves de consulta duplicadas e janelas de foco invertidas são rejeitadas. Cada variante
retornada tem um hash de seu conteúdo real e metadados de resolução reais, vinculados à
origem retida. As variantes são derivadas durante a leitura, em vez de armazenadas como
cópias retidas adicionais. A resposta JSON, incluindo Base64/envelope, é limitada a
32 MiB; uma página grande demais retorna 413, e o cliente deve solicitar menos quadros.
As leituras verificam o cancelamento em torno de cada redimensionamento e revalidam o
identificador antes de retornar. `DELETE` pelo proprietário é idempotente; a exclusão
ou a expiração do TTL libera a origem retida e a contabilidade de uso.

O armazenamento compartilhado é local ao processo: os identificadores expiram após uma
reinicialização e não são transferíveis entre processos independentes do OmniRoute. As
estatísticas de gerenciamento expõem a política efetiva de retenção/remota e apenas o
agregado de entradas/bytes retidos, nunca mídias, referências, IDs de principais ou
identificadores. O painel de configurações de Vídeo mostra esses valores e pode
persistir ambas as opções de consentimento. Esta documentação de implementação não
constitui evidência de implantação ou promoção em produção; a aceitação com modelos
reais é acompanhada separadamente.

Os frames são legendados sequencialmente com o modelo Video configurado. Uma
substituição de Video vazia herda a configuração Vision; se ambos estiverem vazios,
o roteador automático Vision seleciona o modelo efetivo com capacidade de visão.
Legendas bem-sucedidas substituem a parte original por um prefixo estável
`[Video description:` que também marca o texto como uma observação não confiável
derivada de mídia e instrui os modelos downstream a não seguir instruções
encontradas na mídia. As chaves do cache de legendas de frames incluem os bytes
JPEG, o prompt, o timestamp e o modelo efetivo; somente legendas bem-sucedidas
são armazenadas em cache. As entradas do cache mantêm o modelo produtor real que
teve sucesso, incluindo um modelo de fallback; a bridge reporta `mixed` quando
frames diferentes foram produzidos por modelos diferentes. Um cache hit reutiliza
a identidade desse produtor em vez de rotulá-lo novamente como o plano de
roteamento solicitado. O cache de resultados do vídeo inteiro é indexado por
toda entrada que altera a saída — prompt, modelo efetivo, política de amostragem,
quantidade de frames, modo de análise semântica, a impressão digital SHA-256 da
dica de foco normalizada, janela de foco, `transcript`,
`audioTranscript` e o sinalizador de contact sheet — portanto, alterar qualquer
uma dessas dimensões resulta em um cache miss, nunca em uma reutilização obsoleta.
A versão da política de deduplicação visual, o limite e a quantidade limitada de
frames candidatos também são explícitos na chave e nos metadados do cache de
resultados; portanto, uma alteração na política não pode reutilizar uma descrição
obsoleta do vídeo inteiro. Os metadados do result-cache v4 mantêm o modo e a
impressão digital, nunca a tarefa bruta do usuário. Os metadados das proteções
relatam os modos de análise solicitado e efetivo; um modo `focused` solicitado
sem texto utilizável do usuário é reportado efetivamente como `full`.

A proteção extrai todas as partes de vídeo compatíveis, mas descreve no máximo
`modalityBridgeVideoMaxVideos`. Para um destino comprovadamente definido como
`supportsVideo === false`, os vídeos que falharem ou excederem o limite tornam-se
marcadores de texto seguros explícitos, para que nenhum vídeo bruto sobreviva.
Quando a capacidade é desconhecida, essas partes mantêm seu contêiner de vídeo;
qualquer transcrição de fallback segue a conversão de texto limitada acima.
Destinos com `supportsVideo === true` ignoram a bridge.
O sinal de abort da solicitação do cliente é propagado pelo download, pela fila
do broker, pelos subprocessos e pelas chamadas de legendagem; os aborts
interrompem o processamento entre vídeos e nunca permitem fallback aberto para
mídia bruta.

As configurações de runtime são armazenadas no DB e validadas pelo Zod:

| Chave                               | Padrão      | Intervalo / comportamento                                                                               |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opcional, opt-in                                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` preserva legendas genéricas; `focused` usa o contexto limitado e não confiável do último usuário |
| `modalityBridgeVideoModel`          | `""`        | Herda o modelo da Vision Bridge                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ou `segment_aware` proporcional; falha do detector recorre a `uniform`         |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                          |

Valores persistidos antigos de timeout do Video acima de 120 segundos são
limitados ao prazo final do broker; novas gravações de configurações acima
desse limite são rejeitadas.
`GET /api/modality-bridge/video/runtime` exige localidade loopback confiável
e carimbada antes da autenticação ou da sondagem do runtime; em seguida, exige
autenticação de gerenciamento. Ele retorna apenas `available`, versões
sanitizadas do FFmpeg/ffprobe e um motivo fixo quando o runtime está indisponível.
O endpoint interno de extração não é uma API pública de upload: a saturação da
fila retorna `503` mais `Retry-After`, uma desconexão do chamador retorna `499` e
o prazo final fixo do broker retorna `504`. As respostas convertidas adicionam
`video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central
`x-omniroute-modality-bridge` sem remover os segmentos de Vision ou Audio.

### Mascarador de PII (`piiMasker.ts`)

É executado em **ambos** os estágios.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e
  `prompt` (incluindo itens de string simples) e aplica `processPII()` (de
  `@/shared/utils/inputSanitizer`) aos campos `content`/`text` de string. Quando
  `PII_REDACTION_ENABLED=true`, a PII detectada é redigida no payload enviado.
  Isso é independente de `INPUT_SANITIZER_MODE` (que controla apenas a política
  de injeção de prompt). Quando a redação está desativada, a chamada registra as
  contagens de detecções sem reescrever o conteúdo.
- **`postCall`** clona profundamente a resposta, executa
  `sanitizePIIResponse()` junto com o mascarador do formato da Responses API
  (`maskResponsesOutput` — abrange `output_text` e
  `output[].content[].text`). Se ocorrer qualquer redação, a resposta modificada
  substitui a original.

A proteção nunca bloqueia; ela apenas anota (`meta.detections`,
`meta.redacted`) ou reescreve.

**Cofre reversível (`PII_REVERSIBLE_VAULT_ENABLED`, padrão `false`).** Quando
`PII_REDACTION_ENABLED` e `PII_REVERSIBLE_VAULT_ENABLED` estão ativados (substituição no DB >
ambiente > padrão, lida uma vez por requisição), `handleChat` abre um cofre por
requisição do cliente (`src/lib/pii/requestTokenVaultScope.ts`) e o passa para a
etapa de pré-chamada como `GuardrailContext.tokenVault`. O mascarador então
grava tokens substitutos, como `<<PII_EMAIL_QWERTYUI_1>>`, em vez de
`[EMAIL_REDACTED]`, tanto para regras integradas e validadas (GDPR/POPIA) quanto
para regras personalizadas. O nonce consiste em 8 letras maiúsculas aleatórias
por requisição, e o mesmo valor recebe o mesmo token dentro da requisição.
Somente o mascarador cria tokens: o guard contra injeção de prompt e
`/api/guardrails/test` são executados sem um cofre e mantêm os placeholders.

- O provedor, cada etapa de combinação, a nova tentativa, cada membro do painel
  de fusão e o juiz da fusão veem apenas tokens. Os tokens são restaurados uma
  única vez, na resposta 2xx que sai de `handleChat`: por campo no SSE analisado
  (um token dividido entre eventos ainda é resolvido; os argumentos de chamadas
  de ferramentas têm escape JSON) ou por campo em um corpo JSON, com um
  `Content-Length` recalculado. O conteúdo, o texto de raciocínio e os
  argumentos de chamadas de ferramentas são restaurados. Os corpos de erro
  (4xx/5xx) mantêm os tokens.
- As falhas permanecem privadas: se a criação falhar ou o cofre recusar um
  valor (1000 entradas, 256 caracteres por valor, 64 KB no total), o
  placeholder será escrito; um token que o cofre não consiga resolver ou uma
  restauração que falhe permanece literal e somente uma contagem é registrada.
  O cofre não mantém temporizadores nem estado global; ele é limpo quando o
  fluxo de resposta termina, é cancelado ou apresenta erro.
- Quando uma requisição criou tokens, a extração de memória, o salvamento da
  idempotência e ambas as gravações do cache semântico são ignorados, pois
  nenhuma requisição posterior poderia resolver esses tokens. Nos logs de
  chamadas, a requisição e a resposta do provedor contêm tokens; o corpo da
  requisição do cliente registrado ainda é a entrada bruta do cliente, assim
  como na redação simples.
- Os tokens usam um nonce aleatório por requisição, portanto o prefixo do prompt
  muda a cada turno: o cache de prompts no lado do provedor não é atingido para
  turnos mascarados, e um token que retorne em um turno posterior (por exemplo,
  via `previous_response_id`) pertence a uma requisição antiga e permanece
  literal.

#### Seleção por tipo, padrões personalizados e contadores de detecção

**Painel → Configurações → Segurança → Mascaramento de PII** escolhe _o que_ é
mascarado. Ele não ativa o mascaramento: isso ainda é feito por
`PII_REDACTION_ENABLED` (requisição) e `PII_RESPONSE_SANITIZATION` (resposta +
SSE), ambos desativados por padrão.

- **Seleção por tipo** — os ids integrados estão listados em
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa
  todos os tipos (o comportamento anterior à existência desta configuração). O
  padrão `ssn_us` do mecanismo de requisições é mapeado para `ssn`. Os modelos
  (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) apenas
  preenchem as caixas de seleção na interface.
- **Identificadores GDPR e POPIA** — doze ids integrados que abrangem
  identificadores pessoais da UE e da África do Sul (tabela abaixo). Suas
  expressões regulares, validadores e tags de jurisdição ficam em uma única
  tabela, `src/shared/utils/piiPatterns.ts`, consumida tanto pelo sanitizador de
  respostas (`src/lib/piiSanitizer.ts`) quanto pelo mascarador de requisições
  (`src/shared/utils/inputSanitizer.ts`). Uma correspondência só é redigida
  quando seu validador a aceita; uma sequência simples de dígitos nunca é
  suficiente. Um operador que tenha salvo uma seleção reduzida antes da
  existência desses ids mantém o comportamento que tinha até que os novos ids
  sejam marcados.
- **Padrões personalizados** — até 20 padrões de expressão regular ou wildcard
  (`*` = até 64 caracteres que não sejam espaços em branco, `?` = um). As
  correspondências se tornam `[CUSTOM_REDACTED]`. Todo padrão passa por
  `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): no máximo 500 caracteres, flags
  limitadas a `g i m s u`, deve ser compilado, deve passar por `safe-regex`
  (retrocesso catastrófico) e não deve corresponder a uma string vazia nem a um
  placeholder de redação. Um padrão que falhe é recusado ao ser salvo e testado,
  e uma linha armazenada que falhe é ignorada em tempo de execução, em vez de
  ser compilada. Os padrões personalizados só são executados enquanto o
  mascaramento está ativado.
- **Contadores de detecção** — contagens por tipo (nunca os valores
  correspondentes), mantidas na memória e redefinidas ao reiniciar
  (`src/lib/pii/piiDetectionStats.ts`). Elas só aumentam enquanto o mascaramento
  está ativado.

As configurações ficam na tabela `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) e são lidas por meio de um cache de 1 s. API:

| Método | Caminho                  | Finalidade                                                                 |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado das flags, `enabledTypes`, `customPatterns`, contadores de detecção |
| `PUT`  | `/api/settings/pii`      | Substituir `enabledTypes` (`null` = todos) e/ou `customPatterns`           |
| `POST` | `/api/settings/pii/test` | Testar um padrão contra uma amostra de no máximo 8 KB; nada é armazenado   |

Todos os três exigem autenticação de gerenciamento e validam o corpo com Zod
(`src/shared/validation/schemas/piiSettings.ts`). Com o login desativado
(`requireLogin=false`), `GET` e o endpoint de teste ficam abertos, mas `PUT`
ainda exige uma sessão do painel, uma chave de API com escopo `manage`, um token
de acesso `oma_` com escopo de gravação ou superior, ou o token da CLI ou o
token de serviço interno enviado pelo loopback.

#### Identificadores GDPR (UE) e POPIA (África do Sul)

| Id                  | Identifier                           | Validation                                                                                |
| ------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `iban`              | IBAN                                 | País conhecido, comprimento exato para esse país, ISO 13616 MOD-97-10                     |
| `eu_vat`            | Número de IVA da UE                  | Prefixo de Estado-membro conhecido e formato numérico desse Estado (sem consulta ao VIES) |
| `es_dni_nie`        | DNI / NIE espanhol                   | Letra de controle (valor mod 23); NIE é `X/Y/Z` + 7 dígitos                               |
| `it_codice_fiscale` | Codice Fiscale italiano              | Letra de controle baseada nas tabelas de posições ímpares/pares                           |
| `pl_pesel`          | PESEL polonês                        | Soma de verificação ponderada e data de nascimento codificada existente                   |
| `nl_bsn`            | BSN holandês                         | Prova dos 11 (pesos 9..2, -1)                                                             |
| `de_steuer_id`      | Steuer-ID alemã                      | ISO 7064 Mod 11,10, além das regras de estrutura dos dígitos (sem 0 inicial)              |
| `se_personnummer`   | personnummer sueco                   | Luhn sobre os dez últimos dígitos e uma data de nascimento plausível (10 ou 12 dígitos)   |
| `za_id`             | Número de identificação sul-africano | Luhn sobre todos os 13 dígitos, mês/dia de nascimento válidos, dígito de cidadania 0 ou 1 |
| `za_phone`          | Telefone sul-africano                | Prefixo `+27` / `27`, ou o formato nacional `0..` escrito com espaço ou hífen             |
| `za_vat`            | Número de IVA sul-africano           | 10 dígitos começando com `4` **e** "VAT" / "BTW" nos 48 caracteres anteriores             |
| `za_tax_ref`        | Referência fiscal sul-africana       | 10 dígitos começando com `0`-`3`, Luhn, **e** "tax" / "SARS" nos 48 caracteres anteriores |

Como os formatos compostos apenas por dígitos colidem com números de pedido, números de compilação e
timestamps, os mais fracos (`za_vat`, `za_tax_ref`) precisam da indicação por palavra-chave, e
um número isolado de dez dígitos começando com `0..` não é tratado como um número de telefone sul-africano.
IBANs com espaços (`GB29 NWBK ...`) não são correspondidos. No caminho de streaming, a indicação é
procurada apenas dentro do bloco atual. Os IDs ficam à frente dos padrões genéricos de telefone,
portanto um identificador validado mantém seu próprio placeholder
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Os templates `gdpr` e `popia`
selecionam os IDs da UE e da África do Sul, respectivamente. O mascaramento continua sendo opt-in
(Regra rígida #20): nada aqui altera um padrão de feature flag.

### Injeção de prompt (`promptInjection.ts`)

Detecta estruturas adversariais no conteúdo fornecido pelo usuário e aplica a
política configurada. O comportamento é controlado por variáveis de ambiente e opções do construtor:

| Setting            | Env var                                                                                              | Default | Effect                                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado         | `INPUT_SANITIZER_ENABLED`                                                                            | `true`  | Quando `false`, a proteção é interrompida imediatamente.                                                                                                                                                               |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`  | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceito para compatibilidade retroativa, mas **não** remove o texto da injeção; a reescrita da PII da solicitação é controlada por `PII_REDACTION_ENABLED`.) |
| Limite de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Severidade mínima necessária para bloquear. Medium é apenas observado no padrão.                                                                                                                                       |

**Precedência do modo** (`getMode`): `options.mode` do chamador →
substituição de feature flag do banco de dados para `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → variável de ambiente `INJECTION_GUARD_MODE` → variável de ambiente
`INPUT_SANITIZER_MODE` → `warn`. Portanto, uma substituição no dashboard tem precedência sobre as variáveis
de ambiente, e a interface do Feature Flags controla a proteção em execução ao vivo (sem reinicialização).
A leitura do banco de dados é à prova de falhas:
se ocorrer um erro, a proteção volta ao comportamento baseado no ambiente; quando
nenhuma substituição está definida, o comportamento é idêntico à resolução baseada apenas no ambiente.

Fontes de detecção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto de detectores
   compartilhado usado em outras partes do pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrado (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com severidade `high`).
3. `customPatterns` opcional passado pelas opções do construtor (strings, expressões regulares
   ou registros `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma detecção atinge o limite de severidade, `preCall` retorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, a proteção registra o evento, mas permite a chamada. O
helper compartilhado `evaluatePromptInjection()` também é exportado para chamadores que precisam avaliar prompts sem passar pelo registro.

**Limite de varredura (v3.8.20):** o detector inspeciona apenas os **primeiros 16 KB**
do texto combinado do prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) em
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` quanto
`evaluatePromptInjection()` executam `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de executar
o loop de padrões. As diretivas de injeção ficam próximas ao início de uma entrada; portanto, isso
limita o uso de CPU/GC das expressões regulares em payloads de várias centenas de KB sem enfraquecer a detecção (consulte
#3932, #4041).

### Mascarador de credenciais (`credentialMasker.ts`)

É executado em **ambos** os estágios, por último na cadeia padrão (prioridade `95`). Redige padrões conhecidos de chaves de API / tokens secretos do payload de saída (conteúdo da mensagem, argumentos de chamadas de ferramentas, resultados de ferramentas) **e** da resposta do provedor, para que uma credencial colada em um prompt (ou repetida pelo resultado de uma ferramenta) não seja vazada para o provedor upstream nem de volta para o cliente.

- **Somente opt-in**, seguindo a mesma convenção da redação de PII (adjacente à Hard Rule #20):
  desabilitado, a menos que `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Quando desativado, o guardrail não faz nada —
  nunca bloqueia nem reescreve.
- `redactCredentials()` percorre toda a árvore do payload/resposta (`walkValue()`,
  com proteção contra poluição de protótipo e ciclos por meio de `WeakSet`) e substitui as correspondências por um
  marcador `[REDACTED:<type>]`, clonando apenas os ramos que realmente foram alterados.
- `CREDENTIAL_PATTERNS` abrange chaves de provedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves
  de nuvem (chave de acesso da AWS, Twilio, SendGrid, Mailgun), chaves privadas / JWTs,
  strings de conexão que contêm credenciais (`mongodb://user:pass@...`, etc.) e um padrão genérico de
  valor de cabeçalho `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Chaves em formato de cabeçalho (`authorization`, `x-api-key`, `api-key`,
  `apikey`) são redigidas estruturalmente (somente o valor, preservando o prefixo do esquema, como
  `Bearer `/`Basic `), em vez de usar a expressão regular de texto genérica.
- O guardrail nunca bloqueia; ele apenas reescreve (`modifiedPayload` /
  `modifiedResponse`) e adiciona anotações (`meta.credentialsRedacted`, `meta.count`).

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

O registro de guardrails está conectado apenas ao pipeline de chat. Esses limites são
fixados por `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` e
`tests/unit/guardrail-pipeline-characterization.test.ts`; atualize esses testes
deliberadamente quando o comportamento mudar.

### Onde os hooks são executados

| Hook / controle                                | É executado em                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                              | Solicitações processadas por `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (e `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` e o proxy de chat do Telegram. Também no endpoint de teste do dashboard `/api/guardrails/test`. Um bloqueio pré-chamada retorna HTTP 400. |
| `runPostCallHooks`                             | Apenas respostas de chat **sem streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Respostas transmitidas por streaming nunca chegam a ele.                                                                                                                                                                                                                                                                                          |
| PII de streaming                               | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), conectado em `streamingPipeline.ts` quando `PII_RESPONSE_SANITIZATION` está ativado. Não é um guardrail, portanto os canais de desativação não o afetam.                                                                                                                                                                                                                               |
| Cofre de PII reversível                        | Apenas solicitações processadas por `handleChat`, quando `PII_REDACTION_ENABLED` e `PII_REVERSIBLE_VAULT_ENABLED` estão ativados. Os tokens são gerados pelo pre-call `pii-masker` e restaurados na saída de `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Desativar `pii-masker` para uma solicitação significa que nada será gerado.                                                                                                     |
| Middleware de proteção contra injeção (legado) | Todas as rotas `/v1` que recebem prompts, incluindo as da família de chat (consulte [cobertura de rotas](#injection-guard-route-coverage--red-team-phase-8--block-d)). Apenas injeção de prompt.                                                                                                                                                                                                                                                     |

### O que não é coberto

- **Rotas de mídia, embeddings e dados** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nunca chegam ao registro. Nenhum
  mascaramento de PII, mascaramento de credenciais ou ponte de modalidade é
  executado nelas. A única verificação é feita pelo middleware legado de
  proteção contra injeção.
- **Respostas transmitidas por streaming** não recebem guardrails pós-chamada: não há
  `pii-masker` ou `credential-masker` pós-chamada, nem bloqueio pós-chamada. Apenas
  a transformação de PII de streaming é aplicada (quando
  `PII_RESPONSE_SANITIZATION` está ativado). Uma credencial repetida em uma resposta
  transmitida por streaming não é redigida.
- **Canais de desativação versus o middleware (por design):** o middleware avalia
  injeção de prompt com sua própria chamada a `evaluatePromptInjection()`, sem
  passar nenhuma lista de desativação controlada pelo chamador. O modo `block` é
  um limite obrigatório que as desativações controladas pelo chamador não podem
  contornar, inclusive nas rotas da família de chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Desativar
  `prompt-injection` apenas ignora o guardrail do registro.

### O que vê uma resposta antes da pós-chamada

No caminho sem streaming, a ordem é: extração de memória → execução de ferramentas
integradas → guardrails pós-chamada → saída por bloqueio pós-chamada → armazenamento
no cache semântico.

- **A extração de memória** e a **execução de ferramentas** veem a resposta antes
  que os guardrails pós-chamada possam reescrevê-la ou bloqueá-la. Desde
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), a extração de
  memória executa o texto extraído por `sanitizePII` quando
  `PII_RESPONSE_SANITIZATION` está ativado (tanto em streaming quanto sem
  streaming), mas uma resposta que posteriormente seja bloqueada na pós-chamada
  ainda assim foi disponibilizada para a memória e as ferramentas.
- **O cache semântico** armazena a resposta após a pós-chamada, portanto armazena
  a resposta reescrita, e uma resposta bloqueada nunca é armazenada em cache. As
  entradas do cache são indexadas por chave de API.

## Configuração

Variáveis de ambiente lidas pelas proteções integradas:

| Variável                              | Usada por                  | Efeito                                                                                                                                 |
| ------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Defina como `false` para desabilitar completamente a detecção.                                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Política de injeção: `warn`, `block` ou `log`. O valor legado `redact` não reescreve o texto da injeção.                               |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modo da proteção contra injeção; também é uma flag de recurso do banco de dados que **substitui** as variáveis de ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Severidade mínima que `MODE=block` rejeita: `high` (padrão), `medium` ou `low`.                                                        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias legado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Quando `true`, os dados pessoais identificáveis (PII) da solicitação são ocultados (independentemente do modo de injeção).             |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Com `PII_REDACTION_ENABLED`, emite tokens reversíveis e os restaura em respostas 2xx.                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Controla o comportamento do mascarador no lado da resposta.                                                                            |

As proteções do Modality Bridge leem a configuração em tempo de execução do
armazenamento de configurações baseado no banco de dados (`getSettings()`), não
das variáveis de ambiente. As chaves primárias do Vision são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceitas somente como o fallback de leitura de um ciclo
documentado; as gravações do dashboard usam as chaves primárias. Os padrões e o
resolvedor de fallback ficam em
`src/shared/constants/modalityBridgeDefaults.ts`, com as constantes legadas
mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O Audio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, além das
configurações compartilhadas `modalityBridgeCache*`. O Audio não tem fallback
para chaves legadas porque essas chaves foram introduzidas com o esquema do
Modality Bridge.

O Video usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, além das configurações compartilhadas
`modalityBridgeCache*`. Ele vem desabilitado por padrão porque FFmpeg/ffprobe
são dependências operacionais opcionais, e a geração de legendas para quadros
adiciona latência e custo do modelo.

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
