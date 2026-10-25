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

I workflow CI e Quality Gates emettono ciascuno un verdetto stabile: `Gate / CI` e
`Gate / Quality`. La loro policy di ammissione versionata enumera ogni job a monte
come obbligatorio o consultivo. Un job obbligatorio applicabile deve avere successo:
risultati mancanti, annullati, saltati, in sospeso o sconosciuti non possono stabilire
un PASS. Una classificazione valida di tipo solo documentazione o solo catalogo può
rendere inapplicabile una corsia di codice; una PR in bozza non è un candidato
accettato. Un'etichetta `hotfix` non esime dal fornire evidenze.

Entrambi i workflow coprono le PR verso i branch main/release, i push su `main`, il
dispatch manuale e gli eventi merge-group. Push, dispatch e merge-group eseguono la
selezione completa. I push su `release/**` non li avviano (2026-10-18): ogni modifica
ha già eseguito la matrice sulla propria PR e la combinazione risultante dal merge è
compito di Release-Green (`docs/ops/RUNNER_BOX.md` → corsia Hosted). I fork e i merge
group usano runner hosted per i job che altrimenti selezionerebbero runner
self-hosted; prima del rollout è necessario verificare che la capacità hosted sia
sufficiente.

Ogni ricevuta JSON identifica lo SHA sottoposto a checkout, l'esecuzione del workflow
e il tentativo. La CLI rifiuta una discrepanza tra lo SHA del checkout e quello
dell'evento. I test del workflow vincolano l'appartenenza alla policy alla lista
`needs` del job di verdetto, così che una corsia nuova o rimossa non possa scomparire
silenziosamente. Le ricevute coprono il proprio workflow, non la pubblicazione, il
deployment o i meccanismi interni di uno scanner consultivo esistente. Attivare
entrambi i nomi dei check nelle regole dei branch è una modifica amministrativa
separata; l'aggiunta di questi job non protegge di per sé un branch.

### Inventario della scansione statica

L'inventario versionato degli alias npm e l'appartenenza alla scansione statica
risiedono in `config/quality/gate-manifest.json`. Esegui `npm run check:gate-manifest`
per validare i nomi degli script e i comandi esatti rispetto a `package.json`;
aggiunte, rimozioni e derive dei comandi fanno fallire sia l'hook locale sia i job di
classificazione delle modifiche in CI. Un alias non è un job del workflow, un'istanza
di matrice o un caso di test: questi conteggi non devono essere presentati come
intercambiabili.

Usa `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list`
per ispezionare gli alias selezionati senza eseguirli. Il runner invoca l'entrypoint
npm, quindi il suo runtime (incluso Bun dove configurato) è preservato.
Il manifest registra gli alias esterni a quei profili come invocati separatamente, e
i comandi di manutenzione sono vietati nei profili di scansione di sola lettura.

Questi profili coprono solo la scansione statica. Non certificano test di prodotto,
copertura, packaging, controlli esterni o la piena accettazione al rilascio di un
candidato. L'ammissione del workflow usa i collegati `config/quality/admission-policy.json`
e `scripts/quality/admission-verdict.mjs`. I profili release-observer restano separati;
ispeziona i loro controlli applicabili e le loro ricevute in modo indipendente.
L'inventario in prosa qui sotto è un riferimento, non la prova che un gate sia stato
effettivamente eseguito.

Gli script risiedono in `scripts/check/` (gate di policy) e `scripts/quality/` (motore ratchet).
La fonte di verità della CI è `.github/workflows/ci.yml`.

### Fast-path delle PR di rilascio (`quality.yml`)

`.github/workflows/quality.yml` integra la CI sulle PR main/release, sui push verso `main`,
sul dispatch e sui merge group. Le PR usano controlli rapidi filtrati per percorso. La
build duplicata permanentemente disabilitata è stata rimossa; i controlli reali di
build/package/boot restano nella CI.

