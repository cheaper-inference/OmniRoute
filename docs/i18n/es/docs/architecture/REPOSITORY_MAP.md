# Repository Map (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descripción en una línea de cada directorio y archivo raíz.**
> Última actualización: 2026-06-28 — OmniRoute v3.8.40
>
> Usa este mapa para navegar rápidamente por el código base. Para profundizar, sigue los enlaces a la documentación específica.

## Árbol de nivel superior

```
OmniRoute/
├── src/                  # Aplicación Next.js 16 (IU + rutas de API + bibliotecas + dominio + servidor)
├── open-sse/             # Espacio de trabajo del motor de streaming (manejadores, ejecutores, traductor, servidor MCP)
├── packages/            # Espacios de trabajo npm: ui-kit (Keak CI UI Kit incorporado) y browser-pool
├── electron/             # Contenedor de escritorio (Electron 41 + electron-builder 26.10)
├── bin/                  # Punto de entrada de la CLI y manejadores de comandos
├── scripts/              # Scripts de compilación, comprobación, sincronización y ejecución puntual
├── docs/                 # Documentación pública (estás aquí)
├── tests/                # Todos los conjuntos de pruebas (unitarias, integración, e2e, clientes de protocolo)
├── public/               # Recursos estáticos de Next.js, manifiesto PWA, service worker e iconos
├── config/               # Configuración estática + estado de controles de calidad (i18n, payloadRules, quality/)
├── images/               # Recursos gráficos de marketing / README
├── @omniroute/           # Paquetes complementarios publicables (opencode-plugin, opencode-provider)
├── skills/               # Paquetes de habilidades para CLI/agentes (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugins de ejemplo + plantilla inicial omniroute-cmd-hello
├── contrib/              # Contribuciones de la comunidad (podman/)
├── .source/              # Configuración de origen de Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Flujos de trabajo de GitHub Actions + plantillas de incidencias + plantilla de PR
├── .husky/               # Hooks de Git (pre-commit, pre-push)
├── .claude/              # Comandos con barra de Claude Code (específicos del proyecto)
├── .agents/              # Flujos de trabajo + habilidades para Codex / agentes genéricos (reflejo de .claude/)
├── .vscode/              # Configuración del espacio de trabajo de VS Code
├── _ideia/               # Notas de planificación (informales; no se distribuyen)
├── _mono_repo/           # Subproyectos históricos (cloud, site, vscode-extension)
├── _references/          # Clones de referencia de solo lectura de proyectos OSS relacionados
├── _tasks/               # Archivos de seguimiento de tareas por versión (informales)
├── .build/ .worktrees/ dist/   # Directorios temporales locales de compilación / árboles de trabajo de Git / resultados de compilación (ignorados por Git)
├── .issues/              # Caché local de incidencias (ignorada por Git)
├── .playwright-mcp/      # Artefactos de pruebas de Playwright MCP
├── coverage/             # Resultados de cobertura de c8 (ignorados por Git)
├── logs/                 # Registros de ejecución (ignorados por Git)
├── node_modules/         # Dependencias (ignoradas por Git)
├── package/              # Área de preparación de npm pack (artefacto de compilación)
├── .next/                # Resultados de compilación de Next.js (ignorados por Git)
└── (archivos raíz — consulta más abajo)
```

---

## Archivos raíz

