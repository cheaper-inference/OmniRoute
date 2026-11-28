# Progressive Web App (PWA) Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

OmniRoute 대시보드를 프로그레시브 웹 앱으로 설치하여 홈 화면이나 데스크탑에서 독립형 창으로 열 수 있습니다. 설치된 앱은 탐색, 대시보드 데이터 및 API 요청을 위해 OmniRoute 서버에 대한 연결이 필요합니다. 캐시된 정적 자산은 오프라인 게이트웨이 또는 오프라인 대시보드를 제공하지 않습니다.

## PWA 란 무엇입니까?

프로그레시브 웹 앱은 앱 아이콘과 별도의 창이 있는 웹 대시보드를 사용합니다. 일단 설치되면 OmniRoute:

- 홈 화면이나 데스크탑에서 실행됩니다.
- 브라우저의 일반적인 주소 표시줄 및 탭 없이 독립형 모드로 열립니다.
- 선택한 정적 자산을 캐시합니다.
- 세로 및 가로 방향 지원

## 설치

다른 장치의 서버에 HTTPS 주소를 사용하십시오. 서버가 동일한 장치에서 실행되는 경우 `http://localhost:20128` 브라우저 설치 요구 사항도 충족합니다. 일반 `http://YOUR_IP:20128` 주소는 이러한 요구 사항을 충족하지 않습니다. 설치 메뉴와 프롬프트는 브라우저와 운영 체제에 따라 다릅니다. [MDN 의 PWA 설치 요구 사항을](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required) 참조하세요.

### 안드로이드(크롬)

1. OmniRoute HTTPS 주소를 열거나 동일한 전화에 있는 서버의 경우 `http://localhost:20128` 엽니다.
2. 열기**⋮** 메뉴를 선택하고** 앱 설치** 또는** 홈 화면에 추가** , 제공되는 경우.
3. 프롬프트를 확인하세요.
4. 홈 화면에서 OmniRoute 엽니다.

### iOS (사파리)

1. Safari에서 OmniRoute HTTPS 주소를 엽니다.
2. 수도꼭지** 공유하다** →** 홈 화면에 추가** .
3. 이름을 확인하고 탭하세요.** 추가하다** .
4. 홈 화면에서 OmniRoute 엽니다.

### 데스크톱(크롬/엣지)

1. OmniRoute 대시보드를 엽니다.
2. 브라우저의 설치 아이콘 또는** 앱 설치** 메뉴 항목(제공되는 경우)
3. 자체 창에서 OmniRoute 열라는 메시지를 확인합니다.

## 특징

### 독립형 창

매니페스트는 `display: "standalone"` 및 `start_url: "/dashboard"` 설정합니다. 설치된 앱은 앱 창에서 대시보드를 엽니다. 브라우저 및 운영 체제 컨트롤은 계속 나타날 수 있습니다. 매니페스트는 전체 화면 모드를 요청하지 않습니다.

### 캐시된 자산 및 네트워크 요구 사항

[서비스 워커는](../../public/sw.js) 선택된 동일 출처 리소스를 캐시합니다.

| 요청 또는 자산                    | 전략          | 행동                                                                                                  |
| --------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| 설치 시간 리소스                  | 사전 캐시     | `/`, `/manifest.webmanifest`, `/icon-512.png` 및 `/apple-touch-icon.png` 작업자 설치 중에 캐시됩니다. |
| Next.js 정적 자산(`/_next/`)      | 네트워크 우선 | 성공적인 응답은 캐시를 업데이트합니다. 네트워크 오류는 기존 캐시된 응답으로 대체됩니다.               |
| 기타 정적 CSS, JS, 이미지 및 글꼴 | 캐시 우선     | 기존에 캐시된 응답이 재사용됩니다. 성공적인 네트워크 응답은 실패 시 캐시됩니다.                       |
| 페이지 탐색                       | 우회로        | 브라우저는 페이지를 직접 가져옵니다. 오프라인 대체가 제공되지 않습니다.                               |
| API, 대시보드 및 인증 경로        | 우회로        | 작업자는 이러한 요청을 가로채거나 캐시하지 않습니다.                                                  |
| 기타 비정적 요청                  | 회로망        | 캐시 조회 또는 저장 없음                                                                              |

