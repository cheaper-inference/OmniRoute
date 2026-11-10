# Authorization Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Источник истины:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Последнее обновление:** 2026-09-22 — пространства имен областей указывают на MCP-SERVER.md

OmniRoute имеет конвейер авторизации, учитывающий маршруты, который контролирует каждый API-запрос. Классификация **детерминирована** и **закрыта при сбое** — всё, что не может быть классифицировано, попадает в категорию `MANAGEMENT` и требует сессии или токена уровня управления. Эта страница объясняет модель для инженеров, поддерживающих маршруты или проектирующих новые конечные точки.

![Конвейер AuthZ (3 класса маршрутов + оценка политики)](../diagrams/exported/authz-pipeline.svg)

> Источник: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режима аутентификации

### 1. API Key (Bearer)

Используется для клиентских API, совместимых с OpenAI/Anthropic/Gemini, а также для некоторых маршрутов управления, когда ключ имеет область `manage`.

```
Authorization: Bearer <api-key>
```

Проверяется с помощью `isValidApiKey()` / `extractApiKey()` в `src/sse/services/auth.ts` и повторно экспортируется через `src/shared/utils/apiAuth.ts`. Валидатор также принимает переменные окружения `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` в качестве постоянных ключей passthrough (issue #1350).

### 2. Сессия Dashboard (cookie auth_token)

Для страниц Dashboard и административных операций.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Cookie является сессией только в том случае, если JWT проходит проверку **и** содержит `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Каждый
потребитель cookie (защита маршрутов Dashboard (`isDashboardSessionAuthenticated()`), обновление в конвейере авторизации, рукопожатие WebSocket, live-
server, `/api/settings/require-login`, `/api/auth/status`) использует этот вспомогательный метод.
Существуют и другие JWT, подписанные с помощью `JWT_SECRET` — CLI Cursor для passthrough выпускает
токены с `iss "omniroute" / aud "cursor-cli"` для держателей ключей — и они никогда не являются сессиями
(#13298).

Проверяется с помощью `isDashboardSessionAuthenticated()` в `src/shared/utils/apiAuth.ts`. Конвейер автоматически обновляет JWT, когда до истечения его 30-дневного срока действия остаётся менее 7 дней.

Сессия также может завершиться до истечения 30 дней, поскольку каждый выпускающий компонент использует `mintDashboardSessionToken` (с временем выпуска `iat` и идентификатором `jti`), а проверяющий компонент проверяет два параметра: `sessionsValidAfter`, устанавливаемый при смене пароля, из-за чего каждая сессия, выпущенная до этого момента, перестаёт проходить проверку (браузер, в котором был изменён пароль, получает новую cookie), и `revokedDashboardSessions`, куда `POST /api/auth/logout` добавляет `jti` вышедшей из системы сессии. Сессии, выпущенные в более старой версии, не содержат ни одного из этих утверждений и остаются действительными до первой смены пароля. Если параметры невозможно прочитать, сессия не считается доверенной.

Некоторые маршруты управления принимают **любой** из режимов: cookie ИЛИ `Bearer <key>`, если API-ключ имеет область `manage` (или `admin`). Именно это обеспечивает рабочий процесс «настраивается через вызовы API», добавленный в v3.8.

#### Необязательная блокировка входа через OIDC (#6973)

Вход администратора Dashboard также поддерживает **опциональный** поток OIDC (OpenID Connect)
наряду с входом по паролю по умолчанию — вход по паролю никогда не удаляется, а только
дополняется:

- Отключено, если `settings.oidcEnabled === true` **не установлено** или не настроены все параметры `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` (Настройки → Аутентификация).
  В противном случае `GET /api/auth/oidc/login` возвращает `400`.
- `GET /api/auth/oidc/login` получает `authorization_endpoint` из
  `/.well-known/openid-configuration` издателя (в качестве запасного варианта используется
  `<issuer>/authorize`), формирует URI перенаправления на основе входящего запроса
  (с учётом `x-forwarded-proto`) и перенаправляет на IdP со случайным значением `state`,
  сохранённым в cookie `oidc_state` с флагом `httpOnly`.
- `GET /api/auth/oidc/callback` проверяет `state`, обменивает код авторизации и проверяет
  подпись ID-токена через JWKS издателя (`createRemoteJWKSet` из `jose`, с кэшированием для каждого
  URI JWKS), а также проверяет `issuer`/`audience`. Для допуска к панели требуется непустой список
  `oidcAllowedSubjects`, политика `oidcAdmissionClaim` или оба условия. Список субъектов сопоставляется
  с `sub` или `email` только если `email_verified === true`. Необязательная политика claim принимает
  разделённый точками путь к claim ID-токена (например, `realm_access.roles`) и массив допустимых
  значений; разрешённый claim должен быть массивом строк, содержащим хотя бы одно допустимое значение.
  Если настроены обе политики, должны пройти обе. Отсутствующие или некорректно сформированные claims
  приводят к отказу по умолчанию, а без какой-либо из политик callback отклоняет вход (`not_configured`).
  Существующие конфигурации только со списком субъектов продолжают работать без изменений.
- Keycloak обычно помещает роли realm в токены доступа, но не обязательно в ID-токены. Чтобы требовать
  роль realm `admin`, настройте для этого клиента protocol mapper, включающий `realm_access.roles` в
  его **ID-токен**, затем задайте для `oidcAdmissionClaim` значение
  `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Перед включением допуска только по ролям проверьте фактический claim ID-токена для этого клиента;
  приложение не читает роли из токена доступа. Отказ IdP в выдаче токена может дополнять эту проверку,
  но не заменяет проверку на стороне приложения.
- При успешном входе создаётся **точно такой же** 30-дневный JWT `auth_token`, который выдаётся при
  входе по паролю (`src/app/api/auth/login/route.ts`), поэтому остальная часть конвейера сессии панели
  (автоматическое обновление, флаги cookie) не изменяется —
  OIDC заменяет только способ создания cookie, но не предоставляемые ею права. Изменения ролей или
  групп на стороне IdP не делают существующие сессии OmniRoute недействительными; срок их действия
  по-прежнему определяется выходом из системы, сменой пароля или истечением срока сессии.
- Каждый параметр `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) входит в
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  отвечает `400 PASSWORD_REQUIRED`, если в теле запроса не передан пароль управления в поле
  `currentPassword` (`401 PASSWORD_MISMATCH`, если пароль неверен).
  `oidcDisablePasswordLogin` запрещает вход по паролю (`POST /api/auth/login`), но сохраняет
  хэш пароля, а повторная аутентификация по-прежнему проверяет `currentPassword` по этому хэшу.
- `corsOrigins` и `bruteForceProtection` также входят в `SECURITY_IMPACTING_SETTINGS_KEYS`:
  ослабление любого из них снижает уровень защиты входа, поэтому для них требуется такая же
  повторная аутентификация с `currentPassword` (вкладка «Безопасность» запрашивает его), а импорт JSON
  удаляет их.
- Каждый ключ политики безопасности — записи `SECURITY_IMPACTING_SETTINGS_KEYS`, каждый ключ
  `oidc*` и состояние сессии панели — является **доступным только оператору** при выполнении
  `PATCH /api/settings`: API-ключ с областью `manage` или токен доступа `oma_` отклоняется с
  `403`, даже если вместе с ним передан правильный `currentPassword`, а отказ записывается в аудит
  как `settings.update_failed` с причиной `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` в `src/lib/api/operatorCredential.ts`).
  Обычные настройки (тема, параметры отображения) по-прежнему можно изменять с помощью ключа
  `manage` или токена доступа `admin`. Для каждого изменения самого `/api/settings` (а также
  `/api/settings/require-login`) дополнительно требуется область действия токена доступа `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` в `src/server/authz/accessScopes.ts`, сопоставление по точному пути);
  для `GET` сохраняется область `read`, а для остальных подмаршрутов `/api/settings/*`
  (прокси, значения combo по умолчанию, псевдонимы моделей, сжатие, очистка и т. д.) сохраняется
  область `write`, определяемая методом.
- `POST /api/settings/import-json` пропускает эту повторную аутентификацию, поэтому перед записью
  удаляет каждый ключ из `IMPORT_STRIPPED_SETTINGS_KEYS` (тот же файл): пароль и
  `currentPassword`, каждый элемент `SECURITY_IMPACTING_SETTINGS_KEYS`, а также состояние сессии
  панели (`sessionsValidAfter`, `revokedDashboardSessions`).
  Поэтому импорт старой резервной копии не может восстановить сессию, завершённую сменой пароля или
  выходом из системы.

#### Дополнительная двухфакторная аутентификация TOTP при входе (#16619)

Подключается в разделе Настройки → Безопасность; отключена, пока оператор не включит её
(`src/server/auth/dashboardMfa.ts`).

- **Что входит:** вход по паролю (`POST /api/auth/login`, после которого требуется
  `POST /api/auth/mfa/verify`) и `omniroute connect` (`POST /api/cli/connect`,
  который отклоняет обмен только паролем и принимает код как `totp`).
- **Что не входит:** вход через OIDC / SSO (`/api/auth/oidc/callback`) не
  запрашивает TOTP OmniRoute. Он использует собственный второй фактор поставщика
  удостоверений, поэтому при включённом OIDC настройте MFA в IdP.
- **Восстановление** (устройство утеряно, коды восстановления закончились или
  фактор больше нельзя проверить, например после изменения
  `STORAGE_ENCRYPTION_KEY`):
  1. Перезапустите сервер с параметром `OMNIROUTE_DISABLE_MFA=true`.
  2. На самом хосте (одноранговый узел loopback и `Host` loopback, например
     `http://localhost:20128`) войдите с помощью пароля. Второй фактор
     пропускается только для этого источника; для всех остальных источников код
     по-прежнему требуется.
  3. В разделе Настройки → Безопасность → Отключить введите пароль, а поле кода
     оставьте пустым. `POST /api/auth/mfa/disable` принимает тело без `code` только
     пока переменная установлена и запрос поступает с хоста; при этом по-прежнему
     требуются сеанс панели управления и текущий пароль, а действие записывается
     в журнал аудита как `auth.mfa.disabled` с параметром `secondFactor: "recovery_switch"`.
  4. Удалите `OMNIROUTE_DISABLE_MFA`, перезапустите сервер и при необходимости
     пройдите регистрацию заново.

## Классы маршрутов

`src/server/authz/types.ts` определяет три класса. Любой маршрут, который нельзя классифицировать детерминированно, по умолчанию относится к `MANAGEMENT`.

| Класс        | Описание                                                                                                                                                         | Требуемая аутентификация                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | Явно безопасные маршруты: вход, выход, статус, инициализация, проверка состояния, начальная настройка при онбординге.                                            | Не требуется                                                          |
| `CLIENT_API` | Эндпоинты обслуживания моделей: `/api/v1/*`, `/api/v1beta/*`, а также псевдонимы `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ключ Bearer, когда включен действующий флаг функции `REQUIRE_API_KEY` |
| `MANAGEMENT` | Страницы панели управления, настройки, провайдеры, ключи, эндпоинты администрирования и диагностики.                                                             | Сеанс панели ИЛИ Bearer с областью `manage`                           |

Некоторые действия `MANAGEMENT` доступны **только оператору**: ключа с областью `manage` для них недостаточно.
Экспорт сохраненных учетных данных (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), восстановление резервной копии поверх текущих данных
(`POST /api/db-backups/import`, включая `dryRun=true`, `POST /api/db-backups` с восстановлением по id,
`POST /api/settings/import-json`), а также удаление точек восстановления (очистка через `DELETE /api/db-backups`
и `PATCH /api/db-backups`, поскольку хранение, которое сохраняет этот метод, управляет автоматической очисткой
после каждого резервного копирования) требуют сеанса панели, локального CLI-субъекта или отключенного входа.
Выпуск токена синхронизации (`POST /api/sync/tokens`) и создание CLI-токена доступа с областью `admin`
(`POST /api/cli/tokens`) требуют сеанса панели или локального CLI-субъекта во всех режимах входа.
Ключи API любой области и токены доступа `oma_` не являются операторскими учетными данными: если нужны
права оператора, они получают `403`. Проверка выполняется в `src/lib/api/operatorCredential.ts`
(`resolveOperatorCredential()` / `requireOperatorCredential()`). Изменение настроек входа тоже доступно
только оператору: `POST /api/settings/require-login` (задать пароль управления или переключить `requireLogin`)
принимает только эти учетные данные, когда пароль уже существует. Окно первоначальной настройки (пароля
еще нет) не меняется. Сеанс панели для замены пароля должен передать `currentPassword` (`403`, если он
отсутствует или неверен; фиксируется в аудите как `settings.update_failed`). Локальный CLI и экземпляр
с отключенным входом сохраняют путь восстановления и могут задать пароль без него, так как оба привязаны
к хосту, которому принадлежит каталог данных.

## Трубопровод

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

Доверенные внутренние заголовки (определенные в `src/server/authz/headers.ts`)** удален из входящих запросов** перед классификацией клиенты — не могут предварительно заполнить `x-omniroute-auth-*`, чтобы олицетворять субъекта.

### Политические контракты

У каждого класса маршрутов есть политика в `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — всегда возвращает `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — извлекает Bearer и проверяет через `validateApiKey()`. Переходит в анонимный режим только тогда, когда флаг эффективной функции `REQUIRE_API_KEY` отключен. Действующий флаг разрешается через `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), поэтому флаги функций панели мониторинга и переменные среды последовательно управляют `/api/v1/*`, `/api/v1beta/*` и псевдонимами; сбои резольвера не закрываются. Разрешает запросы сеанса информационной панели по клиентским маршрутам API (включая `/api/v1/models`, используемый каталогом моделей информационной панели). Когда Entra ID SSO включен, носитель, структурно являющийся токеном Entra (три сегмента base64url, `RS*` alg, `kid`), обрабатывается веткой SSO** до** `validateApiKey()` и его вердикт окончательный. — он никогда не попадает в путь ключа API или в ветвь деградации до анонимности, поэтому сбой в работе провайдера идентификации не может стать открытым доступом. Статические ключи API не затрагиваются. См. [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — принимает сеанс информационной панели, внутренние запросы синхронизации модели (сопоставленные с `/api/providers/[name]/(sync-models|models)`) или полностью пропускает, если `isAuthRequired()` возвращает false. Возвращает 403 (`AUTH_001`), если токен носителя присутствует, но недействителен, в противном случае — 401. Также применяет уровни защиты маршрута (LOCAL_ONLY / ALWAYS_PROTECTED) перед любой веткой аутентификации — см. [Уровни защиты маршрута](../security/ROUTE_GUARD_TIERS.md). Доступ к путям LOCAL_ONLY в `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (сегодня: `/api/mcp/`) можно получить без обратной связи, когда ключ носителя несет область действия `manage` ; все остальные пути LOCAL_ONLY остаются строгими с обратной связью независимо от области действия.

Успешная политика возвращает `AuthSubject` с помощью `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Нижестоящие обработчики могут прочитать его через `assertAuth(request, "CLIENT_API")` в `src/server/authz/assertAuth.ts` вместо повторного запуска логики аутентификации.

## Список общедоступных маршрутов

`src/shared/constants/publicApiRoutes.ts` — это явный список разрешений:

Список разделён по **форме**, и это разделение критично для работы (GHSA-74g9-q8f6-793h): префикс
сопоставляется с помощью `startsWith()`, поэтому он также соответствует каждому соседнему пути с теми же
начальными символами. Префикс `/api/usage/om-usage` помечает `/api/usage/om-usage<anything>` как PUBLIC, а Next сопоставляет
его с `/api/usage/[connectionId]` — обработчиком, в котором отсутствует собственная аутентификация.

```ts
// Настоящие поддеревья. Каждая запись ДОЛЖНА заканчиваться на "/" (проверяется модульным тестом).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // в classify обрабатывается как CLIENT_API, а не как "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Отдельные маршруты, сопоставляемые ТОЧНО (с завершающим слэшем или без него).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // шаг 2 входа для включённого TOTP; требуется cookie MFA-pending
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Отдельные маршруты только для чтения, для которых также применяется послабление для источника CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Отдельный маршрут только для чтения БЕЗ послабления для источника CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Маршруты только для чтения являются общедоступными **только** для безопасных методов. Примечание: `classifyRoute()` исключает `/api/v1/*` и `/api/v1beta/*` из PUBLIC fall-through — они всегда являются `CLIENT_API`, поэтому к ним по-прежнему применяется политика Bearer-ключа.

## Добавление нового маршрута

### Схема 1 — Публичная конечная точка клиентского API (Bearer-аутентификация)

Маршруты в `/api/v1/` и `/api/v1beta/` автоматически классифицируются как `CLIENT_API`. Middleware обеспечивает проверку Bearer; обработчикам маршрутов не нужно выполнять её повторно, но при необходимости они могут прочитать субъект.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логика обработчика
}
```

### Схема 2 — Конечная точка управления (сессия или Bearer + manage)

Используйте `requireManagementAuth()` из `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логика обработчика
}
```

`requireManagementAuth()` возвращает `null` при успешной проверке либо JSON-ответ `Response` с ошибкой:

- 401 `AUTH_001` "Требуется аутентификация" — учётные данные полностью отсутствуют
- 403 — недействительный Bearer **или** Bearer присутствует, но у ключа нет области действия `manage` / `admin`

`hasManageScope(scopes)` возвращает true для `"manage"` или `"admin"`.

### Схема 3 — Добавление в список публичных маршрутов

Выбирайте набор по форме маршрута, а не по удобству. Отдельный маршрут следует помещать в `PUBLIC_API_ROUTES_EXACT` (или в `PUBLIC_READONLY_CORS_API_ROUTES`, если он предназначен только для GET); только настоящее поддерево следует помещать в `PUBLIC_API_ROUTE_PREFIXES`, причём оно **должно заканчиваться на `/`**. Помещение отдельного маршрута в список префиксов также делает публичными все соседние пути с теми же начальными символами, включая маршруты с динамическими сегментами, добавленные позднее (GHSA-74g9-q8f6-793h). Обновите модульные тесты в `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` и `tests/unit/authz/classify.test.ts`.

## Области действия

Три пространства имен. Каждый проверяющий читает только свои строки. Сравнительный анализ, включая то, почему `manage` не проходит `scopeMatches` для `read:compression` и почему токен доступа `read` не может выполнить `PATCH /api/keys/{id}`, находится в
[Три пространства имен областей действия](../frameworks/MCP-SERVER.md#three-scope-namespaces).

Ключи API содержат массив `scopes` (хранится как JSON в `api_keys.scopes`, см. `src/lib/db/apiKeys.ts`).

### Область действия управления

- `manage` / `admin` — `hasManageScope`. Bearer-доступ к маршрутам API управления.
- `mcp:connect`, `self:usage`, `self:account-quota` и
  `policy:bypass-provider-quota` являются аддитивными областями действия с точным совпадением. Они находятся
  вне `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` открывает только
  не-loopback вырез `/api/mcp/`.

### Области действия инструментов MCP

Каталог и правила сопоставления (идентичная строка или предоставленная область действия, заканчивающаяся на `*`):
[Области действия инструментов MCP](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` в `src/shared/constants/mcpScopes.ts` является исходным типизированным
подмножеством, а не полным каталогом. Принудительное применение выполняется в
`open-sse/mcp-server/scopeEnforcement.ts` после того, как `resolveCallerScopeContext()`
разрешает области действия из информации аутентификации MCP, метаданных запроса или `OMNIROUTE_MCP_SCOPES`.
Оно остается выключенным, если только `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Области действия токенов доступа

`read` / `write` / `admin` для токенов `oma_live_…`, ранжированных по `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Этот ранг применяется только к учетным данным
токена доступа. См. [Аутентификация управления](../guides/MANAGEMENT-AUTH.md).

## Переключатель обязательной аутентификации

`isAuthRequired()` в `src/shared/utils/apiAuth.ts` определяет, применяется ли **какая-либо** аутентификация к запросу:

- `settings.requireLogin === false` → аутентификация отключена глобально, за исключением всегда защищенного уровня
  (см. [Уровни защиты маршрутов](../security/ROUTE_GUARD_TIERS.md)) и вызовов, которые выдают учетные данные,
  принимаемые системой. Для них требуются те же учетные данные, что и при включенном входе: выпуск токенов
  синхронизации, выпуск CLI-токенов доступа с любой областью, а также создание ключа API с областью
  `manage`/`admin`, предоставление такой области ключу, перевыпуск или показ такого ключа
  (`requireCredentialForManagementScopedKey()` в `src/lib/api/requireManagementAuth.ts`). Ключи только
  для инференса остаются открытыми.
- Пароль не задан **и** нет переменной окружения `INITIAL_PASSWORD` → режим начальной настройки разрешает
  мастер онбординга и запросы с loopback, но запросы из внешней сети по-прежнему требуют учетных данных.
- Любая ошибка БД → отказ (безопасное поведение по умолчанию, fail closed).

Проверка клиентских ключей API использует `isRequireApiKeyEnabled()` в `src/shared/utils/featureFlags.ts`,
а не прямое чтение `process.env.REQUIRE_API_KEY`. Это важно для развернутых экземпляров: переключение
`REQUIRE_API_KEY` в Dashboard → Feature Flags сохраняет переопределение в БД и сразу влияет на `/v1/*`,
`/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` и другие проверки клиентского API,
которые используют этот помощник. Если хранилище флагов функций не читается, аутентификация клиентского API
отказывает и требует ключ.

## Критическое изменение — v3.8.0

Конечные точки `/api/v1/agents/tasks/*` и `/api/resilience/model-cooldowns` **теперь требуют аутентификацию управления** (коммит `588a0333`). Клиенты, ранее отправлявшие обычный API-ключ без области `manage`, получают `403`. Миграция: либо назначьте ключу область `manage` в панели API Keys, либо используйте аутентифицированный сеанс панели управления.

## Изменение поведения — v3.8.2

`/api/mcp/*` (удалённый сервер MCP) по-прежнему по умолчанию имеет уровень LOCAL_ONLY, но теперь принимает запросы не с loopback-интерфейса, если заголовок `Authorization: Bearer <api-key>` содержит область `manage`. Это исключение явно регулируется для каждого пути с помощью `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` в `src/server/authz/routeGuard.ts`; для родственного префикса LOCAL_ONLY `/api/cli-tools/runtime/*` обход намеренно НЕ разрешён, поскольку он может запускать произвольные подпроцессы. Анонимные запросы к `/api/mcp/*` не с loopback-интерфейса по-прежнему получают `403 LOCAL_ONLY` — для любого нового пути LOCAL_ONLY по умолчанию сохраняется строгий режим loopback. См. [Уровни защиты маршрутов](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Тестирование

- Модульные тесты: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Список разрешённых публичных маршрутов: `tests/unit/public-api-routes.test.ts`.
- Запуск отдельных тестов: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Отладка

Конвейер всегда помечает ответы:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Для аутентифицированных запросов заголовки запросов восходящего потока (на стороне обработчика) также включают:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Используйте `assertAuth(req, expectedClass)` внутри обработчиков — он выдает `AuthzAssertionError` с кодом `AUTHZ_NOT_INITIALIZED` если промежуточное программное обеспечение было обойдено (полезно для обнаружения регрессий конфигурации в тестах).

## См. также

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — маркер аутентификации для каждой конечной точки
- [COMPLIANCE.md](../security/COMPLIANCE.md) — журнал аудита событий аутентификации
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — три пространства имен областей видимости и каталог областей видимости инструментов MCP
- Источник: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