| Archivo                                     | Propósito                                                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **README.md**                               | Página de inicio de marketing + inicio rápido + matriz de características (véase también `llm.txt`)                |
| **CHANGELOG.md**                            | Registro de cambios por versión (generado automáticamente por la habilidad `/version-bump-cc`)                     |
| **LICENSE**                                 | Texto de la licencia MIT                                                                                           |
| **CLAUDE.md**                               | Reglas del proyecto para agentes de Claude Code (reglas estrictas, convenciones, escenarios)                       |
| **AGENTS.md**                               | Igual que CLAUDE.md, pero para agentes de IA distintos de Claude (Codex, Cursor, etc.)                             |
| **GEMINI.md**                               | Reglas concisas para agentes basados en Gemini (subconjunto de CLAUDE.md)                                          |
| **CONTRIBUTING.md**                         | Guía para colaboradores: configuración, commits convencionales, pruebas, flujo de PR                               |
| **SECURITY.md**                             | Política de notificación de vulnerabilidades, versiones compatibles, modelo de amenazas                            |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — expectativas de comportamiento de la comunidad                                              |
| **llm.txt**                                 | Página de inicio en texto sin formato optimizada para rastreadores LLM (SEO para asistentes de IA)                 |
| **package.json**                            | Manifiesto de npm, scripts, dependencias, motores, umbral de cobertura de c8                                       |
| **package-lock.json**                       | Árbol de dependencias bloqueado                                                                                    |
| **tsconfig.json**                           | Configuración raíz de TypeScript                                                                                   |
| **tsconfig.typecheck-core.json**            | Configuración de comprobación de tipos para el núcleo de `src/`                                                    |
| **tsconfig.typecheck-noimplicit-core.json** | Comprobación estricta de tipos (`noImplicitAny`)                                                                   |
| **tsconfig.tsbuildinfo**                    | Caché de compilación incremental de TS (ignorada por git)                                                          |
| **next.config.mjs**                         | Configuración de compilación de Next.js 16 (salida independiente)                                                  |
| **next-env.d.ts**                           | Tipos de entorno generados automáticamente por Next.js                                                             |
| **eslint.config.mjs**                       | Configuración plana de ESLint (reglas por área del proyecto)                                                       |
| **prettier.config.mjs**                     | Reglas de formato de Prettier                                                                                      |
| **postcss.config.mjs**                      | Configuración de PostCSS para el pipeline de Tailwind/CSS                                                          |
| **playwright.config.ts**                    | Configuración de pruebas E2E de Playwright                                                                         |
| **vitest.config.ts**                        | Configuración de Vitest (suite predeterminada)                                                                     |
| **vitest.mcp.config.ts**                    | Configuración de Vitest para el servidor MCP y las suites de autoCombo/caché                                       |
| **sonar-project.properties**                | Configuración de SonarQube/SonarCloud (calidad del código)                                                         |
| **Dockerfile**                              | Compilación de Docker multietapa (builder → runner-base → runner-cli)                                              |
| **docker-compose.yml**                      | Compose de desarrollo con 4 perfiles (base, cli, host, cliproxyapi) + contenedor auxiliar de redis                 |
| **docker-compose.prod.yml**                 | Compose de producción (puerto 20130, redis, volúmenes con nombre)                                                  |
| **.dockerignore**                           | Archivos excluidos del contexto de Docker                                                                          |
| **fly.toml**                                | Configuración de despliegue de Fly.io (región `sin`, puerto 20128, volumen /data)                                  |
| **.env.example**                            | Plantilla de archivo de entorno (copiada automáticamente a `.env` en la primera instalación)                       |
| **.gitignore**                              | Patrones de exclusión de git                                                                                       |
| **.npmignore**                              | Lista de exclusión para la publicación en npm                                                                      |
| **.npmrc**                                  | Configuración de npm (registro, política del archivo de bloqueo)                                                   |
| **.node-version**                           | Versión fijada de Node (utilizada por herramientas compatibles con nvm)                                            |
| **.nvmrc**                                  | Versión fijada de Node para nvm                                                                                    |
| **eslint.complexity.config.mjs**            | Configuración de ESLint para el control incremental de complejidad (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configuración de ESLint para reglas de SonarJS (complejidad cognitiva/duplicación)                                 |
| **source.config.ts**                        | Configuración de origen `defineDocs` de Fumadocs (alimenta `.source/`)                                             |
| **knip.json**                               | Configuración de Knip — archivos/exportaciones/dependencias sin usar (alimenta el control de código muerto)        |
| **stryker.conf.json**                       | Configuración de pruebas de mutación de Stryker                                                                    |
| **.size-limit.json**                        | Configuración del presupuesto del bundle de size-limit                                                             |
| **promptfooconfig.yaml**                    | Configuración de evaluación de promptfoo                                                                           |
| **.gitleaks.toml**                          | Conjunto de reglas de análisis de secretos de gitleaks                                                             |
| **.zizmor.yml**                             | Configuración de linting de seguridad de GitHub Actions con zizmor                                                 |
| **socket.yml**                              | Configuración de la cadena de suministro de Socket.dev                                                             |
| **news.json**                               | Feed localizado de anuncios de v2; el elemento de lanzamiento de Radar se distribuye inactivo                      |
| **flake.nix** / **flake.lock**              | Definición del entorno de desarrollo de Nix + archivo de bloqueo                                                   |
| **.env**                                    | Secretos locales (ignorados por Git; generados a partir de `.env.example`)                                         |

> **Movido fuera de la raíz en v3.8.26 (limpieza):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` y el archivo generado `quality-metrics.json` (ignorado por Git). Consulta [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Aplicación Next.js

```
src/
├── app/                 # App Router (páginas + rutas de API + páginas de estado + página de inicio)
├── lib/                 # Bibliotecas principales / módulos de dominio (80 subdirectorios + ~70 archivos de nivel superior)
├── domain/              # Lógica de dominio pura (motor de políticas, respaldo, costes, bloqueo, comboResolver, evaluación)
├── server/              # Módulos exclusivos del servidor (canalización de autorización, CORS, middleware de autenticación) — no se pueden importar desde el cliente
├── shared/              # Compartido entre el servidor y el cliente cuando es seguro (constantes, tipos, validación, contratos, utilidades)
├── i18n/                # Configuración de next-intl + JSON de mensajes por configuración regional (67 configuraciones regionales)
├── middleware/          # Middleware de Next.js (enriquecimiento de solicitudes, detección de configuración regional)
├── mitm/                # Núcleo del proxy MITM: generación/instalación de certificados, controladores, destinos, inspector, máscaras, transferencia directa
│   ├── handlers/        # 9 clases de controladores de agentes de IDE que extienden MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Capa de captura de tráfico: búfer (anillo en memoria), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Código de enlace para adaptadores de modelos (capa de compatibilidad heredada)
├── scripts/             # Scripts de mantenimiento incluidos en el árbol (p. ej., backfillAggregation)
├── sse/                 # Controladores/servicios SSE heredados (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Almacén heredado en memoria (en proceso de sustitución por src/lib/db)
├── types/               # Archivos de tipos TS compartidos
├── instrumentation.ts   # Enlace de telemetría de Next.js (navegador + entorno perimetral)
├── instrumentation-node.ts  # Instrumentación exclusiva de Node
└── proxy.ts             # Capa de compatibilidad de entrada del proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Ruta                                                                         | Propósito                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API pública compatible con OpenAI (~25 subrutas: chat, completions, embeddings, archivos, lotes, audio, imágenes, vídeos, música, rerank, moderaciones, búsqueda, ws, agentes, cuentas, proveedores, etc.)                                                                                                                      |
| `app/api/v1beta/`                                                            | Endpoints de API al estilo de Gemini                                                                                                                                                                                                                                                                                            |
| `app/api/playground/`                                                        | Rutas de Playground Studio: `improve-prompt/` (POST — reescritor de prompts mediante LLM), `presets/` (GET para listar / POST para crear), `presets/[id]/` (GET / PUT / DELETE) — consulte `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                               |
| `app/api/` (no v1)                                                           | Rutas de gestión/administración (~60 directorios: proveedores, combinaciones, configuración, mcp, a2a, evaluaciones, memoria, habilidades, webhooks, cumplimiento, resiliencia, monitorización, túneles, herramientas CLI, etc.)                                                                                                |
| `app/api/tools/agent-bridge/`                                                | API REST de AgentBridge — 12 rutas (control del servidor, estado/DNS/asignaciones de agentes, bypass, certificado, CA ascendente). LOCAL_ONLY + SPAWN_CAPABLE. Consulte `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                    |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS de Traffic Inspector — más de 16 rutas (solicitudes, sesiones, hosts, modos de captura, exportación, ws). LOCAL_ONLY + SPAWN_CAPABLE. Consulte `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                         |
| `app/a2a/`                                                                   | Punto de entrada A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                 |
| `app/.well-known/agent.json/`                                                | Tarjeta de agente A2A (descubrimiento)                                                                                                                                                                                                                                                                                          |
| `app/(dashboard)/dashboard/`                                                 | Páginas de la interfaz del panel de control (más de 50 secciones, ~118 archivos page.tsx: proveedores, combinaciones, configuración, memoria, habilidades, webhooks, evaluaciones, auditoría, lotes, caché, costes, estado, sistema, actividad, etc.)                                                                           |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interfaz de Search Tools Studio (3 pestañas: Búsqueda/Extracción/Comparación + SearchConceptCard + ProviderCatalog) — consulte `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                         |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (estructura de 3 pestañas), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Página del panel de AgentBridge — tarjeta del servidor, 9 tarjetas de agentes, asistente de configuración, asignación de modelos, lista de bypass. i18n PT-BR + EN. Consulte `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                  |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Página del panel de Traffic Inspector — vista dividida de DevTools, 7 pestañas de detalles, 4 controles de modo de captura, grabador de sesiones, coloreado contextual. i18n PT-BR + EN. Consulte `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                       |
| `app/(dashboard)/dashboard/activity/`                                        | Página del feed de actividad (Grupo B): `page.tsx` (servidor) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — consulta `docs/architecture/MONITORING_SECTIONS.md`                                                                                                         |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Página de uso compartido de cuota (Grupo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Página de configuración de planes del proveedor (Grupo B): `page.tsx` + `ProviderPlanConfigClient.tsx` — las dimensiones de cuota por conexión sobrescriben la configuración                                                                                                                                                    |
| `app/docs/`                                                                  | Visor de documentación integrado (renderiza `docs/*.md`)                                                                                                                                                                                                                                                                        |
| `app/landing/`                                                               | Página de destino de marketing                                                                                                                                                                                                                                                                                                  |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Páginas relacionadas con la autenticación                                                                                                                                                                                                                                                                                       |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Páginas de error HTTP                                                                                                                                                                                                                                                                                                           |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Páginas estáticas/de estado                                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Diseño raíz, inicio, manifiesto de PWA y CSS global                                                                                                                                                                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Límites de error                                                                                                                                                                                                                                                                                                                |

### `src/lib/` — Bibliotecas principales (~50 módulos)

| Módulo                                   | Propósito                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Gestor de tareas del protocolo A2A, habilidades (5), transmisión en tiempo real                                                                                                                                                                                                                                                         |
| `acp/`                                   | Registro de agentes CLI (descubrimiento de CLI locales; consulte `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                            |
| `api/`                                   | Utilidades compartidas de la API (`requireManagementAuth`, validación)                                                                                                                                                                                                                                                                  |
| `auth/`                                  | Sesión, hash de contraseñas, validación de tokens                                                                                                                                                                                                                                                                                       |
| `batches/`                               | Controladores de la API Batches de OpenAI                                                                                                                                                                                                                                                                                               |
| `catalog/`                               | Validación con Zod del catálogo de proveedores + resolución de capacidades                                                                                                                                                                                                                                                              |
| `cloudAgent/`                            | Agentes en la nube (Codex Cloud, Devin, Jules); consulte `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                               |
| `combos/`                                | Resolución de combinaciones + utilidades de reordenación                                                                                                                                                                                                                                                                                |
| `audit/`                                 | Utilidades del feed de actividad: `highLevelActions.ts` (lista de permitidos + `isHighLevelAction()`), `activityIcons.ts` (mapa de acción → icono/verbo), `timeline.ts` (groupByDay/relativeTime); consulte `docs/architecture/MONITORING_SECTIONS.md`                                                                                  |
| `compliance/`                            | Registro de auditoría + auditoría de proveedores; consulte `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                |
| `compression/`                           | Código de integración del motor de compresión (los motores se encuentran en `open-sse/services/compression/`)                                                                                                                                                                                                                           |
| `config/`                                | Utilidades de configuración en tiempo de ejecución                                                                                                                                                                                                                                                                                      |
| `db/`                                    | Más de 120 módulos de BD por dominio + 168 migraciones (utilice siempre este módulo para SQLite)                                                                                                                                                                                                                                        |
| `quota/`                                 | Motor de uso compartido de cuotas: `dimensions.ts` (tipos/Zod), `types.ts` (interfaz QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts`; consulte `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Cliente del catálogo de modelos gratuitos de Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — consulta `docs/frameworks/RADAR.md`                                                                                                                                    |
| `display/`                               | Utilidades auxiliares de formato para la IU (coste, latencia, etc.)                                                                                                                                                                                                                                                                     |
| `embeddings/`                            | Utilidades auxiliares del servicio de embeddings                                                                                                                                                                                                                                                                                        |
| `env/`                                   | Análisis y validación de variables de entorno                                                                                                                                                                                                                                                                                           |
| `evals/`                                 | Framework de evaluación (suites, ejecutor, entorno de ejecución) — consulta `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                  |
| `guardrails/`                            | Enmascarador de PII, protección contra inyección de prompts y puente de visión — consulta `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                 |
| `jobs/`                                  | Tareas en segundo plano (similares a cron)                                                                                                                                                                                                                                                                                              |
| `memory/`                                | Memoria conversacional (RRF híbrido de SQLite FTS5 + sqlite-vec + nivel 2 de Qdrant) — consulta `docs/frameworks/MEMORY.md`                                                                                                                                                                                                             |
| `memory/embedding/`                      | Capa de embeddings de múltiples fuentes: `index.ts` (resolutor), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                               |
| `memory/vectorStore.ts`                  | Contenedor de sqlite-vec v0.1.9 — KNN por fuerza bruta + RRF híbrido (FTS5 + vector, k=60). Inicialización diferida; se degrada correctamente cuando sqlite-vec no está disponible. (plan 21)                                                                                                                                           |
| `memory/reindex.ts`                      | `runReindexBatch()` — procesa en segundo plano las memorias con `needs_reindex=1`; se invoca mediante `POST /api/memory/reindex` y la ruta de relleno diferido. (plan 21)                                                                                                                                                               |
| `monitoring/`                            | Comprobaciones de estado y emisión de métricas                                                                                                                                                                                                                                                                                          |
| `oauth/`                                 | Flujos de OAuth/importación para 22 módulos de proveedores (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                  |
| `plugins/`                               | Registro de plugins                                                                                                                                                                                                                                                                                                                     |
| `promptCache/`                           | Puntos de interrupción de caché de prompts al estilo de Anthropic                                                                                                                                                                                                                                                                       |
| `skills/`                                | Framework de habilidades (integradas + marketplace + SkillsSH) — consulta `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                   |
| `playground/`                            | Utilidades compartidas de Playground Studio: `codeExport.ts` (generador de curl/Python/TS), `promptImprover.ts` (constructor de metaprompts), `streamMetrics.ts` (TTFT/TPS puro), `types.ts` (tabla de precios) — consulta `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                       |
| `webhookDispatcher.ts`                   | Entrega de webhooks con HMAC — consulta `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                   |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Gestores de túneles — consulta `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                              |
| `cloudSync.ts`, `initCloudSync.ts`       | Sincronización opcional del estado con la nube                                                                                                                                                                                                                                                                                          |
| `localDb.ts`                             | Módulo de reexportación para los módulos de la base de datos (sin lógica; solo reexportaciones)                                                                                                                                                                                                                                         |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Almacenamiento en caché de solicitudes + idempotencia                                                                                                                                                                                                                                                                                   |
| (~30 archivos de nivel superior más)     | Utilidades especializadas (logEnv, modelsDevSync, piiSanitizer, etc.)                                                                                                                                                                                                                                                                   |

### `src/lib/db/` — Base de datos (147 módulos + 208 migraciones)

| Subdirectorio             | Propósito                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | Singleton `getDbInstance()` con registro WAL                                                                                                                                                     |
| `db/migrations/`          | Archivos SQL versionados (idempotentes y transaccionales). `073_memory_vec.sql` añade `memory_vec_meta` + la columna `needs_reindex` (plan 21).                                                  |
| `db/playgroundPresets.ts` | Módulo CRUD para los ajustes preestablecidos de Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD para `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, etc. (plan 21)                                     |
| `db/<domain>.ts`          | Un módulo por dominio: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, etc.                       |

### `src/domain/`

| Módulo                 | Propósito                                                             |
| ---------------------- | --------------------------------------------------------------------- |
| `policy.ts`            | Motor de políticas                                                    |
| `fallbackPolicy.ts`    | Árbol de decisiones de respaldo                                       |
| `costRules.ts`         | Reglas de cálculo de costes                                           |
| `lockoutPolicy.ts`     | Política de bloqueo de modelos/conexiones                             |
| `tagRouter.ts`         | Enrutamiento basado en etiquetas                                      |
| `comboResolver.ts`     | Resolución de combinaciones (utilizada por el motor de combinaciones) |
| `modelAvailability.ts` | Comprobación de disponibilidad por modelo                             |
| `assessment/`          | Evaluación de modelos (fase 1 de RFC-AUTO-ASSESSMENT)                 |

### `src/server/`

| Módulo   | Propósito                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| `authz/` | Canalización de autorización: `classify` → `policies` → `enforce` — consulta `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configuración de CORS                                                                                           |
| `auth/`  | Middleware de sesión                                                                                            |

### `src/shared/`

| Módulo                           | Propósito                                                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `components/`                    | API de componentes del panel: adaptadores sobre `packages/ui-kit` — consulte `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nombres de iconos usados por las pantallas → componentes de Lucide (`<Icon>`)                         |
| `constants/providers.ts`         | **376 proveedores** con validación de Zod (fuente de verdad)                                                      |
| `constants/cliTools.ts`          | Registro de herramientas CLI externas                                                                             |
| `constants/routingStrategies.ts` | **20 estrategias de enrutamiento** con prioridades                                                                |
| `constants/publicApiRoutes.ts`   | Rutas que requieren autenticación Bearer (en lugar de autenticación de administración)                            |
| `constants/upstreamHeaders.ts`   | Lista de encabezados denegados para solicitudes ascendentes                                                       |
| `validation/schemas.ts`          | ~80 esquemas de Zod (fuente única de verdad para los contratos de la API)                                         |
| `validation/helpers.ts`          | Funciones auxiliares de validación de Zod (`validateBody`, etc.)                                                  |
| `types/`                         | Tipos de TS compartidos                                                                                           |
| `contracts/`                     | Contratos de la API pública (consumidos mediante `files:` en `package.json`)                                      |
| `utils/circuitBreaker.ts`        | Disyuntor de proveedores (consulte `docs/architecture/RESILIENCE_GUIDE.md`)                                       |
| `utils/apiAuth.ts`               | Validación de claves de API y comprobación de ámbitos                                                             |
| `utils/fetchTimeout.ts`          | Envoltorios de tiempo de espera/cancelación para solicitudes ascendentes                                          |
| `utils/releaseNotes.ts`          | Analizador de anuncios cerrados de v2/versiones heredadas, localización y descarte por ID                         |

---

## `open-sse/` — Espacio de trabajo del motor de streaming

Espacio de trabajo npm independiente (`@omniroute/open-sse`). Gestiona el procesamiento de solicitudes y la ejecución de proveedores.

```
open-sse/
├── handlers/            # 16 archivos (12 controladores + 4 auxiliares): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, etc.
├── executors/           # 150 módulos ejecutores (clases que extienden BaseExecutor + auxiliares por proveedor)
├── translator/          # Conversores de formato (9 de solicitudes, 9 de respuestas, 9 auxiliares)
├── transformer/         # API de respuestas ↔ Completado de chat (TransformStream)
├── services/            # ~80+ módulos de servicio (combo, accountFallback, autoCombo, reasoningCache, modo sigiloso de claude code/chatgpt, modelDeprecation, taskAwareRouter, workflowFSM, etc.)
├── mcp-server/          # Servidor MCP (110 herramientas, 3 transportes, 33 ámbitos)
├── config/              # Registros de proveedores/modelos, configuración de encabezados, alias de modelos
├── utils/               # Cliente TLS, fetch/dispatcher de proxy, auxiliares de red
├── index.ts             # Punto de entrada del espacio de trabajo
├── package.json         # Manifiesto del espacio de trabajo
├── tsconfig.json        # Configuración TS del espacio de trabajo
└── types.d.ts           # Declaraciones de tipos del espacio de trabajo
```

### `open-sse/mcp-server/`

| Ruta                        | Propósito                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `server.ts`                 | Ciclo de vida del servidor MCP (transportes stdio + HTTP)                                  |
| `httpTransport.ts`          | Transportes HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                      |
| `audit.ts`                  | Registro de auditoría en la tabla `mcp_tool_audit`                                         |
| `scopeEnforcement.ts`       | Validación de ámbitos por herramienta                                                      |
| `runtimeHeartbeat.ts`       | Latido de estado en `DATA_DIR/runtime/mcp-heartbeat.json`                                  |
| `descriptionCompressor.ts`  | Comprime los metadatos de descripción de herramientas para ahorrar contexto                |
| `schemas/tools.ts`          | 36 definiciones de herramientas base + ámbitos                                             |
| `tools/advancedTools.ts`    | Implementaciones de herramientas avanzadas                                                 |
| `tools/memoryTools.ts`      | 3 herramientas de memoria (buscar/añadir/borrar)                                           |
| `tools/skillTools.ts`       | 4 herramientas de habilidades (listar/habilitar/ejecutar/ejecuciones)                      |
| `tools/compressionTools.ts` | 5 herramientas de compresión                                                               |
| `README.md`                 | README interno del servidor MCP (con enlace cruzado desde `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Espacios de trabajo

| Ruta                     | Propósito                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — instantánea incorporada del Keak CI UI Kit (`private`, `UNLICENSED`), consumida como código fuente (sin compilación). `UPSTREAM.md` fija el commit de origen y registra la autorización de licencia; `PATCHES.md` enumera los parches locales (ninguno); `src/` solo se sincroniza mediante `scripts/dev/sync-ui-kit.sh` y está protegido por `npm run check:ui-kit-snapshot`. Consulte `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — servicio opcional de grupo de navegadores (chat respaldado por CloakBrowser y Playwright)                                                                                                                                                                                                                                                                                                                              |

---

## `electron/` — Contenedor de escritorio

| Archivo          | Propósito                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `main.js`        | Proceso principal de Electron (BrowserWindow, servidor Next.js integrado, bandeja, actualización automática) |
| `preload.js`     | Puente IPC (contextBridge → `window.omniroute`)                                                              |
| `package.json`   | Configuración de electron-builder + Electron 41 + dependencias de electron-builder 26.10                     |
| `assets/`        | Iconos de la aplicación (Windows .ico, macOS .icns, Linux .png)                                              |
| `dist-electron/` | Salida de compilación (ignorada por git)                                                                     |
| `types.d.ts`     | Declaraciones de tipos para el puente del renderizador                                                       |
| `README.md`      | README interno de Electron (consulta también `docs/guides/ELECTRON_GUIDE.md`)                                |

---

## `bin/` — CLI

| Archivo                                                                                                     | Propósito                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Punto de entrada principal de la CLI: `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, etc. |
| `reset-password.mjs`                                                                                        | CLI independiente para restablecer la contraseña                                                                                                |
| `cli/commands/setup.mjs`                                                                                    | Asistente de configuración interactivo y no interactivo                                                                                         |
| `cli/commands/doctor.mjs`                                                                                   | Diagnósticos del estado del sistema (más de 8 comprobaciones)                                                                                   |
| `cli/commands/providers.mjs`                                                                                | Listado/prueba/validación de proveedores                                                                                                        |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Módulos auxiliares de la CLI                                                                                                                    |
| `cli/tray/tray.ts`                                                                                          | Integración con la bandeja del sistema (multiplataforma: NotifyIcon en Windows, systray2 en macOS/Linux)                                        |
| `cli/tray/tray.ps1`                                                                                         | Backend de NotifyIcon en PowerShell (Windows, sin binarios nuevos)                                                                              |
| `cli/tray/autostart.ts`                                                                                     | Inicio automático multiplataforma (LaunchAgent / .desktop / registro)                                                                           |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Cadena de resolución del controlador SQLite en 5 pasos (incluido → tiempo de ejecución → instalación diferida → node:sqlite → sql.js)           |
| `cli/runtime/magicBytes.mjs`                                                                                | Validación de bytes mágicos de binarios (ELF / Mach-O / Mach-O fat / PE)                                                                        |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — resuelve previamente los controladores durante la posinstalación o el primer inicio                                        |
| `nodeRuntimeSupport.mjs`                                                                                    | Valida la versión compatible de Node.js durante la instalación                                                                                  |

---

## `skills/` — Habilidades públicas de agentes

| Archivo                      | Propósito                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifiestos de habilidades para agentes de IA externos (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripts de compilación y comprobación

| Script                              | Propósito                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Ejecutor de desarrollo/inicio con carga de variables de entorno                                                          |
| `build-next-isolated.mjs`           | Compilación independiente (modo standalone de Next.js 16)                                                                |
| `prepublish.ts`                     | Preparación del paquete antes de `npm pack`                                                                              |
| `postinstall.mjs`                   | Creación automática de `.env` a partir de `.env.example` en la primera instalación                                       |
| `sync-env.mjs`                      | Resincronización de las claves de `.env` con `.env.example`                                                              |
| `check-cycles.mjs`                  | Detección de dependencias circulares                                                                                     |
| `check-route-validation.mjs`        | Validación de que todas las rutas de la API tengan validación de Zod                                                     |
| `check-t11-any-budget.mjs`          | Aplicación del límite explícito de `any` por archivo                                                                     |
| `check-docs-sync.mjs`               | Validación de la sincronización de versiones de la documentación (pre-commit existente)                                  |
| **`check-env-doc-sync.mjs`**        | NUEVO: cotejo de variables de entorno entre el código, `.env.example` y `ENVIRONMENT.md`                                 |
| **`check-docs-counts-sync.mjs`**    | NUEVO: validación de que los recuentos (ejecutores, estrategias, OAuth y habilidades A2A) coincidan con la documentación |
| **`check-deprecated-versions.mjs`** | NUEVO: detección de versiones y fechas obsoletas en la documentación                                                     |
| `check-supported-node-runtime.ts`   | Validación de que la versión actual de Node sea compatible                                                               |
| `check-pr-test-policy.mjs`          | Aplicación de la regla de «pruebas obligatorias» a los cambios en el código de producción                                |
| **`gen-provider-reference.ts`**     | NUEVO: generación automática de `docs/reference/PROVIDER_REFERENCE.md` a partir del catálogo                             |
| `i18n/generate-multilang.mjs`       | Traducción de cadenas de la interfaz y documentación mediante Google Translate                                           |
| `i18n_autotranslate.py`             | Canalización de traducción de documentación basada en LLM                                                                |
| `validate_translation.py`           | Validación de traducciones por configuración regional                                                                    |
| `check_translations.py`             | Comprobación de claves de i18n en el código                                                                              |
| `run-playwright-tests.mjs`          | Ejecutor de pruebas E2E de Playwright                                                                                    |
| `run-protocol-clients-tests.mjs`    | Ejecutor de pruebas E2E de MCP/A2A                                                                                       |
| `run-ecosystem-tests.mjs`           | Pruebas del ecosistema (integración de proveedores)                                                                      |
| `test-report-summary.mjs`           | Generación del resumen de cobertura en Markdown                                                                          |
| `smoke-electron-packaged.mjs`       | Prueba de humo de la compilación empaquetada de Electron                                                                 |
| `native-binary-compat.mjs`          | Validación de que las dependencias nativas (`better-sqlite3`) coincidan con el Node de Electron                          |
| `validate-pack-artifact.ts`         | Validación de la salida de npm pack                                                                                      |
| `responses-ws-proxy.mjs`            | Puente WebSocket para la API Responses de Codex                                                                          |
| `v1-ws-bridge.mjs`                  | Puente WebSocket para el endpoint `/api/v1/ws`                                                                           |
| `standalone-server-ws.mjs`          | Ejecutor del servidor WS independiente                                                                                   |
| `system-info.mjs`                   | Impresión de información del sistema y del entorno de ejecución para soporte                                             |
| `healthcheck.mjs`                   | Comprobación de estado única (utilizada por Docker HEALTHCHECK)                                                          |
| `uninstall.mjs`                     | Script de desinstalación limpia                                                                                          |
| `dev/sync-ui-kit.sh`                | Copia del `src/` del CI UI Kit de un commit fijado a `packages/ui-kit/src`                                               |
| `check/check-ui-kit-snapshot.mjs`   | Control de pre-commit: `packages/ui-kit/src` coincide con el commit fijado del repositorio de origen                     |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — nombres de iconos en uso que `ICON_MAP` no asigna                                               |
| `dev/codemod-material-icons.mjs`    | Reescritura de spans literales de Material Symbols a `<Icon>` (herramientas de migración)                                |

---

## `docs/` — Documentación pública (7 archivos raíz + 17 subdirectorios)

### Guías principales

| Documento                   | Propósito                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Arquitectura de alto nivel, mapa de subsistemas, superficie del panel                                  |
| `CODEBASE_DOCUMENTATION.md` | Referencia de ingeniería: directorios, módulos, convenciones                                           |
| `FEATURES.md`               | Matriz de funcionalidades con aspectos destacados de v3.8                                              |
| `USER_GUIDE.md`             | Manual de usuario final (configuración, modelos, combos, CLI, audio, etc.)                             |
| `API_REFERENCE.md`          | Referencia de endpoints de la API con modelo de autenticación                                          |
| `openapi.yaml`              | Especificación OpenAPI 3.0 (121 rutas)                                                                 |
| `SETUP_GUIDE.md`            | Métodos de instalación (npm, npx, Docker, Electron, Termux, código fuente)                             |
| `ENVIRONMENT.md`            | Todas las variables de entorno (~800 documentadas, ~3.050 líneas en `.env.example`)                    |
| `TROUBLESHOOTING.md`        | Errores comunes + problemas conocidos de v3.8.0                                                        |
| `RELEASE_CHECKLIST.md`      | Flujo completo de publicación (skills, husky, commits convencionales, despliegue)                      |
| `COVERAGE_PLAN.md`          | Objetivos de cobertura y estado actual                                                                 |
| `FREE_TIERS.md`             | Proveedores con niveles gratuitos seleccionados (48+ gratuitos + 11 OAuth)                             |
| `CLI-TOOLS.md`              | Integraciones con CLI externas + CLI interna de OmniRoute                                              |
| `I18N.md`                   | Arquitectura de i18n, adición de un idioma, 67 configuraciones regionales                              |
| `UNINSTALL.md`              | Pasos para una desinstalación limpia                                                                   |
| `PROVIDER_REFERENCE.md`     | Catálogo **generado automáticamente** de 376 proveedores (regenerar: `npm run gen:provider-reference`) |

### Análisis detallados de subsistemas

| Documento                                   | Propósito                                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | Servidor MCP: 110 herramientas, 3 transportes, 33 ámbitos, endpoints REST                                       |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 skills, asistentes REST, tarjeta de agente                                                |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Guía unificada: A2A frente a ACP frente a agentes en la nube                                                    |
| `CLOUD_AGENT.md`                            | Orquestación de Codex Cloud / Devin / Jules                                                                     |
| `SKILLS.md`                                 | Framework de skills (integradas + marketplace + SkillsSH + sandbox)                                             |
| `RADAR.md`                                  | Capa superpuesta del catálogo Radar de modelos gratuitos (`RADAR_ENABLED`, desactivada de forma predeterminada) |
| `MEMORY.md`                                 | Sistema de memoria (SQLite FTS5 + Qdrant)                                                                       |
| `EVALS.md`                                  | Framework de evaluación (suites, ejecuciones, rúbricas)                                                         |
| `GUARDRAILS.md`                             | Enmascarador de PII, inyección de prompts, puente de visión                                                     |
| `COMPLIANCE.md`                             | Registro de auditoría, retención, exclusión mediante noLog                                                      |
| `WEBHOOKS.md`                               | Entrega de webhooks firmados con HMAC                                                                           |
| `REASONING_REPLAY.md`                       | Caché híbrida de memoria/SQLite para `reasoning_content`                                                        |
| `AUTHZ_GUIDE.md`                            | Flujo de autorización (`classify` → `policies` → `enforce`)                                                     |
| `RESILIENCE_GUIDE.md`                       | Disyuntor + tiempo de espera + bloqueo de modelos                                                               |
| `docs/security/STEALTH_GUIDE.md` (git only) | Huella digital TLS (JA3/JA4), CCH de Claude Code, certificado MITM                                              |
| `AUTO-COMBO.md`                             | Motor Auto Combo (puntuación de 16 factores, 6 paquetes de modos, fábrica virtual)                              |

### Compresión

| Documento                       | Propósito                                                     |
| ------------------------------- | ------------------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Descripción general de los modos de compresión + hoja de ruta |
| `COMPRESSION_ENGINES.md`        | Motores Caveman + RTK, contrato del registro                  |
| `COMPRESSION_RULES_FORMAT.md`   | Esquema JSON del paquete de reglas de Caveman                 |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventario de paquetes de reglas por idioma                   |
| `RTK_COMPRESSION.md`            | Pipeline declarativo de RTK (49 filtros)                      |

### Despliegue

| Documento                    | Propósito                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Compilación con Docker, perfiles (base/cli/host/cliproxyapi), contenedor auxiliar de Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Despliegue genérico en VM/VPS (Ubuntu/Debian + nginx + systemd)                            |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Despliegue en Fly.io (actualmente disponible solo en chino)                                |
| `TERMUX_GUIDE.md`            | Ejecución sin interfaz gráfica en Android mediante Termux                                  |
| `PWA_GUIDE.md`               | Instalación de la aplicación web progresiva + service worker                               |
| `ELECTRON_GUIDE.md`          | Compilación + firma + distribución de la aplicación de escritorio                          |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                                     |
| `PROXY_GUIDE.md`             | Proxy de salida de 4 niveles + marketplace de 1proxy                                       |

### Subdirectorios

| Subdirectorio         | Propósito                                                                                                                                                                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Traducciones localizadas de la documentación (41 configuraciones regionales)                                                                                                                                                                                         |
| `docs/screenshots/`   | Recursos de imágenes para las guías                                                                                                                                                                                                                                  |
| `_tasks/superpowers/` | Planes/especificaciones de superpowers (`writing-plans`/`brainstorming`) + investigación — repositorio aislado, con control de versiones independiente e ignorado por Git en el árbol principal. Consulte CLAUDE.md → "Artefactos de planificación e investigación". |

---

## `tests/` — Suites de pruebas

| Subdirectorio                        | Tipo                                                 | Ejecutor                                            |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------------------------- |
| `tests/unit/`                        | Pruebas unitarias (~4.800 archivos, las más rápidas) | Ejecutor de pruebas nativo de Node                  |
| `tests/integration/`                 | Pruebas de integración multimódulo + BD              | Ejecutor de pruebas nativo de Node (concurrencia 1) |
| `tests/e2e/`                         | E2E de interfaz de usuario + flujo de trabajo        | Playwright                                          |
| `tests/e2e/protocol-clients.test.ts` | E2E de cliente real MCP + A2A                        | Clientes de protocolo personalizados                |
| `tests/e2e/ecosystem.test.ts`        | Integración de proveedores (accede a la red)         | Ejecutor de pruebas nativo de Node                  |

---

## `public/` — Recursos estáticos

| Ruta                | Propósito                                                                |
| ------------------- | ------------------------------------------------------------------------ |
| `public/` (raíz)    | Favicons, robots.txt, manifiesto, service worker e imágenes de marketing |
| `public/providers/` | Logotipos PNG/SVG de proveedores (utilizados en el panel de control)     |

---

## `config/` — Configuraciones estáticas + estado de los controles de calidad

Plantillas de configuración distribuidas junto con las líneas base de los controles de calidad incluidas en el repositorio
(trasladadas aquí desde la raíz del repositorio en v3.8.26 para mantenerla despejada).

| Ruta                                          | Propósito                                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista de configuraciones regionales + metadatos (fuente canónica para el recuento de 42 configuraciones regionales) |
| `config/i18n-schema.json`                     | Esquema JSON que valida `i18n.json`                                                                                 |
| `config/payloadRules.json`                    | Reglas de saneamiento de cargas útiles ascendentes                                                                  |
| `config/quality/quality-baseline.json`        | Línea base incremental de múltiples métricas (`scripts/quality/check-quality-ratchet.mjs`)                          |
| `config/quality/complexity-baseline.json`     | Línea base fija de complejidad de ESLint (`check-complexity.mjs`)                                                   |
| `config/quality/duplication-baseline.json`    | Línea base fija de duplicación de jscpd (`check-duplication.mjs`)                                                   |
| `config/quality/file-size-baseline.json`      | Línea base fija del tamaño por archivo (`check-file-size.mjs`)                                                      |
| `config/quality/test-discovery-baseline.json` | Línea base fija de pruebas huérfanas (`check-test-discovery.mjs`)                                                   |
| `config/quality/dependency-allowlist.json`    | Lista de dependencias aprobadas (`check-deps.mjs`)                                                                  |
| `config/quality/.license-allowlist.json`      | Lista de licencias SPDX permitidas (`check-licenses.mjs`)                                                           |
| `config/quality/quality-metrics.json`         | Métricas efímeras recopiladas (generadas por `collect-metrics.mjs`; **ignoradas por git**)                          |

---

## `.github/` — Integración con GitHub

| Ruta                               | Propósito                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| `.github/workflows/`               | Flujos de trabajo de CI/CD de GitHub Actions (lint, pruebas, cobertura, publicación) |
| `.github/ISSUE_TEMPLATE/`          | Plantillas de incidencias para errores/funcionalidades                               |
| `.github/pull_request_template.md` | Plantilla de PR                                                                      |
| `.github/dependabot.yml`           | Configuración de actualización de dependencias                                       |

---

## `.husky/` — Hooks de Git

| Archivo      | Propósito                                                                       |
| ------------ | ------------------------------------------------------------------------------- |
| `pre-commit` | Ejecuta `lint-staged + check-docs-sync + check:any-budget:t11`                  |
| `pre-push`   | Actualmente deshabilitado (comentado). Ejecuta `npm run test:unit` manualmente. |
| `_/`         | Componentes internos de Husky                                                   |

---

## `.claude/` — Comandos slash de Claude Code

| Archivo                                             | Propósito                                                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrementa la versión y genera automáticamente el registro de cambios |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — flujo de trabajo completo de publicación                          |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Despliega en VPS                                                                           |
| `commands/capture-release-evidences-cc.md`          | Graba en el navegador las nuevas funcionalidades como WebP                                 |
| `commands/review-{prs,discussions}-cc.md`           | Clasifica PR y discusiones de GitHub                                                       |
| `commands/{review-issues,implement-features}-cc.md` | Flujos de trabajo de incidencias                                                           |
| `settings.local.json`                               | Configuración de Claude Code específica del proyecto                                       |

---

## `.agents/` — Flujos de trabajo genéricos para agentes (Codex / Cursor / etc.)

| Ruta                     | Propósito                                                             |
| ------------------------ | --------------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definiciones de flujos de trabajo (réplica de `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definiciones de habilidades con notas de ejecución de Codex         |

> **Nota:** Actualmente, los flujos de trabajo y los comandos son idénticos byte por byte. Si `.agents/` está destinado a un entorno de ejecución de agente diferente (Codex), las variantes deben diferenciarse de forma significativa.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Fuera del árbol

Estos directorios con prefijo de guion bajo contienen material que no se distribuye:

- **`_ideia/`** — notas de diseño (categorías defer / notfit / viable)
- **`_mono_repo/`** — subproyectos históricos (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clones de solo lectura de proyectos OSS relacionados (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, etc.) para realizar consultas cruzadas durante el desarrollo
- **`_tasks/`** — archivos informales de seguimiento de tareas por versión

No se incluyen en la salida de `npm pack`. Consulta `.npmignore`.

---

## Generados / ignorados por Git

| Ruta                   | Propósito                              |
| ---------------------- | -------------------------------------- |
| `node_modules/`        | Dependencias de npm                    |
| `.next/`               | Salida de compilación de Next.js       |
| `coverage/`            | Informes de cobertura de c8            |
| `logs/`                | Registros de ejecución                 |
| `package/`             | Preparación del paquete npm            |
| `.playwright-mcp/`     | Artefactos de prueba de Playwright MCP |
| `.issues/`             | Caché local de incidencias             |
| `tsconfig.tsbuildinfo` | Caché incremental de TS                |

---

## Consejos de navegación

- **¿Eres un colaborador nuevo?** Lee `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **¿Vas a añadir un proveedor?** Sigue `docs/architecture/ARCHITECTURE.md § Adding a New Provider` y compáralo con `docs/reference/PROVIDER_REFERENCE.md`.
- **¿Vas a añadir una ruta?** Consulta `docs/architecture/ARCHITECTURE.md § Adding a New API Route` y `src/shared/validation/schemas.ts`.
- **¿Vas a añadir una herramienta MCP?** Consulta `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **¿Vas a añadir una capacidad A2A?** Consulta `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **¿Vas a ejecutarlo localmente?** Consulta `docs/guides/SETUP_GUIDE.md`.
- **¿Vas a desplegarlo?** Consulta `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **¿Vas a publicar una versión?** Consulta `docs/ops/RELEASE_CHECKLIST.md` (y la capacidad `/generate-release-cc` de Claude Code).
