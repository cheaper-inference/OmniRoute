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

Los flujos de trabajo CI y Quality Gates emiten cada uno un veredicto estable: `Gate / CI` y `Gate / Quality`. Su política de admisión versionada enumera cada trabajo previo según sea necesario o consultivo. Un trabajo requerido aplicable debe tener éxito: los resultados faltantes, cancelados, omitidos, pendientes y desconocidos no pueden establecer PASS. Una clasificación válida de solo documentos o de catálogo puede hacer que un carril de código no sea aplicable; un borrador PR no es un candidato aceptado. Una etiqueta `hotfix` no renuncia a la evidencia.

Ambos flujos de trabajo cubren PRs en ramas main/release, envíos a `main`, envío manual y eventos de fusión de grupos. Push, despachar y fusionar grupo ejecutan la selección completa. Los push a `release/**` no los inician (2026-10-18): cada cambio ya ejecutó la matriz en su PR y la combinación fusionada es el trabajo de Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Las bifurcaciones y los grupos de fusión utilizan ejecutores alojados para trabajos que de otro modo seleccionarían ejecutores autohospedados; Se debe verificar una capacidad alojada suficiente antes de la implementación.

Un PR ordinario ejecuta la selección rápida. Los carriles `full-code` y `full-code-e2e` de la política de admisión (E2E, integración, paquete artefacto, Electron smoke, Bun SQLite, ecosistema y clientes de protocolo) se ejecutan solo en un borrador de cola de Mergify o en una ejecución completa: `gh workflow run ci.yml --ref <branch>`.

Cada recibo JSON identifica el SHA retirado, la ejecución del flujo de trabajo y el intento. El CLI rechaza una discrepancia checkout/event SHA. Las pruebas de flujo de trabajo vinculan la membresía de la política a la lista `needs` del trabajo de veredicto para que un carril nuevo o eliminado no pueda desaparecer silenciosamente. Los recibos cubren su propio flujo de trabajo, no la publicación, la implementación o los aspectos internos de un escáner de asesoramiento existente. La activación de ambos nombres de cheques en las reglas de sucursales es un cambio administrativo separado; Agregar estos trabajos no protege por sí solo a una sucursal.

### Fusionar cola

La etiqueta `queue` envía un PR a la cola Mergify (`.mergify.yml`). Mergify abre un borrador PR en una rama `mergify/merge-queue/`, CI ejecuta la selección completa allí y el PR original se fusiona cuando pasan `Gate / CI`, `Gate / Quality` y `Merge integrity (changelog + generated skills)`.

Mergify escribe el resumen de su cola en la descripción del borrador y otras aplicaciones también pueden editarlo. Un evento `pull_request` `edited` en dicho borrador toma su propio grupo de concurrencia (`-queue-edit-<run_id>`), por lo que no puede cancelar la ejecución real del borrador y omite la puerta y la matriz. Sólo `Merge integrity` todavía se ejecuta. El trabajo de puerta omitido lleva un nombre de verificación diferente, porque Mergify lee un `Gate / CI` omitido como una verificación fallida y retira el PR la cola.

Después de una retirada de la cola, una inserción no siempre vuelve a poner en la cola el PR. Comenta `@mergifyio queue` al respecto.

### Evidencia retenida en el reductor de aceptación.

`scripts/quality/validate-release-acceptance.mjs` reduce un plan suministrado y sus manifiestos; no establece que el plan cubra todo el proceso de lanzamiento. Sus informes establecen explícitamente `releaseAcceptance: false`, incluso cuando ese plan es `VERIFIED`. El flujo de trabajo `release-acceptance.yml` todavía utiliza accesorios ocultos, no recibos reales de compilación, paquete, arranque o promoción.

La CLI exige que `--evidence-root` verifique las pruebas retenidas. Los archivos se resuelven como `<evidence-root>/<artifact_id>/<member>` y se procesan como SHA-256. Un registro PASS sin evidencia, un archivo faltante o modificado, una ruta insegura o un enlace simbólico impiden la verificación. Los archivos faltantes no equivalen a registros exitosos vacíos. Las comprobaciones SHA/run/attempt existentes siguen siendo independientes: los bytes coincidentes no pueden rescatar un recibo obsoleto. La integridad del archivo no es una prueba de autenticidad de ejecución ni de promoción de artefactos.

### Inventario de escaneo estático

El inventario versionado de npm-alias y la membresía de escaneo estático se encuentran en `config/quality/gate-manifest.json`. Ejecute `npm run check:gate-manifest` para validar nombres de scripts y comandos exactos contra `package.json`; Las adiciones, eliminaciones y derivaciones de comandos fallan tanto en el enlace local como en los trabajos de cambio de clasificación en CI. Un alias no es un trabajo de flujo de trabajo, una instancia de matriz o un caso de prueba: estos recuentos no deben presentarse como intercambiables.

Utilice `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list` para inspeccionar los alias seleccionados sin ejecutarlos. El ejecutor invoca el punto de entrada npm, por lo que se conserva su tiempo de ejecución (incluido Bun cuando esté configurado). El manifiesto registra alias fuera de esos perfiles como invocados por separado, y los comandos de mantenimiento están prohibidos en perfiles de análisis de solo lectura.

