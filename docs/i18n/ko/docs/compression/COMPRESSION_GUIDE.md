# 🗜️ Prompt Compression Guide — OmniRoute (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> 적격 컨텍스트에서 15~95%를 자동으로 절감합니다. 빠른 개요는 [README 압축 섹션](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)을 참조하세요.

## 개요

OmniRoute는 요청이 업스트림 제공자에 도달하기 **전에 선제적으로** 실행되는 모듈식 프롬프트 압축 파이프라인을 구현합니다. 즉, 워크플로를 변경하지 않아도 토큰이 투명하게 절감됩니다.

```
클라이언트 요청
  → 압축 전략 선택기
    → 콤보 재정의? → 콤보 설정 사용
    → 자동 트리거 임계값? → 자동 모드 사용
    → 기본 모드? → 전역 설정 사용
    → 꺼짐? → 압축 건너뛰기
  → 선택된 압축 모드
    → 꺼짐: 압축 없음
    → Lite: 안전한 공백/서식 정리(~15%)
    → Standard: 전보문체식 군더더기 제거(~30%)
    → Aggressive: 기록 노후화 + 요약(~50%)
    → Ultra: 휴리스틱 가지치기 + 코드 블록 축소(~75%)
    → RTK: 명령어 인식형 터미널/도구 출력 필터링(업스트림 기준 60~90%)
    → Stacked: 순서가 지정된 다중 엔진 파이프라인, 일반적으로 RTK 후 Caveman 적용(적격 범위 78~95%)
  → 압축된 요청 → 제공자
```

---

## 압축 모드

### Off

압축이 적용되지 않습니다. 모든 메시지가 변경 없이 그대로 통과합니다.

### Lite 모드 (~15% 절감, <1ms 지연)

가장 안전한 모드 — 의미 변화는 전혀 없이 형식 정리만 수행합니다:

| 기법                     | 설명                                   |
| ------------------------ | -------------------------------------- |
| `collapseWhitespace`     | 연속된 빈 줄과 줄 끝 공백을 병합합니다 |
| `dedupSystemPrompt`      | 중복된 시스템 메시지를 제거합니다      |
| `compressToolResults`    | 장황한 도구/함수 출력을 압축합니다     |
| `removeRedundantContent` | 반복되는 지시문을 제거합니다           |
| `replaceImageUrls`       | base64 이미지 데이터 URI를 단축합니다  |

**적합한 용도:** 상시 사용, 안전이 중요한 워크플로우.

### Standard 모드 (~30% 절감)

