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

### Unisci coda

L'etichetta `queue` invia un PR alla coda Mergify (`.mergify.yml`). Mergify apre una bozza PR su un ramo `mergify/merge-queue/`, CI esegue lì la selezione completa e PR originale si unisce quando `Gate / CI`, `Gate / Quality` e `Merge integrity (changelog + generated skills)` passano.

Mergify scrive il riepilogo della coda nella descrizione della bozza e anche altre app possono modificarlo. Un evento `pull_request` `edited` su una bozza di questo tipo accetta il proprio gruppo di concorrenza (`-queue-edit-<run_id>`), quindi non può annullare l'esecuzione reale della bozza e salta il gate e la matrice. Solo `Merge integrity` funziona ancora. Il lavoro del gate saltato porta un nome di controllo diverso, perché Mergify legge uno `Gate / CI` saltato come un controllo non riuscito e rimuove dalla PR.

Dopo una rimozione dalla coda, un push non sempre riaccoda lo PR. Commenta `@mergifyio queue` su di esso.

Ogni ricevuta JSON identifica lo SHA estratto, l'esecuzione del flusso di lavoro e il tentativo. Lo CLI rifiuta una mancata corrispondenza checkout/event SHA. I test del flusso di lavoro vincolano l'appartenenza alla policy all'elenco `needs` del processo di verdetto in modo che una corsia nuova o rimossa non possa scomparire silenziosamente. Le ricevute coprono il proprio flusso di lavoro, non la pubblicazione, la distribuzione o gli aspetti interni di uno scanner consultivo esistente. L'attivazione di entrambi i nomi degli assegni nelle regole del ramo costituisce una modifica amministrativa separata; l'aggiunta di questi lavori non protegge di per sé una filiale.

### Inventario di scansione statico

L'inventario con versione npm-alias e l'appartenenza alla scansione statica risiedono in `config/quality/gate-manifest.json`. Esegui `npm run check:gate-manifest` per convalidare i nomi degli script e i comandi esatti rispetto `package.json`; aggiunte, rimozioni e deriva dei comandi falliscono sia l'hook locale che i lavori di classificazione delle modifiche in CI. Un alias non è un lavoro del flusso di lavoro, un'istanza di matrice o un caso di test: questi conteggi non devono essere presentati come intercambiabili.

Utilizza `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list` per ispezionare gli alias selezionati senza eseguirli. Il runner richiama il punto di ingresso npm, quindi il suo runtime (incluso Bun dove configurato) viene preservato. Il manifest registra gli alias esterni a tali profili come richiamati separatamente e i comandi di manutenzione sono vietati nei profili di scansione di sola lettura.

Questi profili coprono solo la scansione statica. Non certificano test del prodotto, copertura, imballaggio, controlli esterni o la completa accettazione del rilascio da parte del candidato. L'ammissione al flusso di lavoro utilizza `config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs` collegati. I profili dell'osservatore del rilascio rimangono separati; ispezionare in modo indipendente gli assegni e le ricevute applicabili. L'inventario in prosa riportato di seguito è un riferimento, non una prova che un cancello funzionasse effettivamente.

Gli script vivono sotto `scripts/check/` (policy gates) e `scripts/quality/` (ratchet engine). La fonte della verità CI è `.github/workflows/ci.yml`.

### Rilascia PR percorso rapido (`quality.yml`)

`.github/workflows/quality.yml` integra CI su main/release PRs, invia a `main`, invia e unisci gruppi. PRs utilizza controlli rapidi filtrati dal percorso. La build duplicata disabilitata permanentemente è stata rimossa; i veri controlli build/package/boot rimangono in CI. L'unità suite e vitest vengono eseguite solo in CI (`Unit Tests (N/8)` e `Vitest`).

