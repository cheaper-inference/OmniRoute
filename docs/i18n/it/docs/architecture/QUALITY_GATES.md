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

I flussi di lavoro CI e Quality Gates emettono ciascuno un verdetto stabile: `Gate / CI` e `Gate / Quality`. La loro politica di ammissione con versione enumera ogni lavoro a monte come richiesto o consultivo. Un lavoro richiesto applicabile deve avere esito positivo: i risultati mancanti, annullati, saltati, in sospeso e sconosciuti non possono stabilire PASS. Una classificazione valida solo per documenti o solo catalogo può rendere inapplicabile una corsia di codice; una bozza ordinaria PR non è un candidato accettato. Un'etichetta `hotfix` non rinuncia alla prova.

Entrambi i flussi di lavoro coprono PRs in rami main/release, push su `main`, invio manuale ed eventi di unione di gruppi. Push, dispatch e merge-group eseguono la selezione completa. Una bozza di coda Mergify affidabile esegue anche i lavori `full-code`/`full-code-e2e` applicabili; PRs ordinario saltali. Prima di un'unione manuale, esegui un invio completo sul candidato esatto. I push su `release/**` non avviano questi flussi di lavoro; Release-Green osserva separatamente la base unita (`docs/ops/RUNNER_BOX.md` → Hosted lane). I fork e i gruppi di unione utilizzano corridori ospitati per lavori che altrimenti selezionerebbero corridori self-hosted; La capacità ospitata sufficiente deve essere verificata prima dell'implementazione.

Un normale PR esegue la selezione veloce. Le corsie `full-code` e `full-code-e2e` della politica di ammissione (E2E, integrazione, artefatto del pacchetto, Electron smoke, Bun SQLite, ecosistema e client di protocollo) vengono eseguite solo su una bozza della coda Mergify o su un'esecuzione completa: `gh workflow run ci.yml --ref <branch>`.

Ogni ricevuta JSON identifica lo SHA estratto, l'esecuzione del flusso di lavoro e il tentativo. Lo CLI rifiuta una mancata corrispondenza checkout/event SHA. I test del flusso di lavoro vincolano l'appartenenza alla policy all'elenco `needs` del processo di verdetto in modo che una corsia nuova o rimossa non possa scomparire silenziosamente. Le ricevute coprono il proprio flusso di lavoro, non la pubblicazione, la distribuzione o gli aspetti interni di uno scanner consultivo esistente. Effettuare i controlli applicabili richiesti dalle norme delle filiali costituisce una modifica amministrativa separata; definire il proprio lavoro non protegge di per sé una filiale.

`API Route Typecheck` è un controllo del flusso di lavoro indipendente, al di fuori sia dei verdetti aggregati che del profilo statico completo dell'osservatore locale. Ispezionare il suo risultato separatamente per il candidato esatto. `.github/workflows/api-route-typecheck.yml` viene eseguito su PRs in `main` o `release/**`, esegue il push su una delle famiglie di rami, sull'invio manuale e sugli eventi `merge_group` di tipo `checks_requested`. Non ha alcun filtro del percorso. Unisci i gruppi controlla `merge_group.head_sha`; altri eventi controlla `github.sha`. Tutti gli eventi utilizzano gli stessi test del gate diagnostico API e dell'unità di gate. I retarget di base PR richiedono un nuovo controllo; Le modifiche body/title utilizzano il nome di sola osservazione `Admission not requested / API Route Typecheck` e non possono sostituire il controllo di ammissione.

### Evidenze conservate nel riduttore di accettazione della release

`scripts/quality/validate-release-acceptance.mjs` riduce un piano fornito e i relativi
manifest; non determina che il piano copra l'intera pipeline di release.
I relativi report impostano esplicitamente `releaseAcceptance: false`, anche quando il piano è
`VERIFIED`. Il workflow `release-acceptance.yml` utilizza ancora fixture shadow, non
ricevute reali di build, pacchettizzazione, avvio o promozione.

La CLI richiede `--evidence-root` per verificare le evidenze conservate. I file vengono risolti
come `<evidence-root>/<artifact_id>/<member>` e sottoposti a hashing SHA-256. Un record PASS
senza evidenze, un file mancante o modificato, un percorso non sicuro o un collegamento simbolico
impediscono la verifica. I file mancanti non equivalgono a log vuoti di esecuzioni riuscite. I
controlli esistenti di SHA/esecuzione/tentativo rimangono indipendenti: byte corrispondenti non
possono rendere valida una ricevuta obsoleta. L'integrità dei file non costituisce prova
dell'autenticità dell'esecuzione o della promozione dell'artefatto.

### DAST usa il build CI verificato

Il job CI obbligatorio `dast-smoke` chiama `.github/workflows/dast-smoke.yml` dopo `build`. Segue la stessa selezione di codice e bozze del build, comprese le PR da fork supportate, le PR dirette alla release e i gruppi di merge. Un job DAST mancante, fallito, annullato o saltato inaspettatamente blocca `Gate / CI`. Il workflow riutilizzabile non ha un trigger PR o manuale indipendente; la validazione manuale usa l'avvio di CI affinché build e consumatore restino nella stessa esecuzione.

`scripts/ci/next-build-provenance.mjs` sigilla l'intero artefatto Next con il digest tar, repository/evento/esecuzione, tentativo del produttore, head/base/checkout/tree, identità dei workflow, lockfile, versione e ABI esatti di Node, piattaforma e bundler. DAST seleziona l'ID immutabile dell'artefatto da `needs.build.outputs`, richiede la verifica del digest del download e calcola indipendentemente l'hash dello ZIP confrontandolo con il digest del produttore prima di estrarre i due elementi consentiti tramite `scripts/ci/unpack-ci-build.py`. Anche manifesto e archivio tar devono corrispondere agli output indipendenti del produttore prima di estrarre l'albero Next. Non cerca mai l'ultimo build riuscito di un branch. Una riesecuzione parziale può riutilizzare lo stesso tentativo del produttore se ID e tutti gli input continuano a coincidere; la ricevuta registra entrambi i tentativi.