[Caveman](https://github.com/JuliusBrussee/caveman)에서 영감을 받은 모드 — 의미를 보존하면서 군더더기 단어와 장황한 표현을 제거합니다:

- 군더더기 단어 제거("please", "I think", "basically", "actually")
- 장황한 구문을 간결하게 압축("in order to" → "to", "as a result of" → "because")
- 정중한 완곡 표현 제거("Would you mind...", "If you could possibly...")
- 코딩 프롬프트에 맞게 조정된 30개 이상의 정규식 규칙

**적합한 용도:** 일상적인 코딩 워크플로우, 비용에 민감한 팀.

### Aggressive 모드 (~50% 절감)

긴 세션을 위한 스마트 히스토리 관리:

- **메시지 에이징** — 오래된 메시지가 점진적으로 압축됩니다
- **도구 결과 압축** — 긴 도구 출력을 잘라내거나 생략합니다(첫/마지막 줄,
  일치 줄 필터링, JSON 키 압축)
- **구조적 무결성 가드** — `tool_use` + `tool_result` 쌍이 일관되게 유지되도록 보장합니다
- **컨텍스트 윈도우 인식** — 모델별 토큰 한도를 준수합니다

**적합한 용도:** 장시간 디버깅 세션, 대규모 코드베이스.

### Ultra 모드 (~75% 절감)

토큰이 중요한 시나리오를 위한 최대 압축:

- **휴리스틱 프루닝** — 점수 기반으로 산문 텍스트의 토큰을 프루닝합니다
- **구조 보존** — 펜스 코드 블록, 인라인 코드, URL 및 식별자는 툼스톤 처리 후
  원문 그대로 다시 연결되며, 절대 프루닝되지 않습니다
- **선택적 SLM 계층** — 구성된 경우 소형 로컬 모델이 프루닝을 개선할 수 있습니다
- Aggressive 모드와 독립적: 메시지 에이징, 도구 결과 압축, 폴백 요약기를 실행하지
  않습니다(SLM 계층 실패 시에만 폴백 패스가 aggressive를 거쳐 라우팅될 수 있음)

**적합한 용도:** 컨텍스트 한도에 반복적으로 도달하는 경우.

### RTK 모드 (60-90% 범위, 업스트림 기준)

RTK 모드는 코딩 에이전트 세션에 나타나는 장황한 도구 출력에 최적화되어 있습니다:

- `git status`, `git diff`, `git log`, 테스트 러너, TypeScript/Vite/Webpack 빌드,
  ESLint/Biome/Prettier, npm audit/install, Docker 로그, 인프라 출력 및 일반 셸 출력과
  같은 명령/출력 클래스를 감지합니다
- `open-sse/services/compression/engines/rtk/filters/`의 JSON 필터 팩을 적용합니다
- 프로젝트 또는 전역 `filters.toml` 파일에서 RTK TOML 스키마 v1 필터를 가져오며, 인라인
  테스트 검증 및 프로젝트 파일에 대한 신뢰 게이팅(trust-gating)을 적용합니다
- 인라인 검증 샘플이 포함된 56개의 내장 필터를 제공합니다
- ANSI 제어 시퀀스, 진행 표시줄, 반복되는 줄 및 조치 불가능한 노이즈를 제거합니다
- 실패, 오류, 경고, 변경된 파일, 요약 및 긴 출력의 끝 부분을 보존합니다
- 신뢰 게이트된 프로젝트 필터, 전역 필터 및 선택적인 마스킹된 원본 출력 복구를 지원합니다

**적합한 용도:** 셸, 빌드, 테스트, git, grep 및 파일 출력 트랜스크립트가 포함된 에이전트 세션.

### Stacked 모드 (78-95% 범위, 적격 콘텐츠 기준)

Stacked 모드는 여러 압축 엔진을 결정적 순서로 실행합니다. 기본 파이프라인은 다음과 같습니다:

```txt
RTK -> Caveman
```

이 순서는 터미널/도구 출력을 먼저 압축한 다음, 남은 자연어 프롬프트에 Caveman 의미 압축을
적용합니다. Stacked 파이프라인은 전역으로 구성하거나 라우팅 콤보에 할당된 압축 콤보를 통해
구성할 수 있습니다.

**적합한 용도:** 대규모 도구 로그와 사람의 지시 또는 어시스턴트 요약이 혼합된 컨텍스트.

---

## 업스트림 절감률 계산

OmniRoute는 업스트림 프로젝트 벤치마크와 OmniRoute 자체 엔진 구성이라는 두 가지 출처를 기반으로 압축 절감률을 문서화합니다.

| 출처    | 여기서 사용한 업스트림 README 수치                                                           |
| ------- | -------------------------------------------------------------------------------------------- |
| Caveman | 출력 토큰 `~75%` 감소, 벤치마크 평균 출력 절감률 `65%`, 범위 `22-87%`, 입력 압축 도구 `~46%` |
| RTK     | 명령 출력 절감률 `60-90%`; 샘플 세션은 `~118,000 -> ~23,900` 토큰으로, `79.7%` 절감(`~80%`)  |

중복되는 도구/컨텍스트 페이로드의 경우, 기본 OmniRoute 조합은 엔진을 다음과 같이 연이어 적용합니다.

```txt
RTK -> Caveman
```

결합 절감률은 가산 방식이 아니라 곱셈 방식으로 계산됩니다.

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

이 `78-95%` 수치는 RTK와 Caveman이 동일한 입력/컨텍스트 페이로드를 모두 줄일 수 있을 때 적용됩니다.
Caveman 응답 출력 모드는 별개입니다. 활성화된 경우 Caveman 자체 출력 절감률(평균 `65%`, 대표 수치 `~75%`, 범위 `22-87%`)을 사용합니다. 전체 청구 비용 절감률은 프롬프트/출력 구성 비율에 따라 달라집니다.

### "적용 가능"의 실제 의미

15-95%라는 대표 범위는 실제 수치이지만, 반복되는 오류 줄, 동일한 경고를 계속 출력하는 빌드 로그, 지나치게 큰 `grep`/파일 읽기 덤프처럼 **중복되거나 장황한** 콘텐츠에만 적용됩니다. 모든 요청에서 이 정도의 절감률이 나온다는 의미는 **아닙니다**.

실증적으로 검증한 결과(`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`), 동일한 오류 줄 300개가 포함된 Anthropic 형식의 `tool_result` 블록에 대해 `stacked`(RTK + Caveman)를 실행했을 때 **토큰 절감률 95.93% / 문자 절감률 96.26%**가 나와 명시된 범위에 정확히 들어왔습니다. 하지만 정상적이고 중복되지 않는 도구 출력(정돈된 `grep` 일치 목록, 짧은 파일 읽기, 일반적인 대화 텍스트)에 동일한 파이프라인을 실행하면, 제거할 반복 내용이 없고 `validateCompression()`(`validation.ts`)이 코드 블록, URL, 제목, 버전 또는 ALL-CAPS 상수 식별자를 누락하거나 변경하는 재작성을 전송하지 못하도록 차단하기 때문에 올바르게 **0에 가까운 절감률**이 나옵니다.

이는 버그가 아니라 예상된 안전한 동작입니다. 대부분 정돈된 파일을 읽거나 `grep`하는 코딩 세션은 압축을 완전히 활성화하더라도 전체 절감률이 크지 않지만, 실패 루프가 발생하거나 출력이 많은 린터를 실행하는 세션에서는 해당 트래픽에 대해 78-95%의 전체 범위를 확인할 수 있습니다. 단일 세션의 낮은 종합 절감률을 압축 설정이 잘못되었다는 증거로 사용하지 마세요. 먼저 기본 도구 출력에 실제로 중복이 있었는지 확인하세요.

---

## 토큰 절감 시각화

```
압축 없음:              LLM에 47K 토큰 전송
Lite 사용:              40K 토큰 전송          (15% 절감 — 안전한 상시 적용)
Standard 사용:          33K 토큰 전송          (30% 절감 — caveman-speak 규칙)
Aggressive 사용:        24K 토큰 전송          (50% 절감 — 에이징 + 요약)
Ultra 사용:             12K 토큰 전송          (75% 절감 — 휴리스틱 가지치기)
RTK 사용:               19K-5K 토큰 전송       (명령/도구 출력에서 60-90% 절감)
Stacked 사용:           10K-2.5K 토큰 전송     (적용 가능한 RTK+Caveman 범위에서 78-95% 절감)
```

---

## 구성

### 대시보드

`Dashboard → Context & Cache`로 이동합니다.

- **Caveman** — 모드 선택, 언어 팩, 미리 보기 및 전역 기본값
- **RTK** — 명령 필터 미리 보기, RTK 안전 설정 및 필터 카탈로그
- **Compression Combos** — 라우팅 콤보에 할당되는 이름 있는 엔진 파이프라인
- **Auto-Trigger Threshold** — 토큰 수가 임계값을 초과하면 자동으로 압축 활성화

### 콤보별 재정의

`Dashboard → Context & Cache → Compression Combos`에서 압축 콤보를 라우팅 콤보에 할당합니다.

```txt
콤보: "free-tier-fallback"
  압축 콤보: "coding-agent-stack"
  파이프라인: RTK -> Caveman
  대상:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

이렇게 하면 무료/코딩 제공자에는 스택형 압축을 사용하면서 유료 구독에는 라이트 모드를 유지할 수 있습니다.

이 "콤보별 재정의" 할당은 **라우팅 콤보 압축 모드** 재정의(Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — 이 필드의 스키마는 `rtk`, `stacked`, `omniglyph`도 허용함)와는 별개의 제어 기능입니다. 해당 재정의는 이름 있는 압축 콤보 파이프라인을 선택하지 않으며, `resolveCompressionPlan`에서 참조하는 `compressionMode` 필드만 설정합니다. 콤보 카드(`Dashboard → Combos`)에서 설정하거나, #6760부터는 위에서 설명한 파이프라인 할당 체크박스 바로 옆에 있는 `Dashboard → Context & Cache → Compression Combos`의 "Assign to routing" 목록에서 라우팅 콤보별로 설정할 수 있습니다. 두 화면 모두 동일한 `PUT /api/combos/{id}` 엔드포인트를 통해 설정을 저장합니다.

### 요청별 재정의

단일 요청의 압축 계획을 재정의하려면 `x-omniroute-compression` 요청 헤더를 전송합니다. 이 헤더는 가장 높은 우선순위를 가지며 라우팅 콤보 재정의, 활성 프로필, 자동 트리거 및 패널의 Default 설정보다 우선합니다. 알 수 없는 값은 무시되며(요청이 거부되는 일은 없음), 전역 마스터 스위치는 여전히 모든 기능을 제어합니다. 압축이 전역적으로 꺼져 있으면 헤더로 압축을 켤 수 없습니다. 값은 다음과 같습니다.

| 값            | 효과                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `off`         | 이 요청에 압축을 적용하지 않습니다.                                                                    |
| `default`     | 패널에서 파생된 Default 프로필입니다(활성 프로필 무시). 손실형 엔진은 비활성 상태로 유지됩니다.        |
| `safe`        | 헤더를 생략한 경우와 동일합니다. 중복 제거와 공백 축소만 수행합니다.                                   |
| `allow-lossy` | 요약, 관련성 필터 및 스타일 재작성을 포함해 이 요청의 운영자 계획을 유지합니다.                        |
| `engine:<id>` | 활성화된 경우 단일 엔진을 사용합니다(예: `engine:rtk`). 해당 엔진을 요청별로 사용 설정하는 방식입니다. |
| `<combo>`     | 이름 있는 콤보입니다. 먼저 이름을 대소문자 구분 없이 일치시키고, 그다음 id로 일치시킵니다.             |

`allow-lossy`, `engine:<id>` 또는 이름 있는 콤보가 없으면 손실형 엔진은 적용되지 않습니다. 압축이 켜져 있으면 요청에는 계속해서 세션 중복 제거와 공백 축소가 적용됩니다.

적용된 계획은 `X-OmniRoute-Compression: <mode>; source=<source>` 응답 헤더에 반환됩니다. 여기서 `<source>`는 `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` 또는 `off` 중 하나입니다.

### API

```bash
# 압축 설정 가져오기
curl http://localhost:20128/api/settings/compression

# 압축 설정 업데이트
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 특정 RTK/스택형 페이로드 미리 보기
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK 필터 팩 목록 조회
curl http://localhost:20128/api/context/rtk/filters

# 선택적 명령 메타데이터를 사용하여 RTK 직접 테스트
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## 보호되는 항목

압축 엔진은 **항상 다음 항목을 보존합니다:**

- ✅ 코드 블록(펜스 코드 및 인라인 코드)
- ✅ URL 및 파일 경로
- ✅ JSON 구조 및 구조화된 데이터
- ✅ 식별자 및 보호된 기술 토큰
- ✅ 수학 표현식
- ✅ 도구/함수 호출 정의
- ✅ 시스템 프롬프트(lite 모드에서)

RTK 원시 출력 복구 기능은 데이터가 저장되기 전에 일반적인 API 키, bearer 토큰, Slack 토큰, AWS 액세스 키,
비밀번호, 토큰 및 비밀 정보를 삭제합니다.

---

## 압축 통계

모든 압축된 요청에는 서버 로그에 통계가 포함됩니다:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## 단계별 로드맵

| 단계     | 모드                                                                                                                                | 상태      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Phase 1  | Off, Lite                                                                                                                           | ✅ 출시됨 |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                         | ✅ 출시됨 |
| Phase 3  | RTK, Stacked, Compression Combos                                                                                                    | ✅ 출시됨 |
| Phase 4  | Output Styles, SLM-tier Ultra, 평가 하네스                                                                                          | ✅ 출시됨 |
| Phase 4C | 적응형 컨텍스트 예산("다이얼") — 계산 엔진 + API (`PUT /api/settings/compression`의 `contextBudget`) + 대시보드 모드/정책 제어 기능 | ✅ 출시됨 |

---

## 감사의 말

Standard 모드의 압축 규칙은 **[JuliusBrussee](https://github.com/JuliusBrussee)**가 만든 **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — 화제가 된 "적은 토큰으로 충분한데 왜 많은 토큰을 사용하는가" 프로젝트에서 영감을 받았습니다. Caveman은 출력 토큰 `~75%` 감소, 벤치마크 평균 출력 절감률 `65%`, 출력 절감 범위 `22-87%`, 입력 압축 도구의 절감률 `~46%`를 보고합니다.

RTK 모드는 **[RTK AI](https://github.com/rtk-ai)**가 만든 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — 터미널, 빌드, 테스트, git 및 도구 출력 필터링을 위한 고성능 명령 출력 압축 프로젝트에서 영감을 받았습니다. RTK는 `60-90%`의 절감률을 보고하며, README의 샘플 세션에서는 `~80%`가 절감된 것으로 나타납니다.

---

## 고급 압축 시스템

위에서 설명한 7가지 모드 외에도(소스는 `codex-responses` 및 `omniglyph` 모드도
허용하지만 이 가이드에서는 다루지 않음), 아래 섹션에서는 해당 모드 내부 또는
모드와 함께 작동하는 기능을 다룹니다. 도구 결과 압축과 점진적 에이징은 공격적
엔진의 1단계와 2단계이며(공격적 모드 및 스택형 파이프라인의 `aggressive` 단계),
스택형 파이프라인은 스택형 모드가 실행되는 방식입니다. 캐시 인식 압축은 압축이
활성화된 동안 캐싱 제공자에 대해 `aggressive`와 `ultra`를 `standard`로
다운그레이드합니다. 원시인 출력 모드와 출력 스타일은 요청을 압축하는 대신 모델의
출력을 형성하는 선택적 시스템 프롬프트 지침으로, 기본적으로 비활성화되어 있습니다.

### 캐시 인식 압축

일부 제공자(프롬프트 캐싱을 사용하는 Anthropic 등)는 **프롬프트 캐싱**을
지원합니다. 이를 통해 프롬프트의 일부를 캐시하여 비용과 지연 시간을 줄일 수
있습니다. 캐싱이 활성화된 경우 공격적 압축은 캐시된 토큰을 변경하여 캐시를
무효화하므로 실제로 성능을 **저하시킬** 수 있습니다.

`cachingAware.ts` 모듈은 **캐싱 컨텍스트를 감지**하고 그에 따라
**압축 전략을 조정**하여 이 문제를 해결합니다.

#### 작동 방식

1. **캐싱 컨텍스트 감지** — 요청 본문에서 `cache_control` 마커를 검색합니다
2. **캐싱 제공자 식별** — 대상 제공자가 캐싱을 지원하는지 확인합니다
3. **전략 조정** — 캐싱 제공자에 대해 `aggressive`/`ultra`를 `standard`로 다운그레이드합니다
4. **시스템 프롬프트 건너뛰기** — 시스템 프롬프트는 일반적으로 캐시되므로 압축하지 않습니다

전략 헬퍼는 `deterministicOnly` 플래그도 반환하지만, 계획 빌더는 전략만
사용하며 현재 이 플래그를 읽는 다운스트림 구성 요소는 없습니다.

#### 코드 예시

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← 캐시 마커
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 사용 시점

캐시 인식 압축은 **항상 활성화**되어 있으며 별도의 구성이 필요하지 않습니다.
압축이 활성화되어 있고 대상 제공자가 프롬프트 캐싱을 지원할 때마다(Anthropic,
OpenAI 등) 작동합니다. 명시적인 `cache_control` 마커는 필요하지 않습니다.
캐싱 제공자라는 사실만으로 다운그레이드가 실행되며, 마커만으로는 절대 실행되지
않습니다(마커 감지는 전략 결정이 아닌 캐시 텔레메트리에 사용됨).

### 점진적 에이징

긴 대화에는 많은 메시지 턴이 누적되지만, 오래된 턴일수록 관련성이 떨어집니다.
`progressiveAging.ts` 모듈은 **턴 거리에 따라 메시지를 축약**합니다
(거리는 대화 끝에서부터 측정). 기본 제공 설정
(`verbatim: 2, light: 2, moderate: 3`)을 사용하는 경우:

- **마지막 2개 턴(거리 ≤ 2)**: 원문 그대로 유지
- **거리 3**: 원시인 압축(군더더기 제거)
- **거리 4 이상**: 어시스턴트 메시지는 요약하고 사용자 메시지는 120자로 제한된
  첫 번째 줄만 남기며, 다른 역할은 그대로 둡니다. 시스템 프롬프트, 이미 에이징된
  메시지 및 최신 사용자 메시지는 거리에 관계없이 항상 원문 그대로 유지됩니다.
  어떤 항목도 완전히 삭제되지 않으며, 기본 제공 설정에서는 `light`
  구간에 도달할 수 없습니다(`light`가 `verbatim`과 같음).

#### 코드 예시

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50개 이상의 턴 ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 마지막 3개 턴: 원문 그대로
  light: 8, // 거리 <= 8: 가벼운 압축
  moderate: 20, // 거리 <= 20: 원시인 압축
  fullSummary: 5, // 타입에서 요구하지만 구간 지정 코드에서는 읽지 않음
  // 거리 > 20: 요약됨(어시스턴트) / 첫 번째 줄 유지(사용자)
});

// saved = 절약된 토큰 수
```

#### 사용 시점

점진적 에이징은 `aggressive` 모드에서 **항상 활성화**되며,
`compressAggressive()`의 2단계입니다. Ultra 모드에서는 실행되지 않습니다.
특히 다음과 같은 경우에 효과적입니다.

- 장시간 실행되는 코딩 세션
- 여러 날에 걸친 대화
- 도구 호출이 많은 에이전트형 워크플로

### 원시인 출력 모드

원시인 출력 모드는 모델 자체에 간결한 출력을 요청하는 **시스템 프롬프트 지침**을
추가합니다. `lite` 수준은 완전한 문장을 유지하면서 간결하게 답변하도록 요청하고,
`full`은 "똑똑한 원시인처럼 간결하게 응답"하도록 요청하며, `ultra`는 전보식
출력을 요청합니다. 지침은 요청일 뿐이며 이를 보장할 수는 없습니다. 요청은
`applyOutputStyles()`(`open-sse/services/compression/outputStyles/apply.ts`)를
통해 이러한 지침을 받습니다. `open-sse/handlers/chatCore.ts`는 먼저 하위 호환성
심을 사용하여 선택 사항을 해석합니다
(`open-sse/services/compression/outputStyles/backCompat.ts`의
`resolveOutputStyleSelection()`). 이 심은 `outputStyles`가 비어 있을 때
활성화된 `cavemanOutputMode`를 `cavemanOutputMode.intensity` 수준의
`terse-prose` 출력 스타일에 매핑합니다(아래의 하위 호환성 참조). 비어 있지 않은
`outputStyles` 선택 사항은 그대로 사용되며, 이 경우 `cavemanOutputMode.enabled`와
`intensity`는 아무런 효과가 없지만 `autoClarity` 토글은 계속 적용됩니다.
`outputMode.ts`에는 지침 텍스트(`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), 콘텐츠
우회 처리 및 삽입에 사용되는 배치 헬퍼가 들어 있습니다. 자체
`applyCavemanOutputMode()` 인젝터는 프로덕션 호출자가 없습니다.

