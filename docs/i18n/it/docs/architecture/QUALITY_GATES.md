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

I flussi di lavoro CI e Quality Gates emettono ciascuno un verdetto stabile: `Gate / CI` e `Gate / Quality`. La loro politica di ammissione con versione enumera ogni lavoro a monte come richiesto o consultivo. Un lavoro richiesto applicabile deve avere esito positivo: i risultati mancanti, annullati, saltati, in sospeso e sconosciuti non possono stabilire PASS. Una classificazione valida solo per documenti o solo catalogo può rendere inapplicabile una corsia di codice; un progetto ordinario PR non è un candidato accettato. Un'etichetta `hotfix` non rinuncia alla prova.

Entrambi i flussi di lavoro coprono PRs nei rami main/release, push a `main`, invio manuale ed eventi di unione di gruppi. Push, dispatch e merge-group eseguono la selezione completa. Una bozza di coda Mergify affidabile esegue anche lavori `full-code`/`full-code-e2e` applicabili; PRs ordinario saltali. Prima di un'unione manuale, esegui un invio completo sul candidato esatto. I push a `release/**` non avviano questi flussi di lavoro; Release-Green osserva separatamente la base accorpata (corsia `docs/ops/RUNNER_BOX.md` → Hosted). I fork e i gruppi di unione utilizzano corridori ospitati per lavori che altrimenti selezionerebbero corridori self-hosted; La capacità ospitata sufficiente deve essere verificata prima dell'implementazione.

