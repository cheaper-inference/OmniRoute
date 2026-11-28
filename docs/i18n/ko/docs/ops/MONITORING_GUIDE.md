# Monitoring & Observability Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **요약**: OmniRoute는 기본 제공 상태 모니터링, 공급자 오토파일럿, 할당량 추적 및 관측성 훅을 지원합니다. 이 가이드에서는 대시보드, 알림 및 문제 해결을 다룹니다.

**소스:**

- `src/lib/monitoring/observability.ts` — 관측성 스냅샷
- `src/lib/monitoring/comboHealthAutopilot.ts` — 콤보 상태 오토파일럿
- `src/lib/monitoring/providerHealthAutopilot.ts` — 공급자 오토파일럿
- `src/lib/monitoring/providerHealthMatrix.ts` — 공급자 상태 매트릭스
- `src/lib/localHealthCheck.ts` — 로컬 상태 검사
- `src/lib/tokenHealthCheck.ts` — 토큰 갱신 상태
- `src/lib/proxyHealth.ts` — 프록시 상태 캐시(PROXY_GUIDE.md에서 설명)

---

## 개요

OmniRoute에는 **3개의 모니터링 계층**이 있습니다:

```
┌──────────────────────────────────────────────────────────────┐
│  계층 1: 시스템 상태(서버 수준)                               │
│  ├─ localHealthCheck.ts — DB, 포트, 네이티브 종속성            │
│  ├─ db/healthCheck.ts — 무결성, FK, 고아 아티팩트              │
│  └─ 대시보드: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  계층 2: 공급자 상태(공급자별 복원력)                          │
│  ├─ providerHealthAutopilot.ts — 회로 차단기, 쿨다운           │
│  ├─ providerHealthMatrix.ts — 공급자/모델별 상태 점수          │
│  └─ 대시보드: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  계층 3: 실시간 관측성(런타임 스냅샷)                          │
│  ├─ observability.ts — 회로 차단기, 세션, 할당량               │
│  ├─ tokenHealthCheck.ts — OAuth 토큰 갱신 상태                │
│  └─ MCP 도구: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## 대시보드 페이지

### `/dashboard/health` (시스템 상태)

최상위 상태 대시보드에는 다음 정보가 표시됩니다:

| 섹션              | 표시 내용                                 |
| ----------------- | ----------------------------------------- |
| **서버 상태**     | 가동 시간, 버전, 포트, 활성 연결          |
| **데이터베이스**  | 연결, 무결성, WAL 크기, 최근 마이그레이션 |
| **공급자 요약**   | 활성 수, 정상 수, 열린 차단기 수          |
| **할당량 모니터** | 활성 세션, 알림 발생 중, 소진됨           |
| **최근 오류**     | 스택 트레이스가 포함된 최근 오류 10개     |
| **리소스 사용량** | 메모리, CPU, 힙 압력 표시기               |

### `/dashboard/providers` (공급자 상태)

공급자별 대시보드:

| 열     | 설명                                  |
| ------ | ------------------------------------- |
| 공급자 | 공급자 ID + 표시 이름                 |
| 상태   | 녹색/노란색/빨간색 상태               |
| 회로   | 열림/닫힘/반열림 상태                 |
| 연결   | 연결 수, 마지막 갱신                  |
| 모델   | 사용 가능한 모델, 모델별 상태         |
| 비용   | 오늘의 비용, 7일 추세                 |
| 오류   | 최근 24시간 오류 수, 주요 오류 클래스 |

공급자를 클릭하면 다음 정보를 확인할 수 있습니다:

- 지연 시간 분석이 포함된 최근 요청
- 연결별 상태 점수
- 모델별 잠금
- 오토파일럿 권장 사항

### `/dashboard/quota` (할당량 추적)

각 API 키에 대해 다음 정보가 표시됩니다:

- 현재 사용량과 한도 비교(진행률 표시줄)
- 할당량 추세(30일 차트)
- 다음 재설정 시간
- 알림 기록

### `/dashboard/combos` (콤보 상태)

콤보별 정보:

- 전략 + 대상
- 대상별 상태
- 최근 폴백 이벤트
- 성공률(24시간, 7일, 30일)

---

## 상태 확인 API

OmniRoute 노출** 둘** HTTP 건강 표면. 오케스트레이터에서는 서로 바꿔 사용할 수 없습니다.

| 길                           | 목적                                                             | 무게                           | 용도                                                         |
| ---------------------------- | ---------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| `GET /healthz`               | 라이프사이클 liveness/readiness (`ok` / `starting` / `stopping`) | 단순(단계 플래그만 해당)       | 쿠버네티스** 준비** ; 부드러운** 활력** HTTP 사용해야 한다면 |
| `GET /api/monitoring/health` | 딥 시스템 + 제공자 요약(DB, 힙, 카탈로그 수, ...)                | Heavy (동기 DB /모니터링 작업) | 대시보드, 블랙박스 심층 검사, Docker 의 내장 상태 검사       |

> **메모:** 공급자 상태 매트릭스, 자동 조종 문제, 할당량 모니터, 토큰 상태 및 `/api/monitoring/health` 이상의 대기 시간 세부 정보는 다음을 통해 제공됩니다.**MCP 도구** `observability_snapshot` 또는** 계기반** 페이지 — 전용 REST 경로가 없습니다.

두 노선 모두 다음 노선을 운행합니다.** 동일한 노드 이벤트 루프** 요청 처리로. CPU 바인딩된 경로(대규모 `GET /v1/models` 카탈로그 작업, 긴 컨텍스트 압축/토큰 계산)로 인해 지연될 수 있음** 모두** `/healthz` 포함한 HTTP 핸들러. 이벤트 루프 사용 중 ≠ 프로세스가 중단되었습니다. 돼지를 고치는 것을 선호합니다. 프로브 튜닝은 거짓 킬만 줄입니다.

### 경량 오케스트레이터 프로브

```bash
GET /healthz
# or HEAD /healthz
```

- **200** 서버 수명주기 단계가 준비된 경우 + body `ok`
- **503** 부팅 또는 종료 중 + `starting` / `stopping`
- 구현: `src/app/healthz/route.ts` ( DB 핑 없음)

### 시스템 상태(깊은)

```bash
GET /api/monitoring/health
```

응답:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: 프로브 캐시 대 SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` 는** 인메모리 프로브 캐시 게이지** , `provider_connections.test_status` 의 라이브 덤프가 아닙니다. #12532 이후 요청 경로는 `getCachedCredentialHealthSummary()` 만 읽습니다. 백그라운드 프로브는 이벤트 루프에서 캐시를 새로 고칩니다.

