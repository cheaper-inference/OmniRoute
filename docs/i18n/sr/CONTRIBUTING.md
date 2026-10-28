# Contributing to OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Hvala vam na interesovanju za doprinos! Ovaj vodič obuhvata sve što je potrebno da počnete.

Za zvanični tok rada po pojedinačnoj izmeni, počnite od
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ovaj dokument mapira izmene provajdera, rutiranja,
UI/UX-a, i18n-a, CLI-ja, baze podataka i build/deploy izmena na njihove ugovore, fokusirane testove, pokrivenost CI-jem
i korake usaglašavanja.

---

## Подешавање развојног окружења

### Предуслови

- **Node.js** `>=22.22.2 <23`, или `>=24.0.0 <27` (препоручено: 24 LTS)
- **npm** 10+

> **Корисници npm v11+ (Node 24+):** Након `npm install`, проверите да ли су изворни модули инсталирани:
> `node -e "require('better-sqlite3')"`. Ако команда не успе уз грешку `MODULE_NOT_FOUND`,
> покрените `npm approve-scripts better-sqlite3 && npm install`. Погледајте
> [Решавање проблема](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Клонирање и инсталација

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Променљиве окружења

```bash
# Направите своју .env датотеку на основу шаблона
cp .env.example .env

# Генеришите неопходне тајне
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Кључне променљиве за развој:

| Променљива             | Подразумевана вредност за развој | Опис                       |
| ---------------------- | -------------------------------- | -------------------------- |
| `PORT`                 | `20128`                          | Порт сервера               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`         | Основни URL за фронтенд    |
| `JWT_SECRET`           | (генерисати изнад)               | Тајна за потписивање JWT-а |
| `INITIAL_PASSWORD`     | `CHANGEME`                       | Лозинка за прву пријаву    |
| `APP_LOG_LEVEL`        | `info`                           | Ниво опширности евиденције |

### Подешавања контролне табле

Контролна табла пружа прекидаче корисничког интерфејса за функције које се такође могу конфигурисати путем променљивих окружења:

| Локација подешавања   | Прекидач                | Опис                                                   |
| --------------------- | ----------------------- | ------------------------------------------------------ |
| Подешавања → Напредно | Режим отклањања грешака | Омогућава евиденцију захтева за отклањање грешака (UI) |
| Подешавања → Опште    | Видљивост бочне траке   | Приказује/скрива одељке бочне траке                    |

Ова подешавања се чувају у бази података и опстају након поновних покретања, а када су постављена, имају предност над подразумеваним вредностима променљивих окружења.

### Локално покретање

```bash
# Развојни режим (аутоматско поновно учитавање)
npm run dev

# Продукциона изградња
npm run build    # next build → .build/next/ затим assembleStandalone → dist/
npm run start

# Брзо компајлирање само бекенда/API-ја за измене сарадника
npm run build:contributor

# Изградња издања (чиста поновна изградња + HEAD контролна ознака — обавезно за постављање)
npm run build:release   # rm -rf .build dist && изградња + уписује dist/BUILD_SHA

# Уобичајена конфигурација порта
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Изградња за сараднике обавља проверу само компајлирањем: не саставља самосталну
дистрибуцију нити изграђује опционе изворне ресурсе за паковање. Користите редовну продукциону изградњу када
треба да проверите пакет спреман за испоруку.

### Распоред излазних датотека изградње

| Директоријум | Садржај                                                                           | Праћено |
| ------------ | --------------------------------------------------------------------------------- | ------- |
| `src/`       | Изворни код апликације (TypeScript / TSX)                                         | Да      |
| `.build/`    | Посредне датотеке — излаз `next build` (игнорише их Git, `distDir = .build/next`) | Не      |
| `dist/`      | Пакет спреман за испоруку — саставља га `assembleStandalone` (игнорише га Git)    | Не      |

Процес изградње се извршава у једном пролазу:

```
npm run build
  └─ next build → .build/next/standalone  (излаз Next.js-а)
  └─ assembleStandalone()                 (копира самосталне + статичке + јавне + изворне ресурсе)
       └─ излаз: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` додатно прво чисти оба директоријума и уписује
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) као контролну ознаку интегритета постављања.

`npm run build:contributor` користи профил изградње само за бекенд. Он привремено замењује
датотеке корисничког интерфејса контролне табле помоћним датотекама током изградње, задржава обрађиваче API рута и враћа оригиналне датотеке
након изградње. Користите `npm run build` за измене које утичу на кориснички интерфејс контролне табле или за потпуну
проверу издања; профил за сараднике није замена за изградњу издања.

> **Напомена за постављање на VPS:** удаљени директоријум слике `/usr/lib/node_modules/omniroute/app/`
> остаје непромењен. Вештине за постављање помоћу rsync-а синхронизују садржај директоријума `dist/` у њега.
> Промењена је само путања излаза изградње унутар репозиторијума (`app/` → `dist/`).

Подразумевани URL-ови:

- **Контролна табла**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git radni tok

> ⚠️ **NIKADA ne commit-ujte direktno na `main`.** Uvek koristite feature grane.
>
> **PR baza:** cilj je aktivna `release/vX.Y.Z` grana (ne `main`). Pogledajte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) za
> release-per-branch + tag-at-ship model.

```bash
# Napravite granu od aktivnog release tip-a (primer: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... napravite izmene ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Otvorite Pull Request sa base = release/v3.8.49
```

### Imenovanje grana

| Prefiks     | Namena                     |
| ----------- | -------------------------- |
| `feat/`     | Nove funkcionalnosti       |
| `fix/`      | Ispravke grešaka           |
| `refactor/` | Restrukturiranje koda      |
| `docs/`     | Izmene dokumentacije       |
| `test/`     | Dodavanje/ispravke testova |
| `chore/`    | Alati, CI, zavisnosti      |

### Poruke commit-a

Pratite [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Obim (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Покретање тестова

```bash
# Сви тестови (јединични + vitest + екосистемски + e2e)
npm run test:all

# Једна тест-датотека (уграђени Node.js покретач тестова — већина тестова користи њега)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Само јединични тестови на које утиче ваша измена (исти TIA селектор као у CI контролној тачки, #8084)
npm run test:scoped            # измене у последњој потврди (или радном стаблу)
npm run test:scoped:staged     # само припремљене измене — добро се уклапа са покретањем пре потврде
npm run test:scoped:full       # прво поново изграђује мапу графа увоза (након додавања/премештања датотека)
# Излазни код 1 + „покрените цео скуп“ значи да је измењена централна датотека (tsconfig, package.json, …) или
# немапирани извор — селектор безбедно прекида рад и никада неприметно не прескаче тестове.

# Vitest (MCP сервер, autoCombo, кеш)
npm run test:vitest

# E2E тестови (захтевају Playwright)
npm run test:e2e

# E2E тестови клијената протокола (MCP транспорти, A2A)
npm run test:protocols:e2e

# Тестови компатибилности екосистема
npm run test:ecosystem

# Контролна тачка покривености: 60% исказа/линија/функција/грана
npm run test:coverage
npm run coverage:report

# Провера линтовања + форматирања
npm run lint
npm run check

# Контролисани кратки комбиновани тест са стварним узводним системима (захтева приступ VPS-у + кредите стварног добављача)
# Приступа СТВАРНИМ добављачима — кошта мало. НИКАДА се не покреће у CI-ју. Уредно се прескаче без контролне променљиве.
# Потребно: приступ преко ssh root@192.168.0.15 (учитава снимак базе података само за читање са VPS-а).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Фаза 3 кратког теста активног VPS-а — обичне Node ESM скрипте које директно приступају активном .15 серверу.
# Захтева: приступ преко ssh root@192.168.0.15 (комбинације се креирају/уклањају преко SSH sqlite).
# Приступа СТВАРНИМ добављачима (мали трошак). Креира/брише само __live_test__* комбинације. НИКАДА се не покреће у CI-ју.
# На .15 је REQUIRE_API_KEY=false, па API кључ није потребан, али поштује COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ако су подешени.
npm run test:combo:live:vps              # 7 HTTP сценарија (приоритет/редом/пондерисано/трошак/фузија/аутоматски + исправност)
npm run test:combo:live:vps:failover     # додаје стварни сценарио пребацивања између добављача (укупно 8)
```

Напомене о покривености:

- `npm run test:coverage` мери покривеност изворног кода за главни скуп јединичних тестова, изузима `tests/**` и укључује `open-sse/**`
- Захтеви за спајање морају да одрже контролну тачку покривености на **60%+** исказа/линија/функција/грана
- Ако PR мења продукциони кôд у `src/`, `open-sse/`, `electron/` или `bin/`, мора да дода или ажурира аутоматизоване тестове у истом PR-у
- `npm run coverage:report` приказује детаљан извештај по датотекама из последњег покретања провере покривености
- `npm run test:coverage:legacy` чува старију метрику ради историјског поређења
- Погледајте `docs/ops/COVERAGE_PLAN.md` за фазни план побољшања покривености

### Захтеви за захтев за спајање

Пре отварања PR-а, користите
[Златну путању за доприносе](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) да бисте покренули усмерени циклус за
оно што сте изменили. Комплетан скуп јединичних тестова (4 CI партиције), Vitest, контролна тачка покривености од **60%+** и
продукциона изградња одговорност су CI-ја — њихово локално покретање не пружа додатне информације које вам PR
провере већ неће дати, а на слабијим машинама може да преоптерети домаћина (#8084):

- Покрените тест-датотеке које покривају вашу измену: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Покрените `npm run lint`
- Додајте или ажурирајте аутоматизоване тестове у истом PR-у кад год се промени продукциони кôд
- У `node:test` датотекама поставите сваки `await` највишег нивоа (као што је `await import(...)`) пре првог `test()` / `describe()`: под `--test-force-exit`, тестови регистровани после њега могу неприметно да остану непокренути (#18045; спроводи се помоћу `npm run check:test-tla-order`)
- У опис PR-а укључите измењене или додате тест-датотеке када је продукциони кôд промењен
- Проверите SonarQube резултат на PR-у када су тајне пројекта конфигурисане у CI-ју

Тренутно стање тестова: **122 датотеке јединичних тестова** које покривају:

- Преводиоце добављача и конверзију формата
- Ограничавање брзине, прекидач кола и отпорност
- Семантички кеш, идемпотентност и праћење напретка
- Операције над базом података и шему (21 модул базе података)
- OAuth токове и аутентификацију
- Валидацију API крајњих тачака (Zod v4)
- Алатке MCP сервера и спровођење опсега
- Системе меморије и вештина

---

## Стил кода

- **ESLint** — Покрените `npm run lint` пре комитовања
- **Prettier** — Аутоматско форматирање преко `lint-staged` приликом комита (2 размака, тачка-запета, дупли наводници, ширина од 100 карактера, es5 зарези на крају)
- **TypeScript** — Сав `src/` код користи `.ts`/`.tsx`; `open-sse/` користи `.ts`/`.js`; документовати уз TSDoc (`@param`, `@returns`, `@throws`)
- **Без `eval()`** — ESLint примењује `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod валидација** — Користити Zod v4 шеме за сву валидацију API уноса
- **Именовање**: Фајлови = camelCase/kebab-case, компоненте = PascalCase, константе = UPPER_SNAKE

### Обрада грешака / празни catch блокови

Никада не остављајте `catch` необјашњен. Класифицирајте га у једну од две категорије (операционализује
строго правило "никада не гутати грешке ћутке у SSE токовима"):

- **Намерно (наше сопствено чишћење/телеметрија по принципу најбољег покушаја)** — грешка овде је очекивана и
  безопасна; додајте једноредни коментар са образложењем, без логовања (логовање на сваком захтеву представља
  шум који ова конвенција избегава).

  ```ts
  } catch {} // затварање већ затвореног controller-а након прекида везе клијента је очекивано
  ```

- **Треба логовати (спољашњи код, или код испоручен од позивача, или гутање мења ток контроле)** — задржите
  catch (никада не дозволите да прекине ток), али емитујте контекстуалну `console.debug`/`warn` поруку тако да
  грешка буде уочљива.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Погледајте `open-sse/utils/stream.ts` и `open-sse/utils/streamHandler.ts` за примењене примере.

---

## Структура пројекта

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 рутер апликације
│   ├── (dashboard)/        # Странице контролне табле (23 одељка)
│   ├── api/                # API руте (51 директоријум)
│   └── login/              # Странице за аутентификацију (.tsx)
├── domain/                 # Механизам политика (policyEngine, comboResolver, costRules, итд.)
├── lib/                    # Основна пословна логика (.ts)
│   ├── a2a/                # Сервер протокола Agent-to-Agent v0.3
│   ├── acp/                # Регистар протокола за комуникацију агената
│   ├── compliance/         # Механизам политика усклађености
│   ├── db/                 # SQLite доменски модули + 130 миграција
│   ├── memory/             # Трајна меморија разговора
│   ├── oauth/              # OAuth добављачи, услуге и помоћни алати
│   ├── skills/             # Прошириви оквир вештина
│   ├── usage/              # Праћење употребе и израчунавање трошкова
│   └── localDb.ts          # Само слој за поновни извоз — овде никада не додајте логику
├── middleware/              # Посреднички софтвер за захтеве (promptInjectionGuard)
├── mitm/                   # MITM прокси (сертификат, DNS, усмеравање ка циљу)
├── shared/
│   ├── components/         # React компоненте (.tsx)
│   ├── constants/          # Дефиниције добављача (329), MCP опсези, 20 стратегија усмеравања
│   ├── utils/              # Прекидач струјног кола, санитизатор, помоћни алати за аутентификацију
│   └── validation/         # Zod v4 шеме
└── sse/                    # SSE прокси ток обраде

open-sse/                   # @omniroute/open-sse радни простор
├── executors/              # 150 извршних модула (класе извршилаца + помоћни алати за сваког добављача)
├── handlers/               # 11 обрађивача захтева (ћаскање, одговори, угнежђивања, слике, итд.)
├── mcp-server/             # MCP сервер (110 јединствених алата, 3 транспорта, 33 опсега)
├── services/               # 178 услуга највишег нивоа (combo, autoCombo, rateLimitManager, итд.)
├── translator/             # Преводиоци формата (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Трансформатор Responses API-ја
└── utils/                  # 22 помоћна модула (ток, TLS, прокси, евидентирање)

electron/                   # Electron десктоп апликација (за више платформи)

tests/
├── unit/                   # Node.js покретач тестова (1,574 тест-датотеке)
├── integration/            # Интеграциони тестови
├── e2e/                    # Playwright тестови
├── security/               # Безбедносни тестови
├── translator/             # Тестови специфични за преводиоце
└── load/                   # Тестови оптерећења

docs/
├── adr/                     # Записи архитектонских одлука
├── architecture/            # Архитектура и отпорност система
├── comparison/              # OmniRoute у односу на алтернативе
├── compression/             # Водичи и правила за компресију
├── dev/                     # Водичи за развој
├── diagrams/                # Дијаграми архитектуре
├── frameworks/              # MCP, A2A, OpenCode, меморија, вештине
├── guides/                  # Кориснички водич, Docker, подешавање, решавање проблема
├── i18n/                    # Интернационализовани README преводи
├── marketing/               # Маркетиншки материјали
├── ops/                     # Примена, прокси, покривеност, издања
├── providers/               # Документација специфична за добављаче
├── reference/               # API референца, променљиве окружења, CLI алати, бесплатни нивои
├── releases/                # Напомене о издањима
├── routing/                 # Механизам аутоматског комбиновања, поновна репродукција резоновања
├── screenshots/             # Снимци екрана контролне табле
├── security/                # Заштитне мере, усклађеност, прикривеност, токени
└── specs/                   # Спецификације дизајна
```

---

## Додавање новог провајдера

### Корак 1: Регистрација константи провајдера

Додајте у `src/shared/constants/providers.ts` — валидира се Zod-ом при учитавању модула.

### Корак 2: Додавање извршитеља (executor) (ако је потребна прилагођена логика)

Направите извршитеља у `open-sse/executors/your-provider.ts` који проширује основни (base) извршитељ.

### Корак 3: Додавање преводиоца (translator) (ако формат није OpenAI)

Направите преводиоце захтева/одговора у `open-sse/translator/`.

### Корак 4: Додавање OAuth конфигурације (ако се заснива на OAuth-у)

Додајте OAuth креденцијале у `src/lib/oauth/constants/oauth.ts` и сервис у `src/lib/oauth/services/`.

Ако upstream провајдер дистрибуира јавни OAuth client_id/secret или Firebase Web API кључ унутар свог јавног CLI / browser пакета, **немојте** га уграђивати као стринг литерал. Користите `resolvePublicCred()` из `open-sse/utils/publicCreds.ts` и додајте маскирани byte запис у `EMBEDDED_DEFAULTS`. Комплетан обавезан ток рада документован је у [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Унутар handler-а/executor-а, поруке о грешкама које стижу до клијента морају пролазити кроз `buildErrorBody()` / `sanitizeErrorMessage()` из `open-sse/utils/error.ts` — никада не стављајте сирове `err.stack` или `err.message` у тело Response-а. Погледајте [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Корак 5: Регистрација модела

Додајте дефиниције модела у `open-sse/config/providerRegistry.ts`.

### Корак 6: Додавање тестова

Напишите унит тестове у `tests/unit/` који покривају минимално:

- Регистрацију провајдера
- Превод захтева/одговора
- Обраду грешака

---

## Контролна листа за Pull Request

- [ ] Тестови пролазе (`npm test`)
- [ ] Провера lint правила пролази (`npm run lint`)
- [ ] Изградња је успешна (`npm run build`)
- [ ] Додати су TypeScript типови за нове јавне функције и интерфејсе
- [ ] Нема хардкодованих тајни или резервних вредности
- [ ] Јавни приступни подаци узводног система уграђени су помоћу `resolvePublicCred()` (погледајте [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), никада као литерали
- [ ] Одговори са грешкама пролазе кроз `buildErrorBody()` / `sanitizeErrorMessage()` — нема необрађених stack trace-ова у телима одговора (погледајте [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Команде љуске (`exec` / `spawn`) прослеђују вредности током извршавања преко `env`, а не путем интерполације стрингова
- [ ] Сви улази су валидирани помоћу Zod шема
- [ ] Додат је **фрагмент** евиденције измена у `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` за измене видљиве корисницима (погледајте [`changelog.d/README.md`](./changelog.d/README.md)) — немојте директно уређивати `CHANGELOG.md`; фрагменти се обједињују приликом издавања и никада не изазивају конфликте између PR-ова
- [ ] Документација је ажурирана (ако је применљиво)
- [ ] Нису отворена нова CodeQL упозорења нити упозорења Secret-Scanning-а, или је свако одбачено уз техничко образложење које упућује на релевантни документ у `docs/security/`
- [ ] Руте које покрећу подређене процесе (`/api/mcp/`, `/api/cli-tools/runtime/`) класификоване су као `isLocalOnlyPath()` у `src/server/authz/routeGuard.ts` — погледајте [Строго правило #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Нема AI/bot `Co-authored-by` завршних редова у порукама commit-а (Строго правило #16) — људски сарадници чији је рад поново употребљен наводе се помоћу стандардних `Co-authored-by: Name <email>` завршних редова

---

## Издавање

Издања се управљају путем `/generate-release` радног тока. Када се направи ново GitHub Release издање, пакет се **аутоматски објављује на npm** путем GitHub Actions.

За VPS деплојеве, користите `npm run build:release` (не `npm run build`) — он изводи чисту
поновну изградњу, склапа пакет у `dist/`, и уписује `dist/BUILD_SHA` сентинел.
Затим користите `/deploy-vps-*-cc` вештине које rsync-ују `dist/` у удаљени `app/` директоријум.

---

## Добијање помоћи

- **Архитектура**: Погледајте [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API референца**: Погледајте [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Документација о безбедности**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Документација о оперативном раду**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Проблеми**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
