# Quality Gates Reference (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Este documento es la referencia oficial para todos los controles de calidad de CI en OmniRoute.
Describe cada control, qué valida, en qué trabajo de CI se ejecuta, si utiliza
una línea base de ratchet o una política de aprobado/reprobado, y si bloquea la compilación o es consultivo.

Para consultar un breve resumen y la política de lista de permitidos, consulta la sección "Controles de calidad y ratchets"
en `AGENTS.md`. Para consultar la evaluación crítica, la clasificación de madurez y el plan de
replicación independiente de herramientas del mismo sistema, consulta el
[Manual de controles de calidad](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventario de gates y perfiles de ejecución

### Admisión de candidatos

Los workflows de CI y Quality Gates emiten cada uno un veredicto estable: `Gate / CI` y
`Gate / Quality`. Su política de admisión versionada enumera cada job ascendente
como obligatorio o informativo. Todo job obligatorio aplicable debe completarse correctamente:
los resultados ausentes, cancelados, omitidos, pendientes o desconocidos no pueden establecer
un estado PASS. Una clasificación válida de solo documentación o solo catálogo puede hacer que
un carril de código no sea aplicable; un PR en borrador no es un candidato aceptado. Una etiqueta
`hotfix` no exime de aportar evidencias.

Ambos workflows cubren los PR dirigidos a ramas main/release, los pushes a `main`, la ejecución
manual y los eventos de grupos de fusión. Los pushes, las ejecuciones manuales y los grupos de
fusión ejecutan la selección completa. Los pushes a `release/**` no los inician (2026-10-18):
cada cambio ya ejecutó la matriz en su PR y la combinación fusionada es responsabilidad de
Release-Green (`docs/ops/RUNNER_BOX.md` → Carril alojado). Los forks y los grupos de fusión
utilizan runners alojados para los jobs que, de otro modo, seleccionarían runners
autoalojados; antes del despliegue debe verificarse que haya suficiente capacidad alojada.

Cada comprobante JSON identifica el SHA extraído, la ejecución del workflow y el intento.
La CLI rechaza una discrepancia entre el SHA del checkout y el del evento. Las pruebas del
workflow vinculan la pertenencia a la política con la lista `needs` del job de veredicto,
de modo que un carril nuevo o eliminado no pueda desaparecer silenciosamente. Los comprobantes
abarcan su propio workflow, no la publicación, el despliegue ni el funcionamiento interno
de un escáner informativo existente. Activar ambos nombres de comprobación en las reglas de
rama es un cambio administrativo independiente; añadir estos jobs no protege por sí mismo
una rama.

### Inventario de análisis estático

El inventario versionado de alias de npm y la pertenencia al análisis estático se encuentran en
`config/quality/gate-manifest.json`. Ejecuta `npm run check:gate-manifest` para validar
los nombres de los scripts y los comandos exactos con respecto a `package.json`; las adiciones,
eliminaciones y divergencias de comandos hacen fallar tanto el hook local como los jobs de
clasificación de cambios en CI. Un alias no es un job de workflow, una instancia de matriz
ni un caso de prueba: estos recuentos no deben presentarse como intercambiables.

Usa `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list`
para inspeccionar los alias seleccionados sin ejecutarlos. El runner invoca el
punto de entrada de npm, por lo que se conserva su entorno de ejecución, incluido Bun donde
esté configurado. El manifiesto registra los alias externos a esos perfiles como invocados
por separado, y los comandos de mantenimiento están prohibidos en los perfiles de análisis
de solo lectura.

Estos perfiles abarcan únicamente el análisis estático. No certifican las pruebas del producto,
la cobertura, el empaquetado, las comprobaciones externas ni la aceptación completa de una
versión candidata. La admisión del workflow utiliza
`config/quality/admission-policy.json` y
`scripts/quality/admission-verdict.mjs`. Los perfiles del observador de versiones siguen
estando separados; inspecciona de forma independiente sus comprobaciones y comprobantes
aplicables. El inventario descriptivo que aparece a continuación es una referencia, no una
prueba de que un gate se haya ejecutado realmente.

Los scripts se encuentran en `scripts/check/` (gates de políticas) y `scripts/quality/`
(motor de ratchet). La fuente de verdad de CI es `.github/workflows/ci.yml`.

### Vía rápida para PR de versiones (`quality.yml`)

`.github/workflows/quality.yml` complementa CI en los PR de main/release, los pushes a `main`,
la ejecución manual y los grupos de fusión. Los PR utilizan comprobaciones rápidas filtradas
por rutas. Se eliminó la compilación duplicada deshabilitada permanentemente; las comprobaciones
reales de compilación, empaquetado y arranque permanecen en CI.

| Job                                              | Ámbito                                                                                                                                                                                                                                                                 | Bloqueante          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | PR de documentación/código; referencias de documentación de la API y docs-all                                                                                                                                                                                          | Sí                  |
| `Fast Quality Gates`                             | PR de código; comprobaciones estáticas, comprobación de tipos, comprobación de tipos del dashboard y pruebas unitarias afectadas                                                                                                                                       | Sí                  |
| `Forgotten sibling tests`                        | PR de código; los módulos modificados se rastrean hasta sus consumidores estáticos y posibles pruebas hermanas; las rutas de barrel y de importación dinámica se notifican como diagnósticos informativos, con las excepciones referenciadas de la lista de permitidos | **Informativo**     |
| `Vitest (fast-path)`                             | PR de código; suite rápida de vitest                                                                                                                                                                                                                                   | Sí                  |
| `Unit Tests fast-path`                           | PR de código; suite de pruebas unitarias en 4 shards                                                                                                                                                                                                                   | Sí                  |
| `No new ESLint warnings`                         | PR de código; protección de lint consciente de las supresiones                                                                                                                                                                                                         | Sí, incluidos forks |
| `Merge integrity (changelog + generated skills)` | PR que no sean borradores; sincronización del changelog y de las skills generadas                                                                                                                                                                                      | Sí, incluidos forks |

#### Informe de pruebas hermanas olvidadas

`npm run check:forgotten-sibling-tests` reutiliza el resolutor de importaciones en el que se basa el mapa de impacto de las pruebas.
Para cada módulo de producción modificado, informa de cadenas deterministas
`changed module/symbol -> static consumer -> candidate sibling test` cuando la prueba candidata
no está presente en el diff de la solicitud de incorporación de cambios. El resumen en Markdown y el resultado JSON se conservan como
el artefacto de flujo de trabajo `forgotten-sibling-tests` para su calibración antes de cualquier despliegue con carácter bloqueante.

Las reexportaciones mediante archivos barrel y las importaciones dinámicas son únicamente diagnósticos de resolución; nunca generan un
hallazgo bloqueante. Las excepciones revisadas se encuentran en
`config/quality/forgotten-sibling-allowlist.json`. Cada entrada debe indicar el consumidor y la prueba
candidata, proporcionar una justificación específica y enlazar a una incidencia o solicitud de incorporación de cambios de GitHub. Las entradas con formato incorrecto
provocan un fallo por defecto. Las excepciones no pueden omitir una prueba candidata eliminada ni un diff que añada `.skip`/`.todo`;
el debilitamiento de aserciones y otros mecanismos de ocultación siguen siendo responsabilidad de la comprobación bloqueante independiente
`check:test-masking`.

### Trabajo: `lint`

Se ejecuta en cada PR dirigida a `main`. Bloquea la fusión si falla.

| Script (`npm run ...`)            | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bloqueante                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | La versión de Node.js está dentro del intervalo compatible                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sí                                          |
| `check:cycles`                    | Importaciones circulares en todo `src/` + `open-sse/` (basado en AST, con los `paths` de tsconfig resueltos). La ejecución sin opciones termina con código 1 siempre que existe algún ciclo (cerrado ante fallos desde #15281) y enumera los SCC. `check:cycles:ratchet` (lo que ejecuta CI) bloquea cuando el recuento supera el límite máximo de `metrics.cycles` en `quality-baseline.json`: actualmente 14, `direction: down`, por lo que solo puede disminuir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sí (límite progresivo)                      |
| `check:boundary`                  | Acoplamiento `open-sse → src`: importaciones únicas de archivo a archivo desde el motor hacia la aplicación (`scripts/quality/measure-boundary.mjs`; la lista de dependencias es el trabajo pendiente de corrección de la separación entre el núcleo y los módulos de v4). Sin opciones = informe consultivo (igual que `quality:boundary`). `check:boundary:ratchet` (lo que ejecuta CI, también incluido en el bucle de límites progresivos de comprobaciones rápidas de `quality.yml`) bloquea cuando el recuento supera el límite máximo de `metrics.boundaryOpenSseToSrc` en `quality-baseline.json`: inicializado con el valor medido de 771, `direction: down`; `--update` solo lo reduce; relativo a la base en las PR (`--base-ref`, véase más abajo)                                                                                                                                                                                                                                                         | Sí (límite progresivo)                      |
| `check:route-validation:t06`      | Esquemas de Zod presentes en todas las rutas (política de nivel 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sí                                          |
| `check:any-budget:t11`            | El recuento de `@ts-expect-error // any` no supera el presupuesto (catraca de nivel 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                          |
| `check:provider-consistency`      | Cada proveedor de `providers.ts` tiene una entrada correspondiente en `providerRegistry.ts` (y viceversa, dentro de la lista de permitidos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sí                                          |
| `check:model-lifecycle`           | Las tres tablas de enrutamiento mantenidas manualmente permanecen coherentes con la instantánea del ciclo de vida incluida en el repositorio (#11503): `FITNESS_TABLE` (`taskFitness.ts`) no puntúa ningún id retirado que `REGISTRY` pueda enrutar; todos los destinos de `BUILT_IN_ALIASES` están presentes en `REGISTRY` y ausentes de la instantánea de ids retirados; todos los ids retirados que aún están en `REGISTRY` se reenvían o aparecen en `allowedRetiredInCatalog`; y ningún origen ni destino de `DEFAULT_DEGRADATION_MAP` aparece como retirado en esa instantánea. Esto no demuestra que un modelo esté siendo servido actualmente por un proveedor ascendente activo. Sin conexión: compara con `config/quality/model-lifecycle.json`, que se actualiza manualmente mediante `npm run quality:refresh-model-lifecycle` (requiere red; no está integrado en CI). `allowedRetiredInCatalog` es un mecanismo de reducción progresiva: añada una entrada únicamente con una incidencia de seguimiento. | Sí                                          |
| `check:fetch-targets`             | Cada `fetch("/api/...")` del código del cliente en `src/` se resuelve en un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sí                                          |
| `check:deps`                      | Todas las dependencias instalables mediante `npm install` de cada `package.json` del repositorio están en `dependency-allowlist.json`; se marcan los paquetes nuevos sin versiones fijadas o que podrían ser objeto de slopsquatting                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sí                                          |
| `audit:deps`                      | `npm audit` (raíz + Electron): no hay avisos de gravedad alta o crítica (se solapa con `check:vuln-ratchet` de osv; consulte el registro de racionalización pendiente)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                          |
| `check:lockfile`                  | Integridad de `package-lock.json`: registro HTTPS, hashes de integridad y ninguna sobrescritura de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                          |
| `check:licenses`                  | Lista de licencias SPDX permitidas para las dependencias de producción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                          |
| `check:tracked-artifacts`         | Sin artefactos de compilación ni enlaces simbólicos de `node_modules` confirmados (también se ejecuta en el pre-commit de husky; el pre-push es intencionadamente ligero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                          |
| `check:ai-attribution`            | Sin pie `Co-Authored-By` de IA/bot ni pie de generación mediante IA en los commits, el título o el cuerpo del PR — Regla estricta n.º 16 (en el bucle fast-gates de `quality.yml` para PR→`release/**` — lee la carga útil del evento y no realiza ninguna operación fuera de los PR — y un paso exclusivo para PR en el lint de `ci.yml` para PR→`main`; también en el hook `commit-msg` de husky; se permiten coautores humanos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Cada exclusión de Vitest menciona una incidencia de seguimiento y aparece en `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                          |
| `check:file-size`                 | Los archivos fuente (`.ts`/`.tsx` en `src/`, `open-sse/`, `electron/`, `bin/`) se mantienen dentro de `cap` y los archivos de prueba (`*.test.ts(x)`) dentro de `testCap`; los archivos congelados en `file-size-baseline.json` (`frozen` / `testFrozen`) no deben superar el tamaño registrado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí                                          |
| `check:error-helper`              | Las respuestas de error en ejecutores/controladores usan `buildErrorBody()` / `sanitizeErrorMessage()` (Regla estricta n.º 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sí                                          |
| `check:migration-numbering`       | Los archivos SQL de migración están numerados secuencialmente, sin saltos ni duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                          |
| `check:public-creds`              | No hay valores literales de OAuth `client_id`/`client_secret` ni claves web de Firebase fuera de `publicCreds.ts` (Regla estricta n.º 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sí                                          |
| `check:db-rules`                  | No hay SQL sin procesar fuera de los módulos de `src/lib/db/`; no hay importaciones de barril desde `localDb.ts` (Reglas estrictas n.º 2 y n.º 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                          |
| `check:known-symbols`             | Los ejecutores de proveedores, las estrategias de enrutamiento y los traductores registrados en sus tablas de despacho coinciden con los archivos del disco; no hay símbolos huérfanos ni sin declarar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                          |
| `check:route-guard-membership`    | Cada ruta que genera un proceso secundario está clasificada por `isLocalOnlyPath()` (Reglas estrictas n.º 15 y n.º 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                          |
| `check:test-discovery`            | Cada archivo `*.test.ts` / `*.spec.ts` del repositorio es recopilado por al menos un ejecutor de pruebas (control incremental: la lista de archivos huérfanos de `test-discovery-baseline.json` solo puede reducirse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sí                                          |
| `check:test-tla-order`            | Ningún archivo de `node:test` dentro de `tests/unit` registra una prueba, alcanza un `await` de nivel superior y luego registra más pruebas (#18045; control incremental: `test-tla-order-allowlist.json` solo puede reducirse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí                                          |
| `check:agent-skills-sync`         | Los artefactos generados de habilidades de agentes coinciden con su catálogo de origen (sin divergencias)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Los logotipos/recursos de proveedores cuentan con una entrada de procedencia registrada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | Los archivos de configuración JSON se analizan correctamente y cumplen las reglas de lint del repositorio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | Compilación de TypeScript sin errores (solo advertencias informativas)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` estricto — orientado al futuro; muchos puntos de llamada preexistentes aún necesitan anotaciones                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Informativo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitado a `src/app/(dashboard)/**` (#7033) — la lista de permitidos seleccionada de 27 archivos de `typecheck:core` no incluye ningún TSX del panel, y `next build` tampoco realiza nunca su comprobación de tipos (`next.config.mjs` establece `ignoreBuildErrors: true`), por lo que las regresiones de identificadores huérfanos allí (#6625/#6909) eran invisibles para CI. Compara con una línea base congelada del recuento por archivo y por código TS (`config/quality/dashboard-typecheck-baseline.json`, el mismo patrón de control de obsolescencia que `check:known-symbols`) — solo los errores NUEVOS que superen el recuento de la línea base hacen que falle la puerta de control; ajústala a la baja con `--update` cuando se corrija un error preexistente.                                                                                                                                                                                                                                   | Sí                                          |

### Trabajo: `quality-gate`

Se ejecuta después de `test-coverage`. Bloquea la fusión en caso de fallo.

| Script                       | Valida                                                                                                                                                                                                                          | Bloqueante                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `quality:collect`            | Genera `quality-metrics.json` (recuento de advertencias de ESLint y cobertura del informe combinado de fragmentos)                                                                                                              | Sí (antes del ajuste progresivo) |
| `quality:ratchet`            | Ninguna métrica de `quality-baseline.json` ha empeorado (advertencias de ESLint ≤ línea base; cobertura ≥ línea base)                                                                                                           | Sí                               |
| `check:duplication`          | La duplicación de código (jscpd@4) no supera la línea base de `quality-baseline.json`                                                                                                                                           | Sí                               |
| `check:complexity`           | La complejidad ciclomática por archivo no supera el límite (reglas `complexity` + `max-lines-per-function` del núcleo de ESLint)                                                                                                | Sí                               |
| `check:cognitive-complexity` | Ajuste progresivo de complejidad cognitiva (`eslint-plugin-sonarjs`) — ejecución separada de ESLint; CI ejecuta ambas combinadas como el único paso `check:complexity-ratchets`                                                 | Sí                               |
| `check:dead-code`            | El ajuste progresivo de exportaciones/archivos sin usar (knip) no empeora respecto de la línea base                                                                                                                             | Sí                               |
| `check:compression-budget`   | Presupuesto del benchmark de compresión — los mínimos de ahorro de tokens por motor no deben empeorar                                                                                                                           | Sí                               |
| `check:type-coverage`        | El ajuste progresivo del porcentaje tipado (`type-coverage`) no empeora; sustituye en gran medida a `typecheck:noimplicit:core`                                                                                                 | Sí                               |
| `check:codeql-ratchet`       | El recuento de alertas abiertas de CodeQL no empeora (se consulta mediante `gh api`; se omite correctamente sin token) — frecuencia de actualización y activación manual: consulte «Ajuste progresivo de CodeQL» a continuación | Sí                               |

### Trabajo: `quality-extended`

Todo el trabajo es informativo (`continue-on-error: true`). Los ajustes progresivos basados en npm se ejecutan
realmente; los analizadores externos se instalan mediante `gh release download` y se omiten automáticamente (código de salida 0)
cuando un binario sigue sin estar disponible.

| Script                   | Valida                                                                                                                                                                                                                                                                                       | Bloqueante                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `check:circular-deps`    | No hay dependencias circulares (dpdm)                                                                                                                                                                                                                                                        | **Informativo**                                                           |
| `check:bundle-size`      | El tamaño del paquete no supera el límite                                                                                                                                                                                                                                                    | **Informativo**                                                           |
| `check:secrets`          | Análisis de secretos (gitleaks) — se omite si el binario no está disponible                                                                                                                                                                                                                  | **Informativo**                                                           |
| `check:vuln-ratchet`     | Las vulnerabilidades de las dependencias (osv-scanner) no empeoran — se omite si el binario no está disponible                                                                                                                                                                               | **Informativo**                                                           |
| `check:workflows`        | Validación de workflows (actionlint + zizmor); analizadores ausentes/defectuosos, informes no válidos o una línea base de ajuste progresivo ausente provocan un fallo con estado INCOMPLETE. Los hallazgos válidos siguen la política estricta/informativa/de ajuste progresivo seleccionada | Ejecución obligatoria; el ajuste progresivo de zizmor es bloqueante en CI |
| `check:openapi-breaking` | Cambios incompatibles en el contrato público de la API (`openapi.yaml`) respecto de la rama base (oasdiff) — genera `openapiBreaking=N`; se omite si oasdiff no está disponible o no se puede resolver la especificación base                                                                | **Informativo**                                                           |

### Trabajo: `docs-sync-strict`

Se ejecuta en cada PR a `main`. Bloquea la fusión en caso de fallo.

| Script                         | Valida                                                                                                                                                                                                               | Bloqueante                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | Metapuerta que ejecuta secuencialmente las 6 subpuertas siguientes                                                                                                                                                   | Sí                             |
| ↳ `check:docs-sync`            | Coherencia de versiones entre CHANGELOG / OpenAPI / llm.txt                                                                                                                                                          | Sí                             |
| ↳ `check:docs-counts`          | Los recuentos en el texto (número de proveedores, número de migraciones, etc.) están dentro del margen incremental de los recuentos reales                                                                           | Sí                             |
| ↳ `check:env-doc-sync`         | Cada variable de entorno de `.env.example` está documentada en una tabla de la documentación, y viceversa                                                                                                            | Sí                             |
| ↳ `check:deprecated-versions`  | No hay cadenas de versiones obsoletas en la documentación                                                                                                                                                            | Sí                             |
| ↳ `check:doc-links`            | Los enlaces markdown internos de la documentación apuntan a archivos reales (formato `[text]`/`(path)`)                                                                                                              | Sí                             |
| ↳ `check:fabricated-docs`      | Las rutas, variables de entorno, órdenes de CLI, nombres de hooks y rutas de archivos citados en la documentación existen en el código base. Puerta estricta mediante `--strict`; fallo no bloqueante sin la opción. | Sí (mediante `--strict` en CI) |
| `check:cli-i18n`               | Las cadenas de las órdenes de CLI están presentes en todos los archivos de configuración regional de i18n                                                                                                            | Sí                             |
| `check:openapi-coverage`       | La especificación OpenAPI cubre como mínimo un umbral incremental de las rutas reales                                                                                                                                | Sí                             |
| `check:openapi-security-tiers` | Las anotaciones de niveles de seguridad de `openapi.yaml` son coherentes con las clasificaciones de `routeGuard.ts`                                                                                                  | **Informativo**                |
| `check:openapi-routes`         | Cada ruta de `openapi.yaml` corresponde a un archivo `route.ts` real (antialucinaciones)                                                                                                                             | Sí                             |
| `check:docs-symbols`           | Cada referencia a `/api/...` en `docs/**/*.md` corresponde a un archivo `route.ts` real (antialucinaciones)                                                                                                          | Sí                             |
| `i18n translation drift`       | Claves sin traducir en los archivos de configuración regional de i18n; solo se muestra una advertencia                                                                                                               | **Informativo**                |

### Trabajo: `i18n-ui-coverage`

| Script                            | Valida                                                                                                                                                                                                                                           | Bloqueante      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `check-ui-keys-coverage` (inline) | La cobertura de claves de i18n de la interfaz de usuario es ≥ 65 %                                                                                                                                                                               | Sí              |
| `check-ui-value-drift` (inline)   | Un **valor** en inglés reescrito no deja ninguna traducción obsoleta                                                                                                                                                                             | Sí              |
| `check-new-key-coverage` (inline) | Una clave **nueva** en inglés está traducida en todas las configuraciones regionales; se rechaza un marcador `__MISSING__:`                                                                                                                      | Sí              |
| `check-translation-ratio`         | La proporción de traducciones reales por configuración regional (valores idénticos al inglés, marcadores de posición o claves ausentes fuera de la lista de permitidos) no debe superar `config/quality/i18n-translation-baseline.json` + margen | **Informativo** |

Requiere `fetch-depth: 0`, ya que la puerta de desajuste de valores compara `en.json` con la base de fusión.

#### `check-ui-value-drift` — puerta contra traducciones obsoletas

Detecta la única regresión de i18n que las demás puertas no pueden identificar estructuralmente: se reescribe un valor en inglés
y las traducciones derivadas del inglés _anterior_ permanecen sin cambios, de modo que
los usuarios que no usan inglés siguen leyendo un texto que parece fiable, pero que ahora es incorrecto.

Esto llegó a producción de verdad. `oauthModal.googleOAuthWarning` se reescribió cuando se incorporó
el asistente de inicio de sesión de Antigravity (#5203); **39 de 43 configuraciones regionales** conservaron un texto que indicaba a los operadores que debían «copiar la
URL completa y pegarla a continuación», un flujo que no puede completarse con ese proveedor. Pasó
desapercibido hasta #8463 porque:

- `sync-ui-keys` solo rellena las claves que están **ausentes**, nunca las que están **obsoletas**;
- `check-ui-keys-coverage` cuenta la _presencia_ de claves, por lo que una traducción obsoleta se considera cubierta;
- `check-translation-drift` supervisa las réplicas de documentación de `docs/i18n/<locale>/**.md` —
  nunca lee `src/i18n/messages/*.json`. Es bloqueante en el trabajo `docs-sync-strict` desde la
  resincronización de 2026-09: edita un documento principal → `npm run i18n:run -- --files=<doc>` (por secciones, poco costoso).

**Consciente de las diferencias, no respaldado por una línea base.** Compara `en.json` en la base de fusión con el
árbol de trabajo; por cada clave cuyo valor en inglés haya cambiado, cualquier configuración regional que aún conserve una
traducción sin modificar está desactualizada. Esto **congela deliberadamente la deuda preexistente**: una diferencia
no puede revelar de qué versión anterior en inglés procede una traducción antigua, por lo que la comprobación evalúa
únicamente lo que modifica el cambio actual. La alternativa (una línea base de hashes por clave) supondría
un archivo generado de ~600 KB, 3 veces mayor que la línea base existente más grande, que cambiaría en cada PR de i18n.

Hay dos formas de satisfacerla:

1. actualizar las traducciones afectadas, o
2. establecerlas en `__MISSING__:<new english>`; en ese caso, durante la ejecución se proporciona el texto corregido en inglés
   (`src/i18n/request.ts::deepMergeFallback`, #7258) y la clave queda en cola para su traducción.

Si cambió el **significado** de la cadena, es preferible **cambiar el nombre de la clave**: una clave nueva no puede heredar
una traducción desactualizada. Ese es el patrón utilizado en #8463.

```bash
npm run i18n:check-value-drift          # estricto (lo que ejecuta CI)
npm run i18n:check-value-drift:warn     # solo informa
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Finaliza con código 0 y `SKIP reason=base-unresolved` cuando no se puede leer el catálogo base (un clon
superficial sin la referencia base), imitando el comportamiento de `check-openapi-breaking`.

### Trabajo: `i18n`

Matriz completa de validación de i18n (un trabajo por configuración regional). El trabajo completo es consultivo.

| Script                          | Valida                                                 | Bloqueante                                                    |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| `validate_translation.py quick` | Integridad de la traducción por configuración regional | **Consultivo** (`continue-on-error: true` en todo el trabajo) |

### Trabajo: `pr-test-policy`

Se ejecuta únicamente en solicitudes de incorporación de cambios.

| Script                 | Valida                                                                                                                                                                                   | Bloqueante |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | Las PR que modifican código de producción en `src/`, `open-sse/`, `electron/` o `bin/` deben incluir o actualizar pruebas (Regla estricta n.º 8)                                         | Sí         |
| `check:test-masking`   | Los archivos de prueba modificados no reducen el número neto de aserciones ni añaden tautologías `assert.ok(true)`                                                                       | Sí         |
| `check:pr-evidence`    | El cuerpo de la PR menciona evidencias de pruebas/VPS para el cambio (automatiza la Regla estricta n.º 18 buscando patrones en el texto de la PR; es frágil, consulte Tareas pendientes) | Sí         |

### Trabajo: `test-vitest`

Se ejecuta después de `build`. Bloquea la fusión si falla.

| Conjunto         | Valida                                                             | Bloqueante                                                                                                                              |
| ---------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 herramientas), autoCombo, caché; ejecutor vitest | Sí                                                                                                                                      |
| `test:vitest:ui` | Pruebas de componentes de la interfaz de usuario; ejecutor vitest  | **Bloqueante**: los fallos preexistentes se excluyen explícitamente en `vitest.config.ts`; los fallos nuevos hacen que el trabajo falle |

### Flujos de trabajo nocturnos (programados, consultivos)

Se ejecutan según una programación cron (y mediante `workflow_dispatch`), nunca en PR. Todos son consultivos.

| Flujo de trabajo       | Valida                                                                                                                                                                                               | Bloqueante     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Pruebas basadas en propiedades de fast-check con una semilla aleatoria y un número elevado de ejecuciones                                                                                            | **Consultivo** |
| `nightly-resilience`   | Comprobación del crecimiento del heap, inyección caótica de fallos y pruebas de carga/resistencia con k6                                                                                             | **Consultivo** |
| `nightly-llm-security` | Protección contra inyecciones de promptfoo (modo de bloqueo) y sondas de garak (se omiten sin un secreto de proveedor)                                                                               | **Consultivo** |
| `nightly-schemathesis` | Fuzzing del contrato OpenAPI (schemathesis) contra una instancia activa de OmniRoute usando `docs/openapi.yaml`; detecta infracciones de la especificación y errores 500 no controlados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Puntuación de pruebas de mutación de Stryker sobre el carril rápido de pruebas unitarias; los mutantes supervivientes revelan aserciones débiles                                                     | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidad del motor Node en todos los intervalos compatibles de `engines.node`                                                                                                        | **Consultivo** |

Las líneas base de rendimiento (heap, TTFB y tiempo de compilación) se registran, pero no se usan como comprobaciones bloqueantes: consulte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fase de velocidad (2026-08-30 → v4.0 LTS): todos los valores de referencia se flexibilizaron un 20%

Decisión del responsable (2026-08-30): hasta la modularización de v4.0, la velocidad de entrega importa más
que contener la deuda. Todos los umbrales de ajuste **numéricos** se flexibilizaron un 20% en una
única pasada auditable, y la fase se declara en `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Qué cambió                                                                                                                                                                                                                                                 | Dónde                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — recuentos donde un valor menor es mejor ×1.2, porcentajes donde un valor mayor es mejor ÷1.2 (se mantiene el mínimo de cobertura en 60, `eslintErrors` permanece en 0, `eslintWarnings` 0 → 20% del recuento congelado de supresiones) | `quality-baseline.json` (la nota `_relax_velocity_2026_08_30` enumera cada valor anterior → posterior) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, todos los límites de líneas `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                           | `file-size-baseline.json`                                                                              |
| recuentos por archivo / por código TS ×1.2                                                                                                                                                                                                                 | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` pasa a ser informativo mientras `_policy.requireTighten === false`                                                                                                                                                                     | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| se pausa el `bank-ratchet-shrinks` nocturno (registraría la reducción medida y eliminaría el margen adicional)                                                                                                                                             | `.github/workflows/nightly-release-green.yml`                                                          |

Las listas de permitidos (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **no** son presupuestos y no se modificaron. Las puertas de política de aprobación/rechazo (secretos, reglas SQL,
contrato de documentación/entorno, paridad de i18n, pruebas unitarias) no cambian: una prueba fallida sigue siendo una prueba fallida.

**Herramientas**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — la
  flexibilización de ejecución única (`scripts/quality/relax-baselines.mjs`); se niega a ejecutarse dos veces con la
  misma nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mide cada puerta numérica del mismo modo que CI y muestra el margen restante por puerta
  (`scripts/quality/baseline-headroom.mjs`). El trabajo nocturno `baseline-headroom` publica
  la tabla en el resumen de ejecución del flujo de trabajo y carga su informe JSON/Markdown como
  `baseline-headroom-<run_id>`, conservado durante 90 días. Las filas de advertencia y críticas identifican las puertas
  que están a menos de un 10% de su límite o que ya lo han superado. Revise estos informes como alerta temprana
  del consumo de los presupuestos; inspeccione las notas `_rebaseline_*` de la puerta infractora. El trabajo ya no
  crea ni actualiza una incidencia permanente; #12149 conserva el historial de informes anterior.

**Modo de código nuevo (Clean-as-You-Code): desde 2026-08-30, solo vía rápida de PR**

En eventos `pull_request`, `quality.yml` pasa `--base-ref <PR base SHA>` a `check:file-size`,
`check:complexity-ratchets` y `check:dead-code`. Para `check:complexity-ratchets` y
`check:dead-code`, la puerta compara HEAD con la base de fusión **restringiéndose a los archivos modificados por el PR**
(`scripts/check/newCodeMode.mjs`: la base de fusión se materializa en un
`git worktree` desechable, ESLint/knip se ejecutan allí y en HEAD, y se calculan las diferencias de los recuentos por archivo):

- **bloqueante** — el PR añadió infracciones de complejidad ciclomática/cognitiva o exportaciones sin uso en los archivos que modificó
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` en el registro);
- **informativo** — el total global frente al valor de referencia congelado. La desviación heredada nunca hace fallar
  un PR que no la provocó; la desviación vuelve a congelarse durante la conciliación de la versión y el trabajo de margen la supervisa.

`check:file-size` usa la referencia base según sus propios criterios (`scripts/check/check-file-size.mjs`, #8522):
comprueba todos los archivos fuente y de prueba del árbol, lee el recuento de líneas de cada uno en la base del PR
con `git show` y hace fallar un archivo solo cuando crece por encima del mayor valor entre su límite de referencia
(`frozen` / `testFrozen`, o `cap` / `testCap` para un archivo fuera del valor de referencia) y su tamaño base.
Por tanto, un archivo que ya se había desviado en la base nunca hace fallar un PR que no provocó esa desviación.

`check:boundary:ratchet` aplica la misma regla a su único número
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): en los eventos de PR, tanto
las comprobaciones rápidas de `quality.yml` como el trabajo de lint de `ci.yml` pasan el SHA base del PR, el commit
base se mide desde una exportación de `git archive`, y el PR falla solo cuando el recuento de aristas
`open-sse → src` supera el mayor valor entre `metrics.boundaryOpenSseToSrc` y el recuento de la base. La desviación
de la base por encima del límite se notifica (`base drift herdado`), pero nunca hace fallar un PR inocente; push → main
mantiene el límite absoluto, y un SHA base que no se pueda resolver recurre a él con una advertencia.

Las ejecuciones de `workflow_dispatch`, el barrido de release-green y el trabajo nocturno de margen no tienen una base
de PR y mantienen la comparación absoluta (global). La cobertura, la duplicación y la cobertura de tipos siguen siendo
globales por ahora (sus herramientas no generan de forma eficiente un diff por archivo): son candidatas a recibir el mismo tratamiento.

**Cierre de la fase en v4.0 (LTS = más estricto que antes, no «volver a la normalidad»)**

1. En la punta pura de `release/v4.0.0`: `npm run quality:headroom --json` para dejar constancia y, después,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` y el
   `--update` de cada comprobación de typecheck; cada línea base se reduce al valor medido.
2. Eliminar `_policy` de `quality-baseline.json` (reactiva `--require-tighten` y la
   acumulación nocturna) y restaurar `THRESHOLD = 36` (o un valor superior) en `check-openapi-coverage.mjs`.
3. Endurecer los límites más allá de lo medido allí donde la modularización haya dado resultados: devolver el `cap`
   de tamaño de archivo a 1000 (u 800), aumentar en 5 los mínimos de cobertura y fijar en 0 las exportaciones sin usar
   para los paquetes modularizados.

## Línea base del ratchet (`quality-baseline.json`)

El motor del ratchet (`scripts/quality/check-quality-ratchet.mjs`) lee `quality-baseline.json`
y lo compara con el archivo `quality-metrics.json` recién generado. Cualquier métrica que empeore
más allá de su épsilon hace que la compilación falle.

Métricas supervisadas actualmente:

| Métrica               | Dirección | Significado                                          |
| --------------------- | --------- | ---------------------------------------------------- |
| `eslintWarnings`      | `down`    | El número de advertencias de ESLint no debe aumentar |
| `coverage.statements` | `up`      | La cobertura de sentencias no debe disminuir         |
| `coverage.lines`      | `up`      | La cobertura de líneas no debe disminuir             |
| `coverage.functions`  | `up`      | La cobertura de funciones no debe disminuir          |
| `coverage.branches`   | `up`      | La cobertura de ramas no debe disminuir              |

Para actualizar la línea base después de una mejora real:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

La opción `--update` escribe los valores medidos actuales en `quality-baseline.json`.
Confirma este archivo junto con el cambio que mejoró la métrica. Un PR que mejore una
métrica sin actualizar la línea base será detectado por `--require-tighten` (Fase 6A.5,
implementación pendiente).

### Ratchet de CodeQL: frecuencia de actualización y activación manual

`check:codeql-ratchet` lee **el estado del repositorio, actualizado según una programación, no en cada PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` informa
`state: configured`, `schedule: weekly`: es el análisis de configuración predeterminada de GitHub, no un
análisis por cada push. Consecuencia: después de que se fusiona un PR que CORRIGE alertas, el ratchet sigue leyendo
el recuento anterior, más alto, hasta que se ejecuta el siguiente análisis programado, por lo que informa de una regresión
en cada PR abierto, incluidos los PR de seguimiento del propio PR correctivo, hasta que el análisis se actualiza.

**Actualización manual**: `gh workflow run codeql.yml --ref release/vX.Y.Z` vuelve a ejecutar el
análisis y republica las alertas en cuestión de minutos. Lee `.github/workflows/codeql.yml`
primero: su encabezado explica que solo usa `workflow_dispatch` **porque entra en conflicto con
la "configuración predeterminada" de GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Restaurar los activadores `push`/`pull_request`/
`schedule` requiere primero una **acción del propietario**: Settings → Code security →
CodeQL: Default → Advanced. No añadas un activador `schedule:` sin realizar ese cambio, ya que
solo producirá ejecuciones fallidas.

**Ajusta la línea base después de que disminuya el recuento**: `node scripts/check/check-codeql-ratchet.mjs
--update` escribe el nuevo recuento medido en `quality-baseline.json` →
`metrics.codeqlAlerts.value`, para que el ratchet no permita silenciosamente una regresión hasta
el límite anterior. Ejemplo práctico (2026-09-02/03): el PR #12502 corrigió 7 alertas reales
(13 → 6 abiertas según la medición); el PR #12530 ajustó la línea base congelada de 11 → 6 para que coincidiera; las
6 restantes se descartaron después con una justificación individual para cada alerta, hasta llegar a 0 abiertas.

**Los descartes son decisión del operador (Regla estricta #14)**: nunca descartes una alerta de CodeQL
sin registrar la justificación técnica en el comentario de descarte: `won't fix` para
un requisito de un protocolo externo, `used in tests` para un fixture de prueba, `false positive`
para un sanitizador que CodeQL no puede detectar (precedente: `docs/security/ERROR_SANITIZATION.md`).

---

## Política de reintentos de pruebas (WS5.4, v3.8.49)

Los reintentos se configuran por runner, nunca como una política global indiscriminada, ya que un reintento indiscriminado convierte regresiones reales
en fallos intermitentes invisibles:

| Runner           | Política                                                                                                                                           | Motivo                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` solo en CI, con `trace: on-first-retry`                                                                                               | Los tiempos del navegador y de la red son realmente no deterministas; un reintento con una traza convierte un fallo intermitente en un artefacto diagnosticable |
| Vitest           | SIN reintentos globales. Una prueba con intermitencia demostrada recibe un reintento explícito por prueba (visible en el diff y revisado en el PR) | Mantiene la lista de cuarentena en el repositorio, nunca opaca                                                                                                  |
| node:test (unit) | SIN reintentos, nunca                                                                                                                              | Una prueba unitaria intermitente es un error en la prueba: hay que corregirla, no volver a ejecutarla al azar                                                   |

SLO objetivo una vez que esté disponible la telemetría de intermitencias (WS5.2/5.3): tasa de intermitencia <1% por prueba
(umbral de «corregir ahora»), tasa de éxito ≥95% por pipeline. Valores de referencia del sector:
deben recalibrarse con nuestras propias mediciones.

## Deriva del ratchet en el nivel de release (WS5.5, v3.8.49)

Cuando un ratchet (tamaño de archivo, complejidad, advertencias de eslint) sufre una regresión en la punta PURA de la release,
es decir, la COMBINACIÓN de merges provoca la regresión y ningún PR individual la reproduce en su
propia rama, la corrección corresponde al **capitán de la release, una sola vez, en la
rama de release**: debe preferirse la extracción o refactorización; solo se debe reajustar la línea base con la entrada de
justificación documentada. Nunca se debe trasladar la deriva combinada al PR de un colaborador ni
reajustar la línea base por PR (eso oculta regresiones reales). Primero hay que distinguir el origen: se debe reproducir el
estado rojo contra la punta pura en un worktree de prueba antes de asumir que el PR lo causó.

## Consolidación de reducciones del ratchet: la dirección descendente (#8584)

El ratchet solo está automatizado a medias, y precisamente en la mitad equivocada. **Elevar** un límite es una
edición manual de JSON que tarda diez segundos y constituye la forma más rápida de desbloquear un PR en rojo.
**Reducirlo** exige que alguien ejecute `--update` y confirme el resultado; y hasta que
se incorporó el job `bank-ratchet-shrinks`, ningún workflow lo ejecutaba. La consecuencia medida
(2026-07-25): 18 archivos congelados ya estaban en el límite de 800 líneas para archivos nuevos o por debajo de él; el peor
estaba en 132× (`src/shared/validation/schemas.ts`, 19 líneas con un límite de 2,523); el
techo de complejidad pasó de `1794 → 2169` a lo largo de ~37 notas de reajuste de línea base, con exactamente una
reducción (−1); y «ajustar mediante `--update` en el próximo ciclo» se escribió 31 veces y se cumplió
una sola vez. Un límite que sobrevive al código que lo justificó convierte silenciosamente cada
descomposición completada en un margen de crecimiento para quien edite el archivo a continuación.

`nightly-release-green.yml` → el job **`bank-ratchet-shrinks`** cierra ese ciclo:

|               |                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Se ejecuta en | `schedule` (3×/día) + `workflow_dispatch`; deliberadamente **no** en `push`                                      |
| Mide          | la `release/vX.Y.Z` más alta, con la misma resolución y protección contra inyección que `release-green`          |
| Escribe       | `check:file-size --update` y `check:complexity-ratchets --update` (ambos solo reducen por diseño)                |
| Verifica      | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Entrega       | un único PR siempre actualizado contra la rama de release: se actualiza de forma forzada, sin generar nunca spam |

La consolidación se realiza por lotes en vez de por cada push porque no tiene requisitos de latencia (una reducción
consolidada en un plazo de 8 h es suficiente), mientras que una ejecución por merge reconstruiría repetidamente la rama del PR
durante las campañas de merge y pagaría el coste de un recorrido completo de ESLint cada vez. La detección permanece en
push (`release-green`); solo la consolidación se procesa por lotes.

### El verificador de seguridad

El job escribe en las líneas base sin supervisión, por lo que `verify-ratchet-bank.mjs` es lo que hace
que esto sea aceptable. Compara mediante diff el árbol posterior a `--update` con `HEAD` y **cancela el job
antes de que exista ningún commit**, sin abrir ningún PR, salvo que cada cambio sea uno de los siguientes:

- una entrada numérica `frozen` / `testFrozen` **reducida** o **eliminada**
- `complexity-baseline.json` → `count` **reducido**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **reducido**

Cualquier otra cosa falla: elevar un número, añadir una entrada, cambiar `cap`/`testCap` o
eliminar/reescribir una nota `_rebaseline_*` (esas notas constituyen el registro de auditoría que explica por qué existe cada
techo y se almacenan dentro del mismo objeto `frozen` que las entradas de archivo).
Un bot capaz de elevar un límite sería estrictamente peor que la situación actual. Protección contra regresiones:
`tests/unit/verify-ratchet-bank.test.ts`.

El job nunca hace push a `release/*`: un humano fusiona el PR, por lo que una medición errónea
no puede incorporarse sin revisión.

## Política de lista de permitidos

Cada control que no puede fallar por infracciones preexistentes utiliza una lista de permitidos congelada
(p. ej., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La política es:

**Corrija la causa raíz; use la lista de permitidos solo cuando la infracción sea preexistente y
no pueda corregirse en el mismo PR.**

Al añadir una entrada a una lista de permitidos:

1. Incluya un comentario con la justificación.
2. Haga referencia a la incidencia de seguimiento (p. ej., `// #3498 — Funcionalidad de la fase 2, aún no implementada`).
3. Elimine la entrada en el mismo PR que corrige la infracción; una entrada obsoleta que ya no
   suprima una infracción activa constituye en sí misma un defecto (la comprobación de entradas obsoletas de 6A.3
   hará que el control falle por una entrada huérfana en la lista de permitidos una vez implementada).

**No** añada entradas a la lista de permitidos para hacer que las pruebas pasen más rápido. Un control en verde con una
lista de permitidos creciente genera una falsa sensación de calidad.

### Cuando un control falla en su PR

1. **Lea detenidamente la salida del control**: le indica exactamente qué archivo o símbolo infringió
   la regla.
2. **Corrija la infracción**: la mayoría de los controles son comprobaciones deterministas del sistema de archivos que pasan en cuanto
   el código es correcto.
3. **Si la infracción es preexistente** (es decir, usted no la introdujo, pero el control ahora
   la abarca): añada una entrada a la lista de permitidos con un comentario justificativo y una incidencia de seguimiento.
4. **Si el control es incremental** (cobertura, advertencias de ESLint, duplicación, complejidad):
   su cambio empeoró la métrica. Corrija el problema subyacente o, en casos excepcionales, ejecute
   `npm run quality:ratchet -- --update` si el cambio es intencionado y la degradación de la métrica
   es aceptable, pero documente el motivo en la descripción del PR.
5. **Los controles informativos** (`continue-on-error: true`) son meramente informativos: no bloquean
   la fusión, pero aparecen en el resumen de CI. Corríjalos de todos modos.

---

## Añadir un nuevo control

1. Cree `scripts/check/check-<name>.mjs` (o `.ts`). Los controles de políticas terminan con el código 0/1.
   Los controles de tipo incremental emiten una métrica a `quality-metrics.json` mediante `collect-metrics.mjs`.
2. Añada `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json`.
3. Intégrelo en `.github/workflows/ci.yml` dentro del trabajo correspondiente
   (política → `lint` o `docs-sync-strict`; incremental → `quality-gate`).
4. Si tiene una lista de permitidos, aplique `reportStaleEntries()` desde
   `scripts/check/lib/allowlist.mjs` para que las entradas obsoletas se detecten automáticamente.
5. Escriba una prueba en `tests/unit/build/` que cubra la lógica de detección del control.
6. Actualice este documento (añada una fila a la tabla del trabajo correspondiente).

---

## Herramientas para agentes: LSP integrado en el proceso (opcional)

Además de los controles de CI, OmniRoute incluye una estructura base **opcional** de `agent-lsp`
(un archivo `.mcp.json` a nivel de proyecto, Fase 7 Tarea 15). Cree `.mcp.json`
para exponer un servidor de lenguaje TypeScript a los agentes de programación, de modo que resuelvan símbolos /
diagnósticos **antes** de escribir código: un complemento de compilación antes de afirmar que funciona para
`typecheck:core`, que reduce de raíz los errores de «símbolos inventados». Intencionadamente,
no se carga de forma automática (usted elige y verifica el puente MCP↔LSP); una entrada defectuosa solo registra un
error de conexión y nunca interrumpe las sesiones.

---

## Backlog de racionalización (revisión de ROI — Fase 9 Onda 3)

Este inventario se concilió con `ci.yml` el 2026-06-17 (la versión anterior omitía
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Una revisión de ROI del conjunto conciliado
identificó los siguientes candidatos de racionalización. **Las fusiones son cambios
mecánicos de CI; las activaciones/eliminaciones son decisiones de política reservadas al
operador.** Aún no se ha aplicado nada de lo indicado a continuación.

**También sin documentar anteriormente** (consultivo, señal baja): el job `docs-lint`
(markdownlint + Vale, todo el job con `continue-on-error`) y los workflows independientes
de análisis `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` está en
`quality-baseline.json`, pero no está conectado a un ratchet bloqueante en `ci.yml`: la
métrica está actualmente huérfana.

### Fusión / deduplicación (mecánica, menor riesgo)

Cada candidato se validó con el estado real de los gates el 2026-06-17
(confiar, pero verificar); varias fusiones «obvias» resultaron ocultar deuda y **no** son
sustituciones directas sin riesgos.

- **`check:docs-sync` se ejecuta dos veces** — de forma independiente en el job `lint` y nuevamente dentro de `check:docs-all` (`docs-sync-strict`) y del hook de pre-commit de husky. ✅ **HECHO** — se eliminó la invocación independiente de `lint`.
- **Análisis de CVE** — ❌ **NO es una fusión limpia.** `audit:deps` falla de forma bloqueante ante cualquier CVE de gravedad alta/crítica; `check:vuln-ratchet` (osv) solo falla ante una _regresión_ respecto a la línea base (actualmente 1 MODERATE). Semánticas diferentes: eliminar `audit:deps` supondría perder el gate absoluto para vulnerabilidades altas/críticas. Mantener ambos.
- **Detección de ciclos** — ✅ **HECHO** (#15159 G-01/G-02). El texto anterior llamaba a `check:cycles` el gate «verde y curado» y justificaba mantenerlo como bloqueante porque `check:circular-deps` (dpdm) notificaba 91 ciclos. Ese verde era un **falso verde**: `check:cycles` analizaba 5 subdirectorios (450 archivos), solo coincidía con `import|export … from` estáticos y descartaba todos los especificadores `@/` y `@omniroute/open-sse/`, por lo que no podía detectar los ciclos de importaciones dinámicas + alias que predominaban en el repositorio. Corregido: ahora el gate recorre `src` + `open-sse` (5023 archivos), recopila especificadores desde el AST de TypeScript (por lo que `import("…")` cuenta y `typeof import("…")` en posición de tipo no) y resuelve `paths` de tsconfig. Encuentra **14** ciclos, no 0. Como no es posible corregir 14 ciclos preexistentes en un PR del gate, `check:cycles` es ahora un **ratchet** (`--ratchet`, límite máximo `metrics.cycles.value = 14` en `quality-baseline.json`, `direction: down`): bloquea cualquier _regresión_ y el recuento solo puede disminuir. CI ejecuta `npm run check:cycles:ratchet`. La reducción progresiva se gestiona con **A-01**. `check:circular-deps` (dpdm) se mantiene como una segunda opinión consultiva más amplia.
- **Complejidad** — ✅ **HECHO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): un único recorrido de ESLint, con recuentos por ruleId para que las líneas base de complejidad ciclomática+max-lines y cognitiva se mantengan independientes; `check:complexity` / `check:cognitive-complexity` individuales se conservan para el uso local de `--update`.
- **Antialucinación de `/api`** — ✅ **HECHO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un único inventario del sistema de archivos de `src/app/api`; openapi-routes + docs-symbols siguen generando informes independientes; los comandos individuales se conservan para ejecuciones locales.
- **`check:node-runtime` se ejecuta en 11 jobs** — ⚠️ **ROI bajo.** Cada uno usa un runner independiente y la comprobación tarda <1 s; el ahorro total sería de ~10 s, a costa de perder una protección económica por job. No merece la inestabilidad del cambio.
- **`typecheck:noimplicit:core` en el lint de CI** — ✅ **eliminado del job lint** (era consultivo con `continue-on-error`); la superficie de tipos bloqueante es `typecheck:core` + `check:type-coverage`. Se conserva el script local.

### Activar / decidir (política del operador)

- `check:openapi-security-tiers` (consultivo) — ❌ **NO se puede convertir limpiamente en bloqueante.** Finaliza con 0, pero advierte que varias rutas de `traffic-inspector` bajo `LOCAL_ONLY_API_PREFIXES` carecen de la anotación `x-loopback-only: true`. Para aplicarlo de forma obligatoria, primero es necesario añadir esas anotaciones a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — queda ampliamente cubierto por el ratchet bloqueante `check:type-coverage`. Convertirlo en ratchet o eliminar la segunda pasada redundante de `tsc`.
- `test:vitest:ui` (ahora **bloqueante**) — los fallos preexistentes están excluidos explícitamente en `vitest.config.ts` con comentarios de seguimiento `// #8618`; los fallos nuevos hacen que el job falle.
- `check:secrets` (gitleaks, ratchet bloqueante fijado en 3 falsos positivos documentados) — incluir los 3 en la lista de permitidos para llegar a 0, o degradarlo a consultivo. Se solapa con el análisis nativo de secretos de GitHub + `check:public-creds`.
- `check:pr-evidence` (bloqueante, busca patrones en la prosa del cuerpo del PR) — alto riesgo de falsos positivos; eliminarlo debilitaría la aplicación de la Hard Rule #18, por lo que se trata de una auténtica decisión de política.
- `semgrep` (independiente y consultivo) — se solapa con CodeQL para las familias OWASP; conectar su línea base a un ratchet o eliminarlo.

---

## Documentación relacionada

- Cadena de suministro (procedencia, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — control de paridad del conjunto de claves

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, trabajo `i18n-ui-coverage`).
Compara el conjunto de claves hoja de cada `src/i18n/messages/<locale>.json` con `en.json` y falla
ante cualquier clave hoja ausente o adicional, independientemente de cuándo se añadió. Los marcadores
`__MISSING__:` cuentan como presentes (su contenido es responsabilidad del control de proporción). Es el
complemento absoluto de los dos controles basados en diferencias/porcentajes: `check-ui-keys-coverage`
impone un mínimo del 80 % por configuración regional (43 claves ausentes de unas ~13,000 siguen dando
un 99.7 %) y `check-new-key-coverage` evalúa únicamente las claves que un PR añade a `en.json`. Un lote
de configuraciones regionales se genera a partir del `en.json` del día en que se crea su rama y se
traduce durante días mientras la base sigue añadiendo claves; el PR del lote no añade ninguna clave por
sí mismo, por lo que ambos controles relacionados permanecieron en silencio cuando el lote 1 (#13044)
se incorporó con 43 claves menos en nueve configuraciones regionales y el lote 2 (#13660), con 10 claves
menos en ocho (2026-09-15). Corrija un fallo con
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; una clave hoja `extra`
significa que el origen la eliminó: elimínela de la configuración regional. `--warn` informa sin
provocar un fallo. `--catalog=cli` ejecuta la misma comparación sobre `bin/cli/locales`
(`npm run i18n:check-keys:cli`); ambos pasos se encuentran en el trabajo `i18n-ui-coverage`.

#### `check-new-key-coverage` — control de i18n para claves nuevas

Control relacionado con `check-ui-value-drift`. Este último detecta un valor en inglés que fue
**reescrito** mientras sus traducciones quedaron desactualizadas; este detecta una clave en inglés que
fue **añadida** sin que algunas configuraciones regionales llegaran a recibirla.

`check-ui-keys-coverage` no puede detectar esta clase de problema: impone un porcentaje mínimo por
configuración regional, y once claves ausentes de unas ~13,000 mantienen la cobertura en el 99.9 %. Un
porcentaje por idioma no puede expresar «esta funcionalidad se publicó sin traducir»: una funcionalidad
completa puede incorporarse a una nueva configuración regional sin texto alguno y no alterar nunca la
cifra.

El incidente que codifica: la fase 3 del Lienzo de orquestación tradujo sus once claves en las 42
configuraciones regionales que existían en ese momento. Horas después, el lote de idiomas de la UE
(#13044) elevó el repositorio a 51 configuraciones regionales, y las nueve nuevas (`el`, `et`, `ga`,
`hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nunca las recibieron. `deepMergeFallback` sustituye una clave
ausente por el inglés, por lo que el modo de fallo fue una interfaz de usuario sin traducir en lugar de
una interfaz en blanco: real y silencioso por diseño.

Al igual que su control relacionado, **tiene en cuenta las diferencias** y compara el inglés en la base
de fusión con el árbol de trabajo, por lo que las carencias preexistentes permanecen congeladas y el
control no necesitó ninguna migración para activarse.

**Un marcador `__MISSING__:<english>` no lo satisface (desde 2026-09-17).** Antes era el aplazamiento
documentado —el entorno de ejecución recurre al inglés correcto—, hasta que ocho PR de funcionalidades
del 2026-09-16 añadieron 61 claves e insertaron el marcador en las 65 configuraciones regionales en vez
de traducirlas: este control aceptó todos los casos, nada bloqueó los PR y el control bloqueante de
proporción de traducciones reales falló después en la punta de la versión para todo el mundo (pt-BR
3.2 % > 2.5 % + 0.5). Ahora un marcador se considera una traducción ausente. Corrija un fallo con
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, o procese
todas las configuraciones regionales en paralelo con `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, seguro en modo desacoplado, se niega a iniciarse sin las
variables de entorno `OMNIROUTE_TRANSLATION_*`). Una clave que deba permanecer en inglés (el nombre
fijado de un producto, motor o indicador) debe incluirse en `scripts/i18n/untranslatable-keys.json`,
nunca ocultarse tras un marcador. `vi` prohíbe por completo los marcadores
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — control de pruebas aparcadas

Un archivo incluido en la lista `exclude` de `vitest.config.ts` es una prueba que no se ejecuta, y para
quien examina el árbol parece cobertura. Sesenta y dos archivos se acumularon tras el comentario
`// #8618 — fallo preexistente; elimine esta exclusión cuando se corrija`. La incidencia #8618 se cerró
el 2026-08-11 mientras la lista que supervisaba aumentó de 45 entradas a 62, y cada nueva entrada
heredaba un comentario que apuntaba a una incidencia cerrada. Cuando finalmente se midió la lista
archivo por archivo (#13204), **51 de los 62 pasaron con el árbol actual sin ningún cambio en el código
fuente**.

El control exige que toda exclusión que se resuelva en un archivo real (a) indique una incidencia de
seguimiento y (b) aparezca en `config/quality/vitest-exclusions.json` con su estado medido, de modo que
añadir una sea una diferencia revisable en un archivo específico, en vez de otra línea más en un array
de 60 entradas. Deliberadamente, no vuelve a ejecutar las pruebas excluidas: eso cuesta unos 10 minutos
y corresponde a un trabajo periódico; el inventario registra cuándo se midió cada una por última vez.
