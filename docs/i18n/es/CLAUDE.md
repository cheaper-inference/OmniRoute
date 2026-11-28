# CLAUDE.md (Español)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Todas las reglas del proyecto viven en [`AGENTS.md`](AGENTS.md)** — la única fuente de información para cada asistente AI ; la importación anterior ya lo carga. No vuelva a agregar reglas del proyecto aquí. Todo lo siguiente se aplica ONLY a Claude Código — refinamientos operativos de reglas ya definidas en `AGENTS.md`.

## Aislamiento del árbol de trabajo — Claude Detalles del código

- Confirma la sucursal base con el operador a través de `AskUserQuestion` (Hard Rule #19) a menos que ya te lo hayan dicho.
- Cree el árbol de trabajo con `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (termina bajo `.claude/worktrees/`, vincula `node_modules` y copia `.husky/_`), luego llame `EnterWorktree` con su `path`. Pase siempre la base: sin ella, el script elige el `release/*` más alto, que puede no ser el que confirmó el operador. Un árbol de trabajo que `EnterWorktree` crea por sí mismo no tiene enlaces duros ni ganchos, por lo que no se ejecuta ninguna puerta de confirmación previa.

## Subagentes y git

Cada subagente que toca git (herramienta de agente o secuencia de comandos de flujo de trabajo) obtiene `git stash` ban de la regla estricta #22 a palabra por palabra en su mensaje — la recurrencia registrada del incidente del alijo se produjo a través de un subagente.

## Anulación de rutas de superpoderes — de artefactos de planificación

Las habilidades de superpoderes anuncian valores predeterminados en `docs/superpowers/plans/`, `docs/superpowers/specs/` y `docs/research/`. Vuelva a escribir cada uno en su `_tasks/` equivalente en `AGENTS.md` → "Artefactos de planificación e investigación" antes de escribirlos y confírmelo con `git -C _tasks …`, nunca en el repositorio principal.

## Archivos borrador — `_artifacts/`, no `/tmp`

Este proyecto anula el área reutilizable de sesión del arnés (`/tmp/claude-*/…`). Escriba archivos temporales, exportaciones —, zips generados, salidas intermedias únicas — a `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: una ruta raíz `_*` ignorada por git, para que el operador encuentre y elimine todos los scratch en un solo lugar. Los planes duraderos, las especificaciones, la investigación y las transferencias van a `_tasks/` (regla estricta #23).

## fondo rojo

Para drenar un estado rojo acumulado (punta base + red PRs), use la habilidad `/sweep-reds`.
