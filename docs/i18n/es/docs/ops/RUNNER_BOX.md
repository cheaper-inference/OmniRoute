# Self-Hosted Runner Box Operations (.113 pool) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

El pool autohospedado se ejecuta en el equipo **.113** (`tomni-proxmox-113`). Desde el 2026-10-18, cada
runner de OmniRoute tiene **un rol**, una etiqueta y un presupuesto de memoria/CPU dimensionado según lo medido
para su carga de trabajo. El slot de Turbopack recibe los recursos que necesita la compilación; los demás slots están dimensionados según sus
picos medidos. El equipo solo sobreasigna recursos cuando una compilación de Turbopack coincide con una compilación
webpack de Release-Green y un trabajo de lint; el swap del host (16 GB) absorbe esa carga y, dado que las compilaciones de pull requests se ejecutan
en runners alojados, el slot de Turbopack permanece inactivo la mayor parte del tiempo:

| runner               | etiqueta       | rol                                                                                                                                                                     | `MemoryHigh` / `MemoryMax` | `CPUQuota`     |
| -------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------- |
| `omniroute-113-5`    | `omni-build`   | Compilaciones de Turbopack: `ci.yml` `Build` (solo push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, la compilación nocturna de a11y | 56 GB / 60 GB (swap 0)     | 1600 %         |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), compilación webpack                                                                                                     | 20 GB / 24 GB (swap 4 GB)  | 800 %          |
| `omniroute-113-2`    | `omni-light`   | trabajos nocturnos (Schemathesis, promptfoo, garak, k6) y `quality.yml` `lint-guard`                                                                                    | 12 GB / 16 GB (swap 4 GB)  | 600 %          |
| `omniroute-113`      | `omni-light`   | el mismo pool que el anterior                                                                                                                                           | 8 GB / 12 GB               | 400 %          |
| OmniHeuris, OmniMind | (sus repos)    | Solo Dependabot (pico de 155 MB cada uno, 2026-10-18)                                                                                                                   | 4 GB / 6 GB                | 200 % cada uno |

Mediciones del 2026-10-18:

| recurso   | valor                               | qué significa para la planificación                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32 núcleos**              | una compilación de producción de Turbopack alcanzó un pico de 49 GB sin límites (`tests/unit/ci-build-bundler-webpack.test.ts`); en Next 16.3.8, solo la fase de compilación mantiene ~40 GB (36 GB de RSS en `next-build` más 17 workers del loader a 3 GB, medido el 2026-10-18); una compilación webpack usa ~14–16 GB. Una compilación de Turbopack y una de webpack caben juntas; dos compilaciones de Turbopack no |
| swap      | 16 GB                               | `omniroute-113-5` se ejecuta con el swap desactivado (`MemorySwapMax=0`), de modo que una compilación descontrolada se termina al alcanzar su límite en lugar de hacer que el equipo use swap                                                                                                                                                                                                                            |
| `/tmp`    | **12 GB tmpfs = RAM**               | todo lo que se almacene allí consume memoria; los residuos se eliminan después de 3 h                                                                                                                                                                                                                                                                                                                                    |
| CPU       | carga de 60 observada en 32 núcleos | antes de las cuotas, una compilación de Turbopack (~1166 % de CPU) más una suite de cobertura en el mismo equipo privaban de recursos a los latidos de los demás listeners (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                         |
| runners   | **7 listeners** (2026-10-28)        | 5 de OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` también lleva `omni-build`; `omniroute-113-3/-4/-8` se eliminaron del repositorio (2026-10-28)                                                                                                                                                                                                                                                                 |

Los límites se encuentran en el archivo `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
de cada unidad (los valores anteriores se conservaron como `override.conf.bak-20261018`) y se aplicaron en vivo con
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…`, sin reiniciar, por lo que no se
afectó ningún trabajo en ejecución. Las etiquetas se cambian mediante la API de runners (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`), también en vivo.

## Instalar el janitor (una sola vez, en la máquina)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): cada 30 min, registrar en /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

Se requiere `lsof`: el janitor comprueba que una ruta está inactiva mediante una instantánea de los archivos
abiertos antes de eliminarla y, sin la herramienta, no elimina nada e informa de ello
(exit 1). Pruebe primero cualquier cambio con `--dry-run`: muestra exactamente lo que haría
y no modifica nada.

