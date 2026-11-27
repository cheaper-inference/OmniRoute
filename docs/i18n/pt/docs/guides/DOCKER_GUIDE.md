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

> **Auto-host num comando?** Consulte o [Guia de auto-hospedagem](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (imagem publicada + Redis, apenas loopback, sem escolha de perfil). O Quick Run abaixo é o caminho de contentor único para utilizadores que já executam Redis noutro local.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Com ficheiro de ambiente

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

## Estágios do Dockerfile

O repositório envia um Dockerfile de várias fases (`Dockerfile`). Estão expostas quatro etapas; escolha o `target` certo para o seu caso de utilização.

| Fase          | Imagem base           | Finalidade                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala deps (`npm ci --legacy-peer-deps`) e executa `npm run build` (Turbopack por defeito — ver características em tempo de construção abaixo)                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Tempo de execução de produção com saída autónoma Next.js.** Nenhum fornecedor CLIs incluído.**                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Adiciona `git`, `docker.io`, `docker-compose` e CLIs global : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Escolha isto para fluxos de trabalho de agentes.**                                                                                                          |
| `runner-web`  | `runner-base`         | Adiciona Playwright + um navegador Chromium (`--with-deps`) para fornecedores de sessões web: `gemini-web`, `claude-web`, `claude-turnstile`.** Escolha isto ao utilizar estes fornecedores** — a imagem simples falha no momento do pedido sem ela (ver nota `-web` em Canais de lançamento). |

Crie um alvo específico manualmente:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Recursos em tempo de construção

Três argumentos de construção controlam quanto custa o estágio `builder`. São apenas em tempo de construção — `OMNIROUTE_MEMORY_MB` (abaixo) é um botão de tempo de execução separado.

| Construir argumento         | Predefinição | Efeito                                                                                           |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` compila com webpack: menor pico de memória, mais lento. `1` opta por Turbopack.              |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | Teto de heap V8 (`--max-old-space-size`) para o `next build` gerado.                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Alimenta `CIRCLE_NODE_TOTAL`; A seguir deriva `workers = N - 1` para recolha de dados de página. |

`OMNIROUTE_BUILD_WORKERS` é quem deve aumentar num grande construtor e quem deve suspeitar quando uma construção restrita morre** depois** `✓ Compiled successfully`. Cada trabalhador de dados de página é o seu próprio processo, tal como o próprio `next build` pai; uma reprodução VPS ao vivo (edição #7518) mediu o pico RSS de cada processo em ~ 4,5 GB independente do sinalizador de heap `NODE_OPTIONS` (Turbopack compila na memória native/Rust fora do heap V8). O padrão de `2` (→ 1 worker, 2 processos no total) é dimensionado para os 16 GB /4 vCPU executores alojados no GitHub que o pipeline de publicação utiliza. No `8` (→ 7 workers) este executor ficou sem memória e o buildkit falhou o passo com `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 trabalhadores) ainda não cabia quando o RSS por processo era medido directamente em vez de ser inferido. `tests/unit/docker-build-memory-budget.test.ts` faz a aritmética em relação ao valor medido e falha se um dos botões ultrapassar o tamanho do corredor.

