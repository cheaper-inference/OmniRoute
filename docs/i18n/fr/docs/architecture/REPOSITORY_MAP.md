# Repository Map (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Qu'est-ce qui se trouve où : chaque répertoire de niveau supérieur et fichier racine suivis, avec un objectif sur une seule ligne.** Dernière mise à jour : 2026-11-13 (OmniRoute v3.8.54)
>
> Utilisez cette carte pour vous repérer dans la base de code, puis suivez les liens vers les documents dédiés. Le nombre de fichiers a été mesuré avec `git ls-files` à la date ci-dessus. Ils changent à chaque version, alors traitez-les comme des ordres de grandeur.

## Arbre de niveau supérieur

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

Chemins locaux, générés ou privés (tous gitignorés, jamais validés, non décrits davantage) :

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

## Fichiers racine

Tous les fichiers suivis à la racine du référentiel (`git ls-files | grep -v /`), regroupés par fonction.

### Documentation du projet

| Déposer                  | But                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `README.md`              | Page de destination : présentation des fonctionnalités, démarrage rapide, méthodes d'installation |
| `CHANGELOG.md`           | Journal des modifications par version (les fragments de `changelog.d/` sont repliés ici)          |
| `ROADMAP.md`             | Feuille de route publique                                                                         |
| `LICENSE`                | licence MIT                                                                                       |
| `THIRD_PARTY_NOTICES.md` | Avis concernant le code tiers groupé (par exemple les liaisons wreq-js)                           |
| `CONTRIBUTING.md`        | Guide du contributeur : configuration, commits conventionnels, matrice de test, flux PR           |
| `SECURITY.md`            | Politique de signalement des vulnérabilités                                                       |
| `CODE_OF_CONDUCT.md`     | Attentes de comportement de la communauté                                                         |
| `llm.txt`                | Résumé du projet en texte brut pour les robots d'exploration et les assistants LLM                |

### Instructions de l'assistant IA

| Déposer     | But                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| `AGENTS.md` | Source unique de vérité pour chaque assistant AI : conventions, contrôles de qualité, règles strictes |
| `CLAUDE.md` | Deltas spécifiques au Code Claude ; importations `AGENTS.md`                                          |
| `GEMINI.md` | Deltas spécifiques aux Gémeaux ; renvoie à `AGENTS.md`                                                |

Des guides imbriqués existent également à côté du code qu'ils décrivent : `open-sse/services/AGENTS.md` et `src/lib/db/AGENTS.md`.

### Manifestes de packages et chaîne d’outils Node

| Déposer                    | But                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `package.json`             | Manifeste npm : scripts, dépendances, `engines`, `workspaces`, `files` publié                        |
| `package-lock.json`        | Arbre de dépendance verrouillé                                                                       |
| `pnpm-workspace.yaml`      | liste d'espaces de travail pnpm (`packages/*`, `open-sse`) et liste autorisée de construction native |
| `.npmrc` / `.npmignore`    | npm config et publier des exclusions                                                                 |
| `.node-version` / `.nvmrc` | Broches de version de nœud pour les gestionnaires de versions                                        |
| `flake.nix` / `flake.lock` | Shell de développement Nix et son verrou                                                             |
| `Makefile`                 | raccourcis `make` qui délèguent aux scripts npm                                                      |

### TypeScript, Next.js et docs build

| Déposer                                   | But                                                                                      |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| `tsconfig.json`                           | Configuration de base de TypeScript et alias de chemin (`@/*`, `@omniroute/open-sse`)    |
| `tsconfig.typecheck-core.json`            | tranche `npm run typecheck:core`                                                         |
| `tsconfig.typecheck-noimplicit-core.json` | tranche `npm run typecheck:noimplicit:core` ( `noImplicitAny` strict)                    |
| `tsconfig.typecheck-api.json`             | Tranche de vérification de type de route API (`scripts/check/check-api-typecheck.mjs`)   |
| `tsconfig.typecheck-dashboard.json`       | Tranche de vérification de type du tableau de bord (`npm run check:dashboard-typecheck`) |
| `tsconfig.build.json`                     | Vérification du type de production (`npm run typecheck:build`, `check:build-typecheck`)  |
| `tsconfig.mitm.json`                      | configuration de build MITM utilisée par `scripts/build/buildMitm.mjs`                   |
| `next.config.mjs`                         | configuration Next.js 16 (sortie autonome, alias de profil de construction)              |
| `source.config.ts`                        | Fumadocs `defineDocs` config : quelles sections `docs/` compilent en `/docs`             |
| `postcss.config.mjs`                      | Pipeline PostCSS / Tailwind                                                              |

### Peluches et formatage

| Déposer                                   | But                                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `eslint.config.mjs`                       | Configuration plate principale ESLint (`npm run lint`, avec `config/quality/eslint-suppressions.json`)              |
| `eslint.complexity-ratchets.config.mjs`   | Configuration autonome utilisée par les cliquets de complexité et de complexité cognitive en une seule passe ESLint |
| `eslint.complexity.config.mjs`            | Configuration autonome avec uniquement le noyau `complexity` + `max-lines-per-function` (utilisé par les tests)     |
| `prettier.config.mjs` / `.prettierignore` | règles et exclusions Prettier                                                                                       |
| `.editorconfig`                           | Paramètres par défaut de l'éditeur (indentation de 2 espaces)                                                       |
| `.markdownlint.json`                      | Charpie de démarque consultative (`npm run lint:md`)                                                                |
| `.vale.ini`                               | Lint prose consultatif (`npm run lint:prose`), vocabulaire en `.vale/`                                              |

### Tests, évaluation et couverture

