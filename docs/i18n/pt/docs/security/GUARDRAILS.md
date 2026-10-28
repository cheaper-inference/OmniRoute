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

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

O modelo base GLM 5.3 e `glm-5.3-{low,high,max}` têm metadados de
registo/especificação `supportsVision:false` explícitos. As variantes GLM 5.3
Flash continuam a ser modelos com visão nativa. A rota `/v1/messages` do Claude
Code entra na cadeia partilhada de guardrails de pré-chamada `handleChat`
**antes** da tradução de Claude para OpenAI; as imagens aninhadas de resultados
da ferramenta `Read` têm de ser descritas ou tratadas antes de essa tradução as
converter em conteúdo `image_url` da OpenAI (#17069).

Interceta pedidos que transportam imagens destinados a **modelos sem visão** e
reencaminha todo o pedido para um modelo com capacidade de visão, ou substitui
as partes de imagem por descrições em texto produzidas por um modelo de visão
configurável antes da chamada a montante. Isto permite que fornecedores apenas
de texto tratem payloads multimodais de forma transparente.

Fluxo:

1. Ignorar se o modelo de destino já suportar visão (a menos que apareça na
   lista de bridge forçada `isVisionBridgeForcedModel`).
2. Extrair as partes de imagem através de `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega no **detetor unificado de media**
   `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a única fonte de
   verdade partilhada com o filtro de compatibilidade de combos.
   A extração é limitada por allowlist aos formatos que `replaceImageParts`
   consegue voltar a inserir (o contrato extração↔substituição): `image_url`
   da OpenAI, base64 da Anthropic `source.type:"base64"`, URL da Anthropic
   `source.type:"url"` e `input_image` da Responses API. As imagens
   correspondentes aninhadas em `tool_result.content` do Claude Code e nas
   saídas de ferramentas da Responses também são extraídas e substituídas nos
   seus caminhos originais; os formatos apenas indicadores são material do
   filtro de combos e não são extraídos.
   Ignorar se não for encontrada nenhuma.
3. Resolver a configuração de runtime através de
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de
   configuração `modalityBridge*` prevalecem; as chaves legadas `visionBridge*`
   permanecem um **fallback de um ciclo** (janela de rollback). Ignorar antes
   de qualquer travessia de media quando a bridge está desativada.
4. O seletor de modo (`modalityBridgeVisionMode`, ver a tabela abaixo) decide
   entre reencaminhamento e descrição. O reencaminhamento devolve
   `modifiedPayload` apenas com o `model` trocado, mais metadados
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limitar as imagens a `maxImages`, compor o prompt
   adaptado à tarefa, consultar a cache de descrições, chamar o modelo de visão
   **em paralelo** (`Promise.allSettled`) e injetar partes de texto
   `[Image N]: <description>` no lugar das imagens. Uma descrição falhada
   produz `null`: a imagem original é preservada para destinos
   desconhecidos/com capacidade de visão (#4012), mas um **destino direto
   confirmado como apenas de texto** ou um combo sem visão recebe um stub de
   texto explícito `(unavailable — no vision-capable provider connected)` para
   cada imagem não descrita, incluindo falhas parciais e imagens além do limite
   de chamadas de descrição (#17069). O fallback existente de descrição de
   combos quando todas falham permanece em vigor (#8430).
6. Devolver `modifiedPayload` + metadados (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Predefinição | Comportamento                                                                                                                                                                                                                                                                                                                                |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Heurística legada, inalterada (#6640/#7204): os modelos não-combo/`auto/` são reencaminhados para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (nesse caso, descreve); os destinos combo descrevem sempre.                                                                                       |
| `describe` |              | Descreve sempre — o bloco de reencaminhamento é totalmente ignorado; o modelo escolhido pelo utilizador responde sempre.                                                                                                                                                                                                                     |
| `reroute`  |              | Força o reencaminhamento: a proteção que mantém o modelo com credenciais é contornada. A proteção de credenciais do **destino** do reencaminhamento continua a aplicar-se — quando não existe um destino de visão utilizável, a ponte bloqueia com um erro claro em vez de descrever ou enviar imagens em bruto para um destino só de texto. |

Os modos forçados fazem curto-circuito **antes** de a heurística automática ser executada; o comportamento `auto` é byte a byte idêntico ao guardrail anterior ao PR-1.

#### Âmbito da chave de API (`visionBridgeKeyScope.ts`)

Quando a chave de API do chamador restringe `allowedConnections`, pools de quota
(`allowedQuotas`) ou modelos (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a ponte só escolhe
modelos de reencaminhamento e de descrição que a chave pode usar, em ligações
que a chave pode usar. A chamada de descrição passa então sempre pelo self-loop
do OmniRoute com o cabeçalho `x-omniroute-self-loop-key-id`, para que o pedido
de chat recetor aplique novamente a política de ligações e de modelos dessa
chave. O `enforceApiKeyPolicy()` respeita esse cabeçalho apenas em conjunto com
o bearer do self-loop, pelo que só pode restringir o acesso, e um id que não
seja resolvido é rejeitado.

Se não for permitido nenhum modelo de visão para a chave, um **destino
confirmado como só de texto** rejeita o pedido de imagem localmente com um
HTTP 400 claro, em vez de encaminhar bytes de imagem para um upstream incapaz
(#17069). Para destinos com capacidade de visão desconhecida ou nativa, o
caminho de descrição mantém o seu comportamento fail-open anterior (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Os pedidos sem
chave, e as chaves sem estas restrições, comportam-se exatamente como antes.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

Predefinição: **true**. O `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
anexa o texto da **última mensagem do utilizador** (truncado para 500
caracteres) ao prompt base de descrição, orientando a descrição para aquilo que
o utilizador realmente perguntou (padrão codex-vision-proxy) e pedindo ao
modelo de visão que transcreva o texto visível. Com a flag desativada — ou sem
texto do utilizador — o prompt base é usado inalterado.

O pedido compatível com OpenAI do próprio self-loop de descrição
(`callVisionModelSingle()` em `visionBridgeHelpers.ts`) pede sempre
`image_url.detail: "high"` — incondicionalmente, para todos os
chamadores/fornecedores, sem depender de qualquer sinal do cliente. A
amostragem de baixo detalhe degrada a precisão do OCR precisamente na tarefa de
transcrição de texto que este prompt solicita, pelo que a própria chamada de
descrição pede sempre detalhe elevado, independentemente do nível de detalhe
utilizado pelo pedido de entrada original. Isto afeta apenas o corpo do pedido
interno de descrição; não altera a forma como o OmniRoute encaminha o
`image_url.detail` do chamador no pedido principal — essa predefinição é
aplicada separadamente, e apenas para clientes OpenCode detetados, em
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). O ramo
em formato wire da Anthropic do self-loop de descrição não tem campo `detail`
e não é afetado por nenhuma das predefinições.

#### Limite de saída da descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Predefinição | Intervalo        |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` ou 100–50000 |

`0` (predefinição) significa **sem limite** — a descrição devolvida por
`callVisionModel()` é passada inalterada, preservando o comportamento
existente. Qualquer valor no intervalo 100–50000 trunca a descrição com um
sufixo `…` antes de ela ser novamente inserida como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`).
Aumente este valor para tarefas de OCR com muito detalhe em que o modelo a
jusante precisa da transcrição completa; reduza-o para limitar o consumo de
tokens em modelos de visão verbosos. O campo do dashboard fica no painel
Avançado do separador Vision (`modality-bridge-max-chars` em
`ModalityBridgeVisionTab.tsx`) e fixa qualquer valor entre 1 e 99 no mínimo de
100, deixando um `0` explícito intocado — `0` é um valor Zod válido por
direito próprio
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), e não apenas
a predefinição de "não definido".

#### Cache de descrição (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para as saídas de descrição, partilhada por todo o
processo. Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
com enquadramento por prefixo de comprimento (sem colisões nos limites entre
campos). O componente do modelo é o modelo de ponte **configurado**, não o
modelo que realmente respondeu — o `callVisionModel` pode fazer fallback
internamente, e criar chaves por tentativa fragmentaria a cache. As descrições
falhadas nunca são colocadas em cache. Definições:

| Chave                           | Predefinição | Intervalo |
| ------------------------------- | ------------ | --------- |
| `modalityBridgeCacheEnabled`    | `true`       | —         |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000   |

#### Normalização de imagens remotas (obtenção describe/base64 em self-loop)

Quando a bridge obtém ela própria uma imagem **remota** — a autochamada describe da Anthropic e a conversão para base64 no formato claude-wire (`ensureBase64ImagesForClaudeWire`), ambas através de `fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — o data URI resultante é passado por `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) antes de ser incorporado no pedido ao modelo de visão. Imagens demasiado grandes são reduzidas para um **lado mais longo de 2048px** (igualando o limite de redimensionamento que a OpenAI/Anthropic já aplicam no lado do servidor), o que diminui os bytes/a latência de upload sem alterar o que o modelo de visão vê. O redimensionamento usa o `sharp`, carregado através de importação dinâmica: numa plataforma onde o seu binário nativo não consiga ser carregado, `normalizeDataUri()` **nunca lança exceções** — recorre a um passthrough dos bytes originais, pelo que o caminho de describe/conversão para base64 continua sempre a funcionar. Bytes que não sejam de imagem (uma obtenção que não devolveu uma imagem descodificável) também são passados intactos. Esta normalização está limitada às imagens que a bridge obtém para a sua própria autochamada — nunca é aplicada ao payload de passthrough bruto do chamador, em conformidade com o princípio de mutação apenas por opt-in (Regra Rígida n.º 20).

#### Esquema de definições + migração

As novas chaves `modalityBridge*` são validadas com Zod em `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o grupo `modalityBridgeAudio*` usado pelo Audio Bridge. A migração `141_modality_bridge_settings.sql` copia os valores antigos existentes de `visionBridge*` para as novas chaves correspondentes (idempotente, nunca sobrescreve um valor `modalityBridge*` definido pelo operador); as chaves antigas continuam a ser aceites como fallback de leitura durante um ciclo de lançamento.

#### Cabeçalho de transparência + estatísticas

As respostas transformadas por describe transportam `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construído por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`, carimbado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`). Os pedidos reencaminhados **não** recebem cabeçalho — o payload ficou intacto e a troca de modelo já é visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gestão, o mesmo nível de `GET /api/settings`) devolve os contadores em memória por modalidade `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e `video`. `averageLatencyMs` usa `latencySamples`, e não todas as tentativas, como denominador; uma operação sem temporização não fabrica uma amostra de zero milissegundos. `bridged` continua a ser o alias retrocompatível para conversões bem-sucedidas; as tentativas falhadas não o incrementam. Os contadores são repostos no reinício do processo por conceção (telemetria, não contabilidade).

#### Configuração do dashboard

A página dedicada do dashboard é `/dashboard/settings/modality-bridge`. Os seus separadores `Vision`, `Audio` e `Video`, endereçáveis por URL, preservam os parâmetros de query ao mudar o valor de `tab`. O separador Vision expõe a ativação, o modo, a seleção de modelo (incluindo a predefinição automática), o prompting adaptado à tarefa, limites avançados de timeout/imagem/comprimento da descrição/cache, contadores de execução e um pedido de exemplo protegido. O separador Audio também está ativo: expõe a ativação, um seletor de modelos apenas STT com Auto, limites de timeout/duração máxima do clip, contadores de áudio e um teste de exemplo com `input_audio`. O separador Video é funcional: reporta o estado de execução do FFmpeg/ffprobe — um de quatro estados de UI explícitos (`unknown` enquanto a sondagem está em curso ou não pôde ser concluída, `restricted` num anfitrião de dashboard não-loopback onde a sondagem é ignorada do lado do cliente, `unavailable` após sondado e confirmado como em falta, ou `available` com as versões do FFmpeg/ffprobe) — persiste os limites de ativação/modelo/frames/vídeo/timeout, filtra o seletor de modelos para modelos com capacidade de visão e expõe contadores de vídeo.

O antigo cartão Vision Bridge nas definições de IA é uma ligação de compatibilidade para a nova página; já não detém uma segunda cópia do formulário. O Media Providers também liga os fluxos de trabalho Image-to-Text e Speech-to-Text aos separadores correspondentes do Modality Bridge sem remover o playground de Speech-to-Text existente.

**Bypass de admissão em self-loop:** quando a chamada describe é encaminhada através do próprio self-loop `/v1` do OmniRoute (modelo de fornecedor não padrão), o sub-pedido envia `x-omniroute-admission-bypass: internal` e é autenticado com a credencial de self-loop resolvida — o valor sentinela local `sk_omniroute` em modo local, ou a chave de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada pelo operador (#1350), para que as implementações com `REQUIRE_API_KEY=true` possam continuar a executar a chamada describe. O bypass só é honrado para essas credenciais exatas, pelo que clientes externos não podem usar o cabeçalho para contornar a admissão.

As predefinições antigas residem em `src/shared/constants/visionBridgeDefaults.ts`; as novas predefinições de modo/task-aware/cache e o resolvedor de definições residem em `src/shared/constants/modalityBridgeDefaults.ts`. O guardrail expõe uma opção de construtor `deps` para que os testes possam injetar implementações falsas de `getSettings` e `callVisionModel`.

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

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceta as partes de vídeo de nível superior em `messages` do Chat
Completions e em `input` da Responses API antes de ser chamado um destino sem
suporte nativo de vídeo conhecido. Os formatos suportados são `input_video`,
`video_url`, `video_source`, URLs HTTPS e data URIs
`data:video/*;base64,...`. Nomes de ficheiros simples em texto não são
tratados como vídeo.

O `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gere a travessia do
pedido, a verificação de capacidade/política, a agregação por pedido e o
payload da resposta. O trabalho por vídeo — aquisição, a cache de resultado
completo, a descrição de uma sequência de fotogramas (que funde qualquer
transcrição de áudio declarada pelo autor da chamada) e
métricas/interrupção/limpeza por tentativa — está escondido atrás de
`processVideoPart` em `videoBridgePipeline.ts`, invocada uma vez por parte de
vídeo dentro do ciclo de `preCall`. Esse módulo também define as fronteiras
de portas explícitas `VideoMediaBrokerPort` (aquisição de bytes e extração de
fotogramas amostrados), `VideoAudioTranscriptionPort` (fusão de uma
transcrição de áudio declarada pelo autor da chamada com as legendas
amostradas) e `VideoDrilldownPort` (a fronteira de persistência do drill-down
de fotogramas; ainda não ligada a `processVideoPart` — atualmente, apenas a
rota separada `/api/modality-bridge/video/drilldown` escreve entradas de
drill-down).

O caminho público de pedidos `/v1` nunca importa nem invoca um subprocesso.
Os vídeos remotos são transferidos com um limite de 50 MiB; os vídeos base64
inline têm um limite conservador de 36 MiB descodificados por vídeo, para que
o envelope de modelo/mensagens/framing possa permanecer dentro do limite de
admissão de pedidos JSON públicos de 50 MiB. O comprimento inline e as
estimativas de tamanho descodificado são verificados antes da alocação. É
exigido HTTPS no URL remoto inicial e em cada redirecionamento, utilizando a
proteção de saída restrita a destinos públicos já existente, com DNS pinning.
Os bytes atravessam depois a fronteira exata do broker interno
`POST /api/modality-bridge/video/extract`. Essa rota é simultaneamente
`LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas um pedido autenticado por
processo e proveniente de loopback fidedigno, e nunca aceita um URL, um
caminho de sistema de ficheiros, um executável ou uma lista de argumentos. O
pipeline de tamanho de corpo da API e o leitor incremental de corpo do
handler impõem, de forma independente, um limite de 50 MiB à entrada do
broker. A sua fila limitada executa uma extração de cada vez, permite quatro
trabalhos pendentes e limita a entrada pendente a 100 MiB.

Dentro do broker, o `ffprobe` lê um ficheiro local privado; a lista fixa de formatos permitidos exclui formatos de playlist e de manifesto. Para contentores permitidos da família MOV, as referências externas de dados MOV permanecem desativadas por predefinição, e o comando fixo não as ativa. Tanto o `ffprobe` como o `ffmpeg` usam a lista de permissões de protocolos apenas `file`, uma thread, arrays de argumentos fixos, sem shell, e executáveis resolvidos a partir do `PATH`. Os fluxos de capa do tipo attached-picture não são candidatos de reprodução. Todos os fluxos reproduzíveis têm de satisfazer os limites, e um fluxo predefinido explícito é preferido antes do fallback determinístico de índice mais baixo. Os vídeos estão limitados a 600 segundos, 8 192 píxeis por dimensão e 33 554 432 píxeis de origem. O FFmpeg amostra 1–16 fotogramas JPEG de ponto médio, reduz a aresta mais longa para no máximo 1 024 píxeis sem aumentar entradas mais pequenas, e nunca recebe um URL. A amostragem é `uniform` por predefinição. As políticas opcionais `scene_aware` e experimental `segment_aware` executam uma passagem fixa adicional do FFmpeg sobre o fluxo local já validado, selecionam timestamps de cena `showinfo` limitados, e recorrem deterministicamente aos mesmos pontos médios uniformes em caso de falha do detetor, timeout, saída malformada ou um conjunto de candidatos vazio. O modo segment-aware atribui amostras de ponto médio proporcionalmente aos intervalos de cena validados; a evidência do modo segment-aware e o comportamento de fallback são detalhados abaixo. O limite rígido de 16 fotogramas é aplicado após a seleção em todas as políticas. Quando um pedido scene-aware tem apenas um orçamento de um fotograma, usa o ponto médio uniforme do vídeo completo ativo ou da janela de foco e reporta `policyEffective: uniform`: um único fotograma de cena selecionado não pode preservar ambas as extremidades temporais. Um chamador pode, opcionalmente, fornecer uma janela de foco finita (segundos `start`/`end`); os limites são ajustados à duração do média, janelas invertidas ou não finitas são rejeitadas, e todas as políticas de amostragem são executadas apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não fidedigno, para que os modelos a jusante possam distinguir um excerto focado da linha temporal completa.

O foco semântico de legendagem é uma definição separada e explícita. O modo de análise `full` predefinido preserva o prompt de fotogramas existente e nunca encaminha texto do pedido para o modelo de legendagem. No modo `focused`, a bridge lê apenas o `text`/`input_text` mais recente, não vazio e de autoria do utilizador, do mesmo contentor Chat ou Responses, normaliza-o para NFC, colapsa caracteres de controlo e espaços em branco, e limita-o a 500 pontos de código Unicode. Um resultado vazio recorre ao prompt `full` exato. Uma dica utilizável é serializada como JSON num bloco dedicado de contexto de utilizador não fidedigno e só pode priorizar detalhes observáveis; não pode sobrepor-se ao aviso separado contra seguir instruções visíveis ou audíveis no média. O foco textual nunca infere `start`/`end` nem altera o amostrador temporal.

#### FU-07 evidência estrutural de segmentos

O `segment_aware` usa uma passagem de pré-análise limitada sobre o fluxo de vídeo local já validado. A cadeia de filtros fixa primeiro escala para no máximo 320 píxeis de largura, deteta mudanças de cena e intervalos congelados, e depois amostra a 1 fotograma por segundo para desfoque, luma média e informação espacial/temporal. A passagem está limitada a 600 amostras estruturais, uma thread de FFmpeg/filtros, as mesmas listas de permissões de protocolos apenas `file` e de contentores, um limite de 1 MiB de saída do processo, e no máximo 30 segundos dentro do aborto/prazo limite partilhado do broker. Nunca aceita um comando, filtro, caminho ou URL do pedido.

Os valores estruturais são evidência determinística de amostragem, não compreensão semântica do vídeo. Não inferem sujeitos, ações, legendas, fala ou intenção do utilizador. As fronteiras de cena e de congelamento formam segmentos; a cobertura de congelamento, o desfoque, a exposição, o detalhe espacial e a mudança temporal apenas influenciam a forma como o orçamento existente de 1–16 fotogramas é atribuído. Um segmento totalmente congelado é limitado a um fotograma, enquanto os segmentos não congelados competem pelo orçamento restante. Quando as fronteiras superam o número de fotogramas, a cobertura uniforme da linha temporal é mantida para que cortes rápidos no início não possam esconder um segmento final longo. As fronteiras de cena dentro da resolução de análise de 1 segundo de uma fronteira de congelamento são fundidas.

Filtros em falta, evidência malformada/vazia, um erro do detetor ou o timeout limitado da pré-análise falham em modo aberto para a política exata de pontos médios uniformes. Um aborto do chamador ou um prazo limite do broker não falha em modo aberto: termina o subprocesso em curso, impede a extração posterior de fotogramas, e a árvore temporária privada é removida no `finally`.

O `scripts/perf/video-bridge-fu07-eval.ts` gera fixtures reais e determinísticas do FFmpeg para poupanças de chamadas de legendagem pós-deduplicação, atribuição de orçamento de movimento denso, evidência de desfoque/exposição/SI-TI, cortes rápidos com uma cauda longa e falsos positivos de transição gradual. Regista o tempo decorrido (wall time) da pré-análise e, quando o `/usr/bin/time` está disponível, o CPU do processo filho e o pico de RSS. As suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legendagem permanece `HOLD` porque este harness não tem endpoint autorizado nem avaliador congelado. As poupanças monetárias também permanecem `HOLD`, a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita por chamada; o script nunca fabrica nenhum dos dois resultados.

Cada fotograma está limitado a 4 MiB, todos os fotogramas em bruto em conjunto a 23 MiB, e a
resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido
no `finally`. O OmniRoute não inclui o FFmpeg e não aceita um caminho de executável
personalizado. Antes da legendagem, a bridge aplica uma passagem conservadora de
desduplicação visual: cada JPEG é reduzido a um buffer em tons de cinzento de 16×16 e é
comparado apenas com o último fotograma retido. Para um orçamento de legendas pedido
superior a um fotograma, a extração fornece um conjunto limitado de candidatos até ao
dobro desse orçamento e nunca mais de 16 fotogramas.
O limite pedido é aplicado apenas após a desduplicação, com o primeiro e o último
candidatos selecionados preservados durante a redução final, quando o orçamento é de pelo
menos dois. A política versionada
`grayscale-16x16-mean-cells-v2` usa o maior valor entre o delta médio de luma e
a proporção de células da miniatura cujo delta normalizado é de pelo menos 0,05. O
limiar de duplicados é a constante 0,04, escolhida pela previsibilidade em vez de ser
exposta como definição de tempo de execução. Este sinal secundário
de alto contraste preserva pequenos movimentos e alterações de texto visível que uma
comparação apenas pela média pode ocultar. Os erros do comparador ou do descodificador
falham em modo aberto e mantêm a cobertura. Os metadados de saída separam os candidatos
extraídos, os fotogramas utilizados com sucesso e os duplicados visuais descartados.

Uma parte de vídeo explicitamente marcada pode pedir uma folha de contacto com carimbos
temporais. A bridge constrói, no máximo, uma grelha JPEG de 4 colunas e 16 fotogramas.
Cada célula de 512 píxeis grava o seu carimbo temporal de origem numa faixa inferior de
alto contraste, enquanto os mesmos carimbos temporais permanecem nos metadados textuais
para associação e auditoria a jusante. O JPEG completo permanece limitado a 32 MiB. Se o
`sharp` não conseguir descodificar ou compor a grelha, a bridge recorre aos fotogramas
JPEG individuais; uma interrupção do cliente continua a propagar-se através da operação
da folha de contacto.

A evidência de promoção está deliberadamente separada do microbenchmark sintético de
composição. O `scripts/perf/video-bridge-contact-sheet-eval.ts` define um arnês A/B com
versão de esquema para modelos de visão reais compatíveis com OpenAI. Mede os tokens
reportados pelo fornecedor, a latência de relógio de ponta a ponta (incluindo a
composição da folha de contacto), a contagem de chamadas ao modelo e a retenção de
factos definida no manifesto. As respostas em bruto do modelo não são escritas no
relatório; apenas são retidos os resumos SHA-256 e os IDs de factos com correspondência.
O arnês não faz qualquer chamada de rede ou a modelo pago, a menos que seja passado
`--execute-real` e que `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam
configurados. Sem essa execução real explícita, o seu veredito legível por máquina
permanece `HOLD`; as medições sintéticas de payload/contagem de chamadas, por si só, não
são evidência de promoção.

Os chamadores podem anexar um array `transcript.cues` opcional a uma parte de vídeo
suportada quando já possuem texto alinhado. Cada cue tem de transportar `text`, um
intervalo finito `start`/`end` dentro da duração sondada, e uma `source` incluída na
lista de permissões (`client`, `embedded` ou `audio-bridge`); `confidence` tem como
predefinição `1` e tem de permanecer entre `0` e `1`. Os cues duplicados exatos são
colapsados. O OmniRoute nunca inicia a transcrição a partir destes metadados: os cues
validados são copiados para o resultado descrito com a fonte, a confiança e o intervalo,
e são apresentados como observações não fidedignas juntamente com as legendas dos
fotogramas. O texto inválido, fora do intervalo ou sem proveniência é rejeitado em vez
de ser misturado no fluxo de legendas. Ambos os canais de transcrição do corpo do pedido
normalizam a proveniência fornecida para `client`, incluindo as etiquetas `embedded` ou
`audio-bridge` autodeclaradas. Apenas um adaptador detido pelo servidor pode atribuir
essas etiquetas fidedignas através do argumento `trustedSource`, acessível apenas por
código; um campo JSON do pedido não consegue alcançar esse argumento. O texto da
transcrição permanece conteúdo não fidedigno derivado de multimédia, independentemente
da sua proveniência, e nunca deve determinar a autorização.

Um chamador avançado pode fornecer uma faixa `audioTranscript` para o mesmo vídeo; esta
é tratada como texto fornecido pelo cliente, não como prova de transcrição pelo servidor.
A junção de fusão executa as observações visuais e de áudio sob um único prazo e sinal
de interrupção, ordena-as numa linha temporal comum, colapsa duplicados exatos e reporta
um resultado parcial quando apenas um dos lados tem sucesso. Um `audioTranscript`
inválido degrada para esse resultado parcial — a descrição visual é mantida e o ramo de
áudio regista um código de falha saneado — em vez de falhar o vídeo inteiro. A
disponibilidade por ramo, a flag de parcial e os códigos de falha saneados são
preservados no resultado descrito, nos metadados das salvaguardas
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nos metadados da
cache de resultados e nos contadores de fusão da bridge. O caminho predefinido da Video
Bridge não invoca conversão de voz em texto nem transfere uma segunda cópia do
multimédia; sem essa faixa explícita, permanece apenas em vídeo.

**Retenção de transcrições (#12150 P1).** Aplica-se automaticamente sempre que a
Video Bridge (ela própria opt-in) renderiza um cue de transcrição — não existe
uma flag de retenção separada. Quando um pedido renderiza qualquer cue de
transcrição (um `transcript` declarado pelo chamador ou um `audioTranscript`
fundido), o guardrail marca-o como `videoBridgeObserved` e produz uma sombra
redigida da descrição do vídeo — uma renderização idêntica em que o corpo de
texto livre de cada cue é substituído por `[redacted-video-transcript]`,
construída substituindo o campo estruturado do cue antes de a string ser
montada (nunca através da análise do texto achatado, pelo que nenhum conteúdo
de cue — adversarial ou comum, incluindo corpos que contenham `]`, como
`[inaudible]`/`[music]` — pode sobreviver). O corpo do pedido persistido no
registo de chamadas substitui cada parte de texto derivada de vídeo por essa
sombra redigida, correspondida por igualdade de conteúdo; a âncora `fullText`
é relida a partir do payload do guardrail pré-chamada finalizado, pelo que a
correspondência continua a ser bem-sucedida depois de guardrails posteriores
da cadeia (os mascaradores de PII e de credenciais, prioridades 10/95)
reescreverem o texto da descrição no local e depois de a injeção de prompt de
sistema/handoff/memória remodelar o array de mensagens. O corpo enviado
upstream para o modelo permanece inalterado. Um pedido observado também não
popula nenhuma Memória duradoura (a extração derivada do pedido e da resposta
é ignorada), pelo que a própria resposta do modelo não pode ecoar texto da
transcrição para a Memória.

**Campos de vídeo brutos (#12430).** Quando a bridge está ativada e o suporte
nativo de vídeo é desconhecido ou ausente, campos `transcript`/`audioTranscript`
definidos também ativam `videoBridgeObserved`, mesmo após uma falha de
descrição ou um limite `maxVideos`. `null` e strings vazias contam; campos
ausentes e metadados não-vídeo não contam. As cópias retidas redigem estes
campos ou omitem o pedido, e as caches/Memória são contornadas.

Nesses caminhos de fallback, os cues válidos do chamador tornam-se partes
`text`/`input_text` suportadas, em vez de campos de fornecedor não standard.
Ambas as faixas fornecidas no pedido permanecem observações `client` não
fidedignas, com um aviso explícito de que o vídeo não foi descrito e de que os
timestamps não foram verificados contra o conteúdo multimédia. Os orçamentos
existentes de 256 cues/64 KiB no total e por cue aplicam-se às duas faixas em
conjunto; os timestamps têm de respeitar o teto de 600 segundos do broker e
qualquer janela de foco fornecida. As faixas inválidas são descartadas, não
reencaminhadas como texto arbitrário; uma faixa irmã válida pode ainda ser
usada, a menos que o orçamento combinado seja excedido. Campos nulos/vazios
não adicionam texto. Este fallback não adiciona qualquer obtenção de media nem
transcrição. Os campos de extensão de transcrição são removidos do carrier de
vídeo de fallback e dos seus objetos `video_url`/`source`. A allowlist de wire
da OpenAI permanece estrita; os carriers de vídeo com suporte nativo
desconhecido permanecem disponíveis e os destinos conhecidos de apenas texto
mantêm marcadores seguros. As sombras de redação estruturadas protegem o texto
de transcrição anexado, enquanto o pedido original pertencente ao chamador
permanece inalterado. Os destinos com suporte nativo e as bridges desativadas
mantêm o seu comportamento de bypass existente.

As cópias retidas adicionais usam o mesmo sinal de pedido observado. O
snapshot bruto do pedido de cliente pré-guardrail, o pedido pendente em
memória e o registo de pedidos rejeitados precocemente substituem
estruturalmente os campos de transcrição nas partes de vídeo; os prompts de
string sintetizados por estágios do pipeline e pela transferência de contexto
são redigidos no sink do corpo do pedido persistido. O marcador
`video_content_removed` persistido faz com que a continuação via
`previous_response_id` falhe de forma fechada, em vez de reconstruir texto que
foi intencionalmente descartado. Se um pedido observado perder a sua sombra de
redação por parte antes do registo, ou se mesmo uma de várias sombras de vídeo
não corresponder após mutações posteriores do pedido, o corpo do pedido retido
é totalmente omitido em vez de reter uma transcrição parcialmente redigida.

Para um pedido observado, uma resposta do modelo pode citar qualquer porção da
transcrição sem uma fronteira de cue estruturada. O seu `responseBody`
persistido no registo de chamadas é, por isso, substituído por um marcador de
omissão; o artefacto detalhado do pipeline (que pode incluir corpos
upstream/client e chunks de stream) não é retido. As caches semântica, de
idempotência e de repetição de raciocínio contornam as leituras e escritas
desse pedido. O pedido ao fornecedor e a resposta visível ao cliente
permanecem inalterados. Os bytes de keepalive precoces são drenados do buffer
temporário quando o artefacto detalhado é omitido. O aviso de EventStream
malformado do Kiro reporta apenas a contagem de bytes do payload, nunca o seu
conteúdo nem o erro bruto do parser JSON. Isto não afirma que todos os
diagnósticos de fornecedores/plugins não relacionados tenham sido auditados; a
varredura mais ampla dos sinks retidos é acompanhada em #11658.

O ciclo de vida interno de `/api/modality-bridge/video/drilldown` é um
substrato de cache separado, autenticado por loopback/token. Cada operação
requer também um ID de principal opaco canónico. Antes de um chamador de
produção ser ativado, tem de derivar esse ID a partir do tenant autenticado e
nunca pode reencaminhar um valor selecionado pelo cliente. As chaves de cache
vinculam esse principal a IDs canónicos de sessão e de referência de vídeo,
armazenam apenas as respetivas chaves derivadas de SHA-256 e restringem tanto
as leituras como a eliminação ao mesmo principal. A cache armazena no máximo
16 frames JPEG derivados por entrada, expira-os após dez minutos e suporta
leituras limitadas por `start`/`end` ou a eliminação explícita da sessão.

Cada principal está limitado a 16 entradas e 64 MiB de dados JPEG canónicos.
Esses limites são independentes do teto global de 64 entradas/256 MiB: a
pressão de quota do principal expulsa apenas as entradas menos recentemente
usadas desse principal antes de ser considerada a expulsão LRU global. As
entradas expiradas são varridas tanto da contabilização do principal como da
global durante a atividade da cache, enquanto o cancelamento e a falha de
validação não consolidam uma substituição parcial.

A cache rejeita Base64 não canónico, padding em excesso, conteúdo multimédia não JPEG, JPEGs malformados ou truncados, e JPEGs que produzam um aviso durante uma descodificação `sharp` limitada de imagem completa. Recodifica cada imagem aceite como um JPEG canónico, deriva a largura e a altura a partir dos bytes descodificados em vez de confiar nos campos do chamador, e descarta quaisquer bytes poliglotas finais em vez de os reter. Apenas o buffer comprimido canónico limitado é contabilizado em ambas as quotas. O limite de transporte JSON inclui a sobrecarga de Base64 para o teto de 32 MiB de entrada descodificada. Cada derivação armazenada regista o seu formato/resolução JPEG validado, a política de amostragem, a versão de derivação, a hora de criação, o hash de conteúdo calculado pelo servidor e a referência de hash do elemento pai, bem como o hash de conteúdo do elemento pai do chamador fidedigno. O cancelamento é verificado entre as fases assíncronas de descodificação/hash antes do commit atómico na cache.

Esta tranche ainda não liga um produtor de produção à rota e não fornece seleção de variantes multi-resolução. O caminho de pedido transparente da Video Bridge não incorre, por isso, em trabalho adicional, enquanto a derivação de principal vinculada ao tenant e o ciclo de vida multi-resolução completo FU-08 permanecem trabalho de seguimento explícito, em vez de documentados como comportamento concluído.

Os frames são legendados sequencialmente com o modelo de Video configurado. Um override de Video vazio herda a definição de Vision; se ambos estiverem vazios, o auto-router de Vision seleciona o modelo eficaz com capacidade de visão. As legendas bem-sucedidas substituem a parte original por um prefixo estável `[Video description:` que também marca o texto como uma observação não fidedigna derivada de multimédia e indica aos modelos a jusante que não sigam instruções encontradas no conteúdo multimédia. As chaves de cache das legendas de frames incluem os bytes JPEG, o prompt, o timestamp e o modelo eficaz; apenas as legendas bem-sucedidas são colocadas em cache. As entradas de cache retêm o modelo produtor real que teve sucesso, incluindo um modelo de fallback; a bridge reporta `mixed` quando frames diferentes foram produzidos por modelos diferentes. Um acerto na cache reutiliza essa identidade de produtor em vez de a reetiquetar como o plano de encaminhamento solicitado. A cache de resultados de vídeo completo é indexada por todas as entradas que alteram a saída — prompt, modelo eficaz, política de amostragem, número de frames, modo de análise semântica, a fingerprint SHA-256 da sugestão de foco normalizada, janela de foco, `transcript`, `audioTranscript` e a flag de folha de contacto — pelo que alterar qualquer uma dessas dimensões é uma falha na cache, nunca uma reutilização obsoleta. A versão da política de desduplicação visual, o limiar e o número limitado de frames candidatos também estão explícitos na chave da cache de resultados e nos metadados; uma alteração de política não pode, portanto, reutilizar uma descrição obsoleta de vídeo completo. Os metadados v4 da cache de resultados mantêm o modo e a fingerprint, nunca a tarefa do utilizador em bruto. Os metadados do guardrail reportam tanto o modo de análise solicitado como o eficaz; um modo `focused` solicitado sem texto de utilizador utilizável é reportado como efetivamente `full`.

O guardrail extrai todas as partes de vídeo suportadas, mas não descreve mais do que `modalityBridgeVideoMaxVideos`. Para um destino comprovadamente com `supportsVideo === false`, os vídeos falhados e acima do limite tornam-se marcadores de texto seguros explícitos, para que nenhum vídeo em bruto subsista. Quando a capacidade é desconhecida, essas partes conservam o seu suporte de vídeo; qualquer transcrição de fallback segue a conversão de texto limitada descrita acima. Destinos com `supportsVideo === true` contornam a bridge. O sinal de interrupção do pedido do cliente propaga-se pelo download, pela fila do broker, pelos subprocessos e pelas chamadas de legendagem; as interrupções param entre vídeos e nunca falham de forma a expor conteúdo multimédia em bruto.

As definições de runtime são apoiadas por base de dados e validadas com Zod:

| Chave                               | Predefinição | Intervalo / comportamento                                                                                      |
| ----------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`      | Runtime opcional, por adesão                                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` preserva legendas genéricas; `focused` usa contexto limitado e não fidedigno do utilizador mais recente |
| `modalityBridgeVideoModel`          | `""`         | Herda o modelo da Vision Bridge                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` ou `segment_aware` proporcional; a falha do detetor recai para `uniform`              |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                 |

Os valores de timeout de Video legados persistidos superiores a 120 segundos são fixados no prazo limite do broker; novas escritas de definições acima desse limite são rejeitadas.
`GET /api/modality-bridge/video/runtime` exige localidade de loopback fidedigna e carimbada antes da autenticação ou da sondagem do runtime e, em seguida, exige autenticação de gestão. Devolve apenas `available`, as versões sanitizadas do FFmpeg/ffprobe e um motivo fixo quando o runtime está indisponível. O endpoint interno de extração não é uma API pública de upload: a saturação da fila devolve `503` e `Retry-After`, uma desconexão do chamador devolve `499` e o prazo limite fixo do broker devolve `504`. As respostas convertidas adicionam `video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central `x-omniroute-modality-bridge` sem remover os segmentos de Vision ou de Audio.

### PII Masker (`piiMasker.ts`)

É executado em **ambas** as fases.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e
  `prompt` (incluindo itens que são strings simples) e aplica `processPII()` (de
  `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`. Quando
  `PII_REDACTION_ENABLED=true`, os PII detetados são ocultados no payload de saída.
  Isto é independente de `INPUT_SANITIZER_MODE` (que apenas controla a política de
  injeção de prompts). Quando a ocultação está desativada, a chamada regista as
  contagens de deteção sem reescrever o conteúdo.
- **`postCall`** faz uma clonagem profunda da resposta, executa `sanitizePIIResponse()`
  e ainda o mascarador do formato da Responses API (`maskResponsesOutput` — cobre
  `output_text` e `output[].content[].text`). Se ocorrer alguma ocultação, a
  resposta modificada substitui a original.

A guarda nunca bloqueia; apenas anota (`meta.detections`, `meta.redacted`) ou reescreve.

#### Seleção por tipo, padrões personalizados e contadores de deteção

**Dashboard → Definições → Segurança → Mascaramento de PII** escolhe _o que_ é
mascarado. Não ativa o mascaramento: isso continua a depender de
`PII_REDACTION_ENABLED` (pedido) e `PII_RESPONSE_SANITIZATION` (resposta + SSE),
ambos desativados por predefinição.

- **Seleção por tipo** — os ids incorporados estão listados em
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa
  todos os tipos (o comportamento anterior à existência desta definição). O padrão
  `ssn_us` do motor de pedidos é mapeado para `ssn`. Os modelos (Minimal, Standard,
  Financial, Brazilian, USA, Full) apenas preenchem as caixas de verificação na IU.
- **Padrões personalizados** — até 20 padrões regex ou de wildcard (`*` = até 64
  caracteres diferentes de espaço em branco, `?` = um). As correspondências
  tornam-se `[CUSTOM_REDACTED]`. Todos os padrões passam por
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): no máximo
  500 caracteres, flags limitadas a `g i m s u`, têm de compilar, têm de passar no
  `safe-regex` (backtracking catastrófico) e não podem corresponder a uma string
  vazia nem a um placeholder de ocultação. Um padrão que falhe é recusado ao
  guardar e ao testar, e uma linha armazenada que falhe é ignorada em tempo de
  execução em vez de ser compilada. Os padrões personalizados só são executados
  enquanto o mascaramento estiver ativo.
- **Contadores de deteção** — contagens por tipo (nunca valores correspondidos),
  mantidas em memória e repostas no reinício (`src/lib/pii/piiDetectionStats.ts`).
  Só aumentam enquanto o mascaramento estiver ativo.

As definições residem na tabela `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) e são lidas através de uma cache de 1 s. API:

| Método | Caminho                  | Finalidade                                                                                         |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado das flags, `enabledTypes`, `customPatterns`, contadores de deteção                          |
| `PUT`  | `/api/settings/pii`      | Substituir `enabledTypes` (`null` = todos) e/ou `customPatterns`                                   |
| `POST` | `/api/settings/pii/test` | Execução de teste (dry-run) de um padrão contra uma amostra de, no máximo, 8 KB; nada é armazenado |

Os três exigem autenticação de gestão e validam o corpo com Zod
(`src/shared/validation/schemas/piiSettings.ts`).

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
