# Plugin Marketplace (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **신뢰할 수 있는 원본:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, 및
> `src/app/(dashboard)/dashboard/plugins/`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 WordPress 스타일의 플러그인 시스템을 제공합니다. 플러그인은 각각 `plugin.json` 매니페스트와 엔트리 파일을 포함하는 독립적인 디렉터리이며, 요청 파이프라인(`onRequest` / `onResponse` / `onError`)과 수명 주기 이벤트(`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`)에 후킹됩니다.

**플러그인 마켓플레이스**는 이 시스템 위에 구축된 검색 계층입니다. 설치 가능한 플러그인을 탐색할 수 있는 카탈로그를 제공합니다. 기본적으로 카탈로그는 소규모 내장 시드 레지스트리를 사용합니다. 운영자는 사용자 지정 원격 레지스트리 URL을 지정할 수 있으며, 이 경우 DNS 확인 방식의 SSRF 보호 장치로 가져오기 작업을 강화합니다([보안](#security) 참조).

모든 플러그인 라우트는 **루프백 전용**(Tier 1 — `LOCAL_ONLY`)입니다. 플러그인은 자식 프로세스에서 코드를 로드하고 실행하므로, 인증 여부와 관계없이 루프백이 아닌 출처에서는 해당 라우트에 접근할 수 없습니다. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)를 참조하세요.

## 그것이 Together 어떻게 맞는지

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **레지스트리 계층** — `src/lib/plugins/marketplace.ts`: 카탈로그를 나열/검색하고 오류가 발생하면 시드 레지스트리로 돌아갑니다.
- **라이프사이클 레이어** — `src/lib/plugins/manager.ts` (`pluginManager` 싱글톤): 설치, 업그레이드, 활성화, 비활성화, 제거, 검색, 시작 로드.
- **매니페스트 레이어** — `src/lib/plugins/manifest.ts`: `plugin.json` 에 대한 Zod 스키마 + 기본값입니다.
- **스캐너** — `src/lib/plugins/scanner.ts`: 플러그인 디렉토리 아래의 디스크에서 플러그인을 검색합니다.
- **짐을 싣는 사람** — `src/lib/plugins/loader.ts`: 별도의 Node.js 하위 프로세스에서 각 플러그인을 생성하고 브로커는 IPC 통해 호출합니다. 하위 항목은 샌드박스가 아닙니다(아래 "플러그인 실행 격리" 참조).

## 마켓플레이스 카탈로그

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`)는 `MarketplaceEntry` 객체 목록을 반환합니다.

| 필드          | 타입     | 참고                                 |
| ------------- | -------- | ------------------------------------ |
| `name`        | string   | kebab-case 플러그인 이름             |
| `version`     | string   | semver                               |
| `description` | string   | 간단한 요약                          |
| `author`      | string   | 작성자/조직                          |
| `license`     | string   | SPDX 스타일 라이선스 ID              |
| `downloadUrl` | string   | 소스 다운로드 URL(비어 있을 수 있음) |
| `repository`  | string?  | 선택적 저장소 URL                    |
| `tags`        | string[] | 검색/필터 태그                       |
| `downloads`   | number   | 다운로드 횟수                        |
| `rating`      | number   | 0–5                                  |
| `verified`    | boolean  | 항목이 검증됨으로 표시되었는지 여부  |
| `lastUpdated` | string   | ISO 형식에 가까운 날짜 문자열        |

사용자 지정 레지스트리 URL이 구성되지 않은 경우 카탈로그는 내장 `SEED_REGISTRY`(현재 `request-logger`, `rate-limiter`, `cost-tracker`, `theme-manager`)를 사용합니다. 시드 레지스트리는 항상 사용할 수 있습니다. 구성된 원격 레지스트리에 접근할 수 없거나, `200`이 아닌 상태를 반환하거나, 인식할 수 없는 본문을 반환하면 `listMarketplacePlugins()`는 경고를 기록하고 시드 목록으로 대체합니다.

> 참고: 마켓플레이스 **카탈로그**(탐색/검색)는 엔드투엔드로 연결되어 있지만, 카탈로그에서 원클릭으로 수행하는 마켓플레이스 **설치**는 아직 구현되지 않았습니다. 현재 마켓플레이스 항목의 대시보드 "설치" 버튼은 "출시 예정" 알림을 표시합니다. 현재 설치는 로컬 경로 설치 흐름(`POST /api/plugins`)과 디스크 내 검색(`POST /api/plugins/scan`)을 통해 수행됩니다.

## REST API

모든 엔드포인트에는 관리 인증(`requireManagementAuth`)이 필요합니다.** 그리고** 루프백 전용입니다. — `/api/plugins` 및 `/api/plugins/` `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`)에 나열되어 있습니다.

| 엔드포인트                         | 방법   | 설명                                                   |
| ---------------------------------- | ------ | ------------------------------------------------------ |
| `/api/plugins`                     | GET    | 설치된 플러그인 나열(선택적 `?status=` 필터)           |
| `/api/plugins`                     | POST   | 플러그인 소스 디렉토리에서 플러그인 설치               |
| `/api/plugins/scan`                | POST   | 플러그인 디렉토리를 스캔하고 새 플러그인을 등록하세요. |
| `/api/plugins/marketplace`         | GET    | 마켓플레이스 카탈로그 항목 나열                        |
| `/api/plugins/marketplace/install` | POST   | 이름으로 마켓플레이스 플러그인 설치                    |
| `/api/plugins/[name]`              | GET    | 설치된 플러그인 세부정보 가져오기                      |
| `/api/plugins/[name]`              | DELETE | 플러그인 제거                                          |
| `/api/plugins/[name]/activate`     | POST   | 활성화( + 레지스터 후크 로드)                          |
| `/api/plugins/[name]/deactivate`   | POST   | 비활성화( `onDeactivate` 실행, 후크 등록 취소)         |
| `/api/plugins/[name]/config`       | GET    | 플러그인 구성 + 구성 스키마 가져오기                   |
| `/api/plugins/[name]/config`       | PUT    | 플러그인 구성 업데이트(스키마에 대해 검증됨)           |

`GET /api/plugins` `status` 필터는 `installed` / `active` / `inactive` / `error` 중 하나를 허용합니다. 잘못된 값은 `400` 반환합니다.

### 설치된 플러그인 나열

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### 로컬 경로에서 설치

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` 다음과 같아야 합니다.** 순수한** 디렉토리 경로** 플러그인 소스 디렉토리 내부** : 플러그인 루트 옆에 `plugin-sources` 있으므로 기본적으로 `~/.omniroute/plugin-sources/` 이거나 해당 변수가 설정된 경우 `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` ( `src/lib/plugins/installSource.ts` 의 `getPluginSourcesDir()` ). 먼저 플러그인을 복사하거나 복제하세요. 경로에 `..` 또는 널 바이트가 포함되어 있거나, 해당 디렉토리 외부에 있거나, 심볼릭 링크를 통해 외부에서 확인되거나, 대상이 외부에 있는 심볼릭 링크가 포함되어 있거나, 디렉토리가 존재하지 않는 경우 `400` 로 설치가 거부됩니다. 소스 디렉토리에는 유효한 `plugin.json` 포함되어 있어야 합니다(또는 그 상위 디렉토리여야 합니다). 성공하면 응답은 플러그인 행이 설치된 `201` 입니다.

다른 플러그인 경로와 달리 이 경로에는 로그인이 비활성화된 경우에도(`requireLogin=false`) 관리 자격 증명(대시보드 세션 또는 관리 범위 API 키)이 필요합니다. 코드 설치는 결코 익명 작업이 아닙니다. `POST /api/plugins/marketplace/install` (본체 `{ "name": "<plugin>" }`)에도 동일하게 적용됩니다.

### 마켓플레이스 탐색

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### 플러그인 구성 업데이트

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` `src/lib/plugins/manifest.ts` 의 `validatePluginConfig()` 사용하여 플러그인의 `configSchema` (매니페스트에 선언됨)에 대해 본문의 유효성을 검사합니다. 모든 키는 스키마에서 선언되어야 하고 값은 선언된 유형과 일치해야 하며, `number` 필드는 `min`/`max` 따르고, `select` 필드는 선언된 `enum` 와 일치해야 합니다. 모든 위반은 `400` 반환하고 아무것도 저장되지 않습니다. `configSchema` 없다고 선언하는 플러그인에는 구성 가능한 키가 없으므로 `400` 에 대한 요청이 거부됩니다("플러그인은 구성 가능한 키를 선언하지 않습니다").

## 구성

### 플러그인 디렉터리

플러그인은 OmniRoute 데이터 디렉터리 아래에 있습니다.

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (또는 manifest.main이 가리키는 파일)
```

`getDefaultPluginDir()`(`src/lib/plugins/scanner.ts`)는 다음 세 단계로 해당 디렉터리를
결정합니다.

1. **`OMNIROUTE_PLUGINS_DIR`**가 설정된 경우 — `HOME` 값과 관계없이 지정된 값을
   그대로 사용합니다. 이는 플러그인 트리가 일반적으로 컨테이너의 홈 디렉터리와
   무관한 경로에 바인드 마운트되는 Docker/K8s를 위한 명시적 설정입니다(#11827).
2. `<home>/.omniroute/plugins`. 여기서 `<home>`은 `HOME` / `USERPROFILE`
   환경 변수에서 가져옵니다.
3. 프로세스가 홈 경로를 전혀 내보내지 않는 경우 `/tmp/.omniroute/plugins`.

결정된 디렉터리는 시작 시 `scanner.dir_resolved`로 한 번 기록되며, 선택된
입력(`OMNIROUTE_PLUGINS_DIR`, `home` 또는 `no-home-fallback`)도 함께 표시됩니다. 따라서
이미지가 조용히 3단계를 사용하게 된 경우 빈 플러그인 목록만 보고하는 대신 그 사실을
명시합니다. `POST /api/plugins/scan`은 해당 위치에서 유효한 `plugin.json`을 포함하는
모든 하위 디렉터리를 검색하고 등록합니다. 동일한 디렉터리가
`pluginManager.install()`이 플러그인을 복사하는 루트이므로, 재정의하면 검색 위치와
설치 위치가 함께 변경됩니다.

> **`OMNIROUTE_PLUGINS_DIR`은 `OMNIROUTE_PLUGIN_PATH`가 아닙니다.** 후자는
> `omniroute` 하위 명령을 추가하는 `omniroute-cmd-*` npm 패키지를 찾기 위해
> CLI 명령 플러그인 로더(`bin/cli/plugins.mjs`)에서만 읽으며, 여기에서 설명하는
> 런타임 스캐너에는 영향을 주지 않습니다. 해당 내용은 [PLUGINS.md](./PLUGINS.md)를
> 참조하세요.

### 사용자 지정 마켓플레이스 레지스트리 URL

마켓플레이스 카탈로그 소스는 `pluginMarketplaceUrl` 설정에서 읽습니다
(`src/lib/plugins/marketplace.ts`는 `settings.pluginMarketplaceUrl`을 읽음).
`http(s)` URL로 설정하면 `listMarketplacePlugins()`는 해당 URL을 가져와 최상위
JSON 항목 배열 또는 `plugins` 배열이 있는 객체를 허용합니다. 문자열 `name`이 없는
항목은 필터링됩니다. 설정되지 않았거나 가져오기가 SSRF 보호에 의해 차단되거나 잘못된
응답을 반환하면 기본 제공 시드 레지스트리가 사용됩니다.

대시보드의 "Marketplace" 탭에는 이 URL을 입력하는 필드가 있습니다
(`GET /api/settings`에서 다시 읽음).

> 구현 참고: 대시보드의 "Save" 작업은 `pluginMarketplaceUrl`을
> `PATCH /api/settings`로 전송합니다. 이 글을 작성하는 시점에는 해당 키가
> `updateSettingsSchema`(`src/shared/validation/settingsSchemas.ts`)에 선언되어 있지
> 않으므로, 이에 의존하기 전에 사용 중인 릴리스에서 설정이 영구 저장되는지
> 확인하세요. 설정 저장소에 키가 존재하기만 하면 **읽기** 경로(`getSettings()` →
> `listMarketplacePlugins()`)에서는 해당 키를 적용합니다.

## 보안

### 경로 계층 — 루프백 전용

플러그인은 생성된 하위 프로세스에서 코드를 실행하므로 전체 `/api/plugins` 표면은 `LOCAL_ONLY` (Tier 1)로 분류됩니다. 루프백 적용은 무조건 실행됩니다.** ~ 전에** 인증 확인이 불가능하므로 터널을 통해 상자에 도달하는 유출된 관리 토큰은 여전히 플러그인을 설치, 활성화 또는 제거할 수 없습니다. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) 및 엄격한 규칙 #15 / #17 를 참조하세요.

### 마켓플레이스 레지스트리 SSRF 가드

사용자 정의 레지스트리 URL 는 공격자가 영향을 미칠 수 있는 구성이므로 이를 가져오기 전에 `listMarketplacePlugins()` 두 계층을 통해 이를 실행합니다.

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` 가 아닌 모든 것을 거부합니다.
   - 리터럴 private/loopback/link-local/ULA 호스트를 거부합니다(IPv4** 그리고** 표준 `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`)를 통해 IPv6, IPv4-mapped 포함).
   - 해결하다** 둘 다** `A` 및 `AAAA` 다음과 같은 경우 기록하고 거부합니다.** 어느** 확인된 주소는 비공개 — 이며 공개 호스트 이름 → 비공개 IP 우회를 닫습니다.
   - **실패가 종결됨** : DNS 해결 실패는 URL 를 거부합니다.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): 가져오기 시 공개 전용 URL 가드를 다시 적용하고** 리디렉션 차단** (공개 → 비공개 `30x` 피벗 없음).

두 레이어 중 하나에 실패한 URL 요청을 중단하지 않습니다. — 시장은 자동으로 내장 시드 레지스트리로 돌아가 경고를 기록합니다.

> 이 가드는 특히 A + AAAA 해결하고 IPv4-only 검사 대신 표준 `isPrivateHost` 사용하기 위해 PR #3774 에서 강화되었습니다.

### 플러그인 실행 격리

> **플러그인은 기본적으로 샌드박스 처리되지 않습니다.** 하위 항목은 VM 컨텍스트나 Node.js 권한 플래그가 없는 OmniRoute 사용자로 실행되는 일반 Node.js 프로세스이므로 플러그인 코드는 사용자가 할 수 있는 모든 파일을 읽고 쓸 수 있고, 프로그램을 실행하고 네트워크에 연결할 수 있습니다. `requires.permissions` 자식이 어떤 환경 변수를 받을지 결정합니다. 다른 권한은 적용되지 않습니다. 옵트인 `PLUGIN_PERMISSION_MODEL_ENABLED` 기능 플래그(기본적으로 꺼져 있음)는 Node.js 제한할 수 없는 `network` 제외하고 해당 권한으로 구축된 Node.js 권한 모델에서 각 플러그인을 실행합니다( [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#%ED%97%88%EA%B0%80-%EC%8B%9C%EC%8A%A4%ED%85%9C) 참조). 신뢰할 수 있는 플러그인만 설치하세요. 아래 프로세스 경계에는 충돌 및 정지가 포함되어 있습니다. 이는 보안 경계가 아닙니다.

- **프로세스 격리** — `loadPlugin()` (`src/lib/plugins/loader.ts`)는 별도의 Node.js 하위 프로세스에서 각 플러그인을 생성하고 IPC 통해 통신합니다. 후크 호출은 `SIGTERM` → `SIGKILL` 에스컬레이션으로 인해 시간 초과됩니다.
- **환경 허용 목록** — 자식은 허용 목록에 있는 환경 변수 세트만 받습니다. 더 넓은 세트는 매니페스트가 `env` 권한을 요청할 때만 부여됩니다.
- **소스 포함 설치** — `POST /api/plugins` 플러그인 소스 디렉터리에서만 읽습니다("로컬 경로에서 설치" 참조). 경로는 `realpath` 로 정규화되고 해당 디렉터리 내에 엄격하게 유지되어야 하며 이를 이스케이프하는 심볼릭 링크가 포함된 소스 트리는 무엇이든 복사되기 전에 거부됩니다.
- **경로 억제** — install/upgrade/uninstall 플러그인 디렉토리와 `manifest.main` 해결함을 주장합니다.** 이내에** 복사 또는 재귀 삭제 전에 관리되는 플러그인 루트(조작된 DB 경로 및 `manifest.main` 의 `../` 탐색으로부터 보호) 활성화는 `realpath` 통해 심볼릭 링크를 확인하고 플러그인 디렉터리를 벗어나는 진입점 로드를 거부합니다.
- **선택적 무결성 핀** — 매니페스트는 `integrity` (`sha256-<base64>`, SRI 형식) 필드를 선언할 수 있습니다. 존재하는 경우 로더는 로드 시 항목 파일 해시를 확인하고 불일치 시 활성화를 거부합니다. 옵트인 변조 감지 기능입니다.** ~ 아니다** 보안 경계: 로드된 플러그인이 수행할 수 있는 작업을 제한하지 않습니다.
- **후크에 클라이언트 자격 증명이 없습니다.** — `onRequest`, `onResponse` 및 `onError` 에 전달된 컨텍스트에는 `authorization`, `x-api-key`, `proxy-authorization` 및 `cookie` 헤더가 제거되었으며 API 키 레코드에는 키 값이 없습니다( `src/lib/plugins/hooks.ts` 의 `redactPluginContext()` ).

## 매니페스트(`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`)에 의해 검증됨:

| 필드               | 유형    | 메모                                               |
| ------------------ | ------- | -------------------------------------------------- |
| `name`             | 끈      | 필수의; 케밥 케이스(`^[a-z0-9-]+$`), 1~100자       |
| `version`          | 끈      | 필수의; 셈버(`MAJOR.MINOR.PATCH`)                  |
| `description`      | 끈?     | ≤ 500자                                            |
| `author`           | 끈?     | ≤ 200자                                            |
| `license`          | 끈?     | 기본값은 `MIT`                                     |
| `main`             | 끈?     | 참가 파일; 기본값은 `index.js`                     |
| `source`           | 열거형? | `local` \| `marketplace` (기본값은 `local`)        |
| `tags`             | 끈[]?   | 태그 검색                                          |
| `requires`         | 물체?   | `{ omniroute?, permissions[] }`                    |
| `hooks`            | 물체?   | 플러그인이 구현하는 후크를 선언하는 부울           |
| `skills`           | 물체[]? | 선택적 기술 정의                                   |
| `enabledByDefault` | 부울?   | 설치 시 자동 활성화                                |
| `configSchema`     | 물체?   | 구성 필드 맵(`string`/`number`/`boolean`/`select`) |
| `integrity`        | 끈?     | 선택적 `sha256-<base64>` 항목 파일 핀              |

권한은 enum `network` / `file-read` / `file-write` / `env` / `exec` 에서 가져옵니다. `env` 만이 런타임 효과를 갖습니다(자식에 대한 환경 변수 허용 목록이 약간 더 큽니다). 나머지는 선언이며 시행되지 않습니다.

## 수명 주기 흐름

```
설치 (POST /api/plugins, 경로)
  → 매니페스트 스캔/검증 → 스테이징으로 복사 → main이 디렉터리 내부에 있는지 확인
  → ~/.omniroute/plugins/<name>으로 원자적 이름 변경 → DB 행 삽입
  → onInstall 실행 → enabledByDefault인 경우: 활성화

활성화 (POST /api/plugins/{name}/activate)
  → realpath 포함 여부 확인 → loadPlugin() (자식 프로세스 생성)
  → 선언된 훅 등록 → status = "active" → onActivate 실행

비활성화 (POST /api/plugins/{name}/deactivate)
  → onDeactivate 실행 (등록 해제 전) → 훅 등록 해제
  → 자식 프로세스 종료 → status = "inactive"

제거 (DELETE /api/plugins/{name})
  → 활성 상태인 경우 비활성화 → onUninstall 실행
  → 포함 여부를 확인한 후 플러그인 디렉터리를 재귀적으로 삭제 → DB 행 삭제
```

설치된 버전보다 매니페스트 버전이 **엄격하게
최신**인 디렉터리를 대상으로 `install`을 다시 실행하면 자동으로 업그레이드됩니다(새로 설치되며 설정은
기본값으로 초기화됨). 버전이 같거나 이전이면 거부됩니다.

## 데이터베이스

`plugins` 테이블(마이그레이션 `076_create_plugins.sql`):

| 열              | 유형    | 참고                                             |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | 고유                                             |
| `version`       | TEXT    | semver; 기본값 `1.0.0`                           |
| `description`   | TEXT    | 선택 사항                                        |
| `author`        | TEXT    | 선택 사항                                        |
| `license`       | TEXT    | 기본값 `MIT`                                     |
| `main`          | TEXT    | 진입 파일; 기본값 `index.js`                     |
| `source`        | TEXT    | 기본값 `local`                                   |
| `tags`          | TEXT    | JSON 배열; 기본값 `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1; 기본값 0                                    |
| `manifest`      | TEXT    | 전체 매니페스트 JSON                             |
| `config`        | TEXT    | JSON; 기본값 `{}`                                |
| `config_schema` | TEXT    | JSON; 기본값 `{}`                                |
| `hooks`         | TEXT    | 선언된 훅 이름의 JSON 배열; 기본값 `[]`          |
| `permissions`   | TEXT    | JSON 배열; 기본값 `[]`                           |
| `plugin_dir`    | TEXT    | 절대 설치 디렉터리                               |
| `error_message` | TEXT    | `status = "error"`일 때 설정                     |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | 활성화 시 설정                                   |

플러그인 메트릭/분석은 추가 테이블
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`)에서 추적됩니다.

## 계기반

`/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`)의 대시보드 페이지는 두 개의 탭을 제공합니다.

- **설치됨** — 선언된 후크, activate/deactivate 토글, 제거 버튼 및 "플러그인 검색" 작업(`POST /api/plugins/scan`)과 함께 설치된 플러그인을 나열합니다.
- **시장** — 사용자 정의 레지스트리 URL 를 설정하는 필드가 있는 `GET /api/plugins/marketplace` 의 카탈로그를 표시합니다.

페이지에는 항상 플러그인이 OmniRoute 프로세스의 전체 권한으로 실행된다는 경고가 표시됩니다.

플러그인별 구성 페이지는 `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`)에 있습니다.

## 참고 자료

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins`가 루프백 전용(Tier 1)인 이유
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — 관련 스킬 프레임워크
  (`src/lib/skills/`); 플러그인은 매니페스트에서 스킬을 선언할 수 있음
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — 이벤트 기반 아웃바운드
  통합
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  모든 플러그인 라우트가 오류 응답에 사용하는 `buildErrorBody()` 패턴
