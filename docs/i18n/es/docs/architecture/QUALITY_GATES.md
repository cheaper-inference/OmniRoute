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

Los workflows CI y Quality emiten cada uno un veredicto estable: `Gate / CI` y
`Gate / Quality`. Su política de admisión versionada enumera cada job anterior
como obligatorio o consultivo. Un job obligatorio aplicable debe completarse correctamente:
los resultados ausentes, cancelados, omitidos, pendientes o desconocidos no pueden establecer PASS.
Una clasificación válida de solo documentación o solo catálogo puede hacer que un carril de código
no sea aplicable; un PR en borrador no es un candidato aceptado. Una etiqueta `hotfix` no exime de aportar evidencias.

Ambos workflows cubren los PR hacia las ramas main/release, los pushes a `main`, la ejecución manual
y los eventos de grupos de merge. Los pushes, las ejecuciones manuales y los grupos de merge ejecutan
la selección completa. Los pushes a `release/**` no los inician (2026-10-18): cada cambio ya ejecutó
la matriz en su PR y la combinación fusionada es responsabilidad de Release-Green
(`docs/ops/RUNNER_BOX.md` → Carril alojado). Los forks y grupos de merge utilizan runners alojados
para los jobs que, de otro modo, seleccionarían runners autohospedados; antes del despliegue debe
verificarse que haya suficiente capacidad alojada.

Cada recibo JSON identifica el SHA extraído, la ejecución del workflow y el intento.
La CLI rechaza una discrepancia entre el SHA del checkout y el del evento. Las pruebas del workflow
vinculan la pertenencia a la política con la lista `needs` del job de veredicto, de modo que un carril
nuevo o eliminado no pueda desaparecer silenciosamente. Los comprobantes cubren su propio flujo de trabajo, no la publicación, el despliegue ni los componentes internos
de un escáner consultivo existente. Hacer obligatorias las comprobaciones aplicables en las reglas de rama
es un cambio administrativo independiente; definir sus jobs no protege por sí mismo una rama.

`API Route Typecheck` es una comprobación de flujo de trabajo independiente, ajena tanto a los veredictos agregados
como al perfil estático del observador local completo. Inspeccione su resultado por separado para el candidato exacto.
`.github/workflows/api-route-typecheck.yml` se ejecuta en PR dirigidas a `main` o
`release/**`, en pushes a cualquiera de las dos familias de ramas y mediante activación manual. No tiene ningún filtro de rutas.
Los cambios de rama base de una PR solicitan una nueva comprobación; las ediciones del cuerpo o del título usan el nombre
exclusivo de observación `Admission not requested / API Route Typecheck` y no pueden sustituir la comprobación de admisión.
El flujo de trabajo no declara un activador de grupo de fusión. Cualquier implementación de una cola de fusión que requiera
esta comprobación debe establecer primero su ejecución para ese evento.

### Capacidad de ejecución de la interfaz de usuario

CI ejecuta el inventario completo de la interfaz de usuario en cuatro shards de matriz `test-vitest`,
cada uno con un máximo de dos workers y el límite actual de 15 minutos por job. El primer shard
también ejecuta la suite Vitest de MCP/autoCombo. El resultado del job obligatorio cubre cada elemento
de la matriz; el fallo o la cancelación de un shard impide establecer la admisión del candidato.

El observador nocturno conserva un recibo separado del candidato exacto para cada shard de la interfaz
de usuario, incluida la ejecución de MCP en el primer recibo. Se requieren los cuatro recibos, los logs
y las identidades de ejecución coincidentes. La ejecución local de `npm run test:vitest:ui` sigue
seleccionando la suite completa; una ejecución con `--shard` solo constituye evidencia parcial.

### Recopilación de cobertura unitaria

Los doce shards unitarios recopilan cobertura V8 durante la ejecución de sus pruebas existentes. Un shard
completado correctamente ejecuta `scripts/ci/compact-v8-coverage.mjs` para comprimir los archivos originales
sin generar un informe Istanbul intermedio. El job final Coverage verifica los doce manifiestos con respecto
al SHA del candidato, el runtime, la raíz del código fuente y los hashes de datos; después, ejecuta los
reporters de c8 y los umbrales de cobertura existentes. Las entradas conservan el orden global de nombres
de archivo de c8; la fusión previa por shard no es segura para una cobertura mixta de funciones/bloques.
Los shards ausentes, malformados o incompatibles hacen que la admisión falle. Los shards de pruebas fallidos
conservan por separado la cobertura de diagnóstico sin procesar; esta no puede incorporarse a la fusión final.

### Recibos de progreso de la ejecución de pruebas unitarias

El comando compartido `test:unit:ci:shard` registra las fases `primary`, `dashboard` y `serial`
mediante `scripts/ci/unit-progress-reporter.mjs`. El informe de pruebas normal sigue estando
disponible. Un recibo independiente que contiene únicamente metadatos registra el inicio y la finalización de cada archivo,
y un latido cada 30 segundos enumera los archivos que siguen activos y su tiempo transcurrido. Solo registra
metadatos de ejecución incluidos en la lista de permitidos; las descripciones de las pruebas, la salida, los cuerpos de los errores y el entorno
completo no se serializan.

CI y Quality conservan los archivos JSONL como `unit-progress-ci-<run>-<attempt>-<shard>` y
`unit-progress-quality-<run>-<attempt>-<shard>`. El tiempo de espera de un trabajo puede impedir la carga posterior;
los latidos ya emitidos siguen constituyendo evidencia de diagnóstico. La ausencia de latidos también puede indicar
que un proceso del ejecutor está bloqueado o ha finalizado. Estos recibos mantienen la selección de pruebas,
la concurrencia, los plazos y el estado de salida existentes; no son veredictos de admisión de candidatos.

### Evidencias conservadas en el reductor de aceptación

`scripts/quality/validate-release-acceptance.mjs` consolida un plan proporcionado y sus manifiestos; no establece que el plan cubra todo el proceso de publicación. Sus informes fijan explícitamente `releaseAcceptance: false`, incluso cuando el plan es `VERIFIED`. El workflow `release-acceptance.yml` sigue utilizando fixtures de simulación, no comprobantes reales de compilación, empaquetado, arranque o promoción.

La CLI requiere `--evidence-root` para verificar las evidencias conservadas. Los archivos se resuelven como `<evidence-root>/<artifact_id>/<member>` y se calcula su hash SHA-256. Un registro PASS sin evidencias, un archivo ausente o modificado, una ruta insegura o un enlace simbólico impide la verificación. Los archivos ausentes no equivalen a logs vacíos de ejecuciones satisfactorias. Las comprobaciones existentes de SHA/run/attempt siguen siendo independientes: que los bytes coincidan no valida un comprobante obsoleto. La integridad de un archivo no demuestra la autenticidad de la ejecución ni la promoción del artefacto.