| Lavoro                                           | Ambito                                                                                                                                                | Blocco                    |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs e docs-all                                                                                                               | SÌ                        |
| `Fast Quality Gates`                             | Codice PRs; controlli statici, controllo del tipo, controllo del tipo del dashboard, test unitari interessati, test dei fratelli dimenticati (avviso) |
| `No new ESLint warnings`                         | Codice PRs; protezione anti-pelucchi sensibile alla soppressione                                                                                      | Sì, comprese le forchette |
| `Merge integrity (changelog + generated skills)` | PRs non progetto; registro delle modifiche e sincronizzazione delle abilità generate                                                                  | Sì, comprese le forchette |

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
| `check:model-lifecycle`           | Le tre tabelle di routing gestite manualmente rimangono coerenti con lo snapshot del ciclo di vita archiviato (#11503): `FITNESS_TABLE` (`taskFitness.ts`) non assegna alcun ID ritirato che `REGISTRY` possa instradare; ogni destinazione `BUILT_IN_ALIASES` è presente in `REGISTRY` e assente nello snapshot id ritirato; ogni ID in pensione ancora in `REGISTRY` viene inoltrato o elencato in `allowedRetiredInCatalog`; e nessuna origine o destinazione `DEFAULT_DEGRADATION_MAP` appare ritirata in quell'istantanea. Ciò non prova che un modello sia attualmente servito da un upstream live. — offline viene confrontato con `config/quality/model-lifecycle.json`, aggiornato manualmente con `npm run quality:refresh-model-lifecycle` (rete; non collegato a CI). `allowedRetiredInCatalog` è un meccanismo burn-down: aggiungi una voce solo con un problema di tracciamento.                                                                                                                                                                              | SÌ                                         |
| `check:fetch-targets`             | Ogni `fetch("/api/...")` in `src/` lato client si risolve in un vero `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | SÌ                                         |
| `check:deps`                      | Tutti i punti `npm install` -able in ogni `package.json` nel repository sono in `dependency-allowlist.json`; nuovi pacchetti sbloccati o slopsquat contrassegnati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | SÌ                                         |
| `audit:deps`                      | `npm audit` (radice + elettrone) — no high/critical avvisi (si sovrappone a osv `check:vuln-ratchet`; vedere Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | SÌ                                         |
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
| `check:vuln-ratchet`     | Le vulnerabilità delle dipendenze (osv-scanner) non regrediscono ai salti — se il binario è assente                                                                                                                                                | **Consultivo**                                             |
| `check:workflows`        | Lint del flusso di lavoro (actionlint + zizmor); Gli scanner missing/broken, i report non validi o la linea di base del cricchetto mancante falliscono come INCOMPLETE. I risultati validi seguono la politica strict/advisory/ratchet selezionata | Esecuzione richiesta; bloccaggio a cricchetto zizmor in CI |
| `check:openapi-breaking` | Modifiche di rilievo al contratto pubblico API (`openapi.yaml`) rispetto al ramo base (oasdiff) — emette `openapiBreaking=N`; salta se oasdiff è assente o le specifiche di base non sono risolvibili                                              | **Consultivo**                                             |

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

Vengono generati i dodici README SVGs sotto `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` li rigenera tutti). Ognuno ha uno unit test di confronto byte (`tests/unit/docs/readme-*-svg.test.ts`, job `test-unit`) che fallisce quando il file impegnato è obsoleto e `check:docs-counts` legge i numeri canonici dai rispettivi nodi `<text>` — motivo per cui il passaggio di struttura mantiene ogni stringa delineata nel file come invisibile `<text>`. Il controllo SVG canonical-numbers legge i file elencati in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, più `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; le affermazioni free-forever, catalog-entry, recurring-pool e scoring-factors leggono anche `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` trae le sue cifre dal caricatore del catalogo in tempo reale, quindi una modifica a `FREE_MODEL_BUDGETS` o al nome visualizzato di un provider diventa CI finché il file non viene rigenerato.

### Lavoro: `i18n-ui-coverage`

| Copione                             | Convalida                                                                                                                                                                                                              | Blocco         |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (in linea) | La copertura dei tasti UI i18n è ≥ 65%                                                                                                                                                                                 | SÌ             |
| `check-ui-value-drift` (in linea)   | Un inglese riscritto** valore** non lascia alcuna traduzione stantia                                                                                                                                                   | SÌ             |
| `check-new-key-coverage` (in linea) | UN** nuovo** La chiave inglese è tradotta in ogni locale — un indicatore `__MISSING__:` viene rifiutato                                                                                                                | SÌ             |
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

## Fase velocity (2026-08-30 → v4.0 LTS): ogni baseline allentata del 20%

Decisione del responsabile (2026-08-30): fino alla modularizzazione della v4.0, la velocità di rilascio conta più
del contenimento del debito. Ogni baseline **numerica** del ratchet è stata allentata del 20% in un'unica
operazione verificabile e la fase è dichiarata in `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Cosa è cambiato                                                                                                                                                                                                                                                    | Dove                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — conteggi in cui un valore inferiore è migliore ×1.2, percentuali in cui un valore superiore è migliore ÷1.2 (soglia minima di copertura mantenuta a 60, `eslintErrors` resta 0, `eslintWarnings` 0 → 20% del numero di soppressioni congelato) | `quality-baseline.json` (la nota `_relax_velocity_2026_08_30` elenca ogni valore prima → dopo)         |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                   | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ogni limite di righe `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                          | `file-size-baseline.json`                                                                              |
| conteggi per file / per codice TS ×1.2                                                                                                                                                                                                                             | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` diventa consultivo quando `_policy.requireTighten === false`                                                                                                                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| il job notturno `bank-ratchet-shrinks` viene sospeso (registrerebbe la riduzione misurata e annullerebbe il margine)                                                                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

Le allowlist (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **non** sono budget e non sono state modificate. I gate delle policy con esito superato/non superato (segreti, regole SQL,
contratto documentazione/ambiente, parità i18n, unit test) restano invariati: un test rosso rimane un test rosso.

**Strumenti**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — l'allentamento
  una tantum (`scripts/quality/relax-baselines.mjs`); rifiuta di essere eseguito due volte con la
  stessa nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  misura ogni gate numerico nello stesso modo della CI e mostra il margine rimanente per ciascun gate
  (`scripts/quality/baseline-headroom.mjs`). Il job notturno `baseline-headroom` pubblica
  la tabella nel riepilogo dell'esecuzione del workflow e carica il relativo report JSON/Markdown come
  `baseline-headroom-<run_id>`, conservato per 90 giorni. Le righe di avviso e critiche identificano i gate
  entro il 10% del proprio limite o che lo hanno già superato. Esaminare questi report come avviso tempestivo
  del consumo dei budget; controllare le note `_rebaseline_*` del gate responsabile. Il job non
  crea né aggiorna più un'issue permanente; #12149 conserva la cronologia dei report precedenti.

**Modalità nuovo codice (Clean-as-You-Code) — dal 2026-08-30, solo percorso rapido delle PR**

Negli eventi `pull_request`, `quality.yml` passa `--base-ref <PR base SHA>` a `check:file-size`,
`check:complexity-ratchets` e `check:dead-code`. Per `check:complexity-ratchets` e
`check:dead-code`, il gate confronta HEAD con la merge-base **limitatamente ai file modificati dalla PR**
(`scripts/check/newCodeMode.mjs`: la merge-base viene materializzata in un
`git worktree` temporaneo, ESLint/knip vengono eseguiti lì e su HEAD, quindi vengono confrontati i conteggi per file):

- **bloccante** — la PR ha aggiunto violazioni di complessità ciclomatica/cognitiva o export inutilizzati nei file modificati
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` nel log);
- **consultivo** — il totale globale rispetto alla baseline congelata. Il drift ereditato non rende mai rossa una
  PR che non ne è responsabile; il drift viene ricongelato durante la riconciliazione della release e monitorato dal job headroom.

