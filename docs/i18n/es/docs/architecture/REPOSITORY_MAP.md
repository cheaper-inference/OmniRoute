# Repository Map (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Qué vive y dónde: cada directorio de nivel superior y archivo raíz rastreados, con un propósito de una sola línea.** Última actualización: 2026-11-13 (OmniRoute v3.8.54)
>
> Utilice este mapa para orientarse en el código base y luego siga los enlaces a los documentos dedicados. El recuento de archivos se midió con `git ls-files` en la fecha anterior. Cambian con casi cada lanzamiento, así que trátelos como órdenes de magnitud.

## Árbol de nivel superior

```
OmniRoute/
├── src/              # Next.js 16 app: dashboard, /api and /v1 routes, server libs, domain, i18n
├── open-sse/         # Streaming engine workspace (@omniroute/open-sse): handlers, executors, translator, services, MCP server
├── packages/         # npm workspaces: ui-kit (vendored Keak CI UI Kit) and browser-pool
├── @omniroute/       # Separately published npm packages (OpenCode plugins and provider)
├── bin/              # Published `omniroute` CLI, MCP/bridge entry points, self-host ops scripts (*.sh)
├── electron/         # Desktop app (Electron main/preload + helpers + icons)
├── public/           # Static assets served by Next.js (provider logos, PWA icons, sw.js, openapi.yaml copy)
├── skills/           # Agent Skills (SKILL.md) served by /api/agent-skills, MCP and A2A
├── tests/            # All test suites: unit, integration, e2e, homolog, fixtures, snapshots
├── scripts/          # Build, quality gates, i18n, release, ops, perf and one-off scripts (allow-listed subfolders)
├── config/           # Versioned config: i18n, payload rules, CLI manifest, quality-gate baselines, release inventories
├── changelog.d/      # Per-PR changelog fragments, aggregated into CHANGELOG.md at release time
├── docs/             # Public documentation (served at /docs via Fumadocs) + translated mirrors in docs/i18n/
├── examples/         # Example plugins and quickstart clients
├── deploy/           # Kubernetes deployment: Helm chart + Kustomize base/overlays
├── docker/           # Auxiliary container images (not the main image, which is the root Dockerfile)
├── contrib/          # Community recipes: Podman quadlets, VPS compose, Windows launchers, session-sync note
├── .github/          # GitHub Actions workflows, composite actions, issue/PR templates, CODEOWNERS, labels
├── .husky/           # Tracked git hooks: commit-msg, pre-commit, pre-push
├── .vale/            # Vale prose-lint vocabulary (styles/Vocab/OmniRoute/accept.txt)
├── .vscode/          # Shared VS Code workspace settings (settings.json)
└── (root files — see below)
```

Rutas locales, generadas o privadas (todas ignoradas, nunca confirmadas, no descritas más):

```
node_modules/            # npm dependencies
.build/                  # Next.js build output (default distDir .build/next, see next.config.mjs)
dist/                    # npm staging directory assembled by scripts/build/prepublish.ts
.source/                 # fumadocs-mdx output that feeds the /docs viewer
.husky/_/                # Husky runtime generated on install (core.hooksPath target)
coverage/ logs/ test-results/ playwright-report/   # coverage, runtime logs, Playwright output
.env                     # local secrets generated from .env.example
_*/                      # private local-only folders (anchored /_* ignore); never tracked
.claude/ .agents/        # local AI-assistant state and skills; never tracked
```

---

## Archivos raíz

Todos los archivos rastreados en la raíz del repositorio (`git ls-files | grep -v /`), agrupados por función.

### Documentación del proyecto

| Archivo                  | Objetivo                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `README.md`              | Página de inicio: descripción general de funciones, inicio rápido, métodos de instalación          |
| `CHANGELOG.md`           | Registro de cambios por lanzamiento (los fragmentos de `changelog.d/` se incluyen aquí)            |
| `ROADMAP.md`             | Hoja de ruta pública                                                                               |
| `LICENSE`                | licencia MIT                                                                                       |
| `THIRD_PARTY_NOTICES.md` | Avisos para código de terceros incluido (por ejemplo, los enlaces wreq-js)                         |
| `CONTRIBUTING.md`        | Guía para contribuyentes: configuración, confirmaciones convencionales, matriz de prueba, flujo PR |
| `SECURITY.md`            | Política de informes de vulnerabilidad                                                             |
| `CODE_OF_CONDUCT.md`     | Expectativas de comportamiento de la comunidad.                                                    |
| `llm.txt`                | Resumen del proyecto en texto plano para rastreadores y asistentes LLM                             |

### Instrucciones del asistente de IA

| Archivo     | Objetivo                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Fuente única de verdad para cada asistente AI : convenciones, puertas de calidad, reglas estrictas |
| `CLAUDE.md` | Código Claude: deltas específicos; importaciones `AGENTS.md`                                       |
| `GEMINI.md` | Deltas específicos de Géminis; apunta de nuevo a `AGENTS.md`                                       |

También existen guías anidadas junto al código que describen: `open-sse/services/AGENTS.md` y `src/lib/db/AGENTS.md`.

### Manifiestos de paquetes y cadena de herramientas de Node

| Archivo                    | Objetivo                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `package.json`             | Manifiesto npm: scripts, dependencias, `engines`, `workspaces`, `files` publicado                    |
| `package-lock.json`        | Árbol de dependencia bloqueado                                                                       |
| `pnpm-workspace.yaml`      | Lista de espacios de trabajo pnpm (`packages/*`, `open-sse`) y lista permitida de compilación nativa |
| `.npmrc` / `.npmignore`    | npm config y publicaciones de exclusiones                                                            |
| `.node-version` / `.nvmrc` | Pines de versión de nodo para administradores de versiones                                           |
| `flake.nix` / `flake.lock` | Nix dev shell y su bloqueo                                                                           |
| `Makefile`                 | Atajos `make` que delegan a los scripts npm                                                          |

