# Custom JSON API provider nodes (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

사용자 정의 JSON API 노드는 OpenAI 또는 Anthropic 프로토콜을 사용하지 않는 JSON 비즈니스 엔드포인트를 연결합니다. OmniRoute JSON 요청 템플릿을 채우고 이를 전체 엔드포인트 URL 로 보내고 응답 경로에서 응답을 읽고 이를 클라이언트 고유 형식(채팅 완료, 응답, 메시지 등)으로 클라이언트에 반환합니다.

`apiType: "custom-json"` 가 포함된 OpenAI 호환 노드입니다. 해당 ID의 형식은 `openai-compatible-custom-json-<suffix>` 입니다. 대시보드 양식은 아직 사용할 수 없습니다. 아래 공급자 노드 API 통해 이러한 노드를 생성하고 편집합니다.

## 노드 만들기

`POST /api/provider-nodes` (관리 인증):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` 는** 완벽한** 엔드포인트 URL. 아무것도 추가되지 않으며( `/chat/completions` 없음, `/models` 없음) 다른 OpenAI 호환 노드와 달리 기본 URL 없습니다. 이는 내장된 자격 증명이나 `#fragment` 없이 `http(s)` 여야 하며 노드가 저장될 때와 모든 요청에서 모든 공급자 노드와 동일한 아웃바운드 URL 가드를 전달합니다.
- 연결 키( 기본값을 포함하여 `authType` `bearer` 또는 `api-key`)를 보내는 노드는 `https://` 사용해야 합니다. 일반 `http://` 루프백 호스트(`localhost`, `127.0.0.0/8`, `::1`) 또는 키를 보내지 않는 `authType: "none"` 에만 허용됩니다. 개인 LAN 주소(`10.x`, `172.16-31.x`, `192.168.x`)는 면제되지 않습니다. 해당 네트워크의 누구나 키를 읽을 수 있습니다. 이러한 노드 저장은 `400` 으로 실패하며 이전에 저장된 노드는 요청이 전송되기 전에 동일한 메시지가 있는 모든 요청에서 닫히지 않습니다. LAN 의 키 엔드포인트의 경우 TLS 뒤에 배치합니다(예: 역방향 프록시).
- `customJson` Zod 로 검증됩니다. 알 수 없는 키는 거부됩니다. 모든 필드는 선택사항입니다.

| 필드              | 가치                            | 기본                                                   |
| ----------------- | ------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`          | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`     | `bearer`                                               |
| `authHeader`      | `api-key` 때 사용되는 헤더 이름 | `X-API-Key`                                            |
| `requestTemplate` | JSON 객체(≤ 64 KB, 깊이 ≤ 32)   | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | 필드 경로 또는 전신의 경우 `$`  | `choices[0].message.content`                           |

- 비밀은 연결의 API 키에 유지되며 템플릿에는 유지되지 않습니다. `bearer` `Authorization: Bearer <key>` 보냅니다; `api-key` `<authHeader>: <key>` 보냅니다. 인증 헤더는 `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` 또는 홉별 헤더일 수 없습니다. `none` 사용하면 연결에 키가 필요하지 않습니다.
- 추가 정적 헤더는 노드의 일반 `customHeaders` 사용합니다(다른 모든 호환 노드와 동일한 검증, 인증 헤더는 허용되지 않음).

`PUT /api/provider-nodes/<id>` 동일한 `customJson` 허용하고 노드의 모든 기존 연결에서 `baseUrl` 및 구성을 다시 작성합니다. `customJson` 생략하면 저장된 구성이 유지됩니다. `apiType` `chat` 또는 `responses` 로 전환하면 노드와 해당 연결에서 제거됩니다.

그런 다음 평소대로 노드에 대한 연결을 추가하고(노드 ID가 있는 `POST /api/providers` ) `<prefix>/<model>` 요청합니다(예: `biz/assistant-v1`). 엔드포인트는 모델 목록을 공개하지 않으므로 모델 ID를 직접 추가하세요.

