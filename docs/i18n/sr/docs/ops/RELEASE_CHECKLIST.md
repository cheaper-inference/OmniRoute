# Release Checklist (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Последње ажурирање:** 2026-08-28 — v3.8.51
> Поједностављен ток издавања који користи вештине Claude Code-а за аутоматизацију.
>
> **Одржавајте ред/грану у исправном стању између издања:** погледајте [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (породица `/green-prs` + `npm run check:release-green` + `/babysit` + ноћно покретање). Периодично покретање
> овога — а нарочито **пре** ове контролне листе — обезбеђује да PR за издање од почетка буде исправан.

## Укратко

```bash
# 1. Повећајте верзију + генеришите CHANGELOG (вештина)
/version-bump-cc patch    # или minor/major

# 2. Локално покрените проверу квалитета
npm run check              # lint + тестови
npm run test:coverage      # пуна провера покривености (60/60/60/60)

# 3. Изградња и основна провера
npm run build
npm run test:e2e           # опционално, али препоручено

# 4. Генеришите издање (вештина)
/generate-release-cc

# 5. Примените издање (вештина)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Прикупите доказе о издању (вештина)
/capture-release-evidences-cc
```

## npm поуздано објављивање (подразумевано од v3.8.51) — припремно објављивање на захтев, директно као резервна опција

`npm-publish.yml` подразумевано објављује путем **npm поузданог објављивања (OIDC)**:
задатак `stage-npm` (који се извршава на GitHub инфраструктури) размењује GitHub id-token за краткотрајни npm
акредитив за то покретање — без дуготрајног npm токена у тајнама репозиторијума, без 2FA упита, уз приложен доказ о пореклу.
То је заобилазни механизам који npm сада одобрава, пошто се токени који прескачу 2FA повлаче из употребе;
њиме се враћа потпуно аутоматизован ток који је пројекат имао до v3.8.48, уз задржавање
WS1.3 гаранције (процурели токен не може самостално да објави пакет — јер токен не постоји).

**Једнократно подешавање (власник):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: власник `diegosouzapw`, репозиторијум `OmniRoute`, радни ток `npm-publish.yml`
(окружење: нема). Док то не буде подешено, аутоматски корак се завршава грешком `ENEEDAUTH`:
поново га покрените са `publish_mode=staged` (испод) или `direct`.

### Припремно објављивање (на захтев — `publish_mode=staged`)

Радни ток npm-publish више не објављује директно: покреће упаковану tarball архиву
(`check:pack-boot`), а затим извршава `npm stage publish` — идентични бајтови се смештају у
регистар, али их **није могуће инсталирати** док их власник не одобри. Људска 2FA контрола премештена је
НАКОН провере, а не пре ње.

**Ток за власника након што радни ток успешно прође:**

1. `npm stage list omniroute` — пронађите ID припремне верзије (такође се приказује у сажетку радног тока).
2. Проверите припремљене бајтове (препоручено): `npm stage download <id>`, а затим инсталирајте
   преузету tarball архиву у привремени префикс и покрените је (`npm run check:pack-boot` аутоматизује
   исту pack→install→boot проверу у CI-ју).
3. `npm stage approve <id>` — 2FA упит ЈЕ објављивање. `npm stage reject <id>` одбацује припремну верзију.
4. Заштита након објављивања: провера након објављивања (WS1.4 плана за v3.8.49) инсталира
   објављену верзију из јавног регистра у чистом контејнеру и покреће је.

**Резервна опција за хитне случајеве:** `workflow_dispatch` са `publish_mode=direct` враћа
раније непосредно `npm publish` понашање (користите само ако само припремно објављивање не функционише исправно; забележите разлог).

**Једнократно ојачавање безбедности (власник, npmjs.com):** подесите Trusted Publisher за
`omniroute` у режиму који дозвољава само припремно објављивање, тако да процурели дуготрајни токен не може директно да изврши `npm publish`
ни са једног места — CI може само да припреми верзију; само власников 2FA може да је објави.

**Поступак за неисправан артефакт (непромењен):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
као подразумевана реакција (траје неколико минута и може се поништити); `npm unpublish` користите само унутар периода од 72 сата/ако нема зависних пакета
и никада као први корак. Docker: никада немојте поново уписивати ознаку верзије — враћање претходне верзије подразумева
преусмеравање ознаке `latest` на последњи исправан digest.

**Docker Hub `latest` (обавезно при сваком објављивању стабилне SemVer верзије):**
радни ток `docker-publish` мора да означи **и** `X.Y.Z` и, када
`should-promote-latest.sh` потврди да је то највиша стабилна SemVer верзија, `:latest`
са **истим digest-ом**. Након задатка: digest за Hub `latest` мора бити једнак digest-у нове
SemVer верзије, а `last_updated` мора бити ажуриран. Не остављајте `:latest` на старијој
изградњи док напомене о издању говоре о исправкама које постоје само у git-у. Compose
водичи за брзи почетак користе `:latest`; GitOps треба и даље да фиксира `X.Y.Z`. Погледајте
[Docker канале издања](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Брза трака за хитне исправке (ознака `hotfix`)

PR са ознаком `hotfix` прескаче обимну CI матрицу (E2E са 9 делова, праг покривености,
quality-gate, quality-extended) и задржава брзе провере високог значаја: израду,
делове јединичних тестова, интеграционе тестове, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
и проверу покретања из tarball пакета (`check:pack-boot`). Циљ: успешно извршавање за ≤15 минута уместо за ~33 минута.

**Услови за улазак — сва четири су обавезна (по узору на Chromium/VS Code/Node траке за хитне случајеве):**

1. **Озбиљност**: продукција не ради — објављени артефакт отказује при покретању /
   безбедносна исправка / погођен је сваки корисник издања. „Важно“ не значи „не ради“.
2. **Овлашћење**: само власник репозиторијума поставља ознаку `hotfix`. Ознака ЈЕ
   одобрење — никада је немојте самостално постављати на PR кампање.
3. **Докази**: опис PR-а садржи везу ка претходном потпуно успешном обимном извршавању (скупу тестова
   који би прескочени послови поново проверили), као и тесту саме исправке који је прво био неуспешан, а затим успешан.
4. **Обим**: искључиво cherry-pick — минимална исправка, без рефакторисања и успутних измена.

Прескочене провере покривености и прагова поново се извршавају при следећем потпуном покретању на
грани издања (континуирано успешно стање издања) — трака прескаче ЧЕКАЊЕ, никада валидацију.
Измене које се односе само на тестове (све датотеке у `tests/`, ниједна у `tests/e2e/`) аутоматски прескачу E2E
матрицу, без икакве ознаке.

## Детаљна контролна листа

### Пре-релеасе

- [ ] Сви PRs циљани на ово издање су спојени у `release/vX.Y.0`
- [ ] Све отворене Linear/issue ставке за ову верзију су затворене или пребачене на следећу прекретницу
- [ ] CI зелена на `release/vX.Y.0` грани
- [ ] Нема `TODO(release)` маркера у коду: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker основна слика је ажурирана (тренутно `node:24.15.0-trixie-slim`)

### Верзија и дневник промена

- [ ] Покрени `/version-bump-cc <patch|minor|major>` ( вештина Claude кода)
  - Избочине `package.json`, `electron/package.json`
  - Регенерише `CHANGELOG.md` из гит урезивања од последње ознаке
  - Ажурира README.md значке
- [ ] Ручно прегледајте CHANGELOG.md и по потреби очистите поруке урезивања
- [ ] Уверите се да је најновији одељак семвер у `CHANGELOG.md` једнак `package.json` верзији
- [ ] Задржите `## [Unreleased]` као прву секцију дневника промена за предстојећи рад
- [ ] Ажурирање `docs/openapi.yaml` → `info.version` мора бити једнако `package.json` верзији

### Квалитет кода

- [ ] `npm run lint` — 0 грешака (упозорења већ постоје)
- [ ] `npm run typecheck:core` — чист
- [ ] `npm run typecheck:noimplicit:core` — чист (строг)
- [ ] `npm run check:cycles:ratchet` — унутар замрзнутог `metrics.cycles` плафона (голи `check:cycles` излази 1 у било ком циклусу, #15281)
- [ ] `npm run check:any-budget:t11` — у оквиру буџета
- [ ] `npm run check:route-validation:t06` — чист
- [ ] `npm run check:node-runtime` — подржани рунтиме флоор мет (`>=22.22.2 <23`, `>=24.0.0 <27`, по `SUPPORTED_NODE_RANGE` у `src/shared/utils/nodeRuntimeSupport.ts`; усклађено са `package.json` `engines`)

### Тестирање

- [ ] `npm run test:unit` — пасс
- [ ] `npm run test:vitest` — пасс (MCP сервер, autoCombo, кеш)
- [ ] `npm run test:coverage` — капија 60/60/60/60 задовољна (statements/lines/functions/branches)
- [ ] `npm run test:integration` — пасс (ако промене додирују DB / руковаоце)
- [ ] `npm run test:combo:matrix` — пасс (матрица комбиноване стратегије: детерминистички доказује одлуке о избору свих 22 јавне стратегије рутирања; покреће се када се додирне комбиновано рутирање, резолуција стратегије или резервна логика)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** (затворени прави узводни дим; извори DB снимак само за читање из VPS `root@192.168.0.15`; погађа стварне провајдере, кошта кредите; никада не ради у CI; чисто прескаче без капије)
- [ ] `npm run test:combo:live:vps` —**optional/manual** (Phase-3 VPS ливе дим: 7 HTTP сценарија против живог `.15` сервера преко обичног чвора ESM; захтева `ssh root@192.168.0.15`; creates/deletes само `__live_test__*` комбинације; погађа праве добављаче; никада не ради у CI)
- [ ] `npm run test:e2e` — пасс (UI промене)
- [ ] `npm run test:protocols:e2e` — пасс (MCP/A2A промене)
- [ ] `npm run test:ecosystem` — пасс

### Куке (потврђено Хуски)

Хуски куке живе у `.husky/` и аутоматски се покрећу на гит операцијама.

- **пре урезивања:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **пре-пусх:** брзе детерминистичке капије — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активирано 13.06.2026). Намерно искључује `test:unit` (споро; покривено CI `test-unit` послом).
  - Ручно покрените `npm run test:unit` пре гурања грана за отпуштање.

Ако закачивање не успе: решите основни проблем, немојте заобилазити помоћу `--no-verify`.

### Конвенционалне обавезе

Сва урезивања везана за издање морају да прате `type(scope): subject` формат.

**Важећи типови:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Важећи опсег:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator` `authz` `domain`

Преломне измене: додајте `BREAKING CHANGE:` подножје или `!` после опсега (нпр. `feat(api)!: drop /v0`).

### Документација

- [ ] `npm run check:docs-sync` пролази (аутоматски се покреће пре урезивања)
- [ ] `npm run check:docs-all` пролази (кишобран: доцс-синц + доцс-цоунтс + енв-доц-синц + застареле верзије + доц-линкс)
- [ ] `npm run check:env-doc-sync` излази 0 — код ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` уговор је нетакнут
- [ ] `npm run check:doc-links` излази 0 — нема прекинутих интерних референци смањења вредности након реструктурирања
- [ ] `docs/architecture/ARCHITECTURE.md` прегледан за storage/runtime дрифт
- [ ] `docs/guides/TROUBLESHOOTING.md` прегледан за енв вар и оперативни дрифт
- [ ] Ако је `.env.example` промењен: `docs/reference/ENVIRONMENT.md` ажуриран
- [ ] Ако нова функција има UI: `docs/guides/USER_GUIDE.md` то помиње
- [ ] Ако нова функција има API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` ажуриран
- [ ] Ако је нова функција модул: наменски `docs/<MODULE>.md` постоји
- [ ] Ако се промени промена: `docs/guides/TROUBLESHOOTING.md` има белешку о миграцији

### и18н

- [ ] `npm run i18n:check` излази из 0 — стања превода (`.i18n-state.json`) у синхронизацији са изворним документима (нема промењених извора у строгом режиму; упозорење о режиму упозорења је прихватљиво за дораду докумената у последњем тренутку, али треба да буде 0 пре означавања)
- [ ] `npm run i18n:check-ui-coverage` излази из 0 — на сваком UI локалу на или изнад прага покривености од 80%.
- [ ] `npm run i18n:sync-ui:dry` пријављује 0 недостајућих кључева у свих 66 циљних локала (сваки локал осим `en` извора)
- [ ] Ако су изворни документи на енглеском језику промењени, покрените `npm run i18n:run` (захтева `OMNIROUTE_TRANSLATION_API_KEY` у `.env`) пре означавања
- [ ] Преводни доприноси се могу одложити за следеће издање ако су мањи (запис у CHANGELOG)

### Миграције базе података

- [ ] Ако `src/lib/db/migrations/` има нове датотеке:
  - [ ] Свака миграција је идемпотентна (`CREATE TABLE IF NOT EXISTS`, итд.)
  - [ ] Миграције умотане у трансакције
  - [ ] Правилно нумерисано (без празнина у низу)
- [ ] Тестирајте на новој инсталацији: избришите `~/.omniroute/omniroute.db` и покрените `npm run dev`
- [ ] Тестирајте постојећу инсталацију: направите резервну копију DB, покрените миграцију, проверите шему
- [ ] WAL фајловима (`-wal`, `-shm`) се правилно рукује ако миграција преписује табеле

### Каталог добављача (потврђен Зод)

- [ ] `src/shared/constants/providers.ts` Zod шема важи у време учитавања
  - [ ] Сви провајдери имају обавезна поља (`id`, `label`, `kind`, итд.)
  - [ ] `freeNote` обезбеђена за нове бесплатне провајдере
  - [ ] OAuth провајдери имају `oauthConfig` регистрован у `src/lib/oauth/constants/oauth.ts`
- [ ] Ако је додат нови провајдер: одговарајући извршилац у `open-sse/executors/`
- [ ] Ако формат није ОпенАИ: преводилац у `open-sse/translator/`
- [ ] Модели регистровани у `open-sse/config/providerRegistry.ts`
- [ ] Јединични тестови у `tests/unit/` покривању провајдера класификације и рутирања

### Десктоп (Electron)

Ако `electron/` промени:

- [ ] `npm run electron:smoke:packaged` пролази
- [ ] Верзије тестиране за најмање једну од `:win`, `:mac`, `:linux`
- [ ] Сертификати за потписивање кода нису истекли (ако су потписани)
- [ ] `electron/package.json` верзија одговара роот `package.json`
- [ ] Показивач канала за аутоматско ажурирање је ажуриран ако се пусти на `stable`

### Буилд Лаиоут

Репозиторијум користи три различита излазна директоријума — их никада не меша:

| Именик    | сврха                                                               | Пратили?        |
| --------- | ------------------------------------------------------------------- | --------------- |
| `src/`    | Извор апликације (TypeScript / TSX)                                 | Да              |
| `.build/` | Направи интермедијере — `next build` оутпут (`distDir`)             | Не (игнорисано) |
| `dist/`   | нпм пакет — који се може испоручити сакупио је `assembleStandalone` | Не (игнорисано) |

> **Напомена оператера:** удаљени VPS директоријум слика остаје `/usr/lib/node_modules/omniroute/app/`. Само је** ин-репо** буилд оутпут је померен (`app/` → `dist/`). Вештине постављања рсинц `dist/` садржаја у удаљени `app/` дир — нису потребне промене VPS путање.

**Ток једне израде:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Да ли NOT покрените `npm run build` након чега следи посебан `npm run build:cli` за примену — користите `npm run build:release` који врши чисту реконструкцију + сентинела у једној команди.

### Валидација артефаката

- [ ] `npm run build:release` успева и `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` цлеан — без `app.__qa_backup`, `scripts/scratch`, `package-lock.json` или других локалних остатака
- [ ] `dist/server.js` постоји након изградње
- [ ] Опционо локално упаковано време извођења: `npm run dev:candidate -- validate` након `npm run dev:candidate -- build` покреће упаковани тарбалл на изолованом `DATA_DIR` и проверава `/api/health` + `/v1/models` (погледајте [Златни пут доприноса](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) )

### Означавање и објављивање

- [ ] Покрени `/generate-release-cc` ( вештина Claude кода):
  - Креира ознаку `vX.Y.Z`
  - Гура ознаку и грану
  - Отвара GitHub издање са телом дневника промена
  - Прикључује Electron инсталатере (ако је изграђен)
- [ ] Или ручно:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Деплои

Вештине примене користе лаки рсинц ток — но `npm pack`, но `npm i -g`:

- [ ] Користите вештину распоређивања која одговара циљу:
  - `/deploy-vps-local-cc` — локални VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Акамаи VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — обоје
- [ ] Пре примене, потврдите `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Изградња мора да се покреће тамо где је `node_modules` стварна (главно одјављивање или `npm ci`'д ворктрее — NOT стабло рада са симболичким везама)
- [ ] Примењена инстанца теста дима:
  - Отворите `/dashboard/health` → провере верзије одговара издању
  - Покрените `/v1/chat/completions` захтев против познатог провајдера
  - Проверите `/api/monitoring/health` враћа `CLOSED` прекидаче
  - Потврдите одговор MCP транспорта (`/mcp` HTTP, `/mcp-sse` SSE)

### Пост-релеасе

- [ ] Покрени `/capture-release-evidences-cc` ( вештина Claude кода)
  - Снима WebP screenshots/recordings нових функција
  - Прилаже се белешкама о издању/посту на блогу
- [ ] Ажурирајте GitHub Дисцуссионс / Discord са најавом издања
- [ ] Отворите прекретницу за следећу верзију
- [ ] Ако је критично: закачите дискусију или поставите у `news.json` за банер у апликацији

### Радарска капија за јавно лансирање

Радарска објава је намерно извршена са `active: false`. Активација је посебна промена након што се докаже свака ставка испод:

- [ ] Сви наслагани Радар PRs су спојени и врх за отпуштање CI је зелен
- [ ] Поставите и димите руте OSS радара са `RADAR_ENABLED` који је подразумевано искључен
- [ ] Смоке `GET /planos`, `/termos`, `/privacidade` и `/reembolso` на именованом Радар хосту
- [ ] Оператор евиденције identity/contact/address и правни преглед који је одобрио власник у приватној служби
- [ ] Екерцисе Стрипе Цхецкоут и потписани веб-хук само у тестном режиму
- [ ] Вежбајте једну шифровану испоруку трансакцијске е-поште са одобреним sender/domain
- [ ] Докажите враћање резервне копије и једно надгледано истраживање са ограниченим буџетом
- [ ] Одобрете BRL/PIX политику прегледа пре него што прихватите доказе о донацији
- [ ] Омогућите јавну одјаву само након претходних капија, а затим активирајте нови `news.json` ID
- [ ] Проверите да банер Почетна користи локализовану копију и да се нови ID поново појављује након што се старији ID одбаци

## Провера уграђених сервиса (v3.8.4+)

Пре објављивања било ког издања које укључује измене уграђених сервиса, проверите:

### Покретање са новом базом података (открива сукобе миграција — додато након хитне исправке за v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — сачекајте 10 s да се покрене
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` враћа `"9router"` (НЕ 404, НЕ 500). Потврђује да је миграција `071_services.sql` примењена и да је ред унет.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` враћа 3 реда.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` враћа 2 реда (потврђује да је `070_webhooks_kind_metadata.sql` примењена).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` пролази — штити од будућих сукоба.

### 9Router

- [ ] `POST /api/services/9router/install` враћа 200 са `installedVersion` за мање од 2 min
- [ ] `POST /api/services/9router/start` враћа 200 и `state: "running"` за мање од 30 s
- [ ] `GET /api/services/9router/status` пријављује `health: "healthy"`
- [ ] `POST /v1/chat/completions` са `"model": "9router/auto/..."` враћа 200 (усмеравање од почетка до краја кроз 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` приказује изворни кориснички интерфејс 9Router-а унутар проксија (без директног `127.0.0.1:port` iframe-а)
- [ ] `POST /api/services/9router/rotate-key` враћа `{ keyRotated: true }` и сервис се поново покреће без грешака
- [ ] `POST /api/services/9router/stop` враћа 200 и `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` враћа SSE ток са догађајем `snapshot` који садржи недавне редове
- [ ] Инсталација у окружењу без `npm` у PATH-у враћа 500 са разумљивом поруком о грешци (без трага стека)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` враћа 200 за мање од 2 min
- [ ] `POST /api/services/cliproxy/start` враћа 200 и `state: "running"` за мање од 30 s
- [ ] `GET /api/services/cliproxy/status` пријављује `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` враћа 200 и `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` враћа SSE ток

### Провера безбедносне регресије

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` враћа `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` враћа `403 LOCAL_ONLY`
- [ ] Одговори са грешком из `/api/services/*` не садрже `err.stack` нити апсолутне путање до датотека

## Провере за v3.8.0+

Пре објављивања било ког издања v3.8.x, проверите и следеће ставке:

- [ ] `omniroute --tray` се покреће на macOS-у (systray2 је инсталиран у `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` се покреће на Linux-у (захтева DISPLAY; разумљива грешка ако није подешен)
- [ ] `omniroute --tray` се покреће на Windows-у (PowerShell NotifyIcon, без додатних бинарних датотека)
- [ ] `omniroute config tray enable` прави ставку за аутоматско покретање; онемогућавање је уклања
- [ ] `npm install -g omniroute@<this-version>` извршава postinstall без критичног прекида
- [ ] Путања ажурирања задржава опционе зависности: `omniroute update --apply` и аутоматски програм за ажурирање
      покрећу `npm install -g … --include=optional` како би `optionalDependencies` (better-sqlite3,
      keytar, tls-client и llmlingua SLM стек: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) опстале након ажурирања. Ултра `modelPath` SLM ниво такође захтева
      tinybert модел, који се при првој употреби аутоматски преузима у `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) затим смешта опциони SLM скуп зависности у
      `dist/node_modules` како би worker разрешио ЈЕДНУ инстанцу `@huggingface/transformers` ^4.2.0
      — самостални trace пакети садрже само transformers, а не и динамички увезене
      опционе зависности, па би без овога worker учитао llmlingua-2 са transformers пакетом из корена,
      а SLM ниво би неприметно наставио рад без те функционалности.
- [ ] `omniroute status` ради без `.env` (путања CLI токена, само loopback)
- [ ] `curl http://localhost:20128/api/shutdown` враћа 401 (рута је увек заштићена)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` враћа 401 (loopback заштита)
- [ ] SQLite runtime се при првом покретању разрешава као `bundled` (уграђена бинарна датотека је важећа за платформу)
- [ ] SQLite runtime прелази на `runtime` када се `node_modules/better-sqlite3` избрише
- [ ] Паметни MCP филтер компресује стварни излаз `playwright-mcp browser_snapshot` (смањење ≥50%)
- [ ] Свих 10 датотека `skills/omniroute*/SKILL.md` јавно су доступне преко директног GitHub URL-а
- [ ] Чаробњак за почетно подешавање приказује корак обиласка нивоа „Како функционише“ при новом подешавању
- [ ] Виџет покривености нивоа на почетној контролној табли приказује број конфигурисаних/активних нивоа

---

## Издвајање 3.9.0 LTS (увежбано у 3.8.58)

После v3.8.59, следећа верзија је 3.9.0, а њен врх постаје основа за две дуготрајне гране:
`stable/v3` (v3 LTS линија, npm `latest`) и `develop` (v4, подигнута на 4.0.0, npm
`nightly`). Модел грана/канала, прослеђивање измена и ознаке описани су у
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); план је у [ROADMAP](../../ROADMAP.md) (фаза 3). Издвајање се обавља једном;
3.8.58 га увежбава од почетка до краја на форку, а 3.8.59 се завршава
[GO/NO-GO контролном листом](./LTS_GO_NO_GO.md).

### Пробно покретање (само за читање, безбедно у сваком тренутку)

```bash
npm run release:dry-run-lts-cut                       # стварно издвајање: 3.9.0 из HEAD, претходна ознака v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # фиксирај изворни комит
```

`scripts/release/dry-run-lts-cut.mjs` не извршава ништа: чита git и `gh` и исписује
целокупан редослед — предуслове (извор се разрешава, изворно спремиште има комплетну историју —
плитки клон не може да пошаље `stable/v3`, пријемна страна одбија пакет код првог
накалемљеног родитеља, зато издвајање обавите из потпуног клона или најпре покрените
`git fetch --unshallow origin` — претходна ознака постоји, `package.json` има циљну верзију,
отворен је проблем `release-freeze`, нема отвореног проблема `Release branch not green`
на постојећој грани издања — грана која не постоји пријављује `?` као непознато стање, никада
као зелено — Mergify ред `release` је конфигурисан (G11: `queue_rules`, `checks_timeout`,
ознака `queue`), скуп правила `release/*` и даље блокира брисање и принудно слање, а
`stable/v3` и `develop` још не постоје), два корака за гране, који окидачи неактивних токова рада
и услови `if:` постају тачни (а који остају ограничени променљивом спремишта или
фиксирани на канонско спремиште), очекиване dist-tags ознаке (`latest` → 3.9.0, `next` и
`nightly` су празне) и враћање на претходно стање. Излазни код `0` = `RESULT: READY`, `1` = блокирајући
предуслов није испуњен (`✗`), `2` = грешка при употреби. `--advisory <id,...>` снижава проверу на упозорење (`!`)
не скривајући је.

Покрените пробно покретање стварног издвајања док је замрзавање издања 3.9.0 још активно — гране се
праве после ознаке и пре него што фаза 12c укине замрзавање.

### Проба за 3.8.58 (само на форку)

```bash
# 1. Пробно покретање на тренутном врху са параметрима пробе
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Извршите над удаљеним ФОРКОМ (origin, или било који удаљени чији URL води до канонског
#    спремишта, биће одбијен; сваки корак тражи потврду у терминалу)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Испробајте неактивне токове рада у форку (workflow_dispatch тамо где пробно покретање
#    пријављује фиксирање на канонско спремиште), а затим вратите претходно стање
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Комит за подизање верзије гране develop прави се помоћу git plumbing механизама (радно стабло се не мења) и ажурира
истих пет датотека као комит за отварање циклуса: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` и `docs/openapi.yaml`. Одељак `[4.0.0]`
у CHANGELOG-у и његови i18n еквиваленти накнадно се отварају на `develop`, пре његовог првог
PR-а. Скрипта никада не мења npm dist-tags ознаке — увежбајте их на пробном пакету.

### Артефакт за преглед PR-а (направите једном, промовишите исте бајтове)

`.github/workflows/preview-artifact.yml` прави једну продукциону tarball архиву из врха PR-а и
проверава управо ту верзију (#8084, део (a)). Само за PR-ове у истом спремишту; ништа се не објављује.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # или додајте ознаку `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # пробна инсталација
```

Покретање извршава `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, пакује
tarball архиву, покреће `npm run check:pack-boot` (лажне тајне, привремени директоријум података), поново пакује и
не успева ако сажетак није идентичан, затим бележи `artifact-identity.json` (SHA врха, SHA основе,
хеш lockfile датотеке, платформа, архитектура, node ABI, алат за паковање, политика изградње —
`scripts/release/artifact-identity.mjs`) и у засебном задатку атестира tarball архиву. Промовисање
пробне верзије значи инсталирање те tarball архиве: никада је немојте поново правити из изворног кода.

### Издвајање (3.9.0, после одлуке GO)

1. Одлука GO је забележена у [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` исписује `RESULT: READY`.
3. Ручно направите гране на `origin` помоћу команди које испише пробно покретање —
   скрипта одбија да шаље на `origin`. Да бисте поново употребили прегледани develop комит, најпре покрените
   пробу са `--execute` на врху 3.9.0 према свом форку; она исписује оба SHA-а, а
   исти комити се могу послати:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Zaštitite `stable/v3` i `develop` (skupovi pravila + red za spajanje) pre nego što prvi PR bude prihvaćen.
5. Neaktivni radni tokovi se uključuju postojanjem grane: `forward-port.yml` (slanje izmena na
   `stable/v3`), `validate-stable-pr.yml` (PR-ovi ka `stable/v3`) i `nightly-v4-build.yml`
   (izgradnja grane `develop`). Pre puštanja u rad, podesite repozitorijumsku tajnu `secrets.FORWARD_PORT_TOKEN` (kako bi se CI pokretao za
   PR-ove za prosleđivanje izmena); noćno objavljivanje ostaje isključeno dok vlasnik ne podesi repozitorijumsku
   promenljivu `vars.NIGHTLY_PUBLISH` na `true` i npm Trusted Publishing ne prihvati
   `nightly-v4-build.yml`. Razrešavanje kanala obavlja `scripts/release/dist-tag.mjs`, isti
   razrešavač koji koristi `npm-publish.yml`.
6. Proverite kanale: `npm view omniroute dist-tags --json` prikazuje `latest` = 3.9.0 i nema
   `next` / `nightly` dok se v4 ne objavi.
7. Vraćanje na prethodno stanje, ako je potrebno: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   i `npm dist-tag add omniroute@3.8.59 latest`.

---

## Vraćanje na prethodnu verziju

Ako izdanje ima kritičan problem:

1. `gh release edit vX.Y.Z --prerelease` (označava ga kao izdanje koje nije najnovije)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (samo ako ga korisnici još nisu usvojili)
3. Ili: hitna ispravka na `release/vX.Y.0` → zakrpljeno izdanje `vX.Y.(Z+1)`
4. Odmah obavestite korisnike putem GitHub Discussions i Discord-a

## Stroga pravila

- Nikada nemojte direktno praviti commit na grani `main`
- Nikada nemojte koristiti `git push --force` na granama `main` ili `release/*`
- Nikada nemojte preskakati Husky hooks (`--no-verify`)
- Nikada nemojte uključivati tajne, pristupne podatke ili `.env` datoteke u commit
- Pokrivenost mora ostati ≥60/60/60/60 (iskazi/linije/funkcije/grane)
- Pri izmeni produkcionog koda u `src/`, `open-sse/`, `electron/` ili `bin/` uvek uključite ili ažurirajte testove

## Automatizovana provera sinhronizacije

Lokalno pokrenite zaštitnu proveru sinhronizacije dokumentacije pre otvaranja PR-a:

```bash
npm run check:docs-sync
```

CI takođe pokreće ovu proveru u `.github/workflows/ci.yml` (lint zadatak).
