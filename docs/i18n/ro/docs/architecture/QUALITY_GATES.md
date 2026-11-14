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

## Inventar porți și profile de execuție

### Admiterea candidatului

Fluxurile de lucru CI și Quality Gates emit fiecare un verdict stabil: `Gate / CI` și `Gate / Quality`. Politica lor de admitere cu versiuni enumeră fiecare job din amonte, așa cum este necesar sau consultativ. Un loc de muncă solicitat aplicabil trebuie să reușească: rezultatele lipsă, anulate, ignorate, în așteptare și necunoscute nu pot stabili PASS. O clasificare validă numai pentru documente sau numai pentru catalog poate face inaplicabilă o bandă de cod; un proiect PR nu este un candidat acceptat. O etichetă `hotfix` nu renunță la dovezi.

Ambele fluxuri de lucru acoperă PRs în ramuri main/release, împingeri către `main`, expediere manuală și evenimente de grup de îmbinare. Push, dispatch și merge-group rulează selecția completă. Apăsările către `release/**` nu le pornesc (2026-10-18): fiecare modificare a rulat deja matricea pe PR său, iar combinația îmbinată este treaba lui Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). Furcăturile și grupurile de îmbinare folosesc alergători găzduiți pentru joburi care, altfel, selectează alergători auto-găzduiți; trebuie verificată o capacitate suficientă găzduită înainte de lansare.

Un PR obișnuit rulează selecția rapidă. Benzile `full-code` și `full-code-e2e` ale politicii de admitere (E2E, integrare, pachet artefact, Electron smoke, Bun SQLite, ecosistem și clienți de protocol) rulează numai pe o schiță de coadă Mergify sau pe o rulare completă: `gh workflow run ci.yml --ref <branch>`.

Fiecare chitanță JSON identifică SHA extras, rularea fluxului de lucru și încercarea. CLI respinge o nepotrivire checkout/event SHA. Testele fluxului de lucru leagă calitatea de membru al politicii de lista `needs` a jobului de verdict, astfel încât o bandă nouă sau eliminată să nu poată dispărea în tăcere. Chitanțe acoperă propriul flux de lucru, nu publicarea, implementarea sau elementele interne ale unui scaner de consiliere existent. Activarea ambelor nume de cec în regulile de ramură este o modificare administrativă separată; adăugarea acestor locuri de muncă nu protejează în sine o sucursală.

### Coada de îmbinare

Eticheta `queue` trimite un PR la coada Mergify (`.mergify.yml`). Mergify deschide o schiță PR pe o ramură `mergify/merge-queue/`, CI rulează selecția completă acolo, iar PR original fuzionează când `Gate / CI`, `Gate / Quality` și `Merge integrity (changelog + generated skills)` trec.

Mergify își scrie rezumatul cozii în descrierea schiței, iar alte aplicații îl pot edita și ele. Un eveniment `pull_request` `edited` pe un astfel de draft își ia propriul grup de concurență (`-queue-edit-<run_id>`), astfel încât nu poate anula rularea reală a draft-ului și omite poarta și matricea. Doar `Merge integrity` mai rulează. Lucrarea de poartă omisă poartă un nume de verificare diferit, deoarece Mergify citește un `Gate / CI` omis ca o verificare nereușită și scoate din coadă PR.

După o scoatere din coadă, o apăsare nu reia întotdeauna PR. Comentează `@mergifyio queue` la el.

### Dovezi reținute în reductorul de acceptare

`scripts/quality/validate-release-acceptance.mjs` reduce un plan furnizat și manifestele acestuia; nu stabilește că planul acoperă întreaga conductă de eliberare. Rapoartele sale stabilesc în mod explicit `releaseAcceptance: false`, chiar și atunci când acel plan este `VERIFIED`. Fluxul de lucru `release-acceptance.yml` folosește în continuare dispozitive de umbră, nu chitanțe reale de construcție, pachet, boot sau promoție.

CLI cere ca `--evidence-root` să verifice dovezile reținute. Fișierele sunt rezolvate ca `<evidence-root>/<artifact_id>/<member>` și indexate ca SHA-256. O înregistrare PASS fără dovezi, un fișier lipsă sau schimbat, o cale nesigură sau un link simbolic împiedică verificarea. Fișierele lipsă nu sunt echivalente cu jurnalele de succes goale. Verificările SHA/run/attempt existente rămân independente: octeții potriviți nu pot salva o chitanță veche. Integritatea fișierului nu este dovada autenticității execuției sau promovarea artefactului.

### Inventar de scanare statică

Inventarul npm-alias cu versiune și apartenența la scanare statică se află în `config/quality/gate-manifest.json`. Rulați `npm run check:gate-manifest` pentru a valida numele de script și comenzile exacte împotriva `package.json`; adăugările, eliminările și deriva de comandă nu reușesc atât cârligul local, cât și joburile de modificare a clasificarii din CI. Un alias nu este o lucrare de flux de lucru, o instanță de matrice sau un caz de testare: aceste contori nu trebuie să fie prezentate ca interschimbabile.

Utilizați `npm run quality:scan -- --list` sau `npm run quality:scan:fast -- --list` pentru a inspecta aliasurile selectate fără a le executa. Runnerul invocă punctul de intrare npm, astfel încât timpul de rulare al acestuia (inclusiv Bun unde este configurat) este păstrat. Manifestul înregistrează aliasuri din afara acelor profiluri ca fiind invocate separat, iar comenzile de întreținere sunt interzise în profilurile de scanare doar în citire.

