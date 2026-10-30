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

## Inventarul gate-urilor și profilurile de execuție

### Admiterea candidaților

Fluxurile de lucru CI și Quality emit fiecare câte un verdict stabil: `Gate / CI` și
`Gate / Quality`. Politica lor versionată de admitere enumeră fiecare job din amonte
ca fiind obligatoriu sau consultativ. Un job obligatoriu aplicabil trebuie să reușească:
rezultatele lipsă, anulate, omise, în așteptare și necunoscute nu pot stabili PASS. O
clasificare validă exclusiv pentru documentație sau exclusiv pentru catalog poate face
ca un flux de cod să fie neaplicabil; un PR în stadiu de ciornă nu este un candidat
acceptat. O etichetă `hotfix` nu elimină obligația de a furniza dovezi.

Ambele fluxuri de lucru acoperă PR-urile către ramurile main/release, push-urile către
`main`, declanșarea manuală și evenimentele grupurilor de îmbinare. Push-urile,
declanșările manuale și grupurile de îmbinare execută selecția completă. Push-urile către
`release/**` nu le pornesc (2026-10-18): fiecare modificare a executat deja matricea în
PR-ul său, iar combinația îmbinată este responsabilitatea Release-Green
(`docs/ops/RUNNER_BOX.md` → fluxul găzduit). Fork-urile și grupurile de îmbinare folosesc
runnere găzduite pentru joburile care, în alte situații, selectează runnere auto-găzduite;
înainte de lansare trebuie verificată existența unei capacități găzduite suficiente.

Fiecare recipisă JSON identifică SHA-ul preluat, rularea fluxului de lucru și încercarea.
CLI-ul respinge o neconcordanță între SHA-ul preluării și cel al evenimentului. Testele
fluxului de lucru leagă apartenența la politică de lista `needs` a jobului de verdict,
astfel încât un flux nou sau eliminat să nu poată dispărea neobservat. Dovezile acoperă propriul flux de lucru, nu publicarea, implementarea sau mecanismele interne
ale unui scaner consultativ existent. Stabilirea verificărilor aplicabile drept obligatorii în regulile pentru ramuri
este o modificare administrativă separată; definirea joburilor lor nu protejează, în sine, o ramură.

`API Route Typecheck` este o verificare independentă a fluxului de lucru, în afara ambelor verdicte agregate
și a profilului static al observatorului local complet. Inspectați separat rezultatul acesteia pentru candidatul exact.
`.github/workflows/api-route-typecheck.yml` rulează pentru PR-uri către `main` sau
`release/**`, pentru push-uri către oricare dintre familiile de ramuri și pentru declanșarea manuală. Nu are niciun filtru de cale.
Redirecționarea bazei unui PR solicită o verificare nouă; modificările corpului/titlului folosesc numele exclusiv pentru observare
`Admission not requested / API Route Typecheck` și nu pot înlocui verificarea de admitere.
Fluxul de lucru nu declară un declanșator pentru grupul de îmbinare. Orice implementare a unei cozi de îmbinare care necesită
această verificare trebuie mai întâi să stabilească executarea ei pentru evenimentul respectiv.

### Capacitatea de execuție a interfeței

CI execută inventarul complet al interfeței sub forma a patru shard-uri de matrice
`test-vitest`, fiecare cu cel mult doi workeri și cu limita existentă de 15 minute
pentru job. Primul shard execută și suita Vitest MCP/autoCombo. Rezultatul jobului
obligatoriu acoperă fiecare componentă a matricei; eșecul sau anularea unui shard nu
poate stabili admiterea candidatului.

Observatorul nocturn păstrează câte o recipisă separată pentru candidatul exact pentru
fiecare shard al interfeței, incluzând execuția MCP în prima recipisă. Sunt obligatorii
toate cele patru recipise, jurnalele și identitățile de execuție corespunzătoare.
Comanda locală `npm run test:vitest:ui` selectează în continuare suita completă; o
singură rulare `--shard` reprezintă doar o dovadă parțială.

### Colectarea acoperirii testelor unitare

Cele douăsprezece shard-uri unitare colectează acoperirea V8 în timpul execuției
existente a testelor. Un shard reușit execută `scripts/ci/compact-v8-coverage.mjs`
pentru a comprima fișierele originale fără a genera un raport Istanbul intermediar.
Jobul final Coverage verifică toate cele douăsprezece manifeste în raport cu SHA-ul
candidatului, mediul de execuție, rădăcina surselor și hash-urile datelor, apoi execută
raportoarele c8 și pragurile de acoperire existente. Datele de intrare păstrează ordinea
globală c8 a numelor de fișiere; pre-îmbinarea per shard nu este sigură pentru acoperirea
mixtă a funcțiilor/blocurilor. Shard-urile lipsă, incorecte sau incompatibile duc la
eșecul admiterii. Shard-urile de test eșuate păstrează separat acoperirea brută de
diagnosticare; aceasta nu poate fi inclusă în îmbinarea finală.

