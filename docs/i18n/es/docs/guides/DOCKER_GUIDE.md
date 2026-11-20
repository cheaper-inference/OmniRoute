# 🐳 Docker Guide — OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referencia completa para el despliegue con Docker. Para comenzar rápidamente, consulta la [sección de Docker del README](../README.md#-docker).

## Tabla de contenidos

- [Ejecución rápida](#quick-run)
- [Con archivo de entorno](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Perfiles disponibles](#available-profiles)
- [Configuración de herramientas CLI del host cuando OmniRoute se ejecuta en Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Contenedor auxiliar de Redis](#redis-sidecar)
- [Compose para producción](#production-compose)
- [Etapas del Dockerfile](#dockerfile-stages)
- [Variables de entorno críticas](#critical-environment-variables)
- [Docker Compose con Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Túnel rápido de Cloudflare](#cloudflare-quick-tunnel)
- [Etiquetas de imagen](#image-tags)
- [Actualizaciones del panel en Docker](#dashboard-updates-in-docker)
- [Disponibilidad: SQLite predeterminado admite una sola réplica](#availability-default-sqlite-is-single-replica)
- [Errores regionales de Gemini dentro de Docker](#gemini-regional-errors-inside-docker)
- [Notas importantes](#important-notes)

---

## Ejecución rápida

> **¿Autohospedaje en un solo comando?** Consulte la [Guía de autohospedaje](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (imagen publicada + Redis, solo bucle invertido, sin opción de perfil). La ejecución rápida a continuación es la ruta de contenedor único para los usuarios que ya ejecutan Redis en otro lugar.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Con archivo de entorno

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Docker Compose

```bash
# Perfil base (sin herramientas CLI)
docker compose --profile base up -d

# Perfil CLI (Claude Code, Codex y OpenClaw integrados)
docker compose --profile cli up -d

# Perfil de host (principalmente para Linux; monta los binarios CLI del host en modo de solo lectura)
docker compose --profile host up -d

# Perfil web (Chromium/Playwright para proveedores de sesiones web)
docker compose --profile web up -d

# Combinar CLI + contenedor auxiliar de CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Perfiles disponibles

OmniRoute incluye perfiles de Compose para las principales modalidades de despliegue. Elige el que se adapte a tu entorno.

| Perfil                  | Servicio         | Cuándo usarlo                                                                                                                                                  | Comando                                      |
| ----------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predeterminado) | `omniroute-base` | Servidor sin interfaz gráfica / entorno de ejecución mínimo, sin CLI de proveedores incluidas                                                                  | `docker compose --profile base up -d`        |
| `cli`                   | `omniroute-cli`  | Flujos de trabajo con agentes que llaman a `omniroute providers/setup/doctor` y a las CLI incluidas (Codex, Claude Code, Droid, OpenClaw)                      | `docker compose --profile cli up -d`         |
| `host`                  | `omniroute-host` | Hosts Linux que necesitan un acceso similar a `network_mode` a las CLI del host montando `~/.local/bin`, `~/.codex`, `~/.claude`, etc. en modo de solo lectura | `docker compose --profile host up -d`        |
| `cliproxyapi`           | `cliproxyapi`    | Ejecuta el contenedor auxiliar de [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) en el puerto `8317` para el proxy de CLI ascendente              | `docker compose --profile cliproxyapi up -d` |
| `web`                   | `omniroute-web`  | Proveedores de sesiones web que necesitan un navegador: `gemini-web`, `claude-web`, `claude-turnstile` (compila `runner-web`, con Chromium incluido)           | `docker compose --profile web up -d`         |

> Se pueden combinar varios perfiles: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configuración de herramientas CLI del host cuando OmniRoute se ejecuta en Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` y el botón
**Guardar configuración** del panel escriben archivos como `~/.codex/*.config.toml`. Esas rutas
solo tienen significado en la máquina donde realmente se ejecuta la CLI. Si estos comandos se ejecutan dentro
del contenedor, la escritura se realiza en el directorio principal del propio contenedor (`/home/node` —
la imagen se ejecuta con `USER node`), donde ninguna CLI del host los leerá jamás y donde se
descartan en cuanto se vuelve a crear el contenedor.

OmniRoute detecta esta situación y rechaza la escritura mostrando instrucciones, en lugar de
informar de un éxito que no se puede aprovechar: la CLI termina con el código `2` y la API responde con `422`
y `containerEphemeralTarget: true`.

### Recomendado: ejecutar la CLI en el host y OmniRoute en Docker

El contenedor sirve la API; la CLI configura las herramientas del host.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # conecta la CLI al contenedor
omniroute setup-codex                      # escribe en el ~/.codex real del host
```

Esta es la opción adecuada cuando Codex, Claude Code, Cursor o herramientas similares se ejecutan en
el portátil, que es la configuración habitual.

### Alternativa: montar mediante bind los directorios de configuración del host (perfil `host`)

Si desea que el propio contenedor escriba la configuración del host, monte los
directorios en el contenedor y haga que `CLI_CONFIG_HOME` apunte a la raíz del montaje. El perfil `host`
ya hace esto:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

El montaje bind es lo que hace que la ruta sea fiable: OmniRoute lee
`/proc/self/mountinfo` y permite escrituras en rutas montadas (y en directorios
cuyos elementos secundarios sean montajes, que es exactamente la estructura de `/host-home` anterior), mientras
sigue rechazándolas en rutas no montadas.

### Vía de escape: configurar las propias CLI del contenedor (usar con moderación)

Cuando las CLI realmente se encuentran dentro del contenedor (el perfil `cli`), la escritura
es intencionada. Pase `--allow-container-write` a cualquier comando `setup-*`, o establezca
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para el servidor. La escritura se realiza
con una advertencia de que no sobrevivirá al contenedor.

> **Advertencia de seguridad: perfil `cli` + montaje de `docker.sock`.**
> El perfil `cli` monta mediante bind `/var/run/docker.sock` para que el actualizador
> automático del contenedor pueda volver a crear la pila mediante el daemon del host
> (`src/lib/system/autoUpdate.ts` comprueba la existencia de ese socket y omite la
> ruta de Docker cuando no está presente). Ese socket es **un límite de confianza
> equivalente a root en el host**: cualquier elemento que pueda acceder a él controla el daemon de Docker del host como
> root; puede crear, inspeccionar, detener y eliminar cualquier contenedor del host.
> Implicaciones:
>
> 1. **Nunca exponga a la red el puerto del perfil `cli`.** Publíquelo
>    en `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — un perfil `cli` accesible desde la LAN convierte cualquier RCE al nivel del panel en
>    un compromiso total del host.
> 2. **No monte mediante bind ningún directorio adicional del host en el perfil `cli`.**
>    El socket de Docker junto con cualquier montaje adicional proporciona al contenedor acceso completo
>    de lectura y escritura al sistema de archivos y a la configuración del host. Si necesita que una herramienta
>    acceda a un proyecto, ejecútela localmente con el binario de la CLI; no lo monte
>    en el contenedor `cli`.
>
> Si no necesita actualizaciones automáticas dentro del contenedor, no active el perfil `cli`
> (`COMPOSE_PROFILES=core,redis` o una variante más corta). Los demás perfiles no
> montan el socket de Docker.
>
> Consulte `docs/security/MITM-TPROXY-DECRYPT.md` (en git; no se compila en `/docs`) para conocer el modelo de amenazas relacionado
> con MITM, y `docs/security/SUPPLY_CHAIN.md` para conocer la cadena de procedencia de los binarios
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar de Redis

OmniRoute depende de Redis como respaldo para el limitador de solicitudes distribuido y la caché compartida. El servicio `redis` está **siempre definido** en `docker-compose.yml` (no está condicionado por ningún perfil) y se inicia junto con cualquier otro perfil.

| Detalle                    | Valor                                           |
| -------------------------- | ----------------------------------------------- |
| Imagen                     | `redis:7-alpine`                                |
| Nombre del contenedor      | `omniroute-redis`                               |
| Puerto interno             | `6379`                                          |
| Puerto del host (anulable) | `REDIS_PORT` (predeterminado: `6379`)           |
| Enlace del host (anulable) | `REDIS_BIND_HOST` (predeterminado: `127.0.0.1`) |
| Volumen                    | `omniroute-redis-data` → `/data`                |
| Comprobación de estado     | `redis-cli ping` (intervalo de 10s)             |

Variables de entorno relacionadas:

- `REDIS_URL` — cadena de conexión inyectada en la aplicación (`redis://redis:6379` de forma predeterminada).
- `REDIS_PORT` — asignación del puerto del host para el contenedor de Redis.
- `REDIS_BIND_HOST` — interfaz del host en la que se publica el puerto. El valor predeterminado es `127.0.0.1`.

> **Por qué se usa la interfaz de bucle local de forma predeterminada:** el sidecar se ejecuta sin `requirepass`, y los contenedores
> de la aplicación acceden a él a través de la red de Compose (`redis:6379`); el puerto publicado
> solo está disponible para herramientas del host (`redis-cli`, un `npm run dev` local). Publicarlo en
> `0.0.0.0` expondría un Redis sin autenticación a todos los hosts de la red LAN. Si establece
> `REDIS_BIND_HOST=0.0.0.0`, añada también `--requirepass` al `command:` del servicio.

**No se recomienda deshabilitar Redis** (el limitador de solicitudes pasará a usar una alternativa en memoria con funcionalidad reducida). Si es imprescindible, elimine o comente el bloque del servicio `redis:` en `docker-compose.yml`, o escálelo a cero:

```bash
docker compose up -d --scale redis=0
```

## Compose de producción

Para ejecutar una instantánea de producción aislada junto al entorno de desarrollo, use `docker-compose.prod.yml`.

| Detalle                         | Valor                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| Archivo                         | `docker-compose.prod.yml`                                                                   |
| Puerto predeterminado del panel | `PROD_DASHBOARD_PORT=20130` (asignado al puerto interno `${DASHBOARD_PORT:-20128}`)         |
| Puerto predeterminado de la API | `PROD_API_PORT=20131`                                                                       |
| Imagen                          | `omniroute:prod` (creada desde el objetivo `runner-cli`)                                    |
| Contenedor de Redis             | `omniroute-redis-prod` (`redis:8.6.2`, volumen dedicado `redis-prod-data`)                  |
| Volumen de datos                | `omniroute-prod-data` (con nombre y persistente entre reconstrucciones)                     |
| Comprobaciones de estado        | `node healthcheck.mjs` + `redis-cli ping`, con `depends_on` condicionado al estado de Redis |

Cómo usarlo:

```bash
# Compilar e iniciar la pila de producción
docker compose -f docker-compose.prod.yml up -d --build

# Transmitir los registros
docker compose -f docker-compose.prod.yml logs -f

# Detener y eliminar la pila (conservar los volúmenes)
docker compose -f docker-compose.prod.yml down
```

La pila de producción se ejecuta en paralelo con el Compose de desarrollo (con nombres de contenedores, puertos y volúmenes diferentes), por lo que puede seguir realizando iteraciones localmente mientras producción permanece en ejecución.

## Etapas del archivo Docker

El repositorio incluye un Dockerfile de varias etapas (`Dockerfile`). Se exponen cuatro etapas; Elija el `target` adecuado para su caso de uso.

| Escenario     | Imagen básica         | Objetivo                                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala deps (`npm ci --legacy-peer-deps`) y ejecuta `npm run build` (Turbopack de forma predeterminada — consulte Recursos en tiempo de compilación a continuación)                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Tiempo de ejecución de producción con la salida independiente Next.js.** No se incluye ningún proveedor CLIs.**                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Agrega `git`, `docker.io`, `docker-compose` y CLIs global: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Elija esto para flujos de trabajo agentes.**                                                                                                                                    |
| `runner-web`  | `runner-base`         | Agrega Playwright + un navegador Chromium (`--with-deps`) para proveedores de sesiones web: `gemini-web`, `claude-web`, `claude-turnstile`.** Elija esto cuando utilice esos proveedores** — la imagen simple falla en el momento de la solicitud sin ella (consulte la nota `-web` en Canales de lanzamiento). |

Cree un objetivo específico manualmente:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Recursos en tiempo de construcción

Tres argumentos de compilación controlan el costo de la etapa `builder`. Son solo en tiempo de compilación — `OMNIROUTE_MEMORY_MB` (abajo) es una perilla de tiempo de ejecución separada.

| Construir argumento         | Por defecto | Efecto                                                                                                               |
| --------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` compila con webpack: memoria máxima más baja, más lenta. `1` opta por Turbopack.                                 |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | Techo de montón V8 (`--max-old-space-size`) para el `next build` generado.                                           |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Alimenta `CIRCLE_NODE_TOTAL`; A continuación se deriva `workers = N - 1` para la recopilación de datos de la página. |

`OMNIROUTE_BUILD_WORKERS` es el que debe aumentar en un gran constructor y el que sospecha cuando una construcción restringida muere** después** `✓ Compiled successfully`. Cada trabajador de datos de página es su propio proceso, al igual que el `next build` principal; una reproducción VPS en vivo (edición #7518) midió RSS máximo de cada proceso en ~ 4.5 GB independientemente del indicador del montón `NODE_OPTIONS` (Turbopack se compila en la memoria native/Rust fuera del montón V8). El valor predeterminado de `2` (→ 1 trabajador, 2 procesos en total) tiene un tamaño para los 16 GB /4 vCPU ejecutores alojados en GitHub que utiliza la canalización de publicación. En `8` (→ 7 trabajadores), ese corredor se quedó sin memoria y buildkit falló en el paso con `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 trabajadores) todavía no encajaba una vez que el RSS por proceso se midió directamente en lugar de inferirse. `tests/unit/docker-build-memory-budget.test.ts` hace la aritmética con la cifra medida y falla si cualquiera de las perillas supera al corredor.

Turbopack compila en la memoria nativa de Rust que vive** afuera** el montón V8, por lo que `OMNIROUTE_BUILD_MEMORY_MB` no lo vincula. En un host con un límite de memoria, la compilación es SIGKILLed por parte del OOM killer sin ningún texto de error — simplemente se detiene a mitad de `Creating an optimized production build`, lo que se lee como un bloqueo en lugar de falta de memoria. Es por eso que `Dockerfile` tiene como valor predeterminado webpack (`OMNIROUTE_USE_TURBOPACK=0`), a diferencia de `npm run dev` / `npm run build`, donde Turbopack es el código predeterminado: un `docker build .` simple sin argumentos de compilación (lo que ejecutan Railway y otros hosts de un solo clic) no debe morir silenciosamente en un constructor con memoria limitada. Las imágenes publicadas ya pasan `OMNIROUTE_USE_TURBOPACK=0` explícitamente en `docker-publish.yml`. En un constructor con mucho RAM, opte por Turbopack para una compilación más rápida:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` está habilitado, por lo que `next build` ejecuta un padre** y** un proceso de trabajo y cada uno respeta `OMNIROUTE_BUILD_MEMORY_MB` por separado. Dimensione el techo del contenedor por encima de aproximadamente el doble de ese valor, no una vez.

Medido en este árbol (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| empaquetador | Techo de contenedor | Resultado                                 |
| ------------ | ------------------- | ----------------------------------------- |
| Turbopack    | 8 GiB / 16 GiB      | OOM-mató a ambos, en silencio.            |
| paquete web  | 8 GiB               | construir trabajador SIGKILLed            |
| paquete web  | 12 GiB              | tuvo éxito, alcanzó un máximo de 11,1 GiB |

### Valores predeterminados de tiempo de ejecución

Valores predeterminados exportados por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamiento de la memoria en Docker:

- La imagen establece `OMNIROUTE_MEMORY_MB=1024` y deriva `NODE_OPTIONS=--max-old-space-size=1024` de ella.
- El proceso del servidor real lo inicia el iniciador independiente, que lee `OMNIROUTE_MEMORY_MB` y agrega `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utiliza el último valor `--max-old-space-size` repetido, por lo que configurar `OMNIROUTE_MEMORY_MB` controla el límite efectivo de montón Docker.
- Debido a que la imagen siempre lo establece, el respaldo calibrado por RAM del propio iniciador nunca se aplica bajo Docker. Auméntelo explícitamente para la carga de trabajo (tabla a continuación). `2048` todavía es demasiado pequeño para el agente de codificación `/v1/responses`.

### Runtime RAM para agentes de codificación

El valor predeterminado de 1 GiB Docker es un piso dashboard/light-chat, no un tamaño de producción. Los cuerpos `POST /v1/responses` largos (cientos de mensajes, decenas de herramientas) retienen múltiples gráficos en memoria durante la compresión. Dos solicitudes superpuestas de token ~ 3 MiB / ~ 750k han abortado V8 en un** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) y también alcanzó un cgroup OOM de 16 GiB. Ver [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tamaño** cgroup `--memory` encima del montón** Los buffers nativos —, SQLite y los intermedios de compresión se encuentran fuera de V8.

| Carga de trabajo                          | `OMNIROUTE_MEMORY_MB`          | Contenedor / grupo c | Notas                                                                                                   |
| ----------------------------------------- | ------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------- |
| Panel de control, una charla ligera       | `1024` (imagen predeterminada) | ≥2 GiB               |                                                                                                         |
| Un agente codificador (Claude/Codex/Grok) | `8192`                         | ≥10 GiB              | `/v1/responses` típico de sesión única                                                                  |
| Dos `/v1/responses` largos concurrentes   | `10240`–`12288`                | ≥12–16 GiB           | Aborto de V8 medido en el ~ 12 GiB                                                                      |
| Tres contextos largos simultáneos +       | no en un proceso               | serializar / más RAM | La admisión de peso pesado predeterminada es 1 durante el vuelo; elevarlo sin RAM reintroduce el aborto |

`omniroute serve` sobre metal desnudo calibra ~ al 35% de RAM ( `[512, 4096]` sujeto) cuando `OMNIROUTE_MEMORY_MB` está** desarmado** . Docker siempre configura `1024`, de modo que la calibración nunca se ejecuta en la imagen oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Variables de entorno críticas

Además de los valores predeterminados documentados en [ENVIRONMENT.md](../reference/ENVIRONMENT.md), las siguientes variables son las más importantes al ejecutar bajo Docker:

| Variable                      | Propósito                                                                                                                                                                                                                                                                                          | Valor predeterminado              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Secreto compartido para el puente WebSocket. **Obligatorio en producción** — establézcalo como una cadena aleatoria robusta.                                                                                                                                                                       | sin definir (debe proporcionarse) |
| `REDIS_URL`                   | Cadena de conexión para el backend del limitador de solicitudes / caché                                                                                                                                                                                                                            | `redis://redis:6379`              |
| `REDIS_PORT`                  | Puerto del host para el contenedor Redis incluido                                                                                                                                                                                                                                                  | `6379`                            |
| `REDIS_BIND_HOST`             | Interfaz del host en la que se publica el puerto de Redis incluido (interfaz de bucle invertido, salvo que añada AUTH)                                                                                                                                                                             | `127.0.0.1`                       |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Ruta del host montada en el perfil `cli` en `/workspace/omniroute` para los flujos de trabajo de actualización automática                                                                                                                                                                          | `.` (directorio actual)           |
| `OMNIROUTE_MEMORY_MB`         | Límite del heap de Node en tiempo de ejecución para el servidor independiente de Docker; sobrescribe el valor predeterminado de la imagen indicado anteriormente. Agentes de programación: `8192` o más (consulte [RAM en tiempo de ejecución](#runtime-ram-for-coding-agents)).                   | `1024`                            |
| `DASHBOARD_PORT` / `API_PORT` | Sobrescribe los puertos expuestos para el panel (20128) y la API (20129)                                                                                                                                                                                                                           | `20128` / `20129`                 |
| `APP_BIND_HOST`               | Interfaz del host en la que docker-compose publica los puertos del panel, la API y WebSocket en vivo. Con `REQUIRE_API_KEY=false` (valor predeterminado), `0.0.0.0` expone el proxy anónimo `/v1` a la LAN; amplíe el acceso únicamente con `REQUIRE_API_KEY=true` o con un proxy inverso delante. | `127.0.0.1`                       |
| `CLIPROXY_BIND_HOST`          | Interfaz del host en la que docker-compose publica el contenedor auxiliar `cliproxyapi`; su volumen de datos contiene las credenciales de los proveedores.                                                                                                                                         | `127.0.0.1`                       |
| `OMNIROUTE_PLUGINS_DIR`       | Directorio que el escáner de complementos del entorno de ejecución lee y en el que instala. Defínalo cuando los complementos se monten mediante bind mount: el valor predeterminado depende de `HOME`, que una imagen no tiene por qué exportar.                                                   | `~/.omniroute/plugins`            |
| `OMNIROUTE_BASE_PATH`         | Subruta de la URL cuando la aplicación se publica detrás de un proxy inverso (p. ej., `/omniroute`)                                                                                                                                                                                                | _(vacío = raíz)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Origen público del navegador, incluida la subruta (p. ej., `https://host/omniroute`)                                                                                                                                                                                                               | sin definir                       |
| `PROD_DASHBOARD_PORT`         | Puerto del panel en el host para `docker-compose.prod.yml`                                                                                                                                                                                                                                         | `20130`                           |
| `CLIPROXYAPI_PORT`            | Puerto del host para el contenedor auxiliar `cliproxyapi`                                                                                                                                                                                                                                          | `8317`                            |

## Proxy inverso en una subruta (Traefik/nginx)

Next.js `basePath` se compila en el paquete independiente. OmniRoute registra el valor horneado en un archivo centinela en la raíz de la aplicación (escrito durante `npm run build`; leído por `scripts/docker/ensure-docker-base-path.mjs`) y lo compara con `OMNIROUTE_BASE_PATH` cuando se inicia el contenedor. Cuando difieren y la imagen se creó para la raíz del dominio, el punto de entrada reescribe los manifiestos independientes, los literales `basePath`/`assetPrefix` incrustados (el siguiente 16 representa el activo SSR URLs solo desde `assetPrefix` — el parche refleja la subruta en él), el recurso `/_next/static` integrado URLs (manifiestos de referencia del cliente, importaciones de medios, páginas de error prerenderizadas) y el cliente `process.env` shim antes de que se ejecute `node dev/run-standalone.mjs`.

### Componer compilación (recomendado)

Configure ambas variables en `.env` y luego reconstruya para que la imagen y el tiempo de ejecución coincidan:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` reenvía `OMNIROUTE_BASE_PATH` como Docker build-arg y como variable de entorno de ejecución.

### Subruta de tiempo de ejecución + de imagen raíz prediseñada

Las imágenes `cheaperinference/omniroute:*` publicadas se crean para la raíz del dominio. Aún puedes configurar `OMNIROUTE_BASE_PATH` en tiempo de ejecución; el contenedor parchea el paquete una vez al inicio. Combínalo con el origen público correspondiente:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure el proxy inverso para reenviar el** lleno** ruta externa (no quite el prefijo). Traefik debe enrutar `PathPrefix(`/omniroute `)` al contenedor sin `StripPrefix`, de modo que Next.js reciba `/omniroute/...` y proporcione activos desde `/omniroute/_next/...`.

Docker healthcheck sondea el punto final ligero del ciclo de vida `/healthz` con el `OMNIROUTE_BASE_PATH` activo. `/api/monitoring/health` permanece disponible para diagnósticos human/dashboard ; para apuntar el contenedor HEALTHCHECK hacia él (por ejemplo, para una aplicación profunda de la salud), configure `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ese camino es un** profundo** check (resumen de monitoreo de DB + ) — apropiado para `HEALTHCHECK` poco frecuente de Docker si vuelve a participar, pero** no** para intervalos `livenessProbe` de Kubernetes.

Para orquestadores (Kubernetes, Nomad, etc.):

| Sonda                 | Preferir                                                                         | Evitar                                                                         |
| --------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| vivacidad             | HTTP `GET /livez`, o TCP en el puerto principal (`PORT`, `20128` predeterminado) | `/api/monitoring/health` como vida                                             |
| Preparación           | HTTP `GET /healthz`                                                              | Tiempos de espera ajustados que tratan el bucle de eventos ocupado como muerto |
| Profundo / caja negra | `/api/monitoring/health`                                                         | —                                                                              |

`/healthz` informa el ciclo de vida del proceso (`ok` / `starting` / `stopping`). `/livez` solo tiene procesos activos (200 siempre que el controlador pueda ejecutarse; no espera a que esté listo). Ambos aún se ejecutan en el mismo bucle de eventos de Nodo como manejo de solicitudes, por lo que el catálogo vinculado a la CPU o el trabajo de compresión pueden retrasarlos — ocupado ≠ muerto. Prefiera TCP liveness si las sondas HTTP se agotan. Guía de sonda completa: [Guía de monitoreo — Recomendaciones de sonda de Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Componer con Caddy (HTTPS Auto-TLS)

OmniRoute se puede exponer de forma segura utilizando el aprovisionamiento automático SSL de Caddy. Asegúrese de que el registro DNS A de su dominio apunte al IP de su servidor.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy establece los encabezados de reenvío estándar para el contenedor ascendente. OmniRoute utiliza `NEXT_PUBLIC_BASE_URL` como origen público canónico para las devoluciones de llamada OAuth y los enlaces públicos generados; Las escrituras autenticadas del panel utilizan solicitudes del mismo origen más protección CSRF vinculada a la sesión. Habilite `OMNIROUTE_TRUST_PROXY` solo para implementaciones avanzadas en las que intencionalmente desee que OmniRoute derive el origen público de encabezados reenviados confiables en lugar de una configuración explícita.

## Túnel rápido Cloudflare

El soporte del panel para implementaciones Docker incluye un solo clic** Túnel rápido Cloudflare** en `Dashboard → Endpoints`. La primera habilitación descarga `cloudflared` solo cuando es necesario, inicia un túnel temporal hacia su punto final `/v1` actual y muestra el `https://*.trycloudflare.com/v1` URL generado directamente debajo de su URL público normal.

Los paneles del túnel de punto final (Cloudflare, Tailscale, ngrok) se pueden mostrar u ocultar de `Settings → Appearance` sin cambiar el estado del túnel activo.

### Notas del túnel

- Quick Tunnel URLs es temporal y cambia después de cada reinicio.
- Los túneles rápidos no se restauran automáticamente después de reiniciar un OmniRoute o un contenedor. Vuelva a habilitarlos desde el panel cuando sea necesario.
- La instalación administrada actualmente admite Linux, macOS y Windows en `x64` / `arm64`.
- Los túneles rápidos administrados utilizan de forma predeterminada el transporte HTTP/2 para evitar advertencias ruidosas del búfer QUIC UDP en entornos de contenedores restringidos. Configure `CLOUDFLARED_PROTOCOL=quic` o `auto` si desea un transporte diferente.
- Las imágenes Docker agrupan las raíces CA del sistema y las pasan a `cloudflared` administrado, lo que evita fallas de confianza TLS cuando el túnel se inicia dentro del contenedor.
- Configure `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` si desea que OmniRoute use un binario existente en lugar de descargar uno.

## Etiquetas de imagen

| Imagen                       | Etiqueta | Tamaño  | Descripción                                           |
| ---------------------------- | -------- | ------- | ----------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | más alto** publicado** SemVer estable (no git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Fijar esta clase de etiqueta para GitOps              |

Las mismas imágenes se publican en tres repositorios, con los mismos resúmenes por arquitectura: `cheaperinference/omniroute` (Docker Hub, la organización Cheaper Inference, desde 3.8.53 en adelante), `ghcr.io/cheaper-inference/omniroute` y el `diegosouzapw/omniroute` heredado, que mantiene su historial de extracción y aún recibe cada lanzamiento. Las implementaciones `diegosouzapw/omniroute` existentes se siguen actualizando; cambiar el nombre de la imagen es opcional. El canal de prelanzamiento `:next` / `:next-web` que aparece a continuación se publica únicamente en `diegosouzapw/omniroute` y GHCR.

Manifiesto multiplataforma: `linux/amd64` + `linux/arm64` nativo (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selecciona automáticamente la arquitectura coincidente; pase `--platform linux/amd64` si necesita forzar la emulación AMD64 en los hosts ARM.

### Canales de lanzamiento

OmniRoute publica canales Docker separados para versiones estables, pruebas de rama de versión activa y compilaciones de desarrollo.

| Canal                           | Fuente                                  | Mutabilidad                           | Uso recomendado                                                                                                                                                  |
| ------------------------------- | --------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | lanzamiento Signed/versioned            | Inmutable                             | Implementaciones de producción que fijan una versión exacta                                                                                                      |
| `:latest` / `:latest-web`       | más alto** publicado** SemVer estable   | Puntero estable mutable               | Sigue lanzamientos estables** después** un trabajo de publicación SemVer que hace —** no** realizar un seguimiento `main` o confirmaciones `release/v*` inéditas |
| `:next` / `:next-web`           | Rama `release/v*` predeterminada actual | Puntero mutable previo al lanzamiento | Probando correcciones que llegaron a la rama de versión activa pero que aún no están en una versión estable                                                      |
| `:main` / `:main-web`           | sucursal `main`                         | Puntero de desarrollo mutable         | Solo pruebas de desarrollo e integración                                                                                                                         |

#### Proveedores de sesiones web: las imágenes `-web`

Cada canal anterior funciona como una etiqueta `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), creada a partir de la etapa `runner-web` — la misma imagen más Playwright y un navegador Chromium. Los barcos de imagen simple** sin** Cromo; `gemini-web`, `claude-web` y `claude-turnstile` lo necesitan.

La falla se difiere, no en el momento de inicio: esos proveedores enumeran sus modelos y se muestran como conectados en el panel, y solo falla la primera solicitud con

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Si utiliza esos proveedores, extraiga la etiqueta `-web` del canal en el que ya se encuentra — nada más cambia. En una instalación npm/CLI (sin imagen Docker ), la pieza equivalente que falta es el binario del navegador: ejecute `npx playwright install chromium` en el host.

#### Usando el canal de prelanzamiento

El canal `next` se reconstruye cada vez que se envía a la rama `release/v*` predeterminada actual y se publica tanto para AMD64 como ARM64. Las ramas de mantenimiento más antiguas no pueden sobrescribirlo. El canal proporciona una imagen extraíble para las correcciones que se han fusionado en la rama de versión activa antes de que se corte la siguiente etiqueta estable.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para Docker Compose, anule la etiqueta de imagen utilizada por el perfil seleccionado, luego extraiga y vuelva a crear el servicio:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Seguridad y retroceso

`next` es un canal flotante de prelanzamiento. Puede cambiar en cualquier impulso a la rama de versión activa y es** no soportado para uso en producción** . Fije el resumen de la imagen mientras evalúa una compilación específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de realizar la prueba, haga una copia de seguridad del volumen de datos OmniRoute o del directorio de datos montado en enlace. Para revertir, restaure la versión estable utilizada anteriormente o resuma y vuelva a crear el contenedor:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Una compilación de rama de lanzamiento nunca puede mover `latest`; sólo una versión semántica estable elegible puede promover el puntero estable. Las imágenes `next` conservan la inspección de la imagen publicada y bloquean la puerta de vulnerabilidad CRÍTICA.

**`latest` no es una garantía de moneda para git.** Las correcciones fusionadas en `main` o en la rama `release/v*` activa son** no** en `:latest` hasta que se publique una imagen SemVer estable y el trabajo de publicación promueva `:latest` (el mismo resumen que SemVer). Si `latest` parece congelado mientras GitHub ya muestra la solución, extraiga `:next` para probar la rama de lanzamiento o espere la etiqueta SemVer.

| Quieres                                                                   | Usar                                     |
| ------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / producción que no debe derivar                                   | Pin `:X.Y.Z` (o el resumen de la imagen) |
| Siga los establos publicados y acepte una recreación en cada lanzamiento. | `:latest`                                |
| Probar confirmaciones `release/v*` inéditas                               | `:next` (no producción)                  |
| Prueba `main`                                                             | `:main` (no producción)                  |

## Actualizaciones del panel en Docker

Un contenedor creado a partir de una imagen publicada no puede reemplazarse a sí mismo. Cuando OmniRoute detecta que se ejecuta dentro de un contenedor (sin un checkout de `.git` y sin ser una instalación de npm), el aviso de actualización del panel principal muestra el comando que debe ejecutarse en el host en lugar de las instrucciones de npm/git, junto con un botón para copiarlo:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

El nombre del servicio procede de `AUTO_UPDATE_SERVICE` (de forma predeterminada, `omniroute`, el servicio de `docker-compose.selfhost.yml`). `pull` solo actualiza una etiqueta flotante (`latest`, `next`); si se usa una etiqueta fija `:X.Y.Z`, edítela primero.

### Actualizaciones con un solo clic mediante un archivo desencadenador en el host

Para mantener operativo **Actualizar ahora** sin montar `/var/run/docker.sock` (lo que otorga al contenedor acceso root en el host; consulte la advertencia anterior sobre el perfil `cli`), configure `DOCKER_UPDATE_TRIGGER_FILE` en el servicio OmniRoute y ejecute un observador en el host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

La ruta debe estar dentro de `DATA_DIR` (los valores relativos se resuelven respecto a este); cualquier otra ubicación se rechaza. A continuación, **Actualizar ahora** escribe `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` en ese archivo, responde con `202` y el panel consulta periódicamente `/api/system/version` hasta que la nueva versión está activa y vuelve a cargar la página. OmniRoute nunca ejecuta un shell ni un comando de Docker en este modo. Al igual que con todas las acciones de actualización, la solicitud solo se acepta desde clientes de loopback/LAN.

Un directorio de datos montado mediante bind proporciona al host una ruta estable que observar. Unidades de ejemplo de `systemd` (ajuste `/srv/omniroute` al directorio que contiene su archivo de Compose y `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Observar solicitudes de actualización de OmniRoute desde el panel

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Descargar y volver a crear el contenedor de OmniRoute

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

El servicio elimina la solicitud antes de descargar la imagen para que una ejecución fallida no provoque un bucle. Sin `DOCKER_UPDATE_TRIGGER_FILE`, el panel mantiene el flujo de comandos manuales.

## Disponibilidad: SQLite predeterminado es una réplica única

Stock Docker / Kubernetes OmniRoute es** un proceso de nodo + un escritor SQLite** . La alta disponibilidad es** no soportado** en esa topología.

| Restricción                           | Consecuencia                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| escritor único                        | Hacer** no** ejecute varias réplicas en el mismo archivo SQLite. Eso corrompe el DB.                                                                                                                                                                                                                                                 |
| Recrear/reiniciar/ HEALTHCHECK matar  | **Apagón total** de SSE en vuelo, sesiones de panel y estado en memoria. Cada cliente conectado cae. Las nuevas solicitudes durante la ventana de punto final vacío obtienen un proxy inverso**`502 Bad Gateway: Unknown error`** , not OmniRoute JSON — los clientes no pueden distinguir esto de una falla del proveedor (#11015). |
| Mismo bucle de eventos que `/healthz` | Un catálogo ocupado o un tick de compresión pueden retrasar las exploraciones; un breve tiempo de espera y luego reinicia el** solo** réplica.                                                                                                                                                                                       |

**Matriz de sonda** (consulte también [las recomendaciones de la sonda Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda              | Objetivo                                                         | no usar                                                                        |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| vivacidad          | TCP en `PORT` ( `20128` predeterminado), o `/healthz` HTTP suave | `/api/monitoring/health`                                                       |
| Preparación        | HTTP `GET /healthz`                                              | Tiempos de espera ajustados que tratan el bucle de eventos ocupado como muerto |
| Profundo / humanos | `/api/monitoring/health`                                         | Vida de kubelet automatizada                                                   |

**Actualizaciones:** espere que cada sesión caiga. Drene a los clientes si puede; no hay ninguna actualización continua en SQLite predeterminado. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` también reemplazará el único proceso cuando el contenedor no esté en buen estado — el mismo radio de explosión.

Los manifiestos listos para usar y un gráfico de Helm se encuentran en `deploy/kubernetes/` y `deploy/helm/omniroute/` — Consulte la [guía de implementación de Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Fragmento de Kubernetes para un** réplica única** (Es necesario recrear; no eleve `replicas` contra un archivo SQLite ):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` sleep permite que kube elimine los puntos finales de servicio antes que SIGTERM por lo que** nuevo** el tráfico deja de afectar el proceso de muerte. `/v1/responses` SSE en vuelo se agota hasta `SHUTDOWN_TIMEOUT_MS` (30 segundos por defecto) mediante arrendamientos de admisión pesados (#11015). Las nuevas solicitudes que aún llegan al proceso obtienen `503` + `Retry-After: 5`. La brecha Recrear punto final vacío hasta que el reemplazo esté listo sigue siendo una interrupción total — que es la topología SQLite, no un error de configuración de la sonda.

Postgres externo/ HA multiescritor es** no** una ruta de stock documentada. Si necesita HA, mantenga una única réplica o ejecute una topología que el proyecto haya probado y documentado por separado. La obra Postgres/MySQL vive en [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hasta que se envíe, la única forma admitida de multiplicar** grande** La capacidad `/v1/responses` son N procesos independientes (siguiente sección), no `replicas > 1` en un volumen.

## Escalamiento horizontal: N procesos independientes

### propiedad de rotación del token Codex

Las copias de una cuenta Codex no deben consumir de forma independiente su token de actualización de un solo uso. En instancias que solo consumen credenciales sincronizadas, configure `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Déjelo sin configurar en el propietario de rotación única. Cada proceso todavía necesita su propio `DATA_DIR`; esta opción no comparte SQLite ni proporciona sincronización de tokens ni un bloqueo distribuido.

La instancia pasiva vuelve a leer la conexión cuando se necesita una actualización y adopta solo un token de acceso diferente y vigente. De lo contrario, la actualización se desactiva sin caducar ni desactivar la conexión ni contar una falla en el interruptor de actualización. Las fallas reales de autenticación ascendente todavía utilizan la contabilidad de fallas normal, el tiempo de reutilización exponencial y el error normal del cliente; La desactivación de la cuenta sigue siendo permanente. Sincronice los tokens rotados del propietario antes de que caduquen los tokens de acceso (el tiempo de actualización proactiva predeterminado es de cinco minutos) o vuelva a importar el archivo de autenticación Codex. Las importaciones pasivas almacenan los tokens proporcionados sin validarlos en el punto final del token. La actualización manual dashboard/API devuelve `409 refresh_disabled`; Los nuevos inicios de sesión OAuth no cambian. Ver [referencia ambiental](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

El proceso de un nodo es** un montón V8** . Dos agentes de codificación de tokens ~ 3 MiB / ~ 750k superpuestos `POST /v1/responses` (RTK + Caveman) abortan ese montón en ~ 12 Gi (`FATAL ERROR: Reached heap limit`) y pueden OOM un cgrupo de 16 Gi. Consulte [el n.° #7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Esa medida es una** presupuesto de memoria** Advertencia, no es un producto hard-max de dos `/v1/responses` largos simultáneos. La admisión de chat pesado está controlada por un presupuesto de bytes de ingesta derivado automáticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dimensionado desde ese mismo límite V8/cgroup — anulándolo hacia arriba (o estableciendo el límite de recuento de solicitudes `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` heredado) en un proceso ya dimensionado se reintroduce el aborto. Los chats pequeños, `/healthz`, `/v1/models` y MCP son** no** en esa gorra.

### Un proceso: más de dos `/v1/responses` largos

A** saludable** proceso (montón debajo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, `0.75` predeterminado)** puede** Ejecute más de dos `POST /v1/responses` largos simultáneos cuando el presupuesto de bytes en curso de todo el proceso (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) todavía tenga espacio. Los cuerpos en `OMNIROUTE_CHAT_LARGE_BODY_BYTES` o superior (predeterminado 256 KiB) toman la misma concesión de peso pesado que las solicitudes de estructura pesada y usan el mismo escape [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Decenas de clientes SSE largos simultáneos (los operadores suelen necesitar entre 40 y 50) es una** presupuesto de memoria** pregunta — tamaño montón + primary/headroom ranuras + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — no es un límite estricto de productos “máximo 2”. Un montón presionado todavía se desprende con `503` reintentable, por lo que el número #7849 no regresa.

A** multiplicar montones** (espacios antiguos V8 independientes)** hoy** :

| Hacer                                                                                                                                                                         | No                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Correr** n containers/pods** , cada uno con su** propio** `DATA_DIR` / volumen                                                                                                | Establecer `replicas > 1` contra un archivo SQLite                            |
| Tamaño pesado en vuelo + espacio libre saludable del presupuesto de bytes en vuelo / montón; 1–2 es el valor predeterminado conservador #7849, no un producto máximo estricto | Dé a un proceso 8 × RAM y un límite de recuento ilimitado                     |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para** contadores de cuotas compartidas**                                                                      | Trate Redis como SQLite compartido, — no lo es                                |
| Duplicar secretos de proveedores en cada instancia (o aceptar paneles particionados)                                                                                          | Espere un panel/un registro de llamadas en todas las instancias               |
| Frente con cualquier balanceador de carga; pegajoso por clave API o sesión es suficiente                                                                                      | Requerir un middleware específico del proveedor que tenga en cuenta el tamaño |

La afinidad de sesión a cuenta también se puede compartir a través de Redis: establezca `OMNIROUTE_SESSION_AFFINITY_STORE=redis` y `REDIS_URL` en cada proceso, con el mismo `REDIS_KEY_PREFIX` y una configuración `sessionAffinityTtlMs` positiva. Los pines resuelven identidades de cuentas de uso con hash para la conexión local elegible de cada proceso, por lo que las cuentas OAuth con metadatos de identidad coincidentes no necesitan tener una conexión IDs coincidente. Las identidades de cuentas conocidas tienen prioridad sobre IDs locales contradictorios en la resolución de PIN y el desalojo vigilado; Los registros sin identidad (o las personas que llaman de desalojo sin identidad) conservan la guardia ID heredada. Las cuentas sin una identidad de uso estable aún requieren IDs coincidente. Los errores Redis o las llamadas que superan los 100 ms recurren al SQLite local. Cada tienda de afinidad Redis limita las operaciones pendientes a 8, omite Redis inmediatamente cuando está llena y libera espacios solo cuando el trabajo subyacente se estabiliza, no en la fecha límite de la persona que llama. Durante una interrupción Redis no hay una verdad compartida: cada instancia recurre a su propia afinidad local, las sesiones pueden volver a fijarse una vez por instancia y las instancias pueden divergir. La adherencia vuelve a converger a través de Redis cuando se recupera. El tiempo de espera limita la espera, no un EVAL enviado, que puede aterrizar después del respaldo. Las escrituras de enrutamiento comparan el valor exacto observado por la decisión de enrutamiento, no una nueva lectura en tiempo de mutación; un error observado o una observación alternativa SQLite se compara como una clave Redis ausente. Los pines obsoletos se reemplazan en un CAS, por lo que un comando tardío no puede reemplazar ni eliminar un pin más nuevo y diferente. Redis lee atómicamente devuelve el valor y el servidor restante TTL; PTTL positivo (o sin vencimiento) determina la vida, no la marca de tiempo JSON del escritor o el reloj del lector. Las instantáneas locales asignan el TTL restante a una fecha límite local; Las claves JSON existentes siguen siendo legibles y sus bytes sin procesar se conservan para CAS. Redis es la única fuente de verdad mientras responde. Las inserciones, toques y eliminaciones compartidos confirmados eliminan la entrada local, nunca la instalen ni la actualicen. SQLite en la ruta Redis contiene solo las decisiones alternativas de esta instancia frente a errores Redis, tiempos de espera o saturación de admisión, limitadas por TTL como antes. Un pin local faltante en una interrupción posterior cuesta una nueva selección (un error de caché), no una cuenta incorrecta o desalojada. Los upserts rechazados devuelven el ganador compartido y su TTL restante de forma atómica: la selección ordinaria vuelve a verificar la fecha límite local asignada y utiliza un ganador elegible aún activo, tocando el uso y el inicio de sesión para esa cuenta sin otra escritura compartida. Si no está disponible, la selección mantiene el candidato local, deja el pin compartido sin cambios y emite un mensaje de depuración. Rechazado CAS no escribe SQLite; Los errores Redis, los tiempos de espera o la saturación de admisión aplican la operación local existente en su lugar. Si la respuesta de una mutación enviada llega después del tiempo de espera (aceptado, rechazado o error), una comparación y eliminación de valores serializados exactos sincrónicos elimina solo la fila alternativa de tiempo de espera de bytes idénticos. No hay espera entre esa comparación y la eliminación; se conserva una escritura de interrupción más reciente. El desalojo vigilado elimina el pin local de la cuenta fallida incluso con Redis inactivo y lo limpia nuevamente después de confirmar el desalojo compartido. Las respuestas compartidas anteriores pendientes no pueden restaurar un pin local desalojado porque los éxitos compartidos nunca escriben SQLite. Una interrupción posterior puede restablecer una cuenta; una escritura compartida aceptada posteriormente existe solo en Redis. Los errores Redis no consultan el estado de reserva local. Con el controlador apagado, los pines recién seleccionados conservan la forma heredada SQLite JSON de cuatro campos; sólo el enrutamiento Redis agrega la identidad de la cuenta con hash. Los pines captados previamente se vuelven a verificar en su límite de vencimiento. La selección sin arrendamiento Redis vuelve a leer la tienda, pero la planificación de arrendamiento sincrónica aún puede usar un pin desalojado entre la captación previa y la planificación (una ventana de mejor esfuerzo aceptada). Un compromiso de arrendamiento no puede cambiar de cuenta después de un reclamo duradero: en caso de rechazo, mantiene al candidato reclamado solo para esa solicitud y deja intacto al ganador compartido, por lo que el acuerdo entre instancias está limitado a ese camino. El resto de la tabla aún se aplica: esto no comparte la permanencia de la sesión combinada, los pines de giro nativos Codex, los semáforos de cuentas, los bloqueos, los límites de gasto, la configuración o los registros de llamadas.

Hardware: `/v1/responses` largo concurrente por instancia es un** presupuesto de memoria** pregunta (montón + byte en vuelo / #10110). `DATA_DIR` s independientes `N` aún multiplican montones: el host RAM debe cubrir `N × cgroup`, no “un pod de 16 Gi con N = 8”. Nunca `replicas > 1` en un archivo SQLite.

Redactar boceto (dos montones, dos volúmenes — no `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

La densidad en proceso (compresión del aislado HTTP ) es [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un clúster lógico en estado duradero compartido es [el #8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Errores regionales de Gemini dentro de Docker

Google AI Studio / API de Gemini puede devolver un error HTTP 400 con FAILED_PRECONDITION y
`User location is not supported for the API use.` Una solicitud correcta en el host
no demuestra que el contenedor utilice la misma ruta de salida. El orden de DNS,
la conectividad IPv4/IPv6, el enrutamiento de la VPN y los proxies configurados pueden diferir. Consulte
[las regiones admitidas por Google](https://ai.google.dev/gemini-api/docs/available-regions),
así como la ruta de conexión real; este error por sí solo no indica que la clave de API sea incorrecta.

### Prefiera un proxy específico para la conexión

Utilice la [configuración de proxy por conexión](../ops/PROXY_GUIDE.md#4-level-proxy-system)
de OmniRoute para la conexión de Gemini afectada y, a continuación, repita **Probar conexión** y una solicitud pequeña
con el mismo modelo. Esto limita el cambio de enrutamiento a esa conexión. Compruebe
que se pueda acceder al proxy desde el contenedor y que la conexión realmente lo seleccione.
Cambiar la ruta no garantiza que se cumplan los requisitos regionales del servicio de origen.

### Compare la red del host y del contenedor

Mantenga idénticos la clave, el modelo y la solicitud al comparar resultados autenticados; nunca
pegue credenciales, contraseñas de proxy ni encabezados de autorización completos en una incidencia.
Primero, examine qué familias de direcciones ofrece el resolvedor del SO utilizando el mismo comando
en el host y dentro del contenedor:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Sustituya `omniroute` por el servicio que ejecute (por ejemplo, `omniroute-web`). Estos
comandos muestran las familias de direcciones sin credenciales ni direcciones IP. Un `6`
devuelto solo indica un resultado DNS IPv6: **no** demuestra que exista una ruta IPv6 utilizable ni acceso a la API.
Cuando `curl` esté instalado, compare `curl -4 -I https://generativelanguage.googleapis.com`
con `curl -6 -I https://generativelanguage.googleapis.com` en ambos entornos.
Una respuesta HTTP demuestra la conectividad para esa prueba, incluso si se trata de un error
sin autenticar; únicamente la solicitud autenticada al modelo comprueba la disponibilidad de Gemini.

### Alternativa a nivel del host: IPv6 funcional y política del resolvedor

La persona que informó de [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) restauró
el acceso en su entorno habilitando IPv6 para los contenedores y modificando la selección de
direcciones de glibc. Considere esto una alternativa específica del entorno. Confirme que IPv6
funcione en el host y compruebe la salida y el enrutamiento del contenedor, así como las reglas del cortafuegos,
antes de ajustar las preferencias del resolvedor. Una dirección ULA privada por sí sola no demuestra
que exista conectividad IPv6 pública.

Para los servicios que ya estén conectados a la red predeterminada de Compose, este fragmento habilita
IPv6 en esa red; conserve el resto de la configuración del servicio, los puertos y los volúmenes:

```yaml
networks:
  default:
    enable_ipv6: true
```

Para una red con nombre, habilítelo en la red a la que realmente se conecta el servicio. Docker puede
asignar una subred ULA; seleccione una subred explícita que no se solape únicamente cuando su red
lo requiera. Consulte [Redes IPv6 de Docker](https://docs.docker.com/engine/daemon/ipv6/)
y [Opciones de red de Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

En una **imagen basada en glibc**, `/etc/gai.conf` puede modificar la selección de direcciones. El Dockerfile
actual del repositorio utiliza Debian; las imágenes personalizadas basadas en musl no comparten este mecanismo.
El ajuste informado cambia la etiqueta ULA de `label fc00::/7 6` a
`label fc00::/7 1`. Parta de la tabla de políticas completa de la imagen y conserve las demás
entradas: añadir una entrada `label` o `precedence` sustituye esa tabla predeterminada, por lo que un archivo
que contenga únicamente la línea modificada no es suficiente. La
[referencia de configuración de glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documenta esa semántica. Monte mediante enlace el archivo revisado en `/etc/gai.conf` en modo de solo lectura
y vuelva a crear el servicio para aplicar el cambio.

Esto modifica la selección de direcciones del SO para **todo el tráfico saliente de ese contenedor**.
No obliga a todas las aplicaciones a elegir IPv6: el orden de DNS y la selección de conexiones
de Node también son relevantes. En particular, `--dns-result-order=ipv4first` da preferencia a IPv4 y
no soluciona un fallo exclusivo de IPv4. Consulte [Orden de DNS de Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Vuelva a probar Gemini y los demás proveedores después de cualquier cambio a nivel del host. Para revertirlo,
elimine el montaje personalizado de `gai.conf`, restaure la configuración de red anterior y
vuelva a crear el servicio o la red afectados durante una ventana de mantenimiento. Volver a crear una red
puede interrumpir otros contenedores conectados a ella; no elimine el volumen de datos persistente.

## Notas importantes

- **Modo WAL de SQLite:** se debe permitir que `docker stop` finalice para que OmniRoute pueda guardar los cambios más recientes en `storage.sqlite` mediante un checkpoint. Los archivos de Compose incluidos ya establecen un período de gracia de detención de 40s. Si ejecuta la imagen directamente, mantenga `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** establézcalo en `true` si las copias de seguridad rutinarias/previas a escrituras se administran externamente. Las migraciones de bases de datos existentes siguen requiriendo su propia instantánea de seguridad duradera y una protección para migraciones masivas.
- **Persistencia de datos:** monte siempre un volumen en `/app/data` para conservar la base de datos, las claves y las configuraciones entre reinicios del contenedor.
- **Configuración del puerto:** sobrescriba la variable de entorno `PORT` para cambiar el puerto predeterminado `20128`.

## Véase también

- [Guía de despliegue en VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuración de VM + nginx + Cloudflare
- [Guía de despliegue en Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Despliegue en Fly.io
- [Configuración del entorno](../reference/ENVIRONMENT.md) — Referencia completa de `.env`
