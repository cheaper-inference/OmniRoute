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

## Perfiles de ejecución e inventario de puertas

### admisión de candidatos

Los flujos de trabajo CI y Quality Gates emiten cada uno un veredicto estable: `Gate / CI` y `Gate / Quality`. Su política de admisión versionada enumera cada trabajo previo según sea necesario o consultivo. Un trabajo requerido aplicable debe tener éxito: los resultados faltantes, cancelados, omitidos, pendientes y desconocidos no pueden establecer PASS. Una clasificación válida de solo documentos o de catálogo puede hacer que un carril de código no sea aplicable; un borrador ordinario PR no es un candidato aceptado. Una etiqueta `hotfix` no renuncia a la evidencia.

Ambos flujos de trabajo cubren PRs en sucursales main/release, envíos a `main`, envío manual y eventos de fusión de grupos. Push, despachar y fusionar grupo ejecutan la selección completa. Un borrador de cola Mergify confiable también ejecuta trabajos `full-code`/`full-code-e2e` aplicables; PRs normal los omite. Antes de una fusión manual, ejecute un despacho completo del candidato exacto. Los envíos a `release/**` no inician estos flujos de trabajo; Release-Green observa la base fusionada por separado (carril alojado `docs/ops/RUNNER_BOX.md` → ). Las bifurcaciones y los grupos de fusión utilizan ejecutores alojados para trabajos que de otro modo seleccionarían ejecutores autohospedados; Se debe verificar una capacidad alojada suficiente antes de la implementación.

Un PR normal ejecuta la selección rápida. Los carriles `full-code` y `full-code-e2e` de la política de admisión (E2E, integración, artefacto de paquete, humo Electron, Bun SQLite, clientes de ecosistema y protocolo) se ejecutan solo en un borrador de cola de Mergify o en una ejecución completa: `gh workflow run ci.yml --ref <branch>`.

Cada recibo JSON identifica el SHA retirado, la ejecución del flujo de trabajo y el intento. La CLI rechaza una discordancia checkout/event SHA. Las pruebas de flujo de trabajo vinculan la membresía de la política a la lista `needs` del trabajo de veredicto para que un carril nuevo o eliminado no pueda desaparecer silenciosamente. Los recibos cubren su propio flujo de trabajo, no la publicación, la implementación o los aspectos internos de un escáner de asesoramiento existente. Realizar las verificaciones aplicables requeridas en las reglas de la rama es un cambio administrativo separado; definir sus puestos de trabajo no protege por sí solo a una sucursal.

`API Route Typecheck` es una verificación de flujo de trabajo independiente, fuera de los veredictos agregados y del perfil estático del observador completo local. Inspeccione su resultado por separado para encontrar el candidato exacto. `.github/workflows/api-route-typecheck.yml` se ejecuta en PRs en `main` o `release/**`, envía a cualquiera de las familias de sucursales, envío manual y eventos `merge_group` de tipo `checks_requested`. No tiene filtro de ruta. Fusionar grupos consulte `merge_group.head_sha`; Para otros eventos, consulte `github.sha`. Todos los eventos utilizan las mismas pruebas de puerta de diagnóstico API y de unidad de puerta. Los retargets base PR solicitan una nueva verificación; Las ediciones body/title utilizan el nombre `Admission not requested / API Route Typecheck` de solo observación y no pueden reemplazar la verificación de admisión.

### Evidencia retenida en el reductor de aceptación.

`scripts/quality/validate-release-acceptance.mjs` reduce un plan suministrado y sus manifiestos; no establece que el plan cubra todo el proceso de lanzamiento. Sus informes establecen explícitamente `releaseAcceptance: false`, incluso cuando ese plan es `VERIFIED`. El flujo de trabajo `release-acceptance.yml` todavía utiliza elementos ocultos, no recibos reales de compilación, paquete, arranque o promoción.

La CLI exige que `--evidence-root` verifique la evidencia retenida. Los archivos se resuelven como `<evidence-root>/<artifact_id>/<member>` y se procesan como SHA-256. Un registro PASS sin evidencia, un archivo faltante o modificado, una ruta insegura o un enlace simbólico impiden la verificación. Los archivos faltantes no equivalen a registros exitosos vacíos. Las comprobaciones SHA/run/attempt existentes siguen siendo independientes: los bytes coincidentes no pueden rescatar un recibo obsoleto. La integridad del archivo no es una prueba de autenticidad de ejecución ni de promoción de artefactos.

### DAST consume la compilación CI verificada

El trabajo `dast-smoke` CI requerido llama `.github/workflows/dast-smoke.yml` después de `build`. Sigue la misma selección code/draft que la compilación, incluida la bifurcación compatible PRs, PRs de destino de lanzamiento y los grupos de fusión. Un trabajo DAST faltante, fallido, cancelado o omitido inesperadamente bloquea `Gate / CI`. El flujo de trabajo reutilizable no tiene un disparador PR/dispatch independiente; La validación manual utiliza el envío de CI para que la compilación y el consumidor permanezcan en una sola ejecución.

`scripts/ci/next-build-provenance.mjs` sella el artefacto Next completo con su resumen tar, repository/event/run, intento de productor, head/base/checkout/tree, identidades de flujo de trabajo, archivo de bloqueo, Nodo exacto version/ABI, plataforma y paquete. DAST selecciona el artefacto inmutable ID de `needs.build.outputs`, requiere la verificación del resumen de descarga y compara de forma independiente el ZIP con el resumen del productor antes de extraer sus dos miembros incluidos en la lista permitida a través de `scripts/ci/unpack-ci-build.py`. El archivo manifiesto y tar también deben coincidir con los resultados del productor independiente antes de que se extraiga el árbol Siguiente. Nunca busca la última compilación de sucursal exitosa. Una repetición parcial puede reutilizar el mismo intento del productor cuando su ID y todas las entradas aún coinciden; el recibo registra ambos intentos.

