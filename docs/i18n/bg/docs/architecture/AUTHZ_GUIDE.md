# Authorization Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Източник на истина:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Последна актуализация:** 2026-09-22 — пространствата от имена на обхватите сочат към MCP-SERVER.md

OmniRoute разполага с ориентиран към маршрутите конвейер за оторизация, който контролира всяка API заявка. Класифицирането е **детерминистично** и **затворено при неуспех** — всичко, което не може да бъде класифицирано, се причислява към `MANAGEMENT` и изисква сесия или токен с управленско ниво на достъп. Тази страница обяснява модела за инженерите, които поддържат маршрути или проектират нови крайни точки.

![Конвейер за AuthZ (3 класа маршрути + оценяване на политики)](../diagrams/exported/authz-pipeline.svg)

> Източник: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Два режима на удостоверяване

### 1. API ключ (Bearer)

Използва се за съвместимите с OpenAI/Anthropic/Gemini клиентски API и за някои маршрути за управление, когато ключът има обхвата `manage`.

```
Authorization: Bearer <api-key>
```

Валидира се от `isValidApiKey()` / `extractApiKey()` в `src/sse/services/auth.ts` и се експортира повторно чрез `src/shared/utils/apiAuth.ts`. Валидаторът също приема променливите на средата `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` като постоянни ключове за директно препращане (issue #1350).

### 2. Сесия на таблото (бисквитка auth_token)

За страниците на таблото и административните операции.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Бисквитката е сесия само когато JWT се валидира успешно **и** съдържа `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Всеки
потребител на бисквитката (пазачът на маршрута на таблото (`isDashboardSessionAuthenticated()`), обновяването в конвейера за оторизация, WebSocket ръкостискането, live
сървърът, `/api/settings/require-login`, `/api/auth/status`) преминава през този помощен компонент.
Съществуват и други JWT, подписани с `JWT_SECRET` — директното препращане на Cursor CLI издава токени с
`iss "omniroute" / aud "cursor-cli"` за притежателите на ключове — и те никога не са сесии
(#13298).

Проверява се от `isDashboardSessionAuthenticated()` в `src/shared/utils/apiAuth.ts`. Конвейерът автоматично обновява JWT, когато му остават по-малко от 7 дни от 30-дневния му срок на валидност.

Сесията може да приключи и преди изтичането на тези 30 дни, тъй като всеки издател преминава през `mintDashboardSessionToken` (време на издаване `iat` и идентификатор `jti`), а валидаторът проверява две настройки: `sessionsValidAfter`, зададена при промяна на паролата, така че всяка сесия, издадена преди това, престава да се валидира (браузърът, в който е променена паролата, получава нова бисквитка), и `revokedDashboardSessions`, към която `POST /api/auth/logout` добавя `jti` на сесията, от която е извършено излизането. Сесиите, издадени от по-стара версия, не съдържат нито един от двата атрибута и остават валидни до първата промяна на паролата. Ако настройките не могат да бъдат прочетени, сесията не се счита за надеждна.

Някои маршрути за управление приемат **който и да е** от двата режима: бисквитка ИЛИ `Bearer <key>`, когато API ключът има обхват `manage` (или `admin`). Това позволява работния процес „конфигуриране чрез API извиквания“, добавен във v3.8.

#### Незадължителна OIDC входна преграда (#6973)

Административното влизане в таблото също поддържа **включващ се по избор** поток OIDC (OpenID Connect)
наред с входа с парола по подразбиране — входът с парола никога не се премахва, а само
се допълва:

- Деактивирано е, освен ако `settings.oidcEnabled === true` **и** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` не са конфигурирани (Settings → Auth).
  `GET /api/auth/oidc/login` връща `400` в противен случай.
- `GET /api/auth/oidc/login` открива `authorization_endpoint` от
  `/.well-known/openid-configuration` на издателя (в противен случай използва
  `<issuer>/authorize`), изгражда URI за пренасочване от входящата заявка
  (съобразено с `x-forwarded-proto`) и пренасочва към IdP със случаен `state`,
  съхранен в `httpOnly` бисквитка `oidc_state`.
- `GET /api/auth/oidc/callback` валидира `state`, обменя кода за оторизация и
  проверява подписа на ID токена чрез JWKS на издателя
  (`createRemoteJWKSet` на `jose`, кеширан за всеки JWKS URI), заедно с проверки
  на `issuer`/`audience`. Достъпът до таблото изисква непразен списък
  `oidcAllowedSubjects`, политика `oidcAdmissionClaim` или и двете. Списъкът със
  субекти съвпада с `sub` или `email` само когато `email_verified === true`.
  Незадължителната политика за claim използва разделен с точки път към claim в
  ID токена (например `realm_access.roles`) и масив от приети стойности;
  разрешеният claim трябва да бъде масив от низове, съдържащ поне една приета
  стойност. Ако са конфигурирани и двете политики, и двете трябва да преминат.
  Липсващи или неправилно форматирани claim-ове водят до отказ по подразбиране,
  а при липса на която и да е от двете политики callback-ът отказва входа
  (`not_configured`). Съществуващите конфигурации само със subject продължават
  да работят без промяна.
- Keycloak обикновено включва ролите на realm в access токените, но не
  непременно в ID токените. За да изисквате ролята на realm `admin`,
  конфигурирайте protocol mapper за този клиент, който включва
  `realm_access.roles` в неговия **ID token**, след което задайте
  `oidcAdmissionClaim` на `{ "path": "realm_access.roles", "values": ["admin"] }`.
  Проверете действителния claim в ID токена за този клиент, преди да активирате
  достъп само по роля; приложението не прочита ролите от access токена. Отказът
  на токен от страна на IdP може да допълва, но не може да замени тази проверка
  от страна на приложението.
- При успех издава **абсолютно същия** 30-дневен JWT `auth_token`, който
  издава входът с парола (`src/app/api/auth/login/route.ts`), така че останалият
  конвейер за сесии на таблото (автоматично обновяване, флагове на бисквитките)
  остава непроменен — OIDC заменя само начина, по който се издава бисквитката,
  но не и правата, които тя предоставя. Промените в ролите/групите на IdP не
  обезсилват съществуващите сесии на OmniRoute; излизането, смяната на паролата
  или изтичането на сесията продължават да определят техния срок на действие.
- Всяка настройка `oidc*` (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) е включена в
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  отговаря с `400 PASSWORD_REQUIRED`, освен ако тялото не съдържа паролата за
  управление като `currentPassword` (`401 PASSWORD_MISMATCH`, когато е
  неправилна). `oidcDisablePasswordLogin` отказва вход с парола
  (`POST /api/auth/login`), но запазва хеша на съхранената парола, а
  повторното удостоверяване продължава да проверява `currentPassword` спрямо
  него.
- `corsOrigins` и `bruteForceProtection` също са включени в
  `SECURITY_IMPACTING_SETTINGS_KEYS`: промяната им към по-слаби стойности
  отслабва защитите при вход, затова изискват същото повторно удостоверяване с
  `currentPassword` (разделът Security го изисква), а JSON импортът ги
  пропуска.
- Всеки ключ от политиките за сигурност — записите в
  `SECURITY_IMPACTING_SETTINGS_KEYS`, всеки ключ `oidc*` и състоянието на
  сесията на таблото — е **само за оператори** при `PATCH /api/settings`:
  API ключ с обхват manage или access token `oma_` се отказва с `403`, дори
  когато изпраща правилния `currentPassword`, а отказът се записва в одитния
  журнал като `settings.update_failed` с `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` в `src/lib/api/operatorCredential.ts`).
  Обикновените настройки (тема, предпочитания за визуализация) остават достъпни
  за запис от ключ с обхват `manage` или access token с обхват `admin`. Всяка
  промяна на самия `/api/settings` (както и на
  `/api/settings/require-login`) изисква и обхвата `admin` за access token
  (`ADMIN_MUTATION_EXACT_PATHS` в `src/server/authz/accessScopes.ts`, съвпадение
  по точен път); `GET` запазва обхвата `read`, а останалите подмаршрути
  `/api/settings/*` (проксита, настройки по подразбиране за комбинации, псевдоними
  на модели, компресиране, изчиствания…) запазват обхвата `write`, определян от
  метода.
