# SQLite Runtime Resolution (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute finder sin SQLite-driver ved opstart via en fallbackkæde i 5 trin:

1. **Medfølgende `better-sqlite3`** (via `dependencies` i `package.json`)
   — hurtigst, oprindelig binær fil, installeret af `npm install`, når byggeværktøjer er tilgængelige.

2. **Kørselstidsinstalleret `better-sqlite3`** (i `~/.omniroute/runtime/`)
   — installeres automatisk ved første kørsel **ELLER** af `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Validerer den oprindelige `.node`-fils magiske bytes (ELF / Mach-O / PE) før indlæsning
   for at beskytte mod beskadigede binære filer eller filer til den forkerte platform.

3. **`node:sqlite`** (Node ≥22.5-standardbibliotek) — kræver ingen oprindelig kompilering; bruges, når
   begge better-sqlite3-stier mislykkes. Begrænset funktionssæt.

4. **`sql.js`** (WASM) — sidste fallback. Fungerer overalt, men er langsommere
   og skriver data med faste intervaller i stedet for synkront.

## Hvorfor denne kompleksitet?

- **Windows EBUSY**: `npm install -g omniroute@latest` kan mislykkes, hvis den tidligere
  versions `better_sqlite3.node` er låst af en kørende proces. Kørselstidsinstallationen
  i `~/.omniroute/runtime/` omgår den globale npm-cache.
- **Ingen byggeværktøjer**: Nogle miljøer (virksomheds-Windows uden VS Build
  Tools, minimale Docker-images) kan ikke kompilere `better-sqlite3`. Kørselstids-
  installationsprogrammet finder en prækompileret binær fil i npm-registret; fallback-
  driverne sikrer, at OmniRoute stadig starter, selv hvis dette mislykkes.
- **Systemer uden netværksadgang**: Hvis npm-registret ikke kan nås, garanterer `node:sqlite`
  eller `sql.js` grundlæggende funktionalitet.

## Validering af magiske bytes

Før en kørselstidsinstalleret `.node`-fil indlæses, læser OmniRoute de første 8
bytes og sammenligner dem med kendte platformsignaturer:

| Platform              | Bytes (hex)   | Etiket      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universel) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

En uoverensstemmende signatur → filen ignoreres, og fallback fortsætter til næste trin.

## Kontrol af den aktive driver

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manuel styring

```bash
# Spring opvarmning efter installation over (til hurtige CI-installationer)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Gennemtving geninstallation af better-sqlite3 ved kørselstid
rm -rf ~/.omniroute/runtime
omniroute  # geninstalleres ved næste opstart

# Kontrollér, hvilken driver der er aktiv
omniroute config db-info  # (hvis CLI-kommandoen findes)
```

## Diagnosticering af synkrone blokeringer

Med `better-sqlite3` skal du indstille `OMNIROUTE_SQLITE_SLOW_MS=200` før opstart for at
tilvælge tidsmåling af den synkrone adapter. Dette er som standard deaktiveret. En fuldført
handling, der tager mindst så mange millisekunder, udløser en `[SQLITE-SLOW]`-advarsel,
højst én gang hvert tiende sekund pr. adapter. Advarslen indeholder kun driveren,
handlingsklassen (`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaktion eller
vedligeholdelse) og den forløbne tid i millisekunder: ingen SQL, bindinger, rækker,
stier eller undtagelsestekst.

Dette er et diagnosticeringsværktøj, ikke en timeout eller forespørgselsoptimering. Det
kan ikke rapportere en handling, der aldrig returnerer, skelne CPU-arbejde fra ventetid
på disken, identificere den præcise SQL eller observere handlinger, der udføres gennem
det rå driver-handle. Varigheden af asynkron sikkerhedskopiering er bevidst udeladt;
andre SQLite-drivere instrumenteres ikke af dette tilvalg. Deaktivering af variablen
gendanner den oprindelige adapter uden wrappers til tidsmåling. Der foretages ingen
ændringer af databaseskemaet eller den gemte konfiguration.

Forsinkelsesadvarslen fra `/healthz` rapporterer hændelsesløkkens maksimum siden den
forrige måling, ikke gennemsnittet for hele levetiden. Sammenhold dens tidsstempler med
advarsler om langsomme handlinger og værts-/lagringsmålinger, før en blokering tilskrives
SQLite eller en diskfejl.

## Reference

Implementering:

- `bin/cli/runtime/magicBytes.mjs` — hjælpefunktioner til validering af binære signaturbytes
- `bin/cli/runtime/sqliteRuntime.mjs` — kørselstidsresolver i 5 trin + automatisk installationsprogram
- `bin/cli/runtime/index.mjs` — opstartsorkestrator (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-hook efter installation (ikke-kritisk opvarmning)
- `src/lib/db/core.ts` — eksport af `ensureDbInitialized()` / `getDriverInfo()`

## Topologi med én skriver (HA understøttes ikke)

Driverens fallbackkæde ovenfor kører stadig i **én proces**. OmniRoute med SQLite
som standard er en **enkelt skriver**:

- Tilknyt ikke to OmniRoute-replikaer til den samme `storage.sqlite`-fil.
- En genstart af en container, en Recreate-udrulning, et OOM-drab eller en
  HEALTHCHECK-genstart afbryder alle igangværende SSE-sessioner. Der er ingen
  sessionsdræning i standardforløbet.
- Orkestratorens liveness-kontrol, der betragter en langsom `/healthz` som død, vil
  afslutte den eneste replika. Foretræk TCP-liveness + HTTP `/healthz`-readiness. Se
  [Docker-vejledning — tilgængelighed](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  og [anbefalinger til Kubernetes-prober](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
