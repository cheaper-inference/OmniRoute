# CLI Integrations (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Para conocer el manifiesto ejecutable compartido, los entornos secundarios restringidos y la configuración persistente Gemini, consulte [contratos de lanzamiento CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute incluye una familia de comandos `setup-*` que configuran un CLI de codificación (Codex, Claude Code, OpenCode, Cline,…) para usar OmniRoute como su backend — para que la herramienta se comunique con** uno** rutas endpoint y OmniRoute al proveedor correcto con respaldo automático. Los comandos de configuración utilizan su contexto OmniRoute local o remoto activo y configuran la herramienta en** su** máquina. Las recetas basadas en catálogos obtienen modelos del servidor; Las recetas de modelo único aceptan `--model` o solicitan un modelo ID. Una variable de entorno hace referencia a la clave API siempre que la herramienta la admita. A continuación se detallan los comandos que persisten en un archivo de entorno local de herramienta.

El catálogo y los comandos de automatización cubren diferentes conjuntos de herramientas:

| Superficie                     | Contar | lo que significa                                                                              |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------- |
| Catálogo de herramientas       | 39     | Agentes y herramientas de codificación documentados, incluidas integraciones manuales y IDE   |
| `omniroute run <target>`       | 8      | Inicie adaptadores que proporcionen el punto final, las credenciales y el modelo del destino. |
| `omniroute configure <target>` | 12     | Recetas de configuración interactivas respaldadas por comandos `setup-*`                      |
| comandos `setup-*`             | 16     | Comandos de configuración registrados, incluida la configuración del editor guided/manual     |

Los recuentos reflejan el [manifiesto de la herramienta](../../config/cli-tools-manifest.json) y [el registro de comandos](../../bin/cli/commands/registry.mjs) el 17 de noviembre de 2026. Una entrada de catálogo no implica un adaptador de lanzamiento. Consulte el [catálogo de herramientas CLI](../reference/CLI-TOOLS.md) para ver el inventario completo.

También hay un lanzador genérico — `omniroute run <target>` — que genera `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` o `whycodes` con el entorno correcto inyectado, sin escribir ninguna configuración. Los objetivos y sus alias provienen del manifiesto canónico `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), y `omniroute completion` ofrece las mismas palabras de destino derivadas del manifiesto. `omniroute launch <tool>` inicia una herramienta de codificación compatible con un token de sesión por inicio y una lista de modelos creada a partir de los proveedores que conectó, e inicia automáticamente una puerta de enlace local cuando no se ejecuta ninguna (consulte [LAUNCH.md](./LAUNCH.md) ). Los lanzadores heredados por herramienta — `omniroute launch` sin nombre de herramienta (Claude Code) y `omniroute launch-codex` (Codex) — siguen estando disponibles.

La incorporación de proveedores está disponible desde el mismo contexto local/remote. Los siguientes comandos de API primero mantienen la autenticación de administración separada de las credenciales del proveedor y nunca imprimen una credencial en la salida estructurada:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para scripts, prefiera `--credential-stdin` o `--credential-env`; `--credential` se conserva para uso local controlado. `providers remove` requiere `--yes` en una terminal no interactiva, y los cinco comandos respetan el contexto activo o las opciones globales `--base-url`/`--api-key`.

Los selectores de proveedores rechazan prefijos ID, nombres o nombres de proveedores ambiguos; Utilice una conexión ID completa cuando coincidan varias conexiones. Los comandos de creación y edición leen la conexión guardada y la eliminación verifica que ya no sea legible. Una importación omite un par provider/name existente. Las entradas importadas no pueden anular el punto final de administración, el contexto o las credenciales de administración proporcionadas al CLI.

Para conocer la configuración básica escrita a mano por única vez de las dos integraciones más completas, consulte los análisis detallados por herramienta:

- [Configuración del código Claude](./CLAUDE-CODE-CONFIGURATION.md)
- [configuración Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modo remoto](./REMOTE-MODE.md) — conduce un OmniRoute remoto (VPS / Tailnet) desde su computadora portátil
- [VS Código Copilot Chat](./VSCODE-COPILOT.md) — la extensión OmniCopilot ; También puede ejecutar estos comandos `setup-*` desde dentro del editor.

---

## mesa maestra

Cada comando honra el** contexto activo** (configurado con `omniroute connect`, consulte [Modo remoto](./REMOTE-MODE.md) ) o indicadores `--remote <url> --api-key <key>` explícitos. "Local vs remoto" a continuación significa: sin indicadores, apunta `http://localhost:20128`; con `--remote` (o un contexto remoto activo) configura ese servidor como backend y escribe la configuración localmente. Las recetas basadas en catálogos también obtienen modelos de ese servidor.

