# OmniRoute agent guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../AGENTS.md) · 🇪🇹 [am](../am/AGENTS.md) · 🇸🇦 [ar](../ar/AGENTS.md) · 🇦🇿 [az](../az/AGENTS.md) · 🇧🇬 [bg](../bg/AGENTS.md) · 🇧🇩 [bn](../bn/AGENTS.md) · 🇨🇿 [cs](../cs/AGENTS.md) · 🇩🇰 [da](../da/AGENTS.md) · 🇩🇪 [de](../de/AGENTS.md) · 🇬🇷 [el](../el/AGENTS.md) · 🇪🇸 [es](../es/AGENTS.md) · 🇪🇪 [et](../et/AGENTS.md) · 🇮🇷 [fa](../fa/AGENTS.md) · 🇫🇮 [fi](../fi/AGENTS.md) · 🇫🇷 [fr](../fr/AGENTS.md) · 🇮🇪 [ga](../ga/AGENTS.md) · 🇮🇳 [gu](../gu/AGENTS.md) · 🇳🇬 [ha](../ha/AGENTS.md) · 🇮🇱 [he](../he/AGENTS.md) · 🇮🇳 [hi](../hi/AGENTS.md) · 🇭🇷 [hr](../hr/AGENTS.md) · 🇭🇺 [hu](../hu/AGENTS.md) · 🇦🇲 [hy](../hy/AGENTS.md) · 🇮🇩 [id](../id/AGENTS.md) · 🇳🇬 [ig](../ig/AGENTS.md) · 🇮🇹 [it](../it/AGENTS.md) · 🇯🇵 [ja](../ja/AGENTS.md) · 🇬🇪 [ka](../ka/AGENTS.md) · 🇰🇭 [km](../km/AGENTS.md) · 🇮🇳 [kn](../kn/AGENTS.md) · 🇰🇷 [ko](../ko/AGENTS.md) · 🇱🇹 [lt](../lt/AGENTS.md) · 🇱🇻 [lv](../lv/AGENTS.md) · 🇮🇳 [ml](../ml/AGENTS.md) · 🇮🇳 [mr](../mr/AGENTS.md) · 🇲🇾 [ms](../ms/AGENTS.md) · 🇲🇹 [mt](../mt/AGENTS.md) · 🇲🇲 [my](../my/AGENTS.md) · 🇳🇵 [ne](../ne/AGENTS.md) · 🇳🇱 [nl](../nl/AGENTS.md) · 🇳🇴 [no](../no/AGENTS.md) · 🇮🇳 [or](../or/AGENTS.md) · 🇮🇳 [pa](../pa/AGENTS.md) · 🇵🇭 [phi](../phi/AGENTS.md) · 🇵🇱 [pl](../pl/AGENTS.md) · 🇵🇹 [pt](../pt/AGENTS.md) · 🇧🇷 [pt-BR](../pt-BR/AGENTS.md) · 🇷🇴 [ro](../ro/AGENTS.md) · 🇷🇺 [ru](../ru/AGENTS.md) · 🇱🇰 [si](../si/AGENTS.md) · 🇸🇰 [sk](../sk/AGENTS.md) · 🇸🇮 [sl](../sl/AGENTS.md) · 🇷🇸 [sr](../sr/AGENTS.md) · 🇸🇪 [sv](../sv/AGENTS.md) · 🇰🇪 [sw](../sw/AGENTS.md) · 🇮🇳 [ta](../ta/AGENTS.md) · 🇮🇳 [te](../te/AGENTS.md) · 🇹🇭 [th](../th/AGENTS.md) · 🇹🇷 [tr](../tr/AGENTS.md) · 🇺🇦 [uk-UA](../uk-UA/AGENTS.md) · 🇵🇰 [ur](../ur/AGENTS.md) · 🇺🇿 [uz](../uz/AGENTS.md) · 🇻🇳 [vi](../vi/AGENTS.md) · 🇳🇬 [yo](../yo/AGENTS.md) · 🇨🇳 [zh-CN](../zh-CN/AGENTS.md) · 🇹🇼 [zh-TW](../zh-TW/AGENTS.md)

---

> **Jedini izvor istine.** Ova datoteka sadrži SVA pravila projekta, konvencije, arhitektonske napomene
> i stroga pravila za svakog AI asistenta koji radi na ovom repozitoriju (Claude Code, Gemini, Codex,
> Copilot i svaki drugi agent). `CLAUDE.md` i `GEMINI.md` samo dodaju razlike specifične za asistenta
> i upućuju nazad na ovu datoteku. Kada je potrebno promijeniti pravilo, promijenite ga OVDJE — nikada ga nemojte ponovo izdvajati u
> datoteku specifičnu za asistenta.

## Brzi početak

```bash
npm install                    # Instalira zavisnosti (automatski generiše .env iz .env.example)
npm run dev                    # Razvojni server na http://localhost:20128
npm run build                  # Produkcijski build (samostalni Next.js 16)
npm run build:release          # Build za izdanje
npm run lint                   # ESLint (očekuje se 0 grešaka; upozorenja su postojala i ranije)
npm run typecheck:core         # TypeScript provjera (treba proći bez problema)
npm run typecheck:noimplicit:core  # Stroga provjera (bez implicitnog any)
npm run test:coverage          # Jedinični testovi + prag pokrivenosti (67.33 / 67.33 / 72.02 / 65.08 — naredbe/linije/funkcije/grane, provodi se blokirajućim mehanizmom postepenog povećavanja u config/quality/quality-baseline.json; test:coverage sam po sebi ima fiksno postavljenih 60)
npm run check                  # Kombinovani lint + test
npm run check:cycles           # Otkriva kružne zavisnosti (savjetodavno — navodi SCC-ove)
npm run check:cycles:ratchet   # Ista provjera, blokira iznad gornje granice iz quality-baseline
npm run check:docs-all         # Pokrenite nakon izmjene dokumentacije (uključuje validaciju izmišljene dokumentacije)
```

