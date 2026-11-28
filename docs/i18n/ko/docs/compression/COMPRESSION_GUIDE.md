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

### 끄기

압축을 적용하지 않습니다. 모든 메시지가 변경 없이 전달됩니다.

### Lite 모드 (~15% 절감, <1ms 지연 시간)

가장 안전한 모드 — 서식 정리입니다. 도구 결과 잘라내기는 손실이 발생하므로, 기본 경로
(`allow-lossy`, `engine:lite` 또는 명명된 조합의 옵트인 없음)에서는
`compressToolResults: false`로 Lite가 실행됩니다. 이전 도구 결과는 변경 없이 제공자에게 전달됩니다.

| 기법                     | 설명                                                                       |
| ------------------------ | -------------------------------------------------------------------------- |
| `collapseWhitespace`     | 연속된 빈 줄과 줄 끝 공백 병합                                             |
| `dedupSystemPrompt`      | 중복 시스템 메시지 제거                                                    |
| `compressToolResults`    | 이전 도구 결과를 Lite 한도까지 잘라냄 (손실 발생: 요청 옵트인 시에만 사용) |
| `removeRedundantContent` | 반복되는 지침 제거                                                         |
| `replaceImageUrls`       | base64 이미지 데이터 URI 단축                                              |

**적합한 용도:** 항상 켜두는 사용, 안전이 중요한 워크플로.

### Standard 모드 (~30% 절감)

