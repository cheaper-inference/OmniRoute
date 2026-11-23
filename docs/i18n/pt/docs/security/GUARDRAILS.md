# Guardrails (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Fonte fidedigna:** `src/lib/guardrails/`
> **Última atualização:** 2026-08-29 — v3.8.51 (a proveniência da transcrição do Video Bridge é declarada pelo chamador,
> ainda não é verificada pelo servidor — clarificado de acordo com #11661)

As guardrails aplicam transformações de segurança, políticas e conteúdo na fronteira
entre o OmniRoute e os fornecedores a montante. Cada guardrail pode inspecionar (e
opcionalmente rejeitar, transformar ou anotar) os payloads dos pedidos (`preCall`) e
as respostas a montante (`postCall`).

O sistema é **fail-open**: se uma guardrail lançar uma exceção durante a execução, o registo
regista o erro e prossegue para a guardrail seguinte, em vez de fazer o pedido
falhar. O bloqueio é uma decisão explícita (`block: true`), nunca um acidente.

## Mecanismos de Proteção Integrados

O registo carrega automaticamente seis mecanismos de proteção por ordem de prioridade durante a importação
(consulte `registry.ts` → `registerDefaultGuardrails()`):

| Prioridade | Nome                | Fase(s)        | Ficheiro              |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Os números de prioridade mais baixos são executados **primeiro**.

### Ponte de Visão (`visionBridge.ts`) — Ponte de Modalidade PR-1

Interceta pedidos que contêm imagens destinados a **modelos sem capacidades de visão** e
redireciona o pedido completo para um modelo com capacidades de visão ou substitui as partes
de imagem por descrições textuais produzidas por um modelo de visão configurável antes
da chamada a montante. Isto permite que os fornecedores exclusivamente de texto processem
cargas multimodais de forma transparente.

Fluxo:

1. Ignorar se o modelo de destino já suportar visão (a menos que conste na
   lista de ponte forçada `isVisionBridgeForcedModel`).
2. Extrair as partes de imagem através de `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), que delega no **detetor de multimédia
   unificado** `detectMediaParts()` em `open-sse/utils/mediaParts.ts` — a
   fonte de verdade única partilhada com o filtro de compatibilidade combinado.
   A extração está limitada por uma lista de permissões às partes de nível superior com os formatos
   que `replaceImageParts` consegue reinserir (o contrato de extração↔substituição): OpenAI
   `image_url`, `source.type:"base64"` em base64 da Anthropic, URL da Anthropic
   `source.type:"url"` e `input_image` da Responses API. As correspondências
   aninhadas e os formatos apenas indicativos são material para o filtro combinado e nunca são extraídos.
   Ignorar se não for encontrada nenhuma.
3. Resolver a configuração de execução através de `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): as novas chaves de definições
   `modalityBridge*` têm precedência; as chaves `visionBridge*` legadas permanecem como
   **recurso de um ciclo** (janela de reversão). Ignorar antes de qualquer análise de multimédia
   quando a ponte estiver desativada.
4. O seletor de modo (`modalityBridgeVisionMode`, consulte a tabela abaixo) decide entre
   redirecionar e descrever. O redirecionamento devolve `modifiedPayload` apenas com o `model`
   trocado, além dos metadados `{ rerouted, fromModel, toModel, imagesKept }`.