Il consumatore resta su un runner Linux ospitato, con permessi di sola lettura sul repository e senza segreti del repository. Installa l'esatta versione di Node del produttore, poi assembla la CLI con `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1`. `scripts/build/standaloneInput.mjs` rifiuta un server standalone mancante prima di qualsiasi build di ripiego; i normali build CLI locali conservano il ripiego esistente. Disponibilità del server, Schemathesis e promptfoo devono riuscire tutti entro il limite invariato di 25 minuti del job. Una ricevuta di provenienza dimostra identità e byte degli input, non il successo di una scansione DAST. La scadenza dell'artefatto, l'interruzione del runner o il fallimento di uno scanner restano prove incomplete o negative; un wrapper consultivo non può trasformarle in PASS.

### Capacità di esecuzione dell'interfaccia utente

CI esegue l'intero inventario dell'interfaccia utente come quattro shard della matrice
`test-vitest`, ciascuno con al massimo due worker per shard e con il limite esistente di 15 minuti
per il job. Il primo shard esegue anche la suite Vitest MCP/autoCombo. Il risultato del job
obbligatorio copre ogni elemento della matrice; il fallimento o l'annullamento di uno shard non
può determinare l'ammissione del candidato.

L'osservatore notturno conserva una ricevuta separata per il candidato esatto per ogni shard
dell'interfaccia utente, inclusa l'esecuzione MCP nella prima ricevuta. Sono richiesti tutte e
quattro le ricevute, i log e le identità di esecuzione corrispondenti. Il comando locale
`npm run test:vitest:ui` seleziona comunque la suite completa; una singola esecuzione con
`--shard` costituisce solo un'evidenza parziale.

### Raccolta della copertura dei test unitari

I dodici shard dei test unitari raccolgono la copertura V8 durante l'esecuzione dei test esistenti.
Uno shard completato con successo esegue `scripts/ci/compact-v8-coverage.mjs` per comprimere i
file originali senza generare un report Istanbul intermedio. Il job Coverage finale verifica
tutti e dodici i manifest rispetto allo SHA del candidato, al runtime, alla directory radice del
codice sorgente e agli hash dei dati, quindi esegue i reporter di c8 e le soglie di copertura
esistenti. Gli input mantengono l'ordine globale dei nomi file di c8; il pre-merge per shard non è
sicuro per la copertura mista di funzioni/blocchi. Shard mancanti, non validi o incompatibili
impediscono l'ammissione. Gli shard di test non riusciti conservano separatamente la copertura
diagnostica grezza; questa non può essere inclusa nel merge finale.

### Ricevute di avanzamento dell'esecuzione dei test unitari

Il comando condiviso `test:unit:ci:shard` registra le fasi `primary`, `dashboard` e `serial`
tramite `scripts/ci/unit-progress-reporter.mjs`. Il normale report dei test rimane
disponibile. Una ricevuta separata, contenente solo metadati, registra l'avvio e il completamento
di ciascun file, mentre un heartbeat ogni 30 secondi elenca i file ancora attivi e il relativo tempo trascorso. Registra
solo i metadati di esecuzione inclusi nell'elenco consentito; le descrizioni dei test, l'output, il corpo degli errori e l'ambiente
completo non vengono serializzati.

CI conserva i file JSONL come `unit-progress-ci-<run>-<attempt>-<shard>`. Un timeout del job può impedire il successivo caricamento;
gli heartbeat già emessi rimangono evidenze diagnostiche. L'assenza di heartbeat può anche indicare
un processo del runner bloccato o terminato. Queste ricevute preservano la selezione dei test,
la concorrenza, le scadenze e lo stato di uscita esistenti; non costituiscono verdetti di ammissione dei candidati.

### Coda di merge

L'etichetta `queue` invia una PR alla coda Mergify (`.mergify.yml`). Mergify apre una PR in bozza su
un branch `mergify/merge-queue/`, la CI vi esegue la selezione completa e la PR originale viene unita
quando `Gate / CI`, `Gate / Quality` e `Merge integrity (changelog + generated skills)` hanno esito positivo.

Mergify scrive il riepilogo della coda nella descrizione della bozza e anche altre app possono modificarlo.
Un evento `pull_request` `edited` su una bozza di questo tipo utilizza il proprio gruppo di concorrenza
(`-queue-edit-<run_id>`), quindi non può annullare l'esecuzione effettiva della bozza, e salta il gate e la
matrice. Solo `Merge integrity` viene comunque eseguito. Il job del gate ignorato utilizza un nome di check
diverso, perché Mergify interpreta un `Gate / CI` ignorato come un check non riuscito e rimuove la PR dalla coda.

Dopo la rimozione dalla coda, un push non sempre reinserisce la PR. Aggiungere il commento `@mergifyio queue`.

### Inventario della scansione statica

L'inventario degli alias npm con versione e l'appartenenza alla scansione statica si trovano in
`config/quality/gate-manifest.json`. Eseguire `npm run check:gate-manifest` per convalidare
i nomi degli script e i comandi esatti rispetto a `package.json`; aggiunte, rimozioni e
variazioni dei comandi causano il fallimento sia dell'hook locale sia dei job di classificazione
delle modifiche in CI. Un alias non è un job del workflow, un'istanza della matrice o un caso di
test: questi conteggi non devono essere presentati come intercambiabili.