El consumidor permanece en un ejecutor Linux alojado con permiso de repositorio de solo lectura y sin secretos de repositorio. Instala la versión exacta de Node del productor y luego ensambla el CLI con `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rechaza un servidor independiente faltante antes de cualquier compilación alternativa; Las compilaciones locales normales CLI conservan su respaldo existente. La preparación del servidor, Schemathesis y Promptfoo deben tener éxito dentro del límite de trabajo de 25 minutos sin cambios. Un recibo de procedencia demuestra la identidad y los bytes de entrada, no un escaneo DAST exitoso. La caducidad del artefacto, la interrupción del corredor o un escáner fallido siguen siendo pruebas incompletas o fallidas; no puede convertirse en PASS mediante un envoltorio de asesoramiento.

### Capacidad de ejecución UI

CI ejecuta el inventario UI completo como cuatro fragmentos de matriz `test-vitest`, cada uno con un máximo de dos trabajadores por fragmento y el plazo de trabajo existente de 15 minutos. El primer fragmento también ejecuta la suite MCP/autoCombo Vitest. El resultado del trabajo requerido cubre cada tramo de la matriz; el fracaso o la cancelación de un fragmento no puede establecer la admisión del candidato.

El observador nocturno conserva un recibo de candidato exacto separado para cada fragmento UI, incluida la ejecución MCP en el primer recibo. Se requieren los cuatro recibos, registros e identidades de ejecución coincidentes. `npm run test:vitest:ui` local todavía selecciona la suite completa; una ejecución `--shard` es sólo una prueba parcial.

### Colección de cobertura unitaria

Los doce fragmentos de unidades recopilan cobertura V8 durante la ejecución de la prueba existente. Un fragmento exitoso ejecuta `scripts/ci/compact-v8-coverage.mjs` para comprimir los archivos originales sin generar un informe intermedio de Estambul. El trabajo de Cobertura final verifica los doce manifiestos con el SHA candidato, el tiempo de ejecución, la raíz de origen y los hashes de datos, luego ejecuta los reporteros de c8 y los umbrales de cobertura existentes. Las entradas conservan el orden global de los nombres de archivos de c8; La fusión previa por fragmento no es segura para la cobertura function/block mixta. Los fragmentos faltantes, con formato incorrecto o incompatibles no se admiten. Los fragmentos de prueba fallidos conservan la cobertura de diagnóstico sin procesar por separado; no puede entrar en la fusión final.

### Recibos de avance de ejecución de la unidad

El comando `test:unit:ci:shard` compartido registra las fases `primary`, `dashboard` y `serial` a través de `scripts/ci/unit-progress-reporter.mjs`. El informe de prueba normal sigue estando disponible. Un recibo separado de solo metadatos registra el inicio y la finalización de cada archivo, y un latido de 30 segundos enumera los archivos que aún están activos y su tiempo transcurrido. Registra únicamente metadatos de ejecución incluidos en la lista permitida; Las descripciones de las pruebas, los resultados, los cuerpos de error y el entorno completo no están serializados.

CI conserva los archivos JSONL como `unit-progress-ci-<run>-<attempt>-<shard>`. Un tiempo de espera del trabajo puede impedir la carga posterior; los latidos del corazón ya emitidos siguen siendo una prueba diagnóstica. Los latidos faltantes también pueden reflejar un proceso de ejecución bloqueado o finalizado. Estos recibos preservan la selección de pruebas, la simultaneidad, los plazos y el estado de salida existentes; no son veredictos de admisión de candidatos.

### Fusionar cola

La etiqueta `queue` envía un PR a la cola Mergify (`.mergify.yml`). Mergify abre un borrador PR en una rama `mergify/merge-queue/`, CI ejecuta la selección completa allí y el PR original se fusiona cuando pasan `Gate / CI`, `Gate / Quality` y `Merge integrity (changelog + generated skills)`.

Mergify escribe el resumen de su cola en la descripción del borrador. Los eventos Body/title-only `pull_request` `edited` utilizan un grupo de concurrencia específico de ejecución y no vuelven a ejecutar la clasificación, las matrices de prueba, la integridad de fusión ni el veredicto de admisión. Los nombres de cheques de solo observación no pueden reemplazar `Gate / CI` o `Gate / Quality`. Una edición que cambia la base objetivo solicita una nueva validación de candidato.

Después de una retirada de la cola, una inserción no siempre vuelve a poner en cola el PR. Comenta `@mergifyio queue` al respecto.

### Inventario de escaneo estático

El inventario versionado de npm-alias y la membresía de escaneo estático se encuentran en `config/quality/gate-manifest.json`. Ejecute `npm run check:gate-manifest` para validar nombres de scripts y comandos exactos contra `package.json`; Las adiciones, eliminaciones y derivaciones de comandos fallan tanto en el enlace local como en los trabajos de clasificación de cambios en CI. Un alias no es un trabajo de flujo de trabajo, una instancia de matriz o un caso de prueba: estos recuentos no deben presentarse como intercambiables.

Utilice `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list` para inspeccionar los alias seleccionados sin ejecutarlos. El ejecutor invoca el punto de entrada npm, por lo que se conserva su tiempo de ejecución (incluido Bun cuando esté configurado). El manifiesto registra alias fuera de esos perfiles como invocados por separado, y los comandos de mantenimiento están prohibidos en perfiles de análisis de solo lectura.

Estos perfiles cubren únicamente el escaneo estático. No certifican pruebas de producto, cobertura, embalaje, controles externos ni la aceptación total de la liberación de un candidato. La admisión del flujo de trabajo utiliza `config/quality/admission-policy.json` y `scripts/quality/admission-verdict.mjs` vinculados. Los perfiles de observadores de liberaciones permanecen separados; inspeccionar sus cheques y recibos aplicables de forma independiente. Los comandos estáticos completos del observador se declaran en `config/quality/release-green-static-profile.json`, incluido `audit:deps`, selección de prueba de mutación y comprobaciones de traducción. El cargador valida los comandos npm contra package.json y declaraciones CI/Quality modeladas; rechaza la deriva en lugar de ejecutar tokens de shell como argumentos. La salida SKIP/INCOMPLETE del escáner requerida no puede establecer PASS. El perfil registra sus exclusiones externas y no reemplaza la cobertura alojada, las matrices de prueba, el paquete ni la evidencia de implementación. El inventario en prosa que aparece a continuación es una referencia, no una prueba de que realmente existiera una puerta.

Los scripts viven bajo `scripts/check/` (puertas de políticas) y `scripts/quality/` (motor de trinquete). La fuente de verdad de CI es `.github/workflows/ci.yml`.

### Estado de la documentación base publicada

`.github/workflows/i18n-base-health.yml` observa el estado de la documentación después de envíos seleccionados a `main` y `release/v*`, y en el envío manual. Sus filtros cubren documentación, Markdown raíz, `llm.txt`, traducción state/configuration y las herramientas i18n relevantes. El trabajo único `Published base documentation health` utiliza Ubuntu alojado y un plazo de cinco minutos. Realiza una validación de solo lectura y escribe un recibo de diagnóstico sin instalación de dependencia, traducción o adopción de estado.

`scripts/i18n/check-base-health.mjs` no requiere inconsistencias de hash de origen, de destino faltante, de hash de destino, de traducción obsoleta y de caché de sección. También valida el alcance central actual document/locale y su procedencia registrada. Un contexto no válido, una cobertura incompleta o un verificador interrumpido producen `INCOMPLETE`; La deriva confirmada produce `FAIL`. Ambos devuelven un estado de salida fallido. El recibo está obligado a verificar SHA, flujo de trabajo, ejecución e intento, y se conserva como `i18n-base-health-<sha>-<run>-<attempt>`.

Esta es una observación independiente de la base publicada. No agrega un evento PR o de grupo de fusión, una verificación PR requerida, un alias npm o un miembro de perfil de escaneo estático. El verificador subyacente también bloquea las cinco clases en modo absoluto. La preparación ordinaria PR sigue siendo independiente de la admisión. Una carga exitosa no puede convertir un resultado de salud fallido en PASS.

Un PR ordinario utiliza `--preflight` con un informe base generado por `--baseline-evidence`. Puede dejar pendiente una fuente en inglés solo cuando el registro de traducción completo y los bytes de destino reales no cambian desde esa base exacta. Las nuevas inconsistencias de destino o caché de sección aún se bloquean y la evidencia incompleta no puede autorizar la preparación. El informe expone `preparationPending` y `mergeReady` por separado: una preparación exitosa no hace que las traducciones pendientes estén listas para fusionarse. Actualizar los espejos afectados en el candidato compuesto antes de la admisión. El candidato confiable de cola Mergify, `merge_group`, los push de rama y las ejecuciones manuales CI utilizan el verificador absoluto, sin `--warn` ni perdón de fallas heredadas. Los hashes de destino faltantes y un alcance reducido por archivos centrales grabados eliminados no pueden producir un veredicto absoluto exitoso.

### Liberar la ruta rápida PR (`quality.yml`)

`.github/workflows/quality.yml` complementa CI en main/release PRs, empuja a `main`, envía y fusiona grupos. PRs utiliza comprobaciones rápidas filtradas por ruta. Se eliminó la compilación duplicada permanentemente deshabilitada; los controles build/package/boot reales permanecen en CI. El conjunto de unidades y vitest se ejecutan solo en CI (`Unit Tests (N/12)` y `Vitest`).

| Trabajo                                          | Alcance                                                                                                                                                                                                                                                                         | Bloqueo                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Referencias de documentos API y documentos-todos                                                                                                                                                                                                                 | Sí                       |
| `Fast Quality Gates`                             | Código PRs; comprobaciones estáticas, verificación de tipo, verificación de tipo del tablero, pruebas unitarias impactadas                                                                                                                                                      | Sí                       |
| `Forgotten sibling tests`                        | Código PRs; módulos modificados rastreados hasta consumidores estáticos y pruebas de hermanos candidatos; Las rutas de importación dinámica y de barril se informan como diagnósticos de asesoramiento, con excepciones de la lista de permitidos a las que se hace referencia. | **Consultivo**           |
| `No new ESLint warnings`                         | Código PRs; protector de pelusa consciente de supresiones                                                                                                                                                                                                                       | Si, incluyendo tenedores |
| `Merge integrity (changelog + generated skills)` | PRs sin borrador; registro de cambios y sincronización de habilidades generadas                                                                                                                                                                                                 | Si, incluyendo tenedores |

#### Informe de pruebas de hermanos olvidados

`npm run check:forgotten-sibling-tests` se ejecuta como un paso de asesoramiento de `Fast Quality Gates` y reutiliza el solucionador de importación detrás del mapa de impacto de prueba. Para cada módulo de producción modificado, informa cadenas `changed module/symbol -> static consumer -> candidate sibling test` deterministas cuando la prueba candidata está ausente de la diferencia de solicitud de extracción. El resumen de Markdown y el resultado JSON se conservan como artefacto del flujo de trabajo `forgotten-sibling-tests` para la calibración antes de cualquier implementación de bloqueo.

Las reexportaciones de barriles y las importaciones dinámicas son únicamente diagnósticos de resolución; nunca crean un hallazgo de bloqueo. Las excepciones revisadas se encuentran en `config/quality/forgotten-sibling-allowlist.json`. Cada entrada debe nombrar la prueba del consumidor y del candidato, dar una justificación específica y vincular un problema GitHub o una solicitud de extracción. Las entradas con formato incorrecto no se cierran. Las excepciones no pueden suprimir una prueba candidata eliminada o una diferencia que agrega `.skip`/`.todo`; El debilitamiento de las afirmaciones y otros enmascaramientos siguen siendo propiedad de la puerta `check:test-masking` que bloquea de forma independiente.

### Trabajo: `lint`

Se ejecuta en todos PR a `main`. Los bloques se fusionan en caso de falla.

| Guión (`npm run ...`)             | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bloqueo                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | La versión Node.js está dentro del rango admitido                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sí                                         |
| `check:cycles`                    | Importaciones circulares en todo `src/` + `open-sse/` (basado en AST, tsconfig `paths` resuelto). Bare sale de 1 cada vez que existe algún ciclo (cerrado por falla desde #15281) y enumera el SCCs. `check:cycles:ratchet` (lo que ejecuta CI ) se bloquea cuando el conteo excede el límite máximo `metrics.cycles` en `quality-baseline.json` — actualmente es 14, `direction: down`, por lo que solo puede caer (#15159 G-01/G-02).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí (trinquete)                             |
| `check:boundary`                  | Acoplamiento `open-sse → src` : importaciones únicas de archivo a archivo desde el motor a la aplicación (`scripts/quality/measure-boundary.mjs`; la lista de bordes es el trabajo pendiente de remediación core/module-split v4). Informe de asesoramiento = desnudo (igual que `quality:boundary`). `check:boundary:ratchet` (lo que ejecuta CI, también en el bucle de trinquete de puertas rápidas `quality.yml` ) se bloquea cuando el recuento excede el límite máximo `metrics.boundaryOpenSseToSrc` en `quality-baseline.json` — sembrado en el 771 medido, `direction: down`; `--update` sólo lo reduce; relativo a la base en PRs (`--base-ref`, ver más abajo)                                                                                                                                                                                                                                                                                                                                                                                                      | Sí (trinquete)                             |
| `check:route-validation:t06`      | Esquemas Zod presentes en todas las rutas (política de nivel 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                         |
| `check:any-budget:t11`            | El recuento `@ts-expect-error // any` no supera el presupuesto (cateraca de nivel 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                         |
| `check:provider-consistency`      | Cada proveedor en `providers.ts` tiene una entrada coincidente en `providerRegistry.ts` (y viceversa, dentro de la lista de permitidos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí                                         |
| `check:model-lifecycle`           | Las tres tablas de enrutamiento mantenidas manualmente se mantienen consistentes con la instantánea del ciclo de vida registrada (#11503): `FITNESS_TABLE` (`taskFitness.ts`) no obtiene ninguna identificación retirada que `REGISTRY` pueda enrutar; cada objetivo `BUILT_IN_ALIASES` está presente en `REGISTRY` y ausente en la instantánea de identificación retirada; cada identificación retirada que aún esté en `REGISTRY` se reenvía o se enumera en `allowedRetiredInCatalog`; y ninguna fuente o destino `DEFAULT_DEGRADATION_MAP` aparece retirado en esa instantánea. Esto no prueba que un modelo esté actualmente atendido por un canal ascendente en vivo. — sin conexión se compara con `config/quality/model-lifecycle.json`, actualizado manualmente con `npm run quality:refresh-model-lifecycle` (red; no conectado a CI). `allowedRetiredInCatalog` es un trinquete quemado: agregue una entrada solo con un problema de seguimiento.                                                                                                                   | Sí                                         |
| `check:fetch-targets`             | Cada `fetch("/api/...")` en `src/` del lado del cliente se resuelve en un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                         |
| `check:deps`                      | Todos los departamentos `npm install` -able en cada `package.json` del repositorio están en `dependency-allowlist.json`; nuevos paquetes no fijados o en cuclillas marcados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sí                                         |
| `audit:deps`                      | Auditoría npm de los cinco archivos de bloqueo independientes (raíz, Electron, complementos OpenCode, v1/v2 y proveedor). Bloque de avisos críticos; Los avisos altos siguen siendo advertencias visibles. Las auditorías Missing/failed son INCOMPLETE y de bloque; Se conservan los informes y los hashes de bloqueo por ámbito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sí                                         |
| `check:lockfile`                  | Integridad `package-lock.json` Registro https —, hashes de integridad, sin anulaciones de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                         |
| `check:licenses`                  | Lista de licencias permitidas SPDX para dependencias de producción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sí                                         |
| `check:tracked-artifacts`         | Sin artefactos de compilación/enlaces simbólicos `node_modules` comprometidos (también se ejecuta en precompromiso ronco; el pre-push es intencionalmente ligero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                         |
| `check:ai-attribution`            | No hay tráiler AI/bot `Co-Authored-By` ni pie de página de generación de IA en confirmaciones, título o cuerpo PR — Hard Rule #16 (en el bucle de puertas rápidas `quality.yml` para PR→ `release/**` — lee la carga útil del evento, PRs — sin operación y un paso de solo PR en `ci.yml` lint para PR→ `main`; también el gancho fornido `commit-msg` ; se permiten coautores humanos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | Cada exclusión Vitest identifica un problema de seguimiento y aparece en `config/quality/vitest-exclusions.json` (#13204).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sí                                         |
| `check:file-size`                 | Los archivos fuente (`.ts`/`.tsx` en `src/`, `open-sse/`, `electron/`, `bin/`) permanecen dentro de `cap` y los archivos de prueba (`*.test.ts(x)`) dentro de `testCap`; Los archivos congelados en `file-size-baseline.json` (`frozen` / `testFrozen`) no deben superar su tamaño registrado.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                         |
| `check:error-helper`              | Las respuestas de error en executors/handlers utilizan `buildErrorBody()` / `sanitizeErrorMessage()` (Regla estricta #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                         |
| `check:migration-numbering`       | Los archivos de migración SQL están numerados secuencialmente, sin espacios ni duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                         |
| `check:public-creds`              | No hay claves web literales OAuth `client_id`/`client_secret` o Firebase fuera de `publicCreds.ts` (regla estricta #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí                                         |
| `check:db-rules`                  | No hay SQL sin procesar fuera de los módulos `src/lib/db/` ; no se importan barriles de `localDb.ts` (Reglas estrictas #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sí                                         |
| `check:known-symbols`             | Los ejecutores de proveedores, las estrategias de enrutamiento y los traductores registrados en sus tablas de despacho coinciden con los archivos en el disco — sin símbolos huérfanos o no declarados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí                                         |
| `check:route-guard-membership`    | Cada ruta que genera un proceso hijo está clasificada por `isLocalOnlyPath()` (Reglas estrictas #15/#17).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                         |
| `check:test-discovery`            | Cada archivo `*.test.ts` / `*.spec.ts` en el repositorio es recopilado por al menos un ejecutor de pruebas (trinquete: la lista de huérfanos en `test-discovery-baseline.json` solo se puede reducir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                         |
| `check:test-tla-order`            | Ningún archivo `node:test` bajo `tests/unit` registra una prueba, alcanza un `await` de nivel superior y luego registra más (#18045; trinquete: `test-tla-order-allowlist.json` solo puede reducirse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                         |
| `check:agent-skills-sync`         | Los artefactos de habilidades de agentes generados coinciden con su catálogo de origen (sin deriva)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | El proveedor logos/assets lleva una entrada de procedencia registrada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | Los archivos de configuración JSON analizan y satisfacen las reglas de repositorio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | Compilación TypeScript sin errores (solo advertencias)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sí                                         |
| `typecheck:noimplicit:core`       | Estricto `noImplicitAny` — con visión de futuro; Muchos sitios de llamadas preexistentes todavía necesitan anotaciones.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` con ámbito de `src/app/(dashboard)/**` (#7033) — La lista de permitidos seleccionada de 27 archivos de `typecheck:core` no incluye ningún panel TSX, y `next build` tampoco lo verifica nunca (`next.config.mjs` establece `ignoreBuildErrors: true`), por lo que las regresiones de identificadores huérfanos allí (#6625/#6909) eran invisibles para CI. Diferencias con una línea base de recuento per-file/per-TS-code congelada (`config/quality/dashboard-typecheck-baseline.json`, el mismo patrón de aplicación obsoleta que `check:known-symbols`) Solo — Los errores NEW más allá del recuento de referencia fallan en la puerta; disminuya con `--update` cuando se solucione un error preexistente.                                                                                                                                                                                                                                                                                                                                                          | Sí                                         |
| `check:build-typecheck`           | Verificación del tipo de producción de toda la aplicación sobre `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), la superficie que la lista de permitidos de 27 archivos de `typecheck:core` y la puerta del tablero no cubren. Diferencias contra `config/quality/build-typecheck-baseline.json`; un recuento por (archivo, código) nuevo o elevado falla, un recuento más bajo le solicita que aumente. `--update` se niega mientras la ejecución contiene un par nuevo o elevado a menos que se pase `--force-regressions`, y rechaza un archivo recién silenciado a menos que se pase `--force-nocheck`, por lo que ampliar la línea de base para volverse verde y otorgar un silencio permanente son dos actos deliberados separados. Se rechaza un `--force` simple. También analiza el alcance de la compilación en busca de `@ts-nocheck` frente a `config/quality/ts-nocheck-baseline.json`, porque un archivo que lo utiliza no informa ningún diagnóstico y, de lo contrario, sería invisible para todas las puertas. | Sí                                         |

#### Dos programas de verificación de tipos responden de manera diferente

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) y `check:build-typecheck` compilan diferentes programas con diferentes opciones, y el mismo archivo puede estar limpio en uno y lleno de errores en el otro.

`tsconfig.build.json` configura `"strict": false`, por lo que `noImplicitAny` está desactivado. La configuración principal compila una lista de permitidos seleccionada de 27 archivos con opciones más estrictas y sigue el gráfico de importación de cada entrada, por lo que los archivos que nunca aparecen en el programa de compilación aún se verifican allí.

La consecuencia es importante al juzgar si se escribe un archivo:**diagnóstico cero según `check:build-typecheck` no significa cero** . Al eliminar `@ts-nocheck` de 26 archivos, 23 de ellos estaban limpios en el programa de compilación; dieciséis de ellos arrojaron alrededor de 120 errores implícitos (cualquiera en el estricto). Verifique ambos antes de limpiar un archivo.

### Trabajo: `quality-gate`

Corre detrás de `test-coverage`. Los bloques se fusionan en caso de falla.

| Guion                        | Valida                                                                                                                                                             | Bloqueo                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (recuento de advertencias ESLint, cobertura del informe de fragmentos fusionados)                                                     | Sí (aguas arriba del trinquete) |
| `quality:ratchet`            | Cada métrica en `quality-baseline.json` no ha retrocedido (ESLint advertencias línea base ≤ ; cobertura línea base ≥ )                                             | Sí                              |
| `check:duplication`          | La duplicación de código (jscpd@4) no excede la línea base en `quality-baseline.json`                                                                              | Sí                              |
| `check:complexity`           | La complejidad ciclomática a nivel de archivo no excede el límite (núcleo ESLint `complexity` + `max-lines-per-function`)                                          | Sí                              |
| `check:cognitive-complexity` | Trinquete de complejidad cognitiva (`eslint-plugin-sonarjs`) — pase ESLint separado; Las ejecuciones CI se fusionan como un único paso `check:complexity-ratchets` | Sí                              |
| `check:dead-code`            | Las exportaciones/archivos no utilizados con trinquete (knip) no retroceden respecto de la línea de base                                                           | Sí                              |
| `check:compression-budget`   | Los pisos de ahorro de tokens por motor — del presupuesto de referencia de compresión no deben retroceder                                                          | Sí                              |
| `check:type-coverage`        | El trinquete de porcentaje (`type-coverage`) no retrocede; subsume en gran medida `typecheck:noimplicit:core`                                                      | Sí                              |

### Trabajos: `codeql-scan` y `codeql-admission`

`codeql-scan` produce todas las categorías de análisis configuradas. Una vez que el trabajo se realiza correctamente, `codeql-admission` valida sus cargas exactas y el trinquete de alerta del candidato. Ambas son dependencias requeridas de `Gate / CI`, incluidos los candidatos de solo documentos. Los requisitos canary y de activación administrativa se describen en "Trinquete CodeQL " a continuación.

| Guion                  | Valida                                                                                                                                                                                                                                     | Bloqueo |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `check:codeql-ratchet` | ref/SHA candidato y todas las categorías de análisis configuradas deben estar actualizadas antes del trinquete de alerta; bloques de evidencia faltantes. El inventario global permanece separado — ver "Trinquete CodeQL " a continuación | Sí      |

### Trabajo: `quality-extended`

El trabajo bloquea a los candidatos aplicables. El tamaño del paquete, los hallazgos secretos, los hallazgos de vulnerabilidades, los hallazgos del flujo de trabajo y los cambios OpenAPI se verifican con los trinquetes necesarios. Los diagnósticos de dependencia circular siguen siendo consultivos. Se requiere la instalación del escáner: `scripts/ci/install-quality-scanners.sh` aprovisiona versiones fijadas y propaga fallas de instalación. Las herramientas faltantes, los informes no válidos o las líneas base faltantes dejan la puerta del escáner requerida INCOMPLETE.

| Guion                    | Valida                                                                                                                                                                                                                                               | Bloqueo                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Sin dependencias circulares (dpdm)                                                                                                                                                                                                                   | **Consultivo**                                           |
| `check:bundle-size`      | El tamaño del paquete no excede el límite; falla una medición no disponible                                                                                                                                                                          | **Bloqueo con --ratchet**                                |
| `check:secrets`          | Los hallazgos de Gitleaks no retroceden; Los análisis requeridos rechazan tools/source/baseline faltante, análisis fallidos e informes no válidos.                                                                                                   | **Bloqueo con --ratchet**                                |
| `check:vuln-ratchet`     | Las vulnerabilidades de dependencia no retroceden; Los análisis requeridos rechazan herramientas faltantes, informes no válidos o líneas de base faltantes.                                                                                          | **Bloqueo con --ratchet**                                |
| `check:workflows`        | Pelusa del flujo de trabajo (actionlint + zizmor); Los escáneres missing/broken, los informes no válidos o la falta de línea base de trinquete fallan como INCOMPLETE. Los hallazgos válidos siguen la política strict/advisory/ratchet seleccionada | Se requiere ejecución; bloqueo de trinquete zizmor en CI |
| `check:openapi-breaking` | Contrato público API contra confirmaciones de eventos fijados (base de fusión PR, push before, base de grupo de fusión; primer padre de pago de scheduled/manual ); la medición requerida falla cerrada                                              | **Bloqueo con --ratchet**                                |

### Trabajo: `docs-sync-strict`

Para solicitudes de extracción a `main` o `release/**`, este trabajo se ejecuta solo para candidatos que no son borradores (o colas confiables) clasificados como documentación o cambios de código. También se ejecuta en eventos CI que no son de PR; El disparador de este flujo de trabajo cubre solo `main`, no `release/**`. Un paso que sale de un valor distinto de cero bloquea el trabajo; los hallazgos que se reportan únicamente y las exenciones documentadas a continuación no lo hacen.

| Guion                          | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bloqueo                                                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Metapuerta que ejecuta las 7 subpuertas siguientes de forma secuencial                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sí                                                                                                                                                |
| ↳ `check:docs-sync`            | Coherencia de la versión Package/OpenAPI/CHANGELOG, réplicas exactas `llm.txt`, invariantes CHANGELOG section/size traducidas y ausencia de documentos duplicados reemplazados                                                                                                                                                                                                                                                                                                                            | Sí                                                                                                                                                |
| ↳ `check:docs-frontmatter`     | Las páginas de documentación compilada llevan títulos válidos.                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sí                                                                                                                                                |
| ↳ `check:docs-counts`          | Los invariantes de recuento de alta confianza son estrictos; Las comprobaciones heurísticas de recuento de archivos solo advierten a menos que el script reciba `--strict` (la metapuerta CI no lo pasa)                                                                                                                                                                                                                                                                                                  | Bloqueo de niveles estricto; aviso de nivel suave                                                                                                 |
| ↳ `check:env-doc-sync`         | Las lecturas de entorno de origen, `.env.example` y `docs/reference/ENVIRONMENT.md` coinciden después de las listas de permitidos explícitas de ignorar, solo documentos y solo env                                                                                                                                                                                                                                                                                                                       | Sí, fuera de las listas permitidas documentadas                                                                                                   |
| ↳ `check:deprecated-versions`  | Informa sobre posibles versiones obsoletas fuera de contextos históricos seguros y fechas de actualización obsoletas, excluyendo los documentos ignorados.                                                                                                                                                                                                                                                                                                                                                | Asesoramiento en cableado CI vigente (no se pasa `--strict` )                                                                                     |
| ↳ `check:doc-links`            | Los enlaces de rebajas internos en los documentos se resuelven en archivos reales (formulario `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                         | Sí                                                                                                                                                |
| ↳ `check:fabricated-docs`      | Las rutas, las variables de entorno, los comandos CLI, los nombres de los enlaces y las rutas de los archivos citados en los documentos existen en el código base. Puerta dura vía `--strict`; fallo suave sin bandera.                                                                                                                                                                                                                                                                                   | Sí (a través de `--strict` en CI)                                                                                                                 |
| `check:cli-i18n`               | Las claves CLI `t()` utilizadas existen en `en`; `pt-BR` conserva todas las secciones de nivel superior; `zh-CN` y `zh-TW` contienen todas las claves de `en`                                                                                                                                                                                                                                                                                                                                             | Sí                                                                                                                                                |
| `check:openapi-coverage`       | La especificación OpenAPI cubre al menos un piso de rutas reales                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                                                                                                                                |
| `check:openapi-security-tiers` | Las anotaciones `x-loopback-only`/`x-always-protected` declaradas deben estar respaldadas por `routeGuard.ts`; analizador y reenviar bloques de discrepancias. La verificación inversa de `x-loopback-only` faltante bajo prefijos solo locales advierte y las rutas de solo patrón se excluyen de esa pasada inversa.                                                                                                                                                                                    | Bloqueo de cheques Parser/forward ; aviso de verificación inversa                                                                                 |
| `check:openapi-routes`         | Cada ruta `/api...` en `openapi.yaml` se resuelve de manera insensible a los parámetros en una ruta real después de la lista de permitidos `KNOWN_STALE_SPEC` justificada; Las entradas obsoletas de la lista de permitidos también fallan                                                                                                                                                                                                                                                                | Sí                                                                                                                                                |
| `check:docs-symbols`           | Las referencias internas `/api/...` URL en documentos canónicos que no son espejo se resuelven en una ruta o familia de rutas real; Se excluyen las referencias proxy/upstream/placeholder/file y las entradas `KNOWN_STALE_DOC_REFS` justificadas, y las entradas obsoletas de la lista de permitidos fallan                                                                                                                                                                                             | Sí                                                                                                                                                |
| `i18n translation drift`       | La admisión absoluta requiere inconsistencias de fuente cero, destino faltante, hash de destino, traducción obsoleta y caché de sección. La preparación ordinaria PR puede conservar evidencia heredada exacta o un cambio pendiente solo en inglés con el estado completo sin cambios y los bytes de destino; su informe declara por separado que está preparado para la fusión. Faltan hashes de destino y bloque de evidencia base incompleto. Una caché de sección heredada ausente no es un fracaso. | Las cinco clases bloquean la admisión queue/base ; permisos de preparación ordinaria solo trabajos pendientes heredados comprobados o solo inglés |

Se generan los doce README SVGs bajo `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` los regenera todos). Cada uno tiene una prueba unitaria de comparación de bytes (`tests/unit/docs/readme-*-svg.test.ts`, trabajo `test-unit`) que falla cuando el archivo confirmado está obsoleto, y `check:docs-counts` lee números canónicos de sus nodos `<text>` —, razón por la cual el paso de esquema mantiene cada cadena delineada en el archivo como `<text>` invisible. La verificación de números canónicos SVG lee los archivos enumerados en `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, además de `public/images/tier-flow-dark.svg` y `tier-flow-light.svg`; las afirmaciones de factores de puntuación, entrada de catálogo, grupo recurrente y gratuito para siempre también dicen `promise-pillars.svg`, `free-tier-budget.svg` y `strategies-grid.svg`. `free-tier-budget.svg` extrae sus figuras del cargador de catálogo en vivo, por lo que un cambio a `FREE_MODEL_BUDGETS` o al nombre para mostrar de un proveedor muestra CI en rojo hasta que se regenera ese archivo.

### Trabajo: `i18n-ui-coverage`

| Guion                               | Valida                                                                                                                                                                                                                              | Bloqueo     |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (en línea) | La cobertura de clave UI i18n es ≥ 65%                                                                                                                                                                                              | Sí          |
| `check-ui-value-drift` (en línea)   | Un inglés reescrito **valor** no deja ninguna traducción obsoleta                                                                                                                                                                   | Sí          |
| `check-new-key-coverage` (en línea) | A **nuevo** La clave en inglés se traduce en cada configuración regional. — se rechaza un marcador `__MISSING__:`                                                                                                                   | Sí          |
| `check-translation-ratio`           | La proporción de traducción real por configuración regional (idéntica al inglés/marcador de posición/hojas faltantes fuera de la lista de permitidos) no debe exceder la holgura `config/quality/i18n-translation-baseline.json` +. | **Bloqueo** |

Necesita `fetch-depth: 0` — la puerta de deriva de valor diferencia `en.json` de la base de fusión.

#### Puerta de traducción obsoleta `check-ui-value-drift` —

Capta la regresión i18n que las otras puertas estructuralmente no pueden ver: se reescribe un valor en inglés y las traducciones derivadas del inglés _anterior_ se quedan atrás, por lo que los usuarios que no hablan inglés siguen leyendo una copia redactada con confianza y ahora incorrecta.

Esto se envió de verdad. `oauthModal.googleOAuthWarning` se reescribió cuando llegó el asistente de inicio de sesión Antigravity (#5203);**39 de 43 locales** mantuvo el texto que decía a los operadores que "copiaran el URL completo y lo pegaran debajo" — un flujo que no se puede completar para ese proveedor. Pasó desapercibido hasta #8463 porque:

- `sync-ui-keys` solo repone las claves que son **ausente** , nunca los que son **duro** ;
- `check-ui-keys-coverage` cuenta la _presencia_ clave, por lo que una traducción obsoleta se considera cubierta;
- `check-translation-drift` rastrea la documentación `docs/i18n/<locale>/**.md`, refleja — nunca lee `src/i18n/messages/*.json`. Bloqueo en el trabajo `docs-sync-strict` desde la resincronización 2026-09: edite un documento principal → `npm run i18n:run -- --files=<doc>` (a nivel de sección, barato).

**Consciente de las diferencias, no respaldado por la línea de base.** Compara `en.json` en la base de fusión con el árbol de trabajo; por cada clave cuyo valor en inglés cambió, cualquier configuración regional que aún tenga una traducción intacta está obsoleta. Esto deliberadamente **congela la deuda preexistente** — a diff no puede revelar de qué inglés antiguo proviene una traducción de larga data, por lo que la puerta juzga solo lo que toca el cambio actual. La alternativa (una línea de base de hash por clave) costaría un archivo generado ~ de 600 KB, 3 × la línea de base más grande existente, que se agita en cada PR i18n.

Dos formas de satisfacerlo:

1. actualizar las traducciones afectadas, o
2. configúrelos en `__MISSING__:<new english>` — el tiempo de ejecución luego entrega el inglés corregido (`src/i18n/request.ts::deepMergeFallback`, #7258) y las colas de claves para la traducción.

Si la cuerda es **significado** cambiado, prefiero **cambiar el nombre de la clave** : una nueva clave no puede heredar una traducción obsoleta. Ese es el patrón que utilizó #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Las puertas de deriva de valor y clave nueva comparten una comparación inmutable de `scripts/i18n/resolve-ui-diff-base.mjs`. El flujo de trabajo pasa el mismo SHAs base, punta base y candidato a ambas comprobaciones. Las ejecuciones PR/base-retarget, push y merge-group utilizan su contexto de evento. El envío de una rama candidata requiere su PR abierto exacto o la entrada `i18n_base_sha` explícita. El envío u observación programada de `main` o `release/vX.Y.Z` sin esa entrada compara la última confirmación con su primer padre; no es una auditoría de toda la deuda de traducción heredada. La invocación local requiere una base de comparación explícita, por ejemplo el comando `BASE_REF` anterior.

Un contexto de comparación faltante o ambiguo, un catálogo requerido ilegible o no válido y un candidato modificado generan `INCOMPLETE` con código de salida **2** , incluso en modo de advertencia. El catálogo lee el uso `scripts/i18n/read-ui-catalog.mjs`; los errores de lectura no se sustituyen por objetos vacíos. Ni una base no disponible ni una entrada incompleta establecen PASS.

### Trabajo: `i18n`

Matriz de validación i18n completa (un trabajo por ubicación). Todo el trabajo es de asesoramiento.

| Guion                           | Valida                                                 | Bloqueo                                                       |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| `validate_translation.py quick` | Integridad de la traducción por configuración regional | **Consultivo** (`continue-on-error: true` en todo el trabajo) |

### Trabajo: `pr-test-policy`

Solo se ejecuta en solicitudes de extracción.

| Guion                  | Valida                                                                                                                                  | Bloqueo |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs que cambian el código de producción en `src/`, `open-sse/`, `electron/` o `bin/` deben incluir o actualizar pruebas (Regla dura #8) | Sí      |
| `check:test-masking`   | Los archivos de prueba modificados no reducen el recuento de afirmaciones netas ni agregan tautologías `assert.ok(true)`                | Sí      |
| `check:pr-evidence`    | El organismo PR cita evidencia test/VPS para el cambio (mecaniza Hard Rule #18 al grepping PR prosa — frágil, ver Backlog)              | Sí      |

### Trabajo: `test-vitest`

Necesita el trabajo de clasificación `changes`. Los fragmentos de matriz aplicables bloquean la fusión en caso de falla.

| Suite            | Valida                                                            | Bloqueo                                                                                                                        |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Servidor MCP (110 herramientas), autoCombo, caché — vitest runner | Sí                                                                                                                             |
| `test:vitest:ui` | Componente UI prueba el corredor vitest —                         | **Bloqueo** Las fallas preexistentes — están explícitamente excluidas en `vitest.config.ts`; nuevos fracasos fallan el trabajo |

### Flujos de trabajo nocturnos (programados, de asesoramiento)

Estos se ejecutan según una programación cron (y `workflow_dispatch`), nunca según PRs. Todos son de asesoramiento.

| Flujo de trabajo       | Valida                                                                                                                                                                       | Bloqueo        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | pruebas de propiedad de verificación rápida con un recuento alto de ejecución + de semillas aleatorias                                                                       | **Consultivo** |
| `nightly-resilience`   | puerta de crecimiento del montón, inyección de fallas del caos, k6 load/soak                                                                                                 | **Consultivo** |
| `nightly-llm-security` | protección de inyección inmediata (modo de bloqueo) Sondas garak + (omitidas sin un secreto de proveedor)                                                                    | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contrato OpenAPI (esquema) contra un OmniRoute vivo usando violaciones de especificaciones de superficies `docs/openapi.yaml` — / 500 no controlados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | La puntuación de las pruebas de mutación de Stryker sobre el carril unitario rápido Los mutantes supervivientes — emergen débilmente afirma                                  | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidad de motores de nodos en todos los rangos `engines.node` admitidos                                                                                    | **Consultivo** |

Las líneas base de rendimiento (montón, TTFB, tiempo de compilación) se registran, no se controlan: consulte [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### Trinquete CodeQL : admisión de candidatos e inventario del repositorio

CI posee la admisión del candidato CodeQL a través de una cadena de dependencia explícita: `codeql-scan` llama a la matriz de cuatro idiomas en `codeql.yml`, luego `codeql-admission` ejecuta `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` requiere ambos resultados. Calidad conserva sus propias comprobaciones numéricas pero no consulta el escáner antes de que finalice el productor; `Gate / Quality` por sí sola no constituye la admisión completa del candidato. CodeQL sigue siendo obligatorio para los candidatos que solo tienen documentos.

La política en `config/quality/codeql-admission-policy.json` selecciona Acciones, C/C++, JavaScript/TypeScript y Python, conjunto de consultas predeterminado, modelo de amenaza remota y modo de compilación ninguno. La verificación previa del productor rechaza un registro de activación pendiente y se ramifica fuera de la lista de objetivos explícita. Los objetivos actuales son principales y las pruebas del contrato release/v3.8.54. comparan esta lista finita y el disparador de mantenimiento con la versión del paquete; la próxima versión necesita una incorporación revisada. Se conserva el activador PR de versión más amplia existente de CI, pero un objetivo no incorporado informa HOLD antes de la extracción en lugar de obtener un PASS no medido.

Cada trabajo de matriz registra su carga ID real SARIF, idioma, categoría, ejecución e intento, identidad del flujo de trabajo de la persona que llama, evento ref/head/base/merge SHA y hash de política. El trabajo dependiente descarga solo los recibos de esta ejecución y valida los resúmenes de artefactos. Requiere las cuatro categorías, un productor exitoso y un procesamiento completo de cada carga exacta. Utiliza el filtro sarif_id de API, no el último análisis encontrado en una rama. Las reposiciones parciales pueden reutilizar categorías exitosas de un intento anterior de la misma carrera y candidato, preservando el intento de producción; un productor actual fallido no puede reutilizar evidencia verde anterior.

La acción CodeQL espera el procesamiento, pero su implementación fijada puede advertir y continuar después de un error de lectura de estado o una espera agotada. Por lo tanto, la admisión vuelve a verificar el procesamiento. Categorías faltantes, procesamiento pendiente, trabajos fallidos o cancelados, identidad obsoleta, paginación incompleta o APIs no disponible producen HOLD y salida 2. No queda ninguna espera fija para un flujo de trabajo de escáner independiente. Un PR no escaneado no puede pasar porque una consulta de alerta devolvió 0. Un recuento medido por encima de `metrics.codeqlAlerts.value` sale 1; la línea de base no se eleva para absorber las alertas de otra rama. [Estado de carga y búsqueda de análisis](https://docs.github.com/en/rest/code-scanning/code-scanning).

Los registros de recibos cargan y analizan IDs, categorías, versiones de herramientas, ref/SHA, línea base y números de alerta. El recuento de SARIF identity/result, los recuentos mínimos de reglas y las instancias de alerta exactas siguen siendo obligatorios. Las identidades PR/analysis se vuelven a verificar antes de aceptar. Estas comprobaciones establecen una cobertura de categorías configuradas, no un inventario de cada archivo fuente extraído. La extracción sin compilación C/C++ no incluye el código generado durante la compilación de un proyecto. Las exclusiones de fuentes aún necesitan revisión y la atribución de contribuyentes necesita evidencia de base exacta comparable.

`codeql-maintenance.yml` proporciona escaneos push de liberación activa y el programa semanal sin duplicar a los productores PR/main. `nightly-codeql-inventory.yml` mantiene separada la línea base de todo el repositorio, con `--strict-measurement` y una falla cuando la medición no está disponible. El elegante salto del coleccionista local no es admisión de candidato. El ajuste sigue siendo una `--update` explícita después de un conteo global más bajo verificado.

El flujo de trabajo avanzado no debe publicarse mientras la configuración predeterminada esté configurada: GitHub rechaza esa combinación. Su política versionada permanece pendiente hasta que se vuelva a leer la transición administrativa revisada. Antes de la publicación, un operador fija el repositorio, los hash head/base/tree y policy/patch/rollback y observa el estado de configuración; `node scripts/quality/codeql-producer.mjs verify-admin-readback` comprueba los registros JSON reales y esperados proporcionados. Esta es una protección técnica, no una aprobación del operador ni un reemplazo para obtener lecturas nuevas. El token PR nunca solicita acceso de administración. La implementación y cualquier cambio en el escáner requieren esa lectura separada más evidencia real de compatibilidad con PR, bifurcación y grupo de fusión.

Las bifurcaciones utilizan ejecutores alojados, realizan pagos sin credenciales persistentes, ningún proyecto install/build en el productor y ningún secreto de repositorio heredado. GitHub admite la carga SARIF para el evento pull_request con su token de bifurcación reducido; La aprobación de la ejecución de la contribución por primera vez sigue siendo la política GitHub. Nunca utilices pull_request_target para ejecutar código que no sea de confianza. Confirme los permisos de token reales, la clave de análisis y todos los entornos de categorías en el canario controlado antes de considerar completa la migración. [Reglas de carga de bifurcación](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [modos de configuración en conflicto](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Los despidos son decisión del operador (Regla dura #14)** — nunca descarta una alerta CodeQL sin registrar la justificación técnica en el comentario de desestimación: `won't fix` para un requisito de protocolo anterior, `used in tests` para un dispositivo de prueba, `false positive` para un desinfectante CodeQL no puede ver (precedente: `docs/security/ERROR_SANITIZATION.md`).

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

**Tampoco documentados arriba** (consultivos, señal baja): el job `docs-lint` (markdownlint + Vale, job completo con `continue-on-error`) y los workflows independientes de escáner `semgrep.yml` / `scorecard.yml`. CodeQL ahora tiene jobs obligatorios de producción y admisión bajo `Gate / CI`, sujetos a los requisitos de activación descritos arriba. `semgrepFindings: 0` figura en `quality-baseline.json`, pero no está conectado a un ratchet bloqueante en `ci.yml`: actualmente la métrica está huérfana.

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
- `check:pr-evidence` (bloqueante, busca texto en prosa mediante grep en el cuerpo del PR) — alto riesgo de falsos positivos; eliminarlo debilitaría la aplicación de la Regla estricta n.º #18, por lo que se trata de una verdadera decisión de política.
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
