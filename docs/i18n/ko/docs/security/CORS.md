# CORS Configuration & Security (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute 는 **브라우저 출처** 단일 중앙 집중식 허용 목록에서 교차 출처 응답을 읽을 수 있습니다. 모델은 다음과 같습니다 **기본적으로 페일클로즈됨** : 귀하가 선택할 때까지 원본은 허용되지 않습니다. 이 페이지에서는 허용 목록이 해결되는 방법, `CORS_ALLOW_ALL=true` 실제로 노출하는 것(그리고 중요한 것은 수행하는 작업)을 문서화합니다.** ~ 아니다** ), 개발과 프로덕션을 안전하게 구성하는 방법, 와일드카드가 활성화될 때 대시보드에 표시되는 런타임 경고입니다.

**진실의 출처:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). 허용 목록은 한 번 적용되며, 미들웨어(`src/server/authz/pipeline.ts`) — 경로당 핸들러는 `Access-Control-Allow-Origin` 자체를 설정하지 않습니다.

## 원점 해결 방법

각 요청에 대해 미들웨어는 다음 순서로 `Access-Control-Allow-Origin` 값을 계산합니다.

1. **`CORS_ALLOW_ALL=true`** (또는 레거시 `CORS_ORIGIN=*`) → ZQG를 사용하여 호출자의 `Origin` 다시(또는 `Origin` 헤더가 없는 경우 `*` ) `Vary: Origin` 하므로 캐시가 올바르게 유지됩니다. 또한 동일한 `applyCorsHeaders()` 초크포인트는 토큰 인증 `/v1*`/`/v1beta*` 표면(`relaxForTokenAuth`, RFC 9110 §12.5.5, 문제 #6737)의 모든 2xx-with-body 응답에 `Vary: Accept-Encoding` 추가하므로 downstream/shared 캐시는 압축된 변형과 압축되지 않은 변형을 올바르게 구별할 수 있습니다.
2. 그렇지 않으면 요청 `Origin` 정규화되고(소문자, 후행 슬래시 제거)**병합된 허용 목록** :
   - 환경 **`CORS_ALLOWED_ORIGINS`** — 쉼표로 구분된 목록 및
   - 런타임 **`corsOrigins`** 설정(Dashboard → Security → _CORS Allowed Origins_), `src/lib/config/runtimeSettings.ts` 에서 `setRuntimeAllowedOrigins()` 통해 주입됩니다.
3. 일치하지 않습니다 →**`Access-Control-Allow-Origin` 헤더가 내보내지지 않습니다.** . 브라우저는 교차 출처 읽기를 차단합니다. 이는 의도된 페일클로즈 기본값입니다.

| 환경변수               | 의미                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | 정확한 출처의 CSV 허용합니다(권장).                                           |
| `CORS_ALLOW_ALL`       | `true`/`1` → 모든 원점(와일드카드)을 에코합니다. 개발 전용.                   |
| `CORS_ORIGIN`          | 유산. `*` `CORS_ALLOW_ALL` 처럼 동작합니다. 단일 값이 허용 목록에 추가됩니다. |

## `CORS_ALLOW_ALL=true` 실제로 노출하는 위협 모델 —

일반적인 OWASP 경고("와일드카드 CORS = 모든 사이트에서 API 호출할 수 있음")는 심각하게 받아들일 가치가 있지만 OmniRoute 의 노출은 **일반 케이스보다 좁습니다.** , 한 가지 구체적인 구현 사실로 인해:

> **중앙 `applyCorsHeaders()` `Access-Control-Allow-Credentials` 방출하지 않습니다.** 서버가 `Access-Control-Allow-Credentials: true` 보내지 않는 한 브라우저는 _credentialed_ (쿠키 보유) 교차 출처 응답을 노출하지 않습니다. OmniRoute 의 공유 CORS 경로는 절대 그렇지 않습니다.

`CORS_ALLOW_ALL=true` 사용하더라도 표면당 의미는 다음과 같습니다.

| 표면                                | 인증 메커니즘            | 와일드카드 CORS 의 효과                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 대시보드 / MANAGEMENT `/api/*`      | 쿠키 세션                | 원점은 에코되지만 **`Allow-Credentials` 가 없는 경우** 브라우저 **블록** 인증된 읽기. 악의적인 교차 출처 사이트 **읽을 수 없다** 인증된 대시보드 응답과 세션 쿠키는 노출되지 않습니다.                                                                                                                                                                                                                                                              |
| 클라이언트 API `/v1/*`, `/v1beta/*` | 베어러/ `x-api-key` 헤더 | 이미 허용됨 **의도적으로** (`relaxForTokenAuth`): 브라우저는 `Authorization`/`x-api-key` 자동으로 연결하지 않으므로 공격자의 페이지에서 키를 제공할 수 없습니다. 완화된 에코에는 자격 증명 헤더뿐만 아니라 인증된 제목(검증된 API 키 또는 대시보드 세션)이 필요하며 `Access-Control-Allow-Credentials` 포함되지 않습니다. 익명 응답(`REQUIRE_API_KEY=false`)은 명시적인 `CORS_ALLOW_ALL=true` 옵트인을 포함하여 구성된 원본 허용 목록을 사용합니다. |
| 공개 읽기 전용(`/api/health`, ...)  | 없음                     | 민감하지 않음; 와일드카드는 무해합니다.                                                                                                                                                                                                                                                                                                                                                                                                             |

그래서 **잔여** `CORS_ALLOW_ALL=true` 노출은 다음으로 제한됩니다. (a) 인증되지 않은 교차 출처 **읽다** 이미 인증되지 않은 데이터를 삭제하고 (b) CORS 허용합니다.**비행 전 패스** 교차 출처 페이지가 제공할 수 없는 인증이 여전히 필요한 관리 경로 — 에서. 그것은** ~ 아니다** 공유 CORS 경로의 세션 하이재킹 또는 자격 증명 도용 벡터.

### 하나의 진짜 예외 — `/api/v1/agents/`

Cloud-Agent 경로(`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`)는 **소유하다** CORS 헤더(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) 및 **하다** `Access-Control-Allow-Credentials: true` 와 함께 `Access-Control-Allow-Origin: <origin>|*` 방출합니다. 이는 Origin-Echo와 Credential이 공존하는 단일 표면이며,**`CORS_ALLOW_ALL` 와 독립** . 이러한 경로는 관리 인증(`requireManagementAuth`)됩니다. 호스트 외부에 대시보드를 노출하는 운영자는 이것이 응답 헤더에서 교차 출처 자격 증명 읽기가 허용되는 유일한 장소라는 점을 알아야 합니다. 이를 명시적인 허용 목록으로 강화하는 것은 이 CORS 지침과 별도로 추적됩니다.

## 생산 체크리스트

- **생산 시 `CORS_ALLOW_ALL=true` 설정하지 마십시오.** 설정하지 않은 상태로 둡니다.
- 설정 **명백한** 원본 목록 — env var 또는 Security-tab 필드입니다.

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute 역방향 프록시/터널(nginx, Caddy, Cloudflare Tunnel, Tailscale) 뒤에서 실행되는 경우 CORS 는** ~ 아니다** 유일한 제어 — 루프백 경로 가드는 여전히 생성 가능한 경로를 보호합니다( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) 참조). 403을 "수정"하기 위해 `X-Forwarded-For: 127.0.0.1` 위조하지 마십시오. 루트 가드가 닫은 RCE 클래스를 다시 엽니다.
- 런타임 상태를 확인합니다. 대시보드에 다음이 표시됩니다.**지속적인 호박색 배너** 대시보드 → 보안 → 인증 인벤토리에서 `CORS_ALLOW_ALL=true` 활성화될 때마다 `/api/settings/authz-inventory` `cors: { allowAll, allowedOrigins }` 봉투 모니터링 도구를 폴링할 수 있습니다.