### Inventario de análisis estático

El inventario versionado de alias de npm y la pertenencia al análisis estático se encuentran en
`config/quality/gate-manifest.json`. Ejecute `npm run check:gate-manifest` para validar
los nombres de scripts y los comandos exactos con respecto a `package.json`; las adiciones, eliminaciones
y desviaciones de comandos hacen fallar tanto el hook local como los jobs de clasificación de cambios en CI.
Un alias no es un job de workflow, una instancia de matriz ni un caso de prueba: estos recuentos no deben
presentarse como intercambiables.

Utilice `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list`
para inspeccionar los alias seleccionados sin ejecutarlos. El runner invoca el entrypoint de npm, por lo que
se conserva su runtime, incluido Bun donde esté configurado. El manifiesto registra los alias que están fuera
de esos perfiles como invocados por separado, y los comandos de mantenimiento están prohibidos en los perfiles
de análisis de solo lectura.

Estos perfiles solo cubren el análisis estático. No certifican las pruebas del producto,
la cobertura, el empaquetado, las comprobaciones externas ni la aceptación completa de una versión candidata.
La admisión del workflow utiliza `config/quality/admission-policy.json` y
`scripts/quality/admission-verdict.mjs` vinculados. Los perfiles del observador de versiones permanecen
separados; inspeccione de forma independiente sus comprobaciones y recibos aplicables. Los comandos estáticos
del observador completo se declaran en `config/quality/release-green-static-profile.json`, incluidos
`audit:deps`, la selección de pruebas de mutación y las comprobaciones de traducción. El cargador valida los
comandos de npm con respecto a package.json y las declaraciones modeladas de CI/Quality; rechaza las
desviaciones en lugar de ejecutar tokens de shell como argumentos. La salida SKIP/INCOMPLETE de un escáner
obligatorio no puede establecer PASS. El perfil registra sus exclusiones externas y no sustituye las evidencias
de cobertura alojada, matrices de pruebas, paquetes o despliegues. El inventario descriptivo que figura a
continuación sirve como referencia, no como prueba de que un gate se haya ejecutado realmente.

Los scripts se encuentran en `scripts/check/` (gates de políticas) y `scripts/quality/` (motor de ratchet).
La fuente de verdad de CI es `.github/workflows/ci.yml`.

### Estado de la documentación base publicada

`.github/workflows/i18n-base-health.yml` supervisa el estado de la documentación después de determinados
pushes a `main` y `release/v*`, y mediante ejecución manual. Sus filtros abarcan la documentación,
los archivos Markdown de la raíz, `llm.txt`, el estado y la configuración de las traducciones, y las herramientas de i18n pertinentes.
El único trabajo `Published base documentation health` utiliza Ubuntu alojado y un plazo de cinco minutos.
Realiza una validación de solo lectura y genera un comprobante de diagnóstico sin
instalar dependencias, traducir ni adoptar el estado.

`scripts/i18n/check-base-health.mjs` exige que no haya inconsistencias de hash de origen, destinos ausentes, hash de destino,
traducciones obsoletas ni caché de secciones. También valida el ámbito actual de
documentos/configuraciones regionales principales y su procedencia registrada. Un contexto no válido, una cobertura incompleta
o una interrupción del verificador produce `INCOMPLETE`; una desviación confirmada produce `FAIL`. Ambos
devuelven un estado de salida fallido. El comprobante queda vinculado al SHA del checkout, al flujo de trabajo, a la ejecución y
al intento, y se conserva como `i18n-base-health-<sha>-<run>-<attempt>`.

Esta es una observación independiente de la base publicada. No añade un evento de PR ni
de grupo de fusión, una comprobación de PR obligatoria, un alias de npm ni un miembro del perfil de análisis estático.
La política diferencial de PR existente y las clasificaciones consultivas del verificador subyacente
siguen siendo independientes. Una carga correcta no puede convertir un resultado de estado fallido en PASS.

### Vía rápida para PR de versión (`quality.yml`)

`.github/workflows/quality.yml` complementa CI en los PR de main/release, los pushes a `main`,
la ejecución manual y los grupos de merge. Los PR utilizan comprobaciones rápidas filtradas por rutas.
Se eliminó la compilación duplicada deshabilitada de forma permanente; las comprobaciones reales de
compilación/empaquetado/arranque permanecen en CI.

| Tarea                                            | Alcance                                                                                                                                                                                                                                                             | Bloqueante              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR de documentación/código; referencias de documentación de la API y toda la documentación                                                                                                                                                                          | Sí                      |
| `Fast Quality Gates`                             | PR de código; comprobaciones estáticas, comprobación de tipos, comprobación de tipos del panel y pruebas unitarias afectadas                                                                                                                                        | Sí                      |
| `Forgotten sibling tests`                        | PR de código; módulos modificados rastreados hasta consumidores estáticos y posibles pruebas relacionadas; las rutas de barriles e importaciones dinámicas se notifican como diagnósticos informativos, con las excepciones de la lista de permitidos referenciadas | **Informativo**         |
| `Vitest (fast-path)`                             | PR de código; conjunto rápido de pruebas de vitest                                                                                                                                                                                                                  | Sí                      |
| `Unit Tests fast-path`                           | PR de código; conjunto de pruebas unitarias de 4 fragmentos                                                                                                                                                                                                         | Sí                      |
| `No new ESLint warnings`                         | PR de código; protección de lint que tiene en cuenta las supresiones                                                                                                                                                                                                | Sí, incluidos los forks |
| `Merge integrity (changelog + generated skills)` | PR que no sean borradores; sincronización del registro de cambios y las habilidades generadas                                                                                                                                                                       | Sí, incluidos los forks |

#### Informe de pruebas relacionadas olvidadas

`npm run check:forgotten-sibling-tests` reutiliza el solucionador de importaciones empleado por el mapa de impacto de las pruebas.
Para cada módulo de producción modificado, informa de cadenas deterministas
`changed module/symbol -> static consumer -> candidate sibling test` cuando la prueba candidata
no está presente en el diff de la solicitud de incorporación de cambios. El resumen en Markdown y el resultado JSON se conservan como
el artefacto de flujo de trabajo `forgotten-sibling-tests` para su calibración antes de cualquier despliegue bloqueante.

Las reexportaciones de barriles y las importaciones dinámicas son únicamente diagnósticos de resolución; nunca generan un
hallazgo bloqueante. Las excepciones revisadas se encuentran en
`config/quality/forgotten-sibling-allowlist.json`. Cada entrada debe indicar el consumidor y la prueba
candidata, proporcionar una justificación específica y enlazar una incidencia o solicitud de incorporación de cambios de GitHub. Las entradas con formato incorrecto
producen un fallo por precaución. Las excepciones no pueden omitir una prueba candidata eliminada ni un diff que añada `.skip`/`.todo`;
el debilitamiento de las aserciones y otros métodos de ocultación siguen siendo responsabilidad de la protección bloqueante independiente
`check:test-masking`.

