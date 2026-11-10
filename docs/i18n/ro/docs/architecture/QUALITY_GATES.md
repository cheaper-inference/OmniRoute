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

Fluxurile de lucru CI și Quality Gates emit fiecare un verdict stabil: `Gate / CI` și `Gate / Quality`. Politica lor de admitere cu versiuni enumeră fiecare loc de muncă din amonte așa cum este necesar sau consultativ. Un loc de muncă solicitat aplicabil trebuie să reușească: rezultatele lipsă, anulate, ignorate, în așteptare și necunoscute nu pot stabili PASS. O clasificare validă doar pentru documente sau numai pentru catalog poate face inaplicabilă o bandă de cod; un proiect obișnuit PR nu este un candidat acceptat. O etichetă `hotfix` nu renunță la dovezi.

Ambele fluxuri de lucru acoperă PRs în ramuri main/release, împingeri către `main`, expediere manuală și evenimente de grup de îmbinare. Push, dispatch și merge-group rulează selecția completă. O schiță de coadă Mergify de încredere rulează, de asemenea, joburi `full-code`/`full-code-e2e` aplicabile; PRs obișnuit săriți peste ele. Înainte de o îmbinare manuală, executați o expediere completă pe candidatul exact. Impingurile către `release/**` nu pornesc aceste fluxuri de lucru; Release-Green observă baza îmbinată separat (bandă `docs/ops/RUNNER_BOX.md` → Hosted). Furcăturile și grupurile de îmbinare folosesc alergători găzduiți pentru joburi care, altfel, selectează alergători auto-găzduiți; trebuie verificată o capacitate suficientă găzduită înainte de lansare.

Fiecare chitanță JSON identifică SHA extras, rularea fluxului de lucru și încercarea. CLI respinge o nepotrivire checkout/event SHA. Testele fluxului de lucru leagă calitatea de membru al politicii de lista `needs` a jobului de verdict, astfel încât o bandă nouă sau eliminată nu poate dispărea în tăcere. Chitanțe acoperă propriul flux de lucru, nu publicarea, implementarea sau elementele interne ale unui scaner de consiliere existent. Efectuarea verificărilor aplicabile cerute în regulile sucursalei reprezintă o modificare administrativă separată; definirea locurilor de muncă nu protejează în sine o ramură.

`API Route Typecheck` este o verificare independentă a fluxului de lucru, în afara atât a verdictelor agregate, cât și a profilului static complet al observatorului local. Inspectați rezultatul separat pentru candidatul exact. `.github/workflows/api-route-typecheck.yml` rulează pe PRs în `main` sau `release/**`, împinge către fie familia de ramuri, dispecerare manuală și evenimente `merge_group` de tip `checks_requested`. Nu are filtru de cale. Îmbinați grupurile verificați `merge_group.head_sha`; alte evenimente verificați `github.sha`. Toate evenimentele folosesc aceleași teste de diagnosticare și unități de poartă API. Retarget-urile de bază PR solicită o nouă verificare; Editările body/title folosesc numele numai pentru observație `Admission not requested / API Route Typecheck` și nu pot înlocui verificarea de admitere.

### Dovezi păstrate în reductorul de acceptare

`scripts/quality/validate-release-acceptance.mjs` reduce un plan furnizat și manifestele
acestuia; nu stabilește că planul acoperă întregul pipeline de lansare. Rapoartele sale
setează explicit `releaseAcceptance: false`, chiar și atunci când planul este
`VERIFIED`. Fluxul de lucru `release-acceptance.yml` utilizează în continuare fixture-uri
shadow, nu confirmări reale de compilare, împachetare, pornire sau promovare.

CLI-ul necesită `--evidence-root` pentru verificarea dovezilor păstrate. Fișierele sunt
rezolvate ca `<evidence-root>/<artifact_id>/<member>` și este calculat hash-ul lor
SHA-256. O înregistrare PASS fără dovezi, un fișier lipsă sau modificat, o cale nesigură
ori o legătură simbolică împiedică verificarea. Fișierele lipsă nu sunt echivalente cu
jurnale goale ale unor execuții reușite. Verificările existente pentru SHA/rulare/încercare
rămân independente: octeții identici nu pot valida o confirmare expirată. Integritatea
fișierelor nu reprezintă o dovadă a autenticității execuției sau a promovării artefactului.

### DAST consumă build-ul CI verificat

Jobul CI obligatoriu `dast-smoke` apelează `.github/workflows/dast-smoke.yml` după `build`. Urmează aceeași selecție de cod și schițe ca build-ul, inclusiv PR-uri acceptate din fork-uri, PR-uri către release și grupuri de integrare. Un job DAST absent, eșuat, anulat sau omis neașteptat blochează `Gate / CI`. Workflow-ul reutilizabil nu are declanșator PR sau manual independent; validarea manuală folosește pornirea CI, astfel încât build-ul și consumatorul să rămână în aceeași execuție.

`scripts/ci/next-build-provenance.mjs` sigilează întregul artefact Next cu amprenta tar, repository/eveniment/execuție, încercarea producătorului, head/base/checkout/tree, identitățile workflow-urilor, lockfile, versiunea și ABI-ul exacte Node, platforma și bundler-ul. DAST selectează ID-ul imuabil al artefactului din `needs.build.outputs`, cere verificarea amprentei descărcării și calculează independent hash-ul ZIP față de amprenta producătorului înainte să extragă cele două componente permise prin `scripts/ci/unpack-ci-build.py`. Manifestul și arhiva tar trebuie, de asemenea, să corespundă ieșirilor independente ale producătorului înainte de extragerea arborelui Next. Nu caută niciodată ultimul build reușit al unei ramuri. O reluare parțială poate refolosi aceeași încercare a producătorului dacă ID-ul și toate intrările încă se potrivesc; recipisa consemnează ambele încercări.

Consumatorul rămâne pe un runner Linux găzduit, cu acces numai pentru citire la repository și fără secretele acestuia. Instalează versiunea exactă Node a producătorului, apoi asamblează CLI cu `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` respinge lipsa unui server standalone înainte de orice build de rezervă; build-urile CLI locale obișnuite păstrează mecanismul de rezervă existent. Disponibilitatea serverului, Schemathesis și promptfoo trebuie toate să reușească în limita neschimbată de 25 de minute a jobului. Recipisa de proveniență dovedește identitatea și octeții intrărilor, nu o scanare DAST reușită. Expirarea artefactului, întreruperea runner-ului sau eșecul scanner-ului rămân dovezi incomplete ori negative; un wrapper consultativ nu le poate transforma în PASS.

### Capacitatea de execuție a UI-ului

CI execută întregul inventar UI sub forma a patru shard-uri ale matricei `test-vitest`,
fiecare cu cel mult doi workeri per shard și cu termenul-limită existent de 15 minute
pentru job. Primul shard execută și suita Vitest MCP/autoCombo. Rezultatul jobului
obligatoriu acoperă fiecare segment al matricei; eșecul sau anularea unui shard nu poate
stabili admiterea candidatului.

Observatorul nocturn păstrează câte o confirmare separată pentru candidatul exact pentru
fiecare shard UI, inclusiv execuția MCP în prima confirmare. Sunt necesare toate cele
patru confirmări, jurnalele și identitățile de execuție corespunzătoare. Comanda locală
`npm run test:vitest:ui` selectează în continuare suita completă; o singură rulare
`--shard` reprezintă doar dovezi parțiale.

### Colectarea acoperirii testelor unitare

Cele douăsprezece shard-uri unitare colectează acoperirea V8 în timpul execuției existente
a testelor. Un shard reușit rulează `scripts/ci/compact-v8-coverage.mjs` pentru a comprima
fișierele originale fără a genera un raport Istanbul intermediar. Jobul final Coverage
verifică toate cele douăsprezece manifeste în raport cu SHA-ul candidatului, mediul de
execuție, rădăcina sursei și hash-urile datelor, apoi rulează reporterii c8 și pragurile
existente de acoperire. Datele de intrare păstrează ordinea globală a numelor de fișiere
din c8; precombinarea per shard nu este sigură pentru acoperirea mixtă a funcțiilor/blocurilor.
Shard-urile lipsă, incorect formatate sau incompatibile determină eșecul admiterii.
Shard-urile de testare eșuate păstrează separat acoperirea brută de diagnosticare; aceasta
nu poate fi inclusă în combinarea finală.

