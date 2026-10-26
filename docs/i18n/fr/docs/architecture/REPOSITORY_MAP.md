# Repository Map (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Description en une ligne de chaque répertoire et fichier racine.**
> Dernière mise à jour : 2026-06-28 — OmniRoute v3.8.40
>
> Utilisez cette carte pour parcourir rapidement la base de code. Pour des analyses approfondies, suivez les liens vers la documentation dédiée.

## Arborescence de premier niveau

```
OmniRoute/
├── src/                  # Application Next.js 16 (interface utilisateur + routes API + bibliothèques + domaine + serveur)
├── open-sse/             # Espace de travail du moteur de streaming (gestionnaires, exécuteurs, traducteur, serveur MCP)
├── packages/            # Espaces de travail npm : ui-kit (Keak CI UI Kit intégré) et browser-pool
├── electron/             # Enveloppe de bureau (Electron 41 + electron-builder 26.10)
├── bin/                  # Point d’entrée CLI et gestionnaires de commandes
├── scripts/              # Scripts de compilation, de vérification, de synchronisation et scripts ponctuels
├── docs/                 # Documentation publique (vous êtes ici)
├── tests/                # Toutes les suites de tests (unitaires, intégration, e2e, clients de protocole)
├── public/               # Ressources statiques Next.js, manifeste PWA, service worker, icônes
├── config/               # Configuration statique + état des seuils de qualité (i18n, payloadRules, quality/)
├── images/               # Ressources graphiques pour le marketing / README
├── @omniroute/           # Packages complémentaires publiables (opencode-plugin, opencode-provider)
├── skills/               # Packs de compétences CLI/agent (cli-* + omni-* + config-codex-cli)
├── examples/             # Exemples de plugins + modèle de démarrage omniroute-cmd-hello
├── contrib/              # Contributions de la communauté (podman/)
├── .source/              # Configuration des sources Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Workflows GitHub Actions + modèles de tickets + modèle de PR
├── .husky/               # Hooks Git (pre-commit, pre-push)
├── .claude/              # Commandes slash Claude Code (propres au projet)
├── .agents/              # Workflows et compétences Codex / pour agents génériques (miroir de .claude/)
├── .vscode/              # Paramètres de l’espace de travail VS Code
├── _ideia/               # Notes de planification (informelles ; non distribuées)
├── _mono_repo/           # Sous-projets historiques (cloud, site, vscode-extension)
├── _references/          # Clones de référence en lecture seule issus de projets OSS associés
├── _tasks/               # Fichiers de suivi des tâches pour chaque version (informels)
├── .build/ .worktrees/ dist/   # Espaces temporaires locaux de compilation / git-worktree / sortie de compilation (ignorés par Git)
├── .issues/              # Cache local des tickets (ignoré par Git)
├── .playwright-mcp/      # Artéfacts de test Playwright MCP
├── coverage/             # Résultats de couverture c8 (ignorés par Git)
├── logs/                 # Journaux d’exécution (ignorés par Git)
├── node_modules/         # Dépendances (ignorées par Git)
├── package/              # Zone de préparation de npm pack (artéfact de compilation)
├── .next/                # Sortie de compilation Next.js (ignorée par Git)
└── (fichiers racine — voir ci-dessous)
```

---

## Fichiers racine