### Tarea: `lint`

Se ejecuta en cada PR dirigido a `main`. Bloquea la fusión si falla.

| Script (`npm run ...`)            | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bloqueante                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | La versión de Node.js está dentro del intervalo compatible                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sí                                          |
| `check:test-tla-order`            | Ningún archivo de `node:test` en `tests/unit` registra una prueba, alcanza un `await` de nivel superior y, a continuación, registra más pruebas (#18045; control incremental: `test-tla-order-allowlist.json` solo puede reducirse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sí                                          |
| `check:cycles`                    | Importaciones circulares en todo `src/` + `open-sse/` (basado en AST, con los `paths` de tsconfig resueltos). La ejecución básica termina con el código 1 siempre que exista algún ciclo (bloqueo seguro desde #15281) y enumera los SCC. `check:cycles:ratchet` (lo que ejecuta CI) bloquea cuando el recuento supera el límite máximo de `metrics.cycles` en `quality-baseline.json` — actualmente 14, `direction: down`, por lo que solo puede disminuir (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí (control incremental)                    |
| `check:boundary`                  | Acoplamiento `open-sse → src`: importaciones únicas de archivo a archivo desde el motor hacia la aplicación (`scripts/quality/measure-boundary.mjs`; la lista de aristas es el trabajo pendiente de remediación de la división del núcleo/módulo de v4). Ejecución básica = informe informativo (igual que `quality:boundary`). `check:boundary:ratchet` (lo que ejecuta CI, también incluido en el bucle de control incremental de comprobaciones rápidas de `quality.yml`) bloquea cuando el recuento supera el límite máximo de `metrics.boundaryOpenSseToSrc` en `quality-baseline.json` — inicializado con el valor medido de 771, `direction: down`; `--update` solo lo reduce; relativo a la base en las PR (`--base-ref`, véase más abajo)                                                                                                                                                                                                                                                    | Sí (control incremental)                    |
| `check:route-validation:t06`      | Esquemas de Zod presentes en todas las rutas (política de nivel 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sí                                          |
| `check:any-budget:t11`            | El recuento de `@ts-expect-error // any` no supera el límite (catraca de nivel 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sí                                          |
| `check:provider-consistency`      | Cada proveedor de `providers.ts` tiene una entrada correspondiente en `providerRegistry.ts` (y viceversa, dentro de la lista de permitidos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sí                                          |
| `check:model-lifecycle`           | Las tres tablas de enrutamiento mantenidas manualmente se mantienen coherentes con la instantánea del ciclo de vida incluida en el repositorio (#11503): `FITNESS_TABLE` (`taskFitness.ts`) no puntúa ningún id retirado que `REGISTRY` pueda enrutar; cada destino de `BUILT_IN_ALIASES` está presente en `REGISTRY` y ausente de la instantánea de ids retirados; cada id retirado que aún esté en `REGISTRY` se redirige o figura en `allowedRetiredInCatalog`; y ninguna fuente ni destino de `DEFAULT_DEGRADATION_MAP` aparece como retirado en esa instantánea. Esto no demuestra que un modelo sea servido actualmente por un origen activo. Sin conexión: realiza la comparación con `config/quality/model-lifecycle.json`, que se actualiza manualmente mediante `npm run quality:refresh-model-lifecycle` (requiere red; no está integrado en CI). `allowedRetiredInCatalog` es un mecanismo de reducción progresiva: añada una entrada únicamente si existe una incidencia de seguimiento. | Sí                                          |
| `check:fetch-targets`             | Cada `fetch("/api/...")` del código de cliente en `src/` se resuelve a un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sí                                          |
| `check:deps`                      | Todas las dependencias instalables mediante `npm install` de cada `package.json` del repositorio figuran en `dependency-allowlist.json`; se marcan los paquetes nuevos sin versión fijada o susceptibles de _slopsquatting_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sí                                          |
| `audit:deps`                      | Auditoría de npm de los cinco lockfiles independientes (raíz, Electron, plugins OpenCode v1/v2 y proveedor). Los avisos críticos bloquean; los avisos de nivel alto siguen visibles como advertencias. Las auditorías ausentes/fallidas se consideran INCOMPLETAS y bloquean; se conservan los hashes de los locks y los informes de cada ámbito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sí                                          |
| `check:lockfile`                  | Integridad de `package-lock.json`: registro https, hashes de integridad, sin sobrescrituras de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sí                                          |
| `check:licenses`                  | Lista de licencias SPDX permitidas para las dependencias de producción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                          |
| `check:tracked-artifacts`         | Sin artefactos de compilación ni enlaces simbólicos de `node_modules` incluidos en el repositorio (también se ejecuta en el pre-commit de husky; el pre-push es intencionadamente ligero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sí                                          |
| `check:ai-attribution`            | Sin tráiler `Co-Authored-By` de IA/bot ni pie de página de generación mediante IA en los commits, el título o el cuerpo de la PR — Regla estricta n.º 16 (en el bucle de comprobaciones rápidas de `quality.yml` para PR→`release/**`: lee la carga útil del evento y no hace nada fuera de las PR; y en un paso exclusivo para PR de la comprobación de lint de `ci.yml` para PR→`main`; también en el hook `commit-msg` de husky; se permiten coautores humanos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Cada exclusión de Vitest indica una incidencia de seguimiento y aparece en `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sí                                          |
| `check:file-size`                 | Los archivos fuente (`.ts`/`.tsx` en `src/`, `open-sse/`, `electron/`, `bin/`) se mantienen dentro de `cap` y los archivos de prueba (`*.test.ts(x)`) dentro de `testCap`; los archivos inmovilizados en `file-size-baseline.json` (`frozen` / `testFrozen`) no deben superar el tamaño registrado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sí                                          |
| `check:error-helper`              | Las respuestas de error en ejecutores/manejadores usan `buildErrorBody()` / `sanitizeErrorMessage()` (Regla estricta n.º 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                          |
| `check:migration-numbering`       | Los archivos SQL de migración están numerados secuencialmente, sin saltos ni duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sí                                          |
| `check:public-creds`              | No hay valores literales de OAuth `client_id`/`client_secret` ni claves web de Firebase fuera de `publicCreds.ts` (Regla estricta n.º 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sí                                          |
| `check:db-rules`                  | No hay SQL sin procesar fuera de los módulos de `src/lib/db/`; no hay importaciones agrupadas desde `localDb.ts` (Reglas estrictas n.º 2/n.º 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sí                                          |
| `check:known-symbols`             | Los ejecutores de proveedores, las estrategias de enrutamiento y los traductores registrados en sus tablas de despacho coinciden con los archivos del disco; no hay símbolos huérfanos ni sin declarar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                          |
| `check:route-guard-membership`    | Cada ruta que inicia un proceso secundario está clasificada por `isLocalOnlyPath()` (Reglas estrictas n.º 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                          |
| `check:test-discovery`            | Cada archivo `*.test.ts` / `*.spec.ts` del repositorio es recopilado por al menos un ejecutor de pruebas (mecanismo de trinquete: la lista de archivos huérfanos de `test-discovery-baseline.json` solo puede reducirse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sí                                          |
| `check:agent-skills-sync`         | Los artefactos generados de habilidades de agentes coinciden con su catálogo de origen (sin divergencias)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Los logotipos/recursos de los proveedores cuentan con una entrada de procedencia registrada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | Los archivos de configuración JSON se analizan correctamente y cumplen las reglas de linting del repositorio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Compilación de TypeScript sin errores (solo advertencias informativas)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` estricto — orientado al futuro; muchos lugares de llamada preexistentes aún necesitan anotaciones                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Informativo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitado a `src/app/(dashboard)/**` (#7033) — la lista de permitidos seleccionada de 27 archivos de `typecheck:core` no incluye ningún TSX del panel, y `next build` tampoco comprueba nunca sus tipos (`next.config.mjs` establece `ignoreBuildErrors: true`), por lo que las regresiones de identificadores huérfanos allí (#6625/#6909) eran invisibles para CI. Compara con una línea base congelada de recuentos por archivo y por código TS (`config/quality/dashboard-typecheck-baseline.json`, el mismo patrón de detección de obsolescencia que `check:known-symbols`) — solo los errores NUEVOS que superen el recuento de la línea base hacen fallar la puerta de control; reduzca progresivamente la línea base con `--update` cuando se corrija un error preexistente.                                                                                                                                                                                                             | Sí                                          |

### Trabajo: `quality-gate`

Se ejecuta después de `test-coverage`. Bloquea la fusión en caso de fallo.

| Script                       | Valida                                                                                                                                                                                                                          | Bloqueante                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `quality:collect`            | Genera `quality-metrics.json` (recuento de advertencias de ESLint, cobertura del informe combinado de fragmentos)                                                                                                               | Sí (antes del ajuste progresivo) |
| `quality:ratchet`            | Ninguna métrica de `quality-baseline.json` ha empeorado (advertencias de ESLint ≤ línea base; cobertura ≥ línea base)                                                                                                           | Sí                               |
| `check:duplication`          | La duplicación de código (jscpd@4) no supera la línea base de `quality-baseline.json`                                                                                                                                           | Sí                               |
| `check:complexity`           | La complejidad ciclomática por archivo no supera el límite (`complexity` principal de ESLint + `max-lines-per-function`)                                                                                                        | Sí                               |
| `check:cognitive-complexity` | Ajuste progresivo de la complejidad cognitiva (`eslint-plugin-sonarjs`) — ejecución independiente de ESLint; CI ejecuta ambos combinados en el único paso `check:complexity-ratchets`                                           | Sí                               |
| `check:dead-code`            | El ajuste progresivo de exportaciones o archivos sin usar (knip) no empeora con respecto a la línea base                                                                                                                        | Sí                               |
| `check:compression-budget`   | Presupuesto del benchmark de compresión — los umbrales mínimos de ahorro de tokens por motor no deben empeorar                                                                                                                  | Sí                               |
| `check:type-coverage`        | El ajuste progresivo del porcentaje con tipos (`type-coverage`) no empeora; reemplaza en gran medida a `typecheck:noimplicit:core`                                                                                              | Sí                               |
| `check:codeql-ratchet`       | El recuento de alertas abiertas de CodeQL no empeora (se obtiene mediante `gh api`; se omite correctamente si no hay token) — frecuencia de actualización y activación manual: consulte "Ajuste progresivo de CodeQL" más abajo | Sí                               |

### Trabajo: `quality-extended`

El trabajo bloquea a los candidatos aplicables. El tamaño del paquete, los hallazgos
de secretos, los hallazgos de vulnerabilidades, los hallazgos del flujo de trabajo
y los cambios de OpenAPI se comprueban mediante ajustes progresivos obligatorios.
Los diagnósticos de dependencias circulares siguen siendo informativos. La instalación
de los escáneres es obligatoria: `scripts/ci/install-quality-scanners.sh` aprovisiona
versiones fijadas y propaga los fallos de instalación. La ausencia de herramientas,
los informes no válidos o la falta de líneas base dejan la puerta de control obligatoria
del escáner como INCOMPLETA.

| Script                   | Valida                                                                                                                                                                                                                                                                       | Bloqueo                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | Ausencia de dependencias circulares (dpdm)                                                                                                                                                                                                                                   | **Consultivo**                                            |
| `check:bundle-size`      | El tamaño del paquete no supera el límite; si la medición no está disponible, se produce un fallo                                                                                                                                                                            | **Bloqueante con --ratchet**                              |
| `check:secrets`          | Los hallazgos de Gitleaks no empeoran; los análisis obligatorios rechazan herramientas, código fuente o líneas base ausentes, análisis fallidos e informes no válidos                                                                                                        | **Bloqueante con --ratchet**                              |
| `check:vuln-ratchet`     | Las vulnerabilidades de las dependencias no empeoran; los análisis obligatorios rechazan herramientas ausentes, informes no válidos o líneas base ausentes                                                                                                                   | **Bloqueante con --ratchet**                              |
| `check:workflows`        | Lint de flujos de trabajo (actionlint + zizmor); los analizadores ausentes o defectuosos, los informes no válidos o la ausencia de una línea base de ratchet fallan como INCOMPLETE. Los hallazgos válidos siguen la política estricta, consultiva o de ratchet seleccionada | Ejecución obligatoria; ratchet de zizmor bloqueante en CI |
| `check:openapi-breaking` | Contrato de API pública comparado con commits de eventos fijados (base de fusión de PR, estado anterior al push, base del grupo de fusión; primer padre del checkout programado/manual); la medición obligatoria falla de forma cerrada                                      | **Bloqueante con --ratchet**                              |

### Trabajo: `docs-sync-strict`

En las solicitudes de incorporación dirigidas a `main` o `release/**`, este trabajo solo se ejecuta para candidatos que no sean borradores (o que procedan de una cola de confianza) y estén clasificados como cambios de documentación o de código. También se ejecuta en eventos de CI que no sean de PR; el activador de push de este flujo de trabajo solo abarca `main`, no `release/**`. Un paso que termina con un código de salida distinto de cero bloquea el trabajo; los hallazgos que solo se notifican y las excepciones documentadas a continuación no lo bloquean.

| Script                         | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bloqueo                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Puerta de control global que ejecuta secuencialmente las 7 puertas de control secundarias indicadas a continuación                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sí                                                                                                                                              |
| ↳ `check:docs-sync`            | Coherencia de versiones entre el paquete, OpenAPI y CHANGELOG, réplicas exactas de `llm.txt`, invariantes de secciones y tamaño del CHANGELOG traducido, y ausencia de documentos duplicados que hayan sido reemplazados                                                                                                                                                                                                                                                                                                                                                                         | Sí                                                                                                                                              |
| ↳ `check:docs-frontmatter`     | Las páginas de documentación compiladas contienen títulos de frontmatter válidos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                                                                                                                              |
| ↳ `check:docs-counts`          | Los invariantes de recuento de alta confianza se aplican de forma estricta; las comprobaciones heurísticas del número de archivos solo advierten, salvo que el script reciba `--strict` (la metapuerta de CI no lo pasa)                                                                                                                                                                                                                                                                                                                                                                         | El nivel estricto bloquea; el nivel flexible es consultivo                                                                                      |
| ↳ `check:env-doc-sync`         | Las lecturas de variables de entorno en el código fuente, `.env.example` y `docs/reference/ENVIRONMENT.md` coinciden tras aplicar las listas explícitas de excepciones para elementos ignorados, exclusivos de la documentación y exclusivos del entorno                                                                                                                                                                                                                                                                                                                                         | Sí, fuera de las listas de excepciones documentadas                                                                                             |
| ↳ `check:deprecated-versions`  | Notifica versiones posiblemente desactualizadas fuera de contextos históricos seguros y fechas de actualización antiguas, excluyendo los documentos ignorados                                                                                                                                                                                                                                                                                                                                                                                                                                    | Consultivo en la configuración actual de CI (no se pasa `--strict`)                                                                             |
| ↳ `check:doc-links`            | Los enlaces markdown internos de la documentación remiten a archivos reales (formato `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                                                                                                                              |
| ↳ `check:fabricated-docs`      | Las rutas, variables de entorno, órdenes de CLI, nombres de hooks y rutas de archivo citados en la documentación existen en el código fuente. Puerta estricta mediante `--strict`; fallo no bloqueante sin la opción.                                                                                                                                                                                                                                                                                                                                                                            | Sí (mediante `--strict` en CI)                                                                                                                  |
| `check:cli-i18n`               | Las claves de `t()` utilizadas por la CLI existen en `en`; `pt-BR` conserva todas las secciones de primer nivel; `zh-CN` y `zh-TW` contienen todas las claves de `en`                                                                                                                                                                                                                                                                                                                                                                                                                            | Sí                                                                                                                                              |
| `check:openapi-coverage`       | La especificación OpenAPI cubre como mínimo un umbral sujeto a ratchet de las rutas reales                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sí                                                                                                                                              |
| `check:openapi-security-tiers` | Las anotaciones declaradas `x-loopback-only`/`x-always-protected` deben estar respaldadas por `routeGuard.ts`; los errores de análisis y las discrepancias de la comprobación directa bloquean. La comprobación inversa de la ausencia de `x-loopback-only` bajo prefijos de acceso exclusivamente local genera advertencias, y las rutas definidas solo mediante patrones se excluyen de esa pasada inversa.                                                                                                                                                                                    | Las comprobaciones de análisis y directas bloquean; la comprobación inversa es consultiva                                                       |
| `check:openapi-routes`         | Cada ruta `/api...` en `openapi.yaml` corresponde, sin distinguir diferencias en los parámetros, a una ruta real tras aplicar la lista de excepciones justificadas `KNOWN_STALE_SPEC`; las entradas obsoletas de la lista también provocan un fallo                                                                                                                                                                                                                                                                                                                                              | Sí                                                                                                                                              |
| `check:docs-symbols`           | Las referencias internas a URL `/api/...` en los documentos canónicos que no son réplicas corresponden a una ruta real o a una familia de rutas; se excluyen las referencias a proxy, servidores de origen, marcadores de posición y archivos, así como las entradas justificadas de `KNOWN_STALE_DOC_REFS`, y las entradas obsoletas de la lista provocan un fallo                                                                                                                                                                                                                              | Sí                                                                                                                                              |
| `i18n translation drift`       | Comprueba los hashes de origen/destino de los documentos principales y la procedencia de la traducción. La comparación de PR solo permite fallos heredados idénticos; las inconsistencias nuevas o no verificadas de origen, destino ausente, hash de destino, traducción obsoleta o caché de secciones bloquean. Fuera de la comparación de PR, los fallos de origen/destino ausente/hash de destino bloquean, mientras que las traducciones obsoletas y las cachés de secciones inconsistentes siguen siendo avisos. La ausencia de una caché de secciones del formato antiguo no es un fallo. | La desviación nueva/no verificada en PR bloquea; la desviación heredada idéntica es un aviso; las reglas fuera de PR dependen del tipo de fallo |

### Trabajo: `i18n-ui-coverage`

| Script                            | Valida                                                                                                                                                                                                                                    | Bloqueante     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | La cobertura de claves i18n de la interfaz de usuario es ≥ 65 %                                                                                                                                                                           | Sí             |
| `check-ui-value-drift` (inline)   | Un **valor** en inglés reescrito no deja ninguna traducción obsoleta                                                                                                                                                                      | Sí             |
| `check-new-key-coverage` (inline) | Una clave en inglés **nueva** está traducida en todas las configuraciones regionales; se rechaza un marcador `__MISSING__:`                                                                                                               | Sí             |
| `check-translation-ratio`         | La proporción de traducciones reales por configuración regional (hojas idénticas al inglés, con marcador de posición o ausentes fuera de la lista de permitidas) no debe superar `config/quality/i18n-translation-baseline.json` + margen | **Bloqueante** |

Requiere `fetch-depth: 0`: la puerta de deriva de valores compara `en.json` con la base de fusión.

#### `check-ui-value-drift` — puerta para traducciones obsoletas

Detecta la única regresión de i18n que las demás puertas no pueden ver estructuralmente: un valor en inglés
se reescribe y las traducciones derivadas del inglés _anterior_ permanecen, por lo que
los usuarios que no usan inglés siguen leyendo un texto formulado con seguridad, pero ahora incorrecto.

Esto llegó a producción. `oauthModal.googleOAuthWarning` se reescribió cuando se incorporó el
asistente de inicio de sesión de Antigravity (#5203); **39 de 43 configuraciones regionales** conservaron un texto que indicaba a los operadores que debían «copiar la
URL completa y pegarla debajo», un flujo que no puede completarse con ese proveedor. Pasó
desapercibido hasta #8463 porque:

- `sync-ui-keys` solo rellena las claves que están **ausentes**, nunca las que están **obsoletas**;
- `check-ui-keys-coverage` cuenta la _presencia_ de claves, por lo que una traducción obsoleta se considera cubierta;
- `check-translation-drift` rastrea las réplicas de documentación de `docs/i18n/<locale>/**.md` —
  nunca lee `src/i18n/messages/*.json`. Bloqueante en el job `docs-sync-strict` desde la
  resincronización de 2026-09: editar un documento principal → `npm run i18n:run -- --files=<doc>` (por sección, económico).

**Basado en diferencias, no en una línea base.** Compara el archivo `en.json` de la base de fusión con el
árbol de trabajo; para cada clave cuyo valor en inglés haya cambiado, cualquier configuración regional que aún conserve una
traducción intacta está obsoleta. Esto **congela deliberadamente la deuda preexistente**: una diferencia
no puede revelar de qué versión antigua del inglés procede una traducción de larga duración, por lo que la puerta evalúa
únicamente lo que modifica el cambio actual. La alternativa (una línea base de hashes por clave) costaría
un archivo generado de ~600 KB, 3 veces mayor que la línea base existente más grande, y cambiaría en cada PR de i18n.

Hay dos formas de cumplirla:

1. actualizar las traducciones afectadas, o
2. establecerlas en `__MISSING__:<new english>`; el entorno de ejecución proporciona entonces el inglés corregido
   (`src/i18n/request.ts::deepMergeFallback`, #7258) y la clave queda en cola para su traducción.

Si cambió el **significado** de la cadena, es preferible **cambiar el nombre de la clave**: una clave nueva no puede heredar
una traducción obsoleta. Ese es el patrón que utilizó #8463.

```bash
npm run i18n:check-value-drift          # estricto (lo que ejecuta CI)
npm run i18n:check-value-drift:warn     # solo genera el informe
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Los controles de desviación de valores y de claves nuevas comparten una única comparación inmutable de
`scripts/i18n/resolve-ui-diff-base.mjs`. El flujo de trabajo pasa los mismos SHA de base, punta de la base y
candidato a ambas comprobaciones. Las ejecuciones por PR/redestinación de la base, push y grupo de fusión usan el contexto
de su evento. El despacho de una rama candidata requiere su PR abierta exacta o la entrada explícita
`i18n_base_sha`. El despacho o la observación programada de `main` o `release/vX.Y.Z`
sin esa entrada compara el último commit con su primer padre; no es una auditoría de
toda la deuda de traducción heredada. La invocación local requiere una base de comparación explícita,
por ejemplo, el comando `BASE_REF` anterior.

Un contexto de comparación ausente o ambiguo, un catálogo requerido ilegible o no válido y
un candidato modificado producen `INCOMPLETE` con el código de salida **2**, incluso en el modo de advertencia.
La lectura de catálogos usa `scripts/i18n/read-ui-catalog.mjs`; los errores de lectura no se sustituyen
por objetos vacíos. Ni una base no disponible ni una entrada incompleta determinan un resultado PASS.

### Job: `i18n`

Matriz completa de validación de i18n (un job por configuración regional). Todo el job es consultivo.

| Script                          | Valida                                                 | Bloqueante                                                |
| ------------------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| `validate_translation.py quick` | Integridad de la traducción por configuración regional | **Consultivo** (`continue-on-error: true` en todo el job) |

### Job: `pr-test-policy`

Se ejecuta únicamente en solicitudes de incorporación de cambios.

| Script                 | Valida                                                                                                                                                         | Bloqueante |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | Las PR que modifican código de producción en `src/`, `open-sse/`, `electron/` o `bin/` deben incluir o actualizar pruebas (regla estricta n.º 8)               | Sí         |
| `check:test-masking`   | Los archivos de prueba modificados no reducen el número neto de aserciones ni añaden tautologías `assert.ok(true)`                                             | Sí         |
| `check:pr-evidence`    | El cuerpo de la PR cita pruebas o evidencias de VPS para el cambio (mecaniza la regla estricta n.º 18 buscando en el texto de la PR; es frágil, véase Backlog) | Sí         |

### Job: `test-vitest`

Necesita el trabajo de clasificación `changes`. Los fragmentos aplicables de la matriz bloquean la fusión si se produce un error.

| Suite            | Valida                                                              | Bloqueante                                                                                                                               |
| ---------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 herramientas), autoCombo, caché — ejecutor vitest | Sí                                                                                                                                       |
| `test:vitest:ui` | Pruebas de componentes de UI — ejecutor vitest                      | **Bloqueante** — los fallos preexistentes se excluyen explícitamente en `vitest.config.ts`; los nuevos fallos hacen que el trabajo falle |

### Flujos de trabajo nocturnos (programados, informativos)

Se ejecutan según una programación cron (y mediante `workflow_dispatch`), nunca en PR. Todos son informativos.

| Flujo de trabajo       | Valida                                                                                                                                                                                                  | Bloqueante      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | Pruebas de propiedades de fast-check con una semilla aleatoria y un número elevado de ejecuciones                                                                                                       | **Informativo** |
| `nightly-resilience`   | Umbral de crecimiento del heap, inyección caótica de fallos, pruebas de carga/prolongadas con k6                                                                                                        | **Informativo** |
| `nightly-llm-security` | Protección contra inyección de promptfoo (modo de bloqueo) + sondas de garak (se omiten sin un secreto de proveedor)                                                                                    | **Informativo** |
| `nightly-schemathesis` | Fuzzing de contratos OpenAPI (schemathesis) contra una instancia activa de OmniRoute mediante `docs/openapi.yaml` — detecta infracciones de la especificación / errores 500 no gestionados (Fase 8 B.4) | **Informativo** |
| `nightly-mutation`     | Puntuación de pruebas de mutación de Stryker sobre la vía rápida de pruebas unitarias — los mutantes supervivientes revelan aserciones débiles                                                          | **Informativo** |
| `nightly-compat`       | Matriz de compatibilidad del motor Node para los intervalos admitidos de `engines.node`                                                                                                                 | **Informativo** |

Las líneas base de rendimiento (heap, TTFB, tiempo de compilación) se registran, pero no se usan como criterio de bloqueo: consulta [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **informativo** — el total global frente a la línea base congelada. La desviación heredada nunca marca en rojo una
  PR inocente; la desviación se registra para corregirla durante la conciliación de la versión y la supervisa el
  job de margen disponible.

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

Cada control que no puede fallar debido a infracciones preexistentes utiliza una lista de permitidos fija
(p. ej., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La política es:

**Corrige la causa raíz; utiliza la lista de permitidos únicamente cuando la infracción sea preexistente y
no pueda corregirse en el mismo PR.**

Al añadir una entrada a una lista de permitidos:

1. Incluye un comentario con la justificación.
2. Haz referencia a la incidencia de seguimiento (p. ej., `// #3498 — Phase 2 feature, not yet implemented`).
3. Elimina la entrada en el mismo PR que corrige la infracción; una entrada obsoleta que ya no
   suprima una infracción activa constituye en sí misma un defecto (la comprobación de obsolescencia de 6A.3
   hará que el control falle por una entrada huérfana en la lista de permitidos una vez implementada).

**No** añadas entradas a la lista de permitidos para que las pruebas pasen más rápido. Un control superado con una
lista de permitidos cada vez mayor genera una falsa sensación de calidad.

### Cuando un control falla en tu PR

1. **Lee detenidamente la salida del control**: te indica exactamente qué archivo o símbolo ha infringido
   la regla.
2. **Corrige la infracción**: la mayoría de los controles son comprobaciones deterministas del sistema de archivos que se superan en cuanto
   el código es correcto.
3. **Si la infracción es preexistente** (es decir, no la introdujiste tú, pero ahora el control
   la abarca): añade una entrada a la lista de permitidos con un comentario justificativo y una incidencia de seguimiento.
4. **Si el control es incremental** (cobertura, advertencias de ESLint, duplicación, complejidad):
   tu cambio ha empeorado la métrica. Corrige el problema subyacente o, en casos excepcionales, ejecuta
   `npm run quality:ratchet -- --update` si el cambio es intencionado y la degradación de la métrica
   es aceptable; pero documenta el motivo en la descripción del PR.
5. **Los controles informativos** (`continue-on-error: true`) son meramente informativos: no bloquean
   la fusión, pero aparecen en el resumen de CI. Corrígelos de todos modos.

---

## Añadir un nuevo control

1. Cree `scripts/check/check-<name>.mjs` (o `.ts`). Los controles de políticas terminan con el código 0/1.
   Los controles de tipo incremental emiten una métrica a `quality-metrics.json` mediante `collect-metrics.mjs`.
2. Añade `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json` y
   sincroniza el alias y su comando exacto en `config/quality/gate-manifest.json`.
   Aplica la misma sincronización al cambiar o eliminar un alias de validación existente.
   Ejecuta `npm run check:gate-manifest`; el hook de pre-commit y la clasificación de cambios de CI
   hacen cumplir este contrato.
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

Este inventario se cotejó con `ci.yml` el 2026-06-17 (la versión anterior omitía
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Una revisión de ROI del conjunto cotejado
identificó los siguientes candidatos para racionalización. **Las fusiones son cambios
mecánicos de CI; las activaciones/eliminaciones son decisiones de política reservadas
para el operador.** Aún no se ha aplicado nada de lo indicado a continuación.

**Tampoco documentados anteriormente** (consultivos, señal débil): el trabajo `docs-lint`
(markdownlint + Vale, trabajo completo con `continue-on-error`) y los flujos de trabajo
independientes de análisis `semgrep.yml` / `codeql.yml` / `scorecard.yml`.
`semgrepFindings: 0` está en `quality-baseline.json`, pero no está conectado a un ratchet
bloqueante en `ci.yml`; actualmente, la métrica está huérfana.

### Fusión / deduplicación (mecánica, menor riesgo)

Cada candidato se validó contra el estado real de los controles el 2026-06-17
(confiar, pero verificar); varias fusiones «obvias» resultaron ocultar deuda y **no**
son sustituciones directas limpias.

- **`check:docs-sync` se ejecuta dos veces** — de forma independiente en el trabajo `lint` y de nuevo dentro de `check:docs-all` (`docs-sync-strict`) y del hook de pre-commit de husky. ✅ **HECHO** — se eliminó la invocación independiente de `lint`.
- **Análisis de CVE** — ❌ **NO es una fusión limpia.** `audit:deps` bloquea los avisos críticos y las auditorías incompletas en los cinco lockfiles, mientras que informa de los avisos de nivel alto como advertencias según la política actual; `check:vuln-ratchet` (osv) solo falla ante una _regresión_ respecto de la línea base registrada y rechaza las mediciones ausentes cuando son obligatorias. Semánticas diferentes: eliminar `audit:deps` haría perder el control crítico absoluto y los comprobantes independientes de auditoría de paquetes. Mantener ambos.
- **Detección de ciclos** — ✅ **HECHO** (#15159 G-01/G-02). El texto anterior calificaba `check:cycles` como el control «verde y curado» y justificaba mantenerlo como bloqueante porque `check:circular-deps` (dpdm) informaba de 91 ciclos. Ese estado verde era un **falso positivo**: `check:cycles` analizaba 5 subdirectorios (450 archivos), solo encontraba coincidencias con `import|export … from` estáticos y descartaba todos los especificadores `@/` y `@omniroute/open-sse/`, por lo que no podía detectar los ciclos de importaciones dinámicas + alias que predominaban en el repositorio. Corregido: ahora el control recorre `src` + `open-sse` (5023 archivos), recopila especificadores desde el AST de TypeScript (por lo que `import("…")` cuenta y `typeof import("…")` en posición de tipo no) y resuelve `paths` de tsconfig. Encuentra **14** ciclos, no 0. Como 14 ciclos preexistentes no pueden corregirse en un PR de controles, `check:cycles` ahora es un **ratchet** (`--ratchet`, límite máximo `metrics.cycles.value = 14` en `quality-baseline.json`, `direction: down`): bloquea cualquier _regresión_ y el recuento solo puede disminuir. CI ejecuta `npm run check:cycles:ratchet`. La reducción progresiva se gestiona con **A-01**. `check:circular-deps` (dpdm) permanece como una segunda opinión consultiva más amplia.
- **Complejidad** — ✅ **HECHO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): un recorrido de ESLint, con recuentos por ruleId para que las líneas base ciclomática+máximo de líneas y cognitiva se mantengan independientes; los controles individuales `check:complexity` / `check:cognitive-complexity` se mantienen para ejecutar `--update` localmente.
- **Antialucinación de `/api`** — ✅ **HECHO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un único inventario del sistema de archivos de `src/app/api`; openapi-routes + docs-symbols siguen generando informes independientes; los controles individuales se mantienen para ejecuciones locales.
- **`check:node-runtime` se ejecuta en 11 trabajos** — ⚠️ **ROI bajo.** Cada uno usa un runner independiente y la comprobación tarda <1 s; el ahorro total sería de ~10 s, a cambio de perder una protección económica por trabajo. No merece la pena el cambio.
- **`typecheck:noimplicit:core` en el lint de CI** — ✅ **eliminado del trabajo lint** (era consultivo con `continue-on-error`); la superficie de tipos bloqueante es `typecheck:core` + `check:type-coverage`. Se conserva el script local.

### Activar / decidir (política del operador)

- `check:openapi-security-tiers` (consultivo) — ❌ **NO se puede activar limpiamente.** Finaliza con 0, pero advierte que varias rutas de `traffic-inspector` bajo `LOCAL_ONLY_API_PREFIXES` carecen de la anotación `x-loopback-only: true`. Para aplicarlo de forma obligatoria, primero hay que añadir esas anotaciones a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — queda en gran medida subsumido por el ratchet bloqueante `check:type-coverage`. Convertirlo en ratchet o eliminar la segunda pasada redundante de `tsc`.
- `test:vitest:ui` (ahora **bloqueante**) — los fallos preexistentes están excluidos explícitamente en `vitest.config.ts` mediante comentarios de seguimiento `// #8618`; los fallos nuevos hacen fallar el trabajo.
- `check:secrets` (gitleaks, ratchet bloqueante) — el límite máximo actual es `metrics.secretFindings` en `quality-baseline.json`. Toda excepción necesita una entrada justificada en `.gitleaks.toml`; una medición no disponible se considera INCOMPLETA. El análisis complementa el análisis nativo de secretos de GitHub y `check:public-creds`.
- `check:pr-evidence` (bloqueante, busca texto en prosa mediante grep en el cuerpo del PR) — alto riesgo de falsos positivos; eliminarlo debilitaría la aplicación de la Regla estricta n.º 18, por lo que se trata de una verdadera decisión de política.
- `semgrep` (independiente y consultivo) — se solapa con CodeQL para las familias de OWASP; conectar su línea base a un ratchet o eliminarlo.

---

## Documentación relacionada

- Cadena de suministro (procedencia, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — barrera de paridad del conjunto de claves

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, trabajo `i18n-ui-coverage`).
Compara el conjunto de claves hoja de cada `src/i18n/messages/<locale>.json` con `en.json` y falla
ante cualquier clave hoja ausente o adicional, independientemente de cuándo se añadió. Los marcadores
`__MISSING__:` cuentan como presentes (su contenido corresponde a la barrera de proporción). Es el
complemento absoluto de las dos barreras basadas en diferencias/porcentajes: `check-ui-keys-coverage`
impone un mínimo del 80 % por configuración regional (43 claves ausentes de unas 13 000 aún dan un
99,7 %) y `check-new-key-coverage` evalúa únicamente las claves que una PR añade a `en.json`. Un lote
de configuraciones regionales se genera a partir del `en.json` del día en que se crea su rama y se
traduce durante varios días mientras la base continúa añadiendo claves; la PR del lote no añade
ninguna clave por sí misma, por lo que ambas barreras relacionadas permanecieron en silencio cuando
el lote 1 (#13044) se incorporó con 43 claves ausentes en nueve configuraciones regionales y el lote
2 (#13660), con 10 claves ausentes en ocho (2026-09-15). Para corregir un fallo, use
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; una clave hoja `extra`
significa que la fuente la eliminó: elimínela de la configuración regional. `--warn` informa sin
producir un fallo. `--catalog=cli` ejecuta la misma comparación sobre `bin/cli/locales`
(`npm run i18n:check-keys:cli`); ambos pasos se encuentran en el trabajo `i18n-ui-coverage`.

#### `check-new-key-coverage` — barrera de i18n para claves nuevas

Barrera relacionada con `check-ui-value-drift`. Esta detecta un valor en inglés que fue
**reescrito** mientras sus traducciones quedaron desactualizadas; la primera detecta una clave en
inglés que fue **añadida** sin que algunas configuraciones regionales llegaran a recibirla.

`check-ui-keys-coverage` no puede detectar esta clase de problema: impone un porcentaje mínimo por
configuración regional, y once claves ausentes de unas 13 000 mantienen la cobertura en el 99,9 %.
Un porcentaje por idioma no puede expresar «esta funcionalidad se publicó sin traducir»: una
funcionalidad completa puede incorporarse a una configuración regional nueva sin ningún texto y
sin que la cifra llegue a cambiar.

El incidente que codifica: la fase 3 de Orchestration Canvas tradujo sus once claves en las 42
configuraciones regionales existentes en ese momento. Horas después, el lote de idiomas de la UE
(#13044) elevó el repositorio a 51 configuraciones regionales, y las nueve recién incorporadas
(`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nunca las recibieron. `deepMergeFallback`
sustituye una clave ausente por el inglés, por lo que el modo de fallo fue una interfaz sin traducir,
en lugar de una interfaz en blanco: un problema real y silencioso por diseño.

Al igual que su barrera relacionada, **tiene en cuenta las diferencias**: compara el inglés en la
base de fusión con el árbol de trabajo, por lo que las carencias preexistentes permanecen
congeladas y la barrera no necesitó ninguna migración para activarse.

**Un marcador `__MISSING__:<english>` no la satisface (desde 2026-09-17).** Antes era el aplazamiento
documentado —el entorno de ejecución recurre al inglés correcto—, hasta que ocho PR de
funcionalidades del 2026-09-16 añadieron 61 claves y colocaron el marcador en las 65 configuraciones
regionales en vez de traducirlas: esta barrera aceptó todas, nada bloqueó las PR y, después, la
barrera bloqueante de proporción de traducciones reales falló en la punta de la versión para todo
el mundo (pt-BR 3,2 % > 2,5 % + 0,5). Ahora un marcador se considera una traducción ausente. Para
corregir un fallo, use
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, o bien
todas las configuraciones regionales en paralelo mediante `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, seguro sin terminal adjunto, se niega a iniciarse sin las
variables de entorno `OMNIROUTE_TRANSLATION_*`). Una clave que deba permanecer en inglés (un nombre
fijado de producto/motor/indicador) debe incluirse en `scripts/i18n/untranslatable-keys.json`, nunca
ocultarse tras un marcador. `vi` prohíbe por completo los marcadores
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — barrera de pruebas aparcadas

Un archivo incluido en la lista `exclude` de `vitest.config.ts` es una prueba que no se ejecuta,
aunque para quien examina el árbol parece formar parte de la cobertura. Sesenta y dos archivos se
acumularon tras el comentario
`// #8618 — pre-existing failure; remove this exclusion when fixed`. La incidencia #8618 se cerró el
2026-08-11 mientras la lista que supervisaba crecía de 45 a 62 entradas, cada una de las nuevas con
un comentario heredado que apuntaba a una incidencia cerrada. Cuando por fin se midió la lista
archivo por archivo (#13204), **51 de los 62 pasaron con el árbol actual sin ningún cambio en el
código fuente**.

La barrera exige que cada exclusión que corresponda a un archivo real (a) indique una incidencia de
seguimiento y (b) aparezca en `config/quality/vitest-exclusions.json` con su estado medido, de modo
que añadir una sea una diferencia revisable en un archivo específico, en lugar de una línea más en
un array de 60 entradas. Deliberadamente, no vuelve a ejecutar las pruebas excluidas: eso cuesta
unos 10 minutos y corresponde a un trabajo periódico; el inventario registra cuándo se midió cada
una por última vez.