[Caveman](https://github.com/JuliusBrussee/caveman)에서 영감을 받았으며, 의미를 유지하면서 불필요한 단어와 장황한 표현을 제거합니다.

- 불필요한 단어 제거 ("please", "I think", "basically", "actually")
- 장황한 표현 압축 ("in order to" → "to", "as a result of" → "because")
- 정중한 완곡 표현 제거 ("Would you mind...", "If you could possibly...")
- 코딩 프롬프트에 맞게 조정된 30개 이상의 정규식 규칙

**적합한 용도:** 일상적인 코딩 워크플로, 비용을 중시하는 팀.

### Aggressive 모드 (~50% 절감)

긴 세션을 위한 스마트한 기록 관리입니다.

- **메시지 에이징** — 오래된 메시지를 점진적으로 압축
- **도구 결과 압축** — 긴 도구 출력을 잘라내거나 생략 (처음/마지막 줄,
  일치하는 줄 필터링, JSON 키 압축)
- **구조적 무결성 보호** — `tool_use` + `tool_result` 쌍의 일관성 유지
- **컨텍스트 윈도 인식** — 모델별 토큰 제한 준수

**적합한 용도:** 장시간 디버깅 세션, 대규모 코드베이스.

### Ultra 모드 (~75% 절감)

토큰이 중요한 시나리오를 위한 최대 압축입니다.

- **휴리스틱 가지치기** — 점수 기반으로 산문 토큰을 가지침
- **구조 보존** — 펜스 코드 블록, 인라인 코드, URL 및 식별자는 무덤 처리 후 원문 그대로 다시 결합하며, 절대 가지치기하지 않음
- **선택적 SLM 계층** — 구성된 경우 소형 로컬 모델이 가지치기를 개선할 수 있음
- Aggressive 모드와 독립적으로 동작: 메시지 에이징, 도구 결과 압축 또는 대체 요약기를 실행하지 않음 (SLM 계층 실패 시에만 대체 처리가 Aggressive를 통해 라우팅될 수 있음)

**적합한 용도:** 컨텍스트 제한에 반복적으로 도달하는 경우.

### RTK 모드 (업스트림 범위의 60-90%)

RTK 모드는 코딩 에이전트 세션에 나타나는 장황한 도구 출력에 최적화되어 있습니다.

- `git status`, `git diff`, `git log`, 테스트 러너,
  TypeScript/Vite/Webpack 빌드, ESLint/Biome/Prettier, npm 감사/설치, Docker 로그, 인프라
  출력 및 일반 셸 출력과 같은 명령/출력 클래스를 감지
- `open-sse/services/compression/engines/rtk/filters/`의 JSON 필터 팩 적용
- 프로젝트 또는 전역 `filters.toml` 파일에서 RTK TOML 스키마 v1 필터를 가져오며, 인라인 테스트
  검증 및 프로젝트 파일에 대한 신뢰 게이팅 지원
- 인라인 확인 샘플이 포함된 기본 제공 필터 56개 제공
- ANSI 제어 시퀀스, 진행률 표시줄, 반복되는 줄 및 실행 가능한 정보가 아닌 노이즈 제거
- 실패, 오류, 경고, 변경된 파일, 요약 및 긴 출력의 끝부분 보존
- 신뢰 게이팅된 프로젝트 필터, 전역 필터 및 선택적 비식별화 원시 출력 복구 지원

**적합한 용도:** 셸, 빌드, 테스트, git, grep 및 파일 출력 트랜스크립트가 포함된 에이전트 세션.

### Stacked 모드 (적용 가능 범위의 78-95%)

Stacked 모드는 여러 압축 엔진을 결정적인 순서로 실행합니다. 기본 파이프라인은 다음과 같습니다.

```txt
RTK -> Caveman
```

이 순서를 사용하면 먼저 터미널/도구 출력이 간결해지고, 그다음 남은 자연어 프롬프트에
Caveman의 의미 압축이 적용됩니다. Stacked 파이프라인은 전역으로 구성하거나 라우팅 조합에
할당된 압축 조합을 통해 구성할 수 있습니다.

**적합한 용도:** 대규모 도구 로그와 사람의 지침 또는 어시스턴트 요약이 함께 있는 혼합 컨텍스트.

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
- **Compression Combos** — 라우팅 콤보에 할당되는 이름이 지정된 엔진 파이프라인
- **Auto-Trigger Threshold** — 토큰 수가 임계값을 초과하면 자동으로 압축 활성화

### 콤보별 재정의

`Dashboard → Context & Cache → Compression Combos`에서 라우팅
콤보에 압축 콤보를 할당합니다.

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

이를 통해 유료 구독에서는 라이트 모드를 유지하면서 무료/코딩 제공업체에서 스택형 압축을
사용할 수 있습니다.

이 "Per-Combo Override" 할당은 **routing-combo compression
mode** 재정의(Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — 필드의 스키마는
`rtk`, `stacked` 및 `omniglyph`도 허용)와는 다른 제어 기능입니다. 후자의 재정의는 이름이 지정된
compression-combo 파이프라인을 선택하지 않고, `resolveCompressionPlan`에서 참조하는
`compressionMode` 필드만 설정합니다. 이 설정은 콤보 카드(`Dashboard → Combos`)에서 지정하거나,
#6760부터는 위에서 설명한 파이프라인 할당 체크박스 바로 옆에 있는
`Dashboard → Context & Cache → Compression Combos`의 "Assign to routing" 목록에서
라우팅 콤보별로 지정할 수 있습니다. 두 UI 모두 동일한 `PUT /api/combos/{id}` 엔드포인트를
통해 저장됩니다.

### 요청별 재정의

단일 요청의 압축 계획을 재정의하려면 `x-omniroute-compression` 요청 헤더를 전송합니다.
이 헤더의 우선순위가 가장 높으므로 라우팅 콤보 재정의, 활성 프로필,
자동 트리거 및 패널 Default보다 우선합니다. 알 수 없는 값은 무시되며(요청은 거부되지 않음),
전역 마스터 스위치가 여전히 모든 기능을 제어합니다. 전역적으로 압축이 꺼져 있으면 헤더로
압축을 활성화할 수 없습니다. 값:

| 값            | 효과                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `off`         | 이 요청에 압축을 적용하지 않습니다.                                                               |
| `default`     | 패널에서 파생된 Default 프로필(활성 프로필 무시)입니다. 손실 엔진은 비활성화된 상태로 유지됩니다. |
| `safe`        | 헤더를 생략한 것과 동일합니다.                                                                    |
| `allow-lossy` | 요약, 관련성 필터 및 스타일 재작성 등을 포함하여 이 요청의 연산자 계획을 유지합니다.              |
| `engine:<id>` | 활성화된 경우 단일 엔진을 사용합니다(예: `engine:rtk`). 해당 엔진에 대한 요청별 옵트인입니다.     |
| `<combo>`     | 이름으로 먼저 대소문자를 구분하지 않고 일치시킨 다음 ID로 일치시키는 이름이 지정된 콤보입니다.    |

`allow-lossy`, `engine:<id>` 또는 이름이 지정된 콤보가 없으면 손실 엔진이 적용되지 않습니다. 손실
Default, 자동 트리거 또는 라우팅 재정의가 하향 조정되면 OmniRoute는 구성된 스택형 파이프라인에서
인식된 무손실 단계를 구성된 순서대로 유지합니다. 구성된 무손실 단계가 하나도 남지 않은 경우에만
`session-dedup → lite`로 대체됩니다.

Settings 패널의 **Effective pipeline** 미리 보기에는 일반적인 저장 상태 계획이 표시됩니다. 자동
트리거를 실행할 수 있는 경우에는 동일한 미리 보기에 조건부 유효 파이프라인도 표시되므로 패널과
헤더가 없는 런타임 확인 결과가 일치합니다.

적용된 계획은 `X-OmniRoute-Compression: <mode>; source=<source>` 응답
헤더로 반환되며, 여기서 `<source>`는 `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` 또는 `off` 중 하나입니다.

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

# RTK 필터 팩 나열
curl http://localhost:20128/api/context/rtk/filters

# 선택적 명령 메타데이터와 함께 RTK 직접 테스트
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

모든 압축된 요청에는 서버 로그의 통계가 포함됩니다.

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

위에서 설명한 7가지 모드(소스는 이 가이드에서 다루지 않는 `codex-responses` 및 `omniglyph` 모드도 허용함) 외에도 아래 섹션에서는 해당 모드 내부 또는 함께 작동하는 기능을 다룹니다. 도구 결과 압축 및 프로그레시브 에이징은 공격적 엔진의 1단계와 2단계(공격적 모드 및 스택 파이프라인의 `aggressive` 단계)이고, 스택 파이프라인은 스택 모드가 실행되는 방식이며, 캐시 인식 압축은 `aggressive` 및 `ultra` `standard` 로 다운그레이드합니다. 압축이 켜져 있는 동안 공급자를 캐싱하고 Caveman 출력 모드 및 출력 스타일은 요청을 압축하는 대신 모델의 출력을 형성하는 옵트인 시스템 프롬프트 지침(기본적으로 꺼져 있음)입니다.

### 캐시 인식 압축

일부 공급자(예: 프롬프트 캐싱 기능이 있는 Anthropic )는 지원합니다.** 프롬프트 캐싱** , 프롬프트의 일부를 캐시하여 비용과 대기 시간을 줄일 수 있습니다. 캐싱이 활성화되면 공격적인 압축이 실제로** 아프다** 캐시된 토큰을 변경하여 캐시를 무효화하기 때문에 성능이 저하됩니다.

`cachingAware.ts` 모듈은 이를 다음과 같이 해결합니다.** 캐싱 컨텍스트 감지** 그리고** 압축 전략 조정** 따라서.

#### 작동 원리

1. **캐싱 컨텍스트 감지** — 요청 본문에서 `cache_control` 마커를 검색합니다.
2. **캐싱 공급자 식별** — 대상 공급자가 캐싱을 지원하는지 확인합니다.
3. **전략 조정** — 캐싱 공급자를 위해 `aggressive`/`ultra` 를 `standard` 로 다운그레이드함
4. **시스템 프롬프트 건너뛰기** — 시스템 프롬프트는 일반적으로 캐시되므로 압축하지 마십시오.

전략 도우미도 `deterministicOnly` 플래그를 반환하지만 계획 작성기는 — 전략만 사용하며 현재 다운스트림에서는 플래그를 읽지 않습니다.

#### 코드 예시

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 언제 사용하나요?

캐시 인식 압축은** 항상 켜져** — 구성이 필요하지 않습니다. 압축이 켜져 있고 대상 공급자가 프롬프트 캐싱(Anthropic, OpenAI 등)을 지원할 때마다 시작됩니다. 명시적인 `cache_control` 마커는 필요하지 않습니다. — 캐싱 공급자만으로는 다운그레이드를 트리거하고 마커만으로는 절대 그렇게 하지 않습니다(마커 감지는 전략 결정이 아닌 캐시 원격 측정을 제공합니다).

OpenRouter `anthropic/*` 모델에 대해서만 캐싱 공급자로 간주됩니다. Claude 코드 요청은 `cache_control` 중단점(최대 4개)을 유지하고 가드는 접두사를 보호하는 반면 다른 모든 OpenRouter 제품군(`openai/`, `google/`, `qwen/`, …)은 제거되고 보호되지 않은 상태로 유지됩니다.

### 점진적인 노화

긴 대화에는 많은 메시지 차례가 누적되지만 오래된 차례는 관련성이 떨어집니다. `progressiveAging.ts` 모듈** 회전 거리에 따라 메시지 품질이 저하됩니다.** (대화 종료 시점부터 측정된 거리) 제공된 기본값(`verbatim: 2, light: 2, moderate: 3`):

- **마지막 2턴(거리 ≤ 2)** : 그대로 유지
- **거리 3** : 케이브맨 컴프레션(필러제거)
- **거리 +** : 어시스턴트 메시지 요약 사용자 메시지는 첫 번째 줄로 줄어들고 최대 120자로 제한됩니다. 다른 역할은 그대로 유지됩니다. 시스템 프롬프트, 이미 오래된 메시지 및 최신 사용자 메시지는 거리에 관계없이 항상 그대로 유지됩니다. 아무 것도 바로 삭제되지 않으며, 제공된 기본값(`light` `verbatim` 와 같음)으로는 `light` 대역에 도달할 수 없습니다.

#### 코드 예시

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### 언제 사용하나요?

점진적인 노화는** 항상 켜져** `aggressive` 모드 — 의 경우 `compressAggressive()` 의 2단계입니다. 울트라 모드에서는 실행되지 않습니다. 특히 다음과 같은 경우에 효과적입니다.

- 장기 실행 코딩 세션
- 여러 날에 걸친 대화
- 도구 호출이 많은 에이전트 워크플로

### 원시인 출력 모드

원시인 출력 모드 추가** 시스템 프롬프트 지침** 모델 자체에 간결한 출력을 요청합니다. — `lite` 레벨은 전체 문장을 유지하는 간결한 답변을 요청하고, `full` "똑똑한 원시인처럼 간결하게 응답"하도록 요청하고, `ultra` 전신 출력을 요청합니다. 지침은 단지 물어볼 뿐이며 보장할 수는 없습니다. 요청은 `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)를 통해 이를 수신합니다. `open-sse/handlers/chatCore.ts` 먼저 하위 호환 shim(`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`)을 사용하여 선택을 해결합니다. 이는 `outputStyles` 비어 있는 동안 활성화된 `cavemanOutputMode` `cavemanOutputMode.intensity` 의 `terse-prose` 출력 스타일에 매핑합니다(아래 하위 호환 참조). 비어 있지 않은 `outputStyles` 선택은 그대로 사용되며 `cavemanOutputMode.enabled` 및 `intensity` 아무런 영향을 미치지 않지만 `autoClarity` 토글은 계속 적용됩니다. `outputMode.ts` 지침 텍스트(`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), 콘텐츠 우회 및 삽입에 사용되는 배치 도우미를 보유합니다. 자체 `applyCavemanOutputMode()` 인젝터에는 프로덕션 호출자가 없습니다.

