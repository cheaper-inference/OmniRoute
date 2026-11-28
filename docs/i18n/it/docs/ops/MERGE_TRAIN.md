# Merge Queue & Manual Merge-Train Runbook (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Atterraggio su un ramo di rilascio

La coda omnidirezionale regola gli sbarchi in `release/vX.Y.Z`. Leggi lo `mode` di livello superiore in `config/merge-queue/config.json` sul ramo predefinito prima di eseguire un PR. Vedere [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** esegue la convalida e lascia l'atterraggio a un'unione manuale. Applicare `omni-queue` allo PR approvato nella sua testa finale. Verifica l'idoneità con `npm run queue -- why <PR>`. Aspetta il verdetto per quella testa in `npm run queue -- history --base <branch>`. Procedi su `would-land`. Su `culprit-found` o `would-dequeue`, mantieni l'unione e risolvi la causa.
- **Eccezioni ombra.** Un treno con CI verde piena contro la punta base attuale può procedere senza un verdetto di coda separato. La stessa eccezione si applica quando la testa PR contiene già la punta base corrente.
- **`live`** utilizza l'etichetta `omni-queue` per attivare l'atterraggio. Solo la coda ottiene lo PR. Lascia i comandi di unione e dirigi i push alla coda.

Ogni pianerottolo necessita dell'autorizzazione del proprietario e delle opportune verifiche previste. Applicare `omni-queue` solo dopo che il proprietario ha autorizzato lo sbarco. PRs in coda che toccano percorsi protetti richiedono anche la decisione `protected-approved` del proprietario per quello PR.

Il set di regole "Richiedi porte verdi al rilascio attivo" richiede `Gate / CI` e `Gate / Quality` verdi sulla testa. Non usare mai `--admin` per bypassare un cancello rosso. Un blocco di rilascio del blocco si fonde nel ramo congelato. Vedi [la regola difficile 21](HARD_RULES_DETAIL.md). Non etichettare, unire o inviare mai a una richiesta pull che sta funzionando in un'altra sessione. Vedi [la regola difficile 22](HARD_RULES_DETAIL.md).

## La richiesta di prelievo del treno

1. Avvia una diramazione del treno all'attuale punta della base di rilascio. Integra gli esatti capi dei membri approvati utilizzando i commit di unione. Preserva la cronologia dei commit evitando schiacciamenti e rebase.
2. Apri una richiesta pull per la filiale del treno. Convalida PR con il proprio CI completo sul suggerimento base corrente. Ricontrollare la punta della base e le teste dei membri approvati prima dell'atterraggio. Aggiorna il treno e il suo CI quando cambia il candidato validato.
3. Fai atterrare il treno PR con un commit di unione nella modalità coda applicabile. In modalità live, il metodo di destinazione `merge-ff` della coda preserva i commit di unione. Le teste dei membri originali diventano raggiungibili dal ramo di rilascio. GitHub contrassegna il membro PRs come unito e i commit mantengono i propri autori.

Un esempio pubblico è [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). Ha combinato 18 membri PRs ed è arrivato con un commit di fusione il 24-11-2026.

Anche una sincronizzazione da `main` al ramo di rilascio successivo avviene tramite un commit di unione. La conservazione dell'ascendenza `main` è necessaria per i successivi sync-back. Vedere [Isolamento dell'albero di lavoro](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Il validatore locale del treno di fusione

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Il validatore recupera la base e le teste PR e le combina in un albero di lavoro usa e getta. Esegue la sua suite di parità una volta sull'albero risultante. Un conflitto di head fetch o merge non riuscito espelle PR e lo script continua con il rimanente PRs.

- **`--plan`** stampa i passaggi della modalità selezionata ed esce senza creare un albero di lavoro o contattare il remoto. Combinalo con `--fast` per ispezionare il piano veloce.
- **`--fast`** esegue le porte statiche comuni, i file `node:test` modificati selezionati in `tests/unit/` e `npm run test:vitest`. Eseguire una convalida locale completa almeno una volta al giorno sulla punta accumulata quando si utilizza la modalità veloce.
- **Modalità completa** aggiunge le porte statiche completamente complete ed esegue `npm run test:unit` e `npm run test:vitest`.

Un gate statico difettoso viene eseguito nuovamente sulla base non toccata se la sonda base è disponibile. Lo script riporta i guasti ereditati e continua quando ogni riga di violazione riconosciuta appare anche sulla base e il conteggio totale non è aumentato.

| Uscita | Senso                                                                                                                                                                            |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`    | Stampato il piano o completato la suite. Il riepilogo della suite elenca tutti gli errori statici ereditati e PRs espulsi.                                                       |
| `1`    | Argomenti non validi, nessun checkout Git, preflight non riuscito o nessun PR imbarcato.                                                                                         |
| `2`    | Un controllo della suite non è riuscito e non è stato qualificato come ereditato. L'operatore può dividere in due il batch, espellere lo PR incriminato ed eseguirlo nuovamente. |

Un pass locale fornisce prove diagnostiche solo per il dossier del proprietario. Ogni pianerottolo richiede comunque l'autorizzazione del proprietario, i propri controlli richiesti e il verdetto della coda ombra, ove applicabile.

## Classificazione

- **Per PR.** CI e Qualità selezionano i controlli in base ai percorsi modificati. Il codice PRs esegue controlli di qualità rapidi e test interessati, con unità separate e lavori Vitest in CI.
- **Per candidato in coda.** CI e Qualità eseguono il profilo completo del candidato composto sulla sua coda rif.
- **Per suggerimento di rilascio.** Release-Green esegue cancelli veloci e duri sui push che corrispondono ai filtri del suo percorso. Tre esecuzioni pianificate al giorno utilizzano l'intera scansione per il ramo di rilascio.
- **Per rilascio.** La matrice CI completa include frammenti E2E, convalida del pacchetto, fumo di avvio tarball e controlli di copertura. Consulta la [lista di controllo del rilascio](RELEASE_CHECKLIST.md).

## Prerequisiti per il nuovo checkout per `merge-train.sh`

Il preflight viene eseguito prima di creare gli alberi di lavoro. Installa le dipendenze con `npm ci`. Confermare che `node_modules/.bin/tsc` sia eseguibile e che `node_modules/node_modules` sia assente. Verifica che `node_modules/.bin/bun --version` abbia esito positivo.

Se la postinstallazione Bun è stata saltata, esegui `(cd node_modules/bun && node install.js)`. La coerenza del provider e i controlli dei simboli noti utilizzano Bun. Il validatore esegue `npm run check:cycles:ratchet` come porta di blocco. Il comando `npm run check:cycles` autonomo è consultivo.

## Storia

La coda di unione Mergify è stata ritirata il 19-11-2026.
