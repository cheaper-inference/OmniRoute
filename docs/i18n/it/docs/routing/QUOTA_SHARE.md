# Quota Sharing Engine (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Riferimento del documento**: `docs/routing/QUOTA_SHARE.md`
> Parte del Gruppo B (piani 16 + 22).

---

## Panoramica

Il motore di condivisione delle quote distribuisce equamente la quota temporale di un provider (ad es. finestra di 5 ore di Codex, 1500 richieste/ora di Kimi) tra più chiavi API che condividono la stessa connessione.

**Problema risolto:** OmniRoute inoltra tramite proxy molte chiavi API verso lo stesso account del provider upstream. Senza una logica di condivisione, un picco di richieste dalla chiave A può esaurire la quota oraria del provider, lasciando le chiavi B e C bloccate fino al ripristino della finestra.
Il motore evita questa situazione:

1. Monitorando il consumo progressivo di ciascuna chiave per ogni dimensione (%, richieste, token, $).
2. Applicando un algoritmo di ripartizione equa e work-conserving: una chiave può prendere in prestito dalle quote inutilizzate finché il pool globale non è saturo.
3. Applicando il risultato nel percorso critico (`chatCore.ts`) prima che la richiesta raggiunga l'esecutore upstream.

---

## Algoritmo: condivisione equa del lavoro e conservazione

Implementato in `src/lib/quota/fairShare.ts`.

### Modalità

| Condizione                                 | Modalità     | Comportamento                                                                      |
| ------------------------------------------ | ------------ | ---------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Generoso** | La chiave può prendere in prestito fino al limite globale meno il totale consumato |
| `globalUsedPercent >= saturationThreshold` | **Rigoroso** | Applicare rigorosamente la giusta quota individuale                                |

`saturationThreshold = 0.5` predefinito (env `QUOTA_SATURATION_THRESHOLD`).

