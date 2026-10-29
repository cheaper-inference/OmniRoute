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

> **¿Alojamiento propio con un solo comando?** Consulta la
> [Guía de alojamiento propio](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imagen publicada +
> Redis, acceso solo mediante loopback, sin elección de perfil). La ejecución rápida que aparece a continuación es la
> opción de un único contenedor para usuarios que ya ejecutan Redis en otro lugar.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Con archivo de entorno

```bash
# Primero, copia y edita .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
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

## Etapas del Dockerfile

El repositorio incluye un Dockerfile multietapa (`Dockerfile`). Se exponen cuatro etapas; elija el `target` adecuado para su caso de uso.

| Etapa         | Imagen base           | Propósito                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala las dependencias (`npm ci --legacy-peer-deps`) y ejecuta `npm run build` (Turbopack de forma predeterminada; consulte Recursos durante la compilación más abajo)                                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | Entorno de ejecución de producción con la salida independiente de Next.js. **No incluye las CLI de los proveedores.**                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | Añade `git`, `docker.io`, `docker-compose` y las CLI globales: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Elija esta etapa para flujos de trabajo con agentes.**                                                                                                                      |
| `runner-web`  | `runner-base`         | Añade Playwright y un navegador Chromium (`--with-deps`) para proveedores de sesiones web: `gemini-web`, `claude-web`, `claude-turnstile`. **Elija esta etapa cuando use esos proveedores**: la imagen básica falla al procesar solicitudes sin ella (consulte la nota sobre `-web` en Canales de lanzamiento). |

Compile manualmente un `target` específico:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Recursos durante la compilación

Tres argumentos de compilación controlan el coste de la etapa `builder`. Solo se aplican durante la compilación;
`OMNIROUTE_MEMORY_MB` (más abajo) es un parámetro de ejecución independiente.

| Argumento de compilación    | Valor predeterminado | Efecto                                                                                                      |
| --------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`                  | `0` compila con webpack: menor pico de memoria, pero más lento. `1` habilita Turbopack.                     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`               | Límite del heap de V8 (`--max-old-space-size`) para el proceso `next build` iniciado.                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`                  | Proporciona el valor de `CIRCLE_NODE_TOTAL`; Next deriva `workers = N - 1` para recopilar datos de páginas. |