#### 작동 원리

이 모드는 입력을 압축하지 않습니다. 시스템 프롬프트에 명령 블록을 추가하고(아래 주입 작동 방식 참조) 요청에 대해 선택된 모든 입력 압축 모드는 이제 블록을 전달하는 본문에서 이후에도 계속 실행됩니다. 모든 레벨이 끝나는 공유 경계 조항 앞에 영어 `full` 레벨은 다음과 같습니다.

> "똑똑한 원시인처럼 간결하게 응답하세요. 기사 삭제(a/an/the), 필러(just/really/basically/actually/simply), 유쾌한 말, 헤징. 조각 OK. 짧은 동의어(크지 않고 광범위하지 않고 수정되지 않음). 모든 기술적 내용, 코드, 오류, URLs, 식별자를 정확하게 유지하세요."

이는 특히 다음과 같은 경우에 효과적입니다.

- 코드 생성(더 간결한 출력 = 더 적은 토큰)
- 빠른 Q&A (자세한 설명은 필요 없습니다)
- 일괄 처리(처리량 최대화)

#### 언제 사용하나요?

원시인 출력 모드는** 선택** . 압축을 켠 상태에서(`enabled: true`, 압축 설정 페이지의 마스터 토글) `cavemanOutputMode.enabled` 로 켭니다. `intensity` `lite`, `full` 또는 `ultra` 선택합니다.

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