Queste due modalità descrivono un pool nella modalità di prestito predefinita, `saturation`. Una piscina in modalità `consent` applica sempre regole rigide, qualunque sia la saturazione. Vedere [Prestito consentito (attivazione per pool)](#consented-lending-per-pool-opt-in).

### Decisione per dimensione

Per ogni dimensione attiva nel pool, il motore calcola:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Per le dimensioni `percent`, `consumed` proviene invece dal libro delle attribuzioni (vedere [Dimensioni percentuali: attribuzione per chiave](#percent-dimensions-per-key-attribution) ).

Poi:

- **`policy = hard`** : se `consumed > fairShareAllowed` e la modalità sono rigide →** bloccare** .
- **`policy = soft`** : se `consumed > fairShareAllowed` e la modalità sono rigide →** penalizzare** (deprioritizzare in combo; mai bloccare duramente).
- **`policy = burst`** : consentire finché esiste un margine globale indipendentemente dall'equa condivisione.

### Cappello assoluto

`capValue` + `capUnit` su un'allocazione è un tetto rigido indipendente dalla modalità o dalla politica. Qualsiasi dimensione dove `consumed >= capValue` sempre** blocchi** la richiesta. Per un cap `percent`, `consumed` è solo la parte attribuita alla chiave.

### Controllo multidimensionale

Una richiesta viene bloccata se** Qualunque** dimensione nel pool lo bloccherebbe. Le dimensioni sono indipendenti — un esaurimento del 5h% non influisce sulla dimensione% settimanale.

### Prendere in prestito

In modalità generosa, una chiave la cui allocazione è sottoconsumata può utilizzare il surplus delle quote non allocate di altre chiavi. La formula è:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

dove `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Il teto globale (pool `limit` per quella dimensione) è sempre il soffitto rigido.

### Prestito consentito (opt-in per pool)

Ogni pool ha una modalità di prestito. `saturation` è l'impostazione predefinita e mantiene le regole di cui sopra. Nella modalità `consent` una chiave `hard` trasferisce la sua quota solo entro la capacità che altre chiavi hanno accettato di prestare. L'amministratore imposta la modalità di ciascun pool. Ciascun detentore delle chiavi imposta il proprio consenso attraverso [il consenso al prestito](#lending-consent).

Un consenso è una percentuale da 0 a 100 e una scadenza facoltativa in millisecondi di epoca. La chiave presta quella percentuale della sua quota inattiva mentre la scadenza è nel futuro.

Per una dimensione, `L` è il limite effettivo: il limite del piano moltiplica i conti nel pool. Il cancello calcola, per la chiave richiedente:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` è il peso della chiave oppure `100 / n` per ogni chiave quando nessun peso è superiore a 0. `lend_k` è la percentuale attiva della chiave e 0 una volta scaduta la scadenza. Il consenso della chiave richiedente non conta mai. Una chiave `hard` viene rifiutata una volta che il suo consumo raggiunge la sua quota più `borrowAvailable`.

La capacità che non richiede alcuna assegnazione (100 meno la somma dei pesi) non è prestabile. Nessuna chiave ha accettato di prestarla.

**Esempio.** `L` è 1000.

| Chiave | Peso | Condividere | Consumato | Presti |
| ------ | ---- | ----------- | --------- | ------ |
| UN     | 50   | 500         | 530       | 0%     |
| B      | 30   | 300         | 100       | 50%    |
| C      | 0    | 0           | 60        | 0%     |

- B presta il 50% dei suoi 200 inattivi, ovvero 100. C ha già preso 60 in più della sua quota. A può prenderne in prestito 40.
- A viene servito a 530 e rifiutato una volta che il suo consumo raggiunge 540.
- Prima che C utilizzasse qualcosa, con A pari o inferiore alla sua quota, C poteva prendere in prestito 100.
- Prima che C usasse qualcosa, con A a 530, C poteva prendere in prestito 70.

**Peso zero.** Una chiave con peso 0 ha una quota pari a 0. Viene servita solo finché il suo consumo è inferiore a quello che gli altri prestano. Quando nessuno presta, viene rifiutato fin dalla prima richiesta.

**Scadenze.** Nessuna attività in background fa scadere il consenso. Ogni richiesta confronta la scadenza con il proprio tempo e una scadenza uguale a quel tempo è trascorsa. Una scadenza memorizzata che non sia un numero finito o che abbia superato la data più grande che una `Date` può contenere viene considerata superata.

**`soft` e `burst`.** Il prestito non li limita. Una chiave `soft` perde la priorità una volta superata la sua quota. Una chiave `burst` passa mentre la piscina ha spazio. Il soffitto della piscina continua a rifiutare ogni chiave una volta che il totale della piscina raggiunge il limite.

**Costo sul percorso della richiesta.** Una piscina `saturation` non legge più nulla di prima. In un pool `consent`, una dimensione numerabile legge le altre chiavi solo per una chiave `hard` o superiore alla sua quota mentre un'altra chiave presta. Quindi esegue una lettura per altra chiave, in parallelo. Una lettura fallita conta come un consumo pari a 0 per quella chiave. Una dimensione `percent` non aggiunge alcuna lettura, perché il libro delle attribuzioni contiene ogni chiave.

**Modifica di un pool.** Una modifica mantiene il consenso delle chiavi che rimangono. Ciò vale per le modifiche delle allocazioni, le sostituzioni a livello di gruppo e le chiamate `ensure`. Una chiave rimossa perde il consenso e una chiave aggiunta nuovamente inizia da 0. I percorsi di amministrazione restituiscono il consenso di ciascuna chiave e non lo scrivono mai. Riportare un pool a `saturation` mantiene tutti i consensi archiviati, il che non ha alcun effetto in quella modalità. Passando nuovamente dal pool a `consent` si riattivano i consensi memorizzati la cui scadenza non è scaduta. Il titolare della chiave può cancellare un consenso memorizzato in entrambe le modalità.

**Aggiornamento.** Se le colonne `lending_percent` e `lending_until` esistono già, la migrazione aggiunge solo `borrow_mode` e le percentuali archiviate rimangono invariate. Ogni pool si avvia in modalità `saturation`. Attiva `consent` per pool nella procedura guidata del pool. Non si deduce nulla dai valori memorizzati.

**Limitazioni.**

- Un creditore può trovare il limite massimo del pool prima di utilizzare la propria quota. La capacità presa in prestito da altri conta nel totale del pool.
- Il controllo viene eseguito prima della richiesta e non riserva nulla. Le richieste simultanee leggono il consumo prima che venga registrato, quindi la capacità prestata può essere spesa più di una volta, limitatamente alle richieste in corso. Il controllo della condivisione della modalità `saturation` ha la stessa proprietà.

---

## Contatore a finestra scorrevole

Implementato in `src/lib/quota/sqliteQuotaStore.ts` e `redisQuotaStore.ts`.

Due bucket per `(apiKeyId, dimensionKey)`:

- `curr`: bucket corrente (`floor(nowMs / windowMs)`)
- `prev`: bucket precedente (`curr - 1`)

Valore progressivo effettivo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precisione**: accuratezza di circa il 99%. L'errore è al massimo pari all'1% della dimensione della finestra in corrispondenza del limite tra i bucket (intrinseco all'approssimazione a 2 bucket).

### Concorrenza

Driver SQLite: un mutex in memoria per ogni chiave `(apiKeyId | dimensionKey)` evita la race condition di lettura-modifica-scrittura. Il modello rispecchia il meccanismo anti-thundering-herd di `src/sse/services/auth.ts`.

Driver Redis: script Lua EVAL per l'incremento atomico, eseguito come singolo comando Redis.

---

## Driver

### SQLite (predefinito, nessuna installazione)

- Tabella: `quota_consumption` (vedere le migrazioni `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Ideale per i deployment a istanza singola.
- Tutta la persistenza avviene nel DB SQLite esistente di OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (facoltativo, multi-istanza)

- Richiede il pacchetto npm `ioredis`.
- I contatori sono archiviati in Redis; i metadati (pool/allocazioni) rimangono in SQLite.
- Ideale per i deployment con più repliche in cui i contatori devono essere condivisi.

### Passaggio da un driver all'altro

Tramite l'interfaccia delle impostazioni (`/dashboard/settings` → Archivio quote) o tramite variabili d'ambiente:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

L'impostazione del DB ha la precedenza sulle variabili d'ambiente. Se `driver=redis` ma l'URL è assente o
`ioredis` non è installato, la factory utilizza SQLite come soluzione di ripiego e registra un avviso.

Ordine di selezione del driver:

1. Impostazione DB `quotaStore.driver`
2. Variabile d'ambiente `QUOTA_STORE_DRIVER`
3. Predefinito: `sqlite`

---

## Multidimensionale

Una piscina può avere più dimensioni. Ogni dimensione è indipendente:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Esempio: piano Codex** (5h% + settimanale%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Per essere consentita, una richiesta deve soddisfare tutte le dimensioni.

### Dimensioni percentuali: attribuzione per chiave

Un piano percentuale riporta una cifra di utilizzo per account e finestra del piano. Il fornitore non fornisce alcun contatore per chiave API.

Per suddividere tale cifra tra le chiavi, ogni pool mantiene un libro di attribuzione per account e finestra del piano. `src/lib/quota/percentLedger.ts` detiene le regole del libro. `src/lib/quota/percentAttribution.ts` trasforma il libro nei numeri utilizzati dalle forze dell'ordine. Il risultato è una stima costruita dai token di ciascuna rotta chiave.

#### Letture che muovono il libro

Il book si sposta solo sulla cifra propria del fornitore per la finestra del piano richiesto. Questi collegamenti ne riportano uno:

| Fornitore                                | Pianificare le finestre |
| ---------------------------------------- | ----------------------- |
| Claude, attraverso una connessione OAuth | `5h`, `weekly`          |
| Codex                                    | `5h`, `weekly`          |

Questi non contano come lettura:

- una risposta che il client del provider contrassegna come obsoleta
- una finestra Claude di cui il fornitore non ha segnalato la percentuale
- la cifra di un'altra finestra o il caso peggiore tra le finestre
- il fallback dell'intestazione del limite di velocità
- una lettura fallita

Altri fornitori, incluso Claude con chiave API, non hanno alcun libro. A ciascuna chiave viene addebitato 0 sulle dimensioni percentuali, come prima di questa modifica.

Una lettura condivide la cache di 30 secondi del segnale di saturazione. Una lettura Claude viene datata entro il momento in cui la figura è stata osservata nelle intestazioni di risposta o letta dall'endpoint di utilizzo, quando tale ora è nota. Altre letture sono datate quando è stata creata la voce della cache.

#### Ciò che il libro conserva

Ogni richiesta registrata aggiunge i suoi token, una volta, a un contatore per pool, account e chiave. Un contatore cresce solo. Il libro conserva tre cose:

- la linea di base: la cifra del momento in cui il libro si è aperto o la finestra è stata girata l'ultima volta
- l'ultima cifra applicata
- per chiave, il suo contatore di gettoni in quello stesso momento, chiamato il suo segno

Il libro viene aggiornato quando l'applicazione o il percorso di utilizzo calcola l'attribuzione. Le scritture vengono confrontate e impostate su un numero di revisione. Uno scrittore che perde i tentativi una volta dopo una nuova lettura.

#### Come viene calcolata la parte di una chiave

La parte di ciascuna chiave viene calcolata quando il libro viene letto. La crescita della cifra rispetto alla linea di base è suddivisa tra le chiavi in proporzione ai gettoni che ciascuna di esse ha instradato a partire dal suo segno.

Together, questi token spiegano al massimo un punto della cifra per token `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` (predefinito 1.000). La crescita che non spiegano è esterna. Anche la linea di base è esterna.

Ad esempio, un libro si apre alle ore 0. La chiave A instrada quindi 900.000 token e la chiave B ne instrada 100.000. Con una cifra di 60, la parte di A è di 54 punti e la parte di B è di 6.

Un contatore sotto il segno della sua chiave è riavviato e conta per intero. Una chiave senza segno, come una chiave che si unisce al pool al centro di una finestra, conta tutti i suoi token. Una cifra che ritarda rispetto ai token provoca un errore che scompare alla lettura successiva. Non si accumula.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` si legge su ogni attribuzione. Un valore che non è un numero finito pari ad almeno 1 ritorna a 1.000.

#### Come una lettura cambia il libro

Si applica la prima regola di corrispondenza:

1. **Nessun libro ancora:** la lettura apre il libro. La sua figura è la linea di base e ogni segnalino è contrassegnato.
2. **Lettura precedente:** una lettura con data antecedente all'ultima applicata viene ignorata. Lo stesso vale per una lettura il cui tempo di reset è anteriore di oltre 30 minuti rispetto a quello memorizzato.
3. **Finestra del nuovo fornitore:** un tempo di ripristino successivo di oltre 30 minuti rispetto a quello memorizzato gira il libro. La figura diventa la linea di base e ogni segnalino viene nuovamente segnato. Le chiavi senza contatore escono dal libro.
4. **Finestra terminata:** un tempo di ripristino memorizzato che non è successivo al tempo dei dati di lettura significa che la finestra è terminata. La lettura trasforma il libro, qualunque sia la sua figura.
5. **Cifra più alta:** si muove solo l'ultima cifra. La linea di base e i segni rimangono.
6. **Stessa figura:** la figura, la linea di base e i segni rimangono. Viene scritto solo il tempo di ripristino che manca al libro.
7. **Figura inferiore:** una cifra inferiore non viene mai applicata come tale. Gira il libro solo quando valgono tre cose. È almeno due minuti più recente dell'ultima lettura applicata. Niente dice che la finestra sia la stessa aperta. È più di un punto in meno.

La finestra conta come la stessa aperta quando sussistono tre cose. Entrambi i tempi di ripristino sono noti. Sono a 30 minuti l'uno dall'altro. Quello memorizzato è ancora in anticipo rispetto alla lettura. Una cifra più bassa all'interno di quella finestra non cambia nulla.

Un tempo di ripristino viene memorizzato solo finché è in anticipo rispetto al tempo dei dati della lettura che lo trasporta. Una cifra più alta memorizza il tempo di ripristino della sua lettura quando questa è utilizzabile e mantiene quella memorizzata altrimenti. Una cifra uguale registra il tempo di ripristino della sua lettura solo quando il libro non ne ha. Non cambia nient'altro. Una cifra inferiore che non gira il libro non registra alcun tempo di ripristino.

#### Quando si usa il libro

Dopo una lettura, il libro viene utilizzato a meno che l'ora di ripristino memorizzata non sia successiva all'ora corrente. Questo caso si verifica quando una lettura effettuata appena prima del ripristino, come quella fornita dalla cache, viene osservata subito dopo.

Senza una lettura utilizzabile, il libro memorizzato viene utilizzato solo mentre può ancora essere il libro della finestra corrente. Ciò vale in due casi:

- il suo tempo di ripristino è noto e ancora avanti
- non ha un tempo di ripristino e l'ultima lettura che lo ha modificato risale a massimo 15 minuti fa

Altrimenti non si attribuisce nulla, come quando non c'è nessun libro. Un libro il cui tempo di reset memorizzato è trascorso non viene mai addebitato.

#### Applicazione

Il consumo di una chiave su una dimensione percentuale è la sua parte attribuita più una quota della parte esterna. La parte esterna utilizza innanzitutto le richieste di capacità senza allocazione (100 meno la somma dei pesi). Solo l'eccedenza viene ripartita tra le chiavi in base al peso.

Tale consumo viene confrontato con la quota equa della chiave come per qualsiasi altra dimensione. La modalità rigorosa si avvia comunque quando il segnale di saturazione raggiunge `QUOTA_SATURATION_THRESHOLD` (predefinito 0,5). Ogni numero viene scalato in base al limite effettivo: il limite per account moltiplica il numero di account nel pool.

Un limite assoluto con `capUnit: "percent"` conta solo la parte attribuita alla chiave, scalata allo stesso modo. Prendi un limite per account di 100 e k account. Viene quindi raggiunto un limite di N quando la parte della chiave della cifra del conto di servizio raggiunge i punti N/k. Ogni conto viene controllato rispetto al proprio libro. Ad esempio, con due conti, il limite massimo di 10 viene raggiunto a 5 punti della cifra di un conto.

Quando il negozio non può essere letto, non viene attribuito nulla e ad ogni chiave viene addebitato 0 su quella dimensione. Quando la scrittura di un libro fallisce, tale attribuzione utilizza il libro così come è stato letto. Una scrittura token non riuscita lascia i token di quella richiesta fuori dal libro. Nessuno di questi errori blocca una richiesta.

In un pool `consent`, la formula di prestito utilizza il consumo di ciascuna chiave sulla dimensione percentuale come descritto sopra. Quando si presta un'altra chiave, il libro viene letto una volta e attribuito a ciascuna chiave. Senza libro utilizzabile ogni chiave paga 0. Una chiave con peso poi passa, e una chiave con peso 0 passa solo quando un'altra chiave si presta.

#### Percorso d'uso

`GET /api/quota/pools/{id}/usage` riporta gli stessi numeri attraverso la stessa funzione. Una dimensione percentuale ha una voce per connessione al pool in `accounts`. I suoi `consumedTotal` e `perKey` di livello superiore rispecchiano la prima voce.

Il percorso applica anche la lettura corrente, quindi può far avanzare il libro come fa una richiesta. `internal + external` può differire da `consumedTotal` quando non esiste una lettura utilizzabile o quando non viene applicata una cifra inferiore.

#### Archiviazione e conservazione

Entrambi i depositi di quote mantengono il libro. Su SQLite, la pulizia automatica del database, quando abilitata, rimuove le righe non aggiornate per 60 giorni. Su Redis, i libri e i contatori di una connessione al pool condividono una chiave. Scade 60 giorni dopo l'ultima scrittura del token o modifica del libro. Un libro che non cambia non viene riscritto, quindi il limite viene impostato sopra la finestra del piano più lunga. Il ripristino manuale della cronologia di utilizzo cancella anche i libri su SQLite (vedi Limitazioni).

#### Limitazioni

- Tutta la crescita della cifra dell'account a partire dalla linea di base è divisa per i token che ciascuna chiave ha instradato da allora. Non importa quando è avvenuta quella crescita.
- Pertanto l'utilizzo effettuato al di fuori OmniRoute viene addebitato alle chiavi fino a quanto consentito dai token. Ciò include l'utilizzo effettuato prima della prima richiesta di una chiave della finestra, quando il libro era già aperto.
- Ad esempio, l'uso esterno aumenta il conto di 60 punti mentre non ci sono percorsi chiave. Una chiave instrada quindi 30.000 token e la cifra arriva a 60,6.
- Se il libro era aperto prima di tale utilizzo, la parte della chiave vale 30 punti. Porta anche 7,65 di utilizzo esterno, con quattro tasti di peso 25.
- Se il libro si è aperto dopo tale utilizzo, i 60 punti rappresentano la base. La parte della chiave è di 0,6 punti e ne trasporta 15 di utilizzo esterno.
- Una richiesta o una visita al percorso di utilizzo apre il libro. Pertanto, se tale utilizzo conta come riferimento dipende da quando il libro è stato aperto.
- Con il piano predefinito, una chiave che instrada 60.000 token mentre l'uso esterno aumenta il conto di 60 punti, ottiene tutti i 60 come parte propria.
- Con la soglia minima a 50.000, la sua parte è di 1,2 punti. Gli altri 58,8 sono esterni e caricati a peso, come ogni utilizzo esterno.
- Imposta `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` vicino al costo di un punto sul tuo piano. L'uso esterno include il traffico sullo stesso account proveniente da chiavi esterne al pool.
- In ogni modalità si applica un limite percentuale. Una chiave limitata può essere rifiutata mentre l'account è molto al di sotto della soglia di saturazione.
- Prendi un limite di 10 e 12 punti di utilizzo esterno in precedenza nella finestra. Una chiave che instrada 20.000 token viene quindi rifiutata con una cifra del conto del 12,4%.
- La suddivisione è una stima in base al volume del token. Una richiesta conta come i suoi token di richiesta più i suoi token di completamento. Gli sconti cache e i prezzi dei modelli non modificano tale conteggio.
- Una richiesta che non termina con lo stato 200 non registra alcun token. Gli esempi sono un flusso che il client si disconnette e un errore upstream dopo che l'utilizzo è stato consumato.
- L'utilizzo causato da tale richiesta viene addebitato alle chiavi che hanno registrato i token, fino a quanto consentito dai loro token. Il resto è esterno. Non torna indietro. Una risposta che non segnala l'utilizzo di token non registra nemmeno alcun token.
- L'utilizzo di una richiesta in corso può essere visualizzato in un'altra parte della chiave attiva per l'intera richiesta. Torna indietro solo quando la richiesta termina con lo stato 200.
- L'utilizzo già presente sull'account all'apertura di un libro conta come esterno. Ciò copre un aggiornamento, un nuovo pool e un nuovo account. Anche l'utilizzo in una nuova finestra prima della prima lettura conta come esterno.
- Ogni chiave inizia con la sua quota di peso di tale utilizzo, dopo la capacità non vi sono richieste di allocazione. Con un account all'85% e cinque chiavi di peso 20, ciascuna inizia con 17 delle sue 20 utilizzate.
- In un pool con più account, l'importo dell'account di servizio viene applicato al budget totale. Questo non è cambiato nel libro.
- Un valore inferiore all'interno di una finestra segnalata dal provider come aperta non viene applicato. Un tempo di ripristino che arretra di oltre 30 minuti viene considerato come una vecchia lettura.
- In entrambi i casi il book mantiene il suo stato fino allo scadere del tempo di reset memorizzato. Dopodiché il libro non viene addebitato finché non viene girato una lettura.
- Il rimedio è il ripristino manuale della cronologia di utilizzo (`POST /api/settings/purge-usage-history`). Cancella i libri di attribuzione e i relativi contatori di token nel database SQLite.
- Il periodo `all` cancella ogni libro e contatore. Un periodo più breve cancella prima i libri non scritti al suo interno. Quindi cancella i contatori non scritti al suo interno, ma solo per una connessione al pool in cui non è rimasto alcun libro. Un libro custodito segna ancora ogni chiave contro il suo contatore.
- Un libro la cui figura non si è spostata non viene riscritto, quindi un periodo più breve può anche cancellare il libro della finestra corrente. La lettura successiva apre quindi un nuovo libro alla cifra attuale.
- Il ripristino non tocca un archivio di quote Redis. Lì un libro termina con la sua finestra, oppure scade 60 giorni dopo la sua ultima scrittura.
- Quando il fornitore non invia alcun tempo di ripristino, una finestra che si ripristina e si riempie sopra la vecchia cifra tra due letture sembra una cifra più alta. Il libro mantiene la vecchia linea di base e i segni.
- Le letture sono datate dall'orologio locale. Quando viene eseguito in anticipo rispetto a quello del fornitore, o una fonte segnala un tempo di ripristino un po' in anticipo, il libro può arrivare presto a quella differenza.
- La crescita in quel breve periodo è divisa dai token instradati al suo interno. La prima lettura della finestra successiva lo corregge. Quando il libro girato non contiene tempo di ripristino, tale correzione richiede una cifra inferiore di almeno due minuti più recente rispetto all'ultima lettura applicata.
- Le istanze che condividono una Redis memorizzano le letture della data con i propri orologi, quindi mantieni tali orologi sincronizzati. Le letture di un'istanza il cui orologio va indietro sembrano più vecchie e vengono ignorate.
- Quando non arriva alcuna lettura utilizzabile dopo il tempo di ripristino memorizzato, le quote percentuali per chiave e i limiti percentuali non vengono applicati finché non viene restituita una lettura. Senza tempo di reset, questo inizia 15 minuti dopo l'ultima lettura che ha cambiato il libro.
- Nel negozio Redis, un libro inattivo per 60 giorni può scadere tra l'assegno dello scrittore e la sua scrittura. Viene quindi ricreato a una revisione superiore a 1, che è uno stato valido.

---

## Risolutore dei piani

Implementato in `src/lib/quota/planResolver.ts`.

Precedenza (dalla più alta alla più bassa):

1. **Override manuale nel DB** — tabella `provider_plans`, per `connectionId`.
2. **Catalogo noto** — `src/lib/quota/planRegistry.ts` (solo dati).
3. **Piano vuoto** — nessuna dimensione, è richiesta la configurazione manuale.

### Catalogo noto

| Provider              | Dimensioni                                                        |
| --------------------- | ----------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                            |
| `glm`                 | `tokens/5h` (limit=0, sconosciuto), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                      |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100`     |
| `kimi`                | `requests/hourly/1500`                                            |
| `alibaba`             | `requests/monthly/90000`                                          |
| `openai`, `anthropic` | Nessun valore predefinito — è richiesta la configurazione manuale |

---

## Integrazione della pipeline

### gancio PRE (`open-sse/handlers/chatCore.ts`)

Viene eseguito prima dell'esecutore upstream, dopo i controlli di autenticazione e policy:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open** : se `enforceQuotaShare` genera un'eccezione, la richiesta viene consentita con un log `pino.warn`. Ciò impedisce a un bug del motore di quota di bloccare tutto il traffico.

**Quando tornerà la capacità.** Un rifiuto alla condivisione della chiave o al limite della piscina termina con una delle due frasi, in entrambe le modalità di prestito:

- `percent` finestra: `. The <window> window resets at <time>.` L'ora è il ripristino riportato dal provider.
- Unità numerabile: `. Enough <window> usage is expected to clear by <time>.` Il tempo è un limite superiore dalla finestra scorrevole, se la chiave non invia nient'altro.

`<time>` è un istante ISO 8601 in UTC. Il rifiuto porta poi `Retry-After`: tutti i secondi fino a quell'istante, più uno. Un client che attende così a lungo riprova al massimo un secondo dopo l'istante. Quando non è noto l'istante, il rifiuto non reca né la sentenza né l'intestazione. Un rifiuto assoluto del tetto non comporta nessuno dei due. Il codice pubblico resta `quota_share_blocked`.

Un rifiuto di condivisione non influisce sulla connessione condivisa. Non imposta alcun tempo di recupero, nessun blocco del modello e nessun guasto dell'interruttore del provider e le altre chiavi del pool continuano a essere servite. Quando ogni bersaglio di una combo rifiuta la chiave per la sua parte, la combo risponde 429 senza aspettare. La sua risposta porta il suggerimento come `Retry-After`. Il percorso di incorporamento termina il suo rifiuto con la stessa frase e non invia `Retry-After`.

### gancio POST (consumo record)

Dopo una risposta positiva:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Nota di deriva** : se `consume` fallisce dopo la risposta, il contatore che rotola sottoconta. Il segnale di saturazione del provider (ad esempio `anthropic-ratelimit-unified-5h-utilization`) corregge la stima globale alla richiesta successiva.

### Penalità morbida combinata (`open-sse/services/combo.ts`)

Quando `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

La penalità viene applicata dopo tutti gli altri fattori di punteggio. Riduce la probabilità di combo automatica di selezionare una chiave saturata senza bloccarla.

---

## UI Soluzione

### `/dashboard/costs/quota-share` — Pagina dei pool principali

Componenti (tutti in `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Componente             | Scopo                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Scheda introduttiva che spiega la condivisione delle quote ai nuovi utenti              |
| `CreatePoolModal`      | Crea un nuovo pool di quote (connessione + nome + allocazioni iniziali)                 |
| `PoolCard`             | Riepilogo per pool: nome, connessione, conteggio allocazioni                            |
| `DimensionBar`         | Barra in pila per dimensione: la condivisione di ciascuna chiave + all'utilizzo globale |
| `AllocationTable`      | Tavolo con consumo, quota equa, deficit/surplus, bandiera di prestito                   |
| `BurnRateChart`        | Grafico a linee della velocità di combustione EMA (lazy Recharts tramite `dynamic()`)   |
| `EditAllocationsModal` | Modifica i pesi, i limiti e le politiche di allocazione per un pool                     |
| `BorrowModeField`      | Selettore della modalità di prestito (`saturation` o `consent`) nella procedura guidata |
| `LendingBadge`         | Badge di sola lettura su chiave che presta, solo nei pool `consent`                     |

Il badge prestito riporta la percentuale e, se impostata, la scadenza in UTC con la zona denominata. Giudica la scadenza al momento dell'istantanea dell'utilizzo. Una scadenza scaduta o illeggibile viene visualizzata come `lending expired`.

La pagina si aggancia:

- `usePools` — recupera `GET /api/quota/pools` ogni 30 secondi.
- `usePoolUsage` — recupera `GET /api/quota/pools/[id]/usage` su richiesta.
- `useLocalStoragePoolMigration` — viene eseguito una volta sul montaggio per migrare i dati LS legacy.

Il passaggio delle chiavi della procedura guidata del pool ha una casella `Show usage by member to key holders`. Imposta l'opzione `memberBreakdown` del pool (vedi [Utilizzo dei membri](#member-usage) ). Sotto di esso, la procedura guidata avverte che qualcuno che sa quale chiave è stata utilizzata può abbinare una barra a quella chiave. Con la casella selezionata, lo dice quando il passaggio elenca meno di tre o più di 20 tasti, poiché le barre rimangono nascoste. Conta le chiavi nel passaggio e non riesce a capire quale di esse può effettuare richieste.

### `/dashboard/costs/quota-share/plans` — Configurazione del piano del provider

- `ProviderPlanConfigClient.tsx`: menu a discesa per selezionare un fornitore, visualizzare il piano risolto (auto dal catalogo o sostituzione manuale) e modificare le dimensioni.
- Le modifiche scrivono su `PUT /api/quota/plans/[connectionId]`.
- La cancellazione ripristina il catalogo o la pianta vuota.

---

## Quota Self-Service API (attivazione)

`GET /api/v1/me/quota/{provider}` (servito anche su `/v1/me/quota/{provider}`) consente al titolare della chiave API di leggere, con la propria chiave, quanto appartiene a un abbonamento condiviso e cosa lo blocca. Il percorso è un guscio sottile sopra `src/server/selfService/quotaHandler.ts`; la vista è costruita da `src/lib/quota/selfView.ts` e il suo contratto di risposta è `src/shared/schemas/selfQuota.ts` (`SelfQuotaView` in `docs/openapi.yaml`).

### Abilitazione e autenticazione

- Flag di funzionalità `QUOTA_SELF_PANEL`, predefinito `false`. Mentre è disattivato, una richiesta che raggiunge il percorso ottiene 404. Con `REQUIRE_API_KEY=true`, la politica API del client rifiuta una chiave mancante o non valida con 401 prima che il percorso venga eseguito, qualunque sia il flag. Una richiesta senza chiave ma con una sessione del dashboard con accesso supera la policy e ottiene la risposta del percorso. Il flag si risolve come ogni altro flag (dashboard o override REST, quindi la variabile di ambiente con lo stesso nome); vedi [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md).
- Il nome visualizzato di ciascun pool e l'etichetta di ciascuna pianificazione vengono restituiti ai detentori delle chiavi del pool esattamente come li ha scritti l'amministratore. Prima di accendere le bandiere verificare che siano idonee alla lettura da parte dei detentori delle chiavi.
- La chiave viene letta solo dalle intestazioni: `Authorization: Bearer <key>` o `x-api-key: <key>`. Quando vengono inviati entrambi, viene utilizzato il primo che convalida. Una chiave nella stringa di query o in un cookie viene ignorata. La chiave di ambiente del server viene rifiutata (401).
- La chiave necessita dell'ambito `self:usage` (403 senza di esso).
- Il segmento del provider viene tagliato, scritto in minuscolo e confrontato con `^[a-z0-9][a-z0-9._-]{0,63}$` (altrimenti 400), quindi risolto tramite il registro del provider, in modo che un alias come `cc` legga i pool `claude`. `claude` e `anthropic` leggono gli stessi pool.

### Cosa mostra ogni visibilità

| Visibilità           | Richiede                                                                                       | Campi                                                                                                                                                                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Propria quota        | `self:usage`                                                                                   | `pools[]` (rif, nome, provider, policy, peso, cap), `dimensions[].yourShare`, `accounts[]` con `yourShare` (su una finestra `percent` senza `attributed` e `external`), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`                                         |
| A livello di account | `self:usage` + `self:account-quota` e il provider nel file `sharedQuotaProviders` della chiave | aggiunge `dimensions[].total`, `accounts[].dimensions[].account` e `accounts[].modelWindows`, `attributed` e `external` sullo `yourShare` di una finestra `percent` e `members` su un pool con utilizzo dei membri attivo (vedi [Utilizzo dei membri](#member-usage) ) |

- `sharedQuotaProviders` è un'impostazione per chiave (`PUT /api/keys/[id]/self-service`): `null`, l'impostazione predefinita, indica ogni provider raggiunto dalla chiave; `[]` significa nessuno. `accountVisible` di ogni pool indica quale visibilità è stata applicata ad esso.
- Le barre degli account e le finestre del modello vengono visualizzate solo per gli account la cui connessione può essere utilizzata dalla chiave. Quando la chiave ha un elenco di connessioni consentite, un account esterno mantiene la voce `Account N` senza `account` o `modelWindows`. Una lista vuota significa nessuna restrizione, come per `/v1/me/status`. Il totale del pool (`dimensions[].total`) non dipende da tale elenco.
- Due figure mostrate solo con `self:usage` provengono dall'uso di altri tasti. `exhausted` di un budget di pianificazione riflette il consumo di ogni chiave nell'ambito di tale pianificazione. In un pool i cui pesi sono tutti pari a zero, `weight` della chiave è `100 / number of members`. Entrambi sono ciò che l'applicazione si applica alla chiave.
- Un pool è identificato solo da `ref`, un valore opaco legato alla chiave chiamante. Il relativo nome visualizzato (`name`) è incluso così come lo ha scritto l'amministratore. Uno `ref` viene derivato dalla chiave e dal pool con il segreto della chiave API del server (`API_KEY_SECRET`). I client non devono persisterlo: cambia se il segreto viene ruotato.
- I conti sono elencati come `Account 1`, `Account 2`, ... in ordine di pool. Non viene restituito alcun ID pool, ID connessione, indirizzo email dell'account o nome account e la risposta passa attraverso lo schema del contratto, che elimina qualsiasi campo al di fuori di esso.
- Le unità numerabili (`requests`, `tokens`, `usd`) vengono segnalate come bucket del pool applicato dal quota gate: `limit` = limite del piano × account nel pool, `fairShare` = peso / 100 × `limit` (divisione uguale quando ogni peso è 0), `consumed` = il contatore della chiave nell'archivio quote, `remaining` = `fairShare` − `consumed`, con limite minimo a 0.
- `blocks.schedules` elenca le finestre di pianificazione della chiave (`open`/`closed`, `blackout` o `outside-window`, `retryAfterSeconds`, i piani di riserva e se il budget della finestra è stato speso); `blocks.modelCaps` elenca i limiti orari per modello con il consumo.
- Una chiave esterna a ogni pool del provider ottiene 200 con `pools: []`; `availableModels` (gli ID `qtSd/` che la chiave vede in `/v1/models`), `expiresAt` e `apiBaseUrl` sono ancora riempiti.
- `apiBaseUrl` è `OMNIROUTE_PUBLIC_API_BASE_URL`, poi `OMNIROUTE_PUBLIC_BASE_URL`, altrimenti `null`. Non è mai l'origine stessa della richiesta.

### `status` e `reason`

| `status`      | Senso                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Una lettura attuale.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `stale`       | Un account memorizzato nella cache contrassegnato come obsoleto o il cui tempo di reimpostazione è trascorso da quando è stato letto. I numeri vengono mantenuti. Una finestra del modello il cui tempo di ripristino è trascorso contrassegna l'intero gruppo `modelWindows` `stale`. Per la condivisione della chiave di una finestra `percent` : il libro è stato letto senza che un account leggesse nella cache del gate per confermarlo. |
| `unavailable` | Nessuna lettura; i numeri sono `null`, mai `0`. `reason` dice perché.                                                                                                                                                                                                                                                                                                                                                                          |

| `reason`                          | Quando                                                                                                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Impossibile leggere l'archivio quote oppure non è possibile leggere i libri di attribuzione.                                                                                       |
| `percent_attribution_unavailable` | La quota propria della chiave di una finestra `percent` : non esiste ancora alcun libro di attribuzione per quell'account e quella finestra, oppure il libro non elenca la chiave. |
| `percent_window_ended`            | La quota propria della chiave di una finestra `percent` : il libro appartiene ad una finestra del piano che è terminata.                                                           |
| `account_not_used_by_key`         | La condivisione della chiave di una finestra `percent` : la connessione dell'account è esterna alle connessioni consentite dalla chiave. Il suo libro non viene letto.             |
| `window_not_reported`             | La cache dei limiti del provider non ha letture per quella finestra del piano.                                                                                                     |
| `connection_lookup_failed`        | Impossibile leggere la connessione dell'account.                                                                                                                                   |
| `not_supported`                   | OmniRoute non può leggere i limiti di utilizzo per il fornitore dell'account.                                                                                                      |
| `fetch_failed`                    | Nessuna lettura memorizzata nella cache era utilizzabile e l'aggiornamento dei limiti del provider non è riuscito.                                                                 |
| `not_available`                   | La lettura non prevede finestre di utilizzo oppure l'account non presenta alcuna lettura.                                                                                          |

Quando non è possibile leggere l'archivio quote, anche i campi supportati dall'archivio di `blocks` ( `exhausted` di un budget di pianificazione, `consumed` e `reached` di un limite di modello) sono `null`.

### Consenso al prestito

`PATCH /api/v1/me/quota/{provider}` registra il consenso della chiave chiamante per un pool. Utilizza il flag, le intestazioni e le regole del provider di `GET`. L'ambito `self:usage` autorizza questa scrittura, sebbene il suo nome sia di sola lettura.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` è lo `ref` restituito da `GET` per quel pool.
- `lendingPercent` è un numero intero compreso tra 0 e 100. Un valore pari a 0 cancella il consenso e la sua scadenza. Un corpo con `lendingPercent` 0 è accettato in entrambe le modalità.
- `lendingUntil` è facoltativo: epoch millisecondi o `null` per nessuna scadenza. Deve essere nel futuro e al massimo 8640000000000000. Un valore inferiore a 100000000000 viene letto come secondi e viene rifiutato.
- Qualsiasi altro campo viene rifiutato. Un corpo più lungo di 4096 byte viene rifiutato. La lettura si ferma a quella dimensione, quindi un corpo più lungo non viene mai tenuto intero.

I controlli vengono eseguiti nell'ordine di questa tabella. Ogni rifiuto utilizza il corpo dell'errore standard con un messaggio fisso. Un rifiuto da parte di uno di questi assegni non scrive nulla.

| Stato | Messaggio                                                                                          | Quando                                                                         |
| ----- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 404   | `Not found`                                                                                        | La bandiera `QUOTA_SELF_PANEL` è spenta.                                       |
| 401   | `Valid API key required`                                                                           | La chiave è mancante o non valida oppure è la chiave dell'ambiente del server. |
| 403   | `API key lacks the self:usage scope`                                                               | Alla chiave manca `self:usage`.                                                |
| 400   | `Invalid provider`                                                                                 | Il segmento del fornitore non è valido.                                        |
| 429   | `Too many lending changes. Retry later.`                                                           | La chiave ha superato il limite. La risposta porta `Retry-After`.              |
| 400   | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Il corpo non è JSON, è troppo lungo o non corrisponde allo schema.             |
| 400   | `lendingUntil must be a Unix time in milliseconds`                                                 | La scadenza si legge in pochi secondi.                                         |
| 400   | `lendingUntil must be in the future`                                                               | La scadenza è coincidente o precedente all'orario della richiesta.             |
| 404   | `Pool not found`                                                                                   | La `ref` non nomina alcun pool di questa chiave per questo provider.           |
| 403   | `Lending is not enabled for this pool`                                                             | Il pool è in modalità `saturation` e `lendingPercent` è superiore a 0.         |
| 500   | `Failed to build quota view`                                                                       | Qualsiasi altro fallimento. La sua causa viene registrata sul server.          |

Il limite è di 20 richieste ogni 60 secondi per ciascuna chiave. Ogni richiesta che supera il controllo del provider conta, anche quella rifiutata successivamente o quella che non cambia nulla. Ha un proprio contatore, a parte il limite di velocità di richiesta della chiave.

Una richiesta che modifica il consenso archiviato scrive un record di audit `quota.pool.lending.updated`. Nomina la chiave con i valori vecchi e nuovi. Lo stesso organismo inviato due volte scrive una volta e verifica una volta. La risposta è 200 con la vista `GET` completa, creata dopo la scrittura.

La vista `GET` riporta i prestiti come segue:

- Ogni pool trasporta `borrowMode` (`saturation` o `consent`) e `lendingPercent` e `lendingUntil` della chiave.
- `lendingActive` è `true` solo in un pool `consent`, con una percentuale superiore a 0 e una scadenza non raggiunta.
- In un pool `consent`, ogni `dimensions[].yourShare` numerabile trasporta `borrowAvailable`. È ciò che la chiave può utilizzare in aggiunta alla sua quota attuale, prestata dalle altre chiavi.
- `borrowAvailable` usa la formula del cancello. Legge ogni altra chiave, anche mentre la chiave si trova nella sua condivisione. Per una chiave `hard` che è una lettura extra per altra chiave e dimensione numerabile, in parallelo.
- `borrowAvailable` è `null` per una chiave `soft` o `burst` e `null` quando la lettura fallisce.
- `borrowAvailable` è una cifra per tutte le altre chiavi insieme. In un pool di due chiavi è la cifra dell'altra chiave.
- `borrowAvailable` non è ancora riportato per le finestre `percent` o in `accounts[]`.
- In un pool `saturation` la vista riporta il consenso memorizzato con `lendingActive: false` e no `borrowAvailable`.

### Errori

Ogni risposta di questo percorso, successo o errore, porta con sé `Cache-Control: no-store`. Un rifiuto che si verifica prima dell'esecuzione del percorso non lo trasporta, ad esempio il 401 della policy API del client o il 403 del filtro IP. Gli errori del percorso utilizzano il corpo dell'errore standard con un messaggio fisso: 400 (fornitore non valido), 401 (chiave mancante o non valida), 403 ( `self:usage` mancante), 404 (flag off) e 500 (`Failed to build quota view`). Il 500 copre qualsiasi errore una volta che la richiesta raggiunge il percorso, inclusa la ricerca della chiave stessa; la sua causa viene registrata sul server e non viene mai restituita. Gli errori della `PATCH` sono elencati in [Consenso al prestito](#lending-consent).

### Limitazioni

- `remaining` è la parte della quota equa della chiave che non ha utilizzato. Non è una garanzia. Una chiave può ancora essere servita al di là finché la piscina ha spazio. Una volta che il totale del pool raggiunge `limit`, ogni chiave del pool viene rifiutata, qualunque sia il suo `remaining`, e una chiave senza `self:account-quota` non può vedere quel totale.
- `remaining` non tiene conto dello `cap` assoluto dell'allocazione. L'applicazione rifiuta la chiave una volta che il proprio consumo in una finestra dell'unità del limite raggiunge il valore del limite.
- La barra a livello di account proviene dalla cache dei limiti del provider e può ritardare la decisione di applicazione delle norme di alcuni minuti. Una lettura il cui tempo di reset è trascorso viene segnalata come `stale`.
- Le finestre per modello (`modelWindows`) vengono riportate solo per i fornitori che hanno una mappatura delle finestre del piano: Claude e Codex oggi. Per gli altri provider `modelWindows` è ancora presente quando vengono mostrati i dati dell'account, con un elenco `windows` vuoto.
- La quota della chiave di una finestra `percent` è una stima. Proviene dal libro di attribuzione e presenta tutte le limitazioni elencate in "Dimensioni percentuali: attribuzione per chiave" sopra.
- `consumed` è il numero di applicazione rispetto alla quota equa. È `attributed` più `external`, esattamente. `attributed` è la parte che il libro fornisce la chiave per i token instradati. `external` è la parte della chiave utilizzata dall'account di cui le chiavi del pool non tengono conto.
- Entrambe le parti vengono inviate solo quando `accountVisible` del pool è vero: la chiave ha `self:account-quota` e il provider è nel suo `sharedQuotaProviders`. Una chiave senza di essa ottiene `consumed` da sola, con gli stessi `status` e `reason`.
- Con entrambe le parti ed il proprio peso, un detentore può calcolare l'utilizzo fatto all'esterno della piscina che viene addebitato sulle chiavi della piscina. Un titolare con l'ambito del conto vede già il totale del conto.
- Una chiave che non ha indirizzato nulla nella finestra può ancora leggere la sua carica esterna da `consumed`, perché la sua parte attribuita è quindi 0.
- Ad esempio, un libro si apre a 0, con i tasti A e B a peso 50 ciascuno. La chiave A instrada 900.000 token e la chiave B 100.000. Il conto raggiunge quindi il 60% di un limite di 100. Quindi `attributed` è 54 per la chiave A e 6 per la chiave B, e `external` è 0 per entrambi.
- La vista legge il libro e non scrive mai il suo stato. Non apre un libro e non chiede mai una lettura al fornitore. Con lo store Redis, una lettura rimuove i campi di revisione sostituiti in background, come fanno le letture del gate.
- La condivisione è `ok` solo mentre la cache del gate conserva una lettura del conto. Senza uno è `stale`, quindi in un pool senza richieste recenti risulta probabilmente non aggiornato.
- Finché una richiesta non passa attraverso il pool, la condivisione non è disponibile. Quella richiesta apre il libro, e l'importo del conto in quel momento conta come utilizzo effettuato fuori dal pool.
- In un pool con più conti, ciascuna voce di conto utilizza il proprio libro conto e il limite di un conto. L'applicazione della normativa ridimensiona entrambe le parti in base al numero di conti, quindi la proporzione è la stessa.
- Le finestre per modello non hanno alcuna condivisione per la chiave. Il libro non conserva dati per modello.
- I piani di riserva di una pianificazione non vengono valutati dalla vista: una pianificazione può essere visualizzata come `open` mentre una richiesta viene rifiutata con motivo `schedule-reserve`.
- Quando due pool della stessa chiave condividono una connessione, l'applicazione ne applica uno e la visualizzazione li elenca entrambi.
- Non esiste alcun limite per indirizzo sui tentativi di chiave falliti: dietro un proxy inverso i chiamanti possono condividere un indirizzo (dipende se gli indirizzi dei client inoltrati sono attendibili), quindi un blocco potrebbe negare il percorso a ogni possessore di chiavi. Con `REQUIRE_API_KEY=true`, una chiave non valida viene rifiutata dalla policy API del client prima dell'esecuzione della route, con il corpo 401 di quella policy anziché quello di questa route.

### Utilizzo dei membri

Un amministratore può consentire ai detentori delle chiavi di vedere come è suddiviso l'utilizzo di una finestra tra i membri del pool. L'opzione è `memberBreakdown` del pool, disattivata per impostazione predefinita. Viene impostato nella procedura guidata del pool o con `PATCH /api/quota/pools/{id}`. `GET /api/quota/pools` e `GET /api/quota/pools/{id}` lo segnalano.

Una dimensione della vista porta `members` solo quando tutti questi valgono:

- l'opzione della piscina è attiva
- il pool ha al massimo 20 chiavi assegnate, e almeno tre di esse possono effettuare richieste: attive, non revocate, non bannate e non scadute
- lo `accountVisible` del pool è vero: la chiave ha `self:account-quota` e il provider è nel suo `sharedQuotaProviders`
- su una finestra `percent`, la connessione dell'account è quella che la chiave può utilizzare
- è stata letta la parte della chiave di quella finestra: il suo `status` non è `unavailable`

Altrimenti `members` è assente. Non è mai un elenco vuoto.

- Ogni fetta è `{ slot, consumed, isYou }`. Lo schema di risposta rifiuta qualsiasi altra proprietà su una sezione e un elenco di più di 20 sezioni. Le fette sono elencate nell'ordine degli slot.
- Esiste una porzione per chiave allocata, inclusa una chiave che non può più effettuare richieste. Un membro senza utilità mostra uno zero reale.
- Lo slot 1 è sempre la chiave richiesta, con `isYou` true. Gli altri numeri di slot sono ranghi di un hash con chiave. È codificato con `API_KEY_SECRET` e copre il pool, la chiave richiesta e il membro.
- Quindi i numeri non coincidono tra i titolari. Per un titolare rimangono gli stessi tra una visita e l'altra. Possono cambiare quando una chiave si unisce o lascia il pool oppure quando il segreto viene ruotato.
- In una finestra numerabile una sezione è il contatore del membro nell'archivio quote, lo stesso contatore del proprio `consumed`.
- Su una finestra `percent` una sezione è la parte `attributed` del membro, dallo stesso libro letto come la condivisione della chiave. L'utilizzo effettuato all'esterno della piscina non viene mai suddiviso in porzioni. Quella carica è divisa in base al peso, quindi le fette che la trasportavano mostrerebbero i pesi.
- Ciascuna vista legge un valore per ogni altro membro e finestra numerabile, in parallelo. Su una finestra `percent` le fette non costano lettura oltre alla lettura del libro della condivisione. Quando un valore non può essere letto, quella finestra non ha `members` e la condivisione della chiave rimane.
- L'opzione e il numero di chiavi utilizzabili vengono letti una volta per pool e solo per una chiave che può visualizzare i dati dell'account. Una lettura errata dell'opzione o del conteggio delle chiavi utilizzabili disattiva le barre per quel pool. Il server registra un avviso e viene creato il resto della vista.

Le barre non riportano nomi o ID. Raccontano ancora al detentore delle chiavi cose sugli altri membri:

- I titolari possono comunque abbinare le fette in base ai loro valori.
- Una numerazione stabile consente al titolare di seguire un membro nel tempo.
- Il numero di slice mostra quante chiavi sono allocate nel pool.
- In un pool di tre chiavi, qualcuno che sa quale chiave è stata utilizzata può dire quale è stata utilizzata l'ultima chiave.
- Quando un pool scende al di sotto di tre chiavi utilizzabili, le barre scompaiono. Le visualizzazioni precedenti mostrano ancora ciò che ha utilizzato ciascun membro.
- In una finestra numerabile, il totale del pool meno le sezioni può mostrare l'utilizzo di chiavi che non sono più allocate.
- Un membro che mostra zero su un account e utilizzo su un altro può mostrare quale membro utilizza quale account.
- In un pool numerabile con la politica `hard`, una fetta che smette di crescere in corrispondenza della quota equa di un membro suggerisce il peso di quel membro.

### Serie di utilizzo (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (servito anche su `/v1/me/usage`) restituisce l'utilizzo e il costo delle richieste proprie della chiave chiamante: totali, una voce per giorno UTC, per giorno e modello, per modello e per fornitore. Condivide il flag, le regole di autenticazione, l'ambito `self:usage`, `Cache-Control: no-store` e il comportamento degli errori della route quota sopra. La chiave viene controllata prima di `range`. Gli errori sono 400 (`Invalid range`), 401, 403, 404 e 500 (`Failed to build usage`).

- `range` è uno tra `1d`, `7d`, `30d` (predefinito) o `90d`. Qualsiasi altro valore, un valore vuoto o un parametro ripetuto è un 400. Il set si ferma a `90d` per limitare il costo di una chiamata. La visualizzazione legge solo la cronologia grezza dell'utilizzo, mai i riepiloghi giornalieri, che non contengono alcuna chiave.
- Le righe vengono selezionate dall'ID della chiave chiamante. La colonna del nome della chiave non viene mai abbinata e le righe registrate senza un ID chiave non vengono mai conteggiate.
- La creazione di una serie esegue cinque query raggruppate sulle righe della chiave nella finestra. La serie creata viene riutilizzata per 60 secondi per tasto e intervallo e una chiamata riutilizzata non viene eseguita. La sua `generatedAt` dà la sua età.
- La finestra termina quando la serie viene creata. Una riga timbrata successivamente, ad esempio mediante spostamento dell'orologio, non viene conteggiata.
- `coverage.retentionDays` è l'impostazione di conservazione della cronologia di utilizzo non elaborata dell'operatore (`retention.usageHistory` nelle impostazioni del database). `coverage.truncatedByRetention` è vero quando l'intervallo richiesto è più lungo di tale impostazione. Confronta i due numeri e non controlla se mancano effettivamente le righe.
- Il provider viene restituito come registrato per le richieste della chiave. Il modello è il nome registrato dopo l'ultimo `/` e le righe vengono raggruppate in base ad esso. Una richiesta combinata di cui ogni destinazione è stata rifiutata viene registrata con l'etichetta di instradamento come provider (il nome della combo, `auto` o `combo`) e la stringa del modello inviata dal client. Altre richieste rifiutate, ad esempio a causa di un interruttore aperto, di un raffreddamento del modello o di un salto in quota, mantengono il fornitore e il modello di destinazione.
- Oltre ai conteggi e ai costi, la risposta porta con sé la latenza media, le percentuali di successo e i tempi della prima e dell'ultima richiesta.
- `byModel` elenca le 50 coppie provider-modello con il maggior numero di richieste. Con più coppie le sue voci non si sommano a `summary` e `summary.uniqueModels` conta ogni ortografia del modello registrato. `byModelTruncated` è quindi vero e un modello le cui coppie cadono su entrambi i lati del taglio mostra totali parziali.
- Vengono segnalati due costi. `costUsd` è il costo fatturato, come mostrano le analisi di utilizzo. I fornitori di abbonamenti a tariffa fissa, come il piano Claude Code, contano $ 0 lì. `listPriceUsd` è lo stesso utilizzo valutato al prezzo di listino, abbonamenti inclusi. Una richiesta il cui modello non ha una riga di prezzo conteggia il relativo costo archiviato: un costo segnalato dal fornitore o calcolato al momento della registrazione della richiesta. Solo una richiesta senza nessuno dei due conta 0, senza marcatore, quindi un totale può essere parziale.
- Il contratto di risposta è `src/shared/schemas/selfUsage.ts` (`SelfUsageSeries` in `docs/openapi.yaml`).

### Pagina self-service

Con `QUOTA_SELF_PANEL` attivo, `/quota/{provider}` è una pagina pubblica. Un detentore della chiave digita lì una chiave API e vede i pool di chiavi per il fornitore. Ogni pool mostra una carta per finestra del pool, con l'utilizzo del pool per tutti e la condivisione della chiave. Ogni conto del pool ha le proprie carte, con l'utilizzo del conto e la condivisione della chiave. L'utilizzo dell'account viene visualizzato solo quando la chiave può visualizzare i dati dell'account. La pagina elenca inoltre i limiti per modello di ciascun account e l'utilizzo della chiave. Viene visualizzato un avviso quando una pianificazione blocca la chiave in questo momento. Una scheda elenca ogni tappo della chiave per modello con il suo utilizzo e segna quelli raggiunti. `{provider}` è un ID provider o il suo alias (`/quota/claude`, `/quota/cc`). Un provider sconosciuto e ogni percorso `/quota/*` mentre il flag è disattivato risponde 404. I pool su un nodo personalizzato compatibile con OpenAI o Anthropic non hanno pagina. Lo API risponde ancora per loro.

La pagina non ha sessione. La chiave viene inviata solo nell'intestazione `Authorization` di `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` e `GET /api/v1/me/usage`, mai in URL. Una chiave accettata dal server viene conservata nel `sessionStorage` della scheda. Con "Ricorda su questo dispositivo" viene invece mantenuto in `localStorage` e "Dimentica chiave" lo rimuove da entrambi. Una chiave rifiutata dal server viene rimossa dall'archivio.

Un pool in modalità `consent` mostra una carta di prestito. Lì il detentore della chiave imposta un'intera percentuale da 0 a 100 della quota inattiva della chiave da prestare. Il titolare sceglie anche la durata del consenso: fino alla disattivazione, 1 ora, 8 ore, 24 ore, 7 giorni o 30 giorni. La durata conta dal momento del salvataggio. Mentre è in vigore una scadenza, il titolare può invece mantenerla. Se tale termine scade prima del Salva, la carta non invia nulla e chiede un'altra scelta. Con lo 0% non viene inviata alcuna scadenza. La scheda mostra la scadenza memorizzata con il relativo fuso orario denominato. Un consenso la cui scadenza è trascorsa viene mostrato come concluso.

Per una chiave `hard` la carta elenca anche, per finestra del pool, quali altre chiavi prestano alla chiave in questo momento. Ogni riga è una cifra per tutti gli altri tasti insieme. In un pool di due chiavi è la cifra dell'altra chiave. Una cifra che la vista non riporta viene letta come non disponibile, non come zero. Per una chiave `soft` o `burst` la carta dice che non si applica alcuna cifra.

Un pool in modalità `saturation` la cui chiave memorizza una percentuale superiore a 0 mostra solo un prelievo. Dice che la percentuale memorizzata non ha alcun effetto lì. Il pulsante Prelievo invia 0 senza scadenza. Un pool in modalità `saturation` con uno 0 memorizzato non mostra alcuna carta di prestito. Dopo un salvataggio, una carta di cui la visualizzazione restituita non ha più bisogno rimane con il suo messaggio finché la visualizzazione della pagina non cambia nuovamente.

Nulla viene salvato finché il titolare non preme Salva o Ritira. Ogni pressione invia una richiesta `PATCH /api/v1/me/quota/{provider}` e una seconda pressione non invia nulla mentre la prima è in sospeso. Il corpo porta lo `ref` opaco del pool dalla vista, la percentuale e la scadenza. La risposta è la visualizzazione della quota ricostruita e la pagina la mostra senza una seconda lettura. Quando due salvataggi si sovrappongono, la pagina legge la quota una volta dopo l'ultima risposta. La pagina non conserva il consenso nella memoria del browser.

Una modifica rifiutata viene spiegata sulla carta con un testo scelto dallo stato HTTP. Il corpo dell'errore non viene letto. Un 401 dice che la chiave non è stata accettata e ricarica la quota. Un 403 dice che il pool non accetta modifiche ai prestiti e un 404 dice che il pool è sparito. Entrambi offrono un pulsante che ricarica la quota. Una risposta 400 o un'altra 4xx chiede al titolare di verificare la percentuale e la scadenza. Un 429 chiede al titolare di attendere, con i secondi di `Retry-After` quando gli viene data la risposta. Una risposta 5xx, un 408 o un errore di rete indica che la modifica potrebbe non essere stata salvata e mantiene i valori digitati. Una risposta fuori contratto ricarica la quota. Un salvataggio fallito non rimuove la chiave da solo. Quando il ricaricamento viene rifiutato, la pagina rimuove la chiave come in qualsiasi lettura rifiutata.

Una volta accettata una chiave, la pagina mostra anche una scheda "Imposta i tuoi strumenti" con tre schede. "Claude Code" fornisce il blocco `env` per `~/.claude/settings.json`. "Shell" fornisce le stesse variabili delle linee `export`. "Claude Desktop" fornisce i valori per la sua finestra di inferenza di terze parti. I modelli sono i modelli di quota-share che la chiave può richiedere per quel fornitore. Quando con la chiave non viene fornito alcun elenco di questo tipo, il blocco attiva invece il rilevamento del modello gateway. L'indirizzo del gateway è l'origine API pubblica segnalata dal server (`OMNIROUTE_PUBLIC_API_BASE_URL`, quindi `OMNIROUTE_PUBLIC_BASE_URL`). Quando nessuno dei due è impostato, la carta mostra un segnaposto e dice al titolare di chiedere all'amministratore. La chiave viene visualizzata come segnaposto. "Includi la mia chiave" inserisce l'intera chiave nel testo sullo schermo e in ciò che copia un pulsante di copia. Ciò dura fino a quando la casella non viene svuotata, la chiave viene dimenticata o sostituita o la pagina viene abbandonata. La scheda non invia richieste e non offre il download di file.

Una lettura dei segni API `stale` viene mostrata come possibilmente obsoleta. Una lettura segnata `unavailable` viene mostrata con la sua causale, mai come zero.

Sui piani a percentuale la pagina disegna la quota propria della chiave quando la API la segnala. Dice che il numero è una stima e ne nomina le due parti. I limiti per modello mostrano solo l'account.

Quando una finestra porta `members`, la sua scheda mostra anche una barra con un segmento per membro, nell'ordine degli slot. Il segmento del tasto richiesto utilizza il colore principale. Gli altri segmenti scorrono ciclicamente i colori della tabella del tema. Una legenda del testo elenca ogni segmento con il suo valore, quindi nulla dipende dal colore. I segmenti sono etichettati `You` o `Member N`, dove N è lo slot.

### Porta dedicata per la pagina

`QUOTA_PANEL_PORT` apre un secondo listener che serve solo la pagina self-service. È disattivato a meno che la variabile non sia impostata. `QUOTA_PANEL_HOST` è l'indirizzo di collegamento e il valore predefinito è `127.0.0.1`.

L'ascoltatore inoltra questi percorsi alla porta principale e risponde 404 per ogni altro percorso:

| Sentiero                                                                 | Serve                                             |
| ------------------------------------------------------------------------ | ------------------------------------------------- |
| `/quota/{provider}`                                                      | La pagina                                         |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | La visualizzazione della quota letta dalla pagina |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | La serie di utilizzo letta dalla pagina           |
| `/_next/static/`                                                         | Script, stili e caratteri della build             |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Icone                                             |

`GET` e `HEAD` vengono trasmessi senza corpo. Viene inoltre inoltrata una richiesta con un corpo: uno `PATCH` del percorso di visualizzazione delle quote, che la pagina invia per salvare una scelta di prestito. Qualsiasi altro metodo risponde a 404, tranne una richiesta CONNECT, la cui connessione viene chiusa senza risposta. Qualsiasi altra richiesta che dichiari che un ente risponde 404 e la sua connessione viene chiusa. Le richieste di aggiornamento vengono rifiutate e la loro connessione viene chiusa. Un percorso con un segmento di punti o un indicatore di frammento viene rifiutato, come nella porta API. Lo stesso vale per un target di richiesta con un carattere esterno a stampabile ASCII. Un carattere di controllo grezzo nel target riceve una risposta 400 dal parser HTTP, prima del controllo di questa porta. Le intestazioni delle richieste che il framework riserva per uso proprio non vengono inoltrate: i nomi che iniziano con `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` o `x-next-` e i nomi `x-matched-path` e `next-resume`. La richiesta viene inoltrata senza di essi. Attraverso questa porta non è possibile raggiungere il dashboard, la pagina di login, lo API di gestione e i percorsi di inferenza.

Lo `PATCH` deve contenere `Content-Type: application/json`, senza parametri o solo con `charset=utf-8`. Deve contenere uno `Content-Length` compreso tra 1 e 4096, scritto in cifre semplici, e nessuno `Transfer-Encoding`. Uno `PATCH` che infrange una di queste regole risponde 404. Ad alcune lunghezze non corrette, come quelle con segno o ripetute, viene data risposta 400 dal parser HTTP prima del controllo di questa porta. La porta legge i byte dichiarati prima di contattare la porta principale e li attende al massimo 5 secondi. Un corpo che ormai non è completo risponde 404 e la sua connessione viene chiusa. In questo caso, nulla raggiunge la porta principale o quando il client parte per primo. La porta inoltra esattamente i byte dichiarati, con lo stesso `Content-Length`. I byte successivi vengono letti come richiesta successiva sulla connessione. Un proxy inverso TLS di fronte deve inoltrare `Content-Length` e non deve suddividere nuovamente il corpo della richiesta. La porta principale controlla la chiave API nell'intestazione `Authorization`, come per `GET`.

Il corpo 404 è `{"error":"not_found","message":"Not found."}`. Un relè fallito risponde 502 (`api_bridge_unavailable`) o 504 (`api_bridge_timeout`) senza campo `detail`.

L'ascoltatore non legge `QUOTA_SELF_PANEL` e non gira la pagina. Mentre il flag è disattivato, la pagina e il suo API rispondono 404 sulla porta principale e l'ascoltatore trasmette quella risposta.

Nel server di sviluppo (`next dev`), la pagina non diventa interattiva attraverso questa porta. Il socket di ricarica a caldo di sviluppo è una richiesta di aggiornamento e il port la rifiuta. Utilizza la porta principale durante lo sviluppo.

La porta serve il semplice HTTP e la pagina invia le chiavi API. Mantieni l'indirizzo di collegamento predefinito e metti un proxy inverso con TLS davanti ad esso. Un indirizzo di collegamento diverso dal loopback registra questo avviso:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Un peer di loopback che non invia alcuna intestazione di inoltro conta come locale sulla porta principale. Quindi un proxy sullo stesso host deve inviare `X-Forwarded-For`. Un proxy su un indirizzo privato è considerato attendibile per quell'intestazione solo con `OMNIROUTE_TRUST_PROXY=private` (o `lan`). Qualsiasi altro peer viene segnalato tramite l'indirizzo della sua connessione e le intestazioni di inoltro inviate vengono eliminate.

L'ascoltatore ha al massimo 256 connessioni alla volta. Un client ha 10 secondi per inviare le intestazioni della richiesta e 30 secondi per inviare l'intera richiesta. Una connessione mantenuta inattiva si chiude dopo circa 5 secondi. Una connessione senza attività per 60 secondi viene chiusa. Questi valori sono fissi. Imposta i limiti di connessione e velocità anche sul proxy inverso in primo piano. Un proxy inverso di fronte dovrebbe mantenere le connessioni upstream inattive per meno di 5 secondi o non riutilizzarle. Il relè alla porta principale utilizza i timeout upstream della porta API (`API_BRIDGE_*`).

L'ascoltatore si avvia anche quando `API_PORT` non è impostato. `QUOTA_PANEL_PORT` deve essere una porta compresa tra 1 e 65535, scritta solo in cifre. Deve differire dalla porta del dashboard e dalla porta API. Mentre il server live WebSocket è attivo, deve anche differire da `LIVE_WS_PORT` (predefinito 20132). Qualsiasi altro valore non apre nulla e registra un avviso. Un avviso relativo a un valore rifiutato nomina la variabile e non ripete il valore. Una porta già in uso non apre nulla e registra questo avviso:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

Con `OMNIROUTE_BASE_PATH` impostato, l'ascoltatore si aspetta ogni percorso sopra sotto quel prefisso. Utilizza lo stesso `OMNIROUTE_BASE_PATH` in fase di compilazione e in fase di esecuzione. Scrivilo con una barra iniziale e nessuna barra finale, ad esempio `/omniroute`. Un'altra forma, che include `/` e `/omniroute/`, lascia il port con un avviso, sebbene la build accetti tali forme. Lo stesso vale per un percorso di base il cui primo segmento nomina una route dell'applicazione: `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` o `connect`, in ogni caso.

Limitazioni:

- `/quota/{provider}/` con una barra finale risponde 404 su questa porta.
- L'operatore del servizio e il manifesto dell'app Web non vengono serviti su questa porta.
- Su questa porta non viene visualizzata una favicon personalizzata impostata nel dashboard.
- Le icone non vengono visualizzate quando l'applicazione viene eseguita in un percorso di base.
- Il porto parla chiaro HTTP/1.1.
- Un'associazione che fallisce non viene ritentata finché il processo non viene riavviato.
- L'ascoltatore non ha limiti di connessione o velocità per indirizzo client.
- Le configurazioni del contenitore non sono trattate in questa sezione.

---

## Variabili d'ambiente

| Variabile                            | Predefinito       | Descrizione                                                                            |
| ------------------------------------ | ----------------- | -------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`          | Driver da utilizzare: `sqlite` o `redis`                                               |
| `QUOTA_STORE_REDIS_URL`              | _(vuoto)_         | Redis URL, ad esempio `redis://localhost:6379`                                         |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`             | 0..1; `>= threshold` attiva la modalità rigorosa                                       |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`            | Token che spiegano al massimo un punto della finestra del piano percentuale            |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`             | 0..1; moltiplicatore per il punteggio combinato delle politiche soft                   |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`              | Giorni prima che GC rimuova i vecchi bucket `quota_consumption`                        |
| `QUOTA_PANEL_PORT`                   | _(non impostato)_ | Porta dedicata per la pagina self-service. Non impostato significa nessun ascoltatore. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`       | Associa l'indirizzo per quella porta                                                   |

Le impostazioni DB (`quotaStore.*`) sovrascrivono env vars.

---

## Risoluzione dei problemi

### Redis è configurato ma non si connette

Verificare che `ioredis` sia installato (`npm ls ioredis`) e che `QUOTA_STORE_REDIS_URL`
sia raggiungibile. In caso di errore di connessione, la factory esegue il fallback a SQLite (registrato
con livello `warn`).

### `peek` restituisce dati obsoleti / comportamento fail-open

Se `peek` genera un'eccezione, `enforceQuotaShare` tratta il risultato come "consenti" (fail-open).
Controllare nei log di `pino` le voci `quota:enforce` e `quota:factory` per identificare
la causa principale.

### Deriva del contatore dei consumi

Se l'utilizzo effettivo del provider differisce dai contatori, è previsto: la
finestra scorrevole a 2 bucket presenta un errore di circa l'1% ai limiti della finestra e `consume` viene
eseguito in modalità fire-and-forget dopo la risposta. Il segnale di saturazione (`saturationSignals.ts`)
legge l'utilizzo reale del provider con un TTL di 30 s e regola `globalUsedPercent`
di conseguenza.

### Il pool mostra "nessun dato" per il tasso di consumo

`computeBurnRate` richiede almeno 2 campioni storici. I nuovi pool senza precedenti
chiamate a `consume` mostreranno `tokensPerSecond: 0` e `timeToExhaustionMs: null`.

---

## Migrazione da localStorage

Al primo caricamento di `/dashboard/costs/quota-share`, l'hook `useLocalStoragePoolMigration`
verifica che:

1. `localStorage.getItem("omniroute:quota-share:pools")` non sia vuoto.
2. `GET /api/quota/pools` restituisca `[]` (il DB è vuoto).

Se entrambe le condizioni sono vere, invia in batch ogni pool legacy a `POST /api/quota/pools`,
quindi rimuove la chiave da localStorage. La migrazione è idempotente: la condizione 2 impedisce
che venga eseguita nuovamente.

---

## Classificazione della strategia interna

`quota-share` è una strategia di instradamento **solo interna** (`INTERNAL_ROUTING_STRATEGY_VALUES` in
`src/shared/constants/routingStrategies.ts`). Viene utilizzata esclusivamente dalle combo di pool
`qtSd/` generate dal sistema ed è deliberatamente esclusa da `ROUTING_STRATEGY_VALUES`, in modo che
non appaia mai come opzione selezionabile dall'utente nell'interfaccia utente o nell'API.

---

## Copertura di prova

Due livelli di copertura automatizzata forniti con il motore di quota-share:

| Suite                   | Comando                                                                | Cosa copre                                                                                                                                                                                                                    |
| :---------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unità (29 test)         | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | scheduler DRR, gating di saturazione, limiti di concorrenza, matematica fairShare, accodamento del backlog                                                                                                                    |
| Matrice di integrazione | `npm run test:combo:matrix`                                            | Decisione di routing end-to-end attraverso la pipeline combinata reale; DRR equità + deprioritizzazione della saturazione tramite cuciture live (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

La matrice di integrazione corre in CI insieme a tutte le 22 strategie pubbliche. La suite di unità può essere eseguita in modo autonomo.

---

## DB Riepilogo dello schema

Tre tabelle aggiunte dalle migrazioni `078`, `079` e `085`:

- `quota_pools` + `quota_allocations` — definizioni del pool e allocazioni per chiave.
- `quota_consumption` — lanciando segnalini da 2 secchi per `(apiKeyId, dimensionKey)`.
- `provider_plans` — sostituzioni manuali del piano del fornitore (dimensioni JSON per connectionId).

Tutte le tabelle aggiunte tramite migrazioni `CREATE TABLE IF NOT EXISTS` idempotenti.

Il prestito consentito aggiunge tre colonne: `quota_allocations.lending_percent` (numero intero, predefinito 0), `quota_allocations.lending_until` (millisecondi di epoca o `NULL` per nessuna scadenza) e `quota_pools.borrow_mode` ( `saturation` predefinito). La sua migrazione aggiunge solo queste colonne e non scrive alcuna riga esistente.

Il libro di attribuzione percentuale aggiunge `quota_percent_ledger` (una riga per pool, account e finestra del piano) e `quota_percent_ledger_tokens` (un contatore token per pool, account e chiave API ). `src/lib/db/quotaPercentLedger.ts` li legge e li scrive.
