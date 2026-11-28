# Merge Queue & Manual Merge-Train Runbook (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Aterrizando en una rama de liberación

La omnicola gobierna los aterrizajes en `release/vX.Y.Z`. Lea el `mode` de nivel superior en `config/merge-queue/config.json` en la rama predeterminada antes de obtener un PR. Consulte [Omni-Cola](OMNI_QUEUE.md).

- **`shadow`** ejecuta la validación y deja el aterrizaje para una combinación manual. Aplicar `omni-queue` al PR aprobado en su altura final. Verifique la elegibilidad con `npm run queue -- why <PR>`. Espere el veredicto para ese jefe en `npm run queue -- history --base <branch>`. Continúe con `would-land`. En `culprit-found` o `would-dequeue`, mantenga la combinación y solucione la causa.
- **Excepciones de sombra.** Un tren con CI verde completo contra la punta base actual puede continuar sin un veredicto de cola separado. La misma excepción se aplica cuando el cabezal PR ya contiene la punta base actual.
- **`live`** utiliza la etiqueta `omni-queue` para activar el aterrizaje. La cola por sí sola aterriza el PR. Deje los comandos de combinación y los envíos directos a la cola.

Todo desembarque requiere la autorización del propietario y los controles correspondientes. Aplicar `omni-queue` sólo después de que el propietario haya autorizado el aterrizaje. PRs en cola que tocan rutas protegidas también requieren la decisión `protected-approved` del propietario para ese PR.

El conjunto de reglas "Requerir puertas verdes en la versión activa" requiere `Gate / CI` y `Gate / Quality` verdes en la cabeza. Nunca use `--admin` para evitar una puerta roja. Una liberación de bloques congelados se fusiona con la rama congelada. Véase [la regla estricta 21](HARD_RULES_DETAIL.md). Nunca etiquete, combine ni envíe una solicitud de extracción de que otra sesión está funcionando. Véase [la regla estricta 22](HARD_RULES_DETAIL.md).

## La solicitud de atracción del tren

1. Inicie una rama de tren en la punta de la base de lanzamiento actual. Integre los jefes de miembros aprobados exactos mediante confirmaciones de fusión. Preserve su historial de confirmaciones evitando el squash y el rebase.
2. Abra una solicitud de extracción para la rama del tren. Valide ese PR con su propio CI completo en la punta base actual. Vuelva a verificar la punta de la base y las cabezas de los miembros aprobados antes de aterrizar. Actualiza el tren y su CI cuando cambie el candidato validado.
3. Aterriza el tren PR con una confirmación de fusión en el modo de cola aplicable. En modo en vivo, el método de aterrizaje `merge-ff` de la cola conserva las confirmaciones de fusión. Los jefes de miembros originales se vuelven accesibles desde la rama de lanzamiento. GitHub marca al miembro PRs como fusionado y las confirmaciones conservan a sus autores.

Un ejemplo público es [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Combinó PRs de 18 miembros y aterrizó con un compromiso de fusión el 24 de noviembre de 2026.

Una sincronización de `main` a la siguiente rama de lanzamiento también se realiza a través de una confirmación de fusión. Es necesario preservar la ascendencia `main` para posteriores sincronizaciones. Consulte [Aislamiento del árbol de trabajo](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## El validador local de trenes de fusión

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

El validador busca las cabezas base y PR y las combina en un árbol de trabajo desechable. Ejecuta su suite de paridad una vez en el árbol resultante. Un conflicto de fusión o recuperación de cabecera fallido expulsa ese PR y el script continúa con el PRs restante.

- **`--plan`** imprime los pasos del modo seleccionado y sale sin crear un árbol de trabajo ni contactar el control remoto. Combínelo con `--fast` para inspeccionar el plan rápido.
- **`--fast`** ejecuta las puertas estáticas comunes, los archivos `node:test` modificados seleccionados en `tests/unit/` y `npm run test:vitest`. Ejecute una validación local completa al menos una vez al día en la propina acumulada cuando utilice el modo rápido.
- **Modo completo** Agrega las puertas estáticas completas y ejecuta `npm run test:unit` y `npm run test:vitest`.

Una puerta estática defectuosa se vuelve a ejecutar en la base intacta si la sonda de base está disponible. El script informa fallas heredadas y continúa cuando cada línea de infracción reconocida también aparece en la base y el recuento total no ha aumentado.

| Salida | Significado                                                                                                                                     |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Imprimió el plano o completó la suite. El resumen de la suite enumera cualquier falla estática heredada y PRs expulsado.                        |
| `1`    | Argumentos no válidos, falta de verificación de Git, verificación previa fallida o ningún PR abordado.                                          |
| `2`    | Una verificación de suite falló y no calificó como heredada. El operador puede dividir el lote, expulsar el PR infractor y volver a ejecutarlo. |

Un pase local proporciona pruebas de diagnóstico únicamente para el expediente del propietario. Cada aterrizaje aún requiere la autorización del propietario, sus propias verificaciones requeridas y el veredicto de la cola de espera cuando corresponda.

## niveles

- **Por PR.** CI y controles de selección de calidad basados en las rutas modificadas. Code PRs ejecuta puertas de calidad rápidas y pruebas impactadas, con trabajos unitarios y Vitest separados en CI.
- **Candidato por cola.** CI y Quality ejecutan el perfil completo del candidato compuesto en su cola ref.
- **Por consejo de lanzamiento.** Release-Green ejecuta puertas rápidas y duras al presionarlas que coinciden con sus filtros de ruta. Tres ejecuciones programadas por día utilizan el barrido completo para la rama de lanzamiento.
- **Por lanzamiento.** La matriz CI completa incluye fragmentos E2E, validación de paquetes, humo de arranque tarball y comprobaciones de cobertura. Consulte la [lista de verificación de liberación](RELEASE_CHECKLIST.md).

## Requisitos previos de pago nuevo para `merge-train.sh`

La verificación previa se ejecuta antes de crear árboles de trabajo. Instalar dependencias con `npm ci`. Confirme que `node_modules/.bin/tsc` sea ejecutable y que `node_modules/node_modules` esté ausente. Compruebe que `node_modules/.bin/bun --version` tenga éxito.

Si se omitió la postinstalación Bun, ejecute `(cd node_modules/bun && node install.js)`. Las comprobaciones de coherencia del proveedor y de símbolos conocidos utilizan Bun. El validador ejecuta `npm run check:cycles:ratchet` como puerta de bloqueo. El comando `npm run check:cycles` independiente es de asesoramiento.

## Historia

La cola de fusión Mergify se retiró el 19/11/2026.