#### 작동 방식

이 모드는 입력을 압축하지 않습니다. 시스템 프롬프트에 지침 블록을 추가하며
(아래의 주입 작동 방식 참조), 요청에 선택된 입력 압축 모드는 블록이 포함된 본문에
이후에도 그대로 실행됩니다. 모든 레벨 마지막에 공통으로 추가되는 경계 조항 앞에서
영어 `full` 레벨은 다음과 같습니다.

> "똑똑한 원시인처럼 간결하게 응답하라. 관사(a/an/the), 군더더기(just/really/basically/actually/simply), 인사말, 완곡한 표현을 제거하라. 문장 조각도 허용한다. 짧은 동의어를 사용하라(extensive 대신 big, implement 대신 fix). 모든 기술적 내용, 코드, 오류, URL, 식별자는 정확히 유지하라."

특히 다음에 효과적입니다.

- 코드 생성(더 간결한 출력 = 더 적은 토큰)
- 빠른 질의응답(장황한 설명이 필요 없음)
- 일괄 처리(처리량 극대화)

#### 사용 시점

원시인 출력 모드는 **선택 사항**입니다. 압축을 켠 상태(`enabled: true`, Compression Settings 페이지의
마스터 토글 활성화)에서 `cavemanOutputMode.enabled`로 켤 수 있으며, `intensity`는
`lite`, `full`, `ultra` 중 하나를 선택합니다.

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

