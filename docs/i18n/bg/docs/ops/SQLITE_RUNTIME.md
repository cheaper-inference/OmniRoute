# SQLite Runtime Resolution (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute определя своя SQLite драйвер при стартиране чрез 5-стъпкова верига за резервен избор:

1. **Вграден `better-sqlite3`** (чрез `dependencies` в `package.json`)
   — най-бързият вариант, собствен двоичен файл, инсталиран от `npm install`, когато са налични инструменти за компилиране.

2. **Инсталиран по време на изпълнение `better-sqlite3`** (в `~/.omniroute/runtime/`)
   — инсталира се отложено при първото стартиране **ИЛИ** чрез `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Проверява магическите байтове на собствения `.node` файл (ELF / Mach-O / PE), преди да го зареди,
   за да се предпази от повредени двоични файлове или такива за неправилна платформа.

3. **`node:sqlite`** (стандартна библиотека на Node ≥22.5) — не изисква компилиране на собствен модул; използва се, когато
   и двата пътя за better-sqlite3 са неуспешни. Ограничен набор от възможности.

4. **`sql.js`** (WASM) — последен резервен вариант. Работи навсякъде, но е по-бавен
   и записва данните през определен интервал, а не синхронно.

## Защо е необходима тази сложност?

- **Windows EBUSY**: `npm install -g omniroute@latest` може да е неуспешна, ако
  `better_sqlite3.node` от предишната версия е заключен от изпълняващ се процес. Инсталирането по време
  на изпълнение в `~/.omniroute/runtime/` заобикаля глобалния кеш на npm.
- **Липса на инструменти за компилиране**: Някои среди (корпоративен Windows без VS Build
  Tools, минимални Docker образи) не могат да компилират `better-sqlite3`. Инсталаторът по време
  на изпълнение извлича предварително компилиран двоичен файл от регистъра на npm; резервните
  драйвери гарантират, че OmniRoute все пак ще се стартира дори ако това е неуспешно.
- **Изолирани от мрежата системи**: Ако регистърът на npm е недостъпен, `node:sqlite`
  или `sql.js` гарантират базова функционалност.

## Проверка на магическите байтове

Преди да зареди инсталиран по време на изпълнение `.node` файл, OmniRoute прочита първите 8
байта и ги сравнява с познатите магически стойности за платформите:

| Платформа               | Байтове (hex) | Етикет      |
| ----------------------- | ------------- | ----------- |
| Linux                   | `7F 45 4C 46` | `elf`       |
| macOS 64-битов BE       | `FE ED FA CF` | `macho`     |
| macOS 64-битов LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (универсален) | `CA FE BA BE` | `macho-fat` |
| Windows                 | `4D 5A` (MZ)  | `pe`        |

Несъответстваща магическа стойност → файлът се игнорира и резервният избор продължава със следващата стъпка.

## Проверка на активния драйвер

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ръчно управление

```bash
# Пропускане на предварителното инициализиране след инсталация (за бързи CI инсталации)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Принудително повторно инсталиране на better-sqlite3 за средата на изпълнение
rm -rf ~/.omniroute/runtime
omniroute  # ще се инсталира повторно при следващото стартиране

# Проверка кой драйвер е активен
omniroute config db-info  # (ако CLI командата съществува)
```

## Диагностициране на синхронни забавяния

При `better-sqlite3` задайте `OMNIROUTE_SQLITE_SLOW_MS=200` преди стартиране, за да включите
измерването на времето на синхронния адаптер. По подразбиране то е изключено. Завършена операция, която отнема
поне толкова милисекунди, генерира предупреждение `[SQLITE-SLOW]`, най-много веднъж на
десет секунди за всеки адаптер. Предупреждението съдържа само драйвера, класа на операцията
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, транзакция или поддръжка) и
изминалите милисекунди: без SQL, обвързани стойности, редове, пътища или текст на изключения.

Това е помощно средство за диагностика, а не механизъм за изчакване или оптимизация на заявки. То не може да отчете
операция, която никога не завършва, да различи процесорна работа от изчакване на диска, да идентифицира
точния SQL или да наблюдава операции, извършвани чрез директния манипулатор на драйвера.
Продължителността на асинхронното архивиране умишлено е изключена; останалите SQLite драйвери не се
инструментират чрез тази опционална настройка. Деактивирането на променливата възстановява първоначалния адаптер
без обвивки за измерване на времето. Не се променят схемата на базата данни или съхранената конфигурация.

Предупреждението за забавяне на `/healthz` отчита пиковото забавяне на цикъла на събитията след предишната извадка,
а не средната стойност за целия период на работа. Съпоставете времевите му маркери с предупрежденията за бавни операции
и метриките на хоста/хранилището, преди да заключите, че забавянето се дължи на SQLite или повреда на диска.

## Справка

Реализация:

- `bin/cli/runtime/magicBytes.mjs` — помощни средства за проверка на магическите байтове на двоични файлове
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-стъпков механизъм за избор по време на изпълнение + отложен инсталатор
- `bin/cli/runtime/index.mjs` — оркестратор при стартиране (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — кука на npm след инсталиране (предварително инициализиране без фатална грешка)
- `src/lib/db/core.ts` — експорти на `ensureDbInitialized()` / `getDriverInfo()`

## Топология с един записващ процес (HA не се поддържа)

Горната верига за резервен избор на драйвер все пак се изпълнява в **един процес**. При SQLite
по подразбиране OmniRoute използва **един записващ процес**:

- Не свързвайте две реплики на OmniRoute към един и същ файл `storage.sqlite`.
- Рестартиране на контейнер, внедряване чрез Recreate, прекратяване поради OOM или рестартиране от HEALTHCHECK прекъсва
  всяка активна SSE сесия. Стандартният път не предвижда изчакване за приключване на сесиите.
- Проверка за работоспособност от оркестратора, която третира бавен `/healthz` като неработещ, ще прекрати единствената
  реплика. Предпочитайте TCP проверка за работоспособност + HTTP `/healthz` проверка за готовност. Вижте
  [Ръководство за Docker — наличност](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  и [Препоръки за Kubernetes проверки](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
