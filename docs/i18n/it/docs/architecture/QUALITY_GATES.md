# Quality Gates Reference (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Questo documento è il riferimento autorevole per tutti i controlli di qualità CI in OmniRoute.
Descrive ciascun controllo, ciò che convalida, il job CI in cui viene eseguito, se utilizza
una baseline ratchet o una politica superato/non superato e se blocca la build o è solo consultivo.

Per un breve riepilogo e per la politica dell'allowlist, consulta la sezione "Quality Gates & Ratchets"
in `AGENTS.md`. Per la valutazione critica, la classificazione della maturità e il piano di
replicazione indipendente dagli strumenti dello stesso sistema, consulta il
[Manuale operativo dei controlli di qualità](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventario dei gate e profili di esecuzione

### Ammissione del candidato

I flussi di lavoro CI e Quality Gates emettono ciascuno un verdetto stabile: `Gate / CI` e `Gate / Quality`. La loro politica di ammissione con versione enumera ogni lavoro a monte come richiesto o consultivo. Un lavoro richiesto applicabile deve avere esito positivo: i risultati mancanti, annullati, saltati, in sospeso e sconosciuti non possono stabilire PASS. Una classificazione valida solo per documenti o solo catalogo può rendere inapplicabile una corsia di codice; un progetto PR non è un candidato accettato. Un'etichetta `hotfix` non rinuncia alla prova.

Entrambi i flussi di lavoro coprono PRs in rami main/release, push su `main`, invio manuale ed eventi di unione di gruppi. Push, dispatch e merge-group eseguono la selezione completa. I push su `release/**` non li avviano (18-10-2026): ogni modifica ha già eseguito la matrice sul suo PR e la combinazione unita è lavoro di Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane). I fork e i gruppi di unione utilizzano corridori ospitati per lavori che altrimenti selezionerebbero corridori self-hosted; La capacità ospitata sufficiente deve essere verificata prima dell'implementazione.

