# OpenCode Integration (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **상태:** 일반적으로 사용 가능합니다.** 청중:** OpenCode OmniRoute 배포에 연결하는 운영자.** 정보 소스(구성 스키마):** `src/shared/services/opencodeConfig.ts`** 권장 npm 패키지:** `@omniroute/opencode-plugin/` (OpenCode v1, `omniroute setup opencode` 로 설치) 및 `@omniroute/opencode-plugin-v2/` (OpenCode v2). 이전 `@omniroute/opencode-provider/` 패키지는 다음과 같습니다.** 더 이상 사용되지 않음** (경로 2 참조)

[OpenCode](https://opencode.ai) 는 에이전트 CLI/desktop AI 클라이언트입니다. `~/.config/opencode/opencode.json` (또는 `opencode.jsonc`)에서 공급자 카탈로그를 읽고 `https://opencode.ai/config.json` 의 스키마를 따릅니다. OmniRoute 모든 요청이 OmniRoute 의 표준 OpenAI 호환 `/v1` 표면을 통해 흐르는 — 공급자 중 하나로 OpenCode 에 자신을 노출하므로 OpenCode 자동 콤보 라우팅, 회로 차단기, 주요 정책, 관찰 가능성 등의 이점을 자동으로 활용합니다.

이 페이지에는 아래의 두 가지 정적 구성 경로가 설명되어 있습니다. 둘 다 동일한 구성을 생성합니다. 라이브 카탈로그를 따르는 모델 목록의 경우 대신 플러그인을 사용하십시오. `omniroute setup opencode` `@omniroute/opencode-plugin` (OpenCode v1)를 설치하고 `@omniroute/opencode-plugin-v2` OpenCode v2를 대상으로 합니다( [CLI 통합](../guides/CLI-INTEGRATIONS.md) 및 [OpenCode v2 플러그인 가이드](../guides/OPENCODE-V2-PLUGIN.md) 참조).

---

## 경로 1 — CLI 생성기(npm 설치 불필요)

최종 사용자에게 권장됩니다. OmniRoute와 함께 제공되며 기존 위치에 `opencode.json`을 작성합니다.

```bash
# OmniRoute 설치 후(npm i -g @omniroute/cli 또는 로컬 clone)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

내부적으로 CLI는 `mergeOpenCodeConfigText()`(`src/shared/services/opencodeConfig.ts:104`)를 호출하므로 기존 `opencode.json`의 다른 provider와 주석이 유지됩니다. OmniRoute 항목은 원자적으로 추가되거나 교체됩니다.

생성되는 파일(기본 model 카탈로그):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## 경로 2 — npm 패키지 `@omniroute/opencode-provider` (더 이상 사용되지 않음)

> **더 이상 사용되지 않습니다.** 패키지는 라이브 OmniRoute 카탈로그 뒤에 표류하는 정적 모델 목록을 작성합니다. README 에서는 `@omniroute/opencode-plugin` (또는 OpenCode v2의 `@omniroute/opencode-plugin-v2` )로 마이그레이션할 것을 권장합니다. 아래 API 기존 스크립트에 대해서만 유지됩니다.

Node/TS (CI 파이프라인, 모노레포, 사용자 정의 설치 프로그램 흐름)에서 구성을 스크립팅할 때 사용됩니다.

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Optional: override the model catalog exposed to OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

기존 파일을 비파괴적으로 병합하려면 `opencodeConfig.ts` 에서 `mergeOpenCodeConfigText()` 복제하거나 CLI 생성기를 호출하세요.

전체 API 에 대해서는 [README 패키지](../../@omniroute/opencode-provider/README.md) 를 참조하세요.

---

## runtime에서 실제로 수행되는 작업

두 경로 모두 동일한 `provider.omniroute.npm: "@ai-sdk/openai-compatible"`을 생성합니다. runtime에서 OpenCode는 `@ai-sdk/openai-compatible`(이미 OpenCode의 transitive dependency)을 로드하고 `baseURL` + `apiKey`로 구성합니다. 이후 흐름은 다음과 같습니다.

```
OpenCode UI/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI 인터페이스)
         → OmniRoute /v1/chat/completions handler     (open-sse/handlers/chatCore.ts)
            → combo routing / Auto-Combo / executor
               → upstream provider
