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

### Ammissione dei candidati

I workflow CI e Quality emettono ciascuno un verdetto stabile: `Gate / CI` e
`Gate / Quality`. La loro policy di ammissione versionata elenca ogni job upstream
come obbligatorio o consultivo. Un job obbligatorio applicabile deve riuscire: risultati
mancanti, annullati, ignorati, in sospeso e sconosciuti non possono determinare un PASS. Una
classificazione valida come sola documentazione o solo catalogo può rendere non applicabile
una lane di codice; una PR in bozza non è un candidato accettato. Un'etichetta `hotfix` non
esonera dalla necessità di prove.

Entrambi i workflow coprono le PR verso i branch main/release, i push a `main`, l'avvio manuale
e gli eventi merge-group. Push, avvio manuale e merge-group eseguono la selezione completa. I push a
`release/**` non li avviano (2026-10-18): ogni modifica ha già eseguito la matrice nella propria PR
e la combinazione risultante dal merge è compito di Release-Green (`docs/ops/RUNNER_BOX.md` → lane ospitata). I fork
e i merge group utilizzano runner ospitati per i job che altrimenti selezionano runner
self-hosted; prima del rollout deve essere verificata una capacità ospitata sufficiente.

Ogni ricevuta JSON identifica lo SHA sottoposto a checkout, l'esecuzione del workflow e il tentativo.
La CLI rifiuta una mancata corrispondenza tra lo SHA del checkout e quello dell'evento. I test del workflow vincolano l'appartenenza alla policy
all'elenco `needs` del job del verdetto, affinché una lane nuova o rimossa non possa scomparire silenziosamente.
Le ricevute coprono il proprio flusso di lavoro, non la pubblicazione, il deployment o i meccanismi interni
di uno scanner consultivo esistente. Rendere obbligatori i controlli applicabili nelle regole dei branch
è una modifica amministrativa separata; la definizione dei relativi job non protegge di per sé un branch.

`API Route Typecheck` è un controllo del flusso di lavoro indipendente, esterno sia ai verdetti aggregati
sia al profilo statico dell'osservatore locale completo. Esaminane separatamente il risultato per il candidato
esatto. `.github/workflows/api-route-typecheck.yml` viene eseguito sulle PR verso `main` o
`release/**`, sui push verso entrambe le famiglie di branch e tramite avvio manuale. Non dispone di filtri sui percorsi.
Le modifiche del branch di destinazione della PR richiedono un nuovo controllo; le modifiche al corpo o al titolo usano il nome
di sola osservazione `Admission not requested / API Route Typecheck` e non possono sostituire il controllo di ammissione.
Il flusso di lavoro non dichiara un trigger per i merge group. Qualsiasi introduzione della coda di merge che richieda
questo controllo deve prima garantirne l'esecuzione per tale evento.

### Capacità di esecuzione della UI

CI esegue l'intero inventario UI come quattro shard della matrice `test-vitest`, ciascuno con al massimo
due worker e con il limite esistente di 15 minuti per job. Il primo shard esegue anche la
suite Vitest MCP/autoCombo. Il risultato del job obbligatorio copre ogni elemento della matrice; l'errore
o l'annullamento di uno shard non può determinare l'ammissione del candidato.

L'osservatore notturno conserva una ricevuta separata per il candidato esatto per ogni shard UI,
inclusa l'esecuzione MCP nella prima ricevuta. Sono richiesti tutte e quattro le ricevute, i log e le
identità di esecuzione corrispondenti. Il comando locale `npm run test:vitest:ui` seleziona comunque la
suite completa; una singola esecuzione con `--shard` costituisce solo una prova parziale.

### Raccolta della copertura dei test unitari

I dodici shard dei test unitari raccolgono la copertura V8 durante l'esecuzione dei test esistente. Uno shard
completato con successo esegue `scripts/ci/compact-v8-coverage.mjs` per comprimere i file originali senza generare
un report Istanbul intermedio. Il job Coverage finale verifica tutti e dodici i manifest rispetto
allo SHA del candidato, al runtime, alla radice dei sorgenti e agli hash dei dati, quindi esegue i reporter di c8 e le soglie
di copertura esistenti. Gli input mantengono l'ordinamento globale dei nomi file di c8; il pre-merge per shard non è sicuro
per una copertura mista di funzioni/blocchi. Shard mancanti, malformati o incompatibili impediscono l'ammissione.
Gli shard di test non riusciti conservano separatamente la copertura diagnostica non elaborata; questa non può essere inclusa nel merge finale.

### Ricevute di avanzamento dell'esecuzione dei test unitari

Il comando condiviso `test:unit:ci:shard` registra le fasi `primary`, `dashboard` e `serial`
tramite `scripts/ci/unit-progress-reporter.mjs`. Il normale report dei test rimane
disponibile. Una ricevuta separata, contenente solo metadati, registra l'avvio e il completamento
di ciascun file, mentre un heartbeat ogni 30 secondi elenca i file ancora attivi e il relativo tempo trascorso. Registra
solo i metadati di esecuzione inclusi nell'elenco consentito; le descrizioni dei test, l'output, il corpo degli errori e l'ambiente
completo non vengono serializzati.

CI e Quality conservano i file JSONL come `unit-progress-ci-<run>-<attempt>-<shard>` e
`unit-progress-quality-<run>-<attempt>-<shard>`. Un timeout del job può impedire il successivo caricamento;
gli heartbeat già emessi rimangono evidenze diagnostiche. L'assenza di heartbeat può anche indicare
un processo del runner bloccato o terminato. Queste ricevute preservano la selezione dei test,
la concorrenza, le scadenze e lo stato di uscita esistenti; non costituiscono verdetti di ammissione dei candidati.

### Prove conservate nel riduttore di accettazione

`scripts/quality/validate-release-acceptance.mjs` aggrega un piano fornito e i suoi manifest; non dimostra che il piano copra l'intera pipeline di rilascio. I suoi report impostano esplicitamente `releaseAcceptance: false`, anche quando il piano è `VERIFIED`. Il workflow `release-acceptance.yml` usa ancora fixture di simulazione, non ricevute reali di build, pacchettizzazione, avvio o promozione.

La CLI richiede `--evidence-root` per verificare le prove conservate. I file vengono individuati come `<evidence-root>/<artifact_id>/<member>` e sottoposti a hashing SHA-256. Un record PASS senza prove, un file mancante o modificato, un percorso non sicuro o un collegamento simbolico impedisce la verifica. I file mancanti non equivalgono a log vuoti di esecuzioni riuscite. I controlli SHA/run/attempt esistenti restano indipendenti: byte coincidenti non rendono valida una ricevuta obsoleta. L'integrità del file non prova l'autenticità dell'esecuzione né la promozione dell'artefatto.

