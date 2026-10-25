# Authorization Guide (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Джерело істини:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Останнє оновлення:** 22.09.2026 — простори імен області вказують на MCP-SERVER.md

OmniRoute має конвеєр авторизації, що враховує маршрути та захищає кожен запит API. Класифікація є **детермінованою** та **закривається при збої** — все, що не може бути класифіковано, стає `MANAGEMENT` і вимагає сесії або токена рівня управління. Ця сторінка пояснює модель для інженерів, які підтримують маршрути або розробляють нові кінцеві точки.

![Конвеєр AuthZ (3 класи маршрутів + оцінка політики)](../diagrams/exported/authz-pipeline.svg)

> Джерело: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режими автентифікації

### 1. Ключ API (Bearer)

Використовується для клієнтських API, сумісних з OpenAI/Anthropic/Gemini, та для деяких маршрутів керування, коли ключ має область доступу `manage`.

```
Authorization: Bearer <api-key>
```

Перевіряється функціями `isValidApiKey()` / `extractApiKey()` у `src/sse/services/auth.ts` і реекспортується через `src/shared/utils/apiAuth.ts`. Валідатор також приймає змінні середовища `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` як постійні наскрізні ключі (issue #1350).

### 2. Сеанс панелі керування (cookie auth_token)

Для сторінок панелі керування та адміністративних операцій.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie є сеансом лише тоді, коли JWT перевіряється **і** містить `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Кожен
споживач cookie (захист маршрутів панелі (`isDashboardSessionAuthenticated()`), оновлення в конвеєрі authz, рукостискання WebSocket, live
server, `/api/settings/require-login`, `/api/auth/status`) проходить через цей помічник.
Існують і інші JWT, підписані `JWT_SECRET`: наскрізний проброс Cursor CLI видає
токени `iss "omniroute" / aud "cursor-cli"` для власників ключів, і вони ніколи не є сеансами
(#13298).

Перевіряється функцією `isDashboardSessionAuthenticated()` у `src/shared/utils/apiAuth.ts`. Конвеєр автоматично оновлює JWT, коли до завершення його 30-денного строку дії залишається менше 7 днів.

Сеанс може завершитися й раніше 30 днів, оскільки кожен емітент проходить через `mintDashboardSessionToken` (час видачі `iat` та ідентифікатор `jti`), а верифікатор перевіряє два параметри: `sessionsValidAfter`, який задається під час зміни пароля, тож усі сеанси, видані до неї, перестають проходити перевірку (браузер, що змінив пароль, отримує новий cookie), і `revokedDashboardSessions`, до якого `POST /api/auth/logout` додає `jti` завершеного сеансу. Сеанси, випущені старішим релізом, не містять жодного з цих полів і лишаються дійсними до першої зміни пароля. Якщо налаштування неможливо прочитати, сеанс не вважається довіреним.

Деякі маршрути керування приймають **будь-який** із двох режимів: cookie АБО `Bearer <key>`, якщо ключ API має область доступу `manage` (або `admin`). Саме це забезпечує сценарій «налаштування через виклики API», доданий у v3.8.

#### Необов'язковий шлюз входу OIDC (#6973)

Вхід адміністратора до панелі також підтримує **необов'язковий** потік OIDC (OpenID Connect)
поряд зі стандартним входом за паролем. Вхід за паролем ніколи не видаляється, а лише доповнюється:

- Вимкнено, якщо не задано `settings.oidcEnabled === true` **і** не заповнено всі параметри `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` (Налаштування → Auth). `GET /api/auth/oidc/login` повертає `400` в інших випадках.
- `GET /api/auth/oidc/login` отримує `authorization_endpoint` з `/.well-known/openid-configuration` емітента
  (якщо його немає, використовується `<issuer>/authorize`), формує redirect URI за вхідним запитом
  (з урахуванням `x-forwarded-proto`) і перенаправляє до IdP з випадковим `state`, збереженим у cookie `oidc_state`
  з прапорцем `httpOnly`.
- `GET /api/auth/oidc/callback` перевіряє `state`, обмінює код авторизації та перевіряє підпис ID-токена
  через JWKS емітента (`jose`'s `createRemoteJWKSet`, кешується для кожного URI JWKS) з перевірками `issuer`
  та `audience`. Список `oidcAllowedSubjects` є обов'язковим: він зіставляється з claim `sub` токена або з claim
  `email`. Claim email враховується лише при `email_verified === true`, тож неперевірена електронна пошта в IdP
  ніколи не пройде шлюз. За порожнього списку callback відхиляє будь-який вхід (`not_configured`).
- Після успіху видається **той самий** 30-денний JWT `auth_token`, що й при вході за паролем
  (`src/app/api/auth/login/route.ts`), тож решта конвеєра сеансу панелі (автооновлення, прапорці cookie)
  не змінюється. OIDC замінює лише спосіб видачі cookie, але не те, що він надає.
- Кожен параметр `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`,
  `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) входить до
  `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  відповідає `400 PASSWORD_REQUIRED`, якщо в тілі запиту немає пароля керування в полі `currentPassword`
  (за неправильного пароля відповідь `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` забороняє вхід за паролем
  (`POST /api/auth/login`), але зберігає хеш пароля, а повторна автентифікація все одно перевіряє
  `currentPassword` проти нього.
- `corsOrigins` та `bruteForceProtection` теж входять до `SECURITY_IMPACTING_SETTINGS_KEYS`: послаблення будь-якого
  з них знижує захист входу, тому для них потрібна та сама повторна автентифікація через `currentPassword`
  (вкладка Security її запитує), а при імпорті JSON ці ключі відкидаються.
- Кожен ключ політики безпеки (записи `SECURITY_IMPACTING_SETTINGS_KEYS`, усі ключі `oidc*` та стан
  сеансу панелі) доступний **лише оператору** в `PATCH /api/settings`. Ключ API з областю `manage` або
  токен доступу `oma_` отримують `403`, навіть якщо надіслали правильний `currentPassword`. Відмова фіксується
  в аудиті як `settings.update_failed` з `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` у
  `src/lib/api/operatorCredential.ts`). Звичайні налаштування (тема, параметри відображення) лишаються доступними
  для запису ключу `manage` або токену доступу `admin`. Будь-яка зміна самого `/api/settings` (і
  `/api/settings/require-login`) також вимагає області доступу токена `admin` (`ADMIN_MUTATION_EXACT_PATHS`
  у `src/server/authz/accessScopes.ts`, точний збіг шляху). `GET` лишається з `read`, а решта підмаршрутів
  `/api/settings/*` (проксі, параметри комбо, псевдоніми моделей, стиснення, очищення…) зберігають
  область `write`, що виводиться з методу.
- `POST /api/settings/import-json` пропускає цю повторну автентифікацію, тож перед записом він відкидає
  усі ключі з `IMPORT_STRIPPED_SETTINGS_KEYS` (той самий файл): пароль і `currentPassword`, кожен запис
  `SECURITY_IMPACTING_SETTINGS_KEYS` та стан сеансу панелі (`sessionsValidAfter`,
  `revokedDashboardSessions`). Тому імпорт старішої резервної копії не може воскресити сеанс,
  який уже завершили зміна пароля або вихід із системи.

## Класи маршрутів

`src/server/authz/types.ts` визначає три класи. Будь-який маршрут, який неможливо детерміновано класифікувати, за замовчуванням відноситься до `MANAGEMENT`.

| Клас         | Опис                                                                                                                                                               | Потрібна автентифікація                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `PUBLIC`     | Явно безпечні маршрути: вхід, вихід, статус, ініціалізація, перевірка стану, початкове налаштування під час онбордингу.                                            | Не потрібна                                                            |
| `CLIENT_API` | Ендпоінти обслуговування моделей: `/api/v1/*`, `/api/v1beta/*`, а також псевдоніми `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ключ Bearer, коли увімкнено чинний прапорець функції `REQUIRE_API_KEY` |
| `MANAGEMENT` | Сторінки панелі керування, налаштування, провайдери, ключі, ендпоінти адміністрування та діагностики.                                                              | Сеанс панелі АБО Bearer з областю `manage`                             |

Деякі дії `MANAGEMENT` доступні **лише оператору**: ключа з областю `manage` для них недостатньо.
Експорт збережених облікових даних (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), відновлення резервної копії поверх поточних даних
(`POST /api/db-backups/import`, включно з `dryRun=true`, `POST /api/db-backups` з відновленням за id,
`POST /api/settings/import-json`), а також видалення точок відновлення (очищення через `DELETE /api/db-backups`
і `PATCH /api/db-backups`, оскільки збережене цим методом сховище керує автоматичним очищенням
після кожного резервного копіювання) вимагають сеансу панелі, локального суб'єкта CLI або вимкненого входу.
Видача токена синхронізації (`POST /api/sync/tokens`) і створення CLI-токена доступу з областю `admin`
(`POST /api/cli/tokens`) вимагають сеансу панелі або локального суб'єкта CLI в усіх режимах входу.
Ключі API будь-якої області та токени доступу `oma_` не є операторськими обліковими даними: якщо потрібні
права оператора, вони отримують `403`. Перевірка виконується в `src/lib/api/operatorCredential.ts`
(`resolveOperatorCredential()` / `requireOperatorCredential()`). Зміна налаштувань входу також доступна
лише оператору: `POST /api/settings/require-login` (задати пароль керування або перемкнути `requireLogin`)
приймає лише ці облікові дані, коли пароль уже існує. Вікно початкового налаштування (пароля ще немає)
не змінюється. Сеанс панелі для заміни пароля має передати `currentPassword` (`403`, якщо його немає
або він невірний; фіксується в аудиті як `settings.update_failed`). Локальний CLI та екземпляр з вимкненим
входом зберігають шлях відновлення і можуть задати пароль без нього, оскільки обидва прив'язані до хоста,
якому належить каталог даних.

## Конвеєр

```
Вхідний запит → src/proxy.ts
  → runAuthzPipeline() у src/server/authz/pipeline.ts
    1. Видалити довірені внутрішні заголовки (x-omniroute-auth-*, x-omniroute-route-class)
    2. Згенерувати ідентифікатор запиту, класифікувати маршрут через classifyRoute()
    3. Якщо pathname == "/" → переспрямувати на /dashboard
    4. Якщо триває завершення роботи (коректне завершення) і /api/* → 503
    5. Якщо не-GET /api/* → перевірка checkBodySize()
    6. Якщо OPTIONS → попередній CORS-запит 204
    7. Якщо options.enforce == false → пропустити із заголовками класу маршруту
    8. Інакше: POLICIES[routeClass].evaluate(ctx)
       - дозволено  → установити x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - відхилено → помилка JSON із correlation_id (сторінки панелі керування → 302 /login)
```

Довірені внутрішні заголовки (визначені в `src/server/authz/headers.ts`) **видаляються з вхідних запитів** перед класифікацією — клієнти не можуть заздалегідь додати `x-omniroute-auth-*`, щоб видати себе за суб’єкта.

### Контракти політик

Кожен клас маршруту має політику в `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — завжди повертає `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — отримує Bearer-токен і перевіряє його через `validateApiKey()`. Перехід до анонімного доступу відбувається лише тоді, коли ефективний прапорець функції `REQUIRE_API_KEY` вимкнено. Ефективне значення прапорця визначається через `isRequireApiKeyEnabled()` (`перевизначення прапорця функції в БД > process.env.REQUIRE_API_KEY > значення за замовчуванням`), тому прапорці функцій у панелі керування та змінні середовища узгоджено керують `/api/v1/*`, `/api/v1beta/*` і псевдонімами; у разі помилок засобу визначення доступ забороняється. Дозволяє запити із сесією панелі керування до клієнтських API-маршрутів (зокрема `/api/v1/models`, який використовується каталогом моделей панелі керування).
- **`managementPolicy`** (`policies/management.ts`) — приймає сесію панелі керування, внутрішні запити синхронізації моделей (зіставлені з `/api/providers/[name]/(sync-models|models)`) або повністю пропускає перевірку, якщо `isAuthRequired()` повертає false. Повертає 403 (`AUTH_001`), коли Bearer-токен наявний, але недійсний, інакше — 401. Також застосовує рівні захисту маршрутів (LOCAL_ONLY / ALWAYS_PROTECTED) перед будь-якою гілкою автентифікації — див. [Рівні захисту маршрутів](../security/ROUTE_GUARD_TIERS.md). Шляхи LOCAL_ONLY у `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (наразі: `/api/mcp/`) можуть бути доступними не з loopback-адреси, якщо Bearer-ключ має сферу доступу `manage`; усі інші шляхи LOCAL_ONLY залишаються суворо доступними лише через loopback незалежно від сфери доступу.

Успішна політика повертає `AuthSubject` із `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Наступні обробники можуть зчитати його через `assertAuth(request, "CLIENT_API")` у `src/server/authz/assertAuth.ts` замість повторного виконання логіки автентифікації.

## Список публічних маршрутів

`src/shared/constants/publicApiRoutes.ts` є явним списком дозволених маршрутів:

Список розділено за **формою**, і цей поділ є критично важливим (GHSA-74g9-q8f6-793h): префікс зіставляється за допомогою `startsWith()`, тому він також відповідає кожному суміжному шляху, що має такі самі початкові символи.
Як префікс, `/api/usage/om-usage` робив `/api/usage/om-usage<anything>` ПУБЛІЧНИМ, а Next зіставляє це з `/api/usage/[connectionId]` — обробником без власної автентифікації.

```ts
// Справжні піддерева. Кожен запис МАЄ закінчуватися на "/" (це перевіряється модульним тестом).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // класифікується як CLIENT_API у classify, а не як публічний маршрут "без автентифікації"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Окремі маршрути, що зіставляються ТОЧНО (з кінцевою скісною рискою або без неї).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Окремі маршрути лише для читання, до яких також застосовується послаблення обмежень CORS для джерела.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Окремий маршрут лише для читання БЕЗ послаблення обмежень CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Маршрути лише для читання є публічними **тільки** для безпечних методів. Примітка: `classifyRoute()` виключає `/api/v1/*` і `/api/v1beta/*` із резервної класифікації PUBLIC — вони завжди мають тип `CLIENT_API`, тому політика ключів Bearer усе одно застосовується.

## Додавання нового маршруту

### Шаблон 1 — Публічна кінцева точка клієнтського API (Bearer-автентифікація)

Маршрути в `/api/v1/` і `/api/v1beta/` автоматично класифікуються як `CLIENT_API`. Проміжне ПЗ забезпечує перевірку Bearer; обробникам маршрутів не потрібно виконувати її повторно, але за потреби вони можуть отримати суб’єкт.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логіка обробника
}
```

### Шаблон 2 — Кінцева точка керування (сеанс або Bearer + manage)

Використовуйте `requireManagementAuth()` із `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логіка обробника
}
```

У разі успіху `requireManagementAuth()` повертає `null`, а в разі помилки — JSON-відповідь `Response`:

- 401 `AUTH_001` "Потрібна автентифікація" — облікові дані повністю відсутні
- 403 — недійсний Bearer **або** Bearer надано, але ключ не має області дії `manage` / `admin`

`hasManageScope(scopes)` повертає true для `"manage"` або `"admin"`.

### Шаблон 3 — Додавання до публічного списку дозволених маршрутів

Вибирайте набір за формою, а не за зручністю. Один маршрут слід додавати до `PUBLIC_API_ROUTES_EXACT` (або до `PUBLIC_READONLY_CORS_API_ROUTES`, якщо він призначений лише для GET); лише справжнє піддерево слід додавати до `PUBLIC_API_ROUTE_PREFIXES`, і воно **має закінчуватися на `/`**. Додавання окремого маршруту до списку префіксів також робить публічним кожен суміжний шлях, що має такі самі початкові символи, — включно зі спорідненими маршрутами з динамічними сегментами, доданими пізніше (GHSA-74g9-q8f6-793h). Оновіть модульні тести в `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` і `tests/unit/authz/classify.test.ts`.

## Області видимості (Scopes)

Три простори імен. Кожен перевіряльник читає лише власні рядки. Порівняння,
включно з тим, чому `manage` не проходить `scopeMatches` для `read:compression` і чому
токен доступу `read` не може `PATCH /api/keys/{id}`, знаходиться в
[Три простори імен областей видимості](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Ключі API містять масив `scopes` (зберігається як JSON у `api_keys.scopes`, див. `src/lib/db/apiKeys.ts`).

### Область видимості управління

- `manage` / `admin` — `hasManageScope`. Доступ Bearer до маршрутів API управління.
- `mcp:connect`, `self:usage`, `self:account-quota` та
  `policy:bypass-provider-quota` є адитивними областями видимості з точним збігом. Вони знаходяться
  поза `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` відкриває лише
  не-зворотний виріз `/api/mcp/`.

### Області видимості інструментів MCP

Каталог та правила відповідності (ідентичний рядок або надана область видимості, що закінчується на `*`):
[Області видимості інструментів MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` у `src/shared/constants/mcpScopes.ts` є оригінальною типізованою
підмножиною, а не повним каталогом. Примусове виконання відбувається в
`open-sse/mcp-server/scopeEnforcement.ts` після того, як `resolveCallerScopeContext()`
розв'язує області видимості з інформації про автентифікацію MCP, метаданих запиту або `OMNIROUTE_MCP_SCOPES`.
Воно залишається вимкненим, якщо `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Області видимості токенів доступу

`read` / `write` / `admin` на токенах `oma_live_…`, ранжовані за `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Цей ранг застосовується лише до облікових даних токена доступу.
Див. [Автентифікація управління](../guides/MANAGEMENT-AUTH.md).

## Перемикач обов'язкової автентифікації

`isAuthRequired()` у `src/shared/utils/apiAuth.ts` визначає, чи застосовується **будь-яка** автентифікація до запиту:

- `settings.requireLogin === false` → автентифікація вимкнена глобально, окрім завжди захищеного рівня
  (див. [Рівні захисту маршрутів](../security/ROUTE_GUARD_TIERS.md)) та викликів, які видають облікові дані,
  що їх приймає система. Для них потрібні ті самі облікові дані, що й за увімкненого входу: видача токенів
  синхронізації, видача CLI-токенів доступу з будь-якою областю, а також створення ключа API з областю
  `manage`/`admin`, надання такої області ключу, перевипуск або показ такого ключа
  (`requireCredentialForManagementScopedKey()` у `src/lib/api/requireManagementAuth.ts`). Ключі лише
  для інференсу лишаються відкритими.
- Пароль не задано **і** немає змінної середовища `INITIAL_PASSWORD` → режим початкового налаштування дозволяє
  майстер онбордингу та запити з loopback, але запити із зовнішньої мережі, як і раніше, потребують облікових даних.
- Будь-яка помилка БД → відмова (безпечне за замовчуванням поводження, fail closed).

Перевірка клієнтських ключів API використовує `isRequireApiKeyEnabled()` у `src/shared/utils/featureFlags.ts`,
а не пряме читання `process.env.REQUIRE_API_KEY`. Це важливо для розгорнутих екземплярів: перемикання
`REQUIRE_API_KEY` у Dashboard → Feature Flags зберігає перевизначення в БД і одразу впливає на `/v1/*`,
`/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` та інші перевірки клієнтського API,
які використовують цей помічник. Якщо сховище прапорців функцій не читається, автентифікація клієнтського API
відмовляє і вимагає ключ.

## Несумісна зміна — v3.8.0

Кінцеві точки `/api/v1/agents/tasks/*` і `/api/resilience/model-cooldowns` **тепер вимагають автентифікації для керування** (коміт `588a0333`). Клієнти, які раніше надсилали звичайний ключ API без області `manage`, отримують `403`. Міграція: або надайте ключу область `manage` на панелі API Keys, або скористайтеся сеансом із виконаним входом на панель керування.

## Зміна поведінки — v3.8.2

`/api/mcp/*` (віддалений сервер MCP) за замовчуванням усе ще має режим LOCAL_ONLY, але тепер приймає запити не зі зворотного інтерфейсу, якщо заголовок `Authorization: Bearer <api-key>` містить область `manage`. Цей виняток явно контролюється для кожного шляху через `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` у `src/server/authz/routeGuard.ts`; обхід для спорідненого префікса LOCAL_ONLY `/api/cli-tools/runtime/*` навмисно неможливий, оскільки він може запускати довільні підпроцеси. Анонімні запити до `/api/mcp/*` не зі зворотного інтерфейсу й надалі отримують `403 LOCAL_ONLY` — за замовчуванням будь-який новий шлях LOCAL_ONLY залишається суворо обмеженим зворотним інтерфейсом. Див. [Рівні захисту маршрутів](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Тестування

- Модульні тести: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Список дозволених загальнодоступних маршрутів: `tests/unit/public-api-routes.test.ts`.
- Запуск окремого тесту: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Налагодження

Конвеєр завжди додає до відповідей такі заголовки:

```
x-request-id:               <ідентифікатор кореляції, дублюється в тілах помилок>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Для автентифікованих запитів заголовки запиту до висхідного сервера (на стороні обробника) також містять:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<останні-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (необов’язково)
x-omniroute-auth-scopes:    список, розділений комами
```

Використовуйте `assertAuth(req, expectedClass)` усередині обробників — ця функція викидає виняток `AuthzAssertionError` із кодом `AUTHZ_NOT_INITIALIZED`, якщо проміжне програмне забезпечення було обійдено (це допомагає виявляти регресії конфігурації в тестах).

## Дивіться також

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — маркер автентифікації для кожної кінцевої точки
- [COMPLIANCE.md](../security/COMPLIANCE.md) — журнал аудиту для подій автентифікації
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — три простори імен області видимості та каталог MCP tool-scope
- Джерело: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
