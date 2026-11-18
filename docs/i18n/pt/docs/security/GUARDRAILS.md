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

## Guardrails incorporados

O registo carrega automaticamente seis guardrails por ordem de prioridade na importação
(consultar `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Estágio(s)     | Ficheiro              |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Os números de prioridade mais baixos são executados **primeiro**.

### Vision Bridge (`visionBridge.ts`) — Modalidade Bridge PR-1

O modelo base GLM 5.3 e `glm-5.3-{low,high,max}` têm metadados explícitos
`supportsVision:false` no registo/especificação. As variantes GLM 5.3 Flash
continuam a ser modelos nativos com visão. A rota `/v1/messages` do Claude Code entra na cadeia partilhada de guardrails de pré-chamada `handleChat` **antes** da tradução de Claude para OpenAI; as imagens aninhadas nos resultados da ferramenta `Read` têm de ser descritas ou tratadas antes de essa tradução as converter em conteúdo OpenAI `image_url` (#17069).

Interceta pedidos que contêm imagens dirigidos a **modelos sem visão** e redireciona todo o pedido para um modelo com capacidade de visão ou substitui as partes de imagem por descrições de texto produzidas por um modelo de visão configurável antes da chamada upstream. Isto permite que os fornecedores apenas de texto processem de forma transparente payloads multimodais.

Fluxo:

1. Ignora se o modelo-alvo já suporta visão (exceto se aparecer na lista de modelos forçados pelo bridge `isVisionBridgeForcedModel`).
2. Extrai as partes de imagem através de `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega no **detetor de multimédia unificado**
   `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a única fonte de verdade partilhada com o filtro de compatibilidade combo.
   A extração está limitada às estruturas permitidas que `replaceImageParts` pode reinserir (o contrato extração↔substituição): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, URL Anthropic `source.type:"url"` e Responses API `input_image`. Também são extraídas e substituídas nos respetivos caminhos originais as imagens correspondentes aninhadas em `tool_result.content` do Claude Code e nas saídas de ferramentas do Responses; as estruturas apenas indicadoras são material do filtro combo e não são extraídas.
   Ignora se não forem encontradas imagens.
3. Resolve a configuração de runtime através de `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de configuração `modalityBridge*` têm precedência; as chaves antigas `visionBridge*` continuam a ser um **fallback de um ciclo** (janela de reversão). Ignora antes de qualquer travessia de multimédia quando o bridge está desativado.
4. O seletor de modo (`modalityBridgeVisionMode`, ver tabela abaixo) decide entre redirecionar e descrever. O redirecionamento devolve `modifiedPayload` apenas com `model`
   substituído, juntamente com os metadados `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limita as imagens a `maxImages`, compõe o prompt consciente da tarefa, consulta a cache de descrições, chama o modelo de visão **em paralelo**
   (`Promise.allSettled`) e injeta partes de texto `[Image N]: <description>` no respetivo lugar. Uma descrição falhada produz `null`: a imagem em bruto é preservada para destinos desconhecidos/com capacidade de visão (#4012), mas um **destino direto confirmado como apenas de texto** ou um combo sem visão recebe um stub de texto explícito
   `(unavailable — no vision-capable provider connected)` para cada imagem não descrita, incluindo falhas parciais e imagens além do limite de chamadas de descrição (#17069). O fallback de descrição do combo quando todas as descrições falham continua ativo (#8430).
6. Devolve `modifiedPayload` + metadados (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Predefinição | Comportamento                                                                                                                                                                                                                                                                                                                          |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Heurística legada, inalterada (#6640/#7204): os modelos que não são combo/`auto/` são redirecionados para o melhor modelo de visão, exceto se o modelo original já tiver credenciais utilizáveis (nesse caso, descreve); os destinos combo são sempre descritos.                                                                       |
| `describe` |              | Descreve sempre — o bloco de redirecionamento é completamente ignorado; o modelo escolhido pelo utilizador responde sempre.                                                                                                                                                                                                            |
| `reroute`  |              | Força o redirecionamento: a proteção do modelo com credenciais é ignorada. A proteção das credenciais do **destino** do redirecionamento continua a aplicar-se — quando não existe um destino de visão utilizável, o bridge bloqueia com um erro claro em vez de descrever ou enviar imagens em bruto para um destino apenas de texto. |

Os modos forçados interrompem o processamento **antes** da execução da heurística automática; o comportamento de `auto` é idêntico, ao nível dos bytes, ao do guardrail anterior à PR-1.

#### Âmbito da chave de API (`visionBridgeKeyScope.ts`)

Quando a chave de API do chamador restringe `allowedConnections`, os conjuntos de quotas
(`allowedQuotas`) ou os modelos (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a ponte apenas
seleciona modelos de redirecionamento e descrição que a chave pode utilizar, em
ligações que a chave pode utilizar. A chamada de descrição passa então sempre
pelo ciclo interno do OmniRoute com o cabeçalho
`x-omniroute-self-loop-key-id`, pelo que o pedido de chat recebido volta a
aplicar a política de ligações e modelos dessa chave. `enforceApiKeyPolicy()`
respeita esse cabeçalho apenas em conjunto com o bearer do ciclo interno, pelo
que só pode restringir o acesso; além disso, um ID que não seja resolvido é
rejeitado.

Se nenhum modelo de visão for permitido para a chave, um **destino confirmado
apenas de texto** rejeita localmente o pedido de imagem com um HTTP 400 claro,
em vez de encaminhar os bytes da imagem para um upstream incapaz de os
processar (#17069). Para destinos com capacidade de visão desconhecida ou
nativa, o caminho de descrição mantém o comportamento anterior de permitir em
caso de falha (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Os pedidos sem chave e as chaves sem estas restrições comportam-se exatamente
como antes.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

Por predefinição, **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
acrescenta o texto da **última mensagem do utilizador** (truncado para 500
carateres) ao prompt de descrição base, orientando a descrição para aquilo que
o utilizador realmente pediu (padrão codex-vision-proxy) e solicitando ao
modelo de visão que transcreva o texto visível. Com a opção desativada — ou sem
texto do utilizador — o prompt base é utilizado sem alterações.

O próprio pedido compatível com OpenAI do ciclo interno de descrição
(`callVisionModelSingle()`
em `visionBridgeHelpers.ts`) solicita sempre
`image_url.detail: "high"` — incondicionalmente, para todos os chamadores e
fornecedores, sem depender de qualquer sinal do cliente. A amostragem com baixo
detalhe reduz a precisão do OCR precisamente para a tarefa de transcrição de
texto solicitada por este prompt, pelo que a chamada de descrição solicita
sempre alto detalhe, independentemente do nível de detalhe utilizado pelo
pedido de entrada original. Isto afeta apenas o corpo do pedido interno de
descrição; não altera a forma como o OmniRoute encaminha o
`image_url.detail` do próprio chamador no pedido principal — essa predefinição é
aplicada separadamente, e apenas para clientes OpenCode detetados, em
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). A
ramificação do ciclo interno de descrição no formato de comunicação Anthropic
não tem o campo `detail` e não é afetada por nenhuma das predefinições.

#### Limite da saída de descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Predefinição | Intervalo        |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` ou 100–50000 |

`0` (predefinição) significa **sem limite** — a descrição devolvida por
`callVisionModel()` é transmitida sem alterações, preservando o comportamento
existente. Qualquer valor no intervalo 100–50000 trunca a descrição com um
sufixo `…` antes de esta ser reinserida como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`).
Aumente este valor para tarefas de OCR com muitos detalhes, nas quais o modelo
a jusante necessita da transcrição completa; reduza-o para limitar o consumo de
tokens em modelos de visão prolixos. O campo do dashboard encontra-se no painel
Advanced do separador Vision
(`modality-bridge-max-chars` em `ModalityBridgeVisionTab.tsx`) e limita qualquer
valor entre 1 e 99 ao mínimo de 100, deixando um `0` explícito inalterado —
`0` é um valor Zod válido por si só
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), não apenas a
predefinição «não definido».

#### Cache de descrição (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para resultados de descrição, partilhado por todo o
processo. A chave é `sha256(imageRef + composedPrompt + configuredBridgeModel)`
com enquadramento baseado em prefixos de comprimento (sem colisões nos limites
dos campos). O componente do modelo é o modelo de ponte **configurado**, não o
modelo que respondeu efetivamente —
`callVisionModel` pode recorrer internamente a um fallback, e indexar por
tentativa fragmentaria a cache. As descrições falhadas nunca são armazenadas em
cache. Definições:

| Chave                           | Predefinição | Intervalo |
| ------------------------------- | ------------ | --------- |
| `modalityBridgeCacheEnabled`    | `true`       | —         |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000   |

#### Normalização de imagens remotas (obtenção no ciclo interno de descrição/base64)

Quando a ponte obtém diretamente uma imagem **remota** — tanto a chamada
interna de descrição da Anthropic como a conversão para base64 do formato de
comunicação claude
(`ensureBase64ImagesForClaudeWire`), ambas através de
`fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — o URI de dados
resultante passa por `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de ser incorporado no pedido ao
modelo de visão. As imagens demasiado grandes são reduzidas para uma
**extremidade maior de 2048 px** (correspondente ao limite de redimensionamento
que o OpenAI/Anthropic já aplica no lado do servidor), reduzindo os bytes e a
latência do carregamento sem alterar o que o modelo de visão vê. O
redimensionamento utiliza `sharp`, carregado através de importação dinâmica:
numa plataforma onde o binário nativo não consiga ser carregado,
`normalizeDataUri()` **nunca lança uma exceção** — recorre a uma passagem direta
dos bytes originais, pelo que o caminho de descrição/conversão para base64
continua sempre a funcionar. Os bytes que não sejam de uma imagem (uma obtenção
que não tenha devolvido uma imagem descodificável) também são transmitidos sem
alterações. Esta normalização está limitada às imagens que a ponte obtém para a
sua própria chamada interna — nunca é aplicada ao payload bruto transmitido
diretamente pelo chamador, em conformidade com o princípio de mutação apenas
por opção (Hard Rule #20).

#### Esquema de definições + migração

As novas chaves `modalityBridge*` são validadas pelo Zod em `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o grupo
`modalityBridgeAudio*` utilizado pela Ponte de Áudio. A migração
`141_modality_bridge_settings.sql` copia os valores legados existentes de
`visionBridge*` para as novas chaves correspondentes (idempotente, nunca
substitui um valor de `modalityBridge*` definido por um operador); as chaves
legadas continuam a ser aceites como fallback de leitura durante um ciclo de
lançamento.

#### Cabeçalho de transparência + estatísticas

As respostas transformadas incluem
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(criado por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`,
adicionado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`).
Os pedidos redirecionados não recebem qualquer cabeçalho — o payload não foi
alterado e a troca de modelo já é visível no campo `model` do corpo da
resposta.

`GET /api/modality-bridge/stats` (autenticação de gestão, no mesmo nível que
`GET /api/settings`) devolve os contadores em memória por modalidade
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e
`video`. `averageLatencyMs` utiliza `latencySamples`, e não todas as tentativas,
como denominador; uma operação sem medição de tempo não fabrica uma amostra de
zero milissegundos. `bridged` continua a ser o alias retrocompatível para
conversões bem-sucedidas; as tentativas falhadas não o incrementam.
Os contadores são reiniciados quando o processo é reiniciado, por conceção
(telemetria, não contabilidade).

#### Configuração do dashboard

A página dedicada do dashboard está em
`/dashboard/settings/modality-bridge`. Os separadores `Vision`, `Audio` e
`Video`, endereçáveis através do URL, preservam os parâmetros de consulta ao
alternar o valor de `tab`. O separador Vision expõe a ativação, o modo, a
seleção do modelo (incluindo o predefinido automático), prompts sensíveis à
tarefa, limites avançados de tempo limite/imagens/comprimento da descrição/
cache, contadores de runtime e um pedido de amostra protegido. O separador
Audio também está ativo: expõe a ativação, um seletor de modelos apenas para
STT com Auto, limites de tempo limite/duração máxima do clipe, contadores de
áudio e um teste de amostra `input_audio`. O separador Video é funcional:
apresenta o estado de runtime do FFmpeg/ffprobe — um de quatro estados
explícitos da interface (`unknown` enquanto a sondagem está em curso ou não
pôde ser concluída, `restricted` num host de dashboard que não seja de
loopback, onde a sondagem é ignorada no lado do cliente, `unavailable` depois
de sondado e confirmado como ausente, ou `available` com as versões do
FFmpeg/ffprobe) —, persiste os limites de ativação/modelo/imagens/frames/
vídeo/tempo limite, filtra o seletor de modelos para modelos compatíveis com
visão e expõe contadores de vídeo.

O antigo cartão Vision Bridge nas definições de IA é uma ligação de
compatibilidade para a nova página; já não mantém uma segunda cópia do
formulário. Os Media Providers também ligam os fluxos de trabalho
Image-to-Text e Speech-to-Text aos separadores correspondentes da Ponte de
Modalidade, sem remover o playground Speech-to-Text existente.

**Ignorar a admissão de self-loop:** quando a chamada de descrição é
encaminhada através do próprio self-loop `/v1` do OmniRoute (modelo de
provider não padrão), o subpedido envia
`x-omniroute-admission-bypass: internal` e é autenticado com a credencial
resolvida do self-loop — o sentinel local `sk_omniroute` no modo local, ou a
chave de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada pelo
operador (#1350), para que as implementações com `REQUIRE_API_KEY=true` possam
continuar a executar a chamada de descrição. O bypass só é aceite para essas
credenciais exatas, pelo que clientes externos não podem utilizar o cabeçalho
para ignorar a admissão.

As predefinições legadas estão em
`src/shared/constants/visionBridgeDefaults.ts`; as novas predefinições de
modo, sensibilidade à tarefa e cache, bem como o resolver de definições, estão
em `src/shared/constants/modalityBridgeDefaults.ts`. A proteção expõe uma
opção de construtor `deps` para que os testes possam injetar implementações
falsas de `getSettings` e `callVisionModel`.

### Ponte de Áudio (`audioBridge.ts`) — Ponte de Modalidade PR-3

Interceta pedidos de chat que contêm áudio antes de chegarem a um destino que
não seja conhecido por aceitar entrada de áudio. Nunca redireciona o pedido de
chat: as partes de áudio são transcritas através do endpoint multipart
compatível com OpenAI existente, e o modelo de chat escolhido continua com
transcrições em texto.

Fluxo:

1. Resolva `supportsAudio` através de `getResolvedModelCapabilities()`. Os metadados explícitos do registo de fornecedores têm precedência, seguidos dos metadados estáticos do modelo e, por fim, de `modalities_input` sincronizado. Uma lista de entradas declarada sem `audio` corresponde a `false`; quando não existem evidências de capacidades, o valor permanece `null`. Tanto `false` como `null` ativam a ponte conservadora, enquanto `true` a ignora.
2. Resolva as definições `modalityBridgeAudio*` e extraia as partes de áudio de nível superior que podem ser intercaladas de todas as mensagens através do detetor partilhado `detectMediaParts()`. As formas suportadas são `input_audio`, `audio_url` e `source.media_type: "audio/*"` do OpenAI. O áudio aninhado é detetado para encaminhamento, mas não é removido pelo caminho de intercalação. O trabalho é limitado por `modalityBridgeAudioMaxClips`; as partes posteriores permanecem inalteradas.
3. Respeite um `provider/model` configurado ou permita que `selectAudioBridgeModel()` percorra `AUDIO_TRANSCRIPTION_PROVIDERS` pela ordem estável do catálogo e selecione o primeiro modelo com uma credencial ativa utilizável do fornecedor.
4. `callAudioTranscription()` converte áudio em base64/URI de dados num `file` multipart ou descarrega um `audio_url` remoto através da proteção de saída apenas pública, com fixação de DNS e um limite de 25 MB. Em seguida, faz POST do ficheiro e do modelo selecionado para o self-loop local `/v1/audio/transcriptions`, autenticado com `resolveSelfLoopBearer()`. A rota de transcrição existente executa a pesquisa normal de credenciais, o tratamento de cooldown/limitação de taxa e o encaminhamento para o fornecedor.
5. As chamadas bem-sucedidas substituem as respetivas partes por `[Audio N]: <transcript>`. As chamadas são executadas com `Promise.allSettled`: uma falha individual preserva a parte de áudio original (contrato #4012). Se todas as chamadas falharem e for comprovado que o destino tem `supportsAudio === false`, as partes tornam-se
   `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para um destino desconhecido (`null`), um resultado em que todas as chamadas falharam permanece inalterado. Um destino comprovadamente apenas de texto sem uma credencial STT utilizável recebe o mesmo marcador explícito sem efetuar uma chamada de rede.

As transcrições bem-sucedidas utilizam a cache LRU/TTL do Modality Bridge, abrangente a todo o processo. A chave combina a referência de áudio, o rótulo de operação estável
`audio-transcription` e o modelo STT selecionado; as falhas nunca são colocadas em cache. As tentativas de áudio atualizam os contadores partilhados `bridged`, `cacheHits`, `failures` e `lastUsedAt`.
As respostas transformadas incluem
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; os pedidos inalterados não recebem um segmento Audio Bridge.

As definições de execução são suportadas pela BD e validadas com Zod:

| Chave                         | Predefinição | Intervalo      |
| ----------------------------- | ------------ | -------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —              |
| `modalityBridgeAudioModel`    | `""`         | Auto ou ID STT |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10           |

A cache partilhada continua a ser controlada por
`modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceta partes de vídeo de nível superior nas `messages` da API Chat Completions e no `input` da API Responses antes de ser chamado um destino sem suporte nativo de vídeo conhecido.
As formas suportadas são `input_video`, `video_url`, `video_source`, URLs HTTPS e URIs de dados `data:video/*;base64,...`. Os nomes de ficheiro simples presentes no texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gere a travessia do pedido, a verificação de capacidades/políticas, a agregação por pedido e o payload da resposta.
O trabalho por vídeo — aquisição, cache do resultado completo, descrição de uma sequência de fotogramas (que combina qualquer transcrição de áudio declarada pelo autor da chamada) e métricas/abort/limpeza por tentativa — está oculto atrás de `processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez por cada parte de vídeo dentro do ciclo de `preCall`.
Esse módulo também define os limites explícitos das portas `VideoMediaBrokerPort` (aquisição de bytes e extração de fotogramas amostrados), `VideoAudioTranscriptionPort` (combinação de uma transcrição de áudio declarada pelo autor da chamada com as legendas amostradas) e `VideoDrilldownPort` (a forma do armazenamento bruto legado). O STT de produção e a retenção de fotogramas são compostos em torno da porta de descrição através de `createVideoSttAdapter` e `createVideoDrilldownAdapter`; este último utiliza o ciclo de vida partilhado de identificadores opacos.

O caminho público de pedidos `/v1` nunca importa nem invoca um subprocesso. Os vídeos remotos são descarregados sob um limite de 50 MiB; os vídeos base64 incorporados têm um limite conservador de 36 MiB descodificados por vídeo, para que o envelope do modelo/mensagens/enquadramento possa permanecer dentro do limite público de admissão de pedidos JSON de 50 MiB. As estimativas do comprimento incorporado e do tamanho descodificado são verificadas antes da alocação. É obrigatório utilizar HTTPS no URL remoto inicial e em todos os redirecionamentos, recorrendo à proteção de saída apenas pública existente com fixação de DNS. Os bytes atravessam então o limite exato do broker interno `POST /api/modality-bridge/video/extract`. Essa rota é simultaneamente `LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas um pedido autenticado por processo proveniente de um loopback fiável e nunca aceita um URL, caminho do sistema de ficheiros, executável ou lista de argumentos. O pipeline do tamanho do corpo da API e o leitor incremental de corpos do processador impõem independentemente um limite de entrada do broker de 50 MiB. A sua fila limitada executa uma extração de cada vez, permite quatro trabalhos pendentes e limita a entrada pendente a 100 MiB.

Dentro do broker, `ffprobe` lê um ficheiro local privado; a lista de permissões de formatos fixa exclui formatos de listas de reprodução e manifestos. Para contentores da família MOV permitidos, as referências externas de dados MOV permanecem desativadas por predefinição, e o comando fixo não as ativa. Tanto `ffprobe` como `ffmpeg` utilizam a lista de permissões de protocolos apenas com `file`, uma thread, matrizes de argumentos fixas, sem shell, e executáveis resolvidos a partir de `PATH`. Os streams de capa de imagem incorporada não são candidatos reproduzíveis. Todos os streams reproduzíveis têm de respeitar os limites, e é dada preferência a um stream predefinido explícito antes do fallback determinístico para o índice mais baixo. Os vídeos estão limitados a 600 segundos, 8 192 píxeis por dimensão e 33 554 432 píxeis de origem. O FFmpeg recolhe de 1 a 16 frames JPEG no ponto médio, reduz a escala da aresta maior para, no máximo, 1 024 píxeis sem aumentar imagens mais pequenas e nunca recebe um URL. A amostragem é `uniform` por predefinição. As políticas opcionais `scene_aware` e experimentais `segment_aware` executam uma passagem adicional fixa do FFmpeg sobre o stream local já validado, selecionam marcas temporais de cenas `showinfo` limitadas e recorrem deterministamente aos mesmos pontos médios uniformes em caso de falha do detetor, timeout, saída malformada ou conjunto de candidatos vazio. O modo segment-aware atribui amostras de pontos médios proporcionalmente aos intervalos de cenas validados; as evidências e o comportamento de fallback do modo segment-aware são detalhados abaixo. O limite rígido de 16 frames é aplicado após a seleção em todas as políticas. Quando um pedido scene-aware dispõe apenas de um orçamento de um frame, utiliza o ponto médio uniforme da janela ativa do vídeo completo ou da janela de foco e comunica `policyEffective: uniform`: um único frame de cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode fornecer opcionalmente uma janela de foco finita (`start`/`end` em segundos); os limites são ajustados à duração do conteúdo, as janelas invertidas ou não finitas são rejeitadas e todas as políticas de amostragem são executadas apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não fiável, para que os modelos a jusante possam distinguir um excerto focado da linha temporal completa.

O foco semântico da legenda é uma definição separada e explícita. O modo de análise predefinido `full` preserva o prompt de frames existente e nunca reencaminha texto do pedido para o modelo de legendagem. No modo `focused`, a ponte lê apenas o `text`/`input_text` mais recente, não vazio e criado pelo utilizador, do mesmo contentor Chat ou Responses, normaliza-o para NFC, substitui os carateres de controlo e os espaços em branco e limita-o a 500 pontos de código Unicode. Um resultado vazio recorre ao prompt `full` exato. Uma indicação utilizável é serializada como JSON num bloco dedicado de contexto do utilizador não fiável e só pode dar prioridade a detalhes observáveis; não pode substituir o aviso separado contra seguir instruções visíveis ou audíveis no conteúdo multimédia. O foco textual nunca infere `start`/`end` nem altera o amostrador temporal.

#### Evidência estrutural de segmentos FU-07

`segment_aware` utiliza uma passagem de pré-análise limitada sobre o stream de vídeo local já validado. A cadeia de filtros fixa começa por reduzir a escala para, no máximo, 320 píxeis de largura, deteta alterações de cena e intervalos congelados e, em seguida, faz amostragem a 1 frame por segundo para obter desfoque, luminância média e informação espacial/temporal. A passagem está limitada a 600 amostras estruturais, uma thread do FFmpeg/filtro, as mesmas listas de permissões de protocolos e contentores apenas com `file`, um limite de 1 MiB para a saída do processo e, no máximo, 30 segundos dentro do cancelamento/prazo partilhado do broker. Nunca aceita do pedido um comando, filtro, caminho ou URL.

Os valores estruturais são evidência de amostragem determinística, não compreensão semântica do vídeo. Não inferem sujeitos, ações, legendas, discurso ou intenção do utilizador. Os limites de cenas e de congelamento formam segmentos; a cobertura de congelamento, o desfoque, a exposição, o detalhe espacial e a alteração temporal apenas influenciam a forma como o orçamento existente de 1–16 frames é atribuído. Um segmento totalmente congelado fica limitado a um frame, enquanto os segmentos não congelados competem pelo orçamento restante. Quando os limites excedem o número de frames, mantém-se uma cobertura uniforme da linha temporal, para que cortes rápidos no início não possam ocultar um segmento longo no final. Os limites de cena que se encontrem dentro da resolução de análise de 1 segundo de um limite de congelamento são agregados.

A ausência de filtros, evidência malformada ou vazia, um erro do detetor ou o timeout limitado da pré-análise resultam num fallback para a política exata de pontos médios uniformes. Um cancelamento do chamador ou o prazo do broker não resultam num fallback: terminam o subprocesso em execução, impedem a extração posterior de frames e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera fixtures determinísticas reais do FFmpeg para poupanças de chamadas de legendagem após a eliminação de duplicados, atribuição de orçamento a movimento denso, evidência de desfoque/exposição/SI-TI, cortes rápidos com uma cauda longa e falsos positivos de desvanecimento gradual. Regista o tempo de parede da pré-análise e, quando `/usr/bin/time` está disponível, o CPU do processo subordinado e o RSS máximo. As suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legendagem permanece `HOLD`, porque este harness não dispõe de um endpoint autorizado nem de um avaliador fixo. As poupanças monetárias também permanecem `HOLD`, exceto quando `--caption-cost-per-call-usd` fornece uma estimativa positiva explícita por chamada; o script nunca fabrica nenhum dos resultados.

Cada frame está limitado a 4 MiB, todos os frames brutos em conjunto a 23 MiB e a resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido em `finally`. O OmniRoute não inclui o FFmpeg e não aceita um caminho de executável personalizado. Antes da criação das legendas, a bridge aplica uma passagem conservadora de deduplicação visual: cada JPEG é reduzido a um buffer de tons de cinzento de 16×16 e comparado apenas com o último frame retido. Para um orçamento de legendas superior a um frame, a extração fornece um conjunto limitado de candidatos de até duas vezes esse orçamento e nunca superior a 16 frames. O limite solicitado só é aplicado depois da deduplicação, preservando os primeiros e últimos candidatos selecionados durante a redução final quando o orçamento é pelo menos dois. A política versionada `grayscale-16x16-mean-cells-v2` utiliza o maior entre a diferença média de luminância e a proporção de células da miniatura cuja diferença normalizada é pelo menos 0,05. O limiar de duplicação é a constante 0,04, escolhida por previsibilidade em vez de ser exposta como uma definição de execução. Este sinal secundário de alto contraste preserva pequenas alterações de movimento e de texto visível que uma comparação baseada apenas na média pode ocultar. Os erros do comparador ou do descodificador permitem a continuação e mantêm a cobertura. Os metadados de saída distinguem entre candidatos extraídos, frames utilizados com sucesso e duplicados visuais descartados.

Uma parte de vídeo explicitamente marcada pode solicitar uma folha de contactos com marcas temporais. A bridge cria uma grelha JPEG com, no máximo, 4 colunas e 16 frames. Cada célula de 512 píxeis insere a marca temporal de origem numa faixa inferior de alto contraste, enquanto as mesmas marcas temporais permanecem nos metadados textuais para associação e auditoria posteriores. O JPEG completo continua limitado a 32 MiB. Se `sharp` não conseguir descodificar ou compor a grelha, a bridge recorre aos frames JPEG individuais; um cancelamento pelo cliente continua a ser propagado através da operação da folha.

A evidência de promoção é deliberadamente separada do microbenchmark de composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um mecanismo A/B com esquema versionado para modelos de visão reais compatíveis com OpenAI. Mede os tokens comunicados pelo fornecedor, a latência total de ponta a ponta (incluindo a composição da folha), o número de chamadas ao modelo e a retenção de factos definida pelo manifesto. As respostas brutas do modelo não são escritas no relatório; apenas são retidos os digest SHA-256 e os IDs dos factos correspondentes. O mecanismo não efetua chamadas de rede nem chamadas a modelos pagos, salvo se for passado `--execute-real` e estiverem configurados `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY`. Sem essa execução real explícita, o veredito legível por máquina permanece `HOLD`; as medições sintéticas de payload/chamadas, por si só, não constituem evidência de promoção.

O `scripts/perf/video-bridge-promotion-eval.ts` separado consome observações FU-07 ou FU-09. A admissão para promoção requer os oito tipos de cenários sintéticos, além de um clip real sanitizado, pelo menos três repetições medidas por função e caso, as dez métricas declaradas, digest dos meios/prompt/factos esperados/definições congelados, IDs de observação únicos e uma ordem A/B semeada e verificada. O recibo de execução associa o digest do corpus, o SHA exato do candidato e a revisão do modelo. As medições em falta ou inválidas permanecem em `HOLD`, incluindo CPU acima de 30 s, RSS máximo acima de 512 MiB ou pré-análise acima de 30 s. Estes são limites de admissão de evidências, não uma nova garantia de imposição do RSS em execução.

O FU-07 requer uma retenção de qualidade de pelo menos 98% e uma latência p95 não superior a 1,2x a baseline, além de uma melhoria absoluta de 0,05 no recall médio equilibrado por caso, com um número médio equivalente de chamadas de legendagem, ou de pelo menos 10% menos chamadas médias de legendagem após a deduplicação. O FU-09 requer pelo menos 0,85 de qualidade, 95% de retenção, uma redução de 20% na latência mediana e uma redução de 10% nos tokens. A perda de factos críticos, a conformidade com a injeção ou a ausência de utilização impedem a promoção. Uma única execução não pode promover nada: `--previous-report` confirma duas execuções distintas, não sobrepostas e consecutivamente elegíveis da mesma revisão de política/modelo/candidato/corpus. Um experimento de amostragem não pode confirmar um experimento de folha de contactos.

Os coletores devem avaliar as respostas em memória e guardar `responseDigest`, juntamente com as métricas e as associações das observações, nunca o texto das respostas. O consumidor também lê observações brutas legadas, mas nunca copia esse texto para os seus relatórios. Para cada observação, é aceite exatamente um de `responseDigest` ou `rawResponseText`. A lista de permissões versionada permanece vazia, com um valor predefinido imutável `hold`. Uma entrada elegível requer a sua referência de evidência, a revisão do modelo, o SHA exato do candidato, o digest do manifesto e dois IDs de execução distintos; contextos contraditórios são rejeitados. Estes metadados constituem um contrato de auditoria, não uma prova de que um ficheiro referenciado contém medições genuínas. Reveja os recibos efetivos antes de adicionar qualquer entrada. O endpoint de estatísticas de gestão e o dashboard de Vídeo expõem uma prontidão conservadora. Um alias de modelo configurado, por si só, não estabelece a sua revisão nem o SHA do candidato em execução, pelo que o dashboard atual comunica `HOLD` em vez de reutilizar a elegibilidade de outro contexto de execução. A seleção experimental explícita permanece separada da promoção; nenhuma predefinição é alterada automaticamente.

Os clientes podem anexar uma matriz opcional `transcript.cues` a uma
parte de vídeo suportada quando já possuem texto alinhado. Cada indicação tem
de incluir `text`, um intervalo finito `start`/`end` dentro da duração
detetada e uma `source` permitida (`client`, `embedded` ou `audio-bridge`);
`confidence` assume `1` por predefinição e tem de permanecer entre `0` e `1`.
As indicações exatamente duplicadas são consolidadas. O OmniRoute nunca inicia
a transcrição a partir destes metadados: as indicações validadas são copiadas
para o resultado descrito com a origem, a confiança e o intervalo, e são
apresentadas como observações não fidedignas juntamente com as legendas dos
fotogramas. Texto inválido, fora do intervalo ou sem proveniência é rejeitado,
em vez de ser misturado no fluxo de legendas. Ambos os canais de transcrição
do corpo do pedido normalizam a proveniência fornecida para `client`, incluindo
rótulos `embedded` ou `audio-bridge` autodeclarados. Apenas um adaptador
controlado pelo servidor pode atribuir esses rótulos fidedignos através do
argumento exclusivo de código `trustedSource`; um campo JSON do pedido não
pode chegar a esse argumento. O texto da transcrição continua a ser conteúdo
não fidedigno derivado de multimédia, independentemente da sua proveniência, e
nunca pode determinar a autorização.

Um cliente avançado pode fornecer uma faixa `audioTranscript` para o mesmo
vídeo; esta é tratada como texto fornecido pelo cliente, não como prova de
transcrição efetuada pelo servidor. O ponto de integração executa as
observações visuais e de áudio sob o mesmo prazo e sinal de cancelamento,
ordena-as numa linha temporal comum, consolida duplicados exatos e comunica
um resultado parcial quando apenas um dos lados é bem-sucedido. Um
`audioTranscript` inválido degrada para esse resultado parcial — a descrição
visual é mantida e o ramo de áudio regista um código de falha sanitizado — em
vez de fazer falhar todo o vídeo. A disponibilidade por ramo, o sinalizador de
resultado parcial e os códigos de falha sanitizados são preservados no
resultado descrito, nos metadados do mecanismo de proteção
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nos
metadados da cache de resultados e nos contadores de fusão da ponte. O caminho
predefinido do Video Bridge não invoca conversão de voz em texto nem transfere
uma segunda cópia da multimédia; sem essa faixa explícita, continua a ser
exclusivamente de vídeo.

**Retenção de transcrições (#12150 P1).** Isto aplica-se automaticamente
sempre que o Video Bridge (que requer ativação explícita) apresenta uma
indicação de transcrição — não existe um sinalizador de retenção separado.
Quando um pedido apresenta qualquer indicação de transcrição (um
`transcript` declarado pelo cliente ou um `audioTranscript` fundido), o
mecanismo de proteção marca-o como `videoBridgeObserved` e produz uma cópia
sombra redigida da descrição do vídeo — uma apresentação idêntica na qual o
corpo de texto livre de cada indicação é substituído por
`[redacted-video-transcript]`, através da substituição do campo estruturado da
indicação antes de a cadeia ser montada (nunca através da análise do texto
achatado, para que nenhum conteúdo da indicação — adversarial ou normal,
incluindo corpos que contenham `]`, como `[inaudible]`/`[music]` — possa
sobreviver). O corpo do pedido no registo de chamadas persistido substitui
cada parte de texto derivada do vídeo por essa cópia sombra redigida, associada
por igualdade de conteúdo; a âncora `fullText` é relida a partir do payload
final do pedido do mecanismo de proteção anterior à chamada, pelo que a
correspondência continua a ter sucesso depois de mecanismos de proteção
posteriores da cadeia (os mascaradores de PII e credenciais, com prioridades
10/95) reescreverem o texto da descrição no local e depois de a injeção de
prompt do sistema/transferência/memória remodelar a matriz de mensagens. O
corpo enviado a montante para o modelo permanece inalterado. Um pedido
observado também não preenche qualquer Memory persistente (a extração
derivada tanto do pedido como da resposta é ignorada), pelo que a própria
resposta do modelo não pode repetir texto da transcrição na Memory.

**Campos de vídeo não processados (#12430).** Quando a ponte está ativada e o
suporte nativo de vídeo é desconhecido ou inexistente, os campos
`transcript`/`audioTranscript` definidos também ativam `videoBridgeObserved`,
mesmo após uma falha de descrição ou um limite `maxVideos`. `null` e cadeias
vazias contam; campos ausentes e metadados que não sejam de vídeo não contam.
As cópias retidas redigem estes campos ou omitem o pedido, e as caches/Memory
são ignoradas.

Nesses caminhos de recurso alternativo, as indicações válidas do cliente
tornam-se partes `text`/`input_text` suportadas, em vez de campos não padrão
do fornecedor. Ambas as faixas fornecidas no pedido permanecem observações
`client` não fidedignas, com um aviso explícito de que o vídeo não foi
descrito e de que os carimbos temporais não foram verificados relativamente à
multimédia. Os limites existentes de 256 indicações/64 KiB no total e por
indicação aplicam-se conjuntamente às duas faixas; os carimbos temporais têm
de respeitar o limite de 600 segundos do broker e qualquer janela de foco
fornecida. As faixas inválidas são descartadas, não encaminhadas como texto
arbitrário; um elemento irmão válido pode ainda ser utilizado, exceto se o
limite combinado for excedido. Os campos nulos/vazios não adicionam texto.
Este recurso alternativo não adiciona qualquer obtenção de multimédia nem
transcrição. Os campos de extensão da transcrição são removidos do contentor
de vídeo alternativo e dos respetivos objetos `video_url`/`source`. A lista de
permissões do protocolo OpenAI mantém-se rigorosa; os contentores de vídeo
nativos desconhecidos continuam disponíveis e os destinos conhecidos apenas
de texto mantêm marcadores seguros. As cópias sombra de redacção estruturada
protegem o texto da transcrição acrescentado, enquanto o pedido original
propriedade do cliente permanece inalterado. Os destinos com suporte nativo e
as pontes desativadas mantêm o comportamento de bypass existente.

As cópias retidas adicionais utilizam o mesmo sinal de pedido observado. O
snapshot bruto do pedido do cliente anterior ao mecanismo de proteção, o
pedido pendente em memória e o registo antecipado de pedidos rejeitados
substituem estruturalmente os campos de transcrição nas partes de vídeo; os
prompts de cadeia sintetizados pelas fases do pipeline e pela transferência
de contexto são redigidos no ponto de persistência do corpo do pedido. O
marcador persistido `video_content_removed` faz com que a continuação
`previous_response_id` falhe de forma segura, em vez de reconstruir texto que
foi intencionalmente descartado. Se um pedido observado perder a sua cópia
sombra de redacção por parte antes do registo, ou se mesmo uma de várias
cópias sombra de vídeo não corresponder após mutações posteriores do pedido, o
corpo do pedido retido é totalmente omitido, em vez de conservar uma
transcrição parcialmente redigida.

Para um pedido observado, uma resposta do modelo pode citar qualquer parte da
transcrição sem um limite estruturado que indique a sua separação. O seu
`responseBody` persistido no registo de chamadas é, por isso, substituído por um marcador de omissão; o artefacto detalhado do pipeline (que pode incluir corpos do upstream/cliente e blocos do fluxo) não é retido. As caches semântica, de idempotência e de repetição do raciocínio ignoram leituras e escritas para esse pedido. O pedido ao fornecedor e a resposta visível para o cliente permanecem inalterados. Os bytes iniciais de keepalive são drenados do buffer temporário quando o artefacto detalhado é omitido. O aviso de EventStream malformado do Kiro comunica apenas a contagem de bytes do payload, nunca o seu conteúdo nem o erro bruto do analisador JSON.
Isto não afirma que todos os diagnósticos não relacionados do fornecedor/plugin tenham sido auditados; a verificação mais abrangente dos destinos retidos é acompanhada em #11658.

O ciclo de vida interno de `/api/modality-bridge/video/drilldown` é um substrato de cache separado, autenticado por token e restrito ao loopback. Cada operação também requer um ID opaco canónico do principal. Antes de um chamador de produção ser ativado, tem de derivar esse ID a partir do tenant autenticado e nunca deve encaminhar um valor escolhido pelo cliente. As chaves da cache associam esse principal a IDs canónicos de sessão e de referência de vídeo, armazenam apenas as respetivas chaves derivadas de SHA-256 e restringem tanto as leituras como a eliminação ao mesmo principal. A cache armazena no máximo 16 fotogramas JPEG derivados por entrada, expira-os ao fim de dez minutos e suporta leituras `start`/`end` limitadas ou a eliminação explícita de uma sessão.

Cada principal está limitado a 16 entradas e 64 MiB de dados JPEG canónicos. Esses limites são independentes do teto global de 64 entradas/256 MiB: a pressão da quota do principal remove apenas as entradas desse principal usadas menos recentemente antes de ser considerada a remoção LRU global. As entradas expiradas são removidas da contabilidade do principal e global durante a atividade da cache, enquanto o cancelamento e a falha de validação não confirmam uma substituição parcial.

A cache rejeita Base64 não canónico, padding excessivo, conteúdo multimédia que não seja JPEG, JPEGs malformados ou truncados e JPEGs que produzam um aviso durante uma descodificação limitada da imagem completa com `sharp`. Volta a codificar cada imagem aceite como um JPEG canónico, deriva a largura e a altura a partir dos bytes descodificados em vez de confiar nos campos fornecidos pelo chamador e descarta quaisquer bytes poliglotas finais, em vez de os reter. Apenas o buffer comprimido canónico limitado é contabilizado em ambas as quotas. O limite JSON da comunicação inclui o overhead do Base64 para o teto de 32 MiB de entrada descodificada. Cada derivação armazenada regista o formato/resolução JPEG validados, a política de amostragem, a versão da derivação, a hora de criação, o hash do conteúdo calculado pelo servidor e a referência principal com hash, juntamente com o hash do conteúdo principal fornecido pelo chamador confiável. O cancelamento é verificado entre as fases assíncronas de descodificação/hash antes da confirmação atómica da cache.

O produtor de produção reutiliza fotogramas do broker já derivados apenas após uma análise visual bem-sucedida, sem uma segunda transferência/extração do vídeo. Requer `modalityBridgeVideoDrilldownEnabled=true` definido pelo operador, `drilldown: true` estrito por parte e um ID de registo de chave de API autenticado. Os valores de principal/sessão declarados pelo cliente nunca estabelecem a propriedade. Sem as três condições, não calcula o hash, redimensiona nem retém fotogramas adicionais. Uma falha de retenção preserva a resposta visual utilizável. Os pedidos com consentimento ignoram a cache de resultados do vídeo completo, para que os resultados armazenados em cache nunca reproduzam identificadores.

As respostas JSON e SSE bem-sucedidas expõem no máximo quatro identificadores opacos no cabeçalho `x-omniroute-video-drilldown`. As origens de navegador autorizadas podem ler esse cabeçalho sem alargar a política de origem CORS. Os novos identificadores usam `v1.<32-byte random base64url token>`, e o registo retém apenas os seus hashes SHA-256. O leitor/analisador de cabeçalhos também aceita tokens hexadecimais de 64 caracteres legados. O consumidor público autenticado é
`GET /api/v1/video-bridge/drilldown?handle=...`, protegido independentemente por `modalityBridgeVideoDrilldownRemoteEnabled=true`. Um valor persistido explicitamente como false revoga o acesso mesmo quando o fallback da variável de ambiente legada `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` está ativado. A retenção em produção tem o fallback legado análogo `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Ambos os fallbacks estão desativados por predefinição.

O consumidor deriva a propriedade a partir da chave autenticada e aplica a política da chave:
tanto GET como DELETE pertencem à categoria de endpoint `video`, incluindo os aliases `/v1`
e `/api/v1`. As chaves com uma lista de permissões de endpoints não vazia têm de incluir `video`;
as chaves sem restrições permanecem compatíveis. O consumidor devolve o mesmo 404 para identificadores desconhecidos, expirados e pertencentes a outra chave. Aceita
`variant=preview|standard|detail` (dimensão JPEG máxima de 320/640/1280, nunca ampliada),
`limit=1..8` (ou o alias legado `frames`, nunca ambos), `page` indexado a partir de zero e `start`/`end` opcionais para os segundos de foco. As chaves de consulta duplicadas e as janelas de foco invertidas são rejeitadas. Cada variante devolvida tem um hash do seu conteúdo efetivo e metadados da resolução efetiva, associados à fonte retida. As variantes são derivadas durante a leitura, em vez de serem armazenadas como cópias retidas adicionais. A resposta JSON, incluindo Base64/envelope, está limitada a 32 MiB; uma página demasiado grande devolve 413 e o cliente tem de solicitar menos fotogramas. As leituras verificam o cancelamento em torno de cada redimensionamento e voltam a verificar a validade do identificador antes de devolver os resultados. `DELETE` pelo proprietário é idempotente; a eliminação ou a expiração do TTL liberta a fonte retida e a contabilização da utilização.

O armazenamento partilhado é local ao processo: os identificadores expiram após um reinício e não são transferíveis entre processos OmniRoute independentes. As estatísticas de gestão expõem a política efetiva de retenção/acesso remoto e apenas o agregado de entradas/bytes retidos, nunca conteúdos multimédia, referências, IDs de principais ou identificadores. O painel de definições de Vídeo apresenta esses valores e pode persistir ambos os controlos de consentimento. Esta documentação da implementação não constitui evidência de implementação ou promoção em produção; a aceitação com modelos reais é acompanhada separadamente.

Os frames são legendados sequencialmente com o modelo de vídeo configurado. Uma substituição
de vídeo vazia herda a definição de Visão; se ambas estiverem vazias, o
encaminhador automático de Visão seleciona o modelo efetivo com capacidade de visão. As
legendas bem-sucedidas substituem a parte original por um prefixo estável `[Video description:`
que também marca o texto como uma observação não fidedigna derivada de multimédia e indica aos
modelos a jusante que não devem seguir instruções encontradas na multimédia. As chaves da
cache de legendas de frames incluem os bytes JPEG, o prompt, o carimbo temporal e o modelo
efetivo; apenas as legendas bem-sucedidas são colocadas em cache. As entradas da cache
retêm o modelo produtor efetivamente bem-sucedido, incluindo um modelo de fallback; a ponte
reporta `mixed` quando diferentes frames foram produzidos por modelos diferentes. Um acesso
à cache reutiliza a identidade desse produtor, em vez de a rotular novamente como o plano de
encaminhamento solicitado. A cache de resultados do vídeo completo é indexada por todos os
dados de entrada que alteram o resultado — prompt, modelo efetivo, política de amostragem,
número de frames, modo de análise semântica, a impressão digital SHA-256 da sugestão de foco
normalizada, janela de foco, `transcript`,
`audioTranscript` e o sinalizador da folha de contacto — pelo que alterar qualquer uma dessas
dimensões provoca uma falha de cache, nunca uma reutilização obsoleta. A versão da política
de deduplicação visual, o limiar e o número limitado de frames candidatos também são explícitos
na chave e nos metadados da cache de resultados; uma alteração da política não pode, portanto,
reutilizar uma descrição obsoleta do vídeo completo. Os metadados da cache de resultados v4
mantêm o modo e a impressão digital, nunca a tarefa bruta do utilizador. Os metadados das
proteções reportam tanto os modos de análise solicitado como efetivo; um modo `focused`
solicitado sem texto utilizável do utilizador é reportado efetivamente como `full`.

A proteção extrai todas as partes de vídeo suportadas, mas descreve no máximo
`modalityBridgeVideoMaxVideos`. Para um destino comprovadamente com
`supportsVideo === false`, os vídeos que falharam e os que excedem o limite tornam-se
marcadores de texto seguros explícitos, para que nenhum vídeo bruto sobreviva. Quando a
capacidade é desconhecida, essas partes mantêm o respetivo suporte de vídeo; qualquer
transcrição alternativa segue a conversão de texto limitada acima. Os destinos com
`supportsVideo === true` ignoram a ponte.
O sinal de aborto do pedido do cliente propaga-se pela transferência, fila do broker,
subprocessos e chamadas de legendagem; os abortos interrompem o processamento entre vídeos e
nunca permitem a passagem de multimédia bruta.

As definições de runtime são suportadas pela BD e validadas com Zod:

| Chave                               | Predefinição | Intervalo / comportamento                                                                                          |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`      | Runtime opcional, ativação explícita                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` preserva legendas genéricas; `focused` utiliza contexto limitado e não fidedigno do utilizador mais recente |
| `modalityBridgeVideoModel`          | `""`         | Herda o modelo da ponte de Visão                                                                                   |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` ou proporcional `segment_aware`; uma falha do detetor recorre a `uniform`                 |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                     |

Os valores de timeout de vídeo persistidos legados superiores a 120 segundos são limitados ao
prazo do broker; as novas gravações de definições acima desse limite são rejeitadas.
`GET /api/modality-bridge/video/runtime` exige uma localidade de loopback carimbada e fidedigna
antes da autenticação ou da sondagem do runtime, exigindo depois autenticação de gestão.
Devolve apenas `available`, versões sanitizadas do FFmpeg/ffprobe e um motivo fixo quando o
runtime não está disponível. O endpoint interno de extração não é uma API pública de
carregamento: a saturação da fila devolve `503` juntamente com `Retry-After`, uma
desconexão do chamador devolve `499` e o prazo fixo do broker devolve `504`. As respostas
convertidas adicionam
`video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central
`x-omniroute-modality-bridge`, sem remover os segmentos de Visão ou Áudio.

### Mascarador de PII (`piiMasker.ts`)

É executado em **ambas** as fases.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e
  `prompt` (incluindo itens de strings simples) e aplica `processPII()` (de
  `@/shared/utils/inputSanitizer`) aos campos `content`/`text` de tipo string. Quando
  `PII_REDACTION_ENABLED=true`, a PII detetada é ocultada no payload de saída. Isto é
  independente de `INPUT_SANITIZER_MODE` (que controla apenas a política de injeção de
  prompts). Quando a ocultação está desativada, a chamada regista as contagens de deteções
  sem reescrever o conteúdo.
- **`postCall`** clona profundamente a resposta, executa `sanitizePIIResponse()` juntamente
  com o mascarador da estrutura da API Responses (`maskResponsesOutput` — abrange
  `output_text` e `output[].content[].text`). Se ocorrer qualquer ocultação, a resposta
  modificada substitui a original.

A proteção nunca bloqueia; apenas anota (`meta.detections`,
`meta.redacted`) ou reescreve.

**Cofre reversível (`PII_REVERSIBLE_VAULT_ENABLED`, predefinição `false`).** Quando
`PII_REDACTION_ENABLED` e `PII_REVERSIBLE_VAULT_ENABLED` estão ambos ativos (substituição na BD >
ambiente > predefinição, lida uma vez por pedido), `handleChat` abre um cofre por
pedido do cliente (`src/lib/pii/requestTokenVaultScope.ts`) e passa-o à fase
pré-chamada como `GuardrailContext.tokenVault`. O mascarador escreve então tokens
substitutos como `<<PII_EMAIL_QWERTYUI_1>>` em vez de `[EMAIL_REDACTED]`, tanto
para regras integradas e validadas (GDPR/POPIA) como para regras personalizadas. O
nonce consiste em 8 letras maiúsculas aleatórias por pedido, e o mesmo valor
recebe o mesmo token dentro do pedido. Apenas o mascarador cria tokens: a
proteção contra injeção de prompts e `/api/guardrails/test` são executados
sem cofre e mantêm os marcadores de posição.

- O fornecedor, cada componente de uma combinação, cada nova tentativa, cada
  membro do painel de fusão e o juiz de fusão veem apenas tokens. Os tokens são
  restaurados uma vez, na resposta 2xx que sai de `handleChat`: por campo no SSE
  analisado (um token dividido entre eventos continua a ser resolvido; os
  argumentos de chamadas de ferramentas têm escape JSON) ou por campo num corpo
  JSON, com um `Content-Length` recalculado. O conteúdo e o texto de raciocínio,
  bem como os argumentos de chamadas de ferramentas, são restaurados. Os corpos
  de erro (4xx/5xx) mantêm os tokens.
- As falhas permanecem privadas: se a criação falhar ou o cofre recusar um valor
  (1000 entradas, 256 caracteres por valor, 64 KB no total), é escrito o
  marcador de posição; um token que o cofre não consiga resolver, ou uma
  restauração que falhe, permanece literal e apenas é registada uma contagem. O
  cofre não contém temporizadores nem estado global; é limpo quando o fluxo de
  resposta termina, é cancelado ou apresenta um erro.
- Quando um pedido criou tokens, a extração de memória, o armazenamento da
  idempotência e ambas as escritas da cache semântica são ignorados, porque
  nenhum pedido posterior poderia resolver esses tokens. Nos registos de
  chamadas, o pedido e a resposta do fornecedor contêm tokens; o corpo do
  pedido do cliente registado continua a ser a entrada bruta do cliente, tal
  como acontece com a redação simples.
- Os tokens utilizam um nonce aleatório por pedido, pelo que o prefixo do prompt
  muda a cada turno: a colocação em cache de prompts do lado do fornecedor não
  ocorre em turnos mascarados, e um token que regresse num turno posterior (por
  exemplo, através de `previous_response_id`) pertence a um pedido antigo e
  permanece literal.

#### Seleção por tipo, padrões personalizados e contadores de deteção

**Dashboard → Definições → Segurança → Mascaramento de PII** escolhe _o que_ é
mascarado. Não ativa o mascaramento: essa função continua a ser controlada por
`PII_REDACTION_ENABLED` (pedido) e `PII_RESPONSE_SANITIZATION` (resposta + SSE),
ambos desativados por predefinição.

- **Seleção por tipo** — os ids integrados estão listados em
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa todos os
  tipos (o comportamento anterior à existência desta definição). O padrão
  `ssn_us` do motor de pedidos é mapeado para `ssn`. Os modelos (Minimal,
  Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) apenas preenchem as
  caixas de seleção na IU.
- **Identificadores GDPR e POPIA** — doze ids integrados que abrangem
  identificadores pessoais da UE e da África do Sul (tabela abaixo). As suas
  expressões regulares, validadores e etiquetas de jurisdição encontram-se numa
  única tabela, `src/shared/utils/piiPatterns.ts`, consumida tanto pelo
  sanitizador de respostas (`src/lib/piiSanitizer.ts`) como pelo mascarador de
  pedidos (`src/shared/utils/inputSanitizer.ts`). Uma correspondência só é
  redigida quando o respetivo validador a aceita; uma simples sequência de
  algarismos nunca é suficiente. Um operador que tenha guardado uma seleção
  reduzida antes de estes ids existirem mantém o comportamento que tinha até
  selecionar os novos ids.
- **Padrões personalizados** — até 20 padrões de expressões regulares ou
  carateres globais (`*` = até 64 carateres sem espaços em branco, `?` = um).
  As correspondências tornam-se `[CUSTOM_REDACTED]`. Cada padrão passa por
  `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): no máximo 500 carateres, flags
  limitadas a `g i m s u`, tem de compilar, passar `safe-regex` (retrocesso
  catastrófico) e não corresponder a uma cadeia vazia nem a um marcador de
  posição de redação. Um padrão que falhe é recusado ao ser guardado e testado,
  e uma linha armazenada que falhe é ignorada em tempo de execução em vez de
  ser compilada. Os padrões personalizados só são executados enquanto o
  mascaramento estiver ativo.
- **Contadores de deteção** — contagens por tipo (nunca os valores encontrados),
  mantidas em memória e repostas ao reiniciar (`src/lib/pii/piiDetectionStats.ts`).
  Só aumentam enquanto o mascaramento estiver ativo.

As definições encontram-se na tabela `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) e são lidas através de uma cache de 1 s. API:

| Método | Caminho                  | Finalidade                                                                                        |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado da flag, `enabledTypes`, `customPatterns`, contadores de deteção                           |
| `PUT`  | `/api/settings/pii`      | Substituir `enabledTypes` (`null` = todos) e/ou `customPatterns`                                  |
| `POST` | `/api/settings/pii/test` | Testar uma execução a seco de um padrão contra uma amostra de, no máximo, 8 KB; nada é armazenado |

Os três requerem autenticação de gestão e validam o corpo com Zod
(`src/shared/validation/schemas/piiSettings.ts`). Com o início de sessão
desativado (`requireLogin=false`), `GET` e o endpoint de teste estão abertos,
mas `PUT` continua a exigir uma sessão do dashboard, uma chave de API com
âmbito `manage`, um token de acesso `oma_` com âmbito de escrita ou superior,
ou o token da CLI ou o token de serviço interno enviado a partir do loopback.

#### Identificadores GDPR (UE) e POPIA (África do Sul)

| Id                  | Identificador                        | Validação                                                                                 |
| ------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `iban`              | IBAN                                 | País conhecido, comprimento exato para esse país, ISO 13616 MOD-97-10                     |
| `eu_vat`            | Número de IVA da UE                  | Prefixo de Estado-Membro conhecido e formato numérico desse Estado (sem consulta VIES)    |
| `es_dni_nie`        | DNI / NIE espanhol                   | Letra de controlo (valor mod 23); NIE é `X/Y/Z` + 7 dígitos                               |
| `it_codice_fiscale` | Codice Fiscale italiano              | Letra de controlo obtida a partir das tabelas de posições ímpares/pares                   |
| `pl_pesel`          | PESEL polaco                         | Soma de verificação ponderada e data de nascimento codificada existente                   |
| `nl_bsn`            | BSN neerlandês                       | Prova dos 11 (pesos 9..2, -1)                                                             |
| `de_steuer_id`      | Steuer-ID alemão                     | ISO 7064 Mod 11,10, além das regras de estrutura dos dígitos (sem 0 inicial)              |
| `se_personnummer`   | personnummer sueco                   | Luhn nos últimos dez dígitos e data de nascimento plausível (10 ou 12 dígitos)            |
| `za_id`             | Número de identificação sul-africano | Luhn nos 13 dígitos, mês/dia de nascimento válidos, dígito de cidadania 0 ou 1            |
| `za_phone`          | Telefone sul-africano                | Prefixo `+27` / `27`, ou formato nacional `0..` escrito com um espaço ou hífen            |
| `za_vat`            | Número de IVA sul-africano           | 10 dígitos começados por `4` **e** "VAT" / "BTW" nos 48 caracteres anteriores             |
| `za_tax_ref`        | Referência fiscal sul-africana       | 10 dígitos começados por `0`-`3`, Luhn, **e** "tax" / "SARS" nos 48 caracteres anteriores |

Como os formatos constituídos apenas por dígitos colidem com números de
encomenda, números de compilação e marcas temporais, os mais fracos
(`za_vat`, `za_tax_ref`) precisam da palavra-chave indicadora, e um número
`0..` de dez dígitos isolado não é tratado como um número de telefone
sul-africano. IBANs com espaços (`GB29 NWBK ...`) não são correspondidos. No
caminho de transmissão, a indicação é procurada apenas no bloco atual. Os ids
são avaliados antes dos padrões genéricos de telefone, pelo que um identificador
validado mantém o seu próprio marcador
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Os modelos `gdpr` e `popia`
selecionam os ids da UE e da África do Sul, respetivamente. A própria
mascaragem continua a ser opcional (Regra rígida #20): nada aqui altera o
valor predefinido de um sinalizador de funcionalidade.

### Injeção de prompts (`promptInjection.ts`)

Deteta estruturas adversariais no conteúdo fornecido pelo utilizador e aplica a
política configurada. O comportamento é controlado por variáveis de ambiente e
opções do construtor:

| Definição          | Variável de ambiente                                                                                 | Predefinição | Efeito                                                                                                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ativado            | `INPUT_SANITIZER_ENABLED`                                                                            | `true`       | Quando é `false`, a proteção termina imediatamente.                                                                                                                                                               |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`       | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceite para compatibilidade retroativa, mas **não** remove o texto de injeção; a reescrita de PII do pedido é controlada por `PII_REDACTION_ENABLED`.) |
| Limiar de bloqueio | Opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Gravidade mínima necessária para bloquear. Por predefinição, a gravidade média é apenas observada.                                                                                                                |

**Precedência do modo** (`getMode`): `options.mode` do chamador →
substituição da funcionalidade na DB `INJECTION_GUARD_MODE` (Dashboard →
Settings → Feature Flags) → variável de ambiente `INJECTION_GUARD_MODE` →
variável de ambiente `INPUT_SANITIZER_MODE` → `warn`. Uma substituição no
dashboard prevalece, portanto, sobre as variáveis de ambiente, o que permite à
interface Feature Flags controlar a proteção em execução de forma dinâmica
(sem reinício). A leitura da DB é à prova de falhas: se ocorrer um erro, a
proteção recorre ao comportamento baseado nas variáveis de ambiente e, quando
não existe nenhuma substituição, o comportamento é idêntico ao da resolução
apenas por variáveis de ambiente.

Fontes de deteção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto partilhado
   de detetores utilizado noutros pontos do pipeline).
2. `DEFAULT_GUARD_PATTERNS` incorporado (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com gravidade `high`).
3. `customPatterns` opcional transmitido através das opções do construtor
   (strings, expressões regulares ou registos `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma deteção atinge o limiar de
gravidade, `preCall` devolve `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, a proteção regista o
evento, mas permite a chamada. O auxiliar partilhado
`evaluatePromptInjection()` também é exportado para os chamadores que precisam
de avaliar prompts sem passar pelo registo.

**Limite de análise (v3.8.20):** o detetor inspeciona apenas os **primeiros 16 KB** do texto do prompt combinado — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) em `src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` como `evaluatePromptInjection()` aplicam `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de executar o ciclo de padrões. As diretivas de injeção encontram-se perto do início de uma entrada, pelo que isto limita o consumo de CPU/GC das expressões regulares em payloads de várias centenas de KB sem enfraquecer a deteção (cf.
#3932, #4041).

### Mascarador de credenciais (`credentialMasker.ts`)

É executado em **ambas** as fases, em último lugar na cadeia predefinida (prioridade `95`). Redige padrões conhecidos de chaves de API / tokens secretos do payload de saída (conteúdo da mensagem, argumentos de chamadas de ferramentas, resultados de ferramentas) **e** da resposta do fornecedor, para que uma credencial colada num prompt (ou devolvida por um resultado de ferramenta) não seja divulgada ao fornecedor upstream nem de volta ao cliente.

- **Apenas mediante ativação explícita**, seguindo a mesma convenção da redação de dados PII (junto à Regra rígida #20): está desativado, exceto quando `settings.credentialRedactionEnabled === true` **ou** `CREDENTIAL_REDACTION_ENABLED=true`. Quando está desativado, o mecanismo de proteção não faz nada — nunca bloqueia nem reescreve.
- `redactCredentials()` percorre a árvore completa do payload/resposta (`walkValue()`), com proteção contra poluição do protótipo e segurança contra ciclos através de `WeakSet`, e substitui as correspondências por um marcador `[REDACTED:<type>]`, clonando apenas os ramos que foram efetivamente alterados.
- `CREDENTIAL_PATTERNS` abrange chaves de fornecedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves de serviços cloud (chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves privadas / JWTs, cadeias de ligação que contêm credenciais (`mongodb://user:pass@...`, etc.) e um padrão genérico de valores de cabeçalhos `Authorization`/`x-api-key`/`api-key`/`apikey`. As chaves em formato de cabeçalho (`authorization`, `x-api-key`, `api-key`, `apikey`) são redigidas estruturalmente (apenas o valor, preservando o prefixo do esquema, como
  `Bearer `/`Basic `), em vez de através da expressão regular de texto genérica.
- O mecanismo de proteção nunca bloqueia; apenas reescreve (`modifiedPayload` /
  `modifiedResponse`) e anota (`meta.credentialsRedacted`, `meta.count`).

Proteção de regressão: `tests/unit/credential-masker-guardrail.test.ts`.

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

O registo de guardrails está ligado apenas ao pipeline de chat. Estes limites são
fixados por `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` e
`tests/unit/guardrail-pipeline-characterization.test.ts`; atualize esses testes
deliberadamente quando o comportamento mudar.

### Onde são executados os hooks

| Hook / controlo                                | É executado em                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                              | Pedidos processados por `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (e `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` e o proxy de chat do Telegram. Também o endpoint de teste do dashboard `/api/guardrails/test`. Um bloqueio pré-chamada devolve HTTP 400. |
| `runPostCallHooks`                             | Apenas respostas de chat **sem streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). As respostas em streaming nunca chegam a este hook.                                                                                                                                                                                                                                                                                         |
| PII em streaming                               | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), ligado por pipe em `streamingPipeline.ts` quando `PII_RESPONSE_SANITIZATION` está ativo. Não é um guardrail, pelo que os canais de desativação não o afetam.                                                                                                                                                                                                                     |
| Cofre de PII reversível                        | Apenas pedidos processados por `handleChat`, quando `PII_REDACTION_ENABLED` e `PII_REVERSIBLE_VAULT_ENABLED` estão ativos. Os tokens são gerados pelo pre-call de `pii-masker` e restaurados na saída de `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Desativar `pii-masker` para um pedido significa que nada é gerado.                                                                                                            |
| Middleware de proteção contra injeção (legado) | Todas as rotas `/v1` que contêm prompts, incluindo a família de chat (consulte [cobertura das rotas](#injection-guard-route-coverage--red-team-phase-8--block-d)). Apenas injeção de prompts.                                                                                                                                                                                                                                                  |

### O que não está abrangido

- **Rotas de multimédia, embeddings e dados** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nunca chegam ao registo. Não
  são executados o mascaramento de PII, o mascaramento de credenciais nem a
  ponte de modalidades. A única verificação que recebem é a do middleware
  legado de proteção contra injeção.
- **As respostas em streaming** não recebem guardrails pós-chamada: não há
  `pii-masker` ou `credential-masker` pós-chamada, nem bloqueio pós-chamada. Só
  se aplica a transformação de PII em streaming (quando
  `PII_RESPONSE_SANITIZATION` está ativo). Uma credencial devolvida numa resposta
  em streaming não é redigida.
- **Canais de desativação vs. middleware (por conceção):** o middleware avalia
  a injeção de prompts através da sua própria chamada a
  `evaluatePromptInjection()`, sem transmitir qualquer lista de desativação
  controlada pelo chamador. O modo `block` é uma fronteira obrigatória que as
  desativações controladas pelo chamador não podem contornar, incluindo nas rotas
  da família de chat ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  Desativar `prompt-injection` apenas ignora o guardrail do registo.

### O que vê uma resposta antes da pós-chamada

No caminho sem streaming, a ordem é: extração de memória → execução de
ferramentas integradas → guardrails pós-chamada → saída de bloqueio pós-chamada →
armazenamento na cache semântica.

- A **extração de memória** e a **execução de ferramentas** veem a resposta antes
  de os guardrails pós-chamada poderem reescrevê-la ou bloqueá-la. Desde o
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), a extração de
  memória executa o texto extraído através de `sanitizePII` quando
  `PII_RESPONSE_SANITIZATION` está ativo (tanto em streaming como sem streaming),
  mas uma resposta que seja posteriormente bloqueada na pós-chamada já foi
  disponibilizada à memória e às ferramentas.
- A **cache semântica** armazena a resposta depois da pós-chamada, pelo que
  armazena a resposta reescrita, e uma resposta bloqueada nunca é colocada em
  cache. As entradas da cache são associadas por chave de API.

## Configuração

Variáveis de ambiente lidas pelos mecanismos de proteção integrados:

| Variável                              | Utilizada por              | Efeito                                                                                                                                  |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Defina como `false` para desativar completamente a deteção.                                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Política de injeção: `warn`, `block` ou `log`. O valor legado `redact` não reescreve o texto da injeção.                                |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modo do mecanismo de proteção contra injeções; também é uma funcionalidade da BD que **substitui** as variáveis de ambiente (BD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Gravidade mínima que `MODE=block` rejeita: `high` (predefinido), `medium` ou `low`.                                                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias legado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                      |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Quando `true`, a PII do pedido é ocultada (independentemente do modo de injeção).                                                       |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Com `PII_REDACTION_ENABLED`, gera tokens reversíveis e restaura-os em respostas 2xx.                                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (a jusante)   | Controla o comportamento do ocultador no lado da resposta.                                                                              |

Os mecanismos de proteção do Modality Bridge leem a configuração de runtime do
arquivo de definições suportado pela BD (`getSettings()`), e não das variáveis de ambiente. As chaves
principais do Vision são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceites apenas como recurso documentado de fallback de leitura durante um ciclo;
as escritas do dashboard utilizam as chaves principais. Os valores predefinidos e o
resolvedor de fallback encontram-se em
`src/shared/constants/modalityBridgeDefaults.ts`, com as constantes legadas mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O Audio utiliza `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, além das
definições partilhadas `modalityBridgeCache*`. O Audio não tem fallback para chaves legadas,
porque estas chaves foram introduzidas com o esquema do Modality Bridge.

O Video utiliza `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, além das definições partilhadas
`modalityBridgeCache*`. Está desativado por predefinição porque FFmpeg/ffprobe são
dependências operacionais opcionais e a criação de legendas para fotogramas acrescenta
latência e custos de utilização do modelo.

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