## 개발 편의성 — 특정 지역 원산지를 허용합니다.

개발 중에도 와일드카드가 거의 필요하지 않습니다. 사용하는 개발 서버만 허용하세요.

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

원본은 후행 슬래시를 무시하고 대소문자를 구분하지 않고 일치하므로 `http://localhost:3000` 와 `http://localhost:3000/` 는 동일합니다. 런타임 시 동일한 CSV 다음에서 설정할 수 있습니다.**대시보드 → 보안 → CORS 허용 출처** 다시 시작하지 않고.

## API 키와 쿠키 세션

- **베어러/ `x-api-key` ( `/v1/*` 추론 표면):** 브라우저는 이를 자동으로 첨부하지 않습니다. 여기서 CORS 의미 있는 장벽이 아닙니다. — API 키는 장벽 — 입니다. 따라서 해당 표면은 의도적으로 허용되므로 브라우저와 Electron 클라이언트는 이미 자격이 있는 응답을 읽을 수 있습니다. 완화된 에코에는 자격 증명 헤더뿐만 아니라 인증된 제목(검증된 API 키 또는 대시보드 세션)이 필요하며 `Access-Control-Allow-Credentials` 포함되지 않습니다. 익명 응답(`REQUIRE_API_KEY=false`)은 명시적인 `CORS_ALLOW_ALL=true` 옵트인을 포함하여 구성된 원본 허용 목록을 사용합니다. 인증 거부(401)는 읽기 가능한 상태를 유지하므로 클라이언트는 취소되거나 잘못 입력된 키(#5242)를 표시할 수 있습니다. 파이프라인의 자체 401은 에코를 유지하고 파이프라인이 키를 익명으로 제공한 후 키 자체를 거부하는 경로(관리 인증이 구성된 `/v1/models` 및 `/v1beta/models`, 소유자 범위 `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` 및 자동 콤보 후보 경로)를 통해 해당 401에 에코를 추가합니다. `credentialRejectionHeaders()`. 에코는 자격 증명 헤더(`Authorization`, `x-api-key`, `x-goog-api-key` 또는 `auth_token` 쿠키)를 전달하는 요청에 입력되며 경로가 확인된 요청에 입력되지 않으며 `Access-Control-Allow-Credentials` 와 쌍을 이루지 않습니다. 본문은 고정된 오류 봉투입니다. `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`)로 보호되는 `/api/v1/` 하의 관리 경로는 이 자격 증명 거부 예외를 사용하지 않습니다. `REQUIRE_API_KEY=false` 사용하면 해당 401/403 응답은 구성된 CORS 원본 정책을 따릅니다.
- **쿠키 세션(대시보드):** 장애 시 기본값으로 보호됨 **그리고** 공유 경로에 `Access-Control-Allow-Credentials` 가 없기 때문입니다. 모든 허용 구성에서 management/dashboard 원본을 유지하세요. 정확히 장애가 발생하지 않은 상태로 유지되어야 합니다.

## WebSocket 핸드셰이크(`/v1/responses`, `/v1/ws`)

브라우저는 CORS WebSocket 에 적용하지 않으므로 추론 출력을 반환하는 WebSocket 전송은 핸드셰이크 `Origin` 자체(`src/server/origin/wsOrigin.ts`), 응답 WebSocket (`/v1/responses`) 및 OmniRoute `npm start` / `npm run dev` 통해 실행될 때 `/v1/chat/completions`, `/v1/messages` 및 `/v1/responses` 프레임으로 스트리밍하는 `/v1/ws` 및 `/api/v1/ws` 브리지를 확인합니다. 브리지는 `/api/v1/ws?handshake=1` 에게 판정을 요청하고 해당 경로가 검사를 실행하지 않는 한 업그레이드를 거부합니다. 인증 요구 사항은 여전히 별도로 적용됩니다. 다음과 같은 경우 원산지 확인이 통과됩니다.

- `Origin` 헤더가 없습니다(Codex CLI, SDKs 및 기타 비 브라우저 클라이언트).
- `Origin` 위의 허용 목록(`CORS_ALLOWED_ORIGINS`, `corsOrigins` 설정, `CORS_ORIGIN`, `CORS_ALLOW_ALL`)에 의해 허용됩니다.
- `Origin` 는 OmniRoute 의 자체 공개 원본(구성된 공개 기반 URL, 신뢰할 수 있는 프록시의 전달 원본, IP 리터럴 또는 `localhost` — 대시보드 돌연변이 검사에서 사용하는 것과 동일한 후보로 지정된 직접 loopback/LAN 호스트) 중 하나입니다. 또는
- HTTP `/v1/*` 표면과 마찬가지로 유효한 API 키를 전달합니다.

다른 것들은 `403 ws_origin_forbidden` 얻습니다. 대시보드 세션 쿠키는 브라우저가 외부 `Origin` 페이지 소켓에 연결하기 때문에 제외하지 않습니다. 다른 포트의 `localhost` 동일 출처로 취급되지 않습니다. 그러한 개발 출처를 `CORS_ALLOWED_ORIGINS` 에 추가하십시오.

## 예: OmniRoute 앞의 역방향 프록시

CORS 는 OmniRoute 자체에 의해 시행되므로 일반적으로 프록시는** ~ 아니다** `Access-Control-*` 헤더를 추가하거나 다시 작성합니다(이중 헤더로 인해 브라우저가 중단됨). TLS 종료하고 — 전달하여 OmniRoute 비행 전 응답하도록 합니다.

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

프록시가 아닌 OmniRoute (`CORS_ALLOWED_ORIGINS` 또는 보안 탭)에서 허용되는 브라우저 원본을 설정합니다.

## 소스 파일

| 우려                                  | 파일                                                                 |
| ------------------------------------- | -------------------------------------------------------------------- |
| 허용 목록 해결 + `getCorsStatus()`    | `src/server/cors/origins.ts`                                         |
| 미들웨어 애플리케이션(단일 정보 소스) | `src/server/authz/pipeline.ts`                                       |
| 설정 → 런타임 오리진 주입             | `src/lib/config/runtimeSettings.ts`                                  |
| 대시보드의 런타임 상태                | `src/app/api/settings/authz-inventory/route.ts`                      |
| 대시보드 경고 배너                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS 허용 출처 필드                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| 경로별 Cloud-Agent CORS (예외)        | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket 핸드셰이크 `Origin` 확인    | `src/server/origin/wsOrigin.ts`                                      |

## 또한보십시오

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) 생성 가능 경로에 대한 — 루프백 시행(별도의 보완 제어)
- [인증 가이드](../architecture/AUTHZ_GUIDE.md) — 전체 인증 파이프라인.