### Inventario delle scansioni statiche

L'inventario versionato degli alias npm e l'appartenenza alle scansioni statiche si trovano in
`config/quality/gate-manifest.json`. Eseguire `npm run check:gate-manifest` per convalidare
i nomi degli script e i comandi esatti rispetto a `package.json`; aggiunte, rimozioni e
variazioni dei comandi causano il fallimento sia dell'hook locale sia dei job di classificazione delle modifiche in CI.
Un alias non è un job del workflow, un'istanza della matrice o un caso di test: questi conteggi non devono
essere presentati come intercambiabili.

Utilizzare `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list`
per esaminare gli alias selezionati senza eseguirli. Il runner invoca l'entry point
npm, preservandone quindi il runtime (incluso Bun, dove configurato).
Il manifest registra gli alias esterni a questi profili come invocati separatamente e
i comandi di manutenzione sono vietati nei profili di scansione in sola lettura.

Questi profili coprono solo la scansione statica. Non certificano i test del prodotto,
la copertura, il packaging, i check esterni o l'accettazione completa di un candidato per il rilascio.
L'ammissione del workflow utilizza i file collegati `config/quality/admission-policy.json` e
`scripts/quality/admission-verdict.mjs`. I profili dell'osservatore del rilascio restano separati;
esaminare in modo indipendente i check applicabili e le relative ricevute. I comandi statici dell'osservatore completo
sono dichiarati in `config/quality/release-green-static-profile.json`, inclusi
`audit:deps`, la selezione dei mutation test e i controlli delle traduzioni. Il loader convalida i comandi npm
rispetto a package.json e alle dichiarazioni CI/Quality modellate; rifiuta le variazioni
anziché eseguire i token della shell come argomenti. L'output SKIP/INCOMPLETE degli scanner obbligatori
non può determinare un PASS. Il profilo registra le proprie esclusioni esterne e non sostituisce
la copertura ospitata, le matrici di test e le prove relative a pacchetti o deployment. L'inventario testuale seguente
è un riferimento, non una prova che un gate sia stato effettivamente eseguito.

Gli script si trovano in `scripts/check/` (gate di policy) e `scripts/quality/` (motore ratchet).
La fonte di verità di CI è `.github/workflows/ci.yml`.

### Stato della documentazione di base pubblicata

`.github/workflows/i18n-base-health.yml` monitora lo stato della documentazione dopo determinati
push a `main` e `release/v*` e in caso di avvio manuale. I suoi filtri includono la documentazione,
i file Markdown nella radice, `llm.txt`, lo stato/la configurazione delle traduzioni e gli strumenti i18n pertinenti.
L'unico job `Published base documentation health` usa Ubuntu ospitato e ha un limite di cinque minuti.
Esegue una convalida in sola lettura e scrive una ricevuta diagnostica senza installare
dipendenze, effettuare traduzioni o adottare lo stato.

`scripts/i18n/check-base-health.mjs` richiede che non vi siano incoerenze relative all'hash sorgente, alla destinazione mancante, all'hash
della destinazione, alla traduzione obsoleta e alla cache delle sezioni. Convalida inoltre l'ambito corrente
dei documenti/delle impostazioni locali principali e la relativa provenienza registrata. Un contesto non valido, una copertura incompleta
o un controllo interrotto produce `INCOMPLETE`; una divergenza confermata produce `FAIL`. Entrambi
restituiscono uno stato di uscita indicante un errore. La ricevuta è associata allo SHA del checkout, al workflow, all'esecuzione e
al tentativo e viene conservata come `i18n-base-health-<sha>-<run>-<attempt>`.

Questa è un'osservazione indipendente della base pubblicata. Non aggiunge un evento PR o
merge-group, un controllo PR obbligatorio, un alias npm o un membro del profilo di scansione statica.
La policy differenziale esistente per le PR e le classificazioni informative del controllo sottostante
rimangono separate. Un caricamento riuscito non può trasformare in PASS il risultato negativo del controllo dello stato.

### Percorso rapido per le PR di rilascio (`quality.yml`)

`.github/workflows/quality.yml` integra CI per le PR main/release, i push a `main`,
l'avvio manuale e i merge group. Le PR utilizzano controlli rapidi filtrati per percorso. La build duplicata,
disabilitata permanentemente, è stata rimossa; i controlli effettivi di build/pacchetto/avvio rimangono in CI.

