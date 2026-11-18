# CLI Integrations (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

공유 실행 가능 매니페스트, 제한된 하위 환경 및 영구 Gemini 설정에 대해서는 [CLI 실행 계약을](./CLI-LAUNCH-CONTRACTS.md) 참조하세요.

OmniRoute OmniRoute 백엔드로 사용하도록 코딩 CLI (Codex, Claude Code, OpenCode, Cline, …)를 구성하는 `setup-*` 명령 제품군을 제공합니다.** 하나** 엔드포인트와 OmniRoute 자동 폴백을 통해 올바른 공급자로 라우팅됩니다. 각 명령은** 살다** 실행 중인 OmniRoute (로컬 또는 원격)에서 모델 카탈로그를 작성하고 도구의 자체 구성 파일을 작성합니다.** 당신의** 기계. API 키는 도구가 지원할 때마다 환경 변수에 의해 참조됩니다. 도구-로컬 환경 파일을 유지하는 명령은 아래에 설명되어 있습니다.

구성을 전혀 작성하지 않고 올바른 env가 주입된 `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` 또는 `whycodes` 생성하는 일반 실행 프로그램인 `omniroute run <target>` 도 있습니다. 대상과 별칭은 표준 매니페스트 `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`)에서 나오며 `omniroute completion` 동일한 매니페스트 파생 대상 단어를 제공합니다. 레거시 도구별 실행 프로그램인 `omniroute launch` (Claude Code) 및 `omniroute launch-codex` (Codex)는 계속 사용할 수 있습니다.

공급자 온보딩은 동일한 local/remote 컨텍스트에서 가능합니다. 아래의 API 우선 명령은 관리 인증을 공급자 자격 증명과 별도로 유지하고 구조화된 출력에 자격 증명을 인쇄하지 않습니다.

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

스크립트의 경우 `--credential-stdin` 또는 `--credential-env` 선호합니다. `--credential` 는 통제된 로컬 사용을 위해 보관됩니다. `providers remove` 비대화형 터미널에서 `--yes` 필요하며 다섯 가지 명령 모두 활성 컨텍스트 또는 전역 `--base-url`/`--api-key` 옵션을 따릅니다.

공급자 선택기는 모호한 ID 접두사, 이름 또는 공급자 이름을 거부합니다. 여러 연결이 일치하면 전체 연결 ID 사용합니다. 생성 및 편집 명령은 저장된 연결을 다시 읽고 제거하면 더 이상 읽을 수 없는지 확인됩니다. 가져오기는 기존 provider/name 쌍을 건너뜁니다. 가져온 항목은 CLI 에 제공된 관리 엔드포인트, 컨텍스트 또는 관리 자격 증명을 재정의할 수 없습니다.

가장 풍부한 두 가지 통합의 일회성 수동 기본 설정에 대해서는 도구별 심층 분석을 참조하세요.

- [Claude 코드 구성](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI 구성](./CODEX-CLI-CONFIGURATION.md)
- [원격 모드](./REMOTE-MODE.md) — 노트북에서 원격 OmniRoute (VPS / Tailnet)를 구동합니다.
- [VS 코드 Copilot 채팅](./VSCODE-COPILOT.md) — OmniCopilot 확장; 또한 편집기 내부에서 이러한 `setup-*` 명령을 실행할 수도 있습니다.

---

## 마스터 테이블

모든 명령은** 활성 컨텍스트** ( `omniroute connect` 로 설정, [원격 모드](./REMOTE-MODE.md) 참조) 또는 명시적인 `--remote <url> --api-key <key>` 플래그. 아래의 "로컬 대 원격"은 다음을 의미합니다. 플래그가 없으면 `http://localhost:20128` 대상으로 합니다. `--remote` (또는 활성 원격 컨텍스트)를 사용하면 해당 서버에서 카탈로그를 가져오고 구성을 로컬로 작성합니다.

