# SQLite Runtime Resolution (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute određuje svoj SQLite upravljački program pri pokretanju putem lanca od 5 rezervnih koraka:

1. **Ugrađeni `better-sqlite3`** (putem `dependencies` u `package.json`)
   — najbrži, nativna binarna datoteka, instalira se pomoću `npm install` kada su dostupni alati za izgradnju.

2. **`better-sqlite3` instaliran tokom izvršavanja** (u `~/.omniroute/runtime/`)
   — instalira se po potrebi pri prvom pokretanju **ILI** putem `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Prije učitavanja provjerava magične bajtove nativne `.node` datoteke (ELF / Mach-O / PE)
   radi zaštite od oštećenih binarnih datoteka ili datoteka namijenjenih pogrešnoj platformi.

3. **`node:sqlite`** (standardna biblioteka za Node ≥22.5) — nije potrebna nativna izgradnja; koristi se kada
   obje putanje za better-sqlite3 zakažu. Ograničen skup funkcija.

4. **`sql.js`** (WASM) — krajnja rezervna opcija. Radi svugdje, ali je sporija
   i zapisuje podatke u intervalima umjesto sinhrono.

## Zašto ova složenost?

- **Windows EBUSY**: `npm install -g omniroute@latest` može ne uspjeti ako je datoteka
  `better_sqlite3.node` prethodne verzije zaključana procesom koji je još uvijek pokrenut. Instalacija tokom
  izvršavanja u `~/.omniroute/runtime/` zaobilazi globalnu npm predmemoriju.
- **Nema alata za izgradnju**: Neka okruženja (poslovni Windows bez VS Build
  Tools, minimalne Docker slike) ne mogu kompajlirati `better-sqlite3`. Instalacijski program tokom izvršavanja
  preuzima unaprijed izgrađenu binarnu datoteku iz npm registra; rezervni upravljački
  programi osiguravaju da se OmniRoute ipak pokrene čak i ako to ne uspije.
- **Sistemi bez pristupa mreži**: Ako npm registar nije dostupan, `node:sqlite`
  ili `sql.js` garantuju osnovnu funkcionalnost.

## Provjera magičnih bajtova

Prije učitavanja `.node` datoteke instalirane tokom izvršavanja, OmniRoute čita prvih 8
bajtova i upoređuje ih s poznatim magičnim vrijednostima platformi:

| Platforma               | Bajtovi (hex) | Oznaka      |
| ----------------------- | ------------- | ----------- |
| Linux                   | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE         | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE         | `CF FA ED FE` | `macho-le`  |
| macOS fat (univerzalni) | `CA FE BA BE` | `macho-fat` |
| Windows                 | `4D 5A` (MZ)  | `pe`        |

Nepodudarna magična vrijednost → datoteka se zanemaruje, a rezervni postupak nastavlja na sljedeći korak.

## Provjera aktivnog upravljačkog programa

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Ručno upravljanje

```bash
# Preskočite postinstall zagrijavanje (za brze CI instalacije)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Prisilno ponovo instalirajte runtime better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # ponovo će se instalirati pri sljedećem pokretanju

# Provjerite koji je upravljački program aktivan
omniroute config db-info  # (ako CLI naredba postoji)
```

## Dijagnosticiranje sinhronih zastoja

Uz `better-sqlite3`, prije pokretanja postavite `OMNIROUTE_SQLITE_SLOW_MS=200` kako biste
uključili mjerenje vremena sinhronog adaptera. Podrazumijevano je isključeno. Završena operacija koja traje
najmanje toliko milisekundi generiše upozorenje `[SQLITE-SLOW]`, najviše jednom u
deset sekundi po adapteru. Upozorenje sadrži samo upravljački program, klasu operacije
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transakcija ili održavanje) i
protekle milisekunde: bez SQL-a, vezanih vrijednosti, redova, putanja ili teksta izuzetka.

Ovo je pomoćno sredstvo za dijagnostiku, a ne vremensko ograničenje ili optimizacija upita. Ne može prijaviti
operaciju koja se nikada ne završi, razlikovati procesorski rad od čekanja na disk, identificirati
tačan SQL niti posmatrati operacije izvršene putem izvornog rukovaoca upravljačkog programa.
Trajanje asinhrone sigurnosne kopije namjerno je isključeno; drugi SQLite upravljački programi nisu
obuhvaćeni ovom opcionalnom instrumentacijom. Onemogućavanje varijable vraća izvorni adapter
bez omotača za mjerenje vremena. Nema promjena sheme baze podataka ili pohranjene konfiguracije.

Upozorenje o kašnjenju za `/healthz` prijavljuje najveće kašnjenje petlje događaja od prethodnog uzorka,
a ne prosjek tokom cijelog životnog vijeka. Uporedite njegove vremenske oznake s upozorenjima o sporim operacijama
i metrikama hosta/pohrane prije nego što zastoj pripišete SQLite-u ili kvaru diska.

## Reference

Implementacija:

- `bin/cli/runtime/magicBytes.mjs` — pomoćne funkcije za provjeru magičnih bajtova binarnih datoteka
- `bin/cli/runtime/sqliteRuntime.mjs` — sistem određivanja tokom izvršavanja u 5 koraka + instalacijski program koji se pokreće po potrebi
- `bin/cli/runtime/index.mjs` — orkestrator pokretanja (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm priključak nakon instalacije (nekritično zagrijavanje)
- `src/lib/db/core.ts` — izvozi `ensureDbInitialized()` / `getDriverInfo()`

## Topologija s jednim zapisivačem (HA nije podržan)

Gornji lanac rezervnih upravljačkih programa i dalje se izvršava u **jednom procesu**. Podrazumijevani SQLite
u OmniRouteu koristi **jedan zapisivač**:

- Nemojte povezivati dvije OmniRoute replike s istom datotekom `storage.sqlite`.
- Ponovno pokretanje kontejnera, Recreate implementacija, OOM prekid ili HEALTHCHECK ponovno pokretanje prekida
  svaku aktivnu SSE sesiju. Standardni postupak ne omogućava kontrolirano pražnjenje sesija.
- Provjera aktivnosti orkestratora koja spor odgovor `/healthz` tumači kao neaktivan prekinut će jedinu
  repliku. Koristite TCP provjeru aktivnosti + HTTP `/healthz` provjeru spremnosti. Pogledajte
  [Docker vodič — dostupnost](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  i [preporuke za Kubernetes provjere](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