제외되는 경로는 `/api`, `/a2a`, `/dashboard`, `/v1`, `/v1beta`, `/models`, `/chat`, `/responses`, `/codex`, `/callback` 및 `/login` 이며 경로 경계에서 대소문자를 구분하지 않습니다. 교차 출처 및 비GET 요청도 작업자를 우회합니다.

### 연결 페이지

`/offline` 페이지는 연결 메시지, online/offline 표시기,** 연결 재시도** 버튼과 상태 페이지 링크가 있습니다. 그것은** 사전 캐시되지 않음** 그리고 서비스 워커는** ~ 아니다** 실패한 탐색을 해당 위치로 리디렉션합니다. 서버가 없어도 새 페이지에 액세스할 수는 없습니다.

### 앱 아이콘

매니페스트는 다음 PNG 아이콘을 광고합니다.

| 파일                   | 크기    | 사용                            |
| ---------------------- | ------- | ------------------------------- |
| `icon-192.png`         | 192×192 | 일반 앱 아이콘                  |
| `icon-512.png`         | 512×512 | 일반 및 마스크 가능한 앱 아이콘 |
| `apple-touch-icon.png` | 180×180 | Apple 홈 화면 아이콘            |

브라우저는 설치 대상에 적합한 아이콘을 선택합니다.

### 자동등록

`PwaRegister` 브라우저가 서비스 워커를 지원할 때 프로덕션에 작업자를 등록합니다. 개발 모드에서는 핫 리로드를 방해하는 오래된 자산을 방지하기 위해 작업자 등록을 취소하고 캐시를 지웁니다. 설치 프롬프트는 브라우저 결정으로 유지됩니다.

## 기술 아키텍처

### 웹 앱 매니페스트

Next.js [`src/app/manifest.ts`](../../src/app/manifest.ts) 에서 `/manifest.webmanifest` 생성합니다. 주요 설정은 다음과 같습니다.

| 환경              | 값                                     |
| ----------------- | -------------------------------------- |
| `short_name`      | `OmniRoute`                            |
| `start_url`       | `/dashboard`                           |
| `scope`           | `/`                                    |
| `display`         | `standalone`                           |
| `orientation`     | `any`                                  |
| 배경 및 테마 색상 | `PWA_THEME_COLORS` 의 기본 조명 팔레트 |

매니페스트의 이름과 설명은 해당 소스 파일의 정적 값입니다. 설치된 매니페스트는 방문할 때마다 인스턴스 이름 설정이나 활성 팔레트를 따르지 않습니다.

### 서비스 워커

[`public/sw.js`](../../public/sw.js) 에는 서비스 워커 프레임워크 종속성이 없습니다.

- **설치하다:** 위에 나열된 네 가지 리소스를 사전 캐시하고 새 작업자를 활성화합니다.
- **활성화:** 이전 캐시 세대를 제거하고 클라이언트를 요청합니다.
- **술책:** 위의 정적 자산 전략 및 경로 제외를 적용합니다.
- **버전 관리:** 소스 캐시 이름은 `omniroute-pwa-v3` 입니다. 프로덕션 빌드는 캐시 ID를 스탬프 처리합니다.
- **알림:** 들어오는 `push` 이벤트를 처리하고 알림을 클릭하면 창에 초점을 맞추거나 엽니다.

푸시 이벤트 핸들러만으로는 활성 푸시 구독이나 구성된 서버 전달을 설정하지 않습니다. 단지 PWA 설치되었기 때문에 알림이 활성화된다고 가정하지 마십시오.

### 레이아웃 메타데이터 및 등록