### Confirmări privind progresul execuției testelor unitare

Comanda partajată `test:unit:ci:shard` înregistrează fazele `primary`, `dashboard` și `serial`
prin `scripts/ci/unit-progress-reporter.mjs`. Raportul normal al testelor rămâne
disponibil. O confirmare separată, care conține exclusiv metadate, înregistrează începutul și finalizarea fiecărui fișier,
iar un semnal periodic la 30 de secunde enumeră fișierele încă active și timpul lor de execuție. Aceasta înregistrează
numai metadatele de execuție incluse în lista de permisiuni; descrierile testelor, rezultatele, corpurile erorilor și mediul
complet nu sunt serializate.

CI și Quality păstrează fișierele JSONL ca `unit-progress-ci-<run>-<attempt>-<shard>` și
`unit-progress-quality-<run>-<attempt>-<shard>`. Expirarea timpului alocat unei sarcini poate împiedica încărcarea ulterioară;
semnalele periodice deja emise rămân dovezi pentru diagnosticare. Absența semnalelor periodice poate indica, de asemenea,
un proces runner blocat sau oprit. Aceste confirmări păstrează selecția existentă a testelor,
nivelul de concurență, termenele-limită și starea de ieșire; ele nu reprezintă verdicte privind admiterea candidaților.

### Dovezi păstrate în modulul de agregare a acceptării

`scripts/quality/validate-release-acceptance.mjs` agregă un plan furnizat și manifestele sale; nu stabilește că planul acoperă întregul flux de lansare. Rapoartele sale setează explicit `releaseAcceptance: false`, chiar și atunci când planul este `VERIFIED`. Workflow-ul `release-acceptance.yml` folosește în continuare date de test shadow, nu confirmări reale de build, împachetare, pornire sau promovare.

CLI necesită `--evidence-root` pentru a verifica dovezile păstrate. Fișierele sunt găsite la `<evidence-root>/<artifact_id>/<member>` și li se calculează hash-ul SHA-256. O înregistrare PASS fără dovezi, un fișier lipsă sau modificat, o cale nesigură ori o legătură simbolică împiedică verificarea. Fișierele lipsă nu echivalează cu jurnale goale ale unor execuții reușite. Verificările SHA/run/attempt existente rămân independente: octeții identici nu pot valida o confirmare învechită. Integritatea fișierului nu dovedește autenticitatea execuției sau promovarea artefactului.

### Inventarul scanării statice

Inventarul versionat al aliasurilor npm și apartenența la scanarea statică se află în
`config/quality/gate-manifest.json`. Executați `npm run check:gate-manifest` pentru a
valida numele scripturilor și comenzile exacte în raport cu `package.json`; adăugările,
eliminările și modificările comenzilor duc la eșec atât în hook-ul local, cât și în
joburile de clasificare a modificărilor din CI. Un alias nu este un job al fluxului de
lucru, o instanță a matricei sau un caz de test: aceste valori nu trebuie prezentate ca
fiind interschimbabile.

Folosiți `npm run quality:scan -- --list` sau `npm run quality:scan:fast -- --list`
pentru a inspecta aliasurile selectate fără a le executa. Runnerul invocă punctul de
intrare npm, astfel încât mediul său de execuție (inclusiv Bun, acolo unde este
configurat) este păstrat. Manifestul înregistrează aliasurile din afara acestor profiluri
ca fiind invocate separat, iar comenzile de întreținere sunt interzise în profilurile de
scanare doar în citire.

Aceste profiluri acoperă numai scanarea statică. Ele nu certifică testele produsului,
acoperirea, împachetarea, verificările externe sau acceptarea completă a unui candidat
pentru lansare. Admiterea în fluxul de lucru folosește fișierul asociat
`config/quality/admission-policy.json` și `scripts/quality/admission-verdict.mjs`.
Profilurile observatorului de lansare rămân separate; inspectați independent verificările
și recipisele aplicabile. Comenzile statice ale observatorului complet sunt declarate în
`config/quality/release-green-static-profile.json`, inclusiv `audit:deps`, selecția
testelor de mutație și verificările traducerilor. Încărcătorul validează comenzile npm
în raport cu package.json și cu declarațiile CI/Quality modelate; acesta respinge
neconcordanțele în loc să execute tokenurile shell drept argumente. Ieșirea
SKIP/INCOMPLETE a unui scaner obligatoriu nu poate stabili PASS. Profilul își
înregistrează excluderile externe și nu înlocuiește dovezile privind acoperirea
găzduită, matricele de teste, pachetele sau implementarea. Inventarul narativ de mai jos
este o referință, nu o dovadă că un gate a fost executat efectiv.

Scripturile se află în `scripts/check/` (gate-uri de politică) și `scripts/quality/`
(motorul ratchet). Sursa de adevăr pentru CI este `.github/workflows/ci.yml`.

### Starea documentației de bază publicate