### Confirmări privind progresul execuției testelor unitare

Comanda partajată `test:unit:ci:shard` înregistrează fazele `primary`, `dashboard` și `serial`
prin `scripts/ci/unit-progress-reporter.mjs`. Raportul normal al testelor rămâne
disponibil. O confirmare separată, care conține exclusiv metadate, înregistrează începutul și finalizarea fiecărui fișier,
iar un semnal periodic la 30 de secunde enumeră fișierele încă active și timpul lor de execuție. Aceasta înregistrează
numai metadatele de execuție incluse în lista de permisiuni; descrierile testelor, rezultatele, corpurile erorilor și mediul
complet nu sunt serializate.

CI păstrează fișierele JSONL ca `unit-progress-ci-<run>-<attempt>-<shard>`. Expirarea timpului alocat unei sarcini poate împiedica încărcarea ulterioară;
semnalele periodice deja emise rămân dovezi pentru diagnosticare. Absența semnalelor periodice poate indica, de asemenea,
un proces runner blocat sau oprit. Aceste confirmări păstrează selecția existentă a testelor,
nivelul de concurență, termenele-limită și starea de ieșire; ele nu reprezintă verdicte privind admiterea candidaților.

### Inventarul scanării statice

Inventarul versionat al aliasurilor npm și apartenența la scanarea statică se află în
`config/quality/gate-manifest.json`. Rulați `npm run check:gate-manifest` pentru a valida
numele scripturilor și comenzile exacte în raport cu `package.json`; adăugările,
eliminările și abaterile comenzilor provoacă eșecul atât al hook-ului local, cât și al
joburilor de clasificare a modificărilor din CI. Un alias nu este un job al fluxului de
lucru, o instanță a matricei sau un caz de testare: aceste numărători nu trebuie
prezentate ca fiind interschimbabile.

Utilizați `npm run quality:scan -- --list` sau `npm run quality:scan:fast -- --list`
pentru a inspecta aliasurile selectate fără a le executa. Runner-ul invocă punctul de
intrare npm, astfel încât mediul său de execuție (inclusiv Bun acolo unde este configurat)
este păstrat. Manifestul înregistrează aliasurile din afara acestor profiluri ca fiind
invocate separat, iar comenzile de mentenanță sunt interzise în profilurile de scanare
doar în citire.

Aceste profiluri acoperă numai scanarea statică. Ele nu certifică testele produsului,
acoperirea, împachetarea, verificările externe sau acceptarea completă pentru lansare a
unui candidat. Admiterea în fluxul de lucru utilizează fișierul asociat
`config/quality/admission-policy.json` și `scripts/quality/admission-verdict.mjs`.
Profilurile observatorului de lansare rămân separate; inspectați independent verificările
și confirmările aplicabile ale acestora. Comenzile statice ale observatorului complet sunt
declarate în `config/quality/release-green-static-profile.json`, inclusiv `audit:deps`,
selecția testelor de mutație și verificările traducerilor. Loader-ul validează comenzile
npm în raport cu package.json și cu declarațiile CI/Quality modelate; acesta respinge
abaterile în loc să execute tokenurile shell ca argumente. Ieșirea SKIP/INCOMPLETE a unui
scaner obligatoriu nu poate stabili PASS. Profilul își înregistrează excluderile externe
și nu înlocuiește dovezile găzduite privind acoperirea, matricele de testare, pachetul sau
implementarea. Inventarul în proză de mai jos este o referință, nu o dovadă că un gate a
rulat efectiv.

Scripturile se află în `scripts/check/` (gate-uri de politică) și `scripts/quality/`
(motorul de tip ratchet). Sursa de adevăr CI este `.github/workflows/ci.yml`.

### Sănătatea documentației de bază publicată

`.github/workflows/i18n-base-health.yml` observă starea documentației după trimiterile selectate către `main` și `release/v*` și la expedierea manuală. Filtrele sale acoperă documentația, rădăcina Markdown, `llm.txt`, traducerea state/configuration și instrumentele relevante i18n. Unicul job `Published base documentation health` utilizează Ubuntu găzduit și un termen limită de cinci minute. Efectuează validare numai în citire și scrie o chitanță de diagnosticare fără o instalare a dependenței, traducere sau adoptare de stat.

`scripts/i18n/check-base-health.mjs` necesită zero inconsecvențe de tip sursă-hash, țintă lipsă, țintă-hash, traducere învechită și secțiune-cache. De asemenea, validează domeniul de aplicare actual document/locale de bază și proveniența sa înregistrată. Context nevalid, acoperire incompletă sau o verificare întreruptă produce `INCOMPLETE`; deriva confirmată produce `FAIL`. Ambele returnează o stare de ieșire eșuată. Chitanța este legată de verificarea SHA, fluxul de lucru, rularea și încercarea și este păstrată ca `i18n-base-health-<sha>-<run>-<attempt>`.

Aceasta este o observație independentă a bazei publicate. Nu adaugă un eveniment PR sau de grup de îmbinare, o verificare PR necesară, un alias npm sau un membru al profilului de scanare statică. Verificatorul de bază blochează, de asemenea, toate cele cinci clase în modul absolut. Pregătirea PR obișnuită rămâne separată de admitere. O încărcare reușită nu poate transforma un rezultat de sănătate eșuat în PASS.

Un PR obișnuit utilizează `--preflight` cu un raport de bază generat de `--baseline-evidence`. Poate lăsa o sursă engleză în așteptare numai atunci când înregistrarea completă a traducerii și octeții țintă efectivi sunt neschimbați față de acea bază exactă. Inconsecvențele noi ale țintei sau ale secțiunii cache încă se blochează, iar dovezile incomplete nu pot autoriza pregătirea. Raportul expune `preparationPending` și `mergeReady` separat: pregătirea cu succes nu face ca traducerile în așteptare să fie gata de fuzionare. Reîmprospătați oglinzile afectate în candidatul compus înainte de admitere. Candidatul de încredere pentru coada Mergify, `merge_group`, împingerile de ramuri și rulările manuale CI folosesc verificatorul absolut, fără `--warn` sau iertarea eșecului moștenit. Lipsa hashurilor țintă și un domeniu redus de fișierele de bază înregistrate șterse nu pot produce un verdict absolut de succes.

### Eliberați calea rapidă PR (`quality.yml`)

`.github/workflows/quality.yml` completează CI pe main/release PRs, împinge către `main`, trimite și îmbina grupuri. PRs utilizează verificări rapide filtrate pe cale. Compilarea duplicată dezactivată definitiv a fost eliminată; controalele build/package/boot reale rămân în CI.

| Post                                             | Domeniul de aplicare                                                                                                                                                                                                             | Blocare              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs și docs-all                                                                                                                                                                                         | Da                   |
| `Fast Quality Gates`                             | Cod PRs; verificări statice, verificare tip, verificare tip tablou de bord, teste unitare afectate                                                                                                                               | Da                   |
| `Forgotten sibling tests`                        | Cod PRs; module modificate urmărite la consumatori statici și teste de frați candidați; căile baril și de import dinamic sunt raportate ca diagnostice consultative, cu excepții la care se face referire în lista de permisiuni | **Consultativ**      |
| `No new ESLint warnings`                         | Cod PRs; apărător de scame conștient de suprimări                                                                                                                                                                                | Da, inclusiv furcile |
| `Merge integrity (changelog + generated skills)` | PRs fără schiță ; jurnalul de modificări și sincronizarea abilităților generate                                                                                                                                                  | Da, inclusiv furcile |

#### Raportul testelor de frați uitate

`npm run check:forgotten-sibling-tests` reutiliza rezolutorul de import din spatele hărții test-impact. Pentru fiecare modul de producție modificat, acesta raportează lanțuri `changed module/symbol -> static consumer -> candidate sibling test` deterministe atunci când testul candidat este absent din diferența de solicitare pull. Rezumatul Markdown și rezultatul JSON sunt păstrate ca artefact al fluxului de lucru `forgotten-sibling-tests` pentru calibrare înainte de orice lansare de blocare.

Reexporturile de baril și importurile dinamice sunt doar diagnostice de rezoluție; nu creează niciodată o constatare de blocare. Excepțiile analizate live în `config/quality/forgotten-sibling-allowlist.json`. Fiecare intrare trebuie să denumească testul pentru consumator și candidat, să ofere o justificare specifică și să conecteze o problemă GitHub sau o cerere de extragere. Intrările malformate nu s-au închis. Excepțiile nu pot suprima un test de candidat șters sau o diferență care adaugă `.skip`/`.todo`; slăbirea afirmației și alte mascări rămân deținute de poarta `check:test-masking` care blochează independent.