압축 콤보의** 출력 모드** 토글(`outputMode`, `outputModeIntensity` 의 레벨 )은 콤보가 적용되는 요청에 대해 동일한 스위치를 설정하고 `omniroute_set_compression_engine` MCP 도구는 부울 `outputMode` 인수를 통해 이를 기록합니다. 비어 있지 않은 `outputStyles` 선택이 이 스위치보다 우선합니다. 대시보드에서** 간결한 산문** 출력 스타일은 동일한 블록을 삽입합니다(아래 출력 스타일 참조).

### 출력 스타일(카탈로그)

위의 Caveman 출력 모드는** 레거시 단일 스타일 경로** . 4단계에서는 이를 구성 가능한 출력 스타일의 카탈로그인 `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts` 로 일반화했습니다. 각 스타일은 모델 자체에 더 저렴한 출력을 요청하는 시스템 프롬프트 명령입니다. 스타일은 함께 활성화할 수 있으며 카탈로그 순서대로 삽입됩니다.

| 스타일                                  | `id`            | 기능                                                                                                                                                                                                                                   | 지시 언어                                     |
| --------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 간결한 산문                             | `terse-prose`   | 드롭 filler/articles/hedging; 기술적 내용을 정확하게 유지하세요. 레거시 원시인 출력 모드와 동일한 텍스트(참조되고 다시 입력되지 않음)                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 적은 코드                               | `less-code`     | YAGNI ladder: 최소한의 작업 변경, 요청되지 않은 추상화 없음.                                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 포니테일(게으른 선배 개발자)            | `ponytail`      | "가장 좋은 코드는 전혀 작성되지 않은 코드입니다.": > 재작성 재사용, > 증상의 근본 원인, 최단 작업 diff.                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 나는 ADHD (행동 우선)를 가지고 있습니다 | `i-have-adhd`   | 작업 우선(산문 앞의 command/path/snippet ), 번호가 지정된 제한된 단계, ONE 구체적인 다음 단계, preamble/recap/closers. 없음 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) 에서 적응(MIT).                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 미끄럼 방지 UI 필터                     | `antislop-ui`   | 모든 시각적 기술은 목적 테스트(계층 구조, 정체성, 가독성)를 통과해야 합니다. 기본 gradients/glass/glow 없음, 제한된 팔레트, 템플릿 레이아웃 없음. 두 가지 안티 슬롭 스타일 모두 데드 컨트롤 없음/조작된 클레임 없음 경계를 추가합니다. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 안티 슬롭 카피 및 휴먼 필터             | `antislop-copy` | 특정 카피(엠 대시 없음, 일반 CTAs, 유행어, 챗봇 클로저, 발명된 사실)와 사람 규칙: WCAG AA 대비, 시각적 초점, 키보드 범위, empty/loading/error 상태, 모바일 리플로우.                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                        | `terse-cjk`     | `full`/`ultra` 답변(중국어 고전(文言)); `lite` 기능어, 인사말 또는 장식 없이 간단한 답변만 요구합니다.                                                                                                                                 | zh(로케일 지정, 아래 참조)                    |