## 요청 템플릿

템플릿은 일반 JSON 입니다. 문자열 값에는 `{{placeholder}}` 마커가 포함될 수 있습니다. 아무것도 평가되거나 실행되지 않으며 객체 키는 대체되지 않습니다.

| 자리 표시자          | 값                                                         |
| -------------------- | ---------------------------------------------------------- |
| `{{prompt}}`         | 최신 사용자 메시지의 텍스트(줄바꿈으로 연결된 텍스트 부분) |
| `{{messages}}`       | OpenAI 채팅 형식의 대화                                    |
| `{{model}}`          | 공급자 접두사 없이 요청된 모델 ID                          |
| `{{stream}}`         | 항상 `false` — 엔드포인트는 하나의 JSON 문서로 응답합니다. |
| `{{request.<path>}}` | 번역된(OpenAI 채팅 형식) 요청의 필드                       |

- 정확히 하나의 자리 표시자인 값은 JSON 유형을 유지합니다(`"{{messages}}"` 배열이 됩니다). 더 긴 문자열 내부의 자리 표시자는 텍스트로 삽입됩니다.
- 아무 것도 확인하지 않는 자리 표시자는 불완전한 페이로드를 보내는 대신 HTTP 400을 사용한 요청에 실패합니다.
- 경로는 점 표기법과 숫자 인덱스(`data.items[0].text`)를 사용합니다. `__proto__`, `prototype` 및 `constructor` 키와 경로에서 거부됩니다.

## 응답

`responsePath` 의 값은 보조 응답이 됩니다. 문자열은 통과하고 다른 JSON 값은 직렬화됩니다. 누락된 또는 `null` 필드 또는 JSON 가 아닌 본문은 HTTP 502를 반환합니다. 업스트림 오류 상태가 전달됩니다. 스트리밍 클라이언트의 경우 OmniRoute 전체 JSON 응답을 기다린 다음 이를 하나의 콘텐츠 청크와 종료 청크로 내보냅니다. 이것은 토큰 스트리밍이 아닙니다. 도구 호출 및 사용 필드는 매핑되지 않습니다.

## 재생되지 않음

비즈니스 요청은 실패하더라도 부작용이 있을 수 있습니다. 따라서 OmniRoute 이를 한 번 보냅니다.

- 전송 재시도 및 리디렉션이 수행되지 않습니다.
- 다른 연결에 대한 재시도 없음(계정 대체) — 실패는 있는 그대로 반환되고 연결이 냉각되지 않습니다.
- 비어 있거나 응답이 실패한 경우에도 다음 콤보 대상으로 대체되지 않습니다.

여러 모델을 명시적으로 호출하는 별도의 클라이언트 요청과 융합 패널은 여전히 독립적으로 엔드포인트를 호출합니다.

## 노드 테스트

연결 저장, 연결** 시험** 버튼 및 백그라운드 상태 확인은 엔드포인트를 호출하지 않습니다. 저장된 구성의 유효성만 검사하고 연결을 확인할 수 없는 것으로 보고합니다.

`"apiType": "custom-json"` 포함된 `POST /api/provider-nodes/validate` 및 노드 필드(`baseUrl`, `apiKey`, `customJson`, 선택적 `customHeaders` 및 `modelId`)는 `ping` 최신 사용자 텍스트로 사용하여 정확히 하나의 실제 요청을 보냅니다. 이는 `{ "valid": true }` 또는 업스트림 상태(업스트림 본문이 아님)에 응답합니다.

## 저장

구성은 `provider_nodes.custom_json_config_json` (마이그레이션 `240_provider_node_custom_json_config.sql`)에 저장되고 각 연결의 `providerSpecificData.customJson` 에 복사됩니다.

구현: `open-sse/utils/customJson.ts` (검증 및 템플릿 작성), `open-sse/executors/customJson.ts` (실행자), `open-sse/services/combo/noReplayLatch.ts` 및 `src/sse/handlers/chat/responsePolicies.ts` (재생 없음).