- `POST /api/settings/import-json` пропуска това повторно удостоверяване, затова
  премахва всеки ключ от `IMPORT_STRIPPED_SETTINGS_KEYS` (в същия файл), преди
  да запише данните: паролата и `currentPassword`, всеки запис от
  `SECURITY_IMPACTING_SETTINGS_KEYS` и състоянието на сесията на таблото
  (`sessionsValidAfter`, `revokedDashboardSessions`). Импортирането на по-стар
  архив следователно не може да възстанови сесия, която вече е прекратена чрез
  промяна на паролата или излизане.

#### Незадължителен двуфакторен вход с TOTP (#16619)

Активира се от Settings → Security; изключен е, докато операторът не го включи
(`src/server/auth/dashboardMfa.ts`).

- **Какво обхваща:** влизане с парола (`POST /api/auth/login`, което след това изисква
  `POST /api/auth/mfa/verify`) и `omniroute connect` (`POST /api/cli/connect`,
  което отказва обмен само с парола и приема кода като `totp`).
- **Какво не обхваща:** влизането чрез OIDC / SSO (`/api/auth/oidc/callback`) не
  изисква TOTP на OmniRoute. То разчита на собствения втори фактор на доставчика на
  идентичност, затова наложете MFA в IdP, ако OIDC е разрешен.