Utilizzare `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list`
per esaminare gli alias selezionati senza eseguirli. Il runner invoca l'entrypoint npm, pertanto
il relativo runtime, incluso Bun dove configurato, viene preservato. Il manifest registra come
invocati separatamente gli alias esterni a tali profili e i comandi di manutenzione sono vietati
nei profili di scansione di sola lettura.

Questi profili coprono soltanto la scansione statica. Non certificano i test del prodotto,
la copertura, la pacchettizzazione, i controlli esterni o l'accettazione completa della release
di un candidato. L'ammissione da parte del workflow utilizza i file collegati
`config/quality/admission-policy.json` e `scripts/quality/admission-verdict.mjs`. I profili
dell'osservatore della release rimangono separati; esaminare in modo indipendente i controlli
applicabili e le relative ricevute. I comandi statici dell'osservatore completo sono dichiarati
in `config/quality/release-green-static-profile.json`, inclusi `audit:deps`, la selezione dei
mutation test e i controlli delle traduzioni. Il loader convalida i comandi npm rispetto a
package.json e alle dichiarazioni CI/Quality modellate; rifiuta le variazioni anziché eseguire
i token della shell come argomenti. L'output SKIP/INCOMPLETE di uno scanner obbligatorio non può
determinare un PASS. Il profilo registra le proprie esclusioni esterne e non sostituisce le
evidenze ospitate relative a copertura, matrici di test, pacchetti o deployment. L'inventario
testuale seguente è un riferimento, non una prova dell'effettiva esecuzione di un gate.

Gli script si trovano in `scripts/check/` (gate delle policy) e `scripts/quality/` (motore
ratchet). La fonte di verità per CI è `.github/workflows/ci.yml`.

### Integrità della documentazione su base pubblicata

`.github/workflows/i18n-base-health.yml` osserva lo stato della documentazione dopo gli invii selezionati a `main` e `release/v*` e all'invio manuale. I suoi filtri coprono la documentazione, root Markdown, `llm.txt`, traduzione state/configuration e i relativi strumenti i18n. Il singolo lavoro `Published base documentation health` utilizza Ubuntu ospitato e una scadenza di cinque minuti. Esegue la convalida di sola lettura e scrive una ricevuta diagnostica senza installazione di dipendenze, traduzione o adozione dello stato.

`scripts/i18n/check-base-health.mjs` richiede zero incoerenze di hash di origine, destinazione mancante, hash di destinazione, traduzione obsoleta e cache di sezione. Convalida inoltre l'attuale ambito document/locale principale e la sua provenienza registrata. Un contesto non valido, una copertura incompleta o un controllore interrotto producono `INCOMPLETE`; la deriva confermata produce `FAIL`. Entrambi restituiscono uno stato di uscita non riuscito. La ricevuta è destinata al checkout SHA, al flusso di lavoro, all'esecuzione e al tentativo e viene conservata come `i18n-base-health-<sha>-<run>-<attempt>`.

Questa è un'osservazione indipendente della base pubblicata. Non aggiunge un evento PR o di unione di gruppi, un controllo PR richiesto, un alias npm o un membro del profilo di scansione statica. Il controllore sottostante blocca anche tutte e cinque le classi in modalità assoluta. La preparazione ordinaria PR resta separata dall'ammissione. Un caricamento riuscito non può trasformare un risultato di integrità non riuscito in PASS.

Un PR ordinario utilizza `--preflight` con un report di base generato da `--baseline-evidence`. Potrebbe lasciare una fonte inglese in sospeso solo quando il record di traduzione completo e i byte di destinazione effettivi rimangono invariati rispetto a quella base esatta. Le nuove incoerenze della cache di destinazione o di sezione continuano a bloccarsi e le prove incomplete non possono autorizzare la preparazione. Il rapporto espone `preparationPending` e `mergeReady` separatamente: una preparazione riuscita non rende le traduzioni in sospeso pronte per essere unificate. Aggiornare gli specchi interessati nel candidato composto prima dell'ammissione. Il candidato affidabile alla coda Mergify, `merge_group`, i push di ramo e le esecuzioni manuali CI utilizzano il controllo assoluto, senza `--warn` o perdono per errori ereditati. Gli hash di destinazione mancanti e un ambito ridotto dai file core registrati eliminati non possono produrre un verdetto assoluto di successo.

### Rilascia PR percorso rapido (`quality.yml`)

`.github/workflows/quality.yml` integra CI su main/release PRs, invia a `main`, invia e unisci gruppi. PRs utilizza controlli rapidi filtrati dal percorso. La build duplicata disabilitata permanentemente è stata rimossa; i veri controlli build/package/boot rimangono in CI. L'unità suite e vitest vengono eseguite solo in CI (`Unit Tests (N/8)` e `Vitest`).

| Lavoro                                           | Ambito                                                                                                                                                                                                                                                     | Blocco                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs e docs-all                                                                                                                                                                                                                    | SÌ                        |
| `Fast Quality Gates`                             | Codice PRs; controlli statici, typecheck, dashboard typecheck, unit test impattati                                                                                                                                                                         | SÌ                        |
| `Forgotten sibling tests`                        | Codice PRs; moduli modificati tracciati su consumatori statici e test sui fratelli candidati; i percorsi di importazione dinamica e dei barili vengono segnalati come diagnostica consultiva, con eccezioni della lista consentita a cui si fa riferimento | **Consultivo**            |
| `No new ESLint warnings`                         | Codice PRs; protezione anti-pelucchi sensibile alla soppressione                                                                                                                                                                                           | Sì, comprese le forchette |
| `Merge integrity (changelog + generated skills)` | PRs non progetto; registro delle modifiche e sincronizzazione delle abilità generate                                                                                                                                                                       | Sì, comprese le forchette |

