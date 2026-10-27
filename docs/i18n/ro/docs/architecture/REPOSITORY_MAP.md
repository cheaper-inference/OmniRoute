# Repository Map (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descriere pe o singură linie pentru fiecare director și fișier din rădăcină.**
> Ultima actualizare: 2026-06-28 — OmniRoute v3.8.40
>
> Folosiți această hartă pentru a naviga rapid prin baza de cod. Pentru informații aprofundate, urmați linkurile către documentația dedicată.

## Arborele de nivel superior

```
OmniRoute/
├── src/                  # Aplicație Next.js 16 (interfață + rute API + biblioteci + domeniu + server)
├── open-sse/             # Spațiu de lucru pentru motorul de streaming (gestionare, execuție, traducere, server MCP)
├── packages/            # Spații de lucru npm: ui-kit (Keak CI UI Kit integrat) și browser-pool
├── electron/             # Aplicație desktop integratoare (Electron 41 + electron-builder 26.10)
├── bin/                  # Punct de intrare CLI și gestionare a comenzilor
├── scripts/              # Scripturi pentru compilare, verificare, sincronizare și operațiuni punctuale
├── docs/                 # Documentație publică (vă aflați aici)
├── tests/                # Toate suitele de teste (unitare, de integrare, e2e, clienți de protocol)
├── public/               # Resurse statice Next.js, manifest PWA, service worker, pictograme
├── config/               # Configurație statică + stare pentru pragurile de calitate (i18n, payloadRules, quality/)
├── images/               # Resurse grafice pentru marketing / README
├── @omniroute/           # Pachete complementare publicabile (opencode-plugin, opencode-provider)
├── skills/               # Pachete de capabilități CLI/agent (cli-* + omni-* + config-codex-cli)
├── examples/             # Pluginuri demonstrative + proiect inițial omniroute-cmd-hello
├── contrib/              # Contribuții din partea comunității (podman/)
├── .source/              # Configurație sursă Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Fluxuri de lucru GitHub Actions + șabloane pentru probleme + șablon PR
├── .husky/               # Hook-uri Git (pre-commit, pre-push)
├── .claude/              # Comenzi slash Claude Code (specifice proiectului)
├── .agents/              # Fluxuri de lucru + capabilități pentru Codex / agenți generici (copie a .claude/)
├── .vscode/              # Setări pentru spațiul de lucru VS Code
├── _ideia/               # Note de planificare (informale; nu sunt distribuite)
├── _mono_repo/           # Subproiecte istorice (cloud, site, vscode-extension)
├── _references/          # Clone de referință doar pentru citire ale proiectelor OSS conexe
├── _tasks/               # Fișiere de urmărire a sarcinilor pentru fiecare versiune (informale)
├── .build/ .worktrees/ dist/   # spațiu local temporar pentru compilare / arbori de lucru Git / rezultate de compilare (ignorat de Git)
├── .issues/              # Cache local pentru probleme (ignorat de Git)
├── .playwright-mcp/      # Artefacte ale testelor Playwright MCP
├── coverage/             # Rezultate privind acoperirea generate de c8 (ignorate de Git)
├── logs/                 # Jurnale de execuție (ignorate de Git)
├── node_modules/         # Dependențe (ignorate de Git)
├── package/              # Zonă intermediară pentru npm pack (artefact de compilare)
├── .next/                # Rezultate ale compilării Next.js (ignorate de Git)
└── (fișiere din rădăcină — vedeți mai jos)
```

---

## Fișiere din rădăcină