`check:file-size` usa il riferimento base secondo le proprie regole (`scripts/check/check-file-size.mjs`, #8522):
controlla ogni file sorgente e di test nell'albero, legge il numero di righe di ciascuno alla base della PR
con `git show` e considera un file non conforme solo quando supera il maggiore tra il proprio limite della baseline
(`frozen` / `testFrozen`, oppure `cap` / `testCap` per un file esterno alla baseline) e la propria
dimensione di base. Un file che presentava già un drift nella base, quindi, non rende mai rossa una PR che non ne è responsabile.

`check:boundary:ratchet` applica la stessa regola al suo unico valore numerico
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): negli eventi PR, sia il
fast-gate di `quality.yml` sia il job di lint di `ci.yml` passano lo SHA di base della PR, il commit
di base viene misurato da un'esportazione `git archive` e la PR fallisce solo quando il conteggio
degli archi `open-sse → src` supera il maggiore tra `metrics.boundaryOpenSseToSrc` e il conteggio
della base. Una deriva della base oltre il limite viene segnalata (`deriva della base ereditata`),
ma non fa mai fallire una PR innocente; il push → main mantiene il limite assoluto e, se lo SHA
di base non è risolvibile, ripiega su di esso mostrando un avviso.

Le esecuzioni `workflow_dispatch`, la verifica completa per il via libera alla release e il job
notturno per il margine non dispongono di una base PR e mantengono il confronto assoluto
(globale). Copertura, duplicazione e copertura dei tipi restano per ora globali (i relativi
strumenti non producono a basso costo un diff per file): sono candidati allo stesso trattamento.

