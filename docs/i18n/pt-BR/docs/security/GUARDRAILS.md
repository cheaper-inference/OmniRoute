# Guardrails (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte da verdade:** `src/lib/guardrails/`
> **Última atualização:** 2026-08-29 — v3.8.51 (A proveniência da transcrição da Video Bridge é declarada pelo chamador,
> ainda não verificada pelo servidor — esclarecido conforme #11661)

Guardrails impõem segurança, política e transformações de conteúdo na fronteira
entre o OmniRoute e os provedores upstream. Cada guardrail pode inspecionar (e
opcionalmente rejeitar, transformar ou anotar) cargas de solicitação (`preCall`) e
respostas upstream (`postCall`).

O sistema é **fail-open**: se um guardrail falhar durante a execução, o registro
registra o erro e continua com o próximo guardrail em vez de falhar a
solicitação. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente.

## Proteções integradas

O registro carrega automaticamente seis proteções em ordem de prioridade durante a importação
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

### Ponte de visão (`visionBridge.ts`) — Ponte de modalidade PR-1

Intercepta solicitações que contêm imagens direcionadas a **modelos sem visão** e
redireciona toda a solicitação para um modelo com capacidade de visão ou substitui
as partes de imagem por descrições textuais produzidas por um modelo de visão
configurável antes da chamada upstream. Isso permite que provedores somente de
texto processem payloads multimodais de forma transparente.

Fluxo:

1. Ignora se o modelo de destino já for compatível com visão (a menos que apareça na
   lista de ponte forçada `isVisionBridgeForcedModel`).
2. Extrai partes de imagem por meio de `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega para o **detector unificado de
   mídia** `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a
   fonte única da verdade compartilhada com o filtro de compatibilidade de combo.
   A extração usa uma lista de permissões limitada a partes de nível superior com os formatos
   que `replaceImageParts` pode reinserir (o contrato de extração↔substituição): `image_url`
   da OpenAI, `source.type:"base64"` em base64 da Anthropic, URL da Anthropic
   `source.type:"url"` e `input_image` da Responses API. Correspondências
   aninhadas e formatos somente indicativos são material para o filtro de combo e nunca são extraídos.
   Ignora se nenhum for encontrado.
3. Resolve a configuração de runtime por meio de `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de configuração
   `modalityBridge*` têm precedência; as chaves legadas `visionBridge*` permanecem como
   **fallback por um ciclo** (janela de rollback). Ignora antes de qualquer
   varredura de mídia quando a ponte estiver desativada.
4. O seletor de modo (`modalityBridgeVisionMode`, consulte a tabela abaixo) decide entre
   redirecionar e descrever. O redirecionamento retorna `modifiedPayload` apenas com o `model`
   trocado, além dos metadados `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limita as imagens a `maxImages`, compõe o prompt sensível à tarefa,
   consulta o cache de descrições, chama o modelo de visão **em paralelo**
   (`Promise.allSettled`) e insere partes de texto `[Image N]: <description>`
   no lugar delas. Uma descrição com falha produz `null`, e a parte de imagem original é
   **preservada** (#4012) — exceto no caminho de descrição de combo quando todas as
   descrições falham; nesse caso, um upstream confirmado como sem visão recebe um
   placeholder `(unavailable — no vision-capable provider connected)` (#8430).
6. Retorna `modifiedPayload` + metadados (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Padrão | Comportamento                                                                                                                                                                                                                                                                                                                            |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Heurística legada, sem alterações (#6640/#7204): modelos que não são combo/`auto/` são redirecionados para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (nesse caso, descreve); destinos combo sempre descrevem.                                                                             |
| `describe` |        | Sempre descreve — o bloco de redirecionamento é completamente ignorado; o modelo escolhido pelo usuário sempre responde.                                                                                                                                                                                                                 |
| `reroute`  |        | Força o redirecionamento: a proteção que mantém o modelo com credenciais é ignorada. A proteção de credenciais do **destino** do redirecionamento ainda se aplica — quando não existe um destino de visão utilizável, a solicitação segue para a descrição, para que imagens brutas nunca cheguem a um backend somente de texto (#8430). |

Os modos forçados fazem short-circuit **antes** da execução da heurística automática; o comportamento
de `auto` é idêntico, byte por byte, ao da proteção anterior à PR-1.

#### Escopo da chave de API (`visionBridgeKeyScope.ts`)

Quando a chave de API do chamador restringe `allowedConnections`, pools de cota
(`allowedQuotas`) ou modelos (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a ponte seleciona somente
modelos de redirecionamento e descrição que a chave pode usar, em conexões que a chave
pode usar. A chamada de descrição sempre passa pelo self-loop do OmniRoute com
o cabeçalho `x-omniroute-self-loop-key-id`, para que a solicitação de chat receptora
aplique novamente a política de conexão e modelo dessa chave. `enforceApiKeyPolicy()`
respeita esse cabeçalho somente em conjunto com o bearer do self-loop, portanto ele pode
apenas restringir o acesso, e um id que não possa ser resolvido é rejeitado.

Se nenhum modelo de visão for permitido para a chave, o caminho de descrição não interfere,
e a solicitação passa sem alterações, seguindo o mesmo comportamento fail-open de uma
proteção desativada (metadados `{ skipped: true, reason: "no_permitted_vision_model" }`).
Solicitações sem chave e chaves sem essas restrições se comportam exatamente como
antes.

#### Prompt de descrição sensível à tarefa (`modalityBridgeVisionTaskAware`)

O padrão é **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) acrescenta
o texto da **última mensagem do usuário** (truncado em 500 caracteres) ao prompt
base de descrição, direcionando a descrição para o que o usuário realmente
solicitou (padrão codex-vision-proxy) e pedindo ao modelo de visão que transcreva
o texto visível. Com a flag desativada — ou sem texto do usuário — o prompt base
é usado sem alterações.

A própria solicitação compatível com OpenAI do self-loop de descrição
(`callVisionModelSingle()` em `visionBridgeHelpers.ts`) sempre solicita
`image_url.detail: "high"` — incondicionalmente, para cada chamador/provedor, sem
depender de qualquer sinal do cliente. A amostragem com baixo nível de detalhe
prejudica a precisão do OCR justamente na tarefa de transcrição de texto
solicitada por esse prompt; portanto, a própria chamada de descrição sempre
solicita alto nível de detalhe, independentemente do nível de detalhe usado pela
solicitação de entrada original. Isso afeta apenas o corpo interno da solicitação
de descrição; não altera como o OmniRoute encaminha o `image_url.detail` do
próprio chamador na solicitação principal — esse padrão é aplicado
separadamente, e apenas para clientes OpenCode detectados, em
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). A
ramificação no formato de transmissão do Anthropic do self-loop de descrição não
tem o campo `detail` e não é afetada por nenhum dos padrões.

#### Limite da saída da descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Padrão | Intervalo        |
| ------------------------------ | ------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ou 100–50000 |

`0` (padrão) significa **sem limite** — a descrição retornada por
`callVisionModel()` é repassada sem modificações, preservando o comportamento
existente. Qualquer valor no intervalo de 100–50000 trunca a descrição com um
sufixo `…` antes que ela seja reinserida como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`).
Aumente esse valor para tarefas de OCR com muitos detalhes, nas quais o modelo
downstream precisa da transcrição completa; reduza-o para limitar o uso de
tokens por modelos de visão prolixos. O campo do dashboard fica no painel
Avançado da aba Visão (`modality-bridge-max-chars` em
`ModalityBridgeVisionTab.tsx`) e ajusta qualquer valor entre 1 e 99 para o
limite mínimo de 100, mantendo um `0` explícito inalterado — `0` é, por si só,
um valor Zod válido
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), e não apenas
o padrão de “não definido”.

#### Cache de descrições (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para saídas de descrição, compartilhado por todo o
processo. Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
com enquadramento por prefixo de comprimento (sem colisões nos limites dos
campos). O componente de modelo é o modelo de bridge **configurado**, não o
modelo que efetivamente respondeu — `callVisionModel` pode recorrer
internamente a um fallback, e criar uma chave por tentativa fragmentaria o
cache. Descrições com falha nunca são armazenadas em cache. Configurações:

| Chave                           | Padrão | Intervalo |
| ------------------------------- | ------ | --------- |
| `modalityBridgeCacheEnabled`    | `true` | —         |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000   |

#### Normalização de imagens remotas (descrição em self-loop/busca em base64)

Quando a bridge busca uma imagem **remota** por conta própria — na chamada
interna de descrição do Anthropic e na conversão para base64 no formato de
transmissão do Claude (`ensureBase64ImagesForClaudeWire`), ambas por meio de
`fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — o URI de dados
resultante passa por `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de ser incorporado à solicitação do
modelo de visão. Imagens grandes demais são reduzidas para uma **borda maior de
2048px** (correspondendo ao limite de redimensionamento que OpenAI/Anthropic já
aplicam no servidor), o que reduz os bytes e a latência do upload sem alterar o
que o modelo de visão vê. O redimensionamento usa `sharp`, carregado por meio de
importação dinâmica: em uma plataforma na qual seu binário nativo não consegue
ser carregado, `normalizeDataUri()` **nunca lança uma exceção** — ele recorre ao
repasse dos bytes originais, de modo que o caminho de descrição/conversão para
base64 continue sempre funcionando. Bytes que não representam uma imagem (uma
busca que não retornou uma imagem decodificável) também são repassados sem
alterações. Essa normalização se limita às imagens que a bridge busca para sua
própria chamada interna — ela nunca é aplicada ao payload bruto repassado pelo
chamador, em conformidade com o princípio de mutação somente por adesão
(Regra Rígida nº 20).

#### Esquema de configurações + migração

As novas chaves `modalityBridge*` são validadas por Zod em
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, o trio
`modalityBridgeCache*` e o grupo `modalityBridgeAudio*` usado pela Audio Bridge.
A migração `141_modality_bridge_settings.sql` copia os valores legados
`visionBridge*` existentes para as novas chaves correspondentes (é idempotente
e nunca sobrescreve um valor `modalityBridge*` definido pelo operador); as
chaves legadas continuam aceitas como fallback de leitura por um ciclo de
lançamento.

#### Cabeçalho de transparência + estatísticas

As respostas transformadas pela descrição contêm
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(criado por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts` e
adicionado por `withModalityBridgeHeader()` em
`src/sse/handlers/chatHelpers.ts`). Solicitações redirecionadas **não** recebem
cabeçalho — o payload não foi alterado, e a troca de modelo já está visível no
campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gerenciamento, mesmo nível que
`GET /api/settings`) retorna os contadores por modalidade mantidos em memória
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e
`video`. `averageLatencyMs` usa `latencySamples`, e não todas as tentativas, como
denominador; uma operação sem medição de tempo não fabrica uma amostra de zero
milissegundo. `bridged` continua sendo o alias retrocompatível para conversões
bem-sucedidas; tentativas com falha não o incrementam.
Por design, os contadores são redefinidos quando o processo é reiniciado
(telemetria, não contabilização).

#### Configuração do dashboard

A página dedicada do dashboard é
`/dashboard/settings/modality-bridge`. Suas abas `Vision`, `Audio` e
`Video`, endereçáveis por URL, preservam os parâmetros de consulta ao alternar
o valor de `tab`.
A aba Vision disponibiliza ativação, modo, seleção de modelo (incluindo o padrão
automático), prompts sensíveis à tarefa, limites avançados de tempo limite/imagem/comprimento
da descrição/cache, contadores de
tempo de execução e uma solicitação de exemplo protegida. A aba Audio também está
ativa: ela disponibiliza ativação, um seletor de modelos exclusivos para STT com Auto,
limites de tempo e duração máxima do clipe, contadores de áudio e um teste de exemplo
com `input_audio`. A aba Video é funcional: ela informa o estado do FFmpeg/ffprobe
em tempo de execução — um entre quatro estados explícitos da interface (`unknown`
enquanto a sondagem está em andamento ou não pôde ser concluída, `restricted` em um host
de dashboard que não seja loopback, no qual a sondagem é ignorada no lado do cliente,
`unavailable` após a sondagem confirmar que está ausente, ou `available` com as versões
do FFmpeg/ffprobe) —, persiste os limites de ativação/modelo/quadros/vídeo/tempo limite,
filtra o seletor de modelos para modelos compatíveis com visão e disponibiliza contadores
de vídeo.

O antigo cartão Vision Bridge nas configurações de IA agora é um link de compatibilidade
para a nova página; ele não mantém mais uma segunda cópia do formulário. Media Providers
também vincula os fluxos de trabalho Image-to-Text e Speech-to-Text às abas correspondentes
do Modality Bridge sem remover o playground existente de Speech-to-Text.

**Desvio de admissão para self-loop:** quando a chamada de descrição é roteada pelo
próprio self-loop `/v1` do OmniRoute (modelo de provedor não padrão), a subsolicitação
envia `x-omniroute-admission-bypass: internal` e é autenticada com a credencial
resolvida do self-loop — o sentinela local `sk_omniroute` no modo local ou a chave
de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada pelo operador (#1350),
para que implantações com `REQUIRE_API_KEY=true` ainda possam executar a chamada de
descrição. O desvio só é aceito para essas credenciais exatas, portanto clientes
externos não podem usar o cabeçalho para ignorar a admissão.

Os padrões legados ficam em `src/shared/constants/visionBridgeDefaults.ts`; os
novos padrões de modo/sensibilidade à tarefa/cache e o resolvedor de configurações ficam
em `src/shared/constants/modalityBridgeDefaults.ts`. O guardrail disponibiliza uma
opção de construtor `deps` para que os testes possam injetar implementações falsas de
`getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepta solicitações de chat que contêm áudio antes que cheguem a um destino que
não é reconhecido como capaz de aceitar entrada de áudio. Ele nunca redireciona a
solicitação de chat: as partes de áudio são transcritas pelo endpoint multipart
compatível com OpenAI existente, e o modelo de chat escolhido continua com as
transcrições em texto.

Fluxo:

1. Resolve `supportsAudio` por meio de `getResolvedModelCapabilities()`. Metadados
   explícitos do registro de provedores têm precedência, seguidos pelos metadados
   estáticos do modelo e, depois, por `modalities_input` sincronizado. Uma lista de
   entradas declarada sem `audio` resulta em `false`; a ausência de evidências de
   capacidade resulta em `null`. Tanto `false` quanto `null` ativam a ponte
   conservadora, enquanto `true` a ignora.
2. Resolve as configurações `modalityBridgeAudio*` e extrai partes de áudio de nível
   superior que podem ser removidas de todas as mensagens por meio do detector
   compartilhado `detectMediaParts()`. Os formatos de transmissão compatíveis são
   `input_audio` e `audio_url` do OpenAI, além de
   `source.media_type: "audio/*"`. Áudios aninhados são detectados para roteamento,
   mas não são removidos pelo caminho de remoção. O trabalho é limitado por
   `modalityBridgeAudioMaxClips`; as partes posteriores permanecem inalteradas.
3. Respeita um `provider/model` configurado ou permite que
   `selectAudioBridgeModel()` percorra `AUDIO_TRANSCRIPTION_PROVIDERS` na ordem
   estável do catálogo e selecione o primeiro modelo com uma credencial ativa e
   utilizável do provedor.
4. `callAudioTranscription()` converte áudio em base64/URI de dados em um `file`
   multipart ou baixa um `audio_url` remoto por meio da proteção de saída somente
   pública, com fixação de DNS e limite de 25 MB. Em seguida, envia via POST o arquivo
   e o modelo selecionado para o self-loop local `/v1/audio/transcriptions`,
   autenticado com `resolveSelfLoopBearer()`. A rota de transcrição existente realiza
   a busca normal de credenciais, o tratamento de cooldown/limite de taxa e o despacho
   para o provedor.
5. Chamadas bem-sucedidas substituem suas partes por
   `[Audio N]: <transcript>`. As chamadas são executadas com `Promise.allSettled`:
   uma falha individual preserva a parte de áudio original (contrato #4012). Se todas
   as chamadas falharem e for comprovado que o destino tem
   `supportsAudio === false`, as partes se tornam
   `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para
   um destino desconhecido (`null`), um resultado em que todas as chamadas falharam
   permanece inalterado. Um destino comprovadamente exclusivo para texto e sem uma
   credencial STT utilizável recebe o mesmo marcador explícito sem que uma chamada de
   rede seja realizada.

As transcrições bem-sucedidas usam o cache LRU/TTL do Modality Bridge compartilhado
por todo o processo. A chave combina a referência do áudio, o rótulo estável da
operação `audio-transcription` e o modelo STT selecionado; falhas nunca são armazenadas
em cache. As tentativas de áudio atualizam os contadores compartilhados `bridged`,
`cacheHits`, `failures` e `lastUsedAt`.
As respostas transformadas incluem
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; solicitações
inalteradas não recebem um segmento do Audio Bridge.

As configurações de tempo de execução são armazenadas no banco de dados e validadas
pelo Zod:

| Chave                         | Padrão  | Intervalo               |
| ----------------------------- | ------- | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                       |
| `modalityBridgeAudioModel`    | `""`    | Automático ou ID de STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                    |

O cache compartilhado continua sendo controlado por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepta partes de vídeo de nível superior em `messages` de Chat Completions e
em `input` da API Responses antes que seja chamado um destino sem suporte nativo
conhecido a vídeo. Os formatos compatíveis são `input_video`, `video_url`,
`video_source`, URLs HTTPS e URIs de dados `data:video/*;base64,...`. Nomes de
arquivos simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) é responsável pela travessia da
solicitação, pela verificação de capacidade/política, pela agregação por
solicitação e pelo payload da resposta. O trabalho por vídeo — aquisição, cache
do resultado completo, descrição de uma sequência de quadros (que incorpora
qualquer transcrição de áudio declarada pelo chamador) e
métricas/abortamento/limpeza por tentativa — fica oculto por trás de
`processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez por parte de
vídeo dentro do loop de `preCall`. Esse módulo também define os limites
explícitos das portas `VideoMediaBrokerPort` (aquisição de bytes e extração de
quadros amostrados), `VideoAudioTranscriptionPort` (incorporação de uma
transcrição de áudio declarada pelo chamador às legendas amostradas) e
`VideoDrilldownPort` (o limite de persistência do detalhamento de quadros; ainda
não conectado a `processVideoPart` — atualmente, somente a rota separada
`/api/modality-bridge/video/drilldown` grava entradas de detalhamento).

O caminho público de solicitação `/v1` nunca importa nem invoca um subprocesso.
Vídeos remotos são baixados respeitando um limite de 50 MiB; vídeos base64
incorporados têm um limite conservador de 36 MiB decodificados por vídeo, para
que o envelope de modelo/mensagens/enquadramento permaneça dentro do limite
público de admissão de solicitações JSON de 50 MiB. O comprimento incorporado e
as estimativas de tamanho decodificado são verificados antes da alocação. HTTPS
é obrigatório na URL remota inicial e em cada redirecionamento, usando a
proteção existente de saída somente pública com fixação de DNS. Em seguida, os
bytes atravessam exatamente o limite do broker interno
`POST /api/modality-bridge/video/extract`. Essa rota é tanto `LOCAL_ONLY` quanto
`SPAWN_CAPABLE`, aceita somente uma solicitação autenticada por processo e de
loopback confiável, e nunca aceita uma URL, um caminho do sistema de arquivos,
um executável ou uma lista de argumentos. O pipeline de tamanho do corpo da API
e o leitor incremental de corpo do manipulador aplicam, independentemente, um
limite de entrada de 50 MiB no broker. Sua fila limitada executa uma extração
por vez, permite quatro trabalhos pendentes e limita a entrada pendente a
100 MiB.

Dentro do broker, o `ffprobe` lê um arquivo local privado; a lista fixa de
formatos permitidos exclui formatos de playlist e manifesto. Para contêineres
permitidos da família MOV, as referências externas a dados MOV permanecem
desabilitadas por padrão, e o comando fixo não as habilita. Tanto o `ffprobe`
quanto o `ffmpeg` usam a lista de protocolos permitidos somente para `file`,
uma thread, arrays de argumentos fixos, nenhum shell e executáveis resolvidos a
partir de `PATH`. Fluxos de capa com imagem anexada não são candidatos
reproduzíveis. Todos os fluxos reproduzíveis devem atender aos limites, e um
fluxo padrão explícito tem preferência antes do fallback determinístico para o
menor índice. Os vídeos são limitados a 600 segundos, 8.192 pixels por dimensão
e 33.554.432 pixels de origem. O FFmpeg coleta de 1 a 16 quadros JPEG nos pontos
médios, reduz a escala da borda mais longa para, no máximo, 1.024 pixels sem
ampliar entradas menores e nunca recebe uma URL. A amostragem é `uniform` por
padrão. As políticas opcionais `scene_aware` e a experimental `segment_aware`
executam uma passagem fixa adicional do FFmpeg sobre o fluxo local já validado,
selecionam timestamps de cena limitados do `showinfo` e fazem fallback
determinístico para os mesmos pontos médios uniformes em caso de falha do
detector, timeout, saída malformada ou conjunto de candidatos vazio. O modo com
reconhecimento de segmentos aloca amostras de pontos médios proporcionalmente
aos intervalos de cena validados; as evidências e o comportamento de fallback
desse modo são detalhados abaixo. O limite rígido de 16 quadros é aplicado após
a seleção em todas as políticas. Quando uma solicitação com reconhecimento de
cena tem um orçamento de apenas um quadro, ela usa o ponto médio uniforme do
vídeo completo ativo ou da janela de foco e informa `policyEffective: uniform`:
um único quadro de cena selecionado não consegue preservar ambas as
extremidades temporais. Opcionalmente, um chamador pode fornecer uma janela de
foco finita (`start`/`end` em segundos); os limites são restringidos à duração
da mídia, janelas invertidas ou não finitas são rejeitadas e todas as políticas
de amostragem são executadas somente dentro do intervalo normalizado. A janela
resultante é incluída nos metadados de amostragem e no prefixo não confiável da
descrição, para que os modelos subsequentes consigam distinguir um trecho em
foco da linha do tempo completa.

O foco semântico das legendas é uma configuração separada e explícita. O modo
de análise padrão `full` preserva o prompt de quadro existente e nunca encaminha
o texto da solicitação ao modelo de legendagem. No modo `focused`, a ponte lê
somente o `text`/`input_text` mais recente, não vazio e criado pelo usuário, no
mesmo contêiner de Chat ou Responses, normaliza-o para NFC, reduz caracteres de
controle e espaços em branco e o limita a 500 pontos de código Unicode. Um
resultado vazio faz fallback para o prompt `full` exato. Uma dica utilizável é
serializada como JSON em um bloco dedicado de contexto de usuário não confiável
e pode apenas priorizar detalhes observáveis; ela não pode substituir o aviso
separado contra seguir instruções visíveis ou audíveis na mídia. O foco textual
nunca infere `start`/`end` nem altera o amostrador temporal.

#### Evidência estrutural de segmentos FU-07

`segment_aware` usa uma única passagem limitada de pré-análise sobre o fluxo de vídeo local já validado. A cadeia fixa de filtros primeiro reduz a escala para, no máximo, 320 pixels de largura, detecta mudanças de cena e intervalos congelados e, em seguida, faz uma amostragem de 1 quadro por segundo para avaliar desfoque, luminância média e informações espaciais/temporais. A passagem é limitada a 600 amostras estruturais, uma thread de FFmpeg/filtro, às mesmas listas de permissões do protocolo exclusivo `file` e de contêineres, a um limite de saída do processo de 1 MiB e a, no máximo, 30 segundos dentro do mecanismo compartilhado de cancelamento/prazo do broker. Ela nunca aceita um comando, filtro, caminho ou URL proveniente da solicitação.

Os valores estruturais são evidências de amostragem determinísticas, não uma compreensão semântica do vídeo. Eles não inferem sujeitos, ações, legendas, fala nem a intenção do usuário. Os limites de cenas e congelamentos formam segmentos; a cobertura de congelamento, o desfoque, a exposição, os detalhes espaciais e a mudança temporal influenciam apenas como o orçamento existente de 1–16 quadros é alocado. Um segmento totalmente congelado é limitado a um quadro, enquanto segmentos não congelados disputam o orçamento restante. Quando há mais limites do que quadros, a cobertura uniforme da linha do tempo é mantida para que cortes rápidos no início não possam ocultar um segmento final longo. Os limites de cenas que estiverem dentro da resolução de análise de 1 segundo de um limite de congelamento são aglutinados.

Filtros ausentes, evidências malformadas/vazias, um erro do detector ou o tempo limite da pré-análise limitada resultam em degradação permissiva para a política exata de pontos médios uniformes. Um cancelamento pelo chamador ou o prazo do broker não resulta em degradação permissiva: ele encerra o subprocesso em andamento, impede a extração posterior de quadros e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera fixtures determinísticas reais do FFmpeg para avaliar a economia de chamadas de legendagem após a desduplicação, a alocação do orçamento em movimento denso, evidências de desfoque/exposição/SI-TI, cortes rápidos com um trecho final longo e falsos positivos de transições graduais. Ele registra o tempo decorrido da pré-análise e, quando `/usr/bin/time` está disponível, a CPU do processo filho e o pico de RSS. Suas verificações de qualidade são apenas oráculos estruturais. A qualidade do modelo real de legendagem permanece como `HOLD`, pois esse harness não possui um endpoint autorizado nem um avaliador congelado. A economia monetária também permanece como `HOLD`, a menos que `--caption-cost-per-call-usd` forneça uma estimativa positiva explícita do custo por chamada; o script nunca inventa nenhum desses resultados.

Cada quadro é limitado a 4 MiB, todos os quadros brutos juntos a 23 MiB e a resposta serializada do broker a 32 MiB. Um diretório temporário privado é removido em `finally`. O OmniRoute não inclui o FFmpeg e não aceita um caminho de executável personalizado. Antes da legendagem, a ponte aplica uma passagem conservadora de desduplicação visual: cada JPEG é reduzido a um buffer em escala de cinza de 16×16 e comparado apenas com o último quadro mantido. Para um orçamento de legendagem solicitado superior a um quadro, a extração fornece um conjunto limitado de candidatos de até o dobro desse orçamento e nunca superior a 16 quadros. O limite solicitado é aplicado somente após a desduplicação, preservando-se o primeiro e o último candidatos selecionados durante a redução final quando o orçamento é de pelo menos dois. A política versionada
`grayscale-16x16-mean-cells-v2` usa o maior valor entre a variação média de luminância e a proporção de células da miniatura cuja variação normalizada seja de pelo menos 0,05. O limiar de duplicidade é a constante 0,04, escolhida pela previsibilidade, em vez de ser exposta como uma configuração de tempo de execução. Esse sinal secundário de alto contraste preserva pequenos movimentos e alterações de texto visível que uma comparação baseada apenas na média pode ocultar. Erros do comparador ou do decodificador resultam em degradação permissiva e mantêm a cobertura. Os metadados de saída distinguem os candidatos extraídos, os quadros usados com sucesso e as duplicatas visuais descartadas.

Uma parte de vídeo marcada explicitamente pode solicitar uma folha de contatos com carimbos de data/hora. A ponte cria uma grade JPEG de, no máximo, 4 colunas e 16 quadros. Cada célula de 512 pixels incorpora o carimbo de data/hora da origem em uma faixa inferior de alto contraste, enquanto os mesmos carimbos de data/hora permanecem nos metadados textuais para associação e auditoria posteriores. O JPEG completo permanece limitado a 32 MiB. Se `sharp` não conseguir decodificar ou compor a grade, a ponte recorre aos quadros JPEG individuais; um cancelamento pelo cliente ainda se propaga pela operação da folha.

As evidências de promoção são deliberadamente separadas do microbenchmark de composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define um harness A/B com esquema versionado para modelos de visão reais compatíveis com a OpenAI. Ele mede os tokens informados pelo provedor, a latência de ponta a ponta (incluindo a composição da folha), a contagem de chamadas ao modelo e a retenção de fatos definida pelo manifesto. As respostas brutas do modelo não são gravadas no relatório; somente resumos SHA-256 e IDs dos fatos correspondentes são mantidos. O harness não realiza nenhuma chamada de rede nem de modelo pago, a menos que `--execute-real` seja fornecido e `--model`, `OMNIROUTE_BASE_URL` e `OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, seu veredito legível por máquina permanece como `HOLD`; as medições sintéticas de payload/contagem de chamadas, por si sós, não constituem evidências de promoção.

Os chamadores podem anexar um array opcional `transcript.cues` a uma parte de vídeo compatível quando já possuem texto alinhado. Cada indicação deve conter `text`, um intervalo finito `start`/`end` dentro da duração sondada e um `source` presente na lista de permissões (`client`, `embedded` ou `audio-bridge`); `confidence` tem como padrão `1` e deve permanecer entre `0` e `1`. Indicações exatamente duplicadas são consolidadas. O OmniRoute nunca inicia a transcrição a partir desses metadados: as indicações validadas são copiadas para o resultado descrito com origem, confiança e intervalo, e são renderizadas como observações não confiáveis junto às legendas dos quadros. Texto inválido, fora do intervalo ou sem proveniência é rejeitado em vez de ser misturado ao fluxo de legendas. Ambos os canais de transcrição do corpo da solicitação normalizam a proveniência fornecida para `client`, inclusive rótulos `embedded` ou `audio-bridge` autodeclarados. Somente um adaptador controlado pelo servidor pode atribuir esses rótulos confiáveis por meio do argumento exclusivo de código `trustedSource`; um campo JSON da solicitação não consegue alcançar esse argumento. O texto da transcrição continua sendo conteúdo não confiável derivado de mídia, independentemente de sua proveniência, e nunca deve determinar a autorização.

Um chamador avançado pode fornecer uma faixa `audioTranscript` para o mesmo vídeo;
ela é tratada como texto fornecido pelo cliente, não como prova de transcrição pelo servidor.
O ponto de fusão executa as observações visuais e de áudio sob
um único prazo e sinal de cancelamento, ordena-as em uma linha do tempo comum, agrega
duplicatas exatas e relata um resultado parcial quando apenas um dos lados é bem-sucedido.
Um `audioTranscript` inválido é degradado para esse resultado parcial — a descrição
visual é mantida e a ramificação de áudio registra um código de falha sanitizado —
em vez de causar a falha de todo o vídeo. A disponibilidade por ramificação, o indicador de resultado parcial
e os códigos de falha sanitizados são preservados no resultado descrito, nos
metadados de proteção (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nos metadados do cache de resultados e nos contadores
de fusão da ponte. O caminho padrão do Video Bridge não invoca conversão de fala em texto
nem baixa uma segunda cópia da mídia; sem essa faixa explícita, ele permanece
somente com vídeo.

**Retenção de transcrições (#12150 P1).** Isso se aplica automaticamente sempre que o
Video Bridge (que, por sua vez, é opcional) renderiza uma indicação de transcrição — não há um
indicador de retenção separado. Quando uma solicitação renderiza qualquer indicação de transcrição (um
`transcript` declarado pelo chamador ou um `audioTranscript` fundido), a proteção a marca como
`videoBridgeObserved` e produz uma cópia paralela expurgada da descrição do vídeo —
uma renderização idêntica na qual o corpo de texto livre de cada indicação é substituído por
`[redacted-video-transcript]`, criada pela substituição do campo estruturado da indicação
antes que a string seja montada (nunca pela análise do texto achatado, de modo que nenhum
conteúdo da indicação — adversarial ou comum, incluindo corpos que contenham `]`, como
`[inaudible]`/`[music]` — possa sobreviver). O corpo da solicitação persistido no registro de chamadas troca
cada parte de texto derivada do vídeo por essa cópia paralela expurgada, comparada por igualdade
de conteúdo; a âncora `fullText` é lida novamente da carga útil de proteção pré-chamada finalizada,
de modo que a correspondência continue funcionando depois que proteções posteriores da cadeia (os mascaradores de PII e
credenciais, com prioridades 10/95) reescrevam o texto da descrição no próprio local e
depois que a injeção de prompt do sistema/handoff/memória remodele o array de mensagens. O
corpo enviado ao modelo permanece inalterado. Uma solicitação observada também não preenche
nenhuma Memory durável (a extração derivada tanto da solicitação quanto da resposta é ignorada),
portanto, a própria resposta do modelo não pode repetir texto da transcrição na Memory.

**Campos de vídeo brutos (#12430).** Quando a ponte está habilitada e o suporte nativo a vídeo é desconhecido ou inexistente, campos `transcript`/`audioTranscript` definidos também ativam `videoBridgeObserved`, mesmo após uma falha na descrição ou um limite de `maxVideos`. `null` e strings vazias contam; campos ausentes e metadados que não sejam de vídeo não contam. As cópias retidas expurgam esses campos ou omitem a solicitação, e caches/Memory são ignorados.

Nesses caminhos de fallback, indicações válidas do chamador tornam-se partes
`text`/`input_text` compatíveis, em vez de campos não padronizados do provedor. Ambas as faixas
fornecidas na solicitação permanecem como observações `client` não confiáveis, com um aviso explícito
de que o vídeo não foi descrito e os carimbos de data/hora não foram verificados em relação à mídia. Os limites existentes
de 256 indicações/64 KiB no total e por indicação aplicam-se às duas faixas em conjunto;
os carimbos de data/hora devem respeitar o teto de 600 segundos do broker e qualquer janela de foco
fornecida. Faixas inválidas são descartadas, não encaminhadas como texto arbitrário; uma faixa
irmã válida ainda pode ser usada, a menos que o orçamento combinado seja excedido. Campos nulos/vazios
não adicionam texto. Nenhuma busca de mídia ou transcrição é adicionada por esse fallback.
Os campos de extensão da transcrição são removidos do contêiner de vídeo de fallback e de seus
objetos `video_url`/`source`. A lista de permissões no formato de transmissão da OpenAI permanece rigorosa; contêineres
de vídeo cujo suporte nativo é desconhecido permanecem disponíveis, e destinos conhecidos que aceitam apenas texto mantêm marcadores seguros.
Cópias paralelas de expurgo estruturado protegem o texto de transcrição anexado, enquanto a
solicitação original pertencente ao chamador permanece inalterada. Destinos com suporte nativo e
pontes desabilitadas mantêm seu comportamento atual de bypass.

Cópias retidas adicionais usam o mesmo sinal de solicitação observada. O snapshot bruto
da solicitação do cliente anterior à proteção, a solicitação pendente em memória e o registro antecipado
de solicitação rejeitada substituem estruturalmente os campos de transcrição nas partes de vídeo;
prompts em string sintetizados pelos estágios do pipeline e pelo handoff de contexto são expurgados
no destino do corpo persistido da solicitação. O marcador `video_content_removed` persistido
faz com que a continuação por `previous_response_id` falhe de forma segura, em vez de reconstruir
texto que foi descartado intencionalmente. Se uma solicitação observada perder sua
cópia paralela de expurgo por parte antes do registro, ou mesmo se uma entre várias cópias paralelas de vídeo
não corresponder após mutações posteriores da solicitação, o corpo retido da solicitação será
inteiramente omitido, em vez de reter uma transcrição parcialmente expurgada.

Para uma solicitação observada, uma resposta do modelo pode citar qualquer parte da
transcrição sem um limite estruturado de indicação. Portanto, seu `responseBody` persistido no registro
de chamadas é substituído por um marcador de omissão; o artefato detalhado do
pipeline (que pode incluir corpos do upstream/cliente e blocos de streaming) não é retido.
Os caches semântico, de idempotência e de replay de raciocínio ignoram
leituras e gravações para essa solicitação. A solicitação ao provedor e a resposta visível
ao cliente permanecem inalteradas. Os bytes de keepalive antecipados são drenados do buffer
temporário quando o artefato detalhado é omitido. O aviso de EventStream malformado do Kiro
relata apenas a contagem de bytes da carga útil, nunca seu conteúdo nem o erro bruto
do analisador de JSON.
Isso não alega que todos os diagnósticos não relacionados de provedores/plugins tenham sido
auditados; a varredura mais ampla dos destinos de retenção é acompanhada em #11658.

O ciclo de vida interno de `/api/modality-bridge/video/drilldown` é um substrato de cache separado, autenticado por loopback/token. Cada operação também exige um ID de principal opaco canônico. Antes que um chamador de produção seja habilitado, ele deve derivar esse ID a partir do tenant autenticado e nunca deve encaminhar um valor selecionado pelo cliente. As chaves de cache vinculam esse principal a IDs canônicos de sessão e de referência de vídeo, armazenam apenas suas chaves derivadas por SHA-256 e restringem tanto as leituras quanto a exclusão ao mesmo principal. O cache armazena no máximo 16 quadros JPEG derivados por entrada, expira-os após dez minutos e oferece suporte a leituras delimitadas por `start`/`end` ou à exclusão explícita da sessão.

Cada principal é limitado a 16 entradas e 64 MiB de dados JPEG canônicos. Esses limites são independentes do teto global de 64 entradas/256 MiB: a pressão da cota do principal remove apenas as entradas usadas menos recentemente desse principal antes que a remoção LRU global seja considerada. As entradas expiradas são removidas tanto da contabilização do principal quanto da global durante a atividade do cache, enquanto o cancelamento e a falha de validação não confirmam uma substituição parcial.

O cache rejeita Base64 não canônico, preenchimento excessivo, mídia que não seja JPEG, JPEGs malformados ou truncados e JPEGs que produzam um aviso durante uma decodificação completa e delimitada da imagem com `sharp`. Ele recodifica cada imagem aceita como um JPEG canônico, deriva a largura e a altura dos bytes decodificados em vez de confiar nos campos fornecidos pelo chamador e descarta quaisquer bytes poliglotas ao final em vez de retê-los. Somente o buffer comprimido canônico e delimitado é contabilizado em ambas as cotas. O limite de transferência JSON inclui a sobrecarga de Base64 para o teto de 32 MiB da entrada decodificada. Cada derivação armazenada registra seu formato/resolução JPEG validado, política de amostragem, versão de derivação, horário de criação, hash de conteúdo calculado pelo servidor e referência pai com hash, além do hash do conteúdo pai fornecido pelo chamador confiável. O cancelamento é verificado entre as fases assíncronas de decodificação/hash antes da confirmação atômica no cache.

Esta etapa ainda não conecta um produtor de produção à rota e não oferece seleção de variantes com múltiplas resoluções. Portanto, o caminho transparente de solicitação do Video Bridge não incorre em trabalho adicional, enquanto a derivação de principal vinculada ao tenant e o ciclo de vida completo de múltiplas resoluções do FU-08 permanecem como trabalho de acompanhamento explícito, em vez de serem documentados como comportamento concluído.

Os quadros recebem legendas sequencialmente com o modelo de Video configurado. Uma substituição de Video vazia herda a configuração de Vision; se ambas estiverem vazias, o roteador automático de Vision seleciona o modelo efetivo compatível com visão. As legendas bem-sucedidas substituem a parte original por um prefixo estável `[Video description:` que também marca o texto como uma observação não confiável derivada de mídia e instrui os modelos subsequentes a não seguirem instruções encontradas na mídia. As chaves de cache das legendas dos quadros incluem os bytes JPEG, o prompt, o carimbo de data/hora e o modelo efetivo; somente legendas bem-sucedidas são armazenadas em cache. As entradas de cache retêm o modelo produtor que realmente obteve êxito, incluindo um modelo de fallback; a ponte relata `mixed` quando quadros diferentes foram produzidos por modelos diferentes. Um acerto de cache reutiliza essa identidade do produtor em vez de reclassificá-la como o plano de roteamento solicitado. O cache de resultados do vídeo inteiro é indexado por todas as entradas que alteram a saída — prompt, modelo efetivo, política de amostragem, contagem de quadros, modo de análise semântica, fingerprint SHA-256 da dica de foco normalizada, janela de foco, `transcript`, `audioTranscript` e o sinalizador de folha de contatos — portanto, alterar qualquer uma dessas dimensões resulta em uma falha de cache, nunca em reutilização obsoleta. A versão da política de desduplicação visual, o limiar e a contagem delimitada de quadros candidatos também são explícitos na chave e nos metadados do cache de resultados; portanto, uma alteração de política não pode reutilizar uma descrição obsoleta do vídeo inteiro. Os metadados v4 do cache de resultados mantêm o modo e o fingerprint, nunca a tarefa bruta do usuário. Os metadados de proteção informam tanto os modos de análise solicitado quanto efetivo; um modo `focused` solicitado sem texto utilizável do usuário é informado como efetivamente `full`.

A proteção extrai todas as partes de vídeo compatíveis, mas não descreve mais do que `modalityBridgeVideoMaxVideos`. Para um destino comprovadamente com `supportsVideo === false`, vídeos com falha e acima do limite tornam-se marcadores de texto seguros e explícitos, para que nenhum vídeo bruto permaneça. Quando a capacidade é desconhecida, essas partes preservam seu contêiner de vídeo; qualquer transcrição de fallback segue a conversão delimitada em texto descrita acima. Destinos com `supportsVideo === true` ignoram a ponte. O sinal de cancelamento da solicitação do cliente é propagado pelo download, pela fila do broker, pelos subprocessos e pelas chamadas de legendagem; os cancelamentos interrompem o processamento entre os vídeos e nunca recorrem à mídia bruta em caso de falha.

As configurações de runtime são armazenadas no banco de dados e validadas por Zod:

| Chave                               | Padrão      | Intervalo / comportamento                                                                                   |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opcional, ativado por opção                                                                         |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` preserva legendas genéricas; `focused` usa contexto limitado e não confiável do usuário mais recente |
| `modalityBridgeVideoModel`          | `""`        | Herda o modelo do Vision Bridge                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ou `segment_aware` proporcional; falha do detector recorre a `uniform`             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                              |

Valores legados persistidos de tempo limite de vídeo acima de 120 segundos são limitados ao
prazo do broker; novas gravações de configurações acima desse limite são rejeitadas.
`GET /api/modality-bridge/video/runtime` exige uma localidade de loopback
confiável e carimbada antes da autenticação ou sondagem do runtime e, em seguida, exige
autenticação de gerenciamento. Ele retorna apenas `available`, versões sanitizadas do FFmpeg/ffprobe e um motivo
fixo quando o runtime está indisponível. O endpoint interno de extração não é
uma API pública de upload: a saturação da fila retorna `503` com `Retry-After`, a
desconexão do chamador retorna `499` e o prazo fixo do broker retorna `504`. As respostas convertidas adicionam
`video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central
`x-omniroute-modality-bridge` sem remover segmentos de Visão ou Áudio.

### Mascarador de PII (`piiMasker.ts`)

É executado em **ambos** os estágios.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e
  `prompt` (incluindo itens de string simples) e aplica `processPII()` (de
  `@/shared/utils/inputSanitizer`) aos campos de string `content`/`text`. Quando
  `PII_REDACTION_ENABLED=true`, a PII detectada é ocultada no payload
  de saída. Isso é independente de `INPUT_SANITIZER_MODE` (que controla apenas
  a política de injeção de prompt). Quando a ocultação está desativada, a chamada registra as contagens
  de detecção sem reescrever o conteúdo.
- **`postCall`** realiza uma clonagem profunda da resposta, executa `sanitizePIIResponse()` e
  o mascarador de formato da Responses API (`maskResponsesOutput` — abrange
  `output_text` e `output[].content[].text`). Se ocorrer qualquer ocultação, a
  resposta modificada substituirá a original.

A proteção nunca bloqueia; ela apenas anota (`meta.detections`,
`meta.redacted`) ou reescreve.

#### Seleção por tipo, padrões personalizados e contadores de detecção

**Painel → Configurações → Segurança → Mascaramento de PII** define _o que_ é mascarado. Isso
não ativa o mascaramento: ele ainda depende de `PII_REDACTION_ENABLED` (solicitação) e
`PII_RESPONSE_SANITIZATION` (resposta + SSE), ambos desativados por padrão.

- **Seleção por tipo** — os ids integrados estão listados em
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa todos os
  tipos (o comportamento anterior à existência desta configuração). O padrão
  `ssn_us` do mecanismo de solicitação é mapeado para `ssn`. Os modelos (Mínimo, Padrão, Financeiro,
  Brasileiro, EUA, Completo) apenas preenchem as caixas de seleção na interface.
- **Padrões personalizados** — até 20 padrões regex ou curingas (`*` = até 64
  caracteres que não sejam espaços em branco, `?` = um). As correspondências tornam-se `[CUSTOM_REDACTED]`.
  Cada padrão passa por `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): no máximo 500 caracteres, flags limitadas
  a `g i m s u`, deve ser compilável, deve passar pelo `safe-regex` (backtracking
  catastrófico) e não deve corresponder a uma string vazia ou a um marcador de ocultação.
  Um padrão que falha é recusado ao ser salvo e testado, e uma linha armazenada
  que falha é ignorada durante a execução, em vez de ser compilada. Os padrões personalizados só
  são executados enquanto o mascaramento está ativado.
- **Contadores de detecção** — contagens por tipo (nunca os valores correspondentes), mantidas na
  memória e redefinidas ao reiniciar (`src/lib/pii/piiDetectionStats.ts`). Elas só
  aumentam enquanto o mascaramento está ativado.

As configurações ficam na tabela `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) e são lidas por meio de um cache de 1 s. API:

| Método | Caminho                  | Finalidade                                                                              |
| ------ | ------------------------ | --------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Estado dos sinalizadores, `enabledTypes`, `customPatterns`, contadores de detecção      |
| `PUT`  | `/api/settings/pii`      | Substitui `enabledTypes` (`null` = todos) e/ou `customPatterns`                         |
| `POST` | `/api/settings/pii/test` | Teste sem persistência de um padrão em uma amostra de no máximo 8 KB; nada é armazenado |

Os três exigem autenticação de gerenciamento e validam o corpo com Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Injeção de prompt (`promptInjection.ts`)

Detecta estruturas adversariais no conteúdo fornecido pelo usuário e aplica a
política configurada. O comportamento é determinado por variáveis de ambiente e opções do
construtor:

| Configuração       | Var. de ambiente                                                                                     | Padrão | Efeito                                                                                                                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Habilitado         | `INPUT_SANITIZER_ENABLED`                                                                            | `true` | Quando `false`, o guardrail encerra antecipadamente.                                                                                                                                                           |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn` | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceito para retrocompatibilidade, mas **não** remove texto de injeção; a reescrita de PII da solicitação é controlada por `PII_REDACTION_ENABLED`.) |
| Limite de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Severidade mínima necessária para bloquear. A severidade média é apenas observada por padrão.                                                                                                                  |

**Precedência de modo** (`getMode`): `options.mode` do chamador →
**substituição por feature flag no BD** de `INJECTION_GUARD_MODE` (Painel → Configurações →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Portanto, uma substituição no painel tem precedência sobre as variáveis de ambiente, de modo que a interface
de Feature Flags controla o guardrail em execução em tempo real (sem reinicialização). A leitura do BD é à prova de falhas:
se ocorrer um erro, o guardrail volta ao comportamento baseado nas variáveis de ambiente e, quando nenhuma
substituição estiver definida, o comportamento será idêntico à resolução que usa apenas as variáveis de ambiente.

Fontes de detecção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto compartilhado de detectores
   usado em outros pontos do pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrados (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com severidade `high`).
3. `customPatterns` opcionais passados por meio das opções do construtor (strings, regex
   ou registros `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma detecção atingir o limite de
severidade, `preCall` retornará `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, o guardrail registra o evento, mas
permite a chamada. O helper compartilhado `evaluatePromptInjection()` também é exportado
para chamadores que precisam avaliar prompts sem passar pelo registro.

**Limite de varredura (v3.8.20):** o detector inspeciona apenas os **primeiros 16 KB** do
texto de prompt concatenado — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 bytes) em
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` quanto
`evaluatePromptInjection()` executam `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de percorrer
os padrões. As diretivas de injeção ficam próximas ao início de uma entrada, portanto isso
limita o uso de CPU/GC das regex em payloads com centenas de KB sem enfraquecer a detecção (cf.
#3932, #4041).

### Mascarador de credenciais (`credentialMasker.ts`)

É executado em **ambos** os estágios, por último na cadeia padrão (prioridade `95`). Oculta
padrões conhecidos de chaves de API/tokens secretos no payload de saída (conteúdo de
mensagens, argumentos de chamadas de ferramentas, resultados de ferramentas) **e** na resposta do provedor, para que uma
credencial colada em um prompt (ou retornada por um resultado de ferramenta) não vaze
para o provedor upstream nem de volta para o cliente.

- **Somente mediante ativação**, seguindo a mesma convenção da ocultação de PII (próxima à Regra Rígida nº 20):
  fica desabilitado, a menos que `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Quando está desativado, o guardrail não executa nenhuma ação —
  nunca bloqueia nem reescreve.
- `redactCredentials()` percorre toda a árvore do payload/resposta (`walkValue()`,
  protegido contra poluição de protótipo e ciclos por meio de `WeakSet`) e substitui as correspondências por
  um placeholder `[REDACTED:<type>]`, clonando apenas as ramificações que realmente
  foram alteradas.
- `CREDENTIAL_PATTERNS` abrange chaves de provedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves
  de nuvem (chave de acesso da AWS, Twilio, SendGrid, Mailgun), chaves privadas/JWTs,
  strings de conexão contendo credenciais (`mongodb://user:pass@...` etc.) e
  um padrão genérico de valor de cabeçalho
  `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Chaves com formato de cabeçalho (`authorization`, `x-api-key`, `api-key`,
  `apikey`) são ocultadas estruturalmente (somente o valor, preservando prefixos de esquema como
  `Bearer `/`Basic `), em vez de usar a regex de texto genérica.
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
  block?: boolean; // true interrompe imediatamente a cadeia
  message?: string; // exibida quando há bloqueio
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // retornado por preCall para reescrever a solicitação
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

Um guardrail sinaliza "nenhuma alteração" retornando `void`, `{}` ou
`{ block: false }`. Retornar um `modifiedPayload`/`modifiedResponse` substitui
o valor que percorre a cadeia para os guardrails subsequentes.
`signal?: AbortSignal` leva o ciclo de vida do chamador até os guardrails. O cancelamento de uma solicitação é a exceção deliberada de fail-open: as pontes de mídia interrompem o trabalho e realizam a limpeza sem restaurar a mídia bruta para um destino que sabidamente não oferece suporte a ela.

## Registro (`registry.ts`)

O singleton `guardrailRegistry` expõe:

- `register(guardrail)` — adiciona (ou substitui por nome normalizado) um guardrail e
  reordena por `priority` ascendente.
- `clear()` / `list()` — auxiliares administrativos.
- `runPreCallHooks(payload, context)` — itera sobre os guardrails ativos, passa o
  payload através de `modifiedPayload`, e para no primeiro `block: true`.
- `runPostCallHooks(response, context)` — mesmo fluxo no lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e opcionalmente
  registra novamente os padrões para um isolamento de teste limpo.

Ambos os executores retornam `{ blocked, payload|response, results, guardrail?, message? }`
onde `results` é um array de registros `GuardrailExecutionResult` que incluem
os campos `blocked`, `skipped`, `modified`, `error` e `meta` por guardrail,
úteis para rastreamento.

### Desabilitando Guardrails Por Requisição

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma
lista deduplicada de nomes de guardrails que devem ser ignorados para a
requisição atual. Fontes (todas opcionais, todas mescladas):

- `apiKeyInfo.disabledGuardrails`
- Corpo da requisição `disabledGuardrails` (nível superior)
- Corpo da requisição `metadata.disabledGuardrails`
- Cabeçalho `x-omniroute-disabled-guardrails` (ou legado
  `x-disabled-guardrails`)

Os valores podem ser arrays de strings ou uma string separada por vírgulas; os nomes são
normalizados para kebab-case em minúsculas (`pii_masker` → `pii-masker`). O resultado
é passado através de `context.disabledGuardrails` para o registro, que ignora
os guardrails correspondentes (`skipped: true` em `results`).

## Ordem de Execução

Para cada requisição que passa por `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` constrói a lista de ignorados a partir da chave da API, corpo e cabeçalhos.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` executa os guardrails em ordem crescente de prioridade:
    - Guardrails desabilitados são registrados como `skipped`.
    - O `preCall` de cada guardrail pode reescrever o payload via `modifiedPayload`.
    - O primeiro `block: true` interrompe a cadeia e o handler retorna uma resposta de rejeição do guardrail.
3.  O payload (potencialmente reescrito) flui para o roteamento combinado e despacho upstream.
4.  Após a resposta ser montada, `guardrailRegistry.runPostCallHooks(...)` executa a mesma cadeia na resposta. `block: true` aqui descarta a resposta upstream.

Guardrails que lançam exceções são registrados com `error: <message>` e logados via
`logger.warn`, mas a cadeia continua — fail-open por design.

## Configuração

Variáveis de ambiente lidas pelos guardrails integrados:

| Variável                              | Usado por                 | Efeito                                                                                                                   |
| :------------------------------------ | :------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Defina `false` para desabilitar a detecção completamente.                                                                |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Política de injeção: `warn`, `block`, ou `log`. O valor legado `redact` não reescreve o texto de injeção.                |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modo para o guardrail de injeção; também uma feature flag do DB que **sobrescreve** as variáveis de ambiente (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Severidade mínima que `MODE=block` rejeita: `high` (padrão), `medium`, ou `low`.                                         |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legado para `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Quando `true`, PII da requisição é redigida (independente do modo de injeção).                                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controla o comportamento do mascarador no lado da resposta.                                                              |

Os guardrails do Modality Bridge leem a configuração de tempo de execução do armazenamento de configurações baseado em DB (`getSettings()`), e não das variáveis de ambiente. As chaves primárias do Vision são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceitas apenas como o fallback de leitura de um ciclo documentado; as escritas do dashboard usam as chaves primárias. Os padrões e o resolvedor de fallback residem em `src/shared/constants/modalityBridgeDefaults.ts`, com as constantes legadas mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O Áudio usa `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout`, e `modalityBridgeAudioMaxClips`, além das configurações compartilhadas `modalityBridgeCache*`. O Áudio não possui fallback de chave legada porque essas chaves foram introduzidas com o esquema do Modality Bridge.

O Vídeo usa `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, e
`modalityBridgeVideoTimeout`, além das configurações compartilhadas `modalityBridgeCache*`.
Ele é desabilitado por padrão porque FFmpeg/ffprobe são dependências operacionais opcionais e a legendagem de quadros adiciona latência e custo de modelo.

## Guardrails Personalizados

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

1. Crie `src/lib/guardrails/myGuardrail.ts` estendendo `BaseGuardrail`.
2. Implemente `preCall` e/ou `postCall`.
3. Registre no momento da importação (push de `registerDefaultGuardrails`) ou
   chame `guardrailRegistry.register(...)` em tempo de execução — o registro substitui
   qualquer guardrail anterior com o mesmo nome normalizado.
4. Adicione testes em `tests/unit/` (exemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testando

Use `resetGuardrailsForTests()` entre os testes para começar de um estado conhecido.
Passe `{ registerDefaults: false }` para começar com um registro vazio e
registrar apenas os guardrails em teste. O Vision Bridge aceita injeção de dependência
(`deps.getSettings`, `deps.callVisionModel`); o Audio Bridge expõe as
equivalentes para configurações, capacidades, seleção de modelo STT, verificações de credenciais e transcrição. Os testes podem, portanto, exercitar ambos os fluxos sem acesso a DB ou rede.

## Veja Também

- `src/lib/guardrails/` — implementação
- `src/shared/utils/inputSanitizer.ts` — detector compartilhado que alimenta
  a injeção de prompt e a mascaramento de PII
- `src/shared/constants/visionBridgeDefaults.ts` — Padrões do Vision Bridge e
  lista de modelos de ponte forçada
- `src/shared/constants/modalityBridgeDefaults.ts` — Padrões de tempo de execução compartilhados Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — camada ortogonal (disjuntor, resfriamentos)
- `docs/reference/ENVIRONMENT.md` — referência completa de variáveis de ambiente

## Cobertura de rota de proteção contra injeção e equipe vermelha (Fase 8 · Bloco D)

A proteção contra injeção (`createInjectionGuard` / `withInjectionGuard`) cobre todas as rotas
que aceitam prompts de usuário. Ela respeita `INJECTION_GUARD_MODE` (padrão `warn` = apenas log;
`block` = retorna HTTP 400 `SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo padrão |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn        |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn        |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn        |

A extração de texto (`extractMessageContents`) cobre `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Equipe vermelha (noturno, `nightly-llm-security.yml`):** promptfoo valida que cada rota bloqueia
o corpus OWASP-LLM em `INJECTION_GUARD_MODE=block`; garak executa sondas (ignora sem segredo).
`moderations` está incluído para consistência — operadores em modo de bloqueio podem isentá-lo via
`resolveDisabledGuardrails`.

O fluxo de trabalho noturno (`.github/workflows/nightly-llm-security.yml`, cron + despacho manual)
tem dois trabalhos:

- **`promptfoo-guard` (bloqueio)** — executa `promptfoo eval -c promptfooconfig.yaml`
  com `INJECTION_GUARD_MODE=block`. Cada caso adversarial (por exemplo, "ignore todas
  as instruções anteriores...", jailbreaks estilo DAN) afirma que a resposta contém
  `error.code === "SECURITY_001"`, ou seja, a proteção realmente rejeitou a solicitação.
- **`garak` (consultivo)** — executa garak `--probes promptinject,dan,leakreplay`
  contra uma instância local do OmniRoute (`http://localhost:20128/v1`). Protegido por um
  segredo do provedor (`PROMPTFOO_PROVIDER_KEY`); ignora graciosamente e é sufixado
  `|| true`, para que ele relate sem falhar o CI.

A cobertura do auxiliar de proteção (`createInjectionGuard` / `withInjectionGuard`)
abrange todas as rotas `/v1` que contêm prompts; o texto do prompt é extraído de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` por
`extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