Aceste profiluri acoperă numai scanarea statică. Nu certifică testele de produs, acoperirea, ambalarea, controalele externe sau acceptarea completă a lansării de către un candidat. Admiterea fluxului de lucru utilizează `config/quality/admission-policy.json` și `scripts/quality/admission-verdict.mjs` conectate. Profilurile de eliberare-observator rămân separate; inspectează în mod independent cecurile și chitanțele aplicabile. Comenzile statice ale observatorului complet sunt declarate în `config/quality/release-green-static-profile.json`, inclusiv `audit:deps`, selecția testului de mutație și verificările de traducere. Încărcătorul validează comenzile npm față de declarațiile package.json și CI/Quality modelate; respinge deriva în loc să execute token-uri shell ca argumente. Ieșirea SKIP/INCOMPLETE necesară scanerului nu poate stabili PASS. Profilul înregistrează excluderile sale externe și nu înlocuiește acoperirea găzduită, matricele de testare, pachetul sau dovezile de implementare. Inventarul de proză de mai jos este o referință, nu o dovadă că o poartă de fapt a funcționat.

Scripturile trăiesc sub `scripts/check/` (porți de politică) și `scripts/quality/` (motor cu clichet). Sursa CI a adevărului este `.github/workflows/ci.yml`.

### Lansați calea rapidă PR (`quality.yml`)

`.github/workflows/quality.yml` completează CI pe main/release PRs, împinge la `main`, trimite și îmbina grupuri. PRs folosește verificări rapide filtrate de cale. Compilarea duplicată dezactivată definitiv a fost eliminată; verificările build/package/boot reale rămân în CI. Unit Suite și Vitest rulează numai în CI (`Unit Tests (N/8)` și `Vitest`).

| Post                                             | Domeniul de aplicare                                                                                                                   | Blocare              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs și docs-all                                                                                               | Da                   |
| `Fast Quality Gates`                             | Cod PRs; verificări statice, verificare tip, verificare tip tablou de bord, teste unitare afectate, teste de frați uitate (consiliere) |
| `No new ESLint warnings`                         | Cod PRs; apărător de scame conștient de suprimări                                                                                      | Da, inclusiv furcile |
| `Merge integrity (changelog + generated skills)` | PRs fără schiță ; jurnalul de modificări și sincronizarea abilităților generate                                                        | Da, inclusiv furcile |

#### Raportul testelor de frați uitate

`npm run check:forgotten-sibling-tests` rulează ca un pas consultativ al `Fast Quality Gates` și reutilizează soluția de import din spatele hărții de impact al testului. Pentru fiecare modul de producție modificat, raportează lanțuri `changed module/symbol -> static consumer -> candidate sibling test` deterministe atunci când testul candidat este absent din difer-ul de solicitare pull. Rezumatul Markdown și rezultatul JSON sunt păstrate ca artefact al fluxului de lucru `forgotten-sibling-tests` pentru calibrare înainte de orice lansare de blocare.

Reexporturile de baril și importurile dinamice sunt doar diagnostice de rezoluție; nu creează niciodată o constatare de blocare. Excepțiile revizuite live în `config/quality/forgotten-sibling-allowlist.json`. Fiecare intrare trebuie să denumească testul consumatorului și candidatului, să ofere o justificare specifică și să conecteze o problemă GitHub sau o cerere de extragere. Intrările malformate nu s-au închis. Excepțiile nu pot suprima un test candidat șters sau un diff care adaugă `.skip`/`.todo`; slăbirea afirmației și alte mascări rămân deținute de poarta `check:test-masking` care blochează independent.

### Job: `lint`

Se rulează pe fiecare PR la `main`. Blocurile fuzionează la eșec.