#### Rapporto sui test sui fratelli dimenticati

`npm run check:forgotten-sibling-tests` viene eseguito come passaggio consultivo di `Fast Quality Gates` e riutilizza il risolutore di importazione dietro la mappa di impatto del test. Per ogni modulo di produzione modificato, riporta catene `changed module/symbol -> static consumer -> candidate sibling test` deterministiche quando il test candidato è assente dal diff pull-request. Il riepilogo Markdown e il risultato JSON vengono conservati come artefatto del flusso di lavoro `forgotten-sibling-tests` per la calibrazione prima di qualsiasi implementazione di blocco.

Le riesportazioni dei barili e le importazioni dinamiche sono solo strumenti diagnostici di risoluzione; non creano mai un risultato bloccante. Le eccezioni riviste vivono in `config/quality/forgotten-sibling-allowlist.json`. Ogni voce deve nominare il test del consumatore e del candidato, fornire una motivazione specifica e collegare un problema GitHub o una richiesta pull. Le voci non valide vengono chiuse con esito negativo. Le eccezioni non possono sopprimere un test candidato cancellato o un diff che aggiunge `.skip`/`.todo`; l'indebolimento delle affermazioni e altri mascheramenti rimangono di proprietà del cancello `check:test-masking` blocca in modo indipendente.

### Job: `lint`

Viene eseguito su ogni PR verso `main`. Blocca il merge in caso di errore.