| Job                                              | Ambito                                                                                                                                                                                                                         | Bloccante          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `Docs Gates (fast-path)`                         | PR di documentazione/codice; riferimenti docs API e docs-all                                                                                                                                                                   | Sì                 |
| `Fast Quality Gates`                             | PR di codice; controlli statici, typecheck, typecheck della dashboard, test unitari interessati                                                                                                                                | Sì                 |
| `Forgotten sibling tests`                        | PR di codice; moduli modificati tracciati fino ai consumatori statici e ai test sibling candidati; i percorsi barrel e a import dinamico sono riportati come diagnostica consultiva, con eccezioni nell'allowlist referenziata | **Consultivo**     |
| `Vitest (fast-path)`                             | PR di codice; suite vitest rapida                                                                                                                                                                                              | Sì                 |
| `Unit Tests fast-path`                           | PR di codice; suite unitaria a 4 shard                                                                                                                                                                                         | Sì                 |
| `No new ESLint warnings`                         | PR di codice; guardia lint che tiene conto delle soppressioni                                                                                                                                                                  | Sì, inclusi i fork |
| `Merge integrity (changelog + generated skills)` | PR non in bozza; sincronizzazione del changelog e degli skill generati                                                                                                                                                         | Sì, inclusi i fork |

#### Report dei Forgotten sibling tests

`npm run check:forgotten-sibling-tests` riutilizza il resolver di import alla base della mappa di impatto dei test.
Per ogni modulo di produzione modificato, riporta le catene deterministiche
`changed module/symbol -> static consumer -> candidate sibling test` quando il test candidato
è assente dal diff della pull request. Il riepilogo Markdown e il risultato JSON vengono conservati
come artefatto del workflow `forgotten-sibling-tests` per la calibrazione prima di qualsiasi rollout bloccante.

Le riesportazioni barrel e gli import dinamici sono solo diagnostiche di risoluzione; non generano mai
un riscontro bloccante. Le eccezioni revisionate risiedono in
`config/quality/forgotten-sibling-allowlist.json`. Ogni voce deve indicare il consumer e il test
candidato, fornire una motivazione specifica e collegare una issue o una pull request di GitHub.
Le voci malformate falliscono in modo chiuso. Le eccezioni non possono sopprimere un test candidato
eliminato né un diff che aggiunga `.skip`/`.todo`; l'indebolimento delle asserzioni e le altre forme
di mascheramento restano di competenza del gate `check:test-masking`, che blocca in modo indipendente.

### Job: `lint`

Viene eseguito su ogni PR verso `main`. Blocca il merge in caso di fallimento.