| Script (`npm run ...`)            | Validează                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blocare                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Versiunea Node.js este în intervalul acceptat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                          |
| `check:cycles`                    | Importuri circulare în toate `src/` + `open-sse/` (bazat pe AST, tsconfig `paths` rezolvat). Bare exits 1 ori de câte ori există vreun ciclu (fail-closed de la #15281) și listează SCCs. `check:cycles:ratchet` (ce rulează CI ) se blochează atunci când numărul depășește plafonul `metrics.cycles` în `quality-baseline.json` — în prezent 14, `direction: down`, deci poate scădea doar (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da (clichet)                                |
| `check:boundary`                  | Cuplare `open-sse → src` : importuri unice fișier-la-fișier din motor în aplicație (`scripts/quality/measure-boundary.mjs`; lista marginală este stocul de remediere core/module-split v4). Raport consultativ = complet (la fel ca `quality:boundary`). `check:boundary:ratchet` (ce rulează CI, de asemenea în bucla cu clichet `quality.yml` fast-gates) se blochează când numărul depășește plafonul `metrics.boundaryOpenSseToSrc` în `quality-baseline.json` — însămânțat la măsurat 771, `direction: down`; `--update` doar o scade; relativă de bază pe PRs (`--base-ref`, vezi mai jos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da (clichet)                                |
| `check:route-validation:t06`      | Scheme Zod prezente pe toate rutele (politica de nivel 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                          |
| `check:any-budget:t11`            | Numărul `@ts-expect-error // any` nu depășește bugetul (nivelul 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                          |
| `check:provider-consistency`      | Fiecare furnizor din `providers.ts` are o intrare care se potrivește în `providerRegistry.ts` (și invers, în lista de permise)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                          |
| `check:model-lifecycle`           | Cele trei tabele de rutare întreținute manual rămân în concordanță cu instantaneul ciclului de viață înregistrat (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nu înregistrează niciun ID retras pe care `REGISTRY` îl poate ruta; fiecare țintă `BUILT_IN_ALIASES` este prezentă în `REGISTRY` și absentă din snapshot-ul retras; fiecare ID retras încă în `REGISTRY` este redirecționat sau listat în `allowedRetiredInCatalog`; și nicio sursă sau țintă `DEFAULT_DEGRADATION_MAP` nu apare retrasă în acel instantaneu. Acest lucru nu dovedește că un model este în prezent deservit de un live în amonte. — offline se compară cu `config/quality/model-lifecycle.json`, reîmprospătat manual cu `npm run quality:refresh-model-lifecycle` (rețea; neconectat în CI). `allowedRetiredInCatalog` este un clichet de ardere: adăugați o intrare numai cu o problemă de urmărire.                                                                                                                                                                                                      | Da                                          |
| `check:fetch-targets`             | Fiecare `fetch("/api/...")` din partea client `src/` se rezolvă într-un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                          |
| `check:deps`                      | Toate dep-urile `npm install` -able din fiecare `package.json` din repo sunt în `dependency-allowlist.json`; pachete noi dezactivate sau neglijate marcate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                          |
| `audit:deps`                      | Auditul npm al tuturor celor cinci fișiere de blocare independente (rădăcină, Electron, pluginuri OpenCode v1/v2 și furnizor). Bloc de aviz critic; avertismentele înalte rămân avertismente vizibile. Auditurile Missing/failed sunt INCOMPLETE și bloc; Se păstrează hash-urile și rapoartele de blocare per domeniu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                          |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, hash-uri de integritate, fără suprascrieri de gazdă                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                          |
| `check:licenses`                  | Lista permisă de licență SPDX pentru dependențe de producție                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                          |
| `check:tracked-artifacts`         | Fără artefacte de construcție/linkuri simbolice `node_modules` comise (se rulează și în Husky pre-commit; pre-push este intenționat ușor — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                          |
| `check:ai-attribution`            | Fără trailer AI/bot `Co-Authored-By` sau subsol al generației AI în comiterile PR, titlul sau corpul — Hard Rule #16 (în bucla `quality.yml` fast-gates pentru PR→ `release/**` — citește sarcina utilă a evenimentului, no-op off PRs — `ci.yml` un pas doar PR-only pentru PR→; de asemenea `main` cârligul husky `commit-msg` #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Fiecare excludere Vitest denumește o problemă de urmărire și apare în `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                          |
| `check:file-size`                 | Fișierele sursă (`.ts`/`.tsx` în `src/`, `open-sse/`, `electron/`, `bin/`) rămân în `cap` și fișierele de testare (`*.test.ts(x)`) în `testCap`; fișierele înghețate în `file-size-baseline.json` (`frozen` / `testFrozen`) nu trebuie să depășească dimensiunea lor înregistrată                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                          |
| `check:error-helper`              | Răspunsurile de eroare în executors/handlers folosesc `buildErrorBody()` / `sanitizeErrorMessage()` (regulă dură #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                          |
| `check:migration-numbering`       | Fișierele SQL de migrare sunt numerotate secvenţial, fără lacune sau duplicate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                          |
| `check:public-creds`              | Fără chei literale OAuth `client_id`/`client_secret` sau Firebase Web în afara `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                          |
| `check:db-rules`                  | Fără SQL brut în afara modulelor `src/lib/db/` ; fără baril-import din `localDb.ts` (Reguli dure #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                          |
| `check:known-symbols`             | Executorii furnizorului, strategiile de rutare și traducătorii înregistrați în tabelele lor de expediere se potrivesc cu fișierele de pe disc — fără simboluri orfane sau nedeclarate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                          |
| `check:route-guard-membership`    | Fiecare rută care generează un proces copil este clasificată după `isLocalOnlyPath()` (Reguli dure #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                          |
| `check:test-discovery`            | Fiecare fișier `*.test.ts` / `*.spec.ts` din repo este colectat de cel puțin un testist (clichet: lista orfană din `test-discovery-baseline.json` poate doar să se micșoreze)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                          |
| `check:test-tla-order`            | Niciun fișier `node:test` sub `tests/unit` nu înregistrează un test, atinge un `await` de nivel superior, apoi înregistrează mai multe (#18045; clichet: `test-tla-order-allowlist.json` poate doar să se micșoreze)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                          |
| `check:agent-skills-sync`         | Artefactele generate de abilități de agent se potrivesc cu catalogul lor sursă (fără derive)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Furnizorul logos/assets poartă o înregistrare înregistrată de proveniență                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | Fișierele de configurare JSON analizează și îndeplinesc regulile repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | compilare TypeScript fără erori (doar avertismente consultative)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                          |
| `typecheck:noimplicit:core`       | Strict `noImplicitAny` — prospectiv; multe site-uri de apeluri preexistente mai au nevoie de adnotări                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Consultativ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` încadrat în `src/app/(dashboard)/**` (#7033) — Lista de 27 de fișiere a `typecheck:core` nu include nici un tablou de bord TSX și nici `next build` nu îl verifică niciodată de tip (`next.config.mjs` setează `ignoreBuildErrors: true`), astfel încât regresiile cu identificatorul orfan de acolo (#6625/#6909CI erau invizibile. Diferențele față de o linie de bază de numărare per-file/per-TS-code înghețată (`config/quality/dashboard-typecheck-baseline.json`, același model de aplicare învechit ca `check:known-symbols`) — numai erorile NEW dincolo de numărul de referință eșuează poarta; clătiți în jos cu `--update` atunci când o eroare preexistentă este remediată.                                                                                                                                                                                                                                                                                                                                                                                            | Da                                          |
| `check:build-typecheck`           | Verificarea tipului de producție pentru întreaga aplicație peste `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), lista permisă de 27 de fișiere a suprafeței `typecheck:core` și poarta tabloului de bord nu acoperă. Diferențe împotriva `config/quality/build-typecheck-baseline.json`; un număr nou sau crescut per-(fișier, cod) eșuează, un număr mai mic vă cere să faceți clichet. `--update` refuză în timp ce rularea conține o pereche nouă sau crescută, cu excepția cazului în care `--force-regressions` este trecut și refuză un fișier nou liniștit, cu excepția cazului în care `--force-nocheck` este trecut, așa că lărgirea liniei de bază pentru a deveni verde și acordarea unei tăcere permanente sunt două acte deliberate separate. Un `--force` gol este respins. De asemenea, scanează domeniul de construcție pentru `@ts-nocheck` față de `config/quality/ts-nocheck-baseline.json`, deoarece un fișier care îl folosește nu raportează nicio diagnosticare și, altfel, ar fi invizibil pentru fiecare poartă. | Da                                          |

#### Două programe de verificare a tipurilor răspund diferit

`typecheck:core` și `check:build-typecheck` compilează programe diferite sub opțiuni diferite, iar același fișier poate fi curat într-unul și plin de erori în celălalt.

`tsconfig.build.json` setează `"strict": false`, deci `noImplicitAny` este dezactivat. Configurația de bază compilează o listă de 27 de fișiere cu opțiuni mai stricte și urmează graficul de import al fiecărei intrări, astfel încât fișierele care nu apar niciodată în programul de compilare sunt încă verificate acolo.

Consecința contează atunci când se judecă dacă un fișier este tastat:** zero diagnosticare sub `check:build-typecheck` nu înseamnă zero** . Eliminarea `@ts-nocheck` din 26 de fișiere a arătat că 23 dintre ele sunt curate în programul de compilare; șaisprezece dintre acestea au apărut în jur de 120 de erori implicite – orice erori în cea strictă. Verificați ambele înainte de a apela un fișier curat.

### Job: `quality-gate`

Aleargă după `test-coverage`. Blocurile fuzionează la eșec.

| Scenariul                    | Validează                                                                                                                                                                                      | Blocare                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (număr de avertismente ESLint, acoperire din raportul shard îmbinat)                                                                                              | Da (în amonte de clichet) |
| `quality:ratchet`            | Fiecare valoare din `quality-baseline.json` nu a regresat (ESLint avertismente ≤ linie de bază; acoperire ≥ linie de bază)                                                                     | Da                        |
| `check:duplication`          | Dublarea codului (jscpd@4) nu depășește valoarea de bază în `quality-baseline.json`                                                                                                            | Da                        |
| `check:complexity`           | Complexitatea ciclomatică la nivel de fișier nu depășește limita (core ESLint `complexity` + `max-lines-per-function`)                                                                         | Da                        |
| `check:cognitive-complexity` | Clichet de complexitate cognitivă (`eslint-plugin-sonarjs`) — separate ESLint pass; CI rulează ambele îmbinate ca pas unic `check:complexity-ratchets`                                         | Da                        |
| `check:dead-code`            | Exporturile/fișierele neutilizate clichetul (knip) nu regresează față de linia de bază                                                                                                         | Da                        |
| `check:compression-budget`   | Etapele de economisire a jetoanelor — per motor de referință la compresie nu trebuie să regreseze                                                                                              | Da                        |
| `check:type-coverage`        | Clichet tip procent (`type-coverage`) nu regresează; însumează în mare măsură `typecheck:noimplicit:core`                                                                                      | Da                        |
| `check:codeql-ratchet`       | Numărul de alerte CodeQL deschise nu regresează (se citește prin `gh api`; săriți grațios fără simbol) cadența de reîmprospătare — și declanșarea manuală: vedeți „clichet CodeQL ” de mai jos | Da                        |

### Job: `quality-extended`

Întregul loc de muncă este consultativ (`continue-on-error: true`). Clichetele bazate pe npm rulează pe bune; scanerele externe se instalează prin `gh release download` și se omite automat (ieșirea 0) când un binar este încă absent.

| Scenariul                | Validează                                                                                                                                                                                                               | Blocare                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:circular-deps`    | Fără dependențe circulare (dpdm)                                                                                                                                                                                        | **Consultativ**                                 |
| `check:bundle-size`      | Dimensiunea pachetului nu depășește limita maximă                                                                                                                                                                       | **Consultativ**                                 |
| `check:secrets`          | Scanarea secretă (gitleaks) — omite dacă binarul este absent                                                                                                                                                            | **Consultativ**                                 |
| `check:vuln-ratchet`     | Vulnerabilitățile de dependență (osv-scanner) nu regresează — `--ratchet` eșuează ca INCOMPLETE (ieșirea 2) dacă nu sunt măsurate                                                                                       | **Consultativ**                                 |
| `check:workflows`        | Workflow lint (actionlint + zizmor); Scanerele missing/broken, rapoartele invalide sau linia de bază cu clichet lipsă nu reușesc ca INCOMPLETE. Constatările valide respectă politica strict/advisory/ratchet selectată | Execuție necesară; Zizmor clichet blocare in CI |
| `check:openapi-breaking` | Contract API public împotriva comiterilor de evenimente fixate (PR merge-base, push before, merge-group base; scheduled/manual checkout primul părinte); măsurarea necesară eșuează închisă                             | **Blocare cu --ratchet**                        |

### Job: `docs-sync-strict`

Se rulează pe fiecare PR la `main`. Blocurile fuzionează la eșec.

| Scenariul                      | Validează                                                                                                                                                   | Blocare                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-poartă care rulează secvenţial cele 6 sub-porţi de mai jos                                                                                             | Da                         |
| ↳ `check:docs-sync`            | Consecvența versiunii CHANGELOG / OpenAPI / llm.txt                                                                                                         | Da                         |
| ↳ `check:docs-counts`          | Numărările în proză (număr de furnizori, număr de migrare etc.) sunt în fereastra de clichet a numărărilor reale                                            | Da                         |
| ↳ `check:env-doc-sync`         | Fiecare env var din `.env.example` este documentată într-un tabel de documente și invers                                                                    | Da                         |
| ↳ `check:deprecated-versions`  | Nu există șiruri de versiuni depreciate în documente                                                                                                        | Da                         |
| ↳ `check:doc-links`            | Link-urile interne de reducere din documente se rezolvă în fișiere reale (formular `[text]`/`(path)` )                                                      | Da                         |
| ↳ `check:fabricated-docs`      | Rute, vars env, comenzi CLI, nume de cârlig și căi de fișiere citate în documente există în baza de cod. Poarta tare prin `--strict`; soft-fail fără steag. | Da (prin `--strict` în CI) |
| `check:cli-i18n`               | Șirurile de comandă CLI sunt prezente în toate fișierele locale i18n                                                                                        | Da                         |
| `check:openapi-coverage`       | OpenAPI spec acoperă cel puțin un etaj cu clichet de rute reale                                                                                             | Da                         |
| `check:openapi-security-tiers` | Adnotările nivelului de securitate din `openapi.yaml` sunt în concordanță cu clasificările `routeGuard.ts`                                                  | **Consultativ**            |
| `check:openapi-routes`         | Fiecare cale din `openapi.yaml` se rezolvă într-un `route.ts` real (anti-halucinație)                                                                       | Da                         |
| `check:docs-symbols`           | Fiecare referință `/api/...` în `docs/**/*.md` se rezolvă într-un `route.ts` real (anti-halucinație)                                                        | Da                         |
| `i18n translation drift`       | Cheile netraduse în fișierele locale i18n numai avertizează —                                                                                               | **Consultativ**            |

Cele douăsprezece README SVGs de sub `docs/diagrams/` sunt generate (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` le regenerează pe toate). Fiecare are un test unitar de comparare de octeți (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) care eșuează atunci când fișierul comis este nemodificat, iar `check:docs-counts` citește numere canonice din nodurile lor `<text>` — motiv pentru care pasul de conturare păstrează fiecare șir subliniat din fișier ca invizibil `<text>`. Verificarea SVG canonical-numbers citește fișierele enumerate în `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` și `tier-flow-light.svg`; afirmațiile gratuite pentru totdeauna, intrare în catalog, grup recurent și factori de scoring citesc și `promise-pillars.svg`, `free-tier-budget.svg` și `strategies-grid.svg`. `free-tier-budget.svg` își extrage cifrele din încărcătorul de catalog live, deci o schimbare la `FREE_MODEL_BUDGETS` sau la un nume de afișare al furnizorului reds CI până când acel fișier este regenerat.

### Job: `i18n-ui-coverage`

| Scenariul                           | Validează                                                                                                                                                                                          | Blocare         |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (în linie) | Acoperirea cheii UI i18n este ≥ 65%                                                                                                                                                                | Da              |
| `check-ui-value-drift` (în linie)   | O engleză rescrisă** valoare** nu lasă nicio traducere învechită în urmă                                                                                                                           | Da              |
| `check-new-key-coverage` (în linie) | O** nou** Cheia engleză este tradusă în fiecare localitate — un marker `__MISSING__:` este respins                                                                                                 | Da              |
| `check-translation-ratio`           | Raportul de traducere reală per local (identic cu engleza / substituent / frunze lipsă în afara listei de permis) nu trebuie să depășească `config/quality/i18n-translation-baseline.json` + slack | **Consultativ** |

Necesită `fetch-depth: 0` — poarta de derivare a valorii diferă `en.json` față de baza de îmbinare.

#### `check-ui-value-drift` — stale-translation gate

Captează o regresie i18n pe care celelalte porți nu o pot vedea structural: o valoare în limba engleză este rescrisă, iar traducerile derivate din engleza _previous_ rămân în urmă, astfel încât utilizatorii care nu sunt englezi continuă să citească o copie cu încredere, acum greșită.

Acest lucru a fost expediat pe bune. `oauthModal.googleOAuthWarning` a fost rescris când asistentul de conectare Antigravity a aterizat (#5203);** 39 din 43 de localități** a păstrat textul care le spunea operatorilor să „copieze URL complet și să îl lipească mai jos” — un flux care nu poate fi finalizat pentru furnizorul respectiv. A trecut neobservat până la #8463 pentru că:

- `sync-ui-keys` completează numai cheile care sunt** absent** , niciodată cei care sunt** stătut** ;
- `check-ui-keys-coverage` contorizează cheia _prezența_, deci o traducere obținută notează ca fiind acoperită;
- `check-translation-drift` urmărește documentația `docs/i18n/<locale>/**.md` reflectă — nu citește niciodată `src/i18n/messages/*.json`. Blocare în job `docs-sync-strict` de la resincronizarea 2026-09: editați un document de bază → `npm run i18n:run -- --files=<doc>` (la nivel de secțiune, ieftin).

**Conștient de diferență, nu susținut de linia de bază.** Compară `en.json` la baza de îmbinare cu arborele de lucru; pentru fiecare cheie a cărei valoare în engleză s-a schimbat, orice locație care conține încă o traducere neatinsă este învechită. Asta în mod deliberat** îngheață datoria preexistentă** — a diff nu poate dezvălui din ce engleză veche provine o traducere de lungă durată, așa că poarta judecă doar ceea ce atinge schimbarea actuală. Alternativa (o linie de bază hash per-cheie) ar costa un fișier generat ~ 600 KB, 3 × cea mai mare linie de bază existentă, înregistrându-se la fiecare i18n PR.

Două moduri de a-l satisface:

1. actualizați traducerile afectate sau
2. setați-le la `__MISSING__:<new english>` — timpul de execuție, apoi servește limba engleză corectată (`src/i18n/request.ts::deepMergeFallback`, #7258) și cozile de chei pentru traducere.

Dacă sfoara e** sens** schimbat, prefer** redenumirea cheii** : o cheie nouă nu poate moșteni o traducere învechită. Acesta este modelul #8463 folosit.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Iese din 0 cu `SKIP reason=base-unresolved` atunci când catalogul de bază nu poate fi citit (clonă superficială fără ref de bază), oglindind `check-openapi-breaking`.

### Job: `i18n`

Matrice completă de validare i18n (un job per local). Întregul loc de muncă este consultativ.

| Scenariul                       | Validează                                        | Blocare                                                    |
| ------------------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| `validate_translation.py quick` | Completitudinea traducerii în funcție de locație | **Consultativ** (`continue-on-error: true` pe toata munca) |

### Job: `pr-test-policy`

Se rulează numai pe solicitări de extragere.

| Scenariul              | Validează                                                                                                                                      | Blocare |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs care modifică codul de producție în `src/`, `open-sse/`, `electron/` sau `bin/` trebuie să includă sau să actualizeze teste (Hard Rule #8) | Da      |
| `check:test-masking`   | Fișierele de testare modificate nu reduc numărul de afirmații nete și nu adaugă tautologii `assert.ok(true)`                                   | Da      |
| `check:pr-evidence`    | PR body citează dovezile test/VPS pentru schimbare (mecanizează Hard Rule #18 prin grepping PR prose — fragile, vezi Backlog)                  | Da      |

### Job: `test-vitest`

Aleargă după `build`. Blocurile fuzionează la eșec.

| Suită            | Validează                                                      | Blocare                                                                                                             |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | server MCP (110 instrumente), autoCombo, cache — vitest runner | Da                                                                                                                  |
| `test:vitest:ui` | teste componente UI — vitest runner                            | **Blocare** Eșecurile preexistente — sunt excluse în mod explicit în `vitest.config.ts`; noi eșecuri eșuează treaba |

### Fluxuri de lucru nocturne (programate, consultative)

Acestea rulează pe un program cron (și `workflow_dispatch`), niciodată pe PRs. Toate sunt consultative.

| Fluxul de lucru        | Validează                                                                                                                                                                   | Blocare         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | teste de proprietăți de verificare rapidă cu un număr mare de rulări aleatoriu de semințe +                                                                                 | **Consultativ** |
| `nightly-resilience`   | poarta de creștere a grămezii, injecție de greșeală de haos, k6 load/soak                                                                                                   | **Consultativ** |
| `nightly-llm-security` | apărător de injecție promptfoo (mod bloc) sonde + garak (sărit fără un secret al furnizorului)                                                                              | **Consultativ** |
| `nightly-schemathesis` | Fuzzing de contract OpenAPI (schemă) împotriva unui OmniRoute activ folosind încălcări ale specificațiilor de suprafețe `docs/openapi.yaml` — / 500s netratați (Fază 8 B.4) | **Consultativ** |
| `nightly-mutation`     | Scorul de testare a mutațiilor Stryker pe banda rapidă a unității — mutanții supraviețuitori supraviețuiesc afirmații slabe                                                 | **Consultativ** |
| `nightly-compat`       | Matricea de compatibilitate a motorului nod în gamele `engines.node` acceptate                                                                                              | **Consultativ** |

Liniile de bază ale performanței (heap, TTFB, build time) sunt înregistrate, nu limitate: vezi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Faza de viteză (2026-08-30 → v4.0 LTS): fiecare linie de bază s-a slăbit cu 20%

Decizia proprietarului (2026-08-30): până la modularizarea v4.0, viteza de expediere contează mai mult decât menținerea liniei de datorie. Fiecare** numeric** Linia de bază a clichetului a fost slăbită cu 20% într-o singură trecere auditabilă, iar faza este declarată în `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Ce s-a schimbat                                                                                                                                                                                                        | Unde                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — contează mai mic este mai bine × 1,2, procente mai mari este mai bine ÷ 1,2 (etajul de acoperire 60 păstrat, `eslintErrors` rămâne 0, `eslintWarnings` 0 → 20% din numărul de suprimare înghețată) | `quality-baseline.json` (liste de note `_relax_velocity_2026_08_30` fiecare înainte → după)            |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, fiecare limita de linie `frozen[*]` / `testFrozen[*]` × 1.2                                                                                                                                          | `file-size-baseline.json`                                                                              |
| per-fișier / per-TS-cod numără × 1.2                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` devine consultativ în timp ce `_policy.requireTighten === false`                                                                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| `bank-ratchet-shrinks` se întrerupe noaptea (ar încadra contracția măsurată și ar anula încăperea)                                                                                                                     | `.github/workflows/nightly-release-green.yml`                                                          |

Listele permise (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …) sunt** nu** bugete și nu au fost atinse. Porțile de politică Pass/fail (secrete, reguli SQL, contract docs/env, paritate i18n, teste unitare) sunt neschimbate — un test roșu este încă un test roșu.

**Scule**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — relaxarea one-shot (`scripts/quality/relax-baselines.mjs`); refuză să alerge de două ori cu aceeași notă.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — măsoară fiecare poartă numerică așa cum o face CI și tipărește spațiul liber rămas pe poartă (`scripts/quality/baseline-headroom.mjs`). Lucrarea `baseline-headroom` nocturnă publică tabelul în rezumatul rulării fluxului de lucru și își încarcă raportul JSON/Markdown ca `baseline-headroom-<run_id>`, reținut timp de 90 de zile. Rândurile de avertizare și critice identifică porți la 10% din limita lor sau deja peste aceasta. Examinați aceste rapoarte ca avertizare timpurie pentru bugetele consumate; inspectați notele `_rebaseline_*` ale porții ofensatoare. Jobul nu mai creează sau actualizează o problemă permanentă; #12149 păstrează istoricul raportului anterior.

**Mod cod nou (Clean-as-You-Code) — din 2026-08-30, numai calea rapidă PR**

Pe evenimentele `pull_request` `quality.yml` trece `--base-ref <PR base SHA>` la `check:file-size`, `check:complexity-ratchets` și `check:dead-code`. Pentru `check:complexity-ratchets` și `check:dead-code` poarta compară HEAD cu baza de îmbinare** limitat la fișierele atinse de PR** (`scripts/check/newCodeMode.mjs`: baza de îmbinare este materializată într-un `git worktree` de aruncat , ESLint/knip rulează acolo și pe HEAD, numărul de fișiere este diferit):

- **blocare** — the PR a adăugat încălcări cyclomatic/cognitive sau exporturi moarte în fișierele pe care le-a schimbat (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` în jurnal);
- **consultativ** — totalul global vs. linia de bază înghețată. Drift moștenit nu redă niciodată un PR nevinovat; deriva este re-înghețată la reconcilierea eliberării și urmărită de job-ul de la cap.

`check:file-size` folosește referința de bază în propriii termeni (`scripts/check/check-file-size.mjs`, #8522): verifică fiecare sursă și fișier de testare din arbore, citește numărul de linii ale fiecăruia la baza PR cu `git show` și nu reușește un fișier numai atunci când depășește cel mai mare dintre plafonul său de bază (`frozen` / `testFrozen`, sau dimensiunea fișierului în afara liniei de bază) ah / `cap` `testCap`. Un fișier care a plutit deja pe bază, prin urmare, nu redă niciodată un PR nevinovat.

`check:boundary:ratchet` aplică aceeași regulă numărului său unic (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): la evenimentele PR atât `quality.yml` fast-gates, cât și jobul `ci.yml` lint trec baza PR SHA, commit-ul de bază este măsurat dintr-un export `git archive`, iar PR eșuează numai atunci când numărul său de margine `open-sse → src` depășește numărul de bază `metrics.boundaryOpenSseToSrc` mai mare și mai mare. Deplasarea bazei deasupra tavanului este raportată (`base drift herdado`) , dar nu redă niciodată un PR nevinovat ; push → main păstrează plafonul absolut, iar o bază nerezolvată SHA cade înapoi la el cu un avertisment.

`workflow_dispatch` rulează, eliberarea-green sweep și jobul de headroom nocturn nu au o bază PR și păstrează comparația absolută (globală). Acoperirea, duplicarea și acoperirea tipului rămân globale deocamdată (instrumentele lor nu produc o diferență pe fișier la un preț ieftin) candidații — pentru același tratament.

**Închiderea fazei la v4.0 (LTS = mai strâns decât înainte, nu „înapoi la normal”)**

1. Pe sfatul `release/v4.0.0` pur: `npm run quality:headroom --json` pentru înregistrare, apoi `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, `--update` — al fiecărei porți de verificare a tipurilor, fiecare linie de bază scade la valoarea măsurată.
2. Ștergeți `_policy` din `quality-baseline.json` (rearmează `--require-tighten` și operațiunile bancare de noapte), restabiliți `THRESHOLD = 36` (sau mai mare) în `check-openapi-coverage.mjs`.
3. Strângeți dincolo de măsurat acolo unde modularizarea a dat roade: dimensiunea fișierului `cap` înapoi la 1000 (sau 800), etajele de acoperire + 5, exporturile moarte 0 pentru pachetele modulare.

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

## Politica listei permise

Fiecare poartă care nu poate eșua în cazul încălcărilor preexistente folosește o listă de permise înghețată (de exemplu, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politica este:

**Remediați cauza principală; utilizați lista permisă numai atunci când încălcarea este preexistentă și nu poate fi remediată în același PR.**

Când adăugați o intrare la o listă permisă:

1. Includeți un comentariu cu justificarea.
2. Faceți referire la problema de urmărire (de exemplu, `// #3498 — Phase 2 feature, not yet implemented`).
3. Eliminați intrarea din aceeași PR care remediază încălcarea — o intrare învechită care nu mai suprimă o încălcare activă este ea însăși un defect (6A.3 aplicarea învechită va eșua poarta pentru o intrare în listă de permise orfană odată implementată).

Do** nu** adăugați intrări în lista de permise pentru a face testele să treacă mai repede. O poartă verde cu o listă de permise în creștere este un fals sentiment al calității.

### Când o poartă eșuează pe PR tău

1. **Citiți cu atenție ieșirea porții** — vă spune exact ce fișier sau simbol a încălcat regula.
2. **Remediați încălcarea** — majoritatea porților sunt verificări deterministe ale sistemului de fișiere care trec de îndată ce codul este corect.
3. **Dacă încălcarea este preexistentă** (adică, nu ați introdus-o, dar poarta o acoperă acum): adăugați o intrare în lista de permise cu un comentariu de justificare și o problemă de urmărire.
4. **Dacă poarta este un clichet** (acoperire, avertismente ESLint, duplicare, complexitate): modificarea dvs. a înrăutățit valoarea. Remediați problema de bază sau (rar) rulați `npm run quality:ratchet -- --update` dacă modificarea este intenționată și degradarea valorii este acceptabilă — dar documentați de ce în descrierea PR.
5. **Porți de consiliere** (`continue-on-error: true`) sunt — informaționale, nu blochează îmbinarea, dar apar în rezumatul CI. Remediați-le oricum.

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

## Raționalizare Backlog (ROI review — Fase 9 Onda 3)

Acest inventar a fost reconciliat cu `ci.yml` pe 2026-06-17 (versiunea anterioară a omis `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). O revizuire ROI a setului reconciliat a identificat următorii candidați de raționalizare.** Fusiunile sunt modificări CI mecanice; flips/drops sunt decizii de politică rezervate operatorului.** Nimic de mai jos nu este aplicat încă.

**De asemenea, nedocumentat mai sus** (consiliere, semnal scăzut): jobul `docs-lint` (markdownlint + Vale, întreg job `continue-on-error`) și fluxurile de lucru ale scanerului autonom `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` este în `quality-baseline.json`, dar nu este conectat la un clichet de blocare în `ci.yml` — metrica este în prezent orfană.

### Fuzionare/deduplicare (mecanic, risc redus)

Fiecare candidat a fost validat față de starea porții live pe 2026-06-17 (încredere-dar-verificare); mai multe fuziuni „evidente” s-au dovedit a ascunde datoria și sunt** nu** drop-in-uri curate.

- **`check:docs-sync` rulează de două ori** — de sine stătător în jobul `lint` și din nou în interiorul `check:docs-all` (`docs-sync-strict`) și al cârligului de pre-comitare husky. ✅**DONE** Invocarea — `lint` a fost eliminată.
- **scanare CVE** — ❌**NOT o îmbinare curată.** `audit:deps` blochează avizele critice și auditurile incomplete în toate cele cinci fișiere de blocare, raportând în același timp avizele ridicate ca avertismente conform politicii actuale; `check:vuln-ratchet` (osv) nu reușește decât la o _regresie_ față de linia de bază înregistrată și respinge măsurătorile lipsă atunci când este necesar. Semantică diferită — scăderea `audit:deps` ar pierde poarta critică absolută și chitanțele de audit ale pachetelor independente. Păstrați ambele.
- **Detectarea ciclului** — ✅**DONE** (#15159 G-01/G-02). Textul vechi de aici a numit `check:cycles` „poarta verde, curată” și a justificat menținerea blocării, deoarece `check:circular-deps` (dpdm) a raportat 91 de cicluri. Verdele acela era un** verde fals** : `check:cycles` a scanat 5 subdirectoare (450 de fișiere), s-a potrivit doar cu `import|export … from` static și a eliminat fiecare specificator `@/` și `@omniroute/open-sse/`, astfel încât nu a putut vedea ciclurile de alias + de import dinamic care dominau depozitul. Remediat: poarta parcurge acum `src` + `open-sse` (5023 de fișiere), colectează specificatorii din TypeScript AST (deci `import("…")` contează și `typeof import("…")` tip-position nu) și rezolvă tsconfig `paths`. Gaseste** 14** cicluri, nu 0. Deoarece 14 cicluri preexistente nu pot fi fixate într-o poartă PR, `check:cycles` este acum un** clichet** (`--ratchet`, plafon `metrics.cycles.value = 14` în `quality-baseline.json`, `direction: down`) — blochează orice _regresie_ și numărul poate doar să scadă. CI rulează `npm run check:cycles:ratchet`. Burn-down plimbări cu**A-01** . `check:circular-deps` (dpdm) rămâne consultativ ca a doua opinie mai largă.
- **Complexitate** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): o plimbare ESLint, numără după ruleId astfel încât liniile maxime ciclomatice + și liniile de bază cognitive rămân independente; `check:complexity` / `check:cognitive-complexity` individual rămân pentru `--update` local .
- **`/api` anti-halucinație** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un inventar FS de `src/app/api`, openapi-routes + docs-simboluri raportează în continuare independent; indivizii rămân pentru cursele locale.
- **`check:node-runtime` rulează în 11 locuri de muncă** — ⚠️** ROI scăzut .** Fiecare este un alergător separat, iar verificarea este < 1s; economii totale ~ 10s, împotriva pierderii unui gardian ieftin per loc de muncă. Nu merită totuși.
- **`typecheck:noimplicit:core` pe CI lint** — ✅** scos din lucrarea de scame** (a fost consultativ `continue-on-error`); suprafața de tip blocare este `typecheck:core` + `check:type-coverage`. Scriptul local păstrat.

### Flip / decide (politica operatorului)

- `check:openapi-security-tiers` (consilier) — ❌**NOT curat flippable.** Iese din 0, dar avertizează că mai multe rute `traffic-inspector` sub `LOCAL_ONLY_API_PREFIXES` nu au adnotarea `x-loopback-only: true`. Punerea în aplicare necesită adăugarea acelor adnotări la `openapi.yaml` mai întâi.
- `typecheck:noimplicit:core` (consilier) — subsumat în mare măsură prin clichetul `check:type-coverage` de blocare. Întoarceți la un clichet sau aruncați a doua trecere `tsc` redundantă.
- `test:vitest:ui` (acum** blocare** ) Eșecurile preexistente — sunt excluse în mod explicit în `vitest.config.ts` cu comentarii de urmărire `// #8618` ; noi eșecuri eșuează treaba.
- `check:secrets` (gitleaks, clichet de blocare înghețat la 3 fals-pozitive documentate) — permite lista celor 3 pentru a ajunge la 0 sau retrogradați la aviz. Se suprapune GitHub scanare secretă nativă + `check:public-creds`.
- `check:pr-evidence` (blocking, greps PR-body prose) — risc fals-pozitiv ridicat; slăbește aplicarea regulilor Hard Rule #18 dacă este abandonată, așa că acesta este un adevărat apel de politică.
- `semgrep` (advisory standalone) — se suprapune CodeQL pentru familiile OWASP ; conectați linia de bază la un clichet sau o picătură.

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