Un normale PR esegue la selezione rapida. Le corsie `full-code` e `full-code-e2e` della politica di ammissione (E2E, integrazione, artefatto del pacchetto, fumo Electron, Bun SQLite, client dell'ecosistema e del protocollo) vengono eseguite solo su una bozza della coda Mergify o su un'esecuzione completa: `gh workflow run ci.yml --ref <branch>`.

Ogni ricevuta JSON identifica lo SHA estratto, l'esecuzione del flusso di lavoro e il tentativo. Lo CLI rifiuta una mancata corrispondenza checkout/event SHA. I test del flusso di lavoro vincolano l'appartenenza alla policy all'elenco `needs` del processo di verdetto in modo che una corsia nuova o rimossa non possa scomparire silenziosamente. Le ricevute coprono il proprio flusso di lavoro, non la pubblicazione, la distribuzione o gli aspetti interni di uno scanner consultivo esistente. Effettuare i controlli applicabili richiesti dalle norme delle filiali costituisce una modifica amministrativa separata; definire il proprio lavoro non protegge di per sé una filiale.

`API Route Typecheck` è un controllo del flusso di lavoro indipendente, al di fuori sia dei verdetti aggregati che del profilo statico completo dell'osservatore locale. Ispezionare il suo risultato separatamente per il candidato esatto. `.github/workflows/api-route-typecheck.yml` viene eseguito su PRs in `main` o `release/**`, esegue il push su entrambe le famiglie di rami, invio manuale ed eventi `merge_group` di tipo `checks_requested`. Non ha alcun filtro del percorso. Unisci i gruppi controlla `merge_group.head_sha`; altri eventi controlla `github.sha`. Tutti gli eventi utilizzano gli stessi test del gate diagnostico API e dell'unità di gate. I retarget di base PR richiedono un nuovo controllo; Le modifiche body/title utilizzano il nome di sola osservazione `Admission not requested / API Route Typecheck` e non possono sostituire il controllo di ammissione.

### Prove conservate nel riduttore di accettazione

`scripts/quality/validate-release-acceptance.mjs` riduce un piano fornito e i suoi manifesti; non stabilisce che il piano copra l'intero percorso di rilascio. I suoi rapporti impostano esplicitamente `releaseAcceptance: false`, anche quando quel piano è `VERIFIED`. Il flusso di lavoro `release-acceptance.yml` utilizza ancora dispositivi ombra, non ricevute di build, pacchetti, avvio o promozioni reali.

La CLI richiede `--evidence-root` di verificare le prove conservate. I file vengono risolti come `<evidence-root>/<artifact_id>/<member>` e sottoposti ad hashing come SHA-256. Un record PASS senza prove, un file mancante o modificato, un percorso non sicuro o un collegamento simbolico impediscono la verifica. I file mancanti non equivalgono a svuotare i log riusciti. I controlli SHA/run/attempt esistenti rimangono indipendenti: i byte corrispondenti non possono salvare una ricevuta scaduta. L'integrità del file non è una prova dell'autenticità dell'esecuzione o della promozione degli artefatti.

### DAST utilizza la build CI verificata

Il lavoro `dast-smoke` CI richiesto richiama `.github/workflows/dast-smoke.yml` dopo `build`. Segue la stessa selezione code/draft della build, inclusi il fork PRs supportato, PRs di destinazione del rilascio e i gruppi di unione. Un lavoro DAST mancante, non riuscito, annullato o saltato inaspettatamente blocca `Gate / CI`. Il flusso di lavoro riutilizzabile non ha un trigger PR/dispatch indipendente; la convalida manuale utilizza l'invio di CI in modo che build e consumer rimangano in un'unica esecuzione.

`scripts/ci/next-build-provenance.mjs` sigilla l'intero artefatto Next con il suo tar digest, repository/event/run, tentativo del produttore, head/base/checkout/tree, identità del flusso di lavoro, file di blocco, nodo esatto version/ABI, piattaforma e bundler. DAST seleziona l'artefatto immutabile ID da `needs.build.outputs`, richiede la verifica del digest del download e esegue in modo indipendente l'hashing ZIP rispetto al digest del produttore prima di estrarre i suoi due membri consentiti tramite `scripts/ci/unpack-ci-build.py`. Il manifest e l'archivio tar devono inoltre corrispondere agli output del produttore indipendente prima che venga estratto l'albero Next. Non cerca mai l'ultima build di ramo riuscita. Una ripetizione parziale può riutilizzare lo stesso tentativo del produttore quando il suo ID e tutti gli input corrispondono ancora; la ricevuta registra entrambi i tentativi.

Il consumatore rimane su un runner Linux ospitato con autorizzazione del repository di sola lettura e senza segreti del repository. Installa l'esatta versione del nodo del produttore, quindi assembla CLI con `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rifiuta un server autonomo mancante prima di qualsiasi build di fallback; le normali build CLI locali mantengono il fallback esistente. La disponibilità del server, Schemathesis e promptfoo devono tutti avere esito positivo entro il limite di lavoro invariato di 25 minuti. Una ricevuta di provenienza dimostra l'identità e i byte dell'input, non una scansione DAST riuscita. La scadenza dell'artefatto, l'interruzione del corridore o uno scanner fallito rimangono prove incomplete o fallite; non può diventare PASS attraverso un wrapper consultivo.

### Capacità di esecuzione UI

CI esegue l'intero inventario UI come quattro frammenti di matrice `test-vitest`, ciascuno con un massimo di due lavoratori per frammento e la scadenza del lavoro esistente di 15 minuti. Il primo frammento esegue anche la suite MCP/autoCombo Vitest. Il risultato del lavoro richiesto copre ogni gamba della matrice; il fallimento o la cancellazione di uno shard non può stabilire l'ammissione del candidato.

L'osservatore notturno conserva una ricevuta separata del candidato esatto per ogni frammento UI, inclusa l'esecuzione MCP nella prima ricevuta. Sono obbligatori tutte e quattro le ricevute, i registri e le identità di esecuzione corrispondenti. `npm run test:vitest:ui` locale seleziona comunque la suite completa; una corsa `--shard` è solo una prova parziale.

### Raccolta copertura unitaria

I dodici frammenti di unità raccolgono la copertura V8 durante l'esecuzione del test esistente. Uno shard eseguito con successo esegue `scripts/ci/compact-v8-coverage.mjs` per comprimere i file originali senza generare un report Istanbul intermedio. Il lavoro di copertura finale verifica tutti e dodici i manifest rispetto al candidato SHA, al runtime, alla radice di origine e agli hash dei dati, quindi esegue i reporter di c8 e le soglie di copertura esistenti. Gli input mantengono l'ordine globale dei nomi file di c8; La pre-unione per frammento non è sicura per la copertura function/block mista. I frammenti mancanti, malformati o incompatibili non vengono ammessi. I frammenti di test non riusciti mantengono la copertura diagnostica grezza separatamente; non può entrare nella fusione finale.

### Ricevute di avanzamento dell'esecuzione dell'unità

Il comando `test:unit:ci:shard` condiviso registra le fasi `primary`, `dashboard` e `serial` tramite `scripts/ci/unit-progress-reporter.mjs`. Il normale rapporto di prova rimane disponibile. Una ricevuta separata di soli metadati registra l'inizio e il completamento di ogni file e un battito cardiaco di 30 secondi elenca i file ancora attivi e il tempo trascorso. Registra solo i metadati di esecuzione consentiti; le descrizioni dei test, l'output, i corpi degli errori e l'ambiente completo non sono serializzati.

CI conserva i file JSONL come `unit-progress-ci-<run>-<attempt>-<shard>`. Un timeout del lavoro può impedire il caricamento successivo; i battiti cardiaci già emessi restano evidenza diagnostica. Gli heartbeat mancanti possono anche riflettere un processo runner bloccato o terminato. Queste ricevute preservano la selezione dei test, la concorrenza, le scadenze e lo stato di uscita esistenti; non sono verdetti di ammissione dei candidati.

### Unisci coda

L'etichetta `queue` invia un PR alla coda Mergify (`.mergify.yml`). Mergify apre una bozza PR su un ramo `mergify/merge-queue/`, CI esegue lì la selezione completa e lo PR originale si unisce quando `Gate / CI`, `Gate / Quality` e `Merge integrity (changelog + generated skills)` passano.

Mergify scrive il riepilogo della coda nella descrizione della bozza. Gli eventi Body/title-only `pull_request` `edited` utilizzano un gruppo di concorrenza specifico per l'esecuzione e non eseguono nuovamente la classificazione, testano le matrici, integrano l'integrità o il verdetto di ammissione. I nomi dei controlli di sola osservazione non possono sostituire `Gate / CI` o `Gate / Quality`. Una modifica che cambia la base di destinazione richiede una nuova convalida del candidato.

Dopo una rimozione dalla coda, un push non sempre riaccoda lo PR. Commenta `@mergifyio queue`.

### Inventario di scansione statico

L'inventario con versione npm-alias e l'appartenenza alla scansione statica risiedono in `config/quality/gate-manifest.json`. Esegui `npm run check:gate-manifest` per convalidare i nomi degli script e i comandi esatti rispetto `package.json`; aggiunte, rimozioni e deriva dei comandi falliscono sia l'hook locale che i lavori di classificazione delle modifiche in CI. Un alias non è un lavoro del flusso di lavoro, un'istanza di matrice o un caso di test: questi conteggi non devono essere presentati come intercambiabili.

Utilizza `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list` per ispezionare gli alias selezionati senza eseguirli. Il runner richiama il punto di ingresso npm, quindi il suo runtime (incluso Bun dove configurato) viene preservato. Il manifest registra gli alias esterni a tali profili come richiamati separatamente e i comandi di manutenzione sono vietati nei profili di scansione di sola lettura.

Questi profili coprono solo la scansione statica. Non certificano test del prodotto, copertura, imballaggio, controlli esterni o la completa accettazione del rilascio da parte del candidato. L'ammissione al flusso di lavoro utilizza `config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs` collegati. I profili dell'osservatore del rilascio rimangono separati; ispezionare in modo indipendente gli assegni e le ricevute applicabili. I comandi statici completi dell'osservatore sono dichiarati in `config/quality/release-green-static-profile.json`, inclusi `audit:deps`, selezione del test di mutazione e controlli di traduzione. Il caricatore convalida i comandi npm rispetto package.json e alle dichiarazioni CI/Quality modellate; rifiuta la deriva invece di eseguire i token della shell come argomenti. L'output SKIP/INCOMPLETE dello scanner richiesto non può stabilire PASS. Il profilo registra le sue esclusioni esterne e non sostituisce la copertura ospitata, le matrici di test, i pacchetti o le prove di distribuzione. L'inventario in prosa riportato di seguito è un riferimento, non una prova che un cancello funzionasse effettivamente.

Gli script vivono sotto `scripts/check/` (policy gates) e `scripts/quality/` (ratchet engine). La fonte della verità CI è `.github/workflows/ci.yml`.

### Integrità della documentazione su base pubblicata

`.github/workflows/i18n-base-health.yml` osserva lo stato della documentazione dopo gli invii selezionati a `main` e `release/v*` e all'invio manuale. I suoi filtri coprono la documentazione, root Markdown, `llm.txt`, traduzione state/configuration e i relativi strumenti i18n. Il singolo lavoro `Published base documentation health` utilizza Ubuntu ospitato e una scadenza di cinque minuti. Esegue la convalida di sola lettura e scrive una ricevuta diagnostica senza installazione di dipendenze, traduzione o adozione dello stato.

`scripts/i18n/check-base-health.mjs` richiede zero incoerenze di hash di origine, destinazione mancante, hash di destinazione, traduzione obsoleta e cache di sezione. Convalida inoltre l'attuale ambito document/locale principale e la sua provenienza registrata. Un contesto non valido, una copertura incompleta o un controllore interrotto producono `INCOMPLETE`; la deriva confermata produce `FAIL`. Entrambi restituiscono uno stato di uscita non riuscito. La ricevuta è destinata al checkout SHA, al flusso di lavoro, all'esecuzione e al tentativo e viene conservata come `i18n-base-health-<sha>-<run>-<attempt>`.

Questa è un'osservazione indipendente della base pubblicata. Non aggiunge un evento PR o di unione di gruppi, un controllo PR richiesto, un alias npm o un membro del profilo di scansione statica. Il controllore sottostante blocca anche tutte e cinque le classi in modalità assoluta. La preparazione ordinaria PR resta separata dall'ammissione. Un caricamento riuscito non può trasformare un risultato di integrità non riuscito in PASS.

Un PR ordinario utilizza `--preflight` con un report di base generato da `--baseline-evidence`. Potrebbe lasciare una fonte inglese in sospeso solo quando il record di traduzione completo e i byte di destinazione effettivi rimangono invariati rispetto a quella base esatta. Le nuove incoerenze della cache di destinazione o di sezione continuano a bloccarsi e le prove incomplete non possono autorizzare la preparazione. Il rapporto espone `preparationPending` e `mergeReady` separatamente: una preparazione riuscita non rende le traduzioni in sospeso pronte per essere unificate. Aggiornare gli specchi interessati nel candidato composto prima dell'ammissione. Il candidato affidabile alla coda Mergify, `merge_group`, i push di ramo e le esecuzioni manuali CI utilizzano il controllo assoluto, senza `--warn` o perdono per errori ereditati. Gli hash di destinazione mancanti e un ambito ridotto dai file core registrati eliminati non possono produrre un verdetto assoluto di successo.

### Rilascia il percorso rapido PR (`quality.yml`)

`.github/workflows/quality.yml` integra CI su main/release PRs, invia a `main`, invia e unisci gruppi. PRs utilizza controlli rapidi filtrati dal percorso. La build duplicata disabilitata permanentemente è stata rimossa; i veri controlli build/package/boot rimangono in CI. La suite di unità e Vitest funzionano solo in CI (`Unit Tests (N/12)` e `Vitest`).

| Lavoro                                           | Ambito                                                                                                                                                                                                                                                     | Blocco                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; Riferimenti documenti API e documenti-tutti                                                                                                                                                                                                 | SÌ                        |
| `Fast Quality Gates`                             | Codice PRs; controlli statici, typecheck, dashboard typecheck, unit test impattati                                                                                                                                                                         | SÌ                        |
| `Forgotten sibling tests`                        | Codice PRs; moduli modificati tracciati su consumatori statici e test sui fratelli candidati; i percorsi di importazione dinamica e dei barili vengono segnalati come diagnostica consultiva, con eccezioni della lista consentita a cui si fa riferimento | **Consultivo**            |
| `No new ESLint warnings`                         | Codice PRs; protezione anti-pelucchi sensibile alla soppressione                                                                                                                                                                                           | Sì, comprese le forchette |
| `Merge integrity (changelog + generated skills)` | PRs non progetto; registro delle modifiche e sincronizzazione delle abilità generate                                                                                                                                                                       | Sì, comprese le forchette |

#### Rapporto sui test sui fratelli dimenticati

`npm run check:forgotten-sibling-tests` viene eseguito come fase consultiva di `Fast Quality Gates` e riutilizza il risolutore di importazione dietro la mappa di impatto del test. Per ogni modulo di produzione modificato, riporta catene `changed module/symbol -> static consumer -> candidate sibling test` deterministiche quando il test candidato è assente dal diff pull-request. Il riepilogo Markdown e il risultato JSON vengono conservati come artefatto del flusso di lavoro `forgotten-sibling-tests` per la calibrazione prima di qualsiasi implementazione di blocco.

Le riesportazioni dei barili e le importazioni dinamiche sono solo strumenti diagnostici di risoluzione; non creano mai un risultato bloccante. Eccezioni riviste in tempo reale in `config/quality/forgotten-sibling-allowlist.json`. Ogni voce deve nominare il test del consumatore e del candidato, fornire una motivazione specifica e collegare un problema GitHub o una richiesta pull. Le voci non valide vengono chiuse con esito negativo. Le eccezioni non possono sopprimere un test candidato eliminato o una differenza che aggiunge `.skip`/`.todo`; l'indebolimento delle asserzioni e altri mascheramenti rimangono di proprietà del cancello `check:test-masking` che blocca in modo indipendente.

### Lavoro: `lint`

Funziona su ogni PR a `main`. I blocchi si uniscono in caso di fallimento.

| Scrittura (`npm run ...`)         | Convalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blocco                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | La versione Node.js rientra nell'intervallo supportato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | SÌ                                         |
| `check:cycles`                    | Importazioni circolari in tutto `src/` + `open-sse/` (basato su AST, tsconfig `paths` risolto). Bare esce 1 ogni volta che esiste un ciclo (chiuso in caso di errore da #15281) ed elenca SCCs. `check:cycles:ratchet` (ciò che CI esegue) si blocca quando il conteggio supera il limite `metrics.cycles` in `quality-baseline.json` — attualmente 14, `direction: down`, quindi può solo cadere (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sì (cricchetto)                            |
| `check:boundary`                  | Accoppiamento `open-sse → src` : importazioni univoche da file a file dal motore all'app (`scripts/quality/measure-boundary.mjs`; l'elenco dei bordi è il backlog di riparazione core/module-split v4). Rapporto consultivo = nudo (uguale a `quality:boundary`). `check:boundary:ratchet` (ciò che esegue CI, anche nel circuito a cricchetto dei cancelli rapidi `quality.yml` ) si blocca quando il conteggio supera il limite `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` — seminato al valore misurato 771, `direction: down`; `--update` lo abbassa solo; relativo di base su PRs (`--base-ref`, vedi sotto)                                                                                                                                                                                                                                                                                                                                                                                                                            | Sì (cricchetto)                            |
| `check:route-validation:t06`      | Schemi Zod presenti su tutte le rotte (policy Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | SÌ                                         |
| `check:any-budget:t11`            | Il conteggio `@ts-expect-error // any` non supera il budget (Catraca livello 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | SÌ                                         |
| `check:provider-consistency`      | Ogni fornitore in `providers.ts` ha una voce corrispondente in `providerRegistry.ts` (e viceversa, all'interno della lista consentita)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | SÌ                                         |
| `check:model-lifecycle`           | Le tre tabelle di routing gestite manualmente rimangono coerenti con lo snapshot del ciclo di vita archiviato (#11503): `FITNESS_TABLE` (`taskFitness.ts`) non assegna alcun ID ritirato che `REGISTRY` possa instradare; ogni target `BUILT_IN_ALIASES` è presente in `REGISTRY` e assente nello snapshot dell'ID ritirato; ogni ID in pensione ancora in `REGISTRY` viene inoltrato o elencato in `allowedRetiredInCatalog`; e nessuna origine o destinazione `DEFAULT_DEGRADATION_MAP` appare ritirata in quell'istantanea. Ciò non prova che un modello sia attualmente servito da un upstream live. — offline viene confrontato con `config/quality/model-lifecycle.json`, aggiornato manualmente con `npm run quality:refresh-model-lifecycle` (rete; non collegato a CI). `allowedRetiredInCatalog` è un meccanismo burn-down: aggiungi una voce solo con un problema di tracciamento.                                                                                                                                                               | SÌ                                         |
| `check:fetch-targets`             | Ogni `fetch("/api/...")` nello `src/` lato client si risolve in un vero `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | SÌ                                         |
| `check:deps`                      | Tutti i passaggi `npm install` -able in ogni `package.json` nel repository sono in `dependency-allowlist.json`; nuovi pacchetti sbloccati o slopsquat contrassegnati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | SÌ                                         |
| `audit:deps`                      | Controllo npm di tutti e cinque i lockfile indipendenti (root, Electron, plugin OpenCode, v1/v2 e provider). Blocco avvisi critici; gli avvisi elevati rimangono avvertimenti visibili. Gli audit Missing/failed sono INCOMPLETE e bloccati; gli hash di blocco e i report per ambito vengono conservati.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | SÌ                                         |
| `check:lockfile`                  | Integrità `package-lock.json` Registro https —, hash di integrità, nessuna sostituzione dell'host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | SÌ                                         |
| `check:licenses`                  | Lista consentita di licenze SPDX per le dipendenze di produzione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | SÌ                                         |
| `check:tracked-artifacts`         | Nessun artefatto di build/link simbolici `node_modules` impegnati (funziona anche in pre-commit husky; pre-push è intenzionalmente leggero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | SÌ                                         |
| `check:ai-attribution`            | Nessun trailer AI/bot `Co-Authored-By` o piè di pagina di generazione AI nei commit PR, titolo o corpo — Regola dura #16 (nel ciclo fast-gates `quality.yml` per PR→ `release/**` — legge il payload dell'evento, no-op off PRs — e un passaggio solo PR in `ci.yml` lint per PR→ `main`; anche l'husky `commit-msg` hook; coautori umani ammessi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Ogni esclusione Vitest nomina un problema di tracciamento e appare in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | SÌ                                         |
| `check:file-size`                 | I file sorgente (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) rimangono all'interno di `cap` e i file di test (`*.test.ts(x)`) all'interno di `testCap`; i file congelati in `file-size-baseline.json` (`frozen` / `testFrozen`) non devono superare le dimensioni registrate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | SÌ                                         |
| `check:error-helper`              | Le risposte agli errori in executors/handlers utilizzano `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | SÌ                                         |
| `check:migration-numbering`       | I file SQL di migrazione sono numerati in sequenza, senza lacune o duplicati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | SÌ                                         |
| `check:public-creds`              | Nessuna chiave OAuth `client_id`/`client_secret` o Web Firebase letterale al di fuori di `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | SÌ                                         |
| `check:db-rules`                  | Nessun SQL grezzo al di fuori dei moduli `src/lib/db/` ; nessuna importazione di barili da `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | SÌ                                         |
| `check:known-symbols`             | Gli esecutori del provider, le strategie di routing e i traduttori registrati nelle tabelle di invio corrispondono ai file sul disco — senza simboli orfani o non dichiarati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | SÌ                                         |
| `check:route-guard-membership`    | Ogni percorso che genera un processo figlio è classificato da `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | SÌ                                         |
| `check:test-discovery`            | Ogni file `*.test.ts` / `*.spec.ts` nel repository viene raccolto da almeno un test runner (la lista degli orfani in `test-discovery-baseline.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | SÌ                                         |
| `check:test-tla-order`            | Nessun file `node:test` sotto `tests/unit` registra un test, raggiunge uno `await` di livello superiore, quindi ne registra altri (#18045; cricchetto: `test-tla-order-allowlist.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | SÌ                                         |
| `check:agent-skills-sync`         | Gli artefatti generati dalle abilità dell'agente corrispondono al catalogo di origine (nessuna deriva)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Il fornitore logos/assets riporta una voce di provenienza registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `lint:json`                       | I file di configurazione JSON analizzano e soddisfano le regole lint del repository                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | Compilazione TypeScript senza errori (solo avvisi informativi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | SÌ                                         |
| `typecheck:noimplicit:core`       | Rigoroso `noImplicitAny` — lungimirante; molti siti di chiamata preesistenti necessitano ancora di annotazioni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ha come ambito `src/app/(dashboard)/**` (#7033) — La lista consentita di 27 file curata di `typecheck:core` non include alcun dashboard TSX e `next build` non lo controlla mai (`next.config.mjs` imposta `ignoreBuildErrors: true`), quindi le regressioni degli identificatori orfani lì (#6625/#6909) erano invisibili a CI. Differenze rispetto a una linea di base di conteggio per-file/per-TS-code congelata (`config/quality/dashboard-typecheck-baseline.json`, stesso modello di applicazione obsoleto di `check:known-symbols`) Solo — Gli errori NEW oltre il conteggio di base non superano il gate; rallentare con `--update` quando viene corretto un errore preesistente.                                                                                                                                                                                                                                                                                                                                                            | SÌ                                         |
| `check:build-typecheck`           | Il controllo del tipo di produzione dell'intera app su `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), la lista consentita di 27 file di `typecheck:core` e il gate del dashboard non coprono. Differenze rispetto `config/quality/build-typecheck-baseline.json`; un conteggio nuovo o aumentato per (file, codice) fallisce, un conteggio inferiore richiede di aumentare. `--update` rifiuta mentre la corsa contiene una coppia nuova o rilanciata a meno che non venga passato `--force-regressions`, e rifiuta un file appena silenziato a meno che non venga passato `--force-nocheck`, quindi ampliare la linea di base per diventare verde e garantire un silenzio permanente sono due atti deliberati separati. Uno `--force` semplice viene rifiutato. Esegue inoltre la scansione dell'ambito di compilazione per `@ts-nocheck` rispetto a `config/quality/ts-nocheck-baseline.json`, poiché un file che lo utilizza non riporta alcuna diagnostica e sarebbe altrimenti invisibile a ogni gate. | SÌ                                         |

#### Due programmi di controllo del tipo rispondono in modo diverso

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) e `check:build-typecheck` compilano programmi diversi con opzioni diverse e lo stesso file può essere pulito in uno e pieno di errori nell'altro.

`tsconfig.build.json` imposta `"strict": false`, quindi `noImplicitAny` è disattivato. La configurazione principale compila una lista consentita di 27 file curata con opzioni più rigorose e segue il grafico di importazione di ciascuna voce, in modo che i file che non compaiono mai nel programma di compilazione vengano comunque controllati lì.

La conseguenza è importante quando si giudica se un file è stato digitato:**zero diagnostica sotto `check:build-typecheck` non significa zero** . L'estrazione di `@ts-nocheck` da 26 file ne ha mostrati 23 puliti nel programma di compilazione; sedici di questi sono emersi: circa 120 errori impliciti in quello rigoroso. Controllali entrambi prima di chiamare un file pulito.

### Lavoro: `quality-gate`

Corre dietro `test-coverage`. I blocchi si uniscono in caso di fallimento.

| Copione                      | Convalida                                                                                                                                                                    | Blocco                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Emette `quality-metrics.json` (conteggio avvisi ESLint, copertura dal report shard unito)                                                                                    | Sì (a monte del cricchetto) |
| `quality:ratchet`            | Ciascuna metrica in `quality-baseline.json` non è regredita (avvisi ESLint linea di base ≤ ; linea di base ≥ di copertura)                                                   | SÌ                          |
| `check:duplication`          | La duplicazione del codice (jscpd@4) non supera la linea di base in `quality-baseline.json`                                                                                  | SÌ                          |
| `check:complexity`           | La complessità ciclomatica a livello di file non supera il limite (core ESLint `complexity` + `max-lines-per-function`)                                                      | SÌ                          |
| `check:cognitive-complexity` | Cricchetto di complessità cognitiva (`eslint-plugin-sonarjs`) — passaggio ESLint separato; CI viene eseguito entrambi uniti come unico passaggio `check:complexity-ratchets` | SÌ                          |
| `check:dead-code`            | Il bloccaggio (knip) delle esportazioni/file inutilizzati non regredisce rispetto al valore di base                                                                          | SÌ                          |
| `check:compression-budget`   | I limiti di risparmio dei token — del budget del benchmark di compressione per motore non devono regredire                                                                   | SÌ                          |
| `check:type-coverage`        | Il cricchetto digitato in percentuale (`type-coverage`) non regredisce; sussume in gran parte `typecheck:noimplicit:core`                                                    | SÌ                          |

### Lavori: `codeql-scan` e `codeql-admission`

`codeql-scan` produce tutte le categorie di analisi configurate. Dopo che il lavoro ha avuto esito positivo, `codeql-admission` convalida i suoi caricamenti esatti e l'avviso del candidato viene attivato. Entrambe sono dipendenze richieste di `Gate / CI`, inclusi i candidati solo documenti. L'attivazione amministrativa e i requisiti Canary sono descritti di seguito nella sezione "Cricchetto CodeQL ".

| Copione                | Convalida                                                                                                                                                                                                                                | Blocco |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:codeql-ratchet` | ref/SHA del candidato e tutte le categorie di analisi configurate devono essere aggiornate prima dell'attivazione dell'avviso; blocchi di prove mancanti. L'inventario globale rimane separato —, vedere "Cricchetto CodeQL " di seguito | SÌ     |

### Lavoro: `quality-extended`

Il lavoro blocca i candidati applicabili. La dimensione del pacchetto, i risultati segreti, i risultati delle vulnerabilità, i risultati del flusso di lavoro e le modifiche OpenAPI vengono controllati con i cricchetti richiesti. La diagnostica della dipendenza circolare rimane consultiva. È richiesta l'installazione dello scanner: `scripts/ci/install-quality-scanners.sh` fornisce versioni aggiunte e propaga gli errori di installazione. Strumenti mancanti, report non validi o linee di base mancanti lasciano il cancello dello scanner INCOMPLETE richiesto.

| Copione                  | Convalida                                                                                                                                                                                                                                          | Blocco                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Nessuna dipendenza circolare (DPDM)                                                                                                                                                                                                                | **Consultivo**                                           |
| `check:bundle-size`      | La dimensione del pacco non supera il limite massimo; una misurazione non disponibile fallisce                                                                                                                                                     | **Blocco con --ratchet**                                 |
| `check:secrets`          | I risultati di Gitleaks non regrediscono; le scansioni richieste rifiutano tools/source/baseline mancanti, scansioni non riuscite e report non validi                                                                                              | **Blocco con --ratchet**                                 |
| `check:vuln-ratchet`     | Le vulnerabilità delle dipendenze non regrediscono; le scansioni richieste rifiutano strumenti mancanti, report non validi o linee di base mancanti                                                                                                | **Blocco con --ratchet**                                 |
| `check:workflows`        | Lint del flusso di lavoro (actionlint + zizmor); Gli scanner missing/broken, i report non validi o la linea di base del cricchetto mancante falliscono come INCOMPLETE. I risultati validi seguono la politica strict/advisory/ratchet selezionata | Esecuzione richiesta; blocco del cricchetto zizmor in CI |
| `check:openapi-breaking` | Contratto API pubblico contro commit di eventi bloccati (PR merge-base, push before, merge-group base; scheduled/manual checkout first parent); la misurazione richiesta non viene chiusa                                                          | **Blocco con --ratchet**                                 |

### Lavoro: `docs-sync-strict`

Per le richieste pull a `main` o `release/**`, questo lavoro viene eseguito solo per i candidati non in bozza (o in coda attendibile) classificati come modifiche alla documentazione o al codice. Funziona anche su eventi CI non PR; il trigger push di questo flusso di lavoro copre solo `main`, non `release/**`. Un passo che esce diverso da zero blocca il lavoro; i risultati del solo rapporto e le esenzioni documentate di seguito non lo fanno.

| Copione                        | Convalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Blocco                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate che esegue in sequenza le 7 sotto-gate sottostanti                                                                                                                                                                                                                                                                                                                                                                                                                                                             | SÌ                                                                                                                                                          |
| ↳ `check:docs-sync`            | Coerenza della versione Package/OpenAPI/CHANGELOG, mirror `llm.txt` esatti, invarianti CHANGELOG section/size tradotti e assenza di documenti duplicati sostituiti                                                                                                                                                                                                                                                                                                                                                       | SÌ                                                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Le pagine della documentazione compilata riportano titoli di frontmatter validi                                                                                                                                                                                                                                                                                                                                                                                                                                          | SÌ                                                                                                                                                          |
| ↳ `check:docs-counts`          | Gli invarianti di conteggio ad alta fiducia sono rigorosi; i controlli euristici del conteggio dei file avvisano solo a meno che lo script non riceva `--strict` (il meta-gate CI non lo passa)                                                                                                                                                                                                                                                                                                                          | Blocco rigoroso dei livelli; consulenza sul livello soft                                                                                                    |
| ↳ `check:env-doc-sync`         | Letture env di origine, `.env.example` e `docs/reference/ENVIRONMENT.md` concordano dopo le liste consentite ignora, solo doc e solo env esplicite                                                                                                                                                                                                                                                                                                                                                                       | Sì, al di fuori delle liste consentite documentate                                                                                                          |
| ↳ `check:deprecated-versions`  | Segnala potenziali versioni obsolete al di fuori di contesti storici sicuri e date di aggiornamento obsolete, escludendo i documenti ignorati                                                                                                                                                                                                                                                                                                                                                                            | Avviso nel cablaggio CI corrente (`--strict` non superato)                                                                                                  |
| ↳ `check:doc-links`            | I collegamenti di markdown interni nei documenti si risolvono in file reali (modulo `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                                                  | SÌ                                                                                                                                                          |
| ↳ `check:fabricated-docs`      | Nella base di codice sono presenti percorsi, variabili di ambiente, comandi CLI, nomi di hook e percorsi di file citati nei documenti. Cancello rigido tramite `--strict`; soft-fail senza flag.                                                                                                                                                                                                                                                                                                                         | Sì (tramite `--strict` in CI)                                                                                                                               |
| `check:cli-i18n`               | Le chiavi CLI `t()` utilizzate esistono in `en`; `pt-BR` conserva ogni sezione di primo livello; `zh-CN` e `zh-TW` contengono tutte le chiavi di `en`                                                                                                                                                                                                                                                                                                                                                                    | SÌ                                                                                                                                                          |
| `check:openapi-coverage`       | Le specifiche OpenAPI coprono almeno una parte dei percorsi reali                                                                                                                                                                                                                                                                                                                                                                                                                                                        | SÌ                                                                                                                                                          |
| `check:openapi-security-tiers` | Le annotazioni `x-loopback-only`/`x-always-protected` dichiarate devono essere supportate da `routeGuard.ts`; parser e blocco delle mancate corrispondenze inoltrate. Il controllo inverso per `x-loopback-only` mancante con prefissi solo locali avvisa e i percorsi solo modello sono esclusi da tale passaggio inverso.                                                                                                                                                                                              | Blocco controlli Parser/forward ; avviso di controllo inverso                                                                                               |
| `check:openapi-routes`         | Ogni percorso `/api...` in `openapi.yaml` si risolve in modo insensibile ai parametri in un percorso reale dopo la lista consentita `KNOWN_STALE_SPEC` giustificata; Anche le voci della lista consentita obsolete falliscono                                                                                                                                                                                                                                                                                            | SÌ                                                                                                                                                          |
| `check:docs-symbols`           | I riferimenti `/api/...` URL interni nei documenti canonici non mirror si risolvono in un percorso reale o in una famiglia di percorsi; I riferimenti proxy/upstream/placeholder/file e le voci `KNOWN_STALE_DOC_REFS` giustificate vengono esclusi e le voci obsolete della lista consentita non riescono                                                                                                                                                                                                               | SÌ                                                                                                                                                          |
| `i18n translation drift`       | L'ammissione assoluta richiede zero incoerenze di origine, destinazione mancante, hash di destinazione, traduzione obsoleta e cache di sezione. La preparazione PR ordinaria può conservare l'esatta prova ereditata o una modifica in sospeso solo in inglese con stato completo e byte di destinazione invariati; il suo rapporto dichiara separatamente la disponibilità alla fusione. Hash di destinazione mancanti e blocco delle prove di base incompleto. Una cache della sezione legacy assente non è un errore. | Tutte e cinque le classi bloccano l'ammissione queue/base ; la preparazione ordinaria consente solo lavori in attesa ereditati comprovati o solo in inglese |

Vengono generati i dodici README SVGs sotto `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` li rigenera tutti). Ciascuno ha uno unit test di confronto byte (`tests/unit/docs/readme-*-svg.test.ts`, lavoro `test-unit`) che fallisce quando il file sottoposto a commit è obsoleto e `check:docs-counts` legge i numeri canonici dai relativi nodi `<text>` — motivo per cui il passaggio di struttura mantiene ogni stringa delineata nel file come invisibile `<text>`. Il controllo dei numeri canonici SVG legge i file elencati in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, oltre `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; le affermazioni free-forever, catalog-entry, recurring-pool e scoring-factors leggono anche `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` trae le sue cifre dal caricatore del catalogo in tempo reale, quindi una modifica a `FREE_MODEL_BUDGETS` o al nome visualizzato di un fornitore rosso CI finché il file non viene rigenerato.

### Lavoro: `i18n-ui-coverage`

| Copione                             | Convalida                                                                                                                                                                                                                                   | Blocco     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check-ui-keys-coverage` (in linea) | La copertura dei tasti UI i18n è ≥ 65%                                                                                                                                                                                                      | SÌ         |
| `check-ui-value-drift` (in linea)   | Un inglese riscritto **valore** non lascia dietro di sé alcuna traduzione stantia                                                                                                                                                           | SÌ         |
| `check-new-key-coverage` (in linea) | UN **nuovo** La chiave inglese viene tradotta in ogni locale —, un indicatore `__MISSING__:` viene rifiutato                                                                                                                                | SÌ         |
| `check-translation-ratio`           | Il rapporto di traduzione reale per impostazione locale (identico all'inglese/segnaposto/foglie mancanti all'esterno della lista consentita) non deve superare il margine di flessibilità `config/quality/i18n-translation-baseline.json` + | **Blocco** |

Richiede `fetch-depth: 0` — il cancello della deriva del valore differenzia `en.json` rispetto alla base di fusione.

#### `check-ui-value-drift` — gate di traduzione obsoleto

Cattura l'unica regressione i18n che le altre porte strutturalmente non possono vedere: un valore inglese viene riscritto e le traduzioni derivate dall'inglese _previous_ rimangono indietro, quindi gli utenti non inglesi continuano a leggere una copia con parole sicure, ora sbagliata.

Questo è stato spedito per davvero. `oauthModal.googleOAuthWarning` è stato riscritto quando è arrivato l'helper di accesso Antigravity (#5203);**39 di 43 locali** mantenuto il testo che dice agli operatori di "copiare l'intero URL e incollarlo di seguito" — un flusso che non può essere completato per quel fornitore. È passato inosservato fino #8463 perché:

- `sync-ui-keys` recupera solo le chiavi che lo sono **assente** , mai quelli che lo sono **stantio** ;
- `check-ui-keys-coverage` conta la _presenza_ della chiave, quindi una traduzione obsoleta viene considerata coperta;
- `check-translation-drift` tiene traccia della documentazione `docs/i18n/<locale>/**.md` rispecchia — e non legge mai `src/i18n/messages/*.json`. Blocco del lavoro `docs-sync-strict` dalla risincronizzazione del 2026-09: modifica di un documento principale → `npm run i18n:run -- --files=<doc>` (a livello di sezione, economico).

**Consapevole delle differenze, non supportato dalla linea di base.** Confronta `en.json` alla base di unione con l'albero di lavoro; per ogni chiave il cui valore inglese è cambiato, qualsiasi locale che conserva ancora una traduzione intatta diventa obsoleto. Questo deliberatamente **congela il debito preesistente** — una differenza non può rivelare da quale inglese antico provenga una traduzione di vecchia data, quindi il cancello giudica solo ciò che tocca il cambiamento attuale. L'alternativa (una linea di base hash per chiave) costerebbe un file generato ~ 600 KB, 3 × la più grande linea di base esistente, che varia su ogni i18n PR.

Due modi per soddisfarlo:

1. aggiornare le traduzioni interessate, o
2. impostateli su `__MISSING__:<new english>` — il runtime poi servirà l'inglese corretto (`src/i18n/request.ts::deepMergeFallback`, #7258) e le code chiave per la traduzione.

Se la stringa è **Senso** cambiato, preferisco **rinominare la chiave** : una nuova chiave non può ereditare una traduzione obsoleta. Questo è il modello utilizzato #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

I cancelli della deriva del valore e della nuova chiave condividono un confronto immutabile da `scripts/i18n/resolve-ui-diff-base.mjs`. Il flusso di lavoro passa la stessa base, base-tip e candidato SHAs a entrambi i controlli. Le esecuzioni PR/base-retarget, push e merge-group utilizzano il contesto dell'evento. L'invio di un ramo candidato richiede il suo esatto PR aperto o l'input esplicito `i18n_base_sha`. L'invio o l'osservazione programmata di `main` o `release/vX.Y.Z` senza tale input confronta l'ultimo commit con il suo primo genitore; non è una verifica di tutti i debiti di traduzione ereditati. L'invocazione locale richiede una base di confronto esplicita, ad esempio il comando `BASE_REF` sopra.

Un contesto di confronto mancante o ambiguo, un catalogo richiesto illeggibile o non valido e un candidato modificato producono `INCOMPLETE` con codice di uscita **2** , anche in modalità avviso. Le letture del catalogo utilizzano `scripts/i18n/read-ui-catalog.mjs`; gli errori di lettura non vengono sostituiti con oggetti vuoti. Né una base non disponibile né un input incompleto stabiliscono PASS.

### Lavoro: `i18n`

Matrice di convalida i18n completa (un lavoro per locale). L'intero lavoro è di consulenza.

| Copione                         | Convalida                               | Blocco                                                        |
| ------------------------------- | --------------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Completezza della traduzione per lingua | **Consultivo** (`continue-on-error: true` sull'intero lavoro) |

### Lavoro: `pr-test-policy`

Viene eseguito solo su richieste pull.

| Copione                | Convalida                                                                                                                               | Blocco |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | PRs che modifica il codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/` deve includere o aggiornare i test (Hard Rule #8) | SÌ     |
| `check:test-masking`   | I file di test modificati non riducono il conteggio delle asserzioni nette né aggiungono tautologie `assert.ok(true)`                   | SÌ     |
| `check:pr-evidence`    | L'organismo PR cita le prove test/VPS per il cambiamento (meccanizza Hard Rule #18 grepping PR prosa — fragile, vedere Backlog)         | SÌ     |

### Lavoro: `test-vitest`

Necessita del lavoro di classificazione `changes`. I frammenti di matrice applicabili bloccano l'unione in caso di errore.

| Suite            | Convalida                                                    | Blocco                                                                                                                       |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 strumenti), autoCombo, cache — vitest runner | SÌ                                                                                                                           |
| `test:vitest:ui` | Il componente UI testa il corridore — vitest                 | **Blocco** I guasti preesistenti — sono esplicitamente esclusi in `vitest.config.ts`; nuovi fallimenti falliscono nel lavoro |

### Flussi di lavoro notturni (programmati, avvisi)

Questi vengono eseguiti secondo una pianificazione cron (e `workflow_dispatch`), mai su PRs. Sono tutti consultivi.

| Flusso di lavoro       | Convalida                                                                                                                                                                     | Blocco         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | test di proprietà a controllo rapido con un numero elevato di corse + seme casuale                                                                                            | **Consultivo** |
| `nightly-resilience`   | cancello di crescita dell'heap, iniezione di guasti al caos, k6 load/soak                                                                                                     | **Consultivo** |
| `nightly-llm-security` | promptfoo injection guard (modalità blocco) Sonde garak + (saltate senza segreto del provider)                                                                                | **Consultivo** |
| `nightly-schemathesis` | Fuzzing del contratto OpenAPI (schema) contro uno OmniRoute live che utilizza `docs/openapi.yaml` Violazioni delle specifiche delle superfici — /500 non gestiti (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Il punteggio del test di mutazione Stryker sulla corsia veloce dell'unità — I mutanti sopravvissuti emergono affermazioni deboli                                              | **Consultivo** |
| `nightly-compat`       | Matrice di compatibilità del motore dei nodi negli intervalli `engines.node` supportati                                                                                       | **Consultivo** |

Le linee di base delle prestazioni (heap, TTFB, tempo di compilazione) vengono registrate, non delimitate: vedere [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### Cricchetto CodeQL : ammissione dei candidati e inventario del repository

CI possiede l'ammissione CodeQL del candidato attraverso una catena di dipendenze esplicita: `codeql-scan` chiama la matrice a quattro lingue in `codeql.yml`, quindi `codeql-admission` esegue `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` richiede entrambi i risultati. La qualità mantiene i propri controlli numerici ma non interroga lo scanner prima che il produttore finisca; `Gate / Quality` da solo non è l'ammissione completa del candidato. CodeQL rimane obbligatorio per i candidati che accettano solo documenti.

La policy in `config/quality/codeql-admission-policy.json` seleziona Azioni, C/C++, JavaScript/TypeScript e Python, impostazione predefinita della suite di query, modello di minaccia remota e modalità di creazione Nessuna. Il preflight del produttore rifiuta un record di attivazione in sospeso e si dirama all'esterno dell'elenco di destinazioni esplicite. Gli obiettivi attuali sono i principali e i test del contratto release/v3.8.54. confrontano questo elenco finito e il push trigger di manutenzione con la versione del pacchetto; la prossima versione necessita di una revisione dell'onboarding. Il trigger PR della versione più ampia esistente di CI viene mantenuto, ma un target non onboarded segnala HOLD prima dell'estrazione anziché ottenere uno PASS non misurato.

Ogni lavoro della matrice registra il suo effettivo caricamento SARIF ID, la lingua, la categoria, l'esecuzione e il tentativo, l'identità del flusso di lavoro del chiamante, l'evento ref/head/base/merge SHA e l'hash della politica. Il lavoro dipendente scarica solo le ricevute di questa esecuzione e convalida i digest degli artefatti. Richiede tutte e quattro le categorie, un produttore di successo e l'elaborazione completata di ogni caricamento esatto. Utilizza il filtro sarif_id di API, non l'ultima analisi trovata su un ramo. Le repliche parziali possono riutilizzare le categorie riuscite da un tentativo precedente della stessa esecuzione e candidato, preservando il tentativo di produzione; un attuale produttore fallito non può riutilizzare le precedenti prove verdi.

L'azione CodeQL attende l'elaborazione, ma la sua implementazione bloccata può avvisare e continuare dopo un errore di lettura dello stato o un'attesa esaurita. L'ammissione verifica quindi nuovamente l'elaborazione. Categorie mancanti, elaborazione in sospeso, lavori non riusciti o annullati, identità obsoleta, impaginazione incompleta o APIs non disponibile producono HOLD ed escono 2. Non rimane alcuna attesa fissa per un flusso di lavoro scanner indipendente. Un PR non scansionato non può passare perché una query di avviso ha restituito 0. Un conteggio misurato superiore `metrics.codeqlAlerts.value` esce da 1; la linea di base non viene aumentata per assorbire gli avvisi di un altro ramo. [Stato del caricamento e ricerca dell'analisi](https://docs.github.com/en/rest/code-scanning/code-scanning).

La ricevuta registra il caricamento e l'analisi IDs, categorie, versioni dello strumento, ref/SHA, numeri di riferimento e di avviso. Il conteggio SARIF identity/result, i conteggi minimi delle regole e le istanze di avviso esatte rimangono obbligatori. Le identità PR/analysis vengono ricontrollate prima di accettare. Questi controlli stabiliscono la copertura delle categorie configurate, non un inventario di ogni file di origine estratto. C/C++ l'estrazione no-build non include il codice generato durante la compilazione di un progetto. Le esclusioni delle fonti necessitano ancora di revisione e l’attribuzione dei contributori necessita di prove comparabili su base esatta.

`codeql-maintenance.yml` fornisce scansioni push a rilascio attivo e il programma settimanale senza duplicare i produttori PR/main. `nightly-codeql-inventory.yml` mantiene separata la linea di base dell'intero repository, con `--strict-measurement` e un errore quando la misurazione non è disponibile. Il grazioso salto del collezionista di eredità locale non costituisce l'ammissione del candidato. L’inasprimento rimane uno `--update` esplicito dopo un conteggio globale inferiore verificato.

Il flusso di lavoro avanzato non deve essere pubblicato mentre è configurata l'impostazione predefinita: GitHub rifiuta tale combinazione. La sua policy con versione rimane in sospeso finché la transizione amministrativa rivista non viene letta. Prima della pubblicazione, un operatore inserisce il repository, gli hash head/base/tree e policy/patch/rollback e lo stato di configurazione osservato; `node scripts/quality/codeql-producer.mjs verify-admin-readback` controlla i record JSON previsti ed effettivi forniti. Si tratta di una protezione tecnica, non dell'approvazione dell'operatore o di un sostituto per il recupero di nuovi readback. Il token PR non richiede mai l'accesso amministrativo. L'implementazione e qualsiasi modifica allo scanner richiedono la rilettura separata oltre a prove reali di compatibilità con PR, fork e merge-group.

I fork utilizzano corridori ospitati, checkout senza credenziali persistenti, nessun progetto install/build nel produttore e nessun segreto del repository ereditato. GitHub supporta il caricamento SARIF per l'evento pull_request con il suo token fork ridotto; L'approvazione dell'esecuzione del contributo per la prima volta rimane la politica GitHub. Non utilizzare mai pull_request_target per eseguire codice non attendibile. Conferma le autorizzazioni effettive del token, analysis_key e tutti gli ambienti di categoria nel canary controllato prima di considerare completata la migrazione. [Regole di caricamento fork](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [modalità di configurazione contrastanti](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**I licenziamenti sono a discrezione dell'operatore (Hard Rule #14)** — non respinge mai un avviso CodeQL senza registrare la giustificazione tecnica nel commento di licenziamento: `won't fix` per un requisito del protocollo a monte, `used in tests` per un dispositivo di prova, `false positive` per un disinfettante CodeQL non può vedere (precedente: `docs/security/ERROR_SANITIZATION.md`).

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

**Anch'essi non documentati sopra** (consultivi, segnale basso): il job `docs-lint` (markdownlint + Vale, intero job con `continue-on-error`) e i workflow scanner autonomi `semgrep.yml` / `scorecard.yml`. CodeQL ora ha job obbligatori di produzione e ammissione sotto `Gate / CI`, soggetti ai requisiti di attivazione descritti sopra. `semgrepFindings: 0` è in `quality-baseline.json`, ma non è collegato a un ratchet bloccante in `ci.yml` — la metrica è attualmente orfana.

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
- `check:pr-evidence` (bloccante, esegue grep sul testo del corpo della PR) — rischio elevato di falsi positivi; la sua rimozione indebolirebbe l'applicazione della Regola rigida n. #18, quindi si tratta di un'effettiva decisione di policy.
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