| Dominio                    | Herramienta                                   | lo que escribe                                                                                                                                                                      | Banderas clave                                                                                                                             | Local versus remoto |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                              | `~/.codex/<name>.config.toml` — un perfil por modelo de texto compatible (`codex --profile <name>`)                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ambos               |
| `omniroute setup-claude`   | Código Claude                                 | `~/.claude/profiles/<name>/settings.json` — un perfil por modelo coincidente (`CLAUDE_CONFIG_DIR`)                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ambos               |
| `omniroute setup-opencode` | OpenCode (compatible con openai)              | Proveedor `~/.config/opencode/opencode.json` — `omniroute` con cada modelo de catálogo (`opencode -m omniroute/<model>`)                                                            | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ambos               |
| `omniroute setup-cline`    | Cline                                         | `~/.cline/data/{globalState,secrets}.json` (modo CLI ) + imprime la configuración de extensión del código VS                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ambos               |
| `omniroute setup-kilo`     | Código kilo                                   | `~/.local/share/kilo/auth.json` (CLI) + fusiona `kilocode.*` en VS Código `settings.json` si está presente                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ambos               |
| `omniroute setup-continue` | Continuar / `cn` CLI                          | Modelos `~/.continue/config.yaml` — `provider: openai`, clave vía `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos               |
| `omniroute setup-cursor`   | Cursor                                        | Nada — imprime los pasos en la aplicación (Cursor config es opaco SQLite)                                                                                                           | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ambos               |
| `omniroute setup-roo`      | Código Roo                                    | `~/.omniroute/roo-settings.json` (importar documento) + establece `roo-cline.autoImportSettingsPath` si existe un código VS `settings.json`                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ambos               |
| `omniroute setup-crush`    | Aplastar                                      | proveedor `~/.config/crush/crush.json` — `openai-compat`, clave a través de `$OMNIROUTE_API_KEY`                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambos               |
| `omniroute setup-zed`      | Zed                                           | Proveedor `~/.config/zed/settings.json` — `openai_compatible.omniroute` (modelos con capacidad para herramientas ≤ 25), clave a través de `$OMNIROUTE_API_KEY`                      | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Ambos               |
| `omniroute setup-goose`    | Ganso                                         | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + imprime la receta env                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos               |
| `omniroute setup-aider`    | ayudante                                      | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + imprime la receta env                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos               |
| `omniroute setup-qwen`     | Código Qwen                                   | `~/.qwen/settings.json` — V4 `modelProviders.openai` matriz + `OMNIROUTE_API_KEY` en `~/.qwen/.env`                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ambos               |
| `omniroute setup-gemini`   | Gemini CLI ( APIGemini nativo)                | selección y modelo de autenticación `~/.gemini/settings.json` — ; Clave `~/.gemini/.env` —, raíz del servidor y entorno Gemini                                                      | `--remote` `--context` `--api-key` `--model` `--yes` `--dry-run` `--port` `--gemini-home` `--settings-path` `--env-path`                   | Ambos               |
| `omniroute setup-5dive`    | 5dive (flota de agentes)                      | Nada bajo `$HOME` — escribe una 5dive** perfil de autenticación** (`/var/lib/5dive/auth-profiles/<name>/`) vía `5dive agent auth set`; solo raíz, se ejecuta en el host de la flota | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Ambos               |
| `omniroute setup-whycodes` | WhyCodes                                      | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); la ruta es `$WHYCODES_HOME/config.toml` o `~/.whycodes/config.toml`                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambos               |
| `omniroute run <target>`   | Lanzamiento en tiempo de ejecución (genérico) | Nada — genera `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` con el entorno y los argumentos correctos; Qwen y Gemini utilizan una casa aislada temporal    | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ambos               |
| `omniroute launch`         | Código Claude                                 | Nada — genera `claude` con `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` inyectado                                                                                                    | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ambos               |
| `omniroute launch <tool>`  | Cualquier herramienta ejecutable              | Nada en su propia configuración: configuración por inicio en un directorio temporal privado, un token de sesión                                                                     | `--model` `--all-models` `--list` `--remote` `--port` `--api-key` `--profile` `--dry-run` `--json`                                         | Ambos               |
| `omniroute launch-codex`   | OpenAI Codex CLI                              | Nada — genera `codex` con el proveedor `omniroute` inyectado a través de banderas `-c`                                                                                              | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ambos               |

Notas sobre banderas (verificadas en la fuente del comando):

- `--remote <url>` — usa un OmniRoute remoto (anula `--port` y el contexto activo). `--api-key <key>` proporciona la credencial para ese servidor (el valor predeterminado es `OMNIROUTE_API_KEY` env var o el token del contexto activo).
- `--only <patterns>` — subcadenas separadas por comas; mantenga solo el modelo IDs que coincida (por ejemplo, `--only glm,kimi`). Disponible en `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — imprime exactamente lo que se escribiría sin tocar el sistema de archivos. Disponible en todos los comandos `setup-*`** excepto** `setup-cursor` (que nunca escribe un archivo).
- `--model <id>` — requerido (o seleccionado interactivamente) para las herramientas que no tienen descubrimiento automático de modelo: Cline, Kilo, Roo, Goose, Qwen, Gemini, Aider, 5dive, WhyCodes. Esas herramientas también aceptan `--yes` para ejecuciones no interactivas (que luego requieren `--model`). `setup-opencode` toma `--model` para establecer el modelo de nivel superior predeterminado.
- `--model <id>` en `omniroute run` sigue el cableado por objetivo del manifiesto (`bin/cli/cli-manifest.mjs`):** ayudante** recibe `--model openai/<id>` y** código abierto** `--model omniroute/<id>` (el prefijo se agrega sólo cuando el id no lo lleva);** qwen** y** Géminis** recibir el documento de identidad textualmente;** claudio** lo obtiene a través de `ANTHROPIC_MODEL`,** ganso** vía `GOOSE_MODEL`,** códigos de por qué** vía `-P omniroute -m <id>`, y** códice** vía `-c model_providers.omniroute.*` args.**Qwen es el único objetivo de ejecución que requiere `--model`** — `omniroute run qwen` sin él sale de `2` con un error explícito.
- `--port <port>` — puerto OmniRoute local ( `20128` predeterminado, ignorado cuando se configura `--remote` ). Presente en todos `setup-*` y en ambos lanzadores.
- códigos de salida `omniroute run` : el propio código de salida del CLI secundario se propaga palabra por palabra; `2` = argumentos no válidos (objetivo no admitido, falta `--model` requerido, protección del contenedor); `127` = el binario de destino no está en `PATH`; `130`/`143`/`129` cuando el lanzamiento finaliza con `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = otro error al iniciar el tiempo de ejecución.
- Los dos lanzadores (`launch`, `launch-codex`) aceptan `--profile <name>` para seleccionar un perfil escrito por `setup-claude` / `setup-codex`, además de argumentos de paso para el binario `claude` / `codex` subyacente.

El selector interactivo también lo comparten las recetas de configuración:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
omniroute configure gemini
omniroute configure whycodes
```

