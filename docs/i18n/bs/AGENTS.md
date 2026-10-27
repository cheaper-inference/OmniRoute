# OmniRoute agent guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../AGENTS.md) · 🇪🇹 [am](../am/AGENTS.md) · 🇸🇦 [ar](../ar/AGENTS.md) · 🇦🇿 [az](../az/AGENTS.md) · 🇧🇬 [bg](../bg/AGENTS.md) · 🇧🇩 [bn](../bn/AGENTS.md) · 🇨🇿 [cs](../cs/AGENTS.md) · 🇩🇰 [da](../da/AGENTS.md) · 🇩🇪 [de](../de/AGENTS.md) · 🇬🇷 [el](../el/AGENTS.md) · 🇪🇸 [es](../es/AGENTS.md) · 🇪🇪 [et](../et/AGENTS.md) · 🇮🇷 [fa](../fa/AGENTS.md) · 🇫🇮 [fi](../fi/AGENTS.md) · 🇫🇷 [fr](../fr/AGENTS.md) · 🇮🇪 [ga](../ga/AGENTS.md) · 🇮🇳 [gu](../gu/AGENTS.md) · 🇳🇬 [ha](../ha/AGENTS.md) · 🇮🇱 [he](../he/AGENTS.md) · 🇮🇳 [hi](../hi/AGENTS.md) · 🇭🇷 [hr](../hr/AGENTS.md) · 🇭🇺 [hu](../hu/AGENTS.md) · 🇦🇲 [hy](../hy/AGENTS.md) · 🇮🇩 [id](../id/AGENTS.md) · 🇳🇬 [ig](../ig/AGENTS.md) · 🇮🇹 [it](../it/AGENTS.md) · 🇯🇵 [ja](../ja/AGENTS.md) · 🇬🇪 [ka](../ka/AGENTS.md) · 🇰🇭 [km](../km/AGENTS.md) · 🇮🇳 [kn](../kn/AGENTS.md) · 🇰🇷 [ko](../ko/AGENTS.md) · 🇱🇹 [lt](../lt/AGENTS.md) · 🇱🇻 [lv](../lv/AGENTS.md) · 🇮🇳 [ml](../ml/AGENTS.md) · 🇮🇳 [mr](../mr/AGENTS.md) · 🇲🇾 [ms](../ms/AGENTS.md) · 🇲🇹 [mt](../mt/AGENTS.md) · 🇲🇲 [my](../my/AGENTS.md) · 🇳🇵 [ne](../ne/AGENTS.md) · 🇳🇱 [nl](../nl/AGENTS.md) · 🇳🇴 [no](../no/AGENTS.md) · 🇮🇳 [or](../or/AGENTS.md) · 🇮🇳 [pa](../pa/AGENTS.md) · 🇵🇭 [phi](../phi/AGENTS.md) · 🇵🇱 [pl](../pl/AGENTS.md) · 🇵🇹 [pt](../pt/AGENTS.md) · 🇧🇷 [pt-BR](../pt-BR/AGENTS.md) · 🇷🇴 [ro](../ro/AGENTS.md) · 🇷🇺 [ru](../ru/AGENTS.md) · 🇱🇰 [si](../si/AGENTS.md) · 🇸🇰 [sk](../sk/AGENTS.md) · 🇸🇮 [sl](../sl/AGENTS.md) · 🇷🇸 [sr](../sr/AGENTS.md) · 🇸🇪 [sv](../sv/AGENTS.md) · 🇰🇪 [sw](../sw/AGENTS.md) · 🇮🇳 [ta](../ta/AGENTS.md) · 🇮🇳 [te](../te/AGENTS.md) · 🇹🇭 [th](../th/AGENTS.md) · 🇹🇷 [tr](../tr/AGENTS.md) · 🇺🇦 [uk-UA](../uk-UA/AGENTS.md) · 🇵🇰 [ur](../ur/AGENTS.md) · 🇺🇿 [uz](../uz/AGENTS.md) · 🇻🇳 [vi](../vi/AGENTS.md) · 🇳🇬 [yo](../yo/AGENTS.md) · 🇨🇳 [zh-CN](../zh-CN/AGENTS.md) · 🇹🇼 [zh-TW](../zh-TW/AGENTS.md)

---

> **Jedinstveni izvor istine.** Ova datoteka sadrži SVA pravila projekta, konvencije, arhitektonske napomene
> i stroga pravila za svakog AI asistenta koji radi na ovom repozitoriju (Claude Code, Gemini, Codex,
> Copilot i bilo koji drugi agent). `CLAUDE.md` i `GEMINI.md` dodaju samo razlike specifične za asistenta
> i upućuju nazad na ovu datoteku. Kada je potrebno promijeniti pravilo, promijenite ga OVDJE — nikada ga nemojte ponovo izdvajati u
> datoteku specifičnu za asistenta.

## Brzi početak

```bash
npm install                    # Instalirajte zavisnosti (automatski generira .env iz .env.example)
npm run dev                    # Razvojni server na http://localhost:20128
npm run build                  # Produkcijska izgradnja (Next.js 16 standalone)
npm run build:release          # Izgradnja izdanja
npm run lint                   # ESLint (očekuje se 0 grešaka; upozorenja već postoje)
npm run typecheck:core         # TypeScript provjera (trebala bi proći bez grešaka)
npm run typecheck:noimplicit:core  # Stroga provjera (bez implicitnog any)
npm run test:coverage          # Jedinični testovi + prag pokrivenosti (67.33 / 67.33 / 72.02 / 65.08 — iskazi/linije/funkcije/grane, provodi ga blokirajući mehanizam postepenog povećavanja u config/quality/quality-baseline.json; test:coverage ima fiksno postavljenu vrijednost 60)
npm run check                  # lint + test zajedno
npm run check:cycles           # Otkrivanje kružnih zavisnosti (savjetodavno — navodi SCC-ove)
npm run check:cycles:ratchet   # Isto skeniranje, blokira iznad gornje granice kvaliteta
npm run check:docs-all         # Pokrenite nakon izmjene dokumentacije (uključuje validaciju izmišljene dokumentacije)
```