모든 스타일은 세 가지 강도 수준 — `lite`, `full`, `ultra` — 제공하며 모든 수준은 코드 블록, 파일 경로, 명령, 오류 및 URLs 정확하게 유지하는 공유 경계 절(`SHARED_BOUNDARIES` in `outputMode.ts`)로 끝납니다. `terse-prose` 및 `terse-cjk` 레벨 텍스트는 해당 목록에 식별자를 추가합니다.

`terse-cjk` 는 두 곳에서 `zh` 로 로케일 지정됩니다. 압축 설정 페이지에는 대시보드 UI 언어가 중국어(`zh-CN` 또는 `zh-TW`)인 경우에만 해당 행이 나열되며, `applyOutputStyles()` 요청의 해결 언어(아래 언어 선택 참조)가 `zh` 인 경우에만 해당 행을 삽입합니다. 행을 숨기면 저장된 `terse-cjk` 선택이 지워지지 않습니다. API 설정은 모든 스타일 ID를 허용하고 페이지에 다른 스타일을 저장하면 이를 유지합니다. 요청 시 `applyOutputStyles()` 언어 확인은 유일한 로케일 게이트입니다.

#### 주입 작동 방식

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)는 카탈로그에 대해 선택 사항을 확인합니다(알 수 없는 ID 및 로캘이 일치하지 않는 스타일은 삭제되고 오류가 발생하지 않습니다. 스타일이 없는 것으로 확인되는 선택은 본문을 변경하지 않고 `no_styles` 로 건너뜁니다). 선택한 명령을 카탈로그 순서로 연결하고 경계 절을 추가합니다.** 한 번** ( `less-code` 또는 `ponytail` 선택된 경우 안전 조항, `SAFETY_BOUNDARIES` 또는 해당 번역 포함) 단일 멱등성 마커(`[OmniRoute Output Styles]`)로 블록을 시작하므로 다시 적용하는 것은 아무 작업도 하지 않습니다. 확인된 언어(아래 언어 선택 참조)에 번역이 있는 경우 영어 대신 현지화된 지침이 삽입됩니다.

