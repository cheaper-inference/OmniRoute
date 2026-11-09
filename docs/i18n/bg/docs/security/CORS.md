# CORS Configuration & Security (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute контролира кои **произход на браузъра** може да чете отговори от различни източници от един централизиран разрешен списък. Моделът е **неуспешно затворен по подразбиране** : не е позволен произход, докато не го включите. Тази страница документира как разрешеният списък разрешава, какво всъщност излага `CORS_ALLOW_ALL=true` (и, което е важно, какво прави **не** ), как да конфигурирате безопасно dev срещу production и предупреждението по време на изпълнение, което таблото за управление показва, когато заместващ знак е активен.

**Източник на истината:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Списъкът с разрешени се прилага веднъж, в междинния софтуер (`src/server/authz/pipeline.ts`) манипулаторите — за всеки маршрут не задават сами `Access-Control-Allow-Origin`.

## Как се разрешава произход

За всяка заявка междинният софтуер изчислява `Access-Control-Allow-Origin` стойността в този ред:

1. **`CORS_ALLOW_ALL=true`** (или наследеното `CORS_ORIGIN=*`) → отразява обратно `Origin` на повикващия (или `*`, когато няма `Origin` заглавка), със `Vary: Origin`, така че кешовете остават правилни. Същата `applyCorsHeaders()` chokepoint също добавя `Vary: Accept-Encoding` към всеки отговор 2xx-with-body на `/v1*`/`/v1beta*` повърхността, удостоверена с токен (`relaxForTokenAuth`, RFC 9110 §12.5.5, проблем #6737), така че downstream/shared кешовете могат правилно да разграничат компресираните спрямо некомпресираните варианти.
2. В противен случай заявката `Origin` се нормализира (с малки букви, завършващата наклонена черта е премахната) и се съпоставя с **обединен разрешен списък** :
   - околна среда **`CORS_ALLOWED_ORIGINS`** — списък, разделен със запетая, и
   - времето за изпълнение **`corsOrigins`** настройка (Dashboard → Security → _CORS Allowed Origins_), инжектирана чрез `setRuntimeAllowedOrigins()` от `src/lib/config/runtimeSettings.ts`.
3. Няма съответствие →**не се излъчва `Access-Control-Allow-Origin` заглавка** . Браузърът блокира кръстосаното четене. Това е планираното по подразбиране затваряне при отказ.

| Env var                | Значение                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV с точен произход, който да се позволи (препоръчва се).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → ехо произволен произход (заместващ знак). Само Dev.                                 |
| `CORS_ORIGIN`          | Наследство. `*` се държи като `CORS_ALLOW_ALL`; към списъка с разрешени се добавя една стойност. |

## Моделът на заплахите — това, което `CORS_ALLOW_ALL=true` наистина излага

Общото предупреждение OWASP („заместващ знак CORS = всеки сайт може да извика вашия API“) си струва да се приеме сериозно, но излагането на OmniRoute е **по-тесен от общия случай** , поради един конкретен факт на изпълнение:

> **Централният `applyCorsHeaders()` никога не излъчва `Access-Control-Allow-Credentials`.** Браузърът няма да изложи _credentialed_ (носещ бисквитка) кръстосан отговор, освен ако сървърът не изпрати `Access-Control-Allow-Credentials: true`. Споделеният CORS път на OmniRoute никога не го прави.

Какво означава това за повърхност, дори и със `CORS_ALLOW_ALL=true`:

| Повърхност                                 | Механизъм за удостоверяване    | Ефект на заместващия знак CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Табло / MANAGEMENT `/api/*`                | Сесия на бисквитки             | Произходът се повтаря, но **без `Allow-Credentials`** браузъра **блокове** акредитираният прочете. Злонамерен кръстосан сайт **не може да чете** вашите автентифицирани отговори на таблото за управление и бисквитката на сесията не е разкрита.                                                                                                                                                                                                                                                                                                      |
| Клиент API `/v1/*`, `/v1beta/*`            | Носител / `x-api-key` заглавие | Вече разрешително **по дизайн** (`relaxForTokenAuth`): браузърите никога не прикачват автоматично `Authorization`/`x-api-key`, така че страницата на атакуващия не може да предостави вашия ключ. Спокойното ехо изисква удостоверен субект (валидиран API ключ или сесия на таблото), а не само заглавка на идентификационните данни и никога не включва `Access-Control-Allow-Credentials`. Анонимните отговори (`REQUIRE_API_KEY=false`) използват конфигурирания разрешен списък за произход, включително изрично `CORS_ALLOW_ALL=true` включване. |
| Публично само за четене (`/api/health`, …) | Няма                           | Нечувствителен; заместващият знак е безвреден.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

Така че **остатъчен** излагането на `CORS_ALLOW_ALL=true` е ограничено до: (a) некредитиран кръстосан произход **чете** на вече неавтентифицирани данни и (б) позволяване CORS**предполетна карта** на маршрути за управление —, които все още изискват удостоверяване, което страницата с различен произход не може да предостави. Така е **не** вектор за отвличане на сесия или кражба на идентификационни данни на споделения CORS път.

### Едно истинско изключение — `/api/v1/agents/`

Маршрутите на Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) задават своите **собствени** CORS заглавки (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) и **направи** излъчват `Access-Control-Allow-Origin: <origin>|*` заедно със `Access-Control-Allow-Credentials: true`. Това е единствената повърхност, където съжителстват origin-echo и идентификационни данни, и това е така **независимо от `CORS_ALLOW_ALL`** . Тези маршрути са удостоверени от управление (`requireManagementAuth`); операторите, които излагат таблото за управление извън хоста, трябва да знаят, че това е единственото място, където четенето с идентификационни данни от кръстосан произход е разрешено от заглавките на отговора. Затягането му към изричен разрешен списък се проследява отделно от това ръководство CORS.

