# CLAUDE.md (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**모든 프로젝트 규칙은 [`AGENTS.md`](AGENTS.md) 에 있습니다.** — 모든 AI 보조자를 위한 단일 진실 소스입니다. 위의 가져오기는 이미 로드되어 있습니다. 여기에 프로젝트 규칙을 다시 추가하지 마세요. 아래의 모든 내용은 `AGENTS.md` 에 이미 정의된 규칙의 Claude 코드 — 운영 개선에 ONLY 적용합니다.

## 작업 트리 격리 — Claude 코드 세부 사항

- 운영자가 이미 알려주지 않은 한 `AskUserQuestion` (Hard Rule #19)를 통해 운영자에게 기본 분기를 확인하세요.
- `scripts/dev/new-worktree.sh <branch> <confirmed-base>` 사용하여 작업 트리를 생성한 다음( `.claude/worktrees/` 아래에 있고 `node_modules` 하드 링크하고 `.husky/_` 를 복사함) `path` 사용하여 `EnterWorktree` 호출합니다. 항상 베이스를 전달하세요. 베이스가 없으면 스크립트는 가장 높은 `release/*` 선택하는데, 이는 운영자가 확인한 것이 아닐 수도 있습니다. `EnterWorktree` 자체적으로 생성하는 작업 트리에는 하드 링크나 후크가 없으므로 사전 커밋 게이트가 실행되지 않습니다.

## 하위 에이전트 및 git

git(에이전트 도구 또는 작업 흐름 스크립트)을 건드리는 모든 하위 에이전트는 프롬프트 — 에서 하드 규칙 #22 a의 `git stash` 금지 축어를 얻습니다. 기록된 숨김 사고의 재발은 하위 에이전트를 통해 발생했습니다.

## 계획 아티팩트 — 초능력 경로 재정의

초능력 기술은 `docs/superpowers/plans/`, `docs/superpowers/specs/` 및 `docs/research/` 에서 기본값을 알립니다. 작성하기 전에 `AGENTS.md` → "Planning & Research Artifacts"에서 해당 `_tasks/` 에 해당하는 내용을 각각 다시 작성하고, 기본 저장소에는 절대 `git -C _tasks …` 로 커밋하지 마세요.

## 스크래치 파일 — `_artifacts/`, `/tmp` 아님

이 프로젝트는 하네스의 세션 스크래치패드(`/tmp/claude-*/…`)를 재정의합니다. 임시 파일 — 내보내기, 생성된 zip, 일회성 중간 출력 — 에서 `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` 로 작성: gitignored 루트 `_*` 경로이므로 운영자는 모든 스크래치를 한 곳에서 찾아 삭제합니다. 내구성 있는 계획, 사양, 연구 및 핸드오프는 대신 `_tasks/` 로 이동합니다(엄격한 규칙 #23).

## 레드 베이스

누적된 빨간색 상태(기본 팁 + red PRs)를 배출하려면 `/sweep-reds` 스킬을 사용하세요.
