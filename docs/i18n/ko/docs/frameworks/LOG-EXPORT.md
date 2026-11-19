# Log export (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute 호출 로그를 외부 분석 저장소로 지속적으로 증분 내보내기합니다.

로그 대시보드 탭은 요청 이력을 SQLite(`call_logs`)에 보관하며, 보관 범위는
로테이션 및 보존 정책에 따라 제한됩니다. 로그 내보내기는 동일한 레코드 집합을 일정에 따라 외부로 전송하므로
로컬 데이터베이스보다 오래 보관하고 다른 데이터와 조인할 수 있습니다. 첫 번째 대상은 BigQuery이며,
파이프라인은 레지스트리 구조이므로 기존 구조를 유지하면서 대상을 추가할 수 있습니다.

---

## 1. 작동 방식

```
서버(구성 복호화 + 검증, 커서 조정)
  → 시작 IPC → 격리된 exportChild OS 프로세스
    → 읽기 전용 storage.sqlite → 공통 호출 로그 쿼리/매핑
      → 비동기 아티팩트 로드 → 대상 prepare()/send()
        → 배치 IPC → 서버가 커서 저장 → 확인 응답 IPC
          → 다음 배치; 완료 IPC → 서버가 성공 기록
```

- **일정** — `JobRegistry` cron 작업인 `log_export` 하나를 사용하며, 기본값은 `0 * * * *`(매시간,
  UTC)입니다. `src/lib/initCloudSync.ts`에 등록되며, `OMNIROUTE_LOG_EXPORT_CRON`으로 재정의할 수 있습니다.
  각 실행 시점마다 **활성화된** 모든 대상의 내보내기 대기 데이터를 순차적으로 처리합니다.
- **커서** — SQLite의 암시적 `call_logs.rowid`를 사용하며, 대상별로
  `log_export_destinations.cursor_row_id`에 저장됩니다. `timestamp`는 의도적으로 커서로 사용하지 않습니다. 호출자가
  자체 값을 지정할 수 있으므로, 느린 요청이 나중에 시작된 더 빠른 요청보다 늦게 기록될 수 있으며,
  타임스탬프 커서는 이러한 요청을 건너뛰게 됩니다.
- **배치 처리** — 요청당 `batch_size`개 행(기본값 500), 실행당 `max_rows_per_run`개 행
  (기본값 10000)을 처리하여, 대량의 대기 데이터가 한 번의 실행을 막는 대신 여러 실행 시점에 걸쳐 처리되도록 합니다.
- **전달** — 커서는 `send()`가 성공적으로 완료된 후에만 이동합니다. 배치가 실패하면
  커서는 기존 위치에 머무르므로, 다음 실행에서 동일한 행을 재시도합니다. 보장되는 것은
  최소 한 번 전달과 대상 측 중복 제거의 조합이며, 엄밀한 의미의 정확히 한 번 전달은 아닙니다. BigQuery는 각
  행의 키로 호출 로그 ID를 사용하며, 자체 중복 제거 기간 내에서 최선형 방식으로 이를 반영합니다.
- **중복 실행 방지** — cron 실행과 `POST .../run`이 동시에 발생할 수 있습니다. 이미
  처리 중인 대상은 두 번 처리하는 대신 건너뛰므로(실행 결과에 `skipped: true` 표시),
  동시 실행으로 인해 배치를 재전송하거나 커서를 이전 위치로 되돌려 기록할 수 없습니다.
- **전체 삭제 후 복구** — `cursor_row_id`가 `MAX(rowid)`보다 커지면(전체 테이블이
  삭제되고 rowid가 다시 시작된 경우), 실행기는 이후 데이터를 영구적으로 놓치는 대신 커서를 0으로 되돌립니다.

### 격리된 실행기와 제한

Node에서 각 대상을 실행할 때마다 별도의 단기 OS 자식 프로세스(IPC를 사용하는 `child_process`이며,
`worker_threads`가 아님)를 시작합니다. 본문 읽기, 페이로드 JSON 파싱/직렬화, 대상의
`prepare()` 및 대상 네트워크 I/O는 모두 서버의 이벤트 루프가 아니라 이 프로세스에서 실행됩니다.
IPC로 전달되는 것은 구성과 작은 진행 상황 메시지뿐이며, 내보낸 레코드는
서버로 돌아오지 않습니다. cron 작업과 지금 실행 라우트는 동일한 외부 공개 결과와 중복 실행 방지 기능을 유지합니다.

자식 프로세스는 `node:sqlite`를 사용하여 서버에서 확정된 `DATA_DIR/storage.sqlite`를 읽기 전용으로 열며,
`busy_timeout=5000` 및 `query_only=ON`을 적용합니다. DB 싱글턴을 가져오지 않으며
마이그레이션, 백업 또는 SQLite 업데이트를 수행하지 않습니다. 누락되거나 손상된 아티팩트의 상태 관리(손상된
아티팩트에 대한 UPDATE 포함)는 대시보드 상세 조회 경로에서만 수행됩니다. 두 경로는 순수 함수 형태의
상세 정보 리졸버를 공유합니다. 내보내기는 비동기 파일 시스템 읽기를 사용하며, 아티팩트 → 레거시
인라인 → 레거시 디스크 → 없음의 동일한 조회 순서를 따릅니다. 실행 시 자식 프로세스가 리더를 열 때 최대 삽입 rowid를
스냅샷으로 저장하며, 이후 삽입된 데이터는 다음 실행까지 대기합니다. 이는 삽입 경계일
뿐, 장시간 유지되는 SQLite 트랜잭션이 아닙니다. 네트워크 대기 중에도 WAL 쓰기 작업과 체크포인트는 자유롭게
진행됩니다. 이 경계는 기존 행의 업데이트/삭제를 동결하지 않습니다.