Turbopack compila na memória Rust nativa que existe** exterior** o heap V8, então `OMNIROUTE_BUILD_MEMORY_MB` não o liga. Num host com limite de memória, a compilação é então SIGKILLed pelo OOM killer sem qualquer texto de erro — simplesmente pára a meio do `Creating an optimized production build`, o que parece um crash em vez de falta de memória. É por isso que o `Dockerfile` utiliza o webpack como padrão (`OMNIROUTE_USE_TURBOPACK=0`), ao contrário do `npm run dev` / `npm run build`, onde Turbopack é o código padrão: um `docker build .` simples sem argumentos de construção (o que o Railway e outros hosts de um clique executam) não deve morrer silenciosamente num construtor com limite de memória. As imagens publicadas já passam `OMNIROUTE_USE_TURBOPACK=0` explicitamente em `docker-publish.yml`. Num construtor com bastante RAM, opte pelo Turbopack para uma construção mais rápida:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` está activado, então `next build` executa um pai** e** um processo de trabalho e cada um honra `OMNIROUTE_BUILD_MEMORY_MB` separadamente. Dimensione o teto do contentor acima de aproximadamente o dobro deste valor, e não uma vez.

Medido nesta árvore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Empacotador | Teto do contentor | Resultado                                |
| ----------- | ----------------- | ---------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB    | OOM morto em ambos, silenciosamente      |
| webpack     | 8 GiB             | construir trabalhador SIGKILLed          |
| webpack     | 12 GiB            | teve sucesso, atingiu o pico de 11,1 GiB |

### Padrões de tempo de execução

Padrões exportados por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento da memória em Docker:

- A imagem define `OMNIROUTE_MEMORY_MB=1024` e deriva `NODE_OPTIONS=--max-old-space-size=1024` do mesmo.
- O processo real do servidor é iniciado pelo inicializador independente, que lê `OMNIROUTE_MEMORY_MB` e anexa `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- O nó utiliza o último valor `--max-old-space-size` repetido, pelo que a definição `OMNIROUTE_MEMORY_MB` controla o limite efetivo de heap Docker.
- Como a imagem sempre o define, o substituto calibrado pela RAM do próprio inicializador nunca se aplica em Docker. Aumente-o explicitamente para a carga de trabalho (tabela abaixo). `2048` é ainda demasiado pequeno para o agente de codificação `/v1/responses`.

### Tempo de execução RAM para agentes de codificação

