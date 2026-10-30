# OmniRoute agent guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../AGENTS.md) · 🇪🇹 [am](../am/AGENTS.md) · 🇸🇦 [ar](../ar/AGENTS.md) · 🇦🇿 [az](../az/AGENTS.md) · 🇧🇬 [bg](../bg/AGENTS.md) · 🇧🇩 [bn](../bn/AGENTS.md) · 🇨🇿 [cs](../cs/AGENTS.md) · 🇩🇰 [da](../da/AGENTS.md) · 🇩🇪 [de](../de/AGENTS.md) · 🇬🇷 [el](../el/AGENTS.md) · 🇪🇸 [es](../es/AGENTS.md) · 🇪🇪 [et](../et/AGENTS.md) · 🇮🇷 [fa](../fa/AGENTS.md) · 🇫🇮 [fi](../fi/AGENTS.md) · 🇫🇷 [fr](../fr/AGENTS.md) · 🇮🇪 [ga](../ga/AGENTS.md) · 🇮🇳 [gu](../gu/AGENTS.md) · 🇳🇬 [ha](../ha/AGENTS.md) · 🇮🇱 [he](../he/AGENTS.md) · 🇮🇳 [hi](../hi/AGENTS.md) · 🇭🇷 [hr](../hr/AGENTS.md) · 🇭🇺 [hu](../hu/AGENTS.md) · 🇦🇲 [hy](../hy/AGENTS.md) · 🇮🇩 [id](../id/AGENTS.md) · 🇳🇬 [ig](../ig/AGENTS.md) · 🇮🇹 [it](../it/AGENTS.md) · 🇯🇵 [ja](../ja/AGENTS.md) · 🇬🇪 [ka](../ka/AGENTS.md) · 🇰🇭 [km](../km/AGENTS.md) · 🇮🇳 [kn](../kn/AGENTS.md) · 🇰🇷 [ko](../ko/AGENTS.md) · 🇱🇹 [lt](../lt/AGENTS.md) · 🇱🇻 [lv](../lv/AGENTS.md) · 🇮🇳 [ml](../ml/AGENTS.md) · 🇮🇳 [mr](../mr/AGENTS.md) · 🇲🇾 [ms](../ms/AGENTS.md) · 🇲🇹 [mt](../mt/AGENTS.md) · 🇲🇲 [my](../my/AGENTS.md) · 🇳🇵 [ne](../ne/AGENTS.md) · 🇳🇱 [nl](../nl/AGENTS.md) · 🇳🇴 [no](../no/AGENTS.md) · 🇮🇳 [or](../or/AGENTS.md) · 🇮🇳 [pa](../pa/AGENTS.md) · 🇵🇭 [phi](../phi/AGENTS.md) · 🇵🇱 [pl](../pl/AGENTS.md) · 🇵🇹 [pt](../pt/AGENTS.md) · 🇧🇷 [pt-BR](../pt-BR/AGENTS.md) · 🇷🇴 [ro](../ro/AGENTS.md) · 🇷🇺 [ru](../ru/AGENTS.md) · 🇱🇰 [si](../si/AGENTS.md) · 🇸🇰 [sk](../sk/AGENTS.md) · 🇸🇮 [sl](../sl/AGENTS.md) · 🇷🇸 [sr](../sr/AGENTS.md) · 🇸🇪 [sv](../sv/AGENTS.md) · 🇰🇪 [sw](../sw/AGENTS.md) · 🇮🇳 [ta](../ta/AGENTS.md) · 🇮🇳 [te](../te/AGENTS.md) · 🇹🇭 [th](../th/AGENTS.md) · 🇹🇷 [tr](../tr/AGENTS.md) · 🇺🇦 [uk-UA](../uk-UA/AGENTS.md) · 🇵🇰 [ur](../ur/AGENTS.md) · 🇺🇿 [uz](../uz/AGENTS.md) · 🇻🇳 [vi](../vi/AGENTS.md) · 🇳🇬 [yo](../yo/AGENTS.md) · 🇨🇳 [zh-CN](../zh-CN/AGENTS.md) · 🇹🇼 [zh-TW](../zh-TW/AGENTS.md)

---

> **Jedini izvor istine.** Ova datoteka sadrži SVA pravila projekta, konvencije, napomene o arhitekturi
> i stroga pravila za svakog AI asistenta koji radi na ovom repozitoriju (Claude Code, Gemini, Codex,
> Copilot i bilo koji drugi agent). `CLAUDE.md` i `GEMINI.md` dodaju samo razlike specifične za asistenta
> i upućuju nazad na ovu datoteku. Kada je potrebno promijeniti pravilo, promijenite ga OVDJE — nikada ga nemojte ponovo izdvajati u
> datoteku specifičnu za asistenta.

## Brzi početak

```bash
npm install                    # Instalira zavisnosti (automatski generiše .env iz .env.example)
npm run dev                    # Razvojni server na http://localhost:20128
npm run build                  # Produkcijska izgradnja (samostalni Next.js 16)
npm run build:release          # Izgradnja izdanja
npm run lint                   # ESLint (očekuje se 0 grešaka; upozorenja već postoje)
npm run typecheck:core         # TypeScript provjera (treba proći bez grešaka)
npm run typecheck:noimplicit:core  # Stroga provjera (bez implicitnog any)
npm run test:coverage          # Jedinični testovi + prag pokrivenosti (67.33 / 67.33 / 72.02 / 65.08 — naredbe/linije/funkcije/grane, nametnuto blokirajućim mehanizmom postepenog povećanja u config/quality/quality-baseline.json; test:coverage ima fiksno postavljenu vrijednost 60)
npm run check                  # Kombinovani lint + test
npm run check:cycles           # Otkriva kružne zavisnosti (savjetodavno — navodi SCC-ove)
npm run check:cycles:ratchet   # Ista provjera, blokira iznad gornje granice iz quality-baseline
npm run check:docs-all         # Pokrenuti nakon izmjene dokumentacije (uključuje provjeru izmišljene dokumentacije)
```