압축 조합의 **Output Mode** 토글(`outputMode`, 레벨은 `outputModeIntensity`)은
해당 조합이 적용되는 요청에 동일한 스위치를 설정하며,
`omniroute_set_compression_engine` MCP 도구는 불리언 `outputMode`
인수를 통해 이를 기록합니다. 비어 있지 않은 `outputStyles` 선택은 이 스위치보다 우선합니다. 대시보드에서
**Terse prose** 출력 스타일을 활성화하면 동일한 블록이 주입됩니다(아래 Output
Styles 참조).

### 출력 스타일(카탈로그)

위의 원시인 출력 모드는 **레거시 단일 스타일 경로**입니다. Phase 4에서는 이를
조합 가능한 출력 스타일 카탈로그인
`open-sse/services/compression/outputStyles/catalog.ts`의 `OUTPUT_STYLE_CATALOG`로
일반화했습니다. 각 스타일은 모델 자체에 더 저렴한 출력을 요청하는 시스템 프롬프트
지침입니다. 스타일은 함께 활성화할 수 있으며 카탈로그 순서대로 주입됩니다.

| 스타일                          | `id`            | 수행 작업                                                                                                                                                                                                                                                                    | 지침 언어                                     |
| ------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 간결한 산문                     | `terse-prose`   | 군더더기/관사/완곡한 표현을 제거하고 기술적 내용은 정확히 유지합니다. 레거시 원시인 출력 모드와 동일한 텍스트입니다(다시 작성하지 않고 참조).                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 더 적은 코드                    | `less-code`     | YAGNI 단계: 작동하는 최소 변경만 수행하고, 요청하지 않은 추상화는 만들지 않습니다.                                                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 포니테일(게으른 시니어 개발자)  | `ponytail`      | "최고의 코드는 작성하지 않은 코드다": 재작성보다 재사용, 증상보다 근본 원인, 작동하는 가장 짧은 diff를 우선합니다.                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ADHD가 있습니다(행동 우선)      | `i-have-adhd`   | 행동 우선(설명보다 명령어/경로/스니펫 먼저), 개수가 제한된 번호 매기기 단계, 구체적인 다음 단계 단 하나, 서문/요약/맺음말 없음. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)(MIT)에서 각색했습니다.                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 안티슬롭 UI 필터                | `antislop-ui`   | 모든 시각적 기법은 목적 테스트(계층 구조, 정체성, 가독성)를 통과해야 합니다. 기본 그라디언트/글래스/글로 효과를 사용하지 않고, 팔레트를 제한하며, 템플릿 레이아웃을 사용하지 않습니다. 두 안티슬롭 스타일 모두 작동하지 않는 컨트롤 금지/조작된 주장 금지 경계를 추가합니다. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 안티슬롭 문구 및 인간 중심 필터 | `antislop-copy` | 구체적인 문구(전각 대시, 일반적인 CTA, 유행어, 챗봇식 맺음말, 지어낸 사실 금지)와 사용자 관련 규칙: WCAG AA 대비, 명확한 포커스, 키보드 접근성, 빈 상태/로딩/오류 상태, 모바일 리플로우.                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 간결한 CJK(文言)                | `terse-cjk`     | `full`/`ultra` 답변은 한문(文言)으로 작성하며, `lite`는 기능어, 인사말 또는 수식 없이 간단히 답변하도록만 요청합니다.                                                                                                                                                        | zh(로케일 제한, 아래 참조)                    |