각 배치가 수락된 후 자식 프로세스는 확인 응답을 기다립니다. 서버는 먼저
`advanceLogExportCursor`로 커서를 저장한 다음 `ack`를 보냅니다. 그전에는 다음 배치를 시작하지 않습니다.
전송 실패, 비정상 종료 또는 시간 초과가 발생하면 해당 배치의 커서를 이동하지 않고 실패를 기록합니다. 이전에
확인 응답을 받은 배치는 커밋된 상태로 유지되며, 재전송될 수 있는 것은 확인 응답을 받지 못한 배치 최대 하나뿐입니다.
성공은 `done` 수신과 자식 프로세스의 정상 종료 후에만 기록됩니다. 실패 시에는 SIGTERM으로 자식 프로세스를
종료하고, 500 ms 후에는 SIGKILL로 강제 종료하며, 실행기는 프로세스 종료를 기다립니다.

| 환경 변수                                     | 기본값 | 용도                                  |
| --------------------------------------------- | ------ | ------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | 대상별 실제 경과 시간 제한            |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | 자식 프로세스의 V8 old-space 제한(MB) |

유효하지 않은 값, 양수가 아닌 값 또는 정수가 아닌 값에는 기본값이 적용됩니다. 힙 설정은 전체
RSS 제한이 아닙니다. 배치가 매우 크면 여전히 자식 프로세스의 메모리가 고갈될 수 있으며, 이 경우 실행은 안전하게 실패합니다.
기본값인 1024 MB는 본문을 포함하는 512 KiB 아티팩트의 기본 500행 배치를 처리할 수 있도록
여유 공간을 확보하며, 여기에는 BigQuery의 바이트 단위 청크 JSON 직렬화도 포함됩니다. 이 설정이
본문을 포함하는 10000행 배치까지 안전하게 처리할 수 있게 하는 것은 아닙니다. V8 힙이 고갈되면 조치 가능한 실패가 기록됩니다. 배치
크기를 줄이거나 `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`를 높이세요. 커서는 마지막으로
확인 응답을 받은 배치 위치에 유지됩니다. 과거의 인라인/디스크 본문에는 최신 아티팩트 크기 제한이 적용되지 않습니다.
운영자는 특히 메모리가 제한된 컨테이너 내부에서 RSS를 별도로 산정해야 합니다.

자식 프로세스는 해석된 `DATA_DIR`, `NODE_ENV`, 명시적으로 지정된 `TZ`(레거시 파일명의
현지 시간 해석용), 존재하는 경우 `ELECTRON_RUN_AS_NODE`, 그리고 다음 아웃바운드 입력만 상속합니다:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY`(및 각각의 소문자 형태),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
전역 Undici 디스패처는 `NO_PROXY`를 포함하여 서버의 순수 환경 변수 기반 프록시 해석 및 로컬 호스트
우회 규칙을 공유하며, `proxyFetch.ts`나 해당 DB/기능 플래그를 가져오지 않습니다.
프록시 자격 증명은 전달되는 출력과 기록된 오류에서 마스킹됩니다. 대상 자격 증명은
시작 IPC 메시지 하나로만 전달되며, argv나 환경 변수로는 전달되지 않습니다. 출력/오류 전달 시에는
접두사를 붙이고 민감한 정보를 제거합니다. cron 실행마다 Node의 SQLite 경고가 반복되지 않도록 자식 프로세스 실행 인수에서는
`ExperimentalWarning`만 비활성화하며, 다른 유형의 경고는 계속 표시됩니다.

대상 모듈은 Next.js/서버 전용 의존성 없이 가져올 수 있어야 합니다. 기존
BigQuery 구현은 이미 이 계약을 충족합니다. 액세스 토큰 캐시는 자식 프로세스가
실행되는 동안만 유지되며, 실행 간에는 유지되지 않습니다. 지원되는 런타임은 Node(`package.json`의 engines)이지만, README의 Bun
설치 섹션과 `Dockerfile.bun`에서도
`bun:sqlite`(`src/lib/db/core.ts` / 어댑터)를 사용하는 프로덕션 호환 경로를 안내합니다. 따라서 Bun에서는 내보내기가 기존
프로세스 내 실행 경로를 유지하고, 자식 프로세스의 힙/시간 제한 격리를 사용할 수 없다는 경고를 한 번 표시합니다.
이벤트 루프 및 OOM 격리가 필요하면 Node를 사용하세요. 여기서는 Bun을 개발 전용으로 취급하지 않습니다.

`includeBodies`를 활성화한 경우, 한 시간 분량의 페이로드가 밀리지 않도록
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` 같은 분 단위 주기를 권장합니다.
배치 및 행 제한은 여전히 각 실행에 적용됩니다. 프로세스 시작 비용은 실행할 때마다 대상별로 발생합니다.
이는 작은 시작 비용을 감수하여 서버 이벤트 루프를 격리하는 방식이며, 전체 CPU 사용량을 줄이는 것은 아닙니다.

### 페이로드(프롬프트 및 완성 응답)

기본적으로 내보내기에는 로그 **목록**에 표시되는 요약 필드만 포함됩니다.
**프롬프트 및 응답 내보내기**(`includeBodies`)를 켜면 각 호출에 대해 로그 **상세**
창에 표시되는 다음 내용도 전송됩니다:

| 필드                             | 포함 내용                                          |
| -------------------------------- | -------------------------------------------------- |
| `request_body` / `response_body` | 대시보드에 렌더링되는 호출 페이로드                |
| `pipeline_route_decision`        | 라우터가 선택한 대상 및 모델                       |
| `pipeline_client_request`        | 클라이언트가 보낸 그대로의 원본 요청               |
| `pipeline_openai_request`        | 내부 OpenAI 형식으로 변환된 요청                   |
| `pipeline_provider_request`      | 공급자 형식으로 업스트림에 실제 전송된 요청        |
| `pipeline_provider_response`     | 원본 업스트림 응답                                 |
| `pipeline_client_response`       | 호출자에게 반환된 내용                             |
| `pipeline_error`                 | 실패한 호출의 파이프라인 수준 오류 상세 정보       |
| `bodies_truncated`               | 위 필드 중 하나라도 `maxBodyBytes`에 도달하면 true |

여기에는 프롬프트 내용이 포함되므로 **기본적으로 꺼져 있으며**, 의도적으로 대상별로 선택하도록 되어 있습니다.
내보내기와 `getCallLogById`가 상세 정보 해석 로직을 공유하므로, 전송되는 내용은 대시보드에 표시되는 내용과 같습니다.
페이로드는
기록 시점에 이미 개인 식별 정보(PII)가 정제되고 비밀 정보가 마스킹되며,
`noLog` API 키로 수행된 호출은 페이로드를 전혀 저장하지 않으므로 내보낼 내용이 없습니다.

페이로드는 파일 시스템 아티팩트에서 행별로 읽으므로, 이를 요청한 대상에 대해서만
하이드레이션이 실행됩니다. 아티팩트가 없거나 손상된 경우 배치를 실패시키고 커서를 진행하지 못하게 하는 대신,
페이로드가 null인 요약을 내보냅니다.

`maxBodyBytes`(기본값 262144)는 각 필드의 크기를 제한합니다. 더 긴 페이로드는 **삭제되지 않고
잘립니다**. 잘린 프롬프트라도 "무엇을 요청했는지"는 알 수 있으며, 해당 행에는
`bodies_truncated` 플래그가 설정됩니다. 스트리밍된 청크별 델타는 내보내지 않습니다. 조립된 응답이
이미 `pipeline_provider_response`와 `pipeline_client_response`에 들어 있습니다.

---

## 2. 파일

| 구성 요소               | 위치                                         |
| ----------------------- | -------------------------------------------- |
| 대상 계약               | `src/lib/logExport/types.ts`                 |
| 레지스트리              | `src/lib/logExport/registry.ts`              |
| 비밀 정보 처리          | `src/lib/logExport/secrets.ts`               |
| 실행기 (부모 IPC)       | `src/lib/logExport/runner.ts`                |
| 프로세스 수명 주기      | `src/lib/logExport/childRunner.ts`           |
| 자식 프로세스 진입점    | `src/lib/logExport/exportChild.ts`           |
| 읽기 전용 연결 열기     | `src/lib/db/logExportReadOnly.ts`            |
| 공유 쿼리/매핑          | `src/lib/usage/callLogExportQueries.ts`      |
| 상세 정보 리졸버        | `src/lib/usage/callLogDetailResolver.ts`     |
| API 표현 변환           | `src/lib/logExport/presenter.ts`             |
| BigQuery 대상           | `src/lib/logExport/destinations/bigquery.ts` |
| Google 서비스 계정 인증 | `src/lib/logExport/googleServiceAccount.ts`  |
| 호출 로그 소스          | `src/lib/usage/callLogExportSource.ts`       |
| 영속화                  | `src/lib/db/logExportDestinations.ts`        |
| Cron 작업               | `src/lib/jobs/logExportJob.ts`               |
| REST 계층               | `src/app/api/log-export/`                    |
| 대시보드 페이지         | `src/app/(dashboard)/dashboard/log-export/`  |

스키마: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

모든 라우트에는 관리 인증이 적용됩니다 (`requireManagementAuth`). 비밀 정보는 절대 반환되지 않습니다:
저장된 비밀 정보는 리터럴 `__stored__`로 반환되며, 업데이트 시 이 값을 다시 보내면
저장된 자격 증명이 유지됩니다.

비밀 정보를 선언하는 유형의 대상을 생성하거나 업데이트하려면 **`STORAGE_ENCRYPTION_KEY`가
필요합니다**. 이 키가 없으면 `encrypt()`가 아무런 경고 없이 입력값을 그대로 반환하므로,
자격 증명을 SQLite에 평문으로 저장하는 대신 400 응답으로 쓰기를 거부합니다 (Telegram 웹훅에
적용되는 것과 동일한 보호 장치입니다).

| 메서드   | 경로                                     | 용도                                                   |
| -------- | ---------------------------------------- | ------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | 대상 유형 및 각 유형의 설정 필드 목록                  |
| `GET`    | `/api/log-export/destinations`           | 대상 목록 조회 (비밀 정보 마스킹)                      |
| `POST`   | `/api/log-export/destinations`           | 대상 생성                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | 단일 대상 조회                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | 이름 / 활성화 여부 / 설정 / 배치 처리 업데이트         |
| `DELETE` | `/api/log-export/destinations/{id}`      | 삭제                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | 자격 증명 확인, 쓰기 작업 없음                         |
| `POST`   | `/api/log-export/destinations/{id}/run`  | 지금 대기 항목 모두 처리, 예약 실행과 동일한 경로 사용 |
| `GET`    | `/api/log-export/status`                 | Cron 상태, 최근 실행, 대상별 미처리 항목               |