| Fichier                                     | Objectif                                                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Page d’accueil marketing + démarrage rapide + matrice des fonctionnalités (voir aussi `llm.txt`)            |
| **CHANGELOG.md**                            | Journal des modifications par version (généré automatiquement par la compétence `/version-bump-cc`)         |
| **LICENSE**                                 | Texte de la licence MIT                                                                                     |
| **CLAUDE.md**                               | Règles du projet pour les agents Claude Code (règles strictes, conventions, scénarios)                      |
| **AGENTS.md**                               | Identique à CLAUDE.md, mais pour les agents IA autres que Claude (Codex, Cursor, etc.)                      |
| **GEMINI.md**                               | Règles concises pour les agents basés sur Gemini (sous-ensemble de CLAUDE.md)                               |
| **CONTRIBUTING.md**                         | Guide de contribution : configuration, commits conventionnels, tests, processus de PR                       |
| **SECURITY.md**                             | Politique de signalement des vulnérabilités, versions prises en charge, modèle de menace                    |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — attentes relatives au comportement de la communauté                                  |
| **llm.txt**                                 | Page d’accueil en texte brut optimisée pour les robots d’exploration LLM (SEO pour assistants IA)           |
| **package.json**                            | Manifeste npm, scripts, dépendances, moteurs, seuil de couverture c8                                        |
| **package-lock.json**                       | Arborescence des dépendances verrouillée                                                                    |
| **tsconfig.json**                           | Configuration TypeScript racine                                                                             |
| **tsconfig.typecheck-core.json**            | Configuration de vérification des types pour le cœur dans `src/`                                            |
| **tsconfig.typecheck-noimplicit-core.json** | Vérification stricte des types (`noImplicitAny`)                                                            |
| **tsconfig.tsbuildinfo**                    | Cache de compilation incrémentielle TS (ignoré par Git)                                                     |
| **next.config.mjs**                         | Configuration de compilation Next.js 16 (sortie autonome)                                                   |
| **next-env.d.ts**                           | Types d’environnement générés automatiquement par Next.js                                                   |
| **eslint.config.mjs**                       | Configuration plate ESLint (règles par zone du projet)                                                      |
| **prettier.config.mjs**                     | Règles de formatage Prettier                                                                                |
| **postcss.config.mjs**                      | Configuration PostCSS pour le pipeline Tailwind/CSS                                                         |
| **playwright.config.ts**                    | Configuration des tests E2E Playwright                                                                      |
| **vitest.config.ts**                        | Configuration Vitest (suite par défaut)                                                                     |
| **vitest.mcp.config.ts**                    | Configuration Vitest pour les suites du serveur MCP, d’autoCombo et de cache                                |
| **sonar-project.properties**                | Configuration SonarQube/SonarCloud (qualité du code)                                                        |
| **Dockerfile**                              | Build Docker multi-étapes (builder → runner-base → runner-cli)                                              |
| **docker-compose.yml**                      | Compose de développement avec 4 profils (base, cli, host, cliproxyapi) + service annexe Redis               |
| **docker-compose.prod.yml**                 | Compose de production (port 20130, Redis, volumes nommés)                                                   |
| **.dockerignore**                           | Fichiers exclus du contexte Docker                                                                          |
| **fly.toml**                                | Configuration de déploiement Fly.io (région `sin`, port 20128, volume /data)                                |
| **.env.example**                            | Modèle de fichier d’environnement (copié automatiquement vers `.env` lors de la première installation)      |
| **.gitignore**                              | Motifs d’exclusion Git                                                                                      |
| **.npmignore**                              | Liste d’exclusion pour la publication npm                                                                   |
| **.npmrc**                                  | Configuration npm (registre, politique de fichier de verrouillage)                                          |
| **.node-version**                           | Version de Node épinglée (utilisée par les outils compatibles avec nvm)                                     |
| **.nvmrc**                                  | Version de Node épinglée pour nvm                                                                           |
| **eslint.complexity.config.mjs**            | Configuration ESLint pour le seuil progressif de complexité (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configuration ESLint pour les règles SonarJS (complexité cognitive / duplication)                           |
| **source.config.ts**                        | Configuration source `defineDocs` de Fumadocs (alimente `.source/`)                                         |
| **knip.json**                               | Configuration Knip — fichiers/exports/dépendances inutilisés (alimente le contrôle du code mort)            |
| **stryker.conf.json**                       | Configuration des tests de mutation Stryker                                                                 |
| **.size-limit.json**                        | Configuration du budget de taille des bundles pour size-limit                                               |
| **promptfooconfig.yaml**                    | Configuration des évaluations promptfoo                                                                     |
| **.gitleaks.toml**                          | Ensemble de règles d’analyse des secrets gitleaks                                                           |
| **.zizmor.yml**                             | Configuration de l’analyse de sécurité des GitHub Actions par zizmor                                        |
| **socket.yml**                              | Configuration de la chaîne d’approvisionnement Socket.dev                                                   |
| **news.json**                               | Flux d’annonces v2 localisé ; l’élément de lancement de Radar est livré inactif                             |
| **flake.nix** / **flake.lock**              | Définition et verrouillage du shell de développement Nix                                                    |
| **.env**                                    | Secrets locaux (ignorés par git — générés à partir de `.env.example`)                                       |

> **Déplacés hors de la racine dans la v3.8.26 (désencombrement) :**
>
> - **→ `config/quality/` :** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json`, ainsi que le fichier généré `quality-metrics.json` (ignoré par git). Voir [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Application Next.js

```
src/
├── app/                 # App Router (pages + routes API + pages d’état + page d’accueil)
├── lib/                 # Bibliothèques principales / modules métier (80 sous-répertoires + environ 70 fichiers de premier niveau)
├── domain/              # Logique métier pure (moteur de politiques, repli, coût, verrouillage, comboResolver, évaluation)
├── server/              # Modules réservés au serveur (pipeline d’autorisation, CORS, middleware d’authentification) — ne peuvent pas être importés depuis le client
├── shared/              # Partagé entre le serveur et le client lorsque cela est sûr (constantes, types, validation, contrats, utilitaires)
├── i18n/                # Configuration next-intl + fichiers JSON de messages par paramètres régionaux (67 paramètres régionaux)
├── middleware/          # Middleware Next.js (enrichissement des requêtes, détection des paramètres régionaux)
├── mitm/                # Cœur du proxy MITM : génération/installation des certificats, gestionnaires, cibles, inspecteur, masques, transfert direct
│   ├── handlers/        # 9 classes de gestionnaires d’agents d’IDE étendant MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Couche de capture du trafic : tampon (circulaire en mémoire), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Code d’adaptation des modèles (couche de compatibilité héritée)
├── scripts/             # Scripts de maintenance intégrés à l’arborescence (par ex., backfillAggregation)
├── sse/                 # Gestionnaires/services SSE hérités (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Stockage en mémoire hérité (en cours de remplacement par src/lib/db)
├── types/               # Fichiers de types TS partagés
├── instrumentation.ts   # Point d’intégration de télémétrie Next.js (navigateur + edge)
├── instrumentation-node.ts  # Instrumentation réservée à Node
└── proxy.ts             # Couche d’entrée du proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Chemin                                                                       | Objectif                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API publique compatible avec OpenAI (~25 sous-routes : chat, complétions, embeddings, fichiers, traitements par lots, audio, images, vidéos, musique, reclassement, modérations, recherche, ws, agents, comptes, fournisseurs, etc.)                                                                                          |
| `app/api/v1beta/`                                                            | Points de terminaison d’API de style Gemini                                                                                                                                                                                                                                                                                   |
| `app/api/playground/`                                                        | Routes de Playground Studio : `improve-prompt/` (POST — réécriture de prompts par LLM), `presets/` (GET pour répertorier / POST pour créer), `presets/[id]/` (GET / PUT / DELETE) — voir `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                               |
| `app/api/` (hors v1)                                                         | Routes de gestion/d’administration (~60 répertoires : fournisseurs, combinaisons, paramètres, mcp, a2a, évaluations, mémoire, compétences, webhooks, conformité, résilience, surveillance, tunnels, outils CLI, etc.)                                                                                                         |
| `app/api/tools/agent-bridge/`                                                | API REST AgentBridge — 12 routes (contrôle du serveur, état/DNS/mappages des agents, contournement, certificat, autorité de certification en amont). LOCAL_ONLY + SPAWN_CAPABLE. Voir `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                    |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS de Traffic Inspector — plus de 16 routes (requêtes, sessions, hôtes, modes de capture, exportation, ws). LOCAL_ONLY + SPAWN_CAPABLE. Voir `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                            |
| `app/a2a/`                                                                   | Point d’entrée A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                 |
| `app/.well-known/agent.json/`                                                | Carte d’agent A2A (découverte)                                                                                                                                                                                                                                                                                                |
| `app/(dashboard)/dashboard/`                                                 | Pages de l’interface utilisateur du tableau de bord (plus de 50 sections, ~118 fichiers page.tsx : fournisseurs, combinaisons, paramètres, mémoire, compétences, webhooks, évaluations, audit, traitements par lots, cache, coûts, état, système, activité, etc.)                                                             |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interface utilisateur de Search Tools Studio (3 onglets : recherche/extraction/comparaison + SearchConceptCard + ProviderCatalog) — voir `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                             |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21) : `page.tsx` (structure à 3 onglets), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Page du tableau de bord AgentBridge — carte du serveur, 9 cartes d’agents, assistant de configuration, mappage de modèles, liste de contournement. i18n PT-BR + EN. Voir `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                    |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Page du tableau de bord Traffic Inspector — vue fractionnée DevTools, 7 onglets de détails, 4 boutons de mode de capture, enregistreur de session, colorisation du contexte. i18n PT-BR + EN. Voir `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                    |
| `app/(dashboard)/dashboard/activity/`                                        | Page de flux d’activité (groupe B) : `page.tsx` (serveur) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — voir `docs/architecture/MONITORING_SECTIONS.md`                                                                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Page de partage des quotas (groupe B) : `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                           |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Page de configuration des forfaits des fournisseurs (groupe B) : `page.tsx` + `ProviderPlanConfigClient.tsx` — remplacement des dimensions de quota par connexion                                                                                                                                                             |
| `app/docs/`                                                                  | Visionneuse de documentation intégrée (affiche `docs/*.md`)                                                                                                                                                                                                                                                                   |
| `app/landing/`                                                               | Page d’accueil marketing                                                                                                                                                                                                                                                                                                      |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Pages liées à l’authentification                                                                                                                                                                                                                                                                                              |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Pages d’erreur HTTP                                                                                                                                                                                                                                                                                                           |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Pages statiques/de statut                                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Mise en page racine, accueil, manifeste PWA, CSS global                                                                                                                                                                                                                                                                       |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limites de gestion des erreurs                                                                                                                                                                                                                                                                                                |

### `src/lib/` — Bibliothèques principales (~50 modules)

| Module                                           | Objectif                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                           | Gestionnaire de tâches du protocole A2A, compétences (5), streaming                                                                                                                                                                                                                                                               |
| `acp/`                                           | Registre d’agents CLI (découverte locale des CLI — voir `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                               |
| `api/`                                           | Utilitaires d’API partagés (`requireManagementAuth`, validation)                                                                                                                                                                                                                                                                  |
| `auth/`                                          | Session, hachage des mots de passe, validation des jetons                                                                                                                                                                                                                                                                         |
| `batches/`                                       | Gestionnaires de l’API Batches d’OpenAI                                                                                                                                                                                                                                                                                           |
| `catalog/`                                       | Validation Zod du catalogue de fournisseurs + résolution des capacités                                                                                                                                                                                                                                                            |
| `cloudAgent/`                                    | Agents cloud (Codex Cloud, Devin, Jules) — voir `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                  |
| `combos/`                                        | Résolution des combinaisons + utilitaires de réorganisation                                                                                                                                                                                                                                                                       |
| `audit/`                                         | Utilitaires du flux d’activité : `highLevelActions.ts` (liste d’autorisation + `isHighLevelAction()`), `activityIcons.ts` (correspondance action → icône/verbe), `timeline.ts` (groupByDay/relativeTime) — voir `docs/architecture/MONITORING_SECTIONS.md`                                                                        |
| `compliance/`                                    | Journal d’audit + audit des fournisseurs — voir `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                     |
| `compression/`                                   | Couche d’intégration du moteur de compression (les moteurs se trouvent dans `open-sse/services/compression/`)                                                                                                                                                                                                                     |
| `config/`                                        | Utilitaires de configuration à l’exécution                                                                                                                                                                                                                                                                                        |
| `db/`                                            | Plus de 120 modules de base de données métier + 168 migrations (passez toujours par ici pour SQLite)                                                                                                                                                                                                                              |
| `quota/`                                         | Moteur de partage des quotas : `dimensions.ts` (types/Zod), `types.ts` (interface QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — voir `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                         | Client du catalogue Radar de modèles gratuits : `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — voir `docs/frameworks/RADAR.md`                                                                                                                                      |
| `display/`                                       | Utilitaires de formatage de l’interface utilisateur (coût, latence, etc.)                                                                                                                                                                                                                                                         |
| `embeddings/`                                    | Utilitaires du service d’embeddings                                                                                                                                                                                                                                                                                               |
| `env/`                                           | Analyse et validation des variables d’environnement                                                                                                                                                                                                                                                                               |
| `evals/`                                         | Framework d’évaluation (suites, exécuteur, environnement d’exécution) — voir `docs/frameworks/EVALS.md`                                                                                                                                                                                                                           |
| `guardrails/`                                    | Masquage des données personnelles, protection contre l’injection de prompts, passerelle de vision — voir `docs/security/GUARDRAILS.md`                                                                                                                                                                                            |
| `jobs/`                                          | Tâches en arrière-plan (de type cron)                                                                                                                                                                                                                                                                                             |
| `memory/`                                        | Mémoire conversationnelle (RRF hybride SQLite FTS5 + sqlite-vec + niveau 2 Qdrant) — voir `docs/frameworks/MEMORY.md`                                                                                                                                                                                                             |
| `memory/embedding/`                              | Couche d’embeddings multisource : `index.ts` (résolveur), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                                |
| `memory/vectorStore.ts`                          | Wrapper sqlite-vec v0.1.9 — recherche KNN par force brute + RRF hybride (FTS5 + vecteur, k=60). Initialisation différée, avec dégradation progressive lorsque sqlite-vec n’est pas disponible. (plan 21)                                                                                                                          |
| `memory/reindex.ts`                              | `runReindexBatch()` — traite en arrière-plan les souvenirs avec `needs_reindex=1` ; appelé par `POST /api/memory/reindex` et par le chemin de remplissage différé. (plan 21)                                                                                                                                                      |
| `monitoring/`                                    | Contrôles d’intégrité, émission de métriques                                                                                                                                                                                                                                                                                      |
| `oauth/`                                         | Flux OAuth/d’importation pour 22 modules de fournisseurs (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                              |
| `plugins/`                                       | Registre des plugins                                                                                                                                                                                                                                                                                                              |
| `promptCache/`                                   | Points d’arrêt du cache de prompts de style Anthropic                                                                                                                                                                                                                                                                             |
| `skills/`                                        | Framework de compétences (intégrées + place de marché + SkillsSH) — voir `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                              |
| `playground/`                                    | Utilitaires partagés de Playground Studio : `codeExport.ts` (générateur curl/Python/TS), `promptImprover.ts` (constructeur de méta-prompts), `streamMetrics.ts` (TTFT/TPS purs), `types.ts` (tableau de tarification) — voir `docs/frameworks/PLAYGROUND_STUDIO.md`                                                               |
| `webhookDispatcher.ts`                           | Livraison de webhooks avec HMAC — voir `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                              |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`         | Gestionnaires de tunnels — voir `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                       |
| `cloudSync.ts`, `initCloudSync.ts`               | Synchronisation cloud facultative de l’état                                                                                                                                                                                                                                                                                       |
| `localDb.ts`                                     | Fichier d’agrégation réexportant les modules de base de données (aucune logique — réexportations uniquement)                                                                                                                                                                                                                      |
| `cacheLayer.ts`, `idempotencyLayer.ts`           | Mise en cache des requêtes + idempotence                                                                                                                                                                                                                                                                                          |
| (~30 fichiers supplémentaires de premier niveau) | Utilitaires spécialisés (logEnv, modelsDevSync, piiSanitizer, etc.)                                                                                                                                                                                                                                                               |

### `src/lib/db/` — Base de données (147 modules + 208 migrations)

| Sous-répertoire           | Objectif                                                                                                                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` avec journalisation WAL                                                                                                                                                                        |
| `db/migrations/`          | Fichiers SQL versionnés (idempotents, transactionnels). `073_memory_vec.sql` ajoute `memory_vec_meta` + la colonne `needs_reindex` (plan 21).                                                                              |
| `db/playgroundPresets.ts` | Module CRUD pour les préréglages de Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                                       |
| `db/memoryVec.ts`         | CRUD pour `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, etc. (plan 21)                                                               |
| `db/<domain>.ts`          | Un module par domaine : fournisseurs, combinaisons, clés d’API, utilisateurs, sessions, utilisation, audit*log, webhooks, compétences, entrées mémoire, tâches d’agents cloud, évaluations*\*, cache de raisonnement, etc. |

### `src/domain/`

| Module                 | Objectif                                                             |
| ---------------------- | -------------------------------------------------------------------- |
| `policy.ts`            | Moteur de politiques                                                 |
| `fallbackPolicy.ts`    | Arbre de décision de repli                                           |
| `costRules.ts`         | Règles de calcul des coûts                                           |
| `lockoutPolicy.ts`     | Politique de verrouillage des modèles/connexions                     |
| `tagRouter.ts`         | Routage basé sur les étiquettes                                      |
| `comboResolver.ts`     | Résolution des combinaisons (utilisée par le moteur de combinaisons) |
| `modelAvailability.ts` | Vérification de la disponibilité par modèle                          |
| `assessment/`          | Évaluation des modèles (phase 1 de RFC-AUTO-ASSESSMENT)              |

### `src/server/`

| Module   | Objectif                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline d’autorisation : `classify` → `policies` → `enforce` — voir `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configuration CORS                                                                                      |
| `auth/`  | Middleware de session                                                                                   |

### `src/shared/`

| Module                           | Objectif                                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `components/`                    | API des composants du tableau de bord : adaptateurs au-dessus de `packages/ui-kit` — voir `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP` : noms d’icônes utilisés par les écrans → composants Lucide (`<Icon>`)                                              |
| `constants/providers.ts`         | **375 fournisseurs** avec validation Zod (source de vérité)                                                                    |
| `constants/cliTools.ts`          | Registre des outils CLI externes                                                                                               |
| `constants/routingStrategies.ts` | **20 stratégies de routage** avec priorités                                                                                    |
| `constants/publicApiRoutes.ts`   | Routes qui nécessitent une authentification Bearer (plutôt qu’une authentification de gestion)                                 |
| `constants/upstreamHeaders.ts`   | Liste de refus des en-têtes pour les requêtes en amont                                                                         |
| `validation/schemas.ts`          | Environ 80 schémas Zod (source unique de vérité pour les contrats d’API)                                                       |
| `validation/helpers.ts`          | Utilitaires de validation Zod (`validateBody`, etc.)                                                                           |
| `types/`                         | Types TS partagés                                                                                                              |
| `contracts/`                     | Contrats de l’API publique (utilisés par `files:` dans `package.json`)                                                         |
| `utils/circuitBreaker.ts`        | Disjoncteur pour les fournisseurs (voir `docs/architecture/RESILIENCE_GUIDE.md`)                                               |
| `utils/apiAuth.ts`               | Validation des clés d’API, vérification des portées                                                                            |
| `utils/fetchTimeout.ts`          | Enveloppes de délai d’expiration/d’abandon pour les requêtes fetch en amont                                                    |
| `utils/releaseNotes.ts`          | Analyseur d’annonces v2/héritées fermées, localisation et masquage par identifiant                                             |

---

## `open-sse/` — Espace de travail du moteur de streaming

Espace de travail npm distinct (`@omniroute/open-sse`). Gère le traitement des requêtes et l’exécution des fournisseurs.

```
open-sse/
├── handlers/            # 16 fichiers (12 gestionnaires + 4 utilitaires) : chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, etc.
├── executors/           # 150 modules d’exécution (classes étendant BaseExecutor + utilitaires propres à chaque fournisseur)
├── translator/          # Convertisseurs de formats (9 pour les requêtes, 9 pour les réponses, 9 utilitaires)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # Environ 80 modules de service (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, etc.)
├── mcp-server/          # Serveur MCP (110 outils, 3 transports, 33 portées)
├── config/              # Registres des fournisseurs/modèles, configuration des en-têtes, alias de modèles
├── utils/               # Client TLS, récupération/répartiteur de proxy, utilitaires réseau
├── index.ts             # Point d’entrée de l’espace de travail
├── package.json         # Manifeste de l’espace de travail
├── tsconfig.json        # Configuration TS de l’espace de travail
└── types.d.ts           # Déclarations de types de l’espace de travail
```

### `open-sse/mcp-server/`

| Chemin                      | Objectif                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `server.ts`                 | Cycle de vie du serveur MCP (transports stdio + HTTP)                                     |
| `httpTransport.ts`          | Transports HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                      |
| `audit.ts`                  | Journalisation d’audit dans la table `mcp_tool_audit`                                     |
| `scopeEnforcement.ts`       | Validation de la portée pour chaque outil                                                 |
| `runtimeHeartbeat.ts`       | Signal de bon fonctionnement dans `DATA_DIR/runtime/mcp-heartbeat.json`                   |
| `descriptionCompressor.ts`  | Compression des métadonnées de description des outils pour économiser du contexte         |
| `schemas/tools.ts`          | 36 définitions d’outils de base + portées                                                 |
| `tools/advancedTools.ts`    | Implémentations des outils avancés                                                        |
| `tools/memoryTools.ts`      | 3 outils de mémoire (recherche/ajout/effacement)                                          |
| `tools/skillTools.ts`       | 4 outils de compétence (liste/activation/exécution/exécutions)                            |
| `tools/compressionTools.ts` | 5 outils de compression                                                                   |
| `README.md`                 | README interne du serveur MCP (avec renvoi croisé depuis `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Espaces de travail

| Chemin                   | Objectif                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — instantané intégré du Keak CI UI Kit (`private`, `UNLICENSED`), utilisé directement comme code source (sans compilation). `UPSTREAM.md` épingle le commit en amont et consigne l’autorisation de licence ; `PATCHES.md` répertorie les correctifs locaux (aucun) ; `src/` est synchronisé uniquement par `scripts/dev/sync-ui-kit.sh` et protégé par `npm run check:ui-kit-snapshot`. Voir `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — service facultatif de pool de navigateurs (chat basé sur CloakBrowser et Playwright)                                                                                                                                                                                                                                                                                                                                      |

---

## `electron/` — Enveloppe de bureau

| Fichier          | Rôle                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| `main.js`        | Processus principal Electron (BrowserWindow, serveur Next.js intégré, zone de notification, mise à jour automatique) |
| `preload.js`     | Pont IPC (contextBridge → `window.omniroute`)                                                                        |
| `package.json`   | Configuration electron-builder + dépendances Electron 41 + electron-builder 26.10                                    |
| `assets/`        | Icônes de l’application (Windows .ico, macOS .icns, Linux .png)                                                      |
| `dist-electron/` | Sortie de compilation (ignorée par git)                                                                              |
| `types.d.ts`     | Déclarations de types pour le pont du moteur de rendu                                                                |
| `README.md`      | README Electron interne (voir aussi `docs/guides/ELECTRON_GUIDE.md`)                                                 |

---

## `bin/` — CLI

| Fichier                                                                                                     | Rôle                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Point d’entrée principal de la CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, etc. |
| `reset-password.mjs`                                                                                        | CLI autonome de réinitialisation du mot de passe                                                                                               |
| `cli/commands/setup.mjs`                                                                                    | Assistant de configuration interactif et non interactif                                                                                        |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostic de l’état du système (plus de 8 vérifications)                                                                                      |
| `cli/commands/providers.mjs`                                                                                | Liste, test et validation des fournisseurs                                                                                                     |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Modules auxiliaires de la CLI                                                                                                                  |
| `cli/tray/tray.ts`                                                                                          | Intégration à la zone de notification (multiplateforme : NotifyIcon sous Windows, systray2 sous macOS/Linux)                                   |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, aucun nouveau binaire)                                                                                 |
| `cli/tray/autostart.ts`                                                                                     | Démarrage automatique multiplateforme (LaunchAgent / .desktop / registre)                                                                      |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Chaîne de résolution du pilote SQLite en 5 étapes (intégré → exécution → installation différée → node:sqlite → sql.js)                         |
| `cli/runtime/magicBytes.mjs`                                                                                | Validation des octets magiques des fichiers binaires (ELF / Mach-O / Mach-O fat / PE)                                                          |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — pré-résout les pilotes après l’installation / au premier démarrage                                                        |
| `nodeRuntimeSupport.mjs`                                                                                    | Validation de la version de Node.js prise en charge lors de l’installation                                                                     |

---

## `skills/` — Compétences publiques des agents

| Fichier                      | Objectif                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestes de compétences pour les agents d’IA externes (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripts de build et de vérification

| Script                              | Objectif                                                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Exécuteur de développement/démarrage avec chargement des variables d’environnement                                       |
| `build-next-isolated.mjs`           | Build autonome (mode standalone de Next.js 16)                                                                           |
| `prepublish.ts`                     | Préparation du package avant `npm pack`                                                                                  |
| `postinstall.mjs`                   | Création automatique de `.env` à partir de `.env.example` lors de la première installation                               |
| `sync-env.mjs`                      | Resynchronisation des clés de `.env` avec `.env.example`                                                                 |
| `check-cycles.mjs`                  | Détection des dépendances circulaires                                                                                    |
| `check-route-validation.mjs`        | Vérification que toutes les routes d’API disposent d’une validation Zod                                                  |
| `check-t11-any-budget.mjs`          | Application d’un budget explicite de `any` par fichier                                                                   |
| `check-docs-sync.mjs`               | Validation de la synchronisation des versions de la documentation (pré-commit existant)                                  |
| **`check-env-doc-sync.mjs`**        | NOUVEAU : vérification croisée des variables d’environnement dans le code, `.env.example` et `ENVIRONMENT.md`            |
| **`check-docs-counts-sync.mjs`**    | NOUVEAU : vérification que les nombres (exécuteurs, stratégies, OAuth, compétences A2A) correspondent à la documentation |
| **`check-deprecated-versions.mjs`** | NOUVEAU : signalement des versions/dates obsolètes dans la documentation                                                 |
| `check-supported-node-runtime.ts`   | Vérification que la version actuelle de Node est prise en charge                                                         |
| `check-pr-test-policy.mjs`          | Application de la règle « tests requis » aux modifications du code de production                                         |
| **`gen-provider-reference.ts`**     | NOUVEAU : génération automatique de `docs/reference/PROVIDER_REFERENCE.md` à partir du catalogue                         |
| `i18n/generate-multilang.mjs`       | Traduction des chaînes de l’interface et de la documentation via Google Translate                                        |
| `i18n_autotranslate.py`             | Pipeline de traduction de la documentation basé sur un LLM                                                               |
| `validate_translation.py`           | Validation des traductions pour chaque paramètre régional                                                                |
| `check_translations.py`             | Vérification des clés i18n côté code                                                                                     |
| `run-playwright-tests.mjs`          | Exécuteur de tests E2E Playwright                                                                                        |
| `run-protocol-clients-tests.mjs`    | Exécuteur de tests E2E MCP/A2A                                                                                           |
| `run-ecosystem-tests.mjs`           | Tests de l’écosystème (intégration des fournisseurs)                                                                     |
| `test-report-summary.mjs`           | Génération du résumé de couverture au format Markdown                                                                    |
| `smoke-electron-packaged.mjs`       | Test de fumée du build Electron packagé                                                                                  |
| `native-binary-compat.mjs`          | Vérification que les dépendances natives (`better-sqlite3`) correspondent à la version de Node d’Electron                |
| `validate-pack-artifact.ts`         | Validation de la sortie du package npm                                                                                   |
| `responses-ws-proxy.mjs`            | Passerelle WebSocket pour l’API Codex Responses                                                                          |
| `v1-ws-bridge.mjs`                  | Passerelle WebSocket pour le point de terminaison `/api/v1/ws`                                                           |
| `standalone-server-ws.mjs`          | Exécuteur de serveur WS autonome                                                                                         |
| `system-info.mjs`                   | Affichage des informations système/d’exécution pour l’assistance                                                         |
| `healthcheck.mjs`                   | Vérification ponctuelle de l’état (utilisée par Docker HEALTHCHECK)                                                      |
| `uninstall.mjs`                     | Script de désinstallation propre                                                                                         |
| `dev/sync-ui-kit.sh`                | Copie du `src/` du CI UI Kit depuis un commit épinglé vers `packages/ui-kit/src`                                         |
| `check/check-ui-kit-snapshot.mjs`   | Contrôle pré-commit : `packages/ui-kit/src` correspond au commit amont épinglé                                           |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — noms d’icônes utilisés qui ne sont pas mappés par `ICON_MAP`                                    |
| `dev/codemod-material-icons.mjs`    | Réécriture des spans littéraux Material Symbols en `<Icon>` (outil de migration)                                         |

---

## `docs/` — Documentation publique (7 fichiers racine + 17 sous-répertoires)

### Guides principaux

| Doc                         | Objectif                                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architecture générale, cartographie des sous-systèmes, interface du tableau de bord                        |
| `CODEBASE_DOCUMENTATION.md` | Référence d’ingénierie : répertoires, modules, conventions                                                 |
| `FEATURES.md`               | Matrice des fonctionnalités avec les points forts de la v3.8                                               |
| `USER_GUIDE.md`             | Manuel utilisateur (configuration, modèles, combos, CLI, audio, etc.)                                      |
| `API_REFERENCE.md`          | Référence des endpoints de l’API avec le modèle d’authentification                                         |
| `openapi.yaml`              | Spécification OpenAPI 3.0 (121 chemins)                                                                    |
| `SETUP_GUIDE.md`            | Méthodes d’installation (npm, npx, Docker, Electron, Termux, code source)                                  |
| `ENVIRONMENT.md`            | Toutes les variables d’environnement (~800 documentées, ~3 050 lignes dans `.env.example`)                 |
| `TROUBLESHOOTING.md`        | Erreurs courantes + problèmes connus de la v3.8.0                                                          |
| `RELEASE_CHECKLIST.md`      | Processus complet de publication (skills, husky, commits conventionnels, déploiement)                      |
| `COVERAGE_PLAN.md`          | Objectifs de couverture et état actuel                                                                     |
| `FREE_TIERS.md`             | Fournisseurs avec offre gratuite sélectionnés (48+ gratuits + 11 OAuth)                                    |
| `CLI-TOOLS.md`              | Intégrations de CLI externes + CLI OmniRoute interne                                                       |
| `I18N.md`                   | Architecture i18n, ajout d’une langue, 67 paramètres régionaux                                             |
| `UNINSTALL.md`              | Étapes de désinstallation propre                                                                           |
| `PROVIDER_REFERENCE.md`     | Catalogue **généré automatiquement** de 375 fournisseurs (régénération : `npm run gen:provider-reference`) |

### Présentations détaillées des sous-systèmes

| Doc                                               | Objectif                                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                   | Serveur MCP : 110 outils, 3 transports, 33 portées, endpoints REST                        |
| `A2A-SERVER.md`                                   | A2A v0.3 : JSON-RPC, 6 skills, assistants REST, fiche d’agent                             |
| `AGENT_PROTOCOLS_GUIDE.md`                        | Guide unifié : A2A ou ACP ou Cloud Agents                                                 |
| `CLOUD_AGENT.md`                                  | Orchestration de Codex Cloud / Devin / Jules                                              |
| `SKILLS.md`                                       | Framework de skills (intégrés + marketplace + SkillsSH + sandbox)                         |
| `RADAR.md`                                        | Surcouche du catalogue Radar de modèles gratuits (`RADAR_ENABLED`, désactivée par défaut) |
| `MEMORY.md`                                       | Système de mémoire (SQLite FTS5 + Qdrant)                                                 |
| `EVALS.md`                                        | Framework d’évaluation (suites, exécutions, grilles d’évaluation)                         |
| `GUARDRAILS.md`                                   | Masqueur de données personnelles, injection de prompts, passerelle de vision              |
| `COMPLIANCE.md`                                   | Journal d’audit, conservation, désactivation de noLog                                     |
| `WEBHOOKS.md`                                     | Livraison de webhooks signés avec HMAC                                                    |
| `REASONING_REPLAY.md`                             | Cache hybride mémoire/SQLite pour `reasoning_content`                                     |
| `AUTHZ_GUIDE.md`                                  | Pipeline d’autorisation (`classify` → `policies` → `enforce`)                             |
| `RESILIENCE_GUIDE.md`                             | Disjoncteur + délai de récupération + verrouillage de modèle                              |
| `docs/security/STEALTH_GUIDE.md` (git uniquement) | Empreinte TLS (JA3/JA4), Claude Code CCH, certificat MITM                                 |
| `AUTO-COMBO.md`                                   | Moteur Auto Combo (notation à 16 facteurs, 6 packs de modes, fabrique virtuelle)          |

### Compression

| Doc                             | Objectif                                                   |
| ------------------------------- | ---------------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Vue d’ensemble des modes de compression + feuille de route |
| `COMPRESSION_ENGINES.md`        | Moteurs Caveman + RTK, contrat du registre                 |
| `COMPRESSION_RULES_FORMAT.md`   | Schéma JSON des packs de règles Caveman                    |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventaire des packs de règles par langue                  |
| `RTK_COMPRESSION.md`            | Pipeline déclaratif RTK (49 filtres)                       |

### Déploiement

| Doc                          | Objectif                                                               |
| ---------------------------- | ---------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Build Docker, profils (base/cli/host/cliproxyapi), conteneur Redis     |
| `VM_DEPLOYMENT_GUIDE.md`     | Déploiement générique sur VM/VPS (Ubuntu/Debian + nginx + systemd)     |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Déploiement sur Fly.io (actuellement disponible uniquement en chinois) |
| `TERMUX_GUIDE.md`            | Android sans interface graphique via Termux                            |
| `PWA_GUIDE.md`               | Installation de la Progressive Web App + service worker                |
| `ELECTRON_GUIDE.md`          | Build + signature + distribution de l’application de bureau            |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                 |
| `PROXY_GUIDE.md`             | Proxy sortant à 4 niveaux + marketplace 1proxy                         |

### Sous-répertoires

| Sous-répertoire       | Objectif                                                                                                                                                                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Traductions localisées de la documentation (41 langues)                                                                                                                                                                                       |
| `docs/screenshots/`   | Ressources d’image pour les guides                                                                                                                                                                                                            |
| `_tasks/superpowers/` | Plans/spécifications issus de superpowers (`writing-plans`/`brainstorming`) + recherches — dépôt isolé avec gestion de versions distincte, ignoré par Git dans l’arborescence principale. Voir CLAUDE.md → « Planning & Research Artifacts ». |

## `tests/` — Suites de tests

| Sous-répertoire                      | Type                                                | Exécuteur                                        |
| ------------------------------------ | --------------------------------------------------- | ------------------------------------------------ |
| `tests/unit/`                        | Tests unitaires (~4 800 fichiers, les plus rapides) | Exécuteur de tests natif de Node                 |
| `tests/integration/`                 | Tests d’intégration multimodules + base de données  | Exécuteur de tests natif de Node (concurrence 1) |
| `tests/e2e/`                         | E2E de l’interface utilisateur + des workflows      | Playwright                                       |
| `tests/e2e/protocol-clients.test.ts` | E2E avec clients réels MCP + A2A                    | Clients de protocole personnalisés               |
| `tests/e2e/ecosystem.test.ts`        | Intégration des fournisseurs (avec accès réseau)    | Exécuteur de tests natif de Node                 |

---

## `public/` — Ressources statiques

| Chemin              | Objectif                                                          |
| ------------------- | ----------------------------------------------------------------- |
| `public/` (racine)  | Favicons, robots.txt, manifeste, service worker, images marketing |
| `public/providers/` | Logos PNG/SVG des fournisseurs (utilisés dans le tableau de bord) |

---

## `config/` — Configurations statiques + état des contrôles qualité

Modèles de configuration distribués ainsi que les références de contrôle qualité versionnées
(déplacés ici depuis la racine du dépôt dans la v3.8.26 afin d’alléger la racine).

| Chemin                                        | Objectif                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Liste des locales + métadonnées (source canonique pour le total de 42 locales)             |
| `config/i18n-schema.json`                     | Schéma JSON validant `i18n.json`                                                           |
| `config/payloadRules.json`                    | Règles d’assainissement des charges utiles en amont                                        |
| `config/quality/quality-baseline.json`        | Référence à effet de cliquet multimétrique (`scripts/quality/check-quality-ratchet.mjs`)   |
| `config/quality/complexity-baseline.json`     | Référence figée de complexité ESLint (`check-complexity.mjs`)                              |
| `config/quality/duplication-baseline.json`    | Référence figée de duplication jscpd (`check-duplication.mjs`)                             |
| `config/quality/file-size-baseline.json`      | Référence figée de taille par fichier (`check-file-size.mjs`)                              |
| `config/quality/test-discovery-baseline.json` | Référence figée des tests orphelins (`check-test-discovery.mjs`)                           |
| `config/quality/dependency-allowlist.json`    | Liste d’autorisation des dépendances approuvées (`check-deps.mjs`)                         |
| `config/quality/.license-allowlist.json`      | Liste d’autorisation des licences SPDX (`check-licenses.mjs`)                              |
| `config/quality/quality-metrics.json`         | Métriques collectées éphémères (générées par `collect-metrics.mjs` ; **ignorées par Git**) |

---

## `.github/` — Intégration GitHub

| Chemin                             | Objectif                                                              |
| ---------------------------------- | --------------------------------------------------------------------- |
| `.github/workflows/`               | Workflows CI/CD GitHub Actions (lint, tests, couverture, publication) |
| `.github/ISSUE_TEMPLATE/`          | Modèles de tickets de bug/fonctionnalité                              |
| `.github/pull_request_template.md` | Modèle de PR                                                          |
| `.github/dependabot.yml`           | Configuration des mises à jour des dépendances                        |

---

## `.husky/` — Hooks Git

| Fichier      | Objectif                                                                      |
| ------------ | ----------------------------------------------------------------------------- |
| `pre-commit` | Exécute `lint-staged + check-docs-sync + check:any-budget:t11`                |
| `pre-push`   | Actuellement désactivé (commenté). Exécutez `npm run test:unit` manuellement. |
| `_/`         | Composants internes de Husky                                                  |

---

## `.claude/` — Commandes slash de Claude Code

| Fichier                                             | Objectif                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------ |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrémentation de version + changelog automatique         |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — workflow complet de publication                       |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Déploiement sur VPS                                                            |
| `commands/capture-release-evidences-cc.md`          | Enregistrement dans le navigateur des nouvelles fonctionnalités au format WebP |
| `commands/review-{prs,discussions}-cc.md`           | Triage des PR/discussions GitHub                                               |
| `commands/{review-issues,implement-features}-cc.md` | Workflows relatifs aux tickets                                                 |
| `settings.local.json`                               | Paramètres Claude Code propres au projet                                       |

---

## `.agents/` — Workflows génériques pour agents (Codex / Cursor / etc.)

| Chemin                   | Objectif                                                           |
| ------------------------ | ------------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 définitions de workflows (miroir de `.claude/commands/`)        |
| `skills/<name>/SKILL.md` | 9 définitions de compétences avec des notes d’exécution pour Codex |

> **Remarque :** Les workflows et les commandes sont actuellement strictement identiques, octet par octet. Si `.agents/` est destiné à cibler un environnement d’exécution d’agent différent (Codex), les variantes doivent diverger de manière significative.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Hors de l’arborescence

Ces répertoires préfixés par un trait de soulignement contiennent du contenu non distribué :

- **`_ideia/`** — notes de conception (catégories defer / notfit / viable)
- **`_mono_repo/`** — sous-projets historiques (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clones en lecture seule de projets OSS associés (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, etc.), utilisés comme références croisées pendant le développement
- **`_tasks/`** — fichiers informels de suivi des tâches pour chaque publication

Non inclus dans la sortie de `npm pack`. Voir `.npmignore`.

---

## Générés / ignorés par Git

| Chemin                 | Objectif                                       |
| ---------------------- | ---------------------------------------------- |
| `node_modules/`        | Dépendances npm                                |
| `.next/`               | Sortie de compilation Next.js                  |
| `coverage/`            | Rapports de couverture c8                      |
| `logs/`                | Journaux d’exécution                           |
| `package/`             | Zone de préparation pour npm pack              |
| `.playwright-mcp/`     | Artefacts de test Playwright MCP               |
| `.issues/`             | Cache local des tickets                        |
| `tsconfig.tsbuildinfo` | Cache de compilation incrémentielle TypeScript |

---

## Conseils de navigation

- **Vous êtes un nouveau contributeur ?** Lisez `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Vous ajoutez un fournisseur ?** Suivez `docs/architecture/ARCHITECTURE.md § Adding a New Provider` et vérifiez également `docs/reference/PROVIDER_REFERENCE.md`.
- **Vous ajoutez une route ?** Consultez `docs/architecture/ARCHITECTURE.md § Adding a New API Route` et `src/shared/validation/schemas.ts`.
- **Vous ajoutez un outil MCP ?** Consultez `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Vous ajoutez une compétence A2A ?** Consultez `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Vous exécutez le projet localement ?** Consultez `docs/guides/SETUP_GUIDE.md`.
- **Vous effectuez un déploiement ?** Consultez `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Vous préparez une version ?** Consultez `docs/ops/RELEASE_CHECKLIST.md` (ainsi que la compétence Claude Code `/generate-release-cc`).
