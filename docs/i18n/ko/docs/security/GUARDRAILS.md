# Guardrails (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **신뢰할 수 있는 출처:** `src/lib/guardrails/`
> **마지막 업데이트:** 2026-10-17 — v3.8.52 ([커버리지 및 제한 사항](#coverage-and-limits) 추가:
> 훅이 도달하는 라우트와 응답 경로, 병합된 비활성화 헤더(#16412), 필수 경계로서의 인젝션
> 차단 모드(#16413), post-call 이전에 응답을 보게 되는 대상)

가드레일은 OmniRoute와 업스트림 프로바이더 사이의 경계에서 안전성, 정책, 콘텐츠
변환을 강제합니다. 각 가드레일은 요청 페이로드(`preCall`)와 업스트림 응답
(`postCall`)을 검사하고(선택적으로 거부, 변환 또는 주석 달기) 수 있습니다.

이 시스템은 **fail-open**입니다: 가드레일이 실행 중 예외를 던지면 레지스트리가
오류를 기록하고 요청을 실패시키는 대신 다음 가드레일로 계속 진행합니다. 차단은
명시적인 결정(`block: true`)이며 결코 우발적으로 발생하지 않습니다. 유일한 예외는
중단된 요청입니다: 호출자의 `signal`이 중단되면, 예외를 던진 가드레일은 건너뛰는
대신 훅 실행을 거부합니다.

훅은 모든 라우트나 모든 응답에서 실행되지 **않습니다**. 가드레일을 보안 제어
수단으로 신뢰하기 전에 [커버리지 및 제한 사항](#coverage-and-limits)을 읽어
보세요.

## 내장형 난간

레지스트리는 가져오기 시 우선순위에 따라 6개의 가드레일을 자동 로드합니다( `registry.ts` → `registerDefaultGuardrails()` 참조).

| 우선 사항 | 이름                | 단계           | 파일                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

우선순위가 낮은 번호가 실행됩니다.** 첫 번째** .

### 비전 브릿지(`visionBridge.ts`) — 모달리티 브릿지 PR-1

GLM 5.3 기본 모델과 `glm-5.3-{low,high,max}` 에는 명시적인 `supportsVision:false` registry/spec 메타데이터가 있습니다. GLM 5.3 Flash 변형은 기본 비전 모델로 유지됩니다. Claude 코드의 `/v1/messages` 경로가 공유 `handleChat` 사전 호출 가드레일 체인에 들어갑니다.** ~ 전에** Claude에서 OpenAI로의 번역; 중첩된 `Read` 도구 결과 이미지는 변환을 통해 해당 이미지를 OpenAI `image_url` 콘텐츠(#17069)로 끌어올리기 전에 설명하거나 처리해야 합니다.

다음을 목표로 하는 이미지 포함 요청을 가로챕니다.** 비비전 모델** 전체 요청을 비전 가능 모델로 다시 라우팅하거나 이미지 부분을 업스트림 호출 전에 구성 가능한 비전 모델에서 생성된 텍스트 설명으로 대체합니다. 이를 통해 텍스트 전용 공급자는 다중 모드 페이로드를 투명하게 처리할 수 있습니다.

흐름:

1. 대상 모델이 이미 비전을 지원하는 경우 건너뜁니다(강제 브리지 목록 `isVisionBridgeForcedModel` 에 나타나지 않는 한).
2. `extractImageParts(messages)` (`visionBridgeHelpers.ts`)를 통해 이미지 부분을 추출합니다.** 통합 미디어 탐지기** `open-sse/utils/mediaParts.ts` — 의 `detectMediaParts()` 콤보 호환성 필터와 공유되는 단일 정보 소스입니다. 추출은 `replaceImageParts` 다시 연결할 수 있는 형태(추출 ↔ 대체 계약)에 허용 목록에 추가됩니다: OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` 및 응답 API `input_image`. Claude Code `tool_result.content` 및 Responses 도구 출력 내에 중첩된 일치하는 이미지도 추출되어 원래 경로에서 대체됩니다. 표시기 전용 모양은 콤보 필터 재질이므로 추출되지 않습니다. 아무것도 발견되지 않으면 건너뛰세요.
3. `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`)를 통해 런타임 구성 해결: 새로운 `modalityBridge*` 설정 키가 승리합니다. 레거시 `visionBridge*` 키는 그대로 유지됩니다.** 1주기 대체** (롤백 창). 브리지가 비활성화되면 미디어 순회 전에 건너뜁니다.
4. 모드 선택기(`modalityBridgeVisionMode`, 아래 표 참조)는 경로 재지정과 설명을 결정합니다. Reroute는 `model` 만 교체된 `modifiedPayload` 와 메타 `{ rerouted, fromModel, toModel, imagesKept }` 를 반환합니다.
5. 경로 설명: `maxImages` 에서 이미지 캡핑, 작업 인식 프롬프트 구성, 설명 캐시 참조, 비전 모델 호출** 병렬로** (`Promise.allSettled`), 그 자리에 `[Image N]: <description>` 텍스트 부분을 삽입합니다. 설명이 실패하면 `null` 생성됩니다. 원시 이미지는 unknown/vision-capable 대상(#4012)에 대해 보존되지만** 확인된 텍스트 전용 직접 타겟** 또는 제로 비전 콤보는 설명-콜 캡(#17069)을 넘어서는 부분 오류 및 이미지를 포함하여 설명되지 않은 모든 이미지에 대해 명시적인 `(unavailable — no vision-capable provider connected)` 텍스트 스텁을 가져옵니다. 기존의 전체 실패 콤보 설명 폴백은 그대로 유지됩니다(#8430).
6. `modifiedPayload` + 메타(`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`)를 반환합니다.

#### 모드 선택기(`modalityBridgeVisionMode`)

| 방법       | 기본 | 행동                                                                                                                                                                                                                                              |
| ---------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔    | 손대지 않은 레거시 경험적 방법(#6640/#7204): 비콤보/`auto/` 모델은 원래 모델에 이미 사용 가능한 자격 증명이 없는 한 최상의 비전 모델로 다시 라우팅됩니다(그런 다음 설명). 콤보 대상은 항상 설명합니다.                                            |
| `describe` |      | 항상 — 설명하고 재라우팅 블록을 완전히 건너뜁니다. 사용자가 선택한 모델이 항상 응답합니다.                                                                                                                                                        |
| `reroute`  |      | 강제 재라우팅: 자격 증명 유지 모델 가드가 우회됩니다. 경로 재지정-** 목표** Credential Guard는 사용 가능한 비전 타겟이 없을 때에도 여전히 — 적용하며 브리지는 원본 이미지를 텍스트 전용 타겟에 설명하거나 전송하는 대신 명확한 오류로 차단합니다. |

강제 모드 단락** ~ 전에** 자동 휴리스틱이 실행됩니다. `auto` 동작은 pre-PR-1 가드레일과 바이트 동일합니다.

#### API 키 범위(`visionBridgeKeyScope.ts`)

호출자의 API 키가 `allowedConnections`, 할당량 풀(`allowedQuotas`) 또는 모델(`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`)을 제한하는 경우 브리지는 키가 사용할 수 있는 연결에서 키가 사용할 수 있는 재라우팅 모델과 설명 모델만 선택합니다. 그런 다음 설명 호출은 항상 `x-omniroute-self-loop-key-id` 헤더와 함께 OmniRoute 자체 루프를 거치므로 수신 채팅 요청은 해당 키의 연결 및 모델 정책을 다시 시행합니다. `enforceApiKeyPolicy()` 자체 루프 전달자와 함께 해당 헤더만 존중하므로 액세스 범위를 좁힐 수만 있고 확인되지 않는 ID는 거부됩니다.

키에 비전 모델이 허용되지 않는 경우** 확인된 텍스트 전용 대상** 이미지 바이트를 사용할 수 없는 업스트림(#17069)으로 전달하는 대신 명확한 HTTP 400을 사용하여 로컬에서 이미지 요청을 거부합니다. 알 수 없거나 기본 비전 기능이 있는 대상의 경우 설명 경로는 이전 페일오픈 동작(meta `{ skipped: true, reason: "no_permitted_vision_model" }`)을 유지합니다. 키가 없는 요청과 이러한 제한이 없는 키는 이전과 동일하게 작동합니다.

#### 작업 인식 설명 프롬프트(`modalityBridgeVisionTaskAware`)

기본** 진실** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`)는** 마지막 사용자 메시지** (500자로 잘림)을 기본 설명 프롬프트에 추가하여 사용자가 실제로 요청한 내용(codex-vision-proxy 패턴)에 대한 설명을 조정하고 비전 모델에 보이는 텍스트를 기록하도록 요청합니다. — 플래그를 끄거나 사용자 텍스트 — 사용하지 않으면 기본 프롬프트가 변경되지 않고 사용됩니다.

자체 루프 설명 자체 OpenAI 호환 요청( `visionBridgeHelpers.ts` 의 `callVisionModelSingle()` )은 모든 caller/provider 에 대해 클라이언트 신호에 대해 게이트되지 않고 항상 무조건적으로 `image_url.detail: "high"` — 요청합니다. 낮은 세부 정보 샘플링은 이 프롬프트가 요구하는 텍스트 전사 작업에 대한 OCR 정확도를 저하시키므로 설명 호출 자체는 원래 인바운드 요청에 사용된 세부 수준에 관계없이 항상 높은 세부 정보를 요청합니다. 이는 내부 설명 요청 본문에만 영향을 미칩니다. OmniRoute 기본 요청 — 에서 호출자 자신의 `image_url.detail` 전달하는 방법은 변경되지 않으며 기본값은 `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`)에서 감지된 OpenCode 클라이언트에 대해서만 별도로 적용됩니다. 자체 루프 설명의 Anthropic wire-format 분기에는 `detail` 필드가 없으며 기본적으로 영향을 받지 않습니다.

#### 출력 캡 설명(`modalityBridgeVisionMaxChars`)

| 키                             | 기본 | 범위               |
| ------------------------------ | ---- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`  | `0` 또는 100–50000 |

`0` (기본값)는 다음을 의미합니다.** 모자 없음** — `callVisionModel()` 에서 반환된 설명은 수정되지 않은 상태로 전달되어 기존 동작을 유지합니다. 100~50000 범위의 모든 값은 `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`)로 다시 연결되기 전에 `…` 접미사가 있는 설명을 자릅니다. 다운스트림 모델에 전체 전사가 필요한 세부 사항이 많은 OCR 작업의 경우 이 값을 높이세요. 수다스러운 비전 모델에서 토큰 사용량을 제한하도록 낮춥니다. 대시보드 필드는 비전 탭의 고급 패널( `ModalityBridgeVisionTab.tsx` 의 `modality-bridge-max-chars` )에 있으며 1에서 99 사이의 모든 값을 100층까지 고정하고 명시적인 `0` 그대로 둡니다. — `0` 단순히 "설정되지 않은" 기본값이 아니라 그 자체로 유효한 Zod 값(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)입니다.

#### 캐시 설명(`modalityBridge/bridgeCache.ts`)

프로세스 전체에서 공유되는 출력 설명을 위한 메모리 내 LRU + TTL 캐시입니다. 길이 접두사 프레임을 사용하는 키 = `sha256(imageRef + composedPrompt + configuredBridgeModel)` (필드 경계 충돌 없음) 모델 구성요소는** 구성된** 실제로 — `callVisionModel` 로 응답한 모델이 아닌 브리지 모델은 내부적으로 대체될 수 있으며 시도당 키잉이 캐시를 조각화할 수 있습니다. 실패한 설명은 캐시되지 않습니다. 설정:

| 키                              | 기본   | 범위    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 원격 이미지 정규화(자체 루프 describe/base64 가져오기)

브리지가** 원격** 이미지 자체 — Anthropic 자체 호출 및 claude-wire-format base64 변환(`ensureBase64ImagesForClaudeWire`)을 설명합니다. 둘 다 `visionBridgeHelpers.ts` — 의 `fetchRemoteImageAsDataUri()` 통해 결과 데이터 URI 비전 모델 요청에 포함되기 전에 `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`)를 통해 전달됩니다. 큰 이미지는 다음 크기로 축소됩니다.** 2048px 긴 가장자리** (크기 조정 한도 OpenAI/Anthropic 와 일치하는 것은 이미 서버 측에 적용됨) 비전 모델이 보는 내용을 변경하지 않고 업로드 bytes/latency 줄입니다. 크기 조정은 동적 가져오기를 통해 로드된 `sharp` 사용합니다. 기본 바이너리를 로드하지 못하는 플랫폼에서 `normalizeDataUri()`** 절대 던지지 않는다** — 은 원래 바이트의 통과로 돌아가므로 describe/base64-conversion 경로는 항상 계속 작동합니다. 이미지가 아닌 바이트(디코딩 가능한 이미지를 반환하지 않은 가져오기)도 그대로 전달됩니다. 이 정규화는 브릿지가 자체 호출 — 위해 가져오는 이미지로 범위가 지정되며 옵트인 전용 돌연변이 원칙(하드 규칙 #20)에 따라 호출자의 원시 패스스루 페이로드에는 적용되지 않습니다.

#### 설정 스키마 + 마이그레이션

새로운 `modalityBridge*` 키는 `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`)에서 Zod 검증됩니다: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` 트리오 및 오디오 브리지에서 사용되는 `modalityBridgeAudio*` 그룹. 마이그레이션 `141_modality_bridge_settings.sql` 기존 레거시 `visionBridge*` 값을 일치하는 새 키에 복사합니다(멱등성, 운영자가 설정한 `modalityBridge*` 값을 덮어쓰지 않음). 레거시 키는 한 릴리스 주기 동안 읽기 폴백으로 계속 허용됩니다.

#### 투명성 헤더 + 통계

설명 변환 응답은 `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` ( `modalityBridge/bridgeStats.ts` 에서 `buildModalityBridgeHeader()` 로 작성되고 `src/sse/handlers/chatHelpers.ts` 에서 `withModalityBridgeHeader()` 로 스탬프 처리됨)를 전달합니다. 재라우팅된 요청은** 아니요** 헤더 — 페이로드는 그대로 유지되었으며 모델 스왑은 이미 응답 본문의 `model` 필드에 표시되어 있습니다.

`GET /api/modality-bridge/stats` (관리 인증, `GET /api/settings` 와 동일한 계층)는 `vision`, `audio` 및 `video` 에 대한 인메모리 모달리티 카운터 `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` 반환합니다. `averageLatencyMs` 모든 시도가 아닌 `latencySamples` 분모로 사용합니다. 타이밍이 없는 작업은 0밀리초 샘플을 생성하지 않습니다. `bridged` 성공적인 변환을 위해 이전 버전과 호환되는 별칭으로 남아 있습니다. 실패한 시도는 이를 증가시키지 않습니다. 카운터는 설계에 따라 프로세스를 다시 시작할 때 재설정됩니다(회계가 아닌 원격 측정).

#### 대시보드 구성

전용 대시보드 페이지는 `/dashboard/settings/modality-bridge` 입니다. URL 주소 지정이 가능한 `Vision`, `Audio` 및 `Video` 탭은 `tab` 값을 전환하는 동안 쿼리 매개변수를 유지합니다. Vision 탭에는 활성화, 모드, 모델 선택(자동 기본값 포함), 작업 인식 프롬프트, 고급 timeout/image/description-length/cache 제한, 런타임 카운터 및 보호된 샘플 요청이 표시됩니다. 오디오 탭도 활성화되어 있습니다. 활성화 기능, 자동이 포함된 STT 전용 모델 선택기, timeout/max-clip 제한, 오디오 카운터 및 `input_audio` 샘플 테스트가 표시됩니다. 비디오 탭은 기능적입니다. FFmpeg/ffprobe 런타임 상태 — 네 가지 명시적 UI 상태 중 하나(프로브가 비행 중이거나 완료할 수 없는 동안 `unknown`, 클라이언트 측에서 프로브를 건너뛰는 비루프백 대시보드 호스트의 `restricted`, 프로빙되고 누락이 확인된 후 `unavailable` 또는 FFmpeg/ffprobe 버전의 `available` )를 보고합니다. — enable/model/frame/video/timeout 제한을 유지하고, 모델 선택기를 비전 지원 모델로 필터링하고, 비디오 카운터를 노출합니다.

AI 설정의 이전 Vision Bridge 카드는 새 페이지에 대한 호환성 링크입니다. 더 이상 양식의 두 번째 복사본을 소유하지 않습니다. 또한 미디어 공급자는 기존 Speech-to-Text 놀이터를 제거하지 않고도 Image-to-Text 및 Speech-to-Text 워크플로를 해당 Modality Bridge 탭에 연결합니다.

**셀프 루프 승인 우회:** 설명 호출이 OmniRoute 의 자체 `/v1` 자체 루프(비표준 제공자 모델)를 통해 라우팅될 때 하위 요청은 `x-omniroute-admission-bypass: internal` 보내고 확인된 자체 루프 자격 증명 — 로컬 모드의 로컬 `sk_omniroute` 센티널 또는 운영자가 구성한 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env 키(#1350)로 인증되므로 `REQUIRE_API_KEY=true` 배포는 계속 설명 호출을 실행할 수 있습니다. 우회는 정확한 자격 증명에 대해서만 허용되므로 외부 클라이언트는 헤더를 사용하여 승인을 건너뛸 수 없습니다.

레거시 기본값은 `src/shared/constants/visionBridgeDefaults.ts` 에 있습니다. 새로운 mode/task-aware/cache 기본값과 설정 확인자는 `src/shared/constants/modalityBridgeDefaults.ts` 에 있습니다. 가드레일은 테스트가 가짜 `getSettings` 및 `callVisionModel` 구현을 주입할 수 있도록 `deps` 생성자 옵션을 노출합니다.

### 오디오 브리지(`audioBridge.ts`) — 모달리티 브리지 PR-3

오디오 입력을 허용하는 것으로 알려지지 않은 대상에 도달하기 전에 오디오 포함 채팅 요청을 가로챕니다. 채팅 요청을 다시 라우팅하지 않습니다. 오디오 부분은 기존 OpenAI 호환 멀티파트 엔드포인트를 통해 기록되고 선택한 채팅 모델은 텍스트 기록으로 계속됩니다.

흐름:

1. `getResolvedModelCapabilities()` 통해 `supportsAudio` 해결합니다. 명시적 공급자 레지스트리 메타데이터가 승리하고 그 다음 정적 모델 메타데이터가 승리하고 `modalities_input` 동기화됩니다. `audio` 없이 선언된 입력 목록은 `false` 입니다. `null` 남아 있는 능력 증거는 없습니다. `false` 와 `null` 모두 보수 브리지를 활성화하는 반면, `true` 이를 우회합니다.
2. `modalityBridgeAudio*` 설정을 해결하고 공유 `detectMediaParts()` 감지기를 통해 모든 메시지에서 연결 가능한 최상위 오디오 부분을 추출합니다. 지원되는 와이어 모양은 OpenAI `input_audio`, `audio_url` 및 `source.media_type: "audio/*"` 입니다. 라우팅을 위해 중첩된 오디오가 감지되었지만 스플라이스 경로에 의해 제거되지 않았습니다. 작업은 `modalityBridgeAudioMaxClips` 로 제한됩니다. 이후 부분은 그대로 유지됩니다.
3. 구성된 `provider/model` 따르거나 `selectAudioBridgeModel()` 안정적인 카탈로그 순서로 `AUDIO_TRANSCRIPTION_PROVIDERS` 진행하고 사용 가능한 활성 공급자 자격 증명이 있는 첫 번째 모델을 선택하도록 합니다.
4. `callAudioTranscription()` base64/data-URI 오디오를 멀티파트 `file` 로 변환하거나, DNS 고정 및 25 MB 바운드를 사용하는 공개 전용 아웃바운드 가드를 통해 원격 `audio_url` 다운로드합니다. 그런 다음 파일과 선택한 모델을 `resolveSelfLoopBearer()` 로 인증된 로컬 `/v1/audio/transcriptions` 자체 루프에 POSTs. 기존 전사 경로는 일반적인 자격 증명 조회, cooldown/rate-limit 처리 및 공급자 디스패치를 수행합니다.
5. 성공적인 호출은 해당 부분을 `[Audio N]: <transcript>` 로 대체합니다. 호출은 `Promise.allSettled` 로 실행됩니다. 개별적인 실패로 인해 원래 오디오 부분(#4012 계약)이 보존됩니다. 모든 호출이 실패하고 대상이 `supportsAudio === false` 로 입증되면 해당 부분은 `[Audio N]: (unavailable — no STT provider connected)` (#8430 계약)가 됩니다. 알 수 없는 대상(`null`)의 경우 모든 실패 결과는 그대로 유지됩니다. 사용 가능한 STT 자격 증명이 없는 검증된 텍스트 전용 대상은 네트워크 호출을 발행하지 않고 동일한 명시적 스텁을 수신합니다.

성공적인 기록은 프로세스 전체의 Modality Bridge LRU/TTL 캐시를 사용합니다. 키는 오디오 참조, 안정적인 `audio-transcription` 작업 레이블 및 선택한 STT 모델을 결합합니다. 실패는 캐시되지 않습니다. 오디오 시도는 공유 `bridged`, `cacheHits`, `failures` 및 `lastUsedAt` 카운터를 업데이트합니다. 변환된 응답은 `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` 전달합니다. 변경되지 않은 요청은 Audio Bridge 세그먼트를 수신하지 않습니다.

런타임 설정은 DB 지원 및 Zod 검증을 거쳤습니다.

| 키                            | 기본    | 범위             |
| ----------------------------- | ------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | 자동 또는 STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

공유 캐시는 `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` 및 `modalityBridgeCacheMaxEntries` 에 의해 제어됩니다.

### 비디오 브리지(`videoBridge.ts`, `videoBridgePipeline.ts`)

알려진 기본 비디오 지원이 없는 대상이 호출되기 전에 채팅 완료 `messages` 및 응답 API `input` 에서 최상위 비디오 부분을 가로챕니다. 지원되는 모양은 `input_video`, `video_url`, `video_source`, HTTPS URLs 및 `data:video/*;base64,...` data URIs 입니다. 텍스트의 일반 파일 이름은 비디오로 처리되지 않습니다.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`)는 요청 순회, capability/policy 검사, 요청별 집계 및 응답 페이로드를 소유합니다. 비디오별 작업 — 획득, 프레임 시퀀스를 설명하는 전체 결과 캐시(발신자가 선언한 오디오 기록을 융합함) 및 시도별 metrics/abort/cleanup — `videoBridgePipeline.ts` 의 `processVideoPart` 뒤에 숨겨져 있으며 `preCall` 루프 내에서 비디오 부분당 한 번씩 호출됩니다. 해당 모듈은 또한 명시적인 포트 경계 `VideoMediaBrokerPort` (바이트 획득 및 샘플링된 프레임 추출), `VideoAudioTranscriptionPort` (샘플링된 캡션과 호출자가 선언한 오디오 기록 융합) 및 `VideoDrilldownPort` (기존 원시 저장소 형태)을 정의합니다. 프로덕션 STT 및 프레임 보존은 `createVideoSttAdapter` 및 `createVideoDrilldownAdapter` 통해 설명 포트 주위로 구성됩니다. 후자는 공유된 불투명 핸들 수명 주기를 사용합니다.

공개 `/v1` 요청 경로는 하위 프로세스를 가져오거나 호출하지 않습니다. 원격 비디오는 MiB 범위 내에서 다운로드됩니다. 인라인 base64 비디오에는 보수적인 36 MiB 디코딩된 비디오당 한도가 있으므로 model/messages/framing 봉투는 공개 JSON 요청 승인 제한인 50 MiB 내에 유지될 수 있습니다. 인라인 길이와 디코딩된 크기 추정치는 할당 전에 확인됩니다. HTTPS DNS 고정이 포함된 기존 공개 전용 아웃바운드 가드를 사용하여 초기 원격 URL 및 모든 리디렉션에 필요합니다. 그런 다음 바이트는 정확한 내부 `POST /api/modality-bridge/video/extract` 브로커 경계를 넘습니다. 해당 경로는 `LOCAL_ONLY` 및 `SPAWN_CAPABLE` 이며 프로세스별로 인증된 신뢰할 수 있는 루프백 요청만 허용하며 URL, 파일 시스템 경로, 실행 파일 또는 인수 목록은 허용하지 않습니다. API body-size 파이프라인과 핸들러의 증분 본문 판독기는 독립적으로 50 MiB 브로커 입력 한도를 적용합니다. 제한된 대기열은 한 번에 하나의 추출을 실행하고 4개의 보류 중인 작업을 허용하며 보류 중인 입력을 100 MiB 로 제한합니다.

브로커 내에서 `ffprobe` 개인 로컬 파일을 읽습니다. 고정 형식 허용 목록에는 재생 목록 및 매니페스트 형식이 제외됩니다. 허용된 MOV 계열 컨테이너의 경우 외부 MOV 데이터 참조는 기본적으로 비활성화된 상태로 유지되며 고정 명령은 이를 선택하지 않습니다. `ffprobe` 와 `ffmpeg` 모두 `file` -only 프로토콜 화이트리스트, 하나의 스레드, 고정 인수 배열, 쉘 없음 및 `PATH` 에서 확인된 실행 파일을 사용합니다. 첨부된 사진 커버 스트림은 재생 가능한 후보가 아닙니다. 모든 재생 가능한 스트림은 제한을 충족해야 하며 결정론적 최저 인덱스 폴백 이전에 명시적인 기본 스트림이 선호됩니다. 비디오는 600초, 크기당 8,192픽셀, 33,554,432개의 소스 픽셀로 제한됩니다. FFmpeg 1~16개의 중간점 JPEG 프레임을 샘플링하고 더 작은 입력을 확대하지 않고 긴 가장자리를 최대 1,024픽셀로 축소하며 결코 URL 수신하지 않습니다. 샘플링은 기본적으로 `uniform` 입니다. 선택적 `scene_aware` 및 실험적 `segment_aware` 정책은 이미 검증된 로컬 스트림에 대해 하나의 추가 고정 FFmpeg 패스를 수행하고, 제한된 `showinfo` 장면 타임스탬프를 선택하고, 감지기 실패, 시간 초과, 잘못된 출력 또는 빈 후보 세트에 대해 결정론적으로 동일한 균일 중간점으로 폴백합니다. 세그먼트 인식 모드는 검증된 장면 간격에 비례하여 중간점 샘플을 할당합니다. 세그먼트 인식 증거 및 대체 동작은 아래에 자세히 설명되어 있습니다. 하드 16프레임 제한은 모든 정책에서 선택 후 적용됩니다. 장면 인식 요청에 프레임 예산이 하나만 있는 경우 활성 전체 비디오 또는 초점 창의 균일한 중간점을 사용하고 `policyEffective: uniform` 보고합니다. 선택한 단일 장면 프레임은 두 시간 끝을 모두 보존할 수 없습니다. 호출자는 선택적으로 유한 포커스 창(`start`/`end` 초)을 제공할 수 있습니다. 경계는 미디어 지속 시간으로 고정되고, 역방향 또는 무한 창은 거부되며, 모든 샘플링 정책은 정규화된 간격 내에서만 수행됩니다. 결과 창은 샘플링 메타데이터와 신뢰할 수 없는 설명 접두사에 포함되므로 다운스트림 모델은 전체 타임라인에서 집중된 발췌 부분을 구별할 수 있습니다.

의미론적 캡션 초점은 별도의 명시적 설정입니다. 기본 `full` 분석 모드는 기존 프레임 프롬프트를 유지하고 요청 텍스트를 캡션 모델로 전달하지 않습니다. `focused` 모드에서 브리지는 동일한 Chat 또는 응답 컨테이너에서 사용자가 작성한 비어 있지 않은 최신 `text`/`input_text` 만 읽고 이를 NFC 로 정규화하고 제어 문자와 공백을 축소한 다음 500개의 유니코드 코드 포인트로 제한합니다. 빈 결과는 정확한 `full` 프롬프트로 대체됩니다. 사용 가능한 힌트는 신뢰할 수 없는 사용자 컨텍스트 전용 블록에서 JSON 로 직렬화되며 관찰 가능한 세부 사항에만 우선 순위를 지정할 수 있습니다. 이는 미디어에서 보거나 들을 수 있는 다음 지침에 대한 별도의 경고를 무시할 수 없습니다. 텍스트 포커스는 `start`/`end` 를 추론하거나 시간 샘플러를 변경하지 않습니다.

#### FU-07 구조적 세그먼트 증거

`segment_aware` 이미 검증된 로컬 비디오 스트림에 대해 하나의 제한된 사전 분석 패스를 사용합니다. 고정 필터 체인은 먼저 최대 320픽셀 너비로 확장되고 장면 변경 및 고정된 간격을 감지한 다음 흐림, 평균 루마 및 spatial/temporal 정보에 대해 초당 1프레임으로 샘플링합니다. 패스는 600개의 구조적 샘플, 1개의 FFmpeg/filter 스레드, 동일한 `file` -only 프로토콜 및 컨테이너 허용 목록, 1개의 MiB 프로세스 출력 경계 및 브로커의 공유 abort/deadline. 내부에서 최대 30초로 제한됩니다. 요청에서 명령, 필터, 경로 또는 URL 허용하지 않습니다.

구조적 값은 의미론적 비디오 이해가 아닌 결정론적 샘플링 증거입니다. 주제, 동작, 캡션, 음성 또는 사용자 의도를 추론하지 않습니다. 장면 및 정지 경계는 세그먼트를 형성합니다. 고정 범위, 흐림, 노출, 공간적 세부 사항 및 시간적 변화는 기존 1~16 프레임 예산이 할당되는 방식에만 영향을 미칩니다. 완전히 고정된 세그먼트는 한 프레임으로 제한되는 반면, 고정되지 않은 세그먼트는 나머지 예산을 놓고 경쟁합니다. 경계가 프레임보다 많은 경우 균일한 타임라인 적용 범위가 유지되므로 빠른 초기 컷으로 긴 후행 세그먼트를 숨길 수 없습니다. 동결 경계의 1초 분석 해상도 내의 장면 경계가 합쳐집니다.

누락된 필터, malformed/empty 증거, 탐지기 오류 또는 제한된 사전 분석 시간 초과는 정확한 균일 중간점 정책에 실패합니다. 호출자 중단 또는 브로커 최종 기한은 실패 시 열리지 않습니다. 진행 중인 하위 프로세스를 종료하고 나중에 프레임 추출을 방지하며 개인 임시 트리가 `finally` 에서 제거됩니다.

`scripts/perf/video-bridge-fu07-eval.ts` 중복 제거 후 캡션 호출 절감, 조밀한 모션 예산 할당, blur/exposure/SI-TI 증거, 긴 꼬리를 사용한 신속한 컷, 점진적 페이드 오탐을 위한 결정론적 실제 FFmpeg 픽스처를 생성합니다. 사전 분석 벽 시간과 `/usr/bin/time` 사용 가능한 경우 하위 CPU 및 피크 RSS 기록합니다. 품질 검사는 구조적 오라클일 뿐입니다. 이 하네스에는 승인된 끝점이나 동결된 심판이 없기 때문에 실제 캡션 모델 품질은 `HOLD` 유지됩니다. `--caption-cost-per-call-usd` 호출당 긍정적인 추정치를 명시적으로 제공하지 않는 한 금전적 절감 효과도 `HOLD` 유지됩니다. 스크립트는 결코 결과를 조작하지 않습니다.

각 프레임은 4 MiB 로 제한되고 모든 원시 프레임은 모두 23 MiB 로 제한되며 직렬화된 브로커 응답은 32 MiB 로 제한됩니다. 개인 임시 디렉토리는 `finally` 에서 제거됩니다. OmniRoute FFmpeg 번들로 제공하지 않으며 사용자 정의 실행 파일 경로를 허용하지 않습니다. 캡션을 추가하기 전에 브릿지는 보수적인 시각적 중복 제거 패스를 적용합니다. 즉, 각 JPEG 는 16 × 16 그레이스케일 버퍼로 줄어들고 유지된 마지막 프레임과만 비교됩니다. 한 프레임을 초과하는 요청된 캡션 예산의 경우 추출은 해당 예산의 최대 두 배, 최대 16프레임을 초과할 수 없는 제한된 후보 풀을 제공합니다. 요청된 한도는 중복 제거 후에만 적용되며 예산이 2개 이상인 경우 최종 희석 중에 첫 번째 및 최종 선택된 후보가 유지됩니다. 버전이 지정된 `grayscale-16x16-mean-cells-v2` 정책은 평균 루마 델타 중 더 큰 값과 정규화된 델타가 0.05 이상인 썸네일 셀의 비율을 사용합니다. 중복 임계값은 런타임 설정으로 노출되지 않고 예측 가능성을 위해 선택된 상수 0.04입니다. 이 보조 고대비 신호는 평균 비교를 통해 숨길 수 있는 작은 움직임과 눈에 보이는 텍스트 변경 사항을 보존합니다. 비교기 또는 디코더 오류는 실패 시 공개되고 적용 범위를 유지합니다. 출력 메타데이터는 추출된 후보, 성공적으로 사용된 프레임 및 삭제된 시각적 복제본을 분리합니다.

명시적으로 표시된 비디오 부분은 타임스탬프가 표시된 밀착 인화를 요청할 수 있습니다. 브리지는 최대 4열, 16프레임 JPEG 그리드를 구축합니다. 모든 512픽셀 셀은 소스 타임스탬프를 고대비 하단 밴드에 굽는 동시에 다운스트림 연결 및 감사를 위해 동일한 타임스탬프가 텍스트 메타데이터에 유지됩니다. 전체 JPEG 32 MiB 로 제한되어 있습니다. `sharp` 그리드를 디코딩하거나 구성할 수 없는 경우 브리지는 개별 JPEG 프레임으로 대체됩니다. 클라이언트 중단은 여전히 시트 작업을 통해 전파됩니다.

판촉 증거는 합성 구성 마이크로벤치마크와 의도적으로 분리됩니다. `scripts/perf/video-bridge-contact-sheet-eval.ts` 실제 OpenAI 호환 비전 모델을 위한 스키마 버전 A/B 하네스를 정의합니다. 공급자가 보고한 토큰, 엔드투엔드 벽 대기 시간(시트 구성 포함), 모델 호출 수 및 매니페스트에서 정의한 사실 보존을 측정합니다. 원시 모델 응답은 보고서에 기록되지 않습니다. SHA-256 다이제스트와 일치하는 사실 IDs 만 유지됩니다. `--execute-real` 전달되고 `--model`, `OMNIROUTE_BASE_URL` 및 `OMNIROUTE_API_KEY` 구성되지 않으면 하네스는 네트워크 또는 유료 모델 호출을 수행하지 않습니다. 명시적인 실제 실행이 없으면 기계가 읽을 수 있는 결과는 `HOLD` 유지됩니다. 합성 payload/call-count 측정만으로는 프로모션 증거가 아닙니다.

별도의 `scripts/perf/video-bridge-promotion-eval.ts` FU-07 또는 FU-09 관측값을 사용합니다. 승격 승인에는 모든 8가지 합성 시나리오 종류와 삭제된 실제 클립, 역할 및 사례당 최소 3번의 측정된 반복, 선언된 10가지 측정항목 모두, 고정된 media/prompt/expected-fact/settings 다이제스트, 고유한 관찰 IDs 및 검증된 시드 A/B 순서가 필요합니다. 실행 영수증은 코퍼스 다이제스트, 정확한 후보 SHA 및 모델 개정을 바인딩합니다. 누락되거나 유효하지 않은 측정값은 30초 이상의 CPU, MiB 이상의 피크 RSS 또는 30초 이상의 사전 분석을 포함하여 `HOLD` 유지됩니다. 이는 새로운 런타임 RSS 시행 보장이 아닌 증거 허용 한도입니다.

FU-07 최소 98%의 품질 유지와 1.2x 기준선 이하의 p95 대기 시간, 동등한 평균 캡션 호출에서 0.05 절대 대소문자 균형 평균 재현율 향상 또는 최소 10% 더 적은 평균 중복 제거 후 캡션 호출을 요구합니다. FU-09 최소 0.85 품질, 95% 보존, 20% 중간 지연 시간 감소 및 10% 토큰 감소가 필요합니다. 중요한 사실 손실, 주입 규정 준수 또는 사용 누락으로 인해 승격이 불가능합니다. 한 번의 실행으로 어떤 것도 촉진할 수 없습니다. `--previous-report` 동일한 policy/model revision/candidate/corpus. 의 서로 다른 두 개의 중복되지 않는 연속 적격 실행을 확인합니다. 샘플링 실험은 밀착 시트 실험을 확인할 수 없습니다.

수집기는 메모리에 응답의 점수를 매기고 `responseDigest` 와 측정항목 및 관찰 바인딩을 저장해야 하며 응답 텍스트는 저장하지 않아야 합니다. 소비자는 또한 기존의 원시 관찰 내용을 읽지만 해당 텍스트를 보고서에 복사하지 않습니다. 각 관측값에는 정확히 `responseDigest` 또는 `rawResponseText` 중 하나가 허용됩니다. 버전이 지정된 허용 목록은 변경할 수 없는 `hold` 기본값으로 비어 있습니다. 적합한 항목에는 증거 참조, 정책, 모델 개정, 정확한 후보 SHA, 매니페스트 다이제스트 및 두 개의 개별 실행 IDs 필요합니다. 충돌하는 컨텍스트는 거부됩니다. 이러한 메타데이터는 참조 파일에 실제 측정값이 포함되어 있다는 증거가 아니라 감사 계약입니다. 항목을 추가하기 전에 실제 영수증을 검토하세요. 관리 통계 엔드포인트와 비디오 대시보드는 보수적인 준비 상태를 보여줍니다. 구성된 모델 별칭만으로는 해당 개정이나 실행 중인 후보 SHA 설정하지 않으므로 현재 대시보드는 다른 실행 컨텍스트의 자격을 재사용하는 대신 `HOLD` 보고합니다. 명시적인 실험 선택은 프로모션과 별도로 유지됩니다. 기본값은 자동으로 변경되지 않습니다.

발신자는 이미 정렬된 텍스트를 갖고 있는 경우 지원되는 비디오 부분에 선택적 `transcript.cues` 배열을 연결할 수 있습니다. 각 큐는 `text`, 프로브 기간 내 유한 `start`/`end` 간격 및 화이트리스트에 포함된 `source` (`client`, `embedded` 또는 `audio-bridge`)를 전달해야 합니다. `confidence` 의 기본값은 `1` 이며 `0` 와 `1` 사이에 있어야 합니다. 정확한 중복 큐는 축소됩니다. OmniRoute 이 메타데이터에서 전사를 시작하지 않습니다. 검증된 단서는 소스, 신뢰도 및 간격과 함께 설명된 결과에 복사되고 프레임 캡션과 함께 신뢰할 수 없는 관찰로 렌더링됩니다. 잘못되었거나 범위를 벗어났거나 출처가 없는 텍스트는 캡션 스트림에 혼합되지 않고 거부됩니다. 두 요청 본문 기록 채널 모두 자체 주장된 `embedded` 또는 `audio-bridge` 레이블을 포함하여 `client` 에 제공된 출처를 정규화합니다. 서버 소유 어댑터만이 코드 전용 `trustedSource` 인수를 통해 신뢰할 수 있는 레이블을 할당할 수 있습니다. 요청 JSON 필드는 해당 인수에 도달할 수 없습니다. 기록 텍스트는 출처에 관계없이 신뢰할 수 없는 미디어 파생 콘텐츠로 남아 있으며 승인을 결정해서는 안 됩니다.

고급 발신자는 동일한 비디오에 대해 `audioTranscript` 트랙을 제공할 수 있습니다. 이는 서버 전사의 증거가 아닌 클라이언트가 제공한 텍스트로 처리됩니다. 융합 솔기는 하나의 기한 및 중단 신호에 따라 시각 및 청각 관찰을 실행하고, 공통 타임라인에 따라 명령을 내리고, 정확한 중복을 축소하고, 한쪽만 성공하면 부분 결과를 보고합니다. 유효하지 않은 `audioTranscript` 부분 결과 — 로 저하되며 시각적 설명은 유지되고 오디오 분기는 전체 비디오를 실패시키는 대신 삭제된 실패 코드 — 기록합니다. 분기별 가용성, 부분 플래그 및 삭제된 오류 코드는 설명된 결과, 가드레일 메타데이터(`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), 결과 캐시 메타데이터 및 브리지 융합 카운터에 보존됩니다. 기본 Video Bridge 경로는 음성-텍스트를 호출하거나 두 번째 미디어 복사본을 다운로드하지 않습니다. 명시적인 트랙이 없으면 비디오 전용으로 유지됩니다.

**성적 증명서 보관(#12150 P1).** 이는 Video Bridge(자체 선택)가 스크립트 큐 — 렌더링할 때마다 자동으로 적용되며 별도의 보존 플래그는 없습니다. 요청이 스크립트 큐(발신자가 선언한 `transcript` 또는 융합된 `audioTranscript`)를 렌더링하면 가드레일은 이를 `videoBridgeObserved` 표시하고 비디오 설명 — 의 수정된 그림자를 생성합니다. 모든 큐의 자유 텍스트 본문이 `[redacted-video-transcript]` 로 대체되는 동일한 렌더링입니다. 문자열이 조합되기 전에 구조화된 큐 필드를 대체하여 구축됩니다(단일 평면화된 텍스트를 구문 분석하지 않으므로 본문을 포함하여 큐 콘텐츠 — 적대적이거나 일반이 없습니다. `[inaudible]`/`[music]` — 과 같은 `]` 포함하면 살아남을 수 있습니다). 지속된 통화 로그 요청 본문은 각 비디오에서 파생된 텍스트 부분을 콘텐츠 동등성과 일치하는 수정된 그림자로 교체합니다. `fullText` 앵커는 완료된 사전 호출 가드레일 페이로드에서 다시 읽혀지므로 이후 체인 가드레일( PII 및 자격 증명 마스커, 우선순위 10/95)이 설명 텍스트를 제자리에 다시 쓰고 system-prompt/handoff/memory 주입이 메시지 배열을 재구성한 후에도 일치가 계속 성공합니다. 모델의 업스트림으로 전송된 본체는 변경되지 않습니다. 또한 관찰된 요청은 지속 가능한 메모리를 채우지 않으므로(요청 및 응답 파생 추출 모두 건너뛰기) 모델 자체 응답이 기록 텍스트를 메모리에 반영할 수 없습니다.

**원시 비디오 필드(#12430).** 브리지가 활성화되고 기본 비디오 지원이 알 수 없거나 없는 경우 정의된 `transcript`/`audioTranscript` 필드는 설명 실패 또는 `maxVideos` 제한 후에도 `videoBridgeObserved` 도 활성화합니다. `null` 및 빈 문자열 개수; 부재 필드와 비비디오 메타데이터는 그렇지 않습니다. 보관된 복사본은 이러한 필드를 수정하거나 요청을 생략하고 caches/Memory 우회됩니다.

이러한 대체 경로에서 유효한 호출자 큐는 비표준 공급자 필드가 아닌 지원되는 `text`/`input_text` 부분이 됩니다. 요청이 제공한 두 트랙 모두 신뢰할 수 없는 `client` 관찰로 유지되며, 비디오가 설명되지 않았고 타임스탬프가 미디어에 대해 확인되지 않았다는 명시적인 경고가 표시됩니다. 기존 256-cue/64-KiB 총 및 큐당 예산은 두 트랙에 함께 적용됩니다. 타임스탬프는 브로커의 600초 한도 및 제공된 포커스 창에 맞아야 합니다. 유효하지 않은 트랙은 삭제되며 임의의 텍스트로 전달되지 않습니다. 합산된 예산을 초과하지 않는 한 유효한 형제 자매는 계속 사용될 수 있습니다. Null/empty 필드에는 텍스트가 추가되지 않습니다. 이 대체에서는 미디어 가져오기 또는 기록이 추가되지 않습니다. 스크립트 확장 필드는 대체 비디오 캐리어 및 해당 `video_url`/`source` 객체에서 제거됩니다. OpenAI 와이어 허용 목록은 엄격하게 유지됩니다. 알 수 없는 기본 비디오 캐리어는 계속 사용할 수 있으며 알려진 텍스트 전용 대상은 안전한 마커를 유지합니다. 구조화된 교정 섀도우는 추가된 기록 텍스트를 보호하는 동시에 원래 호출자가 소유한 요청은 변경되지 않은 상태로 유지됩니다. 기본 지원 대상 및 비활성화된 브리지는 기존 우회 동작을 유지합니다.

추가로 보관된 복사본은 동일한 관찰된 요청 신호를 사용합니다. 원시 사전 가드레일 클라이언트 요청 스냅샷, 메모리 내 보류 중인 요청 및 조기 거부된 요청 로그는 구조적으로 비디오 부분의 기록 필드를 대체합니다. 파이프라인 단계 및 컨텍스트 전달로 합성된 문자열 프롬프트는 지속 요청 본문 싱크에서 수정됩니다. 지속형 `video_content_removed` 마커는 의도적으로 삭제된 텍스트를 재구성하는 대신 `previous_response_id` 연속이 실패 처리되도록 만듭니다. 관찰된 요청이 로깅 전에 부분별 수정 섀도우를 잃거나 나중에 요청 변형 후 여러 비디오 섀도우 중 하나라도 일치하지 않는 경우 부분적으로 수정된 기록을 유지하는 대신 유지된 요청 본문이 완전히 생략됩니다.

관찰된 요청의 경우 모델 응답은 구조화된 큐 경계 없이 기록의 일부를 인용할 수 있습니다. 따라서 지속되는 호출 로그 `responseBody` 생략 표시로 대체됩니다. 자세한 파이프라인 아티팩트( upstream/client 본문 및 스트림 청크를 포함할 수 있음)는 유지되지 않습니다. 의미 체계, 멱등성 및 추론 재생 캐시는 해당 요청에 대한 읽기 및 쓰기를 우회합니다. 공급자 요청과 클라이언트에 표시되는 응답은 변경되지 않습니다. 세부 아티팩트가 생략되면 초기 Keepalive 바이트가 임시 버퍼에서 배출됩니다. Kiro 의 잘못된 EventStream 경고는 페이로드 바이트 수만 보고하며 내용이나 JSON 파서의 원시 오류는 보고하지 않습니다. 이것은 관련되지 않은 모든 provider/plugin 진단이 감사되었다고 주장하지 않습니다. 더 넓은 유지 싱크 스윕은 #11658 에서 추적됩니다.

내부 `/api/modality-bridge/video/drilldown` 수명주기는 별도의 loopback/token-authenticated 캐시 기반입니다. 모든 작업에는 정식 불투명 주체 ID 도 필요합니다. 프로덕션 호출자가 활성화되기 전에 인증된 테넌트에서 해당 ID 파생해야 하며 클라이언트가 선택한 값을 전달해서는 안 됩니다. 캐시 키는 해당 주체를 표준 세션 및 비디오 참조 IDs 에 바인딩하고 해당 SHA-256-derived 키만 저장하며 읽기 및 삭제 범위를 동일한 주체로 지정합니다. 캐시는 항목당 최대 16개의 파생 JPEG 프레임을 저장하고 10분 후에 만료되며 제한된 `start`/`end` 읽기 또는 명시적 세션 삭제를 지원합니다.

각 주체는 16개의 항목과 64개의 표준 JPEG 데이터 MiB 로 제한됩니다. 이러한 제한은 전역 64-entry/256 MiB 한도와는 별개입니다. 주체 할당량 압력은 전역 LRU 제거가 고려되기 전에 주체가 가장 최근에 사용한 항목만 제거합니다. 만료된 항목은 캐시 활동에 대한 주요 계정과 전역 계정에서 모두 제거되지만 취소 및 유효성 검사 실패는 부분 교체를 커밋하지 않습니다.

캐시는 제한된 전체 이미지 `sharp` 디코딩 중에 경고를 생성하는 비정규 Base64, 과도한 패딩, JPEG가 아닌 미디어, 형식이 잘못되었거나 잘린 JPEGs 및 JPEGs 거부합니다. 허용된 각 이미지를 표준 JPEG 로 다시 인코딩하고 호출자 필드를 신뢰하는 대신 디코딩된 바이트에서 너비와 높이를 파생하며 후행 다중 언어 바이트를 유지하지 않고 삭제합니다. 제한된 표준 압축 버퍼만 두 할당량에 모두 청구됩니다. JSON 와이어 제한에는 32 MiB 디코딩 입력 한도에 대한 Base64 오버헤드가 포함됩니다. 저장된 모든 파생은 검증된 JPEG format/resolution, 샘플링 정책, 파생 버전, 생성 시간, 서버 계산 콘텐츠 해시, 해시된 상위 참조 및 신뢰할 수 있는 호출자의 상위 콘텐츠 해시를 기록합니다. 원자 캐시 커밋 전 비동기 decode/hash 단계 간에 취소가 확인됩니다.

프로덕션 제작자는 성공적인 시각적 분석 이후에만 두 번째 비디오 없이 이미 파생된 브로커 프레임을 재사용합니다. download/extraction. 운영자 `modalityBridgeVideoDrilldownEnabled=true`, 엄격한 파트별 `drilldown: true` 및 인증된 API 키 레코드 ID 가 필요합니다. 클라이언트가 선언한 principal/session 값은 소유권을 설정하지 않습니다. 세 가지 조건이 모두 없으면 추가 프레임을 해시하거나 크기를 조정하거나 유지하지 않습니다. 보존 실패는 사용 가능한 시각적 반응을 보존합니다. 동의된 요청은 전체 비디오 결과 캐시를 우회하므로 캐시된 결과는 재생 처리되지 않습니다.

성공적인 JSON 및 SSE 응답은 제한된 `x-omniroute-video-drilldown` 헤더에 최대 4개의 불투명 핸들을 노출합니다. 승인된 브라우저 원본은 CORS 원본 정책을 확장하지 않고도 해당 헤더를 읽을 수 있습니다. 새 핸들은 `v1.<32-byte random base64url token>` 사용하고 레지스트리는 SHA-256 해시만 유지합니다. reader/header 파서는 레거시 64-hex 토큰도 허용합니다. 인증된 공개 소비자는 `GET /api/v1/video-bridge/drilldown?handle=...` 이며 `modalityBridgeVideoDrilldownRemoteEnabled=true` 에 의해 독립적으로 관리됩니다. 명시적으로 지속되는 false는 레거시 `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env 폴백이 활성화된 경우에도 액세스를 취소합니다. 프로덕션 보존에는 유사한 레거시 `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` 대체가 있습니다. 두 대체 모두 기본적으로 꺼져 있습니다.

소비자는 인증된 키에서 소유권을 파생시키고 키 정책을 적용합니다. GET 와 DELETE 모두 `/v1` 및 `/api/v1` 별칭을 포함하여 `video` 엔드포인트 범주에 속합니다. 비어 있지 않은 엔드포인트 허용 목록이 있는 키에는 `video` 포함되어야 합니다. 무제한 키는 계속 호환됩니다. 소비자는 알 수 없음, 만료됨 및 다른 키 핸들에 대해 동일한 404를 반환합니다. `variant=preview|standard|detail` (최대 JPEG 차원 320/640/1280, 업스케일링 안 됨), `limit=1..8` (또는 레거시 `frames` 별칭, 둘 다 안 됨), 0부터 시작하는 `page` 및 선택적 `start`/`end` 포커스 초를 허용합니다. 중복된 쿼리 키와 역방향 포커스 창은 거부됩니다. 반환된 각 변형에는 보관된 소스에 연결된 실제 콘텐츠와 실제 해상도 메타데이터의 해시가 있습니다. 변형은 추가로 유지된 복사본으로 저장되지 않고 읽기 시 파생됩니다. Base64/envelope 포함한 JSON 응답은 32 MiB 로 제한됩니다. 크기가 너무 큰 페이지는 413을 반환하고 클라이언트는 더 적은 수의 프레임을 요청해야 합니다. 각 크기 조정에 대한 확인 취소를 읽고 반환하기 전에 핸들 유효성을 다시 확인합니다. 소유자의 `DELETE` 멱등원입니다. 삭제 또는 TTL 만료는 보유된 소스 및 사용량 계산을 해제합니다.

공유 저장소는 프로세스 로컬입니다. 핸들은 다시 시작 시 만료되며 독립적인 OmniRoute 프로세스 간에 전송할 수 없습니다. 관리 통계는 효과적인 보존/원격 정책을 노출하고 보존된 entries/bytes 만 집계하며 미디어, 참조, 주체 IDs 또는 핸들은 집계하지 않습니다. 비디오 설정 패널에는 해당 값이 표시되며 두 동의 스위치를 모두 유지할 수 있습니다. 이 구현 문서는 실시간 배포 또는 프로모션 증거가 아닙니다. 실제 모델 승인은 별도로 추적됩니다.

프레임에는 구성된 비디오 모델에 따라 순차적으로 캡션이 추가됩니다. 빈 비디오 재정의는 Vision 설정을 상속합니다. 둘 다 비어 있으면 Vision 자동 라우터는 효과적인 비전 지원 모델을 선택합니다. 성공적인 캡션은 원본 부분을 안정적인 `[Video description:` 접두사로 대체합니다. 이 접두사는 텍스트를 신뢰할 수 없는 미디어에서 파생된 관찰로 표시하고 다운스트림 모델에 미디어에 있는 지침을 따르지 말라고 지시합니다. 프레임 캡션 캐시 키에는 JPEG 바이트, 프롬프트, 타임스탬프 및 유효 모델이 포함됩니다. 성공한 캡션만 캐시됩니다. 캐시 항목은 대체 모델을 포함하여 실제 성공적인 생산자 모델을 유지합니다. 브리지는 서로 다른 모델에서 서로 다른 프레임이 생성된 경우 `mixed` 보고합니다. 캐시 적중은 요청된 라우팅 계획으로 레이블을 다시 지정하는 대신 해당 생산자 ID를 재사용합니다. 전체 비디오 결과 캐시는 출력 — 프롬프트, 유효 모델, 샘플링 정책, 프레임 수, 의미 분석 모드, 정규화된 포커스 힌트의 SHA-256 지문, 포커스 창, `transcript`, `audioTranscript` 및 밀착 시트 플래그 — 를 변경하는 모든 입력에 맞춰져 있으므로 이러한 차원을 변경하는 것은 캐시 누락이며 결코 오래된 재사용이 아닙니다. 시각적 중복 제거 정책 버전, 임계값 및 제한된 후보 프레임 수도 결과 캐시 키와 메타데이터에 명시적으로 표시됩니다. 따라서 정책 변경 시 오래된 전체 동영상 설명을 재사용할 수 없습니다. 결과 캐시 v4 메타데이터는 원시 사용자 작업이 아닌 모드와 지문을 유지합니다. Guardrail 메타데이터는 요청된 분석 모드와 효과적인 분석 모드를 모두 보고합니다. 사용 가능한 사용자 텍스트가 없는 요청된 `focused` 모드는 사실상 `full` 로 보고됩니다.

가드레일은 지원되는 모든 비디오 부분을 추출하지만 설명하는 내용은 `modalityBridgeVideoMaxVideos` 뿐입니다. `supportsVideo === false` 있는 것으로 입증된 대상의 경우 실패하고 제한을 초과한 비디오는 명시적인 안전 텍스트 마커가 되므로 원시 비디오가 유지되지 않습니다. 기능을 알 수 없는 경우 해당 부품은 비디오 캐리어를 유지합니다. 모든 대체 기록은 위의 제한된 텍스트 변환을 따릅니다. `supportsVideo === true` 있는 대상은 브리지를 우회합니다. 클라이언트 요청 중단 신호는 다운로드, 브로커 대기열, 하위 프로세스 및 캡션 호출을 통해 전파됩니다. 중단은 비디오 사이에서 중지되며 원시 미디어에 절대로 열리지 않습니다.

런타임 설정은 DB 지원 및 Zod 검증을 거쳤습니다.

| 키                                  | 기본        | 범위/행동                                                                                             |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 선택적 런타임, 선택                                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` 일반 캡션을 유지합니다. `focused` 제한적이고 신뢰할 수 없는 최신 사용자 컨텍스트를 사용합니다. |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge 모델 상속                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` 또는 비례 `segment_aware`; 감지기 실패는 `uniform` 로 돌아갑니다.            |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000~120000ms                                                                                         |

120초를 초과하는 레거시 지속형 비디오 시간 초과 값은 브로커 기한으로 고정됩니다. 해당 제한을 초과하는 새 설정 쓰기는 거부됩니다. `GET /api/modality-bridge/video/runtime` 인증 또는 런타임 조사 전에 신뢰할 수 있는 스탬프 루프백 지역성을 요구한 다음 관리 인증을 요구합니다. 런타임을 사용할 수 없는 경우 `available`, 삭제된 FFmpeg/ffprobe 버전 및 고정된 이유만 반환합니다. 내부 추출 끝점은 공개 업로드 API 아닙니다. 대기열 포화는 `503` + `Retry-After` 반환하고 호출자 연결 해제는 `499` 반환하며 고정 브로커 최종 기한은 `504` 반환합니다. 변환된 응답은 Vision 또는 Audio 세그먼트를 제거하지 않고 중앙 `x-omniroute-modality-bridge` 헤더에 `video->text;model=<visionModel>;parts=<videos>` 추가합니다.

### PII 마스커(`piiMasker.ts`)

실행 대상** 둘 다** 단계.

- **`preCall`** 페이로드를 복제하고 `system`, `messages`, `input` 및 `prompt` (일반 문자열 항목 포함)를 탐색하고 `processPII()` ( `@/shared/utils/inputSanitizer` 에서)를 문자열 `content`/`text` 필드에 적용합니다. `PII_REDACTION_ENABLED=true` 일 때 감지된 PII 는 아웃바운드 페이로드에서 수정됩니다. 이는 `INPUT_SANITIZER_MODE` (프롬프트 주입 정책만 제어)과 독립적입니다. 교정이 꺼진 경우 통화는 콘텐츠를 다시 쓰지 않고 감지 횟수를 기록합니다.
- **`postCall`** 응답을 심층 복제하고 `sanitizePIIResponse()` 와 Responses-API 모양 마스커(`maskResponsesOutput` — `output_text` 및 `output[].content[].text` 포함)를 실행합니다. 수정이 발생하면 수정된 응답이 원본을 대체합니다.

난간은 결코 막히지 않습니다. 주석을 달거나(`meta.detections`, `meta.redacted`) 다시 작성합니다.

**가역적 저장소(`PII_REVERSIBLE_VAULT_ENABLED`, 기본값 `false`).** `PII_REDACTION_ENABLED` 와 `PII_REVERSIBLE_VAULT_ENABLED` 모두 켜져 있으면(DB > env > 기본값을 재정의하고 요청당 한 번 읽음) `handleChat` 클라이언트 요청당 하나의 저장소(`src/lib/pii/requestTokenVaultScope.ts`)를 열고 이를 `GuardrailContext.tokenVault` 로 사전 호출 패스에 전달합니다. 그런 다음 마스커는 내장 규칙, 검증된 규칙(GDPR/POPIA) 및 사용자 정의 규칙 모두에 대해 `[EMAIL_REDACTED]` 대신 `<<PII_EMAIL_QWERTYUI_1>>` 와 같은 대리 토큰을 작성합니다. Nonce는 요청당 임의의 대문자 8개이며, 동일한 값은 요청 내에서 동일한 토큰을 얻습니다. 마스커만 민트입니다. 프롬프트 주입 가드와 `/api/guardrails/test` 저장소 없이 실행되고 자리 표시자를 유지합니다.

- 제공자, 모든 콤보 레그, 재시도, 융합 패널 구성원 및 융합 심사위원은 토큰만 볼 수 있습니다. 토큰은 `handleChat` 남기는 2xx 응답에서 한 번 복원됩니다. 구문 분석된 SSE 의 필드당(이벤트에 걸쳐 분할된 토큰은 여전히 해결됩니다. 도구 호출 인수는 JSON으로 이스케이프 처리됩니다.) 또는 JSON 본문의 필드별로 다시 계산된 `Content-Length` 사용합니다. 내용과 추론 텍스트, 도구 호출 인수가 복원됩니다. 오류 본문(4xx/5xx)은 토큰을 유지합니다.
- 실패는 비공개로 유지됩니다. 생성이 실패하거나 저장소가 값(1000개 항목, 값당 256자, 총 64 KB )을 거부하는 경우 자리 표시자가 대신 작성됩니다. 자격 증명 모음에서 확인할 수 없는 토큰 또는 실패한 복원은 문자 그대로 유지되며 개수만 기록됩니다. 볼트에는 타이머나 전역 상태가 없습니다. 응답 스트림이 종료되거나 취소되거나 오류가 발생하면 지워집니다.
- 요청이 토큰 생성, 메모리 추출, 멱등성 저장 및 의미 체계 캐시 쓰기를 모두 건너뛰는 경우 이후 요청에서 해당 토큰을 확인할 수 없기 때문입니다. 호출 로그에서 공급자 요청 및 응답은 토큰을 전달합니다. 기록된 클라이언트 요청 본문은 일반 수정과 마찬가지로 여전히 원시 클라이언트 입력입니다.
- 토큰은 요청별 무작위 nonce를 사용하므로 매 턴마다 프롬프트 접두사가 변경됩니다. 공급자 측 프롬프트 캐싱은 마스크된 턴에 대해 적중되지 않으며 나중에 턴(예: `previous_response_id` 통해)에 다시 오는 토큰은 이전 요청에 속하고 리터럴을 유지합니다.

#### 유형별 선택, 맞춤형 패턴 및 탐지 카운터

**대시보드 → 설정 → 보안 → PII 마스킹** 마스크된 _무엇을_ 선택합니다. 마스킹을 켜지 않습니다. 즉, 여전히 `PII_REDACTION_ENABLED` (요청) 및 `PII_RESPONSE_SANITIZATION` (응답 + SSE)이며 둘 다 기본적으로 꺼져 있습니다.

- **유형별 선택** — 내장 ID는 `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`)에 나열됩니다. 설정되지 않은 경우 모든 유형(이 설정이 존재하기 전의 동작)을 의미합니다. 요청 엔진의 `ssn_us` 패턴은 `ssn` 에 매핑됩니다. 템플릿(최소, 표준, 금융, 브라질, USA, GDPR, POPIA, 전체)은 UI 의 확인란만 채웁니다.
- **GDPR 및 POPIA 식별자** — EU 및 남아프리카 개인 식별자를 포함하는 12개의 내장 ID(아래 표). 해당 정규식, 유효성 검사기 및 관할권 태그는 응답 삭제 프로그램(`src/lib/piiSanitizer.ts`)과 요청 마스커(`src/shared/utils/inputSanitizer.ts`)가 모두 사용하는 하나의 테이블 `src/shared/utils/piiPatterns.ts` 에 있습니다. 일치 항목은 유효성 검사기가 이를 수락하는 경우에만 수정됩니다. 숫자만 나열하는 것만으로는 충분하지 않습니다. 이러한 ID가 존재하기 전에 좁은 선택 항목을 저장한 운영자는 새 ID가 선택될 때까지 해당 동작을 유지합니다.
- **맞춤 패턴** — 최대 20개의 정규식 또는 와일드카드 패턴(`*` = 최대 64개의 공백이 아닌 문자, `?` = one). 일치 항목은 `[CUSTOM_REDACTED]` 됩니다. 모든 패턴은 `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`)를 통과합니다. 최대 500자, 플래그는 `g i m s u` 로 제한되고 컴파일되어야 하며 `safe-regex` (치명적 역추적)를 통과해야 하며 빈 문자열이나 수정 자리 표시자와 일치하면 안 됩니다. 실패한 패턴은 저장 및 테스트 시 거부되고, 실패한 저장된 행은 컴파일되는 대신 런타임 시 건너뜁니다. 사용자 정의 패턴은 마스킹이 켜져 있는 동안에만 실행됩니다.
- **탐지 카운터** — 유형당 개수(값이 일치하지 않음), 메모리에 보관되고 재시작 시 재설정됩니다(`src/lib/pii/piiDetectionStats.ts`). 마스킹이 켜져 있는 동안에만 증가합니다.

설정은 `key_value` 테이블(네임스페이스 `pii_settings`, `src/lib/db/piiSettings.ts`)에 있으며 1초 캐시를 통해 읽혀집니다. API:

| 방법   | 길                       | 목적                                                                                 |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | 플래그 상태, `enabledTypes`, `customPatterns`, 감지 카운터                           |
| `PUT`  | `/api/settings/pii`      | `enabledTypes` (`null` = 모두) and/or `customPatterns`                               |
| `POST` | `/api/settings/pii/test` | 최대 8 KB 의 샘플에 대해 하나의 패턴을 테스트 실행합니다. 아무것도 저장되지 않습니다 |

세 가지 모두 관리 인증이 필요하며 Zod (`src/shared/validation/schemas/piiSettings.ts`)를 사용하여 본문의 유효성을 검사합니다. 로그인이 비활성화된 상태에서(`requireLogin=false`) `GET` 및 테스트 엔드포인트는 열려 있지만 `PUT` 여전히 대시보드 세션, `manage` -scope API 키, 쓰기 범위 이상의 `oma_` 액세스 토큰 또는 루프백에서 전송된 CLI 토큰 또는 내부 서비스 토큰이 필요합니다.

#### GDPR (EU) 및 POPIA (남아프리카) 식별자

| ID                  | 식별자                                   | 확인                                                                   |
| ------------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| `iban`              | IBAN                                     | 알려진 국가, 해당 국가의 정확한 길이, ISO 13616 MOD-97-10              |
| `eu_vat`            | EU VAT 번호                              | 알려진 회원국 접두사 및 해당 주의 번호 형식( VIES 조회 없음)           |
| `es_dni_nie`        | 스페인어 DNI / NIE                       | 제어 문자(값 mod 23); NIE `X/Y/Z` + 7자리입니다.                       |
| `it_codice_fiscale` | 이탈리아 코디스 피스케일(Codice Fiscale) | odd/even 위치 테이블의 제어 문자                                       |
| `pl_pesel`          | 폴란드어 PESEL                           | 존재하는 가중 체크섬 및 인코딩된 생년월일                              |
| `nl_bsn`            | 네덜란드 BSN                             | 11 방지(가중치 9..2, -1)                                               |
| `de_steuer_id`      | 독일 Steuer-ID                           | ISO 7064 Mod 11,10 및 숫자 구조 규칙(선행 0 없음)                      |
| `se_personnummer`   | 스웨덴 사람번호                          | 마지막 10자리 이상의 Luhn과 그럴듯한 생년월일(10자리 또는 12자리)      |
| `za_id`             | 남아프리카 ID 번호                       | 13자리 전체에 대한 Luhn, 유효한 출생 month/day, 시민권 숫자 0 또는 1   |
| `za_phone`          | 남아프리카 전화                          | `+27` / `27` 접두사 또는 공백이나 하이픈으로 작성된 국가 `0..` 형식    |
| `za_vat`            | 남아프리카 VAT 번호                      | `4` 로 시작하는 10자리 숫자** 그리고** "VAT" / "BTW" 앞의 48자         |
| `za_tax_ref`        | 남아프리카 세금 참조.                    | `0` 로 시작하는 10자리 -`3`, Luhn,** 그리고** "tax" / "SARS" 앞의 48자 |

숫자 전용 형식은 주문 번호, 빌드 번호 및 타임스탬프와 충돌하기 때문에 가장 취약한 형식(`za_vat`, `za_tax_ref`)에는 키워드 큐가 필요하며 10자리 `0..` 번호는 남아프리카 전화번호로 처리되지 않습니다. 간격이 있는 IBANs (`GB29 NWBK ...`)는 일치하지 않습니다. 스트리밍 경로에서 큐는 현재 청크 내에서만 조회됩니다. ID는 일반 전화 패턴보다 앞에 위치하므로 검증된 식별자는 자체 자리 표시자(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...)를 유지합니다. `gdpr` 및 `popia` 템플릿은 각각 EU 및 South African ID를 선택합니다. 마스킹 자체는 선택적으로 유지됩니다(Hard Rule #20). 여기서는 기능 플래그 기본값을 변경하는 것이 없습니다.

### 프롬프트 주입(`promptInjection.ts`)

사용자 제공 콘텐츠에서 적대적인 구조를 탐지하고 구성된 정책을 시행합니다. 동작은 환경 변수 및 생성자 옵션에 따라 결정됩니다.

| 환경        | 환경변수                                                                                           | 기본   | 효과                                                                                                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 활성화됨    | `INPUT_SANITIZER_ENABLED`                                                                          | `true` | `false` 일 때 가드레일은 단락됩니다.                                                                                                                                                        |
| 방법        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                    | `warn` | 주입 정책: `block`, `warn` 또는 `log`. (`redact` 는 이전 버전과의 호환성을 위해 허용되지만** ~ 아니다** 스트립 주입 텍스트; PII rewrite 요청은 `PII_REDACTION_ENABLED` 에 의해 제어됩니다.) |
| 차단 임계값 | `blockThreshold` 옵션 / `INPUT_SANITIZER_BLOCK_THRESHOLD` (별칭 `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | 차단하는 데 필요한 최소 심각도입니다. 매체는 기본적으로 관찰 전용입니다.                                                                                                                    |

**모드 우선순위** (`getMode`): 호출자 `options.mode` → `INJECTION_GUARD_MODE`**DB 기능 플래그 재정의** (대시보드 → 설정 → 기능 플래그) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. 따라서 대시보드 재정의는 환경 변수를 우선하므로 기능 플래그 UI 실행 중인 가드를 실시간으로 제어합니다(다시 시작하지 않음). DB 읽기는 안전합니다. 오류가 발생하면 가드는 env 기반 동작으로 돌아가고 재정의가 설정되지 않은 경우 동작은 env 전용 해결과 동일합니다.

탐지 소스:

1. `@/shared/utils/inputSanitizer` 의 `sanitizeRequest()` (파이프라인의 다른 곳에서 사용되는 공유 감지기 세트)
2. 내장 `DEFAULT_GUARD_PATTERNS` (현재 `system_override_inline` 및 `markdown_system_block`, 둘 다 `high` 심각도).
3. 생성자 옵션(문자열, 정규식 또는 `{ name, pattern, severity }` 레코드)을 통해 전달되는 선택적 `customPatterns`.

언제 `mode === "block"`** 그리고** 하나 이상의 탐지가 심각도 임계값을 충족하면 `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }` 반환합니다. `warn`/`log` 모드에서는 가드레일이 기록되지만 호출은 허용됩니다. 레지스트리를 거치지 않고 프롬프트를 평가해야 하는 호출자를 위해 공유 도우미 `evaluatePromptInjection()` 도 내보내집니다.

**스캔 바운드(v3.8.20):** 탐지기는 검사만 수행합니다.** 처음 KB** `src/shared/utils/inputSanitizer.ts` 의 조인된 프롬프트 텍스트 — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 바이트)입니다. 패턴 루프를 실행하기 전 `detectInjection()` 및 `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)`. 주입 지시문은 입력 상단 근처에 있으므로 감지를 약화시키지 않고 수백 KB 페이로드의 정규식 CPU/GC 제한합니다(예: #3932, #4041).

### 자격 증명 마스커(`credentialMasker.ts`)

실행 대상** 둘 다** 단계, 기본 체인의 마지막 (우선순위 `95`) 아웃바운드 페이로드(메시지 콘텐츠, 도구 호출 인수, 도구 결과)에서 잘 알려진 API 키/비밀 토큰 패턴을 수정합니다.** 그리고** 따라서 프롬프트에 붙여넣은(또는 도구 결과에 의해 다시 에코되는) 자격 증명은 업스트림 공급자에게 유출되거나 클라이언트로 다시 유출되지 않습니다.

- **선택만 가능** , PII 수정과 동일한 규칙(엄격한 규칙 #20-adjacent): `settings.credentialRedactionEnabled === true` 아니면 비활성화됩니다.** 또는** `CREDENTIAL_REDACTION_ENABLED=true`. 이 기능을 끄면 가드레일은 차단되거나 다시 작성되지 않는 무작동 — 입니다.
- `redactCredentials()` 전체 payload/response 트리(`walkValue()`, 프로토타입 오염 안전, `WeakSet` 통한 사이클 안전)를 탐색하고 일치 항목을 `[REDACTED:<type>]` 자리 표시자로 대체하여 실제로 변경된 분기만 복제합니다.
- `CREDENTIAL_PATTERNS` 는 LLM 공급자 키(OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS 토큰(GitHub, Slack, Linear, Notion, npm, Postman, Discord), 결제 키(Stripe, Square), 클라우드 키(AWS access key, Twilio, SendGrid, Mailgun), 개인 키 / JWTs, 자격 증명 연결 문자열(`mongodb://user:pass@...` 등) 및 일반 `Authorization`/`x-api-key`/`api-key`/`apikey` 헤더 값 패턴. 헤더 모양의 키(`authorization`, `x-api-key`, `api-key`, `apikey`)는 일반 텍스트 정규식을 통하지 않고 구조적으로 수정됩니다(값만, `Bearer `/`Basic ` 와 같은 구성표 접두사는 유지됨).
- 난간은 결코 막히지 않습니다. 다시 작성하고(`modifiedPayload` / `modifiedResponse`) 주석을 추가합니다(`meta.credentialsRedacted`, `meta.count`).

회귀 가드: `tests/unit/credential-masker-guardrail.test.ts`.

## 기본 계약 (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true이면 체인을 단락(short-circuit)시킴
  message?: string; // 차단 시 표시되는 메시지
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall이 요청을 재작성하기 위해 반환
  modifiedResponse?: TValue; // postCall이 응답을 재작성하기 위해 반환
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

가드레일은 `void`, `{}`, 또는 `{ block: false }`를 반환하여 "변경 없음"을
신호합니다. `modifiedPayload`/`modifiedResponse`를 반환하면 체인을 통해
다운스트림 가드레일로 흐르는 값이 교체됩니다.
`signal?: AbortSignal`은 호출자의 라이프사이클을 가드레일로 전달합니다. 요청 중단(abort)은 의도적인 fail-open 예외입니다: 미디어 브릿지는 원시 미디어를 이를 지원하지 않는 것으로 알려진 대상으로 복원하지 않고 작업을 중지하고 정리합니다.

## 레지스트리 (`registry.ts`)

싱글턴 `guardrailRegistry`는 다음을 노출합니다:

- `register(guardrail)` — 가드레일을 추가(또는 정규화된 이름으로 교체)하고
  오름차순 `priority`로 다시 정렬합니다.
- `clear()` / `list()` — 관리용 헬퍼.
- `runPreCallHooks(payload, context)` — 활성 가드레일을 순회하면서 페이로드를
  `modifiedPayload`를 통해 전달하고, 첫 번째 `block: true`에서 중지합니다.
- `runPostCallHooks(response, context)` — 응답 측에서 동일한 흐름.
- `resetGuardrailsForTests({ registerDefaults })` — 상태를 지우고 선택적으로
  기본값을 다시 등록하여 깨끗한 테스트 격리를 제공합니다.

두 실행기 모두 `{ blocked, payload|response, results, guardrail?, message? }`를 반환하며,
여기서 `results`는 가드레일별 `blocked`, `skipped`, `modified`, `error`, `meta` 필드를
포함하는 `GuardrailExecutionResult` 레코드의 배열로, 추적에 유용합니다.

### 요청별 가드레일 비활성화

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })`는 현재 요청에서
건너뛰어야 할 가드레일 이름의 중복 제거된 목록을 집계합니다. 다섯 개의 채널이
있으며, 다음 순서로 읽혀 하나의 목록으로 병합됩니다(중복 제거 시 첫 번째
출현이 우선함):

1. `apiKeyInfo.disabledGuardrails`
2. 요청 본문 `disabledGuardrails` (최상위)
3. 요청 본문 `metadata.disabledGuardrails` (`metadata`가 객체인 경우에만)
4. 헤더 `x-omniroute-disabled-guardrails`
5. 레거시 헤더 `x-disabled-guardrails`

다섯 채널 모두 병합되며, 두 헤더도 포함됩니다:
`x-omniroute-disabled-guardrails`와 `x-disabled-guardrails`를 둘 다 보내면
두 목록의 합집합이 건너뛰어지며, 빈 최신 헤더가 더 이상 레거시 헤더를 가리지
않습니다
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412),
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)에서 수정됨).

값은 문자열 배열이거나 쉼표로 구분된 문자열일 수 있습니다. 이름은 트림되고
소문자 kebab-case로 정규화되며(`pii_masker` → `pii-masker`), 빈 항목은 삭제됩니다.
결과는 `context.disabledGuardrails`를 통해 레지스트리로 전달되며, 레지스트리는
일치하는 가드레일을 건너뜁니다(`results`에 `skipped: true`로 표시).

비활성화 목록은 **레지스트리**에만 영향을 미칩니다. 프롬프트 인젝션 `block` 모드는
필수 경계입니다: 인젝션 가드 미들웨어
(`src/middleware/promptInjectionGuard.ts`)는 호출자가 제어하는 비활성화 목록 없이
`evaluatePromptInjection()`을 호출하므로(과거에 사용하던 죽은
`resolveDisabledGuardrails({ body })` 호출은
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)에서 제거됨),
`prompt-injection`을 비활성화하는 요청도 `block` 모드에서는 여전히 거부됩니다.
이는 의도된 설계입니다. 비활성화 채널은 호출자가 제어합니다(요청 본문,
metadata, 헤더). 그리고 호출자는 운영자가 설정한 보안 제어를
끌 수 없어야 합니다
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)의 헤더
합집합은 어떤 레지스트리 가드레일이 건너뛰어지는지만 변경할 뿐, 클라이언트가
미들웨어를 우회하도록 허용하지 않습니다. 키별 및 그룹별 필수 가드레일 정책은
v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417)에서
추적되고 있습니다.
[적용 범위와 한계](#coverage-and-limits)를 참조하세요.

## 실행 순서

`src/sse/handlers/chat.ts` 및 `open-sse/handlers/chatCore.ts` ( [Coverage and Limits](#coverage-and-limits) 아래에 나열된 chat-family 경로)를 통해 흐르는 각 요청에 대해 다음을 수행합니다.

1. `resolveDisabledGuardrails(...)` API 키, 본문 및 헤더에서 건너뛰기 목록을 작성합니다.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` 오름차순 우선순위로 가드레일을 실행합니다.
   - 비활성화된 가드레일은 `skipped` 로 기록됩니다.
   - 각 가드레일의 `preCall` `modifiedPayload` 통해 페이로드를 다시 쓸 수 있습니다.
   - 첫 번째 `block: true` 체인을 단락시키고 핸들러는 가드레일 거부 응답을 반환합니다.
3. (재작성될 가능성이 있는) 페이로드는 콤보 라우팅 및 업스트림 디스패치로 흘러갑니다.
4. **비스트리밍 전용:** 응답이 조립된 후 `guardrailRegistry.runPostCallHooks(...)` 응답에서 동일한 체인을 실행합니다. 여기에서 `block: true` 업스트림 응답을 삭제하고 HTTP 400을 반환합니다. 스트리밍된 응답은 이 단계를 완전히 건너뜁니다.
5. **뒤집을 수 있는 금고만 해당:** 요청이 토큰을 생성하면 `handleChat` 호출 후 후크 및 스트리밍 PII 변환 후 반환된 2xx 응답에서 토큰을 복원하므로 `PII_RESPONSE_SANITIZATION` 토큰과 모델 생성 PII 볼 수 있으며 복원된 원본은 볼 수 없습니다.

던지는 가드레일은 `error: <message>` 로 기록되고 `logger.warn` 통해 기록되지만 체인은 설계상 — 페일오픈을 계속합니다.

## 보장 및 한도

가드레일 레지스트리는 채팅 파이프라인에만 연결됩니다. 이러한 제한은 `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` 및 `tests/unit/guardrail-pipeline-characterization.test.ts` 에 의해 고정됩니다. 동작이 변경되면 의도적으로 해당 테스트를 업데이트합니다.

### 후크가 실행되는 곳

| 후크/컨트롤                | 실행 대상                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`          | `handleChat` (`src/sse/handlers/chat.ts`)에 의해 처리되는 요청: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (및 `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` 및 Telegram 채팅 프록시. 또한 대시보드 테스트 엔드포인트 `/api/guardrails/test`. 사전 호출 블록은 HTTP 400을 반환합니다. |
| `runPostCallHooks`         | **비스트리밍** 채팅 응답만(`open-sse/handlers/chatCore/nonStreamingResponse.ts`). 스트리밍된 응답은 절대 도달하지 않습니다.                                                                                                                                                                                                                                                                                                  |
| 스트리밍 PII               | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), `PII_RESPONSE_SANITIZATION` 켜져 있을 때 `streamingPipeline.ts` 에 파이프됩니다. 가드레일이 아니므로 비활성화 채널은 영향을 미치지 않습니다.                                                                                                                                                                                                                   |
| 가역적 PII 볼트            | 요청은 `PII_REDACTION_ENABLED` 및 `PII_REVERSIBLE_VAULT_ENABLED` 켜져 있을 때 `handleChat` 에 의해서만 처리됩니다. 토큰은 `pii-masker` 사전 호출에 의해 생성되고 `handleChat` 종료(`src/lib/pii/requestTokenVaultScope.ts`)에서 복원됩니다. 요청에 대해 `pii-masker` 비활성화하면 아무것도 발행되지 않는다는 의미입니다.                                                                                                     |
| 주입 보호 미들웨어(레거시) | 모든 프롬프트가 표시되는 `/v1` 경로, 채팅 제품군이 포함됩니다( [경로 적용 범위](#injection-guard-route-coverage--red-team-phase-8--block-d) 참조). 즉시 주입만 가능합니다.                                                                                                                                                                                                                                                   |

### 보장되지 않는 것

- **미디어, 임베딩 및 데이터 경로** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`)는 레지스트리에 도달하지 않습니다. PII 마스킹, 자격 증명 마스킹 또는 양식 브리지가 실행되지 않습니다. 유일한 확인 사항은 레거시 주입 방지 미들웨어입니다.
- **스트리밍된 응답** 통화 후 가드레일이 없습니다. `pii-masker` 또는 `credential-masker` 통화 후 및 통화 후 블록이 없습니다. 스트리밍 PII 변환만 적용됩니다( `PII_RESPONSE_SANITIZATION` 켜져 있는 경우). 스트리밍된 응답으로 다시 에코된 자격 증명은 수정되지 않습니다.
- **채널과 미들웨어를 비활성화합니다(설계상):** 미들웨어는 호출자 제어 비활성화 목록을 전달하지 않고 `evaluatePromptInjection()` 에 대한 자체 호출을 통해 신속한 주입을 평가합니다. `block` 모드는 채팅 패밀리 경로( [#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413) )를 포함하여 발신자 제어 비활성화가 우회할 수 없는 필수 경계입니다. `prompt-injection` 비활성화하면 레지스트리 가드레일만 건너뜁니다.

### 통화 후 응답을 보는 방법

비스트리밍 경로에서 순서는 다음과 같습니다: 메모리 추출 → 내장 도구 실행 → 호출 후 가드레일 → 호출 후 블록 종료 → semantic-cache 저장소.

- **메모리 추출** 그리고** 도구 실행** 통화 후 가드레일이 응답을 다시 쓰거나 차단하기 전에 응답을 확인하세요. [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) 이후 메모리 추출은 `PII_RESPONSE_SANITIZATION` 켜져 있을 때(스트리밍 및 비스트리밍 모두) `sanitizePII` 통해 추출된 텍스트를 실행하지만 호출 후 이후 블록에 대한 응답은 여전히 메모리와 도구에 제공됩니다.
- **의미론적 캐시** 호출 후 응답을 저장하므로 다시 작성된 응답을 저장하고 차단된 응답은 캐시되지 않습니다. 캐시 항목은 API 키별로 입력됩니다.

## 구성

내장된 Guardrail이 읽는 환경 변수:

| 변하기 쉬운                           | 사용처                     | 효과                                                                                            |
| ------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | 감지를 완전히 비활성화하려면 `false` 설정하십시오.                                              |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | 주입 정책: `warn`, `block` 또는 `log`. 레거시 값 `redact` 주입 텍스트를 다시 작성하지 않습니다. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | 주입 가드 모드; 또한 DB 기능 플래그도** 재정의** 환경 변수(DB > ENV).                           |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | `MODE=block` 거부하는 최소 심각도: `high` (기본값), `medium` 또는 `low`.                        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | `INPUT_SANITIZER_BLOCK_THRESHOLD` 의 레거시 별칭입니다.                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | `true` 인 경우 PII 요청이 수정됩니다(주입 모드와 무관).                                         |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | `PII_REDACTION_ENABLED` 사용하면 되돌릴 수 있는 토큰을 생성하고 2xx 응답으로 복원합니다.        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (다운스트림)  | 응답측 마스커 동작을 제어합니다.                                                                |

Modality Bridge 가드레일은 env vars가 아닌 DB 지원 설정 저장소(`getSettings()`)에서 런타임 구성을 읽습니다. Vision의 기본 키는 `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` 및 `modalityBridgeCacheMaxEntries` 입니다. 레거시 `visionBridge*` 키는 문서화된 1주기 읽기 폴백으로만 허용됩니다. 대시보드 쓰기에는 기본 키가 사용됩니다. 기본값과 대체 해결 프로그램은 `src/shared/constants/modalityBridgeDefaults.ts` 에 있으며 레거시 상수는 `src/shared/constants/visionBridgeDefaults.ts` 에 유지됩니다.

오디오는 `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` 및 `modalityBridgeAudioMaxClips` 와 공유 `modalityBridgeCache*` 설정을 사용합니다. 오디오에는 레거시 키 대체가 없습니다. 이러한 키는 Modality Bridge 스키마와 함께 도입되었기 때문입니다.

비디오는 `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` 및 `modalityBridgeVideoTimeout` 와 공유 `modalityBridgeCache*` 설정을 사용합니다. FFmpeg/ffprobe 는 선택적 운영 종속성이며 프레임 캡션이 대기 시간과 모델 비용을 추가하기 때문에 기본적으로 비활성화되어 있습니다.

## 커스텀 가드레일

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

단계:

1. `BaseGuardrail`을 확장하는 `src/lib/guardrails/myGuardrail.ts`를 생성합니다.
2. `preCall` 및/또는 `postCall`을 구현합니다.
3. 임포트 시점에 등록하거나(`registerDefaultGuardrails`에서 푸시) 런타임에
   `guardrailRegistry.register(...)`를 호출합니다. 레지스트리는 정규화된 이름이
   같은 기존 가드레일을 교체합니다.
4. `tests/unit/` 아래에 테스트를 추가합니다(기존 예시:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## 테스트

테스트 사이에 `resetGuardrailsForTests()`를 사용해 알려진 상태에서 시작하세요.
`{ registerDefaults: false }`를 전달하면 빈 레지스트리로 시작하여 테스트 대상
가드레일만 등록할 수 있습니다. Vision Bridge는 의존성 주입(`deps.getSettings`,
`deps.callVisionModel`)을 지원하며, Audio Bridge는 설정, 기능, STT 모델 선택,
자격 증명 확인, 전사에 대해 동등한 분기 지점(seam)을 제공합니다. 따라서 테스트는
DB나 네트워크 접근 없이 두 흐름을 모두 검증할 수 있습니다.

## 함께 보기

- `src/lib/guardrails/` — 구현
- `src/shared/utils/inputSanitizer.ts` — 프롬프트 인젝션 및 PII 마스킹을
  구동하는 공유 탐지기
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge 기본값 및
  강제 브리지 모델 목록
- `src/shared/constants/modalityBridgeDefaults.ts` — 공유 Vision/Audio 런타임 기본값
- `docs/architecture/RESILIENCE_GUIDE.md` — 직교 레이어(서킷 브레이커, 쿨다운)
- `docs/reference/ENVIRONMENT.md` — 전체 환경 변수 참조

## 인젝션 가드 라우트 커버리지 및 레드팀 (Phase 8 · Block D)

인젝션 가드(`createInjectionGuard` / `withInjectionGuard`)는 사용자 프롬프트를
받는 모든 라우트를 커버합니다. `INJECTION_GUARD_MODE`를 따릅니다(기본값 `warn` =
로그만 기록, `block` = HTTP 400 `SECURITY_001` 반환).

| 유형         | 라우트                                                                                                                                               | 기본 모드 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 텍스트(기존) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn      |
| 생성형       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn      |
| 데이터       | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn      |

텍스트 추출(`extractMessageContents`)은 `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`을 커버합니다.

**레드팀(야간, `nightly-llm-security.yml`):** promptfoo는 각 라우트가
`INJECTION_GUARD_MODE=block`에서 OWASP-LLM 코퍼스를 차단하는지 검증하고, garak은
프로브를 실행합니다(시크릿이 없으면 건너뜀). `moderations`는 일관성을 위해
포함됩니다. block 모드는 필수 경계입니다. `evaluatePromptInjection()`은
미들웨어가 전달하는 요청별 비활성화 목록을 무시하므로, `disabledGuardrails`는
라우트를 이 검사에서 면제하지 **않습니다**([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

야간 워크플로(`.github/workflows/nightly-llm-security.yml`, cron + 수동
디스패치)에는 두 개의 잡이 있습니다:

- **`promptfoo-guard`(차단)** — `INJECTION_GUARD_MODE=block`으로
  `promptfoo eval -c promptfooconfig.yaml`을 실행합니다. 각 적대적 케이스
  (예: "이전 지시를 모두 무시해…", DAN 스타일 탈옥)는 응답이
  `error.code === "SECURITY_001"`을 포함하는지, 즉 가드가 실제로 요청을
  거부했는지 확인합니다.
- **`garak`(권고)** — 로컬 OmniRoute 인스턴스(`http://localhost:20128/v1`)를
  대상으로 garak `--probes promptinject,dan,leakreplay`를 실행합니다.
  프로바이더 시크릿(`PROMPTFOO_PROVIDER_KEY`)이 있어야 실행되며, 없으면
  정상적으로 건너뛰고 `|| true`가 붙어 있어 CI를 실패시키지 않고 결과만
  보고합니다.

가드 헬퍼(`createInjectionGuard` / `withInjectionGuard`)의 커버리지는 프롬프트를
포함하는 모든 `/v1` 라우트에 걸쳐 있으며, 프롬프트 텍스트는
`src/shared/utils/inputSanitizer.ts`의 `extractMessageContents()`가
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`에서
추출합니다.