`GET /api/log-export/types` 덕분에 UI를 범용적으로 구현할 수 있습니다: 반환된 필드 설명자를 바탕으로
대시보드 양식이 렌더링되므로 새 대상을 추가해도 UI를 변경할 필요가 없습니다.

---

## 4. BigQuery 대상

구성 키 (`type: "bigquery"`):

| 키                   | 참고                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------ |
| `projectId`          | 데이터셋을 보유한 GCP 프로젝트                                                       |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                      |
| `tableId`            | `[A-Za-z0-9_]+`                                                                      |
| `location`           | 데이터셋을 생성해야 할 때만 사용됨 (기본값 `EU`)                                     |
| `serviceAccountJson` | 서비스 계정 키. 보안 비밀: 저장 시 암호화되며 반환되지 않음                          |
| `autoCreate`         | 누락된 데이터셋/테이블 생성; 조건에 따라 null 허용 사용 증거 열 추가 (기본값 `true`) |

서비스 계정에는 대상 테이블에 대한 `bigquery.tables.updateData` 권한이 필요하며,
`autoCreate`가 켜져 있을 때는 `bigquery.datasets.create` / `bigquery.tables.create` 권한도
필요합니다. 기존 테이블을 업데이트하여 두 개의 null 허용 사용 증거 필드를 추가하려면
`bigquery.tables.update` 권한도 필요합니다. 권한이 하나라도 없으면 커서를 진행하지 않은
채 내보내기가 실패합니다.

구성된 배치는 HTTP 단위가 아니라 **커서** 단위입니다. `send()`는 이를 최대 500개의 행으로
구성된 `insertAll` 호출로 나누므로, 큰 `batch_size`도 BigQuery의 10MB 요청 제한을
초과하게 만들 수 없습니다. 일시적인 상태(408/429/500/502/503/504)는 지수 백오프를
사용하여 최대 세 번 재시도하며, 동일한 insertIds를 재사용합니다. 인증 및 스키마 오류는
실행을 소모하지 않고 첫 번째 시도에서 바로 예외를 발생시킵니다.

방금 생성된 테이블은 스트리밍 엔드포인트에 아직 표시되지 않아 몇 초 동안 404를 반환할 수
있습니다. 이 404는 재시도되지만 **이 실행에서 테이블을 생성한 경우에만** 해당합니다 —
실제로 누락된 테이블은 즉시 실패합니다. 최근 삭제된 테이블을 같은 이름으로 다시 생성하면
BigQuery가 몇 분 동안 스트리밍 삽입을 거부한다는 점에 유의하세요. 이는 삭제 후 재생성의
특성 때문이므로, 테이블을 삭제하고 다시 추가하기보다는 새 테이블 이름을 사용하는 것이
좋습니다.

**부분 실패는 비어 있지 않은 `insertErrors[]`와 함께 HTTP 200으로 도착합니다.** 이는
실패로 처리되어 예외를 발생시킵니다. 이를 통해 BigQuery가 수락하지 않은 행을 넘어 커서가
진행하는 것을 막습니다. `tests/unit/log-export-bigquery.test.ts`에서 이 동작을 고정합니다.

전송은 일반 REST 방식입니다 — 자체 서명된 RS256 어설션을
`https://oauth2.googleapis.com/token`에서 액세스 토큰으로 교환한 다음, 행을
`tabledata.insertAll`로 전송합니다. Google SDK는 가져오지 않습니다. 액세스 토큰은
프로세스 내에서 (서비스 계정, 범위)별로 캐시됩니다.

생성된 테이블에는 Logs 탭의 각 필드와 `exported_at`에 해당하는 열이 하나씩 포함되며,
실제 호출 로그가 조회되는 방식에 맞게 구성됩니다.

- **`timestamp` 기준 일 단위 파티션**, 날짜로 범위를 제한한 쿼리가 해당 날짜만 스캔하도록 합니다.
- **`api_key_name`, `provider`, `model`, `status` 순서로 클러스터링**하여, 누가 실행했는지,
  어디로 전송했는지 또는 실패했는지에 따른 필터가 각 파티션 내부의 블록을 정리하도록 합니다.
  BigQuery는 클러스터링 열을 최대 네 개까지 허용하며 순서가 중요합니다.
  `api_key_name`만 필터링하면 정리되지만 `status`만 필터링하면 정리되지 않습니다.
- 테이블 생성 시 적용되는 **`partitionExpirationDays`를 통한 선택적 파티션 보존**
  (`0`은 모두 보존).

두 설정 모두 생성 시점에 적용됩니다. 기존 테이블은 이미 적용된 레이아웃을 그대로 유지하므로,
이를 적용하려면 대상을 새 테이블 ID로 지정하세요.

`tests/unit/log-export-bigquery.test.ts`는 매퍼와 테이블 스키마가 항상 일치하는지 검증하므로,
새로운 호출 로그 열이 전송 과정에서 조용히 누락될 수 없습니다.

배치는 **행 수와 직렬화된 바이트 수 모두**를 기준으로 나뉩니다. 페이로드가 내보내지고 나면
행 수만으로는 충분하지 않습니다. 프롬프트가 포함된 500개의 행은 수십 메가바이트가 될 수
있으며, `insertAll`은 10MB를 초과하는 요청을 거부합니다. 청크는 500개의 행 또는 9MB 중
먼저 도달하는 시점에 종료됩니다.

---

## 5. OTLP/HTTP 트레이스 대상

