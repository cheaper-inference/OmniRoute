# Repository Map (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descrizione in una riga per ogni directory e file nella radice.**
> Ultimo aggiornamento: 2026-06-28 — OmniRoute v3.8.40
>
> Usa questa mappa per orientarti rapidamente nel codice. Per approfondimenti, segui i link alla documentazione dedicata.

## Albero di primo livello

```
OmniRoute/
├── src/                  # Applicazione Next.js 16 (UI + route API + librerie + dominio + server)
├── open-sse/             # Workspace del motore di streaming (handler, executor, traduttore, server MCP)
├── packages/            # Workspace npm: ui-kit (Keak CI UI Kit incluso nel repository) e browser-pool
├── electron/             # Wrapper desktop (Electron 41 + electron-builder 26.10)
├── bin/                  # Punto di ingresso della CLI e handler dei comandi
├── scripts/              # Script di build, verifica, sincronizzazione e operazioni una tantum
├── docs/                 # Documentazione pubblica (ti trovi qui)
├── tests/                # Tutte le suite di test (unitari, integrazione, e2e, client di protocollo)
├── public/               # Asset statici di Next.js, manifesto PWA, service worker, icone
├── config/               # Configurazione statica + stato dei quality gate (i18n, payloadRules, quality/)
├── images/               # Asset grafici per il marketing e il README
├── @omniroute/           # Pacchetti complementari pubblicabili (opencode-plugin, opencode-provider)
├── skills/               # Pacchetti di skill per CLI/agenti (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugin di esempio + modello iniziale omniroute-cmd-hello
├── contrib/              # Contributi della community (podman/)
├── .source/              # Configurazione sorgente di Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Workflow di GitHub Actions + modelli per issue + modello per PR
├── .husky/               # Hook Git (pre-commit, pre-push)
├── .claude/              # Comandi slash di Claude Code (specifici del progetto)
├── .agents/              # Workflow + skill per Codex/agenti generici (copia di .claude/)
├── .vscode/              # Impostazioni del workspace di VS Code
├── _ideia/               # Note di pianificazione (informali; non distribuite)
├── _mono_repo/           # Sottoprogetti storici (cloud, site, vscode-extension)
├── _references/          # Cloni di riferimento in sola lettura da progetti OSS correlati
├── _tasks/               # File di monitoraggio delle attività per ogni release (informali)
├── .build/ .worktrees/ dist/   # Directory temporanee locali per build / worktree Git / output di build (ignorate da Git)
├── .issues/              # Cache locale delle issue (ignorata da Git)
├── .playwright-mcp/      # Artefatti dei test Playwright MCP
├── coverage/             # Output della copertura c8 (ignorato da Git)
├── logs/                 # Log di runtime (ignorati da Git)
├── node_modules/         # Dipendenze (ignorate da Git)
├── package/              # Area di staging per npm pack (artefatto di build)
├── .next/                # Output di build di Next.js (ignorato da Git)
└── (file nella radice — vedi sotto)
```

---

## File nella radice