| Script (`npm run ...`)            | Convalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Bloccante                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | La versione di Node.js è compresa nell'intervallo supportato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì                                            |
| `check:cycles`                    | Importazioni circolari in tutto `src/` + `open-sse/` (basato su AST, con risoluzione dei `paths` di tsconfig). Il comando base termina con codice 1 ogni volta che esiste un ciclo (fail-closed dalla #15281) ed elenca le SCC. `check:cycles:ratchet` (ciò che esegue la CI) blocca quando il conteggio supera il limite `metrics.cycles` in `quality-baseline.json` — attualmente 14, `direction: down`, quindi può solo diminuire (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sì (ratchet)                                  |
| `check:boundary`                  | Accoppiamento `open-sse → src`: importazioni univoche file-a-file dal motore verso l'app (`scripts/quality/measure-boundary.mjs`; l'elenco degli archi costituisce il backlog di remediation del core/module-split v4). Il comando base = report puramente informativo (come `quality:boundary`). `check:boundary:ratchet` (ciò che esegue la CI, anche nel ciclo ratchet dei fast-gates di `quality.yml`) blocca quando il conteggio supera il limite `metrics.boundaryOpenSseToSrc` in `quality-baseline.json` — inizializzato al valore misurato di 771, `direction: down`; `--update` può solo abbassarlo; relativo alla base nelle PR (`--base-ref`, vedi sotto)                                                                                                                                                                                                                                                            | Sì (ratchet)                                  |
| `check:route-validation:t06`      | Schemi Zod presenti su tutte le rotte (policy Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sì                                            |
| `check:any-budget:t11`            | Il conteggio di `@ts-expect-error // any` non supera il budget (cricchetto Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sì                                            |
| `check:provider-consistency`      | Ogni provider in `providers.ts` ha una voce corrispondente in `providerRegistry.ts` (e viceversa, all'interno dell'allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sì                                            |
| `check:model-lifecycle`           | Le tre tabelle di routing mantenute a mano restano coerenti con lo snapshot del ciclo di vita archiviato nel repository (#11503): `FITNESS_TABLE` (`taskFitness.ts`) non assegna punteggi ad alcun id ritirato che `REGISTRY` possa instradare; ogni destinazione di `BUILT_IN_ALIASES` è presente in `REGISTRY` e assente dallo snapshot degli id ritirati; ogni id ritirato ancora presente in `REGISTRY` è inoltrato oppure elencato in `allowedRetiredInCatalog`; e nessuna origine o destinazione di `DEFAULT_DEGRADATION_MAP` risulta ritirata in quello snapshot. Questo non dimostra che un modello sia attualmente servito da un upstream attivo. Offline — confronta con `config/quality/model-lifecycle.json`, aggiornato a mano con `npm run quality:refresh-model-lifecycle` (rete; non integrato in CI). `allowedRetiredInCatalog` è un cricchetto burn-down: aggiungi una voce solo con un issue di tracciamento. | Sì                                            |
| `check:fetch-targets`             | Ogni `fetch("/api/...")` nel `src/` lato client si risolve in un vero `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                            |
| `check:deps`                      | Tutte le dipendenze installabili con `npm install` in ogni `package.json` del repo sono presenti in `dependency-allowlist.json`; i nuovi pacchetti non fissati o slopsquattati vengono segnalati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                            |
| `audit:deps`                      | `npm audit` (root + electron) — nessun advisory alto/critico (si sovrappone a osv `check:vuln-ratchet`; vedi Backlog di razionalizzazione)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sì                                            |
| `check:lockfile`                  | Integrità di `package-lock.json` — registro https, hash di integrità, nessun override degli host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                            |
| `check:licenses`                  | Allowlist di licenze SPDX per le dipendenze di produzione                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sì                                            |
| `check:tracked-artifacts`         | Nessun artefatto di build / symlink di `node_modules` committati (viene eseguito anche nel pre-commit di husky; il pre-push è intenzionalmente leggero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sì                                            |
| `check:ai-attribution`            | Nessun trailer `Co-Authored-By` di AI/bot né footer di generazione AI nei commit, nel titolo o nel corpo delle PR — Regola ferrea n. 16 (nel ciclo fast-gates di `quality.yml` per PR→`release/**` — legge il payload dell'evento, no-op al di fuori delle PR — e uno step riservato alle PR nel lint di `ci.yml` per PR→`main`; anche l'hook `commit-msg` di husky; co-autori umani consentiti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Ogni esclusione di Vitest riporta un issue di tracciamento e compare in `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sì                                            |
| `check:file-size`                 | I file sorgente (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) restano entro `cap` e i file di test (`*.test.ts(x)`) entro `testCap`; i file congelati in `file-size-baseline.json` (`frozen` / `testFrozen`) non devono superare la dimensione registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sì                                            |
| `check:error-helper`              | Le risposte di errore negli executor/handler usano `buildErrorBody()` / `sanitizeErrorMessage()` (Regola ferrea #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                            |
| `check:migration-numbering`       | I file SQL di migrazione sono numerati in sequenza, senza salti o duplicati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sì                                            |
| `check:public-creds`              | Nessun `client_id`/`client_secret` OAuth letterale o chiave Firebase Web al di fuori di `publicCreds.ts` (Regola ferrea #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sì                                            |
| `check:db-rules`                  | Nessun SQL grezzo al di fuori dei moduli `src/lib/db/`; nessun barrel import da `localDb.ts` (Regole ferree #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sì                                            |
| `check:known-symbols`             | Gli executor dei provider, le strategie di routing e i traduttori registrati nelle rispettive tabelle di dispatch corrispondono ai file su disco — nessun simbolo orfano o non dichiarato                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sì                                            |
| `check:route-guard-membership`    | Ogni route che genera un processo figlio è classificata da `isLocalOnlyPath()` (Regole ferree #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sì                                            |
| `check:test-discovery`            | Ogni file `*.test.ts` / `*.spec.ts` nel repo è raccolto da almeno un test runner (ratchet: l'elenco degli orfani in `test-discovery-baseline.json` può solo ridursi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sì                                            |
| `check:agent-skills-sync`         | Gli artefatti agent-skills generati corrispondono al loro catalogo sorgente (nessuna deriva)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | I loghi/asset dei provider riportano una voce di provenienza registrata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | I file di configurazione JSON vengono analizzati correttamente e soddisfano le regole di lint del repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | Compilazione TypeScript senza errori (solo avvisi non bloccanti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sì                                            |
| `typecheck:noimplicit:core`       | `noImplicitAny` rigoroso — orientato al futuro; molti punti di chiamata preesistenti richiedono ancora annotazioni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Non bloccante** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` con ambito limitato a `src/app/(dashboard)/**` (#7033) — l'allowlist curata di 27 file di `typecheck:core` non include alcun TSX della dashboard, e anche `next build` non ne esegue mai il type-check (`next.config.mjs` imposta `ignoreBuildErrors: true`), quindi le regressioni di identificatori orfani in quell'area (#6625/#6909) erano invisibili alla CI. Confronto con una baseline congelata dei conteggi per file/per codice TS (`config/quality/dashboard-typecheck-baseline.json`, stesso pattern di enforcement anti-obsolescenza di `check:known-symbols`) — solo i NUOVI errori oltre il conteggio della baseline fanno fallire il gate; abbassare la baseline con `--update` quando un errore preesistente viene corretto.                                                                                                                                                                               | Sì                                            |

### Job: `quality-gate`

Viene eseguito dopo `test-coverage`. Blocca il merge in caso di fallimento.

| Script                       | Verifica                                                                                                                                                                                     | Bloccante                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Emette `quality-metrics.json` (conteggio dei warning ESLint, copertura dal report unito degli shard)                                                                                         | Sì (a monte del ratchet) |
| `quality:ratchet`            | Ogni metrica in `quality-baseline.json` non è regredita (warning ESLint ≤ baseline; copertura ≥ baseline)                                                                                    | Sì                       |
| `check:duplication`          | La duplicazione del codice (jscpd@4) non supera la baseline in `quality-baseline.json`                                                                                                       | Sì                       |
| `check:complexity`           | La complessità ciclomatica a livello di file non supera il limite (`complexity` di ESLint core + `max-lines-per-function`)                                                                   | Sì                       |
| `check:cognitive-complexity` | Ratchet della complessità cognitiva (`eslint-plugin-sonarjs`) — passata ESLint separata; la CI esegue entrambe unite come singolo step `check:complexity-ratchets`                           | Sì                       |
| `check:dead-code`            | Il ratchet di export / file inutilizzati (knip) non regredisce rispetto alla baseline                                                                                                        | Sì                       |
| `check:compression-budget`   | Budget del benchmark di compressione — le soglie minime di risparmio di token per motore non devono regredire                                                                                | Sì                       |
| `check:type-coverage`        | Il ratchet della percentuale di tipizzazione (`type-coverage`) non regredisce; sostituisce in gran parte `typecheck:noimplicit:core`                                                         | Sì                       |
| `check:codeql-ratchet`       | Il conteggio degli alert CodeQL aperti non regredisce (lettura tramite `gh api`; salto automatico senza token) — cadenza di aggiornamento e attivazione manuale: vedi "Ratchet CodeQL" sotto | Sì                       |

### Job: `quality-extended`

L'intero job è consultivo (`continue-on-error: true`). I ratchet basati su npm vengono eseguiti
realmente; gli scanner esterni si installano tramite `gh release download` e si saltano
automaticamente (exit 0) quando un binario è ancora assente.

| Script                   | Verifica                                                                                                                                                                                                                           | Bloccante                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Nessuna dipendenza circolare (dpdm)                                                                                                                                                                                                | **Consultivo**                                          |
| `check:bundle-size`      | La dimensione del bundle non supera il limite                                                                                                                                                                                      | **Consultivo**                                          |
| `check:secrets`          | Scansione dei segreti (gitleaks) — salta se il binario è assente                                                                                                                                                                   | **Consultivo**                                          |
| `check:vuln-ratchet`     | Le vulnerabilità delle dipendenze (osv-scanner) non regrediscono — salta se il binario è assente                                                                                                                                   | **Consultivo**                                          |
| `check:workflows`        | Lint dei workflow (actionlint + zizmor); scanner mancanti/malfunzionanti, report non validi o baseline del ratchet mancante falliscono come INCOMPLETE. I risultati validi seguono la politica strict/advisory/ratchet selezionata | Esecuzione obbligatoria; ratchet zizmor bloccante in CI |
| `check:openapi-breaking` | Modifiche breaking al contratto API pubblico (`openapi.yaml`) rispetto al branch base (oasdiff) — emette `openapiBreaking=N`; salta se oasdiff è assente o la specifica base non è risolvibile                                     | **Consultivo**                                          |

### Job: `docs-sync-strict`

Viene eseguito su ogni PR verso `main`. Blocca il merge in caso di fallimento.

| Script                         | Verifica                                                                                                                                                                              | Bloccante                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Meta-gate che esegue in sequenza i 6 sub-gate sottostanti                                                                                                                             | Sì                            |
| ↳ `check:docs-sync`            | Coerenza delle versioni di CHANGELOG / OpenAPI / llm.txt                                                                                                                              | Sì                            |
| ↳ `check:docs-counts`          | I conteggi nel testo (numero di provider, numero di migrazioni, ecc.) rientrano nella finestra di ratchet rispetto ai conteggi reali                                                  | Sì                            |
| ↳ `check:env-doc-sync`         | Ogni variabile d'ambiente in `.env.example` è documentata in una tabella della documentazione, e viceversa                                                                            | Sì                            |
| ↳ `check:deprecated-versions`  | Nessuna stringa di versione deprecata nella documentazione                                                                                                                            | Sì                            |
| ↳ `check:doc-links`            | I link markdown interni nella documentazione puntano a file reali (forma `[text]`/`(path)`)                                                                                           | Sì                            |
| ↳ `check:fabricated-docs`      | Route, variabili d'ambiente, comandi CLI, nomi di hook e percorsi di file citati nella documentazione esistono nel codebase. Gate rigido tramite `--strict`; soft-fail senza il flag. | Sì (tramite `--strict` in CI) |
| `check:cli-i18n`               | Le stringhe dei comandi CLI sono presenti in tutti i file di localizzazione i18n                                                                                                      | Sì                            |
| `check:openapi-coverage`       | La specifica OpenAPI copre almeno una soglia minima a ratchet di route reali                                                                                                          | Sì                            |
| `check:openapi-security-tiers` | Le annotazioni dei livelli di sicurezza in `openapi.yaml` sono coerenti con le classificazioni di `routeGuard.ts`                                                                     | **Consultivo**                |
| `check:openapi-routes`         | Ogni percorso in `openapi.yaml` corrisponde a un vero `route.ts` (anti-allucinazione)                                                                                                 | Sì                            |
| `check:docs-symbols`           | Ogni riferimento `/api/...` in `docs/**/*.md` corrisponde a un vero `route.ts` (anti-allucinazione)                                                                                   | Sì                            |
| `i18n translation drift`       | Chiavi non tradotte nei file di localizzazione i18n — solo avviso                                                                                                                     | **Consultivo**                |

### Job: `i18n-ui-coverage`

| Script                            | Verifica                                                                                                                                                                                                                       | Bloccante      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `check-ui-keys-coverage` (inline) | La copertura delle chiavi i18n della UI è ≥ 65%                                                                                                                                                                                | Sì             |
| `check-ui-value-drift` (inline)   | Un **valore** inglese riscritto non lascia dietro di sé traduzioni obsolete                                                                                                                                                    | Sì             |
| `check-new-key-coverage` (inline) | Una **nuova** chiave inglese è tradotta in ogni locale — un marcatore `__MISSING__:` viene rifiutato                                                                                                                           | Sì             |
| `check-translation-ratio`         | Il rapporto di traduzioni reali per locale (chiavi foglia identiche all'inglese / placeholder / mancanti al di fuori dell'allowlist) non deve superare `config/quality/i18n-translation-baseline.json` + margine di tolleranza | **Consultivo** |

Richiede `fetch-depth: 0` — il gate di value-drift esegue il diff di `en.json` rispetto alla merge base.

#### `check-ui-value-drift` — gate anti-traduzioni obsolete

Intercetta l'unica regressione i18n che gli altri gate strutturalmente non possono vedere: un
valore inglese viene riscritto e le traduzioni derivate dall'inglese _precedente_ restano
indietro, così gli utenti non anglofoni continuano a leggere testi formulati in modo
convincente ma ormai errati.

È successo davvero. `oauthModal.googleOAuthWarning` è stato riscritto quando è stato introdotto
l'helper di login Antigravity (#5203); **39 locale su 43** conservavano un testo che invitava
gli operatori a «copiare l'URL completo e incollarlo qui sotto» — un flusso che per quel
provider non può andare a buon fine. È passato inosservato fino alla #8463 perché:

- `sync-ui-keys` reintegra solo le chiavi **assenti**, mai quelle **obsolete**;
- `check-ui-keys-coverage` conta la _presenza_ delle chiavi, quindi una traduzione obsoleta viene conteggiata come coperta;
- `check-translation-drift` tiene traccia dei mirror della documentazione `docs/i18n/<locale>/**.md` —
  non legge mai `src/i18n/messages/*.json`. Bloccante nel job `docs-sync-strict` dalla
  risincronizzazione 2026-09: modifichi un documento core → `npm run i18n:run -- --files=<doc>`
  (a livello di sezione, poco costoso).

**Consapevole del diff, non basata su baseline.** Confronta `en.json` al merge base con l'albero di lavoro; per ogni chiave il cui valore inglese è cambiato, qualsiasi locale che contiene ancora una traduzione non toccata è obsoleta. Questo **congela deliberatamente il debito preesistente** — un diff non può rivelare da quale vecchio testo inglese provenga una traduzione di lunga data, quindi il gate valuta solo ciò che la modifica corrente tocca. L'alternativa (una baseline di hash per chiave) costerebbe un file generato di ~600 KB, 3× la baseline esistente più grande, con modifiche continue a ogni PR i18n.

Due modi per soddisfarla:

1. aggiornare le traduzioni interessate, oppure
2. impostarle a `__MISSING__:<new english>` — il runtime serve quindi l'inglese corretto
   (`src/i18n/request.ts::deepMergeFallback`, #7258) e la chiave entra in coda per la traduzione.

Se il **significato** della stringa è cambiato, preferisci **rinominare la chiave**: una nuova chiave non può ereditare una traduzione obsoleta. Questo è il pattern usato da #8463.

```bash
npm run i18n:check-value-drift          # rigoroso (ciò che esegue la CI)
npm run i18n:check-value-drift:warn     # solo report
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Esce con 0 e `SKIP reason=base-unresolved` quando il catalogo base non può essere letto (clone shallow senza il ref base), rispecchiando `check-openapi-breaking`.

### Job: `i18n`

Matrice completa di validazione i18n (un job per locale). L'intero job è consultivo.

| Script                          | Convalida                               | Bloccante                                                  |
| ------------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Completezza delle traduzioni per locale | **Consultivo** (`continue-on-error: true` sull'intero job) |

### Job: `pr-test-policy`

Viene eseguito solo sulle pull request.

| Script                 | Convalida                                                                                                                                               | Bloccante |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | Le PR che modificano codice di produzione in `src/`, `open-sse/`, `electron/` o `bin/` devono includere o aggiornare i test (Regola ferrea #8)          | Sì        |
| `check:test-masking`   | I file di test modificati non riducono il conteggio netto degli assert né aggiungono tautologie `assert.ok(true)`                                       | Sì        |
| `check:pr-evidence`    | Il corpo della PR cita evidenze di test/VPS per la modifica (meccanizza la Regola ferrea #18 tramite grep sulla prosa della PR — fragile, vedi Backlog) | Sì        |

### Job: `test-vitest`

Viene eseguito dopo `build`. Blocca il merge in caso di fallimento.

| Suite            | Convalida                                                    | Bloccante                                                                                                                          |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 strumenti), autoCombo, cache — runner vitest | Sì                                                                                                                                 |
| `test:vitest:ui` | Test dei componenti UI — runner vitest                       | **Bloccante** — i fallimenti preesistenti sono esplicitamente esclusi in `vitest.config.ts`; nuovi fallimenti fanno fallire il job |

### Workflow notturni (pianificati, consultivi)

Vengono eseguiti secondo una pianificazione cron (e `workflow_dispatch`), mai sulle PR. Tutti sono consultivi.

| Workflow               | Convalida                                                                                                                                                                         | Bloccante      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Property test fast-check con seed casuale + numero elevato di esecuzioni                                                                                                          | **Consultivo** |
| `nightly-resilience`   | Gate di crescita dell'heap, fault-injection chaos, carico/soak k6                                                                                                                 | **Consultivo** |
| `nightly-llm-security` | Guardia anti-injection promptfoo (modalità block) + sonde garak (saltate senza un secret del provider)                                                                            | **Consultivo** |
| `nightly-schemathesis` | Fuzzing del contratto OpenAPI (schemathesis) contro un OmniRoute attivo usando `docs/openapi.yaml` — fa emergere violazioni della specifica / errori 500 non gestiti (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Punteggio di mutation-testing Stryker sulla lane unitaria veloce — i mutanti sopravvissuti fanno emergere assert deboli                                                           | **Consultivo** |
| `nightly-compat`       | Matrice di compatibilità del motore Node attraverso gli intervalli `engines.node` supportati                                                                                      | **Consultivo** |

Le baseline di prestazioni (heap, TTFB, tempo di build) vengono registrate, non sottoposte a gate: vedi [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