구성은 `type: "otlp-http"`를 사용합니다. 이는 지속된 호출 로그를 예약된 일정에 따라 커서 기반으로 내보내는 기능이며,
`open-sse/services/routing/otel.ts`에 있는 최선 노력 방식의 실시간 라우팅 이벤트 싱크가 아닙니다. 이 기능은 해당 싱크의 환경
변수, 타이머 또는 버퍼를 읽거나 변경하지 않습니다. 두 기능을 모두 활성화하면 서로 독립적인 두 종류의 스팬이 생성될 수 있으므로,
`omniroute.log-export` 계측 스코프를 사용해 이러한 호출 로그 스팬을 구분하세요.

| 키                       | 기본값 / 용도                                                       |
| ------------------------ | ------------------------------------------------------------------- |
| `endpoint`               | 필수 전체 HTTP(S) 트레이스 URL. `/v1/traces` 접미사는 추가되지 않음 |
| `headers`                | 선택 사항인 `Name: value` 행 또는 문자열 JSON 객체. 암호화됨        |
| `requestHeaderAllowlist` | 비어 있음(비활성); 스팬 속성으로 캡처할 클라이언트 헤더 이름/접두사 |
| `serviceName`            | `omniroute`; 리소스 `service.name`                                  |
| `langfuseMapping`        | `false`; Langfuse 생성/세션/사용자 속성 추가                        |
| `identity`               | `pseudonymous`, `keyName` 또는 `none`                               |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`             |
| `timeoutMs`              | HTTP 시도당 `30000`                                                 |
| `environment`            | 설정되지 않음; 선택 사항인 `langfuse.environment`                   |

일반 대시보드에서는 이러한 필드를 렌더링합니다. `paths`는 API 배열 또는 줄바꿈/쉼표로 구분된 정확한 경로를 입력하는 텍스트 영역을
허용합니다. Embeddings, rerank 및 기타 경로는 명시적으로 허용하지 않는 한 건너뜁니다. 건너뛴 행도 커서를 진행시키며, 기존
러너의 `exported`/`exportedTotal` 카운터는 허용된 스팬이 아니라 필터링된 행을 포함한 처리된 소스 행을 계산합니다. 필터링은
자식 프로세스에서 수행되며, 해당 프로세스의 IPC/커서 계약은 변경되지 않습니다.

URL 검증은 `src/shared/network/outboundUrlGuard.ts`의 DB를 사용하지 않는
`parseAndValidateNonMetadataUrl` 헬퍼인 `block-metadata` 정책을 사용합니다. 이 정책은 웹훅 검증기와 동일하게 메타데이터/
프로토콜/내장 자격 증명 검사를 무조건 수행하며, 비공개 URL은 허용하지만 전역 기능 플래그 재정의 없이 localhost/LAN 대상을
의도적으로 허용합니다. 따라서 비공개 HTTP 엔드포인트를 포함해 자체 호스팅 Langfuse, Phoenix, Tempo 및 Collector 엔드포인트를
사용할 수 있습니다. 클라우드 메타데이터 호스트는 항상 차단됩니다. 리디렉션은 따르지 않으므로 Collector가 자격 증명을 다른
호스트로 리디렉션할 수 없습니다. 기존의 어휘적 URL 가드와 마찬가지로 DNS 확인을 고정하지 않으므로, 운영자가 제어하는 호스트만
구성하세요. 엔드포인트가 신뢰할 수 있는 네트워크에 있지 않다면 HTTPS를 우선 사용하세요.

### 페이로드 및 전달

OTLP/HTTP JSON(`ExportTraceServiceRequest`, `Content-Type: application/json`)은 허용된 각 행에 대해 하나의
CLIENT 스팬을 전달하며, 스팬 이름은 정확한 요청 경로로 지정됩니다. 경로 이름을 사용하면 스팬 이름에 모델 또는 ID 데이터를
삽입하지 않고 Chat Completions, Responses 및 Messages를 구분할 수 있습니다. 리소스 속성에는 `service.name`과 패키지의
`service.version`이 포함됩니다.

일반 채팅 시도 로거(`open-sse/handlers/chatCore/attemptLogging.ts`)는 완료 시
`duration = Date.now() - startTime`을 기록하며 타임스탬프는 제공하지 않습니다.
`src/lib/usage/callLogs.ts`의 `saveCallLogOperation`은 타임스탬프를 기록(완료) 시각으로 기본 설정합니다. 따라서 내보내기는
종료 시간을 행 타임스탬프로 설정하고, 시작 시간을 종료 시간에서 기간을 뺀 값으로 설정합니다(밀리초를 십진 나노초로 변환).
호출자가 제공한 과거 타임스탬프도 종료 시간으로 보존되며, 행별 시작/완료 구분자는 없습니다. null 기간은 0이 됩니다. 유효하지
않거나 누락된 타임스탬프는 비결정적인 스팬을 생성하는 대신 배치를 실패시킵니다. `ttftMs`는 nullable이며
`omniroute.ttft_ms`로 매핑됩니다.

속성에는 `gen_ai.operation.name="chat"`, provider, 요청/응답 모델, 입력/출력 토큰, 선택적인 캐시 읽기/캐시 생성/추론 토큰,
HTTP 상태, combo, 캐시 소스, 세션 태그 및 상관관계 ID가 포함됩니다. 정수 OTLP 값과 타임스탬프는 십진 문자열로 표현되며,
문자열, 불리언 및 소수는 해당 네이티브 OTLP 값 변형을 사용합니다. 오류 스팬은 ERROR 상태와 정제된 상태 메시지를 가집니다.
표준 레코드에는 업스트림 호스트 URL이 없으므로 `server.address`는 모델 서버로 Collector를 잘못 식별하지 않도록 생략됩니다.
비용은 내보내지지 않습니다.

`includeBodies=true`인 경우에만 콘텐츠가 로드됩니다. `langfuseMapping=false`이면
`gen_ai.input.messages` / `gen_ai.output.messages`가 OmniRoute에 저장된 정제된 요청/응답 본문 JSON을 전달합니다(파싱 가능한
경우 정규화됨). 이는 형태가 변경된 semconv 메시지 배열이 아닙니다. 잘리거나 JSON이 아닌 본문은 원시 텍스트로 유지됩니다.
`langfuseMapping=true`이면 본문은 `langfuse.observation.input` / `langfuse.observation.output`으로만 내보내며,
각 본문이 한 번만 전송되도록 `gen_ai.*.messages` 속성은 생략됩니다. 두 모드 모두 기존 로드 경로의 `maxBodyBytes`를 상속하며,
`omniroute.bodies_truncated=true`는 잘림을 표시합니다.
이 대상은 추가 파이프라인 스냅샷이나 정제되지 않은 아티팩트 읽기를 수행하지 않습니다. 선택적 요청 헤더 캡처는 아래에 설명된 기존
로드 클라이언트 스냅샷을 사용합니다. 본문을 내보낼 때는 시간당 백로그가 누적되지 않도록
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`과 같은 분 단위 주기를 사용하세요.