| Fișier                                      | Scop                                                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Pagină de prezentare pentru marketing + pornire rapidă + matrice de funcționalități (vezi și `llm.txt`)         |
| **CHANGELOG.md**                            | Jurnal de modificări pentru fiecare versiune (generat automat de abilitatea `/version-bump-cc`)                 |
| **LICENSE**                                 | Textul licenței MIT                                                                                             |
| **CLAUDE.md**                               | Reguli de proiect pentru agenții Claude Code (reguli stricte, convenții, scenarii)                              |
| **AGENTS.md**                               | La fel ca CLAUDE.md, dar pentru agenții AI non-Claude (Codex, Cursor etc.)                                      |
| **GEMINI.md**                               | Reguli concise pentru agenții bazați pe Gemini (subset al CLAUDE.md)                                            |
| **CONTRIBUTING.md**                         | Ghid pentru contribuitori: configurare, commituri convenționale, testare, fluxul PR                             |
| **SECURITY.md**                             | Politica de raportare a vulnerabilităților, versiunile acceptate, modelul de amenințări                         |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — așteptări privind comportamentul în comunitate                                           |
| **llm.txt**                                 | Pagină de prezentare în text simplu, optimizată pentru crawlere LLM (SEO pentru asistenți AI)                   |
| **package.json**                            | Manifest npm, scripturi, dependențe, motoare, prag de acoperire c8                                              |
| **package-lock.json**                       | Arbore de dependențe blocat                                                                                     |
| **tsconfig.json**                           | Configurația TypeScript rădăcină                                                                                |
| **tsconfig.typecheck-core.json**            | Configurația verificării tipurilor pentru nucleul `src/`                                                        |
| **tsconfig.typecheck-noimplicit-core.json** | Verificare strictă a tipurilor (`noImplicitAny`)                                                                |
| **tsconfig.tsbuildinfo**                    | Cache pentru compilarea incrementală TS (ignorat de git)                                                        |
| **next.config.mjs**                         | Configurația de compilare Next.js 16 (ieșire autonomă)                                                          |
| **next-env.d.ts**                           | Tipuri de mediu generate automat de Next.js                                                                     |
| **eslint.config.mjs**                       | Configurație ESLint de tip flat (reguli pentru fiecare zonă a proiectului)                                      |
| **prettier.config.mjs**                     | Reguli de formatare Prettier                                                                                    |
| **postcss.config.mjs**                      | Configurație PostCSS pentru fluxul Tailwind/CSS                                                                 |
| **playwright.config.ts**                    | Configurația testelor E2E Playwright                                                                            |
| **vitest.config.ts**                        | Configurație Vitest (suita implicită)                                                                           |
| **vitest.mcp.config.ts**                    | Configurație Vitest pentru serverul MCP / suitele autoCombo / cache                                             |
| **sonar-project.properties**                | Configurație SonarQube/SonarCloud (calitatea codului)                                                           |
| **Dockerfile**                              | Compilare Docker în mai multe etape (builder → runner-base → runner-cli)                                        |
| **docker-compose.yml**                      | Configurație compose pentru dezvoltare, cu 4 profiluri (base, cli, host, cliproxyapi) + serviciu auxiliar redis |
| **docker-compose.prod.yml**                 | Configurație compose pentru producție (portul 20130, redis, volume denumite)                                    |
| **.dockerignore**                           | Fișiere excluse din contextul Docker                                                                            |
| **fly.toml**                                | Configurație de implementare Fly.io (regiunea `sin`, portul 20128, volumul /data)                               |
| **.env.example**                            | Șablon de fișier de mediu (copiat automat în `.env` la prima instalare)                                         |
| **.gitignore**                              | Modele de ignorare Git                                                                                          |
| **.npmignore**                              | Lista de excluderi pentru publicarea npm                                                                        |
| **.npmrc**                                  | Configurație npm (registru, politica fișierului de blocare)                                                     |
| **.node-version**                           | Versiune Node fixată (utilizată de instrumentele compatibile cu nvm)                                            |
| **.nvmrc**                                  | Versiune Node fixată pentru nvm                                                                                 |
| **eslint.complexity.config.mjs**            | Configurație ESLint pentru pragul de complexitate (`scripts/check/check-complexity.mjs --config`)               |
| **eslint.sonarjs.config.mjs**               | Configurație ESLint pentru regulile SonarJS (complexitate cognitivă / duplicare)                                |
| **source.config.ts**                        | Configurație sursă Fumadocs `defineDocs` (alimentează `.source/`)                                               |
| **knip.json**                               | Configurație Knip — fișiere/exporturi/dependențe neutilizate (alimentează pragul pentru cod neutilizat)         |
| **stryker.conf.json**                       | Configurație Stryker pentru testarea prin mutații                                                               |
| **.size-limit.json**                        | Configurația bugetului pentru dimensiunea bundle-ului                                                           |
| **promptfooconfig.yaml**                    | Configurația evaluărilor promptfoo                                                                              |
| **.gitleaks.toml**                          | Setul de reguli gitleaks pentru scanarea secretelor                                                             |
| **.zizmor.yml**                             | Configurația zizmor pentru analiza de securitate a GitHub Actions                                               |
| **socket.yml**                              | Configurația Socket.dev pentru lanțul de aprovizionare                                                          |
| **news.json**                               | Fluxul localizat de anunțuri v2; elementul de lansare Radar este livrat inactiv                                 |
| **flake.nix** / **flake.lock**              | Definiția shellului de dezvoltare Nix + fișierul de blocare                                                     |
| **.env**                                    | Secrete locale (ignorate de git — generate din `.env.example`)                                                  |