Estos perfiles cubren únicamente el escaneo estático. No certifican pruebas de producto, cobertura, embalaje, controles externos ni la aceptación total de la liberación de un candidato. La admisión del flujo de trabajo utiliza `config/quality/admission-policy.json` y `scripts/quality/admission-verdict.mjs` vinculados. Los perfiles de observadores de liberaciones permanecen separados; inspeccionar sus cheques y recibos aplicables de forma independiente. Los comandos estáticos completos del observador se declaran en `config/quality/release-green-static-profile.json`, incluidos `audit:deps`, selección de prueba de mutación y comprobaciones de traducción. El cargador valida los comandos npm contra package.json y declaraciones CI/Quality modeladas; rechaza la deriva en lugar de ejecutar tokens de shell como argumentos. La salida SKIP/INCOMPLETE del escáner requerida no puede establecer PASS. El perfil registra sus exclusiones externas y no reemplaza la cobertura alojada, las matrices de prueba, el paquete o la evidencia de implementación. El inventario en prosa que aparece a continuación es una referencia, no una prueba de que realmente existiera una puerta.

Los scripts viven bajo `scripts/check/` (puertas de políticas) y `scripts/quality/` (motor de trinquete). La fuente de verdad de CI es `.github/workflows/ci.yml`.

### Liberar la ruta rápida PR (`quality.yml`)

`.github/workflows/quality.yml` complementa CI en main/release PRs, empuja a `main`, envía y fusiona grupos. PRs utiliza comprobaciones rápidas filtradas por ruta. Se eliminó la compilación duplicada permanentemente deshabilitada; los controles reales build/package/boot permanecen en CI. El conjunto de unidades y vitest se ejecutan solo en CI (`Unit Tests (N/8)` y `Vitest`).

| Trabajo                                          | Alcance                                                                                                                                                                | Bloqueo                  |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Docs/code PRs; referencias de documentos API y documentos-todos                                                                                                        | Sí                       |
| `Fast Quality Gates`                             | Código PRs; comprobaciones estáticas, verificación de tipo, verificación de tipo del panel, pruebas unitarias afectadas, pruebas de hermanos olvidados (asesoramiento) |
| `No new ESLint warnings`                         | Código PRs; protector de pelusa consciente de supresiones                                                                                                              | Si, incluyendo tenedores |
| `Merge integrity (changelog + generated skills)` | PRs sin borrador; registro de cambios y sincronización de habilidades generadas                                                                                        | Si, incluyendo tenedores |

#### Informe de pruebas de hermanos olvidados

`npm run check:forgotten-sibling-tests` se ejecuta como un paso de asesoramiento de `Fast Quality Gates` y reutiliza el solucionador de importación detrás del mapa de impacto de prueba. Para cada módulo de producción modificado, informa cadenas `changed module/symbol -> static consumer -> candidate sibling test` deterministas cuando la prueba candidata está ausente de la diferencia de solicitud de extracción. El resumen de Markdown y el resultado JSON se conservan como artefacto del flujo de trabajo `forgotten-sibling-tests` para la calibración antes de cualquier implementación de bloqueo.

Las reexportaciones de barriles y las importaciones dinámicas son únicamente diagnósticos de resolución; nunca crean un hallazgo de bloqueo. Las excepciones revisadas viven en `config/quality/forgotten-sibling-allowlist.json`. Cada entrada debe nombrar la prueba del consumidor y del candidato, dar una justificación específica y vincular un problema GitHub o una solicitud de extracción. Las entradas con formato incorrecto no se cierran. Las excepciones no pueden suprimir una prueba candidata eliminada o una diferencia que agrega `.skip`/`.todo`; El debilitamiento de las afirmaciones y otros enmascaramientos siguen siendo propiedad de la puerta `check:test-masking` bloquea de forma independiente.

### Trabajo: `lint`

Se ejecuta en cada PR a `main`. Los bloques se fusionan en caso de falla.