Pokretanje testova: pogledajte [Testiranje](#testiranje) u nastavku (prvo pokrenite najuže usmjeren test za izmijenjeni kod).

---

## Kratak pregled projekta

**OmniRoute** — objedinjeni AI proxy/usmjerivač. Jedna krajnja tačka, 376 LLM pružalaca usluga, automatski rezervni izbor.

- API rute — `src/app/api/v1/` (ulazne tačke Next.js App Routera)
- Obrađivači — `open-sse/handlers/` (obrada zahtjeva: razgovor, ugrađivanja itd.)
- Izvršitelji — `open-sse/executors/` (HTTP prosljeđivanje specifično za pružaoca usluga)
- Prevodioci — `open-sse/translator/` (konverzija formata OpenAI↔Claude↔Gemini)
- Transformator — `open-sse/transformer/` (Responses API ↔ Chat Completions)
- Servisi — `open-sse/services/` (kombinovano usmjeravanje, ograničenja brzine, keširanje itd.)
- Baza podataka — `src/lib/db/` (SQLite domenski moduli, 211 migracija)
- Domena/pravila — `src/domain/` (mehanizam pravila, pravila troškova, logika rezervnog izbora)
- MCP server — `open-sse/mcp-server/` (110 alata: 45 kanonskih + moduli za memoriju/vještine/GitHub/skup/gamifikaciju/dodatke/Notion/Obsidian/lokalni korpus/RTK; 3 transporta: stdio / SSE / Streamable HTTP; 33 opsega)
- A2A server — `src/lib/a2a/` (JSON-RPC 2.0 protokol za agente)
- Vještine — `src/lib/skills/` (proširivi okvir za vještine); memorija — `src/lib/memory/` (trajna konverzacijska memorija)

Monorepozitorij: `src/` (Next.js 16 aplikacija), `open-sse/` (radni prostor mehanizma za streaming), `electron/` (desktop aplikacija), `tests/`, `bin/` (ulazna tačka CLI-ja).

---

## Tok obrade zahtjeva

```
Klijent → /v1/chat/completions (Next.js ruta)
  → CORS → Zod validacija → autentifikacija? → provjera pravila → zaštita od ubrizgavanja u prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → provjera keša → ograničenje brzine → kombinovano usmjeravanje?
      → resolveComboTargets() → handleSingleModel() za svako odredište
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() prema uzvodnom servisu → ponovni pokušaj s progresivnim čekanjem
    → prevođenje odgovora → SSE tok ili JSON
    → Ako je Responses API: responsesTransformer.ts TransformStream
```

API rute slijede dosljedan obrazac: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`. Ne postoji globalni Next.js međusoftver — presretanje je specifično za pojedinačnu rutu.

**Kombinovano usmjeravanje** (`open-sse/services/combo.ts`): 20 javnih strategija (priority, weighted, fill-first, round-robin, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, context-relay, fusion, pipeline). Svako odredište poziva `handleSingleModel()` (obavija `handleChatCore()` obradom grešaka po odredištu + provjerama prekidača kola); strategija `fusion` umjesto toga paralelno prosljeđuje zahtjev panelu modela, a model-sudija sintetizira jedan konačni odgovor (`open-sse/services/fusion.ts`). Auto-Combo bodovanje sa 16 faktora + potpuna tabela strategija: `docs/routing/AUTO-COMBO.md`; 3 sloja otpornosti: `docs/architecture/RESILIENCE_GUIDE.md`.

---

## Stanje izvršavanja otpornosti

Tri povezana, ali različita mehanizma privremenih kvarova — prilikom otklanjanja grešaka u usmjeravanju držite njihov **opseg** odvojenim:

- **Prekidač kola pružatelja usluge** — opseg: cijeli pružatelj usluge. 4 stanja (CLOSED/DEGRADED/OPEN/HALF_OPEN); lijeni oporavak — `getStatus()`/`canExecute()` osvježavaju isteklo stanje `OPEN`, bez pozadinskog tajmera.
- **Period mirovanja veze** — opseg: jedna veza/račun/ključ. Lijeno preskakanje putem `rateLimitedUntil` + eksponencijalno odgađanje; završna stanja (`banned`/`expired`/`credits_exhausted`) NISU periodi mirovanja.
- **Blokada modela** — opseg: pružatelj usluge + veza + model. Jedan neispravan model nikada ne onemogućava cijelu vezu (`open-sse/services/accountFallback.ts`).

Zadane vrijednosti: `open-sse/config/constants.ts` → `PROVIDER_PROFILES` (mogu se nadjačati putem
`OMNIROUTE_PROVIDER_BREAKER_*` / `OMNIROUTE_CIRCUIT_BREAKER_*`). Samo statusi na nivou pružatelja usluge
`408/500/502/503/504` aktiviraju prekidač pružatelja usluge — većina statusa `401`/`403`/`429` pripada periodu mirovanja
veze ili blokadi modela. Potpuna referenca za agente (datoteke, stanja, pragovi, otklanjanje grešaka):
[`docs/architecture/RESILIENCE_GUIDE.md` → "Runtime state — agent quick reference"](docs/architecture/RESILIENCE_GUIDE.md#runtime-state--agent-quick-reference).

---

## Mapa repozitorija

Prije unošenja netrivijalne izmjene pročitajte najbliži `AGENTS.md` i povezani detaljni vodič.

- API rute — `src/app/api/v1/` → `docs/architecture/ARCHITECTURE.md`
- Obrada zahtjeva za strujanje — `open-sse/handlers/` → `docs/architecture/ARCHITECTURE.md`
- Izvršavanje i prevođenje pružatelja usluga — `open-sse/executors/`, `open-sse/translator/` → `docs/architecture/CODEBASE_DOCUMENTATION.md`
- Usmjeravanje i otpornost — `open-sse/services/` → `open-sse/services/AGENTS.md`, `docs/routing/AUTO-COMBO.md`
- Baza podataka i migracije — `src/lib/db/`, `src/lib/db/migrations/` → `src/lib/db/AGENTS.md`
- Pravila domene — `src/domain/` → `docs/architecture/ARCHITECTURE.md`
- MCP i A2A — `open-sse/mcp-server/`, `src/lib/a2a/` → `docs/frameworks/MCP-SERVER.md`, `docs/frameworks/A2A-SERVER.md`
- Funkcionalnosti agenta — `src/lib/{acp,memory,skills,cloudAgent}/` → `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`, `docs/frameworks/SKILLS.md`
- Sigurnost i upravljanje — `src/lib/{guardrails,compliance}/`, `src/server/authz/` → `docs/security/GUARDRAILS.md`, `docs/architecture/AUTHZ_GUIDE.md`
- Operacije — `src/mitm/`, moduli tunela, `electron/` → `docs/ops/TUNNELS_GUIDE.md`, `docs/guides/ELECTRON_GUIDE.md`
- UI komplet — `packages/ui-kit/` (isporučeni Keak CI UI komplet; adapteri u `src/shared/components/`) → `docs/architecture/DESIGN_SYSTEM.md`

---

## Smještaj datoteka i urednost korijena repozitorija

- **Testne datoteke**: SVI jedinični testovi, integracijski testovi, testovi ekosistema ili Vitest datoteke MORAJU biti strogo smješteni unutar direktorija `tests/` (npr. `tests/unit/`, `tests/integration/`). NIKADA ne kreirajte testne datoteke u korijenu projekta (`/`).
- **Skripte i pomoćni alati**: SVE skripte za održavanje, otklanjanje grešaka, generiranje ili eksperimentiranje (`.cjs`, `.mjs`, `.js`, `.ts`) MORAJU biti smještene strogo unutar jednog od poddirektorija direktorija `scripts/` (`build/`, `dev/`, `check/`, `docs/`, `i18n/`, `ad-hoc/`, `quality/`, `release/`, `ci/`, `ops/`, `perf/`, `research/`, `sre/`, `vps/`, `homolog/`, `packs/`, `skills/`, `test/`, `cli/`, `compression/`, `compression-eval/`, `devin-bridge/`, `docker/`, `features/`, `router-eval/`). Jednokratni ili eksperimentalni kôd ide u `scripts/ad-hoc/`. NIKADA ne ostavljajte slobodne skripte u korijenu projekta (`/`) ili direktno u direktoriju `scripts/`.

**Korijen projekta SMIJE sadržavati SAMO:**

- Konfiguracijske datoteke (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, `tsconfig*.json`, `playwright.config.ts`, `prettier.config.mjs`, `postcss.config.mjs`, `sonar-project.properties`, `fly.toml`, `docker-compose*.yml`, `Dockerfile`)
- Datoteke zavisnosti (`package.json`, `package-lock.json`)
- Dokumentacijske datoteke (`README.md`, `CHANGELOG.md`, `ROADMAP.md`, `LICENSE`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `llm.txt`)
- CI/CD datoteke i definicije ignoriranja (`.gitignore`, `.dockerignore`, `.npmignore`, `.npmrc`, `.node-version`, `.nvmrc`, `.env.example`)

Prilikom kreiranja _bilo kojih_ testova validacije ili skripti s jednokratnom logikom, prema zadanim postavkama koristite `scripts/ad-hoc/` ili `tests/unit/`, u skladu sa svojim ciljevima. Nemojte zatrpavati korijenski kontekst `/`.

- **Korijenske `_*` putanje su privatne i NIKADA se ne prate** (`_tasks/`, `_references/`, `_mono_repo/`,
  `_ideia/`, `_cache/` i sve buduće `_<name>`): postoje samo na disku, Git ih ignorira putem
  usidrenih obrazaca `/_*/` + `/_*`, a neke su zasebni potpuni Git repozitoriji (`_tasks` →
  privatni udaljeni repozitorij `_tasks_omniroute`). Nikada nemojte koristiti `git add` za bilo šta unutar njih (običan `add` je
  već blokiran pravilima ignoriranja; nikada nemojte koristiti `-f`) i nikada ih nemojte „čistiti“ iz glavnog repozitorija —
  uklanjanje iz praćenja obavlja se pomoću `git rm --cached` kako bi sadržaj ostao na disku. Kontrola
  `check:tracked-artifacts` (prije potvrđivanja izmjena + CI) ne prolazi ako je praćena BILO KOJA korijenska putanja koja počinje znakom
  `_`, sadašnja ili buduća. Za pojedinosti o direktoriju `_tasks` pogledajte strogo pravilo #23.

---

## Ključne konvencije

### Stil koda

- **2 razmaka**, tačke-zarezi, dvostruki navodnici, širina od 100 znakova, es5 završni zarezi (provodi lint-staged putem Prettiera) — pokrenite Prettier nad izmijenjenim datotekama
- **Uvozi**: eksterni → interni (`@/`, `@omniroute/open-sse`) → relativni
- **Imenovanje**: datoteke=camelCase/kebab, komponente=PascalCase, konstante=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = greška svugdje; `no-explicit-any` = **greška** u `open-sse/` i `tests/` (od #6218 — postojeća kršenja su zamrznuta u `config/quality/eslint-suppressions.json`, a nova se moraju ispraviti; `npm run lint` primjenjuje izuzetke i to je ono što CI pokreće)
- **TypeScript**: `strict: false`, cilj ES2022, modul esnext, rezolucija bundler. Preferirajte eksplicitne tipove.

### Baza podataka

- **Uvijek** pristupajte putem domenskih modula u `src/lib/db/` — **nikada** ne pišite sirovi SQL u rutama ili rukovaocima
- **Nikada** ne koristite objedinjeni uvoz iz `localDb.ts` — uvozite određene module iz `src/lib/db/*`
- Jedinstvena instanca baze podataka: `getDbInstance()` iz `src/lib/db/core.ts` (WAL vođenje dnevnika)
- Migracije: `src/lib/db/migrations/` — verzionirane SQL datoteke, idempotentne, izvršavaju se unutar transakcija

### Obrada grešaka

- Koristite try/catch sa specifičnim tipovima grešaka i bilježite ih s pino kontekstom
- Nikada ne zanemarujte greške u SSE tokovima — koristite signale prekida za čišćenje
- Vraćajte odgovarajuće HTTP statusne kodove (4xx/5xx)

### Sigurnost

- **Nikada** ne koristite `eval()`, `new Function()` niti implicitni eval
- Validirajte sve ulaze pomoću Zod shema
- Šifrirajte vjerodajnice u mirovanju (AES-256-GCM); nikada ne bilježite SQLite ključeve za šifriranje
- Sanitizirajte korisnički HTML pomoću DOMPurify
- Lista zabranjenih zaglavlja prema nadređenim servisima: `src/shared/constants/upstreamHeaders.ts` — prilikom izmjena održavajte usklađenost sanitizacije, Zod shema i jediničnih testova
- **Javne vjerodajnice prema nadređenim servisima** (naprimjer, OAuth client_id/secret vrijednosti ili Firebase Web ključevi izdvojeni iz javnih CLI alata): **MORAJU** biti ugrađene putem `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` — **nikada** kao string literali. Obavezni obrazac pogledajte u `docs/security/PUBLIC_CREDS.md`.
- **Odgovori o greškama** (HTTP / SSE / izvršilac / MCP rukovalac): **MORAJU** prolaziti kroz `buildErrorBody()` ili `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — **nikada** ne stavljajte sirovi `err.stack` ili `err.message` u tijelo odgovora. Pogledajte `docs/security/ERROR_SANITIZATION.md`.
- **Shell naredbe sastavljene od varijabli**: kada pozivate `exec()`/`spawn()` sa skriptom kojoj su potrebne vrijednosti tokom izvršavanja, proslijedite ih putem opcije `env` (automatski escapirane za shell) — **nikada** nemojte interpolirati nepouzdane/eksterne putanje u tijelo skripte. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Biblioteke sigurne prema zadanim postavkama** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): pri dodavanju novih sigurnosno osjetljivih površina preferirajte Helmet.js, DOMPurify, ssrf-req-filter, safe-regex i Google Tink umjesto vlastitih implementacija.

---

## Tačnost dokumentacije

Dokumentacija mora opisivati provjereno, a ne pretpostavljeno ponašanje.

1. Prije dokumentovanja naziva API-ja, krajnje tačke, putanje, CLI naredbe ili varijable okruženja,
   potražite ih: `rg -n "name" src/ open-sse/ bin/`. Ako nema podudaranja u izvornom kodu, nemojte ih
   dokumentovati.
2. Izmjerite promjenjive količine umjesto da ih pišete po sjećanju: koristite `wc -l <file>` ili
   naredbu za brojanje specifičnu za direktorij.
3. Kopirajte primjere koda iz funkcionalne upotrebe ili ih pokrenite. Preferirajte poveznicu na izvor, kao što je
   `path/to/file.ts:line`, umjesto izmišljenog potpisa.
4. Pokrenite `npm run check:docs-all` za izmjene unutar `docs/`; ta naredba uključuje validaciju
   izmišljene dokumentacije.

---

## Uobičajeni scenariji izmjena

Potpuni recepti korak po korak: [`docs/architecture/MODIFICATION_SCENARIOS.md`](docs/architecture/MODIFICATION_SCENARIOS.md). Brzi indeks:

- **Novi pružalac**: prvo provjerite `docs/reference/REMOVED_PROVIDERS.md` (zaštićeno listom blokiranih — nikada ne uvodite ponovo), zatim `src/shared/constants/providers.ts` → izvršilac → prevodilac → OAuth konfiguracija (`resolvePublicCred()`, nikada doslovna vrijednost) → `open-sse/config/providerRegistry.ts` → testovi.
- **Dvostruka autentifikacija (više API ključeva) za pružaoca**: dodajte njegov ID u `DUAL_AUTH_PROVIDER_IDS` (`src/shared/constants/providers.ts`) + ažurirajte njegov `authHint`; svaki ključ postaje zaseban red veze, a rotira ih `getProviderCredentials()`.
- **Nova API ruta**: `src/app/api/v1/<route>/route.ts` — CORS → Zod → opcionalna autentifikacija → rukovalac u `open-sse/handlers/`; greške putem `buildErrorBody()`; testovima potvrdite da nema curenja praćenja steka.
- **Novi DB modul**: `src/lib/db/<module>.ts` (`getDbInstance`) → migracija ako postoje nove tabele → testovi.
- **Novi MCP alat**: `open-sse/mcp-server/tools/` (Zod shema) → registracija → opseg → testovi.
- **Nova A2A vještina**: `src/lib/a2a/skills/` → `A2A_SKILL_HANDLERS` → kartica agenta → testovi + tabela u dokumentaciji.
- **Novi agent u oblaku**: `src/lib/cloudAgent/agents/` (proširuje `CloudAgentBase`) → `registry.ts` → OAuth → testovi + dokumentacija.
- **Nova ugrađena usluga**: instalacijski program → `bootstrap.ts` → inicijalni podaci baze → 8 API krajnjih tačaka + zaštita `isLocalOnlyPath()` → kartica korisničkog interfejsa → dokumentacija + OpenAPI → testovi.
- **Zaštitna mjera / evaluacija / vještina / webhook / odredište izvoza dnevnika**: pogledajte detaljnu dokumentaciju.

---

## Referentna dokumentacija

Za svaku netrivijalnu izmjenu prvo pročitajte odgovarajući detaljni vodič:

- Navigacija repozitorija — `docs/architecture/REPOSITORY_MAP.md` · Arhitektura — `docs/architecture/ARCHITECTURE.md` · Inženjerska referenca — `docs/architecture/CODEBASE_DOCUMENTATION.md`
- Auto-Combo (bodovanje sa 16 faktora, 20 strategija) — `docs/routing/AUTO-COMBO.md` · Ponovna reprodukcija zaključivanja — `docs/routing/REASONING_REPLAY.md`
- Otpornost (3 mehanizma + otklanjanje grešaka) — `docs/architecture/RESILIENCE_GUIDE.md`
- Recepti za izmjene — `docs/architecture/MODIFICATION_SCENARIOS.md`
- Okvir za vještine — `docs/frameworks/SKILLS.md` · Radar (sloj kataloga besplatnih modela) — `docs/frameworks/RADAR.md` · Sistem memorije (FTS5 + Qdrant) — `docs/frameworks/MEMORY.md`
- Agenti u oblaku — `docs/frameworks/CLOUD_AGENT.md` · Protokoli agenata (A2A / ACP / Cloud) — `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`
- Zaštitne mjere (PII / ubacivanje / vizija) — `docs/security/GUARDRAILS.md` · Javne pristupne vjerodajnice uzvodnih pružalaca (Gemini/itd.) — `docs/security/PUBLIC_CREDS.md` · Sanitizacija poruka o greškama — `docs/security/ERROR_SANITIZATION.md` · Usklađenost / revizija — `docs/security/COMPLIANCE.md` · Prikrivanje (TLS / otisak) — `docs/security/STEALTH_GUIDE.md`
- Evaluacije — `docs/frameworks/EVALS.md` · Webhookovi — `docs/frameworks/WEBHOOKS.md` · Izvoz dnevnika (dnevnici poziva → BigQuery/…) — `docs/frameworks/LOG-EXPORT.md`
- Tok autorizacije — `docs/architecture/AUTHZ_GUIDE.md`
- MCP server — `docs/frameworks/MCP-SERVER.md` · A2A server — `docs/frameworks/A2A-SERVER.md`
- API referenca + OpenAPI — `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` · Katalog pružalaca (automatski generiran) — `docs/reference/PROVIDER_REFERENCE.md`
- Tuneli — `docs/ops/TUNNELS_GUIDE.md` · Proces izdanja — `docs/ops/RELEASE_CHECKLIST.md` · Protokol radnog stabla — `docs/ops/WORKTREE_ISOLATION.md` · Detalji strogih pravila — `docs/ops/HARD_RULES_DETAIL.md` · Upozorenja pri izgradnji + rješavanje problema s Bunom — `docs/ops/BUILD_WARNINGS.md`
- Electron desktop aplikacija — `docs/guides/ELECTRON_GUIDE.md` · VS Code Copilot Chat (OmniCopilot proširenje) — `docs/guides/VSCODE-COPILOT.md`
- Ugrađene usluge — `docs/frameworks/EMBEDDED-SERVICES.md` · Kontrole kvaliteta (~90 skripti, pravila liste dozvoljenih stavki) — `docs/architecture/QUALITY_GATES.md`

---

## Testiranje

- Jedinični testovi — `npm run test:unit`; pojedinačna datoteka (izvorni Node pokretač testova — većina testova) — `node --import tsx/esm --test tests/unit/your-file.test.ts`
- Vitest (MCP server, autoCombo, keš) — `npm run test:vitest`; svi testni paketi — `npm run test:all`
- E2E (Playwright) — `npm run test:e2e`; E2E protokola (MCP+A2A) — `npm run test:protocols:e2e` (CI zadatak `test-protocols-e2e`, savjetodavni — #10049); ekosistem — `npm run test:ecosystem` (CI zadatak `test-ecosystem`, blokirajući)
- Prag pokrivenosti — `npm run test:coverage` (67.33 / 67.33 / 72.02 / 65.08 — naredbe/linije/funkcije/grane, nametnuto blokirajućim mehanizmom postepenog povećavanja u config/quality/quality-baseline.json; test:coverage sam po sebi ima čvrsto postavljenih 60); izvještaj — `npm run coverage:report`
- Potpuna matrica testiranja: `CONTRIBUTING.md` → "Pokretanje testova"

**PR pravilo**: Ako mijenjate produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`, morate uključiti ili ažurirati testove u istom PR-u.

**Redoslijed prioriteta slojeva testiranja**: prvo jedinični → integracijski (više modula ili stanje baze podataka) → e2e (samo korisničko sučelje/tok rada). Reprodukcije grešaka kodirajte kao automatizovane testove prije ispravke ili zajedno s njom.

**Oba pokretača testova moraju proći**: `npm run test:unit` i `npm run test:vitest` pokrivaju **datoteke koje se ne preklapaju**; oba su CI zadaci (`test-unit`, `test-vitest`) i moraju biti uspješna prije spajanja — jedan uspješan paket testova može neprimjetno isporučiti neispravne MCP alate ili regresije usmjeravanja.

**Protokol za ispravku grešaka / trijažu problema (Strogo pravilo #18)**: test koji prvo pada, a zatim prolazi (TDD, poželjno) ILI dokumentovani test uživo na produkcijskom VPS-u (`root@192.168.0.15`) zabilježen u PR-u; mijenjajte samo ono za šta test koji pada dokazuje da je neispravno. Stablo odluke: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 18.

**Copilot pravilo pokrivenosti**: Kada PR mijenja produkcijski kod, a pokrivenost je ispod 60% (naredbe/linije/funkcije/grane), nemojte samo prijaviti — dodajte ili ažurirajte testove, ponovo pokrenite provjeru praga pokrivenosti, a zatim zatražite potvrdu. U PR izvještaj uključite pokrenute naredbe, izmijenjene testne datoteke i konačni rezultat pokrivenosti.

---

## Fokus pregleda

- Operacije nad bazom podataka držite u `src/lib/db/`; nemojte izvršavati sirovi SQL iz ruta.
- Zahtjeve prema pružaocima šaljite kroz `open-sse/handlers/`.
- MCP i A2A stranice zadržite kao kartice unutar `/dashboard/endpoint`.
- Očuvajte čišćenje SSE-a, parsiranje zaglavlja ograničenja brzine, Zod validaciju i validaciju
  sheme pružaoca.
- Tretirajte Memory i Skills kao sveobuhvatne promjene koje mogu uticati na MCP alate, cjevovod
  zahtjeva i A2A vještine.
- Nemojte zatvarati zahtjev za povlačenje doprinosioca nakon korištenja njegovog koda; spojite ga putem GitHuba kako
  bi doprinosilac dobio priznanje.
- **Nikada nemojte spojiti PR koji utiče na površinu s uputama za agente bez izričitog odobrenja
  operatera** — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `llm.txt` (+ preslike) i
  `skills/**/SKILL.md` svaka AI sesija izvršava kao autoritativne upute; spojena uputa
  ugrožava svako buduće pokretanje agenta. Provjerite pomoću `gh pr diff <N> --name-only` prije svakog
  spajanja. Zapis o incidentu: PR #11770 (2026-09-01) naložio je agentima da izvrše skriptu za
  postavljanje treće strane i bio je uključen tokom kampanje spajanja; vraćeno u #12249.

---

## Artefakti planiranja i istraživanja

`_tasks/` je **zaseban, izolovan git repozitorij** koji glavni repozitorij ignoriše putem gita (`.gitignore` → `_tasks/`) — kanonsko mjesto za radne artefakte (planove, specifikacije/dizajne, istraživanja, primopredaje), verzionirane u vlastitom repozitoriju umjesto da zagađuju glavno OmniRoute stablo. **Strogo pravilo — nikada ne zapisujte rezultate planiranja / istraživanja unutar `docs/` niti u korijenu repozitorija.** Kad god se u ovom projektu pokrene bilo koji generator plana/specifikacije/istraživanja (superpowers ili neki drugi), sačuvajte rezultat u `_tasks/` koristeći konvenciju imenovanja datoteka:

| Artefakt               | Sačuvajte ovdje                                               |
| ---------------------- | ------------------------------------------------------------- |
| Planovi                | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikacije / dizajn | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Istraživanje           | `_tasks/research/…`                                           |
| Primopredaje           | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commitajte te artefakte unutar `_tasks/` repozitorija (`git -C _tasks …`), nikada u glavnom repozitoriju.

---

## Git tok rada

```bash
# Nikada ne commitajte direktno na main
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**Prefiksi grana**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format commita** (Conventional Commits): `feat(db): add circuit breaker` — opsezi: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hookovi**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11` + `check:tracked-artifacts`
- **commit-msg**: `check:ai-attribution` — odbacuje AI/bot `Co-Authored-By` trailere i podnožja o AI generisanju u poruci (Strogo pravilo #16; ljudski koautori su dozvoljeni; također je dio `quality.yml` petlje brzih provjera (PR→`release/**`) i PR-only `ci.yml` lint koraka (PR→`main`) — #14436)
- **pre-push**: namjerno lagan (samo provjera ispravnosti PATH-a/npm-a) — `any-budget` + `tracked-artifacts` već se pokreću pri pre-commitu, a CI i dalje provodi obje provjere; njihovo ponovno pokretanje pri svakom pushu bilo je čisto dvostruko plaćanje (ranije Faza 6A.12, potpuna pre-push provjera; premješteno u pre-commit u #6716).

### Izolacija worktreeja (OBAVEZNA za svaki razvojni zadatak)

Strogo pravilo #19: jedan worktree + namjenska grana po zadatku, pri čemu se osnovna grana prvo
potvrđuje s operaterom (obično aktivna `release/vX.Y.Z`). Zahtjevi bez mogućnosti pregovora:

- 🔴 Worktreeji se nalaze ISKLJUČIVO unutar `.claude/worktrees/` — bilo gdje drugo izmiču isključenjima opsega builda iz tsconfiga /
  `.dockerignore` (`include: **/*` globovi u tsconfigu obuhvataju ~70× veličinu baze koda →
  `next build` OOM, incident 2026-06-25) i raspršuju worktreeje.
- Ponovo koristite node_modules glavnog checkouta putem **tvrdih linkova** (`cp -al`), **nikada `ln -s`** —
  Turbopack se FATALNO ruši na simboličkom linku koji se razrješava izvan korijena projekta, dok typecheck/lint/testovi
  nastavljaju prolaziti (incident 2026-07-31, #9043).
- Kopirajte i gitignored `.husky/_` (`cp -a <main>/.husky/_ .husky/_`) — bez toga se **nijedna
  pre-commit provjera ne pokreće i ništa na to ne upozorava** (59 commita prošlo je mimo
  `scripts/check/check-git-identity.sh`, 2026-08-29 → 09-02). Preferirajte
  `scripts/dev/new-worktree.sh <branch> [base]`, koji obavlja sve navedeno i provjerava hook.
- Radite, commitajte, pushajte i otvorite PR — sve iz worktreeja.
- Uklonite samo vlastiti worktree + granu, **po nazivu** (nikada `fix/*`/`feat/*` zamjenskim znakovima —
  druge sesije zadržavaju vlastite). Ne dirajte worktree koji niste kreirali.
- Svaku sesiju završite tako da glavni checkout bude vraćen na granu na kojoj je započeo.

Potpuni protokol s komandama i historijom incidenata:
[`docs/ops/WORKTREE_ISOLATION.md`](docs/ops/WORKTREE_ISOLATION.md).

### Provjera zelene baze (PR-ovi ne smiju nastati crveni)

Prije kreiranja grane, spajanja baze u PR granu, masovnog ponovnog usmjeravanja PR-ova ili otvaranja
PR-a, provjerite issue `🔴 Release branch not green: <branch>` na vrhu baze (oznaka `base-red`):
`gh issue list --repo cheaper-inference/OmniRoute --state open --search "Release branch not green: <base> in:title"`.
Ako je crvena: nikada nemojte obrađivati niti "popravljati" naslijeđene greške u svojoj grani (ispravka crvene baze ima vlastiti
freeze-gated `fix/release-vX.Y.Z-basereds` PR); PR koji je ipak otvoren u tijelu sadrži
`⚠️ base-red inherited: #<issue>`. Potpuni postupak: `docs/ops/WORKTREE_ISOLATION.md`.

### Sync-back integracije su fast-forward, nikada squash

`main → release/vX+1` sync-back integriše se kao merge commit kakav već jeste
(`git push origin <head>:refs/heads/release/vX+1`), nikada squashovan — squash uklanja `main` iz
release historije i sljedeći sync-back ponovo stvara konflikte u svakoj datoteci (551 na v3.8.50 → v3.8.51).
Nakon integracije, `git merge-base --is-ancestor origin/main origin/release/vX+1` mora vratiti true.
Koraci + provjera zamrzavanja baselinea: `docs/ops/WORKTREE_ISOLATION.md` → "Sync-back landings".

---

## Doprinosi uzvodnom repozitoriju

Ova radna kopija je kanonski repozitorij `cheaper-inference/OmniRoute` (ranije `diegosouzapw/OmniRoute`; stari naziv preusmjerava). Promjene deploymenta namijenjene samo forku i promjene lične automatizacije nemojte uključivati u uzvodne PR-ove. Rad na uzvodnom repozitoriju započnite iz aktivne zadane grane uzvodnog repozitorija, a ne iz `main` (`git fetch upstream && git switch -c <branch-name> upstream/<default-branch>`), u PR-u ciljajte istu granu izdanja, pripremite samo predviđene datoteke, pokrenite ciljane provjere i koristite poruku u formatu Conventional Commits (naprimjer, `docs: slim AGENTS.md`).

---

## Okruženje

- **Izvršno okruženje**: Node.js ≥22.22.2 <23 || ≥24.0.0 <27, ES moduli — **jedino podržano** izvršno okruženje za objavljeni `omniroute` CLI, server i pakete testova (`node:test` + vitest); `engines.node` je mjerodavan i krajnjim korisnicima Bun nikada nije potreban. Postoji **putanja kompatibilnosti s `bun:sqlite` bez garancije uspjeha** kako bi se globalna Bun instalacija (`bun install -g omniroute`) mogla pokrenuti bez `better-sqlite3` (adapter upravljačkog programa + pokretanje procesa prilagođeno Bunu); to **nije** podržano izvršno okruženje — nema garancija podrške — i svaka promjena izvršavanja specifična za Bun MORA sačuvati lanac Node upravljačkog programa/rezervne opcije i uključiti Bun test (`test:bun:db`) ili izričit razlog zašto je putanja namijenjena samo Nodeu.
- **Bun (pokretač skripti za izgradnju/razvoj + samo osnovna provjera kompatibilnosti)**: Bun `1.4.2` je fiksiran kao **tačna devDependency** (osigurava se putem postojećeg `npm ci` koristeći platformne binarne datoteke `@oven/bun-*` iz zaključane datoteke — bez `setup-bun`/ad hoc instalacije). Izvršava **samo** dozvoljeni skup TypeScript skripti za kontrolne tačke/generisanje (zamjenjujući `node --import tsx` radi bržeg pokretanja): CI provjere `check:provider-consistency`, `check:compression-budget`, `check:known-symbols`; izvan CI-ja `gen:provider-reference`, `bench:compression`; kao i paket osnovnih provjera kompatibilnosti `test:bun:db`. **NEMOJTE proširivati upotrebu Buna na `npm install`, izgradnju (`build:cli*`), `check:pack-artifact`, podržano objavljeno izvršno okruženje ili glavne pokretače testova** — oni ostaju na Nodeu. Svaka nova skripta koja poziva Bun prvo mora biti potvrđena kao bajt-po-bajt identična svom izlazu iz `node --import tsx`. U slučaju neuspjeha Buna (`bun: not found` ili zamjenska binarna datoteka zbog preskočenog `postinstall`): `docs/ops/BUILD_WARNINGS.md` → "Bun script-runner failures".
- **TypeScript**: 6.0+, cilj ES2022, modul esnext, razrješavanje bundler
- **Aliasi putanja**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Zadani port**: 20128 (API + kontrolna ploča na istom portu)
- **Direktorij podataka**: varijabla okruženja `DATA_DIR`, zadana vrijednost je `~/.omniroute/`
- **Ključne varijable okruženja**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Postavljanje: `cp .env.example .env`, zatim generišite `JWT_SECRET` (`openssl rand -base64 48`) i `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Kontrolne tačke kvaliteta i mehanizmi postepenog pooštravanja

OmniRoute ima **~90 skripti za kontrolne tačke kvaliteta** (`scripts/check/` + `scripts/quality/`) raspoređenih kroz **9 poslova koji izvršavaju kontrolne tačke** u `.github/workflows/ci.yml`, uz posao brzih kontrolnih tačaka u `quality.yml` (PR→`release/**`) i 5 noćnih tokova rada za kvalitet. Potpuni inventar, pregled po poslovima i operativni postupci: [`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md).

**Brzi pregled:**

- Kontrolne tačke u poslovima `lint` + `docs-sync-strict`: kontrolne tačke pravila prolaz/neuspjeh —
  ispravite kršenje ili dodajte unos na listu dozvoljenih uz komentar s obrazloženjem + prateći problem.
- Kontrolne tačke u poslu `quality-gate`: postepeno pooštravanje — metrike (ESLint upozorenja, pokrivenost koda, dupliciranje,
  složenost) ne smiju nazadovati u odnosu na `quality-baseline.json`. Ažurirajte putem
  `npm run quality:ratchet -- --update` kada se metrika stvarno poboljša.
- Posao `test-vitest` pokreće `npm run test:vitest` (MCP alati, autoCombo, predmemorija) — blokirajuće.
  `test:vitest:ui` je blokirajući od PR-a #7127.
- **Faza ubrzanog razvoja (2026-08-30 → v4.0)**: svaka brojčana početna vrijednost ublažena je za 20%, a `--require-tighten` je savjetodavan (`quality-baseline.json` → `_policy`); noćni posao `baseline-headroom` prati koliko je budžeta preostalo u problemu "📈 Baseline headroom". Pogledajte `docs/architecture/QUALITY_GATES.md` → "Velocity phase".

**Pravila liste dozvoljenih (skraćeno):** ispravite uzrok; listu dozvoljenih koristite samo za prethodno postojeća kršenja koja ne možete ispraviti u istom PR-u (komentar s obrazloženjem + broj problema). Zastarjele unose otkriva provjera zastarjelosti dodana u Fazi 6A.3.

---

## Stroga pravila

Brojevi pravila su stalni i navode se u skriptama i dokumentaciji — nikada ih nemojte mijenjati. Ako je pravilo u nastavku
navedeno u skraćenom obliku, njegov potpuni obavezujući tekst, obrazloženje i historija incidenata nalaze se u
[`docs/ops/HARD_RULES_DETAIL.md`](docs/ops/HARD_RULES_DETAIL.md) pod istim brojem.

1. Nikada ne pohranjujte tajne ili vjerodajnice u commit
2. Nikada ne koristite zbirni uvoz iz `localDb.ts` — uvozite određene module iz `src/lib/db/*`
3. Nikada ne koristite `eval()` / `new Function()` / implicitni eval
4. Nikada ne pravite commit direktno na `main`
5. Nikada ne pišite sirovi SQL u rutama — koristite module iz `src/lib/db/`
6. Nikada nemojte prešutno ignorisati greške u SSE tokovima
7. Uvijek validirajte ulazne podatke pomoću Zod shema
8. Uvijek uključite testove kada mijenjate produkcijski kod
9. Pokrivenost ne smije pasti ispod osnovne vrijednosti zamrznute u `quality-baseline.json` (ratchet); apsolutni minimum je 60% (naredbe/linije/funkcije/grane). Ažurirajte osnovnu vrijednost putem `npm run quality:ratchet -- --update` samo kada se pokrivenost stvarno poboljša. Pogledajte `docs/architecture/QUALITY_GATES.md`.
10. Nikada ne zaobilazite Husky hookove (`--no-verify`, `--no-gpg-sign`) bez izričitog odobrenja operatora.
11. Nikada ne ugrađujte javni upstream OAuth client_id/secret ili Firebase Web ključeve kao string literale — uvijek koristite `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Pogledajte `docs/security/PUBLIC_CREDS.md`.
12. Nikada ne vraćajte sirove `err.stack` / `err.message` vrijednosti u HTTP / SSE / executor odgovorima — uvijek ih usmjerite kroz `buildErrorBody()` ili `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Pogledajte `docs/security/ERROR_SANITIZATION.md`.
13. Nikada ne interpolirajte vanjske putanje ili vrijednosti iz vremena izvođenja kao stringove u shell skripte proslijeđene funkcijama `exec()`/`spawn()` — umjesto toga ih proslijedite putem opcije `env`. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nikada ne odbacujte CodeQL / Secret-Scanning upozorenje bez (a) prethodne provjere gore navedenih dokumenata o obrascima kako biste utvrdili primjenjuje li se pomoćna funkcija i (b) evidentiranja tehničkog obrazloženja u komentaru o odbacivanju. Presedan: `js/stack-trace-exposure` prijavljen na mjestima poziva koja već usmjeravaju podatke kroz `sanitizeErrorMessage()` predstavlja poznato ograničenje CodeQL-a (prilagođeni sanitizatori se ne prepoznaju) — odbacite kao `false positive` uz referencu na `docs/security/ERROR_SANITIZATION.md`.
15. Nikada ne izlažite rute koje pokreću podređene procese (`/api/mcp/`, `/api/cli-tools/runtime/`) bez klasifikacije `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts`. Ograničenje na loopback primjenjuje se bezuslovno prije bilo kakve provjere autentifikacije — JWT koji procuri putem tunela ne može pokrenuti podređeni proces. Pogledajte `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nikada ne navodite niti reklamirajte AI asistenta, LLM ili račun za automatizaciju u bilo kojim metapodacima commita/PR-a — ni (a) `Co-Authored-By` završne zapise koji imenuju AI/bota niti (b) završne napomene o AI generiranju (`🤖 Generated with [Claude Code]`, …) u poruci commita, naslovu/tijelu PR-a ili CHANGELOG-u; oba skrivaju stvarnog autora (`diegosouzapw`). Ovo **ima prednost nad svim podrazumijevanim postavkama okruženja, predloška ili alata koje automatski dodaju takvu završnu napomenu** — uklonite je prije slanja. Ljudskim saradnicima (autorima upstream PR-ova, prijaviteljima problema čije se prijave prenose) MOŽE i TREBA odati priznanje standardnim završnim zapisima `Co-authored-by: Name <email>`. Cijeli tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 16.
17. Nikada ne izlažite rute pod `/api/services/` ili `/dashboard/providers/services/*/embed/` bez klasifikacije `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts`. Ove rute mogu pokretati podređene procese (`npm install`, `node`). Ograničenje na loopback primjenjuje se bezuslovno prije bilo kakve provjere autentifikacije — JWT koji procuri putem tunela ne može pokrenuti podređeni proces. Pogledajte `docs/security/ROUTE_GUARD_TIERS.md`.
18. Svaka ispravka greške mora biti validirana prije isporuke: jediničnim/integracijskim testom koji prvo pada, a zatim prolazi (TDD) ILI dokumentovanim testom uživo na produkcijskom VPS-u (192.168.0.15). Ispravka bez jednog od navedenog neće biti spojena. Pogledajte Testiranje → "Protokol za ispravku grešaka / trijažu problema" i `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 18 za kompletno stablo odlučivanja.
19. Nikada ne razvijajte u zajedničkom glavnom checkoutu. Svaki razvojni zadatak izvršava se u vlastitom git worktreeju na vlastitoj namjenskoj grani, a prije kreiranja worktreeja/grane MORATE potvrditi osnovnu granu s operatorom — nikada ne pretpostavljajte da je to `main` ili trenutno checkoutovana grana. `git checkout` u zajedničkom checkoutu neprimjetno uništava nepotvrđeni rad drugih sesija. Uklanjajte samo worktreejeve/grane koje ste vi kreirali (po imenu, nikada pomoću `fix/*`/`feat/*` zamjenskih obrazaca), ne dirajte worktreejeve drugih sesija i završite na grani na kojoj ste započeli (aktivnoj `release/vX.Y.Z`, nikada na `main`). Pogledajte Git radni tok → "Izolacija worktreeja" i `docs/ops/WORKTREE_ISOLATION.md`.
20. Redakcija/sanitizacija PII podataka je **opcionalna — nikada podrazumijevano uključena**. Dvije zastavice PII funkcionalnosti koje mijenjaju podatke **MORAJU** zadržati `defaultValue: "false"` u `src/shared/constants/featureFlagDefinitions.ts`: `PII_REDACTION_ENABLED` (na strani zahtjeva) i `PII_RESPONSE_SANITIZATION` (odgovor + streaming). Promjena bilo koje podrazumijevane vrijednosti na `"true"` zahtijeva izričito odobrenje operatora; uključivanje je zasebno za svakog operatora, nikada prešutno podrazumijevano. Zaštita od regresije: `tests/unit/pii-opt-in-default.test.ts`. Cijeli tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 20.
21. **Zamrzavanje izdanja — ZAMRZNUTA grana izdanja pripada voditelju izdanja; razvoj se NE zaustavlja (model paralelnih ciklusa, 2026-07-04).** Prije spajanja **bilo kojeg** PR-a svaki radni tok kampanje **MORA** provjeriti `gh issue list --repo cheaper-inference/OmniRoute --label release-freeze --state open`. Ako je zamrzavanje aktivno: **NIKADA ne spajajte u zamrznutu `release/vX.Y.Z`** — promijenite cilj PR-a na **najvišu** `release/v*` (`gh pr edit <N> --base release/vX+1`, zatim PROVJERITE pomoću `gh pr view <N> --json baseRefName` — uređivanje neprimjetno ne uspijeva) i spojite ga na uobičajen način; **Stavite na HOLD samo kada JE najviša grana release/v\* zamrznuta grana**. **⛔ SAMO `/generate-release` smije pokrenuti zamrzavanje izdanja (Faza 0a; ukida se u Fazi 12c)** — nikada ga nemojte samostalno otvoriti, produžiti, ponovo otvoriti ili zatvoriti (svako drugo zamrzavanje zahtijeva izričitu saglasnost operatora). Cijeli tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 21.
22. **Sigurnost između sesija — na ovom repozitoriju istovremeno radi MNOGO paralelnih sesija/agenata; nikada ne ometajte tuđi rad koji je u toku.** Dvije apsolutne zabrane (oba su ponavljajući incidenti):

    - **(a) Nikada ne koristite `git stash` / `git stash pop` — NIGDJE u ovom repozitoriju, uključujući unutar izoliranog worktreeja i unutar bilo kojeg podagenta kojeg pokrenete.** `git stash` djeluje nad **zajedničkim spremištem objekata repozitorija**, a ne nad radnim stablom pojedinačnog worktreeja — stash iz jedne sesije može neprimjetno pregaziti ili vratiti necommitane izmjene druge paralelne sesije. Umjesto toga, poredite s osnovnim refom pomoću `git show <ref>:<path>` ili `git diff <ref> -- <path>` — nikada ne sklanjajte svoje stablo u stash kako biste ga „očistili“. **U prompt svakog podagenta koji koristi git doslovno uključite ovu zabranu.**
    - **(b) Nikada nemojte spajati, pushati, rebaseati niti force-pushati PR / granu / worktree na kojem druga sesija aktivno radi** — uključujući PR čiji je head aktivni worktree za ispravke u `.claude/worktrees/` koji **niste** kreirali, čak i kada koristi isti identitet `diegosouzapw`: **Stavite na HOLD i pustite sesiju koja je vlasnik da ga spoji.** **Prije** spajanja ili pushanja na bilo koji PR koji niste kreirali u _ovoj_ sesiji, pokrenite `git worktree list` i ponovo provjerite `gh pr view <N> --json state,headRefOid`. (Pojačava Pravilo #19.)

    Potpuni tekst + incidenti: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 22.

23. **Struktura `_tasks/` je NEDODIRLJIVA — dozvoljeno je samo dodavanje/uređivanje.** To je ODVOJEN git repozitorij
    (privatni remote `diegosouzapw/_tasks_omniroute`) montiran kao stvarni direktorij u korijenu
    glavnog checkouta. Apsolutna pravila: (a) NIKADA ne premještati, preimenovati, brisati, prazniti niti
    pretvarati `_tasks` u symlink; sesije smiju samo KREIRATI ili UREĐIVATI datoteke unutar njega;
    (b) NIKADA ne pratiti `_tasks` (čak ni kao symlink) u glavnom repozitoriju — praćeni blob bio je
    glavni uzrok DVA brisanja (2026-08-08 i 2026-08-10); (c) nakon svakog relevantnog upisa,
    `git -C _tasks add -A && git -C _tasks commit && git -C _tasks push` — često pushanje predstavlja
    stvarnu sigurnosnu kopiju; (d) ponoviti ovu zabranu DOSLOVNO u promptu svakog podagenta koji koristi git;
    (e) ako se `_tasks` pojavi kao neispravan symlink, NE commitati ništa — vratiti ga s remotea i
    obavijestiti operatera. Gate `check:tracked-artifacts` (pre-commit + CI) blokira praćenje `_tasks`
    u bilo kojem obliku. Potpuni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 23.

---

## Lekcije o sanitizaciji PII podataka i tokova

### 1. Sigurnost regularnih izraza (ReDoS)

Svi obrasci regularnih izraza koji se podudaraju s nizovima promjenjive dužine (npr. IPv6 adrese, kreditne kartice) moraju koristiti strogo ograničene sekvence koje se ne preklapaju (npr. ograničiti broj pojavljivanja pomoću ograničenih raspona `{1,7}`) kako bi se spriječio katastrofalan backtracking prilikom obrade nepouzdanih ulaznih podataka.

### 2. Rukovanje SSE snimkama stanja

Prilikom parsiranja tokovanih LLM odgovora (npr. Responses API), provjerite predstavlja li segment završnu snimku stanja (`done` ili `completed` događaji). Tekst snimke stanja mora se sanitizirati direktno kao samostalan niz (zaobilazeći akumulacijske međuspremnike za razlike) kako bi se spriječilo dupliciranje teksta na kraju toka.

### 3. Baze podataka u testovima

Osigurajte da svi jedinični testovi koji pokreću migracije baze podataka ili uspostavljaju SQLite veze pozovu `resetDbInstance()` te pravilno očiste/zatvore sve ručke baze podataka u `test.after(...)` hooku. Ako se ručke veze s bazom podataka ne oslobode, Nodeov ugrađeni pokretač testova ostat će blokiran neograničeno dugo.

---

## Pristup lokalnom razvojnom okruženju

Kontrolna tabla dostupna je na URL-u/portu koji odabere operater (zadano `http://localhost:20128`). Pristupni podaci specifični su za operatera: **početna administratorska lozinka** čita se iz `INITIAL_PASSWORD` pri prvoj instalaciji (zadana vrijednost je `CHANGEME` u `.env.example`; promijenite je odmah nakon prve prijave); za **lokalne VPS-ove / dijeljena razvojna okruženja**, pitajte operatera — pristupni podaci nalaze se u njegovom ličnom trezoru, A NE u ovom repozitoriju. Sve pristupne podatke pronađene u prethodnoj verziji ove datoteke smatrajte neprodukcijskim demonstracijskim vrijednostima koje su kompromitovane i nemojte ih ponovo koristiti.

<!-- BEGIN:nextjs-agent-rules -->

# Ovo NIJE Next.js koji poznajete

Ova verzija sadrži nekompatibilne promjene — API-ji, konvencije i struktura datoteka mogu se razlikovati od vaših podataka za obuku. Prije pisanja bilo kakvog koda pročitajte odgovarajući vodič u `node_modules/next/dist/docs/` (putanja se određuje u odnosu na direktorij ove datoteke; u monorepozitorijima paket `next` možda neće biti vidljiv iz korijena repozitorija). Obratite pažnju na obavijesti o zastarjelosti.

Ovaj blok zapisuje i ponovo dodaje `next dev` — provjerite u `node_modules/next/dist/server/lib/generate-agent-files.js`. Njegovo uklanjanje iz razlike samo ponovo stvara nepotvrđenu promjenu; ako ga uključite u commit zajedno sa svojim izmjenama, radno stablo ostat će čisto.

<!-- END:nextjs-agent-rules -->