### 선택적 클라이언트 요청 헤더

헤더 캡처는 **기본적으로 비활성화**되어 있습니다. 대상 구성에서 `requestHeaderAllowlist`를 설정하고
**프롬프트 및 응답 내보내기**를 활성화하세요(대상에서 `includeBodies: true`).

허용 목록은 API 배열 또는 줄바꿈/쉼표로 구분된 이름을 입력하는 텍스트 영역을 허용합니다:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

이름은 대소문자를 구분하지 않으며 정확히 일치해야 합니다. 단, 끝에 하나의 `*`가 있으면 비어 있지 않은 헤더 이름 접두사를 선택합니다. 단독 `*`, 포함된 와일드카드 및 유효하지 않은 HTTP 헤더 이름은 거부됩니다. 선택자는 최대 64개이며, 각 선택자의 이름/접두사는 ASCII 기준 최대 256바이트입니다. 이 설정은 `headers`와 별개이며, `headers`는 exporter를 collector에 인증하는 데 사용됩니다.

캡처는 저장된 상세 파이프라인의 `clientRawRequest`(또는 레거시 `clientRequest`)에서 채워진 `pipeline_client_request`만 읽습니다. provider 요청 헤더로 대체하지 않습니다. 요청이 기록될 때 상세 파이프라인 로깅이 활성화되어 있어야 합니다. `includeBodies`가 비활성화되어 있거나 client-snapshot JSON이 없거나 손상되었거나 잘린 경우 헤더 속성은 생성되지 않습니다. `maxBodyBytes`를 늘리면 export 시점의 snapshot 잘림을 방지할 수 있지만, 애초에 저장되지 않은 상세 정보를 복원할 수는 없습니다. 1MiB를 초과하거나 헤더 항목이 256개를 초과하는 snapshot은 무시됩니다. 기존 prompt/response export는 헤더 캡처와 함께 계속 활성화되며, allowlist는 헤더만 hydration하는 모드를 제공하지 않습니다.