| Script (`npm run ...`)            | Verifica                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bloccante                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | La versione di Node.js rientra nell'intervallo supportato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                         |
| `check:cycles`                    | Importazioni circolari in tutto `src/` + `open-sse/` (basato su AST, con `paths` di tsconfig risolti). L'esecuzione senza opzioni termina con codice 1 quando esiste un qualsiasi ciclo (fail-closed dalla #15281) ed elenca le SCC. `check:cycles:ratchet` (eseguito dalla CI) blocca quando il conteggio supera il limite massimo `metrics.cycles` in `quality-baseline.json` — attualmente 14, `direction: down`, quindi può solo diminuire (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì (ratchet)                               |
| `check:boundary`                  | Accoppiamento `open-sse → src`: importazioni univoche da file a file dal motore all'applicazione (`scripts/quality/measure-boundary.mjs`; l'elenco degli archi è il backlog degli interventi correttivi per la suddivisione core/moduli della v4). Esecuzione senza opzioni = report consultivo (come `quality:boundary`). `check:boundary:ratchet` (eseguito dalla CI e incluso anche nel ciclo ratchet fast-gates di `quality.yml`) blocca quando il conteggio supera il limite massimo `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` — inizializzato al valore misurato di 771, `direction: down`; `--update` può solo ridurlo; relativo alla base nelle PR (`--base-ref`, vedere sotto)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì (ratchet)                               |
| `check:route-validation:t06`      | Schemi Zod presenti su tutte le route (criterio di livello 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sì                                         |
| `check:any-budget:t11`            | Il conteggio di `@ts-expect-error // any` non supera il budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sì                                         |
| `check:provider-consistency`      | Ogni provider in `providers.ts` ha una voce corrispondente in `providerRegistry.ts` (e viceversa, entro i limiti dell'allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sì                                         |
| `check:model-lifecycle`           | Le tre tabelle di routing gestite manualmente rimangono coerenti con lo snapshot del ciclo di vita incluso nel repository (#11503): `FITNESS_TABLE` (`taskFitness.ts`) non assegna un punteggio ad alcun ID ritirato che `REGISTRY` può instradare; ogni destinazione di `BUILT_IN_ALIASES` è presente in `REGISTRY` e assente dallo snapshot degli ID ritirati; ogni ID ritirato ancora presente in `REGISTRY` viene inoltrato o elencato in `allowedRetiredInCatalog`; inoltre, nessuna origine o destinazione di `DEFAULT_DEGRADATION_MAP` risulta ritirata in tale snapshot. Ciò non dimostra che un modello sia attualmente erogato da un upstream attivo. Offline — esegue il confronto con `config/quality/model-lifecycle.json`, aggiornato manualmente tramite `npm run quality:refresh-model-lifecycle` (rete; non integrato nella CI). `allowedRetiredInCatalog` è un meccanismo progressivo di riduzione: aggiungere una voce solo in presenza di un issue di tracciamento.                                                                                                                                                                                                                                               | Sì                                         |
| `check:fetch-targets`             | Ogni `fetch("/api/...")` nel codice lato client in `src/` viene risolto in un `route.ts` reale                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sì                                         |
| `check:deps`                      | Tutte le dipendenze installabili con `npm install` in ogni `package.json` del repository sono presenti in `dependency-allowlist.json`; i nuovi pacchetti senza versione bloccata o soggetti a slopsquatting vengono segnalati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sì                                         |
| `audit:deps`                      | Audit npm di tutti e cinque i lockfile indipendenti (radice, Electron, plugin OpenCode v1/v2 e provider). Gli avvisi critici bloccano il processo; gli avvisi di livello alto rimangono visibili come avvertimenti. Gli audit mancanti/non riusciti sono INCOMPLETI e bloccano il processo; gli hash dei lock per ambito e i report vengono conservati.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì                                         |
| `check:lockfile`                  | Integrità di `package-lock.json` — registro https, hash di integrità, nessun override dell'host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sì                                         |
| `check:licenses`                  | Elenco consentito di licenze SPDX per le dipendenze di produzione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì                                         |
| `check:tracked-artifacts`         | Nessun artefatto di build / link simbolico `node_modules` incluso nel repository (viene eseguito anche nell'hook pre-commit di husky; il pre-push è intenzionalmente leggero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                         |
| `check:ai-attribution`            | Nessun trailer `Co-Authored-By` di IA/bot o piè di pagina relativo alla generazione tramite IA nei commit, nel titolo o nel corpo della PR — Regola rigida n. #16 (nel ciclo di controlli rapidi di `quality.yml` per PR→`release/**` — legge il payload dell'evento, non esegue alcuna operazione al di fuori delle PR — e in un passaggio esclusivo per le PR nel lint di `ci.yml` per PR→`main`; anche nell'hook `commit-msg` di husky; coautori umani consentiti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Ogni esclusione di Vitest indica un issue di tracciamento ed è presente in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sì                                         |
| `check:file-size`                 | I file sorgente (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) rimangono entro `cap` e i file di test (`*.test.ts(x)`) entro `testCap`; i file bloccati in `file-size-baseline.json` (`frozen` / `testFrozen`) non devono superare le dimensioni registrate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì                                         |
| `check:error-helper`              | Le risposte di errore negli executor/handler utilizzano `buildErrorBody()` / `sanitizeErrorMessage()` (Regola rigida n. #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì                                         |
| `check:migration-numbering`       | I file SQL di migrazione sono numerati in sequenza, senza interruzioni o duplicati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                         |
| `check:public-creds`              | Nessun valore letterale OAuth `client_id`/`client_secret` o chiave Firebase Web al di fuori di `publicCreds.ts` (Regola rigida n. #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sì                                         |
| `check:db-rules`                  | Nessuna istruzione SQL non elaborata al di fuori dei moduli `src/lib/db/`; nessuna importazione barrel da `localDb.ts` (Regole rigide n. #2/n. #5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                         |
| `check:known-symbols`             | Gli executor dei provider, le strategie di routing e i traduttori registrati nelle rispettive tabelle di dispatch corrispondono ai file presenti sul disco, senza simboli orfani o non dichiarati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì                                         |
| `check:route-guard-membership`    | Ogni route che genera un processo figlio è classificata da `isLocalOnlyPath()` (Regole rigide n. #15/n. #17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì                                         |
| `check:test-discovery`            | Ogni file `*.test.ts` / `*.spec.ts` nel repo viene rilevato da almeno un test runner (ratchet: l'elenco degli orfani in `test-discovery-baseline.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sì                                         |
| `check:test-tla-order`            | Nessun file `node:test` in `tests/unit` registra un test, incontra un `await` a livello superiore e quindi registra altri test (#18045; ratchet: `test-tla-order-allowlist.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                         |
| `check:agent-skills-sync`         | Gli artefatti agent-skills generati corrispondono al catalogo sorgente (nessuna divergenza)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | I loghi/gli asset dei provider dispongono di una voce di provenienza registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | I file di configurazione JSON vengono analizzati correttamente e soddisfano le regole di lint del repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Compilazione TypeScript senza errori (solo avvisi consultivi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sì                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` rigoroso — orientato al futuro; molti call site preesistenti necessitano ancora di annotazioni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Consultivo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitato a `src/app/(dashboard)/**` (#7033) — l'elenco selezionato di 27 file consentiti di `typecheck:core` non include alcun TSX della dashboard e nemmeno `next build` ne esegue il controllo dei tipi (`next.config.mjs` imposta `ignoreBuildErrors: true`), pertanto le regressioni relative a identificatori orfani in tale area (#6625/#6909) erano invisibili alla CI. Esegue il confronto con una baseline congelata del conteggio per file/per codice TS (`config/quality/dashboard-typecheck-baseline.json`, con lo stesso schema di imposizione dell'obsolescenza di `check:known-symbols`) — solo i NUOVI errori oltre il conteggio registrato nella baseline fanno fallire il controllo; ridurre progressivamente la baseline con `--update` quando viene corretto un errore preesistente.                                                                                                                                                                                                                                                                                                                                                                                                                        | Sì                                         |
| `check:build-typecheck`           | Controllo dei tipi di produzione sull'intera applicazione tramite `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), che non sono coperti dalla superficie della lista consentita di 27 file di `typecheck:core` né dal gate della dashboard. Confronta le differenze con `config/quality/build-typecheck-baseline.json`; un nuovo conteggio per (file, codice) o un suo aumento fa fallire il controllo, mentre un conteggio inferiore richiede di ridurre progressivamente la baseline. `--update` rifiuta l'operazione finché l'esecuzione contiene una nuova coppia o una coppia con conteggio aumentato, a meno che non venga passato `--force-regressions`, e rifiuta un file appena silenziato a meno che non venga passato `--force-nocheck`; in questo modo, ampliare la baseline per ottenere un risultato positivo e concedere un silenziamento permanente sono due azioni deliberate e separate. Un `--force` isolato viene rifiutato. Esegue inoltre una scansione dell'ambito di build per `@ts-nocheck` rispetto a `config/quality/ts-nocheck-baseline.json`, perché un file che lo utilizza non segnala affatto diagnostiche e altrimenti sarebbe invisibile a ogni gate. | Sì                                         |

#### Due programmi di controllo dei tipi rispondono in modo diverso

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) e `check:build-typecheck` compilano programmi diversi con opzioni
diverse, e lo stesso file può essere privo di errori in uno e pieno di errori nell'altro.

`tsconfig.build.json` imposta `"strict": false`, quindi `noImplicitAny` è disattivato. La
configurazione core compila una lista consentita curata di 27 file con opzioni più
rigorose e segue il grafo di importazione di ciascuna voce, quindi i file che non
compaiono mai nel programma di build vengono comunque controllati lì.

La conseguenza è importante quando si valuta se un file è tipizzato: **zero diagnostiche
in `check:build-typecheck` non significa zero**. La rimozione di `@ts-nocheck` da 26
file ha mostrato che 23 di essi erano privi di errori nel programma di build; sedici di
questi hanno fatto emergere circa 120 errori di tipo any implicito in quello rigoroso.
Controlla entrambi prima di dichiarare pulito un file.

### Job: `quality-gate`

Viene eseguito dopo `test-coverage`. Blocca il merge in caso di errore.

| Script                       | Verifica                                                                                                                                                                     | Bloccante                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Genera `quality-metrics.json` (conteggio degli avvisi ESLint, copertura dal report aggregato degli shard)                                                                    | Sì (a monte del ratchet) |
| `quality:ratchet`            | Ogni metrica in `quality-baseline.json` non è peggiorata (avvisi ESLint ≤ baseline; copertura ≥ baseline)                                                                    | Sì                       |
| `check:duplication`          | La duplicazione del codice (jscpd@4) non supera la baseline in `quality-baseline.json`                                                                                       | Sì                       |
| `check:complexity`           | La complessità ciclomatica a livello di file non supera il limite (regole ESLint di base `complexity` + `max-lines-per-function`)                                            | Sì                       |
| `check:cognitive-complexity` | Ratchet della complessità cognitiva (`eslint-plugin-sonarjs`) — passaggio ESLint separato; la CI esegue entrambi, combinati nell'unico passaggio `check:complexity-ratchets` | Sì                       |
| `check:dead-code`            | Il ratchet di esportazioni/file inutilizzati (knip) non peggiora rispetto alla baseline                                                                                      | Sì                       |
| `check:compression-budget`   | Budget del benchmark di compressione — le soglie minime di risparmio dei token per motore non devono peggiorare                                                              | Sì                       |
| `check:type-coverage`        | Il ratchet della percentuale di codice tipizzato (`type-coverage`) non peggiora; sostituisce in gran parte `typecheck:noimplicit:core`                                       | Sì                       |

### Job: `codeql-scan` e `codeql-admission`

`codeql-scan` produce tutte le categorie di analisi configurate. Dopo il successo del job, `codeql-admission` verifica i suoi upload esatti e il ratchet degli avvisi del candidato. Entrambi sono dipendenze obbligatorie di `Gate / CI`, anche per candidati che modificano solo documentazione. I requisiti di attivazione amministrativa e canary sono descritti sotto «Ratchet CodeQL» più avanti.

| Script                 | Verifica                                                                                                                                                                                                                     | Bloccante |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | Ref/SHA del candidato e tutte le categorie di analisi configurate devono essere aggiornati prima del ratchet degli avvisi; prove mancanti bloccano. L'inventario globale resta separato — vedere «Ratchet CodeQL» più avanti | Sì        |

### Job: `quality-extended`

Il job blocca i candidati applicabili. Le dimensioni del bundle, i rilevamenti di segreti, i rilevamenti di vulnerabilità,
i rilevamenti nei workflow e le modifiche OpenAPI vengono controllati con ratchet obbligatori.
La diagnostica delle dipendenze circolari rimane informativa. È obbligatoria l'installazione degli scanner:
`scripts/ci/install-quality-scanners.sh` configura versioni fissate e propaga
gli errori di installazione. Strumenti mancanti, report non validi o baseline mancanti lasciano
il controllo obbligatorio dello scanner INCOMPLETO.

| Script                   | Verifica                                                                                                                                                                                                                                           | Blocco                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Nessuna dipendenza circolare (dpdm)                                                                                                                                                                                                                | **Consultivo**                                             |
| `check:bundle-size`      | La dimensione del bundle non supera il limite; l'impossibilità di effettuare la misurazione causa un errore                                                                                                                                        | **Bloccante con --ratchet**                                |
| `check:secrets`          | I rilevamenti di Gitleaks non regrediscono; le scansioni obbligatorie rifiutano strumenti/codice sorgente/baseline mancanti, scansioni non riuscite e report non validi                                                                            | **Bloccante con --ratchet**                                |
| `check:vuln-ratchet`     | Le vulnerabilità delle dipendenze non regrediscono; le scansioni obbligatorie rifiutano strumenti mancanti, report non validi o baseline mancanti                                                                                                  | **Bloccante con --ratchet**                                |
| `check:workflows`        | Lint dei workflow (actionlint + zizmor); scanner mancanti/non funzionanti, report non validi o baseline ratchet mancanti generano un errore INCOMPLETE. I rilevamenti validi seguono la policy strict/advisory/ratchet selezionata                 | Esecuzione obbligatoria; ratchet zizmor bloccante nella CI |
| `check:openapi-breaking` | Contratto dell'API pubblica rispetto ai commit degli eventi fissati (merge-base della PR, stato precedente al push, base del merge group; primo padre del checkout pianificato/manuale); le misurazioni obbligatorie falliscono in modalità chiusa | **Bloccante con --ratchet**                                |

### Lavoro: `docs-sync-strict`

Per le richieste pull a `main` o `release/**`, questo lavoro viene eseguito solo per i candidati non in bozza (o in coda attendibile) classificati come modifiche alla documentazione o al codice. Funziona anche su eventi CI non PR; il trigger push di questo flusso di lavoro copre solo `main`, non `release/**`. Un passo che esce diverso da zero blocca il lavoro; i risultati del solo rapporto e le esenzioni documentate di seguito non lo fanno.

| Script                         | Verifica                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blocco                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-gate che esegue sequenzialmente i 7 sotto-gate riportati di seguito                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                                                                                                                                          |
| ↳ `check:docs-sync`            | Coerenza della versione Package/OpenAPI/CHANGELOG, mirror `llm.txt` esatti, invarianti CHANGELOG section/size tradotti e assenza di documenti duplicati sostituiti                                                                                                                                                                                                                                                                                                                                                       | SÌ                                                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Le pagine della documentazione compilata riportano titoli di frontmatter validi                                                                                                                                                                                                                                                                                                                                                                                                                                          | SÌ                                                                                                                                                          |
| ↳ `check:docs-counts`          | Gli invarianti di conteggio ad alta fiducia sono rigorosi; i controlli euristici del conteggio dei file avvisano solo a meno che lo script non riceva `--strict` (il meta-gate CI non lo passa)                                                                                                                                                                                                                                                                                                                          | Blocco rigoroso dei livelli; consulenza sul livello soft                                                                                                    |
| ↳ `check:env-doc-sync`         | Letture env di origine, `.env.example` e `docs/reference/ENVIRONMENT.md` concordano dopo le liste consentite ignora, solo doc e solo env esplicite                                                                                                                                                                                                                                                                                                                                                                       | Sì, al di fuori delle liste consentite documentate                                                                                                          |
| ↳ `check:deprecated-versions`  | Segnala potenziali versioni obsolete al di fuori di contesti storici sicuri e date di aggiornamento obsolete, escludendo i documenti ignorati                                                                                                                                                                                                                                                                                                                                                                            | Avviso nel cablaggio CI corrente (`--strict` non superato)                                                                                                  |
| ↳ `check:doc-links`            | I collegamenti di markdown interni nei documenti si risolvono in file reali (modulo `[text]`/`(path)` )                                                                                                                                                                                                                                                                                                                                                                                                                  | SÌ                                                                                                                                                          |
| ↳ `check:fabricated-docs`      | Nella base di codice sono presenti percorsi, variabili di ambiente, comandi CLI, nomi di hook e percorsi di file citati nei documenti. Cancello rigido tramite `--strict`; soft-fail senza flag.                                                                                                                                                                                                                                                                                                                         | Sì (tramite `--strict` in CI)                                                                                                                               |
| `check:cli-i18n`               | Le chiavi di `t()` usate dalla CLI esistono in `en`; `pt-BR` conserva ogni sezione di primo livello; `zh-CN` e `zh-TW` contengono tutte le chiavi di `en`                                                                                                                                                                                                                                                                                                                                                                | Sì                                                                                                                                                          |
| `check:openapi-coverage`       | La specifica OpenAPI copre almeno una soglia minima, regolata tramite ratchet, delle route effettive                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì                                                                                                                                                          |
| `check:openapi-security-tiers` | Le annotazioni dichiarate `x-loopback-only`/`x-always-protected` devono trovare riscontro in `routeGuard.ts`; gli errori del parser e le discrepanze del controllo diretto bloccano. Il controllo inverso dell'assenza di `x-loopback-only` sotto i prefissi riservati all'accesso locale genera avvisi, e le route definite solo tramite pattern sono escluse da tale passaggio inverso.                                                                                                                                | I controlli del parser e diretti sono bloccanti; il controllo inverso è consultivo                                                                          |
| `check:openapi-routes`         | Ogni percorso `/api...` in `openapi.yaml` corrisponde a una route reale senza distinguere le differenze nei parametri, dopo l'applicazione dell'elenco di eccezioni giustificate `KNOWN_STALE_SPEC`; anche le voci obsolete dell'elenco causano un errore                                                                                                                                                                                                                                                                | Sì                                                                                                                                                          |
| `check:docs-symbols`           | I riferimenti interni a URL `/api/...` nei documenti canonici che non sono copie speculari corrispondono a una route reale o a una famiglia di route; sono esclusi i riferimenti a proxy, sistemi a monte, segnaposto e file e le voci giustificate di `KNOWN_STALE_DOC_REFS`, mentre le voci obsolete dell'elenco di eccezioni causano un errore                                                                                                                                                                        | Sì                                                                                                                                                          |
| `i18n translation drift`       | L'ammissione assoluta richiede zero incoerenze di origine, destinazione mancante, hash di destinazione, traduzione obsoleta e cache di sezione. La preparazione PR ordinaria può conservare l'esatta prova ereditata o una modifica in sospeso solo in inglese con stato completo e byte di destinazione invariati; il suo rapporto dichiara separatamente la disponibilità alla fusione. Hash di destinazione mancanti e blocco delle prove di base incompleto. Una cache della sezione legacy assente non è un errore. | Tutte e cinque le classi bloccano l'ammissione queue/base ; la preparazione ordinaria consente solo lavori in attesa ereditati comprovati o solo in inglese |

Vengono generati i dodici README SVGs sotto `docs/diagrams/` (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` li rigenera tutti). Ciascuno ha uno unit test di confronto byte (`tests/unit/docs/readme-*-svg.test.ts`, lavoro `test-unit`) che fallisce quando il file sottoposto a commit è obsoleto e `check:docs-counts` legge i numeri canonici dai relativi nodi `<text>` — motivo per cui il passaggio di struttura mantiene ogni stringa delineata nel file come invisibile `<text>`. Il controllo dei numeri canonici SVG legge i file elencati in `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, oltre `public/images/tier-flow-dark.svg` e `tier-flow-light.svg`; le affermazioni free-forever, catalog-entry, recurring-pool e scoring-factors leggono anche `promise-pillars.svg`, `free-tier-budget.svg` e `strategies-grid.svg`. `free-tier-budget.svg` trae le sue cifre dal caricatore del catalogo in tempo reale, quindi una modifica a `FREE_MODEL_BUDGETS` o al nome visualizzato di un fornitore rosso CI finché il file non viene rigenerato.

### Job: `i18n-ui-coverage`

| Script                            | Verifica                                                                                                                                                                                                             | Bloccante     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | La copertura delle chiavi i18n dell'interfaccia utente è ≥ 65%                                                                                                                                                       | Sì            |
| `check-ui-value-drift` (inline)   | La riscrittura di un **valore** inglese non lascia traduzioni obsolete                                                                                                                                               | Sì            |
| `check-new-key-coverage` (inline) | Una **nuova** chiave inglese è tradotta in ogni lingua — un marcatore `__MISSING__:` viene rifiutato                                                                                                                 | Sì            |
| `check-translation-ratio`         | Il rapporto di traduzioni reali per lingua (valori identici all'inglese / segnaposto / voci mancanti non incluse nell'elenco consentito) non deve superare `config/quality/i18n-translation-baseline.json` + margine | **Bloccante** |

Richiede `fetch-depth: 0` — il controllo della divergenza dei valori confronta `en.json` con la base di merge.

#### `check-ui-value-drift` — gate delle traduzioni obsolete

Rileva l'unica regressione i18n che gli altri controlli non possono individuare strutturalmente: un valore inglese
viene riscritto e le traduzioni derivate dall'inglese _precedente_ rimangono invariate, per cui
gli utenti non anglofoni continuano a leggere un testo formulato in modo autorevole, ma ormai errato.

È accaduto realmente in produzione. `oauthModal.googleOAuthWarning` è stato riscritto quando è stato introdotto
l'helper di accesso Antigravity (#5203); **39 lingue su 43** hanno mantenuto il testo che indicava agli operatori di "copiare
l'URL completo e incollarlo qui sotto" — un flusso che non può essere completato per quel provider. Il problema è
passato inosservato fino alla #8463 perché:

- `sync-ui-keys` inserisce solo le chiavi **assenti**, mai quelle **obsolete**;
- `check-ui-keys-coverage` conta la _presenza_ delle chiavi, quindi una traduzione obsoleta viene considerata coperta;
- `check-translation-drift` tiene traccia dei mirror della documentazione `docs/i18n/<locale>/**.md` —
  non legge mai `src/i18n/messages/*.json`. Bloccante nel job `docs-sync-strict` dalla
  risincronizzazione 2026-09: modifica un documento principale → `npm run i18n:run -- --files=<doc>` (a livello di sezione, poco costoso).

**Basato sulle differenze, non su una baseline.** Confronta `en.json` alla base di merge con l'albero
di lavoro; per ogni chiave il cui valore inglese è cambiato, qualsiasi lingua che mantenga ancora una
traduzione invariata è obsoleta. Questo comportamento **congela intenzionalmente il debito preesistente** — una differenza
non può rivelare da quale vecchio testo inglese derivi una traduzione esistente da tempo, quindi il controllo valuta
solo ciò che viene toccato dalla modifica corrente. L'alternativa (una baseline di hash per chiave) richiederebbe
un file generato di circa 600 KB, 3 volte più grande della maggiore baseline esistente, modificato a ogni PR i18n.

Esistono due modi per soddisfare il controllo:

1. aggiornare le traduzioni interessate, oppure
2. impostarle su `__MISSING__:<new english>` — il runtime fornisce quindi il testo inglese corretto
   (`src/i18n/request.ts::deepMergeFallback`, #7258) e la chiave viene messa in coda per la traduzione.

Se è cambiato il **significato** della stringa, è preferibile **rinominare la chiave**: una nuova chiave non può ereditare
una traduzione obsoleta. Questo è il modello usato dalla #8463.

```bash
npm run i18n:check-value-drift          # rigoroso (quello eseguito dalla CI)
npm run i18n:check-value-drift:warn     # solo segnalazione
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

### Job: `test-vitest`

Richiede il job di classificazione `changes`. Gli shard applicabili della matrice bloccano il merge in caso di errore.

| Suite            | Verifica                                                     | Bloccante                                                                                                                      |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Server MCP (110 strumenti), autoCombo, cache — runner vitest | Sì                                                                                                                             |
| `test:vitest:ui` | Test dei componenti UI — runner vitest                       | **Bloccante** — gli errori preesistenti sono esplicitamente esclusi in `vitest.config.ts`; i nuovi errori fanno fallire il job |

### Flussi di lavoro notturni (programmati, avvisi)

Questi vengono eseguiti secondo una pianificazione cron (e `workflow_dispatch`), mai su PRs. Sono tutti consultivi.

| Flusso di lavoro       | Verifica                                                                                                                                                                       | Bloccante      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `nightly-property`     | test delle proprietà fast-check con seed casuale e un numero elevato di esecuzioni                                                                                             | **Consultivo** |
| `nightly-resilience`   | controllo della crescita dell'heap, inserimento caotico di guasti, test di carico/prolungati con k6                                                                            | **Consultivo** |
| `nightly-llm-security` | protezione dalle injection di promptfoo (modalità di blocco) + sonde garak (ignorate senza il segreto di un provider)                                                          | **Consultivo** |
| `nightly-schemathesis` | fuzzing del contratto OpenAPI (schemathesis) su un'istanza OmniRoute attiva usando `docs/openapi.yaml` — rileva violazioni della specifica/errori 500 non gestiti (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | punteggio dei test di mutazione Stryker sul percorso rapido dei test unitari — i mutanti sopravvissuti evidenziano asserzioni deboli                                           | **Consultivo** |
| `nightly-compat`       | matrice di compatibilità del motore Node per gli intervalli `engines.node` supportati                                                                                          | **Consultivo** |

Le baseline delle prestazioni (heap, TTFB, tempo di build) vengono registrate, ma non usate come criteri di blocco: vedere [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