Pokretanje testova: pogledajte [Testiranje](#testing) u nastavku (prvo pokrenite najprecizniji test za izmijenjeni kôd).

---

## Kratki pregled projekta

**OmniRoute** — objedinjeni AI proxy/usmjerivač. Jedna krajnja tačka, 375 LLM pružalaca usluga, automatski rezervni odabir.

- API rute — `src/app/api/v1/` (ulazne tačke Next.js App Routera)
- Rukovaoci — `open-sse/handlers/` (obrada zahtjeva: chat, ugrađivanja itd.)
- Izvršioci — `open-sse/executors/` (HTTP otprema specifična za pružaoca usluga)
- Prevodioci — `open-sse/translator/` (konverzija formata OpenAI↔Claude↔Gemini)
- Transformator — `open-sse/transformer/` (Responses API ↔ Chat Completions)
- Servisi — `open-sse/services/` (kombinirano usmjeravanje, ograničenja brzine, keširanje itd.)
- Baza podataka — `src/lib/db/` (SQLite domenski moduli, 209 migracija)
- Domena/pravila — `src/domain/` (mehanizam pravila, pravila troškova, logika rezervnog odabira)
- MCP server — `open-sse/mcp-server/` (110 alata: 45 kanonskih + moduli za memoriju/vještine/GitHub/skup/gejmifikaciju/dodatke/Notion/Obsidian/lokalni korpus/RTK; 3 transporta: stdio / SSE / Streamable HTTP; 33 opsega)
- A2A server — `src/lib/a2a/` (JSON-RPC 2.0 protokol za agente)
- Vještine — `src/lib/skills/` (proširivi okvir za vještine); memorija — `src/lib/memory/` (trajna konverzacijska memorija)

Monorepozitorij: `src/` (Next.js 16 aplikacija), `open-sse/` (radni prostor mehanizma za streaming), `electron/` (desktop aplikacija), `tests/`, `bin/` (ulazna tačka CLI-ja).

---

## Tok obrade zahtjeva

```
Klijent → /v1/chat/completions (Next.js ruta)
  → CORS → Zod validacija → autentifikacija? → provjera pravila → zaštita od ubrizgavanja prompta
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → provjera keša → ograničenje brzine → kombinirano usmjeravanje?
      → resolveComboTargets() → handleSingleModel() za svaki cilj
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() prema uzvodnom servisu → ponovni pokušaj uz postepeno čekanje
    → prevođenje odgovora → SSE tok ili JSON
    → Ako je Responses API: responsesTransformer.ts TransformStream
```

API rute slijede dosljedan obrazac: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`. Nema globalnog Next.js posredničkog softvera — presretanje je specifično za rutu.

**Kombinirano usmjeravanje** (`open-sse/services/combo.ts`): 20 javnih strategija (prioritetna, ponderirana, prvo popunjavanje, kružna raspodjela, p2c, nasumična, najmanje korištena, optimizirana prema trošku, svjesna resetiranja, prozor resetiranja, raspoloživi kapacitet, ponderirana prema kvoti, strogo nasumična, automatska, lkgp, optimizirana prema kontekstu, optimizirana prema kešu, prosljeđivanje konteksta, fuzija, cjevovod). Svaki cilj poziva `handleSingleModel()` (obavija `handleChatCore()` rukovanjem greškama za svaki cilj + provjerama prekidača strujnog kola); strategija `fusion` umjesto toga paralelno šalje zahtjeve panelu modela, a model-sudija sintetizira jedan konačni odgovor (`open-sse/services/fusion.ts`). Bodovanje automatske kombinacije prema 16 faktora + puna tabela strategija: `docs/routing/AUTO-COMBO.md`; 3 sloja otpornosti: `docs/architecture/RESILIENCE_GUIDE.md`.

---

## Stanje runtime otpornosti

Tri povezana, ali različita mehanizma za privremene greške — tokom otklanjanja grešaka u usmjeravanju držite njihov **opseg** odvojenim:

- **Prekidač kola pružaoca** — opseg: cijeli pružalac. 4 stanja (CLOSED/DEGRADED/OPEN/HALF_OPEN); lijeni oporavak — `getStatus()`/`canExecute()` osvježavaju isteklo stanje `OPEN`, bez pozadinskog tajmera.
- **Period mirovanja veze** — opseg: jedna veza/račun/ključ. Lijeno preskakanje na osnovu `rateLimitedUntil` + eksponencijalno odgađanje; završna stanja (`banned`/`expired`/`credits_exhausted`) NISU periodi mirovanja.
- **Blokada modela** — opseg: pružalac + veza + model. Jedan neispravan model nikada ne onemogućava cijelu vezu (`open-sse/services/accountFallback.ts`).

Zadane vrijednosti: `open-sse/config/constants.ts` → `PROVIDER_PROFILES` (mogu se zamijeniti putem
`OMNIROUTE_PROVIDER_BREAKER_*` / `OMNIROUTE_CIRCUIT_BREAKER_*`). Samo statusi na nivou pružaoca
`408/500/502/503/504` aktiviraju prekidač pružaoca — većina statusa `401`/`403`/`429` pripada periodu
mirovanja veze ili blokadi modela. Potpuna referenca za agente (datoteke, stanja, pragovi, otklanjanje grešaka):
[`docs/architecture/RESILIENCE_GUIDE.md` → "Runtime state — agent quick reference"](docs/architecture/RESILIENCE_GUIDE.md#runtime-state--agent-quick-reference).

---

## Mapa repozitorija

Pročitajte najbliži `AGENTS.md` i povezani detaljni vodič prije nego što napravite netrivijalnu promjenu.

- API rute — `src/app/api/v1/` → `docs/architecture/ARCHITECTURE.md`
- Obrada streaming zahtjeva — `open-sse/handlers/` → `docs/architecture/ARCHITECTURE.md`
- Izvršavanje i prevođenje za pružaoce — `open-sse/executors/`, `open-sse/translator/` → `docs/architecture/CODEBASE_DOCUMENTATION.md`
- Usmjeravanje i otpornost — `open-sse/services/` → `open-sse/services/AGENTS.md`, `docs/routing/AUTO-COMBO.md`
- Baza podataka i migracije — `src/lib/db/`, `src/lib/db/migrations/` → `src/lib/db/AGENTS.md`
- Pravila domene — `src/domain/` → `docs/architecture/ARCHITECTURE.md`
- MCP i A2A — `open-sse/mcp-server/`, `src/lib/a2a/` → `docs/frameworks/MCP-SERVER.md`, `docs/frameworks/A2A-SERVER.md`
- Funkcionalnosti agenata — `src/lib/{acp,memory,skills,cloudAgent}/` → `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`, `docs/frameworks/SKILLS.md`
- Sigurnost i upravljanje — `src/lib/{guardrails,compliance}/`, `src/server/authz/` → `docs/security/GUARDRAILS.md`, `docs/architecture/AUTHZ_GUIDE.md`
- Operacije — `src/mitm/`, moduli tunela, `electron/` → `docs/ops/TUNNELS_GUIDE.md`, `docs/guides/ELECTRON_GUIDE.md`
- UI komplet — `packages/ui-kit/` (uključeni Keak CI UI Kit; adapteri u `src/shared/components/`) → `docs/architecture/DESIGN_SYSTEM.md`

---

## Smještaj datoteka i urednost korijena repozitorija

- **Testne datoteke**: SVI jedinični testovi, integracijski testovi, testovi ekosistema ili Vitest datoteke MORAJU se strogo nalaziti unutar direktorija `tests/` (npr. `tests/unit/`, `tests/integration/`). NIKADA ne kreirajte testne datoteke u korijenu projekta (`/`).
- **Skripte i pomoćni alati**: SVE skripte za održavanje, otklanjanje grešaka, generiranje ili eksperimentiranje (`.cjs`, `.mjs`, `.js`, `.ts`) MORAJU se nalaziti isključivo unutar jednog od poddirektorija direktorija `scripts/` (`build/`, `dev/`, `check/`, `docs/`, `i18n/`, `ad-hoc/`, `quality/`, `release/`, `ci/`, `ops/`, `perf/`, `research/`, `sre/`, `vps/`, `homolog/`, `packs/`, `skills/`, `test/`, `cli/`, `compression/`, `compression-eval/`, `devin-bridge/`, `docker/`, `features/`, `router-eval/`). Jednokratni ili eksperimentalni kôd smješta se u `scripts/ad-hoc/`. NIKADA ne ostavljajte samostalne skripte u korijenu projekta (`/`) ili u direktoriju najvišeg nivoa `scripts/`.

**Korijen projekta MORA sadržavati SAMO:**

- Konfiguracijske datoteke (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, `tsconfig*.json`, `playwright.config.ts`, `prettier.config.mjs`, `postcss.config.mjs`, `sonar-project.properties`, `fly.toml`, `docker-compose*.yml`, `Dockerfile`)
- Datoteke zavisnosti (`package.json`, `package-lock.json`)
- Datoteke dokumentacije (`README.md`, `CHANGELOG.md`, `ROADMAP.md`, `LICENSE`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `llm.txt`)
- CI/CD datoteke i definicije za ignoriranje (`.gitignore`, `.dockerignore`, `.npmignore`, `.npmrc`, `.node-version`, `.nvmrc`, `.env.example`)

Prilikom kreiranja _bilo kojih_ validacijskih testova ili skripti s jednokratnom logikom, podrazumijevano koristite `scripts/ad-hoc/` ili `tests/unit/`, u skladu sa svojim ciljevima. Ne zatrpavajte korijenski kontekst `/`.

- **Korijenske putanje `_*` su privatne i NIKADA se ne prate** (`_tasks/`, `_references/`, `_mono_repo/`,
  `_ideia/`, `_cache/` i sve buduće `_<name>`): postoje samo na disku, Git ih ignorira putem
  usidrenih obrazaca `/_*/` + `/_*`, a neke su zasebni potpuni Git repozitoriji (`_tasks` →
  privatni udaljeni repozitorij `_tasks_omniroute`). Nikada nemojte koristiti `git add` ni za šta unutar njih (obični `add` je
  već blokiran pravilima ignoriranja; nikada nemojte koristiti `-f`) i nikada ih nemojte „čistiti“ iz glavnog repozitorija —
  prestanak praćenja obavlja se pomoću `git rm --cached` kako bi sadržaj na disku ostao sačuvan. Kontrola
  `check:tracked-artifacts` (pre-commit + CI) ne prolazi ako postoji BILO KOJA praćena korijenska putanja koja počinje znakom
  `_`, sada ili u budućnosti. Za pojedinosti o direktoriju `_tasks` pogledajte strogo pravilo br. 23.

---

## Ključne konvencije

### Stil koda

- **2 razmaka**, tačke-zarezi, dvostruki navodnici, širina od 100 znakova, es5 završni zarezi (provodi lint-staged putem Prettiera) — pokrenite Prettier nad izmijenjenim datotekama
- **Importi**: eksterni → interni (`@/`, `@omniroute/open-sse`) → relativni
- **Imenovanje**: datoteke=camelCase/kebab, komponente=PascalCase, konstante=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = greška svuda; `no-explicit-any` = **greška** u `open-sse/` i `tests/` (od #6218 — postojeća kršenja su zamrznuta u `config/quality/eslint-suppressions.json`, a nova se moraju ispraviti; `npm run lint` primjenjuje izuzetke i to je ono što CI pokreće)
- **TypeScript**: `strict: false`, cilj ES2022, modul esnext, rezolucija bundler. Preferirajte eksplicitne tipove.

### Baza podataka

- **Uvijek** koristite domenske module u `src/lib/db/` — **nikada** ne pišite sirovi SQL u rutama ili rukovaocima
- **Nikada** ne koristite zbirni import iz `localDb.ts` — importujte specifične module iz `src/lib/db/*`
- Singleton baze podataka: `getDbInstance()` iz `src/lib/db/core.ts` (WAL vođenje dnevnika)
- Migracije: `src/lib/db/migrations/` — verzionirane SQL datoteke, idempotentne, izvršavaju se u transakcijama

### Obrada grešaka

- Koristite try/catch sa specifičnim tipovima grešaka i bilježite ih pomoću pino konteksta
- Nikada ne zanemarujte greške u SSE tokovima — koristite signale prekida za čišćenje
- Vraćajte odgovarajuće HTTP statusne kodove (4xx/5xx)

### Sigurnost

- **Nikada** ne koristite `eval()`, `new Function()` ili implicitni eval
- Validirajte sve ulaze pomoću Zod shema
- Šifrirajte pristupne podatke u mirovanju (AES-256-GCM); nikada ne bilježite SQLite ključeve za šifriranje
- Sanitizirajte korisnički HTML pomoću DOMPurifyja
- Lista zabranjenih uzvodnih zaglavlja: `src/shared/constants/upstreamHeaders.ts` — prilikom izmjena održavajte usklađenost sanitizacije, Zod shema i jediničnih testova
- **Javni uzvodni pristupni podaci** (naprimjer, OAuth client_id/secret vrijednosti ili Firebase Web ključevi izdvojeni iz javnih CLI alata): **MORAJU** biti ugrađeni putem `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` — **nikada** kao string literali. Obavezni obrazac pogledajte u `docs/security/PUBLIC_CREDS.md`.
- **Odgovori o greškama** (HTTP / SSE / izvršilac / MCP rukovalac): **MORAJU** prolaziti kroz `buildErrorBody()` ili `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — **nikada** ne stavljajte sirovi `err.stack` ili `err.message` u tijelo odgovora. Pogledajte `docs/security/ERROR_SANITIZATION.md`.
- **Komande ljuske sastavljene od varijabli**: kada pozivate `exec()`/`spawn()` sa skriptom kojoj su potrebne vrijednosti tokom izvršavanja, proslijedite ih putem opcije `env` (automatski se escapiraju za ljusku) — **nikada** ne interpolirajte nepouzdane/eksterne putanje kao stringove u tijelo skripte. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Biblioteke sigurne prema zadanim postavkama** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): prilikom dodavanja novih sigurnosno osjetljivih površina preferirajte Helmet.js, DOMPurify, ssrf-req-filter, safe-regex i Google Tink umjesto prilagođenih implementacija.

---

## Tačnost dokumentacije

Dokumentacija mora opisivati provjereno ponašanje, a ne vjerovatno ponašanje.

1. Prije dokumentovanja naziva API-ja, krajnje tačke, putanje, CLI komande ili varijable okruženja,
   potražite je pomoću: `rg -n "name" src/ open-sse/ bin/`. Ako nema podudaranja u izvornom kodu, nemojte
   je dokumentovati.
2. Izmjerite promjenjive brojeve umjesto da ih pišete po sjećanju: koristite `wc -l <file>` ili
   komandu za brojanje specifičnu za direktorij.
3. Kopirajte primjere koda iz funkcionalne upotrebe ili ih pokrenite. Preferirajte vezu na izvor, poput
   `path/to/file.ts:line`, umjesto izmišljenog potpisa.
4. Pokrenite `npm run check:docs-all` za izmjene unutar `docs/`; uključuje validaciju
   izmišljene dokumentacije.

---

## Uobičajeni scenariji izmjena

Potpuni detaljni postupci: [`docs/architecture/MODIFICATION_SCENARIOS.md`](docs/architecture/MODIFICATION_SCENARIOS.md). Brzi pregled:

- **Novi pružalac usluga**: prvo provjerite `docs/reference/REMOVED_PROVIDERS.md` (zaštićeno listom blokiranih — nikada ih nemojte ponovo uvoditi), zatim `src/shared/constants/providers.ts` → izvršilac → prevodilac → OAuth konfiguracija (`resolvePublicCred()`, nikada doslovna vrijednost) → `open-sse/config/providerRegistry.ts` → testovi.
- **Dvostruka autentifikacija (više API ključeva) za pružaoca usluga**: dodajte njegov ID u `DUAL_AUTH_PROVIDER_IDS` (`src/shared/constants/providers.ts`) + ažurirajte njegov `authHint`; svaki ključ postaje zaseban red veze, a rotaciju obavlja `getProviderCredentials()`.
- **Nova API ruta**: `src/app/api/v1/<route>/route.ts` — CORS → Zod → opcionalna autentifikacija → rukovalac u `open-sse/handlers/`; greške putem `buildErrorBody()`; testovi potvrđuju da nema curenja praćenja steka.
- **Novi DB modul**: `src/lib/db/<module>.ts` (`getDbInstance`) → migracija ako postoje nove tabele → testovi.
- **Novi MCP alat**: `open-sse/mcp-server/tools/` (Zod shema) → registracija → opseg → testovi.
- **Nova A2A vještina**: `src/lib/a2a/skills/` → `A2A_SKILL_HANDLERS` → kartica agenta → testovi + tabela u dokumentaciji.
- **Novi agent u oblaku**: `src/lib/cloudAgent/agents/` (proširuje `CloudAgentBase`) → `registry.ts` → OAuth → testovi + dokumentacija.
- **Nova ugrađena usluga**: instalacijski program → `bootstrap.ts` → početno popunjavanje baze podataka → 8 API krajnjih tačaka + zaštita `isLocalOnlyPath()` → kartica korisničkog interfejsa → dokumentacija + OpenAPI → testovi.
- **Zaštitna mjera / evaluacija / vještina / webhook / odredište izvoza dnevnika**: pogledajte detaljnu dokumentaciju.

---

## Referentna dokumentacija

Za svaku netrivijalnu izmjenu prvo pročitajte odgovarajući detaljni vodič:

- Navigacija repozitorijem — `docs/architecture/REPOSITORY_MAP.md` · Arhitektura — `docs/architecture/ARCHITECTURE.md` · Inženjerska referenca — `docs/architecture/CODEBASE_DOCUMENTATION.md`
- Auto-Combo (bodovanje prema 16 faktora, 20 strategija) — `docs/routing/AUTO-COMBO.md` · Ponovno izvođenje zaključivanja — `docs/routing/REASONING_REPLAY.md`
- Otpornost (3 mehanizma + otklanjanje grešaka) — `docs/architecture/RESILIENCE_GUIDE.md`
- Postupci izmjena — `docs/architecture/MODIFICATION_SCENARIOS.md`
- Okvir vještina — `docs/frameworks/SKILLS.md` · Radar (sloj kataloga besplatnih modela) — `docs/frameworks/RADAR.md` · Sistem memorije (FTS5 + Qdrant) — `docs/frameworks/MEMORY.md`
- Agenti u oblaku — `docs/frameworks/CLOUD_AGENT.md` · Protokoli agenata (A2A / ACP / Cloud) — `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`
- Zaštitne mjere (PII / ubacivanje naredbi / vizija) — `docs/security/GUARDRAILS.md` · Javne vjerodajnice uzvodnih usluga (Gemini/itd.) — `docs/security/PUBLIC_CREDS.md` · Sanitizacija poruka o greškama — `docs/security/ERROR_SANITIZATION.md` · Usklađenost / revizija — `docs/security/COMPLIANCE.md` · Prikrivenost (TLS / otisak) — `docs/security/STEALTH_GUIDE.md`
- Evaluacije — `docs/frameworks/EVALS.md` · Webhookovi — `docs/frameworks/WEBHOOKS.md` · Izvoz dnevnika (dnevnici poziva → BigQuery/…) — `docs/frameworks/LOG-EXPORT.md`
- Tok autorizacije — `docs/architecture/AUTHZ_GUIDE.md`
- MCP server — `docs/frameworks/MCP-SERVER.md` · A2A server — `docs/frameworks/A2A-SERVER.md`
- API referenca + OpenAPI — `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` · Katalog pružalaca usluga (automatski generiran) — `docs/reference/PROVIDER_REFERENCE.md`
- Tuneli — `docs/ops/TUNNELS_GUIDE.md` · Tok izdavanja — `docs/ops/RELEASE_CHECKLIST.md` · Protokol radnog stabla — `docs/ops/WORKTREE_ISOLATION.md` · Detalji strogih pravila — `docs/ops/HARD_RULES_DETAIL.md` · Upozorenja pri izgradnji + otklanjanje poteškoća s Bunom — `docs/ops/BUILD_WARNINGS.md`
- Electron desktop aplikacija — `docs/guides/ELECTRON_GUIDE.md` · VS Code Copilot Chat (OmniCopilot ekstenzija) — `docs/guides/VSCODE-COPILOT.md`
- Ugrađene usluge — `docs/frameworks/EMBEDDED-SERVICES.md` · Kontrole kvaliteta (~90 skripti, pravila liste dozvoljenih stavki) — `docs/architecture/QUALITY_GATES.md`

---

## Testiranje

- Jedinični testovi — `npm run test:unit`; pojedinačna datoteka (izvorni Node pokretač testova — većina testova) — `node --import tsx/esm --test tests/unit/your-file.test.ts`
- Vitest (MCP server, autoCombo, keš) — `npm run test:vitest`; svi testni paketi — `npm run test:all`
- E2E (Playwright) — `npm run test:e2e`; E2E protokola (MCP+A2A) — `npm run test:protocols:e2e` (CI zadatak `test-protocols-e2e`, savjetodavan — #10049); ekosistem — `npm run test:ecosystem` (CI zadatak `test-ecosystem`, blokirajući)
- Prag pokrivenosti — `npm run test:coverage` (67.33 / 67.33 / 72.02 / 65.08 — naredbe/linije/funkcije/grane, nametnut blokirajućim mehanizmom postepenog podizanja praga u config/quality/quality-baseline.json; test:coverage sam ima fiksno postavljenih 60); izvještaj — `npm run coverage:report`
- Potpuna matrica testova: `CONTRIBUTING.md` → "Pokretanje testova"

**Pravilo za PR**: Ako mijenjate produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`, morate uključiti ili ažurirati testove u istom PR-u.

**Preporučeni redoslijed slojeva testiranja**: prvo jedinični → integracijski (više modula ili stanje baze podataka) → e2e (samo korisničko sučelje/tok rada). Reprodukcije grešaka zabilježite kao automatizirane testove prije ili istovremeno s ispravkom.

**Oba pokretača testova moraju proći**: `npm run test:unit` i `npm run test:vitest` pokrivaju **datoteke koje se ne preklapaju**; oba su CI zadaci (`test-unit`, `test-vitest`) i moraju biti uspješna prije spajanja — jedan uspješan skup testova može neprimjetno isporučiti neispravne MCP alate ili regresije usmjeravanja.

**Protokol za ispravku grešaka / trijažu problema (strogo pravilo #18)**: test koji prvo ne prolazi, a zatim prolazi (TDD, preporučeno) ILI dokumentirani test uživo na produkcijskom VPS-u (`root@192.168.0.15`), zabilježen u PR-u; mijenjajte samo ono za šta neuspješan test dokazuje da je neispravno. Stablo odluke: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 18.

**Copilot politika pokrivenosti**: Kada PR mijenja produkcijski kod, a pokrivenost je ispod 60% (naredbe/linije/funkcije/grane), nemojte to samo prijaviti — dodajte ili ažurirajte testove, ponovo pokrenite provjeru praga pokrivenosti, a zatim zatražite potvrdu. U izvještaj PR-a uključite pokrenute naredbe, izmijenjene datoteke testova i konačni rezultat pokrivenosti.

---

## Fokus pregleda

- Operacije nad bazom podataka držite u `src/lib/db/`; nemojte izvršavati sirovi SQL iz ruta.
- Zahtjeve prema pružaocima usmjeravajte kroz `open-sse/handlers/`.
- MCP i A2A stranice zadržite kao kartice unutar `/dashboard/endpoint`.
- Očuvajte čišćenje SSE-a, parsiranje zaglavlja ograničenja brzine, Zod validaciju i validaciju
  sheme pružaoca.
- Tretirajte Memory i Skills kao sveobuhvatne izmjene koje mogu uticati na MCP alate, tok obrade
  zahtjeva i A2A vještine.
- Nemojte zatvoriti zahtjev saradnika za povlačenje nakon korištenja njegovog koda; spojite ga putem GitHuba kako
  bi saradnik dobio zasluge.
- **Nikada nemojte spojiti PR koji mijenja površinu s uputama za agente bez izričitog odobrenja
  operatera** — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `llm.txt` (+ preslikane kopije) i
  `skills/**/SKILL.md` svi AI procesi izvršavaju kao autoritativne upute; spojena uputa
  kompromituje svako buduće pokretanje agenta. Prije bilo kakvog spajanja provjerite pomoću `gh pr diff <N> --name-only`.
  Zapis o incidentu: PR #11770 (2026-09-01) uputio je agente da izvrše skriptu za postavljanje
  treće strane i uključen je tokom kampanje spajanja; poništeno u #12249.

---

## Artefakti planiranja i istraživanja

`_tasks/` je **zaseban, izolovan git repozitorij** koji glavni repozitorij ignoriše putem git-a (`.gitignore` → `_tasks/`) — kanonsko mjesto za radne artefakte (planove, specifikacije/dizajne, istraživanja, primopredaje), verzionisane u vlastitom repozitoriju umjesto da opterećuju glavno OmniRoute stablo. **Strogo pravilo — nikada ne zapisujte rezultate planiranja / istraživanja unutar `docs/` ili u korijenu repozitorija.** Kad god se u ovom projektu pokrene bilo koji generator plana/specifikacije/istraživanja (superpowers ili neki drugi), sačuvajte rezultat u `_tasks/` koristeći konvenciju imenovanja datoteka:

| Artefakt               | Sačuvajte ovdje                                               |
| ---------------------- | ------------------------------------------------------------- |
| Planovi                | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikacije / dizajn | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Istraživanje           | `_tasks/research/…`                                           |
| Primopredaje           | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

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
- **commit-msg**: `check:ai-attribution` — odbija AI/bot `Co-Authored-By` završne retke i fusnote o AI generisanju u poruci (Strogo pravilo #16; ljudski koautori su dozvoljeni; također se nalazi u `quality.yml` petlji brzih provjera (PR→`release/**`) i PR-only `ci.yml` lint koraku (PR→`main`) — #14436)
- **pre-push**: namjerno lagan (samo provjera ispravnosti PATH/npm) — `any-budget` + `tracked-artifacts` već se pokreću pri pre-commitu, a CI i dalje nameće obje provjere; njihovo ponovno pokretanje pri svakom pushu bilo je čisto dvostruko plaćanje (ranije Fase 6A.12 potpuna pre-push kontrolna tačka; objedinjeno u pre-commit u #6716).

### Izolacija worktreeja (OBAVEZNA za svaki razvojni zadatak)

Strogo pravilo #19: jedan worktree + namjenska grana po zadatku, uz prethodnu potvrdu bazne grane s
operaterom (obično aktivna `release/vX.Y.Z`). Obavezni zahtjevi:

- 🔴 Worktreeji se nalaze ISKLJUČIVO unutar `.claude/worktrees/` — bilo gdje drugdje izlaze izvan tsconfig /
  `.dockerignore` izuzimanja iz opsega builda (tsconfig `include: **/*` globovi ~70× veći od baze koda →
  `next build` OOM, incident 2026-06-25) i rasipaju worktreeje.
- Ponovo koristite node_modules glavnog checkouta putem **čvrstih veza** (`cp -al`), **nikada `ln -s`** —
  Turbopack prijavljuje FATAL kada se simbolička veza razriješi izvan korijena projekta, dok typecheck/lint/testovi
  i dalje prolaze (incident 2026-07-31, #9043).
- Kopirajte i `.husky/_` koji git ignoriše (`cp -a <main>/.husky/_ .husky/_`) — bez toga se **nijedna
  pre-commit kontrolna tačka ne pokreće i ništa na to ne upozorava** (59 commitova prošlo je mimo
  `scripts/check/check-git-identity.sh`, 2026-08-29 → 09-02). Preferirajte
  `scripts/dev/new-worktree.sh <branch> [base]`, koji obavlja sve ovo i provjerava hook.
- Radite, commitujte, pushujte i otvorite PR — sve iz worktreeja.
- Uklonite samo vlastiti worktree + granu, **po nazivu** (nikada `fix/*`/`feat/*` zamjenski znakovi —
  druge sesije zadržavaju vlastite). Ne dirajte nijedan worktree koji niste kreirali.
- Završite svaku sesiju tako da glavni checkout bude vraćen na granu na kojoj je započeo.

Potpuni protokol s komandama i historijom incidenata:
[`docs/ops/WORKTREE_ISOLATION.md`](docs/ops/WORKTREE_ISOLATION.md).

### Provjera zelene baze (PR-ovi ne smiju nastati crveni)

Prije kreiranja grane, spajanja baze u PR granu, masovnog preusmjeravanja PR-ova ili otvaranja
PR-a, provjerite issue na vrhu baze `🔴 Release branch not green: <branch>` (oznaka `base-red`):
`gh issue list --repo diegosouzapw/OmniRoute --state open --search "Release branch not green: <base> in:title"`.
Ako je crvena: nikada ne obrađujte niti "popravljajte" naslijeđene kvarove u svojoj grani (ispravka base-red problema ima vlastiti
PR `fix/release-vX.Y.Z-basereds` pod kontrolom zamrzavanja); PR koji se ipak otvori mora sadržavati
`⚠️ base-red inherited: #<issue>` u svom tijelu. Potpuna procedura: `docs/ops/WORKTREE_ISOLATION.md`.

### Sync-back integracije koriste fast-forward, nikada squash

`main → release/vX+1` sync-back integriše se kao merge commit koji već jeste
(`git push origin <head>:refs/heads/release/vX+1`), nikada squashovan — squash uklanja `main` iz
release historije, pa sljedeći sync-back ponovo izaziva konflikte u svakoj datoteci (551 na v3.8.50 → v3.8.51).
Nakon integracije, `git merge-base --is-ancestor origin/main origin/release/vX+1` mora biti true.
Koraci + provjera zamrzavanja osnovne linije: `docs/ops/WORKTREE_ISOLATION.md` → "Sync-back landings".

---

## Doprinosi upstream projektu

Ovaj checkout je fork repozitorija `diegosouzapw/OmniRoute`. Promjene namijenjene samo forku, implementaciji i ličnoj automatizaciji nemojte uključivati u upstream PR-ove. Upstream rad započnite iz aktivne zadane upstream grane, a ne iz `main` (`git fetch upstream && git switch -c <branch-name> upstream/<default-branch>`), u PR-u ciljajte tu istu granu izdanja, pripremite samo predviđene datoteke, pokrenite ciljane provjere i koristite poruku u formatu Conventional Commits (na primjer, `docs: slim AGENTS.md`).

---

## Okruženje

- **Izvršno okruženje**: Node.js ≥22.22.2 <23 || ≥24.0.0 <27, ES Modules — **jedino podržano** izvršno okruženje za objavljeni `omniroute` CLI, server i pakete testova (`node:test` + vitest); `engines.node` je mjerodavan, a krajnjim korisnicima Bun nikada nije potreban. Postoji **best-effort put kompatibilnosti s `bun:sqlite`** kako bi se globalna Bun instalacija (`bun install -g omniroute`) mogla pokrenuti bez `better-sqlite3` (adapter upravljačkog programa + pokretanje procesa prilagođeno Bunu); to **nije** podržano izvršno okruženje — nema garancija podrške — i svaka promjena izvršnog okruženja specifična za Bun MORA očuvati lanac Node upravljačkog programa/rezervnih opcija i biti isporučena s Bun testom (`test:bun:db`) ili izričitim razlogom zašto je taj put namijenjen samo Nodeu.
- **Bun (pokretač skripti za izgradnju/razvoj + samo provjera kompatibilnosti)**: Bun `1.4.2` je fiksiran kao **tačna devDependency** (obezbijeđen kroz postojeći `npm ci` putem platformskih binarnih datoteka `@oven/bun-*` iz lockfilea — bez `setup-bun`/ad hoc instalacije). Izvršava **samo** skup TypeScript gate/generator skripti s liste dozvoljenih (zamjenjujući `node --import tsx` radi bržeg pokretanja): CI provjere `check:provider-consistency`, `check:compression-budget`, `check:known-symbols`; skripte izvan CI-ja `gen:provider-reference`, `bench:compression`; kao i paket provjera kompatibilnosti `test:bun:db`. **NEMOJTE proširivati upotrebu Buna na `npm install`, izgradnju (`build:cli*`), `check:pack-artifact`, podržano objavljeno izvršno okruženje ili glavne pokretače testova** — oni ostaju na Nodeu. Svaka nova skripta koja poziva Bun prvo mora biti potvrđena kao bajt-po-bajt identična svom izlazu iz `node --import tsx`. Ako Bun ne radi (`bun: not found` ili zamjenska binarna datoteka zbog preskočenog `postinstall`): `docs/ops/BUILD_WARNINGS.md` → "Bun script-runner failures".
- **TypeScript**: 6.0+, cilj ES2022, modul esnext, rezolucija bundler
- **Aliasi putanja**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Zadani port**: 20128 (API + nadzorna ploča na istom portu)
- **Direktorij podataka**: varijabla okruženja `DATA_DIR`, zadano `~/.omniroute/`
- **Ključne varijable okruženja**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Postavljanje: `cp .env.example .env`, zatim generišite `JWT_SECRET` (`openssl rand -base64 48`) i `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Kontrole kvaliteta i pragovi

OmniRoute ima **~90 skripti za kontrolu kvaliteta** (`scripts/check/` + `scripts/quality/`) raspoređenih u **9 poslova za pokretanje kontrola** u `.github/workflows/ci.yml`, uz posao brzih kontrola u `quality.yml` (PR→`release/**`) i 5 noćnih tokova rada za kvalitet. Potpuni inventar, pregled po poslovima i operativne procedure: [`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md).

**Brzi pregled:**

- Kontrole u poslovima `lint` + `docs-sync-strict`: kontrole pravila s rezultatom prolaz/pad —
  ispravite kršenje ili dodajte unos na listu dozvoljenih s komentarom koji sadrži obrazloženje + povezani issue.
- Kontrole u poslu `quality-gate`: prag — metrike (ESLint upozorenja, pokrivenost koda, dupliciranje,
  složenost) ne smiju nazadovati u odnosu na `quality-baseline.json`. Ažurirajte pomoću
  `npm run quality:ratchet -- --update` kada se metrika zaista poboljša.
- Posao `test-vitest` pokreće `npm run test:vitest` (MCP alati, autoCombo, keš) — blokirajuće.
  `test:vitest:ui` je blokirajući od PR-a #7127.
- **Faza ubrzanog razvoja (2026-08-30 → v4.0)**: svaka numerička osnovna vrijednost ublažena je za 20%, a `--require-tighten` je savjetodavan (`quality-baseline.json` → `_policy`); noćni posao `baseline-headroom` prati koliko je budžeta preostalo u issueu "📈 Baseline headroom". Pogledajte `docs/architecture/QUALITY_GATES.md` → "Velocity phase".

**Pravila liste dozvoljenih (sažeto):** ispravite uzrok; koristite listu dozvoljenih samo za već postojeća kršenja koja ne možete ispraviti u istom PR-u (komentar s obrazloženjem + broj issuea). Zastarjele unose otkriva kontrola zastarjelosti dodana u fazi 6A.3.

---

## Stroga pravila

Brojevi pravila su nepromjenjivi i navode se u skriptama i dokumentaciji — nikada ih nemojte mijenjati. Ako je pravilo u nastavku
navedeno u skraćenom obliku, njegov potpuni obavezujući tekst, obrazloženje i historija incidenata nalaze se u
[`docs/ops/HARD_RULES_DETAIL.md`](docs/ops/HARD_RULES_DETAIL.md) pod istim brojem.

1. Nikada ne predajite tajne ili pristupne podatke
2. Nikada ne koristite zbirni uvoz iz `localDb.ts` — uvozite određene module iz `src/lib/db/*`
3. Nikada ne koristite `eval()` / `new Function()` / implicitni eval
4. Nikada ne predajite izmjene direktno na `main`
5. Nikada ne pišite sirovi SQL u rutama — koristite module iz `src/lib/db/`
6. Nikada nemojte prešutno zanemarivati greške u SSE tokovima
7. Uvijek provjeravajte ulazne podatke pomoću Zod shema
8. Uvijek uključite testove kada mijenjate produkcijski kôd
9. Pokrivenost ne smije pasti ispod osnovne vrijednosti zamrznute u `quality-baseline.json` (mehanizam zapinjača); apsolutni minimum je 60% (naredbe/linije/funkcije/grane). Ažurirajte osnovnu vrijednost putem `npm run quality:ratchet -- --update` samo kada se pokrivenost zaista poboljša. Pogledajte `docs/architecture/QUALITY_GATES.md`.
10. Nikada ne zaobilazite Husky hookove (`--no-verify`, `--no-gpg-sign`) bez izričitog odobrenja operatora.
11. Nikada ne ugrađujte javni izvorni OAuth client_id/secret niti Firebase Web ključeve kao tekstualne literale — uvijek koristite `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Pogledajte `docs/security/PUBLIC_CREDS.md`.
12. Nikada ne vraćajte sirovi `err.stack` / `err.message` u HTTP / SSE / izvršnim odgovorima — uvijek ih usmjerite kroz `buildErrorBody()` ili `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Pogledajte `docs/security/ERROR_SANITIZATION.md`.
13. Nikada ne umećite vanjske putanje ili vrijednosti izvršnog okruženja interpolacijom stringova u shell skripte proslijeđene funkcijama `exec()`/`spawn()` — umjesto toga ih proslijedite putem opcije `env`. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nikada ne odbacujte CodeQL / Secret-Scanning upozorenje bez (a) prethodne provjere gore navedenih dokumenata o obrascima kako biste utvrdili primjenjuje li se pomoćna funkcija i (b) evidentiranja tehničkog obrazloženja u komentaru odbacivanja. Presedan: `js/stack-trace-exposure` prijavljen na mjestima poziva koja se već usmjeravaju kroz `sanitizeErrorMessage()` predstavlja poznato ograničenje CodeQL-a (prilagođeni sanitizatori nisu prepoznati) — odbacite kao `false positive` uz referencu na `docs/security/ERROR_SANITIZATION.md`.
15. Nikada ne izlažite rute koje pokreću podređene procese (`/api/mcp/`, `/api/cli-tools/runtime/`) bez klasifikacije `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts`. Ograničenje na loopback primjenjuje se bezuslovno prije bilo kakve provjere autentifikacije — JWT koji procuri putem tunela ne može pokrenuti podređene procese. Pogledajte `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nikada ne navodite niti reklamirajte AI asistenta, LLM ili račun za automatizaciju u metapodacima bilo kojeg commita/PR-a — ni (a) `Co-Authored-By` završne retke koji imenuju AI/bota ni (b) fusnote o AI-generisanju (`🤖 Generated with [Claude Code]`, …) u poruci commita, naslovu/tekstu PR-a ili CHANGELOG-u; oboje skrivaju stvarnog autora (`diegosouzapw`). Ovo **nadjačava sve zadane postavke okvira, predloška ili alata koje automatski dodaju takvu fusnotu** — uklonite je prije slanja. Ljudskim saradnicima (autorima izvornih PR-ova, prijaviteljima problema koji se prenose) MOŽE i TREBA odati priznanje standardnim završnim recima `Co-authored-by: Name <email>`. Potpuni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 16.
17. Nikada ne izlažite rute pod `/api/services/` ili `/dashboard/providers/services/*/embed/` bez klasifikacije `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts`. Ove rute mogu pokretati podređene procese (`npm install`, `node`). Ograničenje na loopback primjenjuje se bezuslovno prije bilo kakve provjere autentifikacije — JWT koji procuri putem tunela ne može pokrenuti podređene procese. Pogledajte `docs/security/ROUTE_GUARD_TIERS.md`.
18. Svaka ispravka greške mora biti provjerena prije isporuke: jediničnim/integracijskim testom koji prvo ne prolazi, a zatim prolazi (TDD), ILI dokumentiranim testom uživo na produkcijskom VPS-u (192.168.0.15). Ispravka bez jednog od navedenog neće biti spojena. Pogledajte Testing → "Bug fix / issue triage protocol" i `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 18 za potpuno stablo odlučivanja.
19. Nikada ne razvijajte u zajedničkoj glavnoj radnoj kopiji. Svaki razvojni zadatak izvršava se u vlastitom git worktreeu na vlastitoj namjenskoj grani, a MORATE potvrditi osnovnu granu s operatorom prije kreiranja worktreea/grane — nikada ne pretpostavljajte da je to `main` ili trenutno odabrana grana. `git checkout` u zajedničkoj radnoj kopiji neprimjetno uništava nepredane izmjene drugih sesija. Uklanjajte samo worktreeove/grane koje ste kreirali (po nazivu, nikada pomoću zamjenskih obrazaca `fix/*`/`feat/*`), ostavite worktreeove drugih sesija netaknutim i završite na grani na kojoj ste započeli (aktivnoj `release/vX.Y.Z`, nikada `main`). Pogledajte Git Workflow → "Worktree isolation" i `docs/ops/WORKTREE_ISOLATION.md`.
20. Redakcija/sanitizacija ličnih podataka je **opcionalna — nikada zadano uključena**. Dvije zastavice PII funkcionalnosti koje mijenjaju podatke **MORAJU** zadržati `defaultValue: "false"` u `src/shared/constants/featureFlagDefinitions.ts`: `PII_REDACTION_ENABLED` (na strani zahtjeva) i `PII_RESPONSE_SANITIZATION` (odgovor + streaming). Promjena bilo koje zadane vrijednosti na `"true"` zahtijeva izričito odobrenje operatora; uključivanje je pojedinačno za svakog operatora, nikada prešutna zadana vrijednost. Zaštita od regresije: `tests/unit/pii-opt-in-default.test.ts`. Potpuni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 20.
21. **Zamrzavanje izdanja — ZAMRZNUTA grana izdanja pripada voditelju izdanja; razvoj se NE zaustavlja (model paralelnog ciklusa, 2026-07-04).** Prije spajanja **bilo kojeg** PR-a, svaki tok kampanje **MORA** provjeriti `gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open`. Ako je aktivno: **NIKADA ne spajajte u zamrznutu `release/vX.Y.Z`** — preusmjerite PR na **najvišu** `release/v*` (`gh pr edit <N> --base release/vX+1`, zatim PROVJERITE pomoću `gh pr view <N> --json baseRefName` — uređivanje neprimjetno ne uspijeva) i spojite na uobičajen način; **ZADRŽITE samo kada JE najviša grana release/v\* ujedno i zamrznuta grana**. **⛔ SAMO `/generate-release` smije pokrenuti zamrzavanje izdanja (faza 0a; ukida se u fazi 12c)** — nikada ga samostalno ne otvarajte, produžavajte, ponovo otvarajte niti zatvarajte (za svako drugo zamrzavanje potrebno je izričito odobrenje operatora). Potpuni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 21.
22. **Sigurnost između sesija — na ovom repozitoriju istovremeno radi MNOGO paralelnih sesija/agenata; nikada ne ometajte tuđi rad koji je u toku.** Dvije apsolutne zabrane (oba su ponavljajući incidenti):

- **(a) Nikada ne koristite `git stash` / `git stash pop` — NIGDJE u ovom repozitoriju, uključujući izolovani worktree i svakog podagenta kojeg pokrenete.** `git stash` djeluje na **zajedničko spremište objekata repozitorija**, a ne na radno stablo pojedinačnog worktreeja — stash u jednoj sesiji može neprimjetno prebrisati ili vratiti necommitovane izmjene druge paralelne sesije. Umjesto toga, poredite s osnovnim refom koristeći `git show <ref>:<path>` ili `git diff <ref> -- <path>` — nikada ne sklanjajte svoje stablo u stash kako biste ga „očistili“. **U prompt svakog podagenta koji radi s gitom doslovno uključite ovu zabranu.**
  - **(b) Nikada nemojte spajati, pushati, rebaseovati ili prisilno pushati PR / granu / worktree na kojem druga sesija aktivno radi** — uključujući PR čiji je head aktivni worktree za ispravke u `.claude/worktrees/` koji **niste** kreirali, čak i kada koristi isti `diegosouzapw` identitet: **ZAUSTAVITE SE, prepustite spajanje sesiji koja je vlasnik.** **Prije** spajanja ili pushanja bilo kojeg PR-a koji niste kreirali u _ovoj_ sesiji, pokrenite `git worktree list` i ponovo provjerite `gh pr view <N> --json state,headRefOid`. (Dodatno potvrđuje Pravilo #19.)

  Puni tekst + incidenti: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 22.

23. **Struktura `_tasks/` je NEDODIRLJIVA — dozvoljeno je samo dodavanje/uređivanje.** To je ZASEBAN git repozitorij
    (privatni remote `diegosouzapw/_tasks_omniroute`) montiran kao stvarni direktorij u korijenu
    glavnog checkouta. Apsolutna pravila: (a) NIKADA ne premještati, preimenovati, brisati, prazniti niti
    pretvarati `_tasks` u symlink; sesije smiju samo KREIRATI ili UREĐIVATI datoteke unutar njega;
    (b) NIKADA ne pratiti `_tasks` (čak ni kao symlink) u glavnom repozitoriju — praćeni blob bio je
    osnovni uzrok DVA brisanja (2026-08-08 i 2026-08-10); (c) nakon svakog relevantnog upisivanja,
    `git -C _tasks add -A && git -C _tasks commit && git -C _tasks push` — često pushanje je
    stvarna sigurnosna kopija; (d) DOSLOVNO ponoviti ovu zabranu u promptu svakog podagenta koji radi s gitom;
    (e) ako se `_tasks` pojavi kao neispravan symlink, NE commitovati ništa — vratiti ga s remotea i
    obavijestiti operatera. Gate `check:tracked-artifacts` (pre-commit + CI) blokira praćenje `_tasks`
    u bilo kojem obliku. Puni tekst: `docs/ops/HARD_RULES_DETAIL.md` → Pravilo 23.

---

## Lekcije o sanitizaciji PII podataka i tokova

### 1. Sigurnost regularnih izraza (ReDoS)

Svi obrasci regularnih izraza koji odgovaraju nizovima promjenjive dužine (npr. IPv6 adresa, kreditne kartice) moraju koristiti strogo ograničene sekvence koje se ne preklapaju (npr. ograničiti broj pojavljivanja pomoću ograničenih raspona `{1,7}`) kako bi se spriječilo katastrofalno vraćanje unazad prilikom obrade nepouzdanih ulaznih podataka.

### 2. Obrada SSE snimaka stanja

Prilikom raščlanjivanja tokovnih LLM odgovora (npr. Responses API), provjerite predstavlja li segment konačnu snimku stanja (`done` ili `completed` događaji). Tekst snimke stanja mora se direktno sanitizirati kao samostalan niz znakova (zaobilazeći rotirajuće međuspremnike razlika) kako bi se spriječilo dupliciranje teksta na kraju toka.

### 3. Baze podataka u testovima

Osigurajte da svi jedinični testovi koji pokreću migracije baze podataka ili uspostavljaju SQLite veze pozovu `resetDbInstance()` i pravilno očiste/zatvore sve pristupne tačke baze podataka u `test.after(...)` hooku. Neuspješno oslobađanje pristupnih tačaka veza s bazom podataka uzrokovat će da Nodeov izvorni izvršavač testova ostane beskonačno blokiran.

---

## Pristup lokalnom razvojnom okruženju

Kontrolna ploča dostupna je na URL-u/portu koji odabere operater (zadano `http://localhost:20128`). Pristupni podaci specifični su za operatera: **početna administratorska lozinka** čita se iz `INITIAL_PASSWORD` pri prvoj instalaciji (zadana vrijednost je `CHANGEME` u `.env.example`; promijenite je odmah nakon prve prijave); za **lokalna VPS / dijeljena razvojna okruženja**, pitajte operatera — pristupni podaci nalaze se u njegovom ličnom trezoru, a NE u ovom repozitoriju. Sve pristupne podatke uočene u prethodnoj verziji ove datoteke smatrajte neprodukcijskim demonstracijskim vrijednostima koje su kompromitovane i nemojte ih ponovo koristiti.

<!-- POČETAK:nextjs-agent-rules -->

# Ovo NIJE Next.js koji poznajete

Ova verzija sadrži promjene koje narušavaju kompatibilnost — API-ji, konvencije i struktura datoteka mogu se razlikovati od podataka na kojima ste obučeni. Prije pisanja bilo kakvog koda pročitajte odgovarajući vodič u `node_modules/next/dist/docs/` (putanja se određuje u odnosu na direktorij ove datoteke; u monorepozitorijima paket `next` možda neće biti vidljiv iz korijenskog direktorija repozitorija). Obratite pažnju na obavijesti o zastarjelosti.

Ovaj blok zapisuje i ponovo dodaje `next dev` — provjerite u `node_modules/next/dist/server/lib/generate-agent-files.js`. Njegovo uklanjanje iz razlike samo ponovo stvara nepotvrđenu promjenu; uključivanjem u commit zajedno sa svojim izmjenama održavate radno stablo čistim.

<!-- KRAJ:nextjs-agent-rules -->
