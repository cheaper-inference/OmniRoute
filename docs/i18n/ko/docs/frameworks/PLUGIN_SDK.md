# OmniRoute Plugin SDK (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## 빠른 시작

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## API 참조

### `definePlugin(def: PluginDefinition): Plugin`

기본값으로 플러그인 객체를 생성하는 팩토리 함수입니다.

**매개변수:**

- `name` (문자열, 필수) — kebab-case의 플러그인 이름
- `priority` (숫자, 선택 사항, 기본값: 100) — Lower가 먼저 실행됩니다.
- `enabled` (부울, 선택 사항, 기본값: true) — 시작이 활성화됩니까?
- `onRequest` (함수, 선택 사항) — 채팅 핸들러 이전에 실행됩니다.
- `onResponse` (함수, 선택 사항) — 채팅 핸들러 이후에 실행됩니다.
- `onError` (함수, 선택 사항) — 핸들러 오류 시 실행

### `blockRequest(response?): BlockingHookResult`

요청을 차단하고 선택적으로 사용자 정의 응답을 반환합니다.

```ts
onRequest: (ctx) => {
  if (!ctx.headers?.["x-client-team"]) {
    return blockRequest({ error: "Missing x-client-team header", status: 400 });
  }
};
```

### `modifyBody(body): PluginResult`

공급자에게 도달하기 전에 요청 본문을 수정합니다.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

요청 컨텍스트에 메타데이터를 첨부합니다.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## 플러그인 컨텍스트(`PluginContext`)

| 필드         | 유형                      | 설명                         |
| ------------ | ------------------------- | ---------------------------- |
| `requestId`  | `string`                  | 고유 요청 식별자             |
| `model`      | `string`                  | 요청하신 모델명              |
| `provider`   | `string`                  | 대상 제공자 ID               |
| `body`       | `Record<string, unknown>` | 요청 본문                    |
| `headers`    | `Record<string, string>`  | 요청 헤더(참고 참조)         |
| `metadata`   | `Record<string, unknown>` | 변경 가능한 메타데이터       |
| `timestamp`  | `number`                  | 요청 타임스탬프              |
| `apiKeyInfo` | `object` (선택사항)       | API 키 메타데이터(참고 참조) |

컨텍스트는 클라이언트의 자격 증명을 전달하지 않습니다. `authorization`, `x-api-key`, `proxy-authorization` 및 `cookie` 헤더는 제거되고(대소문자 관계 없음) `apiKeyInfo` 키의 메타데이터(예: `id`, `name` 및 `scopes`)를 유지하지만 키 값이나 해당 지문( `src/lib/plugins/hooks.ts` 의 `redactPluginContext()` )은 유지하지 않습니다. 이는 `onRequest`, `onResponse` 및 `onError` 에 적용됩니다.

## 매니페스트 (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### 훅 우선순위

훅에 우선순위를 설정할 수 있습니다(값이 낮을수록 먼저 실행됨).

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

또는 단순한 불리언 값으로 설정할 수 있습니다(기본 우선순위는 100).

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## 허가 시스템

플러그인은** 샌드박스 처리되지 않음** . 각 활성 플러그인은 VM 컨텍스트 및 Node.js 권한 플래그 없이 OmniRoute 와 동일한 운영 체제 사용자 하에서 별도의 일반 Node.js 하위 프로세스( `src/lib/plugins/loader.ts` 의 `loadPlugin()` )로 실행됩니다. 플러그인 코드는 `node:fs`, `node:child_process`, `fetch` 및 기타 모든 Node.js API 사용할 수 있습니다. OmniRoute 사용자가 할 수 있는 모든 파일(데이터 디렉토리 포함)을 읽고 쓸 수 있으며, 프로그램을 실행하고 네트워크에 연결할 수 있습니다.

매니페스트의 `requires.permissions` `network`, `file-read`, `file-write`, `env` 및 `exec` 허용하지만 현재는 `env` 만이 런타임에 영향을 미칩니다.

| 허가                                         | 오늘부터 적용                                                                                                                                                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`                                        | 플러그인 프로세스는 `PORT`, `HOSTNAME`, `TZ` 및 `TMPDIR` 도 수신합니다. 이것이 없으면 `PATH`, `HOME`, `USER`, `LANG`, `LC_ALL`, `NODE_ENV`, `PLUGIN_ENTRY` 및 `PLUGIN_NAME` ( Windows 의 `SystemRoot` 및 `windir` 포함)만 수신합니다. |
| `network`, `file-read`, `file-write`, `exec` | 없음. 이는 단지 선언일 뿐입니다. 누락되면 아무것도 차단되지 않습니다.                                                                                                                                                                 |

플러그인 설치는 호스트에 다른 프로그램을 설치하는 것과 같습니다. 소스를 신뢰하는 플러그인만 설치하세요.

## 구성 스키마

`configSchema`에서 구성 가능한 설정을 정의합니다.

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "외부 API 키" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

필드 유형: `string`, `number`, `boolean`, `select`

필드 옵션: `default`, `min`, `max`, `enum`, `description`

구성 값은 데이터베이스에 저장되며 대시보드 구성 페이지를 통해 접근할 수 있습니다.

## 기본 제공 이벤트

| 이벤트            | 발생 시점                              | 페이로드                      |
| ----------------- | -------------------------------------- | ----------------------------- |
| `onRequest`       | 채팅 핸들러 실행 전                    | 요청 컨텍스트                 |
| `onResponse`      | 채팅 핸들러 실행 후                    | 응답 데이터                   |
| `onError`         | 핸들러 오류 발생 시                    | 오류 객체                     |
| `onModelSelect`   | 라우팅할 모델이 선택되었을 때          | 모델 정보                     |
| `onComboResolve`  | 조합 라우팅이 결정되었을 때            | 조합 대상                     |
| `onRateLimit`     | 요청 속도 제한에 도달했을 때           | 제한 정보                     |
| `onQuotaExhaust`  | 할당량이 소진되었을 때                 | 할당량 정보                   |
| `onProviderError` | 제공자가 오류를 반환했을 때            | 오류 세부 정보                |
| `onStreamStart`   | SSE 스트림이 시작되었을 때             | 스트림 정보                   |
| `onStreamEnd`     | SSE 스트림이 종료되었을 때             | 스트림 통계                   |
| `onInstall`       | 플러그인이 설치되었을 때               | `{ name, version, manifest }` |
| `onActivate`      | 플러그인이 활성화되었을 때             | `{ name, version, manifest }` |
| `onDeactivate`    | 플러그인이 비활성화되었을 때           | `{ name, version, manifest }` |
| `onUninstall`     | 플러그인이 제거되었을 때(파일 삭제 전) | `{ name, version, manifest }` |

## 예

### 요청 로거

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### 속도 제한기

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.apiKeyInfo?.id || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minute
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### 응답 변압기

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