### compilación de TypeScript, Next.js y docs

| Archivo                                   | Objetivo                                                                                |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Configuración base TypeScript y alias de ruta (`@/*`, `@omniroute/open-sse`)            |
| `tsconfig.typecheck-core.json`            | rebanada `npm run typecheck:core`                                                       |
| `tsconfig.typecheck-noimplicit-core.json` | rebanada `npm run typecheck:noimplicit:core` ( `noImplicitAny` estricta)                |
| `tsconfig.typecheck-api.json`             | Segmento de verificación de tipo de ruta API (`scripts/check/check-api-typecheck.mjs`)  |
| `tsconfig.typecheck-dashboard.json`       | Sector de verificación de tipo del panel (`npm run check:dashboard-typecheck`)          |
| `tsconfig.build.json`                     | Verificación de tipo de producción (`npm run typecheck:build`, `check:build-typecheck`) |
| `tsconfig.mitm.json`                      | Configuración de compilación MITM utilizada por `scripts/build/buildMitm.mjs`           |
| `next.config.mjs`                         | Configuración Next.js 16 (salida independiente, alias de perfil de compilación)         |
| `source.config.ts`                        | Configuración de Fumadocs `defineDocs` : qué secciones `docs/` se compilan en `/docs`   |
| `postcss.config.mjs`                      | tubería PostCSS / Tailwind                                                              |

### Pelusa y formato

| Archivo                                   | Objetivo                                                                                                             |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Configuración plana principal ESLint (`npm run lint`, con `config/quality/eslint-suppressions.json`)                 |
| `eslint.complexity-ratchets.config.mjs`   | Configuración independiente utilizada por los trinquetes de complejidad y complejidad cognitiva en una pasada ESLint |
| `eslint.complexity.config.mjs`            | Configuración independiente con solo el núcleo `complexity` + `max-lines-per-function` (utilizado por las pruebas)   |
| `prettier.config.mjs` / `.prettierignore` | reglas y exclusiones Prettier                                                                                        |
| `.editorconfig`                           | Valores predeterminados del editor (sangría de 2 espacios)                                                           |
| `.markdownlint.json`                      | Pelusa de rebajas de asesoramiento (`npm run lint:md`)                                                               |
| `.vale.ini`                               | Pelusa en prosa consultiva (`npm run lint:prose`), vocabulario en `.vale/`                                           |

### Pruebas, evaluación y cobertura.