5. Caminho de descrição: limitar as imagens a `maxImages`, compor o pedido adaptado à tarefa,
   consultar a cache de descrições, chamar o modelo de visão **em paralelo**
   (`Promise.allSettled`) e inserir partes de texto `[Image N]: <description>` nos
   respetivos lugares. Uma descrição que falhe produz `null` e a parte de imagem original é
   **preservada** (#4012) — exceto no caminho de descrição combinado quando todas as
   descrições tiverem falhado, caso em que um serviço a montante confirmado como não tendo capacidades de visão recebe um
   marcador `(unavailable — no vision-capable provider connected)` (#8430).
6. Devolver `modifiedPayload` + metadados (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Seletor de modo (`modalityBridgeVisionMode`)

| Modo       | Predefinição | Comportamento                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔            | Heurística legada, sem alterações (#6640/#7204): os modelos não combinados/`auto/` são redirecionados para o melhor modelo de visão, a menos que o modelo original já tenha credenciais utilizáveis (nesse caso, descreve); os destinos combinados descrevem sempre.                                                                                       |
| `describe` |              | Descrever sempre — o bloco de redirecionamento é completamente ignorado; o modelo escolhido pelo utilizador responde sempre.                                                                                                                                                                                                                               |
| `reroute`  |              | Forçar o redirecionamento: a proteção que mantém o modelo com credenciais é ignorada. A proteção de credenciais do **destino** do redirecionamento continua a aplicar-se — quando não existe um destino de visão utilizável, o pedido prossegue para a descrição, para que as imagens em bruto nunca cheguem a um backend exclusivamente de texto (#8430). |

Os modos forçados terminam antecipadamente **antes** da execução da heurística automática; o comportamento de `auto`
é idêntico, ao nível dos bytes, ao mecanismo de proteção anterior ao PR-1.

#### Âmbito da chave de API (`visionBridgeKeyScope.ts`)

Quando a chave de API do autor da chamada restringe `allowedConnections`, conjuntos de quotas
(`allowedQuotas`) ou modelos (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a ponte escolhe apenas
modelos de redirecionamento e descrição que a chave possa utilizar, em ligações que a chave possa
utilizar. A chamada de descrição passa então sempre pelo ciclo interno da OmniRoute com
o cabeçalho `x-omniroute-self-loop-key-id`, para que o pedido de chat recetor
volte a aplicar a política de ligações e modelos dessa chave. `enforceApiKeyPolicy()`
respeita esse cabeçalho apenas em conjunto com o bearer do ciclo interno, pelo que só pode
restringir o acesso, e um ID que não possa ser resolvido é rejeitado.

Se nenhum modelo de visão for permitido para a chave, o caminho de descrição não intervém e
o pedido prossegue sem alterações, com o mesmo comportamento de abertura em caso de falha de um
mecanismo de proteção desativado (metadados `{ skipped: true, reason: "no_permitted_vision_model" }`).
Os pedidos sem chave e as chaves sem estas restrições comportam-se exatamente como
anteriormente.

#### Pedido de descrição adaptado à tarefa (`modalityBridgeVisionTaskAware`)

Predefinição: **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) acrescenta
o texto da **última mensagem do utilizador** (truncado a 500 carateres) ao pedido
base de descrição, orientando a descrição para aquilo que o utilizador realmente
pediu (padrão codex-vision-proxy) e solicitando ao modelo de visão que transcreva
o texto visível. Com a opção desativada — ou sem texto do utilizador — o pedido
base é utilizado sem alterações.

O pedido compatível com OpenAI do próprio ciclo interno de descrição (`callVisionModelSingle()`
em `visionBridgeHelpers.ts`) solicita sempre `image_url.detail: "high"` —
incondicionalmente, para todos os chamadores/fornecedores, sem depender de qualquer
sinal do cliente. A amostragem de baixo detalhe degrada a precisão do OCR precisamente
na tarefa de transcrição de texto solicitada por este pedido, pelo que a própria
chamada de descrição solicita sempre um nível de detalhe elevado, independentemente
do nível de detalhe utilizado no pedido original recebido. Isto afeta apenas o corpo
do pedido interno de descrição; não altera a forma como o OmniRoute reencaminha o
`image_url.detail` do próprio chamador no pedido principal — essa predefinição é
aplicada separadamente, e apenas para clientes OpenCode detetados, em
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). O ramo de
formato de transmissão Anthropic do ciclo interno de descrição não tem qualquer campo
`detail` e não é afetado por nenhuma das predefinições.

#### Limite do resultado da descrição (`modalityBridgeVisionMaxChars`)

| Chave                          | Predefinição | Intervalo        |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` ou 100–50000 |

`0` (predefinição) significa **sem limite** — a descrição devolvida por
`callVisionModel()` é transmitida sem alterações, preservando o comportamento
existente. Qualquer valor no intervalo 100–50000 trunca a descrição, adicionando um
sufixo `…`, antes de esta ser reinserida como `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` em `src/lib/guardrails/visionBridge.ts`).
Aumente este valor para tarefas de OCR com muitos detalhes, nas quais o modelo
subsequente necessita da transcrição completa; reduza-o para limitar a utilização
de tokens por modelos de visão muito verbosos. O campo do painel encontra-se no
painel Avançado do separador Visão
(`modality-bridge-max-chars` em `ModalityBridgeVisionTab.tsx`) e ajusta qualquer
valor entre 1 e 99 para o mínimo de 100, deixando intacto um `0` explícito —
`0` é, por si só, um valor Zod válido
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), e não apenas
a predefinição de «não definido».

#### Cache de descrições (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL em memória para resultados de descrição, partilhada por todo o processo.
Chave = `sha256(imageRef + composedPrompt + configuredBridgeModel)` com
enquadramento por prefixo de comprimento (sem colisões nos limites dos campos). O
componente do modelo é o modelo de ponte **configurado**, e não o modelo que
efetivamente respondeu — `callVisionModel` pode recorrer internamente a um modelo
alternativo, e a criação de chaves por tentativa fragmentaria a cache. As descrições
falhadas nunca são colocadas em cache. Definições:

| Chave                           | Predefinição | Intervalo |
| ------------------------------- | ------------ | --------- |
| `modalityBridgeCacheEnabled`    | `true`       | —         |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000   |

#### Normalização de imagens remotas (descrição do ciclo interno/obtenção em base64)

Quando a ponte obtém autonomamente uma imagem **remota** — na chamada interna de
descrição Anthropic e na conversão para base64 no formato de transmissão Claude
(`ensureBase64ImagesForClaudeWire`), ambas através de
`fetchRemoteImageAsDataUri()` em `visionBridgeHelpers.ts` — o URI de dados
resultante é processado por `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) antes de ser incorporado no pedido ao modelo
de visão. As imagens demasiado grandes são reduzidas para uma **aresta maior de
2048 px** (correspondendo ao limite de redimensionamento que a OpenAI/Anthropic já
aplica no servidor), o que reduz os bytes e a latência do carregamento sem alterar
aquilo que o modelo de visão vê. O redimensionamento utiliza `sharp`, carregado
através de uma importação dinâmica: numa plataforma em que o respetivo binário
nativo não seja carregado, `normalizeDataUri()` **nunca lança uma exceção** —
em alternativa, transmite os bytes originais sem alterações, para que o caminho
de descrição/conversão para base64 continue sempre a funcionar. Os bytes que não
correspondam a uma imagem (uma obtenção que não tenha devolvido uma imagem
descodificável) também são transmitidos sem alterações. Esta normalização limita-se
às imagens que a ponte obtém para a sua própria chamada interna — nunca é aplicada
à carga útil bruta transmitida pelo chamador, em conformidade com o princípio de
alteração apenas por adesão explícita (Regra Rígida n.º 20).

#### Esquema de definições + migração

As novas chaves `modalityBridge*` são validadas pelo Zod em `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, o trio `modalityBridgeCache*` e o
grupo `modalityBridgeAudio*` utilizado pela Ponte de Áudio. A migração
`141_modality_bridge_settings.sql` copia os valores legados existentes de
`visionBridge*` para as novas chaves correspondentes (é idempotente e nunca
substitui um valor `modalityBridge*` definido por um operador); as chaves legadas
continuam a ser aceites como alternativa de leitura durante um ciclo de lançamento.

#### Cabeçalho de transparência + estatísticas

As respostas transformadas por descrição incluem
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(construído por `buildModalityBridgeHeader()` em `modalityBridge/bridgeStats.ts`,
aplicado por `withModalityBridgeHeader()` em `src/sse/handlers/chatHelpers.ts`).
Os pedidos reencaminhados **não** recebem qualquer cabeçalho — a carga útil não foi
alterada e a troca de modelo já está visível no campo `model` do corpo da resposta.

`GET /api/modality-bridge/stats` (autenticação de gestão, no mesmo nível que
`GET /api/settings`) devolve os contadores por modalidade mantidos em memória
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para `vision`, `audio` e
`video`. `averageLatencyMs` utiliza `latencySamples`, e não todas as tentativas,
como denominador; uma operação sem medição de tempo não cria artificialmente
uma amostra de zero milissegundos. `bridged` continua a ser o alias retrocompatível
para conversões bem-sucedidas; as tentativas falhadas não o incrementam.
Por predefinição, os contadores são repostos ao reiniciar o processo
(telemetria, não contabilização).

#### Configuração do painel

A página dedicada do painel é
`/dashboard/settings/modality-bridge`. Os respetivos separadores `Vision`, `Audio`
e `Video`, acessíveis através do URL, preservam os parâmetros de consulta ao
alterar o valor de `tab`.
O separador Vision disponibiliza ativação, modo, seleção de modelo (incluindo a
predefinição automática), instruções sensíveis à tarefa, limites avançados de
tempo de espera/imagem/comprimento da descrição/cache, contadores de execução e
um pedido de exemplo protegido. O separador Audio também está funcional:
disponibiliza ativação, um seletor de modelos exclusivos para STT com Auto,
limites de tempo de espera/duração máxima do clipe, contadores de áudio e um
teste de exemplo `input_audio`. O separador Video está funcional: apresenta o
estado de execução do FFmpeg/ffprobe — um de quatro estados explícitos da IU
(`unknown` enquanto a verificação está em curso ou não pôde ser concluída,
`restricted` num anfitrião do painel que não seja de loopback, onde a verificação
é ignorada no lado do cliente, `unavailable` depois de a verificação confirmar
que está em falta, ou `available` com as versões do FFmpeg/ffprobe) — guarda de
forma persistente os limites de ativação/modelo/fotogramas/vídeo/tempo de espera,
filtra o seletor de modelos para modelos compatíveis com visão e disponibiliza
contadores de vídeo.

O anterior cartão Vision Bridge nas definições de IA é uma ligação de
compatibilidade para a nova página; já não mantém uma segunda cópia do
formulário. Media Providers também associa os fluxos de trabalho Image-to-Text
e Speech-to-Text aos separadores correspondentes de Modality Bridge, sem remover
o ambiente de testes Speech-to-Text existente.

**Desvio da admissão em autorreferência:** quando a chamada de descrição é
encaminhada através da própria autorreferência `/v1` do OmniRoute (modelo de
fornecedor não padrão), o subpedido envia
`x-omniroute-admission-bypass: internal` e é autenticado com a credencial de
autorreferência resolvida — o sentinela local `sk_omniroute` no modo local, ou a
chave de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurada pelo
operador (#1350), para que as implementações com `REQUIRE_API_KEY=true` ainda
possam executar a chamada de descrição. O desvio só é aceite para essas
credenciais exatas, pelo que os clientes externos não podem utilizar o
cabeçalho para ignorar a admissão.

As predefinições legadas encontram-se em
`src/shared/constants/visionBridgeDefaults.ts`; as novas predefinições de
modo/sensibilidade à tarefa/cache e o resolvedor de definições encontram-se em
`src/shared/constants/modalityBridgeDefaults.ts`. O mecanismo de proteção
disponibiliza uma opção de construtor `deps` para que os testes possam injetar
implementações falsas de `getSettings` e `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Interceta pedidos de chat que contenham áudio antes de chegarem a um destino que
não seja reconhecido como compatível com entrada de áudio. Nunca reencaminha o
pedido de chat: as partes de áudio são transcritas através do endpoint multipart
existente compatível com OpenAI e o modelo de chat escolhido continua com
transcrições em texto.

Fluxo:

1. Resolve `supportsAudio` através de `getResolvedModelCapabilities()`. Os
   metadados explícitos do registo de fornecedores têm prioridade, seguidos dos
   metadados estáticos do modelo e, por fim, de `modalities_input` sincronizado.
   Uma lista de entradas declarada sem `audio` equivale a `false`; a ausência de
   indícios sobre a capacidade permanece `null`. Tanto `false` como `null`
   ativam a ponte conservadora, enquanto `true` a ignora.
2. Resolve as definições `modalityBridgeAudio*` e extrai partes de áudio de nível
   superior que possam ser substituídas em todas as mensagens, através do
   detetor partilhado `detectMediaParts()`. Os formatos de transmissão
   suportados são `input_audio` e `audio_url` da OpenAI, bem como
   `source.media_type: "audio/*"`. O áudio aninhado é detetado para fins de
   encaminhamento, mas não é removido pelo caminho de substituição. O trabalho
   é limitado por `modalityBridgeAudioMaxClips`; as partes posteriores
   permanecem intactas.
3. Respeita um `provider/model` configurado ou permite que
   `selectAudioBridgeModel()` percorra `AUDIO_TRANSCRIPTION_PROVIDERS` pela ordem
   estável do catálogo e selecione o primeiro modelo com uma credencial de
   fornecedor ativa e utilizável.
4. `callAudioTranscription()` converte áudio base64/data-URI num `file`
   multipart, ou transfere um `audio_url` remoto através da proteção de saída
   exclusiva para destinos públicos, com fixação de DNS e um limite de 25 MB.
   Em seguida, envia por POST o ficheiro e o modelo selecionado para a
   autorreferência local `/v1/audio/transcriptions`, autenticada com
   `resolveSelfLoopBearer()`. A rota de transcrição existente realiza a procura
   normal de credenciais, o processamento de períodos de espera/limites de taxa
   e o envio para o fornecedor.
5. As chamadas bem-sucedidas substituem as respetivas partes por
   `[Audio N]: <transcript>`. As chamadas são executadas com
   `Promise.allSettled`: uma falha individual preserva a parte de áudio original
   (contrato #4012). Se todas as chamadas falharem e estiver comprovado que o
   destino tem `supportsAudio === false`, as partes tornam-se
   `[Audio N]: (unavailable — no STT provider connected)` (contrato #8430). Para
   um destino desconhecido (`null`), um resultado em que todas as chamadas
   falham permanece intacto. Um destino comprovadamente exclusivo para texto
   sem uma credencial STT utilizável recebe o mesmo marcador explícito sem
   efetuar uma chamada de rede.

As transcrições bem-sucedidas utilizam a cache LRU/TTL de Modality Bridge para
todo o processo. A chave combina a referência de áudio, o rótulo de operação
estável `audio-transcription` e o modelo STT selecionado; as falhas nunca são
armazenadas em cache. As tentativas de áudio atualizam os contadores partilhados
`bridged`, `cacheHits`, `failures` e `lastUsedAt`.
As respostas transformadas incluem
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; os pedidos
inalterados não recebem um segmento Audio Bridge.

As definições de execução são armazenadas na base de dados e validadas pelo Zod:

| Chave                         | Predefinição | Intervalo               |
| ----------------------------- | ------------ | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                       |
| `modalityBridgeAudioModel`    | `""`         | Automático ou ID de STT |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10                    |

A cache partilhada continua a ser controlada por `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` e `modalityBridgeCacheMaxEntries`.

### Ponte de vídeo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceta partes de vídeo de nível superior em `messages` das Chat Completions e
em `input` da Responses API antes de ser chamado um destino sem suporte nativo
de vídeo conhecido. Os formatos suportados são `input_video`, `video_url`,
`video_source`, URLs HTTPS e URIs de dados `data:video/*;base64,...`. Nomes de
ficheiros simples em texto não são tratados como vídeo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) é responsável pela travessia
do pedido, pela verificação de capacidades/políticas, pela agregação por pedido
e pelo payload da resposta. O trabalho por vídeo — obtenção, cache do resultado
completo, descrição de uma sequência de fotogramas (que integra qualquer
transcrição de áudio declarada pelo autor da chamada) e
métricas/abortamento/limpeza por tentativa — está oculto por trás de
`processVideoPart` em `videoBridgePipeline.ts`, chamado uma vez por cada parte
de vídeo dentro do ciclo de `preCall`. Esse módulo também define os limites
explícitos das portas `VideoMediaBrokerPort` (obtenção de bytes e extração de
fotogramas amostrados), `VideoAudioTranscriptionPort` (integração de uma
transcrição de áudio declarada pelo autor da chamada com as legendas amostradas)
e `VideoDrilldownPort` (o limite de persistência da análise detalhada dos
fotogramas; ainda não integrado em `processVideoPart` — atualmente, apenas a
rota separada `/api/modality-bridge/video/drilldown` escreve entradas de análise
detalhada).

O caminho público de pedidos `/v1` nunca importa nem invoca um subprocesso. Os
vídeos remotos são transferidos com um limite de 50 MiB; os vídeos base64
incorporados têm um limite conservador de 36 MiB descodificados por vídeo, para
que o envelope do modelo/mensagens/enquadramento permaneça dentro do limite
público de admissão de pedidos JSON de 50 MiB. O comprimento incorporado e as
estimativas do tamanho descodificado são verificados antes da alocação. É
obrigatório utilizar HTTPS no URL remoto inicial e em todos os
redirecionamentos, recorrendo à proteção de saída existente, exclusiva para
destinos públicos, com fixação de DNS. Em seguida, os bytes atravessam o limite
exato do broker interno `POST /api/modality-bridge/video/extract`. Essa rota é
simultaneamente `LOCAL_ONLY` e `SPAWN_CAPABLE`, aceita apenas um pedido
autenticado por processo proveniente de uma interface de loopback fidedigna e
nunca aceita um URL, um caminho do sistema de ficheiros, um executável ou uma
lista de argumentos. O pipeline de tamanho do corpo da API e o leitor
incremental do corpo do handler impõem, de forma independente, um limite de
entrada de 50 MiB no broker. A respetiva fila limitada executa uma extração de
cada vez, permite quatro tarefas pendentes e limita os dados de entrada
pendentes a 100 MiB.

Dentro do broker, `ffprobe` lê um ficheiro local privado; a lista de formatos
permitidos fixa exclui formatos de listas de reprodução e manifestos. Para os
contentores permitidos da família MOV, as referências externas de dados MOV
permanecem desativadas por predefinição e o comando fixo não ativa a respetiva
utilização. Tanto `ffprobe` como `ffmpeg` utilizam a lista de protocolos
permitidos apenas com `file`, uma thread, matrizes de argumentos fixas, sem
shell e executáveis resolvidos a partir de `PATH`. Os fluxos de imagens de capa
anexadas não são candidatos reproduzíveis. Todos os fluxos reproduzíveis têm de
cumprir os limites e é preferido um fluxo predefinido explícito antes de se
recorrer, de forma determinística, ao índice mais baixo. Os vídeos estão
limitados a 600 segundos, 8 192 píxeis por dimensão e 33 554 432 píxeis de
origem. O FFmpeg recolhe 1–16 fotogramas JPEG em pontos médios, reduz a maior
dimensão para, no máximo, 1 024 píxeis sem ampliar conteúdos de entrada mais
pequenos e nunca recebe um URL. Por predefinição, a amostragem é `uniform`. As
políticas opcionais `scene_aware` e a política experimental `segment_aware`
efetuam uma passagem fixa adicional do FFmpeg sobre o fluxo local já validado,
selecionam marcas temporais de cena `showinfo` limitadas e, em caso de falha do
detetor, timeout, resultado malformado ou conjunto de candidatos vazio, recorrem
de forma determinística aos mesmos pontos médios uniformes. O modo sensível a
segmentos atribui amostras de pontos médios proporcionalmente aos intervalos de
cena validados; as evidências sensíveis a segmentos e o comportamento de
fallback são detalhados abaixo. O limite rígido de 16 fotogramas é aplicado
após a seleção em todas as políticas. Quando um pedido sensível a cenas tem um
orçamento de apenas um fotograma, utiliza o ponto médio uniforme do vídeo
completo ativo ou da janela de foco e indica `policyEffective: uniform`: um
único fotograma de cena selecionado não consegue preservar ambas as
extremidades temporais. O autor da chamada pode, opcionalmente, fornecer uma
janela de foco finita (`start`/`end` em segundos); os limites são restringidos à
duração do conteúdo multimédia, as janelas invertidas ou não finitas são
rejeitadas e todas as políticas de amostragem são aplicadas apenas dentro do
intervalo normalizado. A janela resultante é incluída nos metadados de
amostragem e no prefixo da descrição não fidedigna, para que os modelos a
jusante consigam distinguir um excerto em foco da linha temporal completa.

O foco semântico das legendas é uma definição separada e explícita. O modo de
análise `full` predefinido preserva o prompt de fotogramas existente e nunca
reencaminha o texto do pedido para o modelo de legendagem. No modo `focused`, a
ponte lê apenas o `text`/`input_text` mais recente, não vazio e criado pelo
utilizador a partir do mesmo contentor de Chat ou Responses, normaliza-o para
NFC, reduz os caracteres de controlo e os espaços em branco e limita-o a 500
pontos de código Unicode. Um resultado vazio faz fallback para o prompt `full`
exato. Uma sugestão utilizável é serializada como JSON num bloco dedicado de
contexto de utilizador não fidedigno e apenas pode dar prioridade a detalhes
observáveis; não pode sobrepor-se ao aviso separado contra o seguimento de
instruções visíveis ou audíveis no conteúdo multimédia. O foco textual nunca
infere `start`/`end` nem altera o amostrador temporal.

#### Evidência estrutural de segmentos FU-07

`segment_aware` utiliza uma única passagem limitada de pré-análise sobre o fluxo
de vídeo local já validado. A cadeia fixa de filtros começa por redimensionar
para uma largura máxima de 320 píxeis, deteta mudanças de cena e intervalos
congelados e, em seguida, recolhe amostras à taxa de 1 fotograma por segundo
para avaliar a desfocagem, a luminância média e a informação espacial/temporal.
A passagem está limitada a 600 amostras estruturais, uma thread de
FFmpeg/filtro, às mesmas listas de permissões do protocolo exclusivo `file` e
de contentores, a um limite de 1 MiB para a saída do processo e a, no máximo,
30 segundos dentro do cancelamento/prazo partilhado do broker. Nunca aceita
um comando, filtro, caminho ou URL proveniente do pedido.

Os valores estruturais são provas de amostragem determinísticas, não uma
compreensão semântica do vídeo. Não inferem sujeitos, ações, legendas, fala ou
a intenção do utilizador. Os limites de cenas e congelamentos formam segmentos;
a cobertura de congelamento, a desfocagem, a exposição, o detalhe espacial e a
mudança temporal apenas influenciam a forma como o orçamento existente de 1–16
fotogramas é atribuído. Um segmento totalmente congelado está limitado a um
fotograma, enquanto os segmentos não congelados competem pelo orçamento
restante. Quando o número de limites excede o número de fotogramas, mantém-se
uma cobertura uniforme da linha temporal, para que cortes rápidos no início não
possam ocultar um segmento final longo. Os limites de cenas que se encontrem
dentro da resolução de análise de 1 segundo de um limite de congelamento são
agregados.

Filtros em falta, provas malformadas/vazias, um erro do detetor ou o tempo limite
da pré-análise limitada recorrem de forma permissiva à política exata de pontos
médios uniformes. Um cancelamento pelo chamador ou o prazo do broker não recorre
a essa alternativa permissiva: termina o subprocesso em curso, impede a extração
posterior de fotogramas e a árvore temporária privada é removida em `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` gera amostras determinísticas reais de
FFmpeg para avaliar a redução de chamadas de legendagem após a desduplicação, a
atribuição de orçamento em cenários de movimento intenso, as provas de
desfocagem/exposição/SI-TI, cortes rápidos com uma secção final longa e falsos
positivos em desvanecimentos graduais. Regista o tempo decorrido da pré-análise
e, quando `/usr/bin/time` está disponível, a utilização de CPU do processo
filho e o pico de RSS. As respetivas verificações de qualidade são apenas
oráculos estruturais. A qualidade do modelo de legendagem real permanece
`HOLD`, porque este mecanismo de teste não dispõe de um endpoint autorizado nem
de um avaliador fixo. As poupanças monetárias também permanecem `HOLD`, exceto
se `--caption-cost-per-call-usd` fornecer uma estimativa positiva explícita do
custo por chamada; o script nunca inventa nenhum desses resultados.

Cada fotograma está limitado a 4 MiB, o conjunto de todos os fotogramas em bruto
a 23 MiB e a resposta serializada do broker a 32 MiB. Um diretório temporário
privado é removido em `finally`. O OmniRoute não inclui o FFmpeg e não aceita
um caminho personalizado para o executável. Antes da legendagem, o bridge aplica
uma passagem conservadora de desduplicação visual: cada JPEG é reduzido a um
buffer de 16×16 em escala de cinzentos e comparado apenas com o último fotograma
retido. Para um orçamento de legendagem solicitado superior a um fotograma, a
extração fornece um conjunto limitado de candidatos até ao dobro desse
orçamento, nunca excedendo 16 fotogramas. O limite solicitado só é aplicado
após a desduplicação, preservando-se o primeiro e o último candidatos
selecionados durante a redução final quando o orçamento é de, pelo menos, dois.
A política com controlo de versão
`grayscale-16x16-mean-cells-v2` utiliza o maior valor entre a diferença de
luminância média e a proporção de células da miniatura cuja diferença
normalizada é, pelo menos, 0,05. O limiar de duplicação é a constante 0,04,
escolhida pela sua previsibilidade em vez de ser disponibilizada como uma
definição em tempo de execução. Este sinal secundário de alto contraste preserva
pequenos movimentos e alterações de texto visível que uma comparação baseada
apenas na média pode ocultar. Os erros do comparador ou do descodificador
recorrem de forma permissiva e mantêm a cobertura. Os metadados de saída
distinguem os candidatos extraídos, os fotogramas utilizados com êxito e os
duplicados visuais eliminados.

Uma parte de vídeo explicitamente assinalada pode solicitar uma folha de
contactos com marcas temporais. O bridge cria uma grelha JPEG com, no máximo,
4 colunas e 16 fotogramas. Cada célula de 512 píxeis grava a marca temporal da
respetiva origem numa faixa inferior de alto contraste, enquanto as mesmas
marcas temporais permanecem nos metadados textuais para associação e auditoria
a jusante. O JPEG completo permanece limitado a 32 MiB. Se `sharp` não conseguir
descodificar ou compor a grelha, o bridge recorre aos fotogramas JPEG
individuais; um cancelamento pelo cliente continua a propagar-se através da
operação da folha.

As provas para promoção são deliberadamente separadas do microbenchmark de
composição sintética. `scripts/perf/video-bridge-contact-sheet-eval.ts` define
um mecanismo de teste A/B com controlo de versão do esquema para modelos de
visão reais compatíveis com OpenAI. Mede os tokens comunicados pelo fornecedor,
a latência total de extremo a extremo (incluindo a composição da folha), o
número de chamadas ao modelo e a retenção de factos definida pelo manifesto.
As respostas em bruto do modelo não são guardadas no relatório; apenas são
retidos os resumos SHA-256 e os IDs dos factos correspondentes. O mecanismo de
teste não efetua nenhuma chamada de rede ou a um modelo pago, a menos que
`--execute-real` seja indicado e que `--model`, `OMNIROUTE_BASE_URL` e
`OMNIROUTE_API_KEY` estejam configurados. Sem essa execução real explícita, o
seu veredito legível por máquina permanece `HOLD`; as medições sintéticas de
payload/número de chamadas, por si só, não constituem provas para promoção.

Os chamadores podem anexar um array opcional `transcript.cues` a uma parte de
vídeo suportada quando já dispõem de texto alinhado. Cada cue tem de incluir
`text`, um intervalo finito `start`/`end` dentro da duração detetada e um
`source` incluído na lista de permissões (`client`, `embedded` ou
`audio-bridge`); `confidence` assume `1` por predefinição e tem de permanecer
entre `0` e `1`. Os cues exatamente duplicados são agregados. O OmniRoute nunca
inicia uma transcrição a partir destes metadados: os cues validados são copiados
para o resultado descrito com a origem, a confiança e o intervalo, e são
apresentados como observações não fidedignas juntamente com as legendas dos
fotogramas. Texto inválido, fora do intervalo ou sem proveniência é rejeitado,
em vez de ser misturado com o fluxo de legendas. Ambos os canais de transcrição
do corpo do pedido normalizam a proveniência fornecida para `client`, incluindo
rótulos `embedded` ou `audio-bridge` declarados pelo próprio cliente. Apenas um
adaptador controlado pelo servidor pode atribuir esses rótulos fidedignos
através do argumento exclusivo de código `trustedSource`; um campo JSON do
pedido não pode alcançar esse argumento. O texto da transcrição continua a ser
conteúdo não fidedigno derivado dos elementos multimédia, independentemente da
sua proveniência, e nunca deve determinar a autorização.

Um chamador avançado pode fornecer uma faixa `audioTranscript` para o mesmo vídeo;
esta é tratada como texto fornecido pelo cliente, não como prova de transcrição pelo servidor.
O ponto de fusão executa as observações visuais e de áudio com
um único prazo e sinal de cancelamento, ordena-as numa linha temporal comum, agrega
duplicados exatos e comunica um resultado parcial quando apenas um dos lados é bem-sucedido.
Um `audioTranscript` inválido degrada-se para esse resultado parcial — a descrição
visual é mantida e o ramo de áudio regista um código de falha sanitizado —
em vez de causar a falha de todo o vídeo. A disponibilidade por ramo, o indicador de resultado parcial
e os códigos de falha sanitizados são preservados no resultado descrito, nos
metadados dos mecanismos de proteção (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), nos metadados da cache de resultados e nos contadores
de fusão da ponte. O caminho predefinido do Video Bridge não invoca conversão de voz em texto
nem transfere uma segunda cópia do conteúdo multimédia; sem essa faixa explícita, permanece
apenas de vídeo.

**Retenção de transcrições (#12150 P1).** Isto aplica-se automaticamente sempre que a
Video Bridge (ela própria opcional) renderiza uma indicação de transcrição — não existe um
indicador de retenção separado. Quando um pedido renderiza qualquer indicação de transcrição (um
`transcript` declarado pelo chamador ou um `audioTranscript` fundido), o mecanismo de proteção marca-o como
`videoBridgeObserved` e produz uma cópia expurgada da descrição do vídeo —
uma renderização idêntica na qual o corpo de texto livre de cada indicação é substituído por
`[redacted-video-transcript]`, criada através da substituição do campo estruturado da indicação
antes de a cadeia ser montada (nunca através da análise do texto achatado, para que nenhum
conteúdo da indicação — adversarial ou normal, incluindo corpos que contenham `]`, como
`[inaudible]`/`[music]` — possa subsistir). O corpo do pedido persistido no registo de chamadas substitui
cada parte de texto derivada do vídeo por essa cópia expurgada, com correspondência por igualdade
de conteúdo; a âncora `fullText` é lida novamente a partir do payload concluído do mecanismo de proteção
anterior à chamada, pelo que a correspondência continua a ser bem-sucedida depois de mecanismos de proteção
posteriores na cadeia (os mascaradores de PII e credenciais, prioridades 10/95) reescreverem localmente o texto
da descrição e depois de a injeção de instruções de sistema, transferência de contexto e memória reformular
a matriz de mensagens. O corpo enviado a montante para o modelo permanece inalterado. Um pedido observado
também não preenche qualquer Memory duradoura (a extração derivada tanto do pedido como da resposta é ignorada),
pelo que a própria resposta do modelo não pode reproduzir texto da transcrição na Memory.

**Campos de vídeo em bruto (#12430).** Quando a ponte está ativada e o suporte nativo de vídeo é desconhecido ou inexistente, os campos `transcript`/`audioTranscript` definidos também ativam `videoBridgeObserved`, mesmo após uma falha de descrição ou um limite `maxVideos`. `null` e cadeias vazias contam; campos ausentes e metadados que não sejam de vídeo não contam. As cópias retidas expurgam estes campos ou omitem o pedido, e as caches/Memory são ignoradas.

Nesses caminhos de contingência, as indicações válidas do chamador tornam-se partes `text`/`input_text`
suportadas, em vez de campos não normalizados do fornecedor. Ambas as faixas fornecidas no pedido
continuam a ser observações `client` não fidedignas, com um aviso explícito de que o vídeo
não foi descrito e os carimbos de data/hora não foram verificados em relação ao conteúdo multimédia. Os limites
existentes de 256 indicações/64 KiB no total e por indicação aplicam-se às duas faixas em conjunto;
os carimbos de data/hora têm de respeitar o limite máximo de 600 segundos do intermediário e qualquer janela
de foco fornecida. As faixas inválidas são descartadas, não sendo reencaminhadas como texto arbitrário; uma
faixa associada válida ainda pode ser utilizada, a menos que o respetivo limite combinado seja excedido. Os campos
nulos/vazios não acrescentam texto. Este mecanismo de contingência não adiciona qualquer obtenção ou transcrição
de conteúdo multimédia. Os campos de extensão da transcrição são removidos do contentor de vídeo de contingência
e dos respetivos objetos `video_url`/`source`. A lista de permissões do protocolo OpenAI permanece estrita; os
contentores de vídeo com suporte nativo desconhecido continuam disponíveis e os destinos conhecidos que apenas
suportam texto mantêm marcadores seguros. As cópias expurgadas estruturadas protegem o texto de transcrição
anexado, enquanto o pedido original pertencente ao chamador permanece inalterado. Os destinos com suporte nativo
e as pontes desativadas mantêm o comportamento de omissão existente.

As cópias retidas adicionais utilizam o mesmo sinal de pedido observado. O instantâneo em bruto
do pedido do cliente anterior ao mecanismo de proteção, o pedido pendente em memória e o registo de pedidos
rejeitados antecipadamente substituem estruturalmente os campos de transcrição nas partes de vídeo;
as instruções em formato de cadeia sintetizadas pelas fases do pipeline e pela transferência de contexto
são expurgadas no destino do corpo de pedido persistido. O marcador persistido `video_content_removed`
faz com que a continuação através de `previous_response_id` falhe de forma segura, em vez de reconstruir
texto que foi intencionalmente descartado. Se um pedido observado perder a respetiva cópia expurgada
por parte antes do registo, ou se até uma única cópia de vídeo entre várias não corresponder após mutações
posteriores do pedido, o corpo do pedido retido é totalmente omitido, em vez de se reter uma transcrição
apenas parcialmente expurgada.

Para um pedido observado, uma resposta do modelo pode citar qualquer parte da
transcrição sem um limite estruturado de indicação. Por conseguinte, o respetivo
`responseBody` persistido no registo de chamadas é substituído por um marcador de omissão; o artefacto
detalhado do pipeline (que pode incluir corpos do fornecedor/cliente e fragmentos de transmissão)
não é retido. As caches semântica, de idempotência e de repetição de raciocínio ignoram
leituras e escritas para esse pedido. O pedido ao fornecedor e a resposta visível pelo
cliente permanecem inalterados. Os bytes iniciais de keepalive são removidos do buffer temporário
quando o artefacto detalhado é omitido. O aviso de EventStream malformado do Kiro
comunica apenas a contagem de bytes do payload, nunca o respetivo conteúdo nem o erro em bruto
do analisador JSON.
Isto não alega que todos os diagnósticos não relacionados de fornecedores/plugins tenham sido
auditados; a análise mais abrangente dos destinos de retenção é acompanhada em #11658.

O ciclo de vida interno de `/api/modality-bridge/video/drilldown` é um substrato de
cache separado, autenticado por loopback/token. Cada operação também requer um
ID principal opaco canónico. Antes de um chamador de produção ser ativado, este tem de
derivar esse ID a partir do tenant autenticado e nunca pode reencaminhar um valor
selecionado pelo cliente. As chaves de cache associam esse principal a IDs canónicos de
sessão e de referência de vídeo, armazenam apenas as respetivas chaves derivadas por
SHA-256 e restringem tanto as leituras como a eliminação ao mesmo principal. A cache
armazena, no máximo, 16 fotogramas JPEG derivados por entrada, expira-os após dez
minutos e suporta leituras limitadas por `start`/`end` ou a eliminação explícita da sessão.

Cada principal está limitado a 16 entradas e 64 MiB de dados JPEG canónicos. Estes
limites são independentes do limite global de 64 entradas/256 MiB: a pressão sobre a
quota de um principal remove apenas as entradas menos recentemente utilizadas desse
principal antes de ser considerada a remoção LRU global. As entradas expiradas são
removidas da contabilização tanto do principal como global durante a atividade da
cache, enquanto o cancelamento e as falhas de validação não confirmam uma substituição
parcial.

A cache rejeita Base64 não canónico, preenchimento excessivo, conteúdo multimédia que
não seja JPEG, JPEGs malformados ou truncados e JPEGs que produzam um aviso durante uma
descodificação integral limitada da imagem com `sharp`. Cada imagem aceite é
recodificada como JPEG canónico, sendo a largura e a altura derivadas dos bytes
descodificados em vez de se confiar nos campos fornecidos pelo chamador, e quaisquer
bytes poliglotas no final são descartados em vez de serem retidos. Apenas o buffer
comprimido canónico limitado é contabilizado em ambas as quotas. O limite da transmissão
JSON inclui a sobrecarga de Base64 para o limite máximo de 32 MiB da entrada
descodificada. Cada
derivação armazenada regista o formato/resolução JPEG validados, a política de
amostragem, a versão de derivação, a data/hora de criação, o hash de conteúdo calculado
pelo servidor e a referência ascendente com hash, juntamente com o hash do conteúdo
ascendente do chamador fidedigno. O cancelamento é verificado entre as fases assíncronas
de descodificação/hash, antes da confirmação atómica na cache.

Esta tranche ainda não liga um produtor de produção à rota nem disponibiliza a seleção
de variantes com múltiplas resoluções. Por conseguinte, o caminho transparente dos
pedidos do Video Bridge não incorre em trabalho adicional, enquanto a derivação do
principal associada ao tenant e o ciclo de vida completo de múltiplas resoluções FU-08
continuam a ser trabalho de acompanhamento explícito, em vez de serem documentados como
comportamento concluído.

Os fotogramas recebem legendas sequencialmente com o modelo de Video configurado. Uma
substituição de Video vazia herda a definição de Vision; se ambas estiverem vazias, o
router automático de Vision seleciona o modelo efetivo com capacidade de visão. As
legendas bem-sucedidas substituem a parte original por um prefixo estável
`[Video description:`, que também identifica o texto como uma observação não fidedigna
derivada de conteúdo multimédia e instrui os modelos subsequentes a não seguirem
instruções encontradas nesse conteúdo. As chaves da cache de legendas dos fotogramas
incluem os bytes JPEG, o prompt, o carimbo de data/hora e o modelo efetivo; apenas as
legendas bem-sucedidas são colocadas em cache. As entradas da cache retêm o modelo
produtor efetivamente bem-sucedido, incluindo um modelo alternativo; o bridge indica
`mixed` quando diferentes fotogramas foram produzidos por modelos diferentes. Um acerto
na cache reutiliza essa identidade do produtor, em vez de a reidentificar como o plano
de encaminhamento pedido. A cache de resultados do vídeo completo usa como chave todas
as entradas que alteram o resultado — prompt, modelo efetivo, política de amostragem,
número de fotogramas, modo de análise semântica, impressão digital SHA-256 da sugestão
de foco normalizada, janela de foco, `transcript`, `audioTranscript` e o indicador de
folha de contactos — pelo que a alteração de qualquer uma dessas dimensões resulta
numa falha de cache, nunca na reutilização de dados obsoletos. A versão, o limiar e o
número limitado de fotogramas candidatos da política de desduplicação visual também são
explícitos na chave e nos metadados da cache de resultados; por conseguinte, uma
alteração da política não pode reutilizar uma descrição obsoleta do vídeo completo. Os
metadados v4 da cache de resultados mantêm o modo e a impressão digital, nunca a tarefa
em bruto do utilizador. Os metadados da medida de proteção indicam os modos de análise
pedido e efetivo; um modo `focused` pedido sem texto utilizável do utilizador é indicado
como sendo efetivamente `full`.

A medida de proteção extrai todas as partes de vídeo suportadas, mas não descreve mais
do que `modalityBridgeVideoMaxVideos`. Para um destino comprovadamente com
`supportsVideo === false`, os vídeos com falhas e acima do limite tornam-se marcadores
de texto seguro explícitos, para que nenhum vídeo em bruto subsista. Quando a capacidade
é desconhecida, essas partes mantêm o respetivo suporte de vídeo; qualquer transcrição
alternativa segue a conversão limitada para texto acima descrita. Os destinos com
`supportsVideo === true` ignoram o bridge. O sinal de interrupção do pedido do cliente
propaga-se através da transferência, da fila do broker, dos subprocessos e das chamadas
de legendagem; as interrupções param entre vídeos e nunca permitem, em caso de falha,
a passagem de conteúdo multimédia em bruto.

As definições de runtime são suportadas pela BD e validadas por Zod:

| Chave                               | Predefinição | Intervalo / comportamento                                                                                          |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`      | Runtime opcional, ativado explicitamente                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` preserva legendas genéricas; `focused` utiliza contexto limitado e não fidedigno do utilizador mais recente |
| `modalityBridgeVideoModel`          | `""`         | Herda o modelo do Vision Bridge                                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` ou `segment_aware` proporcional; uma falha do detetor reverte para `uniform`              |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                     |

Os valores de tempo limite de Vídeo legados e persistidos superiores a 120 segundos são limitados ao
prazo do broker; novas gravações de definições acima desse limite são rejeitadas.
`GET /api/modality-bridge/video/runtime` exige uma localidade loopback fidedigna
e devidamente assinalada antes da autenticação ou da sondagem do runtime, exigindo depois autenticação
de gestão. Devolve apenas `available`, versões higienizadas do FFmpeg/ffprobe e um motivo fixo
quando o runtime está indisponível. O endpoint interno de extração não é
uma API pública de carregamento: a saturação da fila devolve `503` juntamente com `Retry-After`, uma
desligação do chamador devolve `499` e o prazo fixo do broker devolve `504`. As respostas convertidas adicionam
`video->text;model=<visionModel>;parts=<videos>` ao cabeçalho central
`x-omniroute-modality-bridge` sem remover os segmentos de Visão ou Áudio.

### Mascarador de PII (`piiMasker.ts`)

É executado em **ambas** as fases.

- **`preCall`** clona o payload, percorre `system`, `messages`, `input` e
  `prompt` (incluindo itens que são cadeias de texto simples) e aplica `processPII()` (de
  `@/shared/utils/inputSanitizer`) aos campos de cadeia de texto `content`/`text`. Quando
  `PII_REDACTION_ENABLED=true`, a PII detetada é expurgada no payload
  de saída. Isto é independente de `INPUT_SANITIZER_MODE` (que controla apenas
  a política de injeção de prompts). Quando o expurgo está desativado, a chamada regista as contagens
  de deteção sem reescrever o conteúdo.
- **`postCall`** cria um clone profundo da resposta, executa `sanitizePIIResponse()` juntamente com
  o mascarador de formato da Responses API (`maskResponsesOutput` — abrange
  `output_text` e `output[].content[].text`). Se ocorrer algum expurgo, a
  resposta modificada substitui a original.

A salvaguarda nunca bloqueia; apenas anota (`meta.detections`,
`meta.redacted`) ou reescreve.

#### Seleção por tipo, padrões personalizados e contadores de deteção

**Painel → Definições → Segurança → Mascaramento de PII** permite escolher _o que_ é mascarado. Não
ativa o mascaramento: isso continua a ser controlado por `PII_REDACTION_ENABLED` (pedido) e
`PII_RESPONSE_SANITIZATION` (resposta + SSE), ambos desativados por predefinição.

- **Seleção por tipo** — os ids incorporados estão listados em
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Não definido significa todos os
  tipos (o comportamento anterior à existência desta definição). O padrão `ssn_us`
  do motor de pedidos corresponde a `ssn`. Os modelos (Mínimo, Padrão, Financeiro,
  Brasileiro, EUA, Completo) apenas preenchem as caixas de verificação na IU.
- **Padrões personalizados** — até 20 padrões de expressão regular ou de carateres universais (`*` = até 64
  carateres que não sejam espaços em branco, `?` = um). As correspondências tornam-se `[CUSTOM_REDACTED]`.
  Cada padrão passa por `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): no máximo 500 carateres, sinalizadores limitados
  a `g i m s u`, tem de ser compilável, tem de passar no `safe-regex` (retrocesso
  catastrófico) e não pode corresponder a uma cadeia vazia nem a um marcador de expurgo.
  Um padrão que falhe é recusado ao ser guardado e testado, e uma linha armazenada
  que falhe é ignorada durante a execução, em vez de ser compilada. Os padrões personalizados só
  são executados enquanto o mascaramento estiver ativado.
- **Contadores de deteção** — contagens por tipo (nunca os valores correspondentes), mantidas em
  memória e repostas ao reiniciar (`src/lib/pii/piiDetectionStats.ts`). Só
  aumentam enquanto o mascaramento estiver ativado.

As definições residem na tabela `key_value` (espaço de nomes `pii_settings`,
`src/lib/db/piiSettings.ts`) e são lidas através de uma cache de 1 s. API:

| Método | Caminho                  | Finalidade                                                                                 |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Estado dos sinalizadores, `enabledTypes`, `customPatterns`, contadores de deteção          |
| `PUT`  | `/api/settings/pii`      | Substituir `enabledTypes` (`null` = todos) e/ou `customPatterns`                           |
| `POST` | `/api/settings/pii/test` | Testar um padrão sem o guardar, usando uma amostra com, no máximo, 8 KB; nada é armazenado |

Os três exigem autenticação de gestão e validam o corpo com o Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Injeção de prompts (`promptInjection.ts`)

Deteta estruturas adversariais em conteúdo fornecido pelo utilizador e aplica a
política configurada. O comportamento é determinado por variáveis de ambiente e opções do
construtor:

| Definição          | Variável de ambiente                                                                                 | Predefinição | Efeito                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ativado            | `INPUT_SANITIZER_ENABLED`                                                                            | `true`       | Quando é `false`, a barreira de proteção termina antecipadamente.                                                                                                                                         |
| Modo               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`       | Política de injeção: `block`, `warn` ou `log`. (`redact` é aceite para retrocompatibilidade, mas **não** remove texto de injeção; a reescrita de PII do pedido é controlada por `PII_REDACTION_ENABLED`.) |
| Limiar de bloqueio | opção `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Severidade mínima necessária para bloquear. Com a predefinição, a severidade média é apenas observada.                                                                                                    |

**Precedência do modo** (`getMode`): `options.mode` do chamador →
**substituição do sinalizador de funcionalidade da BD** `INJECTION_GUARD_MODE` (Painel → Definições →
Sinalizadores de funcionalidade) → variável de ambiente `INJECTION_GUARD_MODE` → variável de ambiente `INPUT_SANITIZER_MODE` →
`warn`. Por conseguinte, uma substituição no painel tem precedência sobre as variáveis de
ambiente, pelo que a IU de Sinalizadores de funcionalidade controla a barreira em execução em
tempo real (sem reiniciar). A leitura da BD é tolerante a falhas:
se ocorrer um erro, a barreira recorre ao comportamento baseado nas variáveis de ambiente e, quando não
está definida qualquer substituição, o comportamento é idêntico à resolução baseada apenas nas variáveis de ambiente.

Fontes de deteção:

1. `sanitizeRequest()` de `@/shared/utils/inputSanitizer` (conjunto partilhado de
   detetores utilizado noutras partes do pipeline).
2. `DEFAULT_GUARD_PATTERNS` incorporados (atualmente `system_override_inline` e
   `markdown_system_block`, ambos com severidade `high`).
3. `customPatterns` opcionais transmitidos através das opções do construtor (cadeias de caracteres, expressões
   regulares ou registos `{ name, pattern, severity }`).

Quando `mode === "block"` **e** pelo menos uma deteção atinge o limiar de
severidade, `preCall` devolve `{ block: true, message: "Request rejected:
suspicious content detected" }`. Nos modos `warn`/`log`, a barreira de proteção regista o evento, mas
permite a chamada. O auxiliar partilhado `evaluatePromptInjection()` também é exportado
para chamadores que necessitem de avaliar prompts sem passar pelo registo.

**Limite de análise (v3.8.20):** o detetor inspeciona apenas os **primeiros 16 KB** do
texto combinado do prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) em
`src/shared/utils/inputSanitizer.ts`. Tanto `detectInjection()` como
`evaluatePromptInjection()` executam `slice(0, MAX_INJECTION_SCAN_BYTES)` antes de percorrerem
os padrões. As diretivas de injeção encontram-se perto do início de uma entrada, pelo que isto
limita a utilização de CPU/GC por expressões regulares em payloads com centenas de KB sem enfraquecer a deteção (cf.
#3932, #4041).

### Mascarador de credenciais (`credentialMasker.ts`)

É executado em **ambas** as fases, em último lugar na cadeia predefinida (prioridade `95`). Oculta
padrões conhecidos de chaves de API/tokens secretos no payload enviado (conteúdo das
mensagens, argumentos de chamadas de ferramentas, resultados de ferramentas) **e** na resposta do fornecedor, para que uma
credencial colada num prompt (ou devolvida por um resultado de ferramenta) não seja divulgada
ao fornecedor a montante nem devolvida ao cliente.

- **Apenas mediante ativação**, seguindo a mesma convenção da ocultação de PII (adjacente à Regra Rígida n.º 20):
  desativado, exceto se `settings.credentialRedactionEnabled === true` **ou**
  `CREDENTIAL_REDACTION_ENABLED=true`. Quando está desativado, a barreira de proteção não efetua qualquer ação —
  nunca bloqueia nem reescreve.
- `redactCredentials()` percorre toda a árvore do payload/resposta (`walkValue()`,
  protegida contra poluição de protótipos e contra ciclos através de `WeakSet`) e substitui as correspondências por
  um marcador de posição `[REDACTED:<type>]`, clonando apenas os ramos que foram efetivamente
  alterados.
- `CREDENTIAL_PATTERNS` abrange chaves de fornecedores de LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens de VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chaves de pagamento (Stripe, Square), chaves de
  serviços na nuvem (chave de acesso AWS, Twilio, SendGrid, Mailgun), chaves privadas/JWTs,
  cadeias de ligação com credenciais (`mongodb://user:pass@...`, etc.) e
  um padrão genérico de valor de cabeçalho `Authorization`/`x-api-key`/`api-key`/`apikey`.
  As chaves com formato de cabeçalho (`authorization`, `x-api-key`, `api-key`,
  `apikey`) são ocultadas estruturalmente (apenas o valor, preservando o prefixo do esquema, como
  `Bearer `/`Basic `), em vez de através da expressão regular genérica de texto.
- A barreira de proteção nunca bloqueia; apenas reescreve (`modifiedPayload` /
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
  message?: string; // apresentada em caso de bloqueio
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

Uma proteção assinala «sem alterações» devolvendo `void`, `{}` ou
`{ block: false }`. Devolver um `modifiedPayload`/`modifiedResponse` substitui
o valor que percorre a cadeia para as proteções subsequentes.
`signal?: AbortSignal` transmite o ciclo de vida do chamador às proteções. O cancelamento de um pedido é a exceção deliberada de abertura em caso de falha: as pontes multimédia interrompem o trabalho e efetuam a limpeza sem restaurar os dados multimédia em bruto para um destino que se sabe não os suportar.

## Registo (`registry.ts`)

A instância única `guardrailRegistry` expõe:

- `register(guardrail)` — adiciona uma proteção (ou substitui-a pelo nome normalizado) e
  reordena por `priority` ascendente.
- `clear()` / `list()` — auxiliares administrativos.
- `runPreCallHooks(payload, context)` — percorre as proteções ativas, encaminha o
  payload através de `modifiedPayload` e para no primeiro `block: true`.
- `runPostCallHooks(response, context)` — o mesmo fluxo no lado da resposta.
- `resetGuardrailsForTests({ registerDefaults })` — limpa o estado e, opcionalmente,
  regista novamente as predefinições para garantir um isolamento limpo dos testes.

Ambos os executores devolvem `{ blocked, payload|response, results, guardrail?, message? }`,
em que `results` é um array de registos `GuardrailExecutionResult` que incluem
os campos `blocked`, `skipped`, `modified`, `error` e `meta` por proteção,
úteis para rastreio.

### Desativar Proteções por Pedido

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agrega uma
lista sem duplicados dos nomes das proteções que devem ser ignoradas no pedido
atual. Origens (todas opcionais e combinadas):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` no corpo do pedido (nível superior)
- `metadata.disabledGuardrails` no corpo do pedido
- Cabeçalho `x-omniroute-disabled-guardrails` (ou o antigo
  `x-disabled-guardrails`)

Os valores podem ser arrays de strings ou uma string separada por vírgulas; os nomes são
normalizados para minúsculas em kebab-case (`pii_masker` → `pii-masker`). O resultado
é transmitido através de `context.disabledGuardrails` para o registo, que ignora
as proteções correspondentes (`skipped: true` em `results`).

## Ordem de execução

Para cada pedido que passa por `src/sse/handlers/chat.ts` e
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` cria a lista de exclusão a partir da chave de API, do corpo
   e dos cabeçalhos.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` executa os mecanismos de proteção por ordem
   crescente de prioridade:
   - Os mecanismos de proteção desativados são registados como `skipped`.
   - O `preCall` de cada mecanismo de proteção pode reescrever a carga útil através de `modifiedPayload`.
   - O primeiro `block: true` interrompe a cadeia e o processador devolve
     uma resposta de rejeição do mecanismo de proteção.
3. A carga útil (potencialmente reescrita) segue para o encaminhamento combinado e para o envio
   ao serviço a montante.
4. Depois de a resposta ser preparada, `guardrailRegistry.runPostCallHooks(...)`
   executa a mesma cadeia na resposta. Neste caso, `block: true` descarta a resposta
   do serviço a montante.

Os mecanismos de proteção que geram exceções são registados com `error: <message>` e registados no log através de
`logger.warn`, mas a cadeia prossegue — uma conceção de falha permissiva.

## Configuração

Variáveis de ambiente lidas pelos mecanismos de proteção integrados:

| Variável                              | Utilizada por            | Efeito                                                                                                                                               |
| ------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Defina como `false` para desativar completamente a deteção.                                                                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Política de injeção: `warn`, `block` ou `log`. O valor legado `redact` não reescreve o texto da injeção.                                             |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Modo do mecanismo de proteção contra injeção; é também um sinalizador de funcionalidade da BD que **substitui** as variáveis de ambiente (BD > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Gravidade mínima que `MODE=block` rejeita: `high` (predefinição), `medium` ou `low`.                                                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Alias legado de `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Quando definido como `true`, as PII do pedido são ocultadas (independentemente do modo de injeção).                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (a jusante) | Controla o comportamento do ocultador no lado da resposta.                                                                                           |

Os mecanismos de proteção do Modality Bridge leem a configuração em tempo de execução a partir do armazenamento
de definições suportado pela BD (`getSettings()`), e não das variáveis de ambiente. As chaves principais da visão são
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` e
`modalityBridgeCacheMaxEntries`. As chaves legadas
`visionBridge*` são aceites apenas como a alternativa de leitura documentada durante um ciclo;
as escritas efetuadas pelo painel utilizam as chaves principais. As predefinições e o resolvedor
alternativo encontram-se em `src/shared/constants/modalityBridgeDefaults.ts`, sendo as constantes
legadas mantidas em `src/shared/constants/visionBridgeDefaults.ts`.

O áudio utiliza `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` e `modalityBridgeAudioMaxClips`, além das definições
`modalityBridgeCache*` partilhadas. O áudio não dispõe de uma alternativa baseada em chaves legadas, uma vez que estas
chaves foram introduzidas com o esquema do Modality Bridge.

O vídeo utiliza `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` e
`modalityBridgeVideoTimeout`, além das definições `modalityBridgeCache*` partilhadas.
Está desativado por predefinição porque o FFmpeg/ffprobe são dependências operacionais
opcionais e a legendagem de fotogramas acrescenta latência e custos de modelo.

## Mecanismos de proteção personalizados

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

1. Crie `src/lib/guardrails/myGuardrail.ts` como uma extensão de `BaseGuardrail`.
2. Implemente `preCall` e/ou `postCall`.
3. Registe durante a importação (através de `registerDefaultGuardrails`) ou
   chame `guardrailRegistry.register(...)` em tempo de execução — o registo substitui
   qualquer mecanismo de proteção anterior com o mesmo nome normalizado.
4. Adicione testes em `tests/unit/` (exemplos existentes:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testes

Utilize `resetGuardrailsForTests()` entre testes para começar a partir de um estado conhecido.
Passe `{ registerDefaults: false }` para começar com um registo vazio e
registar apenas os mecanismos de proteção em teste. O Vision Bridge aceita injeção de
dependências (`deps.getSettings`, `deps.callVisionModel`); o Audio Bridge disponibiliza os
pontos de integração equivalentes para definições, capacidades, seleção do modelo STT, verificações
de credenciais e transcrição. Desta forma, os testes podem exercitar ambos os fluxos sem acesso à
base de dados ou à rede.

## Consulte também

- `src/lib/guardrails/` — implementação
- `src/shared/utils/inputSanitizer.ts` — detetor partilhado que suporta a
  deteção de injeção de prompts e a ocultação de PII
- `src/shared/constants/visionBridgeDefaults.ts` — predefinições do Vision Bridge e
  lista de modelos com utilização obrigatória do bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — predefinições partilhadas de execução do Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — camada ortogonal (circuit breaker, períodos de espera)
- `docs/reference/ENVIRONMENT.md` — referência completa das variáveis de ambiente

## Cobertura de rotas e red team do mecanismo contra injeção (Fase 8 · Bloco D)

O mecanismo contra injeção (`createInjectionGuard` / `withInjectionGuard`) abrange todas as rotas
que aceitam prompts do utilizador. Respeita `INJECTION_GUARD_MODE` (predefinição `warn` = apenas registo;
`block` = devolve HTTP 400 `SECURITY_001`).

| Tipo              | Rotas                                                                                                                                                | Modo predefinido |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Texto (existente) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generativo        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Dados             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

A extração de texto (`extractMessageContents`) abrange `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red team (todas as noites, `nightly-llm-security.yml`):** o promptfoo valida que cada rota bloqueia
o corpus OWASP-LLM quando `INJECTION_GUARD_MODE=block`; o garak executa sondagens (é ignorado sem o segredo).
`moderations` está incluído por motivos de consistência — os operadores no modo de bloqueio podem isentá-lo através de
`resolveDisabledGuardrails`.

O fluxo de trabalho noturno (`.github/workflows/nightly-llm-security.yml`, cron + execução
manual) tem duas tarefas:

- **`promptfoo-guard` (bloqueante)** — executa `promptfoo eval -c promptfooconfig.yaml`
  com `INJECTION_GUARD_MODE=block`. Cada caso adversarial (por exemplo, "ignore all
  previous instructions…", jailbreaks ao estilo DAN) verifica que a resposta contém
  `error.code === "SECURITY_001"`, ou seja, que o mecanismo rejeitou efetivamente o pedido.
- **`garak` (consultivo)** — executa o garak com `--probes promptinject,dan,leakreplay`
  numa instância local do OmniRoute (`http://localhost:20128/v1`). Está condicionado à existência de um
  segredo do fornecedor (`PROMPTFOO_PROVIDER_KEY`); é ignorado de forma adequada e recebe o sufixo
  `|| true`, pelo que gera um relatório sem causar uma falha na CI.

A cobertura do auxiliar do mecanismo (`createInjectionGuard` / `withInjectionGuard`)
abrange todas as rotas `/v1` que recebem prompts; o texto do prompt é obtido de
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` por
`extractMessageContents()` em `src/shared/utils/inputSanitizer.ts`.