| 명령                       | 도구                   | 무엇을 쓰는가                                                                                                                                                                    | 주요 플래그                                                                                                                                | 로컬 대 원격 |
| -------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI       | `~/.codex/<name>.config.toml` — 호환 가능한 텍스트 모델당 하나의 프로필(`codex --profile <name>`)                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 둘 다        |
| `omniroute setup-claude`   | Claude 코드            | `~/.claude/profiles/<name>/settings.json` — 일치하는 모델당 하나의 프로필(`CLAUDE_CONFIG_DIR`)                                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 둘 다        |
| `omniroute setup-opencode` | OpenCode (openai 호환) | `~/.config/opencode/opencode.json` — 모든 카탈로그 모델을 갖춘 `omniroute` 공급자(`opencode -m omniroute/<model>`)                                                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 둘 다        |
| `omniroute setup-cline`    | Cline                  | `~/.cline/data/{globalState,secrets}.json` (CLI 모드) + VS 코드 확장 설정을 인쇄합니다.                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 둘 다        |
| `omniroute setup-kilo`     | 킬로 코드              | `~/.local/share/kilo/auth.json` (CLI) + `kilocode.*` VS 로 병합합니다. 코드 `settings.json` 있는 경우                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 둘 다        |
| `omniroute setup-continue` | 계속 / `cn` CLI        | `~/.continue/config.yaml` — `provider: openai` 모델, `${{ secrets.OMNIROUTE_API_KEY }}` 통한 키                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 둘 다        |
| `omniroute setup-cursor`   | Cursor                 | 없음 — 인앱 단계를 인쇄합니다(Cursor config는 불투명합니다 SQLite).                                                                                                              | `--remote` `--api-key` `--only` `--port`                                                                                                   | 둘 다        |
| `omniroute setup-roo`      | 루코드                 | `~/.omniroute/roo-settings.json` (가져오기 문서) VS 코드 `settings.json` 존재하는 경우 + `roo-cline.autoImportSettingsPath` 설정합니다.                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 둘 다        |
| `omniroute setup-crush`    | 으깨다                 | `~/.config/crush/crush.json` — `openai-compat` 공급자, `$OMNIROUTE_API_KEY` 통한 키                                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 둘 다        |
| `omniroute setup-zed`      | Zed                    | `~/.config/zed/settings.json` — `openai_compatible.omniroute` 공급자(≤ 25 도구 지원 모델), `$OMNIROUTE_API_KEY` 통한 키                                                          | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | 둘 다        |
| `omniroute setup-goose`    | 거위                   | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + env 레시피를 인쇄합니다.                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 둘 다        |
| `omniroute setup-aider`    | 에이더                 | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + env 레시피를 인쇄합니다.                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 둘 다        |
| `omniroute setup-qwen`     | Qwen 코드              | `~/.qwen/settings.json` — V4 `modelProviders.openai` 배열 + `OMNIROUTE_API_KEY` `~/.qwen/.env`                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 둘 다        |
| `omniroute setup-5dive`    | 5dive(에이전트 함대)   | `$HOME` 아래에는 아무것도 없습니다 — 5dive를 작성합니다** 인증 프로필** (`/var/lib/5dive/auth-profiles/<name>/`) `5dive agent auth set` 를 통해; 루트 전용, 플릿 호스트에서 실행 | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | 둘 다        |
| `omniroute setup-whycodes` | WhyCodes               | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); 경로는 `$WHYCODES_HOME/config.toml` 또는 `~/.whycodes/config.toml` 입니다.                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 둘 다        |
| `omniroute run <target>`   | 런타임 시작(일반)      | 아무것도 — 올바른 env 및 args를 사용하여 `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` 를 생성합니다. Qwen 와 Gemini 임시 격리된 집을 사용합니다        | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 둘 다        |
| `omniroute launch`         | Claude 코드            | 아무것도 — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` 가 주입된 `claude` 생성합니다.                                                                                            | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 둘 다        |
| `omniroute launch-codex`   | OpenAI Codex CLI       | 없음 — `-c` 플래그를 통해 주입된 `omniroute` 공급자로 `codex` 생성합니다.                                                                                                        | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 둘 다        |

플래그에 대한 참고 사항(명령 소스에서 확인됨):

- `--remote <url>` — 원격 OmniRoute 에서 카탈로그를 가져옵니다( `--port` 및 활성 컨텍스트를 재정의함). `--api-key <key>` 해당 서버에 대한 자격 증명을 제공합니다(기본값은 `OMNIROUTE_API_KEY` env var 또는 활성 컨텍스트의 토큰).
- `--only <patterns>` — 쉼표로 구분된 하위 문자열; 일치하는 모델 IDs 만 유지합니다(예: `--only glm,kimi`). `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed` 에서 사용할 수 있습니다.
- `--dry-run` — 파일 시스템을 건드리지 않고 쓰여질 내용을 정확하게 인쇄합니다. 모든 `setup-*` 명령에서 사용 가능** 제외하고** `setup-cursor` (파일을 쓰지 않음).
- `--model <id>` — 모델 자동 검색 기능이 없는 도구에 필요합니다(또는 대화형으로 선택됨): Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. 이러한 도구는 비대화형 실행을 위해 `--yes` 도 허용합니다(그러면 `--model` 필요). `setup-opencode` `--model` 사용하여 기본 최상위 모델을 설정합니다.
- `omniroute run` 의 `--model <id>` 매니페스트의 대상별 연결(`bin/cli/cli-manifest.mjs`)을 따릅니다.** 보조원** `--model openai/<id>` 수신하고** 오픈코드** `--model omniroute/<id>` (접두사는 ID에 아직 포함되지 않은 경우에만 추가됩니다)** 퀀** 그리고** 쌍둥이자리** ID를 그대로 수신합니다.** 클로드** `ANTHROPIC_MODEL` 통해 가져옵니다.** 거위** `GOOSE_MODEL` 통해,** 이유 코드** `-P omniroute -m <id>` 통해 그리고** 사본** `-c model_providers.omniroute.*` args를 통해.**Qwen 는 `--model` 강제로 요구하는 유일한 실행 대상입니다.** — `omniroute run qwen` 없으면 명시적인 오류와 함께 `2` 종료됩니다.
- `--port <port>` — 로컬 OmniRoute 포트(기본값 `20128`, `--remote` 설정된 경우 무시됨) 모든 `setup-*` 와 두 런처 모두에 존재합니다.
- `omniroute run` 종료 코드: 자식 CLI 의 자체 종료 코드가 그대로 전파됩니다. `2` = 잘못된 인수(지원되지 않는 대상, 필수 `--model` 누락, 컨테이너 가드); `127` = 대상 바이너리가 `PATH` 에 없습니다. `130`/`143`/`129` `SIGINT`/`SIGTERM`/`SIGHUP` 에 의해 실행이 종료된 경우; `1` = 기타 런타임 실행 실패.
- 두 런처(`launch`, `launch-codex`)는 `setup-claude` / `setup-codex` 로 작성된 프로필과 기본 `claude` / `codex` 바이너리에 대한 통과 인수를 선택하기 위해 `--profile <name>` 허용합니다.

대화형 선택기는 설정 레시피에서도 공유됩니다.

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` 현재 `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` 및 `5dive` 에 대한 테스트된 레시피에 위임합니다. IDE 전용, MITM 및 가이드 전용 카탈로그 항목은 명시적인 `setup-*`/manual 흐름으로 유지되며 실행 가능한 대상으로 표시되지 않습니다.