비어 있지 않은 `messages` 배열이 있는 본문에서는 콘텐츠 우회 전에 멱등성 검사가 실행됩니다. `[OmniRoute Output Styles]` 마커가 이미 최상위 `system` 필드(문자열 또는 콘텐츠 블록 배열)에 있거나 문자열 콘텐츠가 있는 시스템 메시지에 있는 경우 본문은 `already_applied` 로 변경되지 않고 그대로 유지되며 키워드 확인은 실행되지 않습니다. 그렇지 않으면 콘텐츠 우회( `open-sse/services/compression/outputMode.ts` 의 `shouldBypassCavemanOutputMode()` )는 역할에 관계없이 마지막 세 메시지의 텍스트를 확인 `drop` 해당 텍스트 `after that` 보안, 되돌릴 수 `then` 작업 또는 설명 키워드 또는 `rollback` 구분 `delete` 와 일치할 때 전체 차례 `release` 대한 `backup` `first` 건너뜁니다 `before` `migrate` `deploy` 바이패스가 실행되는 동안** 자동 선명도 우회** 토글(`cavemanOutputMode.autoClarity`, 기본적으로 on)이 켜져 있습니다. 토글을 끄면 키워드 확인을 건너뜁니다.

우회가 통과할 때 새 `messages[0]` 생성하지 않는 `placeSystemInstruction()` (동일 파일)는 발견한 첫 번째 블록에 블록을 배치합니다.

1. 문자열 내용이 포함된 선행 시스템 메시지: 해당 텍스트 뒤에 블록이 추가됩니다.
2. 최상위 `system` 필드: 블록은 문자열 텍스트 뒤에 추가되거나 콘텐츠 블록 배열에 새 텍스트 블록으로 추가됩니다.
3. 문자열 내용이 포함된 첫 번째 이후 시스템 메시지: 해당 텍스트 뒤에 블록이 추가됩니다.
4. 위의 어느 것도 해당되지 않습니다. 블록은 `messages` 끝에 새로운 시스템 메시지로 들어갑니다.

`messages` 배열이 없는(또는 빈 배열이 있는) 본문에서는 콘텐츠 우회가 실행되지 않으며 최상위 `system` 필드가 참조되지 않습니다. 블록은 문자열 `instructions` 필드의 텍스트 뒤에 추가됩니다. 단, 해당 필드에 이미 `[OmniRoute Output Styles]` 마커가 포함되어 있지 않은 경우 본문은 `already_applied` 로 변경되지 않은 상태로 유지됩니다. 본문에 문자열 `instructions` 필드가 없지만 `input` (문자열 또는 배열)가 있으면 블록은 `instructions` 되어 필드에 포함된 문자열이 아닌 값을 대체합니다. 문자열 `instructions` 필드도 없고 문자열이나 배열 `input` 도 없는 본문은 변경되지 않은 채로 남아 있으며 `no_messages` 로 건너뜁니다.

#### 활성화 방법

대시보드에서:** 압축 컨텍스트 → 압축 설정** (`/dashboard/context/settings`), 출력 스타일 섹션: on/off 토글 및 레벨 선택기가 있는 스타일당 한 행. 압축 자체가 켜져 있는 동안 스타일이 주입됩니다(페이지의 마스터 토글, `enabled`). 그만큼** 자동 선명도 우회** 토글이 켜져 있어요** 동굴 탐험가** 페이지(`/dashboard/context/caveman`)** 출력 모드** 카드. 프로그래밍 방식으로 압축 구성은 선택 항목을 다음과 같이 유지합니다.

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

역호환: `outputStyles` 비어 있는 동안 레거시 `cavemanOutputMode.enabled` 설정은 `cavemanOutputMode.intensity` 에서 `terse-prose` 에 매핑됩니다. 그런 다음 블록은 레거시 `applyCavemanOutputMode()` 인젝터가 `[OmniRoute Caveman Output Mode]` 쓴 `[OmniRoute Output Styles]` 마커로 시작합니다. 마커 아래의 텍스트는 en, pt-BR, es, de, fr, it, ru, id 및 vi의 레거시 삽입과 일치합니다. ja 및 zh에서는 경계 절 앞에 하나의 추가 공간이 있습니다. `terse-prose` 는 pt-BR, es, de, fr, it, ru, zh, ja, id 및 vi로 변환되므로 해결 언어가 `hu` 인 요청은 레거시 인젝터가 헝가리어를 사용한 영어 텍스트를 가져옵니다.