모든 스타일은 `lite`, `full`, `ultra`의 세 가지 강도 레벨을 제공하며, 모든 레벨은
공통 경계 조항(`outputMode.ts`의 `SHARED_BOUNDARIES`)으로 끝납니다. 이 조항은
코드 블록, 파일 경로, 명령어, 오류 및 URL을 정확히 유지합니다. `terse-prose`와
`terse-cjk`의 레벨 텍스트는 해당 목록에 식별자도 추가합니다.

`terse-cjk`는 두 곳에서 `zh` 로케일로 제한됩니다. Compression Settings 페이지는
대시보드 UI 언어가 중국어(`zh-CN` 또는 `zh-TW`)일 때만 해당 행을 표시하고,
`applyOutputStyles()`는 요청에서 결정된 언어(아래 언어
선택 참조)가 `zh`일 때만 이를 주입합니다. 행을 숨겨도 저장된 `terse-cjk` 선택은
지워지지 않습니다. 설정 API는 모든 스타일 id를 허용하며, 페이지에서 다른 스타일을
저장해도 이 선택은 유지됩니다. 요청 시점에는 `applyOutputStyles()`의 언어 검사가
유일한 로케일 제한입니다.

#### 주입 작동 방식

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)는 선택 항목을
카탈로그와 대조해 해석합니다(알 수 없는 id와 로케일이 일치하지 않는 스타일은
제외되며 오류가 발생하지 않습니다. 해석 결과 적용할 스타일이 없는 선택은 본문을
변경하지 않고 `no_styles`로 건너뜁니다). 선택된 지침을 카탈로그 순서대로
연결하고, 경계 조항을 **한 번만** 추가하며(`less-code` 또는 `ponytail`이 선택된
경우 안전 조항인 `SAFETY_BOUNDARIES` 또는 해당 번역도 추가), 단일 멱등성 마커
(`[OmniRoute Output Styles]`)로 블록을 시작하므로 다시 적용해도 아무 작업도 하지
않습니다. 해석된 언어(아래의 언어 선택 참조)에 번역이 있으면 영어 대신 현지화된
지침이 삽입됩니다.