| File                                        | Scopo                                                                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Landing page di marketing + guida rapida + matrice delle funzionalità (vedere anche `llm.txt`)                    |
| **CHANGELOG.md**                            | Registro delle modifiche per ogni release (generato automaticamente dalla skill `/version-bump-cc`)               |
| **LICENSE**                                 | Testo della licenza MIT                                                                                           |
| **CLAUDE.md**                               | Regole del progetto per gli agenti Claude Code (regole vincolanti, convenzioni, scenari)                          |
| **AGENTS.md**                               | Come CLAUDE.md, ma per agenti IA diversi da Claude (Codex, Cursor, ecc.)                                          |
| **GEMINI.md**                               | Regole concise per gli agenti basati su Gemini (sottoinsieme di CLAUDE.md)                                        |
| **CONTRIBUTING.md**                         | Guida per i collaboratori: configurazione, commit convenzionali, test, flusso delle PR                            |
| **SECURITY.md**                             | Politica di segnalazione delle vulnerabilità, versioni supportate, modello delle minacce                          |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — aspettative sul comportamento della comunità                                               |
| **llm.txt**                                 | Landing page in testo semplice ottimizzata per i crawler LLM (SEO per gli assistenti IA)                          |
| **package.json**                            | Manifest npm, script, dipendenze, motori, soglia di copertura c8                                                  |
| **package-lock.json**                       | Albero delle dipendenze bloccato                                                                                  |
| **tsconfig.json**                           | Configurazione TypeScript principale                                                                              |
| **tsconfig.typecheck-core.json**            | Configurazione del controllo dei tipi per il core `src/`                                                          |
| **tsconfig.typecheck-noimplicit-core.json** | Controllo dei tipi rigoroso (`noImplicitAny`)                                                                     |
| **tsconfig.tsbuildinfo**                    | Cache della build incrementale di TS (ignorata da Git)                                                            |
| **next.config.mjs**                         | Configurazione della build di Next.js 16 (output autonomo)                                                        |
| **next-env.d.ts**                           | Tipi delle variabili di ambiente generati automaticamente da Next.js                                              |
| **eslint.config.mjs**                       | Configurazione flat di ESLint (regole per area del progetto)                                                      |
| **prettier.config.mjs**                     | Regole di formattazione di Prettier                                                                               |
| **postcss.config.mjs**                      | Configurazione PostCSS per la pipeline Tailwind/CSS                                                               |
| **playwright.config.ts**                    | Configurazione dei test E2E di Playwright                                                                         |
| **vitest.config.ts**                        | Configurazione di Vitest (suite predefinita)                                                                      |
| **vitest.mcp.config.ts**                    | Configurazione di Vitest per il server MCP e le suite autoCombo/cache                                             |
| **sonar-project.properties**                | Configurazione SonarQube/SonarCloud (qualità del codice)                                                          |
| **Dockerfile**                              | Build Docker multistadio (builder → runner-base → runner-cli)                                                     |
| **docker-compose.yml**                      | Compose di sviluppo con 4 profili (base, cli, host, cliproxyapi) + servizio collaterale redis                     |
| **docker-compose.prod.yml**                 | Compose di produzione (porta 20130, redis, volumi denominati)                                                     |
| **.dockerignore**                           | File esclusi dal contesto Docker                                                                                  |
| **fly.toml**                                | Configurazione di distribuzione Fly.io (regione `sin`, porta 20128, volume /data)                                 |
| **.env.example**                            | Modello del file delle variabili di ambiente (copiato automaticamente in `.env` alla prima installazione)         |
| **.gitignore**                              | Pattern di esclusione di Git                                                                                      |
| **.npmignore**                              | Elenco di esclusione dalla pubblicazione npm                                                                      |
| **.npmrc**                                  | Configurazione npm (registro, politica del lockfile)                                                              |
| **.node-version**                           | Versione di Node bloccata (usata dagli strumenti compatibili con nvm)                                             |
| **.nvmrc**                                  | Versione di Node bloccata per nvm                                                                                 |
| **eslint.complexity.config.mjs**            | Configurazione ESLint per il limite progressivo della complessità (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configurazione ESLint per le regole SonarJS (complessità cognitiva/duplicazione)                                  |
| **source.config.ts**                        | Configurazione sorgente `defineDocs` di Fumadocs (alimenta `.source/`)                                            |
| **knip.json**                               | Configurazione Knip — file/esportazioni/dipendenze inutilizzati (alimenta il controllo del codice morto)          |
| **stryker.conf.json**                       | Configurazione dei mutation test di Stryker                                                                       |
| **.size-limit.json**                        | Configurazione del budget del bundle per size-limit                                                               |
| **promptfooconfig.yaml**                    | Configurazione delle valutazioni promptfoo                                                                        |
| **.gitleaks.toml**                          | Regole di scansione dei segreti per gitleaks                                                                      |
| **.zizmor.yml**                             | Configurazione del linting di sicurezza di GitHub Actions per zizmor                                              |
| **socket.yml**                              | Configurazione della supply chain per Socket.dev                                                                  |
| **news.json**                               | Feed localizzato degli annunci v2; l'elemento di lancio di Radar è distribuito inattivo                           |
| **flake.nix** / **flake.lock**              | Definizione della shell di sviluppo Nix + file di lock                                                            |
| **.env**                                    | Segreti locali (ignorati da Git — generati da `.env.example`)                                                     |

> **Spostati dalla directory radice nella v3.8.26 (riordino):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` e il file generato `quality-metrics.json` (ignorato da Git). Vedere [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` : applicazione Next.js

```
src/
├── app/                 # App Router (pages + API routes + status pages + landing)
├── lib/                 # Core libraries / domain modules (80 subdirs + ~70 top-level files)
├── domain/              # Pure domain logic (policy engine, fallback, cost, lockout, comboResolver, assessment)
├── server/              # Server-only modules (authz pipeline, cors, auth middleware) — cannot import from client
├── shared/              # Shared between server and client where safe (constants, types, validation, contracts, utils)
├── i18n/                # next-intl config + per-locale message JSON (67 locales)
├── middleware/          # Next.js middleware (request enrichment, locale detection)
├── mitm/                # MITM proxy core: cert gen/install, handlers, targets, inspector, masks, passthrough
│   ├── handlers/        # 9 IDE-agent handler classes extending MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Traffic capture layer: buffer (in-memory ring), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Model adapter glue (legacy shim)
├── scripts/             # In-tree maintenance scripts (e.g., backfillAggregation)
├── sse/                 # Legacy SSE handlers/services (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Legacy in-memory store (being phased out for src/lib/db)
├── types/               # Shared TS type files
├── instrumentation.ts   # Next.js telemetry hook (browser + edge)
├── instrumentation-node.ts  # Node-only instrumentation
└── proxy.ts             # HTTP-proxy entry shim
```

### `src/app/` — Router dell'app (Next.js 16)

| Sentiero                                                                     | Scopo                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Pubblico OpenAI-compat API (~ 25 percorsi secondari: chat, completamenti, incorporamenti, file, batch, audio, immagini, video, musica, riclassificazione, moderazioni, ricerca, ws, agenti, account, fornitori, ecc.)                                                                                                    |
| `app/api/v1beta/`                                                            | Endpoint API in stile Gemini                                                                                                                                                                                                                                                                                             |
| `app/api/playground/`                                                        | Percorsi di Playground Studio: `improve-prompt/` (POST — LLM prompt rewriter), `presets/` (GET list / POST create), `presets/[id]/` (GET / PUT / DELETE) — vedi `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                   |
| `app/api/` (non v1)                                                          | percorsi Management/admin (~ 60 directory: provider, combo, impostazioni, mcp, a2a, evals, memoria, competenze, webhook, conformità, resilienza, monitoraggio, tunnel, cli-tools, ecc.)                                                                                                                                  |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 percorsi (controllo server, agente state/DNS/mappings, bypass, certificato, CA upstream). LOCAL_ONLY + SPAWN_CAPABLE. Vedi `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                |
| `app/api/tools/traffic-inspector/`                                           | Ispettore del traffico REST + WS API — 16 percorsi + (richieste, sessioni, host, modalità di acquisizione, esportazione, ws). LOCAL_ONLY + SPAWN_CAPABLE. Vedi `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                |
| `app/a2a/`                                                                   | A2A Punto di ingresso JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                         |
| `app/.well-known/agent.json/`                                                | Carta agente A2A (scoperta)                                                                                                                                                                                                                                                                                              |
| `app/(dashboard)/dashboard/`                                                 | Pagine UI del dashboard (50 sezioni +, ~ 118 file page.tsx : provider, combo, impostazioni, memoria, competenze, webhook, valutazioni, audit, batch, cache, costi, integrità, sistema, attività, ecc.)                                                                                                                   |
| `app/(dashboard)/dashboard/search-tools/`                                    | Strumenti di ricerca Studio UI (3 schede: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — vedere `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                 |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (piano 21): `page.tsx` (shell a 3 schede), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Pagina dashboard AgentBridge : scheda server, 9 schede agente, procedura guidata di configurazione, mappatura del modello, elenco di bypass. i18n PT-BR + EN. Vedi `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                     |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Pagina dashboard di Traffic Inspector: divisione DevTools, 7 schede di dettaglio, 4 modalità di acquisizione, registratore di sessione, colorazione del contesto. i18n PT-BR + EN. Vedi `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                          |
| `app/(dashboard)/dashboard/activity/`                                        | Pagina feed attività (Gruppo B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — vedi `docs/architecture/MONITORING_SECTIONS.md`                                                                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Pagina Condivisione quote (Gruppo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Pagina di configurazione del piano del fornitore (Gruppo B): `page.tsx` + `ProviderPlanConfigClient.tsx` : dimensioni della quota per sostituzione della connessione                                                                                                                                                     |
| `app/docs/`                                                                  | Visualizzatore di documentazione incorporato (renderizza `docs/*.md`)                                                                                                                                                                                                                                                    |
| `app/landing/`                                                               | Pagina di destinazione del marketing                                                                                                                                                                                                                                                                                     |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Pagine relative all'autenticazione                                                                                                                                                                                                                                                                                       |
| `app/{400,401,403,408,429,500,502,503}/`                                     | pagine di errore HTTP                                                                                                                                                                                                                                                                                                    |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | pagine Static/status                                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Layout root, home, manifest PWA, CSS globale                                                                                                                                                                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Confini dell'errore                                                                                                                                                                                                                                                                                                      |

### `src/lib/` — Librerie principali (moduli ~ 50)

| Modulo                                   | Scopo                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | task manager del protocollo A2A, competenze (5), streaming                                                                                                                                                                                                                                                                                   |
| `acp/`                                   | Registro degli agenti CLI (rilevamento CLI locale: vedere `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                        |
| `api/`                                   | Helper API condivisi (`requireManagementAuth`, convalida)                                                                                                                                                                                                                                                                                    |
| `auth/`                                  | Sessione, hashing delle password, convalida dei token                                                                                                                                                                                                                                                                                        |
| `batches/`                               | OpenAI Batch dei gestori API                                                                                                                                                                                                                                                                                                                 |
| `catalog/`                               | Catalogo del provider convalida Zod risoluzione della capacità +                                                                                                                                                                                                                                                                             |
| `cloudAgent/`                            | Agenti cloud (Codex Cloud, Devin, Jules) — vedere `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                           |
| `combos/`                                | Risoluzione combinata + aiutanti per il riordino                                                                                                                                                                                                                                                                                             |
| `audit/`                                 | Aiutanti del feed di attività: `highLevelActions.ts` (lista consentita + `isHighLevelAction()`), `activityIcons.ts` (azione → icon/verb map), `timeline.ts` (groupByDay/relativeTime) — vedere `docs/architecture/MONITORING_SECTIONS.md`                                                                                                    |
| `compliance/`                            | Registro di controllo controllo del fornitore + : vedere `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                       |
| `compression/`                           | Colla per motori a compressione (i motori vivono in `open-sse/services/compression/`)                                                                                                                                                                                                                                                        |
| `config/`                                | Aiutanti di configurazione runtime                                                                                                                                                                                                                                                                                                           |
| `db/`                                    | 120 dominio + moduli DB + 168 migrazioni (vai sempre qui per SQLite)                                                                                                                                                                                                                                                                         |
| `quota/`                                 | Motore di condivisione delle quote: `dimensions.ts` (types/Zod), `types.ts` ( interfaccia QuotaStore ), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — vedere `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Client del catalogo di modelli gratuiti radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — vedere `docs/frameworks/RADAR.md`                                                                                                                                                |
| `display/`                               | Aiutanti per la formattazione UI (costo, latenza, ecc.)                                                                                                                                                                                                                                                                                      |
| `embeddings/`                            | Aiutanti del servizio di incorporamento                                                                                                                                                                                                                                                                                                      |
| `env/`                                   | Variabile di ambiente che analizza la convalida +                                                                                                                                                                                                                                                                                            |
| `evals/`                                 | Framework Eval (suite, runner, runtime) — vedere `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                                  |
| `guardrails/`                            | PII mascheratore, iniezione rapida, ponte visivo - vedere `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                      |
| `jobs/`                                  | Lavori in background (simili a cron)                                                                                                                                                                                                                                                                                                         |
| `memory/`                                | Memoria di conversazione (SQLite FTS5 + sqlite-vec ibrido RRF + Qdrant tier 2) - vedere `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                          |
| `memory/embedding/`                      | Livello di incorporamento multi-sorgente: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (piano 21)                                                                                                                                                                                   |
| `memory/vectorStore.ts`                  | wrapper sqlite-vec v0.1.9: KNN forza bruta + ibrido RRF (FTS5 + vettoriale, k = 60). Lazy-init, si degrada dolcemente quando sqlite-vec non è disponibile. (piano 21)                                                                                                                                                                        |
| `memory/reindex.ts`                      | `runReindexBatch()` : elabora i ricordi con `needs_reindex=1` in background; chiamato da `POST /api/memory/reindex` e dal percorso lazy-backfill. (piano 21)                                                                                                                                                                                 |
| `monitoring/`                            | Controlli di integrità, emissione di metriche                                                                                                                                                                                                                                                                                                |
| `oauth/`                                 | flussi OAuth/import per 22 moduli provider (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                                       |
| `plugins/`                               | Registro dei plugin                                                                                                                                                                                                                                                                                                                          |
| `promptCache/`                           | Breakpoint della cache dei prompt in stile antropico                                                                                                                                                                                                                                                                                         |
| `skills/`                                | Quadro delle competenze (mercato + integrato + SkillsSH) — vedere `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                                |
| `playground/`                            | Aiutanti condivisi di Playground Studio: `codeExport.ts` (generatore curl/Python/TS ), `promptImprover.ts` (generatore di meta-prompt), `streamMetrics.ts` (pure TTFT/TPS), `types.ts` (tabella dei prezzi) — vedere `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                  |
| `webhookDispatcher.ts`                   | HMAC consegna del webhook: vedere `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                              |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Gestori delle gallerie: vedi `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                     |
| `cloudSync.ts`, `initCloudSync.ts`       | Sincronizzazione cloud opzionale dello stato                                                                                                                                                                                                                                                                                                 |
| `localDb.ts`                             | Barile di riesportazione per moduli db (nessuna logica - solo riesportazioni)                                                                                                                                                                                                                                                                |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Richiedi l'idempotenza + della memorizzazione nella cache                                                                                                                                                                                                                                                                                    |
| (~ altri 30 file di livello superiore)   | Aiutanti specializzati (logEnv, modelsDevSync, piiSanitizer, ecc.)                                                                                                                                                                                                                                                                           |

### `src/lib/db/` — Database (147 moduli + 208 migrazioni)

| Sottodir                  | Scopo                                                                                                                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()` singleton con journaling WAL                                                                                                                                                  |
| `db/migrations/`          | File SQL con versione (idempotenti, transazionali). `073_memory_vec.sql` aggiunge la colonna `memory_vec_meta` + `needs_reindex` (piano 21).                                                    |
| `db/playgroundPresets.ts` | Modulo CRUD per i preset di Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                    |
| `db/memoryVec.ts`         | CRUD per `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, ecc. (piano 21)                                    |
| `db/<domain>.ts`          | Un modulo per dominio: provider, combo, apiKey, utenti, sessioni, utilizzo, registro di controllo, webhook, competenze, memory_entries, cloud_agent_tasks, evals* \* , cache_ragionamento, ecc. |

### `src/domain/`

| Modulo                 | Scopo                                                   |
| ---------------------- | ------------------------------------------------------- |
| `policy.ts`            | Motore politico                                         |
| `fallbackPolicy.ts`    | Albero decisionale di fallback                          |
| `costRules.ts`         | Regole per il calcolo dei costi                         |
| `lockoutPolicy.ts`     | Model/connection politica di blocco                     |
| `tagRouter.ts`         | Routing basato su tag                                   |
| `comboResolver.ts`     | Risoluzione combinata (utilizzata dal motore combinato) |
| `modelAvailability.ts` | Verifica disponibilità per modello                      |
| `assessment/`          | Valutazione del modello (Fase 1 di RFC-AUTO-ASSESSMENT) |

### `src/server/`

| Modulo   | Scopo                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline di autorizzazione: `classify` → `policies` → `enforce` — vedere `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | configurazione CORS                                                                                         |
| `auth/`  | Middleware di sessione                                                                                      |

### `src/shared/`

| Modulo                           | Scopo                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `components/`                    | Componente del dashboard API: adattatori su `packages/ui-kit` : vedere `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nomi delle icone utilizzate dalle schermate → Componenti Lucide (`<Icon>`)                      |
| `constants/providers.ts`         | **377 fornitori** con convalida Zod (fonte di verità)                                                       |
| `constants/cliTools.ts`          | Registro degli strumenti CLI esterno                                                                        |
| `constants/routingStrategies.ts` | **20 strategie di routing** con priorità                                                                    |
| `constants/publicApiRoutes.ts`   | Percorsi che richiedono l'autenticazione del portatore (rispetto alla gestione).                            |
| `constants/upstreamHeaders.ts`   | Lista negata dell'intestazione per le richieste upstream                                                    |
| `validation/schemas.ts`          | ~ 80 schemi Zod (unica fonte di verità per i contratti API )                                                |
| `validation/helpers.ts`          | Aiutanti di convalida Zod (`validateBody`, ecc.)                                                            |
| `types/`                         | Tipi TS condivisi                                                                                           |
| `contracts/`                     | Contratti pubblici API (consumati da `files:` in `package.json`)                                            |
| `utils/circuitBreaker.ts`        | Interruttore automatico del fornitore (vedi `docs/architecture/RESILIENCE_GUIDE.md`)                        |
| `utils/apiAuth.ts`               | Convalida della chiave API, controllo dell'ambito                                                           |
| `utils/fetchTimeout.ts`          | wrapper Timeout/abort per il recupero a monte                                                               |
| `utils/releaseNotes.ts`          | Parser di annunci v2/legacy chiuso, localizzazione e licenziamento ID                                       |

---

## `open-sse/` — Workspace del motore di streaming

Workspace npm separato (`@omniroute/open-sse`). Gestisce l'elaborazione delle richieste e l'esecuzione dei provider.

```
open-sse/
├── handlers/            # 16 file (12 handler + 4 helper): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, ecc.
├── executors/           # 150 moduli executor (classi che estendono BaseExecutor + helper specifici per provider)
├── translator/          # Convertitori di formato (9 per le richieste, 9 per le risposte, 9 helper)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ moduli di servizio (combo, accountFallback, autoCombo, reasoningCache, modalità invisibile claude code/chatgpt, modelDeprecation, taskAwareRouter, workflowFSM, ecc.)
├── mcp-server/          # Server MCP (110 strumenti, 3 trasporti, 33 ambiti)
├── config/              # Registri di provider/modelli, configurazione degli header, alias dei modelli
├── utils/               # Client TLS, fetch/dispatcher proxy, helper di rete
├── index.ts             # Punto di ingresso del workspace
├── package.json         # Manifest del workspace
├── tsconfig.json        # Configurazione TS del workspace
└── types.d.ts           # Dichiarazioni dei tipi del workspace
```

### `open-sse/mcp-server/`

| Percorso                    | Scopo                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `server.ts`                 | Ciclo di vita del server MCP (trasporti stdio + HTTP)                                     |
| `httpTransport.ts`          | Trasporti HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                       |
| `audit.ts`                  | Registrazione degli audit nella tabella `mcp_tool_audit`                                  |
| `scopeEnforcement.ts`       | Convalida dell'ambito per ciascuno strumento                                              |
| `runtimeHeartbeat.ts`       | Heartbeat di integrità in `DATA_DIR/runtime/mcp-heartbeat.json`                           |
| `descriptionCompressor.ts`  | Comprime i metadati delle descrizioni degli strumenti per risparmiare contesto            |
| `schemas/tools.ts`          | 36 definizioni di strumenti di base + ambiti                                              |
| `tools/advancedTools.ts`    | Implementazioni degli strumenti avanzati                                                  |
| `tools/memoryTools.ts`      | 3 strumenti di memoria (ricerca/aggiunta/cancellazione)                                   |
| `tools/skillTools.ts`       | 4 strumenti per le skill (elenco/abilitazione/esecuzione/esecuzioni)                      |
| `tools/compressionTools.ts` | 5 strumenti di compressione                                                               |
| `README.md`                 | README interno del server MCP (con rimando incrociato da `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Workspace

| Percorso                 | Scopo                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — snapshot integrato del Keak CI UI Kit (`private`, `UNLICENSED`), utilizzato come sorgente (senza build). `UPSTREAM.md` fissa il commit upstream e registra l'autorizzazione della licenza; `PATCHES.md` elenca le patch locali (nessuna); `src/` viene sincronizzato esclusivamente da `scripts/dev/sync-ui-kit.sh` e verificato tramite `npm run check:ui-kit-snapshot`. Consultare `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — servizio opzionale di pool di browser (chat basata su CloakBrowser e Playwright)                                                                                                                                                                                                                                                                                                                                    |

---

## `electron/` — Wrapper desktop

| File             | Scopo                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `main.js`        | Processo principale di Electron (BrowserWindow, server Next.js incorporato, tray, aggiornamento automatico) |
| `preload.js`     | Bridge IPC (contextBridge → `window.omniroute`)                                                             |
| `package.json`   | Configurazione electron-builder + dipendenze Electron 41 + electron-builder 26.10                           |
| `assets/`        | Icone dell'app (Windows .ico, macOS .icns, Linux .png)                                                      |
| `dist-electron/` | Output della build (ignorato da Git)                                                                        |
| `types.d.ts`     | Dichiarazioni di tipo per il bridge del renderer                                                            |
| `README.md`      | README interno di Electron (vedere anche `docs/guides/ELECTRON_GUIDE.md`)                                   |

---

## `bin/` — CLI

| File                                                                                                        | Scopo                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Entry point principale della CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, ecc. |
| `reset-password.mjs`                                                                                        | CLI autonoma per la reimpostazione della password                                                                                            |
| `cli/commands/setup.mjs`                                                                                    | Procedura guidata di configurazione interattiva e non interattiva                                                                            |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostica dello stato del sistema (oltre 8 controlli)                                                                                      |
| `cli/commands/providers.mjs`                                                                                | Elenco/test/validazione dei provider                                                                                                         |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Moduli helper della CLI                                                                                                                      |
| `cli/tray/tray.ts`                                                                                          | Integrazione con la tray di sistema (multipiattaforma: NotifyIcon su Windows, systray2 su macOS/Linux)                                       |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, nessun nuovo file binario)                                                                           |
| `cli/tray/autostart.ts`                                                                                     | Avvio automatico multipiattaforma (LaunchAgent / .desktop / registro di sistema)                                                             |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Catena di risoluzione del driver SQLite in 5 passaggi (incluso → runtime → installazione differita → node:sqlite → sql.js)                   |
| `cli/runtime/magicBytes.mjs`                                                                                | Validazione dei magic byte binari (ELF / Mach-O / Mach-O fat / PE)                                                                           |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — pre-risolve i driver durante postinstall / il primo avvio                                                               |
| `nodeRuntimeSupport.mjs`                                                                                    | Convalida la versione di Node.js supportata durante l'installazione                                                                          |

---

## `skills/` — Skill pubbliche degli agenti

| File                         | Scopo                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `skills/omniroute*/SKILL.md` | 10 manifesti di skill per agenti IA esterni (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Script di build e verifica

| Script                              | Scopo                                                                                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Runner di sviluppo/avvio con caricamento delle variabili d'ambiente                                       |
| `build-next-isolated.mjs`           | Build standalone (Next.js 16 standalone)                                                                  |
| `prepublish.ts`                     | Preparazione del pacchetto prima di `npm pack`                                                            |
| `postinstall.mjs`                   | Creazione automatica di `.env` da `.env.example` alla prima installazione                                 |
| `sync-env.mjs`                      | Sincronizzazione delle chiavi di `.env` con `.env.example`                                                |
| `check-cycles.mjs`                  | Rilevamento delle dipendenze circolari                                                                    |
| `check-route-validation.mjs`        | Verifica che tutte le route API dispongano della validazione Zod                                          |
| `check-t11-any-budget.mjs`          | Applicazione del limite esplicito di `any` per file                                                       |
| `check-docs-sync.mjs`               | Verifica della sincronizzazione delle versioni della documentazione (pre-commit esistente)                |
| **`check-env-doc-sync.mjs`**        | NUOVO: verifica incrociata delle variabili d'ambiente nel codice, in `.env.example` e in `ENVIRONMENT.md` |
| **`check-docs-counts-sync.mjs`**    | NUOVO: verifica che i conteggi (esecutori, strategie, OAuth, skill A2A) corrispondano alla documentazione |
| **`check-deprecated-versions.mjs`** | NUOVO: segnala versioni/date obsolete nella documentazione                                                |
| `check-supported-node-runtime.ts`   | Verifica che la versione corrente di Node sia supportata                                                  |
| `check-pr-test-policy.mjs`          | Applica la regola "test obbligatori" alle modifiche del codice di produzione                              |
| **`gen-provider-reference.ts`**     | NUOVO: genera automaticamente `docs/reference/PROVIDER_REFERENCE.md` dal catalogo                         |
| `i18n/generate-multilang.mjs`       | Traduce le stringhe dell'interfaccia utente e la documentazione tramite Google Translate                  |
| `i18n_autotranslate.py`             | Pipeline di traduzione della documentazione basata su LLM                                                 |
| `validate_translation.py`           | Validazione della traduzione per ciascuna localizzazione                                                  |
| `check_translations.py`             | Verifica delle chiavi i18n lato codice                                                                    |
| `run-playwright-tests.mjs`          | Runner E2E Playwright                                                                                     |
| `run-protocol-clients-tests.mjs`    | Runner E2E MCP/A2A                                                                                        |
| `run-ecosystem-tests.mjs`           | Test dell'ecosistema (integrazione dei provider)                                                          |
| `test-report-summary.mjs`           | Genera il riepilogo della copertura in Markdown                                                           |
| `smoke-electron-packaged.mjs`       | Smoke test della build Electron pacchettizzata                                                            |
| `native-binary-compat.mjs`          | Verifica che le dipendenze native (`better-sqlite3`) siano compatibili con Node di Electron               |
| `validate-pack-artifact.ts`         | Verifica l'output di npm pack                                                                             |
| `responses-ws-proxy.mjs`            | Bridge WebSocket per l'API Responses di Codex                                                             |
| `v1-ws-bridge.mjs`                  | Bridge WebSocket per l'endpoint `/api/v1/ws`                                                              |
| `standalone-server-ws.mjs`          | Runner del server WS standalone                                                                           |
| `system-info.mjs`                   | Stampa le informazioni di sistema/runtime per l'assistenza                                                |
| `healthcheck.mjs`                   | Controllo di integrità singolo (utilizzato da Docker HEALTHCHECK)                                         |
| `uninstall.mjs`                     | Script di disinstallazione completa                                                                       |
| `dev/sync-ui-kit.sh`                | Copia `src/` del CI UI Kit da un commit fissato in `packages/ui-kit/src`                                  |
| `check/check-ui-kit-snapshot.mjs`   | Controllo pre-commit: `packages/ui-kit/src` corrisponde al commit upstream fissato                        |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — nomi delle icone in uso non mappati da `ICON_MAP`                                |
| `dev/codemod-material-icons.mjs`    | Riscrive gli span letterali di Material Symbols come `<Icon>` (strumenti di migrazione)                   |

---

## `docs/` — Documentazione pubblica (7 file root + 17 sottodir)

### Guide di altissimo livello

| Dott                        | Scopo                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Architettura di alto livello, mappa dei sottosistemi, superficie del dashboard                   |
| `CODEBASE_DOCUMENTATION.md` | Riferimenti ingegneristici: directory, moduli, convenzioni                                       |
| `FEATURES.md`               | Matrice delle funzionalità con punti salienti della versione 3.8                                 |
| `USER_GUIDE.md`             | Manuale per l'utente finale (configurazione, modelli, combo, CLIs, audio, ecc.)                  |
| `API_REFERENCE.md`          | Riferimento all'endpoint API con modello di autenticazione                                       |
| `openapi.yaml`              | specifiche OpenAPI 3.0 (121 percorsi)                                                            |
| `SETUP_GUIDE.md`            | Metodi di installazione (npm, npx, Docker, Electron, Termux, sorgente)                           |
| `ENVIRONMENT.md`            | Tutte le vars env (~ 800 documentate, ~ 3.050 righe `.env.example`)                              |
| `TROUBLESHOOTING.md`        | Errori comuni + v3.8.0 problemi noti                                                             |
| `RELEASE_CHECKLIST.md`      | Flusso di rilascio completo (competenze, husky, commit convenzionali, distribuzione)             |
| `COVERAGE_PLAN.md`          | Obiettivi di copertura e stato attuale                                                           |
| `FREE_TIERS.md`             | Fornitori selezionati di livello gratuito (48 + + gratuiti 11 OAuth)                             |
| `CLI-TOOLS.md`              | Integrazioni CLI esterne + OmniRoute interne CLI                                                 |
| `I18N.md`                   | Architettura i18n, aggiunta di una lingua, 67 localizzazioni                                     |
| `UNINSTALL.md`              | Passaggi di disinstallazione puliti                                                              |
| `PROVIDER_REFERENCE.md`     | **Generato automaticamente** catalogo di 377 fornitori (regen: `npm run gen:provider-reference`) |

### Approfondimenti sul sottosistema

| Dott                                        | Scopo                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | server MCP : 110 strumenti, 3 trasporti, 33 ambiti, endpoint REST                                                   |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 competenze, aiutanti REST, scheda agente                                                      |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Guida unificata: A2A vs ACP vs Cloud Agents                                                                         |
| `CLOUD_AGENT.md`                            | orchestrazione Codex Cloud / Devin / Jules                                                                          |
| `SKILLS.md`                                 | Quadro delle competenze (sandbox + + SkillsSH + integrato)                                                          |
| `RADAR.md`                                  | Sovrapposizione del catalogo del modello radar gratuito (`RADAR_ENABLED`, disattivato per impostazione predefinita) |
| `MEMORY.md`                                 | Sistema di memoria (SQLite FTS5 + Qdrant)                                                                           |
| `EVALS.md`                                  | Quadro di valutazione (suite, corse, rubriche)                                                                      |
| `GUARDRAILS.md`                             | mascheratore PII, iniezione rapida, ponte visivo                                                                    |
| `COMPLIANCE.md`                             | Registro di controllo, conservazione, disattivazione noLog                                                          |
| `WEBHOOKS.md`                               | Consegna del webhook firmato HMAC                                                                                   |
| `REASONING_REPLAY.md`                       | Cache memory/SQLite ibrida per `reasoning_content`                                                                  |
| `AUTHZ_GUIDE.md`                            | Pipeline di autorizzazione (`classify` → `policies` → `enforce`)                                                    |
| `RESILIENCE_GUIDE.md`                       | Interruttore automatico + raffreddamento modello + blocco                                                           |
| `docs/security/STEALTH_GUIDE.md` (solo git) | TLS impronta digitale (JA3/JA4), codice Claude CCH, MITM cert                                                       |
| `AUTO-COMBO.md`                             | Motore Auto Combo (punteggio a 16 fattori, 6 pacchetti modalità, fabbrica virtuale)                                 |

### Compressione

| Dott                            | Scopo                                               |
| ------------------------------- | --------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Panoramica delle modalità di compressione + roadmap |
| `COMPRESSION_ENGINES.md`        | Motori Caveman + RTK, contratto di registro         |
| `COMPRESSION_RULES_FORMAT.md`   | Schema JSON del pacchetto di regole Caveman         |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventario dei pacchetti di regole per lingua       |
| `RTK_COMPRESSION.md`            | pipeline dichiarativa RTK (56 filtri)               |

### Distribuzione

| Dott                         | Scopo                                                            |
| ---------------------------- | ---------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker build, profili (base/cli/host/cliproxyapi), Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Distribuzione VM/VPS generica (Ubuntu/Debian + nginx + systemd)  |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Distribuzione di Fly.io (attualmente solo cinese)                |
| `TERMUX_GUIDE.md`            | Android senza testa tramite Termux                               |
| `PWA_GUIDE.md`               | L'app Web progressiva installa il lavoratore del servizio +      |
| `ELECTRON_GUIDE.md`          | App desktop build + sign + distribuisci                          |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Imbuto                           |
| `PROXY_GUIDE.md`             | Proxy in uscita a 4 livelli + 1proxy marketplace                 |

### Sottodirectory

| Sottodir              | Scopo                                                                                                                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Traduzioni di documenti localizzati (41 lingue)                                                                                                                                                                   |
| `docs/screenshots/`   | Risorse di immagini per le guide                                                                                                                                                                                  |
| `_tasks/superpowers/` | Plans/specs da superpoteri (`writing-plans`/`brainstorming`) ricerca + : repository isolato, con versioni separate, gitignorato dall'albero principale. Vedi CLAUDE.md → "Artefatti di pianificazione e ricerca". |

---

## `tests/` — Suite di test

| Sottodirectory                       | Tipo                                              | Runner                                        |
| ------------------------------------ | ------------------------------------------------- | --------------------------------------------- |
| `tests/unit/`                        | Test unitari (~4.800 file, i più veloci)          | Runner di test nativo di Node                 |
| `tests/integration/`                 | Test di integrazione multi-modulo + DB            | Runner di test nativo di Node (concorrenza 1) |
| `tests/e2e/`                         | E2E dell'interfaccia utente + flusso di lavoro    | Playwright                                    |
| `tests/e2e/protocol-clients.test.ts` | E2E MCP + A2A con client reali                    | Client di protocollo personalizzati           |
| `tests/e2e/ecosystem.test.ts`        | Integrazione dei provider (con accesso alla rete) | Runner di test nativo di Node                 |

---

## `public/` — Risorse statiche

| Percorso            | Scopo                                                                       |
| ------------------- | --------------------------------------------------------------------------- |
| `public/` (radice)  | Favicon, robots.txt, manifest, service worker, immagini di marketing        |
| `public/providers/` | Logo dei provider in formato PNG/SVG (utilizzati nel pannello di controllo) |

---

## `config/` — Configurazioni statiche + stato dei controlli di qualità

Modelli di configurazione distribuiti insieme alle baseline dei controlli di qualità incluse nel repository
(spostati qui dalla radice del repository nella v3.8.26 per mantenerla essenziale).

| Percorso                                      | Scopo                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Elenco delle localizzazioni + metadati (fonte canonica per il conteggio delle 42 localizzazioni) |
| `config/i18n-schema.json`                     | Schema JSON che convalida `i18n.json`                                                            |
| `config/payloadRules.json`                    | Regole di sanitizzazione dei payload upstream                                                    |
| `config/quality/quality-baseline.json`        | Baseline multi-metrica con soglie incrementali (`scripts/quality/check-quality-ratchet.mjs`)     |
| `config/quality/complexity-baseline.json`     | Baseline bloccata della complessità ESLint (`check-complexity.mjs`)                              |
| `config/quality/duplication-baseline.json`    | Baseline bloccata della duplicazione jscpd (`check-duplication.mjs`)                             |
| `config/quality/file-size-baseline.json`      | Baseline bloccata delle dimensioni per file (`check-file-size.mjs`)                              |
| `config/quality/test-discovery-baseline.json` | Baseline bloccata dei test orfani (`check-test-discovery.mjs`)                                   |
| `config/quality/dependency-allowlist.json`    | Elenco consentito delle dipendenze approvate (`check-deps.mjs`)                                  |
| `config/quality/.license-allowlist.json`      | Elenco consentito delle licenze SPDX (`check-licenses.mjs`)                                      |
| `config/quality/quality-metrics.json`         | Metriche temporanee raccolte (generate da `collect-metrics.mjs`; **ignorate da Git**)            |

---

## `.github/` — Integrazione con GitHub

| Percorso                           | Scopo                                                              |
| ---------------------------------- | ------------------------------------------------------------------ |
| `.github/workflows/`               | Workflow CI/CD di GitHub Actions (lint, test, copertura, rilascio) |
| `.github/ISSUE_TEMPLATE/`          | Modelli per segnalazioni di bug e richieste di funzionalità        |
| `.github/pull_request_template.md` | Modello per le PR                                                  |
| `.github/dependabot.yml`           | Configurazione degli aggiornamenti delle dipendenze                |

---

## `.husky/` — Hook Git

| File         | Scopo                                                                            |
| ------------ | -------------------------------------------------------------------------------- |
| `pre-commit` | Esegue `lint-staged + check-docs-sync + check:any-budget:t11`                    |
| `pre-push`   | Attualmente disabilitato (commentato). Eseguire `npm run test:unit` manualmente. |
| `_/`         | Componenti interni di Husky                                                      |

---

## `.claude/` — Comandi slash di Claude Code

| File                                                | Scopo                                                                 |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incremento della versione + changelog automatico |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — workflow di rilascio completo                |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Distribuzione su VPS                                                  |
| `commands/capture-release-evidences-cc.md`          | Registra nel browser le nuove funzionalità in formato WebP            |
| `commands/review-{prs,discussions}-cc.md`           | Valutazione iniziale di PR/discussioni su GitHub                      |
| `commands/{review-issues,implement-features}-cc.md` | Workflow per le issue                                                 |
| `settings.local.json`                               | Impostazioni di Claude Code specifiche per il progetto                |

---

## `.agents/` — Workflow generici per agenti (Codex / Cursor / ecc.)

| Percorso                 | Scopo                                                        |
| ------------------------ | ------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 definizioni di workflow (copia di `.claude/commands/`)    |
| `skills/<name>/SKILL.md` | 9 definizioni di competenze con note di esecuzione per Codex |

> **Nota:** I workflow e i comandi sono attualmente identici byte per byte. Se `.agents/` è destinata a un runtime per agenti diverso (Codex), le varianti devono differenziarsi in modo significativo.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Esterni all'albero

Queste directory con prefisso underscore contengono elementi non inclusi nella distribuzione:

- **`_ideia/`** — note di progettazione (categorie defer / notfit / viable)
- **`_mono_repo/`** — sottoprogetti storici (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — cloni in sola lettura di progetti OSS correlati (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, ecc.), utilizzati come riferimento incrociato durante lo sviluppo
- **`_tasks/`** — file informali di monitoraggio delle attività per ciascun rilascio

Non incluse nell'output di `npm pack`. Consultare `.npmignore`.

---

## Generati / ignorati da Git

| Percorso               | Scopo                               |
| ---------------------- | ----------------------------------- |
| `node_modules/`        | Dipendenze npm                      |
| `.next/`               | Output della build di Next.js       |
| `coverage/`            | Report di copertura c8              |
| `logs/`                | Log di runtime                      |
| `package/`             | Area di staging per npm pack        |
| `.playwright-mcp/`     | Artefatti di test di Playwright MCP |
| `.issues/`             | Cache locale delle issue            |
| `tsconfig.tsbuildinfo` | Cache incrementale di TS            |

---

## Suggerimenti per la navigazione

- **Nuovo collaboratore?** Leggi `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Vuoi aggiungere un provider?** Segui `docs/architecture/ARCHITECTURE.md § Adding a New Provider` e verifica con `docs/reference/PROVIDER_REFERENCE.md`.
- **Vuoi aggiungere una route?** Consulta `docs/architecture/ARCHITECTURE.md § Adding a New API Route` e `src/shared/validation/schemas.ts`.
- **Vuoi aggiungere uno strumento MCP?** Consulta `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Vuoi aggiungere una skill A2A?** Consulta `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Vuoi eseguire il progetto localmente?** Consulta `docs/guides/SETUP_GUIDE.md`.
- **Vuoi eseguire il deployment?** Consulta `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Vuoi pubblicare una release?** Consulta `docs/ops/RELEASE_CHECKLIST.md` (e la skill Claude Code `/generate-release-cc`).
