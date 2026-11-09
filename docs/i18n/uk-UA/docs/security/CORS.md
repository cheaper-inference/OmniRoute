# CORS Configuration & Security (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute контролює які **походження браузера** може читати відповіді різних джерел із єдиного централізованого білого списку. Модель є **за замовчуванням закрито після помилки** : жодне джерело не дозволено, доки ви не ввімкнете його. На цій сторінці описано, як вирішується білий список, що насправді відкриває `CORS_ALLOW_ALL=true` (і, що важливо, що він робить **ні** ), як безпечно налаштувати dev проти production, і попередження під час виконання, яке відображається на інформаційній панелі, коли символ підстановки активний.

**Джерело правди:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Білий список застосовується один раз, у проміжному програмному забезпеченні (`src/server/authz/pipeline.ts`) обробники — для кожного маршруту не встановлюють `Access-Control-Allow-Origin` самі.

## Як вирішується походження

Для кожного запиту проміжне програмне забезпечення обчислює значення `Access-Control-Allow-Origin` в такому порядку:

1. **`CORS_ALLOW_ALL=true`** (або застарілий `CORS_ORIGIN=*`) → повторює `Origin` абонента (або `*` коли немає заголовка `Origin` ), з `Vary: Origin`, щоб кеші залишалися правильними. Та сама точка затримки `applyCorsHeaders()` також додає `Vary: Accept-Encoding` до кожної відповіді 2xx-with-body на поверхні `/v1*`/`/v1beta*` з автентифікацією токенів (`relaxForTokenAuth`, RFC 9110 §12.5.5, проблема #6737), тому кеші downstream/shared можуть правильно розрізняти стиснені та нестиснені варіанти.
2. В іншому випадку запит `Origin` нормалізується (у нижньому регістрі, без похилої риски в кінці) і порівнюється з **об’єднаний білий список** :
   - оточення **`CORS_ALLOWED_ORIGINS`** Список —, розділений комами, і
   - час виконання **`corsOrigins`** налаштування (Dashboard → Security → _CORS Allowed Origins_), впроваджене через `setRuntimeAllowedOrigins()` із `src/lib/config/runtimeSettings.ts`.
3. Немає відповідності →**заголовок `Access-Control-Allow-Origin` не видається** . Браузер блокує перехресне читання. Це передбачуване закриття за умовчанням.

| Env вар                | Значення                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Дозволити CSV точного походження (рекомендовано).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → повторює будь-яке джерело (знак підстановки). Лише для розробників.        |
| `CORS_ORIGIN`          | Спадщина. `*` поводиться як `CORS_ALLOW_ALL`; одне значення додається до білого списку. |

## Модель загроз —, що `CORS_ALLOW_ALL=true` насправді викриває

Варто серйозно поставитися до загального попередження OWASP («замінний знак CORS = будь-який сайт може називати ваш API»), але ризик OmniRoute**вужчий, ніж родовий відмінок** , через один конкретний факт реалізації:

> **Центральний `applyCorsHeaders()` ніколи не випромінює `Access-Control-Allow-Credentials`.** Браузер не відкриє перехресну відповідь _credentialed_ (з файлами cookie), якщо сервер не надішле `Access-Control-Allow-Credentials: true`. Спільний шлях CORS OmniRoute ніколи не робить.

Що це означає для поверхні, навіть із `CORS_ALLOW_ALL=true`:

| Поверхня                                              | Механізм авторизації        | Вплив символу підстановки CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Приладова панель / MANAGEMENT `/api/*`                | Сеанс файлів cookie         | Походження повторюється, але **без `Allow-Credentials`** браузер **блоки** акредитований прочитати. Шкідливий перехресний сайт **не може читати** ваші автентифіковані відповіді на інформаційній панелі, а файл cookie сеансу не розкривається.                                                                                                                                                                                                                                                                                                      |
| Клієнт API `/v1/*`, `/v1beta/*`                       | Носій/заголовок `x-api-key` | Вже дозволено **за проектом** (`relaxForTokenAuth`): браузери ніколи не прикріплюють автоматично `Authorization`/`x-api-key`, тому сторінка зловмисника не може надати ваш ключ. Для розслабленого відлуння потрібен автентифікований суб’єкт (підтверджений ключ API або сеанс інформаційної панелі), а не лише заголовок облікових даних, і він ніколи не включає `Access-Control-Allow-Credentials`. Анонімні відповіді (`REQUIRE_API_KEY=false`) використовують налаштований білий список походження, включаючи явну згоду `CORS_ALLOW_ALL=true`. |
| Загальнодоступний лише для читання (`/api/health`, …) | Жодного                     | Нечутливий; символ підстановки нешкідливий.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Отже **залишковий** вплив `CORS_ALLOW_ALL=true` обмежується: (a) перехресним походженням без облікових даних **читає** вже неавтентифікованих даних і (б) дозволити CORS**передпольотний пропуск** на маршрутах керування —, які все ще вимагають автентифікації, яку не може забезпечити сторінка між джерелами. Це так **ні** вектор викрадення сеансу або реєстраційних даних на спільному шляху CORS.

### Один справжній виняток — `/api/v1/agents/`

Маршрути Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) встановлюють свої **власні** Заголовки CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) і **робити** випромінюють `Access-Control-Allow-Origin: <origin>|*` разом із `Access-Control-Allow-Credentials: true`. Це єдина поверхня, де співіснують origin-echo та облікові дані, і це так **незалежно від `CORS_ALLOW_ALL`** . Ці маршрути автентифіковані керуванням (`requireManagementAuth`); Оператори, які відкривають інформаційну панель поза хостом, повинні знати, що це єдине місце, де дозволено читання з обліковими даними з іншого джерела за допомогою заголовків відповіді. Зведення до явного дозволеного списку відстежується окремо від цієї інструкції CORS.