[`src/app/layout.tsx`](../../src/app/layout.tsx) 매니페스트 링크, Apple 독립형 메타데이터, 테마 색상 및 `viewport-fit: cover` 제공합니다. 페이지 제목과 Apple 웹 앱 제목은 인스턴스 이름을 사용합니다. 라이브 브라우저 테마 색상은 팔레트를 따릅니다. 설치 매니페스트는 기본 밝은 색상을 사용합니다.

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx) 클라이언트에서 실행되며 URL 의 빌드 ID 로 `/sw.js` 등록합니다. 일치하지 않는 캐시 생성을 감지하고 작업자를 재설정하고 한 번 다시 로드하여 이전 설치에서 복구할 수 있습니다. 등록 실패는 대시보드를 차단하지 않습니다.

## Termux와 함께 사용(Android)

1. Termux에서 OmniRoute 시작합니다: `npx -y omniroute@latest`.
2. 동일한 휴대전화 `http://localhost:20128` 에서 Chrome을 엽니다.
3. 브라우저의 설치 메뉴를 통해 PWA 설치합니다.
4. 대시보드를 사용하는 동안 Termux 서버를 계속 실행하세요.

전화기는 게이트웨이와 대시보드를 모두 호스팅합니다. 원격 AI 공급자에 대한 요청에는 여전히 네트워크 액세스가 필요합니다. 설정 및 Android 프로세스 수명 고려 사항은 [Termux 가이드를](TERMUX_GUIDE.md) 참조하세요.

## 다른 장치에서 사용

휴대폰, 태블릿 또는 데스크톱에서 서버의 HTTPS 주소를 연 다음 해당 브라우저의 설치 흐름을 따르세요. 각 장치에서 서버에 계속 연결할 수 있어야 합니다. 원격 액세스 옵션은 [터널 가이드를](../ops/TUNNELS_GUIDE.md) 참조하세요.

## 맞춤화

### 인스턴스 이름

그만큼** 인스턴스 이름** 설정에 따라 페이지 제목 및 Apple 웹 앱 제목을 포함한 대시보드 메타데이터가 변경됩니다. 생성된 매니페스트는 정적 이름을 사용하므로 이 설정은 이미 설치된 앱의 이름이 바뀌는 것을 보장하지 않습니다.

### 맞춤 파비콘

사용자 정의 파비콘은 브라우저 파비콘을 변경합니다. 설치 매니페스트는 여전히 위의 PNG 파일을 광고합니다. 파비콘을 변경해도 해당 홈 화면 아이콘은 대체되지 않습니다.

## 제한사항

- **서버 연결이 필요합니다:** 페이지 탐색, 대시보드 상태 및 API 요청에는 오프라인 대체 기능이 없습니다.
- **백그라운드 동기화 없음:** 오프라인 작업은 재생 대기열에 추가되지 않습니다.
- **브라우저 차이점:** 설치 메뉴, 창 표시 및 알림 지원은 플랫폼에 따라 다릅니다.
- **API 응답 캐시가 없습니다:** 작업자는 API, 대시보드 및 인증 경로를 제외합니다.
- **정적 설치 아이콘:** 해당 아이콘을 업데이트하려면 광고된 자산을 변경해야 합니다. 브라우저는 설치된 메타데이터를 유지할 수 있습니다.

## 파일 참조

| 파일                                                                                   | 목적                                  |
| -------------------------------------------------------------------------------------- | ------------------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | 생성된 웹 앱 매니페스트               |
| [public/sw.js](../../public/sw.js)                                                     | 캐싱, 제외 및 알림 이벤트 핸들러      |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | 프로덕션 등록 및 오래된 캐시 복구     |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | 자동 오프라인 대체가 아닌 연결 페이지 |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | 페이지 메타데이터 및 뷰포트 설정      |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | 공유 테마 색상 값                     |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512 앱 아이콘                   |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 애플 아이콘                 |