## Контролен списък за производство

- **Никога не задавайте `CORS_ALLOW_ALL=true` в производство.** Оставете го ненастроено.
- Задайте **изрично** списък на произход — или env var или полето Security-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ако OmniRoute работи зад обратен прокси/тунел (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS е **не** вашият единствен контрол — защитата на loopback route все още защитава маршрути, способни да генерират хайвер (вижте [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Не подправяйте `X-Forwarded-For: 127.0.0.1`, за да "поправите" 403; който отваря отново RCE класа, който защитата на маршрута затваря.
- Потвърдете състоянието на изпълнение: таблото за управление показва a **устойчив кехлибарен банер** под таблото за управление → Security → Authorization Inventory всеки път, когато `CORS_ALLOW_ALL=true` е на живо, и `/api/settings/authz-inventory` връща `cors: { allowAll, allowedOrigins }` плик, инструментите за наблюдение могат да анкетират.

## Удобство за разработка — позволява специфичен местен произход

Рядко се нуждаете от заместващия знак дори в dev. Разрешете само сървърите за разработка, които използвате:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Произходите се съпоставят без значение за малки и големи букви, като наклонената черта в края се игнорира, така че `http://localhost:3000` и `http://localhost:3000/` са еквивалентни. Същият CSV може да бъде зададен по време на изпълнение в **Табло за управление → Сигурност → CORS Разрешен произход** без рестартиране.

## API ключове срещу бисквитки сесии

- **Носител / `x-api-key` (изводната повърхност `/v1/*` ):** браузърите никога не ги прикачват автоматично. CORS не е смислена бариера тук — ключът API е бариерата —, поради което тази повърхност е умишлено разрешителна, така че клиентите на браузъра и Electron да могат да четат отговорите, на които вече имат право. Спокойното ехо изисква удостоверен субект (валидиран API ключ или сесия на таблото), а не само заглавка на идентификационните данни и никога не включва `Access-Control-Allow-Credentials`. Анонимните отговори (`REQUIRE_API_KEY=false`) използват конфигурирания разрешен списък за произход, включително изрично включване `CORS_ALLOW_ALL=true`. Отхвърлянията на удостоверяване (401) остават четими, така че клиентите да могат да покажат отменен или неправилно въведен ключ (#5242): собственият 401 на конвейера запазва ехото и маршрут, който отказва самия ключ, след като конвейерът го е обслужил като анонимен (`/v1/models` и `/v1beta/models` с конфигурирано удостоверяване на управление, `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` и кандидат за автоматично комбиниране с обхват на собственика routes) добавя ехото към този 401 чрез `credentialRejectionHeaders()`. Ехото се въвежда на заявката, носеща заглавка на идентификационните данни (`Authorization`, `x-api-key`, `x-goog-api-key` или бисквитката `auth_token` ), а не на кой от тях е проверен от маршрута, и никога не се свързва с `Access-Control-Allow-Credentials`; тялото е фиксирана обвивка за грешка. Маршрутите за управление под `/api/v1/` охранявани от `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`), не използват това изключение за отхвърляне на идентификационни данни: с `REQUIRE_API_KEY=false` техните 401/403 отговори следват конфигурираната политика за произход CORS.
- **Сесия на бисквитки (таблото):** защитен от фаил-затворен по подразбиране **и** поради липсата на `Access-Control-Allow-Credentials` на споделения път. Пазете произхода management/dashboard от всяка разрешителна конфигурация; те трябва да останат точно затворени.

## WebSocket ръкостискания (`/v1/responses`, `/v1/ws`)

Браузърите не прилагат CORS към WebSocket, така че WebSocket транспортите, които връщат резултат за извод, проверяват самите ръкостискане `Origin` (`src/server/origin/wsOrigin.ts`): Отговорите WebSocket (`/v1/responses`) и, когато OmniRoute преминава през `npm start` / `npm run dev`, `/v1/ws` и `/api/v1/ws` мостът, който предава `/v1/chat/completions`, `/v1/messages` и `/v1/responses` като рамки. Мостът пита `/api/v1/ws?handshake=1` за присъдата и отказва да надстрои, освен ако този маршрут не изпълни проверката. Изискванията за удостоверяване все още се прилагат отделно. Проверката за произход преминава, когато:

- няма `Origin` хедър (Codex CLI, SDKs и други клиенти без браузър);
- `Origin` е допуснат от списъка с разрешени по-горе (`CORS_ALLOWED_ORIGINS`, настройката на `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` е един от собствените публични източници на OmniRoute(конфигурираната публична база URL, пренасочен източник на доверен прокси или директен loopback/LAN хост, даден като IP литерал или `localhost` — същите кандидати, които използва проверката за мутация на таблото за управление); или
- той носи валиден API ключ, както на HTTP `/v1/*` повърхността.

Всичко друго получава `403 ws_origin_forbidden`. Бисквитката на сесията на таблото за управление не освобождава чужд `Origin`, тъй като браузърът я прикачва към сокета на всяка страница. `localhost` на друг порт не се третира като същия произход; добавете такива разработчици към `CORS_ALLOWED_ORIGINS`.

## Пример: обратен прокси пред OmniRoute

CORS се налага от самия OmniRoute, така че проксито обикновено трябва **не** добавяне или пренаписване `Access-Control-*` заглавки (двойните заглавки развалят браузърите). Прекратете TLS и препратете —, оставете OmniRoute да отговори преди полет:

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

Задайте разрешените източници на браузъра в OmniRoute (`CORS_ALLOWED_ORIGINS` или раздела Сигурност), а не в проксито.

## Изходни файлове

| Загриженост                                                   | Файл                                                                 |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Резолюция на списък с разрешени + `getCorsStatus()`           | `src/server/cors/origins.ts`                                         |
| Приложение за междинен софтуер (единствен източник на истина) | `src/server/authz/pipeline.ts`                                       |
| Настройки → начално инжектиране по време на изпълнение        | `src/lib/config/runtimeSettings.ts`                                  |
| Състояние на изпълнение за таблото за управление              | `src/app/api/settings/authz-inventory/route.ts`                      |
| Предупредителен банер на таблото                              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Поле за разрешен произход CORS                                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent за всеки маршрут CORS (изключение)                | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket ръкостискане `Origin` проверка                      | `src/server/origin/wsOrigin.ts`                                      |

## Вижте също

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback enforcement за маршрути с възможност за създаване на хайвер (отделен, допълнителен контрол).
- [Ръководство за оторизация](../architecture/AUTHZ_GUIDE.md) — тръбопроводът за пълно удостоверяване.