출력 스타일 언어 선택( `outputStyles/apply.ts` 의 `resolveOutputStyleLanguage()` ): `languageConfig.enabled` 켜져 있으면 `autoDetect` 요청의 `messages` 배열에서 텍스트(문자열 콘텐츠 또는 해당 콘텐츠 부분의 `text` )가 있는 최신 사용자 메시지를 샘플링하고 거기에서 Caveman 엔진 감지기(`detectCompressionLanguage()`)를 실행합니다. 감지기는 Han 문자가 있고 가나가 없는 텍스트에 대해 `zh` 반환합니다. 그렇지 않으면 `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` 및 `id` 중 힌트 일치가 가장 많은 항목을 반환하고 `en` 분류할 수 없는 — 텍스트와 일치하지 않으면 영어를 가져오고 `defaultLanguage` 절대 얻지 않으며 스타일이 `vi` 텍스트를 제공하더라도 `vi` 감지되지 않습니다. 응답 API 본문은 샘플링되지 않은 `input` 에서 순서를 유지하므로 `defaultLanguage` 얻은 다음 영어를 얻습니다. `messages` 에 텍스트가 있는 사용자 메시지가 없거나 `autoDetect` 가 꺼진 경우 `defaultLanguage` 적용되고 영어가 적용됩니다. `languageConfig.enabled` 끄면 압축 콤보가 요청에 적용되지 않는 한 언어는 영어 — 입니다(요청의 라우팅 콤보에 할당된 콤보 또는 기본 제공 스택 파이프라인에 대해 chatCore 대체되는 기본 압축 콤보). 콤보를 적용하면 해당 요청에 대해 `languageConfig.enabled` 켜지고 콤보의 언어 팩에서 `defaultLanguage` 설정됩니다(콤보 팩 중 하나인 경우 저장된 값, 그렇지 않으면 콤보의 첫 번째 팩, 기본값은 `en`). 저장된 `autoDetect` (기본적으로 켜져 있음)는 계속 적용됩니다. Caveman 입력 엔진은 텍스트 부분별로 규칙 팩 언어를 다르게 — 선택하고 자동 감지 기능을 끄면 `enabledPacks` 에 대해 게이트됩니다.