```

plugin은 HTTP를 전혀 처리하지 않습니다. 오직 configuration만 생성합니다.

---

## 모델 카탈로그 기본값

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

`models: [...]`를 통해 재정의할 수 있습니다. 권장 추가 항목:

- `"auto"` — OmniRoute의 [Auto-Combo](../routing/AUTO-COMBO.md) 무설정 라우터를 표시합니다. 카탈로그를 하드 코딩하지 않아도 OpenCode가 "사용 가능한 최적의 모델"을 선택할 수 있습니다.
- `"<combo-name>"` — 대시보드에서 정의한 임의의 콤보입니다. OmniRoute가 이를 투명하게 해석합니다.

---

## URL 정규화

헬퍼는 두 형식을 모두 허용하며 정확히 하나의 `/v1`을 생성합니다:

| 입력                           | 출력 (`options.baseURL`)    |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

이 중복 제거 문제는 이전 구성에서 나타나는 **가장 흔한 오류**입니다. v3.8.0 이전에 생성되었으며 `/v1/v1/...`을 가리키는 `opencode.json`이 있다면 생성기를 다시 실행하거나 `createOmniRouteProvider`를 다시 호출하세요.

---

## 인증 모드

| OmniRoute 설정                               | 권장 `apiKey` 값                                         |
| -------------------------------------------- | -------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (로컬 환경의 기본값) | `sk_omniroute` (리터럴 자리 표시자)                      |
| `REQUIRE_API_KEY=true`                       | 대시보드 → API 키에서 발급한 실제 사용자별 API 키입니다. |

`x-api-key`와 `anthropic-version`을 전송하는 Anthropic 스타일 클라이언트의 경우, OmniRoute의 `extractApiKey`는 `x-api-key`의 키도 인식합니다. OpenCode는 OpenAI 인터페이스를 사용하므로 항상 `Authorization: Bearer ${apiKey}`를 전송합니다. 따라서 여기에는 Anthropic 관련 특수 처리가 적용되지 않습니다.

---

## 문제 해결

| 증상                                                     | 원인                                                                            | 해결 방법                                                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `/v1/v1/`이 포함된 URL의 모든 요청에서 `404` 발생        | `/v1`을 이중으로 추가하던 v3.8 이전 플러그인의 오래된 구성입니다.               | 경로 1 또는 2를 통해 다시 생성하세요.                                                                    |
| `401 Invalid API key`                                    | OmniRoute에서 `REQUIRE_API_KEY=true`로 설정되어 있으며 키를 인식할 수 없습니다. | 대시보드에서 키를 생성하거나 `REQUIRE_API_KEY=false`로 설정한 후(로컬 전용) `sk_omniroute`를 사용하세요. |
| OpenCode UI에서 모델 목록이 비어 있음                    | 4개의 기본 모델이 모두 OmniRoute의 제공자 표시 설정에서 숨겨져 있습니다.        | 활성화한 모델을 표시하려면 `models: ["auto", ...]`를 전달하세요.                                         |
| `cannot read property 'models'`와 함께 OpenCode 500 발생 | 이전 OpenCode(< 0.1.x)는 인라인 `models`를 허용하지 않았습니다.                 | v1 스키마(`opencode.ai/config.json`)를 따르는 버전으로 OpenCode를 업그레이드하세요.                      |

---

## 또한보십시오

- [API 참조](../reference/API_REFERENCE.md) — 전체 OmniRoute REST 표면
- [자동 콤보](../routing/AUTO-COMBO.md) — `model: "auto"` 의 의미
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (권장)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (더 이상 사용되지 않음)
- 소스: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