비어 있지 않은 `messages` 배열이 있는 본문에서는 콘텐츠 우회 검사보다 멱등성
검사가 먼저 실행됩니다. `[OmniRoute Output Styles]` 마커가 이미 최상위 `system`
필드(문자열 또는 콘텐츠 블록 배열)에 있거나 문자열 콘텐츠가 있는 시스템 메시지에
있으면 본문을 `already_applied` 상태로 변경하지 않고 키워드 검사도 실행하지
않습니다. 그렇지 않으면 콘텐츠 우회(`open-sse/services/compression/outputMode.ts`의
`shouldBypassCavemanOutputMode()`)가 역할과 관계없이 마지막 메시지 세 개의 텍스트를
검사합니다. 해당 텍스트가 보안, 되돌릴 수 없는 작업 또는 명확화 키워드와
일치하거나, 순서에 민감한 시퀀스에서 `first`, `then`, `after that`, `before`,
`rollback` 또는 `backup` 뒤 240자 이내에 `delete`, `drop`, `migrate`, `deploy`
또는 `release`가 나오면 해당 턴 전체에서 스타일 적용을 건너뜁니다. 우회는
**Auto-Clarity Bypass** 토글(`cavemanOutputMode.autoClarity`, 기본적으로 켜짐)이
켜져 있는 동안 실행되며, 토글을 끄면 키워드 검사를 건너뜁니다.

우회가 해당 턴을 통과시키면, 새 `messages[0]`을 절대 생성하지 않는
`placeSystemInstruction()`(같은 파일)이 다음 중 처음 발견되는 위치에 블록을
배치합니다.

1. 맨 앞의 시스템 메시지에 문자열 콘텐츠가 있는 경우: 해당 텍스트 뒤에 블록을 추가합니다.
2. 최상위 `system` 필드가 있는 경우: 문자열이면 텍스트 뒤에 블록을 추가하고,
   콘텐츠 블록 배열이면 새 텍스트 블록으로 추가합니다.
3. 이후에 나오는 첫 번째 시스템 메시지에 문자열 콘텐츠가 있는 경우: 해당
   텍스트 뒤에 블록을 추가합니다.
4. 위 항목 중 어느 것도 해당하지 않는 경우: `messages` 끝에 새 시스템 메시지를
   만들어 블록을 넣습니다.

`messages` 배열이 없거나 빈 본문에서는 콘텐츠 우회가 실행되지 않으며 최상위
`system` 필드도 참조하지 않습니다. 문자열 `instructions` 필드의 텍스트 뒤에
블록을 추가합니다. 단, 해당 필드에 이미 `[OmniRoute Output Styles]` 마커가
있으면 본문을 `already_applied` 상태로 변경하지 않습니다. 본문에 문자열
`instructions` 필드는 없지만 `input`(문자열 또는 배열)이 있으면 블록이
`instructions`가 되며, 해당 필드에 있던 문자열이 아닌 값을 대체합니다. 문자열
`instructions` 필드도 없고 문자열 또는 배열 `input`도 없는 본문은 변경하지 않고
`no_messages`로 건너뜁니다.

#### 활성화 방법

대시보드에서 **Compression Context → Compression Settings**
(`/dashboard/context/settings`)의 Output styles 섹션을 사용합니다. 각 스타일마다
켜기/끄기 토글과 수준 선택기가 한 행씩 제공됩니다. 압축 자체(페이지의 마스터 토글
`enabled`)가 켜져 있는 동안 스타일이 삽입됩니다. **Auto-Clarity Bypass** 토글은
**Caveman** 페이지(`/dashboard/context/caveman`)의 **Output Mode** 카드에
있습니다. 프로그래밍 방식에서는 압축 구성이 선택 항목을 다음과 같이 저장합니다.

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

하위 호환성: `outputStyles`가 비어 있는 동안 기존
`cavemanOutputMode.enabled` 설정은 `cavemanOutputMode.intensity` 수준의
`terse-prose`에 매핑됩니다. 그러면 블록은 `[OmniRoute Output Styles]` 마커로
시작합니다. 기존 `applyCavemanOutputMode()` 삽입기는
`[OmniRoute Caveman Output Mode]`를 사용했습니다. 마커 아래 텍스트는 en, pt-BR,
es, de, fr, it, ru, id 및 vi에서 기존 삽입 내용과 일치하며, ja와 zh에서는 경계
조항 앞에 공백이 하나 더 들어갑니다. `terse-prose`는 pt-BR, es, de, fr, it, ru,
zh, ja, id 및 vi로 번역되므로 해석된 언어가 `hu`인 요청에는 기존 삽입기가
헝가리어 텍스트를 사용했던 것과 달리 영어 텍스트가 사용됩니다.