> `setup-opencode` 는** 경량 openai 호환** OpenCode 통합. `@omniroute/opencode-plugin` 설치하는 더 풍부한 플러그인 통합인 `omniroute setup opencode` 도 있습니다. 그것들은 다른 명령입니다. 위의 테이블은 `setup-opencode` 문서입니다.
>
> 플러그인은 OpenCode major당 하나씩 두 개의 패키지로 제공됩니다. 두 로더는 서로 다른 진입점( OpenCode v1의 경우 `@omniroute/opencode-plugin`, OpenCode v2의 경우 `@omniroute/opencode-plugin-v2` 을 기대하기 때문입니다. v2 패키지는 새로운 패키지(`0.1.0`)이며 여전히 이동 중인 호스트 계약을 따르므로 가정하는 대신 OpenCode 시드 모양을 카탈로그 초안으로 읽어옵니다. `opencode.json` 에 `plugins` 항목을 추가하여 설치하십시오. `omniroute setup opencode` 여전히 v1 패키지를 설치합니다. 옵션과 자격 증명 조회 순서는 README 패키지에 있습니다.

---

## 로컬 사용법

OmniRoute가 `localhost:20128`에서 실행 중인 상태에서 사용하는 도구의 설정 명령만 실행하면 됩니다. 카탈로그는 로컬 서버에서 가져옵니다.

```bash
# Codex: 일치하는 모델별 프로필을 ~/.codex/에 작성
omniroute setup-codex
codex --profile glm52            # 생성된 프로필 사용

# Claude Code: 모델별 프로필을 작성한 다음 하나를 실행
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: 모든 카탈로그 모델이 포함된 openai 호환 공급자 작성
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY}를 통해 참조되며 디스크에는 절대 저장되지 않음
opencode -m omniroute/glm/glm-5.2 "..."

# 자동 검색을 지원하지 않는 도구에는 명시적인 모델이 필요함:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 아무것도 작성하지 않고 미리 보기:
omniroute setup-continue --dry-run
```

구성을 전혀 작성하지 않고 실행할 수도 있습니다(환경 변수 주입만 사용):

```bash
omniroute launch                 # Claude Code → 로컬 OmniRoute
omniroute launch-codex           # Codex CLI → 로컬 OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 명시적 명령 경로: -- 뒤에 오는 모든 항목을 그대로 전달
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## 원격 사용법

`--remote` + `--api-key`를 사용하여 설정 명령이 원격 OmniRoute를 가리키도록 합니다. 카탈로그는 원격 서버에서 가져오며, 구성은 로컬 머신에 작성됩니다.

```bash
# 원격 VPS의 OpenCode에서 glm/kimi 모델만 유지
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 먼저 OMNIROUTE_API_KEY 내보내기

# 원격 카탈로그에서 Codex 프로필 생성
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 원격 서버에 직접 연결하여 CLI 실행
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

매번 `--remote`/`--api-key`를 전달하는 대신 한 번 로그인하면 **활성 컨텍스트**가 이를 자동으로 제공합니다.

```bash
omniroute connect 192.168.0.15        # 범위가 지정된 토큰을 발급하고 컨텍스트를 저장
omniroute setup-codex                 # ← 이제 원격 카탈로그 사용
omniroute setup-opencode              # ← 동일
omniroute launch                      # ← 원격 서버에 연결된 Claude Code
```

컨텍스트, 범위 및 토큰 관리에 대해서는 [원격 모드](./REMOTE-MODE.md)를 참조하세요.

---

## 5dive 에이전트 플릿

[5dive](https://5dive.ai)는 장시간 실행되는 코딩 에이전트 플릿을 운영하며, 각 에이전트는 자체 Unix 사용자 계정 아래의 systemd 유닛입니다. 5dive 자체는 코딩 CLI가 아니므로 `omniroute run`으로 실행할 대상이 없습니다. 즉, `5dive`는 **구성 전용** 대상입니다.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

두 형식 모두 하나의 5dive **인증 프로필**을 작성하며, 이후 해당 프로필에 바인딩된 모든 `claude` 시트가 OmniRoute와 통신합니다. 이 대상에는 다음 세 가지 고유 사항이 있습니다.

- **플릿 호스트에서 root로 실행됩니다.** 5dive의 동작은 로컬 systemd 유닛과 root 소유 상태 디렉터리에 적용되며, 원격 모드는 없습니다. 이미 root가 아닌 경우 레시피는 `sudo`를 통해 다시 실행됩니다(`--no-sudo`를 사용하면 이 동작을 끄고 대신 명령을 출력합니다).
- **루프백이 아닌 경우 엔드포인트는 `https://`여야 합니다.** 에이전트의 API 키는 모든 요청에서 해당 URL을 통해 전송되며, 5dive는 외부 머신을 가리키는 평문 엔드포인트를 거부합니다. 사설 LAN 주소도 예외가 아닙니다.
- **각 시트 자체의 모델 고정 설정이 프로필보다 우선합니다.** 프로필에는 `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`이 포함되지만, 기본 모델 ID에 여전히 고정된 시트는 첫 번째 턴에서 _"선택한 모델에 문제가 있습니다"_라는 오류와 함께 실패합니다. 시트도 고정하려면 `--agent <name>`을 전달하세요(반복 가능). 전달하지 않으면 레시피가 해당 명령을 출력합니다.

API 키는 **stdin**을 통해 5dive에 전달되므로(`--api-key=-`) `ps` 출력에 절대 나타나지 않습니다.

프로필이 단일 모델이 아닌 OmniRoute **콤보**를 가리키도록 해야 플릿 공급자 장애 조치가 적용됩니다. [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578)에 기록된 실행에서는 기본 엔드포인트가 턴 중간에 완전히 다운되었지만, 에이전트는 대체 엔드포인트에서 남은 단계를 완료했으며 장애를 외부에 노출하지 않았습니다.

---

## 기본 URL 규칙( `/v1` 원하는 도구)

OmniRoute `/v1` 에 OpenAI 표면, 루트에 Anthropic 표면, `/v1beta` 에 기본 Gemini 표면을 노출합니다. 각 통합은 도구에서 예상하는 형식으로 연결됩니다(명령 소스에서 확인됨).

| 완성                                                                       | 기본 URL 작성 | `/v1`?                                              |
| -------------------------------------------------------------------------- | ------------- | --------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | 뿌리          | 아니요 - Cline `/v1/chat/completions` 추가합니다.   |
| `setup-goose` (`OPENAI_HOST`)                                              | 뿌리          | 아니요 - Goose가 경로를 추가합니다.                 |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 뿌리          | 아니요 - LiteLLM `/v1/chat/completions` 추가합니다. |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` 와 함께 | 예                                                  |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | `/v1` 와 함께 | 예                                                  |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | 뿌리          | 아니요 — Claude 코드가 `/v1/messages` 추가합니다.   |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` 와 함께 | 예                                                  |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` 와 함께 | 예                                                  |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 뿌리          | 아니요 - SDK 는 `/v1beta/models/…` 추가합니다.      |
| `setup-5dive` (인증 프로필의 `ANTHROPIC_BASE_URL` )                        | 뿌리          | 아니요 — Claude 코드가 `/v1/messages` 추가합니다.   |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | `/v1` 와 함께 | 예 — WhyCodes `/chat/completions` 게시합니다.       |

---

## 업데이트 시 네이티브 의존성 유지: `--include=optional`

`omniroute update`로 업데이트하면(확인 후 또는 `--apply` 사용 시),
OmniRoute는 `--include=optional`이 포함된 설치 명령을 실행합니다.

```bash
npm install -g omniroute@latest --include=optional
```

이것은 `omniroute update`에 전달하는 플래그가 **아닙니다**. 업데이터가 항상
적용합니다. 이 옵션은 npm 설정에 `omit=optional`이 지정되어 있더라도
`optionalDependencies`(`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM
스택)가 업데이트 후에도 유지되도록 보장합니다. 그렇지 않으면 네이티브 SQLite
드라이버와 OS 키링 바인딩이 별다른 알림 없이 제거될 수 있습니다. 실제로
적용하지 않고 정확한 명령을 미리 보려면 다음을 실행합니다.

```bash
omniroute update --dry-run
# [시험 실행] 다음 명령을 실행합니다: npm install -g omniroute@latest --include=optional
```

그 밖의 `omniroute update` 플래그(소스에서 확인됨): `--check`(구버전이면
종료 코드 1), `--apply`(확인 없이 설치), `--changelog`, `--no-backup`,
`--yes`.

---

## `omniroute run gemini`를 통한 Google Gemini CLI

`@google/gemini-cli` 0.50.0을 기준으로 동작이 확인되었습니다. CLI는
`GOOGLE_GEMINI_BASE_URL`을 따르며, 해당 URL에 대해
`POST /v1beta/models/<model>:generateContent`(및
`:streamGenerateContent?alt=sse`) 요청을 보냅니다. 이는 OmniRoute의 네이티브
Gemini 인터페이스(`/v1beta`)와 정확히 일치합니다. `omniroute run gemini`는
이를 자동으로 연결합니다.

- `GOOGLE_GEMINI_BASE_URL` → 활성 OmniRoute 기본 URL(루트, `/v1` 없음);
- `GEMINI_API_KEY` → 확인된 OmniRoute 자격 증명(옵션/환경 변수/컨텍스트);
- `.gemini/settings.json`에서 `gemini-api-key` 인증을 선택하는 **임시로 격리된
  `GEMINI_CLI_HOME`**. 따라서 저장된 Google OAuth 세션(Code Assist)이
  OmniRoute를 대상으로 한 실행을 재정의하지 않으며, 종료 후 제거됩니다;
- **환경 변수 정리**: 하위 프로세스 환경에서 `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_GENAI_USE_GCA`를 제거합니다. 이러한
  변수는 인증을 Vertex/Code Assist로 리디렉션할 수 있습니다. 또한 이중
  안전장치로 `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`를 설정합니다. 다른
  `run` 대상에도 각각 충돌하는 변수에 대해 동일한 처리가 적용됩니다;
- `--provider`/`--model`에 따른 `--model <id>` 삽입.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini의 작업 공간 신뢰 보호 기능은 헤드리스 모드에서도 계속 적용됩니다.
직접 `--skip-trust`를 전달하거나 디렉터리를 대화형으로 신뢰해야 합니다.
런처는 의도적으로 이를 우회하지 않습니다. 이 런처는 **ACP 등록**
(`src/lib/acp/registry.ts`, `gemini --acp`)과 별개이며, ACP 등록은 계속해서
`/dashboard/acp-agents`용 에이전트 프로토콜 통합으로 사용됩니다.

---

## 실제 스모크 스윕(옵트인)

결정론적 실행 계획 회귀 테스트는 CI에서 실행됩니다(`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). 실제 OmniRoute 서버를 대상으로 실제 바이너리를
검증하기 위한 옵트인 하네스는 `tests/integration/upstream-cli-smoke.int.test.ts`에 있습니다.
이 하네스는 자동으로 실행되지 않으며(`RUN_CLI_SMOKE=1`이 아니면 모든 하위 테스트를 건너뜀),
자격 증명의 값이 아닌 환경 변수 이름을 전달하고, 기록된 모든 출력에서 키 형태의 문자열을
마스킹하며, 바이너리가 설치되지 않은 대상을 건너뛰고, 실패를 단순한 불리언 값 대신
인증 / 업스트림 / 구성으로 분류합니다.

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

선택 사항: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"`는 스윕 대상을 제한하며,
`OMNIROUTE_SMOKE_TIMEOUT_MS`는 대상별 기본 제한 시간인 120초를 재정의합니다.

---

## 함께 보기

- [Claude Code 구성](./CLAUDE-CODE-CONFIGURATION.md) — 더 자세한 Claude Code 가이드
- [Codex CLI 구성](./CODEX-CLI-CONFIGURATION.md) — 일회성 `[model_providers.omniroute]` 기본 설정
- [원격 모드](./REMOTE-MODE.md) — 컨텍스트, 범위가 지정된 액세스 토큰, 원격 서버 제어
- [CLI 도구 레퍼런스](../reference/CLI-TOOLS.md) — 지원되는 도구와 대시보드 페이지의 전체 목록
- [설정 가이드](./SETUP_GUIDE.md) — 설치 방법 및 최초 실행 온보딩