`configure` actualmente delega en las recetas probadas para `codex`, `claude`, `opencode`, `qwen`, `gemini`, `aider`, `goose`, `cline`, `continue`, `kilo`, `5dive` y `whycodes`. Las entradas de catálogo solo IDE, MITM y solo guía siguen siendo flujos `setup-*`/manual explícitos y no se presentan como destinos iniciables.

> `setup-opencode` es el** ligero compatible con openai** integración OpenCode. También hay una integración de complementos más rica — `omniroute setup opencode` — que instala `@omniroute/opencode-plugin`. Son comandos diferentes; la tabla anterior documenta `setup-opencode`.
>
> El complemento viene en dos paquetes, uno por OpenCode major, porque los dos cargadores esperan puntos de entrada diferentes: `@omniroute/opencode-plugin` para OpenCode v1 y `@omniroute/opencode-plugin-v2` para OpenCode v2. El paquete v2 es nuevo (`0.1.0`) y sigue un contrato de host que aún se está moviendo, por lo que lee la forma OpenCode seeds en el borrador del catálogo en lugar de asumir una. Instálelo agregando una entrada `plugins` a `opencode.json`; `omniroute setup opencode` todavía instala el paquete v1. Las opciones y el orden de búsqueda de credenciales se encuentran en el paquete README.

---

## Uso local

Con OmniRoute ejecutándose en `localhost:20128`, simplemente ejecuta el comando de configuración para tu
herramienta. El catálogo se obtiene del servidor local.

```bash
# Codex: escribe un perfil por cada modelo coincidente en ~/.codex/
omniroute setup-codex
codex --profile glm52            # usa un perfil generado

# Claude Code: escribe perfiles por modelo y luego inicia uno
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: escribe el proveedor compatible con OpenAI con todos los modelos del catálogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # se referencia mediante {env:OMNIROUTE_API_KEY}, nunca se guarda en disco
opencode -m omniroute/glm/glm-5.2 "..."

# Las herramientas sin detección automática necesitan un modelo explícito:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Vista previa sin escribir nada:
omniroute setup-continue --dry-run
```