| Job                                              | Ambito                                                                                                                                                                                                                              | Bloccante          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Docs Gates (fast-path)`                         | PR di documentazione/codice; riferimenti alla documentazione API e docs-all                                                                                                                                                         | Sì                 |
| `Fast Quality Gates`                             | PR di codice; controlli statici, controllo dei tipi, controllo dei tipi della dashboard, test unitari interessati                                                                                                                   | Sì                 |
| `Forgotten sibling tests`                        | PR di codice; moduli modificati tracciati fino ai consumer statici e ai test sibling candidati; i percorsi con barrel e import dinamici sono segnalati come diagnostica consultiva, con le eccezioni della allowlist di riferimento | **Consultivo**     |
| `Vitest (fast-path)`                             | PR di codice; suite Vitest rapida                                                                                                                                                                                                   | Sì                 |
| `Unit Tests fast-path`                           | PR di codice; suite di test unitari suddivisa in 4 shard                                                                                                                                                                            | Sì                 |
| `No new ESLint warnings`                         | PR di codice; controllo lint che tiene conto delle soppressioni                                                                                                                                                                     | Sì, inclusi i fork |
| `Merge integrity (changelog + generated skills)` | PR non in bozza; sincronizzazione del changelog e delle skill generate                                                                                                                                                              | Sì, inclusi i fork |

#### Report sui test sibling dimenticati

`npm run check:forgotten-sibling-tests` riutilizza il resolver degli import alla base della mappa dell'impatto dei test.
Per ogni modulo di produzione modificato, segnala catene deterministiche
`changed module/symbol -> static consumer -> candidate sibling test` quando il test candidato
è assente dal diff della pull request. Il riepilogo Markdown e il risultato JSON vengono conservati come
artefatto del workflow `forgotten-sibling-tests` per la calibrazione prima di qualsiasi introduzione come controllo bloccante.

Le riesportazioni tramite barrel e gli import dinamici sono soltanto diagnostica di risoluzione; non generano mai un
rilievo bloccante. Le eccezioni sottoposte a revisione si trovano in
`config/quality/forgotten-sibling-allowlist.json`. Ogni voce deve indicare il consumer e il test
candidato, fornire una motivazione specifica e includere un link a una issue o pull request di GitHub. Le voci non valide causano
un errore in modalità fail-closed. Le eccezioni non possono ignorare un test candidato eliminato o un diff che aggiunge `.skip`/`.todo`;
l'indebolimento delle asserzioni e altre forme di mascheramento restano di competenza del controllo bloccante indipendente
`check:test-masking`.

### Job: `lint`

Viene eseguito su ogni PR verso `main`. In caso di errore, blocca il merge.

| Script (`npm run ...`)            | Convalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bloccante                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | La versione di Node.js rientra nell'intervallo supportato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                         |
| `check:test-tla-order`            | Nessun file `node:test` in `tests/unit` registra un test, incontra un `await` di primo livello e quindi registra altri test (#18045; meccanismo a cricchetto: `test-tla-order-allowlist.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sì                                         |
| `check:cycles`                    | Importazioni circolari nell'intero insieme di `src/` + `open-sse/` (basate sull'AST, con risoluzione dei `paths` di tsconfig). Il comando semplice termina con codice 1 ogni volta che esiste un ciclo (fail-closed dalla #15281) ed elenca le SCC. `check:cycles:ratchet` (eseguito dalla CI) blocca quando il conteggio supera il limite `metrics.cycles` in `quality-baseline.json` — attualmente 14, `direction: down`, quindi può solo diminuire (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì (meccanismo a cricchetto)               |
| `check:boundary`                  | Accoppiamento `open-sse → src`: importazioni univoche da file a file dal motore all'applicazione (`scripts/quality/measure-boundary.mjs`; l'elenco degli archi costituisce il backlog di correzione per la suddivisione core/moduli della v4). Comando semplice = report consultivo (come `quality:boundary`). `check:boundary:ratchet` (eseguito dalla CI e incluso anche nel ciclo a cricchetto dei controlli rapidi di `quality.yml`) blocca quando il conteggio supera il limite `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` — inizializzato al valore misurato di 771, `direction: down`; `--update` può solo ridurlo; relativo alla base nelle PR (`--base-ref`, vedere sotto)                                                                                                                                                                                                                                                                           | Sì (meccanismo a cricchetto)               |
| `check:route-validation:t06`      | Schemi Zod presenti in tutte le route (policy Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sì                                         |
| `check:any-budget:t11`            | Il conteggio di `@ts-expect-error // any` non supera il budget (catraca Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                         |
| `check:provider-consistency`      | Ogni provider in `providers.ts` ha una voce corrispondente in `providerRegistry.ts` (e viceversa, nell'ambito dell'allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `check:model-lifecycle`           | Le tre tabelle di routing gestite manualmente rimangono coerenti con lo snapshot del ciclo di vita incluso nel repository (#11503): `FITNESS_TABLE` (`taskFitness.ts`) non assegna un punteggio ad alcun id ritirato che `REGISTRY` può instradare; ogni destinazione di `BUILT_IN_ALIASES` è presente in `REGISTRY` e assente dallo snapshot degli id ritirati; ogni id ritirato ancora presente in `REGISTRY` viene inoltrato o elencato in `allowedRetiredInCatalog`; e nessuna origine o destinazione di `DEFAULT_DEGRADATION_MAP` risulta ritirata in tale snapshot. Ciò non dimostra che un modello sia attualmente servito da un upstream attivo. Offline — esegue il confronto con `config/quality/model-lifecycle.json`, aggiornato manualmente con `npm run quality:refresh-model-lifecycle` (rete; non integrato nella CI). `allowedRetiredInCatalog` è un meccanismo progressivo di riduzione: aggiungere una voce solo in presenza di un issue di tracciamento. | Sì                                         |
| `check:fetch-targets`             | Ogni `fetch("/api/...")` nel codice lato client in `src/` si risolve in un file `route.ts` reale                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                         |
| `check:deps`                      | Tutte le dipendenze installabili tramite `npm install` in ogni `package.json` del repository sono presenti in `dependency-allowlist.json`; i nuovi pacchetti senza versione fissata o soggetti a slopsquatting vengono segnalati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                         |
| `audit:deps`                      | Audit npm di tutti e cinque i lockfile indipendenti (root, Electron, plugin OpenCode v1/v2 e provider). Gli avvisi critici bloccano; gli avvisi di livello alto rimangono visibili come avvertimenti. Gli audit mancanti/non riusciti sono INCOMPLETI e bloccano; gli hash dei lockfile e i report per ambito vengono conservati.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sì                                         |
| `check:lockfile`                  | Integrità di `package-lock.json` — registry https, hash di integrità, nessun override dell'host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sì                                         |
| `check:licenses`                  | Elenco consentito di licenze SPDX per le dipendenze di produzione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sì                                         |
| `check:tracked-artifacts`         | Nessun artefatto di build / link simbolico `node_modules` sottoposto a commit (viene eseguito anche nel pre-commit di husky; il pre-push è intenzionalmente leggero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                         |
| `check:ai-attribution`            | Nessun trailer AI/bot `Co-Authored-By` o piè di pagina relativo alla generazione tramite AI nei commit, nel titolo o nel corpo della PR — Regola rigida n. 16 (nel ciclo dei controlli rapidi di `quality.yml` per PR→`release/**` — legge il payload dell'evento, non esegue alcuna operazione al di fuori delle PR — e in un passaggio riservato alle PR nel lint di `ci.yml` per PR→`main`; inoltre nell'hook `commit-msg` di husky; i coautori umani sono consentiti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Ogni esclusione Vitest indica un problema di tracciamento ed è presente in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sì                                         |
| `check:file-size`                 | I file sorgente (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) rimangono entro `cap` e i file di test (`*.test.ts(x)`) entro `testCap`; i file bloccati in `file-size-baseline.json` (`frozen` / `testFrozen`) non devono superare le dimensioni registrate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sì                                         |
| `check:error-helper`              | Le risposte di errore negli esecutori/handler utilizzano `buildErrorBody()` / `sanitizeErrorMessage()` (Regola rigida n. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                         |
| `check:migration-numbering`       | I file SQL di migrazione sono numerati in sequenza, senza intervalli o duplicati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                         |
| `check:public-creds`              | Nessun valore letterale OAuth `client_id`/`client_secret` o chiave Firebase Web al di fuori di `publicCreds.ts` (Regola rigida n. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sì                                         |
| `check:db-rules`                  | Nessuna istruzione SQL non elaborata al di fuori dei moduli `src/lib/db/`; nessuna importazione barrel da `localDb.ts` (Regole rigide n. 2/n. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                         |
| `check:known-symbols`             | Gli esecutori dei provider, le strategie di routing e i traduttori registrati nelle rispettive tabelle di dispatch corrispondono ai file presenti su disco, senza simboli orfani o non dichiarati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sì                                         |
| `check:route-guard-membership`    | Ogni route che genera un processo figlio è classificata da `isLocalOnlyPath()` (Regole rigide n. 15/n. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sì                                         |
| `check:test-discovery`            | Ogni file `*.test.ts` / `*.spec.ts` nel repository viene raccolto da almeno un test runner (meccanismo a cricchetto: l'elenco degli orfani in `test-discovery-baseline.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì                                         |
| `check:agent-skills-sync`         | Gli artefatti agent-skills generati corrispondono al catalogo sorgente (nessuna divergenza)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | I loghi/asset dei provider dispongono di una voce di provenienza registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | I file di configurazione JSON vengono analizzati correttamente e rispettano le regole di linting del repository                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | Compilazione TypeScript senza errori (solo avvisi consultivi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` rigoroso — orientato al futuro; molti punti di chiamata preesistenti necessitano ancora di annotazioni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitato a `src/app/(dashboard)/**` (#7033) — l'elenco selezionato di 27 file consentiti di `typecheck:core` non include alcun TSX della dashboard e neppure `next build` ne esegue il controllo dei tipi (`next.config.mjs` imposta `ignoreBuildErrors: true`), quindi le regressioni relative a identificatori orfani in tale area (#6625/#6909) erano invisibili alla CI. Confronta con una baseline congelata del conteggio per file/per codice TS (`config/quality/dashboard-typecheck-baseline.json`, stesso schema di verifica dell'obsolescenza di `check:known-symbols`) — solo i NUOVI errori oltre il conteggio registrato nella baseline fanno fallire il gate; ridurre progressivamente con `--update` quando viene corretto un errore preesistente.                                                                                                                                                                                                      | Sì                                         |

### Job: `quality-gate`

Viene eseguito dopo `test-coverage`. Blocca il merge in caso di errore.

| Script                       | Verifica                                                                                                                                                                                                                   | Bloccante                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Genera `quality-metrics.json` (conteggio degli avvisi ESLint, copertura dal report combinato degli shard)                                                                                                                  | Sì (a monte del ratchet) |
| `quality:ratchet`            | Nessuna metrica in `quality-baseline.json` è regredita (avvisi ESLint ≤ baseline; copertura ≥ baseline)                                                                                                                    | Sì                       |
| `check:duplication`          | La duplicazione del codice (jscpd@4) non supera la baseline in `quality-baseline.json`                                                                                                                                     | Sì                       |
| `check:complexity`           | La complessità ciclomatica a livello di file non supera il limite (regole ESLint core `complexity` + `max-lines-per-function`)                                                                                             | Sì                       |
| `check:cognitive-complexity` | Ratchet della complessità cognitiva (`eslint-plugin-sonarjs`) — passaggio ESLint separato; la CI li esegue entrambi, combinati nell'unico passaggio `check:complexity-ratchets`                                            | Sì                       |
| `check:dead-code`            | Il ratchet di esportazioni/file inutilizzati (knip) non regredisce rispetto alla baseline                                                                                                                                  | Sì                       |
| `check:compression-budget`   | Budget del benchmark di compressione — le soglie minime di risparmio dei token per motore non devono regredire                                                                                                             | Sì                       |
| `check:type-coverage`        | Il ratchet della percentuale di codice tipizzato (`type-coverage`) non regredisce; sostituisce in larga parte `typecheck:noimplicit:core`                                                                                  | Sì                       |
| `check:codeql-ratchet`       | Il numero di avvisi CodeQL aperti non regredisce (lettura tramite `gh api`; viene ignorato senza errori in assenza di token) — per la cadenza di aggiornamento e l'attivazione manuale, vedere "Ratchet CodeQL" di seguito | Sì                       |

### Job: `quality-extended`

Il job blocca i candidati applicabili. Le dimensioni del bundle, i segreti rilevati, le vulnerabilità
rilevate, i problemi rilevati nei workflow e le modifiche OpenAPI vengono controllati tramite ratchet obbligatori.
La diagnostica delle dipendenze circolari rimane consultiva. L'installazione degli scanner è obbligatoria:
`scripts/ci/install-quality-scanners.sh` installa le versioni bloccate e propaga
gli errori di installazione. Strumenti mancanti, report non validi o baseline mancanti lasciano
il gate dello scanner obbligatorio INCOMPLETO.

| Script                   | Verifica                                                                                                                                                                                                                                                            | Blocco                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Assenza di dipendenze circolari (dpdm)                                                                                                                                                                                                                              | **Consultivo**                                             |
| `check:bundle-size`      | La dimensione del bundle non supera il limite; una misurazione non disponibile causa un errore                                                                                                                                                                      | **Bloccante con --ratchet**                                |
| `check:secrets`          | I rilevamenti di Gitleaks non presentano regressioni; le scansioni obbligatorie rifiutano strumenti/codice sorgente/baseline mancanti, scansioni non riuscite e report non validi                                                                                   | **Bloccante con --ratchet**                                |
| `check:vuln-ratchet`     | Le vulnerabilità delle dipendenze non presentano regressioni; le scansioni obbligatorie rifiutano strumenti mancanti, report non validi o baseline mancanti                                                                                                         | **Bloccante con --ratchet**                                |
| `check:workflows`        | Lint dei workflow (actionlint + zizmor); scanner mancanti/non funzionanti, report non validi o baseline ratchet mancanti causano un errore come INCOMPLETE. I rilevamenti validi seguono la policy strict/advisory/ratchet selezionata                              | Esecuzione obbligatoria; ratchet zizmor bloccante nella CI |
| `check:openapi-breaking` | Contratto dell'API pubblica rispetto ai commit degli eventi fissati (merge-base della PR, stato precedente al push, base del merge group; per esecuzioni pianificate/manuali, primo parent del checkout); le misurazioni obbligatorie falliscono in modalità chiusa | **Bloccante con --ratchet**                                |

### Job: `docs-sync-strict`

Per le pull request verso `main` o `release/**`, questo job viene eseguito solo per i candidati che non sono bozze (o che provengono da una coda attendibile) e sono classificati come modifiche alla documentazione o al codice. Viene eseguito anche per gli eventi CI diversi dalle PR; il trigger push di questo workflow comprende solo `main`, non `release/**`. Un passaggio che termina con un codice di uscita diverso da zero blocca il job; i risultati solo informativi e le eccezioni documentate di seguito non lo bloccano.

| Script                         | Verifica                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blocco                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate che esegue sequenzialmente i 7 sotto-gate riportati di seguito                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì                                                                                                                                                         |
| ↳ `check:docs-sync`            | Coerenza delle versioni del pacchetto, di OpenAPI e di CHANGELOG, copie speculari esatte di `llm.txt`, invarianti delle sezioni e delle dimensioni del CHANGELOG tradotto e assenza di documenti duplicati ormai sostituiti                                                                                                                                                                                                                                                                                                                                                                            | Sì                                                                                                                                                         |
| ↳ `check:docs-frontmatter`     | Le pagine della documentazione compilata contengono titoli frontmatter validi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì                                                                                                                                                         |
| ↳ `check:docs-counts`          | Gli invarianti di conteggio ad alta affidabilità sono applicati rigorosamente; i controlli euristici del numero di file generano solo avvisi, a meno che lo script non riceva `--strict` (il meta-gate CI non lo passa)                                                                                                                                                                                                                                                                                                                                                                                | Il livello rigoroso è bloccante; il livello flessibile è consultivo                                                                                        |
| ↳ `check:env-doc-sync`         | Le letture delle variabili d'ambiente nel codice sorgente, `.env.example` e `docs/reference/ENVIRONMENT.md` concordano dopo l'applicazione degli elenchi espliciti di eccezioni per elementi ignorati, presenti solo nella documentazione e presenti solo nell'ambiente                                                                                                                                                                                                                                                                                                                                | Sì, al di fuori degli elenchi di eccezioni documentati                                                                                                     |
| ↳ `check:deprecated-versions`  | Segnala versioni potenzialmente obsolete al di fuori di contesti storici sicuri e date di aggiornamento obsolete, escludendo i documenti ignorati                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Consultivo nella configurazione CI attuale (`--strict` non viene passato)                                                                                  |
| ↳ `check:doc-links`            | I link markdown interni nella documentazione rimandano a file esistenti (formato `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                                                                                                                                         |
| ↳ `check:fabricated-docs`      | Le route, le variabili d'ambiente, i comandi CLI, i nomi degli hook e i percorsi dei file citati nella documentazione esistono nel codebase. Gate rigido tramite `--strict`; errore non bloccante senza flag.                                                                                                                                                                                                                                                                                                                                                                                          | Sì (tramite `--strict` nella CI)                                                                                                                           |
| `check:cli-i18n`               | Le chiavi di `t()` usate dalla CLI esistono in `en`; `pt-BR` conserva ogni sezione di primo livello; `zh-CN` e `zh-TW` contengono tutte le chiavi di `en`                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sì                                                                                                                                                         |
| `check:openapi-coverage`       | La specifica OpenAPI copre almeno una soglia minima, definita tramite ratchet, delle route reali                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sì                                                                                                                                                         |
| `check:openapi-security-tiers` | Le annotazioni dichiarate `x-loopback-only`/`x-always-protected` devono trovare riscontro in `routeGuard.ts`; gli errori del parser e le discrepanze del controllo diretto bloccano. Il controllo inverso dell'assenza di `x-loopback-only` sotto i prefissi riservati all'accesso locale genera avvisi, e le route definite solo tramite pattern sono escluse da tale passaggio inverso.                                                                                                                                                                                                              | I controlli del parser e diretti sono bloccanti; il controllo inverso è consultivo                                                                         |
| `check:openapi-routes`         | Ogni percorso `/api...` in `openapi.yaml` corrisponde a una route reale senza distinguere le differenze nei parametri, dopo l'applicazione dell'elenco di eccezioni giustificate `KNOWN_STALE_SPEC`; anche le voci obsolete dell'elenco causano un errore                                                                                                                                                                                                                                                                                                                                              | Sì                                                                                                                                                         |
| `check:docs-symbols`           | I riferimenti interni a URL `/api/...` nei documenti canonici che non sono copie speculari corrispondono a una route reale o a una famiglia di route; sono esclusi i riferimenti a proxy, sistemi a monte, segnaposto e file e le voci giustificate di `KNOWN_STALE_DOC_REFS`, mentre le voci obsolete dell'elenco di eccezioni causano un errore                                                                                                                                                                                                                                                      | Sì                                                                                                                                                         |
| `i18n translation drift`       | Controlla gli hash di origine/destinazione dei documenti principali e la provenienza della traduzione. Il confronto PR consente solo errori ereditati identici; le incoerenze nuove o non verificate relative a origine, destinazione mancante, hash di destinazione, traduzione obsoleta o cache delle sezioni bloccano. Al di fuori del confronto PR, gli errori di origine/destinazione mancante/hash di destinazione bloccano, mentre le traduzioni obsolete e le cache delle sezioni incoerenti restano solo avvisi. L'assenza di una cache delle sezioni nel formato precedente non è un errore. | Le divergenze nuove/non verificate nelle PR bloccano; le divergenze ereditate identiche sono avvisi; le regole fuori dalle PR dipendono dal tipo di errore |

### Job: `i18n-ui-coverage`

| Script                            | Verifica                                                                                                                                                                                                       | Bloccante     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | La copertura delle chiavi i18n dell'interfaccia utente è ≥ 65%                                                                                                                                                 | Sì            |
| `check-ui-value-drift` (inline)   | Un **valore** inglese riscritto non lascia traduzioni obsolete                                                                                                                                                 | Sì            |
| `check-new-key-coverage` (inline) | Una **nuova** chiave inglese è tradotta in ogni locale — un marcatore `__MISSING__:` viene rifiutato                                                                                                           | Sì            |
| `check-translation-ratio`         | Il rapporto di traduzioni reali per locale (voci identiche all'inglese / segnaposto / mancanti al di fuori dell'elenco consentito) non deve superare `config/quality/i18n-translation-baseline.json` + margine | **Bloccante** |

Richiede `fetch-depth: 0` — il gate di divergenza dei valori confronta `en.json` con la base di merge.

#### `check-ui-value-drift` — gate per le traduzioni obsolete

Rileva l'unica regressione i18n che gli altri gate non possono individuare strutturalmente: un valore inglese
viene riscritto e le traduzioni derivate dall'inglese _precedente_ rimangono invariate, perciò
gli utenti non anglofoni continuano a leggere testi formulati con sicurezza ma ormai errati.

Questo problema è arrivato realmente in produzione. `oauthModal.googleOAuthWarning` è stato riscritto quando è stato
introdotto l'helper di accesso Antigravity (#5203); **39 locale su 43** hanno mantenuto il testo che indicava agli operatori di "copiare
l'URL completo e incollarlo qui sotto" — un flusso che non può essere completato per quel provider. È passato
inosservato fino alla #8463 perché:

- `sync-ui-keys` inserisce solo le chiavi **assenti**, mai quelle **obsolete**;
- `check-ui-keys-coverage` conta la _presenza_ delle chiavi, quindi una traduzione obsoleta viene considerata coperta;
- `check-translation-drift` tiene traccia delle copie della documentazione in `docs/i18n/<locale>/**.md` —
  non legge mai `src/i18n/messages/*.json`. Bloccante nel job `docs-sync-strict` dalla
  risincronizzazione 2026-09: modifica un documento principale → `npm run i18n:run -- --files=<doc>` (a livello di sezione, poco costoso).

**Basato sulle differenze, non su una baseline.** Confronta `en.json` alla base di merge con l'albero
di lavoro; per ogni chiave il cui valore inglese è cambiato, qualsiasi locale che conservi una
traduzione non modificata è obsoleto. Questo approccio **congela deliberatamente il debito preesistente** — una differenza
non può rivelare da quale vecchio testo inglese derivi una traduzione esistente da tempo, quindi il gate valuta
solo ciò che viene modificato dalla variazione corrente. L'alternativa (una baseline di hash per chiave) richiederebbe
un file generato di circa 600 KB, 3 volte più grande della maggiore baseline esistente, modificato a ogni PR i18n.

Esistono due modi per soddisfarlo:

1. aggiornare le traduzioni interessate, oppure
2. impostarle su `__MISSING__:<new english>` — il runtime restituisce quindi l'inglese corretto
   (`src/i18n/request.ts::deepMergeFallback`, #7258) e la chiave viene accodata per la traduzione.

Se è cambiato il **significato** della stringa, è preferibile **rinominare la chiave**: una nuova chiave non può ereditare
una traduzione obsoleta. È il modello utilizzato dalla #8463.

```bash
npm run i18n:check-value-drift          # rigoroso (quello eseguito dalla CI)
npm run i18n:check-value-drift:warn     # solo report
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

I gate per la deriva dei valori e per le nuove chiavi condividono un unico confronto immutabile da
`scripts/i18n/resolve-ui-diff-base.mjs`. Il workflow passa a entrambi i controlli gli stessi SHA di base, punta della base e
candidato. Le esecuzioni per PR/retargeting della base, push e merge group utilizzano il relativo contesto
dell'evento. L'esecuzione manuale su un branch candidato richiede la relativa PR aperta esatta oppure l'input esplicito
`i18n_base_sha`. L'esecuzione manuale o pianificata dell'osservazione di `main` o `release/vX.Y.Z`
senza tale input confronta l'ultimo commit con il suo primo genitore; non costituisce un audit di
tutto il debito di traduzione ereditato. L'invocazione locale richiede una base di confronto esplicita,
ad esempio il comando `BASE_REF` riportato sopra.

Un contesto di confronto mancante o ambiguo, un catalogo obbligatorio illeggibile o non valido e
un candidato modificato producono `INCOMPLETE` con codice di uscita **2**, anche in modalità di avviso.
La lettura dei cataloghi utilizza `scripts/i18n/read-ui-catalog.mjs`; gli errori di lettura non vengono sostituiti
con oggetti vuoti. Né una base non disponibile né un input incompleto determinano PASS.

### Job: `i18n`

Matrice completa di convalida i18n (un job per locale). L'intero job è consultivo.

| Script                          | Verifica                                | Bloccante                                                  |
| ------------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Completezza della traduzione per locale | **Consultivo** (`continue-on-error: true` sull'intero job) |

### Job: `pr-test-policy`

Viene eseguito solo sulle pull request.

| Script                 | Verifica                                                                                                                                                     | Bloccante |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | Le PR che modificano il codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/` devono includere o aggiornare i test (Regola rigida n. 8)          | Sì        |
| `check:test-masking`   | I file di test modificati non riducono il numero netto di assert né aggiungono tautologie `assert.ok(true)`                                                  | Sì        |
| `check:pr-evidence`    | Il corpo della PR cita prove relative ai test/VPS per la modifica (automatizza la Regola rigida n. 18 cercando nel testo della PR — fragile, vedere Backlog) | Sì        |

### Job: `test-vitest`

Richiede il job di classificazione `changes`. Gli shard applicabili della matrice bloccano il merge in caso di errore.

| Suite            | Verifica                                                     | Bloccante                                                                                                                               |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 strumenti), autoCombo, cache — runner vitest | Sì                                                                                                                                      |
| `test:vitest:ui` | Test dei componenti UI — runner vitest                       | **Bloccante** — gli errori preesistenti sono esplicitamente esclusi in `vitest.config.ts`; i nuovi errori causano il fallimento del job |

### Workflow notturni (pianificati, consultivi)

Vengono eseguiti in base a una pianificazione cron (e tramite `workflow_dispatch`), mai nelle PR. Sono tutti consultivi.

| Workflow               | Verifica                                                                                                                                                                            | Bloccante      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Test basati sulle proprietà con fast-check, con un seed casuale e un numero elevato di esecuzioni                                                                                   | **Consultivo** |
| `nightly-resilience`   | Controllo della crescita dell'heap, iniezione caotica di errori, test di carico/soak con k6                                                                                         | **Consultivo** |
| `nightly-llm-security` | Protezione dalle injection con promptfoo (modalità blocco) + probe garak (ignorati in assenza del secret di un provider)                                                            | **Consultivo** |
| `nightly-schemathesis` | Fuzzing del contratto OpenAPI (schemathesis) su un'istanza OmniRoute attiva usando `docs/openapi.yaml` — evidenzia violazioni della specifica / errori 500 non gestiti (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Punteggio dei test di mutazione Stryker sulla corsia rapida dei test unitari — i mutanti sopravvissuti evidenziano asserzioni deboli                                                | **Consultivo** |
| `nightly-compat`       | Matrice di compatibilità del motore Node per gli intervalli `engines.node` supportati                                                                                               | **Consultivo** |

Le baseline delle prestazioni (heap, TTFB, tempo di build) vengono registrate, ma non usate come criterio di blocco: vedere [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fase di velocità (2026-08-30 → v4.0 LTS): ogni baseline allentata del 20%

Decisione del responsabile (2026-08-30): fino alla modularizzazione della v4.0, la velocità di rilascio è più importante
del contenimento del debito. Ogni baseline **numerica** del ratchet è stata allentata del 20% in un'unica
operazione verificabile e la fase è dichiarata in `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Cosa è cambiato                                                                                                                                                                                                                                                          | Dove                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — conteggi in cui un valore inferiore è migliore ×1,2, percentuali in cui un valore superiore è migliore ÷1,2 (soglia minima di copertura mantenuta a 60, `eslintErrors` resta 0, `eslintWarnings` 0 → 20% del conteggio congelato delle soppressioni) | `quality-baseline.json` (la nota `_relax_velocity_2026_08_30` elenca ogni valore precedente → successivo) |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                                                         | `complexity-baseline.json`, `duplication-baseline.json`                                                   |
| `cap`, `testCap`, ogni limite di righe `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                                                                | `file-size-baseline.json`                                                                                 |
| conteggi per file / per codice TS ×1,2                                                                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`    |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                      | `scripts/check/check-openapi-coverage.mjs`                                                                |
| `--require-tighten` diventa consultivo quando `_policy.requireTighten === false`                                                                                                                                                                                         | `scripts/quality/check-quality-ratchet.mjs`                                                               |
| Il processo notturno `bank-ratchet-shrinks` viene sospeso (registrerebbe la riduzione misurata, annullando il margine disponibile)                                                                                                                                       | `.github/workflows/nightly-release-green.yml`                                                             |

Le allowlist (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **non** sono budget e non sono state modificate. I gate delle policy superato/non superato (segreti, regole SQL,
contratto docs/ambiente, parità i18n, test unitari) restano invariati: un test non superato rimane tale.

**Strumenti**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — l'allentamento
  una tantum (`scripts/quality/relax-baselines.mjs`); rifiuta di essere eseguito due volte con la
  stessa nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  misura ogni gate numerico nello stesso modo della CI e mostra il margine rimanente per ciascun gate
  (`scripts/quality/baseline-headroom.mjs`). Il job notturno `baseline-headroom` pubblica
  la tabella nel riepilogo dell'esecuzione del workflow e carica il relativo report JSON/Markdown come
  `baseline-headroom-<run_id>`, conservandolo per 90 giorni. Le righe di avviso e critiche identificano i gate
  che si trovano entro il 10% dal proprio limite o che lo hanno già superato. Esaminare questi report come
  segnale preventivo del consumo dei budget; controllare le note `_rebaseline_*` del gate interessato. Il job non
  crea né aggiorna più un'issue permanente; #12149 conserva la cronologia dei report precedenti.

**Modalità nuovo codice (Clean-as-You-Code) — dal 2026-08-30, solo percorso rapido delle PR**

Negli eventi `pull_request`, `quality.yml` passa `--base-ref <PR base SHA>` a `check:file-size`,
`check:complexity-ratchets` e `check:dead-code`. Per `check:complexity-ratchets` e
`check:dead-code`, il gate confronta HEAD con la merge-base **limitatamente ai file modificati dalla PR**
(`scripts/check/newCodeMode.mjs`: la merge-base viene materializzata in un
`git worktree` temporaneo, ESLint/knip vengono eseguiti sia lì sia su HEAD e i conteggi per file vengono confrontati):

- **bloccante** — la PR ha aggiunto violazioni di complessità ciclomatica/cognitiva o export inutilizzati nei file modificati
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` nel log);
- **consultivo** — il totale globale rispetto alla baseline congelata. La deriva ereditata non contrassegna mai in rosso una
  PR innocente; la deriva viene monitorata per essere corretta durante la riconciliazione della release e sorvegliata dal
  job di headroom.

`check:file-size` usa il riferimento base secondo le proprie regole (`scripts/check/check-file-size.mjs`, #8522):
controlla ogni file sorgente e di test nell'albero, legge il conteggio delle righe di ciascuno alla base della PR
con `git show` e segnala un errore per un file solo quando questo supera il maggiore tra il limite della propria baseline
(`frozen` / `testFrozen`, oppure `cap` / `testCap` per un file esterno alla baseline) e la propria
dimensione di base. Di conseguenza, un file che presentava già una deriva nella base non rende mai rossa una PR non responsabile.

`check:boundary:ratchet` applica la stessa regola al suo unico valore numerico
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): negli eventi PR, sia i fast gate di
`quality.yml` sia il job di lint di `ci.yml` passano lo SHA di base della PR, il commit di base viene
misurato a partire da un'esportazione `git archive` e la PR fallisce solo quando il numero di archi
`open-sse → src` supera il maggiore tra `metrics.boundaryOpenSseToSrc` e il conteggio sulla base. Una
deriva della base oltre il limite viene segnalata (`base drift herdado`), ma non rende mai rossa una
PR che non ne è responsabile; push → main mantiene il limite assoluto e, se lo SHA di base non è
risolvibile, vi ricorre come fallback con un avviso.

Le esecuzioni `workflow_dispatch`, la verifica completa release-green e il job notturno per
l'headroom non hanno una base PR e mantengono il confronto assoluto (globale). Copertura,
duplicazione e copertura dei tipi restano per ora globali (i relativi strumenti non producono a
basso costo un diff per file): sono candidate allo stesso trattamento.

**Chiusura della fase alla v4.0 (LTS = più rigorosa di prima, non "ritorno alla normalità")**

1. Sul tip puro di `release/v4.0.0`: eseguire `npm run quality:headroom --json` per registrare i
   risultati, quindi `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` e l'opzione
   `--update` di ogni gate di typecheck: ogni baseline scende al valore misurato.
2. Eliminare `_policy` da `quality-baseline.json` (riattiva `--require-tighten` e
   l'accantonamento notturno), ripristinare `THRESHOLD = 36` (o un valore superiore) in
   `check-openapi-coverage.mjs`.
3. Rendere i limiti più rigorosi rispetto ai valori misurati dove la modularizzazione ha dato
   risultati: riportare il `cap` delle dimensioni dei file a 1000 (o 800), aumentare di 5 le soglie
   minime di copertura, impostare a 0 le esportazioni inutilizzate per i pacchetti modularizzati.

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

## Policy della allowlist

Ogni gate che non può fallire a causa di violazioni preesistenti utilizza una allowlist bloccata
(ad esempio, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La policy è:

**Correggi la causa principale; usa la allowlist solo quando la violazione è preesistente e
non può essere corretta nella stessa PR.**

Quando aggiungi una voce a una allowlist:

1. Includi un commento con la giustificazione.
2. Fai riferimento all'issue di tracciamento (ad esempio, `// #3498 — Phase 2 feature, not yet implemented`).
3. Rimuovi la voce nella stessa PR che corregge la violazione: una voce obsoleta che non
   sopprime più una violazione attiva costituisce essa stessa un difetto (il controllo
   stale-enforcement 6A.3 farà fallire il gate in presenza di una voce orfana nella allowlist,
   una volta implementato).

**Non** aggiungere voci alla allowlist per far superare più rapidamente i test. Un gate superato
con una allowlist in crescita offre un falso senso di qualità.

### Quando un gate fallisce nella tua PR

1. **Leggi attentamente l'output del gate**: indica esattamente quale file o simbolo ha violato
   la regola.
2. **Correggi la violazione**: la maggior parte dei gate consiste in controlli deterministici del filesystem che vengono superati non appena
   il codice è corretto.
3. **Se la violazione è preesistente** (ovvero, non l'hai introdotta tu, ma ora il gate
   la copre): aggiungi una voce alla allowlist con un commento di giustificazione e un'issue di tracciamento.
4. **Se il gate è un ratchet** (copertura, avvisi ESLint, duplicazione, complessità):
   la tua modifica ha peggiorato la metrica. Correggi il problema sottostante oppure, raramente, esegui
   `npm run quality:ratchet -- --update` se la modifica è intenzionale e il peggioramento
   della metrica è accettabile; documentane comunque il motivo nella descrizione della PR.
5. **I gate consultivi** (`continue-on-error: true`) sono informativi: non bloccano
   il merge, ma vengono visualizzati nel riepilogo della CI. Correggili comunque.

---

## Aggiunta di un nuovo gate

1. Creare `scripts/check/check-<name>.mjs` (oppure `.ts`). I gate dei criteri terminano con 0/1.
   I gate di tipo ratchet emettono una metrica in `quality-metrics.json` tramite `collect-metrics.mjs`.
2. Aggiungi `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json` e
   sincronizza l'alias e il relativo comando esatto in `config/quality/gate-manifest.json`.
   Applica la stessa sincronizzazione quando modifichi o rimuovi un alias di validazione esistente.
   Esegui `npm run check:gate-manifest`; l'hook pre-commit e la classificazione delle modifiche della CI
   applicano questo contratto.
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

## Backlog di razionalizzazione (revisione del ROI — Fase 9 Onda 3)

Questo inventario è stato riconciliato con `ci.yml` il 2026-06-17 (la versione precedente ometteva
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Una revisione del ROI dell'insieme riconciliato
ha identificato i seguenti candidati alla razionalizzazione. **Le unificazioni sono modifiche
meccaniche alla CI; le attivazioni/rimozioni sono decisioni di policy riservate all'operatore.**
Nulla di quanto segue è stato ancora applicato.

**Non documentati anche sopra** (consultivi, segnale debole): il job `docs-lint`
(markdownlint + Vale, intero job con `continue-on-error`) e i workflow autonomi degli scanner
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` è presente in
`quality-baseline.json`, ma non è collegato a un ratchet bloccante in `ci.yml`: la metrica è
attualmente orfana.

### Unificazione / deduplicazione (meccanica, rischio inferiore)

Ogni candidato è stato convalidato rispetto allo stato effettivo dei gate il 2026-06-17
(verifica basata sulla fiducia); diverse unificazioni "ovvie" si sono rivelate nascondere
debito e **non** sono sostituzioni dirette e pulite.

- **`check:docs-sync` viene eseguito due volte** — autonomamente nel job `lint` e nuovamente all'interno di `check:docs-all` (`docs-sync-strict`) e dell'hook pre-commit di husky. ✅ **COMPLETATO** — invocazione autonoma in `lint` rimossa.
- **Scansione delle CVE** — ❌ **NON è un'unificazione pulita.** `audit:deps` blocca gli avvisi critici e gli audit incompleti in tutti e cinque i lockfile, segnalando gli avvisi di livello alto come warning secondo la policy attuale; `check:vuln-ratchet` (osv) fallisce solo in caso di _regressione_ rispetto alla baseline inclusa nel repository e rifiuta le misurazioni mancanti quando sono obbligatorie. Semantiche diverse: la rimozione di `audit:deps` eliminerebbe il gate assoluto per le criticità e le attestazioni indipendenti degli audit dei pacchetti. Mantenerli entrambi.
- **Rilevamento dei cicli** — ✅ **COMPLETATO** (#15159 G-01/G-02). Il testo precedente definiva `check:cycles` il gate "verde e curato" e giustificava il suo mantenimento come bloccante perché `check:circular-deps` (dpdm) segnalava 91 cicli. Quel verde era un **falso positivo**: `check:cycles` analizzava 5 sottodirectory (450 file), rilevava solo gli `import|export … from` statici ed escludeva ogni specificatore `@/` e `@omniroute/open-sse/`, quindi non poteva rilevare i cicli con import dinamici e alias che predominavano nel repository. Corretto: ora il gate attraversa `src` + `open-sse` (5023 file), raccoglie gli specificatori dall'AST TypeScript (quindi `import("…")` viene conteggiato, mentre `typeof import("…")` in posizione di tipo no) e risolve i `paths` di tsconfig. Trova **14** cicli, non 0. Poiché 14 cicli preesistenti non possono essere risolti in una PR relativa ai gate, `check:cycles` ora è un **ratchet** (`--ratchet`, limite massimo `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`): blocca qualsiasi _regressione_ e il conteggio può solo diminuire. La CI esegue `npm run check:cycles:ratchet`. La riduzione progressiva procede con **A-01**. `check:circular-deps` (dpdm) rimane consultivo come secondo parere più ampio.
- **Complessità** — ✅ **COMPLETATO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): un'unica scansione ESLint, con conteggi per ruleId affinché le baseline di complessità ciclomatica+numero massimo di righe e di complessità cognitiva rimangano indipendenti; i singoli `check:complexity` / `check:cognitive-complexity` restano disponibili per l'uso locale con `--update`.
- **Anti-allucinazione per `/api`** — ✅ **COMPLETATO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un unico inventario del file system di `src/app/api`; openapi-routes + docs-symbols continuano a produrre segnalazioni indipendenti; i controlli individuali restano disponibili per le esecuzioni locali.
- **`check:node-runtime` viene eseguito in 11 job** — ⚠️ **ROI basso.** Ciascuno usa un runner separato e il controllo richiede meno di 1 s; risparmio totale di circa 10 s, a fronte della perdita di una protezione economica per ogni job. Non vale la pena introdurre queste modifiche.
- **`typecheck:noimplicit:core` nel lint della CI** — ✅ **rimosso dal job lint** (era consultivo tramite `continue-on-error`); la superficie di tipi bloccante è `typecheck:core` + `check:type-coverage`. Script locale mantenuto.

### Attivare / decidere (policy dell'operatore)

- `check:openapi-security-tiers` (consultivo) — ❌ **NON può essere reso bloccante senza interventi preliminari.** Termina con codice 0, ma avverte che diverse route di `traffic-inspector` sotto `LOCAL_ONLY_API_PREFIXES` non dispongono dell'annotazione `x-loopback-only: true`. Per renderlo obbligatorio occorre prima aggiungere tali annotazioni a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — ampiamente sostituito dal ratchet bloccante `check:type-coverage`. Convertirlo in ratchet oppure rimuovere il secondo passaggio `tsc` ridondante.
- `test:vitest:ui` (ora **bloccante**) — gli errori preesistenti sono esplicitamente esclusi in `vitest.config.ts` tramite commenti di tracciamento `// #8618`; i nuovi errori causano il fallimento del job.
- `check:secrets` (gitleaks, ratchet bloccante) — il limite massimo corrente è `metrics.secretFindings` in `quality-baseline.json`. Ogni eccezione richiede una voce giustificata in `.gitleaks.toml`; una misurazione non disponibile è INCOMPLETA. La scansione integra la scansione nativa dei segreti di GitHub e `check:public-creds`.
- `check:pr-evidence` (bloccante, esegue grep sul testo del corpo della PR) — rischio elevato di falsi positivi; la sua rimozione indebolirebbe l'applicazione della Regola rigida n. 18, quindi si tratta di un'effettiva decisione di policy.
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