Qué hace en cada ejecución: limpia nuestros propios residuos (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) después de **3 h en tmpfs** y 24 h en
`_work/_temp` en disco; finaliza un `next-build` con más de 75 min de antigüedad (ningún trabajo tarda tanto; el
2026-08-27, uno se ejecutó durante 70 min después de que GitHub declarara perdido su trabajo); elimina checkouts
con 48 h de antigüedad de runners cuya unidad esté **detenida**; alerta cuando el uso de disco es ≥ 85 %, el PSI
de memoria `full/avg60` es ≥ 10 % y hay más listeners que `MAX_ACTIVE_RUNNERS` (con un
desglose de omniroute/otros). Exit 1 = se requiere atención; consulte el registro.

La regla de 75 minutos no detecta una compilación cuyo trabajo GitHub ya haya abandonado. Cuando
`Runner.Listener` no puede renovar su trabajo, `_diag/Runner_*.log` muestra
`POST request to …/renewjob timed out after 100 seconds`, la API informa que el trabajo está `completed`
(`failure`) unos diez minutos después de la última renovación correcta, y `next-build` sigue ejecutándose
sin ningún trabajo asociado (2026-10-18: el Build de #17066 falló a las 19:43 y su compilación todavía
ocupaba 40 GB cinco minutos después). Confirme la referencia en el archivo `_diag/Worker_*.log` más reciente y, a continuación,
envíe SIGTERM únicamente al árbol de procesos de compilación mediante PID: `next-build`, `npm run build`, `build-next-isolated.mjs` y
los workers de `_work`. Nunca toque `Runner.Listener`, `RunnerService.js` ni `Runner.Worker`: el
worker informa que el trabajo se ha cancelado y el listener vuelve a estar en línea por sí solo.

## Unidades de runner: KillMode

El valor predeterminado `KillMode=process` del runner deja
`Runner.Worker → npm → next-build` en ejecución cuando se detiene o reinicia una unidad: una compilación
huérfana sigue consumiendo RAM y CPU sin ningún trabajo asociado. Cada unidad de OmniRoute incluye un drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
con `KillMode=mixed`: primero se envía SIGTERM al listener y, al alcanzarse
`TimeoutStop`, se envía SIGKILL a todo el cgroup. Entra en vigor en el siguiente reinicio de la unidad: reinicie **un runner a
la vez, solo cuando esté inactivo**, con la comprobación de inactividad y el reinicio en el mismo comando.

## Reglas operativas

