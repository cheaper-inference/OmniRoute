# SQLite Runtime Resolution (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute определяет драйвер SQLite при запуске с помощью пятиступенчатой цепочки резервных вариантов:

1. **Встроенный `better-sqlite3`** (через `dependencies` в `package.json`)
   — самый быстрый вариант с нативным бинарным файлом, устанавливаемый командой `npm install` при наличии инструментов сборки.

2. **Установленный во время выполнения `better-sqlite3`** (в `~/.omniroute/runtime/`)
   — устанавливается отложенно при первом запуске **ИЛИ** через `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Перед загрузкой проверяются сигнатурные байты нативного файла `.node` (ELF / Mach-O / PE),
   что защищает от повреждённых бинарных файлов или файлов для другой платформы.

3. **`node:sqlite`** (стандартная библиотека Node ≥22.5) — не требует нативной сборки; используется, когда
   оба варианта с better-sqlite3 не сработали. Имеет ограниченный набор возможностей.

4. **`sql.js`** (WASM) — последний резервный вариант. Работает везде, но медленнее
   и записывает данные через определённые интервалы, а не синхронно.

## Зачем нужна такая сложность?

- **Windows EBUSY**: команда `npm install -g omniroute@latest` может завершиться ошибкой, если файл
  `better_sqlite3.node` предыдущей версии заблокирован запущенным процессом. Установка
  во время выполнения в `~/.omniroute/runtime/` позволяет обойти глобальный кеш npm.
- **Отсутствие инструментов сборки**: в некоторых средах (корпоративные системы Windows без VS Build
  Tools, минимальные образы Docker) невозможно скомпилировать `better-sqlite3`. Установщик
  среды выполнения получает предварительно собранный бинарный файл из реестра npm; резервные
  драйверы гарантируют, что OmniRoute всё равно запустится, даже если это не удастся.
- **Изолированные от сети системы**: если реестр npm недоступен, `node:sqlite`
  или `sql.js` гарантируют базовую функциональность.

## Проверка сигнатурных байтов

Перед загрузкой установленного во время выполнения файла `.node` OmniRoute считывает первые 8
байт и сопоставляет их с известными сигнатурами платформ:

| Платформа             | Байты (hex)   | Метка       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS, 64 бита, BE    | `FE ED FA CF` | `macho`     |
| macOS, 64 бита, LE    | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Если сигнатура не совпадает, файл игнорируется, а цепочка переходит к следующему резервному варианту.

## Проверка активного драйвера

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ручное управление

```bash
# Пропустить предварительную инициализацию postinstall (для быстрой установки в CI)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Принудительно переустановить runtime-версию better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # будет переустановлена при следующем запуске

# Проверить, какой драйвер активен
omniroute config db-info  # (если такая команда CLI существует)
```

## Диагностика синхронных задержек

При использовании `better-sqlite3` задайте `OMNIROUTE_SQLITE_SLOW_MS=200` перед запуском, чтобы
включить измерение времени выполнения синхронного адаптера. По умолчанию оно отключено. Если завершённая
операция занимает не меньше указанного количества миллисекунд, выводится предупреждение `[SQLITE-SLOW]`,
но не чаще одного раза в десять секунд для каждого адаптера. Предупреждение содержит только драйвер, класс
операции (`prepare`, `get`, `all`, `run`, `exec`, `pragma`, транзакция или обслуживание) и
затраченное время в миллисекундах: без SQL, привязок параметров, строк, путей или текста исключений.

Это средство диагностики, а не механизм тайм-аутов или оптимизации запросов. Оно не может сообщить
об операции, которая никогда не завершается, отличить вычисления CPU от ожидания диска, определить
точный SQL-запрос или наблюдать за операциями, выполняемыми через необработанный дескриптор драйвера.
Длительность асинхронного резервного копирования намеренно исключена; другие драйверы SQLite не
инструментируются этим механизмом, включаемым явно. Удаление переменной восстанавливает исходный адаптер
без обёрток для измерения времени. Схема базы данных и сохранённая конфигурация не изменяются.

Предупреждение `/healthz` о задержке сообщает пиковую задержку цикла событий с момента предыдущего
измерения, а не среднее значение за всё время работы. Сопоставляйте его временные метки с предупреждениями
о медленных операциях и метриками хоста/хранилища, прежде чем связывать задержку со сбоем SQLite или диска.

## Справочная информация

Реализация:

- `bin/cli/runtime/magicBytes.mjs` — вспомогательные средства проверки сигнатурных байтов бинарных файлов
- `bin/cli/runtime/sqliteRuntime.mjs` — пятиступенчатый механизм выбора драйвера во время выполнения и отложенный установщик
- `bin/cli/runtime/index.mjs` — оркестратор запуска (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — хук npm после установки (некритичная предварительная инициализация)
- `src/lib/db/core.ts` — экспорты `ensureDbInitialized()` / `getDriverInfo()`

## Топология с единственным процессом записи (HA не поддерживается)

Описанная выше цепочка резервных драйверов по-прежнему работает в **одном процессе**. По умолчанию
OmniRoute с SQLite использует **единственный процесс записи**:

- Не подключайте две реплики OmniRoute к одному файлу `storage.sqlite`.
- Перезапуск контейнера, развёртывание Recreate, завершение из-за OOM или перезапуск по HEALTHCHECK
  обрывает все активные сеансы SSE. В стандартном сценарии ожидание завершения сеансов отсутствует.
- Проверка работоспособности оркестратора, считающая медленный ответ `/healthz` признаком отказа, завершит
  единственную реплику. Для проверки работоспособности предпочтительно использовать TCP, а HTTP `/healthz` —
  для проверки готовности. См. [Руководство по Docker — доступность](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  и [рекомендации по проверкам Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