| Guión (`npm run ...`)             | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bloqueo                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | La versión Node.js está dentro del rango admitido.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sí                                         |
| `check:cycles`                    | Importaciones circulares en todo `src/` + `open-sse/` (basado en AST, tsconfig `paths` resuelto). Bare sale de 1 cada vez que existe algún ciclo (cerrado por falla desde #15281) y enumera el SCCs. `check:cycles:ratchet` (lo que ejecuta CI ) se bloquea cuando el recuento excede el techo `metrics.cycles` en `quality-baseline.json` — actualmente 14, `direction: down`, por lo que solo puede caer (#15159 G-01/G-02).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sí (trinquete)                             |
| `check:boundary`                  | Acoplamiento `open-sse → src` : importaciones únicas de archivo a archivo desde el motor a la aplicación (`scripts/quality/measure-boundary.mjs`; la lista de bordes es el trabajo pendiente de corrección core/module-split v4). Informe de asesoramiento = desnudo (igual que `quality:boundary`). `check:boundary:ratchet` (lo que ejecuta CI, también en el bucle de trinquete de puertas rápidas `quality.yml` ) se bloquea cuando el recuento excede el techo `metrics.boundaryOpenSseToSrc` en `quality-baseline.json` — sembrado en el 771 medido, `direction: down`; `--update` sólo lo reduce; relativa a la base en PRs (`--base-ref`, ver más abajo)                                                                                                                                                                                                                                                                                                                                                                                                         | Sí (trinquete)                             |
| `check:route-validation:t06`      | Esquemas Zod presentes en todas las rutas (política de nivel 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                         |
| `check:any-budget:t11`            | El recuento `@ts-expect-error // any` no supera el presupuesto (cateraca de nivel 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sí                                         |
| `check:provider-consistency`      | Cada proveedor en `providers.ts` tiene una entrada coincidente en `providerRegistry.ts` (y viceversa, dentro de la lista de permitidos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sí                                         |
| `check:model-lifecycle`           | Las tres tablas de enrutamiento mantenidas manualmente se mantienen consistentes con la instantánea del ciclo de vida registrada (#11503): `FITNESS_TABLE` (`taskFitness.ts`) no obtiene ninguna identificación retirada que `REGISTRY` pueda enrutar; cada objetivo `BUILT_IN_ALIASES` está presente en `REGISTRY` y ausente en la instantánea de identificación retirada; cada identificación retirada que aún esté en `REGISTRY` se reenvía o se enumera en `allowedRetiredInCatalog`; y ninguna fuente o destino `DEFAULT_DEGRADATION_MAP` aparece retirado en esa instantánea. Esto no prueba que un modelo cuente actualmente con un flujo ascendente en vivo. — sin conexión se compara con `config/quality/model-lifecycle.json`, actualizado manualmente con `npm run quality:refresh-model-lifecycle` (red; no conectado a CI). `allowedRetiredInCatalog` es un trinquete quemado: agregue una entrada solo con un problema de seguimiento.                                                                                                                    | Sí                                         |
| `check:fetch-targets`             | Cada `fetch("/api/...")` en `src/` del lado del cliente se resuelve en un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                         |
| `check:deps`                      | Todos los departamentos `npm install` -able en cada `package.json` del repositorio están en `dependency-allowlist.json`; nuevos paquetes no fijados o en cuclillas marcados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sí                                         |
| `audit:deps`                      | Auditoría npm de los cinco archivos de bloqueo independientes (raíz, Electron, complementos OpenCode v1/v2 y proveedor). Bloque de avisos críticos; Los avisos altos siguen siendo advertencias visibles. las auditorías Missing/failed son INCOMPLETE y block; Se conservan los informes y los hashes de bloqueo por ámbito.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sí                                         |
| `check:lockfile`                  | integridad `package-lock.json` registro https —, hashes de integridad, sin anulaciones de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sí                                         |
| `check:licenses`                  | Lista de licencias permitidas SPDX para dependencias de producción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sí                                         |
| `check:tracked-artifacts`         | Sin artefactos de compilación/enlaces simbólicos `node_modules` comprometidos (también se ejecuta en husky pre-commit; el pre-push es intencionalmente ligero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sí                                         |
| `check:ai-attribution`            | No hay tráiler AI/bot `Co-Authored-By` ni pie de página de generación de IA en PR, título o cuerpo — Hard Rule #16 (en el bucle de puertas rápidas `quality.yml` para PR→ `release/**` — lee la carga útil del evento, no op off PRs — y un paso de solo PR en `ci.yml` lint para PR→ `main`; también el gancho husky `commit-msg` ; se permiten coautores humanos; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | Cada exclusión Vitest nombra un problema de seguimiento y aparece en `config/quality/vitest-exclusions.json` (#13204).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sí                                         |
| `check:file-size`                 | Los archivos fuente (`.ts`/`.tsx` en `src/`, `open-sse/`, `electron/`, `bin/`) permanecen dentro de `cap` y los archivos de prueba (`*.test.ts(x)`) dentro de `testCap`; Los archivos congelados en `file-size-baseline.json` (`frozen` / `testFrozen`) no deben superar su tamaño registrado.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sí                                         |
| `check:error-helper`              | Las respuestas de error en executors/handlers usan `buildErrorBody()` / `sanitizeErrorMessage()` (Regla estricta #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sí                                         |
| `check:migration-numbering`       | Los archivos SQL de migración están numerados secuencialmente, sin espacios ni duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                         |
| `check:public-creds`              | No hay OAuth `client_id`/`client_secret` literal ni claves web de Firebase fuera de `publicCreds.ts` (regla estricta #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                         |
| `check:db-rules`                  | No hay SQL sin formato fuera de los módulos `src/lib/db/` ; no hay importaciones de barriles desde `localDb.ts` (Reglas estrictas #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                         |
| `check:known-symbols`             | Los ejecutores de proveedores, las estrategias de enrutamiento y los traductores registrados en sus tablas de despacho coinciden con los archivos en el disco — sin símbolos huérfanos o no declarados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sí                                         |
| `check:route-guard-membership`    | Cada ruta que genera un proceso hijo está clasificada por `isLocalOnlyPath()` (Reglas estrictas #15/#17).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                         |
| `check:test-discovery`            | Cada archivo `*.test.ts` / `*.spec.ts` en el repositorio es recopilado por al menos un ejecutor de pruebas (trinquete: la lista de huérfanos en `test-discovery-baseline.json` solo se puede reducir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sí                                         |
| `check:test-tla-order`            | Ningún archivo `node:test` bajo `tests/unit` registra una prueba, alcanza un `await` de nivel superior y luego registra más (#18045; ratchet: `test-tla-order-allowlist.json` solo puede reducirse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sí                                         |
| `check:agent-skills-sync`         | Los artefactos de habilidades de agentes generados coinciden con su catálogo de origen (sin deriva)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | El proveedor logos/assets lleva una entrada de procedencia registrada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | Los archivos de configuración JSON analizan y satisfacen las reglas de repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | Compilación de TypeScript sin errores (solo advertencias)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sí                                         |
| `typecheck:noimplicit:core`       | Estricto `noImplicitAny` — con visión de futuro; Muchos sitios de llamadas preexistentes todavía necesitan anotaciones.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` con ámbito de `src/app/(dashboard)/**` (#7033) — La lista de permitidos seleccionada de 27 archivos de `typecheck:core` no incluye ningún TSX del tablero, y `next build` tampoco lo verifica nunca (`next.config.mjs` establece `ignoreBuildErrors: true`), por lo que las regresiones de identificadores huérfanos allí (#6625/#6909) eran invisibles para CI. Diferencias con una línea de base de recuento per-file/per-TS-code congelada (`config/quality/dashboard-typecheck-baseline.json`, el mismo patrón de aplicación obsoleta que `check:known-symbols`) — solo los errores NEW más allá del recuento de referencia fallan en la puerta; disminuya con `--update` cuando se solucione un error preexistente.                                                                                                                                                                                                                                                                                                                                           | Sí                                         |
| `check:build-typecheck`           | Verificación del tipo de producción de toda la aplicación sobre `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), la lista de permitidos de 27 archivos de `typecheck:core` superficial y la puerta del tablero no cubren. Diferencias contra `config/quality/build-typecheck-baseline.json`; un recuento por (archivo, código) nuevo o elevado falla, un recuento más bajo le solicita que aumente. `--update` se niega mientras la ejecución contiene un par nuevo o elevado a menos que se pase `--force-regressions`, y rechaza un archivo recién silenciado a menos que se pase `--force-nocheck`, por lo que ampliar la línea de base para volverse verde y otorgar un silencio permanente son dos actos deliberados separados. Se rechaza un simple `--force`. También analiza el alcance de la compilación en busca de `@ts-nocheck` frente a `config/quality/ts-nocheck-baseline.json`, porque un archivo que lo utiliza no informa ningún diagnóstico y, de lo contrario, sería invisible para todas las puertas. | Sí                                         |

#### Dos programas de verificación de tipos responden de manera diferente

`typecheck:core` y `check:build-typecheck` compilan diferentes programas con diferentes opciones, y el mismo archivo puede estar limpio en uno y lleno de errores en el otro.

`tsconfig.build.json` establece `"strict": false`, por lo que `noImplicitAny` está desactivado. La configuración principal compila una lista de permitidos seleccionada de 27 archivos con opciones más estrictas y sigue el gráfico de importación de cada entrada, por lo que los archivos que nunca aparecen en el programa de compilación aún se verifican allí.

La consecuencia es importante al juzgar si se escribe un archivo:** diagnóstico cero bajo `check:build-typecheck` no significa cero** . Al eliminar `@ts-nocheck` de 26 archivos, 23 de ellos estaban limpios en el programa de compilación; dieciséis de ellos arrojaron alrededor de 120 errores implícitos (cualquiera en el estricto). Verifique ambos antes de limpiar un archivo.

### Trabajo: `quality-gate`

Corre detrás de `test-coverage`. Los bloques se fusionan en caso de falla.

| Guion                        | Valida                                                                                                                                                                                                  | Bloqueo                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (recuento de advertencias ESLint, cobertura del informe de fragmentos fusionados)                                                                                          | Sí (aguas arriba del trinquete) |
| `quality:ratchet`            | Cada métrica en `quality-baseline.json` no ha retrocedido (ESLint advertencias ≤ baseline; cobertura ≥ baseline)                                                                                        | Sí                              |
| `check:duplication`          | La duplicación de código (jscpd@4) no excede la línea base en `quality-baseline.json`                                                                                                                   | Sí                              |
| `check:complexity`           | La complejidad ciclomática a nivel de archivo no excede el límite (core ESLint `complexity` + `max-lines-per-function`)                                                                                 | Sí                              |
| `check:cognitive-complexity` | Trinquete de complejidad cognitiva (`eslint-plugin-sonarjs`) — pase ESLint separado; CI se ejecuta ambos combinados como un único paso `check:complexity-ratchets`                                      | Sí                              |
| `check:dead-code`            | Las exportaciones/archivos no utilizados con trinquete (knip) no retroceden respecto de la línea de base                                                                                                | Sí                              |
| `check:compression-budget`   | Los pisos de ahorro de tokens por motor — del presupuesto de referencia de compresión no deben retroceder                                                                                               | Sí                              |
| `check:type-coverage`        | El trinquete con porcentaje (`type-coverage`) no retrocede; subsume en gran medida `typecheck:noimplicit:core`                                                                                          | Sí                              |
| `check:codeql-ratchet`       | El recuento de alertas CodeQL abierto no retrocede (se lee a través de `gh api`; salto elegante sin token) Cadencia de actualización — y disparador manual: consulte "trinquete CodeQL " a continuación | Sí                              |

### Trabajo: `quality-extended`

Todo el trabajo es de asesoramiento (`continue-on-error: true`). Los trinquetes basados en npm funcionan de verdad; los escáneres externos se instalan a través de `gh release download` y se saltan automáticamente (salida 0) cuando aún no hay un binario.

| Guion                    | Valida                                                                                                                                                                                                                                              | Bloqueo                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Sin dependencias circulares (dpdm)                                                                                                                                                                                                                  | **Consultivo**                                           |
| `check:bundle-size`      | El tamaño del paquete no excede el límite                                                                                                                                                                                                           | **Consultivo**                                           |
| `check:secrets`          | Escaneo secreto (gitleaks) — se salta si el binario está ausente                                                                                                                                                                                    | **Consultivo**                                           |
| `check:vuln-ratchet`     | Las vulnerabilidades de dependencia (osv-scanner) no regresan — `--ratchet` falla como INCOMPLETE (salida 2) si no se mide                                                                                                                          | **Consultivo**                                           |
| `check:workflows`        | Pelusa de flujo de trabajo (actionlint + zizmor); Los escáneres missing/broken, los informes no válidos o la línea base de trinquete faltante fallan como INCOMPLETE. Los hallazgos válidos siguen la política strict/advisory/ratchet seleccionada | Se requiere ejecución; bloqueo de trinquete zizmor en CI |
| `check:openapi-breaking` | Contrato API público contra confirmaciones de eventos anclados (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); la medición requerida falla cerrada                                                          | **Bloqueando con --ratchet**                             |

### Trabajo: `docs-sync-strict`

Se ejecuta en cada PR a `main`. Los bloques se fusionan en caso de falla.

| Guion                          | Valida                                                                                                                                                                                                           | Bloqueo                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:docs-all`               | Metapuerta que ejecuta las 6 subpuertas siguientes de forma secuencial                                                                                                                                           | Sí                                |
| ↳ `check:docs-sync`            | Coherencia de la versión CHANGELOG / OpenAPI / llm.txt                                                                                                                                                           | Sí                                |
| ↳ `check:docs-counts`          | Los recuentos en prosa (recuento de proveedores, recuento de migraciones, etc.) están dentro de la ventana de trinquete de los recuentos reales.                                                                 | Sí                                |
| ↳ `check:env-doc-sync`         | Cada env var en `.env.example` está documentada en una tabla de documentos y viceversa                                                                                                                           | Sí                                |
| ↳ `check:deprecated-versions`  | No hay cadenas de versiones obsoletas en los documentos                                                                                                                                                          | Sí                                |
| ↳ `check:doc-links`            | Los enlaces de rebajas internos en los documentos se resuelven en archivos reales (formato `[text]`/`(path)` )                                                                                                   | Sí                                |
| ↳ `check:fabricated-docs`      | Las rutas, las variables env, los comandos CLI, los nombres de los enlaces y las rutas de los archivos citados en los documentos existen en el código base. Puerta dura vía `--strict`; fallo suave sin bandera. | Sí (a través de `--strict` en CI) |
| `check:cli-i18n`               | Las cadenas de comando CLI están presentes en todos los archivos locales de i18n                                                                                                                                 | Sí                                |
| `check:openapi-coverage`       | La especificación OpenAPI cubre al menos un piso de trinquete de rutas reales                                                                                                                                    | Sí                                |
| `check:openapi-security-tiers` | Las anotaciones de niveles de seguridad en `openapi.yaml` son consistentes con las clasificaciones `routeGuard.ts`                                                                                               | **Consultivo**                    |
| `check:openapi-routes`         | Cada camino en `openapi.yaml` se resuelve en un `route.ts` real (antialucinación)                                                                                                                                | Sí                                |
| `check:docs-symbols`           | Cada referencia `/api/...` en `docs/**/*.md` se resuelve en un `route.ts` real (antialucinación)                                                                                                                 | Sí                                |
| `i18n translation drift`       | Claves no traducidas en archivos locales i18n — solo advierten                                                                                                                                                   | **Consultivo**                    |

Se generan los doce README SVGs bajo `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` los regenera todos). Cada uno tiene una prueba unitaria de comparación de bytes (`tests/unit/docs/readme-*-svg.test.ts`, trabajo `test-unit`) que falla cuando el archivo confirmado está obsoleto, y `check:docs-counts` lee números canónicos de sus nodos `<text>` — razón por la cual el paso de esquema mantiene cada cadena delineada en el archivo como `<text>` invisible. La verificación de números canónicos SVG lee los archivos enumerados en `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, más `public/images/tier-flow-dark.svg` y `tier-flow-light.svg`; las afirmaciones de factores de puntuación, entrada de catálogo, grupo recurrente y gratuito para siempre también dicen `promise-pillars.svg`, `free-tier-budget.svg` y `strategies-grid.svg`. `free-tier-budget.svg` extrae sus figuras del cargador de catálogo en vivo, por lo que un cambio a `FREE_MODEL_BUDGETS` o al nombre para mostrar de un proveedor muestra CI hasta que se regenera ese archivo.

### Trabajo: `i18n-ui-coverage`

| Guion                               | Valida                                                                                                                                                                                                                        | Bloqueo        |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (en línea) | La cobertura de la clave UI i18n es ≥ 65%                                                                                                                                                                                     | Sí             |
| `check-ui-value-drift` (en línea)   | Un inglés reescrito** valor** no deja ninguna traducción obsoleta                                                                                                                                                             | Sí             |
| `check-new-key-coverage` (en línea) | A** nuevo** La clave en inglés se traduce en cada configuración regional — Se rechaza un marcador `__MISSING__:`                                                                                                              | Sí             |
| `check-translation-ratio`           | La proporción de traducción real por configuración regional (idéntica al inglés/marcador de posición/hojas faltantes fuera de la lista de permitidos) no debe exceder `config/quality/i18n-translation-baseline.json` + slack | **Consultivo** |

Necesita `fetch-depth: 0` — la puerta de deriva de valor diferencia `en.json` de la base de fusión.

#### puerta de traducción obsoleta `check-ui-value-drift` —

Capta la regresión i18n que las otras puertas estructuralmente no pueden ver: se reescribe un valor en inglés y las traducciones derivadas del inglés _anterior_ se quedan atrás, por lo que los usuarios que no hablan inglés siguen leyendo una copia redactada con confianza y ahora incorrecta.

Esto se envió de verdad. `oauthModal.googleOAuthWarning` se reescribió cuando llegó el asistente de inicio de sesión Antigravity (#5203);** 39 de 43 locales** Se mantuvo el texto que indicaba a los operadores "copiar el URL completo y pegarlo debajo" — un flujo que no se puede completar para ese proveedor. Pasó desapercibido hasta #8463 porque:

- `sync-ui-keys` solo rellena las claves que están** ausente** , nunca los que son** duro** ;
- `check-ui-keys-coverage` cuenta la _presencia_ clave, por lo que una traducción obsoleta se considera cubierta;
- `check-translation-drift` rastrea la documentación `docs/i18n/<locale>/**.md` refleja — nunca lee `src/i18n/messages/*.json`. Bloqueo en el trabajo `docs-sync-strict` desde la resincronización 2026-09: edite un documento principal → `npm run i18n:run -- --files=<doc>` (a nivel de sección, barato).

**Consciente de las diferencias, no respaldado por la línea de base.** Compara `en.json` en la base de fusión con el árbol de trabajo; por cada clave cuyo valor en inglés cambió, cualquier configuración regional que aún tenga una traducción intacta está obsoleta. Esto deliberadamente** congela la deuda preexistente** — a diff no puede revelar de qué inglés antiguo proviene una traducción de larga data, por lo que la puerta juzga solo lo que toca el cambio actual. La alternativa (una línea de base de hash por clave) costaría un archivo generado ~ 600 KB, 3 × la línea de base más grande existente, que se agita en cada i18n PR.

Dos formas de satisfacerlo:

1. actualizar las traducciones afectadas, o
2. configúrelos en `__MISSING__:<new english>` — el tiempo de ejecución luego entrega el inglés corregido (`src/i18n/request.ts::deepMergeFallback`, #7258) y las colas de claves para la traducción.

Si la cuerda es** significado** cambiado, prefiero** cambiar el nombre de la clave** : una nueva clave no puede heredar una traducción obsoleta. Ese es el patrón que utilizó #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Sale de 0 con `SKIP reason=base-unresolved` cuando el catálogo base no se puede leer (clon superficial sin la referencia base), reflejando `check-openapi-breaking`.

### Trabajo: `i18n`

Matriz de validación i18n completa (un trabajo por ubicación). Todo el trabajo es de asesoramiento.

| Guion                           | Valida                                                 | Bloqueo                                                       |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| `validate_translation.py quick` | Integridad de la traducción por configuración regional | **Consultivo** (`continue-on-error: true` en todo el trabajo) |

### Trabajo: `pr-test-policy`

Solo se ejecuta en solicitudes de extracción.

| Guion                  | Valida                                                                                                                                       | Bloqueo |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs que cambian el código de producción en `src/`, `open-sse/`, `electron/` o `bin/` deben incluir o actualizar pruebas (regla estricta #8). | Sí      |
| `check:test-masking`   | Los archivos de prueba modificados no reducen el recuento de afirmaciones netas ni agregan tautologías `assert.ok(true)`                     | Sí      |
| `check:pr-evidence`    | El cuerpo PR cita evidencia test/VPS para el cambio (mecaniza Hard Rule #18 al agrupar PR prosa — frágil, ver Backlog)                       | Sí      |

### Trabajo: `test-vitest`

Corre detrás de `build`. Los bloques se fusionan en caso de falla.

| Suite            | Valida                                                            | Bloqueo                                                                                                                    |
| ---------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | servidor MCP (110 herramientas), autoCombo, caché — vitest runner | Sí                                                                                                                         |
| `test:vitest:ui` | pruebas de componentes UI — vitest runner                         | **Bloqueo** Los fallos preexistentes — se excluyen explícitamente en `vitest.config.ts`; nuevos fracasos fallan el trabajo |

### Flujos de trabajo nocturnos (programados, de asesoramiento)

Estos se ejecutan según una programación cron (y `workflow_dispatch`), nunca según PRs. Todos son de asesoramiento.

| Flujo de trabajo       | Valida                                                                                                                                                                       | Bloqueo        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | pruebas de propiedad de verificación rápida con un recuento de ejecución alto de semillas aleatorias +                                                                       | **Consultivo** |
| `nightly-resilience`   | puerta de crecimiento del montón, inyección de fallas del caos, k6 load/soak                                                                                                 | **Consultivo** |
| `nightly-llm-security` | protección de inyección inmediata (modo de bloqueo) sondas + garak (omitidas sin un secreto de proveedor)                                                                    | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contrato OpenAPI (esquema) contra un OmniRoute vivo usando violaciones de especificaciones de superficies `docs/openapi.yaml` — / 500 no controlados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Puntuación de las pruebas de mutación de Stryker sobre el carril unitario rápido — superficie de mutantes supervivientes afirmaciones débiles                                | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidad de motores de nodos en los rangos `engines.node` admitidos                                                                                          | **Consultivo** |

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

## Política de lista blanca

Cada puerta que no puede fallar por infracciones preexistentes utiliza una lista de permitidos congelada (por ejemplo, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La política es:

**Arreglar la causa raíz; use la lista de permitidos solo cuando la infracción sea preexistente y no se pueda solucionar en el mismo PR.**

Al agregar una entrada a una lista de permitidos:

1. Incluye un comentario con la justificación.
2. Haga referencia al problema de seguimiento (por ejemplo, `// #3498 — Phase 2 feature, not yet implemented`).
3. Eliminar la entrada en el mismo PR que corrige la infracción — una entrada obsoleta que ya no suprime una infracción activa es en sí misma un defecto (la aplicación obsoleta de 6A.3 fallará la puerta en una entrada huérfana de la lista de permitidos una vez implementada).

Hacer** no** agregue entradas de la lista de permitidos para que las pruebas pasen más rápido. Una puerta verde con una lista de permitidos cada vez mayor es una falsa sensación de calidad.

### Cuando falla una puerta en tu PR

1. **Lea atentamente la salida de la puerta.** — te dice exactamente qué archivo o símbolo violó la regla.
2. **Arreglar la infracción** — la mayoría de las puertas son comprobaciones deterministas del sistema de archivos que pasan tan pronto como el código es correcto.
3. **Si la infracción es preexistente** (es decir, no lo introdujo pero la puerta ahora lo cubre): agregue una entrada a la lista de permitidos con un comentario de justificación y un problema de seguimiento.
4. **Si la puerta es un trinquete** (cobertura, advertencias ESLint, duplicación, complejidad): su cambio empeoró la métrica. Solucione el problema subyacente o (raramente) ejecute `npm run quality:ratchet -- --update` si el cambio es intencional y la degradación de la métrica es aceptable — pero documente el motivo en la descripción PR.
5. **Puertas de asesoramiento** (`continue-on-error: true`) son — informativos, no bloquean la fusión pero aparecen en el resumen CI. Arréglalos de todos modos.

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

## Backlog de Racionalización (ROI review — Fase 9 Onda 3)

Este inventario se concilió con `ci.yml` el 17 de junio de 2026 (la versión anterior omitió `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Una revisión ROI del conjunto reconciliado identificó los siguientes candidatos a racionalización.** Las fusiones son cambios mecánicos CI ; Las flips/drops son decisiones políticas reservadas al operador.** Nada de lo siguiente se aplica todavía.

**También indocumentado arriba** (aviso, señal baja): el trabajo `docs-lint` (markdownlint + Vale, trabajo completo `continue-on-error`) y los flujos de trabajo del escáner independiente `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` está en `quality-baseline.json` pero no está conectado a un trinquete de bloqueo en `ci.yml` — la métrica está actualmente huérfana.

### Fusionar/desduplicar (mecánico, menor riesgo)

Cada candidato fue validado con el estado de puerta en vivo el 17 de junio de 2026 (confiar pero verificar); varias fusiones "obvias" resultaron ocultar deuda y son** no** lugares limpios y sin cita previa.

- **`check:docs-sync` corre dos veces** — independiente en el trabajo `lint` y nuevamente dentro de `check:docs-all` (`docs-sync-strict`) y el gancho de confirmación previa de husky. ✅**DONE** Se eliminó la invocación `lint` independiente —.
- **escaneo CVE** — ❌**NOT una fusión limpia.** `audit:deps` bloquea avisos críticos y auditorías incompletas en los cinco archivos de bloqueo, al tiempo que informa avisos altos como advertencias según la política actual; `check:vuln-ratchet` (osv) solo falla en una _regresión_ frente a la línea de base registrada y rechaza las mediciones faltantes cuando es necesario. Semántica diferente — al eliminar `audit:deps` perdería la puerta crítica absoluta y los recibos de auditoría de paquetes independientes. Conserva ambos.
- **Detección de ciclo** — ✅**DONE** (#15159 G-01/G-02). El texto antiguo aquí llamaba a `check:cycles` "la puerta verde y curada" y justificaba mantenerla bloqueada porque `check:circular-deps` (dpdm) informó 91 ciclos. Ese verde era un** falso verde** : `check:cycles` escaneó 5 subdirectorios (450 archivos), solo encontró coincidencias con `import|export … from` estático y eliminó todos los especificadores `@/` y `@omniroute/open-sse/`, por lo que no pudo ver los ciclos de alias + de importación dinámica que dominaban el repositorio. Corregido: la puerta ahora recorre `src` + `open-sse` (5023 archivos), recopila especificadores de TypeScript AST (por lo que `import("…")` cuenta y la posición de tipo `typeof import("…")` no) y resuelve tsconfig `paths`. se encuentra** 14** ciclos, no 0. Debido a que 14 ciclos preexistentes no se pueden fijar en una puerta PR, `check:cycles` ahora es un** trinquete** (`--ratchet`, techo `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — bloquea cualquier _regresión_ y el conteo solo puede caer. CI ejecuta `npm run check:cycles:ratchet`. Paseos en llamas con**A-01** . `check:circular-deps` (dpdm) sigue siendo consultivo como la segunda opinión más amplia.
- **Complejidad** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): una caminata ESLint, cuenta por ruleId para que las líneas máximas ciclomáticas + y las líneas de base cognitivas permanezcan independientes; `check:complexity` / `check:cognitive-complexity` individuales permanecen para `--update` local.
- **`/api` antialucinaciones** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un inventario FS de `src/app/api`, openapi-routes + docs-symbols aún informa de forma independiente; los individuos permanecen para carreras locales.
- **`check:node-runtime` se ejecuta en 11 trabajos** — ⚠️** ROI bajo.** Cada uno es un corredor independiente y el cheque es < 1s; Ahorro total ~ 10 chelines, contra la pérdida de un guardia barato por trabajo. No vale la pena abandonarlo.
- **`typecheck:noimplicit:core` on CI lint** — ✅ **removed from lint job** (was advisory `continue-on-error`); blocking type surface is `typecheck:core` + `check:type-coverage`. Local script retained.

### Voltear / decidir (política del operador)

- `check:openapi-security-tiers` (consejo) — ❌**NOT limpiamente volteable.** Sale 0 pero advierte que varias rutas `traffic-inspector` bajo `LOCAL_ONLY_API_PREFIXES` carecen de la anotación `x-loopback-only: true`. Para aplicarlo es necesario agregar primero esas anotaciones a `openapi.yaml`.
- `typecheck:noimplicit:core` (asesoramiento) — en gran medida subsumido por el trinquete de bloqueo `check:type-coverage`. Cambie a un trinquete o suelte el segundo pase `tsc` redundante.
- `test:vitest:ui` (ahora** bloqueando** ) las fallas preexistentes — se excluyen explícitamente en `vitest.config.ts` con comentarios de seguimiento `// #8618` ; nuevos fracasos fracasan en el trabajo.
- `check:secrets` (gitleaks, bloqueo de trinquete congelado en 3 falsos positivos documentados) — incluye en la lista de permitidos los 3 para llegar a 0, o degradar a aviso. Se superpone al escaneo de secretos nativo de GitHub + `check:public-creds`.
- `check:pr-evidence` (bloqueo, greps PR-body prosa) — alto riesgo de falsos positivos; debilita la aplicación de la regla estricta #18 si se elimina, por lo que esta es una verdadera llamada de política.
- `semgrep` (consejo independiente) — se superpone CodeQL para las familias OWASP ; conecte su línea de base a un trinquete o gota.

---

## Documentación relacionada

- Cadena de suministro (procedencia, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### puerta de paridad del conjunto de claves `check-key-completeness` —

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, trabajo `i18n-ui-coverage`). Compara el conjunto de claves de hoja de cada `src/i18n/messages/<locale>.json` con `en.json` y falla en cualquier hoja ausente o adicional, independientemente de cuándo se agregó la clave. Los marcadores de posición `__MISSING__:` cuentan como presentes (su contenido es asunto de la puerta de relación). Es el complemento absoluto de las dos puertas diff-based/percentage : `check-ui-keys-coverage` impone un piso del 80 % por ubicación (43 claves ausentes de 13.000 ~ todavía leen 99,7 %) y `check-new-key-coverage` juzga solo las claves que un PR agrega a `en.json`. Se genera un lote de configuración regional a partir del `en.json` del día en que se corta su rama y se traduce durante días mientras la base sigue agregando claves; el lote PR no agrega ninguna clave en sí, por lo que ambos hermanos permanecieron en silencio cuando al lote 1 (#13044) le faltaron 43 claves en nueve configuraciones regionales y al lote 2 (#13660) le faltaron 10 claves en ocho (2026-09-15). Arreglar un rojo con `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; una hoja `extra` significa que la fuente la eliminó — la elimina de la configuración regional. `--warn` informa sin fallar. `--catalog=cli` ejecuta la misma comparación sobre `bin/cli/locales` (`npm run i18n:check-keys:cli`); ambos pasos viven en el trabajo `i18n-ui-coverage`.

#### Puerta `check-new-key-coverage` — con llave nueva i18n

Hermano de `check-ui-value-drift`. Ese capta un valor en inglés que era** reescrito** mientras sus traducciones quedaron atrás; este atrapa una clave en ingles que estaba** agregado** mientras que algunos locales nunca lo recibieron.

`check-ui-keys-coverage` no puede ver esta clase: aplica un porcentaje mínimo por ubicación, y once claves ausentes de 13.000 ~ dejan la cobertura en 99,9%. Un porcentaje por idioma no puede expresar "esta función se envió sin traducir" — una función completa puede aterrizar en una nueva ubicación sin texto y nunca mover el número.

El incidente que codifica: la Fase 3 del Orchestration Canvas tradujo sus once claves en las 42 configuraciones regionales que existían en ese momento. Horas más tarde, el lote en idioma de la UE (#13044) llevó el repositorio a 51 configuraciones regionales y los nueve recién llegados (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nunca los recibieron. `deepMergeFallback` sustituye una clave ausente en inglés, por lo que el modo de falla fue UI sin traducir en lugar de UI — real en blanco y silencioso por construcción.

Como su hermano es** consciente de diferencias** , comparando el inglés en la base de fusión con el árbol de trabajo, por lo que las brechas preexistentes permanecen congeladas y la puerta no necesita migración para activarse.

**Un marcador `__MISSING__:<english>` no lo cumple (desde el 17/09/2026).** Solía ser el aplazamiento documentado — el tiempo de ejecución vuelve a corregir — en inglés hasta que ocho funciones PRs el 16 de septiembre de 2026 agregaron 61 claves y sellaron el marcador en las 65 configuraciones regionales en lugar de traducir: esta puerta aceptó todas, nada bloqueó el PRs y la puerta de bloqueo de relación de traducción real luego falló en el consejo de liberación para todos (pt-BR 3.2 % > 2.5 % + 0,5). Un marcador ahora se considera una traducción ausente. Corrige un rojo con `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, o todas las configuraciones regionales en paralelo con `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, se niega a iniciar sin el entorno `OMNIROUTE_TRANSLATION_*` ). Una clave que debe permanecer en inglés (un nombre product/engine/flag fijado) pertenece a `scripts/i18n/untranslatable-keys.json`, nunca detrás de un marcador. `vi` prohíbe los marcadores por completo (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — puerta-de-prueba-estacionado

Un archivo en la lista `exclude` de `vitest.config.ts` es una prueba que no se ejecuta y parece cobertura para quien lea el árbol. Sesenta y dos archivos acumulados detrás del comentario `// #8618 — pre-existing failure; remove this exclusion when fixed`. El problema #8618 se cerró el 11 de agosto de 2026, mientras que la lista que rastreaba creció de 45 entradas a 62, cada una de las cuales heredó un comentario que apuntaba a un problema muerto. Cuando finalmente se midió la lista archivo por archivo (#13204),** 51 de los 62 pasaron contra el árbol actual sin cambio de fuente** .

La puerta requiere que cada exclusión que se resuelva en un archivo real (a) nombre un problema de seguimiento y (b) aparezca en `config/quality/vitest-exclusions.json` con su estado medido, por lo que agregar una es una diferencia revisable en un archivo dedicado en lugar de una línea más en una matriz de 60 entradas. Deliberadamente no vuelve a ejecutar las pruebas excluidas — que cuestan ~ 10 minutos y pertenecen a un trabajo periódico; los registros de inventario cuándo se midió cada uno por última vez.