Pokretanje testova: pogledajte [Testiranje](#testiranje) ispod (prvo pokrenite najuže fokusirani test za izmijenjeni kod).

---

## Kratak pregled projekta

**OmniRoute** — objedinjeni AI proxy/usmjerivač. Jedna krajnja tačka, 375 LLM pružalaca, automatski rezervni odabir.

- API rute — `src/app/api/v1/` (ulazne tačke za Next.js App Router)
- Obrađivači — `open-sse/handlers/` (obrada zahtjeva: chat, ugrađivanja itd.)
- Izvršitelji — `open-sse/executors/` (HTTP prosljeđivanje specifično za pružaoce)
- Prevodioci — `open-sse/translator/` (konverzija formata OpenAI↔Claude↔Gemini)
- Transformator — `open-sse/transformer/` (Responses API ↔ Chat Completions)
- Servisi — `open-sse/services/` (kombinovano usmjeravanje, ograničenja učestalosti, keširanje itd.)
- Baza podataka — `src/lib/db/` (SQLite domenski moduli, 209 migracija)
- Domena/pravila — `src/domain/` (mehanizam pravila, pravila troškova, logika rezervnog odabira)
- MCP server — `open-sse/mcp-server/` (110 alata: 45 kanonskih + moduli za memoriju/vještine/GitHub/skup/gejmifikaciju/dodatke/Notion/Obsidian/lokalni korpus/RTK; 3 transporta: stdio / SSE / Streamable HTTP; 33 opsega)
- A2A server — `src/lib/a2a/` (JSON-RPC 2.0 protokol za agente)
- Vještine — `src/lib/skills/` (proširivi okvir za vještine); memorija — `src/lib/memory/` (trajna konverzacijska memorija)

Monorepozitorij: `src/` (Next.js 16 aplikacija), `open-sse/` (radni prostor mehanizma za streaming), `electron/` (desktop aplikacija), `tests/`, `bin/` (ulazna tačka za CLI).

---

## Tok obrade zahtjeva

```
Klijent → /v1/chat/completions (Next.js ruta)
  → CORS → Zod validacija → autentifikacija? → provjera pravila → zaštita od ubacivanja prompta
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → provjera keša → ograničenje učestalosti → kombinovano usmjeravanje?
      → resolveComboTargets() → handleSingleModel() za svaki cilj
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() prema uzvodnom servisu → ponovni pokušaj s odgađanjem
    → prevođenje odgovora → SSE tok ili JSON
    → Ako je Responses API: responsesTransformer.ts TransformStream
```

API rute slijede dosljedan obrazac: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`. Ne postoji globalni Next.js međusoftver — presretanje je specifično za svaku rutu.

**Kombinovano usmjeravanje** (`open-sse/services/combo.ts`): 20 javnih strategija (priority, weighted, fill-first, round-robin, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, context-relay, fusion, pipeline). Svaki cilj poziva `handleSingleModel()` (obavija `handleChatCore()` obradom grešaka po cilju + provjerama prekidača strujnog kola); strategija `fusion` umjesto toga paralelno šalje zahtjeve panelu modela, a model sudija sintetizira jedan konačni odgovor (`open-sse/services/fusion.ts`). Auto-Combo bodovanje sa 16 faktora + potpuna tabela strategija: `docs/routing/AUTO-COMBO.md`; tri sloja otpornosti: `docs/architecture/RESILIENCE_GUIDE.md`.

---

## Stanje izvođenja otpornosti

Tri povezana, ali različita mehanizma za privremene kvarove — držite njihov **opseg** odvojenim prilikom otklanjanja grešaka u usmjeravanju:

- **Prekidač strujnog kruga pružaoca** — opseg: cijeli pružalac. 4 stanja (CLOSED/DEGRADED/OPEN/HALF_OPEN); lijeni oporavak — `getStatus()`/`canExecute()` osvježavaju isteklo stanje `OPEN`, bez pozadinskog tajmera.
- **Period čekanja veze** — opseg: jedna veza/račun/ključ. Lijeno preskakanje putem `rateLimitedUntil` + eksponencijalno odgađanje; terminalna stanja (`banned`/`expired`/`credits_exhausted`) NISU periodi čekanja.
- **Blokada modela** — opseg: pružalac + veza + model. Jedan neispravan model nikada ne onemogućava cijelu vezu (`open-sse/services/accountFallback.ts`).

Zadane vrijednosti: `open-sse/config/constants.ts` → `PROVIDER_PROFILES` (mogu se nadjačati putem
`OMNIROUTE_PROVIDER_BREAKER_*` / `OMNIROUTE_CIRCUIT_BREAKER_*`). Samo statusi na nivou pružaoca
`408/500/502/503/504` aktiviraju prekidač strujnog kruga pružaoca — većina statusa `401`/`403`/`429` pripada
periodu čekanja veze ili blokadi modela. Potpuna referenca za agente (datoteke, stanja, pragovi, otklanjanje grešaka):
[`docs/architecture/RESILIENCE_GUIDE.md` → "Stanje izvođenja — brza referenca za agente"](docs/architecture/RESILIENCE_GUIDE.md#runtime-state--agent-quick-reference).

---

## Mapa repozitorija

Prije uvođenja netrivijalne izmjene pročitajte najbliži `AGENTS.md` i povezanu detaljnu dokumentaciju.

- API rute — `src/app/api/v1/` → `docs/architecture/ARCHITECTURE.md`
- Obrada zahtjeva za strujanje — `open-sse/handlers/` → `docs/architecture/ARCHITECTURE.md`
- Izvršavanje i prevođenje pružaoca — `open-sse/executors/`, `open-sse/translator/` → `docs/architecture/CODEBASE_DOCUMENTATION.md`
- Usmjeravanje i otpornost — `open-sse/services/` → `open-sse/services/AGENTS.md`, `docs/routing/AUTO-COMBO.md`
- Baza podataka i migracije — `src/lib/db/`, `src/lib/db/migrations/` → `src/lib/db/AGENTS.md`
- Politika domene — `src/domain/` → `docs/architecture/ARCHITECTURE.md`
- MCP i A2A — `open-sse/mcp-server/`, `src/lib/a2a/` → `docs/frameworks/MCP-SERVER.md`, `docs/frameworks/A2A-SERVER.md`
- Funkcionalnosti agenata — `src/lib/{acp,memory,skills,cloudAgent}/` → `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`, `docs/frameworks/SKILLS.md`
- Sigurnost i upravljanje — `src/lib/{guardrails,compliance}/`, `src/server/authz/` → `docs/security/GUARDRAILS.md`, `docs/architecture/AUTHZ_GUIDE.md`
- Operacije — `src/mitm/`, moduli tunela, `electron/` → `docs/ops/TUNNELS_GUIDE.md`, `docs/guides/ELECTRON_GUIDE.md`

---

## Smještaj datoteka i urednost korijena repozitorija

- **Testne datoteke**: SVI jedinični testovi, integracijski testovi, testovi ekosistema ili Vitest datoteke MORAJU se strogo smjestiti unutar direktorija `tests/` (npr. `tests/unit/`, `tests/integration/`). NIKADA ne kreirajte testne datoteke u korijenu projekta (`/`).
- **Skripte i pomoćni alati**: SVE skripte za održavanje, otklanjanje grešaka, generisanje ili eksperimentisanje (`.cjs`, `.mjs`, `.js`, `.ts`) MORAJU se smjestiti strogo unutar jedne od podmapa direktorija `scripts/` (`build/`, `dev/`, `check/`, `docs/`, `i18n/`, `ad-hoc/`, `quality/`, `release/`, `ci/`, `ops/`, `perf/`, `research/`, `sre/`, `vps/`, `homolog/`, `packs/`, `skills/`, `test/`, `cli/`, `compression/`, `compression-eval/`, `devin-bridge/`, `docker/`, `features/`, `router-eval/`). Jednokratni ili eksperimentalni kod ide u `scripts/ad-hoc/`. NIKADA ne ostavljajte zasebne skripte u korijenu projekta (`/`) ili direktoriju `scripts/` najvišeg nivoa.

**Korijen projekta MORA sadržavati SAMO:**

- Konfiguracijske datoteke (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, `tsconfig*.json`, `playwright.config.ts`, `prettier.config.mjs`, `postcss.config.mjs`, `sonar-project.properties`, `fly.toml`, `docker-compose*.yml`, `Dockerfile`)
- Datoteke zavisnosti (`package.json`, `package-lock.json`)
- Dokumentacijske datoteke (`README.md`, `CHANGELOG.md`, `ROADMAP.md`, `LICENSE`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `llm.txt`)
- CI/CD datoteke i definicije za ignorisanje (`.gitignore`, `.dockerignore`, `.npmignore`, `.npmrc`, `.node-version`, `.nvmrc`, `.env.example`)

Prilikom kreiranja _bilo kojih_ validacijskih testova ili skripti s jednokratnom logikom, prema zadanim postavkama koristite `scripts/ad-hoc/` ili `tests/unit/`, zavisno od ciljeva. Nemojte zatrpavati korijenski kontekst `/`.

- **Korijenske putanje `_*` su privatne i NIKADA se ne prate** (`_tasks/`, `_references/`, `_mono_repo/`,
  `_ideia/`, `_cache/` i sve buduće `_<name>`): postoje samo na disku, git ih ignoriše putem
  usidrenih obrazaca `/_*/` + `/_*`, a neke su zasebni potpuni git repozitoriji (`_tasks` →
  privatni udaljeni repozitorij `_tasks_omniroute`). Nikada nemojte koristiti `git add` za bilo šta unutar njih (obični `add` je
  već blokiran pravilom ignorisanja; nikada nemojte koristiti `-f`) i nikada ih nemojte „čistiti” iz glavnog repozitorija —
  uklanjanje iz praćenja obavlja se pomoću `git rm --cached` kako bi sadržaj ostao na disku. Kontrolna tačka
  `check:tracked-artifacts` (prije potvrđivanja + CI) ne prolazi za BILO KOJU praćenu korijensku putanju koja počinje znakom
  `_`, sadašnju ili buduću. Za pojedinosti o `_tasks` pogledajte strogo pravilo #23.

---

## Ključne konvencije

### Stil koda

- **2 razmaka**, tačke-zarezi, dvostruki navodnici, širina od 100 znakova, završni zarezi prema es5 pravilima (provodi lint-staged putem Prettiera) — pokrenite Prettier nad izmijenjenim datotekama
- **Uvozi**: eksterni → interni (`@/`, `@omniroute/open-sse`) → relativni
- **Imenovanje**: datoteke=camelCase/kebab, komponente=PascalCase, konstante=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = greška svuda; `no-explicit-any` = **greška** u `open-sse/` i `tests/` (od #6218 — postojeća kršenja su zamrznuta u `config/quality/eslint-suppressions.json`, a nova se moraju ispraviti; `npm run lint` primjenjuje izuzetke i to je naredba koju CI pokreće)
- **TypeScript**: `strict: false`, ciljni standard ES2022, modul esnext, razrješavanje bundler. Preferirajte eksplicitne tipove.

### Baza podataka

- **Uvijek** koristite domenske module iz `src/lib/db/` — **nikada** ne pišite sirovi SQL u rutama ili obrađivačima
- **Nikada** nemojte koristiti zbirni uvoz iz `localDb.ts` — uvozite određene module iz `src/lib/db/*`
- Singleton baze podataka: `getDbInstance()` iz `src/lib/db/core.ts` (WAL vođenje dnevnika)
- Migracije: `src/lib/db/migrations/` — verzionirane SQL datoteke, idempotentne, izvršavaju se unutar transakcija

### Obrada grešaka

- Koristite try/catch sa specifičnim tipovima grešaka i evidentirajte ih uz pino kontekst
- Nikada nemojte zanemariti greške u SSE tokovima — za čišćenje koristite signale za prekid
- Vraćajte odgovarajuće HTTP statusne kodove (4xx/5xx)

### Sigurnost

- **Nikada** nemojte koristiti `eval()`, `new Function()` ili implicitni eval
- Validirajte sve ulazne podatke pomoću Zod shema
- Šifrirajte pristupne podatke u mirovanju (AES-256-GCM); nikada ne evidentirajte SQLite ključeve za šifriranje
- Sanitizirajte korisnički HTML pomoću DOMPurify
- Lista zabranjenih zaglavlja prema nadređenom servisu: `src/shared/constants/upstreamHeaders.ts` — pri izmjenama uskladite sanitizaciju, Zod sheme i jedinične testove
- **Javni pristupni podaci nadređenih servisa** (na primjer, OAuth client_id/secret vrijednosti ili Firebase Web ključevi izdvojeni iz javnih CLI alata): **MORAJU** biti ugrađeni putem `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` — **nikada** kao string literali. Obavezni obrazac potražite u `docs/security/PUBLIC_CREDS.md`.
- **Odgovori o greškama** (HTTP / SSE / izvršitelj / MCP obrađivač): **MORAJU** prolaziti kroz `buildErrorBody()` ili `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — **nikada** ne stavljajte sirovi `err.stack` ili `err.message` u tijelo odgovora. Pogledajte `docs/security/ERROR_SANITIZATION.md`.
- **Shell naredbe sastavljene od varijabli**: kada pozivate `exec()`/`spawn()` sa skriptom kojoj su potrebne vrijednosti tokom izvršavanja, proslijedite ih putem opcije `env` (automatski escapirane za shell) — **nikada** nemojte interpolirati nepouzdane/eksterne putanje u tijelo skripte. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Biblioteke koje su podrazumijevano sigurne** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): pri dodavanju novih sigurnosno osjetljivih površina preferirajte Helmet.js, DOMPurify, ssrf-req-filter, safe-regex i Google Tink umjesto prilagođenih implementacija.

---

## Tačnost dokumentacije

Dokumentacija mora opisivati provjereno, a ne pretpostavljeno ponašanje.

1. Prije dokumentiranja naziva API-ja, krajnje tačke, putanje, CLI naredbe ili varijable okruženja,
   potražite je pomoću: `rg -n "name" src/ open-sse/ bin/`. Ako nema podudaranja u izvornom kodu, nemojte
   je dokumentirati.
2. Izmjerite promjenjive količine umjesto da ih pišete po sjećanju: koristite `wc -l <file>` ili
   naredbu za brojanje specifičnu za direktorij.
3. Kopirajte primjere koda iz funkcionalne upotrebe ili ih pokrenite. Preferirajte vezu na izvor, kao što je
   `path/to/file.ts:line`, umjesto izmišljenog potpisa.
4. Pokrenite `npm run check:docs-all` za izmjene unutar `docs/`; uključuje validaciju
   izmišljene dokumentacije.

---

## Uobičajeni scenariji izmjena

Potpuni recepti korak po korak: [`docs/architecture/MODIFICATION_SCENARIOS.md`](docs/architecture/MODIFICATION_SCENARIOS.md). Brzi indeks:

- **Novi pružalac usluga**: prvo provjerite `docs/reference/REMOVED_PROVIDERS.md` (zaštićeno listom blokiranih — nikada ih nemojte ponovo uvoditi), zatim `src/shared/constants/providers.ts` → izvršitelj → prevodilac → OAuth konfiguracija (`resolvePublicCred()`, nikada literalna vrijednost) → `open-sse/config/providerRegistry.ts` → testovi.
- **Dvostruka autentifikacija (više API ključeva) za pružaoca usluga**: dodajte njegov ID u `DUAL_AUTH_PROVIDER_IDS` (`src/shared/constants/providers.ts`) + ažurirajte njegov `authHint`; svaki ključ postaje zaseban red veze, a rotira ih `getProviderCredentials()`.
- **Nova API ruta**: `src/app/api/v1/<route>/route.ts` — CORS → Zod → opcionalna autentifikacija → obrađivač u `open-sse/handlers/`; greške putem `buildErrorBody()`; testovi potvrđuju da nema curenja praćenja steka.
- **Novi DB modul**: `src/lib/db/<module>.ts` (`getDbInstance`) → migracija ako postoje nove tabele → testovi.
- **Novi MCP alat**: `open-sse/mcp-server/tools/` (Zod shema) → registracija → opseg → testovi.
- **Nova A2A vještina**: `src/lib/a2a/skills/` → `A2A_SKILL_HANDLERS` → kartica agenta → testovi + tabela u dokumentaciji.
- **Novi agent u oblaku**: `src/lib/cloudAgent/agents/` (proširuje `CloudAgentBase`) → `registry.ts` → OAuth → testovi + dokumentacija.
- **Nova ugrađena usluga**: instalacijski program → `bootstrap.ts` → inicijalni podaci baze podataka → 8 API krajnjih tačaka + zaštita `isLocalOnlyPath()` → kartica korisničkog interfejsa → dokumentacija + OpenAPI → testovi.
- **Zaštitna mjera / evaluacija / vještina / webhook / odredište za izvoz dnevnika**: pogledajte detaljni dokument.

---

## Referentna dokumentacija

Za svaku netrivijalnu izmjenu prvo pročitajte odgovarajući detaljni vodič:

- Navigacija repozitorija — `docs/architecture/REPOSITORY_MAP.md` · Arhitektura — `docs/architecture/ARCHITECTURE.md` · Inženjerska referenca — `docs/architecture/CODEBASE_DOCUMENTATION.md`
- Auto-Combo (bodovanje prema 16 faktora, 20 strategija) — `docs/routing/AUTO-COMBO.md` · Ponovno izvođenje zaključivanja — `docs/routing/REASONING_REPLAY.md`
- Otpornost (3 mehanizma + otklanjanje grešaka) — `docs/architecture/RESILIENCE_GUIDE.md`
- Recepti za izmjene — `docs/architecture/MODIFICATION_SCENARIOS.md`
- Okvir za vještine — `docs/frameworks/SKILLS.md` · Radar (sloj kataloga besplatnih modela) — `docs/frameworks/RADAR.md` · Memorijski sistem (FTS5 + Qdrant) — `docs/frameworks/MEMORY.md`
- Agenti u oblaku — `docs/frameworks/CLOUD_AGENT.md` · Protokoli agenata (A2A / ACP / Cloud) — `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`
- Zaštitne mjere (PII / ubacivanje naredbi / obrada slika) — `docs/security/GUARDRAILS.md` · Javne vjerodajnice za vanjske usluge (Gemini/itd.) — `docs/security/PUBLIC_CREDS.md` · Sanitizacija poruka o greškama — `docs/security/ERROR_SANITIZATION.md` · Usklađenost / revizija — `docs/security/COMPLIANCE.md` · Prikrivenost (TLS / otisak) — `docs/security/STEALTH_GUIDE.md`
- Evaluacije — `docs/frameworks/EVALS.md` · Webhookovi — `docs/frameworks/WEBHOOKS.md` · Izvoz dnevnika (dnevnici poziva → BigQuery/…) — `docs/frameworks/LOG-EXPORT.md`
- Tok autorizacije — `docs/architecture/AUTHZ_GUIDE.md`
- MCP server — `docs/frameworks/MCP-SERVER.md` · A2A server — `docs/frameworks/A2A-SERVER.md`
- API referenca + OpenAPI — `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` · Katalog pružalaca usluga (automatski generisan) — `docs/reference/PROVIDER_REFERENCE.md`
- Tuneli — `docs/ops/TUNNELS_GUIDE.md` · Tok izdanja — `docs/ops/RELEASE_CHECKLIST.md` · Protokol radnog stabla — `docs/ops/WORKTREE_ISOLATION.md` · Detalji strogih pravila — `docs/ops/HARD_RULES_DETAIL.md` · Upozorenja pri izgradnji + rješavanje problema s Bunom — `docs/ops/BUILD_WARNINGS.md`
- Electron desktop aplikacija — `docs/guides/ELECTRON_GUIDE.md` · VS Code Copilot Chat (OmniCopilot ekstenzija) — `docs/guides/VSCODE-COPILOT.md`
- Ugrađene usluge — `docs/frameworks/EMBEDDED-SERVICES.md` · Kontrole kvaliteta (inventar, profili izvršavanja, pravila liste dozvoljenih stavki) — `docs/architecture/QUALITY_GATES.md`

---

## Testiranje

- Jedinični testovi — `npm run test:unit`; pojedinačna datoteka (Node izvorni pokretač testova — većina testova) — `node --import tsx/esm --test tests/unit/your-file.test.ts`
- Vitest (MCP server, autoCombo, keš) — `npm run test:vitest`; svi skupovi testova — `npm run test:all`
- E2E (Playwright) — `npm run test:e2e`; E2E protokola (MCP+A2A) — `npm run test:protocols:e2e` (CI zadatak `test-protocols-e2e`, savjetodavan — #10049); ekosistem — `npm run test:ecosystem` (CI zadatak `test-ecosystem`, blokirajući)
- Prag pokrivenosti — `npm run test:coverage` (67.33 / 67.33 / 72.02 / 65.08 — naredbe/linije/funkcije/grane, provodi ga blokirajući mehanizam postepenog podizanja praga u config/quality/quality-baseline.json; test:coverage sam po sebi ima fiksno postavljen prag od 60); izvještaj — `npm run coverage:report`
- Potpuna matrica testova: `CONTRIBUTING.md` → "Pokretanje testova"

**PR pravilo**: Ako promijenite produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`, morate uključiti ili ažurirati testove u istom PR-u.

**Redoslijed preferiranih slojeva testiranja**: prvo jedinični → integracijski (više modula ili stanje baze podataka) → e2e (samo korisničko sučelje/tok rada). Reprodukcije grešaka zabilježite kao automatizirane testove prije ispravke ili zajedno s njom.

**Oba pokretača testova moraju proći**: `npm run test:unit` i `npm run test:vitest` pokrivaju **datoteke koje se ne preklapaju**; oba su CI zadaci (`test-unit`, `test-vitest`) i moraju biti uspješna prije spajanja — jedan uspješan skup testova može neprimjetno isporučiti neispravne MCP alate ili regresije usmjeravanja.

**Protokol za ispravku grešaka / trijažu problema (Strogo pravilo #18)**: test koji prvo pada, a zatim prolazi (TDD, preferirano) ILI dokumentiran test uživo na produkcijskom VPS-u (`root@192.168.0.15`) zabilježen u PR-u; mijenjajte samo ono za šta neuspjeli test dokazuje da je neispravno. Stablo odluke: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 18.

**Copilot pravilo pokrivenosti**: Kada PR mijenja produkcijski kod, a pokrivenost je ispod 60% (naredbe/linije/funkcije/grane), nemojte samo prijaviti stanje — dodajte ili ažurirajte testove, ponovo pokrenite provjeru praga pokrivenosti, a zatim zatražite potvrdu. U PR izvještaj uključite pokrenute naredbe, promijenjene testne datoteke i konačni rezultat pokrivenosti.

---

## Fokus pregleda

- Operacije nad bazom podataka držite u `src/lib/db/`; nemojte izvršavati sirovi SQL iz ruta.
- Zahtjeve prema pružaocima usluga šaljite putem `open-sse/handlers/`.
- MCP i A2A stranice zadržite kao kartice unutar `/dashboard/endpoint`.
- Očuvajte čišćenje SSE-a, parsiranje zaglavlja ograničenja stope, Zod validaciju i validaciju
  sheme pružaoca usluga.
- Tretirajte Memory i Skills kao sveobuhvatne promjene koje mogu utjecati na MCP alate, cjevovod
  zahtjeva i A2A vještine.
- Nemojte zatvoriti zahtjev za povlačenje doprinosioca nakon korištenja njegovog koda; spojite ga putem GitHuba kako
  bi doprinosilac dobio priznanje.
- **Nikada nemojte spojiti PR koji mijenja površinu s uputama za agente bez izričitog odobrenja
  operatora** — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `llm.txt` (+ preslikane kopije) i
  `skills/**/SKILL.md` izvršavaju se kao autoritativne upute u svakoj AI sesiji; spojena uputa
  kompromituje svako buduće pokretanje agenta. Provjerite pomoću `gh pr diff <N> --name-only` prije svakog
  spajanja. Zapis o incidentu: PR #11770 (2026-09-01) uputio je agente da izvrše skriptu za
  postavljanje treće strane i nehotice je uključen tokom kampanje spajanja; promjena je poništena u #12249.

---

## Artefakti planiranja i istraživanja

`_tasks/` je **zaseban, izolovan git repozitorij** koji glavni repozitorij ignoriše putem gita (`.gitignore` → `_tasks/`) — kanonsko mjesto za radne artefakte (planove, specifikacije/dizajne, istraživanja, primopredaje), verzionirane u vlastitom repozitoriju umjesto da opterećuju glavno OmniRoute stablo. **Strogo pravilo — nikada ne zapisujte rezultate planiranja / istraživanja unutar `docs/` ili korijena repozitorija.** Kad god se u ovom projektu pokrene bilo koji generator plana/specifikacije/istraživanja (superpowers ili neki drugi), spremite rezultate u `_tasks/` koristeći konvenciju imenovanja datoteka:

| Artefakt             | Spremite ovdje                                                |
| -------------------- | ------------------------------------------------------------- |
| Planovi              | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikacije/dizajn | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Istraživanje         | `_tasks/research/…`                                           |
| Primopredaje         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commitujte te artefakte unutar `_tasks/` repozitorija (`git -C _tasks …`), nikada u glavnom repozitoriju.

---

## Git radni tok

```bash
# Nikada ne commitujte direktno na main
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**Prefiksi grana**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format commita** (Conventional Commits): `feat(db): add circuit breaker` — opsezi: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hookovi**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11` + `check:tracked-artifacts`
- **commit-msg**: `check:ai-attribution` — odbija AI/bot `Co-Authored-By` završne oznake i fusnote o AI generisanju u poruci (Strogo pravilo #16; ljudski koautori su dozvoljeni; također je dio `quality.yml` fast-gates petlje (PR→`release/**`) i PR-only `ci.yml` lint koraka (PR→`main`) — #14436)
- **pre-push**: namjerno lagan (samo provjera ispravnosti PATH/npm) — `any-budget` + `tracked-artifacts` već se izvršavaju tokom pre-commita, a CI i dalje provodi obje provjere; njihovo ponovno izvršavanje pri svakom pushu bilo je čisto dvostruko plaćanje (ranije Fase 6A.12 puni pre-push gate; prebačeno u pre-commit u #6716).

### Izolacija worktreeja (OBAVEZNA za svaki razvojni zadatak)

Strogo pravilo #19: jedan worktree + namjenska grana po zadatku, pri čemu se osnovna grana prvo potvrđuje s
operaterom (obično aktivna `release/vX.Y.Z`). Stavke o kojima nema pregovora:

- 🔴 Worktreeji se nalaze ISKLJUČIVO unutar `.claude/worktrees/` — bilo gdje drugdje izlaze izvan tsconfig /
  `.dockerignore` izuzetaka opsega builda (tsconfig `include: **/*` globovi ~70× veći od baze koda →
  `next build` OOM, incident 2026-06-25) i rasipaju worktreeje.
- Ponovo koristite node_modules glavnog checkouta putem **tvrdih linkova** (`cp -al`), **nikada `ln -s`** —
  Turbopack se FATALNO ruši kada se simbolički link razriješi izvan korijena projekta, dok typecheck/lint/testovi
  i dalje prolaze (incident 2026-07-31, #9043).
- Kopirajte i gitignored `.husky/_` (`cp -a <main>/.husky/_ .husky/_`) — bez toga se **nijedan
  pre-commit gate ne izvršava i ništa vas o tome ne obavještava** (59 commita prošlo je mimo
  `scripts/check/check-git-identity.sh`, 2026-08-29 → 09-02). Preferirajte
  `scripts/dev/new-worktree.sh <branch> [base]`, koji sve ovo obavlja i provjerava hook.
- Radite, commitujte, pushujte i otvorite PR — sve iz worktreeja.
- Uklonite samo vlastiti worktree + granu, **po nazivu** (nikada `fix/*`/`feat/*` zamjenskim znakovima —
  druge sesije zadržavaju vlastite). Ne dirajte nijedan worktree koji niste kreirali.
- Završite svaku sesiju tako da glavni checkout bude vraćen na granu na kojoj je započeo.

Potpuni protokol s komandama i historijom incidenata:
[`docs/ops/WORKTREE_ISOLATION.md`](docs/ops/WORKTREE_ISOLATION.md).

### Provjera zelene osnovne grane (PR-ovi se ne smiju stvarati crveni)

Prije kreiranja grane, spajanja osnovne grane u PR granu, masovnog preusmjeravanja PR-ova ili otvaranja
PR-a, provjerite issue `🔴 Release branch not green: <branch>` na vrhu osnovne grane (oznaka `base-red`):
`gh issue list --repo diegosouzapw/OmniRoute --state open --search "Release branch not green: <base> in:title"`.
Ako je crvena: nikada nemojte obrađivati ili „popravljati” naslijeđene greške u svojoj grani (ispravka base-red stanja predstavlja zaseban,
freeze-gated `fix/release-vX.Y.Z-basereds` PR); PR koji je ipak otvoren u svom tijelu sadrži
`⚠️ base-red inherited: #<issue>`. Potpuni postupak: `docs/ops/WORKTREE_ISOLATION.md`.

### Sync-back spajanja koriste fast-forward, nikada squash

Sync-back `main → release/vX+1` spaja se kao postojeći merge commit
(`git push origin <head>:refs/heads/release/vX+1`), nikada putem squasha — squash uklanja `main` iz
historije release grane, pa sljedeći sync-back ponovo stvara konflikte u svakoj datoteci (551 na v3.8.50 → v3.8.51).
Nakon spajanja, `git merge-base --is-ancestor origin/main origin/release/vX+1` mora vratiti true.
Koraci + provjera zamrzavanja osnovne grane: `docs/ops/WORKTREE_ISOLATION.md` → "Sync-back landings".

---

## Doprinosi uzvodnom repozitoriju

Ova radna kopija je fork repozitorija `diegosouzapw/OmniRoute`. Promjene namijenjene isključivo implementaciji forka i ličnoj automatizaciji nemojte uključivati u uzvodne PR-ove. Rad na uzvodnom repozitoriju započnite iz aktivne zadane uzvodne grane, a ne iz grane `main` (`git fetch upstream && git switch -c <branch-name> upstream/<default-branch>`), u PR-u ciljajte istu granu izdanja, pripremite samo predviđene datoteke, pokrenite ciljane provjere i koristite poruku u formatu Conventional Commits (na primjer, `docs: slim AGENTS.md`).

---

## Okruženje

- **Izvršno okruženje**: Node.js ≥22.22.2 <23 || ≥24.0.0 <27, ES Modules — **jedino podržano** izvršno okruženje za objavljeni `omniroute` CLI, server i testne pakete (`node:test` + vitest); `engines.node` je mjerodavan, a krajnjim korisnicima Bun nikada nije potreban. Postoji **neobavezna putanja kompatibilnosti s `bun:sqlite`** kako bi se globalna Bun instalacija (`bun install -g omniroute`) mogla pokrenuti bez paketa `better-sqlite3` (adapter upravljačkog programa + pokretanje procesa prilagođeno Bunu); to **nije** podržano izvršno okruženje — bez garancija podrške — i svaka promjena izvršnog okruženja specifična za Bun MORA očuvati lanac Node upravljačkog programa/zamjenskog rješenja i uključivati Bun test (`test:bun:db`) ili izričit razlog zbog kojeg se putanja odnosi samo na Node.
- **Bun (pokretač skripti za izgradnju/razvoj + samo osnovna provjera kompatibilnosti)**: Bun `1.4.2` je fiksiran kao **tačna devDependency** (obezbijeđen putem postojećeg `npm ci` koristeći platformske binarne datoteke `@oven/bun-*` iz datoteke zaključavanja — bez `setup-bun`/ad hoc instalacije). Izvršava **samo** dozvoljeni skup TypeScript skripti za kontrolne tačke/generatore (zamjenjujući `node --import tsx` radi bržeg pokretanja): CI provjere `check:provider-consistency`, `check:compression-budget`, `check:known-symbols`; izvan CI-ja `gen:provider-reference`, `bench:compression`; kao i paket osnovnih provjera kompatibilnosti `test:bun:db`. **NEMOJTE proširivati upotrebu Buna na `npm install`, izgradnju (`build:cli*`), `check:pack-artifact`, podržano objavljeno izvršno okruženje ili glavne pokretače testova** — oni ostaju na Nodeu. Svaka nova skripta koja poziva Bun prvo mora biti potvrđena kao bajt-po-bajt identična izlazu koji proizvodi `node --import tsx`. U slučaju neuspjeha Buna (`bun: not found` ili zamjenska binarna datoteka zbog preskočenog koraka `postinstall`): `docs/ops/BUILD_WARNINGS.md` → "Bun script-runner failures".
- **TypeScript**: 6.0+, cilj ES2022, modul esnext, rezolucija bundler
- **Aliasi putanja**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Zadani port**: 20128 (API + kontrolna ploča na istom portu)
- **Direktorij podataka**: varijabla okruženja `DATA_DIR`, zadana vrijednost je `~/.omniroute/`
- **Ključne varijable okruženja**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Postavljanje: `cp .env.example .env`, zatim generišite `JWT_SECRET` (`openssl rand -base64 48`) i `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Kontrolne tačke kvaliteta i mehanizmi postepenog pooštravanja

Za inventar kontrolnih tačaka kvaliteta, profile izvršavanja i operativne procedure pročitajte
[`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md).
`config/quality/gate-manifest.json` bilježi npm aliase povezane s validacijom i njihove
tačne naredbe; datoteke tokova rada definišu poslove i okidače događaja. Aliase, datoteke
skripti, poslove i instance matrice mjerite kao zasebne jedinice za SHA kandidata.

**Brzi pregled:**

- Kontrolne tačke u poslovima `lint` + `docs-sync-strict`: kontrolne tačke pravila s prolazom/padom —
  ispravite kršenje ili dodajte unos na listu dozvoljenih uz komentar s obrazloženjem + broj zadatka.
- Kontrolne tačke u poslu `quality-gate`: postepeno pooštravanje — metrike (ESLint upozorenja, pokrivenost koda, dupliciranje,
  složenost) ne smiju se pogoršati u odnosu na `quality-baseline.json`. Ažurirajte putem
  `npm run quality:ratchet -- --update` kada se metrika zaista poboljša.
- Posao `test-vitest` pokreće `npm run test:vitest` (MCP alati, autoCombo, keš) — blokirajuće.
  `test:vitest:ui` je blokirajući od PR-a #7127.
- **Faza ubrzanog razvoja (2026-08-30 → v4.0)**: svaka brojčana osnovna vrijednost ublažena je za 20%, a `--require-tighten` je savjetodavan (`quality-baseline.json` → `_policy`); noćni posao `baseline-headroom` prati koliko je budžeta preostalo u zadatku "📈 Baseline headroom". Pogledajte `docs/architecture/QUALITY_GATES.md` → "Velocity phase".

**Pravila liste dozvoljenih (sažeto):** ispravite uzrok; listu dozvoljenih koristite samo za prethodno postojeća kršenja koja ne možete ispraviti u istom PR-u (komentar s obrazloženjem + broj zadatka). Zastarjele unose otkriva provjera zastarjelosti dodana u Fazi 6A.3.

---

## Stroga pravila

Brojevi pravila su nepromjenjivi i navode se u skriptama i dokumentaciji — nikada ih nemojte mijenjati. Ako je pravilo u nastavku
navedeno u skraćenom obliku, njegov potpuni obavezujući tekst, obrazloženje i historija incidenata nalaze se u
[`docs/ops/HARD_RULES_DETAIL.md`](docs/ops/HARD_RULES_DETAIL.md) pod istim brojem.

1. Nikada ne predaj tajne ili pristupne podatke u repozitorij
2. Nikada nemoj koristiti barrel-import iz `localDb.ts` — uvozi određene module iz `src/lib/db/*`
3. Nikada nemoj koristiti `eval()` / `new Function()` / implicitni eval
4. Nikada ne predaj izmjene direktno u `main`
5. Nikada nemoj pisati sirovi SQL u rutama — koristi module iz `src/lib/db/`
6. Nikada nemoj prešutno zanemarivati greške u SSE tokovima
7. Uvijek validiraj ulazne podatke pomoću Zod shema
8. Uvijek uključi testove kada mijenjaš produkcijski kod
9. Pokrivenost ne smije pasti ispod osnovne vrijednosti zamrznute u `quality-baseline.json` (ratchet); apsolutni minimum iznosi 60% (naredbe/linije/funkcije/grane). Ažuriraj osnovnu vrijednost putem `npm run quality:ratchet -- --update` samo kada se pokrivenost stvarno poboljša. Pogledaj `docs/architecture/QUALITY_GATES.md`.
10. Nikada nemoj zaobilaziti Husky hookove (`--no-verify`, `--no-gpg-sign`) bez izričitog odobrenja operatora.
11. Nikada nemoj ugrađivati javni upstream OAuth client_id/secret ili Firebase Web ključeve kao string literale — uvijek ih pribavljaj putem `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Pogledaj `docs/security/PUBLIC_CREDS.md`.
12. Nikada nemoj vraćati sirove `err.stack` / `err.message` vrijednosti u HTTP / SSE / executor odgovorima — uvijek ih provedi kroz `buildErrorBody()` ili `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Pogledaj `docs/security/ERROR_SANITIZATION.md`.
13. Nikada nemoj interpolirati vanjske putanje ili runtime vrijednosti u shell skripte proslijeđene funkcijama `exec()`/`spawn()` — umjesto toga ih proslijedi putem opcije `env`. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nikada nemoj odbaciti CodeQL / Secret-Scanning upozorenje bez (a) prethodne provjere navedene dokumentacije obrazaca kako bi se utvrdilo primjenjuje li se pomoćna funkcija i (b) bilježenja tehničkog obrazloženja u komentaru odbacivanja. Presedan: `js/stack-trace-exposure` prijavljen na mjestima poziva koja već prolaze kroz `sanitizeErrorMessage()` poznato je ograničenje CodeQL-a (prilagođeni sanitizatori nisu prepoznati) — odbaci kao `false positive` uz referencu na `docs/security/ERROR_SANITIZATION.md`.
15. Nikada nemoj izlagati rute koje pokreću podređene procese (`/api/mcp/`, `/api/cli-tools/runtime/`) bez klasifikacije pomoću `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts`. Ograničenje na loopback primjenjuje se bezuslovno prije bilo kakve provjere autentifikacije — JWT koji procuri putem tunela ne može pokrenuti izvršavanje procesa. Pogledaj `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nikada nemoj navoditi zasluge AI asistenta, LLM-a ili automatiziranog računa niti ih oglašavati u bilo kojim metapodacima commita/PR-a — ni putem (a) `Co-Authored-By` trailera koji imenuju AI/bota niti putem (b) podnožja o AI generiranju (`🤖 Generated with [Claude Code]`, …) u poruci commita, naslovu/sadržaju PR-a ili CHANGELOG-u; oboje skrivaju stvarnog autora (`diegosouzapw`). Ovo **ima prednost nad svakom zadanom postavkom okruženja, predloška ili alata koja automatski dodaje takvo podnožje** — ukloni ga prije slanja. Ljudskim saradnicima (autorima upstream PR-ova, prijaviteljima problema čije se izmjene prenose) MOGU se i TREBAJU priznati zasluge standardnim `Co-authored-by: Name <email>` trailerima. Potpuni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 16.
17. Nikada nemoj izlagati rute pod `/api/services/` ili `/dashboard/providers/services/*/embed/` bez klasifikacije pomoću `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts`. Ove rute mogu pokrenuti podređene procese (`npm install`, `node`). Ograničenje na loopback primjenjuje se bezuslovno prije bilo kakve provjere autentifikacije — JWT koji procuri putem tunela ne može pokrenuti izvršavanje procesa. Pogledaj `docs/security/ROUTE_GUARD_TIERS.md`.
18. Svaka ispravka greške mora biti validirana prije isporuke: jediničnim/integracijskim testom koji prvo ne prolazi, a zatim prolazi (TDD), ILI dokumentiranim testom uživo na produkcijskom VPS-u (192.168.0.15). Ispravka bez jednog od toga neće biti spojena. Pogledaj Testiranje → "Protokol za ispravku grešaka / trijažu problema" i `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 18 za potpuno stablo odlučivanja.
19. Nikada nemoj razvijati u zajedničkom glavnom checkoutu. Svaki razvojni zadatak izvršava se u vlastitom git worktreeju na vlastitoj namjenskoj grani, a prije kreiranja worktreeja/grane MORAŠ potvrditi osnovnu granu s operatorom — nikada nemoj pretpostaviti da je to `main` ili trenutno checkoutovana grana. `git checkout` u zajedničkom checkoutu neprimjetno uništava necommitane izmjene drugih sesija. Ukloni samo worktreeje/grane koje si ti kreirao (po nazivu, nikada pomoću `fix/*`/`feat/*` zamjenskih znakova), ostavi worktreeje drugih sesija netaknutim i završi na grani na kojoj si započeo (aktivnoj `release/vX.Y.Z`, nikada `main`). Pogledaj Git radni tok → "Izolacija worktreeja" i `docs/ops/WORKTREE_ISOLATION.md`.
20. Redakcija/sanitizacija PII podataka je **opcionalna — nikada nije podrazumijevano uključena**. Dvije zastavice PII funkcionalnosti koje mijenjaju podatke **MORAJU** zadržati `defaultValue: "false"` u `src/shared/constants/featureFlagDefinitions.ts`: `PII_REDACTION_ENABLED` (na strani zahtjeva) i `PII_RESPONSE_SANITIZATION` (odgovor + streaming). Promjena bilo koje zadane vrijednosti na `"true"` zahtijeva izričito odobrenje operatora; uključivanje je zasebno za svakog operatora, nikada nije prešutna zadana postavka. Zaštita od regresije: `tests/unit/pii-opt-in-default.test.ts`. Potpuni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 20.
21. **Zamrzavanje izdanja — ZAMRZNUTA grana izdanja pripada voditelju izdanja; razvoj se NE zaustavlja (model paralelnog ciklusa, 2026-07-04).** Prije spajanja **bilo kojeg** PR-a, svaki tok rada kampanje **MORA** provjeriti `gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open`. Ako je aktivno: **NIKADA nemoj spajati u zamrznutu `release/vX.Y.Z`** — preusmjeri PR na **najvišu** `release/v*` (`gh pr edit <N> --base release/vX+1`, zatim PROVJERI pomoću `gh pr view <N> --json baseRefName` — uređivanje neprimjetno ne uspijeva) i spoji ga na uobičajen način; **Stavi na HOLD samo kada JE najviša release/v\* grana zamrznuta grana**. **⛔ SAMO `/generate-release` smije pokrenuti zamrzavanje izdanja (faza 0a; ukida se u fazi 12c)** — nikada ga nemoj samostalno otvoriti, produžiti, ponovo otvoriti ili zatvoriti (svako drugo zamrzavanje zahtijeva izričitu saglasnost operatora). Potpuni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 21.
22. **Sigurnost između sesija — na ovom repozitoriju istovremeno radi MNOGO paralelnih sesija/agenata; nikada nemoj ometati tuđi rad koji je u toku.** Dvije apsolutne zabrane (obje proizlaze iz incidenata koji se ponavljaju):

    - **(a) Nikada ne koristite `git stash` / `git stash pop` — NIGDJE u ovom repozitoriju, uključujući unutar izoliranog worktreeja i unutar bilo kojeg podagenta kojeg pokrenete.** `git stash` djeluje nad **zajedničkim spremištem objekata repozitorija**, a ne nad radnim stablom pojedinačnog worktreeja — stash iz jedne sesije može neprimjetno prebrisati ili vratiti nepotvrđene izmjene druge paralelne sesije. Umjesto toga, upoređujte s osnovnom referencom koristeći `git show <ref>:<path>` ili `git diff <ref> -- <path>` — nikada ne sklanjajte svoje stablo u stash kako biste ga „očistili“. **Ovu zabranu doslovno uključite u prompt svakog podagenta koji radi s gitom.**
    - **(b) Nikada nemojte spajati, pushati, rebaseati niti prisilno pushati PR / granu / worktree na kojem druga sesija aktivno radi** — uključujući PR čiji je head aktivni worktree za ispravke u `.claude/worktrees/` koji **niste** kreirali, čak i kada koristi isti identitet `diegosouzapw`: **Stavite na HOLD i dopustite vlasničkoj sesiji da ga spoji.** **Prije** spajanja ili pushanja na bilo koji PR koji niste kreirali u _ovoj_ sesiji, pokrenite `git worktree list` i ponovo provjerite `gh pr view <N> --json state,headRefOid`. (Pojačava Pravilo #19.)

    Potpuni tekst + incidenti: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 22.

23. **Struktura `_tasks/` je NEDODIRLJIVA — dozvoljeno je samo dodavanje/uređivanje.** To je ZASEBAN git repozitorij
    (privatni remote `diegosouzapw/_tasks_omniroute`) montiran kao stvarni direktorij u korijenu
    glavnog checkouta. Apsolutna pravila: (a) NIKADA ne premještati, preimenovati, brisati, prazniti niti
    pretvarati `_tasks` u symlink; sesije smiju samo KREIRATI ili UREĐIVATI datoteke unutar njega;
    (b) NIKADA ne pratiti `_tasks` (čak ni kao symlink) u glavnom repozitoriju — praćeni blob bio je
    osnovni uzrok DVA brisanja (2026-08-08 i 2026-08-10); (c) nakon svakog značajnog upisa,
    `git -C _tasks add -A && git -C _tasks commit && git -C _tasks push` — često pushanje predstavlja
    stvarnu sigurnosnu kopiju; (d) ponoviti ovu zabranu DOSLOVNO u promptu svakog podagenta koji radi s gitom;
    (e) ako se `_tasks` pojavi kao neispravan symlink, NE commitati ništa — vratiti ga s remotea i
    obavijestiti operatera. Gate `check:tracked-artifacts` (pre-commit + CI) blokira praćenje `_tasks`
    u bilo kojem obliku. Potpuni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 23.

---

## Saznanja o sanitizaciji ličnih podataka i tokova

### 1. Sigurnost regularnih izraza (ReDoS)

Svi obrasci regularnih izraza koji se podudaraju s nizovima promjenjive dužine (npr. IPv6 adrese, kreditne kartice) moraju koristiti strogo ograničene sekvence koje se ne preklapaju (npr. ograničiti broj ponavljanja pomoću ograničenih raspona `{1,7}`) kako bi se spriječilo katastrofalno vraćanje unazad prilikom obrade nepouzdanih ulaznih podataka.

### 2. Rukovanje SSE snimcima stanja

Prilikom parsiranja tokova LLM odgovora (npr. Responses API), provjerite predstavlja li dio toka konačni snimak stanja (`done` ili `completed` događaji). Tekst snimka stanja mora se sanitizirati direktno kao samostalan niz znakova (zaobilazeći rotirajuće međuspremnike razlika) kako bi se spriječilo dupliciranje teksta na kraju toka.

### 3. Ručice baze podataka u testovima

Osigurajte da svi jedinični testovi koji pokreću migracije baze podataka ili uspostavljaju SQLite veze pozovu `resetDbInstance()` i pravilno očiste/zatvore sve ručice baze podataka u `test.after(...)` hooku. Neoslobađanje ručica veza s bazom podataka uzrokovat će da se Nodeov izvorni pokretač testova zaglavi na neodređeno vrijeme.

---

## Pristup lokalnom razvojnom okruženju

Kontrolna tabla nalazi se na URL-u/portu koji odabere operater (zadano `http://localhost:20128`). Pristupni podaci specifični su za operatera: **početna administratorska lozinka** čita se iz `INITIAL_PASSWORD` pri prvoj instalaciji (zadana vrijednost je `CHANGEME` u `.env.example`; promijenite je odmah nakon prve prijave); za **lokalne VPS / dijeljene razvojne okoline**, pitajte operatera — pristupni podaci nalaze se u njegovom ličnom trezoru, a NE u ovom repozitoriju. Svaki pristupni podatak uočen u prethodnoj verziji ove datoteke bio je demonstracijska vrijednost koja nije namijenjena produkciji; smatrajte ga kompromitiranim i nemojte ga ponovo koristiti.

<!-- BEGIN:nextjs-agent-rules -->

# Ovo NIJE Next.js koji poznajete

Ova verzija sadrži nekompatibilne promjene — API-ji, konvencije i struktura datoteka mogu se razlikovati od podataka na kojima ste obučeni. Prije pisanja bilo kakvog koda pročitajte odgovarajući vodič u `node_modules/next/dist/docs/` (razriješeno u odnosu na direktorij ove datoteke; u monorepozitorijima paket `next` možda neće biti vidljiv iz korijena repozitorija). Obratite pažnju na obavijesti o zastarjelosti.

Ovaj blok piše i ponovo dodaje `next dev` — provjerite u `node_modules/next/dist/server/lib/generate-agent-files.js`. Njegovo uklanjanje iz diffa samo će ponovo stvoriti promjenu koja nije commitovana; commitovanje ovog bloka zajedno s vašim radom održava stablo čistim.

<!-- END:nextjs-agent-rules -->
