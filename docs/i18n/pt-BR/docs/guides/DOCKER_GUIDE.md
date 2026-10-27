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

> **Quer fazer a auto-hospedagem com um único comando?** Consulte o
> [Guia de auto-hospedagem](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imagem publicada +
> Redis, acesso apenas por loopback, sem escolha de perfil). A execução rápida abaixo é o
> caminho de contêiner único para usuários que já executam o Redis em outro local.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Com arquivo de ambiente

```bash
# Primeiro, copie e edite o arquivo .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
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

O repositório inclui um Dockerfile multiestágio (`Dockerfile`). Quatro estágios são disponibilizados; escolha o `target` adequado para seu caso de uso.

| Estágio       | Imagem base           | Finalidade                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala as dependências (`npm ci --legacy-peer-deps`) e executa `npm run build` (Turbopack por padrão — consulte Recursos em tempo de build abaixo)                                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Ambiente de execução de produção com a saída standalone do Next.js. **Nenhuma CLI de provedor incluída.**                                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Adiciona `git`, `docker.io`, `docker-compose` e as CLIs globais: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Escolha este estágio para fluxos de trabalho agênticos.**                                                                                                                  |
| `runner-web`  | `runner-base`         | Adiciona o Playwright + um navegador Chromium (`--with-deps`) para provedores de sessão web: `gemini-web`, `claude-web`, `claude-turnstile`. **Escolha este estágio ao usar esses provedores** — a imagem comum falha durante a requisição sem ele (consulte a observação sobre `-web` em Canais de lançamento). |

Compile manualmente um target específico:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Recursos em tempo de build

Três argumentos de build controlam o custo do estágio `builder`. Eles se aplicam apenas ao tempo de build —
`OMNIROUTE_MEMORY_MB` (abaixo) é um parâmetro separado para o ambiente de execução.

| Argumento de build          | Padrão | Efeito                                                                                           |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` compila com webpack: menor pico de memória, mais lento. `1` habilita o Turbopack.            |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Limite de heap do V8 (`--max-old-space-size`) para o processo `next build` iniciado.             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Alimenta `CIRCLE_NODE_TOTAL`; o Next deriva `workers = N - 1` para a coleta de dados de páginas. |

