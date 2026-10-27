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

## `src/` — Applicazione Next.js

```
src/
├── app/                 # App Router (pagine + route API + pagine di stato + landing page)
├── lib/                 # Librerie principali / moduli di dominio (80 sottodirectory + circa 70 file di primo livello)
├── domain/              # Logica di dominio pura (motore delle policy, fallback, costi, blocco, comboResolver, valutazione)
├── server/              # Moduli esclusivamente server (pipeline di autorizzazione, CORS, middleware di autenticazione) — non importabili dal client
├── shared/              # Condiviso tra server e client ove sicuro (costanti, tipi, validazione, contratti, utilità)
├── i18n/                # Configurazione di next-intl + messaggi JSON per ogni impostazione locale (67 impostazioni locali)
├── middleware/          # Middleware Next.js (arricchimento delle richieste, rilevamento dell'impostazione locale)
├── mitm/                # Nucleo del proxy MITM: generazione/installazione dei certificati, gestori, destinazioni, inspector, maschere, passthrough
│   ├── handlers/        # 9 classi di gestori per agenti IDE che estendono MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Livello di acquisizione del traffico: buffer (anello in memoria), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Codice di raccordo per gli adattatori dei modelli (shim legacy)
├── scripts/             # Script di manutenzione interni all'albero (ad es., backfillAggregation)
├── sse/                 # Gestori/servizi SSE legacy (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Archivio in memoria legacy (in fase di dismissione a favore di src/lib/db)
├── types/               # File di tipi TS condivisi
├── instrumentation.ts   # Hook di telemetria Next.js (browser + edge)
├── instrumentation-node.ts  # Strumentazione esclusivamente Node
└── proxy.ts             # Shim del punto di ingresso del proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Percorso                                                                     | Scopo                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API pubblica compatibile con OpenAI (~25 sottoroute: chat, completamenti, embedding, file, batch, audio, immagini, video, musica, reranking, moderazione, ricerca, ws, agenti, account, provider, ecc.)                                                                                                                      |
| `app/api/v1beta/`                                                            | Endpoint API in stile Gemini                                                                                                                                                                                                                                                                                                 |
| `app/api/playground/`                                                        | Route di Playground Studio: `improve-prompt/` (POST — riscrittura dei prompt tramite LLM), `presets/` (elenco GET / creazione POST), `presets/[id]/` (GET / PUT / DELETE) — vedere `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                    |
| `app/api/` (non-v1)                                                          | Route di gestione/amministrazione (~60 directory: provider, combinazioni, impostazioni, mcp, a2a, valutazioni, memoria, competenze, webhook, conformità, resilienza, monitoraggio, tunnel, strumenti CLI, ecc.)                                                                                                              |
| `app/api/tools/agent-bridge/`                                                | API REST AgentBridge — 12 route (controllo del server, stato/DNS/mappature degli agenti, bypass, certificati, CA upstream). LOCAL_ONLY + SPAWN_CAPABLE. Vedere `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                          |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS di Traffic Inspector — oltre 16 route (richieste, sessioni, host, modalità di acquisizione, esportazione, ws). LOCAL_ONLY + SPAWN_CAPABLE. Vedere `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                   |
| `app/a2a/`                                                                   | Punto di ingresso A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                             |
| `app/.well-known/agent.json/`                                                | Scheda agente A2A (individuazione)                                                                                                                                                                                                                                                                                           |
| `app/(dashboard)/dashboard/`                                                 | Pagine dell'interfaccia della dashboard (oltre 50 sezioni, ~118 file page.tsx: provider, combinazioni, impostazioni, memoria, competenze, webhook, valutazioni, audit, batch, cache, costi, integrità, sistema, attività, ecc.)                                                                                              |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interfaccia di Search Tools Studio (3 schede: Ricerca/Estrazione/Confronto + SearchConceptCard + ProviderCatalog) — vedere `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                          |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (piano 21): `page.tsx` (struttura a 3 schede), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Pagina della dashboard di AgentBridge — scheda del server, 9 schede degli agenti, procedura guidata di configurazione, mappatura dei modelli, elenco di bypass. i18n PT-BR + EN. Vedere `docs/frameworks/AGENTBRIDGE.md`.                                                                                                    |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Pagina della dashboard di Traffic Inspector — visualizzazione divisa in stile DevTools, 7 schede di dettaglio, 4 selettori della modalità di acquisizione, registratore di sessione, colorazione del contesto. i18n PT-BR + EN. Vedere `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                               |
| `app/(dashboard)/dashboard/activity/`                                        | Pagina del feed attività (Gruppo B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — vedere `docs/architecture/MONITORING_SECTIONS.md`                                                                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Pagina di condivisione delle quote (Gruppo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                   |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Pagina di configurazione dei piani del provider (Gruppo B): `page.tsx` + `ProviderPlanConfigClient.tsx` — sostituzione delle dimensioni delle quote per connessione                                                                                                                                                          |
| `app/docs/`                                                                  | Visualizzatore della documentazione integrato (esegue il rendering di `docs/*.md`)                                                                                                                                                                                                                                           |
| `app/landing/`                                                               | Pagina di destinazione per il marketing                                                                                                                                                                                                                                                                                      |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Pagine relative all'autenticazione                                                                                                                                                                                                                                                                                           |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Pagine di errore HTTP                                                                                                                                                                                                                                                                                                        |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Pagine statiche/di stato                                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Layout radice, home page, manifesto PWA, CSS globale                                                                                                                                                                                                                                                                         |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limiti di gestione degli errori                                                                                                                                                                                                                                                                                              |

### `src/lib/` — Librerie principali (~50 moduli)

| Modulo                                   | Scopo                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Gestore delle attività del protocollo A2A, competenze (5), streaming                                                                                                                                                                                                                                                                      |
| `acp/`                                   | Registro degli agenti CLI (rilevamento delle CLI locali — vedere `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                              |
| `api/`                                   | Funzioni ausiliarie condivise per le API (`requireManagementAuth`, convalida)                                                                                                                                                                                                                                                             |
| `auth/`                                  | Sessione, hashing delle password, convalida dei token                                                                                                                                                                                                                                                                                     |
| `batches/`                               | Gestori dell'API Batches di OpenAI                                                                                                                                                                                                                                                                                                        |
| `catalog/`                               | Convalida Zod del catalogo dei provider + risoluzione delle funzionalità                                                                                                                                                                                                                                                                  |
| `cloudAgent/`                            | Agenti cloud (Codex Cloud, Devin, Jules) — vedere `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                        |
| `combos/`                                | Risoluzione delle combinazioni + funzioni ausiliarie per il riordinamento                                                                                                                                                                                                                                                                 |
| `audit/`                                 | Funzioni ausiliarie per il feed delle attività: `highLevelActions.ts` (elenco consentito + `isHighLevelAction()`), `activityIcons.ts` (mappa azione → icona/verbo), `timeline.ts` (groupByDay/relativeTime) — vedere `docs/architecture/MONITORING_SECTIONS.md`                                                                           |
| `compliance/`                            | Registro di audit + audit dei provider — vedere `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                             |
| `compression/`                           | Codice di collegamento del motore di compressione (i motori si trovano in `open-sse/services/compression/`)                                                                                                                                                                                                                               |
| `config/`                                | Funzioni ausiliarie per la configurazione in fase di esecuzione                                                                                                                                                                                                                                                                           |
| `db/`                                    | Oltre 120 moduli DB di dominio + 168 migrazioni (per SQLite, passare sempre da qui)                                                                                                                                                                                                                                                       |
| `quota/`                                 | Motore di condivisione delle quote: `dimensions.ts` (tipi/Zod), `types.ts` (interfaccia QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — vedere `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Client del catalogo dei modelli gratuiti Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — consulta `docs/frameworks/RADAR.md`                                                                                                                                          |
| `display/`                               | Funzioni di supporto per la formattazione dell'interfaccia utente (costo, latenza, ecc.)                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Funzioni di supporto per il servizio di embedding                                                                                                                                                                                                                                                                                         |
| `env/`                                   | Analisi e convalida delle variabili di ambiente                                                                                                                                                                                                                                                                                           |
| `evals/`                                 | Framework di valutazione (suite, runner, runtime) — consulta `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                   |
| `guardrails/`                            | Mascheramento dei dati personali, protezione dalla prompt injection, bridge per la visione — consulta `docs/security/GUARDRAILS.md`                                                                                                                                                                                                       |
| `jobs/`                                  | Processi in background (simili a cron)                                                                                                                                                                                                                                                                                                    |
| `memory/`                                | Memoria conversazionale (RRF ibrido con SQLite FTS5 + sqlite-vec + Qdrant di livello 2) — consulta `docs/frameworks/MEMORY.md`                                                                                                                                                                                                            |
| `memory/embedding/`                      | Livello di embedding multi-sorgente: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (piano 21)                                                                                                                                                                                     |
| `memory/vectorStore.ts`                  | Wrapper di sqlite-vec v0.1.9 — KNN a forza bruta + RRF ibrido (FTS5 + vettore, k=60). Inizializzazione differita, con degradazione controllata quando sqlite-vec non è disponibile. (piano 21)                                                                                                                                            |
| `memory/reindex.ts`                      | `runReindexBatch()` — elabora in background le memorie con `needs_reindex=1`; richiamato da `POST /api/memory/reindex` e dal percorso di backfill differito. (piano 21)                                                                                                                                                                   |
| `monitoring/`                            | Controlli di integrità, emissione di metriche                                                                                                                                                                                                                                                                                             |
| `oauth/`                                 | Flussi OAuth/di importazione per 22 moduli provider (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                           |
| `plugins/`                               | Registro dei plugin                                                                                                                                                                                                                                                                                                                       |
| `promptCache/`                           | Punti di interruzione della cache dei prompt in stile Anthropic                                                                                                                                                                                                                                                                           |
| `skills/`                                | Framework delle skill (integrate + marketplace + SkillsSH) — consulta `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                         |
| `playground/`                            | Helper condivisi di Playground Studio: `codeExport.ts` (generatore curl/Python/TS), `promptImprover.ts` (generatore di meta-prompt), `streamMetrics.ts` (TTFT/TPS puri), `types.ts` (tabella dei prezzi) — vedere `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                  |
| `webhookDispatcher.ts`                   | Consegna di webhook HMAC — vedere `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                           |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Gestori di tunnel — vedere `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                    |
| `cloudSync.ts`, `initCloudSync.ts`       | Sincronizzazione cloud opzionale dello stato                                                                                                                                                                                                                                                                                              |
| `localDb.ts`                             | Barrel di riesportazione per i moduli del database (nessuna logica — solo riesportazioni)                                                                                                                                                                                                                                                 |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Caching delle richieste + idempotenza                                                                                                                                                                                                                                                                                                     |
| (~30 altri file di primo livello)        | Helper specializzati (logEnv, modelsDevSync, piiSanitizer, ecc.)                                                                                                                                                                                                                                                                          |

### `src/lib/db/` — Database (147 moduli + 208 migrazioni)

| Sottodirectory            | Scopo                                                                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` con journaling WAL                                                                                                                               |
| `db/migrations/`          | File SQL versionati (idempotenti, transazionali). `073_memory_vec.sql` aggiunge `memory_vec_meta` + la colonna `needs_reindex` (piano 21).                                   |
| `db/playgroundPresets.ts` | Modulo CRUD per i preset di Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD per `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, ecc. (piano 21)                 |
| `db/<domain>.ts`          | Un modulo per dominio: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, ecc.   |

### `src/domain/`

| Modulo                 | Scopo                                                       |
| ---------------------- | ----------------------------------------------------------- |
| `policy.ts`            | Motore delle policy                                         |
| `fallbackPolicy.ts`    | Albero decisionale di fallback                              |
| `costRules.ts`         | Regole di calcolo dei costi                                 |
| `lockoutPolicy.ts`     | Policy di blocco del modello/della connessione              |
| `tagRouter.ts`         | Instradamento basato sui tag                                |
| `comboResolver.ts`     | Risoluzione delle combo (utilizzata dal motore delle combo) |
| `modelAvailability.ts` | Verifica della disponibilità per modello                    |
| `assessment/`          | Valutazione del modello (Fase 1 di RFC-AUTO-ASSESSMENT )    |

### `src/server/`

| Modulo   | Scopo                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline di autorizzazione: `classify` → `policies` → `enforce` — vedere `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configurazione CORS                                                                                         |
| `auth/`  | Middleware di sessione                                                                                      |

### `src/shared/`

| Modulo                           | Scopo                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `components/`                    | API dei componenti della dashboard: adattatori per `packages/ui-kit` — vedere `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: nomi delle icone utilizzate dalle schermate → componenti Lucide (`<Icon>`)                             |
| `constants/providers.ts`         | **376 provider** con validazione Zod (fonte autorevole)                                                            |
| `constants/cliTools.ts`          | Registro degli strumenti CLI esterni                                                                               |
| `constants/routingStrategies.ts` | **20 strategie di instradamento** con priorità                                                                     |
| `constants/publicApiRoutes.ts`   | Route che richiedono l'autenticazione Bearer (anziché quella di gestione)                                          |
| `constants/upstreamHeaders.ts`   | Elenco di esclusione degli header per le richieste upstream                                                        |
| `validation/schemas.ts`          | ~80 schemi Zod (unica fonte autorevole per i contratti API)                                                        |
| `validation/helpers.ts`          | Funzioni di supporto per la validazione Zod (`validateBody`, ecc.)                                                 |
| `types/`                         | Tipi TS condivisi                                                                                                  |
| `contracts/`                     | Contratti dell'API pubblica (utilizzati da `files:` in `package.json`)                                             |
| `utils/circuitBreaker.ts`        | Circuit breaker dei provider (vedere `docs/architecture/RESILIENCE_GUIDE.md`)                                      |
| `utils/apiAuth.ts`               | Validazione delle chiavi API e verifica degli ambiti                                                               |
| `utils/fetchTimeout.ts`          | Wrapper per timeout/interruzione delle richieste fetch upstream                                                    |
| `utils/releaseNotes.ts`          | Parser degli annunci chiusi v2/legacy, localizzazione e rimozione tramite ID                                       |

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

## `docs/` — Documentazione pubblica (7 file radice + 17 sottodirectory)

### Guide di primo livello

| Doc                         | Scopo                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architettura di alto livello, mappa dei sottosistemi, superficie della dashboard                        |
| `CODEBASE_DOCUMENTATION.md` | Riferimento tecnico: directory, moduli, convenzioni                                                     |
| `FEATURES.md`               | Matrice delle funzionalità con i punti salienti della v3.8                                              |
| `USER_GUIDE.md`             | Manuale utente (configurazione, modelli, combo, CLI, audio, ecc.)                                       |
| `API_REFERENCE.md`          | Riferimento degli endpoint API con modello di autenticazione                                            |
| `openapi.yaml`              | Specifica OpenAPI 3.0 (121 percorsi)                                                                    |
| `SETUP_GUIDE.md`            | Metodi di installazione (npm, npx, Docker, Electron, Termux, sorgente)                                  |
| `ENVIRONMENT.md`            | Tutte le variabili d'ambiente (~800 documentate, ~3.050 righe in `.env.example`)                        |
| `TROUBLESHOOTING.md`        | Errori comuni + problemi noti della v3.8.0                                                              |
| `RELEASE_CHECKLIST.md`      | Flusso di rilascio completo (skill, husky, conventional commit, deploy)                                 |
| `COVERAGE_PLAN.md`          | Obiettivi di copertura e stato attuale                                                                  |
| `FREE_TIERS.md`             | Provider con piano gratuito selezionati (48+ gratuiti + 11 OAuth)                                       |
| `CLI-TOOLS.md`              | Integrazioni CLI esterne + CLI interna di OmniRoute                                                     |
| `I18N.md`                   | Architettura i18n, aggiunta di una lingua, 67 localizzazioni                                            |
| `UNINSTALL.md`              | Passaggi per una disinstallazione pulita                                                                |
| `PROVIDER_REFERENCE.md`     | Catalogo **generato automaticamente** di 376 provider (rigenerazione: `npm run gen:provider-reference`) |

### Approfondimenti sui sottosistemi

| Doc                                         | Scopo                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | Server MCP: 110 strumenti, 3 trasporti, 33 ambiti, endpoint REST                                            |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 skill, helper REST, agent card                                                        |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Guida unificata: A2A vs ACP vs Cloud Agents                                                                 |
| `CLOUD_AGENT.md`                            | Orchestrazione di Codex Cloud / Devin / Jules                                                               |
| `SKILLS.md`                                 | Framework delle skill (integrate + marketplace + SkillsSH + sandbox)                                        |
| `RADAR.md`                                  | Overlay del catalogo dei modelli gratuiti Radar (`RADAR_ENABLED`, disattivato per impostazione predefinita) |
| `MEMORY.md`                                 | Sistema di memoria (SQLite FTS5 + Qdrant)                                                                   |
| `EVALS.md`                                  | Framework di valutazione (suite, esecuzioni, rubriche)                                                      |
| `GUARDRAILS.md`                             | Mascheramento PII, prompt injection, bridge per la visione                                                  |
| `COMPLIANCE.md`                             | Log di audit, conservazione, opt-out noLog                                                                  |
| `WEBHOOKS.md`                               | Consegna di webhook firmati HMAC                                                                            |
| `REASONING_REPLAY.md`                       | Cache ibrida memoria/SQLite per `reasoning_content`                                                         |
| `AUTHZ_GUIDE.md`                            | Pipeline di autorizzazione (`classify` → `policies` → `enforce`)                                            |
| `RESILIENCE_GUIDE.md`                       | Circuit breaker + cooldown + blocco dei modelli                                                             |
| `docs/security/STEALTH_GUIDE.md` (solo git) | TLS fingerprinting (JA3/JA4), Claude Code CCH, certificato MITM                                             |
| `AUTO-COMBO.md`                             | Motore Auto Combo (punteggio a 16 fattori, 6 pacchetti di modalità, factory virtuale)                       |

### Compressione

| Doc                             | Scopo                                               |
| ------------------------------- | --------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Panoramica delle modalità di compressione + roadmap |
| `COMPRESSION_ENGINES.md`        | Motori Caveman + RTK, contratto del registro        |
| `COMPRESSION_RULES_FORMAT.md`   | Schema JSON dei pacchetti di regole Caveman         |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventario dei pacchetti di regole per lingua       |
| `RTK_COMPRESSION.md`            | Pipeline dichiarativa RTK (56 filtri)               |

### Distribuzione

| Documento                    | Scopo                                                            |
| ---------------------------- | ---------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Build Docker, profili (base/cli/host/cliproxyapi), sidecar Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Deployment generico su VM/VPS (Ubuntu/Debian + nginx + systemd)  |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Deployment su Fly.io (attualmente solo in cinese)                |
| `TERMUX_GUIDE.md`            | Android headless tramite Termux                                  |
| `PWA_GUIDE.md`               | Installazione di Progressive Web App + service worker            |
| `ELECTRON_GUIDE.md`          | Build dell'app desktop + firma + distribuzione                   |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                           |
| `PROXY_GUIDE.md`             | Proxy in uscita a 4 livelli + marketplace 1proxy                 |

### Sottodirectory

| Sottodirectory        | Scopo                                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/i18n/`          | Traduzioni localizzate della documentazione (41 lingue)                                                                                                                                                                        |
| `docs/screenshots/`   | Risorse grafiche per le guide                                                                                                                                                                                                  |
| `_tasks/superpowers/` | Piani/specifiche da superpowers (`writing-plans`/`brainstorming`) + ricerca — repository isolato, con versionamento separato, inserito nel gitignore dell'albero principale. Vedi CLAUDE.md → "Planning & Research Artifacts". |

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
