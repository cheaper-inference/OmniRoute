# 🐳 Docker Guide — OmniRoute (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker 배포에 대한 전체 참고 문서입니다. 빠르게 시작하려면 [README의 Docker 섹션](../README.md#-docker)을 참조하세요.

## 목차

- [빠른 실행](#quick-run)
- [환경 파일 사용](#with-environment-file)
- [Docker Compose](#docker-compose)
- [사용 가능한 프로필](#available-profiles)
- [OmniRoute가 Docker에서 실행될 때 호스트 CLI 도구 구성](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis 사이드카](#redis-sidecar)
- [프로덕션 Compose](#production-compose)
- [Dockerfile 스테이지](#dockerfile-stages)
- [중요 환경 변수](#critical-environment-variables)
- [Caddy를 사용하는 Docker Compose(HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [이미지 태그](#image-tags)
- [Docker에서 대시보드 업데이트](#dashboard-updates-in-docker)
- [가용성: 기본 SQLite는 단일 복제본](#availability-default-sqlite-is-single-replica)
- [Docker 내부의 Gemini 지역 오류](#gemini-regional-errors-inside-docker)
- [중요 참고 사항](#important-notes)

---

## 빠른 실행

> **하나의 명령으로 자체 호스트를 하시겠습니까?** [셀프 호스트 가이드](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (게시된 이미지 + Redis, 루프백 전용, 프로필 선택 없음)를 참조하세요. 아래 Quick Run은 이미 다른 곳에서 Redis 실행한 사용자를 위한 단일 컨테이너 경로입니다.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## 환경 파일 포함

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
# 기본 프로필(CLI 도구 없음)
docker compose --profile base up -d

# CLI 프로필(Claude Code, Codex, OpenClaw 내장)
docker compose --profile cli up -d

# 호스트 프로필(Linux 우선 지원, 호스트 CLI 바이너리를 읽기 전용으로 마운트)
docker compose --profile host up -d

# 웹 프로필(웹 세션 공급자용 Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI 사이드카 조합
docker compose --profile cli --profile cliproxyapi up -d
```

## 사용 가능한 프로필

OmniRoute는 주요 배포 형태를 위한 Compose 프로필을 제공합니다. 환경에 적합한 프로필을 선택하세요.

| 프로필         | 서비스           | 사용 시점                                                                                                                                   | 명령                                         |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base`(기본값) | `omniroute-base` | 헤드리스 서버/최소 런타임이며, 공급자 CLI가 포함되지 않은 경우                                                                              | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | `omniroute providers/setup/doctor` 및 내장 CLI(Codex, Claude Code, Droid, OpenClaw)를 호출하는 에이전트형 워크플로                          | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` 등을 읽기 전용으로 마운트하여 호스트 CLI에 `network_mode`와 유사한 방식으로 접근하려는 Linux 호스트 | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | 업스트림 CLI 프록시를 위해 포트 `8317`에서 [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) 사이드카를 실행하는 경우             | `docker compose --profile cliproxyapi up -d` |
| `web`          | `omniroute-web`  | 브라우저가 필요한 웹 세션 공급자(`gemini-web`, `claude-web`, `claude-turnstile`)를 사용하는 경우(`runner-web` 빌드, Chromium 포함)          | `docker compose --profile web up -d`         |

> 여러 프로필을 조합할 수 있습니다: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute가 Docker에서 실행될 때 호스트 CLI 도구 구성하기

`omniroute setup-codex`, `setup-claude`, `config set <tool>` 및 대시보드의
**구성 저장** 버튼은 모두 `~/.codex/*.config.toml`과 같은 파일을 작성합니다. 이러한 경로는
CLI가 실제로 실행되는 머신에서만 의미가 있습니다. 컨테이너 내부에서 이를 실행하면
컨테이너 자체의 홈 디렉터리(`/home/node` — 이미지는 `USER node`로 실행됨)에 파일이
작성됩니다. 호스트 CLI는 이 파일을 읽지 않으며, 컨테이너가 다시 생성되는 즉시
삭제됩니다.

OmniRoute는 이를 감지하며, 사용할 수 없는 성공 결과를 보고하는 대신
쓰기 작업을 거부하고 안내를 제공합니다. CLI는 `2`로 종료되고 API는
`containerEphemeralTarget: true`와 함께 `422`로 응답합니다.

### 권장: CLI는 호스트에서, OmniRoute는 Docker에서 실행

컨테이너는 API를 제공하고, CLI는 호스트 도구를 구성합니다.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI가 컨테이너를 가리키도록 설정
omniroute setup-codex                      # 호스트의 실제 ~/.codex에 작성
```

노트북에서 Codex, Claude Code, Cursor 또는 유사한 도구를 실행하는 경우
이 방식을 선택하는 것이 적절하며, 일반적으로 사용되는 구성입니다.

### 대안: 호스트 구성 디렉터리를 바인드 마운트(`host` 프로필)

컨테이너 자체에서 호스트 구성을 작성하도록 하려면 해당 디렉터리를
마운트하고 `CLI_CONFIG_HOME`이 마운트 루트를 가리키도록 설정하십시오. `host` 프로필에는
이미 다음과 같이 구성되어 있습니다.

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

경로를 신뢰할 수 있게 만드는 것은 바인드 마운트입니다. OmniRoute는
`/proc/self/mountinfo`를 읽고 마운트된 경로에 대한 쓰기를 허용합니다. 또한 하위 항목이
마운트된 디렉터리에 대한 쓰기도 허용하는데, 위의 `/host-home` 구조가 바로 이에
해당합니다. 마운트되지 않은 경로에 대한 쓰기는 계속 거부됩니다.

### 우회 방법: 컨테이너 자체의 CLI 구성(제한적으로 사용)

CLI가 실제로 컨테이너 내부에 존재하는 경우(`cli` 프로필)에는 쓰기 작업이
의도된 것입니다. `setup-*` 명령에 `--allow-container-write`를 전달하거나 서버에
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`를 설정하십시오. 해당 쓰기 작업이
컨테이너 종료 후 유지되지 않는다는 경고와 함께 작업이 진행됩니다.

> **보안 경고 — `cli` 프로필 + `docker.sock` 마운트.**
> `cli` 프로필은 컨테이너 내부의 자동 업데이트 도구가 호스트 데몬을 통해
> 스택을 다시 생성할 수 있도록 `/var/run/docker.sock`을 바인드 마운트합니다.
> (`src/lib/system/autoUpdate.ts`는 해당 소켓이 있는지 확인하고, 없으면
> Docker 경로를 건너뜁니다.) 이 소켓은 **호스트 root 권한의 신뢰
> 경계**입니다. 이 소켓에 접근할 수 있는 모든 것은 호스트 Docker 데몬을
> root 권한으로 제어할 수 있으며, 호스트의 모든 컨테이너를 생성, 검사, 중지 및 제거할 수 있습니다.
> 주의 사항:
>
> 1. **`cli` 프로필의 포트를 네트워크에 절대 노출하지 마십시오.**
>    `127.0.0.1`에 게시하십시오(`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`).
>    LAN에서 접근 가능한 `cli` 프로필은 대시보드 수준의 모든 RCE를
>    호스트 전체 침해로 확대합니다.
> 2. **추가 호스트 디렉터리를 `cli` 프로필에 바인드하지 마십시오.**
>    Docker 소켓과 추가 마운트가 함께 제공되면 컨테이너는 파일 시스템과
>    호스트 구성에 대한 완전한 읽기/쓰기 권한을 갖게 됩니다. 도구가 프로젝트를
>    참조해야 한다면 CLI 바이너리를 사용하여 로컬에서 실행하십시오. 해당 프로젝트를
>    `cli` 컨테이너에 마운트하지 마십시오.
>
> 컨테이너 내부 자동 업데이트가 필요하지 않다면 `cli` 프로필을 비활성화해 두십시오
> (`COMPOSE_PROFILES=core,redis` 또는 더 짧게 설정). 다른 프로필은
> Docker 소켓을 마운트하지 않습니다.
>
> MITM 관련 위협 모델은 `docs/security/MITM-TPROXY-DECRYPT.md`(git에 있으며 `/docs`에는 컴파일되지 않음)를,
> `codex`/`claude-code`/`droid`/`openclaw` 바이너리의 출처 체인은
> `docs/security/SUPPLY_CHAIN.md`를 참조하십시오.

## Redis 사이드카

OmniRoute는 분산 속도 제한기와 공유 캐시를 지원하기 위해 Redis를 사용합니다. `redis` 서비스는 `docker-compose.yml`에 **항상 정의되어 있으며**(프로필 제한이 없음), 다른 모든 프로필과 함께 시작됩니다.

| 세부 정보             | 값                                      |
| --------------------- | --------------------------------------- |
| 이미지                | `redis:7-alpine`                        |
| 컨테이너 이름         | `omniroute-redis`                       |
| 내부 포트             | `6379`                                  |
| 호스트 포트(재정의)   | `REDIS_PORT` (기본값: `6379`)           |
| 호스트 바인드(재정의) | `REDIS_BIND_HOST` (기본값: `127.0.0.1`) |
| 볼륨                  | `omniroute-redis-data` → `/data`        |
| 상태 검사             | `redis-cli ping` (10초 간격)            |

관련 환경 변수:

- `REDIS_URL` — 앱에 주입되는 연결 문자열(기본값: `redis://redis:6379`).
- `REDIS_PORT` — Redis 컨테이너의 호스트 측 포트 매핑.
- `REDIS_BIND_HOST` — 포트가 게시되는 호스트 인터페이스. 기본값은 `127.0.0.1`입니다.

> **기본적으로 루프백을 사용하는 이유:** 사이드카는 `requirepass` 없이 실행되며, 앱
> 컨테이너는 compose 네트워크(`redis:6379`)를 통해 여기에 연결합니다. 게시된 포트는
> 호스트 측 도구(`redis-cli`, 로컬 `npm run dev`)만을 위한 것입니다. `0.0.0.0`에
> 게시하면 인증되지 않은 Redis가 LAN의 모든 호스트에 노출됩니다.
> `REDIS_BIND_HOST=0.0.0.0`을 설정하는 경우 서비스의 `command:`에도 `--requirepass`를 추가하세요.

**Redis 비활성화**는 권장하지 않습니다(속도 제한기가 인메모리 대체 방식으로 저하됩니다). 반드시 비활성화해야 하는 경우 `docker-compose.yml`에서 `redis:` 서비스 블록을 제거하거나 주석 처리하거나, 인스턴스 수를 0으로 조정하세요.

```bash
docker compose up -d --scale redis=0
```

## 프로덕션 Compose

개발 환경과 함께 실행되는 격리된 프로덕션 스냅샷에는 `docker-compose.prod.yml`을 사용하세요.

| 세부 정보          | 값                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------- |
| 파일               | `docker-compose.prod.yml`                                                          |
| 기본 대시보드 포트 | `PROD_DASHBOARD_PORT=20130` (내부 `${DASHBOARD_PORT:-20128}`에 매핑)               |
| 기본 API 포트      | `PROD_API_PORT=20131`                                                              |
| 이미지             | `omniroute:prod` (`runner-cli` 대상에서 빌드)                                      |
| Redis 컨테이너     | `omniroute-redis-prod` (`redis:8.6.2`, 전용 `redis-prod-data` 볼륨)                |
| 데이터 볼륨        | `omniroute-prod-data` (명명된 볼륨, 재빌드 후에도 유지)                            |
| 상태 검사          | `node healthcheck.mjs` + `redis-cli ping`, Redis 상태에 따라 제한되는 `depends_on` |

사용 방법:

```bash
# 프로덕션 스택 빌드 및 시작
docker compose -f docker-compose.prod.yml up -d --build

# 로그 스트리밍
docker compose -f docker-compose.prod.yml logs -f

# 종료(볼륨 유지)
docker compose -f docker-compose.prod.yml down
```

프로덕션 스택은 개발용 compose와 병렬로 실행됩니다(컨테이너 이름, 포트 및 볼륨이 서로 다름). 따라서 프로덕션을 계속 실행한 상태로 로컬에서 작업을 이어갈 수 있습니다.

## Dockerfile 단계

저장소는 다단계 Dockerfile(`Dockerfile`)을 제공합니다. 4단계가 노출됩니다. 귀하의 사용 사례에 적합한 `target` 선택하십시오.

| 단계          | 기본 이미지           | 목적                                                                                                                                                                                                                                                                         |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | deps(`npm ci --legacy-peer-deps`)를 설치하고 `npm run build` 실행합니다( 기본적으로 Turbopack — 아래 빌드 시간 리소스 참조).                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Next.js 독립형 출력을 사용한 프로덕션 런타임.** 제공업체 CLIs 가 번들로 제공되지 않습니다.**                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` 및 전역 CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw` 를 추가합니다.** 에이전트 워크플로의 경우 이 옵션을 선택하세요.**                                                                                       |
| `runner-web`  | `runner-base`         | 웹 세션 제공자용 Playwright + a Chromium 브라우저(`--with-deps`)를 추가합니다: `gemini-web`, `claude-web`, `claude-turnstile`.** 해당 공급자를 사용할 때 이것을 선택하십시오** — 일반 이미지가 없으면 요청 시 일반 이미지가 실패합니다(릴리스 채널 아래의 `-web` 참고 참조). |

특정 대상을 수동으로 빌드합니다.

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### 빌드타임 리소스

세 개의 빌드 인수가 `builder` 단계 비용을 제어합니다. 이는 빌드 타임에만 해당됩니다. — `OMNIROUTE_MEMORY_MB` (아래)는 별도의 런타임 손잡이입니다.

| 빌드 인수                   | 기본   | 효과                                                                                         |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` webpack으로 빌드됩니다. 최대 메모리가 낮고 속도가 느립니다. `1` Turbopack 를 선택합니다. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | 생성된 `next build` 에 대한 V8 힙 한도(`--max-old-space-size`)입니다.                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL` 피드; 다음으로 페이지 데이터 수집을 위해 `workers = N - 1` 파생합니다.   |

`OMNIROUTE_BUILD_WORKERS` 큰 빌더에 대해 레이즈하는 것이고 제한된 빌드가 죽을 때 의심하는 것입니다.** ~ 후에** `✓ Compiled successfully`. 각 페이지 데이터 작업자는 자체 프로세스이며 상위 `next build` 자체도 마찬가지입니다. 라이브 VPS 재현(문제 #7518)은 `NODE_OPTIONS` 힙 플래그(Turbopack V8 힙 외부의 native/Rust 메모리에서 컴파일)와 관계없이 ~ 4.5 GB 에서 각 프로세스의 피크 RSS 측정했습니다. `2` 의 기본값(→ 1 작업자, 총 2 프로세스)은 게시 파이프라인이 사용하는 16 GB / 4 vCPU GitHub 호스팅 실행기에 맞게 크기가 지정됩니다. `8` (→ 7 작업자)에서 러너의 메모리가 부족하고 빌드킷이 `ResourceExhausted: ... cannot allocate memory` 단계에 실패했습니다. 프로세스 RSS 추론하는 대신 직접 측정한 후에도 `3` (→ 2 작업자)는 여전히 적합하지 않았습니다. `tests/unit/docker-build-memory-budget.test.ts` 측정된 수치에 대해 산술을 수행하고 손잡이 중 하나가 러너보다 커지면 실패합니다.

Turbopack 살아있는 기본 Rust 메모리에서 컴파일됩니다.** 밖의** V8 힙이므로 `OMNIROUTE_BUILD_MEMORY_MB` 이를 바인딩하지 않습니다. 메모리 한도가 있는 호스트에서 빌드는 오류 텍스트가 전혀 없는 OOM 킬러에 의해 SIGKILLed 됩니다. — 는 단순히 `Creating an optimized production build` 중간에 중지됩니다. 이는 메모리 부족이 아닌 정지처럼 읽혀집니다. 이것이 바로 `Dockerfile` 기본 코드인 `npm run dev` / `npm run build` 와 달리 웹팩(`OMNIROUTE_USE_TURBOPACK=0`)을 기본값으로 사용하는 이유입니다. 여기서 Turbopack 코드 기본값입니다. 빌드 인수(철도 및 기타 원클릭 호스트가 실행하는 것)가 없는 베어 `docker build .` 메모리가 제한된 빌더에서 자동으로 종료되어서는 안 됩니다. 게시된 이미지는 이미 `docker-publish.yml` 에서 명시적으로 `OMNIROUTE_USE_TURBOPACK=0` 전달합니다. RAM 가 많은 빌더에서는 더 빠른 빌드를 위해 Turbopack 선택하세요.

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` 활성화되었으므로 `next build` 상위를 실행합니다.** 그리고** 작업자 프로세스이며 각각은 `OMNIROUTE_BUILD_MEMORY_MB` 개별적으로 존중합니다. 컨테이너 한도의 크기를 한 번이 아니라 대략 해당 값의 두 배 이상으로 조정합니다.

이 트리에서 측정됨(`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| 번들러    | 컨테이너 천장  | 결과                             |
| --------- | -------------- | -------------------------------- |
| Turbopack | 8 GiB / 16 GiB | 조용히 둘 다 OOM으로 죽임을 당함 |
| 웹팩      | 8 GiB          | 워커 SIGKILLed 빌드              |
| 웹팩      | 12 GiB         | 성공, 최고 11.1 GiB              |

### 런타임 기본값

`runner-base` 에서 내보낸 기본값: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker 의 메모리 동작:

- 이미지는 `OMNIROUTE_MEMORY_MB=1024` 설정하고 여기에서 `NODE_OPTIONS=--max-old-space-size=1024` 파생시킵니다.
- 실제 서버 프로세스는 `OMNIROUTE_MEMORY_MB` 읽고 `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` 추가하는 독립 실행형 실행 프로그램에 의해 시작됩니다.
- 노드는 마지막으로 반복된 `--max-old-space-size` 값을 사용하므로 `OMNIROUTE_MEMORY_MB` 설정하면 효과적인 Docker 힙 제한이 제어됩니다.
- 이미지가 항상 설정하기 때문에 런처의 자체 RAM 보정 폴백은 Docker 아래에는 적용되지 않습니다. 워크로드에 대해 명시적으로 올립니다(아래 표). `2048` 는 코딩 에이전트 `/v1/responses` 에 비해 여전히 너무 작습니다.

### 코딩 에이전트를 위한 런타임 RAM

1 GiB Docker 기본값은 생산 규모가 아닌 dashboard/light-chat 층입니다. 긴 `POST /v1/responses` 본문(수백 개의 메시지, 수십 개의 도구)은 압축 중에 여러 개의 인메모리 그래프를 유지합니다. 두 개의 중복되는 ~ 3 MiB / ~ 750k-token 요청으로 인해 V8이 중단되었습니다.** GiB** old-space (`FATAL ERROR: Reached heap limit`) 또한 16 GiB cgroup OOM 에 도달했습니다. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) 참조하세요.

크기** 힙 위의 cgroup `--memory`** — 기본 버퍼, SQLite 및 압축 중간 버퍼는 V8 외부에 있습니다.

| 작업량                               | `OMNIROUTE_MEMORY_MB`               | 컨테이너/cgroup   | 메모                                                                       |
| ------------------------------------ | ----------------------------------- | ----------------- | -------------------------------------------------------------------------- |
| 대시보드, 가벼운 채팅 하나로         | `1024` (이미지 기본값)              | ≥2 GiB            |                                                                            |
| 코딩 에이전트 1개(Claude/Codex/Grok) | `8192`                              | ≥10 GiB           | 일반적인 단일 세션 `/v1/responses`                                         |
| 두 개의 동시 긴 `/v1/responses`      | `10240`–`12288`                     | ≥12–16 GiB        | ~ 12 GiB 힙에서 측정된 V8 중단                                             |
| 3개의 + 동시 긴 컨텍스트             | 하나의 프로세스를 사용하지 마십시오 | 직렬화 / more RAM | 기본 헤비급 입장은 기내 1회입니다. RAM 없이 올리면 중단이 다시 발생합니다. |

`omniroute serve` on bare metal calibrates ~35% of RAM (clamped `[512, 4096]`) when `OMNIROUTE_MEMORY_MB` is **unset**. Docker always sets `1024`, so that calibration never runs in the official image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## 중요한 환경 변수

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)에 문서화된 기본값 외에도 Docker에서 실행할 때는 다음 변수들이 가장 중요합니다.

| 변수                          | 용도                                                                                                                                                                                                                                                             | 기본값                   |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket 브리지의 공유 비밀 값입니다. **프로덕션에서는 필수입니다** — 강력한 무작위 문자열로 설정하세요.                                                                                                                                                        | 설정되지 않음(제공 필수) |
| `REDIS_URL`                   | 속도 제한기/캐시 백엔드의 연결 문자열                                                                                                                                                                                                                            | `redis://redis:6379`     |
| `REDIS_PORT`                  | 번들 Redis 컨테이너의 호스트 측 포트                                                                                                                                                                                                                             | `6379`                   |
| `REDIS_BIND_HOST`             | 번들 Redis 포트가 게시되는 호스트 인터페이스(AUTH를 추가하지 않는 한 루프백)                                                                                                                                                                                     | `127.0.0.1`              |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 자체 업데이트 워크플로를 위해 `cli` 프로필에서 `/workspace/omniroute`에 마운트되는 호스트 경로                                                                                                                                                                   | `.` (현재 디렉터리)      |
| `OMNIROUTE_MEMORY_MB`         | Docker 독립 실행형 서버의 런타임 Node 힙 상한이며, 위의 이미지 기본값을 재정의합니다. 코딩 에이전트: `8192` 이상([런타임 RAM](#runtime-ram-for-coding-agents) 참조).                                                                                             | `1024`                   |
| `DASHBOARD_PORT` / `API_PORT` | 대시보드(20128) 및 API(20129)의 노출 포트를 재정의합니다.                                                                                                                                                                                                        | `20128` / `20129`        |
| `APP_BIND_HOST`               | docker-compose가 대시보드/API/라이브 WS 포트를 게시하는 호스트 인터페이스입니다. `REQUIRE_API_KEY=false`(기본값)이면 `0.0.0.0`은 익명 `/v1` 프록시를 LAN에 노출합니다. `REQUIRE_API_KEY=true`이거나 앞단에 리버스 프록시가 있는 경우에만 노출 범위를 확장하세요. | `127.0.0.1`              |
| `CLIPROXY_BIND_HOST`          | docker-compose가 `cliproxyapi` 사이드카를 게시하는 호스트 인터페이스입니다. 해당 데이터 볼륨에는 공급자 자격 증명이 저장됩니다.                                                                                                                                  | `127.0.0.1`              |
| `OMNIROUTE_PLUGINS_DIR`       | 런타임 플러그인 스캐너가 읽고 설치하는 디렉터리입니다. 플러그인이 바인드 마운트된 경우 설정하세요. 기본값은 `HOME`을 따르지만, 이미지에서 이를 내보내지 않을 수도 있습니다.                                                                                      | `~/.omniroute/plugins`   |
| `OMNIROUTE_BASE_PATH`         | 앱이 리버스 프록시 뒤에 게시될 때 사용하는 URL 하위 경로(예: `/omniroute`)                                                                                                                                                                                       | _(비어 있음 = 루트)_     |
| `NEXT_PUBLIC_BASE_URL`        | 하위 경로를 포함한 공개 브라우저 오리진(예: `https://host/omniroute`)                                                                                                                                                                                            | 설정되지 않음            |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`의 호스트 측 대시보드 포트                                                                                                                                                                                                              | `20130`                  |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` 사이드카의 호스트 측 포트                                                                                                                                                                                                                          | `8317`                   |

## 하위 경로의 역방향 프록시(Trafik / nginx)

Next.js `basePath` 는 독립형 번들로 컴파일됩니다. OmniRoute 앱 루트( `npm run build` 중에 작성되고 `scripts/docker/ensure-docker-base-path.mjs` 에서 읽음)의 센티넬 파일에 구운 값을 기록하고 컨테이너가 시작될 때 이를 `OMNIROUTE_BASE_PATH` 와 비교합니다. 서로 다르고 도메인 루트에 대해 이미지가 빌드되면 진입점은 독립 실행형 매니페스트, 내장된 `basePath`/`assetPrefix` 리터럴(다음 16은 `assetPrefix` 에서 SSR 자산 URLs 렌더링합니다 — 패치 프로그램은 하위 경로를 미러링합니다), 구운 `/_next/static` 자산 URLs (클라이언트 참조 매니페스트, 미디어 가져오기, 사전 렌더링된 오류 페이지) 및 클라이언트 `process.env` shim을 `node dev/run-standalone.mjs` 실행되기 전에 다시 작성합니다.

### Compose 빌드(권장)

`.env` 에서 두 변수를 모두 설정한 다음 이미지와 런타임이 일치하도록 다시 빌드합니다.

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Docker 빌드 인수 및 런타임 환경 변수로 전달합니다.

### 사전 빌드된 루트 이미지 + 런타임 하위 경로

게시된 `cheaperinference/omniroute:*` 이미지는 도메인 루트용으로 구축되었습니다. 런타임에 `OMNIROUTE_BASE_PATH` 설정할 수 있습니다. 컨테이너는 시작 시 번들을 한 번 패치합니다. 일치하는 공개 원본과 페어링합니다.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

다음을 전달하도록 역방향 프록시를 구성합니다.** 가득한** 외부 경로(접두사를 제거하지 않음) Traefik은 `PathPrefix(`/omniroute `)` `StripPrefix` 없이 컨테이너로 라우팅해야 하므로 Next.js `/omniroute/...` 수신하고 `/omniroute/_next/...` 에서 자산을 제공합니다.

Docker 상태 확인은 활성 `/healthz` 접두사가 붙은 경량 `OMNIROUTE_BASE_PATH` 수명 주기 엔드포인트를 조사합니다. `/api/monitoring/health` human/dashboard 진단에 계속 사용할 수 있습니다. 컨테이너 HEALTHCHECK 다시 이를 가리키도록 하려면(예를 들어 심층 건강 강화를 위해) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` 설정하세요. 그 길은** 깊은** (DB + 모니터링 요약) 다시 선택하면 Docker 의 드물게 발생하는 `HEALTHCHECK` 에 적합한 — 확인하세요. 하지만** ~ 아니다** Kubernetes `livenessProbe` 간격의 경우.

오케스트레이터(Kubernetes, Nomad 등)의 경우:

| 조사        | 선호하다                                                        | 피하다                                                   |
| ----------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| 활성        | HTTP `GET /livez` 또는 기본 포트의 TCP (`PORT`, 기본값 `20128`) | 활성 상태로서의 `/api/monitoring/health`                 |
| 준비        | HTTP `GET /healthz`                                             | 바쁜 이벤트 루프를 죽은 것으로 처리하는 엄격한 시간 초과 |
| 딥/블랙박스 | `/api/monitoring/health`                                        | —                                                        |

`/healthz` 프로세스 수명주기(`ok` / `starting` / `stopping`)를 보고합니다. `/livez` 는 프로세스 활성 상태입니다(핸들러가 실행될 수 있을 때마다 200개, 준비 상태를 기다리지 않음). 둘 다 여전히 요청 처리와 동일한 노드 이벤트 루프에서 실행되므로 CPU 바인딩 카탈로그 또는 압축 작업으로 인해 — busy ≠ dead가 지연될 수 있습니다. HTTP 프로브가 시간 초과되면 TCP 활성을 선호합니다. 전체 프로브 지침: [모니터링 가이드 — Kubernetes 프로브 권장 사항](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## 캐디를 사용한 Docker Compose(HTTPS Auto-TLS)

OmniRoute Caddy의 자동 SSL 프로비저닝을 사용하여 안전하게 노출될 수 있습니다. 도메인의 DNS A 레코드가 서버의 IP 가리키는지 확인하세요.

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

캐디는 업스트림 컨테이너에 대한 표준 전달 헤더를 설정합니다. OmniRoute OAuth 콜백 및 생성된 공개 링크에 대한 정식 공개 출처로 `NEXT_PUBLIC_BASE_URL` 사용합니다. 인증된 대시보드 쓰기는 동일 출처 요청과 세션 바인딩 CSRF 보호를 사용합니다. OmniRoute 명시적 구성 대신 신뢰할 수 있는 전달 헤더에서 공개 원본을 의도적으로 파생하도록 하려는 고급 배포에 대해서만 `OMNIROUTE_TRUST_PROXY` 활성화하십시오.

## Cloudflare Quick Tunnel

Docker 배포용 대시보드는 `Dashboard → Endpoints`에서 한 번의 클릭으로 사용할 수 있는 **Cloudflare Quick Tunnel**을 지원합니다. 처음 활성화하면 필요한 경우에만 `cloudflared`를 다운로드하고, 현재 `/v1` 엔드포인트로 임시 터널을 시작한 후, 생성된 `https://*.trycloudflare.com/v1` URL을 일반 공개 URL 바로 아래에 표시합니다.

활성 터널 상태를 변경하지 않고 `Settings → Appearance`에서 엔드포인트 터널 패널(Cloudflare, Tailscale, ngrok)을 표시하거나 숨길 수 있습니다.

### 터널 참고 사항

- Quick Tunnel URL은 임시로 제공되며 재시작할 때마다 변경됩니다.
- OmniRoute 또는 컨테이너를 재시작한 후에는 Quick Tunnel이 자동으로 복원되지 않습니다. 필요할 때 대시보드에서 다시 활성화하세요.
- 관리형 설치는 현재 `x64` / `arm64` 기반 Linux, macOS 및 Windows를 지원합니다.
- 관리형 Quick Tunnel은 리소스가 제한된 컨테이너 환경에서 불필요하게 많은 QUIC UDP 버퍼 경고가 발생하는 것을 방지하기 위해 기본적으로 HTTP/2 전송을 사용합니다. 다른 전송 방식을 사용하려면 `CLOUDFLARED_PROTOCOL=quic` 또는 `auto`로 설정하세요.
- Docker 이미지에는 시스템 CA 루트가 포함되어 있으며 관리형 `cloudflared`에 전달됩니다. 이를 통해 컨테이너 내부에서 터널을 부트스트랩할 때 발생하는 TLS 신뢰 오류를 방지합니다.
- OmniRoute가 바이너리를 다운로드하는 대신 기존 바이너리를 사용하도록 하려면 `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`로 설정하세요.

## 이미지 태그

| 영상                         | 꼬리표   | 크기    | 설명                                                    |
| ---------------------------- | -------- | ------- | ------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | 제일 높은** 출판됨** 안정적인 SemVer ( git `main` 아님) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | GitOps 에 대해 이 태그 클래스를 고정하세요.             |

동일한 이미지가 동일한 아키텍처별 다이제스트를 사용하여 3개의 저장소에 게시됩니다. `cheaperinference/omniroute` (3.8.53부터 더 저렴한 추론 조직인 Docker Hub), `ghcr.io/cheaper-inference/omniroute` 및 레거시 `diegosouzapw/omniroute` 는 풀 기록을 유지하고 여전히 모든 릴리스를 수신합니다. 기존 `diegosouzapw/omniroute` 배포는 계속 업데이트됩니다. 이미지 이름을 전환하는 것은 선택 사항입니다. 아래 `:next` / `:next-web` 사전 출시 채널은 `diegosouzapw/omniroute` 및 GHCR 에만 게시됩니다.

다중 플랫폼 매니페스트: `linux/amd64` + `linux/arm64` 기본(Apple Silicon, AWS Graviton, Raspberry Pi). Docker 일치하는 아키텍처를 자동으로 선택합니다. ARM 호스트에서 AMD64 에뮬레이션을 강제해야 하는 경우 `--platform linux/amd64` 전달하십시오.

### 출시 채널

OmniRoute 안정적인 릴리스, 활성 릴리스 브랜치 테스트 및 개발 빌드를 위해 별도의 Docker 채널을 게시합니다.

| 채널                            | 원천                               | 가변성                         | 권장 용도                                                                                                                                      |
| ------------------------------- | ---------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned 릴리스            | 불변                           | 정확한 릴리스를 고정하는 프로덕션 배포                                                                                                         |
| `:latest` / `:latest-web`       | 제일 높은** 출판됨** 안정된 SemVer | 가변 안정 포인터               | 안정적인 릴리스를 따릅니다.** ~ 후에** SemVer 게시 작업 — 수행하는 작업** ~ 아니다** `main` 또는 출시되지 않은 `release/v*` 커밋을 추적합니다. |
| `:next` / `:next-web`           | 현재 기본 `release/v*` 분기        | 변경 가능한 사전 릴리스 포인터 | 활성 릴리스 브랜치에 도착했지만 아직 안정적인 릴리스에 포함되지 않은 수정 사항 테스트                                                          |
| `:main` / `:main-web`           | `main` 지점                        | 가변 개발 포인터               | 개발 및 통합 테스트만 해당                                                                                                                     |

#### 웹 세션 제공자: `-web` 이미지

위의 모든 채널은 `runner-web` 단계 — 에서 동일한 이미지와 Playwright 및 Chromium 브라우저로 구축된 `-web` 태그(`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`)로도 두 배가 됩니다. 일반 이미지 배송** 없이** 크롬; `gemini-web`, `claude-web` 및 `claude-turnstile` 필요합니다.

실패는 시작 시간이 아닌 지연됩니다. 해당 공급자는 모델을 나열하고 대시보드에 연결된 것으로 표시하며 첫 번째 요청만 실패합니다.

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

해당 공급자를 사용하는 경우 이미 — 에 있는 채널의 `-web` 태그를 가져오면 다른 변경 사항은 없습니다. npm/CLI 설치( Docker 이미지 없음)에서 누락된 해당 부분은 브라우저 바이너리입니다. 호스트에서 `npx playwright install chromium` 실행하세요.

#### 시험판 채널 사용

`next` 채널은 현재 기본 `release/v*` 분기에 푸시할 때마다 재구축되며 AMD64 및 ARM64 모두에 대해 게시됩니다. 이전 유지 관리 분기에서는 덮어쓸 수 없습니다. 채널은 다음 안정 태그가 절단되기 전에 활성 릴리스 분기에 병합된 수정 사항에 대해 풀 가능한 이미지를 제공합니다.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose의 경우 선택한 프로필에서 사용되는 이미지 태그를 재정의한 다음 서비스를 가져와서 다시 만듭니다.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### 안전 및 롤백

`next` 는 플로팅 사전 출시 채널입니다. 활성 릴리스 분기에 푸시할 때 변경될 수 있으며** 프로덕션 용도로는 지원되지 않습니다.** . 특정 빌드를 평가하는 동안 이미지 다이제스트를 고정합니다.

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

테스트하기 전에 OmniRoute 데이터 볼륨이나 바인드 마운트된 데이터 디렉터리를 백업하세요. 롤백하려면 이전에 사용된 안정적인 버전이나 다이제스트를 복원하고 컨테이너를 다시 생성하세요.

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

릴리스 브랜치 빌드는 절대 `latest` 이동할 수 없습니다. 적합한 안정 의미 체계 버전만이 안정 포인터를 승격할 수 있습니다. `next` 이미지는 릴리스 이미지 검사 및 CRITICAL-취약성 게이트 차단 기능을 유지합니다.

**`latest` git에 대한 통화 보장이 아닙니다.** `main` 또는 활성 `release/v*` 분기의 병합된 수정 사항은 다음과 같습니다.** ~ 아니다** 안정적인 SemVer 이미지가 게시되고 게시 작업이 `:latest` ( SemVer 와 동일한 다이제스트)를 승격할 때까지 `:latest` 에서. GitHub 이미 수정 사항을 표시하는 동안 `latest` 정지된 것처럼 보이면 `:next` 당겨 릴리스 분기를 테스트하거나 SemVer 태그를 기다리세요.

| 당신이 원하는                                                | 사용                                  |
| ------------------------------------------------------------ | ------------------------------------- |
| GitOps / 드리프트해서는 안되는 프로덕션                      | `:X.Y.Z` 고정(또는 이미지 다이제스트) |
| 게시된 마구간을 따르고 각 릴리스에 대한 재생성을 허용합니다. | `:latest`                             |
| 출시되지 않은 `release/v*` 커밋 테스트                       | `:next` (프로덕션 아님)               |
| `main` 테스트                                                | `:main` (프로덕션 아님)               |

## Docker의 대시보드 업데이트

게시된 이미지의 컨테이너는 스스로를 교체할 수 없습니다. OmniRoute는 컨테이너 내부에서 실행 중임을 감지하면(`.git` 체크아웃이 아니고 npm 설치도 아닌 경우), 홈 대시보드의 업데이트 배너에 npm/git 지침 대신 호스트에서 실행할 명령과 복사 버튼을 표시합니다.

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

서비스 이름은 `AUTO_UPDATE_SERVICE`에서 가져옵니다(기본값은 `docker-compose.selfhost.yml`의 서비스인 `omniroute`). `pull`은 유동 태그(`latest`, `next`)만 이동시킵니다. 고정된 `:X.Y.Z` 태그를 사용하는 경우 먼저 태그를 수정하십시오.

### 호스트 트리거 파일을 사용한 원클릭 업데이트

컨테이너에 호스트의 root 권한을 부여하는 `/var/run/docker.sock`을 마운트하지 않고도 **지금 업데이트**가 작동하도록 하려면(위의 `cli` 프로필 경고 참조), OmniRoute 서비스에 `DOCKER_UPDATE_TRIGGER_FILE`을 설정하고 호스트에서 감시 프로그램을 실행하십시오.

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

경로는 `DATA_DIR` 내부에 있어야 하며(상대 값은 이를 기준으로 해석됨), 그 외의 경로는 거부됩니다. 그러면 **지금 업데이트**는 `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`를 해당 파일에 쓰고 `202`로 응답합니다. 이후 대시보드는 새 버전이 실행될 때까지 `/api/system/version`을 폴링한 다음 다시 로드합니다. 이 모드에서 OmniRoute는 셸이나 Docker 명령을 실행하지 않습니다. 모든 업데이트 작업과 마찬가지로 요청은 루프백/LAN 클라이언트에서 온 경우에만 수락됩니다.

바인드 마운트된 데이터 디렉터리를 사용하면 호스트에서 감시할 수 있는 안정적인 경로가 제공됩니다. `systemd` 유닛 예시(`/srv/omniroute`를 compose 파일과 `data/`가 있는 디렉터리로 조정):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute 대시보드 업데이트 요청 감시

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute 컨테이너를 가져와 다시 생성

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

서비스는 가져오기를 실행하기 전에 요청을 제거하므로 실패한 실행이 반복되지 않습니다. `DOCKER_UPDATE_TRIGGER_FILE`이 없으면 대시보드는 수동 명령 흐름을 유지합니다.

## 가용성: 기본 SQLite 는 단일 복제본입니다.

주식 Docker / Kubernetes OmniRoute 는** 하나의 노드 프로세스 + 하나의 SQLite 작성자** . 고가용성은** 지원되지 않음** 해당 토폴로지에서.

| 강제                               | 결과                                                                                                                                                                                                                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 단일 작가                          | 하다** ~ 아니다** 동일한 SQLite 파일에 대해 여러 복제본을 실행합니다. 이는 DB 를 손상시킵니다.                                                                                                                                                                                           |
| 재생성/다시 시작/ HEALTHCHECK 종료 | **전체 중단** 진행 중인 SSE, 대시보드 세션 및 메모리 내 상태. 연결된 모든 클라이언트가 삭제됩니다. 빈 엔드포인트 기간 동안의 새 요청은 역방향 프록시를 얻습니다.**`502 Bad Gateway: Unknown error`** , OmniRoute JSON 아님 — 클라이언트는 이를 공급자 오류와 구별할 수 없습니다(#11015). |
| `/healthz` 와 동일한 이벤트 루프   | 바쁜 카탈로그 또는 압축 틱으로 인해 프로브가 지연될 수 있습니다. 짧은 시간 초과 후 다시 시작됩니다.** 오직** 레플리카.                                                                                                                                                                   |

**프로브 매트릭스** ( [Kubernetes 프로브 권장 사항](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) 참조):

| 조사    | 목표                                                       | 사용하지 마십시오                                        |
| ------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| 활성    | TCP 의 `PORT` (기본값 `20128`) 또는 소프트 HTTP `/healthz` | `/api/monitoring/health`                                 |
| 준비    | HTTP `GET /healthz`                                        | 바쁜 이벤트 루프를 죽은 것으로 처리하는 엄격한 시간 제한 |
| 딥/인간 | `/api/monitoring/health`                                   | 자동화된 kubelet 활성                                    |

**업그레이드:** 모든 세션이 중단될 것으로 예상합니다. 가능하다면 고객을 배출하십시오. 기본 SQLite 에는 롤링 업데이트가 없습니다. Compose `restart: unless-stopped` 와 Docker `HEALTHCHECK` 컨테이너가 비정상일 때(동일한 폭발 반경) 유일한 프로세스를 대체합니다.

기성 매니페스트와 Helm 차트가 `deploy/kubernetes/` 및 `deploy/helm/omniroute/` 에 있습니다. [Kubernetes 배포 가이드를](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) 참조하세요.

Kubernetes 스니펫** 단일 복제본** (재생성이 필요합니다. 하나의 SQLite 파일에 대해 `replicas` 발생시키지 마십시오):

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

`preStop` sleep을 사용하면 kube가 SIGTERM 전에 서비스 엔드포인트를 삭제할 수 있습니다.** 새로운** 트래픽이 죽어가는 과정을 멈춥니다. 비행 중 `/v1/responses` SSE 는 헤비급 허용 임대(#11015)를 통해 최대 `SHUTDOWN_TIMEOUT_MS` (기본값 30초)까지 소모됩니다. 여전히 프로세스에 도달하는 새 요청은 `503` + `Retry-After: 5` 얻습니다. 교체가 준비될 때까지 빈 엔드포인트 간격을 다시 생성하면 하드 중단이 유지됩니다. 이는 프로브 구성 오류가 아닌 SQLite 토폴로지입니다.

외부 Postgres /멀티라이터 HA 는** ~ 아니다** 문서화된 재고 경로. HA 필요한 경우 단일 복제본을 유지하거나 프로젝트에서 별도로 테스트하고 문서화한 토폴로지를 실행하세요. Postgres/MySQL 작업은 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) 에 있습니다. 그것이 출시될 때까지, 곱셈을 지원하는 유일한 방법은** 크기가 큰** `/v1/responses` 용량은 하나의 볼륨에 있는 `replicas > 1` 아니라 N개의 독립적인 프로세스(다음 섹션)입니다.

## 확장: N개의 독립적인 프로세스

### Codex 토큰 순환 소유권

하나의 Codex 계정 사본은 일회용 새로 고침 토큰을 독립적으로 사용해서는 안 됩니다. 동기화된 자격 증명만 사용하는 인스턴스에서는 `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (별칭 `cx`)를 설정합니다. 단일 순환 소유자에서는 설정하지 않은 상태로 둡니다. 각 프로세스에는 여전히 자체 `DATA_DIR` 필요합니다. 이 옵션은 SQLite 공유하지도 않고 토큰 동기화나 분산 잠금을 제공하지도 않습니다.

패시브 인스턴스는 새로 고침이 필요할 때 연결을 다시 읽고 만료되지 않은 다른 액세스 토큰만 채택합니다. 그렇지 않으면 연결이 만료되거나 비활성화되거나 새로 고침 차단 실패가 계산되지 않고 새로 고침이 비활성화됩니다. 실제 업스트림 인증 실패는 여전히 일반 실패 계산, 지수 쿨다운 및 일반 클라이언트 오류를 사용합니다. 계정 비활성화는 영구적으로 유지됩니다. 액세스 토큰이 만료되기 전에 소유자의 순환된 토큰을 동기화하거나(기본 사전 새로 고침 리드는 5분) Codex 인증 파일을 다시 가져옵니다. 수동 가져오기는 제공된 토큰을 토큰 엔드포인트에서 검증하지 않고 저장합니다. 수동 dashboard/API 새로 고침은 `409 refresh_disabled` 를 반환합니다. 새로운 OAuth 로그인은 변경되지 않습니다. [환경 참조 를](../reference/ENVIRONMENT.md#passive-codex-token-refresh) 참조하세요.

원노드 프로세스는** V8 힙 1개** . 두 개의 겹치는 ~ 3 MiB / ~ 750k 토큰 코딩 에이전트 `POST /v1/responses` (RTK + Caveman)는 ~ 12 Gi (`FATAL ERROR: Reached heap limit`)에서 해당 힙을 중단하고 16 Gi cgroup을 OOM 할 수 있습니다. [#7849를](https://github.com/diegosouzapw/OmniRoute/issues/7849) 참조하세요. 해당 측정값은** 메모리 예산** 경고, 두 개의 동시 long `/v1/responses` 제품의 hard-max가 아닙니다. 헤비급 채팅 허용은 동일한 V8/cgroup 한도 — 에서 크기가 지정된 자동 파생 수집 바이트 예산(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`)에 의해 제어됩니다. 이미 크기가 지정된 프로세스에서 이를 상향 조정하거나 기존 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` 요청 수 한도를 설정하면 중단이 다시 발생합니다. 소규모 채팅인 `/healthz`, `/v1/models` 및 MCP 은** ~ 아니다** 그 모자에.

### 단일 프로세스: 두 개 이상의 긴 `/v1/responses`

에이** 건강한** 프로세스( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` 아래의 힙, 기본값 `0.75`)** 5월** 프로세스 전체의 인플라이트 바이트 예산(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110)에 아직 공간이 있는 경우 두 개 이상의 동시 긴 `POST /v1/responses` 실행합니다. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` 이상의 본문(기본값 256 KiB)은 구조가 많은 요청과 동일한 중량 임대를 사용하고 동일한 [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` 이스케이프(`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`)를 사용합니다. 수십 개의 동시 긴 SSE 클라이언트(운영자는 종종 40~50개가 필요함)는** 메모리 예산** 질문 — 크기 힙 + primary/headroom 슬롯 + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — 엄격한 "최대 2" 제품 제한이 아닙니다. 압력이 가해진 힙은 여전히 재시도 가능한 `503` 로 인해 발생하므로 #7849가 반환되지 않습니다.

에게** 힙을 곱하다** (독립적인 V8 Old-Spaces)** 오늘** :

| 하다                                                                                                                                          | 하지 마십시오                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 달리다** N containers/pods** , 각각은** 소유하다** `DATA_DIR` / 볼륨                                                                          | 하나의 SQLite 파일에 대해 `replicas > 1` 설정                       |
| 힙/inflight-byte 예산에서 무거운 in-flight + healthy-headroom 크기를 지정합니다. 1-2는 엄격한 제품 최대값이 아닌 보수적인 #7849 기본값입니다. | 하나의 프로세스에 8 × RAM 및 무제한 카운트 한도를 제공합니다.       |
| 선택 사항: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for** 공유 할당량 카운터**                                                    | Redis 공유된 SQLite 로 취급합니다. — 그렇지 않습니다.               |
| 공급자 암호를 각 인스턴스에 복제합니다(또는 분할된 대시보드 허용).                                                                            | 인스턴스 전반에 걸쳐 하나의 대시보드/하나의 통화 기록이 필요합니다. |
| 로드 밸런서가 있는 전면; API 키나 세션으로 고정하면 충분합니다.                                                                               | 공급업체별 크기 인식 미들웨어 필요                                  |

세션-계정 친화성은 Redis 통해 공유될 수도 있습니다. 각 프로세스에 `OMNIROUTE_SESSION_AFFINITY_STORE=redis` 및 `REDIS_URL` 동일한 `REDIS_KEY_PREFIX` 및 양수 `sessionAffinityTtlMs` 설정으로 설정합니다. 핀은 해시된 사용 계정 ID를 각 프로세스의 적합한 로컬 연결로 확인하므로 ID 메타데이터가 일치하는 OAuth 계정에는 IDs 연결이 일치할 필요가 없습니다. 알려진 계정 ID는 핀 확인 및 보호 퇴거에서 모순되는 로컬 IDs 보다 우선합니다. 신원이 없는 기록(또는 신원이 없는 퇴거 호출자)은 기존 ID 가드를 유지합니다. 안정적인 사용 ID가 없는 계정에는 여전히 IDs 일치가 필요합니다. Redis 오류 또는 100ms를 초과하는 호출은 로컬 SQLite 로 대체됩니다. 각 Redis 친화성 저장소는 미해결 작업을 8로 제한하고, 가득 차면 즉시 Redis 우회하며, 호출자 최종 기한이 아닌 기본 작업이 안정될 때만 슬롯을 해제합니다. Redis 가동 중단 중에는 공유된 진실이 없습니다. 각 인스턴스는 자체 로컬 선호도로 돌아가고, 세션은 인스턴스당 한 번씩 다시 고정될 수 있으며, 인스턴스가 분기될 수 있습니다. 끈적임은 회복되면 Redis 통해 다시 수렴됩니다. 대기 시간은 폴백 이후에 도착할 수 있는 EVAL 전송이 아닌 대기 시간입니다. 라우팅 쓰기는 새로운 변이 시간 읽기가 아닌 라우팅 결정에 의해 관찰된 정확한 값을 비교합니다. 관찰된 누락 또는 SQLite 폴백 관찰은 Redis 키가 없는 것으로 비교됩니다. 사용되지 않는 핀은 하나의 CAS 에서 교체되므로 늦은 명령으로 새로운 다른 핀을 교체하거나 삭제할 수 없습니다. Redis 읽기는 원자적으로 값과 나머지 서버 TTL 반환합니다. 양수 PTTL (또는 만료 없음)는 작성자의 JSON 타임스탬프나 독자의 시계가 아닌 활성 상태를 결정합니다. 로컬 스냅샷은 남은 TTL 로컬 최종 기한에 매핑합니다. 기존 JSON 키는 읽기 가능한 상태로 유지되며 해당 원시 바이트는 CAS 에 대해 유지됩니다. Redis 응답하는 동안 유일한 진실 소스입니다. 확인된 공유 upsert, 터치 및 삭제는 로컬 항목을 제거하고 절대 설치하거나 새로 고치지 마십시오. Redis 경로의 SQLite Redis 오류, 시간 초과 또는 승인 포화, 이전과 같이 TTL 제한으로 인한 이 인스턴스 자체 폴백 결정만 보유합니다. 나중에 중단될 때 로컬 핀이 누락되면 계정이 잘못되거나 제거되는 것이 아니라 새로운 선택(프롬프트 캐시 누락 1회)이 발생합니다. 거부된 upsert는 공유 우승자와 나머지 TTL 원자적으로 반환합니다. 일반 선택은 매핑된 로컬 기한을 다시 확인하고 아직 유효한 적격 우승자를 사용하여 다른 공유 쓰기 없이 해당 계정에 대한 사용 및 로깅을 터치합니다. 사용할 수 없는 경우 선택하면 로컬 후보가 유지되고 공유 핀은 변경되지 않은 채로 유지되며 하나의 디버그 메시지가 표시됩니다. 거부된 CAS SQLite 쓰지 않습니다. Redis 오류, 시간 초과 또는 승인 포화는 대신 기존 로컬 작업을 적용합니다. 전송된 변형의 응답이 시간 초과(수락, 거부 또는 오류) 후에 도착하는 경우 동기식 정확한 직렬 값 비교 및 삭제는 바이트와 동일한 시간 초과 대체 행만 제거합니다. 비교와 삭제 사이에는 대기가 없습니다. 최신 중단 쓰기가 보존됩니다. 보호된 제거는 Redis 작동 중지된 상태에서도 실패한 계정의 자체 로컬 핀을 제거하고 공유 제거가 확인된 후 다시 정리합니다. 공유 성공은 SQLite 쓰지 않기 때문에 보류 중인 이전 공유 응답은 제거된 로컬 핀을 복원할 수 없습니다. 추후 중단 대체를 통해 계정을 다시 고정할 수 있습니다. 나중에 허용되는 공유 쓰기는 Redis 에만 존재합니다. Redis 누락은 로컬 폴백 상태를 참조하지 않습니다. 드라이버를 끈 상태에서 새로 선택한 핀은 기존의 4필드 SQLite JSON 모양을 유지합니다. Redis 라우팅만이 해시된 계정 ID를 추가합니다. 프리페치된 핀은 만료 경계에서 다시 확인됩니다. Redis 비임대 선택은 매장을 다시 읽지만 동기식 임대 계획은 여전히 프리페치와 계획(허용되는 최선의 노력 기간) 사이에 제거된 핀을 사용할 수 있습니다. 임대 커밋은 지속형 청구 후에 계정을 전환할 수 없습니다. upsert가 거부되면 해당 요청에 대해 청구된 후보만 유지하고 공유 승자는 그대로 유지되므로 인스턴스 간 합의는 해당 경로로 제한됩니다. 표의 나머지 부분은 여전히 적용됩니다. 이는 콤보 세션 고정성, 기본 Codex 턴 핀, 계정 세마포어, 잠금, 지출 한도, 구성 또는 통화 기록을 공유하지 않습니다.

하드웨어: 인스턴스당 동시 long `/v1/responses` 는** 메모리 예산** 질문(힙 + inflight-byte / #10110). `N` 독립 `DATA_DIR` s는 여전히 힙을 곱합니다. 호스트 RAM "N = 8이 있는 하나의 16 Gi 포드"가 아니라 `N × cgroup` 커버해야 합니다. 하나의 SQLite 파일에 `replicas > 1` 사용하지 마십시오.

스케치 작성(힙 2개, 볼륨 — 아님 `deploy.replicas: 2`):

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

공정 중 밀도( HTTP 분리물 압축)는 [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) 입니다. 공유 내구성 상태의 논리적 클러스터 중 하나는 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) 입니다.

## Docker 내부의 Gemini 지역 오류

Google AI Studio / Gemini API FAILED_PRECONDITION 및 `User location is not supported for the API use.` 사용하여 HTTP 400을 반환할 수 있습니다. 호스트에서 성공적인 요청이 컨테이너가 동일한 아웃바운드 경로를 사용한다는 것을 증명하지는 않습니다. DNS 순서, IPv4/IPv6 연결, VPN 라우팅 및 구성된 프록시는 다를 수 있습니다. [Google 가 지원하는 지역](https://ai.google.dev/gemini-api/docs/available-regions) 과 실제 연결 경로를 확인하세요. 이 오류만으로는 잘못된 API 키를 식별할 수 없습니다.

### 연결별 프록시를 선호하세요

영향을 받는 Gemini 연결에 대해 OmniRoute 의 [연결별 프록시 구성을](../ops/PROXY_GUIDE.md#4-level-proxy-system) 사용한 다음 반복하세요.** 연결 테스트** 동일한 모델에 대한 작은 요청입니다. 이렇게 하면 라우팅 변경 범위가 해당 연결로 유지됩니다. 컨테이너에서 프록시에 연결할 수 있는지, 연결이 실제로 프록시를 선택하는지 확인하세요. 경로를 변경한다고 해서 업스트림 지역 자격이 보장되는 것은 아닙니다.

### 호스트 및 컨테이너 네트워킹 비교

인증된 결과를 비교할 때 키, 모델 및 요청을 동일하게 유지하십시오. 자격 증명, 프록시 비밀번호 또는 전체 인증 헤더를 이슈에 붙여넣지 마십시오. 먼저 호스트와 컨테이너 내부에서 동일한 명령을 사용하여 OS 확인자가 제공하는 주소 계열을 검사합니다.

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` 실행하는 서비스(예: `omniroute-web`)로 바꿉니다. 이 명령은 자격 증명이나 IP 주소 없이 주소 계열을 인쇄합니다. 반환된 `6` IPv6 DNS 결과만 표시합니다.** ~ 아니다** 사용 가능한 IPv6 경로 또는 API 액세스를 증명합니다. `curl` 설치된 경우 두 환경 모두에서 `curl -4 -I https://generativelanguage.googleapis.com` 와 `curl -6 -I https://generativelanguage.googleapis.com` 비교하십시오. HTTP 응답은 인증되지 않은 오류인 경우에도 해당 프로브에 대한 연결을 증명합니다. 인증된 모델 요청만이 Gemini 적격성을 테스트합니다.

### 호스트 수준 대안: IPv6 및 확인자 정책 작동

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) 의 보고자는 컨테이너 IPv6 활성화하고 glibc 주소 선택을 변경하여 해당 환경에서 액세스를 복원했습니다. 이를 환경별 대안으로 취급하십시오. 확인자 기본 설정을 조정하기 전에 작업 호스트 IPv6, 컨테이너 egress/routing 및 방화벽 규칙을 확인하세요. 비공개 ULA 주소 자체로는 공개 IPv6 연결을 설정하지 않습니다.

Compose의 기본 네트워크에 이미 연결된 서비스의 경우 이 조각은 해당 네트워크에서 IPv6 활성화합니다. 나머지 서비스, 포트, 볼륨 및 구성을 유지합니다.

```yaml
networks:
  default:
    enable_ipv6: true
```

명명된 네트워크의 경우 서비스가 실제로 참여하는 네트워크에서 이를 활성화합니다. Docker ULA 서브넷을 할당할 수 있습니다. 네트워크에서 요구하는 경우에만 명시적이고 겹치지 않는 서브넷을 선택하십시오. [Docker IPv6 네트워킹](https://docs.docker.com/engine/daemon/ipv6/) 및 [네트워크 옵션 작성을](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) 참조하세요.

에** glibc 기반 이미지** , `/etc/gai.conf` 주소 선택을 변경할 수 있습니다. 현재 저장소 Dockerfile은 Debian을 사용합니다. 사용자 정의 musl 기반 이미지는 이 메커니즘을 공유하지 않습니다. 보고된 조정은 ULA 레이블을 `label fc00::/7 6` 에서 `label fc00::/7 1` 로 변경합니다. 이미지의 전체 정책 테이블에서 시작하여 다른 항목을 보존합니다. `label` 또는 `precedence` 항목을 추가하면 해당 기본 테이블이 대체되므로 변경된 줄만 포함하는 파일로는 충분하지 않습니다. [glibc 구성 참조에는](https://github.com/bminor/glibc/blob/master/posix/gai.conf) 이러한 의미가 문서화되어 있습니다. 검토된 파일을 `/etc/gai.conf` 에서 읽기 전용으로 바인드 마운트하고 서비스를 다시 생성하여 적용합니다.

이는 다음에 대한 OS 주소 선택을 변경합니다.** 해당 컨테이너의 모든 아웃바운드 트래픽** . 모든 애플리케이션이 IPv6 선택하도록 강요하지는 않습니다. 노드의 DNS 순서와 연결 선택도 중요합니다. 특히, `--dns-result-order=ipv4first` IPv4 선호하며 IPv4-only 실패에 대한 해결책은 아닙니다. [노드 DNS 순서를](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) 참조하세요.

호스트 수준 변경 후 Gemini와 다른 공급자를 다시 테스트하십시오. 롤백하려면 사용자 정의 `gai.conf` 마운트를 제거하고 이전 네트워크 구성을 복원한 후 유지 관리 기간 동안 영향을 받은 service/network 다시 생성하십시오. 네트워크를 다시 생성하면 네트워크에 연결된 다른 컨테이너가 중단될 수 있습니다. 영구 데이터 볼륨을 삭제하지 마십시오.

## 중요 참고 사항

- **SQLite WAL 모드:** OmniRoute가 최신 변경 사항을 `storage.sqlite`에 체크포인트할 수 있도록 `docker stop`이 완료될 때까지 기다려야 합니다. 번들로 제공되는 Compose 파일에는 이미 40초의 종료 유예 기간이 설정되어 있습니다. 이미지를 직접 실행하는 경우 `--stop-timeout 40`을 유지하세요.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** 정기/쓰기 전 백업을 외부에서 관리하는 경우 `true`로 설정하세요. 기존 데이터베이스 마이그레이션에는 여전히 별도의 내구성 있는 안전 스냅샷과 대규모 마이그레이션 보호 장치가 필요합니다.
- **데이터 영속성:** 컨테이너를 재시작해도 데이터베이스, 키 및 설정이 유지되도록 항상 `/app/data`에 볼륨을 마운트하세요.
- **포트 설정:** 기본 포트 `20128`을 변경하려면 `PORT` 환경 변수를 재정의하세요.

## 함께 보기

- [VM 배포 가이드](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare 설정
- [Fly.io 배포 가이드](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io에 배포
- [환경 설정](../reference/ENVIRONMENT.md) — 전체 `.env` 참조