선택된 값은 단일 문자열인 경우에도 `http.request.header.<full lowercase header name>` OTLP 문자열 배열이 됩니다. 예를 들어 `X-OmniRoute-Meta-Team: example-team`은 `http.request.header.x-omniroute-meta-team`이 되며, 다음과 같은 값이 생성됩니다.
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`
전체 접두사는 그대로 유지됩니다. 이는 일반 헤더이며, 비즈니스 필드 파싱이나 `omniroute.metadata.*` / Langfuse metadata 변환을 수행하지 않습니다. `langfuseMapping`은 헤더 의미를 변경하지 않습니다. 선택된 단일 값 `User-Agent`는 표준 스칼라 `user_agent.original`도 설정합니다. 하나의 값 내부에 있는 쉼표는 분할되지 않습니다. 대소문자 변형은 저장된 항목 순서대로 병합되며, 유효하지 않은 변형이 하나라도 있으면 해당 헤더 전체가 생략됩니다. 속성은 소문자 이름 순으로 정렬됩니다.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key 헤더, auth/token/secret/password/credential 표식을 포함하는 이름 및 내부 gateway 자격 증명은 선택되었거나 저장 시 부분적으로 마스킹되었더라도 항상 제외됩니다. 알려진 자격 증명 패턴은 공유 자격 증명 detector를 재사용하며, redaction 표식은 안전한 값으로 간주되어 export되지 않고 생략됩니다. 문자열과 비어 있지 않은 문자열 배열만 허용되며, 숫자나 객체는 강제 변환하지 않습니다. 유효하지 않은 이름, prototype 키, 제어 문자(수평 탭 제외) 및 잘못된 Unicode는 배치 실패나 오류 내용에 해당 값이 반영되지 않도록 무시됩니다.

각 span은 최대 32개의 헤더, 헤더당 16개의 값, 값당 UTF-8 기준 4096바이트, 캡처된 헤더 이름과 값 전체에서 UTF-8 기준 총 16384바이트를 포함할 수 있습니다. 크기를 초과하거나 유효하지 않은 헤더는 잘리지 않고 전체가 생략됩니다. 선택은 운영자의 개인정보 보호 결정입니다. 안전해 보이는 이름에도 개인 데이터가 포함될 수 있으며, 이러한 제한과 detector는 일반적인 PII 제거기가 아닙니다.

### 전송 제한

요청은 envelope를 포함하여 최대 500개의 span과 UTF-8 JSON 4MiB로 제한됩니다. 허용된 모든 span은 cursor 배치의 첫 요청 전에 크기가 검사됩니다. 제한을 초과하는 개별 span이 있으면 해당 배치의 일부도 전송하지 않고 `maxBodyBytes`를 낮추라는 안내와 함께 실패합니다. 조용히 삭제되지 않습니다. Preflight는 레코드 참조와 바이트 수만 유지하고 각 임시 span/JSON을 폐기합니다. 두 번째 직렬화된 배치 사본을 보유하지 않도록 제한된 청크에 맞춰 span을 다시 구성합니다. HTTP 408/429/5xx, 네트워크 오류 및 timeout은 최대 3회 시도하며, 250/500ms 지수 백오프를 사용합니다. `Retry-After` 초 또는 HTTP 날짜는 지연을 최대 5초까지 늘릴 수 있습니다. 그 외 상태 코드는 즉시 실패합니다. OTLP 2xx 부분 거부도 손실된 span을 확인 처리하지 않고 오류를 발생시킵니다. 비어 있거나 유효한 JSON 확인 응답은 허용되며, 응답 읽기 제한은 64KiB입니다.

오류에는 exporter가 소유한 사실만 포함됩니다. 즉 HTTP 상태, 재시도 분류, 시도 횟수 및 전송된 span 수, 또는 고정된 확인 응답/네트워크 실패 문구만 포함됩니다. Collector 응답 본문, 부분 성공 수 및 응답 헤더는 오류, 로그 또는 dashboard에 절대 복사되지 않습니다. 실패했거나 부분적으로 수락된 배치는 확인 처리되지 않습니다. 대상은 해당 상태와 함께 Failing을 표시하고, cursor는 마지막으로 확인 처리된 배치에 머무르며, 다음 실행에서 동일한 행을 다시 전송합니다. 영구 상태는 collector 또는 구성이 수정될 때까지 계속 실패합니다. 응답 세부 정보는 collector 자체 로그를 사용하십시오. Call-log 오류 요약은 별도의 redaction을 유지합니다.
`prepare()`는 아무것도 provision하지 않습니다. Test는 정확히 `{"resourceSpans":[]}`를 POST하고 call-log span을 기록하지 않은 채 HTTP 상태를 보고합니다.

Trace id와 span id는 각각 `"omniroute.trace\\0" + callLogId` 및 `"omniroute.span\\0" + callLogId`에 대한 SHA-256의 처음 32/16개 16진수입니다. 재전송 시에도 동일한 id가 사용됩니다. 이는 중복 제거를 보장하지 않습니다. Langfuse v4 ingestion을 포함한 일부 backend는 동일한 id를 가진 span을 중복 제거하지 않습니다. 충돌 또는 부분 청크 실패가 발생하면 확인 처리되지 않은 cursor 배치 하나만 다시 전송될 수 있습니다. 마지막 HTTP 청크만이 아니라 해당 배치 전체가 중복될 수 있습니다. 이 절충을 고려하여 cursor 배치 크기를 선택하십시오.

### Langfuse 예시

Self-hosted Langfuse 인스턴스에 다음 필드를 구성하십시오.

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Authorization 값은 리터럴 `public-key:secret-key` 문자열을 Base64로 변환하여 로컬에서 생성하십시오. 예를 들어 `Buffer.from(publicKey + ":" + secretKey).toString("base64")`를 사용할 수 있습니다. 실제 자격 증명을 로그, 스크린샷 또는 이슈에 붙여 넣지 마십시오. 매핑은 자동으로 `x-langfuse-ingestion-version: 4`를 설정하며, Authorization은 여전히 `headers`에 제공해야 합니다. 헤더와 생성된 identity salt 모두 기존 암호화된 secret-field 메커니즘과 API placeholder를 사용하며, `STORAGE_ENCRYPTION_KEY`가 필요합니다.

매핑에는 생성 유형/모델, JSON 사용량 세부 정보(입력/출력/전체 및 사용 가능한
캐시 키), JSON 입력/출력 스냅샷, ERROR/DEFAULT 수준, 정제된 상태 메시지,
트레이스 이름, 세션 ID, 선택적 환경 및 공급자, 요청된 모델, 경로, 조합, 캐시
소스와 상태에 대해 필터링 가능한 `langfuse.observation.metadata.<key>`가
추가됩니다. `langfuse.observation.completion_start_time`은 ISO 8601 형식의
시작 시간에 해당하며, TTFT가 알려져 있고 지속 시간 이내인 경우에만 TTFT가
추가됩니다. 비용 속성은 전송되지 않습니다.

ID 모드는 `langfuse.user.id`에 적용됩니다.

- `pseudonymous`(기본값): 무작위 대상별 32바이트 솔트를 사용해 API 키의 내부 ID에 HMAC-SHA256을 적용한 값입니다. 솔트가 없으면 생성 시 만들어지고, `identitySalt`로 암호화되며, 반환되지 않고, 편집 중에도 유지됩니다. 원시 키 ID는 span 속성에 절대 저장되지 않습니다. 대상의 솔트를 다시 생성하거나 교체하면 ID가 변경됩니다.
- `keyName`: 구성된 API 키 이름으로, 운영자가 지정한 레이블이 의도적으로 노출됩니다.
- `none`: 사용자 ID가 없습니다. 세션 태그가 있으면 계속 내보내집니다. 이러한 모드는 임의의 프롬프트 콘텐츠나 운영자가 제공한 세션/상관관계 레이블을 익명화하지 않습니다.

### 백필 없이 시작하기

생성할 때만 **현재 위치에서 시작(기존 로그 건너뛰기)**을 활성화하거나, 생성 API
페이로드의 최상위 수준에 `startFromCurrentPosition: true`를 전달합니다. 기존 커서
헬퍼를 사용해 `cursor_row_id`를 현재 보존된 호출 로그 rowid의 최댓값으로 초기화하며,
마이그레이션은 수행하지 않습니다. 기본값은 false입니다(커서 0 및 보존된 기록 백필).
이는 업데이트 시 커서를 재설정하는 설정이 아닙니다.

공유 `ttftMs` 추가 기능은 BigQuery 매퍼와 새 테이블 스키마에 nullable
`ttft_ms` 열도 추가합니다. 스키마 테스트에서는 모든 정식 레코드 필드에 열이
있어야 합니다. 기존 테이블은 계속 변경 없이 내보내집니다. `prepare()`는 테이블
스키마를 읽고 해당 열이 없을 때만 `ttft_ms`를 제외합니다. 다음 실행부터 TTFT를
사용하려면 nullable INT64 열을 추가하거나 새 테이블을 사용하세요. 선택적 TTFT
열은 스키마 업데이트를 트리거하지 않습니다. 사용량 증거 열은 아래의 조건부 옵트인
호환성 흐름을 따르며, 다른 행 필드는 엄격한 스키마 검사를 유지합니다.

---

## 6. 대상 추가하기

1. `LogExportDestinationType`을 내보내는 `src/lib/logExport/destinations/<name>.ts`를 생성합니다.
   Zod `configSchema`, UI용 `fields` 설명자 배열, `secretFields`, 그리고
   `test()` / `prepare()` / `send(records)`를 반환하는 `createClient(config)`를 구현합니다.
2. 이를 `src/lib/logExport/registry.ts`의 `DESTINATIONS` 배열에 추가합니다.
3. `tests/unit/` 아래에 테스트를 작성합니다.

변경 사항은 이것이 전부입니다. 영속성 처리, cron 작업, REST 계층, 비밀 정보 암호화 및
대시보드 양식은 모두 레지스트리를 참조합니다.

새 대상에 적용되는 두 가지 규칙:

- `send()`는 부분 실패 시 **반드시 예외를 던져야 합니다**. 정상적으로 완료되면 "대상에 이 행들이 저장되어 있다"는 뜻이며,
  커서는 해당 행들을 영구적으로 지나갑니다.
- 사용자가 제공한 URL을 사용하는 대상은 웹훅과 마찬가지로 요청을 보내기 전에
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`)을 통해 URL을 검증해야 합니다.
  BigQuery는 호스트가 상수로 정해져 있으므로 이 과정이 필요하지 않습니다.

