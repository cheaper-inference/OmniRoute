# SQLite Runtime Resolution (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute determina il proprio driver SQLite all'avvio tramite una catena di fallback in 5 passaggi:

1. **`better-sqlite3` incluso** (tramite `dependencies` in `package.json`)
   — il più veloce, con binario nativo, installato da `npm install` quando sono presenti gli strumenti di compilazione.

2. **`better-sqlite3` installato in fase di esecuzione** (in `~/.omniroute/runtime/`)
   — installato in modo differito al primo avvio **OPPURE** da `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Convalida i byte magici del file nativo `.node` (ELF / Mach-O / PE) prima del caricamento
   per proteggersi da binari danneggiati o destinati alla piattaforma errata.

3. **`node:sqlite`** (libreria standard di Node ≥22.5) — non richiede una compilazione nativa; viene utilizzato quando
   entrambi i percorsi di better-sqlite3 non funzionano. Insieme di funzionalità limitato.

4. **`sql.js`** (WASM) — fallback finale. Funziona ovunque, ma è più lento
   e scrive i dati a intervalli anziché in modo sincrono.

## Perché questa complessità?

- **EBUSY su Windows**: `npm install -g omniroute@latest` può non riuscire se il file
  `better_sqlite3.node` della versione precedente è bloccato da un processo in esecuzione. L'installazione
  in fase di esecuzione in `~/.omniroute/runtime/` evita la cache npm globale.
- **Assenza di strumenti di compilazione**: alcuni ambienti (Windows aziendale senza VS Build
  Tools, immagini Docker minimali) non possono compilare `better-sqlite3`. Il programma di installazione
  in fase di esecuzione recupera un binario precompilato dal registro npm; i driver di fallback
  garantiscono che OmniRoute possa comunque avviarsi anche in caso di errore.
- **Sistemi isolati dalla rete**: se il registro npm non è raggiungibile, `node:sqlite`
  o `sql.js` garantiscono le funzionalità di base.

## Convalida dei byte magici

Prima di caricare un file `.node` installato in fase di esecuzione, OmniRoute legge i primi 8
byte e li confronta con i valori magici noti delle piattaforme:

| Piattaforma            | Byte (esadecimali) | Etichetta   |
| ---------------------- | ------------------ | ----------- |
| Linux                  | `7F 45 4C 46`      | `elf`       |
| macOS a 64 bit BE      | `FE ED FA CF`      | `macho`     |
| macOS a 64 bit LE      | `CF FA ED FE`      | `macho-le`  |
| macOS fat (universale) | `CA FE BA BE`      | `macho-fat` |
| Windows                | `4D 5A` (MZ)       | `pe`        |

Un valore magico non corrispondente → il file viene ignorato e il fallback prosegue con il passaggio successivo.

## Verifica del driver attivo

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Controllo manuale

```bash
# Ignora il riscaldamento postinstallazione (per installazioni CI rapide)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forza la reinstallazione di better-sqlite3 in fase di esecuzione
rm -rf ~/.omniroute/runtime
omniroute  # verrà reinstallato al prossimo avvio

# Controlla quale driver è attivo
omniroute config db-info  # (se il comando CLI esiste)
```

## Diagnosi dei blocchi sincroni

Con `better-sqlite3`, impostare `OMNIROUTE_SQLITE_SLOW_MS=200` prima dell'avvio per abilitare
la misurazione dei tempi dell'adattatore sincrono. Per impostazione predefinita è disabilitata. Un'operazione completata che richiede
almeno il numero specificato di millisecondi genera un avviso `[SQLITE-SLOW]`, al massimo una volta ogni
dieci secondi per ciascun adattatore. L'avviso contiene solo il driver, la classe dell'operazione
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transazione o manutenzione) e
i millisecondi trascorsi: nessun SQL, binding, riga, percorso o testo di eccezione.

Si tratta di uno strumento diagnostico, non di un timeout o di un'ottimizzazione delle query. Non può segnalare
un'operazione che non termina mai, distinguere il lavoro della CPU dalle attese del disco, identificare
l'SQL esatto o osservare le operazioni eseguite tramite l'handle diretto del driver.
La durata del backup asincrono è deliberatamente esclusa; gli altri driver SQLite non sono
strumentati da questa funzionalità opzionale. La disattivazione della variabile ripristina l'adattatore originale
senza wrapper per la misurazione dei tempi. Non vengono modificati né lo schema del database né la configurazione memorizzata.

L'avviso di ritardo di `/healthz` indica il picco dell'event loop dal campionamento precedente,
non la media dell'intero ciclo di vita. Correlare i relativi timestamp con gli avvisi delle operazioni lente
e con le metriche dell'host e dello storage prima di attribuire un blocco a SQLite o a un guasto del disco.

## Riferimenti

Implementazione:

- `bin/cli/runtime/magicBytes.mjs` — funzioni di supporto per la convalida dei byte magici dei binari
- `bin/cli/runtime/sqliteRuntime.mjs` — risolutore in fase di esecuzione in 5 passaggi + programma di installazione differito
- `bin/cli/runtime/index.mjs` — orchestratore dell'avvio (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook npm di post-installazione (riscaldamento non irreversibile in caso di errore)
- `src/lib/db/core.ts` — esportazioni di `ensureDbInitialized()` / `getDriverInfo()`

## Topologia a singolo writer (HA non supportata)

La catena di fallback dei driver descritta sopra viene comunque eseguita in **un unico processo**. Per impostazione predefinita, SQLite
in OmniRoute utilizza **un singolo writer**:

- Non collegare due repliche OmniRoute allo stesso file `storage.sqlite`.
- Il riavvio di un container, un deployment Recreate, una terminazione per OOM o un riavvio dovuto a HEALTHCHECK interrompe
  ogni sessione SSE in corso. Nel percorso standard non è previsto alcun drenaggio delle sessioni.
- Una verifica di liveness dell'orchestratore che considera morto un endpoint `/healthz` lento terminerà l'unica
  replica. Preferire una verifica di liveness TCP + una verifica di readiness HTTP su `/healthz`. Consultare
  [Guida Docker — disponibilità](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  e [raccomandazioni per le probe Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