`.github/workflows/i18n-base-health.yml` monitorizează starea documentației după anumite
push-uri către `main` și `release/v*`, precum și la declanșarea manuală. Filtrele sale acoperă documentația,
fișierele Markdown din rădăcină, `llm.txt`, starea/configurația traducerilor și instrumentele i18n relevante.
Singurul job, `Published base documentation health`, utilizează Ubuntu găzduit și are un termen-limită
de cinci minute. Acesta efectuează o validare numai în citire și scrie o confirmare de diagnosticare fără
instalarea dependențelor, traducere sau adoptarea stării.

`scripts/i18n/check-base-health.mjs` impune absența neconcordanțelor privind hash-ul sursă, țintele lipsă, hash-ul țintă,
traducerile învechite și memoria cache a secțiunilor. De asemenea, validează domeniul curent al documentelor
de bază/localizărilor și proveniența înregistrată a acestuia. Un context nevalid, o acoperire incompletă
sau întreruperea verificatorului produce `INCOMPLETE`; o abatere confirmată produce `FAIL`. Ambele
returnează o stare de ieșire de eșec. Confirmarea este asociată cu SHA-ul checkout-ului, fluxul de lucru, rularea și
încercarea și este păstrată ca `i18n-base-health-<sha>-<run>-<attempt>`.

Aceasta este o observare independentă a bazei publicate. Nu adaugă un eveniment PR sau
de grup de îmbinare, o verificare PR obligatorie, un alias npm sau un membru al profilului de scanare statică.
Politica PR diferențială existentă și clasificările consultative ale verificatorului subiacent
rămân separate. O încărcare reușită nu poate transforma un rezultat de stare eșuat în PASS.

### Calea rapidă pentru PR-urile de lansare (`quality.yml`)

`.github/workflows/quality.yml` completează CI pentru PR-urile către main/release,
push-urile către `main`, declanșările manuale și grupurile de îmbinare. PR-urile
folosesc verificări rapide filtrate după căi. Compilarea duplicată, dezactivată
permanent, a fost eliminată; verificările reale de compilare/împachetare/pornire rămân
în CI.

| Sarcină                                          | Domeniu de aplicare                                                                                                                                                                                                                            | Blocantă                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `Docs Gates (fast-path)`                         | PR-uri pentru documentație/cod; referințe ale documentației API și întreaga documentație                                                                                                                                                       | Da                           |
| `Fast Quality Gates`                             | PR-uri pentru cod; verificări statice, verificarea tipurilor, verificarea tipurilor pentru panoul de control, teste unitare afectate                                                                                                           | Da                           |
| `Forgotten sibling tests`                        | PR-uri pentru cod; modulele modificate sunt urmărite până la consumatorii statici și testele înrudite candidate; căile cu barrel și import dinamic sunt raportate ca diagnostice consultative, cu excepțiile menționate în lista de permisiuni | **Consultativă**             |
| `Vitest (fast-path)`                             | PR-uri pentru cod; suită rapidă Vitest                                                                                                                                                                                                         | Da                           |
| `Unit Tests fast-path`                           | PR-uri pentru cod; suită de teste unitare împărțită în 4 fragmente                                                                                                                                                                             | Da                           |
| `No new ESLint warnings`                         | PR-uri pentru cod; mecanism de protecție pentru lint care ține cont de suprimări                                                                                                                                                               | Da, inclusiv pentru fork-uri |
| `Merge integrity (changelog + generated skills)` | PR-uri care nu sunt ciorne; sincronizarea jurnalului de modificări și a abilităților generate                                                                                                                                                  | Da, inclusiv pentru fork-uri |

#### Raport privind testele înrudite omise

`npm run check:forgotten-sibling-tests` reutilizează mecanismul de rezolvare a importurilor folosit de harta impactului asupra testelor.
Pentru fiecare modul de producție modificat, acesta raportează lanțuri deterministe
`changed module/symbol -> static consumer -> candidate sibling test` atunci când testul candidat
lipsește din diferențele cererii de tragere. Rezumatul Markdown și rezultatul JSON sunt păstrate ca
artefact al fluxului de lucru `forgotten-sibling-tests`, pentru calibrare înaintea oricărei implementări blocante.

Reexporturile de tip barrel și importurile dinamice sunt doar diagnostice de rezoluție; acestea nu generează niciodată o
constatare blocantă. Excepțiile revizuite se află în
`config/quality/forgotten-sibling-allowlist.json`. Fiecare intrare trebuie să specifice consumatorul și testul
candidat, să ofere o justificare concretă și să includă un link către o problemă GitHub sau o cerere de tragere. Intrările incorecte
produc o eroare în mod implicit. Excepțiile nu pot suprima un test candidat șters sau o diferență care adaugă `.skip`/`.todo`;
slăbirea aserțiunilor și alte forme de mascare rămân în responsabilitatea mecanismului de control blocant independent
`check:test-masking`.

### Sarcină: `lint`

Rulează pentru fiecare PR către `main`. Blochează îmbinarea în caz de eșec.

