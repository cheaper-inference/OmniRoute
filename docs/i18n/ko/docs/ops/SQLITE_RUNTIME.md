# SQLite Runtime Resolution (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute는 시작 시 5단계 폴백 체인을 통해 SQLite 드라이버를 결정합니다:

1. **번들된 `better-sqlite3`** (`package.json`의 `dependencies`를 통해 제공)
   — 가장 빠르며 네이티브 바이너리를 사용하고, 빌드 도구가 있으면 `npm install` 시 설치됩니다.

2. **런타임에 설치된 `better-sqlite3`** (`~/.omniroute/runtime/`)
   — 최초 실행 시 지연 설치되거나 **또는** `scripts/build/postinstall.mjs → scripts/postinstall.mjs`에 의해 설치됩니다.
   로드하기 전에 네이티브 `.node` 매직 바이트(ELF / Mach-O / PE)를 검증하여
   손상되었거나 다른 플랫폼용인 바이너리로부터 보호합니다.

3. **`node:sqlite`** (Node ≥22.5 표준 라이브러리) — 네이티브 빌드가 필요하지 않으며,
   두 better-sqlite3 경로가 모두 실패할 때 사용됩니다. 기능은 제한적입니다.

4. **`sql.js`** (WASM) — 최종 폴백입니다. 어디서나 작동하지만 더 느리고
   데이터를 동기식이 아니라 일정 간격으로 기록합니다.

## 왜 이렇게 복잡한가요?

- **Windows EBUSY**: 실행 중인 프로세스가 이전 버전의
  `better_sqlite3.node`를 잠그고 있으면 `npm install -g omniroute@latest`가 실패할 수 있습니다.
  `~/.omniroute/runtime/`에 런타임 설치하면 전역 npm 캐시를 우회할 수 있습니다.
- **빌드 도구 없음**: 일부 환경(VS Build Tools가 없는 기업용 Windows,
  최소 Docker 이미지)에서는 `better-sqlite3`를 컴파일할 수 없습니다. 런타임
  설치 프로그램은 npm 레지스트리에서 사전 빌드된 바이너리를 가져오며, 이 작업이 실패하더라도
  폴백 드라이버를 통해 OmniRoute를 계속 시작할 수 있습니다.
- **에어갭 시스템**: npm 레지스트리에 연결할 수 없는 경우에도 `node:sqlite`
  또는 `sql.js`가 기본 기능을 보장합니다.

## 매직 바이트 검증

런타임에 설치된 `.node` 파일을 로드하기 전에 OmniRoute는 처음 8
바이트를 읽고 알려진 플랫폼 매직 값과 비교합니다:

| 플랫폼              | 바이트(16진수) | 레이블      |
| ------------------- | -------------- | ----------- |
| Linux               | `7F 45 4C 46`  | `elf`       |
| macOS 64비트 BE     | `FE ED FA CF`  | `macho`     |
| macOS 64비트 LE     | `CF FA ED FE`  | `macho-le`  |
| macOS fat(유니버설) | `CA FE BA BE`  | `macho-fat` |
| Windows             | `4D 5A` (MZ)   | `pe`        |

매직 값이 일치하지 않으면 → 파일을 무시하고 다음 폴백 단계로 진행합니다.

## 활성 드라이버 확인

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## 수동 제어

```bash
# 빠른 CI 설치를 위해 postinstall 준비 작업 건너뛰기
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# 런타임 better-sqlite3 강제 재설치
rm -rf ~/.omniroute/runtime
omniroute  # 다음 시작 시 재설치됨

# 활성 드라이버 확인
omniroute config db-info  # (CLI 명령이 존재하는 경우)
```

## 동기식 정지 진단

`better-sqlite3`를 사용할 때 시작 전에 `OMNIROUTE_SQLITE_SLOW_MS=200`을 설정하면
동기식 어댑터 타이밍 측정을 활성화할 수 있습니다. 기본적으로 비활성화되어 있습니다. 완료된 작업에
최소한 지정된 밀리초 이상이 걸리면 어댑터별로 10초당 최대 한 번
`[SQLITE-SLOW]` 경고가 발생합니다. 경고에는 드라이버, 작업 클래스
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, 트랜잭션 또는 유지 관리), 그리고
경과 시간(밀리초)만 포함됩니다. SQL, 바인딩, 행, 경로 또는 예외 텍스트는 포함되지 않습니다.

이는 진단 보조 수단이며 타임아웃이나 쿼리 최적화 기능이 아닙니다. 반환되지 않는
작업을 보고하거나, CPU 작업과 디스크 대기를 구분하거나, 정확한 SQL을 식별하거나,
원시 드라이버 핸들을 통해 수행된 작업을 관찰할 수 없습니다.
비동기 백업 시간은 의도적으로 제외되며, 다른 SQLite 드라이버에는 이 옵트인 계측이
적용되지 않습니다. 변수를 비활성화하면 타이밍 래퍼가 없는 원래 어댑터로
복원됩니다. 데이터베이스 스키마나 저장된 구성은 변경되지 않습니다.

`/healthz` 지연 경고는 전체 수명 동안의 평균이 아니라 이전 샘플 이후의
이벤트 루프 최댓값을 보고합니다. 정지 원인을 SQLite 또는 디스크 장애로 판단하기 전에
해당 타임스탬프를 느린 작업 경고 및 호스트/스토리지 메트릭과 연관 지어 확인하세요.

## 참고 자료

구현:

- `bin/cli/runtime/magicBytes.mjs` — 바이너리 매직 바이트 검증 헬퍼
- `bin/cli/runtime/sqliteRuntime.mjs` — 5단계 런타임 리졸버 + 지연 설치 프로그램
- `bin/cli/runtime/index.mjs` — 시작 오케스트레이터(`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm 설치 후 훅(실패해도 치명적이지 않은 준비 작업)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` 내보내기

## 단일 작성자 토폴로지(HA 미지원)

위의 드라이버 폴백 체인은 여전히 **하나의 프로세스**에서 실행됩니다. 기본 SQLite
OmniRoute는 **단일 작성자**입니다:

- 두 OmniRoute 복제본을 동일한 `storage.sqlite` 파일에 연결하지 마세요.
- 컨테이너 재시작, Recreate 배포, OOM 종료 또는 HEALTHCHECK 재시작이 발생하면
  진행 중인 모든 SSE 세션이 끊어집니다. 기본 경로에는 세션 드레이닝이 없습니다.
- 느린 `/healthz`를 비정상 상태로 간주하는 오케스트레이터의 활성 상태 검사는 유일한
  복제본을 종료합니다. TCP 활성 상태 검사 + HTTP `/healthz` 준비 상태 검사를 권장합니다. 자세한 내용은
  [Docker 가이드 — 가용성](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  및 [Kubernetes 프로브 권장 사항](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)을 참조하세요.