- **Una compilación de Turbopack a la vez — aplicada mediante una etiqueta.** Cada job que ejecuta un
  `next build` completo con Turbopack se dirige a `[self-hosted, omni-build]`, y solo
  **`omniroute-113-5`** tiene esa etiqueta: `ci.yml` `Build`, `npm-publish.yml` `publish`,
  `nightly-v4-build`, `preview-artifact`, la compilación nocturna de a11y (#16853) y
  `docker-publish.yml` **amd64** (webpack dentro de BuildKit — Turbopack entró en pánico allí,
  ejecución 33253576569). La etapa arm64 de Docker permanece en `ubuntu-24.04-arm`.
  `docker-publish` amd64 comparte el grupo de concurrencia `heavy-build-main` con `ci.yml` `Build`
  (`cancel-in-progress: false`). Docker Engine debe estar en `omniroute-113-5`. Un segundo turno
  de Turbopack no cabe en 78 GB (2 × 33–37 GB más el resto de la máquina); un segundo turno solo
  es seguro para compilaciones con webpack.
- **Las compilaciones de pull requests se ejecutan en infraestructura hospedada (2026-10-18).**
  `ci.yml` `Build` llega a `omni-build` solo para `push` y `workflow_dispatch`; cada compilación
  `pull_request` (del propio origen o de un fork) y `merge_group` se ejecuta en `ubuntu-latest`
  con webpack. Cuando cada PR del propio origen se dirigía al turno, una compilación de Turbopack
  lo ocupaba entre 29 y 58 min, 18 compilaciones quedaron en cola durante hasta 18 h y la
  compilación push de la propia rama de lanzamiento consiguió el turno una vez entre 40 jobs.
  En la infraestructura hospedada, la misma compilación del PR tarda entre 8 y 12 min junto a los
  demás jobs del PR. Turbopack, el empaquetador que distribuye `npm-publish`, sigue probándose en
  la rama de lanzamiento mediante la compilación nocturna de a11y de la rama predeterminada
  (04:41 UTC), mediante cada compilación push o dispatch que llega al turno y mediante el propio
  `npm-publish`. `tests/unit/build/heavy-build-queue.test.ts` fija la condición de cuatro
  cláusulas.
- **Nunca asignes al turno de Turbopack menos recursos que los necesarios según las mediciones.**
  El 2026-10-18 a las 18:06, el turno se redujo de 56G/60G a 40G/44G para dejar espacio a
  `omni-release`. La fase de compilación permaneció en `MemoryHigh` durante toda la ejecución
  (PSI de memoria `full` del 30–43 %) y `Runner.Listener`, que comparte el cgroup, no pudo renovar
  su job. Los 56G/60G del propietario del 2026-10-17 se restauraron ese mismo día. Por debajo de
  ese valor, la compilación no falla: entra en thrashing y se pierde el job.
- **Release-Green tiene su propio turno (2026-10-18).** Hasta entonces, ambas validaciones de
  Release-Green se ejecutaban en `omni-build`: en cada push (~10/hora; 97 de 100 ejecuciones push
  canceladas a mitad del trabajo en un día) y en tres barridos completos de ~2 h al día (el
  barrido de las 05:29 esperó 6 h por el turno); el único turno de compilación estaba
  sobresuscrito varias veces por encima de su capacidad y las compilaciones de PR del propio
  origen esperaban durante horas. `release-green` y `main-green` ahora se dirigen a
  `omni-release` (solo `omniroute-113-6`) con `OMNIROUTE_USE_TURBOPACK=0`, y una ejecución ya
  iniciada no se cancela por un push más reciente (el turno pendiente sigue colapsando la
  avalancha). `tests/unit/build/runner-capacity-routing.test.ts` fija el enrutamiento, el cambio
  a webpack y que nada en `omni-release` se compile con Turbopack.
- **Pool ligero: `omni-light`.** `omniroute-113` y `omniroute-113-2` ejecutan los procesos
  nocturnos que necesitan un `next build` solo del backend (~5–6 GB; webpack) y `quality.yml`
  `lint-guard`. `omniroute-113` tenía `MemoryHigh=4G` hasta el 2026-10-18; la compilación de
  promptfoo pasó 54 minutos recuperando memoria allí; 8 GB eliminan la limitación.
- **Menos listeners a propósito.** Cuatro unidades de OmniRoute se deshabilitaron el 2026-08-29:
  cada listener adicional es otro inquilino para el presupuesto de memoria anterior. El límite
  del janitor es 8 (`MAX_ACTIVE_RUNNERS=8` en cron): cuenta cada `Runner.Listener` de la máquina,
  y OmniHeuris + OmniMind añaden dos a nuestros cinco.
- **Los trabajos de unit y Vitest siguen alojados.** `ci.yml` envía sus shards de unit y el trabajo de Vitest a `[self-hosted, omni-ci]` solo cuando la variable del repositorio `vars.USE_VPS_TEST_RUNNER` es `true`, y aun así solo para ejecuciones de `pull_request` del mismo repositorio; los forks, `merge_group` y los pushes se quedan en `ubuntu-latest` (`tests/unit/vps-runner-variable-scope.test.ts`). La variable es `false`. El 2026-10-28, tres listeners `omni-ci` de 4 núcleos tardaron 250–270 s en `npm ci` y todos los shards de unit alcanzaron el límite de 30 minutos por trabajo, frente a ~634 s de un shard alojado, con la máquina a carga 17–24. Los listeners se eliminaron. No vuelvas a activar la variable sin listeners dimensionados para un shard de unit.
- **Nunca limpies `/tmp` ni `_work` manualmente mientras algún runner esté ocupado.** Una
  comprobación seguida de una eliminación, con un intervalo entre ambas, provocó que un job
  `Build` activo perdiera su `_work` el 2026-08-27. El janitor realiza la comprobación y la
  eliminación en un solo paso; deja que lo haga.
- Detener un runner a mitad de un job cancela el job (observado en directo): usa `systemctl stop`
  solo cuando su listener no tenga ningún proceso hijo `Runner.Worker`, y hazlo con un solo
  comando.
- Los workflows no deben almacenar artefactos en `/tmp` (está en RAM). Descárgalos en
  `$RUNNER_TEMP` (en disco, por runner): el artefacto `next-build` de 1.3 GB tardó entre 27 y 32
  minutos en guardarse en tmpfs y 2 minutos en subirse desde el disco.
- El VPS `.15` es solo para homologación; nunca ejecuta runners de CI.

## Canal alojado (runners alojados en GitHub)

El repositorio pertenece a la organización `cheaper-inference`, en el plan **Team**: **60 trabajos alojados simultáneos**, compartidos por todos los repositorios de la organización, todas las comprobaciones de PR, todos los workflows activados por push y la configuración predeterminada de CodeQL. Las cifras siguientes se midieron en el plan **Pro** (40 trabajos alojados simultáneos). Medido el 2026-10-18 durante una
campaña de fusiones (~10 fusiones/hora en `release/v3.8.52`): **2.500 ejecuciones de workflows creadas en
24 h**, 44 pushes a la rama en 6 h, **106 trabajos alojados en cola** mientras las comprobaciones de PR esperaban durante
horas y los PR se fusionaban sin ellas. Nueve workflows se activaban con cada push a la rama:

| por push a `release/v*`                            | trabajos alojados | resultado durante la saturación                                | desde 2026-10-18                                                                           |
| -------------------------------------------------- | ----------------: | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ci.yml` (matriz completa)                         |          hasta 30 | cancelado por el siguiente push, 24 de 24 en un día            | no se inicia con pushes a `release/**` (ejecución de PR + Release-Green)                   |
| `quality.yml`                                      |                ~6 | cancelado, 23 de 23                                            | no se inicia con pushes a `release/**`                                                     |
| `Release-Green` `--quick`                          |                 0 | se ejecutó en `omni-build`, 97 de 100 cancelados               | ranura `omni-release`, nunca se cancela, la ejecución pendiente se agrupa                  |
| `Lock released branch`, `OpenSSF Scorecard`        |                 2 | una ejecución en cola por push                                 | una ejecución por ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)                 |
| `Release acceptance` (informe paralelo)            |                 1 | un `npm ci` alojado por push, nunca cancelado                  | sin cambios — candidato para un filtro `paths:`                                            |
| `Publish to Docker Hub` → `Deploy to VPS`          |                 2 | cancelado en cada push; la etapa amd64 compite en `omni-build` | sin cambios — canal de despliegue del propietario                                          |
| Configuración predeterminada de CodeQL (`dynamic`) |                 4 | `javascript-typescript`, `actions`, `c-cpp`, `python` por push | sin cambios — Configuración → Seguridad del código; `c-cpp`/`python` no analizan nada aquí |

`tests/unit/build/push-storm-diet.test.ts` fija que el activador por push de `ci.yml` y
`quality.yml` sea exclusivo de `main`. Efecto secundario: Codecov ya no recibe una carga base por cada push de release (el
paso es informativo y usa `continue-on-error`); el control de cobertura dentro del repositorio y el comentario del PR no
se ven afectados.

**Más capacidad autoalojada no soluciona la cola alojada.** La máquina de desarrollo
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) podría alojar un runner, pero las sesiones de los agentes ya
mantienen su carga entre 20 y 26, el contenedor de los agentes no tiene un daemon de Docker y el canal saturado es
el alojado. La máquina `.113` tenía 71 GB libres y una carga de 5–8 en ese mismo momento; su limitación
es el presupuesto de memoria por listener indicado anteriormente (máximo de 6 listeners), no la CPU. Las opciones
restantes son de proceso: integrar los PR de la campaña mediante la cola de Mergify (`label=queue`; los lotes comparten
una ejecución de CI de `merge_group` en lugar de una ejecución por PR más otra por push), reducir los lenguajes de la
configuración predeterminada de CodeQL y filtrar `release-acceptance.yml` según los archivos que lee.