스타일 × 언어 매트릭스는 `tests/unit/compression/output-styles-i18n-matrix.test.ts` 에 의해 고정됩니다. 모든 카탈로그 스타일은 테스트의 `BASELINE_LANGUAGES` 에 항목이 필요합니다. 로케일 지정되지 않은 스타일은 `KNOWN_ENGLISH_ONLY` 에 나열되지 않는 한 pt-BR 번역을 제공해야 합니다(로케일 지정 `terse-cjk` 이 규칙에서 제외됩니다). 이는 번역이 전혀 없는 스타일만 보유할 수 있습니다. — 번역이 있는 나열된 스타일은 테스트에 실패합니다. `BASELINE_LANGUAGES` 항목에 나열된 언어가 손실되면 스타일이 테스트에 실패합니다. 스타일을 추가하려면 [EXTENDING_COMPRESSION.md 를](./EXTENDING_COMPRESSION.md#adding-an-output-style) 참조하세요.

### 도구 결과 압축

`open-sse/services/compression/toolResultCompressor.ts` 의 `compressToolResult()` 는 도구 결과 텍스트를 다음과 같이 압축합니다.** 5가지 전략** . 이 순서대로 시도하고 내용과 일치하는 확인이 처음으로 활성화된 전략에 따라 결과가 결정됩니다.

1. **`fileContent`** : 선행 들여쓰기를 무시하고 최소 한 줄이 `import `, `export `, `function `, `class `, `const `, `let `, `var ` 또는 `return ` (키워드에 공백 추가)로 시작하거나 `if`, `for` 또는 `while` 다음에 `(` 또는 ` (` 으로 시작하는 3개 이상의 줄 콘텐츠는 생략된 가운데가 표시된 상태로 처음 20줄과 마지막 5줄을 유지합니다.
2. **`grepSearch`** : `<path>:<digits>:` 형식의 한 줄 이상이 있는 콘텐츠(첫 번째 콜론 앞의 텍스트에는 공백이 없음)는 최대 30줄만 유지하고 그 뒤에 추가 일치 항목 수와 일치하는 파일 목록이 옵니다. 다른 모든 줄은 삭제됩니다. 그러한 라인 하나만으로도 전략을 실행하기에 충분하므로 `12:30:45` 와 같은 타임스탬프로 시작하는 로그 라인도 포함됩니다.
3. **`shellOutput`** : ANSI CSI 시퀀스(색상 코드에서와 같이 `ESC[` 다음에 숫자 또는 세미콜론 다음 문자) 또는 텍스트의 어느 위치에서나 `$` 뒤에 공백이 포함된 출력은 해당 시퀀스를 잃고( `ESC[?25l` 또는 OSC 창 제목 시퀀스와 같은 다른 이스케이프는 유지됨) 연속 반복 행이 축소된 상태로 마지막 50줄을 유지합니다. 이 검사는 `json` 및 `errorMessage` 이전에 실행되기 때문에 JSON 또는 `$` 포함된 오류 출력은 `shellOutput` 켜져 있는 동안 절대 도달하지 않습니다.
4. **`json`** : `{` 또는 `[` (선택적 공백 뒤)로 시작하고 구문 분석하는 2,000자를 초과하는 JSON 페이로드가 요약됩니다. 7개가 넘는 항목의 배열은 처음 5개와 마지막 2개의 항목과 총 개수를 유지하고, 객체는 처음 20개의 키를 유지합니다. 각 중첩된 객체 또는 배열 값은 `{…N keys}` 자리 표시자(배열의 경우 N은 길이)로 대체되고 처음 20개를 지나 떨어진 키를 계산하는 `_remaining_<N>_keys` 마커가 있습니다. 스칼라 값은 전체로 복사되므로 중첩된 값이 없는 키가 20개 이하인 객체는 — 만 다시 들여쓰기됩니다. 축소된 객체는 문자를 얻고 변경되지 않은 상태로 유지됩니다.
5. **`errorMessage`**: output that contains, anywhere and in any letter case, `error:`, `error ` (the word followed by a space, as in `no error found`), `[error]`, `exception:`, `exception `, `[exception]` or `traceback` keeps its first line, the next 10 lines and the last 3, with a `… [N frames elided] …` marker in place of the lines between them. The marker appears only when more than 13 lines follow the first line, so error output of 14 lines or fewer is not shortened (at 12 or 13 lines the last 3 repeat lines already kept).

전략이 일치하면 아무것도 저장하지 않는 전략이라도 이후 전략은 시도되지 않습니다. 일치 전략이 예상 토큰(길이 ÷ 4, 반올림)을 저장하지 않는 경우 — 예: 25줄 이하의 코드 유사 파일 또는 7개 이하의 항목이 있는 2,000자를 초과하는 JSON 배열 — 공격적인 엔진은 원래 도구 결과를 유지합니다. `saved` 가 0 이하일 때 두 호출자(`compressAggressive()` 및 `compressAnthropicToolResultBlock()`)는 원본을 유지하지만 `compressToolResult()` 자체는 여전히 해당 전략의 출력을 반환합니다. 도구 결과 단계는 마지막 단어가 아닙니다. 엔진의 대체 요약자는 여전히 8,192자(`maxTokensPerMessage`, 2,048, 4배)보다 긴 `tool` 또는 `function` 메시지를 줄일 수 있습니다.

#### 언제 사용하나요?

도구 결과 압축은 공격적 엔진( `open-sse/services/compression/aggressive.ts` 의 `compressAggressive()` )의 1단계이므로 공격적 모드와 스택 파이프라인의 `aggressive` 단계에서 실행됩니다. OpenAI 모양의 `tool` 및 `function` 메시지와 Anthropic `tool_result` 블록 내부의 텍스트를 압축합니다. 각 전략에는 `aggressive.toolStrategies` 아래에 자체 스위치가 있으며 기본적으로 모두 켜져 있습니다. 대시보드에서 스위치는 Caveman 페이지의** 고급의** 압축이 켜져 있는 동안 볼 수 있으며 기본 모드는 공격적입니다.

### 스택형 파이프라인

스택 모드가 실행됩니다.** 여러 엔진을 순차적으로** — 일반적으로 먼저 RTK (도구 출력에서 60-90% 절감), 나머지 텍스트에서 Caveman(~ 46% 입력 절감)을 수행합니다. 작곡, 그것이다** 78-95% 적격 범위** (위의 업스트림 절감 계산 참조): `1 - (1 - 0.60..0.90) × (1 - 0.46)` 는 평균 ≈ 89%입니다.

#### 작동 원리

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### 언제 사용하나요?

다음의 경우 스택 모드를 사용하세요.

- 도구가 많이 사용되는 워크플로(에이전트 코딩, 연구)
- 비용에 민감한 일괄 처리
- 최대 토큰 절약이 필요한 경우

스택 파이프라인은 전역 `stackedPipeline` 압축 설정을 통해 구성되거나 자동 콤보 `modePack` (해당 필드는 자동 콤보 모델 선택에만 가중치를 다시 부여하며 `stacked` 는 유효한 팩 이름이 아님)가 아닌 라우팅 콤보에 할당된 명명된 압축 콤보(위의 콤보별 재정의 참조) — 통해 구성됩니다.

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