`OMNIROUTE_BUILD_WORKERS` é o parâmetro que deve ser aumentado em um builder robusto e o
primeiro a ser investigado quando um build com recursos limitados falha **após**
`✓ Compiled successfully`. Cada worker de dados de páginas é um processo separado,
assim como o próprio processo pai `next build`; uma reprodução em uma VPS ativa
(issue #7518) mediu o pico de RSS de cada processo em ~4,5 GB, independentemente
da flag de heap `NODE_OPTIONS` (o Turbopack compila usando memória nativa/Rust
fora do heap do V8). O valor padrão de `2` (→ 1 worker, 2 processos no total) foi
dimensionado para os runners hospedados pelo GitHub com 16 GB / 4 vCPUs usados
pelo pipeline de publicação. Com `8` (→ 7 workers), esse runner ficou sem memória
e o buildkit encerrou a etapa com `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) ainda não coube quando o RSS por processo foi medido
diretamente, em vez de inferido. `tests/unit/docker-build-memory-budget.test.ts`
faz os cálculos com base no valor medido e falha se qualquer um dos parâmetros
ultrapassar a capacidade do runner.

O Turbopack compila usando memória nativa do Rust que fica **fora** do heap do V8,
portanto `OMNIROUTE_BUILD_MEMORY_MB` não a limita. Em um host com limite de memória,
o build é então encerrado com SIGKILL pelo OOM killer sem qualquer texto de erro —
ele simplesmente para durante `Creating an optimized production build`, o que
parece um travamento, e não falta de memória. É por isso que o `Dockerfile` usa
webpack por padrão (`OMNIROUTE_USE_TURBOPACK=0`), ao contrário de `npm run dev` /
`npm run build`, nos quais o Turbopack é o padrão no código: um simples
`docker build .` sem argumentos de build (o que a Railway e outros hosts de
implantação com um clique executam) não pode falhar silenciosamente em um builder
com limite de memória. As imagens publicadas já passam
`OMNIROUTE_USE_TURBOPACK=0` explicitamente em `docker-publish.yml`. Em um builder
com bastante RAM, habilite o Turbopack para obter um build mais rápido:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` está habilitado, portanto `next build` executa um processo pai
**e** um processo worker, e cada um respeita `OMNIROUTE_BUILD_MEMORY_MB`
separadamente. Defina o limite do contêiner acima de aproximadamente o dobro
desse valor, e não apenas uma vez esse valor.

Medições nesta árvore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limite do contêiner | Resultado                                   |
| --------- | ------------------- | ------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB      | encerrado por OOM em ambos, silenciosamente |
| webpack   | 8 GiB               | worker de build encerrado com SIGKILL       |
| webpack   | 12 GiB              | concluído, com pico de 11,1 GiB             |

### Padrões do ambiente de execução

Valores padrão exportados por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento da memória no Docker:

- A imagem define `OMNIROUTE_MEMORY_MB=1024` e deriva `NODE_OPTIONS=--max-old-space-size=1024` a partir dela.
- O processo real do servidor é iniciado pelo launcher standalone, que lê `OMNIROUTE_MEMORY_MB` e acrescenta `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- O Node usa o último valor repetido de `--max-old-space-size`, portanto, definir `OMNIROUTE_MEMORY_MB` controla o limite efetivo de heap no Docker.
- Como a imagem sempre define essa variável, o fallback do próprio launcher, calibrado de acordo com a RAM, nunca é aplicado no Docker. Aumente-a explicitamente de acordo com a carga de trabalho (tabela abaixo). `2048` ainda é insuficiente para `/v1/responses` de agentes de programação.

### RAM em tempo de execução para agentes de programação

O padrão de 1 GiB do Docker é um mínimo para o dashboard e chats leves, não um tamanho adequado para produção. Corpos longos de requisições `POST /v1/responses` (centenas de mensagens, dezenas de ferramentas) mantêm vários grafos na memória durante a compactação. Duas requisições simultâneas de aproximadamente 3 MiB / 750 mil tokens fizeram o V8 abortar com um old-space de **12 GiB** (`FATAL ERROR: Reached heap limit`) e também atingiram o OOM de um cgroup de 16 GiB. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensione a **`--memory` do cgroup acima do heap** — buffers nativos, SQLite e dados intermediários de compactação ficam fora do V8.

| Carga de trabalho                                      | `OMNIROUTE_MEMORY_MB`        | Contêiner / cgroup    | Observações                                                                                                   |
| ------------------------------------------------------ | ---------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| Dashboard, um chat leve                                | `1024` (padrão da imagem)    | ≥2 GiB                |                                                                                                               |
| Um agente de programação (Claude/Codex/Grok)           | `8192`                       | ≥10 GiB               | Sessão única típica de `/v1/responses`                                                                        |
| Duas requisições longas simultâneas de `/v1/responses` | `10240`–`12288`              | ≥12–16 GiB            | Abortagem do V8 medida com heap de aproximadamente 12 GiB                                                     |
| Três ou mais contextos longos simultâneos              | não use em um único processo | serializar / mais RAM | O limite padrão de admissão para cargas pesadas é 1 em andamento; aumentá-lo sem RAM causa o aborto novamente |

`omniroute serve` em bare metal calibra aproximadamente 35% da RAM (limitado ao intervalo `[512, 4096]`) quando `OMNIROUTE_MEMORY_MB` **não está definida**. O Docker sempre define `1024`, portanto essa calibração nunca é executada na imagem oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Proxy reverso em um subcaminho (Traefik / nginx)

O `basePath` do Next.js é compilado no bundle standalone. O OmniRoute registra o valor
incorporado em um arquivo sentinela na raiz do aplicativo (gravado durante `npm run build`;
lido por `scripts/docker/ensure-docker-base-path.mjs`) e o compara com
`OMNIROUTE_BASE_PATH` quando o contêiner é iniciado. Quando eles são diferentes e a imagem
foi criada para a raiz do domínio, o entrypoint reescreve os manifestos standalone, os
literais `basePath`/`assetPrefix` incorporados (o Next 16 renderiza URLs de assets SSR
apenas a partir de `assetPrefix` — o patcher replica o subcaminho nele), as URLs de assets
`/_next/static` incorporadas (manifestos de referência do cliente, importações de mídia,
páginas de erro pré-renderizadas) e o shim de `process.env` do cliente antes da execução
de `node dev/run-standalone.mjs`.

### Build com Compose (recomendado)

Defina ambas as variáveis em `.env` e, em seguida, refaça o build para que a imagem e o
ambiente de execução estejam alinhados:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

O `docker-compose.yml` encaminha `OMNIROUTE_BASE_PATH` como um argumento de build do
Docker e como uma variável de ambiente de execução.

### Imagem raiz pré-compilada + subcaminho em tempo de execução

As imagens publicadas `diegosouzapw/omniroute:*` são compiladas para a raiz do domínio.
Ainda é possível definir `OMNIROUTE_BASE_PATH` em tempo de execução; o contêiner aplica
o patch ao bundle uma vez durante a inicialização. Use-o junto com a origem pública
correspondente:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure o proxy reverso para encaminhar o caminho externo **completo** (não remova o
prefixo). O Traefik deve rotear `PathPrefix(`/omniroute`)` para o contêiner sem
`StripPrefix`, para que o Next.js receba `/omniroute/...` e forneça assets a partir de
`/omniroute/_next/...`.

O healthcheck do Docker consulta o endpoint leve de ciclo de vida `/healthz`, prefixado
com o `OMNIROUTE_BASE_PATH` ativo. `/api/monitoring/health` continua disponível para
diagnósticos humanos ou de dashboards; para fazer o HEALTHCHECK do contêiner voltar a
apontar para ele (por exemplo, para uma verificação aprofundada de integridade), defina
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esse caminho realiza uma verificação
**aprofundada** (banco de dados + resumo de monitoramento) — apropriada para o
`HEALTHCHECK` pouco frequente do Docker caso você opte por reativá-la, mas **não** para
os intervalos de `livenessProbe` do Kubernetes.

Para orquestradores (Kubernetes, Nomad etc.):

| Sonda              | Prefira                                                              | Evite                                                    |
| ------------------ | -------------------------------------------------------------------- | -------------------------------------------------------- |
| Atividade          | HTTP `GET /livez` ou TCP na porta principal (`PORT`, padrão `20128`) | `/api/monitoring/health` como verificação de atividade   |
| Prontidão          | HTTP `GET /healthz`                                                  | Timeouts curtos que tratem event loop ocupado como morto |
| Profunda / externa | `/api/monitoring/health`                                             | —                                                        |

`/healthz` informa o ciclo de vida do processo (`ok` / `starting` / `stopping`). `/livez`
verifica apenas se o processo está ativo (retorna 200 sempre que o handler consegue ser
executado; ele não aguarda a prontidão). Ambos ainda são executados no mesmo event loop
do Node usado para processar requisições, portanto trabalhos de catálogo ou compactação
limitados pela CPU podem atrasá-los — ocupado ≠ morto. Prefira uma verificação de
atividade via TCP se as sondas HTTP expirarem. Orientações completas sobre sondas:
[Guia de monitoramento — recomendações de sondas do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose com Caddy (HTTPS com TLS automático)

O OmniRoute pode ser exposto com segurança usando o provisionamento automático de SSL do Caddy. Certifique-se de que o registro A de DNS do seu domínio aponte para o IP do seu servidor.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origem voltada ao navegador para callbacks de OAuth, links do painel e URLs públicas geradas.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interna entre servidores para tarefas agendadas / autorrequisições.
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

O Caddy define os cabeçalhos padrão de encaminhamento para o contêiner upstream. O OmniRoute usa
`NEXT_PUBLIC_BASE_URL` como a origem pública canônica para callbacks de OAuth e links públicos
gerados; as operações de gravação autenticadas no painel usam solicitações de mesma origem, além de proteção CSRF
vinculada à sessão. Habilite `OMNIROUTE_TRUST_PROXY` somente em implantações avançadas nas quais você deseja intencionalmente
que o OmniRoute derive a origem pública de cabeçalhos encaminhados confiáveis em vez de uma configuração
explícita.

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

| Imagem                   | Tag      | Tamanho | Descrição                                                |
| ------------------------ | -------- | ------- | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Maior SemVer estável **publicada** (não o `main` do git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Fixe essa classe de tag para GitOps                      |

Manifesto multiplataforma: `linux/amd64` + `linux/arm64` nativos (Apple Silicon, AWS Graviton, Raspberry Pi). O Docker seleciona automaticamente a arquitetura correspondente; informe `--platform linux/amd64` se precisar forçar a emulação AMD64 em hosts ARM.

### Canais de lançamento

O OmniRoute publica canais Docker separados para versões estáveis, testes do branch de lançamento ativo e builds de desenvolvimento.

| Canal                           | Origem                             | Mutabilidade                        | Uso recomendado                                                                                                                           |
| ------------------------------- | ---------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versão assinada/versionada         | Imutável                            | Implantações em produção que fixam uma versão exata                                                                                       |
| `:latest` / `:latest-web`       | Maior SemVer estável **publicada** | Ponteiro estável mutável            | Acompanha versões estáveis **após** uma tarefa de publicação SemVer — **não** acompanha o `main` nem commits não lançados de `release/v*` |
| `:next` / `:next-web`           | Branch `release/v*` padrão atual   | Ponteiro de pré-lançamento mutável  | Testes de correções que chegaram ao branch de lançamento ativo, mas que ainda não fazem parte de uma versão estável                       |
| `:main` / `:main-web`           | Branch `main`                      | Ponteiro de desenvolvimento mutável | Somente para desenvolvimento e testes de integração                                                                                       |

#### Provedores de sessão web: as imagens `-web`

Cada canal acima também está disponível como uma tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), criada a partir do estágio `runner-web` — a mesma imagem, acrescida do Playwright e de um navegador Chromium. A imagem padrão é fornecida **sem** o Chromium; `gemini-web`, `claude-web` e `claude-turnstile` precisam dele.

A falha é adiada e não ocorre durante a inicialização: esses provedores listam seus modelos e aparecem como conectados no painel, e somente a primeira solicitação falha com

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Se você usa esses provedores, baixe a tag `-web` do canal que já está utilizando — nada mais muda. Em uma instalação via npm/CLI (sem imagem Docker), o componente equivalente ausente é o binário do navegador: execute `npx playwright install chromium` no host.

#### Como usar o canal de pré-lançamento

O canal `next` é reconstruído a cada push para a branch `release/v*` padrão atual e é publicado para AMD64 e ARM64. Branches de manutenção mais antigas não podem sobrescrevê-lo. O canal fornece uma imagem que pode ser baixada contendo correções que foram mescladas à branch de release ativa antes da criação da próxima tag estável.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para o Docker Compose, substitua a tag da imagem usada pelo perfil selecionado e, em seguida, baixe a imagem e recrie o serviço:

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

`next` é um canal flutuante de pré-lançamento. Ele pode mudar a cada push para a branch de release ativa e **não é compatível com uso em produção**. Fixe o digest da imagem ao avaliar uma compilação específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de testar, faça backup do volume de dados do OmniRoute ou do diretório de dados montado por bind. Para reverter, restaure a versão estável ou o digest usado anteriormente e recrie o contêiner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Uma compilação da branch de release nunca pode atualizar `latest`; somente uma versão semântica estável elegível pode promover o ponteiro estável. As imagens `next` mantêm a inspeção da imagem de release e o bloqueio em caso de vulnerabilidades CRITICAL.

**`latest` não é uma garantia de atualidade em relação ao git.** As correções mescladas em `main` ou na branch `release/v*` ativa **não** estão em `:latest` até que uma imagem SemVer estável seja publicada e o job de publicação promova `:latest` (com o mesmo digest dessa versão SemVer). Se `latest` parecer congelada enquanto o GitHub já mostrar a correção, baixe `:next` para testar a branch de release ou aguarde a tag SemVer.

| O que você deseja                                                             | Use                                   |
| ----------------------------------------------------------------------------- | ------------------------------------- |
| GitOps/produção que não pode sofrer alterações inesperadas                    | Fixe `:X.Y.Z` (ou o digest da imagem) |
| Acompanhar versões estáveis publicadas e aceitar uma recriação a cada release | `:latest`                             |
| Testar commits não lançados de `release/v*`                                   | `:next` (não usar em produção)        |
| Testar `main`                                                                 | `:main` (não usar em produção)        |

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

## Disponibilidade: o SQLite padrão usa uma única réplica

A configuração padrão do OmniRoute no Docker/Kubernetes consiste em **um processo Node + um gravador SQLite**. A alta disponibilidade **não é compatível** com essa topologia.

| Restrição                                                   | Consequência                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gravador único                                              | **Não** execute várias réplicas usando o mesmo arquivo SQLite. Isso corrompe o banco de dados.                                                                                                                                                                                                                                                                         |
| Recriação / reinicialização / encerramento pelo HEALTHCHECK | **Indisponibilidade total** de SSEs em andamento, sessões do dashboard e estado na memória. Todos os clientes conectados são desconectados. Novas solicitações durante o período sem endpoints recebem do proxy reverso **`502 Bad Gateway: Unknown error`**, não um JSON do OmniRoute — os clientes não conseguem diferenciar isso de uma falha do provedor (#11015). |
| Mesmo loop de eventos que `/healthz`                        | Um ciclo ocupado de catálogo ou compactação pode atrasar as sondagens; um timeout curto reinicia então a **única** réplica.                                                                                                                                                                                                                                            |

**Matriz de sondagens** (consulte também [Recomendações de sondagens do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sondagem          | Alvo                                                      | Não usar                                                           |
| ----------------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| Atividade         | TCP em `PORT` (padrão `20128`) ou HTTP leve em `/healthz` | `/api/monitoring/health`                                           |
| Prontidão         | HTTP `GET /healthz`                                       | Timeouts curtos que tratem um loop de eventos ocupado como inativo |
| Profunda / humana | `/api/monitoring/health`                                  | Atividade automatizada do kubelet                                  |

**Atualizações:** espere que todas as sessões sejam encerradas. Drene os clientes, se possível; não há atualização contínua com o SQLite padrão. A combinação de `restart: unless-stopped` no Compose com o `HEALTHCHECK` do Docker também substituirá o único processo quando o contêiner estiver Unhealthy — com o mesmo impacto.

Trecho do Kubernetes para uma **única réplica** (Recreate é obrigatório; não aumente `replicas` usando um único arquivo SQLite):

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

A espera de `preStop` permite que o kube remova os endpoints do Service antes do SIGTERM, para que o tráfego **novo** pare de chegar ao processo que está sendo encerrado. O SSE de `/v1/responses` em andamento é drenado por até `SHUTDOWN_TIMEOUT_MS` (padrão de 30s) por meio de leases de admissão heavyweight (#11015). Novas solicitações que ainda chegam ao processo recebem `503` + `Retry-After: 5`. O intervalo sem endpoints causado por Recreate até que a substituição esteja Ready continua sendo uma indisponibilidade total — isso é uma característica da topologia SQLite, não uma configuração incorreta de probe.

Postgres externo / HA multi-writer **não** é um caminho padrão documentado. Se você precisa de HA, mantenha uma única réplica ou execute uma topologia que o projeto tenha testado e documentado separadamente. O trabalho relacionado a Postgres/MySQL está em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Até que isso seja disponibilizado, a única maneira compatível de multiplicar a capacidade de `/v1/responses` **grandes** é usar N processos independentes (próxima seção), e não `replicas > 1` em um único volume.

## Escalonamento horizontal: N processos independentes

Um processo Node corresponde a **um heap V8**. Duas solicitações simultâneas de agente de programação `POST /v1/responses` (RTK + Caveman), com ~3 MiB / ~750 mil tokens cada, fazem esse heap abortar em ~12 Gi (`FATAL ERROR: Reached heap limit`) e podem causar OOM em um cgroup de 16 Gi. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Essa medição é um alerta de **orçamento de memória**, não um máximo rígido do produto de duas solicitações longas simultâneas a `/v1/responses`. A admissão de chats pesados é controlada por um orçamento de bytes de entrada derivado automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionado com base nesse mesmo limite do V8/cgroup — aumentá-lo manualmente (ou definir o limite legado por contagem de solicitações `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) em um processo já dimensionado reintroduz o abortamento. Chats pequenos, `/healthz`, `/v1/models` e MCP **não** fazem parte desse limite.