---

## 7. 운영

- **대시보드**: Integrations → Log export. 대상을 추가하고 **테스트**를 실행하여 행을 쓰지 않고 자격 증명을 확인한
  다음 활성화합니다.
- **백로그**: 각 대상 카드에는 대기 중인 행과 커서가 표시됩니다. `GET
/api/log-export/status`는 동일한 수치와 최근 작업 실행 20개를 반환합니다.
- **한 대상의 실패가 다른 대상의 실패로 이어지지는 않습니다** — 실행 요약에는 `last_status` / `last_error`에 대상별
  상태가 기록되고, 작업 실행 기록에는 집계 상태가 유지됩니다.
- **대상을 삭제하면 해당 커서도 삭제됩니다.** 다시 추가하면 가장 오래 보존된 호출 로그부터 시작하므로 대상에 이미
  저장되어 있을 수 있는 행이 다시 전송됩니다. BigQuery에서는 행별 `insertId`가 BigQuery 자체 중복 제거 기간
  내에서만 이를 흡수하므로 대상을 삭제하기보다는 비활성화하는 것이 좋습니다.

### 사용 증거 스키마 호환성

새 BigQuery 테이블에는 nullable `usage_evidence` (JSON을 포함하는 STRING)와
`usage_estimated` (BOOL)가 포함됩니다. `autoCreate`가 활성화된 경우 기존 테이블에는 이러한 누락된 nullable
열만 추가할 수 있습니다. 내보내기 기능은 필드 메타데이터를 포함한 기존 전체 스키마를 보존하고, 반환된 etag를
사용하여 조건부 PATCH를 제출합니다. 동시에 발생한 스키마 변경으로 인해 기존 스키마를 덮어쓰는 대신 내보내기가
실패하며, 다음 실행에서 테이블을 다시 읽습니다.

`autoCreate`가 비활성화된 경우 사용 증거가 포함된 레코드를 내보내기 전에 이러한 열을 직접 추가해야 합니다.
스키마/etag 메타데이터가 누락되었거나 업데이트에 실패하면 증거가 포함된 삽입도 수행되지 않습니다. 해당 실패
시 내보내기 커서는 진행되지 않으며 증거가 자동으로 삭제되지 않습니다. 내보내기가 차단된 동안에도 로컬 로그
보존 정책은 계속 적용되므로, 보존된 원본 행이 만료되기 전에 실패를 해결해야 합니다.