Inicia sin escribir ninguna configuración (solo mediante inyección de variables de entorno):

```bash
omniroute launch                 # Claude Code → OmniRoute local
omniroute launch-codex           # Codex CLI → OmniRoute local
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Ruta de comando explícita: pasa sin modificar todo lo que aparezca después de --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Uso remoto

Dirige cualquier comando de configuración a una instancia remota de OmniRoute con `--remote` + `--api-key`. El
catálogo se obtiene de la instancia remota; la configuración se escribe en tu máquina local.

```bash
# OpenCode contra un VPS remoto, conservando solo los modelos glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exporta OMNIROUTE_API_KEY primero

# Perfiles de Codex a partir de un catálogo remoto
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Inicia una CLI directamente contra la instancia remota
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

En lugar de pasar `--remote`/`--api-key` cada vez, inicia sesión una sola vez y permite que el
**contexto activo** los proporcione automáticamente:

```bash
omniroute connect 192.168.0.15        # genera un token con alcance limitado y almacena el contexto
omniroute setup-codex                 # ← ahora usa el catálogo remoto
omniroute setup-opencode              # ← igual
omniroute launch                      # ← Claude Code contra la instancia remota
```

Consulta [Modo remoto](./REMOTE-MODE.md) para obtener información sobre contextos, alcances y gestión de tokens.

---

## 5 flotas de agentes de buceo