### Um processo: mais de duas solicitações longas a `/v1/responses`

Um processo **saudável** (heap abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, padrão `0.75`) **pode** executar mais de duas solicitações longas simultâneas `POST /v1/responses` quando ainda houver espaço no orçamento de bytes em trânsito de todo o processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Corpos com tamanho igual ou superior a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (padrão de 256 KiB) adquirem a mesma concessão para cargas pesadas que solicitações estruturalmente pesadas e usam a mesma rota de escape `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dezenas de clientes SSE longos simultâneos (operadores frequentemente precisam de 40–50) são uma questão de **orçamento de memória** — dimensione o heap + os slots primários/de margem + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — e não um limite rígido do produto de “no máximo 2”. Um heap sob pressão ainda rejeita solicitações com um `503` que permite nova tentativa, para que o problema #7849 não retorne.

Para **multiplicar heaps** (old-spaces V8 independentes) **hoje**:

| Faça                                                                                                                                                                                 | Não faça                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Execute **N contêineres/pods**, cada um com seu **próprio** `DATA_DIR` / volume                                                                                                      | Defina `replicas > 1` apontando para um único arquivo SQLite         |
| Dimensione solicitações pesadas em trânsito + margem saudável conforme o heap / orçamento de bytes em trânsito; 1–2 é o padrão conservador do #7849, não um máximo rígido do produto | Forneça a um processo 8× mais RAM e um limite de contagem irrestrito |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para **contadores de cota compartilhados**                                                                            | Trate o Redis como SQLite compartilhado — ele não é isso             |
| Duplique os segredos dos provedores em cada instância (ou aceite painéis particionados)                                                                                              | Espere um único painel / registro de chamadas entre instâncias       |
| Coloque qualquer balanceador de carga na frente; afinidade por chave de API ou sessão é suficiente                                                                                   | Exija um middleware específico de fornecedor sensível ao tamanho     |

Hardware: a quantidade de solicitações longas simultâneas a `/v1/responses` por instância é uma questão de **orçamento de memória** (heap + bytes em trânsito / #10110). `N` valores independentes de `DATA_DIR` ainda multiplicam os heaps: a RAM do host deve comportar `N × cgroup`, e não “um pod de 16 Gi com N=8”. Nunca use `replicas > 1` com um único arquivo SQLite.

Exemplo de Compose (dois heaps, dois volumes — não `deploy.replicas: 2`):

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

A densidade dentro do processo (compressão fora do isolate HTTP) está em [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Um cluster lógico em estado durável compartilhado está em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