| Déposer                       | But                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `vitest.config.ts`            | suite jsdom Vitest : `npm run test:vitest:ui` (tableau de bord `.tsx`, hooks, tests memory/skills )       |
| `vitest.mcp.config.ts`        | Suite de nœuds Vitest : `npm run test:vitest` (serveur MCP, autoCombo, combo, API `.spec.ts`)             |
| `vitest.quarantine.config.ts` | Exécute les fichiers en quarantaine répertoriés dans `config/quality/vitest-exclusions.json`              |
| `vitest.e2e-live.config.ts`   | Suites Vitest sur serveur en direct (`tests/e2e/ecosystem.test.ts`, `tests/e2e/protocol-clients.test.ts`) |
| `playwright.config.ts`        | Playwright E2E (`tests/e2e/**/*.spec.ts`, `npm run test:e2e`)                                             |
| `stryker.conf.mjs`            | Test de mutation Stryker (`npm run test:mutation`; calcule `tap.testFiles` à partir de `mutate`)          |
| `stryker.disablebail.mjs`     | Variante Stryker sans bélière, pour mesure de test-redondance                                             |
| `promptfooconfig.yaml`        | suite de sécurité promptfoo LLM                                                                           |
| `codecov.yml`                 | Paramètres de couverture des correctifs Codecov                                                           |

### Docker et déploiement

