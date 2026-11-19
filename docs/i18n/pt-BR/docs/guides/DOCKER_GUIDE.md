# 🐳 Docker Guide — OmniRoute (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referência completa de implantação com Docker. Para um início rápido, consulte a [seção sobre Docker no README](../README.md#-docker).

## Sumário

- [Execução rápida](#quick-run)
- [Com arquivo de ambiente](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Perfis disponíveis](#available-profiles)
- [Como configurar ferramentas de CLI do host quando o OmniRoute é executado no Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar do Redis](#redis-sidecar)
- [Compose para produção](#production-compose)
- [Estágios do Dockerfile](#dockerfile-stages)
- [Variáveis de ambiente críticas](#critical-environment-variables)
- [Docker Compose com Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Túnel rápido do Cloudflare](#cloudflare-quick-tunnel)
- [Tags de imagem](#image-tags)
- [Atualizações do dashboard no Docker](#dashboard-updates-in-docker)
- [Disponibilidade: o SQLite padrão oferece apenas uma réplica](#availability-default-sqlite-is-single-replica)
- [Erros regionais do Gemini dentro do Docker](#gemini-regional-errors-inside-docker)
- [Observações importantes](#important-notes)

---

## Execução rápida

> **Auto-host em um comando?** Consulte o [Guia de auto-hospedagem](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (imagem publicada + Redis, somente loopback, sem escolha de perfil). O Quick Run abaixo é o caminho de contêiner único para usuários que já executam Redis em outro lugar.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Com arquivo de ambiente

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Docker Compose

```bash
# Perfil base (sem ferramentas de CLI)
docker compose --profile base up -d

# Perfil de CLI (Claude Code, Codex e OpenClaw integrados)
docker compose --profile cli up -d

# Perfil de host (voltado principalmente para Linux; monta os binários de CLI do host como somente leitura)
docker compose --profile host up -d

# Perfil web (Chromium/Playwright para provedores baseados em sessão web)
docker compose --profile web up -d

# Combine CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Perfis disponíveis

O OmniRoute oferece perfis do Compose para os principais formatos de implantação. Escolha aquele que corresponde ao seu ambiente.

| Perfil          | Serviço          | Quando usar                                                                                                                                           | Comando                                      |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (padrão) | `omniroute-base` | Servidor sem interface gráfica / ambiente de execução mínimo, sem CLIs de provedores incluídas                                                        | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Fluxos de trabalho com agentes que chamam `omniroute providers/setup/doctor` e CLIs incluídas (Codex, Claude Code, Droid, OpenClaw)                   | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Hosts Linux que desejam acesso semelhante a `network_mode` às CLIs do host montando `~/.local/bin`, `~/.codex`, `~/.claude` etc. como somente leitura | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Execute o sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porta `8317` para fazer proxy de CLIs upstream                       | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Provedores de sessão web que precisam de um navegador: `gemini-web`, `claude-web`, `claude-turnstile` (compila `runner-web`, com Chromium incluído)   | `docker compose --profile web up -d`         |

> É possível combinar vários perfis: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurando ferramentas de CLI do host quando o OmniRoute é executado no Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` e o botão
**Salvar configuração** do painel gravam arquivos como `~/.codex/*.config.toml`. Esses caminhos
só têm significado na máquina em que a CLI realmente é executada. Execute-os dentro
do contêiner e a gravação será feita no diretório inicial do próprio contêiner (`/home/node` —
a imagem é executada com `USER node`), onde nenhuma CLI do host jamais os lerá e de onde serão
descartados assim que o contêiner for recriado.

O OmniRoute detecta isso e recusa a gravação, fornecendo instruções em vez de
informar um sucesso que você não pode aproveitar: a CLI é encerrada com o código `2`, e a API responde com `422`
e `containerEphemeralTarget: true`.

### Recomendado: execute a CLI no host e o OmniRoute no Docker

O contêiner fornece a API; a CLI configura suas ferramentas do host.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # aponte a CLI para o contêiner
omniroute setup-codex                      # grava no ~/.codex real do seu host
```

Essa é a opção correta quando o Codex, Claude Code, Cursor ou ferramentas semelhantes são executados no seu
laptop — que é a configuração mais comum.

### Alternativa: faça bind mount dos diretórios de configuração do host (perfil `host`)

Se quiser que o próprio contêiner grave a configuração do host, monte os
diretórios e aponte `CLI_CONFIG_HOME` para a raiz da montagem. O perfil `host`
já faz isso:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Um bind mount é o que torna o caminho confiável: o OmniRoute lê
`/proc/self/mountinfo` e permite gravações em caminhos montados (e em diretórios
cujos filhos são pontos de montagem, que é exatamente a estrutura de `/host-home` acima), enquanto
continua recusando caminhos não montados.

### Mecanismo de escape: configure as próprias CLIs do contêiner (use com moderação)

Quando as CLIs realmente estiverem dentro do contêiner (o perfil `cli`), a gravação
será intencional. Passe `--allow-container-write` para qualquer comando `setup-*` ou defina
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para o servidor. A gravação será realizada
com um aviso de que ela não persistirá após o contêiner.

> **Aviso de segurança — perfil `cli` + montagem de `docker.sock`.**
> O perfil `cli` faz bind mount de `/var/run/docker.sock` para que o atualizador
> automático dentro do contêiner possa recriar a stack usando o daemon do host
> (`src/lib/system/autoUpdate.ts` verifica a presença desse socket e ignora o
> caminho do Docker quando ele não está presente). Esse socket é **um limite de
> confiança equivalente a root no host**: qualquer coisa que consiga acessá-lo controla o daemon do Docker do host como
> root — podendo criar, inspecionar, interromper e remover qualquer contêiner no host.
> Implicações:
>
> 1. **Nunca exponha a porta do perfil `cli` à rede.** Publique-a
>    em `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — um perfil `cli` acessível pela LAN transforma qualquer RCE no nível do painel em
>    comprometimento total do host.
> 2. **Não faça bind mount de diretórios adicionais do host no perfil `cli`.**
>    O socket do Docker combinado com qualquer montagem adicional concede ao contêiner acesso completo
>    de leitura/gravação ao seu sistema de arquivos e à configuração do host. Se precisar que uma ferramenta
>    acesse um projeto, execute-a localmente com o binário da CLI — não o monte
>    no contêiner `cli`.
>
> Se você não precisar de atualização automática dentro do contêiner, mantenha o perfil `cli` desativado
> (`COMPOSE_PROFILES=core,redis` ou uma opção mais curta). Os outros perfis não
> montam o socket do Docker.
>
> Consulte `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) para ver o modelo de ameaças relacionado
> a MITM, e `docs/security/SUPPLY_CHAIN.md` para conhecer a cadeia de procedência dos binários
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar do Redis

O OmniRoute depende do Redis para dar suporte ao limitador de taxa distribuído e ao cache compartilhado. O serviço `redis` é **sempre definido** no `docker-compose.yml` (ele não é condicionado a nenhum perfil) e é iniciado junto com qualquer outro perfil.

| Detalhe                     | Valor                                   |
| --------------------------- | --------------------------------------- |
| Imagem                      | `redis:7-alpine`                        |
| Nome do contêiner           | `omniroute-redis`                       |
| Porta interna               | `6379`                                  |
| Porta do host (sobrescrita) | `REDIS_PORT` (padrão: `6379`)           |
| Bind do host (sobrescrita)  | `REDIS_BIND_HOST` (padrão: `127.0.0.1`) |
| Volume                      | `omniroute-redis-data` → `/data`        |
| Verificação de integridade  | `redis-cli ping` (intervalo de 10s)     |

Variáveis de ambiente relacionadas:

- `REDIS_URL` — string de conexão injetada na aplicação (`redis://redis:6379` por padrão).
- `REDIS_PORT` — mapeamento da porta do host para o contêiner do Redis.
- `REDIS_BIND_HOST` — interface do host na qual a porta é publicada. O padrão é `127.0.0.1`.

> **Por que usar loopback por padrão:** o sidecar é executado sem `requirepass`, e os
> contêineres da aplicação acessam-no pela rede do Compose (`redis:6379`) — a porta publicada
> existe apenas para ferramentas executadas no host (`redis-cli`, um `npm run dev` local). Publicá-la em
> `0.0.0.0` exporia um Redis sem autenticação a todos os hosts da sua LAN. Se você definir
> `REDIS_BIND_HOST=0.0.0.0`, adicione também `--requirepass` ao `command:` do serviço.

**Desabilitar o Redis** não é recomendado (o limitador de taxa passará a usar o fallback em memória). Se for necessário, remova/comente o bloco do serviço `redis:` no `docker-compose.yml` ou escale-o para zero:

```bash
docker compose up -d --scale redis=0
```

## Compose de produção

Para executar um snapshot isolado de produção junto com o ambiente de desenvolvimento, use `docker-compose.prod.yml`.

| Detalhe                     | Valor                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| Arquivo                     | `docker-compose.prod.yml`                                                                       |
| Porta padrão do dashboard   | `PROD_DASHBOARD_PORT=20130` (mapeada para a porta interna `${DASHBOARD_PORT:-20128}`)           |
| Porta padrão da API         | `PROD_API_PORT=20131`                                                                           |
| Imagem                      | `omniroute:prod` (compilada a partir do alvo `runner-cli`)                                      |
| Contêiner do Redis          | `omniroute-redis-prod` (`redis:8.6.2`, volume dedicado `redis-prod-data`)                       |
| Volume de dados             | `omniroute-prod-data` (nomeado, persistido entre recompilações)                                 |
| Verificações de integridade | `node healthcheck.mjs` + `redis-cli ping`, com `depends_on` condicionado à integridade do Redis |

Como usar:

```bash
# Compilar e iniciar a stack de produção
docker compose -f docker-compose.prod.yml up -d --build

# Acompanhar os logs em tempo real
docker compose -f docker-compose.prod.yml logs -f

# Encerrar (manter os volumes)
docker compose -f docker-compose.prod.yml down
```

A stack de produção é executada em paralelo com o Compose de desenvolvimento (com nomes de contêineres, portas e volumes diferentes), permitindo que você continue iterando localmente enquanto a produção permanece em execução.

## Estágios do Dockerfile

O repositório envia um Dockerfile de vários estágios (`Dockerfile`). São expostas quatro etapas; escolha o `target` certo para seu caso de uso.

| Estágio       | Imagem base           | Propósito                                                                                                                                                                                                                                                                                         |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala deps (`npm ci --legacy-peer-deps`) e executa `npm run build` (Turbopack por padrão — veja recursos em tempo de construção abaixo)                                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | Tempo de execução de produção com saída autônoma Next.js.** Nenhum provedor CLIs incluído.**                                                                                                                                                                                                      |
| `runner-cli`  | `runner-base`         | Adiciona `git`, `docker.io`, `docker-compose` e CLIs global : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Escolha isto para fluxos de trabalho de agente.**                                                                                                              |
| `runner-web`  | `runner-base`         | Adiciona Playwright + um navegador Chromium (`--with-deps`) para provedores de sessões da web: `gemini-web`, `claude-web`, `claude-turnstile`.** Escolha isto ao usar esses provedores** — a imagem simples falha no momento da solicitação sem ela (veja a nota `-web` em Canais de lançamento). |

Crie um alvo específico manualmente:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Recursos em tempo de construção

Três argumentos de construção controlam quanto custa o estágio `builder`. Eles são apenas em tempo de construção — `OMNIROUTE_MEMORY_MB` (abaixo) é um botão de tempo de execução separado.

| Construir argumento         | Padrão | Efeito                                                                                          |
| --------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` compila com webpack: menor pico de memória, mais lento. `1` opta por Turbopack.             |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Teto de heap V8 (`--max-old-space-size`) para o `next build` gerado.                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Alimenta `CIRCLE_NODE_TOTAL`; A seguir deriva `workers = N - 1` para coleta de dados de página. |

`OMNIROUTE_BUILD_WORKERS` é quem deve aumentar em um grande construtor e quem deve suspeitar quando uma construção restrita morre** depois** `✓ Compiled successfully`. Cada trabalhador de dados de página é seu próprio processo, assim como o próprio `next build` pai; uma reprodução VPS ao vivo (edição #7518) mediu o pico RSS de cada processo em ~ 4,5 GB independente do sinalizador de heap `NODE_OPTIONS` (Turbopack compila na memória native/Rust fora do heap V8). O padrão de `2` (→ 1 trabalhador, 2 processos no total) é dimensionado para os 16 GB / 4 vCPU executores hospedados no GitHub que o pipeline de publicação usa. No `8` (→ 7 trabalhadores) esse executor ficou sem memória e o buildkit falhou na etapa com `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 trabalhadores) ainda não cabia quando o RSS por processo foi medido diretamente em vez de inferido. `tests/unit/docker-build-memory-budget.test.ts` faz a aritmética em relação ao valor medido e falha se um dos botões ultrapassar o tamanho do corredor.

Turbopack compila na memória Rust nativa que existe** fora** o heap V8, então `OMNIROUTE_BUILD_MEMORY_MB` não o vincula. Em um host com limite de memória, a compilação é então SIGKILLed pelo OOM killer sem nenhum texto de erro — ele simplesmente para no meio do `Creating an optimized production build`, o que parece um travamento em vez de falta de memória. É por isso que o `Dockerfile` usa webpack como padrão (`OMNIROUTE_USE_TURBOPACK=0`), ao contrário de `npm run dev` / `npm run build`, onde Turbopack é o código padrão: um `docker build .` simples sem argumentos de construção (o que o Railway e outros hosts de um clique executam) não deve morrer silenciosamente em um construtor com limite de memória. As imagens publicadas já passam `OMNIROUTE_USE_TURBOPACK=0` explicitamente em `docker-publish.yml`. Em um construtor com bastante RAM, opte por Turbopack para uma construção mais rápida:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` está habilitado, então `next build` executa um pai** e** um processo de trabalho e cada um honra `OMNIROUTE_BUILD_MEMORY_MB` separadamente. Dimensione o teto do contêiner acima de aproximadamente o dobro desse valor, e não uma vez.

Medido nesta árvore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Empacotador | Teto do contêiner | Resultado                                |
| ----------- | ----------------- | ---------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB    | OOM morto em ambos, silenciosamente      |
| webpack     | 8 GiB             | construir trabalhador SIGKILLed          |
| webpack     | 12 GiB            | teve sucesso, atingiu o pico de 11,1 GiB |

### Padrões de tempo de execução

Padrões exportados por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento da memória em Docker:

- A imagem define `OMNIROUTE_MEMORY_MB=1024` e deriva `NODE_OPTIONS=--max-old-space-size=1024` dele.
- O processo real do servidor é iniciado pelo inicializador independente, que lê `OMNIROUTE_MEMORY_MB` e anexa `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- O nó usa o último valor `--max-old-space-size` repetido, portanto, definir `OMNIROUTE_MEMORY_MB` controla o limite efetivo de heap Docker.
- Como a imagem sempre o define, o substituto calibrado pela RAM do próprio inicializador nunca se aplica em Docker. Aumente-o explicitamente para a carga de trabalho (tabela abaixo). `2048` ainda é muito pequeno para o agente de codificação `/v1/responses`.

### Tempo de execução RAM para agentes de codificação

O padrão de 1 GiB Docker é um piso dashboard/light-chat, não um tamanho de produção. Corpos `POST /v1/responses` longos (centenas de mensagens, dezenas de ferramentas) retêm vários gráficos na memória durante a compactação. Duas solicitações sobrepostas de token ~ 3 MiB / ~ 750k abortaram a V8 em um** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) e também atingiu 16 GiB cgroup OOM. Veja [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tamanho** cgroup `--memory` acima do heap** Os buffers nativos —, SQLite e intermediários de compactação ficam fora da V8.

| Carga de trabalho                            | `OMNIROUTE_MEMORY_MB`  | Contêiner/cgroup      | Notas                                                                                 |
| -------------------------------------------- | ---------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| Dashboard, um bate-papo leve                 | `1024` (imagem padrão) | ≥2 GiB                |                                                                                       |
| Um agente de codificação (Claude/Codex/Grok) | `8192`                 | ≥10 GiB               | `/v1/responses` típico de sessão única                                                |
| Dois `/v1/responses` longos simultâneos      | `10240`–`12288`        | ≥12–16 GiB            | Medição da interrupção do V8 no heap ~ 12 GiB                                         |
| Três contextos longos simultâneos +          | não em um processo     | serializar / mais RAM | A admissão padrão para peso pesado é 1 em voo; aumentá-lo sem RAM reintroduz o aborto |

`omniroute serve` em bare metal calibra ~ 35% de RAM ( `[512, 4096]` fixado) quando `OMNIROUTE_MEMORY_MB` é** desarmar** . Docker sempre define `1024`, para que a calibração nunca seja executada na imagem oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Variáveis de Ambiente Críticas

Além dos padrões documentados em [ENVIRONMENT.md](../reference/ENVIRONMENT.md), as seguintes variáveis são as mais importantes ao executar no Docker:

| Variável                      | Finalidade                                                                                                                                                                                                                                                         | Padrão                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Segredo compartilhado para a ponte WebSocket. **Obrigatório em produção** — defina uma string aleatória forte.                                                                                                                                                     | não definido (deve ser fornecido) |
| `REDIS_URL`                   | String de conexão para o limitador de taxa/backend de cache                                                                                                                                                                                                        | `redis://redis:6379`              |
| `REDIS_PORT`                  | Porta no host para o contêiner Redis incluído                                                                                                                                                                                                                      | `6379`                            |
| `REDIS_BIND_HOST`             | Interface do host na qual a porta do Redis incluído é publicada (loopback, a menos que você adicione AUTH)                                                                                                                                                         | `127.0.0.1`                       |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Caminho do host montado no perfil `cli` em `/workspace/omniroute` para fluxos de trabalho de autoatualização                                                                                                                                                       | `.` (diretório atual)             |
| `OMNIROUTE_MEMORY_MB`         | Limite de heap do Node em tempo de execução para o servidor Docker autônomo; substitui o padrão da imagem acima. Agentes de programação: `8192`+ (consulte [RAM em tempo de execução](#runtime-ram-for-coding-agents)).                                            | `1024`                            |
| `DASHBOARD_PORT` / `API_PORT` | Substitui as portas expostas do painel (20128) e da API (20129)                                                                                                                                                                                                    | `20128` / `20129`                 |
| `APP_BIND_HOST`               | Interface do host na qual o docker-compose publica as portas do painel/API/WS em tempo real. Com `REQUIRE_API_KEY=false` (o padrão), `0.0.0.0` expõe o proxy `/v1` anônimo à LAN — só amplie o acesso com `REQUIRE_API_KEY=true` ou com um proxy reverso à frente. | `127.0.0.1`                       |
| `CLIPROXY_BIND_HOST`          | Interface do host na qual o docker-compose publica o sidecar `cliproxyapi` — seu volume de dados armazena as credenciais dos provedores.                                                                                                                           | `127.0.0.1`                       |
| `OMNIROUTE_PLUGINS_DIR`       | Diretório que o scanner de plugins em tempo de execução lê e no qual instala. Defina-o quando os plugins forem montados por bind: o padrão segue `HOME`, que uma imagem não precisa exportar.                                                                      | `~/.omniroute/plugins`            |
| `OMNIROUTE_BASE_PATH`         | Subcaminho da URL quando o aplicativo é publicado atrás de um proxy reverso (por exemplo, `/omniroute`)                                                                                                                                                            | _(vazio = raiz)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Origem pública do navegador, incluindo o subcaminho (por exemplo, `https://host/omniroute`)                                                                                                                                                                        | não definido                      |
| `PROD_DASHBOARD_PORT`         | Porta do painel no host para `docker-compose.prod.yml`                                                                                                                                                                                                             | `20130`                           |
| `CLIPROXYAPI_PORT`            | Porta no host para o sidecar `cliproxyapi`                                                                                                                                                                                                                         | `8317`                            |

## Proxy reverso em um subcaminho (Traefik/nginx)

Next.js `basePath` é compilado no pacote independente. OmniRoute registra o valor preparado em um arquivo sentinela na raiz do aplicativo (escrito durante `npm run build`; lido por `scripts/docker/ensure-docker-base-path.mjs`) e o compara com `OMNIROUTE_BASE_PATH` quando o contêiner é iniciado. Quando eles diferem e a imagem foi construída para a raiz do domínio, o ponto de entrada reescreve os manifestos independentes, os literais `basePath`/`assetPrefix` incorporados (os próximos 16 renderizam o ativo SSR URLs apenas do `assetPrefix` — o patcher espelha o subcaminho nele), o ativo `/_next/static` URLs preparado (manifestos de referência do cliente, importações de mídia, páginas de erro pré-renderizadas) e o cliente `process.env` shim antes da execução `node dev/run-standalone.mjs`.

### Compilação do Compose (recomendado)

Defina ambas as variáveis em `.env` e reconstrua para que a imagem e o tempo de execução estejam de acordo:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` encaminha `OMNIROUTE_BASE_PATH` como um argumento de construção Docker e como uma variável de ambiente de tempo de execução.

### Subcaminho de tempo de execução + da imagem raiz pré-construída

As imagens `cheaperinference/omniroute:*` publicadas são criadas para a raiz do domínio. Você ainda pode definir `OMNIROUTE_BASE_PATH` em tempo de execução; o contêiner corrige o pacote uma vez na inicialização. Combine-o com a origem pública correspondente:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure o proxy reverso para encaminhar o** completo** caminho externo (não retire o prefixo). Traefik deve rotear `PathPrefix(`/omniroute `)` para o contêiner sem `StripPrefix`, para que Next.js receba `/omniroute/...` e sirva ativos de `/omniroute/_next/...`.

O Docker healthcheck investiga o endpoint leve do ciclo de vida `/healthz` prefixado com o `OMNIROUTE_BASE_PATH` ativo. `/api/monitoring/health` permanece disponível para diagnósticos human/dashboard ; para apontar o contêiner HEALTHCHECK de volta para ele (por exemplo, para aplicação profunda de integridade), defina `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esse caminho é um** profundo** check ( resumo de monitoramento DB + ) — apropriado para `HEALTHCHECK` pouco frequente de Docker se você optar por voltar, mas** não** para intervalos `livenessProbe` do Kubernetes.

Para orquestradores (Kubernetes, Nomad, etc.):

| Sondar                 | Prefiro                                                              | Evitar                                                                   |
| ---------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Vivacidade             | HTTP `GET /livez` ou TCP na porta principal (`PORT`, padrão `20128`) | `/api/monitoring/health` como vivacidade                                 |
| Prontidão              | HTTP `GET /healthz`                                                  | Tempos limites apertados que tratam o loop de eventos ocupado como morto |
| Profundo / caixa preta | `/api/monitoring/health`                                             | —                                                                        |

`/healthz` relata o ciclo de vida do processo (`ok` / `starting` / `stopping`). `/livez` está ativo apenas no processo (200 sempre que o manipulador pode ser executado; ele não espera pela prontidão). Ambos ainda são executados no mesmo loop de eventos do Node como manipulação de solicitação, portanto, o catálogo vinculado à CPU ou o trabalho de compactação podem atrasá-los — ocupado ≠ morto. Prefira a vivacidade TCP se o tempo limite das sondas HTTP expirar. Orientação completa do probe: [Guia de monitoramento recomendações do probe — Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compor com Caddy (HTTPS Auto-TLS)

OmniRoute pode ser exposto com segurança usando o provisionamento automático SSL do Caddy. Certifique-se de que o registro DNS A do seu domínio aponte para IP do seu servidor.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy define os cabeçalhos de encaminhamento padrão para o contêiner upstream. OmniRoute usa `NEXT_PUBLIC_BASE_URL` como origem pública canônica para retornos de chamada OAuth e links públicos gerados; gravações de painel autenticadas usam solicitações da mesma origem, além de proteção CSRF vinculada à sessão. Habilite `OMNIROUTE_TRUST_PROXY` apenas para implantações avançadas nas quais você deseja intencionalmente que OmniRoute derive a origem pública de cabeçalhos encaminhados confiáveis em vez de configuração explícita.

## Cloudflare Quick Tunnel

O suporte do painel para implantações com Docker inclui um **Cloudflare Quick Tunnel** ativado com um clique em `Dashboard → Endpoints`. Na primeira ativação, o `cloudflared` é baixado somente quando necessário, um túnel temporário para seu endpoint `/v1` atual é iniciado e a URL `https://*.trycloudflare.com/v1` gerada é exibida diretamente abaixo da sua URL pública normal.

Os painéis de túneis de endpoint (Cloudflare, Tailscale, ngrok) podem ser exibidos ou ocultados em `Settings → Appearance` sem alterar o estado ativo dos túneis.

### Observações sobre túneis

- As URLs de Quick Tunnel são temporárias e mudam após cada reinicialização.
- Os Quick Tunnels não são restaurados automaticamente após a reinicialização do OmniRoute ou do contêiner. Reative-os pelo painel quando necessário.
- No momento, a instalação gerenciada oferece suporte a Linux, macOS e Windows em `x64` / `arm64`.
- Por padrão, os Quick Tunnels gerenciados usam o transporte HTTP/2 para evitar avisos ruidosos sobre o buffer UDP do QUIC em ambientes de contêiner com recursos limitados. Defina `CLOUDFLARED_PROTOCOL=quic` ou `auto` se quiser usar outro transporte.
- As imagens Docker incluem raízes de AC do sistema e as fornecem ao `cloudflared` gerenciado, evitando falhas de confiança TLS quando o túnel é inicializado dentro do contêiner.
- Defina `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` se quiser que o OmniRoute use um binário existente em vez de baixar um.

## Tags de imagem

| Imagem                       | Marcação | Tamanho  | Descrição                                               |
| ---------------------------- | -------- | -------- | ------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | 250 MB ~ | Mais alto** publicado** SemVer estável (não git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | 250 MB ~ | Fixe esta classe de tag para GitOps                     |

As mesmas imagens são publicadas em três repositórios, com os mesmos resumos por arquitetura: `cheaperinference/omniroute` (Docker Hub, a organização Cheaper Inference, de 3.8.53 em diante), `ghcr.io/cheaper-inference/omniroute` e o legado `diegosouzapw/omniroute`, que mantém seu histórico de pull e ainda recebe todos os lançamentos. As implantações `diegosouzapw/omniroute` existentes continuam sendo atualizadas; mudar o nome da imagem é opcional. O canal de pré-lançamento `:next` / `:next-web` abaixo é publicado apenas para `diegosouzapw/omniroute` e GHCR.

Manifesto multiplataforma: `linux/amd64` + `linux/arm64` nativo (Apple Silicon, AWS Graviton, Raspberry Pi). Docker seleciona a arquitetura correspondente automaticamente; passe `--platform linux/amd64` se precisar forçar a emulação AMD64 em hosts ARM.

### Canais de lançamento

OmniRoute publica canais Docker separados para versões estáveis, testes ativos de ramificação de lançamento e compilações de desenvolvimento.

| Canal                           | Fonte                                  | Mutabilidade                        | Uso recomendado                                                                                                                           |
| ------------------------------- | -------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | lançamento Signed/versioned            | Imutável                            | Implantações de produção que fixam uma versão exata                                                                                       |
| `:latest` / `:latest-web`       | Mais alto** publicado** SemVer estável | Ponteiro estável mutável            | Segue versões estáveis** depois** um trabalho de publicação SemVer que — faz** não** rastrear commits `main` ou `release/v*` não lançados |
| `:next` / `:next-web`           | Ramo `release/v*` padrão atual         | Ponteiro de pré-lançamento mutável  | Testando correções que chegaram ao branch de lançamento ativo, mas ainda não estão em uma versão estável                                  |
| `:main` / `:main-web`           | filial `main`                          | Ponteiro de desenvolvimento mutável | Apenas testes de desenvolvimento e integração                                                                                             |

#### Provedores de sessões da Web: as imagens `-web`

Cada canal acima funciona como uma tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), construída a partir do estágio `runner-web` — a mesma imagem mais Playwright e um navegador Chromium. A imagem simples é enviada** sem** Cromo; `gemini-web`, `claude-web` e `claude-turnstile` precisam disso.

A falha é adiada, não no momento da inicialização: esses provedores listam seus modelos e mostram como conectados no painel, e apenas a primeira solicitação falha com

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Se você usar esses provedores, puxe a tag `-web` do canal em que você já está — nada mais muda. Em uma instalação npm/CLI (sem imagem Docker ), a peça equivalente que falta é o binário do navegador: execute `npx playwright install chromium` no host.

#### Usando o canal de pré-lançamento

O canal `next` é reconstruído a cada envio para a ramificação `release/v*` padrão atual e é publicado para AMD64 e ARM64. As ramificações de manutenção mais antigas não podem substituí-lo. O canal fornece uma imagem pullable para correções que foram mescladas no branch de lançamento ativo antes que a próxima tag estável seja cortada.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para Docker Compose, substitua a tag de imagem usada pelo perfil selecionado e, em seguida, extraia e recrie o serviço:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Segurança e reversão

`next` é um canal flutuante de pré-lançamento. Ele pode mudar em qualquer push para o branch de lançamento ativo e é** não suportado para uso em produção** . Fixe o resumo da imagem ao avaliar uma compilação específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de testar, faça backup do volume de dados OmniRoute ou do diretório de dados montado em ligação. Para reverter, restaure a versão estável ou resumo usado anteriormente e recrie o contêiner:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Uma compilação de branch de lançamento nunca pode mover `latest`; apenas uma versão semântica estável elegível pode promover o ponteiro estável. As imagens `next` mantêm a inspeção da imagem de lançamento e bloqueiam a porta de vulnerabilidade CRÍTICA.

**`latest` não é uma garantia monetária para o git.** Correções mescladas no `main` ou na ramificação ativa `release/v*` são** não** em `:latest` até que uma imagem SemVer estável seja publicada e o trabalho de publicação promova `:latest` (mesmo resumo daquele SemVer). Se `latest` parecer congelado enquanto GitHub já mostra a correção, puxe `:next` para testar o branch de lançamento ou aguarde a tag SemVer.

| Você quer                                                              | Usar                                 |
| ---------------------------------------------------------------------- | ------------------------------------ |
| GitOps / produção que não deve desviar                                 | Pin `:X.Y.Z` (ou o resumo da imagem) |
| Siga os estábulos publicados e aceite uma recriação em cada lançamento | `:latest`                            |
| Testar commits `release/v*` não lançados                               | `:next` (não produção)               |
| Teste `main`                                                           | `:main` (não produção)               |

## Atualizações do dashboard no Docker

Um contêiner criado a partir de uma imagem publicada não pode substituir a si próprio. Quando o OmniRoute detecta que está sendo executado dentro de um
contêiner (sem checkout do `.git` e não sendo uma instalação do npm), o banner de atualização do dashboard inicial mostra o
comando do host que deve ser executado em vez das instruções do npm/git, com um botão para copiá-lo:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

O nome do serviço vem de `AUTO_UPDATE_SERVICE` (o padrão é `omniroute`, o serviço em
`docker-compose.selfhost.yml`). `pull` atualiza apenas uma tag flutuante (`latest`, `next`); com uma tag
`:X.Y.Z` fixada, edite primeiro a tag.

### Atualizações com um clique usando um arquivo de acionamento no host

Para manter **Atualizar agora** funcionando sem montar `/var/run/docker.sock` (o que concede ao contêiner
acesso root no host — consulte o aviso sobre o perfil `cli` acima), defina `DOCKER_UPDATE_TRIGGER_FILE` no
serviço do OmniRoute e execute um observador no host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

O caminho deve estar dentro de `DATA_DIR` (valores relativos são resolvidos em relação a ele); qualquer outro
caminho é rejeitado. **Atualizar agora** então grava `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` nesse
arquivo, responde com `202`, e o dashboard consulta `/api/system/version` até que a nova versão esteja ativa
e então recarrega. O OmniRoute nunca executa um shell ou comando do Docker nesse modo. Assim como em todas as ações de
atualização, a solicitação é aceita somente de clientes de loopback/LAN.

Um diretório de dados montado por bind fornece ao host um caminho estável para monitorar. Exemplos de unidades do `systemd`
(ajuste `/srv/omniroute` para o diretório que contém seu arquivo do Compose e `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Monitorar solicitações de atualização do dashboard do OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Baixar e recriar o contêiner do OmniRoute

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

O serviço remove a solicitação antes de baixar a imagem para que uma execução com falha não entre em loop. Sem
`DOCKER_UPDATE_TRIGGER_FILE`, o dashboard mantém o fluxo de comandos manuais.

## Disponibilidade: SQLite padrão é uma réplica única

Estoque Docker / Kubernetes OmniRoute é** um processo de nó + um gravador SQLite** . Alta disponibilidade é** não suportado** nessa topologia.

| Restrição                            | Conseqüência                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escritor único                       | Fazer** não** execute várias réplicas no mesmo arquivo SQLite. Isso corrompe o DB.                                                                                                                                                                                                                                                 |
| Recriar/reiniciar/ HEALTHCHECK kill  | **Interrupção total** de SSE em andamento, sessões de painel e estado na memória. Todo cliente conectado cai. Novas solicitações durante a janela do terminal vazio obtêm um proxy reverso**`502 Bad Gateway: Unknown error`** , não OmniRoute JSON — os clientes não conseguem distinguir isso de uma falha do provedor (#11015). |
| Mesmo loop de eventos que `/healthz` | Um catálogo ocupado ou um tique de compactação podem atrasar as sondagens; um curto tempo limite e reinicia o** apenas** réplica.                                                                                                                                                                                                  |

**Matriz de sonda** (veja também [recomendações do probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sondar             | Alvo                                                   | Não use                                                                  |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| Vivacidade         | TCP em `PORT` (padrão `20128`) ou soft HTTP `/healthz` | `/api/monitoring/health`                                                 |
| Prontidão          | HTTP `GET /healthz`                                    | Tempos limites apertados que tratam o loop de eventos ocupado como morto |
| Profundo / humanos | `/api/monitoring/health`                               | Atividade automatizada do kubelet                                        |

**Atualizações:** espere que cada sessão caia. Drene clientes, se puder; não há atualização contínua no SQLite padrão. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` também substituirá o único processo quando o contêiner não estiver íntegro - mesmo raio de explosão.

Manifestos prontos e um gráfico Helm disponíveis em `deploy/kubernetes/` e `deploy/helm/omniroute/` — consulte o [guia de implantação do Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Snippet do Kubernetes para um** réplica única** (É necessário recriar; não aumente `replicas` em um arquivo SQLite ):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` sleep permite que o kube descarte os endpoints do serviço antes SIGTERM então** novo** o tráfego para de atingir o processo de morte. `/v1/responses` SSE em voo é drenado até `SHUTDOWN_TIMEOUT_MS` (padrão 30s) por meio de concessões de admissão pesadas (#11015). Novas solicitações que ainda chegam ao processo recebem `503` + `Retry-After: 5`. A lacuna Recriar ponto de extremidade vazio até que a substituição esteja pronta permanece uma interrupção grave — essa é a topologia SQLite, não uma configuração incorreta do probe.

Postgres externo/multi-gravador HA é** não** um caminho de estoque documentado. Se você precisar de HA, mantenha uma única réplica ou execute uma topologia que o projeto testou e documentou separadamente. O trabalho Postgres/MySQL reside em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Até que seja enviado, a única forma suportada de multiplicar** grande** A capacidade `/v1/responses` é N processos independentes (próxima seção), não `replicas > 1` em um volume.

## Escalabilidade: N processos independentes

### propriedade de rotação de token Codex

As cópias de uma conta Codex não devem consumir independentemente seu token de atualização de uso único. Em instâncias que consomem apenas credenciais sincronizadas, defina `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Deixe-o não definido no proprietário da rotação única. Cada processo ainda precisa do seu próprio `DATA_DIR`; esta opção não compartilha SQLite nem fornece sincronização de token ou bloqueio distribuído.

A instância passiva relê a conexão quando uma atualização é necessária e adota apenas um token de acesso diferente e não expirado. Caso contrário, a atualização será desabilitada sem expirar ou desativar a conexão ou contar uma falha no disjuntor de atualização. Falhas reais de autenticação upstream ainda usam contabilidade de falha normal, resfriamento exponencial e erro normal do cliente; a desativação da conta permanece permanente. Sincronize os tokens rotacionados do proprietário antes que os tokens de acesso expirem (o tempo de atualização proativa padrão é de cinco minutos) ou importe novamente o arquivo de autenticação Codex. As importações passivas armazenam os tokens fornecidos sem validá-los no ponto final do token. A atualização manual dashboard/API retorna `409 refresh_disabled`; novos logins OAuth permanecem inalterados. Consulte [referência de ambiente](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Um processo de nó é** uma pilha V8** . Dois agentes de codificação ~ 3 MiB / ~ 750k tokens sobrepostos `POST /v1/responses` (RTK + Caveman ) abortam aquele heap em ~ 12 Gi (`FATAL ERROR: Reached heap limit`) e podem OOM um cgroup de 16 Gi. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Essa medição é uma** orçamento de memória** aviso, não é um produto hard-max de dois longos `/v1/responses` simultâneos. A admissão de bate-papo pesado é controlada por um orçamento de bytes de ingestão derivado automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimensionado a partir do mesmo V8/cgroup teto — substituindo-o para cima (ou definindo o limite de contagem de solicitações `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` herdado) em um processo já dimensionado reintroduz a interrupção. Bate-papos pequenos, `/healthz`, `/v1/models` e MCP são** não** naquele boné.

### Processo único: mais de dois `/v1/responses` longos

UM** saudável** processo (pilha abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, padrão `0.75`)** poderia** execute mais de dois `POST /v1/responses` longos simultâneos quando o orçamento de bytes em andamento para todo o processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ainda tiver espaço. Corpos iguais ou superiores a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (padrão 256 KiB) recebem o mesmo arrendamento pesado que solicitações de estrutura pesada e usam o mesmo escape [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dezenas de clientes SSE longos simultâneos (as operadoras geralmente precisam de 40 a 50) é um** orçamento de memória** pergunta — tamanho heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — não é um limite de produto “máximo de 2” rígido. Um heap pressionado ainda é eliminado com `503` reutilizável, portanto #7849 não retorna.

Para** multiplicar montes** (espaços antigos V8 independentes)** hoje** :

| Fazer                                                                                                                                          | Não                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Correr** N containers/pods** , cada um com seu** ter** `DATA_DIR` /volume                                                                      | Definir `replicas > 1` em um arquivo SQLite                                 |
| Tamanho pesado em voo + espaço saudável de heap/orçamento de bytes em voo; 1–2 é o padrão conservador # #7849, não um produto rígido no máximo | Dê a um processo 8 × RAM e um limite de contagem ilimitado                  |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para** contadores de cotas compartilhadas**                                     | Trate Redis como SQLite — compartilhado, não é                              |
| Duplicar segredos do provedor em cada instância (ou aceitar painéis particionados)                                                             | Espere um painel/um registro de chamadas entre instâncias                   |
| Frontal com qualquer balanceador de carga; sticky pela chave ou sessão API é suficiente                                                        | Exigir um middleware com reconhecimento de tamanho específico do fornecedor |

A afinidade sessão-conta também pode ser compartilhada por meio de Redis: defina `OMNIROUTE_SESSION_AFFINITY_STORE=redis` e `REDIS_URL` em cada processo, com o mesmo `REDIS_KEY_PREFIX` e uma configuração `sessionAffinityTtlMs` positiva. Os pinos resolvem identidades de contas de uso com hash para a conexão local qualificada de cada processo, portanto, contas OAuth com metadados de identidade correspondentes não precisam ter conexão correspondente IDs. Identidades de contas conhecidas têm precedência sobre IDs locais contraditórios na resolução de pin e no despejo protegido; registros sem identidade (ou chamadores de despejo sem identidade) retêm a guarda ID herdada. Contas sem uma identidade de uso estável ainda exigem IDs correspondente. Erros Redis ou chamadas que excedem 100 ms retornam ao SQLite local. Cada armazenamento de afinidade Redis limita as operações pendentes em 8, ignora Redis imediatamente quando cheio e libera slots somente quando o trabalho subjacente é liquidado, não no prazo do chamador. Durante uma interrupção Redis não há verdade compartilhada: cada instância retorna à sua própria afinidade local, as sessões podem ser fixadas novamente uma vez por instância e as instâncias podem divergir. A aderência reconverge através Redis quando ele se recupera. O tempo limite limita a espera, não um EVAL enviado, que pode chegar após o fallback. As gravações de roteamento comparam o valor exato observado pela decisão de roteamento, não uma nova leitura de tempo de mutação; uma falha observada ou uma observação de fallback SQLite é comparada como uma chave Redis ausente. Os pinos obsoletos são substituídos em um CAS, portanto, um comando tardio não pode substituir ou excluir um pino diferente e mais novo. As leituras Redis retornam atomicamente o valor e o servidor restante TTL; PTTL positivo (ou sem expiração) determina a vivacidade, não o carimbo de data / hora JSON do escritor ou o relógio do leitor. Os instantâneos locais mapeiam o TTL restante para um prazo local; as chaves JSON existentes permanecem legíveis e seus bytes brutos são retidos para CAS. Redis é a única fonte da verdade enquanto responde. Upserts, toques e exclusões compartilhados confirmados removem a entrada local, nunca a instalam ou atualizam. SQLite no caminho Redis contém apenas as próprias decisões de fallback desta instância de erros Redis, tempos limite ou saturação de admissão, limitados por TTL como antes. Um PIN local ausente em uma interrupção posterior custa uma nova escolha (uma falha no cache de prompt), e não uma conta errada ou despejada. Os upserts rejeitados retornam o vencedor compartilhado e seu TTL restante atomicamente: a seleção comum verifica novamente o prazo local mapeado e usa um vencedor elegível ainda ativo, afetando o uso e o registro dessa conta sem outra gravação compartilhada. Se não estiver disponível, a seleção mantém o candidato local, deixa o pin compartilhado inalterado e emite uma mensagem de depuração. CAS rejeitado não grava SQLite; Erros Redis, tempos limite ou saturação de admissão aplicam a operação local existente. Se a resposta de uma mutação enviada chegar após o tempo limite (aceito, rejeitado ou erro), uma comparação e exclusão de valor serializado exato síncrono remove apenas a linha de fallback de tempo limite idêntico ao byte. Não há espera entre essa comparação e exclusão; uma gravação de interrupção mais recente é preservada. O despejo protegido remove o PIN local da própria conta com falha, mesmo com Redis desativado, e o limpa novamente após o despejo compartilhado confirmado. As respostas compartilhadas anteriores pendentes não podem restaurar um pin local removido porque os sucessos compartilhados nunca gravam SQLite. Um substituto de interrupção posterior pode restaurar uma conta; uma gravação compartilhada aceita posteriormente existe apenas em Redis. As falhas Redis não consultam o estado de fallback local. Com o driver desligado, os pinos recém-selecionados mantêm o formato herdado SQLite JSON de quatro campos; somente o roteamento Redis adiciona a identidade da conta com hash. Os pinos pré-buscados são verificados novamente em seu limite de expiração. A seleção de não arrendamento Redis relê a loja, mas o planejamento de arrendamento síncrono ainda pode usar um pino despejado entre a pré-busca e o planejamento (uma janela de melhor esforço aceita). Um commit de arrendamento não pode trocar de conta após uma reivindicação durável: no upsert rejeitado, ele mantém o candidato reivindicado apenas para aquela solicitação e deixa o vencedor compartilhado intocado, portanto, o acordo entre as instâncias é limitado nesse caminho. O restante da tabela ainda se aplica: isso não compartilha a aderência da sessão combinada, pinos de giro Codex nativos, semáforos de conta, bloqueios, limites de gastos, configuração ou registros de chamadas.

Hardware: longo `/v1/responses` simultâneo por instância é um** orçamento de memória** pergunta (heap + inflight-byte / # #10110). `N` independente `DATA_DIR` s ainda multiplica heaps: o host RAM deve cobrir `N × cgroup`, não “um pod de 16 Gi com N = 8”. Nunca `replicas > 1` em um arquivo SQLite.

Componha o esboço (dois heaps, dois volumes — não `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

A densidade em processo (compressão do isolado HTTP ) é [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Um cluster lógico em estado durável compartilhado é [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Erros regionais do Gemini dentro do Docker

O Google AI Studio / Gemini API pode retornar HTTP 400 com FAILED_PRECONDITION e
`User location is not supported for the API use.` Uma solicitação bem-sucedida no host
não comprova que o contêiner usa a mesma rota de saída. A ordenação de DNS, a
conectividade IPv4/IPv6, o roteamento de VPN e os proxies configurados podem ser diferentes. Consulte
[as regiões compatíveis do Google](https://ai.google.dev/gemini-api/docs/available-regions),
bem como a rota de conexão efetiva; esse erro, por si só, não indica uma chave de API inválida.

### Prefira um proxy específico por conexão

Use a [configuração de proxy por conexão](../ops/PROXY_GUIDE.md#4-level-proxy-system)
do OmniRoute para a conexão afetada do Gemini e, em seguida, repita **Test Connection** e uma pequena solicitação
com o mesmo modelo. Isso mantém a alteração de roteamento restrita a essa conexão. Verifique
se o proxy está acessível a partir do contêiner e se a conexão realmente o seleciona.
Alterar a rota não garante a elegibilidade regional no serviço upstream.

### Compare a rede do host e do contêiner

Mantenha a chave, o modelo e a solicitação idênticos ao comparar resultados autenticados; nunca
cole credenciais, senhas de proxy ou cabeçalhos de autorização completos em uma issue.
Primeiro, verifique quais famílias de endereços o resolvedor do sistema operacional oferece, usando o mesmo comando
no host e dentro do contêiner:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Substitua `omniroute` pelo serviço que você executa (por exemplo, `omniroute-web`). Esses
comandos exibem famílias de endereços sem credenciais nem endereços IP. Um `6` retornado
mostra apenas um resultado DNS IPv6: isso **não** comprova uma rota IPv6 utilizável nem acesso à API.
Onde `curl` estiver instalado, compare `curl -4 -I https://generativelanguage.googleapis.com`
com `curl -6 -I https://generativelanguage.googleapis.com` nos dois ambientes.
Uma resposta HTTP comprova a conectividade para esse teste, mesmo que seja um erro não autenticado;
somente a solicitação autenticada ao modelo testa a elegibilidade para o Gemini.

### Alternativa no nível do host: IPv6 funcional e política do resolvedor

O autor do relato em [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) restaurou
o acesso em seu ambiente habilitando IPv6 para contêineres e alterando a seleção de
endereços da glibc. Trate isso como uma alternativa específica do ambiente. Confirme o funcionamento do
IPv6 no host, a saída/o roteamento do contêiner e as regras de firewall antes de ajustar as preferências do resolvedor.
Um endereço ULA privado, por si só, não comprova conectividade IPv6 pública.

Para serviços que já estão conectados à rede padrão do Compose, este fragmento habilita
IPv6 nessa rede; mantenha o restante do serviço, das portas, dos volumes e da configuração:

```yaml
networks:
  default:
    enable_ipv6: true
```

Para uma rede nomeada, habilite-o na rede à qual o serviço realmente se conecta. O Docker pode
alocar uma sub-rede ULA; selecione uma sub-rede explícita e sem sobreposição apenas quando sua rede
exigir isso. Consulte [Redes IPv6 no Docker](https://docs.docker.com/engine/daemon/ipv6/)
e [Opções de rede do Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Em uma **imagem baseada em glibc**, `/etc/gai.conf` pode alterar a seleção de endereços. O Dockerfile
atual do repositório usa Debian; imagens personalizadas baseadas em musl não compartilham esse mecanismo.
O ajuste relatado altera o rótulo ULA de `label fc00::/7 6` para
`label fc00::/7 1`. Comece pela tabela de políticas completa da imagem e preserve suas outras
entradas: adicionar uma entrada `label` ou `precedence` substitui essa tabela padrão, portanto, um arquivo
contendo apenas a linha alterada é insuficiente. A
[referência de configuração da glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documenta essa semântica. Monte o arquivo revisado via bind mount, em modo somente leitura, em `/etc/gai.conf`
e recrie o serviço para aplicá-lo.

Isso altera a seleção de endereços do sistema operacional para **todo o tráfego de saída desse contêiner**.
Isso não força todos os aplicativos a escolherem IPv6: a ordem do DNS e a seleção de
conexão do Node também são importantes. Em particular, `--dns-result-order=ipv4first` dá preferência ao IPv4 e
não é uma solução para uma falha restrita ao IPv4. Consulte [Ordenação de DNS do Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Teste novamente o Gemini e seus outros provedores após qualquer alteração no nível do host. Para reverter,
remova a montagem personalizada de `gai.conf`, restaure a configuração de rede anterior e
recrie o serviço/a rede afetado durante uma janela de manutenção. Recriar uma rede
pode interromper outros contêineres conectados a ela; não exclua o volume de dados persistente.

## Observações importantes

- **Modo WAL do SQLite:** deve-se permitir que `docker stop` seja concluído para que o OmniRoute possa registrar as alterações mais recentes em `storage.sqlite` por meio de um checkpoint. Os arquivos do Compose incluídos já definem um período de tolerância de 40s para a parada. Se você executar a imagem diretamente, mantenha `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** defina como `true` se os backups de rotina/antes de gravações forem gerenciados externamente. As migrações de bancos de dados existentes ainda exigem um snapshot de segurança durável próprio e uma proteção contra migrações em massa.
- **Persistência de dados:** sempre monte um volume em `/app/data` para preservar seu banco de dados, suas chaves e configurações entre reinicializações do contêiner.
- **Configuração de porta:** substitua a variável de ambiente `PORT` para alterar a porta padrão `20128`.

## Veja também

- [Guia de implantação em VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuração de VM + nginx + Cloudflare
- [Guia de implantação no Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implantação no Fly.io
- [Configuração do ambiente](../reference/ENVIRONMENT.md) — Referência completa do `.env`