> **Mutate din rădăcină în v3.8.26 (pentru simplificare):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` și fișierul generat `quality-metrics.json` (ignorat de git). Consultați [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — aplicația Next.js

```
src/
├── app/                 # App Router (pagini + rute API + pagini de stare + pagină de destinație)
├── lib/                 # Biblioteci de bază / module de domeniu (80 de subdirectoare + ~70 de fișiere la nivel superior)
├── domain/              # Logică pură de domeniu (motor de politici, fallback, cost, blocare, comboResolver, evaluare)
├── server/              # Module exclusiv pentru server (flux de autorizare, cors, middleware de autentificare) — nu pot fi importate din client
├── shared/              # Partajate între server și client acolo unde este sigur (constante, tipuri, validare, contracte, utilitare)
├── i18n/                # Configurație next-intl + mesaje JSON pentru fiecare localizare (67 de localizări)
├── middleware/          # Middleware Next.js (îmbogățirea cererilor, detectarea localizării)
├── mitm/                # Nucleul proxy-ului MITM: generare/instalare certificate, gestionari, ținte, inspector, măști, transmitere directă
│   ├── handlers/        # 9 clase de gestionare pentru agenți IDE care extind MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Strat de capturare a traficului: buffer (inel în memorie), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Cod de integrare pentru adaptoarele de modele (shim vechi)
├── scripts/             # Scripturi de mentenanță incluse în arbore (de exemplu, backfillAggregation)
├── sse/                 # Gestionari/servicii SSE vechi (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Stocare veche în memorie (în curs de eliminare în favoarea src/lib/db)
├── types/               # Fișiere de tipuri TS partajate
├── instrumentation.ts   # Hook de telemetrie Next.js (browser + edge)
├── instrumentation-node.ts  # Instrumentare exclusiv pentru Node
└── proxy.ts             # Shim de intrare pentru proxy-ul HTTP
```

### `src/app/` — App Router (Next.js 16)

| Cale                                                                         | Scop                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API public compatibil cu OpenAI (~25 de subrute: chat, completări, înglobări, fișiere, loturi, audio, imagini, videoclipuri, muzică, rerank, moderare, căutare, ws, agenți, conturi, furnizori etc.)                                                                                                                         |
| `app/api/v1beta/`                                                            | Endpointuri API în stil Gemini                                                                                                                                                                                                                                                                                               |
| `app/api/playground/`                                                        | Rute Playground Studio: `improve-prompt/` (POST — rescriere a prompturilor cu LLM), `presets/` (GET pentru listare / POST pentru creare), `presets/[id]/` (GET / PUT / DELETE) — consultați `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                           |
| `app/api/` (non-v1)                                                          | Rute de administrare/management (~60 de directoare: furnizori, combinații, setări, mcp, a2a, evaluări, memorie, abilități, webhookuri, conformitate, reziliență, monitorizare, tuneluri, instrumente CLI etc.)                                                                                                               |
| `app/api/tools/agent-bridge/`                                                | API REST AgentBridge — 12 rute (controlul serverului, starea/DNS-ul/mapările agenților, ocolire, certificat, CA upstream). LOCAL_ONLY + SPAWN_CAPABLE. Consultați `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                       |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS Traffic Inspector — peste 16 rute (cereri, sesiuni, gazde, moduri de captură, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Consultați `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                   |
| `app/a2a/`                                                                   | Punct de intrare A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                              |
| `app/.well-known/agent.json/`                                                | Card de agent A2A (descoperire)                                                                                                                                                                                                                                                                                              |
| `app/(dashboard)/dashboard/`                                                 | Pagini UI pentru panoul de control (peste 50 de secțiuni, ~118 fișiere page.tsx: furnizori, combinații, setări, memorie, abilități, webhookuri, evaluări, audit, loturi, cache, costuri, stare de funcționare, sistem, activitate etc.)                                                                                      |
| `app/(dashboard)/dashboard/search-tools/`                                    | UI Search Tools Studio (3 file: Căutare/Extragere/Comparare + SearchConceptCard + ProviderCatalog) — consultați `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                     |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (planul 21): `page.tsx` (structură cu 3 file), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Pagina AgentBridge din panoul de control — card pentru server, 9 carduri pentru agenți, expert de configurare, maparea modelelor, listă de ocolire. i18n PT-BR + EN. Consultați `docs/frameworks/AGENTBRIDGE.md`.                                                                                                            |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Pagina Traffic Inspector din panoul de control — vizualizare DevTools divizată, 7 file cu detalii, 4 comutatoare pentru modurile de captură, înregistrator de sesiuni, colorizare contextuală. i18n PT-BR + EN. Consultați `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                           |
| `app/(dashboard)/dashboard/activity/`                                        | Pagina fluxului de activitate (Grupul B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — consultați `docs/architecture/MONITORING_SECTIONS.md`                                                                                                    |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Pagina de partajare a cotelor (Grupul B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Pagina de configurare a planului furnizorului (Grupul B): `page.tsx` + `ProviderPlanConfigClient.tsx` — suprascrierea dimensiunilor cotelor pentru fiecare conexiune                                                                                                                                                         |
| `app/docs/`                                                                  | Vizualizator de documentație încorporat (redă `docs/*.md`)                                                                                                                                                                                                                                                                   |
| `app/landing/`                                                               | Pagină de destinație pentru marketing                                                                                                                                                                                                                                                                                        |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Pagini legate de autentificare                                                                                                                                                                                                                                                                                               |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Pagini de eroare HTTP                                                                                                                                                                                                                                                                                                        |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Pagini statice/de stare                                                                                                                                                                                                                                                                                                      |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Aspect rădăcină, pagina principală, manifest PWA, CSS global                                                                                                                                                                                                                                                                 |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Limite pentru erori                                                                                                                                                                                                                                                                                                          |

### `src/lib/` — Biblioteci de bază (~50 de module)

| Modul                                              | Scop                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                             | Manager de sarcini pentru protocolul A2A, abilități (5), streaming                                                                                                                                                                                                                                                                      |
| `acp/`                                             | Registru de agenți CLI (descoperire CLI locală — consultați `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                 |
| `api/`                                             | Utilitare API comune (`requireManagementAuth`, validare)                                                                                                                                                                                                                                                                                |
| `auth/`                                            | Sesiuni, hashing pentru parole, validarea tokenurilor                                                                                                                                                                                                                                                                                   |
| `batches/`                                         | Handlere pentru API-ul OpenAI Batches                                                                                                                                                                                                                                                                                                   |
| `catalog/`                                         | Validare Zod pentru catalogul de furnizori + determinarea capabilităților                                                                                                                                                                                                                                                               |
| `cloudAgent/`                                      | Agenți cloud (Codex Cloud, Devin, Jules) — consultați `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                  |
| `combos/`                                          | Utilitare pentru determinarea și reordonarea combinațiilor                                                                                                                                                                                                                                                                              |
| `audit/`                                           | Utilitare pentru fluxul de activitate: `highLevelActions.ts` (listă de permisiuni + `isHighLevelAction()`), `activityIcons.ts` (mapare acțiune → pictogramă/verb), `timeline.ts` (groupByDay/relativeTime) — consultați `docs/architecture/MONITORING_SECTIONS.md`                                                                      |
| `compliance/`                                      | Jurnal de audit + auditarea furnizorilor — consultați `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                     |
| `compression/`                                     | Integrarea motorului de compresie (motoarele se află în `open-sse/services/compression/`)                                                                                                                                                                                                                                               |
| `config/`                                          | Utilitare pentru configurarea la runtime                                                                                                                                                                                                                                                                                                |
| `db/`                                              | Peste 120 de module DB de domeniu + 168 de migrări (pentru SQLite, accesați întotdeauna prin acestea)                                                                                                                                                                                                                                   |
| `quota/`                                           | Motor de partajare a cotelor: `dimensions.ts` (tipuri/Zod), `types.ts` (interfața QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — consultați `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                           | Client pentru catalogul de modele gratuite Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — consultați `docs/frameworks/RADAR.md`                                                                                                                                    |
| `display/`                                         | Utilitare pentru formatarea interfeței cu utilizatorul (cost, latență etc.)                                                                                                                                                                                                                                                             |
| `embeddings/`                                      | Utilitare pentru serviciul de embeddings                                                                                                                                                                                                                                                                                                |
| `env/`                                             | Parsarea și validarea variabilelor de mediu                                                                                                                                                                                                                                                                                             |
| `evals/`                                           | Cadru de evaluare (suite, executor, mediu de execuție) — consultați `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                          |
| `guardrails/`                                      | Mascarea informațiilor cu caracter personal, protecție împotriva injectării de prompturi, punte pentru procesarea vizuală — consultați `docs/security/GUARDRAILS.md`                                                                                                                                                                    |
| `jobs/`                                            | Sarcini în fundal (similare cu cron)                                                                                                                                                                                                                                                                                                    |
| `memory/`                                          | Memorie conversațională (RRF hibrid cu SQLite FTS5 + sqlite-vec și Qdrant de nivel 2) — consultați `docs/frameworks/MEMORY.md`                                                                                                                                                                                                          |
| `memory/embedding/`                                | Strat de embeddings cu surse multiple: `index.ts` (rezolvator), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (planul 21)                                                                                                                                                                              |
| `memory/vectorStore.ts`                            | Wrapper pentru sqlite-vec v0.1.9 — căutare KNN prin forță brută + RRF hibrid (FTS5 + vector, k=60). Inițializare întârziată, cu degradare controlată atunci când sqlite-vec nu este disponibil. (planul 21)                                                                                                                             |
| `memory/reindex.ts`                                | `runReindexBatch()` — procesează în fundal memoriile cu `needs_reindex=1`; apelată de `POST /api/memory/reindex` și de calea de completare întârziată. (planul 21)                                                                                                                                                                      |
| `monitoring/`                                      | Verificări de stare, emiterea metricilor                                                                                                                                                                                                                                                                                                |
| `oauth/`                                           | Fluxuri OAuth/de import pentru 22 de module de furnizori (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                    |
| `plugins/`                                         | Registru de pluginuri                                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                                     | Puncte de întrerupere pentru memoria cache a prompturilor în stil Anthropic                                                                                                                                                                                                                                                             |
| `skills/`                                          | Cadru pentru abilități (încorporate + marketplace + SkillsSH) — consultați `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                  |
| `playground/`                                      | Utilitare comune Playground Studio: `codeExport.ts` (generator curl/Python/TS), `promptImprover.ts` (constructor de meta-prompturi), `streamMetrics.ts` (funcții pure pentru TTFT/TPS), `types.ts` (tabel de prețuri) — consultați `docs/frameworks/PLAYGROUND_STUDIO.md`                                                               |
| `webhookDispatcher.ts`                             | Livrarea webhook-urilor cu HMAC — consultați `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                              |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`           | Manageri de tuneluri — consultați `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                           |
| `cloudSync.ts`, `initCloudSync.ts`                 | Sincronizare opțională în cloud a stării                                                                                                                                                                                                                                                                                                |
| `localDb.ts`                                       | Modul central de reexportare pentru modulele bazei de date (fără logică — doar reexportări)                                                                                                                                                                                                                                             |
| `cacheLayer.ts`, `idempotencyLayer.ts`             | Memorarea în cache a cererilor + idempotentă                                                                                                                                                                                                                                                                                            |
| (încă aproximativ 30 de fișiere de nivel superior) | Utilitare specializate (logEnv, modelsDevSync, piiSanitizer etc.)                                                                                                                                                                                                                                                                       |

### `src/lib/db/` — Bază de date (147 de module + 208 migrări)

| Subdirector               | Scop                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` cu jurnalizare WAL                                                                                                                                           |
| `db/migrations/`          | Fișiere SQL versionate (idempotente, tranzacționale). `073_memory_vec.sql` adaugă `memory_vec_meta` + coloana `needs_reindex` (planul 21).                                               |
| `db/playgroundPresets.ts` | Modul CRUD pentru presetările Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)           |
| `db/memoryVec.ts`         | Operații CRUD pentru `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` etc. (planul 21)                 |
| `db/<domain>.ts`          | Câte un modul pentru fiecare domeniu: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache etc. |

### `src/domain/`

| Modul                  | Scop                                                          |
| ---------------------- | ------------------------------------------------------------- |
| `policy.ts`            | Motor de politici                                             |
| `fallbackPolicy.ts`    | Arbore decizional pentru mecanismul de rezervă                |
| `costRules.ts`         | Reguli de calculare a costurilor                              |
| `lockoutPolicy.ts`     | Politică de blocare a modelelor/conexiunilor                  |
| `tagRouter.ts`         | Rutare bazată pe etichete                                     |
| `comboResolver.ts`     | Rezolvarea combinațiilor (utilizată de motorul de combinații) |
| `modelAvailability.ts` | Verificarea disponibilității pentru fiecare model             |
| `assessment/`          | Evaluarea modelelor (Faza 1 din RFC-AUTO-ASSESSMENT)          |

### `src/server/`

| Modul    | Scop                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `authz/` | Flux de autorizare: `classify` → `policies` → `enforce` — consultați `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configurare CORS                                                                                        |
| `auth/`  | Middleware pentru sesiuni                                                                               |

### `src/shared/`

| Modul                            | Scop                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `components/`                    | API pentru componentele tabloului de bord: adaptoare peste `packages/ui-kit` — consultați `docs/architecture/DESIGN_SYSTEM.md` |
| `constants/iconMap.ts`           | `ICON_MAP`: numele pictogramelor utilizate de ecrane → componente Lucide (`<Icon>`)                                            |
| `constants/providers.ts`         | **376 de furnizori** cu validare Zod (sursa unică de adevăr)                                                                   |
| `constants/cliTools.ts`          | Registrul instrumentelor CLI externe                                                                                           |
| `constants/routingStrategies.ts` | **20 de strategii de rutare** cu priorități                                                                                    |
| `constants/publicApiRoutes.ts`   | Rute care necesită autentificare Bearer (în locul autentificării de administrare)                                              |
| `constants/upstreamHeaders.ts`   | Lista de blocare a antetelor pentru cererile upstream                                                                          |
| `validation/schemas.ts`          | ~80 de scheme Zod (sursa unică de adevăr pentru contractele API)                                                               |
| `validation/helpers.ts`          | Funcții auxiliare pentru validarea Zod (`validateBody` etc.)                                                                   |
| `types/`                         | Tipuri TS partajate                                                                                                            |
| `contracts/`                     | Contracte API publice (utilizate de `files:` în `package.json`)                                                                |
| `utils/circuitBreaker.ts`        | Întrerupător de circuit pentru furnizori (consultați `docs/architecture/RESILIENCE_GUIDE.md`)                                  |
| `utils/apiAuth.ts`               | Validarea cheilor API, verificarea domeniilor de acces                                                                         |
| `utils/fetchTimeout.ts`          | Wrappere de expirare/anulare pentru operațiunile fetch upstream                                                                |
| `utils/releaseNotes.ts`          | Parser pentru anunțuri închise v2/legacy, localizare și închidere pe baza ID-ului                                              |

---

## `open-sse/` — Spațiul de lucru pentru motorul de streaming

Spațiu de lucru npm separat (`@omniroute/open-sse`). Gestionează procesarea cererilor și execuția furnizorilor.

```
open-sse/
├── handlers/            # 16 fișiere (12 gestionare + 4 auxiliare): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search etc.
├── executors/           # 150 de module de execuție (clase care extind BaseExecutor + funcții auxiliare pentru fiecare furnizor)
├── translator/          # Convertoare de format (9 pentru cereri, 9 pentru răspunsuri, 9 auxiliare)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # Peste ~80 de module de servicii (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM etc.)
├── mcp-server/          # Server MCP (110 instrumente, 3 transporturi, 33 de domenii)
├── config/              # Registre de furnizori/modele, configurarea anteturilor, aliasuri de modele
├── utils/               # Client TLS, preluare/dispecer proxy, funcții auxiliare de rețea
├── index.ts             # Punctul de intrare al spațiului de lucru
├── package.json         # Manifestul spațiului de lucru
├── tsconfig.json        # Configurația TS a spațiului de lucru
└── types.d.ts           # Declarațiile de tipuri ale spațiului de lucru
```

### `open-sse/mcp-server/`

| Cale                        | Scop                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `server.ts`                 | Ciclul de viață al serverului MCP (transporturi stdio + HTTP)                                  |
| `httpTransport.ts`          | Transporturi HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                         |
| `audit.ts`                  | Jurnalizarea auditului în tabelul `mcp_tool_audit`                                             |
| `scopeEnforcement.ts`       | Validarea domeniului pentru fiecare instrument                                                 |
| `runtimeHeartbeat.ts`       | Semnal periodic de stare către `DATA_DIR/runtime/mcp-heartbeat.json`                           |
| `descriptionCompressor.ts`  | Comprimă metadatele descrierilor instrumentelor pentru a economisi context                     |
| `schemas/tools.ts`          | 36 de definiții de bază ale instrumentelor + domenii                                           |
| `tools/advancedTools.ts`    | Implementări avansate ale instrumentelor                                                       |
| `tools/memoryTools.ts`      | 3 instrumente pentru memorie (căutare/adăugare/ștergere)                                       |
| `tools/skillTools.ts`       | 4 instrumente pentru abilități (listare/activare/executare/execuții)                           |
| `tools/compressionTools.ts` | 5 instrumente de comprimare                                                                    |
| `README.md`                 | README intern al serverului MCP (cu referință încrucișată din `docs/frameworks/MCP-SERVER.md`) |

---

## `packages/` — Spații de lucru

| Cale                     | Scop                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui-kit/`       | `@omniroute/ui-kit` — instantaneu inclus local al Keak CI UI Kit (`private`, `UNLICENSED`), utilizat ca sursă (fără compilare). `UPSTREAM.md` fixează commitul upstream și consemnează autorizarea licenței; `PATCHES.md` enumeră corecțiile locale (niciuna); `src/` este sincronizat numai prin `scripts/dev/sync-ui-kit.sh` și protejat prin `npm run check:ui-kit-snapshot`. Consultați `docs/architecture/DESIGN_SYSTEM.md` |
| `packages/browser-pool/` | `@omniroute/browser-pool` — serviciu opțional de gestionare a unui grup de browsere (chat bazat pe CloakBrowser și Playwright)                                                                                                                                                                                                                                                                                                   |

---

## `electron/` — Înveliș desktop

| Fișier           | Scop                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `main.js`        | Procesul principal Electron (BrowserWindow, server Next.js încorporat, tray, actualizare automată) |
| `preload.js`     | Punte IPC (contextBridge → `window.omniroute`)                                                     |
| `package.json`   | Configurație electron-builder + dependențe Electron 41 + electron-builder 26.10                    |
| `assets/`        | Pictogramele aplicației (Windows .ico, macOS .icns, Linux .png)                                    |
| `dist-electron/` | Rezultatul compilării (ignorat de git)                                                             |
| `types.d.ts`     | Declarații de tipuri pentru puntea rendererului                                                    |
| `README.md`      | README Electron intern (consultați și `docs/guides/ELECTRON_GUIDE.md`)                             |

---

## `bin/` — CLI

| Fișier                                                                                                      | Scop                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Punct principal de intrare CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` etc. |
| `reset-password.mjs`                                                                                        | CLI autonom pentru resetarea parolei                                                                                                      |
| `cli/commands/setup.mjs`                                                                                    | Asistent de configurare interactiv și neinteractiv                                                                                        |
| `cli/commands/doctor.mjs`                                                                                   | Diagnosticarea stării sistemului (peste 8 verificări)                                                                                     |
| `cli/commands/providers.mjs`                                                                                | Listarea/testarea/validarea furnizorilor                                                                                                  |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Module auxiliare CLI                                                                                                                      |
| `cli/tray/tray.ts`                                                                                          | Integrare în zona de notificare a sistemului (multiplatformă: NotifyIcon pe Windows, systray2 pe macOS/Linux)                             |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, fără binare noi)                                                                                  |
| `cli/tray/autostart.ts`                                                                                     | Pornire automată multiplatformă (LaunchAgent / .desktop / registry)                                                                       |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Lanț în 5 pași pentru rezolvarea driverului SQLite (inclus → runtime → instalare la cerere → node:sqlite → sql.js)                        |
| `cli/runtime/magicBytes.mjs`                                                                                | Validarea octeților magici ai binarelor (ELF / Mach-O / Mach-O fat / PE)                                                                  |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — rezolvă în prealabil driverele la postinstall / prima pornire                                                        |
| `nodeRuntimeSupport.mjs`                                                                                    | Validează versiunea Node.js acceptată la instalare                                                                                        |

---

## `skills/` — Abilități publice pentru agenți

| Fișier                       | Scop                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifeste de abilități pentru agenți AI externi (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripturi de compilare și verificare

| Script                              | Scop                                                                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Executor de dezvoltare/pornire cu încărcarea variabilelor de mediu                              |
| `build-next-isolated.mjs`           | Compilare autonomă (modul standalone din Next.js 16)                                            |
| `prepublish.ts`                     | Pregătirea pachetului înainte de `npm pack`                                                     |
| `postinstall.mjs`                   | Creează automat `.env` din `.env.example` la prima instalare                                    |
| `sync-env.mjs`                      | Resincronizează cheile din `.env` cu `.env.example`                                             |
| `check-cycles.mjs`                  | Detectează dependențele circulare                                                               |
| `check-route-validation.mjs`        | Validează că toate rutele API utilizează validarea Zod                                          |
| `check-t11-any-budget.mjs`          | Impune un buget explicit pentru `any` per fișier                                                |
| `check-docs-sync.mjs`               | Validează sincronizarea versiunilor documentației (pre-commit existent)                         |
| **`check-env-doc-sync.mjs`**        | NOU: verifică încrucișat variabilele de mediu din cod, `.env.example` și `ENVIRONMENT.md`       |
| **`check-docs-counts-sync.mjs`**    | NOU: validează că numerele (executori, strategii, OAuth, abilități A2A) corespund documentației |
| **`check-deprecated-versions.mjs`** | NOU: semnalează versiunile/datele învechite din documentație                                    |
| `check-supported-node-runtime.ts`   | Validează că versiunea curentă de Node este acceptată                                           |
| `check-pr-test-policy.mjs`          | Impune regula „testele sunt obligatorii” pentru modificările codului de producție               |
| **`gen-provider-reference.ts`**     | NOU: generează automat `docs/reference/PROVIDER_REFERENCE.md` din catalog                       |
| `i18n/generate-multilang.mjs`       | Traduce șirurile UI și documentația prin Google Translate                                       |
| `i18n_autotranslate.py`             | Flux de traducere a documentației bazat pe LLM                                                  |
| `validate_translation.py`           | Validarea traducerii pentru fiecare localizare                                                  |
| `check_translations.py`             | Verificarea cheilor i18n din cod                                                                |
| `run-playwright-tests.mjs`          | Executor pentru teste E2E Playwright                                                            |
| `run-protocol-clients-tests.mjs`    | Executor pentru teste E2E MCP/A2A                                                               |
| `run-ecosystem-tests.mjs`           | Teste de ecosistem (integrarea furnizorilor)                                                    |
| `test-report-summary.mjs`           | Generează rezumatul acoperirii în format markdown                                               |
| `smoke-electron-packaged.mjs`       | Efectuează un test rapid al compilării Electron împachetate                                     |
| `native-binary-compat.mjs`          | Validează că dependențele native (`better-sqlite3`) corespund versiunii Node din Electron       |
| `validate-pack-artifact.ts`         | Validează rezultatul împachetării npm                                                           |
| `responses-ws-proxy.mjs`            | Punte WebSocket pentru API-ul Codex Responses                                                   |
| `v1-ws-bridge.mjs`                  | Punte WebSocket pentru endpointul `/api/v1/ws`                                                  |
| `standalone-server-ws.mjs`          | Executor de server WS autonom                                                                   |
| `system-info.mjs`                   | Afișează informații despre sistem/mediul de execuție pentru asistență                           |
| `healthcheck.mjs`                   | Verificare unică a stării de funcționare (utilizată de Docker HEALTHCHECK)                      |
| `uninstall.mjs`                     | Script de dezinstalare completă                                                                 |
| `dev/sync-ui-kit.sh`                | Copiază `src/` din CI UI Kit de la un commit fixat în `packages/ui-kit/src`                     |
| `check/check-ui-kit-snapshot.mjs`   | Barieră pre-commit: `packages/ui-kit/src` corespunde commitului upstream fixat                  |
| `dev/gen-icon-map.mjs`              | `npm run gen:icon-map` — nume de pictograme utilizate pe care `ICON_MAP` nu le mapează          |
| `dev/codemod-material-icons.mjs`    | Rescrie elementele literale Material Symbols ca `<Icon>` (instrument pentru migrare)            |

---

## `docs/` — Documentație publică (7 fișiere rădăcină + 17 subdirectoare)

### Ghiduri principale

| Document                    | Scop                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arhitectură de nivel înalt, harta subsistemelor, interfața tabloului de bord                   |
| `CODEBASE_DOCUMENTATION.md` | Referință tehnică: directoare, module, convenții                                               |
| `FEATURES.md`               | Matrice de funcționalități cu noutățile v3.8                                                   |
| `USER_GUIDE.md`             | Manual pentru utilizatorii finali (configurare, modele, combinații, CLI-uri, audio etc.)       |
| `API_REFERENCE.md`          | Referință pentru endpointurile API, cu modelul de autentificare                                |
| `openapi.yaml`              | Specificație OpenAPI 3.0 (121 de căi)                                                          |
| `SETUP_GUIDE.md`            | Metode de instalare (npm, npx, Docker, Electron, Termux, sursă)                                |
| `ENVIRONMENT.md`            | Toate variabilele de mediu (~800 documentate, ~3.050 de linii în `.env.example`)               |
| `TROUBLESHOOTING.md`        | Erori frecvente + probleme cunoscute în v3.8.0                                                 |
| `RELEASE_CHECKLIST.md`      | Flux complet de lansare (abilități, husky, commituri convenționale, implementare)              |
| `COVERAGE_PLAN.md`          | Obiectivele de acoperire și starea actuală                                                     |
| `FREE_TIERS.md`             | Furnizori atent selectați cu nivel gratuit (48+ gratuiți + 11 OAuth)                           |
| `CLI-TOOLS.md`              | Integrări CLI externe + CLI-ul intern OmniRoute                                                |
| `I18N.md`                   | Arhitectura i18n, adăugarea unei limbi, 67 de configurări regionale                            |
| `UNINSTALL.md`              | Pași pentru dezinstalarea completă                                                             |
| `PROVIDER_REFERENCE.md`     | Catalog **generat automat** cu 376 de furnizori (regenerare: `npm run gen:provider-reference`) |

### Analize aprofundate ale subsistemelor

| Document                                    | Scop                                                                                      |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | Server MCP: 110 instrumente, 3 transporturi, 33 de domenii de acces, endpointuri REST     |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 abilități, utilitare REST, fișa agentului                           |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Ghid unificat: A2A comparativ cu ACP și agenții cloud                                     |
| `CLOUD_AGENT.md`                            | Orchestrarea Codex Cloud / Devin / Jules                                                  |
| `SKILLS.md`                                 | Cadru pentru abilități (încorporate + marketplace + SkillsSH + sandbox)                   |
| `RADAR.md`                                  | Suprapunerea catalogului Radar de modele gratuite (`RADAR_ENABLED`, dezactivată implicit) |
| `MEMORY.md`                                 | Sistem de memorie (SQLite FTS5 + Qdrant)                                                  |
| `EVALS.md`                                  | Cadru de evaluare (suite, rulări, grile de evaluare)                                      |
| `GUARDRAILS.md`                             | Mascarea PII, injectarea prompturilor, punte pentru procesarea vizuală                    |
| `COMPLIANCE.md`                             | Jurnal de audit, retenție, opțiune de excludere noLog                                     |
| `WEBHOOKS.md`                               | Livrarea webhookurilor semnate cu HMAC                                                    |
| `REASONING_REPLAY.md`                       | Cache hibrid de memorie/SQLite pentru `reasoning_content`                                 |
| `AUTHZ_GUIDE.md`                            | Flux de autorizare (`classify` → `policies` → `enforce`)                                  |
| `RESILIENCE_GUIDE.md`                       | Întrerupător de circuit + perioadă de așteptare + blocarea modelului                      |
| `docs/security/STEALTH_GUIDE.md` (doar git) | Amprentare TLS (JA3/JA4), Claude Code CCH, certificat MITM                                |
| `AUTO-COMBO.md`                             | Motor Auto Combo (evaluare pe baza a 16 factori, 6 pachete de moduri, fabrică virtuală)   |

### Compresie

| Document                        | Scop                                                            |
| ------------------------------- | --------------------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Prezentare generală a modurilor de compresie + foaie de parcurs |
| `COMPRESSION_ENGINES.md`        | Motoarele Caveman + RTK, contractul registrului                 |
| `COMPRESSION_RULES_FORMAT.md`   | Schema JSON a pachetului de reguli Caveman                      |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventarul pachetelor de reguli pentru fiecare limbă            |
| `RTK_COMPRESSION.md`            | Flux declarativ RTK (49 de filtre)                              |

### Implementare

| Document                     | Scop                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Compilare Docker, profiluri (base/cli/host/cliproxyapi), serviciu auxiliar Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Implementare generică pe VM/VPS (Ubuntu/Debian + nginx + systemd)                |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Implementare pe Fly.io (momentan disponibilă doar în chineză)                    |
| `TERMUX_GUIDE.md`            | Android fără interfață grafică prin Termux                                       |
| `PWA_GUIDE.md`               | Instalarea aplicației web progresive + service worker                            |
| `ELECTRON_GUIDE.md`          | Compilarea + semnarea + distribuirea aplicației desktop                          |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                           |
| `PROXY_GUIDE.md`             | Proxy de ieșire pe 4 niveluri + marketplace-ul 1proxy                            |

### Subdirectoare

| Subdirector           | Scop                                                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/i18n/`          | Traduceri localizate ale documentației (41 de limbi)                                                                                                                                                                                       |
| `docs/screenshots/`   | Resurse de imagine pentru ghiduri                                                                                                                                                                                                          |
| `_tasks/superpowers/` | Planuri/specificații din superpowers (`writing-plans`/`brainstorming`) + cercetare — depozit izolat, cu versiuni gestionate separat, ignorat de git în arborele principal. Consultați CLAUDE.md → „Artefacte de planificare și cercetare”. |

---

## `tests/` — Suite de teste

| Subdirector                          | Tip                                                     | Executor                                      |
| ------------------------------------ | ------------------------------------------------------- | --------------------------------------------- |
| `tests/unit/`                        | Teste unitare (~4.800 de fișiere, cele mai rapide)      | Executorul nativ de teste Node                |
| `tests/integration/`                 | Teste de integrare pentru mai multe module + BD         | Executorul nativ de teste Node (concurență 1) |
| `tests/e2e/`                         | E2E pentru interfața cu utilizatorul + fluxuri de lucru | Playwright                                    |
| `tests/e2e/protocol-clients.test.ts` | E2E cu clienți reali MCP + A2A                          | Clienți de protocol personalizați             |
| `tests/e2e/ecosystem.test.ts`        | Integrarea furnizorilor (cu acces la rețea)             | Executorul nativ de teste Node                |

---

## `public/` — Resurse statice

| Cale                 | Scop                                                                   |
| -------------------- | ---------------------------------------------------------------------- |
| `public/` (rădăcină) | Faviconuri, robots.txt, manifest, service worker, imagini de marketing |
| `public/providers/`  | Sigle PNG/SVG ale furnizorilor (utilizate în panoul de control)        |

---

## `config/` — Configurații statice + starea pragurilor de calitate

Șabloane de configurare distribuite împreună cu produsul, plus valorile de referință confirmate pentru pragurile de calitate
(mutate aici din rădăcina depozitului în v3.8.26 pentru a menține rădăcina aerisită).

| Cale                                          | Scop                                                                                                     |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista localizărilor + metadate (sursa canonică pentru numărul de 42 de localizări)                       |
| `config/i18n-schema.json`                     | Schema JSON care validează `i18n.json`                                                                   |
| `config/payloadRules.json`                    | Reguli de igienizare a sarcinilor utile din amonte                                                       |
| `config/quality/quality-baseline.json`        | Valoare de referință incrementală pentru mai multe metrici (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Valoare de referință fixată pentru complexitatea ESLint (`check-complexity.mjs`)                         |
| `config/quality/duplication-baseline.json`    | Valoare de referință fixată pentru duplicarea jscpd (`check-duplication.mjs`)                            |
| `config/quality/file-size-baseline.json`      | Valoare de referință fixată pentru dimensiunea fiecărui fișier (`check-file-size.mjs`)                   |
| `config/quality/test-discovery-baseline.json` | Valoare de referință fixată pentru testele orfane (`check-test-discovery.mjs`)                           |
| `config/quality/dependency-allowlist.json`    | Lista de permisiuni pentru dependențele aprobate (`check-deps.mjs`)                                      |
| `config/quality/.license-allowlist.json`      | Lista de permisiuni pentru licențele SPDX (`check-licenses.mjs`)                                         |
| `config/quality/quality-metrics.json`         | Metrici temporare colectate (generate de `collect-metrics.mjs`; **ignorate de git**)                     |

---

## `.github/` — Integrare GitHub

| Cale                               | Scop                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `.github/workflows/`               | Fluxuri de lucru CI/CD GitHub Actions (lint, testare, acoperire, lansare) |
| `.github/ISSUE_TEMPLATE/`          | Șabloane de issue-uri pentru erori/funcționalități                        |
| `.github/pull_request_template.md` | Șablon pentru PR                                                          |
| `.github/dependabot.yml`           | Configurația actualizării dependențelor                                   |

---

## `.husky/` — Hook-uri Git

| Fișier       | Scop                                                               |
| ------------ | ------------------------------------------------------------------ |
| `pre-commit` | Rulează `lint-staged + check-docs-sync + check:any-budget:t11`     |
| `pre-push`   | Momentan dezactivat (comentat). Rulați manual `npm run test:unit`. |
| `_/`         | Componente interne Husky                                           |

---

## `.claude/` — Comenzi slash Claude Code

| Fișier                                              | Scop                                                                       |
| --------------------------------------------------- | -------------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — actualizarea versiunii + jurnal de modificări automat |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — flux complet de lansare                           |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Implementare pe VPS                                                        |
| `commands/capture-release-evidences-cc.md`          | Înregistrarea în browser a noilor funcționalități ca WebP                  |
| `commands/review-{prs,discussions}-cc.md`           | Triajul PR-urilor/discuțiilor GitHub                                       |
| `commands/{review-issues,implement-features}-cc.md` | Fluxuri de lucru pentru issue-uri                                          |
| `settings.local.json`                               | Setări Claude Code specifice proiectului                                   |

---

## `.agents/` — Fluxuri de lucru generice pentru agenți (Codex / Cursor / etc.)

| Cale                     | Scop                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definiții de fluxuri de lucru (oglindă a `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definiții de abilități cu note de execuție Codex               |

> **Notă:** Fluxurile de lucru și comenzile sunt momentan identice octet cu octet. Dacă `.agents/` este destinat unui mediu de execuție diferit pentru agenți (Codex), variantele trebuie să difere în mod semnificativ.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — În afara arborelui

Aceste directoare prefixate cu caracterul de subliniere conțin materiale care nu sunt distribuite:

- **`_ideia/`** — note de proiectare (categorii defer / notfit / viable)
- **`_mono_repo/`** — subproiecte istorice (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clone doar în citire ale proiectelor OSS conexe (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api etc.), folosite pentru referințe încrucișate în timpul dezvoltării
- **`_tasks/`** — fișiere de urmărire a sarcinilor pentru fiecare versiune (informale)

Nu sunt incluse în rezultatul `npm pack`. Consultați `.npmignore`.

---

## Generate / ignorate de Git

| Cale                   | Scop                              |
| ---------------------- | --------------------------------- |
| `node_modules/`        | Dependențe npm                    |
| `.next/`               | Rezultatul compilării Next.js     |
| `coverage/`            | Rapoarte de acoperire c8          |
| `logs/`                | Jurnale de execuție               |
| `package/`             | Zonă de pregătire pentru npm pack |
| `.playwright-mcp/`     | Artefacte de test Playwright MCP  |
| `.issues/`             | Cache local pentru probleme       |
| `tsconfig.tsbuildinfo` | Cache incremental TS              |

---

## Sfaturi de navigare

- **Ești un contribuitor nou?** Citește `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Adaugi un furnizor?** Urmează `docs/architecture/ARCHITECTURE.md § Adding a New Provider` și verifică informațiile în raport cu `docs/reference/PROVIDER_REFERENCE.md`.
- **Adaugi o rută?** Consultă `docs/architecture/ARCHITECTURE.md § Adding a New API Route` și `src/shared/validation/schemas.ts`.
- **Adaugi un instrument MCP?** Consultă `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Adaugi o abilitate A2A?** Consultă `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Rulezi local?** Consultă `docs/guides/SETUP_GUIDE.md`.
- **Faci implementarea?** Consultă `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Pregătești o versiune nouă?** Consultă `docs/ops/RELEASE_CHECKLIST.md` (și abilitatea Claude Code `/generate-release-cc`).
