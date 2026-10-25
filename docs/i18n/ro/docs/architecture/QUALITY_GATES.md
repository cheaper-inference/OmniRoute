# Quality Gates Reference (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Acest document este referința oficială pentru toate porțile de calitate CI din OmniRoute.
Acesta descrie fiecare poartă, ce validează, în ce job CI rulează, dacă utilizează
o referință de tip ratchet sau o politică de tip admis/respins și dacă blochează compilarea sau are rol consultativ.

Pentru un rezumat scurt și politica listei de permisiuni, consultați secțiunea „Quality Gates & Ratchets”
din `AGENTS.md`. Pentru evaluarea critică, clasificarea maturității și planul independent de instrumente
pentru reproducerea aceluiași sistem, consultați
[Manualul porților de calitate](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventarul gate-urilor și profilele de execuție

### Admiterea candidaților

Fluxurile de lucru CI și Quality Gates emit fiecare un verdict stabil: `Gate / CI` și
`Gate / Quality`. Politica lor de admitere versionată enumeră fiecare job din amonte ca obligatoriu sau consultativ. Un job obligatoriu aplicabil trebuie să reușească: rezultatele lipsă, anulate, omise, în așteptare și necunoscute nu pot stabili PASS. O clasificare validă doar-documentație sau doar-catalog poate face o cale de cod inaplicabilă; un PR ciornă nu este un candidat acceptat. O etichetă `hotfix` nu exonerează de dovezi.

Ambele fluxuri de lucru acoperă PR-uri către ramurile main/release, push-uri către `main`, declanșări manuale și evenimente de tip merge-group. Push, dispatch și merge-group rulează selecția completă. Push-urile către `release/**` nu le pornesc (2026-10-18): fiecare modificare a rulat deja matricea pe PR-ul său, iar combinația îmbinată este sarcina Release-Green (`docs/ops/RUNNER_BOX.md` → calea găzduită). Fork-urile și grupurile de îmbinare folosesc runneri găzduiți pentru joburile care altfel selectează runneri self-hosted; capacitatea găzduită suficientă trebuie verificată înainte de implementare.

Fiecare recipisă JSON identifică SHA-ul extras, rularea fluxului de lucru și încercarea. CLI-ul respinge o nepotrivire între SHA-ul checkout-ului și cel al evenimentului. Testele fluxurilor de lucru leagă apartenența la politică de lista `needs` a jobului de verdict, astfel încât o cale nouă sau eliminată să nu poată dispărea în tăcere. Recipisele acoperă propriul flux de lucru, nu publicarea, implementarea sau internele unui scanner consultativ existent. Activarea ambelor nume de verificare în regulile de ramură este o modificare administrativă separată; adăugarea acestor joburi nu protejează prin ea însăși o ramură.

### Inventarul scanării statice

Inventarul versionat de aliasuri npm și apartenența la scanarea statică se află în
`config/quality/gate-manifest.json`. Rulați `npm run check:gate-manifest` pentru a valida numele scripturilor și comenzile exacte față de `package.json`; adăugările, eliminările și decalajul comenzilor fac să eșueze atât hook-ul local, cât și joburile de clasificare a modificărilor din CI. Un alias nu este un job de flux de lucru, o instanță de matrice sau un caz de test: aceste numărători nu trebuie prezentate ca interschimbabile.

Folosiți `npm run quality:scan -- --list` sau `npm run quality:scan:fast -- --list`
pentru a inspecta aliasurile selectate fără a le executa. Runnerul invocă entrypoint-ul npm, astfel încât runtime-ul său (inclusiv Bun, unde este configurat) este păstrat. Manifestul înregistrează aliasurile din afara acelor profile ca fiind invocate separat, iar comenzile de mentenanță sunt interzise în profilele de scanare doar-citire.

Aceste profile acoperă doar scanarea statică. Ele nu certifică testele de produs, acoperirea, împachetarea, verificările externe sau acceptarea completă pentru lansare a unui candidat. Admiterea în fluxurile de lucru folosește fișierele referite `config/quality/admission-policy.json` și `scripts/quality/admission-verdict.mjs`. Profilele de observator de lansare rămân separate; inspectați independent verificările și recipisele lor aplicabile. Inventarul descriptiv de mai jos este o referință, nu o dovadă că un gate a rulat efectiv.

Scripturile se află în `scripts/check/` (gate-uri de politică) și `scripts/quality/` (motor de ratchet). Sursa de adevăr pentru CI este `.github/workflows/ci.yml`.

### Calea rapidă pentru PR-urile de lansare (`quality.yml`)

`.github/workflows/quality.yml` completează CI pentru PR-urile către main/release, push-urile către `main`, dispatch și grupurile de îmbinare. PR-urile folosesc verificări rapide filtrate după cale. Build-ul duplicat dezactivat permanent a fost eliminat; verificările reale de build/package/boot rămân în CI.

| Sarcină                                          | Domeniu de aplicare                                                                                                                                                                                                                          | Blocantă                |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | PR-uri cu documentație/cod; referințe API docs și docs-all                                                                                                                                                                                   | Da                      |
| `Fast Quality Gates`                             | PR-uri de cod; verificări statice, typecheck, typecheck pentru dashboard, teste unitare afectate                                                                                                                                             | Da                      |
| `Forgotten sibling tests`                        | PR-uri de cod; modulele modificate urmărite până la consumatorii statici și la testele surori candidate; căile de tip barrel și de import dinamic sunt raportate ca diagnostice consultative, cu excepțiile referite din lista de permisiuni | **Consultativ**         |
| `Vitest (fast-path)`                             | PR-uri de cod; suită Vitest rapidă                                                                                                                                                                                                           | Da                      |
| `Unit Tests fast-path`                           | PR-uri de cod; suită de teste unitare cu 4 shard-uri                                                                                                                                                                                         | Da                      |
| `No new ESLint warnings`                         | PR-uri de cod; gardă lint conștientă de suprimări                                                                                                                                                                                            | Da, inclusiv fork-urile |
| `Merge integrity (changelog + generated skills)` | PR-uri care nu sunt ciornă; sincronizarea changelog-ului și a skill-urilor generate                                                                                                                                                          | Da, inclusiv fork-urile |

#### Raport privind testele surori uitate

`npm run check:forgotten-sibling-tests` refolosește rezolvitorul de importuri din spatele hărții de impact al testelor.
Pentru fiecare modul de producție modificat, raportează lanțuri deterministe de tip
`changed module/symbol -> static consumer -> candidate sibling test` atunci când testul
candidat lipsește din diff-ul pull request-ului. Rezumatul Markdown și rezultatul JSON sunt păstrate ca
artefactul de workflow `forgotten-sibling-tests` pentru calibrare înainte de orice lansare blocantă.

Re-exporturile barrel și importurile dinamice sunt doar diagnostice de rezoluție; nu creează niciodată o
constatare blocantă. Excepțiile revizuite se află în
`config/quality/forgotten-sibling-allowlist.json`. Fiecare intrare trebuie să numească consumatorul și testul
candidat, să ofere o justificare specifică și să conțină un link către un issue sau pull request GitHub. Intrările malformate eșuează
în mod restrictiv. Excepțiile nu pot suprima un test candidat șters sau un diff care adaugă `.skip`/`.todo`;
slăbirea aserțiunilor și alte forme de mascare rămân în responsabilitatea porții
`check:test-masking`, care blochează independent.

### Job: `lint`

Rulează la fiecare PR către `main`. Blochează îmbinarea în caz de eșec.

| Script (`npm run ...`)            | Validează                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blocant                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Versiunea Node.js se încadrează în intervalul acceptat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                          |
| `check:cycles`                    | Importuri circulare în întregul `src/` + `open-sse/` (bazat pe AST, cu rezolvarea `paths` din tsconfig). Varianta de bază (bare) iese cu codul 1 ori de câte ori există vreun ciclu (fail-closed din #15281) și listează SCC-urile. `check:cycles:ratchet` (ceea ce rulează CI) blochează atunci când numărul depășește pragul `metrics.cycles` din `quality-baseline.json` — în prezent 14, `direction: down`, deci poate doar să scadă (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da (ratchet)                                |
| `check:boundary`                  | Cuplarea `open-sse → src`: importuri unice fișier-la-fișier din motor în aplicație (`scripts/quality/measure-boundary.mjs`; lista de muchii este backlog-ul de remediere pentru separarea core/module din v4). Varianta de bază (bare) = raport consultativ (la fel ca `quality:boundary`). `check:boundary:ratchet` (ceea ce rulează CI, prezent și în bucla ratchet fast-gates din `quality.yml`) blochează atunci când numărul depășește pragul `metrics.boundaryOpenSseToSrc` din `quality-baseline.json` — inițializat la valoarea măsurată 771, `direction: down`; `--update` îl poate doar reduce; relativ la bază în PR-uri (`--base-ref`, vezi mai jos)                                                                                                                                                                                                                                           | Da (ratchet)                                |
| `check:route-validation:t06`      | Scheme Zod prezente pe toate rutele (politica Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                          |
| `check:any-budget:t11`            | Numărul de `@ts-expect-error // any` nu depășește bugetul (catracă de nivel 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                          |
| `check:provider-consistency`      | Fiecare furnizor din `providers.ts` are o intrare corespunzătoare în `providerRegistry.ts` (și invers, în limitele listei de permisiuni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                          |
| `check:model-lifecycle`           | Cele trei tabele de rutare menținute manual rămân coerente cu instantaneul de ciclu de viață inclus în depozit (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nu punctează niciun id retras pe care `REGISTRY` îl poate ruta; fiecare țintă `BUILT_IN_ALIASES` este prezentă în `REGISTRY` și absentă din instantaneul id-urilor retrase; fiecare id retras încă prezent în `REGISTRY` este redirecționat sau listat în `allowedRetiredInCatalog`; și nicio sursă sau țintă `DEFAULT_DEGRADATION_MAP` nu apare ca retrasă în acel instantaneu. Acest lucru nu dovedește că un model este deservit în prezent de un upstream activ. Offline — compară cu `config/quality/model-lifecycle.json`, reîmprospătat manual cu `npm run quality:refresh-model-lifecycle` (rețea; neconectat la CI). `allowedRetiredInCatalog` este o catracă de reducere progresivă: adaugă o intrare doar cu un tichet de urmărire. | Da                                          |
| `check:fetch-targets`             | Fiecare `fetch("/api/...")` din `src/` de partea clientului se rezolvă la un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                          |
| `check:deps`                      | Toate dependențele instalabile prin `npm install` din fiecare `package.json` din depozit se află în `dependency-allowlist.json`; pachetele noi, nefixate sau afectate de slopsquatting sunt semnalate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                          |
| `audit:deps`                      | `npm audit` (rădăcină + electron) — fără avize de severitate ridicată/critică (se suprapune cu osv `check:vuln-ratchet`; vezi Backlogul de raționalizare)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                          |
| `check:lockfile`                  | Integritatea `package-lock.json` — registry https, hash-uri de integritate, fără suprascrieri de gazdă                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                          |
| `check:licenses`                  | Listă de licențe SPDX permise pentru dependențele de producție                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                          |
| `check:tracked-artifacts`         | Fără artefacte de build / symlink-uri `node_modules` comise (rulează și în husky pre-commit; pre-push este intenționat simplificat — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                          |
| `check:ai-attribution`            | Fără trailer `Co-Authored-By` de la AI/bot sau subsol de generare AI în commit-urile, titlul sau corpul PR-ului — Regula strictă nr. 16 (în bucla fast-gates din `quality.yml` pentru PR→`release/**` — citește payload-ul evenimentului, nu face nimic în afara PR-urilor — și un pas exclusiv pentru PR în lint-ul din `ci.yml` pentru PR→`main`; de asemenea, hook-ul husky `commit-msg`; co-autorii umani sunt permiși; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Fiecare excluzie Vitest menționează un issue de urmărire și apare în `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                          |
| `check:file-size`                 | Fișierele sursă (`.ts`/`.tsx` în `src/`, `open-sse/`, `electron/`, `bin/`) rămân în limita `cap`, iar fișierele de test (`*.test.ts(x)`) în limita `testCap`; fișierele înghețate în `file-size-baseline.json` (`frozen` / `testFrozen`) nu trebuie să depășească dimensiunea înregistrată                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                          |
| `check:error-helper`              | Răspunsurile de eroare din executors/handlers folosesc `buildErrorBody()` / `sanitizeErrorMessage()` (Regula strictă #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                          |
| `check:migration-numbering`       | Fișierele SQL de migrare sunt numerotate secvențial, fără lacune sau duplicate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                          |
| `check:public-creds`              | Nicio cheie literală OAuth `client_id`/`client_secret` sau cheie Firebase Web în afara `publicCreds.ts` (Regula strictă #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                          |
| `check:db-rules`                  | Niciun SQL brut în afara modulelor `src/lib/db/`; fără barrel-imports din `localDb.ts` (Regulile stricte #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                          |
| `check:known-symbols`             | Executorii de provider, strategiile de rutare și translatorii înregistrați în tabelele lor de dispatch corespund fișierelor de pe disc — fără simboluri orfane sau nedeclarate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                          |
| `check:route-guard-membership`    | Fiecare rută care lansează un proces copil este clasificată de `isLocalOnlyPath()` (Regulile stricte #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                          |
| `check:test-discovery`            | Fiecare fișier `*.test.ts` / `*.spec.ts` din repo este colectat de cel puțin un runner de teste (ratchet: lista de orfani din `test-discovery-baseline.json` poate doar să se micșoreze)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                          |
| `check:agent-skills-sync`         | Artefactele agent-skills generate corespund catalogului lor sursă (fără deviații)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | Logo-urile/asset-urile furnizorilor au o înregistrare de proveniență consemnată                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | Fișierele de configurare JSON sunt analizate sintactic și respectă regulile de lint ale repo-ului                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | Compilare TypeScript fără erori (doar avertismente consultative)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` strict — orientat spre viitor; multe locuri de apelare preexistente încă au nevoie de adnotări                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Consultativ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` cu scop limitat la `src/app/(dashboard)/**` (#7033) — lista permisă de 27 de fișiere a lui `typecheck:core`, întreținută manual, nu include niciun TSX din dashboard, iar `next build` nu îl verifică niciodată la nivel de tipuri (`next.config.mjs` setează `ignoreBuildErrors: true`), astfel încât regresiile de identificatori orfani de acolo (#6625/#6909) erau invizibile pentru CI. Diferențe față de o bază de referință înghețată, cu numărătoare per fișier/per cod TS (`config/quality/dashboard-typecheck-baseline.json`, același model de aplicare împotriva învechirii ca `check:known-symbols`) — doar erorile NOI peste numărul din baza de referință fac poarta să eșueze; reduceți baza de referință cu `--update` atunci când o eroare preexistentă este remediată.                                                                                                             | Da                                          |

### Job: `quality-gate`

Rulează după `test-coverage`. Blochează îmbinarea în caz de eșec.

| Script                       | Validează                                                                                                                                                                                 | Blocant                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (numărul de avertismente ESLint, acoperirea din raportul îmbinat de shard-uri)                                                                               | Da (în amonte de ratchet) |
| `quality:ratchet`            | Fiecare metrică din `quality-baseline.json` nu s-a degradat (avertismente ESLint ≤ linia de bază; acoperire ≥ linia de bază)                                                              | Da                        |
| `check:duplication`          | Duplicarea codului (jscpd@4) nu depășește linia de bază din `quality-baseline.json`                                                                                                       | Da                        |
| `check:complexity`           | Complexitatea ciclomatică la nivel de fișier nu depășește limita maximă (`complexity` din ESLint core + `max-lines-per-function`)                                                         | Da                        |
| `check:cognitive-complexity` | Ratchet de complexitate cognitivă (`eslint-plugin-sonarjs`) — rulare ESLint separată; CI rulează ambele îmbinate ca un singur pas `check:complexity-ratchets`                             | Da                        |
| `check:dead-code`            | Ratchet-ul pentru exporturi / fișiere neutilizate (knip) nu se degradează față de linia de bază                                                                                           | Da                        |
| `check:compression-budget`   | Bugetul benchmark-ului de compresie — pragurile minime de economisire a tokenurilor per motor nu trebuie să se degradeze                                                                  | Da                        |
| `check:type-coverage`        | Ratchet-ul procentului de tipizare (`type-coverage`) nu se degradează; subsumă în mare măsură `typecheck:noimplicit:core`                                                                 | Da                        |
| `check:codeql-ratchet`       | Numărul de alerte CodeQL deschise nu se degradează (citește prin `gh api`; se omite grațios fără token) — cadența de reîmprospătare și declanșarea manuală: vezi „CodeQL ratchet" mai jos | Da                        |

### Job: `quality-extended`

Întregul job este consultativ (`continue-on-error: true`). Ratchet-urile bazate pe npm rulează
efectiv; scanerele externe se instalează prin `gh release download` și se omit singure (exit 0)
când un binar încă lipsește.

| Script                   | Validează                                                                                                                                                                                                                       | Blocant                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Fără dependențe circulare (dpdm)                                                                                                                                                                                                | **Consultativ**                                            |
| `check:bundle-size`      | Dimensiunea bundle-ului nu depășește limita maximă                                                                                                                                                                              | **Consultativ**                                            |
| `check:secrets`          | Scanarea secretelor (gitleaks) — se omite dacă binarul lipsește                                                                                                                                                                 | **Consultativ**                                            |
| `check:vuln-ratchet`     | Vulnerabilitățile dependențelor (osv-scanner) nu se degradează — se omite dacă binarul lipsește                                                                                                                                 | **Consultativ**                                            |
| `check:workflows`        | Lint pentru workflow-uri (actionlint + zizmor); scanerele lipsă/defecte, rapoartele invalide sau linia de bază ratchet lipsă eșuează ca INCOMPLETE. Constatările valide urmează politica strictă/consultativă/ratchet selectată | Execuție obligatorie; ratchet-ul zizmor este blocant în CI |
| `check:openapi-breaking` | Modificări care rup compatibilitatea contractului API public (`openapi.yaml`) față de ramura de bază (oasdiff) — emite `openapiBreaking=N`; se omite dacă oasdiff lipsește sau specificația de bază nu poate fi rezolvată       | **Consultativ**                                            |

### Job: `docs-sync-strict`

Rulează la fiecare PR către `main`. Blochează îmbinarea în caz de eșec.

| Script                         | Validează                                                                                                                                                                              | Blocant                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-poartă care rulează secvențial cele 6 sub-porți de mai jos                                                                                                                        | Da                         |
| ↳ `check:docs-sync`            | Coerența versiunilor între CHANGELOG / OpenAPI / llm.txt                                                                                                                               | Da                         |
| ↳ `check:docs-counts`          | Numărătorile din text (numărul de furnizori, numărul de migrații etc.) se încadrează în fereastra ratchet a numărătorilor reale                                                        | Da                         |
| ↳ `check:env-doc-sync`         | Fiecare variabilă de mediu din `.env.example` este documentată într-un tabel din documentație și invers                                                                                | Da                         |
| ↳ `check:deprecated-versions`  | Niciun șir de versiune depreciat în documentație                                                                                                                                       | Da                         |
| ↳ `check:doc-links`            | Linkurile markdown interne din documentație se rezolvă către fișiere reale (forma `[text]`/`(path)`)                                                                                   | Da                         |
| ↳ `check:fabricated-docs`      | Rutele, variabilele de mediu, comenzile CLI, numele de hook-uri și căile de fișiere citate în documentație există în baza de cod. Poartă strictă prin `--strict`; eșec soft fără flag. | Da (prin `--strict` în CI) |
| `check:cli-i18n`               | Șirurile comenzilor CLI sunt prezente în toate fișierele de localizare i18n                                                                                                            | Da                         |
| `check:openapi-coverage`       | Specificația OpenAPI acoperă cel puțin un prag minim ratchet de rute reale                                                                                                             | Da                         |
| `check:openapi-security-tiers` | Adnotările de nivel de securitate din `openapi.yaml` sunt coerente cu clasificările din `routeGuard.ts`                                                                                | **Consultativ**            |
| `check:openapi-routes`         | Fiecare cale din `openapi.yaml` se rezolvă către un `route.ts` real (anti-halucinație)                                                                                                 | Da                         |
| `check:docs-symbols`           | Fiecare referință `/api/...` din `docs/**/*.md` se rezolvă către un `route.ts` real (anti-halucinație)                                                                                 | Da                         |
| `i18n translation drift`       | Chei netraduse în fișierele de localizare i18n — doar avertisment                                                                                                                      | **Consultativ**            |

### Job: `i18n-ui-coverage`

| Script                            | Validează                                                                                                                                                                                                   | Blocant         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | Acoperirea cheilor i18n din UI este ≥ 65%                                                                                                                                                                   | Da              |
| `check-ui-value-drift` (inline)   | O **valoare** engleză rescrisă nu lasă în urmă nicio traducere învechită                                                                                                                                    | Da              |
| `check-new-key-coverage` (inline) | O cheie engleză **nouă** este tradusă în fiecare localizare — un marcaj `__MISSING__:` este respins                                                                                                         | Da              |
| `check-translation-ratio`         | Rata de traduceri reale per localizare (cheile-frunză identice cu engleza / placeholder / lipsă, din afara allowlist-ului) nu trebuie să depășească `config/quality/i18n-translation-baseline.json` + marjă | **Consultativ** |

Necesită `fetch-depth: 0` — poarta value-drift face diff între `en.json` și baza de merge.

#### `check-ui-value-drift` — poarta pentru traduceri învechite

Prinde singura regresie i18n pe care celelalte porți structural nu o pot vedea: o valoare
engleză este rescrisă, iar traducerile derivate din engleza _anterioară_ rămân în urmă,
așa că utilizatorii non-englezi continuă să citească un text formulat convingător, dar
între timp greșit.

S-a întâmplat pe bune. `oauthModal.googleOAuthWarning` a fost rescris când a ajuns helperul
de login Antigravity (#5203); **39 din 43 de localizări** au păstrat textul care îi îndemna
pe operatori să „copieze URL-ul complet și să-l lipească mai jos" — un flux care nu se poate
finaliza pentru acel furnizor. A trecut neobservat până la #8463 pentru că:

- `sync-ui-keys` completează doar cheile **absente**, niciodată pe cele **învechite**;
- `check-ui-keys-coverage` contorizează _prezența_ cheii, așa că o traducere învechită este
  contabilizată ca acoperită;
- `check-translation-drift` urmărește oglinzile de documentație `docs/i18n/<locale>/**.md` —
  nu citește niciodată `src/i18n/messages/*.json`. Blocant în jobul `docs-sync-strict` de la
  re-sincronizarea 2026-09: editezi un document de bază → `npm run i18n:run -- --files=<doc>`
  (la nivel de secțiune, ieftin).

**Conștient de diferențe, nu bazat pe baseline.** Compară `en.json` la baza de merge cu
arborele de lucru; pentru fiecare cheie a cărei valoare engleză s-a schimbat, orice localizare care
păstrează încă o traducere neatinsă este învechită. Acest lucru **îngheață în mod deliberat datoria
pre-existentă** — un diff nu poate dezvălui din ce engleză veche provine o traducere de lungă durată,
așa că poarta judecă doar ceea ce atinge schimbarea curentă. Alternativa (un baseline cu hash pe
fiecare cheie) ar costa un fișier generat de ~600 KB, de 3× mai mare decât cel mai mare baseline
existent, și ar genera modificări la fiecare PR de i18n.

Două moduri de a o satisface:

1. actualizează traducerile afectate, sau
2. setează-le la `__MISSING__:<new english>` — runtime-ul servește atunci engleza corectată
   (`src/i18n/request.ts::deepMergeFallback`, #7258) și cheia intră în coadă pentru traducere.

Dacă **sensul** șirului s-a schimbat, preferă **redenummirea cheii**: o cheie nouă nu poate moșteni
o traducere învechită. Acesta este modelul folosit de #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Iese cu 0 și `SKIP reason=base-unresolved` când catalogul de bază nu poate fi citit (clonă shallow
fără ref-ul de bază), oglindind `check-openapi-breaking`.

### Job: `i18n`

Matrice completă de validare i18n (un job per localizare). Întregul job este consultativ.

| Script                          | Validează                                 | Blocant                                                     |
| ------------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Completitudinea traducerii per localizare | **Consultativ** (`continue-on-error: true` pe întregul job) |

### Job: `pr-test-policy`

Rulează doar pe pull request-uri.

| Script                 | Validează                                                                                                                                         | Blocant |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-urile care modifică cod de producție în `src/`, `open-sse/`, `electron/` sau `bin/` trebuie să includă sau să actualizeze teste (Hard Rule #8) | Da      |
| `check:test-masking`   | Fișierele de test modificate nu reduc numărul net de aserțiuni și nu adaugă tautologii `assert.ok(true)`                                          | Da      |
| `check:pr-evidence`    | Corpul PR-ului citează dovezi din teste/VPS pentru schimbare (mecanizează Hard Rule #18 prin grep pe proza PR-ului — fragil, vezi Backlog)        | Da      |

### Job: `test-vitest`

Rulează după `build`. Blochează merge-ul la eșec.

| Suită            | Validează                                                 | Blocant                                                                                                        |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 unelte), autoCombo, cache — runner vitest | Da                                                                                                             |
| `test:vitest:ui` | Teste de componente UI — runner vitest                    | **Blocant** — eșecurile pre-existente sunt excluse explicit în `vitest.config.ts`; eșecurile noi picează jobul |

### Workflow-uri nocturne (programate, consultative)

Acestea rulează pe un program cron (și `workflow_dispatch`), niciodată pe PR-uri. Toate sunt consultative.

| Workflow               | Validează                                                                                                                                                              | Blocant         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | teste de proprietate fast-check cu seed aleatoriu + număr mare de rulări                                                                                               | **Consultativ** |
| `nightly-resilience`   | poartă de creștere a heap-ului, injectare de erori haotice, încărcare/soak k6                                                                                          | **Consultativ** |
| `nightly-llm-security` | gardă de injecție promptfoo (mod blocare) + sonde garak (omise fără un secret de provider)                                                                             | **Consultativ** |
| `nightly-schemathesis` | fuzzing de contract OpenAPI (schemathesis) împotriva unui OmniRoute live folosind `docs/openapi.yaml` — evidențiază încălcări de spec / 500-uri netratate (Fase 8 B.4) | **Consultativ** |
| `nightly-mutation`     | scor de mutation-testing Stryker pe calea rapidă de teste unitare — mutanții supraviețuitori evidențiază aserțiuni slabe                                               | **Consultativ** |
| `nightly-compat`       | matrice de compatibilitate a motorului Node între intervalele `engines.node` suportate                                                                                 | **Consultativ** |

Baseline-urile de performanță (heap, TTFB, timp de build) sunt înregistrate, nu impuse ca poartă: vezi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Faza de viteză (2026-08-30 → v4.0 LTS): fiecare valoare de referință a fost relaxată cu 20%

Decizia responsabilului (2026-08-30): până la modularizarea din v4.0, viteza de livrare contează mai mult
decât menținerea nivelului datoriei tehnice. Fiecare valoare de referință **numerică** a mecanismului incremental a fost relaxată cu 20% într-o
singură operațiune auditabilă, iar faza este declarată în `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Ce s-a schimbat                                                                                                                                                                                                                                                    | Unde                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — valorile pentru care mai mic înseamnă mai bine ×1.2, procentele pentru care mai mare înseamnă mai bine ÷1.2 (pragul minim de acoperire 60 a fost păstrat, `eslintErrors` rămâne 0, `eslintWarnings` 0 → 20% din numărul înghețat de suprimări) | `quality-baseline.json` (nota `_relax_velocity_2026_08_30` enumeră fiecare valoare înainte → după)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                   | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, fiecare limită de linii `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                       | `file-size-baseline.json`                                                                              |
| numărul per fișier / per cod TS ×1.2                                                                                                                                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` devine consultativ cât timp `_policy.requireTighten === false`                                                                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| procesul nocturn `bank-ratchet-shrinks` este întrerupt (ar înregistra reducerea măsurată și ar anula marja disponibilă)                                                                                                                                            | `.github/workflows/nightly-release-green.yml`                                                          |

Listele de permisiuni (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nu** sunt bugete și nu au fost modificate. Porțile de politici cu rezultat admis/respins (secrete, reguli SQL,
contractul documentație/mediu, paritatea i18n, testele unitare) rămân neschimbate — un test eșuat rămâne un test eșuat.

**Instrumente**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — relaxarea
  executată o singură dată (`scripts/quality/relax-baselines.mjs`); refuză să ruleze de două ori cu
  aceeași notă.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  măsoară fiecare poartă numerică în același mod ca CI și afișează marja rămasă pentru fiecare poartă
  (`scripts/quality/baseline-headroom.mjs`). Jobul nocturn `baseline-headroom` publică
  tabelul în rezumatul rulării fluxului de lucru și încarcă raportul JSON/Markdown ca
  `baseline-headroom-<run_id>`, păstrat timp de 90 de zile. Rândurile de avertizare și cele critice identifică porțile
  aflate la cel mult 10% de limita lor sau care au depășit-o deja. Consultați aceste rapoarte ca avertizare timpurie privind
  consumarea bugetelor; inspectați notele `_rebaseline_*` ale porții problematice. Jobul nu
  mai creează și nu mai actualizează un tichet permanent; #12149 păstrează istoricul rapoartelor anterioare.

**Modul pentru cod nou (Clean-as-You-Code) — începând cu 2026-08-30, numai pentru calea rapidă a PR-urilor**

La evenimentele `pull_request`, `quality.yml` transmite `--base-ref <PR base SHA>` către `check:file-size`,
`check:complexity-ratchets` și `check:dead-code`. Pentru `check:complexity-ratchets` și
`check:dead-code`, poarta compară HEAD cu baza comună a îmbinării, **limitată la fișierele modificate de PR**
(`scripts/check/newCodeMode.mjs`: baza comună a îmbinării este materializată într-un
`git worktree` temporar, ESLint/knip rulează acolo și pe HEAD, iar numerele per fișier sunt comparate):

- **blocant** — PR-ul a adăugat încălcări de complexitate ciclomatică/cognitivă sau exporturi neutilizate în fișierele pe care le-a modificat
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` în jurnal);
- **consultativ** — totalul global în raport cu valoarea de referință înghețată. Abaterile moștenite nu duc niciodată la eșecul unui
  PR nevinovat; abaterea este reînghețată la reconcilierea versiunii și monitorizată de jobul pentru marja disponibilă.

`check:file-size` utilizează referința de bază conform propriilor reguli (`scripts/check/check-file-size.mjs`, #8522):
verifică fiecare fișier sursă și de testare din arbore, citește numărul de linii al fiecăruia la baza PR-ului
cu `git show` și marchează un fișier ca eșuat numai când acesta crește peste valoarea mai mare dintre plafonul său de referință
(`frozen` / `testFrozen` sau `cap` / `testCap` pentru un fișier din afara referinței) și dimensiunea sa
de bază. Prin urmare, un fișier care prezenta deja abateri în bază nu duce niciodată la eșecul unui PR nevinovat.

`check:boundary:ratchet` aplică aceeași regulă singurului său număr
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): la evenimentele PR, atât
filtrele rapide din `quality.yml`, cât și jobul de lint din `ci.yml` transmit SHA-ul bazei PR-ului, commitul
de bază este măsurat dintr-un export `git archive`, iar PR-ul eșuează numai când numărul său de muchii
`open-sse → src` depășește valoarea mai mare dintre `metrics.boundaryOpenSseToSrc` și numărul de la bază. Deriva
bazei peste plafon este raportată (`derivă de bază moștenită`), dar nu face niciodată să eșueze un PR nevinovat; push → main
păstrează plafonul absolut, iar un SHA de bază care nu poate fi rezolvat revine la acesta, cu un avertisment.

Rulările `workflow_dispatch`, verificarea completă pentru o versiune validă și jobul nocturn pentru marja disponibilă nu au o bază PR
și păstrează comparația absolută (globală). Acoperirea, duplicarea și acoperirea tipurilor rămân globale
deocamdată (instrumentele lor nu produc eficient un diff per fișier) — fiind candidate pentru același tratament.

**Închiderea fazei la v4.0 (LTS = mai strict decât înainte, nu „înapoi la normal”)**

1. Pe vârful curat al `release/v4.0.0`: `npm run quality:headroom --json` pentru evidență, apoi
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, opțiunea
   `--update` pentru fiecare filtru de verificare a tipurilor — fiecare valoare de referință scade la valoarea măsurată.
2. Ștergeți `_policy` din `quality-baseline.json` (reactivează `--require-tighten` și acumularea
   nocturnă), restabiliți `THRESHOLD = 36` (sau mai mare) în `check-openapi-coverage.mjs`.
3. Înăspriți limitele dincolo de valorile măsurate acolo unde modularizarea a dat rezultate: `cap` pentru dimensiunea fișierelor înapoi la 1000
   (sau 800), pragurile minime de acoperire +5, 0 exporturi neutilizate pentru pachetele modularizate.

## Linia de referință ratchet (`quality-baseline.json`)

Motorul ratchet (`scripts/quality/check-quality-ratchet.mjs`) citește `quality-baseline.json`
și îl compară cu fișierul `quality-metrics.json` colectat recent. Orice metrică ce regresează
dincolo de valoarea epsilon corespunzătoare determină eșuarea compilării.

Metrici urmărite în prezent:

| Metrică               | Direcție | Semnificație                                         |
| --------------------- | -------- | ---------------------------------------------------- |
| `eslintWarnings`      | `down`   | Numărul de avertismente ESLint nu trebuie să crească |
| `coverage.statements` | `up`     | Acoperirea instrucțiunilor nu trebuie să scadă       |
| `coverage.lines`      | `up`     | Acoperirea liniilor nu trebuie să scadă              |
| `coverage.functions`  | `up`     | Acoperirea funcțiilor nu trebuie să scadă            |
| `coverage.branches`   | `up`     | Acoperirea ramurilor nu trebuie să scadă             |

Pentru a actualiza linia de referință după o îmbunătățire reală:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Opțiunea `--update` scrie valorile măsurate curente în `quality-baseline.json`.
Includeți acest fișier în același commit cu modificarea care a îmbunătățit metrica. Un PR care îmbunătățește o
metrică fără a actualiza linia de referință va fi detectat de `--require-tighten` (Faza 6A.5,
implementare în așteptare).

### Ratchet CodeQL: frecvența reîmprospătării și declanșarea manuală

`check:codeql-ratchet` citește **starea depozitului, reîmprospătată conform unei planificări — nu pentru fiecare PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` raportează
`state: configured`, `schedule: weekly`: scanarea cu configurarea implicită a GitHub, nu o analiză
la fiecare push. Consecință: după îmbinarea unui PR care REMEDIAZĂ alerte, mecanismul ratchet continuă să citească
numărul vechi, mai mare, până când rulează următoarea scanare programată — astfel încât raportează o regresie
pentru fiecare PR deschis, inclusiv pentru modificările ulterioare ale PR-ului de remediere, până când scanarea se actualizează.

**Reîmprospătare manuală**: `gh workflow run codeql.yml --ref release/vX.Y.Z` rulează din nou
analiza și republică alertele în câteva minute. Citiți mai întâi `.github/workflows/codeql.yml`
— antetul său explică faptul că este exclusiv `workflow_dispatch` **deoarece intră în conflict cu
„configurarea implicită” a GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Restabilirea declanșatorilor `push`/`pull_request`/
`schedule` necesită mai întâi o **acțiune din partea proprietarului**: Settings → Code security →
CodeQL: Default → Advanced. Nu adăugați un declanșator `schedule:` fără această comutare — acesta
va produce doar rulări eșuate.

**Restrângeți linia de referință după scăderea numărului** — `node scripts/check/check-codeql-ratchet.mjs
--update` scrie noul număr măsurat în `quality-baseline.json` →
`metrics.codeqlAlerts.value`, astfel încât mecanismul ratchet să nu permită în mod neobservat o regresie până
la vechiul plafon. Exemplu practic (2026-09-02/03): PR #12502 a remediat 7 alerte reale
(13 → 6 alerte deschise măsurate); PR #12530 a restrâns linia de referință înghețată de la 11 → 6 pentru a corespunde; cele
6 rămase au fost apoi respinse, fiecare cu o justificare individuală, până la 0 alerte deschise.

**Respingerea alertelor este decizia operatorului (Regula strictă #14)** — nu respingeți niciodată o alertă CodeQL
fără a consemna justificarea tehnică în comentariul de respingere: `won't fix` pentru
o cerință a protocolului din amonte, `used in tests` pentru un fixture de test, `false positive`
pentru un mecanism de sanitizare pe care CodeQL nu îl poate identifica (precedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Politica de reîncercare a testelor (WS5.4, v3.8.49)

Reîncercarea este configurată per runner, niciodată global — o reîncercare generală transformă regresiile reale
în teste instabile invizibile:

| Runner           | Politică                                                                                                                          | Motiv                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` numai în CI, cu `trace: on-first-retry`                                                                              | Timpii browserului/rețelei sunt cu adevărat nedeterminiști; o reîncercare cu o urmă transformă un test instabil într-un artefact diagnosticabil |
| Vitest           | FĂRĂ reîncercare globală. Un test dovedit instabil primește o reîncercare explicită per test (vizibilă în diff, verificată în PR) | Păstrează lista de carantină în repo, niciodată opacă                                                                                           |
| node:test (unit) | FĂRĂ reîncercare, niciodată                                                                                                       | Un test unitar instabil este o eroare în test — remediați-l, nu îl rulați din nou                                                               |

SLO-uri țintă după implementarea telemetriei pentru teste instabile (WS5.2/5.3): rată de instabilitate <1% per test
(pragul „remediați acum”), rată de succes ≥95% per pipeline. Valori de referință din industrie —
recalibrați-le pe baza propriilor noastre măsurători.

## Deriva ratchet-ului la nivel de release (WS5.5, v3.8.49)

Când un ratchet (dimensiunea fișierelor, complexitate, avertismente eslint) regresează pe vârful release-ului PUR
— adică însăși COMBINAȚIA operațiunilor de merge a produs regresia, iar niciun PR individual nu reproduce
regresia pe propria ramură — remedierea îi revine **release captain-ului, o singură dată, pe ramura de
release**: preferați extragerea/refactorizarea; restabiliți baseline-ul numai cu intrarea de justificare
documentată. Nu transferați niciodată deriva rezultată din combinație către PR-ul unui contributor și nu
restabiliți niciodată baseline-ul per PR (aceasta ascunde regresiile reale). Mai întâi faceți distincția: reproduceți
starea roșie pe vârful pur într-un worktree de verificare înainte de a presupune că PR-ul vostru a cauzat-o.

## Stocarea reducerilor ratchet-ului — direcția descendentă (#8584)

Ratchet-ul este automat doar pe jumătate și tocmai jumătatea greșită. **Creșterea** unei limite este o
editare JSON manuală care durează zece secunde și reprezintă cea mai rapidă metodă de a debloca un PR roșu.
**Reducerea** uneia necesită ca cineva să ruleze `--update` și să comită rezultatul — iar până la introducerea
jobului `bank-ratchet-shrinks`, niciun flux de lucru nu îl rula. Consecința măsurată
(2026-07-25): 18 fișiere înghețate aflate deja la limita de 800 de linii pentru fișiere noi sau sub aceasta, cel mai grav
caz fiind la 132× (`src/shared/validation/schemas.ts`, 19 linii cu o limită de 2.523); plafonul
de complexitate a evoluat `1794 → 2169` pe parcursul a ~37 de note de restabilire a baseline-ului, cu exact o
scădere (−1); iar „restrângeți prin `--update` în ciclul următor” a fost scris de 31 de ori și respectat
o singură dată. O limită care supraviețuiește codului ce a justificat-o transformă discret fiecare
descompunere finalizată într-o marjă de creștere pentru următoarea persoană care editează fișierul.

`nightly-release-green.yml` → jobul **`bank-ratchet-shrinks`** închide această buclă:

|            |                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| Rulează la | `schedule` (3×/zi) + `workflow_dispatch` — în mod deliberat **nu** la `push`                              |
| Măsoară    | cel mai recent `release/vX.Y.Z`, cu aceeași rezoluție + aceeași protecție la injectare ca `release-green` |
| Scrie      | `check:file-size --update` și `check:complexity-ratchets --update` (ambele reduc numai prin construcție)  |
| Verifică   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                  |
| Livrează   | un singur PR permanent actualizat către ramura de release — actualizat forțat, fără spam                  |

Stocarea se face în loturi, nu la fiecare push, deoarece nu are cerințe de latență (o reducere
stocată în decurs de 8h este acceptabilă), în timp ce o rulare la fiecare merge ar reconstrui în mod repetat ramura PR-ului
în timpul campaniilor de merge și ar suporta de fiecare dată costul unei parcurgeri ESLint complete. Detectarea rămâne la
push (`release-green`); numai stocarea se face în loturi.

### Verificatorul de siguranță

Jobul scrie nesupravegheat în baseline-uri, astfel că `verify-ratchet-bank.mjs` este ceea ce face
acest lucru acceptabil. Acesta compară arborele de după `--update` cu `HEAD` și **abandonează jobul
înainte să existe vreun commit** — fără a deschide niciun PR — dacă fiecare modificare nu este una dintre următoarele:

- o intrare numerică `frozen` / `testFrozen` **redusă** sau **eliminată**
- `complexity-baseline.json` → `count` **redus**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **redus**

Orice altceva eșuează: creșterea unui număr, adăugarea unei intrări, modificarea `cap`/`testCap` sau
ștergerea/rescrierea unei note `_rebaseline_*` (acele note reprezintă istoricul de audit al motivului pentru care există fiecare
plafon și sunt stocate în același obiect `frozen` ca intrările fișierelor).
Un bot care ar putea crește o limită ar fi categoric mai rău decât situația actuală. Protecție împotriva regresiilor:
`tests/unit/verify-ratchet-bank.test.ts`.

Jobul nu face niciodată push către `release/*` — un om face merge pentru PR, astfel încât o măsurătoare eronată
nu poate ajunge în cod fără verificare.

## Politica listei de permisiuni

Fiecare control care nu poate eșua din cauza încălcărilor preexistente utilizează o listă de permisiuni înghețată
(de exemplu, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politica este:

**Remediați cauza principală; utilizați lista de permisiuni numai atunci când încălcarea este preexistentă și
nu poate fi remediată în același PR.**

Când adăugați o intrare într-o listă de permisiuni:

1. Includeți un comentariu cu justificarea.
2. Faceți referire la problema de urmărire (de exemplu, `// #3498 — Funcționalitate din Faza 2, neimplementată încă`).
3. Eliminați intrarea în același PR care remediază încălcarea — o intrare învechită care nu mai
   suprimă o încălcare activă este ea însăși un defect (verificarea intrărilor învechite 6A.3 va
   face controlul să eșueze pentru o intrare orfană din lista de permisiuni după implementare).

**Nu** adăugați intrări în lista de permisiuni pentru ca testele să treacă mai repede. Un control reușit cu o
listă de permisiuni în continuă creștere oferă o falsă impresie de calitate.

### Când un control eșuează pentru PR-ul dvs.

1. **Citiți cu atenție rezultatul controlului** — acesta vă indică exact ce fișier sau simbol a încălcat
   regula.
2. **Remediați încălcarea** — majoritatea controalelor sunt verificări deterministe ale sistemului de fișiere care trec imediat
   ce codul este corect.
3. **Dacă încălcarea este preexistentă** (adică nu a fost introdusă de dvs., dar acum intră
   în aria de acoperire a controlului): adăugați o intrare în lista de permisiuni, cu un comentariu justificativ și o problemă de urmărire.
4. **Dacă verificarea este un mecanism cu prag progresiv** (acoperire, avertismente ESLint, duplicare, complexitate):
   modificarea dvs. a înrăutățit metrica. Remediați problema de fond sau, în cazuri rare, rulați
   `npm run quality:ratchet -- --update` dacă modificarea este intenționată, iar
   degradarea metricii este acceptabilă — însă documentați motivul în descrierea PR-ului.
5. **Controalele consultative** (`continue-on-error: true`) au rol informativ — acestea nu blochează
   îmbinarea, dar apar în rezumatul CI. Remediați-le oricum.

---

## Adăugarea unui control nou

1. Creați `scripts/check/check-<name>.mjs` (sau `.ts`). Controalele de politică se încheie cu codul 0/1.
   Controalele de tip prag progresiv emit o metrică în `quality-metrics.json` prin `collect-metrics.mjs`.
2. Adăugați `"check:<name>": "node scripts/check/check-<name>.mjs"` în `package.json`.
3. Integrați-l în `.github/workflows/ci.yml`, în cadrul jobului corespunzător
   (politică → `lint` sau `docs-sync-strict`; prag progresiv → `quality-gate`).
4. Dacă are o listă de permisiuni, aplicați `reportStaleEntries()` din
   `scripts/check/lib/allowlist.mjs`, astfel încât intrările învechite să fie detectate automat.
5. Scrieți un test în `tests/unit/build/` care să acopere logica de detectare a controlului.
6. Actualizați acest document (adăugați un rând în tabelul jobului relevant).

---

## Instrumente pentru agenți: LSP integrat în buclă (opțional)

Pe lângă controalele CI, OmniRoute include o structură de bază **opțională** `agent-lsp`
(un fișier `.mcp.json` la nivel de proiect, Faza 7, Sarcina 15). Creați `.mcp.json`
pentru a expune un server de limbaj TypeScript agenților de programare, astfel încât aceștia să rezolve simbolurile /
diagnosticele **înainte** de a scrie cod — un mecanism complementar „compilare înainte de afirmare” pentru
`typecheck:core`, care elimină de la sursă erorile de tip „simbol inventat”. În mod intenționat,
acesta nu este încărcat automat (dvs. alegeți și verificați puntea MCP↔LSP); o intrare nefuncțională doar înregistrează o
eroare de conexiune și nu întrerupe niciodată sesiunile.

---

## Restanțe de raționalizare (analiză ROI — Faza 9 Valul 3)

Acest inventar a fost reconciliat cu `ci.yml` la 2026-06-17 (versiunea anterioară omitea
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). O analiză ROI a setului reconciliat
a identificat următorii candidați pentru raționalizare. **Comasările sunt modificări CI
mecanice; schimbările de stare/eliminările sunt decizii de politică rezervate operatorului.** Nimic din cele de mai jos
nu este aplicat încă.

**De asemenea, nedocumentate mai sus** (consultative, semnal slab): jobul `docs-lint`
(markdownlint + Vale, întregul job având `continue-on-error`) și fluxurile de lucru autonome de scanare
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` se află în
`quality-baseline.json`, dar nu este conectat la un prag incremental blocant în `ci.yml` — metrica este
în prezent orfană.

### Comasare / deduplicare (mecanică, risc mai redus)

Fiecare candidat a fost validat în raport cu starea efectivă a mecanismelor de control la 2026-06-17 (încredere, dar cu verificare);
mai multe comasări „evidente” s-au dovedit a ascunde datorie și **nu** pot fi aplicate direct fără probleme.

- **`check:docs-sync` rulează de două ori** — autonom în jobul `lint` și din nou în `check:docs-all` (`docs-sync-strict`) și în hook-ul husky de pre-commit. ✅ **FINALIZAT** — invocarea autonomă din `lint` a fost eliminată.
- **Scanarea CVE** — ❌ **NU este o comasare fără probleme.** `audit:deps` eșuează categoric pentru orice CVE de severitate ridicată/critică; `check:vuln-ratchet` (osv) eșuează numai la o _regresie_ față de valoarea de referință (în prezent 1 MODERATE). Semantică diferită — eliminarea `audit:deps` ar înlătura pragul absolut pentru severitate ridicată/critică. Păstrați-le pe ambele.
- **Detectarea ciclurilor** — ✅ **FINALIZAT** (#15159 G-01/G-02). Textul anterior numea `check:cycles` mecanismul de control „verde, selecționat” și justifica păstrarea sa ca blocant deoarece `check:circular-deps` (dpdm) raporta 91 de cicluri. Acel rezultat verde era un **fals pozitiv verde**: `check:cycles` scana 5 subdirectoare (450 de fișiere), identifica numai construcțiile statice `import|export … from` și elimina fiecare specificator `@/` și `@omniroute/open-sse/`, astfel încât nu putea detecta ciclurile cu import dinamic + alias care predominau în depozit. Remediere: mecanismul de control parcurge acum `src` + `open-sse` (5023 de fișiere), colectează specificatorii din AST-ul TypeScript (astfel încât `import("…")` este luat în calcul, iar `typeof import("…")` din poziții de tip nu este) și rezolvă `paths` din tsconfig. Găsește **14** cicluri, nu 0. Deoarece 14 cicluri preexistente nu pot fi remediate într-un PR dedicat mecanismului de control, `check:cycles` este acum un **prag incremental** (`--ratchet`, plafon `metrics.cycles.value = 14` în `quality-baseline.json`, `direction: down`) — blochează orice _regresie_, iar numărul poate doar să scadă. CI rulează `npm run check:cycles:ratchet`. Reducerea treptată este gestionată împreună cu **A-01**. `check:circular-deps` (dpdm) rămâne consultativ, ca a doua opinie mai cuprinzătoare.
- **Complexitate** — ✅ **FINALIZAT** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): o singură parcurgere ESLint, cu numărare după ruleId, astfel încât valorile de referință pentru complexitatea ciclomatică+numărul maxim de linii și cele cognitive să rămână independente; comenzile individuale `check:complexity` / `check:cognitive-complexity` rămân disponibile pentru rularea locală cu `--update`.
- **Anti-halucinații pentru `/api`** — ✅ **FINALIZAT** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un singur inventar FS pentru `src/app/api`; openapi-routes + docs-symbols continuă să raporteze independent; comenzile individuale rămân disponibile pentru rulări locale.
- **`check:node-runtime` rulează în 11 joburi** — ⚠️ **ROI scăzut.** Fiecare folosește un runner separat, iar verificarea durează <1s; economia totală este de ~10s, în schimbul pierderii unei verificări ieftine pentru fiecare job. Nu merită perturbarea.
- **`typecheck:noimplicit:core` în lint-ul CI** — ✅ **eliminat din jobul lint** (era consultativ, cu `continue-on-error`); suprafața de tipuri blocantă este `typecheck:core` + `check:type-coverage`. Scriptul local a fost păstrat.

### Schimbare de stare / decizie (politica operatorului)

- `check:openapi-security-tiers` (consultativ) — ❌ **NU poate deveni blocant fără modificări prealabile.** Se încheie cu codul 0, dar avertizează că mai multe rute `traffic-inspector` din `LOCAL_ONLY_API_PREFIXES` nu au adnotarea `x-loopback-only: true`. Aplicarea strictă necesită mai întâi adăugarea acestor adnotări în `openapi.yaml`.
- `typecheck:noimplicit:core` (consultativ) — în mare parte înlocuit de pragul incremental blocant `check:type-coverage`. Transformați-l într-un prag incremental sau eliminați a doua rulare redundantă a `tsc`.
- `test:vitest:ui` (acum **blocant**) — eșecurile preexistente sunt excluse explicit în `vitest.config.ts` prin comentarii de urmărire `// #8618`; eșecurile noi duc la eșuarea jobului.
- `check:secrets` (gitleaks, prag incremental blocant înghețat la 3 rezultate fals pozitive documentate) — adăugați-le pe cele 3 în lista de permisiuni pentru a ajunge la 0 sau retrogradați verificarea la statut consultativ. Se suprapune cu scanarea nativă a secretelor oferită de GitHub + `check:public-creds`.
- `check:pr-evidence` (blocant, caută prin grep în proza din corpul PR-ului) — risc ridicat de rezultate fals pozitive; eliminarea sa slăbește aplicarea Regulii stricte #18, deci aceasta este o veritabilă decizie de politică.
- `semgrep` (autonom, consultativ) — se suprapune cu CodeQL pentru familiile OWASP; conectați valoarea sa de referință la un prag incremental sau eliminați-l.

---

## Documentație asociată

- Lanț de aprovizionare (proveniență, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — poartă pentru paritatea seturilor de chei

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, jobul `i18n-ui-coverage`).
Compară setul de chei-frunză al fiecărui fișier `src/i18n/messages/<locale>.json` cu `en.json` și eșuează
la orice cheie-frunză absentă sau suplimentară, indiferent de momentul în care a fost adăugată cheia. Substituenții
`__MISSING__:` sunt considerați prezenți (conținutul lor ține de poarta bazată pe raport). Este complementul absolut
al celor două porți bazate pe diferențe/procente: `check-ui-keys-coverage` impune un prag minim de 80 % pentru fiecare
localizare (43 de chei absente din ~13.000 indică totuși 99,7 %), iar `check-new-key-coverage` evaluează
doar cheile pe care un PR le adaugă în `en.json`. Un lot de localizări este generat din versiunea `en.json` existentă în ziua
în care este creată ramura sa și este tradus timp de mai multe zile, în vreme ce baza continuă să adauge chei; PR-ul lotului nu adaugă el însuși
nicio cheie, astfel că ambele porți înrudite au rămas inactive când lotul 1 (#13044) a fost integrat cu 43 de chei lipsă în nouă
localizări, iar lotul 2 (#13660), cu 10 chei lipsă în opt localizări (2026-09-15). Remediați o eroare cu
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; o cheie-frunză `extra`
înseamnă că sursa a eliminat-o — ștergeți-o din localizare. `--warn` raportează fără a provoca eșuarea.
`--catalog=cli` execută aceeași comparație pentru `bin/cli/locales` (`npm run i18n:check-keys:cli`);
ambii pași se află în jobul `i18n-ui-coverage`.

#### `check-new-key-coverage` — poartă i18n pentru chei noi

Poartă înrudită cu `check-ui-value-drift`. Aceasta din urmă detectează o valoare în limba engleză care a fost **rescrisă**
în timp ce traducerile sale au rămas neschimbate; aceasta detectează o cheie în limba engleză care a fost **adăugată**
fără ca unele localizări să o primească.

`check-ui-keys-coverage` nu poate detecta această categorie: impune un prag procentual minim pentru fiecare localizare, iar
unsprezece chei absente din ~13.000 mențin acoperirea la 99,9 %. Un procent per limbă nu poate
exprima „această funcționalitate a fost livrată netradusă” — o funcționalitate întreagă poate ajunge într-o localizare nouă fără niciun
text și fără să modifice vreodată procentul.

Incidentul pe care îl codifică: faza 3 a Orchestration Canvas și-a tradus cele unsprezece chei în
cele 42 de localizări existente la acel moment. Câteva ore mai târziu, lotul de limbi UE (#13044) a mărit depozitul
la 51 de localizări, iar cele nouă nou-venite (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nu le-au
primit niciodată. `deepMergeFallback` înlocuiește o cheie absentă cu textul în limba engleză, astfel încât modul de manifestare a erorii a fost
o interfață netradusă, nu una goală — o problemă reală și, prin construcție, silențioasă.

La fel ca poarta înrudită, aceasta este **conștientă de diferențe**, comparând versiunea în limba engleză de la baza îmbinării cu arborele
de lucru, astfel încât lacunele preexistente rămân înghețate, iar poarta nu a necesitat nicio migrare pentru a fi activată.

**Un marcaj `__MISSING__:<english>` nu o satisface (începând cu 2026-09-17).** Anterior, acesta era
mecanismul documentat pentru amânare — la rulare se revine la textul corect în limba engleză — până când opt PR-uri cu funcționalități din
2026-09-16 au adăugat 61 de chei și au introdus marcajul în toate cele 65 de localizări în loc să traducă: această
poartă le-a acceptat pe toate, nimic nu a blocat PR-urile, iar poarta blocantă bazată pe raportul traducerilor reale
a eșuat apoi la vârful versiunii pentru toată lumea (pt-BR 3,2 % > 2,5 % + 0,5). Un marcaj este acum considerat
o traducere absentă. Remediați o eroare cu
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` sau
toate localizările în paralel cu `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sigur pentru execuție detașată, refuză să pornească fără variabilele de mediu `OMNIROUTE_TRANSLATION_*`). O cheie care trebuie să rămână
în limba engleză (numele fix al unui produs/motor/indicator) trebuie inclusă în `scripts/i18n/untranslatable-keys.json`,
niciodată ascunsă în spatele unui marcaj. `vi` interzice complet marcajele (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — poartă pentru testele suspendate

Un fișier din lista `exclude` a `vitest.config.ts` este un test care nu rulează, dar pare
acoperire pentru oricine examinează arborele. Șaizeci și două de fișiere s-au acumulat în spatele comentariului
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Problema #8618 a fost închisă la
2026-08-11, în timp ce lista pe care o urmărea a crescut de la 45 la 62 de intrări, fiecare intrare nouă moștenind un comentariu
care indica o problemă închisă. Când lista a fost în cele din urmă măsurată fișier cu fișier (#13204), **51 dintre cele 62
au trecut pe arborele curent fără nicio modificare a sursei**.

Poarta impune ca fiecare excludere care se rezolvă la un fișier real (a) să numească o problemă de urmărire și
(b) să apară în `config/quality/vitest-exclusions.json` împreună cu starea sa măsurată, astfel încât adăugarea uneia să fie
o diferență ce poate fi revizuită într-un fișier dedicat, în loc de încă o linie într-o matrice cu 60 de intrări. În mod intenționat,
aceasta nu rulează din nou testele excluse — operațiunea durează ~10 minute și aparține unui job periodic; inventarul
înregistrează momentul ultimei măsurători a fiecăruia.