| Archivo                       | Objetivo                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | jsdom Vitest suite: `npm run test:vitest:ui` (panel de control `.tsx`, ganchos, pruebas memory/skills ) |
| `vitest.mcp.config.ts`        | Suite de nodo Vitest : `npm run test:vitest` (servidor MCP, autoCombo, combo, API `.spec.ts`)           |
| `vitest.quarantine.config.ts` | Ejecuta los archivos en cuarentena enumerados en `config/quality/vitest-exclusions.json`                |
| `vitest.e2e-live.config.ts`   | Suites Vitest de servidor en vivo (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                           |
| `stryker.conf.mjs`            | Prueba de mutación Stryker (`npm run test:mutation`; calcula `tap.testFiles` a partir de `mutate`)      |
| `stryker.disablebail.mjs`     | Variante Stryker sin fianza, para medición de redundancia de prueba                                     |
| `promptfooconfig.yaml`        | Promptfoo LLM-suite de seguridad                                                                        |
| `codecov.yml`                 | Configuración de cobertura de parches de Codecov                                                        |

### Docker y despliegue

| Archivo                           | Objetivo                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `Dockerfile`                      | Imagen de varias etapas (`builder` → `runner-base` → `runner-web` / `runner-cli*`)     |
| `Dockerfile.bun`                  | Imagen alternativa en el tiempo de ejecución Bun (construida por `docker-publish.yml`) |
| `docker-compose.yml`              | Redacción predeterminada con perfiles (base, web, cli, host, memoria, cliproxiapi,…)   |
| `docker-compose.prod.yml`         | Instancia de instantánea de producción separada en el puerto 20130                     |
| `docker-compose.selfhost.yml`     | Autohost de bucle invertido de un comando (se empareja con `.env.selfhost.example`)    |
| `docker-compose.ollama-local.yml` | Docker OmniRoute hablando con un Ollama nativo del host                                |
| `.dockerignore`                   | exclusiones de contexto de compilación Docker                                          |
| `fly.toml`                        | Configuración de la aplicación Fly.io (puerto 20128, volumen `/data` )                 |

### Bots de seguridad, cadena de suministro y repositorio

| Archivo                                      | Objetivo                                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | reglas de escaneo secreto y listas permitidas de gitleaks                                    |
| `.trivyignore`                               | Supresiones de riesgos aceptados para el escaneo de imágenes de contenedores                 |
| `.zizmor.yml`                                | zizmor GitHub Acciones configuración de auditoría de seguridad                               |
| `socket.yml`                                 | Configuración de la aplicación Socket.dev (la ruta se ignora; no es una puerta CI )          |
| `sonar-project.properties`                   | configuración del proyecto SonarQube/SonarCloud                                              |
| `knip.json`                                  | Cortar la configuración files/exports/deps no utilizada (alimenta `npm run check:dead-code`) |
| `.size-limit.json`                           | Presupuestos del tamaño de un paquete                                                        |
| `.mergify.yml`                               | Fusionar configuración de cola de fusión                                                     |
| `.coderabbit.yaml`                           | configuración de revisión CodeRabbit                                                         |
| `.cbmignore`                                 | Lista de ignorados para el índice de código codebase-memory-mcp                              |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorar reglas, finales de línea LF para guiones, identidades de autor canónicas             |

### Plantillas de entorno, estado y feeds.

| Archivo                     | Objetivo                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `.env.example`              | Plantilla copiada a `.env` en la primera instalación; lista de referencia de vars env      |
| `.env.selfhost.example`     | Plantilla para `docker-compose.selfhost.yml`                                               |
| `.env.homolog.example`      | Plantilla para el corredor de homologación (`npm run homolog`)                             |
| `.env.devin-bridge.example` | Archivo env de ejemplo para la configuración del puente Devin                              |
| `.i18n-state.json`          | Estado de traducción incremental (hashes de origen por documento y configuración regional) |
| `news.json`                 | Feed de anuncios localizado (esquema v2) leído por el panel                                |

---

## aplicación `src/` — Next.js

Alrededor de 4.550 archivos rastreados. Alias de ruta `@/*` → `src/*`.

```
src/
├── app/                  # App Router: pages, layouts and route handlers (file-convention loaded)
│   ├── (dashboard)/      # Route group for the dashboard: dashboard/<section>/ pages + home widgets
│   ├── api/              # HTTP routes: v1/ (OpenAI-compatible), v1beta/ (Gemini-style), management routes
│   ├── docs/             # Embedded docs viewer (lib/openapi.generated.ts is generated)
│   ├── a2a/ .well-known/ # A2A JSON-RPC entry point and Agent Card discovery
│   ├── healthz/ livez/ readyz/ status/   # Health probes and status page
│   ├── landing/ login/ auth/ authorize/ callback/ connect/   # Public, auth and OAuth pages
│   ├── miniapp/          # Telegram Mini App page
│   └── 400/ … 503/       # Static HTTP error pages
├── lib/                  # Server-side libraries and domain modules (largest folder)
├── shared/               # Code shared by server and client: components, constants, validation, utils
├── sse/                  # Next.js side of the SSE pipeline: handlers/ (chat*), services/ (auth, leases, quotas)
├── mitm/                 # MITM / TPROXY capture: cert/, dns/, handlers/, targets/, inspector/, tproxy/ (C addon)
├── server/               # Server-only: authz/ (route guard pipeline), auth/, cors/, origin/, ws/
├── domain/               # Policy engine, fallback, cost rules, lockout, quota cache, assessment/
├── i18n/                 # next-intl: messages/ (67 locales), global-error-messages/ (generated), routeNamespaces.generated.json
├── store/                # Zustand client stores (theme, notifications, …)
├── hooks/                # Client hooks (live dashboard, compression preview, breaker health)
├── types/                # Ambient and shared type declarations
├── models/               # Compatibility barrel re-exporting db functions
├── middleware/           # promptInjectionGuard.ts (facade over the guardrail system)
├── scripts/              # backfillAggregation.ts (`npm run backfill-aggregation`)
├── proxy.ts              # Next.js 16 proxy: headless gate + authz pipeline for dashboard, /api and /v1-style paths
├── instrumentation.ts    # Next.js instrumentation hook (delegates Node-only work)
└── instrumentation-node.ts   # Node-only startup work
```

### Enrutador de aplicaciones `src/app/` —

| Camino                                                              | Objetivo                                                                                                                                                                                                   |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | API público compatible con OpenAI: chat, finalizaciones, respuestas, mensajes, incrustaciones, imágenes, audio, vídeos, música, reclasificación, moderaciones, búsqueda, archivos, lotes, ws, modelos,…    |
| `app/api/v1beta/`                                                   | Puntos finales estilo Géminis                                                                                                                                                                              |
| `app/api/` (otras carpetas)                                         | Rutas de gestión y administración: proveedores, combos, configuraciones, claves, uso, registros, mcp, a2a, acp, memoria, habilidades, evaluaciones, webhooks, túneles, complementos, radar, herramientas,… |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — ver [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                                  |
| `app/api/tools/traffic-inspector/`                                  | Inspector de tráfico REST API — ver [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                                             |
| `app/(dashboard)/dashboard/`                                        | Una carpeta por sección del panel (proveedores, combinaciones, registros, uso, costos, caché, compresión, memoria, área de juegos, herramientas de búsqueda, configuraciones, herramientas,…)              |
| `app/(dashboard)/home/`                                             | Pantalla de inicio y sus widgets                                                                                                                                                                           |
| `app/docs/`                                                         | Visor de documentos que muestra las secciones de Fumadocs enumeradas en `source.config.ts`                                                                                                                 |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Diseño raíz, entrada raíz (redirecciones), manifiesto PWA, CSS global                                                                                                                                      |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Límites de error y alternativas                                                                                                                                                                            |

las rutas API siguen `Route → CORS → Zod validation → optional auth → policy → handler`; consulte [ARCHITECTURE.md](ARCHITECTURE.md) y [API_REFERENCE.md](../reference/API_REFERENCE.md).

### bibliotecas del servidor `src/lib/` —

Aproximadamente 90 subcarpetas más unos 90 módulos de nivel superior. Grupos principales:

| Área                         | Carpetas/archivos                                                                                                   | inmersión profunda                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Base de datos                | módulos de dominio `db/` —, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                         | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE](../ops/DATABASE_GUIDE.md)                                               |
| Uso, cuota y gasto           | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE](../routing/QUOTA_SHARE.md), [COST_TRACKING](../guides/COST_TRACKING.md)                                                          |
| Proveedores y modelos        | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth y credenciales         | `oauth/` (proveedores/, servicios/, utilidades/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`          | `resolvePublicCred()` (documento del operador, no servido públicamente)                                                                        |
| Seguridad y gobernanza       | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Funciones del agente         | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Complementos y servicios     | `plugins/`, `services/` (instaladores y supervisor de servicios integrados)                                         | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Enrutamiento y resiliencia   | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE](RESILIENCE_GUIDE.md)                                                                                                        |
| Proxies y redes              | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, módulos de túnel                               | [PROXY_GUIDE](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE](../ops/TUNNELS_GUIDE.md)                                                                 |
| Trabajos y programación      | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Observabilidad y exportación | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| integración CLI y IDE        | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Fuentes de contexto          | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                                  |
| Otras características        | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO](../frameworks/PLAYGROUND_STUDIO.md)                                                    |

Módulos de alto nivel que vale la pena conocer:

| Archivo                                                        | Objetivo                                                                              |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Almacenamiento en caché de respuestas e idempotencia                                  |
| `webhookDispatcher.ts`                                         | Entrega de webhook firmado por HMAC                                                   |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Gestores de túneles                                                                   |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Comprobaciones de estado de credenciales en segundo plano y circuito de actualización |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Desinfectantes de respuesta de transmisión                                            |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Ciclo de vida del proceso                                                             |
| `*.stub.ts`                                                    | Talones de perfil de compilación intercambiados por alias en `next.config.mjs`        |

### base de datos `src/lib/db/` —

| Camino                | Objetivo                                                                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`          | `getDbInstance()` singleton (diario WAL )                                                                                                                   |
| `db/migrations/`      | Migraciones `.sql` numeradas e idempotentes (236 archivos en el momento de escribir este artículo; numeración de guardias `check-migration-numbering.mjs` ) |
| `db/migrationRunner/` | corredor de migración                                                                                                                                       |
| `db/adapters/`        | Adaptadores de controlador SQLite (better-sqlite3, nodo:sqlite, bun:sqlite, sql.js)                                                                         |
| `db/repositories/`    | Implementaciones del repositorio SQLite (combos, ajustes preestablecidos del área de juegos, configuración de enrutamiento)                                 |
| `db/<domain>.ts`      | Alrededor de 175 módulos de dominio (proveedores, combos, apiKeys, configuración, uso,…) — siempre los importa directamente                                 |

### `src/domain/`, `src/server/`, `src/shared/`

| Camino                                                         | Objetivo                                                                                                                                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Motor de políticas                                                                                                                                                  |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Decisiones alternativas, política de bloqueo, reglas de costos                                                                                                      |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Caché de cuota y persistencia de instantáneas                                                                                                                       |
| `domain/assessment/`                                           | Evaluación de modelos (evaluador, categorizador, autocurador)                                                                                                       |
| `server/authz/`                                                | Canalización de autorización y protección de ruta (`routeGuard.ts`) — consulte [AUTHZ_GUIDE](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | resolución de origen Public/MCP/WS y CORS — ver [CORS.md](../security/CORS.md)                                                                                      |
| `server/ws/`                                                   | Servidor WebSocket del panel en vivo                                                                                                                                |
| `shared/components/`                                           | Componentes y adaptadores del tablero sobre `packages/ui-kit` — consulte [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                       |
| `shared/constants/`                                            | Catálogo de proveedores (`providers.ts`), estrategias de enrutamiento, herramientas CLI, mapa de iconos, lista de denegación de encabezados ascendentes,…           |
| `shared/validation/`                                           | esquemas Zod y ayudantes de validación                                                                                                                              |
| `shared/utils/`                                                | Disyuntor, autenticación de clave API, tiempos de espera de recuperación, indicadores de funciones, etc.                                                            |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Middleware de admisión de chat, asistentes de red, servicios al cliente, ganchos React                                                                              |

---

## Espacio de trabajo del motor de transmisión `open-sse/` —

npm workspace `@omniroute/open-sse` (alrededor de 2390 archivos rastreados). Realiza el procesamiento de solicitudes y la ejecución del proveedor. Descripción general: [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

```
open-sse/
├── handlers/       # Request handlers: chatCore.ts + chatCore/, responses, embeddings, audio, imageGeneration/,
│                   #   videoGeneration/, search/, fal/, mediaGeneration/, sseParser/, responseSanitizer/, …
├── executors/      # Provider-specific HTTP dispatch, registered in executors/registry.ts; base/ holds shared recovery helpers
├── translator/     # Format conversion: request/, response/, helpers/, image/, registry.ts, bootstrap.ts
├── transformer/    # responsesTransformer.ts (Responses API ↔ Chat Completions TransformStream)
├── services/       # Combo routing, rate limits, fallback, caching, usage, token refresh, compression (see below)
├── config/         # Provider registry (config/providers/registry/<id>/), constants, model/media registries
├── mcp-server/     # MCP server: tools/, schemas/, toolSearch/, transports, audit, scopes, __tests__/
├── utils/          # Stream, error, TLS, proxy-fetch and logging utilities
├── vendor/         # codex-chatgpt-web/ — vendored adapter (provenance in vendor.json)
├── lib/            # DeepSeek proof-of-work worker and hash
├── shared/         # zedAuth.ts
├── index.ts        # Workspace entry
└── package.json · tsconfig.json · types.d.ts
```

### `open-sse/services/`

| Camino                                                                                         | Objetivo                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Estrategias de enrutamiento combinadas — ver [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                |
| `autoCombo/`                                                                                   | Paquetes de modos y puntuación de combo automático                                                                                                                    |
| `accountFallback.ts` + `accountFallback/`                                                      | Enfriamiento de conexión y bloqueo de modelo — ver [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                         |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Seguimiento de límite de velocidad y análisis de encabezados                                                                                                          |
| `compression/`                                                                                 | Motores de compresión (`engines/`), paquetes de reglas (`rules/`), `eval/`, `harness/`, `riskGate/` — ver [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Actualización de tokens, contabilidad de uso, almacenamiento en caché, líneas de admisión, grupos de sesiones, cuentas Codex, ayudas de enrutamiento                  |
| `__tests__/`                                                                                   | Suites Vitest ubicadas conjuntamente (recopiladas por las configuraciones Vitest )                                                                                    |
| `AGENTS.md`                                                                                    | Guía del agente para esta carpeta                                                                                                                                     |

Patrón: un módulo grande `X.ts` junto a una carpeta `X/` significa que el módulo se dividió en archivos más pequeños (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Camino                | Objetivo                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `server.ts`           | ciclo de vida del servidor MCP                                                                           |
| `httpTransport.ts`    | Transportes HTTP y SSE transmitibles                                                                     |
| `scopeEnforcement.ts` | Comprobaciones de alcance por herramienta                                                                |
| `audit.ts`            | Registro de auditoría de llamadas de herramientas                                                        |
| `schemas/`            | Definiciones y alcances de las herramientas                                                              |
| `tools/`              | Implementaciones de herramientas (memoria, habilidades, compresión,…)                                    |
| `toolSearch/`         | Búsqueda de herramientas                                                                                 |
| `README.md`           | Notas de arquitectura interna; el catalogo completo esta en [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## espacios de trabajo `packages/` — npm

| Camino                   | Objetivo                                                                                                                                                                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: instantánea suministrada del kit Keak CI UI, consumida como fuente. `UPSTREAM.md` fija la confirmación ascendente, `PATCHES.md` enumera los parches locales. `src/` está sincronizado solo por `scripts/dev/sync-ui-kit.sh` y protegido por `npm run check:ui-kit-snapshot`. Ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: interfaces e implementación del grupo de navegadores (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Listado en `workspaces`; el grupo de navegadores en tiempo de ejecución utilizado por la puerta de enlace se encuentra en `open-sse/services/`                          |

## `@omniroute/` — paquetes publicados por separado

Estos no son espacios de trabajo de npm. Cada uno tiene su propio `package.json` y archivo de bloqueo; la carpeta se envía en el tarball `omniroute` (`files: ["@omniroute/"]`).

| Camino                           | Objetivo                                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | complemento OpenCode (descubrimiento de modelos, autenticación `/connect` ); utilizado por `omniroute setup-opencode` — ver [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | Complemento OpenCode para la promesa v2 API — ver [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                                           |
| `@omniroute/opencode-provider/`  | Generador de configuración estática; marcado en desuso en su propio `package.json` a favor de `opencode-plugin`                                                      |

---

## `bin/` — CLI y scripts de operaciones

| Camino                                                                      | Objetivo                                                                                                                      |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Entrada principal CLI (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`,…)                                          |
| `reset-password.mjs`                                                        | binario `omniroute-reset-password`                                                                                            |
| `mcp-server.mjs`                                                            | punto de entrada MCP stdio                                                                                                    |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Puente auxiliar / puntos de entrada MCP                                                                                       |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | Gancho de resolución ESM que asigna alias de ruta tsconfig para instalaciones globales                                        |
| `nodeRuntimeSupport.mjs`                                                    | Verificación de versión Node.js compatible                                                                                    |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Scripts de recuperación de incidentes de autohospedaje (comparta `_ops-common.sh`)                                            |
| `cold-start-bench.sh`                                                       | Punto de referencia de arranque en frío — ver [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                                     |
| `cli/commands/`                                                             | Un módulo por comando CLI (alrededor de 100, incluidas las integraciones `setup-*` )                                          |
| `cli/api-commands/`                                                         | Generado a partir de `docs/openapi.yaml` por `npm run build:cli-api` — no editar                                              |
| `cli/locales/`                                                              | Catálogos de mensajes CLI (67 configuraciones regionales)                                                                     |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                                                   |
| `cli/tray/`                                                                 | Bandeja del sistema e inicio automático (Windows PowerShell backend, systray en macOS/Linux)                                  |
| `cli/runtime/`                                                              | Resolución nativa en tiempo de ejecución (`sqliteRuntime.mjs`, `magicBytes.mjs`), supervisor de procesos                      |
| `cli/*.mjs`                                                                 | Ayudantes compartidos (args, cliente API, directorio de datos, cifrado, almacén de proveedores, almacén de configuraciones,…) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | partes internas y convenciones CLI                                                                                            |

Véase [CLI-TOOLS.md](../reference/CLI-TOOLS.md) y [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## aplicación de escritorio `electron/` —

| Camino                                                     | Objetivo                                                                                                    |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `main.js`                                                  | Proceso principal Electron (ventana, servidor integrado, bandeja, actualizaciones)                          |
| `preload.js`                                               | puente IPC expuesto al renderizador                                                                         |
| `lib/`                                                     | Ciclo de vida de Windows, preparación del servidor, vigilancia del estado, preferencias del servidor remoto |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Ventana de aviso del servidor remoto                                                                        |
| `processTree.js`, `sqlite-inspection.js`                   | Ayudantes de limpieza de procesos secundarios e inspección SQLite                                           |
| `package.json` / `package-lock.json`                       | configuración de electron-builder y dependencias Electron                                                   |
| `assets/`                                                  | Iconos de aplicaciones y bandejas (`.ico`, `.icns`, `.png`)                                                 |
| `README.md`                                                | Notas internas — ver [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                                       |

## `public/` — activos estáticos

| Camino                                      | Objetivo                                                                                                                           |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Logotipos de proveedores cargados por id (`/providers/<id>.svg`); procedencia en `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Iconos del navegador y PWA                                                                                                         |
| `sw.js`                                     | Trabajador de servicio — ver [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                                |
| `openapi.yaml`                              | Copia de `docs/openapi.yaml` generada por `npm run gen:public-openapi`                                                             |
| `images/`, `sponsors/`, `deyin.svg`         | Diagramas de flujo de niveles, banner del patrocinador, ilustraciones README                                                       |

## Habilidades del agente `skills/` —

46 habilidades, una carpeta cada una con un `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), más `skills/README.md`. `src/lib/agentSkills/catalog.ts` los lee en tiempo de ejecución y los expone a través de `/api/agent-skills`, MCP y A2A. La mayoría de los manifiestos son generados por `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` comprueba la deriva). Ver [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## `scripts/` — construcción, puertas y herramientas

About 435 tracked files. Los nuevos scripts van en una de las subcarpetas permitidas por `AGENTS.md`; El código único va en `scripts/ad-hoc/`.

```
scripts/
├── check-permissions.sh   # Container ENTRYPOINT (copied to /app by the Dockerfile)
├── postinstall.mjs        # Native-runtime warm-up run after scripts/build/postinstall.mjs
├── start-ws-server.mjs    # Starts the live-dashboard WebSocket server as a separate process
├── build/                 # Build, standalone assembly, npm pack/publish, postinstall, MITM, Electron prep
├── check/                 # Quality gates behind most `npm run check:*` scripts; lib/ holds shared helpers
├── quality/               # Ratchets, gate manifest, impact map, mutation tooling, release acceptance
├── ci/                    # Steps invoked only by workflows (Docker publish, Release-Green, scanners)
├── dev/                   # Dev runners (run-next, Playwright/protocol/ecosystem runners) and runtime helpers shipped in the package
├── docs/                  # README SVG/diagram generators, OpenAPI module, provider reference, wiki sync
├── i18n/                  # UI and docs translation pipeline, coverage checks, glossary/, lib/
├── release/               # Changelog aggregation, contributors, merge train, LTS cut, publish verification
├── ops/                   # Canary deploy, OpenCode free relay, runner janitor, allowlist sync
├── perf/                  # Benchmarks and one-off performance A/B scripts
├── cli/                   # CLI tooling (API-command generator, SSO, CLI smoke tests, media MCP)
├── homolog/               # Homologation against a running instance + promptfoo config generation
├── features/              # Feature-triage engine and its lib/
├── router-eval/           # Offline router evaluation (`npm run eval:router*`)
├── compression/           # Compression benchmark (`npm run bench:compression`, runs on Bun)
├── compression-eval/      # Compression quality evaluation (`npm run eval:compression`)
├── devin-bridge/          # Shell entry points for the Devin bridge (build, launch, tests)
├── docker/                # Base-path patching for the standalone server inside containers
├── integrations/          # MarkItDown MCP launchers — see docs/integrations/MARKITDOWN_MCP.md
├── launchers/             # Double-click launchers and desktop-shortcut creators (Windows/macOS/Linux)
├── packs/                 # Optional-pack manifest and installer (shipped in the npm package)
├── test/                  # Live smoke scripts (combo-live, OpenCode/ChatGPT Web)
├── sre/                   # On-call rotation, log redaction, TCP close analyzer
├── vps/                   # Start/stop the release runner
├── skills/                # Agent Skills generator CLI
├── research/              # Free-tier budget card SVG generator
└── ad-hoc/                # One-shot diagnostics and migrations
```

Puntos de entrada utilizados frecuentemente:

| Guion                                                               | Objetivo                                                                                                   |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `dev/run-next.mjs`                                                  | corredor `npm run dev` / `npm start`                                                                       |
| `build/build-next-isolated.mjs`                                     | `npm run build` (compilación independiente Next.js )                                                       |
| `build/prepublish.ts`                                               | `npm run build:cli`: ensambla el npm `dist/`                                                               |
| `build/postinstall.mjs`                                             | gancho npm `postinstall`                                                                                   |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                               |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (regenera PROVIDER_REFERENCE.md)                                          |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (genera `src/app/docs/lib/openapi.generated.ts`)                                           |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (espejos de documentos)                                                                 |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                                  |
| `release/aggregate-changelog.mjs`                                   | Pliega fragmentos `changelog.d/` en `CHANGELOG.md`                                                         |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (puerta de precisión de documentos)                                        |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (bloquea las rutas `_*` raíz rastreadas)                                 |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (trinquete métrico contra `config/quality/`)                                     |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                         |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                     |
| `dev/new-worktree.sh`                                               | Crea un árbol de trabajo de desarrollo aislado — ver [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Sincroniza `packages/ui-kit/src` con una confirmación ascendente fijada                                    |

Inventario y políticas de puertas: [QUALITY_GATES.md](QUALITY_GATES.md).

## Configuración versionada `config/` — y estado de la puerta

| Camino                                   | Objetivo                                                                                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `i18n.json` / `i18n-schema.json`         | Configuraciones regionales admitidas (fuente del recuento de configuraciones regionales) y su esquema                                                              |
| `payloadRules.json`                      | Reglas de carga útil ascendente (`open-sse/services/payloadRules.ts`)                                                                                              |
| `cli-tools-manifest.json`                | Manifiesto de herramientas CLI integrables (`bin/cli/cli-manifest.mjs`)                                                                                            |
| `alibaba-free-tier-allowlist.json`       | Lista de permitidos de modelos de nivel libre Alibaba                                                                                                              |
| `ci/toolchain.json`                      | Versiones de la cadena de herramientas CI                                                                                                                          |
| `quality/quality-baseline.json`          | Línea base de trinquete multimétrico (cobertura, advertencias, duplicaciones,…)                                                                                    |
| `quality/*-baseline.json`                | Líneas de base congeladas para puertas individuales (complejidad, duplicación, tamaño de archivo, porciones de verificación de tipos, descubrimiento de pruebas,…) |
| `quality/*-allowlist.json`               | Listas de puertas permitidas (dependencias, licencias, atribución AI, pruebas de hermanos olvidados,…)                                                             |
| `quality/eslint-suppressions.json`       | Supresiones ESLint congeladas aplicadas por `npm run lint`                                                                                                         |
| `quality/gate-manifest.json`             | Manifiesto de puerta verificado por `scripts/quality/gate-manifest.mjs`                                                                                            |
| `quality/vitest-exclusions.json`         | Inventario de cuarentena para `vitest.quarantine.config.ts`                                                                                                        |
| `quality/skill-templates/`               | Plantillas canónicas SKILL.md verificadas por `scripts/quality/check-skill-contract.mjs`                                                                           |
| `quality/release-acceptance.schema.json` | Esquema de evidencia de aceptación de liberación — ver [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                                                |
| `release/`                               | Conciliaciones del registro de cambios y el manifiesto nativo de wreq-js, inventario de licencias y avisos                                                         |

## fragmentos del registro de cambios de `changelog.d/` —

Un PR añade un fragmento en lugar de editar `CHANGELOG.md`: `features/`, `fixes/` o `maintenance/`, llamado `<PR-number>-<slug>.md`. En el momento del lanzamiento, `scripts/release/aggregate-changelog.mjs` los dobla en `CHANGELOG.md` y los elimina; `npm run check:changelog-integrity` los valida. Detalles en `changelog.d/README.md`.

---

## documentación pública `docs/` —

Las secciones enumeradas en `source.config.ts` se compilan en el sitio `/docs` (con algunas páginas de seguridad exclusivas del operador excluidas); `docs/meta.json` establece el orden de la barra lateral. Comience en [README.md](../README.md).

| Camino                   | Contenido                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getting-started/`       | Inicio rápido, autohospedaje, proveedores, niveles gratuitos, Auto-Combo y guías de cookies web                                                                                    |
| `guides/`                | Guías para operadores y desarrolladores: configuración, Docker, Electron, PWA, Termux, CLIs, i18n, solución de problemas, guía del usuario                                         |
| `architecture/`          | Arquitectura, referencia de código base, recetas de modificación, autenticación, resiliencia, puertas de calidad, sistema de diseño, este mapa                                     |
| `reference/`             | Referencia API, variables de entorno, indicadores de funciones, herramientas CLI, niveles gratuitos, referencia de proveedor generada, proveedores eliminados                      |
| `frameworks/`            | MCP, A2A, ACP, habilidades, memoria, complementos, agentes en la nube, webhooks, evaluaciones, exportación de registros, Radar, Playground,…                                       |
| `routing/`               | Auto-Combo, razonamiento replay/routing, cuota compartida, escala de suscripción, costo cero estricto,…                                                                            |
| `security/`              | Barandillas, desinfección de errores, CORS, SSO, política de salida, niveles de protección de ruta, cadena de suministro,…                                                         |
| `compression/`           | Guía de compresión, motores, RTK, formato de reglas, paquetes de idiomas, edición de contexto                                                                                      |
| `ops/`                   | Flujo de lanzamiento, bifurcación, tren de fusión, implementación (VM, Fly.io, Kubernetes), base de datos, proxies, árboles de trabajo, detalle de reglas estrictas                |
| `providers/`             | Guías por proveedor (Claude Code, ChatGPT Web, Cursor, GitHub Copilot,…)                                                                                                           |
| `comparison/`            | OmniRoute comparado con alternativas                                                                                                                                               |
| `integrations/`          | Notas de integración (fal.ai nativo, MarkItDown MCP); no compilado en `/docs`                                                                                                      |
| `openapi.yaml`           | fuente OpenAPI ; alimenta `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` y `bin/cli/api-commands/`                                                                 |
| `diagrams/`              | Fuentes de sirena (`.mmd`), SVGs renderizado (`exported/`) y README SVGs de `scripts/docs/gen-readme-*`                                                                            |
| `assets/`                | Bandera de idioma SVGs y otros activos README                                                                                                                                      |
| `screenshots/`           | Capturas de pantalla utilizadas por el README y guías.                                                                                                                             |
| `i18n/`                  | Espejos traducidos: una carpeta por configuración regional (66) con documentos raíz y un subconjunto `docs/` ; producido por `npm run i18n:run` — ver [I18N.md](../guides/I18N.md) |
| `*.md` de nivel superior | `README.md` (índice de documentos), `DEVELOPER-ENVIRONMENT.md` y algunas notas independientes                                                                                      |

Puntos de entrada clave: [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (generado por `npm run gen:provider-reference`).

---

## conjuntos de pruebas `tests/` —

Alrededor de 9.670 archivos rastreados. Los archivos de prueba pertenecen aquí, no a la raíz del proyecto. Excepciones: las carpetas `__tests__/` ubicadas conjuntamente en `src/` y `open-sse/` que recopilan las configuraciones Vitest.

| Camino                                                 | Contenido                                                                                                                                                                                              | Corredor                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Pruebas unitarias (más de 9000 archivos): muchas en el nivel superior, además de carpetas de dominio (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`,…) | Ejecutor de pruebas de nodo (`npm run test:unit`); `*.tsx` vía `test:vitest:ui`         |
| `tests/unit/serial/`                                   | Las pruebas sensibles a la CPU se ejecutan con simultaneidad 1                                                                                                                                         | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | Vitest suites dentro del árbol de unidades                                                                                                                                                             | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Pruebas de integración multimódulo y DB ; `combo-matrix/`, `combo-live/`, `services/`                                                                                                                  | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + suites en vivo `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                                                | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` contra una instancia en ejecución                                                                                                                                                     | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Suites de homologación (`api/`, `ui/` con su propia configuración Playwright )                                                                                                                         | `npm run homolog` — ver [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                       |
| `tests/load/`                                          | Cargar y remojar scripts (k6)                                                                                                                                                                          | Flujo de trabajo de resiliencia nocturno                                                |
| `tests/_setup/`                                        | Archivos `--import` /setup (directorio de datos aislados, protección de salida, Vitest UI polyfills)                                                                                                   | Cargado por los corredores                                                              |
| `tests/_helpers/`, `tests/helpers/`                    | Ayudantes de prueba compartidos (instantáneas doradas, sesión de gestión,…)                                                                                                                            | Importado por pruebas                                                                   |
| `tests/fixtures/`                                      | Datos de accesorios y accesorios de procesos secundarios                                                                                                                                               | Importado por pruebas                                                                   |
| `tests/snapshots/`                                     | Limas doradas para `tests/helpers/goldenSnapshot.ts`                                                                                                                                                   | Importado por pruebas                                                                   |
| `tests/manual/`                                        | Archivos `.http` para llamadas REST manuales                                                                                                                                                           | Manual                                                                                  |
| `tests/security/`                                      | Scripts de shell de seguridad                                                                                                                                                                          | Accesorios manuales/de prueba unitaria                                                  |
| `tests/types/`                                         | Accesorios de contrato de nivel tipo                                                                                                                                                                   | —                                                                                       |

Matriz completa: `CONTRIBUTING.md` → "Ejecución de pruebas" y [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Camino                                             | Objetivo                                                                                                                               |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Gráfico de timón (`Chart.yaml`, `values.yaml`, plantillas para implementación, servicio, ingreso, PVC, secreto, mapa de configuración) |
| `deploy/kubernetes/base/`                          | Base de personalización (espacio de nombres, implementación, servicio, PVC, mapa de configuración, `secret.example.yaml`)              |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Superposiciones específicas del clúster (ingreso, clase de almacenamiento, recursos, sondas)                                           |

Ver [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)

## Imágenes de `docker/` — auxiliar

| Camino                              | Objetivo                                                                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Imagen de navegador sin cabeza con un proxy CDP para el ejecutor web ChatGPT — ver [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | Imagen del puente Devin, redacción de archivos, simulacros y protección de red.                                                  |
| `docker/vnc-browser/`               | Chromium con VNC para sesiones de navegador interactivo                                                                          |

La imagen principal es la raíz `Dockerfile`; ver [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md)

## Recetas de la comunidad `contrib/` — (no admitidas oficialmente)

| Camino                  | Objetivo                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `contrib/podman/`       | Cuadretes Podman (contenedor, volumen, red, Redis)                                                                                                           |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                                          |
| `contrib/windows/`      | Lanzadores `.bat` para ejecutar desde una caja Windows                                                                                                       |
| `contrib/session-sync/` | README para una extensión de navegador de sincronización de sesiones de terceros — consulte [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Camino                          | Objetivo                                                                            |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Complemento de comando mínimo — ver [PLUGINS.md](../frameworks/PLUGINS.md)          |
| `examples/plugins/`             | Complementos de ejemplo: langfuse, request-logger, theme-manager, bienvenido-banner |
| `examples/quickstart/`          | Fragmentos de cliente: curl, Node.js (axios), PHP, Python                           |

---

## integración `.github/` — GitHub

| Camino                                                       | Objetivo                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), análisis de seguridad (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), suites `nightly-*.yml` programadas, publicación (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), flujos de trabajo de lanzamiento y mantenimiento |
| `.github/actions/npm-ci-retry/`                              | Acción compuesta: `npm ci` con caché y reintento                                                                                                                                                                                                                                                       |
| `.github/actions/prepare-unit-storage/`                      | Acción compuesta: libera espacio en el disco del ejecutor y luego instala dependencias                                                                                                                                                                                                                 |
| `.github/ISSUE_TEMPLATE/`                                    | Formularios de problemas de cobertura de pruebas, funciones y errores                                                                                                                                                                                                                                  |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Plantilla PR predeterminada más variantes bugfix/feature                                                                                                                                                                                                                                               |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Propietarios de código, enlaces de patrocinio, actualizaciones de dependencia                                                                                                                                                                                                                          |
| `.github/labels.yml`                                         | Definiciones de etiquetas aplicadas por `npm run labels:sync`                                                                                                                                                                                                                                          |
| `.github/copilot-instructions.md`                            | Instrucciones GitHub Copilot (una superficie de instrucciones de agente)                                                                                                                                                                                                                               |

Mapa de trabajo CI : [QUALITY_GATES.md](QUALITY_GATES.md).

## `.husky/` — git ganchos

| Archivo      | Objetivo                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Verificación de identidad de Git, lint-staged, manifiesto de puerta, sincronización de documentos, cualquier presupuesto, trinquete de escala de tipo, artefactos rastreados y comprobaciones de instantáneas de kit de interfaz de usuario |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` en el mensaje de confirmación                                                                                                                                                                      |
| `pre-push`   | Intencionalmente ligero: una verificación de cordura PATH/npm que sale de 0                                                                                                                                                                 |

El tiempo de ejecución del enlace en `.husky/_/` se genera durante la instalación y no se realiza un seguimiento.

---

## Consejos de navegación

- **¿Nuevo colaborador?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Cambiando algo común** (proveedor, ruta, módulo DB, herramienta MCP, habilidad A2A )? Siga [MODIFICATION_SCENARIOS](MODIFICATION_SCENARIOS.md)
- **¿Agregar un proveedor?** Primero verifique [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md) y luego verifique [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **¿Funciona localmente?** [SETUP_GUIDE](../guides/SETUP_GUIDE.md)
- **¿Implementando?** [DOCKER_GUIDE](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)
- **¿Liberando?** [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- **¿Falló una puerta de calidad?** [QUALITY_GATES.md](QUALITY_GATES.md) y [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
