# Release Checklist (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Последна актуализация:** 2026-08-28 — v3.8.51
> Опростен процес за издаване на версии, който използва уменията на Claude Code за автоматизация.
>
> **Поддържайте опашката/клона в изправно състояние между изданията:** вижте [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (семейството `/green-prs` + `npm run check:release-green` + `/babysit` + нощно изпълнение). Периодичното
> изпълнение на това — и особено **преди** този контролен списък — гарантира, че PR-ът за изданието започва в изправно състояние.

## Накратко

```bash
# 1. Увеличаване на версията + генериране на CHANGELOG (умение)
/version-bump-cc patch    # или minor/major

# 2. Локално изпълнение на проверките за качество
npm run check              # lint + тестове
npm run test:coverage      # пълна проверка на покритието (60/60/60/60)

# 3. Компилиране и базова проверка
npm run build
npm run test:e2e           # незадължително, но препоръчително

# 4. Генериране на изданието (умение)
/generate-release-cc

# 5. Внедряване (умение)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Събиране на доказателства за изданието (умение)
/capture-release-evidences-cc
```

## Доверено публикуване в npm (по подразбиране от v3.8.51) — поетапно при заявка, директно като резервен вариант

`npm-publish.yml` публикува чрез **npm Trusted Publishing (OIDC)** по подразбиране:
задачата `stage-npm` (хоствана от GitHub) обменя id-token на GitHub за краткосрочни идентификационни
данни за npm за съответното изпълнение — без дългосрочен npm токен в тайните на хранилището, без подкана за 2FA и с приложено удостоверение за произход.
Това е заобикалящият механизъм, който npm позволява сега, когато токените, пропускащи 2FA, постепенно се извеждат от употреба;
той възстановява напълно автоматичния процес, който проектът имаше до v3.8.48, като същевременно запазва
гаранцията на WS1.3 (изтекъл токен не може самостоятелно да публикува — такъв токен няма).

**Еднократна настройка (собственик):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: собственик `diegosouzapw`, хранилище `OmniRoute`, работен процес `npm-publish.yml`
(среда: няма). Докато това не бъде настроено, автоматичната стъпка завършва неуспешно с `ENEEDAUTH`:
стартирайте я повторно с `publish_mode=staged` (по-долу) или `direct`.

### Поетапно публикуване (при заявка — `publish_mode=staged`)

Работният процес за публикуване в npm вече не публикува директно: той стартира пакетирания tarball
(`check:pack-boot`) и след това изпълнява `npm stage publish` — точните байтове се съхраняват временно в
регистъра и **не могат да бъдат инсталирани**, докато собственикът не ги одобри. Човешката 2FA проверка е преместена
СЛЕД доказателството, а не преди него.

**Процес за собственика, след като работният процес завърши успешно:**

1. `npm stage list omniroute` — намерете идентификатора на етапа (той се отпечатва и в обобщението на работния процес).
2. Проверете поетапно съхранените байтове (препоръчително): `npm stage download <id>`, след което инсталирайте
   изтегления tarball във временен префикс и го стартирайте (`npm run check:pack-boot` автоматизира
   същата проверка „пакетиране→инсталиране→стартиране“ в CI).
3. `npm stage approve <id>` — подканата за 2FA Е самото публикуване. `npm stage reject <id>` отхвърля съдържанието.
4. Защитна проверка след публикуване: проверяващият механизъм след публикуването (WS1.4 от плана за v3.8.49) инсталира
   публикуваната версия от публичния регистър в чист контейнер и я стартира.

**Авариен резервен вариант:** `workflow_dispatch` с `publish_mode=direct` възстановява
старото незабавно `npm publish` (използвайте само ако самото поетапно публикуване не работи правилно; запишете причината).

**Еднократно подсилване на сигурността (собственик, npmjs.com):** конфигурирайте Trusted Publisher за
`omniroute` в режим само за поетапно публикуване, така че изтекъл дългосрочен токен да не може да изпълни `npm publish`
директно от никъде — CI може само да подготвя публикацията; единствено 2FA на собственика я издава.

**Процедура при повреден артефакт (без промяна):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
като стандартна първа реакция (отнема минути и е обратима); `npm unpublish` само в рамките на 72-часовия прозорец/при липса на зависими
пакети и никога като първа стъпка. Docker: никога не презаписвайте етикет на версия — връщането назад
означава пренасочване на `latest` към последния изправен digest.

**Docker Hub `latest` (задължително при всяко публикуване на стабилна SemVer версия):**
работният процес `docker-publish` трябва да постави етикети **както** `X.Y.Z`, **така и**, когато
`should-promote-latest.sh` потвърди, че това е най-високата стабилна SemVer версия, `:latest`
със **същия digest**. След задачата: digest-ът на `latest` в Hub трябва да съвпада с digest-а на новата
SemVer версия и `last_updated` трябва да е актуализирано. Не оставяйте `:latest` да сочи към по-стара
компилация, докато бележките към изданието описват корекции, които съществуват само в git. Примерните
Compose конфигурации за бърз старт използват `:latest`; GitOps трябва да продължи да фиксира `X.Y.Z`. Вижте
[Канали за издания на Docker](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Бърза писта за спешни корекции (етикет `hotfix`)

PR с етикет `hotfix` пропуска тежката CI матрица (E2E с 9 шарда, праг за покритие,
quality-gate, quality-extended) и запазва бързите проверки с висока сигналност: компилация,
шардове с модулни тестове, интеграционни тестове, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
и базовия тест за стартиране от tarball (`check:pack-boot`). Цел: успешно приключване за ≤15 минути вместо за ~33 минути.

**Правила за допускане — изискват се и четирите (по модела на аварийните писти на Chromium/VS Code/Node):**

1. **Сериозност**: продукционната среда не работи — публикуван артефакт се срива при стартиране /
   корекция на уязвимост / всеки потребител на версията е засегнат. „Важно“ не означава „не работи“.
2. **Правомощия**: само собственикът на хранилището поставя етикета `hotfix`. Самият етикет Е
   одобрението — никога не го поставяйте самостоятелно на PR от кампания.
3. **Доказателства**: описанието на PR съдържа връзка към предходното напълно успешно изпълнение на тежкия набор
   (набора, който пропуснатите задачи биха валидирали повторно), както и към собствения тест на корекцията, който първо е неуспешен, а след това успешен.
4. **Обхват**: само cherry-pick — минималната корекция, без рефакториране и без съпътстващи промени.

Пропуснатата проверка на покритието/прага се валидира повторно при следващото пълно изпълнение в
клона за изданието (непрекъснато успешно състояние на изданието) — пистата пропуска ИЗЧАКВАНЕТО, но никога валидирането.
Промени само в тестове (всички файлове са в `tests/`, нито един не е в `tests/e2e/`) пропускат E2E
матрицата автоматично, без етикет.

## Подробен контролен списък

### Предварително издание

- [ ] Всички PRs насочени към тази версия, са обединени към `release/vX.Y.0`
- [ ] Всички отворени Linear/issue елементи за тази версия са затворени или преместени към следващия етап
- [ ] CI зелено на `release/vX.Y.0` клон
- [ ] Няма `TODO(release)` маркери в кода: `grep -r "TODO(release)" src/ open-sse/`
- [ ] базово изображение на Docker е актуално (в момента `node:24.15.0-trixie-slim`)

### Версия и регистър на промените

- [ ] Стартирайте `/version-bump-cc <patch|minor|major>` (умение за Claude код)
  - Подутини `package.json`, `electron/package.json`
  - Регенерира `CHANGELOG.md` от git ангажименти от последния маркер
  - Актуализира значките README.md
- [ ] Ръчно прегледайте CHANGELOG.md и изчистете съобщенията за ангажиране, ако е необходимо
- [ ] Уверете се, че последната секция semver в `CHANGELOG.md` е равна на `package.json` версия
- [ ] Запазете `## [Unreleased]` като първа секция на регистъра на промените за предстояща работа
- [ ] Актуализирайте `docs/openapi.yaml` → `info.version` трябва да е равно на `package.json` версия

### Качество на кода

- [ ] `npm run lint` — 0 грешки (предупрежденията съществуват предварително)
- [ ] `npm run typecheck:core` — чист
- [ ] `npm run typecheck:noimplicit:core` — чист (строг)
- [ ] `npm run check:cycles:ratchet` — в рамките на замразения `metrics.cycles` таван (голи `check:cycles` излиза 1 на всеки цикъл, #15281)
- [ ] `npm run check:any-budget:t11` — в рамките на бюджета
- [ ] `npm run check:route-validation:t06` — чист
- [ ] `npm run check:node-runtime` — поддържан минимум за изпълнение (`>=22.22.2 <23`, `>=24.0.0 <27`, за `SUPPORTED_NODE_RANGE` в `src/shared/utils/nodeRuntimeSupport.ts`; подравнен с `package.json` `engines`)

### Тестване

- [ ] `npm run test:unit` — пас
- [ ] `npm run test:vitest` — пропуск (MCP сървър, autoCombo, кеш)
- [ ] `npm run test:coverage` — gate 60/60/60/60 удовлетворен (statements/lines/functions/branches)
- [ ] `npm run test:integration` — пропуск (ако промените докоснете DB / манипулатори)
- [ ] `npm run test:combo:matrix` — пропуск (комбинирана стратегическа матрица: доказва детерминистично решенията за избор на всички 22 публични стратегии за маршрутизиране; изпълнява се при докосване на комбинирано маршрутизиране, резолюция на стратегия или резервна логика)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (затворен реален дим нагоре по веригата; източник на DB снимка само за четене от VPS `root@192.168.0.15`; удря реални доставчици, струва кредити; никога не работи в CI; прескача чисто без портата)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS live smoke: 7 HTTP сценария срещу живия `.15` сървър чрез обикновен възел ESM; изисква `ssh root@192.168.0.15`; creates/deletes само `__live_test__*` комбинации; удря реални доставчици; никога не работи в CI)
- [ ] `npm run test:e2e` — пропуск (UI промени)
- [ ] `npm run test:protocols:e2e` — пропуск (MCP/A2A промени)
- [ ] `npm run test:ecosystem` — пас

### Куки (хъски валидирани)

Husky куките живеят в `.husky/` и се изпълняват автоматично при git операции.

- **предварително ангажиране:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **предварително натискане:** бързи детерминистични порти — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активиран 2026-06-13). Умишлено изключва `test:unit` (бавен; обхванат от задачата CI `test-unit` ).
  - Стартирайте `npm run test:unit` ръчно, преди да натиснете клонове за освобождаване.

Ако кука се провали: коригирайте основния проблем, не заобикаляйте с `--no-verify`.

### Конвенционални ангажименти

Всички свързани с изданието ангажименти трябва да следват `type(scope): subject` формат.

**Валидни типове:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Валидни обхвати:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Важни промени: добавете `BREAKING CHANGE:` долен колонтитул или `!` след обхвата (напр. `feat(api)!: drop /v0`).

### Документация

- [ ] `npm run check:docs-sync` преминава (автоматично изпълнение чрез предварително ангажиране)
- [ ] `npm run check:docs-all` преминава (чадър: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` излиза 0 — код ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env договорът е непокътнат
- [ ] `npm run check:doc-links` излиза 0 — няма счупени вътрешни препратки към маркдаун след преструктуриране
- [ ] `docs/architecture/ARCHITECTURE.md` прегледан за storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` прегледан за env var и оперативен дрифт
- [ ] Ако `.env.example` се промени: `docs/reference/ENVIRONMENT.md` се актуализира
- [ ] Ако новата функция има UI: `docs/guides/USER_GUIDE.md` го споменава
- [ ] Ако новата функция има API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` актуализиран
- [ ] Ако новата функция е модул: съществува специален `docs/<MODULE>.md`
- [ ] Ако се нарушава промяната: `docs/guides/TROUBLESHOOTING.md` има бележка за миграция

### i18n

- [ ] `npm run i18n:check` излиза от 0 — състояние на превод (`.i18n-state.json`) в синхрон с изходните документи (няма отклонени източници в строг режим; препоръката за режим на предупреждение е приемлива за корекции на документи в последната минута, но трябва да бъде 0 преди маркиране)
- [ ] `npm run i18n:check-ui-coverage` излиза от 0 — всеки UI локал на или над 80% ниво на покритие
- [ ] `npm run i18n:sync-ui:dry` съобщава за 0 липсващи ключа във всичките 66 целеви локала (всеки локал с изключение на източника `en` )
- [ ] Ако изходните английски документи са променени, стартирайте `npm run i18n:run` (изисква `OMNIROUTE_TRANSLATION_API_KEY` в `.env`) преди маркиране
- [ ] Приносът на превода може да бъде отложен за следващото издание, ако е незначителен (проследяване в CHANGELOG)

### Миграции на бази данни

- [ ] Ако `src/lib/db/migrations/` има нови файлове:
  - [ ] Всяка миграция е идемпотентна (`CREATE TABLE IF NOT EXISTS` и т.н.)
  - [ ] Миграции, обвити в транзакции
  - [ ] Номерирани правилно (без пропуски в последователността)
- [ ] Тествайте при нова инсталация: изтрийте `~/.omniroute/omniroute.db` и стартирайте `npm run dev`
- [ ] Тествайте съществуваща инсталация: архивирайте DB, изпълнете миграция, проверете схемата
- [ ] WAL файлове (`-wal`, `-shm`) се обработват правилно, ако миграцията пренаписва таблици

### Каталог на доставчика (проверен от Zod)

- [ ] `src/shared/constants/providers.ts` Zod схема, валидна по време на зареждане
  - [ ] Всички доставчици имат задължителни полета (`id`, `label`, `kind` и др.)
  - [ ] `freeNote` предоставена за нови безплатни доставчици
  - [ ] OAuth доставчиците имат `oauthConfig` регистриран в `src/lib/oauth/constants/oauth.ts`
- [ ] Ако е добавен нов доставчик: съответният изпълнител в `open-sse/executors/`
- [ ] Ако форматът не е OpenAI: преводач в `open-sse/translator/`
- [ ] Модели, регистрирани в `open-sse/config/providerRegistry.ts`
- [ ] Модулните тестове в `tests/unit/` покриват класификацията и маршрутизирането на доставчика

### Настолен компютър (Electron)

Ако `electron/` се промени:

- [ ] `npm run electron:smoke:packaged` минава
- [ ] Компилации, тествани за поне един от `:win`, `:mac`, `:linux`
- [ ] Сертификатите за подписване на код не са изтекли (ако се подписват)
- [ ] `electron/package.json` версията съответства на root `package.json`
- [ ] Указателят на канала за автоматично актуализиране се актуализира, ако се пусне в `stable`

### Изграждане на оформление

Хранилището използва три различни изходни директории — никога не ги смесвайте:

| Справочник | Цел                                                              | Проследен?      |
| ---------- | ---------------------------------------------------------------- | --------------- |
| `src/`     | Източник на приложение (TypeScript / TSX)                        | да              |
| `.build/`  | Изграждане на междинни продукти — `next build` изход (`distDir`) | Не (gitignored) |
| `dist/`    | Изпращаем npm пакет — сглобен от `assembleStandalone`            | Не (gitignored) |

> **Бележка на оператора:** отдалечената директория с изображения VPS остава `/usr/lib/node_modules/omniroute/app/`. Само на** в репо** изходът за изграждане е преместен (`app/` → `dist/`). Съдържанието на уменията за разгръщане на rsync `dist/` в отдалечения `app/` dir — не са необходими промени на пътя VPS.

**Поток на единично изграждане:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Направете NOT стартирайте `npm run build` последвано от отделен `npm run build:cli` за разгръщане — използвайте `npm run build:release` което прави чисто възстановяване + sentinel в една команда.

### Проверка на артефакт

- [ ] `npm run build:release` успява и `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` чист — без `app.__qa_backup`, `scripts/scratch`, `package-lock.json` или други локални остатъци
- [ ] `dist/server.js` съществува след изграждането
- [ ] Незадължителен локален пакетиран дим за изпълнение: `npm run dev:candidate -- validate` след `npm run dev:candidate -- build` зарежда пакетирания tarball на изолиран `DATA_DIR` и проверява `/api/health` + `/v1/models` (вижте [Принос Златен път](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Маркиране и освобождаване

- [ ] Стартирайте `/generate-release-cc` (умение за Claude код):
  - Създава етикет `vX.Y.Z`
  - Бута етикет и клон
  - Отваря GitHub Release с тяло на регистъра на промените
  - Прикачва Electron инсталатори (ако са изградени)
- [ ] Или ръчно:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Разположете

Умения за внедряване използвайте лекия rsync поток — без `npm pack`, без `npm i -g`:

- [ ] Използвайте умение за внедряване, което отговаря на целта:
  - `/deploy-vps-local-cc` — локален VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — и двете
- [ ] Преди внедряване потвърдете `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Компилацията трябва да се изпълнява там, където `node_modules` е реална (основна проверка или `npm ci`'d worktree — NOT свързано работно дърво със символна връзка)
- [ ] Екземпляр на внедрен димен тест:
  - Отворете `/dashboard/health` → проверете низа на версията, който съответства на изданието
  - Изпълнете `/v1/chat/completions` заявка срещу известен доставчик
  - Проверете дали `/api/monitoring/health` връща `CLOSED` прекъсвачи
  - Потвърдете отговора MCP транспортите (`/mcp` HTTP, `/mcp-sse` SSE)

### След освобождаване

- [ ] Стартирайте `/capture-release-evidences-cc` (умение за Claude код)
  - Улавя WebP screenshots/recordings нови функции
  - Прилага се към бележки за изданието / публикация в блог
- [ ] Актуализирайте GitHub Discussions / Discord с съобщение за издаване
- [ ] Отворете крайъгълен камък за следващата версия
- [ ] Ако е критично: фиксирайте дискусия или публикувайте в `news.json` за банер в приложението

### Радарна врата за обществено изстрелване

Радарното съобщение е умишлено ангажирано с `active: false`. Активирането е отделна промяна след доказване на всеки елемент по-долу:

- [ ] Всички подредени Radar PRs се обединяват и върхът за освобождаване CI е зелен
- [ ] Разположете и опушете маршрутите на OSS Radar, като `RADAR_ENABLED` все още е изключен по подразбиране
- [ ] Пушете `GET /planos`, `/termos`, `/privacidade` и `/reembolso` на посочения радар хост
- [ ] Оператор на записи identity/contact/address и одобрен от собственика правен преглед в частната услуга
- [ ] Упражнявайте Stripe Checkout и подписаната уебкукичка само в тестов режим
- [ ] Упражнявайте една шифрована доставка на транзакционен имейл с одобрената sender/domain
- [ ] Докажете възстановяване на резервно копие и едно контролирано проучване с ограничен бюджет
- [ ] Одобрете политиката за преглед BRL/PIX, преди да приемете доказателства за дарение
- [ ] Активирайте публично плащане само след предходните врати, след което активирайте новия `news.json` ID
- [ ] Уверете се, че началният банер използва локализирано копие и нов ID се появява отново, след като по-старият ID бъде отхвърлен

## Smoke тестове за вградени услуги (v3.8.4+)

Преди публикуване на версия, която включва промени по вградените услуги, проверете:

### Стартиране с нова БД (открива конфликти между миграции — добавено след спешната корекция за v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — изчакайте 10 s за стартиране
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` връща `"9router"` (НЕ 404, НЕ 500). Потвърждава, че миграцията `071_services.sql` е приложена и редът е създаден.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` връща 3 реда.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` връща 2 реда (потвърждава, че `070_webhooks_kind_metadata.sql` е приложена).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` преминава успешно — предпазва от бъдещи конфликти.

### 9Router

- [ ] `POST /api/services/9router/install` връща 200 с `installedVersion` за по-малко от 2 min
- [ ] `POST /api/services/9router/start` връща 200 и `state: "running"` за по-малко от 30 s
- [ ] `GET /api/services/9router/status` отчита `health: "healthy"`
- [ ] `POST /v1/chat/completions` с `"model": "9router/auto/..."` връща 200 (маршрутизиране от край до край през 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` визуализира собствения потребителски интерфейс на 9Router вътре в проксито (без директен `127.0.0.1:port` iframe)
- [ ] `POST /api/services/9router/rotate-key` връща `{ keyRotated: true }` и услугата се рестартира безпроблемно
- [ ] `POST /api/services/9router/stop` връща 200 и `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` връща SSE поток със събитие `snapshot`, съдържащо скорошни редове
- [ ] Инсталирането в среда без `npm` в PATH връща 500 с разбираемо съобщение за грешка (без stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` връща 200 за по-малко от 2 min
- [ ] `POST /api/services/cliproxy/start` връща 200 и `state: "running"` за по-малко от 30 s
- [ ] `GET /api/services/cliproxy/status` отчита `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` връща 200 и `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` връща SSE поток

### Регресия в сигурността

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` връща `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` връща `403 LOCAL_ONLY`
- [ ] Отговорите с грешки от `/api/services/*` не съдържат `err.stack` или абсолютни файлови пътища

## Проверки за v3.8.0+

Преди публикуване на версия от серията v3.8.x проверете и следното:

- [ ] `omniroute --tray` се стартира на macOS (systray2 е инсталиран в `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` се стартира на Linux (изисква DISPLAY; разбираема грешка, ако не е зададен)
- [ ] `omniroute --tray` се стартира на Windows (PowerShell NotifyIcon, без допълнителни двоични файлове)
- [ ] `omniroute config tray enable` създава запис за автоматично стартиране; деактивирането го премахва
- [ ] `npm install -g omniroute@<this-version>` изпълнява postinstall без фатално прекратяване
- [ ] Процесът на актуализиране запазва незадължителните зависимости: `omniroute update --apply` и автоматичната актуализация
      изпълняват `npm install -g … --include=optional`, така че `optionalDependencies` (better-sqlite3,
      keytar, tls-client и llmlingua SLM стекът: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) да се запазят след актуализация. Ultra SLM нивото с `modelPath` изисква също
      модела tinybert, който се изтегля автоматично в `${DATA_DIR}/models/llmlingua` при първото използване. След това postinstall
      (`scripts/build/colocateOptionals.mjs`) разполага заедно незадължителните зависимости на SLM в
      `dist/node_modules`, така че worker процесът да използва ЕДИН екземпляр на `@huggingface/transformers` ^4.2.0
      — самостоятелният trace пакетира само transformers, а не динамично импортираните
      незадължителни зависимости, така че без това worker процесът би заредил llmlingua-2 с transformers от основната директория
      и SLM нивото би преминало безшумно към резервен режим.
- [ ] `omniroute status` работи без `.env` (път чрез CLI токен, само през loopback)
- [ ] `curl http://localhost:20128/api/shutdown` връща 401 (маршрут, който винаги е защитен)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` връща 401 (loopback защита)
- [ ] При първото изпълнение SQLite средата се определя като `bundled` (вграденият двоичен файл е валиден за платформата)
- [ ] SQLite средата преминава към `runtime`, когато `node_modules/better-sqlite3` бъде изтрита
- [ ] Интелигентният MCP филтър компресира реален изход от `playwright-mcp browser_snapshot` (намаление с ≥50%)
- [ ] Всичките 10 файла `skills/omniroute*/SKILL.md` са публично достъпни чрез необработен GitHub URL
- [ ] При нова настройка съветникът за първоначално конфигуриране показва стъпката за представяне на нивата „Как работи“
- [ ] Уиджетът за обхват на нивата в началното табло показва броя на конфигурираните/активните елементи

---

## Отделяне на 3.9.0 LTS (репетирано в 3.8.58)

След v3.8.59 следващата версия е 3.9.0, а върхът ѝ става основа на два дългосрочни клона:
`stable/v3` (линията v3 LTS, npm `latest`) и `develop` (v4, повишена до 4.0.0, npm
`nightly`). Моделът на клоновете/каналите, пренасянето напред и етикетите са описани в
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); планът е в [ROADMAP](../../ROADMAP.md) (Фаза 3). Отделянето се изпълнява веднъж;
3.8.58 го репетира от начало до край във fork, а 3.8.59 завършва с
[контролния списък GO/NO-GO](./LTS_GO_NO_GO.md).

### Пробно изпълнение (само за четене, безопасно по всяко време)

```bash
npm run release:dry-run-lts-cut                       # реалното отделяне: 3.9.0 от HEAD, предишен таг v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # фиксиране на изходния commit
```

`scripts/release/dry-run-lts-cut.mjs` не изпълнява нищо: той чете git и `gh` и извежда
цялата последователност — предварителните условия (източникът се намира, изходното хранилище има пълна история —
shallow clone не може да изпрати `stable/v3`, приемащата страна отхвърля пакета при първия
присаден родител, затова първо извършете отделянето от пълен clone или изпълнете `git fetch --unshallow origin` —
предишният таг съществува, `package.json` съдържа целевата версия, отворен е issue с `release-freeze`, няма отворен
issue с `Release branch not green`
за съществуващ release клон — несъществуващ клон се отчита като `?` неизвестен, никога
като зелен — опашката `release` на Mergify е конфигурирана (G11: `queue_rules`, `checks_timeout`,
етикет `queue`), наборът от правила за `release/*` все още блокира изтриването и принудителното изпращане, а
`stable/v3` и `develop` все още не съществуват), двете стъпки за клоновете, кои тригери на
неактивни workflow-и и условия `if:` стават истина (и кои остават блокирани от променлива на хранилището или
фиксирани към каноничното хранилище), очакваните dist-tag-ове (`latest` → 3.9.0, `next` и
`nightly` са празни) и връщането назад. Изходен код `0` = `RESULT: READY`, `1` = неизпълнено блокиращо предварително
условие (`✗`), `2` = грешка при употреба. `--advisory <id,...>` понижава проверка до предупреждение (`!`),
без да я скрива.

Изпълнете пробното изпълнение на реалното отделяне, докато замразяването на release-а за 3.9.0 все още е активно — клоновете се
създават след тага и преди Фаза 12c да отмени замразяването.

### Репетиция с 3.8.58 (само във fork)

```bash
# 1. Пробно изпълнение върху текущия връх с параметри за репетицията
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Изпълнение спрямо отдалечен FORK (origin или всеки remote, чийто URL е на каноничното
#    хранилище, се отказва; всяка стъпка изисква потвърждение в терминала)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Изпробване на неактивните workflow-и във fork-а (workflow_dispatch там, където пробното изпълнение
#    отчита фиксиране към каноничното хранилище), след което връщане назад
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit-ът за повишаване на `develop` се създава чрез git plumbing (работното дърво не се засяга) и повишава
същите пет файла като commit за отваряне на цикъл: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` и `docs/openapi.yaml`. Секцията `[4.0.0]` в
CHANGELOG и нейните i18n копия се отварят впоследствие в `develop`, преди първия му
PR. Скриптът никога не променя npm dist-tag-ове — репетирайте ги с тестов пакет.

### Артефакт за предварителен преглед на PR (изграждане веднъж, повишаване на същите байтове)

`.github/workflows/preview-artifact.yml` изгражда един production tarball от върха на PR и
валидира точно тази компилация (част (a) от #8084). Само за PR-и от същото хранилище; нищо не се публикува.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # или добавете етикета `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # инсталиране на предварителния преглед
```

Изпълнението стартира `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, пакетира
tarball-а, стартира `npm run check:pack-boot` (фиктивни тайни, временна директория за данни), пакетира отново и
се проваля, освен ако digest-ът не е идентичен, след което записва `artifact-identity.json` (SHA на върха, SHA на основата,
hash на lockfile-а, платформа, архитектура, node ABI, bundler, политика за компилация —
`scripts/release/artifact-identity.mjs`) и атестира tarball-а в отделен job. Повишаването
на предварителен преглед означава инсталиране на този tarball: никога не изграждайте повторно от изходния код.

### Отделянето (3.9.0, след GO)

1. GO е записано в [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` извежда `RESULT: READY`.
3. Създайте клоновете ръчно в `origin` с командите, изведени от пробното изпълнение —
   скриптът отказва да изпраща към `origin`. За да използвате повторно прегледан commit за `develop`, първо изпълнете
   репетицията с `--execute` върху върха на 3.9.0 спрямо своя fork; тя извежда и двата SHA, а
   същите commit-и могат да бъдат изпратени:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Защитете `stable/v3` и `develop` (набори от правила + опашка за сливане), преди да бъде приета първата PR.
5. Неактивните работни процеси се включват при съществуване на съответния клон: `forward-port.yml` (push към
   `stable/v3`), `validate-stable-pr.yml` (PR-и към `stable/v3`) и `nightly-v4-build.yml`
   (компилира `develop`). Преди пускането задайте тайната `secrets.FORWARD_PORT_TOKEN` на хранилището (така че CI да се изпълнява при
   PR-и за пренасяне напред); нощното публикуване остава изключено, докато собственикът не зададе променливата на хранилището
   `vars.NIGHTLY_PUBLISH` на `true` и npm Trusted Publishing не приеме
   `nightly-v4-build.yml`. Определянето на канала се извършва от `scripts/release/dist-tag.mjs` — същата
   логика за определяне, която използва `npm-publish.yml`.
6. Проверете каналите: `npm view omniroute dist-tags --json` показва `latest` = 3.9.0 и липса на
   `next` / `nightly`, докато не бъде публикувана v4.
7. Връщане назад, ако е необходимо: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   и `npm dist-tag add omniroute@3.8.59 latest`.

---

## Връщане към предишна версия

Ако изданието има критичен проблем:

1. `gh release edit vX.Y.Z --prerelease` (маркира го като непоследно)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (само ако все още не е възприето от потребителите)
3. Или: спешна корекция в `release/vX.Y.0` → коригиращо издание `vX.Y.(Z+1)`
4. Комуникирайте незабавно в GitHub Discussions и Discord

## Строги правила

- Никога не правете директни комити в `main`
- Никога не използвайте `git push --force` към `main` или клонове `release/*`
- Никога не пропускайте Husky hooks (`--no-verify`)
- Никога не включвайте в комити тайни, идентификационни данни или `.env` файлове
- Покритието трябва да остане ≥60/60/60/60 (инструкции/редове/функции/разклонения)
- Винаги добавяйте или актуализирайте тестове, когато променяте продукционен код в `src/`, `open-sse/`, `electron/` или `bin/`

## Автоматизирана проверка за синхронизация

Изпълнете локално проверката за синхронизация на документацията, преди да отворите PR:

```bash
npm run check:docs-sync
```

CI също изпълнява тази проверка в `.github/workflows/ci.yml` (задача за проверка на стила).
