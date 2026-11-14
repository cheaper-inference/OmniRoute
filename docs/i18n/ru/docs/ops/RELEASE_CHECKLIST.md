# Release Checklist (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Последнее обновление:** 2026-08-28 — v3.8.51
> Оптимизированный процесс выпуска, использующий навыки Claude Code для автоматизации.
>
> **Поддерживайте очередь/ветку в рабочем состоянии между выпусками:** см. [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (семейство `/green-prs` + `npm run check:release-green` + `/babysit` + ночной запуск). Периодическое выполнение
> этих действий — и особенно **перед** этим контрольным списком — позволяет начать работу над PR выпуска без ошибок.

## Кратко

```bash
# 1. Обновите версию и сгенерируйте CHANGELOG (навык)
/version-bump-cc patch    # или minor/major

# 2. Запустите локальную проверку качества
npm run check              # линтинг + тесты
npm run test:coverage      # полная проверка покрытия (60/60/60/60)

# 3. Выполните сборку и дымовое тестирование
npm run build
npm run test:e2e           # необязательно, но рекомендуется

# 4. Сгенерируйте выпуск (навык)
/generate-release-cc

# 5. Выполните развёртывание (навык)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Соберите свидетельства выпуска (навык)
/capture-release-evidences-cc
```

## Доверенная публикация npm (по умолчанию с v3.8.51) — по запросу с промежуточным размещением, прямая как резервный вариант

`npm-publish.yml` по умолчанию публикует через **доверенную публикацию npm (OIDC)**:
задание `stage-npm` (на инфраструктуре GitHub) обменивает id-token GitHub на краткосрочные
учётные данные npm для этого запуска — без долгоживущего токена npm в секретах репозитория,
без запроса 2FA и с прикреплённым подтверждением происхождения.
Это разрешённый npm способ обхода в условиях отказа от токенов, позволяющих пропускать 2FA;
он восстанавливает полностью автоматический процесс, использовавшийся в проекте до v3.8.48,
сохраняя при этом гарантию WS1.3 (утёкший токен сам по себе не позволяет выполнить публикацию —
токена вообще нет).

**Однократная настройка (владелец):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: владелец `diegosouzapw`, репозиторий `OmniRoute`, рабочий процесс `npm-publish.yml`
(окружение: отсутствует). Пока эта настройка не выполнена, автоматический шаг завершается ошибкой `ENEEDAUTH`:
повторно запустите его с `publish_mode=staged` (см. ниже) или `direct`.

### Публикация с промежуточным размещением (по запросу — `publish_mode=staged`)

Рабочий процесс npm-publish больше не публикует пакет напрямую: он запускает упакованный tar-архив
(`check:pack-boot`), а затем выполняет `npm stage publish` — в реестре размещаются в точности те же байты,
но установить их **нельзя**, пока владелец не даст одобрение. Проверка 2FA человеком перенесена
на этап ПОСЛЕ проверки, а не до неё.

**Действия владельца после успешного завершения рабочего процесса:**

1. `npm stage list omniroute` — найдите идентификатор промежуточного размещения (он также выводится в сводке рабочего процесса).
2. Проверьте размещённые байты (рекомендуется): выполните `npm stage download <id>`, затем установите
   загруженный tar-архив во временный префикс и запустите его (`npm run check:pack-boot` автоматизирует
   в CI аналогичную проверку упаковки→установки→запуска).
3. `npm stage approve <id>` — запрос 2FA ЯВЛЯЕТСЯ публикацией. `npm stage reject <id>` отменяет размещение.
4. Защита после публикации: средство проверки после публикации (WS1.4 плана v3.8.49) устанавливает
   опубликованную версию из общедоступного реестра в чистом контейнере и запускает её.

**Аварийный резервный вариант:** `workflow_dispatch` с `publish_mode=direct` восстанавливает
прежний режим немедленного выполнения `npm publish` (используйте только при сбоях самого промежуточного
размещения; зафиксируйте причину).

**Однократное усиление защиты (владелец, npmjs.com):** настройте доверенного издателя для
`omniroute` в режиме только промежуточного размещения, чтобы утёкший долгоживущий токен не позволял
выполнить `npm publish` напрямую откуда-либо — CI может лишь разместить пакет; выпустить его может
только владелец с помощью 2FA.

**Порядок действий при повреждённом артефакте (без изменений):** по умолчанию сразу выполняйте
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` (занимает несколько минут, обратимо);
используйте `npm unpublish` только в пределах 72 часов при отсутствии зависимых пакетов и никогда
не прибегайте к нему в первую очередь. Docker: никогда не перезаписывайте тег версии — для отката
перенаправьте `latest` на последний рабочий дайджест.

**Docker Hub `latest` (обязательно для каждой публикации стабильной версии SemVer):**
рабочий процесс `docker-publish` должен назначить теги **и** `X.Y.Z`, **и**, если
`should-promote-latest.sh` подтверждает, что это самая высокая стабильная версия SemVer, `:latest`
с **одним и тем же дайджестом**. После выполнения задания: дайджест `latest` в Hub должен совпадать
с дайджестом новой версии SemVer, а значение `last_updated` должно обновиться. Не оставляйте `:latest`
на более старой сборке, когда в примечаниях к выпуску говорится об исправлениях, существующих только
в git. Примеры быстрого запуска Compose используют `:latest`; в GitOps следует по-прежнему закреплять
`X.Y.Z`. См. [Каналы выпусков Docker](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Ускоренный процесс для хотфиксов (метка `hotfix`)

PR с меткой `hotfix` пропускает ресурсоёмкую матрицу CI (E2E с 9 шардами, контроль порогов покрытия,
quality-gate, quality-extended), сохраняя быстрые и информативные проверки: сборку,
шарды модульных тестов, интеграционные тесты, vitest, линтинг/проверку типов, синхронизацию документации, `check:pack-artifact`
и проверку запуска из tarball (`check:pack-boot`). Цель: получить зелёный статус не более чем за 15 минут вместо ~33 минут.

**Политика допуска — обязательны все четыре условия (по модели аварийных процессов Chromium/VS Code/Node):**

1. **Критичность**: продакшен не работает — опубликованный артефакт аварийно завершается при запуске /
   требуется исправление безопасности / затронут каждый пользователь релиза. «Важно» не означает «сломано».
2. **Полномочия**: метку `hotfix` применяет только владелец репозитория. Сама метка ЯВЛЯЕТСЯ
   одобрением — никогда не назначайте её самостоятельно в PR кампании.
3. **Доказательства**: в описании PR есть ссылка на предыдущий полностью успешный ресурсоёмкий запуск (набор проверок,
   который повторно выполнили бы пропущенные задания), а также собственный тест исправления, сначала завершавшийся ошибкой, а затем успешно.
4. **Объём изменений**: только cherry-pick — минимальное исправление, без рефакторинга и попутных изменений.

Пропущенные проверки покрытия/порогов повторно выполняются при следующем полном запуске в
ветке релиза (непрерывное поддержание зелёного статуса релиза) — ускоренный процесс пропускает ОЖИДАНИЕ, но не проверку.
Изменения только в тестах (все файлы находятся в `tests/`, ни одного в `tests/e2e/`) автоматически пропускают
матрицу E2E без какой-либо метки.

## Подробный контрольный список

### Предварительная версия

- [ ] Все PRs предназначенные для этой версии, объединены с `release/vX.Y.0`
- [ ] Все открытые элементы Linear/issue для этой версии закрыты или перенесены на следующую веху.
- [ ] CI зеленый на ветке `release/vX.Y.0`
- [ ] В коде нет маркеров `TODO(release)` : `grep -r "TODO(release)" src/ open-sse/`
- [ ] Базовый образ Docker обновлен (в настоящее время `node:24.15.0-trixie-slim`)

### Версия и журнал изменений

- [ ] Запустите `/version-bump-cc <patch|minor|major>` (навык кода Claude )
  - Удары `package.json`, `electron/package.json`
  - Восстанавливает `CHANGELOG.md` из коммитов git с момента последнего тега.
  - Обновления значков README.md
- [ ] Вручную просмотрите CHANGELOG.md и при необходимости очистите сообщения о фиксации.
- [ ] Убедитесь, что последний раздел semver в `CHANGELOG.md` равен версии `package.json`
- [ ] Оставьте `## [Unreleased]` в качестве первого раздела журнала изменений для предстоящей работы.
- [ ] Обновление `docs/openapi.yaml` → `info.version` должно соответствовать версии `package.json`

### Качество кода

- [ ] `npm run lint` — 0 ошибок (предупреждения уже существуют)
- [ ] `npm run typecheck:core` — очистить
- [ ] `npm run typecheck:noimplicit:core` — чистый (строгий)
- [ ] `npm run check:cycles:ratchet` — в пределах замороженного потолка `metrics.cycles` (голый `check:cycles` выходит из 1 в любом цикле, #15281)
- [ ] `npm run check:any-budget:t11` — в рамках бюджета
- [ ] `npm run check:route-validation:t06` — очистить
- [ ] `npm run check:node-runtime` — соответствует минимальному уровню времени выполнения (`>=22.22.2 <23`, `>=24.0.0 <27`, per `SUPPORTED_NODE_RANGE` в `src/shared/utils/nodeRuntimeSupport.ts`; согласовано с `package.json` `engines`)

### Тестирование

- [ ] пропуск `npm run test:unit` —
- [ ] проход `npm run test:vitest` — (сервер MCP, autoCombo, кеш)
- [ ] `npm run test:coverage` — ворота 60/60/60/60 удовлетворены (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (если изменения касаются DB /обработчиков)
- [ ] `npm run test:combo:matrix` — pass (матрица комбинированных стратегий: детерминированно подтверждает решения по выбору всех 22 общедоступных стратегий маршрутизации; запускается при касании комбинированной маршрутизации, разрешения стратегии или резервной логики)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (закрытый дым реального восходящего потока; создает снимок DB только для чтения из VPS `root@192.168.0.15`; обращается к реальным провайдерам, требует кредитов; никогда не запускается в CI; без шлюза пропускает чисто)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live Smoke: 7 сценариев HTTP против живого сервера `.15` через простой узел ESM; требуется `ssh root@192.168.0.15`; creates/deletes только комбинации `__live_test__*` ; работает с реальными провайдерами; никогда не запускается в CI)
- [ ] `npm run test:e2e` — pass (изменения UI )
- [ ] `npm run test:protocols:e2e` — pass (изменения MCP/A2A )
- [ ] пропуск `npm run test:ecosystem` —

### Крючки (проверено Husky)

Хуки Husky находятся в `.husky/` и автоматически запускаются при операциях git.

- **предварительная фиксация:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **предварительный толчок:** быстрые детерминированные вентили — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активированы 13 июня 2026 г.). Намеренно исключает `test:unit` (медленный; покрывается заданием CI `test-unit` ).
  - Запустите `npm run test:unit` вручную, прежде чем отправлять ветки релизов.

Если перехват не удается: устраните основную проблему, не обходите ее с помощью `--no-verify`.

### Обычные коммиты

Все коммиты, связанные с выпуском, должны соответствовать формату `type(scope): subject`.

**Допустимые типы:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Допустимые области действия:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Критические изменения: добавьте нижний колонтитул `BREAKING CHANGE:` или `!` после области действия (например, `feat(api)!: drop /v0`).

### Документация

- [ ] `npm run check:docs-sync` проходит (автоматический запуск по предварительной фиксации)
- [ ] `npm run check:docs-all` проходит (зонтик: docs-sync + docs-counts + env-doc-sync + устаревшие версии + doc-links)
- [ ] `npm run check:env-doc-sync` завершает работу 0 код — ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` контракт env не поврежден
- [ ] `npm run check:doc-links` завершает работу 0 — нет неработающих внутренних ссылок на уценку после реструктуризации
- [ ] `docs/architecture/ARCHITECTURE.md` рассмотрен для дрейфа storage/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` проверен на переменную окружения и операционный дрейф
- [ ] Если `.env.example` изменился: `docs/reference/ENVIRONMENT.md` обновлен.
- [ ] Если новая функция имеет UI: `docs/guides/USER_GUIDE.md` упоминает об этом.
- [ ] Если новая функция имеет API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` обновлено
- [ ] Если новая функция представляет собой модуль: существует выделенный `docs/<MODULE>.md`
- [ ] Если изменение критично: `docs/guides/TROUBLESHOOTING.md` есть примечание о миграции.

### i18n

- [ ] `npm run i18n:check` выходит из 0 состояния перевода — (`.i18n-state.json`) синхронно с исходными документами (в строгом режиме нет смещенных источников; рекомендации по режиму предупреждения приемлемы для доработок документа в последнюю минуту, но перед пометкой тегов должно быть 0)
- [ ] `npm run i18n:check-ui-coverage` выходит из 0 — для каждой локали UI при минимальном покрытии 80 % или выше.
- [ ] `npm run i18n:sync-ui:dry` сообщает об 0 отсутствующих ключах во всех 66 целевых локалях (все локали, кроме источника `en` )
- [ ] Если исходная документация на английском языке изменилась, запустите `npm run i18n:run` (требуется `OMNIROUTE_TRANSLATION_API_KEY` в `.env`) перед добавлением тегов.
- [ ] Если вклад в перевод незначителен, его можно отложить до следующего выпуска (следить в CHANGELOG).

### Миграция базы данных

- [ ] Если у `src/lib/db/migrations/` есть новые файлы:
  - [ ] Каждая миграция идемпотентна (`CREATE TABLE IF NOT EXISTS` и т.д.).
  - [ ] Миграции, заключенные в транзакции
  - [ ] Нумерация правильная (без пропусков в последовательности)
- [ ] Проверьте новую установку: удалите `~/.omniroute/omniroute.db` и запустите `npm run dev`
- [ ] Тестирование существующей установки: резервное копирование DB, запуск миграции, проверка схемы.
- [ ] файлы WAL (`-wal`, `-shm`) обрабатываются правильно, если миграция перезаписывает таблицы

### Каталог поставщиков (проверено Zod)

- [ ] Схема `src/shared/constants/providers.ts` Zod действительна во время загрузки
  - [ ] У всех провайдеров есть обязательные поля (`id`, `label`, `kind` и т. д.).
  - [ ] `freeNote` предоставлен для новых бесплатных провайдеров
  - [ ] Поставщики OAuth зарегистрировали `oauthConfig` в `src/lib/oauth/constants/oauth.ts`
- [ ] Если добавлен новый провайдер: соответствующий исполнитель в `open-sse/executors/`
- [ ] Если формат не OpenAI: переводчик в `open-sse/translator/`
- [ ] Модели зарегистрированные в `open-sse/config/providerRegistry.ts`
- [ ] Модульные тесты в `tests/unit/` охватывают классификацию и маршрутизацию поставщиков

### Рабочий стол (Electron)

Если `electron/` изменился:

- [ ] `npm run electron:smoke:packaged` проходит
- [ ] Сборки проверены хотя бы на одном из `:win`, `:mac`, `:linux`
- [ ] Срок действия сертификатов подписи кода не истек (при подписании)
- [ ] версия `electron/package.json` соответствует корню `package.json`
- [ ] Указатель канала автоматического обновления обновляется при выпуске на `stable`

### Макет сборки

В репозитории используются три отдельных выходных каталога — никогда их не смешивайте:

| Каталог   | Цель                                                          | Отслеживается?   |
| --------- | ------------------------------------------------------------- | ---------------- |
| `src/`    | Источник приложения (TypeScript / TSX)                        | Да               |
| `.build/` | Построение промежуточных продуктов — `next build` (`distDir`) | Нет (gitignored) |
| `dist/`   | Поставляемый пакет npm — собранный `assembleStandalone`       | Нет (gitignored) |

> **Примечание оператора:** каталог удаленного образа VPS остается `/usr/lib/node_modules/omniroute/app/`. Только** в репо** Вывод сборки перемещен (`app/` → `dist/`). Навыки развертывания rsync содержимого `dist/` в удаленный каталог `app/` — не требуют изменения пути VPS.

**Поток одиночной сборки:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Запустите NOT `npm run build` а затем отдельный `npm run build:cli` для развертывания — используйте `npm run build:release`, который выполняет чистую перестройку + Sentinel с помощью одной команды.

### Проверка артефакта

- [ ] `npm run build:release` добивается успеха, а `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json` или другой локальный остаток
- [ ] `dist/server.js` существует после сборки
- [ ] Необязательный локальный дым во время выполнения пакета: `npm run dev:candidate -- validate` после того, как `npm run dev:candidate -- build` загружает упакованный tar-архив на изолированном `DATA_DIR` и проверяет `/api/health` + `/v1/models` (см. [Золотой путь вклада](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Маркировка и выпуск

- [ ] Запустите `/generate-release-cc` (навык кода Claude ):
  - Создает тег `vX.Y.Z`
  - Нажимает тег и ветку
  - Открывает выпуск GitHub с телом журнала изменений.
  - Прикрепляет установщики Electron (если встроены)
- [ ] Или вручную:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Развертывать

Навыки развертывания используют легкий поток rsync — no `npm pack`, no `npm i -g`:

- [ ] Используйте навык развертывания, соответствующий цели:
  - `/deploy-vps-local-cc` — локальный VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Акамай VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — оба
- [ ] Перед развертыванием подтвердите `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Сборка должна выполняться там, где существует `node_modules` (основная проверка или рабочее дерево `npm ci`'d — NOT рабочее дерево с символической ссылкой)
- [ ] Развернутый экземпляр дымового теста:
  - Откройте `/dashboard/health` →, проверьте, соответствует ли строка версии версии релизу
  - Запустите запрос `/v1/chat/completions` к известному провайдеру
  - Убедитесь, что `/api/monitoring/health` возвращает автоматические выключатели `CLOSED`
  - Подтвердите ответ транспорта MCP (`/mcp` HTTP, `/mcp-sse` SSE)

### Пост-релиз

- [ ] Запустите `/capture-release-evidences-cc` (навык кода Claude )
  - Содержит новые функции WebP screenshots/recordings
  - Прикрепляется к примечаниям к выпуску или сообщению в блоге.
- [ ] Обновление обсуждений GitHub / Discord с анонсом выпуска
- [ ] Открыть этап для следующей версии
- [ ] Если критично: закрепите обсуждение или опубликуйте в `news.json` баннер в приложении.

### Радарные ворота для публичного запуска

Объявление радара намеренно связано с `active: false`. Активация — это отдельное изменение после подтверждения каждого пункта ниже:

- [ ] Все составные PRs радара объединены, а подсказка CI становится зеленой.
- [ ] Разверните и прокопируйте маршруты OSS Radar с выключенным `RADAR_ENABLED` по умолчанию.
- [ ] Дымите `GET /planos`, `/termos`, `/privacidade` и `/reembolso` на указанном хосте Radar.
- [ ] Оператор записи identity/contact/address и юридическая проверка, одобренная владельцем, в частной службе
- [ ] Используйте Stripe Checkout и подписанный вебхук только в тестовом режиме.
- [ ] Осуществите одну зашифрованную доставку транзакционной электронной почты с помощью утвержденной sender/domain
- [ ] Докажите восстановление из резервной копии и одно контролируемое исследование, ограниченное бюджетом.
- [ ] Утвердите политику проверки BRL/PIX прежде чем принимать доказательства пожертвования.
- [ ] Включите общедоступную кассу только после предыдущих шлюзов, затем активируйте новый `news.json` ID
- [ ] Убедитесь, что главный баннер использует локализованную копию и новый ID появляется снова после закрытия старого ID

## Дымовая проверка встроенных сервисов (v3.8.4+)

Перед выпуском любого релиза, включающего изменения встроенных сервисов, проверьте:

### Запуск с чистой БД (выявляет конфликты миграций — добавлено после хотфикса v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — подождите 10 с, пока завершится запуск
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` возвращает `"9router"` (НЕ 404 и НЕ 500). Это подтверждает, что миграция `071_services.sql` применена и строка добавлена.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` возвращает 3 строки.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` возвращает 2 строки (подтверждает применение `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` выполняется успешно — защищает от будущих конфликтов.

### 9Router

- [ ] `POST /api/services/9router/install` возвращает 200 с `installedVersion` менее чем за 2 мин
- [ ] `POST /api/services/9router/start` возвращает 200 и `state: "running"` менее чем за 30 с
- [ ] `GET /api/services/9router/status` сообщает `health: "healthy"`
- [ ] `POST /v1/chat/completions` с `"model": "9router/auto/..."` возвращает 200 (сквозная маршрутизация через 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` отображает нативный интерфейс 9Router внутри прокси (без прямого iframe с `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` возвращает `{ keyRotated: true }`, а сервис корректно перезапускается
- [ ] `POST /api/services/9router/stop` возвращает 200 и `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` возвращает поток SSE с событием `snapshot`, содержащим последние строки
- [ ] Установка в окружении без `npm` в PATH возвращает 500 с понятным сообщением об ошибке (без трассировки стека)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` возвращает 200 менее чем за 2 мин
- [ ] `POST /api/services/cliproxy/start` возвращает 200 и `state: "running"` менее чем за 30 с
- [ ] `GET /api/services/cliproxy/status` сообщает `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` возвращает 200 и `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` возвращает поток SSE

### Проверка регрессий безопасности

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` возвращает `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` возвращает `403 LOCAL_ONLY`
- [ ] Ответы с ошибками от `/api/services/*` не содержат `err.stack` или абсолютных путей к файлам

## Проверки для v3.8.0+

Перед выпуском любого релиза v3.8.x проверьте следующие дополнительные пункты:

- [ ] `omniroute --tray` запускается в macOS (systray2 установлен в `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` запускается в Linux (требуется DISPLAY; корректная ошибка, если он не задан)
- [ ] `omniroute --tray` запускается в Windows (PowerShell NotifyIcon, без дополнительных исполняемых файлов)
- [ ] `omniroute config tray enable` создаёт запись автозапуска; отключение удаляет её
- [ ] `npm install -g omniroute@<this-version>` выполняет postinstall без аварийного завершения
- [ ] Процесс обновления сохраняет необязательные зависимости: `omniroute update --apply` и автоматическое обновление
      запускают `npm install -g … --include=optional`, чтобы `optionalDependencies` (better-sqlite3,
      keytar, tls-client и стек SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) сохранялись после обновления. Для уровня SLM ultra с `modelPath` также необходима
      модель tinybert, автоматически загружаемая в `${DATA_DIR}/models/llmlingua` при первом использовании. Затем postinstall
      (`scripts/build/colocateOptionals.mjs`) размещает замыкание необязательных зависимостей SLM в
      `dist/node_modules`, чтобы воркер разрешал ЕДИНСТВЕННЫЙ экземпляр `@huggingface/transformers` ^4.2.0
      — автономная трассировка включает в пакет только transformers, но не динамически импортируемые
      необязательные зависимости, поэтому без этого воркер загрузил бы llmlingua-2 с transformers из корня,
      а уровень SLM незаметно перешёл бы в режим открытого отказа.
- [ ] `omniroute status` работает без `.env` (путь токена CLI, только loopback)
- [ ] `curl http://localhost:20128/api/shutdown` возвращает 401 (маршрут всегда защищён)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` возвращает 401 (защита loopback)
- [ ] Среда выполнения SQLite при первом запуске разрешается в `bundled` (встроенный бинарный файл подходит для платформы)
- [ ] Среда выполнения SQLite переключается на `runtime`, когда `node_modules/better-sqlite3` удалён
- [ ] Умный фильтр MCP сжимает реальные выходные данные `playwright-mcp browser_snapshot` (сокращение ≥50%)
- [ ] Все 10 файлов `skills/omniroute*/SKILL.md` общедоступны по прямому URL GitHub
- [ ] При первоначальной настройке мастер адаптации показывает этап обзора уровней «Как это работает»
- [ ] Виджет покрытия уровней на главной панели мониторинга показывает количество настроенных/активных уровней

---

## Ответвление 3.9.0 LTS (репетиция в 3.8.58)

После v3.8.59 следующей версией будет 3.9.0, а её верхушка станет основой двух долгоживущих веток:
`stable/v3` (линейка v3 LTS, npm `latest`) и `develop` (v4, версия повышена до 4.0.0, npm
`nightly`). Модель веток/каналов, перенос изменений вперёд и метки описаны в
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); план приведён в [ROADMAP](../../ROADMAP.md) (этап 3). Ответвление выполняется один раз;
в 3.8.58 оно полностью репетируется в форке, а работа над 3.8.59 завершается
[контрольным списком GO/NO-GO](./LTS_GO_NO_GO.md).

### Пробный запуск (только чтение, безопасен в любое время)

```bash
npm run release:dry-run-lts-cut                       # реальное ответвление: 3.9.0 из HEAD, предыдущий тег v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # зафиксировать исходный коммит
```

`scripts/release/dry-run-lts-cut.mjs` ничего не выполняет: он считывает данные из git и `gh` и выводит
всю последовательность — предварительные условия (исходная ссылка разрешается, исходный репозиторий содержит полную историю —
из поверхностного клона нельзя отправить `stable/v3`, принимающая сторона отклонит пакет на первом
искусственно присоединённом родительском коммите, поэтому сначала выполняйте ответвление из полного клона или запустите
`git fetch --unshallow origin`; предыдущий тег существует, в `package.json` указана целевая версия,
открыта задача `release-freeze`, нет открытой задачи `Release branch not green`
для существующей релизной ветки — для несуществующей ветки выводится `?`, то есть неизвестное состояние, но никогда
не зелёное; очередь Mergify `release` настроена (G11: `queue_rules`, `checks_timeout`,
метка `queue`), набор правил `release/*` по-прежнему запрещает удаление и принудительную отправку, а
`stable/v3` и `develop` ещё не существуют), два шага создания веток, какие триггеры неактивных рабочих процессов
и условия `if:` становятся истинными (и какие остаются заблокированными переменной репозитория или
привязанными к каноническому репозиторию), ожидаемые dist-теги (`latest` → 3.9.0, `next` и
`nightly` пусты) и откат. Код выхода `0` = `RESULT: READY`, `1` = не выполнено блокирующее предварительное
условие (`✗`), `2` = ошибка использования. `--advisory <id,...>` понижает проверку до предупреждения (`!`),
не скрывая её.

Выполните пробный запуск реального ответвления, пока заморозка релиза 3.9.0 ещё действует — ветки
создаются после тега и до снятия заморозки на этапе 12c.

### Репетиция 3.8.58 (только в форке)

```bash
# 1. Пробный запуск на текущей верхушке с параметрами репетиции
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Выполнение с удалённым репозиторием-ФОРКОМ (origin или любой удалённый репозиторий, URL которого
#    указывает на канонический репозиторий, будет отклонён; каждый шаг запрашивает подтверждение в терминале)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Запуск неактивных рабочих процессов в форке (workflow_dispatch там, где пробный запуск
#    сообщает о привязке к каноническому репозиторию), затем откат
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Коммит повышения версии в develop создаётся с помощью низкоуровневых средств git (рабочее дерево не затрагивается) и обновляет
те же пять файлов, что и коммит открытия цикла: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` и `docs/openapi.yaml`. Раздел `[4.0.0]`
в CHANGELOG и его локализованные копии открываются в `develop` после этого, до первого
PR. Скрипт никогда не изменяет dist-теги npm — репетируйте эти действия на тестовом пакете.

### Артефакт предварительной сборки PR (собрать один раз, продвигать те же байты)

`.github/workflows/preview-artifact.yml` создаёт один рабочий tarball из верхушки PR и
проверяет именно эту сборку (часть (a) задачи #8084). Только для PR из того же репозитория; ничего не публикуется.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # или добавьте метку `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # установка предварительной сборки
```

При запуске выполняются `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, упаковка
tarball, запуск `npm run check:pack-boot` (фиктивные секреты, временный каталог данных), повторная упаковка
и завершение с ошибкой, если хеш отличается; затем записывается `artifact-identity.json` (SHA верхушки, SHA
базовой ветки, хеш lock-файла, платформа, архитектура, ABI Node, сборщик, политика сборки —
`scripts/release/artifact-identity.mjs`), а tarball аттестуется в отдельной задаче. Продвижение
предварительной сборки означает установку этого tarball: никогда не пересобирайте его из исходного кода.

### Ответвление (3.9.0, после GO)

1. Решение GO зафиксировано в [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` выводит `RESULT: READY`.
3. Создайте ветки в `origin` вручную с помощью команд, выведенных пробным запуском, —
   скрипт отказывается отправлять изменения в `origin`. Чтобы повторно использовать проверенный коммит develop, сначала запустите
   репетицию с `--execute` на верхушке 3.9.0 в своём форке; скрипт выведет оба SHA, после чего
   можно отправить те же коммиты:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Защитите `stable/v3` и `develop` (наборы правил + очередь слияния) до принятия первого PR.
5. Неактивные рабочие процессы включаются при наличии ветки: `forward-port.yml` (отправка изменений в
   `stable/v3`), `validate-stable-pr.yml` (PR в `stable/v3`) и `nightly-v4-build.yml`
   (сборка `develop`). Перед вводом в эксплуатацию задайте секрет репозитория `secrets.FORWARD_PORT_TOKEN` (чтобы CI запускался для
   PR с переносом изменений вперёд); ночная публикация останется отключённой, пока владелец не задаст переменной репозитория
   `vars.NIGHTLY_PUBLISH` значение `true` и npm Trusted Publishing не разрешит
   `nightly-v4-build.yml`. Канал определяется скриптом `scripts/release/dist-tag.mjs` — тем же
   средством определения, которое использует `npm-publish.yml`.
6. Проверьте каналы: вывод `npm view omniroute dist-tags --json` должен показывать `latest` = 3.9.0 и отсутствие
   `next` / `nightly` до публикации v4.
7. Откат при необходимости: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   и `npm dist-tag add omniroute@3.8.59 latest`.

---

## Откат

Если в релизе обнаружена критическая проблема:

1. `gh release edit vX.Y.Z --prerelease` (помечает релиз как не являющийся последним)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (только если пользователи ещё не начали его использовать)
3. Или: исправление в `release/vX.Y.0` → патч-релиз `vX.Y.(Z+1)`
4. Немедленно сообщите об этом в GitHub Discussions и Discord

## Строгие правила

- Никогда не выполняйте коммиты напрямую в `main`
- Никогда не используйте `git push --force` для веток `main` или `release/*`
- Никогда не пропускайте хуки Husky (`--no-verify`)
- Никогда не добавляйте в коммиты секреты, учётные данные или файлы `.env`
- Покрытие должно оставаться ≥60/60/60/60 (операторы/строки/функции/ветви)
- При изменении рабочего кода в `src/`, `open-sse/`, `electron/` или `bin/` всегда добавляйте или обновляйте тесты

## Автоматическая проверка синхронизации

Перед созданием PR локально запустите проверку синхронизации документации:

```bash
npm run check:docs-sync
```

CI также запускает эту проверку в `.github/workflows/ci.yml` (задача lint).