출력 스타일 언어 선택(`outputStyles/apply.ts`의
`resolveOutputStyleLanguage()`): `languageConfig.enabled`가 켜진 상태에서
`autoDetect`는 요청의 `messages` 배열에 있는 텍스트가 포함된 가장 최근 사용자
메시지(문자열 콘텐츠 또는 콘텐츠 파트의 `text`)를 샘플링하고 Caveman 엔진의
감지기(`detectCompressionLanguage()`)를 실행합니다. 감지기는 가나 없이 한자가
포함된 텍스트에 대해 `zh`를 반환합니다. 그 외에는 `it`, `pt-BR`, `es`, `de`,
`fr`, `ru`, `ja`, `hu`, `id` 중 힌트 일치 수가 가장 많은 언어를 반환하고,
일치하는 항목이 없으면 `en`을 반환합니다. 분류할 수 없는 텍스트에는
`defaultLanguage`가 아니라 항상 영어를 사용하며, 스타일에 `vi` 텍스트가
포함되어 있어도 `vi`는 감지되지 않습니다. Responses API 본문은 턴을 `input`에
보관하는데, 이는 샘플링되지 않으므로 `defaultLanguage`를 사용한 뒤 영어로
대체됩니다. `messages`에 텍스트가 있는 사용자 메시지가 없거나 `autoDetect`가
꺼져 있으면 `defaultLanguage`가 적용된 뒤 영어로 대체됩니다.
`languageConfig.enabled`가 꺼져 있으면 언어는 영어입니다. 단, 압축 콤보가 요청에
적용되는 경우(요청의 라우팅 콤보에 할당된 콤보 또는 내장 스택 파이프라인에서
chatCore가 대체 사용하도록 설정된 기본 압축 콤보)는 예외입니다. 콤보를 적용하면
해당 요청에서 `languageConfig.enabled`가 켜지고 콤보의 언어 팩을 기준으로
`defaultLanguage`가 설정됩니다. 저장된 값이 콤보의 팩 중 하나라면 그 값을
사용하고, 그렇지 않으면 기본값이 `en`인 콤보의 첫 번째 팩을 사용합니다. 이때
저장된 `autoDetect` 설정(기본적으로 켜짐)은 계속 적용됩니다. Caveman 입력 엔진은
다른 방식으로 규칙 팩 언어를 선택합니다. 즉, 텍스트 파트별로 선택하며 자동 감지가
꺼져 있을 때는 `enabledPacks`를 기준으로 제한합니다.

스타일 × 언어 매트릭스는
`tests/unit/compression/output-styles-i18n-matrix.test.ts`에 의해 고정됩니다. 모든 카탈로그 스타일에는 테스트의 `BASELINE_LANGUAGES`에
항목이 있어야 합니다. 로케일 제한이 없는 스타일은 pt-BR 번역을 제공해야 하며
(로케일 제한이 있는 `terse-cjk`는 이 규칙에서 제외됨), 그렇지 않으면
`KNOWN_ENGLISH_ONLY`에 등록되어야 합니다. 여기에는 번역이 전혀 없는 스타일만 포함할 수 있습니다.
등록된 스타일에 번역이 하나라도 있으면 테스트에 실패합니다. 또한 스타일이
해당 `BASELINE_LANGUAGES` 항목에 나열된 언어를 잃으면 테스트에 실패합니다. 스타일을 추가하려면
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)를 참조하세요.

### 도구 결과 압축

`open-sse/services/compression/toolResultCompressor.ts`의 `compressToolResult()`는
**5가지 전략**으로 도구 결과 텍스트를 압축합니다. 다음 순서대로 전략을 시도하며, 활성화된 전략 중
검사가 콘텐츠와 일치하는 첫 번째 전략이 결과를 결정합니다.

1. **`fileContent`**: 3줄 이상의 콘텐츠에서 선행 들여쓰기를 무시했을 때 하나 이상의 줄이
   `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` 또는 `return `으로 시작하거나(키워드 뒤에 공백 포함), `if`,
   `for` 또는 `while` 뒤에 `(` 또는 ` (`가 오는 경우 첫 20줄과 마지막 5줄을 유지하고,
   생략된 중간 부분을 표시합니다.
2. **`grepSearch`**: `<path>:<digits>:` 형식의 줄이 하나 이상 있고,
   첫 번째 콜론 앞의 텍스트에 공백이 없는 콘텐츠에서는 해당 줄만 최대 30개까지 유지한 뒤,
   추가 일치 항목의 수와 일치한 파일 목록을 덧붙입니다.
   그 밖의 모든 줄은 삭제됩니다. 이러한 줄 하나만으로도 전략이 실행되므로
   `12:30:45` 같은 타임스탬프로 시작하는 로그 줄도 해당됩니다.
3. **`shellOutput`**: ANSI CSI 시퀀스(`ESC[` 뒤에 숫자 또는
   세미콜론이 오고 그 뒤에 문자가 오는 형태로, 색상 코드가 그 예임)나 텍스트 어디에서든
   공백이 뒤따르는 `$`가 포함된 출력에서는 해당 시퀀스를 제거하고(`ESC[?25l`이나
   OSC 창 제목 시퀀스 같은 다른 이스케이프는 유지됨), 연속으로 반복되는 줄을 하나로 합친 뒤
   마지막 50줄을 유지합니다. 이 검사는 `json` 및 `errorMessage`보다 먼저 실행되므로,
   그러한 `$`가 포함된 JSON 또는 오류 출력은 `shellOutput`이 활성화된 동안
   해당 전략에 도달하지 않습니다.