| 층                   | 어디                                                                  | 의미                                                                                                                                                                                                    |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 프로브 캐시 게이지   | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | 마지막 자격 증명 상태 프로브 결과는 여전히 프로세스 메모리에 보관되어 있습니다. `source` 항상 `probe-cache` 입니다.                                                                                     |
| 실패한 연결 세부정보 | `credentialHealth.failedConnections`                                  | 현재의** `failed > 0` 일 때만** . `status=error` (`connectionId`, `status`, 삭제된 `lastError` / `lastErrorType`)가 포함된 캐시 행의 제한된 목록입니다. `failedOmitted` 는 목록이 제한될 때 설정됩니다. |
| SQLite 끈적한 상태   | `credentialHealth.staleDbNonOkCount`                                  | 개수** 활동적인** (`is_active=1`) 지속된 `test_status` 정상이 아닌 것으로 알려진 연결 행(`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)입니다.                        |

두 레이어는 의도적으로 동의하지 않을 수 있습니다.

- `staleDbNonOkCount>0` — SQLite 에 최신 프로브 캐시 스냅샷이 `status=error` 로 계산되지 않는 고정 `test_status` (예: `expired` 또는 `credits_exhausted`)가 여전히 있는 동안 `failed=0` 측정하세요.
- SQLite 정상으로 보이는 동안 `failed>0` 측정합니다. — 최근 프로브가 실패하여 캐시되었습니다. DB 행이 업데이트되지 않았거나 나중에 지워졌습니다.

이 끝점을 스크래핑할 때 `provider_connections.test_status` 에만 경고하지 마세요. 라이브 프로브 실패의 경우 `failed` + `failedConnections` 사용하고 지속적인 고정 상태 카운트가 필요한 경우 `staleDbNonOkCount` 사용하십시오.

### Kubernetes 프로브 권장 사항

OmniRoute 는** 단일 노드 프로세스** (하나의 이벤트 루프). Stock Docker `HEALTHCHECK` 경량 `/healthz` 목표로 합니다. `/api/monitoring/health` 는** 너무 무거워** kubelet 활성 간격의 경우.

| 조사          | 추천대상                                                                 | 메모                                                                                                                                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **시작**      | 긴 `failureThreshold` (또는 큰 `startPeriod`)가 있는 HTTP `GET /healthz` | 콜드 스타트 + SQLite 마이그레이션은 몇 초를 초과할 수 있습니다.                                                                                                                                                                                                                                                                                |
| **준비**      | HTTP `GET /healthz`                                                      | 라이프사이클 `ok` / `starting` / `stopping` (200 대 503). 루프가 CPU로 차단된 경우에도 여전히 펄럭입니다. 에이** 몇 초 안에 200은 건강하지 않습니다** (#10303) — 이는 3바이트 핸들러가 실행되기 전에 이벤트 루프가 중단되었음을 의미합니다.                                                                                                    |
| **활성**      | HTTP `GET /livez`,** 또는 TCP** 기본 서비스 포트(`PORT`, 기본값 `20128`) | `/livez` 는 프로세스에만 적용됩니다(핸들러가 실행되는 경우 항상 200). 이는 여전히 이벤트 루프 — busy ≠ dead를 공유하며 TCP 보다 더 나은 이벤트 루프 기아(#10303)를 감지하지 못합니다. 선호하다**TCP** catalog/compression 로드 상태에서 HTTP 프로브가 시간 초과되면; 하다** ~ 아니다** 어느 쪽이든 짧은 이벤트 루프 정지 시 포드를 종료합니다. |
| **깊은 건강** | 외부 검사기의 `GET /api/monitoring/health`                               | kubelet `livenessProbe` /tight `readinessProbe` 에는 적합하지 않음                                                                                                                                                                                                                                                                             |

예시 형태(콜드 스타트 및 압축 부하에 대한 임계값 조정):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**하지 마십시오** 포인트 쿠블렛** 활력** `/api/monitoring/health` 에서. 해당 경로는 실제 DB/monitoring 작업을 수행하며 로드 시 거짓 긍정이 발생합니다.

관련 항목: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (이벤트 루프가 바쁜 동안 프로브), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (카탈로그 가격 책정 호그), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (압축 토큰 수 호그).

### systemd watchdog(동결된 이벤트 루프)

시스템 호스트에서 OmniRoute 준비가 되면 서비스 관리자에게 알리고 계속 핑을 보내므로 이벤트 루프가 멈춘 서버는 가만히 있는 대신 종료되고 다시 시작됩니다. 핑은 서버 자체 이벤트 루프에서 발생합니다. 핑이 차단되면 중지되고 `WatchdogSec` 핑 없이 경과되면 systemd는 서비스를 다시 시작합니다.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) 이미 이를 사용하여 사용자 단위를 작성합니다. 직접 작성한 유닛(기본값 `Type=simple`)에는 감시 기능이 없으므로 `[Service]` 섹션에 다음 줄을 추가하세요.

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

생성된 유닛은 `Restart=on-failure` 설정하므로 해당 행도 추가하지 않고 — 도 추가하면 워치독은 서비스를 다시 시작하는 대신 중단된 서비스만 종료합니다.

- `Type=notify`: 프로세스가 분기될 때가 아니라 서버가 `READY=1` 보낼 때 서비스가 "시작"됩니다. `TimeoutStartSec` 느린 시작을 제한합니다.
- `NotifyAccess=all`: 핑은 `omniroute serve` 감독자의 하위 프로세스인 서버 프로세스에 의해 전송됩니다.
- `WatchdogSec`: 핑은 60초마다 나오므로 다음을 사용하세요.** 120 이상** . 값이 작을수록 정상적인 서버가 다시 시작됩니다.
- `omniroute serve` 포그라운드에서 실행하세요. `--daemon` 장치의 cgroup에서 서버를 분리하고 알림 핸드셰이크가 완료되지 않습니다.

다시 시작한 후 활성화되어 있는지 확인하십시오.

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` 구성된 지연을 표시하고 `WatchdogTimestamp` 매분 앞으로 이동합니다. 워치독으로 인한 재시작은 `Result=watchdog` 로 기록됩니다. 장치를 그대로 유지하면서 핑을 끄려면 `OMNIROUTE_DISABLE_SD_NOTIFY=1` 설정하십시오. `NOTIFY_SOCKET` (터미널, Docker, Electron, Windows)가 없으면 아무것도 전송되지 않습니다.

워치독은 이벤트 루프가 계속 실행되는지만 확인합니다. 느리지만 계속 회전하는 서버는 다시 시작되지 않습니다.

### 선택적 요청 경로 작업(메모리, 기술, 토큰 새로 고침)

메모리 추출, 스킬 주입, OAuth 토큰 리프레시 등을 공유합니다.** 메인 노드 이벤트 루프** `/healthz` 로. 이는 작업자 풀이 아닌 대시보드 전환 기능(`memoryEnabled`, `skillsEnabled`)입니다. [환경 — 이벤트 루프 비용을](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) 참조하세요.

### 제공자 상태

> **REST 엔드포인트가 없습니다.** 공급자 상태 데이터는 MCP 도구 `observability_snapshot` 또는 대시보드 `/dashboard/providers` 페이지를 통해 사용할 수 있습니다.

### 제공업체 세부정보

> **REST 엔드포인트가 없습니다.** 공급자별 세부 정보는 대시보드 `/dashboard/providers` 페이지를 통해 확인할 수 있습니다.

---

## 제공자 상태 오토파일럿

`providerHealthAutopilot.ts` 모듈은 다음 작업을 수행하는 **자가 복구 시스템**입니다.

1. 제공자 문제 감지(회로 열림, 쿨다운, 잠금, 할당량 경고)
2. 문제 해결을 위한 **권장 작업** 생성
3. 선택적으로 위험도가 낮은 작업 **자동 실행**

### 감지되는 문제 유형

| 문제 종류                    | 심각도 | 조건 예시                              |
| ---------------------------- | ------ | -------------------------------------- |
| `provider_circuit_open`      | 심각   | 5회 실패 후 회로 차단기 열림           |
| `provider_circuit_half_open` | 경고   | 회로가 복구 여부를 테스트하는 중       |
| `connection_cooldown`        | 경고   | 429 응답 후 연결이 쿨다운 상태에 진입  |
| `stale_connection_error`     | 경고   | 마지막 새로 고침이 30분 이상 전에 실패 |
| `terminal_connection_error`  | 심각   | OAuth 취소 또는 키가 유효하지 않음     |
| `inactive_connection`        | 정보   | 설정에서 연결이 비활성화됨             |
| `model_lockout`              | 경고   | 특정 모델이 격리 상태임                |
| `quota_monitor_warning`      | 경고   | 할당량 사용률이 80% 이상임             |

### 생성되는 작업 유형

| 작업                           | 위험도 | 설명                             |
| ------------------------------ | ------ | -------------------------------- |
| `clear_provider_breaker`       | 중간   | 회로 차단기를 닫힘 상태로 초기화 |
| `clear_connection_cooldown`    | 낮음   | 연결의 쿨다운 제거               |
| `clear_stale_connection_error` | 낮음   | 오래된 오류 플래그 제거          |
| `clear_model_lockout`          | 낮음   | 격리된 모델을 다시 활성화        |
| `reactivate_connection`        | 중간   | 비활성화된 연결을 다시 활성화    |
| `deactivate_connection`        | 높음   | 문제가 있는 연결 비활성화        |

### API

> **REST 엔드포인트가 없습니다.** 오토파일럿 문제는 MCP 도구 `observability_snapshot` 또는 대시보드를 통해 확인할 수 있습니다. 오토파일럿은 내부적으로 실행되며, 환경 변수가 아니라 설정 DB(연결별 `autopilotMode` 필드)를 통해 동작을 구성합니다. 오토파일럿 모드 환경 변수를 `grep -rn`으로 검색하면 결과가 없습니다.

### 오토파일럿 모드

오토파일럿은 기본적으로 **수동 모드**로 작동합니다. 문제를 감지하고 권장 작업을 생성하지만 자동으로 적용하지는 않습니다. 작업은 대시보드를 통해 적용할 수 있습니다.

---

## 콤보 상태 오토파일럿

`comboHealthAutopilot.ts`는 제공자 오토파일럿에 대응하는 **콤보 전용** 시스템입니다. 다음 작업을 수행합니다.

- 비정상 콤보 감지
- 대상 순서 변경 권장
- 작동하지 않는 대상 비활성화 제안
- N회 실패 후 응답하지 않는 대상을 자동으로 제거

### 콤보 문제 예시

```
콤보 "always-on" (우선순위 전략)
├─ 대상 1: openai/gpt-5 (정상)
├─ 대상 2: anthropic/claude-opus-4-6 (⚠️ 14:00까지 모델 잠금)
└─ 대상 3: kiro/claude-sonnet-4-5 (정상)

권장 작업: 순서 변경 — 잠금이 만료될 때까지 kiro를 anthropic보다 위로 이동
```

---

## 할당량 모니터

`observability.ts`는 구독 제공자(Claude Code, Codex, GitHub Copilot)를 위한 **세션별 할당량 모니터**를 제공합니다.

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0~100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### 상태 의미

| 상태        | 해당 시점              | UI 작업                                |
| ----------- | ---------------------- | -------------------------------------- |
| `starting`  | 초기 폴링 진행 중      | 스피너                                 |
| `idle`      | 최근 활동 없음         | 대시보드에서 숨김                      |
| `healthy`   | 남은 할당량이 50% 초과 | 녹색 점                                |
| `warning`   | 남은 할당량이 50% 미만 | 노란색 경고                            |
| `exhausted` | 할당량이 0%            | 빨간색 차단 표시, 다음 제공자로 라우팅 |
| `error`     | 폴링 실패              | 빨간색 점, 곧 재시도                   |

### API

> **REST 엔드포인트가 없습니다.** 할당량 모니터 데이터는 MCP 도구 `observability_snapshot` 또는 대시보드를 통해 확인할 수 있습니다.

---

## 관측 가능성 스냅샷

MCP 도구 `observability_snapshot`은 AI 에이전트에 **완전한 시스템 스냅샷**을 반환합니다.

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* 위 내용 참조 */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

에이전트는 이를 사용하여 **라우팅 결정**을 내립니다. 예를 들어 "openai의 회로가 열려 있으면 anthropic으로 먼저 라우팅"합니다.

---

## 토큰 상태 확인

OAuth 제공자(Claude Code, GitHub Copilot, Cursor)는 **주기적인 토큰 갱신**이 필요합니다. `src/lib/tokenHealthCheck.ts`는 백그라운드 스케줄러를 실행합니다.

- **스윕 틱**: 60초마다(`src/lib/tokenHealthCheck.ts:30`의 `TICK_MS = 60 * 1000`에서 스윕)
- **연결별 상태 확인 간격**: 기본 60분(`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`), 설정 DB를 통해 구성 가능
- **401 발생 시 선제적 갱신**: 연결별 인터셉터에서 처리

### 토큰 상태

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### 구성

토큰 상태 확인 구성은 `tokenHealthCheck.ts`에서 내부적으로 처리됩니다.

### 토큰 상태

> **REST 엔드포인트가 없습니다.** 토큰 상태 데이터는 대시보드 또는 MCP 도구 `observability_snapshot`을 통해 확인할 수 있습니다.

---

## 알림

### 기본 제공 채널

OmniRoute는 **3개의 알림 채널**을 지원합니다.

| 채널          | 설정        | 사용 사례                 |
| ------------- | ----------- | ------------------------- |
| 대시보드 배너 | 항상 활성화 | 앱 내 알림                |
| Webhook       | URL 구성    | Slack, Discord, PagerDuty |
| 로그          | 기본값      | 외부 로그 집계용          |

### Webhook 구성

> **참고:** Webhook 알림 구성은 대시보드의 설정 페이지를 통해 처리됩니다. Webhook URL, 이벤트 필터링 및 페이로드 사용자 지정은 설정 UI를 참조하세요.

### 알림 유형

| 알림                         | 발생 조건                        | 기본 심각도 |
| ---------------------------- | -------------------------------- | ----------- |
| `provider_circuit_open`      | 회로가 열림                      | critical    |
| `provider_circuit_half_open` | 회로 복구 테스트                 | info        |
| `quota_warning`              | 할당량이 80% 이상                | warning     |
| `quota_exhausted`            | 할당량이 100%                    | critical    |
| `token_refresh_failed`       | 3회 이상 연속 갱신 실패          | warning     |
| `token_expired`              | 토큰이 만료 시점을 지남          | critical    |
| `combo_target_unhealthy`     | 콤보 대상이 1시간 이상 쿨다운 중 | warning     |
| `db_integrity_warning`       | FK 위반이 0건 초과               | warning     |
| `heap_pressure`              | 힙 사용량이 임계값의 80% 초과    | warning     |

---

## 성능 메트릭

### 추적되는 메트릭

| 메트릭                  | 유형       | 소스                            |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | 카운터     | `services/usage.ts`             |
| `request_latency_ms`    | 히스토그램 | `services/usage.ts`             |
| `tokens_consumed`       | 카운터     | `services/usage.ts`             |
| `cost_usd`              | 카운터     | `services/usage.ts`             |
| `provider_errors`       | 카운터     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | 카운터     | `services/resilience.ts`        |
| `cache_hits`            | 카운터     | `services/signatureCache.ts`    |
| `compression_savings`   | 히스토그램 | `services/compression/stats.ts` |
| `quota_used`            | 게이지     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | 게이지     | `observability.ts`              |

### 지연 시간 백분위수(p50/p95/p99)

> **REST 엔드포인트가 없습니다.** 지연 시간 백분위수 데이터는 대시보드의 `/dashboard/health` 페이지에서 확인할 수 있습니다. Prometheus/OpenTelemetry 내보내기는 v3.9에 예정되어 있습니다.

### Prometheus / OpenTelemetry 내보내기(2단계)

v3.9에 예정: Prometheus, OpenTelemetry, Datadog으로 네이티브 내보내기.

현재는 HTTP 기반 모니터링 시스템(Prometheus blackbox exporter, Datadog HTTP check 등)을 사용하여 `/api/monitoring/health`를 스크레이핑하세요.

---

## 알림 설정 예시

### Slack

> **참고:** 웹후크 알림은 대시보드의 설정 페이지를 통해 구성합니다. 전용 웹후크 환경 변수는 없습니다(`grep -rn` 실행 시 검색 결과가 0건입니다). 웹후크 URL, 이벤트 필터링 및 페이로드 사용자 지정은 설정 UI를 참조하세요.

### Discord

> 웹후크 알림은 Slack과 동일한 설정 UI 흐름을 사용합니다. Discord는 동일한 JSON 페이로드 형식을 허용합니다.

### PagerDuty

> 웹후크 알림은 동일한 설정 UI 흐름을 사용합니다. PagerDuty Events API v2 라우팅 키는 설정 UI에서 구성합니다.

### 사용자 지정 웹후크(JSON)

> JSON 본문을 포함한 POST 요청을 허용하는 모든 HTTP 엔드포인트를 사용할 수 있습니다. 설정 UI에서 URL을 구성하세요.

---

## 대시보드 구성

### 상태 대시보드 사용자 지정

`~/.omniroute/dashboard.json`을 생성하세요.

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### 공급자를 맨 위에 고정

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## 문제 해결

### "공급자는 정상이라고 표시되지만 요청이 실패합니다"

1. **자동 조종 문제**를 확인하세요. 모델이 차단되었을 수 있습니다.
2. **최근 오류**에서 구체적인 오류 클래스를 확인하세요.
3. 공급자 카드에서 **연결 테스트**를 시도하세요.
4. 공급자가 **업스트림에서 속도 제한**을 받고 있는지 확인하세요(로컬에서는 확인할 수 없음).

### "할당량은 정상이라고 표시되지만 429 오류가 발생합니다"

- 429는 공급자 측에서 할당량을 모두 사용했다고 판단했음을 의미합니다.
- OmniRoute의 할당량 추적 정보가 **오래되었을** 수 있습니다. 공급자의 업스트림 정보가 정확한 기준입니다.
- 할당량 데이터는 내부 할당량 모니터를 통해 자동으로 새로 고쳐집니다.

### "모든 대상이 정상으로 보이지만 콤보가 실패합니다"

- **콤보 상태** 대시보드에서 대상 순서 문제를 확인하세요.
- **폴백 이벤트**를 확인하세요. 콤보가 너무 빨리 모든 대상을 소진하고 있을 수 있습니다.
- **전략**이 사용 사례와 일치하는지 확인하세요(우선순위, 라운드 로빈 또는 자동).

### "데이터베이스 상태 확인에 실패합니다"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`를 실행하세요.
- 결과가 "ok"이면 오탐이며, 상태 확인이 너무 엄격하게 수행되고 있는 것입니다.
- 그 외의 결과가 나오면 **OmniRoute를 중지**하고 [재해 복구 가이드](./DATABASE_GUIDE.md#disaster-recovery)를 따르세요.

### "메모리 힙 압박이 심각합니다"

```bash
# 현재 힙 확인
node -e "console.log(process.memoryUsage())"

# 수동 GC 실행(--expose-gc를 사용하는 경우)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# 동시 요청 수 줄이기(환경 변수가 아닌 대시보드의 설정 페이지에서 지정)
# `MAX_CONCURRENT_REQUESTS` 환경 변수는 없습니다. 설정 → 동시성에서 구성하세요.
```

---

## 참고 자료

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 사용량 및 비용 추적
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB 스키마 및 상태
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — 프록시 상태(별도 캐시)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 시스템 아키텍처
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 서킷 브레이커 상세 정보
- 소스: `src/lib/monitoring/` (파일 4개, 2121 LOC)