[5dive](https://5dive.ai) ejecuta una flota de agentes de codificación de larga duración, cada uno de los cuales es una unidad systemd bajo su propio usuario de Unix. No es una codificación CLI en sí, por lo que no hay nada para que `omniroute run` lance — `5dive` es un** solo configurar** objetivo.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Ambas formas escriben una 5dive.** perfil de autenticación** , y cada asiento `claude` vinculado a ese perfil habla con OmniRoute. Tres cosas son específicas de este objetivo:

- **Se ejecuta en el host de la flota, como root.** Los verbos de 5dive actúan sobre unidades systemd locales y un directorio estatal de propiedad raíz; no hay modo remoto. La receta se vuelve a ejecutar a través de `sudo` cuando aún no es root (`--no-sudo` lo desactiva e imprime el comando en su lugar).
- **El punto final debe ser `https://` a menos que sea un bucle invertido.** La clave API del agente utiliza ese URL en cada solicitud, y 5dive rechaza un punto final fuera de caja de texto sin formato. Una dirección LAN privada no es una excepción.
- **El pin del modelo propio de cada asiento supera al perfil.** El perfil lleva `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, pero un asiento todavía fijado a una identificación de modelo original falla en su primer turno con _"Hay un problema con el modelo seleccionado"_. Pase `--agent <name>` (repetible) para fijar también los asientos; la receta imprime el comando cuando usted no lo hace.

La llave API se entrega a 5dive el** entrada estándar** (`--api-key=-`), por lo que nunca aparece en la salida `ps`.

Apuntando el perfil a un OmniRoute** combinación** en lugar de un solo modelo, es lo que logra la conmutación por error del proveedor de la flota: cuando el punto final principal falló a mitad de la ejecución registrada en [#11578](https://github.com/cheaper-inference/OmniRoute/issues/11578), el agente finalizó los pasos restantes en el respaldo y nunca reveló la interrupción.

---

## Convenciones básicas URL (qué herramientas quieren `/v1`)

OmniRoute expone la superficie OpenAI en `/v1`, la superficie Anthropic en la raíz y una superficie Gemini nativa en `/v1beta`. Cada integración está conectada a la forma que espera su herramienta (verificada en la fuente del comando):

| Integración                                                                | Base URL escrita | `/v1`?                                    |
| -------------------------------------------------------------------------- | ---------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | raíz             | No: Cline añade `/v1/chat/completions`    |
| `setup-goose` (`OPENAI_HOST`)                                              | raíz             | No: Goose añade la ruta                   |
| `setup-aider` (`OPENAI_API_BASE`)                                          | raíz             | No: LiteLLM añade `/v1/chat/completions`  |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | con `/v1`        | Sí                                        |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | con `/v1`        | Sí                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | raíz             | No: el código Claude añade `/v1/messages` |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | con `/v1`        | Sí                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | con `/v1`        | Sí                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | raíz             | No, la SDK añade `/v1beta/models/…`       |
| `setup-5dive` (`ANTHROPIC_BASE_URL` en el perfil de autenticación)         | raíz             | No: el código Claude añade `/v1/messages` |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | con `/v1`        | Sí — WhyCodes publica `/chat/completions` |

---

## Conservación de las dependencias nativas al actualizar: `--include=optional`

Cuando actualizas con `omniroute update` (después de confirmar o con `--apply`),
OmniRoute ejecuta la instalación con `--include=optional` incorporado:

```bash
npm install -g omniroute@latest --include=optional
```

Esta **no** es una opción que se pase a `omniroute update`; el actualizador siempre
la aplica. Garantiza que las `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client` y la pila SLM de LLMLingua) se conserven tras la actualización, incluso si la
configuración de npm tiene establecido `omit=optional`, lo cual, de otro modo, eliminaría
silenciosamente el controlador nativo de SQLite y la vinculación con el llavero del sistema operativo.
Para previsualizar el comando exacto sin aplicarlo:

```bash
omniroute update --dry-run
# [SIMULACIÓN] Se ejecutaría: npm install -g omniroute@latest --include=optional
```

Otras opciones de `omniroute update` (verificadas en el código fuente): `--check` (sale con código 1 si
está desactualizado), `--apply` (instala sin solicitar confirmación), `--changelog`, `--no-backup`,
`--yes`.

---

## CLI de Google Gemini mediante `omniroute run gemini`

Contrato verificado con `@google/gemini-cli` 0.50.0: la CLI respeta
`GOOGLE_GEMINI_BASE_URL` y envía `POST /v1beta/models/<model>:generateContent`
(y `:streamGenerateContent?alt=sse`) a esa URL, exactamente la interfaz nativa
de Gemini de OmniRoute (`/v1beta`). `omniroute run gemini` lo configura automáticamente:

- `GOOGLE_GEMINI_BASE_URL` → la URL base activa de OmniRoute (raíz, sin `/v1`);
- `GEMINI_API_KEY` → la credencial de OmniRoute resuelta (opción/entorno/contexto);
- un **`GEMINI_CLI_HOME` temporal y aislado**, cuyo `.gemini/settings.json`
  selecciona la autenticación `gemini-api-key`, para que una sesión OAuth de Google almacenada (Code Assist)
  nunca reemplace el inicio dirigido a OmniRoute; se elimina después de salir;
- **higiene del entorno**: se eliminan del entorno del proceso hijo `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` y `GOOGLE_GENAI_USE_GCA` (que redirigirían
  la autenticación a Vertex/Code Assist), y se establece
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` como medida de respaldo adicional; los demás
  destinos de `run` reciben el mismo tratamiento para sus propias variables conflictivas;
- inyección de `--model <id>` desde `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

La protección de confianza del espacio de trabajo de Gemini sigue aplicándose en modo sin interfaz:
pasa tú mismo `--skip-trust` (o marca el directorio como confiable de forma interactiva); el lanzador
deliberadamente no la omite. Este lanzador es distinto del **registro ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), que continúa siendo la integración
del protocolo de agentes para `/dashboard/acp-agents`.

---

## Barrido real de smoke tests (opcional)

Las ejecuciones deterministas de regresión del plan de lanzamiento se realizan en CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Para validar los binarios REALES contra un servidor
OmniRoute REAL, existe un entorno de pruebas opcional en
`tests/integration/upstream-cli-smoke.int.test.ts`. Nunca se ejecuta automáticamente
(cada subprueba se omite salvo que `RUN_CLI_SMOKE=1`), pasa la credencial mediante el NOMBRE
de una variable de entorno (nunca mediante su valor), censura las cadenas con formato de clave
en cualquier salida registrada, omite los objetivos cuyo binario no está instalado y clasifica
los fallos como autenticación / upstream / configuración en lugar de usar un simple booleano:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` limita el barrido;
`OMNIROUTE_SMOKE_TIMEOUT_MS` sustituye el tiempo de espera de 120 s por objetivo.

---

## Véase también

- [Configuración de Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — la guía detallada de Claude Code
- [Configuración de Codex CLI](./CODEX-CLI-CONFIGURATION.md) — la configuración base inicial de `[model_providers.omniroute]`
- [Modo remoto](./REMOTE-MODE.md) — contextos, tokens de acceso con ámbito y control de un servidor remoto
- [Referencia de herramientas de CLI](../reference/CLI-TOOLS.md) — el catálogo completo de herramientas compatibles y páginas del panel
- [Guía de configuración](./SETUP_GUIDE.md) — métodos de instalación e incorporación en la primera ejecución
