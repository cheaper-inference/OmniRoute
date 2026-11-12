# Release-Green: candidate validation and evidence (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green osserva un commit specifico e ne riporta i risultati di convalida. Il [riferimento Quality Gates](../architecture/QUALITY_GATES.md) definisce gli attuali profili CI, i controlli richiesti e la politica di accettazione. La politica di ammissione con versione in `config/quality/admission-policy.json` è il contratto eseguibile per `Gate / CI` e `Gate / Quality`.

## CI e ambito dell'osservatore

`ci.yml` e `quality.yml` coprono le richieste pull nei rami principali e di rilascio. Il profilo selezionato determina quali lavori applicare. CI completo include anche le corsie che una normale richiesta pull non esegue. Un risultato di Quick Observer non può sostituire tali lavori e un wrapper del flusso di lavoro completato non può sostituire le relative ricevute.

La build di produzione appartiene a CI. Non esiste alcuna build consultiva duplicata in `quality.yml`. Artefatti mancanti, lavoro annullato e misurazioni incomplete non determinano il successo del controllo richiesto. Confermare la base attuale, il capo e il candidato combinato prima di accettare i risultati.

## Convalida locale

Esegui l'osservatore in un albero di lavoro di proprietà dopo aver preparato le sue dipendenze. Seguire l'albero di lavoro e il protocollo delle risorse in `docs/ops/WORKTREE_ISOLATION.md` prima della convalida approfondita.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Il profilo rapido è parziale. Il profilo completo verifica i requisiti modellati e preserva le ricevute dei comandi; non certifica la distribuzione né sostituisce i controlli ospitati applicabili. Il report distingue il fallimento dell'esecuzione dalla deriva della metrica. I cricchetti richiesti rimangono bloccanti in base alla politica selezionata. Non alzare una linea di base semplicemente per ottenere un risultato positivo.

## Spazzature notturne e manuali

Il rilascio notturno e i risolutori di compatibilità selezionano un ramo di rilascio canonico. Tale selezione deve corrispondere al ramo che ha attivato il flusso di lavoro e le suite utilizzano lo SHA immutabile dell'evento. Per l'esecuzione manuale, seleziona la versione prevista in `release_branch` e invialo sullo stesso riferimento:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

L'invio tra filiali viene rifiutato prima dell'esecuzione del codice selezionato. Le suite principali ospitate controllano `main` e verificano che il relativo SHA corrisponda ancora alla destinazione risolta prima dell'installazione. Se il main si sposta durante la risoluzione, esegui nuovamente lo sweep incompleto sul nuovo commit. Non combinare le ricevute delle suite di candidati diversi.

## Triage e recupero degli insuccessi

Utilizzare l'incidente come indice diagnostico, quindi ispezionare l'esecuzione esatta, il tentativo, il passaggio non riuscito e l'artefatto. Confrontare la base equivalente e le prove candidate prima di attribuire un errore a un collaboratore. Errori infrastrutturali, difetti ereditari, regressioni dei candidati e approvazioni in sospeso richiedono rimedi diversi.

Le competenze `/green-prs`, `/sweep-reds`, `/validate-release-green` e `/babysit` raccolgono prove e preparano correzioni nell'ambito del loro ambito documentato. Mantieni il credito del collaboratore, utilizza rami di riparazione isolati e verifica tutti i controlli richiesti prima di un'unione autorizzata. Nessuna ribaseline automatica o chiusura dell'incidente sostituisce un candidato attuale che passa.