4. **`json`**: 선택적 공백 뒤에 `{` 또는 `[`로 시작하고 파싱에 성공하는 2,000자 초과의
   JSON 페이로드를 요약합니다. 항목이 7개보다 많은 배열은 첫 5개와 마지막 2개 항목 및
   전체 개수를 유지합니다. 객체는 첫 20개 키를 유지하되, 중첩된 각 객체 또는 배열 값을
   `{…N keys}` 자리 표시자로 대체하고(배열의 경우 N은 배열 길이),
   첫 20개 이후 삭제된 키의 수를 나타내는 `_remaining_<N>_keys` 표시를 추가합니다.
   스칼라 값은 그대로 복사되므로, 중첩된 값이 없는 20개 이하의 키를 가진 객체는
   들여쓰기만 다시 적용됩니다. 따라서 축소된 객체는 문자 수가 늘어나 원본 그대로 유지됩니다.
5. **`errorMessage`**: 대소문자와 관계없이 출력 어디에든 `error:`,
   `error `(`no error found`처럼 단어 뒤에 공백이 있는 경우), `[error]`,
   `exception:`, `exception `, `[exception]` 또는 `traceback`이 포함되어 있으면
   첫 번째 줄, 그다음 10줄, 마지막 3줄을 유지하고, 그 사이의 줄을
   `… [N frames elided] …` 표시로 대체합니다. 이 표시는 첫 번째 줄 뒤에
   13줄보다 많은 줄이 있을 때만 나타나므로 14줄 이하의 오류 출력은 줄어들지 않습니다
   (12줄 또는 13줄에서는 마지막 3줄이 이미 유지된 줄과 중복됨).

전략이 일치하면 절감량이 전혀 없더라도 후속 전략은 시도하지 않습니다.
일치한 전략이 예상 토큰 수(길이 ÷ 4, 올림)를 전혀 절감하지 못하는 경우
(예: 25줄 이하의 코드형 파일 또는 항목이 7개 이하인 2,000자 초과의 JSON 배열),
공격적 엔진은 원래 도구 결과를 유지합니다. 두 호출자(`compressAggressive()` 및
`compressAnthropicToolResultBlock()`) 모두 `saved`가 0 이하이면 원본을 유지하지만,
`compressToolResult()` 자체는 여전히 해당 전략의 출력을 반환합니다. 도구 결과 단계가
최종 결정은 아닙니다. 엔진의 폴백 요약기는 8,192자보다 긴 `tool` 또는 `function`
메시지를 여전히 줄일 수 있습니다(`maxTokensPerMessage` 2,048에 4를 곱한 값).

#### 사용 시점

도구 결과 압축은 공격적 엔진(`open-sse/services/compression/aggressive.ts`의
`compressAggressive()`)의 1단계이므로, Aggressive 모드와 스택형 파이프라인의
`aggressive` 단계에서 실행됩니다. OpenAI 형식의 `tool` 및 `function`
메시지와 Anthropic `tool_result` 블록 내부의 텍스트를 압축합니다. 각 전략에는
`aggressive.toolStrategies` 아래에 자체 스위치가 있으며, 모두 기본적으로 활성화되어 있습니다.
대시보드에서 압축이 활성화되고 기본 모드가 Aggressive일 때 이 스위치는
Caveman 페이지의 **Advanced** 보기에 있습니다.

### 스택형 파이프라인

스택형 모드는 **여러 엔진을 순서대로** 실행합니다. 일반적으로 먼저 RTK를 적용하여
도구 출력에서 60~90%를 절감한 다음, 남은 텍스트에 Caveman을 적용하여 입력을 약 46%
절감합니다. 이를 합성하면 **78~95%의 적용 가능 범위**가 됩니다(위의 업스트림 절감 계산 참조).
`1 - (1 - 0.60..0.90) × (1 - 0.46)`의 평균은 약 89%입니다.

#### 작동 방식

```
입력(1000개 토큰)
  → RTK(명령 인식 필터) → 200개 토큰
    → Caveman(군더더기 제거) → 108개 토큰
  → 출력(108개 토큰, 약 89% 절감)
```

#### 사용 시점

다음과 같은 경우 스택형 모드를 사용하세요.

- 도구 사용이 많은 워크플로(에이전트형 코딩, 조사)
- 비용에 민감한 일괄 처리
- 최대한 많은 토큰을 절감해야 하는 경우

스택형 파이프라인은 전역 `stackedPipeline` 압축 설정을 통해 구성하거나,
라우팅 콤보에 할당된 이름 있는 압축 콤보를 통해 구성합니다(위의 콤보별 재정의 참조).
auto-combo `modePack`을 통해 구성하는 것은 아닙니다(해당 필드는 auto-combo 모델 선택의
가중치만 다시 조정하며, `stacked`는 유효한 팩 이름이 아닙니다).

---

## 압축 콤보 재정의

다양한 사용 사례에 맞게 동작을 세부 조정하기 위해 전역 압축 모드를 **콤보별로** 재정의할 수 있습니다.

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

다음과 같은 경우에 유용합니다.

- **코딩 콤보**: 긴 세션에는 `aggressive` 모드 사용
- **빠른 Q&A 콤보**: 빠른 응답에는 `lite` 모드 사용
- **도구 중심 콤보**: 최대 절감 효과를 위해 `stacked` 모드 사용
- **프로덕션 콤보**: 캐싱 제공자에는 재정의를 사용하지 않음 — 항상 활성화되는
  캐시 인식 조정이 `aggressive`/`ultra`를 자동으로 `standard`로 낮춤
  (선택 가능한 `cache-aware` 모드는 없음)

---

## 참고 항목

- [환경 구성](../reference/ENVIRONMENT.md) — 압축 환경 변수
- [아키텍처 가이드](../architecture/ARCHITECTURE.md) — 압축 파이프라인 내부 구조
- [사용자 가이드](../guides/USER_GUIDE.md) — 압축 시작하기
- [RTK 압축](./RTK_COMPRESSION.md) — RTK 필터, 신뢰 모델, 검증 게이트, 원시 출력 복구
- [압축 엔진](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, 대시보드
- [압축 규칙 형식](./COMPRESSION_RULES_FORMAT.md) — JSON 규칙 팩 형식
- [압축 언어 팩](./COMPRESSION_LANGUAGE_PACKS.md) — 언어별 Caveman 규칙