`OMNIROUTE_BUILD_WORKERS` es el parámetro que debe aumentar en un compilador potente y el que debe
considerar como posible causa cuando una compilación con recursos limitados falla **después de**
`✓ Compiled successfully`. Cada proceso de trabajo de datos de páginas es un proceso independiente,
al igual que el propio proceso principal `next build`; una reproducción en un VPS real (incidencia
#7518) midió un RSS máximo de ~4,5 GB para cada proceso, independientemente de la opción de heap
`NODE_OPTIONS` (Turbopack compila en memoria nativa/Rust fuera del heap de V8). El valor predeterminado
de `2` (→ 1 proceso de trabajo, 2 procesos en total) está dimensionado para los ejecutores alojados
en GitHub de 16 GB/4 vCPU que utiliza el flujo de publicación. Con `8` (→ 7 procesos de trabajo), ese
ejecutor se quedó sin memoria y buildkit hizo fallar el paso con
`ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 procesos de trabajo) tampoco cabía una vez
que se midió directamente el RSS por proceso en lugar de inferirlo.
`tests/unit/docker-build-memory-budget.test.ts` realiza los cálculos con la cifra medida y falla si
cualquiera de los dos parámetros supera la capacidad del ejecutor.

Turbopack compila en memoria nativa de Rust que reside **fuera** del heap de V8, por lo que
`OMNIROUTE_BUILD_MEMORY_MB` no la limita. En un host con un límite de memoria, el OOM killer
finaliza entonces la compilación mediante SIGKILL sin mostrar ningún texto de error: simplemente
se detiene en mitad de `Creating an optimized production build`, lo que parece un bloqueo en lugar
de un error por falta de memoria. Por eso el `Dockerfile` usa webpack de forma predeterminada
(`OMNIROUTE_USE_TURBOPACK=0`), a diferencia de `npm run dev` / `npm run build`, donde Turbopack
es el valor predeterminado del código: una ejecución directa de `docker build .` sin argumentos
de compilación (lo que ejecutan Railway y otros servicios de implementación con un clic) no debe
fallar silenciosamente en un entorno de compilación con memoria limitada. Las imágenes publicadas
ya pasan explícitamente `OMNIROUTE_USE_TURBOPACK=0` en `docker-publish.yml`. En un entorno de
compilación con suficiente RAM, habilite Turbopack para acelerar la compilación:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` está habilitado, por lo que `next build` ejecuta un proceso principal **y** un
proceso de trabajo, y cada uno respeta `OMNIROUTE_BUILD_MEMORY_MB` por separado. Dimensione el límite
del contenedor por encima de aproximadamente el doble de ese valor, no una sola vez.

Mediciones en este árbol (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Empaquetador | Límite del contenedor | Resultado                                 |
| ------------ | --------------------- | ----------------------------------------- |
| Turbopack    | 8 GiB / 16 GiB        | Finalizado por OOM en ambos, sin mensajes |
| webpack      | 8 GiB                 | Proceso de trabajo finalizado por SIGKILL |
| webpack      | 12 GiB                | Correcto, con un pico de 11,1 GiB         |

### Valores predeterminados en tiempo de ejecución

Valores predeterminados exportados por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamiento de la memoria en Docker:

- La imagen establece `OMNIROUTE_MEMORY_MB=1024` y deriva `NODE_OPTIONS=--max-old-space-size=1024` a partir de esta variable.
- El proceso real del servidor se inicia mediante el lanzador independiente, que lee `OMNIROUTE_MEMORY_MB` y añade `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utiliza el último valor repetido de `--max-old-space-size`, por lo que establecer `OMNIROUTE_MEMORY_MB` controla el límite efectivo del heap en Docker.
- Debido a que la imagen siempre establece esta variable, el valor de reserva del propio lanzador, calibrado según la RAM, nunca se aplica en Docker. Auméntelo explícitamente según la carga de trabajo (tabla siguiente). `2048` sigue siendo demasiado pequeño para `/v1/responses` de agentes de programación.

### RAM en tiempo de ejecución para agentes de programación

El valor predeterminado de Docker de 1 GiB es un mínimo para el panel y chats ligeros, no un tamaño para producción. Los cuerpos extensos de `POST /v1/responses` (cientos de mensajes y decenas de herramientas) conservan varios grafos en memoria durante la compresión. Dos solicitudes simultáneas de ~3 MiB / ~750 000 tokens han provocado la interrupción de V8 con un old-space de **12 GiB** (`FATAL ERROR: Reached heap limit`) y también han alcanzado el límite OOM de un cgroup de 16 GiB. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensione **el valor de cgroup `--memory` por encima del heap**: los búferes nativos, SQLite y los datos intermedios de compresión se encuentran fuera de V8.

| Carga de trabajo                                       | `OMNIROUTE_MEMORY_MB`                | Contenedor / cgroup  | Notas                                                                                                               |
| ------------------------------------------------------ | ------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Panel, un chat ligero                                  | `1024` (predeterminado de la imagen) | ≥2 GiB               |                                                                                                                     |
| Un agente de programación (Claude/Codex/Grok)          | `8192`                               | ≥10 GiB              | Sesión única típica de `/v1/responses`                                                                              |
| Dos solicitudes extensas simultáneas a `/v1/responses` | `10240`–`12288`                      | ≥12–16 GiB           | Interrupción de V8 medida con un heap de ~12 GiB                                                                    |
| Tres o más contextos extensos simultáneos              | no ejecutar en un solo proceso       | serializar / más RAM | La admisión predeterminada de cargas pesadas es de 1 en curso; aumentarla sin RAM vuelve a provocar la interrupción |

`omniroute serve` en un sistema sin virtualización calibra aproximadamente el 35 % de la RAM (limitado a `[512, 4096]`) cuando `OMNIROUTE_MEMORY_MB` **no está establecida**. Docker siempre establece `1024`, por lo que esa calibración nunca se ejecuta en la imagen oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Proxy inverso en una subruta (Traefik / nginx)

El `basePath` de Next.js se compila en el paquete autónomo. OmniRoute registra el valor
incorporado en un archivo centinela en la raíz de la aplicación (se escribe durante
`npm run build`; lo lee `scripts/docker/ensure-docker-base-path.mjs`) y lo compara con
`OMNIROUTE_BASE_PATH` cuando se inicia el contenedor. Cuando difieren y la imagen se
compiló para la raíz del dominio, el punto de entrada reescribe los manifiestos
autónomos, los literales `basePath`/`assetPrefix` integrados (Next 16 genera las URL de
recursos SSR únicamente a partir de `assetPrefix`; el parcheador replica la subruta en
este), las URL de recursos `/_next/static` integradas (manifiestos de referencias del
cliente, importaciones multimedia, páginas de error prerenderizadas) y el shim de
`process.env` del cliente antes de que se ejecute `node dev/run-standalone.mjs`.

### Compilación con Compose (recomendado)

Establezca ambas variables en `.env` y, a continuación, vuelva a compilar para que la
imagen y el entorno de ejecución coincidan:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` reenvía `OMNIROUTE_BASE_PATH` como argumento de compilación de
Docker y como variable de entorno en tiempo de ejecución.

### Imagen raíz precompilada + subruta en tiempo de ejecución

Las imágenes publicadas `diegosouzapw/omniroute:*` se compilan para la raíz del dominio.
Aun así, puede establecer `OMNIROUTE_BASE_PATH` en tiempo de ejecución; el contenedor
parchea el paquete una vez al iniciarse. Combínelo con el origen público correspondiente:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure el proxy inverso para reenviar la ruta externa **completa** (no elimine el
prefijo). Traefik debe enrutar `PathPrefix(`/omniroute`)` al contenedor sin
`StripPrefix`, para que Next.js reciba `/omniroute/...` y sirva los recursos desde
`/omniroute/_next/...`.

La comprobación de estado de Docker sondea el endpoint ligero de ciclo de vida
`/healthz`, precedido por el valor activo de `OMNIROUTE_BASE_PATH`.
`/api/monitoring/health` sigue estando disponible para diagnósticos humanos o de paneles;
para hacer que el HEALTHCHECK del contenedor vuelva a apuntar a este endpoint (por
ejemplo, para aplicar una comprobación de estado exhaustiva), establezca
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esa ruta es una comprobación
**exhaustiva** (base de datos + resumen de monitorización), adecuada para el
`HEALTHCHECK` poco frecuente de Docker si decide volver a activarla, pero **no** para
los intervalos de `livenessProbe` de Kubernetes.

Para orquestadores (Kubernetes, Nomad, etc.):

| Sonda                   | Preferir                                                                         | Evitar                                                                                |
| ----------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Actividad               | HTTP `GET /livez`, o TCP en el puerto principal (`PORT`, predeterminado `20128`) | `/api/monitoring/health` como sonda de actividad                                      |
| Disponibilidad          | HTTP `GET /healthz`                                                              | Tiempos de espera estrictos que interpreten un bucle de eventos ocupado como inactivo |
| Exhaustiva / caja negra | `/api/monitoring/health`                                                         | —                                                                                     |

`/healthz` informa del ciclo de vida del proceso (`ok` / `starting` / `stopping`).
`/livez` solo indica si el proceso está activo (devuelve 200 siempre que el manejador
pueda ejecutarse; no espera a que esté disponible). Ambos siguen ejecutándose en el
mismo bucle de eventos de Node que gestiona las solicitudes, por lo que las tareas de
catálogo o compresión que consumen mucha CPU pueden retrasarlos: ocupado ≠ inactivo.
Prefiera una sonda de actividad TCP si las sondas HTTP agotan su tiempo de espera.
Guía completa sobre sondas:
[Guía de monitorización — recomendaciones de sondas de Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose con Caddy (HTTPS Auto-TLS)

OmniRoute puede exponerse de forma segura mediante el aprovisionamiento automático de SSL de Caddy. Asegúrese de que el registro A de DNS de su dominio apunte a la IP de su servidor.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origen visible para el navegador usado en callbacks de OAuth, enlaces del panel y URLs públicas generadas.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interna de servidor a servidor para tareas programadas y solicitudes a sí mismo.
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

Caddy establece los encabezados de reenvío estándar para el contenedor ascendente. OmniRoute utiliza
`NEXT_PUBLIC_BASE_URL` como origen público canónico para los callbacks de OAuth y los enlaces públicos
generados; las escrituras autenticadas del panel utilizan solicitudes del mismo origen junto con protección
CSRF vinculada a la sesión. Habilite `OMNIROUTE_TRUST_PROXY` únicamente en implementaciones avanzadas en las que desee
intencionadamente que OmniRoute derive el origen público de encabezados de reenvío de confianza, en lugar de una
configuración explícita.

## Túnel rápido de Cloudflare

La compatibilidad del panel con las implementaciones de Docker incluye un **túnel rápido de Cloudflare** con un solo clic en `Panel → Endpoints`. La primera activación descarga `cloudflared` solo cuando es necesario, inicia un túnel temporal hacia su endpoint `/v1` actual y muestra la URL `https://*.trycloudflare.com/v1` generada directamente debajo de su URL pública habitual.

Los paneles de túneles de endpoints (Cloudflare, Tailscale, ngrok) pueden mostrarse u ocultarse desde `Ajustes → Apariencia` sin cambiar el estado del túnel activo.

### Notas sobre los túneles

- Las URLs de los túneles rápidos son temporales y cambian después de cada reinicio.
- Los túneles rápidos no se restauran automáticamente después de reiniciar OmniRoute o el contenedor. Vuelva a habilitarlos desde el panel cuando sea necesario.
- Actualmente, la instalación administrada es compatible con Linux, macOS y Windows en `x64` / `arm64`.
- Los túneles rápidos administrados utilizan de forma predeterminada el transporte HTTP/2 para evitar avisos molestos sobre el búfer UDP de QUIC en entornos de contenedores con recursos limitados. Establezca `CLOUDFLARED_PROTOCOL=quic` o `auto` si desea un transporte diferente.
- Las imágenes de Docker incluyen las autoridades certificadoras raíz del sistema y se las proporcionan al proceso `cloudflared` administrado, lo que evita fallos de confianza TLS cuando el túnel se inicializa dentro del contenedor.
- Establezca `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` si desea que OmniRoute utilice un binario existente en lugar de descargar uno.

## Etiquetas de imagen

| Imagen                   | Etiqueta | Tamaño | Descripción                                                   |
| ------------------------ | -------- | ------ | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Versión SemVer estable **publicada** más alta (no git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Fije esta clase de etiqueta para GitOps                       |

Manifiesto multiplataforma: `linux/amd64` + `linux/arm64` nativo (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selecciona automáticamente la arquitectura correspondiente; pase `--platform linux/amd64` si necesita forzar la emulación de AMD64 en hosts ARM.

### Canales de publicación

OmniRoute publica canales de Docker independientes para versiones estables, pruebas de la rama de publicación activa y compilaciones de desarrollo.

| Canal                           | Origen                                  | Mutabilidad                       | Uso recomendado                                                                                                                               |
| ------------------------------- | --------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versión firmada/con número de versión   | Inmutable                         | Implementaciones de producción que fijan una versión exacta                                                                                   |
| `:latest` / `:latest-web`       | SemVer estable **publicada** más alta   | Puntero estable mutable           | Sigue las versiones estables **después** de una tarea de publicación SemVer; **no** sigue `main` ni los commits no publicados de `release/v*` |
| `:next` / `:next-web`           | Rama `release/v*` predeterminada actual | Puntero de prelanzamiento mutable | Pruebas de correcciones incorporadas a la rama de publicación activa, pero que aún no están en una versión estable                            |
| `:main` / `:main-web`           | Rama `main`                             | Puntero de desarrollo mutable     | Solo para desarrollo y pruebas de integración                                                                                                 |

#### Proveedores de sesiones web: las imágenes `-web`

Cada canal anterior también está disponible como etiqueta `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), compilada a partir de la etapa `runner-web`: la misma imagen, además de Playwright y un navegador Chromium. La imagen básica se distribuye **sin** Chromium; `gemini-web`, `claude-web` y `claude-turnstile` lo necesitan.

El fallo se pospone; no se produce durante el inicio: esos proveedores enumeran sus modelos y aparecen como conectados en el panel, y solo falla la primera solicitud con

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Si utiliza esos proveedores, descargue la etiqueta `-web` del canal que ya está usando; no cambia nada más. En una instalación mediante npm/CLI (sin imagen de Docker), la pieza equivalente que falta es el binario del navegador: ejecute `npx playwright install chromium` en el host.

#### Uso del canal de prelanzamiento

El canal `next` se reconstruye con cada push a la rama predeterminada actual `release/v*` y se publica tanto para AMD64 como para ARM64. Las ramas de mantenimiento anteriores no pueden sobrescribirlo. El canal proporciona una imagen descargable con las correcciones que se han fusionado en la rama de lanzamiento activa antes de que se cree la siguiente etiqueta estable.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para Docker Compose, sobrescriba la etiqueta de imagen utilizada por el perfil seleccionado y, a continuación, descargue y vuelva a crear el servicio:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Seguridad y reversión

`next` es un canal flotante de prelanzamiento. Puede cambiar con cualquier push a la rama de lanzamiento activa y **no es compatible con el uso en producción**. Fije el digest de la imagen mientras evalúa una compilación específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de realizar pruebas, haga una copia de seguridad del volumen de datos de OmniRoute o del directorio de datos montado mediante bind mount. Para revertir, restaure la versión estable o el digest utilizados anteriormente y vuelva a crear el contenedor:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Una compilación de una rama de lanzamiento nunca puede mover `latest`; solo una versión semántica estable elegible puede actualizar el puntero estable. Las imágenes `next` conservan la inspección de imágenes de lanzamiento y el bloqueo ante vulnerabilidades CRITICAL.

**`latest` no garantiza que Git esté actualizado.** Las correcciones fusionadas en `main` o en la rama activa `release/v*` **no** están en `:latest` hasta que se publique una imagen SemVer estable y el trabajo de publicación actualice `:latest` (con el mismo digest que esa versión SemVer). Si `latest` parece no actualizarse mientras GitHub ya muestra la corrección, descargue `:next` para probar la rama de lanzamiento o espere a la etiqueta SemVer.

| Objetivo                                                                              | Uso                                   |
| ------------------------------------------------------------------------------------- | ------------------------------------- |
| GitOps / producción que no debe desviarse                                             | Fije `:X.Y.Z` (o el digest de imagen) |
| Seguir las versiones estables publicadas y aceptar una recreación en cada lanzamiento | `:latest`                             |
| Probar commits no publicados de `release/v*`                                          | `:next` (no para producción)          |
| Probar `main`                                                                         | `:main` (no para producción)          |

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

| Restricción                           | Consecuencia                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| escritor único                        | Hacer** no** ejecute varias réplicas en el mismo archivo SQLite. Eso corrompe el DB.                                                                                                                                                                                                                                                |
| Recrear/reiniciar/ HEALTHCHECK matar  | **Apagón total** de SSE en vuelo, sesiones de panel y estado en memoria. Cada cliente conectado cae. Las nuevas solicitudes durante la ventana de punto final vacío obtienen un proxy inverso**`502 Bad Gateway: Unknown error`** , no OmniRoute JSON : los clientes no pueden distinguir esto de una falla del proveedor (#11015). |
| Mismo bucle de eventos que `/healthz` | Un catálogo ocupado o un tick de compresión pueden retrasar las exploraciones; un breve tiempo de espera y luego reinicia el** solo** réplica.                                                                                                                                                                                      |

**Matriz de sonda** (consulte también [las recomendaciones de la sonda Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sonda              | Objetivo                                                         | no usar                                                                        |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| vivacidad          | TCP en `PORT` ( `20128` predeterminado), o `/healthz` HTTP suave | `/api/monitoring/health`                                                       |
| Preparación        | HTTP `GET /healthz`                                              | Tiempos de espera ajustados que tratan el bucle de eventos ocupado como muerto |
| Profundo / humanos | `/api/monitoring/health`                                         | Vida de kubelet automatizada                                                   |

**Actualizaciones:** espere que cada sesión caiga. Drene a los clientes si puede; no hay ninguna actualización continua en SQLite predeterminado. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` también reemplazará el único proceso cuando el contenedor no esté en buen estado: el mismo radio de explosión.

Los manifiestos listos para usar y un gráfico de Helm se encuentran en `deploy/kubernetes/` y `deploy/helm/omniroute/` ; consulte la [guía de implementación de Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

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

`preStop` sleep permite que kube elimine los puntos finales de servicio antes que SIGTERM por lo que** nuevo** el tráfico deja de afectar el proceso de muerte. `/v1/responses` SSE a bordo se agota hasta `SHUTDOWN_TIMEOUT_MS` (30 segundos por defecto) a través de arrendamientos de admisión pesados (#11015). Las nuevas solicitudes que aún llegan al proceso obtienen `503` + `Retry-After: 5`. La brecha Recrear punto final vacío hasta que el reemplazo esté listo sigue siendo una interrupción brusca: esa es la topología SQLite, no un error de configuración de la sonda.

Postgres externo/ HA multiescritor es** no** una ruta de stock documentada. Si necesita HA, mantenga una única réplica o ejecute una topología que el proyecto haya probado y documentado por separado. La obra Postgres/MySQL vive en [el número 8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hasta que se envíe, la única forma admitida de multiplicar** grande** La capacidad `/v1/responses` es N procesos independientes (siguiente sección), no `replicas > 1` en un volumen.

## Escalado horizontal: N procesos independientes

Un proceso de Node equivale a **un heap de V8**. Dos solicitudes simultáneas de agente de programación de ~3 MiB / ~750k tokens a `POST /v1/responses` (RTK + Caveman) provocan la finalización de ese heap al alcanzar ~12 Gi (`FATAL ERROR: Reached heap limit`) y pueden causar un OOM en un cgroup de 16 Gi. Consulta [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Esa medición es una advertencia sobre el **presupuesto de memoria**, no un máximo estricto del producto de dos solicitudes largas simultáneas a `/v1/responses`. La admisión de chats pesados está controlada por un presupuesto de bytes de entrada calculado automáticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) y dimensionado a partir de ese mismo límite de V8/cgroup; aumentarlo manualmente (o establecer el límite heredado por número de solicitudes `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) en un proceso ya dimensionado vuelve a introducir el fallo. Los chats pequeños, `/healthz`, `/v1/models` y MCP **no** se incluyen en ese límite.

### Un proceso: más de dos solicitudes largas a `/v1/responses`

Un proceso **saludable** (con el heap por debajo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, cuyo valor predeterminado es `0.75`) **puede** ejecutar más de dos solicitudes largas simultáneas a `POST /v1/responses` cuando el presupuesto de bytes en curso de todo el proceso (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) aún tiene capacidad. Los cuerpos iguales o superiores a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (256 KiB de forma predeterminada) adquieren la misma reserva de recursos pesados que las solicitudes con estructuras complejas y utilizan la misma vía de escape `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tener decenas de clientes SSE de larga duración simultáneos (los operadores suelen necesitar entre 40 y 50) es una cuestión de **presupuesto de memoria** —dimensione el heap, las ranuras principales/de margen y `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`—, no un límite estricto del producto de «máximo 2». Un heap bajo presión sigue descartando solicitudes con un `503` reintentable para evitar que se repita #7849.

Para **multiplicar los heaps** (espacios antiguos de V8 independientes) **actualmente**:

| Hacer                                                                                                                                                                                                     | No hacer                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Ejecutar **N contenedores/pods**, cada uno con su **propio** `DATA_DIR` / volumen                                                                                                                         | Establecer `replicas > 1` sobre un único archivo SQLite                     |
| Dimensionar las solicitudes pesadas en curso + el margen saludable según el heap / presupuesto de bytes en curso; 1–2 es el valor predeterminado conservador de #7849, no un máximo estricto del producto | Asignar 8× más RAM a un proceso y un límite de cantidad sin restricciones   |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para disponer de **contadores de cuota compartidos**                                                                                       | Tratar Redis como un SQLite compartido: no lo es                            |
| Duplicar los secretos de los proveedores en cada instancia (o aceptar paneles separados)                                                                                                                  | Esperar un único panel / registro de llamadas para todas las instancias     |
| Colocar cualquier balanceador de carga delante; la afinidad por clave de API o sesión es suficiente                                                                                                       | Exigir un middleware específico del proveedor que tenga en cuenta el tamaño |

Hardware: la cantidad de solicitudes largas simultáneas a `/v1/responses` por instancia es una cuestión de **presupuesto de memoria** (heap + bytes en curso / #10110). Los `DATA_DIR` independientes para `N` instancias siguen multiplicando los heaps: la RAM del host debe cubrir `N × cgroup`, no «un pod de 16 Gi con N=8». Nunca use `replicas > 1` sobre un único archivo SQLite.

Esquema de Compose (dos heaps, dos volúmenes; no `deploy.replicas: 2`):

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

La densidad dentro del proceso (compresión fuera del isolate HTTP) se aborda en [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Un clúster lógico sobre un estado duradero compartido se aborda en [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