**Chiusura della fase alla v4.0 (LTS = più restrittiva di prima, non "ritorno alla normalità")**

1. Sul tip puro di `release/v4.0.0`: eseguire `npm run quality:headroom --json` a fini di
   registrazione, quindi `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` e `--update` per ogni gate
   di typecheck: ogni baseline scende al valore misurato.
2. Eliminare `_policy` da `quality-baseline.json` (riattiva `--require-tighten` e
   l'accantonamento notturno), ripristinare `THRESHOLD = 36` (o un valore superiore) in
   `check-openapi-coverage.mjs`.
3. Inasprire i limiti oltre i valori misurati laddove la modularizzazione ha dato risultati:
   riportare il `cap` delle dimensioni dei file a 1000 (o 800), aumentare di 5 le soglie minime
   di copertura, impostare a 0 gli export inutilizzati per i pacchetti modularizzati.

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

## Criterio della allowlist

Ogni gate che non può fallire a causa di violazioni preesistenti utilizza una allowlist immutabile
(ad es., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Il criterio è:

**Correggere la causa principale; utilizzare la allowlist solo quando la violazione è preesistente e
non può essere corretta nella stessa PR.**

Quando si aggiunge una voce a una allowlist:

1. Includere un commento con la giustificazione.
2. Fare riferimento all'issue di tracciamento (ad es., `// #3498 — Funzionalità della Fase 2, non ancora implementata`).
3. Rimuovere la voce nella stessa PR che corregge la violazione: una voce obsoleta che non
   sopprime più una violazione attiva costituisce essa stessa un difetto (il controllo delle
   applicazioni obsolete 6A.3 farà fallire il gate per una voce orfana nella allowlist una volta implementato).

**Non** aggiungere voci alla allowlist per far superare i test più rapidamente. Un gate superato con una
allowlist in crescita crea un falso senso di qualità.

### Quando un gate fallisce nella propria PR

1. **Leggere attentamente l'output del gate**: indica esattamente quale file o simbolo ha violato
   la regola.
2. **Correggere la violazione**: la maggior parte dei gate consiste in controlli deterministici del filesystem che vengono superati non appena
   il codice è corretto.
3. **Se la violazione è preesistente** (ovvero non è stata introdotta dalla propria modifica, ma ora il gate
   la rileva): aggiungere una voce alla allowlist con un commento di giustificazione e un'issue di tracciamento.
4. **Se il gate è un ratchet** (copertura, avvisi ESLint, duplicazione, complessità):
   la modifica ha peggiorato la metrica. Correggere il problema sottostante oppure, in rari casi, eseguire
   `npm run quality:ratchet -- --update` se la modifica è intenzionale e il peggioramento
   della metrica è accettabile; documentarne tuttavia il motivo nella descrizione della PR.
5. **I gate consultivi** (`continue-on-error: true`) sono informativi: non bloccano
   il merge, ma compaiono nel riepilogo della CI. Correggerli comunque.

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

## Backlog di razionalizzazione (revisione ROI — Fase 9 Onda 3)

Questo inventario è stato riconciliato con `ci.yml` il 2026-06-17 (la versione precedente ometteva
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Una revisione ROI dell'insieme riconciliato
ha individuato i seguenti candidati alla razionalizzazione. **Le unificazioni sono modifiche
meccaniche alla CI; le conversioni/rimozioni sono decisioni di policy riservate all'operatore.**
Nulla di quanto segue è stato ancora applicato.

**Inoltre non documentati sopra** (consultivi, segnale debole): il job `docs-lint`
(markdownlint + Vale, intero job con `continue-on-error`) e i workflow di scansione autonomi
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` è presente in
`quality-baseline.json`, ma non è collegato a un ratchet bloccante in `ci.yml`: la metrica è
attualmente orfana.

### Unificazione / deduplicazione (meccanica, rischio inferiore)

Ogni candidato è stato validato rispetto allo stato effettivo dei gate il 2026-06-17
(fidarsi, ma verificare); diverse unificazioni "ovvie" si sono rivelate nascondere debito
e **non** sono sostituzioni dirette prive di rischi.

- **`check:docs-sync` viene eseguito due volte** — autonomamente nel job `lint` e nuovamente all'interno di `check:docs-all` (`docs-sync-strict`) e dell'hook pre-commit di husky. ✅ **FATTO** — l'invocazione autonoma in `lint` è stata rimossa.
- **Scansione delle CVE** — ❌ **NON è un'unificazione pulita.** `audit:deps` fallisce in modo bloccante per qualsiasi CVE alta/critica; `check:vuln-ratchet` (osv) fallisce solo in caso di _regressione_ rispetto alla baseline (attualmente 1 MODERATE). Semantiche diverse: la rimozione di `audit:deps` eliminerebbe il gate assoluto per le vulnerabilità alte/critiche. Mantenerli entrambi.
- **Rilevamento dei cicli** — ✅ **FATTO** (#15159 G-01/G-02). Il testo precedente definiva `check:cycles` il gate "verde e curato" e giustificava il suo mantenimento come bloccante perché `check:circular-deps` (dpdm) segnalava 91 cicli. Quel verde era un **falso verde**: `check:cycles` analizzava 5 sottodirectory (450 file), rilevava solo `import|export … from` statici e scartava ogni specificatore `@/` e `@omniroute/open-sse/`, quindi non poteva rilevare i cicli con import dinamici + alias che dominavano il repository. Corretto: ora il gate percorre `src` + `open-sse` (5023 file), raccoglie gli specificatori dall'AST TypeScript (quindi `import("…")` conta, mentre `typeof import("…")` in posizione di tipo no) e risolve i `paths` di tsconfig. Trova **14** cicli, non 0. Poiché 14 cicli preesistenti non possono essere corretti in una PR dedicata al gate, `check:cycles` è ora un **ratchet** (`--ratchet`, soglia massima `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`): blocca qualsiasi _regressione_ e il conteggio può solo diminuire. La CI esegue `npm run check:cycles:ratchet`. La riduzione progressiva procede insieme ad **A-01**. `check:circular-deps` (dpdm) rimane consultivo come seconda valutazione più ampia.
- **Complessità** — ✅ **FATTO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): un'unica scansione ESLint, con conteggi per ruleId affinché le baseline di complessità ciclomatica+max-lines e cognitiva restino indipendenti; i singoli `check:complexity` / `check:cognitive-complexity` rimangono disponibili per l'uso locale con `--update`.
- **Anti-allucinazione di `/api`** — ✅ **FATTO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un unico inventario del file system per `src/app/api`; openapi-routes + docs-symbols continuano a produrre report indipendenti; i controlli individuali rimangono disponibili per le esecuzioni locali.
- **`check:node-runtime` viene eseguito in 11 job** — ⚠️ **ROI basso.** Ognuno è un runner separato e il controllo richiede <1s; il risparmio totale è di ~10s, a fronte della perdita di una protezione economica per ogni job. Non vale la pena affrontare le modifiche necessarie.
- **`typecheck:noimplicit:core` nel lint della CI** — ✅ **rimosso dal job lint** (era consultivo con `continue-on-error`); la superficie di tipi bloccante è `typecheck:core` + `check:type-coverage`. Script locale mantenuto.

### Conversione / decisione (policy dell'operatore)

- `check:openapi-security-tiers` (consultivo) — ❌ **NON convertibile in modo pulito.** Termina con codice 0, ma avverte che diverse route `traffic-inspector` sotto `LOCAL_ONLY_API_PREFIXES` non hanno l'annotazione `x-loopback-only: true`. Per renderlo bloccante è necessario aggiungere prima tali annotazioni a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — in gran parte sostituito dal ratchet bloccante `check:type-coverage`. Convertirlo in ratchet oppure rimuovere il secondo passaggio `tsc` ridondante.
- `test:vitest:ui` (ora **bloccante**) — gli errori preesistenti sono esclusi esplicitamente in `vitest.config.ts` con commenti di tracciamento `// #8618`; i nuovi errori fanno fallire il job.
- `check:secrets` (gitleaks, ratchet bloccante fissato a 3 falsi positivi documentati) — aggiungere i 3 alla allowlist per arrivare a 0, oppure declassarlo a consultivo. Si sovrappone alla scansione nativa dei segreti di GitHub + `check:public-creds`.
- `check:pr-evidence` (bloccante, esegue grep sul testo descrittivo del corpo della PR) — elevato rischio di falsi positivi; rimuoverlo indebolisce l'applicazione della Hard Rule #18, quindi si tratta di una vera decisione di policy.
- `semgrep` (autonomo consultivo) — si sovrappone a CodeQL per le famiglie OWASP; collegare la sua baseline a un ratchet oppure rimuoverlo.

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