Un normale PR esegue la selezione veloce. Le corsie `full-code` e `full-code-e2e` della politica di ammissione (E2E, integrazione, artefatto del pacchetto, Electron smoke, Bun SQLite, client dell'ecosistema e del protocollo) vengono eseguite solo su una bozza della coda Mergify o su un'esecuzione completa: `gh workflow run ci.yml --ref <branch>`.

Ogni ricevuta JSON identifica lo SHA estratto, l'esecuzione del flusso di lavoro e il tentativo. Lo CLI rifiuta una mancata corrispondenza checkout/event SHA. I test del flusso di lavoro vincolano l'appartenenza alla policy all'elenco `needs` del processo di verdetto in modo che una corsia nuova o rimossa non possa scomparire silenziosamente. Le ricevute coprono il proprio flusso di lavoro, non la pubblicazione, la distribuzione o gli aspetti interni di uno scanner consultivo esistente. L'attivazione di entrambi i nomi degli assegni nelle regole del ramo costituisce una modifica amministrativa separata; l'aggiunta di questi lavori non protegge di per sé una filiale.

### Unisci coda

L'etichetta `queue` invia un PR alla coda Mergify (`.mergify.yml`). Mergify apre una bozza PR su un ramo `mergify/merge-queue/`, CI esegue lì la selezione completa e PR originale si unisce quando `Gate / CI`, `Gate / Quality` e `Merge integrity (changelog + generated skills)` passano.

Mergify scrive il riepilogo della coda nella descrizione della bozza e anche altre app possono modificarlo. Un evento `pull_request` `edited` su una bozza di questo tipo accetta il proprio gruppo di concorrenza (`-queue-edit-<run_id>`), quindi non può annullare l'esecuzione reale della bozza e salta il gate e la matrice. Solo `Merge integrity` funziona ancora. Il lavoro del gate saltato porta un nome di controllo diverso, perché Mergify legge uno `Gate / CI` saltato come un controllo non riuscito e rimuove dalla PR.

Dopo una rimozione dalla coda, un push non sempre riaccoda lo PR. Commenta `@mergifyio queue` su di esso.

### Prove conservate nel riduttore di accettazione

`scripts/quality/validate-release-acceptance.mjs` riduce un piano fornito e i suoi manifesti; non stabilisce che il piano copra l'intero percorso di rilascio. I suoi rapporti impostano esplicitamente `releaseAcceptance: false`, anche quando quel piano è `VERIFIED`. Il flusso di lavoro `release-acceptance.yml` utilizza ancora dispositivi ombra, non ricevute di build, pacchetti, avvio o promozioni reali.

La CLI richiede `--evidence-root` di verificare le prove conservate. I file vengono risolti come `<evidence-root>/<artifact_id>/<member>` e sottoposti ad hashing come SHA-256. Un record PASS senza prove, un file mancante o modificato, un percorso non sicuro o un collegamento simbolico impediscono la verifica. I file mancanti non equivalgono a svuotare i log riusciti. I controlli SHA/run/attempt esistenti rimangono indipendenti: i byte corrispondenti non possono salvare una ricevuta scaduta. L'integrità del file non è una prova dell'autenticità dell'esecuzione o della promozione degli artefatti.

### Inventario di scansione statico

L'inventario con versione npm-alias e l'appartenenza alla scansione statica risiedono in `config/quality/gate-manifest.json`. Esegui `npm run check:gate-manifest` per convalidare i nomi degli script e i comandi esatti rispetto `package.json`; aggiunte, rimozioni e deriva dei comandi falliscono sia l'hook locale che i lavori di classificazione delle modifiche in CI. Un alias non è un lavoro del flusso di lavoro, un'istanza di matrice o un caso di test: questi conteggi non devono essere presentati come intercambiabili.

Utilizza `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list` per ispezionare gli alias selezionati senza eseguirli. Il runner richiama il punto di ingresso npm, quindi il suo runtime (incluso Bun dove configurato) viene preservato. Il manifest registra gli alias esterni a tali profili come richiamati separatamente e i comandi di manutenzione sono vietati nei profili di scansione di sola lettura.

Questi profili coprono solo la scansione statica. Non certificano test del prodotto, copertura, imballaggio, controlli esterni o la completa accettazione del rilascio da parte del candidato. L'ammissione al flusso di lavoro utilizza `config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs` collegati. I profili dell'osservatore del rilascio rimangono separati; ispezionare in modo indipendente gli assegni e le ricevute applicabili. I comandi statici completi dell'osservatore sono dichiarati in `config/quality/release-green-static-profile.json`, inclusi `audit:deps`, la selezione del test di mutazione e i controlli di traduzione. Il caricatore convalida i comandi npm rispetto alle dichiarazioni package.json e CI/Quality modellate; rifiuta la deriva invece di eseguire i token della shell come argomenti. L'output SKIP/INCOMPLETE dello scanner richiesto non può stabilire PASS. Il profilo registra le sue esclusioni esterne e non sostituisce la copertura ospitata, le matrici di test, i pacchetti o le prove di distribuzione. L'inventario in prosa riportato di seguito è un riferimento, non una prova che un cancello funzionasse effettivamente.

Gli script vivono sotto `scripts/check/` (policy gates) e `scripts/quality/` (ratchet engine). La fonte della verità CI è `.github/workflows/ci.yml`.

### Rilascia PR percorso rapido (`quality.yml`)

`.github/workflows/quality.yml` integra CI su main/release PRs, invia a `main`, invia e unisci gruppi. PRs utilizza controlli rapidi filtrati dal percorso. La build duplicata disabilitata permanentemente è stata rimossa; i veri controlli build/package/boot rimangono in CI. L'unità suite e vitest vengono eseguite solo in CI (`Unit Tests (N/8)` e `Vitest`).

| Lavoro                                           | Ambito                                                                                                                        | Blocco                    |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs e docs-all                                                                                       | SÌ                        |
| `Fast Quality Gates`                             | Codice PRs; controlli statici, typecheck, dashboard typecheck, unit test impattati, test di pari livello dimenticati (avviso) |
| `No new ESLint warnings`                         | Codice PRs; protezione anti-pelucchi sensibile alla soppressione                                                              | Sì, comprese le forchette |
| `Merge integrity (changelog + generated skills)` | PRs non progetto; registro delle modifiche e sincronizzazione delle abilità generate                                          | Sì, comprese le forchette |

#### Rapporto sui test sui fratelli dimenticati

`npm run check:forgotten-sibling-tests` viene eseguito come passaggio consultivo di `Fast Quality Gates` e riutilizza il risolutore di importazione dietro la mappa di impatto del test. Per ogni modulo di produzione modificato, riporta catene `changed module/symbol -> static consumer -> candidate sibling test` deterministiche quando il test candidato è assente dal diff pull-request. Il riepilogo Markdown e il risultato JSON vengono conservati come artefatto del flusso di lavoro `forgotten-sibling-tests` per la calibrazione prima di qualsiasi implementazione di blocco.

Le riesportazioni dei barili e le importazioni dinamiche sono solo strumenti diagnostici di risoluzione; non creano mai un risultato bloccante. Le eccezioni riviste vivono in `config/quality/forgotten-sibling-allowlist.json`. Ogni voce deve nominare il test del consumatore e del candidato, fornire una motivazione specifica e collegare un problema GitHub o una richiesta pull. Le voci non valide vengono chiuse con esito negativo. Le eccezioni non possono sopprimere un test candidato cancellato o un diff che aggiunge `.skip`/`.todo`; l'indebolimento delle affermazioni e altri mascheramenti rimangono di proprietà del cancello `check:test-masking` blocca in modo indipendente.

### Lavoro: `lint`

Funziona su ogni PR fino a `main`. I blocchi si uniscono in caso di fallimento.

| Scrittura (`npm run ...`)         | Convalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blocco                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | La versione Node.js rientra nell'intervallo supportato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | SÌ                                         |
| `check:cycles`                    | Importazioni circolari su tutto `src/` + `open-sse/` (basato su AST, tsconfig `paths` risolto). Bare esce 1 ogni volta che esiste un ciclo (chiuso in caso di errore da #15281) ed elenca SCCs. `check:cycles:ratchet` (cosa esegue CI ) si blocca quando il conteggio supera il limite `metrics.cycles` in `quality-baseline.json` — attualmente 14, `direction: down`, quindi può solo cadere (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì (cricchetto)                            |
| `check:boundary`                  | Accoppiamento `open-sse → src` : importazioni univoche da file a file dal motore all'app (`scripts/quality/measure-boundary.mjs`; l'elenco dei bordi è il backlog di riparazione core/module-split v4). Rapporto consultivo = nudo (uguale a `quality:boundary`). `check:boundary:ratchet` (ciò che CI esegue, anche nel ciclo a cricchetto `quality.yml` fast-gates) si blocca quando il conteggio supera il limite `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` — seminato al valore misurato 771, `direction: down`; `--update` lo abbassa solo; relativo di base su PRs (`--base-ref`, vedere sotto)                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sì (cricchetto)                            |
| `check:route-validation:t06`      | Schemi Zod presenti su tutte le rotte (policy Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | SÌ                                         |
| `check:any-budget:t11`            | il conteggio `@ts-expect-error // any` non supera il budget (Catraca livello 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | SÌ                                         |
| `check:provider-consistency`      | Ogni provider in `providers.ts` ha una voce corrispondente in `providerRegistry.ts` (e viceversa, all'interno della lista consentita)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | SÌ                                         |
| `check:model-lifecycle`           | Le tre tabelle di routing gestite manualmente rimangono coerenti con lo snapshot del ciclo di vita archiviato (#11503): `FITNESS_TABLE` (`taskFitness.ts`) non assegna alcun ID ritirato che `REGISTRY` possa instradare; ogni destinazione `BUILT_IN_ALIASES` è presente in `REGISTRY` e assente nello snapshot id ritirato; ogni ID in pensione ancora in `REGISTRY` viene inoltrato o elencato in `allowedRetiredInCatalog`; e nessuna origine o destinazione `DEFAULT_DEGRADATION_MAP` appare ritirata in quell'istantanea. Ciò non prova che un modello sia attualmente servito da un upstream attivo. — offline viene confrontato con `config/quality/model-lifecycle.json`, aggiornato manualmente con `npm run quality:refresh-model-lifecycle` (rete; non collegato a CI). `allowedRetiredInCatalog` è un meccanismo burn-down: aggiungi una voce solo con un problema di tracciamento.                                                                                                                                                                            | SÌ                                         |
| `check:fetch-targets`             | Ogni `fetch("/api/...")` in `src/` lato client si risolve in un vero `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | SÌ                                         |
| `check:deps`                      | Tutti i punti `npm install` -able in ogni `package.json` nel repository sono in `dependency-allowlist.json`; nuovi pacchetti sbloccati o slopsquat contrassegnati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | SÌ                                         |
| `audit:deps`                      | verifica npm di tutti e cinque i lockfile indipendenti (plugin root, Electron, OpenCode v1/v2 e provider). Blocco avvisi critici; gli avvisi elevati rimangono avvertimenti visibili. Gli audit Missing/failed sono INCOMPLETE e block; gli hash di blocco e i report per ambito vengono conservati.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | SÌ                                         |
| `check:lockfile`                  | Integrità `package-lock.json` Registro https —, hash di integrità, nessuna sostituzione dell'host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | SÌ                                         |
| `check:licenses`                  | Lista consentita della licenza SPDX per le dipendenze di produzione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | SÌ                                         |
| `check:tracked-artifacts`         | Nessun artefatto di build/link simbolici `node_modules` impegnati (funziona anche in husky pre-commit; pre-push è intenzionalmente leggero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | SÌ                                         |
| `check:ai-attribution`            | Nessun trailer AI/bot `Co-Authored-By` o footer di generazione AI nei commit PR, nel titolo o nel corpo — Hard Rule #16 (nel ciclo `quality.yml` fast-gates per PR→ `release/**` — legge il payload dell'evento, no-op off PRs — e un passaggio solo PR in `ci.yml` lint per PR→ `main`; anche l'husky `commit-msg` hook; coautori umani ammessi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Ogni esclusione Vitest indica un problema di tracciamento e viene visualizzata in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | SÌ                                         |
| `check:file-size`                 | I file sorgente (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) rimangono all'interno di `cap` mentre i file di test (`*.test.ts(x)`) all'interno di `testCap`; i file congelati in `file-size-baseline.json` (`frozen` / `testFrozen`) non devono superare la dimensione registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | SÌ                                         |
| `check:error-helper`              | Le risposte agli errori in executors/handlers utilizzano `buildErrorBody()` / `sanitizeErrorMessage()` (regola dura #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | SÌ                                         |
| `check:migration-numbering`       | I file Migration SQL sono numerati in sequenza, senza spazi vuoti o duplicati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | SÌ                                         |
| `check:public-creds`              | Nessuna chiave OAuth `client_id`/`client_secret` letterale o Web Firebase esterna `publicCreds.ts` (regola dura #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | SÌ                                         |
| `check:db-rules`                  | Nessun SQL grezzo al di fuori dei moduli `src/lib/db/` ; nessuna importazione di barili da `localDb.ts` (regole dure #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | SÌ                                         |
| `check:known-symbols`             | Gli esecutori del provider, le strategie di routing e i traduttori registrati nelle loro tabelle di invio corrispondono ai file sul disco — senza simboli orfani o non dichiarati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | SÌ                                         |
| `check:route-guard-membership`    | Ogni percorso che genera un processo figlio è classificato da `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | SÌ                                         |
| `check:test-discovery`            | Ogni file `*.test.ts` / `*.spec.ts` nel repository viene raccolto da almeno un test runner (il cricchetto: l'elenco orfano in `test-discovery-baseline.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | SÌ                                         |
| `check:test-tla-order`            | Nessun file `node:test` sotto `tests/unit` registra un test, raggiunge uno `await` di livello superiore, quindi ne registra altri (#18045; cricchetto: `test-tla-order-allowlist.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | SÌ                                         |
| `check:agent-skills-sync`         | Gli artefatti generati dalle abilità dell'agente corrispondono al catalogo di origine (nessuna deriva)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Il fornitore logos/assets riporta una voce di provenienza registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | I file di configurazione JSON analizzano e soddisfano le regole lint del repository                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | Compilazione TypeScript senza errori (solo avvisi informativi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | SÌ                                         |
| `typecheck:noimplicit:core`       | Rigoroso `noImplicitAny` — lungimirante; molti siti di chiamata preesistenti necessitano ancora di annotazioni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ha come ambito `src/app/(dashboard)/**` (#7033) — La lista consentita di 27 file curata di `typecheck:core` non include alcun dashboard TSX e `next build` non lo controlla mai nemmeno (`next.config.mjs` imposta `ignoreBuildErrors: true`), quindi le regressioni degli identificatori orfani lì (#6625/#6909) erano invisibili a CI. Differenze rispetto a una linea di base di conteggio per-file/per-TS-code congelata (`config/quality/dashboard-typecheck-baseline.json`, stesso modello di applicazione obsoleto di `check:known-symbols`) solo — errori NEW oltre il conteggio di base non superano il gate; abbassalo con `--update` quando viene corretto un errore preesistente.                                                                                                                                                                                                                                                                                                                                                                         | SÌ                                         |
| `check:build-typecheck`           | Il controllo del tipo di produzione dell'intera app su `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), la lista consentita di 27 file di `typecheck:core` della superficie e il gate del dashboard non coprono. Differenze contro `config/quality/build-typecheck-baseline.json`; un conteggio nuovo o aumentato per (file, codice) fallisce, un conteggio inferiore richiede di aumentare. `--update` rifiuta mentre l'esecuzione contiene una coppia nuova o sollevata a meno che non venga passato `--force-regressions` e rifiuta un file appena silenziato a meno che non venga passato `--force-nocheck`, quindi ampliare la linea di base per diventare verde e garantire un silenzio permanente sono due atti deliberati separati. Un semplice `--force` viene rifiutato. Esegue inoltre la scansione dell'ambito di compilazione per `@ts-nocheck` rispetto a `config/quality/ts-nocheck-baseline.json`, poiché un file che lo utilizza non riporta alcuna diagnostica e altrimenti sarebbe invisibile a ogni gate. | SÌ                                         |

#### Due programmi di controllo della battitura rispondono in modo diverso

`typecheck:core` e `check:build-typecheck` compilano programmi diversi con opzioni diverse e lo stesso file può essere pulito in uno e pieno di errori nell'altro.

`tsconfig.build.json` imposta `"strict": false`, quindi `noImplicitAny` è disattivato. La configurazione principale compila una lista consentita di 27 file curata con opzioni più rigorose e segue il grafico di importazione di ciascuna voce, in modo che i file che non compaiono mai nel programma di compilazione vengano comunque controllati lì.

La conseguenza è importante quando si giudica se un file è stato digitato:** zero diagnostica sotto `check:build-typecheck` non significa zero** . L'estrazione di `@ts-nocheck` da 26 file ne ha mostrati 23 puliti nel programma di compilazione; sedici di questi sono emersi: circa 120 errori impliciti in quello rigoroso. Controllali entrambi prima di chiamare un file pulito.

### Lavoro: `quality-gate`

Corre dietro `test-coverage`. I blocchi si uniscono in caso di fallimento.

| Copione                      | Convalida                                                                                                                                                                                             | Blocco                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Emette `quality-metrics.json` (conteggio avvisi ESLint, copertura dal report shard unito)                                                                                                             | Sì (a monte del cricchetto) |
| `quality:ratchet`            | Ogni metrica in `quality-baseline.json` non è regredita (avvisi ESLint ≤ baseline; copertura ≥ baseline)                                                                                              | SÌ                          |
| `check:duplication`          | La duplicazione del codice (jscpd@4) non supera la linea di base in `quality-baseline.json`                                                                                                           | SÌ                          |
| `check:complexity`           | La complessità ciclomatica a livello di file non supera il limite massimo (core ESLint `complexity` + `max-lines-per-function`)                                                                       | SÌ                          |
| `check:cognitive-complexity` | Cricchetto della complessità cognitiva (`eslint-plugin-sonarjs`) — passaggio ESLint separato; CI viene eseguito entrambi uniti come unico passaggio `check:complexity-ratchets`                       | SÌ                          |
| `check:dead-code`            | Il bloccaggio (knip) delle esportazioni/file inutilizzati non regredisce rispetto al valore di base                                                                                                   | SÌ                          |
| `check:compression-budget`   | I piani di risparmio dei token — del budget del benchmark di compressione per motore non devono regredire                                                                                             | SÌ                          |
| `check:type-coverage`        | Il cricchetto digitato in percentuale (`type-coverage`) non regredisce; sussume in gran parte `typecheck:noimplicit:core`                                                                             | SÌ                          |
| `check:codeql-ratchet`       | Il conteggio degli avvisi CodeQL aperti non regredisce (legge tramite `gh api`; salta con grazia senza token) cadenza di aggiornamento — e attivazione manuale: vedere "CodeQL cricchetto" di seguito | SÌ                          |

### Lavoro: `quality-extended`

L'intero lavoro è consultivo (`continue-on-error: true`). I cricchetti basati su npm funzionano davvero; gli scanner esterni si installano tramite `gh release download` e si auto-saltano (uscita 0) quando un binario è ancora assente.

| Copione                  | Convalida                                                                                                                                                                                                                                          | Blocco                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Nessuna dipendenza circolare (DPDM)                                                                                                                                                                                                                | **Consultivo**                                             |
| `check:bundle-size`      | La dimensione del pacchetto non supera il limite massimo                                                                                                                                                                                           | **Consultivo**                                             |
| `check:secrets`          | Scansione segreta (gileaks) — salta se il binario è assente                                                                                                                                                                                        | **Consultivo**                                             |
| `check:vuln-ratchet`     | Le vulnerabilità delle dipendenze (osv-scanner) non regrediscono — `--ratchet` fallisce come INCOMPLETE (uscita 2) se non misurato                                                                                                                 | **Consultivo**                                             |
| `check:workflows`        | Lint del flusso di lavoro (actionlint + zizmor); Gli scanner missing/broken, i report non validi o la linea di base del cricchetto mancante falliscono come INCOMPLETE. I risultati validi seguono la politica strict/advisory/ratchet selezionata | Esecuzione richiesta; bloccaggio a cricchetto zizmor in CI |
| `check:openapi-breaking` | Contratto pubblico API contro commit di eventi bloccati (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); la misurazione richiesta non viene chiusa                                                          | **Blocco con --ratchet**                                   |

### Lavoro: `docs-sync-strict`

Funziona su ogni PR fino a `main`. I blocchi si uniscono in caso di fallimento.

| Copione                        | Convalida                                                                                                                                                                          | Blocco                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Meta-gate che esegue in sequenza le 6 sotto-gate sottostanti                                                                                                                       | SÌ                            |
| ↳ `check:docs-sync`            | Consistenza della versione CHANGELOG / OpenAPI / llm.txt                                                                                                                           | SÌ                            |
| ↳ `check:docs-counts`          | I conteggi in prosa (conteggio dei fornitori, conteggio delle migrazioni, ecc.) rientrano nella finestra di arresto dei conteggi reali                                             | SÌ                            |
| ↳ `check:env-doc-sync`         | Ogni env var in `.env.example` è documentata in una tabella di documenti e viceversa                                                                                               | SÌ                            |
| ↳ `check:deprecated-versions`  | Nessuna stringa di versione deprecata nei documenti                                                                                                                                | SÌ                            |
| ↳ `check:doc-links`            | I collegamenti di markdown interni nei documenti si risolvono in file reali (modulo `[text]`/`(path)` )                                                                            | SÌ                            |
| ↳ `check:fabricated-docs`      | Nella codebase sono presenti percorsi, variabili env, comandi CLI, nomi di hook e percorsi di file citati nei documenti. Cancello rigido tramite `--strict`; soft-fail senza flag. | Sì (tramite `--strict` in CI) |
| `check:cli-i18n`               | Le stringhe di comando CLI sono presenti in tutti i file locali i18n                                                                                                               | SÌ                            |
| `check:openapi-coverage`       | Le specifiche OpenAPI coprono almeno un piano rialzato di percorsi reali                                                                                                           | SÌ                            |
| `check:openapi-security-tiers` | Le annotazioni del livello di sicurezza in `openapi.yaml` sono coerenti con le classificazioni `routeGuard.ts`                                                                     | **Consultivo**                |
| `check:openapi-routes`         | Ogni percorso in `openapi.yaml` si risolve in un vero e proprio `route.ts` (anti-allucinazione)                                                                                    | SÌ                            |
| `check:docs-symbols`           | Ogni riferimento `/api/...` in `docs/**/*.md` si risolve in un vero `route.ts` (anti-allucinazione)                                                                                | SÌ                            |
| `i18n translation drift`       | Chiavi non tradotte nei file locali i18n — avvisano solo                                                                                                                           | **Consultivo**                |

Vengono generati i dodici README SVGs sotto `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` li rigenera tutti). Ciascuno ha uno unit test di confronto byte (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) che fallisce quando il file sottoposto a commit è obsoleto e `check:docs-counts` legge i numeri canonici dai rispettivi nodi `<text>` — motivo per cui il passaggio di struttura mantiene ogni stringa delineata nel file come invisibile `<text>`. Il controllo SVG canonical-numbers legge i file elencati in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, più `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; le affermazioni free-forever, catalog-entry, recurring-pool e scoring-factors leggono anche `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` trae le sue cifre dal caricatore del catalogo live, quindi una modifica a `FREE_MODEL_BUDGETS` o al nome visualizzato di un provider diventa CI finché il file non viene rigenerato.

### Lavoro: `i18n-ui-coverage`

| Copione                             | Convalida                                                                                                                                                                                                              | Blocco         |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (in linea) | La copertura dei tasti UI i18n è ≥ 65%                                                                                                                                                                                 | SÌ             |
| `check-ui-value-drift` (in linea)   | Un inglese riscritto** valore** non lascia alcuna traduzione stantia                                                                                                                                                   | SÌ             |
| `check-new-key-coverage` (in linea) | UN** nuovo** La chiave inglese viene tradotta in ogni locale — un indicatore `__MISSING__:` viene rifiutato                                                                                                            | SÌ             |
| `check-translation-ratio`           | Il rapporto di traduzione reale per impostazione locale (identico all'inglese/segnaposto/foglie mancanti all'esterno della lista consentita) non deve superare `config/quality/i18n-translation-baseline.json` + slack | **Consultivo** |

Ha bisogno `fetch-depth: 0` — il cancello della deriva del valore differisce `en.json` rispetto alla base di fusione.

#### `check-ui-value-drift` — gate di traduzione obsoleta

Cattura l'unica regressione i18n che le altre porte strutturalmente non possono vedere: un valore inglese viene riscritto e le traduzioni derivate dall'inglese _previous_ rimangono indietro, quindi gli utenti non inglesi continuano a leggere una copia con parole sicure, ora sbagliata.

Questo è stato spedito per davvero. `oauthModal.googleOAuthWarning` è stato riscritto quando è arrivato l'helper di accesso Antigravity (#5203);** 39 di 43 locali** mantenuto il testo che dice agli operatori di "copiare l'intero URL e incollarlo di seguito" — un flusso che non può essere completato per quel provider. È passato inosservato fino a #8463 perché:

- `sync-ui-keys` riempie solo le chiavi che lo sono** assente** , mai quelli che lo sono** stantio** ;
- `check-ui-keys-coverage` conta la chiave _presenza_, quindi una traduzione obsoleta viene considerata coperta;
- `check-translation-drift` tiene traccia dei mirror della documentazione `docs/i18n/<locale>/**.md` — non legge mai `src/i18n/messages/*.json`. Blocco del lavoro `docs-sync-strict` dalla risincronizzazione del 2026-09: modifica un documento principale → `npm run i18n:run -- --files=<doc>` (a livello di sezione, economico).

**Consapevole delle differenze, non supportato dalla linea di base.** Confronta `en.json` alla base di fusione con l'albero di lavoro; per ogni chiave il cui valore inglese è cambiato, qualsiasi locale che conserva ancora una traduzione intatta diventa obsoleto. Questo deliberatamente** congela il debito preesistente** — a diff non può rivelare da quale inglese antico provenga una traduzione di vecchia data, quindi il cancello giudica solo ciò che tocca il cambiamento attuale. L'alternativa (una linea di base hash per chiave) costerebbe un file generato ~ 600 KB, 3 × la linea di base esistente più grande, che si agita su ogni i18n PR.

Due modi per soddisfarlo:

1. aggiornare le traduzioni interessate, o
2. impostarli su `__MISSING__:<new english>` — il runtime quindi fornisce l'inglese corretto (`src/i18n/request.ts::deepMergeFallback`, #7258) e le code chiave per la traduzione.

Se la stringa è** Senso** cambiato, preferisco** rinominare la chiave** : una nuova chiave non può ereditare una traduzione obsoleta. Questo è il modello utilizzato #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Esce da 0 con `SKIP reason=base-unresolved` quando il catalogo di base non può essere letto (clone poco profondo senza il riferimento di base), rispecchiando `check-openapi-breaking`.

### Lavoro: `i18n`

Matrice di convalida i18n completa (un lavoro per locale). L'intero lavoro è di consulenza.

| Copione                         | Convalida                               | Blocco                                                        |
| ------------------------------- | --------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Completezza della traduzione per lingua | **Consultivo** (`continue-on-error: true` sull'intero lavoro) |

### Lavoro: `pr-test-policy`

Viene eseguito solo su richieste pull.

| Copione                | Convalida                                                                                                                                 | Blocco |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | PRs che modifica il codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/` deve includere o aggiornare i test (regola dura #8) | SÌ     |
| `check:test-masking`   | I file di test modificati non riducono il conteggio delle asserzioni nette né aggiungono tautologie `assert.ok(true)`                     | SÌ     |
| `check:pr-evidence`    | Il corpo PR cita le prove test/VPS del cambiamento (meccanizza Hard Rule #18 grepping PR prosa — fragile, vedere Backlog)                 | SÌ     |

### Lavoro: `test-vitest`

Corre dietro `build`. I blocchi si uniscono in caso di fallimento.

| Suite            | Convalida                                                    | Blocco                                                                                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | server MCP (110 strumenti), autoCombo, cache — vitest runner | SÌ                                                                                                                             |
| `test:vitest:ui` | test dei componenti UI — vitest runner                       | **Blocco** — gli errori preesistenti sono esplicitamente esclusi in `vitest.config.ts`; nuovi fallimenti falliscono nel lavoro |

### Flussi di lavoro notturni (programmati, avvisi)

Questi vengono eseguiti secondo una pianificazione cron (e `workflow_dispatch`), mai su PRs. Sono tutti consultivi.

| Flusso di lavoro       | Convalida                                                                                                                                                                         | Blocco         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | test di proprietà a controllo rapido con un numero di corse elevato di seed casuale +                                                                                             | **Consultivo** |
| `nightly-resilience`   | cancello di crescita dell'heap, iniezione di guasti al caos, k6 load/soak                                                                                                         | **Consultivo** |
| `nightly-llm-security` | promptfoo injection guard (modalità blocco) + garak sonde (saltato senza segreto del provider)                                                                                    | **Consultivo** |
| `nightly-schemathesis` | OpenAPI fuzzing del contratto (schematesi) contro uno OmniRoute live utilizzando `docs/openapi.yaml` violazioni delle specifiche delle superfici — / 500 non gestiti (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Il punteggio del test di mutazione Stryker sulla corsia veloce dell'unità — mutanti sopravvissuti emergono affermazioni deboli                                                    | **Consultivo** |
| `nightly-compat`       | Matrice di compatibilità del motore dei nodi tra le gamme `engines.node` supportate                                                                                               | **Consultivo** |

Le linee di base delle prestazioni (heap, TTFB, tempo di compilazione) vengono registrate, non delimitate: vedere [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fase di velocità (2026-08-30 → v4.0 LTS): ogni linea di base allentata del 20%

Decisione del proprietario (30-08-2026): fino alla modularizzazione della versione v4.0, la velocità di spedizione conta più del mantenimento della linea di debito. Ogni** numerico** La linea di base del cricchetto è stata allentata del 20% in un passaggio verificabile e la fase è dichiarata in `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Cosa è cambiato                                                                                                                                                                                                            | Dove                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — conteggi “più basso è meglio” × 1,2, percentuali più alto è meglio ÷ 1,2 (copertura minima 60 mantenuta, `eslintErrors` rimane 0, `eslintWarnings` 0 → 20% del conteggio della soppressione congelata) | `quality-baseline.json` (`_relax_velocity_2026_08_30` elenca le note ogni prima → dopo)                |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ogni limite di riga `frozen[*]` / `testFrozen[*]` × 1.2                                                                                                                                                  | `file-size-baseline.json`                                                                              |
| conta per file/per codice TS × 1.2                                                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` diventa consultivo mentre `_policy.requireTighten === false`                                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| `bank-ratchet-shrinks` notturno fa una pausa (incasserebbe la riduzione misurata e annullerebbe l'headroom)                                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

Le liste consentite (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, ...) lo sono** non** budget e non sono stati toccati. I cancelli della politica Pass/fail (segreti, regole SQL, contratto docs/env, parità i18n, test unitari) sono invariati — un test rosso è ancora un test rosso.

**Utensileria**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — il rilassamento one-shot (`scripts/quality/relax-baselines.mjs`); si rifiuta di eseguire due volte con la stessa nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — misura ogni porta numerica come fa CI e stampa l'headroom rimanente per porta (`scripts/quality/baseline-headroom.mjs`). Il lavoro `baseline-headroom` notturno pubblica la tabella nel riepilogo dell'esecuzione del flusso di lavoro e carica il report JSON/Markdown come `baseline-headroom-<run_id>`, conservato per 90 giorni. Le righe di avviso e critiche identificano i cancelli entro il 10% del loro limite o già oltre esso. Esaminare questi rapporti come allarme preventivo per i budget consumati; ispezionare le note `_rebaseline_*` del cancello incriminato. Il lavoro non crea o aggiorna più un problema permanente; #12149 conserva la cronologia del report precedente.

**Modalità nuovo codice (Clean-as-You-Code) — dal 30-08-2026, solo percorso rapido PR**

`pull_request` eventi `quality.yml` passa `--base-ref <PR base SHA>` a `check:file-size`, `check:complexity-ratchets` e `check:dead-code`. Per `check:complexity-ratchets` e `check:dead-code` il gate confronta HEAD con la base di unione** limitato ai file toccati da PR** (`scripts/check/newCodeMode.mjs`: la base di unione è materializzata in uno `git worktree` usa e getta, ESLint/knip viene eseguito lì e su HEAD, i conteggi per file sono differenziati):

- **blocco** — PR ha aggiunto violazioni cyclomatic/cognitive o esportazioni inattive nei file modificati (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` nel registro);
- **consultivo** — il totale globale rispetto al riferimento congelato. La deriva ereditata non diventa mai un innocente PR; la deriva viene nuovamente congelata durante la riconciliazione del rilascio e monitorata dal lavoro sull'headroom.

`check:file-size` utilizza il riferimento di base alle sue condizioni (`scripts/check/check-file-size.mjs`, #8522): controlla ogni sorgente e file di test nell'albero, legge il conteggio delle righe di ciascuno sulla base PR con `git show` e fallisce un file solo quando supera il limite massimo della linea di base (`frozen` / `testFrozen` o `cap` / `testCap` per un file esterno alla linea di base) e la dimensione di base. Un file che è già alla deriva sulla base quindi non riporta mai un innocente PR.

`check:boundary:ratchet` applica la stessa regola al suo singolo numero (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): negli eventi PR sia i gate veloci `quality.yml` che il job lint `ci.yml` passano la base PR SHA, il commit di base viene misurato da un'esportazione `git archive` e PR fallisce solo quando il conteggio dei bordi `open-sse → src` supera il maggiore tra `metrics.boundaryOpenSseToSrc` e il conteggio sulla base. Viene segnalata una deriva della base sopra il soffitto (`base drift herdado`) ma non raggiunge mai un innocente PR; push → main mantiene il tetto assoluto e una base irrisolvibile SHA vi ritorna con un avvertimento.

`workflow_dispatch`, lo sweep release-green e il lavoro headroom notturno non hanno base PR e mantengono il confronto assoluto (globale). La copertura, la duplicazione e la copertura del tipo rimangono globali per ora (i loro strumenti non producono una differenza per file a buon mercato) candidati — per lo stesso trattamento.

**Chiusura della fase alla v4.0 (LTS = più stretto di prima, non "ritorno alla normalità")**

1. Sul puro suggerimento `release/v4.0.0` : `npm run quality:headroom --json` per la cronaca, quindi `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update`, `--update` — di ogni porta di controllo del tipo scende al valore misurato.
2. Elimina `_policy` da `quality-baseline.json` (riarmi `--require-tighten` e il banking notturno), ripristina `THRESHOLD = 36` (o superiore) in `check-openapi-coverage.mjs`.
3. Rafforzare oltre misurato dove la modularizzazione ha dato i suoi frutti: dimensione del file `cap` tornata a 1000 (o 800), piani di copertura + 5, esportazioni inattive 0 per i pacchetti modularizzati.

## Baseline del ratchet (`quality-baseline.json`)

Il motore del ratchet (`scripts/quality/check-quality-ratchet.mjs`) legge `quality-baseline.json`
e lo confronta con il file `quality-metrics.json` appena generato. Qualsiasi metrica che regredisca
oltre il relativo epsilon causa il fallimento della build.

Metriche attualmente monitorate:

| Metrica               | Direzione | Significato                                      |
| --------------------- | --------- | ------------------------------------------------ |
| `eslintWarnings`      | `down`    | Il numero di avvisi ESLint non deve aumentare    |
| `coverage.statements` | `up`      | La copertura delle istruzioni non deve diminuire |
| `coverage.lines`      | `up`      | La copertura delle righe non deve diminuire      |
| `coverage.functions`  | `up`      | La copertura delle funzioni non deve diminuire   |
| `coverage.branches`   | `up`      | La copertura dei rami non deve diminuire         |

Per aggiornare la baseline dopo un miglioramento effettivo:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Il flag `--update` scrive i valori misurati correnti in `quality-baseline.json`.
Eseguire il commit di questo file insieme alla modifica che ha migliorato la metrica. Una PR che migliora una
metrica senza aggiornare la baseline verrà rilevata da `--require-tighten` (Fase 6A.5,
implementazione in sospeso).

### Ratchet CodeQL: frequenza di aggiornamento e attivazione manuale

`check:codeql-ratchet` legge **lo stato del repository, aggiornato secondo una pianificazione — non per ogni PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` restituisce
`state: configured`, `schedule: weekly`: si tratta della scansione con configurazione predefinita di GitHub, non di un'analisi
a ogni push. Conseguenza: dopo il merge di una PR che CORREGGE degli avvisi, il ratchet continua a leggere
il precedente conteggio più elevato finché non viene eseguita la successiva scansione pianificata — pertanto segnala una regressione
su ogni PR aperta, incluse le PR successive a quella correttiva, finché la scansione non si aggiorna.

**Aggiornamento manuale**: `gh workflow run codeql.yml --ref release/vX.Y.Z` esegue nuovamente
l'analisi e ripubblica gli avvisi entro pochi minuti. Leggere prima `.github/workflows/codeql.yml`
— la sua intestazione spiega che è riservato a `workflow_dispatch` **perché è in conflitto con
la "configurazione predefinita" di GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Il ripristino dei trigger `push`/`pull_request`/
`schedule` richiede prima un'**azione del proprietario**: Settings → Code security →
CodeQL: Default → Advanced. Non aggiungere un trigger `schedule:` senza aver effettuato tale passaggio — produrrebbe
soltanto esecuzioni non riuscite.

**Restringere la baseline dopo la diminuzione del conteggio** — `node scripts/check/check-codeql-ratchet.mjs
--update` scrive il nuovo conteggio misurato in `quality-baseline.json` →
`metrics.codeqlAlerts.value`, in modo che il ratchet non consenta silenziosamente una regressione fino
al precedente limite massimo. Esempio pratico (2026-09-02/03): la PR #12502 ha corretto 7 avvisi reali
(da 13 a 6 aperti misurati); la PR #12530 ha ristretto la baseline bloccata da 11 a 6 per allinearla; i
6 rimanenti sono stati quindi ignorati, indicando una giustificazione per ciascun avviso, fino ad arrivare a 0 aperti.

**Le esclusioni sono una decisione dell'operatore (Regola rigida #14)** — non ignorare mai un avviso CodeQL
senza registrare la giustificazione tecnica nel commento di esclusione: `won't fix` per
un requisito di un protocollo upstream, `used in tests` per una fixture di test, `false positive`
per un meccanismo di sanitizzazione che CodeQL non è in grado di rilevare (precedente: `docs/security/ERROR_SANITIZATION.md`).

---

## Criteri per i tentativi dei test (WS5.4, v3.8.49)

I tentativi vengono gestiti per singolo runner, mai in modo globale: applicare indiscriminatamente nuovi tentativi trasforma le regressioni reali
in flake invisibili:

| Runner           | Criterio                                                                                                                                           | Motivo                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` solo nella CI, con `trace: on-first-retry`                                                                                            | Le tempistiche di browser/rete sono realmente non deterministiche; un tentativo con una traccia trasforma un flake in un artefatto diagnosticabile |
| Vitest           | NESSUN tentativo globale. Un test notoriamente instabile riceve un tentativo esplicito per il singolo test (visibile nel diff, esaminato nella PR) | Mantiene l'elenco di quarantena nel repository, senza mai renderlo opaco                                                                           |
| node:test (unit) | NESSUN tentativo, mai                                                                                                                              | Un test unitario instabile è un bug nel test: correggilo, non limitarti a rieseguirlo                                                              |

SLO target una volta disponibile la telemetria dei flake (WS5.2/5.3): tasso di flake <1% per test
(soglia "correggere subito"), tasso di successo ≥95% per pipeline. Valori di riferimento del settore:
ricalibrare in base alle nostre misurazioni.

## Deriva dei ratchet a livello di release (WS5.5, v3.8.49)

Quando un ratchet (dimensione dei file, complessità, avvisi eslint) regredisce sul tip PURO della release,
ovvero è la COMBINAZIONE dei merge ad aver causato la regressione e nessuna singola PR la riproduce
sul proprio branch, la correzione spetta al **responsabile della release, una sola volta, sul
branch di release**: preferire l'estrazione/refactoring; ridefinire la baseline solo con la voce di
giustificazione documentata. Non scaricare mai su una PR di un collaboratore la deriva dovuta alla combinazione e non
ridefinire mai la baseline per singola PR (ciò nasconde regressioni reali). Prima, distingui i casi: riproduci
l'errore sul tip puro in un worktree di verifica prima di presumere che sia stato causato dalla tua PR.

## Registrazione delle riduzioni dei ratchet: la direzione discendente (#8584)

Il ratchet è automatico solo a metà, ed è la metà sbagliata. **Alzare** un limite è una
modifica manuale al JSON che richiede dieci secondi ed è il modo più rapido per sbloccare una PR in errore.
**Abbassarne** uno richiede che qualcuno esegua `--update` ed effettui il commit del risultato; prima
dell'introduzione del job `bank-ratchet-shrinks`, nessun workflow lo eseguiva. La conseguenza misurata
(2026-07-25): 18 file congelati già pari o inferiori al limite di 800 righe per i nuovi file, con il caso peggiore
a 132× (`src/shared/validation/schemas.ts`, 19 righe con un limite di 2.523); il
limite massimo di complessità è passato da `1794 → 2169` in circa 37 note di ridefinizione della baseline, con una sola
riduzione (−1); inoltre, "restringere tramite `--update` nel prossimo ciclo" è stato scritto 31 volte e rispettato
una sola volta. Un limite che sopravvive al codice che lo aveva giustificato trasforma silenziosamente ogni decomposizione
completata in un margine di crescita per chi modificherà il file successivamente.

`nightly-release-green.yml` → il job **`bank-ratchet-shrinks`** chiude questo ciclo:

|               |                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Esecuzione    | `schedule` (3×/giorno) + `workflow_dispatch` — deliberatamente **non** `push`                                           |
| Misurazione   | il `release/vX.Y.Z` più alto, con la stessa risoluzione e protezione dall'iniezione di `release-green`                  |
| Scrittura     | `check:file-size --update` e `check:complexity-ratchets --update` (entrambi esclusivamente riduttivi per progettazione) |
| Verifica      | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                |
| Distribuzione | un'unica PR sempre aggiornata verso il branch di release: aggiornata forzatamente, senza mai generare spam              |

La registrazione viene eseguita in batch anziché a ogni push perché non ha requisiti di latenza (una riduzione
registrata entro 8 ore è accettabile), mentre un'esecuzione a ogni merge ricostruirebbe ripetutamente il branch della PR
durante le campagne di merge e comporterebbe ogni volta il costo di una scansione ESLint completa. Il rilevamento rimane sul
push (`release-green`); solo la registrazione viene eseguita in batch.

### Il verificatore di sicurezza

Il job scrive nelle baseline senza supervisione, quindi è `verify-ratchet-bank.mjs` a rendere
accettabile questa operazione. Confronta tramite diff l'albero successivo a `--update` con `HEAD` e **interrompe il job
prima che esista qualsiasi commit**, senza aprire alcuna PR, a meno che ogni modifica non sia una delle seguenti:

- una voce numerica `frozen` / `testFrozen` **ridotta** o **rimossa**
- `complexity-baseline.json` → `count` **ridotto**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **ridotto**

Qualsiasi altra modifica causa un errore: aumentare un numero, aggiungere una voce, modificare `cap`/`testCap` oppure
eliminare/riscrivere una nota `_rebaseline_*` (queste note costituiscono la traccia di audit del motivo per cui esiste ciascun
limite e sono archiviate nello stesso oggetto `frozen` delle voci dei file).
Un bot in grado di aumentare un limite sarebbe nettamente peggiore dello stato attuale. Protezione dalle
regressioni: `tests/unit/verify-ratchet-bank.test.ts`.

Il job non esegue mai il push verso `release/*`: una persona effettua il merge della PR, quindi una misurazione errata
non può essere integrata senza revisione.

## Politica sulla lista consentita

Ogni gate che non può fallire in caso di violazioni preesistenti utilizza una lista consentita congelata (ad esempio `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La politica è:

**Correggere la causa principale; utilizzare la lista consentita solo quando la violazione è preesistente e non può essere risolta nella stessa PR.**

Quando aggiungi una voce a una lista consentita:

1. Includere un commento con la giustificazione.
2. Fai riferimento al problema di tracciamento (ad esempio, `// #3498 — Phase 2 feature, not yet implemented`).
3. Rimuovere la voce nello stesso PR che corregge la violazione — una voce obsoleta che non sopprime più una violazione attiva è essa stessa un difetto (6A.3 stale-enforcement fallirà il gate su una voce orfana della lista consentita una volta implementata).

Fare** non** aggiungi voci alla lista consentita per velocizzare il passaggio dei test. Un cancello verde con una lista consentita in crescita è un falso senso di qualità.

### Quando un cancello fallisce sulla tua PR

1. **Leggere attentamente l'uscita del gate** — ti dice esattamente quale file o simbolo ha violato la regola.
2. **Correggi la violazione** — la maggior parte delle porte sono controlli deterministici del filesystem che passano non appena il codice è corretto.
3. **Se la violazione è preesistente** (ovvero, non l'hai introdotto tu ma il cancello ora lo copre): aggiungi una voce nella lista consentita con un commento di giustificazione e un problema di tracciamento.
4. **Se il cancello è a cricchetto** (copertura, avvisi ESLint, duplicazione, complessità): la tua modifica ha peggiorato la metrica. Risolvi il problema sottostante o (raramente) esegui `npm run quality:ratchet -- --update` se la modifica è intenzionale e il degrado della metrica è accettabile — ma documenta il motivo nella descrizione PR.
5. **Cancelli consultivi** (`continue-on-error: true`) sono — informativi, non bloccano l'unione ma compaiono nel riepilogo CI. Risolvili comunque.

---

## Aggiunta di un nuovo gate

1. Creare `scripts/check/check-<name>.mjs` (oppure `.ts`). I gate dei criteri terminano con 0/1.
   I gate di tipo ratchet emettono una metrica in `quality-metrics.json` tramite `collect-metrics.mjs`.
2. Aggiungere `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json`.
3. Integrarlo in `.github/workflows/ci.yml` nel job appropriato
   (criteri → `lint` o `docs-sync-strict`; ratchet → `quality-gate`).
4. Se dispone di una allowlist, applicare `reportStaleEntries()` da
   `scripts/check/lib/allowlist.mjs` affinché le voci obsolete vengano rilevate automaticamente.
5. Scrivere un test in `tests/unit/build/` che copra la logica di rilevamento del gate.
6. Aggiornare questo documento (aggiungere una riga alla tabella del job pertinente).

---

## Strumenti per gli agenti: LSP-in-the-loop (facoltativo)

Oltre ai gate della CI, OmniRoute include uno scaffold `agent-lsp` **facoltativo**
(un `.mcp.json` a livello di progetto, Fase 7 Attività 15). Creare `.mcp.json`
per esporre un server del linguaggio TypeScript agli agenti di programmazione, affinché risolvano simboli /
diagnostica **prima** di scrivere codice: un complemento a `typecheck:core` basato sulla compilazione prima delle asserzioni,
che elimina alla fonte gli errori relativi a "simboli inventati". Intenzionalmente
non viene caricato automaticamente (occorre scegliere e verificare il bridge MCP↔LSP); una voce non valida registra soltanto un
errore di connessione e non interrompe mai le sessioni.

---

## Razionalizzazione del portafoglio ordini (ROI revisione — Fase 9 Onda 3)

Questo inventario è stato riconciliato con `ci.yml` il 17-06-2026 (la versione precedente ometteva `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). Una revisione ROI dell'insieme riconciliato ha identificato i seguenti candidati alla razionalizzazione.** Le fusioni sono modifiche CI meccaniche; le flips/drops sono decisioni politiche riservate all'operatore.** Non è stato ancora applicato nulla di seguito.

**Anche sopra non documentato** (avviso, segnale basso): il lavoro `docs-lint` (markdownlint + Vale, intero lavoro `continue-on-error`) e i flussi di lavoro dello scanner autonomo `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` è in `quality-baseline.json` ma non è collegato a un cricchetto di blocco in `ci.yml` — la metrica è attualmente orfana.

### Unione/dedup (meccanico, rischio inferiore)

Ogni candidato è stato convalidato rispetto allo stato del gate attivo il 17-06-2026 (fiducia-ma-verifica); si è scoperto che diverse fusioni "ovvie" nascondevano il debito e lo sono** non** drop-in puliti.

- **`check:docs-sync` viene eseguito due volte** — autonomo nel lavoro `lint` e di nuovo all'interno `check:docs-all` (`docs-sync-strict`) e dell'husky pre-commit hook. ✅**DONE** — invocazione `lint` autonoma rimossa.
- **scansione CVE** — ❌**NOT una fusione pulita.** `audit:deps` blocca gli avvisi critici e gli audit incompleti su tutti e cinque i file di blocco, segnalando al contempo avvisi elevati come avvisi in base alla politica attuale; `check:vuln-ratchet` (osv) fallisce solo su una _regressione_ rispetto alla linea di base archiviata e rifiuta le misurazioni mancanti quando richiesto. Una semantica diversa — eliminando `audit:deps` perderebbe il cancello critico assoluto e le ricevute di audit indipendenti del pacchetto. Tienili entrambi.
- **Rilevamento del ciclo** — ✅**DONE** (#15159 G-01/G-02). Il vecchio testo qui chiamava `check:cycles` "il cancello verde, curato" e giustificava il suo blocco perché `check:circular-deps` (dpdm) riportava 91 cicli. Quel verde era un** falso verde** : `check:cycles` ha scansionato 5 sottodirectory (450 file), ha abbinato solo `import|export … from` statico e ha eliminato ogni specificatore `@/` e `@omniroute/open-sse/`, quindi non ha potuto vedere i cicli di alias + di importazione dinamica che dominavano il repository. Risolto: il gate ora percorre `src` + `open-sse` (5023 file), raccoglie gli specificatori da TypeScript AST (quindi `import("…")` conta e type-position `typeof import("…")` no) e risolve tsconfig `paths`. Trova** 14** cicli, non 0. Poiché 14 cicli preesistenti non possono essere fissati in una porta PR, `check:cycles` è ora un** cricchetto** (`--ratchet`, soffitto `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — blocca qualsiasi _regressione_ e il conteggio non può che diminuire. CI esegue `npm run check:cycles:ratchet`. Giri in fiamme con**A-01** . `check:circular-deps` (dpdm) resta consultivo come seconda opinione più ampia.
- **Complessità** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): una camminata ESLint, conta per ruleId in modo che le linee massime + ciclomatiche e le linee di base cognitive rimangano indipendenti; `check:complexity` / `check:cognitive-complexity` individuali rimangono per `--update` locale.
- **`/api` anti-allucinazioni** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un inventario FS di `src/app/api`, openapi-routes + docs-symbols riporta ancora in modo indipendente; gli individui rimangono per le corse locali.
- **`check:node-runtime` svolge 11 lavori** — ⚠️** ROI basso.** Ciascuno è un corridore separato e il controllo è < 1s; risparmio totale ~ 10s, contro la perdita di una guardia economica per lavoro. Non ne vale la pena.
- **`typecheck:noimplicit:core` su CI lint** — ✅** rimosso dal lavoro di lanugine** (era consultivo `continue-on-error`); la superficie del tipo di blocco è `typecheck:core` + `check:type-coverage`. Mantenimento della scrittura locale.

### Capovolgi/decidi (politica dell'operatore)

- `check:openapi-security-tiers` (avviso) — ❌**NOT ribaltabile in modo pulito.** Esce da 0 ma avverte che diversi percorsi `traffic-inspector` sotto `LOCAL_ONLY_API_PREFIXES` non hanno l'annotazione `x-loopback-only: true`. Per applicarlo è necessario prima aggiungere tali annotazioni a `openapi.yaml`.
- `typecheck:noimplicit:core` (avviso) — in gran parte riassunto dal cricchetto `check:type-coverage` bloccante. Passare a un cricchetto o rilasciare il secondo passaggio `tsc` ridondante.
- `test:vitest:ui` (ora** blocco** ) Gli errori preesistenti — sono esplicitamente esclusi in `vitest.config.ts` con commenti di tracciamento `// #8618` ; nuovi fallimenti falliscono nel lavoro.
- `check:secrets` (gileaks, blocco del cricchetto congelato a 3 falsi positivi documentati) — consente di inserire i 3 per raggiungere 0 o retrocedere ad avviso. Si sovrappone GitHub scansione segreta nativa + `check:public-creds`.
- `check:pr-evidence` (blocco, greps PR-body prose) — rischio elevato di falsi positivi; indebolisce l’applicazione della regola dura #18 se abbandonata, quindi questa è una vera chiamata politica.
- `semgrep` (advisory standalone) — si sovrappone CodeQL per le famiglie OWASP ; collegare la sua linea di base a un cricchetto o a una caduta.

---

## Documentazione correlata

- Catena di fornitura (provenienza, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gate di parità dell'insieme di chiavi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job `i18n-ui-coverage`).
Confronta l'insieme delle chiavi foglia di ogni `src/i18n/messages/<locale>.json` con `en.json` e non
riesce in presenza di qualsiasi chiave foglia mancante o aggiuntiva, indipendentemente da quando
la chiave sia stata aggiunta. I segnaposto `__MISSING__:` vengono considerati presenti (il loro
contenuto è di competenza del gate del rapporto). È il complemento assoluto dei due gate basati
su diff/percentuale: `check-ui-keys-coverage` impone una soglia minima dell'80% per ogni lingua
(43 chiavi mancanti su circa 13.000 risultano comunque pari al 99,7%) e `check-new-key-coverage`
valuta soltanto le chiavi aggiunte da una PR a `en.json`. Un batch di lingue viene generato
dall'`en.json` del giorno in cui viene creato il relativo branch e continua a tradurre per giorni,
mentre la base continua ad aggiungere chiavi; la PR del batch non aggiunge essa stessa alcuna
chiave, quindi entrambi i gate correlati sono rimasti silenziosi quando il batch 1 (#13044) è
stato integrato con 43 chiavi mancanti in nove lingue e il batch 2 (#13660) con 10 chiavi mancanti
in otto lingue (2026-09-15). Per correggere un errore, usare
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; una chiave foglia
`extra` indica che è stata rimossa dalla sorgente: eliminarla dalla lingua. `--warn` segnala il
problema senza causare un errore. `--catalog=cli` esegue lo stesso confronto su `bin/cli/locales`
(`npm run i18n:check-keys:cli`); entrambi i passaggi si trovano nel job `i18n-ui-coverage`.

#### `check-new-key-coverage` — gate i18n per le nuove chiavi

Correlato a `check-ui-value-drift`. Quest'ultimo rileva un valore inglese che è stato
**riscritto** senza aggiornare le relative traduzioni; questo rileva una chiave inglese che è
stata **aggiunta** senza essere inclusa in alcune lingue.

`check-ui-keys-coverage` non può rilevare questa categoria: impone una soglia percentuale minima
per ogni lingua e undici chiavi mancanti su circa 13.000 lasciano la copertura al 99,9%. Una
percentuale per lingua non può esprimere il concetto «questa funzionalità è stata distribuita
senza traduzione»: un'intera funzionalità può essere introdotta in una nuova lingua senza alcun
testo e senza modificare il valore numerico.

L'incidente che codifica: la fase 3 di Orchestration Canvas ha tradotto le sue undici chiavi nelle
42 lingue esistenti in quel momento. Ore dopo, il batch delle lingue UE (#13044) ha portato il
repository a 51 lingue e le nove nuove arrivate (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`,
`sr`) non le hanno mai ricevute. `deepMergeFallback` sostituisce una chiave assente con l'inglese,
quindi la modalità di errore consisteva in un'interfaccia non tradotta anziché vuota: un problema
reale e, per sua natura, silenzioso.

Come il gate correlato, è **consapevole del diff**: confronta l'inglese nella base di merge con
l'albero di lavoro, quindi le lacune preesistenti restano immutate e non è stata necessaria alcuna
migrazione per attivare il gate.

**Un marcatore `__MISSING__:<english>` non lo soddisfa (dal 2026-09-17).** In precedenza era il
rinvio documentato — a runtime viene usato come fallback l'inglese corretto — finché otto PR di
funzionalità, in data 2026-09-16, hanno aggiunto 61 chiavi e inserito il marcatore in tutte le 65
lingue anziché tradurle: questo gate le ha accettate tutte, nulla ha bloccato le PR e il gate
bloccante del rapporto di traduzioni reali ha quindi generato un errore sulla punta del branch di
rilascio per tutti (pt-BR 3,2% > 2,5% + 0,5). Un marcatore viene ora valutato come una traduzione
assente. Per correggere un errore, usare
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, oppure
elaborare tutte le lingue in parallelo con `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, sicuro in modalità detached, rifiuta di avviarsi senza le
variabili di ambiente `OMNIROUTE_TRANSLATION_*`). Una chiave che deve rimanere in inglese (il nome
fisso di un prodotto, motore o flag) va inserita in `scripts/i18n/untranslatable-keys.json`, mai
dietro un marcatore. `vi` vieta del tutto i marcatori
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gate per i test sospesi

Un file presente nell'elenco `exclude` di `vitest.config.ts` è un test che non viene eseguito e,
per chi esamina l'albero, sembra contribuire alla copertura. Sessantadue file si sono accumulati
dietro il commento `// #8618 — pre-existing failure; remove this exclusion when fixed`. L'issue
#8618 è stata chiusa il 2026-08-11, mentre l'elenco monitorato è cresciuto da 45 a 62 voci,
ciascuna delle quali ereditava un commento che rimandava a un'issue chiusa. Quando infine l'elenco
è stato misurato file per file (#13204), **51 dei 62 test sono passati sull'albero corrente senza
alcuna modifica al codice sorgente**.

Il gate richiede che ogni esclusione corrispondente a un file reale (a) indichi un'issue di
monitoraggio e (b) compaia in `config/quality/vitest-exclusions.json` con il relativo stato
misurato, affinché l'aggiunta sia un diff esaminabile in un file dedicato anziché un'ulteriore
riga in un array di 60 voci. Intenzionalmente, non riesegue i test esclusi: ciò richiede circa
10 minuti ed è compito di un job periodico; l'inventario registra la data dell'ultima misurazione
di ciascun test.
