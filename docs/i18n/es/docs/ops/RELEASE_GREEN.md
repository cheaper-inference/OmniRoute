# Release-Green: candidate validation and evidence (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green observa una confirmación específica e informa los resultados de su validación. La [referencia de Quality Gates](../architecture/QUALITY_GATES.md) define los perfiles CI actuales, las comprobaciones requeridas y la política de aceptación. La política de admisión versionada en `config/quality/admission-policy.json` es el contrato ejecutable para `Gate / CI` y `Gate / Quality`.

## CI y alcance del observador

`ci.yml` y `quality.yml` cubren las solicitudes de extracción en las ramas principal y de lanzamiento. El perfil seleccionado determina qué trabajos se aplican. Full CI también incluye carriles que una solicitud de extracción ordinaria no ejecuta. Un resultado de observador rápido no puede reemplazar esos trabajos, y un contenedor de flujo de trabajo completo no puede reemplazar sus recibos.

La estructura de producción pertenece a CI. No hay ninguna compilación de aviso duplicada en `quality.yml`. Los artefactos faltantes, el trabajo cancelado y las mediciones incompletas no establecen una verificación requerida exitosa. Confirme la base actual, el jefe y el candidato combinado antes de aceptar los resultados.

## Validación local

Ejecute el observador en un árbol de trabajo propio después de preparar sus dependencias. Siga el árbol de trabajo y el protocolo de recursos en `docs/ops/WORKTREE_ISOLATION.md` antes de una validación exhaustiva.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

El perfil rápido es parcial. El perfil completo verifica sus requisitos modelados y conserva los recibos de mando; no certifica la implementación ni sustituye las comprobaciones alojadas aplicables. El informe distingue el error de ejecución del desvío de métricas. Los trinquetes requeridos permanecen bloqueando según la política seleccionada. No eleve una línea de base simplemente para obtener un resultado de aprobación.

## Barridos nocturnos y manuales

Los solucionadores de compatibilidad y lanzamiento nocturno seleccionan una rama de lanzamiento canónica. Esa selección debe coincidir con la rama que desencadenó el flujo de trabajo y las suites usan el SHA inmutable del evento. Para la ejecución manual, seleccione la versión deseada en `release_branch` y envíela en esa misma referencia:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

El envío entre sucursales se rechaza antes de ejecutar el código seleccionado. Las suites principales alojadas verifican `main` y verifican que su SHA aún coincida con el objetivo resuelto antes de la instalación. Si el principal se mueve durante la resolución, vuelva a ejecutar el barrido incompleto en la nueva confirmación. No combine recibos de suite de diferentes candidatos.

## Clasificación y recuperación de fallos

Utilice el incidente como índice de diagnóstico y luego inspeccione la ejecución, el intento, el paso fallido y el artefacto exactos. Compare la evidencia base y candidata equivalente antes de atribuir una falla a un contribuyente. Los errores de infraestructura, los defectos heredados, las regresiones de candidatos y las aprobaciones pendientes requieren soluciones diferentes.

Las habilidades `/green-prs`, `/sweep-reds`, `/validate-release-green` y `/babysit` recopilan evidencia y preparan correcciones dentro de su alcance documentado. Mantenga el crédito del colaborador, utilice sucursales de reparación aisladas y verifique todas las comprobaciones requeridas antes de una fusión autorizada. Ninguna línea de base automática ni cierre de incidentes sustituye a un candidato actual aprobado.