- **Възстановяване** (загубено устройство, не са останали кодове за възстановяване или фактор, който вече
  не може да бъде проверен, например след промяна на `STORAGE_ENCRYPTION_KEY`):
  1. Рестартирайте сървъра с `OMNIROUTE_DISABLE_MFA=true`.
  2. На самия хост (свързан клиент чрез loopback и `Host` чрез loopback, например
     `http://localhost:20128`) влезте с паролата. Вторият фактор се пропуска само за този origin; всеки
     друг origin все още изисква кода.
  3. В Настройки → Сигурност → Деактивиране въведете паролата и оставете кода
     празен. `POST /api/auth/mfa/disable` приема тяло без `code` само докато
     променливата е зададена и заявката идва от хоста; той все още изисква сесията на
     таблото и текущата парола и се записва в одитния журнал като
     `auth.mfa.disabled` с `secondFactor: "recovery_switch"`.
  4. Премахнете стойността на `OMNIROUTE_DISABLE_MFA`, рестартирайте и регистрирайте фактор отново, ако е необходимо.

## Класове по маршрути

`src/server/authz/types.ts` дефинира три класа; всеки маршрут, който не може да бъде класифициран детерминистично, се връща към `MANAGEMENT`.

| Клас         | Описание                                                                                                                                                       | Изисква се удостоверяване                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `PUBLIC`     | Изрично безопасни маршрути — влизане, излизане, състояние, здраве, onboarding bootstrap.                                                                       | Няма                                                                               |
| `CLIENT_API` | Обслужващи модели крайни точки — `/api/v1/*`, `/api/v1beta/*`, плюс псевдоними `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Ключ на носителя, когато флагът за ефективна функция `REQUIRE_API_KEY` е активиран |
| `MANAGEMENT` | Страници на таблото за управление, настройки, доставчици, ключове, администраторски и крайни точки за диагностика.                                             | Сесия на таблото за управление OR носител с обхват `manage`                        |

Няколко `MANAGEMENT` действия са** само за оператор** : `manage` ключ не е достатъчен. Експортиране на съхранени идентификационни данни (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), възстановяване на резервно копие върху живи данни (`POST /api/db-backups/import` включително `dryRun=true`, `POST /api/db-backups` възстановяване по id, `POST /api/settings/import-json`), унищожаване на точки за възстановяване (`DELETE /api/db-backups` почистване и `PATCH /api/db-backups` тъй като запазването, което продължава, управлява автоматичното съкращаване след всяко архивиране) изисква сесия на таблото за управление, локален CLI субект или деактивирано влизане. Издаването на токен за синхронизиране (`POST /api/sync/tokens`) и изсичането на токен за достъп `admin` CLI (`POST /api/cli/tokens`) изискват сесия на таблото за управление или локалния субект CLI във всеки режим на влизане. API ключове от всякакъв обхват и `oma_` токени за достъп не са идентификационни данни на оператор: те получават `403` винаги, когато се изисква такъв. Чекът живее в `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`). Промяната на настройките за влизане също е само от оператор: `POST /api/settings/require-login` (задайте парола за управление / превключете `requireLogin`) приема само тези идентификационни данни, след като съществува парола — прозорецът за първоначално стартиране (все още няма парола) е непроменен — и сесията на таблото трябва да изпрати `currentPassword` за да замени паролата (`403` когато липсва или е грешна, одитирана като `settings.update_failed`). Локалният CLI и екземпляр с деактивирано влизане запазват пътя за възстановяване и могат да зададат парола без него, тъй като и двата са обвързани с хоста, който притежава директорията с данни.

## Тръбопровод

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

Надеждни вътрешни заглавки (дефинирани в `src/server/authz/headers.ts`) са** премахнати от входящи заявки** преди класификация — клиентите не могат да попълват предварително `x-omniroute-auth-*` за да се представят за субект.

### Договори за полици

Всеки клас маршрут има политика в `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — винаги връща `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — извлича Bearer, валидира чрез `validateApiKey()`. Преминава към анонимен само когато флагът за ефективна функция `REQUIRE_API_KEY` е деактивиран. Ефективният флаг се разрешава чрез `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), така че флаговете на функциите на таблото за управление и променливите на средата управляват `/api/v1/*`, `/api/v1beta/*` и псевдонимите последователно; неуспешно затваряне на резолвера. Позволява заявки за сесия на таблото за клиентски API маршрути (включително `/api/v1/models`, използван от каталога на модела на таблото). Когато Entra ID SSO е активиран, носител, който структурно е Entra токен (три base64url сегмента, `RS*` alg, `kid`) се обработва от SSO клона** преди** `validateApiKey()` и неговата присъда е окончателна — той никога не попада в пътя на ключа на API или клона за деградиране до анонимен, така че прекъсването на доставчик на идентичност не може да стане отворен достъп. Статичните API ключове не са засегнати. Вижте [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — приема сесия на таблото за управление, вътрешни заявки за синхронизиране на модели (съвпадащи с `/api/providers/[name]/(sync-models|models)`) или пропуска изцяло, ако `isAuthRequired()` върне false. Връща 403 (`AUTH_001`), когато токенът на носител е наличен, но е невалиден, 401 в противен случай. Също така налага нивата за защита на маршрута (LOCAL_ONLY / ALWAYS_PROTECTED) преди всеки клон за удостоверяване — вижте [Нивата за защита на маршрута](../security/ROUTE_GUARD_TIERS.md). LOCAL_ONLY пътеките в `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (днес: `/api/mcp/`) могат да бъдат достъпни от non-loopback, когато носещият ключ носи `manage` обхвата; всички останали LOCAL_ONLY пътища остават стриктно обратно независимо от обхвата.

Успешна политика връща `AuthSubject` с `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }`. Манипулаторите надолу по веригата могат да го прочетат чрез `assertAuth(request, "CLIENT_API")` в `src/server/authz/assertAuth.ts` вместо да изпълняват повторно логиката за удостоверяване.

## Списък с обществени маршрути

`src/shared/constants/publicApiRoutes.ts` е изричният списък с разрешени:

Списъкът е разделен на** форма** , а разделянето е носещо (GHSA-74g9-q8f6-793h): префиксът се съпоставя с `startsWith()`, така че съвпада и с всеки съседен път, споделящ своите водещи знаци. `/api/usage/om-usage` като префикс, отбелязан `/api/usage/om-usage<anything>` PUBLIC, и Next разрешава това на `/api/usage/[connectionId]` — манипулатор без собствено удостоверяване.

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Маршрутите само за четене са публични** само** за безопасни методи. Забележка: `classifyRoute()` изключва `/api/v1/*` и `/api/v1beta/*` от PUBLIC падащия — те винаги са `CLIENT_API` така че политиката за ключ на носител все още се прилага.

## Добавяне на нов маршрут

### Шаблон 1 — Публична крайна точка на клиентския API (Bearer удостоверяване)

Маршрутите под `/api/v1/` и `/api/v1beta/` автоматично се класифицират като `CLIENT_API`. Middleware компонентът налага Bearer проверката; не е необходимо обработчиците на маршрути да я повтарят, но могат да прочетат субекта, ако това е полезно.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... логика на обработчика
}
```

### Шаблон 2 — Крайна точка за управление (сесия или Bearer + manage)

Използвайте `requireManagementAuth()` от `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... логика на обработчика
}
```

При успех `requireManagementAuth()` връща `null`, а при грешка — JSON `Response`:

- 401 `AUTH_001` „Изисква се удостоверяване“ — липсват каквито и да е идентификационни данни
- 403 — невалиден Bearer **или** е предоставен Bearer, но ключът няма обхват `manage` / `admin`

`hasManageScope(scopes)` връща true за `"manage"` или `"admin"`.

### Шаблон 3 — Добавяне към публичния списък с разрешени маршрути

Изберете множеството според формата, а не според удобството. Единичен маршрут се добавя в `PUBLIC_API_ROUTES_EXACT` (или в `PUBLIC_READONLY_CORS_API_ROUTES`, ако е само за GET); единствено реално поддърво се добавя в `PUBLIC_API_ROUTE_PREFIXES` и то **трябва да завършва с `/`**. Добавянето на единичен маршрут в списъка с префикси прави публичен и всеки съседен път, който споделя началните му символи — включително маршрути със сродни динамични сегменти, добавени по-късно (GHSA-74g9-q8f6-793h). Актуализирайте модулните тестове в `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` и `tests/unit/authz/classify.test.ts`.

## Обхвати

Три пространства от имена. Всяка проверка чете само собствените си низове. Съпоставката,
включително защо `manage` не преминава `scopeMatches` за `read:compression` и защо
токен за достъп с `read` не може да изпълни `PATCH /api/keys/{id}`, е описана в
[Три пространства от имена за обхвати](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API ключовете съдържат масив `scopes` (съхраняван като JSON в `api_keys.scopes`, вижте `src/lib/db/apiKeys.ts`).

### Обхват за управление

- `manage` / `admin` — `hasManageScope`. Bearer достъп до маршрутите на API за управление.
- `mcp:connect`, `self:usage`, `self:account-quota` и
  `policy:bypass-provider-quota` са допълващи обхвати с точно съвпадение. Те са
  извън `MANAGEMENT_API_KEY_SCOPES`. `mcp:connect` отваря само
  изключението за адреси извън loopback за `/api/mcp/`.

### Обхвати на MCP инструменти

Каталог и правила за съвпадение (идентичен низ или предоставен обхват, завършващ на `*`):
[Обхвати на MCP инструменти](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`MCP_SCOPE_LIST` в `src/shared/constants/mcpScopes.ts` е първоначалното типизирано
подмножество, а не пълният каталог. Налагането на ограниченията се извършва в
`open-sse/mcp-server/scopeEnforcement.ts`, след като `resolveCallerScopeContext()`
разреши обхватите от информацията за MCP удостоверяване, метаданните на заявката или `OMNIROUTE_MCP_SCOPES`.
То остава изключено, освен ако `OMNIROUTE_MCP_ENFORCE_SCOPES=true`.

### Обхвати на токени за достъп

`read` / `write` / `admin` при токени `oma_live_…`, подредени по ранг чрез `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`). Този ранг се прилага само към идентификационните
данни на токена за достъп. Вижте [Удостоверяване за управление](../guides/MANAGEMENT-AUTH.md).

## Изисква се удостоверяване

`isAuthRequired()` в `src/shared/utils/apiAuth.ts` решава дали** всякакви** auth се прилага за заявка:

- `settings.requireLogin === false` → auth е глобално деактивиран, с изключение на винаги защитеното ниво (вижте [нивата на защита на маршрута](../security/ROUTE_GUARD_TIERS.md) ) и повикванията, които предават идентификационни данни, които приема, които се нуждаят от същите идентификационни данни като при влизане: издаване на синхронизиращи токени, изсичане на CLI токени за достъп във всеки обхват и създаване на API ключ с обхват `manage`/`admin`, предоставяне на този обхват на ключ или регенериране или разкриване на такъв ключ (`requireCredentialForManagementScopedKey()` в `src/lib/api/requireManagementAuth.ts`). Ключовете само за изводи остават отворени. Писането на флаг за защитена функция (`REQUIRE_API_KEY`, другите флагове за сигурност и флаговете SSRF / TLS / MCP-scope / sandbox, изброени във [Флагове на функции](../reference/FEATURE_FLAGS.md#rest-api) ) и запазването на настройките за маскиране PII (`PUT /api/settings/pii`) също продължават да се нуждаят от идентификационни данни.
- Няма конфигурирана парола** и** no `INITIAL_PASSWORD` env var → bootstrap mode позволява съветника за включване и заявки за обратна връзка, но откритите мрежови заявки все още се нуждаят от идентификационни данни. Изключение: писането на флаг за защитена функция и запазването на настройките за маскиране на PII (`PUT /api/settings/pii`) се нуждаят от идентификационни данни дори от loopback, така че loopback сам по себе си не е достатъчен там.
- Всяка DB грешка → не се затваря (защитено по подразбиране).

Прилагането API ключ на клиента използва `isRequireApiKeyEnabled()` в `src/shared/utils/featureFlags.ts`, а не директно четене `process.env.REQUIRE_API_KEY`. Това има значение за внедрените екземпляри: превключването на `REQUIRE_API_KEY` в таблото за управление → Feature Flags съхранява DB отмяна и незабавно засяга `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` и други клиентски API проверки за удостоверяване, които споделят този помощник. Ако хранилището на флага на функцията не може да бъде прочетено, API auth на клиента не се затваря и изисква ключ.

## Несъвместима промяна — v3.8.0

Крайните точки `/api/v1/agents/tasks/*` и `/api/resilience/model-cooldowns` **вече изискват удостоверяване за управление** (commit `588a0333`). Клиентите, които преди са изпращали обикновен API ключ без обхвата `manage`, получават `403`. Миграция: или задайте на ключа обхвата `manage` в таблото API Keys, или използвайте сесия с влизане в таблото.

## Промяна в поведението — v3.8.2

`/api/mcp/*` (отдалеченият MCP сървър) все още е LOCAL_ONLY по подразбиране, но вече приема заявки, които не са loopback, когато заглавката `Authorization: Bearer <api-key>` съдържа обхвата `manage`. Изключението се управлява изрично за всеки път чрез `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` в `src/server/authz/routeGuard.ts`; сродният LOCAL_ONLY префикс `/api/cli-tools/runtime/*` умишлено НЕ може да бъде заобиколен, защото може да стартира произволни подпроцеси. Анонимните заявки към `/api/mcp/*`, които не са loopback, продължават да връщат `403 LOCAL_ONLY` — поведението по подразбиране за всеки нов LOCAL_ONLY път остава строго ограничено до loopback. Вижте [Нива на защита на маршрутите](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Тестване

- Модулни тестове: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Публичен списък с разрешени маршрути: `tests/unit/public-api-routes.test.ts`.
- Изпълнение на конкретен тест: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Отстраняване на грешки

Тръбопроводът винаги подпечатва отговорите с:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

За удостоверени заявки заглавките на заявките нагоре (от страна на манипулатора) също включват:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Използвайте `assertAuth(req, expectedClass)` вътрешни манипулатори — той хвърля `AuthzAssertionError` с код `AUTHZ_NOT_INITIALIZED` ако междинният софтуер е бил заобиколен (полезно за улавяне на регресии в конфигурацията при тестове).

## Вижте също

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — маркер за удостоверяване за всяка крайна точка
- [COMPLIANCE.md](../security/COMPLIANCE.md) — журнал за одит на събитията по удостоверяване
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — три пространства от имена за обхвати и каталог на обхватите на MCP инструментите
- Изходен код: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
