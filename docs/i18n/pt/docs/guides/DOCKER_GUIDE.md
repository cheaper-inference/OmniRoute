# 🐳 Docker Guide — OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referência completa para a implementação com Docker. Para um início rápido, consulte a [secção sobre Docker no README](../README.md#-docker).

## Índice

- [Execução rápida](#quick-run)
- [Com ficheiro de ambiente](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Perfis disponíveis](#available-profiles)
- [Configurar ferramentas CLI do anfitrião quando o OmniRoute é executado no Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Contentor auxiliar Redis](#redis-sidecar)
- [Compose para produção](#production-compose)
- [Etapas do Dockerfile](#dockerfile-stages)
- [Variáveis de ambiente críticas](#critical-environment-variables)
- [Docker Compose com Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Túnel rápido do Cloudflare](#cloudflare-quick-tunnel)
- [Etiquetas de imagem](#image-tags)
- [Atualizações do dashboard no Docker](#dashboard-updates-in-docker)
- [Disponibilidade: o SQLite predefinido utiliza uma única réplica](#availability-default-sqlite-is-single-replica)
- [Erros regionais do Gemini no Docker](#gemini-regional-errors-inside-docker)
- [Notas importantes](#important-notes)

---

## Execução rápida

> **Pretende alojar o serviço por conta própria com um único comando?** Consulte o
> [Guia de alojamento próprio](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imagem publicada +
> Redis, apenas em loopback, sem escolha de perfil). A execução rápida abaixo é a
> opção de contentor único para utilizadores que já executam o Redis noutro local.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Com ficheiro de ambiente

```bash
# Primeiro, copie e edite o .env
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
# Perfil base (sem ferramentas CLI)
docker compose --profile base up -d

# Perfil CLI (Claude Code, Codex e OpenClaw integrados)
docker compose --profile cli up -d

# Perfil do anfitrião (concebido principalmente para Linux; monta os binários CLI do anfitrião em modo só de leitura)
docker compose --profile host up -d

# Perfil Web (Chromium/Playwright para fornecedores baseados em sessões Web)
docker compose --profile web up -d

# Combinar CLI + contentor auxiliar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Perfis disponíveis

O OmniRoute inclui perfis do Compose para as principais configurações de implementação. Escolha aquele que corresponde ao seu ambiente.

| Perfil               | Serviço          | Quando utilizar                                                                                                                                                      | Comando                                      |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predefinido) | `omniroute-base` | Servidor sem interface gráfica / ambiente de execução mínimo, sem CLIs de fornecedores incluídas                                                                     | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Fluxos de trabalho com agentes que executam `omniroute providers/setup/doctor` e CLIs incluídas (Codex, Claude Code, Droid, OpenClaw)                                | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Anfitriões Linux que pretendem acesso semelhante a `network_mode` às CLIs do anfitrião, montando `~/.local/bin`, `~/.codex`, `~/.claude`, etc. em modo só de leitura | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Executar o contentor auxiliar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porta `8317` para encaminhamento proxy para CLIs a montante             | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Fornecedores baseados em sessões Web que necessitam de um navegador: `gemini-web`, `claude-web`, `claude-turnstile` (compila `runner-web`, com Chromium incluído)    | `docker compose --profile web up -d`         |

> É possível combinar vários perfis: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurar ferramentas CLI do anfitrião quando o OmniRoute é executado no Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` e o botão
**Guardar configuração** do painel escrevem ficheiros como `~/.codex/*.config.toml`. Esses caminhos
só têm significado na máquina onde a CLI é efetivamente executada. Se os executar dentro
do contentor, a escrita será feita no diretório pessoal do próprio contentor (`/home/node` —
a imagem é executada com `USER node`), onde nenhuma CLI do anfitrião irá alguma vez ler esses ficheiros e onde estes são
eliminados assim que o contentor for recriado.

O OmniRoute deteta esta situação e recusa a escrita, apresentando instruções em vez de
comunicar um sucesso que não pode utilizar: a CLI termina com `2` e a API responde com `422`
e `containerEphemeralTarget: true`.

### Recomendado: executar a CLI no anfitrião e o OmniRoute no Docker

O contentor disponibiliza a API; a CLI configura as ferramentas do anfitrião.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # direcionar a CLI para o contentor
omniroute setup-codex                      # escreve no verdadeiro ~/.codex do anfitrião
```

Esta é a opção correta quando o Codex, Claude Code, Cursor ou ferramentas semelhantes são executados no seu
computador portátil — que é a configuração habitual.

### Alternativa: montar os diretórios de configuração do anfitrião através de bind mount (perfil `host`)

Se pretender que o próprio contentor escreva na configuração do anfitrião, monte os
diretórios e aponte `CLI_CONFIG_HOME` para a raiz da montagem. O perfil `host`
já faz isto:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

É o bind mount que torna o caminho fiável: o OmniRoute lê
`/proc/self/mountinfo` e permite escritas em caminhos montados (e em diretórios
cujos subdiretórios sejam montagens, que corresponde exatamente à estrutura de `/host-home` acima), ao mesmo tempo que
continua a recusar caminhos não montados.

### Alternativa de recurso: configurar as próprias CLIs do contentor (utilize com moderação)

Quando as CLIs residem realmente dentro do contentor (o perfil `cli`), a escrita
é intencional. Passe `--allow-container-write` a qualquer comando `setup-*` ou defina
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para o servidor. A escrita é efetuada
com um aviso de que não irá persistir após o fim do contentor.

> **Aviso de segurança — perfil `cli` + montagem de `docker.sock`.**
> O perfil `cli` monta `/var/run/docker.sock` através de bind mount para que o atualizador
> automático dentro do contentor possa recriar a stack através do daemon do anfitrião
> (`src/lib/system/autoUpdate.ts` verifica a existência desse socket e ignora o
> caminho do Docker quando este está ausente). Esse socket é **uma fronteira de confiança
> com privilégios de root no anfitrião**: tudo o que conseguir aceder-lhe controla o daemon Docker do anfitrião como
> root — pode criar, inspecionar, parar e remover qualquer contentor no anfitrião.
> Implicações:
>
> 1. **Nunca exponha a porta do perfil `cli` à rede.** Publique-a
>    em `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — um perfil `cli` acessível pela LAN transforma qualquer RCE ao nível do painel num
>    comprometimento total do anfitrião.
> 2. **Não monte quaisquer diretórios adicionais do anfitrião no perfil `cli`.**
>    O socket do Docker, em conjunto com qualquer montagem adicional, concede ao contentor acesso total de
>    leitura/escrita ao sistema de ficheiros e à configuração do anfitrião. Se precisar que uma ferramenta
>    aceda a um projeto, execute-a localmente com o binário da CLI — não a monte
>    no contentor `cli`.
>
> Se não precisar da atualização automática dentro do contentor, não ative o perfil `cli`
> (`COMPOSE_PROFILES=core,redis` ou uma variante mais curta). Os restantes perfis não
> montam o socket do Docker.
>
> Consulte `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) para conhecer o modelo de ameaças relacionado
> com MITM, e `docs/security/SUPPLY_CHAIN.md` para conhecer a cadeia de proveniência dos binários
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

O OmniRoute depende do Redis para suportar o limitador de taxa distribuído e a cache partilhada. O serviço `redis` está **sempre definido** em `docker-compose.yml` (não está condicionado por nenhum perfil) e é iniciado juntamente com qualquer outro perfil.

| Detalhe                              | Valor                                         |
| ------------------------------------ | --------------------------------------------- |
| Imagem                               | `redis:7-alpine`                              |
| Nome do contentor                    | `omniroute-redis`                             |
| Porta interna                        | `6379`                                        |
| Porta do anfitrião (substituição)    | `REDIS_PORT` (predefinição: `6379`)           |
| Endereço do anfitrião (substituição) | `REDIS_BIND_HOST` (predefinição: `127.0.0.1`) |
| Volume                               | `omniroute-redis-data` → `/data`              |
| Verificação de estado                | `redis-cli ping` (intervalo de 10 s)          |

Variáveis de ambiente relacionadas:

- `REDIS_URL` — cadeia de ligação injetada na aplicação (`redis://redis:6379` por predefinição).
- `REDIS_PORT` — mapeamento da porta do anfitrião para o contentor Redis.
- `REDIS_BIND_HOST` — interface do anfitrião na qual a porta é publicada. A predefinição é `127.0.0.1`.

> **Porquê a interface de loopback por predefinição:** o sidecar é executado sem `requirepass`, e os contentores
> da aplicação acedem-lhe através da rede do Compose (`redis:6379`) — a porta publicada existe
> apenas para ferramentas executadas no anfitrião (`redis-cli`, um `npm run dev` local). A publicação em
> `0.0.0.0` exporia um Redis sem autenticação a todos os anfitriões na sua LAN. Se definir
> `REDIS_BIND_HOST=0.0.0.0`, adicione também `--requirepass` ao `command:` do serviço.

**Não é recomendado desativar o Redis** (o limitador de taxa passará a utilizar o mecanismo alternativo em memória). Se for necessário, remova/comente o bloco do serviço `redis:` em `docker-compose.yml` ou reduza a sua escala para zero:

```bash
docker compose up -d --scale redis=0
```

## Compose de produção

Para obter um snapshot de produção isolado executado em paralelo com o ambiente de desenvolvimento, utilize `docker-compose.prod.yml`.

| Detalhe                        | Valor                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| Ficheiro                       | `docker-compose.prod.yml`                                                                     |
| Porta predefinida do dashboard | `PROD_DASHBOARD_PORT=20130` (mapeada para a porta interna `${DASHBOARD_PORT:-20128}`)         |
| Porta predefinida da API       | `PROD_API_PORT=20131`                                                                         |
| Imagem                         | `omniroute:prod` (criada a partir do alvo `runner-cli`)                                       |
| Contentor Redis                | `omniroute-redis-prod` (`redis:8.6.2`, volume dedicado `redis-prod-data`)                     |
| Volume de dados                | `omniroute-prod-data` (com nome, persistente entre reconstruções)                             |
| Verificações de estado         | `node healthcheck.mjs` + `redis-cli ping`, com `depends_on` condicionado pelo estado do Redis |

Como utilizar:

```bash
# Criar e iniciar a stack de produção
docker compose -f docker-compose.prod.yml up -d --build

# Acompanhar os registos
docker compose -f docker-compose.prod.yml logs -f

# Parar e remover a stack (manter os volumes)
docker compose -f docker-compose.prod.yml down
```

A stack de produção é executada em paralelo com o Compose de desenvolvimento (nomes de contentores, portas e volumes diferentes), permitindo-lhe continuar a iterar localmente enquanto o ambiente de produção permanece em execução.

## Fases do Dockerfile

O repositório inclui um Dockerfile multifase (`Dockerfile`). Estão disponíveis quatro fases; escolha o `target` adequado ao seu caso de utilização.

| Fase          | Imagem base           | Finalidade                                                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala as dependências (`npm ci --legacy-peer-deps`) e executa `npm run build` (Turbopack por predefinição — consulte Recursos de compilação abaixo)                                                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Ambiente de execução de produção com a saída autónoma do Next.js. **Não inclui CLIs de fornecedores.**                                                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | Adiciona `git`, `docker.io`, `docker-compose` e as CLIs globais: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Escolha esta opção para fluxos de trabalho com agentes.**                                                                                                                                       |
| `runner-web`  | `runner-base`         | Adiciona o Playwright e um navegador Chromium (`--with-deps`) para fornecedores de sessões Web: `gemini-web`, `claude-web`, `claude-turnstile`. **Escolha esta opção quando utilizar esses fornecedores** — a imagem simples falha ao processar pedidos sem estes componentes (consulte a nota sobre `-web` em Canais de lançamento). |

Compile manualmente um `target` específico:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Recursos de compilação

Três argumentos de compilação controlam os recursos consumidos pela fase `builder`. Aplicam-se apenas durante a compilação —
`OMNIROUTE_MEMORY_MB` (abaixo) é um parâmetro separado de execução.

| Argumento de compilação     | Predefinição | Efeito                                                                                        |
| --------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` compila com webpack: menor pico de memória, mas mais lento. `1` ativa o Turbopack.        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | Limite da heap do V8 (`--max-old-space-size`) para o `next build` iniciado.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Alimenta `CIRCLE_NODE_TOTAL`; o Next deriva `workers = N - 1` para recolher dados de páginas. |

`OMNIROUTE_BUILD_WORKERS` é o valor a aumentar num sistema de compilação potente e o
valor a considerar quando uma compilação com recursos limitados falha **depois de**
`✓ Compiled successfully`. Cada worker de dados de páginas é um processo separado,
tal como o próprio processo principal `next build`; uma reprodução num VPS ativo
(problema #7518) mediu o pico de RSS de cada processo em ~4,5 GB, independentemente
da opção de heap `NODE_OPTIONS` (o Turbopack compila em memória nativa/Rust fora da
heap do V8). A predefinição de `2` (→ 1 worker, 2 processos no total) está dimensionada
para os runners alojados pelo GitHub, com 16 GB/4 vCPU, utilizados pelo pipeline de
publicação. Com `8` (→ 7 workers), esse runner ficou sem memória e o buildkit fez a
etapa falhar com `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 workers)
continuou a não caber depois de o RSS por processo ter sido medido diretamente em
vez de inferido. `tests/unit/docker-build-memory-budget.test.ts` efetua os cálculos
com base no valor medido e falha se qualquer um dos parâmetros exceder a capacidade
do runner.

O Turbopack compila em memória Rust nativa que reside **fora** da heap do V8, pelo que
`OMNIROUTE_BUILD_MEMORY_MB` não a limita. Num anfitrião com um limite de memória, a
compilação é então terminada com SIGKILL pelo OOM killer sem qualquer texto de erro —
simplesmente para a meio de `Creating an optimized production build`, o que parece um
bloqueio em vez de falta de memória. É por isso que o `Dockerfile` utiliza webpack
por predefinição (`OMNIROUTE_USE_TURBOPACK=0`), ao contrário de `npm run dev` /
`npm run build`, onde o Turbopack é a predefinição no código: um simples
`docker build .` sem argumentos de compilação (o que o Railway e outros anfitriões
com implementação num só clique executam) não pode falhar silenciosamente num
sistema de compilação com memória limitada. As imagens publicadas já passam
explicitamente `OMNIROUTE_USE_TURBOPACK=0` em `docker-publish.yml`. Num sistema de
compilação com bastante RAM, ative o Turbopack para obter uma compilação mais rápida:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` está ativado, pelo que `next build` executa um processo principal
**e** um processo worker, e cada um respeita `OMNIROUTE_BUILD_MEMORY_MB` separadamente.
Dimensione o limite do contentor para um valor superior a aproximadamente o dobro
desse valor, não apenas uma vez.

Valores medidos nesta árvore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Empacotador | Limite do contentor | Resultado                                  |
| ----------- | ------------------- | ------------------------------------------ |
| Turbopack   | 8 GiB / 16 GiB      | Terminado por OOM em ambos, sem aviso      |
| webpack     | 8 GiB               | Worker de compilação terminado por SIGKILL |
| webpack     | 12 GiB              | Bem-sucedido, com um pico de 11,1 GiB      |

### Predefinições de execução

Predefinições exportadas por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento da memória no Docker:

- A imagem define `OMNIROUTE_MEMORY_MB=1024` e deriva `NODE_OPTIONS=--max-old-space-size=1024` a partir desse valor.
- O processo real do servidor é iniciado pelo iniciador autónomo, que lê `OMNIROUTE_MEMORY_MB` e acrescenta `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- O Node utiliza o último valor repetido de `--max-old-space-size`, pelo que definir `OMNIROUTE_MEMORY_MB` controla o limite efetivo da heap no Docker.
- Como a imagem define sempre este valor, o mecanismo de contingência do iniciador, calibrado com base na RAM, nunca é aplicado no Docker. Aumente-o explicitamente de acordo com a carga de trabalho (tabela abaixo). `2048` continua a ser demasiado pequeno para `/v1/responses` de agentes de programação.

### RAM de execução para agentes de programação

A predefinição de 1 GiB do Docker é um valor mínimo para o painel e conversas ligeiras, não uma configuração para produção. Corpos extensos de pedidos `POST /v1/responses` (centenas de mensagens, dezenas de ferramentas) mantêm vários grafos em memória durante a compressão. Dois pedidos sobrepostos de ~3 MiB / ~750 mil tokens provocaram o encerramento do V8 com uma old-space de **12 GiB** (`FATAL ERROR: Reached heap limit`) e também atingiram um OOM de cgroup com 16 GiB. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensione a **`--memory` do cgroup acima da heap** — os buffers nativos, o SQLite e os dados intermédios da compressão residem fora do V8.

| Carga de trabalho                            | `OMNIROUTE_MEMORY_MB`           | Contentor / cgroup    | Notas                                                                                                                        |
| -------------------------------------------- | ------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Painel, uma conversa ligeira                 | `1024` (predefinição da imagem) | ≥2 GiB                |                                                                                                                              |
| Um agente de programação (Claude/Codex/Grok) | `8192`                          | ≥10 GiB               | Sessão individual típica de `/v1/responses`                                                                                  |
| Dois `/v1/responses` longos em simultâneo    | `10240`–`12288`                 | ≥12–16 GiB            | Encerramento do V8 medido com uma heap de ~12 GiB                                                                            |
| Três ou mais contextos longos em simultâneo  | não executar num único processo | serializar / mais RAM | Por predefinição, a admissão de cargas pesadas permite 1 pedido em curso; aumentá-la sem RAM volta a provocar o encerramento |

`omniroute serve` em bare metal efetua a calibração para ~35% da RAM (limitada ao intervalo `[512, 4096]`) quando `OMNIROUTE_MEMORY_MB` **não está definida**. O Docker define sempre `1024`, pelo que essa calibração nunca é executada na imagem oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variáveis de Ambiente Críticas

Além das predefinições documentadas em [ENVIRONMENT.md](../reference/ENVIRONMENT.md), as seguintes variáveis são as mais importantes ao executar em Docker:

| Variável                      | Finalidade                                                                                                                                                                                                                                                                 | Predefinição                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Segredo partilhado para a ponte WebSocket. **Obrigatório em produção** — defina-o como uma cadeia aleatória forte.                                                                                                                                                         | não definido (tem de ser fornecido) |
| `REDIS_URL`                   | Cadeia de ligação para o limitador de frequência/backend de cache                                                                                                                                                                                                          | `redis://redis:6379`                |
| `REDIS_PORT`                  | Porta do anfitrião para o contentor Redis incluído                                                                                                                                                                                                                         | `6379`                              |
| `REDIS_BIND_HOST`             | Interface do anfitrião na qual é publicada a porta do Redis incluído (loopback, exceto se adicionar AUTH)                                                                                                                                                                  | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Caminho no anfitrião montado no perfil `cli` em `/workspace/omniroute` para fluxos de trabalho de atualização automática                                                                                                                                                   | `.` (diretório atual)               |
| `OMNIROUTE_MEMORY_MB`         | Limite máximo da heap do Node em tempo de execução para o servidor autónomo em Docker; substitui a predefinição da imagem indicada acima. Agentes de programação: `8192`+ (consulte [RAM em tempo de execução](#runtime-ram-for-coding-agents)).                           | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Substitui as portas expostas do painel (20128) e da API (20129)                                                                                                                                                                                                            | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Interface do anfitrião na qual o docker-compose publica as portas do painel/API/WS em direto. Com `REQUIRE_API_KEY=false` (a predefinição), `0.0.0.0` expõe o proxy `/v1` anónimo à LAN — apenas alargue o acesso com `REQUIRE_API_KEY=true` ou um proxy inverso à frente. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Interface do anfitrião na qual o docker-compose publica o sidecar `cliproxyapi` — o respetivo volume de dados contém as credenciais dos fornecedores.                                                                                                                      | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Diretório que o analisador de plugins em tempo de execução lê e onde instala os plugins. Defina-o quando os plugins forem montados por bind: a predefinição segue `HOME`, que uma imagem não tem de exportar.                                                              | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Subcaminho do URL quando a aplicação é publicada através de um proxy inverso (por exemplo, `/omniroute`)                                                                                                                                                                   | _(vazio = raiz)_                    |
| `NEXT_PUBLIC_BASE_URL`        | Origem pública do browser, incluindo o subcaminho (por exemplo, `https://host/omniroute`)                                                                                                                                                                                  | não definido                        |
| `PROD_DASHBOARD_PORT`         | Porta do painel no anfitrião para `docker-compose.prod.yml`                                                                                                                                                                                                                | `20130`                             |
| `CLIPROXYAPI_PORT`            | Porta do anfitrião para o sidecar `cliproxyapi`                                                                                                                                                                                                                            | `8317`                              |

## Proxy inverso num subcaminho (Traefik / nginx)

O `basePath` do Next.js é compilado no pacote autónomo. O OmniRoute regista o valor
incorporado num ficheiro sentinela na raiz da aplicação (escrito durante `npm run build`;
lido por `scripts/docker/ensure-docker-base-path.mjs`) e compara-o com
`OMNIROUTE_BASE_PATH` quando o contentor é iniciado. Quando são diferentes e a imagem
foi criada para a raiz do domínio, o ponto de entrada reescreve os manifestos autónomos,
os literais `basePath`/`assetPrefix` incorporados (o Next 16 produz os URLs de recursos
SSR apenas a partir de `assetPrefix` — o corretor replica o subcaminho nesse valor), os
URLs de recursos `/_next/static` incorporados (manifestos de referências do cliente,
importações de multimédia, páginas de erro pré-renderizadas) e o shim de
`process.env` do cliente antes da execução de `node dev/run-standalone.mjs`.

### Compilação com o Compose (recomendado)

Defina ambas as variáveis em `.env` e, em seguida, volte a compilar para que a imagem e
o ambiente de execução fiquem em conformidade:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

O `docker-compose.yml` encaminha `OMNIROUTE_BASE_PATH` como argumento de compilação do
Docker e como variável de ambiente de execução.

### Imagem de raiz pré-compilada + subcaminho em tempo de execução

As imagens `diegosouzapw/omniroute:*` publicadas são compiladas para a raiz do domínio.
Ainda pode definir `OMNIROUTE_BASE_PATH` em tempo de execução; o contentor corrige o
pacote uma vez durante o arranque. Utilize-o em conjunto com a origem pública
correspondente:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure o proxy inverso para encaminhar o caminho externo **completo** (não remova o
prefixo). O Traefik deve encaminhar `PathPrefix(`/omniroute`)` para o contentor sem
`StripPrefix`, para que o Next.js receba `/omniroute/...` e disponibilize os recursos a
partir de `/omniroute/_next/...`.

A verificação de estado do Docker consulta o endpoint de ciclo de vida simplificado
`/healthz`, prefixado com o `OMNIROUTE_BASE_PATH` ativo.
`/api/monitoring/health` continua disponível para diagnósticos humanos ou de painéis;
para fazer com que o HEALTHCHECK do contentor volte a utilizá-lo (por exemplo, para
impor uma verificação de estado aprofundada), defina
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esse caminho é uma verificação
**aprofundada** (BD + resumo da monitorização) — adequada para o `HEALTHCHECK` pouco
frequente do Docker, caso opte por voltar a utilizá-la, mas **não** para intervalos de
`livenessProbe` do Kubernetes.

Para orquestradores (Kubernetes, Nomad, etc.):

| Sonda                 | Preferir                                                                       | Evitar                                                                   |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Disponibilidade       | HTTP `GET /livez` ou TCP na porta principal (`PORT`, predefinida como `20128`) | `/api/monitoring/health` como verificação de disponibilidade             |
| Prontidão             | HTTP `GET /healthz`                                                            | Tempos limite curtos que tratem um ciclo de eventos ocupado como inativo |
| Aprofundada / externa | `/api/monitoring/health`                                                       | —                                                                        |

`/healthz` comunica o estado do ciclo de vida do processo (`ok` / `starting` /
`stopping`). `/livez` verifica apenas se o processo está ativo (200 sempre que o
processador consegue ser executado; não aguarda pela prontidão). Ambos continuam a ser
executados no mesmo ciclo de eventos do Node que o processamento de pedidos, pelo que
o trabalho de catálogo ou compressão que consuma muitos recursos da CPU pode atrasá-los
— ocupado ≠ inativo. Prefira a verificação de disponibilidade através de TCP se as
sondas HTTP excederem o tempo limite. Orientações completas sobre sondas:
[Guia de monitorização — recomendações de sondas do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose com Caddy (HTTPS Auto-TLS)

O OmniRoute pode ser exposto de forma segura utilizando o aprovisionamento SSL automático do Caddy. Certifique-se de que o registo A de DNS do seu domínio aponta para o endereço IP do seu servidor.

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
      # Origem apresentada ao browser para callbacks OAuth, ligações do painel e URLs públicas geradas.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interna entre servidores para tarefas agendadas / pedidos a si próprio.
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

O Caddy define os cabeçalhos de reencaminhamento padrão para o contentor a montante. O OmniRoute utiliza
`NEXT_PUBLIC_BASE_URL` como a origem pública canónica para callbacks OAuth e ligações públicas
geradas; as escritas autenticadas do painel utilizam pedidos da mesma origem e proteção CSRF
associada à sessão. Ative `OMNIROUTE_TRUST_PROXY` apenas em implementações avançadas nas quais pretenda
intencionalmente que o OmniRoute derive a origem pública a partir de cabeçalhos de reencaminhamento
fidedignos, em vez de uma configuração explícita.

## Túnel Rápido do Cloudflare

O suporte do painel para implementações Docker inclui um **Túnel Rápido do Cloudflare** ativável com um clique em `Dashboard → Endpoints`. Na primeira ativação, o `cloudflared` é transferido apenas quando necessário, é iniciado um túnel temporário para o seu endpoint `/v1` atual e o URL `https://*.trycloudflare.com/v1` gerado é apresentado diretamente abaixo do seu URL público normal.

Os painéis de túneis de endpoints (Cloudflare, Tailscale, ngrok) podem ser apresentados ou ocultados em `Settings → Appearance` sem alterar o estado do túnel ativo.

### Notas sobre Túneis

- Os URLs dos Túneis Rápidos são temporários e mudam após cada reinício.
- Os Túneis Rápidos não são restaurados automaticamente após o reinício do OmniRoute ou do contentor. Volte a ativá-los no painel quando necessário.
- Atualmente, a instalação gerida suporta Linux, macOS e Windows em `x64` / `arm64`.
- Por predefinição, os Túneis Rápidos geridos utilizam o transporte HTTP/2 para evitar avisos ruidosos relativos à memória intermédia UDP do QUIC em ambientes de contentores com recursos limitados. Defina `CLOUDFLARED_PROTOCOL=quic` ou `auto` se pretender um transporte diferente.
- As imagens Docker incluem raízes de AC do sistema e transmitem-nas ao `cloudflared` gerido, o que evita falhas de confiança TLS quando o túnel é inicializado dentro do contentor.
- Defina `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` se pretender que o OmniRoute utilize um binário existente em vez de transferir um.

## Etiquetas de Imagem

| Imagem                   | Etiqueta | Tamanho | Descrição                                                         |
| ------------------------ | -------- | ------- | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Versão SemVer estável **publicada** mais recente (não git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Fixe esta classe de etiqueta para GitOps                          |

Manifesto multiplataforma: `linux/amd64` + `linux/arm64` nativos (Apple Silicon, AWS Graviton, Raspberry Pi). O Docker seleciona automaticamente a arquitetura correspondente; indique `--platform linux/amd64` se precisar de forçar a emulação AMD64 em anfitriões ARM.

### Canais de Lançamento

O OmniRoute publica canais Docker separados para versões estáveis, testes do ramo de lançamento ativo e compilações de desenvolvimento.

| Canal                           | Origem                                    | Mutabilidade                        | Utilização recomendada                                                                                                                        |
| ------------------------------- | ----------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versão assinada/com número de versão      | Imutável                            | Implementações de produção que fixam uma versão exata                                                                                         |
| `:latest` / `:latest-web`       | SemVer estável **publicada** mais recente | Ponteiro estável mutável            | Acompanha as versões estáveis **após** uma tarefa de publicação SemVer — **não** acompanha `main` nem commits `release/v*` ainda não lançados |
| `:next` / `:next-web`           | Ramo `release/v*` predefinido atual       | Ponteiro de pré-lançamento mutável  | Testar correções que já foram integradas no ramo de lançamento ativo, mas que ainda não fazem parte de uma versão estável                     |
| `:main` / `:main-web`           | Ramo `main`                               | Ponteiro de desenvolvimento mutável | Apenas desenvolvimento e testes de integração                                                                                                 |

#### Fornecedores de sessões Web: as imagens `-web`

Cada canal acima também está disponível como uma etiqueta `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), criada a partir da fase `runner-web` — a mesma imagem, acrescida do Playwright e de um browser Chromium. A imagem simples é fornecida **sem** o Chromium; `gemini-web`, `claude-web` e `claude-turnstile` necessitam dele.

A falha é adiada, não ocorre no arranque: estes fornecedores listam os respetivos modelos e aparecem como ligados no painel, sendo que apenas o primeiro pedido falha com

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Se utilizar estes fornecedores, obtenha a etiqueta `-web` do canal que já está a utilizar — nada mais muda. Numa instalação npm/CLI (sem imagem Docker), a parte equivalente em falta é o binário do browser: execute `npx playwright install chromium` no anfitrião.

#### Utilizar o canal de pré-lançamento

O canal `next` é reconstruído em cada push para o branch predefinido `release/v*` atual e é publicado para AMD64 e ARM64. Os branches de manutenção mais antigos não o podem substituir. O canal disponibiliza uma imagem que pode ser obtida com pull para correções que tenham sido integradas no branch de release ativo antes de ser criada a próxima tag estável.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para o Docker Compose, substitua a tag da imagem utilizada pelo perfil selecionado e, em seguida, obtenha a imagem e recrie o serviço:

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

`next` é um canal de pré-lançamento variável. Pode ser alterado em qualquer push para o branch de release ativo e **não é suportado para utilização em produção**. Fixe o digest da imagem ao avaliar uma build específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de testar, faça uma cópia de segurança do volume de dados do OmniRoute ou do diretório de dados montado por bind. Para reverter, restaure a versão estável ou o digest anteriormente utilizado e recrie o contentor:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Uma build de um branch de release nunca pode alterar `latest`; apenas uma versão semântica estável elegível pode promover o apontador estável. As imagens `next` mantêm a inspeção da imagem de release e o mecanismo de bloqueio para vulnerabilidades CRITICAL.

**`latest` não garante que o conteúdo esteja atualizado em relação ao git.** As correções integradas em `main` ou no branch `release/v*` ativo **não** estão incluídas em `:latest` até que seja publicada uma imagem SemVer estável e a tarefa de publicação promova `:latest` (com o mesmo digest dessa SemVer). Se `latest` parecer desatualizado quando o GitHub já apresenta a correção, obtenha `:next` para testar o branch de release ou aguarde pela tag SemVer.

| O que pretende                                                                 | Utilize                               |
| ------------------------------------------------------------------------------ | ------------------------------------- |
| GitOps/produção que não pode divergir                                          | Fixe `:X.Y.Z` (ou o digest da imagem) |
| Acompanhar versões estáveis publicadas e aceitar uma recriação em cada release | `:latest`                             |
| Testar commits ainda não publicados de `release/v*`                            | `:next` (não para produção)           |
| Testar `main`                                                                  | `:main` (não para produção)           |

## Atualizações do dashboard no Docker

Um contentor criado a partir de uma imagem publicada não consegue substituir-se a si próprio. Quando o OmniRoute deteta que está a ser executado dentro de um
contentor (sem checkout de `.git`, não sendo uma instalação npm), o banner de atualização do dashboard inicial apresenta o
comando a executar no anfitrião em vez das instruções de npm/git, com um botão para copiar:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

O nome do serviço provém de `AUTO_UPDATE_SERVICE` (por predefinição, `omniroute`, o serviço em
`docker-compose.selfhost.yml`). `pull` apenas atualiza uma etiqueta variável (`latest`, `next`); com uma etiqueta
`:X.Y.Z` fixa, edite primeiro a etiqueta.

### Atualizações com um clique através de um ficheiro acionador no anfitrião

Para manter **Atualizar agora** a funcionar sem montar `/var/run/docker.sock` (o que atribui ao contentor
acesso root no anfitrião — consulte o aviso do perfil `cli` acima), defina `DOCKER_UPDATE_TRIGGER_FILE` no
serviço OmniRoute e execute um monitor no anfitrião:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

O caminho tem de estar dentro de `DATA_DIR` (os valores relativos são resolvidos em relação ao mesmo); qualquer outro caminho é
rejeitado. Em seguida, **Atualizar agora** escreve `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` nesse
ficheiro, responde com `202`, e o dashboard consulta periodicamente `/api/system/version` até a nova versão estar ativa
e recarrega. Neste modo, o OmniRoute nunca executa uma shell nem um comando Docker. Tal como em todas as ações de
atualização, o pedido só é aceite de clientes de loopback/LAN.

Um diretório de dados montado por bind fornece ao anfitrião um caminho estável para monitorizar. Exemplos de unidades `systemd`
(ajuste `/srv/omniroute` para o diretório que contém o seu ficheiro compose e `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Monitorizar pedidos de atualização do dashboard do OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Obter e recriar o contentor OmniRoute

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

O serviço remove o pedido antes de obter a imagem, para que uma execução falhada não entre num ciclo. Sem
`DOCKER_UPDATE_TRIGGER_FILE`, o dashboard mantém o fluxo de comandos manual.

## Disponibilidade: SQLite padrão é uma réplica única

Stock Docker / Kubernetes OmniRoute é** um processo de nó + um gravador SQLite** . A alta disponibilidade é** não suportado** nesta topologia.

| Restrição                            | Consequência                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escritor único                       | Fazer** não** execute várias réplicas no mesmo ficheiro SQLite. Isso corrompe o DB.                                                                                                                                                                                                                                             |
| Recriar/reiniciar/ HEALTHCHECK kill  | **Interrupção total** de SSE em curso, sessões de painel e estado na memória. Todo o cliente conectado cai. Novos pedidos durante a janela do terminal vazio obtêm um proxy reverso**`502 Bad Gateway: Unknown error`** , e não OmniRoute JSON — os clientes não conseguem distinguir isto de uma falha do fornecedor (#11015). |
| Mesmo loop de eventos que `/healthz` | Um catálogo ocupado ou um tique de compressão podem atrasar as sondagens; um curto tempo limite e reinicia o** apenas** réplica.                                                                                                                                                                                                |

**Matriz de sonda** (ver também [recomendações do probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sondar             | Objetivo                                               | Não utilize                                                              |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| Vivacidade         | TCP em `PORT` (padrão `20128`) ou soft HTTP `/healthz` | `/api/monitoring/health`                                                 |
| Prontidão          | HTTP `GET /healthz`                                    | Tempos limites apertados que tratam o loop de eventos ocupado como morto |
| Profundo / humanos | `/api/monitoring/health`                               | Atividade automatizada do kubelet                                        |

**Atualizações:** esperar que cada sessão caia. Drene os clientes, se puder; não há atualização contínua no SQLite padrão. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` também substituirá o único processo quando o contentor não estiver íntegro - mesmo raio de explosão.

Manifestos prontos e um gráfico Helm disponíveis em `deploy/kubernetes/` e `deploy/helm/omniroute/` — consulte o [guia de implementação do Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Snippet do Kubernetes para um** réplica única** (É necessário recriar; não aumentar `replicas` num ficheiro SQLite ):

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

`preStop` sleep permite ao kube descartar os endpoints do serviço antes SIGTERM pelo que** novo** o tráfego deixa de atingir o processo de morte. `/v1/responses` SSE em voo é drenado até `SHUTDOWN_TIMEOUT_MS` (padrão 30s) através de concessões de admissão pesadas (#11015). Os novos pedidos que ainda chegam ao processo recebem `503` + `Retry-After: 5`. A lacuna Recriar ponto final vazio até que a substituição esteja pronta permanece uma interrupção grave — esta é a topologia SQLite, não uma configuração incorreta do probe.

Postgres externo/multi-gravador HA é** não** um caminho de stock documentado. Se precisar de HA, mantenha uma única réplica ou execute uma topologia que o projeto testou e documentou separadamente. O trabalho Postgres/MySQL reside em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Até que seja enviado, a única forma suportada de multiplicar** grande** A capacidade `/v1/responses` é N processos independentes (secção seguinte), e não `replicas > 1` num volume.

## Escalabilidade horizontal: N processos independentes

Um processo Node corresponde a **uma heap V8**. Dois pedidos de agente de programação `POST /v1/responses` (RTK + Caveman) sobrepostos, com ~3 MiB/~750 mil tokens, fazem com que essa heap aborte ao atingir ~12 Gi (`FATAL ERROR: Reached heap limit`) e podem provocar OOM num cgroup de 16 Gi. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Essa medição é um aviso relativo ao **orçamento de memória**, não um máximo rígido do produto de dois pedidos `/v1/responses` longos em simultâneo. A admissão de chats pesados é controlada por um orçamento de bytes de entrada derivado automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionado a partir desse mesmo limite de V8/cgroup — substituí-lo por um valor superior (ou definir o limite legado de contagem de pedidos `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) num processo já dimensionado volta a introduzir o aborto. Os chats pequenos, `/healthz`, `/v1/models` e MCP **não** estão incluídos nesse limite.

### Um processo: mais de dois `/v1/responses` longos

Um processo **saudável** (heap abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, predefinição `0.75`) **pode** executar mais de dois pedidos `POST /v1/responses` longos em simultâneo quando o orçamento de bytes em curso de todo o processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ainda tiver capacidade. Os corpos com tamanho igual ou superior a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (predefinição de 256 KiB) obtêm o mesmo lease para cargas pesadas que os pedidos com estruturas complexas e utilizam o mesmo escape `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dezenas de clientes SSE longos em simultâneo (os operadores precisam frequentemente de 40–50) constituem uma questão de **orçamento de memória** — dimensione a heap + os slots principais/de margem adicional + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — e não um limite rígido do produto de «máximo de 2». Uma heap sob pressão continua a rejeitar carga com um `503` que permite nova tentativa, para que o problema #7849 não volte a ocorrer.

Para **multiplicar heaps** (old-spaces V8 independentes) **atualmente**:

| Faça                                                                                                                                                                                              | Não faça                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Execute **N contentores/pods**, cada um com o seu **próprio** `DATA_DIR`/volume                                                                                                                   | Defina `replicas > 1` para um único ficheiro SQLite                  |
| Dimensione os pedidos pesados em curso + a margem adicional saudável com base na heap/no orçamento de bytes em curso; 1–2 é a predefinição conservadora do #7849, não um máximo rígido do produto | Atribua 8× mais RAM a um processo e um limite de contagem ilimitado  |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para **contadores de quota partilhados**                                                                                           | Trate o Redis como SQLite partilhado — não o é                       |
| Duplique os segredos dos fornecedores em cada instância (ou aceite painéis separados)                                                                                                             | Espere um único painel/um único registo de chamadas entre instâncias |
| Coloque qualquer balanceador de carga à frente; a afinidade por chave de API ou sessão é suficiente                                                                                               | Exija middleware específico de um fornecedor e sensível ao tamanho   |

Hardware: os pedidos `/v1/responses` longos em simultâneo por instância constituem uma questão de **orçamento de memória** (heap + bytes em curso/#10110). `N` `DATA_DIR`s independentes continuam a multiplicar as heaps: a RAM do anfitrião tem de suportar `N × cgroup`, e não «um pod de 16 Gi com N=8». Nunca utilize `replicas > 1` com um único ficheiro SQLite.

Exemplo de Compose (duas heaps, dois volumes — não `deploy.replicas: 2`):

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

A densidade no processo (compressão fora do isolate HTTP) está em [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Um cluster lógico em estado durável partilhado está em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Erros regionais do Gemini dentro do Docker

O Google AI Studio / Gemini API pode devolver HTTP 400 com FAILED_PRECONDITION e
`User location is not supported for the API use.` Um pedido bem-sucedido no anfitrião
não prova que o contentor utiliza a mesma rota de saída. A ordenação do DNS, a
conectividade IPv4/IPv6, o encaminhamento da VPN e os proxies configurados podem ser diferentes. Consulte
[as regiões suportadas pela Google](https://ai.google.dev/gemini-api/docs/available-regions),
bem como a rota de ligação efetiva; este erro, por si só, não indica uma chave de API inválida.

### Preferir um proxy específico da ligação

Utilize a [configuração de proxy por ligação](../ops/PROXY_GUIDE.md#4-level-proxy-system)
do OmniRoute para a ligação Gemini afetada e, em seguida, repita **Testar ligação** e um pequeno pedido
com o mesmo modelo. Isto limita a alteração de encaminhamento a essa ligação. Confirme
que o proxy está acessível a partir do contentor e que a ligação o seleciona efetivamente.
Alterar a rota não garante a elegibilidade regional no serviço a montante.

### Comparar a rede do anfitrião e do contentor

Mantenha a chave, o modelo e o pedido idênticos ao comparar resultados autenticados; nunca
cole credenciais, palavras-passe de proxies ou cabeçalhos de autorização completos num relato de problema.
Comece por verificar que famílias de endereços são disponibilizadas pelo resolvedor do SO, utilizando o mesmo comando
no anfitrião e dentro do contentor:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Substitua `omniroute` pelo serviço que executa (por exemplo, `omniroute-web`). Estes
comandos apresentam as famílias de endereços sem credenciais nem endereços IP. Um valor `6`
devolvido apenas indica um resultado DNS IPv6: **não** prova a existência de uma rota IPv6 utilizável nem de acesso à API.
Quando `curl` estiver instalado, compare `curl -4 -I https://generativelanguage.googleapis.com`
com `curl -6 -I https://generativelanguage.googleapis.com` em ambos os ambientes.
Uma resposta HTTP comprova a conectividade para esse teste, mesmo que seja um erro sem autenticação;
apenas o pedido autenticado ao modelo testa a elegibilidade para o Gemini.

### Alternativa ao nível do anfitrião: IPv6 funcional e política do resolvedor

O autor do relato [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) restaurou
o acesso no respetivo ambiente ao ativar o IPv6 do contentor e alterar a seleção de endereços
da glibc. Trate esta opção como uma alternativa específica do ambiente. Confirme que o IPv6
do anfitrião funciona e verifique o encaminhamento/tráfego de saída do contentor e as regras da firewall antes de ajustar as preferências do resolvedor.
Um endereço ULA privado, por si só, não estabelece conectividade IPv6 pública.

Para serviços já associados à rede predefinida do Compose, este fragmento ativa
o IPv6 nessa rede; mantenha o resto do serviço, das portas, dos volumes e da configuração:

```yaml
networks:
  default:
    enable_ipv6: true
```

Para uma rede com nome, ative-o na rede à qual o serviço está efetivamente associado. O Docker pode
atribuir uma sub-rede ULA; selecione uma sub-rede explícita e sem sobreposições apenas quando a sua rede
o exigir. Consulte [Redes IPv6 do Docker](https://docs.docker.com/engine/daemon/ipv6/)
e [Opções de rede do Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Numa **imagem baseada em glibc**, `/etc/gai.conf` pode alterar a seleção de endereços. O Dockerfile atual
do repositório utiliza Debian; as imagens personalizadas baseadas em musl não partilham este mecanismo.
O ajuste relatado altera a etiqueta ULA de `label fc00::/7 6` para
`label fc00::/7 1`. Comece pela tabela de políticas completa da imagem e preserve as restantes
entradas: adicionar uma entrada `label` ou `precedence` substitui essa tabela predefinida, pelo que um ficheiro
que contenha apenas a linha alterada é insuficiente. A
[referência de configuração da glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documenta essa semântica. Monte o ficheiro revisto apenas para leitura em `/etc/gai.conf`
e recrie o serviço para aplicar a alteração.

Isto altera a seleção de endereços do SO para **todo o tráfego de saída desse contentor**.
Não obriga todas as aplicações a escolher IPv6: a ordem de DNS e a seleção de ligações
do Node também são relevantes. Em particular, `--dns-result-order=ipv4first` dá preferência ao IPv4 e
não é uma solução para uma falha limitada ao IPv4. Consulte [Ordenação de DNS do Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Volte a testar o Gemini e os outros fornecedores após qualquer alteração ao nível do anfitrião. Para reverter,
remova a montagem personalizada de `gai.conf`, restaure a configuração de rede anterior e
recrie o serviço/rede afetado durante uma janela de manutenção. Recriar uma rede
pode interromper outros contentores associados à mesma; não elimine o volume de dados persistentes.

## Notas importantes

- **Modo WAL do SQLite:** deve permitir que `docker stop` termine, para que o OmniRoute possa consolidar as alterações mais recentes em `storage.sqlite`. Os ficheiros Compose incluídos já definem um período de tolerância de 40s para a paragem. Se executar a imagem diretamente, mantenha `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** defina como `true` se as cópias de segurança periódicas/antes de escritas forem geridas externamente. As migrações de bases de dados existentes continuam a exigir a sua própria captura de segurança duradoura e proteção contra migrações em massa.
- **Persistência de dados:** monte sempre um volume em `/app/data` para manter a base de dados, as chaves e as configurações entre reinícios do contentor.
- **Configuração da porta:** substitua a variável de ambiente `PORT` para alterar a porta predefinida `20128`.

## Consulte também

- [Guia de implementação numa VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuração de VM + nginx + Cloudflare
- [Guia de implementação no Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementar no Fly.io
- [Configuração do ambiente](../reference/ENVIRONMENT.md) — Referência completa do `.env`