| Script (`npm run ...`)            | Validează                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blocant                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | Versiunea Node.js se află în intervalul acceptat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                         |
| `check:test-tla-order`            | Niciun fișier `node:test` din `tests/unit` nu înregistrează un test, întâlnește un `await` la nivel superior, apoi înregistrează altele (#18045; mecanism cu clichet: `test-tla-order-allowlist.json` se poate doar restrânge)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                         |
| `check:cycles`                    | Importuri circulare în întregul `src/` + `open-sse/` (bazat pe AST, cu `paths` din tsconfig rezolvate). Varianta simplă se încheie cu codul 1 ori de câte ori există vreun ciclu (comportament fail-closed începând cu #15281) și listează SCC-urile. `check:cycles:ratchet` (varianta rulată de CI) blochează atunci când numărul depășește plafonul `metrics.cycles` din `quality-baseline.json` — în prezent 14, `direction: down`, deci poate doar să scadă (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da (mecanism cu clichet)                   |
| `check:boundary`                  | Cuplarea `open-sse → src`: importuri unice între fișiere din motor în aplicație (`scripts/quality/measure-boundary.mjs`; lista de muchii reprezintă restanțele de remediere pentru separarea nucleului/modulelor v4). Varianta simplă = raport consultativ (la fel ca `quality:boundary`). `check:boundary:ratchet` (varianta rulată de CI, inclusă și în bucla cu mecanism cu clichet pentru verificările rapide din `quality.yml`) blochează atunci când numărul depășește plafonul `metrics.boundaryOpenSseToSrc` din `quality-baseline.json` — inițializat la valoarea măsurată de 771, `direction: down`; `--update` îl poate doar reduce; relativ la bază pentru PR-uri (`--base-ref`, vedeți mai jos)                                                                                                                                                                                                                         | Da (mecanism cu clichet)                   |
| `check:route-validation:t06`      | Scheme Zod prezente pe toate rutele (politica de nivel 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                         |
| `check:any-budget:t11`            | Numărul de `@ts-expect-error // any` nu depășește limita (catraca de nivel 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                         |
| `check:provider-consistency`      | Fiecare furnizor din `providers.ts` are o intrare corespunzătoare în `providerRegistry.ts` (și invers, în limitele listei de permisiuni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                         |
| `check:model-lifecycle`           | Cele trei tabele de rutare întreținute manual rămân consecvente cu instantaneul ciclului de viață inclus în depozit (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nu punctează niciun ID retras pe care `REGISTRY` îl poate ruta; fiecare țintă `BUILT_IN_ALIASES` este prezentă în `REGISTRY` și absentă din instantaneul ID-urilor retrase; fiecare ID retras aflat încă în `REGISTRY` este redirecționat sau enumerat în `allowedRetiredInCatalog`; și nicio sursă sau țintă `DEFAULT_DEGRADATION_MAP` nu apare ca retrasă în acel instantaneu. Acest lucru nu dovedește că un model este deservit în prezent de un serviciu upstream activ. Offline — compară cu `config/quality/model-lifecycle.json`, actualizat manual cu `npm run quality:refresh-model-lifecycle` (rețea; neintegrat în CI). `allowedRetiredInCatalog` este un mecanism incremental de reducere: adăugați o intrare numai împreună cu un tichet de urmărire. | Da                                         |
| `check:fetch-targets`             | Fiecare `fetch("/api/...")` din `src/` pentru partea de client se rezolvă la un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                         |
| `check:deps`                      | Toate dependențele instalabile cu `npm install` din fiecare `package.json` din depozit se află în `dependency-allowlist.json`; pachetele noi fără versiune fixată sau care imită prin typo-squatting alte pachete sunt semnalate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                         |
| `audit:deps`                      | audit npm pentru toate cele cinci fișiere de blocare independente (rădăcină, Electron, pluginuri OpenCode v1/v2 și furnizor). Avertismentele critice blochează; avertismentele de nivel ridicat rămân avertizări vizibile. Auditurile lipsă/eșuate sunt INCOMPLETE și blochează; hashurile fișierelor de blocare și rapoartele sunt păstrate pentru fiecare domeniu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                         |
| `check:lockfile`                  | Integritatea `package-lock.json` — registru https, hashuri de integritate, fără suprascrieri ale gazdei                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `check:licenses`                  | Listă de permisiuni pentru licențe SPDX aferente dependențelor de producție                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                         |
| `check:tracked-artifacts`         | Fără artefacte de compilare / legături simbolice `node_modules` incluse în commit (rulează și în pre-commit-ul husky; pre-push este intenționat minimal — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                         |
| `check:ai-attribution`            | Fără trailer AI/bot `Co-Authored-By` sau subsol privind generarea cu AI în commiturile, titlul sau corpul PR-ului — Regula strictă #16 (în bucla de verificări rapide din `quality.yml` pentru PR→`release/**` — citește sarcina utilă a evenimentului, nu efectuează nicio operațiune în afara PR-urilor — și într-un pas destinat exclusiv PR-urilor din verificarea lint din `ci.yml` pentru PR→`main`; de asemenea, în hook-ul husky `commit-msg`; coautorii umani sunt permiși; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Fiecare excludere Vitest indică o problemă de urmărire și apare în `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                         |
| `check:file-size`                 | Fișierele sursă (`.ts`/`.tsx` din `src/`, `open-sse/`, `electron/`, `bin/`) rămân în limitele `cap`, iar fișierele de test (`*.test.ts(x)`) în limitele `testCap`; fișierele înghețate în `file-size-baseline.json` (`frozen` / `testFrozen`) nu trebuie să depășească dimensiunea înregistrată                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                         |
| `check:error-helper`              | Răspunsurile de eroare din executori/gestionari utilizează `buildErrorBody()` / `sanitizeErrorMessage()` (Regula strictă nr. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                         |
| `check:migration-numbering`       | Fișierele SQL de migrare sunt numerotate secvențial, fără întreruperi sau duplicate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                         |
| `check:public-creds`              | Nu există valori literale OAuth `client_id`/`client_secret` sau chei Web Firebase în afara `publicCreds.ts` (Regula strictă nr. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                         |
| `check:db-rules`                  | Nu există SQL brut în afara modulelor `src/lib/db/`; nu există importuri agregate din `localDb.ts` (Regulile stricte nr. 2/nr. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                         |
| `check:known-symbols`             | Executorii furnizorilor, strategiile de rutare și translatoarele înregistrate în tabelele lor de dispecerizare corespund fișierelor de pe disc — fără simboluri orfane sau nedeclarate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                         |
| `check:route-guard-membership`    | Fiecare rută care generează un proces copil este clasificată de `isLocalOnlyPath()` (Regulile stricte #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                         |
| `check:test-discovery`            | Fiecare fișier `*.test.ts` / `*.spec.ts` din depozit este colectat de cel puțin un executor de teste (mecanism de blocare progresivă: lista fișierelor orfane din `test-discovery-baseline.json` poate doar să se reducă)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                         |
| `check:agent-skills-sync`         | Artefactele generate pentru abilitățile agenților corespund catalogului lor sursă (fără divergențe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Siglele/resursele furnizorilor au o intrare de proveniență înregistrată                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | Fișierele de configurare JSON sunt analizate cu succes și respectă regulile de linting ale depozitului                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Compilare TypeScript fără erori (doar avertismente informative)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` strict — orientat spre viitor; multe locuri de apel preexistente încă necesită adnotări                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Informativ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitat la `src/app/(dashboard)/**` (#7033) — lista atent selectată de 27 de fișiere din `typecheck:core` nu include niciun TSX pentru dashboard, iar `next build` nici nu efectuează verificarea tipurilor pentru acestea (`next.config.mjs` setează `ignoreBuildErrors: true`), astfel încât regresiile cu identificatori orfani de acolo (#6625/#6909) erau invizibile pentru CI. Compară diferențele cu o bază de referință înghețată a numărului per fișier/per cod TS (`config/quality/dashboard-typecheck-baseline.json`, același model de impunere a detectării intrărilor învechite ca `check:known-symbols`) — doar erorile NOI care depășesc numărul din baza de referință determină eșecul porții; reduceți progresiv baza cu `--update` atunci când este remediată o eroare preexistentă.                                                                                                                         | Da                                         |

### Job: `quality-gate`

Rulează după `test-coverage`. Blochează fuzionarea în caz de eșec.

| Script                       | Validează                                                                                                                                                                                                    | Blocant                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `quality:collect`            | Generează `quality-metrics.json` (numărul de avertismente ESLint, acoperirea din raportul combinat al fragmentelor)                                                                                          | Da (în amonte de mecanismul cu clichet) |
| `quality:ratchet`            | Nicio metrică din `quality-baseline.json` nu a regresat (avertismente ESLint ≤ baza de referință; acoperire ≥ baza de referință)                                                                             | Da                                      |
| `check:duplication`          | Duplicarea codului (jscpd@4) nu depășește baza de referință din `quality-baseline.json`                                                                                                                      | Da                                      |
| `check:complexity`           | Complexitatea ciclomatică la nivel de fișier nu depășește limita (regulile ESLint de bază `complexity` + `max-lines-per-function`)                                                                           | Da                                      |
| `check:cognitive-complexity` | Mecanism cu clichet pentru complexitatea cognitivă (`eslint-plugin-sonarjs`) — rulare ESLint separată; CI le rulează pe ambele, reunite în pasul unic `check:complexity-ratchets`                            | Da                                      |
| `check:dead-code`            | Mecanismul cu clichet pentru exporturile/fișierele neutilizate (knip) nu regresează față de baza de referință                                                                                                | Da                                      |
| `check:compression-budget`   | Bugetul etalonului de compresie — pragurile minime per motor pentru economisirea tokenurilor nu trebuie să regreseze                                                                                         | Da                                      |
| `check:type-coverage`        | Mecanismul cu clichet pentru procentul de cod tipizat (`type-coverage`) nu regresează; înlocuiește în mare parte `typecheck:noimplicit:core`                                                                 | Da                                      |
| `check:codeql-ratchet`       | Numărul de alerte CodeQL deschise nu regresează (citit prin `gh api`; omitere controlată fără token) — pentru cadența actualizării și declanșarea manuală, consultați „Mecanismul cu clichet CodeQL” mai jos | Da                                      |

### Job: `quality-extended`

Jobul blochează candidații aplicabili. Dimensiunea pachetului, detectările de secrete, constatările privind vulnerabilitățile,
constatările privind fluxurile de lucru și modificările OpenAPI sunt verificate cu mecanisme cu clichet obligatorii.
Diagnosticările dependențelor circulare rămân consultative. Instalarea scanerelor este obligatorie:
`scripts/ci/install-quality-scanners.sh` furnizează versiunile fixate și propagă
eșecurile de instalare. Instrumentele lipsă, rapoartele nevalide sau bazele de referință lipsă lasă
poarta obligatorie a scanerului în starea INCOMPLETĂ.

| Script                   | Validează                                                                                                                                                                                                                                                                                      | Blocare                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Fără dependențe circulare (dpdm)                                                                                                                                                                                                                                                               | **Consultativ**                                            |
| `check:bundle-size`      | Dimensiunea pachetului nu depășește limita; o măsurătoare indisponibilă determină eșecul                                                                                                                                                                                                       | **Blocant cu --ratchet**                                   |
| `check:secrets`          | Constatările Gitleaks nu regresează; scanările obligatorii resping instrumentele/sursa/referința de bază lipsă, scanările eșuate și rapoartele nevalide                                                                                                                                        | **Blocant cu --ratchet**                                   |
| `check:vuln-ratchet`     | Vulnerabilitățile dependențelor nu regresează; scanările obligatorii resping instrumentele lipsă, rapoartele nevalide sau referințele de bază lipsă                                                                                                                                            | **Blocant cu --ratchet**                                   |
| `check:workflows`        | Analiza statică a fluxurilor de lucru (actionlint + zizmor); scanerele lipsă/defecte, rapoartele nevalide sau referința de bază ratchet lipsă determină eșecul cu starea INCOMPLETE. Constatările valide urmează politica strict/advisory/ratchet selectată                                    | Execuție obligatorie; ratchet-ul zizmor este blocant în CI |
| `check:openapi-breaking` | Contractul API public este verificat în raport cu commiturile fixate ale evenimentelor (baza de îmbinare pentru PR, starea anterioară pentru push, baza grupului de îmbinare; pentru execuții programate/manuale, primul părinte al checkout-ului); măsurarea obligatorie eșuează în mod sigur | **Blocant cu --ratchet**                                   |

### Sarcină: `docs-sync-strict`

Pentru pull request-uri către `main` sau `release/**`, această sarcină rulează numai pentru candidați care nu sunt ciorne (sau provin dintr-o coadă de încredere) și sunt clasificați drept modificări de documentație sau de cod. Rulează și la evenimente CI care nu sunt PR-uri; declanșatorul push al acestui workflow acoperă doar `main`, nu și `release/**`. Un pas care se încheie cu un cod de ieșire diferit de zero blochează sarcina; constatările doar raportate și excepțiile documentate mai jos nu o blochează.

| Script                         | Validează                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blocare                                                                                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `check:docs-all`               | Poartă de control agregată care execută secvențial cele 7 sub-porți de mai jos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                                                                                                                               |
| ↳ `check:docs-sync`            | Consecvența versiunilor pachetului/OpenAPI/CHANGELOG, copii exacte ale `llm.txt`, invariantele secțiunilor/dimensiunii CHANGELOG-ului tradus și absența documentelor duplicate înlocuite                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                                                                                                                               |
| ↳ `check:docs-frontmatter`     | Paginile de documentație compilate conțin titluri frontmatter valide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                                                                                                                               |
| ↳ `check:docs-counts`          | Invariantele de numărare cu grad ridicat de încredere sunt stricte; verificările euristice ale numărului de fișiere doar avertizează dacă scriptul nu primește `--strict` (poarta agregată CI nu îl transmite)                                                                                                                                                                                                                                                                                                                                                                                  | Nivelul strict blochează; nivelul flexibil este consultativ                                                                                      |
| ↳ `check:env-doc-sync`         | Citirile variabilelor de mediu din codul sursă, `.env.example` și `docs/reference/ENVIRONMENT.md` sunt conforme după aplicarea listelor explicite de excepții ignore, doc-only și env-only                                                                                                                                                                                                                                                                                                                                                                                                      | Da, în afara listelor de excepții documentate                                                                                                    |
| ↳ `check:deprecated-versions`  | Raportează versiuni potențial învechite în afara contextelor istorice sigure și date de actualizare vechi, excluzând documentele ignorate                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Consultativ în configurația CI actuală (`--strict` nu este transmis)                                                                             |
| ↳ `check:doc-links`            | Linkurile markdown interne din documentație corespund unor fișiere reale (forma `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                                                                                                                               |
| ↳ `check:fabricated-docs`      | Rutele, variabilele de mediu, comenzile CLI, numele hook-urilor și căile de fișiere menționate în documentație există în baza de cod. Poartă strictă prin `--strict`; eșec neblocant fără opțiune.                                                                                                                                                                                                                                                                                                                                                                                              | Da (prin `--strict` în CI)                                                                                                                       |
| `check:cli-i18n`               | Cheile CLI `t()` utilizate există în `en`; `pt-BR` păstrează toate secțiunile de nivel superior; `zh-CN` și `zh-TW` conțin fiecare cheie din `en`                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                                                                                                                               |
| `check:openapi-coverage`       | Specificația OpenAPI acoperă cel puțin un prag minim ajustat prin ratchet al rutelor reale                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                                                                                                                               |
| `check:openapi-security-tiers` | Adnotările declarate `x-loopback-only`/`x-always-protected` trebuie susținute de `routeGuard.ts`; erorile parserului și neconcordanțele verificării directe blochează. Verificarea inversă pentru `x-loopback-only` lipsă sub prefixele exclusiv locale avertizează, iar rutele definite numai prin tipare sunt excluse din această verificare inversă.                                                                                                                                                                                                                                         | Parserul/verificările directe blochează; verificarea inversă este consultativă                                                                   |
| `check:openapi-routes`         | Fiecare cale `/api...` din `openapi.yaml` corespunde unei rute reale independent de numele parametrilor după aplicarea listei justificate de excepții `KNOWN_STALE_SPEC`; intrările învechite din listă produc și ele eșec                                                                                                                                                                                                                                                                                                                                                                      | Da                                                                                                                                               |
| `check:docs-symbols`           | Referințele URL interne `/api/...` din documentele canonice care nu sunt copii traduse corespund unei rute reale sau unei familii de rute; referințele proxy/upstream/placeholder/fișier și intrările justificate `KNOWN_STALE_DOC_REFS` sunt excluse, iar intrările învechite din lista de excepții produc eșec                                                                                                                                                                                                                                                                                | Da                                                                                                                                               |
| `i18n translation drift`       | Verifică hashurile sursă/destinație ale documentelor principale și proveniența traducerii. Comparația PR permite numai eșecuri moștenite identice; neconcordanțele noi sau neverificate privind sursa, destinația lipsă, hashul destinației, traducerea învechită sau memoria cache a secțiunilor blochează. În afara comparației PR, eșecurile sursei/destinației lipsă/hashului destinației blochează, în timp ce traducerile învechite și memoriile cache neconcordante ale secțiunilor rămân doar avertismente. Absența unei memorii cache a secțiunilor în formatul vechi nu este un eșec. | Abaterea nouă/neverificată în PR blochează; abaterea moștenită identică este doar un avertisment; regulile din afara PR depind de tipul eșecului |

### Sarcină: `i18n-ui-coverage`

| Script                            | Validează                                                                                                                                                                                                                | Blocant     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check-ui-keys-coverage` (inline) | Acoperirea cheilor i18n din interfața de utilizare este ≥ 65%                                                                                                                                                            | Da          |
| `check-ui-value-drift` (inline)   | O **valoare** în limba engleză rescrisă nu lasă în urmă nicio traducere învechită                                                                                                                                        | Da          |
| `check-new-key-coverage` (inline) | O cheie **nouă** în limba engleză este tradusă în fiecare localizare — un marcaj `__MISSING__:` este respins                                                                                                             | Da          |
| `check-translation-ratio`         | Raportul traducerilor reale pentru fiecare localizare (identice cu engleza / substituenți / intrări lipsă din afara listei de excepții) nu trebuie să depășească `config/quality/i18n-translation-baseline.json` + marja | **Blocant** |

Necesită `fetch-depth: 0` — verificarea abaterilor valorilor compară diferențele din `en.json` față de baza îmbinării.

#### `check-ui-value-drift` — verificarea traducerilor învechite

Detectează singura regresie i18n pe care celelalte verificări nu o pot identifica structural: o valoare în limba engleză
este rescrisă, iar traducerile derivate din valoarea în engleză _anterioară_ rămân neschimbate, astfel încât
utilizatorii care nu folosesc limba engleză continuă să citească texte formulate convingător, dar care acum sunt greșite.

Această problemă a ajuns efectiv în producție. `oauthModal.googleOAuthWarning` a fost rescrisă când a fost introdus
asistentul de autentificare Antigravity (#5203); **39 din 43 de localizări** au păstrat textul care le spunea operatorilor să „copieze
URL-ul complet și să-l lipească mai jos” — un flux care nu poate fi finalizat pentru furnizorul respectiv. Problema a rămas
neobservată până la #8463 deoarece:

- `sync-ui-keys` completează doar cheile care sunt **absente**, niciodată pe cele **învechite**;
- `check-ui-keys-coverage` numără _prezența_ cheilor, astfel încât o traducere învechită este considerată acoperită;
- `check-translation-drift` urmărește copiile documentației din `docs/i18n/<locale>/**.md` —
  nu citește niciodată `src/i18n/messages/*.json`. Blocant în jobul `docs-sync-strict` începând cu
  resincronizarea din 2026-09: modificați un document de bază → `npm run i18n:run -- --files=<doc>` (la nivel de secțiune, ieftin).

**Bazat pe diferențe, nu pe o bază de referință.** Compară `en.json` de la baza îmbinării cu
arborele de lucru; pentru fiecare cheie a cărei valoare în limba engleză s-a modificat, orice localizare care încă păstrează o
traducere nemodificată este învechită. Această abordare **îngheață în mod deliberat datoria preexistentă** — o diferență
nu poate dezvălui din ce versiune veche în limba engleză provine o traducere existentă de mult timp, astfel încât verificarea evaluează
doar ceea ce atinge modificarea curentă. Alternativa (o bază de referință cu hash pentru fiecare cheie) ar necesita
un fișier generat de aproximativ 600 KB, de 3 ori mai mare decât cea mai mare bază de referință existentă, care s-ar modifica la fiecare PR i18n.

Există două modalități de a îndeplini cerința:

1. actualizați traducerile afectate sau
2. setați-le la `__MISSING__:<new english>` — sistemul de execuție va furniza atunci textul corectat în limba engleză
   (`src/i18n/request.ts::deepMergeFallback`, #7258), iar cheia va fi adăugată în coada pentru traducere.

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

Matrice completă de validare i18n (câte un job pentru fiecare localizare). Întregul job este consultativ.

| Script                          | Validează                                | Blocant                                                         |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------------------- |
| `validate_translation.py quick` | Integralitatea traducerii per localizare | **Consultativ** (`continue-on-error: true` pentru întregul job) |

### Job: `pr-test-policy`

Rulează numai pentru cererile de integrare.

| Script                 | Validează                                                                                                                                                            | Blocant |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-urile care modifică codul de producție din `src/`, `open-sse/`, `electron/` sau `bin/` trebuie să includă ori să actualizeze teste (Regula strictă #8)            | Da      |
| `check:test-masking`   | Fișierele de test modificate nu reduc numărul net de aserțiuni și nu adaugă tautologii `assert.ok(true)`                                                             | Da      |
| `check:pr-evidence`    | Corpul PR-ului menționează dovezi din teste/VPS pentru modificare (automatizează Regula strictă #18 prin căutarea în textul PR-ului — fragil, consultați Restanțele) | Da      |

### Job: `test-vitest`

Necesită jobul de clasificare `changes`. Partițiile aplicabile ale matricei blochează îmbinarea în caz de eșec.

| Suită            | Validează                                                        | Blocant                                                                                                              |
| ---------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Serverul MCP (110 instrumente), autoCombo, cache — runner vitest | Da                                                                                                                   |
| `test:vitest:ui` | Testele componentelor UI — runner vitest                         | **Blocant** — erorile preexistente sunt excluse explicit în `vitest.config.ts`; erorile noi determină eșecul jobului |

### Fluxuri de lucru nocturne (programate, informative)

Acestea rulează conform unei programări cron (și prin `workflow_dispatch`), niciodată pentru PR-uri. Toate au caracter informativ.

| Flux de lucru          | Validează                                                                                                                                                                                        | Blocant        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `nightly-property`     | Teste bazate pe proprietăți fast-check, cu un seed aleatoriu și un număr mare de rulări                                                                                                          | **Informativ** |
| `nightly-resilience`   | Pragul de creștere a heap-ului, injectarea haotică a defecțiunilor, teste k6 de încărcare/anduranță                                                                                              | **Informativ** |
| `nightly-llm-security` | Protecție promptfoo împotriva injectării (mod de blocare) + sonde garak (omise fără secretul unui furnizor)                                                                                      | **Informativ** |
| `nightly-schemathesis` | Testare fuzz a contractului OpenAPI (schemathesis) pe o instanță OmniRoute activă, utilizând `docs/openapi.yaml` — evidențiază încălcările specificației / erorile 500 negestionate (Faza 8 B.4) | **Informativ** |
| `nightly-mutation`     | Scorul testării prin mutații Stryker pentru fluxul rapid de teste unitare — mutanții supraviețuitori evidențiază aserțiunile slabe                                                               | **Informativ** |
| `nightly-compat`       | Matricea de compatibilitate a motorului Node pentru intervalele `engines.node` acceptate                                                                                                         | **Informativ** |

Valorile de referință pentru performanță (heap, TTFB, timpul de compilare) sunt înregistrate, dar nu sunt folosite ca praguri de validare: consultați [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

**De asemenea, nedocumentate mai sus** (consultative, semnal slab): jobul `docs-lint`
(markdownlint + Vale, întregul job cu `continue-on-error`) și fluxurile de lucru autonome de scanare
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` se află în
`quality-baseline.json`, dar nu este conectat la un mecanism de limitare blocant în `ci.yml` — metrica este
în prezent orfană.

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