| Déposer                           | But                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `Dockerfile`                      | Image en plusieurs étapes (`builder` → `runner-base` → `runner-web` / `runner-cli*`) |
| `Dockerfile.bun`                  | Image alternative sur le runtime Bun (construite par `docker-publish.yml`)           |
| `docker-compose.yml`              | Composition par défaut avec profils (base, web, cli, hôte, mémoire, cliproxyapi, …)  |
| `docker-compose.prod.yml`         | Instance d'instantané de production distincte sur le port 20130                      |
| `docker-compose.selfhost.yml`     | Auto-hôte de bouclage à une commande (s'associe à `.env.selfhost.example`)           |
| `docker-compose.ollama-local.yml` | Docker OmniRoute parle à un Ollama natif de l'hôte                                   |
| `.dockerignore`                   | exclusions de contexte de construction Docker                                        |
| `fly.toml`                        | Configuration de l'application Fly.io (port 20128, volume `/data` )                  |

### Bots de sécurité, de chaîne d’approvisionnement et de référentiel

| Déposer                                      | But                                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `.gitleaks.toml`                             | règles d'analyse secrète et listes autorisées de gitleaks                                       |
| `.trivyignore`                               | Suppressions des risques acceptés pour l'analyse de l'image du conteneur                        |
| `.zizmor.yml`                                | configuration d'audit de sécurité des actions zizmor GitHub                                     |
| `socket.yml`                                 | Configuration de l'application Socket.dev (le chemin est ignoré ; pas une porte CI )            |
| `sonar-project.properties`                   | configuration du projet SonarQube/SonarCloud                                                    |
| `knip.json`                                  | Knip config files/exports/deps inutilisée (flux `npm run check:dead-code`)                      |
| `.size-limit.json`                           | Budgets de taille groupée                                                                       |
| `.mergify.yml`                               | Mergify la configuration de la file d'attente de fusion                                         |
| `.coderabbit.yaml`                           | configuration de révision CodeRabbit                                                            |
| `.cbmignore`                                 | Ignorer la liste pour l'index de code codebase-memory-mcp                                       |
| `.gitignore` / `.gitattributes` / `.mailmap` | Ignorer les règles, les fins de ligne LF pour les scripts, les identités canoniques des auteurs |

### Modèles d'environnement, état et flux

| Déposer                     | But                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.env.example`              | Modèle copié sur `.env` lors de la première installation ; liste de référence des variables d'environnement |
| `.env.selfhost.example`     | Modèle pour `docker-compose.selfhost.yml`                                                                   |
| `.env.homolog.example`      | Gabarit pour le coureur d'homologation (`npm run homolog`)                                                  |
| `.env.devin-bridge.example` | Exemple de fichier env pour la configuration du pont Devin                                                  |
| `.i18n-state.json`          | État de traduction incrémentiel (hachages source par document et paramètres régionaux)                      |
| `news.json`                 | Flux d'annonces localisées (schéma v2) lu par le tableau de bord                                            |

---

## application `src/` — Next.js

Environ 4 550 fichiers suivis. Alias de chemin `@/*` → `src/*`.

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

### Routeur d'application `src/app/` —

| Chemin                                                              | But                                                                                                                                                                                                   |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                       | API public compatible OpenAI : chat, complétions, réponses, messages, intégrations, images, audio, vidéos, musique, reclassement, modérations, recherche, fichiers, lots, ws, modèles, …              |
| `app/api/v1beta/`                                                   | Points de terminaison de style Gemini                                                                                                                                                                 |
| `app/api/` (autres dossiers)                                        | Routes de gestion et d'administration : fournisseurs, combos, paramètres, clés, utilisation, journaux, mcp, a2a, acp, mémoire, compétences, évaluations, webhooks, tunnels, plugins, radar, outils, … |
| `app/api/tools/agent-bridge/`                                       | AgentBridge REST API — voir [AGENTBRIDGE.md](../frameworks/AGENTBRIDGE.md)                                                                                                                            |
| `app/api/tools/traffic-inspector/`                                  | Inspecteur de la circulation REST API — voir [TRAFFIC_INSPECTOR.md](../frameworks/TRAFFIC_INSPECTOR.md)                                                                                               |
| `app/(dashboard)/dashboard/`                                        | Un dossier par section du tableau de bord (fournisseurs, combos, journaux, utilisation, coûts, cache, compression, mémoire, terrain de jeu, outils de recherche, paramètres, outils, …)               |
| `app/(dashboard)/home/`                                             | Écran d'accueil et ses widgets                                                                                                                                                                        |
| `app/docs/`                                                         | Visionneuse de documents affichant les sections Fumadocs répertoriées dans `source.config.ts`                                                                                                         |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`          | Disposition racine, entrée racine (redirections), manifeste PWA, CSS global                                                                                                                           |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx` | Limites d’erreur et solutions de repli                                                                                                                                                                |

les itinéraires API suivent `Route → CORS → Zod validation → optional auth → policy → handler`; voir [ARCHITECTURE.md](ARCHITECTURE.md) et [API_REFERENCE.md](../reference/API_REFERENCE.md).

### bibliothèques de serveur `src/lib/` —

Environ 90 sous-dossiers plus environ 90 modules de niveau supérieur. Principaux groupes :

| Zone                                   | Dossiers/fichiers                                                                                                   | Plongée profonde                                                                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Base de données                        | modules de domaine `db/` —, `migrations/`, `adapters/`, `repositories/`, `migrationRunner/`                         | [`src/lib/db/AGENTS.md`](../../src/lib/db/AGENTS.md), [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md)                                            |
| Utilisation, quota et dépenses         | `usage/`, `quota/`, `spend/`                                                                                        | [QUOTA_SHARE.md](../routing/QUOTA_SHARE.md), [COST_TRACKING.md](../guides/COST_TRACKING.md)                                                    |
| Fournisseurs et modèles                | `providers/`, `providerModels/`, `modelValidation/`, `catalog/`, `radar/`, `freeProxyProviders/`                    | [RADAR.md](../frameworks/RADAR.md), [MODEL-VALIDATION.md](../guides/MODEL-VALIDATION.md)                                                       |
| OAuth et informations d'identification | `oauth/` (fournisseurs/, services/, utils/), `zed-oauth/`, `copilot/`, `cursor/`, `credentialHealth/`               | `resolvePublicCred()` (doc opérateur, non diffusé publiquement)                                                                                |
| Sécurité et gouvernance                | `guardrails/`, `compliance/`, `pii/`, `security/`                                                                   | [GUARDRAILS.md](../security/GUARDRAILS.md), [COMPLIANCE.md](../security/COMPLIANCE.md)                                                         |
| Fonctionnalités des agents             | `a2a/`, `acp/`, `cloudAgent/`, `memory/`, `skills/`, `agentSkills/`                                                 | [AGENT_PROTOCOLS_GUIDE.md](../frameworks/AGENT_PROTOCOLS_GUIDE.md), [MEMORY.md](../frameworks/MEMORY.md), [SKILLS.md](../frameworks/SKILLS.md) |
| Plugins et services                    | `plugins/`, `services/` (installateurs et superviseur de services intégrés)                                         | [PLUGINS.md](../frameworks/PLUGINS.md), [EMBEDDED-SERVICES.md](../frameworks/EMBEDDED-SERVICES.md)                                             |
| Routage et résilience                  | `combos/`, `routing/`, `resilience/`, `reasoningRouting/`, `promptCache/`                                           | [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                                                                     |
| Proxy et mise en réseau                | `proxyHealth/`, `proxySubscription/`, `proxyRelay/`, `proxyEvents/`, modules tunnel                                 | [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md), [TUNNELS_GUIDE.md](../ops/TUNNELS_GUIDE.md)                                                           |
| Travaux et planification               | `jobs/`, `jobRegistry/`, `warmupScheduler/`                                                                         |                                                                                                                                                |
| Observabilité et exportation           | `monitoring/`, `logExport/`, `webhooks/`, `audit/`, `events/`                                                       | [LOG-EXPORT.md](../frameworks/LOG-EXPORT.md), [WEBHOOKS.md](../frameworks/WEBHOOKS.md)                                                         |
| intégration CLI et IDE                 | `cliTools/`, `cli-helper/`, `vscode/`, `inspector/`, `versionManager/`                                              | [CLI-TOOLS.md](../reference/CLI-TOOLS.md), [VSCODE-COPILOT.md](../guides/VSCODE-COPILOT.md)                                                    |
| Sources contextuelles                  | `localCorpus/`, `notion/`, `obsidian/`                                                                              | [LOCAL_CORPUS_CONTEXT.md](../frameworks/LOCAL_CORPUS_CONTEXT.md)                                                                               |
| Autres fonctionnalités                 | `evals/`, `playground/`, `gamification/`, `telegram/`, `conductor/`, `batches/`, `deploy/`, `transfer/`, `sync/`, … | [EVALS.md](../frameworks/EVALS.md), [PLAYGROUND_STUDIO.md](../frameworks/PLAYGROUND_STUDIO.md)                                                 |

Modules de haut niveau à connaître :

| Déposer                                                        | But                                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `cacheLayer.ts`, `idempotencyLayer.ts`, `semanticCache.ts`     | Mise en cache des réponses et idempotence                                            |
| `webhookDispatcher.ts`                                         | Livraison de webhooks signés HMAC                                                    |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts` | Gestionnaires de tunnels                                                             |
| `tokenHealthCheck*.ts`, `tokenRefreshCircuit.ts`               | Vérifications de l’état des informations d’identification et circuit d’actualisation |
| `streamingPiiTransform.ts`, `streamingCredentialTransform.ts`  | Désinfectants de réponse en streaming                                                |
| `gracefulShutdown.ts`, `serverLifecycle.ts`                    | Cycle de vie du processus                                                            |
| `*.stub.ts`                                                    | Stubs de profil de construction remplacés par des alias dans `next.config.mjs`       |

### base de données `src/lib/db/` —

| Chemin                | But                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`          | `getDbInstance()` singleton (journalisation WAL )                                                                                                |
| `db/migrations/`      | Migrations `.sql` numérotées et idempotentes (236 fichiers au moment de la rédaction ; numérotation des gardes `check-migration-numbering.mjs` ) |
| `db/migrationRunner/` | Coureur de migration                                                                                                                             |
| `db/adapters/`        | adaptateurs de pilote SQLite (better-sqlite3, node:sqlite, bun:sqlite, sql.js)                                                                   |
| `db/repositories/`    | Implémentations du référentiel SQLite (combos, préréglages de terrain de jeu, configuration de routage)                                          |
| `db/<domain>.ts`      | Environ 175 modules de domaine (fournisseurs, combos, apiKeys, paramètres, utilisation, …) — les importe toujours directement                    |

### `src/domain/`, `src/server/`, `src/shared/`

| Chemin                                                         | But                                                                                                                                                           |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain/policyEngine.ts`                                       | Moteur de politique                                                                                                                                           |
| `domain/fallbackPolicy.ts`, `lockoutPolicy.ts`, `costRules.ts` | Décisions de repli, politique de verrouillage, règles de coûts                                                                                                |
| `domain/quotaCache*.ts`, `quotaSnapshot*.ts`                   | Cache de quota et persistance des instantanés                                                                                                                 |
| `domain/assessment/`                                           | Évaluation du modèle (évaluateur, catégoriseur, auto-guérisseur)                                                                                              |
| `server/authz/`                                                | Pipeline d'autorisation et garde de route (`routeGuard.ts`) — voir [AUTHZ_GUIDE.md](AUTHZ_GUIDE.md), [ROUTE_GUARD_TIERS.md](../security/ROUTE_GUARD_TIERS.md) |
| `server/origin/`, `server/cors/`                               | résolution d'origine Public/MCP/WS et CORS — voir [CORS.md](../security/CORS.md)                                                                              |
| `server/ws/`                                                   | Serveur WebSocket de tableau de bord en direct                                                                                                                |
| `shared/components/`                                           | Composants et adaptateurs du tableau de bord sur `packages/ui-kit` — voir [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)                                                |
| `shared/constants/`                                            | Catalogue de fournisseurs (`providers.ts`), stratégies de routage, outils CLI, carte d'icônes, liste de refus d'en-tête en amont,…                            |
| `shared/validation/`                                           | schémas Zod et aides à la validation                                                                                                                          |
| `shared/utils/`                                                | Disjoncteur, authentification par clé API, délais d'attente de récupération, indicateurs de fonctionnalités,…                                                 |
| `shared/middleware/`, `network/`, `services/`, `hooks/`        | Middleware d'admission au chat, assistants réseau, services clients, hooks React                                                                              |

---

## Espace de travail du moteur de streaming `open-sse/` —

npm workspace `@omniroute/open-sse` (environ 2 390 fichiers suivis). Il effectue le traitement des demandes et l'exécution du fournisseur. Présentation : [OPEN_SSE_ARCHITECTURE.md](../frameworks/OPEN_SSE_ARCHITECTURE.md).

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

| Chemin                                                                                         | But                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combo.ts` + `combo/`                                                                          | Stratégies de routage combinées — voir [AUTO-COMBO.md](../routing/AUTO-COMBO.md)                                                                                     |
| `autoCombo/`                                                                                   | Scores Auto-Combo et packs de modes                                                                                                                                  |
| `accountFallback.ts` + `accountFallback/`                                                      | Temps de recharge de la connexion et verrouillage du modèle — voir [RESILIENCE_GUIDE.md](RESILIENCE_GUIDE.md)                                                        |
| `rateLimitManager.ts` + `rateLimitManager/`                                                    | Suivi des limites de débit et analyse d'en-tête                                                                                                                      |
| `compression/`                                                                                 | Moteurs de compression (`engines/`), packs de règles (`rules/`), `eval/`, `harness/`, `riskGate/` — voir [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) |
| `tokenRefresh/`, `usage/`, `cache/`, `admission/`, `sessionPool/`, `codexAccount/`, `routing/` | Actualisation des jetons, comptabilité d'utilisation, mise en cache, voies d'admission, pools de sessions, comptes Codex, aides au routage                           |
| `__tests__/`                                                                                   | Suites Vitest colocalisées (collectées par les configurations Vitest )                                                                                               |
| `AGENTS.md`                                                                                    | Guide de l'agent pour ce dossier                                                                                                                                     |

Modèle : un grand module `X.ts` à côté d'un dossier `X/` signifie que le module a été divisé en fichiers plus petits (`handlers/chatCore.ts` + `handlers/chatCore/`, `services/combo.ts` + `services/combo/`).

### `open-sse/mcp-server/`

| Chemin                | But                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| `server.ts`           | Cycle de vie du serveur MCP                                                                             |
| `httpTransport.ts`    | Transports HTTP et SSE diffusables                                                                      |
| `scopeEnforcement.ts` | Vérifications de la portée par outil                                                                    |
| `audit.ts`            | Journalisation d'audit des appels d'outils                                                              |
| `schemas/`            | Définitions et portées des outils                                                                       |
| `tools/`              | Implémentations d'outils (mémoire, compétences, compression, …)                                         |
| `toolSearch/`         | Recherche d'outils                                                                                      |
| `README.md`           | Notes d'architecture interne ; le catalogue complet est en [MCP-SERVER.md](../frameworks/MCP-SERVER.md) |

---

## espaces de travail `packages/` — npm

| Chemin                   | But                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit`: instantané vendu du kit Keak CI UI, consommé comme source. `UPSTREAM.md` épingle le commit en amont, `PATCHES.md` répertorie les correctifs locaux. `src/` est synchronisé uniquement par `scripts/dev/sync-ui-kit.sh` et gardé par `npm run check:ui-kit-snapshot`. Voir [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| `packages/browser-pool/` | `@omniroute/browser-pool`: interfaces et implémentation du pool de navigateurs (`packages/browser-pool/src/index.ts`, `packages/browser-pool/src/interfaces.ts`). Inscrit dans `workspaces`; le pool de navigateurs d'exécution utilisé par la passerelle réside dans `open-sse/services/`                                          |

## `@omniroute/` — packages publiés séparément

Ce ne sont pas des espaces de travail npm. Chacun a son propre `package.json` et son propre fichier de verrouillage ; le dossier est livré dans l'archive tar `omniroute` (`files: ["@omniroute/"]`).

| Chemin                           | But                                                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@omniroute/opencode-plugin/`    | plugin OpenCode (découverte de modèles, authentification `/connect` ) ; utilisé par `omniroute setup-opencode` — voir [OPENCODE.md](../frameworks/OPENCODE.md) |
| `@omniroute/opencode-plugin-v2/` | plugin OpenCode pour la promesse v2 API — voir [OPENCODE-V2-PLUGIN.md](../guides/OPENCODE-V2-PLUGIN.md)                                                        |
| `@omniroute/opencode-provider/`  | Générateur de configuration statique ; marqué obsolète dans son propre `package.json` en faveur de `opencode-plugin`                                           |

---

## `bin/` — CLI et scripts opérationnels

| Chemin                                                                      | But                                                                                                                    |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                             | Entrée CLI principale (`omniroute serve`, `setup`, `doctor`, `providers`, `combo`, …)                                  |
| `reset-password.mjs`                                                        | `omniroute-reset-password` binaire                                                                                     |
| `mcp-server.mjs`                                                            | point d'entrée MCP stdio                                                                                               |
| `antigravity-bridge.mjs`, `chatgpt-web-codex-mcp.mjs`                       | Pont auxiliaire / points d'entrée MCP                                                                                  |
| `aliasResolver.mjs`, `aliasResolverHook.mjs`                                | Hook de résolution ESM qui mappe les alias de chemin tsconfig pour les installations globales                          |
| `nodeRuntimeSupport.mjs`                                                    | Vérification de la version Node.js prise en charge                                                                     |
| `snapshot-data.sh`, `restore-data.sh`, `restore-policies.sh`, `rollback.sh` | Scripts de récupération d'incident auto-hébergés (partager `_ops-common.sh`)                                           |
| `cold-start-bench.sh`                                                       | Test de démarrage à froid — voir [PERF_BASELINE.md](../ops/PERF_BASELINE.md)                                           |
| `cli/commands/`                                                             | Un module par commande CLI (environ 100, y compris les intégrations `setup-*` )                                        |
| `cli/api-commands/`                                                         | Généré à partir de `docs/openapi.yaml` par `npm run build:cli-api` — ne pas modifier                                   |
| `cli/locales/`                                                              | catalogues de messages CLI (67 paramètres régionaux)                                                                   |
| `cli/tui/`, `cli/tui-components/`                                           | Terminal UI                                                                                                            |
| `cli/tray/`                                                                 | Barre d'état système et démarrage automatique (backend Windows PowerShell, barre d'état système sur macOS/Linux)       |
| `cli/runtime/`                                                              | Résolution d'exécution native (`sqliteRuntime.mjs`, `magicBytes.mjs`), superviseur de processus                        |
| `cli/*.mjs`                                                                 | Aides partagées (args, client API, répertoire de données, cryptage, magasin de fournisseurs, magasin de paramètres, …) |
| `cli/README.md`, `cli/CONVENTIONS.md`                                       | principes internes et conventions CLI                                                                                  |

Voir [CLI-TOOLS.md](../reference/CLI-TOOLS.md) et [CLI-COMPANION.md](../guides/CLI-COMPANION.md).

## application de bureau `electron/` —

| Chemin                                                     | But                                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `main.js`                                                  | Processus principal Electron (fenêtre, serveur intégré, barre d'état, mises à jour)                                |
| `preload.js`                                               | pont IPC exposé au moteur de rendu                                                                                 |
| `lib/`                                                     | Cycle de vie des fenêtres, préparation du serveur, surveillance de l'état de santé, préférences du serveur distant |
| `remoteServerPrompt*.js`, `assets/remoteServerPrompt.html` | Fenêtre d'invite du serveur distant                                                                                |
| `processTree.js`, `sqlite-inspection.js`                   | Aides au nettoyage des processus enfants et à l'inspection SQLite                                                  |
| `package.json` / `package-lock.json`                       | configuration du constructeur d'électrons et dépendances Electron                                                  |
| `assets/`                                                  | Icônes d'application et de barre d'état (`.ico`, `.icns`, `.png`)                                                  |
| `README.md`                                                | Notes internes — voir [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md)                                             |

## `public/` — actifs statiques

| Chemin                                      | But                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `providers/`                                | Logos du fournisseur chargés par identifiant (`/providers/<id>.svg`); provenance en `config/quality/provider-assets-provenance.jsonl` |
| `favicon.*`, `apple-touch-icon.*`, `icon-*` | Icônes du navigateur et PWA                                                                                                           |
| `sw.js`                                     | Travailleur de service — voir [PWA_GUIDE.md](../guides/PWA_GUIDE.md)                                                                  |
| `openapi.yaml`                              | Copie de `docs/openapi.yaml` générée par `npm run gen:public-openapi`                                                                 |
| `images/`, `sponsors/`, `deyin.svg`         | Diagrammes de flux de niveaux, bannière de sponsor, illustration README                                                               |

## Compétences des agents `skills/` —

46 compétences, un dossier chacun avec un `SKILL.md` (`cli-*`, `omni-*`, `config-codex-cli`, `ponytail`), plus `skills/README.md`. `src/lib/agentSkills/catalog.ts` les lit au moment de l'exécution et les expose via `/api/agent-skills`, MCP et A2A. La plupart des manifestes sont générés par `src/lib/agentSkills/generator.ts` (`scripts/skills/generate-agent-skills.mjs`; `npm run check:agent-skills-sync` vérifie la dérive). Voir [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## construction `scripts/` —, portes et outillage

Environ 435 fichiers suivis. Les nouveaux scripts vont dans l'un des sous-dossiers autorisés par `AGENTS.md`; un code unique va dans `scripts/ad-hoc/`.

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

Points d'entrée fréquemment utilisés :

| Scénario                                                            | But                                                                                                          |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `dev/run-next.mjs`                                                  | coureur `npm run dev` / `npm start`                                                                          |
| `build/build-next-isolated.mjs`                                     | `npm run build` (version autonome Next.js )                                                                  |
| `build/prepublish.ts`                                               | `npm run build:cli`: assemble le npm `dist/`                                                                 |
| `build/postinstall.mjs`                                             | crochet npm `postinstall`                                                                                    |
| `build/publicOpenApi.mjs`                                           | `npm run gen:public-openapi`                                                                                 |
| `docs/gen-provider-reference.ts`                                    | `npm run gen:provider-reference` (régénère PROVIDER_REFERENCE.md)                                            |
| `docs/gen-openapi-module.mjs`                                       | `prebuild:docs` (génère `src/app/docs/lib/openapi.generated.ts`)                                             |
| `i18n/run-translation.mjs`                                          | `npm run i18n:run` (miroirs de documents)                                                                    |
| `i18n/generate-route-namespaces.mjs`                                | `npm run gen:i18n-routes`                                                                                    |
| `release/aggregate-changelog.mjs`                                   | Plie les fragments `changelog.d/` en `CHANGELOG.md`                                                          |
| `check/check-fabricated-docs.mjs`                                   | `npm run check:fabricated-docs` (porte de précision du document)                                             |
| `check/check-tracked-artifacts.mjs`                                 | `npm run check:tracked-artifacts` (bloque les chemins racine `_*` suivis)                                    |
| `quality/check-quality-ratchet.mjs`                                 | `npm run quality:ratchet` (cliquet métrique contre `config/quality/`)                                        |
| `dev/run-playwright-tests.mjs`                                      | `npm run test:e2e`                                                                                           |
| `dev/run-protocol-clients-tests.mjs`, `dev/run-ecosystem-tests.mjs` | `npm run test:protocols:e2e`, `npm run test:ecosystem`                                                       |
| `dev/new-worktree.sh`                                               | Crée un arbre de travail de développement isolé — voir [WORKTREE_ISOLATION.md](../ops/WORKTREE_ISOLATION.md) |
| `dev/sync-ui-kit.sh`                                                | Synchronise `packages/ui-kit/src` avec un commit en amont épinglé                                            |

Inventaire et politiques des portes : [QUALITY_GATES.md](QUALITY_GATES.md).

## Configuration versionnée `config/` — et état de la porte

| Chemin                                   | But                                                                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18n.json` / `i18n-schema.json`         | Paramètres régionaux pris en charge (source du nombre de paramètres régionaux) et leur schéma                                                              |
| `payloadRules.json`                      | Règles de charge utile en amont (`open-sse/services/payloadRules.ts`)                                                                                      |
| `cli-tools-manifest.json`                | Manifeste d'outils CLI intégrables (`bin/cli/cli-manifest.mjs`)                                                                                            |
| `alibaba-free-tier-allowlist.json`       | Liste autorisée des modèles gratuits Alibaba                                                                                                               |
| `ci/toolchain.json`                      | versions de la chaîne d'outils CI                                                                                                                          |
| `quality/quality-baseline.json`          | Base de référence à cliquet multimétrique (couverture, avertissements, duplication, …)                                                                     |
| `quality/*-baseline.json`                | Lignes de base gelées pour les portes individuelles (complexité, duplication, taille du fichier, tranches de vérification de type, découverte de tests, …) |
| `quality/*-allowlist.json`               | Listes autorisées de portail (dépendances, licences, attribution AI, tests de frères et sœurs oubliés, …)                                                  |
| `quality/eslint-suppressions.json`       | Suppressions ESLint gelées appliquées par `npm run lint`                                                                                                   |
| `quality/gate-manifest.json`             | Manifeste de porte vérifié par `scripts/quality/gate-manifest.mjs`                                                                                         |
| `quality/vitest-exclusions.json`         | Inventaire de quarantaine pour `vitest.quarantine.config.ts`                                                                                               |
| `quality/skill-templates/`               | Modèles canoniques SKILL.md vérifiés par `scripts/quality/check-skill-contract.mjs`                                                                        |
| `quality/release-acceptance.schema.json` | Schéma de preuve de libération-acceptation — voir [QUALITY_EVIDENCE_CONTRACT.md](QUALITY_EVIDENCE_CONTRACT.md)                                             |
| `release/`                               | Rapprochements du journal des modifications et manifeste natif wreq-js, inventaire des licences et avis                                                    |

## fragments du journal des modifications `changelog.d/` —

Un PR ajoute un fragment au lieu d'éditer `CHANGELOG.md`: `features/`, `fixes/` ou `maintenance/`, nommé `<PR-number>-<slug>.md`. Au moment de la sortie, `scripts/release/aggregate-changelog.mjs` les replie dans `CHANGELOG.md` et les supprime ; `npm run check:changelog-integrity` les valide. Détails dans `changelog.d/README.md`.

---

## `docs/` — documentation publique

Les sections répertoriées dans `source.config.ts` sont compilées dans le site `/docs` (avec quelques pages de sécurité réservées aux opérateurs exclues) ; `docs/meta.json` définit l'ordre de la barre latérale. Commencez par [README.md](../README.md).

| Chemin                | Contenu                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getting-started/`    | Démarrage rapide, auto-hébergement, fournisseurs, niveaux gratuits, guides Auto-Combo et cookies Web                                                                     |
| `guides/`             | Guides de l'opérateur et du développeur : configuration, Docker, Electron, PWA, Termux, CLIs, i18n, dépannage, guide de l'utilisateur                                    |
| `architecture/`       | Architecture, référence de base de code, recettes de modification, authentification, résilience, portes de qualité, système de conception, cette carte                   |
| `reference/`          | référence API, variables d'environnement, indicateurs de fonctionnalités, outils CLI, niveaux gratuits, référence de fournisseur générée, fournisseurs supprimés         |
| `frameworks/`         | MCP, A2A, ACP, compétences, mémoire, plugins, agents cloud, webhooks, évaluations, exportation de journaux, Radar, Playground,…                                          |
| `routing/`            | Auto-Combo, raisonnement replay/routing, quota share, echelle de souscription, zero-cost strict, …                                                                       |
| `security/`           | Garde-corps, désinfection des erreurs, CORS, SSO, politique de sortie, niveaux de garde-route, chaîne d'approvisionnement,…                                              |
| `compression/`        | Guide de compression, moteurs, RTK, format de règle, packs de langue, édition de contexte                                                                                |
| `ops/`                | Flux de publication, branchement, train de fusion, déploiement (VM, Fly.io, Kubernetes), base de données, proxys, arbres de travail, détail des règles strictes          |
| `providers/`          | Guides par fournisseur (Claude Code, ChatGPT Web, Cursor, GitHub Copilot, …)                                                                                             |
| `comparison/`         | OmniRoute par rapport aux alternatives                                                                                                                                   |
| `integrations/`       | Notes d'intégration (fal.ai natif, MarkItDown MCP); non compilé dans `/docs`                                                                                             |
| `openapi.yaml`        | source OpenAPI ; nourrit `src/app/docs/lib/openapi.generated.ts`, `public/openapi.yaml` et `bin/cli/api-commands/`                                                       |
| `diagrams/`           | Sources de sirène (`.mmd`), rendu SVGs (`exported/`) et README SVGs à partir de `scripts/docs/gen-readme-*`                                                              |
| `assets/`             | Drapeau de langue SVGs et autres actifs README                                                                                                                           |
| `screenshots/`        | Captures d'écran utilisées par le README et les guides                                                                                                                   |
| `i18n/`               | Miroirs traduits : un dossier par langue (66) avec des documents racine et un sous-ensemble `docs/` ; produit par `npm run i18n:run` — voir [I18N.md](../guides/I18N.md) |
| `*.md` de haut niveau | `README.md` (index doc), `DEVELOPER-ENVIRONMENT.md` et quelques notes autonomes                                                                                          |

Points d'entrée clés : [ARCHITECTURE.md](ARCHITECTURE.md), [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md), [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md), [ENVIRONMENT.md](../reference/ENVIRONMENT.md), [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md) (générés par `npm run gen:provider-reference`).

---

## suites de tests `tests/` —

Environ 9 670 fichiers suivis. Les fichiers de test appartiennent ici, pas à la racine du projet. Exceptions : les dossiers `__tests__/` colocalisés dans `src/` et `open-sse/` que les configurations Vitest collectent.

| Chemin                                                 | Contenu                                                                                                                                                                                                       | Coureur                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `tests/unit/`                                          | Tests unitaires (plus de 9 000 fichiers) : beaucoup au niveau supérieur, ainsi que des dossiers de domaine (`ui/`, `compression/`, `build/`, `guardrails/`, `db/`, `cli/`, `api/`, `dashboard/`, `combo/`, …) | Exécuteur de test de nœud (`npm run test:unit`); `*.tsx` via `test:vitest:ui`           |
| `tests/unit/serial/`                                   | Tests sensibles au processeur exécutés avec concurrence 1                                                                                                                                                     | `npm run test:unit:serial`                                                              |
| `tests/unit/autoCombo/`, `tests/unit/api/**/*.spec.ts` | suites Vitest à l'intérieur de l'arborescence des unités                                                                                                                                                      | `npm run test:vitest`                                                                   |
| `tests/integration/`                                   | Tests d'intégration multi-modules et DB ; `combo-matrix/`, `combo-live/`, `services/`                                                                                                                         | `npm run test:integration`, `test:combo:matrix`, `test:combo:live`, `test:services:int` |
| `tests/e2e/`                                           | Playwright `*.spec.ts` + suites en direct `ecosystem.test.ts`, `protocol-clients.test.ts`                                                                                                                     | `npm run test:e2e`, `test:ecosystem`, `test:protocols:e2e`                              |
| `tests/boundary/`                                      | `*.live.test.ts` contre une instance en cours d'exécution                                                                                                                                                     | `npm run test:boundary:live`                                                            |
| `tests/homolog/`                                       | Suites d'homologation (`api/`, `ui/` avec sa propre configuration Playwright )                                                                                                                                | `npm run homolog` — voir [HOMOLOGATION.md](../ops/HOMOLOGATION.md)                      |
| `tests/load/`                                          | Charger et tremper les scripts (k6)                                                                                                                                                                           | Workflow de résilience nocturne                                                         |
| `tests/_setup/`                                        | fichiers `--import` / setup (répertoire de données isolé, garde de sortie, polyfills Vitest UI )                                                                                                              | Chargé par les coureurs                                                                 |
| `tests/_helpers/`, `tests/helpers/`                    | Aides de test partagées (golden snapshots, session de gestion, …)                                                                                                                                             | Importé par tests                                                                       |
| `tests/fixtures/`                                      | Données de luminaire et luminaires de processus enfants                                                                                                                                                       | Importé par tests                                                                       |
| `tests/snapshots/`                                     | Fichiers dorés pour `tests/helpers/goldenSnapshot.ts`                                                                                                                                                         | Importé par tests                                                                       |
| `tests/manual/`                                        | fichiers `.http` pour les appels REST manuels                                                                                                                                                                 | Manuel                                                                                  |
| `tests/security/`                                      | Scripts shell de sécurité                                                                                                                                                                                     | Appareils manuels / de test unitaire                                                    |
| `tests/types/`                                         | Aménagements contractuels au niveau du type                                                                                                                                                                   | —                                                                                       |

Matrice complète : `CONTRIBUTING.md` → "Running Tests" et [COVERAGE_PLAN.md](../ops/COVERAGE_PLAN.md).

---

## `deploy/` — Kubernetes

| Chemin                                             | But                                                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `deploy/helm/omniroute/`                           | Graphique Helm (`Chart.yaml`, `values.yaml`, modèles de déploiement, service, entrée, PVC, secret, configmap) |
| `deploy/kubernetes/base/`                          | Base Kustomize (espace de noms, déploiement, service, PVC, configmap, `secret.example.yaml`)                  |
| `deploy/kubernetes/overlays/k3s/`, `overlays/k8s/` | Superpositions spécifiques au cluster (entrée, classe de stockage, ressources, sondes)                        |

Voir [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

## Images auxiliaires `docker/` —

| Chemin                              | But                                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `docker/chatgpt-web-codex-browser/` | Image de navigateur sans tête avec un proxy CDP pour l'exécuteur Web ChatGPT — voir [CHATGPT_WEB.md](../providers/CHATGPT_WEB.md) |
| `docker/devin-bridge/`              | image de pont Devin, composer un fichier, des simulations et un garde réseau                                                      |
| `docker/vnc-browser/`               | Chromium avec VNC pour les sessions de navigateur interactives                                                                    |

L'image principale est la racine `Dockerfile`; voir [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md).

## Recettes de la communauté `contrib/` — (non officiellement prises en charge)

| Chemin                  | But                                                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contrib/podman/`       | Quadlets Podman (conteneur, volume, réseau, Redis)                                                                                                   |
| `contrib/vps/`          | VPS `compose.yaml` + `.env.example`                                                                                                                  |
| `contrib/windows/`      | lanceurs `.bat` pour exécuter à partir d'une caisse Windows                                                                                          |
| `contrib/session-sync/` | README pour une extension de navigateur tierce de synchronisation de session — voir [SESSION-SYNC-EXTENSION.md](../guides/SESSION-SYNC-EXTENSION.md) |

## `examples/`

| Chemin                          | But                                                                           |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `examples/omniroute-cmd-hello/` | Plugin de commande minimal — voir [PLUGINS.md](../frameworks/PLUGINS.md)      |
| `examples/plugins/`             | Exemples de plugins : langfuse, request-logger, theme-manager, Welcome-Banner |
| `examples/quickstart/`          | Extraits de clients : curl, Node.js (axios), PHP, Python                      |

---

## intégration `.github/` — GitHub

| Chemin                                                       | But                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`                                         | CI (`ci.yml`, `quality.yml`, `build.yml`), analyses de sécurité (`codeql.yml`, `semgrep.yml`, `scorecard.yml`, `dast-smoke.yml`), suites `nightly-*.yml` planifiées, publication (`npm-publish.yml`, `docker-publish.yml`, `electron-release.yml`), workflows de publication et de maintenance |
| `.github/actions/npm-ci-retry/`                              | Action composite : `npm ci` avec cache et réessayez                                                                                                                                                                                                                                            |
| `.github/actions/prepare-unit-storage/`                      | Action composite : libère de l'espace disque d'exécution, puis installe les dépendances                                                                                                                                                                                                        |
| `.github/ISSUE_TEMPLATE/`                                    | Formulaires de problèmes de bogues, de fonctionnalités et de couverture de tests                                                                                                                                                                                                               |
| `.github/pull_request_template.md`, `PULL_REQUEST_TEMPLATE/` | Modèle PR par défaut et variantes bugfix/feature                                                                                                                                                                                                                                               |
| `.github/CODEOWNERS`, `FUNDING.yml`, `dependabot.yml`        | Propriétaires de codes, liens de parrainage, mises à jour des dépendances                                                                                                                                                                                                                      |
| `.github/labels.yml`                                         | Définitions d'étiquettes appliquées par `npm run labels:sync`                                                                                                                                                                                                                                  |
| `.github/copilot-instructions.md`                            | instructions GitHub Copilot (une surface agent-instruction)                                                                                                                                                                                                                                    |

Carte des tâches CI : [QUALITY_GATES.md](QUALITY_GATES.md).

## crochets git `.husky/` —

| Déposer      | But                                                                                                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Vérification d'identité Git, lint-staged, manifeste de porte, synchronisation de documents, tout budget, cliquet à l'échelle du type, artefacts suivis et vérifications d'instantanés du kit d'interface utilisateur |
| `commit-msg` | `scripts/check/check-ai-attribution.mjs` sur le message de validation                                                                                                                                                |
| `pre-push`   | Intentionnellement léger : un contrôle d'intégrité PATH/npm qui sort de 0                                                                                                                                            |

Le runtime du hook dans `.husky/_/` est généré lors de l'installation et n'est pas suivi.

---

## Conseils de navigation

- **Nouveau contributeur ?** `CONTRIBUTING.md` → `AGENTS.md` → [ARCHITECTURE.md](ARCHITECTURE.md) → [CODEBASE_DOCUMENTATION.md](CODEBASE_DOCUMENTATION.md).
- **Changer quelque chose de commun** (fournisseur, itinéraire, module DB, outil MCP, compétence A2A ) ? Suivez [MODIFICATION_SCENARIOS.md](MODIFICATION_SCENARIOS.md).
- **Ajouter un fournisseur ?** Vérifiez d'abord [REMOVED_PROVIDERS.md](../reference/REMOVED_PROVIDERS.md), puis recoupez [PROVIDER_REFERENCE.md](../reference/PROVIDER_REFERENCE.md).
- **Fonctionner localement ?** [SETUP_GUIDE](../guides/SETUP_GUIDE.md)
- **Un déploiement ?** [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [SELF_HOST_GUIDE.md](../getting-started/SELF_HOST_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [KUBERNETES_DEPLOYMENT_GUIDE.md](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).
- **Libération?** [RELEASE_CHECKLIST](../ops/RELEASE_CHECKLIST.md)
- **Une porte de qualité a échoué ?** [QUALITY_GATES.md](QUALITY_GATES.md) et [QUALITY_GATE_PLAYBOOK.md](../ops/QUALITY_GATE_PLAYBOOK.md).