O padrão de 1 GiB Docker é um piso dashboard/light-chat, não um tamanho de produção. Corpos `POST /v1/responses` longos (centenas de mensagens, dezenas de ferramentas) retêm vários gráficos na memória durante a compressão. Dois pedidos sobrepostos de token ~ 3 MiB / ~ 750k abortaram a V8 num** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) e também atingiu 16 GiB cgroup OOM. Veja [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tamanho** cgroup `--memory` acima do heap** Os buffers nativos —, SQLite e intermédios de compressão ficam fora da V8.

| Carga de trabalho                            | `OMNIROUTE_MEMORY_MB`  | Contentor/cgroup      | Notas                                                                                 |
| -------------------------------------------- | ---------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| Dashboard, um chat leve                      | `1024` (imagem padrão) | ≥2 GiB                |                                                                                       |
| Um agente de codificação (Claude/Codex/Grok) | `8192`                 | ≥10 GiB               | `/v1/responses` típico de sessão única                                                |
| Dois `/v1/responses` longos simultâneos      | `10240`–`12288`        | ≥12–16 GiB            | Medição da interrupção do V8 no heap ~ 12 GiB                                         |
| Três contextos longos simultâneos +          | não num processo       | serializar / mais RAM | A admissão padrão para peso pesado é 1 em voo; aumentá-lo sem RAM reintroduz o aborto |

`omniroute serve` em bare metal calibra ~ 35% de RAM ( `[512, 4096]` fixado) quando `OMNIROUTE_MEMORY_MB` é** desarmar** . Docker define sempre `1024`, para que a calibração nunca seja executada na imagem oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## Proxy reverso num subcaminho (Traefik/nginx)

Next.js `basePath` é compilado no pacote independente. OmniRoute regista o valor preparado num ficheiro sentinela na raiz da aplicação (escrito durante `npm run build`; lido por `scripts/docker/ensure-docker-base-path.mjs`) e compara-o com `OMNIROUTE_BASE_PATH` quando o contentor é iniciado. Quando diferem e a imagem foi construída para a raiz do domínio, o ponto de entrada reescreve os manifestos independentes, os literais `basePath`/`assetPrefix` incorporados (os próximos 16 renderizam o ativo SSR URLs apenas do `assetPrefix` — o patcher espelha o subcaminho nele), o ativo `/_next/static` URLs preparado (manifestos de referência do cliente, importações de media, páginas de erro pré-renderizadas) e o cliente `process.env` shim antes da execução `node dev/run-standalone.mjs`.

### Compilação do Compose (recomendado)

Defina ambas as variáveis em `.env` e reconstrua de modo a que a imagem e o tempo de execução estejam de acordo:

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

As imagens `cheaperinference/omniroute:*` publicadas são criadas para a raiz do domínio. Pode ainda definir `OMNIROUTE_BASE_PATH` em tempo de execução; o contentor corrige o pacote uma vez no arranque. Faça a correspondência com a origem pública correspondente:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure o proxy reverso para encaminhar o** cheio** caminho externo (não retirar o prefixo). Traefik deve encaminhar `PathPrefix(`/omniroute `)` para o contentor sem `StripPrefix`, para que Next.js receba `/omniroute/...` e sirva ativos de `/omniroute/_next/...`.

O Docker healthcheck investiga o endpoint leve do ciclo de vida `/healthz` prefixado com o `OMNIROUTE_BASE_PATH` ativo. `/api/monitoring/health` continua disponível para diagnósticos human/dashboard ; para apontar o contentor HEALTHCHECK de volta para ele (por exemplo, para aplicação profunda de integridade), defina `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esse caminho é um** profundo** check ( resumo de monitorização DB + ) — apropriado para `HEALTHCHECK` pouco frequente de Docker se optar por voltar, mas** não** para intervalos `livenessProbe` do Kubernetes.

Para orquestradores (Kubernetes, Nomad, etc.):

| Sondar                 | Preferir                                                                | Evitar                                                                   |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Vivacidade             | HTTP `GET /livez` ou TCP na porta principal (`PORT`, `20128` standard ) | `/api/monitoring/health` como vivacidade                                 |
| Prontidão              | HTTP `GET /healthz`                                                     | Tempos limites apertados que tratam o loop de eventos ocupado como morto |
| Profundo / caixa negra | `/api/monitoring/health`                                                | —                                                                        |

`/healthz` reporta o ciclo de vida do processo (`ok` / `starting` / `stopping`). `/livez` está ativo apenas no processo (200 sempre que o manipulador pode ser executado; não espera pela prontidão). Ambos ainda são executados no mesmo loop de eventos do Node como manipulação de pedidos, pelo que o catálogo ligado à CPU ou o trabalho de compressão podem atrasá-los — ocupado ≠ morto. Prefira a vivacidade TCP se o tempo limite das sondas HTTP expirar. Orientação completa do probe: [Guia de monitorização recomendações do probe — Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compor com Caddy (HTTPS Auto-TLS)

OmniRoute pode ser exposto em segurança utilizando o provisionamento automático SSL do Caddy. Certifique-se de que o registo DNS A do seu domínio aponta para IP do seu servidor.

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

O Caddy define os cabeçalhos de encaminhamento padrão para o contentor upstream. OmniRoute utiliza `NEXT_PUBLIC_BASE_URL` como origem pública canónica para os retornos de chamada OAuth e links públicos gerados; as gravações de painel autenticadas utilizam pedidos da mesma origem, além da proteção CSRF ligada à sessão. Ative `OMNIROUTE_TRUST_PROXY` apenas para implementações avançadas nas quais pretende intencionalmente que OmniRoute derive a origem pública de cabeçalhos encaminhados fiáveis em vez de configuração explícita.

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

## Tags de imagem

| Imagem                       | Etiqueta | Tamanho  | Descrição                                               |
| ---------------------------- | -------- | -------- | ------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | 250 MB ~ | Mais alto** publicado** SemVer estável (não git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | 250 MB ~ | Fixe esta classe de tag para GitOps                     |

As mesmas imagens são publicadas em três repositórios, com os mesmos resumos por arquitetura: `cheaperinference/omniroute` (Docker Hub, a organização Cheaper Inference, a partir de 3.8.53), `ghcr.io/cheaper-inference/omniroute` e o legado `diegosouzapw/omniroute`, que mantém o seu histórico de pull e ainda recebe todos os lançamentos. As implementações `diegosouzapw/omniroute` existentes continuam a ser atualizadas; alterar o nome da imagem é opcional. O canal de pré-lançamento `:next` / `:next-web` abaixo é publicado apenas para `diegosouzapw/omniroute` e GHCR.

Manifesto multiplataforma: `linux/amd64` + `linux/arm64` nativo (Apple Silicon, AWS Graviton, Raspberry Pi). Docker seleciona a arquitetura correspondente automaticamente; passe `--platform linux/amd64` se precisar de forçar a emulação AMD64 em hosts ARM.

### Canais de lançamento

OmniRoute publica canais Docker separados para versões estáveis, testes ativos de ramificação de lançamento e compilações de desenvolvimento.

| Canal                           | Fonte                                  | Mutabilidade                        | Uso recomendado                                                                                                                           |
| ------------------------------- | -------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | lançamento Signed/versioned            | Imutável                            | Implantações de produção que fixam uma versão exata                                                                                       |
| `:latest` / `:latest-web`       | Mais alto** publicado** SemVer estável | Ponteiro estável mutável            | Segue versões estáveis** depois** um trabalho de publicação SemVer que — faz** não** rastrear commits `main` ou `release/v*` não lançados |
| `:next` / `:next-web`           | Ramo `release/v*` padrão atual         | Ponteiro de pré-lançamento mutável  | Testando correções que chegaram ao branch de lançamento ativo, mas ainda não estão numa versão estável                                    |
| `:main` / `:main-web`           | filial `main`                          | Ponteiro de desenvolvimento mutável | Apenas testes de desenvolvimento e integração                                                                                             |

#### Fornecedores de sessões Web: as imagens `-web`

Cada canal acima funciona como uma tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), construída a partir do estágio `runner-web` — a mesma imagem mais Playwright e um browser Chromium. A imagem simples é enviada** sem** Cromo; `gemini-web`, `claude-web` e `claude-turnstile` precisam disso.

A falha é adiada, não no momento do arranque: estes fornecedores listam os seus modelos e mostram como ligados no painel, e apenas o primeiro pedido falha com

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Se utilizar estes fornecedores, puxe a tag `-web` do canal em que já está — nada mais muda. Numa instalação npm/CLI (sem imagem Docker ), a peça equivalente em falta é o binário do browser: execute `npx playwright install chromium` no host.

#### Utilizando o canal de pré-lançamento

O canal `next` é reconstruído a cada envio para a ramificação `release/v*` padrão atual e é publicado para AMD64 e ARM64. As ramificações de manutenção mais antigas não o podem substituir. O canal fornece uma imagem pullable para correções que foram fundidas no branch de lançamento ativo antes de a próxima etiqueta estável ser cortada.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para Docker Compose, substitua a etiqueta de imagem utilizada pelo perfil selecionado e, em seguida, extraia e volte a criar o serviço:

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

`next` é um canal flutuante de pré-lançamento. Pode mudar em qualquer push para o branch de lançamento ativo e é** não suportado para utilização em produção** . Fixe o resumo da imagem ao avaliar uma compilação específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de testar, faça uma cópia de segurança do volume de dados OmniRoute ou do diretório de dados montado em ligação. Para reverter, restaure a versão estável ou o resumo utilizado anteriormente e volte a criar o contentor:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Uma compilação de branch de lançamento nunca pode mover `latest`; apenas uma versão semântica estável elegível pode promover o ponteiro estável. As imagens `next` mantêm a inspeção da imagem de lançamento e bloqueiam a porta de vulnerabilidade CRÍTICA.

**`latest` não é uma garantia monetária para o git.** As correções fundidas no `main` ou na ramificação ativa `release/v*` são** não** em `:latest` até que uma imagem SemVer estável seja publicada e o trabalho de publicação promova `:latest` (mesmo resumo que SemVer). Se `latest` parecer congelado enquanto GitHub já mostra a correção, puxe `:next` para testar o branch de lançamento ou aguarde pela tag SemVer.

| Você quer                                                              | Uso                                  |
| ---------------------------------------------------------------------- | ------------------------------------ |
| GitOps / produção que não deve desviar                                 | Pin `:X.Y.Z` (ou o resumo da imagem) |
| Siga os estábulos publicados e aceite uma recriação em cada lançamento | `:latest`                            |
| Testar commits `release/v*` não lançados                               | `:next` (não produção)               |
| Teste `main`                                                           | `:main` (não produção)               |

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

## Escalabilidade: N processos independentes

### propriedade de rotação do token Codex

As cópias de uma conta Codex não devem consumir independentemente o seu token de atualização de utilização única. Nas instâncias que consomem apenas credenciais sincronizadas, defina `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Deixe-o não definido no proprietário da rotação única. Cada processo necessita ainda do seu próprio `DATA_DIR`; esta opção não partilha SQLite nem fornece sincronização de token ou bloqueio distribuído.

A instância passiva relê a ligação quando é necessária uma atualização e adota apenas um token de acesso diferente e não expirado. Caso contrário, a atualização será desativada sem expirar ou desativar a ligação ou contar uma falha no disjuntor de atualização. As falhas reais de autenticação upstream ainda utilizam a contabilização de falhas normal, arrefecimento exponencial e erro normal do cliente; a desativação da conta mantém-se permanente. Sincronize os tokens rotacionados do proprietário antes de os tokens de acesso expirarem (o tempo de atualização proativa predefinido é de cinco minutos) ou importe novamente o ficheiro de autenticação Codex. As importações passivas armazenam os tokens fornecidos sem os validar no ponto final do token. A atualização manual dashboard/API retorna `409 refresh_disabled`; novos logins OAuth permanecem inalterados. Consulte [referência de ambiente](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Um processo de nó é** uma pilha V8** . Dois agentes de codificação ~ 3 MiB / ~ 750k tokens sobrepostos `POST /v1/responses` (RTK + Caveman ) abortam aquele heap em ~ 12 Gi (`FATAL ERROR: Reached heap limit`) e podem OOM um cgroup de 16 Gi. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Esta medição é uma** orçamento de memória** aviso, não é um produto hard-max de dois `/v1/responses` simultâneos longos. A admissão de chat pesado é controlada por um orçamento de bytes de ingestão derivado automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimensionado a partir do mesmo V8/cgroup teto — substituindo-o para cima (ou definindo o limite de contagem de pedidos `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` herdado) num processo já dimensionado reintroduz a interrupção. Os pequenos chats, `/healthz`, `/v1/models` e MCP são** não** naquele boné.

### Processo único: mais de dois `/v1/responses` longos

UM** saudável** processo (pilha abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, padrão `0.75`)** maio** executar mais de dois `POST /v1/responses` longos simultâneos quando o orçamento de bytes em curso para todo o processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` /#10110) ainda tiver espaço. Os corpos iguais ou superiores a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (padrão 256 KiB) recebem o mesmo leasing pesado que os pedidos de estrutura pesada e utilizam o mesmo escape [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dezenas de clientes SSE longos simultâneos (as operadoras geralmente precisam de 40 a 50) é um** orçamento de memória** pergunta — tamanho heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — não é um limite de produto “máximo de 2” rígido. Um heap pressionado é ainda eliminado com `503` reutilizável, pelo que #7849 não retorna.

Para** multiplicar montes** (espaços antigos V8 independentes)** hoje** :

| Fazer                                                                                                                                             | Não                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Correr** N containers/pods** , cada um com o seu** próprio** `DATA_DIR` /volume                                                                   | Definir `replicas > 1` num ficheiro SQLite                                  |
| Tamanho pesado em voo + espaço saudável de heap/orçamento de bytes em voo; 1–2 é o padrão conservador nº #7849, e não um produto rígido no máximo | Dê a um processo 8 × RAM e um limite de contagem ilimitado                  |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para** contadores de quotas partilhadas**                                          | Trate Redis como SQLite — partilhado, não é                                 |
| Duplicar segredos do fornecedor em cada instância (ou aceitar painéis particionados)                                                              | Aguarde um painel/um registo de chamadas entre instâncias                   |
| Frontal com qualquer balanceador de carga; sticky pela chave ou sessão API é suficiente                                                           | Exigir um middleware com reconhecimento de tamanho específico do fornecedor |

A afinidade sessão-conta também pode ser partilhada através de Redis: defina `OMNIROUTE_SESSION_AFFINITY_STORE=redis` e `REDIS_URL` em cada processo, com o mesmo `REDIS_KEY_PREFIX` e uma configuração `sessionAffinityTtlMs` positiva. Os pins resolvem identidades de contas de utilização com hash para a ligação local qualificada de cada processo, pelo que as contas OAuth com metadados de identidade correspondentes não necessitam de ter ligação correspondente IDs. As identidades de contas conhecidas têm precedência sobre IDs locais contraditórios na resolução de pin e no despejo protegido; registos sem identidade (ou chamadores de dump sem identidade) retêm a guarda ID herdada. As contas sem uma identidade de utilização estável ainda exigem IDs correspondente. Os erros Redis ou chamadas superiores a 100 ms regressam ao SQLite local. Cada armazenamento de afinidade Redis limita as operações pendentes em 8, ignora Redis imediatamente quando cheio e liberta slots apenas quando o trabalho subjacente é liquidado, e não no prazo do chamador. Durante uma interrupção Redis não existe uma verdade partilhada: cada instância regressa à sua própria afinidade local, as sessões podem ser fixadas novamente uma vez por instância e as instâncias podem divergir. A aderência reconverge através Redis quando este recupera. O tempo limite limita a espera, não um EVAL enviado, que pode chegar após o fallback. As gravações de encaminhamento comparam o valor exato observado pela decisão de encaminhamento, e não uma nova leitura do tempo de mutação; uma falha observada ou uma observação de fallback SQLite é comparada como uma chave Redis em falta. Os pinos obsoletos são substituídos num CAS, pelo que um comando tardio não pode substituir ou eliminar um pino diferente e mais recente. As leituras Redis devolvem atomicamente o valor e o restante servidor TTL; PTTL positivo (ou sem expiração) determina a vivacidade, não o JSON timestamp do escritor ou o relógio do leitor. Os instantâneos locais mapeiam o TTL restante para um prazo local; as chaves JSON existentes permanecem legíveis e os seus bytes brutos são retidos para CAS. Redis é a única fonte da verdade enquanto responde. Os upserts, toques e exclusões partilhados confirmados removem a entrada local, nunca a instalam ou atualizam. SQLite no caminho Redis contém apenas as próprias decisões de fallback desta instância de erros Redis, timeouts ou saturação de admissão, limitados por TTL como anteriormente. Um PIN local em falta numa interrupção posterior custa uma nova escolha (uma falha na cache de prompt), e não uma conta errada ou despejada. Os upserts rejeitados devolvem o vencedor partilhado e o seu TTL restante atomicamente: a seleção comum verifica novamente o prazo local mapeado e utiliza um vencedor elegível ainda ativo, afetando a utilização e o registo dessa conta sem outra escrita partilhada. Se não estiver disponível, a seleção mantém o candidato local, deixa o pin partilhado inalterado e emite uma mensagem de depuração. CAS rejeitado não grava SQLite; Os erros Redis, tempos limite ou saturação de admissão aplicam a operação local existente. Se a resposta de uma mutação enviada chegar após o tempo limite (aceite, rejeitado ou erro), uma comparação e eliminação de valor serializado exato síncrono remove apenas a linha de fallback de tempo limite idêntico ao byte. Não há espera entre esta comparação e exclusão; uma gravação de interrupção mais recente é preservada. O dump protegido remove o PIN local da própria conta com falha, mesmo com Redis desativado, e limpa-o novamente após o dump partilhado confirmado. As respostas partilhadas anteriores pendentes não podem restaurar um pin local removido porque os sucessos partilhados nunca gravam SQLite. Um substituto de interrupção posterior pode restaurar uma conta; uma gravação partilhada aceite posteriormente existe apenas em Redis. As falhas Redis não consultam o estado de fallback local. Com o driver desligado, os pinos recém-selecionados mantêm o formato herdado SQLite JSON de quatro campos; apenas o encaminhamento Redis adiciona a identidade da conta com hash. Os pinos pré-buscados são novamente verificados no seu limite de expiração. A seleção de não arrendamento Redis relê a loja, mas o planeamento de arrendamento síncrono ainda pode utilizar um pino despejado entre a pré-busca e o planeamento (uma janela de melhor esforço aceita). Um commit de leasing não pode trocar de conta após uma reclamação durável: no upsert rejeitado, mantém o candidato reivindicado apenas para esse pedido e deixa o vencedor partilhado intocado, pelo que o acordo entre instâncias é limitado nesse caminho. O resto da tabela ainda se aplica: isto não partilha a aderência da sessão combinada, pinos de rotação Codex nativos, semáforos de conta, bloqueios, limites de gastos, configuração ou registos de chamadas.

Hardware: longo `/v1/responses` simultâneo por instância é um** orçamento de memória** pergunta (heap + inflight-byte/#10110). `N` independente `DATA_DIR` s ainda multiplica heaps: o host RAM deve cobrir `N × cgroup`, e não “um pod de 16 Gi com N = 8”. Nunca `replicas > 1` num ficheiro SQLite.

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

A densidade em processo (compressão do isolado HTTP ) é [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Um cluster lógico em estado durável partilhado é [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