### Job: `lint`

Rulează pentru fiecare PR către `main`. Blochează îmbinarea în caz de eșec.

| Script (`npm run ...`)            | Validează                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blocant                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Versiunea Node.js se încadrează în intervalul acceptat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                          |
| `check:cycles`                    | Importurile circulare din întregul `src/` + `open-sse/` (bazat pe AST, cu `paths` din tsconfig rezolvate). Comanda simplă se încheie cu codul 1 ori de câte ori există un ciclu (comportament fail-closed începând cu #15281) și listează SCC-urile. `check:cycles:ratchet` (rulat de CI) blochează atunci când numărul depășește plafonul `metrics.cycles` din `quality-baseline.json` — în prezent 14, `direction: down`, deci poate doar să scadă (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da (ratchet)                                |
| `check:boundary`                  | Cuplarea `open-sse → src`: importuri unice între fișiere, din motor în aplicație (`scripts/quality/measure-boundary.mjs`; lista de muchii reprezintă lista restantă de remedieri pentru separarea nucleului/modulelor v4). Comanda simplă = raport consultativ (identic cu `quality:boundary`). `check:boundary:ratchet` (rulat de CI și inclus și în bucla ratchet pentru verificările rapide din `quality.yml`) blochează atunci când numărul depășește plafonul `metrics.boundaryOpenSseToSrc` din `quality-baseline.json` — inițializat la valoarea măsurată de 771, `direction: down`; `--update` doar îl reduce; raportat la bază în PR-uri (`--base-ref`, vezi mai jos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da (ratchet)                                |
| `check:route-validation:t06`      | Scheme Zod prezente pe toate rutele (politica de nivel 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                          |
| `check:any-budget:t11`            | Numărul de `@ts-expect-error // any` nu depășește bugetul (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                          |
| `check:provider-consistency`      | Fiecare furnizor din `providers.ts` are o intrare corespunzătoare în `providerRegistry.ts` (și invers, în limitele listei de permisiuni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                          |
| `check:model-lifecycle`           | Cele trei tabele de rutare întreținute manual rămân în concordanță cu instantaneul ciclului de viață inclus în depozit (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nu punctează niciun ID retras pe care `REGISTRY` îl poate ruta; fiecare țintă din `BUILT_IN_ALIASES` este prezentă în `REGISTRY` și absentă din instantaneul ID-urilor retrase; fiecare ID retras care se află încă în `REGISTRY` este redirecționat sau enumerat în `allowedRetiredInCatalog`; și nicio sursă sau țintă din `DEFAULT_DEGRADATION_MAP` nu apare ca fiind retrasă în acel instantaneu. Acest lucru nu demonstrează că un model este furnizat în prezent de un serviciu upstream activ. Offline — compară cu `config/quality/model-lifecycle.json`, reîmprospătat manual cu `npm run quality:refresh-model-lifecycle` (necesită rețea; nu este integrat în CI). `allowedRetiredInCatalog` este un mecanism incremental de reducere: adăugați o intrare numai împreună cu o problemă de urmărire.                                                                                                                                                                                                                                   | Da                                          |
| `check:fetch-targets`             | Fiecare `fetch("/api/...")` din `src/` de pe partea de client se rezolvă către un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                          |
| `check:deps`                      | Toate dependențele care pot fi instalate cu `npm install` din fiecare `package.json` al depozitului se află în `dependency-allowlist.json`; pachetele noi fără versiune fixată sau cu nume care imită alte pachete sunt semnalate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                          |
| `audit:deps`                      | Audit npm pentru toate cele cinci fișiere lock independente (rădăcină, Electron, pluginurile OpenCode v1/v2 și furnizor). Avertismentele critice blochează; cele cu severitate ridicată rămân avertismente vizibile. Auditurile lipsă/eșuate sunt marcate INCOMPLETE și blochează; hashurile fișierelor lock și rapoartele pentru fiecare domeniu sunt păstrate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                          |
| `check:lockfile`                  | Integritatea `package-lock.json` — registru https, hash-uri de integritate, fără suprascrieri ale gazdei                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                          |
| `check:licenses`                  | Lista de permisiuni pentru licențe SPDX aferentă dependențelor de producție                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                          |
| `check:tracked-artifacts`         | Fără artefacte de compilare / linkuri simbolice `node_modules` comise (rulează și în pre-commit-ul husky; pre-push-ul este intenționat minimal — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                          |
| `check:ai-attribution`            | Fără trailer AI/bot `Co-Authored-By` sau subsol privind generarea cu AI în commiturile, titlul ori corpul PR-ului — Regula strictă #16 (în bucla de verificări rapide `quality.yml` pentru PR→`release/**` — citește sarcina utilă a evenimentului, nu efectuează nicio operațiune în afara PR-urilor — și într-un pas exclusiv pentru PR-uri din verificarea lint `ci.yml` pentru PR→`main`; de asemenea, hook-ul husky `commit-msg`; coautorii umani sunt permiși; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Fiecare excludere Vitest indică o problemă de urmărire și apare în `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                          |
| `check:file-size`                 | Fișierele sursă (`.ts`/`.tsx` din `src/`, `open-sse/`, `electron/`, `bin/`) rămân în limita `cap`, iar fișierele de test (`*.test.ts(x)`) în limita `testCap`; fișierele înghețate în `file-size-baseline.json` (`frozen` / `testFrozen`) nu trebuie să depășească dimensiunea înregistrată                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                          |
| `check:error-helper`              | Răspunsurile de eroare din executori/gestionari utilizează `buildErrorBody()` / `sanitizeErrorMessage()` (Regula strictă #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                          |
| `check:migration-numbering`       | Fișierele SQL de migrare sunt numerotate secvențial, fără goluri sau duplicate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                          |
| `check:public-creds`              | Nu există valori literale OAuth `client_id`/`client_secret` sau chei Firebase Web în afara `publicCreds.ts` (Regula strictă #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                          |
| `check:db-rules`                  | Nu există SQL brut în afara modulelor `src/lib/db/`; nu există importuri agregate din `localDb.ts` (Regulile stricte #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                          |
| `check:known-symbols`             | Executorii furnizorilor, strategiile de rutare și translatoarele înregistrate în tabelele lor de distribuire corespund fișierelor de pe disc — fără simboluri orfane sau nedeclarate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                          |
| `check:route-guard-membership`    | Fiecare rută care generează un proces copil este clasificată prin `isLocalOnlyPath()` (Regulile stricte #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                          |
| `check:test-discovery`            | Fiecare fișier `*.test.ts` / `*.spec.ts` din repo este colectat de cel puțin un executor de teste (ratchet: lista de fișiere orfane din `test-discovery-baseline.json` poate doar să se restrângă)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                          |
| `check:test-tla-order`            | Niciun fișier `node:test` din `tests/unit` nu înregistrează un test, nu ajunge la un `await` la nivel superior și apoi înregistrează mai multe (#18045; ratchet: `test-tla-order-allowlist.json` poate doar să se restrângă)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                          |
| `check:agent-skills-sync`         | Artefactele generate pentru abilitățile agenților corespund catalogului lor sursă (fără divergențe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Siglele/resursele furnizorilor au asociată o intrare de proveniență înregistrată                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `lint:json`                       | Fișierele de configurare JSON sunt analizate cu succes și respectă regulile de lint ale repo-ului                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | Compilare TypeScript fără erori (doar avertismente consultative)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` strict — orientat spre viitor; multe locuri de apel preexistente necesită încă adnotări                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Consultativ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitat la `src/app/(dashboard)/**` (#7033) — lista atent selectată de 27 de fișiere a `typecheck:core` nu include niciun fișier TSX al tabloului de bord, iar `next build` nu efectuează niciodată verificarea tipurilor pentru acesta (`next.config.mjs` setează `ignoreBuildErrors: true`), astfel încât regresiile identificatorilor orfani de acolo (#6625/#6909) nu erau vizibile pentru CI. Compară diferențele cu o bază de referință fixată a numărului per fișier/per cod TS (`config/quality/dashboard-typecheck-baseline.json`, același model de verificare a învechirii ca `check:known-symbols`) — doar erorile NOI care depășesc numărul din baza de referință determină eșecul porții; reduceți progresiv valorile cu `--update` atunci când este remediată o eroare preexistentă.                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                          |
| `check:build-typecheck`           | Verificarea tipurilor pentru producție la nivelul întregii aplicații peste `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), suprafața acoperită de lista permisă de 27 de fișiere a `typecheck:core` și de verificarea dashboard-ului nu o acoperă. Compară diferențele cu `config/quality/build-typecheck-baseline.json`; un număr nou sau crescut pentru fiecare pereche (fișier, cod) eșuează, iar un număr mai mic vă solicită să îl reduceți progresiv. `--update` refuză să ruleze cât timp execuția conține o pereche nouă sau crescută, cu excepția cazului în care este transmis `--force-regressions`, și refuză un fișier nou redus la tăcere, cu excepția cazului în care este transmis `--force-nocheck`, astfel încât extinderea bazei de referință pentru a obține o execuție reușită și acordarea unei tăceri permanente sunt două acțiuni deliberate separate. Un `--force` simplu este respins. De asemenea, scanează domeniul de compilare pentru `@ts-nocheck` comparând cu `config/quality/ts-nocheck-baseline.json`, deoarece un fișier care îl folosește nu raportează deloc diagnostice și, altfel, ar fi invizibil pentru fiecare verificare. | Da                                          |

#### Două programe de verificare a tipurilor oferă răspunsuri diferite

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) și `check:build-typecheck` compilează programe diferite, cu opțiuni
diferite, iar același fișier poate fi fără erori într-unul și plin de erori în celălalt.

`tsconfig.build.json` setează `"strict": false`, astfel încât `noImplicitAny` este
dezactivat. Configurația de bază compilează o listă permisă atent selectată de 27 de
fișiere, cu opțiuni mai stricte, și urmărește graficul de importuri al fiecărei
intrări, astfel încât fișierele care nu apar niciodată în programul de compilare
sunt totuși verificate acolo.

Consecința este importantă atunci când evaluați dacă un fișier este tipizat: **zero diagnostice
în `check:build-typecheck` nu înseamnă zero**. Eliminarea `@ts-nocheck` din 26 de
fișiere a arătat că 23 dintre ele nu aveau erori în programul de compilare; șaisprezece
dintre acestea au scos la iveală aproximativ 120 de erori de tip implicit-any în cel
strict. Verificați-le pe ambele înainte de a considera un fișier fără erori.

### Job: `quality-gate`

Rulează după `test-coverage`. Blochează îmbinarea în caz de eșec.

| Script                       | Validează                                                                                                                                                                        | Blocant                                     |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `quality:collect`            | Generează `quality-metrics.json` (numărul de avertismente ESLint, acoperirea din raportul combinat al fragmentelor)                                                              | Da (în amonte față de ajustarea progresivă) |
| `quality:ratchet`            | Nicio metrică din `quality-baseline.json` nu a regresat (avertismente ESLint ≤ baza de referință; acoperire ≥ baza de referință)                                                 | Da                                          |
| `check:duplication`          | Duplicarea codului (jscpd@4) nu depășește baza de referință din `quality-baseline.json`                                                                                          | Da                                          |
| `check:complexity`           | Complexitatea ciclomatică la nivel de fișier nu depășește limita (regulile ESLint de bază `complexity` + `max-lines-per-function`)                                               | Da                                          |
| `check:cognitive-complexity` | Ajustare progresivă a complexității cognitive (`eslint-plugin-sonarjs`) — trecere ESLint separată; CI le rulează pe ambele, combinate în etapa unică `check:complexity-ratchets` | Da                                          |
| `check:dead-code`            | Ajustarea progresivă pentru exporturile/fișierele neutilizate (knip) nu regresează față de baza de referință                                                                     | Da                                          |
| `check:compression-budget`   | Bugetul testului de performanță pentru compresie — pragurile minime de economisire a tokenurilor pentru fiecare motor nu trebuie să regreseze                                    | Da                                          |
| `check:type-coverage`        | Ajustarea progresivă a procentului de cod tipizat (`type-coverage`) nu regresează; înlocuiește în mare măsură `typecheck:noimplicit:core`                                        | Da                                          |

### Joburi: `codeql-scan` și `codeql-admission`

`codeql-scan` produce toate categoriile de analiză configurate. După reușita acestui job, `codeql-admission` validează încărcările sale exacte și ratchet-ul alertelor candidatului. Ambele sunt dependențe obligatorii pentru `Gate / CI`, inclusiv la candidații care modifică doar documentația. Cerințele de activare administrativă și canary sunt descrise mai jos la „Ratchet CodeQL”.

| Script                 | Validează                                                                                                                                                                                                    | Blocant |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `check:codeql-ratchet` | Ref/SHA al candidatului și toate categoriile configurate trebuie să fie actuale înainte de ratchet-ul alertelor; lipsa dovezilor blochează. Inventarul global rămâne separat — vezi „Ratchet CodeQL” mai jos | Da      |

### Job: `quality-extended`

Sarcina blochează candidații aplicabili. Dimensiunea pachetului, identificările de secrete, identificările de vulnerabilități, identificările din fluxurile de lucru și modificările OpenAPI sunt verificate folosind ajustările progresive obligatorii. Diagnosticările dependențelor circulare rămân consultative. Instalarea scanerelor este obligatorie:
`scripts/ci/install-quality-scanners.sh` furnizează versiunile fixate și propagă
eșecurile de instalare. Instrumentele lipsă, rapoartele nevalide sau bazele de referință lipsă lasă
poarta obligatorie a scanerului INCOMPLETĂ.

| Script                   | Validează                                                                                                                                                                                                                                                                              | Blocare                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Nu există dependențe circulare (dpdm)                                                                                                                                                                                                                                                  | **Consultativ**                                          |
| `check:bundle-size`      | Dimensiunea pachetului nu depășește limita; o măsurătoare indisponibilă determină eșecul                                                                                                                                                                                               | **Blochează cu --ratchet**                               |
| `check:secrets`          | Constatările Gitleaks nu regresează; scanările obligatorii resping instrumentele/sursa/reperul lipsă, scanările eșuate și rapoartele nevalide                                                                                                                                          | **Blochează cu --ratchet**                               |
| `check:vuln-ratchet`     | Vulnerabilitățile dependențelor nu regresează; scanările obligatorii resping instrumentele lipsă, rapoartele nevalide sau reperele lipsă                                                                                                                                               | **Blochează cu --ratchet**                               |
| `check:workflows`        | Verificarea fluxurilor de lucru (actionlint + zizmor); scanerele lipsă/defecte, rapoartele nevalide sau reperul ratchet lipsă eșuează cu starea INCOMPLETE. Constatările valide urmează politica strictă/consultativă/ratchet selectată                                                | Executare obligatorie; ratchet-ul zizmor blochează în CI |
| `check:openapi-breaking` | Contractul API public este comparat cu commiturile fixate ale evenimentelor (baza de îmbinare pentru PR, starea anterioară pentru push, baza grupului de îmbinare; pentru execuții programate/manuale, primul părinte al checkout-ului); măsurătoarea obligatorie eșuează în mod sigur | **Blochează cu --ratchet**                               |

### Job: `docs-sync-strict`

Pentru solicitările de extragere către `main` sau `release/**`, această sarcină rulează numai pentru candidații care nu sunt schiță (sau coadă de încredere) clasificați ca modificări de documentație sau cod. De asemenea, rulează pe evenimente non-PR CI ; declanșatorul acestui flux de lucru acoperă numai `main`, nu `release/**`. Un pas care iese diferit de zero blochează jobul; constatările doar raportate și exceptările documentate de mai jos nu.

| Script                         | Validează                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blocare                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Poartă de control agregată care execută secvențial cele 7 sub-porți de mai jos                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                                                                                                                          |
| ↳ `check:docs-sync`            | Consecvența versiunii Package/OpenAPI/CHANGELOG, oglinzi exacte `llm.txt`, invarianți CHANGELOG section/size traduși și absența documentelor duplicate înlocuite                                                                                                                                                                                                                                                                                                                | Da                                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Paginile de documentație compilate poartă titluri valide de primă importanță                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                                                                                                                          |
| ↳ `check:docs-counts`          | Invarianții de numărare cu încredere ridicată sunt stricti; Verificările euristice ale numărului de fișiere avertizează doar dacă scriptul nu primește `--strict` (meta-poarta CI nu o trece)                                                                                                                                                                                                                                                                                   | Blocare strictă a nivelurilor; consiliere soft tier                                                                                         |
| ↳ `check:env-doc-sync`         | Citirile env sursă, `.env.example` și `docs/reference/ENVIRONMENT.md` sunt de acord după listele explicite de ignorare, doar pentru documente și numai pentru mediu                                                                                                                                                                                                                                                                                                             | Da, în afara listelor de permise documentate                                                                                                |
| ↳ `check:deprecated-versions`  | Raportează eventualele versiuni învechite în afara contextelor istorice sigure și a datelor de actualizare învechite, excluzând documentele ignorate                                                                                                                                                                                                                                                                                                                            | Aviz în cablarea actuală CI (`--strict` nu este trecut)                                                                                     |
| ↳ `check:doc-links`            | Linkurile interne de reducere din documente se rezolvă în fișiere reale (formular `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                           | Da                                                                                                                                          |
| ↳ `check:fabricated-docs`      | Rute, env vars, comenzi CLI, nume de cârlige și căi de fișiere citate în documente există în baza de cod. Poarta tare prin `--strict`; soft-fail fără steag.                                                                                                                                                                                                                                                                                                                    | Da (prin `--strict` în CI)                                                                                                                  |
| `check:cli-i18n`               | Cheile CLI `t()` utilizate există în `en`; `pt-BR` păstrează toate secțiunile de nivel superior; `zh-CN` și `zh-TW` conțin fiecare cheie din `en`                                                                                                                                                                                                                                                                                                                               | Da                                                                                                                                          |
| `check:openapi-coverage`       | Specificația OpenAPI acoperă cel puțin un prag ratchet al rutelor reale                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                                                                                                                          |
| `check:openapi-security-tiers` | Adnotările declarate `x-loopback-only`/`x-always-protected` trebuie susținute de `routeGuard.ts`; erorile parserului și neconcordanțele verificării directe blochează. Verificarea inversă pentru `x-loopback-only` lipsă sub prefixele exclusiv locale avertizează, iar rutele definite numai prin tipare sunt excluse din această verificare inversă.                                                                                                                         | Parserul/verificările directe blochează; verificarea inversă este consultativă                                                              |
| `check:openapi-routes`         | Fiecare cale `/api...` din `openapi.yaml` corespunde unei rute reale independent de numele parametrilor după aplicarea listei justificate de excepții `KNOWN_STALE_SPEC`; intrările învechite din listă produc și ele eșec                                                                                                                                                                                                                                                      | Da                                                                                                                                          |
| `check:docs-symbols`           | Referințele URL interne `/api/...` din documentele canonice care nu sunt copii traduse corespund unei rute reale sau unei familii de rute; referințele proxy/upstream/placeholder/fișier și intrările justificate `KNOWN_STALE_DOC_REFS` sunt excluse, iar intrările învechite din lista de excepții produc eșec                                                                                                                                                                | Da                                                                                                                                          |
| `i18n translation drift`       | Admiterea absolută necesită zero sursă, țintă lipsă, hash-țintă, traducere învechită și inconsecvențe din memoria cache a secțiunii. Pregătirea PR obișnuită poate păstra dovezi moștenite exacte sau o modificare în așteptare doar în limba engleză, cu starea completă și octeții țintă neschimbați; raportul său declară separat pregătirea pentru fuziune. Hash-uri țintă lipsă și bloc de dovezi de bază incomplet. Un cache de secțiune moștenit absent nu este un eșec. | Toate cele cinci clase blochează admiterea queue/base ; permisele de pregătire obișnuită doar moștenite dovedite sau numai în limba engleză |

Cele douăsprezece README SVGs din `docs/diagrams/` sunt generate (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` le regenerează pe toate). Fiecare are un test unitar de comparare de octeți (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) care eșuează atunci când fișierul comis este învechit, iar `check:docs-counts` citește numere canonice din nodurile `<text>` — motiv pentru care pasul de conturare păstrează fiecare șir subliniat din fișier ca `<text>` invizibil. Verificarea numerelor canonice SVG citește fișierele enumerate în `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` și `tier-flow-light.svg`; afirmațiile gratuite pentru totdeauna, intrare în catalog, grup recurent și factori de scoring citesc și `promise-pillars.svg`, `free-tier-budget.svg` și `strategies-grid.svg`. `free-tier-budget.svg` își extrage cifrele din încărcătorul de catalog în direct, așa că o schimbare la `FREE_MODEL_BUDGETS` sau la un nume de afișare al furnizorului redă CI până când acel fișier este regenerat.

### Job: `i18n-ui-coverage`

| Script                            | Validează                                                                                                                                                                                                                     | Blocant     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | Acoperirea cheilor i18n din UI este ≥ 65%                                                                                                                                                                                     | Da          |
| `check-ui-value-drift` (inline)   | Rescrierea unei **valori** în engleză nu lasă în urmă nicio traducere învechită                                                                                                                                               | Da          |
| `check-new-key-coverage` (inline) | O cheie **nouă** în engleză este tradusă în fiecare limbă — un marcaj `__MISSING__:` este respins                                                                                                                             | Da          |
| `check-translation-ratio`         | Raportul traducerilor reale pentru fiecare limbă (intrări identice cu engleza / substituenți / intrări lipsă din afara listei de permisiuni) nu trebuie să depășească `config/quality/i18n-translation-baseline.json` + marja | **Blocant** |

Necesită `fetch-depth: 0` — verificarea abaterilor valorilor compară diferențele din `en.json` față de baza de îmbinare.

#### `check-ui-value-drift` — gate pentru traduceri învechite

Detectează singura regresie i18n pe care celelalte verificări nu o pot identifica structural: o valoare în engleză
este rescrisă, iar traducerile derivate din textul în engleză _anterior_ rămân neschimbate, astfel încât
utilizatorii care nu folosesc limba engleză continuă să citească un text formulat convingător, dar care acum este greșit.

Acest lucru s-a întâmplat efectiv în producție. `oauthModal.googleOAuthWarning` a fost rescris când a fost
introdus asistentul de autentificare Antigravity (#5203); **39 din 43 de limbi** au păstrat textul care le spunea operatorilor să „copieze
URL-ul complet și să-l lipească mai jos” — un flux care nu poate fi finalizat pentru furnizorul respectiv. Problema a rămas
neobservată până la #8463 deoarece:

- `sync-ui-keys` completează doar cheile care sunt **absente**, niciodată pe cele **învechite**;
- `check-ui-keys-coverage` numără _prezența_ cheilor, astfel încât o traducere învechită este considerată acoperită;
- `check-translation-drift` urmărește copiile documentației din `docs/i18n/<locale>/**.md` —
  nu citește niciodată `src/i18n/messages/*.json`. Este blocant în jobul `docs-sync-strict` de la
  resincronizarea din 2026-09: modificați un document de bază → `npm run i18n:run -- --files=<doc>` (la nivel de secțiune, rapid).

**Bazat pe diferențe, nu pe un reper de bază.** Compară `en.json` de la baza de îmbinare cu
arborele de lucru; pentru fiecare cheie a cărei valoare în engleză s-a modificat, orice limbă care încă păstrează o
traducere nemodificată este învechită. Această abordare **îngheață în mod deliberat datoria preexistentă** — o diferență
nu poate dezvălui din ce versiune veche a textului în engleză provine o traducere existentă de mult timp, astfel încât verificarea evaluează
doar ceea ce este afectat de modificarea curentă. Alternativa (un reper de bază cu hash pentru fiecare cheie) ar necesita
un fișier generat de aproximativ 600 KB, de 3 ori mai mare decât cel mai mare reper de bază existent, care s-ar modifica la fiecare PR i18n.

Există două modalități de a trece verificarea:

1. actualizați traducerile afectate sau
2. setați-le la `__MISSING__:<new english>` — în acest caz, la rulare este furnizat textul corectat în engleză
   (`src/i18n/request.ts::deepMergeFallback`, #7258), iar cheia este adăugată în coada pentru traducere.

Dacă s-a schimbat **sensul** șirului, este preferabil să **redenumiți cheia**: o cheie nouă nu poate moșteni
o traducere învechită. Acesta este modelul utilizat de #8463.

```bash
npm run i18n:check-value-drift          # strict (ceea ce rulează CI)
npm run i18n:check-value-drift:warn     # doar raportare
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Porțile pentru variația valorilor și pentru cheile noi folosesc aceeași comparație imuabilă din
`scripts/i18n/resolve-ui-diff-base.mjs`. Fluxul de lucru transmite aceleași SHA-uri pentru baza comparației, vârful bazei și
candidat ambelor verificări. Rulările pentru PR/schimbarea bazei PR-ului, push și grupul de îmbinare folosesc contextul
evenimentului lor. Declanșarea manuală pentru o ramură candidată necesită PR-ul deschis exact corespunzător acesteia sau valoarea de intrare explicită
`i18n_base_sha`. Observarea declanșată manual sau programată a ramurii `main` ori `release/vX.Y.Z`
fără acea valoare de intrare compară ultimul commit cu primul său părinte; aceasta nu reprezintă un audit al
întregii datorii de traducere moștenite. Invocarea locală necesită o bază de comparație explicită,
de exemplu comanda `BASE_REF` de mai sus.

Un context de comparație lipsă sau ambiguu, un catalog obligatoriu ilizibil sau nevalid și
un candidat modificat produc starea `INCOMPLETE` cu codul de ieșire **2**, inclusiv în modul de avertizare.
Citirea cataloagelor utilizează `scripts/i18n/read-ui-catalog.mjs`; erorile de citire nu sunt înlocuite
cu obiecte goale. Nici o bază indisponibilă, nici datele de intrare incomplete nu stabilesc starea PASS.

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

Necesită jobul de clasificare `changes`. Partițiile aplicabile ale matricei blochează îmbinarea în caz de eșec.

| Suită            | Validează                                                        | Blocant                                                                                                            |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Serverul MCP (110 instrumente), autoCombo, cache — runner vitest | Da                                                                                                                 |
| `test:vitest:ui` | Testele componentelor UI — runner vitest                         | **Blocant** — erorile preexistente sunt excluse explicit în `vitest.config.ts`; erorile noi duc la eșuarea jobului |

### Fluxuri de lucru nocturne (programate, consultative)

Acestea rulează pe un program cron (și `workflow_dispatch`), niciodată pe PRs. Toate sunt consultative.

| Fluxul de lucru        | Validează                                                                                                                                                                   | Blocare         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | teste de proprietăți de verificare rapidă cu un număr mare de rulări aleatoriu de semințe +                                                                                 | **Consultativ** |
| `nightly-resilience`   | poarta de creștere a grămezii, injecție de erori de haos, k6 load/soak                                                                                                      | **Consultativ** |
| `nightly-llm-security` | apărător de injecție promptfoo (mod bloc) sonde + garak (sărit fără un secret al furnizorului)                                                                              | **Consultativ** |
| `nightly-schemathesis` | Fuzzing de contract OpenAPI (schemă) împotriva unui OmniRoute activ folosind încălcări ale specificațiilor de suprafețe `docs/openapi.yaml` — / 500s netratați (Fază 8 B.4) | **Consultativ** |
| `nightly-mutation`     | Scorul de testare a mutațiilor Stryker pe banda rapidă a unității — mutanții supraviețuitori supraviețuiesc afirmații slabe                                                 | **Consultativ** |
| `nightly-compat`       | Matricea de compatibilitate a motorului nod în gamele `engines.node` acceptate                                                                                              | **Consultativ** |

Liniile de bază ale performanței (heap, TTFB, build time) sunt înregistrate, nu limitate: vezi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Faza de viteză (2026-08-30 → v4.0 LTS): fiecare valoare de referință a fost relaxată cu 20%

Decizia responsabilului (2026-08-30): până la modularizarea din v4.0, viteza de livrare este mai importantă
decât menținerea limitei datoriei tehnice. Fiecare valoare de referință **numerică** a mecanismului de limitare a fost relaxată cu 20% într-o singură
operațiune auditabilă, iar faza este declarată în `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Ce s-a schimbat                                                                                                                                                                                                                                                                   | Unde                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — numărările pentru care o valoare mai mică este mai bună ×1,2, procentele pentru care o valoare mai mare este mai bună ÷1,2 (pragul minim de acoperire 60 a fost păstrat, `eslintErrors` rămâne 0, `eslintWarnings` 0 → 20% din numărul înghețat de suprimări) | `quality-baseline.json` (nota `_relax_velocity_2026_08_30` enumeră fiecare valoare anterioară → ulterioară) |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                                                                  | `complexity-baseline.json`, `duplication-baseline.json`                                                     |
| `cap`, `testCap`, fiecare limită de linii `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                                                                      | `file-size-baseline.json`                                                                                   |
| numărările per fișier / per cod TS ×1,2                                                                                                                                                                                                                                           | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`      |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                               | `scripts/check/check-openapi-coverage.mjs`                                                                  |
| `--require-tighten` devine consultativ când `_policy.requireTighten === false`                                                                                                                                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                                 |
| execuția nocturnă `bank-ratchet-shrinks` este suspendată (ar înregistra reducerea măsurată și ar anula marja disponibilă)                                                                                                                                                         | `.github/workflows/nightly-release-green.yml`                                                               |

Listele de permisiuni (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nu** sunt bugete și nu au fost modificate. Porțile de politică de tip admis/respins (secrete, reguli SQL,
contractul documentație/mediu, paritatea i18n, testele unitare) rămân neschimbate — un test eșuat rămâne un test eșuat.

**Instrumente**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — relaxarea
  unică (`scripts/quality/relax-baselines.mjs`); refuză să ruleze de două ori cu aceeași
  notă.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  măsoară fiecare poartă numerică în același mod ca CI și afișează marja rămasă pentru fiecare poartă
  (`scripts/quality/baseline-headroom.mjs`). Jobul nocturn `baseline-headroom` publică
  tabelul în rezumatul execuției fluxului de lucru și încarcă raportul său JSON/Markdown ca
  `baseline-headroom-<run_id>`, păstrat timp de 90 de zile. Rândurile de avertizare și cele critice identifică porțile
  aflate la cel mult 10% de limita lor sau care au depășit-o deja. Consultați aceste rapoarte ca avertizare timpurie privind
  consumarea bugetelor; examinați notele `_rebaseline_*` ale porții problematice. Jobul nu
  mai creează și nu mai actualizează un tichet permanent; #12149 păstrează istoricul rapoartelor anterioare.

**Modul pentru cod nou (Clean-as-You-Code) — începând cu 2026-08-30, numai calea rapidă pentru PR-uri**

La evenimentele `pull_request`, `quality.yml` transmite `--base-ref <PR base SHA>` către `check:file-size`,
`check:complexity-ratchets` și `check:dead-code`. Pentru `check:complexity-ratchets` și
`check:dead-code`, poarta compară HEAD cu baza de îmbinare, **limitată la fișierele modificate de PR**
(`scripts/check/newCodeMode.mjs`: baza de îmbinare este materializată într-un
`git worktree` temporar, ESLint/knip rulează acolo și pe HEAD, iar numărările per fișier sunt comparate):

- **blocant** — PR-ul a adăugat încălcări ale complexității ciclomatice/cognitive sau exporturi neutilizate în fișierele pe care le-a modificat
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` în jurnal);
- **consultativ** — totalul global comparativ cu valoarea de referință înghețată. Abaterea moștenită nu marchează niciodată cu roșu un
  PR nevinovat; abaterea este urmărită pentru remediere la reconcilierea versiunii și monitorizată de
  jobul de headroom.

`check:file-size` utilizează referința de bază conform propriilor reguli (`scripts/check/check-file-size.mjs`, #8522):
verifică fiecare fișier sursă și de test din arbore, citește numărul de linii al fiecăruia la baza PR-ului
cu `git show` și respinge un fișier numai când acesta crește peste valoarea mai mare dintre plafonul său de referință
(`frozen` / `testFrozen` sau `cap` / `testCap` pentru un fișier din afara valorii de referință) și dimensiunea sa de bază.
Prin urmare, un fișier care prezenta deja o derivă la bază nu face niciodată ca un PR nevinovat să eșueze.

`check:boundary:ratchet` aplică aceeași regulă unicului său număr
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): la evenimentele PR, atât
porțile rapide din `quality.yml`, cât și jobul de lint din `ci.yml` transmit SHA-ul bazei PR-ului, commitul de bază este
măsurat dintr-un export `git archive`, iar PR-ul eșuează numai când numărul său de muchii `open-sse → src`
depășește valoarea mai mare dintre `metrics.boundaryOpenSseToSrc` și numărul de pe bază. Deriva bazei
peste plafon este raportată (`base drift herdado`), dar nu face niciodată roșu un PR nevinovat; push → main
păstrează plafonul absolut, iar un SHA de bază care nu poate fi rezolvat revine la acesta, cu un avertisment.

Rulările `workflow_dispatch`, verificarea completă pentru starea verde a release-ului și jobul nocturn de headroom nu au o bază PR
și păstrează comparația absolută (globală). Acoperirea, duplicarea și acoperirea tipurilor rămân globale
deocamdată (instrumentele lor nu produc în mod eficient un diff per fișier) — sunt candidate pentru același tratament.

**Închiderea fazei la v4.0 (LTS = mai strict decât înainte, nu „revenire la normal”)**

1. Pe vârful pur al `release/v4.0.0`: `npm run quality:headroom --json` pentru evidență, apoi
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, opțiunea
   `--update` pentru fiecare poartă de verificare a tipurilor — fiecare valoare de referință scade la valoarea măsurată.
2. Ștergeți `_policy` din `quality-baseline.json` (reactivează `--require-tighten` și acumularea
   nocturnă), restabiliți `THRESHOLD = 36` (sau o valoare mai mare) în `check-openapi-coverage.mjs`.
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

### Clichet CodeQL : admiterea candidaților și inventarul depozitului

CI deține admiterea candidatului CodeQL printr-un lanț explicit de dependență: `codeql-scan` apelează matricea în patru limbi în `codeql.yml`, apoi `codeql-admission` rulează `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` necesită ambele rezultate. Calitatea își păstrează propriile verificări numerice, dar nu interogează scanerul înainte ca producătorul să termine; Numai `Gate / Quality` nu este admiterea completă a candidaților. CodeQL rămâne obligatoriu pentru candidații doar pentru documente.

Politica din `config/quality/codeql-admission-policy.json` selectează Acțiuni, C/C++, JavaScript/TypeScript și Python, suita de interogări implicită, modelul de amenințare la distanță și modul de compilare niciunul. Verificarea prealabilă a producătorului respinge o înregistrare de activare în așteptare și se ramifică în afara listei ținte explicite. Țintele actuale sunt principale și testele release/v3.8.54. Contract compară această listă finită și declanșatorul de întreținere cu versiunea pachetului; următoarea versiune trebuie să fie revizuită. Declanșatorul PR de lansare mai largă existent al CI este păstrat, dar o țintă neînregistrată raportează HOLD înainte de extracție, mai degrabă decât să obțină un PASS nemăsurat.

Fiecare sarcină de matrice înregistrează ID de încărcare SARIF reală, limba, categoria, rularea și încercarea, identitatea fluxului de lucru al apelantului, evenimentul ref/head/base/merge SHA și hashul politicii. Lucrarea dependentă descarcă numai chitanțele acestei rulări și validează rezumatele artefactelor. Necesită toate cele patru categorii, un producător de succes și procesarea completă a fiecărei încărcări exacte. Utilizează filtrul sarif_id al lui API, nu cea mai recentă analiză găsită pe o ramură. Reluările parțiale pot reutiliza categoriile reușite dintr-o încercare anterioară a aceluiași curs și candidat, păstrând încercarea de producere; un producător actual eșuat nu poate reutiliza dovezile ecologice anterioare.

Acțiunea CodeQL așteaptă procesarea, dar implementarea sa fixată poate avertiza și continua după o eroare de citire a stării sau o așteptare epuizată. Prin urmare, admiterea verifică din nou procesarea. Categoriile lipsă, procesarea în așteptare, lucrările eșuate sau anulate, identitatea învechită, paginarea incompletă sau APIs indisponibil produc HOLD și ieșirea 2. Nu rămâne o așteptare fixă pentru un flux de lucru independent de scaner. Un PR nescanat nu poate trece deoarece o interogare de alertă a returnat 0. Un număr măsurat deasupra `metrics.codeqlAlerts.value` iese 1; linia de bază nu este ridicată pentru a absorbi alertele altei sucursale. [Starea încărcării și căutarea analizei](https://docs.github.com/en/rest/code-scanning/code-scanning).

Chitanța înregistrează încărcarea și analiza IDs, categorii, versiuni de instrumente, ref/SHA, numere de referință și de alertă. Numărul SARIF identity/result, numărul minim de reguli și instanțele exacte de alertă rămân obligatorii. Identitățile PR/analysis sunt verificate din nou înainte de a accepta. Aceste verificări stabilesc acoperirea categoriei configurate, nu un inventar al fiecărui fișier sursă extras. Extragerea C/C++ fără generare nu include codul generat în timpul construirii unui proiect. Excluderile surselor mai necesită revizuire, iar atribuirea contribuitorilor necesită dovezi exacte comparabile.

`codeql-maintenance.yml` furnizează scanări push cu lansare activă și programul săptămânal fără a duplica producătorii PR/main. `nightly-codeql-inventory.yml` păstrează separată linia de bază la nivelul întregului depozit, cu `--strict-measurement` și o eroare atunci când măsurarea nu este disponibilă. Omiterea grațioasă a colecționarului local de moștenire nu este admiterea candidaților. Înăsprirea rămâne un `--update` explicit după un număr global mai scăzut verificat.

Fluxul de lucru avansat nu trebuie publicat în timp ce Configurarea implicită este configurată: GitHub respinge acea combinație. Politica sa versiunea rămâne în așteptare până când tranziția administrativă revizuită este citită înapoi. Înainte de publicare, un operator stabilește un depozit, head/base/tree, policy/patch/rollback hash și a observat starea de configurare; `node scripts/quality/codeql-producer.mjs verify-admin-readback` verifică înregistrările JSON așteptate și reale furnizate. Acesta este un pază tehnică, nu aprobarea operatorului sau un înlocuitor pentru preluarea de readback-uri noi. Jetonul PR nu solicită niciodată acces de administrare. Lansarea și orice modificare a scanerului necesită acea citire separată plus dovezi reale de compatibilitate PR, furk și îmbinare-grup.

Forks utilizează runner găzduiți, checkout fără acreditări persistente, niciun proiect install/build în producător și niciun secret de depozit moștenit. GitHub acceptă încărcarea SARIF pentru evenimentul pull_request cu simbolul său furk redus; aprobarea pentru prima execuție a contribuției rămâne politica GitHub. Nu utilizați niciodată pull_request_target pentru a executa cod neîncrezat. Confirmați permisiunile reale pentru token, analysis_key și toate mediile de categorie din canarul controlat înainte de a considera migrarea finalizată. [Reguli de încărcare furcă](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [moduri de configurare conflictuale](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Demiterile sunt apelul operatorului (Hard Rule #14)** — nu respinge niciodată o alertă CodeQL fără a înregistra justificarea tehnică în comentariul de concediere: `won't fix` pentru o cerință de protocol în amonte, `used in tests` pentru un dispozitiv de testare, `false positive` pentru un dezinfectant CodeQL nu poate vedea (precedent: `docs/security/ERROR_SANITIZATION.md`).

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

## Politica listei de excepții

Fiecare poartă care nu poate eșua din cauza încălcărilor preexistente utilizează o listă de excepții înghețată
(de exemplu, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politica este:

**Remediați cauza principală; utilizați lista de excepții numai atunci când încălcarea este preexistentă și
nu poate fi remediată în același PR.**

Când adăugați o intrare într-o listă de excepții:

1. Includeți un comentariu cu justificarea.
2. Faceți referire la tichetul de urmărire (de exemplu, `// #3498 — Phase 2 feature, not yet implemented`).
3. Eliminați intrarea în același PR care remediază încălcarea — o intrare învechită care nu mai
   suprimă o încălcare activă reprezintă ea însăși un defect (verificarea aplicării regulilor privind intrările învechite din 6A.3 va
   face ca poarta să eșueze pentru o intrare orfană din lista de excepții, odată ce este implementată).

**Nu** adăugați intrări în lista de excepții pentru ca testele să treacă mai repede. O poartă verde asociată cu o listă
de excepții în creștere creează o falsă impresie de calitate.

### Când o poartă eșuează în PR-ul dumneavoastră

1. **Citiți cu atenție rezultatul porții** — acesta vă indică exact ce fișier sau simbol a încălcat
   regula.
2. **Remediați încălcarea** — majoritatea porților sunt verificări deterministe ale sistemului de fișiere, care trec imediat ce
   codul este corect.
3. **Dacă încălcarea este preexistentă** (adică nu a fost introdusă de dumneavoastră, dar acum este
   acoperită de poartă): adăugați o intrare în lista de excepții, împreună cu un comentariu justificativ și un tichet de urmărire.
4. **Dacă poarta este de tip ratchet** (acoperire, avertismente ESLint, duplicare, complexitate):
   modificarea dumneavoastră a înrăutățit metrica. Remediați problema de bază sau, în cazuri rare, executați
   `npm run quality:ratchet -- --update` dacă modificarea este intenționată, iar
   degradarea metricii este acceptabilă — însă documentați motivul în descrierea PR-ului.
5. **Porțile consultative** (`continue-on-error: true`) au rol informativ — acestea nu blochează
   îmbinarea, dar apar în rezumatul CI. Remediați-le oricum.

---

## Adăugarea unui control nou

1. Creați `scripts/check/check-<name>.mjs` (sau `.ts`). Controalele de politică se încheie cu codul 0/1.
   Controalele de tip prag progresiv emit o metrică în `quality-metrics.json` prin `collect-metrics.mjs`.
2. Adăugați `"check:<name>": "node scripts/check/check-<name>.mjs"` în `package.json` și
   sincronizați aliasul și comanda sa exactă în `config/quality/gate-manifest.json`.
   Aplicați aceeași sincronizare atunci când modificați sau eliminați un alias de validare existent.
   Rulați `npm run check:gate-manifest`; hook-ul pre-commit și clasificarea modificărilor din CI
   impun respectarea acestui contract.
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

## Restanțe de raționalizare (evaluarea ROI — Faza 9 Valul 3)

Acest inventar a fost reconciliat cu `ci.yml` la 2026-06-17 (versiunea anterioară omitea
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). O evaluare ROI a setului reconciliat
a identificat următorii candidați pentru raționalizare. **Combinările sunt modificări CI
mecanice; activările/dezactivările sau eliminările sunt decizii de politică rezervate operatorului.** Nimic din cele de mai jos
nu este aplicat încă.

**De asemenea nedocumentate mai sus** (consultative, semnal redus): jobul `docs-lint` (markdownlint + Vale, întregul job cu `continue-on-error`) și workflow-urile scanner independente `semgrep.yml` / `scorecard.yml`. CodeQL are acum joburi obligatorii de producător și admitere sub `Gate / CI`, supuse cerințelor de activare descrise mai sus. `semgrepFindings: 0` se află în `quality-baseline.json`, dar nu este conectat la un ratchet blocant în `ci.yml` — metrica este momentan orfană.

### Combinare / deduplicare (mecanică, risc mai redus)

Fiecare candidat a fost validat față de starea activă a mecanismelor de control la 2026-06-17 (încredere, dar cu verificare);
mai multe combinări „evidente” s-au dovedit a ascunde datorie și **nu** sunt înlocuiri directe sigure.

- **`check:docs-sync` rulează de două ori** — autonom în jobul `lint` și din nou în `check:docs-all` (`docs-sync-strict`) și în hook-ul husky pre-commit. ✅ **FINALIZAT** — invocarea autonomă din `lint` a fost eliminată.
- **Scanarea CVE** — ❌ **NU este o combinare simplă.** `audit:deps` blochează recomandările critice și auditurile incomplete pentru toate cele cinci lockfile-uri, raportând în același timp recomandările cu severitate ridicată drept avertismente conform politicii actuale; `check:vuln-ratchet` (osv) eșuează doar la o _regresie_ față de referința inclusă în repository și respinge măsurătorile lipsă atunci când sunt obligatorii. Semantică diferită — eliminarea `audit:deps` ar însemna pierderea controlului critic absolut și a dovezilor de audit independente pentru pachete. Păstrați-le pe ambele.
- **Detectarea ciclurilor** — ✅ **FINALIZAT** (#15159 G-01/G-02). Textul vechi de aici numea `check:cycles` mecanismul de control „verde, atent selectat” și justifica păstrarea sa ca blocant deoarece `check:circular-deps` (dpdm) raporta 91 de cicluri. Acel rezultat verde era un **fals pozitiv verde**: `check:cycles` scana 5 subdirectoare (450 de fișiere), identifica doar construcții statice `import|export … from` și elimina fiecare specificator `@/` și `@omniroute/open-sse/`, astfel încât nu putea detecta ciclurile cu importuri dinamice + aliasuri care dominau repository-ul. Remediere: mecanismul de control parcurge acum `src` + `open-sse` (5023 de fișiere), colectează specificatorii din AST-ul TypeScript (astfel încât `import("…")` este luat în calcul, iar `typeof import("…")` din pozițiile de tip nu este) și rezolvă `paths` din tsconfig. Găsește **14** cicluri, nu 0. Deoarece 14 cicluri preexistente nu pot fi remediate într-un PR pentru mecanismul de control, `check:cycles` este acum un **mecanism de limitare** (`--ratchet`, plafon `metrics.cycles.value = 14` în `quality-baseline.json`, `direction: down`) — blochează orice _regresie_, iar numărul poate doar să scadă. CI rulează `npm run check:cycles:ratchet`. Reducerea treptată este gestionată prin **A-01**. `check:circular-deps` (dpdm) rămâne consultativ, ca opinie secundară mai cuprinzătoare.
- **Complexitate** — ✅ **FINALIZAT** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): o singură parcurgere ESLint, cu numărare după ruleId, astfel încât referințele pentru complexitatea ciclomatică+numărul maxim de linii și pentru complexitatea cognitivă să rămână independente; comenzile individuale `check:complexity` / `check:cognitive-complexity` rămân disponibile pentru rularea locală cu `--update`.
- **Prevenirea halucinațiilor pentru `/api`** — ✅ **FINALIZAT** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un singur inventar FS pentru `src/app/api`; openapi-routes + docs-symbols continuă să raporteze independent; comenzile individuale rămân disponibile pentru rulări locale.
- **`check:node-runtime` rulează în 11 joburi** — ⚠️ **ROI scăzut.** Fiecare folosește un runner separat, iar verificarea durează <1s; economia totală este de ~10s, cu prețul pierderii unui mecanism de protecție ieftin pentru fiecare job. Nu merită perturbarea.
- **`typecheck:noimplicit:core` în etapa CI de lint** — ✅ **eliminat din jobul lint** (era consultativ, cu `continue-on-error`); suprafața de tipuri blocantă este `typecheck:core` + `check:type-coverage`. Scriptul local a fost păstrat.

### Activare / decizie (politica operatorului)

- `check:openapi-security-tiers` (consultativ) — ❌ **NU poate fi făcut blocant fără pregătire.** Se încheie cu codul 0, dar avertizează că mai multe rute `traffic-inspector` din `LOCAL_ONLY_API_PREFIXES` nu au adnotarea `x-loopback-only: true`. Aplicarea strictă necesită mai întâi adăugarea acestor adnotări în `openapi.yaml`.
- `typecheck:noimplicit:core` (consultativ) — este în mare parte acoperit de mecanismul de limitare blocant `check:type-coverage`. Transformați-l într-un mecanism de limitare sau eliminați a doua rulare `tsc`, redundantă.
- `test:vitest:ui` (acum **blocant**) — eșecurile preexistente sunt excluse explicit în `vitest.config.ts` prin comentarii de urmărire `// #8618`; eșecurile noi duc la eșecul jobului.
- `check:secrets` (gitleaks, mecanism de limitare blocant) — plafonul actual este `metrics.secretFindings` în `quality-baseline.json`. Orice excepție necesită o intrare justificată în `.gitleaks.toml`; o măsurătoare indisponibilă este INCOMPLETĂ. Scanarea completează scanarea nativă GitHub pentru secrete și `check:public-creds`.
- `check:pr-evidence` (blocant, caută în proza din corpul PR-ului) — risc ridicat de rezultate fals pozitive; eliminarea sa slăbește aplicarea Regulii stricte #18, deci aceasta este o decizie reală de politică.
- `semgrep` (autonom, consultativ) — se suprapune cu CodeQL pentru familiile OWASP; conectați referința sa la un mecanism de limitare sau eliminați-l.

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