## Контрольний лист виробництва

- **Ніколи не встановлюйте `CORS_ALLOW_ALL=true` у виробництві.** Залиште його не встановленим.
- Встановити **явний** список походження — або env var, або поле вкладки Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Якщо OmniRoute працює за зворотним проксі/тунелем (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS є **ні** ваш єдиний контроль — loopback route guard все ще захищає маршрути, здатні створювати (див. [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Не підробляйте `X-Forwarded-For: 127.0.0.1`, щоб "виправити" 403; що знову відкриває клас RCE, який закриває охорона маршруту.
- Підтвердьте стан виконання: на інформаційній панелі показано a **стійкий бурштиновий банер** під Dashboard → Security → Authorization Inventory щоразу, коли `CORS_ALLOW_ALL=true` працює, а `/api/settings/authz-inventory` повертає інструменти моніторингу конверта `cors: { allowAll, allowedOrigins }`, які можуть опитувати.

## Розробка зручності — дозволяє специфічне місцеве походження

Вам рідко потрібен шаблон підстановки навіть у розробці. Дозволити лише сервери розробників, які ви використовуєте:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origins are matched case-insensitively with the trailing slash ignored, so `http://localhost:3000` and `http://localhost:3000/` are equivalent. Той самий CSV можна встановити під час виконання в **Інформаційна панель → Security → CORS Дозволені джерела** без перезапуску.

## Ключі API проти сеансів cookie

- **Носій / `x-api-key` (поверхня виведення `/v1/*` ):** браузери ніколи не приєднують їх автоматично. CORS тут не є значущим бар’єром. — ключ API є бар’єром — тому ця поверхня навмисно дозволена, щоб браузер і клієнти Electron могли читати відповіді, на які вони вже мають право. Для розслабленого відлуння потрібен автентифікований суб’єкт (підтверджений ключ API або сеанс інформаційної панелі), а не лише заголовок облікових даних, і він ніколи не включає `Access-Control-Allow-Credentials`. Анонімні відповіді (`REQUIRE_API_KEY=false`) використовують налаштований білий список походження, включаючи явну згоду `CORS_ALLOW_ALL=true`. Відхилення автентифікації (401) залишаються читабельними, щоб клієнти могли виявити відкликаний або неправильно введений ключ (#5242): власний 401 конвеєра зберігає відлуння та маршрут, який відхиляє сам ключ після того, як конвеєр подав його як анонімний (`/v1/models` і `/v1beta/models` із налаштованою автентифікацією керування, `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` і кандидат автокомбінації з областю власника routes) додає луну до цього 401 через `credentialRejectionHeaders()`. Відлуння вказується на запиті, що містить заголовок облікових даних (`Authorization`, `x-api-key`, `x-goog-api-key` або файл cookie `auth_token` ), а не на тому, який із них перевірено маршрутом, і ніколи не поєднується з `Access-Control-Allow-Credentials`; тіло - це виправлена оболонка помилки. Маршрути керування під `/api/v1/` які охороняються `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`), не використовують цей виняток для відхилення облікових даних: із `REQUIRE_API_KEY=false` їхні відповіді 401/403 відповідають налаштованій політиці походження CORS.
- **Сеанс файлів cookie (інформаційна панель):** захищено за замовчуванням без помилок **і** через відсутність `Access-Control-Allow-Credentials` на спільному шляху. Зберігайте джерела management/dashboard поза будь-якою дозвільною конфігурацією; вони повинні залишатися точно закритими.

## Рукостискання WebSocket (`/v1/responses`, `/v1/ws`)

Браузери не застосовують CORS до WebSocket, тому транспорти WebSocket, які повертають висновок, самі перевіряють рукостискання `Origin` (`src/server/origin/wsOrigin.ts`): відповіді WebSocket (`/v1/responses`) і, коли OmniRoute проходить через `npm start` / `npm run dev`, міст `/v1/ws` і `/api/v1/ws`, який передає `/v1/chat/completions`, `/v1/messages` і `/v1/responses` як кадри. Міст запитує вердикт `/api/v1/ws?handshake=1` і відмовляється оновлювати, якщо цей маршрут не пройшов перевірку. Вимоги до автентифікації все ще застосовуються окремо. Перевірка походження проходить, коли:

- він не має заголовка `Origin` (Codex CLI, SDKs та інші небраузерні клієнти);
- `Origin` прийнято в списку дозволених вище (`CORS_ALLOWED_ORIGINS`, налаштування `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` є одним із власних загальнодоступних джерел OmniRoute(налаштована загальнодоступна база URL, перенаправлене джерело довіреного проксі або прямий хост loopback/LAN, наданий як літерал IP або `localhost` — ті самі кандидати, які використовує перевірка мутацій на панелі інструментів); або
- він містить дійсний ключ API, як на поверхні HTTP `/v1/*`.

Все інше отримує `403 ws_origin_forbidden`. Файл cookie сеансу інформаційної панелі не звільняє від чужого `Origin`, оскільки браузер прикріплює його до сокета будь-якої сторінки. `localhost` на іншому порту не розглядається як вихідний; додати такі джерела розробників до `CORS_ALLOWED_ORIGINS`.

## Приклад: зворотний проксі перед OmniRoute

CORS забезпечується самим OmniRoute, тому проксі, як правило, повинен **ні** додати або переписати заголовки `Access-Control-*` (подвійні заголовки порушують роботу браузерів). Припинити TLS і переслати —, дозволити OmniRoute відповісти перед польотом:

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

Встановіть дозволені джерела веб-переглядача в OmniRoute (`CORS_ALLOWED_ORIGINS` або вкладка «Безпека»), а не в проксі.

## Вихідні файли

| Занепокоєння                                                       | Файл                                                                 |
| ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Вирішення білого списку + `getCorsStatus()`                        | `src/server/cors/origins.ts`                                         |
| Додаток проміжного програмного забезпечення (єдине джерело правди) | `src/server/authz/pipeline.ts`                                       |
| Налаштування → runtime origin injection                            | `src/lib/config/runtimeSettings.ts`                                  |
| Статус виконання для інформаційної панелі                          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Попереджувальний банер приладової панелі                           | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Поле дозволених джерел CORS                                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent для кожного маршруту CORS (виняток)                    | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket рукостискання `Origin` перевірка                         | `src/server/origin/wsOrigin.ts`                                      |

## Дивіться також

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback enforcement for spawn-active routes (окремий, додатковий контроль).
- [Керівництво з авторизації](../architecture/AUTHZ_GUIDE.md) — повний конвеєр авторизації.
