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

Використовується для клієнтських API, сумісних з OpenAI/Anthropic/Gemini, а також для деяких маршрутів керування, коли ключ має область `manage`.

```
Authorization: Bearer <api-key>
```

Перевіряється за допомогою `isValidApiKey()` / `extractApiKey()` у `src/sse/services/auth.ts` і повторно експортується через `src/shared/utils/apiAuth.ts`. Валідатор також приймає змінні середовища `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` як постійні ключі наскрізної передачі (issue #1350).

### 2. Сеанс панелі керування (cookie auth_token)

Для сторінок панелі керування та адміністративних операцій.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie є сеансом лише тоді, коли JWT успішно проходить перевірку **і** містить `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Кожен
споживач cookie (захисник маршруту панелі керування (`isDashboardSessionAuthenticated()`), конвеєр оновлення авторизації, рукостискання WebSocket, live-сервер, `/api/settings/require-login`, `/api/auth/status`) використовує цей допоміжний засіб.
Існують й інші JWT, підписані за допомогою `JWT_SECRET` — наскрізна передача Cursor CLI випускає
токени з `iss "omniroute" / aud "cursor-cli"` для власників ключів — і вони ніколи не є сеансами
(#13298).

Перевіряється за допомогою `isDashboardSessionAuthenticated()` у `src/shared/utils/apiAuth.ts`. Конвеєр автоматично оновлює JWT, коли до завершення його 30-денного терміну дії залишається менше ніж 7 днів.

Сеанс також може завершитися до закінчення 30 днів, оскільки кожен засіб випуску проходить через `mintDashboardSessionToken` (мітка часу випуску `iat` та ідентифікатор `jti`), а засіб перевірки перевіряє два параметри: `sessionsValidAfter`, який встановлюється після зміни пароля, щоб кожен сеанс, випущений до цього моменту, перестав проходити перевірку (браузер, у якому було змінено пароль, отримує свіжу cookie), і `revokedDashboardSessions`, до якого `POST /api/auth/logout` додає `jti` сеансу, з якого було виконано вихід. Сеанси, випущені старішою версією, не містять жодної з цих претензій і залишаються дійсними до першої зміни пароля. Якщо параметри неможливо прочитати, сеанс не вважається довіреним.

Деякі маршрути керування приймають **будь-який** режим: cookie АБО `Bearer <key>`, коли ключ API має область `manage` (або `admin`). Саме це забезпечує робочий процес «налаштування через виклики API», доданий у v3.8.

#### Необов’язковий шлюз входу OIDC (#6973)

Вхід адміністратора панелі керування також підтримує **опціональний** потік OIDC (OpenID Connect)
поряд із типовим входом за паролем — вхід за паролем ніколи не видаляється, а лише
доповнюється:

- Вимкнено, якщо `settings.oidcEnabled === true` **не має значення `true`** або не налаштовано всі параметри `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` (Налаштування → Автентифікація).
  В іншому разі `GET /api/auth/oidc/login` повертає `400`.
- `GET /api/auth/oidc/login` визначає `authorization_endpoint` із
  `/.well-known/openid-configuration` видавця (як запасний варіант використовується
  `<issuer>/authorize`), формує URI перенаправлення з вхідного запиту
  (з урахуванням `x-forwarded-proto`) і перенаправляє до IdP із випадковим значенням
  `state`, збереженим у файлі cookie `oidc_state` із прапорцем `httpOnly`.
- `GET /api/auth/oidc/callback` перевіряє `state`, обмінює код авторизації та перевіряє
  підпис ID-токена через JWKS видавця (`createRemoteJWKSet` із `jose`, кешований для
  кожного URI JWKS), а також перевіряє `issuer`/`audience`. Для допуску до панелі
  потрібен непорожній список `oidcAllowedSubjects`, політика `oidcAdmissionClaim`
  або обидва параметри. Список суб’єктів зіставляється з `sub` або `email` лише коли
  `email_verified === true`. Необов’язкова політика claims отримує шлях до claim
  ID-токена, розділений крапками (наприклад, `realm_access.roles`), і масив прийнятних
  значень; отриманий claim має бути масивом рядків, що містить принаймні одне прийнятне
  значення. Якщо налаштовано обидві політики, обидві мають пройти перевірку.
  Відсутні або некоректно сформовані claims відхиляються за замовчуванням, а без жодної
  з цих політик callback відмовляє у вході (`not_configured`). Наявні конфігурації,
  що використовують лише суб’єктів, продовжують працювати без змін.
- Keycloak зазвичай додає ролі realm до токенів доступу, але не обов’язково до
  ID-токенів. Щоб вимагати роль realm `admin`, налаштуйте для цього клієнта mapper
  протоколу, який додає `realm_access.roles` до його **ID-токена**, а потім встановіть
  `oidcAdmissionClaim` у значення `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Перевірте фактичний claim ID-токена для цього клієнта, перш ніж вмикати допуск лише
  за роллю; застосунок не читає ролі з токена доступу. Відмова IdP у видачі токена може
  доповнювати цю перевірку, але не замінює перевірку на рівні застосунку.
- У разі успіху створюється **точно такий самий** 30-денний JWT `auth_token`, який
  видається під час входу за паролем (`src/app/api/auth/login/route.ts`), тому решта
  конвеєра сеансу панелі (автоматичне оновлення, прапорці cookie) не змінюється —
  OIDC лише замінює спосіб створення cookie, а не те, що він надає. Зміни ролей або
  груп на стороні IdP не анулюють наявні сеанси OmniRoute; термін їхньої дії, як і
  раніше, визначають вихід із системи, зміна пароля або завершення терміну сеансу.
- Кожен параметр `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) входить до
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  відповідає `400 PASSWORD_REQUIRED`, якщо тіло запиту не містить пароль керування як
  `currentPassword` (`401 PASSWORD_MISMATCH`, якщо пароль неправильний).
  `oidcDisablePasswordLogin` забороняє вхід за паролем (`POST /api/auth/login`),
  але зберігає хеш пароля, і повторна автентифікація й надалі перевіряє
  `currentPassword` проти нього.
- `corsOrigins` і `bruteForceProtection` також входять до
  `SECURITY_IMPACTING_SETTINGS_KEYS`: послаблення будь-якого з них знижує рівень
  захисту входу, тому для них потрібна така сама повторна автентифікація через
  `currentPassword` (вкладка «Безпека» запитує його), а імпорт JSON їх відкидає.
- Кожен ключ політики безпеки — записи `SECURITY_IMPACTING_SETTINGS_KEYS`,
  кожен ключ `oidc*` і стан сеансу панелі — має статус **лише для оператора** під час
  `PATCH /api/settings`: ключ API з областю `manage` або токен доступу `oma_`
  відхиляється з `403`, навіть якщо разом із ним надіслано правильний
  `currentPassword`, а відмова аудитується як `settings.update_failed` із
  `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` у
  `src/lib/api/operatorCredential.ts`).
  Звичайні налаштування (тема, параметри відображення) залишаються доступними для
  запису ключу `manage` або токену доступу `admin`. Кожна зміна самого
  `/api/settings` (а також `/api/settings/require-login`) додатково потребує області
  токена доступу `admin` (`ADMIN_MUTATION_EXACT_PATHS` у
  `src/server/authz/accessScopes.ts`, зіставлення за точним шляхом); для `GET`
  залишається `read`, а інші підмаршрути `/api/settings/*` (проксі, стандартні
  параметри combo, псевдоніми моделей, стиснення, очищення тощо) зберігають область
  `write`, визначену методом.
- `POST /api/settings/import-json` пропускає цю повторну автентифікацію, тому перед
  записом відкидає кожен ключ із `IMPORT_STRIPPED_SETTINGS_KEYS` (у тому самому файлі):
  пароль і `currentPassword`, кожен запис `SECURITY_IMPACTING_SETTINGS_KEYS`, а також
  стан сеансу панелі (`sessionsValidAfter`, `revokedDashboardSessions`).
  Отже, імпорт старішої резервної копії не може відновити сеанс, який уже завершили
  зміна пароля або вихід із системи.

#### Необов’язковий двофакторний вхід за TOTP (#16619)

Підключається в меню «Налаштування → Безпека»; вимкнено, доки оператор не ввімкне
цю функцію (`src/server/auth/dashboardMfa.ts`).

- **Що охоплює:** вхід за паролем (`POST /api/auth/login`, після якого потрібно
  виконати `POST /api/auth/mfa/verify`) і `omniroute connect` (`POST /api/cli/connect`,
  який відхиляє обмін лише паролем і передає код як `totp`).
- **Що не охоплює:** вхід через OIDC / SSO (`/api/auth/oidc/callback`) не запитує
  TOTP OmniRoute. Він покладається на власний другий фактор постачальника
  ідентифікації, тому в разі ввімкненого OIDC забезпечте MFA в IdP.
- **Відновлення** (втрачений пристрій, відсутні резервні коди або фактор, який більше
  неможливо перевірити, наприклад після зміни `STORAGE_ENCRYPTION_KEY`):
  1. Перезапустіть сервер із `OMNIROUTE_DISABLE_MFA=true`.
  2. На самому хості (одноранговий вузол loopback і `Host` loopback, наприклад
     `http://localhost:20128`) увійдіть за допомогою пароля. Другий фактор буде
     пропущено лише для цього джерела; для всіх інших джерел код усе одно потрібен.
  3. У розділі Налаштування → Безпека → Вимкнути введіть пароль і залиште поле коду
     порожнім. `POST /api/auth/mfa/disable` приймає тіло без `code` лише тоді, коли
     змінну встановлено, а запит надходить із хоста; він також вимагає сесії панелі
     керування та поточного пароля, а подія аудиту записується як
     `auth.mfa.disabled` з `secondFactor: "recovery_switch"`.
  4. Скасуйте встановлення `OMNIROUTE_DISABLE_MFA`, перезапустіть сервер і за потреби
     повторно зареєструйте фактор.

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

## Трубопровід

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Довірені внутрішні заголовки (визначені в `src/server/authz/headers.ts`).** видалено з вхідних запитів** перед класифікацією клієнти — не можуть попередньо заповнити `x-omniroute-auth-*` щоб імітувати суб’єкта.

### Договори страхування

Кожен клас маршрутів має політику в `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — завжди повертає `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — витягує носій, перевіряє через `validateApiKey()`. Переходить до анонімного лише тоді, коли прапор ефективної функції `REQUIRE_API_KEY` вимкнено. Ефективний прапор розв’язується через `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), тому прапорці функцій панелі інструментів і змінні середовища керують `/api/v1/*`, `/api/v1beta/*` та псевдонімами послідовно; збій розв'язувача не закривається. Дозволяє надсилати запити на сеанс панелі керування на маршрутах API клієнта (включаючи `/api/v1/models`, який використовується каталогом моделей панелі). Коли Entra ID SSO увімкнено, носій, який структурно є маркером Entra (три сегменти base64url, `RS*` alg, `kid`), обробляється гілкою SSO** раніше** `validateApiKey()` і його вердикт остаточний — він ніколи не потрапляє до шляху ключа API або гілки переходу до анонімного, тому збій постачальника ідентифікаційної інформації не може стати відкритим доступом. Статичні ключі API не впливають. Див. [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — приймає сеанс інформаційної панелі, внутрішні запити на синхронізацію моделі (співставляються з `/api/providers/[name]/(sync-models|models)`) або повністю пропускає, якщо `isAuthRequired()` повертає false. Повертає 403 (`AUTH_001`), якщо маркер носія присутній, але недійсний, 401 в іншому випадку. Також забезпечує виконання рівнів охорони маршруту (LOCAL_ONLY / ALWAYS_PROTECTED) перед будь-якою гілкою авторизації — див. [Рівні охорони маршруту](../security/ROUTE_GUARD_TIERS.md). Шляхи LOCAL_ONLY у `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (сьогодні: `/api/mcp/`) можуть бути доступні без зворотного зв’язку, якщо ключ-носій містить область `manage` ; усі інші шляхи LOCAL_ONLY залишаються строгими зацикленими, незалежно від обсягу.

Успішна політика повертає `AuthSubject` з `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Нижчі обробники можуть прочитати його через `assertAuth(request, "CLIENT_API")` у `src/server/authz/assertAuth.ts` замість повторного запуску логіки авторизації.

## Список публічних маршрутів

`src/shared/constants/publicApiRoutes.ts` — це явний список дозволених маршрутів:

Список розділено за **формою**, і цей поділ має критичне значення (GHSA-74g9-q8f6-793h): префікс
зіставляється за допомогою `startsWith()`, тому він також відповідає кожному суміжному шляху, що має такі самі початкові символи.
`/api/usage/om-usage` як префікс позначає `/api/usage/om-usage<anything>` як PUBLIC, а Next зіставляє
це з `/api/usage/[connectionId]` — обробником, який не має власної автентифікації.

```ts
// Справжні піддерева. Кожен елемент MUST закінчуватися на "/" (перевіряється модульним тестом).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // у classify обробляється як CLIENT_API, а не як "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Окремі маршрути, зіставляються EXACTLY (із кінцевим слешем або без нього).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // крок 2 входу для TOTP за бажанням; потребує cookie MFA-pending
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Окремі маршрути лише для читання, для яких також застосовується послаблення щодо джерела CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Окремий маршрут лише для читання БЕЗ послаблення щодо CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Маршрути лише для читання є публічними **лише** для безпечних методів. Примітка: `classifyRoute()` виключає `/api/v1/*` і `/api/v1beta/*` із переходу PUBLIC за замовчуванням — вони завжди мають тип `CLIENT_API`, тому до них застосовується політика ключа Bearer.

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

Конвеєр завжди позначає відповіді такими:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Для автентифікованих запитів заголовки запитів вище (на стороні обробника) також включають:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Використовуйте `assertAuth(req, expectedClass)` всередині обробників — він викидає `AuthzAssertionError` із кодом `AUTHZ_NOT_INITIALIZED` якщо проміжне програмне забезпечення було обійдено (корисно для виявлення регресій конфігурації в тестах).

## Дивіться також

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — маркер автентифікації для кожної кінцевої точки
- [COMPLIANCE.md](../security/COMPLIANCE.md) — журнал аудиту для подій автентифікації
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — три простори імен області видимості та каталог MCP tool-scope
- Джерело: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
