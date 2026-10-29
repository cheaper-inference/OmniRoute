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

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

O modelo base GLM 5.3 e `glm-5.3-{low,high,max}` têm metadados explícitos de
`supportsVision:false` no registro/spec. As variantes GLM 5.3 Flash
permanecem modelos com visão nativa. A rota `/v1/messages` do Claude Code entra na
cadeia de guardrails pré-chamada do `handleChat` compartilhado **antes** da tradução
Claude-para-OpenAI; imagens aninhadas de resultados da ferramenta `Read` devem ser descritas ou tratadas
antes que essa tradução as eleve para conteúdo `image_url` da OpenAI (#17069).

Intercepta requisições que carregam imagens destinadas a **modelos sem visão** e
redireciona a requisição inteira para um modelo com capacidade de visão ou substitui as
partes de imagem por descrições de texto produzidas por um modelo de visão configurável antes
da chamada upstream. Isso permite que provedores somente de texto lidem
transparentemente com payloads multimodais.

Fluxo:

1. Ignora se o modelo de destino já suporta visão (a menos que apareça na
   lista de bridge forçado `isVisionBridgeForcedModel`).
2. Extrai as partes de imagem via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega ao **detector de mídia
   unificado** `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a
   única fonte de verdade compartilhada com o filtro de compatibilidade de combo.
   A extração é limitada por allowlist aos formatos que `replaceImageParts` consegue
   reintegrar (o contrato extract↔replace): `image_url` da OpenAI, base64 da Anthropic
   `source.type:"base64"`, URL da Anthropic `source.type:"url"` e `input_image` da
   Responses API. Imagens correspondentes aninhadas dentro de `tool_result.content`
   do Claude Code e saídas de ferramentas da Responses também são extraídas e
   substituídas em seus caminhos originais; formatos somente indicadores são material
   do filtro de combo e não são extraídos.
   Ignora se nenhuma for encontrada.
3. Resolve a configuração de runtime via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de configuração
   `modalityBridge*` prevalecem; as chaves legadas `visionBridge*` permanecem como
   **fallback de um ciclo** (janela de rollback). Ignora antes de qualquer travessia
   de mídia quando o bridge está desativado.
4. O seletor de modo (`modalityBridgeVisionMode`, veja a tabela abaixo) decide entre
   redirecionar ou descrever. O redirecionamento retorna `modifiedPayload` apenas com o
   `model` trocado, mais o meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limita as imagens a `maxImages`, compõe o prompt sensível à
   tarefa, consulta o cache de descrições, chama o modelo de visão **em paralelo**
   (`Promise.allSettled`) e injeta partes de texto `[Image N]: <description>` em
   seu lugar. Uma descrição com falha resulta em `null`: a imagem bruta é preservada para
   destinos desconhecidos ou com capacidade de visão (#4012), mas um **destino direto
   confirmado como somente texto** ou um combo sem visão recebe um stub de texto explícito
   `(unavailable — no vision-capable provider connected)` para
   cada imagem não descrita, incluindo falhas parciais e imagens além do
   limite de chamadas de descrição (#17069). O fallback existente de descrição de combo
   quando todas falham permanece em vigor (#8430).
6. Retorna `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Padrão | Comportamento                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Heurística legada, inalterada (#6640/#7204): modelos não-combo/`auto/` são redirecionados para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (nesse caso, descreve); alvos combo sempre descrevem.                                                                                      |
| `describe` |        | Sempre descreve — o bloco de redirecionamento é totalmente ignorado; o modelo escolhido pelo usuário sempre responde.                                                                                                                                                                                                              |
| `reroute`  |        | Força o redirecionamento: a proteção de manter o modelo com credenciais é ignorada. A proteção de credenciais do **alvo** do redirecionamento ainda se aplica — quando não existe nenhum alvo de visão utilizável, a bridge bloqueia com um erro claro em vez de descrever ou enviar imagens brutas para um alvo somente de texto. |

Os modos forçados fazem curto-circuito **antes** da execução da heurística
automática; o comportamento `auto` é byte a byte idêntico à proteção anterior ao PR-1.

#### Escopo da chave de API (`visionBridgeKeyScope.ts`)

Quando a chave de API do chamador restringe `allowedConnections`, pools de
cota (`allowedQuotas`) ou modelos (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a bridge só
escolhe modelos de redirecionamento e descrição que a chave pode usar, em
conexões que a chave pode usar. A chamada de descrição então sempre passa pelo
self-loop do OmniRoute com o cabeçalho `x-omniroute-self-loop-key-id`, de modo
que a requisição de chat receptora aplique novamente a política de conexão e
modelo dessa chave. `enforceApiKeyPolicy()` honra esse cabeçalho somente em
conjunto com o bearer do self-loop, portanto ele só pode restringir o acesso,
e um id que não resolve é rejeitado.

Se nenhum modelo de visão for permitido para a chave, um **alvo confirmado
como somente texto** rejeita a requisição de imagem localmente com um HTTP 400
claro, em vez de encaminhar bytes de imagem para um upstream incapaz (#17069).
Para alvos com capacidade de visão desconhecida ou nativa, o caminho de
descrição mantém seu comportamento fail-open anterior (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Requisições sem chave, e chaves sem essas restrições, comportam-se exatamente
como antes.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

Padrão **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) anexa o
texto da **última mensagem do usuário** (truncado em 500 caracteres) ao prompt
de descrição base, direcionando a descrição para o que o usuário realmente
perguntou (padrão codex-vision-proxy) e pedindo ao modelo de visão que
transcreva o texto visível. Com a flag desativada — ou sem texto do usuário —
o prompt base é usado inalterado.

A própria requisição compatível com OpenAI do self-loop de descrição
(`callVisionModelSingle()` em `visionBridgeHelpers.ts`) sempre solicita
`image_url.detail: "high"` — incondicionalmente, para todo chamador/provedor,
sem depender de nenhum sinal do cliente. A amostragem em baixo detalhe degrada
a precisão de OCR exatamente para a tarefa de transcrição de texto que este
prompt solicita, portanto a chamada de descrição em si sempre pede alto
detalhe, independentemente do nível de detalhe usado pela requisição de
entrada original. Isso afeta apenas o corpo da requisição de descrição
interna; não muda a forma como o OmniRoute encaminha o `image_url.detail` do
próprio chamador na requisição primária — esse padrão é aplicado
separadamente, e somente para clientes OpenCode detectados, em
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). O ramo
de formato wire Anthropic do self-loop de descrição não tem campo `detail` e
não é afetado por nenhum dos dois padrões.

#### Limite de saída da descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Padrão | Intervalo        |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100–50000 |

`0` (padrão) significa **sem limite** — a descrição retornada por
`callVisionModel()` é repassada sem modificações, preservando o comportamento
existente. Qualquer valor no intervalo 100–50000 trunca a descrição com um
sufixo `…` antes que ela seja inserida de volta como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`).
Aumente esse valor para tarefas de OCR com muitos detalhes, em que o modelo
downstream precisa da transcrição completa; diminua para limitar o uso de
tokens em modelos de visão prolixos. O campo do dashboard fica no painel
Advanced da aba Vision (`modality-bridge-max-chars` em
`ModalityBridgeVisionTab.tsx`) e eleva qualquer valor entre 1 e 99 até o piso
de 100, deixando um `0` explícito intacto — `0` é um valor Zod válido por si
só (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), e não
apenas o padrão "não definido".

#### Cache de descrição (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para saídas de descrição, compartilhado em todo o
processo. Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
com enquadramento por prefixo de comprimento (sem colisões de fronteira de
campo). O componente do modelo é o modelo de bridge **configurado**, não o
modelo que realmente respondeu — `callVisionModel` pode fazer fallback
internamente, e criar chaves por tentativa fragmentaria o cache. Descrições
que falharam nunca são armazenadas em cache. Configurações:

| Chave                           | Padrão | Intervalo |
| ------------------------------- | ------ | --------- |
| `modalityBridgeCacheEnabled`    | `true` | —         |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000   |

#### Normalização de imagem remota (busca self-loop describe/base64)

Quando o bridge busca uma imagem **remota** por conta própria — a self-call de describe da Anthropic e a conversão para base64 no formato wire do Claude
(`ensureBase64ImagesForClaudeWire`), ambas via
`fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — a data URI
resultante passa por `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de ser embutida na requisição ao
modelo de visão. Imagens grandes demais são reduzidas para uma **borda longa de 2048px** (igualando o limite de redimensionamento que OpenAI/Anthropic já aplicam no lado do servidor), o que reduz
bytes/latência de upload sem alterar o que o modelo de visão vê. O redimensionamento
usa `sharp`, carregado via import dinâmico: em uma plataforma onde seu binário
nativo falha ao carregar, `normalizeDataUri()` **nunca lança exceção** — ele recorre
a um passthrough dos bytes originais, de modo que o caminho de describe/conversão para base64
sempre continua funcionando. Bytes que não são imagem (uma busca que não retornou uma
imagem decodificável) também passam intactos. Essa normalização tem
escopo restrito às imagens que o bridge busca para sua própria self-call — ela nunca
é aplicada ao payload de passthrough bruto do chamador, consistente com o
princípio de mutação apenas opt-in (Regra Rígida nº 20).

#### Esquema de configurações + migração

As novas chaves `modalityBridge*` são validadas com Zod em `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o
grupo `modalityBridgeAudio*` usado pelo Audio Bridge. A migração
`141_modality_bridge_settings.sql` copia os valores legados
`visionBridge*` existentes para as novas chaves correspondentes (idempotente, nunca sobrescreve
um valor `modalityBridge*` definido pelo operador); as chaves legadas continuam aceitas como
fallback de leitura por um ciclo de release.

#### Cabeçalho de transparência + estatísticas

Respostas transformadas por describe carregam
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(construído por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`,
carimbado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`).
Requisições redirecionadas **não** recebem cabeçalho — o payload não foi alterado e a
troca de modelo já é visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gerenciamento, mesmo nível de
`GET /api/settings`) retorna os contadores em memória por modalidade
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e
`video`. `averageLatencyMs` usa `latencySamples`, e não todas as tentativas, como
denominador; uma operação sem medição de tempo não fabrica uma amostra
de zero milissegundos. `bridged` permanece o alias retrocompatível para conversões
bem-sucedidas; tentativas com falha não o incrementam.
Os contadores são zerados na reinicialização do processo por design
(telemetria, não contabilidade).

#### Configuração do dashboard

A página dedicada do dashboard é
`/dashboard/settings/modality-bridge`. Suas abas `Vision`, `Audio`
e `Video`, endereçáveis por URL, preservam os parâmetros de query ao alternar o valor de `tab`.
A aba Vision expõe ativação, modo, seleção de modelo (incluindo o
padrão automático), prompting sensível à tarefa, limites avançados de timeout/imagem/comprimento de descrição/cache,
contadores de runtime
e uma requisição de exemplo protegida. A aba Audio também está ativa: ela expõe
ativação, um seletor de modelo somente STT com Auto, limites de timeout/clipe máximo,
contadores de áudio e um teste de exemplo com `input_audio`. A aba Video é funcional: ela reporta
o estado de runtime do FFmpeg/ffprobe — um de quatro estados explícitos de UI (`unknown` enquanto
a sondagem está em andamento ou não pôde ser concluída, `restricted` em um host de
dashboard não-loopback onde a sondagem é pulada no lado do cliente, `unavailable` uma vez sondado
e confirmado como ausente, ou `available` com as versões do FFmpeg/ffprobe) — persiste
limites de ativação/modelo/frames/vídeo/timeout, filtra o seletor de modelo para modelos
com capacidade de visão e expõe contadores de vídeo.

O antigo cartão Vision Bridge nas configurações de IA é um link de compatibilidade para a
nova página; ele não mantém mais uma segunda cópia do formulário. Media Providers também
vincula os fluxos de trabalho de Image-to-Text e Speech-to-Text às abas correspondentes do Modality
Bridge sem remover o playground de Speech-to-Text existente.

**Bypass de admissão do self-loop:** quando a chamada de describe roteia pelo
próprio self-loop `/v1` do OmniRoute (modelo de provedor não padrão), a sub-requisição envia
`x-omniroute-admission-bypass: internal` e é autenticada com a credencial de
self-loop resolvida — a sentinela local `sk_omniroute` no modo local, ou a
chave de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada pelo operador (#1350), para que
deployments com `REQUIRE_API_KEY=true` ainda possam executar a chamada de describe. O bypass
só é honrado para essas credenciais exatas, de modo que clientes externos não possam usar o
cabeçalho para pular a admissão.

Os padrões legados ficam em `src/shared/constants/visionBridgeDefaults.ts`; os
novos padrões de modo/task-aware/cache e o resolvedor de configurações ficam em
`src/shared/constants/modalityBridgeDefaults.ts`. O guardrail expõe uma
opção de construtor `deps` para que testes possam injetar implementações falsas de `getSettings` e
`callVisionModel`.

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

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em `messages` do Chat Completions e
`input` da Responses API antes que um destino sem suporte nativo a vídeo
conhecido seja chamado. Os formatos suportados são `input_video`, `video_url`,
`video_source`, URLs HTTPS e data URIs `data:video/*;base64,...`. Nomes de
arquivo simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) é responsável pelo
percorrimento da requisição, pela verificação de capacidade/política, pela
agregação por requisição e pelo payload de resposta. O trabalho por vídeo —
aquisição, o cache de resultado completo, a descrição de uma sequência de
quadros (que funde qualquer transcrição de áudio declarada pelo chamador) e as
métricas/aborto/limpeza por tentativa — fica oculto atrás de `processVideoPart`
em `videoBridgePipeline.ts`, chamado uma vez por parte de vídeo dentro do loop
de `preCall`. Esse módulo também define os limites explícitos de porta
`VideoMediaBrokerPort` (aquisição de bytes e extração de quadros amostrados),
`VideoAudioTranscriptionPort` (fusão de uma transcrição de áudio declarada pelo
chamador com as legendas amostradas) e `VideoDrilldownPort` (o limite de
persistência do drill-down de quadros; ainda não conectado a `processVideoPart`
— hoje apenas a rota separada `/api/modality-bridge/video/drilldown` grava
entradas de drill-down).

O caminho de requisição público `/v1` nunca importa nem invoca um subprocesso.
Vídeos remotos são baixados sob um limite de 50 MiB; vídeos base64 embutidos têm
um teto conservador de 36 MiB decodificados por vídeo, para que o envelope de
modelo/mensagens/enquadramento permaneça dentro do limite de admissão de
requisições JSON públicas de 50 MiB. O comprimento embutido e as estimativas de
tamanho decodificado são verificados antes da alocação. HTTPS é obrigatório na
URL remota inicial e em cada redirecionamento, usando o guarda de saída
somente-público existente com DNS pinning. Os bytes então atravessam o limite
exato do broker interno `POST /api/modality-bridge/video/extract`. Essa rota é
ao mesmo tempo `LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas uma requisição
autenticada por processo e de loopback confiável, e nunca aceita uma URL,
caminho de sistema de arquivos, executável ou lista de argumentos. O pipeline de
tamanho de corpo da API e o leitor incremental de corpo do handler impõem,
independentemente, um teto de entrada do broker de 50 MiB. Sua fila limitada
executa uma extração por vez, permite quatro trabalhos pendentes e limita a
entrada pendente a 100 MiB.

Dentro do broker, o `ffprobe` lê um arquivo local privado; a allowlist fixa de formatos exclui formatos de playlist e manifest. Para contêineres permitidos da família MOV, referências externas de dados MOV permanecem desabilitadas por padrão, e o comando fixo não opta por habilitá-las. Tanto o `ffprobe` quanto o `ffmpeg` usam a whitelist de protocolo somente `file`, uma thread, arrays de argumentos fixos, sem shell, e executáveis resolvidos a partir do `PATH`. Streams de capa do tipo attached-picture não são candidatos reproduzíveis. Todos os streams reproduzíveis devem satisfazer os limites, e um stream padrão explícito é preferido antes do fallback determinístico de menor índice. Os vídeos são limitados a 600 segundos, 8.192 pixels por dimensão e 33.554.432 pixels de origem. O FFmpeg amostra de 1 a 16 quadros JPEG de ponto médio, reduz a borda mais longa para no máximo 1.024 pixels sem ampliar entradas menores e nunca recebe uma URL. A amostragem é `uniform` por padrão. As políticas opcionais `scene_aware` e a experimental `segment_aware` executam uma passagem fixa adicional do FFmpeg sobre o stream local já validado, selecionam timestamps de cena limitados do `showinfo` e retornam deterministicamente aos mesmos pontos médios uniformes em caso de falha do detector, timeout, saída malformada ou conjunto de candidatos vazio. O modo segment-aware aloca amostras de ponto médio proporcionalmente aos intervalos de cena validados; as evidências do segment-aware e o comportamento de fallback são detalhados abaixo. O limite rígido de 16 quadros é aplicado após a seleção em todas as políticas. Quando uma requisição scene-aware tem orçamento de apenas um quadro, ela usa o ponto médio uniforme da janela ativa (vídeo completo ou janela de foco) e reporta `policyEffective: uniform`: um único quadro de cena selecionado não pode preservar ambas as extremidades temporais. O chamador pode, opcionalmente, fornecer uma janela de foco finita (segundos `start`/`end`); os limites são restringidos à duração da mídia, janelas invertidas ou não finitas são rejeitadas, e todas as políticas de amostragem são executadas apenas dentro do intervalo normalizado. A janela resultante é incluída nos metadados de amostragem e no prefixo de descrição não confiável, para que modelos downstream possam distinguir um trecho em foco da linha do tempo completa.

O foco semântico de legendas é uma configuração separada e explícita. O modo de análise `full`, padrão, preserva o prompt de quadros existente e nunca encaminha o texto da requisição ao modelo de legendas. No modo `focused`, o bridge lê apenas o `text`/`input_text` não vazio mais recente de autoria do usuário do mesmo contêiner Chat ou Responses, normaliza-o para NFC, colapsa caracteres de controle e espaços em branco e o limita a 500 pontos de código Unicode. Um resultado vazio retorna ao prompt `full` exato. Uma dica utilizável é serializada como JSON em um bloco dedicado de contexto de usuário não confiável e só pode priorizar detalhes observáveis; ela não pode sobrepor o aviso separado contra seguir instruções visíveis ou audíveis na mídia. O foco textual nunca infere `start`/`end` nem altera o amostrador temporal.

#### FU-07: evidência estrutural de segmentos

O `segment_aware` executa uma passagem limitada de pré-análise sobre o stream de vídeo local já validado. A cadeia de filtros fixa primeiro escala para no máximo 320 pixels de largura, detecta mudanças de cena e intervalos congelados e, em seguida, amostra a 1 quadro por segundo para desfoque, luma média e informação espacial/temporal. A passagem é limitada a 600 amostras estruturais, uma thread de FFmpeg/filtro, as mesmas allowlists de protocolo somente `file` e de contêineres, um limite de 1 MiB na saída do processo e no máximo 30 segundos dentro do abort/deadline compartilhado do broker. Ela nunca aceita comando, filtro, caminho ou URL da requisição.

Os valores estruturais são evidências determinísticas de amostragem, não compreensão semântica do vídeo. Eles não inferem sujeitos, ações, legendas, fala ou intenção do usuário. Fronteiras de cena e de congelamento formam segmentos; a cobertura de congelamento, o desfoque, a exposição, o detalhe espacial e a mudança temporal apenas influenciam como o orçamento existente de 1 a 16 quadros é alocado. Um segmento totalmente congelado é limitado a um quadro, enquanto segmentos não congelados competem pelo orçamento restante. Quando as fronteiras superam o número de quadros, a cobertura uniforme da linha do tempo é mantida, de modo que cortes rápidos no início não possam ocultar um segmento final longo. Fronteiras de cena dentro da resolução de análise de 1 segundo em torno de uma fronteira de congelamento são mescladas.

Filtros ausentes, evidências malformadas ou vazias, erro do detector ou o timeout limitado da pré-análise resultam em falha aberta (fail-open) para a política exata de pontos médios uniformes. Um abort do chamador ou um deadline do broker não resulta em falha aberta: ele encerra o subprocesso em andamento, impede a extração posterior de quadros, e a árvore temporária privada é removida no `finally`.

O `scripts/perf/video-bridge-fu07-eval.ts` gera fixtures reais e determinísticos de FFmpeg para economia de chamadas de legenda pós-deduplicação, alocação de orçamento em movimento denso, evidências de desfoque/exposição/SI-TI, cortes rápidos com cauda longa e falsos positivos de fade gradual. Ele registra o tempo decorrido (wall time) da pré-análise e, onde `/usr/bin/time` está disponível, a CPU do processo filho e o pico de RSS. Suas verificações de qualidade são apenas oráculos estruturais. A qualidade real do modelo de legendas permanece em `HOLD` porque este harness não possui endpoint autorizado nem juiz congelado. A economia monetária também permanece em `HOLD`, a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva e explícita por chamada; o script nunca fabrica nenhum dos dois resultados.

Cada frame é limitado a 4 MiB, todos os frames brutos somados a 23 MiB, e a resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido no `finally`. O OmniRoute não empacota o FFmpeg e não aceita um caminho de executável personalizado. Antes da legendagem, o bridge aplica uma passagem conservadora de desduplicação visual: cada JPEG é reduzido a um buffer em escala de cinza de 16×16 e é comparado apenas com o último frame retido. Para um orçamento de legendas solicitado acima de um frame, a extração fornece um pool de candidatos limitado a até o dobro desse orçamento e nunca mais de 16 frames. O limite solicitado é aplicado somente após a desduplicação, com o primeiro e o último candidatos selecionados preservados durante a redução final, quando o orçamento é de pelo menos dois. A política versionada `grayscale-16x16-mean-cells-v2` usa o maior valor entre o delta médio de luma e a proporção de células da miniatura cujo delta normalizado é de pelo menos 0.05. O limiar de duplicatas é a constante 0.04, escolhida por previsibilidade, em vez de ser exposta como uma configuração de runtime. Esse sinal secundário de alto contraste preserva pequenos movimentos e mudanças de texto visível que uma comparação baseada apenas na média pode ocultar. Erros do comparador ou do decodificador falham em modo aberto (fail open) e mantêm a cobertura. Os metadados de saída separam os candidatos extraídos, os frames efetivamente usados e as duplicatas visuais descartadas.

Uma parte de vídeo explicitamente marcada pode solicitar uma folha de contato (contact sheet) com timestamps. O bridge constrói no máximo uma grade JPEG de 4 colunas e 16 frames. Cada célula de 512 pixels grava o timestamp da fonte em uma faixa inferior de alto contraste, enquanto os mesmos timestamps permanecem nos metadados textuais para associação e auditoria em etapas posteriores. O JPEG completo permanece limitado a 32 MiB. Se o `sharp` não conseguir decodificar ou compor a grade, o bridge recorre aos frames JPEG individuais; um abort do cliente ainda se propaga pela operação da folha de contato.

A evidência de promoção é deliberadamente separada do microbenchmark sintético de composição. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um harness A/B com esquema versionado para modelos de visão reais compatíveis com OpenAI. Ele mede os tokens reportados pelo provedor, a latência wall-clock de ponta a ponta (incluindo a composição da folha), a contagem de chamadas ao modelo e a retenção de fatos definida no manifesto. As respostas brutas do modelo não são gravadas no relatório; apenas os digests SHA-256 e os IDs dos fatos correspondidos são retidos. O harness não faz chamadas de rede nem a modelos pagos, a menos que `--execute-real` seja passado e `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, seu veredito legível por máquina permanece `HOLD`; medições sintéticas de payload/contagem de chamadas por si só não são evidência de promoção.

Os chamadores podem anexar um array opcional `transcript.cues` a uma parte de vídeo suportada quando já possuírem texto alinhado. Cada cue deve carregar `text`, um intervalo finito `start`/`end` dentro da duração sondada, e um `source` incluído na whitelist (`client`, `embedded` ou `audio-bridge`); `confidence` tem como padrão `1` e deve permanecer entre `0` e `1`. Cues duplicados exatos são colapsados. O OmniRoute nunca inicia transcrição a partir desses metadados: os cues validados são copiados para o resultado descrito com source, confidence e intervalo, e são renderizados como observações não confiáveis junto às legendas dos frames. Texto inválido, fora do intervalo ou sem proveniência é rejeitado, em vez de ser misturado ao fluxo de legendas. Ambos os canais de transcrição do corpo da requisição normalizam a proveniência fornecida para `client`, inclusive rótulos `embedded` ou `audio-bridge` autodeclarados. Somente um adaptador controlado pelo servidor pode atribuir esses rótulos confiáveis por meio do argumento `trustedSource`, acessível apenas via código; um campo JSON da requisição não pode alcançar esse argumento. O texto da transcrição permanece conteúdo não confiável derivado de mídia, independentemente de sua proveniência, e nunca deve determinar autorização.

Um chamador avançado pode fornecer uma faixa `audioTranscript` para o mesmo vídeo; ela é tratada como texto fornecido pelo cliente, não como prova de transcrição pelo servidor. A junção de fusão executa as observações visuais e de áudio sob um único deadline e um único sinal de abort, ordena-as em uma linha do tempo comum, colapsa duplicatas exatas e reporta um resultado parcial quando apenas um lado tem sucesso. Um `audioTranscript` inválido degrada para esse resultado parcial — a descrição visual é mantida e o ramo de áudio registra um código de falha sanitizado — em vez de falhar o vídeo inteiro. A disponibilidade por ramo, a flag de parcial e os códigos de falha sanitizados são preservados no resultado descrito, nos metadados de guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), nos metadados do cache de resultados e nos contadores de fusão do bridge. O caminho padrão do Video Bridge não invoca conversão de fala em texto nem baixa uma segunda cópia da mídia; sem essa faixa explícita, ele permanece somente em vídeo.

**Retenção de transcrição (#12150 P1).** Isso se aplica automaticamente sempre que o
Video Bridge (ele mesmo opt-in) renderiza uma cue de transcrição — não existe um
flag de retenção separado. Quando uma requisição renderiza qualquer cue de
transcrição (uma `transcript` declarada pelo chamador ou uma `audioTranscript`
fundida), o guardrail a marca como `videoBridgeObserved` e produz uma sombra
redigida da descrição do vídeo — uma renderização idêntica na qual o corpo de
texto livre de cada cue é substituído por `[redacted-video-transcript]`,
construída substituindo o campo estruturado da cue antes que a string seja
montada (nunca analisando o texto achatado, de modo que nenhum conteúdo de cue
— adversarial ou comum, incluindo corpos contendo `]` como
`[inaudible]`/`[music]` — possa sobreviver). O corpo da requisição persistido no
log de chamadas substitui cada parte de texto derivada de vídeo por essa sombra
redigida, correspondida por igualdade de conteúdo; a âncora `fullText` é relida
do payload finalizado do guardrail pré-chamada, de modo que a correspondência
ainda tenha êxito depois que guardrails posteriores da cadeia (os mascaradores
de PII e credenciais, prioridades 10/95) reescrevam o texto da descrição no
local e depois que a injeção de prompt do sistema/handoff/memória remodelar o
array de mensagens. O corpo enviado upstream ao modelo permanece inalterado.
Uma requisição observada também não popula nenhuma Memory durável (tanto a
extração derivada da requisição quanto a derivada da resposta são ignoradas),
de modo que a própria resposta do modelo não pode ecoar texto da transcrição
para dentro da Memory.

**Campos de vídeo brutos (#12430).** Quando o bridge está habilitado e o suporte
nativo a vídeo é desconhecido ou ausente, campos `transcript`/`audioTranscript`
definidos também ativam `videoBridgeObserved`, mesmo após falha na descrição ou
um limite de `maxVideos`. `null` e strings vazias contam; campos ausentes e
metadados que não sejam de vídeo, não. Cópias retidas redigem esses campos ou
omitem a requisição, e caches/Memory são contornados.

Nesses caminhos de fallback, cues válidas do chamador tornam-se partes
`text`/`input_text` suportadas, em vez de campos de provedor não padronizados.
Ambas as trilhas fornecidas na requisição permanecem observações `client` não
confiáveis, com um aviso explícito de que o vídeo não foi descrito e de que os
timestamps não foram verificados em relação à mídia. Os orçamentos existentes
de 256 cues/64 KiB no total e por cue aplicam-se às duas trilhas em conjunto;
os timestamps devem se enquadrar no teto de 600 segundos do broker e em
qualquer janela de foco fornecida. Trilhas inválidas são descartadas, não
encaminhadas como texto arbitrário; uma trilha irmã válida ainda pode ser
usada, a menos que o orçamento combinado delas seja excedido. Campos
nulos/vazios não adicionam texto. Nenhuma busca de mídia ou transcrição é
adicionada por este fallback. Os campos de extensão de transcrição são
removidos do carrier de vídeo de fallback e de seus objetos
`video_url`/`source`. A allowlist de wire da OpenAI permanece estrita; carriers
de vídeo com suporte nativo desconhecido permanecem disponíveis e alvos
conhecidos como somente-texto mantêm marcadores seguros. Sombras de redação
estruturadas protegem o texto de transcrição anexado, enquanto a requisição
original, pertencente ao chamador, permanece inalterada. Alvos com suporte
nativo e bridges desabilitados mantêm seu comportamento de bypass existente.

Cópias retidas adicionais usam o mesmo sinal de requisição observada. O
snapshot bruto da requisição do cliente pré-guardrail, a requisição pendente em
memória e o log de requisições rejeitadas precocemente substituem
estruturalmente os campos de transcrição nas partes de vídeo; prompts em
formato de string sintetizados por estágios do pipeline e por handoff de
contexto são redigidos no sink do corpo da requisição persistida. O marcador
`video_content_removed` persistido faz com que a continuação via
`previous_response_id` falhe em modo fechado, em vez de reconstruir texto que
foi intencionalmente descartado. Se uma requisição observada perder sua sombra
de redação por parte antes do registro em log, ou se até mesmo uma entre várias
sombras de vídeo falhar em corresponder após mutações posteriores da
requisição, o corpo da requisição retido será omitido por completo, em vez de
reter uma transcrição parcialmente redigida.

Para uma requisição observada, uma resposta do modelo pode citar qualquer
trecho da transcrição sem um limite de cue estruturado. Seu `responseBody`
persistido no log de chamadas é, portanto, substituído por um marcador de
omissão; o artefato detalhado do pipeline (que pode incluir corpos de
upstream/cliente e chunks de stream) não é retido. Caches semântico, de
idempotência e de reasoning-replay contornam leituras e escritas para essa
requisição. A requisição ao provedor e a resposta visível ao cliente permanecem
inalteradas. Bytes de keepalive iniciais são drenados do buffer temporário
quando o artefato detalhado é omitido. O aviso de EventStream malformado do
Kiro relata apenas a contagem de bytes do payload, nunca seu conteúdo ou o erro
bruto do parser de JSON. Isso não afirma que todos os diagnósticos de
provedor/plugin não relacionados tenham sido auditados; a varredura mais ampla
de sinks retidos é rastreada em #11658.

O ciclo de vida do `/api/modality-bridge/video/drilldown` interno é um
substrato de cache separado, autenticado por loopback/token. Cada operação
também exige um ID de principal opaco canônico. Antes que um chamador de
produção seja habilitado, ele deve derivar esse ID do tenant autenticado e
nunca deve encaminhar um valor selecionado pelo cliente. As chaves de cache
vinculam esse principal a IDs canônicos de sessão e de referência de vídeo,
armazenam apenas suas chaves derivadas de SHA-256 e restringem tanto leituras
quanto exclusões ao mesmo principal. O cache armazena no máximo 16 frames JPEG
derivados por entrada, expira-os após dez minutos e suporta leituras limitadas
por `start`/`end` ou exclusão explícita da sessão.

Cada principal é limitado a 16 entradas e 64 MiB de dados JPEG canônicos.
Esses limites são independentes do teto global de 64 entradas/256 MiB: a
pressão de cota do principal remove apenas as entradas menos recentemente
usadas desse principal antes que a remoção LRU global seja considerada.
Entradas expiradas são varridas tanto da contabilização do principal quanto da
global durante a atividade do cache, enquanto cancelamento e falha de validação
não fazem commit de uma substituição parcial.

O cache rejeita Base64 não canônico, preenchimento excessivo, mídia não-JPEG, JPEGs malformados ou truncados e JPEGs que produzem um aviso durante uma decodificação `sharp` limitada de imagem completa. Ele recodifica cada imagem aceita como um JPEG canônico, deriva largura e altura dos bytes decodificados em vez de confiar nos campos do chamador e descarta quaisquer bytes poliglotas finais em vez de retê-los. Apenas o buffer comprimido canônico limitado é cobrado de ambas as cotas. O limite de transmissão JSON inclui a sobrecarga de Base64 para o teto de 32 MiB de entrada decodificada. Cada derivação armazenada registra seu formato/resolução JPEG validados, política de amostragem, versão da derivação, hora de criação, hash de conteúdo computado pelo servidor e referência de pai com hash, além do hash de conteúdo do pai fornecido pelo chamador confiável. O cancelamento é verificado entre as fases assíncronas de decodificação/hash antes do commit atômico do cache.

Este lote ainda não conecta um produtor de produção à rota e não fornece seleção de variantes de múltiplas resoluções. O caminho de requisição transparente do Video Bridge, portanto, não incorre em trabalho adicional, enquanto a derivação de principal vinculada ao tenant e o ciclo de vida completo de múltiplas resoluções FU-08 permanecem como trabalho de acompanhamento explícito, em vez de documentados como comportamento completo.

Os frames são legendados sequencialmente com o modelo de Vídeo configurado. Uma substituição de Vídeo vazia herda a configuração do Vision; se ambas estiverem vazias, o auto-roteador do Vision seleciona o modelo efetivo com capacidade de visão. Legendas bem-sucedidas substituem a parte original por um prefixo estável `[Video description:` que também marca o texto como uma observação não confiável derivada de mídia e instrui os modelos subsequentes a não seguir instruções encontradas na mídia. As chaves de cache de legendas de frames incluem os bytes JPEG, o prompt, o timestamp e o modelo efetivo; apenas legendas bem-sucedidas são armazenadas em cache. As entradas de cache retêm o modelo produtor real que teve sucesso, incluindo um modelo de fallback; o bridge relata `mixed` quando frames diferentes foram produzidos por modelos diferentes. Um acerto de cache reutiliza essa identidade de produtor em vez de reetiquetá-la como o plano de roteamento solicitado. O cache de resultados de vídeo completo é indexado por cada entrada que altera a saída — prompt, modelo efetivo, política de amostragem, contagem de frames, modo de análise semântica, a impressão digital SHA-256 da dica de foco normalizada, janela de foco, `transcript`, `audioTranscript` e a flag de contact-sheet — de modo que alterar qualquer uma dessas dimensões é um cache miss, nunca uma reutilização obsoleta. A versão da política de deduplicação visual, o limiar e a contagem limitada de frames candidatos também estão explícitos na chave e nos metadados do cache de resultados; uma mudança de política, portanto, não pode reutilizar uma descrição obsoleta de vídeo completo. Os metadados v4 do cache de resultados mantêm o modo e a impressão digital, nunca a tarefa bruta do usuário. Os metadados do guardrail relatam tanto o modo de análise solicitado quanto o efetivo; um modo `focused` solicitado sem texto de usuário utilizável é relatado como efetivamente `full`.

O guardrail extrai todas as partes de vídeo suportadas, mas descreve no máximo `modalityBridgeVideoMaxVideos`. Para um destino comprovadamente com `supportsVideo === false`, vídeos com falha e acima do limite tornam-se marcadores de texto seguros explícitos, de modo que nenhum vídeo bruto sobreviva. Quando a capacidade é desconhecida, essas partes retêm seu portador de vídeo; qualquer transcrição de fallback segue a conversão de texto limitada descrita acima. Destinos com `supportsVideo === true` ignoram o bridge. O sinal de abort da requisição do cliente propaga-se pelo download, fila do broker, subprocessos e chamadas de legenda; aborts param entre vídeos e nunca falham de forma aberta para mídia bruta.

As configurações de runtime são apoiadas pelo banco de dados e validadas pelo Zod:

| Chave                               | Padrão      | Faixa / comportamento                                                                                 |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opcional, opt-in                                                                              |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` preserva legendas genéricas; `focused` usa contexto limitado e não confiável do último usuário |
| `modalityBridgeVideoModel`          | `""`        | Herda o modelo do Vision Bridge                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ou `segment_aware` proporcional; falha do detector recorre a `uniform`       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Valores legados persistidos de timeout de Vídeo acima de 120 segundos são limitados ao prazo do broker; novas escritas de configurações acima desse limite são rejeitadas.
`GET /api/modality-bridge/video/runtime` exige localidade loopback carimbada confiável antes da autenticação ou da sondagem de runtime, e em seguida exige autenticação de gerenciamento. Retorna apenas `available`, versões sanitizadas do FFmpeg/ffprobe e um motivo fixo quando o runtime está indisponível. O endpoint interno de extração não é uma API pública de upload: a saturação da fila retorna `503` mais `Retry-After`, uma desconexão do chamador retorna `499` e o prazo fixo do broker retorna `504`. As respostas convertidas adicionam
`video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central
`x-omniroute-modality-bridge` sem remover os segmentos de Vision ou Audio.

### PII Masker (`piiMasker.ts`)

Executa em **ambos** os estágios.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e
  `prompt` (incluindo itens de string simples) e aplica `processPII()` (de
  `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`.
  Quando `PII_REDACTION_ENABLED=true`, as PII detectadas são mascaradas no
  payload de saída. Isso é independente de `INPUT_SANITIZER_MODE` (que controla
  apenas a política de injeção de prompt). Quando o mascaramento está
  desativado, a chamada registra as contagens de detecção sem reescrever o
  conteúdo.
- **`postCall`** clona profundamente a resposta, executa `sanitizePIIResponse()`
  junto com o mascarador do formato da API Responses (`maskResponsesOutput` —
  cobre `output_text` e `output[].content[].text`). Se ocorrer qualquer
  mascaramento, a resposta modificada substitui a original.

O guardrail nunca bloqueia; ele apenas anota (`meta.detections`,
`meta.redacted`) ou reescreve.

#### Seleção por tipo, padrões personalizados e contadores de detecção

**Dashboard → Configurações → Segurança → Mascaramento de PII** escolhe _o que_
é mascarado. Ele não ativa o mascaramento: isso ainda é responsabilidade de
`PII_REDACTION_ENABLED` (requisição) e `PII_RESPONSE_SANITIZATION` (resposta +
SSE), ambos desativados por padrão.

- **Seleção por tipo** — os ids internos estão listados em
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido
  significa todos os tipos (o comportamento anterior à existência desta
  configuração). O padrão `ssn_us` do motor de requisições é mapeado para
  `ssn`. Os modelos (Minimal, Standard, Financial, Brazilian, USA, Full) apenas
  preenchem as caixas de seleção na UI.
- **Padrões personalizados** — até 20 padrões regex ou curinga (`*` = até 64
  caracteres que não sejam espaço em branco, `?` = um). As correspondências
  tornam-se `[CUSTOM_REDACTED]`. Todo padrão passa por
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): no
  máximo 500 caracteres, flags limitadas a `g i m s u`, deve compilar, deve
  passar na verificação do `safe-regex` (backtracking catastrófico) e não deve
  corresponder a uma string vazia nem a um placeholder de mascaramento. Um
  padrão que falha é recusado ao salvar e ao testar, e uma linha armazenada
  que falha é ignorada em tempo de execução, em vez de ser compilada. Os
  padrões personalizados só são executados enquanto o mascaramento está
  ativado.
- **Contadores de detecção** — contagens por tipo (nunca os valores
  correspondidos), mantidas em memória e zeradas na reinicialização
  (`src/lib/pii/piiDetectionStats.ts`). Elas só aumentam enquanto o
  mascaramento está ativado.

As configurações ficam na tabela `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) e são lidas por meio de um cache de 1 s. API:

| Método | Caminho                  | Finalidade                                                                   |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado das flags, `enabledTypes`, `customPatterns`, contadores de detecção   |
| `PUT`  | `/api/settings/pii`      | Substitui `enabledTypes` (`null` = todos) e/ou `customPatterns`              |
| `POST` | `/api/settings/pii/test` | Dry-run de um padrão contra uma amostra de no máximo 8 KB; nada é armazenado |

Todos os três exigem autenticação de gerenciamento e validam o corpo com Zod
(`src/shared/validation/schemas/piiSettings.ts`).

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

### Mascarador de Credenciais (`credentialMasker.ts`)

Executa em **ambos** os estágios, por último na cadeia padrão (prioridade `95`). Mascara
padrões conhecidos de chaves de API / tokens secretos no payload de saída (conteúdo de
mensagens, argumentos de chamadas de ferramenta, resultados de ferramentas) **e** na
resposta do provedor, de modo que uma credencial colada em um prompt (ou ecoada de volta
por um resultado de ferramenta) não vaze para o provedor upstream nem de volta ao cliente.

- **Somente opt-in**, mesma convenção do mascaramento de PII (adjacente à Regra Rígida
  nº 20): desabilitado a menos que `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Com isso desligado, o guardrail é um no-op —
  ele nunca bloqueia e nunca reescreve.
- `redactCredentials()` percorre toda a árvore do payload/resposta (`walkValue()`,
  seguro contra poluição de protótipo, seguro contra ciclos via `WeakSet`) e substitui
  as correspondências por um placeholder `[REDACTED:<type>]`, clonando apenas os ramos
  que realmente mudaram.
- `CREDENTIAL_PATTERNS` cobre chaves de provedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves
  de nuvem (AWS access key, Twilio, SendGrid, Mailgun), chaves privadas / JWTs,
  strings de conexão contendo credenciais (`mongodb://user:pass@...`, etc.) e um padrão
  genérico de valor de cabeçalho `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Chaves em formato de cabeçalho (`authorization`, `x-api-key`, `api-key`,
  `apikey`) são mascaradas estruturalmente (somente o valor, com o prefixo de esquema
  como `Bearer `/`Basic ` preservado) em vez de pela regex genérica de texto.
- O guardrail nunca bloqueia; ele apenas reescreve (`modifiedPayload` /
  `modifiedResponse`) e anota (`meta.credentialsRedacted`, `meta.count`).

Proteção contra regressão: `tests/unit/credential-masker-guardrail.test.ts`.

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
